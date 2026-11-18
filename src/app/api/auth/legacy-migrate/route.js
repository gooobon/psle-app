// Legacy migration login. The CLIENT has already matched username+password against the local
// genius_users_v2 record (the server cannot see localStorage). If no server account exists for the
// username, create one with the same password (Supabase stores it hashed), then sign in.
// If a server account already exists this route does nothing (use the normal login).
//
// TODO(owner): this trusts the client's claim that a local record exists, so anyone could claim an
// UNUSED username. Impact is limited (they only get an empty account under that name), but consider
// an allow-list of legacy usernames exported once from known devices, plus rate limiting.
import { sessionClient, adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile, createStudent } from "@/lib/supabase/server";
import { kidEmail, normUsername, USERNAME_RE, RESERVED_USERNAMES } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const password = String(b.password || "");
  const name = String(b.name || "").trim().slice(0, 80);
  if (!USERNAME_RE.test(username) || RESERVED_USERNAMES.includes(username) || username.startsWith("demo_")) return jerr("cannot migrate this username", 400);
  if (password.length < 6) return jerr("invalid credentials", 401); // legacy minimum was 6
  if (!name) return jerr("name required", 400);

  const admin = adminClient();
  const { data: existing } = await admin.from("profiles").select("id").eq("username", username).maybeSingle();
  if (existing) return jerr("account already exists on the server", 409);

  const made = await createStudent(admin, { username, password, name, grade: String(b.grade || "").slice(0, 8), school: String(b.school || "").slice(0, 120) });
  if (made.error) return jerr(made.error, made.status);

  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) return jerr("login failed after migration", 500);
  const { data: profile } = await admin.from("profiles").select("*").eq("id", made.id).single();
  return jok({ profile: publicProfile(profile), migrated: true });
}
