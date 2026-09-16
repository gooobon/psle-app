"use client";
import React from 'react';
import { useState, useRef, useEffect } from "react";

import {
  buildPlan, buildZhPlan, buildZhPastPaperPlan, buildPastPaperPlan, MOCK_EXAMS,
  recommendLevel, recommendSectionLevels, selectPastPaper,
  pickQuestionsForSchool, getSchoolProfile,
  DEFAULT_SETTINGS,
} from '@/lib/dataEngine';

import {
  seededShuffle, WORD_DICT, SYN_ANT, ZH_CHAR_DICT, ZH_SECTION_ORDER, SECTION_ORDER,
} from '@/lib/quizMeta';

import {
  SUBJECTS, GRADES, LIVE_CONTENT,
  ComingSoonToast, SubjectSelectScreen, ComingSoonScreen,
  StudentHome, ZhHome, StudentShell,
} from '@/components/Dashboard';

import { SessionScreen }   from '@/components/EnglishSession';
import { ExamSessionScreen } from '@/components/ExamSession';
import { WA1_PRACTICE_SETS } from '@/data/p3/english/wa1_practice';
import { WA1_ZH_PRACTICE } from '@/data/p3/chinese/wa1_practice';
// CLEANUP1: zhRemediation.js retired (replaced by src/lib/tickets.js)
import { ZhSessionScreen } from '@/components/ChineseSession';
import { todayStr, fmtTime } from '@/lib/sessionUtils';
import { recordTrials, ensureLedgerFields, MODE as TRIAL_MODE, firstTryStats } from '@/lib/trialLedger'; // STEP1_TRIAL_LEDGER // STEP3A_KPI_HEADER
import ZhReviewGate from '@/components/ZhReviewGate';
import ZH_VOCAB from '@/data/p3/chinese/zh_vocab.json';
import { getSessionUnknown as zhGetSessionUnknown, clearSessionUnknown as zhClearSessionUnknown, assembleGate as zhAssembleGate, coreWordsFromWrong as zhCoreWordsFromWrong } from '@/lib/zhReview';

// Function words never worth pushing into the whole-set review gate.
const ZH_GATE_STOP = new Set("的了是我你他她它们在有和就也都不这那个吗呢吧与及或把被让从向对为之地得着过很太最会要能可跟给还又再只等啊呀哦嗯".split(""));

import { StudentResultScreen, ZhResultScreen } from '@/components/ResultScreen';
import ZhWa1ResultScreen from '@/components/ZhWa1ResultScreen'; // STEP3B_ZH_RESULT
import EnReviewGate from '@/components/EnReviewGate'; // STEP4_EN_GATE
import { makeReviewStore } from '@/lib/vocabReview';
const EN_REVIEW = makeReviewStore('en');
import ZH_BANK from '@/data/p3/chinese/wa1_bank.json'; // STEP7_TICKETS
import { openTicketsFromResults, gradeTicketsFromDrill, pickDrillItems, pickNextSet, bankFromIndex, ticketSummary } from '@/lib/tickets';

import { Wrap, StudentBottomNav, C, BigBtn, ErrorBox, InputField, SFX, SpeakBtn } from '@/lib/uiShared';

import { ParentApp } from '@/components/ParentDashboard';
import ReviewRounds from '@/components/ReviewRounds'; // STEP2_ROUND_REVIEW
import VocabQuiz from '@/components/VocabQuiz'; // STEP2F_VOCAB_QUIZ_V2
import EN_VOCAB from '@/data/p3/english/en_vocab.json';
import { indexSets, buildRoundReviewPlan, listReviewableRounds, markRoundReviewed, REVIEW_SET_ID, enrichMistakes, roundVocabCandidates } from '@/lib/reviewRounds'; // STEP2D_VOCAB_BY_ROUND // STEP2B_MISTAKE_ENRICH
import WA1_ZH_DRILL from '@/data/p3/chinese/wa1_drill'; // STEP10_DRILL_INDEX
const ZH_ROUND_INDEX = indexSets([...WA1_ZH_PRACTICE, ...(WA1_ZH_DRILL || [])]);
const EN_ROUND_INDEX = indexSets(WA1_PRACTICE_SETS);
const EN_BANK = bankFromIndex(EN_ROUND_INDEX);
import { scheduleRound } from '@/lib/scheduler'; // STEP9_ADAPTIVE





