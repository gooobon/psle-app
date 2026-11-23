"use client";
// ClewQuest student shell: builder -> four-island landing -> Clew home. Practice screens are the EXISTING ones (renderPractice);
// nothing here is ever rendered on solve / question / marking screens.
import React, { useCallback, useEffect, useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { stageFromTotal, stageAssetKey, questGrade, subjectsFor, tintForStage } from "@/lib/clewquest/logic";
import { levelFor, levelProgress, recentAverage, settleLevel, readFloor, writeFloor } from "@/lib/clewquest/levels";
import { characterPoseKeys, petPoseKeys, resolveFrames } from "@/lib/clewquest/poses";
import { todayStr } from "@/lib/sessionUtils";
import { LevelCard } from "./LevelBadge";
import PoseCycler from "./PoseCycler";
import { SailingShip, ShopScreen } from "./TradersShip";
import { Art, ASSET_KEYS } from "./Art";
import CharacterBuilder from "./CharacterBuilder";
import { LandingArt } from "./AuthScreens";
import { Page, LogoBadge, IslandPill, ISLAND_PILLS, T, FONT, mainBtn, secondaryBtn, linkBtn } from "./Shell";
import { cqGet, cacheCharacter, readCachedCharacter, takeLastAward } from "@/lib/clewquest/client";

// Invisible hotspots as percent of the landing art box (864x1184). Full names live only in aria-label.
const HOTSPOTS = [
  { key: "english", x: 3, y: 15, w: 40, h: 26 },
  { key: "chinese", x: 3, y: 61, w: 40, h: 26 },
  { key: "math", x: 57, y: 15, w: 40, h: 26 },
  { key: "science", x: 57, y: 61, w: 40, h: 26 },
];
// Level for one subject island: threads from the server, 2-week average from local history, never below the highest level reached.
export function subjectLevel(uid, key, threads, prog) {
  const avg = recentAverage(prog && prog.history, todayStr());
  const lv = levelFor({ threads, avg, floor: readFloor(uid, key) });
  return { lv, p: levelProgress({ threads, avg, floor: lv.level }), avg };
}
const fmt = (n) => (Math.round(n * 10) / 10).toString();
const SEEN_STAGE_KEY = "clewquest_seen_stage_v1";

const todayBtn = { ...secondaryBtn, width: "auto", height: 40, padding: "0 18px", fontSize: 15, borderRadius: 999 };
const logoutPill = { ...todayBtn, border: `1.5px solid ${T.border}`, color: T.muted, fontWeight: 600 };

function Landing({ subjects, onOpen, onHome, onToday, onLogout, onLeave, onShop, pictureCode, toast }) {
  const [showLink, setShowLink] = useState(false);
  return (
    <Page testId="cq-landing">
      <div style={{ position: "relative" }}>
        <LandingArt pills={false}>
          {ISLAND_PILLS.map((p) => <IslandPill key={p.label} {...p} testId={`cq-pill-${p.label.toLowerCase()}`} />)}
          {HOTSPOTS.filter((h) => subjects[h.key]).map((h) => (
            <button key={h.key} data-testid={`cq-island-${h.key}`} aria-label={subjects[h.key].label + (subjects[h.key].status === "open" ? "" : ", coming soon")} onClick={() => onOpen(h.key)}
              style={{ position: "absolute", left: h.x + "%", top: h.y + "%", width: h.w + "%", height: h.h + "%", background: "transparent", border: "none", cursor: "pointer" }} />
          ))}
          <button data-testid="cq-clew" aria-label="The Clew (home)" onClick={onHome} style={{ position: "absolute", left: "36%", top: "38%", width: "28%", height: "14%", background: "transparent", border: "none", cursor: "pointer" }} />
          {CLEWQUEST.ship.shopEnabled && <SailingShip onOpen={onShop} />}
          <LogoBadge style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
        </LandingArt>
      </div>
      <div data-testid="cq-landing-bar" style={{ background: T.bg, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "12px 14px" }}>
        <button data-testid="cq-today" onClick={onToday} style={todayBtn}>Today</button>
        {onLeave && <button data-testid="cq-leave" onClick={onLeave} style={{ ...todayBtn, height: 40 }}>Back to Today</button>}
        <button data-testid="cq-logout" onClick={onLogout} style={logoutPill}>Log out</button>
      </div>
      {toast && <div role="status" data-testid="cq-toast" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: T.ink, color: "#fff", padding: "10px 18px", borderRadius: 14, fontWeight: 800 }}>{toast}</div>}
    </Page>
  );
}

