-- Genius Project: learning dashboard (issue #42). ADDITIVE ONLY: one new table, no change to existing tables or data.
-- Apply by hand in the Supabase SQL editor AFTER 20261126000000_pending_credits_shared_settings.sql. Safe to re-run.
-- NOT applied to production by this PR. The feature flag NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED stays off until the owner applies it.
-- Students insert their own rows; the student and linked guardians (public.is_parent_of) read. No update/delete policies.

create table if not exists public.learning_trials (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references public.profiles(id) on delete cascade,
  subject       text not null,                    -- English / Chinese
  grade         text,
  item_id       text not null,
  skill         text not null,                    -- taxonomy v1 leaf skill id when known, else the ledger skill key
  mode          text not null,                    -- exam / mock / drill / homework (mastery modes only)
  first_try     boolean not null,
  correct       boolean not null,
  weight        numeric not null default 1,       -- 1, or 0.5 for qualifying similar-question homework (#33)
  session_num   integer,
  attempted_at  timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  constraint learning_trials_weight_chk check (weight > 0 and weight <= 1),
  constraint learning_trials_mode_chk check (mode in ('exam','mock','drill','homework')),
  constraint learning_trials_uq unique (student_id, subject, item_id, mode, attempted_at)
);
create index if not exists learning_trials_student_idx on public.learning_trials(student_id, subject, attempted_at desc);

alter table public.learning_trials enable row level security;

drop policy if exists learning_trials_select on public.learning_trials;
create policy learning_trials_select on public.learning_trials for select
  using (student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists learning_trials_insert on public.learning_trials;
create policy learning_trials_insert on public.learning_trials for insert
  with check (student_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student'));
-- Deliberately no update and no delete policy.
