// Server-only: saves one edit of a child's shared setting (new version effective tomorrow SGT + audit entry + co-parent notice).
import { sgtDate } from "@/lib/activity";
import { applySettingEdit, diffSettings, auditLines, settingForDate, settingToRow, tomorrowSgt } from "@/lib/childSettings";
import { loadSettingVersions } from "@/lib/rewardsServer";
import { notifyCoParents } from "@/lib/dailyAlert";

// Shared by PUT /api/parent/child-settings and PUT /api/parent/rewards. Never throws. Returns { ok, setting, changes } or { ok:false, error, status }.
export async function saveChildSetting(admin, parent, childId, body) {
  const today = sgtDate(), tomorrow = tomorrowSgt(today);
  const v = await loadSettingVersions(admin, childId);
  if (!v.ok) return { ok: false, error: "could not load", status: 500 };
  const before = settingForDate(v.versions, tomorrow); // includes an edit another parent already made for tomorrow
  const edit = applySettingEdit(before, body, today);
  if (edit.error) return { ok: false, error: edit.error, status: 400 };
  const changes = diffSettings(before, edit.setting);
  if (!changes.length) return { ok: true, setting: edit.setting, changes: [], note: "No changes." };
  const now = new Date().toISOString();
  const { error } = await admin.from("child_setting_versions").upsert(settingToRow(childId, edit.setting, parent.id, now), { onConflict: "child_id,effective_from" });
  if (error) return { ok: false, error: "could not save", status: 500 };
  const lines = auditLines(parent.display_name, changes, tomorrow, today);
  await admin.from("child_setting_audit").insert({ child_id: childId, changed_by: parent.id, changed_by_name: parent.display_name || null, effective_from: tomorrow, changes: lines });
  const { data: cp } = await admin.from("profiles").select("display_name").eq("id", childId).maybeSingle();
  await notifyCoParents(admin, { childId, childName: cp?.display_name || "your child", changerId: parent.id, changerName: parent.display_name || "A parent", lines });
  return { ok: true, setting: edit.setting, changes: lines };
}
