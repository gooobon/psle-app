// Server-only: the mock-exam paper catalogue, the answer-free paper the student sits, and grading from the paper's own key
// (issue #44). Reuses the `paper:<paperKey>` grading primitives from PR #43 (learningGrade.resolveItem / paperKeyOf). The key never leaves this
// module except to the PARENT marking route (modelAnswers), never to a student.
import manifest from "@/data/papers/manifest.json";
import { flattenEnglishPool, paperKeyOf, englishPaperExamPlan } from "@/lib/p3PaperBridge";
import { indexSets } from "@/lib/reviewRounds";
import { resolveItem, getFormat } from "@/lib/learningGrade";
import { isFullPaper, minutesAllowed, minutesRule, paperFlags, paperMarks, paperLabel, FLAG_NOTES, isAnswered, summarize, pickNotebookRows, notebookAttemptKey } from "@/lib/examEngine";
import { taxonomyIdsFor } from "@/lib/taxonomyLookup";
import { skillIdsOf } from "@/lib/similarItemsCore";

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

// ── Phase 2 (issue #48): post-submit review, notebook rows, mock trials. SERVER ONLY: these functions read the answer key and are
// called only for the student's OWN finished attempt (examEngine.canReview) or for server-side writes. Never call from an in-progress path.
const letter = (i) => String.fromCharCode(65 + i);
const joinText = (v) => (v == null ? "" : Array.isArray(v) ? v.filter((x) => x != null && x !== "").join("; ") : String(v));
const optLine = (options, idx) => (Number.isInteger(idx) && options && options[idx] != null ? letter(idx) + ". " + options[idx] : null);
function solutionText(sol) {
  if (!sol || typeof sol !== "object") return "";
  const steps = Array.isArray(sol.steps) ? sol.steps.join(" ") : "";
  return [sol.method, steps, sol.tip].filter(Boolean).join(" ").slice(0, 600);
}
const mcqIdx = (q) => {
  const a = q.answer;
  if (typeof a === "number") return a;
  if (typeof a === "string") { const li = a.toUpperCase().charCodeAt(0) - 65; if (li >= 0 && li < (q.options || []).length) return li; }
  return null;
};
// How a stored answer reads to a human: "B. text" for a choice, the words for typed text, "True; False" for a list, "" for blank.
export function describeAnswer(options, a) {
  if (!a || typeof a !== "object") return "";
  if (typeof a.val === "number") return optLine(options, a.val) || String(a.val);
  if (Array.isArray(a.val) && a.val.some((x) => x != null && x !== "")) return a.val.map((x) => (x == null ? "-" : String(x))).join("; ");
  if (Array.isArray(a.seq) && a.seq.some((x) => x != null && x !== "")) return a.seq.map((x) => (x == null || x === "" ? "-" : String(x))).join(", ");
  return typeof a.val === "string" ? a.val : "";
}

const detailCache = new Map();
// id -> { section, no, prompt, options, correctText, explanation } in the paper's own words. Built from the plan the grader uses.
function detailsFor(paperId) {
  if (detailCache.has(paperId)) return detailCache.get(paperId);
  const d = paperData(paperId);
  if (!d) return null;
  const m = new Map();
  for (const sec of d.plan) {
    if (sec.type.endsWith("MCQ")) {
      for (const q of sec.items) m.set(q.id, { section: sec.type, prompt: q.sentence || "", options: q.options || [], correctText: optLine(q.options, q.answer) || "", explanation: String(q.explanation || "").slice(0, 600) });
    } else if (sec.type.endsWith("Cloze")) {
      for (const s of sec.items) for (const b of s.blanks || []) {
        const at = (s.passage || "").indexOf("(" + b.num + ")");
        const ctx = at >= 0 ? "…" + s.passage.slice(Math.max(0, at - 70), at + 30).replace(/\s+/g, " ") + "…" : "";
        m.set(s.id + "_" + b.num, { section: sec.type, prompt: `${s.setLabel || "Cloze"}, blank (${b.num})${ctx ? ": " + ctx : ""}`, options: b.choices || (s.wordBank && s.wordBank.length ? s.wordBank : []), correctText: String(b.answer == null ? "" : b.answer), explanation: "" });
      }
    } else if (sec.type === "Editing") {
      for (const s of sec.items) for (const q of s.items || []) {
        const ans = typeof q.answer === "number" ? optLine(q.options, q.answer) || String(q.answer) : String(q.answer == null ? "" : q.answer);
        m.set(q.id, { section: sec.type, prompt: (q.sentence || "") + (q.wrongWord ? `  [check: ${q.wrongWord}]` : ""), options: q.options || [], correctText: ans, explanation: "" });
      }
    } else if (sec.type === "Comprehension") {
      for (const s of sec.items) for (const q of s.questions || []) {
        const fmt = getFormat(q), opts = (q.options || []).map((o) => (typeof o === "string" ? o : String(o && (o.text || o.label) || o)));
        let correct;
        if (fmt === "mcq") correct = optLine(opts, mcqIdx(q)) || joinText(q.answer);
        else if (fmt === "ab_circle") correct = joinText(q.answer);
        else if (fmt === "true_false") correct = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((x, i) => ((q.statements || [])[i] ? (q.statements[i] + " - ") : "") + x).join("; ");
        else correct = joinText(q.answer);
        const choices = fmt === "ab_circle" ? (q.abChoices || ["A", "B"]) : opts;
        m.set(q.id, { section: sec.type, no: q.questionNo || null, prompt: q.stem || q.question || "", options: choices, correctText: correct, explanation: solutionText(q.solution) });
      }
    }
  }
  detailCache.set(paperId, m);
  return m;
}

