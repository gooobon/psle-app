"use client";
import React, { useMemo, useRef, useState } from "react";

// ---------------------------------------------------------------------------
//  VocabQuiz - measures whether the student UNDERSTOOD the key words behind
//  their wrong answers. Two formats per word, dictionary-driven:
//    Part 1 RECOGNITION : word (+pinyin)  -> choose the meaning (4 options)
//    Part 2 RECALL      : example sentence with the word blanked -> choose the word
//  A word counts as "known" only when BOTH are answered correctly.
//  Same component for English and Chinese; only `dict` and `lang` differ.
//    en dict entry: { base, pos, def, ex, syn }          (src/data/p3/english/en_vocab.json)
//    zh dict entry: { py, en, ex:{zh,py,en} }            (src/data/p3/chinese/zh_vocab.json)
//  Source is ASCII-only: Chinese UI text uses \u escapes.
// ---------------------------------------------------------------------------

const ZH_FONT = "'KaiTi','STKaiti','LXGW WenKai',serif";
const BLANK = "________";

function shuffle(arr, seed) {
  // deterministic shuffle so the same round always shows the same options
  const a = arr.slice(); let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function hash(str) { let h = 7; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000003; return h + 1; }
function head(en) { return String(en || "").split(/[;,/(]/)[0].trim().toLowerCase(); }

// ---- normalise a dict entry into { word, py, def, ex, pos } -----------------
function entryOf(dict, w, lang) {
  const e = dict && dict[w]; if (!e) return null;
  if (lang === "zh") return { word: w, py: e.py || "", def: e.en || "", ex: (e.ex && e.ex.zh) || "", exEn: (e.ex && e.ex.en) || "", pos: "zh", base: w };
  return { word: w, py: "", def: e.def || "", ex: e.ex || "", exEn: "", pos: e.pos || "", base: e.base || w };
}

// ---- English: find the inflected form of `word` inside `ex` to blank it ----
function blankEnglish(ex, word, base) {
  const cands = [word, base].filter(Boolean);
  for (const c of cands) {
    const re = new RegExp("\\b" + c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    if (re.test(ex)) return ex.replace(re, BLANK);
  }
  // inflection: base + up to 3 trailing letters, or y->ies/ied, or doubled consonant
  const stem = (base || word).replace(/e$/, "");
  const re2 = new RegExp("\\b" + stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[a-z]{0,4}\\b", "i");
  if (stem.length >= 3 && re2.test(ex)) return ex.replace(re2, BLANK);
  return null;
}
function blankChinese(ex, word) {
  if (!ex || !word || ex.indexOf(word) === -1) return null;
  return ex.replace(word, "\uFF3F\uFF3F\uFF3F");
}

// ---- build the two question lists ------------------------------------------
function buildQuestions(words, dict, lang, limit) {
  const entries = [];
  for (const w of words) { const e = entryOf(dict, w, lang); if (e && e.def) entries.push(e); if (entries.length >= limit) break; }
  const allKeys = Object.keys(dict || {});
  const pool = allKeys.map((k) => entryOf(dict, k, lang)).filter((e) => e && e.def);
  const seedBase = hash(entries.map((e) => e.word).join("|"));

  const recognition = entries.map((e, i) => {
    const used = new Set([head(e.def)]);
    const samePos = shuffle(pool.filter((p) => p.word !== e.word && (lang === "zh" || p.pos === e.pos)), seedBase + i);
    const distractors = [];
    for (const p of samePos) { if (distractors.length >= 3) break; const h = head(p.def); if (!h || used.has(h)) continue; used.add(h); distractors.push(p.def); }
    if (distractors.length < 3) for (const p of shuffle(pool, seedBase + 99 + i)) { if (distractors.length >= 3) break; const h = head(p.def); if (p.word === e.word || used.has(h)) continue; used.add(h); distractors.push(p.def); }
    return { kind: "rec", word: e.word, py: e.py, prompt: e.word, correct: e.def, options: shuffle([e.def, ...distractors], seedBase + 7 * i + 3), ex: e.ex, exEn: e.exEn };
  });

  const recall = entries.map((e, i) => {
    const blanked = lang === "zh" ? blankChinese(e.ex, e.word) : blankEnglish(e.ex, e.word, e.base);
    if (!blanked) return null;
    const near = shuffle(pool.filter((p) => p.word !== e.word && (lang === "zh" ? p.word.length === e.word.length : (p.pos === e.pos && Math.abs(p.word.length - e.word.length) <= 3))), seedBase + 500 + i);
    const distractors = []; const used = new Set([e.word]);
    for (const p of near) { if (distractors.length >= 3) break; if (used.has(p.word)) continue; used.add(p.word); distractors.push(p.word); }
    if (distractors.length < 3) for (const p of shuffle(pool, seedBase + 900 + i)) { if (distractors.length >= 3) break; if (used.has(p.word)) continue; used.add(p.word); distractors.push(p.word); }
    return { kind: "rcl", word: e.word, py: e.py, prompt: blanked, correct: e.word, options: shuffle([e.word, ...distractors], seedBase + 11 * i + 5), def: e.def, exEn: e.exEn };
  }).filter(Boolean);

  return { entries, questions: [...recognition, ...recall] };
}

function T(lang, zh, en) { return lang === "zh" ? zh : en; }

export default function VocabQuiz({ words, dict, lang = "en", limit = 10, onDone }) {
  const wordKeys = useMemo(() => (words || []).map((x) => (typeof x === "string" ? x : x && x.w)).filter(Boolean), [words]);
  const { entries, questions } = useMemo(() => buildQuestions(wordKeys, dict, lang, limit), [wordKeys, dict, lang, limit]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState({}); // word -> {rec:bool, rcl:bool}
  const reported = useRef(false);
  const font = lang === "zh" ? ZH_FONT : "inherit";

  if (!entries.length || questions.length < 2) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748B", fontFamily: font }}>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
          {T(lang, "\u8FD9\u4E00\u8F6E\u6CA1\u6709\u9700\u8981\u590D\u4E60\u7684\u8BCD\u8BED", "No vocabulary to review in this round")}
        </div>
        <div style={{ fontSize: "calc(var(--fs) * 0.857)" }}>
          {T(lang, "\u53EA\u6709\u8BCD\u6C47\u9898\u7684\u9519\u9898\u4F1A\u8FDB\u5165\u8BCD\u8BED\u590D\u4E60\uFF08\u8BED\u6CD5\u9898\u4E0D\u7B97\uFF09\u3002",
                   "Only wrong answers from vocabulary questions enter the word quiz (grammar questions do not).")}
        </div>
      </div>
    );
  }

  const done = idx >= questions.length;
  if (done) {
    const known = entries.filter((e) => results[e.word] && results[e.word].rec && results[e.word].rcl);
    if (onDone && !reported.current) { reported.current = true; onDone(entries.map((e) => ({ word: e.word, ...(results[e.word] || {}) }))); }
    return (
      <div style={{ fontFamily: font }}>
        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ fontSize: "calc(var(--fs) * 1.071)", fontWeight: 800, color: "#0F172A" }}>
            {T(lang, "\u590D\u4E60\u5B8C\u6210", "Review complete")}{" \u00B7 "}{known.length}/{entries.length}{" "}{T(lang, "\u638C\u63E1", "known")}
          </div>
          <div style={{ fontSize: "calc(var(--fs) * 0.786)", color: "#64748B", marginTop: 4 }}>
            {T(lang, "\u638C\u63E1 = \u610F\u601D\u548C\u7528\u6CD5\u90FD\u7B54\u5BF9", "Known = both the meaning and the use in a sentence were correct")}
          </div>
        </div>
        {entries.map((e) => {
          const r = results[e.word] || {}; const ok = r.rec && r.rcl;
          return (
            <div key={e.word} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid " + (ok ? "#A7F3D0" : "#FECACA"),
              borderRadius: 12, padding: "8px 12px", marginBottom: 6 }}>
              <span style={{ fontSize: "calc(var(--fs) * 1.071)", fontWeight: 800, color: "#0F172A", minWidth: 90 }}>{e.word}</span>
              {e.py ? <span style={{ color: "#2563EB", fontSize: "calc(var(--fs) * 0.857)" }}>{e.py}</span> : null}
              <span style={{ marginLeft: "auto", fontSize: "calc(var(--fs) * 0.929)", fontWeight: 800, color: r.rec ? "#059669" : "#DC2626" }}>{r.rec ? "\u2713" : "\u2717"}</span>
              <span style={{ fontSize: "calc(var(--fs) * 0.929)", fontWeight: 800, color: r.rcl ? "#059669" : "#DC2626" }}>{r.rcl ? "\u2713" : "\u2717"}</span>
            </div>
          );
        })}
        <div style={{ fontSize: "calc(var(--fs) * 0.714)", color: "#94A3B8", marginTop: 6 }}>
          {T(lang, "\u7B2C\u4E00\u4E2A\u2713 = \u610F\u601D\uFF0C\u7B2C\u4E8C\u4E2A\u2713 = \u9020\u53E5", "first mark = meaning, second mark = use in sentence")}
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const answered = picked !== null;
  const isRec = q.kind === "rec";
  const partNo = isRec ? 1 : 2;
  const partLabel = isRec ? T(lang, "\u7B2C\u4E00\u90E8\u5206 \u00B7 \u610F\u601D", "Part 1 \u00B7 Meaning") : T(lang, "\u7B2C\u4E8C\u90E8\u5206 \u00B7 \u7528\u6CD5", "Part 2 \u00B7 Use in a sentence");

  function choose(opt) {
    if (answered) return;
    const ok = opt === q.correct;
    setPicked(opt);
    setResults((r) => ({ ...r, [q.word]: { ...(r[q.word] || {}), [q.kind]: ok } }));
  }
  function next() { setIdx((i) => i + 1); setPicked(null); }

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: "calc(var(--fs) * 0.786)", fontWeight: 800, color: "#2563EB" }}>{partLabel}</span>
        <span style={{ fontSize: "calc(var(--fs) * 0.786)", color: "#94A3B8" }}>{idx + 1} / {questions.length}</span>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "16px", marginBottom: 12, textAlign: "center" }}>
        {isRec ? (
          <>
            <div style={{ fontSize: lang === "zh" ? "calc(var(--fs) * 2.4)" : "calc(var(--fs) * 1.6)", fontWeight: 900, color: "#0F172A" }}>{q.prompt}</div>
            {q.py ? <div style={{ color: "#2563EB", fontWeight: 700, marginTop: 2 }}>{q.py}</div> : null}
            <div style={{ fontSize: "calc(var(--fs) * 0.857)", color: "#64748B", marginTop: 6 }}>
              {T(lang, "\u8FD9\u4E2A\u8BCD\u8BED\u662F\u4EC0\u4E48\u610F\u601D\uFF1F", "What does this word mean?")}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: lang === "zh" ? "calc(var(--fs) * 1.3)" : "calc(var(--fs) * 1.0)", color: "#0F172A", lineHeight: 1.7, textAlign: "left" }}>{q.prompt}</div>
            <div style={{ fontSize: "calc(var(--fs) * 0.857)", color: "#64748B", marginTop: 8 }}>
              {T(lang, "\u54EA\u4E2A\u8BCD\u8BED\u586B\u5165\u7A7A\u683C\u6700\u5408\u9002\uFF1F", "Which word fits the blank?")}
            </div>
          </>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = "#fff", border = "1px solid #E2E8F0", color = "#1F2937";
          if (answered) {
            if (opt === q.correct) { bg = "#ECFDF5"; border = "1.5px solid #16A34A"; color = "#065F46"; }
            else if (opt === picked) { bg = "#FEF2F2"; border = "1.5px solid #DC2626"; color = "#991B1B"; }
            else color = "#94A3B8";
          }
          return (
            <button key={i} onClick={() => choose(opt)} disabled={answered}
              style={{ textAlign: "left", padding: "11px 14px", borderRadius: 10, background: bg, border, color, cursor: answered ? "default" : "pointer",
                fontSize: isRec ? "calc(var(--fs) * 0.929)" : (lang === "zh" ? "calc(var(--fs) * 1.2)" : "calc(var(--fs) * 1.0)"), fontWeight: isRec ? 500 : 700, lineHeight: 1.5, fontFamily: font }}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 12, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "10px 12px" }}>
          <div style={{ fontWeight: 800, color: picked === q.correct ? "#16A34A" : "#DC2626", marginBottom: 4 }}>
            {picked === q.correct ? T(lang, "\u2713 \u7B54\u5BF9\u4E86\uFF01", "\u2713 Correct!") : T(lang, "\u2717 \u518D\u8BB0\u4E00\u904D", "\u2717 Not quite - remember this")}
          </div>
          {isRec ? (
            <div style={{ fontSize: "calc(var(--fs) * 0.857)", color: "#334155" }}>
              <div>{q.ex}</div>
              {q.exEn ? <div style={{ color: "#64748B" }}>{q.exEn}</div> : null}
            </div>
          ) : (
            <div style={{ fontSize: "calc(var(--fs) * 0.857)", color: "#334155" }}>
              <b>{q.word}</b>{q.py ? " " + q.py : ""} = {q.def}
            </div>
          )}
          <button onClick={next} style={{ marginTop: 10, width: "100%", padding: "10px 0", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: font }}>
            {idx + 1 >= questions.length ? T(lang, "\u67E5\u770B\u7ED3\u679C \u2192", "See results \u2192") : T(lang, "\u4E0B\u4E00\u9898 \u2192", "Next \u2192")}
          </button>
        </div>
      )}
    </div>
  );
}
