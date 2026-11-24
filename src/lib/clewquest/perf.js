// Boot timing: marks from page start to the island art being visible. Console only, no network.
export function markIsland(name) {
  try {
    if (typeof performance === "undefined" || !performance.mark) return;
    if (performance.getEntriesByName("cq:" + name).length) return;
    performance.mark("cq:" + name);
    if (name === "islands-visible") {
      performance.measure("cq:boot-to-islands", { start: 0, end: performance.now() });
      const m = performance.getEntriesByName("cq:boot-to-islands").pop();
      if (m) console.info("[clewquest] boot to islands visible: " + Math.round(m.duration) + " ms");
    }
  } catch {}
}
