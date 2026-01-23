'use client'

import { useState, useEffect } from 'react'
import { Check, Sparkles, Zap, Crown, Users, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type BillingPeriod = 'monthly' | 'yearly'

interface Plan {
  id: string
  name: string
  description: string
  monthlyCredits: number
  imagesPerMonth: number
  features: string[]
  monthlyPrice: number
  yearlyPrice: number
  badge?: string
  popular?: boolean
  icon: React.ReactNode
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for individuals and light users',
    monthlyCredits: 200,
    imagesPerMonth: 100,
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      '100 high-quality images/month',
      'All style templates included',
      'Standard generation speed',
      'Basic customer support',
      'JPG/PNG format downloads',
      'Commercial Use License',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professional creators and teams',
    monthlyCredits: 800,
    imagesPerMonth: 400,
    monthlyPrice: 29,
    yearlyPrice: 290,
    badge: 'Most Popular',
    popular: true,
    icon: <Zap className="w-5 h-5" />,
    features: [
      '400 high-quality images/month',
      'Support Seedream-4 Model',
      'Support Nanobanana-Pro Model',
      'All style templates included',
      'Priority generation queue',
      'Priority customer support',
      'JPG/PNG/WebP format downloads',
      'Batch generation feature',
      'Image editing tools (Coming Soon)',
      'Commercial Use License',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    description: 'Designed for large enterprises and studios',
    monthlyCredits: 3600,
    imagesPerMonth: 1800,
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: <Crown className="w-5 h-5" />,
    features: [
      '1800 high-quality images/month',
      'Support Seedream-4 Model',
      'Support Nanobanana-Pro Model',
      'All style templates included',
      'Fastest generation speed',
      'Dedicated account manager',
      'All format downloads',
      'Batch generation feature',
      'Professional editing suite (Coming Soon)',
      'Commercial Use License',
    ],
  },
]

const faqs = [
  {
    question: 'What are credits and how do they work?',
    answer: '2 credits generate 1 high-quality image. Credits are automatically refilled at the start of each billing cycle - monthly for monthly plans, all at once for yearly plans.',
  },
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.',
  },
  {
    question: 'Do unused credits roll over?',
    answer: 'Monthly plan credits do not roll over to the next month. Yearly plan credits are valid for the entire subscription period. We recommend choosing a plan based on your actual usage needs.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support PayPal, credit cards, debit cards, and various other payment methods. All payments are processed securely through PayPal.',
  },
]

declare global {
  interface Window {
    paypal: any
  }
}

export default function PricingPayPalPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly')
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [paypalLoading, setPaypalLoading] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'

  // Load PayPal SDK
  useEffect(() => {
    const loadPayPalScript = () => {
      if (window.paypal) {
        setPaypalLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
      script.addEventListener('load', () => {
        setPaypalLoaded(true)
      })
      script.addEventListener('error', () => {
        console.error('Failed to load PayPal SDK')
        setPaymentError('Failed to load PayPal payment. Please try again later.')
      })
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }

    loadPayPalScript()
  }, [clientId])

  // Initialize PayPal buttons for each plan
  useEffect(() => {
    if (!paypalLoaded || !window.paypal) return

    const renderPayPalButtons = () => {
      plans.forEach((plan) => {
        const containerId = `paypal-button-container-${plan.id}`
        const container = document.getElementById(containerId)

        if (container) {
          container.innerHTML = ''

          const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
          const period = billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'

          window.paypal
            .Buttons({
              style: {
                layout: 'vertical',
                color: plan.popular ? 'gold' : 'blue',
                shape: 'rect',
                label: 'paypal',
              },
              createOrder: (data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: `${plan.name} Plan - ${period}`,
                      custom_id: `${plan.id}_${billingPeriod}`,
                      amount: {
                        value: price.toFixed(2),
                      },
                    },
                  ],
                })
              },
              onApprove: (data: any, actions: any) => {
                setPaypalLoading(true)
                return actions.order.capture().then((details: any) => {
                  console.log('Payment successful:', details)
                  // Redirect to success page with payment details
                  const params = new URLSearchParams({
                    payment_id: details.id,
                    order_id: details.purchase_units[0]?.payments?.captures?.[0]?.id || '',
                    payer_id: details.payer.payer_id,
                    status: details.status,
                    plan: plan.id,
                    billing_period: billingPeriod,
                  })
                  window.location.href = `/success?${params.toString()}`
                  setPaypalLoading(false)
                })
              },
              onError: (err: any) => {
                console.error('PayPal error:', err)
                setPaymentError('Payment failed. Please try again or contact support.')
                setPaypalLoading(false)
              },
              onCancel: (data: any) => {
                console.log('Payment cancelled:', data)
                setPaypalLoading(false)
              },
            })
            .render(container)
            .catch((err: any) => {
              console.error('PayPal button render error:', err)
            })
        }
      })
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      renderPayPalButtons()
    })

    // Re-render when billing period changes
    return () => {
      // Cleanup handled by clearing innerHTML
    }
  }, [paypalLoaded, billingPeriod])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          Limited Time: Save 20% with Annual Billing
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h1>
        <p className="text-lg text-muted-foreground mb-8">Unlimited creativity starts here</p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
              billingPeriod === 'yearly'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            {billingPeriod === 'yearly' && (
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                🔥 Save 50%
              </span>
            )}
          </button>
        </div>

        {/* Payment Error */}
        {paymentError && (
          <div className="mb-8 max-w-2xl mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{paymentError}</p>
          </div>
        )}

        {/* Loading overlay */}
        {paypalLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-8 rounded-lg flex items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-lg">Processing payment...</p>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {plan.badge}
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {plan.icon}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-muted-foreground">/{billingPeriod}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.monthlyCredits} credits / year
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* PayPal Button Container */}
                <div id={`paypal-button-container-${plan.id}`} className="w-full min-h-[45px]">
                  {!paypalLoaded && (
                    <div className="flex items-center justify-center w-full min-h-[45px]">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Plans Section */}
        <div className="max-w-4xl mx-auto mb-16 p-8 rounded-xl bg-muted/50">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Need a Team Plan?</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Custom solutions for teams and enterprises. Get dedicated support, custom integrations, and volume discounts.
          </p>
          <Button size="lg">Contact Sales</Button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16">
          <p className="text-muted-foreground mb-4">Have more questions? We're here to help</p>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xs text-muted-foreground">
          image-editor-recreation is an independent product and is not affiliated with Google or any of its brands
        </p>
      </div>
    </div>
  )
}