// The review list for ONE finished attempt: answer rows as stored in exam_answers (question_id, answer, correct, parent_correct, flagged).
// Open-ended items (correct null) carry the model answer and the parent's mark when there is one. An id that appears twice in a paper is
// ambiguous: shown with the student's answer but no key (it was never auto-graded).
export function reviewItems(paperId, rows, status) {
  const d = paperData(paperId), det = detailsFor(paperId);
  if (!d || !det) return null;
  const byId = new Map((rows || []).map((r) => [r.question_id, r]));
  return d.questions.map((q) => {
    const r = byId.get(q.id) || {};
    const x = det.get(q.id) || {};
    const a = r.answer && typeof r.answer === "object" ? r.answer : null;
    const answered = isAnswered(a);
    const ambiguous = d.dup.has(q.id);
    return {
      id: q.id, section: q.section, no: x.no || null, prompt: x.prompt || "", yourAnswer: describeAnswer(x.options, a), answered,
      correct: r.correct === true ? true : r.correct === false ? false : null,
      openEnded: r.correct == null && !ambiguous,
      correctAnswer: ambiguous ? "" : x.correctText || "", explanation: ambiguous ? "" : x.explanation || "", ambiguous,
      // An auto-graded item whose paper data has no readable key (e.g. a "multiple choice" item stored without options). Shown as such, never with a guessed key.
      keyMissing: r.correct != null && !ambiguous && !x.correctText,
      parentMark: r.parent_correct === true ? true : r.parent_correct === false ? false : null,
      timeSuggested: !answered && status === "auto_submitted",
    };
  });
}

// wrong_answers rows for a submitted paper (capped, see examEngine.pickNotebookRows). Written by the server with the service role.
export function notebookRows(paperId, graded, { studentId, attemptId, grade, nowIso }) {
  const d = paperData(paperId), det = detailsFor(paperId);
  if (!d || !det) return { rows: [], skipped: 0 };
  // Items with no readable key are left out: a notebook entry with no correct answer teaches nothing (and the item cannot be answered correctly anyway).
  const { picked, skipped } = pickNotebookRows(graded.rows.filter((r) => !d.dup.has(r.id) && (det.get(r.id) || {}).correctText));
  const rows = picked.map((r) => {
    const x = det.get(r.id) || {};
    return {
      student_id: studentId, subject: "English", grade: grade || null, question_id: r.id, attempt_key: notebookAttemptKey(attemptId),
      student_answer: r.answered ? describeAnswer(x.options, r.answer).slice(0, 500) : "(no answer)", correct_answer: (x.correctText || "").slice(0, 500),
      question_text: (x.prompt || "").slice(0, 2000), section_type: r.section, source_id: paperId, attempted_at: nowIso,
      taxonomy_ids: taxonomyIdsFor(r.id) || null,
    };
  });
  return { rows, skipped };
}

// Skill key stored on a mock trial: taxonomy leaf when confidently tagged, else the item's own skill / trap / section key (same as /api/learning/trials).
function trialSkill(id, rec) {
  const leaf = skillIdsOf(taxonomyIdsFor(id) || [])[0];
  return leaf || rec.skill || rec.trap || ("sec:" + rec.sectionType);
}
// One candidate per auto-graded item (open-ended and ambiguous items never count). setId is the paper key, so a retake of the same paper
// produces the SAME dedupe key and is ignored (same-question redo never affects mastery, homeworkMastery.js rule 1).
export function mockTrialCandidates(paperId, graded) {
  const d = paperData(paperId);
  if (!d) return null;
  const out = [];
  for (const r of graded.rows) {
    if (r.correct === null || d.dup.has(r.id)) continue;
    const rec = resolveItem(d.index, r.id);
    if (!rec || !((detailsFor(paperId).get(r.id) || {}).correctText)) continue; // no readable key = not a trustworthy mastery signal
    out.push({ itemId: r.id, correct: r.correct === true, skill: trialSkill(r.id, rec), setId: "paper:" + d.hit.key });
  }
  return out;
}
