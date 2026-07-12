/* ============================================================
   generate_wa1_zh.js  (P3 Chinese WA1 - Step 3, Part A)
   Offline content generator. Runs on the user's machine with an
   Anthropic API key (env ANTHROPIC_API_KEY or .env.local). Builds
   few-shot examples from seed_zh_all.json, generates practice sets
   one at a time with a guardrail prompt, and validates each set
   with zh_wa1_validate.js (requireExplain) before accepting it.
   Retries with validator feedback until PASS or attempts exhausted.

   Usage (from repo root, PowerShell):
     node generate_wa1_zh.js --from 1 --to 3          (pilot S01..S03)
     node generate_wa1_zh.js --from 1 --to 60         (full run later)
     node generate_wa1_zh.js --from 1 --to 1 --dry-run  (print prompt only)

   Options:
     --seeds <file>   seed file (default seed_zh_all.json)
     --out <file>     output file (default wa1_zh_complete.json)
     --model <id>     model (default claude-sonnet-4-6)
     --attempts <n>   max attempts per set (default 4)
     --dry-run        assemble and print the prompt for the first set, no API call

   Output: an array of ZhPracticeSet in <out>. If <out> already exists,
   existing sets are kept and only missing setIds are generated (resume).
   ASCII-only source; Chinese appears only via runtime data or \u escapes.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const { validatePracticeSets } = require('./zh_wa1_validate.js');

/* ---------------- args ---------------- */
function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  if (i === -1) return dflt;
  const v = process.argv[i + 1];
  return (v === undefined || v.startsWith('--')) ? true : v;
}
const FROM = parseInt(arg('from', '1'), 10);
const TO = parseInt(arg('to', '3'), 10);
const SEED_FILE = String(arg('seeds', 'seed_zh_all.json'));
const OUT_FILE = String(arg('out', 'wa1_zh_complete.json'));
const MODEL = String(arg('model', 'claude-sonnet-4-6'));
const MAX_ATTEMPTS = parseInt(arg('attempts', '4'), 10);
const DRY_RUN = arg('dry-run', false) === true;
const NO_REVIEW = arg('no-review', false) === true;

/* ---------------- api key ---------------- */
function loadApiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  for (const f of ['.env.local', '.env']) {
    if (!fs.existsSync(f)) continue;
    const txt = fs.readFileSync(f, 'utf8');
    const m = txt.match(/^\s*ANTHROPIC_API_KEY\s*=\s*"?([^"\r\n]+)"?\s*$/m);
    if (m) return m[1].trim();
  }
  return null;
}

/* ---------------- band / theme plan ---------------- */
function bandFor(n) { return n <= 20 ? 'easy' : (n <= 40 ? 'mid' : 'hard'); }
const THEMES = [
  'wishes and dreams', 'family and friends', 'my companions', 'wonderful changes',
  'school life', 'helping others', 'a day at the park', 'healthy habits',
  'being honest', 'animals around us', 'rainy day', 'a small kindness',
];
function themeFor(n) { return THEMES[(n - 1) % THEMES.length]; }
function setIdFor(n) { return 'ZS' + String(n).padStart(2, '0'); }

/* ---------------- few-shot from seeds ---------------- */
/* Convert raw seed sections to the plan-shaped items the generator must
   output, then pick a small number of exemplary items per section type. */
