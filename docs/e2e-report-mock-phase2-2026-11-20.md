# E2E report: mock exams phase 2 (PR #49)

Three separate things are reported here and must not be confused:
1. **Actually executed**: nothing.
2. **Traced by reading code**: the table in section 2.
3. **Test code written but NOT run**: section 3.

## 1. Actually executed
**Nothing.** The Action's permission layer denies every execution command. Denied, each with `Permission to use Bash with command <cmd> has been denied.`:
`node tools/exam_selftest.mjs`, `node --version`, `npm ci`, `npm --version`, and (in the last pass) `python3 -` for scripted edits.
So `npm ci`, `npm run build`, `npm run typecheck` and every `tools/*selftest*` script have **not been run** by me. Nothing below is a test result.

## 2. Traced by reading code
Files read in full or in the relevant part: `src/app/api/student/exam/route.js`, `src/lib/examPostSubmit.js`, `src/lib/examEngine.js`, `src/lib/examServer.js` (the PR diff), `src/lib/rewards.js` (diff), `src/lib/rewardsServer.js`, `src/lib/childSettings.js`, `src/lib/childSettingsServer.js`, `src/lib/dailyAlert.js`, `supabase/migrations/20261122…wrong_answers.sql`, `20261126…pending_credits_shared_settings.sql`, `20261130…paper_rewards.sql`, `src/app/api/parent/rewards/route.js` and `src/app/api/student/rewards/route.js` (the credit reads).
Legend: TRACED-OK = reading shows the intended behaviour; BUG = a defect found (fixed, see below); GAP = not verifiable by reading. Nothing is PASS because nothing ran.

