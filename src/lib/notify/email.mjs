// Email channel via Resend (https://resend.com/docs/api-reference/emails/send-email).
// Real sends happen ONLY if EMAIL_ALERTS_ENABLED=true AND RESEND_API_KEY and ALERT_FROM_EMAIL are set.
// Otherwise send() is a no-op and the caller logs a dry run. Env (names only; values live in Vercel):
//   EMAIL_ALERTS_ENABLED, RESEND_API_KEY, ALERT_FROM_EMAIL
import { renderDailyEmail } from "./emailTemplate.mjs";

export const emailChannel = {
  type: "email",
  isEnabled: (env = process.env) => env.EMAIL_ALERTS_ENABLED === "true",
  format: (p) => renderDailyEmail(p),
  async send(target, message, { env = process.env, fetchImpl } = {}) {
    if (!emailChannel.isEnabled(env)) { console.log("[notify:email] disabled (EMAIL_ALERTS_ENABLED!=true); no-op"); return { status: "noop", reason: "disabled" }; }
    if (!env.RESEND_API_KEY || !env.ALERT_FROM_EMAIL) return { status: "skipped", reason: "RESEND_API_KEY or ALERT_FROM_EMAIL missing" };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(target?.address || ""))) return { status: "skipped", reason: "no valid email address" };
    const r = await (fetchImpl || fetch)("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.ALERT_FROM_EMAIL, to: [target.address], subject: message.subject, text: message.text, html: message.html }),
    });
    return r.ok ? { status: "sent" } : { status: "error", error: `provider HTTP ${r.status}` };
  },
};
