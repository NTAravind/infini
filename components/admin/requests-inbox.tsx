"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { CONSULT_STATUSES, type ConsultRequest, type ConsultStatus } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type RequestsInboxProps = {
  initialRequests: ConsultRequest[]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export function RequestsInbox({ initialRequests }: RequestsInboxProps) {
  const router = useRouter()
  const [requests, setRequests] = useState(initialRequests)
  const [busy, setBusy] = useState<string | null>(null)

  async function onStatusChange(id: string, status: ConsultStatus) {
    setBusy(id)
    const supabase = createClient()
    const { error } = await supabase
      .from("consult_requests")
      .update({ status })
      .eq("id", id)

    setBusy(null)

    if (error) {
      toast.error("Could not update status.")
      return
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    )
    router.refresh()
  }

  return (
    <div className="pt-10">
      <div className="overflow-x-auto border border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-black bg-muted">
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  No enquiries yet — submissions from the site will appear here.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id} className="border-black align-top">
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.phone}</TableCell>
                  <TableCell>{request.service}</TableCell>
                  <TableCell className="whitespace-nowrap">{request.budget}</TableCell>
                  <TableCell className="max-w-xs text-muted-foreground">
                    {request.message || "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(request.created_at)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={request.status}
                      onValueChange={(value) =>
                        onStatusChange(request.id, value as ConsultStatus)
                      }
                      disabled={busy === request.id}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CONSULT_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex gap-2">
        {CONSULT_STATUSES.map((status) => (
          <Badge key={status} variant="outline" className="rounded-none">
            {status}
          </Badge>
        ))}
      </div>
    </div>
  )
}