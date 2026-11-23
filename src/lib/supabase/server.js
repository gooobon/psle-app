// Server-only helpers. SUPABASE_SERVICE_ROLE_KEY must never be imported from client code.
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { SERVER_AUTH, kidEmail } from "./config";

export function serverAuthEnabled() {
  return SERVER_AUTH && !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

// Cookie-session client (anon key; RLS applies as the logged-in user).
export async function sessionClient() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {} },
    },
  });
}

// Service-role client: bypasses RLS. Use only after verifying the caller in the route.
export function adminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export const noStore = { "Cache-Control": "no-store" };
export const jerr = (error, status) => Response.json({ error }, { status, headers: noStore });
export const jok = (body = {}) => Response.json({ ok: true, ...body }, { headers: noStore });

export async function readJson(request) { try { return (await request.json()) || {}; } catch { return {}; } }

// Returns { user, profile } for a logged-in caller, or null.
export async function currentUser() {
  const sb = await sessionClient();
  const { data } = await sb.auth.getUser();
  if (!data?.user) return null;
  const { data: profile } = await adminClient().from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  if (!profile) return null;
  return { user: data.user, profile };
}

export function publicProfile(p) {
  return { id: p.id, role: p.role, username: p.username, name: p.display_name, grade: p.grade, school: p.school };
}

// Create student auth user + profile (+ optional parent link). Rolls back the auth user on failure.
// appMetadata (optional, additive): server-only flags set at creation, e.g. ClewQuest's { picture_code: true }.
export async function createStudent(admin, { username, password, name, grade, school, parentId, appMetadata }) {
  const { data, error } = await admin.auth.admin.createUser({
    email: kidEmail(username), password, email_confirm: true,
    user_metadata: { role: "student" },
    ...(appMetadata ? { app_metadata: appMetadata } : {}),
  });
  if (error || !data?.user) return { error: error?.message || "create failed", status: /registered|exists/i.test(error?.message || "") ? 409 : 500 };
  const id = data.user.id;
  const rollback = async () => { await admin.auth.admin.deleteUser(id).catch(() => {}); };
  const ins = await admin.from("profiles").insert({ id, role: "student", username, display_name: name, grade: grade || null, school: school || null });
  if (ins.error) { await rollback(); return { error: ins.error.code === "23505" ? "username taken" : "profile failed", status: ins.error.code === "23505" ? 409 : 500 }; }
  if (parentId) {
    const link = await admin.from("parent_child").insert({ parent_id: parentId, child_id: id });
    if (link.error) { await rollback(); return { error: "link failed", status: 500 }; }
  }
  return { id };
}
