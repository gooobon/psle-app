# End-to-end test of tonight's flag-gated server work

Tested locally on 19 Nov 2026 (Asia/Singapore), against a fresh database. Nothing here was pointed at production, and no real email was sent.

## How it was run

Docker is not available on this machine, so the stack is Postgres 16 plus the Supabase Auth and PostgREST binaries, behind a small local proxy:

- Postgres 16 on `127.0.0.1:5432`, with the `auth` schema created by GoTrue 2.198.0 (`auth migrate`, 77 auth migrations).
- PostgREST 16.6 for `/rest/v1`, GoTrue for `/auth/v1`.
- Dummy JWT secret and dummy anon / service-role keys. Not production secrets.
- App: `npm run dev` on `http://127.0.0.1:3000` with `NEXT_PUBLIC_SERVER_AUTH`, `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`, `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`, and `NEXT_PUBLIC_REWARDS_ENABLED` set to `true`.
- `EMAIL_ALERTS_ENABLED` was left unset, and `RESEND_API_KEY` was not set. The 8pm route therefore takes the dry-run branch (render and count, no provider call, no `alert_log` row).

The browser was headless Chrome, timezone Asia/Singapore. Saturday was faked only inside the Next.js process (`Date` shifted to Saturday 21 Nov 2026, 10:00 SGT) so GoTrue token expiry stayed valid. Postgres `now()` stayed on the real clock, which is why the daily activity row is dated 19 Nov and the Saturday screen's "today" strip is 21 Nov.

## Migrations

All seven files in `supabase/migrations` were applied in order on an empty database, after the GoTrue auth schema existed. **None failed. None were edited.**

| Migration | Result |
|---|---|
| `20261118000000_init.sql` | pass |
| `20261119000000_daily_activity_and_guardians.sql` | pass |
| `20261120000000_alert_log_and_guardian_invites.sql` | pass |
| `20261121000000_email_alert_default_on.sql` | pass |
| `20261122000000_wrong_answers.sql` | pass |
| `20261123000000_parent_homework.sql` | pass |
| `20261124000000_rewards.sql` | pass |

They still have to be applied to the real Supabase project before the flags are turned on. This run only proves the SQL applies cleanly from scratch.

## Flows

| Flow | Result |
|---|---|
| Parent sign-up and child creation | Pass. `mrs.tan@example.com` signed up (local GoTrue auto-confirms; see notes) and created `amir_p3`. |
| Existing localStorage user migration | Pass. Seeded `genius_users_v2` / `genius_progress_v2` for `old_amir`, logged in, and the server created the account, stored the progress snapshots, and copied the seeded mistake. Local data was not cleared. |
| Student Today screen with the parent's target | Pass, after the fix below. Parent set English 2 and Chinese 0. Amir's Today showed "2 sets left today" and Chinese "今天不用做". After one finished set it showed "1 of 2 sets done". |
| Student gets questions wrong, picks a cause, Try 3 similar, resolution | Pass. A full English set was completed (4/37 first-try). Notebook showed the question text, cause "Didn't know the concept", Try 3 similar, then "resolved". Server row `S01_B_S01_B8` has `cause = concept_unknown` and `resolved_at` set. |
| Parent sees wrong answers | Pass, after the crash fix below. Parent Mistakes tab lists the server rows with the question, the child's answer, and the correct answer. |
| Parent homework, 3 per mistake, 10/day cap | Pass. Three assignments of 3 landed (9 used). The fourth returned HTTP 409 `cap` with 1 remaining. Student finished all 9 ("Today: 9 of 9 done"). |
| Saturday weekly review | Pass with a caveat. With the server date set to Saturday, the Mistakes screen showed "31 mistakes from this week" and "Start Weekly Review", and the review opened. The automated driver did not finish all 31 items (it stalled on the comprehension page). The completion request the app sends at the end of that review was then posted from the same logged-in session: `POST /api/student/rewards/weekly` returned `awarded: true`. |
| Stickers and parent credit ledger | Pass. Meeting the (then lowered) 1-set English target awarded one daily sticker and 2 credits at S$1. The weekly award added a second sticker and 5 credits. Parent marked 2 credits / S$2.00 paid. Ledger after that: earned 2 paid 2, then the weekly +5 still unpaid. |
| Second guardian invite and acceptance | Pass. Invite to `mr.tan@example.com`, sign-up, "Mrs Tan invited you to follow Amir Tan", Accept. `parent_child` has both parents linked to Amir. |
| 8pm alert route, dry-run | Pass. No `Authorization` returns 401. With the cron secret: `{"sent":0,"dryRun":2}` once both parents had a child. `alert_log` stayed empty, so a later real send is not blocked. No request left the machine. |
| Flags off | Pass. Login shows Student Sign Up and an ID field (not email). Demo student Today is "1 set left today", with no stickers and no homework card. |

