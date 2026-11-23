// "Set a new password": the reset link opens /?reset=1&code=...; the browser posts the code and the new password here.
import { sessionClient, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!rateLimit("preset:" + clientIp(request), { max: 10, windowMs: 600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const code = String(b.code || "").trim(), password = String(b.password || "");
  if (!code || code.length > 512) return jerr("code required", 400);
  if (password.length < 8) return jerr("password must be at least 8 characters", 400);
  const sb = await sessionClient();
  const { data, error } = await sb.auth.exchangeCodeForSession(code);
  if (error || !data?.user) return jerr("This link has expired. Ask for a new one.", 401);
  const up = await sb.auth.updateUser({ password });
  await sb.auth.signOut();
  if (up.error) return jerr("could not set password", 400);
  return jok({});
}
