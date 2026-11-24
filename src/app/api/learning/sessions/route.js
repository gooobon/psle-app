// Practice session start/end log (issue #128). Service role only; the student id comes from the login, never the body.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED + NEXT_PUBLIC_ANSWER_TIMING_ENABLED (default off).
// Fail soft: if practice_sessions does not exist yet, answer ok:true / skipped so the client never shows an error.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { LEARNING_DASHBOARD, ANSWER_TIMING } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { isMissingColumnError } from "@/lib/answerTiming";

export const runtime = "nodejs";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SUBJECTS = ["English", "Chinese"], MODES = ["exam", "mock", "drill", "homework", "review"];
const str = (v, n) => String(v == null ? "" : v).slice(0, n);
const int = (v, max) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? Math.min(max, Math.round(n)) : null; };
const iso = (v) => { const t = Date.parse(v); return Number.isFinite(t) && Math.abs(Date.now() - t) < 48 * 3600 * 1000 ? new Date(t).toISOString() : null; };

export async function POST(request) {
  if (!serverAuthEnabled() || !LEARNING_DASHBOARD || !ANSWER_TIMING) return jerr("disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`ps:${me.profile.id}:${clientIp(request)}`, { max: 60, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const id = String(b.id || "");
  if (!UUID_RE.test(id)) return jerr("bad request", 400);
  const subject = str(b.subject, 20), mode = str(b.mode, 20);
  const row = {
    id: id.toLowerCase(), student_id: me.profile.id,
    subject: SUBJECTS.includes(subject) ? subject : null, mode: MODES.includes(mode) ? mode : null,
    set_key: str(b.setKey, 200) || null, started_at: iso(b.startedAt), ended_at: iso(b.endedAt),
    active_ms: int(b.activeMs, 86400000), idle_ms: int(b.idleMs, 86400000), item_count: int(b.itemCount, 1000),
    first_try_correct: int(b.firstTryCorrect, 1000), guessed_count: int(b.guessedCount, 1000), junk_count: int(b.junkCount, 1000) || 0,
  };
  const admin = adminClient();
  // Another student's row with the same id must not be overwritten.
  const ex = await admin.from("practice_sessions").select("student_id").eq("id", row.id).maybeSingle();
  if (ex.error) return isMissingColumnError(ex.error) ? jok({ skipped: true }) : jerr("could not record", 500);
  if (ex.data && ex.data.student_id !== me.profile.id) return jerr("bad request", 400);
  // End call only fills the end fields on an existing row (keeps started_at); start call inserts.
  const { error } = ex.data
    ? await admin.from("practice_sessions").update(Object.fromEntries(Object.entries(row).filter(([k, v]) => v != null && k !== "id" && k !== "student_id" && k !== "started_at"))).eq("id", row.id).eq("student_id", me.profile.id)
    : await admin.from("practice_sessions").insert(row);
  if (error) return isMissingColumnError(error) ? jok({ skipped: true }) : jerr("could not record", 500);
  return jok({ ok: true });
}
