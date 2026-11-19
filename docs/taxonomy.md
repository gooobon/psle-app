# Concept and trap taxonomy — v1 APPROVED

**Status: v1 APPROVED (2026-11-19) for English and Chinese.**

The English and Chinese leaf list below is the approved v1 catalogue. It will be updated later by adding ids, not by renaming ones that have already been written onto items. Math and Science are out of scope for this pass and are not used.

Question text, answers, and explanations are unchanged. The catalogue does not read or write student storage. Cause labels in the UI are English.

The machine-readable source of truth is `src/data/taxonomy/taxonomy.json` (typed helpers in `src/data/taxonomy/taxonomy.ts`). If this page and the JSON ever disagree, trust the JSON and update this page.

Ids are stable. Add a new id when a leaf is missing. Do not rename an id that has already been written onto items. A renamed id would orphan every tag and every notebook entry that points at it.

## Decisions (2026-11-19)

1. **Concept list.** The English and Chinese leaves in this file are approved as v1. Math and Science are excluded from the approval. Their ids stay in `taxonomy.json` with `inScope: false` so nothing is renamed, and no question is tagged with them.
2. **Same skill across formats.** An editing item and an MCQ (or any other section) that share a leaf skill are similar. Lookup matches the skill id and does not filter by section or format. A past-tense editing item and a past-tense MCQ are both `en.grammar.simple_past`.
3. **Chinese past papers with an uncertain section.** They are not dropped from similar-question matching. The item's own skill is used when it has one (a leaf concept, including a leaf named by the item's `skill` field or by its method line when that skill sits under the section). If the skill is unknown — the tag is only a parent such as `zh.reading` or `zh.hanzi` — lookup uses the trap ids and does not match every item under that parent.
4. **Open-ended English reading is two skills.** Fact-finding (`en.reading.fact_finding`, retrieval / literal) and inference (`en.reading.inference`, the same inference skill as a "why" MCQ). Items are retagged from the stem and the author's tip. Low-confidence tags are `uncertain`. `en.reading.open` is kept so the id is not renamed, and it is no longer applied.
5. **Math and Science.** Out of scope. No separate speed id, no heuristic concepts, no foundation-science tree, and no decision on plant versus human reproduction. Those questions are not part of v1.

Left as they were, because this approval does not change them:

- `solution.trap` that names a real distractor (not the letter A–D, and not longer than 140 characters) is still `trap.keyword_lift`.
- Sixteen duplicate paper ids stay untagged. They are not renamed, because a stored result may already use the id. A later change can give them distinct ids only with a migration of saved attempts.
- `TianKong` stays `zh.ciyu` and `KanTu` stays `zh.writing.picture` unless the item's own method names a leaf under that section. `KanTu` is already a leaf skill, so those items match each other even while the tag is uncertain.

## What the ids are for

1. The wrong-answer notebook asks the student to pick **one of six causes**. Those causes are not tags on the question. They are the student's account of why they missed it. The UI label is English. `value` is what is stored on the mistake and what `public.wrong_answers.cause` allows. `id` is the catalogue id.

   | Id | Stored value | What the student sees |
   |---|---|---|
   | `cause.concept_unknown` | `concept_unknown` | Didn't know the concept |
   | `cause.misread_question` | `misread` | Misread the question |
   | `cause.calculation_slip` | `calculation` | Calculation slip |
   | `cause.fell_for_trap` | `trap` | Fell for a trap |
   | `cause.ran_out_of_time` | `time` | Ran out of time |
   | `cause.guessed` | `guessed` | Guessed |

   The student mistakes log shows the cause on each card and a short summary of which causes and which traps come up most often. The parent mistakes card shows the same English cause when one has been picked. Local-only mode keeps working. Server sync still runs only when `NEXT_PUBLIC_SERVER_AUTH` and `NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED` are both on.

2. A parent can assign **3 similar questions** for a mistake. "Similar" means the same leaf skill. If the item has no leaf skill, the same trap ids are used. `src/lib/similarItems.js` and `pickSimilar` in `src/lib/wrongNotebook.js` do that lookup. Certain tags are ordered before uncertain ones. An uncertain tag is not a reason to return nothing when the skill or the trap matches.

## How a question is tagged

Optional fields, omitted when we could not tag the item:

- `conceptIds: string[]` — one or more ids from the catalogue. The most specific leaf is the skill to practise.
- `trapIds: string[]` — only when the item itself shows the trap (the skill, the stem, or a recorded distractor). Most items have no trap id.
- `taxonomyStatus: "certain" | "uncertain"` — `uncertain` means the cue was thin, or the tag is only the parent topic. Still usable for similar questions when it is a leaf skill or a trap. Do not treat a parent-only uncertain tag as a skill.

