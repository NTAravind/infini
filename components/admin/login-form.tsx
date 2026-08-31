"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"
import { ADMIN_EMAIL } from "@/lib/supabase/env"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onPasswordSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)

    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "Incorrect email or password."
          : error.message
      )
      return
    }

    router.push("/admin")
    router.refresh()
  }

  async function onMagicLink() {
    setError(null)
    setNotice(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setNotice("Magic link sent — check your inbox.")
  }

  async function onForgotPassword() {
    setError(null)
    setNotice(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/update-password`,
    })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setNotice("Password reset link sent — check your inbox.")
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <form onSubmit={onPasswordSignIn} className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="admin-email" className="text-white/70">
            Email
          </Label>
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="h-11 rounded-none border-white/25 bg-transparent px-4 text-white placeholder:text-white/40 focus-visible:border-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="admin-password" className="text-white/70">
            Password
          </Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-11 rounded-none border-white/25 bg-transparent px-4 text-white placeholder:text-white/40 focus-visible:border-white"
          />
        </div>

        {error ? <p className="text-sm text-white">{error}</p> : null}
        {notice ? <p className="text-sm text-white/70">{notice}</p> : null}

        <Button
          type="submit"
          disabled={loading}
          className="h-11 rounded-none bg-white text-black hover:bg-white/80"
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3 border-t border-white/15 pt-6">
        <button
          type="button"
          onClick={onMagicLink}
          disabled={loading}
          className="text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white disabled:opacity-50"
        >
          Send me a magic link instead
        </button>
        <button
          type="button"
          onClick={onForgotPassword}
          disabled={loading}
          className="text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white disabled:opacity-50"
        >
          Forgot password?
        </button>
      </div>
    </div>
  )
}