"use client";
import { useEffect, useState } from "react";

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

