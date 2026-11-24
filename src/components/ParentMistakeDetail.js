"use client";
// Parent Mistakes tab (issue #131): each wrong answer opens inline with the question, the child's exact answer, the correct
// answer, the explanation, attempts, date and a parent cause tag. "Expand all" / "Collapse all". Only shown with
// NEXT_PUBLIC_PARENT_DETAIL_ENABLED. Extras (tags, attempts, recorded answers) fail soft: if the API or the SQL is missing
// the list still renders from the wrong-answer rows.
import React from "react";
import { serverGet, serverPut } from "@/lib/serverClient";
import { getTagIndex } from "@/lib/taxonomyLookup";
import { PARENT_CAUSES, parentCauseLabel, answerShown, timeTakenText } from "@/lib/parentDetail";

const card = { background: "#fff", borderRadius: 14, marginBottom: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" };
const btn = { border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", background: "#fff", color: "#1F3F95" };
const fmtDate = (iso) => { const d = new Date(iso); return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Singapore" }); };

function explanationOf(id) {
  try {
    const it = ((getTagIndex().byId || {})[id] || {}).item || {};
    return it.explanation || it.explanation_en || it.learning_tip || "";
  } catch { return ""; }
}

// mistakes: [{key, waId, id, q, topic, yourAnswer, correctAnswer, sessionDate}]
export default function ParentMistakeDetail({ child, subject, mistakes }) {
  const [open, setOpen] = React.useState({});
  const [extra, setExtra] = React.useState(null); // null until loaded or when unavailable
  const [tags, setTags] = React.useState({});
  const [msg, setMsg] = React.useState({});
  React.useEffect(() => {
    let alive = true;
    setExtra(null);
    if (!child || !child.serverId) return undefined;
    serverGet(`/api/parent/mistake-detail?child=${encodeURIComponent(child.serverId)}&subject=${encodeURIComponent(subject)}`)
      .then((r) => { if (alive && r.ok) { setExtra(r); setTags(r.tags || {}); } });
    return () => { alive = false; };
  }, [child && child.serverId, subject]);

  const allOpen = mistakes.length > 0 && mistakes.every((m) => open[m.key]);
  const setAll = (v) => setOpen(Object.fromEntries(mistakes.map((m) => [m.key, v])));

  async function setCause(m, cause) {
    if (!m.waId) return;
    setMsg((x) => ({ ...x, [m.key]: "Saving..." }));
    const r = await serverPut("/api/parent/mistake-detail", { child: child.serverId, wrongAnswerId: m.waId, cause });
    if (r.ok) { setTags((t) => ({ ...t, [m.waId]: cause })); setMsg((x) => ({ ...x, [m.key]: "Saved." })); }
    else setMsg((x) => ({ ...x, [m.key]: r.error || "Could not save the tag." }));
  }

  return (
    <div data-testid="mistake-detail">
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#1B2340", flex: 1 }}>Mistakes ({mistakes.length})</div>
        <button style={btn} onClick={() => setAll(true)} disabled={allOpen}>Expand all</button>
        <button style={btn} onClick={() => setAll(false)} disabled={!mistakes.some((m) => open[m.key])}>Collapse all</button>
      </div>
      {mistakes.length === 0 && <div style={{ fontSize: 12, color: "#6B6F7B" }}>No mistakes recorded yet.</div>}
      {mistakes.map((m) => {
        const isOpen = !!open[m.key];
        const tag = m.waId ? tags[m.waId] : null;
        const fromTrial = extra && extra.answers ? extra.answers[m.id] : null;
        const attempts = extra && extra.attempts && extra.attempts[m.id];
        const elapsedMs = extra && extra.elapsed ? extra.elapsed[m.id] : null;
        const expl = explanationOf(m.id);
        return (
          <div key={m.key} style={card}>
            <button onClick={() => setOpen((o) => ({ ...o, [m.key]: !o[m.key] }))} aria-expanded={isOpen}
              style={{ width: "100%", background: "none", border: "none", padding: "12px 14px", cursor: "pointer", textAlign: "left", display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1B2340", lineHeight: 1.5 }}>{m.q || "Question"}</div>
                <div style={{ fontSize: 10, color: "#6B6F7B", marginTop: 3 }}>
                  {[m.topic, fmtDate(m.sessionDate), tag ? "Cause: " + parentCauseLabel(tag) : ""].filter(Boolean).join("  |  ")}
                </div>
              </div>
              <span style={{ color: "#6B6F7B", fontSize: 16, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }}>›</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 14px 14px" }}>
                {m.q && <div style={{ background: "#FBF6EA", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 13, fontWeight: 600, color: "#1B2340", lineHeight: 1.6 }}>{m.q}</div>}
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <div style={{ flex: 1, background: "#FBF6EA", borderRadius: 10, padding: "8px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#B3261E", marginBottom: 2 }}>{(child && child.name) || "Child"} wrote</div>
                    <div data-testid="child-answer" style={{ fontSize: 13, fontWeight: 700, color: "#7F1D1D" }}>{answerShown(m.yourAnswer, fromTrial)}</div>
                  </div>
                  <div style={{ flex: 1, background: "#FBF6EA", borderRadius: 10, padding: "8px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#4F6B22", marginBottom: 2 }}>Correct answer</div>
                    <div data-testid="correct-answer" style={{ fontSize: 13, fontWeight: 700, color: "#064E3B" }}>{m.correctAnswer || "Not recorded"}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#1B2340", lineHeight: 1.6, marginBottom: 8 }}>
                  <b>Explanation: </b>{expl || "No explanation stored for this question."}
                </div>
                <div style={{ fontSize: 12, color: "#6B6F7B", marginBottom: 8 }}>
                  Attempts: {attempts || "not recorded"}  |  Date: {fmtDate(m.sessionDate) || "unknown"}  |  {timeTakenText(elapsedMs)}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6B6F7B" }}>Cause</span>
                  {PARENT_CAUSES.map((c) => (
                    <button key={c.value} onClick={() => setCause(m, c.value)} disabled={!m.waId || (extra && extra.tagsAvailable === false)} aria-pressed={tag === c.value}
                      style={{ border: "none", borderRadius: 16, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", background: tag === c.value ? "#1F3F95" : "#FBF6EA", color: tag === c.value ? "#fff" : "#6B6F7B" }}>{c.label}</button>
                  ))}
                  {extra && extra.tagsAvailable === false && <span style={{ fontSize: 11, color: "#6B6F7B" }}>Cause tags are not set up yet.</span>}
                  {msg[m.key] && <span style={{ fontSize: 11, color: "#1B2340" }}>{msg[m.key]}</span>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
