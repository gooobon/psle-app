"use client";
import { useState, useCallback, useRef } from "react";

// ==============================================================================
// 1. CURRICULUM REGISTRY
//    Extensible: add new grade/subject/stage to this object
// ==============================================================================
const CURRICULUM_REGISTRY = {
  "P3": {
    "English": {
      "WA1": {
        label: "P3 English WA1",
        sections: [
          { id:"A", title:"Vocabulary MCQ",       count:5, type:"mcq",   hasTrap:true  },
          { id:"B", title:"Grammar Cloze",         count:8, type:"cloze", hasTrap:true  },
          { id:"C", title:"Comprehension Cloze",   count:8, type:"cloze", hasTrap:true  }, // OK fixed
          { id:"D", title:"Vocabulary Contextual", count:5, type:"open",  hasTrap:true  },
          { id:"E", title:"Grammar MCQ",           count:5, type:"mcq",   hasTrap:true  },
          { id:"F", title:"Editing",               count:2, type:"edit",  hasTrap:true  },
          { id:"G", title:"Comprehension OEQ",     count:8, type:"open",  hasTrap:true  }, // OK fixed
        ],
        topicTags: {
          A: ["Synonyms","Antonyms","Compound Words","Word Families","Phrasal Verbs"],
          B: ["Subject-Verb Agreement","Tenses","Articles","Prepositions","Conjunctions","Pronouns"],
          C: ["Main Idea","Context Clues","Vocabulary in Context","Pronoun Reference","Discourse Markers"],
          D: ["Homophones","Collocations","Word Choice","Figurative Language"],
          E: ["Subject-Verb Agreement","Tenses","Modal Verbs","Passive Voice","Conditional"],
          F: ["Punctuation","Subject-Verb Agreement","Tenses","Spelling","Capitalisation"],
          G: ["Inference","Character Traits","Sequence of Events","Main Idea","Author's Purpose","Cause & Effect"],
        },
        trapTypes: {
          A: ["Confusable Words","False Cognates","Register Mismatch"],
          B: ["SVA with Collective Nouns","Irregular Past Tense","Homophone Confusion","Double Negatives"],
          C: ["Conjunction Mismatch (however vs so)","Pronoun Disagreement","Wrong Tense Context"], // OK fixed
          D: ["Homophones: their/there/they're","Homophones: its/it's","Double Negatives"],
          E: ["SVA with Intervening Phrase","Stative Verbs in Continuous","Modal + Base Form"],
          F: ["Missing Apostrophe","Comma Splice","Wrong Tense in Context","Capitalisation Error"],
          G: ["Answer in Present instead of Past Tense","Lifting text without changing pronouns","Missing 'Why' in Why-question","Inferring beyond given evidence"], // OK fixed
        },
      },
      "WA2": {
        label: "P3 English WA2",
        sections: [
          { id:"A", title:"Vocabulary MCQ",           count:5,  type:"mcq",   hasTrap:true  },
          { id:"B", title:"Grammar Cloze",             count:10, type:"cloze", hasTrap:true  },
          { id:"C", title:"Comprehension Cloze",       count:10, type:"cloze", hasTrap:true  },
          { id:"D", title:"Synthesis & Transformation",count:5,  type:"open",  hasTrap:true  },
          { id:"E", title:"Comprehension OEQ",         count:10, type:"open",  hasTrap:true  },
        ],
        topicTags: {
          A: ["Synonyms","Antonyms","Compound Words"],
          B: ["Tenses","Articles","Prepositions","Conjunctions","Pronouns"],
          C: ["Context Clues","Vocabulary in Context","Discourse Markers"],
          D: ["Passive Voice","Reported Speech","Conditional","Gerund vs Infinitive"],
          E: ["Inference","Main Idea","Character Traits","Cause & Effect"],
        },
        trapTypes: {
          A: ["Confusable Words","Register Mismatch"],
          B: ["SVA with Collective Nouns","Irregular Past Tense","Conjunction Mismatch"],
          C: ["Conjunction Mismatch (however vs so)","Pronoun Disagreement","Wrong Tense Context"],
          D: ["Active-Passive Inversion","Tense Shift in Reported Speech","Object Pronoun Change"],
          E: ["Answer in Present instead of Past Tense","Lifting text without pronouns change","Missing 'Why' in Why-question"],
        },
      },
    },
    "Mathematics": {
      "WA1": {
        label: "P3 Maths WA1",
        sections: [
          { id:"MCQ", title:"Multiple Choice",     count:10, type:"mcq",  hasTrap:true  },
          { id:"SAQ", title:"Short Answer",         count:15, type:"open", hasTrap:false },
          { id:"OEQ", title:"Open-Ended Problems",  count:5,  type:"open", hasTrap:true  },
        ],
        topicTags: {
          MCQ: ["Whole Numbers","Fractions","Measurement","Geometry","Data Analysis"],
          SAQ: ["Addition","Subtraction","Multiplication","Division","Word Problems"],
          OEQ: ["Multi-step Word Problems","Perimeter & Area","Bar Graphs"],
        },
        trapTypes: {
          MCQ: ["Unit Conversion Error","Wrong Operation","Misread Question"],
          SAQ: [],
          OEQ: ["Missing Units","Partial Solution","Rounding Error"],
        },
      },
    },
    "Chinese": {
      "WA1": {
        label: "P3 Chinese WA1",
        sections: [
          { id:"PinYin",   title:"拼音",     count:5, type:"mcq",   hasTrap:false },
          { id:"BianZi",   title:"辨字",     count:5, type:"mcq",   hasTrap:true  },
          { id:"CiYu",     title:"词语",     count:5, type:"open",  hasTrap:false },
          { id:"TianKong", title:"填空",     count:8, type:"cloze", hasTrap:true  },
          { id:"YueRead",  title:"阅读理解", count:8, type:"open",  hasTrap:true  },
        ],
        topicTags: {
          PinYin:   ["声调","声母","韵母","整体认读"],
          BianZi:   ["形近字","同音字","多音字"],
          CiYu:     ["近义词","反义词","量词","成语"],
          TianKong: ["关联词","时间词","方位词"],
          YueRead:  ["主旨大意","细节理解","推断","因果关系"],
        },
        trapTypes: {
          BianZi:   ["形近字混淆","同音字错误"],
          TianKong: ["关联词搭配错误","量词误用"],
          YueRead:  ["用现在时回答过去时问题","照抄原文不改代词"],
          PinYin:[], CiYu:[],
        },
      },
    },
  },
  "P4": {
    "English": {
      "WA1": {
        label: "P4 English WA1",
        sections: [
          { id:"A", title:"Vocabulary MCQ",           count:5,  type:"mcq",   hasTrap:true  },
          { id:"B", title:"Grammar Cloze",             count:10, type:"cloze", hasTrap:true  },
          { id:"C", title:"Comprehension Cloze",       count:10, type:"cloze", hasTrap:true  },
          { id:"D", title:"Synthesis & Transformation",count:5,  type:"open",  hasTrap:true  },
          { id:"E", title:"Comprehension OEQ",         count:10, type:"open",  hasTrap:true  },
        ],
        topicTags: {
          A: ["Synonyms","Antonyms","Phrasal Verbs","Idioms","Collocations"],
          B: ["Tenses","Passive Voice","Reported Speech","Relative Clauses","Conditional"],
          C: ["Context Clues","Vocabulary in Context","Discourse Markers","Cohesive Devices"],
          D: ["Conditional","Gerund vs Infinitive","Passive-Active Transformation","Combining Sentences"],
          E: ["Inference","Main Idea","Author's Purpose","Tone","Character Motivation"],
        },
        trapTypes: {
          A: ["Confusable Words","Idiom Misuse","Register Mismatch"],
          B: ["Perfect Tenses","Passive Voice Errors","Relative Pronoun Choice"],
          C: ["Conjunction Mismatch (however vs so)","Pronoun Disagreement","Wrong Tense Context"],
          D: ["Tense Shift","Subject Change in Transformation","Missing Connector"],
          E: ["Answer in Wrong Tense","Lifting text without pronoun change","Inferring beyond text"],
        },
      },
    },
  },
  "P5": { "English": { "WA1": { label:"P5 English WA1", sections:[], topicTags:{}, trapTypes:{} } } },
  "P6": { "English": { "PSLE":{ label:"P6 PSLE English",  sections:[], topicTags:{}, trapTypes:{} } } },
};

