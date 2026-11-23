// Real-time parent alerts (issue #56): "practice started" (once per child per SGT day) and "milestone finished" (with the result).
// Shipped OFF: nothing is sent, and no database write happens, unless a channel is on. WHATSAPP_ENABLED=true turns on both alerts.
// With WhatsApp off, the MILESTONE alert still falls back to email (it then follows EMAIL_ALERTS_ENABLED and ALERT_TEST_RECIPIENTS like every
// email); the "started" alert stays WhatsApp-only. With both off, nothing is sent and nothing is written. Server-only; relative imports only so
// tools/event_alerts_selftest.mjs can run it under plain node. Never throws: a failed alert must not affect the student's flow.
//
// Per linked parent (parent_child, both parents): claim a row in event_alert_log (unique per parent + event_key, so a double submit or a
// second app open cannot send twice, also while the message is deferred) -> quiet hours? store it as 'deferred' with send_after ->
// else WhatsApp template; if WhatsApp is not usable (no opt-in, bad number, missing credentials, provider error) fall back to email.
// Logs carry ids and reasons only, never phone numbers, addresses or message bodies.
import { dispatchAlert, isE164 } from "./index.mjs";
import { formatWhatsAppEvent } from "./whatsapp.mjs";
import { renderEventEmail } from "./emailTemplate.mjs";

const OFFSET_MS = 8 * 3600000; // Asia/Singapore, no DST
export const DEFAULT_QUIET = { enabled: true, start: "21:30", end: "06:30" };
const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const isHHMM = (s) => HHMM.test(String(s || ""));
const mins = (s) => { const m = HHMM.exec(s); return Number(m[1]) * 60 + Number(m[2]); };

export const sgtDay = (now = new Date()) => new Date(now.getTime() + OFFSET_MS).toISOString().slice(0, 10);
const sgtClock = (now) => new Date(now.getTime() + OFFSET_MS).toISOString().slice(11, 16);

// Parent's quiet-hours setting with defaults for missing/invalid values.
export function quietFrom(row) {
  const enabled = row && row.quiet_enabled === false ? false : true;
  return { enabled, start: isHHMM(row && row.quiet_start) ? row.quiet_start : DEFAULT_QUIET.start, end: isHHMM(row && row.quiet_end) ? row.quiet_end : DEFAULT_QUIET.end };
}
export function inQuietHours(now, q = DEFAULT_QUIET) {
  if (!q.enabled || q.start === q.end) return false;
  const m = mins(sgtClock(now)), s = mins(q.start), e = mins(q.end);
  return s < e ? m >= s && m < e : m >= s || m < e; // window may wrap midnight
}
// The next instant (>= now, strictly after) at which the quiet window ends.
export function quietEndsAt(now, q = DEFAULT_QUIET) {
  const e = mins(q.end);
  const d = new Date(now.getTime() + OFFSET_MS);
  let t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), Math.floor(e / 60), e % 60);
  if (t <= d.getTime()) t += 86400000;
  return new Date(t - OFFSET_MS);
}

export const masterOn = (env = process.env) => env.WHATSAPP_ENABLED === "true";
export const emailOn = (env = process.env) => env.EMAIL_ALERTS_ENABLED === "true";
// Is this event type active at all? WhatsApp master switch, or (milestones only) the email channel.
export const eventActive = (type, env = process.env) => masterOn(env) || (type === "milestone" && emailOn(env));
const allowList = (env) => String(env.ALERT_TEST_RECIPIENTS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
export function dashboardUrl(env = process.env) {
  const base = env.APP_BASE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + env.VERCEL_PROJECT_PRODUCTION_URL : "https://psle-app-vwx3.vercel.app");
  return base.replace(/\/+$/, "") + "/";
}

// Event keys (unique per parent in event_alert_log).
export const startedKey = (childId, day) => `started:${childId}:${day}`;
export const milestoneKey = (childId, subject, key) => `milestone:${childId}:${subject}:${String(key).slice(0, 120)}`;

const log = (...a) => console.log("[event-alert]", ...a);

