// types.ts  (src/data/p3/chinese/types.ts)
// Restores the module imported by papers/wa3/*.ts:
//   import type { Question } from "@/data/p3/chinese/types";
// Never existed before; import survived because `import type` is erased.
// DELIBERATELY PERMISSIVE: past-paper items are a loose union consumed by
// src/lib/p3PaperBridge.js. Tightening is a separate task (past-paper schema
// cleanup). The 60-set WA1 track uses schema.ts, which IS strict.
import type { ZhSkillTag } from './schema';

export type PaperDifficulty = 'foundation' | 'core' | 'stretch';

export interface Question {
  id: string;
  topic: string;
  difficulty?: PaperDifficulty;
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
  [key: string]: unknown;
}

export type PaperMeta = Record<string, unknown>;
