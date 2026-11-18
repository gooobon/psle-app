"use client";
import React, { useState, useEffect } from "react";
import { C, Wrap } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER } from "@/lib/quizMeta";
import { DEFAULT_SETTINGS, generateAdvice } from "@/lib/dataEngine";
import { SERVER_AUTH, WRONG_ANSWERS_SYNC, serverPost, serverGet } from "@/lib/serverClient";
import { SUBJECTS, GRADES, LIVE_CONTENT, ComingSoonToast, ComingSoonScreen } from "@/components/Dashboard";

// ── Parent: Mistakes review tab ───────────────────────────────
function ParentMistakesTab({child, history, grade, subject}){
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

  const allMistakes = [];
  if(useServer && srv){
    // Server rows arrive newest first; grade filter matches the grade selector.
    srv.filter(x=>!x.grade || x.grade===grade).forEach(x=>{
      const mm = /^set-(\d+)$/.exec(x.attempt_key||"");
      allMistakes.push({
        id:x.question_id, q:x.question_text||undefined, topic:x.section_type||undefined, sectionType:x.section_type||undefined,
        yourAnswer:x.student_answer||undefined, correctAnswer:x.correct_answer||undefined,
        sessionNum: mm?Number(mm[1]):0, sessionDate:x.attempted_at,
      });
    });
  } else {
    (history||[]).forEach(h=>{
      (h.mistakes||[]).forEach(m=>{
        allMistakes.push({...m, sessionNum:h.sessionNum, sessionDate:h.date});
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
                              {m.yourAnswer||m.studentAnswer!==undefined&&m.options?m.options[m.studentAnswer]:"—"}
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
function ParentOverview({child, history, settings}){
  const regularH=history.filter(h=>!h.isMockExam);
  const avgTotal=regularH.length?Math.round(regularH.reduce((s,h)=>s+h.totalPct,0)/regularH.length):0;
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
          {icon:"📋",l:"Sessions",v:history.length,c:C.blue},
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
function AddChildForm({onCreated}){
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({username:"",name:"",grade:"P3",school:"",password:""});
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  async function submit(){
    setErr(""); setOk(""); setBusy(true);
    const r = await serverPost("/api/parent/children",{...f,username:f.username.trim().toLowerCase()});
    setBusy(false);
    if(!r.ok) return setErr(r.error||"Could not create child.");
    onCreated&&onCreated(r.child);
    setOk(`Created. ${r.child.name} logs in with username "${r.child.username}" and the password you set.`);
    setF({username:"",name:"",grade:"P3",school:"",password:""});
  }
  return(
    <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:14}}>
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:13,color:"#4C1D95",padding:0}}>{open?"− ":"＋ "}Add child</button>
      {open&&(
        <div style={{marginTop:10}}>
          <input style={inp} placeholder="Child's username (a-z, 0-9, _)" value={f.username} onChange={e=>set("username",e.target.value)}/>
          <input style={inp} placeholder="Display name" value={f.name} onChange={e=>set("name",e.target.value)}/>
          <select style={inp} value={f.grade} onChange={e=>set("grade",e.target.value)}>{GRADES.map(g=><option key={g} value={g}>{g}</option>)}</select>
          <input style={inp} placeholder="School" value={f.school} onChange={e=>set("school",e.target.value)}/>
          <input style={inp} type="password" placeholder="Child's password (min 6 chars)" value={f.password} onChange={e=>set("password",e.target.value)}/>
          {err&&<div style={{color:"#B91C1C",fontSize:12,marginBottom:8}}>{err}</div>}
          {ok&&<div style={{color:"#065F46",fontSize:12,marginBottom:8}}>{ok}</div>}
          <button disabled={busy} onClick={submit} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer"}}>{busy?"Creating...":"Create child account"}</button>
        </div>
      )}
    </div>
  );
}

// ── Server mode only ──────────────────────────────────────────
// "Did they do it today?": read from the server (daily_activity), so it works from any device.
function TodayCard({linkedStudents}){
  const [data,setData]=useState(null); const [err,setErr]=useState("");
  useEffect(()=>{ let off=false; serverGet("/api/parent/today").then(r=>{ if(off) return; if(r.ok) setData(r); else setErr("Could not load today's activity."); }); return ()=>{off=true}; },[linkedStudents.length]);
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

// Link another parent (by their registered email) to one of my children, or link an existing child account.
function GuardianTools({linkedStudents,onChildLinked}){
  const [open,setOpen]=useState(false);
  const [email,setEmail]=useState(""); const [childId,setChildId]=useState(linkedStudents[0]?.id||"");
  const [lu,setLu]=useState(""); const [lp,setLp]=useState("");
  const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  const btn={background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer",marginBottom:12};
  const [inv,setInv]=useState({sent:[],received:[]});
  const loadInv=()=>serverGet("/api/parent/co-parents").then(r=>{ if(r.ok) setInv({sent:r.sent||[],received:r.received||[]}); });
  useEffect(()=>{ loadInv(); },[]);
  async function linkParent(){ setBusy(true); setMsg(""); const r=await serverPost("/api/parent/co-parents",{email,childId:childId||linkedStudents[0]?.id}); setBusy(false); setMsg(r.ok?r.message:(r.error||"Failed.")); if(r.ok){ setEmail(""); loadInv(); } }
  async function revokeInvite(id){ setBusy(true); const r=await serverPost("/api/parent/co-parents/revoke",{inviteId:id}); setBusy(false); setMsg(r.ok?r.message:(r.error||"Failed.")); loadInv(); }
  async function acceptInvite(id){ setBusy(true); const r=await serverPost("/api/parent/co-parents/accept",{inviteId:id}); setBusy(false); setMsg(r.ok?r.message:(r.error||"Failed.")); if(r.ok){ setTimeout(()=>{ try{ window.location.reload(); }catch{} },800); } else loadInv(); }
  async function linkChild(){ setBusy(true); setMsg(""); const r=await serverPost("/api/parent/children/link",{username:lu,password:lp}); setBusy(false); if(r.ok){ onChildLinked&&onChildLinked(r.child); setMsg("Linked "+r.child.name+"."); setLu(""); setLp(""); } else setMsg(r.error||"Failed."); }
  return(
    <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:14}}>
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:13,color:"#4C1D95",padding:0}}>{open?"− ":"＋ "}Invite another parent / link existing child</button>
      {inv.received.length>0&&(<div style={{marginTop:10,background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:10,padding:10}}>
        <div style={{fontSize:12,fontWeight:800,marginBottom:6}}>Invitations for you</div>
        {inv.received.map(i=>(<div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,fontSize:13,marginBottom:4}}>
          <span>{i.inviterName||"A parent"} invited you to follow <b>{i.childName||"a child"}</b></span>
          <button disabled={busy} style={{...btn,marginBottom:0,padding:"6px 12px"}} onClick={()=>acceptInvite(i.id)}>Accept</button></div>))}
      </div>)}
      {open&&(<div style={{marginTop:10}}>
        {linkedStudents.length>0&&(<>
          <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>Add another parent to a child</div>
          <select style={inp} value={childId} onChange={e=>setChildId(e.target.value)}>{linkedStudents.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
          <input style={inp} placeholder="Other parent's email (they log in or sign up with it, then accept)" value={email} onChange={e=>setEmail(e.target.value)}/>
          <button disabled={busy} style={btn} onClick={linkParent}>Send invite</button>
          {inv.sent.length>0&&(<div style={{marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>Pending invites (expire after 7 days)</div>
            {inv.sent.map(i=>(<div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,fontSize:12,marginBottom:4}}>
              <span>{i.email} → {i.childName} · expires {String(i.expiresAt).slice(0,10)}</span>
              <button disabled={busy} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:12}} onClick={()=>revokeInvite(i.id)}>Revoke</button></div>))}
          </div>)}
        </>)}
        <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>Link an existing child account</div>
        <input style={inp} placeholder="Child's username" value={lu} onChange={e=>setLu(e.target.value)}/>
        <input style={inp} type="password" placeholder="Child's password" value={lp} onChange={e=>setLp(e.target.value)}/>
        <button disabled={busy} style={btn} onClick={linkChild}>Link child</button>
        {msg&&<div style={{fontSize:12,color:C.muted}}>{msg}</div>}
      </div>)}
    </div>
  );
}

