// Pose lists for the My Clew profile (data-driven; art keys come from CLEWQUEST.poses). Pure.
import { CLEWQUEST } from "./config.js";

const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => (vars[k] == null ? "" : String(vars[k])));
export function poseKeys(template, vars = {}, cfg = CLEWQUEST) {
  return Array.from({ length: cfg.poses.count }, (_, i) => fill(template, { ...vars, n: i + 1 }));
}
export const characterPoseKeys = (gender, hairKey, cfg = CLEWQUEST) => poseKeys(cfg.poses.character[gender === "girl" ? "girl" : "boy"], { hair: hairKey }, cfg);
export const petPoseKeys = (pet, cfg = CLEWQUEST) => poseKeys(pet.frames, {}, cfg);

// Placeholder frames until pose art lands: the current image with a CSS transform per frame (tilt, hop, squash, wave, ...).
export const PLACEHOLDER_TRANSFORMS = [
  "none",
  "rotate(-6deg)",
  "translateY(-10px)",
  "scale(1.06, 0.92)",
  "rotate(6deg)",
  "translateY(-6px) rotate(-3deg)",
];
// Frame list for a PoseCycler: real art keys when they exist in the manifest, else the fallback key with a transform.
export function resolveFrames(keys, fallbackKey, assetKeys) {
  return keys.map((k, i) => (assetKeys && assetKeys.has(k)
    ? { key: k, transform: "none" }
    : { key: fallbackKey, transform: PLACEHOLDER_TRANSFORMS[i % PLACEHOLDER_TRANSFORMS.length], placeholder: true }));
}
