// Browser helpers for ClewQuest. Only writes new `clewquest_*` keys; never reads or modifies `genius_*` keys.
import { clewquestEnabled } from "./config.js";

async function call(path, method, body) {
  try {
    const r = await fetch(path, { method, credentials: "same-origin", cache: "no-store", headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
    let j = {}; try { j = await r.json(); } catch {}
    return { ok: r.ok, status: r.status, ...j };
  } catch { return { ok: false, status: 0, error: "network error" }; }
}
export const cqGet = (p) => call(p, "GET");
export const cqPost = (p, b) => call(p, "POST", b || {});
export const cqPut = (p, b) => call(p, "PUT", b || {});

// Started by ClaudeApp in parallel with /api/auth/me so the island state is not a second serial round trip.
// Single use and short lived: later loads (after an award) always hit the network, so totals are never stale.
let _pre = null;
export function prefetchState() { _pre = { t: Date.now(), p: call("/api/clewquest/state", "GET") }; }
export function takePrefetchedState() { const v = _pre; _pre = null; return v && Date.now() - v.t < 20000 ? v.p : null; }
export const CACHE_KEY = "clewquest_character_v1";
export const LAST_AWARD_KEY = "clewquest_last_award_v1";
export function cacheCharacter(userId, character) { try { localStorage.setItem(CACHE_KEY, JSON.stringify({ userId, character })); } catch {} }
export function readCachedCharacter(userId) { try { const v = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); return v && v.userId === userId ? v.character : null; } catch { return null; } }

// Called after a round has been marked and saved (from reportActivity). Flag off => no-op. Fire-and-forget; never throws.
// Sends ANSWERS only: the server grades them. Nothing is shown here (no solve-screen UI).
export function reportThread(subject, results) {
  if (!clewquestEnabled() || typeof window === "undefined") return;
  try {
    const items = (results || []).filter((r) => r && r.scored !== false && r.id != null && r.userAnswer !== undefined && r.userAnswer !== null)
      .map((r) => ({ itemId: String(r.id), answer: r.userAnswer, answerSeq: r.userAnswerSeq, answerReason: r.userAnswerReason,
        retryAnswer: r.attempts === 2 && r.retryAnswer !== undefined && r.retryAnswer !== null ? r.retryAnswer : undefined })); // no hint flag: the server grades the retry and records hint reveals itself
    if (!items.length) return;
    cqPost("/api/clewquest/award", { subject: String(subject || "").toLowerCase(), items }).then((r) => {
      if (r && r.ok && r.added > 0) {
        try { const prev = JSON.parse(sessionStorage.getItem(LAST_AWARD_KEY) || "0") || 0; sessionStorage.setItem(LAST_AWARD_KEY, JSON.stringify(prev + r.added)); } catch {}
        window.dispatchEvent(new Event("clewquest-thread-changed"));
      }
    }).catch(() => {});
  } catch {}
}
export function takeLastAward() { try { const v = Number(JSON.parse(sessionStorage.getItem(LAST_AWARD_KEY) || "0")) || 0; sessionStorage.removeItem(LAST_AWARD_KEY); return v; } catch { return 0; } }

// Hint reveals: the shared hint box announces the hint text it shows (generic window event "genius-hint-shown"; no ClewQuest code on solve
// screens). The server records it. Flag off => nothing is installed. Deduped per page load.
let hintListener = false;
export function installHintRecorder() {
  if (hintListener || !clewquestEnabled() || typeof window === "undefined") return;
  hintListener = true;
  const sent = new Set();
  window.addEventListener("genius-hint-shown", (e) => {
    const text = e && e.detail && typeof e.detail.text === "string" ? e.detail.text : "";
    if (!text || sent.has(text)) return;
    sent.add(text);
    cqPost("/api/clewquest/hint", { text }).then((r) => { if (!r || !r.ok) sent.delete(text); }).catch(() => sent.delete(text));
  });
}
installHintRecorder();
