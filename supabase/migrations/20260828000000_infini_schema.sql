-- =============================================================================
-- infini.io — core schema
-- Applies: tables, RLS, storage bucket, Data API grants
-- Run in the Supabase SQL editor, or via: supabase db push
-- =============================================================================

-- ----------------------------------------------------------------------------
-- Projects (portfolio items shown in the public #work section)
-- ----------------------------------------------------------------------------
create table if not exists public.projects (
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

-- Product waitlist ("Notify Me" — WhatsApp AI Agent, coming soon)
create table if not exists public.product_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product text not null,
  created_at timestamptz default now()
);

-- Consult Us form submissions
create table if not exists public.consult_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text not null,
  budget text not null,
  message text,
  status text default 'New' check (status in ('New','Contacted','Closed')),
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- RLS — enabled everywhere; policies mirror the access model exactly
-- ----------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.product_waitlist enable row level security;
alter table public.consult_requests enable row level security;

-- Projects: public may read published only; the admin (only) manages all rows
create policy "projects_public_read_published"
  on public.projects for select
  using (published = true);

create policy "projects_admin_all"
  on public.projects for all
  using (auth.email() = 'ntaravindnarayanan7@gmail.com')
  with check (auth.email() = 'ntaravindnarayanan7@gmail.com');

-- Waitlist: anyone may sign up; only the admin may read it
create policy "waitlist_public_insert"
  on public.product_waitlist for insert
  with check (true);

create policy "waitlist_admin_read"
  on public.product_waitlist for select
  using (auth.email() = 'ntaravindnarayanan7@gmail.com');

-- Consult requests: anyone may submit; only the admin may read/update them
create policy "consult_public_insert"
  on public.consult_requests for insert
  with check (true);

create policy "consult_admin_read"
  on public.consult_requests for select
  using (auth.email() = 'ntaravindnarayanan7@gmail.com');

create policy "consult_admin_update"
  on public.consult_requests for update
  using (auth.email() = 'ntaravindnarayanan7@gmail.com')
  with check (auth.email() = 'ntaravindnarayanan7@gmail.com');

-- ----------------------------------------------------------------------------
-- Storage — public bucket for project preview images
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Public read
create policy "project_images_public_read"
  on storage.objects for select
  using (bucket_id = 'project-images');

-- Admin-only write (insert / update / delete)
create policy "project_images_admin_insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-images' and auth.email() = 'ntaravindnarayanan7@gmail.com');

create policy "project_images_admin_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-images' and auth.email() = 'ntaravindnarayanan7@gmail.com')
  with check (bucket_id = 'project-images' and auth.email() = 'ntaravindnarayanan7@gmail.com');

create policy "project_images_admin_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-images' and auth.email() = 'ntaravindnarayanan7@gmail.com');

-- ----------------------------------------------------------------------------
-- Data API grants (new tables may be hidden from the REST API otherwise)
-- ----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;

grant insert, select on public.product_waitlist to anon;
grant select on public.product_waitlist to authenticated;

grant insert, select on public.consult_requests to anon;
grant select, update on public.consult_requests to authenticated;