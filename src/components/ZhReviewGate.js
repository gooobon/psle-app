"use client";
import React, { useMemo, useState } from "react";
import { grade, stats } from "@/lib/zhReview";

// ---------------------------------------------------------------------------
//  P4 复习关 — end-of-session spaced-review gate (recognition mini-quiz).
//  PURE REVIEW: `words` come ONLY from what the student tapped ("didn't know")
//  or the core words of questions they got wrong. No new vocabulary is added.
//  Capped upstream at <=10 words. All UI is Chinese (this only runs on the
//  Chinese paper); the meaning / synonym / example text stays English on
//  purpose — that is the learning layer the student reads to understand.
// ---------------------------------------------------------------------------

const ZH_FONT = "'KaiTi','STKaiti','LXGW WenKai',serif";
const HAN_RE = /[一-鿿]/;

// first clause of an English gloss, for de-duping option text
function head(en) {
  return String(en || "").split(/[;,/(]/)[0].trim().toLowerCase();
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a 4-option recognition question for `word`: correct English gloss +
// 3 plausible distractor glosses drawn from other dictionary entries.
function buildQuestion(word, dict, pool) {
  const correct = (dict[word] && dict[word].en) || "";
  const used = new Set([head(correct)]);
  const distractors = [];
  for (const cand of pool) {
    if (distractors.length >= 3) break;
    const en = (dict[cand] && dict[cand].en) || "";
    const h = head(en);
    if (!en || !h || used.has(h)) continue;
    used.add(h);
    distractors.push(en);
  }
  const options = shuffle([correct, ...distractors].filter(Boolean));
  return { word, correct, options };
}

export default function ZhReviewGate({ words, dict, onDone }) {
  // Precompute questions once (stable order + options for the whole gate run).
  const questions = useMemo(() => {
    const keys = Object.keys(dict || {}).filter((k) => (dict[k] && dict[k].en) && HAN_RE.test(k));
    return (words || [])
      .filter((w) => dict && dict[w])
      .map((w) => {
        // per-word distractor pool: shuffled dict keys minus the word itself
        const pool = shuffle(keys).filter((k) => k !== w);
        return buildQuestion(w, dict, pool);
      });
  }, [words, dict]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);   // chosen option string (null = unanswered)
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState(questions.length ? "quiz" : "summary");

  // Nothing to review → tell the parent to move straight to the exam summary.
  if (!questions.length) {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ fontFamily: ZH_FONT, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>本次没有需要复习的词语 🎉</div>
          <div style={{ fontFamily: ZH_FONT, fontSize: 15, color: "#475569", marginTop: 8 }}>
            这一轮你没有点开不懂的词语，答错题里也没有需要巩固的生词。继续保持！
          </div>
          <button style={primaryBtn} onClick={onDone}>查看成绩 →</button>
        </div>
      </div>
    );
  }

  if (phase === "summary") {
    const s = stats();
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ fontFamily: ZH_FONT, fontSize: 22, fontWeight: 800, color: "#0f172a" }}>复习完成 ✅</div>
          <div style={{ fontFamily: ZH_FONT, fontSize: 15, color: "#334155", marginTop: 10, lineHeight: 1.9 }}>
            本次复习 <b>{questions.length}</b> 个词语 · 答对 <b style={{ color: "#16a34a" }}>{right}</b> · 还需巩固 <b style={{ color: "#dc2626" }}>{wrong}</b>
          </div>
          <div style={{ fontFamily: ZH_FONT, fontSize: 14, color: "#64748b", marginTop: 4 }}>
            累计掌握 <b>{s.mastered}</b> 个 · 还在复习 <b>{s.active}</b> 个
          </div>
          <div style={{ fontFamily: ZH_FONT, fontSize: 13, color: "#94a3b8", marginTop: 12 }}>
            {wrong > 0 ? "还需巩固的词语会在下一轮再出现，直到你连续答对为止。" : "全部答对！这些词语会隔几轮再考一次，帮你记得更牢。"}
          </div>
          <button style={primaryBtn} onClick={onDone}>查看成绩 →</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const answered = picked !== null;
  const e = (dict && dict[q.word]) || {};

  function choose(opt) {
    if (answered) return;
    const ok = opt === q.correct;
    setPicked(opt);
    grade(q.word, ok);           // update the Leitner store for this word
    if (ok) setRight((n) => n + 1);
    else setWrong((n) => n + 1);
  }
  function next() {
    if (idx + 1 >= questions.length) { setPhase("summary"); return; }
    setIdx((i) => i + 1);
    setPicked(null);
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: ZH_FONT, fontSize: 14, fontWeight: 700, color: "#2563eb" }}>复习关</div>
          <div style={{ fontFamily: ZH_FONT, fontSize: 13, color: "#94a3b8" }}>{idx + 1} / {questions.length}</div>
        </div>
        <div style={{ fontFamily: ZH_FONT, fontSize: 15, color: "#475569", marginBottom: 6 }}>这个词语是什么意思？</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
          <span style={{ fontFamily: ZH_FONT, fontSize: 40, fontWeight: 800, color: "#0f172a" }}>{q.word}</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#2563eb" }}>{e.py || ""}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = "#fff", border = "1px solid #e2e8f0", color = "#1f2937";
            if (answered) {
              if (opt === q.correct) { bg = "#e7f6ef"; border = "1.5px solid #16a34a"; color = "#065f46"; }
              else if (opt === picked) { bg = "#fdece8"; border = "1.5px solid #dc2626"; color = "#991b1b"; }
              else { color = "#94a3b8"; }
            }
            return (
              <button key={i} onClick={() => choose(opt)} disabled={answered}
                style={{ textAlign: "left", padding: "11px 14px", borderRadius: 10, background: bg,
                  border, color, fontSize: 15, cursor: answered ? "default" : "pointer", lineHeight: 1.5 }}>
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px dashed #e5e7eb" }}>
            <div style={{ fontFamily: ZH_FONT, fontSize: 15, fontWeight: 700, color: picked === q.correct ? "#16a34a" : "#dc2626", marginBottom: 8 }}>
              {picked === q.correct ? "✓ 答对了！" : "✗ 再记一遍："}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: ZH_FONT, fontSize: 20, fontWeight: 700 }}>{q.word}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>{e.py || ""}</span>
            </div>
            <div style={{ fontSize: 14, color: "#1f2937", marginTop: 4 }}>{e.en || ""}</div>
            {e.ex ? (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: ZH_FONT, fontSize: 15 }}>{e.ex.zh}</div>
                <div style={{ fontSize: 12, color: "#2563eb" }}>{e.ex.py}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{e.ex.en}</div>
              </div>
            ) : null}
            <button style={primaryBtn} onClick={next}>
              {idx + 1 >= questions.length ? "完成复习 →" : "下一个 →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const wrap = { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "flex-start",
  justifyContent: "center", padding: "32px 16px" };
const card = { width: "100%", maxWidth: 460, background: "#fff", border: "1px solid #e5e7eb",
  borderRadius: 18, boxShadow: "0 8px 28px rgba(15,23,42,.08)", padding: "22px 22px 24px" };
const primaryBtn = { marginTop: 18, width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
  background: "#2563eb", color: "#fff", fontFamily: ZH_FONT, fontSize: 15, fontWeight: 700, cursor: "pointer" };
