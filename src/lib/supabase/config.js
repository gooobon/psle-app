// Server-auth feature flag. Default OFF: with it off the app behaves exactly as before.
export const SERVER_AUTH = process.env.NEXT_PUBLIC_SERVER_AUTH === "true";

// Wrong-answer server sync. Default OFF; also requires SERVER_AUTH.
export const WRONG_ANSWERS_SYNC = process.env.NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED === "true";

// Children log in with username; Supabase Auth needs an email. This synthetic address is
// internal only (.invalid is a reserved TLD) and is never shown in the UI.
export const KID_EMAIL_DOMAIN = "kids.genius.invalid";
export const USERNAME_RE = /^[a-z0-9_]{3,30}$/;
export const RESERVED_USERNAMES = ["admin", "root", "system"];
export function kidEmail(username) { return `${username}@${KID_EMAIL_DOMAIN}`; }
export function normUsername(u) { return String(u || "").trim().toLowerCase(); }
