# CLAUDE.md — Genius Project (psle-app)

Rules and orientation for Claude Code. Status/history lives in `HANDOFF_MASTER.md`; this file is the stable rulebook. Facts I could not verify from the repo are marked **TODO**.

## 1. Product goal
"Genius Project" is a Singapore PSLE practice web app (live: psle-app-vwx3.vercel.app). Purpose: **raise school WA/EOY and PSLE scores**.
- Kumon-style repeated practice on real past papers and similar items.
- Thorough review of every wrong answer.
- Extra practice on frequently missed and similar-trap types.
- Parent view of weaknesses, plus parent-assigned practice.
- Periodic real past-paper tests.

Judge every change by one test: *does this raise the student's real exam score?*
Live content today: P3 English and P3 Chinese (Higher Chinese, 华文). Math/Science are "Coming Soon". Roles: student / parent / admin.

## 2. Workflow rules
- **Always work on a branch and open a PR. Never push to `main`.**
- Keep PRs small and single-purpose. Docs-only PRs must not touch code, data or scripts.
- The Claude GitHub Action implements; the repo owner reviews and merges.
- Don't guess. Open the actual file before reporting; if a fact can't be verified, write TODO.
- After any change, verify (see §8) and report honestly what was and wasn't checked.
- Do not mention or reintroduce desktop-session-era workarounds in docs or code.

## 3. Stack
Next.js 16 App Router, React 19, Tailwind 4, mostly JS/JSX with some TS (`tsconfig.json`, `types.ts`, data files). Path alias `@/` -> `src/`. Deployed on Vercel (push to `main` auto-deploys, so `main` must always build).