//  Seed accounts - always present after any artifact reload 
const SEED_USERS = {
  "joonhee2018": {
    id:"joonhee2018", password:"002323", role:"student",
    name:"Joonhee", grade:"P3",
    school:"Ai Tong Primary School",
    childIds:[], createdAt:"2026-05-01"
  },
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
const LS_USERS_KEY    = "genius_users_v2";
const LS_PROGRESS_KEY = "genius_progress_v2";

function _loadFromLS(key, fallback){
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch(e){ return fallback; }
}
function _saveToLS(key, val){
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
const _persistedUsers = _loadFromLS(LS_USERS_KEY, {});
const _persistedProgress = _loadFromLS(LS_PROGRESS_KEY, {});

// Build in-memory store seeded from localStorage
const STORE = {
  users:    { ..._persistedUsers },
  progress: { ..._persistedProgress },
};

// Merge seed users (never overwrite a user already in localStorage)
Object.entries(SEED_USERS).forEach(([id, u])=>{
  if(!STORE.users[id]) STORE.users[id] = {...u};
});
// Always persist merged seed users
_saveToLS(LS_USERS_KEY, STORE.users);

function storeGet(key)   { return STORE[key]; }
function storeSet(key, v){ STORE[key] = v; }

// Save users to localStorage whenever changed
function persistUsers(){
  _saveToLS(LS_USERS_KEY, STORE.users);
}
// Save progress to localStorage whenever changed
function persistProgressLS(key, data){
  STORE.progress[key] = data;
  _saveToLS(LS_PROGRESS_KEY, STORE.progress);
}

function allUsers(){ return Object.values(STORE.users); }

const ADMIN_ACCOUNTS = [
  { id:"genius_admin", password:"GeniusAdmin2026!", name:"Genius Project Admin", role:"admin" },
  { id:"admin",        password:"admin123",          name:"Admin",               role:"admin" },
];
function isAdmin(id, pw){ return ADMIN_ACCOUNTS.find(a=>a.id===id&&a.password===pw)||null; }

function getProgress(userId, grade, subject){
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

function setProgress(userId, grade, subject, data){
  const key = `${userId}_${grade}_${subject}`;
  persistProgressLS(key, data);
}

function makeSeedHistory(userId){
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



function ChineseApp({user, getProgress, setProgress, onBack, onLogout, onSubjectChange, onGradeChange}){

  const grade="P3", subject="Chinese";
  const prog = getProgress(grade, subject);
  // Remediation: bias next WA1 mock toward the student's weakest traps
  // (falls back to sequential progression when there is nothing to remediate).
  const wa1Idx = pickNextSet(WA1_ZH_PRACTICE, prog, ((prog.nextSession-1)%60+60)%60);
  // Item-level drill: only the student's weak MCQ items (null when none).
  // Ticket drill: different items of the skills the student keeps missing (never the seed item)
  const drillPicks = pickDrillItems(prog, ZH_BANK, prog.nextSession, { max: 10, perSkill: 2 });
  const drill = drillPicks.length ? { plan: buildRoundReviewPlan({ mistakes: drillPicks.map(x=>({id:x.itemId})) }, ZH_ROUND_INDEX).plan } : null;
  const zhTickets = ticketSummary(prog);

  const [screen,setScreen] = useState("home");   // home | session | result
  const [inSession,setInSession] = useState(false);
  const [examMode,setExamMode] = useState(false); // Chinese WA1 60-set mock (coexists with adaptive)
  const [drillMode,setDrillMode] = useState(false); // item-level weak-trap remediation drill
  const [sessionResult,setSessionResult] = useState(null);
  const [startFromSection, setStartFromSection] = useState(null);
  const [reviewSection, setReviewSection] = useState(null);
  const [zhGate, setZhGate] = useState(null); // words[] when the whole-set review gate is showing
  const [dailyResult, setDailyResult] = useState(null); // {results, sessionNum} for the end-of-round summary (after the gate)
  const [adaptive, setAdaptive] = useState(null); // {plan, ids, parts} while an adaptive round is running
  function startAdaptive(){
    const sch = scheduleRound(prog, ZH_BANK, prog.nextSession, { n: 10 });
    if(!sch.ids.length) return;
    const plan = buildRoundReviewPlan({ mistakes: sch.ids.map(id=>({id})) }, ZH_ROUND_INDEX).plan;
    setAdaptive({ plan, ids: sch.ids, parts: sch.parts });
  }
  function finishAdaptive(results){
    const ses = prog.nextSession;
    let next = recordTrials(prog, results, { mode: TRIAL_MODE.EXAM, sessionNum: ses, setId: 'ZS_ADAPT' });
    next = gradeTicketsFromDrill(next, results, ses);        // wins on different items close tickets
    next = openTicketsFromResults(next, results, ses);       // new failures open tickets
    setProgress(grade, subject, next);
    setAdaptive(null);
    setDailyResult({ results, sessionNum: ses - 1 });
    let words = [];
    try {
      const tapped = zhGetSessionUnknown();
      const wrongCore = zhCoreWordsFromWrong(results, adaptive.plan, ZH_VOCAB, ZH_GATE_STOP);
      const collected = [...tapped, ...wrongCore].filter((w) => w && !ZH_GATE_STOP.has(w));
      words = zhAssembleGate(collected, ZH_VOCAB, 10);
      zhClearSessionUnknown();
    } catch (_) { words = []; }
    if (words.length > 0) { setZhGate(words); return; }
    setScreen("dailyResult");
  }
  const [roundReview, setRoundReview] = useState(null); // {plan, sessionNum} while re-solving a past round
  function startRoundReview(sessionNum){
    const entry=(prog.history||[]).find(h=>h.sessionNum===sessionNum);
    if(!entry) return;
    const built=buildRoundReviewPlan(entry, ZH_ROUND_INDEX);
    if(!built.plan.length) return;
    setRoundReview({plan:built.plan, sessionNum});
  }
  function finishRoundReview(results){
    const withTrials=recordTrials(prog, results, { mode: TRIAL_MODE.REVIEW, sessionNum: roundReview.sessionNum, setId: REVIEW_SET_ID });
    setProgress(grade, subject, markRoundReviewed(withTrials, roundReview.sessionNum, results, todayStr()));
    setRoundReview(null); setScreen("mistakes");
  }
  const [sectionResults, setSectionResults] = useState(() => {
    const p0 = getProgress(grade, subject);
    return (p0.sessionSections && p0.sessionSections.sessionNum === p0.nextSession)
      ? (p0.sessionSections.results || {})
      : {};
  });
  const zhPlan = WA1_ZH_PRACTICE[wa1Idx].plan;
  const ZH_WA1_ORDER = zhPlan.map(s => s.type);
  function persistSectionResults(merged){
    setProgress(grade, subject, { ...prog, sessionSections: { sessionNum: prog.nextSession, results: merged } });
  }
  function startSession(fromSection){
    setStartFromSection(typeof fromSection === "string" ? fromSection : null);
    setExamMode(true);
  }
  function exitSession(){ setExamMode(false); setStartFromSection(null); }
  function recordSection(type, results){
    if(!type) return;
    const merged = { ...sectionResults, [type]: results || [] };
    setSectionResults(merged);
    persistSectionResults(merged);
    if(ZH_WA1_ORDER.every(t => merged[t] !== undefined)){
      const combined = ZH_WA1_ORDER.flatMap(t => merged[t] || []);
      setSectionResults({});
      recordDaily(combined);
    }
  }

  // Mock is due every 10 sessions (mirrors the English dashboard cadence).
  const isMockDue = prog.nextSession > 1 && (prog.nextSession - 1) % 10 === 0;

  function saveEntry(results, isMock){
    const sessionNum=prog.nextSession;
    const graded=(results||[]).filter(r=>r.scored!==false);
    const bySection={};
    ZH_WA1_ORDER.forEach(t=>{
      const items=graded.filter(r=>r.sectionType===t);
      if(items.length) bySection[t]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=graded.length?Math.round(graded.filter(r=>r.correct).length/graded.length*100):0;
    const missed=graded.filter(r=>!r.correct);
    const newEntry={sessionNum,date:todayStr(),scores:bySection,totalPct,isMockExam:!!isMock,mistakes:missed.map(r=>({...r}))};
    const newMistakes=[...(prog.mistakes||[]),...missed.map(r=>({...r,date:todayStr()}))];
    const withTrials=recordTrials(prog, results, { mode: isMock?TRIAL_MODE.MOCK:TRIAL_MODE.EXAM, sessionNum, setId: WA1_ZH_PRACTICE[wa1Idx].setId });
    const withTickets=openTicketsFromResults(withTrials, results, sessionNum);
    setProgress(grade,subject,{...withTickets,history:[...(prog.history||[]),newEntry],mistakes:newMistakes,nextSession:sessionNum+1,sessionSections:null});
    return sessionNum;
  }
  // Daily practice = the 60 generated sets (flagged mock every 10th session).
  // The WHOLE set is now finished (every section type recorded) -> this is the
  // ONE point where the spaced-review gate should appear. Assemble it from the
  // words the student tapped ("didn't know") across the whole set + the core
  // words of wrong answers; if any are due, show the gate before going home.
  function goHomeAfterDaily(){ setZhGate(null); setExamMode(false); setStartFromSection(null); setScreen("home"); }
  // After the gate (or directly when no words are due) show the round summary, then home.
  function showDailyResult(){ setZhGate(null); setExamMode(false); setStartFromSection(null); setScreen("dailyResult"); }
  function recordDaily(results){
    const sessionNum=saveEntry(results, isMockDue);
    setDailyResult({results, sessionNum});
    let words = [];
    try {
      const tapped = zhGetSessionUnknown();
      const wrongCore = zhCoreWordsFromWrong(results, zhPlan, ZH_VOCAB, ZH_GATE_STOP);
      const collected = [...tapped, ...wrongCore].filter((w) => w && !ZH_GATE_STOP.has(w));
      words = zhAssembleGate(collected, ZH_VOCAB, 10);
      zhClearSessionUnknown();
    } catch (_) { words = []; }
    if (words.length > 0) { setZhGate(words); return; }   // gate screen takes over; showDailyResult on finish
    showDailyResult();
  }
  // Mock = real school past paper -> shows the result screen.
  function handleSessionDone(results){
    const sessionNum=saveEntry(results, true);
    setSessionResult({results,sessionNum});
    setInSession(false); setScreen("result");
  }

  // Whole-set review gate — shown once, after every section type of the set is
  // done (triggered by recordDaily). Takes priority over every other screen.
  if(zhGate) return(
    <Wrap>
      <ZhReviewGate words={zhGate} dict={ZH_VOCAB} onDone={showDailyResult} />
    </Wrap>
  );

  if(adaptive) return(
    <Wrap>
      <ExamSessionScreen
        plan={adaptive.plan}
        isMockExam
        mockInfo={{school:"\u81EA\u9002\u5E94\u7EC3\u4E60 \u00B7 \u5F85\u5DE9\u56FA "+adaptive.parts.tickets+" \u00B7 \u63A5\u8FD1\u638C\u63E1 "+adaptive.parts.adjacent+" \u00B7 \u5DE9\u56FA "+adaptive.parts.maintain+" \u00B7 \u65B0\u9898\u578B "+adaptive.parts.explore}}
        onFinish={finishAdaptive}
        onBack={()=>setAdaptive(null)}
      />
    </Wrap>
  );

  if(roundReview) return(
    <Wrap>
      <ExamSessionScreen
        plan={roundReview.plan}
        isMockExam
        mockInfo={{school:"\u9519\u9898\u590D\u4E60 \u7B2C "+roundReview.sessionNum+" \u8F6E"}}
        onFinish={finishRoundReview}
        onBack={()=>setRoundReview(null)}
      />
    </Wrap>
  );

  if(reviewSection) return(
    <Wrap>
      <ExamSessionScreen
        plan={[zhPlan.find(s=>s.type===reviewSection)]}
        reviewMode={true}
        reviewResults={sectionResults[reviewSection] || []}
        onFinish={()=>setReviewSection(null)}
        onBack={()=>setReviewSection(null)}
      />
    </Wrap>
  );

  if(examMode) return(
    <Wrap>
      <ExamSessionScreen
        plan={zhPlan}
        isMockExam={isMockDue}
        mockInfo={isMockDue?{school:"\u534E\u6587 WA1 \u6A21\u62DF\u8003"}:null}
        startFrom={startFromSection}
        singleSection={!!startFromSection}
        completedTypes={Object.keys(sectionResults)}
        onSectionDone={recordSection}
        onFinish={exitSession}
        onBack={exitSession}
      />
    </Wrap>
  );

  if(drillMode && drill) return(
    <Wrap>
      <ExamSessionScreen
        plan={drill.plan}
        isMockExam
        mockInfo={{school:"\u534E\u6587 \u5F31\u9879\u8BAD\u7EC3"}}
        onFinish={(results)=>{
          const withTrials=recordTrials(prog, results, { mode: TRIAL_MODE.DRILL, sessionNum: prog.nextSession, setId: 'ZS_DRILL' });
          setProgress(grade,subject, gradeTicketsFromDrill(withTrials, results, prog.nextSession));
          setDrillMode(false); setScreen("home");
        }}
        onBack={()=>setDrillMode(false)}
      />
    </Wrap>
  );

  if(inSession) return(
    <Wrap>
      <ZhSessionScreen
        plan={buildZhPastPaperPlan(prog.nextSession)}
        onFinish={handleSessionDone}
        onBack={()=>setInSession(false)}
      />
    </Wrap>
  );

  if(screen==="dailyResult"&&dailyResult) return(
    <Wrap>
      <ZhWa1ResultScreen
        results={dailyResult.results}
        sessionNum={dailyResult.sessionNum}
        onHome={()=>{ setDailyResult(null); setScreen("home"); }}
        onNext={()=>{ setDailyResult(null); setScreen("home"); startSession(); }}
        onReview={()=>{ setDailyResult(null); setScreen("mistakes"); }}
      />
    </Wrap>
  );

  if(screen==="result"&&sessionResult) return(
    <Wrap>
      <ZhResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        onHome={()=>setScreen("home")}
        onNext={()=>{ setInSession(true); setScreen("home"); }}
      />
    </Wrap>
  );

  return(
    <Wrap>
      <StudentShell
        user={user}
        grade={grade}
        subject={subject}
        onGradeChange={(g)=>{ onGradeChange && onGradeChange(g); }}
        onSubjectChange={(key, live)=>{ if(key!=="Chinese"){ onSubjectChange ? onSubjectChange(key, live) : onBack(); } }}
        onLogout={onLogout||onBack}
        toastMsg={null}
        onToastDone={()=>{}}
      />
      {screen==="mistakes" ? (
        <>
          {drill && (
            <div style={{padding:"14px 16px 0"}}>
              <button onClick={()=>setDrillMode(true)} style={{width:"100%",background:"linear-gradient(135deg,#B91C1C,#EF4444)",color:"#fff",border:"none",borderRadius:14,padding:"12px 16px",cursor:"pointer",textAlign:"left",fontFamily:"\'KaiTi\',\'STKaiti\',\'LXGW WenKai\',serif",boxShadow:"0 4px 14px rgba(185,28,28,0.25)"}}>
                <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>{"\u5F31\u9879\u8BAD\u7EC3 (\u9519\u9898)"}<span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:600,marginLeft:8,opacity:.85}}>{"\u5F85\u5DE9\u56FA "+zhTickets.open+" \u9879 \u00B7 \u5DF2\u638C\u63E1 "+zhTickets.closed}</span></div>
                <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.75)",marginTop:2}}>{"\u53EA\u7EC3\u4F60\u6700\u5BB9\u6613\u9519\u7684\u9898\u578B"}</div>
              </button>
            </div>
          )}
          <MistakesTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}
            rounds={listReviewableRounds(prog.history||[], ZH_ROUND_INDEX, prog.trials||[])} reviewedRounds={prog.reviewedRounds||{}} trials={prog.trials||[]}
            onReviewRound={startRoundReview} isZh={true} roundIndex={ZH_ROUND_INDEX} history={prog.history||[]}/>
        </>
      ) : screen==="review" ? (
        <ReviewTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}/>
      ) : (
        <StudentHome user={user} prog={prog} grade={grade} subject={subject} onStartAdaptive={startAdaptive}
          isMockDue={isMockDue}
          onStart={()=>startSession()}
          onStartFrom={(sec)=>startSession(sec)}
          onStartMock={()=>setInSession(true)}
          completedSections={Object.keys(sectionResults)}
          availableSections={ZH_WA1_ORDER}
          onMistakes={()=>setScreen("mistakes")}
          onReview={()=>setScreen("review")}
          onReviewSection={(sec)=>setReviewSection(sec)}
        />
      )}
      <StudentBottomNav screen={screen} setScreen={setScreen} mistakeCount={(prog.mistakes||[]).filter(m=>m.date===todayStr()).length}/>
    </Wrap>
  );
}


function AuthScreen({onLogin, onSignup}){
  const [mode, setMode] = useState("login");   // login | signup_student | signup_parent
  return(
    <Wrap>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:"#0F172A"}}> <div style={{background:"linear-gradient(160deg,#1E3A6E,#1E40AF)",padding:"48px 24px 36px",textAlign:"center",flexShrink:0}}>
          <div style={{fontSize:56,marginBottom:10}}></div>
          <div style={{color:"#fff",fontSize:30,fontWeight:900,letterSpacing:1}}>Genius Project</div>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:"calc(var(--fs) * 0.929)",marginTop:6}}>PSLE Practice . English . Math . Science . Chinese</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:16,flexWrap:"wrap"}}>
            {["P3","P4","P5","P6"].map(g=><span key={g} style={{background:"rgba(255,255,255,0.12)",borderRadius:8,padding:"4px 12px",color:"rgba(255,255,255,0.75)",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>{g}</span>)}
          </div>
        </div> <div style={{flex:1,background:"#F1F5F9",borderRadius:"24px 24px 0 0",marginTop:-16,padding:"28px 20px 40px"}}>
          {mode==="login"    && <LoginForm onLogin={onLogin} onGoSignup={r=>setMode(r)}/>}
          {mode==="signup_student" && <SignupStudentForm onSignup={onSignup} onBack={()=>setMode("login")}/>}
          {mode==="signup_parent"  && <SignupParentForm  onSignup={onSignup} onBack={()=>setMode("login")}/>}
        </div>
      </div>
    </Wrap>
  );
}

