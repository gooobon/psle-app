// Existing (localStorage-only) parents have no email. On first login with the server enabled the client
// asks for one and calls this route to create the server account and link their children.
// The client has already matched the parent's local record (id + password). Children are linked only if
// (a) a server account for that username exists AND the supplied child password verifies, or
// (b) no server account exists yet, in which case it is created from the local record (same trust model
// as /api/auth/legacy-migrate). TODO(owner): see the allow-list note in legacy-migrate.
import { adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile, signUpParent, createStudent, verifyStudentPassword } from "@/lib/supabase/server";
import { normUsername, USERNAME_RE, RESERVED_USERNAMES } from "@/lib/supabase/config";
import { allowAuthAttempt } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  const name = String(b.name || "").trim().slice(0, 80);
  if (!allowAuthAttempt("legacy-claim", request, email)) return jerr("too many attempts, try again later", 429);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  if (password.length < 8) return jerr("password must be at least 8 characters", 400);
  if (!name) return jerr("name required", 400);

  const r = await signUpParent({ email, password, name });
  if (r.error) return jerr(r.error, r.status);

  const admin = adminClient();
  const linked = [], skipped = [];
  const kids = Array.isArray(b.children) ? b.children.slice(0, 6) : [];
  for (const k of kids) {
    const username = normUsername(k?.username);
    const kpw = String(k?.password || "");
    if (!USERNAME_RE.test(username) || RESERVED_USERNAMES.includes(username) || username.startsWith("demo_")) { skipped.push(username); continue; }
    const { data: existing } = await admin.from("profiles").select("*").eq("username", username).eq("role", "student").maybeSingle();
    if (existing) {
      if (kpw && await verifyStudentPassword(username, kpw)) {
        const l = await admin.from("parent_child").upsert({ parent_id: r.id, child_id: existing.id }, { onConflict: "parent_id,child_id" });
        if (!l.error) { linked.push(publicProfile(existing)); continue; }
      }
      skipped.push(username); continue;
    }
    if (kpw.length < 6) { skipped.push(username); continue; }
    const made = await createStudent(admin, { username, password: kpw, name: String(k.name || username).slice(0, 80), grade: String(k.grade || "").slice(0, 8), school: String(k.school || "").slice(0, 120), parentId: r.id });
    if (made.error) { skipped.push(username); continue; }
    const { data: prof } = await admin.from("profiles").select("*").eq("id", made.id).single();
    linked.push(publicProfile(prof));
  }
  if (!r.session) return jok({ needsConfirmation: true, linked: linked.map(c => c.username), skipped });
  return jok({ profile: publicProfile(r.profile), children: linked, skipped });
}
