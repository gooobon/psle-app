// "Did they do it today?" data for a parent. Reads with the parent's own session so RLS enforces access
// (daily_activity_select -> is_parent_of). Works from any device because it is server-side.
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";

export const runtime = "nodejs";
const TZ = "Asia/Singapore";
const LIVE_SUBJECTS = ["English", "Chinese"]; // TODO(owner): add Math/Science when they go live
const DEFAULT_TARGET = { English: 1, Chinese: 1, Math: 1, Science: 1 };

const sgDate = (d) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d); // YYYY-MM-DD

export async function GET() {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const sb = await sessionClient();

  const days = [];
  for (let i = 6; i >= 0; i--) days.push(sgDate(new Date(Date.now() - i * 86400000)));
  const today = days[6];

  const { data: links } = await sb.from("parent_child").select("child_id").eq("parent_id", me.profile.id);
  const ids = (links || []).map(l => l.child_id);
  if (!ids.length) return jok({ today, children: [] });

  const [{ data: kids }, { data: rows }, { data: st }] = await Promise.all([
    sb.from("profiles").select("id,display_name,username").in("id", ids),
    sb.from("daily_activity").select("user_id,date,subject,sets_completed,questions_answered,correct,minutes").in("user_id", ids).gte("date", days[0]).lte("date", today),
    sb.from("parent_settings").select("daily_target").eq("parent_id", me.profile.id).maybeSingle(),
  ]);
  const target = { ...DEFAULT_TARGET, ...(st?.daily_target || {}) };

  const children = (kids || []).map(k => {
    const mine = (rows || []).filter(r => r.user_id === k.id);
    const t = mine.filter(r => r.date === today);
    const subjects = LIVE_SUBJECTS.map(s => {
      const r = t.find(x => x.subject === s);
      const sets = r?.sets_completed || 0;
      return { subject: s, sets, target: target[s] ?? 1, done: sets >= (target[s] ?? 1) };
    });
    const questions = t.reduce((a, r) => a + r.questions_answered, 0);
    const correct = t.reduce((a, r) => a + r.correct, 0);
    return {
      id: k.id, name: k.display_name, subjects, questions, correct,
      accuracy: questions ? Math.round((correct / questions) * 100) : null,
      minutes: t.reduce((a, r) => a + r.minutes, 0),
      streak: days.map(d => ({ date: d, active: mine.some(r => r.date === d && r.sets_completed > 0) })),
    };
  });
  return jok({ today, children });
}
