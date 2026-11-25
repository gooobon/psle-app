// Chinese mock exams (issue #146, follows #134 and docs/papers/chinese-mock-readiness.md).
// Turns ONE Chinese past paper into the same exam plan shape the English mock stack already runs
// ([{ type, label?, items }], see englishPaperExamPlan), with per-question marks taken from the sidecar src/data/papers/zh_marks.json.
// Server and self-test use it; nothing here is sent to a student (examServer.publicPaper whitelists fields).
// A paper is launchable only when: it is in the sidecar, every item has marks, the marks add up to the sourced total,
// the manifest agrees with that total, and every item is of a kind this plan can sit (MCQ, word bank, open-ended).
// Open-ended items are NEVER auto-marked here: examServer skips provisionalMark for Chinese and leaves them to the parent.
import zhMarks from "@/data/papers/zh_marks.json";
import { flattenChinesePool } from "@/lib/p3PaperBridge";

export const zhMarksSidecar = zhMarks;
export const marksEntryFor = (paperId) => (zhMarks.papers && zhMarks.papers[paperId]) || null;

// Marks are 'printed' on the question itself, or 'inferred_equal_split' (printed section total divided equally over its items).
export const MARK_BASES = ["printed", "inferred_equal_split"];

const leafId = (n) => { const m = /(\d+)[a-z]?$/.exec(String(n || "")); return m ? Number(m[1]) : null; };
const explainOf = (s) => (s && typeof s === "object" ? [s.method, ...(Array.isArray(s.steps) ? s.steps : []), s.tip].filter(Boolean).join(" ").slice(0, 600) : "");

// Marks per source question id, or null. Also returns the list of problems (empty when it reconciles).
export function checkMarks(entry, ids) {
  const errors = [];
  if (!entry) return { marks: null, errors: ["no marks entry"] };
  const marks = Object.create(null);
  let sum = 0;
  for (const s of entry.sections || []) {
    if (!MARK_BASES.includes(s.basis)) errors.push(`section ${s.topic}: unknown basis`);
    let ssum = 0;
    for (const [id, m] of Object.entries(s.marks || {})) {
      if (!Number.isInteger(m) || m < 1 || m > 20) errors.push(`${id}: bad marks`);
      if (id in marks) errors.push(`${id}: listed twice`);
      marks[id] = m; ssum += m;
    }
    if (ssum !== s.sectionTotal) errors.push(`section ${s.topic}: marks ${ssum} != section total ${s.sectionTotal}`);
    sum += ssum;
  }
  if (!Number.isInteger(entry.total) || sum !== entry.total) errors.push(`marks ${sum} != paper total ${entry.total}`);
  if (!entry.totalSource) errors.push("total has no source");
  for (const id of ids) if (!(id in marks)) errors.push(`${id}: no marks`);
  const known = new Set(ids);
  for (const id of Object.keys(marks)) if (!known.has(id)) errors.push(`${id}: marks for an item that is not in the paper`);
  return { marks: errors.length ? null : marks, errors };
}

// Walk the paper in printed order: [{ topic, set|null, q, ... }]. Anything else makes the paper unsupported.
function topicOf(raw) { return raw && raw.topic; }
const SINGLE = new Set(["BianZi", "PinYin", "CiYu"]);

