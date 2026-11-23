// Pure helper: per-subject totals from daily_activity rows. Used by /api/parent/overview and its self-test.
export function summarizeActivity(rows, subjectKeys) {
  const out = {};
  for (const s of subjectKeys) out[s] = { sessions: 0, questions: 0, correct: 0, average: null };
  for (const r of rows || []) {
    const o = out[r.subject]; if (!o) continue;
    o.sessions += Number(r.sets_completed) || 0; o.questions += Number(r.questions_answered) || 0; o.correct += Number(r.correct) || 0;
  }
  for (const s of subjectKeys) out[s].average = out[s].questions ? Math.round(out[s].correct / out[s].questions * 100) : null;
  return out;
}
