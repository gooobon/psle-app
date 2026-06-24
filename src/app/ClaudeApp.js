"use client";
import React from 'react';
import { useState, useRef, useEffect } from "react";

import {
  buildPlan, buildZhPlan, buildZhPastPaperPlan, buildPastPaperPlan,
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
import { ZhSessionScreen } from '@/components/ChineseSession';
import { todayStr, fmtTime } from '@/lib/sessionUtils';

import { StudentResultScreen, ZhResultScreen } from '@/components/ResultScreen';

import { Wrap, StudentBottomNav, C, BigBtn, ErrorBox, InputField } from '@/lib/uiShared';

import { ParentApp } from '@/components/ParentDashboard';





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

// Load persisted data
const _persistedUsers    = _loadFromLS(LS_USERS_KEY, {});
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
  if(!STORE.progress[key]){
    const isDemoUser = userId==="demo_student";
    const seedH = isDemoUser && grade==="P3" && subject==="English" ? makeSeedHistory(userId) : [];
    STORE.progress[key] = {
      history: seedH,
      settings: {...DEFAULT_SETTINGS},
      mistakes: [],
      nextSession: seedH.length+1,
    };
  }
  return STORE.progress[key];
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



function ChineseApp({user, getProgress, setProgress, onBack}){

  const grade="P3", subject="Chinese";
  const prog = getProgress(grade, subject);

  const [screen,setScreen] = useState("home");   // home | session | result
  const [inSession,setInSession] = useState(false);
  const [sessionResult,setSessionResult] = useState(null);

  function handleSessionDone(results){
    const sessionNum=prog.nextSession;
    const bySection={};
    ZH_SECTION_ORDER.forEach(t=>{
      const items=results.filter(r=>r.sectionType===t);
      if(items.length) bySection[t]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=results.length?Math.round(results.filter(r=>r.correct).length/results.length*100):0;
    const newEntry={sessionNum,date:todayStr(),scores:bySection,totalPct,mistakes:results.filter(r=>!r.correct).map(r=>({...r}))};
    const newMistakes=[...(prog.mistakes||[]),...results.filter(r=>!r.correct).map(r=>({...r,date:todayStr()}))];
    setProgress(grade,subject,{...prog,history:[...(prog.history||[]),newEntry],mistakes:newMistakes,nextSession:sessionNum+1});
    setSessionResult({results,sessionNum});
    setInSession(false);
    setScreen("result");
  }

  if(inSession) return(
    <Wrap>
      <ZhSessionScreen
        plan={buildZhPlan(prog.nextSession, level||recommendLevel(prog.history))}
        onFinish={handleSessionDone}
        onBack={()=>setInSession(false)}
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
      <>
      <ZhHome user={user} prog={prog} onStart={()=>setInSession(true)} onBack={onBack}/></>
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
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,marginTop:6}}>PSLE Practice . English . Math . Science . Chinese</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:16,flexWrap:"wrap"}}>
            {["P3","P4","P5","P6"].map(g=><span key={g} style={{background:"rgba(255,255,255,0.12)",borderRadius:8,padding:"4px 12px",color:"rgba(255,255,255,0.75)",fontSize:12,fontWeight:700}}>{g}</span>)}
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
    <div style={{marginTop:10,background:col+"15",border:"1px solid "+col+"44",borderRadius:10,padding:"9px 13px",fontSize:12,fontWeight:600,lineHeight:1.6,color:col}}>
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
      <span style={{fontSize:16}}></span>
      <div style={{flex:1}}>
        <span style={{fontSize:12,fontWeight:700,color:col}}>{school}</span>
        <span style={{fontSize:11,color:C.muted}}> . Focus: </span>
        <span style={{fontSize:11,color:C.muted}}>{profile.focusTopics ? profile.focusTopics.slice(0,2).join(", ") : ""}</span>
      </div>
      <span style={{background:col,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:8,textTransform:"uppercase"}}>{profile.style}</span>
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
    <div style={{position:"relative",marginBottom:0}}> <div onClick={()=>setOpen(o=>!o)} style={{background:"#fff",border:`1.5px solid ${open?C.navy:C.border}`,borderRadius:12,padding:"12px 14px",fontSize:14,fontWeight:hasVal?700:400,color:hasVal?"#0F172A":C.muted,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border 0.15s",boxShadow:open?"0 0 0 3px rgba(30,58,110,0.1)":"none"}}>
        <span style={{flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{displayVal}</span>
        <span style={{fontSize:12,color:C.muted,marginLeft:8,flexShrink:0,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}></span>
      </div> {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",border:`1.5px solid ${C.navy}`,borderRadius:14,boxShadow:"0 8px 32px rgba(15,23,42,0.18)",zIndex:999,overflow:"hidden"}}> <div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,background:"#F8FAFC"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"7px 12px"}}>
              <span style={{fontSize:14,color:C.muted}}></span>
              <input
                autoFocus
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search school name..."
                style={{border:"none",outline:"none",fontSize:13,flex:1,fontFamily:"Nunito,sans-serif",color:"#0F172A"}}
              />
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:C.muted,padding:0}}>x</button>}
            </div>
          </div> <div style={{maxHeight:240,overflowY:"auto"}}>
            {filtered.length===0&&(
              <div style={{padding:"16px",textAlign:"center",fontSize:13,color:C.muted}}>No schools found</div>
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
                  <span style={{fontSize:16,flexShrink:0}}>{isOther?"":""}</span>
                  <span style={{flex:1,fontSize:13,fontWeight:isSelected?800:500,color:isSelected?C.navy:"#0F172A"}}>{school}</span>
                  {styleTag&&<span style={{fontSize:12,flexShrink:0}}>{styleTag}</span>}
                  {isSelected&&<span style={{fontSize:14,flexShrink:0}}></span>}
                </div>
              );
            })}
          </div> <div style={{padding:"8px 14px",background:"#F8FAFC",borderTop:`1px solid ${C.border}`,display:"flex",gap:12,fontSize:10,color:C.muted}}>
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
      <div style={{fontWeight:900,fontSize:20,color:"#0F172A",marginBottom:6}}>Welcome back </div>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Log in to continue your practice</div> <div style={{display:"flex",background:"#E2E8F0",borderRadius:14,padding:4,marginBottom:20}}>
        {["student","parent"].map(r=>(
          <button key={r} onClick={()=>{setRole(r);setErr("");}} style={{flex:1,background:role===r?"#fff":"none",border:"none",borderRadius:11,padding:"10px 0",fontSize:14,fontWeight:800,cursor:"pointer",color:role===r?"#0F172A":C.muted,boxShadow:role===r?"0 2px 8px rgba(0,0,0,0.1)":"none",transition:"all 0.2s"}}>
            {r==="student"?" Student":" Parent"}
          </button>
        ))}
      </div> <div onClick={fillDemo} style={{background:C.lBlue,border:`1px solid #BAE6FD`,borderRadius:12,padding:"10px 14px",marginBottom:18,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:11,fontWeight:800,color:"#1D4ED8",marginBottom:2}}> Try Demo Account</div>
          <div style={{fontSize:11,color:"#3B82F6"}}>{role==="student"?"ID: demo_student / PW: demo123":"ID: demo_parent / PW: demo456"}</div>
        </div>
        <span style={{color:"#3B82F6",fontSize:13,fontWeight:700}}>Fill </span>
      </div>

      <InputField label="ID" value={id} onChange={setId} placeholder="Your login ID"/>
      <div style={{position:"relative",marginBottom:16}}>
        <InputField label="Password" value={pw} onChange={setPw} type={showPw?"text":"password"} placeholder="Your password" onEnter={handleLogin}/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted}}>{showPw?"":""}</button>
      </div>

      {err&&<ErrorBox msg={err}/>}

      <BigBtn color={C.navy} onClick={handleLogin}>Log In </BigBtn>

      <div style={{marginTop:20,textAlign:"center"}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:12}}>Don't have an account?</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>onGoSignup("signup_student")} style={{flex:1,background:"none",border:`2px solid ${C.navy}`,borderRadius:12,padding:"12px",fontSize:13,fontWeight:800,cursor:"pointer",color:C.navy}}>
             Student Sign Up
          </button>
          <button onClick={()=>onGoSignup("signup_parent")} style={{flex:1,background:"none",border:`2px solid #7C3AED`,borderRadius:12,padding:"12px",fontSize:13,fontWeight:800,cursor:"pointer",color:"#7C3AED"}}>
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
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:700,marginBottom:16,padding:0}}> Back to Login</button>
      <div style={{fontWeight:900,fontSize:20,color:"#0F172A",marginBottom:4}}>Create Student Account </div>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Set up your practice profile</div> <div style={{marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:800,color:C.muted,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Step 1 . I am a...</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>selectGender("boy")} style={{flex:1,background:gender==="boy"?"linear-gradient(135deg,#3B82F6,#2563EB)":"#F1F5F9",border:gender==="boy"?"none":`2px solid ${C.border}`,borderRadius:16,padding:"18px 12px",cursor:"pointer",transition:"all 0.2s",boxShadow:gender==="boy"?"0 6px 18px rgba(59,130,246,0.35)":"none"}}>
            <div style={{fontSize:36,marginBottom:6}}></div>
            <div style={{fontSize:15,fontWeight:900,color:gender==="boy"?"#fff":"#0F172A"}}>Boy</div>
            
          </button>
          <button onClick={()=>selectGender("girl")} style={{flex:1,background:gender==="girl"?"linear-gradient(135deg,#EC4899,#A855F7)":"#F1F5F9",border:gender==="girl"?"none":`2px solid ${C.border}`,borderRadius:16,padding:"18px 12px",cursor:"pointer",transition:"all 0.2s",boxShadow:gender==="girl"?"0 6px 18px rgba(236,72,153,0.35)":"none"}}>
            <div style={{fontSize:36,marginBottom:6}}></div>
            <div style={{fontSize:15,fontWeight:900,color:gender==="girl"?"#fff":"#0F172A"}}>Girl</div>
            
          </button>
        </div>
      </div>       <InputField label="Full Name" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Mei Lin Tan"/> <div style={{marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:800,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
           Step 3 . Your School
        </div>
        <div style={{fontSize:12,color:C.muted,marginBottom:10,lineHeight:1.5}}>
          We use your school's past papers to tailor questions to your exam style!
        </div> <SchoolDropdown value={form.school} onChange={v=>f("school",v)}/>

        {form.school==="Other / Not Listed"&&(
          <div style={{marginTop:10}}>
            <InputField label="Type your school name" value={form.schoolCustom} onChange={v=>f("schoolCustom",v)} placeholder="e.g. Rosyth School"/>
          </div>
        )}
        {form.school&&form.school!=="Other / Not Listed"&&<SchoolFeedbackBox school={form.school}/>}
        {form.school==="Other / Not Listed"&&form.schoolCustom&&(
          <div style={{marginTop:8,background:"#F0FDF4",borderRadius:10,padding:"9px 13px",fontSize:12,color:"#065F46",fontWeight:600,lineHeight:1.6}}>
             Got it! We'll use similar school papers as reference for your practice questions.
          </div>
        )}
      </div>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Grade</div>
        <div style={{display:"flex",gap:8}}>
          {GRADES.map(g=>(
            <button key={g} onClick={()=>f("grade",g)} style={{flex:1,background:form.grade===g?C.navy:"#F1F5F9",color:form.grade===g?"#fff":C.muted,border:"none",borderRadius:10,padding:"10px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <InputField label="Student ID (for login)" value={form.id} onChange={v=>f("id",v.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. mei_lin_2026"/>
      <div style={{position:"relative",marginBottom:4}}>
        <InputField label="Password (min 6 chars)" value={form.password} onChange={v=>f("password",v)} type={showPw?"text":"password"} placeholder="Create a password"/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted}}>{showPw?"":""}</button>
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
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:700,marginBottom:16,padding:0}}> Back to Login</button>
      <div style={{fontWeight:900,fontSize:20,color:"#0F172A",marginBottom:4}}>Create Parent Account </div>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Monitor your child's progress</div>

      <InputField label="Parent Name" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Mrs Lee"/>
      <InputField label="Parent ID (for login)" value={form.id} onChange={v=>f("id",v.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. mrs_lee_parent"/>
      <div style={{position:"relative",marginBottom:4}}>
        <InputField label="Password (min 6 chars)" value={form.password} onChange={v=>f("password",v)} type={showPw?"text":"password"} placeholder="Create a password"/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted}}>{showPw?"":""}</button>
      </div>
      <InputField label="Confirm Password" value={form.confirm} onChange={v=>f("confirm",v)} type="password" placeholder="Re-enter password"/> <div style={{background:"#F5F3FF",border:"1.5px solid #DDD6FE",borderRadius:16,padding:"14px",marginBottom:16,marginTop:4}}>
        <div style={{fontWeight:800,fontSize:13,color:"#4C1D95",marginBottom:8}}> Link Student Accounts</div>
        <div style={{fontSize:12,color:"#6D28D9",marginBottom:10,lineHeight:1.6}}>
          Ask your child to share their Student ID, then add it here. You can add multiple children.
        </div>
        <div style={{display:"flex",gap:8,marginBottom:6}}>
          <input value={childInput} onChange={e=>setChildInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") addChild();}} placeholder="Enter student ID..." style={{flex:1,border:"1.5px solid #DDD6FE",borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none"}}/>
          <button onClick={addChild} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Add</button>
        </div>
        {linkMsg&&<div style={{fontSize:12,color:linkMsg.startsWith("")?C.green:C.red,fontWeight:600,marginBottom:8}}>{linkMsg}</div>}
        {linkedIds.length===0&&<div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>No children linked yet. You can also add them later.</div>}
        {linkedIds.map(cid=>{
          const ch=allUsers().find(u=>u.id===cid);
          if(!ch) return null;
          return(
            <div key={cid} style={{display:"flex",alignItems:"center",gap:8,background:"#fff",borderRadius:10,padding:"8px 12px",marginBottom:6}}>
              <span style={{fontSize:18}}>{ch.avatar||""}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#4C1D95"}}>{ch.name}</div>
                <div style={{fontSize:11,color:C.muted}}>{ch.grade} . ID: {cid}</div>
              </div>
              <button onClick={()=>removeChild(cid)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:16}}>x</button>
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
  const [startFromSection, setStartFromSection] = useState(null);
  const [studentToast,    setStudentToast]    = useState(null);

  const prog = getProgress(grade, subject);
  const isLive = !!LIVE_CONTENT[`${grade}_${subject}`];

  const isMockDue = prog.nextSession > 1 && (prog.nextSession - 1) % 10 === 0;

  function startSession(fromSection){ 
    setStartFromSection(fromSection||null); 
    setInSession(true); 
  }

  function handleSessionDone(results){
    const sessionNum = prog.nextSession;
    const isMock = isMockDue;
    const scores = {};
    SECTION_ORDER.forEach(type=>{
      const items=results.filter(r=>r.sectionType===type);
      if(items.length) scores[type]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=results.length?Math.round(results.filter(r=>r.correct).length/results.length*100):0;
    const isPastPaper = sessionNum >= 11;
    const paperInfo = isPastPaper ? selectPastPaper(user.school) : null;
    const newEntry={ sessionNum, date:todayStr(), scores, totalPct,
      mistakes: results.filter(r=>!r.correct).map(r=>({...r})),
      isMockExam: isMock||isPastPaper,
      school: isMock?"Nanyang Primary": isPastPaper?(paperInfo?.label||"Past Paper"):undefined,
      examType: isMock?"WA1": isPastPaper?"Past Paper #"+(sessionNum-10):undefined };
    const newMistakes=[...(prog.mistakes||[]),...results.filter(r=>!r.correct).map(r=>({...r,date:todayStr()}))];
    const allLookedUp = [...new Set(results.flatMap(r=>r.lookedUpWords||[]))];
    const wrongWords  = [...new Set(results.filter(r=>!r.correct).flatMap(r=>{
      const sentence=r.sentence||"";
      return sentence.split(/\s+/).map(w=>w.replace(/[.,!?'"]/g,"").toLowerCase()).filter(w=>WORD_DICT[w]);
    }))];
    const vocabWords  = [...new Set([...allLookedUp,...wrongWords])];
    const prevVocab   = prog.vocabBook||[];
    const newVocab    = [...prevVocab];
    vocabWords.forEach(w=>{ if(!newVocab.find(v=>v.word===w)) newVocab.push({word:w,def:WORD_DICT[w]||"",addedDate:todayStr(),fromMistake:wrongWords.includes(w)}); });
    setProgress(grade, subject, { ...prog, history:[...prog.history, newEntry], mistakes:newMistakes, nextSession:sessionNum+1, vocabBook:newVocab });
    setSessionResult({results, sessionNum, isMock});
    setInSession(false);
    setScreen("result");
  }

  if(inSession) return(
    <Wrap>
      <ExamSessionScreen
        plan={buildPlan(prog.settings, user.school, prog.nextSession, recommendLevel(prog.history), recommendSectionLevels(prog.history))}
        isMockExam={isMockDue}
        mockInfo={isMockDue?MOCK_EXAMS[0]:null}
        startFrom={startFromSection}
        onFinish={handleSessionDone}
        onBack={()=>{ setInSession(false); setStartFromSection(null); }}
      />
    </Wrap>
  );

  if(subjectSelected && subject==="Chinese" && isLive) return(
    <ChineseApp
      user={user}
      getProgress={(g,s)=>getProgress(user.id,g,s)}
      setProgress={(g,s,d)=>setProgress(user.id,g,s,d)}
      onBack={()=>setSubjectSelected(false)}
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
      <StudentHome user={user} prog={prog} grade={grade} subject={subject} isMockDue={isMockDue} onStart={startSession} onStartFrom={(sec)=>startSession(sec)} availableSections={subject==="English" ? Array.from(new Set(buildPlan(prog.settings, user.school, prog.nextSession, recommendLevel(prog.history), recommendSectionLevels(prog.history)).map(x=>x.type))) : null}  onMistakes={()=>setScreen("mistakes")} onReview={()=>setScreen("review")}/></>
      ) : screen==="mistakes" ? (
        <MistakesTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}/>
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
  const T = {fontSize:12,padding:"7px 12px",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer"};
  const tabs = ["overview","students","accounts"];
  return(
    <Wrap>
      <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"16px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#fff",fontWeight:900,fontSize:15}}> Admin Dashboard</div>
          <button onClick={onLogout} style={{...T,background:"rgba(255,255,255,.15)",color:"#fff",fontSize:11}}>Logout</button>
        </div>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{...T,background:tab===t?"#fff":"rgba(255,255,255,.15)",color:tab===t?"#1E3A6E":"#fff",fontSize:11,textTransform:"capitalize"}}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:16}}>
        {tab==="overview"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {[["","Total Users",users.length],["","Students",students.length],["","Parents",parents.length]].map(([ic,lb,v],i)=>(
                <div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:22}}>{ic}</div>
                  <div style={{fontSize:18,fontWeight:900,color:"#1E3A6E"}}>{v}</div>
                  <div style={{fontSize:10,color:"#64748B"}}>{lb}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>Recent Students</div>
              {students.slice(0,8).map((s,i)=>{
                const prog = getProgress(s.id,"P3","English");
                const pct = prog.history?.length ? Math.round(prog.history.reduce((a,h)=>a+h.totalPct,0)/prog.history.length) : null;
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<7?"1px solid #F1F5F9":"none"}}>
                    <div style={{width:32,height:32,borderRadius:9,background:s.color||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{s.avatar||""}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700}}>{s.name}</div>
                      <div style={{fontSize:10,color:"#64748B"}}>{s.school||"-"} . {s.grade}</div>
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:pct>=70?"#10B981":pct?"#F59E0B":"#94A3B8"}}>{pct!=null?pct+"%":"-"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab==="students"&&(
          <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>All Students ({students.length})</div>
            {students.map((s,i)=>{
              const prog = getProgress(s.id,"P3","English");
              const sessions = prog.history?.length||0;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<students.length-1?"1px solid #F1F5F9":"none"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:s.color||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{s.avatar||""}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700}}>{s.name} <span style={{color:"#94A3B8",fontWeight:400}}>({s.id})</span></div>
                    <div style={{fontSize:10,color:"#64748B"}}>{s.grade} . {sessions} sessions . {s.school||"-"}</div>
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
                <div style={{fontWeight:800,fontSize:13,color,marginBottom:8}}>{title} ({list.length})</div>
                {list.map((u,i)=>(
                  <div key={i} style={{fontSize:12,padding:"4px 0",borderBottom:i<list.length-1?"1px solid #F8FAFC":"none",color:"#0F172A"}}>
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
    const word = m.correctAnswer!==undefined && m.options ? m.options[m.correctAnswer]
               : (typeof m.correctAnswer==="string" ? m.correctAnswer : null);
    if(!word) return;
    const clean=String(word).replace(/[.,!?'"]/g,"");
    if(seen.has(clean)) return;
    const isZh=/[\u4e00-\u9fff]/.test(clean);
    if(isZh){
      const info=ZH_CHAR_DICT[clean]||{};
      const meaning=info.meaning||(m.meaning?String(m.meaning).replace(/^[^=]*=\s*/,""):null);
      if(!meaning) return;
      seen.add(clean);
      out.push({word:clean,lang:"zh",meaning,pinyin:info.pinyin||m.pinyin||null,
        syn:info.syn||null,ant:info.ant||null,verified:!!info.meaning});
    } else {
      const key=clean.toLowerCase();
      const def=WORD_DICT[key]; if(!def) return;
      const sa=SYN_ANT[key]||{};
      seen.add(clean);
      out.push({word:clean,lang:"en",meaning:def,pinyin:null,
        syn:sa.syn?sa.syn.join(", "):null,ant:sa.ant?sa.ant.join(", "):null,verified:true});
    }
  });
  return out;
}

function VocabQuizTab({mistakes}){
  const entries = React.useMemo(()=>buildVocabEntries(mistakes),[mistakes]);
  const [order,setOrder]   = React.useState(()=>seededShuffle(entries.map((_,i)=>i),Date.now()%100000));
  const [idx,setIdx]       = React.useState(0);
  const [picked,setPicked] = React.useState(null);
  const [score,setScore]   = React.useState({right:0,wrong:0});
  const [done,setDone]     = React.useState(false);

  if(entries.length<2) return(
    <div style={{textAlign:"center",padding:"50px 20px",color:"#64748B"}}>
      <div style={{fontSize:44,marginBottom:12}}></div>
      <div style={{fontSize:14,fontWeight:800,color:"#0F172A",marginBottom:6}}>Not enough words yet</div>
      <div style={{fontSize:12}}>Wrong vocabulary words from English & Chinese will collect here for quizzing.</div>
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
      <div style={{fontSize:18,fontWeight:900,color:"#0F172A",margin:"10px 0 4px"}}>
        {score.right} / {score.right+score.wrong} correct
      </div>
      <div style={{fontSize:12,color:"#64748B",marginBottom:16}}>
         Parents: ask your child to say each word's meaning out loud, then retry!
      </div>
      <button onClick={()=>{setOrder(seededShuffle(entries.map((_,i)=>i),Date.now()%100000));
          setIdx(0);setPicked(null);setScore({right:0,wrong:0});setDone(false);}}
        style={{background:"#0F172A",color:"#fff",border:"none",borderRadius:12,
          padding:"12px 28px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
         Quiz Again (reshuffled)
      </button>
    </div>
  );

  return(
    <div style={{padding:"4px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:12,fontWeight:700,color:"#64748B"}}>Word {idx+1} / {order.length}</span>
        <span style={{fontSize:12,fontWeight:800}}>
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
        {cur.pinyin&&<div style={{fontSize:13,color:"#2563EB",fontWeight:700,marginTop:4}}>{cur.pinyin}</div>}
        {!cur.verified&&<div style={{fontSize:10,color:"#92400E",marginTop:4}}> </div>}
        <div style={{fontSize:12,color:"#64748B",marginTop:8}}>What does this word mean?</div>
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
              fontSize:13,fontWeight:600,color:"#0F172A"}}>
            {o.meaning}
          </div>
        );
      })}

      {/* After pick: syn/ant reinforcement */}
      {picked!==null&&(
        <div className="gm-slideUp" style={{background:"#F8FAFC",border:"1.5px solid #CBD5E1",
          borderRadius:12,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:800,color:"#0F172A",marginBottom:4}}>
            {cur.word} = {cur.meaning}
          </div>
          {cur.syn&&<div style={{fontSize:11,color:"#0D9488",fontWeight:700}}>= same: {cur.syn}</div>}
          {cur.ant&&<div style={{fontSize:11,color:"#DC2626",fontWeight:700}}>!= opposite: {cur.ant}</div>}
        </div>
      )}

      {picked!==null&&(
        <button onClick={next} style={{width:"100%",background:"#0F172A",color:"#fff",
          border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
          {idx+1>=order.length?"Finish ":"Next Word "}
        </button>
      )}
    </div>
  );
}

function MistakesTab({mistakes, onBack, vocabBook=[]}){
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
    <div style={{fontFamily:"Nunito,sans-serif",paddingBottom:80}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#7C2D12,#DC2626)",padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:12,
          fontWeight:700,marginBottom:10}}> Back</button>
        <div style={{color:"#fff",fontSize:18,fontWeight:900}}> Mistakes Log</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>
          {filtered.length} wrong answer{filtered.length!==1?"s":""}
          {mistakes.length>0&&` . ${Math.round((1-filtered.length/Math.max(mistakes.length,1))*100)}% accuracy`}
        </div>
      </div>

      {/* Sub-tabs: mistakes list / vocab quiz */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2E8F0"}}>
        {[["list"," Mistakes"],["quiz"," Vocab Quiz"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"12px 8px",
              fontSize:13,fontWeight:view===v?800:500,color:view===v?"#7C2D12":"#64748B",
              borderBottom:view===v?"2.5px solid #DC2626":"2.5px solid transparent"}}>{l}</button>
        ))}
      </div>
      {view==="quiz"&&<div style={{padding:"12px 16px"}}><VocabQuizTab mistakes={mistakes}/></div>}
      {view==="list"&&<>
      {/* Filter pills */}
      <div style={{display:"flex",gap:8,padding:"12px 16px",background:"#fff",
        borderBottom:"1px solid #E2E8F0"}}>
        {[["all","All"],["today","Today"],["week","This Week"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{background:filter===v?"#DC2626":"#F1F5F9",color:filter===v?"#fff":"#64748B",
              border:"none",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
            {l}
          </button>
        ))}
      </div>

      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"60px 24px",color:"#64748B"}}>
          <div style={{fontSize:48,marginBottom:12}}></div>
          <div style={{fontSize:16,fontWeight:800,color:"#0F172A",marginBottom:6}}>
            No mistakes {filter==="today"?"today":filter==="week"?"this week":"yet"}!
          </div>
          <div style={{fontSize:13}}>Keep up the great work!</div>
        </div>
      ):(
        <div style={{padding:"12px 16px"}}>
          {/* Topic summary bar */}
          <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:14,
            boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:11,fontWeight:800,color:"#64748B",marginBottom:10,
              textTransform:"uppercase",letterSpacing:.8}}>Weak Topics</div>
            {Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length).map(([topic,items])=>{
              const col = topicColors[topic]||"#64748B";
              const pct = Math.round(items.length/filtered.length*100);
              return(
                <div key={topic} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:700,color:col}}>{topic}</span>
                    <span style={{fontSize:11,color:"#64748B"}}>{items.length} mistake{items.length>1?"s":""}</span>
                  </div>
                  <div style={{background:"#F1F5F9",borderRadius:6,height:6}}>
                    <div style={{background:col,borderRadius:6,height:6,width:pct+"%",transition:"width .4s"}}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mistake list */}
          {filtered.slice().reverse().map((m,i)=>{
            const col = topicColors[m.topic||m.sectionType]||"#64748B";
            const isOpen = expanded===i;
            return(
              <div key={i} style={{background:"#fff",borderRadius:16,marginBottom:10,
                boxShadow:"0 2px 8px rgba(0,0,0,.06)",overflow:"hidden",
                border:"1.5px solid "+(isOpen?"#EF4444":"#E2E8F0")}}>
                <button onClick={()=>setExpanded(isOpen?null:i)}
                  style={{width:"100%",background:"none",border:"none",cursor:"pointer",
                    padding:"13px 16px",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:32,height:32,borderRadius:9,background:col+"18",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                    {m.sectionType==="MCQ"?"":m.sectionType==="ShortAnswer"?"":
                     m.sectionType==="ProblemSum"?"":""}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#0F172A",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {m.q||m.id||"Question"}
                    </div>
                    <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
                      <span style={{background:col+"18",color:col,fontSize:10,fontWeight:700,
                        padding:"2px 7px",borderRadius:7}}>{m.topic||m.sectionType}</span>
                      <span style={{fontSize:10,color:"#94A3B8"}}>{m.date}</span>
                      {m.solvedAfterHint&&(
                        <span style={{background:"#FEF3C7",color:"#92400E",fontSize:10,fontWeight:700,
                          padding:"2px 7px",borderRadius:7}}>
                           Solved on try {m.attempts||2}
                        </span>
                      )}
                      {!m.solvedAfterHint&&m.attempts===0&&(
                        <span style={{background:"#FEE2E2",color:"#991B1B",fontSize:10,fontWeight:700,
                          padding:"2px 7px",borderRadius:7}}>
                           Not solved
                        </span>
                      )}
                    </div>
                  </div>
                  <span style={{color:"#94A3B8",fontSize:16,
                    transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}>{">"}</span>
                </button>

                {isOpen&&(
                  <div style={{padding:"0 16px 16px"}}>
                    {/* Question text */}
                    {m.q&&(
                      <div style={{background:"#F8FAFC",borderRadius:12,padding:"12px 14px",
                        marginBottom:10,fontSize:13,fontWeight:600,color:"#0F172A",lineHeight:1.7}}>
                        {m.q}
                      </div>
                    )}

                    {/* Your answer vs correct */}
                    <div style={{display:"flex",gap:8,marginBottom:10}}>
                      <div style={{flex:1,background:"#FEE2E2",borderRadius:10,padding:"9px 12px"}}>
                        <div style={{fontSize:10,fontWeight:700,color:"#991B1B",marginBottom:3}}>YOUR ANSWER</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#7F1D1D"}}>
                          {m.yourAnswer||"-"}
                        </div>
                      </div>
                      <div style={{flex:1,background:"#D1FAE5",borderRadius:10,padding:"9px 12px"}}>
                        <div style={{fontSize:10,fontWeight:700,color:"#065F46",marginBottom:3}}>CORRECT</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#064E3B"}}>
                          {m.correctAnswer||m.answer||"-"}
                        </div>
                      </div>
                    </div>

                    {/* Solution if available */}
                    {m.solution&&(
                      <div style={{background:"#F0FDF4",border:"1.5px solid #10B981",
                        borderRadius:14,padding:"12px 14px"}}>
                        <div style={{fontSize:11,fontWeight:800,color:"#065F46",marginBottom:8,
                          textTransform:"uppercase",letterSpacing:.8}}>
                           How to solve: {m.solution.method}
                        </div>
                        {(m.solution.steps||[]).slice(0,4).map((step,si)=>(
                          <div key={si} style={{display:"flex",gap:8,marginBottom:4,alignItems:"flex-start"}}>
                            <span style={{background:"#10B981",color:"#fff",borderRadius:"50%",
                              minWidth:18,height:18,fontSize:10,fontWeight:800,display:"flex",
                              alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                              {si+1}
                            </span>
                            <div style={{fontSize:12,color:"#0F172A",lineHeight:1.6,
                              fontFamily:/[=+\-x/]/.test(step)?"monospace":"inherit"}}>
                              {step}
                            </div>
                          </div>
                        ))}
                        {m.solution.tip&&(
                          <div style={{background:"#FEF3C7",borderRadius:9,padding:"7px 10px",
                            marginTop:8,fontSize:11,color:"#92400E",fontWeight:700}}>
                             {m.solution.tip.replace(" ","")}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Chinese meaning */}
                    {m.meaning&&(
                      <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:12,
                        padding:"10px 12px",marginTop:8}}>
                        <div style={{fontSize:10,fontWeight:800,color:"#1D4ED8",marginBottom:3,
                          textTransform:"uppercase",letterSpacing:.7}}> English Meaning</div>
                        <div style={{fontSize:13,fontWeight:600,color:"#1E40AF"}}>{m.meaning}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
    <div style={{fontFamily:"Nunito,sans-serif",paddingBottom:80}}>
      <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:12,
          fontWeight:700,marginBottom:10}}> Back</button>
        <div style={{color:"#fff",fontSize:18,fontWeight:900}}> Review & Analysis</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>
          {mistakes.length} total mistakes recorded
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2E8F0"}}>
        {[["trend"," Trend"],["weak"," Weak Topics"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",
              padding:"13px 8px",fontSize:13,fontWeight:view===v?800:500,
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
              <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:14}}>
                Mistakes Per Session
              </div>
              {trendData.length===0?(
                <div style={{textAlign:"center",color:"#94A3B8",padding:"24px",fontSize:13}}>
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
                        <div style={{fontSize:9,fontWeight:700,color:"#64748B"}}>
                          {d.mistakes}
                        </div>
                        <div style={{width:"100%",height:h,borderRadius:"4px 4px 0 0",
                          background:isLast?"#EF4444":"#BFDBFE",
                          transition:"height .4s"}}/>
                        <div style={{fontSize:8,color:"#94A3B8",textAlign:"center",
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
                    padding:"8px 12px",marginTop:10,fontSize:12,fontWeight:700,
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
                <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:12}}>
                   Last Mistakes to Revisit
                </div>
                {mistakes.slice(-3).reverse().map((m,i)=>{
                  const col = topicColors[m.topic||m.sectionType]||"#64748B";
                  return(
                    <div key={i} style={{borderBottom:i<2?"1px solid #F1F5F9":"none",
                      paddingBottom:i<2?12:0,marginBottom:i<2?12:0}}>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <span style={{background:col+"18",borderRadius:8,padding:"4px 8px",
                          fontSize:10,fontWeight:700,color:col,flexShrink:0}}>
                          {m.topic||m.sectionType}
                        </span>
                        <div style={{fontSize:12,color:"#0F172A",fontWeight:600,lineHeight:1.5}}>
                          {(m.q||m.id||"-").slice(0,80)}{(m.q||"").length>80?"...":""}
                        </div>
                      </div>
                      {m.solution&&(
                        <div style={{background:"#F0FDF4",borderRadius:10,padding:"8px 10px",
                          marginTop:8,fontSize:11,color:"#065F46",fontWeight:600}}>
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
            <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:14}}>
              Topics That Need More Practice
            </div>
            {topTopics.length===0?(
              <div style={{textAlign:"center",color:"#94A3B8",padding:"24px",fontSize:13}}>
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
                      <span style={{fontSize:12,fontWeight:800,color:col}}>{topic}</span>
                      <span style={{fontSize:10,color:"#94A3B8",marginLeft:6}}>{priority}</span>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:"#64748B"}}>
                      {count} mistake{count>1?"s":""}
                    </span>
                  </div>
                  <div style={{background:"#F1F5F9",borderRadius:8,height:8}}>
                    <div style={{background:col,borderRadius:8,height:8,
                      width:pct+"%",transition:"width .5s"}}/>
                  </div>
                  <div style={{fontSize:10,color:"#94A3B8",marginTop:3}}>
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


