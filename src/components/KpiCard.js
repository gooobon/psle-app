"use client";
import React from "react";
import { ledgerSummary, firstTryStats } from "@/lib/trialLedger";

// ---------------------------------------------------------------------------
//  KpiCard - the four learning KPIs on the student home (Step 6), computed from
//  trials[] / skillLedger{} (Step 1). Nothing here uses the old "Avg" metric.
//    first-try rate   : correct on first attempt, no hint, not guessed (exam/mock)
//    re-error rate    : after failing a skill, failing it AGAIN on a DIFFERENT item
//    delayed success  : re-served >= 1 session after a fail and answered first-try
//    transfer         : first-try success in a section type not succeeded in before
//  Weak skills = highest re-error rate with at least 3 attempts.
//  ASCII-only source; Chinese labels use \u escapes.
// ---------------------------------------------------------------------------

const ZH_SKILL = {
  xingjinzi: "\u5F62\u8FD1\u5B57", tongyinzi: "\u540C\u97F3\u5B57", duoyinzi: "\u591A\u97F3\u5B57", shengdiao: "\u58F0\u8C03",
  shengmu_yunmu: "\u58F0\u6BCD\u97F5\u6BCD", dapei: "\u642D\u914D", jinyici: "\u8FD1\u4E49\u8BCD", lianci: "\u8FDE\u8BCD",
  liangci: "\u91CF\u8BCD", yufa: "\u8BED\u6CD5", detail: "\u7EC6\u8282", inference: "\u63A8\u65AD", sequence: "\u987A\u5E8F",
  main_idea: "\u4E3B\u65E8", vocab_in_context: "\u8BED\u5883\u8BCD\u4E49",
};
const EN_SEC = { GrammarMCQ: "Grammar MCQ", VocabMCQ: "Vocabulary MCQ", GrammarCloze: "Grammar Cloze", VocabCloze: "Vocabulary Cloze",
  Editing: "Editing", Comprehension: "Comprehension", Synthesis: "Synthesis" };

function label(skill, isZh) {
  if (!skill) return "";
  if (skill.startsWith("sec:")) { const k = skill.slice(4); return EN_SEC[k] || k; }
  return isZh ? (ZH_SKILL[skill] || skill) : skill;
}
function pct(x) { return x == null ? "\u2014" : Math.round(x * 100) + "%"; }

export default function KpiCard({ prog, isZh, accent }) {
  const ft = firstTryStats(prog);
  const sum = ledgerSummary(prog);
  const rows = Object.keys(sum).map((k) => ({ skill: k, ...sum[k] }));
  const agg = (num, den) => { let n = 0, d = 0; rows.forEach((r) => { n += r[num] || 0; d += r[den] || 0; }); return d ? n / d : null; };
  // recompute from raw ledger for aggregates (ledgerSummary exposes rates only)
  const L = (prog && prog.skillLedger) || {};
  let rt = 0, rf = 0, dt = 0, dok = 0, tt = 0, tok = 0;
  Object.values(L).forEach((x) => { rt += x.retryTotal || 0; rf += x.retryFail || 0; dt += x.delayedTotal || 0; dok += x.delayedOk || 0; tt += x.transferTotal || 0; tok += x.transferOk || 0; });
  const reError = rt ? rf / rt : null, delayed = dt ? dok / dt : null, transfer = tt ? tok / tt : null;
  const weak = rows.filter((r) => r.att >= 3 && r.reErrorRate != null).sort((a, b) => b.reErrorRate - a.reErrorRate).slice(0, 3);
  const T = (zh, en) => (isZh ? zh : en);
  const col = accent || "#1E3A6E";
  const cards = [
    [T("\u9996\u6B21\u7B54\u5BF9\u7387", "First try"), ft.n ? ft.firstTryRate + "%" : "\u2014", T(ft.n + " \u9898", ft.n + " items"), "#065F46", "#D1FAE5"],
    [T("\u91CD\u9519\u7387", "Re-error"), pct(reError), T(rt + " \u6B21\u91CD\u8003", rt + " re-tests"), "#991B1B", "#FEE2E2"],
    [T("\u9694\u8F6E\u5DE9\u56FA", "Delayed success"), pct(delayed), T(dt + " \u6B21", dt + " checks"), "#92400E", "#FEF3C7"],
    [T("\u8FC1\u79FB\u7387", "Transfer"), pct(transfer), T(tt + " \u6B21", tt + " checks"), "#1E40AF", "#DBEAFE"],
  ];
  if (!ft.n) {
    return (
      <div style={{ margin: "12px 16px 0", background: "#F8FAFC", border: "1px dashed #CBD5E1", borderRadius: 14, padding: "10px 14px", fontSize: "calc(var(--fs) * 0.786)", color: "#64748B" }}>
        {T("\u5B8C\u6210\u4E00\u8F6E\u540E\uFF0C\u8FD9\u91CC\u4F1A\u663E\u793A\u9996\u6B21\u7B54\u5BF9\u7387\u3001\u91CD\u9519\u7387\u7B49\u5B66\u4E60\u6307\u6807\u3002",
           "After your first round, your learning indicators (first-try rate, re-error rate) will appear here.")}
      </div>
    );
  }
  return (
    <div style={{ margin: "12px 16px 0", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "12px 14px", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <div style={{ fontWeight: 800, fontSize: "calc(var(--fs) * 0.929)", color: "#0F172A" }}>{T("\u5B66\u4E60\u6307\u6807", "Learning indicators")}</div>
        <div style={{ fontSize: "calc(var(--fs) * 0.714)", color: "#94A3B8" }}>{T("\u53EA\u7B97\u9996\u6B21\u4F5C\u7B54", "first attempts only")}</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {cards.map(([l, v, sub, fg, bg], i) => (
          <div key={i} style={{ flex: 1, background: bg, borderRadius: 12, padding: "8px 4px", textAlign: "center" }}>
            <div style={{ fontSize: "calc(var(--fs) * 1.071)", fontWeight: 900, color: fg }}>{v}</div>
            <div style={{ fontSize: "calc(var(--fs) * 0.714)", fontWeight: 700, color: fg }}>{l}</div>
            <div style={{ fontSize: "calc(var(--fs) * 0.643)", color: "#64748B" }}>{sub}</div>
          </div>
        ))}
      </div>
      {weak.length > 0 && (
        <div style={{ marginTop: 10, fontSize: "calc(var(--fs) * 0.786)", color: "#334155" }}>
          <span style={{ fontWeight: 700, color: col }}>{T("\u5BB9\u6613\u91CD\u9519\uFF1A", "Keeps tripping on: ")}</span>
          {weak.map((w, i) => (
            <span key={w.skill} style={{ marginRight: 8 }}>{label(w.skill, isZh)} <span style={{ color: "#991B1B", fontWeight: 700 }}>{pct(w.reErrorRate)}</span>{i < weak.length - 1 ? " \u00B7" : ""}</span>
          ))}
        </div>
      )}
      <div style={{ marginTop: 6, fontSize: "calc(var(--fs) * 0.643)", color: "#94A3B8", lineHeight: 1.5 }}>
        {T("\u91CD\u9519\u7387 = \u540C\u4E00\u9898\u578B\u5728\u4E0D\u540C\u9898\u76EE\u4E0A\u518D\u6B21\u7B54\u9519\u7684\u6BD4\u4F8B\uFF1B\u8D8A\u4F4E\u8D8A\u597D\u3002",
           "Re-error = failing the same skill again on a different question; lower is better.")}
      </div>
    </div>
  );
}
