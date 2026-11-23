// ClewQuest Phase 1 self-test (spec section 5). Pure functions and mocks only: NO network, NEVER touches Supabase.
// Run: node tools/clewquest_selftest.mjs
import fs from "fs"; import path from "path"; import { fileURLToPath } from "url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROD_REF = "zehnulwvysvnsshunxzr";

// Safety guard: abort if any Supabase URL/key in the environment points at production.
export function assertNotProd(env = process.env) {
  const blob = [env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_URL, env.E2E_API_URL, env.E2E_DB_URL, env.SUPABASE_SERVICE_ROLE_KEY].join(" ");
  if (blob.includes(PROD_REF)) throw new Error("Refusing to run: a Supabase URL points at the production project.");
}
assertNotProd();

let pass = 0, fail = 0;
const t = (name, ok, extra) => { if (ok) pass++; else { fail++; console.log("FAIL", name, extra === undefined ? "" : JSON.stringify(extra)); } };
const eq = (name, a, b) => t(name, JSON.stringify(a) === JSON.stringify(b), { got: a, want: b });

const { CLEWQUEST, clewquestEnabled } = await import("../src/lib/clewquest/config.js");
const L = await import("../src/lib/clewquest/logic.js");
const P = await import("../src/lib/clewquest/pictures.js");
const PS = await import("../src/lib/clewquest/pictureServer.js");
const { awardThread } = await import("../src/lib/clewquest/award.js");
const { reportThread } = await import("../src/lib/clewquest/client.js");

