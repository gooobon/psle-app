"use client";
import { mockSchoolLabel } from "@/lib/attemptMeta";
import React from 'react';
import { useState, useRef, useEffect } from "react";
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
import { STORE, persistUsers, allUsers, mirrorServerUser, ADMIN_USER, adminLogin, adminSessionValid, getProgress, setProgress } from "./appStore";
import dynamic from "next/dynamic";
import { CS as C } from "@/lib/uiShared";
import { getSchoolProfile } from "@/lib/dataEngineLite";
import { prefetchState } from "@/lib/clewquest/client";

// Everything that needs the practice / paper / dictionary banks lives in PracticeApp (one lazy chunk).
// It is only fetched when a student leaves the islands, or a parent / admin signs in.
const PracticeGate = dynamic(() => import("./PracticeApp").then(m => m.PracticeEntry), { ssr: false, loading: () => <BootLoading/> });
const CQ_ON = clewquestEnabled() && SERVER_AUTH;
const SHOW_DEMO = process.env.NEXT_PUBLIC_SHOW_DEMO === "true"; // the "Try Demo Account" box is gone; seed the demo users only when this is on
const GOOGLE_LOGIN = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED === "true"; // OAuth provider not configured yet: default off

// Remembers the email a parent just signed up with, so the confirm-link landing can prefill the login if auto-login is not possible.
const PENDING_PARENT_EMAIL_KEY = "clewquest_pending_parent_email";

function AuthScreen({onLogin, onSignup, confirmInfo, resetCode, onResetDone, onParentSignedUp}){
  const [mode, setMode] = useState(confirmInfo?"login":"landing");   // landing | login | signup_parent | signup_legacy_student
  function pictureDone(profile){
    const user = mirrorServerUser(profile);
    importLocalOnce(user.id); syncLocalWrongAnswersOnce(user.id); // same fire-and-forget copies as the password login
    onLogin("student", user);
  }
  if(resetCode) return <SetNewPassword code={resetCode} onDone={()=>{ onResetDone(); setMode("login"); }}/>;
  if(mode==="landing") return <PreLoginLanding onLogin={()=>setMode("login")} onSignup={()=>setMode("signup_parent")}/>;
  if(mode==="signup_parent" && SERVER_AUTH) return <SignupParentStep1 onLoginInstead={()=>setMode("login")} onSignedIn={(p)=>onParentSignedUp(p)}/>;
  return(
    <LoginFrame onBack={()=>setMode("landing")}>
      {mode==="login" && <LoginForm onLogin={onLogin} onPictureDone={pictureDone} onGoSignup={r=>setMode(r)} confirmInfo={confirmInfo}/>}
      {mode==="signup_parent"  && <SignupParentForm  onSignup={onSignup} onBack={()=>setMode("landing")}/>}
    </LoginFrame>
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
  const styleColors = {challenging:"#B3261E", advanced:T.primary, standard:"#1F3F95"};
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
  const styleColors = {challenging:"#B3261E", advanced:T.primary, standard:"#1F3F95"};
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
    <div style={{position:"relative",marginBottom:0}}> <div onClick={()=>setOpen(o=>!o)} style={{background:"#fff",border:`1.5px solid ${open?C.navy:C.border}`,borderRadius:12,padding:"12px 14px",fontSize:"calc(var(--fs) * 1.000)",fontWeight:hasVal?700:400,color:hasVal?"#1B2340":C.muted,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border 0.15s",boxShadow:open?"0 0 0 3px rgba(30,58,110,0.1)":"none"}}>
        <span style={{flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{displayVal}</span>
        <span style={{fontSize:"calc(var(--fs) * 0.857)",color:C.muted,marginLeft:8,flexShrink:0,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}></span>
      </div> {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",border:`1.5px solid ${C.navy}`,borderRadius:14,boxShadow:"0 8px 32px rgba(15,23,42,0.18)",zIndex:999,overflow:"hidden"}}> <div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,background:"#FBF6EA"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"7px 12px"}}>
              <span style={{fontSize:"calc(var(--fs) * 1.000)",color:C.muted}}></span>
              <input
                autoFocus
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search school name..."
                style={{border:"none",outline:"none",fontSize:"calc(var(--fs) * 0.929)",flex:1,fontFamily:"'Times New Roman', Times, serif",color:"#1B2340"}}
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
                  style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:isSelected?"#FBF6EA":"#fff",borderBottom:`1px solid ${C.border}`,transition:"background 0.1s"}}
                  onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.background="#FBF6EA"; }}
                  onMouseLeave={e=>{ if(!isSelected) e.currentTarget.style.background="#fff"; }}
                >
                  <span style={{fontSize:"calc(var(--fs) * 1.143)",flexShrink:0}}>{isOther?"":""}</span>
                  <span style={{flex:1,fontSize:"calc(var(--fs) * 0.929)",fontWeight:isSelected?800:500,color:isSelected?C.navy:"#1B2340"}}>{school}</span>
                  {styleTag&&<span style={{fontSize:"calc(var(--fs) * 0.857)",flexShrink:0}}>{styleTag}</span>}
                  {isSelected&&<span style={{fontSize:"calc(var(--fs) * 1.000)",flexShrink:0}}></span>}
                </div>
              );
            })}
          </div> <div style={{padding:"8px 14px",background:"#FBF6EA",borderTop:`1px solid ${C.border}`,display:"flex",gap:12,fontSize:"calc(var(--fs) * 0.780)",color:C.muted}}>
            <span> Challenging</span><span> Advanced</span><span> Standard</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Server login (flag on). Returns the local user record on success, or null.
