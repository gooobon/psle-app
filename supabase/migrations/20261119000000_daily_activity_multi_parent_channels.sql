-- Genius Project: server step 2/5 (daily activity log, multiple parents per child, alert channels).
-- Apply by hand in the Supabase SQL editor AFTER 20261118000000_init.sql. Safe to re-run (idempotent).
-- Nothing here deletes data.

-- ───────────────────────── Multiple parents per child ─────────────────────────
-- The init migration had `unique (child_id)` (inline, auto-named parent_child_child_id_key). Drop it so
-- parent_child is many-to-many. Primary key (parent_id, child_id) still prevents duplicate links.
alter table public.parent_child drop constraint if exists parent_child_child_id_key;

-- Parent email lives on profiles so a parent can link another parent by email (lower-cased).
alter table public.profiles add column if not exists email text;
create unique index if not exists profiles_parent_email_uidx on public.profiles (lower(email)) where email is not null;
-- Backfill for parents created by PR #8 (their email is in auth.users).
update public.profiles p set email = lower(u.email)
  from auth.users u
 where u.id = p.id and p.role = 'parent' and p.email is null;

-- is_parent_of() already checks parent_child for ANY row, so with many-to-many every linked parent
-- can read the child's profile / snapshots / daily_activity through the policies below. Re-declared
-- unchanged so this file is self-contained.
create or replace function public.is_parent_of(child uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.parent_child pc where pc.parent_id = auth.uid() and pc.child_id = child);
$$;

-- ───────────────────────── Alert channels (email now, whatsapp later) ─────────────────────────
-- One row per (parent, channel, address). parent_settings.alert_email is kept for backward
-- compatibility but is superseded by this table (TODO(owner): drop alert_email once nothing reads it).
create table if not exists public.parent_alert_channels (
  id         uuid primary key default gen_random_uuid(),
  parent_id  uuid not null references public.profiles(id) on delete cascade,
  channel    text not null check (channel in ('email','whatsapp')),
  address    text not null,                 -- email address, or E.164 phone number for whatsapp
  enabled    boolean not null default true,
  verified   boolean not null default false,
  created_at timestamptz not null default now(),
  unique (parent_id, channel, address)
);
alter table public.parent_alert_channels enable row level security;
drop policy if exists alert_channels_select on public.parent_alert_channels;
create policy alert_channels_select on public.parent_alert_channels for select using (parent_id = auth.uid());
drop policy if exists alert_channels_update on public.parent_alert_channels;
create policy alert_channels_update on public.parent_alert_channels for update
  using (parent_id = auth.uid()) with check (parent_id = auth.uid());
-- Inserts go through the service role (server validates the address). No delete policy.

-- Seed one email channel per existing parent from parent_settings.alert_email.
insert into public.parent_alert_channels (parent_id, channel, address, enabled, verified)
select ps.parent_id, 'email', lower(ps.alert_email), true, false
  from public.parent_settings ps
 where ps.alert_email is not null
on conflict do nothing;

-- ───────────────────────── Daily activity ─────────────────────────
create table if not exists public.daily_activity (
  user_id             uuid not null references public.profiles(id) on delete cascade,
  date                date not null,        -- Asia/Singapore local date, computed in the database
  subject             text not null check (subject in ('English','Chinese','Math','Science')),
  sets_completed      integer not null default 0 check (sets_completed >= 0),
  questions_answered  integer not null default 0 check (questions_answered >= 0),
  correct             integer not null default 0 check (correct >= 0),
  minutes             integer not null default 0 check (minutes >= 0),
  updated_at          timestamptz not null default now(),
  primary key (user_id, date, subject)
);
alter table public.daily_activity enable row level security;
drop policy if exists daily_activity_select on public.daily_activity;
create policy daily_activity_select on public.daily_activity for select
  using (user_id = auth.uid() or public.is_parent_of(user_id));
-- No insert/update/delete policies: clients write only through record_activity() below; nobody deletes.

-- Dedupe table so a retried request is applied once (idempotent writes).
create table if not exists public.daily_activity_events (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  event_id   uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);
alter table public.daily_activity_events enable row level security;  -- no policies: function-only

create or replace function public.record_activity(
  p_event uuid, p_subject text, p_sets int, p_questions int, p_correct int, p_minutes int
) returns void language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  d   date := (now() at time zone 'Asia/Singapore')::date;
  q   int  := greatest(0, least(coalesce(p_questions,0), 500));
begin
  if uid is null then raise exception 'not authenticated'; end if;
  if p_event is null then raise exception 'event id required'; end if;
  if p_subject not in ('English','Chinese','Math','Science') then raise exception 'bad subject'; end if;
  if not exists (select 1 from public.profiles where id = uid and role = 'student') then return; end if;

  insert into public.daily_activity_events (user_id, event_id) values (uid, p_event) on conflict do nothing;
  if not found then return; end if;   -- already applied

  insert into public.daily_activity as a (user_id, date, subject, sets_completed, questions_answered, correct, minutes, updated_at)
  values (uid, d, p_subject, greatest(0, least(coalesce(p_sets,0), 20)), q,
          greatest(0, least(coalesce(p_correct,0), q)), greatest(0, least(coalesce(p_minutes,0), 600)), now())
  on conflict (user_id, date, subject) do update set
    sets_completed     = a.sets_completed + excluded.sets_completed,
    questions_answered = a.questions_answered + excluded.questions_answered,
    correct            = a.correct + excluded.correct,
    minutes            = a.minutes + excluded.minutes,
    updated_at         = now();
end $$;
revoke all on function public.record_activity(uuid, text, int, int, int, int) from public;
grant execute on function public.record_activity(uuid, text, int, int, int, int) to authenticated;
