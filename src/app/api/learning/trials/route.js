// Student reports ANSWERS; the server grades them (issue #42, anti-forgery). Writes go through the service role only:
// learning_trials has no insert policy and no table grant for students (migration 20261128000000).
//
// The client sends only { itemId, answer, answerSeq?, answerReason?, mode, ts, sessionNum, grade, subject, guessed?, hinted? }.
// The server NEVER trusts client correct / firstTry / weight / skill, and never returns the answer key or per-item correctness.
//   * item must exist in the bank (and be auto-gradable); unknown ids are dropped
//   * correct       = server grade of the submitted answer
//   * first_try     = correct AND not flagged guessed/hinted by the client (can only lower it) AND no earlier row for this item
//   * weight        = 1, except homework: 0.5 only for an assigned, unseen, same-skill item answered >= 1 SGT day after the
//                     original mistake (homeworkMastery.js, #33). Same-question redo and everything else = 0 (no row).
//   * dedupe        = one row per (student, subject, item, mode), enforced by a unique key; re-sending does nothing
//   * attempted_at  = server time (a client ts is used only if it is within the last 48h)
//   * daily cap     = at most MAX_PER_DAY new daily-set rows per subject per SGT day
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED (default off).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { LEARNING_DASHBOARD, ANSWER_TIMING } from "@/lib/supabase/config";
import { cleanTimingFields, stripTiming, isMissingColumnError } from "@/lib/answerTiming";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { sgtDate } from "@/lib/activity";
import { LEARNING_SUBJECTS } from "@/lib/learningServer";
import { itemIndex, resolveSubmitted } from "@/lib/learningGrade";
import { homeworkMasteryWeight } from "@/lib/homeworkMastery";
import { skillIdsOf } from "@/lib/similarItemsCore";
import { taxonomyIdsFor } from "@/lib/taxonomyLookup";
import { WA1_PRACTICE_SETS } from "@/data/p3/english/wa1_practice";
import { WA1_ZH_PRACTICE } from "@/data/p3/chinese/wa1_practice";
import WA1_ZH_DRILL from "@/data/p3/chinese/wa1_drill";

export const runtime = "nodejs";
const MAX_ITEMS = 300;
const MAX_BODY = 300_000;
const MAX_PER_DAY = 200;
const MODES = ["exam", "mock", "drill", "homework"];
const TS_WINDOW_MS = 48 * 3600 * 1000;
const str = (v, n) => String(v == null ? "" : v).slice(0, n);

const SETS = { English: () => WA1_PRACTICE_SETS, Chinese: () => [...WA1_ZH_PRACTICE, ...(WA1_ZH_DRILL || [])] };
const bankFor = (subject) => itemIndex(subject, SETS[subject]);

// Only plain answer shapes are accepted: number, string, or an array of those (true/false and sequence answers).
function cleanAnswer(v) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") return v.slice(0, 500);
  if (Array.isArray(v)) return v.slice(0, 20).map((x) => (typeof x === "number" && Number.isFinite(x) ? x : typeof x === "string" ? x.slice(0, 500) : null));
  return null;
}
// Skill key stored on the row: taxonomy v1 leaf when the item is confidently tagged, else the item's own skill / trap / section key.
function skillOfItem(id, rec) {
  const leaf = skillIdsOf(taxonomyIdsFor(id) || [])[0];
  return leaf || rec.skill || rec.trap || ("sec:" + rec.sectionType);
}

