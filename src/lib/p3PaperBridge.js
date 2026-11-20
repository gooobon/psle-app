import { allP3EnglishPapers } from "@/data/p3/english/papers";
import { allP3ChinesePapers } from "@/data/p3/chinese/papers";
import { comprehensionGenerated } from "@/data/p3/english/comprehension_generated";

// ── pools ────────────────────────────────────────────────────────────────────

export function flattenEnglishPool() {
  return [
    ...allP3EnglishPapers.wa1,
    ...allP3EnglishPapers.wa2,
    ...allP3EnglishPapers.wa3,
    ...allP3EnglishPapers.eoy,
  ];
}

export function flattenChinesePool() {
  return [
    ...allP3ChinesePapers.wa1,
    ...allP3ChinesePapers.wa2,
    ...allP3ChinesePapers.wa3,
    ...allP3ChinesePapers.eoy,
  ];
}

function schoolMatches(meta, schoolName) {
  if (!schoolName) return false;
  const target = schoolName.toLowerCase();
  const fields = [meta.school, meta.schoolZh, meta.source, meta.title, meta.id]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());
  return fields.some(
    (f) => f.includes(target) || target.includes(f.split(" ")[0]),
  );
}

export function pickEnglishPaper({ sessionNum = 1, schoolName, isPastPaper }) {
  const pool = isPastPaper
    ? allP3EnglishPapers.eoy.length
      ? allP3EnglishPapers.eoy
      : [...allP3EnglishPapers.wa2, ...allP3EnglishPapers.wa3]
    : [...allP3EnglishPapers.wa1, ...allP3EnglishPapers.wa2, ...allP3EnglishPapers.wa3];

  if (!pool.length) return { meta: { title: "No papers loaded" }, questions: [] };

  const bySchool = pool.filter((p) => schoolMatches(p.meta, schoolName));
  const list = bySchool.length ? bySchool : pool;
  return list[(Math.max(sessionNum, 1) - 1) % list.length];
}

export function pickChinesePaper({ sessionNum = 1, isPastPaper }) {
  const pool = isPastPaper
    ? allP3ChinesePapers.eoy
    : [...allP3ChinesePapers.wa1, ...allP3ChinesePapers.wa2, ...allP3ChinesePapers.wa3];

  if (!pool.length) return { meta: { title: "No papers loaded" }, questions: [] };
  return pool[(Math.max(sessionNum, 1) - 1) % pool.length];
}

// ── English adapters ─────────────────────────────────────────────────────────

const optionText = (o) => (typeof o === "string" ? o : o && typeof o === "object" ? o.text || o.label || String(o) : String(o));

// Options arrive as an array, or (about 105 paper items) as an object map keyed "1".."4" (or "A".."D").
// The map is read in key order (digits numerically), so the stored answer "1" still means the first option.
// Source files are not rewritten: this only changes how they are read.
function parseOptionTexts(options) {
  if (Array.isArray(options)) return options.map(optionText);
  if (options && typeof options === "object") {
    const keys = Object.keys(options).filter((k) => options[k] != null && String(optionText(options[k])).trim() !== "");
    const allDigits = keys.length > 0 && keys.every((k) => /^\d+$/.test(k));
    keys.sort((a, b) => (allDigits ? Number(a) - Number(b) : a.localeCompare(b)));
    return keys.map((k) => optionText(options[k]));
  }
  return [];
}

function parseAnswerIndex(answer, options) {
  if (typeof answer === "number") {
    if (answer >= 0 && answer < options.length) return answer;
    if (answer >= 1 && answer <= options.length) return answer - 1;
  }
  if (typeof answer === "string") {
    const n = parseInt(answer, 10);
    if (!Number.isNaN(n)) {
      if (n >= 1 && n <= options.length) return n - 1;
      if (n >= 0 && n < options.length) return n;
    }
    const letterIdx = answer.toUpperCase().charCodeAt(0) - 65;
    if (letterIdx >= 0 && letterIdx < options.length) return letterIdx;
  }
  return 0;
}

function toEnglishMcq(q) {
  const options = parseOptionTexts(q.options);
  const sentence =
    q.sentence || q.stem || q.question || q.q || q.questionText || "";
  return {
    id: q.id || `q_${Math.random().toString(36).slice(2, 8)}`,
    topic: q.topic || "GrammarMCQ",
    sentence,
    options,
    answer: parseAnswerIndex(q.answer, options),
    hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    explanation:
      q.explanation ||
      (Array.isArray(q.solution?.steps)
        ? q.solution.steps.join(" ")
        : q.solution?.method || ""),
    highlights: q.highlights,
    ruleCard: q.ruleCard,
    emoji: q.emoji,
  };
}

function parseWordBankFromInstructions(text = "") {
  // "(G) at  (H) before  (J) during" -> ["(G) at", "(H) before", "(J) during"]; the printed letters are kept (they may not start at A).
  const matches = [...text.matchAll(/\(([A-Z])\)\s*([^()]+?)(?=\s*\([A-Z]\)|$)/g)];
  if (matches.length) return matches.map((m) => "(" + m[1] + ") " + m[2].trim());
  return null;
}

function letterToWordBankAnswer(letter, wordBank) {
  if (!letter || !wordBank?.length) return letter;
  const idx = String(letter).toUpperCase().charCodeAt(0) - 65;
  return wordBank[idx] || letter;
}

