"use client";
// Trader's Ship: the Greek warship sails a slow, stately loop (no logo on or above it) in the open sea below the islands; tapping it opens the Phase-2 placeholder shop.
// Nothing can be bought here and there is no payment UI. Reduced motion: the ship stays still at one spot.
import React, { useEffect, useState } from "react";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { cqGet } from "@/lib/clewquest/client";
import { Art, ASSET_KEYS } from "./Art";
import { usePrefersReducedMotion } from "./PoseCycler";
import { SHIP_PATH, shipKeyframes } from "./shipPath";
import { Page, T, FONT, secondaryBtn } from "./Shell";

export { SHIP_PATH, shipKeyframes };

function ShipSvg() {
  return (
    <svg viewBox="0 0 120 80" width="100%" height="100%" role="img" aria-hidden="true" data-testid="cq-ship-svg">
      <path d="M8 46c20 14 84 14 104 0l-8 18c-20 8-68 8-88 0z" fill="#8A5A2B" stroke="#4A2F14" strokeWidth="2" />
      <path d="M8 46c-3-10 2-20 10-24" fill="none" stroke="#8A5A2B" strokeWidth="5" strokeLinecap="round" />
      <path d="M14 52h92" stroke="#D9A52E" strokeWidth="3" strokeDasharray="6 3" />
      <rect x="58" y="8" width="3" height="42" fill="#4A2F14" />
      <path d="M62 10c22 4 28 18 26 32H62z" fill="#fff" stroke="#C8D0DA" strokeWidth="1.5" />
      <path d="M62 24c14 1 22 4 25 9H62z" fill="#C8372D" />
      <rect x="28" y="38" width="14" height="9" rx="2" fill="#D9A52E" stroke="#8A5A2B" strokeWidth="1.5" />
      <ellipse cx="46" cy="40" rx="4" ry="6" fill="#B5562B" />
    </svg>
  );
}

export function SailingShip({ onOpen }) {
  const reduced = usePrefersReducedMotion();
  const loop = CLEWQUEST.ship.loopSeconds;
  const art = CLEWQUEST.ship.art;
  const still = { left: "50%", top: "91.5%", transform: "translate(-50%,-50%)" };
  // Direction: sails left along the near (bottom) arc, right along the far (top) arc. The v2 warship art faces RIGHT (CLEWQUEST.ship.facing), so it is mirrored on the leftward leg.
  const [a, b] = CLEWQUEST.ship.facing === "left" ? [1, -1] : [-1, 1];
  const flip = `@keyframes cq-ship-flip{0%,49.9%{transform:scaleX(${a})}50%,100%{transform:scaleX(${b})}}`;
  return (
    <>
      <style>{`@keyframes cq-ship-loop{${shipKeyframes()}}${flip}@keyframes cq-ship-bob{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-2px) rotate(1deg)}}@keyframes cq-ship-wake{0%{opacity:.55;transform:scaleX(.6)}100%{opacity:0;transform:scaleX(1.4)}}@media (prefers-reduced-motion: reduce){.cq-ship,.cq-ship-flip,.cq-ship-bob,.cq-ship-wake{animation:none !important}}`}</style>
      <button type="button" className="cq-ship" data-testid="cq-ship" data-reduced={reduced ? "1" : "0"} aria-label="Trader's Ship (opens the shop)" onClick={onOpen}
        style={{ position: "absolute", width: 96, height: 66, padding: 0, background: "transparent", border: "none", cursor: "pointer", zIndex: 5, ...(reduced ? still : { animation: `cq-ship-loop ${loop}s linear infinite` }) }}>
        <span className="cq-ship-flip" style={{ display: "block", width: "100%", height: "100%", animation: reduced ? "none" : `cq-ship-flip ${loop}s steps(1,end) infinite` }}>
          <span className="cq-ship-bob" style={{ display: "block", width: "100%", height: "100%", animation: reduced ? "none" : "cq-ship-bob 5s ease-in-out infinite" }}>
            {ASSET_KEYS.has(art) ? <Art k={art} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <ShipSvg />}
          </span>
        </span>
        {!reduced && <span className="cq-ship-wake" aria-hidden="true" style={{ position: "absolute", left: "-10%", right: "-10%", bottom: -3, height: 6, borderRadius: 6, background: "rgba(255,255,255,.7)", animation: "cq-ship-wake 4s ease-out infinite" }} />}
      </button>
    </>
  );
}

// Phase-2 placeholder. Browse only: no buy button, no payment UI. "Ask parent" only explains.
export function ShopScreen({ onBack }) {
  const [bal, setBal] = useState(undefined); // undefined = loading, null = unavailable
  const [explain, setExplain] = useState(false);
  useEffect(() => {
    let live = true;
    cqGet("/api/student/rewards").then((r) => { if (live) setBal(r && r.ok && r.credits ? r.credits.balance : null); });
    return () => { live = false; };
  }, []);
  const groups = [...new Set(CLEWQUEST.shop.items.map((i) => i.group))];
  return (
    <Page testId="cq-shop">
      <div style={{ padding: "18px 18px 40px" }}>
        <button data-testid="cq-shop-back" onClick={onBack} style={{ background: "none", border: "none", fontWeight: 700, cursor: "pointer", color: T.primary, fontFamily: FONT, padding: 0 }}>Back to the islands</button>
        <h1 style={{ fontSize: 24, margin: "10px 0 2px", fontWeight: 800 }}>Trader&apos;s Ship</h1>
        <div style={{ color: T.muted, fontSize: 14 }}>Coming soon: spend your credits on cosmetics. Nothing can be bought yet.</div>
        <div data-testid="cq-shop-balance" style={{ background: "#FBF1D6", borderRadius: 14, padding: "10px 14px", margin: "12px 0", fontWeight: 800 }}>
          Your credits: {bal === undefined ? "..." : bal === null ? "not available yet" : bal}
        </div>
        {groups.map((g) => (
          <div key={g} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 800, color: T.muted, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>{g}</div>
            {CLEWQUEST.shop.items.filter((i) => i.group === g).map((i) => (
              <div key={i.key} data-testid={`cq-shop-item-${i.key}`} style={{ display: "flex", justifyContent: "space-between", background: "#fff", borderRadius: 12, padding: "10px 14px", marginBottom: 6, boxShadow: "0 1px 6px rgba(27,35,64,.08)" }}>
                <span style={{ fontWeight: 700 }}>{i.name}</span><span style={{ fontWeight: 800, color: T.ink }}>{i.credits} credits</span>
              </div>
            ))}
          </div>
        ))}
        <button data-testid="cq-shop-ask-parent" onClick={() => setExplain((v) => !v)} style={secondaryBtn}>Ask parent</button>
        {explain && <div data-testid="cq-shop-ask-note" role="status" style={{ marginTop: 10, background: "#fff", borderRadius: 12, padding: 12, fontSize: 14 }}>Turning credits into pocket money needs your parent&apos;s approval. Talk to your parent about it. Nothing happens in the app.</div>}
      </div>
    </Page>
  );
}