// ==============================================================================
// 2. CONSTANTS & HELPERS
// ==============================================================================
const DIFF_META = {
  Easy:   { bg:"#E8F5E9", text:"#2E7D32", dot:"#4CAF50", bar:"#4CAF50", threshold:"< 60%"   },
  Medium: { bg:"#FFF8E1", text:"#F57F17", dot:"#FFC107", bar:"#FFC107", threshold:"60-79%"  },
  Hard:   { bg:"#FCE4EC", text:"#B71C1C", dot:"#F44336", bar:"#F44336", threshold:">= 80%"   },
};

// Remediation difficulty downgrade rules (pedagogical principle)
// Hard section -> remediation uses Medium
// Medium section -> remediation uses Easy
// Easy section -> stays Easy (cannot go lower)
const REMEDIATION_DIFF_DOWNGRADE = { Hard:"Medium", Medium:"Easy", Easy:"Easy" };

function getDifficulty(acc) {
  if (acc >= 80) return "Hard";
  if (acc >= 60) return "Medium";
  return "Easy";
}

// Per-section remediation difficulty - shared by prompt builder & validator
function getRemediationDifficulty(sectionTargetDiff) {
  return REMEDIATION_DIFF_DOWNGRADE[sectionTargetDiff] || "Easy";
}

// -- Session history (in-memory for demo) --
// 실서비스에서는 IndexedDB / server-side DB로 교체
const SESSION_STORE = { sessions: [], solvedIds: new Set() };

// ==============================================================================
// 3. PROMPT BUILDERS - 교육학 원칙 완전 반영
// ==============================================================================
function buildSystemPrompt(context, curriculum, sectionTargets, frequentErrors) {
  const { grade, subject, stage } = context;
  const sections = curriculum.sections;
  const topicTags = curriculum.topicTags;
  const trapTypes = curriculum.trapTypes;

  // Include remediation difficulty per section in the prompt
  const sectionSpec = sections.map(s => {
    const tgt = sectionTargets[s.id]?.target_difficulty || "Medium";
    const remDiff = getRemediationDifficulty(tgt);
    return `  S${s.id} (${s.title}): ${s.count}Q | type=${s.type} | target=${tgt}${s.hasTrap ? " | trap_type required" : ""} | remediation_difficulty=${remDiff}`;
  }).join("\n");

  const topicSpec = Object.entries(topicTags)
    .map(([sec, tags]) => `  S${sec}: [${tags.join(", ")}]`).join("\n");

  const trapSpec = Object.entries(trapTypes)
    .filter(([,v]) => v.length > 0)
    .map(([s, ts]) => `  S${s}: [${ts.join(", ")}]`).join("\n");

  // Error patterns - include exact previous trap type
  const errorSpec = frequentErrors.length > 0
    ? frequentErrors.map(e => {
        const tgt = sectionTargets[e.section]?.target_difficulty || "Medium";
        const remDiff = getRemediationDifficulty(tgt);
        return `  - S${e.section || "ANY"} | tag="${e.tag}" | errors=${e.count}x | previous_trap="${e.lastTrapType || "unknown"}" | remediation_difficulty=FORCE_${remDiff}`;
      }).join("\n")
    : "  (none)";

  return `You are the Adaptive AI Engine for "Genius Project" - Singapore MOE intelligent learning platform.
Grade: ${grade} | Subject: ${subject} | Exam Stage: ${stage}

================================================
 RULE 1 - SECTION STRUCTURE (NON-NEGOTIABLE)
================================================
${sectionSpec}
TOTAL: ${sections.reduce((s,c) => s+c.count, 0)} questions exactly.

================================================
 RULE 2 - REMEDIATION PARADOX PREVENTION (MOST CRITICAL)
================================================
A student who repeatedly fails a concept does NOT need the hardest version of it.
They need to rebuild confidence at a lower difficulty first.

MANDATORY RULE for is_remediation=true questions:
  * IGNORE the section's target_difficulty
  * USE the remediation_difficulty shown in RULE 1 for that section
  * NEVER use the section's target_difficulty for remediation questions
  * Cap at Medium even if section target is Hard
  * Cap at Easy if section target is Medium

FREQUENT ERRORS TO TARGET (exact trap context provided):
${errorSpec}

For each frequent error:
  1. SET difficulty = remediation_difficulty (downgraded, as above)
  2. DO NOT repeat the exact previous_trap listed - alter the surface context
     (e.g., if they failed SVA with "team", use "class" or "flock" instead)
  3. Test the SAME underlying rule in a FRESH sentence/context
  4. Set "is_remediation": true and "trap_type" to the variant trap used
  5. Write a memory_hook that is a direct, catchy cheat-code rule

================================================
 RULE 3 - 3-SLOT MASTERY PATHWAY (per section)
================================================
Distribute questions within each section across 3 pedagogical slots:
  Slot A - REMEDIATION (if errors exist): is_remediation=true, difficulty=downgraded
  Slot B - CONSOLIDATION: target_difficulty, core curriculum topic
  Slot C - STRETCH: one step above target (bridge to next level), only 1 question

This ensures: rebuild, practise, challenge within every session.

================================================
 RULE 4 - TRAP TYPE ARCHITECTURE
================================================
For sections with trap_type required, EVERY question must include:
  "trap_type": "<specific trap from allowed list, or null>"
Valid traps per section:
${trapSpec}

Trap design rules:
  * Normal questions: choose a trap that tests a common misconception at target_difficulty
  * Remediation questions: use a VARIANT of the student's previous trap (different surface, same rule)
  * Never invent trap types not in the allowed list

================================================
 RULE 5 - SINGAPORE MOE CONTEXT
================================================
Every question must feel authentic to Singapore P${grade.replace("P","")} curriculum.
Settings: Changi Airport, MRT, hawker centres, HDB, National Day, Deepavali, Hungry Ghost Festival,
  local fauna (otters, mynahs, monitor lizards), local food (laksa, char kway teow, roti prata).
Language: Standard Singapore school English - no colloquialisms, no Singlish.

================================================
 RULE 6 - DIFFICULTY CALIBRATION
================================================
Easy   -> P(n-1) level, high-frequency vocabulary, simple sentence structure, single-clause
Medium -> Exact P${grade.replace("P","")} level, standard exam phrasing, moderate vocabulary
Hard   -> Above-grade vocabulary, multi-clause sentences, requires rule application or inference

================================================
 RULE 7 - SECTION-SPECIFIC GENERATION
================================================
SA & SE (MCQ): Exactly 4 options. Distractors must be grammatically plausible, not absurd.
SB (Grammar Cloze): Use ___ for blanks. Test ONE grammar rule per blank clearly.
SC (Comprehension Cloze): Write ONE passage (100-150 words), then 8 fill-in blanks referencing it.
  Traps in SC target discourse connectors and pronoun/tense coherence.
SD (Vocabulary Contextual): Full sentence using target word in natural context.
SF (Editing): One sentence with EXACTLY ONE error. "answer" = full corrected sentence.
SG (Comprehension OEQ): Q1 (G-001) provides the full passage (120-180 words).
  Q2-Q8 are open-ended. Answers must be full sentences, past tense if passage is past tense.
  Traps in SG catch students who answer in wrong tense or lift text verbatim without pronoun change.

================================================
 OUTPUT SCHEMA - JSON ONLY, NO MARKDOWN
================================================
{
  "set_id": "DYNAMIC-${grade}-${subject}-${stage}-<session_num>",
  "generated_at": "<ISO 8601>",
  "adaptive_for": "<student_id>",
  "curriculum": {"grade":"${grade}","subject":"${subject}","stage":"${stage}"},
  "target_difficulties": {"<section_id>":"Easy|Medium|Hard"},
  "slot_allocation": {"<section_id>":{"slot_a_remediation":N,"slot_b_consolidation":N,"slot_c_stretch":N}},
  "remediation_tags_targeted": ["<tag>"],
  "sections": {
    "<section_id>": {
      "title": "<title>",
      "target_difficulty": "Easy|Medium|Hard",
      "questions": [{
        "question_id": "DYN-${grade}-${subject[0]}-${stage}-<S><NNN>",
        "slot": "A|B|C",
        "difficulty": "Easy|Medium|Hard",
        "topic_tag": "<from allowed list>",
        "trap_type": "<from allowed list or null>",
        "is_remediation": false,
        "prompt": "<full question text>",
        "options": ["A)...","B)...","C)...","D)..."],
        "answer": "<correct answer>",
        "explanation": "<why correct + why top distractor is wrong, 2 sentences>",
        "memory_hook": "<catchy cheat-code rule - mandatory for is_remediation=true>"
      }]
    }
  }
}`;
}

