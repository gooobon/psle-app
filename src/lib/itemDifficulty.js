// Item difficulty for the parent "level of questions solved" report (issue #127). Pure functions: no React, no storage, no network.
// Level of one item: its own tag when present (foundation/core/stretch, or a Chinese difficulty word), otherwise estimated from the
// global first-try correct rate for that item; when the item has fewer than MIN_ITEM_ATTEMPTS global attempts, from its skill.
export const MIN_ITEM_ATTEMPTS = 10;
export const LEVELS = ["easy", "medium", "hard"];
export const EASY_WARN_SHARE = 70;   // percent of attempts that are Easy
export const EASY_WARN_ACCURACY = 85; // percent first-try on Easy

const TAG = { foundation: "easy", easy: "easy", core: "medium", medium: "medium", stretch: "hard", hard: "hard", advanced: "hard" };

export function levelFromTag(tag) {
  if (tag == null) return null;
  return TAG[String(tag).trim().toLowerCase()] || null;
}

// rate in percent (0-100) -> level. >= 80 easy, 50-79 medium, < 50 hard.
export function levelFromRate(pct) {
  if (typeof pct !== "number" || Number.isNaN(pct)) return null;
  return pct >= 80 ? "easy" : pct >= 50 ? "medium" : "hard";
}

// stat = { attempts, first_try } (global counts). Returns { level, estimated, source } or { level: null }.
export function itemLevel({ tag, itemStat, skillStat } = {}) {
  const t = levelFromTag(tag);
  if (t) return { level: t, estimated: false, source: "tag" };
  const pick = (s, source) => {
    if (!s || !(Number(s.attempts) >= MIN_ITEM_ATTEMPTS)) return null;
    const lv = levelFromRate(Number(s.first_try) / Number(s.attempts) * 100);
    return lv ? { level: lv, estimated: true, source } : null;
  };
  return pick(itemStat, "item") || pick(skillStat, "skill") || { level: null, estimated: false, source: "none" };
}

const pct = (ok, n) => (n ? Math.round(ok / n * 100) : null);
const blank = () => ({ easy: { n: 0, ok: 0 }, medium: { n: 0, ok: 0 }, hard: { n: 0, ok: 0 } });
const finish = (b) => { const o = {}; for (const l of LEVELS) o[l] = { n: b[l].n, firstTry: pct(b[l].ok, b[l].n) }; return o; };

// trials: [{item_id, skill, first_try, tag?}] (already limited to the window). itemStats: { [item_id]: {attempts, first_try} },
// skillStats: { [skill]: {...} } (both optional; without them only tagged items are rated). Returns overall + per-skill counts by level.
export function levelReport(trials, itemStats, skillStats) {
  const all = blank(), by = {}; let unrated = 0, anyEstimated = false;
  for (const r of trials || []) {
    if (!r || !r.skill) continue;
    const res = itemLevel({ tag: r.tag, itemStat: itemStats && itemStats[r.item_id], skillStat: skillStats && skillStats[r.skill] });
    if (!res.level) { unrated++; continue; }
    const s = by[r.skill] || (by[r.skill] = { blank: blank(), estimated: false });
    const hit = r.first_try ? 1 : 0;
    all[res.level].n++; all[res.level].ok += hit;
    s.blank[res.level].n++; s.blank[res.level].ok += hit;
    if (res.estimated) { s.estimated = true; anyEstimated = true; }
  }
  const skills = Object.keys(by).map((skill) => ({ skill, estimated: by[skill].estimated, levels: finish(by[skill].blank) }))
    .sort((a, b) => totalN(b.levels) - totalN(a.levels));
  const overall = finish(all);
  return { overall, skills, unrated, estimated: anyEstimated, warning: easyWarning(overall) };
}
const totalN = (lv) => lv.easy.n + lv.medium.n + lv.hard.n;

// Warn when more than 70% of attempts are Easy and Easy first-try is at least 85%.
export function easyWarning(overall) {
  const n = totalN(overall);
  if (!n || overall.easy.firstTry == null) return false;
  return overall.easy.n / n * 100 > EASY_WARN_SHARE && overall.easy.firstTry >= EASY_WARN_ACCURACY;
}
