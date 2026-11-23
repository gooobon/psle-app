// Picture-code login lockout: an in-memory first layer (lib/rateLimit.js, fast, per instance) in front of a DURABLE layer in
// Supabase (clewquest_login_attempts / clewquest_login_ip_users via the clewquest_login_* functions), shared by every
// serverless instance.
// Username: every attempt is counted ATOMICALLY BEFORE the sign-in (clewquest_login_try), so parallel requests cannot all
// pass a check; 5 attempts per 15 min, the 6th is refused and locks 15 min; a success clears the counter.
// IP (keyed hash only): more than ipMax DISTINCT usernames failing from one IP in the window locks that IP.
// Any error from the durable store is reported as { error: true } and the caller must fail closed (503).
// Server-only. Pure of Next/Supabase imports so it can be self-tested with a mock client (admin only needs .rpc(name, args)).
import { CLEWQUEST } from "./config.js";

const norm = (u) => String(u).trim().toLowerCase();
export const memKey = (u) => `cqpl:${norm(u)}`;

// memory = { hit(key, {max, windowMs}) -> boolean (counts; false = over the limit), clear(key) }
export function createLoginGuard({ memory, cfg = CLEWQUEST.lockout }) {
  const memLim = { max: cfg.max, windowMs: cfg.windowMs };
  const winSecs = Math.round(cfg.windowMs / 1000), lockSecs = Math.round((cfg.lockMs || cfg.windowMs) / 1000);
  return {
    // BEFORE the sign-in. -> { locked: boolean } or { error: true }
    async begin(admin, username, ipHash) {
      if (!memory.hit(memKey(username), memLim)) return { locked: true };
      const ip = await admin.rpc("clewquest_login_status", { p_scope: "ip", p_key: String(ipHash) });
      if (ip.error) return { error: true };
      if (ip.data) return { locked: true };
      const u = await admin.rpc("clewquest_login_try", { p_scope: "user", p_key: norm(username), p_max: cfg.max, p_window_secs: winSecs, p_lock_secs: lockSecs });
      if (u.error || typeof u.data !== "boolean") return { error: true };
      return { locked: u.data === false };
    },
    // AFTER a failed sign-in: record the username against the IP (distinct-username cap), then lock the username when this
    // was its last allowed attempt (clewquest_login_after_fail, so the 5th wrong code already says "locked").
    // -> { error: boolean, locked: boolean }. If the newer SQL function is not applied yet (function-missing error only) it
    // degrades to the old behaviour (the 6th attempt locks); any other error fails closed.
    async fail(admin, username, ipHash) {
      const r = await admin.rpc("clewquest_login_ip_fail", { p_ip: String(ipHash), p_user: norm(username), p_max: cfg.ipMax, p_window_secs: winSecs, p_lock_secs: lockSecs });
      if (r.error) return { error: true, locked: false };
      const u = await admin.rpc("clewquest_login_after_fail", { p_scope: "user", p_key: norm(username), p_max: cfg.max, p_lock_secs: lockSecs });
      if (u.error) {
        const missing = u.error.code === "PGRST202" || u.error.code === "42883";
        return { error: !missing, locked: false };
      }
      return { error: false, locked: u.data === true };
    },
    // Success, or a parent resetting the code: clear the username counter and lock (the IP record is left alone).
    async reset(admin, username) {
      memory.clear(memKey(username));
      const r = await admin.rpc("clewquest_login_ok", { p_scope: "user", p_key: norm(username) });
      return { error: !!r.error };
    },
  };
}
