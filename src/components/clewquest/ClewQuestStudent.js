"use client";
// ClewQuest student shell: builder -> four-island landing -> Clew home. Practice screens are the EXISTING ones (renderPractice);
// nothing here is ever rendered on solve / question / marking screens.
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { stageFromTotal, stageAssetKey, questGrade, subjectsFor, tintForStage } from "@/lib/clewquest/logic";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SailingShip, ShopScreen } from "./TradersShip";
import { Art, ASSET_KEYS } from "./Art";
import CharacterBuilder from "./CharacterBuilder";
import { LandingArt } from "./AuthScreens";
import { Page, LogoBadge, IslandPill, ISLAND_PILLS, T, FONT, mainBtn, secondaryBtn, linkBtn } from "./Shell";
import { cqGet, cacheCharacter, readCachedCharacter, takeLastAward, takePrefetchedState } from "@/lib/clewquest/client";
import { markIsland } from "@/lib/clewquest/perf";

// Clew home (pose frames, history, level cards) is its own chunk: the island landing never loads it.
const ClewHome = lazy(() => import("./ClewHome"));

// Lightweight placeholder shown the instant Clew home is requested (no art, no network): replaced when state + chunk arrive.
function HomeSkeleton() {
  const bar = (w, h, mt) => <div style={{ width: w, height: h, marginTop: mt, borderRadius: 10, background: T.track }} />;
  return (
    <div data-testid="cq-home-skeleton" role="status" aria-label="Loading your Clew" style={{ width: "100%", maxWidth: 480, margin: "0 auto", padding: "18px 18px 40px", minHeight: "100vh", background: T.bg, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>{bar(120, 20, 0)}{bar(70, 36, 0)}</div>
      <div style={{ background: "#fff", borderRadius: 20, margin: "14px 0", padding: 16 }}>
        <div style={{ aspectRatio: "1600 / 893", background: "#E4DDD0", borderRadius: 12 }} />
        {bar("50%", 20, 14)}{bar("35%", 14, 8)}{bar("100%", 10, 14)}
      </div>
      {bar("100%", 64, 8)}{bar("100%", 64, 8)}
    </div>
  );
}

// Invisible hotspots as percent of the landing art box (864x1184). Full names live only in aria-label.
const HOTSPOTS = [
  { key: "english", x: 3, y: 15, w: 40, h: 26 },
  { key: "chinese", x: 3, y: 61, w: 40, h: 26 },
  { key: "math", x: 57, y: 15, w: 40, h: 26 },
  { key: "science", x: 57, y: 61, w: 40, h: 26 },
];
const fmt = (n) => (Math.round(n * 10) / 10).toString();
const SEEN_STAGE_KEY = "clewquest_seen_stage_v1";

const todayBtn = { ...secondaryBtn, width: "auto", height: 40, padding: "0 18px", fontSize: 15, borderRadius: 999 };
const logoutPill = { ...todayBtn, border: `1.5px solid ${T.border}`, color: T.muted, fontWeight: 600 };

// The centre island shows ONLY the student's own Clew (the baked-in art has no characters). On an island tap it hops there, then the subject opens.
const CLEW_HOME = { x: 51, y: 47 }; // feet position, % of the landing art box
const WALK_MS = 900;
function WalkingClew({ artKey, tint, alt, walk }) {
  const to = walk || CLEW_HOME;
  return (
    <div data-testid="cq-walker" data-walking={walk ? "1" : "0"} aria-hidden={walk ? "true" : undefined} style={{ position: "absolute", left: to.x + "%", top: to.y + "%", height: "12%", transform: "translate(-50%,-100%)", transition: walk ? `left ${WALK_MS}ms ease-in-out, top ${WALK_MS}ms ease-in-out` : "none", pointerEvents: "none", zIndex: 4 }}>
      <style>{`@keyframes cq-hop{0%,100%{transform:translateY(0)}25%{transform:translateY(-14px)}50%{transform:translateY(0)}75%{transform:translateY(-14px)}}@media (prefers-reduced-motion: reduce){.cq-walker-in{animation:none !important}}`}</style>
      <div className="cq-walker-in" style={{ height: "100%", animation: walk ? `cq-hop ${WALK_MS}ms ease-in-out` : "none" }}>
        <Art k={artKey} alt={alt} tint={tint} style={{ height: "100%", width: "auto", display: "block" }} />
      </div>
    </div>
  );
}

function Landing({ subjects, onOpen, onHome, onToday, onLogout, onLeave, onShop, pictureCode, toast, character, stage }) {
  const [showLink, setShowLink] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [walk, setWalk] = useState(null);
  const reduced = usePrefersReducedMotion();
  const [shipReady, setShipReady] = useState(false);
  useEffect(() => { markIsland("islands-visible"); const w = setTimeout(() => { import("./ClewHome").catch(() => {}); }, 1200); const t = setTimeout(() => setShipReady(true), 700); return () => { clearTimeout(t); clearTimeout(w); }; }, []); // ship art loads after the islands are up
  const hex = character ? (CLEWQUEST.colours.find((c) => c.key === character.colour_key) || {}).hex : undefined;
  const artKey = character ? stageAssetKey(stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS) : null;
  useEffect(() => () => { if (walk && walk.t) clearTimeout(walk.t); }, [walk]);
  function tapIsland(h) {
    const open = subjects[h.key] && subjects[h.key].status === "open";
    if (walk) return;
    if (!open || reduced || !character) { onOpen(h.key); return; } // reduced motion / coming soon: straight to the result
    const t = setTimeout(() => { setWalk(null); onOpen(h.key); }, WALK_MS + 50);
    setWalk({ x: h.x + h.w / 2, y: h.y + h.h / 2, t });
  }
  return (
    <Page testId="cq-landing">
      <div style={{ position: "relative" }}>
        <LandingArt pills={false}>
          {ISLAND_PILLS.map((p) => <IslandPill key={p.label} {...p} testId={`cq-pill-${p.label.toLowerCase()}`} />)}
          {HOTSPOTS.filter((h) => subjects[h.key]).map((h) => (
            <button key={h.key} data-testid={`cq-island-${h.key}`} aria-label={h.key.charAt(0).toUpperCase() + h.key.slice(1)} aria-description={subjects[h.key].status === "open" ? undefined : "Coming soon"} onClick={() => tapIsland(h)}
              style={{ position: "absolute", left: h.x + "%", top: h.y + "%", width: h.w + "%", height: h.h + "%", background: "transparent", border: "none", cursor: "pointer" }} />
          ))}
          {artKey && <WalkingClew artKey={artKey} tint={tintForStage(stage, hex)} alt="" walk={walk} />}
          <button data-testid="cq-clew" aria-label="The Clew" onClick={() => { setPressed(true); onHome(); }} onPointerDown={() => setPressed(true)} onPointerCancel={() => setPressed(false)} style={{ position: "absolute", left: "36%", top: "38%", width: "28%", height: "14%", background: pressed ? "rgba(255,255,255,.35)" : "transparent", border: "none", borderRadius: "50%", cursor: "pointer", transform: pressed ? "scale(.96)" : "none", transition: "background .08s, transform .08s", touchAction: "manipulation" }} />
          {CLEWQUEST.ship.shopEnabled && shipReady && <SailingShip onOpen={onShop} />}
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
    // Islands need only character + totals + stage. The 30-day thread history is fetched only for Clew home.
    // The first load can reuse the request ClaudeApp started in parallel with the session check (single use, 20 s max).
    const wantHistory = next === "home";
    const pre = wantHistory ? null : takePrefetchedState();
    const r = await (pre || cqGet("/api/clewquest/state" + (wantHistory ? "?history=1" : "")));
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
  useEffect(() => { const i = new Image(); i.src = "/clewquest/landing/four-islands.webp"; }, []); // warm the island art while state loads
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
  if (view === "loading") return ( // marble card + the island art straight away (never plain text on a blank page)
    <Page testId="cq-loading">
      <LandingArt pills={false}>
        <div role="status" data-testid="cq-loading-text" style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", fontWeight: 800, color: T.ink }}>{failed ? "Could not load ClewQuest. Please refresh." : "Loading..."}</div>
      </LandingArt>
    </Page>
  );
  if (view === "builder" || view === "edit") return <CharacterBuilder initial={view === "edit" ? character : null} onLogout={onLogout} onSkip={view === "builder" ? () => { setSkipped(true); if (onLeaveQuest) onLeaveQuest(); else openToday(); } : null} onSaved={(c) => { cacheCharacter(uid, c); setCharacter(c); load("landing"); }} onCancel={view === "edit" ? () => setView("home") : null} />;
  if (view === "home" && st && character) return <Suspense fallback={<HomeSkeleton />}><ClewHome uid={uid} grade={grade} getProgress={getProgress} st={st} character={character} award={award} subjects={subjects} onBack={() => setView("landing")} onEdit={() => setView("edit")} onOpen={openSubject} onToday={openToday} /></Suspense>;
  if (view === "home") return <HomeSkeleton />; // state still loading: show the skeleton, never a blank page
  return <Landing subjects={subjects} onOpen={openSubject} onHome={() => { if (!character) setView("builder"); else if (st) { setView("home"); load("home"); } else { setView("home"); load("home").then((r) => { if (!r && !readCachedCharacter(uid)) setView("landing"); }); } }} onToday={openToday} onLogout={onLogout} onLeave={onLeaveQuest} onShop={() => setView("shop")} character={character} stage={st && st.thread ? stageFromTotal(st.thread.total || 0) : 1} pictureCode={!!user.pictureCode} toast={toast} />;
}
