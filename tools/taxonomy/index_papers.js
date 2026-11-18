/* Build src/data/taxonomy/paperTags.json from hand-authored papers and
   src/data/p3/english/comprehension_generated.ts (no generator script in the repo).
   Reads ids, topics, tips, and formats only. Does not rewrite those files.
   Regenerate: node tools/taxonomy/index_papers.js
*/
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { tagEnglish, tagChineseByTopic, SECTION_TOPICS } = require('./tagItem');

const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(ROOT, 'src', 'data', 'taxonomy', 'paperTags.json');

function walkFiles(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkFiles(full, acc);
    else if (name.endsWith('.ts') && name !== 'index.ts' && name !== 'types.ts' && name !== 'schema.ts') acc.push(full);
  }
  return acc;
}

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)
      || ts.isParenthesizedExpression(node) || ts.isTypeAssertionExpression(node))) {
    node = node.expression;
  }
  return node;
}

function stringOf(node) {
  node = unwrap(node);
  if (!node) return '';
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  return '';
}

function propMap(obj) {
  const map = {};
  if (!obj || !ts.isObjectLiteralExpression(obj)) return map;
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const nameNode = prop.name;
    const name = nameNode && (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode)) ? nameNode.text : '';
    if (name) map[name] = prop.initializer;
  }
  return map;
}

const files = walkFiles(path.join(ROOT, 'src', 'data', 'p3'), [])
  .filter((file) => file.includes(`${path.sep}papers${path.sep}`) || file.endsWith('comprehension_generated.ts'));

const items = {};
const conflicts = [];
const untagged = [];
const conflictIds = new Set();
const parseErrors = [];
let seen = 0;

function sameTag(a, b) {
  return JSON.stringify(a.conceptIds) === JSON.stringify(b.conceptIds)
    && JSON.stringify(a.trapIds || []) === JSON.stringify(b.trapIds || [])
    && a.taxonomyStatus === b.taxonomyStatus;
}

function addItem(id, tag, meta) {
  seen += 1;
  if (!tag) {
    untagged.push({ id, ...meta });
    return;
  }
  const row = {
    conceptIds: tag.conceptIds,
    taxonomyStatus: tag.taxonomyStatus,
    subject: meta.subject,
    topic: meta.topic || '',
    file: meta.file,
  };
  if (tag.trapIds && tag.trapIds.length) row.trapIds = tag.trapIds;
  if (!items[id]) {
    items[id] = row;
    return;
  }
  if (!sameTag(items[id], row)) {
    conflicts.push({ id, file: meta.file, other: items[id].file });
    delete items[id];
    conflictIds.add(id);
  }
}

function visit(node, ctx) {
  if (!node) return;
  if (ts.isObjectLiteralExpression(node)) {
    const props = propMap(node);
    const typeName = stringOf(props.type);
    const topic = stringOf(props.topic) || (SECTION_TOPICS.has(typeName) ? typeName : '') || ctx.topic || '';
    const id = stringOf(props.id);
    const container = props.questions || props.items || props.blanks || props.plan;
    const stem = stringOf(props.stem) || stringOf(props.question) || stringOf(props.q) || stringOf(props.sentence) || '';
    const instruction = stringOf(props.instruction);
    const format = stringOf(props.format);
    const hasLeaf = props.answer || props.options || props.wrongWord || props.sentence || props.stem || props.question || props.q;
    if (id && hasLeaf && !container) {
      let tip = '';
      let trap = '';
      const solution = unwrap(props.solution);
      let method = '';
      if (solution && ts.isObjectLiteralExpression(solution)) {
        const sol = propMap(solution);
        tip = stringOf(sol.tip);
        trap = stringOf(sol.trap);
        method = stringOf(sol.method);
      }
      const section = topic || ctx.defaultSection;
      const tag = ctx.subject === 'chinese'
        ? tagChineseByTopic(topic, [stem, instruction].filter(Boolean).join('\n'))
        : tagEnglish({
          section,
          tip,
          stem,
          instruction,
          format,
          method,
          solution: trap ? { trap } : null,
        });
      addItem(id, tag, {
        subject: ctx.subject,
        topic,
        file: ctx.file,
      });
    }
    const next = { ...ctx, topic: topic || ctx.topic };
    for (const init of Object.values(props)) visit(init, next);
    return;
  }
  if (ts.isArrayLiteralExpression(node)) {
    for (const el of node.elements) visit(el, ctx);
    return;
  }
  ts.forEachChild(node, (child) => visit(child, ctx));
}

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const text = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const diagnostics = source.parseDiagnostics || [];
  if (diagnostics.length) {
    parseErrors.push({ file: rel, count: diagnostics.length, message: diagnostics[0].messageText });
  }
  const subject = rel.includes('/chinese/') ? 'chinese' : 'english';
  const defaultSection = rel.endsWith('comprehension_generated.ts') ? 'Comprehension' : '';
  visit(source, { subject, topic: '', file: rel, defaultSection });
}

const ordered = {};
for (const id of Object.keys(items).sort()) ordered[id] = items[id];

const payload = {
  version: 'v1-draft',
  status: 'DRAFT',
  generatedBy: 'tools/taxonomy/index_papers.js',
  note: 'Sidecar tags for hand-authored past papers and comprehension_generated.ts. Regenerate with node tools/taxonomy/index_papers.js. Do not hand-edit. Stems and answers are not stored.',
  unresolvedDuplicateIds: conflicts.map((row) => row.id).filter((id, i, all) => all.indexOf(id) === i).sort(),
  items: ordered,
};

fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n');

const byStatus = { certain: 0, uncertain: 0 };
const bySubject = {};
for (const row of Object.values(ordered)) {
  byStatus[row.taxonomyStatus] = (byStatus[row.taxonomyStatus] || 0) + 1;
  bySubject[row.subject] = bySubject[row.subject] || { certain: 0, uncertain: 0 };
  bySubject[row.subject][row.taxonomyStatus] += 1;
}
const untaggedTopics = {};
for (const row of untagged) {
  const key = row.subject + ':' + (row.topic || '(no topic)');
  untaggedTopics[key] = (untaggedTopics[key] || 0) + 1;
}
console.log(JSON.stringify({
  files: files.length,
  seen,
  tagged: Object.keys(ordered).length,
  byStatus,
  bySubject,
  conflicts: conflicts.length,
  untagged: untagged.length,
  untaggedTopics,
  parseErrors,
}, null, 2));
if (conflicts.length) console.log('conflicts', conflicts.length);
