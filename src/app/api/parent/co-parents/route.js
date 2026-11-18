// Guardian INVITES (replaces instant linking). Inviting a parent creates a pending invite; access is granted
// only when that parent logs in with the invited (confirmed) email and accepts. Invites expire after 7 days.
// A pending invite lives in guardian_invites, NOT parent_child, so it grants no access anywhere (RLS or API).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const nowIso = () => new Date().toISOString();

async function guard() {
  if (!serverAuthEnabled()) return { err: jerr("server auth disabled", 404) };
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return { err: jerr("parent login required", 401) };
  return { me };
}

// Invites I sent (pending) and invites waiting for me (pending, unexpired, matching my confirmed login email).
export async function GET() {
  const g = await guard(); if (g.err) return g.err;
  const admin = adminClient();
  const { me } = g;
  const sentQ = await admin.from("guardian_invites").select("id,child_id,email,created_at,expires_at")
    .eq("inviter_id", me.profile.id).eq("status", "pending").gt("expires_at", nowIso()).order("created_at", { ascending: false });
  const myEmail = me.user.email_confirmed_at ? String(me.user.email || "").toLowerCase() : null;
  const recvQ = myEmail
    ? await admin.from("guardian_invites").select("id,child_id,inviter_id,created_at,expires_at")
        .eq("status", "pending").gt("expires_at", nowIso()).ilike("email", myEmail.replace(/[%_\\]/g, "\\$&")).neq("inviter_id", me.profile.id)
    : { data: [] };
  const ids = [...new Set([...(sentQ.data || []).map(i => i.child_id), ...(recvQ.data || []).flatMap(i => [i.child_id, i.inviter_id])])];
  const { data: profs } = ids.length ? await admin.from("profiles").select("id,display_name").in("id", ids) : { data: [] };
  const nm = Object.fromEntries((profs || []).map(p => [p.id, p.display_name]));
  return jok({
    sent: (sentQ.data || []).map(i => ({ id: i.id, email: i.email, childName: nm[i.child_id] || "", expiresAt: i.expires_at })),
    received: (recvQ.data || []).map(i => ({ id: i.id, childName: nm[i.child_id] || "", inviterName: nm[i.inviter_id] || "", expiresAt: i.expires_at })),
  });
}

// Body: { email, childId } -> creates a pending invite. Same response whether or not the email has an account.
export async function POST(request) {
  const g = await guard(); if (g.err) return g.err;
  const { me } = g;
  if (!rateLimit("coparent:" + me.profile.id, { max: 10, windowMs: 3600_000 })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const childId = String(b.childId || "");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  const admin = adminClient();
  const { data: mine } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", childId).maybeSingle();
  if (!mine) return jerr("not your child", 403);
  if (email !== String(me.profile.email || "").toLowerCase()) {
    // Retire an expired pending invite for the same child+email so a fresh one can be created (rows are kept, not deleted).
    await admin.from("guardian_invites").update({ status: "revoked", revoked_at: nowIso() })
      .eq("child_id", childId).ilike("email", email.replace(/[%_\\]/g, "\\$&")).eq("status", "pending").lte("expires_at", nowIso());
    const ins = await admin.from("guardian_invites").insert({ child_id: childId, inviter_id: me.profile.id, email });
    if (ins.error && ins.error.code !== "23505") return jerr("could not create invite", 500); // 23505 = already pending
    // TODO(owner): also email the invitee ("X invited you to follow <child>; log in or sign up with this address to accept").
    //              For now the invitee sees the invite on their parent dashboard after logging in / signing up with this email.
  }
  return jok({ message: "Invite created (valid for 7 days). The other parent must log in or sign up with this email and accept it before they get access." });
}
