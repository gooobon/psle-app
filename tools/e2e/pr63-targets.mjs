// Read-only dump of the papers the PR #63 browser run will sit. No network, no writes.
// Run: node tools/e2e/pr63-targets.mjs
import { register } from "node:module";
import fs from "node:fs";
register("../exam_loader.mjs", import.meta.url);
const B = await import("../../src/lib/p3PaperBridge.js");
const S = await import("../../src/lib/examServer.js");
const E = await import("../../src/lib/examEngine.js");
const O = await import("../../src/lib/orderQuestions.js");
const L = await import("../../src/lib/learningGrade.js");

const snip = (s, n = 160) => String(s || "").replace(/\s+/g, " ").slice(0, n);
const offered = JSON.parse(fs.readFileSync(new URL("../../src/data/papers/manifest.json", import.meta.url), "utf8")).papers.filter(E.isFullPaper);
const pool = B.flattenEnglishPool();

function scan(row) {
  const paper = pool[row.poolIndex];
  const plan = B.englishPaperExamPlan(paper);
  const out = { id: row.id, label: E.paperLabel(row), school: row.school, year: row.year, bucket: row.bucket, cloze: [], orders: [], unreadable: [], open: [] };
  for (const sec of plan) {
    if (String(sec.type).endsWith("Cloze")) {
      for (const s of sec.items) {
        const blanks = (s.blanks || []).filter((b) => b && String(b.answer || "").trim());
        if (!blanks.length) continue;
        out.cloze.push({
          section: sec.type, setId: s.id, label: s.setLabel,
          passage: snip(s.passage, 280),
          wordBank: Array.isArray(s.wordBank) ? s.wordBank : null,
          blanks: blanks.map((b) => ({ id: b.id, num: b.num, answer: b.answer, choices: b.choices || null })),
        });
      }
    } else if (sec.type === "Comprehension") {
      for (const s of sec.items) for (const q of s.questions || []) {
        const fmt = L.getFormat(q);
        const text = q.stem || q.question || "";
        if (fmt === "sequence") {
          out.orders.push({ id: q.id, setId: s.id, items: q.sequenceItems || [], order: q.answer, stem: snip(text, 180), noPassage: !!s.noPassage });
        } else if (O.looksLikeOrderQuestion(text) && fmt !== "sequence") {
          out.unreadable.push({ id: q.id, fmt, answer: snip(Array.isArray(q.answer) ? q.answer.join(" | ") : q.answer, 120), stem: snip(text, 180), noPassage: !!s.noPassage });
        } else if (fmt === "open_sentence" || q.format === "open") {
          out.open.push({ id: q.id, fmt, stem: snip(text, 120), noPassage: !!s.noPassage });
        }
      }
    }
  }
  const g = S.gradeSubmission(row.id, {});
  out.gradeEmpty = g && { score: g.score, total: g.total, ungraded: g.ungraded, count: g.count, answered: g.answered };
  return out;
}

const scans = offered.map(scan);
const tao = scans.filter((s) => /tao nan/i.test(s.school) && s.cloze.some((c) => c.blanks.some((b) => Number(b.num) >= 21)));
const acs = scans.filter((s) => /anglo-chinese/i.test(s.school));
const withOrders = scans.filter((s) => s.orders.length >= 1).map((s) => ({ id: s.id, label: s.label, n: s.orders.length, open: s.open.length, unreadable: s.unreadable.length }));
const unreadable = scans.filter((s) => s.unreadable.length).map((s) => ({ id: s.id, label: s.label, n: s.unreadable.length, sample: s.unreadable[0] }));

// Practice past-paper mock: which school + session shows two tap-to-order cards.
const eoy = B.flattenEnglishPool ? null : null;
function practiceAt(school, sessionNum) {
  const plan = B.buildPastPaperPlan ? null : null;
  return null;
}
// buildPastPaperPlan lives in dataEngine and pulls pickByLevel. Call pickEnglishPaper + englishPaperToPlan directly.
const pickByLevel = (arr) => arr;
const pickQuestionsForSchool = (arr) => arr;
function practicePlan(school, sessionNum) {
  const paper = B.pickEnglishPaper({ schoolName: school, sessionNum, isPastPaper: true });
  const plan = B.englishPaperToPlan(paper, { Comprehension: { sets: 1 }, GrammarCloze: { sets: 1 }, VocabCloze: { sets: 1 }, Editing: { sets: 1 } }, "medium", sessionNum, school, pickByLevel, pickQuestionsForSchool);
  const comp = (plan || []).find((s) => s.type === "Comprehension");
  const orders = [];
  for (const set of (comp && comp.items) || []) for (const q of set.questions || []) {
    if (L.getFormat(q) === "sequence") orders.push({ id: q.id, items: q.sequenceItems, order: q.answer, stem: snip(q.stem || q.question, 140) });
  }
  return { paperLabel: plan.paperLabel, school: paper.meta && paper.meta.school, year: paper.meta && paper.meta.year, orders, nSets: (comp && comp.items || []).length };
}

const schools = [...new Set(scans.map((s) => s.school).filter(Boolean))];
let practiceHit = null;
for (const school of schools) {
  for (let session = 1; session <= 40 && !practiceHit; session++) {
    const p = practicePlan(school, session);
    if (p.orders.length >= 2) practiceHit = { school, session, ...p };
  }
  if (practiceHit) break;
}
if (!practiceHit) {
  for (const school of schools) {
    for (let session = 1; session <= 40 && !practiceHit; session++) {
      const p = practicePlan(school, session);
      if (p.orders.length >= 1) practiceHit = { school, session, ...p };
    }
    if (practiceHit) break;
  }
}
const e2ePractice = practicePlan("E2E Primary", 1);

const taoDetail = tao.map((s) => ({
  id: s.id, label: s.label, gradeEmpty: s.gradeEmpty, open: s.open.length, orders: s.orders.length, unreadable: s.unreadable.length,
  cloze: s.cloze.map((c) => ({ section: c.section, label: c.label, wordBank: c.wordBank, blanks: c.blanks, passage: c.passage })),
}));

const out = {
  tao: taoDetail,
  acs: acs.map((s) => ({ id: s.id, label: s.label, school: s.school, orders: s.orders.length, open: s.open.length, clozeNums: s.cloze.flatMap((c) => c.blanks.map((b) => b.num)) })),
  withOrders: withOrders.slice(0, 25),
  unreadable: unreadable.slice(0, 12),
  practiceHit,
  e2ePractice,
};
fs.mkdirSync("tests/e2e/.state", { recursive: true });
fs.writeFileSync("tests/e2e/.state/pr63-targets.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify({
  tao: taoDetail.map((t) => ({ id: t.id, label: t.label, blanks: t.cloze.flatMap((c) => c.blanks.map((b) => b.num + ":" + b.answer)), open: t.open, orders: t.orders, empty: t.gradeEmpty })),
  acs0: out.acs[0],
  practiceHit: practiceHit && { school: practiceHit.school, session: practiceHit.session, paperLabel: practiceHit.paperLabel, n: practiceHit.orders.length, orders: practiceHit.orders },
  e2ePractice,
  unreadable0: unreadable[0],
  orderPapers: withOrders.filter((s) => /tao nan|anglo/i.test(s.label)).slice(0, 8),
}, null, 2));
