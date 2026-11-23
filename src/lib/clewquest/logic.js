// Pure ClewQuest logic: no I/O, no framework. Safe for the browser, the server and node self-tests.
import { CLEWQUEST } from "./config.js";

const reachableStages = (cfg) => cfg.stages.filter((s) => s.reachable && Number.isFinite(s.minThread)).sort((a, b) => a.stage - b.stage);

// Highest REACHABLE stage for a lifetime thread total. Never returns 6+ in Phase 1.
export function stageFromTotal(total, cfg = CLEWQUEST) {
  const t = Number(total);
  const n = Number.isFinite(t) && t > 0 ? t : 0;
  let stage = 1;
  for (const s of reachableStages(cfg)) if (n >= s.minThread) stage = s.stage;
  return stage;
}

// Progress to the next reachable stage, or null at the Phase 1 cap (stage 6+ never shows unlock progress).
export function progressToNext(total, cfg = CLEWQUEST) {
  const t = Math.max(0, Number(total) || 0);
  const cur = stageFromTotal(t, cfg);
  const next = reachableStages(cfg).find((s) => s.stage > cur);
  if (!next) return null;
  return { stage: next.stage, need: next.minThread, have: t, remaining: Math.max(0, next.minThread - t) };
}

// 1 for a first-try correct answer, 0.5 for correct after a hint, 0 for anything else. Never negative.
export function earnAmount({ correct, usedHint }, cfg = CLEWQUEST) {
  if (correct !== true) return 0;
  return usedHint ? cfg.earn.correct_after_hint : cfg.earn.correct_first_try;
}
export const earnReason = ({ usedHint }) => (usedHint ? "correct_after_hint" : "correct_first_try");

export const sourceRefOf = (subject, itemId) => `${String(subject).toLowerCase()}|${String(itemId)}`;

// In-memory ledger used by tests and mocks. Same idempotency rule as the table: unique (user_id, source_ref).
export function applyAward(rows, award) {
  const dup = rows.some((r) => r.user_id === award.user_id && r.source_ref === award.source_ref);
  if (dup || !(award.amount > 0)) return { rows, added: 0 };
  return { rows: [...rows, award], added: award.amount };
}
export function totalsBySubject(rows) {
  const out = { total: 0 };
  for (const r of rows || []) { const a = Number(r.amount) || 0; out[r.subject] = (out[r.subject] || 0) + a; out.total += a; }
  return out;
}

// Returns a list of problems (empty = valid).
export function validateConfig(cfg = CLEWQUEST, assetKeys = null) {
  const bad = [];
  const dupes = (list, what) => { const seen = new Set(); for (const k of list) { if (seen.has(k)) bad.push(`duplicate ${what} ${k}`); seen.add(k); } };
  dupes(cfg.colours.map((c) => c.key), "colour");
  dupes(cfg.hair.map((h) => h.key), "hair");
  dupes(cfg.stages.map((s) => s.stage), "stage");
  if (cfg.colours.filter((c) => c.default).length !== 1) bad.push("exactly one default colour required");
  for (const g of ["boy", "girl"]) {
    if (cfg.hair.filter((h) => h.gender === g && h.default).length !== 1) bad.push(`exactly one default hair for ${g}`);
    if (cfg.hair.filter((h) => h.gender === g).length !== 5) bad.push(`expected 5 hairstyles for ${g}`);
  }
  for (const c of cfg.colours) if (!/^#[0-9A-Fa-f]{6}$/.test(c.hex || "")) bad.push(`bad hex for ${c.key}`);
  const r = reachableStages(cfg);
  for (let i = 1; i < r.length; i++) if (!(r[i].minThread > r[i - 1].minThread)) bad.push("stage thresholds must increase");
  if (r.some((s) => s.stage > 5)) bad.push("stage 6+ must not be reachable in Phase 1");
  if (cfg.economy && cfg.economy.enabled) bad.push("economy must be disabled in Phase 1");
  if (assetKeys) {
    for (const h of cfg.hair) {
      if (!assetKeys.has(`hair/thumb-${h.key}`)) bad.push(`missing hair thumb ${h.key}`);
      if (!assetKeys.has(`characters/stage5-${h.gender}-${h.key}`)) bad.push(`missing stage-5 art ${h.key}`);
    }
  }
  return bad;
}

export const subjectsFor = (grade, cfg = CLEWQUEST) => (cfg.grades[grade] ? cfg.grades[grade].subjects : {});
export const openSubjects = (grade, cfg = CLEWQUEST) => Object.entries(subjectsFor(grade, cfg)).filter(([, v]) => v.status === "open").map(([k]) => k);
export const defaultHair = (gender, cfg = CLEWQUEST) => (cfg.hair.find((h) => h.gender === gender && h.default) || {}).key;
export const defaultColour = (cfg = CLEWQUEST) => (cfg.colours.find((c) => c.default) || {}).key;

// Character form validation. Returns { ok, value } or { ok:false, error }.
const BAD_WORDS = ["fuck", "shit", "bitch", "cunt", "dick", "piss", "slut", "whore", "bastard", "asshole", "nigg", "fag", "porn", "sex", "damn", "crap", "wtf"];
export function cleanNickname(raw, cfg = CLEWQUEST) {
  const s = String(raw == null ? "" : raw).trim().replace(/\s+/g, " ");
  if (!s) return { ok: true, value: null };
  if (s.length < cfg.nickname.min || s.length > cfg.nickname.max) return { ok: false, error: `Nickname must be ${cfg.nickname.min}-${cfg.nickname.max} characters.` };
  if (!/^[A-Za-z0-9 ]+$/.test(s)) return { ok: false, error: "Use English letters, numbers and spaces only." };
  const flat = s.toLowerCase().replace(/[^a-z]/g, "");
  if (BAD_WORDS.some((w) => flat.includes(w))) return { ok: false, error: "Please pick a different nickname." };
  return { ok: true, value: s };
}
export function validateCharacter(input, cfg = CLEWQUEST) {
  const gender = input && input.gender;
  if (gender !== "boy" && gender !== "girl") return { ok: false, error: "Choose Boy or Girl." };
  const hair = cfg.hair.find((h) => h.key === (input.hair_key || input.hairKey) && h.gender === gender);
  if (!hair) return { ok: false, error: "Choose a hairstyle." };
  const colour = cfg.colours.find((c) => c.key === (input.colour_key || input.colourKey));
  if (!colour) return { ok: false, error: "Choose a thread colour." };
  const nick = cleanNickname(input.nickname, cfg);
  if (!nick.ok) return nick;
  return { ok: true, value: { gender, hair_key: hair.key, colour_key: colour.key, nickname: nick.value } };
}

// Asset resolver with graceful fallback. Phase 1 art is crimson only, so a colour variant falls back to the crimson base.
export function stageAssetKey(stage, gender, hairKey, colourKey, assetKeys = null) {
  const g = gender === "girl" ? "girl" : "boy";
  if (stage >= 5) {
    const variant = `characters/stage5-${g}-${hairKey}-${colourKey}`;
    if (assetKeys && assetKeys.has(variant)) return variant;
    const base = `characters/stage5-${g}-${hairKey}`;
    if (!assetKeys || assetKeys.has(base)) return base;
    return `stages/stage-5-${g}`;
  }
  return `stages/stage-${Math.min(Math.max(stage, 1), 4)}`;
}
