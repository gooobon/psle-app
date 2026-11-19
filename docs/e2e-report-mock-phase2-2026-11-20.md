# E2E report: mock exams phase 2 (PR #49)

## What was really executed
**Nothing.** Every execution command was denied by the environment's permission layer:

| Command | Result |
|---|---|
| `node tools/exam_selftest.mjs` | `Permission to use Bash with command node tools/exam_selftest.mjs has been denied.` |
| `npm ci` | `Permission to use Bash with command npm ci has been denied.` |
| `node --version` / `npm --version` | denied the same way |

So `npm ci`, `npm run build`, `npm run typecheck` and all `tools/*selftest*` scripts were **not run**. Because tests could not be run, **no new test code was added**: an unrun test is a guess, and the repo rule is not to guess. Everything below is a **trace by reading code**, not a test result.

Files read: `src/app/api/student/exam/route.js` (all), `src/lib/rewardsServer.js` (all), and the `finalize_credits` function in `supabase/migrations/20261126000000_pending_credits_shared_settings.sql` (grep only). Other files were NOT re-read in this pass (examServer.js, examEngine.js, rewards.js, childSettings*.js, ClaudeApp.js, notify/cron, ParentDashboard).

## Trace table
Legend: TRACED-OK = reading the code shows the behaviour; GAP = not checked or not verifiable by reading alone; nothing is marked PASS because nothing ran.

| # | Scenario | Result | Evidence / note |
|---|---|---|---|
| 1 | Build, typecheck, all selftests | GAP (not run) | commands denied, see above |
| 2 | Wrong items go to notebook (cap 20) | GAP | `finalize` calls `writeNotebook` (route.js:76). The cap logic is in `examPostSubmit.js`/`examServer.js`, not re-read here |
| 3 | Student picks one of 6 cause labels | TRACED-OK | `action:"cause"` checks `CAUSES` (6 values) and the attempt's own finished status (route.js:219-229). Client label wiring not read |
| 4 | Review only after submit: in-progress = 409 | TRACED-OK | `canReview` guard returns 409 (route.js:102). `canReview` itself not re-read |
| 5 | Other student's attempt = 404 | TRACED-OK | query filters `.eq("student_id", me.profile.id)`, no row gives 404 (route.js:99-101) |
| 6 | No keys before submission | TRACED-OK for the route | start/GET return `publicPaper` and `draftOut` only. `publicPaper` internals not re-read. The PR's own selftest claims coverage |
| 7 | Expired attempt auto-submits without 500 | TRACED-OK | `autoSubmitExpired` is defined in route.js:83 next to `loadDraft` and `finalize`, so the earlier ReferenceError is gone at source level. GET, start and late-submit all call it. Not executed |
| 8 | MCQ items with no options not counted | GAP | `finalize` filters `r.excluded` rows (route.js:61). Exclusion logic in `examServer.js` not re-read |
| 9 | Saturday reward needs submitted paper, Saturday, effort check | TRACED-OK | `awardPaperReward` (rewardsServer.js:59-85) returns early if not Saturday, rewards flag off, or `paperRewardEligibility` fails. The 50%/80% rule and parent opt-out are inside `paperRewardEligibility`/`countsAsAttempt`, not re-read |
| 10 | Credit pending, confirmed only after homework, else forfeited | TRACED-OK | `award_credit` with `p_gate_day = day`. SQL `finalize_credits`: `confirmed` if assigned>0 and remaining=0; `pending` while gate day >= today; `forfeited` if assigned>0 and unfinished; `confirmed` if no homework assigned. Note the last case: with no homework assigned that Saturday the credit is confirmed straight away. That is the existing design, flagged for owner awareness |
| 11 | Once per subject per Saturday | TRACED-OK by design | relies on the ledger unique key and `award_sticker` returning `awarded`. Unique index not re-read |
| 12 | Wallet credit and SGD totals match for both parents | GAP | credit rows are owned by the earliest-linked parent (rewardsServer.js:48). How the second parent's wallet displays that was not traced |
| 13 | Settings saved with flag off keep paper settings | GAP | fix is in `childSettingsServer.js`, not re-read |
| 14 | Mastery counts only first sitting | GAP | dedupe key lives in `examPostSubmit.js`, not re-read |
| 15 | 8pm email dry-run and parent dashboard reflect results | GAP | notify and `ParentDashboard` not read. No evidence either way |
| 16 | Flags default off; no new migration; no workflow or `genius_*` change | TRACED-OK for this pass | this pass changed only a doc file |

## Observations (not fixed)
- `route.js:243`: on a late submit the result of `autoSubmitExpired` is ignored; if it returns null the sitting stays `in_progress` until the next GET or start retries it. Acceptable but worth a look.
- Rewards require `NEXT_PUBLIC_REWARDS_ENABLED` as well as the mock flag (already stated in the PR body).

## What the owner still needs to do
Run locally, in this order: `npm ci`, `npm run build`, `npm run typecheck`, `node tools/exam_selftest.mjs`, then each of `tools/child_settings_selftest.mjs`, `daily_target_selftest.mjs`, `homework_mastery_selftest.mjs`, `notify_selftest.mjs`, `pending_credits_selftest.mjs`, `rewards_tiers_selftest.mjs`, `learning_grade_selftest.mjs` (needs `tsx`). Rows marked GAP above, and the role-play flow for Amir, Mrs Tan and Mr Tan, still need a real run against a local or mocked Supabase.
