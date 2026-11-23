"use client";
// Reusable pose cycler: shows `frames` in order, swapping every `intervalMs` with a small bounce. Tap = next pose.
// Pauses while off-screen; under prefers-reduced-motion it shows only the first frame (tap still steps through, with no animation).
// frames: [{ key, transform? }]  key = manifest asset key; a missing key renders nothing (the frame list should be resolved first).
import React, { useEffect, useRef, useState } from "react";
import { Art, ASSET_KEYS } from "./Art";

export function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setR(!!m.matches); on();
    m.addEventListener ? m.addEventListener("change", on) : m.addListener(on);
    return () => { m.removeEventListener ? m.removeEventListener("change", on) : m.removeListener(on); };
  }, []);
  return r;
}

export default function PoseCycler({ frames, intervalMs = 700, alt, tint, height = 220, testId = "cq-pose", assetKeys = ASSET_KEYS }) {
  const list = (frames || []).filter((f) => f && assetKeys.has(f.key));
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tapped, setTapped] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduced || !visible || list.length < 2) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % list.length), intervalMs);
    return () => clearInterval(id);
  }, [reduced, visible, list.length, intervalMs]);
  if (!list.length) return null;
  const idx = reduced && !tapped ? 0 : i % list.length;
  const f = list[idx];
  return (
    <button ref={ref} type="button" data-testid={testId} data-frame={idx} data-count={list.length} aria-label={`${alt || "Pose"}. Tap for the next pose.`}
      onClick={() => { setTapped(true); setI((n) => (n + 1) % list.length); }}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", height, display: "inline-flex", alignItems: "flex-end", justifyContent: "center" }}>
      <style>{`@keyframes cq-pose-in{0%{opacity:.2;transform:translateY(6px) scale(.97)}60%{opacity:1;transform:translateY(-4px) scale(1.02)}100%{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){.cq-pose-frame{animation:none !important;transition:none !important}}`}</style>
      <span key={idx} className="cq-pose-frame" style={{ display: "inline-block", transform: reduced ? "none" : f.transform || "none", transition: reduced ? "none" : "transform .35s ease", animation: reduced ? "none" : "cq-pose-in .45s ease-out" }}>
        <Art k={f.key} alt={alt || ""} tint={tint} style={{ maxHeight: height, width: "auto" }} />
      </span>
    </button>
  );
}