| Bank | Where the tag lives | How it was produced |
|---|---|---|
| English WA1, 60 sets, including the 8 comprehension questions | Fields on each item in `src/data/p3/english/wa1_practice.ts` | `build_wa1_practice.js` calls `tools/taxonomy/tagItem.js` while it emits. Source JSON is not rewritten. |
| Chinese WA1 and the drill sets | Fields on each item that already has a `skill` | `emit_ts.py` copies `zhSkillToConcept` from the catalogue onto the emitted file. `wa1_zh_complete.json` is not rewritten. The existing `skill` field is still what the ticket engine uses. |
| Past papers, and `comprehension_generated.ts` | Sidecar `src/data/taxonomy/paperTags.json`, keyed by question id | `node tools/taxonomy/index_papers.js`. Those files are hand-authored, or the comprehension generator named in the file header is not in the repo, so the questions themselves are not rewritten. |

`readItemTags` in the helper uses fields on the item first and the sidecar only when the item has no `conceptIds`.

Regenerate after a rule change:

```
node build_wa1_practice.js
python3 emit_ts.py
node tools/taxonomy/index_papers.js
node tools/taxonomy/coverage.js
node --experimental-detect-module tools/taxonomy/selftest.js
```

`node build_wa1_practice.js` still ends with `ALL PASS (0 failures)`. Tagging does not change stems or answers.

## Asking for three similar questions

```js
import { collectQuestions, buildTagIndex, similarQuestions, questionsWithConcept } from '@/lib/similarItems';

const index = buildTagIndex(collectQuestions(practiceSets));
const three = similarQuestions(index, missedItem, { limit: 3 });
// three[i].item is the question; three[i].id is the id used for the lookup

const more = questionsWithConcept(index, 'zh.hanzi.tongyinzi', { excludeIds: [missedItem.id] });
```

A cloze blank often has `num` and no `id`. The helper uses `containerId + "_" + num`, which is the id the English session already stores and the id the Chinese skill bank already uses. The missed item is not returned.

Matching rules:

- A leaf concept is a skill. It matches across editing, MCQ, cloze, and past-paper sections.
- Parent ids (`en.grammar`, `zh.reading`, `zh.hanzi`, and the other ids in `src/data/taxonomy/parents.js`) are not skills.
- If the item has a leaf skill, only that skill is used. Trap ids are not used to fill the list.
- If the item has no leaf skill, trap ids are used. An uncertain BianZi item tagged `zh.hanzi` plus `trap.lookalike` can pull a 形近字 practice item.
- Uncertain rows stay in the pool and sort after certain ones.
- `pickSimilar` only returns questions the practice session can run. Past-paper rows are seeds (so a paper mistake can find practice questions) and are not themselves served as the three similar questions.

`conceptIdsUnder` in `taxonomy.ts` expands a parent id to itself plus every child, for a later "anything under fractions" query. `similarQuestions` does not expand parents on its own.

## Traps (cross-subject)

A trap is a way marks are lost on **this** item, not the cause the student will pick. The notebook cause in the table is the closest of the six, so a screen can suggest a default. The student can still pick a different cause.

| Id | Mark-loss pattern | Nearest notebook cause | Auto-tagged in v1? |
|---|---|---|---|
| `trap.misread_question` | Answered a nearby question (who / when / which person) | misread the question | No. Almost every item can be misread, so it is not applied in bulk. |
| `trap.negation` | "Which is NOT", except, 哪一个不是 | fell for a trap | Yes, when the stem says so |
| `trap.keyword_lift` | A word copied from the passage is the distractor | fell for a trap | Yes, when English comprehension stores `solution.trap` as a real distractor (not just the letter A–D) |
| `trap.unit_conversion` | Wrong unit or a conversion in the wrong direction | calculation slip | No items yet |
| `trap.multi_step_omission` | Stopped after the first step | fell for a trap | No items yet |
| `trap.diagram_misread` | Misread a diagram, table, graph, or picture | fell for a trap | No items yet |
| `trap.lookalike` | 形近字, 同音字, their/there, hear/here, its/it's | fell for a trap | Yes, for those skills and for spelling pairs the tip names |
| `trap.sequence_order` | Events or steps swapped | fell for a trap | Yes, on sequence questions |
| `trap.rule_overgeneralise` | A real rule used outside its condition ("more bigger") | fell for a trap | Yes, when the English tip says so |
| `trap.literal_idiom` | An idiom read word by word | fell for a trap | Yes, on idiom items |
| `trap.extra_number` | Used a number that the question did not need | fell for a trap | No items yet |
| `trap.sign_direction` | Increase/decrease or the sign reversed | fell for a trap | No items yet |
| `trap.partial_answer` | Only half of a two-part answer | fell for a trap | No items yet |

