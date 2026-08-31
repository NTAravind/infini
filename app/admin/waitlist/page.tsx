import { createClient } from "@/lib/supabase/server"
import type { WaitlistEntry } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const dynamic = "force-dynamic"

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export default async function AdminWaitlistPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("product_waitlist")
    .select("*")
    .order("created_at", { ascending: false })

  const entries = (data ?? []) as WaitlistEntry[]

  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <div className="border-b border-black pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Waitlist
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Product Waitlist
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Emails captured from the “Notify Me” buttons on the Products section.
        </p>
      </div>

      <div className="pt-10 overflow-x-auto border border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-black bg-muted">
              <TableHead>Email</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                  No signups yet.
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.id} className="border-black">
                  <TableCell>
                    <a
                      href={`mailto:${entry.email}`}
                      className="underline underline-offset-2"
                    >
                      {entry.email}
                    </a>
                  </TableCell>
                  <TableCell>{entry.product}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(entry.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}