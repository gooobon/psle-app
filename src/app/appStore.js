"use client";
// Local user / progress store shared by the shell and the lazily loaded practice screens (moved from ClaudeApp.js unchanged).
import { todayStr } from "@/lib/sessionUtils";
import { SERVER_AUTH, syncLearningTrials } from "@/lib/serverClient";
import { DEFAULT_SETTINGS } from "@/lib/dataEngineLite";
import { ensureLedgerFields } from "@/lib/trialLedger";





//  Seed accounts - always present after any artifact reload
// DEMO ACCOUNTS ONLY (public by design). Real users must never be listed here:
// they sign up in the app and live in localStorage (genius_users_v2). Progress is
// keyed by user id (<id>_<grade>_<subject> in genius_progress_v2), independent of
// the user record, so re-registering an existing id restores its progress.
export const SEED_USERS = {
  "demo_student": {
    id:"demo_student", password:"demo123", role:"student",
    name:"Demo Student", grade:"P3",
    school:"Anglo-Chinese School (Junior)",
    childIds:[], createdAt:"2026-01-01"
  },
  "demo_parent": {
    id:"demo_parent", password:"demo456", role:"parent",
    name:"Demo Parent", grade:"P3",
    childIds:["demo_student"], createdAt:"2026-01-01"
  },
};

//  Persistent store using localStorage 
// Users and progress survive page refreshes, deployments, and browser restarts
export const LS_USERS_KEY    = "genius_users_v2";
export const LS_PROGRESS_KEY = "genius_progress_v2";

export function _loadFromLS(key, fallback){
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch(e){ return fallback; }
}
export function _saveToLS(key, val){
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){}
}

// ── Progress persists across logins ──────────────────────────
// A student's answer history, mistakes and session counter are stored in
// localStorage and are NEVER wiped on load. On the next login the student
// resumes from `nextSession` (= history length + 1) - i.e. the session AFTER
// the last one they finished, not session 1.
//
// NOTE: do NOT reintroduce a "one-time reset" block here. An earlier build
// cleared progress on load, which made students restart from session 1 every
// time. If a future release ever needs a deliberate wipe, do it as an explicit
// admin action, never automatically on page load.
export const _persistedUsers = _loadFromLS(LS_USERS_KEY, {});
export const _persistedProgress = _loadFromLS(LS_PROGRESS_KEY, {});

// Build in-memory store seeded from localStorage
export const STORE = {
  users:    { ..._persistedUsers },
  progress: { ..._persistedProgress },
};

// Merge seed users (never overwrite a user already in localStorage)
Object.entries(SEED_USERS).forEach(([id, u])=>{
  if(!STORE.users[id]) STORE.users[id] = {...u};
});
// Always persist merged seed users
_saveToLS(LS_USERS_KEY, STORE.users);

export function storeGet(key)   { return STORE[key]; }
export function storeSet(key, v){ STORE[key] = v; }

// Save users to localStorage whenever changed
export function persistUsers(){
  _saveToLS(LS_USERS_KEY, STORE.users);
}
// Save progress to localStorage whenever changed
export function persistProgressLS(key, data){
  STORE.progress[key] = data;
  _saveToLS(LS_PROGRESS_KEY, STORE.progress);
}

export function allUsers(){ return Object.values(STORE.users); }

// Server auth (flag on): mirror a server profile into the local store WITHOUT a password, so the
// existing app (which reads STORE.users) keeps working. Existing local records are never replaced.
export function mirrorServerUser(p, extra){
  const id = p.role==="parent" ? p.id : p.username;
  const prev = STORE.users[id] || {};
  STORE.users[id] = {
    ...prev, id, role:p.role, name:p.name, grade:p.grade||prev.grade, school:p.school||prev.school,
    serverId:p.id, ...(p.role==="student" ? {pictureCode:!!p.pictureCode} : {}), ...(extra||{}),
  };
  persistUsers();
  return STORE.users[id];
}

// Admin auth is server-side only: see /api/admin/{login,logout,session}.
export const ADMIN_USER = { id:"admin", name:"Admin", role:"admin" };
export async function adminLogin(pw){
  try{
    const r = await fetch("/api/admin/login",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:pw})});
    return r.ok;
  }catch(e){ return false; }
}
export async function adminSessionValid(){
  try{
    const r = await fetch("/api/admin/session",{credentials:"same-origin",cache:"no-store"});
    return r.ok && (await r.json()).admin===true;
  }catch(e){ return false; }
}

export function getProgress(userId, grade, subject){
  const key = userId+"_"+grade+"_"+subject;
  let p = STORE.progress[key];
  // Recreate a fresh default if nothing is stored OR the stored value is not a
  // valid progress object (repairs corrupted entries such as a bare string).
  if(!p || typeof p !== "object" || Array.isArray(p)){
    const isDemoUser = userId==="demo_student";
    const seedH = isDemoUser && grade==="P3" && subject==="English" ? makeSeedHistory(userId) : [];
    p = {
      history: seedH,
      settings: {...DEFAULT_SETTINGS},
      mistakes: [],
      nextSession: seedH.length+1,
    };
    STORE.progress[key] = p;
  }
  // Backfill any missing fields so older stored shapes never yield undefined.
  if(!Array.isArray(p.history))  p.history  = [];
  if(!Array.isArray(p.mistakes)) p.mistakes = [];
  if(!p.settings)                p.settings = {...DEFAULT_SETTINGS};
  if(typeof p.nextSession !== "number") p.nextSession = p.history.length + 1;
  ensureLedgerFields(p);
  return p;
}

