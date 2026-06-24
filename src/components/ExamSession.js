"use client";
import React, { useState, useRef, useCallback } from "react";
import { C } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER } from "@/lib/quizMeta";
import { fmtTime, guessFlag } from "@/lib/sessionUtils";

// 
//  EXAM MODE - Looks & feels like a real Singapore P3 exam paper
//  - All questions shown at once per page (4-5 per page)
//  - Student can freely move between questions on same page
//  - "Submit Page" marks + explanations revealed for that page
//  - Then moves to next page
// 

const EXAM_FONT = "'Times New Roman', Times, serif";
const EXAM_BODY = "'Arial', sans-serif";

//  Shared exam styles 
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

//  Helper: split questions into pages of N 
function paginate(items, perPage = 4) {
  const pages = [];
  for (let i = 0; i < items.length; i += perPage) {
    pages.push(items.slice(i, i + perPage));
  }
  return pages;
}

//  Explanation box shown after Submit 
function ExplanationBox({ correct, answer, explanation, tip }) {
  return (
    <div style={{
      marginTop: 6, marginLeft: 28, marginBottom: 8,
      borderLeft: `3px solid ${correct ? "#16a34a" : "#dc2626"}`,
      paddingLeft: 10, background: correct ? "#f0fdf4" : "#fef2f2",
      borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: correct ? "#16a34a" : "#dc2626", marginBottom: 3 }}>
        {correct ? " Correct" : ` Correct answer: ${answer}`}
      </div>
      {explanation && (
        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{explanation}</div>
      )}
      {tip && (
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, fontStyle: "italic" }}>
           {tip}
        </div>
      )}
    </div>
  );
}

// 
//  MCQ PAGE - Grammar MCQ / Vocab MCQ
// 
function MCQPage({ items, pageIdx, totalPages, globalQStart, sectionLabel, marks, instructions, onPageDone }) {
  const [answers, setAnswers] = useState({});
  const [retryAnswers, setRetryAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [retried, setRetried] = useState({});
  const [retriedCorrect, setRetriedCorrect] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const startRef = useRef(Date.now());

  function handleSelect(id, i) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [id]: i }));
  }

  function handleRetrySelect(id, i) {
    if (retried[id]) return;
    setRetryAnswers(a => ({ ...a, [id]: i }));
  }

  function handleRetry(q) {
    const chosen = retryAnswers[q.id];
    if (chosen === undefined) return;
    setRetried(r => ({ ...r, [q.id]: true }));
    setRetriedCorrect(r => ({ ...r, [q.id]: chosen === q.answer }));
    setShowExplanation(e => ({ ...e, [q.id]: true }));
  }

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const auto = {};
    items.forEach(q => { if (answers[q.id] === q.answer) auto[q.id] = true; });
    setShowExplanation(auto);
  }

  function handleFinishPage() {
    const t = Date.now() - startRef.current;
    const results = items.map(q => ({
      id: q.id, topic: q.topic, sectionType: q.topic,
      correct: answers[q.id] === q.answer,
      solvedAfterHint: answers[q.id] !== q.answer && retriedCorrect[q.id],
      attempts: answers[q.id] === q.answer ? 1 : retried[q.id] ? 2 : 1,
      timeTaken: Math.round(t / items.length),
    }));
    // Save results first, then trigger page advance
    onPageDone(results);
    onPageDone(null, true);
  }

  const allAnswered = items.every(q => answers[q.id] !== undefined);
  const wrongItems = submitted ? items.filter(q => answers[q.id] !== q.answer) : [];
  const allRetriedOrCorrect = submitted && wrongItems.every(q => retried[q.id]);
  const score = submitted ? items.filter(q => answers[q.id] === q.answer).length : 0;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>
          {sectionLabel} ({marks} mark{marks !== 1 ? "s" : ""})
        </div>
        <div style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>{instructions}</div>
      </div>
      <div style={{ padding: "0 20px 120px" }}>
        {items.map((q, qi) => {
          const qNum = globalQStart + qi;
          const chosen = answers[q.id];
          const isFirstCorrect = submitted && chosen === q.answer;
          const isFirstWrong = submitted && chosen !== q.answer;
          const hasRetried = retried[q.id];
          const retryChosen = retryAnswers[q.id];
          const isRetryCorrect = retriedCorrect[q.id];
          const showExp = showExplanation[q.id];

          return (
            <div key={q.id} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ fontWeight: "bold", fontSize: 14, minWidth: 24 }}>{qNum}.</span>
                <span style={{ fontSize: 14, lineHeight: 1.8, flex: 1 }}>{q.sentence || q.question || ""}</span>
              </div>

              {(q.options || []).map((opt, i) => {
                const isAns = i === q.answer;
                const isSel = chosen === i;
                let color = "#000", fontWeight = "normal", bg = "transparent";
                if (submitted && (isFirstCorrect || hasRetried)) {
                  if (isAns) { color = "#16a34a"; fontWeight = "700"; }
                  else if (isSel) color = "#dc2626";
                } else if (submitted && isFirstWrong && !hasRetried) {
                  if (isSel) color = "#dc2626";
                } else if (isSel) bg = "#dbeafe";
                return (
                  <div key={i} onClick={() => handleSelect(q.id, i)}
                    style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 28,
                      marginBottom: 3, cursor: submitted ? "default" : "pointer",
                      fontSize: 14, lineHeight: 1.6, color, fontWeight,
                      background: bg, borderRadius: 4, padding: "1px 4px" }}>
                    <span style={{ minWidth: 28 }}>({i + 1})</span>
                    <span>{opt}</span>
                    {submitted && isAns && (isFirstCorrect || hasRetried) && <span style={{ color: "#16a34a", marginLeft: 4 }}>V</span>}
                    {submitted && isSel && !isAns && <span style={{ color: "#dc2626", marginLeft: 4 }}>X</span>}
                  </div>
                );
              })}

              {isFirstWrong && !hasRetried && (
                <div style={{ marginLeft: 28, marginTop: 8, marginBottom: 8,
                  background: "#fffbeb", border: "1px solid #fde68a",
                  borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                    Not quite! Hint:
                  </div>
                  <div style={{ fontSize: 12, color: "#78350f", marginBottom: 10 }}>
                    {q.hints?.[0] || "Think carefully and try again!"}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>Try again:</div>
                  {(q.options || []).map((opt, i) => {
                    if (chosen === i) return null;
                    const isSel = retryChosen === i;
                    return (
                      <div key={i} onClick={() => handleRetrySelect(q.id, i)}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
                          cursor: "pointer", fontSize: 13,
                          background: isSel ? "#dbeafe" : "#fff", borderRadius: 4,
                          padding: "3px 8px", border: "1px solid " + (isSel ? "#3b82f6" : "#e5e7eb") }}>
                        <span>({i + 1})</span><span>{opt}</span>
                      </div>
                    );
                  })}
                  <button onClick={() => handleRetry(q)} disabled={retryChosen === undefined}
                    style={{ marginTop: 6, padding: "6px 16px", borderRadius: 8,
                      background: retryChosen !== undefined ? "#1e3a6e" : "#94a3b8",
                      color: "#fff", border: "none", fontSize: 12, fontWeight: 700,
                      cursor: retryChosen !== undefined ? "pointer" : "not-allowed" }}>
                    Check
                  </button>
                </div>
              )}

              {isFirstWrong && hasRetried && (
                <div style={{ marginLeft: 28, marginTop: 6, marginBottom: 6,
                  padding: "8px 12px", borderRadius: 8,
                  background: isRetryCorrect ? "#f0fdf4" : "#fef2f2",
                  border: "1px solid " + (isRetryCorrect ? "#16a34a" : "#dc2626") }}>
                  <div style={{ fontSize: 12, fontWeight: 700,
                    color: isRetryCorrect ? "#16a34a" : "#dc2626" }}>
                    {isRetryCorrect ? "V Correct on retry!" : "X Correct answer: " + q.options[q.answer]}
                  </div>
                  {showExp && q.explanation && (
                    <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, marginTop: 6 }}>
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}

              {isFirstCorrect && showExp && q.explanation && (
                <div style={{ marginLeft: 28, marginTop: 6,
                  borderLeft: "3px solid #16a34a", paddingLeft: 10,
                  background: "#f0fdf4", borderRadius: "0 8px 8px 0",
                  padding: "8px 10px 8px 14px" }}>
                  <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{q.explanation}</div>
                </div>
              )}

              {isFirstCorrect && !showExp && (
                <button onClick={() => setShowExplanation(e => ({...e, [q.id]: true}))}
                  style={{ marginLeft: 28, marginTop: 4, fontSize: 11, color: "#6b7280",
                    background: "none", border: "1px solid #e5e7eb", borderRadius: 6,
                    padding: "2px 8px", cursor: "pointer" }}>
                  Show explanation
                </button>
              )}

              {qi < items.length - 1 && <div style={{ borderTop: "1px solid #ccc", margin: "14px 0" }} />}
            </div>
          );
        })}

        {submitted && (
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Score: {score}/{items.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700,
              color: score === items.length ? "#16a34a" : score >= items.length * 0.6 ? "#d97706" : "#dc2626" }}>
              {Math.round(score / items.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8",
              color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed" }}>
            Submit Page {pageIdx + 1}/{totalPages}
            {!allAnswered && <span style={{ fontSize: 12, fontWeight: 400, display: "block" }}>
              Answer all {items.length} questions first
            </span>}
          </button>
        ) : allRetriedOrCorrect ? (
          <button onClick={handleFinishPage}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            {pageIdx + 1 >= totalPages ? "Finish Section" : "Next Page"}
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: "12px", color: "#6b7280", fontSize: 13 }}>
            Please complete the retry questions above before continuing.
          </div>
        )}
      </div>
    </div>
  );
}