// A cloze word bank arrives as an array ("(A) at" or "at") or as a letter map {A:"at",B:"down"}. The app always shows plain
// words (no letters), so the bank is normalised to an array of bare words plus a letter -> word table.
export function normaliseClozeBank(wb) {
  const strip = (w) => String(optionText(w) == null ? "" : optionText(w)).replace(/^\s*\(?[A-Za-z][).:]\s+/, "").trim();
  const letterOf = (w) => { const m = String(optionText(w) == null ? "" : optionText(w)).match(/^\s*\(?([A-Za-z])[).:]\s*\S/); return m ? m[1].toUpperCase() : null; };
  if (Array.isArray(wb)) {
    const items = wb.filter((w) => w != null && String(optionText(w)).trim() !== "");
    const words = items.map(strip);
    const byLetter = {};
    items.forEach((w, i) => { byLetter[letterOf(w) || String.fromCharCode(65 + i)] = words[i]; });
    return { words, byLetter };
  }
  if (wb && typeof wb === "object") {
    const keys = Object.keys(wb).filter((k) => wb[k] != null && String(optionText(wb[k])).trim() !== "").sort((x, y) => x.localeCompare(y));
    const byLetter = {};
    for (const k of keys) byLetter[/^[A-Za-z]$/.test(k) ? k.toUpperCase() : k] = strip(wb[k]);
    return { words: keys.map((k) => strip(wb[k])), byLetter };
  }
  return { words: [], byLetter: {} };
}

// The numbers printed in the passage, in order: "... looked (21) ______ and ..." -> [21, 22, 23, 24].
export function passageBlankNumbers(passage) {
  return [...String(passage || "").matchAll(/\(\s*(\d{1,3})\s*\)\s*[_\uFF3F\u2026.\u2014-]{2,}/g)].map((m) => parseInt(m[1], 10));
}

// A letter key (A-H) is turned into the word only when a letter table exists (word bank or lettered options); a plain word key stays.
export function clozeKeyToWord(raw, byLetter) {
  const str = String(Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const m = str.match(/^\(?([A-Z])\)?[.):]?$/);
  if (m && byLetter && byLetter[m[1].toUpperCase()]) return byLetter[m[1].toUpperCase()];
  return str;
}

function toEnglishClozeSet(set) {
  const bank = normaliseClozeBank(set.wordBank || parseWordBankFromInstructions(set.instructions) || []);
  const wordBank = bank.words;
  const rawBlanks = set.questions || set.blanks || [];
  const passage = set.passage || set.passageText || "";
  // The boxes carry the passage's own numbers when the passage prints one number per blank ((21)-(24), not (1)-(4)).
  const printed = passageBlankNumbers(passage);
  const usePrinted = printed.length === rawBlanks.length && new Set(printed).size === printed.length;
  const blanks = rawBlanks.map((q, i) => {
    const num = usePrinted ? printed[i] : parseInt(q.questionNo || q.num || q.blank || q.number || i + 1, 10);
    const own = q.wordBank || q.options || q.choices;
    const ownBank = own ? normaliseClozeBank(own) : null;
    const table = ownBank && ownBank.words.length ? ownBank.byLetter : bank.byLetter;
    const wordKey = [q.answerWord, q.answerText, q.word].find((v) => v != null && String(v).trim() !== "");
    const answer = wordKey != null ? String(wordKey).trim() : clozeKeyToWord(q.answer ?? q.correctAnswer ?? "", table);
    return {
      num: Number.isNaN(num) ? i + 1 : num,
      answer,
      choices: q.choices || null,
      wordBank: ownBank && ownBank.words.length && q.wordBank ? ownBank.words : wordBank,
      hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    };
  });
  return {
    id: set.id || set.topic || "cloze_set",
    setLabel: set.setLabel || set.title || set.topic || "Cloze",
    passage,
    wordBank,
    blanks,
  };
}

function toEnglishEditSet(set) {
  const items = (set.questions || set.items || []).map((q, i) => {
    const options = parseOptionTexts(q.options);
    const rawSentence = q.sentence || q.stem || q.question || q.stimulus || "";
    // Editing is typed: the key is the corrected word as text. (It used to be an option index, which a
    // typed answer can never equal, so every editing item was marked wrong.)
    const typedKey = q.correctWord ?? q.correctAnswer;
    let answer = typedKey != null ? String(typedKey) : q.answer;
    if (typeof answer === "number" || (typeof answer === "string" && /^[A-Da-d1-4]$/.test(answer.trim()) && options.length >= 2)) {
      const idx = parseAnswerIndex(answer, options);
      answer = options[idx] != null ? options[idx] : String(answer);
    }
    answer = String(answer == null ? "" : answer).trim();
    let wrongWord = q.wrongWord || q.errorWord || q.highlight || "";
    let sentence = rawSentence;
    if (!wrongWord) {
      // "They are back [togedder] for ..." -> underline the bracketed word.
      const br = rawSentence.match(/\[([^\]]+)\]/);
      if (br) { wrongWord = br[1].trim(); sentence = rawSentence.replace(br[0], br[1]); }
    }
    return {
      id: q.id || `${set.id || "ed"}_${i}`,
      sentence,
      wrongWord: wrongWord || "___",
      options: [], // typed answer: the corrected word must not ride along as a choice
      answer,
      hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    };
  });
  return {
    id: set.id || "edit_set",
    setLabel: set.setLabel || set.title || set.topic || "Editing",
    instructions: set.instructions || "Choose the correct spelling.",
    items,
  };
}

