// Parent homework (roadmap step 8). Pure helpers shared by routes and UI. No React, no storage.
import { SIMILAR_COUNT } from "@/lib/wrongNotebook";

export const HOMEWORK_PER_MISTAKE = SIMILAR_COUNT; // owner decision: default 3 similar questions per mistake
export const HOMEWORK_DAILY_CAP = 10;              // owner decision: max 10 homework questions per child per day (all subjects)
// Over-cap requests are BLOCKED with a message (no roll-over to tomorrow): simpler and predictable for parents.
// TODO(owner): confirm "block" vs "roll excess to the next day"; and whether unsolved homework carries over to the next day (today: it does not).
// TODO(owner): do homework retries count toward mastery? Undecided, so homework results are NOT written to trials/skillLedger.

export function capMessage(r) {
  const rem = Math.max(0, (r && r.remaining) || 0);
  return rem > 0
    ? `Daily limit is ${HOMEWORK_DAILY_CAP} homework questions per child. Only ${rem} left today; pick fewer or try again tomorrow.`
    : `Daily limit of ${HOMEWORK_DAILY_CAP} homework questions reached for today. Try again tomorrow.`;
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
