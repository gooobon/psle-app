"use client";
// ClewQuest student shell: builder -> four-island landing -> Clew home. Practice screens are the EXISTING ones (renderPractice);
// nothing here is ever rendered on solve / question / marking screens.
import React, { useCallback, useEffect, useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { stageFromTotal, stageAssetKey, questGrade, subjectsFor } from "@/lib/clewquest/logic";
import { Art, ASSET_KEYS } from "./Art";
import CharacterBuilder from "./CharacterBuilder";
import LinkCode from "./LinkCode";
import { cqGet, cacheCharacter, readCachedCharacter, takeLastAward } from "@/lib/clewquest/client";

// Hotspots as percent of the landing image box (864x1184). Tune against the art.
const HOTSPOTS = [
  { key: "english", x: 3, y: 15, w: 40, h: 26 },
  { key: "chinese", x: 3, y: 61, w: 40, h: 26 },
  { key: "math", x: 57, y: 15, w: 40, h: 26 },
  { key: "science", x: 57, y: 61, w: 40, h: 26 },
];
const fmt = (n) => (Math.round(n * 10) / 10).toString();
const SEEN_STAGE_KEY = "clewquest_seen_stage_v1";

const todayBtn = { background: "#FBBF24", color: "#0F172A", border: "none", borderRadius: 12, padding: "8px 14px", fontWeight: 900, cursor: "pointer" };

function Landing({ subjects, onOpen, onHome, onToday, onLogout, onLeave, pictureCode, toast }) {
  const [showLink, setShowLink] = useState(false);
  return (
    <div data-testid="cq-landing" style={{ position: "relative", maxWidth: 480, margin: "0 auto", background: "#0B3B73" }}>
      <div style={{ position: "relative" }}>
        <Art k="landing/four-islands" alt="Four islands joined by a thread, with the Clew in the middle" style={{ width: "100%", display: "block" }} />
        {HOTSPOTS.filter((h) => subjects[h.key]).map((h) => (
          <button key={h.key} data-testid={`cq-island-${h.key}`} aria-label={subjects[h.key].label + (subjects[h.key].status === "open" ? "" : ", coming soon")} onClick={() => onOpen(h.key)}
            style={{ position: "absolute", left: h.x + "%", top: h.y + "%", width: h.w + "%", height: h.h + "%", background: "transparent", border: "none", cursor: "pointer", color: "#fff", textShadow: "0 1px 4px #000", fontWeight: 900, fontSize: 15 }}>
            <span style={{ background: "rgba(15,23,42,.55)", borderRadius: 10, padding: "3px 8px", display: "inline-block", whiteSpace: "nowrap" }}>
              {subjects[h.key].label}{subjects[h.key].status === "open" ? "" : <span style={{ display: "block", fontSize: 12, whiteSpace: "nowrap" }}>(Coming soon)</span>}
            </span>
          </button>
        ))}
        <button data-testid="cq-clew" aria-label="The Clew (home)" onClick={onHome} style={{ position: "absolute", left: "36%", top: "38%", width: "28%", height: "14%", background: "transparent", border: "none", cursor: "pointer", color: "#fff", fontWeight: 900, textShadow: "0 1px 4px #000" }}>
          <span style={{ background: "rgba(15,23,42,.55)", borderRadius: 10, padding: "3px 8px" }}>The Clew</span>
        </button>
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Art k="brand/logo-b1" alt="ClewQuest" style={{ width: 120 }} />
        </div>
      </div>
      <button data-testid="cq-today" onClick={onToday} style={{ ...todayBtn, position: "absolute", top: 10, left: 10 }}>Today</button>
      <button onClick={onLogout} style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,.85)", border: "none", borderRadius: 10, padding: "6px 10px", fontWeight: 800, cursor: "pointer" }}>Log out</button>
      {onLeave && <button data-testid="cq-leave" onClick={onLeave} style={{ position: "absolute", top: 46, left: 10, background: "rgba(255,255,255,.85)", border: "none", borderRadius: 10, padding: "6px 10px", fontWeight: 800, cursor: "pointer" }}>Back to Today</button>}
      {pictureCode && (<div style={{ padding: "10px 12px 24px" }}>
        {showLink ? <LinkCode /> : <button data-testid="cq-linkcode-open" onClick={() => setShowLink(true)} style={{ width: "100%", padding: 10, borderRadius: 12, border: "none", background: "rgba(255,255,255,.9)", fontWeight: 800, cursor: "pointer" }}>Link a parent</button>}
      </div>)}
      {toast && <div role="status" data-testid="cq-toast" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#0F172A", color: "#fff", padding: "10px 18px", borderRadius: 14, fontWeight: 800 }}>{toast}</div>}
    </div>
  );
}

function ClewHome({ st, character, award, onBack, onEdit, onOpen, onToday, subjects }) {
  const total = st.thread.total || 0, stage = stageFromTotal(total);
  const reach = CLEWQUEST.stages.filter((s) => s.reachable);
  const next = st.next;
  const art = stageAssetKey(stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS);
  const hex = (CLEWQUEST.colours.find((c) => c.key === character.colour_key) || {}).hex;
  const cur = reach.find((s) => s.stage === stage);
  const pct = next ? Math.min(100, Math.round(((total - (cur ? cur.minThread : 0)) / (next.need - (cur ? cur.minThread : 0))) * 100)) : 100;
  return (
    <div data-testid="cq-home" style={{ maxWidth: 480, margin: "0 auto", padding: "18px 18px 40px", minHeight: "100vh", background: "#EFF6FF", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontWeight: 800, cursor: "pointer", color: "#1E3A6E" }}>Back to the islands</button>
        <button data-testid="cq-today-home" onClick={onToday} style={todayBtn}>Today</button>
      </div>
      {award > 0 && <div data-testid="cq-award" style={{ background: "#DCFCE7", color: "#166534", fontWeight: 800, borderRadius: 14, padding: "10px 14px", margin: "10px 0" }}>+{fmt(award)} thread from your last round!</div>}
      {st.leveledUp && <div data-testid="cq-stageup" style={{ background: "#FEF3C7", color: "#92400E", fontWeight: 900, borderRadius: 14, padding: "10px 14px", margin: "10px 0" }}>Your Clew grew to Stage {stage}!</div>}
      <div style={{ textAlign: "center", background: "#fff", borderRadius: 20, padding: 16, margin: "10px 0" }}>
        <Art testId="cq-character" k={art} alt={`Your Clew at Stage ${stage}`} tint={hex} style={{ maxHeight: 260, width: "auto" }} />
        <div style={{ fontWeight: 900, fontSize: 20 }}>{character.nickname || "Your Clew"}</div>
        <div style={{ color: "#475569" }}>Stage {stage}: {(cur || {}).name}</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 8 }}>
          <span style={{ width: 22, height: 22, borderRadius: 11, background: hex, border: "1px solid #94A3B8" }} />
          <span data-testid="cq-thread-total" style={{ fontWeight: 900, fontSize: 22 }}>{fmt(total)}</span><span>thread</span>
        </div>
        <div style={{ color: "#475569", fontSize: 14, marginTop: 4 }}>
          English {fmt((st.thread.bySubject || {}).english || 0)} · Chinese {fmt((st.thread.bySubject || {}).chinese || 0)}
        </div>
        {next ? (<>
          <div style={{ height: 10, background: "#E2E8F0", borderRadius: 6, margin: "12px 0 4px" }}><div style={{ width: pct + "%", height: 10, background: hex, borderRadius: 6 }} /></div>
          <div data-testid="cq-next" style={{ fontSize: 14, fontWeight: 700 }}>{fmt(next.have)} / {next.need} thread to Stage {next.stage}</div>
        </>) : <div style={{ fontWeight: 800, marginTop: 10 }}>Full-grown Clew!</div>}
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "6px 0" }}>
        {reach.map((s) => {
          const got = s.stage <= stage;
          return (<div key={s.stage} style={{ textAlign: "center", minWidth: 64 }}>
            <Art k={stageAssetKey(s.stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS)} alt={got ? `Stage ${s.stage}` : `Stage ${s.stage}, locked`} tint={hex} style={{ width: 56, filter: got ? "none" : "brightness(0) opacity(.35)" }} />
            <div style={{ fontSize: 11, fontWeight: 700 }}>{got ? `Stage ${s.stage}` : `${s.minThread} thread`}</div>
          </div>);
        })}
        <div style={{ textAlign: "center", minWidth: 64 }}>
          <Art k="stages/stage-6-boy" alt="More stages, coming later" style={{ width: 56, filter: "brightness(0) opacity(.2)" }} />
          <div style={{ fontSize: 11, fontWeight: 700 }}>Coming later</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        {Object.entries(subjects).filter(([, v]) => v.status === "open").map(([key, v], i) => (
          <button key={key} data-testid={`cq-go-${key}`} onClick={() => onOpen(key)} style={{ flex: 1, padding: 14, borderRadius: 14, border: "none", background: i % 2 ? "#B91C1C" : "#1E3A6E", color: "#fff", fontWeight: 800, cursor: "pointer" }}>{v.label}</button>
        ))}
        <button data-testid="cq-edit-look" onClick={onEdit} style={{ width: "100%", padding: 12, borderRadius: 14, border: "2px solid #1E3A6E", background: "#fff", fontWeight: 800, cursor: "pointer" }}>Edit look</button>
      </div>
    </div>
  );
}

