// Parent homework vs mastery: "delayed transfer only" (owner decision, issue #32). Pure helpers, no React/storage.
//   1. Redoing the SAME question never affects mastery; it only resolves the wrong-answer notebook item.
//   2. A homework item that is a DIFFERENT, previously unseen question of the SAME skill, answered at least
//      HOMEWORK_MIN_DAYS_AFTER SGT day(s) after the original mistake, counts at HOMEWORK_WEIGHT (right AND wrong answers).
//   3. Everything else in homework does not touch mastery.
// Weights are constants here; trialLedger.js multiplies its counters and theta step by the trial weight.
export const DAILY_SET_WEIGHT = 1;     // exam / mock / drill answers
export const HOMEWORK_WEIGHT = 0.5;    // qualifying homework answers (half of a daily-set answer)
export const HOMEWORK_MIN_DAYS_AFTER = 1; // whole SGT days between the original mistake and the homework answer

const MS_DAY = 86400000;
const ymdToDays = (ymd) => Math.floor(Date.parse(ymd + "T00:00:00Z") / MS_DAY);

// Mistake dates are stored as the "19 Nov 2026" label (sessionUtils.todayStr) or an ISO date. Returns 'YYYY-MM-DD' or null.
export function mistakeDayYmd(m) {
  if (!m) return null;
  if (typeof m.ts === "number") return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(m.ts));
  const d = String(m.date || "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const t = Date.parse(d + " 12:00:00 GMT+0800");
  return Number.isNaN(t) ? null : new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(t));
}

// Should this homework answer count? item = {id, skill}; source = the mistake it was assigned for ({id, skill, date|ts});
// seenIds = ids the student has already met (trials / ledger itemsSeen). Fails closed on any missing information.
// Returns { counts, weight, reason }. The wrong-answer notebook "resolved" mark is separate and unaffected.
export function homeworkMasteryWeight({ item, source, seenIds, todayYmd }) {
  const no = (reason) => ({ counts: false, weight: 0, reason });
  if (!item || item.id == null || !source || source.id == null) return no("missing");
  if (String(item.id) === String(source.id)) return no("same-question");
  if (!item.skill || !source.skill || item.skill !== source.skill) return no("different-skill");
  const seen = seenIds instanceof Set ? seenIds : new Set(seenIds || []);
  if (seen.has(item.id) || seen.has(String(item.id))) return no("already-seen");
  const day = mistakeDayYmd(source);
  if (!day || !todayYmd) return no("unknown-date");
  if (ymdToDays(todayYmd) - ymdToDays(day) < HOMEWORK_MIN_DAYS_AFTER) return no("too-soon");
  return { counts: true, weight: HOMEWORK_WEIGHT, reason: "delayed-transfer" };
}

// Ids already seen for mastery purposes: every trial item plus each skill's itemsSeen.
export function seenItemIds(prog) {
  const s = new Set();
  for (const t of (prog && prog.trials) || []) if (t && t.itemId != null) s.add(t.itemId);
  for (const L of Object.values((prog && prog.skillLedger) || {})) for (const id of (L && L.itemsSeen) || []) s.add(id);
  return s;
}

// results: ExamSession-style rows [{id, correct, skill?, sectionType?, ...}] from a homework round. sourceFor(result) returns the
// mistake the homework item was assigned for ({id, skill, date}) or null. Returns only the rows that count, each tagged with its
// weight, ready for recordTrials(prog, rows, { mode: 'homework' }). Everything else is dropped (does not touch mastery).
export function qualifyingHomeworkResults(prog, results, sourceFor, todayYmd, skillOf) {
  const seen = seenItemIds(prog);
  const out = [];
  for (const r of results || []) {
    if (!r || r.id == null) continue;
    const skill = skillOf ? skillOf(r) : r.skill;
    const v = homeworkMasteryWeight({ item: { id: r.id, skill }, source: sourceFor ? sourceFor(r) : null, seenIds: seen, todayYmd });
    if (v.counts) out.push({ ...r, weight: v.weight });
  }
  return out;
}
