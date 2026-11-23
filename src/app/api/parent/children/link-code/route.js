// ClewQuest: a logged-in parent links a picture-code child with the child's username + the one-time 6-digit link code.
// The parent proves themselves with their own password session; the child never shares a password or picture code. Flag off => 404.
import { adminClient, currentUser, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { normUsername, usernameIlike } from "@/lib/supabase/config";
import { rateLimit } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { usesPictureCode } from "@/lib/clewquest/pictureFlag";
import { redeemLinkCode } from "@/lib/clewquest/linkCode";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("linkcode:" + me.profile.id, { max: 20, windowMs: 3600_000 })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const admin = adminClient();
  let kid = null;
  const r = await redeemLinkCode({
    admin, username: normUsername(b.username), code: String(b.code || "").trim(), pepper: process.env.CLEWQUEST_PICTURE_PEPPER,
    loadChild: async (u) => {
      const { data, error } = await admin.from("profiles").select("*").ilike("username", usernameIlike(u)).eq("role", "student").maybeSingle();
      if (error) throw new Error("lookup failed");
      if (!data) return null;
      const au = await admin.auth.admin.getUserById(data.id);
      if (au.error) throw new Error("lookup failed");
      if (!au.data?.user || !usesPictureCode(au.data.user)) return null; // password children link with their password instead
      kid = data;
      return { id: data.id };
    },
    link: async (childId) => admin.from("parent_child").upsert({ parent_id: me.profile.id, child_id: childId }, { onConflict: "parent_id,child_id", ignoreDuplicates: true }),
  });
  if (r.status !== 200) return jerr(r.error, r.status);
  return jok({ child: publicProfile(kid) });
}