// Alert settings: WhatsApp number + opt-in (stored only; sending is disabled server-side until the owner enables it).
function AlertSettings(){
  const [open,setOpen]=useState(false); const [num,setNum]=useState(""); const [opt,setOpt]=useState(false); const [msg,setMsg]=useState(""); const [em,setEm]=useState(true);
  useEffect(()=>{ if(!open) return; serverGet("/api/parent/settings").then(r=>{ const e=(r.channels||[]).find(c=>c.type==="email"); setEm(e?!!e.enabled:true); /* no email entry (older account) = on by default */ const w=(r.channels||[]).find(c=>c.type==="whatsapp"); if(w){ setNum(w.address||""); setOpt(!!w.opt_in); } }); },[open]);
  async function save(){ setMsg(""); const r=await serverPost("/api/parent/settings",{email:{enabled:em},whatsapp:{number:num.trim(),optIn:opt}}); setMsg(r.ok?"Saved.":(r.error||"Failed.")); }
  const inp={width:"100%",boxSizing:"border-box",padding:"9px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,marginBottom:8};
  return(
    <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:12,padding:12,marginBottom:14}}>
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontWeight:800,fontSize:13,color:"#4C1D95",padding:0}}>{open?"− ":"＋ "}Alert settings</button>
      {open&&(<div style={{marginTop:10}}>
        <label style={{fontSize:12,display:"block",marginBottom:8}}><input type="checkbox" checked={em} onChange={e=>setEm(e.target.checked)}/> Email me the daily progress alert (8pm Singapore time)</label>
        <input style={inp} placeholder="WhatsApp number, e.g. +6591234567" value={num} onChange={e=>setNum(e.target.value)}/>
        <label style={{fontSize:12,display:"block",marginBottom:8}}><input type="checkbox" checked={opt} onChange={e=>setOpt(e.target.checked)}/> Send me daily WhatsApp alerts (coming soon; saved for when it is switched on)</label>
        <button onClick={save} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontWeight:800,cursor:"pointer"}}>Save</button>
        {msg&&<span style={{fontSize:12,color:C.muted,marginLeft:10}}>{msg}</span>}
      </div>)}
    </div>
  );
}

