// Server-only: the mock-exam paper catalogue, the answer-free paper the student sits, and grading from the paper's own key
// (issue #44). Reuses the `paper:<paperKey>` grading primitives from PR #43 (learningGrade.resolveItem / paperKeyOf). The key never leaves this
// module except to the PARENT marking route (modelAnswers), never to a student.
import manifest from "@/data/papers/manifest.json";
import { flattenEnglishPool, paperKeyOf, englishPaperExamPlan } from "@/lib/p3PaperBridge";
import { indexSets } from "@/lib/reviewRounds";
import { resolveItem, getFormat } from "@/lib/learningGrade";
import { isFullPaper, minutesAllowed, minutesRule, paperFlags, paperMarks, paperLabel, FLAG_NOTES, isAnswered, summarize } from "@/lib/examEngine";

const SECTION_LABEL = {
  GrammarMCQ: "Grammar (multiple choice)", VocabMCQ: "Vocabulary (multiple choice)", GrammarCloze: "Grammar cloze",
  VocabCloze: "Vocabulary cloze", Editing: "Editing", Comprehension: "Comprehension",
};

let cat = null;
// Eligible papers (>= 45 marks, full answer key). Flagged papers are INCLUDED; flags ride along for a small neutral note.
export function catalogue() {
  if (cat) return cat;
  const pool = flattenEnglishPool();
  const rows = (manifest.papers || []).filter(isFullPaper).map((r) => {
    const paper = pool[r.poolIndex];
    if (!paper) return null;
    return { row: r, paper, key: paperKeyOf(paper) };
  }).filter(Boolean);
  const byId = new Map(rows.map((x) => [x.row.id, x]));
  cat = { rows, byId };
  return cat;
}

// Listing for the picker: no questions, no answers.
export function listPapers() {
  return catalogue().rows.map(({ row }) => ({
    id: row.id, label: paperLabel(row), school: row.school, year: row.year, type: row.typeNormalised || row.bucket,
    marks: paperMarks(row), minutes: minutesAllowed(row), minutesRule: minutesRule(row), questionCount: row.questionCount,
    flags: paperFlags(row), notes: paperFlags(row).map((f) => FLAG_NOTES[f]),
  }));
}

// Flat question list in printed order: [{ id, section, kind, marks }]. Duplicate ids inside one paper are listed once and marked ambiguous.
function flatten(plan) {
  const out = [];
  for (const sec of plan) {
    for (const it of sec.items) {
      if (sec.type.endsWith("MCQ")) out.push({ id: it.id, section: sec.type });
      else if (sec.type.endsWith("Cloze")) (it.blanks || []).forEach((b) => out.push({ id: it.id + "_" + b.num, section: sec.type }));
      else if (sec.type === "Editing") (it.items || []).forEach((q) => out.push({ id: q.id, section: sec.type }));
      else if (sec.type === "Comprehension") (it.questions || []).forEach((q) => out.push({ id: q.id, section: sec.type, marks: q.marks || 1 }));
    }
  }
  return out;
}

const cache = new Map();
function paperData(paperId) {
  const hit = catalogue().byId.get(paperId);
  if (!hit) return null;
  if (cache.has(paperId)) return cache.get(paperId);
  const plan = englishPaperExamPlan(hit.paper);
  const index = indexSets([{ setId: hit.key, plan }]).byId; // ONE paper: ids reused by other papers cannot make this one ambiguous
  const questions = flatten(plan);
  const seen = new Map();
  questions.forEach((q) => seen.set(q.id, (seen.get(q.id) || 0) + 1));
  const dup = new Set([...seen].filter(([, n]) => n > 1).map(([id]) => id));
  const d = { hit, plan, index, questions: questions.filter((q, i) => questions.findIndex((x) => x.id === q.id) === i), dup };
  cache.set(paperId, d);
  return d;
}
export function paperMeta(paperId) { const d = paperData(paperId); return d ? { row: d.hit.row, key: d.hit.key } : null; }

