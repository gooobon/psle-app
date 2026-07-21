"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { C } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER } from "@/lib/quizMeta";
import { fmtTime, guessFlag } from "@/lib/sessionUtils";
import ZH_VOCAB from "@/data/p3/chinese/zh_vocab.json";
import ZH_SEG from "@/data/p3/chinese/zh_seg.json";

// 
//  EXAM MODE - Looks & feels like a real Singapore P3 exam paper
//  - All questions shown at once per page (4-5 per page)
//  - Student can freely move between questions on same page
//  - "Submit Page" marks + explanations revealed for that page
//  - Then moves to next page
// 

const EXAM_FONT = "'Times New Roman', Times, 'KaiTi','STKaiti','LXGW WenKai', serif";
const EXAM_BODY = EXAM_FONT;

// --- Chinese WA1 (additive; English flow unchanged) ---
const ZH_FONT = "'KaiTi','STKaiti','LXGW WenKai',serif";

// Exam chrome must be Chinese on the Chinese paper (real past papers carry no
// English). The learning layer (Translate / Key words / EN notes) stays English
// on purpose - that is what the student reads to understand the meaning.
function marksLabel(marks, isZh) {
  return isZh
    ? "\uFF08" + marks + "\u5206\uFF09"
    : "(" + marks + " mark" + (marks !== 1 ? "s" : "") + ")";
}
const ZH_TAG = {
  mcq: "\u9009\u62E9\u9898",
  fill_word: "\u627E\u8BCD\u586B\u7A7A",
  fill_blank: "\u586B\u7A7A",
  open_sentence: "\u95EE\u7B54",
  true_false: "\u5224\u65AD",
  tf_reason: "\u5224\u65AD\u8BF4\u660E",
  sequence: "\u6392\u5E8F",
  ab_circle: "\u9009\u62E9",
};
const ZH_TYPES = new Set([
  "HanziMcq", "PinyinMcq", "VocabMcq", "VocabMatch",
  "SentenceCraft", "PassageCloze", "ReadingMcq", "ReadingOpen",
]);
const ZH_MCQ_TYPES = new Set(["HanziMcq", "PinyinMcq", "VocabMcq"]);
const ZH_LABELS = {
  HanziMcq: "\u8FA8\u5B57", PinyinMcq: "\u62FC\u97F3", VocabMcq: "\u8BCD\u8BED",
  VocabMatch: "\u8BCD\u8BED\u642D\u914D", SentenceCraft: "\u9020\u53E5",
  PassageCloze: "\u77ED\u6587\u586B\u7A7A", ReadingMcq: "\u9605\u8BFB\u7406\u89E3",
  ReadingOpen: "\u9605\u8BFB\u7406\u89E3",
};
const ZH_INSTRUCTIONS = {
  HanziMcq: "\u9009\u51FA\u6B63\u786E\u7684\u5B57\uFF0C\u628A\u5B83\u7684\u53F7\u7801\u5199\u5728\u62EC\u53F7\u91CC\u3002",
  PinyinMcq: "\u9009\u51FA\u6709\u4E0B\u5212\u7EBF\u7684\u8BCD\u8BED\u7684\u6B63\u786E\u62FC\u97F3\u3002",
  VocabMcq: "\u9009\u51FA\u6700\u9002\u5408\u7684\u8BCD\u8BED\uFF0C\u628A\u5B83\u7684\u53F7\u7801\u5199\u5728\u62EC\u53F7\u91CC\u3002",
};

// Style for {u}...{/u} spans. A plain <u> draws a 1px underline at offset 0,
// which collides with the bottom strokes of Chinese characters (they fill the
// whole square, unlike Latin letters with descenders) and reads as part of the
// glyph. Bold + a thicker underline pushed down by an offset separates the rule
// from the strokes, and a pale wash makes the target word findable at a glance
// while keeping the black-on-white exam-paper look.
const U_MARK = {
  fontWeight: 600,
  background: "#FAEEDA",
  padding: "1px 3px",
  borderRadius: 3,
  textDecoration: "underline",
  textDecorationThickness: "2px",
  textUnderlineOffset: "4px",
};

// Render a string with {u}...{/u} spans as underlined text. English content
// never contains the markers, so this is a no-op for the English flow.
function renderWithUnderline(text) {
  const str = String(text || "");
  if (str.indexOf("{u}") === -1) return str;
  const parts = [];
  const re = /\{u\}([\s\S]*?)\{\/u\}/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(str)) !== null) {
    if (m.index > last) parts.push(str.slice(last, m.index));
    parts.push(<span key={"u" + k++} style={U_MARK}>{m[1]}</span>);
    last = m.index + m[0].length;
  }
  if (last < str.length) parts.push(str.slice(last));
  return parts;
}

// ---------------------------------------------------------------
//  Chinese vocab pop-up: tap any known word in stimulus text to
//  see pinyin / meaning / synonyms / antonyms / example.
//  Words come from ZH_VOCAB (authored dictionary). Longest-match
//  segmentation against the dictionary; unknown text stays plain.
// ---------------------------------------------------------------
const ZH_HAN_RE = /[一-鿿]/;
function segZh(text) {
  const out = [];
  let i = 0;
  const n = text.length;
  const MAXLEN = 6;
  while (i < n) {
    if (!ZH_HAN_RE.test(text[i])) {
      let j = i;
      while (j < n && !ZH_HAN_RE.test(text[j])) j++;
      out.push({ t: text.slice(i, j), clk: false });
      i = j;
      continue;
    }
    let matched = null;
    const maxL = Math.min(MAXLEN, n - i);
    for (let L = maxL; L >= 1; L--) {
      const cand = text.slice(i, i + L);
      if (ZH_VOCAB[cand]) { matched = cand; break; }
    }
    if (matched) { out.push({ t: matched, clk: true }); i += matched.length; }
    else { out.push({ t: text[i], clk: false }); i++; }
  }
  return out;
}

function recordUnknownWord(word) {
  try {
    const k = "genius_zh_unknown_v1";
    const s = JSON.parse(localStorage.getItem(k) || "[]");
    if (!s.includes(word)) { s.push(word); localStorage.setItem(k, JSON.stringify(s)); }
  } catch (_) {}
}

function VocabPopup({ word, x, y, onClose }) {
  const e = ZH_VOCAB[word] || {};
  useEffect(() => {
    recordUnknownWord(word);
    const h = () => onClose();
    const t = setTimeout(() => window.addEventListener("click", h), 0);
    window.addEventListener("keydown", onClose);
    return () => { clearTimeout(t); window.removeEventListener("click", h); window.removeEventListener("keydown", onClose); };
  }, [word]);
  const W = 300;
  const left = Math.max(8, Math.min(x - W / 2, (typeof window !== "undefined" ? window.innerWidth : 360) - W - 8));
  const top = y + 18;
  const chip = (c, bg) => ({ display: "inline-block", fontFamily: ZH_FONT, fontSize: 13, padding: "2px 8px", borderRadius: 999, background: bg, color: c, marginRight: 5, marginTop: 4 });
  return (
    <div onClick={(ev) => ev.stopPropagation()} style={{ position: "fixed", left, top, width: W, zIndex: 9999,
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, boxShadow: "0 12px 32px rgba(15,23,42,.22)", padding: "13px 15px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div><span style={{ fontFamily: ZH_FONT, fontSize: 26, fontWeight: 700 }}>{word}</span>
          <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 14, marginLeft: 8 }}>{e.py || ""}</span></div>
        <span onClick={onClose} style={{ cursor: "pointer", color: "#9ca3af", fontSize: 18, lineHeight: 1 }}>×</span>
      </div>
      <div style={{ fontSize: 14, color: "#1f2937", marginTop: 6 }}>{e.en || ""}</div>
      {(e.syn && e.syn.length) ? <div><span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>동의어 </span>{e.syn.map((s, i) => <span key={i} style={chip("#0f9d6b", "#e7f6ef")}>{s}</span>)}</div> : null}
      {(e.ant && e.ant.length) ? <div><span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>반대어 </span>{e.ant.map((s, i) => <span key={i} style={chip("#e0533d", "#fdece8")}>{s}</span>)}</div> : null}
      {e.ex ? <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #e5e7eb" }}>
        <div style={{ fontFamily: ZH_FONT, fontSize: 15 }}>{e.ex.zh}</div>
        <div style={{ fontSize: 12, color: "#2563eb" }}>{e.ex.py}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{e.ex.en}</div>
      </div> : null}
    </div>
  );
}

