// Legacy migration login. The CLIENT has already matched username+password against the local
// genius_users_v2 record (the server cannot see localStorage). If no server account exists for the
// username, create one with the same password (Supabase stores it hashed), then sign in.
// If a server account already exists this route does nothing (use the normal login).
//
// TODO(owner): this trusts the client's claim that a local record exists, so anyone could claim an
// UNUSED username. Impact is limited (they only get an empty account under that name), but consider
// an allow-list of legacy usernames exported once from known devices. A per-IP/per-username
// in-memory rate limit is applied below (per instance only; see src/lib/rateLimit.js).
import { sessionClient, adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile, createStudent } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { kidEmail, normUsername, usernameKey, usernameIlike, USERNAME_RE, isReservedUsername } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  // Rate limit: 10 attempts / 10 min per IP, and 5 / 10 min per username.
  const win = { windowMs: 10 * 60 * 1000 };
  if (!rateLimit("lm-ip:" + clientIp(request), { max: 10, ...win })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const password = String(b.password || "");
  const name = String(b.name || "").trim().slice(0, 80);
  if (!rateLimit("lm-user:" + usernameKey(username), { max: 5, ...win })) return jerr("too many attempts, try again later", 429);
  if (!USERNAME_RE.test(username) || isReservedUsername(username) || usernameKey(username).startsWith("demo_")) return jerr("cannot migrate this username", 400);
  if (password.length < 6) return jerr("invalid credentials", 401); // legacy minimum was 6
  if (!name) return jerr("name required", 400);

  const admin = adminClient();
  const { data: existing } = await admin.from("profiles").select("id").ilike("username", usernameIlike(username)).maybeSingle();
  if (existing) return jerr("account already exists on the server", 409);

  const made = await createStudent(admin, { username, password, name, grade: String(b.grade || "").slice(0, 8), school: String(b.school || "").slice(0, 120) });
  if (made.error) return jerr(made.error, made.status);

  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) return jerr("login failed after migration", 500);
  const { data: profile } = await admin.from("profiles").select("*").eq("id", made.id).single();
  return jok({ profile: publicProfile(profile), migrated: true });
}