function ParentApp({user, linkedStudents, onLogout, getProgress, setProgress, refresh, onChildCreated}){
  const [selectedId, setSelectedId] = useState(linkedStudents[0]?.id||null);
  const [grade,   setGrade]   = useState("P3");
  const [subject, setSubject] = useState("English");
  const [tab,     setTab]     = useState("overview");
  const [parentToast, setParentToast] = useState(null);

  const child = linkedStudents.find(s=>s.id===selectedId);
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
            <div style={{color:"rgba(255,255,255,0.55)",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Genius Project · Parent</div>
            <div style={{color:"#fff",fontSize:15,fontWeight:800}}>👩 {user.name}</div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"6px 12px",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:12,fontWeight:700}}>Logout</button>
        </div> {linkedStudents.length===0?(
          <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 14px",marginBottom:12}}>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>No students linked. Ask your child to share their Student ID.</div>
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
                  <button key={key} onClick={()=>{ setSubject(key); if(!live) setParentToast("Coming Soon: 준비 중인 과목입니다"); else setParentToast(null); }} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"8px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
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
            {[["overview","📊 Overview"],["mistakes","❌ Mistakes"],["settings","⚙️ Settings"],["mock","🏫 Mock"],["advice","AI Advice"]].map(([t,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.1)",border:"none",borderRadius:10,padding:"7px 12px",color:tab===t?"#0F172A":"rgba(255,255,255,0.7)",fontSize:11,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{padding:"16px 16px 30px",overflowY:"auto"}}>
        {SERVER_AUTH&&onChildCreated&&<TodayCard linkedStudents={linkedStudents}/>}
        {SERVER_AUTH&&onChildCreated&&<AddChildForm onCreated={onChildCreated}/>}
        {SERVER_AUTH&&onChildCreated&&<GuardianTools linkedStudents={linkedStudents} onChildLinked={onChildCreated}/>}
        {SERVER_AUTH&&onChildCreated&&<AlertSettings/>}
        {!child&&linkedStudents.length===0&&(
          <div style={{textAlign:"center",padding:"48px 20px",color:C.muted}}>
            <div style={{fontSize:40,marginBottom:12}}>🔗</div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>No children linked yet</div>
            <div style={{fontSize:13,lineHeight:1.7}}>Go to Settings → Manage Children to link your child's Student ID. Ask your child to check their Profile for their ID.</div>
          </div>
        )}
        {parentToast&&<ComingSoonToast message={parentToast} onDone={()=>setParentToast(null)}/>}
        {child&&!LIVE_CONTENT[`${grade}_${subject}`]&&<ComingSoonScreen grade={grade} subject={subject}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="overview"  && <ParentOverview  child={child} history={history} settings={settings}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="mistakes"  && <ParentMistakesTab child={child} history={history} grade={grade} subject={subject}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="settings"  && <ParentSettings  child={child} settings={settings} onUpdate={updateSetting} advice={advice} onApplyAdvice={applyAdvice}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="mock"      && <ParentMockTab   child={child} history={history}/>}
        {child&&LIVE_CONTENT[`${grade}_${subject}`]&&tab==="advice"    && <ParentAdviceTab advice={advice} child={child} onApply={applyAdvice}/>}
      </div>
    </Wrap>
  );
}

export { ParentApp };
