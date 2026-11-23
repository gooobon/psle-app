// Picture-code login lockout: an in-memory first layer (fast, per instance) in front of a DURABLE layer in Supabase
// (clewquest_login_attempts via the clewquest_login_* functions), so a lock holds across serverless instances.
// Only failures count; a success clears the username counter. Server-only. Pure of Next/Supabase imports so it can be self-tested
// with a mock client (admin only needs .rpc(name, args) -> { data, error }).
import { CLEWQUEST } from "./config.js";

const norm = (u) => String(u).trim().toLowerCase();
export const memKey = (u) => `cqpl:${norm(u)}`;

// memory = { blocked(key, {max}), hit(key, {max, windowMs}), clear(key) } (lib/rateLimit.js, or a per-instance fake in tests)
export function createLoginGuard({ memory, cfg = CLEWQUEST.lockout }) {
  const memLim = { max: cfg.max, windowMs: cfg.windowMs };
  const winSecs = Math.round(cfg.windowMs / 1000), lockSecs = Math.round((cfg.lockMs || cfg.windowMs) / 1000);
  const user = (username) => ["user", norm(username), cfg.max];
  const ip = (ipHash) => ["ip", String(ipHash), cfg.ipMax];
  return {
    // -> { locked: boolean, error?: true }. error = the durable store could not be read: the caller must fail closed.
    async check(admin, username, ipHash) {
      if (memory.blocked(memKey(username), memLim)) return { locked: true };
      for (const [scope, key] of [user(username), ip(ipHash)]) {
        const r = await admin.rpc("clewquest_login_status", { p_scope: scope, p_key: key });
        if (r.error) return { locked: false, error: true };
        if (r.data) return { locked: true };
      }
      return { locked: false };
    },
    async fail(admin, username, ipHash) {
      memory.hit(memKey(username), memLim);
      let error = false;
      for (const [scope, key, max] of [user(username), ip(ipHash)]) {
        const r = await admin.rpc("clewquest_login_fail", { p_scope: scope, p_key: key, p_max: max, p_window_secs: winSecs, p_lock_secs: lockSecs });
        if (r.error) error = true;
      }
      return { error };
    },
    // Success, or a parent resetting the code: clear the username counter and lock (the IP counter is left alone).
    async reset(admin, username) {
      memory.clear(memKey(username));
      const r = await admin.rpc("clewquest_login_ok", { p_scope: "user", p_key: norm(username) });
      return { error: !!r.error };
    },
  };
}
