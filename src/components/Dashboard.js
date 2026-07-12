"use client";
import React, { useState } from "react";
import {
  C, Wrap, AnimNumber, AnimProgressBar,
} from "@/lib/uiShared";
import { SECTION_ORDER, SECTIONS, ZH_SECTION_ORDER, ZH_SECTIONS } from "@/lib/quizMeta";
//  App-wide constants 
export const GRADES = ["P3", "P4", "P5", "P6"];
// 대시보드 상단 학년 탭. 등록 폼(GRADES)과 달리 마지막 단계인 PSLE 까지 보여준다.
export const GRADE_TABS = [...GRADES, "PSLE"];
const ZH_FONT_DASH = "'KaiTi','STKaiti','LXGW WenKai',serif";
const ZH_WA1_SECTIONS = {
  HanziMcq:      { label: "辨字",             icon: "" },
  PinyinMcq:     { label: "拼音",             icon: "" },
  VocabMcq:      { label: "词语",             icon: "" },
  VocabMatch:    { label: "词语搭配", icon: "" },
  SentenceCraft: { label: "造句",             icon: "" },
  PassageCloze:  { label: "短文填空", icon: "" },
  ReadingMcq:    { label: "阅读理解", icon: "" },
  ReadingOpen:   { label: "阅读问答", icon: "" },
};
const ZH_WA1_ORDER = ["HanziMcq","PinyinMcq","VocabMcq","VocabMatch","SentenceCraft","PassageCloze","ReadingMcq","ReadingOpen"];

export const SUBJECTS = {
  English: { label: "English",     icon: "", color: "#3B82F6" },
  Chinese: { label: " Chinese", icon: "", color: "#EF4444" },
  Math:    { label: "Mathematics", icon: "", color: "#10B981" },
  Science: { label: "Science",     icon: "", color: "#8B5CF6" },
};

export const LIVE_CONTENT = {
  P3_English: true,
  P3_Chinese: true,
};
// 


function SchoolBanner({school}){
  return(
    <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"8px 16px",
      display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:"calc(var(--fs) * 1.000)"}}></span>
      <span style={{color:"rgba(255,255,255,0.85)",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>{school}</span>
    </div>
  );
}
function ComingSoonToast({message, onDone}){
  React.useEffect(()=>{
    const t = setTimeout(()=>onDone?.(), 2500);
    return ()=>clearTimeout(t);
  }, [onDone]);
  return(
    <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",
      background:"#0F172A",color:"#fff",padding:"14px 22px",borderRadius:14,
      fontSize:"calc(var(--fs) * 1.000)",fontWeight:700,zIndex:300,boxShadow:"0 8px 32px rgba(0,0,0,.35)",
      maxWidth:"min(92vw,360px)",textAlign:"center"}}>
      {message}
    </div>
  );
}


