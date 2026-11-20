// Server-only weekly parent report (issue #55). Replaces the daily 20:00 summary.
//   * Primary send: EVENT-triggered on Saturday (child finishes the weekly review or hands in a past paper) -> sendForChild().
//   * Fallback: the single daily cron calls runFallback(); it only acts in the documented window (see fallbackWindow()).
//   * Both paths go through deliverWeekly(): allow-list, one report per parent per SGT week (alert_log claim), dry-run without a claim.
// Relative imports only so tools/weekly_report_selftest.mjs can run it in plain node. No addresses are ever logged.
import { SUBJECT_KEYS, sgtDate, isLiveSubject } from "../activity.js";
import { weekStart, isSaturday, addDays } from "../rewards.js";
import { settingForDate } from "../childSettings.js";
import { dispatchAlert } from "./index.mjs";
import { renderWeeklyEmail } from "./emailTemplate.mjs";
import { timingSafeEqual, createHash } from "node:crypto";

export const WEEKLY_CHANNEL = "email_weekly";       // alert_log.channel for the real weekly send (date column = Monday of the SGT week)
export const TRIAL_CHANNEL = "email_weekly_trial";  // send-now trials are logged here so they never burn the real week's claim
export const FALLBACK_HOUR_SGT = 21;                // cron is scheduled 21:00 SGT (13:00 UTC); Vercel Hobby may fire anywhere in that hour

// ---------- recipient policy (env NAMES: EMAIL_ALERTS_ENABLED, ALERT_TEST_RECIPIENTS, ALERT_ALLOW_ALL_PARENTS) ----------
// Precedence, first match wins:
//  1. EMAIL_ALERTS_ENABLED != "true"                 -> nothing is ever sent (render + log only). The allow-list is still applied to the dry run.
//  2. ALERT_TEST_RECIPIENTS set (even if empty/blank)-> send ONLY to listed addresses; a set-but-empty list means NOBODY (fail closed).
//  3. list unset and ALERT_ALLOW_ALL_PARENTS="true"  -> every eligible parent (launch mode).
//  4. list unset, no allow-all                       -> NOBODY (fail closed). A real broadcast needs the explicit launch switch.
export function parseAllowList(raw) {
  return new Set(String(raw || "").split(/[,;\s]+/).map((s) => s.trim().toLowerCase()).filter((s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)));
}
export function sendPolicy(env = process.env) {
  const listDefined = env.ALERT_TEST_RECIPIENTS !== undefined;
  const allow = parseAllowList(env.ALERT_TEST_RECIPIENTS);
  const realSend = env.EMAIL_ALERTS_ENABLED === "true";
  const mode = listDefined ? "allow-list" : env.ALERT_ALLOW_ALL_PARENTS === "true" ? "all-parents" : "closed";
  return { realSend, listDefined, allow, mode };
}
// { allowed, reason } for one recipient address under a policy.
export function recipientDecision(policy, address) {
  const a = String(address || "").trim().toLowerCase();
  if (policy.listDefined) return policy.allow.has(a) ? { allowed: true } : { allowed: false, reason: "not_on_allow_list" };
  if (!policy.realSend) return { allowed: true };                       // dry run with no list: render everyone, nothing leaves
  return policy.mode === "all-parents" ? { allowed: true } : { allowed: false, reason: "no_allow_list_fail_closed" };
}

// ---------- week + fallback window ----------
export const weekKey = (now = new Date()) => weekStart(sgtDate(now));          // Monday (SGT) = the dedupe key's date
export const weekEnd = (now = new Date()) => addDays(weekKey(now), 6);          // Sunday
const sgtHour = (now) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Singapore", hour: "2-digit", hour12: false }).format(now)) % 24;
// ONE rule: the daily cron fires at 21:00 SGT. It acts on Saturday from 21:00 (week's report not yet sent by the Saturday event), and again on
// Sunday as catch-up for a Saturday run that failed. Any other day/hour = no-op. The claim stops a second send either way.
export function fallbackWindow(now = new Date()) {
  const day = sgtDate(now), h = sgtHour(now);
  const dow = new Date(day + "T00:00:00Z").getUTCDay();
  if (dow === 6 && h >= FALLBACK_HOUR_SGT) return { run: true, window: "saturday_21" };
  if (dow === 0) return { run: true, window: "sunday_catchup" };
  return { run: false, window: null, reason: "not_fallback_window" };
}

