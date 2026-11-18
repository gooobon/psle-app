import { sessionClient, adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  const name = String(b.name || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  if (password.length < 8) return jerr("password must be at least 8 characters", 400);
  if (!name || name.length > 80) return jerr("name required", 400);

  const sb = await sessionClient();
  const { data, error } = await sb.auth.signUp({ email, password, options: { data: { role: "parent" } } });
  if (error || !data?.user) return jerr(error?.message || "sign-up failed", 400);
  // Supabase returns an obfuscated user (no identities) when the email is already registered.
  if (!data.user.identities?.length) return jerr("could not sign up with this email", 400);

  const admin = adminClient();
  const id = data.user.id;
  const p = await admin.from("profiles").insert({ id, role: "parent", display_name: name }).select().single();
  if (p.error) return jerr("profile failed", 500);
  await admin.from("parent_settings").insert({ parent_id: id, alert_email: email }); // daily target defaults to 1 set/subject
  // TODO(owner): if "Confirm email" is on in Supabase Auth settings, no session is returned until the link is clicked.
  if (!data.session) return jok({ needsConfirmation: true });
  return jok({ profile: publicProfile(p.data), children: [] });
}
