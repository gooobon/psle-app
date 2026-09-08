"use client";
import React from "react";

// ---------------------------------------------------------------------------
//  ZhWa1ResultScreen - end-of-round summary for the Chinese 60-set (WA1) track.
//  Mirrors the English StudentResultScreen but for the 8 ExamSession section
//  types. Shown AFTER the vocab review gate, before returning home.
//  Rules (same as English): score = first-try correct only; "after hint" is
//  practice, not correct; guessed-but-correct keeps the mark but is flagged.
//  Sections with no auto-graded items (open answers, sentence craft) show a
//  label instead of a misleading 0%.
//  ASCII-only source; Chinese UI text uses \u escapes.
// ---------------------------------------------------------------------------

const ZH_FONT = "'KaiTi','STKaiti','LXGW WenKai',serif";
const ORDER = ["HanziMcq", "PinyinMcq", "VocabMcq", "VocabMatch", "SentenceCraft", "PassageCloze", "ReadingMcq", "ReadingOpen"];
const LABEL = {
  HanziMcq: "\u8FA8\u5B57", PinyinMcq: "\u62FC\u97F3", VocabMcq: "\u8BCD\u8BED", VocabMatch: "\u8BCD\u8BED\u642D\u914D",
  SentenceCraft: "\u9020\u53E5", PassageCloze: "\u77ED\u6587\u586B\u7A7A", ReadingMcq: "\u9605\u8BFB\u7406\u89E3", ReadingOpen: "\u9605\u8BFB\u95EE\u7B54",
};
// counts of NON-auto-graded items per section (to say "2 open answers" instead of 0%)
const OPEN_LABEL = "\u53C2\u8003\u7B54\u6848\u5DF2\u663E\u793A"; // reference answers shown

