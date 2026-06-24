import { allP3EnglishPapers } from "@/data/p3/english/papers";
import { allP3ChinesePapers } from "@/data/p3/chinese/papers";

// ── pools ────────────────────────────────────────────────────────────────────

export function flattenEnglishPool() {
  return [
    ...allP3EnglishPapers.wa1,
    ...allP3EnglishPapers.wa2,
    ...allP3EnglishPapers.wa3,
    ...allP3EnglishPapers.eoy,
  ];
}

export function flattenChinesePool() {
  return [
    ...allP3ChinesePapers.wa1,
    ...allP3ChinesePapers.wa2,
    ...allP3ChinesePapers.wa3,
    ...allP3ChinesePapers.eoy,
  ];
}

function schoolMatches(meta, schoolName) {
  if (!schoolName) return false;
  const target = schoolName.toLowerCase();
  const fields = [meta.school, meta.schoolZh, meta.source, meta.title, meta.id]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());
  return fields.some(
    (f) => f.includes(target) || target.includes(f.split(" ")[0]),
  );
}

export function pickEnglishPaper({ sessionNum = 1, schoolName, isPastPaper }) {
  const pool = isPastPaper
    ? allP3EnglishPapers.eoy.length
      ? allP3EnglishPapers.eoy
      : [...allP3EnglishPapers.wa2, ...allP3EnglishPapers.wa3]
    : [...allP3EnglishPapers.wa1, ...allP3EnglishPapers.wa2, ...allP3EnglishPapers.wa3];

  if (!pool.length) return { meta: { title: "No papers loaded" }, questions: [] };

  const bySchool = pool.filter((p) => schoolMatches(p.meta, schoolName));
  const list = bySchool.length ? bySchool : pool;
  return list[(Math.max(sessionNum, 1) - 1) % list.length];
}

export function pickChinesePaper({ sessionNum = 1, isPastPaper }) {
  const pool = isPastPaper
    ? allP3ChinesePapers.eoy
    : [...allP3ChinesePapers.wa1, ...allP3ChinesePapers.wa2, ...allP3ChinesePapers.wa3];

  if (!pool.length) return { meta: { title: "No papers loaded" }, questions: [] };
  return pool[(Math.max(sessionNum, 1) - 1) % pool.length];
}

// ── English adapters ─────────────────────────────────────────────────────────

function parseOptionTexts(options) {
  if (!Array.isArray(options)) return [];
  return options.map((o) =>
    typeof o === "string" ? o : o.text || o.label || String(o),
  );
}

function parseAnswerIndex(answer, options) {
  if (typeof answer === "number") {
    if (answer >= 0 && answer < options.length) return answer;
    if (answer >= 1 && answer <= options.length) return answer - 1;
  }
  if (typeof answer === "string") {
    const n = parseInt(answer, 10);
    if (!Number.isNaN(n)) {
      if (n >= 1 && n <= options.length) return n - 1;
      if (n >= 0 && n < options.length) return n;
    }
    const letterIdx = answer.toUpperCase().charCodeAt(0) - 65;
    if (letterIdx >= 0 && letterIdx < options.length) return letterIdx;
  }
  return 0;
}

function toEnglishMcq(q) {
  const options = parseOptionTexts(q.options);
  const sentence =
    q.sentence || q.stem || q.question || q.q || q.questionText || "";
  return {
    id: q.id || `q_${Math.random().toString(36).slice(2, 8)}`,
    topic: q.topic || "GrammarMCQ",
    sentence,
    options,
    answer: parseAnswerIndex(q.answer, options),
    hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    explanation:
      q.explanation ||
      (Array.isArray(q.solution?.steps)
        ? q.solution.steps.join(" ")
        : q.solution?.method || ""),
    highlights: q.highlights,
    ruleCard: q.ruleCard,
    emoji: q.emoji,
  };
}

function parseWordBankFromInstructions(text = "") {
  const matches = [...text.matchAll(/\([A-F]\)\s*([^()]+?)(?=\s*\([A-F]\)|$)/g)];
  if (matches.length) return matches.map((m) => m[1].trim());
  return null;
}

function letterToWordBankAnswer(letter, wordBank) {
  if (!letter || !wordBank?.length) return letter;
  const idx = String(letter).toUpperCase().charCodeAt(0) - 65;
  return wordBank[idx] || letter;
}