function History({ title, rows, empty, testId }) {
  return (
    <div data-testid={testId} style={{ background: "#fff", borderRadius: 16, padding: "10px 14px", margin: "10px 0", boxShadow: "0 2px 10px rgba(27,35,64,.08)" }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{title}</div>
      {rows.length === 0 ? <div style={{ color: T.muted, fontSize: 14 }}>{empty}</div> : rows.map((r) => (
        <div key={r.k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "3px 0", borderTop: `1px solid ${T.border}` }}><span>{r.a}</span><b>{r.b}</b></div>
      ))}
    </div>
  );
}

function ClewHome({ uid, st, character, award, onBack, onEdit, onOpen, onToday, subjects, getProgress, grade }) {
  const [credits, setCredits] = useState(null);
  useEffect(() => { let live = true; cqGet("/api/student/rewards").then((r) => { if (live && r && r.ok) setCredits(r); }); return () => { live = false; }; }, []);
  const total = st.thread.total || 0, stage = stageFromTotal(total);
  const reach = CLEWQUEST.stages.filter((s) => s.reachable);
  const next = st.next;
  const art = stageAssetKey(stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS);
  const hex = (CLEWQUEST.colours.find((c) => c.key === character.colour_key) || {}).hex;
  const tint = tintForStage(stage, hex); // black until stage 4: the chosen colour only appears from 300 threads
  const frames = resolveFrames(characterPoseKeys(character.gender, character.hair_key), art, ASSET_KEYS);
  const petFrames = CLEWQUEST.poses.pets.map((p) => ({ pet: p, frames: resolveFrames(petPoseKeys(p), art, ASSET_KEYS) }));
  const levels = Object.entries(subjects).filter(([, v]) => v.status === "open").map(([key, v]) => {
    const r = subjectLevel(uid, key, (st.thread.bySubject || {})[key] || 0, getProgress ? getProgress(grade, v.appSubject) : null);
    return { key, label: v.label.replace(" Island", ""), ...r };
  });
  useEffect(() => { levels.forEach((l) => writeFloor(uid, l.key, l.lv.level)); }); // remember the highest level reached
  const cur = reach.find((s) => s.stage === stage);
  const pct = next ? Math.min(100, Math.round(((total - (cur ? cur.minThread : 0)) / (next.need - (cur ? cur.minThread : 0))) * 100)) : 100;
  return (
    <div data-testid="cq-home" style={{ maxWidth: 480, margin: "0 auto", padding: "18px 18px 40px", minHeight: "100vh", background: T.bg, color: T.ink, fontFamily: FONT, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontWeight: 700, cursor: "pointer", color: T.primary, fontFamily: FONT }}>Back to the islands</button>
        <button data-testid="cq-today-home" onClick={onToday} style={todayBtn}>Today</button>
      </div>
      {award > 0 && <div data-testid="cq-award" style={{ background: "#EEF3E2", color: T.successText, fontWeight: 800, borderRadius: 14, padding: "10px 14px", margin: "10px 0" }}>+{fmt(award)} thread from your last round!</div>}
      {st.leveledUp && <div data-testid="cq-stageup" style={{ background: "#FBF1D6", color: T.ink, fontWeight: 800, borderRadius: 14, padding: "10px 14px", margin: "10px 0" }}>Your Clew grew to Stage {stage}!</div>}
      <div style={{ textAlign: "center", background: "#fff", borderRadius: 20, boxShadow: "0 6px 20px rgba(27,35,64,.10)", padding: 16, margin: "10px 0" }}>
        <PoseCycler testId="cq-character" frames={frames} alt={`Your Clew at Stage ${stage}`} tint={tint} height={260} />
        <div style={{ fontWeight: 800, fontSize: 20 }}>{character.nickname || "Your Clew"}</div>
        <div style={{ color: T.muted }}>Stage {stage}: {(cur || {}).name}</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 8 }}>
          <span title={stage < CLEWQUEST.colourFromStage ? "Your colour appears at 300 threads" : undefined} style={{ width: 22, height: 22, borderRadius: 11, background: stage < CLEWQUEST.colourFromStage ? "#111" : hex, border: "1px solid rgba(27,35,64,.18)" }} />
          <span data-testid="cq-thread-total" style={{ fontWeight: 900, fontSize: 22 }}>{fmt(total)}</span><span>thread</span>
        </div>
        <div style={{ color: T.muted, fontSize: 14, marginTop: 4 }}>
          English {fmt((st.thread.bySubject || {}).english || 0)} · Chinese {fmt((st.thread.bySubject || {}).chinese || 0)}
        </div>
        {next ? (<>
          <div style={{ height: 10, background: T.track, borderRadius: 6, margin: "12px 0 4px" }}><div style={{ width: pct + "%", height: 10, background: T.gold, borderRadius: 6 }} /></div>
          <div data-testid="cq-next" style={{ fontSize: 14, fontWeight: 700 }}>{fmt(next.have)} / {next.need} thread to Stage {next.stage}</div>
        </>) : <div style={{ fontWeight: 800, marginTop: 10 }}>Full-grown Clew!</div>}
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "6px 0" }}>
        {reach.map((s) => {
          const got = s.stage <= stage;
          return (<div key={s.stage} style={{ textAlign: "center", minWidth: 64 }}>
            <Art k={stageAssetKey(s.stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS)} alt={got ? `Stage ${s.stage}` : `Stage ${s.stage}, locked`} tint={tintForStage(s.stage, hex)} style={{ width: 56, filter: got ? "none" : "brightness(0) opacity(.35)" }} />
            <div style={{ fontSize: 11, fontWeight: 700 }}>{got ? `Stage ${s.stage}` : `${s.minThread} thread`}</div>
          </div>);
        })}
        <div style={{ textAlign: "center", minWidth: 64 }}>
          <Art k="stages/stage-6-boy" alt="More stages, coming later" style={{ width: 56, filter: "brightness(0) opacity(.2)" }} />
          <div style={{ fontSize: 11, fontWeight: 700 }}>Coming later</div>
        </div>
      </div>
      <div data-testid="cq-levels" style={{ display: "grid", gap: 8, margin: "10px 0" }}>
        {levels.map((l) => <LevelCard key={l.key} subjectLabel={l.label} lv={l.lv} p={l.p} />)}
      </div>
      <div data-testid="cq-pets" style={{ display: "flex", gap: 10, justifyContent: "center", background: "#fff", borderRadius: 20, padding: 12, margin: "10px 0", boxShadow: "0 2px 10px rgba(27,35,64,.08)" }}>
        {petFrames.map(({ pet, frames: f }) => (
          <div key={pet.key} style={{ textAlign: "center" }}>
            <PoseCycler testId={`cq-pet-${pet.key}`} frames={f} alt={pet.name} height={90} />
            <div style={{ fontSize: 12, fontWeight: 700 }}>{pet.name}</div>
          </div>
        ))}
      </div>
      <History title="Threads earned" testId="cq-thread-history" empty="No threads yet. Finish a round to earn some!"
        rows={(st.threadHistory || []).slice(0, 10).map((d) => ({ k: d.day, a: d.day, b: `+${fmt(d.total)} thread` }))} />
      {credits && <History title="Credits" testId="cq-credit-history" empty="No credits yet."
        rows={(credits.creditHistory || []).slice(0, 10).map((c, i) => ({ k: i + c.period, a: `${c.period} · ${c.subject || c.kind}`, b: `${c.credits} · ${c.status === "confirmed" ? "earned" : c.status}` }))} />}
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        {Object.entries(subjects).filter(([, v]) => v.status === "open").map(([key, v], i) => (
          <button key={key} data-testid={`cq-go-${key}`} onClick={() => onOpen(key)} style={{ ...(i === 0 ? mainBtn(false) : secondaryBtn), flex: 1 }}>{v.label}</button>
        ))}
        <button data-testid="cq-edit-look" onClick={onEdit} style={secondaryBtn}>Edit look</button>
      </div>
    </div>
  );
}

