// Server-only. A past paper is "settled" once every open-ended item has a parent mark (or when it had none). Settling is the moment the
// final score is known, so everything that depends on it runs here, once: the Saturday paper reward (the effort rule decided at hand-in
// stays: attempt.counts), the weekly parent report and the milestone alert. Idempotent: callers claim settlement first (settled_at).
// Never throws: a failure here must not lose a mark or a hand-in.
import { awardPaperReward } from "@/lib/rewardsServer";
import { sendForChild } from "@/lib/notify/weeklyReport.mjs";
import { notifyEvent } from "@/lib/notify/eventAlerts.mjs";

// a: the exam_attempts row AFTER its final score was written (score / total include the parent marks).
export async function settlePaper(admin, a) {
  let reward = { saturday: false, eligible: false, reason: "error", credits: 0, awarded: false, sticker: false };
  try {
    reward = await awardPaperReward(admin, { childId: a.student_id, subject: a.subject || "English", day: a.sgt_day, status: a.status, counts: a.counts === true });
  } catch { /* the reward is retried never: awardPaperReward is itself idempotent per Saturday */ }
  // Saturday weekly parent report (no-op off Saturday, deduped per week) and the milestone alert (key per attempt) both read the FINAL score.
  try { await sendForChild(admin, a.student_id); } catch { /* best effort */ }
  try { await notifyEvent(admin, { type: "milestone", childId: a.student_id, subject: a.subject || "English", key: "paper-" + a.id, label: a.paper_label || "past paper", score: a.score, total: a.total }); } catch { /* best effort */ }
  return reward;
}
