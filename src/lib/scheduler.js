// ============================================================
// scheduler.js  (Step 9 - local adaptive round scheduler, layer A)
// Builds a 10-item adaptive round from the student's own record:
//   40% due skill tickets      (pickDrillItems, 1 item per ticket first)
//   30% "adjacent" skills      theta in [0.5, 0.7)  - almost there
//   20% maintenance            theta >= 0.8 and not seen for >= 4 sessions
//   10% exploration            skills in the bank never attempted
// Short-fall is filled adjacent -> tickets -> maintenance -> any.
// Every item is a DIFFERENT item from the bank (seed/dup/recent excluded).
// theta itself is updated in trialLedger (first-try +0.15(1-t), wrong -0.25t,
// delayed success +0.25(1-t), guessed: unchanged). Pure; ASCII-only.
// ============================================================
import { pickDrillItems } from './tickets';

export const MIX = { tickets: 0.4, adjacent: 0.3, maintain: 0.2, explore: 0.1 };

function thetaOf(prog, skill) { const L = prog.skillLedger && prog.skillLedger[skill]; return L && typeof L.theta === 'number' ? L.theta : null; }
function lastSeen(prog, skill) { const L = prog.skillLedger && prog.skillLedger[skill]; return L && L.lastSeenSes != null ? L.lastSeenSes : null; }

function bannedIds(prog, bank) {
  const b = new Set();
  (prog.tickets || []).filter((t) => !t.closed).forEach((t) => { b.add(t.seedItemId); ((bank.dupOf && bank.dupOf[t.seedItemId]) || []).forEach((d) => b.add(d)); });
  return b;
}
function freshItems(prog, bank, skill, used, sessionNum, recentWindow, banned) {
  const served = prog.served || {};
  const pool = ((bank.bank && bank.bank[skill]) || []).filter((id) => !used.has(id) && !(banned && banned.has(id)) && (bank.meta && bank.meta[id] ? bank.meta[id].graded !== false : true));
  const scored = pool.map((id) => ({ id, last: served[id] == null ? -1 : served[id] }));
  scored.sort((a, b) => a.last - b.last);
  const fresh = scored.filter((x) => x.last < 0 || sessionNum - x.last >= recentWindow);
  const list = (fresh.length ? fresh : scored).map((x) => x.id);
  if (list.length > 1) { const k = (sessionNum * 11 + skill.length) % list.length; return list.slice(k).concat(list.slice(0, k)); }
  return list;
}

// scheduleRound(prog, bank, sessionNum, { n }) -> { ids, parts, skills }
export function scheduleRound(prog, bank, sessionNum, opts) {
  const n = (opts && opts.n) || 10, recentWindow = (opts && opts.recentWindow) || 5;
  const quota = { tickets: Math.round(n * MIX.tickets), adjacent: Math.round(n * MIX.adjacent), maintain: Math.round(n * MIX.maintain), explore: Math.max(1, Math.round(n * MIX.explore)) };
  const banned = bannedIds(prog, bank);
  const used = new Set(); const ids = []; const parts = { tickets: 0, adjacent: 0, maintain: 0, explore: 0, fill: 0 }; const skills = [];
  const take = (id, skill, part) => { if (!id || used.has(id) || ids.length >= n) return false; used.add(id); ids.push(id); parts[part] += 1; skills.push(skill); return true; };

  // A) due tickets
  pickDrillItems(prog, bank, sessionNum, { max: quota.tickets, perSkill: 1, recentWindow }).forEach((p) => take(p.itemId, p.skill, 'tickets'));
  const openSkills = new Set((prog.tickets || []).filter((t) => !t.closed).map((t) => t.skill));
  const allSkills = Object.keys((bank && bank.bank) || {});

  // B) adjacent: 0.5 <= theta < 0.7, no open ticket
  const adjacent = allSkills.filter((s) => { const t = thetaOf(prog, s); return t != null && t >= 0.5 && t < 0.7 && !openSkills.has(s); })
    .sort((a, b) => thetaOf(prog, b) - thetaOf(prog, a));
  let i = 0; while (parts.adjacent < quota.adjacent && adjacent.length && i < adjacent.length * 2) { const s = adjacent[i % adjacent.length]; take(freshItems(prog, bank, s, used, sessionNum, recentWindow, banned)[0], s, 'adjacent'); i += 1; }

  // C) maintenance: theta >= 0.8 and last seen >= 4 sessions ago
  const maintain = allSkills.filter((s) => { const t = thetaOf(prog, s), ls = lastSeen(prog, s); return t != null && t >= 0.8 && (ls == null || sessionNum - ls >= 4); })
    .sort((a, b) => (lastSeen(prog, a) || 0) - (lastSeen(prog, b) || 0));
  i = 0; while (parts.maintain < quota.maintain && maintain.length && i < maintain.length) { const s = maintain[i]; take(freshItems(prog, bank, s, used, sessionNum, recentWindow, banned)[0], s, 'maintain'); i += 1; }

  // D) exploration: never attempted
  const explore = allSkills.filter((s) => thetaOf(prog, s) == null);
  i = 0; while (parts.explore < quota.explore && explore.length && i < explore.length) { const s = explore[(sessionNum + i) % explore.length]; take(freshItems(prog, bank, s, used, sessionNum, recentWindow, banned)[0], s, 'explore'); i += 1; }

  // fill: adjacent -> more ticket items -> maintain -> weakest theta -> anything
  if (ids.length < n) {
    const order = adjacent.concat(
      (prog.tickets || []).filter((t) => !t.closed).map((t) => t.skill),
      maintain,
      allSkills.filter((s) => thetaOf(prog, s) != null).sort((a, b) => thetaOf(prog, a) - thetaOf(prog, b)),
      allSkills);
    for (const s of order) { if (ids.length >= n) break; take(freshItems(prog, bank, s, used, sessionNum, recentWindow, banned)[0], s, 'fill'); }
  }
  return { ids, parts, skills, quota };
}
