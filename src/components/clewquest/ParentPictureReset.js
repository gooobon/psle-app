"use client";
// Parent dashboard child card: the child's name and Login ID (with Copy) and a "Reset sign-in" sheet.
// Reset, never reveal: codes are stored only as hashes, so the parent picks a NEW picture code (same picker as Add child), confirms it,
// and saves. A child who still has a typed password is switched to pictures after an explicit confirm. The Login ID never changes.
import React, { useState } from "react";
import { CODE_LENGTH } from "@/lib/clewquest/pictures";
import { PicturePad } from "./PictureAuth";
import { cqPost } from "@/lib/clewquest/client";
import { CopyButton, PictureRow } from "./AddChild";
import { Card, ErrorText, mainBtn, secondaryBtn, helperStyle, T } from "./Shell";

export default function ChildCard({ child }) {
  const [step, setStep] = useState("idle"); // idle | switch | pick | confirm | done
  const [a, setA] = useState([]); const [b, setB] = useState([]);
  const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false); const [saved, setSaved] = useState([]); const [confirmed, setConfirmed] = useState(false);
  if (!child) return null;
  const name = child.name || "your child";
  const loginId = child.username || child.id;
  // The server decides: a typed-password child answers 409 needsConfirm, then we ask "{name} will log in with pictures from now on."
  const close = () => { setConfirmed(false); setStep("idle"); setA([]); setB([]); setMsg(""); };
  async function save(confirmSwitch = false) {
    setBusy(true); setMsg("");
    const r = await cqPost("/api/clewquest/picture-reset", { childId: child.serverId, sequence: a, confirmSwitch });
    setBusy(false);
    if (r.ok) { setSaved(a); setA([]); setB([]); setStep("done"); return; }
    if (r.status === 409) { setStep("switch"); return; }
    setStep("pick"); setB([]);
    setMsg(r.status === 403 ? "You can only reset the sign-in of your own child." : r.status === 404 ? "We could not find this child." : r.status === 429 ? "Too many tries. Please wait a while." : r.status === 503 ? "Picture codes are not available right now." : "Could not save the new code. Try again.");
  }
  return (
    <Card testId="child-card" style={{ padding: 16, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: T.ink }}>{name}</div>
          <div style={helperStyle}>Login ID</div>
          <div data-testid="child-login-id" style={{ fontWeight: 800, fontSize: 20, color: T.primary, wordBreak: "break-all" }}>{loginId}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <CopyButton text={loginId} testId="child-copy-id" />
          <button data-testid="reset-signin-open" onClick={() => { setMsg(""); setStep("pick"); }} style={{ ...secondaryBtn, width: "auto", height: 34, padding: "0 14px", fontSize: 13 }}>Reset sign-in</button>
        </div>
      </div>
      {step !== "idle" && (
        <div data-testid="reset-sheet" style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dotted ${T.gold}` }}>
          <div style={{ fontSize: 15, marginBottom: 10 }}>Your child&apos;s login ID is <b>{loginId}</b>. It does not change.</div>
          {step === "switch" && (<>
            <div data-testid="reset-switch-note" style={{ fontSize: 14, marginBottom: 10 }}>{name} will log in with pictures from now on. The old password stops working.</div>
            <div style={{ display: "flex", gap: 8 }}><button style={{ ...secondaryBtn, flex: 1 }} onClick={close}>Cancel</button><button data-testid="reset-switch-yes" disabled={busy} style={{ ...mainBtn(false), flex: 1 }} onClick={() => { setConfirmed(true); save(true); }}>Continue</button></div>
          </>)}
          {step === "pick" && (<>
            <PicturePad value={a} onChange={(v) => { setA(v); setB([]); }} label={`Pick ${CODE_LENGTH} new pictures, in order`} />
            {a.length === CODE_LENGTH && <div style={{ marginTop: 12 }}><PicturePad value={b} onChange={setB} label="Pick the same pictures again" /></div>}
            {b.length === CODE_LENGTH && a.join() !== b.join() && <ErrorText testId="reset-mismatch">The pictures did not match. Try the second set again.</ErrorText>}
            <ErrorText testId="reset-error">{msg}</ErrorText>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...secondaryBtn, flex: 1 }} onClick={close}>Cancel</button>
              <button data-testid="reset-review" disabled={!(a.length === CODE_LENGTH && a.join() === b.join())} style={{ ...mainBtn(!(a.length === CODE_LENGTH && a.join() === b.join())), flex: 1 }} onClick={() => setStep("confirm")}>Review</button>
            </div>
          </>)}
          {step === "confirm" && (<>
            <div style={{ fontSize: 14, marginBottom: 10 }}>These will be {name}&apos;s new pictures. The old code stops working.</div>
            <div data-testid="reset-preview" style={{ marginBottom: 14 }}><PictureRow seq={a} /></div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...secondaryBtn, flex: 1 }} onClick={() => setStep("pick")}>Back</button>
              <button data-testid="reset-save" disabled={busy} style={{ ...mainBtn(busy), flex: 1 }} onClick={busy ? undefined : () => save(confirmed)}>{busy ? "Saving..." : "Save new code"}</button>
            </div>
          </>)}
          {step === "done" && (<>
            <div data-testid="reset-done" style={{ fontSize: 15, fontWeight: 700, color: T.successText, marginBottom: 10 }}>Done. {name} can log in now with {loginId} and these pictures.</div>
            <div style={{ marginBottom: 14 }}><PictureRow seq={saved} /></div>
            <button style={secondaryBtn} onClick={close}>Close</button>
          </>)}
        </div>
      )}
    </Card>
  );
}
