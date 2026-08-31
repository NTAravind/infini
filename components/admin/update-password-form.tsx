"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"
import { ADMIN_EMAIL } from "@/lib/supabase/env"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function waitForSession() {
  const supabase = createClient()
  for (let i = 0; i < 10; i++) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) return session
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  return null
}

export function UpdatePasswordForm() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [valid, setValid] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true

    waitForSession().then((session) => {
      if (!mounted) return
      setValid(!!session && session.user.email === ADMIN_EMAIL)
      setChecking(false)
    })

    return () => {
      mounted = false
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  if (checking) {
    return <p className="text-sm text-white/60">Checking reset link…</p>
  }

  if (!valid) {
    return (
      <p className="text-sm leading-relaxed text-white/60">
        This password reset link is invalid or has expired. Request a new one
        from the sign-in page.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="new-password" className="text-white/70">
          New password
        </Label>
        <Input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="••••••••"
          className="h-11 rounded-none border-white/25 bg-transparent px-4 text-white placeholder:text-white/40 focus-visible:border-white"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirm-password" className="text-white/70">
          Confirm new password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          placeholder="••••••••"
          className="h-11 rounded-none border-white/25 bg-transparent px-4 text-white placeholder:text-white/40 focus-visible:border-white"
        />
      </div>

      {error ? <p className="text-sm text-white">{error}</p> : null}

      <Button
        type="submit"
        disabled={loading}
        className="h-11 rounded-none bg-white text-black hover:bg-white/80"
      >
        {loading ? "Updating…" : "Update Password"}
      </Button>
    </form>
  )
}