function detectCompFormat(q, options) {
  // 데이터의 format 필드가 'open'으로 잘못 일괄 태깅된 경우가 많으므로
  // question/stem 내용을 항상 재검사하여 실제 유형을 감지한다.
  const declared = q.format || q.questionType || null;

  // New 8-type schema formats -- bypass inference and return directly
  const NEW_SCHEMA_FORMATS = [
    'fill_blank','fill_word','ab_circle','true_false','tf_reason','open_sentence'
  ];
  if (declared && NEW_SCHEMA_FORMATS.includes(declared)) return declared;

  const qRaw = String(q.question || q.stem || q.q || "");
  const qText = qRaw.toLowerCase();
  const ansStr = String(q.answer ?? "");
  const ansLower = ansStr.toLowerCase().trim();

  // 1) MCQ: options가 존재하면 항상 MCQ
  if (options && options.length >= 2) return "mcq";

  // 2) True/False + Reason
  if ((qText.includes("true or false") || qText.includes("state whether")) &&
      (qText.includes("reason") || qText.includes("why you think"))) {
    // 복합형: "each statement" 또는 (a)(b) 여러 개 → open_multi (학생이 각각 작성)
    if (qText.includes("each statement") || (qRaw.includes("(a)") && qRaw.includes("(b)"))) {
      return "open_multi";
    }
    return "truefalse_reason";
  }

  // 3) True/False only: answer가 정확히 true/false
  if (ansLower === "true" || ansLower === "false") return "truefalse";

  // 4) Sequence: "write 1, 2 or 3" / "put ... in sequence/order"
  //    Detect by: explicit "write 1, 2..." OR (sequence/order keyword + numbered slots)
  const emptyBracketCount = (qRaw.match(/\(\s*\)/g) || []).length;
  const blankSlotCount = (qRaw.match(/(?:^|\s)_{2,}/g) || []).length;
  const numberedSlots = emptyBracketCount + blankSlotCount;
  const hasSeqKeyword = qText.includes("sequence") || qText.includes("the order") ||
                        qText.includes("order of events") || qText.includes("order in which");
  if (/write\s+1\s*[,，]?\s*2/.test(qText) ||
      /put\s+(?:these|the)\s+events/.test(qText) ||
      (hasSeqKeyword && numberedSlots >= 2) ||
      emptyBracketCount >= 3) {
    return "sequence";
  }

  // 5) Tick-choice (checkbox): has [ ] markers in question (>=2)
  const tickCount = (qRaw.match(/\[\s*\]/g) || []).length;
  if (tickCount >= 2) return "tick_choice";

  // 6) If author explicitly declared a non-open special format, honor it
  if (declared && !["open", "mcq", "ComprehensionOE", "ComprehensionMCQ", "ComprehensionFIB"].includes(declared)) {
    return declared;
  }

  // 7) Short fill: answer is 1-4 words, no newline, < 40 chars
  //    BUT only if the question asks to "find a word/phrase" (vocabulary lookup)
  const isWordLookup =
    qText.includes("which word") ||
    qText.includes("which phrase") ||
    qText.includes("same meaning") ||
    qText.includes("word in paragraph") ||
    qText.includes("word from") ||
    qText.includes("a word that");
  if (isWordLookup) {
    // word lookup questions are always short single-word/phrase answers
    if (!ansStr || (!ansStr.includes("\n") && ansStr.split(/\s+/).length <= 6 && ansStr.length < 60)) {
      return "fill_short";
    }
  }

  // 8) Multi-part open: answer has (i)/(ii) or multiple lines
  if (ansStr.includes("(i)") || ansStr.includes("(ii)") ||
      ansStr.includes("(a)") || ansStr.includes("(b)") ||
      (ansStr.match(/\n/g) || []).length >= 1) {
    return "open_multi";
  }

  // 9) default: open (single sentence answer)
  return "open";
}

// Passage key: first 80 chars, lowercased, whitespace-collapsed, ASCII-normalised.
// Must match the key logic in build_comp_ts.js exactly.
function compPassageKey(passage) {
  return String(passage || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80)
    .toLowerCase();
}

