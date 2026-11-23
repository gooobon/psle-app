"use client";
// Parent screen: set a new picture code for a child who signs in with pictures. Behind the ClewQuest flag (the parent dashboard only
// renders this when the flag and server auth are on). Idle -> pick 4 pictures -> confirm -> saved. The server only accepts a parent
// who is linked to the child (parent_child), and only for a child account that uses a picture code. English only.
import React, { useState } from "react";
import { PICTURES, CODE_LENGTH } from "@/lib/clewquest/pictures";
import { PicturePad } from "@/components/clewquest/PictureAuth";
import { cqPost } from "@/lib/clewquest/client";

const card = { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, marginBottom: 14 };
const btn = (bg, fg = "#fff") => ({ padding: "9px 14px", fontSize: 13, fontWeight: 800, color: fg, background: bg, border: bg === "#fff" ? "1px solid #CBD5E1" : "none", borderRadius: 10, cursor: "pointer" });

export default function ParentPictureReset({ child }) {
  const [step, setStep] = useState("idle"); // idle | pick | confirm | done
  const [seq, setSeq] = useState([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  if (!child || !child.serverId) return null;
  const name = child.name || "your child";
  const reset = () => { setStep("idle"); setSeq([]); };
  async function save() {
    setBusy(true); setMsg("");
    const r = await cqPost("/api/clewquest/picture-reset", { childId: child.serverId, sequence: seq });
    setBusy(false);
    if (r.ok) { setStep("done"); setSeq([]); return; }
    setStep("pick");
    setMsg(r.status === 403 ? "You can only reset the code of your own child." : r.status === 409 ? `${name} does not sign in with a picture code.` : r.status === 503 ? "Picture codes are not available right now." : "Could not save the new code. Please try again.");
  }
  return (
    <div data-testid="picture-reset" style={card}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#4C1D95", marginBottom: 4 }}>{name}&apos;s picture code</div>
      {step === "idle" && (<>
        <div style={{ fontSize: 11, color: "#64748B", marginBottom: 8, lineHeight: 1.5 }}>If {name} forgot the picture code or is locked out, you can set a new one. The old code stops working.</div>
        <button data-testid="picture-reset-start" style={btn("#4C1D95")} onClick={() => { setMsg(""); setStep("pick"); }}>Reset picture code</button>
      </>)}
      {step === "pick" && (<>
        <PicturePad value={seq} onChange={setSeq} label="Pick the new 4 pictures, in order" />
        {msg && <div data-testid="picture-reset-error" style={{ color: "#B91C1C", fontWeight: 700, fontSize: 12, marginTop: 8 }}>{msg}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button style={btn("#fff", "#334155")} onClick={reset}>Cancel</button>
          {seq.length === CODE_LENGTH && <button data-testid="picture-reset-review" style={btn("#4C1D95")} onClick={() => setStep("confirm")}>Review</button>}
        </div>
      </>)}
      {step === "confirm" && (<>
        <div style={{ fontSize: 13, marginBottom: 8 }}>Replace {name}&apos;s picture code with these 4 pictures? The old code will stop working.</div>
        <div data-testid="picture-reset-preview" style={{ fontSize: 34, marginBottom: 10 }}>{seq.map((i) => PICTURES[i].glyph).join(" ")}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={btn("#fff", "#334155")} onClick={() => setStep("pick")}>Back</button>
          <button data-testid="picture-reset-confirm" style={btn("#4C1D95")} onClick={busy ? undefined : save}>{busy ? "Saving..." : "Yes, save new code"}</button>
        </div>
      </>)}
      {step === "done" && (<>
        <div data-testid="picture-reset-done" style={{ fontSize: 13, color: "#065F46", fontWeight: 700, marginBottom: 8 }}>Done. {name}&apos;s new picture code is saved. {name} can sign in with it now.</div>
        <button style={btn("#fff", "#334155")} onClick={reset}>Close</button>
      </>)}
    </div>
  );
}
