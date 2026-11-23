// Onboarding self-test: pure functions + fakes only. NO network, never touches Supabase (guard below).
// Covers: create-child rollback at every failure point, reset sign-in (link check, typed->picture switch, lockout cleared), removed routes.
import fs from "fs"; import path from "path"; import { fileURLToPath } from "url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROD_REF = "zehnulwvysvnsshunxzr";
if ([process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_URL, process.env.E2E_API_URL, process.env.E2E_DB_URL].join(" ").includes(PROD_REF)) throw new Error("Refusing to run: a Supabase URL points at the production project.");
let pass = 0, fail = 0;
const t = (n, ok, x) => { if (ok) pass++; else { fail++; console.log("FAIL", n, x === undefined ? "" : JSON.stringify(x)); } };

const { createStudent } = await import("../src/lib/supabase/createStudent.js");
const { resetSignin } = await import("../src/lib/clewquest/resetSignin.js");
const { CODE_LENGTH, normalizeSequence } = await import("../src/lib/clewquest/pictures.js");
t("CODE_LENGTH stays 4", CODE_LENGTH === 4);

// ---- fake admin client ----
function fakeAdmin({ failCreate, failProfile, failLink, link = true, kid, user } = {}) {
  const log = { created: [], deleted: [], profileDeleted: [], updated: [], linked: [] };
  const admin = {
    log,
    auth: { admin: {
      createUser: async (a) => failCreate ? { error: { message: failCreate } } : (log.created.push(a), { data: { user: { id: "u1" } } }),
      deleteUser: async (id) => { log.deleted.push(id); return {}; },
      getUserById: async () => (user === null ? { error: { message: "x" } } : { data: { user: user || { app_metadata: { picture_code: true } } } }),
      updateUserById: async (id, a) => { log.updated.push({ id, a }); return {}; },
    } },
    from(tbl) {
      return {
        insert: async (row) => {
          if (tbl === "profiles") return failProfile ? { error: { code: failProfile, message: "boom" } } : {};
          if (tbl === "parent_child") { if (failLink) return { error: { message: "link" } }; log.linked.push(row); return {}; }
          return {};
        },
        update: () => ({ eq: async () => ({}) }),
        delete: () => ({ eq: async (c, id) => { log.profileDeleted.push([tbl, id]); return {}; } }),
        select: () => { const q = { eq: () => q, maybeSingle: async () => (tbl === "parent_child" ? { data: link ? { child_id: "c1" } : null } : { data: kid === undefined ? { username: "Aria01", role: "student", display_name: "Aria" } : kid }) }; return q; },
      };
    },
  };
  return admin;
}
const base = { username: "Aria01", password: "pw", name: "Aria", firstName: "Aria", lastName: "Tan", grade: "P3", school: "", parentId: "p1", appMetadata: { picture_code: true } };

let a = fakeAdmin(); let r = await createStudent(a, base);
t("create ok: user + link, nothing rolled back", r.id === "u1" && a.log.linked.length === 1 && a.log.deleted.length === 0);
t("create sets picture_code at creation", a.log.created[0].app_metadata.picture_code === true);
a = fakeAdmin({ failCreate: "User already registered" }); r = await createStudent(a, base);
t("auth create fails -> 409 and nothing left", r.status === 409 && a.log.deleted.length === 0 && a.log.linked.length === 0);
a = fakeAdmin({ failProfile: "23505" }); r = await createStudent(a, base);
t("profile 23505 -> Taken (409), auth user rolled back", r.status === 409 && r.error === "username taken" && a.log.deleted.join() === "u1" && a.log.linked.length === 0);
a = fakeAdmin({ failProfile: "XX000" }); r = await createStudent(a, base);
t("profile error -> 500, auth user rolled back", r.status === 500 && a.log.deleted.join() === "u1");
a = fakeAdmin({ failLink: true }); r = await createStudent(a, base);
t("link fails -> 500, profile row AND auth user rolled back", r.status === 500 && a.log.deleted.join() === "u1" && a.log.profileDeleted.length === 1);