function mcqItems(items, seedId, prefix, topic) {
  return items.map(q => ({
    id: seedId + '_' + prefix + q.num, topic,
    sentence: q.sentence, options: q.options, answer: q.answer0,
    lesson: q.lesson, skill: q.skill,
    explain: q.explain,
    explanation: q.explain ? q.explain.why + ' ' + q.explain.memoryTip : undefined,
  }));
}
function matchSet(sec, seedId, sid) {
  return {
    id: seedId + '_' + sid, instruction: sec.instruction || 'match', pool: sec.pool,
    items: sec.items.map(it => ({
      num: it.num, stem: it.stem, answer: it.answer0, lesson: it.lesson, skill: it.skill,
      explain: it.explain, explanation: it.explain ? it.explain.why : undefined,
    })),
  };
}
function collectExamples(all) {
  const ex = { HanziMcq: [], PinyinMcq: [], VocabMcq: [], VocabMatch: null, SentenceCraft: [], PassageCloze: null, ReadingMcq: null, ReadingOpen: null };
  for (const s of all.seeds) {
    const S = s.raw.sections || {};
    if (ex.HanziMcq.length < 2 && S.HanziMcq) ex.HanziMcq.push(...mcqItems(S.HanziMcq.items.slice(0, 2 - ex.HanziMcq.length), s.seedId, 'A', 'HanziMcq'));
    if (ex.PinyinMcq.length < 2 && S.PinyinMcq) ex.PinyinMcq.push(...mcqItems(S.PinyinMcq.items.slice(0, 2 - ex.PinyinMcq.length), s.seedId, 'B', 'PinyinMcq'));
    if (ex.VocabMcq.length < 2 && S.VocabMcq) ex.VocabMcq.push(...mcqItems(S.VocabMcq.items.slice(0, 2 - ex.VocabMcq.length), s.seedId, 'C', 'VocabMcq'));
    if (!ex.VocabMatch && S.VocabMatch) ex.VocabMatch = matchSet(S.VocabMatch, s.seedId, 'D');
    if (ex.SentenceCraft.length < 1 && S.SentenceCraft) {
      const q = S.SentenceCraft.items[0];
      ex.SentenceCraft.push({
        id: s.seedId + '_E' + q.num, subtype: q.subtype, connector: q.connector,
        sentenceA: q.sentenceA, sentenceB: q.sentenceB, instruction: q.instruction,
        answer: q.answer, marks: q.marks, lesson: q.lesson, skill: q.skill,
        explain: q.explain,
        explanation: q.explain ? q.explain.why + ' ' + q.explain.memoryTip : undefined,
      });
    }
    if (!ex.PassageCloze && S.PassageCloze) ex.PassageCloze = {
      id: s.seedId + '_F', passage: S.PassageCloze.passage, wordBank: S.PassageCloze.wordBank,
      blanks: S.PassageCloze.blanks.map(b => ({ num: b.num, answer: b.answer, lesson: b.lesson, skill: b.skill, explain: b.explain, explanation: b.explain ? b.explain.why : undefined })),
    };
    if (!ex.ReadingMcq && S.ReadingMcq) ex.ReadingMcq = {
      id: s.seedId + '_G', passage: S.ReadingMcq.passage,
      questions: S.ReadingMcq.questions.filter(q => (q.format || 'mcq') === 'mcq').slice(0, 2)
        .map((q, i) => ({ id: s.seedId + '_G' + (i + 1), format: 'mcq', stem: q.stem, options: q.options, answer: q.answer0, lesson: q.lesson, skill: q.skill, explain: q.explain })),
    };
    if (!ex.ReadingOpen && S.ReadingOpen) ex.ReadingOpen = {
      id: s.seedId + '_H', passage: S.ReadingOpen.passage,
      questions: S.ReadingOpen.questions.slice(0, 2).map((q, i) => {
        const o = { id: s.seedId + '_H' + (i + 1), format: q.format || 'open_sentence', stem: q.stem, marks: q.marks, lesson: q.lesson, skill: q.skill };
        o.answer = q.answer; if (q.explain) o.explain = q.explain; return o;
      }),
    };
  }
  return ex;
}

