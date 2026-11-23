"use client";
// Picture-code child: ask for a one-time 6-digit code (10 minutes) and read it out to a parent, who types it on the parent link screen.
import React, { useState } from "react";
import { cqPost } from "@/lib/clewquest/client";

export default function LinkCode({ style }) {
  const [code, setCode] = useState(null); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function get() {
    setBusy(true); setErr("");
    const r = await cqPost("/api/clewquest/link-code");
    setBusy(false);
    if (r.ok && r.code) return setCode(r.code);
    setErr(r.status === 429 ? "Too many codes. Wait a few minutes and try again." : "Could not make a code right now. Try again later.");
  }
  return (
    <div data-testid="cq-linkcode" style={{ background: "#fff", border: "2px solid #1E3A6E", borderRadius: 14, padding: 12, textAlign: "center", ...style }}>
      {!code ? (<>
        <div style={{ fontSize: 14, color: "#334155", marginBottom: 8 }}>A parent can follow your practice. Get a code and show it to them.</div>
        <button data-testid="cq-linkcode-get" onClick={busy ? undefined : get} style={{ padding: "10px 14px", fontWeight: 800, borderRadius: 12, border: "none", background: "#1E3A6E", color: "#fff", cursor: "pointer" }}>{busy ? "Making code..." : "Get a code for my parent"}</button>
      </>) : (<>
        <div style={{ fontSize: 14, color: "#334155" }}>Tell your parent these 6 numbers:</div>
        <div data-testid="cq-linkcode-value" style={{ fontSize: 36, fontWeight: 900, letterSpacing: 6, margin: "6px 0" }}>{code}</div>
        <div style={{ fontSize: 13, color: "#475569" }}>It works once and stops working in 10 minutes. Your parent types it with your username.</div>
      </>)}
      {err && <div data-testid="cq-linkcode-error" style={{ color: "#B91C1C", fontWeight: 700, marginTop: 6 }}>{err}</div>}
    </div>
  );
}
