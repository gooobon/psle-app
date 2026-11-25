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

// Answer timing + practice session logging (issue #128). Default OFF; also requires SERVER_AUTH + LEARNING_DASHBOARD.
// Needs supabase/migrations/20261208000000_answer_timing.sql for storage; without it the server drops the fields (fail soft).
export const ANSWER_TIMING = process.env.NEXT_PUBLIC_ANSWER_TIMING_ENABLED === "true";

// Mock exams from real past papers (issue #44, docs/design/mock-exams-v1.md phase 1). Default OFF; also requires SERVER_AUTH
// (objective items are graded on the server from the paper's own key). Needs supabase/migrations/20261129000000_exam_attempts.sql applied by hand.
export const MOCK_EXAMS_ENABLED = process.env.NEXT_PUBLIC_MOCK_EXAMS_ENABLED === "true";

// Children log in with username; Supabase Auth needs an email. This synthetic address is
// internal only (.invalid is a reserved TLD) and is never shown in the UI.
export const KID_EMAIL_DOMAIN = "kids.genius.invalid";
// Login IDs: A-Z, a-z, 0-9, _ (3-30). The original casing is stored and shown; uniqueness, login, lockout and the synthetic
// email are all case-insensitive ("Aquacat01" and "aquacat01" are the same account).
export const USERNAME_RE = /^[A-Za-z0-9_]{3,30}$/;
export const USERNAME_MSG = "Login ID must be 3-30 characters: letters (A-Z, a-z), numbers (0-9) and _ only";
export const RESERVED_USERNAMES = ["admin", "root", "system"];
export function isReservedUsername(u) { return RESERVED_USERNAMES.includes(String(u || "").toLowerCase()); }
export function kidEmail(username) { return `${String(username).trim().toLowerCase()}@${KID_EMAIL_DOMAIN}`; }
// Trimmed, original casing kept. Use usernameKey() for any comparison / map key.
export function normUsername(u) { return String(u || "").trim(); }
export function usernameKey(u) { return String(u || "").trim().toLowerCase(); }
// ilike pattern that matches exactly one login ID, ignoring case (escapes % _ \).
export function usernameIlike(u) { return usernameKey(u).replace(/[\\%_]/g, "\\$&"); }

// Names: collapse runs of whitespace, trim. Spaces are always fine ("Joon Hee" or "JoonHee").
export function cleanNamePart(s) { return String(s || "").replace(/\s+/g, " ").trim(); }
export function fullName(first, last) { return cleanNamePart(`${cleanNamePart(first)} ${cleanNamePart(last)}`); }
// Suggested login ID from a name: all whitespace and other illegal characters stripped, capped at 30.
export function suggestLoginId(first, last) { return (cleanNamePart(first) + cleanNamePart(last)).replace(/[^A-Za-z0-9_]/g, "").slice(0, 30); }
// Live validation for the login ID field. Returns "" when fine, else a message naming the bad character.
export function loginIdProblem(u) {
  const v = String(u || "");
  if (!v) return "";
  const bad = v.match(/[^A-Za-z0-9_]/);
  if (bad) {
    const c = bad[0];
    if (/\s/.test(c)) return "Spaces aren't allowed in the login ID";
    return `"${c}" isn't allowed in the login ID. Use letters, numbers and _ only`;
  }
  if (v.length < 3) return "Login ID needs at least 3 characters";
  if (v.length > 30) return "Login ID can be at most 30 characters";
  if (isReservedUsername(v)) return "That login ID is reserved. Try another";
  return "";
}
