// Email channel. Formatting is real; sending is a stub until the owner picks an email provider.
// TODO(owner): choose a provider (Resend / Supabase SMTP / SES) and implement send() below.
const mark = (s) => (s.sets >= s.target ? "✅" : "❌");

export const emailChannel = {
  type: "email",
  isEnabled: () => false, // no provider wired yet
  format(p) {
    const lines = (p.subjects || []).map((s) => `${mark(s)} ${s.name}: ${s.sets}/${s.target} set(s)`);
    return {
      subject: `${p.childName}: practice summary for ${p.date}`,
      text: [`Hi ${p.parentName},`, "", ...lines, `Questions answered: ${p.questions}` + (p.accuracy == null ? "" : ` (accuracy ${p.accuracy}%)`)].join("\n"),
    };
  },
  async send(target) {
    console.log("[notify:email] no provider configured; skipped", target?.address ? "(address on file)" : "");
    return { status: "skipped", reason: "email provider not configured" };
  },
};