const MOE_PRIMARY_SCHOOLS = [
  "Admiralty Primary School",
  "Agnes Xavier Primary School",
  "Ai Tong School",
  "Alexandra Primary School",
  "Anchor Green Primary School",
  "Anderson Primary School",
  "Anglo-Chinese School (Junior)",
  "Anglo-Chinese School (Primary)",
  "Ang Mo Kio Primary School",
  "Assumption English School",
  "Balestier Hill Primary School",
  "Beacon Primary School",
  "Bedok Green Primary School",
  "Bendemeer Primary School",
  "Blangah Rise Primary School",
  "Boon Lay Garden Primary School",
  "Bukit Panjang Primary School",
  "Bukit Timah Primary School",
  "Buona Vista Primary School",
  "Casuarina Primary School",
  "Catholic High School (Primary)",
  "Cedar Primary School",
  "CHIJ (Katong) Primary",
  "CHIJ (Kellock)",
  "CHIJ Our Lady of Good Counsel",
  "CHIJ Our Lady of Nativity",
  "CHIJ Our Lady Queen of Peace",
  "CHIJ Primary (Toa Payoh)",
  "CHIJ St Joseph's Convent",
  "CHIJ St Nicholas Girls' School",
  "Chongfu School",
  "Chongzheng Primary School",
  "Chua Chu Kang Primary School",
  "Clementi Primary School",
  "Compassvale Primary School",
  "Concord Primary School",
  "Coral Primary School",
  "Corporation Primary School",
  "Crestwood Primary School",
  "Da Qiao Primary School",
  "Damai Primary School",
  "De La Salle School",
  "Edgefield Primary School",
  "Elias Park Primary School",
  "Endeavour Primary School",
  "Eunos Primary School",
  "Evergreen Primary School",
  "Fairfield Methodist School (Primary)",
  "Farrer Park Primary School",
  "Fengshan Primary School",
  "Fernvale Primary School",
  "Firgrove Primary School",
  "Frontier Primary School",
  "Fuhua Primary School",
  "Geylang Methodist School (Primary)",
  "Gongshang Primary School",
  "Greendale Primary School",
  "Greenridge Primary School",
  "Greenview Primary School",
  "Guangyang Primary School",
  "Haig Girls' School",
  "Henry Park Primary School",
  "Holy Innocents' Primary School",
  "Horizon Primary School",
  "Hougang Primary School",
  "Huamin Primary School",
  "Innova Primary School",
  "Jiemin Primary School",
  "Jing Shan Primary School",
  "Junyuan Primary School",
  "Jurong Primary School",
  "Jurong West Primary School",
  "Keming Primary School",
  "Kheng Cheng School",
  "Kong Hwa School",
  "Kranji Primary School",
  "Kuo Chuan Presbyterian Primary School",
  "Lakeside Primary School",
  "Lianhua Primary School",
  "Loyang Primary School",
  "MacPherson Primary School",
  "Maha Bodhi School",
  "Maris Stella High School (Primary)",
  "Marsiling Primary School",
  "Marymount Convent School",
  "Mayflower Primary School",
  "Methodist Girls' School (Primary)",
  "Montfort Junior School",
  "Nan Chiau Primary School",
  "Nan Hua Primary School",
  "Nanyang Primary School",
  "Naval Base Primary School",
  "New Town Primary School",
  "Ngee Ann Primary School",
  "North Spring Primary School",
  "North View Primary School",
  "North Vista Primary School",
  "Northland Primary School",
  "Northoaks Primary School",
  "Opera Estate Primary School",
  "Palm View Primary School",
  "Park View Primary School",
  "Pasir Ris Primary School",
  "Paya Lebar Methodist Girls' School (Primary)",
  "Pei Chun Public School",
  "Pei Hwa Presbyterian Primary School",
  "Pei Tong Primary School",
  "Peiying Primary School",
  "Poi Ching School",
  "Princess Elizabeth Primary School",
  "Punggol Cove Primary School",
  "Punggol Green Primary School",
  "Punggol Primary School",
  "Punggol View Primary School",
  "Qifa Primary School",
  "Qihua Primary School",
  "Queenstown Primary School",
  "Radin Mas Primary School",
  "Raffles Girls' Primary School",
  "Red Swastika School",
  "Rivervale Primary School",
  "Riverside Primary School",
  "Rosyth School",
  "Rulang Primary School",
  "Sacred Heart School",
  "Saint Andrew's Junior School",
  "Saint Anthony's Canossian Primary School",
  "Saint Anthony's Primary School",
  "Saint Francis Methodist School",
  "Saint Gabriel's Primary School",
  "Saint Hilda's Primary School",
  "Saint Joseph's Institution Junior",
  "Saint Margaret's Primary School",
  "Saint Stephen's School",
  "Sembawang Primary School",
  "Sengkang Green Primary School",
  "Sengkang Primary School",
  "Serangoon Garden Primary School",
  "Si Ling Primary School",
  "Southland Primary School",
  "Springdale Primary School",
  "Springfield Primary School",
  "Stamford Primary School",
  "Tao Nan School",
  "Teck Ghee Primary School",
  "Teck Whye Primary School",
  "Telok Kurau Primary School",
  "Temasek Primary School",
  "Thomson Primary School",
  "Townsville Primary School",
  "Unity Primary School",
  "Waterway Primary School",
  "Wellington Primary School",
  "West Grove Primary School",
  "West Spring Primary School",
  "West View Primary School",
  "Westwood Primary School",
  "White Sands Primary School",
  "Woodgrove Primary School",
  "Woodlands Primary School",
  "Woodlands Ring Primary School",
  "Xinghua Primary School",
  "Xingnan Primary School",
  "Xinmin Primary School",
  "Xishan Primary School",
  "Yangzheng Primary School",
  "Yew Tee Primary School",
  "YMCA of Singapore School",
  "Yio Chu Kang Primary School",
  "Yishun Primary School",
  "Yu Neng Primary School",
  "Yuhua Primary School",
  "Yumin Primary School",
  "Zhangde Primary School",
  "Zhenghua Primary School",
  "Zhonghua Primary School",
  "Other / Not Listed",
].sort((a,b)=> a==="Other / Not Listed" ? 1 : b==="Other / Not Listed" ? -1 : a.localeCompare(b));

function SchoolFeedbackBox({school}){
  const profile = getSchoolProfile(school);
  const styleColors = {challenging:"#EF4444", advanced:"#7C3AED", standard:"#3B82F6"};
  const col = profile ? (styleColors[profile.style] || C.navy) : C.navy;
  return(
    <div style={{marginTop:10,background:col+"15",border:"1px solid "+col+"44",borderRadius:10,padding:"9px 13px",fontSize:"calc(var(--fs) * 0.857)",fontWeight:600,lineHeight:1.6,color:col}}>
      {profile
        ? " We have past papers from "+school+"! Focus topics: "+( profile.focusTopics ? profile.focusTopics.slice(0,3).join(", ") : "")
        : " Got it! We'll use similar school papers as reference for your practice."}
    </div>
  );
}

function SchoolBanner({school}){
  const profile = getSchoolProfile(school);
  if(!profile) return null;
  const styleColors = {challenging:"#EF4444", advanced:"#7C3AED", standard:"#3B82F6"};
  const col = styleColors[profile.style] || C.navy;
  return(
    <div style={{background:col+"12",borderBottom:"1px solid "+col+"22",padding:"8px 16px",display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:"calc(var(--fs) * 1.143)"}}></span>
      <div style={{flex:1}}>
        <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:col}}>{school}</span>
        <span style={{fontSize:"calc(var(--fs) * 0.786)",color:C.muted}}> . Focus: </span>
        <span style={{fontSize:"calc(var(--fs) * 0.786)",color:C.muted}}>{profile.focusTopics ? profile.focusTopics.slice(0,2).join(", ") : ""}</span>
      </div>
      <span style={{background:col,color:"#fff",fontSize:"calc(var(--fs) * 0.780)",fontWeight:800,padding:"2px 8px",borderRadius:8,textTransform:"uppercase"}}>{profile.style}</span>
    </div>
  );
}

