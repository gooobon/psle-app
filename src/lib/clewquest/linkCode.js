// Server-only: one-time 6-digit parent link codes for picture-code children. No Next/Supabase imports, so the self-test can
// drive these with mocks (admin only needs .rpc(name, args) and .from(table)).
// Fails CLOSED: any error from the durable store is 503. One generic message for every wrong / expired / unknown case.
import crypto from "node:crypto";

export const LINK = Object.freeze({ digits: 6, ttlSecs: 600, issueMax: 5, issueWindowSecs: 600, redeemMax: 5, redeemWindowSecs: 900, emailMax: 3, emailWindowSecs: 3600 });
export const LINK_MSG = {
  unavailable: "link temporarily unavailable",
  tooMany: "too many tries, try again later",
  invalid: "That code did not work. Ask your child for a new code.",
  expired: "This code has expired. Get a new code.",
  emailOff: "Email is not available right now. Show your parent the 6 numbers instead.",
  badEmail: "Type your parent's email address.",
};
const norm = (u) => String(u).trim().toLowerCase();
export const CODE_RE = /^\d{6}$/;
export const newLinkCode = (randomInt = crypto.randomInt) => String(randomInt(0, 10 ** LINK.digits)).padStart(LINK.digits, "0");
// HMAC(pepper, "link:<username>:<code>"), hex. Distinct from the picture-password derivation (different prefix).
export function hashLinkCode(pepper, username, code) {
  if (!pepper || String(pepper).length < 16) throw new Error("CLEWQUEST_PICTURE_PEPPER missing or too short");
  return crypto.createHmac("sha256", String(pepper)).update(`link:${norm(username)}:${String(code)}`).digest("hex");
}
const tryKey = (kind, key) => `${kind}:${norm(key)}`;
async function attempt(admin, key, max, windowSecs) {
  const r = await admin.rpc("clewquest_login_try", { p_scope: "user", p_key: key, p_max: max, p_window_secs: windowSecs, p_lock_secs: windowSecs });
  if (r.error || typeof r.data !== "boolean") return { error: true };
  return { allowed: r.data };
}

// Child side. deps: { admin, childId, username, pepper, code? (tests) } -> { status, code?, expiresInSecs? }
export async function issueLinkCode({ admin, childId, username, pepper, code }) {
  const a = await attempt(admin, tryKey("linkissue", childId), LINK.issueMax, LINK.issueWindowSecs);
  if (a.error) return { status: 503, error: LINK_MSG.unavailable };
  if (!a.allowed) return { status: 429, error: LINK_MSG.tooMany };
  let c, h;
  try { c = code || newLinkCode(); h = hashLinkCode(pepper, username, c); } catch { return { status: 503, error: LINK_MSG.unavailable }; }
  const up = await admin.from("clewquest_link_codes").upsert({ child_id: childId, code_hash: h, expires_at: new Date(Date.now() + LINK.ttlSecs * 1000).toISOString() }, { onConflict: "child_id" });
  if (up.error) return { status: 503, error: LINK_MSG.unavailable };
  return { status: 200, code: c, expiresInSecs: LINK.ttlSecs };
}

// Child side: is `code` the child's own live (unexpired) code? Never logs or returns the code. -> { status, expiresInSecs? }
export async function checkLinkCode({ admin, childId, username, code, pepper, now = Date.now() }) {
  if (!CODE_RE.test(String(code || ""))) return { status: 410, error: LINK_MSG.expired };
  let h; try { h = hashLinkCode(pepper, username, code); } catch { return { status: 503, error: LINK_MSG.unavailable }; }
  const r = await admin.from("clewquest_link_codes").select("code_hash,expires_at").eq("child_id", childId).maybeSingle();
  if (r.error) return { status: 503, error: LINK_MSG.unavailable };
  const exp = r.data ? Date.parse(r.data.expires_at) : NaN;
  if (!r.data || r.data.code_hash !== h || !(exp > now)) return { status: 410, error: LINK_MSG.expired };
  return { status: 200, expiresInSecs: Math.floor((exp - now) / 1000) };
}
// Counts one "email my parent" request (3 per hour per child, durable store, fails closed).
export async function allowLinkEmail(admin, childId) {
  const a = await attempt(admin, tryKey("linkmail", childId), LINK.emailMax, LINK.emailWindowSecs);
  if (a.error) return { status: 503, error: LINK_MSG.unavailable };
  if (!a.allowed) return { status: 429, error: LINK_MSG.tooMany };
  return { status: 200 };
}

// Parent side. deps: { admin, parentId, username, code, pepper, loadChild(username) -> {id, username} | null (picture-code students only),
// link(childId) -> { error? } }  -> { status, childId? }
export async function redeemLinkCode({ admin, username, code, pepper, loadChild, link }) {
  const u = norm(username || "");
  if (!u || !CODE_RE.test(String(code || ""))) return { status: 401, error: LINK_MSG.invalid };
  // Count the attempt BEFORE looking anything up (unknown usernames count too, so there is no username oracle).
  const a = await attempt(admin, tryKey("link", u), LINK.redeemMax, LINK.redeemWindowSecs);
  if (a.error) return { status: 503, error: LINK_MSG.unavailable };
  if (!a.allowed) return { status: 429, error: LINK_MSG.tooMany };
  let child;
  try { child = await loadChild(u); } catch { return { status: 503, error: LINK_MSG.unavailable }; }
  if (!child) return { status: 401, error: LINK_MSG.invalid };
  let h;
  try { h = hashLinkCode(pepper, u, code); } catch { return { status: 503, error: LINK_MSG.unavailable }; }
  const r = await admin.rpc("clewquest_link_redeem", { p_child: child.id, p_hash: h });
  if (r.error || typeof r.data !== "boolean") return { status: 503, error: LINK_MSG.unavailable };
  if (!r.data) return { status: 401, error: LINK_MSG.invalid };
  const l = await link(child.id);
  if (l && l.error) return { status: 500, error: "link failed" };
  await admin.rpc("clewquest_login_ok", { p_scope: "user", p_key: tryKey("link", u) }); // best effort: clear the guess counter
  return { status: 200, childId: child.id };
}
