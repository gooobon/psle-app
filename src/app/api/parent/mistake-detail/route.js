// Parent: extras for the mistake detail view (issue #131). Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_PARENT_DETAIL_ENABLED.
//   GET ?child=<uuid>&subject=English|Chinese  -> { tags:{wrongAnswerId:cause}, tagsAvailable, attempts:{itemId:n}, answers:{itemId:text}, answersAvailable, elapsed:{itemId:ms}, elapsedAvailable }
//   PUT { child, wrongAnswerId, cause }         -> sets the parent cause tag (careless / concept / vocabulary); cause "" is not allowed
// RLS (is_parent_of) enforces the parent-child link. Before 20261210000000_parent_detail.sql is applied, PUT answers 503 and GET reports tagsAvailable:false.
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { PARENT_DETAIL } from "@/lib/supabase/config";
import { SUBJECT_KEYS } from "@/lib/activity";
import { isParentCause, attemptSummary } from "@/lib/parentDetail";
import { loadMistakeExtras } from "@/lib/parentDetailServer";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

async function parent() {
  if (!serverAuthEnabled() || !PARENT_DETAIL) return { err: jerr("parent detail disabled", 404) };
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return { err: jerr("parent login required", 401) };
  return { me };
}

export async function GET(request) {
  const g = await parent(); if (g.err) return g.err;
  const u = new URL(request.url);
  const child = u.searchParams.get("child") || "", subject = u.searchParams.get("subject") || "";
  if (!UUID.test(child) || !SUBJECT_KEYS.includes(subject)) return jerr("bad request", 400);
  const x = await loadMistakeExtras(child, subject);
  const { attempts, answers, elapsed } = attemptSummary(x.trials);
  return jok({ tags: x.tags, tagsAvailable: x.tagsAvailable, attempts, answers, answersAvailable: x.hasAnswers, elapsed, elapsedAvailable: x.hasElapsed });
}

export async function PUT(request) {
  const g = await parent(); if (g.err) return g.err;
  const b = await readJson(request);
  const child = String(b.child || ""), waId = String(b.wrongAnswerId || ""), cause = String(b.cause || "");
  if (!UUID.test(child) || !UUID.test(waId) || !isParentCause(cause)) return jerr("bad request", 400);
  const sb = await sessionClient();
  const own = await sb.from("wrong_answers").select("id").eq("id", waId).eq("student_id", child).maybeSingle();
  if (own.error || !own.data) return jerr("not found", 404);
  const r = await sb.from("parent_cause_tags").upsert(
    { student_id: child, wrong_answer_id: waId, cause, set_by: g.me.profile.id, updated_at: new Date().toISOString() },
    { onConflict: "wrong_answer_id" });
  if (r.error) return jerr("Cause tags are not available yet", 503);
  return jok({ wrongAnswerId: waId, cause });
}
