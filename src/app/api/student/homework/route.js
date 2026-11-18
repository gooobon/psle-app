// Student side of parent homework. GET: today's assigned questions (SGT) for a subject.
// POST: record answers {subject, results:[{id, correct}]}; only the caller's own, still-unsolved rows of today change.
// Writes only solved_at/correct (never deletes). Does NOT touch mastery/trials. Flag-gated, default off.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { PARENT_HOMEWORK } from "@/lib/supabase/config";
import { SUBJECT_KEYS, sgtDate } from "@/lib/activity";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const on = () => serverAuthEnabled() && PARENT_HOMEWORK;

export async function GET(request) {
  if (!on()) return jerr("homework disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const subject = new URL(request.url).searchParams.get("subject") || "";
  if (!SUBJECT_KEYS.includes(subject)) return jerr("bad subject", 400);
  const { data, error } = await adminClient().from("parent_homework")
    .select("question_id,solved_at,correct").eq("child_id", me.profile.id).eq("subject", subject)
    .eq("assigned_for", sgtDate()).order("created_at", { ascending: true });
  if (error) return jerr("could not load", 500);
  return jok({ items: (data || []).map((r) => ({ id: r.question_id, solved: !!r.solved_at, correct: r.correct === true })) });
}

export async function POST(request) {
  if (!on()) return jerr("homework disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`hws:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const subject = String(b.subject || "");
  const results = Array.isArray(b.results) ? b.results.slice(0, 20) : [];
  if (!SUBJECT_KEYS.includes(subject) || !results.length) return jerr("bad request", 400);
  const admin = adminClient();
  const now = new Date().toISOString();
  let n = 0;
  for (const r of results) {
    if (!r || r.id == null) continue;
    const { data, error } = await admin.from("parent_homework")
      .update({ solved_at: now, correct: r.correct === true })
      .eq("child_id", me.profile.id).eq("subject", subject).eq("question_id", String(r.id).slice(0, 200))
      .eq("assigned_for", sgtDate()).is("solved_at", null).select("id");
    if (error) return jerr("could not save", 500);
    n += (data || []).length;
  }
  return jok({ recorded: n });
}
