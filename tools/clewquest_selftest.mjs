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
eq("nickname length is 2-12", [L.cleanNickname("a").ok, L.cleanNickname("abcdefghijklm").ok, L.cleanNickname("ab").ok, L.cleanNickname("").value], [false, false, true, null]);
eq("nickname is English letters/numbers/spaces only", L.cleanNickname("ab-c!").ok, false);
eq("nickname profanity filter", L.cleanNickname("shit head").ok, false);

// 5. picture code
const PEPPER = "test-pepper-0123456789-abcdef";
eq("sequence normalises", P.normalizeSequence([3, 1, 4, 7]), "3-1-4-7");
eq("sequence accepts keys", P.normalizeSequence(["owl", "lyre", "laurel", "ship"]), "0-1-2-3");
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
{ const u = "lock_" + Date.now(); const seen = [];
  for (let i = 0; i < 5; i++) { seen.push(PS.isLockedOut(u)); PS.recordFailure(u); }
  eq("not locked for the first 5 attempts, locked after the 5th failure", [seen, PS.isLockedOut(u)], [[false, false, false, false, false], true]);
  t("another username is unaffected", !PS.isLockedOut(u + "x"));
  t("lockout is case-insensitive", PS.isLockedOut(u.toUpperCase())); }

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
routeFiles.push("src/app/api/auth/student/picture-login/route.js", "src/app/api/auth/student/picture-signup/route.js");
for (const f of routeFiles) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  const fns = src.match(/export async function (GET|POST|PUT)\([^)]*\) \{\n([^\n]*)/g) || [];
  t(`${f}: every handler starts with the flag guard`, fns.length > 0 && fns.every((x) => /clewquestRoutesOn\(\)\) return notFound\(\)/.test(x)), fns);
}
{ const g = fs.readFileSync(path.join(root, "src/lib/clewquest/guard.js"), "utf8"); t("guard requires the flag and server auth", /clewquestEnabled\(\) && serverAuthEnabled\(\)/.test(g)); }
{ const app = fs.readFileSync(path.join(root, "src/app/ClaudeApp.js"), "utf8"); t("ClewQuest shell is gated by the flag", /const CQ_ON = clewquestEnabled\(\) && SERVER_AUTH/.test(app) && /if\(CQ_ON && typeof user\.serverId/.test(app)); }

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


// 10. durable lockout across two simulated serverless instances (mock DB that mirrors the SQL functions; never touches Supabase)
{
  const { createLoginGuard } = await import("../src/lib/clewquest/lockout.js");
  const clock = { t: 1_000_000 };
  const mkDb = () => { const rows = new Map(); let failReads = false; return { rows, setReadError(v) { failReads = v; },
    async rpc(name, a) {
      const k = a.p_scope + "|" + a.p_key, now = clock.t, r = rows.get(k);
      if (name === "clewquest_login_status") return failReads ? { data: null, error: { message: "down" } } : { data: r && r.locked_until && r.locked_until > now ? r.locked_until : null, error: null };
      if (name === "clewquest_login_fail") {
        let n = r || { fails: 0, window_start: now, locked_until: null };
        if (!r || n.window_start < now - a.p_window_secs * 1000) n = { fails: 1, window_start: now, locked_until: n.locked_until }; else n = { ...n, fails: n.fails + 1 };
        if (n.fails >= a.p_max) n.locked_until = now + a.p_lock_secs * 1000;
        rows.set(k, n); return { data: n.fails >= a.p_max ? n.locked_until : null, error: null };
      }
      if (name === "clewquest_login_ok") { if (r) rows.set(k, { fails: 0, window_start: now, locked_until: null }); return { data: null, error: null }; }
      return { data: null, error: { message: "unknown rpc" } };
    } }; };
  const mkMem = () => { const m = new Map(); return { blocked: (key, { max }) => (m.get(key) || 0) >= max, hit: (key) => { m.set(key, (m.get(key) || 0) + 1); return true; }, clear: (key) => m.delete(key), m }; };
  const db = mkDb();
  const A = createLoginGuard({ memory: mkMem() }), B = createLoginGuard({ memory: mkMem() }); // two instances: separate memory, shared database
  const ipA = "ipA", ipB = "ipB";
  eq("fresh username is not locked on either instance", [(await A.check(db, "Kid1", ipA)).locked, (await B.check(db, "kid1", ipA)).locked], [false, false]);
  for (let i = 0; i < 3; i++) await A.fail(db, "kid1", ipA);
  for (let i = 0; i < 2; i++) await B.fail(db, "kid1", ipB);
  eq("3 failures on A + 2 on B lock the username on BOTH instances", [(await A.check(db, "kid1", "ipC")).locked, (await B.check(db, "KID1", "ipC")).locked], [true, true]);
  t("a different username is unaffected", !(await A.check(db, "kid2", "ipC")).locked);
  clock.t += 14 * 60 * 1000;
  t("still locked 14 min after the 5th failure (from a fresh instance with empty memory)", (await createLoginGuard({ memory: mkMem() }).check(db, "kid1", "ipC")).locked);
  clock.t += 2 * 60 * 1000;
  t("unlocked 15 min after the 5th failure on a fresh instance", !(await createLoginGuard({ memory: mkMem() }).check(db, "kid1", "ipC")).locked);
  // a success resets the username counter (the first layer too)
  for (let i = 0; i < 4; i++) await A.fail(db, "kid3", ipA);
  await B.reset(db, "kid3");
  await A.fail(db, "kid3", ipA);
  t("success resets the counter: 4 failures, a success, 1 more failure is not a lock", !(await B.check(db, "kid3", "ipC")).locked);
  // per-IP cap: many usernames from one IP lock that IP, other IPs are fine
  for (let i = 0; i < CLEWQUEST.lockout.ipMax; i++) await (i % 2 ? A : B).fail(db, "spray" + i, "ipSpray");
  eq("per-IP cap locks a new username from that IP, not from another IP", [(await A.check(db, "fresh_user", "ipSpray")).locked, (await B.check(db, "fresh_user", "ipOther")).locked], [true, false]);
  eq("config: 5 per username in 15 min, locked 15 min, larger per-IP cap", [CLEWQUEST.lockout.max, CLEWQUEST.lockout.windowMs, CLEWQUEST.lockout.lockMs, CLEWQUEST.lockout.ipMax > CLEWQUEST.lockout.max], [5, 900000, 900000, true]);
  // fail closed when the durable store cannot be read
  db.setReadError(true);
  t("durable store read error is reported so the route fails closed", (await A.check(db, "kid4", ipA)).error === true);
  db.setReadError(false);
  // hashing: the raw IP is never stored; keys are lower-cased
  t("IP is stored as a keyed hash", PS.hashIp(PEPPER, "203.0.113.9") !== "203.0.113.9" && PS.hashIp(PEPPER, "203.0.113.9") === PS.hashIp(PEPPER, "203.0.113.9") && PS.hashIp(PEPPER, "1.1.1.1") !== PS.hashIp(PEPPER, "1.1.1.2"));
  { const route = fs.readFileSync(path.join(root, "src/app/api/auth/student/picture-login/route.js"), "utf8");
    t("picture-login uses the durable guard (check, fail, reset) and fails closed", /loginGuard\.check/.test(route) && /loginGuard\.fail/.test(route) && /loginGuard\.reset/.test(route) && /503/.test(route)); }
  { const sql = fs.readFileSync(path.join(root, "supabase/migrations/20261203000000_clewquest_phase1.sql"), "utf8");
    t("migration adds the lockout table with RLS on and service-role-only functions", /create table if not exists public\.clewquest_login_attempts/.test(sql) && /clewquest_login_attempts enable row level security/.test(sql) && /grant execute on function public\.clewquest_login_fail[^;]*to service_role/.test(sql) && /revoke all on function public\.clewquest_login_fail[^;]*from public, anon, authenticated/.test(sql));
    t("migration adds the hint events table, RLS on, no client access", /create table if not exists public\.clewquest_hint_events/.test(sql) && /clewquest_hint_events enable row level security/.test(sql) && /revoke all on public\.clewquest_hint_events from anon, authenticated/.test(sql)); }
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
  t("reset UI has a confirm step, calls the existing reset API and shows an English success message", /picture-reset-confirm/.test(ui) && /\/api\/clewquest\/picture-reset/.test(ui) && /new picture code is saved/.test(ui));
  const dash = fs.readFileSync(path.join(root, "src/components/ParentDashboard.js"), "utf8");
  t("parent screen renders the reset only behind the flag and server auth", /SERVER_AUTH&&clewquestEnabled\(\)&&child\.serverId&&tab==="settings" && <ParentPictureReset/.test(dash));
  const rr = fs.readFileSync(path.join(root, "src/app/api/clewquest/picture-reset/route.js"), "utf8");
  t("reset route: parent only, linked via parent_child, picture-code accounts only", /role !== "parent"/.test(rr) && /from\("parent_child"\)/.test(rr) && /eq\("parent_id", me\.profile\.id\)\.eq\("child_id", childId\)/.test(rr) && /picture_code !== true/.test(rr));
  t("parent reset clears the child's lockout", /loginGuard\.reset/.test(rr));
}

console.log(`clewquest selftest: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
