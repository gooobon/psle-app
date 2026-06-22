"use client";
import React from "react";
import { C, AnimProgressBar } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER, ZH_SECTION_ORDER, ZH_SECTIONS } from "@/lib/quizMeta";

function ZhResultScreen({results, sessionNum, onHome, onNext}){
  const total=results.length, correct=results.filter(r=>r.correct).length;
  const pct=total?Math.round(correct/total*100):0;
  const col=pct>=85?C.green:pct>=70?C.amber:C.red;
  const bySection={};
  ZH_SECTION_ORDER.forEach(t=>{bySection[t]=results.filter(r=>r.sectionType===t);});
  const wrong=results.filter(r=>!r.correct);
  return(
    <div style={{paddingBottom:20}}>
      <div style={{background:`linear-gradient(135deg,${col},${col}cc)`,padding:"32px 24px",textAlign:"center"}}>
        <div style={{fontSize:52}}>{pct>=85?"🏆":pct>=70?"🌟":"💪"}</div>
        <div style={{fontSize:42,fontWeight:900,color:"#fff",margin:"8px 0 2px"}}>{pct}%</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.85)"}}>{correct}/{total} 道题正确</div>
      </div>
      <div style={{padding:"18px 16px"}}>
        <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>各部分成绩</div>
          {ZH_SECTION_ORDER.map(type=>{
            const meta=ZH_SECTIONS[type]; const items=bySection[type]||[]; if(!items.length) return null;
            const c=items.filter(r=>r.correct).length; const p=Math.round(c/items.length*100);
            const sc=p>=85?C.green:p>=70?C.amber:C.red;
            return(
              <div key={type} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <span style={{fontSize:12,fontWeight:700}}>{meta.icon} {meta.label}</span>
                  <span style={{fontSize:12,fontWeight:800,color:sc}}>{c}/{items.length} · {p}%</span>
                </div>
                <AnimProgressBar pct={p} color={sc} height={7}/>
              </div>
            );
          })}
        </div>
        {wrong.length>0&&(
          <div style={{background:C.lAmber,border:"1px solid #FDE68A",borderRadius:12,padding:"11px 14px",marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:12,color:"#92400E",marginBottom:4}}>📅 {wrong.length} 道题加入错题记录</div>
            {wrong.slice(0,3).map((w,i)=><div key={i} style={{fontSize:11,color:"#78350F"}}>• {w.topic}</div>)}
          </div>
        )}
        <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",borderRadius:16,padding:"16px",marginBottom:10}}>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginBottom:4}}>准备好继续了吗？</div>
          <div style={{color:"#fff",fontSize:14,fontWeight:800,marginBottom:10}}>第 #{sessionNum+1} 节课已就绪！</div>
          <button onClick={onNext} style={{width:"100%",background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:900,cursor:"pointer"}}>
            ▶ 开始下一节练习 →
          </button>
        </div>
        <button onClick={onHome} style={{width:"100%",background:"none",border:`1.5px solid ${C.border}`,borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",color:C.muted}}>← 返回主页</button>
      </div>
    </div>
  );
}


function StudentResultScreen({results, sessionNum, isMock, onHome, onNextSession}){
  const total=results.length, correct=results.filter(r=>r.correct).length;
  const pct=total?Math.round(correct/total*100):0;
  const wrong=results.filter(r=>!r.correct);
  const firstTry=results.filter(r=>r.correct).length;
  const solvedWithHint=results.filter(r=>r.solvedAfterHint).length;
  const totallyWrong=results.filter(r=>!r.correct&&!r.solvedAfterHint).length;
  const bySection={};
  SECTION_ORDER.forEach(t=>{bySection[t]=results.filter(r=>r.sectionType===t);});
  const col=pct>=85?C.green:pct>=70?C.amber:C.red;
  return(
    <div style={{paddingBottom:20}}>
      <div style={{background:`linear-gradient(135deg,${col},${col}cc)`,padding:"32px 24px",textAlign:"center"}}>
        <div style={{fontSize:52}}>{pct>=85?"🏆":pct>=70?"🌟":"💪"}</div>
        <div style={{fontSize:42,fontWeight:900,color:"#fff",margin:"8px 0 2px"}}>{pct}%</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.85)"}}>{correct}/{total} correct on first try</div>
        {solvedWithHint>0&&(
          <div style={{marginTop:6,background:"rgba(255,255,255,0.2)",borderRadius:10,
            padding:"5px 14px",display:"inline-block",color:"#fff",fontSize:12,fontWeight:700}}>
            💡 {solvedWithHint} solved after hint (counted as practice, not correct)
          </div>
        )}
        {isMock&&<div style={{marginTop:8,background:"rgba(255,255,255,0.25)",borderRadius:10,padding:"6px 16px",display:"inline-block",color:"#fff",fontSize:12,fontWeight:700}}>🏫 Mock Exam</div>}
      </div>
      <div style={{padding:"18px 16px"}}>
        <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
          <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>Section Results</div>
      {/* First-try vs Hint-solved vs Wrong breakdown */}
      <div style={{padding:"0 16px",marginTop:16}}>
        <div style={{background:"#fff",borderRadius:16,padding:"16px",
          boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:12}}>
            📊 How You Did
          </div>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1,background:"#D1FAE5",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:24,fontWeight:900,color:"#065F46"}}>{firstTry}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#047857",marginTop:2}}>✅ First Try</div>
            </div>
            <div style={{flex:1,background:"#FEF3C7",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:24,fontWeight:900,color:"#92400E"}}>{solvedWithHint}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#B45309",marginTop:2}}>💡 After Hint</div>
            </div>
            <div style={{flex:1,background:"#FEE2E2",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:24,fontWeight:900,color:"#991B1B"}}>{totallyWrong}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#B91C1C",marginTop:2}}>❌ Not Solved</div>
            </div>
          </div>
          {solvedWithHint>0&&(
            <div style={{background:"#FFFBEB",borderRadius:10,padding:"10px 12px",marginTop:12,
              fontSize:11,color:"#92400E",fontWeight:600,lineHeight:1.5}}>
              💡 "After Hint" questions are counted as <strong>not correct</strong> for your score —
              you'll see these again to practise until you can solve them on the first try!
            </div>
          )}
        </div>
      </div>

          {SECTION_ORDER.map(type=>{
            const meta=SECTIONS[type]; const items=bySection[type]||[]; if(!items.length) return null;
            const c=items.filter(r=>r.correct).length; const p=Math.round(c/items.length*100);
            const sc=p>=85?C.green:p>=70?C.amber:C.red;
            return(
              <div key={type} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                  <span style={{fontSize:12,fontWeight:700}}>{meta.icon} {meta.label}</span>
                  <span style={{fontSize:12,fontWeight:800,color:sc}}>{c}/{items.length} · {p}%</span>
                </div>
                <div style={{background:"#EEF2F7",borderRadius:6,height:7}}>
                  <div style={{background:sc,borderRadius:6,height:7,width:`${p}%`,transition:"width 0.5s"}}/>
                </div>
              </div>
            );
          })}
        </div>
        {wrong.length>0&&<div style={{background:C.lAmber,border:`1px solid #FDE68A`,borderRadius:12,padding:"11px 14px",marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:12,color:"#92400E",marginBottom:4}}>📅 {wrong.length} questions added to review</div>
          {wrong.slice(0,3).map((w,i)=><div key={i} style={{fontSize:11,color:"#78350F"}}>• {w.topic}</div>)}
        </div>}
        <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",borderRadius:16,padding:"16px",marginBottom:10}}>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:11,marginBottom:4}}>Ready for more?</div>
          <div style={{color:"#fff",fontSize:14,fontWeight:800,marginBottom:10}}>Session #{sessionNum+1} is ready!</div>
          <button onClick={onNextSession} style={{width:"100%",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:900,cursor:"pointer"}}>▶ Go to Next Practice Session →</button>
        </div>
        <button onClick={onHome} style={{width:"100%",background:"none",border:`1.5px solid ${C.border}`,borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",color:C.muted}}>← Back to Home</button>
      </div>
    </div>
  );
}

export { StudentResultScreen, ZhResultScreen };
