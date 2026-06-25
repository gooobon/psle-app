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
  const passage   = set.passage   || '';

  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQ,   setActiveQ]   = useState(null);
  const startRef = useRef(Date.now());

  // Exam typography tokens -- no emojis, no bright colors
  const EX = {
    border: '1.5px solid #1a1a1a',
    thin:   '1px solid #1a1a1a',
    font:   "'Times New Roman', Georgia, serif",
    sans:   'Arial, sans-serif',
    ink:    '#1a1a1a',
    correct:'#dfeede',
    wrong:  '#f5dede',
    sel:    '#e9e9e9',
    muted:  '#555',
    faint:  '#888',
  };

  // -------------------------------------------------
  // Format detection -- new 8-type schema takes priority
  // -------------------------------------------------
  function getFormat(q) {
    const f = q.format || '';
    const NEW_FORMATS = ['fill_blank','fill_word','mcq','ab_circle','true_false','sequence','tf_reason','open_sentence'];
    if (NEW_FORMATS.includes(f)) return f;
    // Legacy aliases from old schema
    if (f === 'truefalse')         return 'true_false';
    if (f === 'truefalse_reason')  return 'tf_reason';
    if (f === 'fill' || f === 'fill_short') return 'fill_blank';
    if (f === 'open' || f === 'open_multi') return 'open_sentence';
    // Infer from structure fields
    if (q.statements && q.statements.length) return 'true_false';
    if (q.abSentence || q.abChoices)         return 'ab_circle';
    if (q.sequenceItems && q.sequenceItems.length) return 'sequence';
    if (q.options && q.options.length >= 2)  return 'mcq';
    return 'open_sentence';
  }

  function norm(s) {
    return String(s || '').trim().toLowerCase().replace(/[.,!?'"]/g, '');
  }

  // Colored CORRECT / INCORRECT pill shown after submit.
  function verdictBadge(ok) {
    return (
      <span style={{ display: 'inline-block', marginTop: 8,
        fontFamily: EX.sans, fontSize: 11, fontWeight: 800,
        letterSpacing: '.5px', padding: '3px 10px', borderRadius: 999,
        background: ok ? '#DCFCE7' : '#FEE2E2',
        color: ok ? '#15803D' : '#B91C1C',
        border: `1px solid ${ok ? '#16A34A' : '#DC2626'}` }}>
        {ok ? 'CORRECT' : 'INCORRECT'}
      </span>
    );
  }

  function isAutoGraded(q) {
    return ['mcq','ab_circle','true_false','sequence','fill_blank','fill_word'].includes(getFormat(q));
  }

  function isAnswered(q) {
    const f   = getFormat(q);
    const val = answers[q.id];
    if (f === 'true_false') {
      const stmts = q.statements || [];
      return stmts.length > 0 && stmts.every((_, si) => (val || [])[si] !== undefined);
    }
    if (f === 'sequence') {
      const items = q.sequenceItems || q.items || [];
      return items.length > 0 && items.every((_, i) => answers[q.id + '_seq_' + i] !== undefined);
    }
    if (f === 'tf_reason') {
      return val !== undefined && (answers[q.id + '_reason'] || '').trim().length > 0;
    }
    return val !== undefined && String(val).trim().length > 0;
  }

  const allAnswered = questions.length > 0 && questions.every(isAnswered);

  // -------------------------------------------------
  // Grading
  // -------------------------------------------------
  function correctIdxForMcq(q) {
    const opts = (q.options || []).map(o => typeof o === 'string' ? o : String(o.text || o));
    const a = q.answer;
    if (typeof a === 'number') return a;
    if (typeof a === 'string') {
      const li = a.toUpperCase().charCodeAt(0) - 65;
      if (li >= 0 && li < opts.length) return li;
      const n = parseInt(a, 10);
      if (!isNaN(n)) return n >= 1 ? n - 1 : n;
    }
    return 0;
  }

  function gradeQuestion(q) {
    const f   = getFormat(q);
    const val = answers[q.id];
    if (f === 'mcq')       return val === correctIdxForMcq(q);
    if (f === 'ab_circle') return norm(val) === norm(q.answer);
    if (f === 'true_false') {
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return correct.every((a, i) => norm((val || [])[i]) === norm(a));
    }
    if (f === 'sequence') {
      const items   = q.sequenceItems || q.items || [];
      const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || '').split(',').map(Number);
      return items.every((_, i) => parseInt(answers[q.id + '_seq_' + i] || '0', 10) === correct[i]);
    }
    if (f === 'fill_blank' || f === 'fill_word') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      return accept.some(a => norm(val) === norm(a));
    }
    if (f === 'tf_reason') return norm(val) === norm(q.answer);
    return false; // open_sentence -- not auto-graded
  }

  // -------------------------------------------------
  // Submit / Finish
  // -------------------------------------------------
  function handleSubmit() {
    if (submitted || !allAnswered) return;
    setSubmitted(true);
    setActiveQ(questions[0]?.id || null);
  }

  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = questions.map(q => ({
      id:          q.id,
      topic:       'Comprehension',
      sectionType: 'Comprehension',
      correct:     gradeQuestion(q),
      timeTaken:   Math.round(t / Math.max(questions.length, 1)),
    }));
    onPageDone(results);
    onPageDone(null, true);
  }

  // -------------------------------------------------
  // Passage with post-submit highlights
  // -------------------------------------------------
  function renderPassageText(aq) {
    if (!passage) return null;
    const evidence = aq?.solution?.evidence || null;
    const trap     = aq?.solution?.trap     || null;
    if (!evidence && !trap) {
      return <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}>{passage}</span>;
    }
    let segs = [{ text: passage, type: 'plain' }];
    function applyHl(segArr, target, type) {
      if (!target) return segArr;
      const out = [];
      segArr.forEach(seg => {
        if (seg.type !== 'plain') { out.push(seg); return; }
        const idx = seg.text.indexOf(target);
        if (idx === -1) { out.push(seg); return; }
        if (idx > 0) out.push({ text: seg.text.slice(0, idx), type: 'plain' });
        out.push({ text: target, type });
        const after = seg.text.slice(idx + target.length);
        if (after) out.push({ text: after, type: 'plain' });
      });
      return out;
    }
    segs = applyHl(segs, evidence, 'evidence');
    segs = applyHl(segs, trap,     'trap');
    return (
      <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}>
        {segs.map((seg, i) => {
          if (seg.type === 'plain')
            return <span key={i}>{seg.text}</span>;
          if (seg.type === 'evidence')
            return <span key={i} style={{ borderBottom: '2px solid #1a1a1a', fontWeight: 700 }}>{seg.text}</span>;
          return <span key={i} style={{ borderBottom: '1px dashed #999', fontStyle: 'italic' }}>{seg.text}</span>;
        })}
      </span>
    );
  }

  // -------------------------------------------------
  // Per-format input renderers (exam style)
  // -------------------------------------------------
  function renderInput(q) {
    const f   = getFormat(q);
    const val = answers[q.id];

    // -- FILL_BLANK --------------------------------
    if (f === 'fill_blank') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      const ok  = submitted && accept.some(a => norm(val) === norm(a));
      const bad = submitted && !ok;
      return (
        <div style={{ marginTop: 10 }}>
          {!submitted ? (
            <input type="text" value={val || ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              style={{ border: 'none', borderBottom: EX.border, minWidth: 200,
                padding: '2px 6px', fontSize: 14, fontFamily: EX.font,
                outline: 'none', background: 'transparent' }} />
          ) : (
            <div>
              <span style={{ fontFamily: EX.font, fontSize: 14,
                background: ok ? '#DCFCE7' : '#FEE2E2',
                padding: '2px 8px', borderRadius: 4,
                borderBottom: `2px solid ${ok ? '#16A34A' : '#DC2626'}` }}>
                {val || '(blank)'}
              </span>
              {verdictBadge(ok)}
              {bad && q.answer && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                    color: '#16A34A', marginRight: 6 }}>Answer:</span>
                  <span style={{ fontFamily: EX.font, fontSize: 14, fontWeight: 700,
                    background: '#DCFCE7', padding: '3px 10px', borderRadius: 4,
                    border: '1px solid #16A34A', color: '#14532D' }}>
                    {q.answer}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- FILL_WORD ---------------------------------
    if (f === 'fill_word') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      const ok  = submitted && accept.some(a => norm(val) === norm(a));
      const bad = submitted && !ok;
      return (
        <div style={{ marginTop: 10 }}>
          {!submitted ? (
            <input type="text" value={val || ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              style={{ border: EX.border, width: '100%', maxWidth: 280,
                padding: '8px 12px', fontSize: 14, fontFamily: EX.font, outline: 'none' }} />
          ) : (
            <div>
              <div style={{ display: 'inline-block', padding: '5px 12px',
                fontFamily: EX.font, fontSize: 14, maxWidth: 280, borderRadius: 6,
                background: ok ? '#DCFCE7' : '#FEE2E2',
                border: `1.5px solid ${ok ? '#16A34A' : '#DC2626'}`,
                color: ok ? '#14532D' : '#7F1D1D', fontWeight: 700 }}>
                {val || '(blank)'}
              </div>
              {verdictBadge(ok)}
              {bad && q.answer && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                    color: '#16A34A', marginRight: 6 }}>Answer:</span>
                  <span style={{ fontFamily: EX.font, fontSize: 14, fontWeight: 700,
                    background: '#DCFCE7', padding: '3px 10px', borderRadius: 4,
                    border: '1px solid #16A34A', color: '#14532D' }}>
                    {q.answer}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- MCQ ---------------------------------------
    if (f === 'mcq') {
      const opts   = (q.options || []).map(o => typeof o === 'string' ? o : String(o.text || o));
      const corr   = correctIdxForMcq(q);
      const chosen = val;
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', minWidth: 260, width: 'auto' }}>
            <tbody>
              {opts.map((opt, i) => {
                let bg = 'transparent';
                if (submitted) { if (i === corr) bg = EX.correct; else if (chosen === i) bg = EX.wrong; }
                else if (chosen === i) bg = EX.sel;
                return (
                  <tr key={i} style={{ background: bg }}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: i }))}>
                    <td style={{ border: EX.thin, padding: '7px 12px', width: 46, textAlign: 'center',
                      fontFamily: EX.sans, fontWeight: 700, fontSize: 13,
                      cursor: submitted ? 'default' : 'pointer' }}>
                      ({i + 1})
                    </td>
                    <td style={{ border: EX.thin, padding: '7px 14px', fontFamily: EX.font, fontSize: 14,
                      cursor: submitted ? 'default' : 'pointer' }}>
                      {opt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ fontFamily: EX.sans, fontSize: 14, marginTop: 6 }}>
            Answer:{' '}
            <span style={{ display: 'inline-block', minWidth: 42, border: EX.thin,
              padding: '2px 10px', textAlign: 'center', fontWeight: 700 }}>
              {chosen !== undefined ? '(' + (chosen + 1) + ')' : '(  )'}
            </span>
          </div>
        </div>
      );
    }

    // -- AB_CIRCLE ---------------------------------
    if (f === 'ab_circle') {
      const sentence = q.abSentence || q.stem || '';
      const choices  = q.abChoices  || {};
      const chosen   = val;
      const matchArr = [...sentence.matchAll(/\(([AB])\)\s*(\S+)/g)];

      if (!matchArr.length) {
        // Fallback: show plain A / B buttons from abChoices
        return (
          <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px', fontFamily: EX.font, fontSize: 14 }}>
            {['A', 'B'].map(lab => {
              let bg = 'transparent';
              if (submitted) { if (lab === q.answer) bg = EX.correct; else if (chosen === lab) bg = EX.wrong; }
              else if (chosen === lab) bg = EX.sel;
              return (
                <span key={lab}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: lab }))}
                  style={{ fontWeight: 700, borderBottom: '2px solid #1a1a1a', padding: '0 2px',
                    background: bg, cursor: submitted ? 'default' : 'pointer',
                    userSelect: 'none', marginRight: 16 }}>
                  ({lab}) {choices[lab] || lab}
                </span>
              );
            })}
          </div>
        );
      }

      // Build sentence segments: plain text + interactive (A)/(B) word spans
      const parts = [];
      let pos = 0;
      for (const m of matchArr) {
        if (m.index > pos) parts.push({ type: 'text', text: sentence.slice(pos, m.index) });
        parts.push({ type: 'word', lab: m[1], word: m[2] });
        pos = m.index + m[0].length;
      }
      if (pos < sentence.length) parts.push({ type: 'text', text: sentence.slice(pos) });

      return (
        <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px',
          fontSize: 14, lineHeight: 1.9, fontFamily: EX.font }}>
          {parts.map((part, pi) => {
            if (part.type === 'text') return <span key={pi}>{part.text}</span>;
            const lab = part.lab;
            let bg = 'transparent';
            if (submitted) { if (lab === q.answer) bg = EX.correct; else if (chosen === lab) bg = EX.wrong; }
            else if (chosen === lab) bg = EX.sel;
            return (
              <span key={pi}
                onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: lab }))}
                style={{ fontWeight: 700, borderBottom: '2px solid #1a1a1a', padding: '0 2px',
                  background: bg, cursor: submitted ? 'default' : 'pointer', userSelect: 'none' }}>
                {part.word}
                <span style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                  verticalAlign: 'super', color: EX.muted }}>({lab})</span>
              </span>
            );
          })}
        </div>
      );
    }

    // -- TRUE_FALSE --------------------------------
    if (f === 'true_false') {
      const stmts   = q.statements || [];
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', width: '100%', fontFamily: EX.font }}>
            <thead>
              <tr>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 54 }}></th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', textAlign: 'left' }}>Statement</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>True</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>False</th>
              </tr>
            </thead>
            <tbody>
              {stmts.map((stmt, si) => {
                const lab    = String.fromCharCode(97 + si);
                const chosen = (val || [])[si];
                const corr   = correct[si];
                function tfCell(t) {
                  let bg = 'transparent';
                  if (submitted) { if (t === corr) bg = EX.correct; else if (chosen === t) bg = EX.wrong; }
                  else if (chosen === t) bg = EX.sel;
                  return (
                    <td key={t}
                      onClick={() => {
                        if (submitted) return;
                        const next = [...(answers[q.id] || [])];
                        next[si] = t;
                        setAnswers(a => ({ ...a, [q.id]: next }));
                      }}
                      style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                        cursor: submitted ? 'default' : 'pointer', background: bg, fontSize: 16 }}>
                      {chosen === t ? '\u2713' : (submitted && t === corr ? '\u2713' : '')}
                    </td>
                  );
                }
                return (
                  <tr key={si}>
                    <td style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                      fontWeight: 700, fontFamily: EX.sans, fontSize: 13 }}>({lab})</td>
                    <td style={{ border: EX.thin, padding: '9px 11px', fontSize: 13.5, verticalAlign: 'top' }}>
                      {stmt}
                    </td>
                    {tfCell('True')}
                    {tfCell('False')}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // -- SEQUENCE ----------------------------------
    if (f === 'sequence') {
      const items   = q.sequenceItems || q.items || [];
      const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || '').split(',').map(Number);
      const maxN    = items.length;
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', width: '100%', fontFamily: EX.font }}>
            <tbody>
              {items.map((item, ii) => {
                const key    = q.id + '_seq_' + ii;
                const chosen = answers[key];
                const corr   = correct[ii];
                const ok     = submitted && chosen === corr;
                return (
                  <tr key={ii}>
                    <td style={{ border: EX.thin, padding: '10px 12px', width: 90, textAlign: 'center',
                      background: submitted ? (ok ? EX.correct : EX.wrong) : 'transparent' }}>
                      <span style={{ display: 'inline-flex', gap: 3 }}>
                        {Array.from({ length: maxN }, (_, n) => n + 1).map(n => (
                          <button key={n}
                            onClick={() => !submitted && setAnswers(a => ({ ...a, [key]: n }))}
                            style={{ width: 24, height: 24, border: EX.thin,
                              background: chosen === n ? '#1a1a1a' : '#fff',
                              color:      chosen === n ? '#fff'    : '#1a1a1a',
                              fontFamily: EX.sans, fontSize: 12,
                              cursor: submitted ? 'default' : 'pointer' }}>
                            {n}
                          </button>
                        ))}
                      </span>
                    </td>
                    <td style={{ border: EX.thin, padding: '10px 12px', fontSize: 13.5 }}>
                      {item}
                      {submitted && !ok && (
                        <span style={{ fontFamily: EX.sans, fontSize: 12, color: '#9b1c1c', marginLeft: 8 }}>
                          (should be {corr})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // -- TF_REASON ---------------------------------
    if (f === 'tf_reason') {
      const tfVal   = val;
      const reason  = answers[q.id + '_reason'] || '';
      const correct = typeof q.answer === 'object' ? q.answer?.verdict : q.answer;
      const modelAns = (q.acceptableAnswers && q.acceptableAnswers[0]) || q.solution?.evidence || '';
      return (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['True', 'False'].map(opt => {
              let bg = '#fff';
              if (submitted) {
                if (norm(opt) === norm(correct)) bg = EX.correct;
                else if (norm(tfVal) === norm(opt)) bg = EX.wrong;
              } else if (tfVal === opt) bg = EX.sel;
              return (
                <button key={opt}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: opt }))}
                  style={{ flex: 1, padding: '8px 0', border: EX.border, background: bg,
                    color: EX.ink, fontFamily: EX.sans, fontWeight: 700, fontSize: 14,
                    cursor: submitted ? 'default' : 'pointer' }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {!submitted ? (
            <textarea value={reason} rows={3}
              onChange={e => setAnswers(a => ({ ...a, [q.id + '_reason']: e.target.value }))}
              placeholder="Give a reason for your answer..."
              style={{ width: '100%', padding: '8px 12px', border: EX.border,
                fontFamily: EX.font, fontSize: 14, outline: 'none',
                resize: 'vertical', boxSizing: 'border-box' }} />
          ) : (
            <div>
              <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                Your reason
              </div>
              <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14, minHeight: 40 }}>
                {reason || '(no reason given)'}
              </div>
              {modelAns && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                    Model answer
                  </div>
                  <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14 }}>
                    {modelAns}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- OPEN_SENTENCE (default) -------------------
    const openVal  = val || '';
    const modelAns = typeof q.answer === 'string' ? q.answer : '';
    return (
      <div style={{ marginTop: 10 }}>
        {!submitted ? (
          <textarea value={openVal} rows={3}
            onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
            placeholder="Write your answer in a complete sentence..."
            style={{ width: '100%', padding: '8px 12px', border: EX.border,
              fontFamily: EX.font, fontSize: 14, outline: 'none',
              resize: 'vertical', boxSizing: 'border-box' }} />
        ) : (
          <div>
            <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
              Your answer
            </div>
            <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font,
              fontSize: 14, minHeight: 40, whiteSpace: 'pre-line' }}>
              {openVal || '(no answer given)'}
            </div>
            {modelAns && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                  Model answer
                </div>
                <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14 }}>
                  {modelAns}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------
  // Evidence box (post-submit) -- colored & icon-coded for readability.
  // Evidence (purple) and Trap (amber) are emphasized most strongly.
  // -------------------------------------------------
  function renderEvidenceBox(q) {
    if (!submitted) return null;
    const sol = q.solution || {};
    const tip            = sol.tip            || '';
    const evidence       = sol.evidence       || '';
    const trap           = sol.trap           || '';
    const trapExplanation= sol.trapExplanation|| '';
    const answerFormat   = sol.answerFormat   || '';
    const steps          = sol.steps          || [];
    if (!tip && !evidence && !trap && !answerFormat && !steps.length) return null;

    // Generic colored callout box. `accent` is the left bar + label color,
    // `bg` is the soft background, `strong` raises border weight (for emphasis).
    function callout({ label, icon, accent, bg, content, clickable, strong }) {
      return (
        <div key={label}
          onClick={clickable ? () => setActiveQ(q.id) : undefined}
          style={{
            background: bg,
            border: `1px solid ${strong ? accent : '#E5E7EB'}`,
            borderLeft: `${strong ? 5 : 4}px solid ${accent}`,
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            marginBottom: 8,
            cursor: clickable ? 'pointer' : 'default',
            fontFamily: EX.font,
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: EX.sans, fontWeight: 800, fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '.5px',
            color: accent, marginBottom: 5 }}>
            <span aria-hidden="true" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 16, height: 16, borderRadius: '50%',
              background: accent, color: '#fff', fontSize: 10, fontWeight: 900,
              fontFamily: EX.sans, flexShrink: 0 }}>
              {icon}
            </span>
            {label}
          </div>
          {content}
        </div>
      );
    }

    return (
      <div style={{ marginTop: 12, borderTop: '1px solid #E5E7EB', paddingTop: 12 }}>
        {/* EVIDENCE -- purple, emphasized (priority 1) */}
        {evidence && callout({
          label: 'Where to find it', icon: 'F', accent: '#7C3AED',
          bg: '#F5F3FF', strong: true, clickable: true,
          content: (
            <div>
              <div style={{ borderLeft: '3px solid #7C3AED', paddingLeft: 10,
                fontStyle: 'italic', marginBottom: 4, color: '#4C1D95' }}>
                "{evidence}"
              </div>
              <div style={{ fontFamily: EX.sans, fontSize: 11, color: '#7C3AED', fontWeight: 600 }}>
                Tap to highlight in the passage
              </div>
            </div>
          ),
        })}

        {/* TRAP -- amber, emphasized (priority 2) */}
        {trap && callout({
          label: 'Trap to avoid', icon: '!', accent: '#D97706',
          bg: '#FFFBEB', strong: true,
          content: (
            <div style={{ color: '#92400E' }}>
              <span style={{ fontWeight: 700 }}>"{trap}"</span>
              {trapExplanation ? ' -- ' + trapExplanation : ''}
            </div>
          ),
        })}

        {/* TIP -- blue, soft */}
        {tip && callout({
          label: 'Tip', icon: 'i', accent: '#2563EB',
          bg: '#EFF6FF',
          content: <div style={{ color: '#1E3A5F' }}>{tip}</div>,
        })}

        {/* ANSWER FORMAT -- teal, soft */}
        {answerFormat && callout({
          label: 'Answer format', icon: 'A', accent: '#0D9488',
          bg: '#F0FDFA',
          content: <div style={{ color: '#134E4A' }}>{answerFormat}</div>,
        })}

        {/* STEPS -- neutral gray, numbered chips */}
        {steps.length > 0 && (
          <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB',
            borderRadius: 8, padding: '10px 14px', fontFamily: EX.font, fontSize: 13 }}>
            <div style={{ fontFamily: EX.sans, fontWeight: 800, fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '.5px',
              color: '#64748B', marginBottom: 6 }}>
              How to work it out
            </div>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start',
                marginBottom: i < steps.length - 1 ? 5 : 0 }}>
                <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%',
                  background: '#475569', color: '#fff', fontFamily: EX.sans,
                  fontSize: 11, fontWeight: 800, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  {i + 1}
                </span>
                <span style={{ color: '#334155', lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------
  // Layout
  // -------------------------------------------------
  const activeQuestion    = submitted ? (questions.find(q => q.id === activeQ) || null) : null;
  const autoGradedTotal   = questions.filter(isAutoGraded).length;
  const autoGradedScore   = submitted ? questions.filter(q => isAutoGraded(q) && gradeQuestion(q)).length : 0;
  const openTotal         = questions.filter(q => !isAutoGraded(q)).length;

  const passagePanel = (
    <div style={{ fontFamily: EX.font, fontSize: 15.5, lineHeight: 2.05, color: EX.ink }}>
      <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, borderBottom: '1px solid #ccc', paddingBottom: 8, marginBottom: 14, color: '#333' }}>
        Read the Passage
      </div>
      {renderPassageText(activeQuestion)}
      {submitted && activeQuestion && (
        <div style={{ marginTop: 14, fontFamily: EX.sans, fontSize: 11, color: EX.faint,
          display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <span>
            <span style={{ borderBottom: '2px solid #1a1a1a', fontWeight: 700, marginRight: 4 }}>
              evidence
            </span>
            Evidence
          </span>
          <span>
            <span style={{ borderBottom: '1px dashed #999', fontStyle: 'italic', marginRight: 4 }}>
              trap
            </span>
            Trap to avoid
          </span>
        </div>
      )}
    </div>
  );

  const questionsPanel = (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12, fontFamily: EX.sans }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: EX.muted }}>
          {sectionLabel} ({marks} mark{marks !== 1 ? 's' : ''})
        </span>
        {submitted && (
          <span style={{ fontSize: 13, fontWeight: 800,
            color: autoGradedScore === autoGradedTotal ? '#1a6b2e' : '#9b1c1c' }}>
            {autoGradedScore}/{autoGradedTotal} correct
            {openTotal > 0 && ' + ' + openTotal + ' open'}
          </span>
        )}
      </div>

      {questions.map((q, qi) => {
        const f        = getFormat(q);
        const isActive = activeQ === q.id && submitted;
        const tagLabel = f.replace(/_/g, ' ').toUpperCase();
        return (
          <div key={q.id}
            onClick={() => submitted && setActiveQ(q.id)}
            style={{ background: '#fff',
              border: isActive ? '2px solid #1a1a1a' : EX.border,
              padding: '16px 18px', marginBottom: 16,
              cursor: submitted ? 'pointer' : 'default' }}>

            {/* Header: Q41. [1m]               FILL BLANK */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12,
              alignItems: 'baseline', fontFamily: EX.sans }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{q.questionNo || qi + 1}.</span>
              {q.marks && <span style={{ fontSize: 11, color: EX.faint }}>[{q.marks}m]</span>}
              <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700,
                letterSpacing: '.5px', textTransform: 'uppercase', color: EX.muted,
                border: '1px solid #aaa', padding: '2px 7px' }}>
                {tagLabel}
              </span>
            </div>

            {/* Stem */}
            <div style={{ fontSize: 14.5, lineHeight: 1.55, whiteSpace: 'pre-line',
              fontFamily: EX.font }}>
              {q.stem || q.question || ''}
            </div>

            {/* Format-specific input */}
            {renderInput(q)}

            {/* Explanation boxes (post-submit) */}
            {renderEvidenceBox(q)}
          </div>
        );
      })}

      {/* Submit / Next Section */}
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!allAnswered}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: allAnswered ? EX.ink : '#bbb',
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
            cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
          {allAnswered ? 'Submit Answers' : 'Answer all questions to submit'}
        </button>
      ) : (
        <button onClick={handleFinish}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: EX.ink, color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Next Section
        </button>
      )}
    </div>
  );

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
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0', marginBottom: 12 }}>
        {passagePanel}
      </div>
      <div style={{ padding: '0 16px' }}>{questionsPanel}</div>
    </div>
  );
}

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
export function ExamSessionScreen({ plan, isMockExam, mockInfo, startFrom, singleSection, onFinish, onBack }) {
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
      // Single-section mode: finish after completing just this one section
      if (singleSection) {
        setDone(true);
        onFinish(newAll);
        return;
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