// 0. the safety guard itself
let threw = false; try { assertNotProd({ NEXT_PUBLIC_SUPABASE_URL: `https://${PROD_REF}.supabase.co` }); } catch { threw = true; }
t("guard aborts on the production ref", threw);
t("guard passes a local URL", (() => { try { assertNotProd({ NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321" }); return true; } catch { return false; } })());

// 1. stage thresholds (never 6+)
for (const [n, s] of [[0, 1], [24.5, 1], [25, 2], [99.5, 2], [100, 3], [299.5, 3], [300, 4], [699.5, 4], [700, 5], [10000, 5], [-3, 1], [NaN, 1], [undefined, 1]]) eq(`stage(${n})`, L.stageFromTotal(n), s);
eq("progress 42 targets stage 3", [L.progressToNext(42).stage, L.progressToNext(42).need], [3, 100]);
eq("no progress target at the Phase 1 cap", L.progressToNext(700), null);

// 2. earn amounts
eq("first-try correct = 1", L.earnAmount({ correct: true, usedHint: false }), 1);
eq("after hint = 0.5", L.earnAmount({ correct: true, usedHint: true }), 0.5);
eq("wrong = 0 (hinted)", L.earnAmount({ correct: false, usedHint: true }), 0);
eq("wrong = 0", L.earnAmount({ correct: false, usedHint: false }), 0);
eq("non-boolean correct = 0", L.earnAmount({ correct: "yes", usedHint: false }), 0);

// 3. ledger idempotency (pure + via awardThread with a mock Supabase client)
let rows = [], r;
const a = { user_id: "u1", subject: "english", amount: 1, source_ref: L.sourceRefOf("English", "q1") };
r = L.applyAward(rows, a); rows = r.rows; eq("first award adds 1", r.added, 1);
r = L.applyAward(rows, a); rows = r.rows; eq("same source_ref twice adds 0", r.added, 0);
eq("ledger has one row", rows.length, 1);
eq("zero amounts are never recorded", L.applyAward(rows, { ...a, source_ref: "x", amount: 0 }).added, 0);
eq("totals by subject", L.totalsBySubject([{ subject: "english", amount: 1 }, { subject: "english", amount: 0.5 }, { subject: "chinese", amount: 1 }]), { total: 2.5, english: 1.5, chinese: 1 });

function mockAdmin() {
  const ledger = new Map();
  return { ledger, from(table) { return { upsert(row, opts) { return { select: async () => {
    if (table !== "clewquest_thread_ledger") return { data: [], error: null };
    const k = row.user_id + "|" + row.source_ref;
    if (ledger.has(k)) return { data: opts.ignoreDuplicates ? [] : [{ id: 1 }], error: null };
    ledger.set(k, row); return { data: [{ id: ledger.size }], error: null };
  } }; } }; } };
}
process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED = "true";
{
  const admin = mockAdmin();
  const args = { admin, userId: "u1", grade: "P3", subject: "English", sourceRef: "english|q1", usedHint: false };
  eq("awardThread first call = 1", (await awardThread(args)).awarded, 1);
  eq("awardThread replay = 0", (await awardThread(args)).awarded, 0);
  eq("awardThread after hint = 0.5", (await awardThread({ ...args, sourceRef: "english|q2", usedHint: true })).awarded, 0.5);
  eq("ledger rows", admin.ledger.size, 2);
  eq("ledger stores lower-case subject and a reason", [...admin.ledger.values()].map((x) => [x.subject, x.reason]), [["english", "correct_first_try"], ["english", "correct_after_hint"]]);
}

// 4. config validation
eq("default config is valid", L.validateConfig(), []);
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/clewquest/manifest.json"), "utf8"));
eq("every hair has a thumb and a stage-5 asset", L.validateConfig(CLEWQUEST, new Set(Object.keys(manifest.assets))), []);
const clone = () => JSON.parse(JSON.stringify(CLEWQUEST));
{ const c = clone(); c.colours[1].default = true; t("two default colours rejected", L.validateConfig(c).length > 0); }
{ const c = clone(); c.hair[1].default = true; t("two default boy hairs rejected", L.validateConfig(c).length > 0); }
{ const c = clone(); c.hair[1].key = c.hair[0].key; t("duplicate hair keys rejected", L.validateConfig(c).length > 0); }
{ const c = clone(); c.stages.find((s) => s.stage === 6).reachable = true; c.stages.find((s) => s.stage === 6).minThread = 5000; t("reachable stage 6 rejected", L.validateConfig(c).length > 0); }
{ const c = clone(); c.economy.enabled = true; t("economy enabled rejected", L.validateConfig(c).length > 0); }
eq("exactly 10 hairstyles, 6 colours", [CLEWQUEST.hair.length, CLEWQUEST.colours.length], [10, 6]);
eq("only English and Chinese are open", L.openSubjects("P3"), ["english", "chinese"]);
eq("math and science are coming soon", [CLEWQUEST.grades.P3.subjects.math.status, CLEWQUEST.grades.P3.subjects.science.status], ["coming_soon", "coming_soon"]);
eq("stage 5 asset falls back to crimson art", L.stageAssetKey(5, "girl", "ariadne-buns", "egyptian-blue", new Set(Object.keys(manifest.assets))), "characters/stage5-girl-ariadne-buns");
eq("stage 1-4 art keys", [1, 2, 3, 4].map((s) => L.stageAssetKey(s, "boy", "apollo-curls", "ariadne-crimson")), ["stages/stage-1", "stages/stage-2", "stages/stage-3", "stages/stage-4"]);
eq("character validation accepts a good look", L.validateCharacter({ gender: "girl", hair_key: "ariadne-buns", colour_key: "ariadne-crimson", nickname: "Star 7" }).ok, true);
eq("a boy cannot take a girl's hair", L.validateCharacter({ gender: "boy", hair_key: "ariadne-buns", colour_key: "ariadne-crimson" }).ok, false);
eq("hair card tap sets gender and hair (same as Shuffle)", /function pickHair\(h\) \{ setGender\(h\.gender\); setHair\(h\.key\); \}/.test(fs.readFileSync(path.join(root, "src/components/clewquest/CharacterBuilder.js"), "utf8")), true);
eq("nickname length is 2-24 (client = server = DB)", [L.cleanNickname("a").ok, L.cleanNickname("a".repeat(24)).ok, L.cleanNickname("a".repeat(25)).ok, L.cleanNickname("ab").ok, L.cleanNickname("").value], [false, true, false, true, null]);
eq("nickname is English letters/numbers/spaces only", L.cleanNickname("ab-c!").ok, false);
eq("nickname profanity filter", L.cleanNickname("shit head").ok, false);

// 5. picture code
const PEPPER = "test-pepper-0123456789-abcdef";
eq("sequence normalises", P.normalizeSequence([3, 1, 4, 7]), "3-1-4-7");
eq("sequence accepts keys", P.normalizeSequence(["owl", "trident", "harp", "bolt"]), "0-1-2-3");
eq("short sequence rejected", P.normalizeSequence([1, 2, 3]), null);
eq("out-of-range rejected", P.normalizeSequence([1, 2, 3, 9]), null);
eq("9 pictures", P.PICTURES.length, 9);
const p1 = PS.derivePicturePassword(PEPPER, "Amy_1 ", "3-1-4-7");
eq("derivation is deterministic and normalises the username", p1, PS.derivePicturePassword(PEPPER, "amy_1", "3-1-4-7"));
t("derivation differs per username", p1 !== PS.derivePicturePassword(PEPPER, "amy_2", "3-1-4-7"));
t("derivation differs per sequence", p1 !== PS.derivePicturePassword(PEPPER, "amy_1", "3-1-4-8"));
t("derivation differs per pepper", p1 !== PS.derivePicturePassword(PEPPER + "x", "amy_1", "3-1-4-7"));
t("derived password never contains the raw sequence", !p1.includes("3-1-4-7") && /^[0-9a-f]{64}$/.test(p1));
let noPepper = false; try { PS.derivePicturePassword("", "amy_1", "3-1-4-7"); } catch { noPepper = true; }
t("missing pepper throws (no weak default)", noPepper);
{ // first layer (lib/rateLimit.js) through the real loginGuard: counts every attempt BEFORE the sign-in
  const okDb = { async rpc(name) { return { data: name === "clewquest_login_try" ? true : null, error: null }; } };
  const u = "lock_" + Date.now(); const seen = [];
  for (let i = 0; i < 6; i++) seen.push((await PS.loginGuard.begin(okDb, u, "ip")).locked);
  eq("in-memory layer: 5 attempts pass, the 6th is refused", seen, [false, false, false, false, false, true]);
  t("in-memory layer: another username is unaffected", !(await PS.loginGuard.begin(okDb, u + "x", "ip")).locked);
  t("in-memory layer: case-insensitive", (await PS.loginGuard.begin(okDb, u.toUpperCase(), "ip")).locked);
  await PS.loginGuard.reset(okDb, u);
  t("in-memory layer: a success clears it", !(await PS.loginGuard.begin(okDb, u, "ip")).locked); }

// 6. flag off
delete process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED;
eq("flag defaults off", clewquestEnabled(), false);
{ const admin = mockAdmin(); const r2 = await awardThread({ admin, userId: "u1", grade: "P3", subject: "english", sourceRef: "english|q9", usedHint: false });
  eq("awardThread is a no-op with the flag off", [r2.awarded, admin.ledger.size], [0, 0]); }
{ let called = false; const f = globalThis.fetch; globalThis.fetch = () => { called = true; return Promise.reject(new Error("no")); };
  globalThis.window = { dispatchEvent() {} };
  reportThread("English", [{ id: "x", userAnswer: 1 }]);
  delete globalThis.window; globalThis.fetch = f; t("client hook sends nothing with the flag off", !called); }
const apiDirs = ["src/app/api/clewquest", "src/app/api/auth/student/picture-login", "src/app/api/auth/student/picture-signup"];
const routeFiles = []; (function walk(d) { for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name === "route.js") routeFiles.push(p); } })("src/app/api/clewquest");
routeFiles.push("src/app/api/auth/student/picture-login/route.js");
const REMOVED_ROUTES = new Set(["src/app/api/clewquest/link-code/route.js"]); // always-404 stubs (see tools/onboarding_selftest.mjs)
for (const f of routeFiles.filter((x) => !REMOVED_ROUTES.has(x))) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  const fns = src.match(/export async function (GET|POST|PUT)\([^)]*\) \{\n([^\n]*)/g) || [];
  t(`${f}: every handler starts with the flag guard`, fns.length > 0 && fns.every((x) => /clewquestRoutesOn\(\)\) return notFound\(\)/.test(x)), fns);
}
{ const g = fs.readFileSync(path.join(root, "src/lib/clewquest/guard.js"), "utf8"); t("guard requires the flag and server auth", /clewquestEnabled\(\) && serverAuthEnabled\(\)/.test(g)); }
{ const app = fs.readFileSync(path.join(root, "src/app/ClaudeApp.js"), "utf8"); t("ClewQuest shell is gated by the flag", /const CQ_ON = clewquestEnabled\(\) && SERVER_AUTH/.test(app) && /const cqOk = CQ_ON && typeof user\.serverId/.test(app)); }

// 7. no Hangul in ClewQuest code, assets list or rendered strings
const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;
const cqFiles = [];
(function walk(d) { for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(js|jsx|ts|json|sql|md)$/.test(e.name)) cqFiles.push(p); } })("src/lib/clewquest");
for (const d of ["src/components/clewquest", "src/app/api/clewquest"]) (function walk(dd) { for (const e of fs.readdirSync(path.join(root, dd), { withFileTypes: true })) { const p = path.join(dd, e.name); if (e.isDirectory()) walk(p); else cqFiles.push(p); } })(d);
cqFiles.push("public/clewquest/manifest.json", "supabase/migrations/20261203000000_clewquest_phase1.sql");
for (const f of cqFiles) t(`no Hangul in ${f}`, !HANGUL.test(fs.readFileSync(path.join(root, f), "utf8")));
{ const names = []; (function walk(d) { for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else names.push(p); } })("public/clewquest");
  t("no Hangul in ClewQuest asset file names", !names.some((n) => HANGUL.test(n))); }
{ // whole src/ tree (same pattern as tools/no_korean_selftest.mjs, which strips comments; here only files we own are strict)
  const bad = []; (function walk(d) { for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(js|jsx|ts|tsx|mjs)$/.test(e.name) && /clewquest|ClewQuest/i.test(fs.readFileSync(path.join(root, p), "utf8")) && HANGUL.test(fs.readFileSync(path.join(root, p), "utf8").replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, ""))) bad.push(p); } })("src");
  eq("no Hangul in any src file that references ClewQuest", bad, []); }

// 8. solve screens render no ClewQuest elements
const SOLVE = ["ExamSession.js", "QuizEngine.js", "EnglishSession.js", "ChineseSession.js", "PaperExam.js", "VocabQuiz.js", "OrderTap.js", "SplitViewLayout.js", "ReviewRounds.js", "GeniusAdaptiveEngine.jsx", "EnReviewGate.js", "ZhReviewGate.js", "ResultScreen.js", "ZhWa1ResultScreen.js"];
for (const f of SOLVE) { const src = fs.readFileSync(path.join(root, "src/components", f), "utf8"); t(`${f} has no ClewQuest import or element`, !/clewquest|ClewQuest|cq-|Clew\b/.test(src)); }
{ const app = fs.readFileSync(path.join(root, "src/app/ClaudeApp.js"), "utf8");
  const uses = app.split("\n").filter((l) => /ClewQuestStudent|PictureLogin|PictureSignup|clewquestEnabled/.test(l)).length;
  t("ClaudeApp only wires ClewQuest at the auth screen and the student shell", uses <= 8, uses);
  t("no ClewQuest element is passed into any session component", !/<(ExamSessionScreen|ChineseApp|StudentResultScreen)[^>]*ClewQuest/.test(app)); }

