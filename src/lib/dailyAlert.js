// Server-only: builds the daily parent summary from daily_activity and dispatches it through the channels.
// Used by /api/cron/daily-alert (all parents) and /api/admin/alert-preview (one parent, never sends).
import { SUBJECT_KEYS, sgtDate, lastNDates, isLiveSubject } from "@/lib/activity";
import { dispatchAlert, CHANNELS } from "@/lib/notify/index.mjs";
import { renderSettingChangeEmail } from "@/lib/notify/emailTemplate.mjs";
import { settingForDate } from "@/lib/childSettings";
import { MOCK_EXAMS_ENABLED } from "@/lib/supabase/config";

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
      toReview: Math.max(0, (r.total || 0) - (r.score || 0)), openToMark: r.open_total || 0,
    })),
    unfinished: open.map((r) => ({ label: r.paper_label || "Past paper", expired: Date.parse(r.deadline_at) <= now.getTime() })),
  };
}

export async function buildParentPayload(admin, parent, now = new Date()) {
  const today = sgtDate(now);
  const days = lastNDates(7, now);
  const { data: links } = await admin.from("parent_child").select("child_id").eq("parent_id", parent.id);
  const ids = (links || []).map((l) => l.child_id);
  const { data: st } = await admin.from("parent_settings").select("daily_target,alert_channels").eq("parent_id", parent.id).maybeSingle();
  const base = { parentName: parent.display_name || "there", date: today, dashboardUrl: dashboardUrl(), children: [] };
  if (!ids.length) return { payload: base, settings: st };
  // Daily targets are one shared setting PER CHILD (child_setting_versions), the version in force today.
  const { data: vers } = await admin.from("child_setting_versions").select("child_id,effective_from,daily_target").in("child_id", ids);
  const [{ data: profs }, { data: rows }] = await Promise.all([
    admin.from("profiles").select("id,display_name,grade").in("id", ids),
    admin.from("daily_activity").select("user_id,date,subject,sets_completed,questions_answered,correct,minutes").in("user_id", ids).gte("date", days[0]).lte("date", today),
  ]);
  // Mock papers block (issue #44). Only with the flag on; counts, scores and paper names only (no question text, no answers).
  let paperRows = [];
  if (MOCK_EXAMS_ENABLED) {
    try {
      const r = await admin.from("exam_attempts").select("student_id,paper_label,status,score,total,answered,question_count,elapsed_seconds,minutes_allowed,counts,open_total,sgt_day,deadline_at")
        .in("student_id", ids).or(`sgt_day.eq.${today},status.eq.in_progress`).limit(200);
      if (!r.error) paperRows = r.data || [];
    } catch (e) { /* table not migrated yet: no papers block */ }
  }
  base.children = (profs || []).map((p) => {
    const target = settingForDate((vers || []).filter((v) => v.child_id === p.id), today).dailyTarget;
    const mine = (rows || []).filter((r) => r.user_id === p.id);
    const tr = mine.filter((r) => r.date === today);
    const subjects = SUBJECT_KEYS.filter((k) => Number(target[k]) > 0 && isLiveSubject(p.grade, k)).map((k) => {
      const sets = tr.find((r) => r.subject === k)?.sets_completed || 0;
      return { name: k, sets, target: Number(target[k]), done: sets >= Number(target[k]) };
    });
    const q = tr.reduce((a, r) => a + r.questions_answered, 0), c = tr.reduce((a, r) => a + r.correct, 0);
    const active = new Set(mine.filter((r) => r.sets_completed > 0).map((r) => r.date));
    const papers = paperBlock(paperRows.filter((x) => x.student_id === p.id), today, now);
    return {
      ...(papers ? { papers } : {}),
      name: p.display_name, grade: p.grade, subjects, questions: q, accuracy: q ? Math.round((c / q) * 100) : null,
      minutes: tr.reduce((a, r) => a + r.minutes, 0), streak: streakFrom(days, active), activeDays: days.filter((d) => active.has(d)).length,
      missing: subjects.filter((s) => !s.done).map((s) => s.name),
    };
  });
  return { payload: base, settings: st };
}