export default function ZhWa1ResultScreen({ results, sessionNum, onHome, onNext, onReview }) {
  const all = results || [];
  const graded = all.filter((r) => r && r.scored !== false);
  const open = all.filter((r) => r && r.scored === false);
  const total = graded.length;
  const firstTry = graded.filter((r) => r.correct).length;            // includes guessed (score keeps the mark)
  const guessed = graded.filter((r) => r.correct && r.guessed).length;
  const hinted = graded.filter((r) => !r.correct && r.solvedAfterHint).length;
  const wrong = graded.filter((r) => !r.correct && !r.solvedAfterHint).length;
  const pct = total ? Math.round(firstTry / total * 100) : 0;
  const col = pct >= 85 ? "#16A34A" : pct >= 70 ? "#D97706" : "#DC2626";
  const bySec = {};
  ORDER.forEach((t) => { bySec[t] = { g: graded.filter((r) => r.sectionType === t), o: open.filter((r) => r.sectionType === t) }; });
  const missed = graded.filter((r) => !r.correct);

  return (
    <div style={{ paddingBottom: 20, fontFamily: ZH_FONT }}>
      <div style={{ background: "linear-gradient(135deg," + col + "," + col + "cc)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 52 }}>{pct >= 85 ? "\uD83C\uDFC6" : pct >= 70 ? "\uD83C\uDF1F" : "\uD83D\uDCAA"}</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "8px 0 2px" }}>{pct}%</div>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", color: "rgba(255,255,255,.85)" }}>
          {firstTry}/{total} {"\u9898\u9996\u6B21\u7B54\u5BF9"}
        </div>
        {hinted > 0 && (
          <div style={{ marginTop: 6, background: "rgba(255,255,255,.2)", borderRadius: 10, padding: "5px 14px", display: "inline-block", color: "#fff", fontSize: "calc(var(--fs) * 0.857)", fontWeight: 700 }}>
            {"\uD83D\uDCA1 " + hinted + " \u9898\u770B\u63D0\u793A\u540E\u7B54\u5BF9\uFF08\u7B97\u7EC3\u4E60\uFF0C\u4E0D\u8BA1\u5206\uFF09"}
          </div>
        )}
      </div>

      <div style={{ padding: "18px 16px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px", marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>
          <div style={{ fontSize: "calc(var(--fs) * 0.929)", fontWeight: 800, color: "#0F172A", marginBottom: 12 }}>{"\uD83D\uDCCA \u672C\u8F6E\u60C5\u51B5"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["#D1FAE5", "#065F46", firstTry, "\u2705 \u9996\u6B21\u7B54\u5BF9"], ["#FEF3C7", "#92400E", hinted, "\uD83D\uDCA1 \u770B\u63D0\u793A\u540E"], ["#FEE2E2", "#991B1B", wrong, "\u274C \u672A\u7B54\u5BF9"]].map(([bg, fg, n, lab], i) => (
              <div key={i} style={{ flex: 1, background: bg, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: fg }}>{n}</div>
                <div style={{ fontSize: "calc(var(--fs) * 0.780)", fontWeight: 700, color: fg, marginTop: 2 }}>{lab}</div>
              </div>
            ))}
          </div>
          {guessed > 0 && (
            <div style={{ background: "#F5F3FF", borderRadius: 10, padding: "8px 12px", marginTop: 10, fontSize: "calc(var(--fs) * 0.786)", color: "#5B21B6", fontWeight: 600 }}>
              {"\u5176\u4E2D " + guessed + " \u9898\u7B54\u5F97\u5F88\u5FEB\uFF0C\u5DF2\u52A0\u5165\u8BCD\u8BED\u590D\u4E60\u518D\u786E\u8BA4\u4E00\u6B21\u3002"}
            </div>
          )}
          {hinted > 0 && (
            <div style={{ background: "#FFFBEB", borderRadius: 10, padding: "10px 12px", marginTop: 10, fontSize: "calc(var(--fs) * 0.786)", color: "#92400E", fontWeight: 600, lineHeight: 1.5 }}>
              {"\u770B\u63D0\u793A\u540E\u7B54\u5BF9\u7684\u9898\u4E0D\u8BA1\u5165\u5206\u6570\u3002\u8FD9\u4E9B\u9898\u4F1A\u5728\u201C\u6309\u8F6E\u590D\u4E60\u201D\u91CC\u518D\u51FA\u73B0\uFF0C\u76F4\u5230\u4F60\u80FD\u9996\u6B21\u7B54\u5BF9\u3002"}
            </div>
          )}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "14px", marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>
          <div style={{ fontWeight: 800, fontSize: "calc(var(--fs) * 0.929)", marginBottom: 10 }}>{"\u5404\u90E8\u5206\u6210\u7EE9"}</div>
          {ORDER.map((t) => {
            const g = bySec[t].g, o = bySec[t].o;
            if (!g.length && !o.length) return null;
            if (!g.length) {
              return (
                <div key={t} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: "calc(var(--fs) * 0.857)", fontWeight: 700 }}>{LABEL[t]}</span>
                  <span style={{ fontSize: "calc(var(--fs) * 0.786)", color: "#64748B" }}>{o.length + " \u9898 \u00B7 " + OPEN_LABEL}</span>
                </div>
              );
            }
            const c = g.filter((r) => r.correct).length; const p = Math.round(c / g.length * 100);
            const sc = p >= 85 ? "#16A34A" : p >= 70 ? "#D97706" : "#DC2626";
            return (
              <div key={t} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: "calc(var(--fs) * 0.857)", fontWeight: 700 }}>{LABEL[t]}{o.length ? <span style={{ color: "#94A3B8", fontWeight: 500 }}>{" (+" + o.length + " \u9898\u95EE\u7B54)"}</span> : null}</span>
                  <span style={{ fontSize: "calc(var(--fs) * 0.857)", fontWeight: 800, color: sc }}>{c}/{g.length} {"\u00B7"} {p}%</span>
                </div>
                <div style={{ background: "#EEF2F7", borderRadius: 6, height: 7 }}>
                  <div style={{ background: sc, borderRadius: 6, height: 7, width: p + "%", transition: "width 0.5s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {missed.length > 0 && (
          <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 12, padding: "11px 14px", marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: "calc(var(--fs) * 0.857)", color: "#92400E", marginBottom: 6 }}>
              {"\uD83D\uDCC5 " + missed.length + " \u9898\u5DF2\u52A0\u5165\u9519\u9898\u672C"}
            </div>
            {onReview ? (
              <button onClick={onReview} style={{ width: "100%", background: "#2563EB", border: "none", borderRadius: 10, padding: "10px", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: ZH_FONT }}>
                {"\u91CD\u505A\u672C\u8F6E\u9519\u9898 \u2192"}
              </button>
            ) : null}
          </div>
        )}

        <div style={{ background: "linear-gradient(135deg,#0F172A,#1E3A6E)", borderRadius: 16, padding: "16px", marginBottom: 10 }}>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: "calc(var(--fs) * 0.786)", marginBottom: 4 }}>{"\u51C6\u5907\u597D\u7EE7\u7EED\u4E86\u5417\uFF1F"}</div>
          <div style={{ color: "#fff", fontSize: "calc(var(--fs) * 1.000)", fontWeight: 800, marginBottom: 10 }}>{"\u7B2C " + (sessionNum + 1) + " \u8F6E\u5DF2\u5C31\u7EEA\uFF01"}</div>
          <button onClick={onNext} style={{ width: "100%", background: "rgba(255,255,255,.15)", border: "1.5px solid rgba(255,255,255,.3)", borderRadius: 10, padding: "12px", color: "#fff", fontSize: "calc(var(--fs) * 1.000)", fontWeight: 900, cursor: "pointer", fontFamily: ZH_FONT }}>
            {"\u25B6 \u5F00\u59CB\u4E0B\u4E00\u8F6E\u7EC3\u4E60 \u2192"}
          </button>
        </div>
        <button onClick={onHome} style={{ width: "100%", background: "none", border: "1.5px solid #E2E8F0", borderRadius: 12, padding: "12px", fontSize: "calc(var(--fs) * 0.929)", fontWeight: 700, cursor: "pointer", color: "#64748B", fontFamily: ZH_FONT }}>
          {"\u2190 \u8FD4\u56DE\u4E3B\u9875"}
        </button>
      </div>
    </div>
  );
}
