# Launch checklist (issue #52)

Follow this before turning on **any** production feature flag. Docs only: nothing here changes code, data, flag defaults or migrations.

How to read it:

- Everything below comes from files in this repo on `main` (commit `0960a16`). I cite the path next to each claim.
- **I cannot see production** (Supabase, Vercel, Resend). Where a fact depends on production state, it says **VERIFY** and gives you a query or a place to look. Nothing here says "applied" unless the repo proves it.
- **Env var names only. Never paste a value** into this file, a PR, an issue or a chat. Values live in Vercel and Supabase.
- Hard rules that apply to every step (from `CLAUDE.md` section 5 and the migration headers): never delete student progress, never touch `genius_*` localStorage keys, and make database changes only through `supabase/migrations`.

Vercel projects: **`psle-app-vwx3` is the live one** (`https://psle-app-vwx3.vercel.app`, also the fallback in `src/lib/dailyAlert.js` `dashboardUrl`). `psle-app` is being retired: do not set flags, secrets or the cron there, and do not leave any env var that points at the production Supabase project on it after retirement.

---

## 1. SQL order

Migrations are applied **by hand in the Supabase SQL editor**, in filename order (the filename is a timestamp; each header names its predecessor). Every file below uses `if not exists` / `drop ... if exists` / `create or replace` / `on conflict do nothing`, and each header says "Safe to re-run" (read from the file; I did not run them against Postgres in this PR).

Production column: I cannot see the production database. "Expected" means the code on `main` for that feature has shipped and its flag/feature is described as live or built on top of it. **Run the verify query on the production project before you rely on it.**