export function setProgress(userId, grade, subject, data){
  const key = `${userId}_${grade}_${subject}`;
  persistProgressLS(key, data);
  // Local progress stays keyed by the username. The server row is the profile UUID (serverId).
  // Passing the username made the learning sync skip every real student (it requires a UUID).
  const serverId = (STORE.users[userId] && STORE.users[userId].serverId) || userId;
  syncLearningTrials(serverId, grade, subject, data).catch(()=>{}); // flag NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED (default off); copy only, fire-and-forget
}

export function makeSeedHistory(userId){
  const seeds = {
    demo_student: [
      { sessionNum:1,  date:"10 May 2026", scores:{ GrammarMCQ:62, VocabMCQ:56, GrammarCloze:75, VocabCloze:50, Editing:87, Comprehension:66 }, totalPct:66, isMockExam:false,
        mistakes:[
          { id:"gm03", topic:"Simple Past", sectionType:"GrammarMCQ", correct:false, solvedAfterHint:true, attempts:2, difficulty:"core",
            q:"Yesterday, the children ______ to the zoo.", yourAnswer:"go", correctAnswer:"went",
            explanation:"'Yesterday' is a past-time clue, so we use the simple past tense 'went' (not 'go').",
            solution:{method:"Time Clue  Tense", steps:["'Yesterday' = past time","Past tense of 'go' = 'went'","Answer: went"], tip:"Past-time words (yesterday, last week) always need past tense."} },
          { id:"vm05", topic:"Vocabulary", sectionType:"VocabMCQ", correct:false, solvedAfterHint:false, attempts:1, difficulty:"core",
            q:"The naughty boy felt ______ after breaking the vase.", yourAnswer:"proud", correctAnswer:"guilty",
            explanation:"'Guilty' means feeling bad after doing something wrong - that fits breaking the vase." }
        ] },
      { sessionNum:2,  date:"13 May 2026", scores:{ GrammarMCQ:68, VocabMCQ:62, GrammarCloze:75, VocabCloze:62, Editing:87, Comprehension:66 }, totalPct:70, isMockExam:false,
        mistakes:[
          { id:"vm08", topic:"Vocabulary", sectionType:"VocabMCQ", correct:false, solvedAfterHint:false, attempts:1, difficulty:"stretch",
            q:"The ______ smell of fresh bread filled the kitchen.", yourAnswer:"gloomy", correctAnswer:"fragrant",
            explanation:"'Fragrant' means having a nice, sweet smell - perfect for fresh bread." }
        ] },
      { sessionNum:3,  date:"16 May 2026", scores:{ GrammarMCQ:75, VocabMCQ:68, GrammarCloze:100,VocabCloze:75, Editing:87, Comprehension:83 }, totalPct:79, isMockExam:false },
      { sessionNum:4,  date:"18 May 2026", scores:{ GrammarMCQ:81, VocabMCQ:75, GrammarCloze:100,VocabCloze:75, Editing:100,Comprehension:83 }, totalPct:85, isMockExam:false },
      { sessionNum:5,  date:"21 May 2026", scores:{ GrammarMCQ:87, VocabMCQ:81, GrammarCloze:100,VocabCloze:87, Editing:100,Comprehension:83 }, totalPct:89, isMockExam:false },
      { sessionNum:6,  date:"23 May 2026", scores:{ GrammarMCQ:87, VocabMCQ:81, GrammarCloze:100,VocabCloze:87, Editing:100,Comprehension:100},totalPct:92, isMockExam:false },
      { sessionNum:7,  date:"25 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:87, GrammarCloze:100,VocabCloze:87, Editing:100,Comprehension:100},totalPct:94, isMockExam:false },
      { sessionNum:8,  date:"26 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:87, GrammarCloze:100,VocabCloze:100,Editing:100,Comprehension:100},totalPct:96, isMockExam:false },
      { sessionNum:9,  date:"27 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:87, GrammarCloze:100,VocabCloze:100,Editing:100,Comprehension:100},totalPct:96, isMockExam:false },
      { sessionNum:10, date:"28 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:93, GrammarCloze:100,VocabCloze:100,Editing:100,Comprehension:100},totalPct:97, isMockExam:false },
      { sessionNum:11, date:"28 May 2026", scores:{ GrammarMCQ:75, VocabMCQ:68, GrammarCloze:75, VocabCloze:75, Editing:87, Comprehension:83 }, totalPct:77, isMockExam:true, school:"Nanyang Primary", examType:"WA1" },
    ],
  };
  return seeds[userId] || seeds["demo_student"].map(s=>({...s, totalPct: Math.max(50, s.totalPct-15)}));
}



