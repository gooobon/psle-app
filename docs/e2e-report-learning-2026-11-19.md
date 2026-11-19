# Learning dashboard role-play, retest after server grading

Retest of PR #43 after `a7e9a20` (server grading) plus the fixes in the commit that follows it. Local Supabase only. `supabase db reset` applied, in order:

1. `supabase/migrations/20261127000000_learning_trials.sql`
2. `supabase/migrations/20261128000000_learning_trials_server_only.sql`

The runner refused any URL or key containing the production project `zehnulwvysvnsshunxzr`. `EMAIL_ALERTS_ENABLED` and `WHATSAPP_ENABLED` stayed unset. Flags on for this local process only: `NEXT_PUBLIC_SERVER_AUTH`, `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`, `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`, `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`.

`npx tsc --noEmit` passed. `npm run build` passed. There is no lint script and no ESLint package (`next.config.mjs` still has an `eslint` key Next.js 16 ignores). Pure selftests passed: `tools/learning_grade_selftest.mjs`, `homework_mastery_selftest.mjs`, `pending_credits_selftest.mjs`, `rewards_tiers_selftest.mjs`, `daily_target_selftest.mjs`, `child_settings_selftest.mjs`, `notify_selftest.mjs`.

`E2E_PLAYWRIGHT_GREP=@learning bash tools/e2e/run-roleplay.sh` exited 0. **24 pass, 0 fail, 0 gap.**

Days use the same three-place shift as the earlier role-play (Next `day-shift.cjs`, the browser `Date`, and the local-only `e2e_clock` table). Day 0 is Thursday 19 Nov 2026. Day +1 is Friday 20 Nov. Day +8 is Friday 27 Nov.

## What Amir submitted, and what the server stored

The server grades the submitted answer. `correct`, `first_try`, `weight` and `skill` on `learning_trials` are the server's values. One open question in the daily set is not auto-graded, so each English set stores 36 rows rather than 37.

| When | What was submitted | Server rows |
|---|---|---|
| 19 Nov | English S01 | 36 exam rows, 17 first-try. `17/36 = 47.22%` rounds to **47**. |
| 19 Nov | Three wrong cards tagged in English | `concept_unknown`, `misread`, `trap`, one each |
| 19 Nov | Homework is the same missed question `S01_B_S01_B2` | 0 homework rows |
| 20 Nov | Homework is unseen `S02_B_S02_B2`, same taxonomy leaf `en.grammar.present_perfect` | 1 homework row, weight **0.5**, first-try true |
| 27 Nov | English S02 | 36 exam rows, 20 first-try. `20/36 = 55.56%` rounds to **56**. |
| 27 Nov | Past-paper mock (Extra practice → Past-paper mock) | 18 mock rows, all `server_graded`, all ids from that paper. 8 first-try. `8/18 = 44.44%` rounds to **44**. |

The paper plan has 19 gradable questions. 18 were stored. The sequence question `q28_45` did not get a row.

## Hand check

Weekly first-attempt is exam and mock only. Homework is left out.

- Week of 16 Nov: the 19 Nov set, **47%** (17/36)
- Week of 23 Nov: the 27 Nov set plus the past paper, `(20+8)/(36+18) = 28/54 = 51.85%` rounds to **52%**

Trend with three sessions compares the newer half with the older half. Newer half is 52, older half is 47, difference 5, threshold 5, so the word is **improving**. Both parents' screens say "First-try score: 52% in the latest sessions vs 47% before."

All 26 skills: `now`, `weekAgo` and `delta` matched a hand count of the stored rows, including the half-weight present-perfect answer. Mrs Tan and Mr Tan received the same JSON.

Cause bars, last 14 days: No cause picked yet **28** (11 from 19 Nov, 17 from 27 Nov), Fell for a trap 1, Misread the question 1, Didn't know the concept 1. Those three are the labels Amir picked.

Amir's notebook shows the same skill percents and "Your error patterns". The Today filter still leaves the mastery card on screen.

## Forgery, repeated from the previous fail

Done after the Learning tab was on screen. Then the parent API was read again.

| Attempt | Result |
|---|---|
| POST an id that is not in the bank (`forged-perfect`) with `firstTry: true`, `correct: true`, weight 9 | HTTP 200, `recorded: 0`, no row |
| Same id again with a new timestamp and weight 0.5 | No row |
| A real item answered wrong, while the client claims correct, first-try, a made-up skill and weight 0.3 | One row, `correct: false`, `first_try: false`, weight **1**, server skill. The claim is ignored. |
| That same item again with the right answer and new timestamps | Still the one wrong row. No perfect row is added. |
| A real item answered right, with weight 9 claimed | One exam row, first-try true, weight **1**. A later mock of the same item is correct but not first-try. |
| Homework for an item no parent assigned | No row |
| A timestamp 30 days in the past | The row is stored at server time, not the backdated time |
| Direct PostgREST insert with Amir's own login: weight 9, weight 0.5, and another student's id | **403, 403, 403** |
| Direct update and delete of his rows | **403** and **403** |

