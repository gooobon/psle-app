// "Forgot password?": Supabase sends the reset email. Always answers ok so nobody can learn which emails have accounts.
import { sessionClient, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!rateLimit("pforgot:" + clientIp(request), { max: 5, windowMs: 600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  const base = process.env.APP_BASE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL : "https://psle-app-vwx3.vercel.app");
  try { const sb = await sessionClient(); await sb.auth.resetPasswordForEmail(email, { redirectTo: base + "/?reset=1" }); } catch {}
  return jok({});
}