// ---- reset sign-in ----
const seq = normalizeSequence([0, 3, 8, 3]), pepper = "test-pepper-0123456789-abcdef";
t("normalizeSequence accepts 4 and rejects 3", !!seq && normalizeSequence([0, 3, 8]) === null);
let cleared = []; const clear = async (u) => { cleared.push(u); return {}; };
a = fakeAdmin({ link: false }); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq, pepper, clearLockout: clear });
t("no parent_child link -> 403, nothing changed", r.status === 403 && a.log.updated.length === 0 && cleared.length === 0);
a = fakeAdmin({ kid: null }); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq, pepper, clearLockout: clear });
t("child missing -> 404", r.status === 404 && a.log.updated.length === 0);
a = fakeAdmin(); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq: null, pepper, clearLockout: clear });
t("bad sequence -> 400", r.status === 400);
a = fakeAdmin(); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq, pepper, clearLockout: clear });
t("picture child reset ok, flag stays set, lockout cleared", r.status === 200 && a.log.updated[0].a.app_metadata.picture_code === true && cleared.join() === "Aria01" && !r.switched);
const pw1 = a.log.updated[0].a.password;
cleared = []; a = fakeAdmin({ user: { app_metadata: {}, user_metadata: { picture_code: true } } }); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq, pepper, clearLockout: clear });
t("typed child WITHOUT confirm -> 409 needsConfirm, nothing changed (user_metadata is never trusted)", r.status === 409 && r.needsConfirm && a.log.updated.length === 0 && cleared.length === 0);
a = fakeAdmin({ user: { app_metadata: {} } }); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq, confirmSwitch: true, pepper, clearLockout: clear });
t("typed child WITH confirm -> becomes a picture-code account, lockout cleared", r.status === 200 && r.switched && a.log.updated[0].a.app_metadata.picture_code === true && cleared.join() === "Aria01");
t("same derivation for picture and typed children", a.log.updated[0].a.password === pw1 && typeof pw1 === "string" && pw1.length > 20);
a = fakeAdmin(); r = await resetSignin({ admin: a, parentId: "p1", childId: "c1", seq, pepper: "", clearLockout: clear });
t("no pepper -> 503, nothing changed", r.status === 503 && a.log.updated.length === 0);
t("password is not the raw sequence", !String(pw1).includes(String(seq)) && !String(pw1).includes("0383"));

// ---- removed routes are 404 stubs; removed UI is gone ----
for (const f of ["clewquest/link-code", "parent/children/link-code", "parent/children/link", "auth/student/picture-signup", "parent/children/check-name", "parent/co-parents", "parent/co-parents/accept", "parent/co-parents/revoke"]) {
  const s = fs.readFileSync(path.join(root, "src/app/api", f, "route.js"), "utf8");
  t(`route ${f} always 404`, /jerr\("not found", 404\)/.test(s) && /export const POST = gone/.test(s) && !/adminClient|currentUser/.test(s));
}
const pc = fs.readFileSync(path.join(root, "src/app/api/parent/children/route.js"), "utf8");
t("typed-password POST /api/parent/children is 404", /export async function POST\(\) \{ return jerr\("not found", 404\); \}/.test(pc));
for (const f of ["src/components/clewquest/LinkCode.js", "src/components/clewquest/ParentPictureChild.js"]) t(`${f} deleted`, !fs.existsSync(path.join(root, f)));
const ui = ["src/components/ParentDashboard.js", "src/components/clewquest/ClewQuestStudent.js", "src/components/clewquest/AuthScreens.js", "src/app/ClaudeApp.js"].map((f) => fs.readFileSync(path.join(root, f), "utf8")).join("\n");
for (const bad of ["Link a parent", "Link with code", "Invite another parent", "Tell your parent these 6", "Link existing child", "Create child account", "New student", "SignupChooser"]) t(`UI text gone: ${bad}`, !ui.includes(bad));

console.log(`onboarding_selftest: ${pass} pass / ${fail} fail`);
process.exit(fail ? 1 : 0);
