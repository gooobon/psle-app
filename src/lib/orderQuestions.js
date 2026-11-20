// Order / sequencing questions ("Write 1, 2 and 3 in the blanks to show the order of events").
// Past papers store them in many shapes: events listed inside the question text after "___", "[ ]" or a box,
// events in a subEvents array, or only as the keys of the answer. This module reads every shape into one:
//   { items: ["event A", "event B", ...], order: [2, 1, 3], stem: "Write 1, 2 and 3 ..." }
// where order[i] is the rank the student must give to items[i]. Returns null when the key cannot be read as a
// full 1..n ranking (such a question stays open-ended and parent-marked; it is never graded by guess).
// Pure functions, no storage, no network: shared by the bridge, the self-test and the audit.

const BOX = String.raw`(?:_{2,}|\[\s*\]|□|☐|\(\s*\))`;
const norm = (s) => String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Does the wording ask for a numbering of events / sentences?
export function looksLikeOrderQuestion(text) {
  const t = String(text || "").toLowerCase();
  if (/write\s+(?:down\s+)?(?:the\s+)?(?:numbers?\s+)?1\s*[,，]?\s*(?:2|to)/.test(t)) return /order|sequence|first|arrange|happened|occurred|events|sentences|statements|places/.test(t);
  if (/put\s+(?:these|the|the following)\s+(?:events|statements|sentences)/.test(t)) return true;
  if (/(?:number|arrange)\s+(?:the|these)\s+(?:events|sentences|statements)/.test(t)) return true;
  if (/right\s+(?:sequence|order)/.test(t) && /(?:1\s*[–-]\s*\d|write\s+\d)/.test(t)) return true;
  return false;
}

// Events printed under the question: "___ Meng reached the town." / "[ ] ..." / "□ ..." / inline "___ A / ___ B".
export function itemsFromText(text) {
  const t = String(text || "");
  const out = [];
  const re = new RegExp(BOX + String.raw`\s*([^\n_□☐\[(]+?)(?=\s*(?:\/\s*)?(?:` + BOX + String.raw`|\n|$))`, "g");
  for (const m of t.matchAll(re)) {
    const s = m[1].replace(/\s*\/\s*$/, "").trim();
    if (s) out.push(s);
  }
  return out;
}
// The question text with the printed event lines removed (the tap cards show them).
export function stemWithoutItems(text) {
  const t = String(text || "");
  const at = t.search(new RegExp(BOX + String.raw`\s*[^\n]`));
  const head = at > 0 ? t.slice(0, at) : t;
  return head.replace(/\s+$/, "");
}