| # | Scenario | Result | Evidence |
|---|---|---|---|
| 1 | Build, typecheck, all selftests | GAP (not run) | commands denied |
| 2 | Wrong items go to notebook, cap 20 | TRACED-OK | `finalize` -> `writeNotebook` (route.js:76) -> `notebookRows` (examServer.js, `pickNotebookRows`) -> `pickNotebookRows` slices to `MAX_NOTEBOOK_PER_PAPER = 20`, answered misses first (examEngine.js:129-134). Rows without a readable key and duplicate ids are dropped first. Upsert on `student_id,subject,question_id,attempt_key` with `ignoreDuplicates` (examPostSubmit.js:12) matches the table's `wrong_answers_attempt_uq` (wrong_answers.sql:25), so a repeat is a no-op |
| 3 | Student picks one of 6 cause labels | TRACED-OK | `action:"cause"` checks `CAUSES` (6 values, route.js:23, 221), own finished attempt (224), updates only an existing notebook row (225-228). Blank causes are never written (examPostSubmit.js omits `cause`) |
| 4 | Review only after submit: in-progress = 409 | TRACED-OK | `canReview` is true only for the student's own `submitted`/`auto_submitted` attempt (examEngine.js:142-144); route returns 409 (route.js:102) |
| 5 | Other student's attempt = 404 | TRACED-OK | query filters `.eq("student_id", me.profile.id)` (route.js:99), no row = 404 (101) |
| 6 | No keys before submission | TRACED-OK | start/GET return `publicPaper` and `draftOut` only. The key-reading functions `reviewItems`, `notebookRows`, `mockTrialCandidates` are called only from `review()` (own finished attempt) and `finalize` (examServer.js comment lines 169-170; route.js:76-77, 108) |
| 7 | Expired attempt auto-submits without 500 | TRACED-OK | `autoSubmitExpired` defined in route.js:83 beside `loadDraft`/`finalize`; GET (132), start (169) and late submit (243) all use it |
| 8 | MCQ items without options not counted | TRACED-OK | `noKey` set built in `paperData` for `*MCQ` sections and mcq-format comprehension items with no options; `gradeSubmission` sets `excluded` and leaves `correct = null`; `summarize` skips excluded rows (examEngine.js:87); `answered/count/unanswered` use only live rows; `finalize` writes no `exam_answers` row for them (route.js:61); `notebookRows` and `mockTrialCandidates` need `correctText`, which they do not have; `reviewItems` marks them `keyMissing` |
| 9 | Saturday reward needs submitted paper, Saturday, effort check | TRACED-OK | `awardPaperReward` (rewardsServer.js:59-85) returns early if not Saturday or rewards flag off; `paperRewardEligibility` requires `submitted`/`auto_submitted`, a Saturday `sgtDay`, rule enabled, and `paperCheckOff || counts === true` (rewards.js). `counts` = `countsAsAttempt`: time >= 50% OR answered >= 80% (examEngine.js:63-69); the parent switch is `rule.paperCheckOff` |
| 10 | Credit pending, confirmed after homework, else forfeited | TRACED-OK | `award_credit` is called with `p_gate_day = day` and inserts `pending` (paper_rewards.sql). `finalize_credits` (20261126…sql:65-86): all assigned homework solved -> `confirmed`; gate day today or later with homework unsolved/not yet assigned -> stays `pending`; gate day past with unsolved homework -> `forfeited`; gate day past with none assigned -> `confirmed`. **Correction to my earlier note:** on the Saturday itself with no homework assigned the credit stays *pending* (the daily cron confirms it after the day), it is not confirmed immediately |
| 11 | Once per subject per Saturday | TRACED-OK | `award_credit` checks an existing row for `(child, kind, period, subject)` before inserting (paper_rewards.sql) and the table has `reward_credits_subject_uq` (20261125…sql:77); `award_sticker` has `on conflict (child_id, kind, period) do nothing`, so one `paper` sticker per Saturday |
| 12 | Wallet credit and SGD totals match for both parents | TRACED-OK | the ledger is per child: the parent route reads `reward_credits` by `child_id` (parent/rewards/route.js:38) and the student route likewise (student/rewards/route.js:21); both use `creditTotals`, only `confirmed` counts toward balance. Row owner (`parent_id`) is the earliest-linked parent (rewardsServer.js:46-49) but is not used to filter reads, so Mrs and Mr Tan see identical totals. SGD = credits x `sgd_per_credit` stored on the row (student route.js:27) |
| 13 | Settings saved with flag off keep paper settings | TRACED-OK | `saveChildSetting` (childSettingsServer.js:16-23) reads `paper_*` best effort when the flag is off, merges by `effective_from`, and `settingToRow(..., { paper: MOCK_EXAMS_ENABLED \|\| carryPaper })` writes them back. `applySettingEdit` carries `paperUnit/paperAmounts/paperCheckOff` from the base when the body omits them (childSettings.js:90-92). If the migration is not applied the select errors, `carryPaper` stays false and no paper column is written |
| 14 | Mastery counts only first sitting | TRACED-OK | dedupe key `English|<item>|mock|paper:<paper key>` (examPostSubmit.js:34) has no attempt id; upsert `onConflict: "student_id,dedupe_key"` with `ignoreDuplicates` matches the unique index `learning_trials_dedupe_uq` (20261128…sql:17). `first_try` is true only when no earlier trial exists for the item (examPostSubmit.js:33). Weight is 1; the half-weight delayed-similar path is in `homeworkMastery.js`, untouched |
| 15 | 8pm email dry-run and parent dashboard reflect results | PARTLY TRACED | email: `buildParentPayload` selects today's finished and any in-progress `exam_attempts` and `paperBlock` reports score, time used and open items to mark, only with the mock flag on (dailyAlert.js:24-36, 52-60, 71). Parent dashboard: a Papers tab (`ParentExams`) is shown only with the flag (ParentDashboard.js:852, 876); its internals and the wallet/rewards tab rendering were **not** read. The notebook/reward results are not part of the 8pm email by design (it carries paper name, score, time and items to mark only). Dry-run endpoint not executed |
| 16 | Flags default off; no new migration; no workflow or `genius_*` change | TRACED-OK | this pass changed `route.js`, `tools/exam_selftest.mjs` and this doc only |

