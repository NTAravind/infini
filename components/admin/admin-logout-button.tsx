"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export function AdminLogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onLogout() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      onClick={onLogout}
      disabled={loading}
      className="h-8 rounded-none text-sm"
    >
      {loading ? "Signing out…" : "Sign out"}
    </Button>
  )
}