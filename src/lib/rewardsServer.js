// Server-only helpers shared by the student claim and weekly routes (never import from client code).
// The client is never trusted: the homework gate and the rule in force are read from the DB here.
import { homeworkGate, pickRewardParent, ruleForDate, ruleFromRow } from "@/lib/rewards";

// Homework gate for one SGT day: every parent_homework row assigned for that day (any parent, any subject) must be solved.
// No homework assigned that day => eligible. Returns { ok, eligible, assigned, remaining } ; ok:false on a DB error (fail closed).
export async function loadHomeworkGate(admin, childId, ymd) {
  const { data, error } = await admin.from("parent_homework").select("solved_at").eq("child_id", childId).eq("assigned_for", ymd);
  if (error) return { ok: false, eligible: false, assigned: 0, remaining: 0 };
  return { ok: true, ...homeworkGate(data) };
}

// Rule in force on `ymd` for the controlling parent (earliest parent_child link with a rule version).
// TODO(owner): same open question as the daily target: which parent applies when two linked parents differ.
// Returns { ok, parentId, rule } (rule null = nothing configured / disabled).
export async function loadRewardRule(admin, childId, ymd) {
  const { data: links, error: le } = await admin.from("parent_child").select("parent_id, created_at").eq("child_id", childId);
  if (le) return { ok: false };
  const { data: vers, error: ve } = await admin.from("reward_rule_versions")
    .select("parent_id,effective_from,enabled,sgd_per_credit,daily_tiers,weekly_unit,weekly_amounts").eq("child_id", childId);
  if (ve) return { ok: false };
  const parentId = pickRewardParent(links, (vers || []).map((v) => v.parent_id));
  if (!parentId) return { ok: true, parentId: null, rule: null };
  const row = ruleForDate((vers || []).filter((v) => v.parent_id === parentId), ymd);
  const rule = ruleFromRow(row);
  return { ok: true, parentId, rule: rule && rule.enabled ? rule : null };
}
