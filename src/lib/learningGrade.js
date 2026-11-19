// Server-side grading for the learning dashboard (issue #42). Pure functions, no storage, no network.
// The server grades the student's SUBMITTED ANSWER against the bank; it never trusts client-sent correct / firstTry / weight.
// The grading rules mirror src/components/ExamSession.js (normTyped, cmp, gradeQuestion). Keep them in sync.
// Nothing here returns or logs the answer key: gradeSubmitted() only reports { scored, correct }.
import { indexSets } from "@/lib/reviewRounds";
import { englishPaperGradeSets } from "@/lib/p3PaperBridge";

// Same normalisation as ExamSession.normTyped (typed answers from iOS keyboards use curly quotes).
export function normTyped(s) {
  return String(s == null ? "" : s).normalize("NFC")
    .replace(/[‘’ʼ′＇´`]/g, "'")
    .replace(/[“”＂]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/ /g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}
const norm = (s) => normTyped(s).replace(/[.,!?'"]/g, "");

export function getFormat(q) {
  const f = q.format || "";
  if (["fill_blank", "fill_word", "mcq", "ab_circle", "true_false", "sequence", "tf_reason", "open_sentence"].includes(f)) return f;
  if (f === "truefalse") return "true_false";
  if (f === "truefalse_reason") return "tf_reason";
  if (f === "fill" || f === "fill_short") return "fill_blank";
  if (f === "open" || f === "open_multi") return "open_sentence";
  if (q.statements && q.statements.length) return "true_false";
  if (q.abSentence || q.abChoices) return "ab_circle";
  if (q.sequenceItems && q.sequenceItems.length) return "sequence";
  if (q.options && q.options.length >= 2) return "mcq";
  return "open_sentence";
}
function correctIdxForMcq(q) {
  const opts = (q.options || []).map((o) => (typeof o === "string" ? o : String(o.text || o)));
  const a = q.answer;
  if (typeof a === "number") return a;
  if (typeof a === "string") {
    const li = a.toUpperCase().charCodeAt(0) - 65;
    if (li >= 0 && li < opts.length) return li;
    const n = parseInt(a, 10);
    if (!isNaN(n)) return n >= 1 ? n - 1 : n;
  }
  return 0;
}
// a = { val, seq[], reason }. Returns null when the question is not auto-graded (open sentence).
function gradeComprehension(q, a) {
  const f = getFormat(q), val = a.val;
  if (f === "open_sentence") return null;
  if (f === "mcq") return val === correctIdxForMcq(q);
  if (f === "ab_circle") return norm(val) === norm(q.answer);
  if (f === "true_false") {
    const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
    return correct.every((x, i) => norm((Array.isArray(val) ? val : [])[i]) === norm(x));
  }
  if (f === "sequence") {
    const items = q.sequenceItems || q.items || [];
    const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || "").split(",").map(Number);
    const seq = Array.isArray(a.seq) ? a.seq : [];
    return items.every((_, i) => parseInt(seq[i] || "0", 10) === correct[i]);
  }
  if (f === "fill_blank" || f === "fill_word") {
    const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
    return accept.some((x) => norm(val) === norm(x));
  }
  if (f === "tf_reason") return norm(val) === norm(q.answer);
  return null;
}

// Lazy index of every served item per subject: id -> { leaf | container, sectionType, setId }.
const cache = {};
export function itemIndex(subject, loadSets) {
  if (!cache[subject]) cache[subject] = indexSets(loadSets());
  return cache[subject].byId;
}

const trapOf = (x) => (x && x.explain && typeof x.explain.trapType === "string" && x.explain.trapType.length <= 24 ? x.explain.trapType : null);

// Past-paper items are a separate index from the 60 practice sets. Some comprehension ids
// (q28_41 and the like) exist in both with different answers, so a past-paper trial must
// not be graded against the practice set, and a daily set must not be graded against a paper.
let paperCache = null;
function paperBank() {
  if (paperCache) return paperCache;
  const byId = Object.create(null);
  const sig = Object.create(null);
  const keys = new Set();
  for (const set of englishPaperGradeSets()) {
    keys.add(set.setId);
    const part = indexSets([set]).byId;
    for (const id of Object.keys(part)) {
      const s = answerSig(part[id], id);
      if (Object.prototype.hasOwnProperty.call(sig, id) && sig[id] !== s) byId[id] = null;
      else { sig[id] = s; if (byId[id] !== null) byId[id] = part[id]; }
    }
  }
  paperCache = { byId, keys };
  return paperCache;
}
function answerSig(hit, id) {
  if (!hit) return "";
  if (hit.leaf) return "leaf:" + JSON.stringify(hit.leaf.answer);
  const c = hit.container || {};
  const num = Number(String(id).slice(String(hit.containerId || "").length + 1));
  if (Array.isArray(c.blanks)) {
    const b = c.blanks.find((x) => x.num === num);
    return "blank:" + (b ? JSON.stringify(b.answer) : "");
  }
  if (Array.isArray(c.questions)) {
    const q = c.questions.find((x) => x && x.id === id);
    return "q:" + (q ? JSON.stringify(q.answer) + "|" + (q.format || "") : "");
  }
  if (Array.isArray(c.items)) {
    const it = c.items.find((x) => x && x.id === id);
    return "item:" + (it ? JSON.stringify(it.answer) : "");
  }
  return "other";
}

// setId "paper:<paperKey>" selects the past-paper bank. Anything else is the practice bank.
// An unknown paper key resolves to null so a client cannot point a practice item at a paper.
export function resolveSubmitted(practiceById, itemId, setId) {
  if (typeof setId === "string" && setId.startsWith("paper:")) {
    const bank = paperBank();
    if (!bank.keys.has(setId.slice("paper:".length))) return null;
    const hit = bank.byId[itemId];
    if (!hit) return null;
    return resolveItem(bank.byId, itemId);
  }
  return resolveItem(practiceById, itemId);
}

// Resolve one id to a gradable record { setId, sectionType, skill, grade(answerPayload) } or null (unknown / not auto-graded).
// skill here is the item's OWN tag (zh skill) or null; the caller adds taxonomy / section fallbacks.
export function resolveItem(byId, id) {
  const hit = byId[id];
  if (!hit) return null;
  const base = { setId: hit.setId, sectionType: hit.sectionType };
  if (hit.leaf) { // MCQ family
    const q = hit.leaf;
    if (q.id !== id || typeof q.answer !== "number") return null;
    return { ...base, skill: q.skill || null, trap: trapOf(q), grade: (p) => ({ scored: true, correct: p.val === q.answer }) };
  }
  const c = hit.container, cid = hit.containerId;
  const num = Number(String(id).slice(cid.length + 1));
  if (Array.isArray(c.blanks)) { // cloze blank
    const b = String(id).startsWith(cid + "_") ? c.blanks.find((x) => x.num === num) : null;
    if (!b) return null;
    return { ...base, skill: b.skill || null, trap: trapOf(b), grade: (p) => ({ scored: true, correct: normTyped(p.val) === normTyped(b.answer) }) };
  }
  if (Array.isArray(c.questions)) { // comprehension / reading question
    const q = c.questions.find((x) => x && x.id === id);
    if (!q) return null;
    if (getFormat(q) === "open_sentence") return null;
    return { ...base, skill: q.skill || null, trap: trapOf(q), grade: (p) => { const r = gradeComprehension(q, p); return r == null ? { scored: false, correct: false } : { scored: true, correct: r }; } };
  }
  if (Array.isArray(c.items)) { // match item or editing item
    const it = c.items.find((x) => x && (x.id === id || (x.num === num && String(id) === cid + "_" + num)));
    if (!it || it.answer == null) return null;
    const typed = hit.sectionType === "Editing";
    return { ...base, skill: it.skill || null, trap: trapOf(it), grade: (p) => ({ scored: true, correct: typed ? normTyped(p.val) === normTyped(it.answer) : p.val === it.answer }) };
  }
  return null;
}
