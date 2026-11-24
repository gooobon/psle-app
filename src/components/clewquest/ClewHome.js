"use client";
// Clew home (My Clew): level cards, pose frames, thread history. Lazy chunk: the island landing never loads this or the pose art.
import React, { useEffect, useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { stageFromTotal, stageAssetKey, tintForStage } from "@/lib/clewquest/logic";
import { levelFor, levelProgress, recentAverage, readFloor, writeFloor } from "@/lib/clewquest/levels";
import { characterPoseKeys, petPoseKeys, resolveFrames } from "@/lib/clewquest/poses";
import { todayStr } from "@/lib/sessionUtils";
import { LevelCard } from "./LevelBadge";
import PoseCycler from "./PoseCycler";
import { Art, ASSET_KEYS } from "./Art";
import { cqGet } from "@/lib/clewquest/client";
import { T, FONT, mainBtn, secondaryBtn } from "./Shell";

// Level for one subject island: threads from the server, 2-week average from local history, never below the highest level reached.
export function subjectLevel(uid, key, threads, prog) {
  const avg = recentAverage(prog && prog.history, todayStr());
  const lv = levelFor({ threads, avg, floor: readFloor(uid, key) });
  return { lv, p: levelProgress({ threads, avg, floor: lv.level }), avg };
}
const fmt = (n) => (Math.round(n * 10) / 10).toString();
const todayBtn = { ...secondaryBtn, width: "auto", height: 40, padding: "0 18px", fontSize: 15, borderRadius: 999 };

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

export default function ClewHome({ uid, st, character, award, onBack, onEdit, onOpen, onToday, subjects, getProgress, grade }) {
  const [credits, setCredits] = useState(null);
  useEffect(() => { let live = true; cqGet("/api/student/rewards").then((r) => { if (live && r && r.ok) setCredits(r); }); return () => { live = false; }; }, []);
  const total = st.thread.total || 0, stage = stageFromTotal(total);
  const reach = CLEWQUEST.stages.filter((s) => s.reachable);
  const next = st.next;
  const art = stageAssetKey(stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS);
  const hex = (CLEWQUEST.colours.find((c) => c.key === character.colour_key) || {}).hex;
  const tint = tintForStage(stage, hex); // black for stages 1-2: the chosen colour appears from stage 3 (100 threads)
  // Pose art is the full character (face + hair), so it is only used from stage 5; before that the stage art stands in with the same motion.
  const frames = resolveFrames(stage >= 5 ? characterPoseKeys(character.gender, character.hair_key) : Array.from({ length: CLEWQUEST.poses.count }, () => "none"), art, ASSET_KEYS);
  const petFrames = CLEWQUEST.poses.pets.map((p) => ({ pet: p, frames: resolveFrames(petPoseKeys(p), art, ASSET_KEYS) }));
  const levels = Object.entries(subjects).filter(([, v]) => v.status === "open").map(([key, v]) => {
    const r = subjectLevel(uid, key, (st.thread.bySubject || {})[key] || 0, getProgress ? getProgress(grade, v.appSubject) : null);
    return { key, label: v.label.replace(" Island", ""), ...r };
  });
  useEffect(() => { levels.forEach((l) => writeFloor(uid, l.key, l.lv.level)); }); // remember the highest level reached
  const cur = reach.find((s) => s.stage === stage);
  const pct = next ? Math.min(100, Math.round(((total - (cur ? cur.minThread : 0)) / (next.need - (cur ? cur.minThread : 0))) * 100)) : 100;
  return (
    <div data-testid="cq-home" style={{ width: "100%", maxWidth: 480, margin: "0 auto", padding: "18px 18px 40px", minHeight: "100vh", background: T.bg, color: T.ink, fontFamily: FONT, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontWeight: 700, cursor: "pointer", color: T.primary, fontFamily: FONT }}>Back to the islands</button>
        <button data-testid="cq-today-home" onClick={onToday} style={todayBtn}>Today</button>
      </div>
      {award > 0 && <div data-testid="cq-award" style={{ background: "#EEF3E2", color: T.successText, fontWeight: 800, borderRadius: 14, padding: "10px 14px", margin: "10px 0" }}>+{fmt(award)} thread from your last round!</div>}
      {st.leveledUp && <div data-testid="cq-stageup" style={{ background: "#FBF1D6", color: T.ink, fontWeight: 800, borderRadius: 14, padding: "10px 14px", margin: "10px 0" }}>Your Clew grew to Stage {stage}!</div>}
      <div data-testid="cq-vault" style={{ textAlign: "center", background: "#fff", borderRadius: 20, boxShadow: "0 6px 20px rgba(27,35,64,.10)", margin: "10px 0", overflow: "hidden" }}>
        <div data-testid="cq-vault-stage" style={{ position: "relative", aspectRatio: "1600 / 893", background: "#E4DDD0" }}>
          {ASSET_KEYS.has(CLEWQUEST.vaultArt) && <Art priority k={CLEWQUEST.vaultArt} alt="The Vault of the Oracle: a marble temple with a golden light" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", maxWidth: "none" }} />}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: "9%", display: "flex", justifyContent: "center" }}>
            <PoseCycler testId="cq-character" frames={frames} alt={`Your Clew at Stage ${stage}`} tint={tint} height={190} />
          </div>
        </div>
        <div style={{ padding: "12px 16px 16px", background: "#fff" }}>
        <div style={{ fontWeight: 800, fontSize: 20 }}>{character.nickname || "Your Clew"}</div>
        <div style={{ color: T.muted }}>Stage {stage}: {(cur || {}).name}</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 8 }}>
          <span title={stage < CLEWQUEST.colourFromStage ? "Your colour appears at 100 threads" : undefined} style={{ width: 22, height: 22, borderRadius: 11, background: stage < CLEWQUEST.colourFromStage ? "#111" : hex, border: "1px solid rgba(27,35,64,.18)" }} />
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
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "6px 0" }}>
        {reach.map((s) => {
          const got = s.stage <= stage;
          return (<div key={s.stage} data-testid={`cq-strip-${s.stage}`} style={{ textAlign: "center", minWidth: 64 }}>
            <Art k={stageAssetKey(s.stage, character.gender, character.hair_key, character.colour_key, ASSET_KEYS)} alt={got ? `Stage ${s.stage}` : `Stage ${s.stage}, locked`} tint={tintForStage(s.stage, hex)} style={{ height: 72, width: "auto", filter: got ? "none" : "brightness(0) opacity(.35)" }} />
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

