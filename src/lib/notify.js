// Parent notification dispatcher. A parent can have several channels (rows in parent_alert_channels).
// Only `email` has a handler slot today; `whatsapp` is intentionally NOT implemented (reserved).
// Nothing calls this yet: the daily-check alert job is a later step (server 3/5).

// Each handler receives ({ address, subject, text }) and returns { sent: boolean, skipped?: string }.
export const CHANNEL_HANDLERS = {
  // TODO(owner): choose an email provider (Resend, Postmark, Supabase SMTP...) and send here.
  email: async () => ({ sent: false, skipped: "no email provider configured" }),
  // whatsapp: reserved, deliberately absent. Unknown/unimplemented channels are skipped, not errors.
};

export async function notifyParent(admin, parentId, message, handlers = CHANNEL_HANDLERS) {
  const { data: channels } = await admin.from("parent_alert_channels")
    .select("channel,address").eq("parent_id", parentId).eq("enabled", true);
  const results = [];
  for (const c of channels || []) {
    const h = handlers[c.channel];
    if (!h) { results.push({ channel: c.channel, sent: false, skipped: "channel not implemented" }); continue; }
    try { results.push({ channel: c.channel, ...(await h({ address: c.address, ...message })) }); }
    catch (e) { results.push({ channel: c.channel, sent: false, skipped: "error" }); }
  }
  return results;
}
