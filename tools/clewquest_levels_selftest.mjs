// Self-test: stage colour rule, level ladder, pose lists, records helpers, ship path. Pure functions only: NO network, never Supabase.
import fs from "fs"; import path from "path"; import { fileURLToPath } from "url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if ([process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_URL, process.env.E2E_API_URL].join(" ").includes("zehnulwvysvnsshunxzr")) throw new Error("Refusing to run against production Supabase");
let pass = 0, fail = 0;
const t = (n, ok, x) => { if (ok) pass++; else { fail++; console.log("FAIL", n, x === undefined ? "" : JSON.stringify(x)); } };
const eq = (n, a, b) => t(n, JSON.stringify(a) === JSON.stringify(b), { got: a, want: b });

const { CLEWQUEST } = await import("../src/lib/clewquest/config.js");
const L = await import("../src/lib/clewquest/logic.js");
const V = await import("../src/lib/clewquest/levels.js");
const P = await import("../src/lib/clewquest/poses.js");
const R = await import("../src/lib/studyRecords.js");

// (b) tint ignored for stage 1-3, applied for 4-5
for (const s of [1, 2, 3]) eq(`stage ${s} ignores tint`, L.tintForStage(s, "#C8372D"), undefined);
for (const s of [4, 5]) eq(`stage ${s} applies tint`, L.tintForStage(s, "#C8372D"), "#C8372D");
eq("bad hex is not applied", L.tintForStage(4, "red"), undefined);
eq("stage 1-3 art keys come from config", [1, 2, 3].map((s) => L.stageAssetKey(s, "boy", "x", "y")), ["stages/stage-1", "stages/stage-2", "stages/stage-3"]);
const keys = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(root, "public/clewquest/manifest.json"), "utf8")).assets));
t("stage art keys exist in manifest", Object.values(CLEWQUEST.stageArt).every((k) => keys.has(k)));
t("custom stage art key is honoured when present", L.stageAssetKey(2, "boy", "x", "y", new Set(["stages/new-2"]), { ...CLEWQUEST, stageArt: { 2: "stages/new-2" } }) === "stages/new-2");
t("missing custom key falls back", L.stageAssetKey(2, "boy", "x", "y", keys, { ...CLEWQUEST, stageArt: { 2: "stages/nope" } }) === "stages/stage-2");

// (c) ladder
eq("config valid", V.validateLevels(), []);
eq("config names", CLEWQUEST.levels.map((l) => l.name), ["Hermes' Sandals", "Apollo's Lyre", "Heracles' Lion Hood", "Medusa Shield", "Athena's Helm", "Poseidon's Trident", "Zeus' Thunderbolt"]);
const lv = (threads, avg, floor) => V.levelFor({ threads, avg, floor }).level;
for (const [th, a, want] of [[0, null, 1], [29, null, 1], [30, null, 2], [80, null, 3], [160, null, 4], [300, 74, 4], [300, 75, 5], [300, null, 4], [500, 79, 5], [500, 80, 6], [800, 84, 6], [800, 85, 7], [5000, 100, 7], [-5, null, 1], [NaN, null, 1]]) eq(`lv(${th},${a})`, lv(th, a), want);
eq("never decreases (accuracy drop)", lv(800, 40, 7), 7);
eq("floor is capped at the top", lv(0, null, 99), 7);
eq("settleLevel keeps the larger", [V.settleLevel(3, 5), V.settleLevel(6, 5)], [5, 6]);
eq("progress mid-level", V.levelProgress({ threads: 55, avg: null }).pct, 50);
eq("progress asks for accuracy when threads are enough", V.levelProgress({ threads: 400, avg: 60 }).needAvg, 75);
eq("no progress at the top", V.levelProgress({ threads: 900, avg: 90 }), null);
const bad = (mut) => { const l = JSON.parse(JSON.stringify(CLEWQUEST.levels)); mut(l); return V.validateLevels(l).length > 0; };
t("validation: duplicate key", bad((l) => { l[1].key = l[0].key; }));
t("validation: non-increasing thresholds", bad((l) => { l[2].threads = 10; }));
t("validation: bad gate", bad((l) => { l[4].minAvg = 150; }));
t("validation: missing icon", bad((l) => { l[3].icon = ""; }));
t("validation: level 1 not at 0", bad((l) => { l[0].threads = 5; }));
t("validation: non-English name", bad((l) => { l[0].name = "허메스"; }));
t("level icon files are optional (fallback)", V.validateLevels(CLEWQUEST.levels, keys).length === 0);
// two-week window, stored "dd Mon yyyy" dates
const hist = [{ date: "01 Nov 2026", totalPct: 10 }, { date: "15 Nov 2026", totalPct: 80 }, { date: "23 Nov 2026", totalPct: 90 }];
eq("2-week average uses only the window", V.recentAverage(hist, "23 Nov 2026"), 85);
eq("no sessions in window", V.recentAverage([{ date: "01 Jan 2026", totalPct: 50 }], "23 Nov 2026"), null);

