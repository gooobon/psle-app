"use client";
import { mockSchoolLabel } from "@/lib/attemptMeta";
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
  ComingSoonToast, ComingSoonScreen,
  StudentHome, StudentShell, TodayScreen, todaySetStatus,
} from '@/components/Dashboard';

import { SessionScreen }   from '@/components/EnglishSession';
import { ExamSessionScreen } from '@/components/ExamSession';
import { WA1_PRACTICE_SETS } from '@/data/p3/english/wa1_practice';
import { WA1_ZH_PRACTICE } from '@/data/p3/chinese/wa1_practice';
// CLEANUP1: zhRemediation.js retired (replaced by src/lib/tickets.js)
import { ZhSessionScreen } from '@/components/ChineseSession';
import { todayStr, fmtTime } from '@/lib/sessionUtils';
import { recordTrials, ensureLedgerFields, MODE as TRIAL_MODE, firstTryStats, skillKeyOf } from '@/lib/trialLedger'; // STEP1_TRIAL_LEDGER // STEP3A_KPI_HEADER
import { qualifyingHomeworkResults } from '@/lib/homeworkMastery';
import ZhReviewGate from '@/components/ZhReviewGate';
import ZH_VOCAB from '@/data/p3/chinese/zh_vocab.json';
import { getState as zhGetState } from '@/lib/zhReview';
import { getSessionUnknown as zhGetSessionUnknown, clearSessionUnknown as zhClearSessionUnknown, assembleGate as zhAssembleGate, coreWordsFromWrong as zhCoreWordsFromWrong } from '@/lib/zhReview';

// Function words never worth pushing into the whole-set review gate.
const ZH_GATE_STOP = new Set("的了是我你他她它们在有和就也都不这那个吗呢吧与及或把被让从向对为之地得着过很太最会要能可跟给还又再只等啊呀哦嗯".split(""));

import { StudentResultScreen, ZhResultScreen } from '@/components/ResultScreen';
import ZhWa1ResultScreen from '@/components/ZhWa1ResultScreen'; // STEP3B_ZH_RESULT
import SetRewards from '@/components/SetRewards';
import EnReviewGate from '@/components/EnReviewGate'; // STEP4_EN_GATE
import { makeReviewStore } from '@/lib/vocabReview';
const EN_REVIEW = makeReviewStore('en');
import ZH_BANK from '@/data/p3/chinese/wa1_bank.json'; // STEP7_TICKETS
import { openTicketsFromResults, gradeTicketsFromDrill, pickDrillItems, pickNextSet, bankFromIndex, ticketSummary } from '@/lib/tickets';

import { Wrap, StudentBottomNav, CS as C, ErrorBox, SFX, SpeakBtn } from '@/lib/uiShared';

