// Daily parent WhatsApp (issue #116): ONE message per parent per SGT day, sent by the 20:00 SGT cron (/api/cron/weekly-report).
// Covers every linked child: parent homework done/total, each live subject's FIRST attempt of the day (first_set_*), and total minutes.
// A child with no activity gets a "no study today" line; the message is still sent.
// Shipped OFF: with WHATSAPP_ENABLED!=true it renders and returns "dry-run" (optionally to ALERT_DRY_RUN_LOG), writes NO alert_log row, sends nothing.
// Dedupe: alert_log (parent, SGT date, channel "whatsapp_daily"), claimed before sending. Quiet hours (parent setting) skip the send.
// Does not touch per-event WhatsApp (started / milestone). Logs carry ids and reasons only: never numbers or message bodies.
import { SUBJECT_KEYS, sgtDate, isLiveSubject } from "../activity.js";
import { firstSetScore } from "../rewards.js";
import { dispatchAlert, isE164 } from "./index.mjs";
import { formatDailyWhatsApp } from "./whatsapp.mjs";
import { claim, finish } from "./weeklyReport.mjs";
import { quietFrom, inQuietHours } from "./eventAlerts.mjs";

export const DAILY_CHANNEL = "whatsapp_daily";
const rows = (r) => (r && !r.error && r.data) || [];

// Pure per-child, per-day summary (unit-tested). Inputs are the rows already fetched for THIS child and THIS date.
export function summariseDay({ profile, date, activity = [], homework = [] }) {
  const subjects = SUBJECT_KEYS.filter((k) => isLiveSubject(profile.grade, k)).map((k) => {
    const r = activity.find((x) => x.date === date && x.subject === k);
    const done = !!r && (r.sets_completed || 0) > 0;
    const pct = done ? firstSetScore(r) : null;
    let score = null;
    if (pct != null) {
      const useFirst = r.first_set_questions != null && r.first_set_correct != null;
      const total = Number(useFirst ? r.first_set_questions : r.questions_answered), correct = Math.min(Number(useFirst ? r.first_set_correct : r.correct), total);
      score = { correct, total, pct };
    }
    return { name: k, done, score };
  });
  const dayRows = activity.filter((x) => x.date === date);
  const minutes = dayRows.reduce((a, x) => a + (x.minutes || 0), 0);
  return {
    name: profile.display_name, grade: profile.grade, subjects, minutes,
    studied: dayRows.some((x) => (x.sets_completed || 0) > 0 || (x.questions_answered || 0) > 0) || homework.some((h) => h.solved_at),
    homework: { assigned: homework.length, solved: homework.filter((h) => h.solved_at).length },
  };
}

export async function buildDailyPayload(admin, parent, now = new Date()) {
  const date = sgtDate(now);
  const base = { parentName: parent.display_name || "there", date, children: [] };
  const { data: links } = await admin.from("parent_child").select("child_id").eq("parent_id", parent.id);
  const ids = (links || []).map((l) => l.child_id);
  if (!ids.length) return base;
  const [profs, act, hw] = await Promise.all([
    admin.from("profiles").select("id,display_name,grade").in("id", ids),
    admin.from("daily_activity").select("user_id,date,subject,sets_completed,questions_answered,correct,minutes,first_set_questions,first_set_correct").in("user_id", ids).eq("date", date),
    admin.from("parent_homework").select("child_id,solved_at").in("child_id", ids).eq("assigned_for", date).limit(2000),
  ]);
  base.children = rows(profs).map((p) => summariseDay({
    profile: p, date,
    activity: rows(act).filter((r) => r.user_id === p.id),
    homework: rows(hw).filter((r) => r.child_id === p.id),
  }));
  return base;
}

async function loadSettings(admin, id) {
  let { data: st, error } = await admin.from("parent_settings").select("alert_channels,quiet_enabled,quiet_start,quiet_end").eq("parent_id", id).maybeSingle();
  if (error) ({ data: st } = await admin.from("parent_settings").select("alert_channels").eq("parent_id", id).maybeSingle());
  return { channels: Array.isArray(st?.alert_channels) ? st.alert_channels : [], quiet: quietFrom(st) };
}

// One parent, one SGT day. Returns { status: sent|dry-run|already-sent|skipped|error, reason?, message? }. Never logs a number.
export async function deliverDaily(admin, parent, { env = process.env, now = new Date(), fetchImpl, deps = {} } = {}) {
  const send = deps.dispatch || dispatchAlert, build = deps.buildPayload || buildDailyPayload;
  const date = sgtDate(now);
  const { channels, quiet } = await loadSettings(admin, parent.id);
  const wa = channels.find((c) => c.type === "whatsapp" && c.enabled && c.opt_in);
  if (!wa) return { status: "skipped", reason: "no_whatsapp_opt_in" };
  if (inQuietHours(now, quiet)) return { status: "skipped", reason: "quiet_hours" };
  const payload = await build(admin, parent, now);
  if (!payload.children.length) return { status: "skipped", reason: "no_children" };
  const formats = { whatsapp: formatDailyWhatsApp };
  if (env.WHATSAPP_ENABLED !== "true") {
    const [r] = await send([wa], payload, { env, dryRun: true, formats });
    console.log(`[daily-whatsapp] dry-run parent=${parent.id} date=${date} children=${payload.children.length}`);
    return { status: "dry-run", message: r?.message };
  }
  if (!isE164(wa.address)) return { status: "skipped", reason: "invalid_number" };
  if (!(await claim(admin, parent.id, date, DAILY_CHANNEL))) return { status: "already-sent" };
  const [res] = await send([wa], payload, { env, fetchImpl, formats });
  const ok = res?.status === "sent";
  await finish(admin, parent.id, date, DAILY_CHANNEL, ok ? "sent" : res?.status === "error" ? "error" : "skipped", res?.error || res?.reason);
  console.log(`[daily-whatsapp] ${ok ? "sent" : "not-sent"} parent=${parent.id} date=${date}`);
  return ok ? { status: "sent" } : { status: res?.status === "error" ? "error" : "skipped", reason: res?.reason };
}

// Cron entry: every parent, every day.
export async function runDaily(admin, { env = process.env, now = new Date(), fetchImpl, deps = {} } = {}) {
  const sum = { date: sgtDate(now), parents: 0, sent: 0, dryRun: 0, alreadySent: 0, skipped: 0, errors: 0 };
  const { data: parents } = await admin.from("profiles").select("id,display_name,email").eq("role", "parent");
  for (const parent of parents || []) {
    sum.parents++;
    try {
      const r = await deliverDaily(admin, parent, { env, now, fetchImpl, deps });
      if (r.status === "sent") sum.sent++; else if (r.status === "dry-run") sum.dryRun++; else if (r.status === "already-sent") sum.alreadySent++;
      else if (r.status === "error") sum.errors++; else sum.skipped++;
    } catch (e) { sum.errors++; console.error("[daily-whatsapp] parent failed", parent.id, String(e?.message || e)); }
  }
  console.log(`[daily-whatsapp] ${JSON.stringify(sum)}`);
  return sum;
}
