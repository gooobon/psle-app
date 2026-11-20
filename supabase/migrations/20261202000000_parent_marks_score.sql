-- Genius Project: parent marks count in the paper score (issue #62). Extends 20261129000000_exam_attempts.sql; that file is NOT edited.
-- Apply by hand in the Supabase SQL editor AFTER 20261201000000_event_alerts.sql. Safe to re-run.
-- Apply it BEFORE deploying the code in the same PR if NEXT_PUBLIC_MOCK_EXAMS_ENABLED is (or will be) true: the new code reads and writes
-- these columns. With the flag off the code never touches them.
-- ADDITIVE ONLY: five new columns on exam_attempts, one backfill UPDATE that only fills the new columns. No existing column, row,
-- answer or mark is changed or deleted. exam_attempts.score / total keep their meaning: auto-marked items only.
--
-- Meaning:
--   parent_marked  how many open-ended items the parent has marked so far (0..open_total)
--   parent_right   how many of those were marked correct
--   settled_at     when the LAST open-ended item was marked (null while any is still waiting; null for papers with no open items,
--                  which are settled at hand-in by definition: pending = open_total - parent_marked = 0)
--   final_score    score + parent_right   } set (and kept up to date) once settled_at is set;
--   final_total    total + open_total     } the figure the dashboard, weekly report and milestone use

alter table public.exam_attempts add column if not exists parent_marked integer not null default 0 check (parent_marked >= 0);
alter table public.exam_attempts add column if not exists parent_right  integer not null default 0 check (parent_right >= 0);
alter table public.exam_attempts add column if not exists settled_at    timestamptz;
alter table public.exam_attempts add column if not exists final_score   integer;
alter table public.exam_attempts add column if not exists final_total   integer;

-- Backfill from marks already given (the parent route used to store only parent_correct). Fills the new columns only.
update public.exam_attempts a
   set parent_marked = s.marked,
       parent_right  = s.right_n,
       settled_at    = case when a.open_total > 0 and s.marked >= a.open_total then coalesce(s.last_at, a.submitted_at) else null end,
       final_score   = case when a.open_total > 0 and s.marked >= a.open_total then a.score + s.right_n else null end,
       final_total   = case when a.open_total > 0 and s.marked >= a.open_total then a.total + a.open_total else null end
  from (select attempt_id,
               count(*) filter (where parent_correct is not null)::int as marked,
               count(*) filter (where parent_correct is true)::int     as right_n,
               max(parent_marked_at)                                   as last_at
          from public.exam_answers where correct is null group by attempt_id) s
 where s.attempt_id = a.id and a.parent_marked = 0 and a.settled_at is null and s.marked > 0;
