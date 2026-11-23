// Parent checks whether a child's display name is free (case-insensitive). Read-only. Create routes re-check on the server.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, displayNameTaken } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("cqname:" + me.profile.id, { max: 60, windowMs: 600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const name = String(b.name || "").trim();
  if (!name || name.length > 80) return jerr("name required", 400);
  try { return jok({ available: !(await displayNameTaken(adminClient(), name)) }); } catch { return jerr("could not check", 500); }
}