async function serverLogin(role, idOrEmail, pw){
  if(role==="parent"){
    const r = await serverPost("/api/auth/login",{email:idOrEmail,password:pw});
    if(!r.ok) return r.error==="email not confirmed" ? {needsConfirmation:true} : null;
    const kids = (r.children||[]).map(c=>mirrorServerUser(c));
    return mirrorServerUser(r.profile,{childIds:kids.map(k=>k.id)});
  }
  const username = idOrEmail.toLowerCase();
  let r = await serverPost("/api/auth/student/login",{username,password:pw});
  if(!r.ok){
    // Legacy path: no server account yet, but the local record matches -> create it with the same password.
    const local = STORE.users[username];
    if(local && local.role==="student" && local.password===pw){
      r = await serverPost("/api/auth/legacy-migrate",{username,password:pw,name:local.name,grade:local.grade,school:local.school});
    }
    if(!r.ok) return null;
  }
  const user = mirrorServerUser(r.profile);
  importLocalOnce(user.id); // fire-and-forget; never blocks or alters local data
  syncLocalWrongAnswersOnce(user.id); // flagged, copy-only, idempotent
  return user;
}

// Server mode: an existing local parent (no email) adds an email + password to create a server account.
// Nothing local is changed or deleted. With "Confirm email" ON they must click the emailed link, then log in.
function LegacyParentEmailPrompt({local, onBack}){
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [err,setErr]=useState(""); const [done,setDone]=useState(false); const [busy,setBusy]=useState(false);
  async function submit(){
    setErr("");
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setErr("Please enter a valid email.");
    if(pw.length<8) return setErr("Password must be at least 8 characters.");
    setBusy(true);
    const r = await serverPost("/api/auth/parent/signup",{name:local.name||"Parent",email:email.trim(),password:pw});
    setBusy(false);
    if(!r.ok) return setErr(r.error||"Could not create the account.");
    setDone(true);
  }
  if(done) return(<div>
    <h1 style={{margin:"0 0 10px",fontWeight:800,fontSize:24,color:T.ink,fontFamily:FONT}}>Check your email</h1>
    <div style={{...helperStyle,marginBottom:18}}>We sent a confirmation link to <b>{email.trim()}</b>. Open it, then log in here with your email and the new password. After logging in you add your child and pick their pictures.</div>
    <button onClick={onBack} style={mainBtn(false)}>Back to login</button></div>);
  return(<div>
    <h1 style={{margin:"0 0 6px",fontWeight:800,fontSize:24,color:T.ink,fontFamily:FONT}}>Add your email</h1>
    <div style={{...helperStyle,marginBottom:18}}>Parent accounts now use an email so you can see progress from any device. Your existing data on this device is kept.</div>
    <Field id="lp-email" label="Email"><input id="lp-email" style={inputStyle} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoCapitalize="none" autoCorrect="off" spellCheck={false}/></Field>
    <Field id="lp-pw" label="New password (min 8 chars)"><input id="lp-pw" style={inputStyle} type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Choose a password" onKeyDown={e=>{ if(e.key==="Enter") submit(); }}/></Field>
    {err&&<ErrorText>{err}</ErrorText>}
    <button onClick={busy?undefined:submit} disabled={busy} style={mainBtn(busy)}>{busy?"Creating...":"Create server account"}</button>
    <div style={{textAlign:"center",marginTop:12}}><button onClick={onBack} style={{...linkBtn,color:T.muted,fontSize:14}}>Cancel</button></div>
  </div>);
}

