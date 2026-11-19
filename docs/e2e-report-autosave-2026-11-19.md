# Mock exam autosave role-play, 19 Nov 2026

PR #47 (`claude/issue-46-20261119-1514`), local Supabase only. `supabase db reset` applied `20261127000000_learning_trials.sql`, `20261128000000_learning_trials_server_only.sql`, and `20261129000000_exam_attempts.sql`. The runner refused any URL or key containing the production project `zehnulwvysvnsshunxzr`. Email and WhatsApp stayed off. `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` was on only for the test server. The flag in source stays off unless that variable is the string `true`.

`node tools/exam_selftest.mjs`: 23 checks, all passed, including the new check that a late autosave cannot overwrite or delete a graded row.

`E2E_MOCK_EXAMS=true E2E_PLAYWRIGHT_GREP=@autosave bash tools/e2e/run-roleplay.sh` exited 0. **11 pass, 0 fail, 0 gap.**

Mrs Tan, Mr Tan, and Amir. Amir answered B on an English past paper.

| Role | Step | Expected | Actual | Result | Screenshot |
|---|---|---|---|---|---|
| Parents | Both linked | Mrs Tan and Mr Tan follow Amir | Linked | PASS | [01](e2e-2026-11-19/auto-01-parents.png) |
| Amir | Autosave after a change | A draft row (`correct` null) within about 3 seconds | B stored in 3061 ms, `correct` null | PASS | [02](e2e-2026-11-19/auto-02-saved.png) |
| Amir | Second browser | A fresh context resumes the server copy | The same answer was selected | PASS | [03](e2e-2026-11-19/auto-03-resume.png) |
| Amir | 30 second retry | A failed 3 second save is sent again by the interval | The flag was still unset after the failed save, then stored | PASS | |
| Amir | Expired, unsubmitted | Reopening the app grades the saved answers as `auto_submitted`, not abandoned | Status `auto_submitted`, answer graded correct, `counts_reason` time. Daily set 1, first-set score 0/0 | PASS | [04](e2e-2026-11-19/auto-04-expired.png) |
| Mrs Tan | Papers tab | The auto-submitted paper is listed | Score on the tab | PASS | [05](e2e-2026-11-19/auto-05-parent.png) |
| Mr Tan | Papers tab | The same paper | Visible | PASS | [06](e2e-2026-11-19/auto-06-parent-b.png) |
| Parents | 8pm email | Dry-run Mock papers section, no answer key | Cron 200, "Mock papers" present | PASS | |
| Amir | Late hand-in | After the 20 second grace, submit is 409 and the saved answer is graded, not dropped | HTTP 409, status `auto_submitted`, answer `val` 1 still stored | PASS | [07](e2e-2026-11-19/auto-07-late.png) |
| Amir | Forged autosave | Another attempt 404, a foreign question id is not stored, a save after the deadline is refused and the stored value is unchanged | 404, `saved: true` with count 1 and no `forged-question` row, `saved: false` status `expired`, value stayed 1 | PASS | |
| Amir | No answer key | Autosave and resume responses have no hint, solution, or model answer | 17 responses, 0 leaks, 6 saves | PASS | |

## Graded-row race

A save that arrives after the paper is graded used to upsert and delete by question id alone, so it could set `correct` back to null or delete the graded row. The save now inserts with `ignoreDuplicates` and updates or deletes only where `correct IS NULL`. The final grade still overwrites the draft. `tools/exam_selftest.mjs` checks that split.

No `genius_*` progress key was renamed, cleared, or reset. The in-progress copy stays in `genius_exam_inprogress_v1`. Nothing was deleted.