// Render a Chinese stimulus string with tappable dictionary words.
// Falls back to renderWithUnderline for English (or when isZh is false).
function ClickableZh({ text, isZh }) {
  const [pop, setPop] = useState(null);
  const str = String(text || "");
  if (!isZh || !str) return renderWithUnderline(text);
  // Strip {u}..{/u} markers; remember the char ranges that were underlined (in the stripped string).
  let plain = "";
  const marks = [];
  {
    const re = /\{u\}([\s\S]*?)\{\/u\}/g;
    let last = 0, m;
    while ((m = re.exec(str)) !== null) {
      plain += str.slice(last, m.index);
      const s0 = plain.length;
      plain += m[1];
      marks.push([s0, plain.length]);
      last = m.index + m[0].length;
    }
    plain += str.slice(last);
  }
  const inMark = (a, b) => marks.some(([ms, me]) => a < me && b > ms);
  // Prefer the pre-computed (jieba) segmentation map for accurate word boundaries;
  // fall back to dictionary longest-match for any string not in the map.
  let toks;
  const pre = ZH_SEG[plain];
  if (pre) {
    let pos = 0;
    toks = pre.map((t) => { const o = { t, s: pos, clk: ZH_HAN_RE.test(t[0]) && !!ZH_VOCAB[t] }; pos += t.length; return o; });
  } else {
    let pos = 0;
    toks = segZh(plain).map((o) => { const r = { t: o.t, s: pos, clk: o.clk }; pos += o.t.length; return r; });
  }
  const nodes = toks.map((tk, i) => {
    const marked = inMark(tk.s, tk.s + tk.t.length);
    if (tk.clk) {
      return (
        <span key={i} onClick={(ev) => { ev.stopPropagation(); setPop({ word: tk.t, x: ev.clientX, y: ev.clientY }); }}
          style={{ ...(marked ? U_MARK : {}), cursor: "pointer", borderBottom: "1.5px dotted #9db2d4", borderRadius: 2 }}>{tk.t}</span>
      );
    }
    return <span key={i} style={marked ? U_MARK : undefined}>{tk.t}</span>;
  });
  return (
    <>
      {nodes}
      {pop && typeof document !== "undefined" && createPortal(
        <VocabPopup word={pop.word} x={pop.x} y={pop.y} onClose={() => setPop(null)} />, document.body)}
    </>
  );
}

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
    fontSize: "calc(var(--fs) * 1.071)",
    marginBottom: 4,
    marginTop: 16,
  },
  instructions: {
    fontFamily: EXAM_BODY,
    fontSize: "calc(var(--fs) * 1.000)",
    marginBottom: 12,
    lineHeight: 1.6,
  },
  qNum: {
    fontFamily: EXAM_BODY,
    fontWeight: "bold",
    fontSize: "calc(var(--fs) * 1.000)",
    minWidth: 24,
    paddingTop: 1,
  },
  qText: {
    fontFamily: EXAM_BODY,
    fontSize: "calc(var(--fs) * 1.000)",
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
    fontSize: "calc(var(--fs) * 1.000)",
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
    fontSize: "calc(var(--fs) * 1.000)",
  },
  bracketAns: {
    display: "inline-block",
    border: "1px solid #000",
    width: 32,
    height: 22,
    textAlign: "center",
    lineHeight: "20px",
    fontSize: "calc(var(--fs) * 1.000)",
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
function TransLine({ label, text }) {
  if (!text) return null;
  return (
    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#2563eb", lineHeight: 1.5, marginBottom: 6 }}>
      <span style={{ fontWeight: 700 }}>{label}: </span>{text}
    </div>
  );
}

function EnExp({ en }) {
  if (!en) return null;
  return (
    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#0f172a", lineHeight: 1.6, marginTop: 6, paddingTop: 6, borderTop: "1px dashed #cbd5e1" }}>
      {en}
    </div>
  );
}

function KeyWords({ list }) {
  if (!list || !list.length) return null;
  return (
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #cbd5e1" }}>
      <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Key words</div>
      {list.map((k, i) => (
        <div key={i} style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#0f172a", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>{k.w}</span>
          <span style={{ color: "#6b7280" }}> ({k.py})</span> &mdash; {k.en}
        </div>
      ))}
    </div>
  );
}

// The rewritten Chinese explanations carry a fixed 3-layer shape, separated by
// newlines in the data:
//   1. verdict     - why the keyed answer is right
//   2. elimination - why each wrong option is wrong
//   3. method      - the transferable rule, opening with a bracket marker
// Rendering them as one block hides that structure, so each layer gets its own
// paragraph and the method layer gets a tinted card. Explanations with no
// newlines (VocabMatch / Reading) fall through unchanged as a single paragraph.
function Expl({ text }) {
  const str = String(text || "");
  if (!str) return null;
  const parts = str.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
  return (
    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.75 }}>
      {parts.map(function (p, i) {
        const isMethod = p.indexOf("\u3010") === 0;
        if (isMethod) {
          return (
            <div key={i} style={{
              marginTop: 8, padding: "6px 10px",
              background: "#F5F3FF", borderLeft: "3px solid #A78BFA",
              borderRadius: "0 6px 6px 0", color: "#4C1D95",
            }}>{p}</div>
          );
        }
        return (
          <div key={i} style={{ marginTop: i === 0 ? 0 : 6 }}>{p}</div>
        );
      })}
    </div>
  );
}

function ExpContent({ q }) {
  return (
    <div style={{ marginTop: 6 }}>
      {q.sentence_en && (
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#2563eb", lineHeight: 1.5, marginBottom: 6 }}>
          <span style={{ fontWeight: 700 }}>Translate: </span>{q.sentence_en}
        </div>
      )}
      <Expl text={q.explanation} />
      <EnExp en={q.explanation_en} />
      <KeyWords list={q.keywords} />
    </div>
  );
}

function ExplanationBox({ correct, answer, explanation, tip }) {
  return (
    <div style={{
      marginTop: 6, marginLeft: 28, marginBottom: 8,
      borderLeft: `3px solid ${correct ? "#16a34a" : "#dc2626"}`,
      paddingLeft: 10, background: correct ? "#f0fdf4" : "#fef2f2",
      borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px",
    }}>
      <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: correct ? "#16a34a" : "#dc2626", marginBottom: 3 }}>
        {correct ? " Correct" : ` Correct answer: ${answer}`}
      </div>
      {explanation && (<Expl text={explanation} />)}
      {tip && (
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginTop: 4, fontStyle: "italic" }}>
           {tip}
        </div>
      )}
    </div>
  );
}

// 
//  MCQ PAGE - Grammar MCQ / Vocab MCQ
// 
function MCQPage({ items, pageIdx, totalPages, globalQStart, sectionLabel, marks, instructions, onPageDone, reviewMode, reviewResults, isZh }) {
  const _rev = reviewMode ? Object.fromEntries((reviewResults || []).map(r => [r.id, r.userAnswer])) : null;
  const [answers, setAnswers] = useState(_rev || {});
  const [retryAnswers, setRetryAnswers] = useState({});
  const [submitted, setSubmitted] = useState(!!reviewMode);
  const [retried, setRetried] = useState(_rev ? Object.fromEntries(items.filter(q => _rev[q.id] !== q.answer).map(q => [q.id, true])) : {});
  const [retriedCorrect, setRetriedCorrect] = useState({});
  const [showExplanation, setShowExplanation] = useState(_rev ? Object.fromEntries(items.map(q => [q.id, true])) : {});
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
      id: q.id, topic: q.topic, sectionType: q.topic, userAnswer: answers[q.id],
      skill: q.skill, trapType: q.explain && q.explain.trapType,
      correct: answers[q.id] === q.answer,
      solvedAfterHint: answers[q.id] !== q.answer && retriedCorrect[q.id],
      attempts: answers[q.id] === q.answer ? 1 : retried[q.id] ? 2 : 1,
      timeTaken: Math.round(t / items.length),
    }));
    // Save results first, then trigger page advance
    onPageDone(results, true);
  }

  const allAnswered = items.every(q => answers[q.id] !== undefined);
  const wrongItems = submitted ? items.filter(q => answers[q.id] !== q.answer) : [];
  const allRetriedOrCorrect = submitted && wrongItems.every(q => retried[q.id]);
  const score = submitted ? items.filter(q => answers[q.id] === q.answer).length : 0;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ fontFamily: isZh ? ZH_FONT : "'Times New Roman', serif", fontWeight: "bold", fontSize: "calc(var(--fs) * 1.071)", marginBottom: 4 }}>
          {sectionLabel} {marksLabel(marks, isZh)}
        </div>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", marginBottom: 12, lineHeight: 1.6 }}>{instructions}</div>
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
                <span style={{ fontWeight: "bold", fontSize: "calc(var(--fs) * 1.000)", minWidth: 24 }}>{qNum}.</span>
                <span style={{ fontSize: "calc(var(--fs) * 1.000)", lineHeight: 2.0, flex: 1 }}><ClickableZh text={q.sentence || q.question || ""} isZh={isZh} /></span>
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
                      fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.6, color, fontWeight,
                      background: bg, borderRadius: 4, padding: "1px 4px" }}>
                    <span style={{ minWidth: 28 }}>({i + 1})</span>
                    <span><ClickableZh text={String(opt)} isZh={isZh} /></span>
                    {submitted && isAns && (isFirstCorrect || hasRetried) && <span style={{ color: "#16a34a", marginLeft: 4 }}>V</span>}
                    {submitted && isSel && !isAns && <span style={{ color: "#dc2626", marginLeft: 4 }}>X</span>}
                  </div>
                );
              })}

              {isFirstWrong && !hasRetried && (
                <div style={{ marginLeft: 28, marginTop: 8, marginBottom: 8,
                  background: "#fffbeb", border: "1px solid #fde68a",
                  borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                    {isZh ? "\u518D\u60F3\u60F3\uFF01\u63D0\u793A\uFF1A" : "Not quite! Hint:"}
                  </div>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#78350f", marginBottom: 10 }}>
                    {q.hints?.[0] || "Think carefully and try again!"}
                  </div>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{isZh ? "\u518D\u9009\u4E00\u6B21\uFF1A" : "Try again:"}</div>
                  {(q.options || []).map((opt, i) => {
                    if (chosen === i) return null;
                    const isSel = retryChosen === i;
                    return (
                      <div key={i} onClick={() => handleRetrySelect(q.id, i)}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
                          cursor: "pointer", fontSize: "calc(var(--fs) * 1.000)",
                          background: isSel ? "#dbeafe" : "#fff", borderRadius: 4,
                          padding: "3px 8px", border: "1px solid " + (isSel ? "#3b82f6" : "#e5e7eb") }}>
                        <span>({i + 1})</span><span>{opt}</span>
                      </div>
                    );
                  })}
                  <button onClick={() => handleRetry(q)} disabled={retryChosen === undefined}
                    style={{ marginTop: 6, padding: "6px 16px", borderRadius: 8,
                      background: retryChosen !== undefined ? "#1e3a6e" : "#94a3b8",
                      color: "#fff", border: "none", fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                      cursor: retryChosen !== undefined ? "pointer" : "not-allowed" }}>
                    {isZh ? "\u786E\u8BA4" : "Check"}
                  </button>
                </div>
              )}

              {isFirstWrong && hasRetried && (
                <div style={{ marginLeft: 28, marginTop: 6, marginBottom: 6,
                  padding: "8px 12px", borderRadius: 8,
                  background: isRetryCorrect ? "#f0fdf4" : "#fef2f2",
                  border: "1px solid " + (isRetryCorrect ? "#16a34a" : "#dc2626") }}>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                    color: isRetryCorrect ? "#16a34a" : "#dc2626" }}>
                    {isRetryCorrect ? (isZh ? "\u2713 \u518D\u6B21\u9009\u5BF9\u4E86\uFF01" : "V Correct on retry!") : (isZh ? "\u2717 \u6B63\u786E\u7B54\u6848\uFF1A" : "X Correct answer: ") + q.options[q.answer]}
                  </div>
                  {showExp && q.explanation && (<ExpContent q={q} />)}
                </div>
              )}

              {isFirstCorrect && showExp && q.explanation && (
                <div style={{ marginLeft: 28, marginTop: 6,
                  borderLeft: "3px solid #16a34a", paddingLeft: 10,
                  background: "#f0fdf4", borderRadius: "0 8px 8px 0",
                  padding: "8px 10px 8px 14px" }}>
                  <ExpContent q={q} />
                </div>
              )}

              {isFirstCorrect && !showExp && (
                <button onClick={() => setShowExplanation(e => ({...e, [q.id]: true}))}
                  style={{ marginLeft: 28, marginTop: 4, fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280",
                    background: "none", border: "1px solid #e5e7eb", borderRadius: 6,
                    padding: "2px 8px", cursor: "pointer" }}>
                  {isZh ? "\u67E5\u770B\u89E3\u6790" : "Show explanation"}
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
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700 }}>{isZh ? "\u5F97\u5206\uFF1A" : "Score: "}{score}/{items.length}</span>
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
              color: score === items.length ? "#16a34a" : score >= items.length * 0.6 ? "#d97706" : "#dc2626" }}>
              {Math.round(score / items.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8",
              color: "#fff", border: "none", fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed" }}>
            {isZh ? `\u63D0\u4EA4 \u7B2C${pageIdx + 1}/${totalPages}\u9875` : `Submit Page ${pageIdx + 1}/${totalPages}`}
            {!allAnswered && <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 400, display: "block" }}>
              {isZh ? "\u8BF7\u5148\u56DE\u7B54\u5168\u90E8 " : "Answer all "}{items.length}{isZh ? " \u9898" : " questions first"}
            </span>}
          </button>
        ) : allRetriedOrCorrect ? (
          <button onClick={handleFinishPage}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer" }}>
            {pageIdx + 1 >= totalPages ? (isZh ? "\u5B8C\u6210\u672C\u8282" : "Finish Section") : (isZh ? "\u4E0B\u4E00\u9875" : "Next Page")}
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: "12px", color: "#6b7280", fontSize: "calc(var(--fs) * 1.000)" }}>
            {isZh ? "\u8BF7\u5148\u5B8C\u6210\u4E0A\u9762\u7684\u91CD\u505A\u9898\u3002" : "Please complete the retry questions above before continuing."}
          </div>
        )}
      </div>
    </div>
  );
}


