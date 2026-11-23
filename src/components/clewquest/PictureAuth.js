"use client";
// ClewQuest picture-code sign-up and login (students). Parents keep their normal email/password login.
import React, { useState } from "react";
import { PICTURES, CODE_LENGTH, codeCopy } from "@/lib/clewquest/pictures";
import { cqPost } from "@/lib/clewquest/client";

import { PictureIcon } from "./PictureIcon";
import { T, FONT, mainBtn, inputStyle } from "@/lib/theme/tokens";
import { Dots, ErrorText } from "./Shell";
const wrap = { display: "flex", flexDirection: "column", gap: 14 };
const field = inputStyle;

// Picture pad: 3x3 square cream tiles with a 2px border in the picture's colour. Selected tiles get a gold border and a gold order badge.
export function PicturePad({ value, onChange, label }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: T.ink }}>{label}</span>
        <Dots n={value.length} total={CODE_LENGTH} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {PICTURES.map((p, i) => {
          const orders = value.map((v, n) => (v === i ? n + 1 : 0)).filter(Boolean);
          const sel = orders.length > 0;
          return (
            <button key={p.key} type="button" data-testid={`pic-${i}`} aria-label={p.label} onClick={() => value.length < CODE_LENGTH && onChange([...value, i])}
              style={{ position: "relative", aspectRatio: "1 / 1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, background: T.tile, border: `2px solid ${sel ? T.gold : p.colour}`, borderRadius: 16, cursor: "pointer", padding: 4, fontFamily: FONT }}>
              {sel && <span data-testid={`pic-order-${i}`} style={{ position: "absolute", top: 5, right: 5, minWidth: 22, height: 22, borderRadius: 11, background: T.gold, color: "#fff", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", boxSizing: "border-box" }}>{orders.join(",")}</span>}
              <PictureIcon k={p.key} size={60} />
              <span data-testid={`pic-label-${i}`} style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{p.label}</span>
            </button>
          );
        })}
      </div>
      <button type="button" data-testid="pic-clear" onClick={() => onChange([])} style={{ marginTop: 10, background: "none", border: "none", color: T.muted, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>Clear</button>
    </div>
  );
}

// Student tab body: Username, picture pad, Log in. Embedded in the login sheet (no own title or Back).
export function PictureLogin({ onDone, onUsePassword }) {
  const [username, setU] = useState(""); const [seq, setSeq] = useState([]); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [locked, setLocked] = useState(false);
  const ready = !!username.trim() && seq.length === CODE_LENGTH;
  async function go() {
    setErr(""); setLocked(false);
    if (username.includes("@")) return setErr("Parents: please use the Parent tab");
    if (!ready) return;
    setBusy(true);
    const r = await cqPost("/api/auth/student/picture-login", { username: username.trim(), sequence: seq });
    setBusy(false);
    if (r.ok && r.profile) return onDone(r.profile);
    setSeq([]);
    setLocked(r.status === 429);
    setErr(r.status === 429 ? "Locked for 15 minutes." : "That did not work. Try again.");
  }
  return (
    <div style={wrap}>
      <div>
        <label htmlFor="pic-username" style={{ display: "block", fontWeight: 600, fontSize: 14, color: T.ink, marginBottom: 6 }}>Username</label>
        <input id="pic-username" data-testid="pic-username" placeholder="Your username" value={username} onChange={(e) => setU(e.target.value)} autoCapitalize="none" autoCorrect="off" spellCheck={false} style={field} />
      </div>
      <PicturePad value={seq} onChange={setSeq} label={codeCopy()} />
      <ErrorText testId="pic-error">{err}</ErrorText>
      {locked && (<div data-testid="pic-locked" style={{ background: "#FBF1D6", color: T.ink, borderRadius: 12, padding: 12, fontSize: 14, lineHeight: 1.5 }}>
        <b>Ask a parent to reset your picture code.</b> They log in on their own account and pick new pictures for you. You can log in again right away.<br />
        No parent linked yet? Wait 15 minutes and log in. Then tap &quot;Link a parent&quot; to get 6 numbers, and give them to a parent.
      </div>)}
      <button data-testid="pic-submit" disabled={!ready || busy} style={mainBtn(!ready || busy)} onClick={go}>{busy ? "Logging in..." : "Log in"}</button>
      <div style={{ textAlign: "center", color: T.muted, fontSize: 13 }}>Forgot your pictures? Ask a parent to reset them.</div>
      {onUsePassword && <button type="button" data-testid="use-password" onClick={onUsePassword} style={{ background: "none", border: "none", color: T.muted, fontSize: 13, textDecoration: "underline", cursor: "pointer", fontFamily: FONT }}>Use a password instead</button>}
    </div>
  );
}
