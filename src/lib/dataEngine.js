// ── Data Engine — plan builders and session data logic ────────
// Centralised from ClaudeApp.js; imported by ClaudeApp and ChineseApp

import {
  pickEnglishPaper,
  pickChinesePaper,
  englishPaperToPlan,
  englishPaperToLegacyInfo,
  buildChinesePlanFromPaper,
} from '@/lib/p3PaperBridge';

import { seededShuffle } from '@/lib/quizMeta';

// ── Session / advice defaults ─────────────────────────────────
export const DEFAULT_SETTINGS = {
  GrammarMCQ:    { count:16, difficulty:"standard" },
  VocabMCQ:      { count:16, difficulty:"standard" },
  GrammarCloze:  { sets:1 },
  VocabCloze:    { sets:1 },
  Editing:       { sets:1 },
  Comprehension: { sets:1 },
};

export const MOCK_EXAMS = [
  { id:"nanyang_wa1_2025", school:"Nanyang Primary",    type:"WA1", year:2025 },
  { id:"nanhua_wa1_2025",  school:"Nan Hua Primary",    type:"WA1", year:2025 },
  { id:"henry_park_wa2",   school:"Henry Park Primary", type:"WA2", year:2025 },
];

export function generateAdvice(history){
  if(!history.length) return [];
  const last3 = history.filter(h=>!h.isMockExam).slice(-3);
  if(!last3.length) return [];
  const avg = key => Math.round(last3.reduce((s,h)=>s+(h.scores[key]||0),0)/last3.length);
  const advice = [];
  const gm=avg("GrammarMCQ"), vm=avg("VocabMCQ"), comp=avg("Comprehension"), edit=avg("Editing");

  if(gm<70)  advice.push({type:"increase",section:"GrammarMCQ",icon:"📝",priority:"🔴 High",
    text:`Grammar MCQ avg is ${gm}% (last 3 sessions). Increase to 20 questions and use 'mixed' difficulty to reinforce weak tenses and SVA.`,action:{count:20,difficulty:"mixed"}});
  else if(gm>=90) advice.push({type:"advance",section:"GrammarMCQ",icon:"📝",priority:"🟢 Advance",
    text:`Grammar MCQ is strong at ${gm}%! Ready to challenge with advanced difficulty.`,action:{count:16,difficulty:"advanced"}});

  if(vm<65)  advice.push({type:"increase",section:"VocabMCQ",icon:"📚",priority:"🔴 High",
    text:`Vocabulary avg is ${vm}%. Increase to 20 questions and focus on synonyms/antonyms.`,action:{count:20,difficulty:"standard"}});
  else if(vm>=85) advice.push({type:"advance",section:"VocabMCQ",icon:"📚",priority:"🟢 Advance",
    text:`Vocabulary is doing well at ${vm}%. Consider advancing to mixed difficulty.`,action:{count:16,difficulty:"mixed"}});

  if(comp<70) advice.push({type:"increase",section:"Comprehension",icon:"📖",priority:"🔴 High",
    text:`Comprehension at ${comp}% carries the most PSLE marks. Increase to 2 sets immediately.`,action:{sets:2}});

  if(edit>=90) advice.push({type:"reduce",section:"Editing",icon:"🔍",priority:"🔵 Maintain",
    text:`Spelling/Editing is excellent at ${edit}%. Maintain current level.`,action:{sets:1}});

  if(!advice.length) advice.push({type:"maintain",section:"all",icon:"⭐",priority:"🟡 Good",
    text:`Balanced performance! Focus on consistency and aim for 85%+ across all sections.`,action:null});
  return advice;
}

// ── School-paper matching ─────────────────────────────────────
export const SCHOOL_PAPER_MAP = {
  "Nanyang Primary":    { style:"challenging", focusTopics:["Past Perfect","Subject-Verb Agreement","Synonyms"],      compStyle:"long_inference", mockRef:"nanyang_wa1_2025" },
  "Nan Hua Primary":    { style:"standard",    focusTopics:["Past Continuous","Conjunctions","Context Vocabulary"],   compStyle:"factual_plus",   mockRef:"nanhua_wa1_2025" },
  "Henry Park Primary": { style:"challenging", focusTopics:["Reflexive Pronouns","Present Perfect","Antonyms"],       compStyle:"long_inference", mockRef:"henry_park_wa2" },
  "Raffles Girls Prim": { style:"advanced",    focusTopics:["Past Perfect","Conjunctions","Synonyms"],                compStyle:"inference_heavy",mockRef:"nanyang_wa1_2025" },
  "CHIJ St Nicholas":   { style:"advanced",    focusTopics:["Subject-Verb Agreement","Prepositions","Antonyms"],      compStyle:"inference_heavy",mockRef:"nanyang_wa1_2025" },
  "Methodist Girls":    { style:"standard",    focusTopics:["Past Continuous","Question Words","Context Vocabulary"], compStyle:"factual_plus",   mockRef:"nanhua_wa1_2025" },
  "Tao Nan":            { style:"standard",    focusTopics:["Simple Past","Pronouns","Synonyms"],                     compStyle:"factual",        mockRef:"nanhua_wa1_2025" },
  "Maha Bodhi":         { style:"standard",    focusTopics:["Simple Past","Conjunctions","Context Vocabulary"],       compStyle:"factual",        mockRef:"nanhua_wa1_2025" },
};

export function getSchoolProfile(schoolName){
  if(!schoolName) return null;
  for(const [key,val] of Object.entries(SCHOOL_PAPER_MAP)){
    if(schoolName.toLowerCase().includes(key.toLowerCase())) return {...val, schoolKey:key};
  }
  return null;
}

