// Server-only: picture sequence -> Supabase password, and the login lockout. Never import from client code.
import crypto from "node:crypto";
import { rateLimit, rateLimitClear } from "../rateLimit.js";
import { CLEWQUEST } from "./config.js";
import { createLoginGuard } from "./lockout.js";

// password = HMAC_SHA256(CLEWQUEST_PICTURE_PEPPER, normUsername + ":" + seq), hex. The raw sequence is never stored.
export function derivePicturePassword(pepper, username, seqString) {
  if (!pepper || String(pepper).length < 16) throw new Error("CLEWQUEST_PICTURE_PEPPER missing or too short");
  return crypto.createHmac("sha256", String(pepper)).update(`${String(username).trim().toLowerCase()}:${seqString}`).digest("hex");
}

// Lockout: lib/rateLimit.js (in-memory, counts every attempt before the sign-in) in front of the durable layer. See lockout.js.
export const loginGuard = createLoginGuard({ memory: { hit: rateLimit, clear: rateLimitClear }, cfg: CLEWQUEST.lockout });
// The client IP is stored only as a keyed hash.
export const hashIp = (pepper, ip) => crypto.createHmac("sha256", String(pepper || "")).update(`ip:${String(ip || "unknown")}`).digest("hex").slice(0, 32);
