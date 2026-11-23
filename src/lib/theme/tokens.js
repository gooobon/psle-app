// Shared design tokens ("Kyanos + marble white"). Used by every shell screen (not the solving screens).
// The same values are exposed as CSS variables in src/app/globals.css (--cq-*).
export const TOKENS = {
  bg: "#F6F2EA", card: "#FFFFFF", primary: "#1F3F95", ink: "#1B2340", cta: "#C8372D", gold: "#D9A52E",
  success: "#7E9A45", successText: "#4F6B22", error: "#B3261E", muted: "#6B6F7B", border: "#E2DBCF",
  tile: "#FBF6EA", track: "#E8E4DC",
  gameDark: "#0F1B3D", gameDark2: "#1A2B5C", // reserved for future game screens
};
export const FONT = "var(--font-noto-sans), 'Noto Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
export const RADIUS = { button: 14, card: 24, input: 12, chip: 999 };
export const SHADOW = "0 6px 20px rgba(27,35,64,.10)";
export const T = TOKENS;

export const mainBtn = (disabled) => ({ width: "100%", height: 52, borderRadius: RADIUS.button, border: "none", background: T.cta, color: "#fff", fontWeight: 800, fontSize: 17, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1, fontFamily: FONT });
export const secondaryBtn = { width: "100%", height: 52, borderRadius: RADIUS.button, border: `2px solid ${T.primary}`, background: "#fff", color: T.primary, fontWeight: 800, fontSize: 17, cursor: "pointer", fontFamily: FONT, boxSizing: "border-box" };
export const inputStyle = { width: "100%", boxSizing: "border-box", padding: "13px 14px", fontSize: 16, borderRadius: RADIUS.input, border: `1.5px solid ${T.border}`, background: "#fff", color: T.ink, fontFamily: FONT };
export const labelStyle = { display: "block", fontWeight: 600, fontSize: 14, color: T.ink, marginBottom: 6 };
export const helperStyle = { fontSize: 13, color: T.muted, fontWeight: 400, lineHeight: 1.4 };
export const cardStyle = { background: T.card, borderRadius: RADIUS.card, boxShadow: SHADOW };
export const chipStyle = (on) => ({ padding: "9px 16px", borderRadius: RADIUS.chip, border: `1.5px solid ${on ? T.primary : T.border}`, background: on ? T.primary : "#fff", color: on ? "#fff" : T.ink, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: FONT });
export const headingStyle = { fontWeight: 800, color: T.ink, fontFamily: FONT };
export const linkBtn = { background: "none", border: "none", padding: 0, cursor: "pointer", fontWeight: 700, fontFamily: FONT };