import { loadBank } from '@/lib/serverClient';
import { ParentApp } from '@/components/ParentDashboard';
import MistakeNotebook, { MistakePatterns } from '@/components/MistakeNotebook';
import LearningDashboard from '@/components/LearningDashboard'; // flag NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED (default off)
import ParentHomework from '@/components/ParentHomework';
import MyRecords from '@/components/MyRecords'; // student My records (history, mistakes, words, progress)
import { StickerShelf, WeeklyReviewCard } from '@/components/Rewards'; // step 9 (flag NEXT_PUBLIC_REWARDS_ENABLED, default off)
import { setMistakeCause, applySimilarRetry, pickSimilar, findMistake, attemptKeyFor, mistakeKeys, newMistakeId, patternSummary } from '@/lib/wrongNotebook';
import { getTagIndex, similarQuestions } from '@/lib/taxonomyLookup';
import ReviewRounds from '@/components/ReviewRounds'; // STEP2_ROUND_REVIEW
import VocabQuiz from '@/components/VocabQuiz'; // STEP2F_VOCAB_QUIZ_V2
import EN_VOCAB from '@/data/p3/english/en_vocab.json';
import { indexSets, buildRoundReviewPlan, listReviewableRounds, markRoundReviewed, REVIEW_SET_ID, enrichMistakes, roundVocabCandidates } from '@/lib/reviewRounds'; // STEP2D_VOCAB_BY_ROUND // STEP2B_MISTAKE_ENRICH
import WA1_ZH_DRILL from '@/data/p3/chinese/wa1_drill'; // STEP10_DRILL_INDEX
const ZH_ROUND_INDEX = indexSets([...WA1_ZH_PRACTICE, ...(WA1_ZH_DRILL || [])]);
const EN_ROUND_INDEX = indexSets(WA1_PRACTICE_SETS);
const EN_BANK = bankFromIndex(EN_ROUND_INDEX);
import { scheduleRound } from '@/lib/scheduler'; // STEP9_ADAPTIVE
import PaperExam from '@/components/PaperExam'; // mock exams from past papers (flag NEXT_PUBLIC_MOCK_EXAMS_ENABLED, default off)
import { clewquestEnabled } from '@/lib/clewquest/config'; // ClewQuest (flag NEXT_PUBLIC_CLEWQUEST_ENABLED, default off)
import ClewQuestStudent from '@/components/clewquest/ClewQuestStudent';
import { Art } from '@/components/clewquest/Art';
import BootLoading from '@/components/clewquest/BootLoading';
import { PictureLogin } from '@/components/clewquest/PictureAuth';
import { PreLoginLanding, LoginFrame, ForgotPassword, SetNewPassword, SignupParentStep1, SignupStep2 } from '@/components/clewquest/AuthScreens';
import { Field, Segmented, ErrorText, T, FONT, mainBtn, secondaryBtn, inputStyle, labelStyle, linkBtn, helperStyle } from '@/components/clewquest/Shell';
import { questGrade } from '@/lib/clewquest/logic';
import { SERVER_AUTH, LEARNING_DASHBOARD, MOCK_EXAMS_ENABLED, serverPost, serverGet, importLocalOnce, reportActivity, reportPracticeStarted, reportWrongAnswers, syncLocalWrongAnswersOnce, updateWrongAnswer, reportWeeklyReview, syncLearningTrials } from '@/lib/serverClient'; // server auth (flag NEXT_PUBLIC_SERVER_AUTH, default off)
import { resolveDailyTarget, sgtDate as sgtToday } from '@/lib/activity';
import { SEED_USERS, LS_USERS_KEY, LS_PROGRESS_KEY, _loadFromLS, _saveToLS, _persistedUsers, _persistedProgress, STORE, storeGet, storeSet, persistUsers, persistProgressLS, allUsers, mirrorServerUser, ADMIN_USER, adminLogin, adminSessionValid, getProgress, setProgress, makeSeedHistory } from "./appStore";
function ChineseApp({user, getProgress, setProgress, onBack, onLogout, onSubjectChange, onGradeChange, initialAction, dailyTarget}){

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

  const [screen,setScreen] = useState(initialAction==="mistakes"||initialAction==="review"?initialAction:"home");   // home | session | result
  const zhBoot = useRef(initialAction||null);
  const [inSession,setInSession] = useState(false);
  const [examMode,setExamMode] = useState(false); // Chinese WA1 60-set mock (coexists with adaptive)
  const [drillMode,setDrillMode] = useState(false); // item-level weak-trap remediation drill
  const [sessionResult,setSessionResult] = useState(null);
  const [startFromSection, setStartFromSection] = useState(null);
  const [reviewSection, setReviewSection] = useState(null);
  const [zhGate, setZhGate] = useState(null); // words[] when the whole-set review gate is showing
  const [recGate, setRecGate] = useState(null); // words[] for a review started from My records
  const [dailyResult, setDailyResult] = useState(null); // {results, sessionNum} for the end-of-round summary (after the gate)
  const [adaptive, setAdaptive] = useState(null); // {plan, ids, parts} while an adaptive round is running
  function startAdaptive(){
    reportPracticeStarted(subject);
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
    reportActivity(subject, 'adapt-'+ses, results);
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
  // Notebook v1: cause + "Try 3 similar" (additive fields on prog.mistakes[i]; nothing is deleted)
  const notebook = {
    onCause:(key,cause)=>{
      const f=findMistake(prog, key); if(!f) return;
      setProgress(grade, subject, setMistakeCause(prog, key, cause, new Date().toISOString()));
      updateWrongAnswer(subject, f.m.id, attemptKeyFor(prog, f.m), {cause});
    },
    similarFor:(m)=>pickSimilar(getTagIndex(), ZH_ROUND_INDEX, m, similarQuestions),
    onTrySimilar:(key,ids)=>{
      const built=buildRoundReviewPlan({mistakes:ids.map(id=>({id}))}, ZH_ROUND_INDEX);
      if(!built.plan.length) return;
      setRoundReview({plan:built.plan, sessionNum:(findMistake(prog,key)?.m.sessionNum)||0, similar:{key, ids}});
    },
  };
  // Parent homework (flag NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED, default off). Mastery: delayed transfer only (homeworkMastery.js).
  const [hwKey,setHwKey]=useState(0);
  function startHomework(ids,sources){
    reportPracticeStarted(subject);
    const built=buildRoundReviewPlan({mistakes:ids.map(id=>({id}))}, ZH_ROUND_INDEX);
    if(!built.plan.length) return;
    setRoundReview({plan:built.plan, sessionNum:0, homework:{ids, sources:sources||{}}});
  }
  // Saturday Weekly Review (flag NEXT_PUBLIC_REWARDS_ENABLED, default off). Like homework: not written to trials/mastery.
  const [wrKey,setWrKey]=useState(0);
  function startWeekly(ids){
    const built=buildRoundReviewPlan({mistakes:ids.map(id=>({id}))}, ZH_ROUND_INDEX);
    if(!built.plan.length) return;
    setRoundReview({plan:built.plan, sessionNum:0, weekly:{items:ids.length}});
  }
  function finishRoundReview(results){
    if(roundReview.weekly){
      reportWeeklyReview(subject, roundReview.weekly.items).then(()=>setWrKey(k=>k+1));
      setRoundReview(null); setScreen("mistakes"); return;
    }
    if(roundReview.homework){
      const hw=roundReview.homework, hwRows=(results||[]).filter(r=>r&&r.id!=null);
      serverPost("/api/student/homework",{subject, results:hwRows.map(r=>({id:r.id, correct:r.correct===true}))}).then(()=>setHwKey(k=>k+1));
      // Delayed transfer only (owner decision #32): a different, unseen, same-skill question answered >= 1 SGT day after the ORIGINAL
      // mistake counts at half weight (right or wrong). Same-question redo and everything else never touch mastery.
      const hwQual=qualifyingHomeworkResults(prog, hwRows, (r)=>{ const sid=hw.sources&&hw.sources[r.id]; const m0=(prog.mistakes||[]).find(m=>m&&sid!=null&&String(m.id)===String(sid)); return m0?{id:m0.id, skill:skillKeyOf(m0), date:m0.date, ts:m0.ts}:null; }, sgtToday(), skillKeyOf);
      if(hwQual.length) setProgress(grade, subject, recordTrials(prog, hwQual, { mode: TRIAL_MODE.HOMEWORK, sessionNum: prog.nextSession, setId: 'PARENT_HW' }));
      setRoundReview(null); setScreen("mistakes"); return;
    }
    if(roundReview.similar){
      const {key:mk, ids}=roundReview.similar, now=new Date().toISOString();
      const m0=findMistake(prog, mk)?.m;
      const t=recordTrials(prog, results, { mode: TRIAL_MODE.DRILL, sessionNum: prog.nextSession, setId: 'SIMILAR_RETRY' });
      const r=applySimilarRetry(t, mk, ids, results, now);
      setProgress(grade, subject, r.prog);
      if(r.resolved && m0) updateWrongAnswer(subject, m0.id, attemptKeyFor(prog, m0), {resolved:true});
      setRoundReview(null); setScreen("mistakes"); return;
    }
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
    reportPracticeStarted(subject);
    setStartFromSection(typeof fromSection === "string" ? fromSection : null);
    setExamMode(true);
  }
  useEffect(() => {
    if (zhBoot.current === "start") {
      zhBoot.current = null;
      startSession();
    }
  }, []);
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
    const newMistakes=[...(prog.mistakes||[]),...missed.map((r,n)=>({...r,date:todayStr(),sessionNum,mid:newMistakeId(sessionNum,r.id,n)}))];
    const withTrials=recordTrials(prog, results, { mode: isMock?TRIAL_MODE.MOCK:TRIAL_MODE.EXAM, sessionNum, setId: WA1_ZH_PRACTICE[wa1Idx].setId });
    const withTickets=openTicketsFromResults(withTrials, results, sessionNum);
    setProgress(grade,subject,{...withTickets,history:[...(prog.history||[]),newEntry],mistakes:newMistakes,nextSession:sessionNum+1,sessionSections:null});
    reportActivity(subject, 'set-'+sessionNum, results);
    reportWrongAnswers(subject, grade, sessionNum, missed, WA1_ZH_PRACTICE[wa1Idx].setId);
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
  if(recGate) return(
    <Wrap>
      <ZhReviewGate words={recGate} dict={ZH_VOCAB} onDone={()=>{ setRecGate(null); setScreen("records"); }} />
    </Wrap>
  );
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
        sessionMode="exam"
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
        sessionMode={roundReview.homework?'homework':roundReview.similar?'drill':'review'}
        mockInfo={{school:roundReview.homework?"Homework from Parent":roundReview.similar?"\u7C7B\u4F3C\u9898\u7EC3\u4E60":"\u9519\u9898\u590D\u4E60 \u7B2C "+roundReview.sessionNum+" \u8F6E"}}
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
        sessionMode="drill"
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
      <SetRewards />
      <ZhWa1ResultScreen
        results={dailyResult.results}
        sessionNum={dailyResult.sessionNum}
        onHome={()=>{ setDailyResult(null); setScreen("home"); onBack && onBack(); }}
        onNext={()=>{ setDailyResult(null); setScreen("home"); startSession(); }}
        onReview={()=>{ setDailyResult(null); setScreen("mistakes"); }}
      />
    </Wrap>
  );

  if(screen==="result"&&sessionResult) return(
    <Wrap shell>
      <SetRewards />
      <ZhResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        onHome={()=>{ onBack && onBack(); }}
        onNext={()=>{ setInSession(true); setScreen("home"); }}
      />
    </Wrap>
  );

  return(
    <Wrap shell>
      <StudentShell
        user={user}
        grade={grade}
        subject={subject}
        onGradeChange={(g)=>{ onGradeChange && onGradeChange(g); }}
        onSubjectChange={(key, live)=>{ if(key!=="Chinese"){ onSubjectChange ? onSubjectChange(key, live) : onBack(); } }}
        onLogout={onLogout||onBack}
        onToday={onBack}
        toastMsg={null}
        onToastDone={()=>{}}
      />
      {screen==="mistakes" ? (
        <>
          <ParentHomework subject="Chinese" refreshKey={hwKey} onStart={startHomework}/>
          <WeeklyReviewCard subject="Chinese" prog={prog} roundIndex={ZH_ROUND_INDEX} refreshKey={wrKey} onStart={startWeekly}/>
          {drill && (
            <div style={{padding:"14px 16px 0"}}>
              <button onClick={()=>setDrillMode(true)} style={{width:"100%",background:T.cta,color:"#fff",border:"none",borderRadius:14,padding:"12px 16px",cursor:"pointer",textAlign:"left",fontFamily:"\'KaiTi\',\'STKaiti\',\'LXGW WenKai\',serif",boxShadow:"0 4px 14px rgba(185,28,28,0.25)"}}>
                <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>{"\u5F31\u9879\u8BAD\u7EC3 (\u9519\u9898)"}<span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:600,marginLeft:8,opacity:.85}}>{"\u5F85\u5DE9\u56FA "+zhTickets.open+" \u9879 \u00B7 \u5DF2\u638C\u63E1 "+zhTickets.closed}</span></div>
                <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.75)",marginTop:2}}>{"\u53EA\u7EC3\u4F60\u6700\u5BB9\u6613\u9519\u7684\u9898\u578B"}</div>
              </button>
            </div>
          )}
          <MistakesTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}
            rounds={listReviewableRounds(prog.history||[], ZH_ROUND_INDEX, prog.trials||[])} reviewedRounds={prog.reviewedRounds||{}} trials={prog.trials||[]}
            notebook={notebook} onReviewRound={startRoundReview} isZh={true} roundIndex={ZH_ROUND_INDEX} history={prog.history||[]}/>
        </>
      ) : screen==="review" ? (
        <ReviewTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("records")}/>
      ) : screen==="records" ? (
        <MyRecords prog={prog} subject={subject} isZh={true} dict={ZH_VOCAB} vocabState={zhGetState()} onBack={()=>setScreen("home")}
          onFixMistakes={()=>setScreen("mistakes")} onReviewTopics={()=>setScreen("review")}
          onStartVocab={()=>{ const w=zhAssembleGate([], ZH_VOCAB, 10); if(w.length) setRecGate(w); }}/>
      ) : (
        <StudentHome user={user} prog={prog} grade={grade} subject={subject} onStartAdaptive={startAdaptive}
          isMockDue={isMockDue}
          today={todaySetStatus(prog, zhPlan.length, dailyTarget ? dailyTarget.Chinese : undefined)}
          onStart={()=>startSession()}
          onStartFrom={(sec)=>startSession(sec)}
          onStartMock={()=>setInSession(true)}
          completedSections={Object.keys(sectionResults)}
          availableSections={ZH_WA1_ORDER}
          onMistakes={()=>setScreen("mistakes")}
          onRecords={()=>setScreen("records")}
          onReviewSection={(sec)=>setReviewSection(sec)}
        />
      )}
      <StudentBottomNav screen={screen==="home"?"":screen} setScreen={(s)=>{ if(s==="home"){ onBack && onBack(); } else setScreen(s); }} mistakeCount={(prog.mistakes||[]).filter(m=>m.date===todayStr()).length}/>
    </Wrap>
  );
}


