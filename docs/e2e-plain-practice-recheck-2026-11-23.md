# Plain-practice go-live recheck, 23 Nov 2026

Played again after merging `origin/main` (includes PR #82) into `cursor/plain-practice-golive-e2e-8e14`. The script clicks the same buttons a parent or student would. Screenshots are in `docs/e2e-2026-11-23-recheck/`.

Local Supabase only. API `http://127.0.0.1:54321`. `supabase db reset` applied every file in `supabase/migrations/`, in filename order, through `20261204000000_clewquest_link_codes.sql` (17 files). `supabase status -o env` did not contain the production project `zehnulwvysvnsshunxzr`. WhatsApp was unset. `EMAIL_ALERTS_ENABLED=true` and `ALERT_TEST_RECIPIENTS=mrs.tan.e2e@example.com` were set only for the second Next process. `RESEND_API_KEY` and `ALERT_FROM_EMAIL` were unset, so no message was handed to Resend. The Next logs have no `resend` host.

Flags on for this Next process only: `NEXT_PUBLIC_SERVER_AUTH`, `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`, `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`, `NEXT_PUBLIC_REWARDS_ENABLED`, `NEXT_PUBLIC_MOCK_EXAMS_ENABLED`. `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED` and `NEXT_PUBLIC_CLEWQUEST_ENABLED` were unset.

The machine date is Monday 23 Nov 2026. Reward rules start the next Singapore day, so the local clock (Next, the browser `Date`, and a local-only `e2e_clock` table) was moved forward one day before the practice. Screens that show 24 Nov 2026 are that shifted day.

Family: Mrs Tan (`mrs.tan.e2e@example.com`, the allow-list), Mr Tan (`mr.tan.e2e@example.com`), child Mei Tan (`mei_e2e`, P3, school E2E Primary).

## Verdict

Launch-ready for the plain-practice checks that blocked the earlier role-play.

Finishing a daily set, finishing parent homework, and settling a paper each write `event_alert_log`. For each event Mrs Tan is the only parent who reaches the send, and that send stops locally because there is no Resend key. Mr Tan is skipped by the allow-list. No row is `sent`.

## Pass / fail

| Check | Result | What was on screen or in the local database |
|---|---|---|
| All 17 migrations, local only | PASS | `profiles`, `daily_activity`, `alert_log`, `wrong_answers`, `parent_homework`, `reward_credits`, `reward_rule_versions`, `finalize_credits`, `exam_attempts`, `event_alert_log`, `learning_trials` present. `exam_attempts` has `auto_score`, `parent_pending`, `settled_at`. |
| P3 child, two parents | PASS | Grade selector and stored grade P3. School E2E Primary. 2 `parent_child` rows. [01](e2e-2026-11-23-recheck/01-child-created.png) [02](e2e-2026-11-23-recheck/02-both-parents.png) |
| New child is selected | PASS | Rewards and Papers are on the page as soon as the child exists. No chip tap first. [01](e2e-2026-11-23-recheck/01-child-created.png) |
| Reward rules | PASS | Credits on. 1 credit = S$0.50. 70%+ → 2 credits, 90%+ → 3. Weekly English 5 / Chinese 4. Saturday paper English 6. Applies from the next Singapore day. [03](e2e-2026-11-23-recheck/03-reward-rules.png) |
| Student sign-in, no Korean, no dollars | PASS | Hello, Mei. E2E Primary · P3. English and Chinese to do. Math and Science Coming soon. No Hangul. No S$. [04](e2e-2026-11-23-recheck/04-student-today.png) |
| English solve screen is a plain paper | PASS | Section 1/7 Grammar MCQ. Numbered options. No stickers, Clew, yarn or XP. [05](e2e-2026-11-23-recheck/05-solve-plain.png) |
| Hint, then first-try score | PASS | A wrong grammar item showed "Not quite! Hint:" and did not name the answer. Finished set: **29/37 correct on first try (78%)**. [06](e2e-2026-11-23-recheck/06-english-hint.png) [07](e2e-2026-11-23-recheck/07-english-result.png) |
| First set drives the reward | PASS | `first_set` 29/37 = 78%. 70% tier → **2 credits**. A second English set the same day left first_set at 29/37. [08](e2e-2026-11-23-recheck/08-english-second.png) |
| Student wallet is credits only | PASS | "Pending: 2 credits. Pending: finish today's homework." No S$. [09](e2e-2026-11-23-recheck/09-student-wallet.png) |
| History school is the paper's school, and the full name fits | PASS | Stored label **Anglo-Chinese School (Junior)**, exam type WA1. The row's text is `Mock: Anglo-Chinese School (Junior) WA1`. `white-space` is `normal`, `overflow-wrap` is `anywhere`, and the box is 578px wide with no horizontal overflow. [11](e2e-2026-11-23-recheck/11-history-school.png) |
| "(2 marks)" on a real paper | PASS | Catholic High Primary School 2024 EOY. The comprehension text includes a printed 2-mark item. [12](e2e-2026-11-23-recheck/12-paper-question.png) |
| Hand-in score waits for the parent | PASS | **4/37 + 7 awaiting parent marking**. `auto_score` 4, `auto_total` 37, `parent_pending` 7. [13](e2e-2026-11-23-recheck/13-paper-score.png) |
| One parent "Correct" on a [2 marks] item | PASS | **4/37 pending 7 → 6/39 pending 6.** Score and total each rose by 2. [17](e2e-2026-11-23-recheck/17-parent-mark.png) |
| All remaining open items marked correct | PASS | Settled **15/48**, `parent_pending` 0. [21](e2e-2026-11-23-recheck/21-parent-settled.png) |
| Parent wallet shows credits and S$ | PASS | Before homework was finished: pending 2 (≈ S$1.00). After the student finished the assigned homework, the same screen shows **Confirmed 2 · Paid 0**, still ≈ S$1.00, ledger line 2026-11-24 +2, daily set, English, 78%. [18](e2e-2026-11-23-recheck/18-parent-wallet.png) [23](e2e-2026-11-23-recheck/23-parent-wallet-confirmed.png) |
| Daily study status | PASS | Today card before Chinese: English done, Chinese not done. Questions 136. After Chinese and homework: both subjects done, 164 questions, 52%. [14](e2e-2026-11-23-recheck/14-parent-today.png) |
| Parent overview on another browser | PASS for Sessions and Average | Sessions **4**, Average **40%**. This browser has none of Mei's local history. [15](e2e-2026-11-23-recheck/15-parent-overview.png) |
| Trend, Mock Done, section stats on that browser | Still empty | Trend **—**. Mock Done **0**. Section Performance, Strongest, Weakest and the All Sessions table have no rows. Those still read the child's local history. |
| Extra homework stored | PASS | Waited until the server list replaced the empty local list (`All (62)`). Opened a Session 1 practice card and pressed Assign. `POST /api/parent/homework` returned 200, `assigned: 2`. Two `parent_homework` rows, source `S01_B_S01_B3`, questions `S02_B_S02_B7` and `S03_B_S03_B3`, `assigned_for` 2026-11-24. [16](e2e-2026-11-23-recheck/16-homework.png) |
| Student finishes that homework | PASS | Mei opened Mistakes, pressed "Start homework (2 left)", and the paper was a 2-item Grammar MCQ. Screen: **Today: 2 of 2 done · 0 correct** and **All done for today!** Both rows have `solved_at` set. Both are `correct = false` because the driver picked option (1). [22](e2e-2026-11-23-recheck/22-homework-done.png) |
| Both channels off, before the email process | PASS | After the English sets, the mock and the paper hand-in, `event_alert_log` had 0 rows. |
| Chinese set | PASS | **19/28 first try**. No Hangul. [20](e2e-2026-11-23-recheck/20-chinese-result.png) |
| Milestone after homework, email on, WhatsApp off | PASS | Two rows, key `English:hw-2026-11-24`. Mrs Tan: `skipped` / `whatsapp off; email skipped`. Mr Tan: `skipped` / `whatsapp off; email not_on_allow_list`. |
| Milestone after the Chinese set, same env | PASS | Two rows, key `Chinese:set-1`, same two details. |
| Milestone after the paper is settled, same env | PASS | Two rows, key `English:paper-<attempt id>`, same two details. |
| Nothing delivered | PASS | 6 `event_alert_log` rows, all `skipped`, none `sent`. Next's alert log has no Resend request. |
| Alert settings copy | PASS | Checkbox: "Email me when my child finishes a set, a paper or assigned homework, plus the weekly report". Quiet hours inputs are 21:30 and 06:30 (shown as 09:30 PM to 06:30 AM). WhatsApp is "coming soon". The 8pm daily line is gone. [19](e2e-2026-11-23-recheck/19-alerts-settings.png) |

## Homework root cause

The 23 Nov role-play stored **0** `parent_homework` rows because the harness never assigned any.

The mistakes were on the server (71 `wrong_answers`, and the screenshot showed the questions). The harness then did this:

```js
const mistakeCard = page.locator("button", { hasText: /Session/ }).first();
if (await mistakeCard.count()) await mistakeCard.click();
```

The first button whose text contains "Session" is the **Session filter chip** (`Session 1`, `Session 2`, …), not a mistake card. Clicking it only filters the list. The Assign button is drawn inside an expanded card, so it was not on the page, the click was skipped, and no `POST /api/parent/homework` ran.

This recheck waited until the server list replaced the parent's empty local history, opened a Session 1 practice card (the playground grammar item), and pressed Assign. The API stored 2 rows. Mei finished both through the exam screen, both rows got `solved_at`, and the homework milestone was written.

A separate timing note, not the cause of the earlier zero: the Mistakes tab paints "No mistakes recorded yet!" from the parent's own browser until `/api/parent/wrong-answers` returns. A shot taken in that gap looks empty even when the rows are already stored. The earlier screenshot was taken after the list had loaded.

## Blocking

None of the previous blockers remain.

The daily-set route now calls the milestone alert when email is on and WhatsApp is off. Homework and a settled paper do the same. The allow-list kept Mr Tan out. Mrs Tan's send stopped because `RESEND_API_KEY` and `ALERT_FROM_EMAIL` were absent. That stop is status `skipped` with detail `whatsapp off; email skipped`, not status `dry-run`. The dry-run file only captured two settings-change notices (credits and "questions per mistake"), which the app renders without sending.

## Non-blocking

1. **Trend, Mock Done, and the section stats are still empty on the parent's own device.** Sessions and Average come from `daily_activity`. Trend, Mock Done, Section Performance, Strongest, Weakest and All Sessions still read `genius_progress_v2` in that browser, which does not have Mei's sessions.
2. **A real Resend delivery was not tried.** The allow-listed parent reached the send step and stopped. No message left the machine.
3. **The two homework answers were wrong.** The screen says 0 correct. Completion does not require a right answer, and the milestone still fired.
4. **The Today hub still shows the sticker shelf.** The question page itself is a plain paper. The student wallet did not show a dollar amount.
5. **Phone width was not checked.** The window was 1280×900.

## What the merge kept

`origin/main` was merged into this branch. The only conflict was `tests/e2e/helpers.js`. Product code is main's (PR #82). The go-live docs and the score driver stayed this branch's. The OrderTap step keeps main's disabled check and this branch's already-answered True/False guard.
