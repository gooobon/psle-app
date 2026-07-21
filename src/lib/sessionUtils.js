"use client";
import React from "react";
import { C, TTS } from "@/lib/uiShared";
import { WORD_DICT, SYN_ANT, ZH_CHAR_DICT } from "@/lib/quizMeta";

function reviewDays(a){ return a>=3?3:a===2?5:7; }
function scoreBadge(att){
  if(att===1) return {icon:"⭐⭐⭐",label:"First try!",   color:C.green,  bg:C.lGreen};
  if(att===2) return {icon:"⭐⭐", label:"Second try",  color:"#D97706", bg:C.lAmber};
  if(att===3) return {icon:"⭐",  label:"Third try",   color:C.orange,  bg:C.lOrange};
              return  {icon:"📖", label:"Answer shown", color:C.red,     bg:C.lRed};
}
function fmtTime(ms){
  if(!ms||ms<0) return "—";
  const s=Math.round(ms/1000);
  if(s<60) return `${s}s`;
  return `${Math.floor(s/60)}m ${s%60}s`;
}
// P5 (찍기방지): flag ONLY answers given faster than a child could physically
// read the item — i.e. an obvious mash / pre-decided tap. Tuned deliberately far
// below normal solving time so a student who actually knew the answer is never
// flagged (minimal false positives = the locked priority). Dial DOWN to flag
// even less. Previous thresholds (4–8s) flagged normal fast solving and nagged
// good students; these floors only catch the impossible-speed case.
function guessFlag(ms,type){
  const t={GrammarMCQ:1500,VocabMCQ:1500,GrammarCloze:1800,VocabCloze:1800,Editing:1500,Comprehension:2500};
  return ms<(t[type]||1500);
}
function todayStr(){ return new Date().toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}); }
function dateLabel(ds){
  const today=todayStr();
  if(ds===today) return "Today";
  const yesterday=new Date(); yesterday.setDate(yesterday.getDate()-1);
  if(ds===yesterday.toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"})) return "Yesterday";
  return ds;
}

function getMistakeIds(mistakes, sectionTypes, maxN=3){
  if(!mistakes||!mistakes.length) return [];
  // Take the most recent wrong answers, deduplicated
  const seen = new Set();
  const ids = [];
  for(let i=mistakes.length-1;i>=0&&ids.length<maxN;i--){
    const m = mistakes[i];
    if(m.id && !seen.has(m.id) && (!sectionTypes||sectionTypes.includes(m.sectionType))){
      seen.add(m.id);
      ids.push(m.id);
    }
  }
  return ids;
}

// ── Spaced repetition weight: returns 0-1 (1=needs most review) ─
function mistakeWeight(id, mistakes){
  if(!mistakes||!mistakes.length) return 0;
  const wrongCount = mistakes.filter(m=>m.id===id).length;
  return Math.min(wrongCount/3, 1);
}



function TapWord({word, lang="en", style={}}){
  return(
    <span onClick={(e)=>{e.stopPropagation(); TTS.speak(word, lang==="zh"?"zh-TW":"en-SG", lang==="zh"?0.7:0.85);}}
      style={{cursor:"pointer",borderBottom:"1.5px dotted #93C5FD",...style}}
      title="Tap to hear">{word}</span>
  );
}

// ── Options Glossary — meanings + syn/ant for ALL options ────
function OptionsGlossary({q, lang="en"}){
  const opts = q.options||[];
  const rows = opts.map((opt,i)=>{
    const clean = String(opt).replace(/[.,!?'"]/g,"");
    if(lang==="zh"){
      const info = ZH_CHAR_DICT[clean];
      const isAns = i===q.answer;
      return {opt, isAns,
        meaning: info?.meaning || (isAns ? (q.meaning||"").replace(/^[^=]*=\s*/,"") : null),
        pinyin: info?.pinyin || (isAns ? q.pinyin : null),
        syn: info?.syn||null, ant: info?.ant||null,
        unknown: !info && !isAns};
    }
    const key = clean.toLowerCase();
    const def = WORD_DICT[key]||null;
    const sa  = SYN_ANT[key]||null;
    return {opt, isAns:i===q.answer, meaning:def, pinyin:null,
      syn: sa?.syn?.join(", ")||null, ant: sa?.ant?.join(", ")||null, unknown:!def};
  });
  const known = rows.filter(r=>r.meaning||r.syn||r.ant);
  if(known.length===0) return null;
  return(
    <div className="gm-slideUp" style={{background:"#F8FAFC",border:"1.5px solid #CBD5E1",
      borderRadius:14,padding:"12px 14px",marginBottom:10}}>
      <div style={{fontSize:11,fontWeight:800,color:"#475569",marginBottom:8,
        textTransform:"uppercase",letterSpacing:.7}}>
        📚 {lang==="zh"?"所有选项的意思":"All the words — learn them all!"}
      </div>
      {rows.map((r,i)=>(
        <div key={i} style={{background:r.isAns?"#ECFDF5":"#fff",
          border:"1px solid "+(r.isAns?"#A7F3D0":"#E2E8F0"),
          borderRadius:10,padding:"8px 10px",marginBottom:6}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontSize:lang==="zh"?18:14,fontWeight:800,
              color:r.isAns?"#065F46":"#0F172A"}}>{r.opt}</span>
            {r.isAns&&<span style={{background:"#10B981",color:"#fff",fontSize:9,
              fontWeight:800,padding:"1px 7px",borderRadius:6}}>ANSWER</span>}
            {r.pinyin&&<span style={{fontSize:11,color:"#2563EB",fontWeight:700}}>{r.pinyin}</span>}
            <SpeakBtn text={r.opt} lang={lang} style={{marginLeft:"auto",padding:"2px 8px",fontSize:11}}/>
          </div>
          {r.meaning&&<div style={{fontSize:12,color:"#334155",marginTop:3}}>{r.meaning}</div>}
          {(r.syn||r.ant)&&(
            <div style={{display:"flex",gap:10,marginTop:4,flexWrap:"wrap"}}>
              {r.syn&&<span style={{fontSize:11,color:"#0D9488",fontWeight:700}}>
                = {lang==="zh"?"同义":"same"}: {r.syn}</span>}
              {r.ant&&<span style={{fontSize:11,color:"#DC2626",fontWeight:700}}>
                ≠ {lang==="zh"?"反义":"opposite"}: {r.ant}</span>}
            </div>
          )}
          {r.unknown&&lang==="zh"&&(
            <div style={{fontSize:10,color:"#92400E",marginTop:3}}>⚠️ 请家长确认意思</div>
          )}
        </div>
      ))}
    </div>
  );
}



export { reviewDays, scoreBadge, fmtTime, guessFlag, todayStr, dateLabel, TapWord, OptionsGlossary };
