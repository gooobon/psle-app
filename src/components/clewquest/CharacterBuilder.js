"use client";
// ClewQuest character builder: gender -> hair -> thread colour -> nickname. Preview shows the stage-5 look.
import React, { useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { defaultHair, defaultColour, validateCharacter, stageAssetKey } from "@/lib/clewquest/logic";
import { Art, ASSET_KEYS } from "./Art";
import { cqPut } from "@/lib/clewquest/client";

const btn = (bg, extra) => ({ padding: "14px 16px", fontSize: 16, fontWeight: 800, color: "#fff", background: bg, border: "none", borderRadius: 14, cursor: "pointer", ...extra });

export default function CharacterBuilder({ initial, onSaved, onCancel }) {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState(initial ? initial.gender : null);
  const [hair, setHair] = useState(initial ? initial.hair_key : null);
  const [colour, setColour] = useState(initial ? initial.colour_key : defaultColour());
  const [nick, setNick] = useState(initial && initial.nickname ? initial.nickname : "");
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const hairKey = hair || (gender ? defaultHair(gender) : null);
  const hex = (CLEWQUEST.colours.find((c) => c.key === colour) || {}).hex;

  function pickGender(g) { setGender(g); setHair(defaultHair(g)); setStep(2); }
  async function save() {
    setErr("");
    const v = validateCharacter({ gender, hair_key: hairKey, colour_key: colour, nickname: nick });
    if (!v.ok) return setErr(v.error);
    setBusy(true);
    const r = await cqPut("/api/clewquest/character", v.value);
    setBusy(false);
    if (r.ok && r.character) return onSaved(r.character);
    setErr(r.error || "Could not save. Try again.");
  }
  return (
    <div data-testid="cq-builder" style={{ minHeight: "100vh", background: "#EFF6FF", padding: "20px 18px 40px", maxWidth: 480, margin: "0 auto", boxSizing: "border-box" }}>
      <div style={{ fontWeight: 900, fontSize: 24, marginBottom: 4 }}>Build your Clew</div>
      <div style={{ color: "#475569", marginBottom: 14 }}>This is you at Stage 5. Every correct answer adds thread!</div>
      {gender && hairKey && (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, background: "#fff", borderRadius: 18, padding: 14, marginBottom: 14 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <Art testId="cq-preview" k={stageAssetKey(5, gender, hairKey, colour, ASSET_KEYS)} alt="Your Clew at Stage 5" style={{ maxHeight: 220, width: "auto" }} />
            {nick.trim() && <div style={{ fontWeight: 800, marginTop: 6 }}>{nick.trim()}</div>}
          </div>
          <div style={{ textAlign: "center", width: 84 }}>
            <Art k="stages/stage-1" alt="Stage 1 Yarn Ball" style={{ width: 60 }} />
            <div style={{ fontSize: 12, fontWeight: 700 }}>Start: Yarn Ball</div>
            <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: 9, background: hex, marginTop: 4 }} />
          </div>
        </div>
      )}
      {step === 1 && (<div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Step 1. I am a...</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button data-testid="cq-gender-boy" style={btn("#2563EB", { flex: 1 })} onClick={() => pickGender("boy")}>Boy</button>
          <button data-testid="cq-gender-girl" style={btn("#DB2777", { flex: 1 })} onClick={() => pickGender("girl")}>Girl</button>
        </div>
      </div>)}
      {step === 2 && (<div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Step 2. Pick your hair</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {CLEWQUEST.hair.filter((h) => h.gender === gender).map((h) => (
            <button key={h.key} data-testid={`cq-hair-${h.key}`} onClick={() => setHair(h.key)} aria-pressed={hairKey === h.key}
              style={{ background: "#fff", border: hairKey === h.key ? "3px solid #1E3A6E" : "2px solid #CBD5E1", borderRadius: 14, padding: 6, cursor: "pointer" }}>
              <Art k={`hair/thumb-${h.key}`} alt={h.name} style={{ width: "100%" }} /><div style={{ fontSize: 12, fontWeight: 700 }}>{h.name}</div>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={btn("#64748B")} onClick={() => setStep(1)}>Back</button>
          <button data-testid="cq-next-hair" style={btn("#1E3A6E", { flex: 1 })} onClick={() => setStep(3)}>Next</button>
        </div>
      </div>)}
      {step === 3 && (<div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Step 3. Pick your thread colour</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {CLEWQUEST.colours.map((c) => (
            <button key={c.key} data-testid={`cq-colour-${c.key}`} onClick={() => setColour(c.key)} aria-pressed={colour === c.key} aria-label={c.name}
              style={{ background: "#fff", border: colour === c.key ? "3px solid #1E3A6E" : "2px solid #CBD5E1", borderRadius: 14, padding: 8, cursor: "pointer" }}>
              <span style={{ display: "block", width: 44, height: 44, borderRadius: 22, background: c.hex, margin: "0 auto 6px", border: "1px solid #94A3B8" }} />
              <span style={{ fontSize: 12, fontWeight: 700 }}>{c.name}</span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={btn("#64748B")} onClick={() => setStep(2)}>Back</button>
          <button data-testid="cq-next-colour" style={btn("#1E3A6E", { flex: 1 })} onClick={() => setStep(4)}>Next</button>
        </div>
      </div>)}
      {step === 4 && (<div>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Step 4. Name your Clew (optional)</div>
        <input data-testid="cq-nickname" aria-label="Nickname" placeholder="2-12 letters or numbers" value={nick} maxLength={CLEWQUEST.nickname.max} onChange={(e) => setNick(e.target.value)} style={{ width: "100%", padding: "12px 14px", fontSize: 16, borderRadius: 12, border: "2px solid #CBD5E1", boxSizing: "border-box" }} />
        {err && <div data-testid="cq-builder-error" style={{ color: "#B91C1C", fontWeight: 700, marginTop: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={btn("#64748B")} onClick={() => setStep(3)}>Back</button>
          <button data-testid="cq-save" style={btn("#16A34A", { flex: 1 })} onClick={busy ? undefined : save}>{busy ? "Saving..." : "Save my Clew"}</button>
        </div>
      </div>)}
      {onCancel && <button onClick={onCancel} style={{ background: "none", border: "none", marginTop: 16, color: "#475569", fontWeight: 700, cursor: "pointer" }}>Cancel</button>}
    </div>
  );
}