function toEnglishClozeSet(set) {
  const wordBank =
    set.wordBank ||
    parseWordBankFromInstructions(set.instructions) ||
    [];
  const blanks = (set.questions || set.blanks || []).map((q, i) => {
    const num = parseInt(q.questionNo || q.num || q.blank || i + 1, 10);
    const rawAns = q.answer ?? q.correctAnswer ?? "";
    const rawAnsStr = String(rawAns);
    const answer =
      wordBank.length && /^[A-F]$/i.test(rawAnsStr)
        ? letterToWordBankAnswer(rawAnsStr, wordBank)
        : rawAnsStr;
    return {
      num: Number.isNaN(num) ? i + 1 : num,
      answer,
      choices: q.choices || null,
      wordBank: q.wordBank || wordBank,
      hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    };
  });
  return {
    id: set.id || set.topic || "cloze_set",
    setLabel: set.setLabel || set.title || set.topic || "Cloze",
    passage: set.passage || "",
    wordBank,
    blanks,
  };
}

function toEnglishEditSet(set) {
  const items = (set.questions || set.items || []).map((q, i) => {
    // Editing answers are plain strings (e.g. "together", "becomes"),
    // NOT option indices. Never run parseAnswerIndex on them.
    const rawAnswer = q.answer ?? q.correctAnswer ?? "";
    const answer = String(rawAnswer);

    // wrongWord: explicit field > errorWord > extract [word] from stem > fallback
    let wrongWord = q.wrongWord || q.errorWord || q.highlight || "";
    if (!wrongWord) {
      const src = q.stem || q.sentence || q.question || "";
      const m = src.match(/\[([^\]]+)\]/);
      if (m) wrongWord = m[1];
    }
    wrongWord = wrongWord || "___";

    // sentence: strip [ ] bracket markers for cleaner display
    const rawSentence = q.sentence || q.stem || q.question || "";

    return {
      id: q.id || `${set.id || "ed"}_${q.questionNo || i}`,
      sentence: rawSentence,
      wrongWord,
      answer,
      hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
      solution: q.solution || null,
    };
  });
  return {
    id: set.id || "edit_set",
    setLabel: set.setLabel || set.title || set.topic || "Editing",
    instructions: set.instructions || "Correct the spelling or grammar error.",
    items,
  };
}

function toEnglishCompSet(set) {
  const passage =
    set.passage ||
    set.meta?.passageText ||
    set.readingPassage ||
    "";
  const questions = (set.questions || []).map((q, i) => {
    const options = parseOptionTexts(q.options);
    return {
      id: q.id || `comp_${i}`,
      question: q.question || q.stem || q.q || "",
      options,
      answer: parseAnswerIndex(q.answer, options),
      hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    };
  });
  return {
    id: set.id || "comp_set",
    setLabel: set.setLabel || set.title || set.topic || "Comprehension",
    passage,
    questions,
  };
}

function classifyEnglishItem(item) {
  const topic = item.topic || "";
  // Skip SentenceCombining (Word Order) — not yet supported
  if (topic.includes("SentenceCombining") || topic.includes("WordOrder")) return null;
  if (
    item.kind === "set" ||
    item.kind === "B" ||
    (item.questions && item.passage)
  ) {
    if (topic.includes("Comprehension") || topic === "VisualText")
      return "Comprehension";
    if (topic.includes("Editing")) return "Editing";
    if (topic.includes("VocabCloze")) return "VocabCloze";
    if (topic.includes("GrammarCloze") || topic.includes("Cloze"))
      return "GrammarCloze";
    if (item.passage && item.questions) return "Comprehension";
    return "GrammarCloze";
  }
  if (topic.includes("Vocab")) return "VocabMCQ";
  return "GrammarMCQ";
}

function normalizeEnglishQuestions(questions = []) {
  const buckets = {
    GrammarMCQ: [],
    VocabMCQ: [],
    GrammarCloze: [],
    VocabCloze: [],
    Editing: [],
    Comprehension: [],
  };

  for (const raw of questions) {
    if (!raw || typeof raw !== "object") continue;
    const type = classifyEnglishItem(raw);
    if (!type) continue; // Skip unsupported types (e.g. SentenceCombining)
    if (type.endsWith("MCQ")) {
      buckets[type].push(toEnglishMcq(raw));
    } else if (type === "GrammarCloze") {
      buckets.GrammarCloze.push(toEnglishClozeSet(raw));
    } else if (type === "VocabCloze") {
      buckets.VocabCloze.push(toEnglishClozeSet(raw));
    } else if (type === "Editing") {
      buckets.Editing.push(toEnglishEditSet(raw));
    } else if (type === "Comprehension") {
      buckets.Comprehension.push(toEnglishCompSet(raw));
    }
  }
  return buckets;
}

