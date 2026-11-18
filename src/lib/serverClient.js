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

// ── Daily activity log (flag on, server-logged-in students only) ─────────────────────────────
// Called at set/round completion. Fire-and-forget; never throws, never touches progress data.
// Each call carries a unique event id so the server applies it exactly once even if retried.
// Failed sends are kept in a small queue (genius_activity_queue_v1) and retried on the next call.
const ACT_QUEUE = "genius_activity_queue_v1";
function uuid() {
  try { if (crypto?.randomUUID) return crypto.randomUUID(); } catch {}
  const h = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
  return `${h()}${h()}-${h()}-4${h().slice(1)}-a${h().slice(1)}-${h()}${h()}${h()}`;
}
export async function logActivity(subject, results, minutes) {
  if (!SERVER_AUTH || typeof window === "undefined") return;
  try {
    const graded = (results || []).filter(r => r && r.scored !== false);
    const entry = {
      event: uuid(), subject, sets: 1,
      questions: graded.length, correct: graded.filter(r => r.correct).length, minutes: Math.round(minutes || 0),
    };
    const queue = [...lsJson(ACT_QUEUE, []), entry].slice(-50);
    const left = [];
    for (const e of queue) {
      const r = await serverPost("/api/activity", e);
      // 401/404 = not a server student (demo/legacy local user) or server off: drop. Network/5xx: keep.
      if (!r.ok && (r.status === 0 || r.status >= 500 || r.status === 429)) left.push(e);
    }
    localStorage.setItem(ACT_QUEUE, JSON.stringify(left));
  } catch {}
}
