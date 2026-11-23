// Label saved on a history entry for a mock / past-paper attempt: the paper's REAL school, never a hard-coded one. Pure.
// paperPlan = plan of the past paper the student sat (forced mock); dailyPlan = the plan of a flagged every-10th daily set.
export const MOCK_FALLBACK_LABEL = "WA1 practice set";
export function mockSchoolLabel({ paperPlan, dailyPlan } = {}) {
  const pick = (p) => (p && typeof p.paperLabel === "string" && p.paperLabel.trim() ? p.paperLabel.trim() : null);
  return pick(paperPlan) || pick(dailyPlan) || MOCK_FALLBACK_LABEL;
}
