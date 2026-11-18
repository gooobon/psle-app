import { serverAuthEnabled, jerr, jok, readJson, publicProfile, signUpParent } from "@/lib/supabase/server";
import { allow, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!allow(`signup:ip:${clientIp(request)}`, 10, 15 * 60 * 1000)) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  const name = String(b.name || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  if (password.length < 8) return jerr("password must be at least 8 characters", 400);
  if (!name || name.length > 80) return jerr("name required", 400);

  const r = await signUpParent({ email, password, name });
  if (r.error) return jerr(r.error, r.status);
  // Email confirmation is ON (owner enables it in Supabase Auth settings): no session until the link is clicked.
  if (!r.session) return jok({ needsConfirmation: true });
  return jok({ profile: publicProfile(r.profile), children: [] });
}
