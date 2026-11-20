alter table public.consult_requests
  add column if not exists firm_name text,
  add column if not exists work_email text,
  add column if not exists staff_count integer;
