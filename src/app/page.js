"use client";
import dynamic from "next/dynamic";

// 가상 서버 검사를 완벽하게 끄고(ssr: false) 브라우저에서만 앱을 불러오는 마법의 코드입니다.
const ClaudeApp = dynamic(() => import("./ClaudeApp"), { ssr: false });

export default function Page() {
  return <ClaudeApp />;
}