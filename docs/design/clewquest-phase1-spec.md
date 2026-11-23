# ClewQuest — Phase 1 spec (P3 English + Chinese)

Status: design confirmed by the owner on 2026-11-23. Target: character creation live on **2026-11-27 (SGT)**, implementation done by **2026-11-26** so there is a day for role-play E2E.

Phase 1 is **additive** and lives entirely behind `NEXT_PUBLIC_CLEWQUEST_ENABLED` (default **off**). With the flag off the app must behave exactly as today.

Out of scope here and **must not be touched**: the plain P3 EN/ZH practice go-live tracked in **issue #66** (attempt history, "(2 marks)" parsing, scoring, milestone notify, `Rewards.js` wallet / S$ display, `docs/launch/`).

---

## 0. Hard rules

1. **No Korean anywhere in the app** (UI strings, alt text, asset file names, seed data, test fixtures that render). All in-app copy is English.
2. **No game elements on solve screens.** The question / answer / marking screens stay plain: no character, no thread counter, no animation, no stage-up popup. Thread awards are shown only after leaving the solve flow (result summary or home).
3. Never delete or rewrite existing student data, `progress_snapshots`, or any `genius_*` localStorage key. ClewQuest only reads them or writes new rows / new `clewquest_*` keys.
4. Supabase changes ship as **one new additive migration file** (new tables / columns / policies only, no drops, no renames). The owner applies it by hand.
5. Tests must never connect to the production Supabase project `zehnulwvysvnsshunxzr`. Unit tests use pure functions and mocks; E2E uses a local or explicitly non-prod env and must refuse to run if the Supabase URL contains that ref.
6. Grade and subject are parameters, never hard-coded. Phase 1 data: `grade = "P3"`, subjects `english`, `chinese`. Math and Science exist in config with `status: "coming_soon"`.
7. Everything that is "art" or "economy" is **data-driven** (config tables / JSON) so costumes, props, hair, colours, thresholds and premium art can be added or changed without code changes.
8. Branch + PR only, never push to `main`, do not edit `.github/workflows/`.

---

## 1. Confirmed design decisions (2026-11-23)

| Topic | Decision |
|---|---|
| Logo | **B1** — `public/clewquest/brand/logo-b1.*`, app icon `logo-b1-icon.*`. (B2, B3 not chosen.) |
| Landing | **Option 1: four islands** joined by a thread, Clew hub in the centre — `public/clewquest/landing/four-islands.*`. (Option 2 "four quarters" not chosen.) |
| Stage 1 | A **fully black** yarn ball with eyes only (no cheeks, no mouth). Stage 2 adds legs, stage 3 adds arms. Art redrawn 2026-11-23. |
| Thread colours | 6 colours, default **Ariadne Crimson**. (Attic Clay orange and palettes B/C not chosen.) |
| Hairstyles | 10 styles (5 boy, 5 girl). Girls' default **Ariadne buns**. |
| Destiny costumes / props | Approved, but **config only** so they can be added or changed later. |
| Premium art (stage 7–8) | Not drawn now. Leave an extension slot only (`art_tier`, asset key). |
| Stage unlocks | Stages 2–5 at lifetime thread **25 / 100 / 300 / 700** (configurable defaults). |
| Hint-then-correct | Earns **0.5** thread (correct first try = 1). |
| Stage 6+ (hero, wings, god) | Modelled in data, **not reachable** in Phase 1. |
| Hero / wings reset | Reset **every exam cycle** (WA1, WA2, WA3, EOY). **God** is evaluated at **each semester end**. Data only. |
| Wings trial | Unlocked when the **weekly in-app mock exam** score meets a **cutoff set by the parent**. Data only. |
| WA weeks | Default to the general Singapore school calendar; student or parent can edit later (field kept). Data only. |
| Economy (cycles, trial, Daily Chest, shop) | **Not in Phase 1.** Daily Chest is deferred to Phase 2 with the shop — do not add it. |
| Subjects | P3 English and Chinese only. Math and Science islands show "Coming soon". |

---

## 2. Screens (all behind the flag)

Mobile-first (390×844 reference). English copy only.

