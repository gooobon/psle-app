# Plain-practice go-live role-play, 23 Nov 2026

Played on current `main` (`1e64339`, which includes PR #67) through the real UI in Chromium. The script clicks the same buttons a parent or student would. The screens below are from that session. One extra pass, with the server left running, replayed the paper milestone after the first pass had killed the process before the alert write finished.

Local Supabase only. API `http://127.0.0.1:54321`. `supabase db reset` applied every file in `supabase/migrations/`, in filename order, through `20261202000000_parent_marks_into_score.sql` (15 files, including the two learning-trial files the go-live doc says are not needed). Nothing used the production project `zehnulwvysvnsshunxzr`. WhatsApp was unset. No Resend key and no from-address were set, so no email left the machine.

Flags on for this Next process only: `NEXT_PUBLIC_SERVER_AUTH`, `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`, `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`, `NEXT_PUBLIC_REWARDS_ENABLED`, `NEXT_PUBLIC_MOCK_EXAMS_ENABLED`. `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED` and `NEXT_PUBLIC_CLEWQUEST_ENABLED` were unset. The Clewquest flag is not read anywhere in `src/`.

The machine date is Monday 23 Nov 2026. Reward rules always start the next Singapore day, so the local clock (Next, the browser `Date`, and a local-only `e2e_clock` table) was moved forward one day before the practice. The screens that show 24 Nov 2026 are that shifted day. GoTrue kept the real clock.

Family: Mrs Tan (`mrs.tan.e2e@example.com`), Mr Tan (`mr.tan.e2e@example.com`), child Mei Tan (`mei_e2e`, P3, school E2E Primary).

## Verdict

Not launch-ready for the milestone email described in `docs/launch/plain-practice-go-live.md`.

Finishing a daily set does not email a parent when WhatsApp is off. The paper path does. See the blocking issue below. The practice, scoring, school label, 2-mark parent marks, and the credits-only student wallet behaved as intended.

## Pass / fail

| Check | Result | What was on screen or in the local database |
|---|---|---|
| All 15 migrations, local only | PASS | `profiles`, `daily_activity`, `alert_log`, `wrong_answers`, `parent_homework`, `reward_credits`, `reward_rule_versions`, `finalize_credits`, `exam_attempts`, `event_alert_log`, `learning_trials` present. `exam_attempts` has `auto_score`, `parent_pending`, `settled_at`. |
| P3 child, two parents | PASS | Grade selector and stored grade P3. School E2E Primary. 2 `parent_child` rows. [01](e2e-2026-11-23/01-child-created.png) [02](e2e-2026-11-23/02-both-parents.png) |
| Reward rules | PASS | Credits on. 1 credit = S$0.50. 70%+ → 2 credits, 90%+ → 3. Weekly English 5 / Chinese 4 credits. Saturday paper English 6 credits. Saved message: applies from 24 Nov 2026. [03](e2e-2026-11-23/03-reward-rules.png) |
| Student sign-in, no Korean, no dollars | PASS | Hello, Mei. E2E Primary · P3. English and Chinese to do. Math and Science Coming soon. No Hangul. No S$. [04](e2e-2026-11-23/04-student-today.png) |
| English solve screen is a plain paper | PASS | Section 1/7 Grammar MCQ. Numbered options. No stickers, Clew, yarn or XP. [05](e2e-2026-11-23/05-solve-plain.png) |
| Hint, then first-try score | PASS | A wrong grammar item showed "Not quite! Hint:" and did not name the answer. Finished set: **29/37 correct on first try (78%)**. After Hint box: **0**. Not solved: **8**. [06](e2e-2026-11-23/06-english-hint.png) [07](e2e-2026-11-23/07-english-result.png) |
| First set drives the reward | PASS | `first_set` 29/37 = 78% (floored). 70% tier → **2 credits, pending**. A second English set the same day left first_set at 29/37 and the credit at 2 pending. [08](e2e-2026-11-23/08-english-second.png) |
| Student wallet is credits only | PASS | "Pending: 2 credits. Pending: finish today's homework." No S$, no SGD, no rate. [09](e2e-2026-11-23/09-student-wallet.png) |
| History school is the paper's school | PASS | Header and stored history: **Anglo-Chinese School (Junior)**, exam type WA1. Not "Nanyang Primary" and not "E2E Primary". The Recent Sessions row clips the name to "Mock: Angl". [10](e2e-2026-11-23/10-mock-header.png) [11](e2e-2026-11-23/11-history-school.png) |
| "(2 marks)" on a real paper | PASS | Catholic High Primary School 2024 EOY. The comprehension text includes a printed 2-mark item. [12](e2e-2026-11-23/12-paper-question.png) |
| Hand-in score waits for the parent | PASS | Screen and database: **4/37 + 7 awaiting parent marking**. Answered 43/44. `auto_score` 4, `auto_total` 37, `parent_pending` 7. [13](e2e-2026-11-23/13-paper-score.png) |
| One parent "Correct" on a [2 marks] item | PASS | **4/37 pending 7 → 6/39 pending 6.** Score and total each rose by 2. [17](e2e-2026-11-23/17-parent-mark.png) |
| All remaining open items marked correct | PASS | Settled **15/48**, `parent_pending` 0. [21](e2e-2026-11-23/21-parent-settled.png) |
| Parent wallet shows credits and S$ | PASS | Pending: **2 (≈ S$1.00)**. Ledger line: 2026-11-24 pending 2, daily set, English, 78%. Confirmed 0 (≈ S$0.00). [18](e2e-2026-11-23/18-parent-wallet.png) |
| Daily study status | PASS | Today card: English done, Chinese not done. Questions 136, accuracy 40% (the whole day, not the first-set 78%). [14](e2e-2026-11-23/14-parent-today.png) |
| Parent overview on another browser | FAIL | Sessions —, Average —, Mock Done 0. The child's history is in that browser's localStorage. [15](e2e-2026-11-23/15-parent-overview.png) |
| Parent mistakes list | PASS | The questions from the sets were on the Mistakes tab. 71 `wrong_answers` rows. [16](e2e-2026-11-23/16-homework.png) |
| Extra homework stored | FAIL | `parent_homework` stayed at 0 rows. |
| Both channels off | PASS | After the English sets, the mock and the paper hand-in, `event_alert_log` had 0 rows. |
| Chinese set | PASS | **19/28 first try**. Screen 68% (rounded). 2 solved after a hint, shown as practice and not in the score. No Hangul. [20](e2e-2026-11-23/20-chinese-result.png) |
| Milestone email after a finished set, WhatsApp off, email on | FAIL | `event_alert_log` stayed empty. `POST /api/activity` returned 200 and did not call the alert. |
| Milestone email after the paper is settled, same env | PASS | Two rows, nothing delivered. Mrs Tan: `milestone / skipped / whatsapp off; email skipped` (she is on the allow-list; send stopped because there is no Resend key). Mr Tan: `milestone / skipped / whatsapp off; email not in allow-list`. |
| Alert settings copy | PASS | The panel still offers "Email me the daily progress alert (8pm Singapore time)" and quiet hours 21:30–06:30. [19](e2e-2026-11-23/19-alerts-settings.png) |

## Blocking

**A finished daily set does not email when WhatsApp is off.**

`docs/launch/plain-practice-go-live.md` says a milestone (finish a set or a paper) goes by email when WhatsApp is off. `notifyEvent` in `src/lib/notify/eventAlerts.mjs` does that. The daily-set route does not call it unless WhatsApp is on:

```24:29:src/app/api/activity/route.js
  // Milestone alert to both linked parents (WhatsApp, email fallback). Off unless WHATSAPP_ENABLED=true; deduped per (parent, set key); never blocks.
  if (process.env.WHATSAPP_ENABLED === "true") {
    const q = Math.max(0, Math.round(Number(b.questions) || 0)), c = Math.max(0, Math.min(q, Math.round(Number(b.correct) || 0)));
    const label = key.startsWith("adapt-") ? "adaptive practice round" : key.startsWith("paper-") ? "mock paper" : key.startsWith("set-") ? "daily set " + key.slice(4) : "practice set";
    await notifyEvent(adminClient(), { type: "milestone", childId: me.profile.id, subject, key, label, score: c, total: q });
  }
```

The homework-finished route (`src/app/api/student/homework/route.js`) has the same WhatsApp gate. The "practice started" route is WhatsApp-only, which matches the doc.

What this run saw, with `EMAIL_ALERTS_ENABLED=true`, `ALERT_TEST_RECIPIENTS` set to Mrs Tan, and WhatsApp unset:

- Mei finished the Chinese set (19/28). No `event_alert_log` row.
- After every open item on Catholic High 2024 EOY was marked and the paper settled (15/48), two milestone rows were written. Only Mrs Tan was eligible. Mr Tan was skipped by the allow-list. Neither row was `sent`.

Step 7 of the go-live doc ("finish a test set, and confirm one milestone email") will not produce that email if WhatsApp is left unset.

## Non-blocking

1. **Parent Overview is empty on another device.** Sessions, average and mock count read `genius_progress_v2` in that browser. Mrs Tan's browser had none of Mei's sessions, so the cards were dashes and "Mock Done 0". The Today card and the Mistakes tab, which read the server, did show the day and the questions.
2. **Homework was not stored.** The Mistakes tab listed the questions (71 server rows). `parent_homework` stayed at 0. This run did not end with an assigned homework row.
3. **Recent Sessions clips the school.** The stored label is "Anglo-Chinese School (Junior)". The row draws "Mock: Angl".
4. **A new child is not selected.** After Create, the Rewards / Overview / Mistakes / Papers tabs are not in the page until the parent taps the child chip. The Today card is already there.
5. **The Alerts panel still describes an 8pm daily email.** `src/lib/dailyAlert.js` says that sender was removed. Quiet hours default to 21:30–06:30, so a milestone inside that window is held.
6. **The result screen uses a star.** The question page itself is a plain paper (screenshot 05). The Today hub also shows the sticker shelf, which is the rewards UI, and it did not show a dollar amount.

## Go-live doc corrections

`docs/launch/plain-practice-go-live.md`:

1. Step 7 should not say that finishing a test set sends the milestone email while WhatsApp is unset. As the code stands, only a settled paper does. Either change `src/app/api/activity/route.js` (and the homework route) to call `notifyEvent` when the email fallback is on, or change the doc.
2. A reward-rule save applies on the next Singapore day. A same-day check will show no new credits.
3. Say that quiet hours default to 21:30–06:30. A check inside that window finds a `deferred` row, not a delivery.
4. After creating the child, tap the child before looking for Rewards, Papers or Mistakes.
5. "The parent sees activity and mistakes" is the Today card and the Mistakes tab. The Overview session chart is still the browser's local history.
6. The in-app "8pm daily progress" checkbox is not the sender. The live mail is the milestone email and the weekly report.
7. The numbered SQL list skips `20261127000000_learning_trials.sql` and `20261128000000_learning_trials_server_only.sql` on purpose. Applying "every file in filename order" is a different list. The note that those two stay off for this launch is right. The last filename is already corrected in the doc (`parent_marks_into_score.sql`).
8. `.env.example` does not list `NEXT_PUBLIC_MOCK_EXAMS_ENABLED`, `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`, `ALERT_TEST_RECIPIENTS` or `ALERT_ALLOW_ALL_PARENTS`.

## What was not checked

- A real Resend delivery. The allow-listed parent reached the send step and stopped because `RESEND_API_KEY` and `ALERT_FROM_EMAIL` were absent. No message was handed to Resend.
- A phone-width layout. The session used a 1280×900 window. The child-chip and the clipped school name are visible there.
- `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`. It stayed off, as the go-live doc says.
