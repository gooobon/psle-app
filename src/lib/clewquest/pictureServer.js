// Server-only: picture sequence -> Supabase password, and the login lockout. Never import from client code.
import crypto from "node:crypto";
import { rateLimit, rateLimitBlocked } from "../rateLimit.js";
import { CLEWQUEST } from "./config.js";

// password = HMAC_SHA256(CLEWQUEST_PICTURE_PEPPER, normUsername + ":" + seq), hex. The raw sequence is never stored.
export function derivePicturePassword(pepper, username, seqString) {
  if (!pepper || String(pepper).length < 16) throw new Error("CLEWQUEST_PICTURE_PEPPER missing or too short");
  return crypto.createHmac("sha256", String(pepper)).update(`${String(username).trim().toLowerCase()}:${seqString}`).digest("hex");
}

const key = (username) => `cqpl:${String(username).trim().toLowerCase()}`;
const lim = () => ({ max: CLEWQUEST.lockout.max, windowMs: CLEWQUEST.lockout.windowMs });
// 5 failures per username per 15 minutes (lib/rateLimit.js). Only failures are counted.
export const isLockedOut = (username) => rateLimitBlocked(key(username), lim());
export const recordFailure = (username) => rateLimit(key(username), lim());
