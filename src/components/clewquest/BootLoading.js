// First-paint loading screen: the island art (webp, high priority) behind "Loading...".
// Deliberately dependency-free (no manifest, no tint code, no Shell) so it is tiny and can be the
// next/dynamic fallback in src/app/page.js: it paints before the large ClaudeApp chunk has downloaded.
const WEBP = "/clewquest/landing/four-islands.webp";
const PNG = "/clewquest/landing/four-islands.png";

export default function BootLoading() {
  return (
    <div data-testid="cq-loading" style={{ minHeight: "100vh", background: "#F4EFE6", display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 480, minHeight: "100vh", overflow: "hidden", background: "linear-gradient(160deg,#F4EFE6 0%,#E4DDD0 55%,#F1ECE2 100%)" }} data-testid="cq-landing-art">
        <picture>
          <source srcSet={WEBP} type="image/webp" />
          <img src={PNG} alt="Four islands joined by a thread, with the Clew in the middle" width={864} height={1184} loading="eager" fetchPriority="high" decoding="async"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", maxWidth: "none" }} />
        </picture>
        <div role="status" data-testid="cq-loading-text" style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", fontWeight: 800, color: "#1B2340" }}>Loading...</div>
      </div>
    </div>
  );
}
