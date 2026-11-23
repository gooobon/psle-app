"use client";
// "Make your Clew": one screen (white header bar, preview card with growth strip, tabs, hair grid, thread colours, main button).
import React, { useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { defaultHair, defaultColour, validateCharacter, stageAssetKey } from "@/lib/clewquest/logic";
import { Art, ASSET_KEYS } from "./Art";
import { cqPut } from "@/lib/clewquest/client";
import { Page, HeaderBar, Segmented, ErrorText, T, FONT, mainBtn, helperStyle, linkBtn } from "./Shell";

const Arrow = () => <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M4 12h14m-5-6 6 6-6 6" fill="none" stroke={T.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function CharacterBuilder({ initial, onSaved, onCancel, onSkip, onLogout }) {
  const [gender, setGender] = useState(initial ? initial.gender : "girl");
  const [hair, setHair] = useState(initial ? initial.hair_key : defaultHair("girl"));
  const [colour, setColour] = useState(initial ? initial.colour_key : defaultColour());
  const [tab, setTab] = useState("hair");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const hex = (CLEWQUEST.colours.find((c) => c.key === colour) || {}).hex;
  const tabs = CLEWQUEST.builder.tabs;
  const anyFace = tabs.some((t) => t.key !== "hair" && t.enabled);
  const ordered = [...CLEWQUEST.hair.filter((h) => h.gender === gender), ...CLEWQUEST.hair.filter((h) => h.gender !== gender)];

  function pickGender(g) { setGender(g); setHair(defaultHair(g)); }
  function shuffle() {
    const h = CLEWQUEST.hair[Math.floor(Math.random() * CLEWQUEST.hair.length)];
    setGender(h.gender); setHair(h.key); setColour(CLEWQUEST.colours[Math.floor(Math.random() * CLEWQUEST.colours.length)].key);
  }
  async function save() {
    setErr("");
    const v = validateCharacter({ gender, hair_key: hair, colour_key: colour, nickname: initial && initial.nickname ? initial.nickname : "" }); // nickname is edited later from home
    if (!v.ok) return setErr(v.error);
    setBusy(true);
    const r = await cqPut("/api/clewquest/character", v.value);
    setBusy(false);
    if (r.ok && r.character) return onSaved(r.character);
    setErr(r.error || "Could not save. Try again.");
  }
  const cap = (txt) => <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginTop: 4 }}>{txt}</div>;
  return (
    <Page testId="cq-builder">
      <HeaderBar left={initial ? "Edit look" : "Step 1 of 2"} right={<button data-testid="cq-shuffle" onClick={shuffle} style={{ ...linkBtn, color: T.primary, fontSize: 14 }}>Shuffle</button>} />
      <div style={{ padding: "18px 16px 32px" }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 26, color: T.ink }}>Make your Clew</h1>
        <div style={{ ...helperStyle, fontSize: 15, margin: "4px 0 14px" }}>{anyFace ? "Pick hair, eyes, brows, mouth and a thread colour." : "Pick your hair and a thread colour."}</div>

        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 6px 20px rgba(27,35,64,.10)", padding: 14, marginBottom: 16 }}>
          <div style={{ width: 150 }}><Segmented testId="cq-gender" value={gender} onChange={pickGender} options={[["boy", "Boy"], ["girl", "Girl"]]} /></div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, marginTop: 12 }}>
            <div style={{ textAlign: "center", width: 62 }}>
              <Art k="stages/stage-1" alt="Today: a black yarn ball" style={{ width: 54 }} />{cap("Today")}
            </div>
            <Arrow />
            <div style={{ textAlign: "center", width: 70 }}>
              <Art k="stages/stage-4" alt="300 threads: a yarn ball in your colour" tint={hex} style={{ width: 62 }} />{cap("300 threads")}
            </div>
            <Arrow />
            <div style={{ textAlign: "center", flex: 1 }}>
              <Art testId="cq-preview" k={stageAssetKey(5, gender, hair, colour, ASSET_KEYS)} alt="700 threads: your Clew with hair" tint={hex} style={{ maxHeight: 190, width: "auto" }} />{cap("700 threads")}
            </div>
          </div>
        </div>

        <div role="tablist" data-testid="cq-tabs" style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12 }}>
          {tabs.filter((t) => t.enabled).map((t) => (
            <button key={t.key} role="tab" aria-selected={tab === t.key} disabled={!t.enabled} data-testid={`cq-tab-${t.key}`} onClick={() => setTab(t.key)}
              style={{ padding: "8px 16px", borderRadius: 999, border: `1.5px solid ${tab === t.key ? T.primary : T.border}`, background: tab === t.key ? T.primary : "#fff", color: tab === t.key ? "#fff" : T.ink, fontWeight: 700, fontSize: 14, opacity: t.enabled ? 1 : 0.45, cursor: t.enabled ? "pointer" : "default", fontFamily: FONT, flexShrink: 0 }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 18 }}>
          {ordered.map((h) => (
            <button key={h.key} data-testid={`cq-hair-${h.key}`} onClick={() => setHair(h.key)} aria-pressed={hair === h.key}
              style={{ background: "#fff", border: hair === h.key ? `3px solid ${T.cta}` : `1.5px solid ${T.border}`, borderRadius: 12, padding: 3, cursor: "pointer", fontFamily: FONT }}>
              <Art k={`hair/thumb-${h.key}`} alt={h.name} style={{ width: "100%" }} /><div style={{ fontSize: 10, fontWeight: 700, color: T.ink, lineHeight: 1.15, minHeight: 24 }}>{h.name}</div>
            </button>
          ))}
        </div>

        <div style={{ fontWeight: 600, fontSize: 14, color: T.ink, marginBottom: 10 }}>Thread colour (body and hair, from stage 4)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6, marginBottom: 20 }}>
          {CLEWQUEST.colours.map((c) => {
            const on = colour === c.key, nm = c.name.split(" ").pop();
            return (
              <button key={c.key} data-testid={`cq-colour-${c.key}`} onClick={() => setColour(c.key)} aria-pressed={on} aria-label={c.name} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: FONT }}>
                <span style={{ display: "block", width: 44, height: 44, borderRadius: 22, background: c.hex, margin: "0 auto 4px", border: "1px solid rgba(27,35,64,.18)", boxShadow: on ? `0 0 0 3px #fff, 0 0 0 5px ${T.primary}` : "none", boxSizing: "border-box" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.ink }}>{nm}</span>
              </button>
            );
          })}
        </div>

        <ErrorText testId="cq-builder-error">{err}</ErrorText>
        <button data-testid="cq-save" disabled={busy} style={mainBtn(busy)} onClick={busy ? undefined : save}>{busy ? "Saving..." : "This is my Clew"}</button>
        <div style={{ ...helperStyle, fontSize: 12, textAlign: "center", marginTop: 12 }}>You start as a black yarn ball. Your colour comes at 300 threads, your face at 700.</div>
        {(onSkip || onLogout || onCancel) && (<div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
          {onSkip ? <button data-testid="cq-skip" onClick={onSkip} style={{ ...linkBtn, color: T.primary }}>Skip for now</button> : onCancel ? <button onClick={onCancel} style={{ ...linkBtn, color: T.muted }}>Cancel</button> : <span />}
          {onLogout && <button data-testid="cq-builder-logout" onClick={onLogout} style={{ ...linkBtn, color: T.muted, fontWeight: 500 }}>Log out</button>}
        </div>)}
      </div>
    </Page>
  );
}
