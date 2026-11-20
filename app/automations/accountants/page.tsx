import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountantsLanding } from "@/components/accountants-landing"

export const metadata: Metadata = {
  title: "Document Chase Automation for CA & Accounting Firms | Infiniio",
  description: "Send document reminders, collect files and track client progress across ITR, GST and audit work.",
  alternates: { canonical: "https://infiniio.tech/automations/accountants" },
  openGraph: {
    title: "Document Chase Automation for CA & Accounting Firms | Infiniio",
    description: "Send document reminders, collect files and track client progress across ITR, GST and audit work.",
    url: "https://infiniio.tech/automations/accountants",
    siteName: "Infiniio",
    type: "website",
  },
}

export default function AccountantsPage() {
  return <><SiteHeader /><AccountantsLanding /><SiteFooter /></>
}
