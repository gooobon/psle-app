"use client";
import React from "react";

/**
 * SplitViewLayout — responsive dual-panel container
 *
 * Mobile  : stacked vertically (passage ~40 vh, then questions scroll below)
 * Desktop (md+): side-by-side, left 45% / right 55%, each panel scrolls
 *                independently within the viewport.
 *
 * Props
 *   leftContent   — ReactNode for the passage panel
 *   rightContent  — ReactNode for the questions panel
 *   leftLabel     — strip label for left panel  (default "Passage")
 *   rightLabel    — strip label for right panel (default "Questions")
 *   headerHeight  — px height of the fixed app header (default 80)
 */
export default function SplitViewLayout({
  leftContent,
  rightContent,
  leftLabel    = "Passage",
  rightLabel   = "Questions",
  headerHeight = 80,
}) {
  const vh = `calc(100vh - ${headerHeight}px)`;

  return (
    /*
     * Outer wrapper:
     *   mobile  — normal block flow (panels stack, page scrolls)
     *   desktop — fixed-height flex row, each child scrolls on its own
     */
    <div className="flex flex-col md:flex-row md:overflow-hidden" style={{ height: vh }}>

      {/* ── Left: passage ─────────────────────────────────── */}
      <div
        className="
          w-full md:w-[45%]
          h-[38vh] md:h-full
          overflow-y-auto
          border-b md:border-b-0 md:border-r border-slate-200
          bg-blue-50
          shrink-0
        "
      >
        <PanelShell label={leftLabel} icon="📖" accent="#1D4ED8" bg="#EFF6FF" border="#BFDBFE">
          {leftContent}
        </PanelShell>
      </div>

      {/* ── Right: questions ──────────────────────────────── */}
      <div
        className="
          w-full md:w-[55%]
          flex-1 md:flex-none md:h-full
          overflow-y-auto
          bg-slate-50
        "
      >
        <PanelShell label={rightLabel} icon="✏️" accent="#475569" bg="#F8FAFC" border="#E2E8F0">
          {rightContent}
        </PanelShell>
      </div>

    </div>
  );
}

/* ── Sticky label strip + scrollable body ──────────────────── */
function PanelShell({ label, icon, accent, bg, border: borderClr, children }) {
  return (
    <div className="flex flex-col min-h-full">
      <div
        className="sticky top-0 z-10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest border-b shrink-0"
        style={{ background: bg, color: accent, borderColor: borderClr }}
      >
        {icon} {label}
      </div>
      <div className="p-4 pb-24">
        {children}
      </div>
    </div>
  );
}
