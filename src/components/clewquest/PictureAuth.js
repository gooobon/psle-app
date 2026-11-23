"use client";
// ClewQuest picture-code sign-up and login (students). Parents keep their normal email/password login.
import React, { useState } from "react";
import { PICTURES, CODE_LENGTH } from "@/lib/clewquest/pictures";
import { cqPost } from "@/lib/clewquest/client";

const wrap = { display: "flex", flexDirection: "column", gap: 14 };
const field = { width: "100%", padding: "12px 14px", fontSize: 16, borderRadius: 12, border: "2px solid #CBD5E1", boxSizing: "border-box" };
const btn = (bg) => ({ width: "100%", padding: "14px 16px", fontSize: 16, fontWeight: 800, color: "#fff", background: bg, border: "none", borderRadius: 14, cursor: "pointer" });

export function PicturePad({ value, onChange, label }) {
  return (
    <div>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>{label}</div>
      <div data-testid="pic-dots" aria-label={`${value.length} of ${CODE_LENGTH} chosen`} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {Array.from({ length: CODE_LENGTH }).map((_, i) => <span key={i} style={{ width: 16, height: 16, borderRadius: 8, background: i < value.length ? "#1E3A6E" : "#CBD5E1" }} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {PICTURES.map((p, i) => (
          <button key={p.key} type="button" data-testid={`pic-${i}`} aria-label={p.label} onClick={() => value.length < CODE_LENGTH && onChange([...value, i])}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 0 8px", background: "#fff", border: "2px solid #CBD5E1", borderRadius: 16, cursor: "pointer" }}>
            <span aria-hidden="true" style={{ fontSize: 34, lineHeight: 1 }}>{p.glyph}</span>
            <span data-testid={`pic-label-${i}`} style={{ fontSize: 12, fontWeight: 800, color: "#334155" }}>{p.label}</span>
          </button>
        ))}
      </div>
      <button type="button" data-testid="pic-clear" onClick={() => onChange([])} style={{ marginTop: 10, background: "none", border: "none", color: "#475569", fontWeight: 700, cursor: "pointer" }}>Clear</button>
    </div>
  );
}

export function PictureLogin({ onDone, onBack }) {
  const [username, setU] = useState(""); const [seq, setSeq] = useState([]); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function go() {
    setErr("");
    if (!username.trim()) return setErr("Type your username.");
    if (seq.length !== CODE_LENGTH) return setErr("Tap 4 pictures.");
    setBusy(true);
    const r = await cqPost("/api/auth/student/picture-login", { username: username.trim(), sequence: seq });
    setBusy(false);
    if (r.ok && r.profile) return onDone(r.profile);
    setSeq([]);
    setErr(r.status === 429 ? "Ask a parent to help you sign in." : "That did not work. Try again.");
  }
  return (
    <div style={wrap}>
      <button onClick={onBack} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontWeight: 700, color: "#475569" }}>Back</button>
      <div style={{ fontWeight: 900, fontSize: 22 }}>Sign in with pictures</div>
      <input data-testid="pic-username" aria-label="Username" placeholder="Username" value={username} onChange={(e) => setU(e.target.value)} autoCapitalize="none" style={field} />
      <PicturePad value={seq} onChange={setSeq} label="Tap your 4 pictures in order" />
      {err && <div data-testid="pic-error" style={{ color: "#B91C1C", fontWeight: 700 }}>{err}</div>}
      <button data-testid="pic-submit" style={btn("#1E3A6E")} onClick={busy ? undefined : go}>{busy ? "Signing in..." : "Sign in"}</button>
    </div>
  );
}

export function PictureSignup({ onDone, onBack }) {
  const [username, setU] = useState(""); const [name, setName] = useState("");
  const [step, setStep] = useState(1); const [a, setA] = useState([]); const [b, setB] = useState([]);
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  function next() {
    setErr("");
    if (!/^[a-z0-9_]{3,30}$/.test(username.trim().toLowerCase())) return setErr("Username: 3-30 letters, numbers or _.");
    if (!name.trim()) return setErr("Type your name.");
    setStep(2);
  }
  async function create() {
    setErr("");
    if (a.length !== CODE_LENGTH || b.length !== CODE_LENGTH) return setErr("Pick 4 pictures, twice.");
    if (a.join() !== b.join()) { setB([]); return setErr("The two picture codes are different. Try the second one again."); }
    setBusy(true);
    const r = await cqPost("/api/auth/student/picture-signup", { username: username.trim(), name: name.trim(), sequence: a });
    setBusy(false);
    if (r.ok && r.profile) return onDone(r.profile);
    setErr(r.status === 409 ? "That username is taken. Pick another." : r.status === 429 ? "Too many tries. Ask a parent to help." : "Could not create the account.");
    if (r.status === 409) setStep(1);
  }
  return (
    <div style={wrap}>
      <button onClick={onBack} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontWeight: 700, color: "#475569" }}>Back</button>
      <div style={{ fontWeight: 900, fontSize: 22 }}>Create your account</div>
      {step === 1 && (<>
        <input data-testid="su-username" aria-label="Username" placeholder="Choose a username" value={username} onChange={(e) => setU(e.target.value)} autoCapitalize="none" style={field} />
        <input data-testid="su-name" aria-label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={field} />
        {err && <div data-testid="su-error" style={{ color: "#B91C1C", fontWeight: 700 }}>{err}</div>}
        <button data-testid="su-next" style={btn("#1E3A6E")} onClick={next}>Next</button>
      </>)}
      {step === 2 && (<>
        <PicturePad value={a} onChange={setA} label="Pick 4 pictures in order. This is your secret code." />
        {a.length === CODE_LENGTH && <button data-testid="su-next2" style={btn("#1E3A6E")} onClick={() => { setErr(""); setStep(3); }}>Next</button>}
      </>)}
      {step === 3 && (<>
        <PicturePad value={b} onChange={setB} label="Pick the same 4 pictures again" />
        {err && <div data-testid="su-error" style={{ color: "#B91C1C", fontWeight: 700 }}>{err}</div>}
        <button data-testid="su-create" style={btn("#1E3A6E")} onClick={busy ? undefined : create}>{busy ? "Creating..." : "Create account"}</button>
      </>)}
    </div>
  );
}