// ---------- Bearer auth (cron + send-now): fail closed ----------
export function bearerOk(header, secret) {
  if (!secret) return false;
  const h = (s) => createHash("sha256").update(String(s)).digest();
  return timingSafeEqual(h(header || ""), h(`Bearer ${secret}`));
}

// ---------- data ----------
export function dashboardUrl(env = process.env) {
  const base = env.APP_BASE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + env.VERCEL_PROJECT_PRODUCTION_URL : "https://psle-app-vwx3.vercel.app");
  return base.replace(/\/+$/, "") + "/";
}
export const daysSoFar = (now) => { const s = weekKey(now), t = sgtDate(now); return Array.from({ length: 7 }, (_, i) => addDays(s, i)).filter((d) => d <= t); };

// Pure per-child summary (unit-tested). Every input is the rows already fetched for THIS child.
export function summariseChild({ profile, days, versions = [], activity = [], wrong = [], homework = [], credits = [], papers = [] }) {
  const subjects = SUBJECT_KEYS.map((k) => {
    let sets = 0, target = 0, daysMet = 0, daysTracked = 0;
    for (const d of days) {
      const t = Number(settingForDate(versions, d).dailyTarget[k]) || 0;
      const s = activity.find((r) => r.date === d && r.subject === k)?.sets_completed || 0;
      sets += s;
      if (t > 0) { target += t; daysTracked++; if (s >= t) daysMet++; }
    }
    return { name: k, sets, target, daysMet, daysTracked };
  }).filter((s) => s.target > 0 && isLiveSubject(profile.grade, s.name));
  const q = activity.reduce((a, r) => a + (r.questions_answered || 0), 0), c = activity.reduce((a, r) => a + (r.correct || 0), 0);
  const byCause = {};
  let untagged = 0;
  for (const w of wrong) { if (w.cause) byCause[w.cause] = (byCause[w.cause] || 0) + 1; else untagged++; }
  const hwSolved = homework.filter((h) => h.solved_at).length;
  const cr = { confirmed: 0, pending: 0, forfeited: 0, sgd: 0 };
  for (const r of credits) {
    const st = r.status || "confirmed";
    if (cr[st] === undefined || st === "sgd") continue;
    cr[st] += Number(r.credits) || 0;
    if (st === "confirmed") cr.sgd += (Number(r.credits) || 0) * (Number(r.sgd_per_credit) || 0);
  }
  cr.sgd = Math.round(cr.sgd * 100) / 100;
  return {
    name: profile.display_name, grade: profile.grade, subjects,
    questions: q, accuracy: q ? Math.round((c / q) * 100) : null, minutes: activity.reduce((a, r) => a + (r.minutes || 0), 0),
    activeDays: new Set(activity.filter((r) => r.sets_completed > 0).map((r) => r.date)).size, daysTracked: days.length,
    wrong: { total: wrong.length, untagged, byCause },
    homework: { assigned: homework.length, solved: hwSolved, notDone: homework.length - hwSolved },
    credits: cr,
    papers: papers.filter((r) => r.status !== "in_progress" && r.status !== "abandoned").map((r) => ({
      label: r.paper_label || "Past paper", score: r.score, total: r.total, pct: r.total ? Math.round((r.score / r.total) * 100) : null,
      counted: r.counts !== false, openToMark: r.open_total || 0,
    })),
  };
}

const rows = (r) => (r && !r.error && r.data) || []; // a table that is not migrated yet simply contributes nothing

