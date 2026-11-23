-- Genius Project: ClewQuest Phase 1 (docs/design/clewquest-phase1-spec.md section 3).
-- Apply by hand in the Supabase SQL editor. NOT applied by the PR. Safe to re-run.
-- ADDITIVE ONLY: new tables, indexes, policies. Nothing is dropped, renamed or rewritten.
-- RLS: a student reads/writes their own character; linked parents read via is_parent_of(); the thread ledger,
-- seen-items and stage cache are written by the service role only (server routes), students/parents can only read.

-- 3.1 character (one per student)
create table if not exists public.clewquest_characters (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  gender text not null check (gender in ('boy','girl')),
  hair_key text not null,
  colour_key text not null,
  nickname text,
  destiny_key text,                          -- reserved (stage 6, not reachable in Phase 1)
  art_tier text not null default 'basic',    -- extension slot: basic / premium (premium unused)
  picture_code_set boolean not null default false, -- true once a picture code exists; NO secret is stored
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3.2 thread ledger (append-only; idempotent per (user_id, source_ref))
create table if not exists public.clewquest_thread_ledger (
  id bigserial primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  grade text not null,
  subject text not null,
  amount numeric(6,1) not null check (amount > 0),
  reason text not null check (reason in ('correct_first_try','correct_after_hint')),
  source_ref text not null,
  created_at timestamptz not null default now(),
  unique (user_id, source_ref)
);
create index if not exists clewquest_thread_ledger_user_idx on public.clewquest_thread_ledger(user_id, subject);

-- First-sight record so only a FIRST attempt of an item can earn thread (a wrong answer that is later solved earns nothing).
create table if not exists public.clewquest_seen_items (
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_ref text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, source_ref)
);

-- 3.3 stage cache (derived from the ledger; highest reachable in Phase 1 = 5)
create table if not exists public.clewquest_stage_state (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  stage smallint not null default 1,
  stage_reached_at jsonb not null default '{}'::jsonb,
  hero_cycle_key text,        -- reserved
  wings_cycle_key text,       -- reserved
  god_semester_key text       -- reserved
);

-- 3.4 calendar (data only; no Phase 1 UI)
create table if not exists public.clewquest_calendar (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  source text not null default 'sg_default',
  wa_weeks jsonb not null default '{}'::jsonb,
  semester_ends jsonb not null default '{}'::jsonb,
  updated_by uuid
);

-- 3.5 parent rules (data only)
create table if not exists public.clewquest_parent_rules (
  parent_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid not null references public.profiles(id) on delete cascade,
  wings_mock_cutoff_pct smallint,
  primary key (parent_id, child_id)
);

-- Totals per subject (read by the owner/ops; the app sums the ledger itself)
create or replace view public.clewquest_thread_totals with (security_invoker = true) as
  select user_id, subject, sum(amount) as thread from public.clewquest_thread_ledger group by user_id, subject;

alter table public.clewquest_characters     enable row level security;
alter table public.clewquest_thread_ledger  enable row level security;
alter table public.clewquest_seen_items     enable row level security;
alter table public.clewquest_stage_state    enable row level security;
alter table public.clewquest_calendar       enable row level security;
alter table public.clewquest_parent_rules   enable row level security;

drop policy if exists clewquest_characters_select on public.clewquest_characters;
create policy clewquest_characters_select on public.clewquest_characters for select using (user_id = auth.uid() or public.is_parent_of(user_id));
drop policy if exists clewquest_characters_insert on public.clewquest_characters;
create policy clewquest_characters_insert on public.clewquest_characters for insert with check (user_id = auth.uid());
drop policy if exists clewquest_characters_update on public.clewquest_characters;
create policy clewquest_characters_update on public.clewquest_characters for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists clewquest_ledger_select on public.clewquest_thread_ledger;
create policy clewquest_ledger_select on public.clewquest_thread_ledger for select using (user_id = auth.uid() or public.is_parent_of(user_id));
drop policy if exists clewquest_stage_select on public.clewquest_stage_state;
create policy clewquest_stage_select on public.clewquest_stage_state for select using (user_id = auth.uid() or public.is_parent_of(user_id));
drop policy if exists clewquest_calendar_select on public.clewquest_calendar;
create policy clewquest_calendar_select on public.clewquest_calendar for select using (user_id = auth.uid() or public.is_parent_of(user_id));
drop policy if exists clewquest_parent_rules_select on public.clewquest_parent_rules;
create policy clewquest_parent_rules_select on public.clewquest_parent_rules for select using (parent_id = auth.uid() or child_id = auth.uid());
-- clewquest_seen_items: no policy = no client access (service role only).

-- Writes to the ledger / seen-items / stage cache are server-only: no insert/update/delete for client roles.
revoke insert, update, delete, truncate on public.clewquest_thread_ledger, public.clewquest_seen_items, public.clewquest_stage_state from anon, authenticated;
revoke insert, update, delete, truncate on public.clewquest_calendar, public.clewquest_parent_rules from anon, authenticated;