function LoginForm({onLogin, onPictureDone, onGoSignup, confirmInfo}){
  const [role, setRole] = useState(confirmInfo ? "parent" : "student");
  const [id,   setId]   = useState(confirmInfo?.email || "");
  const [pw,   setPw]   = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err,  setErr]  = useState("");
  const [legacyParent, setLegacyParent] = useState(null);
  const [usePw, setUsePw] = useState(!CQ_ON); // student tab: pictures when ClewQuest is on, else (or on request) a password
  const [forgot, setForgot] = useState(false);

  if(SHOW_DEMO && !STORE.users["demo_student"]){
    STORE.users["demo_student"] = {id:"demo_student",password:"demo123",name:"Mei Lin",grade:"P3",role:"student",avatar:"",color:"#1F3F95"};
    STORE.users["demo_parent"]  = {id:"demo_parent", password:"demo456",name:"Mrs Lee", role:"parent",childIds:["demo_student"]};
  }

  if(forgot) return <ForgotPassword initialEmail={id.includes("@")?id:""} onBack={()=>setForgot(false)}/>;
  if(legacyParent) return <LegacyParentEmailPrompt local={legacyParent} onBack={()=>setLegacyParent(null)}/>;

  async function handleLogin(){
    setErr("");
    if(id.trim().toLowerCase()==="admin" && await adminLogin(pw)){ onLogin("admin", ADMIN_USER); return; }
    if(SERVER_AUTH && !id.trim().startsWith("demo_")){
      // Legacy parent (local account without an email): ask for an email, then create the server account.
      if(role==="parent" && !id.includes("@")){
        const lp = STORE.users[id.trim()];
        if(lp && lp.role==="parent" && lp.password===pw){ setLegacyParent(lp); return; }
      }
      const r = await serverLogin(role, id.trim(), pw);
      if(r && r.needsConfirmation){ setErr("Please confirm your email first: open the link we sent you, then log in."); return; }
      if(r) { onLogin(role, r); return; }
      setErr(role==="parent" ? "Wrong email or password." : id.includes("@") ? "Parents: please use the Parent tab" : "Wrong ID or password. Please check and try again.");
      return;
    }
    const user = allUsers().find(u=>u.id===id.trim()&&u.password===pw&&u.role===role);
    if(user){ onLogin(role, user); return; }
    setErr(role==="student" && id.includes("@") ? "Parents: please use the Parent tab" : "Wrong ID or password. Please check and try again.");
  }

  const parentTab = role==="parent";
  const canPw = !!id.trim() && !!pw;
  return(
    <div data-testid="login-form">
      <h1 style={{margin:"0 0 14px",fontWeight:800,fontSize:26,color:T.ink,fontFamily:FONT}}>Log in</h1>
      {confirmInfo&&<div data-testid="email-confirmed-note" style={{background:"#EEF3E2",borderRadius:10,padding:"9px 13px",marginBottom:14,fontSize:14,color:T.successText,fontWeight:700}}>Email confirmed. Please log in.</div>}
      <div style={{marginBottom:18}}><Segmented testId="login-role" value={role} onChange={r=>{setRole(r);setErr("");}} options={[["student","Student"],["parent","Parent"]]}/></div>
      {!parentTab && CQ_ON && !usePw && <PictureLogin onDone={onPictureDone} onUsePassword={()=>setUsePw(true)}/>}
      {(parentTab || usePw || !CQ_ON) && (<>
        <Field id="lg-id" label={parentTab?"Email":"Username"}>
          <input id="lg-id" data-testid="login-id" style={inputStyle} value={id} onChange={e=>setId(e.target.value)} placeholder={parentTab?"you@example.com":"Your username"} autoCapitalize="none" autoCorrect="off" spellCheck={false}/>
        </Field>
        <Field id="lg-pw" label="Password">
          <div style={{position:"relative"}}>
            <input id="lg-pw" data-testid="login-password" style={{...inputStyle,paddingRight:64}} type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Your password" onKeyDown={e=>{ if(e.key==="Enter") handleLogin(); }}/>
            <button type="button" onClick={()=>setShowPw(p=>!p)} style={{...linkBtn,position:"absolute",right:12,top:14,color:T.primary,fontSize:13}}>{showPw?"Hide":"Show"}</button>
          </div>
        </Field>
        {parentTab && SERVER_AUTH && <div style={{textAlign:"right",marginTop:-6,marginBottom:12}}><button type="button" data-testid="forgot-link" onClick={()=>setForgot(true)} style={{...linkBtn,color:T.primary,fontSize:14}}>Forgot password?</button></div>}
        {err&&<ErrorText testId="login-error">{err}</ErrorText>}
        <button data-testid="login-submit" disabled={!canPw} onClick={handleLogin} style={mainBtn(!canPw)}>Log in</button>
        {parentTab && GOOGLE_LOGIN && (<>
          <div style={{textAlign:"center",color:T.muted,margin:"12px 0"}}>or</div>
          <button data-testid="google-login" type="button" onClick={()=>setErr("Google login is not set up yet.")} style={secondaryBtn}>Continue with Google</button>
        </>)}
        {!parentTab && CQ_ON && <div style={{textAlign:"center",marginTop:14}}><button type="button" onClick={()=>{setUsePw(false);setErr("");}} style={{...linkBtn,color:T.muted,fontSize:13,fontWeight:500,textDecoration:"underline"}}>Use my pictures</button></div>}
      </>)}
      {parentTab ? (
        <div style={{marginTop:22,textAlign:"center",fontSize:14,color:T.ink}}>
          New here? <button type="button" data-testid="login-create-family" onClick={()=>onGoSignup("signup_parent")} style={{...linkBtn,color:T.cta,fontSize:14}}>Create a family account</button>
          <div style={{color:T.muted,marginTop:8,fontSize:13}}>Children log in on the Student tab with their pictures.</div>
        </div>
      ) : null}
    </div>
  );
}