### 2.1 Picture-code sign-up and login (student)
- Sign-up: username (existing `normUsername` rules) → choose a **picture code**: pick 4 pictures in order from a 3×3 grid of 9 Greek-themed icons (e.g. owl, lyre, laurel, ship, column, amphora, olive, sun, shield). Confirm by entering it twice. Parents keep their normal email/password login unchanged.
- Login: username → tap the same 4 pictures in order. Show dots for progress, a "Clear" button, no reveal of which picture was wrong.
- Lockout: 5 failed attempts per username per 15 min via existing `lib/rateLimit.js`, then "Ask a parent to help you sign in".
- Parent can reset a child's picture code from the parent area (existing parent_child link).
- Implementation (**assumed, review in PR**): the picture sequence is turned into the Supabase password server-side, e.g. `password = HMAC_SHA256(CLEWQUEST_PICTURE_PEPPER, normUsername + ":" + seq)` inside a new route `src/app/api/auth/student/picture-login/route.js` that reuses `kidEmail()` + `signInWithPassword` like the existing student login and respects `serverAuthEnabled()`. Never store the raw sequence. If the flag is off the route returns 404. Existing username/password student login keeps working (a child can have either).

### 2.2 Character builder (first login after sign-up, or "Edit look" from home)
- Step 1: pick **Boy / Girl** (affects default hair and stage-5 face art only).
- Step 2: pick **hair** (5 tiles for the chosen gender, using `hair/thumb-*.webp`).
- Step 3: pick **thread colour** (6 round swatches with English names).
- Step 4: name your Clew (optional nickname, 2–12 chars, profanity-filtered, English letters/numbers/spaces).
- Preview shows the **stage-5 look** (the "goal" the child grows toward) plus a small current-stage (stage 1) badge with "Start: Yarn Ball". Copy example: "This is you at Stage 5. Every correct answer adds thread!"
- Save → creates the `clewquest_characters` row. Can be edited any time; editing is free in Phase 1.

### 2.3 Four-island landing
- Full-bleed `landing/four-islands.webp`, logo B1 at top.
- Tappable hotspots (percent of image box, tune in PR): top-left **English Island**, bottom-left **Chinese Island**, top-right **Math Island** ("Coming soon"), bottom-right **Science Island** ("Coming soon"), centre **The Clew** (home).
- Islands are driven by the subject config (§3.6): only `status: "open"` subjects navigate; `coming_soon` shows a small toast.
- Tapping an open island goes to the **existing** practice entry for that subject (no new solve UI).

### 2.4 Home with the Clew
- Shows the character at its current stage, the thread ball in the chosen colour, lifetime thread per subject and total, progress bar to the next stage ("42 / 100 thread to Stage 3").
- Stage-up celebration plays here (never on solve screens).
- Links: English Island, Chinese Island, Edit look.
- Locked future stages appear as silhouettes with "Coming later" — stage 6+ never shows unlock progress in Phase 1.

---

## 3. Data model

New tables in one migration, e.g. `supabase/migrations/20261203000000_clewquest_phase1.sql` (timestamp must sort after `20261202000000_parent_marks_into_score.sql`). RLS: student reads/writes own rows; linked parents read (via `parent_child`); service role writes the ledger.

### 3.1 `clewquest_characters`
| column | type | notes |
|---|---|---|
| user_id | uuid PK → profiles.id | one character per student |
| gender | text check in ('boy','girl') | |
| hair_key | text | FK-like to hair config, e.g. `ariadne-buns` |
| colour_key | text | e.g. `ariadne-crimson` |
| nickname | text null | |
| destiny_key | text null | reserved; assigned at stage 6 (not reachable) |
| art_tier | text default 'basic' | extension slot: `basic` / `premium` (premium unused) |
| picture_code_set | boolean default false | true once the picture code exists (no secret stored here) |
| created_at / updated_at | timestamptz | |

### 3.2 `clewquest_thread_ledger` (append-only)
| column | type | notes |
|---|---|---|
| id | bigserial PK | |
| user_id | uuid | |
| grade | text | `P3` |
| subject | text | `english` / `chinese` |
| amount | numeric(6,1) | 1.0 or 0.5 (never negative in Phase 1) |
| reason | text | `correct_first_try` / `correct_after_hint` |
| source_ref | text | question/attempt id; **unique (user_id, source_ref)** for idempotency |
| created_at | timestamptz | |

Lifetime thread per subject = `sum(amount)` grouped by subject; total = sum across subjects. A view `clewquest_thread_totals` may expose this.

