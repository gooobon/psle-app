/**
 * Split QuizEngine.js into:
 *   EnglishSession.js   — SessionScreen + English sub-components
 *   ChineseSession.js   — ZhSessionScreen + Chinese sub-components
 *   sessionUtils.js     — shared helpers (scoreBadge, TapWord, OptionsGlossary …)
 *   QuizEngine.js       — thin re-export hub
 */
import { readFileSync, writeFileSync } from 'fs';

const src   = readFileSync('src/components/QuizEngine.js', 'utf8');
const lines = src.split('\n');

function ln(str)  { return lines.findIndex(l => l.includes(str)); }
function lnStart(str) { return lines.findIndex(l => l.trimStart().startsWith(str)); }

// ── Boundary detection ───────────────────────────────────────
const iZhStart   = lnStart('function BianZiSection(');     // start of Chinese block
const iShared    = lnStart('function TapWord(');           // start of shared UI
const iEnStart   = lnStart('function SessionScreen(');     // start of English block
const iExport    = lnStart('export { SECTIONS');           // first export line

console.log(`Boundaries:
  Chinese block starts  : line ${iZhStart+1}
  SharedUI (TapWord)    : line ${iShared+1}
  English block starts  : line ${iEnStart+1}
  Exports start         : line ${iExport+1}
  Total lines           : ${lines.length}`);

// ── Slice regions ────────────────────────────────────────────
const sharedFnsBlock  = lines.slice(12, iZhStart);          // reviewDays…mistakeWeight
const chineseBlock    = lines.slice(iZhStart, iShared);     // BianZi…ZhSessionScreen
const sharedUIBlock   = lines.slice(iShared, iEnStart);     // TapWord, OptionsGlossary
const englishBlock    = lines.slice(iEnStart, iExport - 1); // SessionScreen…SummaryScreen

// ── Helpers ──────────────────────────────────────────────────
const HEADER_SHARED = `"use client";
import React, { useState, useRef } from "react";
import {
  C, TTS, SpeakBtn, SFX,
  Wrap, TagPill, ActionBtn, HintBox, FeedbackBox, LearnCard, RevealBox, WrongBanner, RuleCard,
} from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER, ZH_SECTIONS, ZH_SECTION_ORDER, WORD_DICT, SYN_ANT, ZH_CHAR_DICT, shuffle, seededShuffle } from "@/lib/quizMeta";
`;

// ── sessionUtils.js ──────────────────────────────────────────
const sessionUtilsContent = `"use client";
import React from "react";
import { C, TTS } from "@/lib/uiShared";
import { WORD_DICT, SYN_ANT, ZH_CHAR_DICT } from "@/lib/quizMeta";

${sharedFnsBlock.join('\n')}
${sharedUIBlock.join('\n')}
export { reviewDays, scoreBadge, fmtTime, guessFlag, todayStr, dateLabel, TapWord, OptionsGlossary };
`;

writeFileSync('src/lib/sessionUtils.js', sessionUtilsContent, 'utf8');
console.log('✓ src/lib/sessionUtils.js written');

// ── ChineseSession.js ────────────────────────────────────────
const chineseContent = `"use client";
import React, { useState } from "react";
import {
  C, TTS, SpeakBtn, SFX,
  Wrap, ActionBtn, HintBox, FeedbackBox, RevealBox, WrongBanner,
} from "@/lib/uiShared";
import { ZH_SECTIONS, ZH_CHAR_DICT, shuffle, seededShuffle } from "@/lib/quizMeta";
import { scoreBadge, OptionsGlossary } from "@/lib/sessionUtils";

${chineseBlock.join('\n')}
export { ZhSessionScreen };
`;

writeFileSync('src/components/ChineseSession.js', chineseContent, 'utf8');
console.log('✓ src/components/ChineseSession.js written');

// ── EnglishSession.js ────────────────────────────────────────
const englishContent = `"use client";
import React, { useState, useRef } from "react";
import {
  C, TTS, SpeakBtn, SFX,
  Wrap, TagPill, ActionBtn, HintBox, FeedbackBox, LearnCard, RevealBox, WrongBanner, RuleCard,
} from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER, WORD_DICT, SYN_ANT, shuffle, seededShuffle } from "@/lib/quizMeta";
import { reviewDays, scoreBadge, fmtTime, guessFlag, todayStr, dateLabel, TapWord, OptionsGlossary } from "@/lib/sessionUtils";

${englishBlock.join('\n')}
export { SessionScreen };
`;

writeFileSync('src/components/EnglishSession.js', englishContent, 'utf8');
console.log('✓ src/components/EnglishSession.js written');

// ── QuizEngine.js — thin re-export hub ───────────────────────
const hubContent = `"use client";
// Re-export hub — import directly from the source modules for new code
export { SessionScreen }   from "@/components/EnglishSession";
export { ZhSessionScreen } from "@/components/ChineseSession";
export { reviewDays, scoreBadge, fmtTime, guessFlag, todayStr, dateLabel } from "@/lib/sessionUtils";
export { SECTIONS, SECTION_ORDER, ZH_SECTIONS, ZH_SECTION_ORDER, WORD_DICT, seededShuffle } from "@/lib/quizMeta";
`;

writeFileSync('src/components/QuizEngine.js', hubContent, 'utf8');
console.log('✓ src/components/QuizEngine.js → thin re-export hub');

console.log('\nLine counts:');
[
  ['EnglishSession.js', englishContent],
  ['ChineseSession.js', chineseContent],
  ['sessionUtils.js',  sessionUtilsContent],
].forEach(([name, c]) => console.log(`  ${name}: ${c.split('\n').length} lines`));
