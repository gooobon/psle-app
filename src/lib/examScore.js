// Paper score with the parent's marks (issue #62). Pure, no I/O, used by the routes, the screens and the e-mail builders.
// exam_attempts.score / total are the AUTO-marked items only. Open-ended items are pending until the parent marks them; each mark adds
// 1 to the total and (if correct) 1 to the score. When every open-ended item is marked the attempt is settled and this is the final score.
const n = (v) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const pick = (a, snake, camel) => (a && a[snake] != null ? a[snake] : a && a[camel] != null ? a[camel] : 0);

// a: an exam_attempts row (snake_case) or the shape the API returns (camelCase).
export function attemptScore(a) {
  const autoScore = n(pick(a, "score", "autoScore")), autoTotal = n(pick(a, "total", "autoTotal"));
  const open = n(pick(a, "open_total", "openTotal"));
  const marked = Math.min(open, n(pick(a, "parent_marked", "parentMarked")));
  const right = Math.min(marked, n(pick(a, "parent_right", "parentRight")));
  const pending = Math.max(0, open - marked);
  const score = autoScore + right, total = autoTotal + marked;
  return { score, total, pending, marked, right, open, autoScore, autoTotal, settled: pending === 0, pct: total ? Math.round((score / total) * 100) : null };
}

// "2/36" when nothing is waiting, "2/36 + 4 awaiting parent marking" while open-ended items are unmarked.
export function scoreText(a) {
  const s = a && a.score !== undefined && a.pending !== undefined && a.settled !== undefined ? a : attemptScore(a);
  return s.score + "/" + s.total + (s.pending ? " + " + s.pending + " awaiting parent marking" : "");
}
