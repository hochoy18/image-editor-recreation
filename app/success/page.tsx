'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const checkoutId = searchParams.get('checkout_id')
  const orderId = searchParams.get('order_id')
  const customerId = searchParams.get('customer_id')
  const productId = searchParams.get('product_id')

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
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your subscription is now active.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-8 text-left text-sm">
            <div className="space-y-2">
              {orderId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono">{orderId}</span>
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
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/generator" className="block">
              <Button className="w-full">
                Go to Image Editor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/pricing" className="block">
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
