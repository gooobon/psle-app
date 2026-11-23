"use client";
import dynamic from "next/dynamic";

import BootLoading from "@/components/clewquest/BootLoading";

// ssr:false keeps the app browser-only; the island-art loading screen is the fallback so the first paint is never blank.
const ClaudeApp = dynamic(() => import("./ClaudeApp"), { ssr: false, loading: () => <BootLoading /> });

export default function Page() {
  return <ClaudeApp />;
}