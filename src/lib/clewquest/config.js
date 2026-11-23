// ClewQuest Phase 1 config (docs/design/clewquest-phase1-spec.md section 3.6). Every value is a default overridable from this one place.
// Flag: NEXT_PUBLIC_CLEWQUEST_ENABLED (default off). Also needs NEXT_PUBLIC_SERVER_AUTH (students are server accounts).
export function clewquestEnabled() {
  return process.env.NEXT_PUBLIC_CLEWQUEST_ENABLED === "true";
}

export const CLEWQUEST = {
  defaultGrade: "P3",
  grades: { P3: { subjects: {
    english: { status: "open", island: "english", label: "English Island", appSubject: "English" },
    chinese: { status: "open", island: "chinese", label: "Chinese Island", appSubject: "Chinese" },
    math: { status: "coming_soon", island: "math", label: "Math Island", appSubject: "Math" },
    science: { status: "coming_soon", island: "science", label: "Science Island", appSubject: "Science" },
  } } },
  earn: { correct_first_try: 1, correct_after_hint: 0.5 },
  stages: [
    { stage: 1, key: "yarn-ball", name: "Yarn Ball", minThread: 0, reachable: true },
    { stage: 2, key: "legs", name: "Legs", minThread: 25, reachable: true },
    { stage: 3, key: "arms", name: "Arms", minThread: 100, reachable: true },
    { stage: 4, key: "colour", name: "Colour", minThread: 300, reachable: true },
    { stage: 5, key: "face-hair", name: "Face and Hair", minThread: 700, reachable: true },
    // Stage 6+ is data only in Phase 1: never reachable, never shown as progress.
    { stage: 6, key: "hero", reachable: false, rule: { type: "exam_cycle", resetEach: ["WA1", "WA2", "WA3", "EOY"] } },
    { stage: 7, key: "wings", reachable: false, rule: { type: "exam_cycle", resetEach: ["WA1", "WA2", "WA3", "EOY"], trial: { kind: "weekly_mock", cutoff: "parent_rules.wings_mock_cutoff_pct" } } },
    { stage: 8, key: "god", reachable: false, rule: { type: "semester_end" } },
  ],
  // Art key per stage (data-driven): drop new files + manifest.json entries under these keys to swap the art.
  // Stages 1-2 are ALWAYS black (never tinted); the student's colour first appears at stage 3 / arms, 100 threads (colourFromStage).
  stageArt: { 1: "stages/stage-1", 2: "stages/stage-2", 3: "stages/stage-3", 4: "stages/stage-4" },
  colourFromStage: 3,
  colours: [
    { key: "ariadne-crimson", name: "Ariadne Crimson", hex: "#C8372D", default: true },
    { key: "apollo-gold", name: "Apollo Gold", hex: "#D9A52E" },
    { key: "athena-olive", name: "Athena Olive", hex: "#6F8A3A" },
    { key: "raw-flax", name: "Raw Flax", hex: "#E9DFC8" },
    { key: "tyrian-purple", name: "Tyrian Purple", hex: "#6B1E5C" },
    { key: "egyptian-blue", name: "Egyptian Blue", hex: "#2449A8" },
  ],
  hair: [
    { key: "apollo-curls", name: "Apollo curls", gender: "boy", default: true },
    { key: "hermes-wind", name: "Hermes wind", gender: "boy" },
    { key: "achilles-plume", name: "Achilles plume", gender: "boy" },
    { key: "heracles-crop", name: "Heracles crop", gender: "boy" },
    { key: "perseus-waves", name: "Perseus waves", gender: "boy" },
    { key: "athena-braid", name: "Athena braid", gender: "girl" },
    { key: "artemis-tail", name: "Artemis tail", gender: "girl" },
    { key: "aphrodite-waves", name: "Aphrodite waves", gender: "girl" },
    { key: "persephone-wreath", name: "Persephone wreath", gender: "girl" },
    { key: "ariadne-buns", name: "Ariadne buns", gender: "girl", default: true },
  ],
  // Myth-item level ladder, per subject island. Ordered, never goes down. `threads` = lifetime threads on that subject;
  // `minAvg` = last-2-week average % (null = no accuracy gate). `icon` is a manifest key under levels/ (graceful SVG fallback if missing).
  levels: [
    { lv: 1, key: "hermes-sandals", name: "Hermes' Sandals", threads: 0, minAvg: null, icon: "levels/lv1-hermes-sandals" },
    { lv: 2, key: "apollo-lyre", name: "Apollo's Lyre", threads: 30, minAvg: null, icon: "levels/lv2-apollo-lyre" },
    { lv: 3, key: "heracles-lion-hood", name: "Heracles' Lion Hood", threads: 80, minAvg: null, icon: "levels/lv3-heracles-lion-hood" },
    { lv: 4, key: "medusa-shield", name: "Medusa Shield", threads: 160, minAvg: null, icon: "levels/lv4-medusa-shield" },
    { lv: 5, key: "athena-helm", name: "Athena's Helm", threads: 300, minAvg: 75, icon: "levels/lv5-athena-helm" },
    { lv: 6, key: "poseidon-trident", name: "Poseidon's Trident", threads: 500, minAvg: 80, icon: "levels/lv6-poseidon-trident" },
    { lv: 7, key: "zeus-thunderbolt", name: "Zeus' Thunderbolt", threads: 800, minAvg: 85, icon: "levels/lv7-zeus-thunderbolt" },
  ],
  levelWindowDays: 14,
  // Profile pose cycling. `{hair}` / `{n}` are filled in; frames missing from manifest.json fall back to the placeholder transforms.
  poses: { count: 6, intervalMs: 700, character: { girl: "poses/girl-{hair}-{n}", boy: "poses/boy-{hair}-{n}" }, pets: [
    { key: "owl", name: "Athena's owlet", frames: "poses/pet-owl-{n}" },
    { key: "pegasus", name: "Pegasus foal", frames: "poses/pet-pegasus-{n}" },
  ] },
  // Trader's Ship (landing). Phase-2 placeholder: browse only, nothing can be bought. `shopEnabled` shows the placeholder view.
  ship: { art: "ship/treasure-ship", loopSeconds: 60, shopEnabled: true },
  shop: { items: [
    { key: "hair-laurel", group: "Hair accessories", name: "Gold laurel band", credits: 20 },
    { key: "hair-ribbon", group: "Hair accessories", name: "Crimson ribbon", credits: 12 },
    { key: "colour-tyrian", group: "Thread colours", name: "Tyrian purple thread", credits: 30 },
    { key: "colour-flax", group: "Thread colours", name: "Raw flax thread", credits: 15 },
    { key: "pet-owl", group: "Pets", name: "Athena's owlet", credits: 60 },
    { key: "pet-pegasus", group: "Pets", name: "Pegasus foal", credits: 80 },
    { key: "decor-olive", group: "Island decor", name: "Olive tree", credits: 25 },
    { key: "decor-amphora", group: "Island decor", name: "Painted amphora", credits: 18 },
  ] },
  destinies: [], // stage 6+ costumes and props: data only, add freely (not reachable in Phase 1)
  calendar: { defaultSource: "sg_default", editableBy: ["student", "parent"] },
  economy: { enabled: false }, // cycles, trial, Daily Chest, shop: NOT Phase 1
  nickname: { min: 2, max: 24 },
  // Builder tabs. Only tabs with `enabled: true` are usable; Eyes/Brows/Mouth/Skin wait for part art (enable them here when it exists).
  builder: { tabs: [
    { key: "hair", label: "Hair", enabled: true },
    { key: "eyes", label: "Eyes", enabled: false },
    { key: "brows", label: "Brows", enabled: false },
    { key: "mouth", label: "Mouth", enabled: false },
    { key: "skin", label: "Skin", enabled: false },
  ] },
  lockout: { max: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000, ipMax: 100 }, // max = attempts per username (6th locks); ipMax = DISTINCT failing usernames per client IP in the same window
};

// Asset keys that exist under public/clewquest (mirrors manifest.json; a self-test checks they agree).
export const ASSET_BASE = "/clewquest";
