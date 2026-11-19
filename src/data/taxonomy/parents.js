// Concept ids that have at least one child in taxonomy.json.
// A leaf (anything not listed here) is a skill. Similar-question lookup matches
// leaves across sections and formats. A parent id is not a skill; if that is all
// the item has, lookup falls back to trap ids.
// Regenerate from taxonomy.json if a parent is added:
//   node -e "..."  (see tools/taxonomy/selftest.js, which checks this list)
export const PARENT_CONCEPT_IDS = [
  "en.grammar",
  "en.language",
  "en.language.editing",
  "en.reading",
  "en.vocab",
  "en.writing",
  "math.geometry",
  "math.measure",
  "math.number",
  "math.stats",
  "sci.cycles",
  "sci.diversity",
  "sci.energy",
  "sci.interactions",
  "sci.systems",
  "zh.ciyu",
  "zh.hanzi",
  "zh.pinyin",
  "zh.reading",
  "zh.writing",
  "zh.yufa"
];
