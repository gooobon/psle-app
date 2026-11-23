// Picture-code icons (client-safe). The code is an ordered list of CODE_LENGTH picks from these 9. The SLOT (index) is what counts
// and is what the server hashes, so changing the art or label of a slot never changes the hash (pepper and hashes stay compatible).
// NOTE: slots were re-labelled in the first-screens redesign; test codes made earlier now show different pictures. Art lives in PictureIcon.js (inline SVG, no emoji).
export const PICTURES = [
  { key: "owl", label: "Owl", colour: "#8B7355" },
  { key: "trident", label: "Trident", colour: "#2F6FD0" },
  { key: "harp", label: "Harp", colour: "#8A5A2B" },
  { key: "bolt", label: "Bolt", colour: "#E0B400" },
  { key: "wing-shoe", label: "Wing shoe", colour: "#5BB6E8" },
  { key: "pegasus", label: "Pegasus", colour: "#9C8CC9" },
  { key: "laurel", label: "Laurel", colour: "#4E8B3A" },
  { key: "helmet", label: "Helmet", colour: "#B5763A" },
  { key: "clew", label: "Clew", colour: "#C8372D" },
];
// Single config value: copy, dots and validation all follow it. Keep 4: existing accounts use 4.
export const CODE_LENGTH = 4;
export const codeCopy = (n = CODE_LENGTH) => `Tap your ${n} pictures in order`;
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
