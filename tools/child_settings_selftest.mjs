// Pure checks for the ONE shared setting per child, next-day effect and audit lines (issue #32). No network.
// Run: node tools/child_settings_selftest.mjs
import { applySettingEdit, settingForDate, settingFromRow, settingToRow, diffSettings, auditLines, tomorrowSgt, DEFAULT_SETTING } from "../src/lib/childSettings.js";

let failed = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) { failed++; console.error("FAIL", name, "\n  got ", a, "\n  want", e); } else console.log("ok", name);
}
const TODAY = "2026-11-20", TOMORROW = "2026-11-21";
eq("tomorrow helper", tomorrowSgt(TODAY), TOMORROW);

// Initial shared row (what the migration seeds from the earliest-linked parent) in force since 2000-01-01.
const seed = { effective_from: "2000-01-01", daily_target: { English: 2, Chinese: 1, Math: 0, Science: 0 }, homework_per_mistake: 3, enabled: true,
  sgd_per_credit: 0.5, daily_tiers: [{ minPct: 70, credits: 1 }, { minPct: 90, credits: 10 }], weekly_unit: "credits", weekly_amounts: { English: 2, Chinese: 2, Math: 0, Science: 0 } };
let versions = [seed];
const base = () => settingForDate(versions, TOMORROW);

// Dad edits: 90%+ tier to 15 credits and English sets to 3. A client-sent effective date is IGNORED.
const edit = applySettingEdit(base(), { dailyTarget: { English: 3 }, dailyTiers: [{ minPct: 70, credits: 1 }, { minPct: 90, credits: 15 }], effectiveFrom: "2026-11-20" }, TODAY);
eq("edit accepted", !!edit.setting, true);
eq("effective_from is always tomorrow (client date ignored)", edit.setting.effectiveFrom, TOMORROW);
versions = [...versions, settingToRow("child1", edit.setting, "dad", "2026-11-20T01:00:00Z")];

// Setting edits apply next day only
eq("today still uses the OLD target", settingForDate(versions, TODAY).dailyTarget.English, 2);
eq("today still uses the OLD 90% tier", settingForDate(versions, TODAY).rule.dailyTiers[1].credits, 10);
eq("tomorrow uses the NEW target", settingForDate(versions, TOMORROW).dailyTarget.English, 3);
eq("tomorrow uses the NEW 90% tier", settingForDate(versions, TOMORROW).rule.dailyTiers[1].credits, 15);

// Audit entry created: who changed what, visible to both parents
const changes = diffSettings(settingForDate(versions, TODAY), settingForDate(versions, TOMORROW));
eq("diff lists exactly what changed", changes, ["English daily sets from 2 to 3", "90%+ tier to 15 credits"]);
const lines = auditLines("Dad", changes, TOMORROW, TODAY);
eq("audit lines read naturally", lines, ["Dad changed English daily sets from 2 to 3, effective tomorrow", "Dad changed 90%+ tier to 15 credits, effective tomorrow"]);
eq("no change = no audit entry", diffSettings(base(), base()), []);

// Second parent edits ANOTHER field the same day: merges on top of the first edit (one shared record, last-write-wins per field only)
const mom = applySettingEdit(base(), { dailyTarget: { Chinese: 2 } }, TODAY);
eq("mom's edit keeps dad's pending change", [mom.setting.dailyTarget.English, mom.setting.dailyTarget.Chinese, mom.setting.rule.dailyTiers[1].credits], [3, 2, 15]);
eq("mom's edit lands on the SAME row (one record per child per day)", mom.setting.effectiveFrom, edit.setting.effectiveFrom);

// Validation
eq("bad tier rejected", !!applySettingEdit(base(), { dailyTiers: [{ minPct: 120, credits: 1 }] }, TODAY).error, true);
eq("daily sets clamp to 0..10", applySettingEdit(base(), { dailyTarget: { Math: 99 } }, TODAY).setting.dailyTarget.Math, 10);
eq("homework count clamps to 1..100", applySettingEdit(base(), { homeworkPerMistake: 500 }, TODAY).setting.homeworkPerMistake, 100);

// Defaults when nothing was ever saved (rewards off)
eq("no version = defaults, rewards off", [settingForDate([], TODAY).dailyTarget.English, settingForDate([], TODAY).rule.enabled], [1, false]);
eq("settingFromRow(null) equals defaults", settingFromRow(null).homeworkPerMistake, DEFAULT_SETTING.homeworkPerMistake);

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("ALL PASS");
