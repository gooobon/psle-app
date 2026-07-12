// ============================================================
// zh_wa1_schema.ts  (P3 Chinese WA1 - Step 1)
// Data schema for the Chinese WA1 practice pipeline.
// Field names are intentionally identical to the English WA1
// schema wherever a renderer in ExamSession.js reads them
// (sentence/options/answer/explanation, passage/wordBank/blanks,
//  questions[].format, sentenceA/instruction/answer/marks).
// Target location in repo: src/data/p3/chinese/schema.ts
// NOTE: code and comments are ASCII-only; Chinese appears only
// inside content strings at runtime.
// ============================================================

// ---------- section types ----------
// Phase 1 (auto-graded, live first): HanziMcq, PinyinMcq, VocabMcq,
//   VocabMatch, PassageCloze, ReadingMcq
// Phase 2: ReadingOpen, SentenceCraft, SentenceMcq, SentenceOrder,
//   ErrorCorrection, CharWrite
// Phase 3 (asset-dependent): PictureVocabMcq, PictureComposition, StrokeOrder
export type ZhSectionType =
  | 'HanziMcq'
  | 'PinyinMcq'
  | 'VocabMcq'
  | 'VocabMatch'
  | 'PassageCloze'
  | 'ReadingMcq'
  | 'ReadingOpen'
  | 'SentenceCraft'
  | 'SentenceMcq'
  | 'SentenceOrder'
  | 'ErrorCorrection'
  | 'CharWrite'
  | 'PictureVocabMcq'
  | 'PictureComposition'
  | 'StrokeOrder';

// Canonical 8-section plan order for every practice set.
// Phase 1 renders only the sections listed in ZH_PHASE1_SECTIONS.
export const ZH_SECTION_ORDER: ZhSectionType[] = [
  'HanziMcq',
  'PinyinMcq',
  'VocabMcq',
  'VocabMatch',
  'SentenceCraft',
  'PassageCloze',
  'ReadingMcq',
  'ReadingOpen',
];

export const ZH_PHASE1_SECTIONS: ZhSectionType[] = [
  'HanziMcq', 'PinyinMcq', 'VocabMcq', 'VocabMatch', 'PassageCloze', 'ReadingMcq',
];

// ---------- pedagogy: explanation object (first-class data) ----------
// Every auto-graded item must carry a complete ZhExplain. A composed
// plain-text `explanation` string is also emitted for the current
// ExplanationBox renderer; the structured object enables a richer
// renderer later without regenerating data.
export interface ZhExplain {
  why: string;            // why the answer is correct (quote the context clue)
  distractors: string[];  // same length as options; why each wrong option fails
                          // (entry at the answer index may restate `why` briefly)
  trapType: ZhSkillTag;   // the trap being trained
  memoryTip: string;      // short mnemonic the student should retain
}

// Skill / trap taxonomy (ASCII ids; used by adaptive engine remediation).
export type ZhSkillTag =
  | 'xingjinzi'      // visually similar characters
  | 'tongyinzi'      // homophones
  | 'duoyinzi'       // multi-reading characters
  | 'shengdiao'      // pinyin tone
  | 'shengmu_yunmu'  // pinyin initial/final confusion
  | 'dapei'          // collocation
  | 'jinyici'        // near-synonym discrimination
  | 'lianci'         // connectives
  | 'liangci'        // measure words
  | 'yufa'           // grammar / word order
  | 'detail'         // reading: stated detail
  | 'inference'      // reading: inference
  | 'sequence'       // reading: event order
  | 'main_idea'      // reading: gist / lesson of story
  | 'vocab_in_context';

// MOE P3 HCL WA1 curriculum window (textbook lessons covered by WA1).
export const ZH_LESSON_MIN = 1;
export const ZH_LESSON_MAX = 4;

// ---------- MCQ family: HanziMcq / PinyinMcq / VocabMcq / SentenceMcq ----------
// Rendered by MCQPage unchanged.
export interface ZhMcqItem {
  id: string;
  topic: ZhSectionType;
  sentence: string;          // blank shown as ______ ; underlined target as {u}word{/u}
  options: string[];         // length 3..4 (varies by school style)
  answer: number;            // 0-based index
  explanation?: string;      // composed from explain; consumed by ExplanationBox
  explain: ZhExplain;
  lesson: number;            // 1..4
  skill: ZhSkillTag;
  variant?: 'list' | 'inline'; // exam presentation style; renderer hint only
}

// ---------- pool matching: VocabMatch (and pool-variant VocabMcq) ----------
// New small renderer (MatchPage) in Phase 1.
export interface ZhMatchItem {
  num: number;
  stem: string;              // blank marked with parentheses in stem
  answer: number;            // index into pool
  explanation?: string;
  explain: ZhExplain;
  lesson: number;
  skill: ZhSkillTag;
}
export interface ZhMatchSet {
  id: string;
  instruction: string;
  pool: string[];            // options box; each entry used at most once
  items: ZhMatchItem[];
}

// ---------- passage cloze: PassageCloze ----------
// Identical shape to English ClozeSet; rendered by ClozePage unchanged.
export interface ZhClozeBlank {
  num: number;
  answer: string;            // must exist in wordBank
  hint?: string;
  explanation?: string;
  explain: ZhExplain;
  lesson: number;
  skill: ZhSkillTag;
}
export interface ZhClozeSet {
  id: string;
  passage: string;           // blanks marked as (n) ___ (3+ underscores)
  wordBank: string[];
  blanks: ZhClozeBlank[];
}