/* ---------------- prompt ---------------- */
const CHECK = '\u2713 \u6b63\u786e\u7b54\u6848';           /* "check correct answer" label */
function systemPrompt() {
  return [
    'You are an expert Singapore MOE Primary 3 Higher Chinese (HCL) exam item writer.',
    'You produce practice sets for Weighted Assessment 1 (WA1), which covers ONLY',
    'textbook lessons 1 to 4 of the P3 HCL curriculum (semester 1 first half).',
    'You output ONLY a single JSON object. No markdown fences, no commentary.',
    '',
    'HARD RULES (a validator rejects any violation):',
    '1. Every item has integer field lesson between 1 and 4. Use ONLY vocabulary a',
    '   P3 HCL student has met by lesson 4; no advanced/WA2 vocabulary.',
    '2. skill must be one of: xingjinzi tongyinzi duoyinzi shengdiao shengmu_yunmu',
    '   dapei jinyici lianci liangci yufa detail inference sequence main_idea vocab_in_context.',
    '3. Every auto-graded item carries explain = {why, distractors, trapType, memoryTip}',
    '   written in simple Chinese a P3 pupil understands, plus a composed plain-text',
    '   explanation string (why + space + memoryTip).',
    '   - For MCQ items: distractors array length MUST equal options length; the entry',
    '     at the answer index starts with "' + CHECK + '\uff1a".',
    '   - For match/cloze blanks: distractors may be [] for cloze, but for match sets',
    '     distractors length MUST equal pool length.',
    '4. MCQ options length is 3 or 4; answer is the 0-based index; vary the answer position.',
    '5. PassageCloze passage marks blanks as "(n) ___" (3+ underscores); number of',
    '   markers MUST equal number of blanks; every blank answer MUST be in wordBank;',
    '   wordBank has exactly one unused extra word.',
    '6. VocabMatch: pool has 6 entries, items has 5; each pool entry used at most once;',
    '   each stem marks the gap with EXACTLY ONE full-width parentheses pair and',
    '   nothing else (never combine underscores and parentheses in one stem).',
    '7. SentenceCraft: subtype combine requires sentenceA and sentenceB; the model',
    '   answer MUST contain every part of the connector; skill is lianci; marks 2.',
    '8. ReadingMcq questions are format "mcq" only (options 3..4, answer 0-based index).',
    '9. ReadingOpen questions are format "fill_word" or "open_sentence"; a fill_word',
    '   answer MUST appear verbatim inside the passage; open_sentence carries a model',
    '   answer in a full sentence. Passages are 120-200 characters, original stories',
    '   (never copied from textbooks), natural Singapore school-life settings.',
    '10. All ids inside the set start with the given setId. All content Chinese is',
    '    simplified. Pinyin uses tone marks (e.g. xi\u0101ng x\u00ecn), not tone numbers.',
    '11. Trap coverage: across the set use a healthy mix of trap types; include at',
    '    least one liangci item and at least one duoyinzi item in PinyinMcq/VocabMcq.',
    '12. Every plan section field "items" MUST be a JSON ARRAY. Sections whose',
    '    description says "1 ZhMatchSet/ZhClozeSet/ZhCompSet" still wrap the single',
    '    container object in an array: "items": [ { ... } ]. Never leave the',
    '    skeleton description string in place.',
    '13. SINGLE-ANSWER GUARANTEE: for every MCQ, exactly ONE option fits the',
    '    sentence; re-read each distractor in place and make sure it is clearly',
    '    wrong (wrong meaning, wrong collocation, or ungrammatical) for THIS',
    '    sentence. Never use two near-synonyms that both fit (e.g. nuli/renzhen',
    '    both fitting "very ___" is invalid). All options must be distinct strings.',
    '14. CLOZE SINGLE-FIT: in PassageCloze, each blank must accept exactly one',
    '    wordBank word; never put two interchangeable near-synonyms in the same',
    '    bank (e.g. gaoxing and kaixin). After writing, re-read the completed',
    '    passage with your answers inserted and confirm every sentence is natural.',
    '15. VOCABULARY LEVEL: everyday P3 words only. NO chengyu or four-character',
    '    idioms, no literary or rare characters. If a P3 pupil in lesson 1-4 would',
    '    not have written the word, do not use it, and NEVER test it as an answer.',
    '16. PinyinMcq: the sentence marks the target as {u}word{/u} exactly (both',
    '    braces, closing {/u}); all pinyin options are distinct; avoid words whose',
    '    tone changes by sandhi (words containing yi or bu).',
    '17. Measure-word (liangci) items appear ONLY in VocabMcq with skill liangci,',
    '    never in HanziMcq.',
    '18. BLANK COMPLETENESS: reading the sentence with the answer inserted must give',
    '    a complete natural sentence. Never blank one character out of a two-character',
    '    word unless the other character is printed right next to the blank',
    '    (write hao peng ______ [you], never hao ______ alone).',
    '19. DECOY RULE: the one unused extra word in a VocabMatch pool and in a cloze',
    '    wordBank must NOT fit any stem or blank. Test the decoy in every slot; if it',
    '    reads naturally anywhere, replace the decoy with one that fits nowhere.',
    '20. PINYIN ANSWER KEYS: verify every syllable of the correct pinyin option',
    '    against the standard dictionary reading, including tone (e.g. da ying:',
    '    ying is 4th tone in da ying, never 1st). A wrong key is the worst defect.',
    '18. CRITICAL JSON SAFETY: inside string values NEVER use the ASCII double quote',
    '    character. When quoting a Chinese word or speech, use the full-width quotes',
    '    \u201C and \u201D exactly like the examples (e.g. \u201C\u613f\u671b\u201D). An ASCII quote breaks the JSON.',
  ].join('\n');
}
function userPrompt(setId, band, theme, fewshot) {
  const spec = {
    setId, theme, track: 'HCL', band, seedSources: ['generated_v1'],
    plan: [
      { type: 'HanziMcq', marks: 5, items: '5 ZhMcqItem: pick the correct character for the blank; traps xingjinzi/tongyinzi' },
      { type: 'PinyinMcq', marks: 4, items: '4 ZhMcqItem: sentence marks the target word as {u}word{/u}; options are pinyin; traps shengmu_yunmu/shengdiao/duoyinzi (>=1 duoyinzi)' },
      { type: 'VocabMcq', marks: 5, variant: 'mcq4', items: '5 ZhMcqItem: choose the right word; traps jinyici/dapei/vocab_in_context/liangci (>=1 liangci)' },
      { type: 'VocabMatch', marks: 5, items: '1 ZhMatchSet: pool of 6, 5 items, skill dapei' },
      { type: 'SentenceCraft', marks: 4, items: '2 ZhCraftItem: subtype combine with a paired connector, skill lianci' },
      { type: 'PassageCloze', marks: 5, items: '1 ZhClozeSet: passage 100-160 chars, 5 blanks, wordBank 6' },
      { type: 'ReadingMcq', marks: 3, items: '1 ZhCompSet: passage 120-200 chars, 3 mcq questions (detail/inference/main_idea)' },
      { type: 'ReadingOpen', marks: 6, items: '1 ZhCompSet: fresh passage 120-200 chars, 3 questions: 1 fill_word (marks 2) + 2 open_sentence (marks 2 each)' },
    ],
  };
  return [
    'Generate ONE complete ZhPracticeSet as JSON with exactly this skeleton and',
    'section order. Replace each items description with real items. Difficulty band: '
      + band + ' (easy = straightforward lesson-1..4 items; mid = trickier traps; hard = subtle traps, longer passages).',
    'Theme of the set: ' + theme + '.',
    '',
    'SKELETON (fill in; keep type/marks/variant exactly):',
    JSON.stringify(spec, null, 1),
    '',
    'FORMAT EXAMPLES taken from real vetted seeds (mimic structure, style, explain',
    'depth EXACTLY; do NOT copy their content):',
    JSON.stringify(fewshot, null, 1),
    '',
    'Output the JSON object only.',
  ].join('\n');
}

