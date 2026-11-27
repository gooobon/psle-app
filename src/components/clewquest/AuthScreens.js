"use client";
// Pre-login landing, login frame, parent sign-up (step 1), forgot / set-new-password. Tokens only; no emoji.
import React, { useState } from "react";
import { Art } from "./Art";
import AddChild from "./AddChild";
import { serverPost } from "@/lib/serverClient";
import { Page, HeaderBar, LogoBadge, IslandPill, ISLAND_PILLS, Card, Field, Chips, ErrorText, DottedDivider, T, FONT, mainBtn, secondaryBtn, inputStyle, helperStyle, linkBtn } from "./Shell";

const PENDING_PARENT_EMAIL_KEY = "clewquest_pending_parent_email";

export function LandingArt({ height = "60vh", minHeight = 420, pills = true, children }) {
  return (
    <div style={{ position: "relative", height, minHeight, overflow: "hidden", background: "linear-gradient(160deg,#F4EFE6 0%,#E4DDD0 55%,#F1ECE2 100%)" }} data-testid="cq-landing-art">
      <Art priority k="landing/four-islands" alt="Four islands joined by a thread, with the Clew in the middle" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", maxWidth: "none" }} />
      {pills && ISLAND_PILLS.map((p) => <IslandPill key={p.label} {...p} testId={`cq-pill-${p.label.toLowerCase()}`} />)}
      {children}
    </div>
  );
}

// First screen for logged-out visitors.
function LegacyLanding({ onLogin, onSignup }) {
  return (
    <Page testId="cq-prelogin">
      <div style={{ position: "relative" }}>
        <LandingArt>
          <LogoBadge style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)" }} />
        </LandingArt>
        <div style={{ position: "relative", marginTop: -40, padding: "0 16px 28px" }}>
          <div style={{ background: "#fff", borderRadius: 24, borderTop: `2px solid ${T.gold}`, boxShadow: "0 8px 24px rgba(27,35,64,.14)", padding: "24px 20px", textAlign: "center" }}>
            <h1 style={{ margin: 0, fontWeight: 800, fontSize: 24, lineHeight: 1.2, color: T.ink }}>Untangle PSLE. Master the Maze.</h1>
            <div style={{ color: T.muted, marginTop: 8, fontSize: 15 }}>Daily practice for P3 to P6</div>
            <DottedDivider />
            <button data-testid="cq-landing-login" onClick={onLogin} style={{ ...mainBtn(false), marginBottom: 10 }}>Log in</button>
            <button data-testid="cq-landing-signup" onClick={onSignup} style={secondaryBtn}>Sign up</button>
          </div>
          <div style={{ color: T.muted, textAlign: "center", marginTop: 14, fontSize: 14 }}>Parents: Sign up creates your family account</div>
        </div>
      </div>
    </Page>
  );
}

