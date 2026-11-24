// Parent "Assign practice": pure filter / exclusion logic. No React, no storage, no network.

// Mirrors HOMEWORK_ABUSE_MAX in homework.js (kept local so this file loads in plain node selftests).
const HOMEWORK_ABUSE_MAX = 100;
export const RECENT_DAYS = 14;
export const MIN_ITEM_ATTEMPTS = 10; // below this, fall back to the concept-level rate
export const MAX_PER_SKILL = 10;
export const DEFAULT_PER_SKILL = 3;
export const LEVELS = ["easier", "same", "harder"];
export const DIFFICULTY_CHOICES = ["easier", "same", "harder", "mixed"];

const TAG_LEVEL = { foundation: "easier", core: "same", stretch: "harder" };

export function clampPerSkill(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.max(1, Math.min(MAX_PER_SKILL, n)) : DEFAULT_PER_SKILL;
}

// first-try correct rate (0..1) -> level. >= 80% easier, 50-79% same, < 50% harder.
export function levelFromRate(rate) {
  if (typeof rate !== "number" || !Number.isFinite(rate)) return null;
  return rate >= 0.8 ? "easier" : rate >= 0.5 ? "same" : "harder";
}

// Level of one item. Item tag first (foundation/core/stretch), else the global rate
// per item (>= MIN_ITEM_ATTEMPTS attempts) or per concept. Derived levels are flagged estimated.
// stats: { items: {id:{n,rate}}, concepts: {conceptId:{n,rate}} } (server-computed, aggregate only).
export function itemLevel(item, conceptIds, stats) {
  const tag = item && TAG_LEVEL[String(item.difficulty || "").toLowerCase()];
  if (tag) return { level: tag, estimated: false };
  const id = item && item.id;
  const s = (stats && stats.items && id && stats.items[id]) || null;
  if (s && s.n >= MIN_ITEM_ATTEMPTS) return { level: levelFromRate(s.rate), estimated: true };
  for (const c of conceptIds || []) {
    const cs = stats && stats.concepts && stats.concepts[c];
    if (cs && cs.n > 0) return { level: levelFromRate(cs.rate), estimated: true };
  }
  return { level: null, estimated: true };
}

export function levelMatches(level, want) {
  if (!want || want === "mixed") return true;
  return level === want;
}

export const levelLabel = (l) => (l === "easier" ? "Easier" : l === "same" ? "Same level" : l === "harder" ? "Harder" : "Unrated");

// Skills the child missed in the last `days` days. mistakes: [{id, skills?:[..], sessionDate}]; skillsOf(m) -> ids.
export function recentMissedSkills(mistakes, skillsOf, now, days) {
  const cutoff = (now == null ? Date.now() : now) - (days || RECENT_DAYS) * 86400000;
  const out = [];
  for (const m of mistakes || []) {
    const t = Date.parse(m && m.sessionDate);
    if (!Number.isFinite(t) || t < cutoff) continue;
    for (const s of skillsOf(m) || []) if (out.indexOf(s) === -1) out.push(s);
  }
  return out;
}

// Build the assignment plan.
//   pool: [{id, skills:[..], level, estimated, stem}] runnable candidate questions
//   sources: [{id, skills:[..]}] mistakes the homework is attached to (most recent first)
//   opts: { skills:[..], difficulty, perSkill, solved:Set|[], pending:Set|[], total }
// -> { rows:[{id, source, skill, level, estimated, stem}], capped:boolean }
// Excludes the source mistake itself, items solved correctly recently, items already assigned and unsolved.
export function planAssignments(pool, sources, opts) {
  const o = opts || {};
  const per = clampPerSkill(o.perSkill);
  const cap = Math.max(1, Math.min(HOMEWORK_ABUSE_MAX, Math.round(Number(o.total)) || HOMEWORK_ABUSE_MAX));
  const solved = new Set(o.solved || []);
  const pending = new Set(o.pending || []);
  const sourceIds = new Set((sources || []).map((s) => s.id));
  const used = new Set();
  const rows = [];
  let capped = false;
  for (const skill of o.skills || []) {
    const src = (sources || []).find((s) => (s.skills || []).indexOf(skill) !== -1);
    if (!src) continue;
    let taken = 0;
    for (const q of pool || []) {
      if (taken >= per) break;
      if ((q.skills || []).indexOf(skill) === -1) continue;
      if (used.has(q.id) || sourceIds.has(q.id) || solved.has(q.id) || pending.has(q.id)) continue;
      if (!levelMatches(q.level, o.difficulty)) continue;
      if (rows.length >= cap) { capped = true; break; }
      used.add(q.id); taken++;
      rows.push({ id: q.id, source: src.id, skill, level: q.level, estimated: !!q.estimated, stem: stemPreview(q.stem) });
    }
    if (capped) break;
  }
  return { rows, capped };
}

export function stemPreview(s) {
  const t = String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  return t.length > 60 ? t.slice(0, 60) + "..." : t;
}

// Rows -> request items for POST /api/parent/homework.
export function toRequestItems(rows, subject) {
  return (rows || []).map((r) => ({ subject, question_id: r.id, source_question_id: r.source }));
}

// Server-side: global first-try stats from learning_trials rows [{item_id, skill, first_try}] (aggregate only).
export function aggregateTrialStats(rows) {
  const items = {}, concepts = {};
  const add = (m, k, ok) => { const e = m[k] || (m[k] = { n: 0, ok: 0 }); e.n++; if (ok) e.ok++; };
  for (const r of rows || []) {
    if (!r) continue;
    if (r.item_id) add(items, r.item_id, r.first_try === true);
    if (r.skill) add(concepts, r.skill, r.first_try === true);
  }
  const fin = (m) => { for (const k of Object.keys(m)) m[k] = { n: m[k].n, rate: m[k].ok / m[k].n }; return m; };
  return { items: fin(items), concepts: fin(concepts) };
}