function SignupParentServerForm({onLogin, onBack}){
  const [form, setForm] = useState({name:"",email:"",password:"",confirm:""});
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  function f(k,v){ setForm(p=>({...p,[k]:v})); }
  async function submit(){
    setErr(""); setInfo("");
    if(!form.name.trim()) return setErr("Please enter your name.");
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) return setErr("Please enter a valid email.");
    if(form.password.length<8) return setErr("Password must be at least 8 characters.");
    if(form.password!==form.confirm) return setErr("Passwords do not match.");
    setBusy(true);
    const r = await serverPost("/api/auth/parent/signup",{name:form.name.trim(),email:form.email.trim(),password:form.password});
    setBusy(false);
    if(!r.ok) return setErr(r.error||"Sign-up failed.");
    if(r.needsConfirmation){ try{ localStorage.setItem(PENDING_PARENT_EMAIL_KEY, form.email.trim().toLowerCase()); }catch{} return setInfo("Check your email to confirm your address, then log in."); }
    onLogin("parent", mirrorServerUser(r.profile,{childIds:[]}));
  }
  const pf=(id,label,k,type,ph,onEnter)=>(<Field id={id} label={label}><input id={id} style={inputStyle} type={type} value={form[k]} onChange={e=>f(k,e.target.value)} placeholder={ph} autoCapitalize="none" autoCorrect="off" spellCheck={false} onKeyDown={onEnter?(e=>{ if(e.key==="Enter") onEnter(); }):undefined}/></Field>);
  return(
    <div>
      <button onClick={onBack} style={{...linkBtn,color:T.primary,fontSize:14,marginBottom:16}}>Back to login</button>
      <h1 style={{margin:"0 0 4px",fontWeight:800,fontSize:26,color:T.ink,fontFamily:FONT}}>Create Parent Account</h1>
      <div style={{...helperStyle,marginBottom:18}}>After signing up you can add your child's account from the dashboard.</div>
      {pf("sp-name","Your name","name","text","e.g. Mrs Lee")}
      {pf("sp-email","Email","email","email","you@example.com")}
      {pf("sp-pw","Password (min 8 chars)","password","password","Create a password")}
      {pf("sp-confirm","Confirm password","confirm","password","Re-enter password",submit)}
      {err&&<ErrorText>{err}</ErrorText>}
      {info&&<div style={{background:T.tile,border:`1.5px solid ${T.success}`,borderRadius:12,padding:"9px 13px",marginBottom:12,fontSize:14,color:T.successText,fontWeight:700}}>{info}</div>}
      <button onClick={busy?undefined:submit} disabled={busy} style={mainBtn(busy)}>{busy?"Creating...":"Create Parent Account"}</button>
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
    setLinkMsg("Linked: "+child.name+" ("+child.grade+")");
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

  const pf=(id,label,k,type,ph,tx)=>(<Field id={id} label={label}><input id={id} style={inputStyle} type={type} value={form[k]} onChange={e=>f(k,tx?tx(e.target.value):e.target.value)} placeholder={ph} autoCapitalize="none" autoCorrect="off" spellCheck={false}/></Field>);
  return(
    <div data-testid="signup-local-form">
      <button onClick={onBack} style={{...linkBtn,color:T.primary,fontSize:14,marginBottom:16}}>Back to login</button>
      <h1 style={{margin:"0 0 4px",fontWeight:800,fontSize:26,color:T.ink,fontFamily:FONT}}>Create Parent Account</h1>
      <div style={{...helperStyle,marginBottom:18}}>Monitor your child's progress</div>
      {pf("sl-name","Parent name","name","text","e.g. Mrs Lee")}
      {pf("sl-id","Parent ID (for login)","id","text","e.g. mrs_lee_parent",v=>v.toLowerCase().replace(/\s/g,"_"))}
      <Field id="sl-pw" label="Password (min 6 chars)">
        <div style={{position:"relative"}}>
          <input id="sl-pw" style={{...inputStyle,paddingRight:64}} type={showPw?"text":"password"} value={form.password} onChange={e=>f("password",e.target.value)} placeholder="Create a password"/>
          <button type="button" onClick={()=>setShowPw(p=>!p)} style={{...linkBtn,position:"absolute",right:12,top:14,color:T.primary,fontSize:13}}>{showPw?"Hide":"Show"}</button>
        </div>
      </Field>
      {pf("sl-confirm","Confirm password","confirm","password","Re-enter password")}
      <div style={{background:T.tile,border:`1.5px solid ${T.border}`,borderRadius:20,padding:14,marginBottom:16,marginTop:4}}>
        <div style={{fontWeight:800,fontSize:14,color:T.ink,marginBottom:6}}>Link student accounts</div>
        <div style={{...helperStyle,marginBottom:10}}>Ask your child to share their Student ID, then add it here. You can add multiple children.</div>
        <div style={{display:"flex",gap:8,marginBottom:6}}>
          <input value={childInput} onChange={e=>setChildInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") addChild();}} placeholder="Enter student ID..." style={{...inputStyle,flex:1,width:"auto"}}/>
          <button onClick={addChild} style={{...secondaryBtn,width:"auto",height:46,padding:"0 18px",fontSize:15}}>Add</button>
        </div>
        {linkMsg&&<div style={{fontSize:13,color:linkMsg.startsWith("Linked")?T.successText:T.error,fontWeight:600,marginBottom:8}}>{linkMsg}</div>}
        {linkedIds.length===0&&<div style={helperStyle}>No children linked yet. You can also add them later.</div>}
        {linkedIds.map(cid=>{
          const ch=allUsers().find(u=>u.id===cid);
          if(!ch) return null;
          return(
            <div key={cid} style={{display:"flex",alignItems:"center",gap:8,background:"#fff",borderRadius:12,padding:"8px 12px",marginBottom:6}}>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:T.ink}}>{ch.name}</div>
                <div style={{fontSize:12,color:T.muted}}>{ch.grade} . ID: {cid}</div>
              </div>
              <button onClick={()=>removeChild(cid)} style={{...linkBtn,color:T.error,fontSize:14}}>Remove</button>
            </div>
          );
        })}
      </div>

      {err&&<ErrorText>{err}</ErrorText>}
      <button onClick={handleSubmit} style={mainBtn(false)}>Create Parent Account</button>
    </div>
  );
}