export function englishPaperToPlan(
  paper,
  settings,
  level,
  sessionNum,
  schoolName,
  pickByLevel,
  pickQuestionsForSchool,
  sectionLevels,
) {
  const buckets = normalizeEnglishQuestions(paper.questions || []);
  const s = settings || {};
  const sIdx = sessionNum ? (sessionNum - 1) % 10 : 0;
  const sections = [];

  // Per-section level: use sectionLevels[type] if available, else overall level
  const lvl = (type) =>
    (sectionLevels && sectionLevels[type]) ? sectionLevels[type] : (level || "medium");

  const gmAll = buckets.GrammarMCQ.length
    ? pickQuestionsForSchool(buckets.GrammarMCQ, schoolName, buckets.GrammarMCQ.length)
    : [];
  const vmAll = buckets.VocabMCQ.length
    ? pickQuestionsForSchool(buckets.VocabMCQ, schoolName, buckets.VocabMCQ.length)
    : [];

  const gmItems = gmAll.length
    ? pickByLevel(gmAll, lvl("GrammarMCQ"), sessionNum, Math.min(10, gmAll.length))
    : buckets.GrammarMCQ.slice(0, 10);
  const vmItems = vmAll.length
    ? pickByLevel(vmAll, lvl("VocabMCQ"), sessionNum, Math.min(10, vmAll.length))
    : buckets.VocabMCQ.slice(0, 10);

  if (gmItems.length) sections.push({ type: "GrammarMCQ", items: gmItems, level: lvl("GrammarMCQ") });
  if (vmItems.length) sections.push({ type: "VocabMCQ", items: vmItems, level: lvl("VocabMCQ") });

  ["GrammarCloze", "VocabCloze", "Editing", "Comprehension"].forEach((type) => {
    const sets = buckets[type];
    if (!sets.length) return;
    const maxSets = s[type]?.sets || 1;
    const chosen = [];
    for (let i = 0; i < maxSets; i++) chosen.push(sets[(sIdx + i) % sets.length]);
    sections.push({ type, sets: maxSets, items: chosen, level: lvl(type) });
  });

  sections.paperMeta = paper.meta;
  sections.paperLabel =
    paper.meta?.school ||
    paper.meta?.title ||
    paper.meta?.assessment ||
    "P3 English Paper";
  return sections;
}

export function englishPaperToLegacyInfo(paper) {
  return {
    label:
      paper.meta?.school ||
      paper.meta?.title ||
      paper.meta?.assessment ||
      "Past Paper",
    meta: paper.meta,
  };
}

// ── Chinese adapters ───────────────────────────────────────────────────────────

const ZH_TOPIC_SECTION = {
  BianZi: "BianZi",
  PinYin: "BianZi",
  CiYu: "CiYu",
  KanTu: "KanTu",
  PeiDui: "PeiDui",
  JuZi: "JuZi",
  TianKong: "JuZi",
  ZuJu: "ZuJu",
  YueReadMCQ: "YueRead",
  YueReadOpen: "YueRead",
};

function passageTextOf(item) {
  return (
    item.passage ||
    item.meta?.passageText ||
    item.readingPassage ||
    ""
  );
}

function toChineseBianZi(q) {
  return {
    id: q.id,
    sentence: q.sentence || q.q || "",
    options: q.options || [],
    answer: parseAnswerIndex(q.answer, q.options || []),
    pinyin: q.pinyin || "",
    hint:
      q.hint ||
      q.solution?.tip ||
      (Array.isArray(q.solution?.steps) ? q.solution.steps[0] : "") ||
      "",
    meaning: q.meaning || "",
    note: q.needsParentVerify ? "verify-parent" : undefined,
  };
}

function toChineseCiYu(q) {
  return toChineseBianZi(q);
}

function toChineseKanTuSet(item) {
  if (item.items) return item;
  return {
    id: item.id || "kantu_set",
    setLabel: item.setLabel || item.topic || "看图选词",
    wordBank: item.wordBank || [],
    items: item.items || item.questions || [],
  };
}

function toChinesePeiDuiSet(item) {
  const options = item.options || item.wordBank || [];
  const subQs = item.questions || item.items || [];
  return {
    id: item.id || "peidui_set",
    setLabel: item.setLabel || item.topic || "词语搭配",
    options,
    items: subQs.map((q, i) => ({
      id: q.id || `pd_${i}`,
      blank: q.blank || q.q || q.question || "",
      answer: typeof q.answer === "number" ? options[q.answer] : q.answer,
      hint: q.hint || q.solution?.tip || "",
    })),
  };
}

function toChineseJuZi(q) {
  if (q.tiles && q.targetSentence) return q;
  return {
    id: q.id,
    type: q.type || "expand",
    instruction: q.instruction || "排列词语组成句子",
    baseSentence: q.baseSentence || "",
    targetSentence: q.targetSentence || q.answer || "",
    tiles: q.tiles || [],
    hint: q.hint || q.solution?.tip || "",
  };
}