async function emailConfirmed(admin, id) {
  try { const { data, error } = await admin.auth.admin.getUserById(id); return !error && !!data?.user?.email_confirmed_at; } catch { return false; }
}

// Try WhatsApp, then email. Returns { status: "sent"|"dry-run"|"skipped"|"error", detail }.
async function deliver(admin, parent, channels, payload, { env, fetchImpl }) {
  const formats = { whatsapp: formatWhatsAppEvent, email: renderEventEmail };
  let waDetail = "no whatsapp channel";
  const wa = masterOn(env) ? channels.find((c) => c.type === "whatsapp" && c.enabled) : null;
  if (!masterOn(env)) waDetail = "whatsapp off";
  if (wa && wa.opt_in && isE164(wa.address)) {
    const [r] = await dispatchAlert([wa], payload, { env, fetchImpl, formats });
    if (r?.status === "sent") return { status: "sent", detail: "whatsapp" };
    waDetail = `whatsapp ${r?.status || "failed"}${r?.reason ? ": " + r.reason : r?.error ? ": " + r.error : ""}`;
  } else if (wa) waDetail = "whatsapp not opted in or invalid number";
  log(`parent=${parent.id} whatsapp not used (${waDetail}); trying email fallback`);

  const em = channels.find((c) => c.type === "email" && c.enabled);
  if (!em) return { status: "skipped", detail: `${waDetail}; email off` };
  const address = em.address || parent.email;
  const allow = allowList(env);
  if (allow.length && !allow.includes(String(address || "").toLowerCase())) { log(`parent=${parent.id} email skipped: not in ALERT_TEST_RECIPIENTS`); return { status: "skipped", detail: `${waDetail}; email not in allow-list` }; }
  if (!(await emailConfirmed(admin, parent.id))) return { status: "skipped", detail: `${waDetail}; email unconfirmed` };
  const [r] = await dispatchAlert([{ ...em, address }], payload, { env, fetchImpl, formats });
  if (r?.status === "sent") return { status: "sent", detail: "email fallback" };
  if (r?.status === "dry-run") return { status: "dry-run", detail: "email dry-run (EMAIL_ALERTS_ENABLED off)" };
  return { status: r?.status === "error" ? "error" : "skipped", detail: `${waDetail}; email ${r?.status || "failed"}` };
}

const finish = (admin, row, status, detail) =>
  admin.from("event_alert_log").update({ status, detail: detail ? String(detail).slice(0, 200) : null, updated_at: new Date().toISOString() })
    .eq("parent_id", row.parent_id).eq("event_key", row.event_key);

async function loadParent(admin, pid) {
  const { data: parent } = await admin.from("profiles").select("id,display_name,email").eq("id", pid).maybeSingle();
  let { data: st, error } = await admin.from("parent_settings").select("alert_channels,quiet_enabled,quiet_start,quiet_end").eq("parent_id", pid).maybeSingle();
  if (error) ({ data: st } = await admin.from("parent_settings").select("alert_channels").eq("parent_id", pid).maybeSingle()); // quiet-hours columns not migrated yet
  return { parent, channels: Array.isArray(st?.alert_channels) ? st.alert_channels : [], quiet: quietFrom(st) };
}