/* ---------------- content post-checks ----------------
   Mechanical defects the schema validator does not cover but that the pilot
   audit surfaced: duplicate MCQ options, broken {u}..{/u} markers, and
   measure-word items mis-tagged outside skill liangci. Returned as extra
   retryable fail messages. */
function postCheck(set) {
  const fails = [];
  const MW = ['\u672c','\u5f20','\u6761','\u53ea','\u5757','\u68f5','\u7c92','\u7bee','\u904d','\u4ef6','\u652f','\u53cc','\u675f'];
  if (!set || !Array.isArray(set.plan)) return fails;
  for (const sec of set.plan) {
    if (!Array.isArray(sec.items)) continue;
    if (['HanziMcq', 'PinyinMcq', 'VocabMcq'].includes(sec.type) && sec.variant !== 'pool') {
      for (const q of sec.items) {
        if (!q || !Array.isArray(q.options)) continue;
        if (new Set(q.options).size !== q.options.length)
          fails.push(q.id + ': duplicate options ' + JSON.stringify(q.options) + ' - all options must be distinct');
        if (sec.type === 'PinyinMcq') {
          const o = (String(q.sentence).match(/\{u\}/g) || []).length;
          const c = (String(q.sentence).match(/\{\/u\}/g) || []).length;
          if (o !== 1 || c !== 1)
            fails.push(q.id + ': sentence must contain exactly one {u}word{/u} marker, got: ' + q.sentence);
        }
        const looksLiangci = q.options.length >= 3 && q.options.every(op => String(op).length <= 2 && MW.some(m => String(op).includes(m)));
        if (looksLiangci && sec.type !== 'VocabMcq')
          fails.push(q.id + ': measure-word options belong in VocabMcq with skill liangci, not ' + sec.type);
        if (looksLiangci && sec.type === 'VocabMcq' && q.skill !== 'liangci')
          fails.push(q.id + ': measure-word item must have skill liangci, got ' + q.skill);
        if (q.explain && Array.isArray(q.explain.distractors)) {
          q.explain.distractors.forEach((t, i) => {
            const has = String(t).includes('\u2713');
            if (has && i !== q.answer)
              fails.push(q.id + ': check-mark is on option ' + i + ' but answer index is ' + q.answer
                + ' - the answer index and the check-marked distractor entry MUST agree; verify which option is truly correct');
            if (!has && i === q.answer)
              fails.push(q.id + ': the distractor entry at the answer index must start with the check-mark convention');
          });
          const SELF = ['\u7b49\u7b49\uff0c', '\u91cd\u65b0\u770b', '\u4e0d\u5bf9\uff0c'];
          const blob = String(q.explain.why) + ' ' + q.explain.distractors.join(' ');
          if (SELF.some(p => blob.includes(p)))
            fails.push(q.id + ': explanation contains self-correction narration; decide the answer first, then write a clean final explanation');
        }
      }
    }
    if (sec.type === 'VocabMatch' || (sec.type === 'VocabMcq' && sec.variant === 'pool')) {
      const box = sec.items[0];
      if (box && Array.isArray(box.items)) {
        for (const it of box.items) {
          const stem = String(it.stem || '');
          const hasUnders = /_{3,}/.test(stem);
          const hasParen = /\uff08[\u3000\s]*\uff09/.test(stem);
          if (hasUnders && hasParen)
            fails.push((box.id || sec.type) + '#' + it.num + ': stem has BOTH ______ and full-width parentheses; mark the gap with exactly one marker: '
              + stem);
          if (!hasUnders && !hasParen)
            fails.push((box.id || sec.type) + '#' + it.num + ': stem has no gap marker: ' + stem);
        }
      }
    }
  }
  return fails;
}

