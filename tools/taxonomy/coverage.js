/* Print v1 tag coverage. Reads generated practice files and the paper sidecar. */
const fs = require('fs');
const path = require('path');
const tax = require('../../src/data/taxonomy/taxonomy.json');
const paper = require('../../src/data/taxonomy/paperTags.json');

function readExportJson(file, marker) {
  const txt = fs.readFileSync(file, 'utf8');
  const startToken = marker || 'export const WA1_PRACTICE_SETS';
  if (marker) {
    const begin = txt.indexOf(marker) + marker.length;
    const end = txt.indexOf('/* WA1_ZH_', begin);
    return JSON.parse(txt.slice(begin, end).trim().replace(/;$/, ''));
  }
  const k = txt.lastIndexOf(startToken);
  let body = txt.slice(txt.indexOf('= ', k) + 2).trim();
  if (body.endsWith(';')) body = body.slice(0, -1);
  return JSON.parse(body);
}

function bump(map, key) { map[key] = (map[key] || 0) + 1; }

function summarise(name, nodes) {
  const status = { certain: 0, uncertain: 0, untagged: 0 };
  const concepts = {};
  const traps = {};
  let questions = 0;
  function walk(node, parentId) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach((child) => walk(child, parentId)); return; }
    const ownId = typeof node.id === 'string' ? node.id : '';
    const container = Array.isArray(node.questions) || Array.isArray(node.items) || Array.isArray(node.blanks) || Array.isArray(node.plan);
    const isQ = !container && (node.sentence != null || node.stem != null || node.q != null || node.question != null
      || node.sentenceA != null || node.wrongWord != null || node.options != null
      || (node.answer != null && (node.skill || node.conceptIds || node.format || node.num != null)));
    if (isQ && (ownId || (parentId && node.num != null))) {
      questions += 1;
      if (node.conceptIds && node.conceptIds.length) {
        status[node.taxonomyStatus || 'certain'] += 1;
        for (const id of node.conceptIds) bump(concepts, id);
        for (const id of node.trapIds || []) bump(traps, id);
      } else status.untagged += 1;
    }
    const next = ownId || parentId;
    for (const value of Object.values(node)) if (value && typeof value === 'object') walk(value, next);
  }
  walk(nodes, '');
  return { name, questions, status, concepts, traps };
}

const en = summarise('english WA1 (incl. comprehension)', readExportJson('src/data/p3/english/wa1_practice.ts'));
const zh = summarise('chinese WA1', readExportJson('src/data/p3/chinese/wa1_practice.ts', '/* WA1_ZH_JSON_BEGIN */\n'));
const drill = summarise('chinese drill', readExportJson('src/data/p3/chinese/wa1_drill.ts', '/* WA1_ZH_DRILL_JSON_BEGIN */\n'));

const paperStatus = { certain: 0, uncertain: 0 };
const paperSubject = { english: { certain: 0, uncertain: 0 }, chinese: { certain: 0, uncertain: 0 } };
const paperConcepts = {};
const paperTraps = {};
for (const row of Object.values(paper.items)) {
  paperStatus[row.taxonomyStatus] += 1;
  paperSubject[row.subject][row.taxonomyStatus] += 1;
  for (const id of row.conceptIds) bump(paperConcepts, id);
  for (const id of row.trapIds || []) bump(paperTraps, id);
}

const used = new Set([
  ...Object.keys(en.concepts), ...Object.keys(zh.concepts), ...Object.keys(drill.concepts), ...Object.keys(paperConcepts),
]);
const outOfScope = new Set((tax.scope && tax.scope.outOfScopeSubjects) || ['math', 'science']);
const unused = tax.concepts.filter((c) => !used.has(c.id) && !outOfScope.has(c.subject)).map((c) => c.id);
const outOfScopeIds = tax.concepts.filter((c) => outOfScope.has(c.subject)).map((c) => c.id);
const unknown = [...used].filter((id) => !tax.concepts.some((c) => c.id === id));

const report = {
  englishWa1: en,
  chineseWa1: zh,
  chineseDrill: drill,
  papers: {
    tagged: Object.keys(paper.items).length,
    status: paperStatus,
    subject: paperSubject,
    unresolvedDuplicateIds: paper.unresolvedDuplicateIds || [],
    concepts: paperConcepts,
    traps: paperTraps,
  },
  mathQuestions: 0,
  scienceQuestions: 0,
  outOfScopeSubjects: [...outOfScope],
  outOfScopeConceptIds: outOfScopeIds,
  unusedConceptIds: unused,
  unknownConceptIds: unknown,
};
fs.writeFileSync(path.join('tools', 'taxonomy', 'coverage.json'), JSON.stringify(report, null, 2));
function brief(block) {
  const top = Object.entries(block.concepts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log(`\n${block.name}: questions=${block.questions} certain=${block.status.certain} uncertain=${block.status.uncertain} untagged=${block.status.untagged}`);
  console.log('  top', top.map(([id, n]) => `${id}:${n}`).join(', '));
  console.log('  traps', block.traps);
}
brief(en); brief(zh); brief(drill);
console.log('\npapers tagged', report.papers.tagged, report.papers.status, report.papers.subject);
console.log('unresolved', report.papers.unresolvedDuplicateIds);
console.log('out of scope (not used)', outOfScopeIds.length);
console.log('unused in-scope concepts', unused.length);
console.log(unused.join('\n'));
if (unknown.length) console.log('UNKNOWN', unknown);
