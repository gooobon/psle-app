// ============================================================================
// Genius Project — WA3 Chinese Papers: Barrel Export
// src/data/p3/chinese/papers/wa3/index.ts
//
// Re-exports every WA3 paper array and provides a combined flat array
// `allWa3Questions` for use with the SM-2 / IndexedDB question store.
//
// Usage:
//   import { allWa3Questions } from "@/data/p3/chinese/papers/wa3";
//   import { wa3_peichun_term2_2025 } from "@/data/p3/chinese/papers/wa3";
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

// ── individual paper arrays ─────────────────────────────────────────────────

export { default as wa3_peichun_term2_2025 } from "./wa3_peichun_term2_2025";
// 公立培群学校 第二学段测试 — 18 questions
// Topics: BianZi, CiYu, YueReadMCQ, JuZi, YueReadOpen

export { default as wa3_peichun_term3_2025 } from "./wa3_peichun_term3_2025";
// 公立培群学校 第三学段测试 — 13 questions
// Topics: ZuJu, PeiDui, KanTu, YueReadOpen

export { default as wa3_taonan_supp5_2025 } from "./wa3_taonan_supp5_2025";
// 道南学校 2023 补充作业(五) 第九课至第十课 — 33 questions
// Topics: BianZi, PinYin, CiYu, PeiDui, JuZi, TianKong, YueReadMCQ, YueReadOpen

export { default as wa3_redswastika_rev3_2025 } from "./wa3_redswastika_rev3_2025";
// 卍慈学校 复习(三) 第七课至第十一课 — 25 questions
// Topics: BianZi, CiYu, ZuJu, PeiDui, JuZi, YueReadMCQ, YueReadOpen

export { default as wa3_taonan_supp3_2024 } from "./wa3_taonan_supp3_2024";
// 道南学校 2024 补充作业(三) 第五课至第六课 — 33 questions
// Topics: BianZi, PinYin, CiYu, PeiDui, JuZi, TianKong, YueReadMCQ, YueReadOpen
// ⚠ Some PeiDui/TianKong items carry needsParentVerify:true (OCR key mismatch)

export { default as wa3_chijstnicholas_rev3_2025 } from "./wa3_chijstnicholas_rev3_2025";
// 圣尼各拉女校 2025 复习(三) 第九课至第十二课 — 27 questions
// Topics: BianZi (改正错字+填写汉字), PinYin, CiYu, YueReadMCQ

export { default as wa3_taonan_wa3_2025 } from "./wa3_taonan_wa3_2025";
// 道南学校 2025 WA3 第五课至第六课 — 33 questions
// Topics: BianZi, PinYin, CiYu, PeiDui, JuZi, TianKong, YueReadMCQ, YueReadOpen

export { default as wa3_chijstnicholas_rev4_2025 } from "./wa3_chijstnicholas_rev4_2025";
// 圣尼各拉女校 2025 复习(四) 第十三课至第十七课 — 27 questions
// Topics: BianZi (改正错字+填写汉字), PinYin, CiYu, YueReadMCQ

// ── combined array (lazy-loaded to avoid circular deps) ────────────────────

import wa3_peichun_term2_2025   from "./wa3_peichun_term2_2025";
import wa3_peichun_term3_2025   from "./wa3_peichun_term3_2025";
import wa3_taonan_supp5_2025    from "./wa3_taonan_supp5_2025";
import wa3_redswastika_rev3_2025 from "./wa3_redswastika_rev3_2025";
import wa3_taonan_supp3_2024    from "./wa3_taonan_supp3_2024";
import wa3_chijstnicholas_rev3_2025 from "./wa3_chijstnicholas_rev3_2025";
import wa3_taonan_wa3_2025      from "./wa3_taonan_wa3_2025";
import wa3_chijstnicholas_rev4_2025 from "./wa3_chijstnicholas_rev4_2025";

/** Flat array of every WA3 question across all 8 papers (211 items). */
export const allWa3Questions: Question[] = [
  ...wa3_peichun_term2_2025,
  ...wa3_peichun_term3_2025,
  ...wa3_taonan_supp5_2025,
  ...wa3_redswastika_rev3_2025,
  ...wa3_taonan_supp3_2024,
  ...wa3_chijstnicholas_rev3_2025,
  ...wa3_taonan_wa3_2025,
  ...wa3_chijstnicholas_rev4_2025,
];

// ── per-school groupings (convenience) ─────────────────────────────────────

export const wa3BySchool = {
  peichun:       [...wa3_peichun_term2_2025,        ...wa3_peichun_term3_2025],
  taonan:        [...wa3_taonan_supp5_2025,         ...wa3_taonan_supp3_2024, ...wa3_taonan_wa3_2025],
  redSwastika:   [...wa3_redswastika_rev3_2025],
  chijStNicholas:[...wa3_chijstnicholas_rev3_2025,  ...wa3_chijstnicholas_rev4_2025],
} as const satisfies Record<string, Question[]>;
