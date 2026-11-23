// "My records" data for the student, built only from progress already on the client. Pure. Never mutates or deletes anything.
import { ledgerSummary } from "./trialLedger.js";

// "23 Nov 2026" (stored history date) -> "2026-11-23", to match the thread ledger's days. null if unparseable.
export function isoDay(s) {
  const t = Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(String(s)) ? s + "T00:00:00Z" : String(s) + " UTC");
  return Number.isNaN(t) ? null : new Date(t).toISOString().slice(0, 10);
}
// Full history, newest first. threads: threads earned that day for the subject when known (else null).
export function recordRows(prog, subject, threadsByDay) {
  return [...((prog && prog.history) || [])].reverse().map((h) => ({
    sessionNum: h.sessionNum, date: h.date, subject, score: typeof h.totalPct === "number" ? h.totalPct : null,
    mock: !!h.isMockExam, label: h.isMockExam ? `Mock: ${h.school || ""} ${h.examType || ""}`.trim() : `Set #${h.sessionNum}`,
    wrong: (h.mistakes || []).length, mistakes: h.mistakes || [],
    threads: threadsByDay && threadsByDay[isoDay(h.date)] != null ? threadsByDay[isoDay(h.date)] : null, // thread earned that day (not per set)
  }));
}

// A mistake is fixed when it carries resolved_at, or a LATER trial on the same item was answered first-try correct.
export function mistakeStatus(prog) {
  const trials = (prog && prog.trials) || [];
  const rows = ((prog && prog.mistakes) || []).map((m) => {
    const fixed = !!m.resolved_at || trials.some((t) => t.itemId === m.id && t.firstTry && (t.sessionNum || 0) > (m.sessionNum || 0));
    return { ...m, fixed };
  });
  return { rows, remaining: rows.filter((r) => !r.fixed).length, fixed: rows.filter((r) => r.fixed).length };
}

// Strengths and weaknesses from the per-skill ledger (>= minAtt attempts). Rate = first-try rate.
export function topicStrengths(prog, minAtt = 3, n = 3) {
  const sum = ledgerSummary(prog) || {};
  const rows = Object.keys(sum).map((skill) => ({ skill, att: sum[skill].att || 0, rate: sum[skill].firstTryRate })).filter((r) => r.att >= minAtt && typeof r.rate === "number");
  const asc = [...rows].sort((a, b) => a.rate - b.rate);
  return { strong: [...asc].reverse().slice(0, n), weak: asc.slice(0, n) };
}

// Spaced-review word counts from a Leitner store state ({ words, ses, masteredCount }). "Due today" = the next round's due words.
export function vocabCounts(state, dict) {
  const st = state || { words: {}, ses: 0, masteredCount: 0 };
  const next = (st.ses || 0) + 1;
  const words = Object.keys(st.words || {});
  const due = words.filter((w) => !st.words[w].mastered && st.words[w].dueSes <= next && (!dict || dict[w]));
  return { due: due.length, mastered: st.masteredCount || words.filter((w) => st.words[w].mastered).length };
}
