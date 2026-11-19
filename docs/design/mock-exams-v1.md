# Mock exams from real past papers — design v1

**Status: DRAFT for owner review (issue #37). Design only: no app code, data, scripts or migrations are changed by this PR.**
Roadmap step 5 in `CLAUDE.md` §9. Builds on the shipped notebook (step 4), homework (step 8) and rewards (step 9).

Constraints that apply to everything below:

- Student-facing text is English. No Korean. (Chinese papers keep their own Chinese exam screens per `ZH_EXPANSION_RULES.md`; see decision 1.)
- Existing student data is never touched. The `genius_*` localStorage keys keep their shape. Any new local state uses a **new** key and is additive.
- No secrets in the repo. No new env var holds a credential; the only new env var is a public on/off flag.
- Everything ships behind a new flag that is **OFF by default**. With it off the app behaves exactly as today.

---

## 1. Inventory of past-paper data in the repo

Counts below are from reading the files under `src/data/p3/*/papers/` on `main`. "Marks" is the `totalMarks` the file declares. **Not verified:** question-level completeness of each file (I did not run a per-paper validator; none exists for past papers). Treat every row as "present", not "audited".

### 1.1 English (Primary 3) — 114 files

By bucket: WA1 25 files (one is the test fixture `test_comprehension_8types_golden.ts`, not a real paper), WA2 23, WA3 8, EOY 58 (includes a duplicate-named `eoy_henrypark_p2_2025 (2).ts`). All are re-exported by `src/data/p3/english/papers/index.ts` as `allP3EnglishPapers`, normalised to `{ meta, questions }`.

School, year and (marks) per bucket, taken from each file's declared `school` / `year` / `totalMarks`:

| School | WA1 | WA2 | WA3 | EOY |
|---|---|---|---|---|
| ACS (Junior) | — | — | — | 2022 (10); 2022 (16); 2022 (34) |
| ACS (Primary) | 2023 (20) | — | — | 2022 (20); 2022 (30); 2023 (20); 2023 (30) |
| Ai Tong | — | — | — | 2020 (50); 2025 (50) |
| CHIJ St Nicholas Girls | 2023 (28) | 2025 (28) | 2025 (28) | 2023 (50); 2024 (50); 2025 (50) |
| CHIJ Toa Payoh | — | — | — | 2022 (50) |
| Catholic High (Primary) | 2022 (30); 2023 (30); 2023 (50) x2 | 2023 (50) x2 | 2023 (50) | 2022 (30); 2022 (50); 2024 (50); 2025 (50) x2 |
| Henry Park | 2023, 2024, 2025 (20 each) | 2023 (50); 2024 (20) | 2023 (50) | 2023, 2024, 2025 (50 each) |
| Maha Bodhi | 2023, 2024, 2025 (30 each) | 2024, 2025 (30 each) | — | 2023 (20); 2023 (30); 2024 (50) |
| Methodist Girls' | — | 2022 (25); 2023 (15); 2024 (12); 2025 (25) | — | 2022 (50); 2023 (14, 16, 20); 2024 (50); 2025 (50) |
| Nan Hua | 2023 (50) | — | 2023 (20); 2025 (20) | 2023 (50); 2024 (50) |
| Nanyang | 2022–2025 (20 each) | 2022, 2023 (20); 2024 (20) x3; 2025 (20) | — | 2022 (50); 2024 (50); 2025 (50) |
| Paya Lebar Methodist Girls | — | — | — | 2024 (50) |
| Pei Chun | 2023 (20) | — | — | — |
| Pei Hwa | — | — | 2023 (30) | 2022 (50); 2023 (50) |
| Raffles Girls' | 2023, 2024, 2025 (15 each) | 2023 (50); 2024 (15) | — | 2023 (50); 2024 (50); 2025 (50) x2 |
| Red Swastika | — | — | — | 2022 (50); 2023 (50) |
| Rosyth | 2023 (35) | 2024 (35) | — | 2022 (50); 2024 (50) |
| Rulang | 2024 (20) | 2024 (25) | — | 2024 (55) |
| SCGS | — | — | — | 2022, 2023, 2024 (50 each) |
| St Hilda's | — | 2024 (26) | 2024 (26) | 2024 (50) |
| St Joseph's | — | — | — | 2023 (50) |
| Tao Nan | 2025 (50) | 2023 (50) | 2023 (50) | 2023 (50); 2024 (50); 2025 (50) x3 |

Reading the table:

- **Papers declaring ≥ 45 marks: 56** (of 112 files that declare `totalMarks`; excludes the golden fixture and the `(2)` file). These are the candidates for a timed "full paper" mock. 12–35-mark WA papers are usable as short mocks.
- Several "50" rows are school-published **practice papers** (Catholic High, Henry Park, Tao Nan) filed under WA1/WA2/WA3/EOY by whoever authored the file. The bucket is not a reliable exam type.
- 22 distinct schools (after merging spelling variants such as "Catholic High Primary School" / "Catholic High School (Primary)"); coverage is uneven: Nanyang, Catholic High, Henry Park, Tao Nan, Maha Bodhi and Methodist Girls' have the most.

**Data defects that block a trustworthy mock (must be fixed in the manifest, not in the paper files):**

1. **Filename year ≠ declared year** in many EOY files, e.g. `eoy_nanyang_p2_2025.ts` declares `year: 2024` and its header says "End-of-Year 2024"; `eoy_scgs_p2_2025.ts` declares 2023. The mock UI must use the declared year, never the filename.
2. **Three shapes of metadata**: `ExamPaper` objects with `sections[]` and `duration: '1h 15min'` (string); `meta` + `questions[]` with `timeMinutes: 45` (number, WA2 MGS); and files with neither. Duration is missing or inconsistent for many papers.
3. **Possible duplicates**: `eoy_henrypark_p2_2025.ts` vs `eoy_henrypark_p2_2025 (2).ts` (filename contains a space and `(2)`), and `eoy_henrypark_paper2_2025.ts` whose header says "2023 Timed Practice Paper 2" but declares 2025. Duplicate or near-duplicate papers would let a child "sit" the same paper twice. **TODO** compare contents.
4. **Mixed `kind` / `type` / `topic` question schemas** across files (`kind: "A"`, `type: 'A'`, `topic: 'GrammarMCQ'`). `src/lib/p3PaperBridge.js` already adapts these for the daily-session path; the exam path should reuse that adapter rather than add another.
5. **Paper-level ids** are stable only where `unresolvedDuplicateIds` in `src/data/taxonomy/paperTags.json` does not list them (sixteen Chinese ids; see `docs/taxonomy.md`). Do not rename ids; attempts store the id.
6. **Listening, oral and composition sections** are not in the data (Chinese files state it explicitly: "Listening … and Composition … excluded per project rules"). For English I did not verify; **TODO** confirm which English paper components exist per file. A "full paper" here means *the written, auto-gradable sections that exist*, and the UI must say so.
7. Past papers are **not generated** files; they are hand/OCR-authored (`CLAUDE.md` §4 TODO). They stay untouched in this work.

Taxonomy coverage: `paperTags.json` tags 4,666 past-paper items (English: eoy 2,259; wa1 223; wa2 264; wa3 248; other 368 — Chinese: eoy 490; wa1 199; wa2 403; wa3 212). Roughly 30% are `uncertain`. That is what makes "similar question" lookup work for notebook entries from papers; the mock must tolerate uncertain tags (the existing rule: leaf skill or trap ids still match).

### 1.2 Chinese (Primary 3, Higher Chinese) — 50 files

WA1 7, WA2 17, WA3 8, EOY 18 (`index.ts` files excluded). Most Chinese files **do not declare `school` or `year` as fields**; the school is in a header comment or the filename (e.g. Tao Nan 2023/2024, Nan Hua 2021/2025, Nanyang 2024/2025, Pei Hwa 2024, Pei Chun 2021/2025, Red Swastika, CHIJ St Nicholas, Maha Bodhi, Catholic High, Ai Tong, Gong Jiao, Bodhi/Puti). Marks are 14–56 (45 for typical Paper 2). Producing a reliable school/year/paper table needs a manifest build step (phase 0) — I have not hand-transcribed it here to avoid guessing. Duplicates are likely (e.g. three Tao Nan supplementary/WA3 files with 37 ids each, three `wa1_tao_nan_*` files with 39 ids each). **TODO** confirm.

### 1.3 Other subjects

- **Math / Science**: no past-paper data under `src/data/p3/`. `src/data/p3/backup/math_science_backup.json` holds `MATH_QB` and `MATH_PAST_PAPER` (a few entries, shape not audited) and `SCIENCE_QB: null`. Math and Science are "Coming Soon" and out of scope for the taxonomy. **No mock exams for Math/Science in v1.**
- **P4–P6**: no past papers. v1 is P3 only.

### 1.4 Gaps that matter for the product

| Gap | Effect | Proposed handling |
|---|---|---|
| No paper manifest (school, declared year, term/type, marks, minutes, section list, question count, has-answer-key) | Cannot list, pick, time or de-duplicate papers | Build one (phase 0), generated from the files, committed with its generator; never hand-edited |
| Only some papers have a duration | Cannot time them | Manifest fills `minutes` from the file, else from owner-confirmed rule (decision 3) |
| Few real PSLE-style P3 mocks of the child's own school | "Own school first" often falls back | Fall back to other schools; label clearly |
| P3 only; one paper per school-year-term | A child exhausts papers in months | See decision 5 (reuse policy) |
| No Math/Science | Out of scope | — |

---

## 2. Exam mode

A new session type, `paper`, next to the existing daily-set flow. It does not change `isMockDue` (the every-10th-session WA1-style mock). That mock stays as is; v1 adds real past papers as a separate, parent- or Saturday-triggered activity.

### 2.1 Paper selection
- Candidates come from the manifest, filtered to `has_answer_key` and a **complete** section list.
- Order of preference: child's own school (profile `school`, reusing `schoolMatches` from `p3PaperBridge.js`) → same exam type as the next real exam if the exam calendar exists (roadmap #6; until then, none) → any school.
- **Never serve a paper the child has already submitted** (server: `exam_attempts`; local fallback: new key `genius_exam_attempts_v1`, additive) until the pool is exhausted; then oldest-first (decision 5).
- A parent may pin a paper from the parent view (phase 4).

### 2.2 Timed full paper
- Duration = manifest `minutes` (the paper's printed time). Fallback rule in decision 3.
- The timer starts on **Start**, not on page load, and runs on a wall-clock deadline (`startedAt + minutes`) so a refresh, tab switch or sleeping device cannot extend it. In-progress state is saved under a **new** local key `genius_exam_inprogress_v1` (answers, current section, deadline). The existing `genius_*` keys are not read for this and not written to.
- **No pause.** If the page is closed, the deadline keeps running; reopening resumes while time remains and auto-submits if expired.
- Warnings at 10 minutes and 1 minute left (visual only, no sound).
- At 0:00 the paper **auto-submits** with whatever is answered; unanswered items are marked `unanswered`.
- Optional "stop early" button with a confirm dialog; submits.

### 2.3 Section order and navigation
- Sections are presented **in the order printed on the paper** (`sections[]` order, else the order of first appearance of each `topic` in `questions[]`).
- Free movement inside the paper, as in a real booklet: a section index to jump between sections, a "flag for later" mark, and an end-of-paper "unanswered / flagged" check screen before submit. (Alternative in decision 4.)
- Passage/cloze/comprehension items stay grouped with their passage.
- Auto-grading covers the objective item types the engine already grades. Open-ended, synthesis and sentence-crafting items are **not auto-graded** (same rule as review rounds, `CLAUDE.md` §6): shown after submit with the model answer, self-marked by the child or parent (decision 6), and excluded from the auto score.

### 2.4 No hints during the exam
- No `retry_hint`, no second attempt, no per-item right/wrong feedback, no explanations, no word popups/translate, no answer reveal, no running score. One attempt per item; the answer is locked on submit of the paper (editable until then).
- Consequence: every correct answer is first-try and unhinted; there is no "solved after hint" state in exam mode. The anti-guess rule (`antiGuess.js` / `sessionUtils.guessFlag`) is not applied during the exam, since timing is part of the exam; guess-flagging is not used to lower the score (consistent with its locked principle).
- Read-aloud or tap-to-hear features are disabled for the same reason (an exam has no helper).

### 2.5 Review afterwards
Shown only after submit, as a separate screen:
1. Score, per-section score and per-section time, unanswered count, time used.
2. Every wrong, unanswered and not-auto-graded item, one at a time, with the correct answer, the paper's own `solution` (method / steps / tip), and the three-layer explanation where we have one. Hints are not needed here.
3. For each wrong or unanswered item the child picks a **cause** (the six existing causes in `docs/taxonomy.md`). `Ran out of time` is **pre-suggested** for items left unanswered at auto-submit; the child can change it. Cause picking is allowed to be skipped; a skipped cause stays `NULL`, exactly as today.
4. A button to "Add to notebook" is not needed: all wrong items enter the notebook automatically (§3).

---

## 3. How results feed the existing learning system

Principle: **reuse the shipped paths; add no new mastery rules.** Product-locked constants in `trialLedger.js`, `tickets.js`, `scheduler.js` and `antiGuess.js` are not changed.

### 3.1 Wrong-answer notebook
- On submit, each wrong item (and each unanswered item) is written to the notebook through the same function that daily sets use, with `source_id = <paper id>` and `attempt_key = 'exam-<attempt id>'`. The server table already supports this: `wrong_answers` has `source_id`, `taxonomy_ids`, and a unique key `(student_id, subject, question_id, attempt_key)`, so a retake of the same paper never duplicates a row.
- Local mode: the item is appended to `progress.history[]` / `mistakes[]` in the existing shape (additive fields only, e.g. `sourceKind: 'paper'`, `paperId`). Old rows are unchanged and readers must tolerate their absence.
- The notebook UI shows the paper (school, year, type) as the source, like it already shows the set number.

### 3.2 Cause labels
- Same six values (`concept_unknown`, `misread`, `calculation`, `trap`, `time`, `guessed`) stored in `wrong_answers.cause`. The parent sees the same English labels.
- Mock-specific addition: `time` is pre-suggested for unanswered items (§2.5). No new cause values, so the existing CHECK constraint is untouched.

### 3.3 Mastery
Exam answers are **mock-mode** trials (`TRIAL_MODE.MOCK`, which already counts toward KPI and mastery and already exists in `trialLedger.js`). Rules for how a paper result may count:

| Situation | Counts toward mastery? |
|---|---|
| First sitting of a paper: each auto-graded item | Yes, as `mock`, full weight (first-try by construction) |
| **Redoing the same question** (a retake of the same paper, or re-solving it from the notebook) | **No.** It only resolves the notebook entry. This is the existing rule in `homeworkMastery.js` (`same-question`) |
| An **unseen similar question** (different item, same leaf skill, not in `seenItemIds`) answered **at least 1 SGT day after** the original mistake | **Yes, at half weight (0.5)**, right or wrong, via the existing `homeworkMasteryWeight` / `qualifyingHomeworkResults` |
| Anything on the same day as the mistake, or an item already seen | No |

Implementation reuses `HOMEWORK_WEIGHT` (0.5) and `HOMEWORK_MIN_DAYS_AFTER` (1) rather than duplicating them. A retake of a whole paper after the cooldown is therefore *not* mastery evidence for items already seen; the only mastery path for a missed item is a *different* item of that skill (from a daily set, homework or a different paper). The retake still shows the child improvement as a score trend (§5) without inflating mastery.

Open question flagged in decision 7: whether a full-paper first sitting should count at full `mock` weight or be capped, because a long paper can drop many same-skill items at once.

### 3.4 Parent homework gate
- Notebook entries created by a paper are eligible for parent-assigned homework exactly like any other, using `pickSimilar` / `similarItems.js` (3 similar questions by default, parent-set).
- The reward homework gate is unchanged: a credit is `pending` until that day's assigned homework is all solved (`creditStatusFor`, `homeworkGate`). The paper itself never creates homework automatically. A parent may tap "Assign homework for this paper's mistakes" on the parent result page (phase 4), which calls the existing `assign_homework` path.

---

## 4. Saturday past-paper reward

Today Saturday is the **Weekly Review**: re-solve the week's unmastered mistakes, earn a weekly sticker plus parent-configured credits per subject (`reward_rule_versions.weekly_amounts`, `award_credit`, pending credits, homework gate). The record-only ledger never moves real money.

Proposal: add a **Saturday past paper** as a second, optional Saturday activity. Rewards remain **parent-configured**; the app picks no numbers.

- **Eligibility:** a paper attempt that is *submitted* (or auto-submitted) on a Saturday SGT, in a subject the parent has a paper reward for. One reward per child per subject per Saturday (idempotent, like `award_credit`).
- **Amount:** parent-configured in the child's reward rule, per subject, in credits or SGD (same unit mechanics as `weekly_amounts`). Optional score tiers (e.g. ≥70% / 80% / 90%) reuse the `daily_tiers` shape. **Default: nothing**; no rule row = no credit, matching `reward_rules` "absent row = disabled, all zero".
- **What the reward is for:** sitting the full paper under exam conditions, not for the score, unless the parent turns on score tiers. A child who stops early or does not submit gets nothing.
- **Pending credits apply:** the credit is created `pending` with `gate_day = that Saturday`, and is confirmed or forfeited by the existing homework gate. `finalize_credits()` needs no logic change, only the new `kind`.
- **Sticker:** a new `kind = 'paper'` weekly sticker, one per Saturday (`stickers_uq` unique key already prevents duplicates; the CHECK constraint on `kind` is widened).
- **Interaction with Weekly Review:** independent. Doing both earns both; neither blocks the other. (Alternative in decision 8.)
- **Parent controls:** on/off, per-subject amount, optional tiers, which Saturdays (default every Saturday). Stored as a new `paper_*` section of the versioned rule so history is not rewritten (rules are versioned by `effective_from`; a parent can only write today or later).
- **Server decides.** The client never computes or claims a reward; the server verifies the attempt row, the SGT Saturday, the time spent (minimum elapsed, decision 9) and then calls `award_credit` / `award_sticker`.

---

## 5. Parent view and the 8pm email

### 5.1 Parent view (inside the existing parent dashboard, behind the flag)
- **Papers** list per child: school, year, type, date, score %, time used vs allowed, status (in progress / submitted / auto-submitted).
- **Result page** per attempt: per-section score and time, wrong items with the child's chosen cause, the same "Review Together" framing used by `ParentMistakesTab`, plus a one-tap "assign homework for these mistakes" (existing flow, parent-set count).
- **Trend:** score % across attempts, and the top repeated causes and traps across papers. Uses the existing cause/pattern summary (`patternSummary`).
- **Settings:** the Saturday paper reward (§4) next to the existing reward settings, and an optional "pin a paper" chooser.
- Read access follows the existing guardian rule (`is_parent_of`). All co-parents see the same data (shared child setting, like homework).

### 5.2 The 8pm email
The existing cron already runs at `0 12 * * *` UTC = **20:00 SGT** (`vercel.json`) and builds the summary in `buildParentPayload`. No new cron and no second email.
- Add, per child, an optional **papers** block, only when the flag is on and only if a paper was submitted that day or one is in progress and unfinished: paper name, score %, time used, top cause, and "N wrong items added to the notebook". On a Saturday also: "Saturday paper: done / not done".
- Absent when there is nothing to report (no empty section).
- Same channel rules as today: confirmed email addresses only, dry-run unless `EMAIL_ALERTS_ENABLED`, one row per parent per day in `alert_log`. The template change is additive (`emailTemplate.mjs`).
- No question text or student answers in the email; counts, scores and paper names only.

---

## 6. Server tables and migrations

Flag: **`NEXT_PUBLIC_MOCK_EXAMS_ENABLED`**, default OFF, read in `src/lib/supabase/config.js` next to the existing flags (`MOCK_EXAMS = process.env.NEXT_PUBLIC_MOCK_EXAMS_ENABLED === "true"`). It is a public on/off switch, not a secret. Server-side sync also requires `SERVER_AUTH`, like homework and rewards. With the flag off: no exam UI, no API route does work (routes return 404), no email block, no reward evaluation. Local-only mode can run exams when the flag is on and `SERVER_AUTH` is off, keeping results in the new local key only.

Migrations follow the existing convention: new numbered file in `supabase/migrations/`, **additive only**, safe to re-run, applied by hand in the Supabase SQL editor **before** the code that needs it merges, existing migrations never edited. Next free number after `20261126000000_pending_credits_shared_settings.sql` is `20261127…`.

### 6.1 `20261127000000_exam_attempts.sql` (phase 2)
```sql
-- one row per sitting
create table if not exists public.exam_attempts (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references public.profiles(id) on delete cascade,
  subject       text not null,
  grade         text,
  paper_id      text not null,            -- manifest id (stable; never the filename)
  paper_label   text,                     -- 'Nanyang 2024 EOY Paper 2' (display only)
  minutes_allowed integer not null check (minutes_allowed between 5 and 240),
  started_at    timestamptz not null default now(),
  deadline_at   timestamptz not null,
  submitted_at  timestamptz,
  status        text not null default 'in_progress'
                  check (status in ('in_progress','submitted','auto_submitted','abandoned')),
  elapsed_seconds integer,
  score         integer, total integer,   -- auto-graded items only
  unanswered    integer,
  section_scores jsonb,                   -- [{section, score, total, seconds}]
  sgt_day       date,                     -- day submitted, SGT (for Saturday logic)
  attempt_no    integer not null default 1,
  created_at    timestamptz not null default now(),
  constraint exam_attempts_one_open unique (student_id, paper_id, attempt_no)
);
create index if not exists exam_attempts_student_idx on public.exam_attempts(student_id, started_at desc);

-- per-item answers (kept so the review and the parent view do not depend on localStorage)
create table if not exists public.exam_answers (
  attempt_id    uuid not null references public.exam_attempts(id) on delete cascade,
  question_id   text not null,
  section       text,
  answer        text,
  correct       boolean,                  -- null = not auto-graded
  seconds       integer,
  flagged       boolean not null default false,
  primary key (attempt_id, question_id)
);

alter table public.exam_attempts enable row level security;
alter table public.exam_answers  enable row level security;
-- reads: the student and linked guardians, same as wrong_answers. NO client insert/update/delete: writes go through API routes (service role).
create policy exam_attempts_select on public.exam_attempts for select
  using (student_id = auth.uid() or public.is_parent_of(student_id));
create policy exam_answers_select on public.exam_answers for select
  using (exists (select 1 from public.exam_attempts a
                  where a.id = attempt_id and (a.student_id = auth.uid() or public.is_parent_of(a.student_id))));
```
(Policies get `drop policy if exists` guards in the real file, like the existing migrations.) Wrong items are **not** duplicated in these tables' own copy of the question: they go into the existing `wrong_answers` (§3.1) with `source_id = paper_id`, `attempt_key = 'exam-<attempt id>'`. `exam_answers` is the answer log; `wrong_answers` stays the notebook.

### 6.2 `20261128000000_paper_rewards.sql` (phase 5)
- `alter table public.stickers` widen the `kind` CHECK to include `'paper'`; `alter table public.reward_credits` the same. Constraint drop-and-re-add, no row changes.
- `alter table public.reward_rule_versions add column if not exists paper_unit text not null default 'credits' check (paper_unit in ('credits','sgd'))`, `add column if not exists paper_amounts jsonb not null default '{}'`, `add column if not exists paper_tiers jsonb not null default '[]'`. Defaults mean **no paper reward for every existing rule**.
- `award_credit` / `award_sticker`: extend the `kind` guard to accept `'paper'`. The 10-argument `award_credit` signature does not change, so deployed code keeps working.
- `finalize_credits()` already operates on `status = 'pending'` rows regardless of kind. No change expected; **verify by test before merge**.

### 6.3 What is *not* needed
- No new table for the paper manifest: it is a committed, generated static file (phase 0).
- No change to `daily_activity`/`record_activity`: whether a paper's questions count toward the daily target is decision 10.
- No change to `alert_log`.

### 6.4 Rollout and rollback
- Deploy order: migration → code (flag still OFF) → flag ON for the owner's own child → flag ON generally.
- Rollback = turn the flag off. The tables are additive and unused when off. Student data is never deleted.

---

## 7. Open decisions for the owner

Each has a recommendation; defaults take effect if you say "go with your recommendations".

1. **Scope of v1 (language/subject).** The app is English-only, and the written English papers have the best data and tags. *Recommend:* **English papers only in v1**; Chinese papers wait until the manifest has proper school/year metadata. Alternative: include Chinese now with Chinese-only exam screens.
2. **Which papers count as a "full paper".** *Recommend:* only papers with ≥ 45 declared marks (56 papers today, before de-duplication) and a complete answer key; shorter WA papers appear as "short mock".
3. **Duration when a file has none.** *Recommend:* use the printed time when present; otherwise **1.5 minutes per mark** (a 50-mark paper = 75 min, matching the Nanyang EOY printed 1h 15min), and show the rule on screen. Alternative: owner supplies times per school.
4. **Navigation in the exam.** *Recommend:* free movement with a flag-for-later and an end check screen (like a real booklet). Alternative: strict forward-only sections.
5. **Paper reuse.** *Recommend:* never repeat a paper until all are used, then oldest-first, and a repeat counts for score trend only, not mastery (§3.3). Alternative: allow immediate retake for practice.
6. **Open-ended / unmarkable items.** *Recommend:* show model answer after submit and let the **parent** mark them in the parent view (kept out of the auto score and mastery). Alternative: child self-marks.
7. **Mastery weight of a first sitting.** *Recommend:* full `mock` weight as already coded (no new rule). Alternative: cap items per skill per paper to avoid one paper dominating a skill.
8. **Saturday: paper vs weekly review.** *Recommend:* they are independent, both can earn. Alternative: paper replaces the review on Saturdays that a paper is assigned.
9. **Reward anti-gaming.** *Recommend:* a paper earns the Saturday reward only if ≥ 50% of the allowed time was used **or** ≥ 80% of items answered. This stops "open and submit blank". Parent may turn the check off.
10. **Daily target.** *Recommend:* a submitted paper **counts as one set** for that subject's daily target (via the existing `record_activity`), but its score does **not** feed the daily first-set score tiers (they measure the daily set). Alternative: it does not count at all.
11. **Time for a paper vs the 8pm email.** *Recommend:* mention the paper in that evening's existing email (§5.2) and send nothing extra. Alternative: separate immediate email after submit.
12. **Duplicate and mis-named papers.** *Recommend:* the manifest excludes suspected duplicates until the owner confirms them in a short list I will produce in phase 0; paper files are not edited.

---

## 8. Phased implementation plan

Each phase is its own small PR, flag OFF, `npm run build` and `npm run typecheck` clean, and states honestly what was verified. No phase edits generated files, the paper data files, `trialLedger/tickets/scheduler/antiGuess` constants, or any `genius_*` key.

| Phase | Deliverable | Server? | Student impact |
|---|---|---|---|
| 0 | **Paper manifest**: generator script (new, under `tools/papers/`) that reads the paper files and writes a committed manifest (id, declared school/year/type, marks, minutes, sections, question count, answer-key presence, duplicate suspects). Report listing defects for the owner (decision 12). Validator: every question has an answer or is flagged "not auto-graded". | No | None |
| 1 | **Exam engine, local only** behind the flag: paper picker, timed session with wall-clock deadline, section nav, no-hint rules, submit/auto-submit, review screen with cause picking. New local keys `genius_exam_inprogress_v1`, `genius_exam_attempts_v1` only. | No | None when OFF |
| 2 | **Server attempts**: migration `…exam_attempts.sql`, `/api/student/exam` routes (start, save, submit), results synced; `wrong_answers` rows written with `attempt_key 'exam-<id>'`. | Yes | None when OFF |
| 3 | **Mastery wiring**: submit records `mock` trials; retake and same-question handling via `homeworkMastery.js`; half-weight delayed-transfer path verified with unit-style checks. | No | None when OFF |
| 4 | **Parent view + 8pm email block** + "assign homework from this paper" button. Template change additive; dry-run first. | Yes | None when OFF |
| 5 | **Saturday paper reward**: migration `…paper_rewards.sql`, parent settings, server-side eligibility, pending-credit integration, sticker. | Yes | None when OFF |
| 6 | **Hardening**: 5–10 school-matched papers hand-checked end to end (answer key vs question), accessibility, low-bandwidth, owner-only flag-on pilot, then general flag-on. | — | Pilot only |

**Verification expected per phase** (from `CLAUDE.md` §8): `npm run build`, `npm run typecheck`, dev-server spot check of the exam flow with the flag on and off, a check that a pre-existing local profile loads unchanged, and for server phases a dry run of the migration on a scratch Supabase project. There is no unit-test runner in the repo; phase 3 should add the first small pure-function checks as a node script (like `zh_wa1_selftest.js`), not a new framework.

**Risks to watch:** (a) timer correctness across refresh/sleep (wall-clock deadline, tested by hand); (b) answer-key errors in hand-OCR'd papers showing a child a wrong "correct answer" (phase 0 validator + phase 6 manual check; an exam that teaches the wrong answer fails the product test in `CLAUDE.md` §1); (c) a long paper creating dozens of tickets at once (cap new tickets per submit, or batch into the notebook only; decision 7); (d) reward gaming (decision 9).
