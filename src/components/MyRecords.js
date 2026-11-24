"use client";
// "My records": one screen behind the simple study-home button. Tabs: History, Mistakes, Words, Progress.
// Read-only over progress already on the client; starting a word review is delegated to the parent via onStartVocab.
import React, { useEffect, useState } from "react";
import { clewquestEnabled } from "@/lib/clewquest/config";
import { cqGet } from "@/lib/clewquest/client";
import { T, FONT } from "@/lib/theme/tokens";
import { recordRows, mistakeStatus, topicStrengths, vocabCounts } from "@/lib/studyRecords";
import KpiCard from "@/components/KpiCard";

const TABS = [["history", "History"], ["mistakes", "Mistakes"], ["words", "Words"], ["progress", "Progress"]];
const card = { background: "#fff", borderRadius: 14, padding: "10px 14px", marginBottom: 8, boxShadow: "0 1px 6px rgba(27,35,64,.08)" };
const scoreCol = (p) => (p == null ? T.muted : p >= 85 ? T.successText : p >= 70 ? "#B7791F" : T.error);
const show = (v) => (typeof v === "string" || typeof v === "number" ? String(v) : null);
const topicName = (s) => (s.startsWith("sec:") ? s.slice(4) : s);

function History({ rows, onOpen }) {
  if (!rows.length) return <div style={{ color: T.muted }}>No sets yet. Finish your first set to see it here.</div>;
  return rows.map((r) => (
    <button key={r.sessionNum + r.date} data-testid="rec-row" onClick={() => onOpen(r)} style={{ ...card, width: "100%", display: "flex", alignItems: "center", gap: 10, border: "none", textAlign: "left", cursor: "pointer", fontFamily: FONT }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: T.ink }}>{r.label}</div>
        <div style={{ fontSize: 12, color: T.muted }}>{r.date} · {r.subject}{r.threads != null ? ` · +${Math.round(r.threads * 10) / 10} thread that day` : ""}</div>
      </div>
      <div style={{ fontWeight: 900, fontSize: 18, color: scoreCol(r.score) }}>{r.score == null ? "-" : r.score + "%"}</div>
    </button>
  ));
}

function SetDetail({ row, onBack }) {
  return (
    <div data-testid="rec-detail">
      <button onClick={onBack} style={{ background: "none", border: "none", color: T.primary, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: FONT }}>Back to history</button>
      <div style={{ fontWeight: 800, fontSize: 18 }}>{row.label} · {row.score == null ? "-" : row.score + "%"}</div>
      <div style={{ color: T.muted, fontSize: 13, marginBottom: 10 }}>{row.date} · {row.wrong} to fix</div>
      {row.mistakes.length === 0 ? <div style={{ ...card, color: T.successText, fontWeight: 700 }}>No mistakes in this set!</div> : row.mistakes.map((m, i) => (
        <div key={i} style={card}>
          <div style={{ fontWeight: 700 }}>{m.topic || m.sectionType || "Question"}</div>
          {show(m.userAnswer) != null && <div style={{ fontSize: 13, color: T.error }}>Your answer: {show(m.userAnswer)}</div>}
          {show(m.answer) != null && <div style={{ fontSize: 13, color: T.successText }}>Correct answer: {show(m.answer)}</div>}
        </div>
      ))}
    </div>
  );
}

