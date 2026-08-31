"use client"

import { useState } from "react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistForm({ product }: { product: string }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: dbError } = await supabase
      .from("product_waitlist")
      .insert({ email: email.trim().toLowerCase(), product })

    setLoading(false)

    if (dbError) {
      setError("Something went wrong — please try again.")
      return
    }

    toast("You're on the list — we'll be in touch when it launches.")
    setEmail("")
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
        className="h-11 rounded-sm border-white/25 bg-transparent px-4 text-sm text-white placeholder:text-white/40 md:w-72"
      />
      <Button
        type="submit"
        disabled={loading}
        className="h-11 rounded-sm bg-white px-6 text-sm font-medium text-black hover:bg-white/80"
      >
        {loading ? "Joining…" : "Notify Me"}
      </Button>
      {error ? (
        <p className="text-xs font-medium text-white sm:col-span-2">{error}</p>
      ) : null}
    </form>
  )
}