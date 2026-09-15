// ============================================================
// tickets.js  (Step 7 - skill tickets and the remediation drill)
// A wrong (or hinted, or guessed-correct) answer opens a TICKET on its
// skill. The drill serves DIFFERENT items of that skill from the bank; the
// seed item is never re-served (recognition of the same sentence is not
// mastery). A ticket closes after first-try correct answers on 2 distinct
// items in 2 distinct sessions. Re-error is measured by trialLedger.
// Pure functions over `prog`; no React, no storage. ASCII-only.
//
// prog.tickets[] = { skill, seedItemId, sectionType, openedSes, box, due,
//                    wins: [{ses,itemId}], fails, closed, closedSes }
// prog.served{}  = { itemId: lastSessionServed }   (drill recency)
// ============================================================
import { skillKeyOf, isFirstTryCorrect } from './trialLedger';

const INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 8 };
const MCQ_TYPES = ['GrammarMCQ', 'VocabMCQ', 'HanziMcq', 'PinyinMcq', 'VocabMcq'];

function openOf(prog) { return (prog.tickets || []).filter((t) => !t.closed); }

// ---- 1) open / reset tickets from an EXAM or MOCK round -------------------
export function openTicketsFromResults(prog, results, sessionNum) {
  const tickets = (prog.tickets || []).map((t) => ({ ...t }));
  const bySkill = Object.create(null);
  tickets.forEach((t) => { if (!t.closed) bySkill[t.skill] = t; });
  let opened = 0, reset = 0;
  (results || []).forEach((r) => {
    if (!r || r.scored === false || !r.id) return;
    if (isFirstTryCorrect(r)) return;                     // nothing to fix
    const skill = skillKeyOf(r); if (!skill) return;
    const t = bySkill[skill];
    if (!t) {
      const nt = { skill, seedItemId: r.id, sectionType: r.sectionType || null, openedSes: sessionNum, box: 1,
                   due: sessionNum + 1, wins: [], fails: 1, closed: false };
      tickets.push(nt); bySkill[skill] = nt; opened += 1;
    } else {                                              // failed the skill again in a real round: pull forward
      t.box = 1; t.due = Math.min(t.due, sessionNum + 1); t.fails = (t.fails || 0) + 1; t.lastSeed = r.id; reset += 1;
    }
  });
  return { ...prog, tickets, ticketStats: { opened, reset } };
}

// ---- 2) grade tickets from a DRILL round ----------------------------------
export function gradeTicketsFromDrill(prog, results, sessionNum) {
  const tickets = (prog.tickets || []).map((t) => ({ ...t, wins: (t.wins || []).slice() }));
  const bySkill = Object.create(null);
  tickets.forEach((t) => { if (!t.closed) bySkill[t.skill] = t; });
  const served = { ...(prog.served || {}) };
  let closed = 0;
  (results || []).forEach((r) => {
    if (!r || r.scored === false || !r.id) return;
    served[r.id] = sessionNum;
    const skill = skillKeyOf(r); const t = skill && bySkill[skill]; if (!t) return;
    const win = isFirstTryCorrect(r) && r.id !== t.seedItemId;
    if (win) {
      t.wins.push({ ses: sessionNum, itemId: r.id });
      t.box = Math.min(4, (t.box || 1) + 1);
      t.due = sessionNum + (INTERVAL[t.box] || 1);
      const distinctSes = new Set(t.wins.map((w) => w.ses)).size;
      const distinctItems = new Set(t.wins.map((w) => w.itemId)).size;
      if (distinctSes >= 2 && distinctItems >= 2) { t.closed = true; t.closedSes = sessionNum; closed += 1; }
    } else {
      t.box = 1; t.due = sessionNum + 1; t.fails = (t.fails || 0) + 1;
    }
  });
  return { ...prog, tickets, served, ticketStats: { ...(prog.ticketStats || {}), closed } };
}

