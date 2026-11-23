// ClewQuest: a linked parent sets a new picture code for their child (parent_child link). Also switches a typed-password child to
// pictures once the parent has confirmed ({ confirmSwitch: true }). Reset, never reveal. Flag off => 404.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { loginGuard } from "@/lib/clewquest/pictureServer";
import { resetSignin } from "@/lib/clewquest/resetSignin";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("cqreset:" + me.profile.id, { max: 20, windowMs: 3600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const admin = adminClient();
  const r = await resetSignin({
    admin, parentId: me.profile.id, childId: String(b.childId || ""), seq: normalizeSequence(b.sequence),
    confirmSwitch: b.confirmSwitch === true, pepper: process.env.CLEWQUEST_PICTURE_PEPPER,
    clearLockout: (u) => loginGuard.reset(admin, u),
  });
  if (r.status !== 200) return jerr(r.error, r.status);
  return jok({ username: r.username, name: r.name, switched: r.switched });
}
