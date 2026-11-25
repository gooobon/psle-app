// What a student earned for the set they just finished ("Thread +N", "Credits +N"). Pure helpers + a tiny sessionStorage record.
// Plain text only (no emoji). The record is written by serverClient.reportActivity (credits) and clewquest/client.reportThread (thread) and read
// by the result screens through <SetRewards/>. Uses its own key; it never reads or writes any genius_* key.
export const SET_REWARDS_KEY = "rewards_last_set_v1";
export const SET_REWARDS_EVENT = "genius-set-rewards";
const FRESH_MS = 30 * 60 * 1000;

// Thread can be a half (hinted answer = 0.5), so keep one decimal; credits are whole already.
const whole = (n) => { const x = Math.round(Number(n) * 10) / 10; return Number.isFinite(x) && x > 0 ? x : 0; };

// Credits newly awarded by one claim response ({credits:[{credits,newlyAwarded}]}). Only newly awarded rows count, so a repeat claim adds 0.
export function creditsFromClaim(res) {
  return ((res && res.credits) || []).filter((c) => c && c.newlyAwarded).reduce((a, c) => a + whole(c.credits), 0);
}

// Lines to show. Zero values are hidden. flags say which systems are switched on, so a switched-off system never shows a line.
export function setRewardLines(rec, flags) {
  const out = [];
  const f = flags || {};
  const thread = whole(rec && rec.thread), credits = whole(rec && rec.credits);
  if (f.thread !== false && thread > 0) out.push({ key: "thread", text: `Thread +${thread}` });
  if (f.credits !== false && credits > 0) out.push({ key: "credits", text: `Credits +${credits}` });
  return out;
}

const store = () => { try { return typeof sessionStorage !== "undefined" ? sessionStorage : null; } catch { return null; } };
export function readSetRewards(now = Date.now()) {
  const s = store(); if (!s) return { thread: 0, credits: 0 };
  try {
    const v = JSON.parse(s.getItem(SET_REWARDS_KEY) || "null");
    return v && now - (v.at || 0) < FRESH_MS ? { thread: whole(v.thread), credits: whole(v.credits) } : { thread: 0, credits: 0 };
  } catch { return { thread: 0, credits: 0 }; }
}
function write(rec) {
  const s = store(); if (!s) return;
  try { s.setItem(SET_REWARDS_KEY, JSON.stringify({ ...rec, at: Date.now() })); } catch {}
  try { if (typeof window !== "undefined") window.dispatchEvent(new Event(SET_REWARDS_EVENT)); } catch {}
}
export const startSetRewards = () => write({ thread: 0, credits: 0 });
export const addSetRewards = (part) => { const c = readSetRewards(); write({ thread: c.thread + whole(part && part.thread), credits: c.credits + whole(part && part.credits) }); };