// ---------- reading: ReadingMcq / ReadingOpen ----------
// Same container shape as English CompSet; rendered by CompPage.
// format strings reuse the English CompPage vocabulary where possible.
export type ZhCompFormat =
  | 'mcq'            // choose 1 of 3..4
  | 'sequence'       // order the sentences (paixu)
  | 'fill_word'      // find the word in the passage (zhaoci)
  | 'open_sentence'  // free-text answer (wenda)
  | 'fill_table';    // complete the table (tianbiao) - Phase 2 renderer

export interface ZhCompQuestion {
  id: string;
  questionNo?: string | number;
  format: ZhCompFormat;
  marks?: number;
  stem: string;
  answer: any;               // mcq: number | sequence: number[] |
                             // fill_word: string | open_sentence: string (model answer) |
                             // fill_table: string[] (one per row)
  acceptableAnswers?: string[];
  options?: string[];        // mcq only; length 3..4
  sequenceItems?: string[];  // sequence only
  statements?: string[];     // fill_table row labels
  solution?: Record<string, any>;
  explanation?: string;
  explain?: ZhExplain;       // required for auto-graded formats (mcq/sequence/fill_word)
  lesson?: number;
  skill?: ZhSkillTag;
}
export interface ZhCompSet {
  id: string;
  passage: string;
  questions: ZhCompQuestion[];
}

// ---------- free production: SentenceCraft (Phase 2) ----------
// Field names mirror English SynthItem; rendered by SynthesisPage.
export type ZhCraftSubtype = 'combine' | 'expand' | 'rewrite' | 'make_sentence';
export interface ZhCraftItem {
  id: string;
  subtype: ZhCraftSubtype;
  connector?: string;        // e.g. a paired connective to be used
  sentenceA: string;
  sentenceB?: string;        // present for combine
  starter?: string;
  instruction: string;
  answer: string;            // model answer
  answerSimple?: string;
  hint?: string;
  explanation?: string;
  explain?: ZhExplain;       // pedagogy: why the model answer works + memoryTip;
                             // trapType is normally 'lianci' for guanlian-ci zao ju.
                             // distractors optional (no options).
  skill?: ZhSkillTag;        // enables bottleneck tagging (e.g. 'lianci')
  marks: number;
  lesson: number;
}

// ---------- sentence ordering: SentenceOrder (Phase 2) ----------
export interface ZhOrderSet {
  id: string;
  instruction: string;
  sentences: string[];       // shuffled as displayed
  answer: number[];          // correct order as indexes into sentences
  explanation?: string;
  explain?: ZhExplain;
  lesson: number;
}

// ---------- error correction: ErrorCorrection (Phase 2) ----------
export interface ZhErrorItem {
  num: number;
  sentence: string;          // contains exactly one wrong character
  wrongChar: string;
  correction: string;
  explanation?: string;
  explain?: ZhExplain;
  lesson: number;
  skill: ZhSkillTag;
}
export interface ZhErrorSet { id: string; items: ZhErrorItem[]; }

// ---------- character writing: CharWrite (Phase 2) ----------
export interface ZhCharWriteItem {
  id: string;
  subtype: 'pinyin_to_hanzi' | 'hanzi_to_pinyin';
  sentence: string;          // blank boxes marked as ______
  prompt: string;            // the given pinyin (or hanzi)
  answer: string;
  explanation?: string;
  lesson: number;
}

// ---------- Phase 3 placeholders (asset-dependent) ----------
export interface ZhPictureVocabItem {
  id: string; imageRef: string; options: string[]; answer: number;
  explanation?: string; explain?: ZhExplain; lesson: number;
}
export interface ZhPictureCompositionItem {
  id: string; imageRefs: string[]; minChars: number;
  referenceWords: string[]; modelAnswer: string; marks: number;
}
export interface ZhStrokeOrderItem {
  id: string; char: string; ask: 'stroke_count' | 'stroke_order' | 'pinyin';
  answer: string | number; lesson: number;
}

// ---------- set container (compatible with English PracticeSet) ----------
export type ZhSectionItems =
  | ZhMcqItem[] | ZhMatchSet[] | ZhClozeSet[] | ZhCompSet[]
  | ZhCraftItem[] | ZhOrderSet[] | ZhErrorSet[] | ZhCharWriteItem[]
  | ZhPictureVocabItem[] | ZhPictureCompositionItem[] | ZhStrokeOrderItem[];

export interface ZhPlanSection {
  type: ZhSectionType;
  items: ZhSectionItems;
  marks: number;
  variant?: 'mcq4' | 'pool'; // VocabMcq presentation rotation
}

export type ZhBand = 'easy' | 'mid' | 'hard';

export interface ZhPracticeSet {
  setId: string;             // ZS01..ZS60
  theme: string;
  track: 'HCL';
  band: ZhBand;              // metadata for generation QA; engine still
                             // computes live difficulty from accuracy
  seedSources: string[];     // provenance tags, e.g. 'rulang_2024_wa1'
  plan: ZhPlanSection[];     // fixed ZH_SECTION_ORDER
}

// Band boundaries by set number (S01-20 easy, 21-40 mid, 41-60 hard).
export function bandForSetNumber(n: number): ZhBand {
  if (n <= 20) return 'easy';
  if (n <= 40) return 'mid';
  return 'hard';
}