## Concepts

Grain is **topic, then skill**. Levels follow the syllabus year that introduces the skill. PSLE still tests earlier years, so a P3 leaf is in the catalogue on purpose. The banks in the repo today are P3 English and P3 Higher Chinese.

Syllabi this v1 follows:

- MOE Primary English Language Syllabus 2020, plus the PSLE English paper sections (editing, synthesis, visual text, comprehension).
- The 14 Chinese skill ids already stored on the Higher Chinese bank, grouped as 汉字 / 拼音 / 词语 / 语法 / 阅读 / 写话. Antonym, idiom, and composition are neighbours with no items yet.

### English

- `en.grammar` — nouns, pronouns, possessives, articles and determiners, quantifiers, subject–verb agreement, simple present / past / future, present and past continuous, present and past perfect, passive, modals, gerunds and infinitives, question tags, adjectives, adverbs, comparison, prepositions, connectors, conditionals, reported speech, relative clauses, word forms
- `en.vocab` — in context, phrasal verbs, idioms, figurative language, collocation
- `en.language` — editing, editing for spelling, editing for grammar (the task, when the point is not known), synthesis and transformation
- `en.reading` — stated detail, inference, fact-finding, word meaning in the passage, sequence, main idea, true/false, pronoun reference, visual text. `en.reading.open` remains in the catalogue and is not applied.
- `en.writing` — situational writing, continuous writing (no items)

Editing items are tagged with the language point when the tip names it (simple past, subject–verb agreement, spelling), not with the editing task. A past-tense editing error then pulls a past-tense MCQ as a similar question. When the tip does not name a point, the tag is `en.language.editing` (a parent, so not a skill) and `uncertain`. Similar questions for that item use a trap if the item has one.

Open-ended comprehension (`format: "open_sentence"`) is split:

- Fact-finding (`en.reading.fact_finding`) when the tip points at a stated answer: "look for", "list all", "given in paragraph", "own words", "use the details from".
- Inference (`en.reading.inference`) when the tip asks the student to work out a feeling, motive, or lesson ("think about", "do you think", "unusual", "moral"). This is the same skill as an MCQ whose stem starts with "why", so those items match each other.
- `uncertain` when the cues are mixed or thin. A bare "why" with no retrieval cue and no inference cue is inference, uncertain.

MCQ stems that start with "why" stay `en.reading.inference`. Other comprehension MCQs stay `en.reading.detail` and `uncertain` when the stem alone does not show whether the answer is stated or inferred.

### Chinese

Mapped one-to-one from the existing `skill` value. That mapping is `certain`.

| Skill already on the item | Concept id |
|---|---|
| `xingjinzi` | `zh.hanzi.xingjinzi` |
| `tongyinzi` | `zh.hanzi.tongyinzi` |
| `duoyinzi` | `zh.hanzi.duoyinzi` |
| `shengdiao` | `zh.pinyin.shengdiao` |
| `shengmu_yunmu` | `zh.pinyin.shengmu_yunmu` |
| `vocab_in_context` | `zh.ciyu.vocab_in_context` |
| `jinyici` | `zh.ciyu.jinyici` |
| `liangci` | `zh.ciyu.liangci` |
| `dapei` | `zh.ciyu.dapei` |
| `yufa` | `zh.yufa.word_order` |
| `lianci` | `zh.yufa.lianci` |
| `detail` | `zh.reading.detail` |
| `inference` | `zh.reading.inference` |
| `main_idea` | `zh.reading.main_idea` |
| `sequence` | `zh.reading.sequence` |

`xingjinzi` and `tongyinzi` also get `trap.lookalike`. Leaves with no items yet: `zh.ciyu.fanyici`, `zh.ciyu.chengyu`, `zh.writing.composition`. The practice bank has no `sequence` skill items, so `zh.reading.sequence` is unused there.

Past-paper section labels are coarser. When the item's method line names a leaf under that section, the sidecar uses the leaf and marks it `certain`. Otherwise the section default stands. Similar questions still run: a leaf matches other items of that skill, including uncertain ones; a parent-only tag falls back to the trap.

