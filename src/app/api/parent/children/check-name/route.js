// Parent checks whether a child's display name (and optionally login ID, case-insensitive) is free (case-insensitive). Read-only. Create routes re-check on the server.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, displayNameTaken } from "@/lib/supabase/server";
import { cleanNamePart, fullName, normUsername, usernameIlike, USERNAME_RE, isReservedUsername, USERNAME_MSG } from "@/lib/supabase/config";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("cqname:" + me.profile.id, { max: 60, windowMs: 600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const name = b.firstName || b.lastName ? fullName(b.firstName, b.lastName) : cleanNamePart(b.name);
  if (!name || name.length > 80) return jerr("name required", 400);
  const username = normUsername(b.username);
  if (username && (!USERNAME_RE.test(username) || isReservedUsername(username))) return jerr(USERNAME_MSG, 400);
  try {
    const admin = adminClient();
    const out = { available: !(await displayNameTaken(admin, name)) };
    if (username) {
      const { data, error } = await admin.from("profiles").select("id").ilike("username", usernameIlike(username)).limit(1);
      if (error) throw new Error("login id check failed");
      out.usernameAvailable = !(data && data.length);
    }
    return jok(out);
  } catch { return jerr("could not check", 500); }
}
