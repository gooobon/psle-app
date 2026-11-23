// Picture-code icons (client-safe). The code is an ordered list of 4 picks from these 9.
export const PICTURES = [
  { key: "owl", label: "Owl", glyph: "\u{1F989}" },
  { key: "lyre", label: "Lyre", glyph: "\u{1F3B6}" },
  { key: "laurel", label: "Laurel", glyph: "\u{1F33F}" },
  { key: "ship", label: "Ship", glyph: "⛵" },
  { key: "column", label: "Column", glyph: "\u{1F3DB}️" },
  { key: "amphora", label: "Amphora", glyph: "\u{1F3FA}" },
  { key: "olive", label: "Olive", glyph: "\u{1FAD2}" },
  { key: "sun", label: "Sun", glyph: "☀️" },
  { key: "shield", label: "Shield", glyph: "\u{1F6E1}️" },
];
export const CODE_LENGTH = 4;
// Returns the canonical sequence string "3-1-4-7", or null when invalid. Accepts an array of indices or picture keys.
export function normalizeSequence(seq) {
  if (!Array.isArray(seq) || seq.length !== CODE_LENGTH) return null;
  const out = [];
  for (const v of seq) {
    const i = typeof v === "number" ? v : PICTURES.findIndex((p) => p.key === v);
    if (!Number.isInteger(i) || i < 0 || i >= PICTURES.length) return null;
    out.push(i);
  }
  return out.join("-");
}
