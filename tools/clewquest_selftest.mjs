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

console.log(`clewquest selftest: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