function ClozePage({ set, sectionLabel, marks, onPageDone, reviewMode, reviewResults, isZh }) {
  const cmp = (a, b) => (a || "").toString().toLowerCase() === (b || "").toString().toLowerCase();
  const blanks = set.blanks || [];
  const wordBank = set.wordBank || [];
  const _rev = reviewMode ? Object.fromEntries((reviewResults || []).map(r => [parseInt(String(r.id).split("_").pop(), 10), r.userAnswer])) : null;
  const [answers, setAnswers] = useState(_rev || {});
  const [submitted, setSubmitted] = useState(!!reviewMode);
  const [retryAnswers, setRetryAnswers] = useState({});
  const [retried, setRetried] = useState(reviewMode && _rev ? Object.fromEntries(blanks.filter(b => !cmp(_rev[b.num], b.answer)).map(b => [b.num, true])) : {});
  const [retriedCorrect, setRetriedCorrect] = useState({});
  const [showExplanation, setShowExplanation] = useState(reviewMode ? Object.fromEntries(blanks.map(b => [b.num, true])) : {});
  const startRef = useRef(Date.now());

  const hasBrackets = (set.passage || "").includes(" / ") || (set.passage || "").includes("[ ");
  const hasWordBank = wordBank.length > 0;

  function handleSelect(num, word) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [num]: word }));
  }
  function handleRetrySelect(num, word) {
    if (retried[num]) return;
    setRetryAnswers(a => ({ ...a, [num]: word }));
  }
  function handleRetry(b) {
    const chosen = retryAnswers[b.num];
    if (chosen === undefined) return;
    setRetried(r => ({ ...r, [b.num]: true }));
    setRetriedCorrect(r => ({ ...r, [b.num]: cmp(chosen, b.answer) }));
    setShowExplanation(e => ({ ...e, [b.num]: true }));
  }
  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    const auto = {};
    blanks.forEach(b => { if (cmp(answers[b.num], b.answer)) auto[b.num] = true; });
    setShowExplanation(auto);
  }
  function handleFinishPage() {
    const t = Date.now() - startRef.current;
    const results = blanks.map(b => ({
      id: set.id + "_" + b.num, topic: "GrammarCloze", sectionType: "GrammarCloze", userAnswer: answers[b.num],
      skill: b.skill, trapType: b.explain && b.explain.trapType,
      correct: cmp(answers[b.num], b.answer),
      solvedAfterHint: !cmp(answers[b.num], b.answer) && !!retriedCorrect[b.num],
      attempts: cmp(answers[b.num], b.answer) ? 1 : (retried[b.num] ? 2 : 1),
      timeTaken: Math.round(t / Math.max(blanks.length, 1)),
    }));
    onPageDone(results, true);
  }

  const allAnswered = blanks.every(b => answers[b.num] !== undefined);
  const wrongBlanks = submitted ? blanks.filter(b => !cmp(answers[b.num], b.answer)) : [];
  const allRetriedOrCorrect = submitted && wrongBlanks.every(b => retried[b.num]);
  const score = submitted ? blanks.filter(b => cmp(answers[b.num], b.answer)).length : 0;

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
      parts.push(<ClickableZh key={"zt" + match.index} text={passage.slice(last, match.index)} isZh={isZh} />);
      const chosen = answers[num];
      const isCorrect = submitted && cmp(chosen, blank.answer);
      parts.push(
        <span key={num} style={{ display: "inline-block" }}>
          <span style={{ fontSize: "calc(var(--fs) * 0.786)", fontWeight: 700, verticalAlign: "super", marginRight: 1 }}>({num})</span>
          <span style={{
            display: "inline-block", minWidth: 90, borderBottom: "1.5px solid #000",
            padding: "0 4px", textAlign: "center", fontSize: "calc(var(--fs) * 1.000)",
            color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen ? "#1d4ed8" : "transparent"),
            fontWeight: chosen ? 600 : 400,
            cursor: !submitted && chosen ? "pointer" : "default",
          }}
            onClick={() => !submitted && chosen && setAnswers(a => { const n = { ...a }; delete n[num]; return n; })}>
            {chosen || "        "}
          </span>
          {submitted && !isCorrect && retried[num] && (
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#16a34a", marginLeft: 3 }}>{blank.answer}</span>
          )}
        </span>
      );
      last = match.index + match[0].length;
    }
    parts.push(<ClickableZh key="ztend" text={passage.slice(last)} isZh={isZh} />);
    return parts;
  }

  function renderBracketPassage() {
    const passage = set.passage || "";
    const parts = [];
    let last = 0;
    const bracketRegex = /\((\d+)\)\s*\[([^\]]+)\]/g;
    let match;
    while ((match = bracketRegex.exec(passage)) !== null) {
      const num = parseInt(match[1]);
      const options = match[2].split(/\s*[\/,]\s*/).map(s => s.trim()).filter(Boolean);
      const blank = blanks.find(b => b.num === num);
      if (!blank || options.length < 2) continue;
      parts.push(<ClickableZh key={"zt" + match.index} text={passage.slice(last, match.index)} isZh={isZh} />);
      const chosen = answers[num];
      const isCorrect = submitted && cmp(chosen, blank.answer);
      parts.push(
        <span key={num} style={{ display: "inline-block", margin: "0 2px" }}>
          <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, verticalAlign: "super" }}>({num})</span>
          {" [ "}
          {options.map((opt, oi) => {
            const isAns = cmp(opt, blank.answer);
            const isSel = chosen === opt;
            let bg = "transparent", color = "#000", fw = "normal";
            if (submitted && retried[num]) {
              if (isAns) { color = "#16a34a"; fw = "700"; }
              else if (isSel && !isAns) { color = "#dc2626"; fw = "700"; }
            } else if (submitted && isSel && !isAns) { color = "#dc2626"; fw = "700"; }
            else if (!submitted && isSel) { bg = "#dbeafe"; color = "#1d4ed8"; fw = "700"; }
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
        </span>
      );
      last = match.index + match[0].length;
    }
    parts.push(<ClickableZh key="ztend" text={passage.slice(last)} isZh={isZh} />);
    return parts;
  }

  return (
    <div style={S.page}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={S.sectionHeader}>{sectionLabel} {marksLabel(marks, isZh)}</div>
        <div style={S.instructions}>
          {hasBrackets
            ? (isZh ? "\u4ED4\u7EC6\u9605\u8BFB\u77ED\u6587\uFF0C\u4ECE\u65B9\u6846\u91CC\u9009\u51FA\u6B63\u786E\u7684\u8BCD\u8BED\u586B\u5728\u6BCF\u4E2A\u7A7A\u683C\u91CC\uFF0C\u6BCF\u4E2A\u8BCD\u53EA\u7528\u4E00\u6B21\u3002" : "Read the passage carefully. Underline or tap the correct word from the words given in the brackets.")
            : (isZh ? "\u4ED4\u7EC6\u9605\u8BFB\u77ED\u6587\uFF0C\u4ECE\u65B9\u6846\u91CC\u9009\u51FA\u6B63\u786E\u7684\u8BCD\u8BED\u586B\u5728\u6BCF\u4E2A\u7A7A\u683C\u91CC\uFF0C\u6BCF\u4E2A\u8BCD\u53EA\u7528\u4E00\u6B21\u3002" : "Read the passage carefully. Choose the correct word from the words given in the box and write its letter in each blank. Use each word once only.")}
        </div>

        {hasWordBank && !hasBrackets && (
          <div style={{
            border: "1px solid #000", padding: "10px 14px", marginBottom: 14,
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6,
          }}>
            {wordBank.map((w, i) => {
              const letter = String.fromCharCode(65 + i);
              const isUsed = Object.values(answers).includes(w);
              return (
                <div key={i} style={{
                  fontSize: "calc(var(--fs) * 1.000)", cursor: "default",
                  opacity: submitted ? 1 : (isUsed ? 0.4 : 1),
                  padding: "2px 4px",
                  textDecoration: !submitted && isUsed ? "line-through" : "none",
                }}>
                  ({letter}) <ClickableZh text={w} isZh={isZh} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px 100px" }}>
        <div style={{
          border: "1px solid #ddd", borderRadius: 8, padding: "14px 16px",
          marginBottom: 16, fontSize: "calc(var(--fs) * 1.000)", fontFamily: isZh ? ZH_FONT : EXAM_BODY, lineHeight: 2.2,
        }}>
          {hasBrackets ? renderBracketPassage()
            : set.passage ? renderWordBankPassage()
              : blanks.map((b) => {
                const chosen = answers[b.num];
                const isCorrect = submitted && cmp(chosen, b.answer);
                return (
                  <div key={b.num} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 700, marginRight: 6 }}>({b.num})</span>
                    <span style={{
                      display: "inline-block", borderBottom: "1.5px solid #000",
                      minWidth: 100, textAlign: "center", padding: "0 4px",
                      color: submitted ? (isCorrect ? "#16a34a" : "#dc2626") : (chosen ? "#1d4ed8" : "transparent"),
                      fontWeight: 600,
                    }}>{chosen || "   "}</span>
                    {submitted && !isCorrect && retried[b.num] && (
                      <span style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#16a34a", marginLeft: 6 }}>{b.answer}</span>
                    )}
                  </div>
                );
              })
          }
        </div>

        {hasWordBank && !hasBrackets && !submitted && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#64748b", marginBottom: 8 }}>
              Tap a word to fill the next blank:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {wordBank.map((w, i) => {
                const letter = String.fromCharCode(65 + i);
                return (
                  <button key={i}
                    onClick={() => {
                      const nextBlank = blanks.find(b => !answers[b.num]);
                      if (nextBlank) handleSelect(nextBlank.num, w);
                    }}
                    style={{
                      padding: "6px 16px", borderRadius: 8, fontSize: "calc(var(--fs) * 1.000)",
                      border: "1.5px solid #000", background: "#fff", color: "#000",
                      cursor: "pointer", fontWeight: 600,
                    }}>
                    ({letter}) {w}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {blanks.filter(b => answers[b.num]).map(b => (
                <button key={b.num}
                  onClick={() => setAnswers(a => { const n = { ...a }; delete n[b.num]; return n; })}
                  style={{
                    padding: "3px 10px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)",
                    border: "1px solid #e2e8f0", background: "#f8fafc",
                    cursor: "pointer", color: "#64748b",
                  }}>
                  {isZh ? "\u6E05\u9664" : "Clear"} ({b.num}): {answers[b.num]}
                </button>
              ))}
            </div>
          </div>
        )}

        {submitted && blanks.map(b => {
          const chosen = answers[b.num];
          const isCorrect = cmp(chosen, b.answer);
          const hasRetried = retried[b.num];
          const isRetryCorrect = retriedCorrect[b.num];
          const showExp = showExplanation[b.num];
          const retryChosen = retryAnswers[b.num];
          return (
            <div key={b.num} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span>{isZh ? ("\u7B2C" + b.num + "\u7A7A") : ("Blank (" + b.num + ")")}</span>
                <span style={{ fontWeight: 400, color: "#475569" }}>
                  {isZh ? "\u4F60\u7684\u7B54\u6848\uFF1A" : "Your answer: "}<span style={{ fontWeight: 700, color: isCorrect ? "#16a34a" : "#dc2626" }}>{chosen || "(blank)"}</span>
                </span>
                <span style={{ color: isCorrect ? "#16a34a" : "#dc2626", fontWeight: 700 }}>{isCorrect ? "V" : "X"}</span>
              </div>

              {isCorrect && showExp && b.explanation && (
                <div style={{
                  marginTop: 4, borderLeft: "3px solid #16a34a", background: "#f0fdf4",
                  borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px",
                  fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.6,
                }}>
                  <TransLine label={isZh ? "\u7FFB\u8BD1" : "Translate"} text={b.sentence_en} /><Expl text={b.explanation} /><EnExp en={b.explanation_en} /><KeyWords list={b.keywords} />
                </div>
              )}

              {!isCorrect && !hasRetried && (
                <div style={{ marginTop: 8, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#92400e", marginBottom: 4 }}>{isZh ? "\u518D\u60F3\u60F3\uFF01\u63D0\u793A\uFF1A" : "Not quite! Hint:"}</div>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#78350f", marginBottom: 10 }}>
                    {b.hint || "Think about the word that fits the meaning and grammar."}
                  </div>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#92400e", marginBottom: 6 }}>{isZh ? "\u518D\u9009\u4E00\u6B21\uFF1A" : "Try again:"}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {wordBank.filter(w => w !== chosen).map((w, i) => {
                      const isSel = retryChosen === w;
                      return (
                        <button key={i} onClick={() => handleRetrySelect(b.num, w)}
                          style={{
                            padding: "4px 12px", borderRadius: 8, fontSize: "calc(var(--fs) * 1.000)",
                            background: isSel ? "#dbeafe" : "#fff",
                            border: "1px solid " + (isSel ? "#3b82f6" : "#e5e7eb"),
                            color: "#000", cursor: "pointer", fontWeight: 600,
                          }}>
                          {w}
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => handleRetry(b)} disabled={retryChosen === undefined}
                    style={{
                      marginTop: 8, padding: "6px 16px", borderRadius: 8,
                      background: retryChosen !== undefined ? "#1e3a6e" : "#94a3b8",
                      color: "#fff", border: "none", fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                      cursor: retryChosen !== undefined ? "pointer" : "not-allowed",
                    }}>
                    {isZh ? "\u786E\u8BA4" : "Check"}
                  </button>
                </div>
              )}

              {!isCorrect && hasRetried && (
                <div style={{
                  marginTop: 6, padding: "8px 12px", borderRadius: 8,
                  background: isRetryCorrect ? "#f0fdf4" : "#fef2f2",
                  border: "1px solid " + (isRetryCorrect ? "#16a34a" : "#dc2626"),
                }}>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: isRetryCorrect ? "#16a34a" : "#dc2626" }}>
                    {isRetryCorrect ? (isZh ? "\u2713 \u518D\u6B21\u9009\u5BF9\u4E86\uFF01" : "V Correct on retry!") : (isZh ? "\u2717 \u6B63\u786E\u7B54\u6848\uFF1A" : "X Correct answer: ") + b.answer}
                  </div>
                  {showExp && b.explanation && (
                    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.6, marginTop: 6 }}><TransLine label={isZh ? "\u7FFB\u8BD1" : "Translate"} text={b.sentence_en} /><Expl text={b.explanation} /><EnExp en={b.explanation_en} /><KeyWords list={b.keywords} /></div>
                  )}
                </div>
              )}

              <div style={{ borderTop: "1px solid #eee", marginTop: 10 }} />
            </div>
          );
        })}

        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: 10, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700 }}>{isZh ? "\u5F97\u5206\uFF1A" : "Score: "}{score}/{blanks.length}</span>
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: score === blanks.length ? "#16a34a" : "#d97706" }}>
              {blanks.length ? Math.round(score / blanks.length * 100) : 0}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8",
              color: "#fff", border: "none", fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700,
              cursor: allAnswered ? "pointer" : "not-allowed",
            }}>
            Submit
            {!allAnswered && <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 400, display: "block" }}>
              Fill in all blanks first
            </span>}
          </button>
        ) : allRetriedOrCorrect ? (
          <button onClick={handleFinishPage}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer",
            }}>
            Next Section
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: "12px", color: "#6b7280", fontSize: "calc(var(--fs) * 1.000)" }}>
            {isZh ? "\u8BF7\u5148\u5B8C\u6210\u4E0A\u9762\u7684\u91CD\u505A\u7A7A\u3002" : "Please complete the retry blanks above before continuing."}
          </div>
        )}
      </div>
    </div>
  );
}


