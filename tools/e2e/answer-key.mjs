// Answer key for the role-play driver. Built from the practice sets the daily screen actually serves.
// Run: npx tsx tools/e2e/answer-key.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { WA1_PRACTICE_SETS } from "../../src/data/p3/english/wa1_practice.ts";
import { WA1_ZH_PRACTICE } from "../../src/data/p3/chinese/wa1_practice.ts";
import { buildPastPaperPlan, DEFAULT_SETTINGS } from "../../src/lib/dataEngine.js";
import { taxonomyIdsFor } from "../../src/lib/taxonomyLookup.js";
import { skillIdsOf } from "../../src/lib/similarItemsCore.js";

const SCORE_SETS = new Set(["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08"]);
const AUTO_COMP = new Set(["mcq", "ab_circle", "true_false", "sequence", "fill_blank", "fill_word"]);

function trapOf(item) {
  const t = item && item.explain && item.explain.trapType;
  return typeof t === "string" ? t : null;
}

function mcqIndex(q) {
  const opts = q.options || [];
  const a = q.answer;
  if (typeof a === "number") return a;
  if (typeof a === "string") {
    const li = a.toUpperCase().charCodeAt(0) - 65;
    if (li >= 0 && li < opts.length) return li;
    const n = parseInt(a, 10);
    if (!Number.isNaN(n)) return n >= 1 ? n - 1 : n;
  }
  return 0;
}

function pushBank(bank, id, section, item) {
  if (!id) return;
  const leaf = skillIdsOf(taxonomyIdsFor(String(id)) || [])[0] || null;
  bank.push({ id: String(id), section, skill: item && item.skill ? String(item.skill) : null, trapType: trapOf(item), leaf });
}

function fromEnglish(set, bank, detailed) {
  const items = [];
  for (const sec of set.plan || []) {
    for (const node of sec.items || []) {
      if (sec.type === "GrammarMCQ" || sec.type === "VocabMCQ") {
        pushBank(bank, node.id, sec.type, node);
        if (detailed) items.push({ id: node.id, kind: "mcq", section: sec.type, stem: node.sentence, answer: node.answer, n: (node.options || []).length, skill: node.skill || null, trapType: trapOf(node), gradable: true });
      } else if (sec.type === "GrammarCloze" || sec.type === "VocabCloze") {
        const passage = String(node.passage || "").slice(0, 80);
        for (const b of node.blanks || []) {
          const id = node.id + "_" + b.num;
          pushBank(bank, id, sec.type, b);
          if (detailed) items.push({ id, kind: "cloze", section: sec.type, passage, blank: b.num, answer: b.answer, skill: b.skill || null, trapType: trapOf(b), gradable: true, coupled: true });
        }
      } else if (sec.type === "Editing") {
        for (const it of node.items || []) {
          pushBank(bank, it.id, "Editing", it);
          if (detailed) items.push({ id: it.id, kind: "edit", section: "Editing", stem: it.sentence, answer: it.answer, skill: it.skill || null, trapType: trapOf(it), gradable: true });
        }
      } else if (sec.type === "Comprehension") {
        for (const q of node.questions || []) {
          const format = q.format || "open";
          const gradable = AUTO_COMP.has(format);
          pushBank(bank, q.id, "Comprehension", q);
          if (!detailed) continue;
          const kind = format === "mcq" ? "comp-mcq" : format === "ab_circle" ? "comp-ab" : format === "true_false" ? "comp-tf" : format === "sequence" ? "comp-seq" : format === "fill_blank" || format === "fill_word" ? "comp-fill" : "comp-open";
          const answer = kind === "comp-mcq" ? mcqIndex(q) : kind === "comp-seq" && !Array.isArray(q.answer) ? String(q.answer || "").split(",").map(Number) : q.answer;
          items.push({ id: q.id, kind, section: "Comprehension", stem: q.stem, answer, n: (q.options || []).length, skill: q.skill || null, trapType: trapOf(q), gradable });
        }
      } else if (detailed) {
        items.push({ id: node.id, kind: "synth", section: sec.type, stem: node.sentenceA || node.instruction || "", gradable: false });
      }
    }
  }
  return items;
}

