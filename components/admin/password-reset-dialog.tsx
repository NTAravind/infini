"use client"

import { useState } from "react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PasswordResetDialog() {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

    toast.success("Password updated.")
    setPassword("")
    setConfirm("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 rounded-none text-sm"
          disabled={loading}
        >
          Reset password
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "rounded-none",
          "focus:outline-none"
        )}
      >
        <DialogHeader className="text-left">
          <DialogTitle className="font-heading">Reset password</DialogTitle>
          <DialogDescription>
            Update the password you use to sign in to the admin panel.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-5 px-1 py-2">
          <div className="grid gap-2">
            <Label htmlFor="dlg-new-password">New password</Label>
            <Input
              id="dlg-new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="h-10 rounded-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dlg-confirm-password">Confirm new password</Label>
            <Input
              id="dlg-confirm-password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              className="h-10 rounded-none"
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-none">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-none"
            >
              {loading ? "Updating…" : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}