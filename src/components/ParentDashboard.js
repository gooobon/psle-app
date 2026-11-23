"use client";
import React, { useState, useEffect } from "react";
import { C, Wrap } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER } from "@/lib/quizMeta";
import { DEFAULT_SETTINGS, generateAdvice } from "@/lib/dataEngine";
import ParentExams from '@/components/ParentExams';
import { SERVER_AUTH, WRONG_ANSWERS_SYNC, PARENT_HOMEWORK, REWARDS, LEARNING_DASHBOARD, MOCK_EXAMS_ENABLED, serverPost, serverGet, serverPut } from "@/lib/serverClient";
import LearningDashboard from "@/components/LearningDashboard";
import ParentRewards from "@/components/ParentRewards";
import ParentChildSettings from "@/components/ParentChildSettings";
import ParentPictureReset from "@/components/clewquest/ParentPictureReset";
import ParentPictureChild from "@/components/clewquest/ParentPictureChild";
import { clewquestEnabled } from "@/lib/clewquest/config";
import { cqPost } from "@/lib/clewquest/client";
import { CODE_LENGTH, PICTURES } from "@/lib/clewquest/pictures";
import { PicturePad } from "@/components/clewquest/PictureAuth";
import SchoolCombobox from "@/components/SchoolCombobox";
import { cleanNamePart, fullName, suggestLoginId, loginIdProblem } from "@/lib/supabase/config";
import { HOMEWORK_ABUSE_MAX, HOMEWORK_PER_MISTAKE, clampHomeworkCount } from "@/lib/homework";
import { SUBJECTS, GRADES, LIVE_CONTENT, ComingSoonToast, ComingSoonScreen } from "@/components/Dashboard";
import { causeLabel } from "@/lib/wrongNotebook";

// ── Parent: homework status (flag NEXT_PUBLIC_PARENT_HOMEWORK_ENABLED, default off) ──
function HomeworkStatus({child, refreshKey}){
  const [st,setSt]=React.useState(null);
  React.useEffect(()=>{
    setSt(null); let alive=true;
    serverGet(`/api/parent/homework?child=${encodeURIComponent(child.serverId)}`).then(r=>{ if(alive&&r.ok) setSt(r); });
    return ()=>{ alive=false; };
  },[child?.serverId, refreshKey]);
  if(!st) return null;
  const t=(st.days||[]).find(d=>d.date===st.today)||{assigned:0,solved:0,remaining:0,correct:0};
  const box=(n,l,c)=>(<div style={{flex:1,textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:c}}>{n}</div><div style={{fontSize:10,fontWeight:700,color:"#64748B"}}>{l}</div></div>);
  return(
    <div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:14,padding:"12px 14px",marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:800,color:"#92400E",marginBottom:8}}>📚 Homework today · {st.usedToday} assigned</div>
      <div style={{display:"flex",gap:6}}>{box(t.assigned,"Assigned","#0F172A")}{box(t.solved,"Solved","#059669")}{box(t.remaining,"Remaining","#DC2626")}{box(t.correct,"Correct","#2563EB")}</div>
      {(st.days||[]).filter(d=>d.date!==st.today).slice(0,6).map(d=>(
        <div key={d.date} style={{fontSize:11,color:"#64748B",marginTop:6}}>{d.date}: {d.solved}/{d.assigned} solved, {d.correct} correct{d.remaining?`, ${d.remaining} not done`:""}</div>
      ))}
    </div>
  );
}

