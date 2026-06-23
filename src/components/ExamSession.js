"use client";
import React, { useState, useRef, useCallback } from "react";
import { C } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER } from "@/lib/quizMeta";
import { fmtTime, guessFlag } from "@/lib/sessionUtils";

// ─────────────────────────────────────────────────────────────
//  EXAM MODE — Looks & feels like a real Singapore P3 exam paper
//  • All questions shown at once per page (4–5 per page)
//  • Student can freely move between questions on same page
//  • "Submit Page" → marks + explanations revealed for that page
//  • Then moves to next page
// ─────────────────────────────────────────────────────────────

const EXAM_FONT = "'Times New Roman', Times, serif";
const EXAM_BODY = "'Arial', sans-serif";

// ── Shared exam styles ────────────────────────────────────────
const S = {
  page: {
    background: "#fff",
    minHeight: "100vh",
    fontFamily: EXAM_BODY,
    color: "#000",
  },
  header: {
    borderBottom: "2px solid #000",
    padding: "12px 20px 10px",
    background: "#fff",
  },
  sectionHeader: {
    fontFamily: EXAM_FONT,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
    marginTop: 16,
  },
  instructions: {
    fontFamily: EXAM_BODY,
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  qNum: {
    fontFamily: EXAM_BODY,
    fontWeight: "bold",
    fontSize: 14,
    minWidth: 24,
    paddingTop: 1,
  },
  qText: {
    fontFamily: EXAM_BODY,
    fontSize: 14,
    lineHeight: 1.8,
    flex: 1,
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: 28,
    marginBottom: 3,
    cursor: "pointer",
    fontSize: 14,
    fontFamily: EXAM_BODY,
    lineHeight: 1.6,
  },
  divider: {
    borderTop: "1px solid #ccc",
    margin: "14px 0",
  },
  answerBox: {
    display: "inline-block",
    border: "1.5px solid #000",
    minWidth: 120,
    height: 28,
    verticalAlign: "middle",
    margin: "0 4px",
    padding: "2px 6px",
    fontFamily: EXAM_BODY,
    fontSize: 14,
  },
  bracketAns: {
    display: "inline-block",
    border: "1px solid #000",
    width: 32,
    height: 22,
    textAlign: "center",
    lineHeight: "20px",
    fontSize: 13,
    fontFamily: EXAM_BODY,
    marginLeft: 8,
    verticalAlign: "middle",
  },
};

// ── Helper: split questions into pages of N ───────────────────
function paginate(items, perPage = 4) {
  const pages = [];
  for (let i = 0; i < items.length; i += perPage) {
    pages.push(items.slice(i, i + perPage));
  }
  return pages;
}

// ── Explanation box shown after Submit ────────────────────────
function ExplanationBox({ correct, answer, explanation, tip }) {
  return (
    <div style={{
      marginTop: 6, marginLeft: 28, marginBottom: 8,
      borderLeft: `3px solid ${correct ? "#16a34a" : "#dc2626"}`,
      paddingLeft: 10, background: correct ? "#f0fdf4" : "#fef2f2",
      borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: correct ? "#16a34a" : "#dc2626", marginBottom: 3 }}>
        {correct ? "✓ Correct" : `✗ Correct answer: ${answer}`}
      </div>
      {explanation && (
        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{explanation}</div>
      )}
      {tip && (
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, fontStyle: "italic" }}>
          💡 {tip}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  MCQ PAGE — Grammar MCQ / Vocab MCQ
// ════════════════════════════════════════════════════════════
function MCQPage({ items, pageIdx, totalPages, globalQStart, sectionLabel, marks, instructions, onPageDone }) {
  const [answers, setAnswers] = useState({});   // id -> optionIndex
  const [submitted, setSubmitted] = useState(false);
  const startRef = useRef(Date.now());

  function handleSelect(id, i) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [id]: i }));
  }

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const t = Date.now() - startRef.current;
    const results = items.map(q => ({
      id: q.id, topic: q.topic, sectionType: q.topic,
      correct: answers[q.id] === q.answer,
      studentAnswer: answers[q.id] ?? -1,
      correctAnswer: q.answer,
      attempts: answers[q.id] !== undefined ? 1 : 0,
      timeTaken: Math.round(t / items.length),
      explanation: q.explanation || "",
      hint: q.hints?.[0] || "",
    }));
    onPageDone(results);
  }

  const allAnswered = items.every(q => answers[q.id] !== undefined);
  const score = submitted ? items.filter(q => answers[q.id] === q.answer).length : 0;

  return (
    <div style={S.page}>
      {/* Section header */}
      <div style={{ padding: "14px 20px 0" }}>
        <div style={S.sectionHeader}>{sectionLabel} ({marks} mark{marks !== 1 ? "s" : ""})</div>
        <div style={S.instructions}>{instructions}</div>
        {/* word bank / blank */}
      </div>

      <div style={{ padding: "0 20px 120px" }}>
        {items.map((q, qi) => {
          const qNum = globalQStart + qi;
          const chosen = answers[q.id];
          const isCorrect = submitted && chosen === q.answer;
          const isWrong = submitted && chosen !== q.answer;

          return (
            <div key={q.id} style={{ marginBottom: 18 }}>
              {/* Question */}
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={S.qNum}>{qNum}.</span>
                <span style={S.qText}>
                  {q.sentence || q.question || ""}
                </span>
              </div>

              {/* Options */}
              {(q.options || []).map((opt, i) => {
                const isAns = i === q.answer;
                const isSel = chosen === i;
                let color = "#000";
                let fontWeight = "normal";
                let prefix = `(${i + 1})`;
                if (submitted) {
                  if (isAns) { color = "#16a34a"; fontWeight = "700"; }
                  else if (isSel && !isAns) { color = "#dc2626"; }
                }
                return (
                  <div key={i}
                    onClick={() => handleSelect(q.id, i)}
                    style={{
                      ...S.optionRow,
                      color,
                      fontWeight,
                      cursor: submitted ? "default" : "pointer",
                      background: !submitted && isSel ? "#dbeafe" : "transparent",
                      borderRadius: 4,
                      padding: "1px 4px",
                    }}>
                    <span style={{ minWidth: 28, fontFamily: EXAM_BODY, fontSize: 14 }}>{prefix}</span>
                    <span>{opt}</span>
                    {submitted && isAns && <span style={{ marginLeft: 4 }}>✓</span>}
                    {submitted && isSel && !isAns && <span style={{ marginLeft: 4, color: "#dc2626" }}>✗</span>}
                    {/* Answer bracket */}
                    {i === q.options.length - 1 && (
                      <span style={{ ...S.bracketAns, marginLeft: "auto",
                        background: submitted ? (isCorrect ? "#f0fdf4" : "#fef2f2") : (isSel ? "#dbeafe" : "#fff"),
                        color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen !== undefined ? "#1d4ed8" : "#000"),
                        borderColor: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : "#000",
                      }}>
                        {chosen !== undefined ? chosen + 1 : ""}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Explanation after submit */}
              {submitted && (
                <ExplanationBox
                  correct={isCorrect}
                  answer={q.options[q.answer]}
                  explanation={q.explanation || q.hints?.[0]}
                  tip={q.hints?.[1]}
                />
              )}

              {qi < items.length - 1 && <div style={S.divider} />}
            </div>
          );
        })}

        {/* Score summary after submit */}
        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>
              Page score: {score}/{items.length}
            </span>
            <span style={{ fontSize: 13, color: score === items.length ? "#16a34a" : score >= items.length * 0.6 ? "#d97706" : "#dc2626", fontWeight: 700 }}>
              {Math.round(score / items.length * 100)}%
            </span>
          </div>
        )}

        {/* Submit / Next button */}
        {!submitted ? (
          <button onClick={handleSubmit}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8",
              color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed",
              fontFamily: EXAM_BODY,
            }}>
            Submit Page {pageIdx + 1}/{totalPages}
            {!allAnswered && <span style={{ fontSize: 12, fontWeight: 400, display: "block" }}>
              Answer all {items.length} questions first
            </span>}
          </button>
        ) : (
          <button onClick={() => onPageDone(null, true)}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
            }}>
            {pageIdx + 1 >= totalPages ? "Finish Section →" : `Next Page →`}
          </button>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  CLOZE PAGE — Grammar Cloze / Vocab Cloze
// ════════════════════════════════════════════════════════════
function ClozePage({ set, sectionLabel, marks, onPageDone }) {
  const blanks = set.blanks || [];
  const wordBank = set.wordBank || [];
  const [answers, setAnswers] = useState({});   // num -> word
  const [submitted, setSubmitted] = useState(false);
  const startRef = useRef(Date.now());

  function handleSelect(num, word) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [num]: word }));
  }

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const t = Date.now() - startRef.current;
    const results = blanks.map(b => ({
      id: `${set.id}_${b.num}`, topic: "GrammarCloze", sectionType: "GrammarCloze",
      correct: (answers[b.num] || "").toLowerCase() === (b.answer || "").toLowerCase(),
      timeTaken: Math.round(t / blanks.length),
    }));
    onPageDone(results);
  }

  const allAnswered = blanks.every(b => answers[b.num] !== undefined);
  const score = submitted ? blanks.filter(b =>
    (answers[b.num] || "").toLowerCase() === (b.answer || "").toLowerCase()
  ).length : 0;

  // Render passage with inline blanks
  function renderPassage() {
    let passage = set.passage || "";
    // Replace blank markers like (8)_______ with rendered blanks
    const parts = [];
    let last = 0;
    const blankRegex = /\((\d+)\)\s*_{3,}/g;
    let match;
    while ((match = blankRegex.exec(passage)) !== null) {
      const num = parseInt(match[1]);
      const blank = blanks.find(b => b.num === num);
      if (!blank) continue;
      parts.push(passage.slice(last, match.index));
      const chosen = answers[num];
      const isCorrect = submitted && (chosen || "").toLowerCase() === (blank.answer || "").toLowerCase();
      parts.push(
        <span key={num} style={{ display: "inline-block", position: "relative" }}>
          <span style={{ fontSize: 12, fontWeight: 700, verticalAlign: "super", marginRight: 2 }}>({num})</span>
          <span
            onClick={() => !submitted && setAnswers(a => ({ ...a, [num]: undefined }))}
            style={{
              display: "inline-block",
              minWidth: 100, borderBottom: "1.5px solid #000",
              padding: "0 4px", textAlign: "center",
              color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen ? "#1d4ed8" : "transparent"),
              fontWeight: chosen ? 600 : 400,
              fontSize: 14,
            }}>
            {chosen || "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          </span>
          {submitted && !isCorrect && (
            <span style={{ fontSize: 11, color: "#16a34a", marginLeft: 4 }}>→ {blank.answer}</span>
          )}
        </span>
      );
      last = match.index + match[0].length;
    }
    parts.push(passage.slice(last));
    return parts;
  }

  return (
    <div style={S.page}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={S.sectionHeader}>{sectionLabel} ({marks} mark{marks !== 1 ? "s" : ""})</div>
        <div style={S.instructions}>
          Read the passage carefully. Choose the correct word from the words given in the box and write its letter in each blank. Use each word once only.
        </div>

        {/* Word bank */}
        {wordBank.length > 0 && (
          <div style={{
            border: "1px solid #000", borderRadius: 4,
            padding: "10px 14px", marginBottom: 14,
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6,
          }}>
            {wordBank.map((w, i) => {
              const letter = String.fromCharCode(65 + i);
              const isUsed = Object.values(answers).includes(w);
              return (
                <div key={w}
                  onClick={() => {
                    // Find next unfilled blank and fill it
                    if (submitted) return;
                    const nextBlank = blanks.find(b => !answers[b.num]);
                    if (nextBlank) handleSelect(nextBlank.num, w);
                  }}
                  style={{
                    fontSize: 14, fontFamily: EXAM_BODY,
                    cursor: submitted ? "default" : "pointer",
                    opacity: submitted ? 1 : (isUsed ? 0.4 : 1),
                    padding: "3px 6px", borderRadius: 4,
                    background: !submitted && isUsed ? "#f1f5f9" : "transparent",
                  }}>
                  ({letter}) {w}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* Passage */}
        <div style={{
          border: "1px solid #ddd", borderRadius: 8, padding: "14px 16px",
          marginBottom: 16, fontSize: 14, fontFamily: EXAM_BODY, lineHeight: 2,
        }}>
          {set.passage ? renderPassage() : (
            // Fallback: show blanks as separate items
            blanks.map((b, i) => {
              const chosen = answers[b.num];
              const isCorrect = submitted && (chosen || "").toLowerCase() === (b.answer || "").toLowerCase();
              return (
                <div key={b.num} style={{ marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, marginRight: 6 }}>({b.num})</span>
                  <span style={{ marginRight: 8, color: "#64748b" }}>{b.stem || ""}</span>
                  <span style={{
                    display: "inline-block", borderBottom: "1.5px solid #000",
                    minWidth: 100, textAlign: "center", padding: "0 4px",
                    color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen ? "#1d4ed8" : "transparent"),
                    fontWeight: 600,
                  }}>{chosen || "\u00A0\u00A0\u00A0"}</span>
                  {submitted && !isCorrect && (
                    <span style={{ fontSize: 12, color: "#16a34a", marginLeft: 6 }}>→ {b.answer}</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Word bank buttons for selection */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>
            Tap a word to fill the next blank:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {wordBank.map((w, i) => {
              const letter = String.fromCharCode(65 + i);
              const isUsed = Object.values(answers).includes(w);
              return (
                <button key={w} disabled={submitted || isUsed}
                  onClick={() => {
                    const nextBlank = blanks.find(b => !answers[b.num]);
                    if (nextBlank) handleSelect(nextBlank.num, w);
                  }}
                  style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 14,
                    border: "1.5px solid #000", fontFamily: EXAM_BODY,
                    background: isUsed ? "#f1f5f9" : "#fff",
                    color: isUsed ? "#94a3b8" : "#000",
                    cursor: submitted || isUsed ? "not-allowed" : "pointer",
                    textDecoration: isUsed ? "line-through" : "none",
                    fontWeight: 600,
                  }}>
                  ({letter}) {w}
                </button>
              );
            })}
          </div>
          {/* Clear buttons */}
          {!submitted && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {blanks.map(b => answers[b.num] && (
                <button key={b.num}
                  onClick={() => setAnswers(a => { const n = {...a}; delete n[b.num]; return n; })}
                  style={{
                    padding: "3px 10px", borderRadius: 6, fontSize: 12,
                    border: "1px solid #e2e8f0", background: "#f8fafc",
                    cursor: "pointer", color: "#64748b",
                  }}>
                  Clear ({b.num}): {answers[b.num]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Explanations after submit */}
        {submitted && blanks.map(b => {
          const isCorrect = (answers[b.num] || "").toLowerCase() === (b.answer || "").toLowerCase();
          return b.hints?.[0] ? (
            <ExplanationBox key={b.num}
              correct={isCorrect}
              answer={b.answer}
              explanation={b.hints[0]}
            />
          ) : null;
        })}

        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Score: {score}/{blanks.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: score === blanks.length ? "#16a34a" : "#d97706" }}>
              {Math.round(score / blanks.length * 100)}%
            </span>
          </div>
        )}

        <div style={{ paddingBottom: 120 }}>
          {!submitted ? (
            <button onClick={handleSubmit}
              style={{
                width: "100%", padding: "14px", borderRadius: 10,
                background: allAnswered ? "#1e3a6e" : "#94a3b8",
                color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
                cursor: allAnswered ? "pointer" : "not-allowed", fontFamily: EXAM_BODY,
              }}>
              Submit
            </button>
          ) : (
            <button onClick={() => onPageDone(null, true)}
              style={{
                width: "100%", padding: "14px", borderRadius: 10,
                background: "#1e3a6e", color: "#fff", border: "none",
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
              }}>
              Next Section →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  EDITING PAGE — Type the correct spelling
// ════════════════════════════════════════════════════════════
function EditingPage({ set, sectionLabel, marks, onPageDone }) {
  const items = set.items || [];
  const [answers, setAnswers] = useState({});   // id -> string
  const [submitted, setSubmitted] = useState(false);
  const startRef = useRef(Date.now());

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const t = Date.now() - startRef.current;
    const results = items.map(item => ({
      id: item.id, topic: "Editing", sectionType: "Editing",
      correct: (answers[item.id] || "").trim().toLowerCase() === (item.answer || "").toLowerCase(),
      timeTaken: Math.round(t / items.length),
    }));
    onPageDone(results);
  }

  const score = submitted ? items.filter(item =>
    (answers[item.id] || "").trim().toLowerCase() === (item.answer || "").toLowerCase()
  ).length : 0;

  // Render passage with underlined wrong words and answer boxes
  function renderPassageWithBoxes() {
    // passage has underlined words marked in item.sentence
    // Show full passage with boxes where answers go
    const passage = set.passage || set.instructions || "";
    if (!passage) return null;

    // Find all items' wrong words in passage and render
    let parts = [passage];
    items.forEach((item, idx) => {
      parts = parts.flatMap(part => {
        if (typeof part !== "string") return [part];
        const ww = item.wrongWord || item.errorWord || "";
        if (!ww || !part.includes(ww)) return [part];
        const splitParts = part.split(ww);
        return splitParts.flatMap((p, i) => {
          if (i === splitParts.length - 1) return [p];
          const isC = submitted && (answers[item.id] || "").trim().toLowerCase() === (item.answer || "").toLowerCase();
          return [
            p,
            <span key={`${item.id}_${i}`} style={{ display: "inline-block" }}>
              {/* Question number */}
              <span style={{ fontSize: 12, fontWeight: 700, verticalAlign: "super", marginRight: 2 }}>
                ({item.questionNumber || idx + 1})
              </span>
              {/* Wrong word with strikethrough after submit */}
              <span style={{
                textDecoration: "underline",
                fontStyle: "italic",
                color: submitted ? "#dc2626" : "#000",
                textDecorationStyle: submitted ? "line-through" : "underline",
              }}>{ww}</span>
            </span>
          ];
        });
      });
    });

    return parts;
  }

  return (
    <div style={S.page}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={S.sectionHeader}>{sectionLabel} ({marks} mark{marks !== 1 ? "s" : ""})</div>
        <div style={S.instructions}>
          Each of the underlined words contains a spelling error. Write the correct word in the box provided.
        </div>
      </div>

      <div style={{ padding: "0 20px 120px" }}>
        {/* Passage */}
        {(set.passage || set.text) && (
          <div style={{
            border: "1px solid #ddd", borderRadius: 8, padding: "14px 16px",
            marginBottom: 20, fontSize: 14, fontFamily: `${EXAM_FONT}`,
            lineHeight: 2, fontStyle: "italic",
          }}>
            {renderPassageWithBoxes()}
          </div>
        )}

        {/* Answer boxes */}
        {items.map((item, idx) => {
          const qNum = item.questionNumber || idx + 1;
          const typed = answers[item.id] || "";
          const isCorrect = submitted && typed.trim().toLowerCase() === (item.answer || "").toLowerCase();
          const isWrong = submitted && !isCorrect;

          return (
            <div key={item.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, minWidth: 32 }}>({qNum})</span>
                {/* Sentence context */}
                <span style={{ fontSize: 13, color: "#64748b", flex: 1, fontFamily: EXAM_BODY }}>
                  {item.sentence?.replace(item.wrongWord, `[${item.wrongWord}]`) || ""}
                </span>
              </div>

              {/* Answer input / display */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 32 }}>
                {!submitted ? (
                  <input
                    type="text"
                    value={typed}
                    onChange={e => setAnswers(a => ({ ...a, [item.id]: e.target.value }))}
                    placeholder="Write correct spelling..."
                    style={{
                      ...S.answerBox,
                      minWidth: 160, border: `1.5px solid ${typed ? "#1d4ed8" : "#000"}`,
                      outline: "none", borderRadius: 4, color: "#1d4ed8",
                    }}
                  />
                ) : (
                  <span style={{
                    ...S.answerBox, display: "inline-flex", alignItems: "center",
                    border: `1.5px solid ${isCorrect ? "#16a34a" : "#dc2626"}`,
                    color: isCorrect ? "#16a34a" : "#dc2626",
                    fontWeight: 700, borderRadius: 4, minWidth: 160,
                  }}>
                    {typed || "(blank)"}
                    <span style={{ marginLeft: 4 }}>{isCorrect ? "✓" : "✗"}</span>
                  </span>
                )}
              </div>

              {/* Explanation */}
              {submitted && (
                <ExplanationBox
                  correct={isCorrect}
                  answer={item.answer}
                  explanation={item.hints?.[0] || item.solution?.steps?.join(" ")}
                  tip={item.hints?.[1] || item.solution?.tip}
                />
              )}

              {idx < items.length - 1 && <div style={{ ...S.divider, marginLeft: 32 }} />}
            </div>
          );
        })}

        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Score: {score}/{items.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: score === items.length ? "#16a34a" : "#d97706" }}>
              {Math.round(score / items.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
            }}>
            Submit
          </button>
        ) : (
          <button onClick={() => onPageDone(null, true)}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
            }}>
            Next Section →
          </button>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  COMPREHENSION PAGE
// ════════════════════════════════════════════════════════════
function CompPage({ set, sectionLabel, marks, onPageDone }) {
  const questions = set.questions || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const startRef = useRef(Date.now());

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const t = Date.now() - startRef.current;
    const results = questions.map(q => ({
      id: q.id, topic: "Comprehension", sectionType: "Comprehension",
      correct: answers[q.id] === q.answer,
      timeTaken: Math.round(t / questions.length),
    }));
    onPageDone(results);
  }

  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const score = submitted ? questions.filter(q => answers[q.id] === q.answer).length : 0;

  return (
    <div style={S.page}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={S.sectionHeader}>{sectionLabel} ({marks} mark{marks !== 1 ? "s" : ""})</div>
      </div>

      <div style={{ padding: "0 20px 120px" }}>
        {/* Passage */}
        <div style={{
          border: "1px solid #ddd", borderRadius: 8, padding: "14px 16px",
          marginBottom: 16, fontSize: 14, fontFamily: EXAM_FONT, lineHeight: 2,
        }}>
          {set.passage}
        </div>

        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          const isCorrect = submitted && chosen === q.answer;

          return (
            <div key={q.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={S.qNum}>{qi + 1}.</span>
                <span style={S.qText}>{q.question}</span>
              </div>

              {(q.options || []).map((opt, i) => {
                const isAns = i === q.answer;
                const isSel = chosen === i;
                return (
                  <div key={i}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: i }))}
                    style={{
                      ...S.optionRow,
                      cursor: submitted ? "default" : "pointer",
                      color: submitted ? (isAns ? "#16a34a" : isSel && !isAns ? "#dc2626" : "#000") : "#000",
                      fontWeight: submitted && isAns ? 700 : "normal",
                      background: !submitted && isSel ? "#dbeafe" : "transparent",
                      borderRadius: 4, padding: "1px 4px",
                    }}>
                    <span style={{ minWidth: 28 }}>({i + 1})</span>
                    <span>{opt}</span>
                    {submitted && isAns && <span style={{ marginLeft: 4 }}>✓</span>}
                  </div>
                );
              })}

              {submitted && (
                <ExplanationBox
                  correct={isCorrect}
                  answer={q.options?.[q.answer]}
                  explanation={q.hints?.[0]}
                />
              )}

              {qi < questions.length - 1 && <div style={S.divider} />}
            </div>
          );
        })}

        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Score: {score}/{questions.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: score === questions.length ? "#16a34a" : "#d97706" }}>
              {Math.round(score / questions.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8",
              color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed", fontFamily: EXAM_BODY,
            }}>
            Submit
          </button>
        ) : (
          <button onClick={() => onPageDone(null, true)}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
            }}>
            Next Section →
          </button>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  EXAM SUMMARY
// ════════════════════════════════════════════════════════════
function ExamSummary({ results, duration, onHome, onRetry }) {
  const total = results.length;
  const correct = results.filter(r => r.correct).length;
  const pct = total ? Math.round(correct / total * 100) : 0;
  const bySection = {};
  results.forEach(r => {
    if (!bySection[r.sectionType]) bySection[r.sectionType] = { correct: 0, total: 0 };
    bySection[r.sectionType].total++;
    if (r.correct) bySection[r.sectionType].correct++;
  });

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "0 0 80px" }}>
      {/* Score header */}
      <div style={{
        background: "#1e3a6e", padding: "28px 24px 24px", textAlign: "center", color: "#fff",
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>
          {pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪"}
        </div>
        <div style={{ fontSize: 42, fontWeight: 900, fontFamily: EXAM_BODY }}>{pct}%</div>
        <div style={{ fontSize: 16, opacity: 0.85, marginTop: 4 }}>
          {correct}/{total} correct · {fmtTime(duration)}
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Section breakdown */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, fontFamily: EXAM_BODY }}>
            Section Breakdown
          </div>
          {Object.entries(bySection).map(([type, data]) => {
            const p = Math.round(data.correct / data.total * 100);
            const meta = SECTIONS[type];
            return (
              <div key={type} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: EXAM_BODY }}>
                    {meta?.label || type}
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 800, fontFamily: EXAM_BODY,
                    color: p >= 80 ? "#16a34a" : p >= 60 ? "#d97706" : "#dc2626",
                  }}>
                    {data.correct}/{data.total} ({p}%)
                  </span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 8, height: 8 }}>
                  <div style={{
                    background: p >= 80 ? "#16a34a" : p >= 60 ? "#d97706" : "#dc2626",
                    borderRadius: 8, height: 8, width: `${p}%`, transition: "width 0.6s",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onHome}
          style={{
            width: "100%", background: "#1e3a6e", color: "#fff", border: "none",
            borderRadius: 12, padding: "15px 0", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: EXAM_BODY, marginBottom: 10,
          }}>
          ← Back to Home
        </button>
        <button onClick={onRetry}
          style={{
            width: "100%", background: "none", color: "#1e3a6e",
            border: "2px solid #1e3a6e", borderRadius: 12, padding: "13px 0",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
          }}>
          🔄 New Session
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  EXAM SESSION SCREEN — Main controller
// ════════════════════════════════════════════════════════════
export function ExamSessionScreen({ plan, isMockExam, mockInfo, onFinish, onBack }) {
  const [secIdx, setSecIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [allResults, setAllResults] = useState([]);
  const [pageResults, setPageResults] = useState([]); // buffered until next page
  const [done, setDone] = useState(false);
  const startRef = useRef(Date.now());

  // Build pages for current section
  const section = plan[secIdx];
  const sectionType = section?.type;
  const meta = SECTIONS[sectionType] || {};

  // MCQ: paginate items 4 per page
  const MCQ_PER_PAGE = 4;
  const mcqPages = (sectionType === "GrammarMCQ" || sectionType === "VocabMCQ")
    ? paginate(section.items || [], MCQ_PER_PAGE) : [];

  const totalPages = mcqPages.length || 1;
  const globalQStart = pageIdx * MCQ_PER_PAGE + 1;

  function handlePageDone(results, advance) {
    if (results) {
      setPageResults(prev => [...prev, ...results]);
    }
    if (advance) {
      // Move to next page or section
      const merged = [...allResults, ...(results ? [] : pageResults)];
      if (!results) {
        // "Next Page/Section" pressed after seeing explanations
        const newAll = [...allResults, ...pageResults];
        setAllResults(newAll);
        setPageResults([]);

        if (sectionType === "GrammarMCQ" || sectionType === "VocabMCQ") {
          if (pageIdx + 1 < mcqPages.length) {
            setPageIdx(p => p + 1);
            return;
          }
        }
        // Move to next section
        if (secIdx + 1 >= plan.length) {
          setDone(true);
          onFinish(newAll);
        } else {
          setSecIdx(s => s + 1);
          setPageIdx(0);
        }
      }
    }
  }

  if (done) {
    return (
      <ExamSummary
        results={allResults}
        duration={Date.now() - startRef.current}
        onHome={() => onFinish(allResults)}
        onRetry={() => { setSecIdx(0); setPageIdx(0); setAllResults([]); setDone(false); }}
      />
    );
  }

  // Progress
  const totalSections = plan.length;
  const progress = Math.round((secIdx / totalSections) * 100);

  const sectionLabel = meta.label || sectionType;
  const sectionMarks = (section.items?.length || section.sets || 1);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Exam header */}
      <div style={{
        ...S.header,
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid #000", borderRadius: 6,
          width: 30, height: 30, cursor: "pointer", fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: EXAM_BODY, fontWeight: 700, fontSize: 13 }}>
            {isMockExam ? `📄 ${mockInfo?.school || "Mock Exam"}` : `Section ${secIdx + 1}/${totalSections}`}
          </div>
          <div style={{ fontFamily: EXAM_BODY, fontSize: 11, color: "#64748b" }}>
            {sectionLabel}
            {totalPages > 1 && ` · Page ${pageIdx + 1}/${totalPages}`}
          </div>
        </div>
        <div style={{
          fontFamily: EXAM_BODY, fontSize: 11, fontWeight: 700,
          background: "#f1f5f9", borderRadius: 6, padding: "3px 10px",
        }}>
          {progress}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#e2e8f0", height: 3 }}>
        <div style={{ background: "#1e3a6e", height: 3, width: `${progress}%`, transition: "width 0.5s" }} />
      </div>

      {/* Section content */}
      {(sectionType === "GrammarMCQ" || sectionType === "VocabMCQ") && mcqPages[pageIdx] && (
        <MCQPage
          key={`${secIdx}_${pageIdx}`}
          items={mcqPages[pageIdx]}
          pageIdx={pageIdx}
          totalPages={totalPages}
          globalQStart={globalQStart}
          sectionLabel={sectionLabel}
          marks={mcqPages[pageIdx].length}
          instructions={
            sectionType === "GrammarMCQ"
              ? "For each question, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and write its number in the brackets provided."
              : "For each of the following, choose the best answer and write the number (1, 2, 3 or 4) in the brackets provided."
          }
          onPageDone={handlePageDone}
        />
      )}

      {(sectionType === "GrammarCloze" || sectionType === "VocabCloze") && (
        <ClozePage
          key={secIdx}
          set={(section.items || [])[0] || {}}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}

      {sectionType === "Editing" && (
        <EditingPage
          key={secIdx}
          set={(section.items || [])[0] || {}}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}

      {sectionType === "Comprehension" && (
        <CompPage
          key={secIdx}
          set={(section.items || [])[0] || {}}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}
    </div>
  );
}

export default ExamSessionScreen;