export default function ClewQuestStudent({ user, onLogout, renderPractice, onLeaveQuest, getProgress }) {
  const uid = user.serverId;
  const grade = questGrade(user.grade); // the student's own grade (ClaudeApp only mounts this shell when it has a config)
  const subjects = subjectsFor(grade);
  const [from, setFrom] = useState("landing"); // where practice / Today was opened from, to return there
  const [view, setView] = useState("loading"); // loading | builder | edit | landing | home | practice | today | shop
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
  if (view === "shop") return <ShopScreen onBack={() => setView("landing")} />;
  if (view === "loading") return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, background: T.bg, color: T.ink }}>{failed ? "Could not load ClewQuest. Please refresh." : "Loading..."}</div>;
  if (view === "builder" || view === "edit") return <CharacterBuilder initial={view === "edit" ? character : null} onLogout={onLogout} onSkip={view === "builder" ? () => { setSkipped(true); if (onLeaveQuest) onLeaveQuest(); else openToday(); } : null} onSaved={(c) => { cacheCharacter(uid, c); setCharacter(c); load("landing"); }} onCancel={view === "edit" ? () => setView("home") : null} />;
  if (view === "home" && st && character) return <ClewHome uid={uid} grade={grade} getProgress={getProgress} st={st} character={character} award={award} subjects={subjects} onBack={() => setView("landing")} onEdit={() => setView("edit")} onOpen={openSubject} onToday={openToday} />;
  return <Landing subjects={subjects} onOpen={openSubject} onHome={() => { if (!character) setView("builder"); else load("home"); }} onToday={openToday} onLogout={onLogout} onLeave={onLeaveQuest} onShop={() => setView("shop")} pictureCode={!!user.pictureCode} toast={toast} />;
}
