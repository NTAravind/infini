import Link from "next/link"

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

async function getCounts() {
  const supabase = await createClient()

  const [projects, consult, waitlist] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase
      .from("consult_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "New"),
    supabase.from("product_waitlist").select("id", { count: "exact", head: true }),
  ])

  return {
    projects: projects.count ?? 0,
    pendingRequests: consult.count ?? 0,
    waitlist: waitlist.count ?? 0,
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts()

  const cards = [
    {
      index: "01",
      label: "Live Projects",
      value: counts.projects,
      href: "/admin/projects",
      action: "Manage portfolio",
    },
    {
      index: "02",
      label: "New Enquiries",
      value: counts.pendingRequests,
      href: "/admin/requests",
      action: "Open inbox",
    },
    {
      index: "03",
      label: "Waitlist Signups",
      value: counts.waitlist,
      href: "/admin/waitlist",
      action: "View list",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <div className="flex flex-col gap-2 border-b border-black pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Manage infini.io
          </h1>
        </div>
        <Button asChild className="h-10 rounded-none">
          <Link href="/">View public site</Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-px border border-black bg-black md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.index}
            href={card.href}
            className="group flex flex-col bg-background p-8 transition-colors hover:bg-muted"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground tabular-nums">
                {card.index}
              </p>
              <p className="text-5xl font-bold tracking-tight tabular-nums">
                {card.value}
              </p>
            </div>
            <h2 className="mt-8 text-xl font-semibold tracking-tight">
              {card.label}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{card.action}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}