function SchoolDropdown({value, onChange}){
  const [open,    setOpen]    = useState(false);
  const [search,  setSearch]  = useState("");

  const filtered = MOE_PRIMARY_SCHOOLS.filter(s =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const displayVal = value || "Select your school...";
  const hasVal     = !!value;

  return(
    <div style={{position:"relative",marginBottom:0}}> <div onClick={()=>setOpen(o=>!o)} style={{background:"#fff",border:`1.5px solid ${open?C.navy:C.border}`,borderRadius:12,padding:"12px 14px",fontSize:"calc(var(--fs) * 1.000)",fontWeight:hasVal?700:400,color:hasVal?"#0F172A":C.muted,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border 0.15s",boxShadow:open?"0 0 0 3px rgba(30,58,110,0.1)":"none"}}>
        <span style={{flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{displayVal}</span>
        <span style={{fontSize:"calc(var(--fs) * 0.857)",color:C.muted,marginLeft:8,flexShrink:0,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}></span>
      </div> {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",border:`1.5px solid ${C.navy}`,borderRadius:14,boxShadow:"0 8px 32px rgba(15,23,42,0.18)",zIndex:999,overflow:"hidden"}}> <div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,background:"#F8FAFC"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"7px 12px"}}>
              <span style={{fontSize:"calc(var(--fs) * 1.000)",color:C.muted}}></span>
              <input
                autoFocus
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search school name..."
                style={{border:"none",outline:"none",fontSize:"calc(var(--fs) * 0.929)",flex:1,fontFamily:"'Times New Roman', Times, serif",color:"#0F172A"}}
              />
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",fontSize:"calc(var(--fs) * 1.000)",color:C.muted,padding:0}}>x</button>}
            </div>
          </div> <div style={{maxHeight:240,overflowY:"auto"}}>
            {filtered.length===0&&(
              <div style={{padding:"16px",textAlign:"center",fontSize:"calc(var(--fs) * 0.929)",color:C.muted}}>No schools found</div>
            )}
            {filtered.map((school,i)=>{
              const isSelected = school===value;
              const isOther    = school==="Other / Not Listed";
              const profile    = getSchoolProfile(school);
              const styleTag   = profile ? {challenging:"",advanced:"",standard:""}[profile.style] : null;
              return(
                <div key={i}
                  onClick={()=>{ onChange(school); setOpen(false); setSearch(""); }}
                  style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:isSelected?"#EFF6FF":"#fff",borderBottom:`1px solid ${C.border}`,transition:"background 0.1s"}}
                  onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.background="#F8FAFC"; }}
                  onMouseLeave={e=>{ if(!isSelected) e.currentTarget.style.background="#fff"; }}
                >
                  <span style={{fontSize:"calc(var(--fs) * 1.143)",flexShrink:0}}>{isOther?"":""}</span>
                  <span style={{flex:1,fontSize:"calc(var(--fs) * 0.929)",fontWeight:isSelected?800:500,color:isSelected?C.navy:"#0F172A"}}>{school}</span>
                  {styleTag&&<span style={{fontSize:"calc(var(--fs) * 0.857)",flexShrink:0}}>{styleTag}</span>}
                  {isSelected&&<span style={{fontSize:"calc(var(--fs) * 1.000)",flexShrink:0}}></span>}
                </div>
              );
            })}
          </div> <div style={{padding:"8px 14px",background:"#F8FAFC",borderTop:`1px solid ${C.border}`,display:"flex",gap:12,fontSize:"calc(var(--fs) * 0.780)",color:C.muted}}>
            <span> Challenging</span><span> Advanced</span><span> Standard</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginForm({onLogin, onGoSignup}){
  const [role, setRole] = useState("student");
  const [id,   setId]   = useState("");
  const [pw,   setPw]   = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err,  setErr]  = useState("");

  function fillDemo(){
    if(role==="student"){ setId("demo_student"); setPw("demo123"); }
    else { setId("demo_parent"); setPw("demo456"); }
  }

  if(!STORE.users["demo_student"]){
    STORE.users["demo_student"] = {id:"demo_student",password:"demo123",name:"Mei Lin",grade:"P3",role:"student",avatar:"",color:"#3B82F6"};
    STORE.users["demo_parent"]  = {id:"demo_parent", password:"demo456",name:"Mrs Lee", role:"parent",childIds:["demo_student"]};
  }

  function handleLogin(){
    setErr("");
    const adminUser = isAdmin(id.trim(), pw);
    if(adminUser){ onLogin("admin", adminUser); return; }
    const user = allUsers().find(u=>u.id===id.trim()&&u.password===pw&&u.role===role);
    if(user) onLogin(role, user);
    else setErr("Wrong ID or password. Please check and try again.");
  }

  return(
    <div>
      <div style={{fontWeight:900,fontSize:"calc(var(--fs) * 1.429)",color:"#0F172A",marginBottom:6}}>Welcome back </div>
      <div style={{fontSize:"calc(var(--fs) * 0.929)",color:C.muted,marginBottom:20}}>Log in to continue your practice</div> <div style={{display:"flex",background:"#E2E8F0",borderRadius:14,padding:4,marginBottom:20}}>
        {["student","parent"].map(r=>(
          <button key={r} onClick={()=>{setRole(r);setErr("");}} style={{flex:1,background:role===r?"#fff":"none",border:"none",borderRadius:11,padding:"10px 0",fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,cursor:"pointer",color:role===r?"#0F172A":C.muted,boxShadow:role===r?"0 2px 8px rgba(0,0,0,0.1)":"none",transition:"all 0.2s"}}>
            {r==="student"?" Student":" Parent"}
          </button>
        ))}
      </div> <div onClick={fillDemo} style={{background:C.lBlue,border:`1px solid #BAE6FD`,borderRadius:12,padding:"10px 14px",marginBottom:18,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:"#1D4ED8",marginBottom:2}}> Try Demo Account</div>
          <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"#3B82F6"}}>{role==="student"?"ID: demo_student / PW: demo123":"ID: demo_parent / PW: demo456"}</div>
        </div>
        <span style={{color:"#3B82F6",fontSize:"calc(var(--fs) * 0.929)",fontWeight:700}}>Fill </span>
      </div>

      <InputField label="ID" value={id} onChange={setId} placeholder="Your login ID"/>
      <div style={{position:"relative",marginBottom:16}}>
        <InputField label="Password" value={pw} onChange={setPw} type={showPw?"text":"password"} placeholder="Your password" onEnter={handleLogin}/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:"calc(var(--fs) * 1.143)",color:C.muted}}>{showPw?"":""}</button>
      </div>

      {err&&<ErrorBox msg={err}/>}

      <BigBtn color={C.navy} onClick={handleLogin}>Log In </BigBtn>

      <div style={{marginTop:20,textAlign:"center"}}>
        <div style={{fontSize:"calc(var(--fs) * 0.929)",color:C.muted,marginBottom:12}}>Don't have an account?</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>onGoSignup("signup_student")} style={{flex:1,background:"none",border:`2px solid ${C.navy}`,borderRadius:12,padding:"12px",fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,cursor:"pointer",color:C.navy}}>
             Student Sign Up
          </button>
          <button onClick={()=>onGoSignup("signup_parent")} style={{flex:1,background:"none",border:`2px solid #7C3AED`,borderRadius:12,padding:"12px",fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,cursor:"pointer",color:"#7C3AED"}}>
             Parent Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function SignupStudentForm({onSignup, onBack}){
  const [form, setForm] = useState({name:"",grade:"P3",id:"",password:"",confirm:"",school:"",schoolCustom:""});
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [gender, setGender] = useState(null); // null | "boy" | "girl"

  function f(k,v){ setForm(p=>({...p,[k]:v})); }

  function selectGender(g){
    setGender(g);
  }

  function handleSubmit(){
    setErr("");
    if(!gender)           return setErr("Please choose Boy or Girl.");
    if(!form.name.trim()) return setErr("Please enter your name.");
    const schoolFinal = form.school==="other" ? form.schoolCustom.trim() : form.school;
    if(!form.id.trim())   return setErr("Please choose a Student ID.");
    if(form.id.includes(" ")) return setErr("ID cannot contain spaces.");
    if(allUsers().find(u=>u.id===form.id)) return setErr("This ID is already taken. Choose another.");
    if(form.password.length<6) return setErr("Password must be at least 6 characters.");
    if(form.password!==form.confirm) return setErr("Passwords do not match.");
    const user = { id:form.id, password:form.password, name:form.name.trim(), grade:form.grade, role:"student", gender, school:schoolFinal };
    onSignup("student", user);
  }

  return(
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:"calc(var(--fs) * 0.929)",fontWeight:700,marginBottom:16,padding:0}}> Back to Login</button>
      <div style={{fontWeight:900,fontSize:"calc(var(--fs) * 1.429)",color:"#0F172A",marginBottom:4}}>Create Student Account </div>
      <div style={{fontSize:"calc(var(--fs) * 0.929)",color:C.muted,marginBottom:20}}>Set up your practice profile</div> <div style={{marginBottom:20}}>
        <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800,color:C.muted,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Step 1 . I am a...</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>selectGender("boy")} style={{flex:1,background:gender==="boy"?"linear-gradient(135deg,#3B82F6,#2563EB)":"#F1F5F9",border:gender==="boy"?"none":`2px solid ${C.border}`,borderRadius:16,padding:"18px 12px",cursor:"pointer",transition:"all 0.2s",boxShadow:gender==="boy"?"0 6px 18px rgba(59,130,246,0.35)":"none"}}>
            <div style={{fontSize:36,marginBottom:6}}></div>
            <div style={{fontSize:"calc(var(--fs) * 1.071)",fontWeight:900,color:gender==="boy"?"#fff":"#0F172A"}}>Boy</div>
            
          </button>
          <button onClick={()=>selectGender("girl")} style={{flex:1,background:gender==="girl"?"linear-gradient(135deg,#EC4899,#A855F7)":"#F1F5F9",border:gender==="girl"?"none":`2px solid ${C.border}`,borderRadius:16,padding:"18px 12px",cursor:"pointer",transition:"all 0.2s",boxShadow:gender==="girl"?"0 6px 18px rgba(236,72,153,0.35)":"none"}}>
            <div style={{fontSize:36,marginBottom:6}}></div>
            <div style={{fontSize:"calc(var(--fs) * 1.071)",fontWeight:900,color:gender==="girl"?"#fff":"#0F172A"}}>Girl</div>
            
          </button>
        </div>
      </div>       <InputField label="Full Name" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Mei Lin Tan"/> <div style={{marginBottom:20}}>
        <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
           Step 3 . Your School
        </div>
        <div style={{fontSize:"calc(var(--fs) * 0.857)",color:C.muted,marginBottom:10,lineHeight:1.5}}>
          We use your school's past papers to tailor questions to your exam style!
        </div> <SchoolDropdown value={form.school} onChange={v=>f("school",v)}/>

        {form.school==="Other / Not Listed"&&(
          <div style={{marginTop:10}}>
            <InputField label="Type your school name" value={form.schoolCustom} onChange={v=>f("schoolCustom",v)} placeholder="e.g. Rosyth School"/>
          </div>
        )}
        {form.school&&form.school!=="Other / Not Listed"&&<SchoolFeedbackBox school={form.school}/>}
        {form.school==="Other / Not Listed"&&form.schoolCustom&&(
          <div style={{marginTop:8,background:"#F0FDF4",borderRadius:10,padding:"9px 13px",fontSize:"calc(var(--fs) * 0.857)",color:"#065F46",fontWeight:600,lineHeight:1.6}}>
             Got it! We'll use similar school papers as reference for your practice questions.
          </div>
        )}
      </div>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Grade</div>
        <div style={{display:"flex",gap:8}}>
          {GRADES.map(g=>(
            <button key={g} onClick={()=>f("grade",g)} style={{flex:1,background:form.grade===g?C.navy:"#F1F5F9",color:form.grade===g?"#fff":C.muted,border:"none",borderRadius:10,padding:"10px",fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,cursor:"pointer"}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <InputField label="Student ID (for login)" value={form.id} onChange={v=>f("id",v.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. mei_lin_2026"/>
      <div style={{position:"relative",marginBottom:4}}>
        <InputField label="Password (min 6 chars)" value={form.password} onChange={v=>f("password",v)} type={showPw?"text":"password"} placeholder="Create a password"/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:"calc(var(--fs) * 1.143)",color:C.muted}}>{showPw?"":""}</button>
      </div>
      <InputField label="Confirm Password" value={form.confirm} onChange={v=>f("confirm",v)} type="password" placeholder="Re-enter password" onEnter={handleSubmit}/>

      {err&&<ErrorBox msg={err}/>}
      <BigBtn color={C.navy} onClick={handleSubmit}>Create Student Account </BigBtn>
    </div>
  );
}

function SignupParentForm({onSignup, onBack}){
  const [form, setForm] = useState({name:"",id:"",password:"",confirm:""});
  const [childInput, setChildInput] = useState("");
  const [linkedIds,  setLinkedIds]  = useState([]);
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [linkMsg, setLinkMsg] = useState("");

  function f(k,v){ setForm(p=>({...p,[k]:v})); }

  function addChild(){
    setLinkMsg("");
    const cid = childInput.trim().toLowerCase();
    if(!cid) return;
    if(linkedIds.includes(cid)){ setLinkMsg("Already added."); return; }
    const child = allUsers().find(u=>u.id===cid&&u.role==="student");
    if(!child){ setLinkMsg("No student with ID '"+cid+"' found. Please check the ID."); return; }
    setLinkedIds(p=>[...p,cid]);
    setLinkMsg(" Linked: "+child.name+" ("+child.grade+")");
    setChildInput("");
  }

  function removeChild(cid){ setLinkedIds(p=>p.filter(id=>id!==cid)); }

  function handleSubmit(){
    setErr("");
    if(!form.name.trim()) return setErr("Please enter your name.");
    if(!form.id.trim())   return setErr("Please choose a Parent ID.");
    if(form.id.includes(" ")) return setErr("ID cannot contain spaces.");
    if(allUsers().find(u=>u.id===form.id)) return setErr("This ID is already taken. Choose another.");
    if(form.password.length<6) return setErr("Password must be at least 6 characters.");
    if(form.password!==form.confirm) return setErr("Passwords do not match.");
    const user = { id:form.id, password:form.password, name:form.name.trim(), role:"parent", childIds:linkedIds };
    onSignup("parent", user);
  }

  return(
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:"calc(var(--fs) * 0.929)",fontWeight:700,marginBottom:16,padding:0}}> Back to Login</button>
      <div style={{fontWeight:900,fontSize:"calc(var(--fs) * 1.429)",color:"#0F172A",marginBottom:4}}>Create Parent Account </div>
      <div style={{fontSize:"calc(var(--fs) * 0.929)",color:C.muted,marginBottom:20}}>Monitor your child's progress</div>

      <InputField label="Parent Name" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Mrs Lee"/>
      <InputField label="Parent ID (for login)" value={form.id} onChange={v=>f("id",v.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. mrs_lee_parent"/>
      <div style={{position:"relative",marginBottom:4}}>
        <InputField label="Password (min 6 chars)" value={form.password} onChange={v=>f("password",v)} type={showPw?"text":"password"} placeholder="Create a password"/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:"calc(var(--fs) * 1.143)",color:C.muted}}>{showPw?"":""}</button>
      </div>
      <InputField label="Confirm Password" value={form.confirm} onChange={v=>f("confirm",v)} type="password" placeholder="Re-enter password"/> <div style={{background:"#F5F3FF",border:"1.5px solid #DDD6FE",borderRadius:16,padding:"14px",marginBottom:16,marginTop:4}}>
        <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",color:"#4C1D95",marginBottom:8}}> Link Student Accounts</div>
        <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#6D28D9",marginBottom:10,lineHeight:1.6}}>
          Ask your child to share their Student ID, then add it here. You can add multiple children.
        </div>
        <div style={{display:"flex",gap:8,marginBottom:6}}>
          <input value={childInput} onChange={e=>setChildInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") addChild();}} placeholder="Enter student ID..." style={{flex:1,border:"1.5px solid #DDD6FE",borderRadius:10,padding:"9px 12px",fontSize:"calc(var(--fs) * 0.929)",outline:"none"}}/>
          <button onClick={addChild} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontSize:"calc(var(--fs) * 0.929)",fontWeight:700,cursor:"pointer"}}>Add</button>
        </div>
        {linkMsg&&<div style={{fontSize:"calc(var(--fs) * 0.857)",color:linkMsg.startsWith("")?C.green:C.red,fontWeight:600,marginBottom:8}}>{linkMsg}</div>}
        {linkedIds.length===0&&<div style={{fontSize:"calc(var(--fs) * 0.857)",color:C.muted,fontStyle:"italic"}}>No children linked yet. You can also add them later.</div>}
        {linkedIds.map(cid=>{
          const ch=allUsers().find(u=>u.id===cid);
          if(!ch) return null;
          return(
            <div key={cid} style={{display:"flex",alignItems:"center",gap:8,background:"#fff",borderRadius:10,padding:"8px 12px",marginBottom:6}}>
              <span style={{fontSize:"calc(var(--fs) * 1.286)"}}>{ch.avatar||""}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:700,color:"#4C1D95"}}>{ch.name}</div>
                <div style={{fontSize:"calc(var(--fs) * 0.786)",color:C.muted}}>{ch.grade} . ID: {cid}</div>
              </div>
              <button onClick={()=>removeChild(cid)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:"calc(var(--fs) * 1.143)"}}>x</button>
            </div>
          );
        })}
      </div>

      {err&&<ErrorBox msg={err}/>}
      <BigBtn color="#7C3AED" onClick={handleSubmit}>Create Parent Account </BigBtn>
    </div>
  );
}


