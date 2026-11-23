"use client";
// Myth-item level badge. Uses the art at CLEWQUEST.levels[n].icon when it is in manifest.json; otherwise a simple inline SVG laurel badge.
import React from "react";
import { Art, ASSET_KEYS } from "./Art";
import { T } from "@/lib/theme/tokens";

export function FallbackBadge({ lv, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-hidden="true" data-testid="cq-level-fallback">
      <circle cx="32" cy="32" r="29" fill="#F6F1E6" stroke="#D9A52E" strokeWidth="3" />
      <path d="M14 38c-3-9 0-18 8-23M50 38c3-9 0-18-8-23" fill="none" stroke="#6F8A3A" strokeWidth="3" strokeLinecap="round" />
      <text x="32" y="40" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1B2340" fontFamily="system-ui,sans-serif">{lv}</text>
    </svg>
  );
}
export function LevelBadge({ level, size = 56, assetKeys = ASSET_KEYS }) {
  return (
    <span data-testid="cq-level-badge" data-level={level.lv} style={{ display: "inline-flex", width: size, height: size, flexShrink: 0 }}>
      {assetKeys.has(level.icon)
        ? <Art k={level.icon} alt={level.name} style={{ width: size, height: size }} />
        : <FallbackBadge lv={level.lv} size={size} />}
    </span>
  );
}
// Badge + name + progress bar to the next level. `p` = levelProgress() result (null at the top).
export function LevelCard({ subjectLabel, lv, p, compact }) {
  return (
    <div data-testid="cq-level-card" style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 16, padding: compact ? "8px 12px" : "12px 14px", boxShadow: "0 2px 10px rgba(27,35,64,.08)" }}>
      <LevelBadge level={lv.current} size={compact ? 44 : 56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted }}>{subjectLabel} · Level {lv.level}</div>
        <div style={{ fontWeight: 800, color: T.ink }}>{lv.current.name}</div>
        {p ? (<>
          <div style={{ height: 8, background: T.track, borderRadius: 5, margin: "6px 0 3px" }}><div style={{ width: p.pct + "%", height: 8, background: T.gold, borderRadius: 5 }} /></div>
          <div data-testid="cq-level-next" style={{ fontSize: 12, color: T.muted }}>
            {p.needAvg != null ? `Keep your 2-week average at ${p.needAvg}% or more for ${p.next.name}` : `${Math.ceil(p.threadsLeft)} more thread for ${p.next.name}`}
          </div>
        </>) : <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>Top level reached!</div>}
      </div>
    </div>
  );
}

// Study-home strip: this subject's level badge + progress. Renders nothing unless ClewQuest is on and the server answers.
import { useEffect, useState } from "react";
import { clewquestEnabled } from "@/lib/clewquest/config";
import { cqGet } from "@/lib/clewquest/client";
import { levelFor, levelProgress, recentAverage, readFloor, writeFloor } from "@/lib/clewquest/levels";
import { todayStr } from "@/lib/sessionUtils";
export function HomeLevel({ uid, subject, history }) {
  const [threads, setThreads] = useState(null);
  useEffect(() => {
    if (!clewquestEnabled()) return undefined; let live = true;
    cqGet("/api/clewquest/state").then((r) => { if (live && r && r.ok && r.thread) setThreads((r.thread.bySubject || {})[String(subject).toLowerCase()] || 0); });
    return () => { live = false; };
  }, [subject]);
  if (threads == null) return null;
  const avg = recentAverage(history, todayStr());
  const lv = levelFor({ threads, avg, floor: readFloor(uid, String(subject).toLowerCase()) });
  writeFloor(uid, String(subject).toLowerCase(), lv.level);
  return <div style={{ padding: "12px 16px 0" }}><LevelCard subjectLabel={subject} lv={lv} p={levelProgress({ threads, avg, floor: lv.level })} compact /></div>;
}