export default function MyRecords({ prog, subject, isZh, dict, vocabState, onBack, onFixMistakes, onReviewTopics, onStartVocab }) {
  const [threadsByDay, setThreads] = useState(null);
  useEffect(() => { // thread earned per day for this subject (ClewQuest only; read-only)
    if (!clewquestEnabled()) return undefined; let live = true;
    cqGet("/api/clewquest/state?history=1").then((r) => { if (!live || !r || !r.ok) return; const m = {}; (r.threadHistory || []).forEach((d) => { m[d.day] = d.bySubject[String(subject).toLowerCase()] || 0; }); setThreads(m); });
    return () => { live = false; };
  }, [subject]);
  const [tab, setTab] = useState("history");
  const [open, setOpen] = useState(null);
  const rows = recordRows(prog, subject, threadsByDay);
  const ms = mistakeStatus(prog);
  const vc = vocabCounts(vocabState, dict);
  const tp = topicStrengths(prog);
  return (
    <div data-testid="my-records" style={{ width: "100%", maxWidth: 480, margin: "0 auto", padding: "16px 16px 80px", background: T.bg, minHeight: "100vh", color: T.ink, fontFamily: FONT, boxSizing: "border-box" }}>
      <button data-testid="rec-back" onClick={onBack} style={{ background: "none", border: "none", color: T.primary, fontWeight: 700, cursor: "pointer", padding: 0, fontFamily: FONT }}>Back</button>
      <h1 style={{ fontSize: 24, margin: "6px 0 10px", fontWeight: 800 }}>My records</h1>
      <div role="tablist" style={{ display: "flex", background: T.track, borderRadius: 12, padding: 4, marginBottom: 14 }}>
        {TABS.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} data-testid={`rec-tab-${k}`} onClick={() => { setTab(k); setOpen(null); }}
            style={{ flex: 1, border: "none", borderRadius: 9, padding: "9px 2px", fontWeight: 800, fontSize: 12, cursor: "pointer", fontFamily: FONT, background: tab === k ? T.primary : "transparent", color: tab === k ? "#fff" : T.muted }}>{l}</button>
        ))}
      </div>
      {tab === "history" && (open ? <SetDetail row={open} onBack={() => setOpen(null)} /> : <History rows={rows} onOpen={setOpen} />)}
      {tab === "mistakes" && (
        <div data-testid="rec-mistakes">
          <div style={{ ...card, display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            <div><div style={{ fontWeight: 900, fontSize: 22, color: T.error }}>{ms.remaining}</div><div style={{ fontSize: 12, color: T.muted }}>to fix</div></div>
            <div><div style={{ fontWeight: 900, fontSize: 22, color: T.successText }}>{ms.fixed}</div><div style={{ fontSize: 12, color: T.muted }}>fixed</div></div>
          </div>
          {onFixMistakes && <button onClick={onFixMistakes} style={{ width: "100%", background: T.cta, color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontWeight: 800, cursor: "pointer", marginBottom: 10, fontFamily: FONT }}>Redo my mistakes</button>}
          {onReviewTopics && <button onClick={onReviewTopics} style={{ width: "100%", background: "#fff", color: T.ink, border: `1.5px solid ${T.border}`, borderRadius: 12, padding: "10px 0", fontWeight: 700, cursor: "pointer", marginBottom: 10, fontFamily: FONT }}>Mistake trends by topic</button>}
          {ms.rows.slice().reverse().slice(0, 40).map((m, i) => (
            <div key={i} data-testid="rec-mistake" data-fixed={m.fixed ? "1" : "0"} style={{ ...card, display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span style={{ fontWeight: 600 }}>{m.topic || m.sectionType || "Question"}<span style={{ color: T.muted, fontSize: 12 }}> · {m.date}</span></span>
              <b style={{ color: m.fixed ? T.successText : T.error, fontSize: 13 }}>{m.fixed ? "Fixed" : "To fix"}</b>
            </div>
          ))}
        </div>
      )}
      {tab === "words" && (
        <div data-testid="rec-words">
          <div style={{ ...card, display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            <div><div data-testid="rec-words-due" style={{ fontWeight: 900, fontSize: 22 }}>{vc.due}</div><div style={{ fontSize: 12, color: T.muted }}>words due today</div></div>
            <div><div data-testid="rec-words-mastered" style={{ fontWeight: 900, fontSize: 22, color: T.successText }}>{vc.mastered}</div><div style={{ fontSize: 12, color: T.muted }}>words mastered</div></div>
          </div>
          {vc.due > 0
            ? <button data-testid="rec-words-start" onClick={onStartVocab} style={{ width: "100%", background: T.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontWeight: 800, cursor: "pointer", fontFamily: FONT }}>Start word review</button>
            : <div style={{ color: T.muted, fontSize: 14 }}>No words due today. Words you tap as unknown or get wrong show up here.</div>}
        </div>
      )}
      {tab === "progress" && (
        <div data-testid="rec-progress">
          <KpiCard prog={prog} isZh={isZh} accent={T.primary} />
          <TopicList title="My strengths" rows={tp.strong} color={T.successText} empty="Answer a few more questions to see your strengths." />
          <TopicList title="Needs practice" rows={tp.weak} color={T.error} empty="Nothing to fix yet." />
        </div>
      )}
    </div>
  );
}

function TopicList({ title, rows, color, empty }) {
  return (
    <div style={{ ...card, marginTop: 10 }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{title}</div>
      {rows.length === 0 ? <div style={{ color: T.muted, fontSize: 14 }}>{empty}</div> : rows.map((r) => (
        <div key={r.skill} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "3px 0" }}><span>{topicName(r.skill)}</span><b style={{ color }}>{Math.round(r.rate * 100)}% first try</b></div>
      ))}
    </div>
  );
}
