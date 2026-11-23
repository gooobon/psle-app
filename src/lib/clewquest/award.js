// Server-side thread award. Call only AFTER an answer has been marked (never from the solve UI).
// Flag off => no-op. Idempotent: unique (user_id, source_ref) on the ledger. Never deducts.
import { CLEWQUEST, clewquestEnabled } from "./config.js";
import { earnAmount, earnReason, stageFromTotal, totalsBySubject } from "./logic.js";

// admin: a Supabase service-role client (or a mock with the same from().select/upsert/insert shape).
export async function awardThread({ admin, userId, grade, subject, sourceRef, usedHint }, cfg = CLEWQUEST) {
  if (!clewquestEnabled()) return { skipped: true, awarded: 0 };
  const amount = earnAmount({ correct: true, usedHint: !!usedHint }, cfg);
  if (!userId || !subject || !sourceRef || !(amount > 0)) return { skipped: true, awarded: 0 };
  const row = { user_id: userId, grade: grade || cfg.defaultGrade, subject: String(subject).toLowerCase(), amount, reason: earnReason({ usedHint }), source_ref: String(sourceRef) };
  const { data, error } = await admin.from("clewquest_thread_ledger").upsert(row, { onConflict: "user_id,source_ref", ignoreDuplicates: true }).select("id");
  if (error) return { error: error.message, awarded: 0 };
  const inserted = Array.isArray(data) && data.length > 0; // ignoreDuplicates returns no row for a duplicate
  return { awarded: inserted ? amount : 0 };
}

// Lifetime totals for a student from the ledger, plus the cached stage row (updated; never decreases in Phase 1).
export async function readTotals(admin, userId) {
  const { data, error } = await admin.from("clewquest_thread_ledger").select("subject,amount").eq("user_id", userId).limit(100000);
  if (error) return { error: error.message };
  return { totals: totalsBySubject(data || []) };
}
export async function syncStage(admin, userId, total) {
  const stage = stageFromTotal(total);
  const { data: cur } = await admin.from("clewquest_stage_state").select("stage,stage_reached_at").eq("user_id", userId).maybeSingle();
  const prev = (cur && cur.stage) || 1;
  const reached = { ...((cur && cur.stage_reached_at) || {}) };
  const top = Math.max(prev, stage);
  for (let s = prev + 1; s <= top; s++) reached[String(s)] = new Date().toISOString();
  await admin.from("clewquest_stage_state").upsert({ user_id: userId, stage: top, stage_reached_at: reached }, { onConflict: "user_id" });
  return { stage: top, leveledUp: top > prev };
}