function SubjectSelectScreen({user, grade, onLogout, onSelect, onGradeChange}){
  const [comingSoon, setComingSoon] = React.useState(null);
  const [showStageModal, setShowStageModal] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState(null);
  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",padding:"24px 20px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,gap:8}}>
          <div>
            <div style={{color:"rgba(255,255,255,.5)",fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,
              letterSpacing:1.5,textTransform:"uppercase"}}>Genius Project</div>
            <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.429)",fontWeight:900,marginTop:2}}>
              Hello, {user.name.split(" ")[0]}! 
            </div>
            <div style={{color:"rgba(255,255,255,.55)",fontSize:"calc(var(--fs) * 0.857)",marginTop:2}}>
              {user.school||"Primary School"} · {grade}
            </div>
          </div>
          <button onClick={onLogout}
            style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:10,flexShrink:0,
              padding:"7px 12px",color:"rgba(255,255,255,.7)",cursor:"pointer",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>
            Logout
          </button>
        </div>
        <div style={{display:"flex",gap:6,width:"100%"}}>
          {GRADE_TABS.map(g=>(
            <button key={g} onClick={()=>onGradeChange(g)}
              style={{flex:"1 1 0",minWidth:0,background:g===grade?"rgba(255,255,255,.2)":"rgba(255,255,255,.07)",
                border:`1.5px solid ${g===grade?"rgba(255,255,255,.4)":"transparent"}`,
                borderRadius:10,padding:"6px 4px",color:g===grade?"#fff":"rgba(255,255,255,.45)",
                cursor:"pointer",fontSize:"calc(var(--fs) * 0.786)",fontWeight:g===grade?800:500}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 80px"}}>
        <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,color:C.muted,marginBottom:12,
          textTransform:"uppercase",letterSpacing:1}}>Choose a Subject</div>
        {Object.entries(SUBJECTS).map(([key,sub])=>{
          const live=!!LIVE_CONTENT[grade+"_"+key];
          return(
            <button key={key} onClick={()=>{ if(live){ onSelect(key); } else { setToastMsg("Coming Soon: 준비 중인 과목입니다"); setComingSoon(key); } }}
              className={`gm-fadeIn-${Math.min(Object.keys(SUBJECTS).indexOf(key)+1,4)}`}
              style={{width:"100%",background:live
                ?"linear-gradient(135deg,"+sub.color+","+sub.color+"cc)"
                :"#E2E8F0",
                border:"none",borderRadius:18,padding:0,cursor:"pointer",
                marginBottom:12,textAlign:"left",overflow:"hidden",
                opacity:live?1:.75,
                boxShadow:live?"0 6px 20px "+sub.color+"33":"none"}}>
              <div style={{padding:"18px 20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
                  <span style={{fontSize:28}}>{sub.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:900,
                      color:live?"#fff":"#64748B"}}>{sub.label}</div>
                    <div style={{fontSize:"calc(var(--fs) * 0.786)",color:live?"rgba(255,255,255,.65)":"#94A3B8",
                      marginTop:1,overflow:"hidden",textOverflow:"ellipsis"}}>{sub.desc||""}</div>
                  </div>
                  {live
                    ?<span style={{marginLeft:"auto",flexShrink:0,background:"rgba(255,255,255,.2)",
                        color:"#fff",fontSize:"calc(var(--fs) * 0.780)",fontWeight:800,padding:"3px 10px",
                        borderRadius:8}}>LIVE</span>
                    :<span style={{marginLeft:"auto",flexShrink:0,background:"#CBD5E1",
                        color:"#64748B",fontSize:"calc(var(--fs) * 0.780)",fontWeight:800,padding:"3px 10px",
                        borderRadius:8}}>Coming Soon</span>
                  }
                </div>
              </div>
            </button>
          );
        })}
      </div>

    
  {/* AI ADAPTIVE PRACTICE SECTION */}
  {showStageModal && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}
      onClick={()=>setShowStageModal(false)}>
      <div style={{background:"#fff",borderRadius:20,padding:"24px 20px",width:"min(92vw,360px)",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}
        onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:900,fontSize:"calc(var(--fs) * 1.214)",color:"#1a1a2e",marginBottom:4}}>AI Adaptive Practice</div>
        <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#888",marginBottom:16}}>Select exam stage for {grade} English</div>
        {["WA1","WA2","WA3","EOY"].map(stage => (
          <button key={stage} onClick={()=>{
            setShowStageModal(false);
            window.location.href = "/adaptive?grade="+grade+"&subject=English&stage="+stage+"&userId="+(user.id||"")+"&userName="+(encodeURIComponent(user.name||""))+"&school="+(encodeURIComponent(user.school||""));
          }} style={{
            width:"100%",marginBottom:8,padding:"12px 16px",borderRadius:12,
            border:"1.5px solid #E0E0EE",background:"#F8F8FF",
            cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"
          }}>
            <span style={{fontWeight:700,fontSize:"calc(var(--fs) * 1.000)",color:"#1a1a2e"}}>{stage}</span>
            <span style={{fontSize:"calc(var(--fs) * 0.786)",color:"#888"}}>
              {stage==="WA1"?"Term 1 Assessment":stage==="WA2"?"Mid-Year Exam":stage==="WA3"?"Term 3 Assessment":"End-of-Year Exam"}
            </span>
          </button>
        ))}
        <button onClick={()=>setShowStageModal(false)} style={{
          width:"100%",padding:"10px",borderRadius:12,border:"none",
          background:"#F0F0F8",color:"#888",fontWeight:600,fontSize:"calc(var(--fs) * 0.929)",cursor:"pointer",marginTop:4
        }}>Cancel</button>
      </div>
    </div>
  )}
  <div style={{margin:"16px 16px 0"}}>
    <button onClick={()=>setShowStageModal(true)} style={{
      width:"100%",padding:"14px 16px",borderRadius:16,border:"none",
      background:"linear-gradient(135deg,#7B68EE,#5B4FBE)",
      color:"#fff",fontWeight:800,fontSize:"calc(var(--fs) * 1.071)",cursor:"pointer",
      display:"flex",alignItems:"center",justifyContent:"center",gap:10,
      boxShadow:"0 4px 16px rgba(123,104,238,0.35)"
    }}>
      <span style={{fontSize:"calc(var(--fs) * 1.286)"}}>*</span>
      AI Adaptive Practice
      <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:600,background:"rgba(255,255,255,0.2)",
        padding:"2px 8px",borderRadius:20}}>NEW</span>
    </button>
    <div style={{fontSize:"calc(var(--fs) * 0.780)",color:"#94A3B8",textAlign:"center",marginTop:6}}>
      Personalised questions based on your performance
    </div>
  </div>

    {toastMsg&&<ComingSoonToast message={toastMsg} onDone={()=>setToastMsg(null)}/>}
      {comingSoon&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
          display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20}}>
          <div style={{background:"#fff",borderRadius:24,padding:"32px 24px",maxWidth:340,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>{SUBJECTS[comingSoon]?.icon||""}</div>
            <div style={{fontSize:"calc(var(--fs) * 1.429)",fontWeight:900,color:C.text,marginBottom:8}}>
              {SUBJECTS[comingSoon]?.label} — Coming Soon!
            </div>
            <div style={{fontSize:"calc(var(--fs) * 0.929)",color:C.muted,lineHeight:1.6,marginBottom:24}}>
              이 과목은 곧 제공될 예정입니다. 조금만 기다려 주세요!
            </div>
            <div style={{background:C.lGreen,borderRadius:12,padding:"10px 14px",marginBottom:20,
              fontSize:"calc(var(--fs) * 0.929)",fontWeight:700,color:"#065F46"}}>
               Currently available: P3 English & Chinese
            </div>
            <button onClick={()=>setComingSoon(null)}
              style={{width:"100%",background:"linear-gradient(135deg,#1E3A6E,#2563EB)",
                color:"#fff",border:"none",borderRadius:14,padding:"14px",
                fontSize:"calc(var(--fs) * 1.071)",fontWeight:900,cursor:"pointer"}}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Mistake Re-injection: pull up to N past-wrong question IDs ─



function ComingSoonScreen({grade,subject}){
  const sub=SUBJECTS[subject];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 24px",textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:16}}>{sub.icon}</div>
      <div style={{fontSize:"calc(var(--fs) * 1.429)",fontWeight:900,color:"#0F172A",marginBottom:8}}>{grade} {sub.label}</div>
      <div style={{fontSize:"calc(var(--fs) * 1.000)",color:C.muted,lineHeight:1.7,marginBottom:24}}>
        This subject is coming soon!<br/>We're working hard to bring you{"\n"}high-quality practice questions for {grade} {sub.label}.
      </div>
      <div style={{background:C.lBlue,borderRadius:14,padding:"12px 20px",fontSize:"calc(var(--fs) * 0.929)",color:"#1D4ED8",fontWeight:600}}>
         Currently available: P3 English & Chinese
      </div>
    </div>
  );
}


function StudentHome({user, prog, grade, subject, isMockDue, onStart, onStartFrom, onStartMock, availableSections, completedSections, onMistakes, onReview, onReviewSection}){
  const history = prog.history||[];
  const regularH = history.filter(h=>!h.isMockExam);
  const mockH    = history.filter(h=>h.isMockExam);
  const avgTotal = regularH.length ? Math.round(regularH.reduce((s,h)=>s+h.totalPct,0)/regularH.length):0;
  const [graphMode,    setGraphMode]    = useState("total");
  const [showProgress, setShowProgress] = useState(false);
    const [showRecent,   setShowRecent]   = useState(false);
  // Subject theming: Chinese = red twin of the English (navy) design; identical layout.
  const isZh = subject === "Chinese";
  const SECS = isZh ? ZH_WA1_SECTIONS : SECTIONS;
  const ORDER = isZh ? ZH_WA1_ORDER : SECTION_ORDER;
  const HG = isZh ? "linear-gradient(135deg,#7C2D12,#EF4444)" : "linear-gradient(135deg,#0F172A,#1E3A6E)";
  const ACCENT = isZh ? "#B91C1C" : C.navy;
  const HSHADOW = isZh ? "rgba(124,45,18,0.3)" : "rgba(15,23,42,0.3)";
  const CFONT = isZh ? ZH_FONT_DASH : undefined;

  const sectionAvgs={};
  ORDER.forEach(type=>{
    const vals=regularH.map(h=>h.scores[type]).filter(v=>v!=null);
    sectionAvgs[type]=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
  });

  return(
    <div style={{paddingBottom:80}}> {user.school&&<SchoolBanner school={user.school}/>} <div style={{background:"#fff",padding:"14px 16px 0",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:10,paddingBottom:14}}>
          {[{icon:"",l:"Sessions",v:history.length},{icon:"",l:"Avg",v:avgTotal?`${avgTotal}%`:"—"},{icon:"",l:"Mock",v:mockH.length},{icon:"",l:"Next",v:`#${prog.nextSession}`}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#F8FAFC",borderRadius:12,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:"calc(var(--fs) * 1.143)"}}>{s.icon}</div>
              <div style={{fontSize:"calc(var(--fs) * 1.071)",fontWeight:900,color:ACCENT}}>{s.v}</div>
              <div style={{fontSize:"calc(var(--fs) * 0.780)",color:C.muted,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}> {prog.nextSession>=11&&(
          <div style={{background:HG,borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(15,23,42,0.35)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}></span>
              <div>
                <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>Past Paper #{prog.nextSession-10} Unlocked!</div>
                <div style={{color:"rgba(255,255,255,0.75)",fontSize:"calc(var(--fs) * 0.857)",marginTop:1}}>{user.school ? user.school+" style" : "School paper style"} · Real exam questions</div>
              </div>
            </div>
          </div>
        )}
        {isMockDue&&prog.nextSession<11&&(
          <div style={{background:"linear-gradient(135deg,#7C3AED,#8B5CF6)",borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(124,58,237,0.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}></span>
              <div>
                <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>Mock Exam Unlocked!</div>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:"calc(var(--fs) * 0.857)",marginTop:1}}>10 sessions complete — real school paper test awaits</div>
              </div>
            </div>
          </div>
        )} <div role="button" tabIndex={0} onClick={onStart} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onStart&&onStart();}}} style={{width:"100%",background:HG,color:"#fff",border:"none",borderRadius:18,padding:"0",marginBottom:16,cursor:"pointer",boxShadow:"0 8px 28px "+HSHADOW,overflow:"hidden",textAlign:"left",fontFamily:CFONT}}>
          <div style={{padding:"18px 20px"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.6)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>
              {grade} {subject} · {prog.nextSession>=11?"Past Paper #"+(prog.nextSession-10):isMockDue?"Mock Exam":"Session #"+prog.nextSession}
            </div>
            <div style={{fontSize:"calc(var(--fs) * 1.286)",fontWeight:900,color:"#fff",marginBottom:4}}>
              {isZh?"\u2192 \u5F00\u59CB\u4ECA\u5929\u7684\u7EC3\u4E60 \u2192":prog.nextSession>=11?" Start Past Paper \u2192":isMockDue?" Start Mock Exam \u2192":"\u2192 Start Practice for Today \u2192"}
            </div>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.5)"}}>{isZh?"\u8FA8\u5B57 \u00B7 \u62FC\u97F3 \u00B7 \u8BCD\u8BED \u00B7 \u642D\u914D \u00B7 \u9020\u53E5 \u00B7 \u77ED\u6587\u586B\u7A7A \u00B7 \u9605\u8BFB \u00B7 ~30 min":prog.nextSession>=11?" Real school past paper \u00B7 ~35 min":isMockDue?"Nanyang Primary WA1 style \u00B7 ~30 min":"Grammar \u00B7 Vocabulary \u00B7 Comprehension \u00B7 ~35 min"+(user.school?" \u00B7 "+user.school+" style":"")}</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.06)",padding:"8px 20px",display:"flex",gap:8,flexWrap:"wrap"}}>
            {Object.entries(SECS).map(([k,v])=>(
              <button key={k}
                onClick={e=>{e.stopPropagation();if(completedSections&&completedSections.includes(k)){onReviewSection&&onReviewSection(k);return;}if(availableSections&&!availableSections.includes(k))return;onStartFrom&&onStartFrom(k);}}
                style={{display:"flex",alignItems:"center",gap:4,
                  background:completedSections&&completedSections.includes(k)?"rgba(34,197,94,0.35)":availableSections&&!availableSections.includes(k)?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.1)",
                  border:completedSections&&completedSections.includes(k)?"1px solid rgba(34,197,94,0.8)":"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"4px 10px",
                  cursor:availableSections&&!availableSections.includes(k)?"default":"pointer",
                  opacity:availableSections&&!availableSections.includes(k)?0.3:1,
                  transition:"background 0.15s"}}
                onMouseEnter={e=>{if(availableSections&&availableSections.includes(k))e.currentTarget.style.background="rgba(255,255,255,0.25)"}}
                onMouseLeave={e=>e.currentTarget.style.background=availableSections&&!availableSections.includes(k)?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.1)"}>
                <span style={{fontSize:"calc(var(--fs) * 0.929)"}}>{v.icon}</span>
                <span style={{fontSize:"calc(var(--fs) * 0.780)",color:"rgba(255,255,255,0.8)",fontWeight:600,fontFamily:CFONT}}>{(completedSections&&completedSections.includes(k)?"\u2713 ":"")+(isZh?(v.label||k):k.replace("MCQ","").replace("Cloze","Cl."))}</span>
              </button>
            ))}
          </div>
        </div>
        {onStartMock && (
          <button onClick={onStartMock} style={{width:"100%",background:"linear-gradient(135deg,#7C3AED,#8B5CF6)",color:"#fff",border:"none",borderRadius:18,padding:"16px 20px",marginBottom:16,cursor:"pointer",boxShadow:"0 8px 24px rgba(124,58,237,0.28)",textAlign:"left",fontFamily:CFONT}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.75)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{isZh?"\u6A21\u62DF\u8003 \u00B7 \u771F\u9898":"Mock Exam \u00B7 Past Papers"}</div>
            <div style={{fontSize:"calc(var(--fs) * 1.214)",fontWeight:900,color:"#fff",marginBottom:4}}>{isZh?"\u534E\u6587 \u6A21\u62DF\u8003 (\u5168\u6821\u771F\u9898)":"Mock Exam (School Past Papers)"}</div>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,0.75)"}}>{isZh?"\u771F\u5B9E\u8003\u5377 \u00B7 \u5168\u6821 \u00B7 \u68C0\u9A8C\u5B9E\u529B":"Real exam papers \u00B7 all schools"}</div>
          </button>
        )} {regularH.length>0&&(
          <div style={{background:"#fff",borderRadius:18,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <button onClick={()=>setShowProgress(p=>!p)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 1.000)",color:C.text}}> My Progress</div>
              <span style={{color:C.muted,fontSize:"calc(var(--fs) * 0.929)",transform:showProgress?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
            </button>
          {showProgress&&<div style={{padding:"0 16px 16px"}}>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
              <div style={{display:"flex",gap:5}}>
                {["total","section"].map(g=>(
                  <button key={g} onClick={()=>setGraphMode(g)} style={{background:graphMode===g?ACCENT:"#F1F5F9",color:graphMode===g?"#fff":C.muted,border:"none",borderRadius:7,padding:"4px 9px",fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,cursor:"pointer"}}>
                    {g==="total"?"Overall":"Sections"}
                  </button>
                ))}
              </div>
            </div>
            {graphMode==="total"?(
              <div>
                <div style={{display:"flex",alignItems:"flex-end",gap:5,height:72,marginBottom:6}}>
                  {history.slice(-10).map((h,i)=>{
                    const col=h.isMockExam?"#7C3AED":h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
                    return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",color:col,fontWeight:800}}>{h.totalPct}%</div>
                        <div style={{width:"100%",background:col,borderRadius:"3px 3px 0 0",height:`${Math.max(h.totalPct*0.65,4)}%`,minHeight:4,position:"relative"}}>
                          {h.isMockExam&&<span style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",fontSize:"calc(var(--fs) * 0.780)"}}></span>}
                        </div>
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",color:C.muted}}>{`S${h.sessionNum}`}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:10,fontSize:"calc(var(--fs) * 0.780)",color:C.muted}}>
                  {[[C.green,"≥85%"],[C.amber,"70–84%"],[C.red,"<70%"],["#7C3AED","Mock"]].map(([c,l])=>(
                    <span key={l} style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:7,height:7,borderRadius:2,background:c}}/>{l}</span>
                  ))}
                </div>
              </div>
            ):(
              <div>
                {ORDER.map(type=>{
                  const meta=SECS[type]; const avg=sectionAvgs[type]; if(!avg) return null;
                  const col=avg>=85?C.green:avg>=70?C.amber:C.red;
                  return(
                    <div key={type} style={{marginBottom:9}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:700,fontFamily:CFONT}}>{meta.icon} {meta.label}</span>
                        <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:col}}>{avg}%</span>
                      </div>
                      <div style={{background:"#EEF2F7",borderRadius:6,height:7}}>
                        <div style={{background:col,borderRadius:6,height:7,width:`${avg}%`,transition:"width 0.6s"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>}
          </div>
        )} {history.length>0&&(
          <div style={{background:"#fff",borderRadius:18,marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <button onClick={()=>setShowRecent(p=>!p)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"13px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",color:C.text}}> Recent Sessions ({history.length})</div>
              <span style={{color:C.muted,fontSize:"calc(var(--fs) * 0.929)",transform:showRecent?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
            </button>
          {showRecent&&<div style={{padding:"0 14px 14px"}}>
            {[...history].reverse().slice(0,5).map((h,i)=>{
              const col=h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:h.isMockExam?"#EDE9FE":col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.286)",flexShrink:0}}>
                    {h.isMockExam?"":""}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:C.text}}>{h.isMockExam?`Mock: ${h.school||""} ${h.examType||""}`:`Session #${h.sessionNum}`}</div>
                    <div style={{fontSize:"calc(var(--fs) * 0.780)",color:C.muted}}>{h.date}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:900,color:col}}>{h.totalPct}%</div>
                    <div style={{fontSize:"calc(var(--fs) * 0.780)",color:col}}>{h.totalPct>=85?"Excellent":h.totalPct>=70?"Good":"Keep Going"}</div>
                  </div>
                </div>
              );
            })}
          </div>}
          </div>
        )} <div style={{display:"flex",gap:10}}>
          <button onClick={onMistakes} style={{flex:1,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:14,padding:"12px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <span style={{fontSize:"calc(var(--fs) * 1.571)"}}></span>
            <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:700,color:C.text}}>Mistakes</span>
          </button>
          <button onClick={onReview} style={{flex:1,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:14,padding:"12px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <span style={{fontSize:"calc(var(--fs) * 1.571)"}}></span>
            <span style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:700,color:C.text}}>Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}


function ZhHome({user, prog, onStart, onStartWA1, onStartDrill, onBack}){
  const history=prog.history||[];
  const avgTotal=history.length?Math.round(history.reduce((s,h)=>s+h.totalPct,0)/history.length):0;
  const [showRecent,setShowRecent]=useState(false);

  return(
    <div style={{paddingBottom:80}}> <div style={{background:"linear-gradient(135deg,#7C2D12,#EF4444)",padding:"20px 20px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div>
            <div style={{color:"rgba(255,255,255,.55)",fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>Genius Project</div>
            <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.214)",fontWeight:900}}> P3 高级华文</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:"calc(var(--fs) * 0.786)",marginTop:2}}>菩提学校 · Maha Bodhi School</div>
          </div>
          <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"rgba(255,255,255,.85)",cursor:"pointer",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>← 返回</button>
        </div>
      </div> <div style={{background:"#fff",padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:10}}>
          {[
            {icon:"",l:"练习次数",v:history.length},
            {icon:"",l:"平均分",v:avgTotal?`${avgTotal}%`:"—"},
            {icon:"",l:"下一节",v:`#${prog.nextSession}`},
          ].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#F8FAFC",borderRadius:12,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:"calc(var(--fs) * 1.143)"}}>{s.icon}</div>
              <div style={{fontSize:"calc(var(--fs) * 1.071)",fontWeight:900,color:"#7C2D12"}}>{s.v}</div>
              <div style={{fontSize:"calc(var(--fs) * 0.780)",color:C.muted,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}> {prog.nextSession>=11&&(
          <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(15,23,42,.35)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}></span>
              <div>
                <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.000)",fontWeight:900}}>Ai Tong Primary 基出题 #{prog.nextSession-10}</div>
                <div style={{color:"rgba(255,255,255,.7)",fontSize:"calc(var(--fs) * 0.786)",marginTop:2}}>爱同学校 · 2024 SA1 真题</div>
              </div>
            </div>
          </div>
        )}
        <button onClick={onStart} style={{width:"100%",background:"linear-gradient(135deg,#7C2D12,#EF4444)",color:"#fff",border:"none",borderRadius:18,padding:0,cursor:"pointer",boxShadow:"0 8px 28px rgba(124,45,18,.35)",overflow:"hidden",textAlign:"left",marginBottom:16}}>
          <div style={{padding:"18px 20px"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.6)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>
              P3 高级华文 · 第{prog.nextSession}节
            </div>
            <div style={{fontSize:"calc(var(--fs) * 1.214)",fontWeight:900,color:"#fff",marginBottom:4}}>→ 开始今天的练习 →</div>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.5)"}}>辨字 · 词语 · 看图 · 搭配 · 扩句 · 组段 · 阅读</div>
          </div>
          <div style={{background:"rgba(255,255,255,.06)",padding:"8px 20px",display:"flex",gap:12}}>
            {ZH_SECTION_ORDER.map(k=>{
              const meta=ZH_SECTIONS[k];
              return <div key={k} style={{display:"flex",alignItems:"center",gap:3}}>
                <span style={{fontSize:"calc(var(--fs) * 0.857)"}}>{meta.icon}</span>
              </div>;
            })}
          </div>
        </button>
        {onStartWA1 && (
          <button onClick={onStartWA1} style={{width:"100%",background:"linear-gradient(135deg,#1E3A6E,#2563EB)",color:"#fff",border:"none",borderRadius:18,padding:"16px 20px",cursor:"pointer",boxShadow:"0 8px 28px rgba(30,58,110,.30)",textAlign:"left",marginBottom:16,fontFamily:"'KaiTi','STKaiti','LXGW WenKai',serif"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.6)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{"P3 HCL WA1 \u00B7 Mock"}</div>
            <div style={{fontSize:"calc(var(--fs) * 1.214)",fontWeight:900,color:"#fff",marginBottom:4}}>{"\u534E\u6587 WA1 \u6A21\u62DF\u8003 (60\u5957)"}</div>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.6)"}}>{"\u8FA8\u5B57 \u00B7 \u62FC\u97F3 \u00B7 \u8BCD\u8BED \u00B7 \u642D\u914D \u00B7 \u9020\u53E5 \u00B7 \u77ED\u6587\u586B\u7A7A \u00B7 \u9605\u8BFB"}</div>
          </button>
        )}
        {onStartDrill && (
          <button onClick={onStartDrill} style={{width:"100%",background:"linear-gradient(135deg,#92400E,#D97706)",color:"#fff",border:"none",borderRadius:18,padding:"14px 20px",cursor:"pointer",boxShadow:"0 8px 24px rgba(146,64,14,.28)",textAlign:"left",marginBottom:16,fontFamily:"'KaiTi','STKaiti','LXGW WenKai',serif"}}>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.7)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{"Remediation \u00B7 from your mistakes"}</div>
            <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:900,color:"#fff",marginBottom:4}}>{"\u5F31\u9879\u8BAD\u7EC3 (\u9519\u9898)"}</div>
            <div style={{fontSize:"calc(var(--fs) * 0.786)",color:"rgba(255,255,255,.7)"}}>{"\u53EA\u7EC3\u4F60\u6700\u5BB9\u6613\u9519\u7684\u9898\u578B"}</div>
          </button>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {ZH_SECTION_ORDER.map(k=>{
            const meta=ZH_SECTIONS[k];
            return(
              <div key={k} style={{background:"#fff",borderRadius:14,padding:"12px 10px",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                <div style={{fontSize:"calc(var(--fs) * 1.429)",marginBottom:4}}>{meta.icon}</div>
                <div style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:meta.color}}>{meta.label}</div>
                <div style={{fontSize:"calc(var(--fs) * 0.780)",color:C.muted,marginTop:2,lineHeight:1.4}}>{meta.sub}</div>
              </div>
            );
          })}
        </div> {history.length>0&&(
          <div style={{background:"#fff",borderRadius:18,marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden"}}>
            <button onClick={()=>setShowRecent(p=>!p)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"13px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",color:C.text}}> 最近练习 ({history.length})</div>
              <span style={{color:C.muted,fontSize:"calc(var(--fs) * 0.929)",transform:showRecent?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
            </button>
            {showRecent&&(
              <div style={{padding:"0 14px 14px"}}>
                {[...history].reverse().slice(0,5).map((h,i)=>{
                  const col=h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                      <div style={{width:32,height:32,borderRadius:9,background:col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.143)",flexShrink:0}}></div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>第 #{h.sessionNum} 节</div>
                        <div style={{fontSize:"calc(var(--fs) * 0.780)",color:C.muted}}>{h.date}</div>
                      </div>
                      <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:900,color:col}}>{h.totalPct}%</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



export function StudentShell({ user, grade, subject, onGradeChange, onSubjectChange, onLogout, toastMsg, onToastDone }) {
  return (
    <>
      <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",padding:"18px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:12,background:user.color||C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"calc(var(--fs) * 1.429)"}}>{user.avatar||""}</div>
            <div>
              <div style={{color:"rgba(255,255,255,0.65)",fontSize:"calc(var(--fs) * 0.780)",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Genius Project</div>
              <div style={{color:"#fff",fontSize:"calc(var(--fs) * 1.071)",fontWeight:800}}>{user.name}</div>
              {user.school&&<div style={{color:"rgba(255,255,255,0.55)",fontSize:"calc(var(--fs) * 0.780)",marginTop:1}}> {user.school}</div>}
            </div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"6px 12px",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:"calc(var(--fs) * 0.857)",fontWeight:700}}>Logout</button>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:12,width:"100%"}}>
          {GRADE_TABS.map(g=>(
            <button key={g} onClick={()=>onGradeChange(g)} style={{flex:"1 1 0",minWidth:0,background:grade===g?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.12)",border:"none",borderRadius:10,padding:"8px 4px",color:grade===g?"#0F172A":"rgba(255,255,255,0.7)",fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",textAlign:"center",transition:"all 0.2s"}}>
              {g}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.12)"}}>
          {Object.entries(SUBJECTS).map(([key,sub])=>{
            const live=!!LIVE_CONTENT[`${grade}_${key}`];
            return(
              <button key={key} onClick={()=>onSubjectChange(key, live)} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"10px 4px 10px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <span style={{fontSize:"calc(var(--fs) * 1.143)"}}>{sub.icon}</span>
                <span style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:subject===key?800:500,color:subject===key?"#fff":"rgba(255,255,255,0.45)",whiteSpace:"nowrap"}}>{key}</span>
                {!live&&<span style={{fontSize:"calc(var(--fs) * 0.780)",color:"rgba(255,255,255,0.5)",fontWeight:700}}>Coming Soon</span>}
              </button>
            );
          })}
        </div>
      </div>
      {toastMsg&&<ComingSoonToast message={toastMsg} onDone={onToastDone}/>}
    </>
  );
}

export {

  ComingSoonToast, SubjectSelectScreen, ComingSoonScreen,
  StudentHome, ZhHome,
};