function StudentApp({user, onLogout, getProgress, setProgress, initialSubject, onExitToQuest, onOpenQuest}){
  // initialSubject / onExitToQuest are only passed by the ClewQuest shell (flag on). Without them nothing changes.
  // Opened from an island (initialSubject set): leaving the subject returns to the islands. Opened via "Today" (no
  // initialSubject): this is the normal Today hub; leaving a subject comes back to it, and the hub offers a way back.
  const exitSubjectToQuest = !!(onExitToQuest && initialSubject);
  const [grade,           setGrade]           = useState(user.grade||"P3");
  const [subject,         setSubject]         = useState(initialSubject||"English");
  const [subjectSelected, setSubjectSelected] = useState(!!initialSubject);
  const [hub,             setHub]             = useState(!initialSubject); // today overview until a subject is opened
  const [zhAction,        setZhAction]        = useState(null);
  const [screen,          setScreen]          = useState("home");
  const [sessionResult,   setSessionResult]   = useState(null);
  const [inSession,       setInSession]       = useState(false);
  const [mockSession,     setMockSession]     = useState(false);
  const [paperExam,       setPaperExam]       = useState(false); // past-paper mock exam screen (flagged off)
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
  // Parent's per-subject daily goal. Null keeps the on-screen default of 1 set (flag off, no server id, or a failed read).
  const [dailyTarget, setDailyTarget] = useState(null);

  const prog = getProgress(grade, subject);
  const isLive = !!LIVE_CONTENT[`${grade}_${subject}`];

  const isMockDue = prog.nextSession > 1 && (prog.nextSession - 1) % 10 === 0;
  // Practice mode: serve one of the 60 WA1 practice sets, cycling by session.
  const _wa1Len = WA1_PRACTICE_SETS.length;
  const wa1Plan = WA1_PRACTICE_SETS[(((prog.nextSession - 1) % _wa1Len) + _wa1Len) % _wa1Len].plan;
  const [roundReview, setRoundReview] = useState(null); // {plan, sessionNum} while re-solving a past round
  const [enGate, setEnGate] = useState(null); // words[] while the English end-of-round word review is showing
  const [enRecGate, setEnRecGate] = useState(null); // words[] for a review started from My records
  const [enDrillMode, setEnDrillMode] = useState(false);
  const [enAdaptive, setEnAdaptive] = useState(null);
  useEffect(() => {
    const id = user && user.serverId;
    if (!SERVER_AUTH || typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return;
    let alive = true;
    serverGet("/api/student/daily-target").then((r) => {
      if (!alive || !r || !r.ok || !r.dailyTarget) return;
      setDailyTarget(resolveDailyTarget(r.dailyTarget));
    }).catch(() => {});
    return () => { alive = false; };
  }, [user]);
  function startEnAdaptive(){
    reportPracticeStarted(subject);
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
  // Mock papers (flag NEXT_PUBLIC_MOCK_EXAMS_ENABLED, default off): missed items of a handed-in paper join the English notebook.
  // The server already wrote the wrong_answers rows (attempt key 'exam-<attemptId>', capped per paper); this adds the same items to the local
  // notebook, once each (mid = exam-<attemptId>|<questionId>). Additive only: nothing in prog is removed or reordered.
  const paperToNotebook=(attempt, items)=>{
    const p=getProgress(grade, "English");
    const have=new Set((p.mistakes||[]).map(m=>m&&m.mid));
    const key="exam-"+attempt.id;
    const add=(items||[]).filter(it=>it.inNotebook&&it.correct===false&&!have.has(key+"|"+it.id)).map(it=>({
      id:it.id, q:it.prompt, yourAnswer:it.answered?it.yourAnswer:"(no answer)", correctAnswer:it.correctAnswer, explanation:it.explanation||undefined,
      sectionType:it.section, topic:it.section, correct:false, date:todayStr(), ts:Date.now(), mid:key+"|"+it.id, attemptKey:key,
      sourceKind:"paper", paperId:attempt.paperId, paperLabel:attempt.label, ...(it.cause?{cause:it.cause,cause_at:new Date().toISOString()}:{}),
    }));
    if(add.length) setProgress(grade, "English", {...p, mistakes:[...(p.mistakes||[]), ...add]});
  };
  const paperCause=(attemptId, questionId, cause)=>{
    const p=getProgress(grade, "English");
    const mid="exam-"+attemptId+"|"+questionId;
    if(findMistake(p, mid)) setProgress(grade, "English", setMistakeCause(p, mid, cause, new Date().toISOString()));
  };
  // Notebook v1: cause + "Try 3 similar" (additive fields on prog.mistakes[i]; nothing is deleted)
  const notebook = {
    onCause:(key,cause)=>{
      const f=findMistake(prog, key); if(!f) return;
      setProgress(grade, subject, setMistakeCause(prog, key, cause, new Date().toISOString()));
      updateWrongAnswer(subject, f.m.id, attemptKeyFor(prog, f.m), {cause});
    },
    similarFor:(m)=>pickSimilar(getTagIndex(), EN_ROUND_INDEX, m, similarQuestions),
    onTrySimilar:(key,ids)=>{
      const built=buildRoundReviewPlan({mistakes:ids.map(id=>({id}))}, EN_ROUND_INDEX);
      if(!built.plan.length) return;
      setRoundReview({plan:built.plan, sessionNum:(findMistake(prog,key)?.m.sessionNum)||0, similar:{key, ids}});
    },
  };
  // Parent homework (flag NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED, default off). Mastery: delayed transfer only (homeworkMastery.js).
  const [hwKey,setHwKey]=useState(0);
  function startHomework(ids,sources){
    reportPracticeStarted(subject);
    const built=buildRoundReviewPlan({mistakes:ids.map(id=>({id}))}, EN_ROUND_INDEX);
    if(!built.plan.length) return;
    setRoundReview({plan:built.plan, sessionNum:0, homework:{ids, sources:sources||{}}});
  }
  // Saturday Weekly Review (flag NEXT_PUBLIC_REWARDS_ENABLED, default off). Like homework: not written to trials/mastery.
  const [wrKey,setWrKey]=useState(0);
  function startWeekly(ids){
    const built=buildRoundReviewPlan({mistakes:ids.map(id=>({id}))}, EN_ROUND_INDEX);
    if(!built.plan.length) return;
    setRoundReview({plan:built.plan, sessionNum:0, weekly:{items:ids.length}});
  }
  function finishRoundReview(results){
    if(roundReview.weekly){
      reportWeeklyReview(subject, roundReview.weekly.items).then(()=>setWrKey(k=>k+1));
      setRoundReview(null); setScreen("mistakes"); return;
    }
    if(roundReview.homework){
      const hw=roundReview.homework, hwRows=(results||[]).filter(r=>r&&r.id!=null);
      serverPost("/api/student/homework",{subject, results:hwRows.map(r=>({id:r.id, correct:r.correct===true}))}).then(()=>setHwKey(k=>k+1));
      // Delayed transfer only (owner decision #32): a different, unseen, same-skill question answered >= 1 SGT day after the ORIGINAL
      // mistake counts at half weight (right or wrong). Same-question redo and everything else never touch mastery.
      const hwQual=qualifyingHomeworkResults(prog, hwRows, (r)=>{ const sid=hw.sources&&hw.sources[r.id]; const m0=(prog.mistakes||[]).find(m=>m&&sid!=null&&String(m.id)===String(sid)); return m0?{id:m0.id, skill:skillKeyOf(m0), date:m0.date, ts:m0.ts}:null; }, sgtToday(), skillKeyOf);
      if(hwQual.length) setProgress(grade, subject, recordTrials(prog, hwQual, { mode: TRIAL_MODE.HOMEWORK, sessionNum: prog.nextSession, setId: 'PARENT_HW' }));
      setRoundReview(null); setScreen("mistakes"); return;
    }
    if(roundReview.similar){
      const {key:mk, ids}=roundReview.similar, now=new Date().toISOString();
      const m0=findMistake(prog, mk)?.m;
      const t=recordTrials(prog, results, { mode: TRIAL_MODE.DRILL, sessionNum: prog.nextSession, setId: 'SIMILAR_RETRY' });
      const r=applySimilarRetry(t, mk, ids, results, now);
      setProgress(grade, subject, r.prog);
      if(r.resolved && m0) updateWrongAnswer(subject, m0.id, attemptKeyFor(prog, m0), {resolved:true});
      setRoundReview(null); setScreen("mistakes"); return;
    }
    const withTrials=recordTrials(prog, results, { mode: TRIAL_MODE.REVIEW, sessionNum: roundReview.sessionNum, setId: REVIEW_SET_ID });
    setProgress(grade, subject, markRoundReviewed(withTrials, roundReview.sessionNum, results, todayStr()));
    setRoundReview(null); setScreen("mistakes");
  }

  // The 6 sections that make up a full English session.
  const SESSION_SECTIONS = ["GrammarMCQ","VocabMCQ","GrammarCloze","VocabCloze","Editing","Synthesis","Comprehension"];

  function startSession(fromSection){
    reportPracticeStarted(subject);
    setStartFromSection(typeof fromSection === "string" ? fromSection : null);
    setInSession(true);
  }

  function leaveToHub(){
    if(exitSubjectToQuest){ onExitToQuest(); return; } // ClewQuest: back to where the student came from (the islands)
    setHub(true);
    setSubjectSelected(false);
    setScreen("home");
    setZhAction(null);
    setInSession(false);
    setMockSession(false);
    setStartFromSection(null);
    setReviewSection(null);
    setStudentToast(null);
  }

  function openSubject(key, action){
    if(!LIVE_CONTENT[`${grade}_${key}`]){
      setStudentToast("Coming soon");
      return;
    }
    setStudentToast(null);
    setHub(false);
    setSubject(key);
    setSubjectSelected(true);
    setScreen(action==="mistakes"||action==="review" ? action : "home");
    if(key==="English"){
      setZhAction(null);
      const p = getProgress(grade, "English");
      const partial = (p.sessionSections && p.sessionSections.sessionNum === p.nextSession) ? (p.sessionSections.results||{}) : {};
      setSectionResults(partial);
      setStartFromSection(null);
      setInSession(action==="start");
    } else {
      setInSession(false);
      setZhAction(action==="start"||action==="mistakes"||action==="review" ? action : null);
    }
  }

  const todaySubjects = ["English","Chinese","Math","Science"].map((key)=>{
    const meta = SUBJECTS[key] || {};
    const live = !!LIVE_CONTENT[`${grade}_${key}`];
    if(!live) return { key, label: meta.label || key, color: meta.color, live, status:null, mistakesToday:0, isMockDue:false };
    const p = getProgress(grade, key);
    let sections = 0;
    if(key==="English"){
      const n = WA1_PRACTICE_SETS.length || 1;
      const idx = (((p.nextSession-1)%n)+n)%n;
      sections = ((WA1_PRACTICE_SETS[idx] && WA1_PRACTICE_SETS[idx].plan) || []).length;
    } else if(key==="Chinese"){
      const idx = pickNextSet(WA1_ZH_PRACTICE, p, ((p.nextSession-1)%60+60)%60);
      sections = ((WA1_ZH_PRACTICE[idx] && WA1_ZH_PRACTICE[idx].plan) || []).length;
    }
    return {
      key, label: meta.label || key, color: meta.color, live,
      status: todaySetStatus(p, sections, dailyTarget ? dailyTarget[key] : undefined),
      mistakesToday: (p.mistakes||[]).filter(m=>m.date===todayStr()).length,
      isMockDue: p.nextSession>1 && (p.nextSession-1)%10===0,
    };
  });

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
    // The paper the student actually sat (forced mock) gives the real school; a flagged daily mock uses that set's own label.
    const sat = forceMock ? buildPastPaperPlan(prog.settings, user.school, sessionNum) : null;
    const newEntry={ sessionNum, date:todayStr(), scores, totalPct,
      mistakes: graded.filter(r=>!r.correct).map(r=>({...r})),
      isMockExam: isMock||isPastPaper,
      school: isMock?mockSchoolLabel({ paperPlan: sat, dailyPlan: wa1Plan }): isPastPaper?(paperInfo?.label||"Past Paper"):undefined,
      examType: isMock?"WA1": isPastPaper?"Past Paper #"+(sessionNum-10):undefined };
    const newMistakes=[...(prog.mistakes||[]),...graded.filter(r=>!r.correct).map((r,n)=>({...r,date:todayStr(),sessionNum,mid:newMistakeId(sessionNum,r.id,n)}))];
    const allLookedUp = [...new Set(results.flatMap(r=>r.lookedUpWords||[]))];
    const wrongWords  = [...new Set(graded.filter(r=>!r.correct).flatMap(r=>{
      const sentence=r.sentence||"";
      return sentence.split(/\s+/).map(w=>w.replace(/[.,!?'"]/g,"").toLowerCase()).filter(w=>WORD_DICT[w]);
    }))];
    const vocabWords  = [...new Set([...allLookedUp,...wrongWords])];
    const prevVocab   = prog.vocabBook||[];
    const newVocab    = [...prevVocab];
    vocabWords.forEach(w=>{ if(!newVocab.find(v=>v.word===w)) newVocab.push({word:w,def:WORD_DICT[w]||"",addedDate:todayStr(),fromMistake:wrongWords.includes(w)}); });
    // A past-paper mock (forceMock) is graded from that paper's own key. The key id is not an answer.
    // A flagged every-10th mock still sits a practice set, so it keeps the school label as its set id.
    let trialSetId = newEntry.school || null;
    if (forceMock) {
      const paperPlan = sat;
      if (paperPlan && paperPlan.paperKey) trialSetId = "paper:" + paperPlan.paperKey;
    }
    const withTrials=recordTrials(prog, results, { mode: (isMock||isPastPaper)?TRIAL_MODE.MOCK:TRIAL_MODE.EXAM, sessionNum, setId: trialSetId });
    const withTickets=openTicketsFromResults(withTrials, results, sessionNum);
    setProgress(grade, subject, { ...withTickets, history:[...prog.history, newEntry], mistakes:newMistakes, nextSession:sessionNum+1, vocabBook:newVocab, sessionSections:null });
    reportActivity(subject, 'set-'+sessionNum, results);
    reportWrongAnswers(subject, grade, sessionNum, graded.filter(r=>!r.correct), newEntry.school);
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
        sessionMode={roundReview.homework?'homework':roundReview.similar?'drill':'review'}
        mockInfo={{school:roundReview.homework?"Homework from Parent":roundReview.similar?"Similar questions":"Round "+roundReview.sessionNum+" review"}}
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

  if(paperExam) return(
    <Wrap>
      <PaperExam onBack={()=>setPaperExam(false)} onNotebook={paperToNotebook} onCause={paperCause}/>
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
      onBack={leaveToHub}
      onLogout={onLogout}
      onGradeChange={(g)=>{ setGrade(g); }}
      onSubjectChange={(key, live)=>{ setZhAction(null); setSubject(key); setScreen("home"); setHub(false); setSubjectSelected(true); if(!live) setStudentToast("Coming soon"); else setStudentToast(null); }}
      initialAction={zhAction}
      dailyTarget={dailyTarget}
    />
  );


  if(hub || !subjectSelected) return(
    <Wrap shell>
      {onOpenQuest&&!onExitToQuest&&(
        <div style={{padding:"10px 16px 0"}}>
          <button data-testid="today-open-clewquest" onClick={onOpenQuest} style={{background:"none",border:"none",fontWeight:800,color:"#1B2340",cursor:"pointer",padding:0}}>Open ClewQuest</button>
        </div>
      )}
      {onExitToQuest&&(
        <div style={{padding:"10px 16px 0"}}>
          <button data-testid="today-back-to-islands" onClick={onExitToQuest} style={{background:"none",border:"none",fontWeight:800,color:"#1B2340",cursor:"pointer",padding:0}}>Back to the islands</button>
        </div>
      )}
      <TodayScreen
        user={user}
        grade={grade}
        onLogout={onLogout}
        onGradeChange={(g)=>{ setGrade(g); }}
        subjects={todaySubjects}
        onStart={(key)=>openSubject(key, "start")}
        onReview={(key)=>openSubject(key, "review")}
        onMistakes={(key)=>openSubject(key, "mistakes")}
        onMore={(key)=>openSubject(key, "home")}
      />
      <StickerShelf/>
      {SERVER_AUTH&&MOCK_EXAMS_ENABLED&&grade==="P3"&&(
        <div style={{padding:"0 16px 12px"}}>
          <button onClick={()=>setPaperExam(true)} style={{width:"100%",background:"#fff",border:`2px solid ${T.primary}`,color:T.primary,borderRadius:14,padding:"12px 16px",fontWeight:800,cursor:"pointer",textAlign:"left"}}>
            English mock papers <span style={{fontSize:12,fontWeight:600,color:"#6B6F7B"}}>real past papers, timed</span>
          </button>
        </div>
      )}
      {studentToast && <ComingSoonToast message={studentToast} onDone={()=>setStudentToast(null)}/>}
    </Wrap>
  );

  if(enAdaptive) return(
    <Wrap>
      <ExamSessionScreen
        plan={enAdaptive.plan}
        isMockExam
        sessionMode="exam"
        mockInfo={{school:"Adaptive round \u00B7 fix "+enAdaptive.parts.tickets+" \u00B7 nearly there "+enAdaptive.parts.adjacent+" \u00B7 keep sharp "+enAdaptive.parts.maintain+" \u00B7 new "+enAdaptive.parts.explore}}
        onFinish={(results)=>{
          const ses = prog.nextSession;
          let next = recordTrials(prog, results, { mode: TRIAL_MODE.EXAM, sessionNum: ses, setId: 'EN_ADAPT' });
          next = gradeTicketsFromDrill(next, results, ses);
          next = openTicketsFromResults(next, results, ses);
          setProgress(grade, subject, next);
          reportActivity(subject, 'adapt-'+ses, results);
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
        sessionMode="drill"
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

  if(enRecGate) return(
    <Wrap>
      <EnReviewGate words={enRecGate} dict={EN_VOCAB} store={EN_REVIEW} onDone={()=>{ setEnRecGate(null); setScreen("records"); }} />
    </Wrap>
  );
  if(enGate) return(
    <Wrap>
      <EnReviewGate words={enGate} dict={EN_VOCAB} store={EN_REVIEW} onDone={()=>{ setEnGate(null); setScreen("result"); }} />
    </Wrap>
  );

  if(screen==="result"&&sessionResult) return(
    <Wrap shell>
      <SetRewards />
      <StudentResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        isMock={sessionResult.isMock}
        onHome={leaveToHub}
        onNextSession={()=>{ setInSession(true); setScreen("home"); }}
      />
    </Wrap>
  );

  return(
    <Wrap shell>
      <StudentShell
        user={user}
        grade={grade}
        subject={subject}
        onGradeChange={(g)=>{setGrade(g);setScreen("home");}}
        onSubjectChange={(key, live)=>{ setZhAction(null); setSubject(key); setScreen("home"); if(!live) setStudentToast("Coming soon"); else setStudentToast(null); }}
        onLogout={onLogout}
        onToday={leaveToHub}
        toastMsg={studentToast}
        onToastDone={()=>setStudentToast(null)}
      />
      {!isLive ? (
        <ComingSoonScreen grade={grade} subject={subject}/>
      ) : screen==="home" ? (
        <>
      <StudentHome user={user} prog={prog} grade={grade} subject={subject} onStartAdaptive={startEnAdaptive} isMockDue={isMockDue} today={todaySetStatus(prog, wa1Plan.length, dailyTarget ? dailyTarget.English : undefined)} onStart={startSession} onStartFrom={(sec)=>startSession(sec)} onStartMock={()=>setMockSession(true)} completedSections={Object.keys(sectionResults)} availableSections={subject==="English" ? Array.from(new Set(wa1Plan.map(x=>x.type))) : null}  onMistakes={()=>setScreen("mistakes")} onRecords={()=>setScreen("records")} onReviewSection={(sec)=>setReviewSection(sec)}/></>
      ) : screen==="records" ? (
        <MyRecords prog={prog} subject={subject} isZh={false} dict={EN_VOCAB} vocabState={EN_REVIEW.getState()} onBack={()=>setScreen("home")}
          onFixMistakes={()=>setScreen("mistakes")} onReviewTopics={()=>setScreen("review")}
          onStartVocab={()=>{ const w=EN_REVIEW.assembleGate([], EN_VOCAB, 10); if(w.length) setEnRecGate(w); }}/>
      ) : screen==="mistakes" ? (
        <>
          <ParentHomework subject="English" refreshKey={hwKey} onStart={startHomework}/>
          <WeeklyReviewCard subject="English" prog={prog} roundIndex={EN_ROUND_INDEX} refreshKey={wrKey} onStart={startWeekly}/>
          {enDrill && (
            <div style={{padding:"14px 16px 0"}}>
              <button onClick={()=>setEnDrillMode(true)} style={{width:"100%",background:T.primary,color:"#fff",border:"none",borderRadius:14,padding:"12px 16px",cursor:"pointer",textAlign:"left",boxShadow:"0 4px 14px rgba(15,23,42,0.25)"}}>
                <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>Weak-spot drill<span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:600,marginLeft:8,opacity:.85}}>{"to fix "+enTickets.open+" \u00B7 mastered "+enTickets.closed}</span></div>
                <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.75)",marginTop:2}}>New questions on the skills you keep missing. Never the same question again.</div>
              </button>
            </div>
          )}
        <MistakesTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}
          rounds={listReviewableRounds(prog.history||[], EN_ROUND_INDEX, prog.trials||[])} reviewedRounds={prog.reviewedRounds||{}} trials={prog.trials||[]}
          notebook={notebook} onReviewRound={startRoundReview} isZh={false} roundIndex={EN_ROUND_INDEX} history={prog.history||[]}/>
        </>
      ) : screen==="review" ? (
        <ReviewTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}/>
      ) : null}

      <StudentBottomNav screen={screen==="home"?"":screen} setScreen={(s)=>{ if(s==="home") leaveToHub(); else setScreen(s); }} mistakeCount={(prog.mistakes||[]).filter(m=>m.date===todayStr()).length}/>
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
    <Wrap shell>
      <div style={{background:T.primary,padding:"16px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#fff",fontWeight:900,fontSize:"calc(var(--fs) * 1.071)"}}> Admin Dashboard</div>
          <button onClick={onLogout} style={{...T,background:"rgba(255,255,255,.15)",color:"#fff",fontSize:"calc(var(--fs) * 0.786)"}}>Logout</button>
        </div>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{...T,background:tab===t?"#fff":"rgba(255,255,255,.15)",color:tab===t?"#1B2340":"#fff",fontSize:"calc(var(--fs) * 0.786)",textTransform:"capitalize"}}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:16}}>
        {tab==="overview"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {[["","Total Users",users.length],["","Students",students.length],["","Parents",parents.length]].map(([ic,lb,v],i)=>(
                <div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:"calc(var(--fs) * 1.571)"}}>{ic}</div>
                  <div style={{fontSize:"calc(var(--fs) * 1.286)",fontWeight:900,color:"#1B2340"}}>{v}</div>
                  <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#6B6F7B"}}>{lb}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{ window.location.href="/adaptive"; }} style={{width:"100%",marginBottom:14,background:"#1B2340",color:"#fff",border:"none",borderRadius:12,padding:"12px 14px",fontWeight:800,cursor:"pointer",textAlign:"left"}}>
              Question generator
              <div style={{fontWeight:600,fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.7)",marginTop:3}}>Admin only. Draft questions for review.</div>
            </button>
            <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",marginBottom:10}}>Recent Students</div>
              {students.slice(0,8).map((s,i)=>{
                const prog = getProgress(s.id,"P3","English");
                const pct = prog.history?.length ? Math.round(prog.history.reduce((a,h)=>a+h.totalPct,0)/prog.history.length) : null;
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<7?"1px solid #FBF6EA":"none"}}>
                    <div style={{width:32,height:32,borderRadius:9,background:s.color||"#E2DBCF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.143)"}}>{s.avatar||""}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>{s.name}</div>
                      <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#6B6F7B"}}>{s.school||"-"} . {s.grade}</div>
                    </div>
                    <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:pct>=70?T.success:pct?"#D9A52E":"#6B6F7B"}}>{pct!=null?pct+"%":"-"}</div>
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
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<students.length-1?"1px solid #FBF6EA":"none"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:s.color||"#E2DBCF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.000)"}}>{s.avatar||""}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>{s.name} <span style={{color:"#6B6F7B",fontWeight:400}}>({s.id})</span></div>
                    <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#6B6F7B"}}>{s.grade} . {sessions} sessions . {s.school||"-"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab==="accounts"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[[" Students",students,"#1B2340"],[" Parents",parents,T.success],[" Admins",users.filter(u=>u.role==="admin"),T.primary]].map(([title,list,color],gi)=>(
              <div key={gi} style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",color,marginBottom:8}}>{title} ({list.length})</div>
                {list.map((u,i)=>(
                  <div key={i} style={{fontSize:"calc(var(--fs) * 0.857)",padding:"4px 0",borderBottom:i<list.length-1?"1px solid #FBF6EA":"none",color:"#1B2340"}}>
                    {u.name} . <span style={{color:"#6B6F7B"}}>{u.id}</span>
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
    <div style={{textAlign:"center",padding:"50px 20px",color:"#6B6F7B"}}>
      <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,color:"#1B2340",marginBottom:6}}>{isZh?"\u8FD8\u6CA1\u6709\u9519\u9898":"No wrong answers yet"}</div>
      <div style={{fontSize:"calc(var(--fs) * 0.857)"}}>{isZh?"\u5B8C\u6210\u4E00\u8F6E\u7EC3\u4E60\u540E\uFF0C\u8FD9\u91CC\u4F1A\u51FA\u73B0\u6BCF\u8F6E\u9519\u9898\u7684\u8BCD\u8BED\u3002":"Words from each round's wrong answers will appear here."}</div>
    </div>
  );
  return(
    <div>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:8}}>
        {rounds.map(h=>(
          <button key={h.sessionNum} onClick={()=>setSel(h.sessionNum)}
            style={{flexShrink:0,padding:"6px 12px",borderRadius:20,border:"1.5px solid "+(sel===h.sessionNum?"#1F3F95":"#E2DBCF"),
              background:sel===h.sessionNum?"#1F3F95":"#fff",color:sel===h.sessionNum?"#fff":"#334155",fontWeight:700,cursor:"pointer",
              fontSize:"calc(var(--fs) * 0.857)"}}>
            {(isZh?"\u7B2C "+h.sessionNum+" \u8F6E":"Round "+h.sessionNum)}
          </button>
        ))}
      </div>
      <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"#6B6F7B",marginBottom:8}}>
        {isZh?"\u672C\u8F6E\u8BCD\u6C47\u9898\u9519\u9898\u4E2D\u7684\u8BCD\u8BED\uFF08\u6700\u591A 10 \u4E2A\uFF09\uFF1A\u5148\u9009\u610F\u601D\uFF0C\u518D\u586B\u53E5\u5B50":"Words from this round's vocabulary mistakes (up to 10): meaning first, then use in a sentence"}
      </div>
      <VocabQuiz key={entry?entry.sessionNum:0} words={words} dict={isZh?ZH_VOCAB:EN_VOCAB} lang={isZh?"zh":"en"} limit={10}/>
    </div>
  );
}