// ---- New labyrinth landing (variant E), behind NEXT_PUBLIC_NEW_LANDING_ENABLED (default off) ----
const NEW_LANDING = process.env.NEXT_PUBLIC_NEW_LANDING_ENABLED === "true";
const NAVY = "#1F3F95", CORAL = "#C8372D", CREAM = "#FBF6EA";
const CX = 195, CY = 126;
const pt = (r, a) => [CX + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
const f = (n) => n.toFixed(1);
// Clockwise (screen) arc on radius r from angle a1 to a2 (degrees, 0 = east, 90 = south).
function arc(r, a1, a2, move = true) {
  const [x1, y1] = pt(r, a1), [x2, y2] = pt(r, a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `${move ? `M${f(x1)} ${f(y1)}` : ""}A${r} ${r} 0 ${large} 1 ${f(x2)} ${f(y2)}`;
}
const RINGS = [{ r: 126, gap: 90 }, { r: 102, gap: 270 }, { r: 78, gap: 90 }, { r: 54, gap: 270 }];
const HALF = 8;
const WALLS = RINGS.map(({ r, gap }) => arc(r, gap + HALF, gap + 360 - HALF)).join("");
const JAMBS = RINGS.flatMap(({ r, gap }) => [gap - HALF, gap + HALF].map((a) => { const [x1, y1] = pt(r - 7, a), [x2, y2] = pt(r + 7, a); return `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`; })).join("");
const THREAD = `M195 264L195 240${arc(114, 90, 270, false)}L195 36${arc(90, 270, 450, false)}L195 192${arc(66, 90, 270, false)}L195 84${arc(42, 270, 450, false)}L195 148`;

function LabyrinthHero() {
  return (
    <div data-testid="cq-landing-hero" style={{ position: "relative", height: 308, background: "radial-gradient(circle at 50% 41%, #FBF6EA 0%, #EDE4D4 60%, #E5D9C4 100%)", overflow: "hidden" }}>
      <svg viewBox="0 0 390 308" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" role="img" aria-label="A winding red thread leads through a maze to a graduation cap" style={{ display: "block" }}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={WALLS} stroke={NAVY} strokeWidth="5" />
          <path d={JAMBS} stroke={NAVY} strokeWidth="4" />
          <path d={THREAD} stroke="#8E241C" strokeWidth="7" opacity=".35" transform="translate(0 1.5)" />
          <path d={THREAD} stroke={CORAL} strokeWidth="5" />
          <path d={THREAD} stroke="#F3C2BD" strokeWidth="1.5" strokeDasharray="2 7" />
        </g>
        <g transform="translate(195 126)">
          <circle r="19" fill={CREAM} />
          <path d="M0 -11L-15 -4L0 3L15 -4Z" fill="#D9A52E" stroke={NAVY} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M-8 -0.5V6C-4 10 4 10 8 6V-0.5L0 3Z" fill={NAVY} />
          <path d="M13 -3V6" stroke={CORAL} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="13" cy="8" r="2" fill={CORAL} />
        </g>
      </svg>
      <div style={{ position: "absolute", top: 14, right: 14, background: CREAM, color: NAVY, border: `1.5px dashed ${CORAL}`, borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 800, letterSpacing: "0.18em" }}>PSLE</div>
    </div>
  );
}

function StitchCard({ testId, onClick, label, children }) {
  return (
    <button data-testid={testId} onClick={onClick} style={{ position: "relative", flex: 1, minHeight: 132, background: "#FFFDF8", border: "none", borderRadius: 18, cursor: "pointer", padding: "16px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FONT, color: "#1B2340" }}>
      <svg aria-hidden="true" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="17" fill="none" stroke={NAVY} strokeWidth="1" />
        <rect x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)" rx="13" fill="none" stroke={CORAL} strokeWidth="1.5" strokeDasharray="5 6" strokeLinecap="round" />
      </svg>
      <svg aria-hidden="true" width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative" }}>{children}</svg>
      <span style={{ position: "relative", fontWeight: 800, fontSize: 17 }}>{label}</span>
    </button>
  );
}

function NewLanding({ onLogin, onSignup }) {
  return (
    <Page testId="cq-prelogin">
      <div style={{ minHeight: "100vh", background: "#F4EEE4" }}>
        <div style={{ position: "relative" }}>
          <LabyrinthHero />
          <div style={{ position: "relative", marginTop: -32, background: CREAM, borderRadius: "32px 32px 0 0", padding: "64px 20px 36px", minHeight: "calc(100vh - 276px)", textAlign: "center" }}>
            <div data-testid="cq-landing-badge" style={{ position: "absolute", top: -48, left: "50%", transform: "translateX(-50%)", width: 98, height: 98, borderRadius: "50%", background: "#FFFDF8", border: `2px dashed ${CORAL}`, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Art priority k="brand/logo-b1" alt="ClewQuest" style={{ width: 68, height: "auto" }} />
            </div>
            <h1 style={{ margin: 0, fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: 28, letterSpacing: "0.12em", color: NAVY }}>CLEWQUEST</h1>
            <div style={{ marginTop: 6, fontSize: 15, color: "#5C564C" }}>The clew that guides you through</div>
            <div style={{ marginTop: 28, fontSize: 17, fontWeight: 700, color: "#1B2340" }}>Who is using ClewQuest today?</div>
            <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
              <StitchCard testId="cq-landing-student" label="Student" onClick={() => onLogin("student")}>
                <path d="M22 12C18 9 11 9 6 11V33C11 31 18 31 22 34C26 31 33 31 38 33V11C33 9 26 9 22 12Z" />
                <path d="M22 12V34" />
                <path d="M11 16C14 15 17 15.5 19 16.5M11 21C14 20 17 20.5 19 21.5" />
              </StitchCard>
              <StitchCard testId="cq-landing-parent" label="Parent" onClick={() => onLogin("parent")}>
                <circle cx="15" cy="10" r="4.5" />
                <path d="M7 36V25C7 20 10 17.5 15 17.5S23 20 23 25V36" />
                <circle cx="32" cy="22" r="3.5" />
                <path d="M26 36V31C26 27.5 28.5 26 32 26S38 27.5 38 31V36" />
              </StitchCard>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 4px 0", color: "#6B6F7B", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
              <div style={{ flex: 1, borderTop: `2px dashed ${CORAL}`, opacity: 0.7 }} />OR<div style={{ flex: 1, borderTop: `2px dashed ${CORAL}`, opacity: 0.7 }} />
            </div>
            <button data-testid="cq-landing-signup" onClick={onSignup} style={{ marginTop: 56, width: "100%", background: NAVY, color: "#fff", border: "none", borderRadius: 999, padding: "16px 20px", fontSize: 17, fontWeight: 800, fontFamily: FONT, cursor: "pointer" }}>Sign up</button>
          </div>
        </div>
      </div>
    </Page>
  );
}

// First screen for logged-out visitors. onLogin(role?) where role is "student" | "parent" (new landing only).
export function PreLoginLanding(props) {
  return NEW_LANDING ? <NewLanding {...props} /> : <LegacyLanding {...props} />;
}

// Login: ~170px strip of the art, logo badge overlapping its bottom edge, white sheet with 24px top radius.
export function LoginFrame({ children, onBack }) {
  return (
    <Page testId="cq-login">
      <div style={{ position: "relative", height: 170, overflow: "hidden" }}>
        <Art priority k="landing/four-islands" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%", display: "block", maxWidth: "none" }} />
        {onBack && <button data-testid="cq-back-landing" onClick={onBack} style={{ ...linkBtn, position: "absolute", top: 10, left: 12, background: "#fff", borderRadius: 8, padding: "5px 10px", color: T.ink, fontSize: 13, boxShadow: "0 2px 8px rgba(27,35,64,.18)" }}>Back</button>}
      </div>
      <div style={{ position: "relative", background: "#fff", borderRadius: "24px 24px 0 0", marginTop: -24, padding: "0 20px 36px", minHeight: "calc(100vh - 146px)", boxShadow: "0 -6px 20px rgba(27,35,64,.08)" }}>
        <LogoBadge size={76} style={{ position: "absolute", top: -38, left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ paddingTop: 48 }}>{children}</div>
      </div>
    </Page>
  );
}

export function ForgotPassword({ onBack, initialEmail = "" }) {
  const [email, setEmail] = useState(initialEmail); const [sent, setSent] = useState(false); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function go() {
    setErr(""); setBusy(true);
    const r = await serverPost("/api/auth/parent/forgot", { email: email.trim() });
    setBusy(false);
    if (r.ok) setSent(true); else setErr(r.status === 429 ? "Too many tries. Please wait a few minutes." : "Please enter a valid email.");
  }
  return (
    <div data-testid="forgot-password">
      <h2 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 24, color: T.ink }}>Reset your password</h2>
      {sent ? <div data-testid="forgot-sent" style={{ color: T.ink, lineHeight: 1.5 }}>If that email has a family account, we sent a link to set a new password. Open it on this device.</div> : (<>
        <Field id="fp-email" label="Email"><input id="fp-email" data-testid="forgot-email" type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoCapitalize="none" /></Field>
        <ErrorText>{err}</ErrorText>
        <button data-testid="forgot-submit" disabled={!email.includes("@") || busy} onClick={go} style={mainBtn(!email.includes("@") || busy)}>{busy ? "Sending..." : "Send reset link"}</button>
      </>)}
      <div style={{ marginTop: 16, textAlign: "center" }}><button onClick={onBack} style={{ ...linkBtn, color: T.primary }}>Back to log in</button></div>
    </div>
  );
}

export function SetNewPassword({ code, onDone }) {
  const [pw, setPw] = useState(""); const [show, setShow] = useState(false); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [ok, setOk] = useState(false);
  async function go() {
    setErr(""); setBusy(true);
    const r = await serverPost("/api/auth/parent/reset", { code, password: pw });
    setBusy(false);
    if (r.ok) setOk(true); else setErr(r.error || "Could not set the password.");
  }
  return (
    <LoginFrame>
      <div data-testid="set-new-password">
        <h2 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: 24, color: T.ink }}>Set a new password</h2>
        {ok ? (<><div style={{ color: T.successText, fontWeight: 700, marginBottom: 14 }}>Password updated.</div><button data-testid="reset-done" onClick={onDone} style={mainBtn(false)}>Log in</button></>) : (<>
          <Field id="np-pw" label="New password" helper="At least 8 characters.">
            <div style={{ position: "relative" }}><input id="np-pw" data-testid="reset-password" type={show ? "text" : "password"} style={{ ...inputStyle, paddingRight: 64 }} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
              <button type="button" onClick={() => setShow((s) => !s)} style={{ ...linkBtn, position: "absolute", right: 12, top: 14, color: T.primary, fontSize: 13 }}>{show ? "Hide" : "Show"}</button></div>
          </Field>
          <ErrorText>{err}</ErrorText>
          <button data-testid="reset-submit" disabled={pw.length < 8 || busy} onClick={go} style={mainBtn(pw.length < 8 || busy)}>{busy ? "Saving..." : "Save password"}</button>
        </>)}
      </div>
    </LoginFrame>
  );
}

export const CONSENT_1 = "I am the parent or guardian, and I agree that the app stores my child's learning progress to run the app.";
export const CONSENT_2 = "I understand there are no purchases in the app. Credits turn into pocket money only when I approve.";
export const CONSENT_3 = "Send me the weekly progress email. (optional)";

function Check({ checked, onChange, children, testId }) {
  return (
    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, fontSize: 14, color: T.ink, lineHeight: 1.4, cursor: "pointer" }}>
      <input data-testid={testId} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ width: 20, height: 20, marginTop: 1, accentColor: T.primary, flexShrink: 0 }} />
      <span>{children}</span>
    </label>
  );
}

