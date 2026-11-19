// Server-only helpers shared by the student claim/weekly/homework routes, the parent routes and the cron (never import from client code).
// The client is never trusted: the homework gate and the rule in force are read from the DB here.
import { homeworkGate } from "@/lib/rewards";
import { settingForDate } from "@/lib/childSettings";

// Homework state for one SGT day: every parent_homework row assigned for that day (any parent, any subject).
// Returns { ok, eligible, assigned, remaining } ; ok:false on a DB error (fail closed). Used for DISPLAY; the decision is finalize_credits().
export async function loadHomeworkGate(admin, childId, ymd) {
  const { data, error } = await admin.from("parent_homework").select("solved_at").eq("child_id", childId).eq("assigned_for", ymd);
  if (error) return { ok: false, eligible: false, assigned: 0, remaining: 0 };
  return { ok: true, ...homeworkGate(data) };
}

// Decide pending credits (idempotent SQL finalize_credits). childId null = every child (cron). Never throws: a failure just
// leaves credits pending, which is the safe state (they are not counted until confirmed). Returns the number decided.
export async function finalizeCredits(admin, childId, todayYmd) {
  try {
    const { data, error } = await admin.rpc("finalize_credits", { p_child: childId, p_today: todayYmd });
    return error ? 0 : Number(data) || 0;
  } catch { return 0; }
}

// All shared-setting versions for a child, oldest first. { ok, versions }.
export async function loadSettingVersions(admin, childId) {
  const { data, error } = await admin.from("child_setting_versions")
    .select("effective_from,daily_target,homework_per_mistake,enabled,sgd_per_credit,daily_tiers,weekly_unit,weekly_amounts")
    .eq("child_id", childId).order("effective_from", { ascending: true });
  return error ? { ok: false, versions: [] } : { ok: true, versions: data || [] };
}

// The child's ONE shared setting in force on `ymd` ({dailyTarget, homeworkPerMistake, rule}); defaults when none saved. { ok, setting }.
export async function loadChildSetting(admin, childId, ymd) {
  const r = await loadSettingVersions(admin, childId);
  return r.ok ? { ok: true, setting: settingForDate(r.versions, ymd), versions: r.versions } : { ok: false };
}

// Rule in force on `ymd` for credits, plus the parent that OWNS the ledger rows (earliest-linked parent; stable).
// Returns { ok, parentId, rule } (rule null = rewards off / nothing configured).
export async function loadRewardRule(admin, childId, ymd) {
  const { data: links, error: le } = await admin.from("parent_child").select("parent_id, created_at").eq("child_id", childId);
  if (le) return { ok: false };
  const s = await loadChildSetting(admin, childId, ymd);
  if (!s.ok) return { ok: false };
  const owner = [...(links || [])].sort((a, b) => String(a.created_at || "").localeCompare(String(b.created_at || "")) || String(a.parent_id).localeCompare(String(b.parent_id)))[0];
  const rule = s.setting.rule;
  return { ok: true, parentId: owner ? owner.parent_id : null, rule: owner && rule && rule.enabled ? rule : null };
}
