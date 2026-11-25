-- Genius Project: answer timing + practice sessions (issue #128). ADDITIVE ONLY. Safe to re-run.
-- Apply by hand in the Supabase SQL editor. NOT applied to production by the PR.
-- The app works without this file: the server drops the new fields and inserts as before.

alter table public.learning_trials add column if not exists elapsed_ms  integer;
alter table public.learning_trials add column if not exists guessed     boolean;
alter table public.learning_trials add column if not exists confidence  text;
alter table public.learning_trials add column if not exists answer_text text;
alter table public.learning_trials add column if not exists attempt_no  smallint;
alter table public.learning_trials add column if not exists session_id  uuid;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'learning_trials_confidence_chk') then
    alter table public.learning_trials add constraint learning_trials_confidence_chk
      check (confidence is null or confidence in ('sure','not_sure'));
  end if;
end $$;

create table if not exists public.practice_sessions (
  id                uuid primary key,
  student_id        uuid not null references public.profiles(id) on delete cascade,
  subject           text,
  mode              text,
  set_key           text,
  started_at        timestamptz,
  ended_at          timestamptz,
  active_ms         integer,
  idle_ms           integer,
  item_count        int,
  first_try_correct int,
  guessed_count     int,
  junk_count        int default 0,
  created_at        timestamptz default now()
);
create index if not exists practice_sessions_student_idx on public.practice_sessions(student_id, started_at desc);

alter table public.practice_sessions enable row level security;
drop policy if exists practice_sessions_select on public.practice_sessions;
create policy practice_sessions_select on public.practice_sessions for select
  using (student_id = auth.uid() or public.is_parent_of(student_id));
drop policy if exists practice_sessions_insert on public.practice_sessions;
create policy practice_sessions_insert on public.practice_sessions for insert
  with check (student_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student'));
drop policy if exists practice_sessions_update on public.practice_sessions;
create policy practice_sessions_update on public.practice_sessions for update
  using (student_id = auth.uid()) with check (student_id = auth.uid());
