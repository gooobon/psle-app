// ClewQuest: create / edit the student's character (free to edit in Phase 1). Flag off => 404.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { validateCharacter } from "@/lib/clewquest/logic";

export const runtime = "nodejs";

export async function PUT(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const v = validateCharacter(await readJson(request));
  if (!v.ok) return jerr(v.error, 400);
  const row = { user_id: me.profile.id, ...v.value, updated_at: new Date().toISOString() };
  if (me.user && me.user.user_metadata && me.user.user_metadata.picture_code === true) row.picture_code_set = true;
  const { data, error } = await adminClient().from("clewquest_characters").upsert(row, { onConflict: "user_id" }).select().single();
  if (error) return jerr("could not save", 500);
  return jok({ character: data });
}
