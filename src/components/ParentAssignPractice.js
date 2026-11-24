"use client";
// Parent: "Assign practice" panel (Mistakes tab). Filter by subject / skill / difficulty / count, optionally pick
// specific mistakes, preview, and assign everything in ONE call (POST /api/parent/homework with items[]).
import React from "react";
import { serverGet, serverPost } from "@/lib/serverClient";
import { getTagIndex } from "@/lib/taxonomyLookup";
import { skillIdsOf } from "@/lib/similarItemsCore";
import { CONCEPTS } from "@/data/taxonomy/taxonomy";
import EN_LEVELS from "@/data/p3/english/difficulty.json";
import {
  RECENT_DAYS, MAX_PER_SKILL, DEFAULT_PER_SKILL, DIFFICULTY_CHOICES, clampPerSkill, itemLevel, levelLabel,
  recentMissedSkills, planAssignments, toRequestItems, stemPreview, emptyReason,
} from "@/lib/assignFilters";

const LABELS = Object.create(null);
(CONCEPTS || []).forEach((c) => { LABELS[c.id] = c.label || c.skill || c.id; });
const skillWord = (id) => LABELS[id] || String(id).split(".").slice(-1)[0].replace(/_/g, " ");
const DAILY_LIMIT = 100; // HOMEWORK_ABUSE_MAX in lib/homework.js
const DIFF_WORD = { easier: "Easier", same: "Same level", harder: "Harder", mixed: "Mixed" };
const box = { background: "#FBF6EA", border: "1px solid #E2DBCF", borderRadius: 14, padding: "12px 14px", marginBottom: 14 };
const sel = { padding: "5px 8px", borderRadius: 8, border: "1px solid #E2DBCF", fontSize: 12, background: "#fff" };

function stemOf(row) {
  const it = (row && row.item) || {};
  return it.sentence || it.stem || it.q || it.question || it.sentenceA || it.wrongWord || it.word || row.id;
}

