// ---------------------------------------------------------------------------
//  vocabReview.js - language-scoped Leitner spaced-review store (pure logic).
//  Same algorithm as zhReview.js (box 1-4, intervals 1/2/4/8 sessions, mastered
//  after correct answers in 2 distinct sessions). zhReview.js is left untouched
//  so existing Chinese data keeps its storage key; this module is used by the
//  English gate (Step 4) and can serve any future language.
//  Usage: const en = makeReviewStore('en'); en.assembleGate(words, EN_VOCAB, 10)
// ---------------------------------------------------------------------------

const INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 8 };

export function makeReviewStore(lang) {
  const KEY = 'genius_' + lang + '_review_v2';
  const SESS_KEY = 'genius_' + lang + '_session_unknown';

  function scope() {
    try {
      const u = (typeof window !== 'undefined' && window._GENIUS_STORE && window._GENIUS_STORE._currentUser) || 'anon';
      return u + '_' + lang;
    } catch (_) { return 'anon_' + lang; }
  }
  function loadAll() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { return {}; } }
  function saveAll(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (_) {} }
  function getState() { const all = loadAll(); return all[scope()] || { words: {}, ses: 0, masteredCount: 0 }; }
  function setState(st) { const all = loadAll(); all[scope()] = st; saveAll(all); }

  function addUnknown(word) {
    try { const s = new Set(JSON.parse(sessionStorage.getItem(SESS_KEY) || '[]')); s.add(word); sessionStorage.setItem(SESS_KEY, JSON.stringify([...s])); } catch (_) {}
  }
  function getSessionUnknown() { try { return JSON.parse(sessionStorage.getItem(SESS_KEY) || '[]'); } catch (_) { return []; } }
  function clearSessionUnknown() { try { sessionStorage.removeItem(SESS_KEY); } catch (_) {} }

  // register collected words, bump the session counter, return up to `limit` due words
  function assembleGate(collected, dict, limit) {
    const cap = limit || 10;
    const st = getState();
    const curSes = st.ses + 1;
    (collected || []).forEach((w) => {
      if (!w || !dict || !dict[w]) return;
      const e = st.words[w];
      if (!e) st.words[w] = { box: 1, dueSes: curSes, sess: [], att: 0, cor: 0, mastered: false, firstSes: curSes };
      else if (!e.mastered && e.dueSes > curSes) e.dueSes = curSes;
    });
    st.ses = curSes;
    setState(st);
    const due = Object.keys(st.words).filter((w) => !st.words[w].mastered && st.words[w].dueSes <= curSes && dict[w]);
    due.sort((a, b) => (curSes - st.words[b].dueSes) - (curSes - st.words[a].dueSes));
    return due.slice(0, cap);
  }

  function grade(word, correct) {
    const st = getState(); const w = st.words[word]; if (!w) return;
    const curSes = st.ses;
    w.att = (w.att || 0) + 1;
    if (correct) {
      w.cor = (w.cor || 0) + 1;
      if (!w.sess.includes(curSes)) w.sess.push(curSes);
      w.box = Math.min(4, (w.box || 1) + 1);
      w.dueSes = curSes + (INTERVAL[w.box] || 1);
      if (new Set(w.sess).size >= 2 && !w.mastered) { w.mastered = true; st.masteredCount = (st.masteredCount || 0) + 1; }
    } else { w.box = 1; w.dueSes = curSes + 1; }
    setState(st);
  }

  function stats() { const st = getState(); return { mastered: st.masteredCount || 0, active: Object.values(st.words).filter((w) => !w.mastered).length, ses: st.ses }; }

  return { lang, getState, addUnknown, getSessionUnknown, clearSessionUnknown, assembleGate, grade, stats };
}
