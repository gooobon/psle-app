# WA3 — P3 Higher Chinese Past Papers

Source: **sgexam.com** P3 Chinese WA3 compilation PDF  
Extracted & converted by: Claude (Genius Project pipeline)

---

## File structure

```
src/data/p3/chinese/
├── types.ts                          ← shared Question / SubQuestion types
└── papers/
    └── wa3/
        ├── index.ts                  ← barrel: allWa3Questions + wa3BySchool
        ├── README.md                 ← this file
        │
        ├── wa3_peichun_term2_2025.ts       (18 qs — 公立培群 T2)
        ├── wa3_peichun_term3_2025.ts       (13 qs — 公立培群 T3)
        ├── wa3_taonan_supp5_2025.ts        (33 qs — 道南 2023 补充五)
        ├── wa3_redswastika_rev3_2025.ts    (25 qs — 卍慈 复习三)
        ├── wa3_taonan_supp3_2024.ts        (33 qs — 道南 2024 补充三)
        ├── wa3_chijstnicholas_rev3_2025.ts (27 qs — 圣尼各拉 复习三)
        ├── wa3_taonan_wa3_2025.ts          (33 qs — 道南 2025 WA3)
        └── wa3_chijstnicholas_rev4_2025.ts (27 qs — 圣尼各拉 复习四)
```

Total: **211 question items** (standalone + set wrappers)

---

## Topics covered

| Code | Chinese | Description |
|------|---------|-------------|
| `PinYin` | 汉语拼音 | Choose / write correct pinyin |
| `BianZi` | 辨字测验 / 改正错字 / 填写汉字 | Character discrimination & correction |
| `CiYu` | 词语选择 / 选择句子 | Vocabulary & usage MCQ |
| `KanTu` | 看图选词 | Match image to word |
| `PeiDui` | 词语搭配 | Collocation matching |
| `TianKong` | 短文填空 | Cloze passage (set type) |
| `JuZi` | 组合/扩写/改写/仿写句子 | Sentence manipulation |
| `ZuJu` | 组句成段 | Sentence ordering into paragraph |
| `YueReadMCQ` | 阅读理解 (选择) | Passage comprehension — MCQ |
| `YueReadOpen` | 阅读理解 (问答) | Passage comprehension — written answer |

---

## Usage

```ts
// All WA3 questions flat
import { allWa3Questions } from "@/data/p3/chinese/papers/wa3";

// Single paper
import { wa3_taonan_wa3_2025 } from "@/data/p3/chinese/papers/wa3";

// By school
import { wa3BySchool } from "@/data/p3/chinese/papers/wa3";
const taonanQs = wa3BySchool.taonan;

// Type helpers
import { isSetQuestion, isStandaloneQuestion } from "@/data/p3/chinese/types";
```

---

## Schema notes

Every question carries mandatory `pinyin`, `meaning`, and `solution` fields  
for the SM-2 spaced-repetition review card renderer.

### Optional flags

| Field | Type | Purpose |
|-------|------|---------|
| `needsParentVerify` | `boolean` | Marks items where the PDF answer key OCR was misaligned; model answers are grammatically correct but should be double-checked against a physical copy |
| `wordBank` | `string[]` | Word bank array for 短文填空 / 词语搭配 set questions |

---

## ⚠ needsParentVerify items

`wa3_taonan_supp3_2024.ts` — Q12–16 (词语搭配) and Q22–24 (短文填空) carry this flag.  
The PDF answer key page was misaligned (2025 key printed on 2024 page); model answers  
are based on standard Chinese grammar and should be verified against the original paper.

All other papers have been cross-checked against the printed answer keys in the PDF.
