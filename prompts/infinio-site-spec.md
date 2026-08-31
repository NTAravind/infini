# infini.io — Website Build Spec

> Instructions for opencode. Build a Next.js (App Router) site with shadcn/ui and Supabase, Swiss-style black & white design. This file contains full content copy + design direction + functional spec. Follow it section by section.

---

## 1. Brand & Design System

**Brand name:** infini.io
**Motto:** "Affordable online presence for businesses. Increasing value."

**Style:** Swiss / International Typographic Style
- Strict grid layout, generous whitespace, strong left-aligned or centered type hierarchy
- Black (#0A0A0A) and white (#FFFFFF) only — no accent colors. Use grey (#6B6B6B / #E5E5E5) only for secondary text and hairline dividers
- Typography-led: one grotesk/sans typeface family (e.g. Helvetica Now, Inter, or Neue Haas Grotesk via next/font). Use weight and size contrast instead of color for hierarchy
- Big, confident headline type (64–120px on desktop hero), tight tracking on headlines, generous line-height on body copy
- Thin 1px black hairline rules to separate sections instead of shadows/cards where possible
- Asymmetric grid blocks, numbered sections (e.g. "01 — Websites") is a very Swiss-style device — use it in the services section
- No gradients, no rounded-corner-heavy soft UI. Sharp or minimally rounded (2–4px) corners on shadcn components — override the default shadcn radius to be small
- Motion: minimal — simple fade/slide-up on scroll, no bouncy easing

**Tech stack:**
- Next.js 14+ App Router, TypeScript
- shadcn/ui for all components (Button, Dialog, Form, Table, Input, Textarea, Select, Card, Badge, Toast/Sonner)
- Tailwind CSS, configured to a black/white/grey palette only
- Supabase: Postgres DB, Storage (for project preview images), Auth (admin login)
- next/font for typography

---

## 2. Navigation

Sticky top nav, Swiss grid style, thin bottom hairline border.

**Layout:** Logo left ("infini.io" wordmark, all lowercase, bold) — nav links center or right — "Contact Us" as a solid black button (white text) on the far right.

**Left/Logo:** `infini.io`

**Nav links:**
- `Websites`
- `AI Services`
- `Products`

**CTA button:** `Contact Us` — solid black bg, white text, sharp corners, links to the Consult Us section (`#consult`)

**Note:** Leave a placeholder image slot in the nav (e.g. small logomark left of wordmark) — `<!-- LOGO IMAGE PLACEHOLDER -->` — Aravind will supply the image asset.

Mobile: hamburger menu, full-screen black overlay menu with white type on open (Swiss poster style).

---

## 3. Hero Section

Full-width, generous vertical padding (min 80vh). Large Swiss-grid headline. Must visually/contextually foreground **ecommerce** and **AI** as the two pillars.

**Headline:**
`We build ecommerce and AI-powered businesses.`

**Subheadline:**
`infini.io is a web & AI development agency. We design and build online stores, apps, websites, and AI agents that give your business an affordable online presence — and grow its value.`

**CTA buttons (two, side by side):**
- Primary (solid black): `Start a Project` → links to `#consult`
- Secondary (outline black): `See Our Work` → links to `#work`

**Visual treatment:**
- Split or overlapping two-block layout: one block labeled `Ecommerce` and one labeled `AI Agents`, each with an image placeholder (`<!-- HERO ECOMMERCE IMAGE -->`, `<!-- HERO AI IMAGE -->`)
- Small eyebrow label above headline: `WEB & AI DEVELOPMENT AGENCY`
- Thin numbered index in a corner, Swiss-style: `01 / infini.io`

---

## 4. Services Section

Numbered list, Swiss editorial grid (index number + title + short description per row, separated by hairlines).

**Section title:** `What We Build`

**01 — Ecommerce Development**
Custom online stores built to convert. Product catalogs, checkout, payments, and inventory — built fast, built to scale.

**02 — App Development**
Mobile and web apps for businesses that need more than a website. React Native and Next.js builds, end to end.

**03 — Website Development**
Fast, modern, affordable websites for businesses of any size — built on Next.js, designed to rank and convert.

**04 — AI Agent Development**
Custom AI agents for your business — customer support, sales, operations. Built on your data, deployed to your workflows.

**05 — AI Automations**
We automate the repetitive parts of your business with AI — so your team can focus on what matters.

---

## 5. Products Section (`#products`)

Distinct from the "What We Build" services list — this is for infini.io's own in-house products, not client work. Same Swiss numbered-block style as Services, but visually separated (e.g. inverted black background) so it reads as "products we own," not "services we sell."

**Section title:** `Our Products`
**Subtitle:** `Built by infini.io, for businesses like yours.`

**01 — WhatsApp AI Agent** — `Coming Soon`
A multi-tenant WhatsApp AI agent platform for businesses — automated customer support, sales, and bookings, right inside WhatsApp. Currently in development.

- Show a `Coming Soon` shadcn `Badge` next to the product name (outline style, not filled — keep it low-key on the black/white palette)
- CTA on this card: `Notify Me` — a simple email-capture button/input that inserts into a Supabase table `product_waitlist` (fields: `email`, `product`, `created_at`)
- No live link yet — button should not point anywhere else, just capture the email

Leave room in this section's layout for more product cards to be added later (grid should support 1–4 items without looking sparse with just one).

---

## 6. Work / Portfolio Section (`#work`)

Pulls dynamically from Supabase (see Section 8 — Admin Panel). Grid of client project cards.

**Section title:** `Our Work`
**Subtitle:** `Websites and AI systems we've shipped for real businesses.`

**Each project card shows:**
- Preview image
- Project name
- Category badge (`Website` / `AI Service` / `Ecommerce` / `App`)
- One-line description of what it is
- Client testimonial quote (shown on hover or below, in italic, smaller grey type)

**Layout:** 2 or 3-column responsive grid, sharp-cornered cards, thin black border (no shadow), consistent aspect-ratio image crop.

If no projects exist yet in Supabase, show 3 placeholder cards with `<!-- PROJECT IMAGE PLACEHOLDER -->`.

---

## 7. Why infini.io Section

Simple 3-column Swiss block, numbers again for consistency.

**Section title:** `Why infini.io`

- **Affordable** — Agency-quality work without agency pricing. Built lean, priced fairly.
- **Fast** — Modern stacks (Next.js, Supabase) mean faster builds and faster launches.
- **Built to grow value** — We don't just ship a site. We build systems — ecommerce, AI agents, automations — that compound your business's value over time.

---

## 8. Consult Us Section (`#consult`) — PRIMARY FOCUS

This is the main conversion section. Large, clean, centered form on a stark black or white background (use inverted section — black background, white form — for contrast, staying on-brand).

**Section title:** `Let's Talk`
**Subtitle:** `Tell us about your business. We'll get back to you with a plan and a quote.`

**Form fields (shadcn `Form` + `react-hook-form` + `zod` validation):**
1. **Name** — text input, required — label: `Your Name`
2. **Email** — email input, required — label: `Email` *(add even though not explicitly requested — needed to respond to the lead; flag this as an addition, not required if Aravind wants to drop it)*
3. **Service wanted** — shadcn `Select`, required — label: `What service do you need?`
   - Options: `Website Development`, `Ecommerce Store`, `App Development`, `AI Agent Development`, `AI Automations`, `Not sure yet`
4. **Budget** — shadcn `Select` or text input, required — label: `What's your budget?`
   - Suggested ranges: `Under ₹50,000`, `₹50,000 – ₹1,50,000`, `₹1,50,000 – ₹5,00,000`, `₹5,00,000+`, `Not sure yet`
5. **Message** (optional) — `Textarea` — label: `Anything else we should know?`

**Submit button:** `Send Enquiry` — solid black/white (inverted per section bg), full width or large on mobile.

**On submit:**
- Insert row into Supabase table `consult_requests` (see schema below)
- Show shadcn `Sonner` toast: `Thanks — we'll be in touch within 24 hours.`
- Optionally trigger a Supabase Edge Function or email hook to notify `ntaravindnarayanan7@gmail.com` of new leads

---

## 9. Admin Panel (`/admin`)

**Access:** Supabase Auth, email/password or magic link restricted to `ntaravindnarayanan7@gmail.com` only. Protect all `/admin/*` routes with middleware checking session + email match.

**Admin panel sections:**

### A. Projects Manager
CRUD interface for portfolio items shown in the public `#work` section.

**Fields per project:**
- `title` (text)
- `category` (select: Website / Ecommerce / App / AI Service)
- `preview_image` (upload → Supabase Storage bucket `project-images`)
- `description` (textarea — "what it is")
- `testimonial_text` (textarea)
- `testimonial_author` (text — client name/company, optional)
- `project_url` (optional link to live project)
- `published` (boolean toggle — show/hide on public site)

Use shadcn `Table` for the list view, shadcn `Dialog` + `Form` for create/edit, `Input type="file"` for image upload with preview.

### B. Consult Requests Inbox
Read-only (or mark-as-contacted) table of all form submissions from `#consult`.
Columns: Name, Email, Service, Budget, Message, Submitted At, Status (`New` / `Contacted` / `Closed` — updatable dropdown).

### C. Product Waitlist
Read-only table of emails captured from "Notify Me" on the Products section.
Columns: Email, Product, Submitted At.

---

## 10. Supabase Schema

```sql
-- Projects (portfolio items)
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Website','Ecommerce','App','AI Service')),
  preview_image_url text,
  description text not null,
  testimonial_text text,
  testimonial_author text,
  project_url text,
  published boolean default true,
  created_at timestamptz default now()
);

-- Product waitlist (e.g. "Notify Me" on WhatsApp AI Agent — Coming Soon)
create table product_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product text not null,
  created_at timestamptz default now()
);

-- Consult Us form submissions
create table consult_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text not null,
  budget text not null,
  message text,
  status text default 'New' check (status in ('New','Contacted','Closed')),
  created_at timestamptz default now()
);
```

Storage bucket: `project-images` (public read, admin-only write via RLS policy checking `auth.email() = 'ntaravindnarayanan7@gmail.com'`).

RLS: `consult_requests` — insert allowed for `anon`/`public`; select/update restricted to admin email. `projects` — select allowed for `published = true` on public site; full access for admin.

---

## 11. Footer

Minimal, Swiss style. Black background, white text, hairline top border.

- `infini.io` wordmark
- Tagline: `Affordable online presence for businesses. Increasing value.`
- Nav repeat: Websites · AI Services · Contact Us
- `© 2026 infini.io. All rights reserved.`

---

## 12. Build Notes for opencode

- Use `app/` router structure: `app/page.tsx` (home, all public sections), `app/admin/page.tsx` + nested routes, `app/api/` or Supabase client-side calls for form/project CRUD
- Keep all copy above as the actual site content — don't placeholder it, it's final
- Only image assets are placeholders (marked with `<!-- ... -->` comments) — leave clearly marked spots for Aravind to drop in real images later
- Enforce black/white-only Tailwind theme in `tailwind.config` — no default blue/etc shadcn colors
- Reduce shadcn's default border-radius tokens to keep the sharp Swiss look
- Mobile-first responsive, but hero should feel like a poster on desktop