// Parent sign-up step 1. `onSignedIn(profile)` is called only when Supabase returns a session straight away (confirmation off).
export function SignupParentStep1({ onSignedIn, onLoginInstead }) {
  const [f, setF] = useState({ name: "", email: "", password: "", rel: "Parent", c1: false, c2: false, c3: false });
  const [show, setShow] = useState(false); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [sent, setSent] = useState(false); const [student, setStudent] = useState(false);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const valid = !!f.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim()) && f.password.length >= 8 && f.c1 && f.c2;
  async function go() {
    setErr(""); setBusy(true);
    const r = await serverPost("/api/auth/parent/signup", { name: f.name.trim(), email: f.email.trim(), password: f.password, relationship: f.rel.toLowerCase(), consent: true, weeklyEmail: f.c3 });
    setBusy(false);
    if (!r.ok) return setErr(r.error || "Sign-up failed.");
    if (r.needsConfirmation) { try { localStorage.setItem(PENDING_PARENT_EMAIL_KEY, f.email.trim().toLowerCase()); } catch {} return setSent(true); }
    onSignedIn && onSignedIn(r.profile);
  }
  if (sent) return (
    <Page testId="cq-signup"><HeaderBar />
      <div style={{ padding: 20 }}><Card testId="check-email" style={{ textAlign: "center", padding: 28 }}>
        <h2 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 24, color: T.ink }}>Check your email</h2>
        <div style={{ color: T.ink, lineHeight: 1.5 }}>We sent a link to <b>{f.email.trim()}</b>. Open it to confirm your address. You will then add your child.</div>
        <div style={{ ...helperStyle, marginTop: 14 }}>Open the link on this device.</div>
        <div style={{ marginTop: 16 }}><button onClick={onLoginInstead} style={{ ...linkBtn, color: T.primary }}>Back to log in</button></div>
      </Card></div>
    </Page>
  );
  return (
    <Page testId="cq-signup"><HeaderBar />
      <div style={{ padding: 20 }}>
        <div style={{ color: T.primary, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Step 1 of 2</div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 26, color: T.ink }}>Create a family account</h1>
        <div style={{ ...helperStyle, fontSize: 15, margin: "6px 0 18px" }}>For parents and guardians. Children join from your account.</div>
        <Field id="su-name" label="Your name"><input id="su-name" data-testid="su-pname" style={inputStyle} placeholder="e.g. Mdm Tan" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></Field>
        <Field id="su-email" label="Email"><input id="su-email" data-testid="su-pemail" type="email" style={inputStyle} placeholder="you@example.com" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" autoCapitalize="none" /></Field>
        <Field id="su-pw" label="Password">
          <div style={{ position: "relative" }}><input id="su-pw" data-testid="su-ppassword" type={show ? "text" : "password"} style={{ ...inputStyle, paddingRight: 64 }} placeholder="At least 8 characters" value={f.password} onChange={(e) => set("password", e.target.value)} autoComplete="new-password" />
            <button type="button" data-testid="su-toggle" onClick={() => setShow((s) => !s)} style={{ ...linkBtn, position: "absolute", right: 12, top: 14, color: T.primary, fontSize: 13 }}>{show ? "Hide" : "Show"}</button></div>
        </Field>
        <Field label="I am the child's"><Chips testId="su-rel" options={["Parent", "Guardian"]} value={f.rel} onChange={(v) => set("rel", v)} /></Field>
        <Check testId="su-c1" checked={f.c1} onChange={(v) => set("c1", v)}>{CONSENT_1}</Check>
        <Check testId="su-c2" checked={f.c2} onChange={(v) => set("c2", v)}>{CONSENT_2}</Check>
        <Check testId="su-c3" checked={f.c3} onChange={(v) => set("c3", v)}>{CONSENT_3}</Check>
        <ErrorText testId="su-error">{err}</ErrorText>
        <button data-testid="su-continue" disabled={!valid || busy} onClick={go} style={{ ...mainBtn(!valid || busy), marginTop: 6 }}>{busy ? "Please wait..." : "Continue"}</button>
        <div style={{ ...helperStyle, fontSize: 12, textAlign: "center", marginTop: 14 }}>We never ask for NRIC, home address, photos or your child&apos;s full name. You can delete your family&apos;s data at any time.</div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button data-testid="su-student" onClick={() => setStudent((s) => !s)} style={{ ...linkBtn, color: T.muted, fontSize: 13, fontWeight: 500 }}>I&apos;m a student</button>
          {student && <div data-testid="su-student-msg" style={{ color: T.ink, fontSize: 14, marginTop: 6 }}>Ask a parent to create your family account.</div>}
        </div>
        <div style={{ textAlign: "center", marginTop: 10 }}><button onClick={onLoginInstead} style={{ ...linkBtn, color: T.primary, fontSize: 14 }}>Back to log in</button></div>
      </div>
    </Page>
  );
}

// Step 2 screen (also reached directly after the email-confirm link when the parent has no children yet).
export function SignupStep2({ onCreated, onDone }) {
  return (
    <Page testId="cq-signup-step2"><HeaderBar />
      <div style={{ padding: 20 }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 26, color: T.ink }}>Add your child</h1>
        <div style={{ ...helperStyle, fontSize: 15, margin: "6px 0 14px" }}>You can add more children later.</div>
        <AddChild step onCreated={onCreated} onDone={onDone} />
      </div>
    </Page>
  );
}
