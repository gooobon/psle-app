"use client";
import React, { useEffect, useState } from "react";
import { tintPixels } from "@/lib/clewquest/tint";
import manifest from "../../../public/clewquest/manifest.json";
import { ASSET_BASE } from "@/lib/clewquest/config";

// Every ClewQuest image goes through here: WebP primary, PNG fallback, English alt text.
export const ASSET_KEYS = new Set(Object.keys(manifest.assets));
const tintCache = new Map();
// Recolour the yarn of one asset on a canvas; resolves to a PNG data URL (cached per asset+colour).
function tintedUrl(k, a, hex) {
  const ck = k + "|" + hex;
  if (tintCache.has(ck)) return Promise.resolve(tintCache.get(ck));
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height);
        tintPixels(d.data, hex, /^stages\/stage-[45]/.test(k) || k.startsWith("characters/") ? "red" : "dark");
        x.putImageData(d, 0, 0);
        const url = c.toDataURL("image/png"); tintCache.set(ck, url); resolve(url);
      } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = a.png || a.webp;
  });
}

// `tint` (hex) recolours only the yarn of yarn-body art (stages 1-5 and characters); other art ignores it.
export function Art({ k, alt, style, className, testId, tint, priority }) {
  const a = manifest.assets[k];
  const yarn = !!a && (k.startsWith("stages/stage-") && !/stage-[678]/.test(k) || k.startsWith("characters/"));
  const hex = yarn ? tint : null;
  const [done, setDone] = useState(null); // { key, url } (url null = tint failed, show original)
  const [gaveUp, setGaveUp] = useState(null); // tint key we stopped waiting for (never leave the art blank)
  useEffect(() => {
    if (!hex || !a) return undefined;
    let live = true;
    tintedUrl(k, a, hex).then((url) => { if (live) setDone({ key: k + "|" + hex, url }); });
    const timer = setTimeout(() => { if (live) setGaveUp(k + "|" + hex); }, 1500);
    return () => { live = false; clearTimeout(timer); };
  }, [k, hex]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!a) return null;
  const url = hex && done && done.key === k + "|" + hex ? done.url : (hex && tintCache.get(k + "|" + hex)) || null;
  const failed = !!hex && done && done.key === k + "|" + hex && !done.url;
  const pending = !!hex && !url && !failed && gaveUp !== k + "|" + hex; // wait for the tinted image so the old colour never flashes
  const imgStyle = { maxWidth: "100%", height: "auto", ...style, ...(pending ? { visibility: "hidden" } : null) };
  const loadAttrs = priority ? { loading: "eager", fetchPriority: "high", decoding: "async" } : null;
  if (url) return <img src={url} alt={alt || ""} width={a.w} height={a.h} className={className} data-testid={testId} data-tint={hex} style={imgStyle} />;
  return (
    <picture>
      <source srcSet={a.webp} type="image/webp" />
      <img src={a.png || a.webp} alt={alt || ""} width={a.w} height={a.h} className={className} data-testid={testId} style={imgStyle} {...loadAttrs} />
    </picture>
  );
}
export { ASSET_BASE };
