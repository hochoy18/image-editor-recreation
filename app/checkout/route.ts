import { Checkout } from '@creem_io/nextjs'

export const GET = Checkout({
  apiKey: process.env.CREEM_API_KEY!,
  testMode: process.env.CREEM_MODE === 'test',
  defaultSuccessUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
})
