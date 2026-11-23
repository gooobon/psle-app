// Live thread-colour tinting for ClewQuest art (pure, no DOM). Only yarn pixels change;
// skin, eyes, blush, sandals and outlines keep their colours.
// Stage 1-4 art is a black yarn ball: dark, near-neutral pixels are the yarn.
// Stage 5+ art is crimson yarn: saturated red pixels are the yarn.

export function hexToRgb(hex) {
  const h = String(hex || "").replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h;
  if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (mx === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return [h, s, l];
}

const BASE_L = 0.42; // typical lightness of the crimson yarn art
// Shade the target colour by the source pixel's relative lightness (keeps the yarn texture).
function shade(target, f) {
  const k = Math.max(0, f);
  return target.map((c) => Math.round(k <= 1 ? c * k : Math.min(255, c + (255 - c) * Math.min(1, (k - 1) * 0.9))));
}

// kind: "dark" (stage 1-4 black ball) or "red" (stage 5+ crimson yarn). Mutates and returns data (RGBA).
export function tintPixels(data, hex, kind) {
  const t = hexToRgb(hex);
  if (!t) return data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let out = null;
    if (kind === "dark") {
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      if (mx < 95 && mx - mn < 28) out = shade(t, 0.85 + (mx / 95) * 0.4); // black yarn -> visible colour with texture
    } else {
      const [h, s, l] = rgbToHsl(r, g, b);
      const red = (h <= 14 || h >= 340) && s >= 0.38 && l >= 0.12 && l <= 0.7;
      if (red) out = shade(t, l / BASE_L);
    }
    if (out) { data[i] = out[0]; data[i + 1] = out[1]; data[i + 2] = out[2]; }
  }
  return data;
}
