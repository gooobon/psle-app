# Mock exams role-play, 19 Nov 2026

PR #45 (`claude/issue-44-20261119-1358`), local Supabase only. `supabase db reset` applied, in order, `20261127000000_learning_trials.sql`, `20261128000000_learning_trials_server_only.sql`, and `20261129000000_exam_attempts.sql`. The runner refused any URL or key containing the production project `zehnulwvysvnsshunxzr`. Email and WhatsApp stayed off. `NEXT_PUBLIC_SERVER_AUTH` and `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` were on only for the test server. The flag in source stays off unless that variable is the string `true`.

`node tools/exam_selftest.mjs`: 17 checks, all passed.

`E2E_MOCK_EXAMS=true E2E_PLAYWRIGHT_GREP=@mock bash tools/e2e/run-roleplay.sh`, then a second server on port 3001 with the flag unset. **15 pass, 0 fail, 1 gap.**

Mrs Tan, Mr Tan, and Amir. Amir's school is E2E Primary, so the picker does not prefer one school.

## What was played

| Check | Result | Evidence |
|---|---|---|
| Both parents linked | PASS | 2 `parent_child` rows. [01](e2e-2026-11-19/mock-01-parents.png) |
| Paper list, timer rule, flagged note | PASS | Printed time or 1.5 min/mark is on the card, and a neutral flag note is shown. [02](e2e-2026-11-19/mock-02-list.png) |
| Timer | PASS | Card said 75 min. The countdown started at 75:00. [03](e2e-2026-11-19/mock-03-timer.png) |
| Free navigation and flagging | PASS | Moved to the next section and back. One question showed "flagged". [04](e2e-2026-11-19/mock-04-flag.png) |
| Review, then a short hand-in | PASS | The check screen listed unanswered and flagged items. 4 answers, 32 of them stored wrong, `counts_reason` `too_little`. It did not count as a set. [05](e2e-2026-11-19/mock-05-short.png) |
| Auto-submit at 0:00 | PASS | The server deadline was shortened to 8 seconds, Amir continued, and the clock handed the paper in. Status `auto_submitted`. [06](e2e-2026-11-19/mock-06-auto.png) |
| 80% answered | PASS | 44/44 answered. Counted because of answers, not time. `daily_activity` sets 1, first-set score 0/0. Reward credits 0. [07](e2e-2026-11-19/mock-07-counted.png) |
| Open-ended question | PASS | Ai Tong School 2020. The result says a parent will mark it. [07b](e2e-2026-11-19/mock-07b-open.png) |
| Mrs Tan marks from the model answer | PASS | Papers tab showed the model answer. One `parent_correct` row was stored. [08](e2e-2026-11-19/mock-08-parent-mark.png) |
| Mr Tan sees the same paper | PASS | The same model answer is on his Papers tab. [09](e2e-2026-11-19/mock-09-parent-b.png) |
| Answer key stays off the student | PASS | 16 `/api/student/exam` responses. None contained an answer, hint, solution, or the model-answer text. |
| Forged and late submits | PASS | Unknown paper 400. Another student's attempt 404. Submit 2 minutes after the deadline 409. Direct insert with Amir's login 403. |
| 8pm email | PASS | Dry-run cron 200. The log contains "Mock papers" and does not contain an answer key. |
| Flag off | PASS | A server started without the flag: `/api/student/exam` is 404 before and after Amir logs in. The hub has no "English mock papers" button. |
| Expired sitting, then a new paper | GAP | Severity **high**. The old sitting became `abandoned` and none of its answers were stored. [10](e2e-2026-11-19/mock-10-abandoned.png) |

## Risks Claude noted

**No server autosave. High.** While the clock runs, answers are kept only in `genius_exam_inprogress_v1` on that device. The key is new and additive. It does not touch the other `genius_*` progress keys. A second device, or a cleared browser, has nothing to hand in. Refresh on the same device still has the local copy, and the server deadline does not move.

**Expired and unsubmitted becomes abandoned, and the answers are lost. High.** Confirmed. After the deadline, the picker says time is up and "Hand in" would send the local copy. Starting a different paper instead marks the old row `abandoned` and does not write `exam_answers`. The on-screen answer was gone from the server. This is the same hole as the missing autosave: the server never saw the answers.

**Late submit was not blocked. Fixed in this branch.** `acceptSubmitTime` allows 20 seconds of network grace and was not used by the route, so a paper could be handed in long after 0:00 and still be graded. The route now returns 409 `time is up` after that grace. A client `auto: true` sent before the server clock reaches the deadline is stored as an ordinary submit. The role-play got 409 for a submit two minutes late.

## Other fixes

Some multiple-choice rows are sentences with a blank and no options. The screen showed an empty choice list, so those questions could not be answered and a paper could not reach 80% answered. They now get a text box.

An A/B comprehension question whose choices were not a list crashed the paper (`indexOf is not a function`) and Next showed "This page couldn't load". Choices that are not a list fall back to A and B.

The flag remains off unless `NEXT_PUBLIC_MOCK_EXAMS_ENABLED=true`.

No `genius_*` progress key was renamed, cleared, or reset. Nothing was deleted.
