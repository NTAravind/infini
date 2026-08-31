export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""

  if (!url || !key) {
    // Fall back to a visibly-invalid configuration so builds/dev don't crash
    // before the user wires up their Supabase project.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
      )
    }
    return { url: "https://placeholder.supabase.co", key: "anon-key" }
  }

  return { url, key }
}

/** Single admin account allowed into /admin. */
export const ADMIN_EMAIL = "ntaravindnarayanan7@gmail.com"