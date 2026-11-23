"use client";
// Parent fallback (flag on only): link a child who already has an account, with the child's one-time 6-digit code.
// Creating a child is done by AddChildForm in ParentDashboard. The parent is authenticated by their own password session.
import React, { useState } from "react";
import { cqPost } from "@/lib/clewquest/client";

const inp = { width: "100%", padding: "9px 10px", fontSize: 13, borderRadius: 8, border: "1px solid #CBD5E1", boxSizing: "border-box", marginBottom: 8 };
const btn = { padding: "9px 14px", fontSize: 13, fontWeight: 800, color: "#fff", background: "#4C1D95", border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 8 };

export default function ParentPictureChild({ onChildLinked }) {
  const [lu, setLu] = useState(""); const [code, setCode] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function link() {
    setBusy(true); setMsg("");
    const r = await cqPost("/api/parent/children/link-code", { username: lu.trim(), code: code.trim() });
    setBusy(false);
    if (r.ok && r.child) { onChildLinked && onChildLinked(r.child); setMsg("Linked " + r.child.name + "."); setLu(""); setCode(""); return; }
    setMsg(r.status === 429 ? "Too many tries. Please wait and ask your child for a new code." : r.status === 503 ? "Linking is not available right now." : "That code did not work. Ask your child for a new code.");
  }
  return (
    <div data-testid="parent-picture-child" style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #E2E8F0" }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Link a child who already has an account</div>
      <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>On your child&apos;s screen tap &quot;Link a parent&quot;. Type their login ID and the 6 numbers here.</div>
      <input data-testid="pl-username" style={inp} placeholder="Child's login ID" value={lu} onChange={(e) => setLu(e.target.value)} autoCapitalize="none" />
      <input data-testid="pl-code" style={inp} placeholder="6-digit code" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
      <button data-testid="pl-submit" disabled={busy} style={btn} onClick={link}>Link with code</button>
      {msg && <div data-testid="pl-msg" style={{ fontSize: 12, color: "#475569" }}>{msg}</div>}
    </div>
  );
}