// Returns { plan, ids, errors }. plan is null when the paper cannot be sat honestly (errors says why).
export function chinesePaperExamPlan(paper, entry) {
  const errors = [];
  const raws = (paper && paper.questions) || [];
  const pid = (paper && paper.meta && paper.meta.id) || "zh";
  // 1. every source question id, in order (sub-questions of a set included)
  const ids = [];
  for (const r of raws) { if (r && Array.isArray(r.questions)) r.questions.forEach((q) => ids.push(q.id)); else if (r) ids.push(r.id); }
  const { marks, errors: me } = checkMarks(entry, ids);
  errors.push(...me);
  if (!marks) return { plan: null, ids, errors };
  const labelOf = (topic) => ((entry.sections || []).find((s) => s.topic === topic) || {}).label || topic;

  const sections = [];
  const secFor = (topic, type) => { let s = sections.find((x) => x.topic === topic); if (!s) { s = { topic, type, label: labelOf(topic), items: [] }; sections.push(s); } return s; };
  for (const r of raws) {
    const t = topicOf(r);
    if (SINGLE.has(t) && !r.questions) {
      if (!Array.isArray(r.options) || r.options.length < 2 || typeof r.answer !== "number" || r.answer >= r.options.length) { errors.push(`${r.id}: not a sittable multiple choice`); continue; }
      secFor(t, "VocabMCQ").items.push({ id: r.id, sentence: r.q || "", options: r.options, answer: r.answer, marks: marks[r.id], explanation: explainOf(r.solution) });
    } else if (t === "PeiDui" || t === "TianKong") {
      const bank = Array.isArray(r.wordBank) ? r.wordBank : [];
      const blanks = [];
      (r.questions || []).forEach((q, i) => {
        const num = leafId(q.id) != null ? leafId(q.id) : i + 1;
        if (typeof q.answer !== "string" || !bank.includes(q.answer)) { errors.push(`${q.id}: answer is not in the word bank`); return; }
        blanks.push({ num, answer: q.answer, marks: marks[q.id], _line: q.q || "" });
      });
      const passage = t === "PeiDui" ? [r.passage || "", ...blanks.map((b) => `(${b.num}) ${b._line}`)].join("\n") : r.passage || "";
      secFor(t, "VocabCloze").items.push({ id: r.id, setLabel: r.setLabel || labelOf(t), passage, wordBank: bank, blanks: blanks.map(({ _line, ...b }) => b) });
    } else if (t === "JuZi" && !r.questions) {
      if (typeof r.answer !== "string" || !r.answer) { errors.push(`${r.id}: no model answer`); continue; }
      const s = secFor(t, "Comprehension");
      if (!s.items.length) s.items.push({ id: pid + "_juzi", setLabel: labelOf(t), passage: "", questions: [] });
      s.items[0].questions.push({ id: r.id, stem: [r.instruction, r.q].filter(Boolean).join("\n"), format: "open_sentence", answer: r.answer, marks: marks[r.id], solution: r.solution });
    } else if (t === "YueReadMCQ" || t === "YueReadOpen") {
      const qs = (r.questions || []).map((q) => {
        if (t === "YueReadMCQ") {
          if (!Array.isArray(q.options) || q.options.length < 2 || typeof q.answer !== "number" || q.answer >= q.options.length) { errors.push(`${q.id}: not a sittable multiple choice`); return null; }
          return { id: q.id, stem: q.q || "", format: "mcq", options: q.options, answer: q.answer, marks: marks[q.id], solution: q.solution };
        }
        if (typeof q.answer !== "string" || !q.answer) { errors.push(`${q.id}: no model answer`); return null; }
        return { id: q.id, stem: q.q || "", format: "open_sentence", answer: q.answer, marks: marks[q.id], solution: q.solution };
      });
      if (qs.some((q) => !q)) continue;
      secFor(t, "Comprehension").items.push({ id: r.id, setLabel: r.setLabel || labelOf(t), passage: r.passage || "", questions: qs });
    } else {
      errors.push(`${r && r.id}: unsupported item kind (${t})`);
    }
  }
  if (errors.length) return { plan: null, ids, errors };
  return { plan: sections.map(({ topic, ...s }) => s), ids, errors };
}

// Every Chinese row in the manifest with the reason it is or is not launchable. manifestPapers: manifest.papers.
export function chineseMockStatus(manifestPapers) {
  const pool = flattenChinesePool();
  const out = [];
  for (const row of manifestPapers || []) {
    if (row.subject !== "Chinese") continue;
    const entry = marksEntryFor(row.id);
    if (!entry) { out.push({ row, ok: false, reason: "no marks in zh_marks.json" }); continue; }
    const paper = pool.find((p) => p && p.meta && p.meta.id === row.id);
    if (!paper) { out.push({ row, ok: false, reason: "paper not found in the Chinese pool" }); continue; }
    if (row.hasAnswerKey !== true) { out.push({ row, ok: false, reason: "no complete answer key" }); continue; }
    if (typeof row.marks === "number" && row.marks !== entry.total) { out.push({ row, ok: false, reason: `manifest total ${row.marks} != sourced total ${entry.total}` }); continue; }
    const r = chinesePaperExamPlan(paper, entry);
    if (!r.plan) { out.push({ row, ok: false, reason: r.errors.slice(0, 3).join("; ") }); continue; }
    out.push({ row, ok: true, paper, entry, plan: r.plan, inferred: (entry.sections || []).some((s) => s.basis !== "printed") });
  }
  return out;
}
