// Create a student: auth user + profile + parent_child link, with full rollback (auth user deleted) on ANY failure.
// Pure (admin client is injected) so it can be unit-tested with a fake.
import { kidEmail } from "./config.js";

export async function createStudent(admin, { username, password, name, firstName, lastName, grade, school, parentId, appMetadata, extra }) {
  const { data, error } = await admin.auth.admin.createUser({
    email: kidEmail(username), password, email_confirm: true,
    user_metadata: { role: "student" },
    ...(appMetadata ? { app_metadata: appMetadata } : {}),
  });
  if (error || !data?.user) return { error: error?.message || "create failed", status: /registered|exists/i.test(error?.message || "") ? 409 : 500 };
  const id = data.user.id;
  const rollback = async () => { // full rollback: the half-made profile row (if any), then the auth user
    try { await admin.from("profiles").delete().eq("id", id); } catch {}
    try { await admin.auth.admin.deleteUser(id); } catch {}
  };
  const row = { id, role: "student", username, display_name: name, grade: grade || null, school: school || null };
  let ins = await admin.from("profiles").insert(firstName || lastName ? { ...row, first_name: firstName || null, last_name: lastName || null } : row);
  // subjects / mother_tongue (additive migration 20261206000000): saved with a follow-up update so a missing column never blocks sign-up.
  const afterInsert = async () => { if (extra && Object.keys(extra).length) await admin.from("profiles").update(extra).eq("id", id).then(() => {}, () => {}); };
  // first_name/last_name come from an additive migration applied by hand; if it is not applied yet, store the full name only.
  if (ins.error && ins.error.code !== "23505" && /first_name|last_name/.test(ins.error.message || "")) ins = await admin.from("profiles").insert(row);
  if (ins.error) { await rollback(); return { error: ins.error.code === "23505" ? "username taken" : "profile failed", status: ins.error.code === "23505" ? 409 : 500 }; }
  if (parentId) {
    const link = await admin.from("parent_child").insert({ parent_id: parentId, child_id: id });
    if (link.error) { await rollback(); return { error: "link failed", status: 500 }; }
  }
  await afterInsert();
  return { id };
}

