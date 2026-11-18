# Concept and trap taxonomy — v1 DRAFT

**Status: DRAFT. Needs owner approval before anything in the app uses these ids.**

This is the catalogue for later work, not a student-facing change. Question text and answers are unchanged. Nothing here reads or writes localStorage. The student UI is not wired to these tags.

The machine-readable source of truth is `src/data/taxonomy/taxonomy.json` (typed helpers in `src/data/taxonomy/taxonomy.ts`). If this page and the JSON ever disagree, trust the JSON and update this page.

Ids are stable. Add a new id when a leaf is missing. Do not rename an id that has already been written onto items. A renamed id would orphan every tag and every future notebook entry that points at it.

## What the ids are for

Two later features need the same ids:

1. The wrong-answer notebook will ask the student to pick **one of six causes**. Those causes are not tags on the question. They are the student's account of why they missed it. The ids are fixed now so the notebook does not invent a second list:

   | Id | What the student picks |
   |---|---|
   | `cause.concept_unknown` | I did not know the concept |
   | `cause.misread_question` | I misread the question |
   | `cause.calculation_slip` | I made a calculation slip |
   | `cause.fell_for_trap` | I fell for a trap |
   | `cause.ran_out_of_time` | I ran out of time |
   | `cause.guessed` | I guessed |

2. A parent will be able to assign **3 similar questions** for a mistake. "Similar" means the same concept id, then the same trap id if there are not three concept matches. `src/lib/similarItems.js` does that lookup. It is not imported by any screen.

## How a question is tagged

Optional fields, omitted when we could not tag the item:

- `conceptIds: string[]` — one or more ids from the catalogue. The most specific id is the one to practise.
- `trapIds: string[]` — only when the item itself shows the trap (the skill, the stem, or a recorded distractor). Most items have no trap id.
- `taxonomyStatus: "certain" | "uncertain"` — `uncertain` means the tag is only the parent topic, or the stem could be read two ways. Still queryable. Do not treat it as owner-approved.

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

`node build_wa1_practice.js` still ends with `ALL PASS (0 failures)`. The answer checksum of the English practice file (answer + stem text) matched before and after tagging.

## Asking for three similar questions

```js
import { collectQuestions, buildTagIndex, similarQuestions, questionsWithConcept } from '@/lib/similarItems';

const index = buildTagIndex(collectQuestions(practiceSets));
const three = similarQuestions(index, missedItem, { limit: 3 });
// three[i].item is the question; three[i].id is the id used for the lookup

const more = questionsWithConcept(index, 'zh.hanzi.tongyinzi', { excludeIds: [missedItem.id] });
```

A cloze blank often has `num` and no `id`. The helper uses `containerId + "_" + num`, which is the id the English session already stores and the id the Chinese skill bank already uses. Certain tags are returned before uncertain ones. The missed item is not returned.

`conceptIdsUnder` in `taxonomy.ts` expands a parent id to itself plus every child, for a later "anything under fractions" query. `similarQuestions` does not expand parents on its own. It uses the ids actually stored on the item.

## Traps (cross-subject)

A trap is a way marks are lost on **this** item, not the cause the student will pick. The notebook cause in the table is the closest of the six, so a later screen can suggest a default. The student can still pick a different cause.

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

Grain is **topic, then skill**. Levels follow the syllabus year that introduces the skill. PSLE still tests earlier years, so a P3 leaf is in the catalogue on purpose. The banks in the repo today are P3 English and P3 Higher Chinese. Mathematics and Science have catalogue leaves and **no questions**.

Syllabi this draft follows:

