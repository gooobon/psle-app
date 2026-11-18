-- Genius Project: server step 4 (wrong-answer records on the server).
-- Apply by hand in the Supabase SQL editor AFTER 20261121000000_email_alert_default_on.sql. Safe to re-run.
-- Students insert their own rows; linked guardians (public.is_parent_of) read. NO update/delete policies for clients.

create table if not exists public.wrong_answers (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references public.profiles(id) on delete cascade,
  subject       text not null,                    -- English / Chinese / Math / Science
  grade         text,                             -- P3..P6 (nullable for old rows)
  question_id   text not null,
  attempt_key   text not null,                    -- idempotency key, e.g. 'set-12' (session/round the miss happened in)
  student_answer text,
  correct_answer text,
  question_text text,
  section_type  text,
  attempted_at  timestamptz not null default now(),
  source_id     text,                             -- set / paper id when known
  cause         text,                             -- step (7); NULL until the student/parent tags it
  taxonomy_ids  jsonb,                            -- ids from docs/taxonomy.md when available
  resolved_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint wrong_answers_cause_chk check (cause is null or cause in
    ('concept_unknown','misread','calculation','trap','time','guessed')),
  constraint wrong_answers_attempt_uq unique (student_id, subject, question_id, attempt_key)
);
create index if not exists wrong_answers_student_idx on public.wrong_answers(student_id, attempted_at desc);

alter table public.wrong_answers enable row level security;

drop policy if exists wrong_answers_select on public.wrong_answers;
create policy wrong_answers_select on public.wrong_answers for select
  using (student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists wrong_answers_insert on public.wrong_answers;
create policy wrong_answers_insert on public.wrong_answers for insert
  with check (student_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'student'));
-- Deliberately no update and no delete policy.
