// Student reports mastery-mode trials (copy of what is already in local progress). Idempotent: unique
// (student, subject, item, mode, attempted_at), ON CONFLICT DO NOTHING. Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED (default off).
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { LEARNING_DASHBOARD } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { LEARNING_SUBJECTS } from "@/lib/learningServer";

export const runtime = "nodejs";
const MAX_ITEMS = 300;
const MAX_BODY = 300_000;
const MODES = ["exam", "mock", "drill", "homework"];
const str = (v, n) => String(v == null ? "" : v).slice(0, n);

export async function POST(request) {
  if (!serverAuthEnabled() || !LEARNING_DASHBOARD) return jerr("learning dashboard disabled", 404);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return jerr("payload too large", 413);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`lt:${me.profile.id}:${clientIp(request)}`, { max: 60, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const items = Array.isArray(b.items) ? b.items : [];
  if (!items.length || items.length > MAX_ITEMS) return jerr("bad request", 400);
  const rows = [];
  for (const it of items) {
    const subject = str(it?.subject, 20), mode = str(it?.mode, 20), itemId = str(it?.itemId, 200), skill = str(it?.skill, 120);
    const at = new Date(Number(it?.ts));
    if (!LEARNING_SUBJECTS.includes(subject) || !MODES.includes(mode) || !itemId || !skill || Number.isNaN(at.getTime())) continue;
    const weight = Number(it.weight);
    rows.push({
      student_id: me.profile.id, subject, grade: str(it.grade, 8) || null, item_id: itemId, skill, mode,
      first_try: it.firstTry === true, correct: it.correct === true,
      weight: weight > 0 && weight <= 1 ? weight : 1,
      session_num: Number.isInteger(it.sessionNum) ? it.sessionNum : null,
      attempted_at: at.toISOString(),
    });
  }
  if (!rows.length) return jerr("no valid items", 400);
  const sb = await sessionClient(); // RLS: students insert only their own rows
  const { error } = await sb.from("learning_trials").upsert(rows, { onConflict: "student_id,subject,item_id,mode,attempted_at", ignoreDuplicates: true });
  if (error) return jerr("could not record", 500);
  return jok({ received: rows.length });
}