export async function buildWeeklyPayload(admin, parent, now = new Date(), { env = process.env } = {}) {
  const days = daysSoFar(now), wk = weekKey(now), end = weekEnd(now);
  const base = { parentName: parent.display_name || "there", weekStart: wk, weekEnd: end, dashboardUrl: dashboardUrl(env), children: [] };
  const { data: links } = await admin.from("parent_child").select("child_id").eq("parent_id", parent.id);
  const ids = (links || []).map((l) => l.child_id);
  if (!ids.length) return base;
  const since = new Date(wk + "T00:00:00+08:00").toISOString();
  const mock = env.NEXT_PUBLIC_MOCK_EXAMS_ENABLED === "true";
  const [profs, act, vers, wr, hw, cr, ex] = await Promise.all([
    admin.from("profiles").select("id,display_name,grade").in("id", ids),
    admin.from("daily_activity").select("user_id,date,subject,sets_completed,questions_answered,correct,minutes").in("user_id", ids).gte("date", wk).lte("date", end),
    admin.from("child_setting_versions").select("child_id,effective_from,daily_target").in("child_id", ids),
    admin.from("wrong_answers").select("student_id,cause").in("student_id", ids).gte("attempted_at", since).limit(2000),
    admin.from("parent_homework").select("child_id,solved_at").in("child_id", ids).gte("assigned_for", wk).lte("assigned_for", end).limit(2000),
    admin.from("reward_credits").select("child_id,status,credits,sgd_per_credit").in("child_id", ids).gte("gate_day", wk).lte("gate_day", end).limit(2000),
    mock ? admin.from("exam_attempts").select("student_id,paper_label,status,score,total,open_total,counts").in("student_id", ids).gte("sgt_day", wk).lte("sgt_day", end).limit(200) : Promise.resolve(null),
  ]);
  base.children = rows(profs).map((p) => summariseChild({
    profile: p, days,
    versions: rows(vers).filter((v) => v.child_id === p.id),
    activity: rows(act).filter((r) => r.user_id === p.id),
    wrong: rows(wr).filter((r) => r.student_id === p.id),
    homework: rows(hw).filter((r) => r.child_id === p.id),
    credits: rows(cr).filter((r) => r.child_id === p.id),
    papers: rows(ex).filter((r) => r.student_id === p.id),
  }));
  return base;
}

// ---------- delivery ----------
export const channelsFor = (parent, settings) => (Array.isArray(settings?.alert_channels) ? settings.alert_channels : [])
  .map((c) => (c.type === "email" ? { ...c, address: c.address || parent.email } : c));

async function confirmed(admin, id) {
  const { data, error } = await admin.auth.admin.getUserById(id);
  if (error) throw new Error("auth lookup failed");
  return !!data?.user?.email_confirmed_at;
}
// Claim (parent, Monday-of-week, channel) so duplicates/retries/both Saturday events cannot send twice. A previous 'error' may be retried.
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

// One parent, one week. opts.dryRun = render + log only, NO alert_log row (a later real send still goes out).
// opts.trigger: "event" | "fallback" | "send-now". send-now never uses the real claim (logged under TRIAL_CHANNEL instead).
// Returns { status: sent|dry-run|already-sent|skipped|error, reason? }. Never logs an address.
export async function deliverWeekly(admin, parent, { env = process.env, now = new Date(), trigger = "event", dryRun = false, deps = {} } = {}) {
  const build = deps.buildPayload || buildWeeklyPayload, isConfirmed = deps.emailConfirmed || confirmed, send = deps.dispatch || dispatchAlert;
  const wk = weekKey(now), policy = sendPolicy(env);
  const { data: st } = await admin.from("parent_settings").select("alert_channels").eq("parent_id", parent.id).maybeSingle();
  const emailCh = channelsFor(parent, st).filter((c) => c.type === "email" && c.enabled).slice(0, 1);
  if (!emailCh.length) return { status: "skipped", reason: "no_email_channel" };
  const verdict = recipientDecision(policy, emailCh[0].address);
  if (!verdict.allowed) { console.log(`[weekly-report] skipped parent=${parent.id} trigger=${trigger} reason=${verdict.reason}`); return { status: "skipped", reason: verdict.reason }; }
  if (!(await isConfirmed(admin, parent.id))) return { status: "skipped", reason: "email_unconfirmed" };
  const payload = await build(admin, parent, now, { env });
  if (!payload.children.length) return { status: "skipped", reason: "no_children" };
  const formats = { email: renderWeeklyEmail };
  if (dryRun || !policy.realSend) {
    await send(emailCh, payload, { env, dryRun: true, formats });
    console.log(`[weekly-report] dry-run parent=${parent.id} trigger=${trigger} week=${wk} children=${payload.children.length}`);
    return { status: "dry-run" };
  }
  const channel = trigger === "send-now" ? TRIAL_CHANNEL : WEEKLY_CHANNEL;
  if (trigger === "send-now") await admin.from("alert_log").upsert({ parent_id: parent.id, date: wk, channel, status: "claimed", updated_at: new Date().toISOString() }, { onConflict: "parent_id,date,channel" });
  else if (!(await claim(admin, parent.id, wk, channel))) return { status: "already-sent" };
  const [res] = await send(emailCh, payload, { env, formats });
  const ok = res?.status === "sent";
  await finish(admin, parent.id, wk, channel, ok ? "sent" : res?.status === "error" ? "error" : "skipped", res?.error || res?.reason);
  console.log(`[weekly-report] ${ok ? "sent" : "not-sent"} parent=${parent.id} trigger=${trigger} week=${wk}`);
  return ok ? { status: "sent" } : { status: res?.status === "error" ? "error" : "skipped", reason: res?.reason };
}

