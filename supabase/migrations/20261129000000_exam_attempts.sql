-- Genius Project: mock exams phase 1 (issue #44, docs/design/mock-exams-v1.md section 6.1).
-- Apply by hand in the Supabase SQL editor AFTER 20261128000000_learning_trials_server_only.sql. Safe to re-run.
-- NOT applied to production by the PR that adds this file. Apply it BEFORE the code runs with NEXT_PUBLIC_MOCK_EXAMS_ENABLED=true.
-- ADDITIVE ONLY: two new tables, two new functions. No existing row, column or table is changed, with ONE exception that is a
-- like-for-like replacement: record_activity() is re-created with the same signature and the same behaviour, plus one extra
-- rule (see 3). Nothing is deleted.

-- 1) One row per sitting. Written ONLY by /api/student/exam (service role); clients can read their own / their children's rows.
create table if not exists public.exam_attempts (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid not null references public.profiles(id) on delete cascade,
  subject         text not null,
  grade           text,
  paper_id        text not null,                 -- manifest id (stable; never the filename)
  paper_label     text,                          -- display only, e.g. 'Nanyang Primary School 2024 EOY'
  paper_flags     text[] not null default '{}',  -- manifest flags at start time (key_estimated, year_mismatch, duplicate_suspect)
  minutes_allowed integer not null check (minutes_allowed between 5 and 240),
  started_at      timestamptz not null default now(),
  deadline_at     timestamptz not null,
  submitted_at    timestamptz,
  status          text not null default 'in_progress'
                    check (status in ('in_progress','submitted','auto_submitted','abandoned')),
  elapsed_seconds integer,
  score           integer,                       -- auto-graded items only
  total           integer,
  answered        integer,
  question_count  integer,
  unanswered      integer,
  open_total      integer,                       -- items the parent marks
  section_scores  jsonb,                         -- [{section, score, total}]
  counts          boolean,                       -- anti-gaming: >= 50% of the time OR >= 80% answered
  counts_reason   text,
  sgt_day         date,                          -- day submitted, SGT
  attempt_no      integer not null default 1,
  created_at      timestamptz not null default now(),
  constraint exam_attempts_paper_no_uq unique (student_id, paper_id, attempt_no)
);
create index if not exists exam_attempts_student_idx on public.exam_attempts(student_id, started_at desc);
create index if not exists exam_attempts_day_idx on public.exam_attempts(student_id, sgt_day);

-- 2) Per-item answers. correct = server grade; NULL = not auto-graded. parent_correct = the parent's mark for those items.
create table if not exists public.exam_answers (
  attempt_id      uuid not null references public.exam_attempts(id) on delete cascade,
  question_id     text not null,
  section         text,
  answer          jsonb,
  correct         boolean,
  flagged         boolean not null default false,
  parent_correct  boolean,
  parent_marked_at timestamptz,
  primary key (attempt_id, question_id)
);

alter table public.exam_attempts enable row level security;
alter table public.exam_answers  enable row level security;
drop policy if exists exam_attempts_select on public.exam_attempts;
create policy exam_attempts_select on public.exam_attempts for select
  using (student_id = auth.uid() or public.is_parent_of(student_id));
drop policy if exists exam_answers_select on public.exam_answers;
create policy exam_answers_select on public.exam_answers for select
  using (exists (select 1 from public.exam_attempts a
                  where a.id = attempt_id and (a.student_id = auth.uid() or public.is_parent_of(a.student_id))));
-- Deliberately no insert / update / delete policy and no table grant for clients: writes go through the API (service role).
revoke insert, update, delete, truncate on public.exam_attempts from anon, authenticated;
revoke insert, update, delete, truncate on public.exam_answers  from anon, authenticated;

-- 3) A submitted paper counts as ONE set for the subject's daily target, but never feeds the daily first-set score tiers.
--    record_paper_activity(): service role only (the API has already verified the student, the attempt and the anti-gaming rule).
--    A paper that is the first set of the day stores first_set_questions = first_set_correct = 0 (a placeholder: firstSetScore() reads
--    0 questions as "no usable score"). record_activity() then lets the next REAL set of that day replace that placeholder, so a paper
--    done before the daily set cannot take away (or become) the tier score.
create or replace function public.record_paper_activity(
  p_user uuid, p_subject text, p_key text, p_questions int, p_correct int, p_minutes int
) returns void language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Asia/Singapore')::date;
begin
  if p_user is null or not exists (select 1 from public.profiles where id = p_user and role = 'student') then
    raise exception 'students only';
  end if;
  p_questions := greatest(0, least(coalesce(p_questions,0), 500));
  p_correct   := greatest(0, least(coalesce(p_correct,0), p_questions));
  p_minutes   := greatest(0, least(coalesce(p_minutes,0), 240));
  insert into public.daily_activity as a (user_id, date, subject, sets_completed, questions_answered, correct, minutes, done_keys,
                                          first_set_questions, first_set_correct)
    values (p_user, d, p_subject, 1, p_questions, p_correct, p_minutes, array[p_key], 0, 0)
  on conflict (user_id, date, subject) do update set
    sets_completed     = a.sets_completed + 1,
    questions_answered = a.questions_answered + excluded.questions_answered,
    correct            = a.correct + excluded.correct,
    minutes            = a.minutes + excluded.minutes,
    done_keys          = a.done_keys || excluded.done_keys,
    updated_at         = now()
  where not (p_key = any (a.done_keys));
end $$;
revoke all on function public.record_paper_activity(uuid,text,text,int,int,int) from public, anon, authenticated;
grant execute on function public.record_paper_activity(uuid,text,text,int,int,int) to service_role;

create or replace function public.record_activity(
  p_subject text, p_key text, p_questions int, p_correct int, p_minutes int
) returns void language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Asia/Singapore')::date;
  uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not authenticated'; end if;
  if not exists (select 1 from public.profiles where id = uid and role = 'student') then
    raise exception 'students only';
  end if;
  p_questions := greatest(0, least(coalesce(p_questions,0), 500));
  p_correct   := greatest(0, least(coalesce(p_correct,0), p_questions));
  p_minutes   := greatest(0, least(coalesce(p_minutes,0), 240));
  insert into public.daily_activity as a (user_id, date, subject, sets_completed, questions_answered, correct, minutes, done_keys,
                                          first_set_questions, first_set_correct)
    values (uid, d, p_subject, 1, p_questions, p_correct, p_minutes, array[p_key], p_questions, p_correct)
  on conflict (user_id, date, subject) do update set
    sets_completed     = a.sets_completed + 1,
    questions_answered = a.questions_answered + excluded.questions_answered,
    correct            = a.correct + excluded.correct,
    minutes            = a.minutes + excluded.minutes,
    done_keys          = a.done_keys || excluded.done_keys,
    -- ONLY change vs 20261125: a paper-placeholder first set (0/0) is replaced by the first real set of the day.
    first_set_questions = case when a.first_set_questions = 0 and excluded.first_set_questions > 0 then excluded.first_set_questions else a.first_set_questions end,
    first_set_correct   = case when a.first_set_questions = 0 and excluded.first_set_questions > 0 then excluded.first_set_correct   else a.first_set_correct   end,
    updated_at         = now()
  where not (p_key = any (a.done_keys));
end $$;
revoke all on function public.record_activity(text,text,int,int,int) from public;
grant execute on function public.record_activity(text,text,int,int,int) to authenticated;
