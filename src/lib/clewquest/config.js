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
  destinies: [], // stage 6+ costumes and props: data only, add freely (not reachable in Phase 1)
  calendar: { defaultSource: "sg_default", editableBy: ["student", "parent"] },
  economy: { enabled: false }, // cycles, trial, Daily Chest, shop: NOT Phase 1
  nickname: { min: 2, max: 12 },
  lockout: { max: 5, windowMs: 15 * 60 * 1000, lockMs: 15 * 60 * 1000, ipMax: 100 }, // max = attempts per username (6th locks); ipMax = DISTINCT failing usernames per client IP in the same window
};

// Asset keys that exist under public/clewquest (mirrors manifest.json; a self-test checks they agree).
export const ASSET_BASE = "/clewquest";
