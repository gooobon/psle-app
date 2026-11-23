"use client";
// Shared building blocks for every shell screen (landing, login, sign-up, builder, home). Colours come from src/lib/theme/tokens.js only.
import React from "react";
import { T, FONT, RADIUS, SHADOW, mainBtn, secondaryBtn, inputStyle, labelStyle, helperStyle, chipStyle, linkBtn } from "@/lib/theme/tokens";
import { Art } from "./Art";

export { T, FONT, mainBtn, secondaryBtn, inputStyle, labelStyle, helperStyle, chipStyle, linkBtn };

export function Page({ children, testId, max = 480 }) {
  return <div data-testid={testId} style={{ minHeight: "100vh", background: T.bg, color: T.ink, fontFamily: FONT }}><div style={{ maxWidth: max, margin: "0 auto" }}>{children}</div></div>;
}
// White header bar with only the B1 logo mark centred. `left` / `right` are optional small text slots.
export function HeaderBar({ left, right }) {
  return (
    <div data-testid="cq-header-bar" style={{ background: T.card, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "8px 16px", boxShadow: "0 1px 0 rgba(27,35,64,.06)" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.primary }}>{left}</div>
      <Art k="brand/logo-b1" alt="ClewQuest" style={{ height: 44, width: "auto" }} />
      <div style={{ textAlign: "right" }}>{right}</div>
    </div>
  );
}
export function LogoBadge({ size = 88, style }) {
  return (
    <div data-testid="cq-logo-badge" style={{ width: size, height: size, borderRadius: "50%", background: "#fff", boxShadow: SHADOW, display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
      <Art k="brand/logo-b1" alt="ClewQuest" style={{ width: size * 0.7, height: "auto" }} />
    </div>
  );
}
// Island label: white rounded pill, ink bold text. `soon` adds a smaller muted "Coming soon" on the same line.
export function IslandPill({ label, soon, pos, testId }) {
  return (
    <span data-testid={testId} style={{ position: "absolute", ...pos, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(27,35,64,.18)", padding: "4px 9px", display: "inline-flex", alignItems: "baseline", gap: 5, whiteSpace: "nowrap", pointerEvents: "none", fontFamily: FONT }}>
      <b style={{ color: T.ink, fontWeight: 800, fontSize: 14 }}>{label}</b>
      {soon && <span style={{ color: T.muted, fontSize: 11, fontWeight: 600 }}>Coming soon</span>}
    </span>
  );
}
export const ISLAND_PILLS = [
  { label: "English", pos: { left: "5%", top: "31%" } },
  { label: "Math", soon: true, pos: { right: "5%", top: "31%" } },
  { label: "Chinese", pos: { left: "5%", top: "78%" } },
  { label: "Science", soon: true, pos: { right: "5%", top: "78%" } },
];
export function Card({ children, style, testId }) { return <div data-testid={testId} style={{ background: T.card, borderRadius: 20, boxShadow: SHADOW, padding: 20, ...style }}>{children}</div>; }
export function Field({ id, label, children, helper }) {
  return <div style={{ marginBottom: 14 }}><label htmlFor={id} style={labelStyle}>{label}</label>{children}{helper && <div style={{ ...helperStyle, marginTop: 5 }}>{helper}</div>}</div>;
}
export function Chips({ options, value, onChange, multi, testId }) {
  const on = (o) => (multi ? value.includes(o) : value === o);
  return (
    <div data-testid={testId} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => <button key={o} type="button" aria-pressed={on(o)} onClick={() => onChange(multi ? (value.includes(o) ? value.filter((x) => x !== o) : [...value, o]) : o)} style={chipStyle(on(o))}>{o}</button>)}
    </div>
  );
}
export function Segmented({ options, value, onChange, testId }) {
  return (
    <div role="tablist" data-testid={testId} style={{ display: "flex", background: T.track, borderRadius: 12, padding: 4 }}>
      {options.map(([k, label]) => (
        <button key={k} role="tab" aria-selected={value === k} data-testid={`${testId}-${k}`} type="button" onClick={() => onChange(k)}
          style={{ flex: 1, border: "none", borderRadius: 9, padding: "10px 0", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: FONT, background: value === k ? T.primary : "transparent", color: value === k ? "#fff" : T.muted }}>{label}</button>
      ))}
    </div>
  );
}
export function ErrorText({ children, testId }) { return children ? <div data-testid={testId} role="alert" style={{ color: T.error, fontWeight: 700, fontSize: 14, margin: "8px 0" }}>{children}</div> : null; }
export function Dots({ n, total }) {
  return <span data-testid="pic-dots" aria-label={`${n} of ${total} chosen`} style={{ display: "inline-flex", gap: 6 }}>{Array.from({ length: total }).map((_, i) => <span key={i} style={{ width: 12, height: 12, borderRadius: 6, boxSizing: "border-box", background: i < n ? T.gold : "transparent", border: `2px solid ${T.gold}` }} />)}</span>;
}
export const DottedDivider = () => <div aria-hidden="true" style={{ borderTop: `3px dotted ${T.gold}`, margin: "16px 0" }} />;
