// Browser-side helpers for the optional Supabase server (only used when NEXT_PUBLIC_SERVER_AUTH=true).
// Never deletes or modifies existing localStorage data; it only reads it and (additively) writes the
// genius_server_import_v1 marker.
export { SERVER_AUTH, WRONG_ANSWERS_SYNC, PARENT_HOMEWORK, REWARDS } from "@/lib/supabase/config";
import { SERVER_AUTH as _SA, WRONG_ANSWERS_SYNC as _WA, REWARDS as _RW } from "@/lib/supabase/config";

import { taxonomyIdsFor } from "@/lib/taxonomyLookup";

const IMPORT_MARKER = "genius_server_import_v1";

async function call(path, method, body) {
  try {
    const r = await fetch(path, {
      method, credentials: "same-origin", cache: "no-store",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    let j = {}; try { j = await r.json(); } catch {}
    return { ok: r.ok, status: r.status, ...j };
  } catch { return { ok: false, status: 0, error: "network error" }; }
}
export const serverPost = (p, b) => call(p, "POST", b || {});
export const serverGet = (p) => call(p, "GET");
export const serverPut = (p, b) => call(p, "PUT", b || {});

function lsJson(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } }
function pick(obj, prefix) {
  const out = {}; for (const [k, v] of Object.entries(obj || {})) if (k === prefix || k.startsWith(prefix + "_")) out[k] = v; return out;
}
function marker() { return lsJson(IMPORT_MARKER, {}); }

// Upload this user's local data once. Idempotent server-side (upsert); the marker avoids repeats.
export async function importLocalOnce(username) {
  if (!username || marker()[username]) return { skipped: true };
  const rec = lsJson("genius_users_v2", {})[username];
  const snapshots = {
    genius_progress_v2: pick(lsJson("genius_progress_v2", {}), username),
    genius_zh_review_v2: pick(lsJson("genius_zh_review_v2", {}), username),
    genius_en_review_v2: pick(lsJson("genius_en_review_v2", {}), username),
    genius_zh_unknown_v1: lsJson("genius_zh_unknown_v1", []), // device-wide list (not per-user in the app today)
  };
  if (rec) { const { password, ...rest } = rec; snapshots.genius_user_record = rest; }
  const r = await serverPost("/api/import", { snapshots });
  if (r.ok) { try { localStorage.setItem(IMPORT_MARKER, JSON.stringify({ ...marker(), [username]: new Date().toISOString() })); } catch {} }
  return r;
}

// Daily activity log: report one completed set/round. Fire-and-forget; never blocks or alters the learning flow.
// Idempotent server-side per (user, SGT date, subject, key). Does nothing when the flag is off.
import { SERVER_AUTH as _FLAG } from "@/lib/supabase/config";
// ── Study minutes ──────────────────────────────────────────────
// Active time = sum of gaps between consecutive student interactions (tap/click/key/scroll) since the last report.
// A gap longer than IDLE_CAP_MS (5 min) is treated as a break and not counted. The clock starts at the first
// interaction after a report, so time between sets is not counted. Passive; it never touches engine logic.
const IDLE_CAP_MS = 5 * 60 * 1000;
const tracker = { last: 0, activeMs: 0, on: false };
function touch() {
  const now = Date.now();
  if (tracker.last) { const gap = now - tracker.last; if (gap <= IDLE_CAP_MS) tracker.activeMs += gap; }
  tracker.last = now;
}
function startTracker() {
  if (tracker.on || typeof window === "undefined") return;
  tracker.on = true;
  for (const ev of ["pointerdown", "keydown", "touchstart", "scroll"]) window.addEventListener(ev, touch, { passive: true, capture: true });
}
// Returns whole minutes of active time since the previous call, then resets. >=20 s counts as 1 minute.
export function takeActiveMinutes() {
  touch(); // close the final gap (completion tap)
  const ms = tracker.activeMs;
  tracker.activeMs = 0; tracker.last = 0;
  return ms >= 20000 ? Math.max(1, Math.round(ms / 60000)) : 0;
}
if (_FLAG) startTracker();

export function reportActivity(subject, key, results, minutes) {
  if (!_FLAG) return;
  try {
    if (minutes == null) minutes = takeActiveMinutes();
    const graded = (results || []).filter(r => r && r.scored !== false);
    serverPost("/api/activity", {
      subject, key: String(key),
      questions: graded.length, correct: graded.filter(r => r.correct).length, minutes,
    }).then(() => {
      // Rewards (flag NEXT_PUBLIC_REWARDS_ENABLED, default off): ask the server whether today's target is now met. Idempotent.
      if (!_RW) return;
      serverPost("/api/student/rewards/claim", {}).then(r => {
        if (r && r.ok && typeof window !== "undefined") window.dispatchEvent(new Event("genius-rewards-changed"));
      });
    });
  } catch {}
}

// ── Wrong-answer sync (flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_WRONG_ANSWERS_SYNC_ENABLED, default off) ──
// Copies only; the localStorage write stays exactly as is and is never cleared.
const WA_MARKER = "genius_wrong_answers_sync_v1";
const asText = v => (v == null ? undefined : typeof v === "string" ? v : JSON.stringify(v));
function waItem(m, subject, grade, attemptKey, attemptedAt, sourceId) {
  const opts = Array.isArray(m.options) ? m.options : null;
  const pick = v => (opts && typeof v === "number" && opts[v] !== undefined ? opts[v] : v);
  return {
    subject, grade, questionId: String(m.id), attemptKey, attemptedAt, sourceId,
    studentAnswer: asText(pick(m.userAnswer !== undefined ? m.userAnswer : m.yourAnswer !== undefined ? m.yourAnswer : m.studentAnswer)),
    correctAnswer: asText(pick(m.correctAnswer !== undefined ? m.correctAnswer : m.answer)),
    questionText: asText(m.q || m.sentence || m.word), sectionType: m.sectionType || m.topic,
    taxonomyIds: m.conceptIds || taxonomyIdsFor(m.id) || undefined, // only confident tags (null/undefined otherwise)
  };
}
// Live path: call right after the session is saved locally. Fire-and-forget.
export function reportWrongAnswers(subject, grade, sessionNum, missed, sourceId) {
  if (!_SA || !_WA) return;
  try {
    const at = new Date().toISOString();
    const items = (missed || []).filter(m => m && m.id != null).map(m => waItem(m, subject, grade, "set-" + sessionNum, at, sourceId || undefined));
    if (items.length) serverPost("/api/wrong-answers", { items });
  } catch {}
}
// One-time upload of this student's existing local wrong answers (from history[].mistakes). Copy, never move/clear.
export async function syncLocalWrongAnswersOnce(username) {
  if (!_SA || !_WA || !username) return { skipped: true };
  let mk = {}; try { mk = JSON.parse(localStorage.getItem(WA_MARKER) || "{}"); } catch {}
  if (mk[username]) return { skipped: true };
  const all = lsJson("genius_progress_v2", {});
  const items = [];
  for (const [k, prog] of Object.entries(all)) {
    const m = k.startsWith(username + "_") && k.slice(username.length + 1).match(/^(P\d)_(\w+)$/);
    if (!m) continue;
    for (const h of (prog && prog.history) || []) {
      const at = h.date && !isNaN(new Date(h.date)) ? new Date(h.date).toISOString() : undefined;
      for (const x of h.mistakes || []) if (x && x.id != null) items.push(waItem(x, m[2], m[1], "set-" + h.sessionNum, at, h.school));
    }
  }
  let ok = true;
  for (let i = 0; i < items.length; i += 200) {
    const r = await serverPost("/api/wrong-answers", { items: items.slice(i, i + 200) });
    if (!r.ok) { ok = false; break; }
  }
  if (ok) { try { localStorage.setItem(WA_MARKER, JSON.stringify({ ...mk, [username]: new Date().toISOString() })); } catch {} }
  return { ok, count: items.length };
}

// Update cause / resolved on an existing server row (never deletes). Flag-gated, fire-and-forget.
// patch: { cause?: string, resolved?: true }. attemptKey is required (row = student+subject+question+attempt_key); without it nothing is sent, so a wrong row is never touched.
export function updateWrongAnswer(subject, questionId, attemptKey, patch) {
  if (!_SA || !_WA || questionId == null || !attemptKey) return;
  try { serverPost("/api/wrong-answers/update", { subject, questionId: String(questionId), attemptKey, ...patch }); } catch {}
}

// Rewards: report a finished Saturday weekly review (flag NEXT_PUBLIC_REWARDS_ENABLED, default off). Server checks it is Saturday (SGT).
export async function reportWeeklyReview(subject, items) {
  if (!_SA || !_RW) return { skipped: true };
  const r = await serverPost("/api/student/rewards/weekly", { subject, items });
  if (typeof window !== "undefined") window.dispatchEvent(new Event("genius-rewards-changed"));
  return r;
}
