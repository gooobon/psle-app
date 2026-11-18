# Genius Project (psle-app) — Master Handoff / Status

Last updated: 2026-11-18 (docs refresh; previous substantive update July 2026).
This is the human-readable **status** doc. **Rules and conventions live in `CLAUDE.md`** — read it first. Older sub-handoffs are partly in Korean.

---

## 0. One-line status
- P3 English WA1 (60 sets x 33 items = 1,980) and P3 Chinese WA1 (ZS01–ZS60) are content-complete; the **learning engine** (tickets, adaptive scheduler, KPI, review rounds, vocab gates, anti-guess) is built and wired into both subjects.
- All data is still **browser localStorage**; there is no server. Next major work: security cleanup + minimal server (see `CLAUDE.md` §9).

## 1. What the app is
Singapore PSLE practice app (P3–P6/PSLE tabs; only P3 English and Chinese have content, via `LIVE_CONTENT`). Goal: raise real exam scores through repeated practice, wrong-answer review and parent visibility. Next.js 16 / React 19 / Tailwind 4, deployed on Vercel. Live: psle-app-vwx3.vercel.app.

Student flow: pick subject -> daily WA1 set (60-set track; every 10th session is a flagged mock) -> results -> vocab review gate -> wrong-item review rounds / adaptive rounds. Parents use `ParentDashboard.js` (including the Mistakes tab).

## 2. Learning engine (built; Steps 1–10 per file headers)
| Piece | File | Status |
|---|---|---|
| Trial ledger, theta per skill | `src/lib/trialLedger.js` | done; additive fields `trials[]`, `skillLedger{}` |
| Skill tickets + remediation drill (graduate after first-try wins on 2 distinct items in 2 sessions; spacing 1/2/4/8) | `src/lib/tickets.js` | done |
| Adaptive scheduler (40/30/20/10 mix) | `src/lib/scheduler.js`, `src/app/adaptive/page.js`, `GeniusAdaptiveEngine.jsx` | done. **TODO** confirm how `/adaptive` page relates to the in-app adaptive round (`ClaudeApp.js` `adaptive` state) |
| Per-round wrong-item review | `src/lib/reviewRounds.js`, `ReviewRounds.js` | done (recognition only, no mastery credit) |
| Chinese vocab gate (Leitner) | `src/lib/zhReview.js`, `ZhReviewGate.js` | done (P4) |
| English vocab gate (Leitner) | `src/lib/vocabReview.js`, `EnReviewGate.js` | done |
| Anti-guess (burst-tap, minimal) | `src/lib/antiGuess.js`, `sessionUtils.guessFlag` | done (P5) |
| KPI card (first-try, re-error, delayed, transfer) | `src/components/KpiCard.js` | done |
| Chinese item bank (14 skills) + drill-only generated items | `wa1_bank.json`, `wa1_drill.ts`, `tools/` | done; drill bank for thin skills generated via `tools/gen/gen_zh_items.py` |
| Parent mistakes tab | `ParentDashboard.js` `ParentMistakesTab` | done, local data only |
| Word popup on every Chinese word | `ExamSession.js` (`ClickableZh`, `VocabPopup`) | audited 0 errors (`P3_AUDIT_REPORT.md`) |

Details and numbers: `CLAUDE.md` §6.

## 3. Content state
**English WA1** — source `20260622_WA1_complete.json`; all 60 sets read through, answers verified, `retry_hint` on every item, independent verifier reports 0 violations (as of last recorded run in `EN_WA1_HANDOFF_v1.md`; re-run `python3 verify_all_sets.py` to confirm today). Section layout per set: A Vocab MCQ 5, B Grammar MCQ 8, C Grammar Cloze 8, D Vocab Cloze 5, E Editing 5, F Synthesis 2 (G Comprehension not hinted). Judgment calls awaiting owner review: `DECISIONS_FOR_REVIEW.md`.

**Chinese WA1** — source `wa1_zh_complete.json`, 60/60 sets, 3-layer Chinese explanations, `zh_wa1_selftest.js` = 27 pass / 0 fail (re-run in this refresh). Per `ZH_WA1_HANDOFF_v10.md`, ZS13–ZS60 explanations passed machine validation only; **a human quality spot-audit is still outstanding**. Do not re-run set expansion (finished).

**Past papers** — `src/data/p3/{english,chinese}/papers/` (WA1/WA2/WA3/EOY folders, `index.ts` bridges via `src/lib/p3PaperBridge.js`). **TODO** document coverage per paper/school.

## 4. Pipelines (quick form; full table in `CLAUDE.md` §4)
- English: `20260622_WA1_complete.json` -> `node build_wa1_practice.js` -> `src/data/p3/english/wa1_practice.ts`. Hints: `en_patch_SXX.json` -> `python3 en_hints_merge.py <patch> [--dry]` -> rebuild -> `python3 verify_all_sets.py`.
- Chinese: `wa1_zh_complete.json` -> `python3 emit_ts.py` -> `wa1_practice.ts`, `wa1_drill.ts`, `wa1_bank.json`. Partial fixes: `merge_patch.py` / edit JSON directly, then `emit_ts.py`.
- Never hand-edit generated outputs.

