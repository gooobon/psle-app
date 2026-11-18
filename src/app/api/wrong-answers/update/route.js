// Student sets the cause of / resolves ONE of their own wrong-answer rows. Never deletes; touches only cause, resolved_at, updated_at.
// No client UPDATE policy exists on wrong_answers (by design), so this uses the service client AFTER verifying the caller
// and always scopes by student_id = caller. Behind NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED (default off).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { WRONG_ANSWERS_SYNC } from "@/lib/supabase/config";
import { SUBJECT_KEYS } from "@/lib/activity";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const CAUSES = ["concept_unknown", "misread", "calculation", "trap", "time", "guessed"];

export async function POST(request) {
  if (!serverAuthEnabled() || !WRONG_ANSWERS_SYNC) return jerr("wrong-answer sync disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`wau:${me.profile.id}:${clientIp(request)}`, { max: 60, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const subject = String(b.subject || "");
  const qid = b.questionId == null ? "" : String(b.questionId).slice(0, 200);
  const key = b.attemptKey == null ? "" : String(b.attemptKey).slice(0, 120);
  if (!SUBJECT_KEYS.includes(subject) || !qid) return jerr("bad request", 400);
  const patch = { updated_at: new Date().toISOString() };
  if (b.cause !== undefined) {
    if (!CAUSES.includes(b.cause)) return jerr("invalid cause", 400);
    patch.cause = b.cause;
  }
  if (b.resolved === true) patch.resolved_at = patch.updated_at;
  if (Object.keys(patch).length === 1) return jerr("nothing to update", 400);
  const admin = adminClient();
  let q = admin.from("wrong_answers").select("id").eq("student_id", me.profile.id).eq("subject", subject).eq("question_id", qid);
  if (key) q = q.eq("attempt_key", key);
  const { data: row } = await q.order("attempted_at", { ascending: false }).limit(1).maybeSingle();
  if (!row) return jerr("record not found", 404);
  const { error } = await admin.from("wrong_answers").update(patch).eq("id", row.id).eq("student_id", me.profile.id);
  if (error) return jerr("could not update", 500);
  return jok({});
}
