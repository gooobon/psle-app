-- Genius Project: parent marks count toward the paper score (issue #62).
-- Apply by hand in the Supabase SQL editor AFTER 20261201000000_event_alerts.sql. Safe to re-run.
-- NOT applied to production by the PR that adds this file. Apply it BEFORE the code runs with NEXT_PUBLIC_MOCK_EXAMS_ENABLED=true,
-- because the hand-in and parent-marking routes now read and write these columns.
-- ADDITIVE ONLY: new columns and one new function. No row is deleted. The only row change is the backfill in section 2, which sets the
-- new columns and recomputes score / total of attempts that already have parent marks (score = auto score + parent-marked correct).
--
-- Meaning of the columns on exam_attempts:
--   auto_score / auto_total / auto_sections  the auto-graded result at hand-in (never changes afterwards)
--   parent_pending   open-ended items the parent has not marked yet (a paper with 0 is "settled")
--   parent_score     open-ended items marked correct;  parent_total  open-ended items marked (correct or not)
--   score / total    auto + parent: this is the "final score" every screen, email and report reads
--   settled_at       when the last open-ended item was marked (or the hand-in time when there were none); the paper reward,
--                    the milestone alert and the weekly report wait for it
alter table public.exam_attempts add column if not exists auto_score     integer;
alter table public.exam_attempts add column if not exists auto_total     integer;
alter table public.exam_attempts add column if not exists auto_sections  jsonb;
alter table public.exam_attempts add column if not exists parent_pending integer;
alter table public.exam_attempts add column if not exists parent_score   integer not null default 0;
alter table public.exam_attempts add column if not exists parent_total   integer not null default 0;
alter table public.exam_attempts add column if not exists settled_at     timestamptz;

-- 2) Backfill finished attempts. Idempotent: only rows whose auto_score is still null are touched.
with m as (
  select a.id,
         count(*) filter (where x.correct is null)                                       as open_n,
         count(*) filter (where x.correct is null and x.parent_correct is true)          as p_ok,
         count(*) filter (where x.correct is null and x.parent_correct is not null)      as p_done
    from public.exam_attempts a
    left join public.exam_answers x on x.attempt_id = a.id
   where a.status <> 'in_progress' and a.auto_score is null
   group by a.id
)
update public.exam_attempts a set
  auto_score     = a.score,
  auto_total     = a.total,
  auto_sections  = a.section_scores,
  parent_pending = greatest(coalesce(a.open_total, 0) - m.p_done, 0),
  parent_score   = m.p_ok,
  parent_total   = m.p_done,
  score          = coalesce(a.score, 0) + m.p_ok,
  total          = coalesce(a.total, 0) + m.p_done,
  settled_at     = case when greatest(coalesce(a.open_total, 0) - m.p_done, 0) = 0 then coalesce(a.submitted_at, now()) else null end
  from m
 where m.id = a.id;

-- 3) Parent-marked correct answers also count in the day's activity of a paper that counted as a set. Service role only (the API has already
--    verified the parent and the child link). p_delta may be negative (a parent changes a mark after the paper settled). Never lowers the
--    day's correct below 0 or raises it above questions_answered; does nothing when the paper did not count (its key is not in done_keys).
create or replace function public.record_paper_parent_marks(p_user uuid, p_subject text, p_key text, p_delta int)
returns void language plpgsql security definer set search_path = public as $$
declare d date;
begin
  if p_user is null or p_delta is null or p_delta = 0 then return; end if;
  select a.date into d from public.daily_activity a
   where a.user_id = p_user and a.subject = p_subject and p_key = any (a.done_keys)
   order by a.date desc limit 1;
  if d is null then return; end if;
  update public.daily_activity a set
    correct    = greatest(0, least(a.correct + p_delta, a.questions_answered)),
    updated_at = now()
   where a.user_id = p_user and a.date = d and a.subject = p_subject;
end $$;
revoke all on function public.record_paper_parent_marks(uuid, text, text, int) from public, anon, authenticated;
grant execute on function public.record_paper_parent_marks(uuid, text, text, int) to service_role;
