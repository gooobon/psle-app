"use client";
// Parent: weak concepts / skills (issue #131). At least 4 first-try attempts in the last 14 days; shows first-try %, the trend
// against the previous 14 days, two missed examples with the child's answer, and "Assign practice on this skill".
import React from "react";
import { serverGet } from "@/lib/serverClient";
import { getTagIndex } from "@/lib/taxonomyLookup";
import { CONCEPTS } from "@/data/taxonomy/taxonomy";
import taxonomy from "@/data/taxonomy/taxonomy.json";
import { NOT_RECORDED } from "@/lib/parentDetail";

const LABELS = Object.create(null);
(CONCEPTS || []).forEach((c) => { LABELS[c.id] = c.label || c.skill || c.id; });
const ZH = (taxonomy && taxonomy.zhSkillToConcept) || {};
export function skillLabel(skill) {
  const s = String(skill || "");
  if (LABELS[s]) return LABELS[s];
  if (ZH[s] && LABELS[ZH[s]]) return LABELS[ZH[s]];
  if (s.indexOf("sec:") === 0) return "Section: " + s.slice(4);
  return s.split(".").slice(-1)[0].replace(/_/g, " ");
}
function stemOf(id) {
  try {
    const it = ((getTagIndex().byId || {})[id] || {}).item || {};
    return it.sentence || it.stem || it.q || it.question || it.sentenceA || it.wrongWord || it.word || "";
  } catch { return ""; }
}
const TREND = { up: "Up", down: "Down", flat: "Steady", new: "No earlier data" };

export default function ParentWeakSpots({ child, subject, onAssign }) {
  const [state, setState] = React.useState({ loading: true, spots: [], err: "" });
  React.useEffect(() => {
    let alive = true;
    setState({ loading: true, spots: [], err: "" });
    if (!child || !child.serverId || !["English", "Chinese"].includes(subject)) { setState({ loading: false, spots: [], err: "" }); return undefined; }
    serverGet(`/api/parent/weak-spots?child=${encodeURIComponent(child.serverId)}&subject=${encodeURIComponent(subject)}`)
      .then((r) => { if (alive) setState(r.ok ? { loading: false, spots: r.spots || [], err: "" } : { loading: false, spots: [], err: r.error || "Weak spots are not available yet." }); });
    return () => { alive = false; };
  }, [child && child.serverId, subject]);

  return (
    <div data-testid="weak-spots" style={{ background: "#FBF6EA", border: "1px solid #E2DBCF", borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#1B2340", marginBottom: 2 }}>Weak spots</div>
      <div style={{ fontSize: 11, color: "#6B6F7B", marginBottom: 8 }}>Skills with at least 4 first-try attempts in the last 14 days, weakest first.</div>
      {state.loading && <div style={{ fontSize: 12, color: "#6B6F7B" }}>Loading...</div>}
      {!state.loading && state.err && <div style={{ fontSize: 12, color: "#6B6F7B" }}>{state.err}</div>}
      {!state.loading && !state.err && state.spots.length === 0 && <div style={{ fontSize: 12, color: "#6B6F7B" }}>No skill has enough attempts yet.</div>}
      {state.spots.map((s) => (
        <div key={s.skill} style={{ background: "#fff", borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1B2340", flex: 1 }}>{skillLabel(s.skill)}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: s.firstTryPct < 50 ? "#B3261E" : "#1B2340" }}>{s.firstTryPct}% first try ({s.attempts} attempts)</div>
          </div>
          <div style={{ fontSize: 11, color: "#6B6F7B", margin: "2px 0 6px" }}>
            Trend: {TREND[s.trend]}{s.prevPct != null ? ` (previous 14 days: ${s.prevPct}%)` : ""}
          </div>
          {s.examples.map((e) => (
            <div key={e.itemId} style={{ fontSize: 12, color: "#1B2340", lineHeight: 1.5, padding: "3px 0", borderTop: "1px solid #E2DBCF" }}>
              <span>{stemOf(e.itemId) || e.itemId}</span>
              <div style={{ color: "#7F1D1D" }}>{(child && child.name) || "Child"} wrote: {e.answerText || NOT_RECORDED}</div>
            </div>
          ))}
          {onAssign && (
            <button onClick={() => onAssign(ZH[s.skill] || s.skill)} style={{ marginTop: 6, background: "#D9A52E", color: "#fff", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
              Assign practice on this skill
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