function StudentApp({user, onLogout, getProgress, setProgress}){

  const [grade,           setGrade]           = useState(user.grade||"P3");
  const [subject,         setSubject]         = useState("English");
  const [subjectSelected, setSubjectSelected] = useState(false);
  const [screen,          setScreen]          = useState("home");
  const [sessionResult,   setSessionResult]   = useState(null);
  const [inSession,       setInSession]       = useState(false);
  const [mockSession,     setMockSession]     = useState(false);
  const [startFromSection, setStartFromSection] = useState(null);
  const [reviewSection, setReviewSection] = useState(null);
  const [sectionResults, setSectionResults] = useState(() => {
    const p0 = getProgress(grade, subject);
    return (p0.sessionSections && p0.sessionSections.sessionNum === p0.nextSession)
      ? (p0.sessionSections.results || {})
      : {};
  });
  // Persist helper: save current section results under the current session num.
  function persistSectionResults(merged){
    setProgress(grade, subject, {
      ...prog,
      sessionSections: { sessionNum: prog.nextSession, results: merged },
    });
  }
  const [studentToast,    setStudentToast]    = useState(null);

  const prog = getProgress(grade, subject);
  const isLive = !!LIVE_CONTENT[`${grade}_${subject}`];

  const isMockDue = prog.nextSession > 1 && (prog.nextSession - 1) % 10 === 0;
  // Practice mode: serve one of the 60 WA1 practice sets, cycling by session.
  const _wa1Len = WA1_PRACTICE_SETS.length;
  const wa1Plan = WA1_PRACTICE_SETS[(((prog.nextSession - 1) % _wa1Len) + _wa1Len) % _wa1Len].plan;
  const [roundReview, setRoundReview] = useState(null); // {plan, sessionNum} while re-solving a past round
  const [enGate, setEnGate] = useState(null); // words[] while the English end-of-round word review is showing
  const [enDrillMode, setEnDrillMode] = useState(false);
  const [enAdaptive, setEnAdaptive] = useState(null);
  function startEnAdaptive(){
    const sch = scheduleRound(prog, EN_BANK, prog.nextSession, { n: 10 });
    if(!sch.ids.length) return;
    setEnAdaptive({ plan: buildRoundReviewPlan({ mistakes: sch.ids.map(id=>({id})) }, EN_ROUND_INDEX).plan, ids: sch.ids, parts: sch.parts });
  }
  const enDrillPicks = pickDrillItems(prog, EN_BANK, prog.nextSession, { max: 10, perSkill: 3 });
  const enDrill = enDrillPicks.length ? { plan: buildRoundReviewPlan({ mistakes: enDrillPicks.map(x=>({id:x.itemId})) }, EN_ROUND_INDEX).plan } : null;
  const enTickets = ticketSummary(prog);
  function startRoundReview(sessionNum){
    const entry=(prog.history||[]).find(h=>h.sessionNum===sessionNum);
    if(!entry) return;
    const built=buildRoundReviewPlan(entry, EN_ROUND_INDEX);
    if(!built.plan.length) return;
    setRoundReview({plan:built.plan, sessionNum});
  }
  function finishRoundReview(results){
    const withTrials=recordTrials(prog, results, { mode: TRIAL_MODE.REVIEW, sessionNum: roundReview.sessionNum, setId: REVIEW_SET_ID });
    setProgress(grade, subject, markRoundReviewed(withTrials, roundReview.sessionNum, results, todayStr()));
    setRoundReview(null); setScreen("mistakes");
  }

  // The 6 sections that make up a full English session.
  const SESSION_SECTIONS = ["GrammarMCQ","VocabMCQ","GrammarCloze","VocabCloze","Editing","Synthesis","Comprehension"];

  function startSession(fromSection){
    setStartFromSection(typeof fromSection === "string" ? fromSection : null);
    setInSession(true);
  }

  // Persist a single section's results the moment it is completed (works for
  // both the full "Start Practice" run and single-section chips). This is what
  // makes finished sections turn green and survive backing out mid-run.
  function recordSection(type, results){
    if (!type) return;
    const merged = { ...sectionResults, [type]: results || [] };
    setSectionResults(merged);
    persistSectionResults(merged);
    const allDone = SESSION_SECTIONS.every(t => merged[t] !== undefined);
    if (allDone) {
      const combined = SESSION_SECTIONS.flatMap(t => merged[t] || []);
      setSectionResults({});
      handleSessionDone(combined);
    }
  }
  function exitSession(){
    setInSession(false);
    setStartFromSection(null);
  }

  function handleSessionDone(results, forceMock){
    const sessionNum = prog.nextSession;
    const isMock = forceMock || isMockDue;
    const graded = results.filter(r=>r.scored!==false);
    const scores = {};
    SECTION_ORDER.forEach(type=>{
      const items=results.filter(r=>r.sectionType===type);
      if(items.length) scores[type]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=graded.length?Math.round(graded.filter(r=>r.correct).length/graded.length*100):0;
    const isPastPaper = false; // CLEANUP1_NO_PASTPAPER: daily sessions always run WA1 sets (S1..S60)
    const paperInfo = isPastPaper ? selectPastPaper(user.school) : null;
    const newEntry={ sessionNum, date:todayStr(), scores, totalPct,
      mistakes: graded.filter(r=>!r.correct).map(r=>({...r})),
      isMockExam: isMock||isPastPaper,
      school: isMock?"Nanyang Primary": isPastPaper?(paperInfo?.label||"Past Paper"):undefined,
      examType: isMock?"WA1": isPastPaper?"Past Paper #"+(sessionNum-10):undefined };
    const newMistakes=[...(prog.mistakes||[]),...graded.filter(r=>!r.correct).map(r=>({...r,date:todayStr()}))];
    const allLookedUp = [...new Set(results.flatMap(r=>r.lookedUpWords||[]))];
    const wrongWords  = [...new Set(graded.filter(r=>!r.correct).flatMap(r=>{
      const sentence=r.sentence||"";
      return sentence.split(/\s+/).map(w=>w.replace(/[.,!?'"]/g,"").toLowerCase()).filter(w=>WORD_DICT[w]);
    }))];
    const vocabWords  = [...new Set([...allLookedUp,...wrongWords])];
    const prevVocab   = prog.vocabBook||[];
    const newVocab    = [...prevVocab];
    vocabWords.forEach(w=>{ if(!newVocab.find(v=>v.word===w)) newVocab.push({word:w,def:WORD_DICT[w]||"",addedDate:todayStr(),fromMistake:wrongWords.includes(w)}); });
    const withTrials=recordTrials(prog, results, { mode: (isMock||isPastPaper)?TRIAL_MODE.MOCK:TRIAL_MODE.EXAM, sessionNum, setId: newEntry.school||null });
    const withTickets=openTicketsFromResults(withTrials, results, sessionNum);
    setProgress(grade, subject, { ...withTickets, history:[...prog.history, newEntry], mistakes:newMistakes, nextSession:sessionNum+1, vocabBook:newVocab, sessionSections:null });
    setSessionResult({results, sessionNum, isMock});
    setInSession(false);
    // Step 4: end-of-round word review (Leitner) before the result screen.
    let gateWords = [];
    try {
      const cand = roundVocabCandidates({ sessionNum, mistakes: [...graded.filter(r=>!r.correct), ...graded.filter(r=>r.correct && r.guessed)] }, EN_ROUND_INDEX, 30, 'en')
        .map(x => x.w);
      const looked = allLookedUp.map(w => String(w).toLowerCase());
      const collected = [...new Set([...cand, ...looked])].filter(w => EN_VOCAB[w]);
      gateWords = EN_REVIEW.assembleGate(collected, EN_VOCAB, 10);
    } catch (_) { gateWords = []; }
    if (gateWords.length > 0) { setEnGate(gateWords); return; }
    setScreen("result");
  }

  if(roundReview) return(
    <Wrap>
      <ExamSessionScreen
        plan={roundReview.plan}
        isMockExam
        mockInfo={{school:"Round "+roundReview.sessionNum+" review"}}
        onFinish={finishRoundReview}
        onBack={()=>setRoundReview(null)}
      />
    </Wrap>
  );

  if(reviewSection) return(
    <Wrap>
      <ExamSessionScreen
        plan={[wa1Plan.find(s=>s.type===reviewSection)]}
        reviewMode={true}
        reviewResults={sectionResults[reviewSection] || []}
        onFinish={()=>setReviewSection(null)}
        onBack={()=>setReviewSection(null)}
      />
    </Wrap>
  );

  if(mockSession) return(
    <Wrap>
      <ExamSessionScreen
        plan={buildPastPaperPlan(prog.settings, user.school, prog.nextSession)}
        isMockExam
        mockInfo={MOCK_EXAMS[0]}
        onFinish={(results)=>{ setMockSession(false); handleSessionDone(results, true); }}
        onBack={()=>setMockSession(false)}
      />
    </Wrap>
  );

  if(inSession) return(
    <Wrap>
      <ExamSessionScreen
        plan={wa1Plan}
        isMockExam={isMockDue}
        mockInfo={isMockDue?MOCK_EXAMS[0]:null}
        startFrom={startFromSection}
        singleSection={!!startFromSection}
        completedTypes={Object.keys(sectionResults)}
        onSectionDone={recordSection}
        onFinish={exitSession}
        onBack={exitSession}
      />
    </Wrap>
  );

  if(subjectSelected && subject==="Chinese" && isLive) return(
    <ChineseApp
      user={user}
      getProgress={getProgress}
      setProgress={setProgress}
      onBack={()=>setSubjectSelected(false)}
      onLogout={onLogout}
      onGradeChange={(g)=>{ setGrade(g); }}
      onSubjectChange={(key, live)=>{ setSubject(key); setScreen("home"); if(!live) setStudentToast("Coming Soon"); else setStudentToast(null); }}
    />
  );


  if(!subjectSelected) return(
    <Wrap>
      <SubjectSelectScreen user={user} grade={grade} onLogout={onLogout}
        onSelect={(sub)=>{ setSubject(sub); setSubjectSelected(true); }}
        onGradeChange={(g)=>{ setGrade(g); setSubjectSelected(false); }}
      />
    </Wrap>
  );

  if(enAdaptive) return(
    <Wrap>
      <ExamSessionScreen
        plan={enAdaptive.plan}
        isMockExam
        mockInfo={{school:"Adaptive round \u00B7 fix "+enAdaptive.parts.tickets+" \u00B7 nearly there "+enAdaptive.parts.adjacent+" \u00B7 keep sharp "+enAdaptive.parts.maintain+" \u00B7 new "+enAdaptive.parts.explore}}
        onFinish={(results)=>{
          const ses = prog.nextSession;
          let next = recordTrials(prog, results, { mode: TRIAL_MODE.EXAM, sessionNum: ses, setId: 'EN_ADAPT' });
          next = gradeTicketsFromDrill(next, results, ses);
          next = openTicketsFromResults(next, results, ses);
          setProgress(grade, subject, next);
          setEnAdaptive(null);
          setSessionResult({ results, sessionNum: ses - 1, isMock: false });
          setScreen("result");
        }}
        onBack={()=>setEnAdaptive(null)}
      />
    </Wrap>
  );

  if(enDrillMode && enDrill) return(
    <Wrap>
      <ExamSessionScreen
        plan={enDrill.plan}
        isMockExam
        mockInfo={{school:"Weak-spot drill"}}
        onFinish={(results)=>{
          const withTrials=recordTrials(prog, results, { mode: TRIAL_MODE.DRILL, sessionNum: prog.nextSession, setId: 'EN_DRILL' });
          setProgress(grade, subject, gradeTicketsFromDrill(withTrials, results, prog.nextSession));
          setEnDrillMode(false); setScreen("home");
        }}
        onBack={()=>setEnDrillMode(false)}
      />
    </Wrap>
  );

  if(enGate) return(
    <Wrap>
      <EnReviewGate words={enGate} dict={EN_VOCAB} store={EN_REVIEW} onDone={()=>{ setEnGate(null); setScreen("result"); }} />
    </Wrap>
  );

  if(screen==="result"&&sessionResult) return(
    <Wrap>
      <StudentResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        isMock={sessionResult.isMock}
        onHome={()=>setScreen("home")}
        onNextSession={()=>{ setInSession(true); setScreen("home"); }}
      />
    </Wrap>
  );

  return(
    <Wrap>
      <StudentShell
        user={user}
        grade={grade}
        subject={subject}
        onGradeChange={(g)=>{setGrade(g);setScreen("home");}}
        onSubjectChange={(key, live)=>{ setSubject(key); setScreen("home"); if(!live) setStudentToast("Coming Soon:   "); else setStudentToast(null); }}
        onLogout={onLogout}
        toastMsg={studentToast}
        onToastDone={()=>setStudentToast(null)}
      />
      {!isLive ? (
        <ComingSoonScreen grade={grade} subject={subject}/>
      ) : screen==="home" ? (
        <>
      <StudentHome user={user} prog={prog} grade={grade} subject={subject} onStartAdaptive={startEnAdaptive} isMockDue={isMockDue} onStart={startSession} onStartFrom={(sec)=>startSession(sec)} onStartMock={()=>setMockSession(true)} completedSections={Object.keys(sectionResults)} availableSections={subject==="English" ? Array.from(new Set(wa1Plan.map(x=>x.type))) : null}  onMistakes={()=>setScreen("mistakes")} onReview={()=>setScreen("review")} onReviewSection={(sec)=>setReviewSection(sec)}/></>
      ) : screen==="mistakes" ? (
        <>
          {enDrill && (
            <div style={{padding:"14px 16px 0"}}>
              <button onClick={()=>setEnDrillMode(true)} style={{width:"100%",background:"linear-gradient(135deg,#0F172A,#1E3A6E)",color:"#fff",border:"none",borderRadius:14,padding:"12px 16px",cursor:"pointer",textAlign:"left",boxShadow:"0 4px 14px rgba(15,23,42,0.25)"}}>
                <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>Weak-spot drill<span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:600,marginLeft:8,opacity:.85}}>{"to fix "+enTickets.open+" \u00B7 mastered "+enTickets.closed}</span></div>
                <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.75)",marginTop:2}}>New questions on the skills you keep missing. Never the same question again.</div>
              </button>
            </div>
          )}
        <MistakesTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}
          rounds={listReviewableRounds(prog.history||[], EN_ROUND_INDEX, prog.trials||[])} reviewedRounds={prog.reviewedRounds||{}} trials={prog.trials||[]}
          onReviewRound={startRoundReview} isZh={false} roundIndex={EN_ROUND_INDEX} history={prog.history||[]}/>
        </>
      ) : screen==="review" ? (
        <ReviewTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}/>
      ) : null}

      <StudentBottomNav screen={screen} setScreen={setScreen} mistakeCount={(prog.mistakes||[]).filter(m=>m.date===todayStr()).length}/>
    </Wrap>
  );
}


