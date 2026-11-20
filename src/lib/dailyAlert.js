// Server-only alert helpers. The daily 20:00 parent summary was REMOVED in issue #55: the weekly report lives in src/lib/notify/weeklyReport.mjs.
// What remains here: shared helpers (dashboardUrl, channelsFor, emailConfirmed, paperBlock) and the co-parent setting-change notice.
import { dispatchAlert } from "@/lib/notify/index.mjs";
import { renderSettingChangeEmail } from "@/lib/notify/emailTemplate.mjs";

export function dashboardUrl(env = process.env) {
  const base = env.APP_BASE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + env.VERCEL_PROJECT_PRODUCTION_URL : "https://psle-app-vwx3.vercel.app");
  return base.replace(/\/+$/, "") + "/";
}

// Consecutive active days ending today (or yesterday, if today has nothing yet so the streak isn't shown as broken).
export function streakFrom(days, activeSet) {
  let i = days.length - 1;
  if (!activeSet.has(days[i])) i -= 1;
  let n = 0;
  for (; i >= 0 && activeSet.has(days[i]); i--) n++;
  return n;
}

// Papers for the 8pm email: submitted today, or still unfinished. null when there is nothing to report (no empty section).
export function paperBlock(rows, today, now = new Date()) {
  const done = rows.filter((r) => r.status !== "in_progress" && r.status !== "abandoned" && r.sgt_day === today);
  const open = rows.filter((r) => r.status === "in_progress");
  if (!done.length && !open.length) return null;
  return {
    done: done.map((r) => ({
      label: r.paper_label || "Past paper", score: r.score, total: r.total, pct: r.total ? Math.round((r.score / r.total) * 100) : null,
      minutesUsed: Math.round((r.elapsed_seconds || 0) / 60), minutesAllowed: r.minutes_allowed, counted: r.counts !== false,
      toReview: Math.max(0, (r.total || 0) - (r.score || 0)), openToMark: r.parent_pending != null ? r.parent_pending : r.open_total || 0,
    })),
    unfinished: open.map((r) => ({ label: r.paper_label || "Past paper", expired: Date.parse(r.deadline_at) <= now.getTime() })),
  };
}

// Email address to use for a parent's email channel (falls back to the profile email).
export function channelsFor(parent, settings) {
  const list = Array.isArray(settings?.alert_channels) ? settings.alert_channels : [];
  return list.map((c) => (c.type === "email" ? { ...c, address: c.address || parent.email } : c));
}

export async function emailConfirmed(admin, id) {
  const { data, error } = await admin.auth.admin.getUserById(id);
  if (error) throw new Error("auth lookup failed");
  return !!data?.user?.email_confirmed_at;
}

// Tell the OTHER linked parents that `changer` edited a child's shared setting (email channel only, behind EMAIL_ALERTS_ENABLED:
// with the flag off it renders and logs a dry run, nothing is sent). Confirmed addresses only, like the daily alert. Never throws.
export async function notifyCoParents(admin, { childId, childName, changerId, changerName, lines }, { env = process.env } = {}) {
  const out = { sent: 0, dryRun: 0, skipped: 0 };
  try {
    const { data: links } = await admin.from("parent_child").select("parent_id").eq("child_id", childId);
    const others = [...new Set((links || []).map((l) => l.parent_id))].filter((id) => id !== changerId);
    for (const id of others) {
      const { data: parent } = await admin.from("profiles").select("id,display_name,email").eq("id", id).maybeSingle();
      if (!parent) { out.skipped++; continue; }
      const { data: st } = await admin.from("parent_settings").select("alert_channels").eq("parent_id", id).maybeSingle();
      const emailCh = channelsFor(parent, st).filter((c) => c.type === "email" && c.enabled);
      if (!emailCh.length || !(await emailConfirmed(admin, id))) { out.skipped++; continue; }
      const payload = { parentName: parent.display_name || "there", childName, changerName, lines, dashboardUrl: dashboardUrl(env) };
      const [res] = await dispatchAlert(emailCh, payload, { env, formats: { email: renderSettingChangeEmail } });
      if (res?.status === "sent") out.sent++; else if (res?.status === "dry-run") out.dryRun++; else out.skipped++;
    }
  } catch (e) { console.error("[notify-coparent] failed", String(e?.message || e)); }
  return out;
}