/* ---------------- shape guards ----------------
   The validator assumes plan[i].items is an array and throws otherwise.
   normalizeSet wraps a single container object into [obj]; preflightShape
   turns remaining shape problems into retryable fail messages instead of
   letting the validator crash the run. */
function normalizeSet(set) {
  if (set && Array.isArray(set.plan)) {
    for (const sec of set.plan) {
      if (sec && sec.items && !Array.isArray(sec.items) && typeof sec.items === 'object') {
        sec.items = [sec.items];
      }
    }
  }
  return set;
}
function preflightShape(set) {
  const fails = [];
  if (!set || typeof set !== 'object') { fails.push('reply is not an object'); return fails; }
  if (!Array.isArray(set.plan)) { fails.push('plan is not an array'); return fails; }
  set.plan.forEach((sec, i) => {
    if (!sec || typeof sec !== 'object') { fails.push('plan[' + i + '] is not an object'); return; }
    if (!Array.isArray(sec.items)) {
      fails.push('plan[' + i + '] (' + (sec.type || '?') + '): items must be a JSON array of real items, not '
        + (typeof sec.items) + '; wrap single containers as [ { ... } ] and never leave the skeleton description string');
    }
  });
  return fails;
}

/* ---------------- api (streaming) ----------------
   Streaming is required here: a full 8-section set is ~10-15k output
   tokens, and a non-streaming request shows nothing until the very end
   and can trip Node fetch's default ~5 min body timeout. With SSE we
   print live progress and keep the connection active. */
