"use client";
// "Add your child": signup step 2 AND the parent dashboard's Add child form (same component, same styling).
// Picture password when ClewQuest is on; typed password otherwise (old behaviour, server route unchanged apart from extras).
import React, { useState, useEffect, useRef } from "react";
import SchoolCombobox from "@/components/SchoolCombobox";
import { PicturePad } from "./PictureAuth";
import { CODE_LENGTH } from "@/lib/clewquest/pictures";
import { cqGet, cqPost } from "@/lib/clewquest/client";
import { clewquestEnabled } from "@/lib/clewquest/config";
import { serverPost } from "@/lib/serverClient";
import { cleanNamePart, fullName, loginIdProblem, USERNAME_MSG } from "@/lib/supabase/config";
import { Field, Chips, ErrorText, mainBtn, inputStyle, helperStyle, T, FONT } from "./Shell";

export const LEVELS = ["P3", "P4", "P5", "P6"];
export const SUBJECTS = ["English", "Math", "Science"];
export const MOTHER_TONGUES = ["Chinese", "Higher Chinese", "Other / none"];
const suggestFrom = (first) => { const b = cleanNamePart(first).replace(/[^A-Za-z0-9_]/g, "").slice(0, 26); return b ? (b.length < 3 ? b + "01" : b) : ""; };

export default function AddChild({ onCreated, step = false }) {
  const pic = clewquestEnabled();
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
  const pwOk = pic ? a.length === CODE_LENGTH && a.join() === b.join() : f.password.length >= 6;
  const valid = !!cleanNamePart(f.first) && !!f.level && f.subjects.length > 0 && !!f.tongue && state === "available" && pwOk;
  const border = state === "available" ? "#4F8A2B" : state === "taken" ? T.cta : T.border;

  async function submit() {
    setErr(""); setBusy(true);
    const first = cleanNamePart(f.first), last = cleanNamePart(f.last);
    const body = { username, firstName: first, lastName: last, name: fullName(first, last), grade: f.level, school: f.school, subjects: f.subjects, motherTongue: f.tongue };
    const r = pic ? await cqPost("/api/parent/children/picture", { ...body, sequence: a }) : await serverPost("/api/parent/children", { ...body, password: f.password });
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
  }

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
      {pic ? (
        <div style={{ marginBottom: 14 }}>
          <PicturePad value={a} onChange={setA} label={`Pick ${CODE_LENGTH} pictures for your child's secret code`} />
          {a.length === CODE_LENGTH && <div style={{ marginTop: 14 }}><PicturePad value={b} onChange={setB} label="Pick the same pictures again" />{b.length === CODE_LENGTH && a.join() !== b.join() && <ErrorText testId="ac-pic-mismatch">The two picture codes are different. Try again.</ErrorText>}</div>}
        </div>
      ) : (
        <Field id="ac-pw" label="Password" helper="At least 6 characters."><input id="ac-pw" style={inputStyle} type="password" value={f.password} onChange={(e) => set("password", e.target.value)} /></Field>
      )}
      <ErrorText testId="ac-error">{err}</ErrorText>
      <button data-testid="ac-create" disabled={!valid || busy} onClick={submit} style={mainBtn(!valid || busy)}>{busy ? "Adding..." : "Add child"}</button>
      {step && <div style={{ ...helperStyle, textAlign: "center", marginTop: 12 }}>Your child picks their Clew on first log in.</div>}
    </div>
  );
}
