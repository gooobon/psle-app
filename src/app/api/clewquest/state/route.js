// ClewQuest: the student's character, lifetime thread (per subject + total) and stage. Flag off => 404.
import { adminClient, currentUser, jerr, jok } from "@/lib/supabase/server";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { readTotals, syncStage } from "@/lib/clewquest/award";
import { progressToNext, groupThreadsByDay } from "@/lib/clewquest/logic";

export const runtime = "nodejs";

export async function GET(req) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const admin = adminClient(), id = me.profile.id;
  const [{ data: character }, t] = await Promise.all([admin.from("clewquest_characters").select("*").eq("user_id", id).maybeSingle(), readTotals(admin, id)]);
  if (t.error) return jerr("could not load", 500);
  const total = t.totals.total || 0;
  const st = await syncStage(admin, id, total);
  // Read-only: the student's own recent thread awards, grouped by day (My Clew history). A failure just means no history.
  // Only when ?history=1 (My Clew / Clew home, My records): the island landing does not need the 500-row ledger read.
  const out = { character: character || null, thread: { total: 0, bySubject: {} }, stage: st.stage, leveledUp: st.leveledUp, next: progressToNext(total) };
  const bySubject = { ...t.totals }; delete bySubject.total;
  out.thread = { total, bySubject };
  if (new URL(req.url).searchParams.get("history") === "1") {
    const hist = await admin.from("clewquest_thread_ledger").select("amount,subject,created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(500);
    out.threadHistory = hist.error ? [] : groupThreadsByDay(hist.data || []).slice(0, 30);
  }
  return jok(out);
}
