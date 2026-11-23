// Local harness only. Finds one full English paper whose printed text contains "(2 marks)"
// and reports whether that item is auto-graded or left for a parent. No network. No secrets.
import { writeFileSync, mkdirSync } from "node:fs";
import { listPapers, publicPaper, gradeSubmission } from "../../src/lib/examServer.js";
import { parseMarks } from "../../src/lib/examEngine.js";

const HANGUL = /[\uac00-\ud7af]/;
const hits = [];
for (const p of listPapers()) {
  const pub = publicPaper(p.id);
  const graded = gradeSubmission(p.id, {});
  if (!pub || !graded) continue;
  const byId = new Map(graded.rows.map((r) => [r.id, r]));
  const texts = [];
  for (const sec of pub.sections || []) {
    for (const it of sec.items || []) {
      if (it.sentence) texts.push({ id: it.id, text: it.sentence });
    }
    for (const set of sec.sets || []) {
      if (set.passage) texts.push({ id: set.id, text: set.passage });
      for (const q of set.questions || []) texts.push({ id: q.id, text: q.stem || "" });
      for (const q of set.items || []) texts.push({ id: q.id, text: q.sentence || "" });
    }
  }
  for (const t of texts) {
    const printed = parseMarks(t.text);
    if (printed !== 2) continue;
    const row = byId.get(t.id);
    hits.push({
      paperId: p.id,
      label: p.label,
      school: p.school,
      questionId: t.id,
      printed,
      storedMarks: row ? row.marks : null,
      openEnded: row ? row.correct === null : null,
      snippet: String(t.text).replace(/\s+/g, " ").slice(0, 180),
      hangul: HANGUL.test(t.text),
    });
  }
}
const open = hits.find((h) => h.openEnded === true && h.storedMarks === 2);
const any = hits.find((h) => h.storedMarks === 2) || hits[0] || null;
const out = {
  papers: listPapers().length,
  printedTwoMarkItems: hits.length,
  chosen: open || any,
  sample: hits.slice(0, 8),
};
mkdirSync("tests/e2e/.state", { recursive: true });
writeFileSync("tests/e2e/.state/marks-paper.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify({ papers: out.papers, printedTwoMarkItems: out.printedTwoMarkItems, chosen: out.chosen }, null, 2));