function ClozePage({ set, sectionLabel, marks, onPageDone }) {
  const blanks = set.blanks || [];
  const wordBank = set.wordBank || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const startRef = useRef(Date.now());

  // Detect cloze type:
  // "bracket" = passage has [word1 / word2] patterns, no word bank
  // "wordbank" = separate word bank, blanks in passage
  const hasBrackets = (set.passage || "").includes(" / ") || (set.passage || "").includes("[ ");
  const hasWordBank = wordBank.length > 0;

  function handleSelect(num, word) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [num]: word }));
  }

  function handleFinish() {
    if (submitted) return;
    setSubmitted(true);
    const t = Date.now() - startRef.current;
    const results = blanks.map(b => ({
      id: `${set.id}_${b.num}`, topic: "GrammarCloze", sectionType: "GrammarCloze",
      correct: (answers[b.num] || "").toLowerCase() === (b.answer || "").toLowerCase(),
      timeTaken: Math.round(t / blanks.length),
    }));
    onPageDone(results);
    onPageDone(null, true);
  }

  const allAnswered = blanks.every(b => answers[b.num] !== undefined);
  const score = submitted ? blanks.filter(b =>
    (answers[b.num] || "").toLowerCase() === (b.answer || "").toLowerCase()
  ).length : 0;

  // -- Render passage with inline word-bank blanks --------------
  function renderWordBankPassage() {
    const passage = set.passage || "";
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
        <span key={num} style={{ display: "inline-block" }}>
          <span style={{ fontSize: 11, fontWeight: 700, verticalAlign: "super", marginRight: 1 }}>({num})</span>
          <span style={{
            display: "inline-block", minWidth: 90, borderBottom: "1.5px solid #000",
            padding: "0 4px", textAlign: "center", fontSize: 14,
            color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen ? "#1d4ed8" : "transparent"),
            fontWeight: chosen ? 600 : 400,
            cursor: !submitted && chosen ? "pointer" : "default",
          }}
            onClick={() => !submitted && chosen && setAnswers(a => { const n={...a}; delete n[num]; return n; })}>
            {chosen || "        "}
          </span>
          {submitted && !isCorrect && (
            <span style={{ fontSize: 11, color: "#16a34a", marginLeft: 3 }}>{blank.answer}</span>
          )}
        </span>
      );
      last = match.index + match[0].length;
    }
    parts.push(passage.slice(last));
    return parts;
  }

  // -- Render passage with inline bracket choices ---------------
  // Pattern: (19) [ spend / spends ]
  function renderBracketPassage() {
    const passage = set.passage || "";
    const parts = [];
    let last = 0;
    // Match patterns like (19) [ word1 / word2 ] or (19) [ word1, word2 ]
    const bracketRegex = /\((\d+)\)\s*\[([^\]]+)\]/g;
    let match;
    while ((match = bracketRegex.exec(passage)) !== null) {
      const num = parseInt(match[1]);
      const options = match[2].split(/\s*[\/,]\s*/).map(s => s.trim()).filter(Boolean);
      const blank = blanks.find(b => b.num === num);
      if (!blank || options.length < 2) continue;
      parts.push(passage.slice(last, match.index));
      const chosen = answers[num];
      const isCorrect = submitted && (chosen || "").toLowerCase() === (blank.answer || "").toLowerCase();
      parts.push(
        <span key={num} style={{ display: "inline-block", margin: "0 2px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, verticalAlign: "super" }}>({num})</span>
          {" [ "}
          {options.map((opt, oi) => {
            const isAns = opt.toLowerCase() === (blank.answer || "").toLowerCase();
            const isSel = chosen === opt;
            let bg = "transparent", color = "#000", fw = "normal";
            if (submitted) {
              if (isAns) { color = "#16a34a"; fw = "700"; }
              else if (isSel && !isAns) { color = "#dc2626"; fw = "700"; }
            } else if (isSel) { bg = "#dbeafe"; color = "#1d4ed8"; fw = "700"; }
            return (
              <span key={opt}>
                {oi > 0 && <span style={{ color: "#94a3b8", margin: "0 4px" }}>/</span>}
                <span
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [num]: opt }))}
                  style={{
                    cursor: submitted ? "default" : "pointer",
                    background: bg, color, fontWeight: fw,
                    padding: "0 3px", borderRadius: 3,
                    textDecoration: submitted && isSel && !isAns ? "line-through" : "none",
                  }}>
                  {opt}
                </span>
              </span>
            );
          })}
          {" ]"}
          {submitted && !isCorrect && (
            <span style={{ fontSize: 11, color: "#16a34a", marginLeft: 4 }}>{blank.answer}</span>
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
          {hasBrackets
            ? "Read the passage carefully. Underline or tap the correct word from the words given in the brackets."
            : "Read the passage carefully. Choose the correct word from the words given in the box and write its letter in each blank. Use each word once only."}
        </div>

        {/* Word bank box - only for word bank type */}
        {hasWordBank && !hasBrackets && (
          <div style={{
            border: "1px solid #000", padding: "10px 14px", marginBottom: 14,
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6,
          }}>
            {wordBank.map((w, i) => {
              const letter = String.fromCharCode(65 + i);
              const isUsed = Object.values(answers).includes(w);
              return (
                <div key={w} style={{
                  fontSize: 14, cursor: submitted ? "default" : "pointer",
                  opacity: submitted ? 1 : (isUsed ? 0.4 : 1),
                  padding: "2px 4px",
                  textDecoration: !submitted && isUsed ? "line-through" : "none",
                }}>
                  ({letter}) {w}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px 100px" }}>
        {/* Passage */}
        <div style={{
          border: "1px solid #ddd", borderRadius: 8, padding: "14px 16px",
          marginBottom: 16, fontSize: 14, fontFamily: EXAM_BODY, lineHeight: 2.2,
        }}>
          {hasBrackets ? renderBracketPassage()
           : set.passage ? renderWordBankPassage()
           : blanks.map((b, i) => {
              const chosen = answers[b.num];
              const isCorrect = submitted && (chosen || "").toLowerCase() === (b.answer || "").toLowerCase();
              return (
                <div key={b.num} style={{ marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, marginRight: 6 }}>({b.num})</span>
                  <span style={{ color: "#64748b", marginRight: 8 }}>{b.stem || ""}</span>
                  <span style={{
                    display: "inline-block", borderBottom: "1.5px solid #000",
                    minWidth: 100, textAlign: "center", padding: "0 4px",
                    color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen ? "#1d4ed8" : "transparent"),
                    fontWeight: 600,
                  }}>{chosen || "   "}</span>
                  {submitted && !isCorrect && (
                    <span style={{ fontSize: 12, color: "#16a34a", marginLeft: 6 }}>{b.answer}</span>
                  )}
                </div>
              );
            })
          }
        </div>

        {/* Word bank tap buttons - for word bank type only */}
        {hasWordBank && !hasBrackets && !submitted && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>
              Tap a word to fill the next blank:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {wordBank.map((w, i) => {
                const letter = String.fromCharCode(65 + i);
                const isUsed = Object.values(answers).includes(w);
                return (
                  <button key={w} disabled={isUsed}
                    onClick={() => {
                      const nextBlank = blanks.find(b => !answers[b.num]);
                      if (nextBlank) handleSelect(nextBlank.num, w);
                    }}
                    style={{
                      padding: "6px 16px", borderRadius: 8, fontSize: 14,
                      border: "1.5px solid #000",
                      background: isUsed ? "#f1f5f9" : "#fff",
                      color: isUsed ? "#94a3b8" : "#000",
                      cursor: isUsed ? "not-allowed" : "pointer",
                      textDecoration: isUsed ? "line-through" : "none",
                      fontWeight: 600,
                    }}>
                    ({letter}) {w}
                  </button>
                );
              })}
            </div>
            {/* Clear individual answers */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {blanks.filter(b => answers[b.num]).map(b => (
                <button key={b.num}
                  onClick={() => setAnswers(a => { const n={...a}; delete n[b.num]; return n; })}
                  style={{
                    padding: "3px 10px", borderRadius: 6, fontSize: 12,
                    border: "1px solid #e2e8f0", background: "#f8fafc",
                    cursor: "pointer", color: "#64748b",
                  }}>
                  Clear ({b.num}): {answers[b.num]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Explanations after submit */}
        {submitted && blanks.map(b => {
          const isCorrect = (answers[b.num] || "").toLowerCase() === (b.answer || "").toLowerCase();
          return b.hints?.[0] ? (
            <ExplanationBox key={b.num} correct={isCorrect} answer={b.answer} explanation={b.hints[0]} />
          ) : null;
        })}

        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Score: {score}/{blanks.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700,
              color: score === blanks.length ? "#16a34a" : "#d97706" }}>
              {Math.round(score / blanks.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleFinish}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8",
              color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed",
            }}>
            Submit
            {!allAnswered && <span style={{ fontSize: 12, fontWeight: 400, display: "block" }}>
              Fill in all blanks first
            </span>}
          </button>
        ) : (
          <button onClick={() => onPageDone(null, true)}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}>
            Next Section
          </button>
        )}
      </div>
    </div>
  );
}


function EditingPage({ set, sectionLabel, marks, onPageDone }) {
  const items = set.items || [];
  const [answers, setAnswers] = useState({});
  const [retryAnswers, setRetryAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [retried, setRetried] = useState({});
  const startRef = useRef(Date.now());

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
  }

  function handleRetry(item) {
    const typed = (retryAnswers[item.id] || '').trim();
    if (!typed) return;
    setRetried(r => ({ ...r, [item.id]: typed }));
  }

  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = items.map(item => ({
      id: item.id, topic: "Editing", sectionType: "Editing",
      correct: (answers[item.id] || '').trim().toLowerCase() === (item.answer || '').toLowerCase(),
      timeTaken: Math.round(t / items.length),
    }));
    onPageDone(results);
  }

  const score = submitted ? items.filter(item =>
    (answers[item.id] || '').trim().toLowerCase() === (item.answer || '').toLowerCase()
  ).length : 0;

  const allRetriedWrong = submitted && items
    .filter(item => (answers[item.id] || '').trim().toLowerCase() !== (item.answer || '').toLowerCase())
    .every(item => retried[item.id]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>
          {sectionLabel} ({marks} mark{marks !== 1 ? "s" : ""})
        </div>
        <div style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
          Each of the underlined words contains a spelling error. Write the correct word in the box provided.
        </div>
      </div>

      <div style={{ padding: "0 20px 120px" }}>
        {items.map((item, idx) => {
          const qNum = item.questionNumber || idx + 1;
          const typed = answers[item.id] || '';
          const isCorrect = submitted && typed.trim().toLowerCase() === (item.answer || '').toLowerCase();
          const isWrong = submitted && !isCorrect;
          const retryTyped = retryAnswers[item.id] || '';
          const hasRetried = retried[item.id];
          const retryIsCorrect = hasRetried && hasRetried.toLowerCase() === (item.answer || '').toLowerCase();

          return (
            <div key={item.id} style={{ marginBottom: 20 }}>
              {/* Question number + sentence context */}
              <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, fontSize: 14, minWidth: 32 }}>({qNum})</span>
                <span style={{ fontSize: 13, color: "#64748b", flex: 1, fontStyle: "italic" }}>
                  {item.sentence?.replace(item.wrongWord || '', `[${item.wrongWord}]`) || ''}
                </span>
              </div>

              {/* Input box */}
              {!submitted ? (
                <div style={{ marginLeft: 32 }}>
                  <input type="text" value={typed}
                    onChange={e => setAnswers(a => ({ ...a, [item.id]: e.target.value }))}
                    placeholder="Write correct spelling..."
                    style={{ padding: "6px 10px", borderRadius: 6, fontSize: 14, fontWeight: 600,
                      border: "1.5px solid " + (typed ? "#1d4ed8" : "#000"),
                      outline: "none", minWidth: 160 }} />
                </div>
              ) : (
                <div style={{ marginLeft: 32 }}>
                  {/* Row: My answer | Correct answer | Retry box */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    {/* My answer */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>Your answer</div>
                      <div style={{ padding: "5px 12px", borderRadius: 6, fontSize: 14, fontWeight: 600,
                        border: "1.5px solid " + (isCorrect ? "#16a34a" : "#dc2626"),
                        color: isCorrect ? "#16a34a" : "#dc2626",
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        minWidth: 100, textAlign: "center" }}>
                        {typed || "(blank)"} {isCorrect ? "V" : "X"}
                      </div>
                    </div>

                    {/* Correct answer (shown only if wrong) */}
                    {isWrong && (
                      <>
                        <div style={{ fontSize: 18, color: "#94a3b8" }}>vs</div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>Correct answer</div>
                          <div style={{ padding: "5px 12px", borderRadius: 6, fontSize: 14, fontWeight: 700,
                            border: "1.5px solid #16a34a", color: "#16a34a",
                            background: "#f0fdf4", minWidth: 100, textAlign: "center" }}>
                            {item.answer}
                          </div>
                        </div>

                        {/* Retry input */}
                        {!hasRetried && (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>Write it correctly:</div>
                            <div style={{ display: "flex", gap: 4 }}>
                              <input type="text" value={retryTyped}
                                onChange={e => setRetryAnswers(a => ({ ...a, [item.id]: e.target.value }))}
                                placeholder={item.answer?.split('').join(' . ')}
                                style={{ padding: "5px 10px", borderRadius: 6, fontSize: 14, fontWeight: 600,
                                  border: "1.5px solid #1d4ed8", outline: "none", minWidth: 120 }} />
                              <button onClick={() => handleRetry(item)}
                                disabled={!retryTyped}
                                style={{ padding: "5px 10px", borderRadius: 6,
                                  background: retryTyped ? "#1e3a6e" : "#94a3b8",
                                  color: "#fff", border: "none", fontSize: 12, fontWeight: 700,
                                  cursor: retryTyped ? "pointer" : "not-allowed" }}>
                                OK
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Retry result */}
                        {hasRetried && (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>Your retry</div>
                            <div style={{ padding: "5px 12px", borderRadius: 6, fontSize: 14, fontWeight: 700,
                              border: "1.5px solid " + (retryIsCorrect ? "#16a34a" : "#dc2626"),
                              color: retryIsCorrect ? "#16a34a" : "#dc2626",
                              background: retryIsCorrect ? "#f0fdf4" : "#fef2f2",
                              minWidth: 100, textAlign: "center" }}>
                              {hasRetried} {retryIsCorrect ? "V" : "X"}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Explanation */}
                  {(item.hints?.[0] || item.solution?.tip) && (
                    <div style={{ marginTop: 8,
                      borderLeft: "3px solid " + (isCorrect ? "#16a34a" : "#f59e0b"),
                      paddingLeft: 10, background: isCorrect ? "#f0fdf4" : "#fffbeb",
                      borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px" }}>
                      <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
                        {item.hints?.[0] || item.solution?.tip}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {idx < items.length - 1 && <div style={{ borderTop: "1px solid #e5e7eb", margin: "14px 0" }} />}
            </div>
          );
        })}

        {submitted && (
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Score: {score}/{items.length}</span>
            <span style={{ fontSize: 13, fontWeight: 700,
              color: score === items.length ? "#16a34a" : "#d97706" }}>
              {Math.round(score / items.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Submit
          </button>
        ) : allRetriedWrong ? (
          <button onClick={handleFinish}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Next Section
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: "12px", color: "#6b7280", fontSize: 13 }}>
            Please write the correct spelling for each wrong answer before continuing.
          </div>
        )}
      </div>
    </div>
  );
}


function CompPage({ set, sectionLabel, marks, onPageDone }) {
  const questions = set.questions || [];
  const passage = set.passage || '';

  // answers: { [qId]: value }
  // open/fill → string, mcq → option index or label string
  // truefalse → 'True'|'False', sequence → {[itemIdx]: number}
  const [answers, setAnswers]         = useState({});
  const [selfCheck, setSelfCheck]     = useState({}); // open: 'yes'|'no'
  const [submitted, setSubmitted]     = useState(false);
  const [activeQ, setActiveQ]         = useState(null); // highlighted question id
  const [highlightRange, setHighlightRange] = useState(null); // {text, type}
  const passageRef = useRef(null);
  const startRef   = useRef(Date.now());

  // ── helpers ──────────────────────────────────────────────
  function normalize(s) { return String(s || '').trim().toLowerCase(); }

  function getFormat(q) {
    if (q.format) return q.format;
    if (q.options && q.options.length) return 'mcq';
    return 'open';
  }

  function isAutoGraded(q) {
    const f = getFormat(q);
    return ['mcq', 'truefalse', 'sequence', 'fill'].includes(f);
  }

  function isAnswered(q) {
    const f = getFormat(q);
    const val = answers[q.id];
    if (f === 'sequence') {
      const items = q.sequenceItems || q.items || [];
      return items.every((_, i) => answers[q.id + '_seq_' + i] !== undefined);
    }
    if (f === 'truefalse_reason') {
      return val !== undefined && (answers[q.id + '_reason'] || '').trim().length > 0;
    }
    if (f === 'open' || f === 'fill') return (val || '').trim().length > 0;
    return val !== undefined;
  }

  const allAnswered = questions.every(q => isAnswered(q));

  // ── highlight evidence in passage ────────────────────────
  function extractEvidence(q) {
    // Try solution.evidenceText first, then parse from steps[0]
    if (q.solution?.evidenceText) return q.solution.evidenceText;
    if (q.solution?.steps?.[0]) {
      const m = q.solution.steps[0].match(/["""]([^"""]{6,})["""]/);
      if (m) return m[1];
      // "Paragraph N: 'text'" pattern
      const m2 = q.solution.steps[0].match(/:\s*['""](.{6,})['""]$/);
      if (m2) return m2[1];
    }
    return null;
  }

  function extractTrap(q) {
    return q.solution?.trapText || null;
  }

  // Render passage with highlights
  function renderPassage(q) {
    if (!passage) return null;
    const evidence = q ? extractEvidence(q) : null;
    const trap     = q ? extractTrap(q) : null;

    if (!evidence && !trap) {
      return <span style={{ whiteSpace: 'pre-line', lineHeight: 2 }}>{passage}</span>;
    }

    // Split passage into segments and highlight
    let segments = [{ text: passage, type: 'plain' }];

    function applyHighlight(segs, target, type) {
      if (!target) return segs;
      const result = [];
      segs.forEach(seg => {
        if (seg.type !== 'plain') { result.push(seg); return; }
        const idx = seg.text.indexOf(target);
        if (idx === -1) { result.push(seg); return; }
        if (idx > 0) result.push({ text: seg.text.slice(0, idx), type: 'plain' });
        result.push({ text: target, type });
        const after = seg.text.slice(idx + target.length);
        if (after) result.push({ text: after, type: 'plain' });
      });
      return result;
    }

    segments = applyHighlight(segments, evidence, 'evidence');
    segments = applyHighlight(segments, trap, 'trap');

    const colors = {
      evidence: { bg: '#DBEAFE', border: '#3B82F6', color: '#1E3A8A' }, // blue
      trap:     { bg: '#FEF3C7', border: '#F59E0B', color: '#92400E' }, // amber
      plain:    { bg: 'transparent', border: 'none', color: 'inherit' },
    };

    return (
      <span style={{ whiteSpace: 'pre-line', lineHeight: 2 }}>
        {segments.map((seg, i) => {
          const c = colors[seg.type] || colors.plain;
          if (seg.type === 'plain') return <span key={i}>{seg.text}</span>;
          return (
            <span key={i} style={{
              background: c.bg,
              borderBottom: `2px solid ${c.border}`,
              color: c.color,
              fontWeight: 700,
              borderRadius: 2,
              padding: '0 2px',
            }}>
              {seg.text}
              {seg.type === 'evidence' && (
                <span style={{ fontSize: 10, color: c.border, marginLeft: 2,
                  verticalAlign: 'super', fontWeight: 800 }}>
                  ★
                </span>
              )}
            </span>
          );
        })}
      </span>
    );
  }

  // ── grading ───────────────────────────────────────────────
  function gradeQuestion(q) {
    const f = getFormat(q);
    if (f === 'mcq') {
      const chosen = answers[q.id];
      const correct = q.answer;
      // answer can be index number or label string like 'A','B','1','2'
      if (typeof correct === 'number') return chosen === correct;
      if (typeof correct === 'string') {
        // label match: 'A','B' → options[0],[1]
        const labelIdx = correct.toUpperCase().charCodeAt(0) - 65;
        if (labelIdx >= 0 && labelIdx < (q.options || []).length) return chosen === labelIdx;
        // numeric string
        const n = parseInt(correct, 10);
        if (!isNaN(n)) return chosen === n - 1 || chosen === n;
      }
      return false;
    }
    if (f === 'truefalse') {
      return normalize(answers[q.id]) === normalize(q.answer);
    }
    if (f === 'sequence') {
      const items = q.sequenceItems || q.items || [];
      const correctOrder = q.answer; // e.g. [2,1,3] or '2,1,3'
      if (!correctOrder) return false;
      const correct = Array.isArray(correctOrder)
        ? correctOrder
        : String(correctOrder).split(',').map(Number);
      return items.every((_, i) => {
        const val = parseInt(answers[q.id + '_seq_' + i] || '0', 10);
        return val === correct[i];
      });
    }
    if (f === 'fill') {
      return normalize(answers[q.id]) === normalize(q.answer);
    }
    // open / truefalse_reason: use self-check
    return selfCheck[q.id] === 'yes';
  }

  // ── submit ────────────────────────────────────────────────
  function handleSubmit() {
    if (submitted || !allAnswered) return;
    setSubmitted(true);
    setActiveQ(questions[0]?.id || null);
  }

  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = questions.map(q => ({
      id: q.id,
      topic: 'Comprehension',
      sectionType: 'Comprehension',
      correct: gradeQuestion(q),
      timeTaken: Math.round(t / Math.max(questions.length, 1)),
    }));
    onPageDone(results);
    onPageDone(null, true);
  }

  const autoScore  = submitted ? questions.filter(q => isAutoGraded(q) && gradeQuestion(q)).length : 0;
  const autoTotal  = questions.filter(q => isAutoGraded(q)).length;
  const openTotal  = questions.filter(q => !isAutoGraded(q)).length;
  const openDone   = Object.keys(selfCheck).length;
  const canFinish  = submitted && (openTotal === 0 || openDone >= openTotal);

  // ── render question input ─────────────────────────────────
  function renderInput(q) {
    const f = getFormat(q);
    const isActive = activeQ === q.id;

    // MCQ
    if (f === 'mcq') {
      const opts = (q.options || []).map(o =>
        typeof o === 'string' ? o : (o.text || o.label || String(o))
      );
      const chosen = answers[q.id];
      const correct = (() => {
        const a = q.answer;
        if (typeof a === 'number') return a;
        if (typeof a === 'string') {
          const li = a.toUpperCase().charCodeAt(0) - 65;
          if (li >= 0 && li < opts.length) return li;
          const n = parseInt(a, 10);
          if (!isNaN(n)) return n >= 1 ? n - 1 : n;
        }
        return 0;
      })();

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {opts.map((opt, i) => {
            const label = String.fromCharCode(65 + i);
            const isSel = chosen === i;
            const isAns = submitted && i === correct;
            const isWrong = submitted && isSel && i !== correct;
            let bg = '#F8FAFC', border = '#CBD5E1', col = '#1E293B';
            if (!submitted && isSel) { bg = '#DBEAFE'; border = '#3B82F6'; col = '#1E3A8A'; }
            if (isAns) { bg = '#DCFCE7'; border = '#16A34A'; col = '#14532D'; }
            if (isWrong) { bg = '#FEE2E2'; border = '#DC2626'; col = '#7F1D1D'; }
            return (
              <div key={i} onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: i }))}
                style={{ display: 'flex', alignItems: 'center', gap: 10,
                  background: bg, border: `1.5px solid ${border}`, borderRadius: 10,
                  padding: '9px 14px', cursor: submitted ? 'default' : 'pointer',
                  transition: 'all 0.15s' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%',
                  background: (isAns || (!submitted && isSel)) ? border : '#E2E8F0',
                  color: (isAns || (!submitted && isSel)) ? '#fff' : '#64748B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: isSel || isAns ? 700 : 400,
                  color: col, flex: 1 }}>{opt}</span>
                {isAns && <span style={{ fontSize: 16 }}>✅</span>}
                {isWrong && <span style={{ fontSize: 16 }}>❌</span>}
              </div>
            );
          })}
        </div>
      );
    }

    // TRUE/FALSE
    if (f === 'truefalse') {
      const val = answers[q.id];
      const correct = q.answer; // 'True' or 'False'
      return (
        <div style={{ display: 'flex', gap: 10 }}>
          {['True', 'False'].map(opt => {
            const isSel = val === opt;
            const isAns = submitted && normalize(opt) === normalize(correct);
            const isWrong = submitted && isSel && normalize(opt) !== normalize(correct);
            let bg = '#F8FAFC', border = '#CBD5E1', col = '#1E293B';
            if (!submitted && isSel) { bg = '#DBEAFE'; border = '#3B82F6'; col = '#1E3A8A'; }
            if (isAns) { bg = '#DCFCE7'; border = '#16A34A'; col = '#14532D'; }
            if (isWrong) { bg = '#FEE2E2'; border = '#DC2626'; col = '#7F1D1D'; }
            return (
              <button key={opt} onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: opt }))}
                style={{ flex: 1, padding: '10px', borderRadius: 10, border: `2px solid ${border}`,
                  background: bg, color: col, fontSize: 14, fontWeight: 700,
                  cursor: submitted ? 'default' : 'pointer', transition: 'all 0.15s' }}>
                {opt} {isAns ? '✅' : ''}{isWrong ? '❌' : ''}
              </button>
            );
          })}
        </div>
      );
    }

    // TRUE/FALSE + REASON
    if (f === 'truefalse_reason') {
      const val = answers[q.id];
      const reason = answers[q.id + '_reason'] || '';
      const correct = typeof q.answer === 'object' ? q.answer?.verdict : q.answer;
      const modelReason = typeof q.answer === 'object' ? q.answer?.reason : (q.solution?.steps?.[0] || '');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['True', 'False'].map(opt => {
              const isSel = val === opt;
              const isAns = submitted && normalize(opt) === normalize(correct);
              const isWrong = submitted && isSel && !isAns;
              let bg = '#F8FAFC', border = '#CBD5E1', col = '#1E293B';
              if (!submitted && isSel) { bg = '#DBEAFE'; border = '#3B82F6'; col = '#1E3A8A'; }
              if (isAns) { bg = '#DCFCE7'; border = '#16A34A'; col = '#14532D'; }
              if (isWrong) { bg = '#FEE2E2'; border = '#DC2626'; col = '#7F1D1D'; }
              return (
                <button key={opt} onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: opt }))}
                  style={{ flex: 1, padding: '10px', borderRadius: 10, border: `2px solid ${border}`,
                    background: bg, color: col, fontSize: 14, fontWeight: 700,
                    cursor: submitted ? 'default' : 'pointer' }}>
                  {opt} {isAns ? '✅' : ''}{isWrong ? '❌' : ''}
                </button>
              );
            })}
          </div>
          {!submitted ? (
            <textarea value={reason} rows={2}
              onChange={e => setAnswers(a => ({ ...a, [q.id + '_reason']: e.target.value }))}
              placeholder="Give a reason for your answer..."
              style={{ width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 13,
                border: `1.5px solid ${reason ? '#3B82F6' : '#CBD5E1'}`,
                outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          ) : (
            <div>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Your reason:</div>
              <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '8px 12px',
                fontSize: 13, color: '#334155', marginBottom: 8 }}>{reason || '(no reason given)'}</div>
              {modelReason && (
                <div style={{ background: '#DCFCE7', border: '1px solid #16A34A',
                  borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#14532D' }}>
                  <strong>Model reason:</strong> {modelReason}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // SEQUENCE
    if (f === 'sequence') {
      const items = q.sequenceItems || q.items || [];
      const correctOrder = q.answer;
      const correct = Array.isArray(correctOrder)
        ? correctOrder
        : String(correctOrder || '').split(',').map(Number);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => {
            const key = q.id + '_seq_' + i;
            const val = answers[key];
            const correctNum = correct[i];
            const isRight = submitted && parseInt(val || '0', 10) === correctNum;
            const isWrong = submitted && !isRight;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
                background: submitted ? (isRight ? '#DCFCE7' : '#FEE2E2') : '#F8FAFC',
                border: `1.5px solid ${submitted ? (isRight ? '#16A34A' : '#DC2626') : '#CBD5E1'}`,
                borderRadius: 10, padding: '10px 14px' }}>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {[1, 2, 3].map(n => (
                    <button key={n} onClick={() => !submitted && setAnswers(a => ({ ...a, [key]: n }))}
                      style={{ width: 28, height: 28, borderRadius: '50%', border: 'none',
                        background: val === n ? '#1E3A8E' : '#E2E8F0',
                        color: val === n ? '#fff' : '#475569',
                        fontSize: 13, fontWeight: 700, cursor: submitted ? 'default' : 'pointer' }}>
                      {n}
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: 13, flex: 1, color: '#334155' }}>{item}</span>
                {submitted && <span style={{ fontSize: 14 }}>{isRight ? '✅' : `❌ (${correctNum})`}</span>}
              </div>
            );
          })}
        </div>
      );
    }

    // FILL
    if (f === 'fill') {
      const val = answers[q.id] || '';
      const isRight = submitted && normalize(val) === normalize(q.answer);
      const isWrong = submitted && !isRight;
      return (
        <div>
          {!submitted ? (
            <input type="text" value={val}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              placeholder="Fill in the blank..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: 14,
                border: `1.5px solid ${val ? '#3B82F6' : '#CBD5E1'}`,
                outline: 'none', boxSizing: 'border-box' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                background: isRight ? '#DCFCE7' : '#FEE2E2',
                border: `1.5px solid ${isRight ? '#16A34A' : '#DC2626'}`,
                color: isRight ? '#14532D' : '#7F1D1D' }}>
                {val || '(blank)'} {isRight ? '✅' : '❌'}
              </div>
              {isWrong && (
                <div style={{ padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                  background: '#DCFCE7', border: '1.5px solid #16A34A', color: '#14532D' }}>
                  ✏️ {q.answer}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // OPEN (default) — short answer, vocabulary, full sentence
    const val = answers[q.id] || '';
    const isLong = (q.stem || '').toLowerCase().includes('sentence') ||
                   (q.marks || 1) >= 2;
    return (
      <div>
        {!submitted ? (
          isLong ? (
            <textarea value={val} rows={3}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              placeholder="Write your answer in a complete sentence..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: 14,
                border: `1.5px solid ${val ? '#3B82F6' : '#CBD5E1'}`,
                outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          ) : (
            <input type="text" value={val}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              placeholder="Write your answer..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: 14,
                border: `1.5px solid ${val ? '#3B82F6' : '#CBD5E1'}`,
                outline: 'none', boxSizing: 'border-box' }} />
          )
        ) : (
          <div>
            {/* Student answer */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4, fontWeight: 700 }}>
                Your answer:
              </div>
              <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1',
                borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#334155',
                minHeight: 36 }}>
                {val || '(no answer given)'}
              </div>
            </div>
            {/* Model answer */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#16A34A', marginBottom: 4, fontWeight: 700 }}>
                Model answer:
              </div>
              <div style={{ background: '#DCFCE7', border: '1.5px solid #16A34A',
                borderRadius: 8, padding: '8px 12px', fontSize: 14, color: '#14532D',
                fontWeight: 600, minHeight: 36 }}>
                {q.answer || '—'}
              </div>
            </div>
            {/* Answer format tip */}
            {q.solution?.answerFormat && (
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE',
                borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#1D4ED8',
                marginBottom: 8 }}>
                💡 Format tip: {q.solution.answerFormat}
              </div>
            )}
            {/* Self-check */}
            {!selfCheck[q.id] ? (
              <div>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6, fontWeight: 600 }}>
                  Compare your answer with the model answer:
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setSelfCheck(s => ({ ...s, [q.id]: 'yes' }))}
                    style={{ flex: 1, padding: '8px', borderRadius: 8, border: '2px solid #16A34A',
                      background: '#F0FDF4', color: '#16A34A', fontWeight: 700,
                      fontSize: 13, cursor: 'pointer' }}>
                    ✅ I got it right
                  </button>
                  <button onClick={() => setSelfCheck(s => ({ ...s, [q.id]: 'no' }))}
                    style={{ flex: 1, padding: '8px', borderRadius: 8, border: '2px solid #DC2626',
                      background: '#FEF2F2', color: '#DC2626', fontWeight: 700,
                      fontSize: 13, cursor: 'pointer' }}>
                    ❌ I need practice
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                background: selfCheck[q.id] === 'yes' ? '#DCFCE7' : '#FEE2E2',
                border: `1px solid ${selfCheck[q.id] === 'yes' ? '#16A34A' : '#DC2626'}`,
                borderRadius: 8, padding: '6px 12px', fontSize: 13,
                color: selfCheck[q.id] === 'yes' ? '#14532D' : '#7F1D1D', fontWeight: 700 }}>
                {selfCheck[q.id] === 'yes' ? '✅ Self-assessed: Correct' : '❌ Self-assessed: Need practice'}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── render evidence box (after submit) ───────────────────
  function renderEvidenceBox(q) {
    if (!submitted) return null;
    const evidence = extractEvidence(q);
    const trap = extractTrap(q);
    const tip = q.solution?.tip || q.hints?.[0] || '';
    const steps = q.solution?.steps || [];
    const keywords = q.solution?.keywords || [];

    return (
      <div style={{ marginTop: 10 }}>
        {/* Tip */}
        {tip && (
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A',
            borderRadius: 8, padding: '8px 12px', fontSize: 12,
            color: '#92400E', marginBottom: 8 }}>
            <strong>💡 Tip:</strong> {tip}
          </div>
        )}

        {/* Evidence in passage */}
        {evidence && (
          <div
            onClick={() => setActiveQ(q.id)}
            style={{ background: '#EFF6FF', border: '1px solid #BFDBFE',
              borderRadius: 8, padding: '8px 12px', fontSize: 12,
              color: '#1E40AF', marginBottom: 6, cursor: 'pointer' }}>
            <strong>🔵 Evidence in passage:</strong>
            <div style={{ marginTop: 4, fontStyle: 'italic',
              borderLeft: '3px solid #3B82F6', paddingLeft: 8, marginLeft: 4 }}>
              "...{evidence}..."
            </div>
            <div style={{ fontSize: 11, color: '#3B82F6', marginTop: 4 }}>
              ↑ Tap to highlight in passage
            </div>
          </div>
        )}

        {/* Trap warning */}
        {trap && (
          <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B',
            borderRadius: 8, padding: '8px 12px', fontSize: 12,
            color: '#92400E', marginBottom: 6 }}>
            <strong>⚠️ Watch out:</strong> "{trap}"
            {q.solution?.trapExplanation && (
              <div style={{ marginTop: 4 }}>{q.solution.trapExplanation}</div>
            )}
          </div>
        )}

        {/* Keywords */}
        {keywords.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>
              🔑 Key words:
            </span>
            {keywords.map((kw, i) => (
              <span key={i} style={{ background: '#F0FDF4', border: '1px solid #86EFAC',
                borderRadius: 12, padding: '2px 8px', fontSize: 11,
                color: '#166534', fontWeight: 600 }}>
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Steps */}
        {steps.length > 0 && (
          <div style={{ background: '#F8FAFC', borderRadius: 8,
            padding: '8px 12px', fontSize: 12, color: '#475569' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ marginBottom: i < steps.length - 1 ? 4 : 0 }}>
                {i + 1}. {step}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── layout: SplitView (passage left, questions right) ────
  const activeQuestion = questions.find(q => q.id === activeQ) || null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const passagePanel = (
    <div style={{ fontSize: 14, fontFamily: "'Times New Roman', serif",
      lineHeight: 2, color: '#1E293B' }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B',
        textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
        📖 Read the Passage
      </div>
      {submitted && activeQuestion ? (
        <div>
          {renderPassage(activeQuestion)}
          <div style={{ marginTop: 8, fontSize: 11, color: '#3B82F6', fontWeight: 600 }}>
            🔵 Blue = answer evidence &nbsp; 🟠 Orange = trap
          </div>
        </div>
      ) : (
        <div style={{ whiteSpace: 'pre-line' }}>{passage}</div>
      )}
    </div>
  );

  const questionsPanel = (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>
          {sectionLabel} ({marks} mark{marks !== 1 ? 's' : ''})
        </span>
        {submitted && (
          <span style={{ fontSize: 13, fontWeight: 800,
            color: autoScore === autoTotal ? '#16A34A' : '#D97706' }}>
            Auto: {autoScore}/{autoTotal}
            {openTotal > 0 && ` · Self: ${openDone}/${openTotal}`}
          </span>
        )}
      </div>

      {questions.map((q, qi) => {
        const f = getFormat(q);
        const isActive = activeQ === q.id;

        return (
          <div key={q.id}
            onClick={() => submitted && setActiveQ(q.id)}
            style={{ background: '#fff', borderRadius: 14,
              padding: '14px 16px', marginBottom: 12,
              boxShadow: isActive && submitted
                ? '0 0 0 3px #3B82F6, 0 2px 8px rgba(0,0,0,0.08)'
                : '0 2px 8px rgba(0,0,0,0.06)',
              border: isActive && submitted ? '1.5px solid #3B82F6' : '1.5px solid transparent',
              cursor: submitted ? 'pointer' : 'default',
              transition: 'box-shadow 0.15s, border 0.15s' }}>

            {/* Question header */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 10,
              alignItems: 'flex-start' }}>
              <span style={{ background: isActive && submitted ? '#3B82F6' : '#E2E8F0',
                color: isActive && submitted ? '#fff' : '#475569',
                borderRadius: 8, padding: '2px 8px', fontSize: 12, fontWeight: 800,
                flexShrink: 0, transition: 'all 0.15s' }}>
                Q{q.questionNo || qi + 1}
              </span>
              {q.marks && (
                <span style={{ fontSize: 11, color: '#94A3B8', flexShrink: 0,
                  alignSelf: 'center' }}>
                  [{q.marks}m]
                </span>
              )}
              <span style={{ fontSize: 13, color: '#1E293B', lineHeight: 1.6,
                fontWeight: 600 }}>
                {q.stem || q.question || ''}
              </span>
            </div>

            {/* Input area */}
            {renderInput(q)}

            {/* Evidence + explanation (after submit) */}
            {renderEvidenceBox(q)}
          </div>
        );
      })}

      {/* Submit / Finish */}
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!allAnswered}
          style={{ width: '100%', padding: '14px', borderRadius: 12,
            background: allAnswered ? '#1E3A6E' : '#94A3B8',
            color: '#fff', border: 'none', fontSize: 15, fontWeight: 700,
            cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
          {allAnswered ? 'Submit Answers' : 'Answer all questions to submit'}
        </button>
      ) : canFinish ? (
        <button onClick={handleFinish}
          style={{ width: '100%', padding: '14px', borderRadius: 12,
            background: '#1E3A6E', color: '#fff', border: 'none',
            fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Next Section →
        </button>
      ) : (
        <div style={{ textAlign: 'center', padding: '12px',
          color: '#64748B', fontSize: 13 }}>
          {openTotal > 0
            ? `Please self-assess your open answers before continuing (${openDone}/${openTotal} done)`
            : 'Loading...'}
        </div>
      )}
    </div>
  );

  // Use SplitViewLayout if available, else stack
  if (typeof SplitViewLayout !== 'undefined') {
    return (
      <SplitViewLayout
        leftContent={passagePanel}
        rightContent={questionsPanel}
        leftLabel="Read the Passage"
        rightLabel="Questions"
        headerHeight={80}
      />
    );
  }

  return (
    <div style={{ padding: '0 0 80px' }}>
      <div style={{ padding: '14px 16px',
        borderBottom: '1px solid #E2E8F0', marginBottom: 12 }}>
        {passagePanel}
      </div>
      <div style={{ padding: '0 16px' }}>{questionsPanel}</div>
    </div>
  );
}


// 
//  EXAM SUMMARY
// 
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
          {pct >= 80 ? "" : pct >= 60 ? "" : ""}
        </div>
        <div style={{ fontSize: 42, fontWeight: 900, fontFamily: EXAM_BODY }}>{pct}%</div>
        <div style={{ fontSize: 16, opacity: 0.85, marginTop: 4 }}>
          {correct}/{total} correct . {fmtTime(duration)}
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
           Back to Home
        </button>
        <button onClick={onRetry}
          style={{
            width: "100%", background: "none", color: "#1e3a6e",
            border: "2px solid #1e3a6e", borderRadius: 12, padding: "13px 0",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
          }}>
           New Session
        </button>
      </div>
    </div>
  );
}

// 
//  EXAM SESSION SCREEN - Main controller
// 
export function ExamSessionScreen({ plan, isMockExam, mockInfo, startFrom, onFinish, onBack }) {
  const startSecIdx = startFrom ? Math.max(0, plan.findIndex(s => s.type === startFrom)) : 0;
  const [secIdx, setSecIdx] = useState(startSecIdx);
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
    // Save results if provided
    let latestResults = pageResults;
    if (results) {
      latestResults = [...pageResults, ...results];
      setPageResults(latestResults);
    }
    if (advance) {
      // Move to next page or section
      const newAll = [...allResults, ...latestResults];
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
        }}></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: EXAM_BODY, fontWeight: 700, fontSize: 13 }}>
            {isMockExam ? ` ${mockInfo?.school || "Mock Exam"}` : `Section ${secIdx + 1}/${totalSections}`}
          </div>
          <div style={{ fontFamily: EXAM_BODY, fontSize: 11, color: "#64748b" }}>
            {sectionLabel}
            {totalPages > 1 && ` . Page ${pageIdx + 1}/${totalPages}`}
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
