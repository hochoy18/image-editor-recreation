import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = await createClient()

  // IMPORTANT: Avoid writing any logic between createClient and
  // supabase.auth.getClaims(). The automatic refresh is only triggered if
  // getClaims() is called immediately.
  const claims = await supabase.auth.getClaims()

  if (claims.error) {
    // If there's an error getting claims, just return the response
    return supabaseResponse
  }

  return supabaseResponse
}