- MOE Primary English Language Syllabus 2020, plus the PSLE English paper sections (editing, synthesis, visual text, comprehension).
- The 14 Chinese skill ids already stored on the Higher Chinese bank, grouped as 汉字 / 拼音 / 词语 / 语法 / 阅读 / 写话. Antonym, idiom, and composition are neighbours with no items yet.
- MOE 2021 Primary Mathematics Syllabus, three strands. Ratio and algebra are the P6 standard sub-strands. Speed is not given its own id. **TODO(owner):** rate already covers rate problems; say if parents still need a separate speed id.
- MOE Primary Science Syllabus 2023, Table 2 (updated Jan 2026): Diversity, Cycles, Systems, Energy, Interactions. **TODO(owner):** plant reproduction and human reproduction are separate leaves under one syllabus topic. Foundation cuts are not separate ids. Elastic spring force is labelled standard-course only.

Problem-solving heuristics (model drawing, before-after, working backwards, assumption) are **not** concepts in v1. **TODO(owner):** confirm they stay out. A before-after mistake is still a fraction or ratio concept plus, later, a trap such as `trap.multi_step_omission`.

### English

- `en.grammar` — nouns, pronouns, possessives, articles and determiners, quantifiers, subject–verb agreement, simple present / past / future, present and past continuous, present and past perfect, passive, modals, gerunds and infinitives, question tags, adjectives, adverbs, comparison, prepositions, connectors, conditionals, reported speech, relative clauses, word forms
- `en.vocab` — in context, phrasal verbs, idioms, figurative language, collocation
- `en.language` — editing, editing for spelling, editing for grammar (the task, when the point is not known), synthesis and transformation
- `en.reading` — stated detail, inference, word meaning in the passage, sequence, main idea, true/false, pronoun reference, visual text, open-ended
- `en.writing` — situational writing, continuous writing (no items)

Editing items are tagged with the language point when the tip names it (simple past, subject–verb agreement, spelling), not with the editing task. A past-tense editing error can then pull a past-tense MCQ as a similar question. **TODO(owner):** confirm that cross-section match is what parents should get. When the tip does not name a point, the tag is `en.language.editing` and `uncertain`.

Open-ended comprehension is `en.reading.open` for every item of that format. Detail versus inference is not split. **TODO(owner).** MCQ stems that start with "why" are `en.reading.inference`. Other comprehension MCQs are `en.reading.detail` and `uncertain`, because the stem alone does not show whether the answer is stated or inferred.

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

Past-paper section labels are coarser. **TODO(owner)** before a parent assigns "3 more" from these:

| Paper topic | Tag | Status |
|---|---|---|
| `PeiDui` | `zh.ciyu.dapei` | certain |
| `JuZi` | `zh.writing.sentence` | certain |
| `BianZi` | `zh.hanzi` + `trap.lookalike` | concept uncertain (形近 or 同音 not known) |
| `PinYin` | `zh.pinyin` | uncertain (tone or initial/final not known) |
| `CiYu` | `zh.ciyu` | uncertain |
| `TianKong` | `zh.ciyu` | uncertain — a cloze may be grammar |
| `KanTu` | `zh.writing.picture` | uncertain — some 看图 items may be vocabulary |
| `ZuJu` | `zh.writing.paragraph` | uncertain |
| `YueReadMCQ`, `YueReadOpen` | `zh.reading` | uncertain (detail / inference / main idea not known) |

### Mathematics (no items in the repo)

- Number and algebra: whole numbers, fractions, decimals, percentage, ratio, rate, algebra
- Measurement: units (length, mass, volume, conversion), time, money, area and perimeter, volume of cube and cuboid, circle
- Geometry: angles, triangles, quadrilaterals, line symmetry, nets
- Statistics: tables and graphs (bar, line, pie), average

### Science (no items in the repo)

- Diversity: living and non-living things, materials (P3)
- Cycles: life cycles (P3), plant reproduction (P5), human reproduction (P5), matter (P4), water (P5)
- Systems: plant parts (P4), plant transport (P5), digestive (P4), respiratory (P5), circulatory (P5), electrical (P5)
- Energy: light (P4), heat (P4), photosynthesis (P6), energy conversion (P6)
- Interactions: magnets (P3), friction (P6), gravity (P6), elastic spring force (P6, standard), environment (P6)

## Coverage (this repo, v1)

Counted by `node tools/taxonomy/coverage.js`. Snapshot: `tools/taxonomy/coverage.json`.

