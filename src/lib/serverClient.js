// Browser-side helpers for the optional Supabase server (only used when NEXT_PUBLIC_SERVER_AUTH=true).
// Never deletes or modifies existing localStorage data; it only reads it and (additively) writes the
// genius_server_import_v1 marker.
export { SERVER_AUTH } from "@/lib/supabase/config";

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
    });
  } catch {}
}
