# E2E report: mock exams phase 2 (PR #49)

Updated after a real run (Node v22.23.4, GitHub Action runner, fake Supabase placeholders only, never production).

## 1. Actually executed (real runs)
| # | Command | Result |
|---|---|---|
| 1 | `node --version && npm ci` | PASS: v22.23.4, 60 packages installed |
| 2 | `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321 NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy npm run build` | PASS: compiled, all routes listed |
| 3 | `npm run typecheck` | PASS: `tsc --noEmit` no errors |
| 4 | `node tools/exam_selftest.mjs` | **First run FAIL**, now PASS: `57 checks run, all passed` (see fixes below) |
| 5 | `node tools/child_settings_selftest.mjs` | PASS: `ALL PASS` |
| 6 | `node tools/daily_target_selftest.mjs` | PASS: `ALL PASS` |
| 7 | `node tools/homework_mastery_selftest.mjs` | PASS: `ALL PASS` |
| 8 | `node tools/notify_selftest.mjs` | PASS: `ALL PASS (5 checks)` |
| 9 | `node tools/pending_credits_selftest.mjs` | PASS: `ALL PASS` |
| 10 | `node tools/rewards_tiers_selftest.mjs` | PASS: `ALL PASS` |
| 11 | `npx tsx tools/learning_grade_selftest.mjs` | PASS: `ALL PASS` |
| 12 | `npx playwright test tests/e2e/mock.spec.js` | **NOT RUN (UNVERIFIED)**: needs a local Supabase in Docker and a browser (`assertLocalOnly`); not attempted here |

Only the Node `MODULE_TYPELESS_PACKAGE_JSON` warning appears (harmless).

### Failures found by the first real run, and fixes (test code only, no product code changed)
1. `exam_selftest.mjs:557` redeclared `const SAT` (SyntaxError, whole file did not load). Removed the duplicate (same value).
2. Two tests predated the MCQ-without-options exclusion: the grading test expected the key for excluded items to grade right (21/37), and the review test compared the item count with the live count. They now skip items with no options and compare `count + excluded` with the row count.

## 2. Scenario table (real run where the self-test covers it)
The role-play block in `tools/exam_selftest.mjs` runs the real `route.js`, `examPostSubmit.js` and `rewardsServer.js` against an in-memory fake database. Rows backed by it are PASS (fake DB, not a real Supabase).

| # | Scenario | Result | Basis |
|---|---|---|---|
| 1 | Build, typecheck, all selftests | PASS | section 1 |
| 2 | Wrong items to notebook, cap 20, 6 cause labels | PASS (fake DB) | exam_selftest role-play |
| 3 | Review only after submit: 409 in progress, 404 other student, no keys before submit | PASS (fake DB) | exam_selftest |
| 4 | Expired attempt auto-submits (GET, start, late submit), no 500; unreadable draft = 503 | PASS (fake DB) | exam_selftest |
| 5 | MCQ without options not counted | PASS | exam_selftest on real papers |
| 6 | Saturday reward: pending, once per subject per Saturday, effort check on/off, default nothing | PASS (fake DB) | exam_selftest |
| 7 | Pending -> confirmed/forfeited after homework | UNVERIFIED | SQL `finalize_credits`; asserted statically only, needs a database |
| 8 | Wallet credit/SGD totals, both parents | PARTLY: `creditTotals` and by-child read tested; real routes UNVERIFIED | needs database |
| 9 | Settings saved with flag off keep paper settings | PASS (fake DB) | exam_selftest |
| 10 | Mastery counts first sitting only | PASS (fake DB) | exam_selftest; real unique index UNVERIFIED |
| 11 | 8pm email block | PASS (`paperBlock`); dry-run endpoint UNVERIFIED | exam_selftest, notify_selftest |
| 12 | Parent dashboard / notebook UI / browser flow | UNVERIFIED | needs a browser and local Supabase |
| 13 | Flags default off, no new migration, no workflow or `genius_*` change | PASS | diff review |

Earlier code-trace evidence (file:line) for these rows is in the git history of this file (commit c99255d).

## 3. Still UNVERIFIED and why
- Playwright flow, parent dashboard UI, `ParentExams`, rewards tab, notebook tab: need browser + local Supabase.
- SQL behaviour (`finalize_credits`, unique indexes, migration 20261130): need a Postgres.

## 4. Owner commands
Same as section 1. For the browser flow: `npx playwright test tests/e2e/mock.spec.js` with local Supabase (see its header). Apply `supabase/migrations/20261130000000_paper_rewards.sql` by hand before turning the mock flag on.
