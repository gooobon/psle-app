// Server-auth feature flag. Default OFF: with it off the app behaves exactly as before.
export const SERVER_AUTH = process.env.NEXT_PUBLIC_SERVER_AUTH === "true";

// Wrong-answer server sync. Default OFF; also requires SERVER_AUTH.
export const WRONG_ANSWERS_SYNC = process.env.NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED === "true";

// Parent homework from mistakes (roadmap step 8). Default OFF; also requires SERVER_AUTH.
export const PARENT_HOMEWORK = process.env.NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED === "true";

// Rewards (roadmap step 9: stickers, Saturday weekly review, parent credit ledger). Default OFF; also requires SERVER_AUTH.
export const REWARDS = process.env.NEXT_PUBLIC_REWARDS_ENABLED === "true";

// Parent/student learning dashboard (issue #42: mastery by skill, cause trends, improving/flat/slipping). Default OFF; also requires SERVER_AUTH.
// Needs supabase/migrations/20261127000000_learning_trials.sql applied by hand.
export const LEARNING_DASHBOARD = process.env.NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED === "true";

// Children log in with username; Supabase Auth needs an email. This synthetic address is
// internal only (.invalid is a reserved TLD) and is never shown in the UI.
export const KID_EMAIL_DOMAIN = "kids.genius.invalid";
export const USERNAME_RE = /^[a-z0-9_]{3,30}$/;
export const RESERVED_USERNAMES = ["admin", "root", "system"];
export function kidEmail(username) { return `${username}@${KID_EMAIL_DOMAIN}`; }
export function normUsername(u) { return String(u || "").trim().toLowerCase(); }
