// Query questions that share a concept id or a trap id.
// Not wired into the UI. Callers pass items (or the rows from collectQuestions).
// Item fields win over the optional overlay (paper sidecar), which is keyed by id.
//
// A row is { id, item, conceptIds, trapIds, taxonomyStatus }.
// similarQuestions returns up to `limit` rows (default 3): most specific concept
// first, certain tags before uncertain ones, then the same trap ids.

function asArray(value) {
  return Array.isArray(value) ? value.filter((id) => typeof id === 'string' && id) : [];
}

export function readItemTags(item, overlayById) {
  const overlay = item && overlayById && item.id ? overlayById[item.id] || {} : {};
  const ownConcepts = asArray(item && item.conceptIds);
  const ownTraps = asArray(item && item.trapIds);
  return {
    conceptIds: ownConcepts.length ? ownConcepts : asArray(overlay.conceptIds),
    trapIds: ownTraps.length ? ownTraps : asArray(overlay.trapIds),
    taxonomyStatus: (item && item.taxonomyStatus) || overlay.taxonomyStatus || undefined,
  };
}

function isQuestionNode(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return false;
  const hasBody = node.sentence != null || node.stem != null || node.q != null
    || node.question != null || node.sentenceA != null || node.wrongWord != null
    || node.options != null
    || (node.answer != null && (node.skill || node.conceptIds || node.format || node.num != null));
  return hasBody;
}

export function collectQuestions(root) {
  const out = [];
  function walk(node, parentId) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child, parentId);
      return;
    }
    const ownId = typeof node.id === 'string' && node.id ? node.id : '';
    const id = ownId || (parentId && node.num != null ? parentId + '_' + node.num : '');
    const container = Array.isArray(node.questions) || Array.isArray(node.items)
      || Array.isArray(node.blanks) || Array.isArray(node.plan);
    if (id && isQuestionNode(node) && !container) out.push({ id, item: node });
    const nextParent = ownId || parentId;
    for (const value of Object.values(node)) {
      if (value && typeof value === 'object') walk(value, nextParent);
    }
  }
  walk(root, '');
  return out;
}

function rank(status) {
  return status === 'uncertain' ? 1 : 0;
}

export function buildTagIndex(items, overlayById) {
  const byConcept = {};
  const byTrap = {};
  const byId = {};
  for (const entry of items || []) {
    const item = entry && entry.item ? entry.item : entry;
    const id = (entry && entry.id) || (item && item.id);
    if (!id || !item) continue;
    const tags = entry && entry.conceptIds ? {
      conceptIds: asArray(entry.conceptIds),
      trapIds: asArray(entry.trapIds),
      taxonomyStatus: entry.taxonomyStatus,
    } : readItemTags(item, overlayById);
    const row = {
      id,
      item,
      conceptIds: tags.conceptIds,
      trapIds: tags.trapIds,
      taxonomyStatus: tags.taxonomyStatus,
    };
    if (!byId[id]) byId[id] = row;
    for (const conceptId of row.conceptIds) {
      if (!byConcept[conceptId]) byConcept[conceptId] = [];
      byConcept[conceptId].push(row);
    }
    for (const trapId of row.trapIds) {
      if (!byTrap[trapId]) byTrap[trapId] = [];
      byTrap[trapId].push(row);
    }
  }
  return { byConcept, byTrap, byId };
}

function ordered(list) {
  return list.slice().sort((a, b) => rank(a.taxonomyStatus) - rank(b.taxonomyStatus));
}

export function questionsWithConcept(index, conceptId, opts) {
  const options = opts || {};
  const exclude = new Set(options.excludeIds || []);
  const rows = ordered((index.byConcept && index.byConcept[conceptId]) || [])
    .filter((row) => !exclude.has(row.id))
    .filter((row) => !options.status || row.taxonomyStatus === options.status);
  return options.limit ? rows.slice(0, options.limit) : rows;
}

export function questionsWithTrap(index, trapId, opts) {
  const options = opts || {};
  const exclude = new Set(options.excludeIds || []);
  const rows = ordered((index.byTrap && index.byTrap[trapId]) || [])
    .filter((row) => !exclude.has(row.id))
    .filter((row) => !options.status || row.taxonomyStatus === options.status);
  return options.limit ? rows.slice(0, options.limit) : rows;
}

export function similarQuestions(index, seed, opts) {
  const options = opts || {};
  const limit = options.limit == null ? 3 : options.limit;
  const seedItem = seed && seed.item ? seed.item : seed;
  const seedId = (seed && seed.id) || (seedItem && seedItem.id) || '';
  const tags = seed && Array.isArray(seed.conceptIds)
    ? seed
    : readItemTags(seedItem, options.overlayById);
  const conceptIds = asArray(tags.conceptIds).slice().sort((a, b) => b.length - a.length);
  const trapIds = asArray(tags.trapIds);
  const seen = new Set([seedId, ...(options.excludeIds || [])].filter(Boolean));
  const picked = [];
  function pull(list) {
    for (const row of ordered(list || [])) {
      if (seen.has(row.id) || row.item === seedItem) continue;
      seen.add(row.id);
      picked.push(row);
      if (picked.length >= limit) return true;
    }
    return false;
  }
  for (const conceptId of conceptIds) {
    if (pull(index.byConcept[conceptId])) return picked;
  }
  for (const trapId of trapIds) {
    if (pull(index.byTrap[trapId])) return picked;
  }
  return picked;
}