export default function ParentAssignPractice({ child, subject, grade, mistakes, runnableIndex, onAssigned }) {
  const [subj, setSubj] = React.useState(subject);
  React.useEffect(() => { setSubj(subject); }, [subject]);
  const [diff, setDiff] = React.useState("mixed");
  const [per, setPer] = React.useState(DEFAULT_PER_SKILL);
  const [skills, setSkills] = React.useState(null); // null = "From recent mistakes" (default)
  const [picked, setPicked] = React.useState({}); // mistake id -> true
  const [server, setServer] = React.useState({ solved: [], pending: [], stats: { items: {}, concepts: {} }, skillKeys: {} });
  const [preview, setPreview] = React.useState(null);
  const [msg, setMsg] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [used, setUsed] = React.useState(null); // assigned today (all subjects); null until loaded
  const [usedKey, setUsedKey] = React.useState(0);
  React.useEffect(() => {
    let alive = true;
    serverGet(`/api/parent/homework?child=${encodeURIComponent(child.serverId)}`)
      .then((r) => { if (alive && r.ok && typeof r.usedToday === "number") setUsed(r.usedToday); });
    return () => { alive = false; };
  }, [child?.serverId, usedKey]);

  React.useEffect(() => {
    let alive = true;
    setPreview(null);
    serverGet(`/api/parent/homework/levels?child=${encodeURIComponent(child.serverId)}&subject=${encodeURIComponent(subj)}`)
      .then((r) => { if (alive && r.ok) setServer({ solved: r.solved || [], pending: r.pending || [], stats: r.stats || { items: {}, concepts: {} }, skillKeys: r.skillKeys || {} }); });
    return () => { alive = false; };
  }, [child?.serverId, subj]);

  const idx = React.useMemo(() => getTagIndex(), []);
  const runnable = (runnableIndex && runnableIndex(subj) && runnableIndex(subj).byId) || {};
  const skillsOf = React.useCallback((m) => skillIdsOf((idx.byId[m.id] || {}).conceptIds), [idx]);
  // Only mistakes of the chosen subject can be sources (ids are subject-specific: zh vs en practice sets).
  const subjMistakes = (subj === subject ? mistakes : []).filter((m) => skillsOf(m).length);
  const recent = recentMissedSkills(subjMistakes, skillsOf, Date.now(), RECENT_DAYS);
  const allSkills = [...new Set(subjMistakes.flatMap(skillsOf))];
  const chosen = skills == null ? recent : skills;
  const pickedList = subjMistakes.filter((m) => picked[m.id]);

  function build() {
    // Pool = every runnable question carrying a skill; level from item tag, else estimated from global first-try rate.
    const pool = [];
    Object.keys(idx.byId).forEach((id) => {
      if (!runnable[id]) return;
      const row = idx.byId[id];
      const sk = skillIdsOf(row.conceptIds);
      if (!sk.length) return;
      const lv = itemLevel(row.item, row.conceptIds, server.stats, server.skillKeys[id], subj === "English" ? EN_LEVELS[id] : null);
      pool.push({ id, skills: sk, level: lv.level, estimated: lv.estimated, stem: stemOf(row) });
    });
    const sources = (pickedList.length ? pickedList : subjMistakes).map((m) => ({ id: m.id, skills: skillsOf(m) }));
    const useSkills = pickedList.length ? [...new Set(pickedList.flatMap(skillsOf))] : chosen;
    return planAssignments(pool, sources, { skills: useSkills, difficulty: diff, perSkill: per, solved: server.solved, pending: server.pending });
  }
  function doPreview() { setMsg(""); setPreview(build()); }

  async function confirm() {
    if (!preview || !preview.rows.length) return;
    setBusy(true); setMsg("Assigning...");
    const r = await serverPost("/api/parent/homework", { child: child.serverId, grade, items: toRequestItems(preview.rows, subj) });
    setBusy(false);
    setMsg(r.ok ? (r.message || "Assigned.") : (r.error || "Could not assign."));
    if (r.ok || r.code === "cap") { setUsedKey((k) => k + 1); setPreview(null); setPicked({}); if (onAssigned) onAssigned(); }
  }

  const toggleSkill = (s) => setSkills((cur) => { const base = cur == null ? recent : cur; return base.indexOf(s) === -1 ? [...base, s] : base.filter((x) => x !== s); });
  const allPicked = subjMistakes.length > 0 && subjMistakes.every((m) => picked[m.id]);

  return (
    <div style={box}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#1B2340", marginBottom: 8 }}>Assign practice</div>
      {used != null && <div style={{ fontSize: 12, color: "#6B6F7B", marginBottom: 6 }}>Today: {used} of {DAILY_LIMIT} assigned</div>}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 8, fontSize: 12, color: "#6B6F7B" }}>
        <label>Subject{" "}
          <select value={subj} onChange={(e) => { setSubj(e.target.value); setSkills(null); setPicked({}); }} style={sel}>
            <option value="English">English</option><option value="Chinese">Chinese</option>
          </select>
        </label>
        <label>Difficulty{" "}
          <select value={diff} onChange={(e) => setDiff(e.target.value)} style={sel}>
            {DIFFICULTY_CHOICES.map((d) => <option key={d} value={d}>{DIFF_WORD[d]}</option>)}
          </select>
        </label>
        <label>Questions per skill{" "}
          <input type="number" min="1" max={MAX_PER_SKILL} value={per} onChange={(e) => setPer(e.target.value)} onBlur={() => setPer(clampPerSkill(per))} style={{ ...sel, width: 56 }} />
        </label>
      </div>
      {subj !== subject ? (
        <div style={{ fontSize: 12, color: "#6B6F7B", marginBottom: 8 }}>Switch the subject at the top of the dashboard to assign from this child's {subj} mistakes.</div>
      ) : (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6B6F7B", marginBottom: 4 }}>
            Skills {skills == null ? `(from mistakes in the last ${RECENT_DAYS} days)` : "(custom)"}
            {skills != null && <button onClick={() => setSkills(null)} style={{ marginLeft: 8, border: "none", background: "none", color: "#1F3F95", fontWeight: 700, cursor: "pointer", fontSize: 11 }}>Reset to recent mistakes</button>}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {allSkills.length === 0 && <span style={{ fontSize: 12, color: "#6B6F7B" }}>No tagged mistakes yet, so there is nothing to assign from.</span>}
            {allSkills.map((s) => {
              const on = chosen.indexOf(s) !== -1;
              return <button key={s} onClick={() => toggleSkill(s)} style={{ border: "none", borderRadius: 16, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", background: on ? "#1F3F95" : "#fff", color: on ? "#fff" : "#6B6F7B" }}>{skillWord(s)}</button>;
            })}
          </div>
          {subjMistakes.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "#1B2340" }}>
                <input type="checkbox" checked={allPicked} onChange={(e) => setPicked(e.target.checked ? Object.fromEntries(subjMistakes.map((m) => [m.id, true])) : {})} /> Select all mistakes ({subjMistakes.length})
              </label>
              <div style={{ maxHeight: 160, overflowY: "auto", marginTop: 4 }}>
                {subjMistakes.map((m, i) => (
                  <label key={m.id + ":" + i} style={{ display: "block", fontSize: 12, color: "#1B2340", padding: "2px 0" }}>
                    <input type="checkbox" checked={!!picked[m.id]} onChange={(e) => setPicked((p) => ({ ...p, [m.id]: e.target.checked }))} /> {stemPreview(m.q || m.sentence || m.word || m.id)}
                    <span style={{ color: "#6B6F7B" }}> ({skillsOf(m).map(skillWord).join(", ")})</span>
                  </label>
                ))}
              </div>
              <div style={{ fontSize: 11, color: "#6B6F7B" }}>{pickedList.length ? `Using the ${pickedList.length} selected mistake${pickedList.length > 1 ? "s" : ""} as the source.` : "None selected: the skills above are used."}</div>
            </div>
          )}
          <button onClick={doPreview} disabled={!chosen.length && !pickedList.length} style={{ background: "#1F3F95", color: "#fff", border: "none", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Preview</button>
        </>
      )}
      {preview && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#1B2340", marginBottom: 4 }}>
            {preview.rows.length} question{preview.rows.length === 1 ? "" : "s"} ready{preview.capped ? " (limit reached)" : ""}
          </div>
          {preview.rows.length === 0 && <div style={{ fontSize: 12, color: "#6B6F7B" }}>{emptyReason(preview.funnel, diff)}</div>}
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {preview.rows.map((r) => (
              <div key={r.id} style={{ fontSize: 12, color: "#1B2340", padding: "3px 0", borderBottom: "1px solid #E2DBCF" }}>
                {r.stem} <span style={{ color: "#6B6F7B" }}>- {skillWord(r.skill)}, {levelLabel(r.level)}{r.estimated && r.level ? " (estimated)" : ""}</span>
              </div>
            ))}
          </div>
          {preview.rows.length > 0 && (
            <button onClick={confirm} disabled={busy} style={{ marginTop: 8, background: "#D9A52E", color: "#fff", border: "none", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
              Assign {preview.rows.length} question{preview.rows.length === 1 ? "" : "s"}
            </button>
          )}
        </div>
      )}
      {msg && <div style={{ fontSize: 12, color: "#1B2340", marginTop: 6 }}>{msg}</div>}
    </div>
  );
}