function fromChinese(set, bank, detailed) {
  const items = [];
  for (const sec of set.plan || []) {
    if (sec.type === "HanziMcq" || sec.type === "PinyinMcq" || sec.type === "VocabMcq") {
      for (const node of sec.items || []) {
        pushBank(bank, node.id, sec.type, node);
        if (detailed) items.push({ id: node.id, kind: "mcq", section: sec.type, stem: node.sentence, answer: node.answer, n: (node.options || []).length, skill: node.skill || null, trapType: trapOf(node), gradable: true });
      }
    } else if (sec.type === "VocabMatch") {
      for (const node of sec.items || []) {
        for (const it of node.items || []) {
          const id = node.id + "_" + it.num;
          pushBank(bank, id, "VocabMatch", it);
          if (detailed) items.push({ id, kind: "match", section: "VocabMatch", stem: it.stem, answer: it.answer, skill: it.skill || null, trapType: trapOf(it), gradable: true, coupled: true });
        }
      }
    } else if (sec.type === "PassageCloze") {
      for (const node of sec.items || []) {
        const passage = String(node.passage || "").slice(0, 80);
        for (const b of node.blanks || []) {
          const id = node.id + "_" + b.num;
          pushBank(bank, id, "PassageCloze", b);
          if (detailed) items.push({ id, kind: "cloze", section: "PassageCloze", passage, blank: b.num, answer: b.answer, skill: b.skill || null, trapType: trapOf(b), gradable: true, coupled: true });
        }
      }
    } else if (sec.type === "ReadingMcq" || sec.type === "ReadingOpen") {
      for (const node of sec.items || []) {
        for (const q of node.questions || []) {
          const format = q.format || "open";
          const gradable = AUTO_COMP.has(format);
          pushBank(bank, q.id, sec.type, q);
          if (!detailed) continue;
          const kind = format === "mcq" ? "comp-mcq" : format === "ab_circle" ? "comp-ab" : format === "true_false" ? "comp-tf" : format === "sequence" ? "comp-seq" : format === "fill_blank" || format === "fill_word" ? "comp-fill" : "comp-open";
          const answer = kind === "comp-mcq" ? mcqIndex(q) : kind === "comp-seq" && !Array.isArray(q.answer) ? String(q.answer || "").split(",").map(Number) : q.answer;
          items.push({ id: q.id, kind, section: sec.type, stem: q.stem, answer, n: (q.options || []).length, skill: q.skill || null, trapType: trapOf(q), gradable });
        }
      }
    } else if (detailed) {
      for (const node of sec.items || []) items.push({ id: node.id, kind: "synth", section: sec.type, gradable: false });
    }
  }
  return items;
}

const bank = [];
const sets = {};
for (const set of WA1_PRACTICE_SETS) {
  const detailed = SCORE_SETS.has(set.setId);
  const items = fromEnglish(set, bank, detailed);
  if (detailed) sets[set.setId] = { items };
}
for (const set of WA1_ZH_PRACTICE) {
  const detailed = true;
  const items = fromChinese(set, bank, detailed);
  if (detailed) sets[set.setId] = { items };
}

const pastPapers = {};
for (const ses of [1, 2, 3, 4, 5, 6]) {
  const plan = buildPastPaperPlan(DEFAULT_SETTINGS, "E2E Primary", ses);
  pastPapers[String(ses)] = { paperKey: plan.paperKey, items: fromEnglish({ setId: "PAST" + ses, plan }, bank, true) };
}

mkdirSync("tests/e2e/fixtures", { recursive: true });
writeFileSync("tests/e2e/fixtures/answers.json", JSON.stringify({ sets, bank, pastPapers }));
const summary = {};
for (const [id, s] of Object.entries(sets)) {
  summary[id] = { items: s.items.length, gradable: s.items.filter((i) => i.gradable).length };
}
console.log(JSON.stringify({ sets: summary, bank: bank.length }));