export default function ClewQuestStudent({ user, onLogout, renderPractice, onLeaveQuest }) {
  const uid = user.serverId;
  const grade = questGrade(user.grade); // the student's own grade (ClaudeApp only mounts this shell when it has a config)
  const subjects = subjectsFor(grade);
  const [from, setFrom] = useState("landing"); // where practice / Today was opened from, to return there
  const [view, setView] = useState("loading"); // loading | builder | edit | landing | home | practice | today
  const [st, setSt] = useState(null);
  const [character, setCharacter] = useState(null);
  const [subject, setSubject] = useState(null);
  const [toast, setToast] = useState(null);
  const [award, setAward] = useState(0);
  const [failed, setFailed] = useState(false);
  const [skipped, setSkipped] = useState(false); // "Skip for now" in the builder: no forced builder again this visit

  const load = useCallback(async (next) => {
    const r = await cqGet("/api/clewquest/state");
    if (!r.ok) { setFailed(true); const cached = readCachedCharacter(uid); if (cached) { setCharacter(cached); setView(next || "landing"); } return null; }
    setFailed(false); setSt(r); setCharacter(r.character);
    if (r.character) cacheCharacter(uid, r.character);
    try { // stage-up celebration: compare with the last stage this device showed (new clewquest_* key only)
      const k = SEEN_STAGE_KEY + "_" + uid, seen = Number(localStorage.getItem(k) || 1) || 1;
      r.leveledUp = !!r.stage && r.stage > seen;
      if (r.stage && r.stage !== seen && (next === "home" || r.stage < seen)) localStorage.setItem(k, String(r.stage));
    } catch { r.leveledUp = false; }
    setView(r.character ? (next || "landing") : skipped ? (next === "home" ? "landing" : next || "landing") : "builder");
    return r;
  }, [uid, skipped]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (view === "home") setAward(takeLastAward()); }, [view]);

  function openSubject(key) {
    const cfg = subjects[key];
    if (!cfg || cfg.status !== "open") { setToast("Coming soon"); setTimeout(() => setToast(null), 2200); return; }
    setFrom(view === "home" ? "home" : "landing"); setSubject(key); setView("practice");
  }
  // "Today": the existing Today hub (daily target, homework, all subjects), unchanged; its back button returns here.
  function openToday() { setFrom(view === "home" ? "home" : "landing"); setSubject(null); setView("today"); }
  if (view === "practice" && subject) return renderPractice(subjects[subject].appSubject, () => { setSubject(null); load(from); });
  if (view === "today") return renderPractice(null, () => load(from));
  if (view === "loading") return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{failed ? "Could not load ClewQuest. Please refresh." : "Loading..."}</div>;
  if (view === "builder" || view === "edit") return <CharacterBuilder initial={view === "edit" ? character : null} onLogout={onLogout} onSkip={view === "builder" ? () => { setSkipped(true); if (onLeaveQuest) onLeaveQuest(); else openToday(); } : null} onSaved={(c) => { cacheCharacter(uid, c); setCharacter(c); load("landing"); }} onCancel={view === "edit" ? () => setView("home") : null} />;
  if (view === "home" && st && character) return <ClewHome st={st} character={character} award={award} subjects={subjects} onBack={() => setView("landing")} onEdit={() => setView("edit")} onOpen={openSubject} onToday={openToday} />;
  return <Landing subjects={subjects} onOpen={openSubject} onHome={() => { if (!character) setView("builder"); else load("home"); }} onToday={openToday} onLogout={onLogout} onLeave={onLeaveQuest} pictureCode={!!user.pictureCode} toast={toast} />;
}
