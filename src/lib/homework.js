// Parent homework (roadmap step 8). Pure helpers shared by routes and UI. No React, no storage.
import { SIMILAR_COUNT } from "@/lib/wrongNotebook";

export const HOMEWORK_PER_MISTAKE = SIMILAR_COUNT; // owner decision: default 3 similar questions per mistake
// The count per mistake is parent-set (parent_settings.homework_per_mistake, 1..HOMEWORK_ABUSE_MAX). No product cap per day.
// Only an abuse-protection bound remains: HOMEWORK_ABUSE_MAX per child per day and per assign request (mirrors SQL assign_homework()).
export const HOMEWORK_ABUSE_MAX = 100;
// Unsolved homework does NOT carry over to the next day.
// Mastery (owner decision #32): delayed transfer only, half weight. See src/lib/homeworkMastery.js. Redoing the same question never counts.

export function clampHomeworkCount(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.max(1, Math.min(HOMEWORK_ABUSE_MAX, n)) : HOMEWORK_PER_MISTAKE;
}

export function capMessage(r) {
  const rem = Math.max(0, (r && r.remaining) || 0);
  return rem > 0
    ? `Safety limit is ${HOMEWORK_ABUSE_MAX} homework questions per child per day. Only ${rem} left today; pick fewer or try again tomorrow.`
    : `Safety limit of ${HOMEWORK_ABUSE_MAX} homework questions reached for today. Try again tomorrow.`;
}

// rows: parent_homework rows -> [{date, assigned, solved, remaining, correct}] newest day first.
export function summarizeHomework(rows) {
  const by = {};
  (rows || []).forEach((r) => {
    const d = by[r.assigned_for] || (by[r.assigned_for] = { date: r.assigned_for, assigned: 0, solved: 0, remaining: 0, correct: 0 });
    d.assigned += 1;
    if (r.solved_at) { d.solved += 1; if (r.correct === true) d.correct += 1; } else d.remaining += 1;
  });
  return Object.values(by).sort((a, b) => (a.date < b.date ? 1 : -1));
}