export function pickQuestionsForSchool(allQs, schoolName, count){
  const profile = getSchoolProfile(schoolName);
  if(!profile || !profile.focusTopics) return allQs.slice(0, count);
  const priority = allQs.filter(q => profile.focusTopics.some(t => (q.topic||"").includes(t)));
  const rest     = allQs.filter(q => !profile.focusTopics.some(t => (q.topic||"").includes(t)));
  return [...priority, ...rest].slice(0, count);
}

// ── Level helpers ─────────────────────────────────────────────
export const LEVEL_MAP = { easy:"foundation", medium:"core", hard:"stretch" };

export function pickByLevel(pool, level, seed, n){
  let candidates = pool;
  const want = LEVEL_MAP[level];
  if(want){
    const f = pool.filter(q=>(q.difficulty||"core")===want);
    if(f.length >= Math.min(n, 3)) candidates = f;
  }
  const sh = seededShuffle(candidates, (seed||1)*7919 + (want?want.length:0));
  const out=[]; for(let i=0;i<n;i++) out.push(sh[i%sh.length]);
  return out;
}

// ── Auto difficulty: per-section, recalculated every 3 sessions ──
//
// Logic:
//   - Requires at least 3 regular (non-mock) sessions to make a decision
//   - Uses the most recent completed 3-session block (sessions 1-3, 4-6, 7-9 …)
//   - Per section: avg < 60% → easy | 60–75% → medium | > 75% → hard
//   - Falls back to "medium" until enough data exists
//
const SECTION_TYPES = [
  "GrammarMCQ","VocabMCQ","GrammarCloze","VocabCloze","Editing","Comprehension"
];

function sectionAvgForBlock(sessions, sectionType){
  const vals = sessions
    .map(h => h.scores?.[sectionType])
    .filter(v => v != null && v !== undefined);
  if(!vals.length) return null;
  return Math.round(vals.reduce((a,b) => a+b, 0) / vals.length);
}

function levelFromAvg(avg){
  if(avg === null) return "medium";
  if(avg < 60)    return "easy";
  if(avg <= 75)   return "medium";
  return "hard";
}

/**
 * Returns per-section difficulty levels based on the most recent
 * completed 3-session block from history.
 *
 * Returns: { GrammarMCQ:"medium", VocabMCQ:"hard", ... }
 */
export function recommendSectionLevels(history){
  const regular = (history||[]).filter(h => !h.isMockExam);

  // Need at least 3 sessions
  if(regular.length < 3){
    const defaults = {};
    SECTION_TYPES.forEach(t => { defaults[t] = "medium"; });
    return defaults;
  }

  // Most recent completed block of 3
  // e.g. 7 sessions → use sessions 4-6 (last complete block)
  // e.g. 9 sessions → use sessions 7-9
  const blockSize = 3;
  const completedBlocks = Math.floor(regular.length / blockSize);
  const blockStart = (completedBlocks - 1) * blockSize;  // 0-indexed
  const block = regular.slice(blockStart, blockStart + blockSize);

  const levels = {};
  SECTION_TYPES.forEach(t => {
    const avg = sectionAvgForBlock(block, t);
    levels[t] = levelFromAvg(avg);
  });
  return levels;
}

/**
 * Returns a single overall level (easy/medium/hard) for backwards
 * compatibility with buildZhPlan which uses one level for all sections.
 */
export function recommendLevel(history){
  const regular = (history||[]).filter(h => !h.isMockExam);
  if(regular.length < 3){
    // Fewer than 3 sessions: use last session total if available
    const last = regular.slice(-1)[0];
    if(!last) return "medium";
    const p = last.totalPct || 0;
    return p < 60 ? "easy" : p <= 75 ? "medium" : "hard";
  }
  // Use section levels and pick the most common one
  const levels = recommendSectionLevels(history);
  const counts = { easy:0, medium:0, hard:0 };
  Object.values(levels).forEach(l => { if(counts[l] !== undefined) counts[l]++; });
  return Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];
}

// ── English plan builders ─────────────────────────────────────
export function selectPastPaper(schoolName) {
  const paper = pickEnglishPaper({ schoolName, sessionNum: 11, isPastPaper: true });
  return englishPaperToLegacyInfo(paper);
}

export function buildPastPaperPlan(settings, schoolName, sessionNum) {
  const paper = pickEnglishPaper({ schoolName, sessionNum: sessionNum||11, isPastPaper: true });
  return englishPaperToPlan(paper, settings, "medium", sessionNum, schoolName, pickByLevel, pickQuestionsForSchool);
}

export function buildPlan(settings, schoolName, sessionNum, level, sectionLevels){
  const isPast = level==="pastpaper" || (sessionNum && sessionNum >= 11 && !LEVEL_MAP[level]);
  const paper = pickEnglishPaper({ schoolName, sessionNum: sessionNum||1, isPastPaper: isPast });
  // sectionLevels: per-section difficulty override from auto-adjustment
  // passed through to englishPaperToPlan so each section uses its own level
  return englishPaperToPlan(paper, settings, level, sessionNum, schoolName, pickByLevel, pickQuestionsForSchool, sectionLevels);
}

// ── Chinese plan builders ─────────────────────────────────────
export function buildZhPlan(sessionNum, level) {
  const isPast = level==="pastpaper" || (sessionNum >= 11 && !LEVEL_MAP[level]);
  const paper = pickChinesePaper({ sessionNum: sessionNum||1, isPastPaper: isPast });
  const plan = buildChinesePlanFromPaper(paper, pickByLevel, level, sessionNum);
  plan.isPastPaper = isPast;
  return plan;
}

export function buildZhPastPaperPlan(sessionNum) {
  const paper = pickChinesePaper({ sessionNum: sessionNum||11, isPastPaper: true });
  const plan = buildChinesePlanFromPaper(paper, null, "medium", sessionNum);
  plan.isPastPaper = true;
  return plan;
}