function toEnglishCompSet(set, skipGenerated) {
  const passage =
    set.passage ||
    set.meta?.passageText ||
    set.readingPassage ||
    "";

  // If we have AI-generated 8-type questions for this passage, use them.
  const genKey = compPassageKey(passage);
  const gen = genKey && !skipGenerated ? comprehensionGenerated[genKey] : null;
  if (gen && Array.isArray(gen.questions) && gen.questions.length > 0) {
    const genQuestions = gen.questions.map((q, i) => {
      const options = parseOptionTexts(q.options);
      const fmt = q.format || detectCompFormat(q, options);
      const isMcq = fmt === "mcq";
      const answer = isMcq
        ? (typeof q.answer === "number" ? q.answer : parseAnswerIndex(q.answer, options))
        : (Array.isArray(q.answer) ? q.answer : String(q.answer ?? ""));
      return {
        id:                q.id || `comp_gen_${i}`,
        questionNo:        q.questionNo || String(41 + i),
        format:            fmt,
        marks:             q.marks || 1,
        question:          q.stem || q.question || "",
        stem:              q.stem || q.question || "",
        options,
        answer,
        sequenceItems:     q.sequenceItems || null,
        statements:        q.statements || null,
        abSentence:        q.abSentence || null,
        abChoices:         q.abChoices || null,
        acceptableAnswers: q.acceptableAnswers || null,
        hints:             q.hints || (q.solution?.tip ? [q.solution.tip] : []),
        solution:          q.solution || null,
      };
    });
    return {
      id:       gen.id || set.id || "comp_set",
      setLabel: set.setLabel || set.title || gen.title || "Comprehension",
      passage,
      questions: genQuestions,
    };
  }


  const questions = (set.questions || []).map((q, i) => {
    const options = parseOptionTexts(q.options);
    const fmt = detectCompFormat(q, options);

    // MCQ: use parseAnswerIndex. All other formats: preserve raw string answer.
    const isMcq = fmt === "mcq";
    const answer = isMcq
      ? parseAnswerIndex(q.answer, options)
      : Array.isArray(q.answer)
        ? q.answer
        : String(q.answer ?? q.correctAnswer ?? "");

    // For sequence format, extract the event items from the question text
    let sequenceItems = q.sequenceItems || q.items || null;
    if (fmt === "sequence" && !sequenceItems && q.question) {
      // Parse "( ) Event A. ( ) Event B." pattern
      const matches = [...q.question.matchAll(/\(\s*\)\s*([^.(]+)/g)];
      if (matches.length >= 2) sequenceItems = matches.map(m => m[1].trim());
    }

    // For tick_choice format, extract checkbox options from [ ] pattern
    let tickOptions = null;
    if (fmt === "tick_choice" && q.question) {
      const matches = [...q.question.matchAll(/\[\s*\]\s*([^\[\n]+)/g)];
      if (matches.length >= 2) tickOptions = matches.map(m => m[1].trim());
    }

    return {
      id:               q.id || `comp_${i}`,
      questionNo:       q.questionNo || String(i + 1),
      format:           fmt,
      marks:            q.marks || 1,
      question:         q.question || q.stem || q.q || q.questionText || "",
      stem:             q.question || q.stem || q.q || q.questionText || "",
      options:          tickOptions || options,
      answer,
      sequenceItems,
      statements:       q.statements       || null,
      abSentence:       q.abSentence       || null,
      abChoices:        q.abChoices        || null,
      acceptableAnswers: q.acceptableAnswers || null,
      hints:            q.hints || (q.solution?.tip ? [q.solution.tip] : []),
      solution:         q.solution || null,
    };
  });

  return {
    id:       set.id || "comp_set",
    setLabel: set.setLabel || set.title || set.topic || "Comprehension",
    passage,
    questions,
  };
}


// ── Standalone items that are not multiple choice ────────────────────────────
// Past-paper files store many cloze blanks, editing items and comprehension questions as flat items
// (no `questions` array). classifyEnglishItem used to send all of them to GrammarMCQ, where they had no
// options and could never be answered. They are now grouped into the set shapes the app already renders
// and grades: typed cloze blanks, typed editing items, and comprehension questions (open-ended ones are
// parent-marked: getFormat gives open_sentence, so no auto-grade and no model "wrong" mark).

const bareWord = (w) => String(w == null ? "" : w).replace(/^\s*\(?[A-Fa-f]\)\s*/, "").trim();
const itemText = (q) => String(q.question || q.stem || q.questionText || q.q || q.sentence || q.context || "");

function isOptionItem(item) {
  return parseOptionTexts(item.options).length >= 2;
}

function standaloneKind(item) {
  const topic = String(item.topic || "");
  if (/Editing/.test(topic) || item.type === "spelling" || item.errorWord != null || item.errorType != null) return "Editing";
  if (/Cloze/.test(topic)) return "Cloze";
  if (/Comprehension/.test(topic)) return "Comprehension";
  return null;
}

function classifyEnglishItem(item) {
  const topic = item.topic || "";
  // Skip SentenceCombining (Word Order) — not yet supported
  if (topic.includes("SentenceCombining") || topic.includes("WordOrder")) return null;
  if (
    item.kind === "set" ||
    item.kind === "B" ||
    (item.questions && item.passage)
  ) {
    // FIB -> VocabCloze reclassify: ComprehensionFIB is a fill-in-blank cloze,
    // not real comprehension. Route it to the cloze renderer instead.
    if (topic.includes("ComprehensionFIB")) return "VocabCloze";
    // VisualText is non-narrative; treat as comprehension only if nothing else.
    if (topic.includes("Comprehension") || topic === "VisualText")
      return "Comprehension";
    if (topic.includes("Editing")) return "Editing";
    if (topic.includes("VocabCloze")) return "VocabCloze";
    if (topic.includes("GrammarCloze") || topic.includes("Cloze"))
      return "GrammarCloze";
    if (item.passage && item.questions) return "Comprehension";
    return "GrammarCloze";
  }
  // A cloze passage that carries its own blanks array (e.g. "Sugar Gliders"): one cloze set.
  if (Array.isArray(item.blanks) && item.blanks.length && /Cloze/.test(topic) && (item.passage || item.passageText)) {
    return topic.includes("Vocab") ? "VocabCloze" : "GrammarCloze";
  }
  // Real multiple choice (options as an array or an object map) stays MCQ.
  if (isOptionItem(item)) return topic.includes("Vocab") ? "VocabMCQ" : "GrammarMCQ";
  // Flat cloze / editing / comprehension items with no options: not MCQ.
  const kind = standaloneKind(item);
  if (kind === "Editing") return "EditingItem";
  if (kind === "Cloze") return topic.includes("Vocab") ? "VocabClozeItem" : "GrammarClozeItem";
  if (kind === "Comprehension") return "CompItem";
  if (topic.includes("Vocab")) return "VocabMCQ";
  return "GrammarMCQ";
}

const passageOf = (q) => String(q.passage || q.passageText || "");
const groupKeyOf = (q) => (passageOf(q) ? compPassageKey(passageOf(q)) : "") + "|" + String(q.passageTitle || "");

// Spelling/grammar edit items often give only the sentence fragment and the corrected word. Find the
// word the student must fix: a quoted word in the prompt, else the sentence word closest to the answer.
function editDistance(a, b) {
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
function findWrongWord(text, answer) {
  const ans = String(answer || "").toLowerCase().trim();
  if (!ans) return "";
  const words = String(text).match(/[A-Za-z’']+/g) || [];
  let best = "", bestD = 99;
  for (const w of words) {
    const lw = w.toLowerCase();
    if (lw === ans || lw.length < 2) continue;
    const d = editDistance(lw, ans);
    if (d < bestD) { bestD = d; best = w; }
  }
  return bestD <= Math.max(2, Math.floor(ans.length / 3)) ? best : "";
}

function toEditingItem(q, passage) {
  const answer = String(q.correctWord ?? q.correctAnswer ?? (Array.isArray(q.answer) ? q.answer[0] : q.answer) ?? "").trim();
  const text = itemText(q);
  const no = q.qNumber || q.questionNumber || q.blank;
  let sentence = text;
  let wrongWord = String(q.errorWord || "");
  // Passage editing: "(29)[sirprise]" in the passage, "(29) ... 'sirprise'" in the question.
  if (no != null && passage) {
    const m = passage.match(new RegExp("\\(" + no + "\\)\\s*\\[([^\\]]+)\\]"));
    if (m) {
      const at = m.index;
      const before = passage.slice(0, at), after = passage.slice(at + m[0].length);
      const start = Math.max(before.lastIndexOf(". "), before.lastIndexOf("\n"), before.lastIndexOf("? "), before.lastIndexOf("! ")) + 1;
      const endRel = after.search(/[.!?\n]/);
      const tail = endRel >= 0 ? after.slice(0, endRel + 1) : after;
      const clean = (t) => t.replace(/\(\s*[\d,]*\s*\)\s*\[([^\]]*)\]/g, (_, w) => (w === "○" ? "" : w));
      wrongWord = wrongWord || m[1];
      sentence = (clean(before.slice(start)) + m[1] + clean(tail)).trim();
    }
  }
  if (!wrongWord) { const quoted = text.match(/['‘"“]([A-Za-z’'-]+)['’"”]/); if (quoted && quoted[1].toLowerCase() !== answer.toLowerCase()) wrongWord = quoted[1]; }
  if (!wrongWord) wrongWord = findWrongWord(sentence, answer);
  // A punctuation key (comma, apostrophe) has no misspelled word. The closest-word guess
  // underlines an ordinary word such as "is" in the instruction. Leave it unmarked.
  if (!q.errorWord && answer && !/[A-Za-z0-9]/.test(answer)) wrongWord = "";
  return {
    id: q.id,
    sentence,
    wrongWord,
    options: [], // typed answer: nothing to choose from, and the key must not ride along as an "option"
    answer,
    hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []),
    explanation: q.explanation || "",
  };
}

function groupStandalone(items, build) {
  const groups = new Map();
  for (const q of items) {
    const key = String(q.topic || "") + "|" + groupKeyOf(q);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }
  return [...groups.values()].map(build);
}

function toEditingSets(items) {
  return groupStandalone(items, (g) => {
    const passage = passageOf(g[0]);
    return {
      id: g[0].id + "_ed",
      setLabel: g[0].passageTitle || "Editing",
      instructions: "Each of the underlined words contains a spelling error. Write the correct word in the box provided.",
      items: g.map((q) => toEditingItem(q, passage)),
    };
  });
}

function toClozeItemSets(items) {
  return groupStandalone(items, (g) => {
    const first = g[0];
    const passage = passageOf(first);
    const bank = normaliseClozeBank(first.wordBank && !Array.isArray(first.wordBank) ? first.wordBank : (Array.isArray(first.wordBank) ? first.wordBank : parseWordBankFromInstructions(first.instructions || "") || []));
    const wordBank = bank.words;
    const used = new Set();
    const blanks = g.map((q, i) => {
      const text = itemText(q);
      const paren = text.match(/\((\d+)\)/);
      let num = parseInt(q.qNumber || q.questionNumber || (paren && paren[1]) || i + 1, 10);
      if (Number.isNaN(num)) num = i + 1;
      while (used.has(num)) num += 1000;
      used.add(num);
      const raw = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      const rawStr = String(raw ?? "").trim();
      // answerWord / answerText (the printed word) beat a bare letter key.
      const wordKey = [q.answerWord, q.answerText, q.word].find((v) => v != null && String(v).trim() !== "");
      let answer = wordKey != null ? String(wordKey).trim() : rawStr;
      if (answer === rawStr && wordBank.length) answer = clozeKeyToWord(rawStr, bank.byLetter);
      return { num, answer, choices: null, wordBank, hints: q.hints || (q.solution?.tip ? [q.solution.tip] : []), _text: text };
    });
    const body = passage || blanks.map((b) => {
      // keep the printed blank number so the cloze renderer can place the input
      const t = b._text;
      return /\(\d+\)\s*_{3,}/.test(t) || /\[[^\]]+\/[^\]]+\]/.test(t) ? t : t.replace(/_{3,}/, "(" + b.num + ") ______");
    }).join("\n\n");
    return {
      id: first.id + "_cz",
      setLabel: first.passageTitle || first.subtopic || "Cloze",
      passage: body,
      wordBank,
      blanks: blanks.map(({ _text, ...b }) => b),
    };
  });
}

// Short single answer -> typed fill-in; anything else stays open-ended (parent-marked). Tick-choice items
// become multiple choice only when the printed boxes can be read and the key matches one of them.
function prepareCompItem(q) {
  const text = itemText(q);
  const ans = Array.isArray(q.answer) ? q.answer.join(" ") : String(q.answer ?? "");
  const out = { ...q, question: text };
  const boxes = [...text.matchAll(/(?:□|\[\s*\])\s*([^\n□\[]+)/g)].map((m) => m[1].trim()).filter(Boolean);
  if (boxes.length >= 2) {
    const hit = boxes.findIndex((b) => normKey(b) === normKey(ans));
    if (hit >= 0) {
      out.options = boxes;
      out.answer = hit;
      out.format = "mcq";
      out.question = text.slice(0, text.search(/□|\[\s*\]/)).trim();
      return out;
    }
    out.format = "open";
    return out;
  }
  if (/ComprehensionFIB/.test(String(q.topic || "")) && ans && !ans.includes("\n") && ans.split(/\s+/).length <= 4 && ans.length < 40) {
    out.format = "fill_blank";
    return out;
  }
  // Anything that cannot be machine-checked is open-ended: parent-marked (explicitly open, never sequence/true_false by guess).
  out.format = "open";
  out.options = [];
  return out;
}
const normKey = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function toCompItemSets(items) {
  return groupStandalone(items, (g) => {
    const passage = passageOf(g[0]);
    const set = toEnglishCompSet(
      { id: g[0].id + "_cp", setLabel: g[0].passageTitle || "Comprehension", passage, questions: g.map(prepareCompItem) },
      true,
    );
    // No passage in the source: the set can be sat in a paper, but is not borrowed for practice sessions.
    if (!passage) set.noPassage = true;
    return set;
  });
}

function normalizeEnglishQuestions(questions = []) {
  const buckets = {
    GrammarMCQ: [],
    VocabMCQ: [],
    GrammarCloze: [],
    VocabCloze: [],
    Editing: [],
    Comprehension: [],
  };
  const flat = { EditingItem: [], GrammarClozeItem: [], VocabClozeItem: [], CompItem: [] };

  for (const raw of questions) {
    if (!raw || typeof raw !== "object") continue;
    const type = classifyEnglishItem(raw);
    if (!type) continue; // Skip unsupported types (e.g. SentenceCombining)
    if (flat[type]) { flat[type].push(raw); continue; }
    if (type.endsWith("MCQ")) {
      buckets[type].push(toEnglishMcq(raw));
    } else if (type === "GrammarCloze") {
      buckets.GrammarCloze.push(toEnglishClozeSet(raw));
    } else if (type === "VocabCloze") {
      buckets.VocabCloze.push(toEnglishClozeSet(raw));
    } else if (type === "Editing") {
      buckets.Editing.push(toEnglishEditSet(raw));
    } else if (type === "Comprehension") {
      buckets.Comprehension.push(toEnglishCompSet(raw));
    }
  }
  buckets.Editing.push(...toEditingSets(flat.EditingItem));
  buckets.GrammarCloze.push(...toClozeItemSets(flat.GrammarClozeItem));
  buckets.VocabCloze.push(...toClozeItemSets(flat.VocabClozeItem));
  buckets.Comprehension.push(...toCompItemSets(flat.CompItem));
  return buckets;
}

var _setsByType = null;
function isClozeStylePassage(passage) {
  // Numbered blank markers: (NN) followed by underscores or blank,
  // appearing 2+ times -> this is a cloze/FIB passage, not real comprehension.
  var matches = passage.match(/\(\d{1,2}\)\s*_*/g) || [];
  return matches.length >= 2;
}

// Lazily-built set of generated passage keys for fast membership test.
var _genKeySet = null;
function hasGenerated8Type(passage) {
  if (!_genKeySet) {
    _genKeySet = {};
    try {
      var keys = Object.keys(comprehensionGenerated || {});
      for (var i = 0; i < keys.length; i++) _genKeySet[keys[i]] = true;
    } catch (e) { _genKeySet = {}; }
  }
  var k = compPassageKey(passage);
  return !!_genKeySet[k];
}

function getAllSetsForType(type) {
  if (!_setsByType) {
    _setsByType = { GrammarCloze: [], VocabCloze: [], Editing: [], Comprehension: [] };
    var pool = flattenEnglishPool();
    for (var p = 0; p < pool.length; p++) {
      var buckets = normalizeEnglishQuestions(pool[p].questions || []);
      ["GrammarCloze", "VocabCloze", "Editing", "Comprehension"].forEach(function (t) {
        var arr = buckets[t] || [];
        for (var i = 0; i < arr.length; i++) {
          if (!arr[i]) continue;
          // For Comprehension, require a real passage; others just need items.
          if (t === "Comprehension") {
            var pg = arr[i].passage || "";
            if (pg.length <= 200) continue;
            // Exclude cloze-style (FIB) passages: they contain numbered blank
            // markers like "(31)____" and have no real 8-type questions.
            if (isClozeStylePassage(pg)) continue;
            // Also require the passage to exist in the generated 8-type map,
            // so we never borrow a comprehension we cannot render as 8-type.
            if (!hasGenerated8Type(pg)) continue;
          }
          _setsByType[t].push(arr[i]);
        }
      });
    }
  }
  return _setsByType[type] || [];
}

// Borrow a set of the given type from the global pool, varied by sessionNum
// so different sessions get different content.
function borrowSetForType(type, sessionNum) {
  var sets = getAllSetsForType(type);
  if (!sets.length) return null;
  var idx = (((sessionNum || 1) - 1) % sets.length + sets.length) % sets.length;
  return sets[idx] || sets[0];
}

export function englishPaperToPlan(
  paper,
  settings,
  level,
  sessionNum,
  schoolName,
  pickByLevel,
  pickQuestionsForSchool,
  sectionLevels,
) {
  const buckets = normalizeEnglishQuestions(paper.questions || []);
  const s = settings || {};
  const sIdx = sessionNum ? (sessionNum - 1) % 10 : 0;
  const sections = [];

  // Per-section level: use sectionLevels[type] if available, else overall level
  const lvl = (type) =>
    (sectionLevels && sectionLevels[type]) ? sectionLevels[type] : (level || "medium");

  const gmAll = buckets.GrammarMCQ.length
    ? pickQuestionsForSchool(buckets.GrammarMCQ, schoolName, buckets.GrammarMCQ.length)
    : [];
  const vmAll = buckets.VocabMCQ.length
    ? pickQuestionsForSchool(buckets.VocabMCQ, schoolName, buckets.VocabMCQ.length)
    : [];

  const gmItems = gmAll.length
    ? pickByLevel(gmAll, lvl("GrammarMCQ"), sessionNum, Math.min(10, gmAll.length))
    : buckets.GrammarMCQ.slice(0, 10);
  const vmItems = vmAll.length
    ? pickByLevel(vmAll, lvl("VocabMCQ"), sessionNum, Math.min(10, vmAll.length))
    : buckets.VocabMCQ.slice(0, 10);

  if (gmItems.length) sections.push({ type: "GrammarMCQ", items: gmItems, level: lvl("GrammarMCQ") });
  if (vmItems.length) sections.push({ type: "VocabMCQ", items: vmItems, level: lvl("VocabMCQ") });

  ["GrammarCloze", "VocabCloze", "Editing", "Comprehension"].forEach((type) => {
    // Practice sessions skip passage-less comprehension sets (open-ended questions with no text to read).
    const sets = buckets[type].filter((x) => !x.noPassage);
    if (!sets.length) return;
    const maxSets = s[type]?.sets || 1;
    const chosen = [];
    for (let i = 0; i < maxSets; i++) chosen.push(sets[(sIdx + i) % sets.length]);
    sections.push({ type, sets: maxSets, items: chosen, level: lvl(type) });
  });

  // Ensure every session contains all 6 sections. For any set-based section
  // missing from this paper, borrow one from the global pool so the student
  // can complete a full session (and AI-generated comprehension can show).
  ["GrammarCloze", "VocabCloze", "Editing", "Comprehension"].forEach(function (type) {
    if (sections.some(function (sec) { return sec.type === type; })) return;
    var borrowed = borrowSetForType(type, sessionNum);
    if (borrowed) {
      sections.push({ type: type, sets: 1, items: [borrowed], level: lvl(type) });
    }
  });

  // Sort sections into canonical order so Next walks the full session.
  var ORDER = ["GrammarMCQ", "VocabMCQ", "GrammarCloze", "VocabCloze", "Editing", "Comprehension"];
  sections.sort(function (a, b) {
    return ORDER.indexOf(a.type) - ORDER.indexOf(b.type);
  });

  sections.paperMeta = paper.meta;
  sections.paperKey = paperKeyOf(paper);
  sections.paperLabel =
    paper.meta?.school ||
    paper.meta?.title ||
    paper.meta?.assessment ||
    "P3 English Paper";
  return sections;
}

// Stable id for one paper, shared by the exam plan and the server grader. The pool index
// keeps two papers with the same school and year apart. The answer is not part of the key.
export function paperKeyOf(paper) {
  const pool = flattenEnglishPool();
  const i = pool.indexOf(paper);
  const m = (paper && paper.meta) || {};
  const base = [m.id, m.school, m.year, m.assessment, m.title].filter((x) => x != null && x !== "").join("|").slice(0, 140);
  return (base || "paper") + "#" + (i >= 0 ? i : "x");
}

// Every English past-paper item, in the same ExamSession shape the student sits, so the server
// can grade a submitted answer. One set per paper. Not sent to the client by the learning route.
export function englishPaperGradeSets() {
  const types = ["GrammarMCQ", "VocabMCQ", "GrammarCloze", "VocabCloze", "Editing", "Comprehension"];
  return flattenEnglishPool().map((paper) => {
    const buckets = normalizeEnglishQuestions(paper.questions || []);
    const plan = [];
    for (const type of types) if (buckets[type] && buckets[type].length) plan.push({ type, items: buckets[type] });
    return { setId: paperKeyOf(paper), plan };
  });
}

// One paper as ExamSession-shaped sections [{ type, items }] in the canonical order (mock exam engine, issue #44).
export function englishPaperExamPlan(paper) {
  const types = ["GrammarMCQ", "VocabMCQ", "GrammarCloze", "VocabCloze", "Editing", "Comprehension"];
  const buckets = normalizeEnglishQuestions((paper && paper.questions) || []);
  const plan = [];
  for (const type of types) if (buckets[type] && buckets[type].length) plan.push({ type, items: buckets[type] });
  return plan;
}

export function englishPaperToLegacyInfo(paper) {
  return {
    label:
      paper.meta?.school ||
      paper.meta?.title ||
      paper.meta?.assessment ||
      "Past Paper",
    meta: paper.meta,
  };
}

// ── Chinese adapters ───────────────────────────────────────────────────────────

const ZH_TOPIC_SECTION = {
  BianZi: "BianZi",
  PinYin: "BianZi",
  CiYu: "CiYu",
  KanTu: "KanTu",
  PeiDui: "PeiDui",
  JuZi: "JuZi",
  TianKong: "JuZi",
  ZuJu: "ZuJu",
  YueReadMCQ: "YueRead",
  YueReadOpen: "YueRead",
};

function passageTextOf(item) {
  return (
    item.passage ||
    item.meta?.passageText ||
    item.readingPassage ||
    ""
  );
}

function toChineseBianZi(q) {
  return {
    id: q.id,
    sentence: q.sentence || q.q || "",
    options: q.options || [],
    answer: parseAnswerIndex(q.answer, q.options || []),
    pinyin: q.pinyin || "",
    hint:
      q.hint ||
      q.solution?.tip ||
      (Array.isArray(q.solution?.steps) ? q.solution.steps[0] : "") ||
      "",
    meaning: q.meaning || "",
    note: q.needsParentVerify ? "verify-parent" : undefined,
  };
}

function toChineseCiYu(q) {
  return toChineseBianZi(q);
}

function toChineseKanTuSet(item) {
  if (item.items) return item;
  return {
    id: item.id || "kantu_set",
    setLabel: item.setLabel || item.topic || "看图选词",
    wordBank: item.wordBank || [],
    items: item.items || item.questions || [],
  };
}

function toChinesePeiDuiSet(item) {
  const options = item.options || item.wordBank || [];
  const subQs = item.questions || item.items || [];
  return {
    id: item.id || "peidui_set",
    setLabel: item.setLabel || item.topic || "词语搭配",
    options,
    items: subQs.map((q, i) => ({
      id: q.id || `pd_${i}`,
      blank: q.blank || q.q || q.question || "",
      answer: typeof q.answer === "number" ? options[q.answer] : q.answer,
      hint: q.hint || q.solution?.tip || "",
    })),
  };
}

function toChineseJuZi(q) {
  if (q.tiles && q.targetSentence) return q;
  return {
    id: q.id,
    type: q.type || "expand",
    instruction: q.instruction || "排列词语组成句子",
    baseSentence: q.baseSentence || "",
    targetSentence: q.targetSentence || q.answer || "",
    tiles: q.tiles || [],
    hint: q.hint || q.solution?.tip || "",
  };
}

function toChineseZuJuSet(item) {
  return {
    id: item.id || "zuju_set",
    setLabel: item.setLabel || item.topic || "组句成段",
    sentences: item.sentences || [],
    correctOrder: item.correctOrder || item.sentences?.map((_, i) => i) || [],
    hint: item.hint || "",
  };
}

function toChineseYueReadSet(item) {
  const passage = passageTextOf(item);
  const questions = (item.questions || []).map((q, i) => ({
    id: q.id || `yr_${i}`,
    question: q.question || q.q || "",
    options: q.options || [],
    answer: parseAnswerIndex(q.answer, q.options || []),
    hint: q.hint || q.solution?.tip || "",
  }));
  return {
    id: item.id || "yue_read_set",
    setLabel: item.setLabel || item.topic || "阅读理解",
    passage,
    questions,
    meta: passage
      ? { hasPassage: true, passageText: passage }
      : item.meta,
  };
}

function flattenChineseRawQuestions(questions = []) {
  const flat = [];
  for (const item of questions) {
    if (!item) continue;
    if (Array.isArray(item)) {
      flat.push(...item);
      continue;
    }
    if (item.questions && Array.isArray(item.questions)) {
      flat.push(item);
      continue;
    }
    flat.push(item);
  }
  return flat;
}

export function buildChinesePlanFromPaper(paper, pickByLevel, level, sessionNum, sectionLevels) {
  const grouped = {
    BianZi: [],
    CiYu: [],
    KanTu: [],
    PeiDui: [],
    JuZi: [],
    ZuJu: [],
    YueRead: [],
  };

  const sets = {
    KanTu: [],
    PeiDui: [],
    ZuJu: [],
    YueRead: [],
  };

  // Per-section level helper — falls back to overall level
  const lvl = (type) =>
    (sectionLevels && sectionLevels[type]) ? sectionLevels[type] : (level || "medium");

  for (const raw of flattenChineseRawQuestions(paper.questions || [])) {
    const topic = raw.topic || "";
    const section = ZH_TOPIC_SECTION[topic] || null;

    if (raw.questions && (raw.passage || raw.wordBank || raw.setLabel)) {
      if (topic === "PeiDui" || raw.wordBank) sets.PeiDui.push(toChinesePeiDuiSet(raw));
      else if (topic === "KanTu" || raw.emoji || raw.items) sets.KanTu.push(toChineseKanTuSet(raw));
      else if (topic === "ZuJu" || raw.sentences) sets.ZuJu.push(toChineseZuJuSet(raw));
      else sets.YueRead.push(toChineseYueReadSet(raw));
      continue;
    }

    if (!section) continue;
    if (section === "BianZi") grouped.BianZi.push(toChineseBianZi(raw));
    else if (section === "CiYu") grouped.CiYu.push(toChineseCiYu(raw));
    else if (section === "JuZi") grouped.JuZi.push(toChineseJuZi(raw));
  }

  const plan = [];
  const sIdx = ((sessionNum || 1) - 1) % 10;

  // BianZi & CiYu: apply per-section level for question selection
  const bz = pickByLevel
    ? pickByLevel(grouped.BianZi, lvl("BianZi"), sessionNum, Math.min(5, grouped.BianZi.length))
    : grouped.BianZi.slice(0, 5);
  const cy = pickByLevel
    ? pickByLevel(grouped.CiYu, lvl("CiYu"), sessionNum, Math.min(4, grouped.CiYu.length))
    : grouped.CiYu.slice(0, 4);

  if (bz.length) plan.push({ type: "BianZi", items: bz, level: lvl("BianZi") });
  if (cy.length) plan.push({ type: "CiYu",   items: cy, level: lvl("CiYu") });

  // Set-based sections: difficulty reflected in level field for future use
  if (sets.KanTu.length)
    plan.push({ type: "KanTu",  set: sets.KanTu[sIdx % sets.KanTu.length],   level: lvl("KanTu") });
  if (sets.PeiDui.length)
    plan.push({ type: "PeiDui", set: sets.PeiDui[sIdx % sets.PeiDui.length], level: lvl("PeiDui") });

  const jzItems = grouped.JuZi.slice(0, 3);
  if (jzItems.length) plan.push({ type: "JuZi", items: jzItems, level: lvl("JuZi") });

  if (sets.ZuJu.length)
    plan.push({ type: "ZuJu",    set: sets.ZuJu[sIdx % sets.ZuJu.length],       level: lvl("ZuJu") });
  if (sets.YueRead.length)
    plan.push({ type: "YueRead", set: sets.YueRead[sIdx % sets.YueRead.length], level: lvl("YueRead") });

  plan.paperMeta = paper.meta;
  plan.isPastPaper = !!paper.meta?.assessment?.includes?.("EOY");
  return plan;
}