//  Level-aware question picker (easy/medium/hard sets) 


function AdminApp({user, onLogout}){
  const [tab, setTab] = useState("overview");
  const users = allUsers();
  const students = users.filter(u=>u.role==="student");
  const parents  = users.filter(u=>u.role==="parent");
  const T = {fontSize:"calc(var(--fs) * 0.857)",padding:"7px 12px",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer"};
  const tabs = ["overview","students","accounts"];
  return(
    <Wrap>
      <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"16px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#fff",fontWeight:900,fontSize:"calc(var(--fs) * 1.071)"}}> Admin Dashboard</div>
          <button onClick={onLogout} style={{...T,background:"rgba(255,255,255,.15)",color:"#fff",fontSize:"calc(var(--fs) * 0.786)"}}>Logout</button>
        </div>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{...T,background:tab===t?"#fff":"rgba(255,255,255,.15)",color:tab===t?"#1E3A6E":"#fff",fontSize:"calc(var(--fs) * 0.786)",textTransform:"capitalize"}}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:16}}>
        {tab==="overview"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {[["","Total Users",users.length],["","Students",students.length],["","Parents",parents.length]].map(([ic,lb,v],i)=>(
                <div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:"calc(var(--fs) * 1.571)"}}>{ic}</div>
                  <div style={{fontSize:"calc(var(--fs) * 1.286)",fontWeight:900,color:"#1E3A6E"}}>{v}</div>
                  <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#64748B"}}>{lb}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",marginBottom:10}}>Recent Students</div>
              {students.slice(0,8).map((s,i)=>{
                const prog = getProgress(s.id,"P3","English");
                const pct = prog.history?.length ? Math.round(prog.history.reduce((a,h)=>a+h.totalPct,0)/prog.history.length) : null;
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<7?"1px solid #F1F5F9":"none"}}>
                    <div style={{width:32,height:32,borderRadius:9,background:s.color||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.143)"}}>{s.avatar||""}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>{s.name}</div>
                      <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#64748B"}}>{s.school||"-"} . {s.grade}</div>
                    </div>
                    <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:pct>=70?"#10B981":pct?"#F59E0B":"#94A3B8"}}>{pct!=null?pct+"%":"-"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab==="students"&&(
          <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",marginBottom:10}}>All Students ({students.length})</div>
            {students.map((s,i)=>{
              const prog = getProgress(s.id,"P3","English");
              const sessions = prog.history?.length||0;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<students.length-1?"1px solid #F1F5F9":"none"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:s.color||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.000)"}}>{s.avatar||""}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>{s.name} <span style={{color:"#94A3B8",fontWeight:400}}>({s.id})</span></div>
                    <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#64748B"}}>{s.grade} . {sessions} sessions . {s.school||"-"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab==="accounts"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[[" Students",students,"#1E3A6E"],[" Parents",parents,"#059669"],[" Admins",users.filter(u=>u.role==="admin"),"#7C3AED"]].map(([title,list,color],gi)=>(
              <div key={gi} style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",color,marginBottom:8}}>{title} ({list.length})</div>
                {list.map((u,i)=>(
                  <div key={i} style={{fontSize:"calc(var(--fs) * 0.857)",padding:"4px 0",borderBottom:i<list.length-1?"1px solid #F8FAFC":"none",color:"#0F172A"}}>
                    {u.name} . <span style={{color:"#64748B"}}>{u.id}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrap>
  );
}








//  Vocab Quiz - wrong words with meanings/syn/ant, quiz mode 
function buildVocabEntries(mistakes){
  const seen=new Set(); const out=[];
  (mistakes||[]).forEach(m=>{
    const word = (typeof m.correctAnswer==="number" && m.options) ? m.options[m.correctAnswer]
               : (typeof m.correctAnswer==="string" ? m.correctAnswer : null);
    if(!word) return;
    const clean=String(word).replace(/[.,!?'"]/g,"");
    if(seen.has(clean)) return;
    const isZh=/[\u4e00-\u9fff]/.test(clean);
    if(isZh){
      const info=ZH_CHAR_DICT[clean]||{};
      const vocab=(ZH_VOCAB&&ZH_VOCAB[clean])||null;
      const meaning=info.meaning||(vocab&&vocab.en)||(m.meaning?String(m.meaning).replace(/^[^=]*=\s*/,""):null);
      if(!meaning) return;
      seen.add(clean);
      out.push({word:clean,lang:"zh",meaning,pinyin:info.pinyin||(vocab&&vocab.py)||m.pinyin||null,
        syn:info.syn||null,ant:info.ant||null,verified:!!info.meaning});
    } else {
      const key=clean.toLowerCase();
      const def=WORD_DICT[key]||(m.meaning?String(m.meaning):null); if(!def) return;
      const sa=SYN_ANT[key]||{};
      seen.add(clean);
      out.push({word:clean,lang:"en",meaning:def,pinyin:null,
        syn:sa.syn?sa.syn.join(", "):null,ant:sa.ant?sa.ant.join(", "):null,verified:!!WORD_DICT[key]});
    }
  });
  return out;
}

function VocabQuizTab({mistakes, words, limit=10}){
  const entries = React.useMemo(()=> Array.isArray(words)
    ? buildVocabEntries(words.map(w=>(typeof w==="string"?{correctAnswer:w}:{correctAnswer:w.w, meaning:w.gloss}))).slice(0,limit) // STEP2E_GLOSS_FALLBACK
    : buildVocabEntries(mistakes),[mistakes,words,limit]);
  const [order,setOrder]   = React.useState(()=>seededShuffle(entries.map((_,i)=>i),Date.now()%100000));
  const [idx,setIdx]       = React.useState(0);
  const [picked,setPicked] = React.useState(null);
  const [score,setScore]   = React.useState({right:0,wrong:0});
  const [done,setDone]     = React.useState(false);

  if(entries.length<2) return(
    <div style={{textAlign:"center",padding:"50px 20px",color:"#64748B"}}>
      <div style={{fontSize:44,marginBottom:12}}></div>
      <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,color:"#0F172A",marginBottom:6}}>Not enough words yet</div>
      <div style={{fontSize:"calc(var(--fs) * 0.857)"}}>Wrong vocabulary words from English & Chinese will collect here for quizzing.</div>
    </div>
  );

  const cur = entries[order[idx]||0];
  // 4 meaning options
  const opts = React.useMemo(()=>{
    const others=seededShuffle(entries.filter(e=>e.word!==cur.word),idx*31+7).slice(0,3);
    return seededShuffle([cur,...others],idx*13+3);
  },[idx,entries,cur]);

  function pick(i){
    if(picked!==null) return;
    setPicked(i);
    const ok = opts[i].word===cur.word;
    setScore(s=>({right:s.right+(ok?1:0),wrong:s.wrong+(ok?0:1)}));
    if(ok) SFX.correct(); else SFX.wrong();
  }
  function next(){
    if(idx+1>=order.length){ setDone(true); return; }
    setIdx(i=>i+1); setPicked(null);
  }

  if(done) return(
    <div style={{textAlign:"center",padding:"40px 20px"}}>
      <div style={{fontSize:44}}></div>
      <div style={{fontSize:"calc(var(--fs) * 1.286)",fontWeight:900,color:"#0F172A",margin:"10px 0 4px"}}>
        {score.right} / {score.right+score.wrong} correct
      </div>
      <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#64748B",marginBottom:16}}>
         Parents: ask your child to say each word's meaning out loud, then retry!
      </div>
      <button onClick={()=>{setOrder(seededShuffle(entries.map((_,i)=>i),Date.now()%100000));
          setIdx(0);setPicked(null);setScore({right:0,wrong:0});setDone(false);}}
        style={{background:"#0F172A",color:"#fff",border:"none",borderRadius:12,
          padding:"12px 28px",fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,cursor:"pointer"}}>
         Quiz Again (reshuffled)
      </button>
    </div>
  );

  return(
    <div style={{padding:"4px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:"#64748B"}}>Word {idx+1} / {order.length}</span>
        <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800}}>
          <span style={{color:"#10B981"}}>{score.right}</span>{" "}
          <span style={{color:"#EF4444"}}>{score.wrong}</span>
        </span>
      </div>

      {/* Word card */}
      <div style={{background:"#fff",borderRadius:16,padding:"20px 16px",marginBottom:12,
        boxShadow:"0 2px 10px rgba(0,0,0,.07)",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{fontSize:cur.lang==="zh"?34:24,fontWeight:900,color:"#0F172A"}}>{cur.word}</span>
          <SpeakBtn text={cur.word} lang={cur.lang}/>
        </div>
        {cur.pinyin&&<div style={{fontSize:"calc(var(--fs) * 0.929)",color:"#2563EB",fontWeight:700,marginTop:4}}>{cur.pinyin}</div>}
        {!cur.verified&&<div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#92400E",marginTop:4}}> </div>}
        <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#64748B",marginTop:8}}>What does this word mean?</div>
      </div>

      {/* Meaning options */}
      {opts.map((o,i)=>{
        const isAns=o.word===cur.word;
        let bg="#fff",border="#E2E8F0";
        if(picked!==null){
          if(isAns){bg="#D1FAE5";border="#10B981";}
          else if(i===picked){bg="#FEE2E2";border="#EF4444";}
        }
        return(
          <div key={i} onClick={()=>pick(i)}
            style={{background:bg,border:"2px solid "+border,borderRadius:12,
              padding:"12px 14px",marginBottom:8,cursor:picked===null?"pointer":"default",
              fontSize:"calc(var(--fs) * 0.929)",fontWeight:600,color:"#0F172A"}}>
            {o.meaning}
          </div>
        );
      })}

      {/* After pick: syn/ant reinforcement */}
      {picked!==null&&(
        <div className="gm-slideUp" style={{background:"#F8FAFC",border:"1.5px solid #CBD5E1",
          borderRadius:12,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800,color:"#0F172A",marginBottom:4}}>
            {cur.word} = {cur.meaning}
          </div>
          {cur.syn&&<div style={{fontSize:"calc(var(--fs) * 0.786)",color:"#0D9488",fontWeight:700}}>= same: {cur.syn}</div>}
          {cur.ant&&<div style={{fontSize:"calc(var(--fs) * 0.786)",color:"#DC2626",fontWeight:700}}>!= opposite: {cur.ant}</div>}
        </div>
      )}

      {picked!==null&&(
        <button onClick={next} style={{width:"100%",background:"#0F172A",color:"#fff",
          border:"none",borderRadius:12,padding:"13px",fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,cursor:"pointer"}}>
          {idx+1>=order.length?"Finish ":"Next Word "}
        </button>
      )}
    </div>
  );
}

// Vocab quiz by round: 10 words per round from that round's wrong items.
function VocabQuizByRound({history, roundIndex, isZh}){
  const rounds = (history||[]).filter(h=>(h.mistakes||[]).length>0).slice().reverse();
  const [sel,setSel] = React.useState(()=> rounds.length ? rounds[0].sessionNum : null);
  const entry = rounds.find(h=>h.sessionNum===sel) || rounds[0] || null;
  const words = React.useMemo(()=> entry ? roundVocabCandidates(entry, roundIndex, 10, isZh?"zh":"en") : [], [entry, roundIndex, isZh]);
  if(!rounds.length) return(
    <div style={{textAlign:"center",padding:"50px 20px",color:"#64748B"}}>
      <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,color:"#0F172A",marginBottom:6}}>{isZh?"\u8FD8\u6CA1\u6709\u9519\u9898":"No wrong answers yet"}</div>
      <div style={{fontSize:"calc(var(--fs) * 0.857)"}}>{isZh?"\u5B8C\u6210\u4E00\u8F6E\u7EC3\u4E60\u540E\uFF0C\u8FD9\u91CC\u4F1A\u51FA\u73B0\u6BCF\u8F6E\u9519\u9898\u7684\u8BCD\u8BED\u3002":"Words from each round's wrong answers will appear here."}</div>
    </div>
  );
  return(
    <div>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:8}}>
        {rounds.map(h=>(
          <button key={h.sessionNum} onClick={()=>setSel(h.sessionNum)}
            style={{flexShrink:0,padding:"6px 12px",borderRadius:20,border:"1.5px solid "+(sel===h.sessionNum?"#2563EB":"#E2E8F0"),
              background:sel===h.sessionNum?"#2563EB":"#fff",color:sel===h.sessionNum?"#fff":"#334155",fontWeight:700,cursor:"pointer",
              fontSize:"calc(var(--fs) * 0.857)"}}>
            {(isZh?"\u7B2C "+h.sessionNum+" \u8F6E":"Round "+h.sessionNum)}
          </button>
        ))}
      </div>
      <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"#64748B",marginBottom:8}}>
        {isZh?"\u672C\u8F6E\u8BCD\u6C47\u9898\u9519\u9898\u4E2D\u7684\u8BCD\u8BED\uFF08\u6700\u591A 10 \u4E2A\uFF09\uFF1A\u5148\u9009\u610F\u601D\uFF0C\u518D\u586B\u53E5\u5B50":"Words from this round's vocabulary mistakes (up to 10): meaning first, then use in a sentence"}
      </div>
      <VocabQuiz key={entry?entry.sessionNum:0} words={words} dict={isZh?ZH_VOCAB:EN_VOCAB} lang={isZh?"zh":"en"} limit={10}/>
    </div>
  );
}

function MistakesTab({mistakes:rawMistakes, onBack, vocabBook=[], rounds=[], reviewedRounds={}, onReviewRound, isZh=false, roundIndex=null, history=[], trials=[]}){
  const kpi = React.useMemo(()=>firstTryStats({trials}),[trials]);
  const L = (zh,en)=> isZh?zh:en;
  // Results from ExamSession carry ids only; resolve question/options/answers for display.
  const mistakes = React.useMemo(()=>enrichMistakes(rawMistakes||[], roundIndex),[rawMistakes, roundIndex]);
  const [filter, setFilter] = React.useState("all");
  const [view, setView]     = React.useState("list"); // list | quiz
  const [expanded, setExpanded] = React.useState(null);

  const today = todayStr();
  const filtered = filter==="today"
    ? mistakes.filter(m=>m.date===today)
    : filter==="week"
    ? mistakes.filter(m=>{ const d=new Date(m.date); const n=new Date(today); return (n-d)<7*86400000; })
    : mistakes;

  // Group by topic
  const byTopic = {};
  filtered.forEach(m=>{
    const key = m.topic||m.sectionType||"Other";
    if(!byTopic[key]) byTopic[key] = [];
    byTopic[key].push(m);
  });

  const topicColors = {
    "Numbers":"#3B82F6","Addition":"#10B981","Subtraction":"#F59E0B",
    "Multiplication":"#7C3AED","Division":"#F97316","Money":"#0D9488",
    "Measurement":"#EF4444","Fractions":"#EC4899","Patterns":"#6366F1",
    "Word Problem":"#0891B2","Grammar":"#3B82F6","Vocabulary":"#8B5CF6",
    "BianZi":"#EF4444","CiYu":"#F97316","Other":"#64748B",
  };

  return(
    <div style={{fontFamily:"'Times New Roman', Times, serif",paddingBottom:80}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#7C2D12,#DC2626)",padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:"calc(var(--fs) * 0.857)",
          fontWeight:700,marginBottom:10}}> Back</button>
        <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.286)",fontWeight:900}}> {L("\u9519\u9898\u672C","Mistakes Log")}</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:"calc(var(--fs) * 0.857)",marginTop:2}}>
          {isZh ? `\u9519\u9898 ${filtered.length}` : `${filtered.length} wrong answer${filtered.length!==1?"s":""}`}
          {kpi.n>0 && (isZh
            ? ` \u00B7 \u9996\u6B21\u7B54\u5BF9\u7387 ${kpi.firstTryRate}%\uFF08\u770B\u63D0\u793A\u540E\u7B54\u5BF9 ${kpi.hinted} \u00B7 \u731C\u5BF9 ${kpi.guessed}\uFF09`
            : ` \u00B7 first-try ${kpi.firstTryRate}% (after hint ${kpi.hinted} \u00B7 guessed ${kpi.guessed})`)}
        </div>
      </div>

      {/* Sub-tabs: mistakes list / vocab quiz */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2E8F0"}}>
        {[["list", isZh?" \u9519\u9898":" Mistakes"],["quiz", isZh?" \u8BCD\u8BED\u7EC3\u4E60":" Vocab Quiz"],["rounds", isZh?" \u6309\u8F6E\u590D\u4E60":" By Round"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"12px 8px",
              fontSize:"calc(var(--fs) * 0.929)",fontWeight:view===v?800:500,color:view===v?"#7C2D12":"#64748B",
              borderBottom:view===v?"2.5px solid #DC2626":"2.5px solid transparent"}}>{l}</button>
        ))}
      </div>
      {view==="quiz"&&<div style={{padding:"12px 16px"}}><VocabQuizByRound history={history} roundIndex={roundIndex} isZh={isZh}/></div>}
      {view==="rounds"&&<ReviewRounds rounds={rounds} reviewedRounds={reviewedRounds} isZh={isZh} onStart={onReviewRound} readOnly={!onReviewRound}/>}
      {view==="list"&&<>
      {/* Filter pills */}
      <div style={{display:"flex",gap:8,padding:"12px 16px",background:"#fff",
        borderBottom:"1px solid #E2E8F0"}}>
        {[["all", L("\u5168\u90E8","All")],["today", L("\u4ECA\u5929","Today")],["week", L("\u672C\u5468","This Week")]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{background:filter===v?"#DC2626":"#F1F5F9",color:filter===v?"#fff":"#64748B",
              border:"none",borderRadius:20,padding:"5px 14px",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,cursor:"pointer"}}>
            {l}
          </button>
        ))}
      </div>

      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"60px 24px",color:"#64748B"}}>
          <div style={{fontSize:48,marginBottom:12}}></div>
          <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:800,color:"#0F172A",marginBottom:6}}>
            No mistakes {filter==="today"?"today":filter==="week"?"this week":"yet"}!
          </div>
          <div style={{fontSize:"calc(var(--fs) * 0.929)"}}>Keep up the great work!</div>
        </div>
      ):(
        <div style={{padding:"12px 16px"}}>
          {/* Topic summary bar */}
          <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:14,
            boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:"#64748B",marginBottom:10,
              textTransform:"uppercase",letterSpacing:.8}}>{L("\u8584\u5F31\u9898\u578B","Weak Topics")}</div>
            {Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length).map(([topic,items])=>{
              const col = topicColors[topic]||"#64748B";
              const pct = Math.round(items.length/filtered.length*100);
              return(
                <div key={topic} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:col}}>{topic}</span>
                    <span style={{fontSize:"calc(var(--fs) * 0.786)",color:"#64748B"}}>{isZh?`\u9519 ${items.length} \u9898`:`${items.length} mistake${items.length>1?"s":""}`}</span>
                  </div>
                  <div style={{background:"#F1F5F9",borderRadius:6,height:6}}>
                    <div style={{background:col,borderRadius:6,height:6,width:pct+"%",transition:"width .4s"}}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* STEP2C_NO_MISTAKE_LIST */}
          {/* Per-mistake cards removed: re-solving lives in the By Round tab. */}
          {onReviewRound&&(
            <button onClick={()=>setView("rounds")}
              style={{width:"100%",marginTop:4,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",
                background:"#2563EB",color:"#fff",fontWeight:800,fontSize:"calc(var(--fs) * 0.929)"}}>
              {isZh?"\u6309\u8F6E\u91CD\u505A\u9519\u9898 \u2192":"Re-solve mistakes by round \u2192"}
            </button>
          )}
        </div>
      )}
    </>}
    </div>
  );
}