function MistakesTab({notebook, mistakes:rawMistakes, onBack, vocabBook=[], rounds=[], reviewedRounds={}, onReviewRound, isZh=false, roundIndex=null, history=[], trials=[]}){
  const kpi = React.useMemo(()=>firstTryStats({trials}),[trials]);
  const L = (zh,en)=> isZh?zh:en;
  // Results from ExamSession carry ids only; resolve question/options/answers for display.
  const mistakes = React.useMemo(()=>(()=>{const ks=mistakeKeys(rawMistakes||[]); return enrichMistakes(rawMistakes||[], roundIndex).map((m,i)=>({...m,_k:ks[i]}));})(),[rawMistakes, roundIndex]);
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
    "Numbers":"#1F3F95","Addition":T.success,"Subtraction":"#D9A52E",
    "Multiplication":T.primary,"Division":"#D9A52E","Money":T.success,
    "Measurement":"#B3261E","Fractions":"#EC4899","Patterns":"#6366F1",
    "Word Problem":T.primary,"Grammar":"#1F3F95","Vocabulary":T.gold,
    "BianZi":"#B3261E","CiYu":"#D9A52E","Other":"#6B6F7B",
  };

  return(
    <div style={{fontFamily:"'Times New Roman', Times, serif",paddingBottom:80}}>
      {/* Header */}
      <div style={{background:T.cta,padding:"18px 20px"}}>
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
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2DBCF"}}>
        {[["list", isZh?" \u9519\u9898":" Mistakes"],["quiz", isZh?" \u8BCD\u8BED\u7EC3\u4E60":" Vocab Quiz"],["rounds", isZh?" \u6309\u8F6E\u590D\u4E60":" By Round"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"12px 8px",
              fontSize:"calc(var(--fs) * 0.929)",fontWeight:view===v?800:500,color:view===v?"#1B2340":"#6B6F7B",
              borderBottom:view===v?"2.5px solid #B3261E":"2.5px solid transparent"}}>{l}</button>
        ))}
      </div>
      {view==="quiz"&&<div style={{padding:"12px 16px"}}><VocabQuizByRound history={history} roundIndex={roundIndex} isZh={isZh}/></div>}
      {view==="rounds"&&<ReviewRounds rounds={rounds} reviewedRounds={reviewedRounds} isZh={isZh} onStart={onReviewRound} readOnly={!onReviewRound}/>}
      {view==="list"&&<>
      {/* Filter pills */}
      <div style={{display:"flex",gap:8,padding:"12px 16px",background:"#fff",
        borderBottom:"1px solid #E2DBCF"}}>
        {[["all", L("\u5168\u90E8","All")],["today", L("\u4ECA\u5929","Today")],["week", L("\u672C\u5468","This Week")]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{background:filter===v?"#B3261E":"#FBF6EA",color:filter===v?"#fff":"#6B6F7B",
              border:"none",borderRadius:20,padding:"5px 14px",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,cursor:"pointer"}}>
            {l}
          </button>
        ))}
      </div>

      {notebook&&SERVER_AUTH&&LEARNING_DASHBOARD&&(
        <div style={{padding:"12px 16px 0"}}>
          <LearningDashboard self subject={isZh?"Chinese":"English"}/>
        </div>
      )}
      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"60px 24px",color:"#6B6F7B"}}>
          <div style={{fontSize:48,marginBottom:12}}></div>
          <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:800,color:"#1B2340",marginBottom:6}}>
            No mistakes {filter==="today"?"today":filter==="week"?"this week":"yet"}!
          </div>
          <div style={{fontSize:"calc(var(--fs) * 0.929)"}}>Keep up the great work!</div>
        </div>
      ):(
        <div style={{padding:"12px 16px"}}>
          {/* Topic summary bar */}
          <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:14,
            boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:"#6B6F7B",marginBottom:10,
              textTransform:"uppercase",letterSpacing:.8}}>{L("\u8584\u5F31\u9898\u578B","Weak Topics")}</div>
            {Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length).map(([topic,items])=>{
              const col = topicColors[topic]||"#6B6F7B";
              const pct = Math.round(items.length/filtered.length*100);
              return(
                <div key={topic} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:col}}>{topic}</span>
                    <span style={{fontSize:"calc(var(--fs) * 0.786)",color:"#6B6F7B"}}>{isZh?`\u9519 ${items.length} \u9898`:`${items.length} mistake${items.length>1?"s":""}`}</span>
                  </div>
                  <div style={{background:"#FBF6EA",borderRadius:6,height:6}}>
                    <div style={{background:col,borderRadius:6,height:6,width:pct+"%",transition:"width .4s"}}/>
                  </div>
                </div>
              );
            })}
          </div>

          <MistakePatterns summary={patternSummary(filtered, getTagIndex())}/>
          {notebook&&<MistakeNotebook items={filtered} onCause={notebook.onCause} onTrySimilar={notebook.onTrySimilar} similarFor={notebook.similarFor}/>}
          {/* STEP2C_NO_MISTAKE_LIST */}
          {/* Per-mistake cards removed: re-solving lives in the By Round tab. */}
          {onReviewRound&&(
            <button onClick={()=>setView("rounds")}
              style={{width:"100%",marginTop:4,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",
                background:"#1F3F95",color:"#fff",fontWeight:800,fontSize:"calc(var(--fs) * 0.929)"}}>
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
    "Numbers":"#1F3F95","Addition":T.success,"Subtraction":"#D9A52E",
    "Multiplication":T.primary,"Division":"#D9A52E","Money":T.success,
    "Word Problem":T.primary,"Grammar":"#1F3F95","Vocabulary":T.gold,
    "BianZi":"#B3261E","CiYu":"#D9A52E","Other":"#6B6F7B",
  };

  return(
    <div style={{fontFamily:"'Times New Roman', Times, serif",paddingBottom:80}}>
      <div style={{background:T.primary,padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:"calc(var(--fs) * 0.857)",
          fontWeight:700,marginBottom:10}}> Back</button>
        <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.286)",fontWeight:900}}> Review & Analysis</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:"calc(var(--fs) * 0.857)",marginTop:2}}>
          {mistakes.length} total mistakes recorded
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2DBCF"}}>
        {[["trend"," Trend"],["weak"," Weak Topics"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",
              padding:"13px 8px",fontSize:"calc(var(--fs) * 0.929)",fontWeight:view===v?800:500,
              color:view===v?"#1B2340":"#6B6F7B",
              borderBottom:view===v?"2.5px solid #1B2340":"2.5px solid transparent"}}>
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
              <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:"#1B2340",marginBottom:14}}>
                Mistakes Per Session
              </div>
              {trendData.length===0?(
                <div style={{textAlign:"center",color:"#6B6F7B",padding:"24px",fontSize:"calc(var(--fs) * 0.929)"}}>
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
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,color:"#6B6F7B"}}>
                          {d.mistakes}
                        </div>
                        <div style={{width:"100%",height:h,borderRadius:"4px 4px 0 0",
                          background:isLast?"#B3261E":"#E2DBCF",
                          transition:"height .4s"}}/>
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#6B6F7B",textAlign:"center",
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
                  <div style={{background:improved?"#FBF6EA":"#FBF6EA",borderRadius:10,
                    padding:"8px 12px",marginTop:10,fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,
                    color:improved?"#4F6B22":"#1B2340"}}>
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
                <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:"#1B2340",marginBottom:12}}>
                   Last Mistakes to Revisit
                </div>
                {mistakes.slice(-3).reverse().map((m,i)=>{
                  const col = topicColors[m.topic||m.sectionType]||"#6B6F7B";
                  return(
                    <div key={i} style={{borderBottom:i<2?"1px solid #FBF6EA":"none",
                      paddingBottom:i<2?12:0,marginBottom:i<2?12:0}}>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <span style={{background:col+"18",borderRadius:8,padding:"4px 8px",
                          fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,color:col,flexShrink:0}}>
                          {m.topic||m.sectionType}
                        </span>
                        <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#1B2340",fontWeight:600,lineHeight:1.5}}>
                          {(m.q||m.id||"-").slice(0,80)}{(m.q||"").length>80?"...":""}
                        </div>
                      </div>
                      {m.solution&&(
                        <div style={{background:"#FBF6EA",borderRadius:10,padding:"8px 10px",
                          marginTop:8,fontSize:"calc(var(--fs) * 0.786)",color:"#4F6B22",fontWeight:600}}>
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
            <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:"#1B2340",marginBottom:14}}>
              Topics That Need More Practice
            </div>
            {topTopics.length===0?(
              <div style={{textAlign:"center",color:"#6B6F7B",padding:"24px",fontSize:"calc(var(--fs) * 0.929)"}}>
                No data yet!
              </div>
            ):topTopics.map(([topic,count],i)=>{
              const col = topicColors[topic]||"#6B6F7B";
              const pct = Math.round(count/maxCount*100);
              const priority = i===0?" High":i<=1?" Medium":" Low";
              return(
                <div key={topic} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:4}}>
                    <div>
                      <span style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800,color:col}}>{topic}</span>
                      <span style={{fontSize:"calc(var(--fs) * 0.780)",color:"#6B6F7B",marginLeft:6}}>{priority}</span>
                    </div>
                    <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:700,color:"#6B6F7B"}}>
                      {count} mistake{count>1?"s":""}
                    </span>
                  </div>
                  <div style={{background:"#FBF6EA",borderRadius:8,height:8}}>
                    <div style={{background:col,borderRadius:8,height:8,
                      width:pct+"%",transition:"width .5s"}}/>
                  </div>
                  <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#6B6F7B",marginTop:3}}>
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


loadBank(); // warm the mistake-description index so the first wrong-answer report is complete

// Single lazy entry used by ClaudeApp (the islands never import this module).
export function PracticeEntry({kind, ...props}){
  if(kind==="parent") return <ParentApp {...props} homeworkRunnable={(subj)=>subj==="Chinese"?ZH_ROUND_INDEX:EN_ROUND_INDEX} homeworkSimilarFor={(subj,m,count)=>pickSimilar(getTagIndex(), subj==="Chinese"?ZH_ROUND_INDEX:EN_ROUND_INDEX, {id:m.id}, similarQuestions, count)}/>;
  if(kind==="admin") return <AdminApp {...props}/>;
  return <StudentApp {...props}/>;
}
