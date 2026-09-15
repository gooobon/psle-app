"use client";
import React, { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
//  EnReviewGate - end-of-round spaced-review gate for ENGLISH (Step 4).
//  Mirror of ZhReviewGate: words come only from this round's vocabulary
//  mistakes, guessed-but-correct items and looked-up words; capped upstream at
//  10. Recognition quiz: word -> meaning (4 options from en_vocab.json).
//  Grades into the language-scoped Leitner store via the `store` prop.
// ---------------------------------------------------------------------------

function head(s) { return String(s || "").split(/[;,/(]/)[0].trim().toLowerCase(); }
function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function buildQuestion(word, dict, pool) {
  const e = dict[word]; const correct = (e && e.def) || "";
  const used = new Set([head(correct)]); const distractors = [];
  for (const cand of pool) {
    if (distractors.length >= 3) break;
    const c = dict[cand]; const d = (c && c.def) || ""; const h = head(d);
    if (!d || !h || used.has(h)) continue;
    if (e && c && e.pos && c.pos && e.pos !== c.pos && distractors.length < 2 && pool.length > 40) continue; // prefer same part of speech
    used.add(h); distractors.push(d);
  }
  return { word, correct, options: shuffle([correct, ...distractors].filter(Boolean)) };
}

export default function EnReviewGate({ words, dict, store, onDone }) {
  const questions = useMemo(() => {
    const keys = Object.keys(dict || {}).filter((k) => dict[k] && dict[k].def);
    return (words || []).filter((w) => dict && dict[w]).map((w) => buildQuestion(w, dict, shuffle(keys).filter((k) => k !== w)));
  }, [words, dict]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState(questions.length ? "quiz" : "summary");

  if (!questions.length) {
    return (
      <div style={wrap}><div style={card}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>No words to review this round</div>
        <div style={{ fontSize: 15, color: "#475569", marginTop: 8 }}>No vocabulary mistakes and no looked-up words. Keep it up!</div>
        <button style={primaryBtn} onClick={onDone}>See results &rarr;</button>
      </div></div>
    );
  }
  if (phase === "summary") {
    const s = store ? store.stats() : { mastered: 0, active: 0 };
    return (
      <div style={wrap}><div style={card}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>Word review done</div>
        <div style={{ fontSize: 15, color: "#334155", marginTop: 10, lineHeight: 1.9 }}>
          Reviewed <b>{questions.length}</b> words &middot; right <b style={{ color: "#16a34a" }}>{right}</b> &middot; to practise again <b style={{ color: "#dc2626" }}>{wrong}</b>
        </div>
        <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Mastered so far <b>{s.mastered}</b> &middot; still reviewing <b>{s.active}</b></div>
        <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 12 }}>
          {wrong > 0 ? "Words you missed will come back in a later round until you get them right twice." : "All correct! These words will come back after a few rounds to make sure they stick."}
        </div>
        <button style={primaryBtn} onClick={onDone}>See results &rarr;</button>
      </div></div>
    );
  }

  const q = questions[idx]; const answered = picked !== null; const e = (dict && dict[q.word]) || {};
  function choose(opt) {
    if (answered) return;
    const ok = opt === q.correct; setPicked(opt);
    if (store) store.grade(q.word, ok);
    if (ok) setRight((n) => n + 1); else setWrong((n) => n + 1);
  }
  function next() { if (idx + 1 >= questions.length) { setPhase("summary"); return; } setIdx((i) => i + 1); setPicked(null); }

  return (
    <div style={wrap}><div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>Word review</div>
        <div style={{ fontSize: 13, color: "#94a3b8" }}>{idx + 1} / {questions.length}</div>
      </div>
      <div style={{ fontSize: 15, color: "#475569", marginBottom: 6 }}>What does this word mean?</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>{q.word}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => {
          let bg = "#fff", border = "1px solid #e2e8f0", color = "#1f2937";
          if (answered) {
            if (opt === q.correct) { bg = "#e7f6ef"; border = "1.5px solid #16a34a"; color = "#065f46"; }
            else if (opt === picked) { bg = "#fdece8"; border = "1.5px solid #dc2626"; color = "#991b1b"; }
            else color = "#94a3b8";
          }
          return (
            <button key={i} onClick={() => choose(opt)} disabled={answered}
              style={{ textAlign: "left", padding: "11px 14px", borderRadius: 10, background: bg, border, color, fontSize: 15, cursor: answered ? "default" : "pointer", lineHeight: 1.5 }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px dashed #e5e7eb" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: picked === q.correct ? "#16a34a" : "#dc2626", marginBottom: 8 }}>
            {picked === q.correct ? "Correct!" : "Not quite - remember this:"}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{q.word}{e.pos ? <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}> ({e.pos})</span> : null}</div>
          <div style={{ fontSize: 14, color: "#1f2937", marginTop: 4 }}>{e.def || ""}</div>
          {e.ex ? <div style={{ fontSize: 14, color: "#334155", marginTop: 8, fontStyle: "italic" }}>{e.ex}</div> : null}
          {Array.isArray(e.syn) && e.syn.length ? <div style={{ fontSize: 12, color: "#0d9488", marginTop: 4 }}>= {e.syn.join(", ")}</div> : null}
          <button style={primaryBtn} onClick={next}>{idx + 1 >= questions.length ? "Finish review \u2192" : "Next \u2192"}</button>
        </div>
      )}
    </div></div>
  );
}

const wrap = { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px" };
const card = { width: "100%", maxWidth: 460, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, boxShadow: "0 8px 28px rgba(15,23,42,.08)", padding: "22px 22px 24px" };
const primaryBtn = { marginTop: 18, width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" };