function buildUserPrompt(context, performance, curriculum, sectionTargets) {
  const { grade, subject, stage } = context;
  const nextSession = Math.max(...(performance.sessions_analyzed || [0])) + 1;

  // Per-section remediation difficulty map - passed explicitly to AI
  const remediationMap = {};
  curriculum.sections.forEach(s => {
    const tgt = sectionTargets[s.id]?.target_difficulty || "Medium";
    remediationMap[s.id] = {
      target_difficulty: tgt,
      remediation_difficulty: getRemediationDifficulty(tgt),
      question_count: s.count,
    };
  });

  const errorDetail = performance.frequentErrors.map(e => ({
    tag: e.tag,
    section: e.section || "ANY",
    error_count: e.count,
    sessions_with_error: e.lastSeen,
    priority: e.count >= 3 ? "HIGH" : "MEDIUM",
    last_trap_type: e.lastTrapType || null,
    force_difficulty: getRemediationDifficulty(
      sectionTargets[e.section]?.target_difficulty || "Medium"
    ),
  }));

  return `[SESSION CONTEXT]
student_id: "${performance.student_id}"
student_name: "${performance.student_name}"
session_number: ${nextSession}
curriculum: ${grade} / ${subject} / ${stage}

[SECTION DIFFICULTY MAP]
${JSON.stringify(remediationMap, null, 2)}

[FREQUENT ERRORS - REMEDIATION REQUIRED]
${errorDetail.length > 0 ? JSON.stringify(errorDetail, null, 2) : "[]"}
CRITICAL: For each item above, generate is_remediation=true questions using force_difficulty (NOT target_difficulty).
Do NOT reuse the exact last_trap_type - create a variant that tests the same underlying rule.

[EXCLUSION LIST - DO NOT USE THESE IDs]
${performance.solvedIds.length > 0 ? JSON.stringify(performance.solvedIds) : "[]"}

[SLOT ALLOCATION GUIDANCE]
For each section, distribute questions as:
  Slot A (Remediation): 1-2 questions per frequent error tag in that section | difficulty=force_difficulty
  Slot B (Consolidation): remaining questions at target_difficulty, balanced across topic tags
  Slot C (Stretch): 1 question at one level above target_difficulty

[INSTRUCTION]
Generate the complete adaptive question set for Session #${nextSession}.
VERIFY before outputting:
  [ ] Section question counts match exactly
  [ ] Remediation questions use force_difficulty, NOT target_difficulty
  [ ] trap_type is varied from last_trap_type for remediation questions
  [ ] memory_hook present on ALL is_remediation=true questions
  [ ] SG answers should be in past tense if passage uses past tense
  [ ] SC passage coherence - all blanks flow naturally in context
Return ONLY the JSON object.`;
}