export async function POST(request) {
  if (!serverAuthEnabled() || !LEARNING_DASHBOARD) return jerr("learning dashboard disabled", 404);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return jerr("payload too large", 413);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`lt:${me.profile.id}:${clientIp(request)}`, { max: 60, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const items = Array.isArray(b.items) ? b.items : [];
  if (!items.length || items.length > MAX_ITEMS) return jerr("bad request", 400);

  const sid = me.profile.id, admin = adminClient();
  const nowMs = Date.now(), today = sgtDate();
  const dayStartIso = new Date(Date.parse(today + "T00:00:00+08:00")).toISOString();

  // Pre-validate shape + resolve against the bank. Only the ids from items that resolve are used in queries.
  const cands = [];
  for (const it of items) {
    const subject = str(it && it.subject, 20), mode = str(it && it.mode, 20), itemId = str(it && it.itemId, 200);
    const setId = str(it && it.setId, 200);
    if (!LEARNING_SUBJECTS.includes(subject) || !MODES.includes(mode) || !itemId) continue;
    const rec = resolveSubmitted(bankFor(subject), itemId, setId);
    if (!rec) continue;
    cands.push({ it, subject, mode, itemId, setId, rec });
  }
  if (!cands.length) return jok({ received: items.length, recorded: 0, ignored: items.length }); // unknown / ungradable ids are dropped, not an error

  // Prior server state for this student: earlier rows for these items, today's daily-set volume, assigned homework.
  const ids = [...new Set(cands.map((c) => c.itemId))];
  const subjects = [...new Set(cands.map((c) => c.subject))];
  const hwIds = [...new Set(cands.filter((c) => c.mode === "homework").map((c) => c.itemId))];
  const [prior, todayRows, hw] = await Promise.all([
    admin.from("learning_trials").select("subject,item_id,mode").eq("student_id", sid).in("subject", subjects).in("item_id", ids),
    admin.from("learning_trials").select("subject").eq("student_id", sid).in("subject", subjects).neq("mode", "homework").gte("created_at", dayStartIso).limit(2000),
    hwIds.length ? admin.from("parent_homework").select("subject,question_id,source_question_id").eq("child_id", sid).in("question_id", hwIds) : Promise.resolve({ data: [] }),
  ]);
  if (prior.error || todayRows.error || hw.error) return jerr("could not record", 500);
  const seenItem = new Set((prior.data || []).map((r) => r.subject + "|" + r.item_id));
  const seenMode = new Set((prior.data || []).map((r) => r.subject + "|" + r.item_id + "|" + r.mode));
  const perDay = {};
  for (const r of todayRows.data || []) perDay[r.subject] = (perDay[r.subject] || 0) + 1;
  const hwSource = {};
  for (const r of hw.data || []) hwSource[r.subject + "|" + r.question_id] = r.source_question_id;
  const srcIds = [...new Set(Object.values(hwSource))];
  const srcAt = {};
  if (srcIds.length) {
    const wa = await admin.from("wrong_answers").select("question_id,attempted_at").eq("student_id", sid).in("question_id", srcIds).order("attempted_at", { ascending: true }).limit(1000);
    if (wa.error) return jerr("could not record", 500);
    for (const r of wa.data || []) if (srcAt[r.question_id] == null) srcAt[r.question_id] = Date.parse(r.attempted_at); // earliest miss
  }

  const rows = [];
  let ignored = 0;
  for (const c of cands) {
    const { it, subject, mode, itemId, setId, rec } = c;
    // setId keeps a past-paper item apart from a practice item that reused the same id.
    const dk = subject + "|" + itemId + "|" + mode + "|" + (setId || "");
    if (seenMode.has(dk)) { ignored++; continue; } // already recorded (or duplicated inside this request)
    const graded = rec.grade({ val: cleanAnswer(it.answer), seq: cleanAnswer(it.answerSeq), reason: cleanAnswer(it.answerReason) });
    if (!graded.scored) { ignored++; continue; }
    const skill = skillOfItem(itemId, rec);
    let weight = 1;
    if (mode === "homework") {
      const srcId = hwSource[subject + "|" + itemId];
      if (srcId == null) { ignored++; continue; } // not assigned to this student
      const srcRec = resolveSubmitted(bankFor(subject), srcId, null);
      const srcLeaf = skillIdsOf(taxonomyIdsFor(srcId) || [])[0];
      const srcSkill = srcLeaf || (srcRec ? (srcRec.skill || srcRec.trap || ("sec:" + srcRec.sectionType)) : null);
      const v = homeworkMasteryWeight({ item: { id: itemId, skill }, source: { id: srcId, skill: srcSkill, ts: srcAt[srcId] }, seenIds: seenItem.has(subject + "|" + itemId) ? [itemId] : [], todayYmd: today });
      if (!v.counts) { ignored++; continue; } // same question / seen / too soon / other skill: does not touch mastery
      weight = v.weight;
    } else {
      if ((perDay[subject] || 0) >= MAX_PER_DAY) { ignored++; continue; }
      perDay[subject] = (perDay[subject] || 0) + 1;
    }
    const downgraded = it.guessed === true || it.hinted === true; // the client may only LOWER first_try, never raise it
    const firstTry = graded.correct && !downgraded && !seenItem.has(subject + "|" + itemId);
    const t = Number(it.ts);
    const at = Number.isFinite(t) && t <= nowMs && nowMs - t <= TS_WINDOW_MS ? t : nowMs;
    seenMode.add(dk); seenItem.add(subject + "|" + itemId);
    rows.push({
      student_id: sid, subject, grade: str(it.grade, 8) || null, item_id: itemId, skill, mode,
      first_try: firstTry, correct: graded.correct, weight,
      session_num: Number.isInteger(it.sessionNum) && it.sessionNum >= 0 && it.sessionNum < 100000 ? it.sessionNum : null,
      attempted_at: new Date(at).toISOString(), server_graded: true, dedupe_key: dk,
      ...(ANSWER_TIMING ? cleanTimingFields(it) : {}), // issue #128, flag default off
    });
  }
  if (rows.length) {
    const opts = { onConflict: "student_id,dedupe_key", ignoreDuplicates: true };
    let { error } = await admin.from("learning_trials").upsert(rows, opts);
    // Fail soft (#128): if the timing columns are not applied yet, drop them and insert exactly as before.
    if (error && ANSWER_TIMING && isMissingColumnError(error)) ({ error } = await admin.from("learning_trials").upsert(stripTiming(rows), opts));
    if (error) return jerr("could not record", 500);
  }
  // Counts only: no per-item verdict is returned, so the route is not an answer oracle.
  return jok({ received: items.length, recorded: rows.length, ignored: items.length - rows.length });
}