// event: { type:"started"|"milestone", childId, subject, key?, label?, score?, total? }. Returns a summary; never throws.
export async function notifyEvent(admin, event, { env = process.env, now = new Date(), fetchImpl } = {}) {
  const out = { enabled: eventActive(event && event.type, env), parents: 0, sent: 0, deferred: 0, duplicate: 0, skipped: 0, errors: 0, dryRun: 0 };
  if (!out.enabled) { log(`disabled (WhatsApp and milestone email fallback both off); no-op type=${event?.type}`); return out; }
  try {
    const day = sgtDay(now);
    const eventKey = event.type === "started" ? startedKey(event.childId, day) : milestoneKey(event.childId, event.subject, event.key);
    const { data: links } = await admin.from("parent_child").select("parent_id").eq("child_id", event.childId);
    const { data: child } = await admin.from("profiles").select("id,display_name").eq("id", event.childId).maybeSingle();
    const payloadBase = {
      kind: event.type, childName: child?.display_name || "Your child", subject: event.subject, label: event.label,
      score: event.score, total: event.total, time: sgtClock(now), eventDay: day, dashboardUrl: dashboardUrl(env),
    };
    for (const pid of [...new Set((links || []).map((l) => l.parent_id))]) {
      out.parents++;
      try {
        const { parent, channels, quiet } = await loadParent(admin, pid);
        if (!parent) { out.skipped++; continue; }
        const row = { parent_id: pid, child_id: event.childId, event_type: event.type, event_key: eventKey, status: "claimed" };
        const deferUntil = inQuietHours(now, quiet) ? quietEndsAt(now, quiet) : null;
        if (deferUntil) Object.assign(row, { status: "deferred", send_after: deferUntil.toISOString(), payload: payloadBase });
        const ins = await admin.from("event_alert_log").insert(row);
        if (ins.error) { if (ins.error.code === "23505") { out.duplicate++; continue; } throw new Error("event_alert_log insert failed"); }
        if (deferUntil) { out.deferred++; log(`parent=${pid} deferred to end of quiet hours type=${event.type}`); continue; }
        const res = await deliver(admin, parent, channels, { ...payloadBase, parentName: parent.display_name || "there" }, { env, fetchImpl });
        await finish(admin, row, res.status === "dry-run" ? "skipped" : res.status, res.detail);
        if (res.status === "sent") out.sent++; else if (res.status === "error") out.errors++; else if (res.status === "dry-run") out.dryRun++; else out.skipped++;
      } catch (e) { out.errors++; console.error("[event-alert] parent failed", pid, String(e?.message || e)); }
    }
    await flushDeferred(admin, { env, now, fetchImpl }); // opportunistic: anything whose quiet hours have ended goes out now
  } catch (e) { out.errors++; console.error("[event-alert] failed", String(e?.message || e)); }
  return out;
}

// Send deferred rows whose quiet hours have ended (called by /api/cron/event-alerts and after every event). Idempotent: a row is claimed
// by flipping 'deferred' -> 'claimed' first. A deferred "started" from an earlier SGT day is dropped as stale; milestones are always sent.
export async function flushDeferred(admin, { env = process.env, now = new Date(), fetchImpl } = {}) {
  const out = { due: 0, sent: 0, skipped: 0, errors: 0 };
  if (!masterOn(env) && !emailOn(env)) return out;
  try {
    const { data: rows } = await admin.from("event_alert_log").select("parent_id,child_id,event_type,event_key,payload").eq("status", "deferred").lte("send_after", now.toISOString()).limit(200);
    for (const row of rows || []) {
      try {
        const { data: won } = await admin.from("event_alert_log").update({ status: "claimed", updated_at: now.toISOString() })
          .eq("parent_id", row.parent_id).eq("event_key", row.event_key).eq("status", "deferred").select("parent_id");
        if (!won || !won.length) continue;
        out.due++;
        if (row.event_type === "started" && !masterOn(env)) { await finish(admin, row, "skipped", "started alert is WhatsApp-only"); out.skipped++; continue; }
        if (row.event_type === "started" && row.payload?.eventDay !== sgtDay(now)) { await finish(admin, row, "skipped", "stale started alert dropped"); out.skipped++; continue; }
        const { parent, channels } = await loadParent(admin, row.parent_id);
        if (!parent) { await finish(admin, row, "skipped", "parent missing"); out.skipped++; continue; }
        const res = await deliver(admin, parent, channels, { ...row.payload, parentName: parent.display_name || "there" }, { env, fetchImpl });
        await finish(admin, row, res.status === "dry-run" ? "skipped" : res.status, res.detail);
        if (res.status === "sent") out.sent++; else if (res.status === "error") out.errors++; else out.skipped++;
      } catch (e) { out.errors++; console.error("[event-alert] flush row failed", String(e?.message || e)); }
    }
  } catch (e) { console.error("[event-alert] flush failed", String(e?.message || e)); }
  return out;
}
