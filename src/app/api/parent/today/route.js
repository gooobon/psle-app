// "Did they do it today?" data for every linked child, read from the server (works from any device).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { SUBJECT_KEYS, DEFAULT_TARGET, sgtDate, lastNDates } from "@/lib/activity";

export const runtime = "nodejs";

export async function GET() {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const admin = adminClient();
  const { data: links } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id);
  const ids = (links || []).map(l => l.child_id);
  const { data: st } = await admin.from("parent_settings").select("daily_target").eq("parent_id", me.profile.id).maybeSingle();
  const target = { ...DEFAULT_TARGET, ...(st?.daily_target || {}) };
  const days = lastNDates(7);
  const today = sgtDate();
  if (!ids.length) return jok({ today, days, target, children: [] });
  const [{ data: profs }, { data: rows }] = await Promise.all([
    admin.from("profiles").select("id,display_name,grade").in("id", ids),
    admin.from("daily_activity").select("user_id,date,subject,sets_completed,questions_answered,correct,minutes").in("user_id", ids).gte("date", days[0]).lte("date", today),
  ]);
  const children = (profs || []).map(p => {
    const mine = (rows || []).filter(r => r.user_id === p.id);
    const todayRows = mine.filter(r => r.date === today);
    const subjects = {};
    for (const s of SUBJECT_KEYS) {
      const r = todayRows.find(x => x.subject === s);
      subjects[s] = { sets: r?.sets_completed || 0, questions: r?.questions_answered || 0, correct: r?.correct || 0, target: Number(target[s]) || 0 };
    }
    const q = todayRows.reduce((a, r) => a + r.questions_answered, 0);
    const c = todayRows.reduce((a, r) => a + r.correct, 0);
    // The client hides subjects that are still "Coming Soon" for the child's grade. Streak strip = any set that day.
    const strip = days.map(d => ({ date: d, sets: mine.filter(r => r.date === d).reduce((a, r) => a + r.sets_completed, 0) }));
    return { id: p.id, name: p.display_name, grade: p.grade, subjects, questions: q, correct: c, accuracy: q ? Math.round(c / q * 100) : null, strip };
  });
  return jok({ today, days, target, children });
}