Screenshots are in this folder, next to this file.

Parent sign-up and the new child:

![Child created](05-child-created.png)

Parent Today card after English was set to 2 and Chinese to 0 (Chinese drops off the card because nothing is required):

![Parent target 0 of 2](07-parent-today-after-target.png)

Student Today reading that target, after one set:

![Student 1 of 2](16-today-one-of-two.png)

Legacy localStorage account, after the server migration login:

![Legacy student](08-legacy-student-today.png)

Cause picked, and Try 3 similar:

![Cause and similar](17-cause-and-similar.png)

Resolved on the notebook:

![Resolved](23-resolved.png)

Parent looking at the synced mistakes:

![Parent mistakes](24-parent-sees-answer.png)

Homework assigned (the 10/day cap blocked the next batch of 3) and the student finishing it:

![Homework assigned](29-homework-assigned.png)

![Homework card](32-homework-card.png)

![Homework done](33-homework-finished.png)

Daily sticker, rules, and the paid ledger entry:

![Sticker](30-sticker.png)

![Rules](26-rules.png)

![Paid](34-paid.png)

Second guardian:

![Invite waiting](36-invite-waiting.png)

![Second guardian sees Amir](37-second-guardian.png)

Saturday weekly review card, and the parent rewards tab after the weekly sticker was awarded:

![Weekly review card](38-weekly-review-card.png)

![Weekly ledger](40-weekly-ledger.png)

Flags off:

![Flags off login](41-flags-off-login.png)

![Flags off today](43-flags-off-today.png)

## Bugs found and fixed

1. **Parents could not set the daily target.** The student Today screen reads `parent_settings.daily_target`, and `POST /api/parent/settings` already accepts it, but the parent UI never sent it. Every child stayed on the default of 1 set per subject. The alerts panel now edits sets per day (0–10) for English, Chinese, Math, and Science, and saves through that existing route.

2. **The parent's "Did they do it today?" card kept the old target after Save.** It only loaded when the child list changed. Saving settings now asks that card to reload.

3. **Wrong answers were stored without the question or the words.** Exam results only carry an id and an option index. The sync copied those, so `question_text` was null. The sync now resolves the sentence and the option words from the practice index (the same lookup the notebook already uses on screen). The POST route still inserts with "do nothing" on conflict, then fills `question_text` / answers only where the text is still null, via the service role, scoped to the caller. It does not touch `cause` or `resolved_at`. Re-login of Amir backfilled the 33 rows from the set he had already sat.

4. **Opening a parent mistake card crashed.** The child's-answer line was `yourAnswer || studentAnswer !== undefined && options ? options[studentAnswer] : "—"`. `||` and `&&` bind tighter than `?:`, so a server row whose answer is already the word `"start"` took the index branch and read `options[...]` on `undefined`. The line now shows `yourAnswer` when it is already text.

No migration file was changed. Flags still default to off. `.github/workflows` was not touched. Local progress and server rows were not deleted; the text backfill only fills empty question text.

## Left for the owner

- Apply `supabase/migrations` to the real Supabase project before turning flags on. This database was local and empty.
- Production has "Confirm email" on. This local Auth auto-confirms, so sign-up returned a session immediately. The "check your email, then log in" screen was not the path exercised.
- `EMAIL_ALERTS_ENABLED` was not turned on. The cron was tested on the dry-run branch only. A run with the flag true and no Resend key claims an `alert_log` row and then skips; that path was not used, on purpose, so today's real send is not blocked.
- The Saturday review was opened in the UI (31 mistakes, bonus-sticker copy, server `saturday: true`). Driving every item to the end stalled on the comprehension page, so the finish request (`POST /api/student/rewards/weekly`, the same call the review makes when it ends) was sent from that logged-in session. It returned `awarded: true`, and the parent tab shows the weekly sticker and the +5 credits.
- A child with two guardians follows the **earliest** parent's daily target (Mrs Tan: English 1, Chinese 0). Mr Tan's own Today card uses his own default row (Chinese still 1). That split is already noted in `src/lib/activity.js`.
- Homework sits on the English/Chinese Mistakes screen, not on the Today hub.
- Reward rules ship disabled. Nothing accrues until a parent turns them on. The ledger is still a record only.