## 5. Known gaps / risks
- Seed accounts and plaintext passwords are hard-coded in `ClaudeApp.js` (`SEED_USERS`); passwords stored plain in localStorage. Roadmap #2.
- No server: parents can't see a child's data from another device; no alerts; mistakes history is device-local.
- `src/app/api/generate/route.js` is gated by model allow-list and optional `GENERATE_ROUTE_TOKEN` — **TODO** confirm the token is set in Vercel.
- No automated test runner or lint; verification = build + selftests + validators.
- `zh_remediation_selftest.js` is stale (its target `src/lib/zhRemediation.js` doesn't exist).
- `src/lib/step2_lib_reviewRounds.js` and `src/components/step2_component_ReviewRounds.js` appear to be leftover copies. **TODO** confirm unused.
- Root `wa1_practice.ts` is a deprecated stub.
- Rule: Editing wrong-word first occurrence = underline position; new data must respect it (see `EN_WA1_HANDOFF_v1.md`).

## 6. Roadmap
Authoritative order in `CLAUDE.md` §9: docs -> security + minimal server (parent daily check/alerts, server-side mistakes history) -> concept/trap taxonomy -> wrong-answer notebook redesign -> real past-paper mocks -> exam calendar -> final explanation/answer QA.

Concept / trap taxonomy **v1 is a DRAFT** in `docs/taxonomy.md` (catalogue: `src/data/taxonomy/taxonomy.json`). It is not wired into the student UI. Owner approval is still required before the wrong-answer notebook uses the ids.

## 7. Root scripts (do not move; pipelines depend on paths)
**Build / emit (generators)**
`build_wa1_practice.js` (EN), `emit_ts.py` (ZH), `build_wa1_practice_zh.js` (ZH convert/validate/emit), `generate_wa1_zh.js` (ZH API generator, needs key), `build_seed_all.js`, `build_zh_dict.py`, `build_duoyinzi.js`, `write_engine.js`, `translate_korean.js`; subfolder tools: `tools/bank/build_zh_bank.py`, `tools/gen/*`, `tools/vocab/*`.

**Validate / audit**
`verify_all_sets.py`, `audit_hints.py`, `zh_wa1_validate.js`, `zh_wa1_selftest.js`, `zh_remediation_selftest.js` (stale), `validate_duoyinzi.js`, `check_editing_sentences.py`, `pinyin_audit.py`, `tools/gen/validate_sets.js`.

**Merge patches / author**
`en_hints_merge.py`, `merge_patch.py`, `merge_expl.py`, `author_harness.py`, `split_expl_layers.py`, `backbone.py`, `worklist.py`, `zs01_author.py`, `zs01_finish.py`, `zs01_pilot_v2.py`.

**Inspect / dump**
`dump_set.py`, `dump_expl.py`, `list_unmatched.py`.

**One-off fixes (history; set-specific `fix_*.py`)**
`fix_s01_s03_s06.py` … `fix_s56_s60.py`, `fix_s02_cloze.py`, `fix_cloze_defects.py`, `fix_mcq_blanks.py`, `fix_pp_manual*.py`, `fix_solution_noise.py`, `fix_zs37_38_skill.py`, `fix_zs51_cloze5.py`, `rewrite_past_perfect.py`, `drop_drill_items.py`, others (`fix_speakbtn.py`, `fix_step7_tdz.py`, `fix_gen_*.py`, `fix_nanhua_q21.py`, `fix_tn3_q23.py`, `fix_acsp_g44.py`, `fix_craft_subject.py`, `fix_p16_editing_sentence.py`). Not part of routine workflow.

**Data (sources, inputs, backups)**
Source of truth: `20260622_WA1_complete.json`, `wa1_zh_complete.json`. Seeds: `seed_*.json`, `seed_zh_all.json`. Patches: `en_patch_S01..S60.json`, `wa1_patches/`, `wa1_expl/`. Chinese dict/segments: `zh_dict.json`, `zh_segments.json`, `zh_stoplist.json`, `zh_overrides.json`, `wa1_zh_dict/`. Other: `wa1_zh_drill.json`, `wa1_zh_pilot_en.json`, `comp60_*.json`, `rewrite_pp_*`, `*_backup.json`, `*.pp_backup.json`, `outputs_bak_*.json`, `zh_wa1_ocr_pages.json`, `duoyinzi_cursor.json`. Schemas: `types.ts`, `zh_wa1_schema.ts`. Review mockups: `*_popup.html`.

## 8. Document map
Current: `CLAUDE.md`, this file, `docs/taxonomy.md` (concept/trap taxonomy v1 DRAFT), `EN_WA1_HANDOFF_v1.md`, `ZH_WA1_HANDOFF_v10.md`, `DECISIONS_FOR_REVIEW.md`, `RESUME_STATE.md`, `ZH_P4_REVIEW_GATE_DESIGN.md`, `ZH_P5_ANTIGUESS_DESIGN.md`, `ZH_EXPANSION_RULES.md`, `ZH_VOCAB_POPUP_PLAN_v1.md`, `ZH_WA1_EXPL_QUALITY_PLAN.md`, `P3_AUDIT_REPORT.md` and report files (`P1_*`, `P2_*`, `zh_vocab_incon_report.md`, `duoyinzi_cursor_notes.md`).
Archived in `docs/archive/`: `ZH_WA1_HANDOFF.md` (v2), `_v3`, `_v4`, `_v5`, `_v7`, `_v8`, `_v9`, `NEW_CHAT_PROMPT.txt`, `NEW_CHAT_PROMPT_v3.txt`. (There is no v6 file.) Archived files may still mention old paths and rules; trust `CLAUDE.md` and v10 instead.

## 9. English hint rules (core asset, kept here for quick reference)
`retry_hint` = [deciding clue in CAPS] + [question the student asks] + [one transferable rule], 1–2 sentences, <= 260 chars; never states the answer or its component words (unless common to 2+ options). Approved tone examples: `en_patch_S05.json`, `S06`, `S27`. Recurring data defects to watch in other papers/Chinese: cloze passage belonging to another item, shifted cloze answers, unused distractors visible in passage, vocab cloze with zero distractors, answer visible in stem, non-existent error forms (`rangers's`), editing underline substring traps (`here` in `there`), cloze options needed twice, synthesis without source sentence. Full history: `EN_WA1_HANDOFF_v1.md`.
