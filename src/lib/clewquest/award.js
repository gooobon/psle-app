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

// Many awards in ONE upsert (the award route). entries: [{ sourceRef, usedHint }]. Duplicates (already in the ledger, or twice
// in this call) award nothing; only rows actually inserted are counted. -> { awarded } or { error }.
export async function awardMany({ admin, userId, grade, subject, entries }, cfg = CLEWQUEST) {
  if (!clewquestEnabled()) return { skipped: true, awarded: 0 };
  if (!userId || !subject) return { skipped: true, awarded: 0 };
  const seen = new Set(), rows = [];
  for (const e of entries || []) {
    const ref = String((e && e.sourceRef) || "");
    const amount = earnAmount({ correct: true, usedHint: !!(e && e.usedHint) }, cfg);
    if (!ref || seen.has(ref) || !(amount > 0)) continue;
    seen.add(ref);
    rows.push({ user_id: userId, grade: grade || cfg.defaultGrade, subject: String(subject).toLowerCase(), amount, reason: earnReason({ usedHint: !!e.usedHint }), source_ref: ref });
  }
  if (!rows.length) return { awarded: 0 };
  const { data, error } = await admin.from("clewquest_thread_ledger").upsert(rows, { onConflict: "user_id,source_ref", ignoreDuplicates: true }).select("source_ref,amount");
  if (error) return { error: error.message, awarded: 0 };
  const awarded = (Array.isArray(data) ? data : []).reduce((n, r) => n + (Number(r.amount) || 0), 0);
  return { awarded: Math.round(awarded * 10) / 10 };
}

// Lifetime totals per subject, summed IN THE DATABASE (view clewquest_thread_totals, at most one row per subject), so the
// total never stalls at the API row cap (PostgREST max_rows = 1000) however long the ledger grows.
export async function readTotals(admin, userId) {
  const { data, error } = await admin.from("clewquest_thread_totals").select("subject,thread").eq("user_id", userId);
  if (error) return { error: error.message };
  return { totals: totalsBySubject((data || []).map((r) => ({ subject: r.subject, amount: Number(r.thread) || 0 }))) };
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