// ── Parent: Mistakes review tab ───────────────────────────────
function ParentMistakesTab({child, history, grade, subject, homeworkSimilarFor, notebookMistakes}){
  const [filterSession, setFilterSession] = React.useState("all");
  const [expanded, setExpanded] = React.useState(null);

  // Server mode (flags on): read this child's wrong answers from the server so any device works.
  // Flag off, or server unreachable: fall back to the local history exactly as before.
  // child.id is the username; the API needs the server UUID (child.serverId). Without serverId we use local data.
  const useServer = SERVER_AUTH && WRONG_ANSWERS_SYNC && !!child?.serverId;
  const [srv, setSrv] = React.useState(null); // null = not loaded / failed
  React.useEffect(()=>{
    setSrv(null);
    if(!useServer) return;
    let alive = true;
    serverGet(`/api/parent/wrong-answers?child=${encodeURIComponent(child.serverId)}&subject=${encodeURIComponent(subject)}`)
      .then(r=>{ if(alive && r.ok && Array.isArray(r.items)) setSrv(r.items); });
    return ()=>{ alive=false; };
  },[useServer, child?.serverId, subject]);

  // Homework (flag off => none of this renders). Needs the server child id and the server-backed mistake list.
  const hwOn = SERVER_AUTH && PARENT_HOMEWORK && !!child?.serverId && !!homeworkSimilarFor;
  const [hwKey,setHwKey]=React.useState(0);
  const [hwMsg,setHwMsg]=React.useState({});
  // Parent-set number of similar questions per mistake (default 3), saved in parent settings.
  const [hwCount,setHwCount]=React.useState(HOMEWORK_PER_MISTAKE);
  React.useEffect(()=>{
    if(!hwOn) return; let alive=true;
    serverGet("/api/parent/child-settings?child="+encodeURIComponent(child.serverId)).then(r=>{ if(alive&&r.ok){ const b=r.upcoming||r.current; if(b&&b.homeworkPerMistake) setHwCount(clampHomeworkCount(b.homeworkPerMistake)); } });
    return ()=>{ alive=false; };
  },[hwOn, child?.serverId]);
  function saveHwCount(v){ setHwCount(clampHomeworkCount(v)); }
  function commitHwCount(){
    // The count is part of the child's ONE shared setting (saved on blur, so each edit is ONE audit entry); it applies from tomorrow.
    serverPut("/api/parent/child-settings",{child:child.serverId, homeworkPerMistake:hwCount});
  }
  async function assignHomework(m){
    const sim=homeworkSimilarFor(subject,m,hwCount);
    if(!sim||!sim.ids.length){ setHwMsg(x=>({...x,[m.id]:"No similar questions available for this mistake yet."})); return; }
    setHwMsg(x=>({...x,[m.id]:"Assigning…"}));
    const r=await serverPost("/api/parent/homework",{child:child.serverId,subject,grade,sourceQuestionId:m.id,questionIds:sim.ids.slice(0,hwCount)});
    setHwMsg(x=>({...x,[m.id]:r.ok?(r.message||"Assigned."):(r.error||"Could not assign.")}));
    if(r.ok||r.code==="cap") setHwKey(k=>k+1);
  }

  const allMistakes = [];
  if(useServer && srv){
    // Server rows arrive newest first; grade filter matches the grade selector.
    srv.filter(x=>!x.grade || x.grade===grade).forEach(x=>{
      const mm = /^set-(\d+)$/.exec(x.attempt_key||"");
      allMistakes.push({
        id:x.question_id, q:x.question_text||undefined, topic:x.section_type||undefined, sectionType:x.section_type||undefined,
        yourAnswer:x.student_answer||undefined, correctAnswer:x.correct_answer||undefined,
        cause:x.cause||undefined,
        sessionNum: mm?Number(mm[1]):0, sessionDate:x.attempted_at,
      });
    });
  } else {
    const causeByKey = {};
    (notebookMistakes||[]).forEach(m=>{
      if(m && m.cause) causeByKey[(m.sessionNum!=null?m.sessionNum:"")+"|"+m.id] = m.cause;
    });
    (history||[]).forEach(h=>{
      (h.mistakes||[]).forEach(m=>{
        const cause = m.cause || causeByKey[(h.sessionNum!=null?h.sessionNum:"")+"|"+m.id];
        allMistakes.push({...m, cause, sessionNum:h.sessionNum, sessionDate:h.date});
      });
    });
  }

  const sessions = [...new Set(allMistakes.map(m=>m.sessionNum))].sort((a,b)=>b-a);
  const filtered = filterSession==="all" ? allMistakes
    : allMistakes.filter(m=>m.sessionNum===Number(filterSession));

  const byTopic = {};
  filtered.forEach(m=>{
    const key = m.topic||m.sectionType||"Other";
    if(!byTopic[key]) byTopic[key]=[];
    byTopic[key].push(m);
  });

  const diffColor = d => d==="foundation"?"#1D4ED8":d==="core"?"#92400E":d==="stretch"?"#991B1B":"#64748B";
  const diffBg    = d => d==="foundation"?"#DBEAFE":d==="core"?"#FEF3C7":d==="stretch"?"#FEE2E2":"#F1F5F9";
  const diffLabel = d => d==="foundation"?"⬤ Foundation":d==="core"?"⬤⬤ Core":d==="stretch"?"⬤⬤⬤ Stretch":"Core";

  return(
    <div style={{padding:"4px 0"}}>
      {hwOn&&<HomeworkStatus child={child} refreshKey={hwKey}/>}
      <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:14,
        padding:"12px 14px",marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:800,color:"#1D4ED8",marginBottom:4}}>
          👨‍👧 Review Together
        </div>
        <div style={{fontSize:12,color:"#1E40AF",lineHeight:1.6}}>
          Sit with {child?.name||"your child"} and go through these together. Each card shows
          what they answered, the correct answer, and how to solve it step by step.
        </div>
      </div>

      {filtered.length===0 ? (
        <div style={{textAlign:"center",padding:"50px 20px",color:"#64748B"}}>
          <div style={{fontSize:44,marginBottom:12}}>🎉</div>
          <div style={{fontSize:15,fontWeight:800,color:"#0F172A",marginBottom:6}}>
            No mistakes recorded yet!
          </div>
          <div style={{fontSize:13}}>Mistakes from practice sessions will appear here.</div>
        </div>
      ) : (
        <>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:10,marginBottom:6}}>
            <button onClick={()=>setFilterSession("all")}
              style={{background:filterSession==="all"?"#DC2626":"#F1F5F9",
                color:filterSession==="all"?"#fff":"#64748B",border:"none",borderRadius:20,
                padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer",
                whiteSpace:"nowrap",flexShrink:0}}>
              All ({allMistakes.length})
            </button>
            {sessions.map(s=>(
              <button key={s} onClick={()=>setFilterSession(String(s))}
                style={{background:filterSession===String(s)?"#DC2626":"#F1F5F9",
                  color:filterSession===String(s)?"#fff":"#64748B",border:"none",borderRadius:20,
                  padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer",
                  whiteSpace:"nowrap",flexShrink:0}}>
                Session {s}
              </button>
            ))}
          </div>

          {Object.entries(byTopic).map(([topic, items])=>(
            <div key={topic} style={{marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:800,color:C.muted,marginBottom:6,
                textTransform:"uppercase",letterSpacing:.8}}>{topic} · {items.length} mistake{items.length>1?"s":""}</div>
              {items.map((m,mi)=>{
                const isOpen = expanded===`${topic}-${mi}`;
                return(
                  <div key={mi} style={{background:"#fff",borderRadius:14,marginBottom:8,
                    boxShadow:"0 2px 8px rgba(0,0,0,0.05)",overflow:"hidden"}}>
                    <button onClick={()=>setExpanded(isOpen?null:`${topic}-${mi}`)}
                      style={{width:"100%",background:"none",border:"none",padding:"12px 14px",
                        cursor:"pointer",display:"flex",justifyContent:"space-between",
                        alignItems:"flex-start",gap:8,textAlign:"left"}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#0F172A",marginBottom:4,lineHeight:1.5}}>
                          {m.q||m.sentence||m.word||"Question"}
                        </div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                          {m.difficulty&&(
                            <span style={{background:diffBg(m.difficulty),color:diffColor(m.difficulty),
                              fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:6}}>
                              {diffLabel(m.difficulty)}
                            </span>
                          )}
                          {causeLabel(m.cause) ? (
                            <span style={{background:"#FEE2E2",color:"#991B1B",fontSize:10,
                              fontWeight:700,padding:"2px 7px",borderRadius:6}}>
                              {causeLabel(m.cause)}
                            </span>
                          ) : null}
                          {m.solvedAfterHint&&(
                            <span style={{background:"#FEF3C7",color:"#92400E",fontSize:10,
                              fontWeight:700,padding:"2px 7px",borderRadius:6}}>
                              💡 solved on try {m.attempts||2}
                            </span>
                          )}
                          <span style={{fontSize:10,color:"#94A3B8"}}>Session {m.sessionNum}</span>
                        </div>
                      </div>
                      <span style={{color:"#94A3B8",fontSize:16,
                        transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                    </button>

                    {isOpen && (
                      <div style={{padding:"0 14px 14px"}}>
                        {hwOn&&useServer&&srv&&(
                          <div style={{marginBottom:10}}>
                            <button onClick={()=>assignHomework(m)} style={{background:"#D97706",color:"#fff",border:"none",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:800,cursor:"pointer"}}>
                              📚 Assign up to {hwCount} similar as homework
                            </button>
                            <label style={{fontSize:11,color:"#64748B",marginLeft:8}}>Questions per mistake{" "}
                              <input type="number" min="1" max={HOMEWORK_ABUSE_MAX} value={hwCount} onChange={e=>saveHwCount(e.target.value)} onBlur={commitHwCount} style={{width:56,padding:"4px 6px",borderRadius:6,border:"1px solid #CBD5E1",fontSize:12}}/>
                            </label>
                            {hwMsg[m.id]&&<div style={{fontSize:12,color:"#92400E",marginTop:6}}>{hwMsg[m.id]}</div>}
                          </div>
                        )}
                        {(m.q||m.sentence) && (
                          <div style={{background:"#F8FAFC",borderRadius:10,padding:"10px 12px",
                            marginBottom:10,fontSize:13,fontWeight:600,color:"#0F172A",lineHeight:1.6}}>
                            {m.q||m.sentence}
                          </div>
                        )}
                        <div style={{display:"flex",gap:8,marginBottom:10}}>
                          <div style={{flex:1,background:"#FEE2E2",borderRadius:10,padding:"8px 12px"}}>
                            <div style={{fontSize:10,fontWeight:700,color:"#991B1B",marginBottom:2}}>
                              {child?.name||"Child"}'S ANSWER
                            </div>
                            <div style={{fontSize:13,fontWeight:700,color:"#7F1D1D"}}>
                              {m.yourAnswer != null && m.yourAnswer !== ""
                                ? String(m.yourAnswer)
                                : (Array.isArray(m.options) && m.studentAnswer != null && m.options[m.studentAnswer] != null
                                    ? m.options[m.studentAnswer]
                                    : "—")}
                            </div>
                          </div>
                          <div style={{flex:1,background:"#D1FAE5",borderRadius:10,padding:"8px 12px"}}>
                            <div style={{fontSize:10,fontWeight:700,color:"#065F46",marginBottom:2}}>CORRECT</div>
                            <div style={{fontSize:13,fontWeight:700,color:"#064E3B"}}>
                              {m.correctAnswer!==undefined&&m.options?m.options[m.correctAnswer]:m.correctAnswer||m.answer||"—"}
                            </div>
                          </div>
                        </div>
                        {m.solution && (
                          <div style={{background:"#F0FDF4",border:"1.5px solid #10B981",
                            borderRadius:12,padding:"12px 14px"}}>
                            <div style={{fontSize:11,fontWeight:800,color:"#065F46",marginBottom:8,
                              textTransform:"uppercase",letterSpacing:.6}}>
                              📐 How to solve: {typeof m.solution.method==="string"?m.solution.method:""}
                            </div>
                            {(Array.isArray(m.solution.steps)?m.solution.steps:[]).slice(0,6).map((step,si)=>(
                              typeof step==="string" ? (
                                <div key={si} style={{fontSize:12,color:"#0F172A",lineHeight:1.7,
                                  fontFamily:/[=+\-×÷]/.test(step)?"monospace":"inherit",
                                  paddingLeft:step.startsWith("【")?0:4,
                                  fontWeight:step.startsWith("【")?800:400,
                                  color:step.startsWith("【")?"#0D9488":"#0F172A"}}>
                                  {step}
                                </div>
                              ) : null
                            ))}
                            {m.solution.tip && typeof m.solution.tip==="string" && (
                              <div style={{background:"#FEF3C7",borderRadius:8,padding:"7px 10px",
                                marginTop:8,fontSize:11,color:"#92400E",fontWeight:700}}>
                                💡 {m.solution.tip}
                              </div>
                            )}
                          </div>
                        )}
                        {m.explanation && typeof m.explanation==="string" && (
                          <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:10,
                            padding:"10px 12px",marginTop:8,fontSize:12,color:"#1E40AF",lineHeight:1.6}}>
                            {m.explanation}
                          </div>
                        )}
                        {m.meaning && typeof m.meaning==="string" && (
                          <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:10,
                            padding:"10px 12px",marginTop:8}}>
                            <div style={{fontSize:10,fontWeight:800,color:"#1D4ED8",marginBottom:3}}>
                              📖 MEANING {m.pinyin?`· ${m.pinyin}`:""}
                            </div>
                            <div style={{fontSize:13,color:"#1E40AF",fontWeight:600}}>{m.meaning}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ── Parent: Overview / stats tab ──────────────────────────────
function ParentOverview({child, history, settings, subject}){
  // With server auth on, Sessions and Average come from the server (daily_activity) so they show on the parent's own device;
  // the child's local history is only the fallback (demo / server unavailable). Local data is never modified.
  const [srv,setSrv]=useState(null);
  useEffect(()=>{
    setSrv(null);
    if(!SERVER_AUTH||!child?.serverId) return;
    let off=false;
    serverGet("/api/parent/overview?child="+encodeURIComponent(child.serverId)).then(r=>{ if(!off&&r.ok&&r.subjects) setSrv(r.subjects); }).catch(()=>{});
    return ()=>{ off=true; };
  },[child?.serverId]);
  const srvSub=srv&&srv[subject];
  const regularH=history.filter(h=>!h.isMockExam);
  const localAvg=regularH.length?Math.round(regularH.reduce((s,h)=>s+h.totalPct,0)/regularH.length):0;
  const avgTotal=srvSub?(srvSub.average||0):localAvg;
  const sessionCount=srvSub?Math.max(srvSub.sessions,0):history.length;
  const last3=regularH.slice(-3);
  const trend=last3.length>=2?last3[last3.length-1].totalPct-last3[0].totalPct:0;
  const sectionAvgs={}, sectionTrends={};
  SECTION_ORDER.forEach(type=>{
    const vals=regularH.map(h=>h.scores[type]).filter(v=>v!=null);
    sectionAvgs[type]=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
    if(vals.length>=3) sectionTrends[type]=vals[vals.length-1]-vals[0];
  });
  const weakest=SECTION_ORDER.filter(t=>sectionAvgs[t]>0).sort((a,b)=>sectionAvgs[a]-sectionAvgs[b]).slice(0,2);
  const strongest=SECTION_ORDER.filter(t=>sectionAvgs[t]>0).sort((a,b)=>sectionAvgs[b]-sectionAvgs[a]).slice(0,2);

  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[
          {icon:"📋",l:"Sessions",v:sessionCount,c:C.blue},
          {icon:"🎯",l:"Average",  v:avgTotal?`${avgTotal}%`:"—",c:avgTotal>=85?C.green:avgTotal>=70?C.amber:C.red},
          {icon:"📈",l:"Trend",    v:last3.length>=2?(trend>=0?`+${trend}%`:`${trend}%`):"—",c:trend>=0?C.green:C.red},
          {icon:"🏫",l:"Mock Done",v:history.filter(h=>h.isMockExam).length,c:"#7C3AED"},
        ].map((s,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:14,padding:"12px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <div style={{fontSize:22}}>{s.icon}</div>
            <div style={{fontSize:19,fontWeight:900,color:s.c,margin:"4px 0 2px"}}>{s.v}</div>
            <div style={{fontSize:10,color:C.muted,fontWeight:600}}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>📊 Section Performance</div>
        {SECTION_ORDER.map(type=>{
          const meta=SECTIONS[type]; const avg=sectionAvgs[type]; if(!avg) return null;
          const col=avg>=85?C.green:avg>=70?C.amber:C.red;
          const tr=sectionTrends[type];
          return(
            <div key={type} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                <span style={{fontSize:12,fontWeight:700}}>{meta.icon} {meta.label}</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {tr!=null&&<span style={{fontSize:9,color:tr>=0?C.green:C.red,fontWeight:700}}>{tr>=0?`▲+${tr}%`:`▼${tr}%`}</span>}
                  <span style={{fontSize:12,fontWeight:800,color:col}}>{avg}%</span>
                </div>
              </div>
              <div style={{background:"#EEF2F7",borderRadius:6,height:7}}>
                <div style={{background:col,borderRadius:6,height:7,width:`${avg}%`,transition:"width 0.6s"}}/>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <div style={{background:C.lGreen,border:`1.5px solid #A7F3D0`,borderRadius:14,padding:"12px"}}>
          <div style={{fontWeight:800,fontSize:11,color:"#065F46",marginBottom:6}}>💪 Strongest</div>
          {strongest.map((t,i)=><div key={i} style={{fontSize:11,color:"#065F46",marginBottom:3}}>{SECTIONS[t]?.icon} {SECTIONS[t]?.label?.replace(" MCQ","")}: <strong>{sectionAvgs[t]}%</strong></div>)}
        </div>
        <div style={{background:C.lRed,border:`1.5px solid #FECACA`,borderRadius:14,padding:"12px"}}>
          <div style={{fontWeight:800,fontSize:11,color:C.red,marginBottom:6}}>⚠️ Weakest</div>
          {weakest.map((t,i)=><div key={i} style={{fontSize:11,color:C.red,marginBottom:3}}>{SECTIONS[t]?.icon} {SECTIONS[t]?.label?.replace(" MCQ","")}: <strong>{sectionAvgs[t]}%</strong></div>)}
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:"14px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>📅 All Sessions</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{background:"#F8FAFC"}}>
              {["#","Date","Total","Gm%","Vc%","Comp%","Type"].map(h=><th key={h} style={{padding:"5px 3px",textAlign:"center",color:C.muted,fontWeight:700}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[...history].reverse().map((h,i)=>{
                const c=h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
                return(<tr key={i} style={{background:i%2===0?"#fff":"#F8FAFC",borderTop:`1px solid ${C.border}`}}>
                  <td style={{padding:"6px 3px",textAlign:"center",fontWeight:700}}>{h.sessionNum}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:C.muted,whiteSpace:"nowrap"}}>{h.date.split(" ").slice(0,2).join(" ")}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",fontWeight:900,color:c}}>{h.totalPct}%</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:(h.scores.GrammarMCQ||0)>=70?C.green:C.red}}>{h.scores.GrammarMCQ||"-"}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:(h.scores.VocabMCQ||0)>=70?C.green:C.red}}>{h.scores.VocabMCQ||"-"}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:(h.scores.Comprehension||0)>=70?C.green:C.red}}>{h.scores.Comprehension||"-"}</td>
                  <td style={{padding:"6px 3px",textAlign:"center"}}>{h.isMockExam?"🏫":"📝"}</td>
                </tr>);
              })}
            </tbody>
          </table>

          {/* Topic Weakness Analysis */}
          {(()=>{
            const allMistakes=(history||[]).flatMap(h=>h.mistakes||[]);
            if(!allMistakes.length) return null;
            const tc={};
            allMistakes.forEach(m=>{const k=m.topic||m.sectionType||"Other";tc[k]=(tc[k]||0)+1;});
            const topTopics=Object.entries(tc).sort((a,b)=>b[1]-a[1]).slice(0,4);
            const total=allMistakes.length;
            const topicColors={"Numbers":"#3B82F6","Addition":"#10B981","Subtraction":"#F59E0B",
              "Multiplication":"#7C3AED","Division":"#F97316","Money":"#0D9488",
              "Word Problem":"#0891B2","Grammar":"#3B82F6","Vocabulary":"#8B5CF6","Other":"#64748B"};
            return(
              <div style={{padding:"0 16px 16px"}}>
                <div style={{background:"#fff",borderRadius:16,padding:"16px",
                  boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:12}}>
                    🎯 Weakest Topics (All Time)
                  </div>
                  {topTopics.map(([topic,count],i)=>{
                    const col=topicColors[topic]||"#64748B";
                    const pct=Math.round(count/total*100);
                    return(
                      <div key={topic} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{width:8,height:8,borderRadius:"50%",
                              background:col,display:"inline-block",flexShrink:0}}/>
                            <span style={{fontSize:12,fontWeight:700,color:C.text}}>{topic}</span>
                            {i===0&&<span style={{background:"#FEE2E2",color:"#991B1B",fontSize:9,
                              fontWeight:800,padding:"1px 6px",borderRadius:6}}>Most Weak</span>}
                          </div>
                          <span style={{fontSize:11,color:C.muted,fontWeight:600}}>
                            {count} mistake{count>1?"s":""}
                          </span>
                        </div>
                        <div style={{background:"#F1F5F9",borderRadius:6,height:7}}>
                          <div style={{background:col,borderRadius:6,height:7,
                            width:pct+"%",transition:"width .5s"}}/>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{background:"#F0FDF4",borderRadius:10,padding:"8px 12px",
                    marginTop:8,fontSize:11,color:"#065F46",fontWeight:600,lineHeight:1.5}}>
                    📌 Tip: Focus tutoring sessions on{" "}
                    <strong>{topTopics[0]?.[0]||"all topics"}</strong> first.
                  </div>

                  {/* Difficulty breakdown */}
                  {(()=>{
                    const mByDiff = {foundation:[],core:[],stretch:[]};
                    allMistakes.forEach(m=>{
                      const d = m.difficulty||"core";
                      if(mByDiff[d]) mByDiff[d].push(m);
                    });
                    if(!allMistakes.length) return null;
                    return(
                      <div style={{marginTop:12}}>
                        <div style={{fontSize:11,fontWeight:800,color:C.muted,marginBottom:8,
                          textTransform:"uppercase",letterSpacing:.8}}>Mistakes by Difficulty Level</div>
                        {[
                          ["foundation","⬤ Foundation","#1D4ED8","#DBEAFE","P3 basic level"],
                          ["core","⬤⬤ Core","#92400E","#FEF3C7","Standard P3 exam"],
                          ["stretch","⬤⬤⬤ Stretch","#991B1B","#FEE2E2","Above average"],
                        ].map(([key,label,col,bg,desc])=>(
                          <div key={key} style={{display:"flex",alignItems:"center",gap:10,
                            padding:"7px 10px",borderRadius:9,background:bg,marginBottom:6}}>
                            <span style={{fontSize:11,fontWeight:800,color:col,minWidth:90}}>{label}</span>
                            <span style={{fontSize:11,color:C.text,flex:1}}>{desc}</span>
                            <span style={{fontSize:13,fontWeight:900,color:col}}>
                              {mByDiff[key].length} mistake{mByDiff[key].length!==1?"s":""}
                            </span>
                          </div>
                        ))}
                        <div style={{fontSize:10,color:C.muted,marginTop:6,fontStyle:"italic"}}>
                          Based on past session mistakes. More data improves accuracy.
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ── Parent: Settings tab ──────────────────────────────────────
function ParentSettings({child, settings, onUpdate, advice, onApplyAdvice}){
  const S=settings||DEFAULT_SETTINGS;
  return(
    <div>
      {advice.filter(a=>a.type!=="maintain").length>0&&(
        <div style={{background:"#FFFBEB",border:"1.5px solid #FDE68A",borderRadius:14,padding:"12px",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:12,color:"#92400E",marginBottom:8}}>💡 AI Recommends</div>
          {advice.filter(a=>a.type!=="maintain").slice(0,2).map((adv,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,background:"#fff",borderRadius:10,padding:"10px"}}>
              <span style={{fontSize:18,flexShrink:0}}>{adv.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:800,color:adv.priority.includes("High")?"#DC2626":"#059669",marginBottom:2}}>{adv.priority}</div>
                <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:6}}>{adv.text}</div>
              </div>
              {adv.action&&<button onClick={()=>onApplyAdvice(adv)} style={{background:C.navy,color:"#fff",border:"none",borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>Apply</button>}
            </div>
          ))}
        </div>
      )}
      {["GrammarMCQ","VocabMCQ"].map(type=>{
        const meta=SECTIONS[type];
        return(
          <div key={type} style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{fontSize:18}}>{meta.icon}</span><div style={{fontWeight:800,fontSize:13}}>{meta.label}</div></div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:5}}>Questions: <strong style={{color:C.navy}}>{S[type]?.count||16}</strong></div>
              <input type="range" min={8} max={24} step={2} value={S[type]?.count||16} onChange={e=>onUpdate(type,"count",+e.target.value)} style={{width:"100%",accentColor:C.navy}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted}}><span>8</span><span>16 (default)</span><span>24</span></div>
            </div>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:5}}>Difficulty</div>
            <div style={{display:"flex",gap:5}}>
              {[["standard","Standard"],["mixed","Mixed"],["advanced","Advanced"]].map(([v,l])=>(
                <button key={v} onClick={()=>onUpdate(type,"difficulty",v)} style={{flex:1,background:(S[type]?.difficulty||"standard")===v?C.navy:"#F1F5F9",color:(S[type]?.difficulty||"standard")===v?"#fff":C.muted,border:"none",borderRadius:8,padding:"7px 4px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{l}</button>
              ))}
            </div>
          </div>
        );
      })}
      {["GrammarCloze","VocabCloze","Editing","Comprehension"].map(type=>{
        const meta=SECTIONS[type]; const sets=S[type]?.sets||1;
        return(
          <div key={type} style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontSize:18}}>{meta.icon}</span><div style={{fontWeight:800,fontSize:13}}>{meta.label}</div></div>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:8}}>Sets: <strong style={{color:C.navy}}>{sets}</strong> ({sets*(meta.blanksPerSet||6)} questions)</div>
            <div style={{display:"flex",gap:6}}>
              {[1,2,3].map(n=><button key={n} onClick={()=>onUpdate(type,"sets",n)} style={{flex:1,background:sets===n?meta.color:"#F1F5F9",color:sets===n?"#fff":C.muted,border:"none",borderRadius:8,padding:"9px",fontSize:12,fontWeight:800,cursor:"pointer"}}>{n} {n===1?"set":"sets"}</button>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Parent: Mock exams tab ────────────────────────────────────
function ParentMockTab({child, history}){
  const mockH=history.filter(h=>h.isMockExam);
  const regularH=history.filter(h=>!h.isMockExam);
  const sectionAvgsAll={};
  regularH.forEach(h=>{ SECTION_ORDER.forEach(t=>{ if(h.scores[t]!=null){ if(!sectionAvgsAll[t]) sectionAvgsAll[t]=[]; sectionAvgsAll[t].push(h.scores[t]); } }); });

  return(
    <div>
      <div style={{background:"#F5F3FF",border:"1.5px solid #DDD6FE",borderRadius:14,padding:"12px",marginBottom:14}}>
        <div style={{fontWeight:800,fontSize:13,color:"#4C1D95",marginBottom:4}}>🏫 Mock Exams</div>
        <div style={{fontSize:12,color:"#6D28D9",lineHeight:1.6}}>Every 10 practice sessions, {child?.name} receives a real school paper style mock exam. Compare performance against actual school benchmarks.</div>
      </div>
      {mockH.length===0?(
        <div style={{textAlign:"center",padding:"36px",background:"#fff",borderRadius:16,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:36,marginBottom:10}}>🏫</div>
          <div style={{fontSize:14,fontWeight:700}}>No mock exams yet</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{regularH.length}/10 sessions done</div>
          <div style={{marginTop:12,background:"#F1F5F9",borderRadius:8,height:8}}>
            <div style={{background:C.navy,borderRadius:8,height:8,width:`${Math.min(regularH.length*10,100)}%`}}/>
          </div>
        </div>
      ):(
        mockH.map((h,i)=>{
          const col=h.totalPct>=70?C.green:h.totalPct>=55?C.amber:C.red;
          return(
            <div key={i} style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <div><div style={{fontWeight:800,fontSize:14}}>🏫 {h.school}</div><div style={{fontSize:11,color:C.muted}}>{h.examType} · {h.date}</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:col}}>{h.totalPct}%</div><div style={{fontSize:9,color:col}}>{h.totalPct>=70?"On Track":h.totalPct>=55?"Getting There":"Needs Work"}</div></div>
              </div>
              {SECTION_ORDER.filter(t=>h.scores[t]!=null).map(type=>{
                const meta=SECTIONS[type]; const pAvg=sectionAvgsAll[type]?.length?Math.round(sectionAvgsAll[type].reduce((a,b)=>a+b,0)/sectionAvgsAll[type].length):0;
                const ms=h.scores[type]||0; const diff=ms-pAvg;
                return(
                  <div key={type} style={{marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,fontSize:11}}>
                      <span style={{fontWeight:700}}>{meta.icon} {meta.label.replace(" MCQ","")}</span>
                      <span style={{color:C.muted}}>Practice: {pAvg}% → <strong style={{color:ms>=70?C.green:C.red}}>Mock: {ms}%</strong> <span style={{color:diff>=0?C.green:C.red,fontSize:10}}>{diff>=0?`(+${diff})`:diff}</span></span>
                    </div>
                    <div style={{background:"#E2E8F0",borderRadius:5,height:5,position:"relative"}}>
                      <div style={{background:C.muted+"60",borderRadius:5,height:5,width:`${pAvg}%`,position:"absolute"}}/>
                      <div style={{background:ms>=70?C.green:C.red,borderRadius:5,height:5,width:`${ms}%`,position:"absolute"}}/>
                    </div>
                  </div>
                );
              })}
              <div style={{marginTop:10,background:col+"15",borderRadius:8,padding:"8px 10px",fontSize:11,color:col,fontWeight:600,lineHeight:1.6}}>
                {h.totalPct>=70?`✅ ${child?.name} is on track for ${h.school} ${h.examType} level!`:h.totalPct>=55?`📈 Making progress. Focus on weaker sections.`:`⚠️ More practice needed. See AI Advice tab for recommendations.`}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// ── Parent: AI advice tab ─────────────────────────────────────
function ParentAdviceTab({advice, child, onApply}){
  return(
    <div>
      <div style={{background:C.lBlue,border:`1px solid #BAE6FD`,borderRadius:12,padding:"11px 13px",marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:"#1D4ED8",marginBottom:3}}>🤖 AI Analysis — {child?.name}</div>
        <div style={{fontSize:11,color:"#1E40AF",lineHeight:1.6}}>Based on recent performance across all sessions. Apply recommendations directly to settings.</div>
      </div>
      {advice.map((adv,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:40,height:40,borderRadius:12,background:adv.type==="increase"?C.lRed:adv.type==="advance"?C.lGreen:C.lAmber,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{adv.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:10,fontWeight:800,color:adv.priority.includes("High")?"#DC2626":adv.priority.includes("Advance")?"#059669":"#D97706",marginBottom:3}}>{adv.priority} · {SECTIONS[adv.section]?.label||"All"}</div>
              <div style={{fontSize:12,color:C.text,lineHeight:1.7,marginBottom:8}}>{adv.text}</div>
              {adv.action&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>{Object.entries(adv.action).map(([k,v])=><div key={k} style={{background:"#F1F5F9",borderRadius:7,padding:"3px 9px",fontSize:10,fontWeight:700,color:C.navy}}>{k}: {String(v)}</div>)}</div>}
              {adv.action&&<button onClick={()=>onApply(adv)} style={{background:`linear-gradient(135deg,${C.navy},#2563EB)`,color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontSize:11,fontWeight:800,cursor:"pointer"}}>✅ Apply to Settings</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Parent App (main container) ───────────────────────────────
// Server mode only: parent creates a child account (username + password the parent chooses).
function AddChildForm({onCreated,onChildLinked,empty}){
  // Picture password (same picker + server hashing as the student picture sign-up) when ClewQuest is on; otherwise the old typed password.
  const pic = clewquestEnabled();
  const blank = {username:"",first:"",last:"",grade:"P3",school:"",password:""};
  const [open, setOpen] = useState(!!empty); // open by default when the parent has no linked child yet
  const [codeOpen, setCodeOpen] = useState(false); // small collapsed "Link with a code" fallback
  const [done, setDone] = useState(null); // {name, username, seq|null} after a successful create
  const [f, setF] = useState(blank);
  const [idTouched, setIdTouched] = useState(false); // once the parent edits the Login ID, stop auto-suggesting
  const [a, setA] = useState([]); const [b, setB] = useState([]);
  const [chk, setChk] = useState({state:"",key:"",nameFree:null,idFree:null}); // state: "" | "checking" | "done" | "error"
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const lbl={display:"block",fontSize:12,fontWeight:800,color:"#334155",marginBottom:4};
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  const first=cleanNamePart(f.first), last=cleanNamePart(f.last), full=fullName(first,last);
  const username=f.username.trim();
  const idProblem=loginIdProblem(f.username);
  const key=full.toLowerCase()+"|"+username.toLowerCase();
  const checked = chk.state==="done" && chk.key===key;
  const nameOk = checked && chk.nameFree && chk.idFree && !idProblem && !!first && !!username;
  function setName(k,v){
    setF(p=>{
      const n={...p,[k]:v};
      if(!idTouched) n.username=suggestLoginId(n.first,n.last); // suggestion strips every space
      return n;
    });
  }
  async function check(){
    if(!first) return setErr("Type the child's first name first.");
    if(!username) return setErr("Type a login ID first.");
    if(idProblem) return setErr(idProblem);
    setErr(""); setChk({state:"checking",key,nameFree:null,idFree:null});
    const r = await serverPost("/api/parent/children/check-name",{firstName:first,lastName:last,username});
    setChk(r.ok ? {state:"done",key,nameFree:!!r.available,idFree:r.usernameAvailable!==false} : {state:"error",key,nameFree:null,idFree:null});
  }
  async function submit(){
    setErr(""); setOk("");
    if(!nameOk) return setErr("Check that the name and login ID are available first.");
    if(pic){
      if(a.length!==CODE_LENGTH || a.join()!==b.join()){ setB([]); return setErr("Pick the same 4 pictures twice."); }
    } else if(f.password.length<6) return setErr("Password must be at least 6 characters.");
    setBusy(true);
    const body = {username,firstName:first,lastName:last,name:full,grade:f.grade,school:f.school,password:f.password};
    const r = pic ? await cqPost("/api/parent/children/picture",{...body,sequence:a}) : await serverPost("/api/parent/children",body);
    setBusy(false);
    if(!r.ok){
      if(r.status===409 && r.error==="display name taken"){ setChk(c=>({...c,nameFree:false})); return setErr("That name is already taken."); }
      if(r.status===409){ setChk(c=>({...c,idFree:false})); return setErr("That login ID is already taken."); }
      return setErr(r.error||"Could not create child.");
    }
    onCreated&&onCreated(r.child);
    setDone({name:r.child.name||full,username:r.child.username||username,seq:pic?[...a]:null});
    setF(blank); setIdTouched(false); setA([]); setB([]); setChk({state:"",key:"",nameFree:null,idFree:null});
  }
  const st=(good,text,tid)=><div data-testid={tid} style={{color:good?"#065F46":"#B91C1C",fontSize:12,fontWeight:700,marginBottom:8}}>{text}</div>;
  const big = !!empty || open;
  return(
    <div data-testid="add-child-card" style={{background:"#fff",border:`${empty?2:1}px solid ${empty?"#7C3AED":C.border}`,borderRadius:14,padding:empty?16:12,marginBottom:14}}>
      {done&&(
        <div data-testid="ac-success" style={{background:"#ECFDF5",border:"1px solid #6EE7B7",borderRadius:12,padding:16,marginBottom:12,textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:4}}>🎉</div>
          <div style={{fontSize:20,fontWeight:900,color:"#065F46",marginBottom:6}}>{done.name} is ready!</div>
          <div style={{fontSize:14,color:"#064E3B",lineHeight:1.5,marginBottom:10}}>
            {done.seq
              ? <>On your child's device, open <b>clewquest.com</b>, tap <b>Log in</b>, type <b>{done.username}</b> and tap the 4 pictures.</>
              : <>On your child's device, open <b>clewquest.com</b>, tap <b>Log in</b>, type <b>{done.username}</b> and the password you set.</>}
          </div>
          <div style={{fontSize:11,fontWeight:800,color:"#475569",textTransform:"uppercase",letterSpacing:0.5}}>Login ID</div>
          <div data-testid="ac-success-id" style={{fontSize:22,fontWeight:900,color:"#0F172A",marginBottom:done.seq?10:0}}>{done.username}</div>
          {done.seq&&(<div data-testid="ac-success-pics" style={{display:"flex",gap:8,justifyContent:"center"}}>
            {done.seq.map((i,n)=>(<div key={n} style={{background:"#fff",border:"1px solid #A7F3D0",borderRadius:10,padding:"6px 8px",minWidth:56}}>
              <div style={{fontSize:28,lineHeight:1.2}}>{PICTURES[i]?.glyph}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#475569"}}>{n+1}. {PICTURES[i]?.label}</div>
            </div>))}
          </div>)}
          <div style={{fontSize:12,color:"#065F46",marginTop:10}}>{done.name} now appears in your dashboard.</div>
          <button data-testid="ac-another" onClick={()=>{ setDone(null); setOpen(true); }} style={{marginTop:10,background:"none",border:"1px solid #6EE7B7",borderRadius:10,padding:"7px 14px",fontWeight:800,fontSize:12,color:"#065F46",cursor:"pointer"}}>Add another child</button>
        </div>
      )}
      {!done&&empty
        ? <div style={{fontWeight:900,fontSize:18,color:"#4C1D95",marginBottom:2}}>Add my child</div>
        : <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:big&&open?15:13,color:"#4C1D95",padding:0}}>{open?"− ":"＋ "}Add my child</button>}
      {(empty&&!done||open&&!empty)&&(
        <div style={{marginTop:10}}>
          {empty&&<div style={{fontSize:13,color:C.muted,marginBottom:10}}>Create your child's account here. It is linked to you straight away. No codes to copy.</div>}
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1}}>
              <label htmlFor="ac-first" style={lbl}>Child's first name</label>
              <input id="ac-first" data-testid="ac-first" style={inp} placeholder="e.g. Joon Hee" value={f.first} onChange={e=>setName("first",e.target.value)}/>
            </div>
            <div style={{flex:1}}>
              <label htmlFor="ac-last" style={lbl}>Child's last name</label>
              <input id="ac-last" data-testid="ac-last" style={inp} placeholder="e.g. Kim" value={f.last} onChange={e=>setName("last",e.target.value)}/>
            </div>
          </div>
          <label htmlFor="ac-username" style={lbl}>Login ID</label>
          <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
            <input id="ac-username" data-testid="ac-username" style={{...inp,flex:1,width:"auto",marginBottom:4,borderColor:idProblem?"#B91C1C":C.border}} placeholder="e.g. Aquacat01" value={f.username} onChange={e=>{ setIdTouched(true); set("username",e.target.value); }} autoCapitalize="none" autoCorrect="off" spellCheck={false}/>
            <button type="button" data-testid="ac-check" disabled={chk.state==="checking"} onClick={check} style={{background:"#4C1D95",color:"#fff",border:"none",borderRadius:8,padding:"9px 14px",fontWeight:800,fontSize:13,cursor:"pointer"}}>{chk.state==="checking"?"Checking...":"Check"}</button>
          </div>
          {idProblem
            ? <div data-testid="ac-id-problem" style={{color:"#B91C1C",fontSize:12,fontWeight:700,marginBottom:8}}>{idProblem}</div>
            : <div style={{color:C.muted,fontSize:11,marginBottom:8}}>3-30 characters: letters (A-Z, a-z), numbers (0-9) and _ only. Capital letters are kept, but Aquacat01 and aquacat01 count as the same ID.</div>}
          {checked&&chk.nameFree&&st(true,"Name available","ac-name-status")}
          {checked&&!chk.nameFree&&st(false,"That name is already taken","ac-name-status")}
          {checked&&!chk.idFree&&st(false,"That login ID is already taken","ac-id-status")}
          {checked&&chk.idFree&&!idProblem&&st(true,"Login ID available","ac-id-status")}
          {chk.state==="error"&&<div data-testid="ac-name-status" style={{color:"#B91C1C",fontSize:12,marginBottom:8}}>Could not check. Try again.</div>}
          <label htmlFor="ac-grade" style={lbl}>Level</label>
          <select id="ac-grade" style={inp} value={f.grade} onChange={e=>set("grade",e.target.value)}>{GRADES.map(g=><option key={g} value={g}>{g}</option>)}</select>
          <label style={lbl}>School</label>
          <SchoolCombobox value={f.school} onChange={v=>set("school",v)} border={C.border}/>
          {pic?(<div style={{marginBottom:8}}>
            <span style={lbl}>Picture password</span>
            <PicturePad value={a} onChange={setA} label="Pick 4 pictures in order (your child's secret code)"/>
            {a.length===CODE_LENGTH&&<div style={{marginTop:10}}><PicturePad value={b} onChange={setB} label="Pick the same 4 pictures again"/></div>}
          </div>):(<>
            <label htmlFor="ac-pw" style={lbl}>Password</label>
            <input id="ac-pw" style={inp} type="password" placeholder="Child's password (min 6 chars)" value={f.password} onChange={e=>set("password",e.target.value)}/>
          </>)}
          {err&&<div style={{color:"#B91C1C",fontSize:12,marginBottom:8}}>{err}</div>}
          {ok&&<div style={{color:"#065F46",fontSize:12,marginBottom:8}}>{ok}</div>}
          <button data-testid="ac-create" disabled={busy||!nameOk} onClick={submit} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:nameOk?"pointer":"not-allowed",opacity:nameOk?1:0.55}}>{busy?"Creating...":"Create child account"}</button>
        </div>
      )}
      {(open||empty)&&(<div style={{marginTop:12,paddingTop:8,borderTop:"1px solid #E2E8F0"}}>
        <button data-testid="code-link-toggle" onClick={()=>setCodeOpen(o=>!o)} style={{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:11,color:C.muted,textDecoration:"underline"}}>Child already has an account? Link with a code</button>
        {codeOpen&&(pic&&SERVER_AUTH?<ParentPictureChild onChildLinked={onChildLinked||onCreated}/>:<LegacyLinkChild onChildLinked={onChildLinked||onCreated}/>)}
      </div>)}
    </div>
  );
}

// Old username + password link, only used when ClewQuest picture codes are off.
function LegacyLinkChild({onChildLinked}){
  const [lu,setLu]=useState(""); const [lp,setLp]=useState(""); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  async function linkChild(){ setBusy(true); setMsg(""); const r=await serverPost("/api/parent/children/link",{username:lu,password:lp}); setBusy(false); if(r.ok){ onChildLinked&&onChildLinked(r.child); setMsg("Linked "+r.child.name+"."); setLu(""); setLp(""); } else setMsg(r.error||"Failed."); }
  return(<div style={{marginTop:8}}>
    <input style={inp} placeholder="Child's login ID" value={lu} onChange={e=>setLu(e.target.value)}/>
    <input style={inp} type="password" placeholder="Child's password" value={lp} onChange={e=>setLp(e.target.value)}/>
    <button disabled={busy} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer",marginBottom:8}} onClick={linkChild}>Link child</button>
    {msg&&<div style={{fontSize:12,color:C.muted}}>{msg}</div>}
  </div>);
}

// ── Server mode only ──────────────────────────────────────────
// "Did they do it today?": read from the server (daily_activity), so it works from any device.
function TodayCard({linkedStudents}){
  const [data,setData]=useState(null); const [err,setErr]=useState("");
  useEffect(()=>{
    let off=false;
    const load=()=>serverGet("/api/parent/today").then(r=>{ if(off) return; if(r.ok){ setData(r); setErr(""); } else setErr("Could not load today's activity."); });
    load();
    const onSettings=()=>load();
    window.addEventListener("genius-parent-settings", onSettings);
    return ()=>{ off=true; window.removeEventListener("genius-parent-settings", onSettings); };
  },[linkedStudents.length]);
  if(err) return <div style={{fontSize:12,color:C.muted,marginBottom:14}}>{err}</div>;
  if(!data||!data.children.length) return null;
  return(
    <div style={{marginBottom:14}}>
      {data.children.map(c=>{
        const subs=Object.entries(c.subjects).filter(([k,v])=>v.target>0&&LIVE_CONTENT[`${c.grade||"P3"}_${k}`]);
        const allDone=subs.length>0&&subs.every(([,v])=>v.sets>=v.target);
        return(
          <div key={c.id} style={{background:"#fff",border:`2px solid ${allDone?"#10B981":"#F59E0B"}`,borderRadius:14,padding:14,marginBottom:10}}>
            <div style={{fontWeight:900,fontSize:14,color:"#0F172A",marginBottom:8}}>Did {c.name} do it today? {allDone?"🎉":""}</div>
            {subs.map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"3px 0"}}>
                <span>{SUBJECTS[k]?.icon} {k}</span><span style={{fontWeight:800}}>{v.sets>=v.target?"✅":"❌"} {v.sets}/{v.target} set{v.target===1?"":"s"}</span>
              </div>
            ))}
            <div style={{fontSize:12,color:C.muted,marginTop:8}}>Questions today: <b>{c.questions}</b> · Accuracy: <b>{c.accuracy==null?"–":c.accuracy+"%"}</b></div>
            <div style={{display:"flex",gap:4,marginTop:8}} title="Last 7 days">
              {c.strip.map(d=>(<div key={d.date} style={{flex:1,textAlign:"center"}}>
                <div style={{height:14,borderRadius:4,background:d.sets>0?"#10B981":"#E2E8F0"}}/>
                <div style={{fontSize:9,color:C.muted,marginTop:2}}>{d.date.slice(8)}</div></div>))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Share a child with another parent (by their registered email).
function GuardianTools({linkedStudents,onChildLinked}){
  const [open,setOpen]=useState(false);
  const [email,setEmail]=useState(""); const [childId,setChildId]=useState(linkedStudents[0]?.serverId||"");
  const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  const btn={background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer",marginBottom:12};
  const [inv,setInv]=useState({sent:[],received:[]});
  const loadInv=()=>serverGet("/api/parent/co-parents").then(r=>{ if(r.ok) setInv({sent:r.sent||[],received:r.received||[]}); });
  useEffect(()=>{ loadInv(); },[]);
  async function linkParent(){ setBusy(true); setMsg(""); const r=await serverPost("/api/parent/co-parents",{email,childId:childId||linkedStudents[0]?.serverId}); setBusy(false); setMsg(r.ok?r.message:(r.error||"Failed.")); if(r.ok){ setEmail(""); loadInv(); } }
  async function revokeInvite(id){ setBusy(true); const r=await serverPost("/api/parent/co-parents/revoke",{inviteId:id}); setBusy(false); setMsg(r.ok?r.message:(r.error||"Failed.")); loadInv(); }
  async function acceptInvite(id){
    setBusy(true); setMsg("");
    const r=await serverPost("/api/parent/co-parents/accept",{inviteId:id});
    setBusy(false);
    setMsg(r.ok?r.message:(r.error||"Failed."));
    if(r.ok){
      if(r.child) onChildLinked&&onChildLinked(r.child);
      setInv(v=>({...v, received:(v.received||[]).filter(x=>x.id!==id)}));
    } else loadInv();
  }
  return(
    <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:14}}>
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:13,color:"#4C1D95",padding:0}}>{open?"− ":"＋ "}Share with another parent</button>
      {inv.received.length>0&&(<div style={{marginTop:10,background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:10,padding:10}}>
        <div style={{fontSize:12,fontWeight:800,marginBottom:6}}>Invitations for you</div>
        {inv.received.map(i=>(<div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,fontSize:13,marginBottom:4}}>
          <span>{i.inviterName||"A parent"} invited you to follow <b>{i.childName||"a child"}</b></span>
          <button disabled={busy} style={{...btn,marginBottom:0,padding:"6px 12px"}} onClick={()=>acceptInvite(i.id)}>Accept</button></div>))}
      </div>)}
      {open&&(<div style={{marginTop:10}}>
        {linkedStudents.length>0&&(<>
          <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>Add another parent to a child</div>
          <select style={inp} value={childId} onChange={e=>setChildId(e.target.value)}>{linkedStudents.map(s=><option key={s.id} value={s.serverId||""} disabled={!s.serverId}>{s.name}</option>)}</select>
          <input style={inp} placeholder="Other parent's email (they log in or sign up with it, then accept)" value={email} onChange={e=>setEmail(e.target.value)}/>
          <button disabled={busy} style={btn} onClick={linkParent}>Send invite</button>
          {inv.sent.length>0&&(<div style={{marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>Pending invites (expire after 7 days)</div>
            {inv.sent.map(i=>(<div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,fontSize:12,marginBottom:4}}>
              <span>{i.email} → {i.childName} · expires {String(i.expiresAt).slice(0,10)}</span>
              <button disabled={busy} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:12}} onClick={()=>revokeInvite(i.id)}>Revoke</button></div>))}
          </div>)}
        </>)}
        {msg&&<div style={{fontSize:12,color:C.muted}}>{msg}</div>}
      </div>)}
    </div>
  );
}

// Alert channels (per parent). The daily target is now the child's shared setting: see ParentChildSettings.
// WhatsApp is stored only; sending stays off until the owner enables the provider.
function AlertSettings(){
  const [open,setOpen]=useState(false); const [num,setNum]=useState(""); const [opt,setOpt]=useState(false); const [msg,setMsg]=useState(""); const [em,setEm]=useState(true);
  const [qOn,setQOn]=useState(true); const [qs,setQs]=useState("21:30"); const [qe,setQe]=useState("06:30");
  useEffect(()=>{ if(!open) return; serverGet("/api/parent/settings").then(r=>{ const e=(r.channels||[]).find(c=>c.type==="email"); setEm(e?!!e.enabled:true); /* no email entry (older account) = on by default */ const w=(r.channels||[]).find(c=>c.type==="whatsapp"); if(w){ setNum(w.address||""); setOpt(!!w.opt_in); } if(r.quiet){ setQOn(r.quiet.enabled!==false); setQs(r.quiet.start); setQe(r.quiet.end); } }); },[open]);
  async function save(){
    setMsg("");
    const r=await serverPost("/api/parent/settings",{email:{enabled:em},whatsapp:{number:num.trim(),optIn:opt},quiet:{enabled:qOn,start:qs,end:qe}});
    setMsg(r.ok?"Saved.":(r.error||"Failed."));
    if(r.ok){ try{ window.dispatchEvent(new Event("genius-parent-settings")); }catch{} }
  }
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  return(
    <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:14}}>
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:13,color:"#4C1D95",padding:0}}>{open?"− ":"＋ "}Alerts</button>
      {open&&(<div style={{marginTop:10}}>
        <label style={{fontSize:12,display:"block",margin:"10px 0 8px"}}><input type="checkbox" checked={em} onChange={e=>setEm(e.target.checked)}/> Email me when my child finishes a set, a paper or assigned homework, plus the weekly report</label>
        <input style={inp} placeholder="WhatsApp number, e.g. +6591234567" value={num} onChange={e=>setNum(e.target.value)}/>
        <label style={{fontSize:12,display:"block",marginBottom:8}}><input type="checkbox" checked={opt} onChange={e=>setOpt(e.target.checked)}/> Send me daily WhatsApp alerts (coming soon; saved for when it is switched on)</label>
        <label style={{fontSize:12,display:"block",marginBottom:6}}><input type="checkbox" checked={qOn} onChange={e=>setQOn(e.target.checked)}/> Quiet hours for live alerts (Singapore time). Alerts that arrive in this window are held and sent when it ends.</label>
        {qOn&&<div style={{fontSize:12,marginBottom:8}}>From <input type="time" value={qs} onChange={e=>setQs(e.target.value)}/> to <input type="time" value={qe} onChange={e=>setQe(e.target.value)}/></div>}
        <button onClick={save} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer"}}>Save</button>
        {msg&&<span style={{fontSize:12,color:C.muted,marginLeft:10}}>{msg}</span>}
      </div>)}
    </div>
  );
}

function ParentApp({user, linkedStudents, onLogout, getProgress, setProgress, refresh, onChildCreated, homeworkSimilarFor}){
  const [selectedId, setSelectedId] = useState(linkedStudents[0]?.id||null);
  const [grade,   setGrade]   = useState("P3");
  const [subject, setSubject] = useState("English");
  const [tab,     setTab]     = useState("overview");
  const [parentToast, setParentToast] = useState(null);

  // Auto-select a child: the first when none is chosen yet, and the newest-linked one when a child is added.
  const prevCount = React.useRef(linkedStudents.length);
  useEffect(()=>{
    const n=linkedStudents.length;
    if(!n){ prevCount.current=0; return; }
    if(n>prevCount.current) setSelectedId(linkedStudents[n-1].id);
    else if(!linkedStudents.some(s=>s.id===selectedId)) setSelectedId(linkedStudents[0].id);
    prevCount.current=n;
  },[linkedStudents.length]); // eslint-disable-line react-hooks/exhaustive-deps
  const child = linkedStudents.find(s=>s.id===selectedId) || (selectedId==null?linkedStudents[0]:undefined);
  const prog  = selectedId ? getProgress(selectedId, grade, subject) : null;
  const history  = prog?.history||[];
  const settings = prog?.settings||DEFAULT_SETTINGS;
  const advice   = history.length ? generateAdvice(history) : [];

  function applyAdvice(adv){
    if(!adv.action||!selectedId) return;
    const current=getProgress(selectedId,grade,subject);
    const newSettings={...current.settings};
    if(adv.section!=="all") newSettings[adv.section]={...newSettings[adv.section],...adv.action};
    setProgress(selectedId,grade,subject,{...current,settings:newSettings});
  }

  function updateSetting(section,key,value){
    const current=getProgress(selectedId,grade,subject);
    const ns={...current.settings,[section]:{...current.settings[section],[key]:value}};
    setProgress(selectedId,grade,subject,{...current,settings:ns});
  }

  return(
    <Wrap> <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",padding:"18px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{color:"rgba(255,255,255,0.55)",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>ClewQuest · Parent</div>
            <div style={{color:"#fff",fontSize:15,fontWeight:800}}>👩 {user.name}</div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"6px 12px",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:12,fontWeight:700}}>Logout</button>
        </div> {linkedStudents.length===0?(
          <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 14px",marginBottom:12}}>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>Add your child to get started.</div>
          </div>
        ):(
          <div style={{display:"flex",gap:8,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
            {linkedStudents.map(s=>(
              <button key={s.id} onClick={()=>{setSelectedId(s.id);setTab("overview");}} style={{background:selectedId===s.id?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.12)",border:"none",borderRadius:12,padding:"8px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0,transition:"all 0.2s"}}>
                <span style={{fontSize:18}}>{s.avatar||"👤"}</span>
                <div style={{textAlign:"left"}}>
                  <div style={{fontSize:12,fontWeight:800,color:selectedId===s.id?"#0F172A":"#fff"}}>{s.name}</div>
                  <div style={{fontSize:9,color:selectedId===s.id?C.muted:"rgba(255,255,255,0.5)"}}>{s.grade}</div>
                </div>
              </button>
            ))}
          </div>
        )} {child&&(
          <>
            <div style={{display:"flex",gap:6,marginBottom:10}}>
              {GRADES.map(g=>(
                <button key={g} onClick={()=>setGrade(g)} style={{background:grade===g?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"5px 12px",color:grade===g?"#0F172A":"rgba(255,255,255,0.6)",fontSize:12,fontWeight:800,cursor:"pointer",flexShrink:0}}>
                  {g}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.1)",marginBottom:0}}>
              {Object.entries(SUBJECTS).map(([key,sub])=>{
                const live=!!LIVE_CONTENT[`${grade}_${key}`];
                return(
                  <button key={key} onClick={()=>{ setSubject(key); if(!live) setParentToast("Coming Soon"); else setParentToast(null); }} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"8px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                    <span style={{fontSize:15}}>{sub.icon}</span>
                    <span style={{fontSize:9,fontWeight:subject===key?800:400,color:subject===key?"#fff":"rgba(255,255,255,0.4)"}}>{key}</span>
                    {!live&&<span style={{fontSize:6,color:"rgba(255,255,255,0.45)",fontWeight:700}}>Coming Soon</span>}
                  </button>
                );
              })}
            </div>
          </>
        )} {child&&(
          <div style={{display:"flex",gap:5,padding:"10px 0 0",overflowX:"auto"}}>
            {[["overview","📊 Overview"],...(SERVER_AUTH&&LEARNING_DASHBOARD&&child?.serverId?[["learning","📈 Learning"]]:[]),["mistakes","❌ Mistakes"],["settings","⚙️ Settings"],["mock","🏫 Mock"],["advice","AI Advice"],...(SERVER_AUTH&&REWARDS&&child?.serverId?[["rewards","🎁 Rewards"]]:[]),...(SERVER_AUTH&&MOCK_EXAMS_ENABLED&&child?.serverId&&subject==="English"?[["papers","📄 Papers"]]:[])].map(([t,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.1)",border:"none",borderRadius:10,padding:"7px 12px",color:tab===t?"#0F172A":"rgba(255,255,255,0.7)",fontSize:11,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{padding:"16px 16px 30px",overflowY:"auto"}}>
        {SERVER_AUTH&&onChildCreated&&<AddChildForm empty={linkedStudents.length===0} onCreated={onChildCreated} onChildLinked={onChildCreated}/>}
        {SERVER_AUTH&&onChildCreated&&<TodayCard linkedStudents={linkedStudents}/>}
        {SERVER_AUTH&&onChildCreated&&<GuardianTools linkedStudents={linkedStudents} onChildLinked={onChildCreated}/>}
        {SERVER_AUTH&&onChildCreated&&<AlertSettings/>}
        {!child&&linkedStudents.length===0&&(
          <div style={{textAlign:"center",padding:"48px 20px",color:C.muted}}>
            <div style={{fontSize:40,marginBottom:12}}>🔗</div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>No children linked yet</div>
            <div style={{fontSize:13,lineHeight:1.7}}>Use the Add my child card at the top to create your child's account.</div>
          </div>
        )}
        {parentToast&&<ComingSoonToast message={parentToast} onDone={()=>setParentToast(null)}/>}
        {child&&tab!=="rewards"&&tab!=="learning"&&tab!=="papers"&&!LIVE_CONTENT[`${grade}_${subject}`]&&<ComingSoonScreen grade={grade} subject={subject}/>}
        {child&&SERVER_AUTH&&LEARNING_DASHBOARD&&child.serverId&&tab==="learning" && (["English","Chinese"].includes(subject)?<LearningDashboard childId={child.serverId} subject={subject}/>:<ComingSoonScreen grade={grade} subject={subject}/>)}
        {child&&SERVER_AUTH&&MOCK_EXAMS_ENABLED&&child.serverId&&subject==="English"&&tab==="papers" && <ParentExams child={child}/>}
        {child&&SERVER_AUTH&&REWARDS&&tab==="rewards" && <ParentRewards child={child}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="overview"  && <ParentOverview  child={child} history={history} settings={settings} subject={subject}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="mistakes"  && <ParentMistakesTab child={child} history={history} grade={grade} subject={subject} homeworkSimilarFor={homeworkSimilarFor} notebookMistakes={prog?.mistakes||[]}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="settings"  && <ParentSettings  child={child} settings={settings} onUpdate={updateSetting} advice={advice} onApplyAdvice={applyAdvice}/>}
        {child&&SERVER_AUTH&&tab==="settings" && <ParentChildSettings child={child}/>}
        {child&&SERVER_AUTH&&clewquestEnabled()&&child.serverId&&tab==="settings" && <ParentPictureReset child={child}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="mock"      && <ParentMockTab   child={child} history={history}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="advice"    && <ParentAdviceTab advice={advice} child={child} onApply={applyAdvice}/>}
      </div>
    </Wrap>
  );
}

export { ParentApp };
