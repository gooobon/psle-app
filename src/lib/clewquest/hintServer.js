// Server-only: hint reveals are RECORDED by the server (clewquest_hint_events) and the 1 vs 0.5 thread decision uses only that record.
// A client-sent "hint used" flag is never read. The app reports the hint TEXT it showed; we store a hash, and only for texts that
// really are hints of a bank item, so the table cannot be filled with arbitrary strings.
import crypto from "node:crypto";

export const normHint = (t) => String(t == null ? "" : t).replace(/\s+/g, " ").trim().slice(0, 1000);
export const hintHash = (t) => crypto.createHash("sha256").update(normHint(t)).digest("hex").slice(0, 32);

const hintsOf = (x) => {
  const out = [];
  if (x && typeof x === "object") {
    if (typeof x.hint === "string") out.push(x.hint);
    if (Array.isArray(x.hints)) for (const h of x.hints) if (typeof h === "string") out.push(h);
  }
  return out.map(normHint).filter(Boolean);
};

// Hint texts that belong to ONE item of the index built by learningGrade.itemIndex (same shapes as resolveItem).
export function hintsOfHit(hit, id) {
  if (!hit) return [];
  if (hit.leaf) return hintsOf(hit.leaf);
  const c = hit.container; if (!c) return [];
  const cid = hit.containerId, num = Number(String(id).slice(String(cid).length + 1));
  if (Array.isArray(c.blanks)) return hintsOf(c.blanks.find((x) => x.num === num));
  if (Array.isArray(c.questions)) return hintsOf(c.questions.find((x) => x && x.id === id));
  if (Array.isArray(c.items)) return hintsOf(c.items.find((x) => x && (x.id === id || (x.num === num && String(id) === cid + "_" + num))));
  return [];
}
export const hintHashesOf = (hit, id) => [...new Set(hintsOfHit(hit, id).map(hintHash))];

// Set of every bank hint hash for an index (lazy per index object).
const known = new WeakMap();
export function knownHintHashes(byId) {
  let s = known.get(byId);
  if (!s) { s = new Set(); for (const id of Object.keys(byId)) for (const h of hintHashesOf(byId[id], id)) s.add(h); known.set(byId, s); }
  return s;
}

// Which of these candidates had a hint revealed? Reads ONLY the server record. cands: [{ itemId, hit }]. -> Set of itemIds.
// Fails closed for pricing: on a read error it throws, so no thread is awarded on a guess.
export async function hintedItemIds(admin, userId, cands) {
  const perItem = new Map(cands.map((c) => [c.itemId, hintHashesOf(c.hit, c.itemId)]));
  const all = [...new Set([...perItem.values()].flat())];
  if (!all.length) return new Set();
  const { data, error } = await admin.from("clewquest_hint_events").select("hint_hash").eq("user_id", userId).in("hint_hash", all);
  if (error) throw new Error("hint lookup failed");
  const seen = new Set((data || []).map((r) => r.hint_hash));
  return new Set([...perItem].filter(([, hs]) => hs.some((h) => seen.has(h))).map(([id]) => id));
}
