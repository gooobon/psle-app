"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeniusAdaptiveEngine from "@/components/GeniusAdaptiveEngine";

// The generator calls admin-only /api/generate. Students reach practice from Today, not this page.
export default function AdaptivePage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        if (j && j.admin === true) setAllowed(true);
        else router.replace("/");
      })
      .catch(() => { if (alive) router.replace("/"); });
    return () => { alive = false; };
  }, [router]);

  if (!allowed) return null;
  return <GeniusAdaptiveEngine />;
}
