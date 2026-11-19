-- Genius Project: learning dashboard anti-forgery (issue #42 / PR #43). Extends 20261127000000_learning_trials.sql; that file is NOT edited.
-- Apply by hand in the Supabase SQL editor AFTER 20261127000000_learning_trials.sql. Safe to re-run.
-- NOT applied to production by this PR.
-- ADDITIVE / TIGHTENING ONLY: no row is deleted or rewritten. Existing rows (if any) keep their data and are simply not shown (server_graded = false).
--
-- Why: students could POST (or insert directly) learning_trials rows they never sat, with correct / first_try / weight as sent.
-- Now rows are written only by POST /api/learning/trials using the service role. The route grades the submitted answer against the
-- bank itself and derives correct / first_try / weight. The student can no longer insert, update or delete in this table.

-- 1) Lock direct writes. Students (and parents) can only SELECT through RLS. The service role bypasses RLS and is used by the route only.
drop policy if exists learning_trials_insert on public.learning_trials;
revoke insert, update, delete, truncate on public.learning_trials from anon, authenticated;

-- 2) Mark server-graded rows, and give the route a race-safe dedupe key (subject|item|mode). NULL for legacy rows (NULLs never collide).
alter table public.learning_trials add column if not exists server_graded boolean not null default false;
alter table public.learning_trials add column if not exists dedupe_key text;
create unique index if not exists learning_trials_dedupe_uq on public.learning_trials(student_id, dedupe_key);

-- 3) The dashboard reads only server_graded rows, so any pre-lockdown row (which may have been client-asserted) never counts.
--    The loader (src/lib/learningServer.js) filters on server_graded = true. Rows stay in the table untouched.
