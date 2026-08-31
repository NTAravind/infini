export const PROJECT_CATEGORIES = [
  "Website",
  "Ecommerce",
  "App",
  "AI Service",
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  preview_image_url: string | null
  description: string
  testimonial_text: string | null
  testimonial_author: string | null
  project_url: string | null
  published: boolean
  created_at: string
}

export const CONSULT_STATUSES = ["New", "Contacted", "Closed"] as const

export type ConsultStatus = (typeof CONSULT_STATUSES)[number]

export type ConsultRequest = {
  id: string
  name: string
  email: string
  service: string
  budget: string
  message: string | null
  status: ConsultStatus
  created_at: string
}

export type WaitlistEntry = {
  id: string
  email: string
  product: string
  created_at: string
}

export const SERVICE_OPTIONS = [
  "Business Website",
  "Online Store",
  "Customer App",
  "AI Receptionist",
  "AI Assistant",
  "Not sure yet",
] as const

export const BUDGET_OPTIONS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
] as const