// ClewQuest: the app reports that a hint was shown. The server stores a hash of the hint text (only if it is a real bank hint) so the
// award route can pay 0.5 instead of 1 from THIS record, never from a client flag. Fire-and-forget from the browser. Flag off => 404.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { hintHash, knownHintHashes, normHint } from "@/lib/clewquest/hintServer";
import { bankFor, SUBJECT_KEYS } from "@/lib/clewquest/banks";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`cqh:${me.profile.id}:${clientIp(request)}`, { max: 120, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const text = normHint(b.text);
  if (!text) return jok({ recorded: false });
  const h = hintHash(text);
  if (!SUBJECT_KEYS.some((s) => knownHintHashes(bankFor(s)).has(h))) return jok({ recorded: false }); // not a bank hint (e.g. a letter-reveal hint)
  const { error } = await adminClient().from("clewquest_hint_events").upsert({ user_id: me.profile.id, hint_hash: h }, { onConflict: "user_id,hint_hash", ignoreDuplicates: true });
  if (error) return jerr("could not record", 500);
  return jok({ recorded: true });
}
