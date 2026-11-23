// Parent creates a child account (service role, after verifying the caller is a logged-in parent).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, publicProfile, createStudent, displayNameTaken } from "@/lib/supabase/server";
import { normUsername, USERNAME_RE, isReservedUsername, USERNAME_MSG, cleanNamePart, fullName } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const password = String(b.password || "");
  const firstName = cleanNamePart(b.firstName), lastName = cleanNamePart(b.lastName);
  const name = firstName || lastName ? fullName(firstName, lastName) : cleanNamePart(b.name);
  const grade = String(b.grade || "").trim();
  const school = String(b.school || "").trim();
  if (!USERNAME_RE.test(username) || isReservedUsername(username)) return jerr(USERNAME_MSG, 400);
  if (password.length < 6) return jerr("password must be at least 6 characters", 400);
  if (!name || name.length > 80) return jerr("name required", 400);
  if (!["P3", "P4", "P5", "P6"].includes(grade)) return jerr("grade must be P3-P6", 400);

  if (school.length > 120) return jerr("school too long", 400);
  const admin = adminClient();
  try { if (await displayNameTaken(admin, name)) return jerr("display name taken", 409); } catch { return jerr("could not check name", 500); }
  const made = await createStudent(admin, { username, password, name, firstName, lastName, grade, school: school.slice(0, 120), parentId: me.profile.id });
  if (made.error) return jerr(made.error, made.status);
  return jok({ child: { id: made.id, role: "student", username, name, grade, school } });
}

export async function GET() {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const admin = adminClient();
  const { data: kids } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id);
  const ids = (kids || []).map(k => k.child_id);
  const { data } = ids.length ? await admin.from("profiles").select("*").in("id", ids) : { data: [] };
  return jok({ children: (data || []).map(publicProfile) });
}