| Bank | Questions | Certain | Uncertain | Untagged |
|---|---:|---:|---:|---:|
| English WA1, including comprehension | 2460 | 2110 | 350 | 0 |
| Chinese WA1 | 1920 | 1920 | 0 | 0 |
| Chinese drill | 24 | 24 | 0 | 0 |
| Past papers + generated comprehension sidecar | 4666 unique ids | 2837 | 1829 | 0 tagged leaves |
| Mathematics | 0 | 0 | 0 | no bank |
| Science | 0 | 0 | 0 | no bank |

English WA1 uncertain (350), all of them a parent id rather than a skill:

- `en.grammar` — 200 (grammar MCQ or grammar cloze whose tip did not name a point)
- `en.language.editing` — 119 (editing tip did not name spelling or a grammar point)
- `en.reading.detail` — 24 (comprehension MCQ that is not a "why" question; may still be inference)
- `en.language.synthesis` — 7 (synthesis tip did not name the transformation)

English WA1 traps: keyword lift 316, sequence 60, lookalike 51, literal idiom 37, negation 37, rule over-generalised 32.

Chinese WA1 traps: lookalike 298 (every 形近字 and 同音字 item). No other trap was clear enough to add.

Past-paper sidecar: English 2521 certain / 841 uncertain; Chinese 316 certain / 988 uncertain. The Chinese uncertain count is the parent-topic table above.

**Left untagged on purpose (16 ids).** The same id appears in two paper files, so one sidecar entry would be ambiguous. They are listed on `paperTags.unresolvedDuplicateIds` and are not given a tag:

- `p3_zh_eoy_nh_005`, `013`, `017`, `018`, `021`, `022` shared by `eoy_NanHua_Paper2_2025.ts` and `eoy_nanhua_higher_paper2_2025.ts`
- `p3_zh_eoy_nh_023` through `027` shared by `eoy_NanHua_Paper2_2025.ts` and `eoy_nanhua_2021_paper1.ts`
- `rulang2024-q11` through `q15` shared by `minitest1_rulang_primary_english_2024.ts` and `wa2_rulang_englishpaper_2024.ts`

**TODO(owner):** these ids collide. This draft does not rename them, because a stored result may already use the id. Give them distinct ids in a later change that migrates any saved attempts.

Leaves in the catalogue with **no tagged question** today: every mathematics id, every science id, `en.writing.situational`, `en.writing.continuous`, `en.vocab.collocation`, `en.language.editing_grammar`, `en.grammar.word_form`, `en.reading.main_idea`, `zh.ciyu.fanyici`, `zh.ciyu.chengyu`, `zh.reading.sequence`, `zh.writing.composition`. Parent ids that are only used as containers (`en.vocab`, `en.language`, `zh.yufa`, `zh.writing`, and the math/science parents) are also unused as tags, which is what we want: items are tagged with a skill or, when we are unsure, with the subject parent that the rules actually chose (`en.grammar`, `zh.hanzi`, `zh.reading`, and so on).

## TODO(owner) — decisions this draft does not close

1. Approve the leaf list, or mark leaves to merge or split, before the notebook ships.
2. English editing tagged by language point, so similar questions can cross into MCQ. Confirm.
3. `en.reading.open` is not split into detail and inference. Confirm.
4. Comprehension `solution.trap` becomes `trap.keyword_lift`. Narrow this if some of those strings are explanations rather than the distractor the child fell for.
5. Chinese past-paper tags in the table above are section-level. Do not assign "3 similar" from an uncertain parent until the section is split.
6. `TianKong` tagged as `zh.ciyu` uncertain, and `KanTu` tagged as `zh.writing.picture` uncertain. Both may be the wrong parent for some items.
7. Sixteen duplicate paper ids are untagged. Do not rename them without a migration.
8. No separate speed id. Heuristics are not concepts. Foundation science is not a second tree. Confirm.
9. Plant reproduction and human reproduction are two ids under one syllabus topic. Confirm.
