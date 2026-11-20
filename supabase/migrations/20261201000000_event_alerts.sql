-- Genius Project: real-time parent event alerts (issue #56). Apply by hand in the Supabase SQL editor. Safe to re-run.
-- Alerts stay OFF until the owner sets WHATSAPP_ENABLED=true; this migration changes no existing behaviour.

-- 1) event_alert_log: one row per (parent, event). The uniqueness key is what stops duplicates:
--      started:<child>:<SGT day>              -> at most one "practice started" per child per SGT day
--      milestone:<child>:<subject>:<set key>   -> a retried/double-submitted milestone cannot send twice
--    Rows are claimed BEFORE sending. 'deferred' rows wait for the end of the parent's quiet hours (send_after) and keep deduping.
--    alert_log (parent/day/channel) cannot express these events, so it is left untouched.
create table if not exists public.event_alert_log (
  parent_id  uuid not null references public.profiles(id) on delete cascade,
  child_id   uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('started','milestone')),
  event_key  text not null,
  status     text not null default 'claimed' check (status in ('claimed','deferred','sent','error','skipped')),
  send_after timestamptz,
  payload    jsonb,                          -- child name, subject, label, score/total (no phone numbers, no addresses)
  detail     text,                           -- short reason / provider status only
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (parent_id, event_key)
);
create index if not exists event_alert_log_due_idx on public.event_alert_log (send_after) where status = 'deferred';
alter table public.event_alert_log enable row level security;
-- No policies on purpose: only the service role (server routes) reads/writes this table.

-- 2) Quiet hours per parent (SGT, HH:MM). Default 21:30-06:30. Messages inside the window are delayed, never dropped.
alter table public.parent_settings add column if not exists quiet_enabled boolean not null default true;
alter table public.parent_settings add column if not exists quiet_start   text    not null default '21:30';
alter table public.parent_settings add column if not exists quiet_end     text    not null default '06:30';