function App(){
  const [auth,    setAuth]    = useState(null);   // { role, user }
  const [tick,    setTick]    = useState(0);       // force re-render after store mutations
  const [cqOpen,  setCqOpen]  = useState(false);   // ClewQuest: a password student opened ClewQuest from the Today hub (never forced)
  
  // Data is loaded from localStorage at startup - no async needed

  function refresh(){ setTick(t=>t+1); }

  // Restore a server session after a full page load. Parent and student auth lives in
  // React state, so a reload (or the old invite-accept reload) would otherwise show
  // the login screen even though the cookie is still valid. Flag off: this call is
  // skipped and the app stays local-only. Admin restore is unchanged.
  const [sessionChecked, setSessionChecked] = useState(!SERVER_AUTH);
  const [resetCode, setResetCode] = useState("");   // password-reset link: /?reset=1&code=...
  const [onboard, setOnboard] = useState(false);     // new parent with no children: go straight to "Add your child"
  const [confirmInfo, setConfirmInfo] = useState(null); // {email}: confirm link could not auto-login -> Parent login with a note
  useEffect(()=>{
    let alive = true;
    const jobs = [];
    // Supabase confirm link lands on /?code=...: exchange it for a session so the parent opens straight into the dashboard.
    let confirmCode = ""; let confirmHash = ""; let confirmType = "";
    if(SERVER_AUTH){
      try{
        const u = new URL(window.location.href);
        confirmCode = u.searchParams.get("code") || "";
        confirmHash = u.searchParams.get("token_hash") || ""; confirmType = u.searchParams.get("type") || "";
        if(confirmHash){ u.searchParams.delete("token_hash"); u.searchParams.delete("type"); window.history.replaceState(null,"",u.pathname+(u.search||"")+u.hash); }
        if(u.searchParams.get("reset")==="1" && confirmCode){ const rc=confirmCode; confirmCode=""; u.searchParams.delete("reset"); u.searchParams.delete("code"); window.history.replaceState(null,"",u.pathname+(u.search||"")+u.hash); setResetCode(rc); }
        if(confirmCode){ u.searchParams.delete("code"); window.history.replaceState(null,"",u.pathname+(u.search||"")+u.hash); }
      }catch{}
    }
    let pending = Promise.resolve();
    if(confirmCode || confirmHash){
      pending = serverPost("/api/auth/parent/confirm",confirmHash?{tokenHash:confirmHash,type:confirmType}:{code:confirmCode}).then(r=>{
        let email = ""; try{ email = localStorage.getItem(PENDING_PARENT_EMAIL_KEY) || ""; }catch{}
        if(!alive) return;
        if(r && r.ok && r.profile){
          try{ localStorage.removeItem(PENDING_PARENT_EMAIL_KEY); }catch{}
          const kids = (r.children||[]).map(c=>mirrorServerUser(c));
          const user = mirrorServerUser(r.profile,{childIds:kids.map(k=>k.id)});
          setAuth(a=>a||{role:"parent",user});
          if(!kids.length) setOnboard(true);
        } else setConfirmInfo({email});
      });
    }
    jobs.push(adminSessionValid().then(ok=>{ if(alive && ok){ setAuth(a=>a||{role:"admin",user:ADMIN_USER}); setSessionChecked(true); } }));
    if(SERVER_AUTH && CQ_ON && !confirmCode && !confirmHash) prefetchState(); // island state in parallel with the session check (a 401 is ignored)
    if(SERVER_AUTH){
      jobs.push(pending.then(()=>serverGet("/api/auth/me")).then(r=>{
        if(!alive || !r || !r.ok || !r.profile) return;
        const kids = (r.children||[]).map(c=>mirrorServerUser(c));
        const user = mirrorServerUser(r.profile, r.profile.role==="parent" ? {childIds:kids.map(k=>k.id)} : undefined);
        if(r.profile.role==="student"){ importLocalOnce(user.id); syncLocalWrongAnswersOnce(user.id); }
        setAuth(a=>a||{role:r.profile.role, user});
        setSessionChecked(true); // a valid session is enough: do not also wait for the admin probe
      }));
    }
    Promise.all(jobs).finally(()=>{ if(alive) setSessionChecked(true); });
    return ()=>{ alive = false; };
  },[]);

  function handleSignup(role, userData){
    STORE.users[userData.id] = {...userData, role};
    persistUsers();
    setAuth({role, user:userData});
  }
  function handleLogin(role, user){ 
    setAuth({role, user});
    if(role==="parent" && confirmInfo && !(user.childIds||[]).length) setOnboard(true); // confirm link could not auto-login: after the Parent login go straight to step 2

    if(!window._GENIUS_STORE) window._GENIUS_STORE = {users:{},progress:{}};
    window._GENIUS_STORE._currentUser = user.id;
  }
  function handleLogout(){
    if(auth && auth.role==="admin") fetch("/api/admin/logout",{method:"POST",credentials:"same-origin"}).catch(()=>{});
    if(SERVER_AUTH && auth && auth.role!=="admin") serverPost("/api/auth/logout");
    setAuth(null); setCqOpen(false);
  }

  if(!sessionChecked) return <BootLoading/>;
  if(!auth) return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} confirmInfo={confirmInfo} resetCode={resetCode} onResetDone={()=>setResetCode("")}
    onParentSignedUp={(p)=>{ handleLogin("parent", mirrorServerUser(p,{childIds:[]})); setOnboard(true); }}/>;
  if(auth.role==="parent" && onboard && !(auth.user.childIds||[]).length) return <SignupStep2
    onCreated={(c)=>{ const k=mirrorServerUser(c); if(STORE.users[auth.user.id]){ STORE.users[auth.user.id].childIds=[...new Set([...(STORE.users[auth.user.id].childIds||[]), k.id])]; persistUsers(); } }}
    onDone={()=>{ const ids=(STORE.users[auth.user.id]&&STORE.users[auth.user.id].childIds)||[]; setAuth(a=>({...a,user:{...a.user,childIds:ids}})); setOnboard(false); }}/>;

  if(auth.role==="student"){
    const user = STORE.users[auth.user.id] || auth.user;
    const practice = (extra)=><PracticeGate kind="student"
      user={user}
      onLogout={handleLogout}
      getProgress={(g,s)=>getProgress(user.id,g,s)}
      setProgress={(g,s,d)=>{ setProgress(user.id,g,s,d); refresh(); }}
      {...extra}
    />;
    // ClewQuest (flag on + a server student account): builder / four-island landing / home; practice is the existing StudentApp.
    // Only for a grade ClewQuest has a config for; otherwise the normal app. renderPractice(null, exit) opens the Today hub.
    // Picture-code students (server says so) live in ClewQuest. Password students keep the Today hub as home and may OPEN ClewQuest
    // from it (cqOpen); it is never forced on them.
    const cqOk = CQ_ON && typeof user.serverId==="string" && questGrade(user.grade);
    if(cqOk && (user.pictureCode || cqOpen)){
      return <ClewQuestStudent user={user} onLogout={handleLogout} getProgress={(g,s)=>getProgress(user.id,g,s)} onLeaveQuest={user.pictureCode ? undefined : ()=>setCqOpen(false)}
        renderPractice={(appSubject, exit)=>practice({initialSubject:appSubject||undefined, onExitToQuest:exit})}/>;
    }
    return practice(cqOk ? {onOpenQuest:()=>setCqOpen(true)} : undefined);
  }

  if(auth.role==="parent"){
    const user = STORE.users[auth.user.id] || auth.user;
    const linkedStudents = (user.childIds||[]).map(cid=>STORE.users[cid]).filter(Boolean);
    return <PracticeGate kind="parent"
      user={user}
      linkedStudents={linkedStudents}
      onLogout={handleLogout}
      getProgress={getProgress}
      setProgress={(uid,g,s,d)=>{ setProgress(uid,g,s,d); refresh(); }}
      refresh={refresh}
      onChildCreated={SERVER_AUTH ? (c)=>{
        const kid = mirrorServerUser(c);
        const par = STORE.users[user.id];
        par.childIds = [...new Set([...(par.childIds||[]), kid.id])];
        persistUsers(); refresh();
      } : null}
    />;
  }

  if(auth.role==="admin"){
    // Admin UI is only reachable after a server-verified session (login route or session check)
    return <PracticeGate kind="admin"
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


