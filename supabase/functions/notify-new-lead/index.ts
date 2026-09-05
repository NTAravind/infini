// =============================================================================
// notify-new-lead — optional email hook for new consult_requests
// Configure in Supabase dashboard:
//   Database → Webhooks → Create a webhook on consult_requests (INSERT)
//   → edge function: notify-new-lead
// Requires RESEND_API_KEY secret set in the edge function environment.
// =============================================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts"

const ADMIN_EMAIL = "ntaravindnarayanan7@gmail.com"
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const RESEND_URL = "https://api.resend.com/emails"

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const { phone, name, service, budget, message } = await req.json().catch(() => ({}))

  if (!phone || !name || !service || !budget) {
    return new Response("Missing lead fields", { status: 400 })
  }

  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set — skipping email. Lead:", { phone, name })
    return new Response("No RESEND_API_KEY — skipped", { status: 200 })
  }

  const body = {
    from: "infini.io <leads@infini.io>",
    to: [ADMIN_EMAIL],
    subject: `New enquiry — ${name}`,
    text: [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      "",
      "Message:",
      message || "(none)",
    ].join("\n"),
  }

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return new Response(`Resend error: ${await res.text()}`, { status: 502 })
  }

  return new Response("OK", { status: 200 })
})