**Storage: currently everything is in the browser (localStorage).** There is no database. A minimal server (auth + parent monitoring) is planned next (roadmap #2).

localStorage / sessionStorage keys actually used in `src/`:
| Key | Where | Content |
|---|---|---|
| `genius_users_v2` | `ClaudeApp.js` | accounts (id, password, name, grade, school, role) |
| `genius_progress_v2` | `ClaudeApp.js` | progress keyed `userId_grade_subject` -> `{history[], mistakes[], settings, nextSession, vocabBook, sessionSections, trials[], skillLedger{}, tickets[], served{}, ...}` |
| `genius_zh_review_v2` | `lib/zhReview.js` | Chinese vocab Leitner store, scoped `<user>_zh` |
| `genius_en_review_v2` | `lib/vocabReview.js` (`'genius_'+lang+'_review_v2'`) | English vocab Leitner store, scoped `<user>_en` |
| `genius_zh_unknown_v1` | `components/ExamSession.js` | list of words the student tapped as unknown |
| `genius_zh_session_unknown` (sessionStorage) | `zhReview.js` | words tapped this session |
| `genius_en_session_unknown` (sessionStorage) | `vocabReview.js` | same, English |

`genius_admin` is a seeded user id (in `SEED_USERS`), not a storage key. Seed credentials are hard-coded in client code — see roadmap #2 (security cleanup). Server-side env vars: `ANTHROPIC_API_KEY`, optional `GENERATE_ROUTE_TOKEN` (`src/app/api/generate/route.js`).

## 4. Never hand-edit generated files
Edit the source, rerun the generator, commit both. Generated headers say `GENERATED` / `DO NOT EDIT`.

| Generated file | Source -> generator |
|---|---|
| `src/data/p3/english/wa1_practice.ts` | `20260622_WA1_complete.json` (+ `comp60_FINAL_8type_backup.json`) -> `node build_wa1_practice.js` (self-check ends with `ALL PASS (0 failures)`) |
| `src/data/p3/english/comprehension_generated.ts` | header says AUTO-GENERATED 8-type comprehension; produced from `comp60_*.json` / `build_wa1_practice.js`. **TODO** confirm exact generator |
| `src/data/p3/chinese/wa1_practice.ts` | `wa1_zh_complete.json` -> `python3 emit_ts.py` (round-trip check built in). `generate_wa1_zh.js` produced the JSON originally (needs API key); `build_wa1_practice_zh.js` is an alternate convert/validate/emit path |
| `src/data/p3/chinese/wa1_drill.ts` | `wa1_zh_drill.json` -> `python3 emit_ts.py` (drill-only sets; drill JSON from `tools/gen/gen_zh_items.py`) |
| `src/data/p3/chinese/wa1_bank.json` | `wa1_zh_complete.json` -> `tools/bank/build_zh_bank.py` (`emit_ts.py` calls it) |

Notes:
- Root `wa1_practice.ts` is a deprecated stub; the app does not import it.
- English hints: author in `en_patch_SXX.json`, merge with `en_hints_merge.py`, then rebuild.
- Chinese partial fixes: `merge_patch.py` / `wa1_patches/`, then `python3 emit_ts.py`.
- Data files under `src/data/p3/*/papers/` are hand/OCR-authored past papers (not generated). **TODO** confirm.

## 5. Content rules
- **`retry_hint` must never leak the answer** (nor a multi-word answer's component words, unless shared by 2+ options). Format: point at the deciding clue in CAPS + a question the student asks themself + one transferable rule; 1–2 sentences, <= 260 chars. `learning_tip` / `trap_type` may reveal the answer and are for post-answer explanation only. Verify with `python3 verify_all_sets.py` and `python3 audit_hints.py` (0 violations).
- **Chinese explanations use the 3-layer format**, newline-separated: (1) verdict, (2) why each wrong option fails, (3) `【…的方法】` transferable rule. VocabMatch/Reading explanations are single paragraphs. `explanation_en` is a short single paragraph — do not make it 3-layer.
- Chinese exam screens are Chinese only; English appears only in word popups, explanations and Translate. No Korean in student-facing UI. (See `ZH_EXPANSION_RULES.md`.)
- Editing items: the wrong word's **first occurrence** in the sentence must be the underlined spot (renderer uses `indexOf`).
- **Never delete student progress.** Never reintroduce code that resets progress on load (an earlier "one-time reset" block wiped students' history on every login). A wipe must be an explicit admin action.
- **Any storage-shape change needs a migration that preserves existing data** (additive fields, defaults via `ensureLedgerFields`-style helpers). Don't rename keys without migrating.

## 6. Learning engine (summary from code)
- **Trials & ledger** (`lib/trialLedger.js`): every graded item -> `trials[]`; per-skill `skillLedger` with first-try correct, hinted, guessed, re-error, delayed success, transfer, and `theta` (first-try +0.15(1-t), wrong -0.25t, delayed success +0.25(1-t), guessed unchanged). Modes: `exam`, `mock`, `drill`, `review`, `gate`. Only exam/mock (KPI) and exam/mock/drill (mastery) count; `review` and `gate` never feed mastery.
- **Tickets** (`lib/tickets.js`): a wrong, hinted or guessed-correct answer opens a ticket on its skill. Drill serves *different* items of that skill (seed item and exact duplicates never re-served). **Graduation: first-try correct on >= 2 distinct items in >= 2 distinct sessions.** Leitner box 1–4, **round spacing 1/2/4/8 sessions**; a failure resets to box 1. Failing the skill again in a real round pulls the ticket forward. English uses runtime bank `bankFromIndex` (skill or `sec:<SectionType>`).
- **Adaptive scheduler** (`lib/scheduler.js`): 10-item round = **40% due tickets, 30% adjacent skills (theta 0.5–0.7), 20% maintenance (theta >= 0.8, unseen >= 4 sessions), 10% exploration (never attempted)**; shortfall filled adjacent -> tickets -> maintenance -> weakest.
- **Review rounds** (`lib/reviewRounds.js`, `components/ReviewRounds.js`): re-solve a past round's wrong items (recognition only; logged as mode `review`, never counts as mastery). Synthesis/SentenceCraft are not auto-graded and skipped.
- **Vocab Leitner gate**: Chinese `lib/zhReview.js` + `ZhReviewGate.js`; English `lib/vocabReview.js` (`makeReviewStore('en')`) + `EnReviewGate.js`. Review-only (no new words), **max 10 words per round**, from words tapped as unknown, wrong-answer core words, and guessed items; box 1–4, spacing 1/2/4/8, mastered after correct answers in 2 distinct sessions. Design: `ZH_P4_REVIEW_GATE_DESIGN.md`.
- **Anti-guess** (`lib/antiGuess.js`, P5): deliberately minimal. Flags only *correct* answers committed faster than readable (gap < 700 ms between taps; first tap < 600 ms; pages with >= 2 items). Never lowers score; flagged items go to review/tickets. English uses `sessionUtils.guessFlag` floors (MCQ 1500 ms etc.). Principle: a student who really solved it feels nothing.
- **KPI** (`components/KpiCard.js`, `trialLedger.firstTryStats`): first-try rate, re-error rate, delayed success, transfer; weak skills = highest re-error with >= 3 attempts. The old "Avg" metric is not used.
- **Chinese skills**: 14 in `wa1_bank.json`: tongyinzi, xingjinzi, shengdiao, duoyinzi, shengmu_yunmu, vocab_in_context, jinyici, liangci, dapei, detail, inference, main_idea, yufa, lianci.
- **Daily flow**: 60 generated sets per language (English S01–S60 x 33 items; Chinese ZS01–ZS60); every 10th session is a flagged mock (`isMockDue` in `ClaudeApp.js`).
- **Parent mistakes tab** (`components/ParentDashboard.js` `ParentMistakesTab`): lists `history[].mistakes` by session and topic with difficulty badges, "Review Together" framing. Reads only local data today.

## 7. Do-not-touch list (without an explicit request)
- Generated files in §4 (edit sources + regenerate).
- `20260622_WA1_complete.json`, `wa1_zh_complete.json`, `seed_*.json`, `zh_dict.json`, `wa1_zh_dict/` — source-of-truth data; change only via the documented pipelines.
- `src/lib/trialLedger.js`, `tickets.js`, `scheduler.js` constants (`INTERVAL`, `MIX`, graduation rule) and `antiGuess.js` `GUESS_CFG` — product-locked; propose changes in an issue first.
- `src/app/ClaudeApp.js` storage keys and load path (see §5).
- Root scripts and files — don't move or rename (pipelines depend on paths). Dated one-off `fix_*.py` / `en_patch_*.json` are history, not to be re-run casually.
- `.github/workflows/` (Claude Action cannot modify them anyway).
- `src/lib/step2_lib_reviewRounds.js`, `src/components/step2_component_ReviewRounds.js`: look like stale step copies. **TODO** confirm unused before touching or deleting.

## 8. Run & verify
```
npm install
npm run dev          # local dev server
npm run build        # must compile before any PR touching src/
npm run typecheck    # tsc --noEmit
npm run selftest     # all node self-tests (incl. tools/no_korean_selftest.mjs, also run by prebuild)
node zh_wa1_selftest.js        # Chinese schema/validator selftest: expect 27 pass / 0 fail (verified)
node build_wa1_practice.js     # English regenerate + self-check: ALL PASS (0 failures)
python3 verify_all_sets.py     # English independent full check (hint leaks, cloze, editing): 0 violations
python3 audit_hints.py         # re-checks every retry_hint
node zh_wa1_validate.js        # Chinese validator module (used by builders)
```
There is no unit-test runner or lint script in `package.json`. `zh_remediation_selftest.js` targets `src/lib/zhRemediation.js`, which no longer exists, so it is stale. For UI changes, run `npm run dev` and spot-check; state if you couldn't.

## 9. Roadmap (in order)
1. **Docs** (CLAUDE.md, HANDOFF_MASTER, archive) — this PR.
2. **Security cleanup + minimal server**: remove hard-coded seed credentials/plaintext passwords from the client, auth, parent daily check/alerts, mistakes history stored on the server (with a migration from localStorage that keeps existing data).
3. **Concept / trap-type taxonomy** for all items.
4. **Wrong-answer notebook redesign**: date-based spacing, cause tagging, twin (similar) items, parent-assigned homework, solved/remaining status.
5. **Mock exams = real past papers**.
6. **Exam calendar**.
7. **Final explanation / answer QA** across all content.

## 10. Reference docs
- `HANDOFF_MASTER.md` — current status, pipelines, root-scripts map (start here).
- `EN_WA1_HANDOFF_v1.md` — English WA1 hint/answer pipeline, schema pitfalls, defect history.
- `DECISIONS_FOR_REVIEW.md` — judgment calls made on English data (answer-key changes, added distractors) awaiting owner review.
- `ZH_WA1_HANDOFF_v10.md` — latest Chinese WA1 spec: 60/60 data, 3-layer explanations, field contract, maintenance steps.
- `RESUME_STATE.md` — short Chinese resume memo (v10 baseline).
- `ZH_P4_REVIEW_GATE_DESIGN.md` — vocab review gate (Leitner) design.
- `ZH_P5_ANTIGUESS_DESIGN.md` — anti-guess design and locked principle.
- `ZH_EXPANSION_RULES.md` — language/popup/working rules for new grades, exams, subjects.
- `ZH_VOCAB_POPUP_PLAN_v1.md` — word popup / unknown-word gate plan.
- `ZH_WA1_EXPL_QUALITY_PLAN.md` — Chinese explanation quality plan.
- `P3_AUDIT_REPORT.md` — word-popup full audit (23,444 taps, 0 errors).
- `P1_coverage_report.md`, `P2_BATCH1_REPORT.md`, `zh_vocab_incon_report.md`, `duoyinzi_cursor_notes.md` — Chinese vocab/duoyinzi work reports.
- `docs/handoff/` — Chinese WA1 source analysis and OCR; `docs/archive/` — superseded handoffs and old new-chat prompts.
