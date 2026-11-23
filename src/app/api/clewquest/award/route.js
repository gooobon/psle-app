// ClewQuest: thread award after a round is marked. The student reports ANSWERS; the server grades them against the bank
// (never trusts a client "correct"), so thread cannot be forged. Only the FIRST sight of an item can earn thread
// (clewquest_seen_items), hint use comes from the server record clewquest_hint_events (never from the client), and the ledger is idempotent per (user, source_ref). Wrong answers award nothing and nothing is deducted.
// Flag off => 404 (the client hook is a no-op too). Does not touch scoring, attempt history or the learning ledger.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { awardThread, readTotals, syncStage } from "@/lib/clewquest/award";
import { sourceRefOf, subjectsFor } from "@/lib/clewquest/logic";
import { resolveSubmitted } from "@/lib/learningGrade";
import { bankFor, SETS } from "@/lib/clewquest/banks";
import { hintedItemIds } from "@/lib/clewquest/hintServer";

export const runtime = "nodejs";
const MAX_ITEMS = 300;
const str = (v, n) => String(v == null ? "" : v).slice(0, n);
function cleanAnswer(v) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") return v.slice(0, 500);
  if (Array.isArray(v)) return v.slice(0, 20).map((x) => (typeof x === "number" && Number.isFinite(x) ? x : typeof x === "string" ? x.slice(0, 500) : null));
  return null;
}

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`cqa:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const subject = str(b.subject, 20).toLowerCase();
  const grade = me.profile.grade || CLEWQUEST.defaultGrade;
  const cfg = subjectsFor(grade)[subject];
  const items = Array.isArray(b.items) ? b.items.slice(0, MAX_ITEMS) : [];
  if (!cfg || cfg.status !== "open" || !SETS[subject] || !items.length) return jok({ added: 0 });

  const admin = adminClient(), uid = me.profile.id;
  const seenIn = new Set();
  const cands = [];
  for (const it of items) {
    const itemId = str(it && it.itemId, 200);
    if (!itemId || seenIn.has(itemId)) continue;
    const rec = resolveSubmitted(bankFor(subject), itemId, null);
    if (!rec) continue;
    const graded = rec.grade({ val: cleanAnswer(it.answer), seq: cleanAnswer(it.answerSeq), reason: cleanAnswer(it.answerReason) });
    if (!graded.scored) continue;
    seenIn.add(itemId);
    cands.push({ itemId, ref: sourceRefOf(subject, itemId), correct: graded.correct === true }); // any client-sent hint flag is ignored
  }
  if (!cands.length) return jok({ added: 0 });

  // First sight only: insert-ignore into seen-items; an item that was already there cannot earn again.
  const refs = cands.map((c) => c.ref);
  const prior = await admin.from("clewquest_seen_items").select("source_ref").eq("user_id", uid).in("source_ref", refs);
  if (prior.error) return jerr("could not record", 500);
  const had = new Set((prior.data || []).map((r) => r.source_ref));
  const fresh = cands.filter((c) => !had.has(c.ref));
  // 1 vs 0.5 thread comes ONLY from the server-recorded hint reveals (looked up before anything is written, so a failure loses nothing).
  let hinted = new Set();
  try { hinted = await hintedItemIds(admin, uid, fresh.filter((c) => c.correct).map((c) => ({ itemId: c.itemId, hit: bankFor(subject)[c.itemId] }))); } catch { return jerr("could not record", 500); }
  if (fresh.length) {
    const ins = await admin.from("clewquest_seen_items").upsert(fresh.map((c) => ({ user_id: uid, source_ref: c.ref })), { onConflict: "user_id,source_ref", ignoreDuplicates: true });
    if (ins.error) return jerr("could not record", 500);
  }
  let added = 0;
  for (const c of fresh) {
    if (!c.correct) continue;
    const r = await awardThread({ admin, userId: uid, grade, subject, sourceRef: c.ref, usedHint: hinted.has(c.itemId) });
    if (r.error) return jerr("could not record", 500);
    added += r.awarded || 0;
  }
  let stage = null;
  if (added > 0) { const t = await readTotals(admin, uid); if (!t.error) stage = (await syncStage(admin, uid, t.totals.total || 0)).stage; }
  return jok({ added, stage });
}
