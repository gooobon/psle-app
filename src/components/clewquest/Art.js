"use client";
import React from "react";
import manifest from "../../../public/clewquest/manifest.json";
import { ASSET_BASE } from "@/lib/clewquest/config";

// Every ClewQuest image goes through here: WebP primary, PNG fallback, English alt text.
export const ASSET_KEYS = new Set(Object.keys(manifest.assets));
export function Art({ k, alt, style, className, testId }) {
  const a = manifest.assets[k];
  if (!a) return null;
  return (
    <picture>
      <source srcSet={a.webp} type="image/webp" />
      <img src={a.png || a.webp} alt={alt || ""} width={a.w} height={a.h} className={className} data-testid={testId} style={{ maxWidth: "100%", height: "auto", ...style }} />
    </picture>
  );
}
export { ASSET_BASE };
