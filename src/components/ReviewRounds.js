"use client";
import React from "react";

// ---------------------------------------------------------------------------
//  ReviewRounds - list of past rounds with the student's wrong items, each
//  re-solvable as a recognition review. Rendered inside MistakesTab ("By round").
//  Results of a review never change score / history / mastery (see
//  src/lib/reviewRounds.js). UI text: Chinese via \u escapes when isZh.
//  readOnly=true hides the re-solve button (parent / teacher view).
// ---------------------------------------------------------------------------

const ZH_FONT = "'KaiTi','STKaiti','LXGW WenKai',serif";

function L(isZh, zh, en) { return isZh ? zh : en; }

export default function ReviewRounds({ rounds, reviewedRounds, isZh, onStart, readOnly }) {
  const list = (rounds || []).slice().reverse(); // newest first
  const done = reviewedRounds || {};
  const font = isZh ? ZH_FONT : "inherit";

  if (!list.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px 20px", color: "#64748B", fontFamily: font }}>
        <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
          {L(isZh, "\u8FD8\u6CA1\u6709\u5B8C\u6210\u7684\u7EC3\u4E60", "No completed rounds yet")}
        </div>
        <div style={{ fontSize: "calc(var(--fs) * 0.857)" }}>
          {L(isZh, "\u5B8C\u6210\u4E00\u5957\u7EC3\u4E60\u540E\uFF0C\u9519\u9898\u4F1A\u6309\u8F6E\u6B21\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",
                   "Finish a practice set and its wrong answers will be listed here by round.")}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px 16px", fontFamily: font }}>
      <div style={{ fontSize: "calc(var(--fs) * 0.786)", color: "#64748B", marginBottom: 10, lineHeight: 1.5 }}>
        {L(isZh,
          "\u91CD\u505A\u67D0\u4E00\u8F6E\u7684\u9519\u9898\u3002\u590D\u4E60\u7684\u7ED3\u679C\u4E0D\u8BA1\u5165\u5206\u6570\u3002",
          "Re-solve the wrong answers of a past round. Review results do not change your score.")}
      </div>
      {list.map((r) => {
        const rec = done[r.sessionNum];
        const s = r.stats || { wrong: 0, hinted: 0, guessed: 0 };
        const canStart = r.reviewable && !readOnly;
        return (
          <div key={r.sessionNum} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14,
            padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <div style={{ fontSize: "calc(var(--fs) * 1.000)", fontWeight: 800, color: "#0F172A" }}>
                {L(isZh, "\u7B2C " + r.sessionNum + " \u8F6E", "Round " + r.sessionNum)}
                {r.isMockExam ? (
                  <span style={{ marginLeft: 6, fontSize: "calc(var(--fs) * 0.714)", fontWeight: 700, color: "#7C2D12",
                    background: "#FEF3C7", borderRadius: 6, padding: "1px 6px" }}>
                    {L(isZh, "\u6A21\u62DF", "Mock")}
                  </span>
                ) : null}
              </div>
              <div style={{ fontSize: "calc(var(--fs) * 0.786)", color: "#64748B" }}>{r.date}
                {typeof r.totalPct === "number" ? " \u00B7 " + r.totalPct + "%" : ""}</div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap",
              fontSize: "calc(var(--fs) * 0.857)" }}>
              <span style={{ color: "#DC2626", fontWeight: 700 }}>
                {L(isZh, "\u9519\u9898 " + s.wrong, "Wrong " + s.wrong)}
              </span>
              {s.hinted > 0 ? (
                <span style={{ color: "#D97706", fontWeight: 700 }}>
                  {L(isZh, "\u770B\u63D0\u793A\u540E\u7B54\u5BF9 " + s.hinted, "Correct after hint " + s.hinted)}
                </span>
              ) : null}
              {s.guessed > 0 ? (
                <span style={{ color: "#7C3AED", fontWeight: 700 }}>
                  {L(isZh, "\u731C\u5BF9 " + s.guessed, "Guessed " + s.guessed)}
                </span>
              ) : null}
              {rec ? (
                <span style={{ color: "#059669", fontWeight: 700 }}>
                  {L(isZh, "\u5DF2\u590D\u4E60 " + rec.times + " \u6B21 (" + rec.correct + "/" + rec.total + ")",
                           "Reviewed " + rec.times + "x (" + rec.correct + "/" + rec.total + ")")}
                </span>
              ) : null}
            </div>

            {s.wrong === 0 ? (
              <div style={{ marginTop: 8, fontSize: "calc(var(--fs) * 0.786)", color: "#059669" }}>
                {L(isZh, "\u8FD9\u4E00\u8F6E\u5168\u5BF9\uFF01", "All correct in this round!")}
              </div>
            ) : !r.reviewable ? (
              <div style={{ marginTop: 8, fontSize: "calc(var(--fs) * 0.786)", color: "#94A3B8" }}>
                {L(isZh, "\u8FD9\u4E00\u8F6E\u662F\u5B66\u6821\u8BD5\u5377\uFF0C\u6682\u65F6\u4E0D\u80FD\u91CD\u505A\u3002",
                         "This round used a school past paper and cannot be re-solved yet.")}
              </div>
            ) : canStart ? (
              <button onClick={() => onStart && onStart(r.sessionNum)}
                style={{ marginTop: 10, width: "100%", padding: "10px 0", borderRadius: 10, border: "none",
                  background: "#2563EB", color: "#fff", fontWeight: 800, cursor: "pointer",
                  fontSize: "calc(var(--fs) * 0.929)", fontFamily: font }}>
                {L(isZh, "\u91CD\u505A\u9519\u9898 \u2192", "Re-solve wrong answers \u2192")}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
