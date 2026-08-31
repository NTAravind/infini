# infini.io

Swiss-style black & white marketing site + admin panel. Built with Next.js 16 (App Router), TypeScript, shadcn/ui (Tailwind v4), and Supabase.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values
npm run dev                  # http://localhost:3000
```

### 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `NEXT_PUBLIC_SUPABASE_URL` and the publishable (anon) key from **Settings → API** into `.env.local`.
3. Run the schema + RLS migration in `supabase/migrations/20260828000000_infini_schema.sql` (or `supabase db push`).
4. In **Authentication → Users**, invite `ntaravindnarayanan7@gmail.com` and set a password — that's the only account allowed into `/admin`.
5. Public form submissions (consult + waitlist) work immediately via RLS; the admin CRUD works once signed in.

### 2. Run it

- Public site: `/` (hero, services, products, work, why, consult)
- Admin: `/admin` — Projects manager, Consult Requests inbox, Product Waitlist

### 3. Optional — new-lead email notifications

Deploy `supabase/functions/notify-new-lead` and add a **Database Webhook** on `consult_requests` (INSERT). Set a `RESEND_API_KEY` secret and it emails `ntaravindnarayanan7@gmail.com` on every enquiry.

## Section map (copy in `prompts/infinio-site-spec.md`)

| Section | Route / anchor |
|---|---|
| Hero, Services, Work, Why | `app/page.tsx` |
| Products (waitlist) | `#products` |
| Consult form | `#consult` |
| Admin | `/admin` |

Image slots are marked `<!-- ... PLACEHOLDER -->` throughout — drop real assets in with no code changes required for inline placeholders in the hero.# infini