After the unknown-item, weight, new-timestamp and direct-insert attempts, Mrs Tan's Learning JSON was unchanged (skills, weekly scores, trend, causes). Screenshot `learn-10-after-forgery.png`.

The trials response is `{ ok, received, recorded, ignored }`. It does not include `correct`, the answer, or `first_try`. `tools/learning_grade_selftest.mjs` checks that `grade()` returns only `{ scored, correct }`.

The past-paper text is still inside the app bundle, because the exam screen renders the paper in the browser. This change does not add a route that returns the answer key. The learning route grades on the server and returns counts only.

## Past papers

English past-paper items were missing from the practice bank, and some comprehension ids (`q28_41` and the rest) also exist on a daily set with a different answer. A past-paper trial is now marked `setId` `paper:<paperKey>` and graded from that paper's own questions. A daily set is still graded from the 60 practice sets. The selftest checks that `q28_44` is "snapped" on the paper and not on the practice set.

The Chinese "Past-paper mock" button starts the daily WA1 set, which is already in the practice bank, so those answers are graded. It does not open a Chinese past paper.

## Fixes in this retest

- Homework grading called `resolveItem` after that import had been removed, so any batch that contained a homework answer returned 500 and the later exam and past-paper syncs in the same batch were dropped. It now resolves the source question with `resolveSubmitted`.
- The half-weight check now picks an unseen question with the same taxonomy leaf. Two Grammar MCQs in the same section can be different skills (`present_perfect` vs `subject_verb_agreement`); the server does not give half weight across leaves.

No `genius_*` key was renamed, cleared, or reset. Nothing was deleted.

## Steps

| Role | Step | Expected | Actual | Result | Screenshot |
|---|---|---|---|---|---|
| Parents | Both linked | 2 rows | 2 rows | PASS | [01](e2e-2026-11-19/learn-01-parents.png) |
| Amir | 19 Nov set syncs | Server-graded exam rows | 36 exam rows | PASS | [02](e2e-2026-11-19/learn-02-after-set.png) |
| Amir | English cause labels | Three stored | concept 1, misread 1, trap 1 | PASS | [03](e2e-2026-11-19/learn-03-causes.png) |
| Amir | Same-leaf unseen question | A later present-perfect MCQ exists | `S01_B_S01_B2` → `S02_B_S02_B2` | PASS | |
| Amir | Same question again | No homework row | Assigned 1; rows 0 | PASS | [04](e2e-2026-11-19/learn-04-same-question.png) |
| Amir | Same-skill question one day later | Weight 0.5 | present perfect, weight 0.5, first-try true | PASS | [05](e2e-2026-11-19/learn-05-half.png) |
| Amir | Past-paper mock | Server-graded mock rows from that paper | 18 rows, all graded, all from the paper | PASS | [05b](e2e-2026-11-19/learn-05b-past-paper.png) |
| Both parents | Same Learning tab | JSON matches | Identical | PASS | [07](e2e-2026-11-19/learn-07-parent-b.png) |
| Mrs Tan | Mastery now vs 7 days ago | Hand count | 26 skills; "vs 7 days ago" on screen | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Mrs Tan | Weekly first-attempt | Exam and mock only | 16 Nov 47%, 23 Nov 52% | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Mrs Tan | Trend | Hand word | improving, 52 vs 47 | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Mrs Tan | 14-day causes | Match what Amir picked | 28 untagged, three labels at 1 | PASS | [06](e2e-2026-11-19/learn-06-parent-a.png) |
| Amir | Notebook | Same percents and his labels | Skills JSON equal | PASS | [08](e2e-2026-11-19/learn-08-student.png) |
| Amir | Filter the list | Card stays | Mastery still shown | PASS | [09](e2e-2026-11-19/learn-09-filtered.png) |
| Parents | Forgery does not move the tab | Numbers unchanged | JSON identical; direct inserts 403 | PASS | [10](e2e-2026-11-19/learn-10-after-forgery.png) |
| Amir | Unknown item, claimed perfect, weight 9 | Nothing stored | 0 rows | PASS | |
| Amir | Wrong answer claimed correct | Server stores wrong, weight 1 | `correct: false`, weight 1 | PASS | |
| Amir | Replay with new timestamps | No second row | Still the one wrong row | PASS | |
| Amir | Right answer, weight 9, then another mode | Weight 1; later mode is not first-try | As expected | PASS | |
| Amir | Unassigned homework | No row | 0 rows | PASS | |
| Amir | Response body | Counts only | `received` / `recorded` / `ignored` | PASS | |
| Amir | Timestamp 30 days ago | Not stored in the past | Server time | PASS | |
| Amir | Direct insert, update, delete | All refused | 403 | PASS | |
| Amir | Row count after the graded checks | Only the server-graded extras | 4 new rows | PASS | |