### Bug found and fixed in this pass
- **Late submit with an unreadable draft (row 7 observation).** Before, `route.js:243` ignored the result of `autoSubmitExpired` and always answered 409 "time is up", even when nothing had been handed in, leaving a silent `in_progress` sitting. Now: if the sitting was handed in from the saved answers (or another request already did) the answer is still the same 409 "time is up". If the saved answers could not be read or graded, the route answers **503** with a plain message ("Open Mock papers again in a moment and they will be handed in"). The sitting stays `in_progress` on purpose (nothing is lost) and the next GET or start retries the auto-submit. Never a 500. The client treats 409 by leaving the paper; a 503 is shown as an ordinary error.

### Remaining GAPs / things to know
- Build, typecheck and all selftests: not run.
- `ParentExams` and the rewards tab UI were not read; the notebook tab UI and `ClaudeApp.js` handler are covered only by the PR's earlier build claim.
- No browser or database run. The `mock.spec.js` Playwright flow from phase 1 was not extended (it needs a local Supabase and Docker, see its header).
- Rewards need `NEXT_PUBLIC_REWARDS_ENABLED` as well as the mock flag.

## 3. Test code written but NOT run
Added to `tools/exam_selftest.mjs` (bottom, "Role-play" block). They run the **real** `route.js`, `examPostSubmit.js` and `rewardsServer.js` sources against the file's in-memory fake database with stubbed imports. No network, no Supabase, never the production project. **I could not run them, so any of them may fail on first run (most likely: fake-database query shapes).** Please run and send me the output.

| Test | Covers |
|---|---|
| Amir hands in a paper of blanks | wrong items in `wrong_answers` (1..20, attempt key `exam-<id>`, source id = paper, cause blank); all six causes accepted, `bogus` = 400, unknown item = 404; review then opens |
| review gating | in-progress = 409; another student's attempt = 404; cause on an unfinished attempt = 404; start and list responses contain no answer-key fields |
| late submit, unreadable draft | 503 (not 500), sitting untouched, next GET auto-submits |
| Saturday reward (Mrs Tan owns the ledger) | pending credit `kind paper`, `gate_day` = Saturday, parent = earliest-linked parent, one credit and one sticker per Saturday, non-Saturday / blank paper / abandoned paper get nothing |
| effort check off, default amount nothing | check off qualifies a thin paper; no amount = no credit |
| homework gate and wallet | `finalize_credits` rules asserted statically from the SQL; `creditTotals` split; parent ledger read is by child (Mrs and Mr Tan see the same totals) |
| mastery first sitting | second attempt of the same paper adds no `learning_trials` row |
| 8pm email block | auto-submitted sitting shows score %, items to review and open items |

Already in the file from the earlier pass (also never run): the expired-attempt auto-submit through GET, start and late submit; MCQ items with no options excluded from score, notebook and trials; settings saved with the flag off keep paper settings; migration shape and flag checks; email papers block.

Not covered by any test: the pending -> confirmed/forfeited transition itself (it is SQL; it needs a database), wallet SGD totals through the real routes, the parent dashboard UI, the browser flow.

## 4. Commands the owner should run (in this order)
```
npm ci
npm run build
npm run typecheck
node tools/exam_selftest.mjs
node tools/child_settings_selftest.mjs
node tools/daily_target_selftest.mjs
node tools/homework_mastery_selftest.mjs
node tools/notify_selftest.mjs
node tools/pending_credits_selftest.mjs
node tools/rewards_tiers_selftest.mjs
npx tsx tools/learning_grade_selftest.mjs     # needs tsx
```
Optional browser role-play (needs local Supabase + Docker, see `tests/e2e/mock.spec.js` header and `tests/e2e/helpers.js` `assertLocalOnly`): `npx playwright test tests/e2e/mock.spec.js`.
Apply `supabase/migrations/20261130000000_paper_rewards.sql` by hand before turning the mock flag on.