const API_BASE = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
async function callModel(apiKey, system, user, maxTokens) {
  const res = await fetch(API_BASE + '/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'accept': 'text/event-stream',
    },
    body: JSON.stringify({
      model: MODEL, max_tokens: maxTokens, temperature: 0.6, stream: true,
      system, messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('API ' + res.status + ': ' + txt.slice(0, 300));
  }
  const decoder = new TextDecoder();
  let buf = '', out = '', chars = 0, lastTick = Date.now();
  for await (const chunk of res.body) {
    buf += decoder.decode(chunk, { stream: true });
    let nl;
    while ((nl = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      let ev;
      try { ev = JSON.parse(payload); } catch (e) { continue; }
      if (ev.type === 'content_block_delta' && ev.delta && typeof ev.delta.text === 'string') {
        out += ev.delta.text; chars += ev.delta.text.length;
        if (Date.now() - lastTick > 3000) {
          process.stdout.write(String(chars) + 'ch ');
          lastTick = Date.now();
        }
      } else if (ev.type === 'error') {
        throw new Error('stream error: ' + JSON.stringify(ev.error).slice(0, 300));
      } else if (ev.type === 'message_delta' && ev.delta && ev.delta.stop_reason === 'max_tokens') {
        throw new Error('output hit max_tokens (' + maxTokens + '); response truncated');
      }
    }
  }
  if (!out) throw new Error('empty streamed response');
  return out;
}
function extractJson(text) {
  let t = String(text).trim();
  t = t.replace(/```(json)?/gi, '').trim();
  const a = t.indexOf('{'); const b = t.lastIndexOf('}');
  if (a === -1 || b === -1 || b <= a) throw new Error('no JSON object in reply');
  const body = t.slice(a, b + 1);
  try {
    return JSON.parse(body);
  } catch (e0) {
    const fixed = repairInnerQuotes(body);
    try { return JSON.parse(fixed); } catch (e) { return rethrowWithContext(e, fixed); }
  }
}
/* Replace ASCII double quotes that occur INSIDE string values with full-width
   Chinese quotes (alternating open/close per string). A quote is treated as the
   string terminator only when the next non-space character is JSON syntax
   (, } ] :). Chinese text uses full-width punctuation, so an inner quote is
   never followed by ASCII , } ] : in practice. Deterministic and reversible. */
function repairInnerQuotes(s) {
  const OPEN = '\u201c', CLOSE = '\u201d';
  let out = '', inStr = false, toggle = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!inStr) {
      out += c;
      if (c === '"') { inStr = true; toggle = 0; }
      continue;
    }
    if (c === '\\') { out += c; if (i + 1 < s.length) { out += s[i + 1]; i++; } continue; }
    if (c === '"') {
      let j = i + 1;
      while (j < s.length && (s[j] === ' ' || s[j] === '\t' || s[j] === '\r' || s[j] === '\n')) j++;
      const nxt = s[j];
      if (nxt === ',' || nxt === '}' || nxt === ']' || nxt === ':' || j >= s.length) {
        out += c; inStr = false;             /* real terminator */
      } else {
        out += (toggle++ % 2 === 0) ? OPEN : CLOSE;   /* inner quote */
      }
      continue;
    }
    out += c;
  }
  return out;
}
function rethrowWithContext(e, body) {
  // surface the offending region so failures are self-diagnosing
  const m = String(e.message).match(/position (\d+)/);
  let ctx = '';
  if (m) {
    const p = parseInt(m[1], 10);
    const lo = Math.max(0, p - 120), hi = Math.min(body.length, p + 120);
    ctx = '\n    context around position ' + p + ':\n    >>> '
      + JSON.stringify(body.slice(lo, p)) + '\n    ERR ' + JSON.stringify(body.slice(p, hi));
  }
  throw new Error(e.message + ctx);
}

/* ---------------- reviewer (critic) pass ----------------
   The schema validator cannot judge semantics. After a set passes all
   mechanical checks, a second, cheap model call reviews exactly the failure
   modes seen in pilot audits: multiple defensible options, wrong answer key,
   unnatural sentences, above-level vocabulary, interchangeable cloze bank
   words. It replies pass, or item-level fixes, or asks for regeneration.
   Disable with --no-review. */
function reviewSystemPrompt() {
  return [
    'You are a meticulous QA reviewer for Singapore P3 Higher Chinese WA1 exam items',
    '(curriculum lessons 1-4 only). You receive MCQ items and a cloze section.',
    'For EVERY MCQ item do all of the following, in this order:',
    'a) Read the sentence with EACH option inserted. If more than one option makes a',
    '   natural, grammatical, semantically acceptable sentence, the item is defective.',
    'b) Confirm the 0-based answer index points to the only correct option.',
    'c) Confirm the sentence itself is natural Chinese a P3 textbook would print.',
    'd) Confirm no chengyu, rare or above-level vocabulary anywhere in the item.',
    'For the cloze: confirm each blank accepts exactly one wordBank word once the',
    'other blanks are filled (global assignment must be unique), and confirm the one',
    'unused decoy word fits NO blank at all.',
    'For PinyinMcq items additionally: verify every syllable and tone of the marked',
    'answer against the standard dictionary reading; a wrong pinyin key is critical.',
    'For the MATCH set: confirm each stem accepts exactly one pool word, the global',
    'assignment is unique, and the one unused decoy pool word fits NO stem. If the',
    'match set is defective you may return a fix whose id is the match set id and',
    'whose item is the FULL corrected match set object (same schema: id, instruction,',
    'pool, items[{num, stem, answer, lesson, skill, explain, explanation}]).',
    'Reply with ONLY one JSON object, one of:',
    '{"verdict":"pass"}',
    '{"verdict":"fix","fixes":[{"id":"<item id>","item":{<the FULL corrected MCQ item,',
    ' same schema: id, topic, sentence, options, answer, lesson, skill, explain{why,',
    ' distractors (same length as options, check-mark entry at answer index), trapType,',
    ' memoryTip}, explanation>}}]}',
    '{"verdict":"regenerate","reason":"<short reason, e.g. cloze bank ambiguous>"}',
    'Rules for fixes: keep the same id, lesson and skill unless the skill tag is wrong;',
    'prefer replacing a defective distractor with one that is clearly wrong in context;',
    'inside strings never use the ASCII double quote; use \u201c \u201d.',
  ].join('\n');
}
function reviewUserPrompt(set) {
  const mcqs = [];
  let cloze = null, match = null;
  for (const sec of set.plan) {
    if (['HanziMcq', 'PinyinMcq', 'VocabMcq'].includes(sec.type) && sec.variant !== 'pool')
      for (const q of sec.items) mcqs.push(q);
    if (sec.type === 'PassageCloze') cloze = sec.items[0];
    if (sec.type === 'VocabMatch') match = sec.items[0];
  }
  return [
    'Review these items from set ' + set.setId + '.',
    'MCQ ITEMS:',
    JSON.stringify(mcqs, null, 1),
    'MATCH SET:',
    JSON.stringify(match, null, 1),
    'CLOZE:',
    JSON.stringify(cloze ? { passage: cloze.passage, wordBank: cloze.wordBank, answers: cloze.blanks.map(b => b.answer) } : null, null, 1),
    'Output the JSON verdict only.',
  ].join('\n');
}
function applyFixes(set, fixes) {
  const applied = [], missing = [];
  for (const f of fixes || []) {
    if (!f || !f.id || !f.item) continue;
    let done = false;
    for (const sec of set.plan) {
      if (!Array.isArray(sec.items)) continue;
      const idx = sec.items.findIndex(q => q && q.id === f.id);
      if (idx !== -1) {
        if (!f.item.explanation && f.item.explain)
          f.item.explanation = f.item.explain.why + ' ' + f.item.explain.memoryTip;
        sec.items[idx] = f.item; applied.push(f.id); done = true; break;
      }
    }
    if (!done) missing.push(f.id);
  }
  return { applied, missing };
}

/* ---------------- main ---------------- */
async function main() {
  if (!Number.isInteger(FROM) || !Number.isInteger(TO) || FROM < 1 || TO > 60 || FROM > TO) {
    console.error('bad --from/--to (1..60)'); process.exit(1);
  }
  const all = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
  console.log('seeds loaded: ' + all.seeds.length);
  const fewshot = collectExamples(all);

  let out = [];
  if (fs.existsSync(OUT_FILE)) {
    out = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
    if (!Array.isArray(out)) { console.error(OUT_FILE + ' is not an array'); process.exit(1); }
    console.log('resume: ' + OUT_FILE + ' already has ' + out.length + ' set(s)');
  }
  const have = new Set(out.map(s => s.setId));

  if (DRY_RUN) {
    const n = FROM;
    console.log('--- SYSTEM PROMPT ---\n' + systemPrompt());
    console.log('\n--- USER PROMPT (' + setIdFor(n) + ') ---\n' + userPrompt(setIdFor(n), bandFor(n), themeFor(n), fewshot));
    return;
  }
  const apiKey = loadApiKey();
  if (!apiKey) { console.error('no ANTHROPIC_API_KEY (env or .env.local)'); process.exit(1); }

  for (let n = FROM; n <= TO; n++) {
    const sid = setIdFor(n);
    if (have.has(sid)) { console.log(sid + ': already in output, skip'); continue; }
    const band = bandFor(n), theme = themeFor(n);
    let user = userPrompt(sid, band, theme, fewshot);
    let ok = false;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      process.stdout.write(sid + ' attempt ' + attempt + '/' + MAX_ATTEMPTS + ' ... ');
      let set, reply = '';
      try {
        reply = await callModel(apiKey, systemPrompt(), user, 32000);
        set = extractJson(reply);
      } catch (e) {
        const dbg = '_debug_' + sid + '_attempt' + attempt + '.txt';
        try { fs.writeFileSync(dbg, reply || '(no reply captured)', 'utf8'); } catch (w) {}
        console.log('ERROR ' + e.message);
        console.log('    raw reply saved to ' + dbg + ' (len=' + reply.length + ')');
        console.log('    head: ' + JSON.stringify(reply.slice(0, 160)));
        user = user + '\n\nYOUR PREVIOUS REPLY WAS NOT VALID JSON (' + e.message
          + '). Output ONE strictly valid JSON object only: double-quoted keys/strings,'
          + ' no trailing commas, no markdown fences, no commentary before or after.';
        continue;
      }
      set.setId = sid; set.track = 'HCL'; set.band = band;
      if (!Array.isArray(set.seedSources) || !set.seedSources.length) set.seedSources = ['generated_v1'];
      normalizeSet(set);
      const pre = preflightShape(set);
      let res;
      if (pre.length) {
        res = { fails: pre, counts: {} };
      } else {
        try {
          res = validatePracticeSets([set], { requireExplain: true, expectSetCount: 1 });
        } catch (ve) {
          res = { fails: ['validator crashed on malformed shape: ' + ve.message
            + ' - ensure every plan[i].items is an array of correctly shaped items'], counts: {} };
        }
        res.fails = res.fails.concat(postCheck(set));
      }
      if (!res.fails.length) {
        if (!NO_REVIEW) {
          process.stdout.write('review ... ');
          let verdict = null;
          for (let r = 1; r <= 2 && !verdict; r++) {
            try { verdict = extractJson(await callModel(apiKey, reviewSystemPrompt(), reviewUserPrompt(set), 8000)); }
            catch (e) { if (r === 2) console.log('(reviewer unreadable, accepting) '); }
          }
          if (verdict && verdict.verdict === 'regenerate') {
            console.log('REVIEW-REGENERATE: ' + (verdict.reason || ''));
            user = user + '\n\nA QA reviewer rejected your previous set: ' + (verdict.reason || 'defective content')
              + '. Generate the corrected full JSON again.';
            continue;
          }
          if (verdict && verdict.verdict === 'fix' && Array.isArray(verdict.fixes) && verdict.fixes.length) {
            const ap = applyFixes(set, verdict.fixes);
            process.stdout.write('fixed [' + ap.applied.join(',') + '] ');
            let res2;
            try { res2 = validatePracticeSets([set], { requireExplain: true, expectSetCount: 1 }); }
            catch (ve) { res2 = { fails: ['validator crashed after fixes: ' + ve.message], counts: res.counts }; }
            res2.fails = res2.fails.concat(postCheck(set));
            if (res2.fails.length) {
              console.log('FIXES INVALID (' + res2.fails.length + ')');
              res2.fails.slice(0, 6).forEach(f => console.log('    ' + f));
              user = user + '\n\nYOUR PREVIOUS ATTEMPT (after QA fixes) STILL FAILED:\n- ' + res2.fails.join('\n- ');
              continue;
            }
            res = res2;
          }
        }
        console.log('PASS ' + JSON.stringify(res.counts));
        out.push(set); have.add(sid);
        fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 1), 'utf8');
        ok = true; break;
      }
      console.log('FAIL (' + res.fails.length + ')');
      res.fails.slice(0, 8).forEach(f => console.log('    ' + f));
      user = user + '\n\nYOUR PREVIOUS ATTEMPT FAILED VALIDATION. Fix ALL of these and output the corrected full JSON again:\n- ' + res.fails.join('\n- ');
    }
    if (!ok) { console.error(sid + ': exhausted attempts, aborting run (partial output kept in ' + OUT_FILE + ')'); process.exit(1); }
  }
  console.log('\nDONE: ' + out.length + ' set(s) in ' + OUT_FILE);
}

main().catch(e => { console.error(e); process.exit(1); });