### 3.3 `clewquest_stage_state`
| column | type | notes |
|---|---|---|
| user_id | uuid PK | |
| stage | smallint default 1 | derived from lifetime total, cached; highest reachable in Phase 1 = 5 |
| stage_reached_at | jsonb | `{ "2": ts, "3": ts }` |
| hero_cycle_key / wings_cycle_key | text null | reserved (stage 6/7, reset each exam cycle) |
| god_semester_key | text null | reserved (stage 8, per semester) |

### 3.4 `clewquest_calendar` (data only, not used by Phase 1 UI)
| column | type | notes |
|---|---|---|
| user_id | uuid PK | |
| source | text default 'sg_default' | `sg_default` or `custom` |
| wa_weeks | jsonb | `{ "2027": { "WA1": "2027-W09", "WA2": "2027-W19", "WA3": "2027-W33", "EOY": "2027-W43" } }` — editable later by student or parent |
| semester_ends | jsonb | e.g. `{ "2027": ["2027-05-28", "2027-11-19"] }` |
| updated_by | uuid null | who last edited |

### 3.5 `clewquest_parent_rules` (data only)
| column | type | notes |
|---|---|---|
| parent_id, child_id | uuid PK pair | |
| wings_mock_cutoff_pct | smallint null | weekly in-app mock exam cutoff for the wings trial; null = not set |

### 3.6 Config (code, not DB) — `src/lib/clewquest/config.js`
All values below are defaults and must be overridable from one place.

```js
export const CLEWQUEST = {
  grades: { P3: { subjects: {
    english: { status: 'open',        island: 'english' },
    chinese: { status: 'open',        island: 'chinese' },
    math:    { status: 'coming_soon', island: 'math' },
    science: { status: 'coming_soon', island: 'science' },
  } } },
  earn: { correct_first_try: 1, correct_after_hint: 0.5 },
  stages: [
    { stage: 1, key: 'yarn-ball',  minThread: 0,   reachable: true },  // fully black ball with eyes
    { stage: 2, key: 'legs',       minThread: 25,  reachable: true },
    { stage: 3, key: 'arms',       minThread: 100, reachable: true },
    { stage: 4, key: 'colour',     minThread: 300, reachable: true },  // thread takes the chosen colour
    { stage: 5, key: 'face-hair',  minThread: 700, reachable: true },  // face + yarn hair
    { stage: 6, key: 'hero',  reachable: false, rule: { type: 'exam_cycle', resetEach: ['WA1','WA2','WA3','EOY'] } },
    { stage: 7, key: 'wings', reachable: false, rule: { type: 'exam_cycle', resetEach: ['WA1','WA2','WA3','EOY'],
                                                        trial: { kind: 'weekly_mock', cutoff: 'parent_rules.wings_mock_cutoff_pct' } } },
    { stage: 8, key: 'god',   reachable: false, rule: { type: 'semester_end' } },
  ],
  colours: [
    { key: 'ariadne-crimson', name: 'Ariadne Crimson', hex: '#C8372D', default: true },
    { key: 'apollo-gold',     name: 'Apollo Gold',     hex: '#D9A52E' },
    { key: 'athena-olive',    name: 'Athena Olive',    hex: '#6F8A3A' },
    { key: 'raw-flax',        name: 'Raw Flax',        hex: '#E9DFC8' },
    { key: 'tyrian-purple',   name: 'Tyrian Purple',   hex: '#6B1E5C' },
    { key: 'egyptian-blue',   name: 'Egyptian Blue',   hex: '#2449A8' },
  ],
  hair: [
    { key: 'apollo-curls',      name: 'Apollo curls',      gender: 'boy', default: true },
    { key: 'hermes-wind',       name: 'Hermes wind',       gender: 'boy' },
    { key: 'achilles-plume',    name: 'Achilles plume',    gender: 'boy' },
    { key: 'heracles-crop',     name: 'Heracles crop',     gender: 'boy' },
    { key: 'perseus-waves',     name: 'Perseus waves',     gender: 'boy' },
    { key: 'athena-braid',      name: 'Athena braid',      gender: 'girl' },
    { key: 'artemis-tail',      name: 'Artemis tail',      gender: 'girl' },
    { key: 'aphrodite-waves',   name: 'Aphrodite waves',   gender: 'girl' },
    { key: 'persephone-wreath', name: 'Persephone wreath', gender: 'girl' },
    { key: 'ariadne-buns',      name: 'Ariadne buns',      gender: 'girl', default: true },
  ],
  destinies: [ /* stage 6+ costumes & props, data only; add/change freely.
    { key: 'athena', costume: 'olive-chiton', prop: 'owl',  artTier: { basic: 'stages/stage-6-{gender}', premium: null } }, ... */ ],
  calendar: { defaultSource: 'sg_default', editableBy: ['student','parent'] },
  economy: { enabled: false }, // cycles, trial, Daily Chest, shop: NOT Phase 1 (Daily Chest -> Phase 2 with shop)
};
```

