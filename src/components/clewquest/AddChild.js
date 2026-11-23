"use client";
// "Add your child": signup step 2 AND the parent dashboard's Add child form (same component, same styling).
// Picture password when ClewQuest is on; typed password otherwise (old behaviour, server route unchanged apart from extras).
import React, { useState, useEffect, useRef } from "react";
import SchoolCombobox from "@/components/SchoolCombobox";
import { PicturePad } from "./PictureAuth";
import { PictureIcon } from "./PictureIcon";
import { CODE_LENGTH, PICTURES } from "@/lib/clewquest/pictures";
import { cqGet, cqPost } from "@/lib/clewquest/client";
import { cleanNamePart, fullName, loginIdProblem, USERNAME_MSG } from "@/lib/supabase/config";
import { Field, Chips, ErrorText, Card, mainBtn, secondaryBtn, inputStyle, helperStyle, T, FONT } from "./Shell";

export const LEVELS = ["P3", "P4", "P5", "P6"];
export const SUBJECTS = ["English", "Math", "Science"];
export const MOTHER_TONGUES = ["Chinese", "Higher Chinese", "Other / none"];
const suggestFrom = (first) => { const b = cleanNamePart(first).replace(/[^A-Za-z0-9_]/g, "").slice(0, 26); return b ? (b.length < 3 ? b + "01" : b) : ""; };

export function CopyButton({ text, testId = "copy-id" }) {
  const [done, setDone] = useState(false);
  return <button type="button" data-testid={testId} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(text); } catch {} setDone(true); setTimeout(() => setDone(false), 1500); }} style={{ ...secondaryBtn, width: "auto", height: 34, padding: "0 14px", fontSize: 13 }}>{done ? "Copied" : "Copy"}</button>;
}
export function PictureRow({ seq, size = 44 }) {
  return <div data-testid="pic-row" style={{ display: "flex", gap: 10, justifyContent: "center" }}>{seq.map((i, n) => (
    <span key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><PictureIcon k={PICTURES[i].key} size={size} /><span style={{ fontSize: 11, fontWeight: 800 }}>{n + 1}. {PICTURES[i].label}</span></span>
  ))}</div>;
}

