// Parent reads a child's server-side wrong answers (newest first). RLS (is_parent_of) enforces the link.
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { WRONG_ANSWERS_SYNC } from "@/lib/supabase/config";
import { SUBJECT_KEYS } from "@/lib/activity";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request) {
  if (!serverAuthEnabled() || !WRONG_ANSWERS_SYNC) return jerr("wrong-answer sync disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const u = new URL(request.url);
  const child = u.searchParams.get("child") || "";
  const subject = u.searchParams.get("subject") || "";
  const limit = Math.min(Math.max(parseInt(u.searchParams.get("limit") || "200", 10) || 200, 1), 500);
  if (!UUID.test(child)) return jerr("bad child", 400);
  if (subject && !SUBJECT_KEYS.includes(subject)) return jerr("bad subject", 400);
  const sb = await sessionClient();
  let q = sb.from("wrong_answers")
    .select("id,subject,grade,question_id,attempt_key,student_answer,correct_answer,question_text,section_type,source_id,attempted_at,cause,taxonomy_ids,resolved_at")
    .eq("student_id", child).order("attempted_at", { ascending: false }).limit(limit);
  if (subject) q = q.eq("subject", subject);
  const { data, error } = await q;
  if (error) return jerr("could not load", 500);
  return jok({ items: data || [] });
}