function ReviewTab({mistakes, onBack}){
  const [view, setView] = React.useState("trend"); // trend | weak

  // Build session trend from mistakes (count per date)
  const sessionDates = [...new Set(mistakes.map(m=>m.date))].sort();
  const trendData = sessionDates.slice(-8).map(date=>{
    const dayMistakes = mistakes.filter(m=>m.date===date).length;
    return {date, mistakes: dayMistakes};
  });

  // Topic frequency
  const topicCount = {};
  mistakes.forEach(m=>{ const k=m.topic||m.sectionType||"Other"; topicCount[k]=(topicCount[k]||0)+1; });
  const topTopics = Object.entries(topicCount).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxCount = topTopics[0]?.[1]||1;

  const topicColors={
    "Numbers":"#3B82F6","Addition":"#10B981","Subtraction":"#F59E0B",
    "Multiplication":"#7C3AED","Division":"#F97316","Money":"#0D9488",
    "Word Problem":"#0891B2","Grammar":"#3B82F6","Vocabulary":"#8B5CF6",
    "BianZi":"#EF4444","CiYu":"#F97316","Other":"#64748B",
  };

  return(
    <div style={{fontFamily:"'Times New Roman', Times, serif",paddingBottom:80}}>
      <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:"calc(var(--fs) * 0.857)",
          fontWeight:700,marginBottom:10}}> Back</button>
        <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.286)",fontWeight:900}}> Review & Analysis</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:"calc(var(--fs) * 0.857)",marginTop:2}}>
          {mistakes.length} total mistakes recorded
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2E8F0"}}>
        {[["trend"," Trend"],["weak"," Weak Topics"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",
              padding:"13px 8px",fontSize:"calc(var(--fs) * 0.929)",fontWeight:view===v?800:500,
              color:view===v?"#1E3A6E":"#64748B",
              borderBottom:view===v?"2.5px solid #1E3A6E":"2.5px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"16px"}}>
        {view==="trend"&&(
          <>
            {/* Mistakes over time bar chart */}
            <div style={{background:"#fff",borderRadius:18,padding:"16px",marginBottom:14,
              boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
              <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:"#0F172A",marginBottom:14}}>
                Mistakes Per Session
              </div>
              {trendData.length===0?(
                <div style={{textAlign:"center",color:"#94A3B8",padding:"24px",fontSize:"calc(var(--fs) * 0.929)"}}>
                  No data yet. Complete some sessions first!
                </div>
              ):(
                <div style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>
                  {trendData.map((d,i)=>{
                    const maxM = Math.max(...trendData.map(x=>x.mistakes),1);
                    const h = Math.max((d.mistakes/maxM)*80,4);
                    const isLast = i===trendData.length-1;
                    return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",
                        alignItems:"center",gap:4}}>
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,color:"#64748B"}}>
                          {d.mistakes}
                        </div>
                        <div style={{width:"100%",height:h,borderRadius:"4px 4px 0 0",
                          background:isLast?"#EF4444":"#BFDBFE",
                          transition:"height .4s"}}/>
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#94A3B8",textAlign:"center",
                          lineHeight:1.2,maxWidth:28,overflow:"hidden"}}>
                          {d.date.slice(0,5)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {trendData.length>=2&&(()=>{
                const first=trendData[0].mistakes, last=trendData[trendData.length-1].mistakes;
                const improved = last < first;
                return(
                  <div style={{background:improved?"#D1FAE5":"#FEF3C7",borderRadius:10,
                    padding:"8px 12px",marginTop:10,fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,
                    color:improved?"#065F46":"#92400E"}}>
                    {improved
                      ? ` Mistakes reduced from ${first}  ${last}. Great improvement!`
                      : last===first
                      ? " Steady performance. Keep practising!"
                      : ` More mistakes recently (${first}  ${last}). Review weak topics below.`}
                  </div>
                );
              })()}
            </div>

            {/* Recent 3 mistakes with solutions */}
            {mistakes.length>0&&(
              <div style={{background:"#fff",borderRadius:18,padding:"16px",
                boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
                <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:"#0F172A",marginBottom:12}}>
                   Last Mistakes to Revisit
                </div>
                {mistakes.slice(-3).reverse().map((m,i)=>{
                  const col = topicColors[m.topic||m.sectionType]||"#64748B";
                  return(
                    <div key={i} style={{borderBottom:i<2?"1px solid #F1F5F9":"none",
                      paddingBottom:i<2?12:0,marginBottom:i<2?12:0}}>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <span style={{background:col+"18",borderRadius:8,padding:"4px 8px",
                          fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,color:col,flexShrink:0}}>
                          {m.topic||m.sectionType}
                        </span>
                        <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#0F172A",fontWeight:600,lineHeight:1.5}}>
                          {(m.q||m.id||"-").slice(0,80)}{(m.q||"").length>80?"...":""}
                        </div>
                      </div>
                      {m.solution&&(
                        <div style={{background:"#F0FDF4",borderRadius:10,padding:"8px 10px",
                          marginTop:8,fontSize:"calc(var(--fs) * 0.786)",color:"#065F46",fontWeight:600}}>
                           {m.solution.tip
                            ? m.solution.tip.replace(" ","")
                            : (m.solution.steps||[])[0]||"See solution in Mistakes tab"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view==="weak"&&(
          <div style={{background:"#fff",borderRadius:18,padding:"16px",
            boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:"#0F172A",marginBottom:14}}>
              Topics That Need More Practice
            </div>
            {topTopics.length===0?(
              <div style={{textAlign:"center",color:"#94A3B8",padding:"24px",fontSize:"calc(var(--fs) * 0.929)"}}>
                No data yet!
              </div>
            ):topTopics.map(([topic,count],i)=>{
              const col = topicColors[topic]||"#64748B";
              const pct = Math.round(count/maxCount*100);
              const priority = i===0?" High":i<=1?" Medium":" Low";
              return(
                <div key={topic} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:4}}>
                    <div>
                      <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800,color:col}}>{topic}</span>
                      <span style={{fontSize:"calc(var(--fs) * 0.780)",color:"#94A3B8",marginLeft:6}}>{priority}</span>
                    </div>
                    <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:700,color:"#64748B"}}>
                      {count} mistake{count>1?"s":""}
                    </span>
                  </div>
                  <div style={{background:"#F1F5F9",borderRadius:8,height:8}}>
                    <div style={{background:col,borderRadius:8,height:8,
                      width:pct+"%",transition:"width .5s"}}/>
                  </div>
                  <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#94A3B8",marginTop:3}}>
                    {i===0?"Focus on this topic first in your next session"
                     :i===1?"Revise this topic regularly"
                     :"Keep an eye on this topic"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


//  English Vocabulary Dictionary (P3 Level) 
// Used for vocabulary building, word definitions on hover

function App(){
  const [auth,    setAuth]    = useState(null);   // { role, user }
  const [tick,    setTick]    = useState(0);       // force re-render after store mutations
  
  // Data is loaded from localStorage at startup - no async needed

  function refresh(){ setTick(t=>t+1); }

  function handleSignup(role, userData){
    STORE.users[userData.id] = {...userData, role};
    persistUsers();
    setAuth({role, user:userData});
  }
  function handleLogin(role, user){ 
    setAuth({role, user}); 
    if(!window._GENIUS_STORE) window._GENIUS_STORE = {users:{},progress:{}};
    window._GENIUS_STORE._currentUser = user.id;
  }
  function handleLogout(){ setAuth(null); }

  if(!auth) return <AuthScreen onLogin={handleLogin} onSignup={handleSignup}/>;

  if(auth.role==="student"){
    const user = STORE.users[auth.user.id] || auth.user;
    return <StudentApp
      user={user}
      onLogout={handleLogout}
      getProgress={(g,s)=>getProgress(user.id,g,s)}
      setProgress={(g,s,d)=>{ setProgress(user.id,g,s,d); refresh(); }}
    />;
  }

  if(auth.role==="parent"){
    const user = STORE.users[auth.user.id] || auth.user;
    const linkedStudents = (user.childIds||[]).map(cid=>STORE.users[cid]).filter(Boolean);
    return <ParentApp
      user={user}
      linkedStudents={linkedStudents}
      onLogout={handleLogout}
      getProgress={getProgress}
      setProgress={(uid,g,s,d)=>{ setProgress(uid,g,s,d); refresh(); }}
      refresh={refresh}
    />;
  }

  if(auth.role==="admin"){
    return <AdminApp
      adminUser={auth.user}
      onLogout={handleLogout}
      getProgress={getProgress}
      setProgress={(uid,g,s,d)=>{ setProgress(uid,g,s,d); refresh(); }}
      refresh={refresh}
      tick={tick}
    />;
  }
  return null;
}


// Add spin animation via a style injection (runs once)
if(typeof window !== 'undefined' && !document.getElementById("genius-styles")){
  const style = document.createElement('style');
  style.id = 'genius-styles';
  style.textContent = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pop  { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
    @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .genius-fadeIn { animation: fadein 0.3s ease; }
  `;
  document.head.appendChild(style);
}


export default App;