const tally = () => ({ parents: 0, sent: 0, dryRun: 0, alreadySent: 0, skipped: 0, skippedAllowList: 0, errors: 0 });
function count(sum, r, parentId) {
  sum.parents++;
  if (r.status === "sent") sum.sent++; else if (r.status === "dry-run") sum.dryRun++; else if (r.status === "already-sent") sum.alreadySent++;
  else if (r.status === "error") sum.errors++;
  else { sum.skipped++; if (r.reason === "not_on_allow_list" || r.reason === "no_allow_list_fail_closed") { sum.skippedAllowList++; (sum.skippedAllowListParentIds ||= []).push(parentId); } }
}

// Cron entry (fallback only). No-ops outside fallbackWindow(). Parents whose week is already claimed are counted as alreadySent.
export async function runFallback(admin, { env = process.env, now = new Date(), deps = {} } = {}) {
  const win = fallbackWindow(now);
  if (!win.run) return { noop: true, reason: win.reason, week: weekKey(now) };
  const { data: parents } = await admin.from("profiles").select("id,display_name,email").eq("role", "parent");
  const sum = { ...tally(), noop: false, window: win.window, week: weekKey(now) };
  for (const parent of parents || []) {
    try { count(sum, await deliverWeekly(admin, parent, { env, now, trigger: "fallback", deps }), parent.id); }
    catch (e) { console.error("[weekly-report] parent failed", parent.id, String(e?.message || e)); sum.parents++; sum.errors++; }
  }
  console.log(`[weekly-report] fallback ${win.window} ${JSON.stringify({ ...sum, skippedAllowListParentIds: undefined })} allowListSkippedParents=${(sum.skippedAllowListParentIds || []).join(",")}`);
  return sum;
}

// Event entry: the child just finished the Saturday weekly review or handed in a Saturday paper. Saturday (SGT) only; never throws.
export async function sendForChild(admin, childId, { env = process.env, now = new Date(), deps = {} } = {}) {
  const out = tally();
  try {
    if (!isSaturday(sgtDate(now))) return { ...out, noop: true, reason: "not_saturday" };
    const { data: links } = await admin.from("parent_child").select("parent_id").eq("child_id", childId);
    for (const id of [...new Set((links || []).map((l) => l.parent_id))]) {
      const { data: parent } = await admin.from("profiles").select("id,display_name,email").eq("id", id).eq("role", "parent").maybeSingle();
      if (parent) count(out, await deliverWeekly(admin, parent, { env, now, trigger: "event", deps }), id);
    }
  } catch (e) { console.error("[weekly-report] event send failed", String(e?.message || e)); out.errors++; }
  return out;
}

// Owner trial (send-now): ONE parent, chosen by id or email in the request body. dryRun defaults to true; a real trial additionally needs the
// allow-list to be set (fail closed) and the parent's channel address on it.
export async function trialForParent(admin, { parentId, email, dryRun = true }, { env = process.env, now = new Date(), deps = {} } = {}) {
  let q = admin.from("profiles").select("id,display_name,email").eq("role", "parent");
  q = parentId ? q.eq("id", parentId) : q.eq("email", String(email || "").trim().toLowerCase());
  const { data: parent } = await q.maybeSingle();
  if (!parent) return { status: "skipped", reason: "no_such_parent" };
  if (!dryRun && !sendPolicy(env).listDefined) return { status: "skipped", reason: "trial_send_requires_allow_list" };
  return deliverWeekly(admin, parent, { env, now, trigger: "send-now", dryRun, deps });
}

// Admin preview: render the weekly email for one parent. Never sends, never touches alert_log.
export async function previewWeekly(admin, parent, { env = process.env, now = new Date() } = {}) {
  const payload = await buildWeeklyPayload(admin, parent, now, { env });
  const { data: st } = await admin.from("parent_settings").select("alert_channels").eq("parent_id", parent.id).maybeSingle();
  const ch = channelsFor(parent, st).find((c) => c.type === "email" && c.enabled);
  return {
    week: payload.weekStart, payload, email: renderWeeklyEmail(payload), emailEnabledForParent: !!ch,
    recipientAllowedUnderCurrentPolicy: ch ? recipientDecision(sendPolicy(env), ch.address).allowed : false,
  };
}
