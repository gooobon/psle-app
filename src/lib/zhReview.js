// ---------------------------------------------------------------------------
//  P4 Chinese vocab review gate — Leitner spaced-repetition store (pure logic)
//  Pure review: words come ONLY from what the student didn't know / got wrong.
//  State is kept in localStorage, independent of the exam progress structure.
// ---------------------------------------------------------------------------

const KEY = "genius_zh_review_v2";
const SESS_KEY = "genius_zh_session_unknown"; // words tapped this session (sessionStorage)
const INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 8 };  // Leitner box -> sessions until due again

function scope() {
  try {
    const u = (typeof window !== "undefined" && window._GENIUS_STORE && window._GENIUS_STORE._currentUser) || "anon";
    return u + "_zh";
  } catch (_) { return "anon_zh"; }
}
function loadAll() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (_) { return {}; } }
function saveAll(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (_) {} }
export function getState() {
  const all = loadAll();
  return all[scope()] || { words: {}, ses: 0, masteredCount: 0 };
}
function setState(st) { const all = loadAll(); all[scope()] = st; saveAll(all); }

// ---- session-scoped collection of tapped ("didn't know") words ----
export function addUnknown(word) {
  try {
    const s = new Set(JSON.parse(sessionStorage.getItem(SESS_KEY) || "[]"));
    s.add(word);
    sessionStorage.setItem(SESS_KEY, JSON.stringify([...s]));
  } catch (_) {}
}
export function getSessionUnknown() {
  try { return JSON.parse(sessionStorage.getItem(SESS_KEY) || "[]"); } catch (_) { return []; }
}
export function clearSessionUnknown() { try { sessionStorage.removeItem(SESS_KEY); } catch (_) {} }

// ---------------------------------------------------------------------------
//  assembleGate: register this session's collected words, bump the session
//  counter, and return up to `limit` words that are due for review.
//  `collected` = array of words (tapped + wrong-answer core words).
//  `dict` = ZH_VOCAB (only words that have an entry are usable).
// ---------------------------------------------------------------------------
export function assembleGate(collected, dict, limit = 10) {
  const st = getState();
  const curSes = st.ses + 1;
  (collected || []).forEach((w) => {
    if (!w || !dict[w]) return;
    const e = st.words[w];
    if (!e) st.words[w] = { box: 1, dueSes: curSes, sess: [], att: 0, cor: 0, mastered: false, firstSes: curSes };
    else if (!e.mastered && e.dueSes > curSes) e.dueSes = curSes; // re-missed -> pull forward
  });
  st.ses = curSes;
  setState(st);
  const st2 = getState();
  const due = Object.keys(st2.words).filter(
    (w) => !st2.words[w].mastered && st2.words[w].dueSes <= curSes && dict[w]
  );
  // most overdue first (larger curSes - dueSes)
  due.sort((a, b) => (curSes - st2.words[b].dueSes) - (curSes - st2.words[a].dueSes));
  return due.slice(0, limit);
}

// ---- grade one word after the mini-quiz ----
export function grade(word, correct) {
  const st = getState();
  const w = st.words[word];
  if (!w) return;
  const curSes = st.ses;
  w.att = (w.att || 0) + 1;
  if (correct) {
    w.cor = (w.cor || 0) + 1;
    if (!w.sess.includes(curSes)) w.sess.push(curSes);
    w.box = Math.min(4, (w.box || 1) + 1);
    w.dueSes = curSes + (INTERVAL[w.box] || 1);
    const distinct = new Set(w.sess).size;
    if (distinct >= 2 && !w.mastered) { w.mastered = true; st.masteredCount = (st.masteredCount || 0) + 1; }
  } else {
    w.box = 1;
    w.dueSes = curSes + 1;
  }
  setState(st);
}

// ---- extract wrong-answer core words from graded results + the exam plan ----
export function coreWordsFromWrong(allResults, plan, dict, stop) {
  const idToItem = {};
  (plan || []).forEach((sec) => (sec.items || []).forEach((it) => {
    if (it.id) idToItem[it.id] = it;
    // nested sub-items (VocabMatch)
    (it.items || []).forEach((s) => { if (s.id) idToItem[s.id] = s; });
    // cloze blanks — the renderer keys results as `<itemId>_<num>`
    (it.blanks || []).forEach((b) => { idToItem[(it.id || "") + "_" + b.num] = b; });
    // reading sub-questions
    (it.questions || []).forEach((q) => { if (q.id) idToItem[q.id] = q; });
  }));
  const out = new Set();
  const isHan = (s) => typeof s === "string" && /[一-鿿]/.test(s);
  const push = (w) => { if (isHan(w) && dict[w] && !(stop && stop.has(w))) out.add(w); };
  (allResults || []).forEach((r) => {
    if (r.correct) return;
    const it = idToItem[r.id];
    if (!it) return;
    // MCQ answer is an option INDEX -> resolve to the option word.
    if (typeof it.answer === "number" && Array.isArray(it.options)) push(it.options[it.answer]);
    else if (isHan(it.answer)) push(it.answer);       // cloze/match answer is the word itself
    (it.keywords || []).forEach((k) => push(k && k.w)); // curated core words when present
  });
  return [...out];
}

export function stats() {
  const st = getState();
  const active = Object.values(st.words).filter((w) => !w.mastered).length;
  return { mastered: st.masteredCount || 0, active, ses: st.ses };
}
