-- Genius Project: server step 3/5 (daily alert idempotency log, guardian invites with acceptance).
-- Apply by hand in the Supabase SQL editor AFTER 20261119000000_daily_activity_and_guardians.sql. Safe to re-run (idempotent).

-- 1) alert_log: one row per (parent, Singapore date, channel). The cron claims a row BEFORE sending,
--    so a retried/duplicated cron run cannot send the same parent twice in a day.
create table if not exists public.alert_log (
  parent_id  uuid not null references public.profiles(id) on delete cascade,
  date       date not null,                 -- Asia/Singapore local date of the alert
  channel    text not null,                 -- 'email' | 'whatsapp'
  status     text not null default 'claimed' check (status in ('claimed','sent','error','skipped')),
  detail     text,                          -- short provider status / error (no message bodies, no addresses)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (parent_id, date, channel)
);
alter table public.alert_log enable row level security;
-- No policies on purpose: only the service role (the cron route) reads/writes this table.

-- 2) guardian_invites: replaces "link by email = instant access".
--    A pending invite is just a row here; it is NOT in parent_child, so is_parent_of() stays false and
--    every RLS policy that relies on it (profiles, progress_snapshots, daily_activity) grants nothing.
create table if not exists public.guardian_invites (
  id          uuid primary key default gen_random_uuid(),
  child_id    uuid not null references public.profiles(id) on delete cascade,
  inviter_id  uuid not null references public.profiles(id) on delete cascade,
  email       text not null,                -- invited parent's email, lower-cased by the API
  status      text not null default 'pending' check (status in ('pending','accepted','revoked')),
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null default (now() + interval '7 days'),
  accepted_by uuid references public.profiles(id) on delete set null,
  accepted_at timestamptz,
  revoked_at  timestamptz
);
-- At most one live pending invite per child + email (expired ones are flipped/ignored by the API).
create unique index if not exists guardian_invites_pending_uq on public.guardian_invites(child_id, lower(email)) where status = 'pending';
create index if not exists guardian_invites_email_idx on public.guardian_invites(lower(email));
alter table public.guardian_invites enable row level security;

-- The inviting parent can see invites they sent (to list/revoke). The invitee reads theirs via the API
-- (service role, matched on the verified login email). Writes: service role only. No delete policy.
drop policy if exists guardian_invites_select on public.guardian_invites;
create policy guardian_invites_select on public.guardian_invites for select using (inviter_id = auth.uid());

-- 3) Make explicit that access depends ONLY on an accepted parent_child row. (Unchanged logic; re-declared
--    so this migration documents the guarantee: pending/expired/revoked invites grant no access.)
create or replace function public.is_parent_of(child uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.parent_child pc where pc.parent_id = auth.uid() and pc.child_id = child);
$$;

-- 4) Study minutes: no schema change. daily_activity.minutes already exists and record_activity() already
--    accepts p_minutes (capped at 240 per call); the client now measures it.
