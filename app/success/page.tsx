'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  // Creem parameters
  const checkoutId = searchParams.get('checkout_id')
  const customerId = searchParams.get('customer_id')
  const productId = searchParams.get('product_id')
  // Common parameters
  const orderId = searchParams.get('order_id')
  // PayPal NCP parameters
  const paymentId = searchParams.get('payment_id')
  const payerId = searchParams.get('payer_id')
  const token = searchParams.get('token')
  const paypalStatus = searchParams.get('status')
  // Plan information (from PayPal SDK integration)
  const plan = searchParams.get('plan')
  const billingPeriod = searchParams.get('billing_period')

  // Display plan name
  const planNames: Record<string, string> = {
    basic: 'Basic Plan',
    pro: 'Pro Plan',
    max: 'Max Plan',
  }

  const planName = plan ? planNames[plan] : undefined
  const billingText = billingPeriod === 'monthly' ? 'Monthly' : billingPeriod === 'yearly' ? 'Yearly' : undefined

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500" />
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your subscription is now active.
          </p>

          {/* Plan Information */}
          {planName && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <p className="font-semibold text-lg">{planName}</p>
              {billingText && <p className="text-sm text-muted-foreground mt-1">{billingText} Billing</p>}
            </div>
          )}

          <div className="bg-muted/50 rounded-lg p-4 mb-8 text-left text-sm">
            <div className="space-y-2">
              {orderId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono">{orderId}</span>
                </div>
              )}
              {paymentId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span className="font-mono">{paymentId}</span>
                </div>
              )}
              {payerId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payer ID:</span>
                  <span className="font-mono">{payerId}</span>
                </div>
              )}
              {checkoutId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Checkout ID:</span>
                  <span className="font-mono">{checkoutId}</span>
                </div>
              )}
              {customerId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer ID:</span>
                  <span className="font-mono">{customerId}</span>
                </div>
              )}
              {paypalStatus && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-mono">{paypalStatus}</span>
                </div>
              )}
              {token && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token:</span>
                  <span className="font-mono">{token}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/generator" className="block">
              <Button className="w-full">
                Go to Image Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/pricing-paypal" className="block">
              <Button variant="outline" className="w-full">
                View Plans
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            A confirmation email has been sent to your registered email address.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-8 px-8 text-center">
            <div className="animate-pulse">Loading...</div>
          </CardContent>
        </Card>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
