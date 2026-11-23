"use client";
// Picture-code child: get a one-time 6-digit code (10 minutes), see their login ID and the steps for the parent, and optionally
// email it to the parent (the server sends it; the address is not stored). The parent types login ID + code on "Link my child".
import React, { useEffect, useState } from "react";
import { cqPost } from "@/lib/clewquest/client";

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const btn = { padding: "10px 14px", fontWeight: 800, borderRadius: 12, border: "none", background: "#1E3A6E", color: "#fff", cursor: "pointer" };

export default function LinkCode({ style, username }) {
  const [code, setCode] = useState(null); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const [endsAt, setEndsAt] = useState(0); const [left, setLeft] = useState(0);
  const [email, setEmail] = useState(""); const [mailBusy, setMailBusy] = useState(false); const [mailMsg, setMailMsg] = useState(""); const [mailOk, setMailOk] = useState(false);
  useEffect(() => {
    if (!endsAt) return undefined;
    const tick = () => setLeft(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  async function get() {
    setBusy(true); setErr(""); setMailMsg(""); setMailOk(false);
    const r = await cqPost("/api/clewquest/link-code");
    setBusy(false);
    if (r.ok && r.code) { setCode(r.code); setEndsAt(Date.now() + (r.expiresInSecs || 600) * 1000); return; }
    setErr(r.status === 429 ? "Too many codes. Wait a few minutes and try again." : "Could not make a code right now. Try again later.");
  }
  async function sendMail() {
    setMailBusy(true); setMailMsg(""); setMailOk(false);
    const r = await cqPost("/api/clewquest/link-code/email", { code, email: email.trim() });
    setMailBusy(false);
    if (r.ok) { setMailOk(true); setMailMsg("Sent! Ask your parent to check their email."); return; }
    setMailMsg(r.status === 410 ? "This code has expired. Get a new code." : r.status === 429 ? "You sent enough emails for now. Show your parent the numbers instead." : r.status === 400 ? "Type your parent's email address." : "Email is not available right now. Show your parent the 6 numbers instead.");
  }
  const expired = !!code && left <= 0;
  return (
    <div data-testid="cq-linkcode" style={{ background: "#fff", border: "2px solid #1E3A6E", borderRadius: 14, padding: 12, textAlign: "center", ...style }}>
      {!code ? (<>
        <div style={{ fontSize: 14, color: "#334155", marginBottom: 8 }}>A parent can follow your practice. Get a code and show it to them.</div>
        <button data-testid="cq-linkcode-get" onClick={busy ? undefined : get} style={btn}>{busy ? "Making code..." : "Get a code for my parent"}</button>
      </>) : (<>
        <div style={{ fontSize: 14, color: "#334155" }}>Your 6 numbers:</div>
        <div data-testid="cq-linkcode-value" style={{ fontSize: 36, fontWeight: 900, letterSpacing: 6, margin: "6px 0", opacity: expired ? 0.35 : 1 }}>{code}</div>
        <div style={{ fontSize: 14, color: "#334155" }}>Your login ID: <b data-testid="cq-linkcode-username" style={{ fontSize: 18 }}>{username || ""}</b></div>
        <div data-testid="cq-linkcode-timer" style={{ fontSize: 13, fontWeight: 800, margin: "8px 0", color: expired ? "#B91C1C" : "#475569" }}>{expired ? "This code has expired." : `Works once. Time left: ${mmss(left)}`}</div>
        <ol data-testid="cq-linkcode-steps" style={{ textAlign: "left", fontSize: 13, color: "#334155", margin: "6px 0 10px", paddingLeft: 20, lineHeight: 1.5 }}>
          <li>Your parent logs in at clewquest.com (Parent tab).</li>
          <li>They tap <b>Link my child</b>.</li>
          <li>They type your login ID and these 6 numbers.</li>
        </ol>
        <button data-testid="cq-linkcode-new" onClick={busy ? undefined : get} style={{ ...btn, background: expired ? "#1E3A6E" : "#475569" }}>{busy ? "Making code..." : "Get a new code"}</button>
        {!expired && (<div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #E2E8F0", textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#334155", marginBottom: 6 }}>Send to my parent&apos;s email</div>
          <input data-testid="cq-linkcode-email" type="email" inputMode="email" autoCapitalize="none" placeholder="Parent's email" value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "9px 10px", fontSize: 14, borderRadius: 8, border: "1px solid #CBD5E1", marginBottom: 8 }} />
          <button data-testid="cq-linkcode-send" disabled={mailBusy || !email.trim()} onClick={sendMail} style={{ ...btn, opacity: mailBusy || !email.trim() ? 0.6 : 1 }}>{mailBusy ? "Sending..." : "Send to my parent's email"}</button>
          {mailMsg && <div data-testid="cq-linkcode-mailmsg" style={{ fontSize: 13, fontWeight: 700, marginTop: 6, color: mailOk ? "#166534" : "#B91C1C" }}>{mailMsg}</div>}
        </div>)}
      </>)}
      {err && <div data-testid="cq-linkcode-error" style={{ color: "#B91C1C", fontWeight: 700, marginTop: 6 }}>{err}</div>}
    </div>
  );
}