const pickQ = (q) => ({
  id: q.id, no: q.questionNo || null, fmt: getFormat(q), marks: q.marks || 1, stem: q.stem || q.question || "",
  options: (q.options || []).map((o) => (typeof o === "string" ? o : String(o && (o.text || o.label) || o))),
  sequenceItems: q.sequenceItems || null, statements: q.statements || null, abSentence: q.abSentence || null, abChoices: q.abChoices || null,
});
// The paper as the student sees it. Whitelist copy: answer, hints, solution and explanation fields are never copied.
export function publicPaper(paperId) {
  const d = paperData(paperId);
  if (!d) return null;
  const sections = d.plan.map((sec) => {
    const base = { type: sec.type, label: SECTION_LABEL[sec.type] || sec.type };
    if (sec.type.endsWith("MCQ")) return { ...base, items: sec.items.map((q) => ({ id: q.id, sentence: q.sentence || "", options: q.options || [] })) };
    if (sec.type.endsWith("Cloze")) return { ...base, sets: sec.items.map((s) => ({ id: s.id, label: s.setLabel, passage: s.passage || "", wordBank: s.wordBank || [], blanks: (s.blanks || []).map((b) => ({ id: s.id + "_" + b.num, num: b.num, choices: b.choices || null })) })) };
    if (sec.type === "Editing") return { ...base, sets: sec.items.map((s) => ({ id: s.id, label: s.setLabel, instructions: s.instructions, items: (s.items || []).map((q) => ({ id: q.id, sentence: q.sentence || "", wrongWord: q.wrongWord || "", options: q.options || [] })) })) };
    return { ...base, sets: sec.items.map((s) => ({ id: s.id, label: s.setLabel, passage: s.passage || "", questions: (s.questions || []).map(pickQ) })) };
  });
  return { sections, questionIds: d.questions.map((q) => q.id), questionCount: d.questions.length };
}

const clean = (v) => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") return v.slice(0, 500);
  if (Array.isArray(v)) return v.slice(0, 20).map((x) => (typeof x === "number" && Number.isFinite(x) ? x : typeof x === "string" ? x.slice(0, 500) : null));
  return null;
};
export function cleanAnswers(raw) {
  const out = Object.create(null);
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  for (const id of Object.keys(raw).slice(0, 400)) {
    const a = raw[id];
    if (!a || typeof a !== "object") continue;
    out[String(id).slice(0, 200)] = { val: clean(a.val), seq: clean(a.seq), reason: clean(a.reason), flagged: a.flagged === true };
  }
  return out;
}

// Autosave validation: keep only ids that belong to THIS paper (a student cannot write arbitrary rows), and only answered or flagged items.
export function cleanDraft(paperId, raw) {
  const d = paperData(paperId);
  if (!d) return null;
  const known = new Set(d.questions.map((q) => q.id));
  const src = cleanAnswers(raw), out = Object.create(null);
  for (const id of Object.keys(src)) if (known.has(id) && (isAnswered(src[id]) || src[id].flagged)) out[id] = src[id];
  return out;
}
// Rebuild an answers map from stored exam_answers rows (draft or final). Same shape cleanAnswers returns.
export function answersFromRows(rows) {
  const out = Object.create(null);
  for (const r of rows || []) {
    const a = r.answer && typeof r.answer === "object" ? r.answer : {};
    out[r.question_id] = { val: a.val === undefined ? null : a.val, seq: a.seq === undefined ? null : a.seq, reason: a.reason === undefined ? null : a.reason, flagged: r.flagged === true };
  }
  return out;
}

// Grade a submission. rows: one per question in printed order. correct: true/false, or null when not auto-graded (open-ended or ambiguous id).
export function gradeSubmission(paperId, answers) {
  const d = paperData(paperId);
  if (!d) return null;
  const rows = d.questions.map((q) => {
    const a = answers[q.id];
    const answered = isAnswered(a);
    const rec = d.dup.has(q.id) ? null : resolveItem(d.index, q.id);
    let correct = null;
    if (rec) {
      if (!answered) correct = false; // unanswered auto-graded item = wrong (shown as unanswered)
      else { const g = rec.grade({ val: a.val, seq: a.seq, reason: a.reason }); correct = g.scored ? !!g.correct : null; }
    }
    return { id: q.id, section: q.section, answered, correct, flagged: !!(a && a.flagged), answer: a || null };
  });
  const sum = summarize(rows);
  return { rows, ...sum, answered: rows.filter((r) => r.answered).length, count: rows.length, unanswered: rows.filter((r) => !r.answered).length };
}

// Parent-only: model answers for the items that are not auto-graded, so the parent can mark them. Never call from a student route.
export function modelAnswersForParent(paperId, ids) {
  const d = paperData(paperId);
  if (!d) return {};
  const want = new Set(ids);
  const out = {};
  for (const sec of d.plan) {
    if (sec.type !== "Comprehension") continue;
    for (const s of sec.items) for (const q of s.questions || []) if (want.has(q.id)) {
      out[q.id] = { question: q.stem || q.question || "", answer: Array.isArray(q.answer) ? q.answer.join("; ") : String(q.answer == null ? "" : q.answer) };
    }
  }
  return out;
}
