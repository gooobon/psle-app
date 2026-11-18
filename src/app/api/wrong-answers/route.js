// Student reports wrong answers (batch). Idempotent: unique (student, subject, question, attempt_key), ON CONFLICT DO NOTHING.
// Behind NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_WRONG_ANSWERS_SYNC (default off).
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { WRONG_ANSWERS_SYNC } from "@/lib/supabase/config";
import { SUBJECT_KEYS } from "@/lib/activity";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const MAX_ITEMS = 300;          // legacy upload sends many; live path sends a handful
const MAX_BODY = 400_000;       // bytes
const s = (v, n) => (v == null ? null : String(typeof v === "string" ? v : JSON.stringify(v)).slice(0, n));

export async function POST(request) {
  if (!serverAuthEnabled() || !WRONG_ANSWERS_SYNC) return jerr("wrong-answer sync disabled", 404);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return jerr("payload too large", 413);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`wa:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const items = Array.isArray(b.items) ? b.items : [];
  if (!items.length || items.length > MAX_ITEMS) return jerr("bad request", 400);
  const rows = [];
  for (const it of items) {
    const subject = String(it?.subject || "");
    const qid = s(it?.questionId, 200), key = s(it?.attemptKey, 120);
    if (!SUBJECT_KEYS.includes(subject) || !qid || !key) continue;
    const at = new Date(it.attemptedAt);
    rows.push({
      student_id: me.profile.id, subject, grade: s(it.grade, 8), question_id: qid, attempt_key: key,
      student_answer: s(it.studentAnswer, 500), correct_answer: s(it.correctAnswer, 500),
      question_text: s(it.questionText, 2000), section_type: s(it.sectionType, 60), source_id: s(it.sourceId, 120),
      attempted_at: isNaN(at) ? new Date().toISOString() : at.toISOString(),
      taxonomy_ids: Array.isArray(it.taxonomyIds) ? it.taxonomyIds.slice(0, 10).map(x => String(x).slice(0, 80)) : null,
    });
  }
  if (!rows.length) return jerr("no valid items", 400);
  const sb = await sessionClient();
  const { error } = await sb.from("wrong_answers").upsert(rows, { onConflict: "student_id,subject,question_id,attempt_key", ignoreDuplicates: true });
  if (error) return jerr("could not record", 500);
  return jok({ received: rows.length });
}
