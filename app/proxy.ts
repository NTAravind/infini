import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { getSupabaseEnv } from "@/lib/supabase/env"

/**
 * Next.js 16 renamed `middleware` to `proxy`.
 * This only refreshes the Supabase auth token for /admin routes — the actual
 * page protection happens in the admin layout server component.
 */
export async function proxy(request: NextRequest) {
  const { url, key } = getSupabaseEnv()

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  await supabase.auth.getClaims()

  return supabaseResponse
}

export const config = {
  matcher: ["/admin/:path*"],
}