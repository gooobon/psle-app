# Go-live: plain P3 English and Chinese practice (issue #66)

Target date: 25 Nov 2026 (Singapore time). Scope: daily sets, wrong-answer notebook, parent homework, rewards, parent dashboard and English mock exams, for P3 English and P3 Chinese.

Rules for this file: names only, never values. No secret, email address or phone number goes in the repo. Everything here is read from the code on this branch. **I cannot see production**, so every "applied?" question has a verify query you run yourself in the Supabase SQL editor. Run all of it against the **production project only by hand and only on launch day**; automated tests never use it. More detail: `docs/launch-checklist.md`.

## 1. SQL migrations (apply by hand, in this order)

All files are in `supabase/migrations/`, additive and safe to re-run. Take a Supabase backup first. Do not edit an applied file.

| # | File | Needed for | Verify (expect non-null / rows) |
|---|---|---|---|
| 1 | `20261118000000_init.sql` | accounts, parent-child links | `select to_regclass('public.profiles');` |
| 2 | `20261119000000_daily_activity_and_guardians.sql` | daily sets, parent dashboard, two parents per child | `select to_regclass('public.daily_activity');` |
| 3 | `20261120000000_alert_log_and_guardian_invites.sql` | alert log, co-parent invites | `select to_regclass('public.alert_log');` |
| 4 | `20261121000000_email_alert_default_on.sql` | email channel on for confirmed parents | data check only |
| 5 | `20261122000000_wrong_answers.sql` | wrong-answer notebook | `select to_regclass('public.wrong_answers');` |
| 6 | `20261123000000_parent_homework.sql` | parent homework | `select to_regclass('public.parent_homework');` |
| 7 | `20261124000000_rewards.sql` | rewards | `select to_regclass('public.reward_credits');` |
| 8 | `20261125000000_reward_tiers_and_homework_count.sql` | reward tiers, homework count | `select to_regclass('public.reward_rule_versions');` |
| 9 | `20261126000000_pending_credits_shared_settings.sql` | pending credits, shared child settings. Apply **before** deploying code that needs it | `select proname from pg_proc where proname='finalize_credits';` |
| 10 | `20261129000000_exam_attempts.sql` | English mock exams | `select to_regclass('public.exam_attempts');` |
| 11 | `20261130000000_paper_rewards.sql` | Saturday paper reward (mock exams). Apply before turning mock exams on | `select column_name from information_schema.columns where table_name='reward_credits' and column_name='status';` plus the checks in the file header |
| 12 | `20261201000000_event_alerts.sql` | "started" / "milestone" parent alerts | `select to_regclass('public.event_alert_log');` |
| 13 | `20261202000000_parent_marks_into_score.sql` | parent marks count toward a paper score. **Apply before the mock-exam flag is on**: the hand-in and parent-marking routes read these columns | `select column_name from information_schema.columns where table_name='exam_attempts' and column_name in ('auto_score','parent_pending','settled_at');` expect 3 rows |

Note: the issue calls the last file `20261202000000_parent_marks_score.sql`. The file in the repo is **`20261202000000_parent_marks_into_score.sql`**. Treat it as unapplied unless the verify query for #13 returns 3 rows.

Not needed for plain practice: `20261127000000_learning_trials.sql` and `20261128000000_learning_trials_server_only.sql` (learning dashboard flag, which stays off). If you ever apply them, apply both together.

## 2. Environment variables (Vercel project `psle-app-vwx3`, Production)

`NEXT_PUBLIC_*` are baked in at build time: **redeploy after changing one.**

Required for any server feature:
- `NEXT_PUBLIC_SERVER_AUTH=true`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (service key is server only)
- `CRON_SECRET` (weekly report, event-alert flush and credit settling crons)
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- `APP_BASE_URL` (links in emails)

Feature flags (all default off, set to `true` to enable):

| Feature | Flag | Also needs |
|---|---|---|
| Daily sets + parent dashboard | `NEXT_PUBLIC_SERVER_AUTH` | SQL 1-4 |
| Wrong-answer notebook sync | `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED` | SQL 5 |
| Parent homework | `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED` | notebook flag, SQL 5, 6, 8 |
| Rewards (stickers, credits, weekly review) | `NEXT_PUBLIC_REWARDS_ENABLED` | homework flag, SQL 7, 8, 9 |
| English mock exams | `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` | SQL 10, 11, 13 |

Parent alerts (server-only env, no redeploy of flags needed but redeploy to be safe):
- Email: `EMAIL_ALERTS_ENABLED=true`, `RESEND_API_KEY`, `ALERT_FROM_EMAIL` (on a Resend-verified domain). Until `EMAIL_ALERTS_ENABLED=true`, emails are dry-run only.
- Recipient control: `ALERT_TEST_RECIPIENTS` (comma-separated allow-list) while testing. For the real launch, unset it and set `ALERT_ALLOW_ALL_PARENTS=true` (weekly report). The milestone alert honours `ALERT_TEST_RECIPIENTS` the same way.
- Milestone alerts (finish a set or paper): with WhatsApp off they now go by email, controlled by `EMAIL_ALERTS_ENABLED` and the allow-list. The "practice started" alert stays WhatsApp-only.
- WhatsApp: leave `WHATSAPP_ENABLED` and every `WHATSAPP_*` variable **unset** for this launch.

Leave unset: `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`, `ANTHROPIC_API_KEY` (only the admin content generator uses it).

## 3. Order of operations

1. Back up Supabase. Confirm you are on `psle-app-vwx3`.
2. Apply SQL 1-9 in order; run each verify query. (Apply 9 before the code that needs it.)
3. Apply SQL 10-13 in order (mock exams need all four; 12 is needed for milestone alerts).
4. Set the required env vars (section 2) and the cron secret. Leave all flags off. Redeploy. Check the app still works as before.
5. Turn flags on **one at a time**, redeploying and smoke-testing as a test student and a test parent after each:
   1. `NEXT_PUBLIC_SERVER_AUTH`
   2. `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`
   3. `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`
   4. `NEXT_PUBLIC_REWARDS_ENABLED` (check the student wallet shows credits only, no S$; the parent screen shows S$)
   5. `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` (check a "(2 marks)" question adds 2 to the score and total)
6. Parent dashboard: check the test parent sees activity and mistakes for the linked child.
7. Alerts: set `ALERT_TEST_RECIPIENTS` to the owner's test address (value in Vercel only), set `EMAIL_ALERTS_ENABLED=true` and the Resend variables, finish a test set, and confirm one milestone email arrives and nobody else is emailed. Then, for launch, unset `ALERT_TEST_RECIPIENTS` and set `ALERT_ALLOW_ALL_PARENTS=true`.
8. Check the history tab of the test student shows the paper's real school, not a fixed name.

## 4. Rollback

Set a flag to anything other than `true` (or remove it) and redeploy. Nothing is deleted: tables, rows and `genius_*` localStorage keys stay. Unset `EMAIL_ALERTS_ENABLED` to stop emails. Never use `drop` or `delete` SQL as a rollback.
