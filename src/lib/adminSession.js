import crypto from "node:crypto";

export const COOKIE_NAME = "genius_admin";
export const SESSION_TTL_SEC = 12 * 60 * 60;

function b64u(buf) { return Buffer.from(buf).toString("base64url"); }

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function createSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const payload = b64u(JSON.stringify({ r: "admin", exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC }));
  return payload + "." + sign(payload, secret);
}

export function verifySessionToken(token) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token || typeof token !== "string") return false; // fail closed
  const [payload, sig, extra] = token.split(".");
  if (!payload || !sig || extra !== undefined) return false;
  if (!safeEqual(sig, sign(payload, secret))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.r === "admin" && typeof data.exp === "number" && data.exp > Date.now() / 1000;
  } catch { return false; }
}

export function readCookie(request, name) {
  const header = request.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

export function isAdminRequest(request) {
  return verifySessionToken(readCookie(request, COOKIE_NAME));
}

export function cookieHeader(value, maxAge) {
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
