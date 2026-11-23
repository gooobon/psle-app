"use client";
import React, { useEffect, useState } from "react";
import { tintPixels } from "@/lib/clewquest/tint";
import manifest from "../../../public/clewquest/manifest.json";
import { ASSET_BASE } from "@/lib/clewquest/config";

// Every ClewQuest image goes through here: WebP primary, PNG fallback, English alt text.
export const ASSET_KEYS = new Set(Object.keys(manifest.assets));
const tintCache = new Map();
const inflight = new Map();
// Yarn-body art: stages 1-5, stage-5 characters and the character poses (pets are not yarn).
const isYarnKey = (k) => (k.startsWith("stages/stage-") && !/stage-[678]/.test(k)) || k.startsWith("characters/") || /^poses\/(boy|girl)-/.test(k);
// Stages 1-2 are black balls (the "dark" kind). Stage 3+ art (v2) is crimson yarn, so every coloured stage uses the "red" kind.
const tintKind = (k) => (/^stages\/stage-[12]$/.test(k) ? "dark" : "red");

// Recolour the yarn of one asset on a canvas; resolves to a PNG data URL (cached per asset+colour).
// Loads the small WebP first (about a tenth of the PNG's bytes, so the tint is ready much sooner) and falls back to the PNG.
function tintedUrl(k, a, hex) {
  const ck = k + "|" + hex;
  if (tintCache.has(ck)) return Promise.resolve(tintCache.get(ck));
  if (inflight.has(ck)) return inflight.get(ck);
  const srcs = [a.webp, a.png].filter(Boolean);
  const tryLoad = (i) => new Promise((resolve) => {
    if (i >= srcs.length) return resolve(null);
    const img = new Image();
    img.onload = () => {
      try {
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height);
        tintPixels(d.data, hex, tintKind(k));
        x.putImageData(d, 0, 0);
        resolve(c.toDataURL("image/png"));
      } catch (e) { resolve(tryLoad(i + 1)); }
    };
    img.onerror = () => resolve(tryLoad(i + 1));
    img.src = srcs[i];
  });
  const p = tryLoad(0).then((url) => { if (url) tintCache.set(ck, url); inflight.delete(ck); return url; });
  inflight.set(ck, p);
  return p;
}

// Marble card shown while a tint is being prepared, so a slot is never blank.
const MARBLE = "linear-gradient(160deg,#F4EFE6 0%,#E4DDD0 55%,#F1ECE2 100%)";

// `tint` (hex) recolours only the yarn of yarn-body art (stages 1-5, characters and poses); other art ignores it.
export function Art({ k, alt, style, className, testId, tint, priority }) {
  const a = manifest.assets[k];
  const yarn = !!a && isYarnKey(k);
  const hex = yarn && !/^stages\/stage-[12]$/.test(k) ? tint : null; // stages 1-2 are always black, whatever the tint
  const [done, setDone] = useState(null); // { key, url } (url null = tint failed, show original)
  const [gaveUp, setGaveUp] = useState(null); // tint key we stopped waiting for (never leave the art blank)
  useEffect(() => {
    if (!hex || !a) return undefined;
    let live = true;
    tintedUrl(k, a, hex).then((url) => { if (live) setDone({ key: k + "|" + hex, url }); });
    const timer = setTimeout(() => { if (live) setGaveUp(k + "|" + hex); }, 1200);
    return () => { live = false; clearTimeout(timer); };
  }, [k, hex]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!a) return null;
  const url = hex && done && done.key === k + "|" + hex ? done.url : (hex && tintCache.get(k + "|" + hex)) || null;
  const failed = !!hex && done && done.key === k + "|" + hex && !done.url;
  const pending = !!hex && !url && !failed && gaveUp !== k + "|" + hex; // wait for the tinted image so the old colour never flashes
  const imgStyle = { maxWidth: "100%", height: "auto", ...style };
  const loadAttrs = priority ? { loading: "eager", fetchPriority: "high", decoding: "async" } : null;
  if (url) return <img src={url} alt={alt || ""} width={a.w} height={a.h} className={className} data-testid={testId} data-tint={hex} style={imgStyle} />;
  // Explicit box for the card: an image that has not loaded yet has no size of its own (width:auto + maxHeight would collapse it to nothing).
  const sw = style && style.width, mh = style && style.maxHeight;
  const boxSize = typeof sw === "number" || typeof sw === "string" && sw !== "auto" ? { width: sw } : mh ? { height: mh, width: Math.round((mh * a.w) / a.h) } : { width: a.w };
  if (pending) { // marble card at the art's size right away; the untinted image loads (hidden) underneath and the tint replaces the card
    return (
      <span data-testid={testId ? testId + "-placeholder" : "cq-art-placeholder"} style={{ display: "inline-block", lineHeight: 0, borderRadius: 16, background: MARBLE, maxWidth: "100%", verticalAlign: "bottom", aspectRatio: `${a.w} / ${a.h}`, ...boxSize }}>
        <img src={a.webp || a.png} alt={alt || ""} width={a.w} height={a.h} className={className} data-testid={testId} style={{ ...imgStyle, width: "100%", height: "100%", maxHeight: "none", visibility: "hidden" }} />
      </span>
    );
  }
  return (
    <picture>
      <source srcSet={a.webp} type="image/webp" />
      <img src={a.png || a.webp} alt={alt || ""} width={a.w} height={a.h} className={className} data-testid={testId} style={imgStyle} {...loadAttrs} />
    </picture>
  );
}
export { ASSET_BASE };
