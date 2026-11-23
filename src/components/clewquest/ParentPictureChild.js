"use client";
// Parent screens for picture-code children (flag on only): link with the child's one-time 6-digit code, or create a picture-code child
// that is linked at creation. The parent is authenticated by their own password session; no child password or picture code is asked.
import React, { useEffect, useState } from "react";
import { CODE_LENGTH } from "@/lib/clewquest/pictures";
import { PicturePad } from "@/components/clewquest/PictureAuth";
import { cqPost } from "@/lib/clewquest/client";

const inp = { width: "100%", padding: "9px 10px", fontSize: 13, borderRadius: 8, border: "1px solid #CBD5E1", boxSizing: "border-box", marginBottom: 8 };
const btn = { padding: "9px 14px", fontSize: 13, fontWeight: 800, color: "#fff", background: "#4C1D95", border: "none", borderRadius: 10, cursor: "pointer", marginBottom: 8 };

// card: the prominent top "Link my child" card (no children yet, or opened from the emailed link). prefillUser: login ID from ?u=.
export default function ParentPictureChild({ onChildLinked, card, prefillUser }) {
  const [lu, setLu] = useState(""); const [code, setCode] = useState(""); const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  const [cu, setCu] = useState(""); const [cn, setCn] = useState(""); const [a, setA] = useState([]); const [b, setB] = useState([]); const [cmsg, setCmsg] = useState(""); const [open, setOpen] = useState(false);
  useEffect(() => { if (prefillUser) setLu(String(prefillUser).toLowerCase()); }, [prefillUser]);
  async function link() {
    setBusy(true); setMsg("");
    const r = await cqPost("/api/parent/children/link-code", { username: lu.trim(), code: code.trim() });
    setBusy(false);
    if (r.ok && r.child) { onChildLinked && onChildLinked(r.child); setMsg("Linked " + r.child.name + ". They are now in your dashboard."); setLu(""); setCode(""); return; }
    setMsg(r.status === 429 ? "Too many tries. Please wait and ask your child for a new code." : r.status === 503 ? "Linking is not available right now." : "That code did not work. Ask your child for a new code.");
  }
  async function create() {
    setCmsg("");
    if (!/^[a-z0-9_]{3,30}$/.test(cu.trim().toLowerCase())) return setCmsg("Username: 3-30 letters, numbers or _.");
    if (!cn.trim()) return setCmsg("Type your child's name.");
    if (a.length !== CODE_LENGTH || a.join() !== b.join()) { setB([]); return setCmsg("Pick the same 4 pictures twice."); }
    setBusy(true);
    const r = await cqPost("/api/parent/children/picture", { username: cu.trim(), name: cn.trim(), sequence: a });
    setBusy(false);
    if (r.ok && r.child) { onChildLinked && onChildLinked(r.child); setCmsg("Created " + r.child.name + ". They sign in with the 4 pictures."); setCu(""); setCn(""); setA([]); setB([]); return; }
    setCmsg(r.status === 409 ? "That username is taken." : r.status === 429 ? "Too many tries. Please wait." : "Could not create the account.");
  }
  const wrap = card
    ? { background: "#F5F3FF", border: "2px solid #7C3AED", borderRadius: 14, padding: 14, marginBottom: 14 }
    : { marginTop: 10, paddingTop: 10, borderTop: "1px solid #E2E8F0" };
  return (
    <div data-testid="parent-picture-child" style={wrap}>
      {card ? (<>
        <div data-testid="link-my-child-title" style={{ fontSize: 17, fontWeight: 900, color: "#4C1D95", marginBottom: 8 }}>Link my child</div>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>A. My child already made an account: enter their login ID + 6-digit code</div>
        <div style={{ fontSize: 12, color: "#475569", marginBottom: 8 }}>On your child&apos;s screen they tap &quot;Link a parent&quot;. They will see their login ID and 6 numbers (good for 10 minutes).</div>
      </>) : (<>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Link a child who signs in with pictures</div>
        <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>On your child&apos;s screen tap &quot;Link a parent&quot;. Type their login ID and the 6 numbers here.</div>
      </>)}
      <input data-testid="pl-username" style={inp} placeholder="Child's login ID" value={lu} onChange={(e) => setLu(e.target.value)} autoCapitalize="none" />
      <input data-testid="pl-code" style={inp} placeholder="6-digit code" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
      <button data-testid="pl-submit" disabled={busy} style={btn} onClick={link}>Link with code</button>
      {msg && <div data-testid="pl-msg" style={{ fontSize: 12, color: "#475569" }}>{msg}</div>}
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ display: "block", background: "none", border: "none", padding: 0, marginTop: 6, fontWeight: 800, fontSize: 12, color: "#4C1D95", cursor: "pointer" }}>{open ? "− " : "＋ "}{card ? "B. Create my child's account" : "Create a picture-code child"}</button>
      {open && (<div style={{ marginTop: 8 }}>
        <input data-testid="pc-username" style={inp} placeholder="Choose a username" value={cu} onChange={(e) => setCu(e.target.value)} autoCapitalize="none" />
        <input data-testid="pc-name" style={inp} placeholder="Child's name" value={cn} onChange={(e) => setCn(e.target.value)} />
        <PicturePad value={a} onChange={setA} label="Pick 4 pictures in order (their secret code)" />
        {a.length === CODE_LENGTH && <div style={{ marginTop: 10 }}><PicturePad value={b} onChange={setB} label="Pick the same 4 pictures again" /></div>}
        <button data-testid="pc-submit" disabled={busy} style={{ ...btn, marginTop: 10 }} onClick={create}>Create child</button>
        {cmsg && <div data-testid="pc-msg" style={{ fontSize: 12, color: "#475569" }}>{cmsg}</div>}
      </div>)}
    </div>
  );
}