// One answer segment -> [text, rank]. Rank is a single digit written first ("2 - text"), after an arrow/equals/colon/dash
// ("text -> 2", "text = 2", "text: 2") or in brackets ("text (2)").
function segmentPair(seg) {
  const t = seg.trim().replace(/[.;]+$/, "");
  let m = t.match(/^(\d)\s*(?:[–—\-.:)=→]\s*|\s+)(.+)$/);
  if (m) return [m[2].trim(), parseInt(m[1], 10)];
  const all = [...t.matchAll(/(?:\s*(?:→|->|=|:|：|—|–|-)\s*(\d)\b|\s*\((\d)\))/g)];
  if (all.length) {
    const last = all[all.length - 1];
    return [t.slice(0, last.index).trim(), parseInt(last[1] || last[2], 10)];
  }
  return null;
}
function pairsFromAnswer(answer) {
  // { "event": "3" }  |  "1 - event\n4 - event"  |  "event: 3 | event: 2"  |  "event (3), event (2)"
  if (answer && typeof answer === "object" && !Array.isArray(answer)) {
    const e = Object.entries(answer).map(([k, v]) => [String(k), parseInt(String(v).replace(/\D+/g, ""), 10)]);
    return e.every(([, n]) => Number.isInteger(n)) && e.length >= 2 ? e : null;
  }
  if (Array.isArray(answer)) return null;
  const s = String(answer == null ? "" : answer);
  const segs = s.split(/\n|\||;|\s\/\s|(?<=\))\s*,\s*(?=\S)/).map((x) => x.trim()).filter(Boolean);
  const pairs = segs.map(segmentPair);
  return pairs.length >= 2 && pairs.every(Boolean) ? pairs : null;
}
const words = (s) => norm(s).split(" ").filter((w) => w.length > 2).map((w) => w.slice(0, 5));
function overlap(a, b) {
  const A = words(a), B = new Set(words(b));
  if (!A.length || !B.size) return 0;
  return A.filter((w) => B.has(w)).length / Math.max(A.length, B.size);
}
// Greedy best-first one-to-one assignment of answer segments to printed items. null if any item has no real match.
function matchOrder(items, pairs) {
  if (pairs.length !== items.length) return null;
  const cand = [];
  items.forEach((it, i) => pairs.forEach(([t], j) => {
    const k = norm(it), pk = norm(t);
    const sc = k === pk ? 2 : overlap(it, t) + (k.includes(pk) || pk.includes(k) ? 0.5 : 0);
    if (sc > 0.15) cand.push([sc, i, j]);
  }));
  cand.sort((x, y) => y[0] - x[0]);
  const ui = new Set(), uj = new Set(), order = new Array(items.length).fill(NaN);
  for (const [, i, j] of cand) if (!ui.has(i) && !uj.has(j)) { ui.add(i); uj.add(j); order[i] = pairs[j][1]; }
  return ui.size === items.length ? order : null;
}
function plainNumbers(answer) {
  if (Array.isArray(answer)) {
    const n = answer.map((x) => (typeof x === "number" ? x : /^\s*\d+\s*$/.test(String(x)) ? parseInt(x, 10) : NaN));
    return n.length >= 2 && n.every((x) => Number.isInteger(x)) ? n : null;
  }
  const s = String(answer == null ? "" : answer).trim();
  if (!/^\d(?:\s*(?:,|\/|-|–|→|;|\s)\s*\d)+$/.test(s)) return null;
  const n = s.split(/\D+/).filter(Boolean).map(Number);
  return n.length >= 2 ? n : null;
}
const isPerm = (arr) => arr.length >= 2 && [...arr].sort((a, b) => a - b).every((v, i) => v === i + 1);

// q: a raw bank item. Returns { items, order, stem } or null.
export function parseOrderQuestion(q) {
  const text = String(q.question || q.stem || q.questionText || q.q || q.sentence || "");
  let items = [];
  for (const cand of [q.sequenceItems, q.subEvents, q.items]) {
    if (Array.isArray(cand) && cand.length >= 2 && cand.every((x) => typeof x === "string")) { items = cand.map((x) => x.trim()); break; }
  }
  if (!items.length) items = itemsFromText(text);
  const pairs = pairsFromAnswer(q.answer);
  if (!items.length && pairs) items = pairs.map(([k]) => k);
  if (items.length < 2) return null;
  let order = null;
  if (pairs) {
    order = matchOrder(items, pairs);
  } else {
    const nums = plainNumbers(q.answer);
    if (nums && nums.length === items.length) order = nums;
  }
  if (!order || order.length !== items.length || !isPerm(order)) return null;
  return { items, order, stem: stemWithoutItems(text) || text };
}

// ── tap-to-order state (used by src/components/OrderTap.js) ─────────────────────
// value[i] = rank given to card i (1..n) or 0 / undefined when not yet ordered. Ranks stay contiguous 1..k.
export function normOrderValue(value, n) {
  const v = Array.from({ length: n }, (_, i) => { const x = parseInt(value && value[i], 10); return Number.isInteger(x) && x >= 1 && x <= n ? x : 0; });
  return v;
}
// Tap an unranked card: it gets the next number. Tap a ranked card: it is un-ranked and later cards move down one.
export function tapOrder(value, i) {
  const n = value.length, v = normOrderValue(value, n);
  if (i < 0 || i >= n) return v;
  if (v[i]) { const r = v[i]; return v.map((x, j) => (j === i ? 0 : x > r ? x - 1 : x)); }
  const next = Math.max(0, ...v) + 1;
  return v.map((x, j) => (j === i ? next : x));
}
export function undoOrder(value) {
  const v = normOrderValue(value, value.length), top = Math.max(0, ...v);
  return top ? v.map((x) => (x === top ? 0 : x)) : v;
}
export const resetOrder = (n) => new Array(n).fill(0);
export const orderComplete = (value, n) => normOrderValue(value, n).every((x) => x > 0);
// Exact grading against the key (rank per card).
export const gradeOrder = (value, key) => Array.isArray(key) && key.length > 0 && normOrderValue(value, key.length).every((x, i) => x === key[i]);
