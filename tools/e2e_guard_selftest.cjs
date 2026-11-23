// Self-test of the E2E production guard (tests/e2e/guard.js): production ref must be refused, local must pass.
const { assertNonProduction, PRODUCTION_REF } = require("../tests/e2e/guard");
let pass = 0, fail = 0;
const t = (name, ok) => { (ok ? pass++ : fail++); console.log((ok ? "PASS " : "FAIL ") + name); };
const throws = (env) => { try { assertNonProduction(env); return false; } catch { return true; } };
const jwt = (o) => "eyJhbGciOiJIUzI1NiJ9." + Buffer.from(JSON.stringify(o)).toString("base64url") + ".sig";
t("local URL passes", !throws({ NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321", E2E_API_URL: "http://127.0.0.1:54321" }));
t("empty env passes", !throws({}));
t("production URL is refused", throws({ NEXT_PUBLIC_SUPABASE_URL: `https://${PRODUCTION_REF}.supabase.co` }));
t("production ref in E2E_API_URL is refused", throws({ E2E_API_URL: `https://${PRODUCTION_REF}.supabase.co` }));
t("production ref in base URL is refused", throws({ E2E_BASE_URL: `https://x.test/?p=${PRODUCTION_REF}` }));
t("production ref inside a JWT key is refused", throws({ SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: PRODUCTION_REF, role: "service_role" }) }));
t("local demo JWT (no ref) passes", !throws({ SUPABASE_SERVICE_ROLE_KEY: jwt({ iss: "supabase-demo", role: "service_role" }) }));
t("other hosted project needs explicit opt-in", throws({ E2E_API_URL: "https://abcdefghijklmnopqrst.supabase.co" }));
t("other hosted project allowed with opt-in", !throws({ E2E_API_URL: "https://abcdefghijklmnopqrst.supabase.co", E2E_ALLOW_NONPROD_CLOUD: "1" }));
console.log(`e2e guard selftest: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