// Email address to use for a parent's email channel (falls back to the profile email).
export function channelsFor(parent, settings) {
  const list = Array.isArray(settings?.alert_channels) ? settings.alert_channels : [];
  return list.map((c) => (c.type === "email" ? { ...c, address: c.address || parent.email } : c));
}

// Render today's alert for one parent WITHOUT sending or writing alert_log.
export async function previewForParent(admin, parent) {
  const { payload, settings } = await buildParentPayload(admin, parent);
  const email = CHANNELS.email.format(payload);
  return { date: payload.date, emailEnabledForParent: channelsFor(parent, settings).some((c) => c.type === "email" && c.enabled), payload, email };
}

// Claim (parent, date, channel) so a duplicate/retried cron run cannot send twice. A previous 'error' may be retried.
async function claim(admin, parentId, date, channel) {
  const ins = await admin.from("alert_log").insert({ parent_id: parentId, date, channel, status: "claimed" });
  if (!ins.error) return true;
  if (ins.error.code !== "23505") throw new Error("alert_log insert failed");
  const { data } = await admin.from("alert_log").update({ status: "claimed", updated_at: new Date().toISOString() })
    .eq("parent_id", parentId).eq("date", date).eq("channel", channel).eq("status", "error").select("parent_id");
  return !!(data && data.length);
}
const finish = (admin, parentId, date, channel, status, detail) =>
  admin.from("alert_log").update({ status, detail: detail ? String(detail).slice(0, 200) : null, updated_at: new Date().toISOString() })
    .eq("parent_id", parentId).eq("date", date).eq("channel", channel);

export async function emailConfirmed(admin, id) {
  const { data, error } = await admin.auth.admin.getUserById(id);
  if (error) throw new Error("auth lookup failed");
  return !!data?.user?.email_confirmed_at;
}

export async function runDailyAlerts(admin, { env = process.env, now = new Date() } = {}) {
  const { data: parents } = await admin.from("profiles").select("id,display_name,email").eq("role", "parent");
  const summary = { date: sgtDate(now), parents: 0, sent: 0, dryRun: 0, alreadyDone: 0, skipped: 0, errors: 0 };
  for (const parent of parents || []) {
    try {
      const { payload, settings } = await buildParentPayload(admin, parent, now);
      const emailCh = channelsFor(parent, settings).filter((c) => c.type === "email" && c.enabled);
      if (!emailCh.length || !payload.children.length) { summary.skipped++; continue; }
      // Email is on by default but only for a CONFIRMED address (Supabase email_confirmed_at).
      if (!(await emailConfirmed(admin, parent.id))) { summary.skipped++; continue; }
      summary.parents++;
      if (!CHANNELS.email.isEnabled(env)) {
        // Dry run: render only, log counts (no addresses, no bodies), no alert_log row so enabling later still sends today.
        await dispatchAlert(emailCh, payload, { env, dryRun: true });
        console.log(`[daily-alert] dry-run parent=${parent.id} children=${payload.children.length} missing=${payload.children.filter((c) => c.missing.length).length}`);
        summary.dryRun++; continue;
      }
      if (!(await claim(admin, parent.id, payload.date, "email"))) { summary.alreadyDone++; continue; }
      const [res] = await dispatchAlert(emailCh, payload, { env });
      const ok = res?.status === "sent";
      await finish(admin, parent.id, payload.date, "email", ok ? "sent" : res?.status === "error" ? "error" : "skipped", res?.error || res?.reason);
      if (ok) summary.sent++; else if (res?.status === "error") summary.errors++; else summary.skipped++;
    } catch (e) {
      console.error("[daily-alert] parent failed", parent.id, String(e?.message || e));
      summary.errors++;
    }
  }
  return summary;
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