// 9. existing data is never touched
for (const f of cqFiles.concat(["src/components/clewquest/ClewQuestStudent.js"]).filter((x) => /src\//.test(x) && /\.js$/.test(x))) {
  const src = fs.readFileSync(path.join(root, f), "utf8").replace(/\/\/[^\n]*/g, "");
  t(`${f} never touches genius_* storage`, !/genius_/.test(src));
}
{ const sql = fs.readFileSync(path.join(root, "supabase/migrations/20261203000000_clewquest_phase1.sql"), "utf8").replace(/--[^\n]*/g, "");
  t("migration has no drop table/column, truncate or rename", !/drop\s+(table|column|view|schema)|alter\s+table[^;]*rename|truncate\s+table|delete\s+from/i.test(sql)); }


// 10. durable lockout (mock DB that mirrors the SQL functions exactly; never touches Supabase). The SQL itself was also
// exercised against a real Postgres 16 (20 parallel clewquest_login_try calls -> exactly 5 allowed); see the PR notes.
{
  const { createLoginGuard } = await import("../src/lib/clewquest/lockout.js");
  const { runPictureLogin } = await import("../src/lib/clewquest/pictureLoginFlow.js");
  const clock = { t: 1_000_000 };
  const tick = () => new Promise((res) => setImmediate(res)); // every rpc is a real async round trip
  const mkDb = () => { const rows = new Map(), ipUsers = new Map(); const err = {}; return { rows, err,
    async rpc(name, a) {
      await tick();
      if (err[name]) return { data: null, error: { message: "down" } };
      const now = clock.t;
      if (name === "clewquest_login_status") { const r = rows.get(a.p_scope + "|" + a.p_key); return { data: r && r.locked_until && r.locked_until > now ? r.locked_until : null, error: null }; }
      if (name === "clewquest_login_try") { // one synchronous step = the row lock of insert ... on conflict do update
        const k = a.p_scope + "|" + a.p_key, r = rows.get(k); let n;
        if (!r) n = { fails: 1, window_start: now, locked_until: null };
        else if (r.locked_until && r.locked_until > now) n = r;
        else if (r.locked_until || r.window_start < now - a.p_window_secs * 1000) n = { fails: 1, window_start: now, locked_until: null };
        else n = { fails: r.fails + 1, window_start: r.window_start, locked_until: r.fails + 1 > a.p_max ? now + a.p_lock_secs * 1000 : null };
        rows.set(k, n); return { data: !(n.locked_until && n.locked_until > now), error: null };
      }
      if (name === "clewquest_login_ip_fail") {
        const m = ipUsers.get(a.p_ip) || new Map(); m.set(a.p_user, now); ipUsers.set(a.p_ip, m);
        const cnt = [...m.values()].filter((x) => x > now - a.p_window_secs * 1000).length;
        if (cnt > a.p_max) { const lock = now + a.p_lock_secs * 1000; rows.set("ip|" + a.p_ip, { fails: cnt, window_start: now, locked_until: lock }); return { data: lock, error: null }; }
        return { data: null, error: null };
      }
      if (name === "clewquest_login_fails") { const r = rows.get(a.p_scope + "|" + a.p_key); return { data: r && r.window_start >= now - a.p_window_secs * 1000 ? r.fails : 0, error: null }; }
      if (name === "clewquest_login_ok") { const k = a.p_scope + "|" + a.p_key; if (rows.has(k)) rows.set(k, { fails: 0, window_start: now, locked_until: null }); return { data: null, error: null }; }
      return { data: null, error: { message: "unknown rpc" } };
    } }; };
  const mkMem = () => { const m = new Map(); return { hit: (key, { max }) => { const n = m.get(key) || 0; if (n >= max) return false; m.set(key, n + 1); return true; }, clear: (key) => m.delete(key), m }; };
  const noMem = { hit: () => true, clear: () => {} }; // isolates the durable layer (as if every request hit a new instance)
  const login = (guard, db, username, ipHash, { correct = false, role = "student" } = {}, counter) => runPictureLogin({
    guard, admin: db, username, ipHash,
    signIn: async () => { if (counter) counter.n++; await tick(); return correct ? { user: { id: "u-" + username } } : { error: true }; },
    loadProfile: async () => ({ role }), signOut: async () => {},
  });

  // F1: 20 concurrent wrong codes for one username -> at most 5 reach signInWithPassword, on one or many instances
  { const db = mkDb(), c = { n: 0 };
    const res = await Promise.all(Array.from({ length: 20 }, () => login(createLoginGuard({ memory: noMem }), db, "kidpar", "ipP", {}, c)));
    t("F1: 20 concurrent wrong attempts on 20 instances -> <= 5 sign-in calls (durable layer)", c.n <= 5, c.n);
    eq("F1: all 20 answer 429 (15 refused, the <=5 real wrong codes already show the locked message)", res.filter((r) => r.status === 429).length, 20);
    t("F1: and the username is now locked for a later correct code too", (await login(createLoginGuard({ memory: noMem }), db, "kidpar", "ipQ", { correct: true })).status === 429); }
  { const db = mkDb(), c = { n: 0 }, G = createLoginGuard({ memory: mkMem() });
    await Promise.all(Array.from({ length: 20 }, () => login(G, db, "kidpar2", "ipP", {}, c)));
    t("F1: 20 concurrent wrong attempts on ONE instance -> <= 5 sign-in calls (both layers)", c.n <= 5, c.n); }

  const db = mkDb();
  const A = createLoginGuard({ memory: mkMem() }), B = createLoginGuard({ memory: mkMem() }); // two instances, shared database
  for (let i = 0; i < 3; i++) await login(A, db, "kid1", "ipA");
  for (let i = 0; i < 2; i++) await login(B, db, "KID1", "ipB");
  eq("3 attempts on A + 2 on B: the 6th is refused on BOTH instances", [(await login(A, db, "kid1", "ipC", { correct: true })).status, (await login(B, db, "kid1", "ipC", { correct: true })).status], [429, 429]);
  t("a different username is unaffected", (await login(A, db, "kid2", "ipC", { correct: true })).status === 200);
  clock.t += 14 * 60 * 1000;
  t("still locked 14 min later (fresh instance, empty memory)", (await login(createLoginGuard({ memory: mkMem() }), db, "kid1", "ipC", { correct: true })).status === 429);
  clock.t += 2 * 60 * 1000;
  t("unlocked after 15 min (fresh instance)", (await login(createLoginGuard({ memory: mkMem() }), db, "kid1", "ipC", { correct: true })).status === 200);
  // success resets the username counter
  for (let i = 0; i < 4; i++) await login(A, db, "kid3", "ipA");
  eq("success after 4 wrong codes signs in", (await login(A, db, "kid3", "ipA", { correct: true })).status, 200);
  for (let i = 0; i < 5; i++) await login(createLoginGuard({ memory: mkMem() }), db, "kid3", "ipA");
  t("success resets the counter: 5 more attempts are allowed afterwards", !db.rows.get("user|kid3").locked_until);
  // F8: per-IP cap counts DISTINCT failing usernames; 100 is fine, the 101st locks that IP only
  { const dbi = mkDb();
    for (let i = 0; i < 100; i++) await login(createLoginGuard({ memory: noMem }), dbi, "spray" + i, "ipSchool");
    for (let i = 0; i < 20; i++) await login(createLoginGuard({ memory: noMem }), dbi, "spray1", "ipSchool");
    t("F8: 100 distinct failing usernames (plus repeats) do not lock the IP", (await login(createLoginGuard({ memory: noMem }), dbi, "good_kid", "ipSchool", { correct: true })).status === 200);
    await login(createLoginGuard({ memory: noMem }), dbi, "spray_101", "ipSchool");
    eq("F8: the 101st distinct failing username locks that IP, not another IP", [(await login(createLoginGuard({ memory: noMem }), dbi, "other_kid", "ipSchool", { correct: true })).status, (await login(createLoginGuard({ memory: noMem }), dbi, "other_kid", "ipHome", { correct: true })).status], [429, 200]); }
  eq("config: 5 per username in 15 min, locked 15 min, 100 distinct usernames per IP", [CLEWQUEST.lockout.max, CLEWQUEST.lockout.windowMs, CLEWQUEST.lockout.lockMs, CLEWQUEST.lockout.ipMax], [5, 900000, 900000, 100]);
  // F2: fail closed on every lockout store error
  { const d = mkDb(), c = { n: 0 }; d.err.clewquest_login_try = true;
    const r = await login(createLoginGuard({ memory: mkMem() }), d, "kid4", "ipA", { correct: true }, c);
    eq("F2: attempt-counter error -> 503 and no sign-in call", [r.status, c.n], [503, 0]); }
  { const d = mkDb(); d.err.clewquest_login_status = true;
    eq("F2: IP status read error -> 503", (await login(createLoginGuard({ memory: mkMem() }), d, "kid5", "ipA", { correct: true })).status, 503); }
  { const d = mkDb(); d.err.clewquest_login_ip_fail = true;
    eq("F2: failure-record write error after a wrong code -> 503, never 401", (await login(createLoginGuard({ memory: mkMem() }), d, "kid6", "ipA")).status, 503);
    eq("F2: same for a non-student account", (await login(createLoginGuard({ memory: mkMem() }), d, "kid7", "ipA", { correct: true, role: "parent" })).status, 503); }
  { const d = mkDb(); eq("wrong code with a healthy store -> 401 with one generic message", [(await login(createLoginGuard({ memory: mkMem() }), d, "kid8", "ipA")).status, (await login(createLoginGuard({ memory: mkMem() }), d, "kid8", "ipA")).error], [401, "invalid credentials"]); }
  t("IP is stored as a keyed hash", PS.hashIp(PEPPER, "203.0.113.9") !== "203.0.113.9" && PS.hashIp(PEPPER, "203.0.113.9") === PS.hashIp(PEPPER, "203.0.113.9") && PS.hashIp(PEPPER, "1.1.1.1") !== PS.hashIp(PEPPER, "1.1.1.2"));
  { const route = fs.readFileSync(path.join(root, "src/app/api/auth/student/picture-login/route.js"), "utf8");
    t("picture-login runs the shared flow (count before sign-in, fail closed)", /runPictureLogin\(/.test(route) && /guard: loginGuard/.test(route) && !/loginGuard\.check/.test(route));
    const flow = fs.readFileSync(path.join(root, "src/lib/clewquest/pictureLoginFlow.js"), "utf8");
    t("flow: guard.begin comes before signIn", flow.indexOf("guard.begin") > 0 && flow.indexOf("guard.begin") < flow.indexOf("await signIn()")); }
  { const sql = fs.readFileSync(path.join(root, "supabase/migrations/20261203000000_clewquest_phase1.sql"), "utf8");
    const svcOnly = (fn) => new RegExp(`grant execute on function public\\.${fn}\\([^)]*\\) to service_role`).test(sql) && new RegExp(`revoke all on function public\\.${fn}\\([^)]*\\) from public, anon, authenticated`).test(sql);
    t("migration: lockout table with RLS on, no client access", /create table if not exists public\.clewquest_login_attempts/.test(sql) && /clewquest_login_attempts enable row level security/.test(sql) && /revoke all on public\.clewquest_login_attempts from anon, authenticated/.test(sql));
    t("migration: atomic clewquest_login_try (single insert ... on conflict ... returning), service role only", /function public\.clewquest_login_try\(p_scope text, p_key text, p_max integer, p_window_secs integer, p_lock_secs integer\) returns boolean/.test(sql) && /on conflict \(scope, key\) do update set[\s\S]*returning \* into r/.test(sql) && svcOnly("clewquest_login_try"));
    t("migration: per-IP distinct-username table + function, RLS on, service role only", /create table if not exists public\.clewquest_login_ip_users/.test(sql) && /clewquest_login_ip_users enable row level security/.test(sql) && /pg_advisory_xact_lock/.test(sql) && svcOnly("clewquest_login_ip_fail") && svcOnly("clewquest_login_status") && svcOnly("clewquest_login_ok"));
    t("migration: every security-definer function sets search_path", (sql.match(/security definer/g) || []).length === (sql.match(/security definer set search_path = public/g) || []).length);
    t("migration: the hint events table, RLS on, no client access", /create table if not exists public\.clewquest_hint_events/.test(sql) && /clewquest_hint_events enable row level security/.test(sql) && /revoke all on public\.clewquest_hint_events from anon, authenticated/.test(sql));
    // F6
    t("F6: no client insert/update policy on clewquest_characters", !/create policy clewquest_characters_(insert|update)/.test(sql));
    t("F6: client writes on clewquest_characters revoked", /revoke insert, update, delete, truncate on public\.clewquest_characters from anon, authenticated/.test(sql));
    t("F6: nickname length check (<= 24)", /check \(nickname is null or char_length\(nickname\) <= 24\)/.test(sql)); }
}

// 11. hints are server-recorded: thread 1 vs 0.5 comes from clewquest_hint_events only
{
  process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED = "true"; // awardThread is a no-op with the flag off
  const H = await import("../src/lib/clewquest/hintServer.js");
  const byId = {
    q1: { leaf: { id: "q1", answer: 0, options: ["a", "b"], hints: ["Look at the word  ONCE", "second hint"] }, setId: "S1", sectionType: "GrammarMCQ" },
    q2: { leaf: { id: "q2", answer: 1, options: ["a", "b"], hint: "zh hint text" }, setId: "S1", sectionType: "BianZi" },
    q3: { leaf: { id: "q3", answer: 1, options: ["a", "b"] }, setId: "S1", sectionType: "VocabMCQ" },
    c1_2: { container: { id: "c1", blanks: [{ num: 1, hints: ["blank one hint"] }, { num: 2, hints: ["blank two hint"] }] }, containerId: "c1", setId: "S2", sectionType: "Cloze" },
  };
  const events = new Set(); // hint hashes recorded for user u1
  const admin = { from(table) { const q = { _in: null, select() { return q; }, eq() { return q; }, in(col, vals) { q._in = vals; return q; },
    then(res) { res({ data: table === "clewquest_hint_events" ? q._in.filter((h) => events.has(h)).map((h) => ({ hint_hash: h })) : [], error: null }); } }; return q; } };
  const cands = Object.keys(byId).map((id) => ({ itemId: id, hit: byId[id] }));
  eq("no recorded hint => nothing is hinted", [...(await H.hintedItemIds(admin, "u1", cands))], []);
  t("hint text is whitespace-normalised before hashing", H.hintHash("Look at the word  ONCE ") === H.hintHash("Look at the word ONCE"));
  t("the bank hint set contains item hints (leaf, string hint and cloze blank) and not unrelated text", (() => { const k = H.knownHintHashes(byId); return k.has(H.hintHash("zh hint text")) && k.has(H.hintHash("blank two hint")) && !k.has(H.hintHash("anything else")); })());
  events.add(H.hintHash("Look at the word ONCE"));
  eq("a recorded hint marks exactly that item as hinted", [...(await H.hintedItemIds(admin, "u1", cands))], ["q1"]);
  events.add(H.hintHash("blank two hint"));
  eq("a hint on one blank does not mark the sibling blank", [...(await H.hintedItemIds(admin, "u1", cands))].sort(), ["c1_2", "q1"]);
  eq("item without hints is never hinted", (await H.hintedItemIds(admin, "u1", [{ itemId: "q3", hit: byId.q3 }])).has("q3"), false);
  // the award decision, exactly as the route does it: a client that CLAIMS no hint after a recorded hint still gets 0.5
  const ledger = mockAdmin();
  for (const claim of [{ hinted: false }, { hinted: true }, {}]) {
    const hinted = await H.hintedItemIds(admin, "u1", [{ itemId: "q1", hit: byId.q1 }]);
    const r2 = await awardThread({ admin: ledger, userId: "u1" + JSON.stringify(claim), grade: "P3", subject: "english", sourceRef: "english|q1", usedHint: hinted.has("q1") });
    eq(`client claim ${JSON.stringify(claim)} after a recorded hint still awards 0.5`, r2.awarded, 0.5);
  }
  { const hinted = await H.hintedItemIds(admin, "u1", [{ itemId: "q3", hit: byId.q3 }]);
    eq("no recorded hint awards 1 even if the client claims a hint", (await awardThread({ admin: ledger, userId: "u9", grade: "P3", subject: "english", sourceRef: "english|q3", usedHint: hinted.has("q3") })).awarded, 1); }
  const failing = { from() { const q = { select() { return q; }, eq() { return q; }, in() { return q; }, then(res) { res({ data: null, error: { message: "x" } }); } }; return q; } };
  let threw2 = false; try { await H.hintedItemIds(failing, "u1", cands); } catch { threw2 = true; }
  t("a hint-lookup error throws (the route returns 500 and awards nothing)", threw2);
  const award = fs.readFileSync(path.join(root, "src/app/api/clewquest/award/route.js"), "utf8").replace(/\/\/[^\n]*/g, "");
  t("award route never reads a client hint flag", !/it\.hinted|\.hintUsed|hinted\s*===\s*true|solvedAfterHint/.test(award) && /hintedItemIds/.test(award));
  const client = fs.readFileSync(path.join(root, "src/lib/clewquest/client.js"), "utf8").replace(/\/\/[^\n]*/g, "");
  t("client no longer sends a hint flag with the award", !/hinted:/.test(client));
  const hintRoute = fs.readFileSync(path.join(root, "src/app/api/clewquest/hint/route.js"), "utf8");
  t("hint route is student-only, rate limited, bank-checked and flag guarded", /role !== "student"/.test(hintRoute) && /rateLimit\(/.test(hintRoute) && /knownHintHashes/.test(hintRoute) && /clewquestRoutesOn\(\)\) return notFound\(\)/.test(hintRoute));
  const ui = fs.readFileSync(path.join(root, "src/lib/uiShared.js"), "utf8");
  t("HintBox only dispatches a generic event (no ClewQuest code in the shared UI)", /genius-hint-shown/.test(ui) && !/clewquest|ClewQuest/.test(ui));
  delete process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED;
}

// 12. parent picture-code reset UI
{
  const ui = fs.readFileSync(path.join(root, "src/components/clewquest/ParentPictureReset.js"), "utf8");
  t("reset UI has a confirm step, calls the existing reset API and shows an English success message", /reset-save/.test(ui) && /\/api\/clewquest\/picture-reset/.test(ui) && /can log in now with/.test(ui));
  const dash = fs.readFileSync(path.join(root, "src/components/ParentDashboard.js"), "utf8");
  t("parent screen renders the reset only behind the flag and server auth", /child&&child\.serverId&&clewquestEnabled\(\)&&<ChildCard/.test(dash));
  const rr = fs.readFileSync(path.join(root, "src/app/api/clewquest/picture-reset/route.js"), "utf8"), rs = fs.readFileSync(path.join(root, "src/lib/clewquest/resetSignin.js"), "utf8");
  t("reset route: parent only, linked via parent_child, picture-code accounts only", /role !== "parent"/.test(rr) && /from\("parent_child"\)/.test(rs) && /eq\("parent_id", parentId\)\.eq\("child_id", childId\)/.test(rs) && /usesPictureCode\(cur\.data\.user\)/.test(rs) && !/user_metadata/.test(rr.replace(/\/\/[^\n]*/g, "")));
  t("parent reset clears the child's lockout", /loginGuard\.reset/.test(rr) && /clearLockout/.test(rs));
}

// 13. review follow-ups (PR #71 review F3-F11 and batching)
{
  process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED = "true";
  // F3: picture-code flag lives in app_metadata only
  const { usesPictureCode } = await import("../src/lib/clewquest/pictureFlag.js");
  eq("F3: user_metadata.picture_code=true alone does NOT count", usesPictureCode({ user_metadata: { picture_code: true } }), false);
  eq("F3: app_metadata.picture_code=true counts", usesPictureCode({ app_metadata: { picture_code: true }, user_metadata: {} }), true);
  eq("F3: app_metadata false wins over user_metadata true", usesPictureCode({ app_metadata: { picture_code: false }, user_metadata: { picture_code: true } }), false);
  eq("F3: no user / no metadata", [usesPictureCode(null), usesPictureCode({})], [false, false]);
  { const su = fs.readFileSync(path.join(root, "src/app/api/parent/children/picture/route.js"), "utf8");
    const ch = fs.readFileSync(path.join(root, "src/app/api/clewquest/character/route.js"), "utf8").replace(/\/\/[^\n]*/g, "");
    const sv = fs.readFileSync(path.join(root, "src/lib/supabase/server.js"), "utf8");
    t("F3: child create sets app_metadata at creation (no separate unchecked update)", /appMetadata: PICTURE_APP_METADATA/.test(su) && !/updateUserById/.test(su) && /app_metadata: appMetadata/.test(fs.readFileSync(path.join(root, "src/lib/supabase/createStudent.js"), "utf8")));
    t("F3: character route reads the flag from app_metadata only", /usesPictureCode\(me\.user\)/.test(ch) && !/user_metadata/.test(ch));
    // F10
    t("F10: signup never returns a raw Supabase error", !/jerr\(made\.error/.test(su) && /"username taken"/.test(su) && /"could not create account"/.test(su)); }
  { const rr = fs.readFileSync(path.join(root, "src/app/api/clewquest/picture-reset/route.js"), "utf8"), rs = fs.readFileSync(path.join(root, "src/lib/clewquest/resetSignin.js"), "utf8");
    t("F3: parent reset writes app_metadata", /app_metadata: PICTURE_APP_METADATA/.test(rs)); }

  // F4: server-graded retry after the hint = 0.5; the client cannot fake it
  const { planCandidates, threadEntries } = await import("../src/lib/clewquest/awardPlan.js");
  const bankAns = { m1: 2, m2: 0, m3: 1, m4: 3, c1_1: "went" };
  const resolve = (id) => (id in bankAns ? { grade: ({ val }) => ({ scored: true, correct: val === bankAns[id] }) } : null);
  const plan = planCandidates([
    { itemId: "m1", answer: 2 },                       // first try correct
    { itemId: "m2", answer: 1, retryAnswer: 0 },       // wrong, then correct retry
    { itemId: "m3", answer: 0, retryAnswer: 2 },       // wrong twice
    { itemId: "m4", answer: 3, retryAnswer: 3 },       // correct first, client also claims a retry
    { itemId: "c1_1", answer: "go", retryAnswer: "went" }, // cloze blank: wrong, then correct
    { itemId: "nope", answer: 1, retryAnswer: 1 },     // not in the bank
    { itemId: "m2", answer: 0 },                       // duplicate id in one report is ignored
  ], resolve);
  const amt = Object.fromEntries(threadEntries(plan, new Set()).map((e) => [e.itemId, L.earnAmount({ correct: true, usedHint: e.usedHint })]));
  eq("F4: first-try correct = 1", amt.m1, 1);
  eq("F4: wrong then correct retry = 0.5", amt.m2, 0.5);
  eq("F4: wrong twice = 0 (no entry)", amt.m3, undefined);
  eq("F4: a claimed retry without a wrong first answer earns no 0.5 (stays 1)", amt.m4, 1);
  eq("F4: cloze blank wrong then correct = 0.5", amt.c1_1, 0.5);
  eq("F4: unknown items and duplicate ids are ignored", plan.map((c) => c.itemId), ["m1", "m2", "m3", "m4", "c1_1"]);
  eq("F4: a retry with no first answer earns nothing", planCandidates([{ itemId: "m2", retryAnswer: 0 }], resolve).filter((c) => c.correct).length, 0);
  eq("F4: a recorded hint reveal still makes a first-try answer 0.5", threadEntries([{ itemId: "m1", correct: true, afterRetry: false }], new Set(["m1"]))[0].usedHint, true);
  { const ex = fs.readFileSync(path.join(root, "src/components/ExamSession.js"), "utf8");
    t("F4: ExamSession adds retryAnswer to both retry-capable result builders (additive field only)", (ex.match(/retryAnswer: .*\? retryAnswers\[/g) || []).length === 2);
    const cl = fs.readFileSync(path.join(root, "src/lib/clewquest/client.js"), "utf8");
    t("F4: reportThread sends retryAnswer only for attempts === 2", /r\.attempts === 2/.test(cl) && /retryAnswer:/.test(cl));
    const ar = fs.readFileSync(path.join(root, "src/app/api/clewquest/award/route.js"), "utf8").replace(/\/\/[^\n]*/g, "");
    t("F4: award route grades through planCandidates and never reads a client correct/hint flag", /planCandidates\(/.test(ar) && !/\.correct\s*===\s*true\b.*b\.items|it\.correct|solvedAfterHint|\.hinted\b/.test(ar)); }

  // Batching: one upsert call for the whole round
  { const calls = []; const ledger = new Map();
    const admin = { from(table) { return { upsert(rows) { calls.push([table, Array.isArray(rows) ? rows.length : 1]); return { select: async () => {
      const ins = []; for (const r of [].concat(rows)) { const k = r.user_id + "|" + r.source_ref; if (!ledger.has(k)) { ledger.set(k, r); ins.push({ source_ref: r.source_ref, amount: r.amount }); } } return { data: ins, error: null }; } }; } }; } };
    const { awardMany } = await import("../src/lib/clewquest/award.js");
    const entries = [{ sourceRef: "english|a", usedHint: false }, { sourceRef: "english|b", usedHint: true }, { sourceRef: "english|a", usedHint: false }];
    const r1 = await awardMany({ admin, userId: "u1", grade: "P3", subject: "English", entries });
    eq("batch: one upsert call for the whole round", calls, [["clewquest_thread_ledger", 2]]);
    eq("batch: 1 + 0.5, duplicate ref in the same call ignored", r1.awarded, 1.5);
    eq("batch: replay awards 0", (await awardMany({ admin, userId: "u1", grade: "P3", subject: "English", entries })).awarded, 0);
    eq("batch: reasons and lower-case subject", [...ledger.values()].map((x) => [x.subject, x.reason, x.amount]), [["english", "correct_first_try", 1], ["english", "correct_after_hint", 0.5]]);
    const failing = { from() { return { upsert() { return { select: async () => ({ data: null, error: { message: "x" } }) }; } }; } };
    t("batch: a write error is reported (route returns 500)", !!(await awardMany({ admin: failing, userId: "u1", grade: "P3", subject: "english", entries })).error);
    delete process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED;
    eq("batch: no-op with the flag off", (await awardMany({ admin, userId: "u2", grade: "P3", subject: "english", entries })).awarded, 0);
    process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED = "true"; }

  // F5: totals are summed in the database (view), so > 1000 ledger rows still count
  { const { readTotals } = await import("../src/lib/clewquest/award.js");
    const ledgerRows = Array.from({ length: 1500 }, (_, i) => ({ subject: i % 3 ? "english" : "chinese", amount: i % 2 ? 1 : 0.5 }));
    const MAX_ROWS = 1000; // PostgREST max_rows (supabase/config.toml)
    const admin = { from(table) { const q = { select() { return q; }, eq() { return q; }, limit() { return q; },
      then(res) {
        if (table === "clewquest_thread_totals") { const sums = {}; for (const r of ledgerRows) sums[r.subject] = (sums[r.subject] || 0) + r.amount; res({ data: Object.entries(sums).map(([subject, thread]) => ({ subject, thread: String(thread) })), error: null }); }
        else res({ data: ledgerRows.slice(0, MAX_ROWS), error: null }); } }; return q; } };
    const want = ledgerRows.reduce((n, r) => n + r.amount, 0);
    const got = await readTotals(admin, "u1");
    eq("F5: total over 1,500 ledger rows is the full sum (not capped at 1,000 rows)", got.totals.total, want);
    eq("F5: per-subject sums", [got.totals.english + got.totals.chinese], [want]);
    const aw = fs.readFileSync(path.join(root, "src/lib/clewquest/award.js"), "utf8");
    t("F5: readTotals reads the clewquest_thread_totals view, not ledger rows", /from\("clewquest_thread_totals"\)/.test(aw) && !/from\("clewquest_thread_ledger"\)\.select\("subject,amount"\)/.test(aw)); }

  // F7: the Today hub stays reachable with the flag ON
  { const cq = fs.readFileSync(path.join(root, "src/components/clewquest/ClewQuestStudent.js"), "utf8");
    const app = fs.readFileSync(path.join(root, "src/app/ClaudeApp.js"), "utf8");
    t("F7: Today button on the landing and on the home", /data-testid="cq-today" onClick=\{onToday\}/.test(cq) && /data-testid="cq-today-home" onClick=\{onToday\}/.test(cq));
    t("F7: Today opens the existing StudentApp with no subject (Today hub)", /if \(view === "today"\) return renderPractice\(null, \(\) => load\(from\)\)/.test(cq) && /initialSubject:appSubject\|\|undefined/.test(app));
    t("F7: StudentApp starts on the hub when no subject is given", /useState\(!initialSubject\); \/\/ today overview/.test(app));
    t("F7: leaving a subject returns to the islands only when it was opened from an island", /const exitSubjectToQuest = !!\(onExitToQuest && initialSubject\)/.test(app) && /if\(exitSubjectToQuest\)\{ onExitToQuest\(\); return; \}/.test(app));
    t("F7: the Today hub has a way back to the islands", /\{onExitToQuest&&\([\s\S]{0,200}data-testid="today-back-to-islands" onClick=\{onExitToQuest\}/.test(app));
    t("F7: practice returns to where it was opened from", /setFrom\(view === "home" \? "home" : "landing"\)/.test(cq) && /load\(from\)/.test(cq));
    // F9: the student's own grade
    eq("F9: questGrade uses the student's grade, default when missing, null when unconfigured", [L.questGrade("P3"), L.questGrade(undefined), L.questGrade("P5")], ["P3", "P3", null]);
    t("F9: shell only mounts for a configured grade", /const cqOk = CQ_ON && typeof user\.serverId==="string" && questGrade\(user\.grade\)/.test(app));
    t("F9: the shell reads subjects for the student's grade, not the default grade", /questGrade\(user\.grade\)/.test(cq) && /subjectsFor\(grade\)/.test(cq) && !/grades\[CLEWQUEST\.defaultGrade\]/.test(cq)); }

  // F11: flat vector art (no emoji, no wine imagery), labels always shown, slots unchanged
  { t("F11: no glyph field (inline SVG art only)", P.PICTURES.every((p) => !("glyph" in p)));
    t("F11: no grapes", !P.PICTURES.some((p) => /grape|wine|amphora/i.test(p.key + p.label)));
    eq("F11: labels in design order", P.PICTURES.map((p) => p.label), ["Owl", "Trident", "Harp", "Bolt", "Wing shoe", "Pegasus", "Laurel", "Helmet", "Clew"]);
    eq("F11: slot 6 keeps its index (codes unchanged)", [P.PICTURES[6].key, P.normalizeSequence([6, 6, 6, 6])], ["laurel", "6-6-6-6"]);
    t("F11: CODE_LENGTH drives the copy", P.codeCopy(P.CODE_LENGTH) === `Tap your ${P.CODE_LENGTH} pictures in order` && P.codeCopy(3) === "Tap your 3 pictures in order");
    const pa = fs.readFileSync(path.join(root, "src/components/clewquest/PictureAuth.js"), "utf8");
    t("F11: picture pad always renders the text label", /data-testid=\{`pic-label-\$\{i\}`\}[^>]*>\{p\.label\}/.test(pa)); }
  { const T = await import("../src/lib/theme/tokens.js");
    eq("tokens: marble bg", T.TOKENS.bg, "#F6F2EA"); eq("tokens: crimson cta", T.TOKENS.cta, "#C8372D"); eq("tokens: egyptian blue", T.TOKENS.primary, "#1F3F95");
    eq("tokens: ink", T.TOKENS.ink, "#1B2340"); eq("tokens: gold", T.TOKENS.gold, "#D9A52E");
    eq("tokens: disabled main button is ~50% opacity", T.mainBtn(true).opacity, 0.5);
    t("tokens: no purple/slate/navy shell colours", !/7C3AED|4C1D95|F1F5F9|0B3B73|16A34A/i.test(JSON.stringify(T.TOKENS))); }
  delete process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED;
}

// 11. LAUNCH BLOCKERS (PR for issue #76)
{
  const { createLoginGuard } = await import("../src/lib/clewquest/lockout.js");
  const { runPictureLogin, MSG } = await import("../src/lib/clewquest/pictureLoginFlow.js");
  const LC = await import("../src/lib/clewquest/linkCode.js");
  const rd = (f) => fs.readFileSync(path.join(root, f), "utf8");

  // 5th wrong code shows the locked message (429); 1st-4th say "try again" (401); a correct 5th still signs in
  { const fails = new Map();
    const admin = { async rpc(name, a) {
      if (name === "clewquest_login_status") return { data: null, error: null };
      if (name === "clewquest_login_try") { const n = (fails.get(a.p_key) || 0) + 1; fails.set(a.p_key, n); return { data: n <= a.p_max, error: null }; }
      if (name === "clewquest_login_ip_fail") return { data: null, error: null };
      if (name === "clewquest_login_fails") return { data: fails.get(a.p_key) || 0, error: null };
      return { data: null, error: { message: "unknown" } }; } };
    const mem = { hit: () => true, clear: () => {} };
    const go = (correct) => runPictureLogin({ guard: createLoginGuard({ memory: mem }), admin, username: "kid", ipHash: "ip", signIn: async () => correct ? { user: { id: "u" } } : { error: true }, loadProfile: async () => ({ role: "student" }), signOut: async () => {} });
    const out = []; for (let i = 0; i < 5; i++) out.push((await go(false)).status);
    eq("lockout: wrong codes 1-4 = 401, the 5th = 429 (locked message)", out, [401, 401, 401, 401, 429]);
    eq("lockout: the 5th status carries the locked message", (await go(false)).error, MSG.locked); }
  { const admin = { async rpc(name) { return name === "clewquest_login_fails" ? { data: null, error: { message: "x" } } : { data: name === "clewquest_login_try" ? true : null, error: null }; } };
    const r = await runPictureLogin({ guard: createLoginGuard({ memory: { hit: () => true, clear: () => {} } }), admin, username: "k", ipHash: "i", signIn: async () => ({ error: true }), loadProfile: async () => ({}), signOut: async () => {} });
    eq("lockout: a count read error still answers 401 (not a crash)", r.status, 401); }

  // link code: format, hashing, one-time, expiry, rate limit, fail closed, no enumeration
  t("link: code is 6 digits", LC.CODE_RE.test(LC.newLinkCode()) && LC.newLinkCode(() => 7) === "000007");
  const h1 = LC.hashLinkCode(PEPPER, "Kid1", "123456");
  t("link: hash is hex HMAC, username-bound and never the digits", /^[0-9a-f]{64}$/.test(h1) && h1 !== LC.hashLinkCode(PEPPER, "kid2", "123456") && !h1.includes("123456") && h1 === LC.hashLinkCode(PEPPER, "kid1", "123456"));
  const mkLinkDb = () => { const codes = new Map(), tries = new Map(), cfg = { down: false }; const now = { t: 1_000_000 };
    return { codes, tries, cfg, now, async rpc(name, a) {
      if (cfg.down) return { data: null, error: { message: "down" } };
      if (name === "clewquest_login_try") { const n = (tries.get(a.p_key) || 0) + 1; tries.set(a.p_key, n); return { data: n <= a.p_max, error: null }; }
      if (name === "clewquest_login_ok") { tries.delete(a.p_key); return { data: null, error: null }; }
      if (name === "clewquest_link_redeem") { const c = codes.get(a.p_child); if (c && c.code_hash === a.p_hash && c.expires > now.t) { codes.delete(a.p_child); return { data: true, error: null }; } return { data: false, error: null }; }
      return { data: null, error: { message: "unknown" } }; },
      from: () => ({ upsert: async (row) => { if (cfg.down) return { error: { message: "down" } }; codes.set(row.child_id, { code_hash: row.code_hash, expires: now.t + LC.LINK.ttlSecs * 1000 }); return { error: null }; } }) }; };
  const loadChild = async (u) => (u === "kid1" ? { id: "c1" } : null);
  const mkLink = () => { const links = []; return { links, link: async (id) => { links.push(id); return {}; } }; };
  { const db = mkLinkDb(); const iss = await LC.issueLinkCode({ admin: db, childId: "c1", username: "kid1", pepper: PEPPER });
    eq("link: issue -> 200 with a 6-digit code, 10 minutes", [iss.status, LC.CODE_RE.test(iss.code), iss.expiresInSecs], [200, true, 600]);
    t("link: only the hash is stored", db.codes.get("c1").code_hash === LC.hashLinkCode(PEPPER, "kid1", iss.code) && !JSON.stringify([...db.codes.values()]).includes(iss.code));
    const L1 = mkLink();
    const bad = await LC.redeemLinkCode({ admin: db, username: "kid1", code: iss.code === "000000" ? "000001" : "000000", pepper: PEPPER, loadChild, link: L1.link });
    eq("link: wrong code -> 401 and no parent_child row", [bad.status, L1.links.length], [401, 0]);
    const ok = await LC.redeemLinkCode({ admin: db, username: "Kid1", code: iss.code, pepper: PEPPER, loadChild, link: L1.link });
    eq("link: right code (any username case) -> 200 and the parent_child row is created", [ok.status, L1.links], [200, ["c1"]]);
    const again = await LC.redeemLinkCode({ admin: db, username: "kid1", code: iss.code, pepper: PEPPER, loadChild, link: L1.link });
    eq("link: single use (second redeem -> 401)", [again.status, L1.links.length], [401, 1]); }
  { const db = mkLinkDb(); const iss = await LC.issueLinkCode({ admin: db, childId: "c1", username: "kid1", pepper: PEPPER }); db.now.t += 601_000;
    const L2 = mkLink(); const r = await LC.redeemLinkCode({ admin: db, username: "kid1", code: iss.code, pepper: PEPPER, loadChild, link: L2.link });
    eq("link: expired after 10 minutes -> 401, no row", [r.status, L2.links.length], [401, 0]); }
  { const db = mkLinkDb(); const iss = await LC.issueLinkCode({ admin: db, childId: "c1", username: "kid1", pepper: PEPPER }); const L3 = mkLink(); const st = [];
    for (let i = 0; i < 7; i++) st.push((await LC.redeemLinkCode({ admin: db, username: "kid1", code: "999999" === iss.code ? "999998" : "999999", pepper: PEPPER, loadChild, link: L3.link })).status);
    eq("link: guessing is rate limited (5 tries, then 429)", st, [401, 401, 401, 401, 401, 429, 429]);
    eq("link: even the right code is refused while rate limited", (await LC.redeemLinkCode({ admin: db, username: "kid1", code: iss.code, pepper: PEPPER, loadChild, link: L3.link })).status, 429); }
  { const db = mkLinkDb(); const a = await LC.redeemLinkCode({ admin: db, username: "nobody", code: "123456", pepper: PEPPER, loadChild, link: async () => ({}) });
    const b = await LC.redeemLinkCode({ admin: db, username: "kid1", code: "123456", pepper: PEPPER, loadChild, link: async () => ({}) });
    eq("link: unknown user and wrong code answer identically (no oracle)", [a.status, a.error], [b.status, b.error]);
    eq("link: malformed code -> 401 before any attempt is counted", [(await LC.redeemLinkCode({ admin: db, username: "kid1", code: "12ab56", pepper: PEPPER, loadChild, link: async () => ({}) })).status, db.tries.size === 2], [401, true]); }
  { const db = mkLinkDb(); db.cfg.down = true; const L4 = mkLink();
    eq("link: issue fails closed (503) when the store is down", (await LC.issueLinkCode({ admin: db, childId: "c1", username: "kid1", pepper: PEPPER })).status, 503);
    eq("link: redeem fails closed (503) when the store is down, no row", [(await LC.redeemLinkCode({ admin: db, username: "kid1", code: "123456", pepper: PEPPER, loadChild, link: L4.link })).status, L4.links.length], [503, 0]);
    eq("link: no pepper -> 503", (await LC.issueLinkCode({ admin: mkLinkDb(), childId: "c1", username: "kid1", pepper: "" })).status, 503); }
  { const db = mkLinkDb(); let n = 0; for (; n < 8; n++) { const r = await LC.issueLinkCode({ admin: db, childId: "c1", username: "kid1", pepper: PEPPER }); if (r.status === 429) break; }
    eq("link: issuing codes is rate limited (6th request -> 429)", n, 5); }

  // routes / wiring (source checks: these files import Next, so they cannot be loaded here)
  const issueR = rd("src/app/api/clewquest/link-code/route.js"), redeemR = rd("src/app/api/parent/children/link-code/route.js"), mkR = rd("src/app/api/parent/children/picture/route.js"), resetR = rd("src/app/api/clewquest/picture-reset/route.js");
  t("routes: create and reset behind the flag guard", [mkR, resetR].every((x) => /clewquestRoutesOn\(\)\) return notFound\(\)/.test(x)));
  t("routes: link-code routes are removed (always 404)", [issueR, redeemR].every((x) => /jerr\("not found", 404\)/.test(x) && !/adminClient/.test(x)));
  t("routes: parent-created picture child is linked at creation", /parentId: me\.profile\.id/.test(mkR.replace(/\\/g, "")) || /parentId: me\.profile\.id/.test(mkR));
  t("routes: parent reset clears the lockout and fails if it could not", /loginGuard\.reset/.test(resetR) && /cleared\.error/.test(rd("src/lib/clewquest/resetSignin.js")));
  const mig = rd("supabase/migrations/20261204000000_clewquest_link_codes.sql").replace(/--[^\n]*/g, "");
  t("migration: new file, hashed codes, service role only, re-runnable", /create table if not exists public\.clewquest_link_codes/.test(mig) && /code_hash/.test(mig) && /enable row level security/.test(mig) && /grant execute on function public\.clewquest_link_redeem\(uuid, text\) to service_role/.test(mig) && /create or replace function/.test(mig) && !/drop table|truncate/i.test(mig));
  t("migration: redeem is an atomic delete of an unexpired matching row", /delete from public\.clewquest_link_codes where child_id = p_child and code_hash = p_hash and expires_at > now\(\)/.test(mig));

  // Blocker 2: password students keep the Today hub; ClewQuest is opt-in; builder can be left
  const app = rd("src/app/ClaudeApp.js"), cq = rd("src/components/clewquest/ClewQuestStudent.js"), cb = rd("src/components/clewquest/CharacterBuilder.js"), pa = rd("src/components/clewquest/PictureAuth.js");
  t("B2: shell is forced only for picture-code students, or when a password student opened it", /cqOk && \(user\.pictureCode \|\| cqOpen\)/.test(app));
  t("B2: a password student gets the Today hub plus an Open ClewQuest entry", /practice\(cqOk \? \{onOpenQuest/.test(app) && /today-open-clewquest/.test(app));
  t("B2: logout closes the opt-in view", /setAuth\(null\); setCqOpen\(false\)/.test(app));
  t("B2: builder has Skip for now and Log out", /data-testid="cq-skip"/.test(cb) && /Skip for now/.test(cb) && /Log out/.test(cb) && /onSkip=\{view === "builder"/.test(cq) && /onLogout=\{onLogout\}/.test(cq));
  t("B2: skipping does not re-force the builder", /skipped \? \(next === "home"/.test(cq));
  t("B2: server tells the client who uses a picture code (me / picture login / signup)", /usesPictureCode\(me\.user\)/.test(rd("src/app/api/auth/me/route.js")) && /publicProfile\(r\.profile, true\)/.test(rd("src/app/api/auth/student/picture-login/route.js")));
  { const { publicProfile } = await import("../src/lib/supabase/server.js").catch(() => ({}));
    if (publicProfile) eq("B2: password student profile has no pictureCode flag", [publicProfile({ id: "1", role: "student" }).pictureCode, publicProfile({ id: "1", role: "student" }, true).pictureCode], [undefined, true]); }
  // small fixes
  t("builder: one screen, no nickname step, no green save, no gender colour buttons", !/cq-nickname|#16A34A|#DB2777|EFF6FF/.test(cb) && /This is my Clew/.test(cb) && /Make your Clew/.test(cb));
  { const sh = fs.readFileSync(path.join(root, "src/components/clewquest/Shell.js"), "utf8");
    t("pills: white, ink text, nowrap, no 'Island', no 'The Clew' label", /background: "#fff"/.test(sh) && /whiteSpace: "nowrap"/.test(sh) && !/label: "[^"]*(Island|The Clew)/.test(sh) && /Coming soon/.test(sh));
    t("logged-in landing: no dark label boxes or text shadows, hotspots keep aria-label", !/textShadow|rgba\(15,23,42/.test(cq) && /aria-label="The Clew"/.test(cq));
    t("builder tabs come from config; only Hair enabled", CLEWQUEST.builder.tabs.filter((x) => x.enabled).map((x) => x.key).join() === "hair" && CLEWQUEST.builder.tabs.length === 5); }
  t("landing: no forced full-height navy band under the map", !/minHeight: "100vh", background: "#0B3B73"/.test(cq));
  t("lock screen: tells the child to ask a parent to reset", /Ask a parent to reset your picture code/.test(pa) && !/Link a parent/.test(pa));
}

console.log(`clewquest selftest: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);

// Thread tint: only yarn pixels change (pure pixel logic, no network).
{
  const { tintPixels } = await import("../src/lib/clewquest/tint.js");
  const px = (...a) => new Uint8ClampedArray(a);
  const red = tintPixels(px(190, 50, 45, 255), "#2449A8", "red");
  eq("red yarn becomes blue", red[2] > red[0], true);
  const skin = tintPixels(px(250, 205, 170, 255), "#2449A8", "red");
  eq("skin keeps its colour", [skin[0], skin[1], skin[2]], [250, 205, 170]);
  const ball = tintPixels(px(10, 10, 10, 255), "#D9A52E", "dark");
  eq("black ball becomes visible in colour", ball[0] > 100, true);
  const eye = tintPixels(px(255, 255, 255, 255), "#D9A52E", "dark");
  eq("eye white keeps its colour", [eye[0], eye[1], eye[2]], [255, 255, 255]);
  eq("transparent pixels untouched", Array.from(tintPixels(px(10, 10, 10, 0), "#D9A52E", "dark")), [10, 10, 10, 0]);
}
