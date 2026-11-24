-- Genius Project: parent wrong-answer detail (issue #131). ADDITIVE ONLY: one new table, no change to existing tables or data.
-- Apply by hand in the Supabase SQL editor. Safe to re-run. NOT applied to production by the PR.
-- The app works without it: until it is applied, parent cause tags cannot be saved and the picker says so.
-- Does NOT touch learning_trials.answer_text (added by the answer-recording PR); the app reads that column fail-soft.
-- A parent tags a child's wrong answer as careless / concept / vocabulary. Linked guardians (public.is_parent_of) read and write.
-- wrong_answers itself stays insert-only for clients, so the parent tag lives in its own table.

create table if not exists public.parent_cause_tags (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid not null references public.profiles(id) on delete cascade,
  wrong_answer_id  uuid not null references public.wrong_answers(id) on delete cascade,
  cause            text not null,
  set_by           uuid not null references public.profiles(id) on delete cascade,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint parent_cause_tags_cause_chk check (cause in ('careless','concept','vocabulary')),
  constraint parent_cause_tags_uq unique (wrong_answer_id)
);
create index if not exists parent_cause_tags_student_idx on public.parent_cause_tags(student_id);

alter table public.parent_cause_tags enable row level security;

drop policy if exists parent_cause_tags_select on public.parent_cause_tags;
create policy parent_cause_tags_select on public.parent_cause_tags for select
  using (student_id = auth.uid() or public.is_parent_of(student_id));

drop policy if exists parent_cause_tags_insert on public.parent_cause_tags;
create policy parent_cause_tags_insert on public.parent_cause_tags for insert
  with check (public.is_parent_of(student_id) and set_by = auth.uid());

drop policy if exists parent_cause_tags_update on public.parent_cause_tags;
create policy parent_cause_tags_update on public.parent_cause_tags for update
  using (public.is_parent_of(student_id)) with check (public.is_parent_of(student_id) and set_by = auth.uid());
-- Deliberately no delete policy.