// ==============================================================================
// 4. VALIDATION ENGINE - 리메디에이션 난이도 다운그레이드 인식
// ==============================================================================
function validateResult(result, curriculum, performance, sectionTargets) {
  const errors = [];
  const warnings = [];
  if (!result.sections) { errors.push("Missing 'sections' object"); return { errors, warnings, score:0 }; }

  let totalQ = 0;
  curriculum.sections.forEach(sec => {
    const s = result.sections[sec.id];
    if (!s) { errors.push(`S${sec.id} missing entirely`); return; }
    const qs = s.questions || [];
    totalQ += qs.length;

    if (qs.length !== sec.count)
      errors.push(`S${sec.id}: expected ${sec.count}Q, got ${qs.length}`);

    const tgt = sectionTargets[sec.id]?.target_difficulty || "Medium";
    const remDiff = getRemediationDifficulty(tgt);
    const solvedSet = new Set(performance.solvedIds);

    qs.forEach((q, i) => {
      const label = `S${sec.id} Q${i+1}`;
      if (!q.answer) errors.push(`${label}: missing answer`);
      if (!q.topic_tag) warnings.push(`${label}: missing topic_tag`);
      if (sec.type === "mcq" && (!q.options || q.options.length !== 4))
        errors.push(`${label}: MCQ must have exactly 4 options`);
      if (solvedSet.has(q.question_id))
        errors.push(`${label}: question_id "${q.question_id}" already solved`);

      // Difficulty check: downgrade is expected for remediation questions
      if (q.is_remediation) {
        if (q.difficulty !== remDiff && q.difficulty !== "Easy")
          warnings.push(`${label} [remediation]: difficulty should be ${remDiff}, got ${q.difficulty}`);
        if (!q.memory_hook)
          warnings.push(`${label} [remediation]: missing memory_hook - required for all remediation questions`);
      } else {
        if (q.difficulty !== tgt)
          warnings.push(`${label}: difficulty "${q.difficulty}" != target "${tgt}"`);
      }

      // Trap 검증
      if (sec.hasTrap && q.trap_type === undefined)
        warnings.push(`${label}: trap_type field missing (section has hasTrap=true)`);
    });
  });

  // Error tag coverage check
  const allTags = new Set(
    Object.values(result.sections || {}).flatMap(s => (s.questions||[]).map(q => q.topic_tag))
  );
  performance.frequentErrors.forEach(e => {
    if (!allTags.has(e.tag))
      warnings.push(`Frequent error tag "${e.tag}" NOT found in generated questions - remediation incomplete`);
  });

  // Section G tense consistency check (heuristic)
  const gSec = result.sections?.G;
  if (gSec?.questions?.length > 1) {
    const passage = gSec.questions[0]?.prompt || "";
    const isPastPassage = /\b(was|were|had|went|said|told|came|saw)\b/.test(passage);
    if (isPastPassage) {
      gSec.questions.slice(1).forEach((q, i) => {
        if (q.answer && /\b(is|am|are|has|goes|says)\b/.test(q.answer))
          warnings.push(`SG Q${i+2}: answer uses present tense but passage is past tense`);
      });
    }
  }

  const score = Math.max(0, 100 - errors.length * 20 - warnings.length * 5);
  return { errors, warnings, score, totalQ };
}

// ==============================================================================
// 5. DEFAULT STATE
// ==============================================================================
const DEFAULT_CTX = { grade:"P3", subject:"English", stage:"WA1" };

const DEFAULT_PERF = {
  student_id: "S2024-P3-001",
  student_name: "Ethan Lim",
  sessions_analyzed: [1, 2, 3],
  section_accuracy: { A:85, B:58, C:72, D:45, E:91, F:63, G:38 },
  // frequentErrors: lastTrapType = exact trap type from previous session
  frequentErrors: [
    { tag:"Subject-Verb Agreement", section:"B", count:4, lastSeen:3, lastTrapType:"SVA with Collective Nouns" },
    { tag:"Subject-Verb Agreement", section:"E", count:3, lastSeen:3, lastTrapType:"SVA with Intervening Phrase" },
    { tag:"Homophones: their/there/they're", section:"D", count:3, lastSeen:2, lastTrapType:"Homophones: their/there/they're" },
    { tag:"Phrasal Verbs", section:"A", count:2, lastSeen:3, lastTrapType:"Confusable Words" },
  ],
  solvedIds: [],
};

// ==============================================================================
// 6. UI COMPONENTS
// ==============================================================================
function Chip({ label, bg="#E8EAF6", color="#3949AB", dot }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20,
      background:bg, color, whiteSpace:"nowrap", letterSpacing:"0.03em"
    }}>
      {dot && <span style={{ width:5, height:5, borderRadius:"50%", background:dot, flexShrink:0 }} />}
      {label}
    </span>
  );
}

function DiffChip({ diff }) {
  const m = DIFF_META[diff] || DIFF_META.Medium;
  return <Chip label={diff} bg={m.bg} color={m.text} dot={m.dot} />;
}

function AccuracyBar({ secId, desc, value, onChange }) {
  const diff = getDifficulty(value);
  const m = DIFF_META[diff];
  return (
    <div style={{ marginBottom:13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
        <span style={{ fontSize:12, fontWeight:600, color:"#1a1a2e" }}>
          S{secId} <span style={{ color:"#999", fontWeight:400 }}>- {desc}</span>
        </span>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:12, fontWeight:800, color:"#1a1a2e", minWidth:32, textAlign:"right" }}>{value}%</span>
          <DiffChip diff={diff} />
        </div>
      </div>
      <div style={{ position:"relative", height:7, borderRadius:4, background:"#EEEEF8" }}>
        <div style={{
          position:"absolute", left:0, top:0, height:"100%", borderRadius:4,
          width:`${value}%`, background:m.bar, transition:"width 0.12s, background 0.12s"
        }} />
        <input type="range" min={0} max={100} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", width:"100%", height:"100%", margin:0 }}
        />
      </div>
    </div>
  );
}

function ErrorTagCard({ err, remDiff, onRemove }) {
  const isHigh = err.count >= 3;
  return (
    <div style={{
      display:"flex", alignItems:"flex-start", gap:8, padding:"9px 12px",
      background:"#FFFAFA", borderRadius:10, border:"1px solid #FFCDD2",
      borderLeft:"4px solid #F44336", marginBottom:8
    }}>
      <span style={{ fontSize:16, flexShrink:0 }}>!</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#1a1a2e" }}>{err.tag}</div>
        <div style={{ fontSize:10, color:"#888", marginTop:2 }}>
          S{err.section || "Any"} . {err.count}x errors . Last: Session {err.lastSeen}
        </div>
        {err.lastTrapType && (
          <div style={{ fontSize:10, color:"#C62828", marginTop:2 }}>
            Previous trap: <em>{err.lastTrapType}</em> - AI will use a variant
          </div>
        )}
        <div style={{ marginTop:4, display:"flex", gap:4 }}>
          <Chip label={isHigh ? "HIGH PRIORITY" : "MEDIUM"} bg={isHigh?"#FCE4EC":"#FFF8E1"} color={isHigh?"#B71C1C":"#F57F17"} />
          <Chip label={`Remediation: ${remDiff}`} bg={DIFF_META[remDiff].bg} color={DIFF_META[remDiff].text} dot={DIFF_META[remDiff].dot} />
        </div>
      </div>
      <button onClick={() => onRemove(err.tag, err.section)}
        style={{ border:"none", background:"none", cursor:"pointer", color:"#CCC", fontSize:14, padding:2, flexShrink:0 }}>✕</button>
    </div>
  );
}

