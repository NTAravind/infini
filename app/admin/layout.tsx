import { redirect } from "next/navigation"
import Link from "next/link"

import { createClient } from "@/lib/supabase/server"
import { ADMIN_EMAIL } from "@/lib/supabase/env"
import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
import { PasswordResetDialog } from "@/components/admin/password-reset-dialog"

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Inbox", href: "/admin/requests" },
  { label: "Waitlist", href: "/admin/waitlist" },
]

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-black bg-background">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/admin" className="text-lg font-bold lowercase tracking-tight">
            infini.io
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Admin">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user.email}
            </span>
            <PasswordResetDialog />
            <AdminLogoutButton />
          </div>
        </div>
        <nav
          className="flex items-center gap-6 overflow-x-auto px-5 md:hidden"
          aria-label="Admin mobile"
        >
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap border-b-2 border-transparent py-2 text-sm font-medium hover:border-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-16">{children}</main>
    </div>
  )
}