Boy default hair is assumed to be Apollo curls (owner only named the girls' default).

### 3.7 Where thread is earned
A single server function `awardThread({ userId, grade, subject, sourceRef, usedHint })` called **after** an answer is marked correct in the existing practice flow (hook into the completion/result path, not the solve UI). Idempotent via `source_ref`. Wrong answers award nothing and nothing is ever deducted. When the flag is off, it is a no-op. Do not change how existing scoring or attempt history work (issue #66 area).

### 3.8 Local storage
Only new keys prefixed `clewquest_` (e.g. a cached character for offline display). Never read-modify-write or clear `genius_*` keys.

---

## 4. Assets (`public/clewquest/`)

`manifest.json` lists every asset with webp/png paths and size. WebP is primary; PNG is a fallback.

| Folder | Files | Notes |
|---|---|---|
| `brand/` | `logo-b1`, `logo-b1-icon` | 512 px, transparent |
| `landing/` | `four-islands` | 864×1184 |
| `stages/` | `stage-1` … `stage-4`, `stage-{5..8}-{boy,girl}` | 1–3: fully black redraw (eyes only); 4–8 cut from the evo8 sheet, transparent, old threshold labels removed. 6–8 are placeholders (unreachable). |
| `characters/` | `stage5-{boy,girl}-{hairKey}` | full-body stage-5 look per hair (crimson) — builder preview |
| `hair/` | `thumb-{hairKey}`, `hair-sheet-{boys,girls}` | head thumbnails for tiles; reference sheets |
| `colours/` | `thread-colours-swatch` | reference sheet of the 6 colours (UI swatches should use the hex values) |

Colour variants: Phase 1 art is crimson only. For other colours either (a) pre-render recoloured variants offline into `public/clewquest/characters/` (keyed `stage5-{gender}-{hair}-{colour}`) with a luminance-preserving recolour that masks skin, eyes and sandals, or (b) show crimson art plus the chosen colour on the thread ball/UI until variants exist. The asset resolver must fall back gracefully to crimson.

Known art follow-ups (owner will redraw in Gemini):
- Cut-outs have slight edge fringes; stage 8 wings are clipped by the original panel frame.
- Premium stage 7–8 art: not done; slot only (`art_tier = 'premium'`).

---

## 5. Self-tests (required in the implementation PR)

- Unit: stage from lifetime total (0→1, 24.5→1, 25→2, 99.5→2, 100→3, 300→4, 700→5, 10 000→5 — never 6+); earn amounts (1 / 0.5 / 0); ledger idempotency; config validation (exactly one default colour, one default hair per gender, unique keys, every hair/colour has assets or a fallback); picture-code derivation is deterministic and differs per username; lockout after 5 failures.
- Flag off: ClewQuest routes 404, no new UI, `awardThread` no-op, existing pages unchanged (snapshot or E2E smoke).
- Lint check: no Hangul (`[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]`) in `src/`, `public/clewquest/manifest.json` or rendered strings.
- Solve-screen guard: test that the solve/question components render no ClewQuest elements.
- Safety guard: test runner fails fast if `SUPABASE_URL` contains `zehnulwvysvnsshunxzr`.
- E2E (Playwright, non-prod env only): sign up with picture code → builder → landing → English island opens existing practice → answer correctly → home shows +1 thread.

---

## 6. Extension slots (not built in Phase 1)
- `art_tier` + per-stage asset keys for premium art.
- `destinies[]` config for stage-6 costumes and props.
- Stage 6–8 rules (exam-cycle reset for hero/wings; semester end for god; wings trial = weekly mock ≥ parent cutoff).
- `clewquest_calendar` (Singapore default WA weeks, editable later) and `clewquest_parent_rules.wings_mock_cutoff_pct`.
- `economy.enabled` for Phase 2 (cycles, trial, Daily Chest with the shop).
- Math / Science subjects and other grades via config.