// (e) poses
eq("girl pose keys", P.characterPoseKeys("girl", "ariadne-buns").slice(0, 2), ["poses/girl-ariadne-buns-1", "poses/girl-ariadne-buns-2"]);
eq("6 poses", P.characterPoseKeys("boy", "apollo-curls").length, 6);
eq("pets", CLEWQUEST.poses.pets.map((p) => P.petPoseKeys(p)[5]), ["poses/pet-owl-6", "poses/pet-pegasus-6"]);
const fr = P.resolveFrames(["poses/missing-1", "stages/stage-1"], "stages/stage-4", keys);
eq("missing pose falls back to placeholder", [fr[0].key, fr[0].placeholder === true], ["stages/stage-4", true]);
eq("real pose key kept", [fr[1].key, fr[1].transform], ["stages/stage-1", "none"]);

// (d) records
const prog = { history: [{ sessionNum: 1, date: "20 Nov 2026", totalPct: 60, mistakes: [{ id: "a" }, { id: "b" }] }, { sessionNum: 2, date: "21 Nov 2026", totalPct: 80, mistakes: [] }],
  mistakes: [{ id: "a", sessionNum: 1 }, { id: "b", sessionNum: 1 }, { id: "c", sessionNum: 1, resolved_at: "2026-11-22" }],
  trials: [{ itemId: "a", firstTry: true, sessionNum: 2 }, { itemId: "b", firstTry: true, sessionNum: 1 }] };
const rr = R.recordRows(prog, "English", { "2026-11-21": 7 });
eq("records newest first + all rows", [rr.length, rr[0].sessionNum, rr[0].threads, rr[1].threads], [2, 2, 7, null]);
eq("mistake status", (({ remaining, fixed }) => ({ remaining, fixed }))(R.mistakeStatus(prog)), { remaining: 1, fixed: 2 });
eq("vocab counts", R.vocabCounts({ ses: 3, masteredCount: 2, words: { x: { dueSes: 4 }, y: { dueSes: 9 }, z: { dueSes: 1, mastered: true } } }), { due: 1, mastered: 2 });
eq("isoDay", R.isoDay("23 Nov 2026"), "2026-11-23");
eq("thread days grouped", L.groupThreadsByDay([{ amount: 1, subject: "english", created_at: "2026-11-22T01:00:00Z" }, { amount: 0.5, subject: "english", created_at: "2026-11-22T05:00:00Z" }, { amount: 1, subject: "chinese", created_at: "2026-11-21T05:00:00Z" }]).map((d) => [d.day, d.total]), [["2026-11-22", 1.5], ["2026-11-21", 1]]);

// (f) ship: loop stays in the open sea below the islands (islands + pills end ~84%) and inside the art
const { SHIP_PATH, shipKeyframes } = await import("../src/components/clewquest/shipPath.js");
t("ship stays below the island pills", SHIP_PATH.cy - SHIP_PATH.ry >= 87 && SHIP_PATH.cy + SHIP_PATH.ry <= 96);
t("ship stays inside horizontally", SHIP_PATH.cx - SHIP_PATH.rx >= 5 && SHIP_PATH.cx + SHIP_PATH.rx <= 95);
t("ship keyframes cover the loop", shipKeyframes().startsWith("0.00%") && shipKeyframes().includes("100.00%"));
t("shop flag defaults on, no purchase fields", CLEWQUEST.ship.shopEnabled === true && CLEWQUEST.shop.items.every((i) => i.credits > 0 && !("buy" in i)));

// "no wordmark" + "no Korean" in the new/changed student UI sources
const src = ["src/components/clewquest/LevelBadge.js", "src/components/clewquest/PoseCycler.js", "src/components/clewquest/TradersShip.js", "src/components/MyRecords.js", "src/lib/clewquest/config.js"];
for (const f of src) t(`no Korean in ${f}`, !/[가-힯ᄀ-ᇿ㄰-㆏]/.test(fs.readFileSync(path.join(root, f), "utf8")));
const landing = fs.readFileSync(path.join(root, "src/components/clewquest/ClewQuestStudent.js"), "utf8");
t("landing has no wordmark text", !/>\s*ClewQuest\s*</.test(landing));
t("logo keeps alt text", /alt="ClewQuest"/.test(fs.readFileSync(path.join(root, "src/components/clewquest/Shell.js"), "utf8")));

console.log(`clewquest levels selftest: ${pass} pass / ${fail} fail`);
process.exit(fail ? 1 : 0);
