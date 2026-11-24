# Chinese mock exam readiness (issue #134)

Date: 2026-11-24. Read-only audit. No paper, manifest or runtime code was changed.
Reproduce: `node tools/papers/chinese_readiness.js` (add `--json` for full output).

## Verdict

**No Chinese paper is launchable as a mock exam today, and the exam stack cannot run one without new code.**
Two independent blockers; both must be fixed before the picker can show a Chinese paper.

1. **Marks data is missing.** The 50 Chinese papers in `src/data/papers/manifest.json` have `questionMarksSum: null`
   and every section has `marks: 0`. Only 26 of 50 declare a paper total (`marks`), and none of the 50 prints marks
   on each question. Only open-ended items print "(N分)". For the 26 papers with a declared total, the printed
   marks add up to the total in 0 cases. Section marks exist only in file header comments (for example "辨字 5题5分"),
   which the engine does not read. A score out of N cannot be computed honestly yet.
2. **The exam stack is English-only.** See "Gaps" below.

## Papers (50 in manifest; 50 files read)

| Group | Papers | Declared total | Answers on every item | Per-question marks | Verdict |
|---|---|---|---|---|---|
| EOY | 18 | 2 of 18 (45, 45) | all | none | not ready |
| WA1 | 7 | 7 of 7 | all | none | not ready |
| WA2 | 17 | 17 of 17 | all | none | not ready |
| WA3 | 8 | 0 of 8 | all | none | not ready |

(Counts from the manifest; the audit script prints one line per paper with question kinds, printed marks and
a COMPLETE / incomplete flag.) Every paper has an answer for every item (`noAns=0` everywhere), so the
**answer key is not the blocker; marks and the player are.**

Best candidates once marks are added (declared 45 marks, 34 items, all sections present, all answers present):
`p3_zh_wa1_tao_nan_2025`, `p3_zh_wa1_tao_nan_maintest_2025`, `p3_zh_wa1_tao_nan_supplementary5_2025`,
`supp_tao_nan_hcl_2_2023`, `supp2_tao_nan_hcl_2024`, `supp5_tao_nan_hcl_2023`, `eoy_nanhua_hcl_paper2_2025`,
`eoy_redswastika_hcl_revision4_2025`. The three Tao Nan WA1 files and the three Tao Nan WA2 supplementary files
share the same section split and item count (34); they have NOT been compared item by item, so check for duplicates (same method as the Henry Park check) before listing them.
Three "other"-heavy papers (`p3_zh_wa1_chij_revision1_2025`, `rev2_st_nicholas_hcl_2025`, `wa3_chijstnicholas_rev3/4_2025`) are
BianZi/PinYin grids (21 sub-items each) and need a section-by-section look before launch.

## Question types in the Chinese papers

| Kind | Where | Auto-gradable with existing primitives? |
|---|---|---|
| Multiple choice (BianZi, PinYin, CiYu, MCQ, reading MCQ) | most items | Yes: `learningGrade` `mcq` format (answer index) |
| Matching / word-bank (PeiDui, KanTu) | 5 per paper | Partly: needs the cloze-style grader (blank id + word) |
| Rearrange / expand sentence (JuZi, tiles) | 2-10 per paper | No existing grader; the target sentence is stored, exact-match is possible |
| Order sentences (ZuJu) | 0-7 per paper | `sequence` format fits |
| Open-ended comprehension (YueReadOpen) | 1-10 per paper | No: parent marks (existing flow); `provisionalMark` is English-word based and must not be used on Chinese text |

## Gaps in the exam stack (all verified in code)

- `src/lib/examEngine.js` `isFullPaper` requires `row.subject === "English"` and an integer `poolIndex`. All Chinese rows have `poolIndex: null`.
- `src/lib/examServer.js` `catalogue()` builds from `flattenEnglishPool()`; `paperData` uses `englishPaperExamPlan`. There is no Chinese exam plan
  (`p3PaperBridge.js` has Chinese practice adapters only, not an exam-plan builder with answer-free public paper and per-item ids).
- `examServer.js` hard-codes `subject: "English"` on the notebook rows and `SECTION_LABEL` has English sections only.
- `src/components/ParentDashboard.js` renders the Papers tab only when `subject==="English"` (line ~807).
- `src/lib/examSettle.js` defaults subject to English (it passes `a.subject` when set, so it is ready once attempts carry the subject).
- `provisionalMark` in `examEngine.js` tokenises on `[a-z0-9]`: on Chinese text every answer is "too short" and scores 0. Chinese open items must be left for the parent.
- `exam_attempts` has a `subject text not null` column (`supabase/migrations/20261129000000_exam_attempts.sql`), so no SQL is needed for storing a Chinese attempt.

## Recommended path (not done in this PR)

1. Add per-section marks to the Chinese data. Preferred: one small sidecar `src/data/papers/zh_marks.json` per paper, section -> marks per item,
   verified against the declared total by a self-test (so no hand-authored paper file is edited).
2. Add `chinesePaperExamPlan(paper)` to `p3PaperBridge.js` that emits the same plan shape as English (sections with ids, answer-free `publicPaper`).
3. Generalise `isFullPaper` / `catalogue()` / `listPapers()` by subject; add Chinese `SECTION_LABEL`s; keep the English path unchanged.
4. Subject picker in the student paper entry; remove the English-only condition on the parent Papers tab.
5. Grade MCQ, sequence, word-bank; leave rearrange as exact-match (optional) and open-ended to the parent marking flow.
6. Keep the manifest filter strict so incomplete papers stay hidden (the default today, because `isFullPaper` excludes them).

## Henry Park duplicate check

Compared `eoy_henrypark_p2_2024` (file `eoy_henrypark_p2_2025.ts`) with `eoy_henrypark_p2_2025`
(file `eoy_henrypark_p2_2025 (2).ts`), plus the other two Henry Park EOY files for context.

- Question counts: 47 vs 48 leaves.
- Identical question stems: 0.
- Identical text strings of 15+ characters: 11 of 403 (3% of the 2024 file, 4% of the 2025 file). All 11 are instruction boilerplate or
  headings ("Fill in the blanks with the most suitable word", "Read the passage below and answer questions 35 to 42",
  the school name, two skill tags). None is a question, passage or answer.
- Identical multiple-choice option sets: 2 of 17, the kind of overlap two unrelated vocabulary MCQs can have by chance.
- Same question ids: 0. Same passages: 0.
- Against `eoy_henrypark_p2_2023.ts` and `eoy_henrypark_paper2_2025.ts`: 1-2% overlap, also boilerplate.

**Finding: not duplicates.** The manifest flag (`strong`, reason `filename is a "(n)" copy`) is a filename artefact: the 2025 paper
lives in `eoy_henrypark_p2_2025 (2).ts` and the 2024 paper in `eoy_henrypark_p2_2025.ts`. Nothing was hidden, deleted or renamed.
Recommendation: keep both in the picker. The `duplicate_suspect` note shown on the 2025 paper ("looks similar to another one") is misleading and could be
suppressed later by renaming the file, which the owner must decide.