// ---- 3) choose drill items: due tickets first, different items only -------
// bank = { bank:{skill:[ids]}, dupOf:{id:[ids]}, meta:{id:{...}} }
// Returns [{ skill, itemId, ticket }] up to opts.max, <= opts.perSkill per skill.
export function pickDrillItems(prog, bank, sessionNum, opts) {
  const max = (opts && opts.max) || 10, perSkill = (opts && opts.perSkill) || 2, recentWindow = (opts && opts.recentWindow) || 5;
  const served = prog.served || {};
  const open = openOf(prog).slice().sort((a, b) => (a.due - b.due) || (a.openedSes - b.openedSes));
  const due = open.filter((t) => t.due <= sessionNum);
  const queue = due.length ? due : open;                 // nothing due -> still drill the oldest open tickets
  const out = []; const per = Object.create(null); const used = new Set();
  const candsOf = (t) => {
    const pool = (bank.bank && bank.bank[t.skill]) || [];
    const dupSeed = new Set((bank.dupOf && bank.dupOf[t.seedItemId]) || []);
    const seen = new Set((t.wins || []).map((w) => w.itemId));
    const c = pool.filter((id) => id !== t.seedItemId && !dupSeed.has(id) && !used.has(id) && !seen.has(id)
                               && (bank.meta && bank.meta[id] ? bank.meta[id].graded !== false : true));
    // oldest-served first (never served = -1); ties keep bank order, rotated by session so
    // consecutive drills do not always start from the same set
    c.sort((a, b) => ((served[a] == null ? -1 : served[a]) - (served[b] == null ? -1 : served[b])));
    const fresh = c.filter((id) => served[id] == null || sessionNum - served[id] >= recentWindow);
    const list = fresh.length ? fresh : c;
    if (list.length > 1) { const k = (sessionNum * 7 + t.skill.length) % list.length; return list.slice(k).concat(list.slice(0, k)); }
    return list;
  };
  // round-robin: pass 1 gives every ticket one item, pass 2 a second, ... up to perSkill / max
  for (let pass = 0; pass < perSkill && out.length < max; pass++) {
    for (const t of queue) {
      if (out.length >= max) break;
      per[t.skill] = per[t.skill] || 0;
      if (per[t.skill] > pass) continue;
      const id = candsOf(t)[0]; if (!id) continue;
      used.add(id); per[t.skill] += 1; out.push({ skill: t.skill, itemId: id, ticket: t });
    }
  }
  return out;
}

// ---- 4) next practice set: bias toward OPEN tickets, avoid recent sets ----
export function pickNextSet(sets, prog, fallbackIdx, opts) {
  const n = (sets && sets.length) || 1;
  const start = ((Math.trunc(fallbackIdx || 0) % n) + n) % n;
  const recentWindow = (opts && opts.recentWindow) || 5;
  const weight = Object.create(null);
  openOf(prog).forEach((t) => { weight[t.skill] = (weight[t.skill] || 0) + 1; });
  if (!Object.keys(weight).length) return start;
  const curSes = prog.nextSession || 1;
  const recentSets = new Set((prog.trials || []).filter((x) => x.setId && curSes - (x.sessionNum || 0) < recentWindow).map((x) => x.setId));
  let best = start, bestScore = -1;
  for (let step = 0; step < n; step++) {
    const i = (start + step) % n; const set = sets[i];
    if (recentSets.has(set.setId)) continue;
    let score = 0;
    (set.plan || []).forEach((sec) => (sec.items || []).forEach((it) => {
      const leaves = [it].concat(it.items || [], it.blanks || [], it.questions || []);
      leaves.forEach((l) => { const k = l && l.skill; if (k && weight[k]) score += weight[k]; });
    }));
    if (score > bestScore) { bestScore = score; best = i; }
  }
  return best;
}

// ---- 5) runtime bank for tracks without an emitted bank (English) --------
// index = indexSets(sets) from reviewRounds; key = skill or 'sec:'+sectionType
export function bankFromIndex(index) {
  const bank = {}, meta = {};
  const byId = (index && index.byId) || {};
  Object.keys(byId).forEach((id) => {
    const h = byId[id];
    if (h.container && h.containerId === id) return;     // containers themselves are not items
    const leaf = h.leaf || null;
    const skill = (leaf && typeof leaf.skill === 'string' && leaf.skill) || ('sec:' + h.sectionType);
    (bank[skill] = bank[skill] || []).push(id);
    meta[id] = { skill, setId: h.setId, sectionType: h.sectionType, graded: h.sectionType !== 'Synthesis' && h.sectionType !== 'SentenceCraft' };
  });
  return { bank, dupOf: {}, meta };
}

export function ticketSummary(prog) {
  const all = prog.tickets || [];
  const open = all.filter((t) => !t.closed);
  const bySkill = Object.create(null);
  open.forEach((t) => { bySkill[t.skill] = (bySkill[t.skill] || 0) + 1; });
  return { open: open.length, closed: all.length - open.length, due: open.filter((t) => t.due <= (prog.nextSession || 1)).length, bySkill };
}
