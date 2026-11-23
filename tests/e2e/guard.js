// Fail-fast guard shared by playwright.config.js and every spec helper: E2E must NEVER touch the production Supabase project.
// Checks every URL / host / key-like env var for the production ref (plain text, and the `ref` claim inside Supabase JWT keys).
const PRODUCTION_REF = "zehnulwvysvnsshunxzr";
const WATCHED = [
  "NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL", "E2E_API_URL", "E2E_DB_URL", "E2E_BASE_URL", "DATABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "E2E_SERVICE_ROLE", "SUPABASE_ACCESS_TOKEN",
];

function jwtRef(value) {
  const m = /^eyJ[\w-]+\.([\w-]+)\.[\w-]+$/.exec(String(value || "").trim());
  if (!m) return "";
  try { const p = JSON.parse(Buffer.from(m[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")); return String(p.ref || ""); } catch { return ""; }
}

function assertNonProduction(env = process.env) {
  for (const k of WATCHED) {
    const v = String(env[k] || "");
    if (v.includes(PRODUCTION_REF) || jwtRef(v) === PRODUCTION_REF) {
      throw new Error(`Refusing to run E2E: ${k} points at the production Supabase project (${PRODUCTION_REF}). Use local Supabase or a non-production project.`);
    }
  }
  // Any other hosted project must be opted in explicitly (a non-production project only).
  const api = String(env.E2E_API_URL || "");
  if (/^https:\/\/[a-z0-9]{20}\.supabase\.co/i.test(api) && env.E2E_ALLOW_NONPROD_CLOUD !== "1") {
    throw new Error("E2E_API_URL looks like a hosted Supabase project. Set E2E_ALLOW_NONPROD_CLOUD=1 only for a NON-production project.");
  }
}

module.exports = { PRODUCTION_REF, assertNonProduction, jwtRef };
