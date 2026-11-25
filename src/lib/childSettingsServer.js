// Server-only: saves one edit of a child's shared setting (new version effective tomorrow SGT + audit entry + co-parent notice).
import { sgtDate } from "@/lib/activity";
import { applySettingEdit, diffSettings, auditLines, settingForDate, settingToRow, tomorrowSgt } from "@/lib/childSettings";
import { loadSettingVersions } from "@/lib/rewardsServer";
import { notifyCoParents } from "@/lib/dailyAlert";
import { MOCK_EXAMS_ENABLED } from "@/lib/supabase/config";

// Shared by PUT /api/parent/child-settings and PUT /api/parent/rewards. Never throws. Returns { ok, setting, changes } or { ok:false, error, status }.
export async function saveChildSetting(admin, parent, childId, body) {
  const today = sgtDate(), tomorrow = tomorrowSgt(today);
  const v = await loadSettingVersions(admin, childId);
  if (!v.ok) return { ok: false, error: "could not load", status: 500 };
  // Flag off: loadSettingVersions does not read the paper_* columns, so a new version row would reset them to defaults. Read them best
  // effort (an error = migration not applied = nothing to preserve) and carry them into the new row.
  let carryPaper = false;
  if (!MOCK_EXAMS_ENABLED) {
    const pc = await admin.from("child_setting_versions").select("effective_from,paper_unit,paper_amounts,paper_check_off").eq("child_id", childId);
    if (!pc.error && Array.isArray(pc.data)) {
      const by = new Map(pc.data.map((r) => [r.effective_from, r]));
      v.versions = v.versions.map((r) => { const p = by.get(r.effective_from); return p ? { ...r, paper_unit: p.paper_unit, paper_amounts: p.paper_amounts, paper_check_off: p.paper_check_off } : r; });
      carryPaper = true;
    }
  }
  const before = settingForDate(v.versions, tomorrow); // includes an edit another parent already made for tomorrow
  const edit = applySettingEdit(before, body, today);
  if (edit.error) return { ok: false, error: edit.error, status: 400 };
  const changes = diffSettings(before, edit.setting);
  if (!changes.length) return { ok: true, setting: edit.setting, changes: [], note: "No changes." };
  const now = new Date().toISOString();
  const paper = MOCK_EXAMS_ENABLED || carryPaper;
  // Cash-out columns missing (SQL not applied yet): the rate still saves through the legacy column, but a minimum or limit cannot be stored,
  // so refuse instead of silently dropping it.
  const rr = edit.setting.rule;
  if (v.cashout === false && ((rr.cashoutMinSgd || 0) > 0 || (rr.cashoutLimitSgd || 0) > 0)) return { ok: false, error: "Cash-out minimum and limit cannot be saved yet: the database update for them has not been applied.", status: 409 };
  const { error } = await admin.from("child_setting_versions").upsert(settingToRow(childId, edit.setting, parent.id, now, { paper, cashout: v.cashout }), { onConflict: "child_id,effective_from" });
  if (error) return { ok: false, error: "could not save", status: 500 };
  const lines = auditLines(parent.display_name, changes, tomorrow, today);
  await admin.from("child_setting_audit").insert({ child_id: childId, changed_by: parent.id, changed_by_name: parent.display_name || null, effective_from: tomorrow, changes: lines });
  const { data: cp } = await admin.from("profiles").select("display_name").eq("id", childId).maybeSingle();
  await notifyCoParents(admin, { childId, childName: cp?.display_name || "your child", changerId: parent.id, changerName: parent.display_name || "A parent", lines });
  return { ok: true, setting: edit.setting, changes: lines };
}
