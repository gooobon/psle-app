// One-time, idempotent import of the caller's own localStorage blobs into progress_snapshots.
// Upsert on (user_id,key): re-running overwrites the same rows, never duplicates. The client never
// deletes or modifies localStorage.
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";

export const runtime = "nodejs";

const ALLOWED = ["genius_progress_v2", "genius_zh_review_v2", "genius_en_review_v2", "genius_zh_unknown_v1", "genius_user_record"];
const MAX_BYTES = 3_500_000; // TODO(owner): Vercel serverless request cap is ~4.5MB; chunk if a student's data grows past this.

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me) return jerr("not logged in", 401);
  const raw = await request.text();
  if (raw.length > MAX_BYTES) return jerr("payload too large", 413);
  let body = {};
  try { body = JSON.parse(raw) || {}; } catch { return jerr("bad json", 400); }
  const snaps = body.snapshots && typeof body.snapshots === "object" ? body.snapshots : {};
  const rows = [];
  for (const key of ALLOWED) {
    const data = snaps[key];
    if (data == null || typeof data !== "object") continue;
    if (!Array.isArray(data)) delete data.password; // never store passwords
    rows.push({ user_id: me.profile.id, key, data, updated_at: new Date().toISOString() });
  }
  if (!rows.length) return jok({ imported: 0 });
  const sb = await sessionClient(); // user session: RLS restricts writes to own rows
  const { error } = await sb.from("progress_snapshots").upsert(rows, { onConflict: "user_id,key" });
  if (error) return jerr("import failed", 500);
  return jok({ imported: rows.length });
}
