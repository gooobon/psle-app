"use client";
import React, { useState, useEffect } from "react";
import { CS as C, Wrap } from "@/lib/uiShared";
import { T, FONT, RADIUS, SHADOW, mainBtn, secondaryBtn } from "@/lib/theme/tokens";
import { SECTIONS, SECTION_ORDER } from "@/lib/quizMeta";
import { DEFAULT_SETTINGS, generateAdvice } from "@/lib/dataEngine";
import ParentExams from '@/components/ParentExams';
import { SERVER_AUTH, WRONG_ANSWERS_SYNC, PARENT_HOMEWORK, REWARDS, LEARNING_DASHBOARD, MOCK_EXAMS_ENABLED, serverPost, serverGet, serverPut } from "@/lib/serverClient";
import LearningDashboard from "@/components/LearningDashboard";
import ParentRewards from "@/components/ParentRewards";
import ParentChildSettings from "@/components/ParentChildSettings";
import ChildCard from "@/components/clewquest/ParentPictureReset";
import AddChild from "@/components/clewquest/AddChild";
import { clewquestEnabled } from "@/lib/clewquest/config";
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
  const box=(n,l,c)=>(<div style={{flex:1,textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:c}}>{n}</div><div style={{fontSize:10,fontWeight:700,color:"#6B6F7B"}}>{l}</div></div>);
  return(
    <div style={{background:"#FBF6EA",border:"1px solid #E2DBCF",borderRadius:14,padding:"12px 14px",marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:800,color:"#1B2340",marginBottom:8}}> Homework today · {st.usedToday} assigned</div>
      <div style={{display:"flex",gap:6}}>{box(t.assigned,"Assigned","#1B2340")}{box(t.solved,"Solved",T.success)}{box(t.remaining,"Remaining","#B3261E")}{box(t.correct,"Correct","#1F3F95")}</div>
      {(st.days||[]).filter(d=>d.date!==st.today).slice(0,6).map(d=>(
        <div key={d.date} style={{fontSize:11,color:"#6B6F7B",marginTop:6}}>{d.date}: {d.solved}/{d.assigned} solved, {d.correct} correct{d.remaining?`, ${d.remaining} not done`:""}</div>
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

  const diffColor = d => d==="foundation"?"#1F3F95":d==="core"?"#1B2340":d==="stretch"?"#B3261E":"#6B6F7B";
  const diffBg    = d => d==="foundation"?"#FBF6EA":d==="core"?"#FBF6EA":d==="stretch"?"#FBF6EA":"#FBF6EA";
  const diffLabel = d => d==="foundation"?"⬤ Foundation":d==="core"?"⬤⬤ Core":d==="stretch"?"⬤⬤⬤ Stretch":"Core";

  return(
    <div style={{padding:"4px 0"}}>
      {hwOn&&<HomeworkStatus child={child} refreshKey={hwKey}/>}
      <div style={{background:"#FBF6EA",border:"1px solid #E2DBCF",borderRadius:14,
        padding:"12px 14px",marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:800,color:"#1F3F95",marginBottom:4}}>
           Review Together
        </div>
        <div style={{fontSize:12,color:"#1F3F95",lineHeight:1.6}}>
          Sit with {child?.name||"your child"} and go through these together. Each card shows
          what they answered, the correct answer, and how to solve it step by step.
        </div>
      </div>

      {filtered.length===0 ? (
        <div style={{textAlign:"center",padding:"50px 20px",color:"#6B6F7B"}}>
          <div style={{fontSize:44,marginBottom:12}}></div>
          <div style={{fontSize:15,fontWeight:800,color:"#1B2340",marginBottom:6}}>
            No mistakes recorded yet!
          </div>
          <div style={{fontSize:13}}>Mistakes from practice sessions will appear here.</div>
        </div>
      ) : (
        <>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:10,marginBottom:6}}>
            <button onClick={()=>setFilterSession("all")}
              style={{background:filterSession==="all"?"#1F3F95":"#FBF6EA",
                color:filterSession==="all"?"#fff":"#6B6F7B",border:"none",borderRadius:20,
                padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer",
                whiteSpace:"nowrap",flexShrink:0}}>
              All ({allMistakes.length})
            </button>
            {sessions.map(s=>(
              <button key={s} onClick={()=>setFilterSession(String(s))}
                style={{background:filterSession===String(s)?"#1F3F95":"#FBF6EA",
                  color:filterSession===String(s)?"#fff":"#6B6F7B",border:"none",borderRadius:20,
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
                        <div style={{fontSize:12,fontWeight:700,color:"#1B2340",marginBottom:4,lineHeight:1.5}}>
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
                            <span style={{background:"#FBF6EA",color:"#B3261E",fontSize:10,
                              fontWeight:700,padding:"2px 7px",borderRadius:6}}>
                              {causeLabel(m.cause)}
                            </span>
                          ) : null}
                          {m.solvedAfterHint&&(
                            <span style={{background:"#FBF6EA",color:"#1B2340",fontSize:10,
                              fontWeight:700,padding:"2px 7px",borderRadius:6}}>
                               solved on try {m.attempts||2}
                            </span>
                          )}
                          <span style={{fontSize:10,color:"#6B6F7B"}}>Session {m.sessionNum}</span>
                        </div>
                      </div>
                      <span style={{color:"#6B6F7B",fontSize:16,
                        transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                    </button>

                    {isOpen && (
                      <div style={{padding:"0 14px 14px"}}>
                        {hwOn&&useServer&&srv&&(
                          <div style={{marginBottom:10}}>
                            <button onClick={()=>assignHomework(m)} style={{background:"#D9A52E",color:"#fff",border:"none",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:800,cursor:"pointer"}}>
                               Assign up to {hwCount} similar as homework
                            </button>
                            <label style={{fontSize:11,color:"#6B6F7B",marginLeft:8}}>Questions per mistake{" "}
                              <input type="number" min="1" max={HOMEWORK_ABUSE_MAX} value={hwCount} onChange={e=>saveHwCount(e.target.value)} onBlur={commitHwCount} style={{width:56,padding:"4px 6px",borderRadius:6,border:"1px solid #E2DBCF",fontSize:12}}/>
                            </label>
                            {hwMsg[m.id]&&<div style={{fontSize:12,color:"#1B2340",marginTop:6}}>{hwMsg[m.id]}</div>}
                          </div>
                        )}
                        {(m.q||m.sentence) && (
                          <div style={{background:"#FBF6EA",borderRadius:10,padding:"10px 12px",
                            marginBottom:10,fontSize:13,fontWeight:600,color:"#1B2340",lineHeight:1.6}}>
                            {m.q||m.sentence}
                          </div>
                        )}
                        <div style={{display:"flex",gap:8,marginBottom:10}}>
                          <div style={{flex:1,background:"#FBF6EA",borderRadius:10,padding:"8px 12px"}}>
                            <div style={{fontSize:10,fontWeight:700,color:"#B3261E",marginBottom:2}}>
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
                          <div style={{flex:1,background:"#FBF6EA",borderRadius:10,padding:"8px 12px"}}>
                            <div style={{fontSize:10,fontWeight:700,color:"#4F6B22",marginBottom:2}}>CORRECT</div>
                            <div style={{fontSize:13,fontWeight:700,color:"#064E3B"}}>
                              {m.correctAnswer!==undefined&&m.options?m.options[m.correctAnswer]:m.correctAnswer||m.answer||"—"}
                            </div>
                          </div>
                        </div>
                        {m.solution && (
                          <div style={{background:"#FBF6EA",border:"1.5px solid #4F6B22",
                            borderRadius:12,padding:"12px 14px"}}>
                            <div style={{fontSize:11,fontWeight:800,color:"#4F6B22",marginBottom:8,
                              textTransform:"uppercase",letterSpacing:.6}}>
                               How to solve: {typeof m.solution.method==="string"?m.solution.method:""}
                            </div>
                            {(Array.isArray(m.solution.steps)?m.solution.steps:[]).slice(0,6).map((step,si)=>(
                              typeof step==="string" ? (
                                <div key={si} style={{fontSize:12,color:"#1B2340",lineHeight:1.7,
                                  fontFamily:/[=+\-×÷]/.test(step)?"monospace":"inherit",
                                  paddingLeft:step.startsWith("【")?0:4,
                                  fontWeight:step.startsWith("【")?800:400,
                                  color:step.startsWith("【")?T.success:"#1B2340"}}>
                                  {step}
                                </div>
                              ) : null
                            ))}
                            {m.solution.tip && typeof m.solution.tip==="string" && (
                              <div style={{background:"#FBF6EA",borderRadius:8,padding:"7px 10px",
                                marginTop:8,fontSize:11,color:"#1B2340",fontWeight:700}}>
                                 {m.solution.tip}
                              </div>
                            )}
                          </div>
                        )}
                        {m.explanation && typeof m.explanation==="string" && (
                          <div style={{background:"#FBF6EA",border:"1px solid #E2DBCF",borderRadius:10,
                            padding:"10px 12px",marginTop:8,fontSize:12,color:"#1F3F95",lineHeight:1.6}}>
                            {m.explanation}
                          </div>
                        )}
                        {m.meaning && typeof m.meaning==="string" && (
                          <div style={{background:"#FBF6EA",border:"1px solid #E2DBCF",borderRadius:10,
                            padding:"10px 12px",marginTop:8}}>
                            <div style={{fontSize:10,fontWeight:800,color:"#1F3F95",marginBottom:3}}>
                               MEANING {m.pinyin?`· ${m.pinyin}`:""}
                            </div>
                            <div style={{fontSize:13,color:"#1F3F95",fontWeight:600}}>{m.meaning}</div>
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
  const mockDone=history.filter(h=>h.isMockExam).length;
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
      <div data-testid="parent-stat-cards" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
        {[
          {l:"Sessions",v:sessionCount,bar:Math.min(100,Math.round(sessionCount/60*100))},
          {l:"Average",v:avgTotal?`${avgTotal}%`:"-",bar:avgTotal},
          {l:"Trend",v:last3.length>=2?(trend>=0?`+${trend}%`:`${trend}%`):"-",bar:last3.length>=2?Math.max(0,Math.min(100,50+trend)):0},
          {l:"Mock done",v:mockDone,bar:Math.min(100,Math.round(mockDone/Math.max(1,Math.ceil(sessionCount/10))*100))},
        ].map((s,i)=>(
          <div key={i} data-testid="parent-stat-card" style={{background:T.card,borderRadius:RADIUS.card,padding:"16px 14px",boxShadow:SHADOW,fontFamily:FONT}}>
            <div style={{fontSize:13,color:T.muted,fontWeight:600}}>{s.l}</div>
            <div style={{fontSize:28,fontWeight:800,color:T.ink,margin:"4px 0 10px"}}>{s.v}</div>
            <div style={{background:T.track,borderRadius:6,height:8}}>
              <div style={{background:T.gold,borderRadius:6,height:8,width:`${s.bar}%`,transition:"width 0.6s"}}/>
            </div>
          </div>
        ))}
      </div>

      <div style={{background:T.card,borderRadius:RADIUS.card,padding:"16px",marginBottom:12,boxShadow:SHADOW}}>
        <div style={{fontWeight:800,fontSize:13,marginBottom:10}}> Section Performance</div>
        {SECTION_ORDER.map(type=>{
          const meta=SECTIONS[type]; const avg=sectionAvgs[type]; if(!avg) return null;
          const col=avg>=85?C.green:avg>=70?C.amber:C.red;
          const tr=sectionTrends[type];
          return(
            <div key={type} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                <span style={{fontSize:12,fontWeight:700}}>{meta.label}</span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {tr!=null&&<span style={{fontSize:9,color:tr>=0?C.green:C.red,fontWeight:700}}>{tr>=0?`▲+${tr}%`:`▼${tr}%`}</span>}
                  <span style={{fontSize:12,fontWeight:800,color:T.ink}}>{avg}%</span>
                </div>
              </div>
              <div style={{background:"#E8E4DC",borderRadius:6,height:7}}>
                <div style={{background:T.gold,borderRadius:6,height:7,width:`${avg}%`,transition:"width 0.6s"}}/>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        <div style={{background:C.lGreen,border:`1.5px solid #E2DBCF`,borderRadius:14,padding:"12px"}}>
          <div style={{fontWeight:800,fontSize:11,color:C.text,marginBottom:6}}>Strongest</div>
          {strongest.map((t,i)=><div key={i} style={{fontSize:11,color:C.text,marginBottom:3}}>{SECTIONS[t]?.label?.replace(" MCQ","")}: <strong>{sectionAvgs[t]}%</strong></div>)}
        </div>
        <div style={{background:C.lRed,border:`1.5px solid #E2DBCF`,borderRadius:14,padding:"12px"}}>
          <div style={{fontWeight:800,fontSize:11,color:C.text,marginBottom:6}}>Weakest</div>
          {weakest.map((t,i)=><div key={i} style={{fontSize:11,color:C.text,marginBottom:3}}>{SECTIONS[t]?.label?.replace(" MCQ","")}: <strong>{sectionAvgs[t]}%</strong></div>)}
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:"14px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontWeight:800,fontSize:13,marginBottom:10}}> All Sessions</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{background:"#FBF6EA"}}>
              {["#","Date","Total","Gm%","Vc%","Comp%","Type"].map(h=><th key={h} style={{padding:"5px 3px",textAlign:"center",color:C.muted,fontWeight:700}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[...history].reverse().map((h,i)=>{
                const c=h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
                return(<tr key={i} style={{background:i%2===0?"#fff":"#FBF6EA",borderTop:`1px solid ${C.border}`}}>
                  <td style={{padding:"6px 3px",textAlign:"center",fontWeight:700}}>{h.sessionNum}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:C.muted,whiteSpace:"nowrap"}}>{h.date.split(" ").slice(0,2).join(" ")}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",fontWeight:900,color:c}}>{h.totalPct}%</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:(h.scores.GrammarMCQ||0)>=70?C.green:C.red}}>{h.scores.GrammarMCQ||"-"}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:(h.scores.VocabMCQ||0)>=70?C.green:C.red}}>{h.scores.VocabMCQ||"-"}</td>
                  <td style={{padding:"6px 3px",textAlign:"center",color:(h.scores.Comprehension||0)>=70?C.green:C.red}}>{h.scores.Comprehension||"-"}</td>
                  <td style={{padding:"6px 3px",textAlign:"center"}}>{h.isMockExam?"Mock":"Set"}</td>
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
            const topicColors={"Numbers":"#1F3F95","Addition":T.success,"Subtraction":"#D9A52E",
              "Multiplication":"#1F3F95","Division":"#D9A52E","Money":T.success,
              "Word Problem":T.primary,"Grammar":"#1F3F95","Vocabulary":T.gold,"Other":"#6B6F7B"};
            return(
              <div style={{padding:"0 16px 16px"}}>
                <div style={{background:"#fff",borderRadius:16,padding:"16px",
                  boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:12}}>
                     Weakest Topics (All Time)
                  </div>
                  {topTopics.map(([topic,count],i)=>{
                    const col=topicColors[topic]||"#6B6F7B";
                    const pct=Math.round(count/total*100);
                    return(
                      <div key={topic} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{width:8,height:8,borderRadius:"50%",
                              background:col,display:"inline-block",flexShrink:0}}/>
                            <span style={{fontSize:12,fontWeight:700,color:C.text}}>{topic}</span>
                            {i===0&&<span style={{background:"#FBF6EA",color:"#B3261E",fontSize:9,
                              fontWeight:800,padding:"1px 6px",borderRadius:6}}>Most Weak</span>}
                          </div>
                          <span style={{fontSize:11,color:C.muted,fontWeight:600}}>
                            {count} mistake{count>1?"s":""}
                          </span>
                        </div>
                        <div style={{background:"#FBF6EA",borderRadius:6,height:7}}>
                          <div style={{background:col,borderRadius:6,height:7,
                            width:pct+"%",transition:"width .5s"}}/>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{background:"#FBF6EA",borderRadius:10,padding:"8px 12px",
                    marginTop:8,fontSize:11,color:"#4F6B22",fontWeight:600,lineHeight:1.5}}>
                     Tip: Focus tutoring sessions on{" "}
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
                          ["foundation","⬤ Foundation","#1F3F95","#FBF6EA","P3 basic level"],
                          ["core","⬤⬤ Core","#1B2340","#FBF6EA","Standard P3 exam"],
                          ["stretch","⬤⬤⬤ Stretch","#B3261E","#FBF6EA","Above average"],
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
        <div style={{background:"#FBF6EA",border:"1.5px solid #E2DBCF",borderRadius:14,padding:"12px",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:12,color:"#1B2340",marginBottom:8}}> AI Recommends</div>
          {advice.filter(a=>a.type!=="maintain").slice(0,2).map((adv,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,background:"#fff",borderRadius:10,padding:"10px"}}>
              
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:800,color:adv.priority.includes("High")?"#B3261E":T.success,marginBottom:2}}>{adv.priority}</div>
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
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{fontWeight:800,fontSize:13}}>{meta.label}</div></div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:5}}>Questions: <strong style={{color:C.navy}}>{S[type]?.count||16}</strong></div>
              <input type="range" min={8} max={24} step={2} value={S[type]?.count||16} onChange={e=>onUpdate(type,"count",+e.target.value)} style={{width:"100%",accentColor:C.navy}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted}}><span>8</span><span>16 (default)</span><span>24</span></div>
            </div>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:5}}>Difficulty</div>
            <div style={{display:"flex",gap:5}}>
              {[["standard","Standard"],["mixed","Mixed"],["advanced","Advanced"]].map(([v,l])=>(
                <button key={v} onClick={()=>onUpdate(type,"difficulty",v)} style={{flex:1,background:(S[type]?.difficulty||"standard")===v?C.navy:"#FBF6EA",color:(S[type]?.difficulty||"standard")===v?"#fff":C.muted,border:"none",borderRadius:8,padding:"7px 4px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{l}</button>
              ))}
            </div>
          </div>
        );
      })}
      {["GrammarCloze","VocabCloze","Editing","Comprehension"].map(type=>{
        const meta=SECTIONS[type]; const sets=S[type]?.sets||1;
        return(
          <div key={type} style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{fontWeight:800,fontSize:13}}>{meta.label}</div></div>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:8}}>Sets: <strong style={{color:C.navy}}>{sets}</strong> ({sets*(meta.blanksPerSet||6)} questions)</div>
            <div style={{display:"flex",gap:6}}>
              {[1,2,3].map(n=><button key={n} onClick={()=>onUpdate(type,"sets",n)} style={{flex:1,background:sets===n?meta.color:"#FBF6EA",color:sets===n?"#fff":C.muted,border:"none",borderRadius:8,padding:"9px",fontSize:12,fontWeight:800,cursor:"pointer"}}>{n} {n===1?"set":"sets"}</button>)}
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
      <div style={{background:"#FBF6EA",border:"1.5px solid #E2DBCF",borderRadius:14,padding:"12px",marginBottom:14}}>
        <div style={{fontWeight:800,fontSize:13,color:"#1F3F95",marginBottom:4}}> Mock Exams</div>
        <div style={{fontSize:12,color:"#1F3F95",lineHeight:1.6}}>Every 10 practice sessions, {child?.name} receives a real school paper style mock exam. Compare performance against actual school benchmarks.</div>
      </div>
      {mockH.length===0?(
        <div style={{textAlign:"center",padding:"36px",background:"#fff",borderRadius:16,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:36,marginBottom:10}}></div>
          <div style={{fontSize:14,fontWeight:700}}>No mock exams yet</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{regularH.length}/10 sessions done</div>
          <div style={{marginTop:12,background:"#FBF6EA",borderRadius:8,height:8}}>
            <div style={{background:C.navy,borderRadius:8,height:8,width:`${Math.min(regularH.length*10,100)}%`}}/>
          </div>
        </div>
      ):(
        mockH.map((h,i)=>{
          const col=h.totalPct>=70?C.green:h.totalPct>=55?C.amber:C.red;
          return(
            <div key={i} style={{background:T.card,borderRadius:RADIUS.card,padding:"16px",marginBottom:12,boxShadow:SHADOW}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <div><div style={{fontWeight:800,fontSize:14}}> {h.school}</div><div style={{fontSize:11,color:C.muted}}>{h.examType} · {h.date}</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:col}}>{h.totalPct}%</div><div style={{fontSize:9,color:col}}>{h.totalPct>=70?"On Track":h.totalPct>=55?"Getting There":"Needs Work"}</div></div>
              </div>
              {SECTION_ORDER.filter(t=>h.scores[t]!=null).map(type=>{
                const meta=SECTIONS[type]; const pAvg=sectionAvgsAll[type]?.length?Math.round(sectionAvgsAll[type].reduce((a,b)=>a+b,0)/sectionAvgsAll[type].length):0;
                const ms=h.scores[type]||0; const diff=ms-pAvg;
                return(
                  <div key={type} style={{marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,fontSize:11}}>
                      <span style={{fontWeight:700}}>{meta.label.replace(" MCQ","")}</span>
                      <span style={{color:C.muted}}>Practice: {pAvg}% → <strong style={{color:ms>=70?C.green:C.red}}>Mock: {ms}%</strong> <span style={{color:diff>=0?C.green:C.red,fontSize:10}}>{diff>=0?`(+${diff})`:diff}</span></span>
                    </div>
                    <div style={{background:"#E2DBCF",borderRadius:5,height:5,position:"relative"}}>
                      <div style={{background:C.muted+"60",borderRadius:5,height:5,width:`${pAvg}%`,position:"absolute"}}/>
                      <div style={{background:ms>=70?C.green:C.red,borderRadius:5,height:5,width:`${ms}%`,position:"absolute"}}/>
                    </div>
                  </div>
                );
              })}
              <div style={{marginTop:10,background:col+"15",borderRadius:8,padding:"8px 10px",fontSize:11,color:col,fontWeight:600,lineHeight:1.6}}>
                {h.totalPct>=70?` ${child?.name} is on track for ${h.school} ${h.examType} level!`:h.totalPct>=55?` Making progress. Focus on weaker sections.`:` More practice needed. See AI Advice tab for recommendations.`}
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
        <div style={{fontSize:11,fontWeight:700,color:"#1F3F95",marginBottom:3}}> AI Analysis — {child?.name}</div>
        <div style={{fontSize:11,color:"#1F3F95",lineHeight:1.6}}>Based on recent performance across all sessions. Apply recommendations directly to settings.</div>
      </div>
      {advice.map((adv,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:40,height:40,borderRadius:12,background:adv.type==="increase"?C.lRed:adv.type==="advance"?C.lGreen:C.lAmber,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{adv.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:10,fontWeight:800,color:adv.priority.includes("High")?"#B3261E":adv.priority.includes("Advance")?T.success:"#D9A52E",marginBottom:3}}>{adv.priority} · {SECTIONS[adv.section]?.label||"All"}</div>
              <div style={{fontSize:12,color:C.text,lineHeight:1.7,marginBottom:8}}>{adv.text}</div>
              {adv.action&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>{Object.entries(adv.action).map(([k,v])=><div key={k} style={{background:"#FBF6EA",borderRadius:7,padding:"3px 9px",fontSize:10,fontWeight:700,color:C.navy}}>{k}: {String(v)}</div>)}</div>}
              {adv.action&&<button onClick={()=>onApply(adv)} style={{background:C.navy,color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontSize:11,fontWeight:800,cursor:"pointer"}}> Apply to Settings</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Parent App (main container) ───────────────────────────────
// Server mode only: parent adds a child. Same component and styling as sign-up step 2 (src/components/clewquest/AddChild.js).
function AddChildForm({onCreated}){
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState("");
  return(
    <div style={{background:"#fff",borderRadius:20,boxShadow:"0 6px 20px rgba(27,35,64,.10)",padding:16,marginBottom:14}}>
      <button data-testid="ac-open" onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:15,color:"#1F3F95",padding:0}}>{open?"− ":"+ "}Add child</button>
      {ok&&<div data-testid="ac-ok" style={{color:"#4F6B22",fontSize:13,fontWeight:700,marginTop:8}}>{ok}</div>}
      {open&&<div style={{marginTop:12}}><AddChild onCreated={(c)=>{ onCreated&&onCreated(c); }} onDone={(c)=>{ setOk(`Added ${c.name}. Login ID: ${c.username}`); setOpen(false); }}/></div>}
    </div>
  );
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
          <div key={c.id} style={{background:"#fff",border:`2px solid ${allDone?T.success:"#D9A52E"}`,borderRadius:14,padding:14,marginBottom:10}}>
            <div style={{fontWeight:900,fontSize:14,color:"#1B2340",marginBottom:8}}>Did {c.name} do it today? {allDone?"Yes":""}</div>
            {subs.map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"3px 0"}}>
                <span>{k}</span><span style={{fontWeight:800}}>{v.sets>=v.target?"Done":"Not yet"} {v.sets}/{v.target} set{v.target===1?"":"s"}</span>
              </div>
            ))}
            <div style={{fontSize:12,color:C.muted,marginTop:8}}>Questions today: <b>{c.questions}</b> · Accuracy: <b>{c.accuracy==null?"–":c.accuracy+"%"}</b></div>
            <div style={{display:"flex",gap:4,marginTop:8}} title="Last 7 days">
              {c.strip.map(d=>(<div key={d.date} style={{flex:1,textAlign:"center"}}>
                <div style={{height:14,borderRadius:4,background:d.sets>0?T.success:"#E2DBCF"}}/>
                <div style={{fontSize:9,color:C.muted,marginTop:2}}>{d.date.slice(8)}</div></div>))}
            </div>
          </div>
        );
      })}
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
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:13,color:"#1F3F95",padding:0}}>{open?"− ":"＋ "}Alerts</button>
      {open&&(<div style={{marginTop:10}}>
        <label style={{fontSize:12,display:"block",margin:"10px 0 8px"}}><input type="checkbox" checked={em} onChange={e=>setEm(e.target.checked)}/> Email me when my child finishes a set, a paper or assigned homework, plus the weekly report</label>
        <input style={inp} placeholder="WhatsApp number, e.g. +6591234567" value={num} onChange={e=>setNum(e.target.value)}/>
        <label style={{fontSize:12,display:"block",marginBottom:8}}><input type="checkbox" checked={opt} onChange={e=>setOpt(e.target.checked)}/> Send me daily WhatsApp alerts (coming soon; saved for when it is switched on)</label>
        <label style={{fontSize:12,display:"block",marginBottom:6}}><input type="checkbox" checked={qOn} onChange={e=>setQOn(e.target.checked)}/> Quiet hours for live alerts (Singapore time). Alerts that arrive in this window are held and sent when it ends.</label>
        {qOn&&<div style={{fontSize:12,marginBottom:8}}>From <input type="time" value={qs} onChange={e=>setQs(e.target.value)}/> to <input type="time" value={qe} onChange={e=>setQe(e.target.value)}/></div>}
        <button onClick={save} style={{background:"#1F3F95",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer"}}>Save</button>
        {msg&&<span style={{fontSize:12,color:C.muted,marginLeft:10}}>{msg}</span>}
      </div>)}
    </div>
  );
}

// Parent shell: marble page (tokens), same width as Wrap.
function ParentWrap({children}){
  return <div style={{background:"#F6F2EA",minHeight:"100vh"}}><div style={{maxWidth:"var(--wrap-w)",width:"100%",margin:"0 auto",position:"relative",overflowX:"hidden",boxSizing:"border-box",fontFamily:"var(--font-noto-sans),system-ui,sans-serif"}}>{children}</div></div>;
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
    <ParentWrap> <div style={{background:"#fff",boxShadow:"0 1px 0 rgba(27,35,64,.06)",padding:"18px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{color:"#6B6F7B",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>ClewQuest · Parent</div>
            <div style={{color:"#1B2340",fontSize:15,fontWeight:800}}>{user.name}</div>
          </div>
          <button onClick={onLogout} style={{background:"none",border:"none",borderRadius:10,padding:"6px 12px",color:"#6B6F7B",cursor:"pointer",fontSize:12,fontWeight:700}}>Logout</button>
        </div> {linkedStudents.length===0?(
          <div style={{background:"#F6F2EA",borderRadius:12,padding:"10px 14px",marginBottom:12}}>
            <div style={{color:"#6B6F7B",fontSize:12}}>No children yet. Tap Add child below.</div>
          </div>
        ):(
          <div style={{display:"flex",gap:8,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
            {linkedStudents.map(s=>(
              <button key={s.id} onClick={()=>{setSelectedId(s.id);setTab("overview");}} style={{background:selectedId===s.id?"#1F3F95":"#F6F2EA",border:"none",borderRadius:12,padding:"8px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0,transition:"all 0.2s"}}>
                                <div style={{textAlign:"left"}}>
                  <div style={{fontSize:12,fontWeight:800,color:selectedId===s.id?"#fff":"#1B2340"}}>{s.name}</div>
                  <div style={{fontSize:9,color:selectedId===s.id?"#E2DBCF":"#6B6F7B"}}>{s.grade}</div>
                </div>
              </button>
            ))}
          </div>
        )} {child&&(
          <>
            <div style={{display:"flex",gap:6,marginBottom:10}}>
              {GRADES.map(g=>(
                <button key={g} onClick={()=>setGrade(g)} style={{background:grade===g?"#1F3F95":"#F6F2EA",border:"none",borderRadius:999,padding:"5px 14px",color:grade===g?"#fff":"#6B6F7B",fontSize:12,fontWeight:800,cursor:"pointer",flexShrink:0}}>
                  {g}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:0,borderBottom:"1px solid #E2DBCF",marginBottom:0}}>
              {Object.entries(SUBJECTS).map(([key,sub])=>{
                const live=!!LIVE_CONTENT[`${grade}_${key}`];
                return(
                  <button key={key} onClick={()=>{ setSubject(key); if(!live) setParentToast("Coming Soon"); else setParentToast(null); }} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #D9A52E":"2.5px solid transparent",padding:"8px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                    <span style={{fontSize:12,fontWeight:subject===key?800:500,color:subject===key?"#1B2340":"#6B6F7B"}}>{key}</span>
                    {!live&&<span style={{fontSize:6,color:"#6B6F7B",fontWeight:700}}>Coming Soon</span>}
                  </button>
                );
              })}
            </div>
          </>
        )} {child&&(
          <div style={{display:"flex",gap:5,padding:"10px 0 0",overflowX:"auto"}}>
            {[["overview","Overview"],...(SERVER_AUTH&&LEARNING_DASHBOARD&&child?.serverId?[["learning","Learning"]]:[]),["mistakes","Mistakes"],["settings","Settings"],["mock","Mock"],["advice","AI Advice"],...(SERVER_AUTH&&REWARDS&&child?.serverId?[["rewards","Rewards"]]:[]),...(SERVER_AUTH&&MOCK_EXAMS_ENABLED&&child?.serverId&&subject==="English"?[["papers","Papers"]]:[])].map(([t,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#1F3F95":"#F6F2EA",border:"none",borderRadius:999,padding:"8px 14px",color:tab===t?"#fff":"#1B2340",fontSize:11,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{padding:"16px 16px 30px",overflowY:"auto"}}>
        {SERVER_AUTH&&onChildCreated&&<TodayCard linkedStudents={linkedStudents}/>}
        {SERVER_AUTH&&onChildCreated&&child&&child.serverId&&clewquestEnabled()&&<ChildCard key={child.id} child={child}/>}
        {SERVER_AUTH&&onChildCreated&&<AddChildForm onCreated={onChildCreated}/>}
        {SERVER_AUTH&&onChildCreated&&<AlertSettings/>}
        {!child&&linkedStudents.length===0&&(
          <div style={{textAlign:"center",padding:"48px 20px",color:C.muted}}>
            <div style={{fontSize:40,marginBottom:12}}></div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>No children linked yet</div>
            <div style={{fontSize:13,lineHeight:1.7}}>Tap Add child above to create your child's account. You choose their login ID and pictures.</div>
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
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="mock"      && <ParentMockTab   child={child} history={history}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="advice"    && <ParentAdviceTab advice={advice} child={child} onApply={applyAdvice}/>}
      </div>
    </ParentWrap>
  );
}

export { ParentApp };