| # | File (`supabase/migrations/`) | Purpose | Belongs to | Production | Re-run safe | Verify (run in Supabase SQL editor) |
|---|---|---|---|---|---|---|
| 1 | `20261118000000_init.sql` | `profiles`, `parent_child`, `parent_settings`, `progress_snapshots`, `is_parent_of()`, RLS | Server step 1/5 (accounts, localStorage import) | Expected (everything server-side needs it) | Yes (header: idempotent) | `select to_regclass('public.profiles'), to_regclass('public.progress_snapshots');` both non-null |
| 2 | `20261119000000_daily_activity_and_guardians.sql` | `daily_activity`, `record_activity()`, many parents per child, `profiles.email`, `alert_channels` | Server step 2/5 | Expected | Yes | `select to_regclass('public.daily_activity'); select proname from pg_proc where proname='record_activity';` |
| 3 | `20261120000000_alert_log_and_guardian_invites.sql` | `alert_log` (one row per parent, SGT day, channel), `guardian_invites` | Server step 3/5 (daily alert, co-parent invites) | Expected | Yes | `select to_regclass('public.alert_log'), to_regclass('public.guardian_invites');` |
| 4 | `20261121000000_email_alert_default_on.sql` | Turns the email channel on for parents with a **confirmed** Supabase email. Never overwrites an existing email entry | Server step 3/5 follow-up | Expected | Yes (never changes a parent who already has an email entry) | `select count(*) from parent_settings where alert_channels @> '[{"type":"email"}]'::jsonb;` (a data check, not a schema check) |
| 5 | `20261122000000_wrong_answers.sql` | `wrong_answers` table (student insert, guardian read) | Server step 4 (flag `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`) | Expected | Yes | `select to_regclass('public.wrong_answers');` |
| 6 | `20261123000000_parent_homework.sql` | `parent_homework`, `assign_homework()` (cap 10 per child per day) | Roadmap step 8 (flag `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`) | Expected | Yes | `select to_regclass('public.parent_homework'); select proname from pg_proc where proname='assign_homework';` |
| 7 | `20261124000000_rewards.sql` | `stickers`, `weekly_reviews`, `reward_rules`, `reward_credits`, `reward_payouts`, `award_sticker()`, `record_payout()` | Roadmap step 9 (flag `NEXT_PUBLIC_REWARDS_ENABLED`) | Expected | Yes | `select to_regclass('public.stickers'), to_regclass('public.reward_credits'), to_regclass('public.reward_payouts');` |
| 8 | `20261125000000_reward_tiers_and_homework_count.sql` | First-set score columns on `daily_activity`, `reward_rule_versions` (tiers), per-subject credits, `award_credit()`, `homework_per_mistake` | Issue #29 (rewards tiers, homework count) | Expected | Yes (additive; carries legacy rules over once with `on conflict do nothing`) | `select column_name from information_schema.columns where table_name='daily_activity' and column_name='first_set_questions'; select to_regclass('public.reward_rule_versions');` |
| 9 | `20261126000000_pending_credits_shared_settings.sql` | Credit `status` (`pending`/`confirmed`/`forfeited`), `finalize_credits()`, `child_setting_versions` + audit (one shared setting per child), backfill from per-parent settings | Issue #32 (pending credits, shared child settings) | Expected | Yes (backfill skips children that already have a shared setting; existing credits stay `confirmed`) | `select column_name from information_schema.columns where table_name='reward_credits' and column_name='status'; select proname from pg_proc where proname='finalize_credits'; select to_regclass('public.child_setting_versions');` |
| 10 | `20261127000000_learning_trials.sql` | `learning_trials` table | Issue #42 (learning dashboard, flag `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`) | **VERIFY.** Its header says it is "NOT applied to production by this PR"; the owner applies it by hand | Yes | `select to_regclass('public.learning_trials');` |
| 11 | `20261128000000_learning_trials_server_only.sql` | Removes client writes to `learning_trials`; adds `server_graded`, `dedupe_key` (anti-forgery) | PR #43 | **VERIFY** (same header note). **Apply together with #10, never #10 alone** | Yes | `select column_name from information_schema.columns where table_name='learning_trials' and column_name in ('server_graded','dedupe_key');` (expect 2 rows) |
| 12 | `20261129000000_exam_attempts.sql` | `exam_attempts`, `exam_answers`, `record_paper_activity()`; re-creates `record_activity()` with one extra rule (a paper counts as one set but never feeds first-set tiers) | Issue #44 / PR #45 (mock exams, flag `NEXT_PUBLIC_MOCK_EXAMS_ENABLED`) | **VERIFY.** Header: apply **before** the code runs with the flag on | Yes | `select to_regclass('public.exam_attempts'), to_regclass('public.exam_answers'); select proname from pg_proc where proname='record_paper_activity';` |
| 13 | `20261130000000_paper_rewards.sql` | Per the issue: paper rewards | **PR #49, not merged** | **Pending.** The file is not on `main`, so I did not read it and cannot state its contents, re-run safety or verify query | Unknown until PR #49 is reviewed | Add the query from that PR's header here when it merges |

Rules for applying:

1. Apply in the table order. Do not skip a number: later files call functions and tables from earlier ones (for example `20261129` re-creates `record_activity()` from `20261125`, and `20261126` drops the 9-argument `award_credit()` created by `20261125`).
2. `20261126` has a **deploy-order rule**: apply it **before** deploying the code that calls the new `award_credit()` signature, `finalize_credits()` and `child_setting_versions` (header of that file). The old code keeps working except that it cannot award credits until the new code is live. Apply it, then deploy.
3. Take a Supabase backup (Dashboard, Database, Backups) before the first manual SQL of a launch day.
4. After applying, run the verify query and write the result in the launch log. Do not edit an already-applied migration file; add a new one.
5. No migration is needed for this checklist PR.

Quick whole-schema check (expect `true` for every row you have applied):

```sql
select t as table_name, to_regclass('public.' || t) is not null as present
from unnest(array['profiles','parent_child','parent_settings','progress_snapshots','daily_activity','alert_log',
  'guardian_invites','wrong_answers','parent_homework','stickers','weekly_reviews','reward_rules','reward_credits',
  'reward_payouts','reward_rule_versions','child_setting_versions','child_setting_audit','learning_trials',
  'exam_attempts','exam_answers']) as t;
```

