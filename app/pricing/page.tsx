'use client'

import { useState } from 'react'
import { Check, Sparkles, Zap, Crown, Users } from 'lucide-react'
import { CreemCheckout } from '@creem_io/nextjs'
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
  monthlyPrice: string
  yearlyPrice: string
  badge?: string
  popular?: boolean
  icon: React.ReactNode
}

const planIds = {
  basic: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_BASIC_MONTHLY || 'prod_7XMOVHA3KDAMXPx1YLqiqs',
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_BASIC_YEARLY || 'prod_7XMOVHA3KDAMXPx1YLqiqs',
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_PRO_MONTHLY || 'prod_7XMOVHA3KDAMXPx1YLqiqs',
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_PRO_YEARLY || 'prod_7XMOVHA3KDAMXPx1YLqiqs',
  },
  max: {
    monthly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_MAX_MONTHLY || 'prod_7XMOVHA3KDAMXPx1YLqiqs',
    yearly: process.env.NEXT_PUBLIC_CREEM_PRODUCT_MAX_YEARLY || 'prod_7XMOVHA3KDAMXPx1YLqiqs',
  },
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for individuals and light users',
    monthlyCredits: 200,
    imagesPerMonth: 100,
    monthlyPrice: '$9',
    yearlyPrice: '$90',
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
    monthlyPrice: '$29',
    yearlyPrice: '$290',
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
    monthlyPrice: '$99',
    yearlyPrice: '$990',
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
    answer: 'We support credit cards, debit cards, Alipay, WeChat Pay, and various other payment methods. All payments are processed through secure third-party payment platforms.',
  },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly')

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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
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
                      {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
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

                <CreemCheckout
                  productId={
                    billingPeriod === 'monthly'
                      ? planIds[plan.id as keyof typeof planIds].monthly
                      : planIds[plan.id as keyof typeof planIds].yearly
                  }
                >
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CreemCheckout>
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