function QuestionCard({ q, idx, remDiff }) {
  const [open, setOpen] = useState(false);
  const slotColor = { A:"#FCE4EC", B:"#E8EAF6", C:"#E8F5E9" };
  const slotLabel = { A:"R Remediation", B:"B Consolidation", C:"S Stretch" };
  const m = DIFF_META[q.difficulty] || DIFF_META.Medium;
  return (
    <div style={{
      border:`1px solid ${q.is_remediation?"#FFCDD2":"#E8E8F0"}`,
      borderLeft:`4px solid ${q.is_remediation?"#F44336":q.slot==="C"?"#4CAF50":"#E0E0EE"}`,
      borderRadius:10, marginBottom:7, background:q.is_remediation?"#FFFAFA":"#FAFAFA", overflow:"hidden"
    }}>
      <button onClick={() => setOpen(o=>!o)} style={{
        width:"100%", padding:"9px 12px", background:"none", border:"none", cursor:"pointer",
        textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
          <span style={{
            width:22, height:22, borderRadius:6, background:"#1a1a2e", color:"#fff",
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            fontSize:10, fontWeight:800, flexShrink:0
          }}>{idx+1}</span>
          <span style={{ fontSize:11, color:"#555", fontWeight:600 }}>{q.topic_tag||"-"}</span>
          <DiffChip diff={q.difficulty} />
          {q.slot && <Chip label={slotLabel[q.slot]||q.slot} bg={slotColor[q.slot]||"#F5F5F5"} color="#333" />}
          {q.trap_type && <Chip label={`! ${q.trap_type}`} bg="#FFF8E1" color="#E65100" />}
        </div>
        <span style={{ color:"#CCC", fontSize:13, transform:open?"rotate(180deg)":"none", transition:"0.2s", flexShrink:0 }}>v</span>
      </button>
      {open && (
        <div style={{ padding:"0 12px 12px", borderTop:"1px solid #F0F0F0" }}>
          <p style={{ margin:"10px 0 6px", fontSize:12, color:"#1a1a2e", lineHeight:1.7, whiteSpace:"pre-wrap" }}>
            <strong>Q:</strong> {q.prompt}
          </p>
          {q.options && (
            <div style={{ display:"flex", flexDirection:"column", gap:4, margin:"7px 0" }}>
              {q.options.map((opt, i) => {
                const isCorrect = opt.startsWith(q.answer?.[0]);
                return (
                  <div key={i} style={{
                    fontSize:11, padding:"5px 10px", borderRadius:7,
                    background:isCorrect?"#E8F5E9":"#F5F5F5", color:isCorrect?"#2E7D32":"#555",
                    fontWeight:isCorrect?700:400, border:isCorrect?"1px solid #A5D6A7":"1px solid transparent"
                  }}>{opt}{isCorrect?" OK":""}</div>
                );
              })}
            </div>
          )}
          {!q.options && q.answer && (
            <div style={{ background:"#E8F5E9", borderRadius:7, padding:"6px 10px", margin:"6px 0" }}>
              <span style={{ fontSize:11, color:"#2E7D32", fontWeight:700 }}>OK {q.answer}</span>
            </div>
          )}
          {q.explanation && (
            <p style={{ fontSize:11, color:"#555", margin:"6px 0 4px", lineHeight:1.65 }}>Tip: <em>{q.explanation}</em></p>
          )}
          {q.memory_hook && (
            <div style={{ background:"#E8EAF6", borderRadius:7, padding:"6px 10px", marginTop:4 }}>
              <span style={{ fontSize:11, color:"#3949AB", fontWeight:700 }}>RULE: {q.memory_hook}</span>
            </div>
          )}
          {q.is_remediation && (
            <div style={{ background:"#FFF3F3", borderRadius:7, padding:"5px 10px", marginTop:4, fontSize:10, color:"#B71C1C" }}>
              Remediation difficulty: {remDiff} (downgraded from section target to build confidence first)
            </div>
          )}
          <p style={{ fontSize:9, color:"#DDD", margin:"6px 0 0" }}>ID: {q.question_id} | Slot: {q.slot}</p>
        </div>
      )}
    </div>
  );
}

function SectionPanel({ secDef, sectionData, remDiff }) {
  const [collapsed, setCollapsed] = useState(false);
  const qs = sectionData?.questions || [];
  const targetDiff = sectionData?.target_difficulty || "Medium";
  const remCount = qs.filter(q => q.is_remediation).length;
  const stretchCount = qs.filter(q => q.slot === "C").length;
  return (
    <div style={{ border:"1px solid #E0E0EE", borderRadius:14, marginBottom:10, overflow:"hidden", background:"#fff" }}>
      <button onClick={() => setCollapsed(c=>!c)} style={{
        width:"100%", padding:"10px 16px", background:"#1a1a2e",
        border:"none", cursor:"pointer", textAlign:"left",
        display:"flex", justifyContent:"space-between", alignItems:"center"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <span style={{ color:"#fff", fontWeight:900, fontSize:13 }}>S{secDef.id}</span>
          <span style={{ color:"#6670AA", fontSize:11 }}>{secDef.title} . {qs.length}Q</span>
          {remCount > 0 && <Chip label={`R${remCount}`} bg="#FCE4EC" color="#B71C1C" />}
          {stretchCount > 0 && <Chip label={`S${stretchCount}`} bg="#E8F5E9" color="#2E7D32" />}
        </div>
        <div style={{ display:"flex", gap:7, alignItems:"center" }}>
          <DiffChip diff={targetDiff} />
          <span style={{ color:"#444", fontSize:12, transform:collapsed?"rotate(-90deg)":"none", transition:"0.2s" }}>v</span>
        </div>
      </button>
      {!collapsed && (
        <div style={{ padding:"10px 12px" }}>
          {qs.length > 0
            ? qs.map((q,i) => <QuestionCard key={q.question_id||i} q={q} idx={i} remDiff={remDiff} />)
            : <p style={{ color:"#CCC", fontSize:11, textAlign:"center", padding:16 }}>No questions.</p>
          }
        </div>
      )}
    </div>
  );
}

function ValidationPanel({ v }) {
  if (!v) return null;
  const { errors, warnings, score } = v;
  const scoreColor = score >= 90 ? "#2E7D32" : score >= 70 ? "#F57F17" : "#B71C1C";
  return (
    <div style={{ marginBottom:12 }}>
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"8px 14px", borderRadius:10,
        background: errors.length===0 ? "#E8F5E9" : "#FFF3F3",
        border:`1px solid ${errors.length===0?"#A5D6A7":"#FFCDD2"}`, marginBottom:4
      }}>
        <span style={{ fontSize:12, fontWeight:700, color:errors.length===0?"#2E7D32":"#B71C1C" }}>
          {errors.length===0 ? "OK Validation passed" : `[err] ${errors.length} error(s) found`}
          {warnings.length > 0 && ` . ${warnings.length} warning(s)`}
        </span>
        <span style={{ fontSize:13, fontWeight:900, color:scoreColor }}>Quality: {score}/100</span>
      </div>
      {errors.map((e,i) => (
        <div key={i} style={{ background:"#FFF3F3", border:"1px solid #FFCDD2", padding:"6px 12px", marginBottom:3, borderRadius:8 }}>
          <span style={{ fontSize:11, color:"#B71C1C", fontWeight:700 }}>[err] {e}</span>
        </div>
      ))}
      {warnings.map((w,i) => (
        <div key={i} style={{ background:"#FFF8E1", border:"1px solid #FFE082", padding:"6px 12px", marginBottom:3, borderRadius:8 }}>
          <span style={{ fontSize:11, color:"#E65100" }}>! {w}</span>
        </div>
      ))}
    </div>
  );
}

// ==============================================================================
// 7. MAIN APP
// ==============================================================================
export default function GeniusAdaptiveEngine() {
  const [ctx, setCtx]   = useState(DEFAULT_CTX);
  const [perf, setPerf] = useState(DEFAULT_PERF);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [validation, setValidation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("config");
  const [newTag, setNewTag]     = useState("");
  const [newSec, setNewSec]     = useState("B");
  const [newTrap, setNewTrap]   = useState("");

  const curriculum = CURRICULUM_REGISTRY[ctx.grade]?.[ctx.subject]?.[ctx.stage];

  // sectionTargets computed in real-time from perf + curriculum
  const sectionTargets = {};
  if (curriculum) {
    curriculum.sections.forEach(s => {
      const acc = perf.section_accuracy[s.id] ?? 50;
      sectionTargets[s.id] = { accuracy_pct: acc, target_difficulty: getDifficulty(acc) };
    });
  }

  const handleCtxChange = (key, val) => {
    const nc = { ...ctx, [key]: val };
    const newCurr = CURRICULUM_REGISTRY[nc.grade]?.[nc.subject]?.[nc.stage];
    if (newCurr) {
      const newAcc = {};
      newCurr.sections.forEach(s => { newAcc[s.id] = 65; });
      setPerf(p => ({ ...p, section_accuracy: newAcc, frequentErrors: [], solvedIds: [] }));
    }
    setCtx(nc); setResult(null); setValidation(null);
  };

  const addError = () => {
    if (!newTag.trim()) return;
    setPerf(p => ({
      ...p,
      frequentErrors: [
        ...p.frequentErrors.filter(e => !(e.tag === newTag && e.section === newSec)),
        { tag: newTag.trim(), section: newSec, count: 2,
          lastSeen: Math.max(...(p.sessions_analyzed||[1])),
          lastTrapType: newTrap || null }
      ]
    }));
    setNewTag(""); setNewTrap("");
  };

  const removeError = (tag, sec) =>
    setPerf(p => ({ ...p, frequentErrors: p.frequentErrors.filter(e => !(e.tag===tag && e.section===sec)) }));

  const generate = useCallback(async () => {
    if (!curriculum) { setErrorMsg("Curriculum not configured"); setStatus("error"); return; }
    setStatus("loading"); setResult(null); setValidation(null); setErrorMsg(""); setActiveTab("output");
    try {
      const sys  = buildSystemPrompt(ctx, curriculum, sectionTargets, perf.frequentErrors);
      const user = buildUserPrompt(ctx, perf, curriculum, sectionTargets);
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 16000,
          system: sys,
          messages: [{ role: "user", content: user }],
        }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error?.message || `HTTP ${resp.status}`);
      const raw = data.content?.map(b => b.text||"").join("") || "";
      const clean = raw.replace(/^```json\s*/i,"").replace(/```\s*$/i,"").trim();
      const parsed = JSON.parse(clean);
      const v = validateResult(parsed, curriculum, perf, sectionTargets);
      setResult(parsed);
      setValidation(v);
      setStatus("done");
      // Update session history (in-memory)
      const newIds = Object.values(parsed.sections||{})
        .flatMap(s => (s.questions||[]).map(q => q.question_id)).filter(Boolean);
      newIds.forEach(id => SESSION_STORE.solvedIds.add(id));
      SESSION_STORE.sessions.push({ sessionNum: Math.max(...perf.sessions_analyzed)+1, ids: newIds });
    } catch(e) {
      setErrorMsg(e.message + (e instanceof SyntaxError ? " - JSON parse failed" : ""));
      setStatus("error");
    }
  }, [ctx, perf, curriculum, sectionTargets]);

  const totalQ  = result ? Object.values(result.sections||{}).reduce((s,sec) => s+(sec.questions||[]).length,0) : 0;
  const remCount = result ? Object.values(result.sections||{}).flatMap(s=>s.questions||[]).filter(q=>q.is_remediation).length : 0;

  const grades   = Object.keys(CURRICULUM_REGISTRY);
  const subjects = Object.keys(CURRICULUM_REGISTRY[ctx.grade]||{});
  const stages   = Object.keys(CURRICULUM_REGISTRY[ctx.grade]?.[ctx.subject]||{});

  const TABS = [
    { id:"config",  label:"⚙ Curriculum" },
    { id:"student", label:"◎ Accuracy" },
    { id:"errors",  label:`! Error Patterns${perf.frequentErrors.length>0?` (${perf.frequentErrors.length})`:""}` },
    { id:"output",  label:"✦ Session Set" },
  ];

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", minHeight:"100vh", background:"#F0F0F8" }}>

      {/* HEADER */}
      <div style={{ background:"#1a1a2e", padding:"13px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <span style={{ fontSize:19 }}>★</span>
            <span style={{ color:"#fff", fontWeight:900, fontSize:16, letterSpacing:"-0.02em" }}>Genius Project</span>
            <Chip label="ADAPTIVE AI ENGINE v3" bg="#7B68EE" color="#fff" />
          </div>
          <div style={{ color:"#444", fontSize:10, marginTop:2, marginLeft:28 }}>
            {curriculum?.label||"Select curriculum:"} . {perf.student_name}
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ color:"#7B68EE", fontWeight:700, fontSize:11 }}>{perf.student_id}</div>
          <div style={{ color:"#444", fontSize:10 }}>Sessions: {perf.sessions_analyzed?.join(", ")}</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background:"#fff", borderBottom:"2px solid #E8E8F0", padding:"0 14px", display:"flex", overflowX:"auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding:"10px 13px", border:"none", background:"none", cursor:"pointer",
            fontSize:11, fontWeight:700, whiteSpace:"nowrap",
            color:activeTab===t.id?"#7B68EE":"#888",
            borderBottom:activeTab===t.id?"2px solid #7B68EE":"2px solid transparent",
            marginBottom:-2
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth:780, margin:"0 auto", padding:"14px 12px" }}>

        {/* -- TAB: CURRICULUM ----------------------------------------------- */}
        {activeTab==="config" && (
          <div>
            <div style={{ background:"#fff", borderRadius:14, padding:18, border:"1px solid #E0E0EE", marginBottom:12 }}>
              <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 12px", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                Curriculum Selection
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {[{key:"grade",label:"Grade",opts:grades},{key:"subject",label:"Subject",opts:subjects},{key:"stage",label:"Stage",opts:stages}].map(({key,label,opts}) => (
                  <div key={key} style={{ flex:"1 1 110px" }}>
                    <label style={{ fontSize:10, color:"#888", fontWeight:700, display:"block", marginBottom:4 }}>{label}</label>
                    <select value={ctx[key]} onChange={e=>handleCtxChange(key,e.target.value)} style={{
                      width:"100%", padding:"8px 10px", borderRadius:8, border:"1.5px solid #E0E0EE",
                      fontSize:12, fontWeight:600, background:"#FAFAFA", color:"#1a1a2e", cursor:"pointer"
                    }}>
                      {opts.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
            {curriculum && (
              <div style={{ background:"#fff", borderRadius:14, padding:18, border:"1px solid #E0E0EE" }}>
                <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 12px", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                  {curriculum.label} - Exam Structure
                </p>
                {curriculum.sections.map(s => {
                  const tgt = sectionTargets[s.id]?.target_difficulty || "Medium";
                  const remDiff = getRemediationDifficulty(tgt);
                  return (
                    <div key={s.id} style={{
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"8px 12px", borderRadius:8, background:"#F8F8FF",
                      border:"1px solid #EEEEF8", marginBottom:6
                    }}>
                      <div>
                        <span style={{ fontWeight:800, fontSize:12, color:"#1a1a2e" }}>S{s.id}</span>
                        <span style={{ fontSize:11, color:"#666", marginLeft:8 }}>{s.title}</span>
                      </div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end" }}>
                        <Chip label={`${s.count}Q`} bg="#E8EAF6" color="#3949AB" />
                        {s.hasTrap && <Chip label="! trap" bg="#FFF8E1" color="#E65100" />}
                        <DiffChip diff={tgt} />
                        <Chip label={`rem:${remDiff}`} bg={DIFF_META[remDiff].bg} color={DIFF_META[remDiff].text} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ background:"#E8F5E9", borderRadius:8, padding:"7px 12px", marginTop:6 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#2E7D32" }}>
                    Total: {curriculum.sections.reduce((s,c)=>s+c.count,0)} questions . rem: shows remediation difficulty
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -- TAB: STUDENT ACCURACY --------------------------------------- */}
        {activeTab==="student" && curriculum && (
          <div>
            <div style={{ background:"#fff", borderRadius:14, padding:"11px 15px", marginBottom:10, border:"1px solid #E0E0EE" }}>
              <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 10px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Target Difficulty Preview</p>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                {curriculum.sections.map(s => {
                  const acc = perf.section_accuracy[s.id]??50;
                  const diff = getDifficulty(acc);
                  const m = DIFF_META[diff];
                  return (
                    <div key={s.id} style={{ padding:"5px 11px", borderRadius:9, background:m.bg, textAlign:"center" }}>
                      <div style={{ fontWeight:900, fontSize:13, color:m.text }}>S{s.id}</div>
                      <div style={{ fontSize:9, fontWeight:800, color:m.text }}>{diff}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ background:"#fff", borderRadius:14, padding:18, marginBottom:10, border:"1px solid #E0E0EE" }}>
              <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 14px", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                3-Session Average Accuracy
              </p>
              {curriculum.sections.map(s => (
                <AccuracyBar key={s.id} secId={s.id} desc={s.title}
                  value={perf.section_accuracy[s.id]??50}
                  onChange={v => setPerf(p=>({...p, section_accuracy:{...p.section_accuracy,[s.id]:v}}))}
                />
              ))}
            </div>
            <div style={{ background:"#fff", borderRadius:14, padding:"11px 15px", marginBottom:14, border:"1px solid #E0E0EE", display:"flex", gap:14, flexWrap:"wrap" }}>
              {Object.entries(DIFF_META).map(([d,m]) => (
                <div key={d} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <DiffChip diff={d} />
                  <span style={{ fontSize:11, color:"#666" }}>{m.threshold}</span>
                </div>
              ))}
            </div>
            <button onClick={generate} disabled={status==="loading"} style={{
              width:"100%", padding:"14px 0", borderRadius:14, border:"none",
              background:status==="loading"?"#B0A8E8":"#7B68EE",
              color:"#fff", fontWeight:900, fontSize:14, cursor:status==="loading"?"default":"pointer"
            }}>
              {status==="loading" ? "Assembling..." : "✨  Generate Adaptive Session"}
            </button>
          </div>
        )}

        {/* -- TAB: ERROR PATTERNS ----------------------------------------- */}
        {activeTab==="errors" && curriculum && (
          <div>
            {/* Remediation logic explainer */}
            <div style={{ background:"#E8EAF6", borderRadius:12, padding:"11px 14px", marginBottom:12, border:"1px solid #C5CAE9" }}>
              <p style={{ fontSize:11, fontWeight:800, color:"#3949AB", margin:"0 0 4px" }}>
                RULE: Remediation Paradox Prevention
              </p>
              <p style={{ fontSize:11, color:"#3949AB", margin:0, lineHeight:1.6 }}>
                When a student fails a concept repeatedly, the AI will <strong>downgrade its difficulty</strong> (Hard to Medium, Medium to Easy) to rebuild understanding.
                It will also use a <strong>variant trap</strong> - same rule, different context - so the student learns the concept, not just memorizes one answer.
              </p>
              <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
                {[["Hard section","Hard to Medium"],["Medium section","Medium to Easy"],["Easy section","Easy stays Easy"]].map(([l,r]) => (
                  <div key={l} style={{ fontSize:10, background:"#fff", borderRadius:6, padding:"3px 8px", color:"#3949AB", fontWeight:600 }}>
                    {l}: {r}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:"#fff", borderRadius:14, padding:16, marginBottom:12, border:"1px solid #E0E0EE" }}>
              <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 10px", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                Active Error Patterns ({perf.frequentErrors.length})
              </p>
              {perf.frequentErrors.length===0 && (
                <p style={{ fontSize:12, color:"#CCC", textAlign:"center", padding:"14px 0" }}>No patterns recorded yet. Add below.</p>
              )}
              {perf.frequentErrors.map((e,i) => {
                const tgt = sectionTargets[e.section]?.target_difficulty || "Medium";
                return <ErrorTagCard key={i} err={e} remDiff={getRemediationDifficulty(tgt)} onRemove={removeError} />;
              })}
            </div>

            <div style={{ background:"#fff", borderRadius:14, padding:16, border:"1px solid #E0E0EE" }}>
              <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 12px", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                Add Error Pattern
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                <select value={newSec} onChange={e=>setNewSec(e.target.value)} style={{
                  padding:"7px 10px", borderRadius:8, border:"1.5px solid #E0E0EE", fontSize:12, minWidth:70
                }}>
                  {curriculum.sections.map(s=><option key={s.id} value={s.id}>S{s.id}</option>)}
                </select>
                <input value={newTag} onChange={e=>setNewTag(e.target.value)}
                  placeholder="Error topic tag (e.g. Subject-Verb Agreement)"
                  onKeyDown={e=>e.key==="Enter"&&addError()}
                  style={{ flex:1, padding:"7px 11px", borderRadius:8, border:"1.5px solid #E0E0EE", fontSize:12, minWidth:140 }}
                />
              </div>
              <input value={newTrap} onChange={e=>setNewTrap(e.target.value)}
                placeholder="Previous trap type (optional - helps AI generate a variant)"
                style={{ width:"100%", padding:"7px 11px", borderRadius:8, border:"1.5px solid #E0E0EE", fontSize:12, marginBottom:8, boxSizing:"border-box" }}
              />
              <button onClick={addError} style={{
                width:"100%", padding:"8px", borderRadius:8, border:"none",
                background:"#7B68EE", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer"
              }}>Add Error Pattern</button>
              <p style={{ fontSize:10, color:"#AAA", margin:"10px 0 6px" }}>
                Quick-add tags for S{newSec}:
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {(curriculum.topicTags[newSec]||[]).map(tag => (
                  <button key={tag} onClick={()=>setNewTag(tag)} style={{
                    padding:"3px 9px", borderRadius:20, border:"1px solid #E0E0EE",
                    background:"#F8F8FF", cursor:"pointer", fontSize:10, color:"#555"
                  }}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -- TAB: OUTPUT ------------------------------------------------- */}
        {activeTab==="output" && (
          <div>
            {status==="idle" && (
              <div style={{ textAlign:"center", padding:"50px 20px", color:"#AAA" }}>
                <div style={{ fontSize:42, marginBottom:10 }}>[ ]</div>
                <p style={{ fontSize:13, fontWeight:700 }}>No session generated yet.</p>
                <p style={{ fontSize:11 }}>Set accuracy, add error patterns, then Generate.</p>
              </div>
            )}
            {status==="loading" && (
              <div style={{ textAlign:"center", padding:"50px 20px" }}>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <div style={{ fontSize:40, animation:"spin 1.1s linear infinite", display:"inline-block", marginBottom:12 }}>...</div>
                <p style={{ fontWeight:800, color:"#7B68EE", fontSize:13 }}>Assembling adaptive session…</p>
                <p style={{ fontSize:11, color:"#AAA", marginTop:5 }}>
                  {perf.frequentErrors.length} error patterns . {curriculum?.sections.reduce((s,c)=>s+c.count,0)||0} questions
                </p>
              </div>
            )}
            {status==="error" && (
              <div style={{ background:"#FFF3F3", border:"1px solid #FFCDD2", borderRadius:14, padding:16, textAlign:"center" }}>
                <div style={{ fontSize:26, marginBottom:6 }}>!</div>
                <p style={{ fontWeight:800, color:"#B71C1C", margin:"0 0 5px" }}>Generation failed</p>
                <p style={{ fontSize:11, color:"#C62828", wordBreak:"break-word" }}>{errorMsg}</p>
              </div>
            )}
            {status==="done" && result && (
              <div>
                <div style={{
                  background:"#1a1a2e", borderRadius:14, padding:"13px 16px", marginBottom:10,
                  display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10
                }}>
                  <div>
                    <div style={{ color:"#7B68EE", fontWeight:900, fontSize:13 }}>{result.set_id}</div>
                    <div style={{ color:"#444", fontSize:10, marginTop:2 }}>
                      {result.curriculum?.grade} . {result.curriculum?.subject} . {result.curriculum?.stage}
                      {result.generated_at && ` . ${new Date(result.generated_at).toLocaleString("en-SG")}`}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:12 }}>
                    {[
                      { val:totalQ,                    label:"TOTAL Q" },
                      { val:remCount,                  label:"REMEDIATION" },
                      { val:validation?.errors?.length||0, label:"ERRORS" },
                      { val:validation?.score||0,      label:"QUALITY" },
                    ].map(({val,label}) => (
                      <div key={label} style={{ textAlign:"center" }}>
                        <div style={{ color:"#fff", fontWeight:900, fontSize:18 }}>{val}{label==="QUALITY"?"%":""}</div>
                        <div style={{ color:"#555", fontSize:9 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <ValidationPanel v={validation} />

                {result.remediation_tags_targeted?.length > 0 && (
                  <div style={{ background:"#FFF3F3", border:"1px solid #FFCDD2", borderRadius:10, padding:"9px 14px", marginBottom:10, display:"flex", flexWrap:"wrap", gap:5, alignItems:"center" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#B71C1C" }}>Remediation:</span>
                    {result.remediation_tags_targeted.map(t => <Chip key={t} label={t} bg="#FCE4EC" color="#B71C1C" />)}
                  </div>
                )}

                {result.slot_allocation && (
                  <div style={{ background:"#fff", border:"1px solid #E0E0EE", borderRadius:10, padding:"10px 14px", marginBottom:10 }}>
                    <p style={{ fontSize:10, fontWeight:800, color:"#888", margin:"0 0 8px", textTransform:"uppercase" }}>3-Slot Allocation</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {Object.entries(result.slot_allocation).map(([sec, slots]) => (
                        <div key={sec} style={{ fontSize:10, background:"#F8F8FF", borderRadius:7, padding:"4px 9px", border:"1px solid #EEEEF8" }}>
                          <strong>S{sec}</strong>
                          {" "}R:{slots.slot_a_remediation||0} B:{slots.slot_b_consolidation||0} S:{slots.slot_c_stretch||0}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {curriculum?.sections.map(secDef => {
                  const sd = result.sections?.[secDef.id];
                  if (!sd) return null;
                  const tgt = sectionTargets[secDef.id]?.target_difficulty || "Medium";
                  return (
                    <SectionPanel key={secDef.id}
                      secDef={secDef} sectionData={sd}
                      remDiff={getRemediationDifficulty(tgt)} />
                  );
                })}

                <button onClick={generate} style={{
                  width:"100%", padding:"12px 0", borderRadius:14, border:"2px solid #7B68EE",
                  background:"transparent", color:"#7B68EE", fontWeight:800, fontSize:13, cursor:"pointer", marginTop:4
                }}>🔄 Regenerate</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
