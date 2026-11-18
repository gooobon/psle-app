// WhatsApp channel via the Meta WhatsApp Cloud API (chosen over Twilio: Meta is the underlying platform,
// no per-message reseller markup, and templates are managed in Meta Business Manager either way).
//
// OFF by default. A real send happens ONLY if ALL hold: WHATSAPP_ENABLED=true, provider env vars present,
// the parent has opted in, and the number is E.164. Otherwise send() logs a no-op and returns.
//
// Env (names only; values live in Vercel, never in the repo):
//   WHATSAPP_ENABLED          "true" to allow real sends (default: off)
//   WHATSAPP_PHONE_NUMBER_ID  Meta phone-number id of the business number
//   WHATSAPP_ACCESS_TOKEN     permanent system-user token
//   WHATSAPP_TEMPLATE_NAME    approved template name (see TEMPLATE below)
//   WHATSAPP_TEMPLATE_LANG    template language code, default "en"
//   WHATSAPP_API_VERSION      Graph API version, default "v21.0"

// Meta requires pre-approved templates for business-initiated messages. Submit this body for approval
// (category: UTILITY). TODO(owner): wording is a placeholder until approved; keep the 4 positional {{n}} params.
export const TEMPLATE = {
  name: "daily_practice_summary",
  language: "en",
  body: "Hi {{1}}, {{2}} practice on {{3}}: {{4}}. Questions answered: {{5}}.",
};

const E164 = /^\+[1-9]\d{7,14}$/;
const mark = (s) => (s.sets >= s.target ? "✅" : "❌");

// Template parameters must be single-line, no tabs, no 4+ consecutive spaces (Meta rule).
const clean = (v) => String(v ?? "").replace(/[\r\n\t]+/g, " ").replace(/ {4,}/g, "   ").trim();

export function formatWhatsApp(p) {
  const summary = (p.subjects || []).map((s) => `${mark(s)} ${s.name} ${s.sets}/${s.target}`).join(", ") || "no subjects";
  const questions = String(p.questions ?? 0) + (p.accuracy == null ? "" : ` (${p.accuracy}% correct)`);
  const params = [p.parentName, p.childName, p.date, summary, questions].map(clean);
  // Preview of what the parent will see once the template is approved.
  const preview = TEMPLATE.body.replace(/\{\{(\d)\}\}/g, (_, n) => params[Number(n) - 1] ?? "");
  return { template: TEMPLATE.name, params, preview };
}

export function buildRequest(to, message, env = process.env) {
  const version = env.WHATSAPP_API_VERSION || "v21.0";
  return {
    url: `https://graph.facebook.com/${version}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    init: {
      method: "POST",
      headers: { Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/^\+/, ""),
        type: "template",
        template: {
          name: env.WHATSAPP_TEMPLATE_NAME || TEMPLATE.name,
          language: { code: env.WHATSAPP_TEMPLATE_LANG || TEMPLATE.language },
          components: [{ type: "body", parameters: message.params.map((text) => ({ type: "text", text })) }],
        },
      }),
    },
  };
}

export const whatsappChannel = {
  type: "whatsapp",
  isEnabled: (env = process.env) => env.WHATSAPP_ENABLED === "true",
  format: formatWhatsApp,
  async send(target, message, { env = process.env, fetchImpl } = {}) {
    if (!whatsappChannel.isEnabled(env)) {
      console.log("[notify:whatsapp] disabled (WHATSAPP_ENABLED!=true); no-op");
      return { status: "noop", reason: "disabled" };
    }
    if (!target?.opt_in || !E164.test(String(target.address || ""))) return { status: "skipped", reason: "no opt-in or invalid number" };
    if (!env.WHATSAPP_PHONE_NUMBER_ID || !env.WHATSAPP_ACCESS_TOKEN) return { status: "skipped", reason: "provider credentials missing" };
    const { url, init } = buildRequest(target.address, message, env);
    const r = await (fetchImpl || fetch)(url, init);
    return r.ok ? { status: "sent" } : { status: "error", error: `provider HTTP ${r.status}` };
  },
};