---

## 2. Environment variables

Names only. Source of the list: every `process.env.*` / `env.*` read in `src/` (searched), cross-checked with `.env.example`. Set them in the **`psle-app-vwx3`** Vercel project (Settings, Environment Variables, Production). Do not set them on `psle-app` (being retired).

`NEXT_PUBLIC_*` values are **inlined at build time** (`src/lib/supabase/config.js`). Changing one in Vercel does nothing until you **redeploy** (build) the project. Server-only names are read at request time, but a redeploy is still the safe way to be sure they are live.

| Name | Side | Required? | Default when unset | Purpose / belongs to | Read in |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SERVER_AUTH` | client + server | Required for **every** server feature | off (`=== "true"` only). App runs on localStorage as before | Master switch: accounts, server save, parent dashboard. All flags below also need it | `src/lib/supabase/config.js` |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Required when server auth is on | none; `serverAuthEnabled()` is false without it | Supabase project URL | `src/lib/supabase/server.js`, `src/app/api/parent/children/link/route.js` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Required when server auth is on | none (same) | Supabase public key (RLS-protected) | same files |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Required when server auth is on | none; `adminClient()` fails without it | Server writes that bypass RLS (all write routes, cron). Never expose to the client | `src/lib/supabase/server.js` |
| `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED` | client + server | Optional | off | Flag: wrong-answer sync | `config.js` |
| `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED` | client + server | Optional | off | Flag: parent homework | `config.js` |
| `NEXT_PUBLIC_REWARDS_ENABLED` | client + server | Optional | off | Flag: stickers, weekly review, credits (including pending credits), payout record | `config.js` |
| `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED` | client + server | Optional | off | Flag: learning dashboards and trial sync | `config.js` |
| `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` | client + server | Optional | off | Flag: past-paper mock exams | `config.js` |
| `CRON_SECRET` | server only | Required for the cron and send-now | none; both return 401 (fail closed) | Vercel sends it as `Authorization: Bearer ...` to `/api/cron/weekly-report`; the owner uses the same header for `/api/cron/weekly-report/send-now` | `src/app/api/cron/weekly-report/*` |
| `ALERT_TEST_RECIPIENTS` | server only | Optional (trial) | unset; see allow-list precedence in section 3 | Comma-separated emails allowed to receive the weekly report. Owner sets the value in Vercel; never commit it | `src/lib/notify/weeklyReport.mjs` |
| `ALERT_ALLOW_ALL_PARENTS` | server only | Launch only | unset (fail closed without an allow-list) | `true` = real sends to every eligible parent when no allow-list is set | `src/lib/notify/weeklyReport.mjs` |
| `EMAIL_ALERTS_ENABLED` | server only | Optional | off; email is rendered and logged as a dry run, never sent | Real email sending switch | `src/lib/notify/email.mjs` |
| `RESEND_API_KEY` | server only | Required to send email | send is skipped | Resend credential | `src/lib/notify/email.mjs` |
| `ALERT_FROM_EMAIL` | server only | Required to send email | send is skipped | Sender address (must be on a Resend-verified domain, see section 3) | `src/lib/notify/email.mjs` |
| `APP_BASE_URL` | server only | Optional | falls back to `https://` + `VERCEL_PROJECT_PRODUCTION_URL`, then `https://psle-app-vwx3.vercel.app` | Dashboard link in emails | `src/lib/dailyAlert.js` |
| `VERCEL_PROJECT_PRODUCTION_URL` | server only | Set by Vercel, do not set by hand | n/a | Fallback for the link above | `src/lib/dailyAlert.js` |
| `ALERT_DRY_RUN_LOG` | server only | Optional, local only | unset (no file written) | File path for dry-run captures (no addresses written). Do not set on Vercel (read-only filesystem) | `src/lib/notify/index.mjs` |
| `ADMIN_PASSWORD` | server only | Required for admin login and `/api/admin/alert-preview` | login returns 500 "not configured" | Admin sign-in | `src/app/api/admin/login/route.js` |
| `ADMIN_SESSION_SECRET` | server only | Required with `ADMIN_PASSWORD` | admin routes fail closed | Signs the admin session cookie | `src/lib/adminSession.js` |
| `ANTHROPIC_API_KEY` | server only | Optional (content generator only) | route returns 500 | `/api/generate` (admin only); not used by students | `src/app/api/generate/route.js` |
| `WHATSAPP_ENABLED` | server only | **Leave unset / not `true`** | off | WhatsApp master switch. Keep off (section 3) | `src/lib/notify/whatsapp.mjs` |
| `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANG`, `WHATSAPP_API_VERSION` | server only | **Do not set for launch** | template lang `en`, API `v21.0` | WhatsApp provider settings, unused while the channel is off | `src/lib/notify/whatsapp.mjs` |

Notes:

- `CLAUDE.md` section 3 and `HANDOFF_MASTER.md` mention `GENERATE_ROUTE_TOKEN`. **The code no longer reads it** (searched `src/`); `/api/generate` now uses the admin session. Do not rely on that variable.
- Hard-coded seed credentials still exist in client code (`CLAUDE.md` section 3 / roadmap #2). That is outside this checklist; do not announce the app to new families until the owner has decided on it.
- `.env.example` lists names only. Check it matches this table when you add a variable.
- To check the Vercel side without exposing values: Vercel project `psle-app-vwx3`, Settings, Environment Variables. The list should show each **Required** name above for Production, and none of the `WHATSAPP_*` names set to `true`.

---

## 3. Resend / email setup

**The daily 20:00 parent email no longer exists (issue #55).** It is replaced by a **weekly report email**. What the code does (`src/lib/notify/weeklyReport.mjs`, `src/lib/notify/emailTemplate.mjs`, `src/app/api/cron/weekly-report/*`, `vercel.json`):

- **Content** (past week Mon..Sun, SGT, per child): daily-set completion per subject vs target (sets, and days the target was met), questions/accuracy/minutes, wrong-answer causes, homework solved vs not done, credits (confirmed / pending / forfeited, S$ for confirmed), and the week's mock exam / past-paper results. Wrong-answer causes come from `wrong_answers.cause`, which only exists once the student or parent tags it. If nothing is tagged the email says so ("not guessing a pattern"); if nothing was recorded on the server it says that. Causes are never inferred.
- **Primary send is event-triggered, on Saturday (SGT):** right after the child finishes the Saturday **weekly review** (`/api/student/rewards/weekly`) **or** hands in a **past paper / mock test** (`/api/student/exam`), whichever comes first. One report per parent per SGT week: `alert_log` is claimed with `date` = Monday of the week and `channel` = `email_weekly`, so the second Saturday activity, the fallback and retries do not send again. Off Saturday the event does nothing. (The weekly review is per subject, so the first subject finished triggers the report; credits still pending at that moment show as pending.)
- **Fallback (cron, one rule):** the single Hobby cron runs daily at `0 13 * * *` UTC = **21:00 SGT** on `/api/cron/weekly-report`. It sends the weekly report only on **Saturday from 21:00 SGT** (nobody triggered it that day) and again on **Sunday** as a catch-up if Saturday's run failed (an `error` claim may be retried; a `sent` claim never is). Every other day it no-ops. The "Sunday morning" variant is **not** possible with one daily cron (it has one fixed run time), so the Sunday catch-up runs at 21:00 SGT. Hobby crons may fire anywhere inside the scheduled hour; the rule only needs the hour to be >= 21. **Cron is fallback-only**; the happy path never waits for it. The same cron still runs `finalizeCredits` daily, independent of the email flag.
- A real email needs `EMAIL_ALERTS_ENABLED=true` **and** `RESEND_API_KEY` **and** `ALERT_FROM_EMAIL`, a **confirmed** Supabase email, an enabled email channel and at least one linked child.

### Recipient allow-list (trial safety). Names only; the owner sets values in Vercel project `psle-app-vwx3`

Precedence, first match wins (`sendPolicy` / `recipientDecision`):

1. `EMAIL_ALERTS_ENABLED` is not `true`: **nothing is sent** (render + log only, no `alert_log` row, so enabling later still sends that week).
2. `ALERT_TEST_RECIPIENTS` is **set** (comma-separated emails): send **only** to those addresses (case-insensitive, matched against the address the parent's email channel uses). A set-but-empty value means nobody (fail closed). Applies to the event send, the cron fallback and send-now. Everyone else is skipped and logged as counts / parent ids (never addresses) and gets no claim, so a later list change can still send.
3. List **unset** and `ALERT_ALLOW_ALL_PARENTS=true`: every eligible parent (launch mode, only set this deliberately).
4. List unset, no `ALERT_ALLOW_ALL_PARENTS`: **nobody** (fail closed). Setting `EMAIL_ALERTS_ENABLED=true` alone can no longer email everyone.

Not covered: the co-parent "setting changed" notice (`notifyCoParents`) still follows `EMAIL_ALERTS_ENABLED` only.

### Setup steps

1. In Resend, add the sending domain and publish the DNS records Resend shows (SPF, DKIM, and DMARC if you use it). Wait until the domain shows **Verified**.
2. Create an API key in Resend with sending access only. Put it in `psle-app-vwx3` as `RESEND_API_KEY`. Do not paste it anywhere else.
3. Set `ALERT_FROM_EMAIL` to an address **on the verified domain** (name only here; choose it in Resend).
4. Set `CRON_SECRET` to a long random string (generate it yourself; never reuse another secret) on `psle-app-vwx3`. Confirm the cron appears in Vercel, Settings, Cron Jobs, as `/api/cron/weekly-report` with schedule `0 13 * * *`.
5. Set `APP_BASE_URL` to the live site origin so email links point at `psle-app-vwx3`.
6. Leave `EMAIL_ALERTS_ENABLED` **unset** and redeploy. For the trial set `ALERT_TEST_RECIPIENTS` first (names only in the repo), then enable the flag after "Test to one parent" passes.
7. **Keep WhatsApp off.** Do not set `WHATSAPP_ENABLED`. Parents can store a WhatsApp number (`src/app/api/parent/settings/route.js` says it is "stored even while WHATSAPP_ENABLED is off") but nothing is sent. `src/lib/notify/whatsapp.mjs` sends only if `WHATSAPP_ENABLED=true` and the provider variables are present.

### Dry run (no email leaves the system)

- **Preview one parent:** sign in as admin (`POST /api/admin/login`), then `GET /api/admin/alert-preview?email=<parent email>`. It renders **this week's weekly report** for that parent, never sends and never writes `alert_log`. The response also says whether the address would be allowed under the current allow-list policy.
- **Send-now dry run (default):** `POST /api/cron/weekly-report/send-now` with `Authorization: Bearer $CRON_SECRET` and JSON body `{"parentId":"<uuid>"}` (or `{"email":"..."}`; in the body so it stays out of URL logs). `dryRun` defaults to **true**: it renders and logs, sends nothing, writes **no** `alert_log` row, so the real Saturday send is unaffected. Fails closed with 401 if `CRON_SECRET` is missing or wrong, 404 if server auth is off.
- **Cron dry run:** with `EMAIL_ALERTS_ENABLED` unset, call `GET /api/cron/weekly-report` (Bearer header from your own shell; do not paste the secret into a ticket). It does nothing outside the fallback window (`summary.noop: true`).
- Local capture: `ALERT_DRY_RUN_LOG` (local runs only).

### Test to one parent, safely (now supported)

1. Set `ALERT_TEST_RECIPIENTS` to the owner's own test address(es) and `EMAIL_ALERTS_ENABLED=true`; redeploy.
2. `POST /api/cron/weekly-report/send-now` with `{"parentId":"<uuid>","dryRun":false}`. A real trial needs the allow-list to be set and the parent's address on it (else `skipped`). It is logged in `alert_log` under channel `email_weekly_trial`, so it never uses up the week's real claim; repeat it as often as needed.
3. While the list is set, Saturday events and the cron fallback also reach only listed addresses. To go live: unset `ALERT_TEST_RECIPIENTS` **and** set `ALERT_ALLOW_ALL_PARENTS=true`.

After a real run check `select parent_id, date, channel, status, detail from alert_log order by created_at desc limit 20;` (expect `sent`; `detail` is a short provider status), the Resend dashboard for bounces, and that links open `psle-app-vwx3`. No SQL migration is needed (`alert_log.channel` is free text and `date` holds the Monday of the week).

**Roll back email:** unset `EMAIL_ALERTS_ENABLED` and redeploy. Nothing is deleted; `alert_log` keeps its history and the weekly report returns to dry-run behaviour.

---

## 4. Flag turn-on order

Every flag below defaults to **off** (`src/lib/supabase/config.js`). Turn on **one at a time**, in this order, on `psle-app-vwx3`, then **redeploy** (they are build-time values), then run the smoke test as a student and as a parent. Stop at the first failure and roll that flag back.

General rollback for every `NEXT_PUBLIC_*` flag: set it to anything other than `true` (or remove it) and redeploy. This hides the feature and its routes return 404; **no table, row or `genius_*` localStorage key is touched.** Server data stays in Supabase and reappears when the flag is turned back on. Do not run `drop`/`delete` SQL as a rollback.

Do the smoke tests with **test accounts** (one parent, one linked student), never a real family's account.

### 0. `NEXT_PUBLIC_SERVER_AUTH` (server save, accounts, parent dashboard)

- Depends on: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`; SQL 1 to 4. Backup taken.
- Student smoke test: log in with the test username; do one daily set; refresh; progress is still there. Existing local accounts and history still open.
- Parent smoke test: sign up or log in; link the test child; the parent dashboard shows today's activity (`/api/parent/today`).
- Check in SQL: a `daily_activity` row exists for the test child for today (SGT).
- Roll back: unset, redeploy. The browser returns to localStorage-only mode. **Caution (read, not tested):** accounts created while it was on exist only in Supabase, so those students cannot log in locally until it is turned back on. Do not turn this on and off repeatedly once real families have signed up.
- Local data: the one-time import only reads `genius_*` keys and writes the `genius_server_import_v1` marker (`src/lib/serverClient.js`); it never deletes them.

### 1. `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`

- Depends on: flag 0; SQL 5.
- Student: answer one item wrong; it appears in the wrong-answer notebook; refresh, still there.
- Parent: the child's mistakes appear (`/api/parent/wrong-answers`).
- SQL: `select count(*) from wrong_answers where student_id = '<test child id>';` is at least 1.
- Roll back: unset and redeploy. The local notebook (`genius_progress_v2` mistakes) is unaffected.

### 2. `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`

- Depends on: flags 0 and 1; SQL 5, 6 and 8 (the daily homework count lives in 8).
- Parent: assign homework from one mistake; the number matches the child's `homework_per_mistake` (default 3); the daily cap of 10 holds.
- Student: the homework shows, can be answered, and does **not** change normal mastery (`src/lib/homeworkMastery.js`; `tools/homework_mastery_selftest.mjs`).
- Roll back: unset and redeploy. Assigned rows stay in `parent_homework`.
- Turn this on **before** rewards: rewards read homework state to decide whether a credit is confirmed (`src/lib/rewardsServer.js`).

### 3. `NEXT_PUBLIC_REWARDS_ENABLED` (stickers, weekly review, pending credits)

There is **no separate flag for pending credits**. They ship inside rewards (migration 9, `finalize_credits`, and the cron).

- Depends on: flags 0 and 2; SQL 2, 6, 7, 8 and **9** (applied before the code that needs it); `CRON_SECRET` set so the cron can settle credits.
- Parent: set a reward rule for the test child. Confirm it is **record only**: the app never moves money (`supabase/migrations/20261124000000_rewards.sql` header).
- Student: meet the daily target; a sticker appears (`/api/student/rewards`); a credit is created as `pending`. On Saturday (SGT) the weekly review is available (`/api/student/rewards/weekly`).
- Parent: the pending credit shows. Finish that day's homework; after the 21:00 SGT cron (or a manual trigger), the credit becomes `confirmed`. Unfinished homework becomes `forfeited` and is kept, never deleted.
- SQL: `select status, count(*) from reward_credits group by 1;`
- Roll back: unset and redeploy. Stickers, credits and payouts stay in their tables. The cron still runs `finalizeCredits`; that is harmless and idempotent.

### 4. `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`

- Depends on: flag 0; SQL 10 **and** 11 together (without 11, students could forge trials).
- Student: finish a set; the learning dashboard shows skills and error patterns (read-only).
- Parent: the child's learning view loads (`/api/parent/learning`); rows have `server_graded = true`.
- SQL: `select count(*), bool_and(server_graded) from learning_trials where student_id = '<test child id>';`
- Roll back: unset and redeploy. Trials stay; local `trials[]` and `skillLedger` are untouched.

### 5. `NEXT_PUBLIC_MOCK_EXAMS_ENABLED`

- Depends on: flag 0; SQL 12 applied **before** this flag. Read section 5 below first: some paper items are not answerable yet.
- Student: pick a full paper from the picker (English, 45 marks or more); start, answer, submit; a score appears; it counts as **one** set for the daily target.
- Parent: the paper result appears (`/api/parent/exam`) and in the weekly report's paper section (`src/lib/notify/weeklyReport.mjs` `summariseChild`).
- SQL: `select status, score, total from exam_attempts order by started_at desc limit 5;`
- Roll back: unset and redeploy. Attempts and answers stay in `exam_attempts` / `exam_answers`.
- PR #49 (`20261130000000_paper_rewards.sql`, grading exclusion for MCQ items without options) is **not merged**. Do not describe paper rewards as live until it is merged, its migration is applied and it has its own entry here.

### 6. `EMAIL_ALERTS_ENABLED` (weekly parent report; server env, not a build flag)

- Depends on: flag 0; SQL 1 to 4; everything in section 3, including a verified domain and the one-parent test.
- Parent smoke test: use send-now (section 3) or finish the Saturday weekly review; the weekly email arrives once, from the verified sender, shows the right child, subjects, sets, causes (or the honest fallback), homework, credits and (if mock exams are on) papers, and links to the live site. Keep `ALERT_TEST_RECIPIENTS` set until the owner is happy.
- Roll back: unset and redeploy (no data lost).
- `WHATSAPP_ENABLED` stays off throughout.

Not flags, but part of the launch: shared child settings (`/api/parent/child-settings`, SQL 9) and the daily target (`/api/student/daily-target`) need only flag 0. A change in a shared setting emails the other linked parents, behind `EMAIL_ALERTS_ENABLED` (dry run otherwise).

---

## 5. Known data caveats (from `docs/data-audit-papers-mcq-2026-11-20.md`, PR #51)

Read that report for the numbers and method. What matters at launch:

1. **Items with no options are always scored wrong on `main`.** 1,038 items in a GrammarMCQ or VocabMCQ section have fewer than 2 options; 901 of them are in the 57 papers the mock picker offers. `gradeSubmission` marks all 901 as auto-graded, so a student can only get them wrong (audit section 0, 2.2). Only 105 are real MCQs whose options were lost (an object map the parser ignores); the rest are cloze, editing, comprehension and synthesis items routed into an MCQ bucket.
   - **Launch implication:** do not turn on `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` for real students on `main` as it stands. Scores and the daily email would be wrong and could discourage children. Either merge PR #49 first (it excludes these items from the score on the mock route, audit section 6) or keep mock exams off.
   - PR #49 does **not** cover the practice/learning route (`resolveItem` in `src/lib/learningGrade.js`), which I only read in the audit. The learning dashboard may count those items as wrong. Check this before turning on flag 4, or tell the owner it is a known gap.
   - The proper fixes (M1 parse option maps, M2 reclassify cloze/editing/comprehension) are separate code PRs and not part of launch.
2. **Flagged papers stay in** (owner decision). 5 offered papers carry a neutral note: 3 with `year_mismatch` and 2 with `duplicate_suspect` (`paperFlags` in `src/lib/examEngine.js`). Expect a child to possibly sit a duplicate twice and a school/year label to be off for those.
3. **Three Chinese papers have a derived answer key** (`key_estimated`). Chinese papers are not offered in mock exams, so this does not affect launch.
4. **Mock exams are English-only and full papers only** (45 marks or more): 57 of 114 English papers. Short WA papers and all Chinese papers are excluded by design (`isFullPaper`, `FULL_PAPER_MIN_MARKS`).
5. **Page-level defects are not measured** (the manifest has no page data). The audit leaves this as a TODO for the owner.

---

## 6. Morning of launch (one page)

Use a test parent and a linked test student. Record the time and result next to each line.

**Before touching anything**
- [ ] Vercel project is **`psle-app-vwx3`** (not `psle-app`) on every screen you edit.
- [ ] Supabase backup taken (Dashboard, Database, Backups). Time: ____
- [ ] `main` is green: latest Vercel production build succeeded.
- [ ] Nobody (including you) has pasted a secret value into chat, an issue or a PR.

**SQL**
- [ ] Applied migrations 1 to 9, in order; whole-schema query (section 1) shows `true` for each.
- [ ] If flag 4 is planned: migrations 10 **and** 11 applied together.
- [ ] If flag 5 is planned: migration 12 applied. PR #49 decision made (merged, or mock exams stay off).
- [ ] `20261130000000_paper_rewards.sql` is **not** applied unless PR #49 is merged and reviewed.

**Environment (names present in `psle-app-vwx3`, Production; never read values aloud)**
- [ ] `NEXT_PUBLIC_SERVER_AUTH`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `CRON_SECRET`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `APP_BASE_URL`
- [ ] `RESEND_API_KEY`, `ALERT_FROM_EMAIL` set; Resend domain shows **Verified**
- [ ] `EMAIL_ALERTS_ENABLED` still **unset**; `WHATSAPP_*` not set
- [ ] Cron Jobs page shows `/api/cron/weekly-report` at `0 13 * * *` (= 21:00 SGT, fallback only)
- [ ] `ALERT_TEST_RECIPIENTS` set to the owner's test address(es) (value in Vercel only) until launch

**Turn on, one at a time (redeploy after each; smoke test as student and parent; stop on first failure)**
- [ ] 0. `NEXT_PUBLIC_SERVER_AUTH`
- [ ] 1. `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED`
- [ ] 2. `NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED`
- [ ] 3. `NEXT_PUBLIC_REWARDS_ENABLED`
- [ ] 4. `NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED`
- [ ] 5. `NEXT_PUBLIC_MOCK_EXAMS_ENABLED` (only after the PR #49 decision)
- [ ] 6. Admin alert preview for the test parent looks right (no send), then `EMAIL_ALERTS_ENABLED` with `ALERT_TEST_RECIPIENTS` per section 3

**Regression check on every deploy**
- [ ] An existing local account still logs in and its history is still there (`genius_users_v2`, `genius_progress_v2` untouched).
- [ ] Student: a daily set saves and survives a refresh.
- [ ] Parent: dashboard loads; no console errors.

**After the Saturday report / 21:00 SGT fallback**
- [ ] Cron run in Vercel logs shows 200 (`summary.noop: true` on any day except Saturday 21:00+ and Sunday).
- [ ] `alert_log` rows say `sent` (or `dryRun` if the email flag is still off).
- [ ] The test parent received one email, link opens `psle-app-vwx3`.

**If anything looks wrong:** set the last flag you turned on to anything but `true`, redeploy, tell the owner. Do not delete tables, rows or `genius_*` data.