| Paper topic | Tag when the method does not name a leaf | Status |
|---|---|---|
| `PeiDui` | `zh.ciyu.dapei` | certain |
| `JuZi` | `zh.writing.sentence` | certain |
| `BianZi` | `zh.hanzi` + `trap.lookalike` | concept uncertain (形近 or 同音 not known) |
| `PinYin` | `zh.pinyin` | uncertain (tone or initial/final not known) |
| `CiYu` | `zh.ciyu` | uncertain |
| `TianKong` | `zh.ciyu` | uncertain — a cloze may be grammar |
| `KanTu` | `zh.writing.picture` | uncertain — some 看图 items may be vocabulary. This is a leaf, so similar questions still match it. |
| `ZuJu` | `zh.writing.paragraph` | uncertain |
| `YueReadMCQ`, `YueReadOpen` | `zh.reading` | uncertain (detail / inference / main idea not known) |

On this pass the method line moved 108 Chinese paper items off those parent tags onto a leaf (形近字 35, 声母韵母 17, 同音字 12, 搭配 11, 推断 11, 主旨 9, 细节 6, 声调 3, 量词 2, 近义词 2). The rest stay on the section tag.

### Mathematics and Science — out of scope, not used

Math and Science ids remain in `taxonomy.json` with `inScope: false`. No question is tagged with them. Similar-question lookup and the notebook do not use them. Speed, problem-solving heuristics, foundation science, and whether plant reproduction and human reproduction are separate leaves are not decided in v1.

## Coverage (this repo, v1, 2026-11-19)

Counted by `node tools/taxonomy/coverage.js`. Snapshot: `tools/taxonomy/coverage.json`.

| Bank | Questions | Certain | Uncertain | Untagged |
|---|---:|---:|---:|---:|
| English WA1, including comprehension | 2460 | 2101 | 359 | 0 |
| Chinese WA1 | 1920 | 1920 | 0 | 0 |
| Chinese drill | 24 | 24 | 0 | 0 |
| Past papers + generated comprehension sidecar | 4666 unique ids | 2926 | 1740 | 0 tagged leaves |
| Mathematics | 0 | — | — | out of scope, not used |
| Science | 0 | — | — | out of scope, not used |

English WA1 open-ended (60 items, previously all `en.reading.open`):

- `en.reading.fact_finding` — 25 (20 certain, 5 uncertain)
- `en.reading.inference` — 35 (31 certain, 4 uncertain)

English WA1 uncertain (359). The previous 350 parent-or-stem tags are unchanged:

- `en.grammar` — 200 (grammar MCQ or grammar cloze whose tip did not name a point)
- `en.language.editing` — 119 (editing tip did not name spelling or a grammar point)
- `en.reading.detail` — 24 (comprehension MCQ that is not a "why" question; may still be inference)
- `en.language.synthesis` — 7 (synthesis tip did not name the transformation)
- open-ended low confidence — 9 (5 fact-finding, 4 inference)

English WA1 traps: keyword lift 316, sequence 60, lookalike 51, literal idiom 37, negation 37, rule over-generalised 32.

Chinese WA1 traps: lookalike 298 (every 形近字 and 同音字 item). No other trap was clear enough to add.

Past-paper sidecar: English 2502 certain / 860 uncertain; Chinese 424 certain / 880 uncertain. The English shift from the previous 2521 / 841 is the 46 generated open-ended items leaving `en.reading.open` (17 fact-finding, of which 5 uncertain; 29 inference, of which 14 uncertain). The Chinese shift from 316 / 988 is the 108 method-named leaves above. `en.reading.open` is unused.

**Left untagged on purpose (16 ids).** The same id appears in two paper files, so one sidecar entry would be ambiguous. They are listed on `paperTags.unresolvedDuplicateIds` and are not given a tag. This approval does not rename them.

- `p3_zh_eoy_nh_005`, `013`, `017`, `018`, `021`, `022` shared by `eoy_NanHua_Paper2_2025.ts` and `eoy_nanhua_higher_paper2_2025.ts`
- `p3_zh_eoy_nh_023` through `027` shared by `eoy_NanHua_Paper2_2025.ts` and `eoy_nanhua_2021_paper1.ts`
- `rulang2024-q11` through `q15` shared by `minitest1_rulang_primary_english_2024.ts` and `wa2_rulang_englishpaper_2024.ts`

In-scope leaves with **no tagged question** today: `en.writing.situational`, `en.writing.continuous`, `en.vocab.collocation`, `en.language.editing_grammar`, `en.grammar.word_form`, `en.reading.main_idea`, `en.reading.open` (kept, not applied), `zh.ciyu.fanyici`, `zh.ciyu.chengyu`, `zh.reading.sequence`, `zh.writing.composition`. Parent ids that are only used as containers (`en.vocab`, `en.language`, `zh.yufa`, `zh.writing`) are also unused as tags. Items are tagged with a skill or, when the skill is unknown, with the section parent the rules actually chose (`en.grammar`, `zh.hanzi`, `zh.reading`, and so on). Every math id and every science id is out of scope and unused.
