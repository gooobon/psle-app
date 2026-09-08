// ============================================================
// types.ts  (src/data/p3/chinese/types.ts)
// Restores the module imported by papers/wa3/*.ts:
//   import type { Question } from "@/data/p3/chinese/types";
// This file never existed; the import survived because `import type`
// is erased at build time. Restored in Step 1 so `npm run typecheck`
// can run at all.
//
// DELIBERATELY PERMISSIVE. Past-paper items (papers/wa1|wa2|wa3|eoy)
// are a loose union of English/Chinese shapes consumed by
// src/lib/p3PaperBridge.js (q, question, stem, sentence, options,
// answer, solution, hints, tiles, wordBank, items, ...). Tightening
// this type is a separate task (past-paper schema cleanup), not Step 1.
// The 60-set WA1 practice track uses schema.ts, which IS strict.
// ============================================================

import type { ZhSkillTag } from './schema';

export type PaperDifficulty = 'foundation' | 'core' | 'stretch';

export interface Question {
  id: string;
  topic: string;                 // e.g. 'BianZi' | 'CiYu' | 'ZuJu' | 'YueRead' | ...
  difficulty?: PaperDifficulty;
  // common content fields (not all present on every item)
  q?: string;
  question?: string;
  stem?: string;
  sentence?: string;
  instruction?: string;
  options?: string[];
  answer?: string | number | number[] | string[];
  explanation?: string;
  hints?: string[];
  hint?: string;
  pinyin?: string;
  meaning?: string;
  skill?: ZhSkillTag | string;
  solution?: Record<string, unknown>;
  // anything else the bridge reads today
  [key: string]: unknown;
}

export type PaperMeta = Record<string, unknown>;
