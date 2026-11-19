// Parent homework. POST assigns similar questions for a child's mistake (atomic in SQL assign_homework(); only an abuse bound of 100/day, no product cap).
// GET returns the child's per-day status (assigned / solved / remaining / correct) for the last 7 days.
// Behind NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED (default off). Linked guardians only.
import { adminClient, sessionClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { PARENT_HOMEWORK } from "@/lib/supabase/config";
import { SUBJECT_KEYS, sgtDate } from "@/lib/activity";
import { HOMEWORK_ABUSE_MAX, capMessage, summarizeHomework } from "@/lib/homework";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;
const on = () => serverAuthEnabled() && PARENT_HOMEWORK;

export async function GET(request) {
  if (!on()) return jerr("homework disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const child = new URL(request.url).searchParams.get("child") || "";
  if (!UUID.test(child)) return jerr("bad child", 400);
  const today = sgtDate();
  const sb = await sessionClient(); // RLS: only linked children's rows are visible
  const { data, error } = await sb.from("parent_homework")
    .select("subject,question_id,source_question_id,assigned_for,solved_at,correct")
    .eq("child_id", child).gte("assigned_for", sgtDate(new Date(), -6)).lte("assigned_for", today);
  if (error) return jerr("could not load", 500);
  const days = summarizeHomework(data);
  const t = days.find((d) => d.date === today) || { assigned: 0 };
  return jok({ today, usedToday: t.assigned, days });
}

export async function POST(request) {
  if (!on()) return jerr("homework disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit(`hwa:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const child = String(b.child || "");
  const subject = String(b.subject || "");
  const source = b.sourceQuestionId == null ? "" : String(b.sourceQuestionId).slice(0, 200);
  const ids = Array.isArray(b.questionIds) ? [...new Set(b.questionIds.map((x) => String(x).slice(0, 200)).filter(Boolean))] : [];
  if (!UUID.test(child) || !SUBJECT_KEYS.includes(subject) || !source) return jerr("bad request", 400);
  if (!ids.length || ids.length > HOMEWORK_ABUSE_MAX) return jerr(`choose 1 to ${HOMEWORK_ABUSE_MAX} questions`, 400);
  const grade = /^P[1-6]$/.test(b.grade || "") ? b.grade : null;
  const { data, error } = await adminClient().rpc("assign_homework", {
    p_parent: me.profile.id, p_child: child, p_subject: subject, p_grade: grade, p_source: source,
    p_questions: ids, p_day: sgtDate(), p_cap: HOMEWORK_ABUSE_MAX,
  });
  if (error || !data) return jerr("could not assign", 500);
  if (data.error === "not_linked") return jerr("not your child", 403);
  if (data.error === "cap") return Response.json({ error: capMessage(data), code: "cap", ...data }, { status: 409, headers: { "Cache-Control": "no-store" } });
  return jok({ ...data, message: data.assigned ? `Assigned ${data.assigned} question${data.assigned > 1 ? "s" : ""} for today.` : "Already assigned for today." });
}
