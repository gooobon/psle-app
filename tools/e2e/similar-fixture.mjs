// Builds tests/e2e/fixtures/similar.json from the real practice sets and
// similarQuestions(). Run with: npx tsx tools/e2e/similar-fixture.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { WA1_PRACTICE_SETS } from "../../src/data/p3/english/wa1_practice.ts";
import { buildTagIndex, similarQuestions, skillIdsOf } from "../../src/lib/similarItemsCore.js";

const PARENTS = new Set([
  "en.grammar", "en.language", "en.language.editing", "en.reading", "en.vocab", "en.writing",
]);

function rowsOf(sets) {
  const rows = [];
  for (const set of sets) {
    for (const sec of set.plan || []) {
      for (const node of sec.items || []) {
        push(node, sec.type, node.id);
        for (const key of ["items", "questions", "blanks"]) {
          for (const sub of node[key] || []) {
            const id = sub.id || (node.id && sub.num != null ? node.id + "_" + sub.num : "");
            if (id) push({ ...sub, id }, sec.type, id);
          }
        }
      }
    }
  }
  function push(item, section, id) {
    if (!id || !item) return;
    const stem = String(item.sentence || item.stem || item.q || item.wrongWord || id);
    rows.push({ id, section, item, stem: stem.slice(0, 140) });
  }
  return rows;
}

const rows = rowsOf(WA1_PRACTICE_SETS);
const index = buildTagIndex(rows.map((r) => ({ id: r.id, item: r.item })));
const byId = {};
for (const r of rows) {
  const tags = index.byId[r.id];
  byId[r.id] = {
    section: r.section,
    stem: r.stem,
    concepts: (tags && tags.conceptIds) || [],
    skills: skillIdsOf((tags && tags.conceptIds) || []).filter((id) => !PARENTS.has(id)),
  };
}

function similarOf(id, limit) {
  const seed = index.byId[id];
  if (!seed) return [];
  return similarQuestions(index, seed, { limit }).map((r) => r.id).filter((x) => byId[x]);
}

let editingSeed = null;
for (const id of Object.keys(byId)) {
  if (byId[id].section !== "Editing" || !byId[id].skills.length) continue;
  const ids = similarOf(id, 3);
  const sections = ids.map((x) => byId[x].section);
  if (ids.length >= 3 && sections.some((s) => s === "GrammarMCQ" || s === "VocabMCQ")) {
    editingSeed = { id, stem: byId[id].stem, skills: byId[id].skills, similar: ids, sections };
    break;
  }
}

let factSeed = null;
let inferenceLeak = null;
for (const id of Object.keys(byId)) {
  const c = byId[id].concepts;
  if (!c.includes("en.reading.fact_finding")) continue;
  const ids = similarOf(id, 3);
  if (ids.length < 1) continue;
  const bad = ids.filter((x) => byId[x].concepts.includes("en.reading.inference") && !byId[x].concepts.includes("en.reading.fact_finding"));
  if (!factSeed && bad.length === 0 && ids.every((x) => byId[x].concepts.includes("en.reading.fact_finding"))) {
    factSeed = { id, stem: byId[id].stem, similar: ids, sections: ids.map((x) => byId[x].section) };
  }
  if (bad.length) inferenceLeak = { id, bad };
}

const out = {
  generatedFrom: "src/data/p3/english/wa1_practice.ts + similarItemsCore.similarQuestions",
  editingSeed,
  factSeed,
  inferenceLeak,
  byId,
};
mkdirSync("tests/e2e/fixtures", { recursive: true });
writeFileSync("tests/e2e/fixtures/similar.json", JSON.stringify(out));
console.log(JSON.stringify({
  editingSeed: editingSeed && { id: editingSeed.id, sections: editingSeed.sections, skills: editingSeed.skills },
  factSeed: factSeed && { id: factSeed.id, sections: factSeed.sections, n: factSeed.similar.length },
  inferenceLeak: !!inferenceLeak,
  items: Object.keys(byId).length,
}, null, 2));
if (!editingSeed) process.exitCode = 2;
if (!factSeed) process.exitCode = 2;
