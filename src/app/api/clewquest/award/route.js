// ClewQuest: thread award after a round is marked. The student reports ANSWERS; the server grades them against the bank
// (never trusts a client "correct"), so thread cannot be forged. Only the FIRST sight of an item can earn thread
// (clewquest_seen_items). 1 for a first-try correct answer; 0.5 when a hint came first: either a hint reveal recorded by the
// server (clewquest_hint_events) or, in the exam flow, a wrong first answer followed by a server-graded correct retry
// (the retry is only offered after the hint). A client "hint used" flag is never read. The ledger is idempotent per
// (user, source_ref) and written in ONE call. Wrong answers award nothing and nothing is deducted.
// Flag off => 404 (the client hook is a no-op too). Does not touch scoring, attempt history or the learning ledger.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { awardMany, readTotals, syncStage } from "@/lib/clewquest/award";
import { sourceRefOf, subjectsFor } from "@/lib/clewquest/logic";
import { resolveSubmitted } from "@/lib/learningGrade";
import { bankFor, SETS } from "@/lib/clewquest/banks";
import { hintedItemIds } from "@/lib/clewquest/hintServer";
import { planCandidates, threadEntries } from "@/lib/clewquest/awardPlan";

export const runtime = "nodejs";
const MAX_ITEMS = 300;

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`cqa:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const subject = String(b.subject == null ? "" : b.subject).slice(0, 20).toLowerCase();
  const grade = me.profile.grade || CLEWQUEST.defaultGrade;
  const cfg = subjectsFor(grade)[subject];
  if (!cfg || cfg.status !== "open" || !SETS[subject] || !Array.isArray(b.items) || !b.items.length) return jok({ added: 0 });

  const bank = bankFor(subject);
  const cands = planCandidates(b.items, (id) => resolveSubmitted(bank, id, null), MAX_ITEMS).map((c) => ({ ...c, ref: sourceRefOf(subject, c.itemId) }));
  if (!cands.length) return jok({ added: 0 });

  const admin = adminClient(), uid = me.profile.id;
  // First sight only: an item already in seen-items cannot earn again.
  const prior = await admin.from("clewquest_seen_items").select("source_ref").eq("user_id", uid).in("source_ref", cands.map((c) => c.ref));
  if (prior.error) return jerr("could not record", 500);
  const had = new Set((prior.data || []).map((r) => r.source_ref));
  const fresh = cands.filter((c) => !had.has(c.ref));
  // Server-recorded hint reveals for first-try-correct items (looked up before anything is written, so a failure loses nothing).
  let hinted = new Set();
  try { hinted = await hintedItemIds(admin, uid, fresh.filter((c) => c.correct && !c.afterRetry).map((c) => ({ itemId: c.itemId, hit: bank[c.itemId] }))); } catch { return jerr("could not record", 500); }
  if (fresh.length) {
    const ins = await admin.from("clewquest_seen_items").upsert(fresh.map((c) => ({ user_id: uid, source_ref: c.ref })), { onConflict: "user_id,source_ref", ignoreDuplicates: true });
    if (ins.error) return jerr("could not record", 500);
  }
  const refOf = new Map(fresh.map((c) => [c.itemId, c.ref]));
  const entries = threadEntries(fresh, hinted).map((e) => ({ sourceRef: refOf.get(e.itemId), usedHint: e.usedHint }));
  const r = await awardMany({ admin, userId: uid, grade, subject, entries });
  if (r.error) return jerr("could not record", 500);
  const added = r.awarded || 0;
  let stage = null;
  if (added > 0) { const t = await readTotals(admin, uid); if (!t.error) stage = (await syncStage(admin, uid, t.totals.total || 0)).stage; }
  return jok({ added, stage });
}
