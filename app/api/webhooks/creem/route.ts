import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Webhook event types from Creem
type CreemWebhookEvent = {
  id: string
  event_type: 'checkout.completed' | 'checkout.failed' | 'subscription.created' | 'subscription.updated' | 'subscription.cancelled'
  data: {
    checkout_id?: string
    order_id?: string
    customer_id?: string
    product_id?: string
    subscription_id?: string
    amount?: number
    currency?: string
    status?: string
    metadata?: Record<string, any>
  }
  created_at: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-creem-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET!
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event: CreemWebhookEvent = JSON.parse(body)

    console.log(`Received Creem webhook: ${event.event_type}`, event.data)

    // Handle different event types
    switch (event.event_type) {
      case 'checkout.completed':
        // Payment successful - grant access, update user subscription, etc.
        console.log('Checkout completed:', event.data)
        // TODO: Update user's subscription in your database
        break

      case 'checkout.failed':
        // Payment failed - handle appropriately
        console.log('Checkout failed:', event.data)
        break

      case 'subscription.created':
        // New subscription created
        console.log('Subscription created:', event.data)
        break

      case 'subscription.updated':
        // Subscription updated (plan change, etc.)
        console.log('Subscription updated:', event.data)
        break

      case 'subscription.cancelled':
        // Subscription cancelled
        console.log('Subscription cancelled:', event.data)
        break

      default:
        console.log('Unhandled event type:', event.event_type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
