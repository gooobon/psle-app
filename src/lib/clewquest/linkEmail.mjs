// Server-only: email a child's one-time link code to a parent (issue #95). Plain node (relative imports) so the self-test can run it with mocks.
// Uses the existing alert sender (Resend, ALERT_FROM_EMAIL) and the same recipient policy as every other parent email:
// EMAIL_ALERTS_ENABLED must be "true"; ALERT_TEST_RECIPIENTS is an allow-list; otherwise ALERT_ALLOW_ALL_PARENTS=true is required.
// The parent's address is used for this one send only: it is never stored and never logged. The code is never logged.
import { emailChannel } from "../notify/email.mjs";
import { sendPolicy, recipientDecision } from "../notify/weeklyReport.mjs";
import { LINK, LINK_MSG, checkLinkCode, allowLinkEmail } from "./linkCode.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function linkUrl(username, env = process.env) {
  const base = env.APP_BASE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + env.VERCEL_PROJECT_PRODUCTION_URL : "https://psle-app-vwx3.vercel.app");
  return base.replace(/\/+$/, "") + "/?link=1&u=" + encodeURIComponent(username); // the code is NOT in the URL (URLs get logged)
}

export function renderLinkEmail({ username, code, expiresInSecs, url }) {
  const mins = Math.max(1, Math.ceil(expiresInSecs / 60));
  const steps = ["Open the ClewQuest Parent login with the button below and log in (or sign up).", "Tap \"Link my child\".", `Type the login ID and the 6 numbers: ${username} and ${code}.`];
  const subject = "Your child wants to link their ClewQuest account";
  const text = ["Hi,", "", "Your child asked us to send you this code so you can follow their practice.", "", `Login ID: ${username}`, `6-digit code: ${code}`, `It works once and stops working in about ${mins} minute${mins === 1 ? "" : "s"}.`, "", ...steps.map((s, i) => `${i + 1}. ${s}`), "", `Open the Parent login: ${url}`, "", "If you did not expect this email, you can ignore it."].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0F172A">
<p>Hi,</p><p>Your child asked us to send you this code so you can follow their practice.</p>
<p style="background:#EFF6FF;border-radius:10px;padding:12px;margin:12px 0">Login ID: <b>${esc(username)}</b><br>6-digit code: <b style="font-size:24px;letter-spacing:4px">${esc(code)}</b><br><span style="font-size:12px;color:#475569">It works once and stops working in about ${mins} minute${mins === 1 ? "" : "s"}.</span></p>
<ol>${steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
<p><a href="${esc(url)}" style="background:#7C3AED;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">Open the Parent login</a></p>
<p style="font-size:12px;color:#64748B">If you did not expect this email, you can ignore it.</p></div>`;
  return { subject, text, html };
}

// deps: { admin, childId, username, code, email, pepper, env, fetchImpl, now } -> { status, error? }
export async function sendLinkCodeEmail({ admin, childId, username, code, email, pepper, env = process.env, fetchImpl, now }) {
  const to = String(email || "").trim();
  if (to.length > 254 || !EMAIL_RE.test(to)) return { status: 400, error: LINK_MSG.badEmail };
  // Switch + recipient policy first (nothing is counted or sent when email is off or the address is not allowed; one generic message either way).
  if (!sendPolicy(env).realSend || !recipientDecision(sendPolicy(env), to).allowed) return { status: 503, error: LINK_MSG.emailOff };
  const lim = await allowLinkEmail(admin, childId);
  if (lim.status !== 200) return lim;
  const chk = await checkLinkCode({ admin, childId, username, code, pepper, now });
  if (chk.status !== 200) return chk;
  let r;
  try { r = await emailChannel.send({ address: to }, renderLinkEmail({ username, code, expiresInSecs: chk.expiresInSecs, url: linkUrl(username, env) }), { env, fetchImpl }); }
  catch { r = { status: "error" }; }
  if (!r || r.status !== "sent") { console.error("[link-email] not sent:", r && r.status); return { status: 503, error: LINK_MSG.emailOff }; } // status only: no address, no code
  return { status: 200 };
}
export { LINK };