function toChineseZuJuSet(item) {
  return {
    id: item.id || "zuju_set",
    setLabel: item.setLabel || item.topic || "组句成段",
    sentences: item.sentences || [],
    correctOrder: item.correctOrder || item.sentences?.map((_, i) => i) || [],
    hint: item.hint || "",
  };
}

function toChineseYueReadSet(item) {
  const passage = passageTextOf(item);
  const questions = (item.questions || []).map((q, i) => ({
    id: q.id || `yr_${i}`,
    question: q.question || q.q || "",
    options: q.options || [],
    answer: parseAnswerIndex(q.answer, q.options || []),
    hint: q.hint || q.solution?.tip || "",
  }));
  return {
    id: item.id || "yue_read_set",
    setLabel: item.setLabel || item.topic || "阅读理解",
    passage,
    questions,
    meta: passage
      ? { hasPassage: true, passageText: passage }
      : item.meta,
  };
}

function flattenChineseRawQuestions(questions = []) {
  const flat = [];
  for (const item of questions) {
    if (!item) continue;
    if (Array.isArray(item)) {
      flat.push(...item);
      continue;
    }
    if (item.questions && Array.isArray(item.questions)) {
      flat.push(item);
      continue;
    }
    flat.push(item);
  }
  return flat;
}

export function buildChinesePlanFromPaper(paper, pickByLevel, level, sessionNum, sectionLevels) {
  const grouped = {
    BianZi: [],
    CiYu: [],
    KanTu: [],
    PeiDui: [],
    JuZi: [],
    ZuJu: [],
    YueRead: [],
  };

  const sets = {
    KanTu: [],
    PeiDui: [],
    ZuJu: [],
    YueRead: [],
  };

  // Per-section level helper — falls back to overall level
  const lvl = (type) =>
    (sectionLevels && sectionLevels[type]) ? sectionLevels[type] : (level || "medium");

  for (const raw of flattenChineseRawQuestions(paper.questions || [])) {
    const topic = raw.topic || "";
    const section = ZH_TOPIC_SECTION[topic] || null;

    if (raw.questions && (raw.passage || raw.wordBank || raw.setLabel)) {
      if (topic === "PeiDui" || raw.wordBank) sets.PeiDui.push(toChinesePeiDuiSet(raw));
      else if (topic === "KanTu" || raw.emoji || raw.items) sets.KanTu.push(toChineseKanTuSet(raw));
      else if (topic === "ZuJu" || raw.sentences) sets.ZuJu.push(toChineseZuJuSet(raw));
      else sets.YueRead.push(toChineseYueReadSet(raw));
      continue;
    }

    if (!section) continue;
    if (section === "BianZi") grouped.BianZi.push(toChineseBianZi(raw));
    else if (section === "CiYu") grouped.CiYu.push(toChineseCiYu(raw));
    else if (section === "JuZi") grouped.JuZi.push(toChineseJuZi(raw));
  }

  const plan = [];
  const sIdx = ((sessionNum || 1) - 1) % 10;

  // BianZi & CiYu: apply per-section level for question selection
  const bz = pickByLevel
    ? pickByLevel(grouped.BianZi, lvl("BianZi"), sessionNum, Math.min(5, grouped.BianZi.length))
    : grouped.BianZi.slice(0, 5);
  const cy = pickByLevel
    ? pickByLevel(grouped.CiYu, lvl("CiYu"), sessionNum, Math.min(4, grouped.CiYu.length))
    : grouped.CiYu.slice(0, 4);

  if (bz.length) plan.push({ type: "BianZi", items: bz, level: lvl("BianZi") });
  if (cy.length) plan.push({ type: "CiYu",   items: cy, level: lvl("CiYu") });

  // Set-based sections: difficulty reflected in level field for future use
  if (sets.KanTu.length)
    plan.push({ type: "KanTu",  set: sets.KanTu[sIdx % sets.KanTu.length],   level: lvl("KanTu") });
  if (sets.PeiDui.length)
    plan.push({ type: "PeiDui", set: sets.PeiDui[sIdx % sets.PeiDui.length], level: lvl("PeiDui") });

  const jzItems = grouped.JuZi.slice(0, 3);
  if (jzItems.length) plan.push({ type: "JuZi", items: jzItems, level: lvl("JuZi") });

  if (sets.ZuJu.length)
    plan.push({ type: "ZuJu",    set: sets.ZuJu[sIdx % sets.ZuJu.length],       level: lvl("ZuJu") });
  if (sets.YueRead.length)
    plan.push({ type: "YueRead", set: sets.YueRead[sIdx % sets.YueRead.length], level: lvl("YueRead") });

  plan.paperMeta = paper.meta;
  plan.isPastPaper = !!paper.meta?.assessment?.includes?.("EOY");
  return plan;
}