function EditingPage({ set, sectionLabel, marks, onPageDone, reviewMode, reviewResults, isZh }) {
  const _rev = reviewMode ? Object.fromEntries((reviewResults || []).map(r => [r.id, r.userAnswer])) : null;
  const items = set.items || [];
  const [answers, setAnswers] = useState(_rev || {});
  const [retryAnswers, setRetryAnswers] = useState({});
  const [submitted, setSubmitted] = useState(!!reviewMode);
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
      id: item.id, topic: "Editing", sectionType: "Editing", userAnswer: answers[item.id],
      correct: (answers[item.id] || '').trim().toLowerCase() === (item.answer || '').toLowerCase(),
      timeTaken: Math.round(t / items.length),
    }));
    onPageDone(results, true);
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
        <div style={{ fontFamily: "'Times New Roman', serif", fontWeight: "bold", fontSize: "calc(var(--fs) * 1.071)", marginBottom: 4 }}>
          {sectionLabel} {marksLabel(marks, isZh)}
        </div>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", marginBottom: 12, lineHeight: 1.6 }}>
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
          // The correction stays hidden until the student has had one hinted retry
          // (or is simply reviewing a finished paper).
          const answerRevealed = !!hasRetried || reviewMode;
          // Before the retry: the retry hint (never names the correction).
          // After the retry: the full explanation (which does).
          const showRetryHint = isWrong && !answerRevealed;

          return (
            <div key={item.id} style={{ marginBottom: 20 }}>
              {/* Question number + sentence context */}
              <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)", minWidth: 32 }}>({qNum})</span>
                <span style={{ fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.8, flex: 1 }}>
                  {(() => {
                    const sent = item.sentence || '';
                    const w = item.wrongWord || '';
                    const at = w ? sent.indexOf(w) : -1;
                    if (at < 0) return <ClickableZh text={sent} isZh={isZh} />;
                    return (<>
                      <ClickableZh text={sent.slice(0, at)} isZh={isZh} />
                      <span style={{ fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)", background: "#fef08a", padding: "0 5px", borderRadius: 4 }}>[{w}]</span>
                      <ClickableZh text={sent.slice(at + w.length)} isZh={isZh} />
                    </>);
                  })()}
                </span>
              </div>

              {/* Input box */}
              {!submitted ? (
                <div style={{ marginLeft: 32 }}>
                  <input type="text" value={typed}
                    onChange={e => setAnswers(a => ({ ...a, [item.id]: e.target.value }))}
                    placeholder={isZh ? "\u5199\u51FA\u6B63\u786E\u7684\u5B57\u2026\u2026" : "Write correct spelling..."}
                    style={{ padding: "6px 10px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 600,
                      border: "1.5px solid " + (typed ? "#1d4ed8" : "#000"),
                      outline: "none", minWidth: 160 }} />
                </div>
              ) : (
                <div style={{ marginLeft: 32 }}>
                  {/* Row: My answer | Correct answer | Retry box */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    {/* My answer */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginBottom: 2 }}>{isZh ? "\u4F60\u7684\u7B54\u6848" : "Your answer"}</div>
                      <div style={{ padding: "5px 12px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 600,
                        border: "1.5px solid " + (isCorrect ? "#16a34a" : "#dc2626"),
                        color: isCorrect ? "#16a34a" : "#dc2626",
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        minWidth: 100, textAlign: "center" }}>
                        {typed || "(blank)"} {isCorrect ? "V" : "X"}
                      </div>
                    </div>

                    {/* Correct answer - held back until the student has retried.
                        Showing it before the retry makes the retry meaningless. */}
                    {isWrong && (
                      <>
                        {answerRevealed && (
                          <>
                            <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#94a3b8" }}>vs</div>
                            <div style={{ textAlign: "center" }}>
                              <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginBottom: 2 }}>Correct answer</div>
                              <div style={{ padding: "5px 12px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                                border: "1.5px solid #16a34a", color: "#16a34a",
                                background: "#f0fdf4", minWidth: 100, textAlign: "center" }}>
                                {item.answer}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Retry input */}
                        {!reviewMode && !hasRetried && (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginBottom: 2 }}>Write it correctly:</div>
                            <div style={{ display: "flex", gap: 4 }}>
                              <input type="text" value={retryTyped}
                                onChange={e => setRetryAnswers(a => ({ ...a, [item.id]: e.target.value }))}
                                placeholder={"_ ".repeat((item.answer || '').length).trim()}
                                style={{ padding: "5px 10px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 600,
                                  border: "1.5px solid #1d4ed8", outline: "none", minWidth: 120 }} />
                              <button onClick={() => handleRetry(item)}
                                disabled={!retryTyped}
                                style={{ padding: "5px 10px", borderRadius: 6,
                                  background: retryTyped ? "#1e3a6e" : "#94a3b8",
                                  color: "#fff", border: "none", fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                                  cursor: retryTyped ? "pointer" : "not-allowed" }}>
                                OK
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Retry result */}
                        {hasRetried && (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginBottom: 2 }}>Your retry</div>
                            <div style={{ padding: "5px 12px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
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

                  {/* Retry hint - shown INSTEAD of the answer, before the retry */}
                  {showRetryHint && (
                    <div style={{ marginTop: 8,
                      borderLeft: "3px solid #f59e0b",
                      paddingLeft: 10, background: "#fffbeb",
                      borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px" }}>
                      <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#92400e", fontWeight: 700, marginBottom: 2 }}>
                        Not quite! Hint:
                      </div>
                      <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.6 }}>
                        {item.hints?.[0] || "Look at the underlined word. What is wrong with it - the tense, the spelling, or the word itself?"}
                      </div>
                    </div>
                  )}

                  {/* Explanation - only once the answer is on screen */}
                  {!showRetryHint && (item.explanation || item.solution?.tip) && (
                    <div style={{ marginTop: 8,
                      borderLeft: "3px solid " + (isCorrect ? "#16a34a" : "#f59e0b"),
                      paddingLeft: 10, background: isCorrect ? "#f0fdf4" : "#fffbeb",
                      borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px" }}>
                      <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.6 }}>
                        {item.explanation || item.solution?.tip}
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
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700 }}>{isZh ? "\u5F97\u5206\uFF1A" : "Score: "}{score}/{items.length}</span>
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
              color: score === items.length ? "#16a34a" : "#d97706" }}>
              {Math.round(score / items.length * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer" }}>
            Submit
          </button>
        ) : (allRetriedWrong || reviewMode) ? (
          <button onClick={handleFinish}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer" }}>
            Next Section
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: "12px", color: "#6b7280", fontSize: "calc(var(--fs) * 1.000)" }}>
            Please write the correct spelling for each wrong answer before continuing.
          </div>
        )}
      </div>
    </div>
  );
}


