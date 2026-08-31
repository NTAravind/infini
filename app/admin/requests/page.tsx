import { createClient } from "@/lib/supabase/server"
import type { ConsultRequest } from "@/lib/types"
import { RequestsInbox } from "@/components/admin/requests-inbox"

export const dynamic = "force-dynamic"

export default async function AdminRequestsPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("consult_requests")
    .select("*")
    .order("created_at", { ascending: false })

  const requests = (data ?? []) as ConsultRequest[]

  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <div className="border-b border-black pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Enquiries
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Consult Requests
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Form submissions from the “Let&apos;s Talk” section. Mark as contacted,
          then closed, once you&apos;ve replied.
        </p>
      </div>

      <RequestsInbox initialRequests={requests} />
    </div>
  )
}