// Step 2 / Add child. One server call creates the auth user (picture-code password), the profile and the parent link, with full rollback.
// On success it shows "{First name} is ready!" with the login ID and the chosen pictures; the buttons are Add another child / Go to dashboard.
export default function AddChild({ onCreated, onAnother, onDone, step = false }) {
  const [made, setMade] = useState(null);
  const [f, setF] = useState({ first: "", last: "", level: "", subjects: [], tongue: "", school: "", username: "", password: "" });
  const [touched, setTouched] = useState(false);
  const [a, setA] = useState([]); const [b, setB] = useState([]);
  const [avail, setAvail] = useState({ key: "", state: "", suggestions: [], message: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const username = f.username.trim();
  const problem = loginIdProblem(f.username);
  const timer = useRef(null);

  function setFirst(v) { setF((p) => ({ ...p, first: v, ...(touched ? {} : { username: suggestFrom(v) }) })); }
  // Live check, 0.4s debounce. Bad format is shown immediately (no request).
  useEffect(() => {
    clearTimeout(timer.current);
    if (!username || problem) return undefined;
    timer.current = setTimeout(async () => {
      const r = await cqGet("/api/auth/username-available?u=" + encodeURIComponent(username));
      setAvail({ key: username, state: r.ok ? r.state : "error", suggestions: r.suggestions || [], message: r.message || "" });
    }, 400);
    return () => clearTimeout(timer.current);
  }, [username, problem]);
  const cur = avail.key === username ? avail.state : "";
  const state = !username ? "" : problem ? "bad" : cur || "checking";
  const pwOk = a.length === CODE_LENGTH && a.join() === b.join();
  const valid = !!cleanNamePart(f.first) && !!f.level && f.subjects.length > 0 && !!f.tongue && state === "available" && pwOk;
  const border = state === "available" ? "#4F8A2B" : state === "taken" ? T.cta : T.border;

  async function submit() {
    setErr(""); setBusy(true);
    const first = cleanNamePart(f.first), last = cleanNamePart(f.last);
    const body = { username, firstName: first, lastName: last, name: fullName(first, last), grade: f.level, school: f.school, subjects: f.subjects, motherTongue: f.tongue };
    const r = await cqPost("/api/parent/children/picture", { ...body, sequence: a });
    setBusy(false);
    if (!r.ok) {
      if (r.status === 409) { // 23505: someone took it meanwhile. Show Taken plus new suggestions.
        const c = await cqGet("/api/auth/username-available?u=" + encodeURIComponent(username));
        setAvail({ key: username, state: "taken", suggestions: c.suggestions || [], message: "" });
        return;
      }
      return setErr(r.error || "Could not add your child. Try again.");
    }
    onCreated && onCreated(r.child);
    setMade({ child: r.child, first, seq: a });
  }
  function another() { setF({ first: "", last: "", level: "", subjects: [], tongue: "", school: "", username: "", password: "" }); setTouched(false); setA([]); setB([]); setAvail({ key: "", state: "", suggestions: [], message: "" }); setMade(null); onAnother && onAnother(); }

  if (made) return (
    <div data-testid="child-ready" style={{ textAlign: "center" }}>
      <Card style={{ padding: 22 }}>
        <h2 style={{ margin: "0 0 10px", fontSize: 24, fontWeight: 800 }}>{made.first} is ready!</h2>
        <div style={helperStyle}>Login ID</div>
        <div data-testid="ready-username" style={{ fontSize: 30, fontWeight: 800, color: T.primary, margin: "2px 0 8px", wordBreak: "break-all" }}>{made.child.username}</div>
        <CopyButton text={made.child.username} />
        <div style={{ margin: "18px 0 6px", ...helperStyle }}>Pictures, in order</div>
        <PictureRow seq={made.seq} />
        <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.5 }}>Your child signs in on the <b>Student</b> tab with this login ID and these pictures.</p>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        <button data-testid="ready-another" onClick={another} style={secondaryBtn}>Add another child</button>
        <button data-testid="ready-dashboard" onClick={() => onDone && onDone(made.child)} style={mainBtn(false)}>Go to dashboard</button>
      </div>
    </div>
  );

  return (
    <div data-testid="add-child">
      {step && <div style={{ color: T.primary, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Step 2 of 2</div>}
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}><Field id="ac-first" label="First name"><input id="ac-first" data-testid="ac-first" style={inputStyle} value={f.first} onChange={(e) => setFirst(e.target.value)} autoComplete="off" /></Field></div>
        <div style={{ flex: 1 }}><Field id="ac-last" label="Last name"><input id="ac-last" data-testid="ac-last" style={inputStyle} value={f.last} onChange={(e) => set("last", e.target.value)} autoComplete="off" /></Field></div>
      </div>
      <Field label="Level"><Chips testId="ac-level" options={LEVELS} value={f.level} onChange={(v) => set("level", v)} /></Field>
      <Field label="Subjects"><Chips testId="ac-subjects" multi options={SUBJECTS} value={f.subjects} onChange={(v) => set("subjects", v)} /></Field>
      <Field label="Mother Tongue"><Chips testId="ac-tongue" options={MOTHER_TONGUES} value={f.tongue} onChange={(v) => set("tongue", v)} /></Field>
      <Field label="School (optional)"><SchoolCombobox value={f.school} onChange={(v) => set("school", v)} border={T.border} placeholder="Helps pick familiar exam papers" /></Field>
      <Field id="ac-username" label="Login username"
        helper={<>{USERNAME_MSG.replace("Login ID", "Username")}. Capital letters are fine: Aquacat01 and aquacat01 count as the same. You can change it later.</>}>
        <input id="ac-username" data-testid="ac-username" style={{ ...inputStyle, borderColor: border }} value={f.username} onChange={(e) => { setTouched(true); set("username", e.target.value); }} autoCapitalize="none" autoCorrect="off" spellCheck={false} />
        <div aria-live="polite" style={{ marginTop: 6, fontSize: 13, fontWeight: 700 }}>
          {state === "checking" && <span data-testid="ac-status" style={{ color: T.muted }}>Checking...</span>}
          {state === "available" && <span data-testid="ac-status" style={{ color: T.successText }}>✓ Available</span>}
          {state === "bad" && <span data-testid="ac-status" style={{ color: T.error }}>{problem}</span>}
          {state === "reserved" && <span data-testid="ac-status" style={{ color: T.error }}>Please choose a different username.</span>}
          {state === "bad_format" && <span data-testid="ac-status" style={{ color: T.error }}>{avail.message || USERNAME_MSG}</span>}
          {state === "error" && <span data-testid="ac-status" style={{ color: T.error }}>Could not check. Try again.</span>}
          {state === "taken" && (<>
            <span data-testid="ac-status" style={{ color: T.cta }}>✗ Taken. Try one of these:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {avail.suggestions.slice(0, 3).map((s) => <button key={s} type="button" data-testid="ac-suggest" onClick={() => { setTouched(true); set("username", s); }} style={{ padding: "7px 14px", borderRadius: 999, border: `1.5px dashed ${T.primary}`, background: "#fff", color: T.primary, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>{s}</button>)}
            </div>
          </>)}
        </div>
      </Field>
      <div style={{ marginBottom: 14 }}>
          <PicturePad value={a} onChange={setA} label={`Pick ${CODE_LENGTH} pictures for your child's secret code`} />
          {a.length === CODE_LENGTH && <div style={{ marginTop: 14 }}><PicturePad value={b} onChange={setB} label="Pick the same pictures again" />{b.length === CODE_LENGTH && a.join() !== b.join() && <ErrorText testId="ac-pic-mismatch">The two picture codes are different. Try again.</ErrorText>}</div>}
      </div>
      <ErrorText testId="ac-error">{err}</ErrorText>
      <button data-testid="ac-create" disabled={!valid || busy} onClick={submit} style={mainBtn(!valid || busy)}>{busy ? "Adding..." : "Add child"}</button>
      {step && <div style={{ ...helperStyle, textAlign: "center", marginTop: 12 }}>Your child picks their Clew on first log in.</div>}
    </div>
  );
}