function CompPage({ set, sectionLabel, marks, onPageDone, reviewMode, reviewResults, isZh }) {
  const questions = set.questions || [];
  const passage   = set.passage   || '';

  const _rev = reviewMode ? (function () { const m = {}; (reviewResults || []).forEach(function (r) { m[r.id] = r.userAnswer; if (Array.isArray(r.userAnswerSeq)) r.userAnswerSeq.forEach(function (v, i) { m[r.id + '_seq_' + i] = v; }); if (r.userAnswerReason !== undefined) m[r.id + '_reason'] = r.userAnswerReason; }); return m; })() : null;
  const [answers,   setAnswers]   = useState(_rev || {});
  const [submitted, setSubmitted] = useState(!!reviewMode);
  const [activeQ,   setActiveQ]   = useState(null);
  const startRef = useRef(Date.now());

  // Exam typography tokens -- no emojis, no bright colors
  const EX = {
    border: '1.5px solid #1a1a1a',
    thin:   '1px solid #1a1a1a',
    font:   isZh ? ZH_FONT : EXAM_FONT,
    sans:   isZh ? ZH_FONT : EXAM_FONT,
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
        fontFamily: EX.sans, fontSize: "calc(var(--fs) * 0.786)", fontWeight: 800,
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
      skill:       q.skill,
      trapType:    q.explain && q.explain.trapType,
      scored:      isAutoGraded(q),
      correct:     gradeQuestion(q),
      userAnswer:  answers[q.id],
      userAnswerSeq: getFormat(q) === 'sequence' ? (q.sequenceItems || q.items || []).map(function (_, i) { return answers[q.id + '_seq_' + i]; }) : undefined,
      userAnswerReason: getFormat(q) === 'tf_reason' ? answers[q.id + '_reason'] : undefined,
      timeTaken:   Math.round(t / Math.max(questions.length, 1)),
    }));
    onPageDone(results, true);
  }

  // -------------------------------------------------
  // Passage with post-submit highlights
  // -------------------------------------------------
  function renderPassageText(aq) {
    if (!passage) return null;
    const qn = aq ? (aq.questionNo || (questions.findIndex(x => x.id === aq.id) + 1)) : null;
    const evidence = aq?.solution?.evidence || null;
    const trap     = aq?.solution?.trap     || null;
    if (!evidence && !trap) {
      return <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}><ClickableZh text={passage} isZh={isZh} /></span>;
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
            return <span key={i}><ClickableZh text={seg.text} isZh={isZh} /></span>;
          if (seg.type === 'evidence')
            return <span key={i} style={{ background: '#EDE9FE', color: '#6D28D9', fontWeight: 700, borderRadius: 3, padding: '0 3px' }}>{qn ? <sup style={{ background: '#6D28D9', color: '#fff', borderRadius: 8, padding: '0 5px', fontSize: "calc(var(--fs) * 0.780)", marginRight: 3, fontFamily: EX.sans }}>{qn}</sup> : null}{seg.text}</span>;
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
                padding: '2px 6px', fontSize: "calc(var(--fs) * 1.000)", fontFamily: EX.font,
                outline: 'none', background: 'transparent' }} />
          ) : (
            <div>
              <span style={{ fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)",
                background: ok ? '#DCFCE7' : '#FEE2E2',
                padding: '2px 8px', borderRadius: 4,
                borderBottom: `2px solid ${ok ? '#16A34A' : '#DC2626'}` }}>
                {val || '(blank)'}
              </span>
              {verdictBadge(ok)}
              {bad && q.answer && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                    color: '#16A34A', marginRight: 6 }}>Answer:</span>
                  <span style={{ fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
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
                padding: '8px 12px', fontSize: "calc(var(--fs) * 1.000)", fontFamily: EX.font, outline: 'none' }} />
          ) : (
            <div>
              <div style={{ display: 'inline-block', padding: '5px 12px',
                fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", maxWidth: 280, borderRadius: 6,
                background: ok ? '#DCFCE7' : '#FEE2E2',
                border: `1.5px solid ${ok ? '#16A34A' : '#DC2626'}`,
                color: ok ? '#14532D' : '#7F1D1D', fontWeight: 700 }}>
                {val || '(blank)'}
              </div>
              {verdictBadge(ok)}
              {bad && q.answer && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                    color: '#16A34A', marginRight: 6 }}>Answer:</span>
                  <span style={{ fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
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
                      fontFamily: EX.sans, fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)",
                      cursor: submitted ? 'default' : 'pointer' }}>
                      ({i + 1})
                    </td>
                    <td style={{ border: EX.thin, padding: '7px 14px', fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)",
                      cursor: submitted ? 'default' : 'pointer' }}>
                      <ClickableZh text={opt} isZh={isZh} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", marginTop: 6 }}>
            Answer:{' '}
            <span style={{ display: 'inline-block', minWidth: 42, border: EX.thin,
              padding: '2px 10px', textAlign: 'center', fontWeight: 700 }}>
              {chosen !== undefined ? '(' + (chosen + 1) + ')' : '(  )'}
            </span>
          </div>
          {submitted && (
            <div style={{ marginTop: 6 }}>
              {verdictBadge(chosen === corr)}
              {chosen !== corr && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: '#16A34A', marginRight: 6 }}>Correct answer:</span>
                  <span style={{ fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, background: '#DCFCE7', padding: '3px 10px', borderRadius: 4, border: '1px solid #16A34A', color: '#14532D' }}>
                    ({corr + 1}) {opts[corr]}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- AB_CIRCLE ---------------------------------
    if (f === 'ab_circle') {
      const sentence = q.abSentence || q.stem || '';
      const choices  = q.abChoices  || {};
      const chosen   = val;
      const matchArr = [...sentence.matchAll(/\(([AB])\)\s*(\S+)/g)];
      const abOk = submitted && norm(chosen) === norm(q.answer);
      const abAnswerWord = (choices[q.answer] != null ? choices[q.answer] : ((matchArr.find(m => m[1] === q.answer) || [])[2] || ''));
      const abVerdict = submitted ? (
        <div style={{ marginTop: 8 }}>
          {verdictBadge(abOk)}
          {!abOk && (
            <div style={{ marginTop: 4 }}>
              <span style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: '#16A34A', marginRight: 6 }}>Correct answer:</span>
              <span style={{ fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, background: '#DCFCE7', padding: '3px 10px', borderRadius: 4, border: '1px solid #16A34A', color: '#14532D' }}>
                ({q.answer}){abAnswerWord ? ' ' + abAnswerWord : ''}
              </span>
            </div>
          )}
        </div>
      ) : null;

      if (!matchArr.length) {
        // Fallback: show plain A / B buttons from abChoices
        return (
          <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px', fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)" }}>
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
            {abVerdict}
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
          fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.9, fontFamily: EX.font }}>
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
                <span style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                  verticalAlign: 'super', color: EX.muted }}>({lab})</span>
              </span>
            );
          })}
          {abVerdict}
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
                  fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, padding: '7px 6px', width: 54 }}></th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, padding: '7px 6px', textAlign: 'left' }}>Statement</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>True</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>False</th>
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
                        cursor: submitted ? 'default' : 'pointer', background: bg, fontSize: "calc(var(--fs) * 1.000)" }}>
                      {chosen === t ? '\u2713' : (submitted && t === corr ? '\u2713' : '')}
                    </td>
                  );
                }
                return (
                  <tr key={si}>
                    <td style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                      fontWeight: 700, fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)" }}>({lab})</td>
                    <td style={{ border: EX.thin, padding: '9px 11px', fontSize: "calc(var(--fs) * 1.000)", verticalAlign: 'top' }}>
                      {stmt}
                    </td>
                    {tfCell('True')}
                    {tfCell('False')}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {submitted && (
            <div style={{ marginTop: 8 }}>
              {verdictBadge(correct.every((a, i) => norm((val || [])[i]) === norm(a)))}
            </div>
          )}
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
                              fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)",
                              cursor: submitted ? 'default' : 'pointer' }}>
                            {n}
                          </button>
                        ))}
                      </span>
                    </td>
                    <td style={{ border: EX.thin, padding: '10px 12px', fontSize: "calc(var(--fs) * 1.000)" }}>
                      {item}
                      {submitted && !ok && (
                        <span style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", color: '#9b1c1c', marginLeft: 8 }}>
                          (should be {corr})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {submitted && (
            <div style={{ marginTop: 8 }}>
              {verdictBadge(items.every((_, i) => parseInt(answers[q.id + '_seq_' + i] || '0', 10) === correct[i]))}
            </div>
          )}
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
                    color: EX.ink, fontFamily: EX.sans, fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)",
                    cursor: submitted ? 'default' : 'pointer' }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div style={{ marginBottom: 2 }}>
              {verdictBadge(norm(tfVal) === norm(correct))}
              {norm(tfVal) !== norm(correct) && (
                <span style={{ marginLeft: 8, fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: '#16A34A' }}>
                  Correct answer: {correct}
                </span>
              )}
            </div>
          )}
          {!submitted ? (
            <textarea value={reason} rows={3}
              onChange={e => setAnswers(a => ({ ...a, [q.id + '_reason']: e.target.value }))}
              placeholder={isZh ? "\u5199\u51FA\u4F60\u7684\u7406\u7531\u2026\u2026" : "Give a reason for your answer..."}
              style={{ width: '100%', padding: '8px 12px', border: EX.border,
                fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", outline: 'none',
                resize: 'vertical', boxSizing: 'border-box' }} />
          ) : (
            <div>
              <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                Your reason
              </div>
              <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", minHeight: 40 }}>
                {reason || '(no reason given)'}
              </div>
              {modelAns && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                    {isZh ? "\u53C2\u8003\u7B54\u6848" : "Model answer"}
                  </div>
                  <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)" }}>
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
            placeholder={isZh ? "\u7528\u5B8C\u6574\u7684\u53E5\u5B50\u5199\u51FA\u7B54\u6848\u2026\u2026" : "Write your answer in a complete sentence..."}
            style={{ width: '100%', padding: '8px 12px', border: EX.border,
              fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", outline: 'none',
              resize: 'vertical', boxSizing: 'border-box' }} />
        ) : (
          <div>
            <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
              {isZh ? "\u4F60\u7684\u7B54\u6848" : "Your answer"}
            </div>
            <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font,
              fontSize: "calc(var(--fs) * 1.000)", minHeight: 40, whiteSpace: 'pre-line' }}>
              {openVal || '(no answer given)'}
            </div>
            {modelAns && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                  {isZh ? "\u53C2\u8003\u7B54\u6848" : "Model answer"}
                </div>
                <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)" }}>
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
  // Translations + detailed explanation + key words (post-submit, per question).
  function renderLearnBox(q) {
    if (!submitted) return null;
    if (!q.stem_en && !q.answer_en && !q.explanation && !(q.keywords && q.keywords.length)) return null;
    return (
      <div style={{ marginTop: 10 }}>
        {(q.stem_en || q.answer_en) ? (
          <div style={{ marginBottom: 6 }}>
            {q.stem_en ? (
              <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: '#2563eb', lineHeight: 1.5, marginBottom: 3 }}>
                <span style={{ fontWeight: 700 }}>Translate (question): </span>{q.stem_en}
              </div>
            ) : null}
            {q.answer_en ? (
              <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: '#2563eb', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700 }}>Translate (answer): </span>{q.answer_en}
              </div>
            ) : null}
          </div>
        ) : null}
        {q.explanation ? (
          <div style={{ borderLeft: '3px solid #2563EB', background: '#eff6ff',
            borderRadius: '0 8px 8px 0', padding: '8px 10px 8px 14px' }}>
            <div><Expl text={q.explanation} /><EnExp en={q.explanation_en} /></div>
          </div>
        ) : null}
        <KeyWords list={q.keywords} />
      </div>
    );
  }

  function renderEvidenceBox(q) {
    if (!submitted) return null;
    const sol = q.solution || {};
    const tip            = sol.tip            || '';
    const evidence       = sol.evidence       || '';
    const trap           = sol.trap           || '';
    const trapExplanation= sol.trapExplanation|| '';
    const answerFormat   = sol.answerFormat   || '';
    const steps          = sol.steps          || [];
    const fmt    = getFormat(q);
    const wrong  = fmt !== 'open_sentence' && !gradeQuestion(q);
    if (!evidence && !trap && !(tip && wrong)) return null;

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
            fontSize: "calc(var(--fs) * 1.000)",
            marginBottom: 8,
            cursor: clickable ? 'pointer' : 'default',
            fontFamily: EX.font,
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: EX.sans, fontWeight: 800, fontSize: "calc(var(--fs) * 1.000)",
            textTransform: 'uppercase', letterSpacing: '.5px',
            color: accent, marginBottom: 5 }}>
            <span aria-hidden="true" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 16, height: 16, borderRadius: '50%',
              background: accent, color: '#fff', fontSize: "calc(var(--fs) * 0.780)", fontWeight: 900,
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
              <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", color: '#7C3AED', fontWeight: 600 }}>
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

        {/* TIP -- blue, soft (only shown when the answer is wrong) */}
        {tip && wrong && callout({
          label: 'Tip', icon: 'i', accent: '#2563EB',
          bg: '#EFF6FF',
          content: <div style={{ color: '#1E3A5F' }}>{tip}</div>,
        })}

        {/* TIP end */}

        {/* STEPS removed */}
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
    <div style={{ fontFamily: EX.font, fontSize: "calc(var(--fs) * 1.000)", lineHeight: 2.05, color: EX.ink }}>
      <div style={{ fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, borderBottom: '1px solid #ccc', paddingBottom: 8, marginBottom: 14, color: '#333' }}>
        {isZh ? "\u9605\u8BFB\u77ED\u6587" : "Read the Passage"}
      </div>
      {renderPassageText(activeQuestion)}
      {submitted && activeQuestion && (
        <div style={{ marginTop: 14, fontFamily: EX.sans, fontSize: "calc(var(--fs) * 1.000)", color: EX.faint,
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
        <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: EX.muted }}>
          {sectionLabel} {marksLabel(marks, isZh)}
        </span>
        {submitted && (
          <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 800,
            color: autoGradedScore === autoGradedTotal ? '#1a6b2e' : '#9b1c1c' }}>
            {isZh ? "\u7B54\u5BF9 " + autoGradedScore + "/" + autoGradedTotal
                  : autoGradedScore + "/" + autoGradedTotal + " correct"}
            {openTotal > 0 && (isZh ? " + " + openTotal + " \u9898\u95EE\u7B54" : ' + ' + openTotal + ' open')}
          </span>
        )}
      </div>

      {questions.map((q, qi) => {
        const f        = getFormat(q);
        const isActive = activeQ === q.id && submitted;
        const tagLabel = isZh ? (ZH_TAG[f] || f) : f.replace(/_/g, ' ').toUpperCase();
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
              <span style={{ fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)" }}>{q.questionNo || qi + 1}.</span>
              {q.marks && <span style={{ fontSize: "calc(var(--fs) * 0.786)", color: EX.faint }}>[{q.marks}m]</span>}
              <span style={{ marginLeft: 'auto', fontSize: "calc(var(--fs) * 0.780)", fontWeight: 700,
                letterSpacing: '.5px', textTransform: 'uppercase', color: EX.muted,
                border: '1px solid #aaa', padding: '2px 7px' }}>
                {tagLabel}
              </span>
            </div>

            {/* Stem */}
            <div style={{ fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.55, whiteSpace: 'pre-line',
              fontFamily: EX.font }}>
              <ClickableZh text={q.stem || q.question || ''} isZh={isZh} />
            </div>

            {/* Format-specific input */}
            {renderInput(q)}

            {/* Translations + explanation + key words (post-submit) */}
            {renderLearnBox(q)}

            {/* Evidence / trap boxes (post-submit) */}
            {renderEvidenceBox(q)}
          </div>
        );
      })}

      {/* Submit / Next Section */}
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!allAnswered}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: allAnswered ? EX.ink : '#bbb',
            color: '#fff', border: 'none', fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
            cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
          {allAnswered ? (isZh ? "\u63D0\u4EA4\u7B54\u6848" : 'Submit Answers') : (isZh ? "\u56DE\u7B54\u5168\u90E8\u9898\u76EE\u540E\u63D0\u4EA4" : 'Answer all questions to submit')}
        </button>
      ) : (
        <button onClick={handleFinish}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: EX.ink, color: '#fff', border: 'none',
            fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, cursor: 'pointer' }}>
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
        leftLabel={isZh ? "\u9605\u8BFB\u77ED\u6587" : "Read the Passage"}
        rightLabel={isZh ? "\u9898\u76EE" : "Questions"}
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
  const _scored = results.filter(r => r.scored !== false);
  const total = _scored.length;
  const correct = _scored.filter(r => r.correct).length;
  const pct = total ? Math.round(correct / total * 100) : 0;
  const bySection = {};
  results.forEach(r => {
    if (r.scored === false) return;
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
        <div style={{ fontSize: "calc(var(--fs) * 1.143)", opacity: 0.85, marginTop: 4 }}>
          {correct}/{total} correct . {fmtTime(duration)}
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Section breakdown */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: "calc(var(--fs) * 1.000)", marginBottom: 12, fontFamily: EXAM_BODY }}>
            Section Breakdown
          </div>
          {Object.entries(bySection).map(([type, data]) => {
            const p = Math.round(data.correct / data.total * 100);
            const meta = SECTIONS[type];
            return (
              <div key={type} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, fontFamily: EXAM_BODY }}>
                    {meta?.label || type}
                  </span>
                  <span style={{
                    fontSize: "calc(var(--fs) * 1.000)", fontWeight: 800, fontFamily: EXAM_BODY,
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
            borderRadius: 12, padding: "15px 0", fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700,
            cursor: "pointer", fontFamily: EXAM_BODY, marginBottom: 10,
          }}>
           Back to Home
        </button>
        <button onClick={onRetry}
          style={{
            width: "100%", background: "none", color: "#1e3a6e",
            border: "2px solid #1e3a6e", borderRadius: 12, padding: "13px 0",
            fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer", fontFamily: EXAM_BODY,
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
function SynthesisPage({ items, sectionLabel, marks, onPageDone, reviewMode, reviewResults, isZh }) {
  const F = isZh ? ZH_FONT : EXAM_FONT;
  const _rev = reviewMode ? Object.fromEntries((reviewResults || []).map(r => [r.id, r.userAnswer])) : null;
  const qs = items || [];
  const [answers, setAnswers] = useState(_rev || {});
  const [submitted, setSubmitted] = useState(!!reviewMode);
  const [built, setBuilt] = useState({});
  const [checked, setChecked] = useState({});
  const startRef = useRef(Date.now());
  const L = (zh, en) => (isZh ? zh : en);

  const shuffles = React.useMemo(() => {
    const o = {};
    for (const q of qs) {
      const n = Array.isArray(q.tiles) ? q.tiles.length : 0;
      const idx = Array.from({ length: n }, (_, i) => i);
      for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
      o[q.id] = idx;
    }
    return o;
  }, []);

  function norm(s) { return String(s || "").replace(/[\s\u3000,.!?;:()"'\uFF0C\u3002\uFF01\uFF1F\u3001\uFF1B\uFF1A\u201C\u201D\u2018\u2019\uFF08\uFF09]/g, ""); }
  function handleSubmit() { if (!submitted) setSubmitted(true); }
  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = qs.map(q => ({
      id: q.id, topic: "Synthesis", sectionType: "Synthesis", scored: false,
      skill: q.skill, trapType: q.explain && q.explain.trapType,
      userAnswer: answers[q.id], correct: false,
      timeTaken: Math.round(t / Math.max(qs.length, 1)),
    }));
    onPageDone(results, true);
  }

  function Translations({ q }) {
    if (!q.question_en && !q.answer_en) return null;
    return (
      <div style={{ marginTop: 4, marginBottom: 6 }}>
        {q.question_en && (
          <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#2563eb", lineHeight: 1.5, marginBottom: 3 }}>
            <span style={{ fontWeight: 700 }}>Translate (question): </span>{q.question_en}
          </div>
        )}
        {q.answer_en && (
          <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#2563eb", lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700 }}>Translate (answer): </span>{q.answer_en}
          </div>
        )}
      </div>
    );
  }
  function ModelBox({ q }) {
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginBottom: 2 }}>{L("\u53C2\u8003\u7B54\u6848", "Model answer")}</div>
        <div style={{ padding: "7px 12px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
          border: "1.5px solid #16a34a", color: "#166534", background: "#f0fdf4", lineHeight: 1.6 }}>{q.answer}</div>
        {q.answerSimple ? (
          <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginTop: 4 }}>{L("\u4E5F\u53EF\u4EE5\uFF1A", "Also acceptable: ")}{q.answerSimple}</div>
        ) : null}
      </div>
    );
  }
  function ExplBox({ q }) {
    return (
      <>
        <Translations q={q} />
        {q.explanation ? (
          <div style={{ marginTop: 6, borderLeft: "3px solid #2563EB",
            background: "#eff6ff", borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px" }}>
            <div><Expl text={q.explanation} /><EnExp en={q.explanation_en} /></div>
          </div>
        ) : null}
        {q.hint ? (
          <div style={{ marginTop: 6, borderLeft: "3px solid #D97706",
            background: "#fffbeb", borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px" }}>
            <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#92400e", marginBottom: 2 }}>{L("\u8981\u907F\u5F00\u7684\u9677\u9631", "Trap to avoid")}</div>
            <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.6 }}>{q.hint}</div>
          </div>
        ) : null}
      </>
    );
  }

  const tileBtn = { fontFamily: F, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, padding: "5px 12px",
    borderRadius: 8, border: "1.5px solid #94a3b8", background: "#fff", color: "#0f172a", cursor: "pointer" };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: F }}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ fontFamily: F, fontWeight: "bold", fontSize: "calc(var(--fs) * 1.071)", marginBottom: 4 }}>
          {sectionLabel} {marksLabel(marks, isZh)}
        </div>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", marginBottom: 12, lineHeight: 1.6 }}>
          {L("\u6309\u8981\u6C42\u628A\u53E5\u5B50\u6539\u5199\u6216\u5408\u5E76\uFF0C\u610F\u601D\u4FDD\u6301\u4E0D\u53D8\u3002", "Rewrite or combine each item as instructed, keeping the meaning the same.")}
        </div>
      </div>

      <div style={{ padding: "0 20px 120px" }}>
        {qs.map((q, idx) => {
          const qNum = idx + 1;
          const typed = answers[q.id] || "";
          const firstCorrect = submitted && (norm(typed) === norm(q.answer) || (q.answerSimple && norm(typed) === norm(q.answerSimple)));
          const hasTiles = Array.isArray(q.tiles) && q.tiles.length > 0;
          const b = built[q.id] || [];
          const isChecked = !!checked[q.id];
          const builtStr = b.map(i => q.tiles[i]).join("");
          const tileCorrect = hasTiles && b.length === q.tiles.length && builtStr === q.answer;
          return (
            <div key={q.id} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)", minWidth: 32 }}>({qNum})</span>
                <span style={{ fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.7, flex: 1, fontWeight: 600 }}>{q.instruction}</span>
              </div>
              <div style={{ marginLeft: 32, marginBottom: 10 }}>
                <div style={{ fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.8 }}><ClickableZh text={q.sentenceA} isZh={isZh} /></div>
                {q.sentenceB ? <div style={{ fontSize: "calc(var(--fs) * 1.000)", lineHeight: 1.8 }}><ClickableZh text={q.sentenceB} isZh={isZh} /></div> : null}
                {q.starter ? (
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginTop: 4 }}>
                    {L("\u5F00\u5934\uFF1A", "Begin: ")}<span style={{ fontWeight: 700 }}>{q.starter}</span>
                  </div>
                ) : null}
              </div>

              {!submitted ? (
                <div style={{ marginLeft: 32 }}>
                  <textarea value={typed}
                    onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                    placeholder={L("\u5728\u8FD9\u91CC\u5199\u4E0B\u4F60\u7684\u53E5\u5B50\u2026\u2026", "Write your sentence here...")}
                    rows={2}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)",
                      fontFamily: F, lineHeight: 1.6, border: "1.5px solid " + (typed ? "#1d4ed8" : "#000"),
                      outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
              ) : (
                <div style={{ marginLeft: 32 }}>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#6b7280", marginBottom: 2 }}>{L("\u4F60\u7684\u7B54\u6848", "Your answer")}</div>
                    <div style={{ padding: "7px 12px", borderRadius: 6, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 600,
                      border: "1.5px solid " + (firstCorrect ? "#16a34a" : "#cbd5e1"),
                      background: firstCorrect ? "#f0fdf4" : "#f8fafc", lineHeight: 1.6 }}>
                      {typed.trim() ? typed : "(blank)"}
                    </div>
                  </div>

                  {firstCorrect ? (
                    <>
                      <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#16a34a", marginBottom: 6 }}>{L("\u2713 \u56DE\u7B54\u6B63\u786E\uFF01", "V Correct!")}</div>
                      <ModelBox q={q} />
                      <ExplBox q={q} />
                    </>
                  ) : hasTiles && !isChecked ? (
                    <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: "#92400e", marginBottom: 8 }}>{L("\u518D\u8BD5\u4E00\u6B21\uFF1A\u70B9\u51FB\u4E0B\u9762\u7684\u8BCD\u8BED\uFF0C\u628A\u5B83\u4EEC\u6392\u6210\u6B63\u786E\u7684\u53E5\u5B50\u3002", "Try again: tap the words below to arrange them into the correct sentence.")}</div>
                      <div style={{ minHeight: 34, border: "1px dashed #cbd5e1", borderRadius: 6, background: "#fff",
                        padding: "6px 10px", marginBottom: 8, fontSize: "calc(var(--fs) * 1.071)", lineHeight: 1.9, fontFamily: F }}>
                        {b.length ? builtStr : <span style={{ color: "#9ca3af" }}>{L("\u70B9\u51FB\u8BCD\u8BED\u2026\u2026", "Tap words...")}</span>}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                        {shuffles[q.id].filter(i => !b.includes(i)).map(i => (
                          <button key={i} onClick={() => setBuilt(m => ({ ...m, [q.id]: [...(m[q.id] || []), i] }))} style={tileBtn}>{q.tiles[i]}</button>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setBuilt(m => ({ ...m, [q.id]: [] }))}
                          style={{ padding: "5px 14px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#fff", color: "#475569", fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, cursor: "pointer" }}>{L("\u6E05\u7A7A", "Clear")}</button>
                        <button disabled={b.length !== q.tiles.length} onClick={() => setChecked(m => ({ ...m, [q.id]: true }))}
                          style={{ padding: "5px 16px", borderRadius: 8, border: "none",
                            background: b.length === q.tiles.length ? "#1e3a6e" : "#94a3b8", color: "#fff",
                            fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, cursor: b.length === q.tiles.length ? "pointer" : "not-allowed" }}>{L("\u786E\u8BA4", "Check")}</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {hasTiles ? (
                        <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, marginBottom: 6, color: tileCorrect ? "#16a34a" : "#dc2626" }}>
                          {tileCorrect ? L("\u2713 \u6392\u5BF9\u4E86\uFF01", "V You built it correctly!") : L("\u2717 \u8FD8\u4E0D\u5BF9\uFF0C\u770B\u770B\u4E0B\u9762\u7684\u89E3\u91CA\u3002", "X Not quite - see the explanation below.")}
                        </div>
                      ) : null}
                      <ModelBox q={q} />
                      <ExplBox q={q} />
                    </>
                  )}
                </div>
              )}
              {idx < qs.length - 1 ? <div style={{ borderTop: "1px solid #e5e7eb", margin: "16px 0" }} /> : null}
            </div>
          );
        })}

        {!submitted ? (
          <button onClick={handleSubmit}
            style={{ width: "100%", padding: "14px", borderRadius: 10, background: "#1e3a6e", color: "#fff",
              border: "none", fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer", fontFamily: F }}>{L("\u63D0\u4EA4", "Submit")}</button>
        ) : (
          <button onClick={handleFinish}
            style={{ width: "100%", padding: "14px", borderRadius: 10, background: "#1e3a6e", color: "#fff",
              border: "none", fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer", fontFamily: F }}>{L("\u4E0B\u4E00\u8282", "Next Section")}</button>
        )}
      </div>
    </div>
  );
}
// 
//  MATCH PAGE - VocabMatch (word collocation): pick the pool number for
//  each stem; each pool entry may be used once. New renderer for Chinese WA1.
//  set = { id, instruction, pool[6], items[{ num, stem, answer(poolIdx),
//          explain, explanation }] }
// 
function MatchPage({ set, sectionLabel, marks, onPageDone, reviewMode, reviewResults, isZh }) {
  const F = isZh ? ZH_FONT : EXAM_BODY;
  const pool = set.pool || [];
  const items = set.items || [];
  const _rev = reviewMode
    ? Object.fromEntries((reviewResults || []).map(r => [parseInt(String(r.id).split("_").pop(), 10), r.userAnswer]))
    : null;
  const [answers, setAnswers] = useState(_rev || {}); // { num: poolIdx }
  const [submitted, setSubmitted] = useState(!!reviewMode);
  const startRef = useRef(Date.now());

  function assign(num, poolIdx) {
    if (submitted) return;
    setAnswers(a => {
      const next = { ...a };
      Object.keys(next).forEach(k => { if (next[k] === poolIdx) delete next[k]; });
      if (next[num] === poolIdx) delete next[num];
      else next[num] = poolIdx;
      return next;
    });
  }

  function handleSubmit() { if (!submitted) setSubmitted(true); }

  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = items.map(it => ({
      id: set.id + "_" + it.num, topic: "VocabMatch", sectionType: "VocabMatch",
      skill: it.skill, trapType: it.explain && it.explain.trapType,
      userAnswer: answers[it.num],
      correct: answers[it.num] === it.answer,
      attempts: 1,
      timeTaken: Math.round(t / Math.max(items.length, 1)),
    }));
    onPageDone(results, true);
  }

  const allAnswered = items.every(it => answers[it.num] !== undefined);
  const score = submitted ? items.filter(it => answers[it.num] === it.answer).length : 0;
  const usedBy = {};
  items.forEach(it => { const a = answers[it.num]; if (a !== undefined && a !== null) usedBy[a] = it.num; });

  function renderStem(stem, chosenIdx) {
    const str = String(stem || "");
    const segs = str.split(/_{3,}|\uFF08\u3000?\uFF09/);
    const out = [];
    segs.forEach((part, i) => {
      if (i > 0) {
        out.push(
          <span key={"b" + i} style={{
            display: "inline-block", minWidth: 40, borderBottom: "1.5px solid #000",
            textAlign: "center", margin: "0 4px", fontWeight: 700, color: "#1d4ed8",
          }}>{chosenIdx !== undefined && chosenIdx !== null ? "(" + (chosenIdx + 1) + ")" : "\u00A0\u00A0"}</span>
        );
      }
      out.push(<span key={"t" + i}><ClickableZh text={part} isZh={isZh} /></span>);
    });
    return out;
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: F }}>
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ fontFamily: F, fontWeight: "bold", fontSize: "calc(var(--fs) * 1.071)", marginBottom: 4 }}>
          {sectionLabel} {marksLabel(marks, isZh)}
        </div>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", marginBottom: 12, lineHeight: 1.6 }}>{set.instruction || ""}</div>
      </div>

      <div style={{ padding: "0 20px 120px" }}>
        {/* pool box */}
        <div style={{
          border: "1px solid #000", padding: "10px 14px", marginBottom: 16,
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, fontSize: "calc(var(--fs) * 1.000)",
        }}>
          {pool.map((w, i) => {
            const used = usedBy[i] !== undefined;
            return (
              <div key={i} style={{
                padding: "2px 4px",
                opacity: submitted ? 1 : (used ? 0.4 : 1),
                textDecoration: !submitted && used ? "line-through" : "none",
              }}>({i + 1}) <ClickableZh text={w} isZh={isZh} /></div>
            );
          })}
        </div>

        {items.map((it, idx) => {
          const chosen = answers[it.num];
          const isCorrect = submitted && chosen === it.answer;
          const isWrong = submitted && chosen !== it.answer;
          return (
            <div key={it.num} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)", minWidth: 24 }}>{it.num}.</span>
                <span style={{ fontSize: "calc(var(--fs) * 1.071)", lineHeight: 1.9, flex: 1 }}>{renderStem(it.stem, chosen)}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginLeft: 28 }}>
                {pool.map((w, i) => {
                  const usedElsewhere = usedBy[i] !== undefined && usedBy[i] !== it.num;
                  const isSel = chosen === i;
                  const isAns = i === it.answer;
                  let bg = "#fff", border = "#cbd5e1", color = "#000";
                  if (submitted) {
                    if (isAns) { bg = "#f0fdf4"; border = "#16a34a"; color = "#166534"; }
                    else if (isSel) { bg = "#fef2f2"; border = "#dc2626"; color = "#dc2626"; }
                  } else if (isSel) { bg = "#dbeafe"; border = "#3b82f6"; color = "#1d4ed8"; }
                  return (
                    <button key={i} disabled={submitted || usedElsewhere}
                      onClick={() => assign(it.num, i)}
                      style={{
                        fontFamily: F, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, padding: "4px 10px",
                        borderRadius: 8, border: "1.5px solid " + border, background: bg, color,
                        cursor: (submitted || usedElsewhere) ? "default" : "pointer",
                        opacity: usedElsewhere && !submitted ? 0.35 : 1,
                      }}>({i + 1}) {w}</button>
                  );
                })}
              </div>
              {submitted && (
                <div style={{
                  marginLeft: 28, marginTop: 8,
                  borderLeft: "3px solid " + (isCorrect ? "#16a34a" : "#dc2626"),
                  background: isCorrect ? "#f0fdf4" : "#fef2f2",
                  borderRadius: "0 8px 8px 0", padding: "8px 10px 8px 14px",
                }}>
                  <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700, color: isCorrect ? "#16a34a" : "#dc2626", marginBottom: 3 }}>
                    {isCorrect ? (isZh ? "\u2713 \u6B63\u786E" : "V Correct") : (isZh ? "\u2717 \u6B63\u786E\u7B54\u6848\uFF1A(" : "X Correct answer: (") + (it.answer + 1) + ") " + pool[it.answer]}
                  </div>
                  {it.stem_en && (
                    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#2563eb", lineHeight: 1.5, marginBottom: 6 }}>
                      <span style={{ fontWeight: 700 }}>Translate: </span>{it.stem_en}
                    </div>
                  )}
                  {it.explanation && (
                    <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "#374151", lineHeight: 1.6 }}>{it.explanation}<EnExp en={it.explanation_en} /></div>
                  )}
                  <KeyWords list={it.keywords} />
                </div>
              )}
              {idx < items.length - 1 && <div style={{ borderTop: "1px solid #ccc", margin: "14px 0" }} />}
            </div>
          );
        })}

        {submitted && (
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10,
            padding: "12px 16px", marginBottom: 16, display: "flex",
            justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700 }}>{isZh ? "\u5F97\u5206\uFF1A" : "Score: "}{score}/{items.length}</span>
            <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
              color: score === items.length ? "#16a34a" : score >= items.length * 0.6 ? "#d97706" : "#dc2626" }}>
              {Math.round(score / Math.max(items.length, 1) * 100)}%
            </span>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit} disabled={!allAnswered}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: allAnswered ? "#1e3a6e" : "#94a3b8", color: "#fff", border: "none",
              fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: allAnswered ? "pointer" : "not-allowed" }}>
            Submit
            {!allAnswered && <span style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 400, display: "block" }}>{isZh ? "\u8BF7\u5148\u56DE\u7B54\u5168\u90E8 " : "Answer all "}{items.length}{isZh ? " \u9898" : " questions first"}</span>}
          </button>
        ) : (
          <button onClick={handleFinish}
            style={{ width: "100%", padding: "14px", borderRadius: 10,
              background: "#1e3a6e", color: "#fff", border: "none",
              fontSize: "calc(var(--fs) * 1.071)", fontWeight: 700, cursor: "pointer" }}>
            Next Section
          </button>
        )}
      </div>
    </div>
  );
}

export function ExamSessionScreen({ plan, isMockExam, mockInfo, startFrom, singleSection, onFinish, onBack, reviewMode, reviewResults, onSectionDone, completedTypes }) {
  const _completed = completedTypes || [];
  const isZh = Array.isArray(plan) && plan.some(s => ZH_TYPES.has(s.type));
  const isMcqSection = (t) => t === "GrammarMCQ" || t === "VocabMCQ" || ZH_MCQ_TYPES.has(t);
  const startSecIdx = startFrom
    ? Math.max(0, plan.findIndex(s => s.type === startFrom))
    : Math.max(0, plan.findIndex(s => !_completed.includes(s.type)));
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

  // MCQ: the English paper keeps 4 per page. The Chinese paper must show the
  // whole section on one page - HanziMcq/VocabMcq carry 5 items in all 60 sets,
  // so a 4-per-page rule split every one of them into an odd 4+1 and made the
  // header read "(4 marks)" because marks were counted per page, not per section.
  const MCQ_PER_PAGE = isZh
    ? Math.max(1, ((plan[secIdx] && plan[secIdx].items) || []).length)
    : 4;
  const mcqPages = isMcqSection(sectionType)
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
      // MCQ: still more pages in THIS section -> keep accumulating in pageResults,
      // do NOT finalize the section yet (so latestResults holds the WHOLE section).
      if (isMcqSection(sectionType)) {
        if (pageIdx + 1 < mcqPages.length) {
          setPageIdx(p => p + 1);
          return;
        }
      }
      // Section complete: latestResults now holds this section's full results.
      const newAll = [...allResults, ...latestResults];
      setAllResults(newAll);
      setPageResults([]);
      // Persist this section right away so progress survives backing out mid-run.
      if (!reviewMode && onSectionDone) onSectionDone(sectionType, latestResults);
      // Single-section mode: finish after completing just this one section
      if (singleSection) {
        setDone(true);
        onFinish(newAll);
        return;
      }
      // Move to next section (full run: skip sections already completed)
      let nextIdx = secIdx + 1;
      if (!singleSection) {
        while (nextIdx < plan.length && _completed.includes(plan[nextIdx].type)) nextIdx++;
      }
      if (nextIdx >= plan.length) {
        setDone(true);
        onFinish(newAll);
      } else {
        setSecIdx(nextIdx);
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

  const sectionLabel = meta.label || ZH_LABELS[sectionType] || sectionType;
  const sectionMarks = (section.marks ?? (section.items?.length || section.sets || 1));

  return (
    <div className={isZh ? "zh-scope" : "en-scope"} style={{ background: "#fff", minHeight: "100vh", fontFamily: isZh ? ZH_FONT : EXAM_FONT }}>
      {/* Exam header */}
      <div style={{
        ...S.header,
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid #000", borderRadius: 6,
          width: 30, height: 30, cursor: "pointer", fontSize: "calc(var(--fs) * 1.000)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: EXAM_BODY, fontWeight: 700, fontSize: "calc(var(--fs) * 1.000)" }}>
            {isMockExam ? ` ${mockInfo?.school || (isZh ? "\u6A21\u62DF\u8003" : "Mock Exam")}` : (isZh ? `\u7B2C ${secIdx + 1}/${totalSections} \u8282` : `Section ${secIdx + 1}/${totalSections}`)}
          </div>
          <div style={{ fontFamily: EXAM_BODY, fontSize: "calc(var(--fs) * 1.000)", color: "#64748b" }}>
            {sectionLabel}
            {totalPages > 1 && (isZh ? ` . \u7B2C ${pageIdx + 1}/${totalPages} \u9875` : ` . Page ${pageIdx + 1}/${totalPages}`)}
          </div>
        </div>
        <div style={{
          fontFamily: EXAM_BODY, fontSize: "calc(var(--fs) * 1.000)", fontWeight: 700,
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
      {isMcqSection(sectionType) && mcqPages[pageIdx] && (
        <MCQPage reviewMode={reviewMode} reviewResults={reviewResults} isZh={isZh}
          key={`${secIdx}_${pageIdx}`}
          items={mcqPages[pageIdx]}
          pageIdx={pageIdx}
          totalPages={totalPages}
          globalQStart={globalQStart}
          sectionLabel={sectionLabel}
          marks={mcqPages[pageIdx].length}
          instructions={
            ZH_MCQ_TYPES.has(sectionType)
              ? (ZH_INSTRUCTIONS[sectionType] || "")
              : sectionType === "GrammarMCQ"
                ? "For each question, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and write its number in the brackets provided."
                : "For each of the following, choose the best answer and write the number (1, 2, 3 or 4) in the brackets provided."
          }
          onPageDone={handlePageDone}
        />
      )}

      {(sectionType === "GrammarCloze" || sectionType === "VocabCloze" || sectionType === "PassageCloze") && (
        <ClozePage reviewMode={reviewMode} reviewResults={reviewResults} isZh={isZh}
          key={secIdx}
          set={(section.items || [])[0] || {}}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}

      {(sectionType === "VocabMatch") && (
        <MatchPage reviewMode={reviewMode} reviewResults={reviewResults} isZh={isZh}
          key={secIdx}
          set={(section.items || [])[0] || {}}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}

      {sectionType === "Editing" && (
        <EditingPage reviewMode={reviewMode} reviewResults={reviewResults} isZh={isZh}
          key={secIdx}
          set={(section.items || [])[0] || {}}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}

      {(sectionType === "Synthesis" || sectionType === "SentenceCraft") && (
        <SynthesisPage reviewMode={reviewMode} reviewResults={reviewResults} isZh={isZh}
          key={secIdx}
          items={section.items || []}
          sectionLabel={sectionLabel}
          marks={sectionMarks}
          onPageDone={handlePageDone}
        />
      )}

      {(sectionType === "Comprehension" || sectionType === "ReadingMcq" || sectionType === "ReadingOpen") && (
        <CompPage reviewMode={reviewMode} reviewResults={reviewResults} isZh={isZh}
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
