"use client";
import React, { useState } from "react";
import {
  C, TTS, SpeakBtn, SFX,
  Wrap, ActionBtn, HintBox, FeedbackBox, RevealBox, WrongBanner,
} from "@/lib/uiShared";
import { ZH_SECTIONS, ZH_CHAR_DICT, shuffle, seededShuffle } from "@/lib/quizMeta";
import { scoreBadge, OptionsGlossary } from "@/lib/sessionUtils";
import SplitViewLayout from "@/components/SplitViewLayout";

function BianZiSection({items, onDone}){
  const meta = ZH_SECTIONS.BianZi;
  const [qIdx,setQIdx] = useState(0);
  const [selected,setSelected] = useState(null);
  const [attempts,setAttempts] = useState(0);
  const [wrongTried,setWrongTried] = useState([]);
  const [solved,setSolved] = useState(false);
  const [revealed,setRevealed] = useState(false);
  const [learnAck,setLearnAck] = useState(false);
  const [results,setResults] = useState([]);
  const startRef = useRef(Date.now());

  const q = items[qIdx];

  function resetQ(){ setSelected(null);setAttempts(0);setWrongTried([]);setSolved(false);setRevealed(false);startRef.current=Date.now();  setLearnAck(false); }
  function handleSelect(i){ if(solved||revealed||wrongTried.includes(i)) return; setSelected(i); }
  function handleCheck(){
    if(selected===null||solved||revealed) return;
    const t=Date.now()-startRef.current;
    if(selected===q.answer){
      setSolved(true);
      setResults(r=>[...r,{id:q.id,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,timeTaken:t,sectionType:"BianZi",topic:"辨字测验",sentence:q.sentence,correctAnswer:q.options?q.options[q.answer]:q.answer,meaning:q.meaning||null}]);
    } else {
      const na=attempts+1; setAttempts(na); setWrongTried(p=>[...p,selected]); setSelected(null);
      if(na>=3){ setRevealed(true); setResults(r=>[...r,{id:q.id,correct:false,attempts:0,timeTaken:t,sectionType:"BianZi",topic:"辨字测验",sentence:q.sentence}]); }
    }
  }
  function next(){ if(qIdx+1>=items.length){ onDone(results); return; } setQIdx(i=>i+1); resetQ(); }

  const badge = solved ? scoreBadge(attempts+1) : null;
  const canNext = (solved||revealed)&&learnAck;

  const parts = q.sentence.split("___");

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>第 {qIdx+1} / {items.length} 题</span>
        <div style={{display:"flex",gap:4}}>
          {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<attempts?C.red:"#E2E8F0"}}/>)}
        </div>
      </div> <div style={{background:C.card,borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
        <TagPill color={meta.color} bg={meta.color+"18"}>辨字测验</TagPill>
          {q.note==="verify-parent"&&(
            <span style={{background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:7,
              padding:"2px 8px",fontSize:10,fontWeight:700,color:"#92400E",marginLeft:6}}>
              ⚠️ 请家长确认
            </span>
          )}
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:10}}>
            <SpeakBtn text={q.sentence.replace("___","空格")} lang="zh" style={{flexShrink:0}}/>
            <div style={{fontSize:18,fontWeight:700,color:C.text,lineHeight:2,flex:1}}>
          {parts[0]}
          <span style={{display:"inline-block",background:solved?"#D1FAE5":revealed?"#FEE2E2":"#DBEAFE",border:`2px solid ${solved?C.green:revealed?C.red:meta.color}`,borderRadius:8,padding:"0 8px",minWidth:36,textAlign:"center",color:solved?"#065F46":revealed?C.red:meta.color,fontWeight:900,fontSize:20}}>
            {(solved||revealed) ? q.options[q.answer] : "？"}
          </span>
          {parts[1]}
        </div>
        </div>
        {(solved||revealed)&&(
          <div style={{marginTop:8,fontSize:12,color:C.muted}}>
            拼音：<span style={{fontWeight:700,color:meta.color}}>{q.pinyin}</span>
          </div>
        )}
      </div>

      {attempts>0&&!solved&&!revealed&&<HintBox text={q.hint}/>} <div style={{marginBottom:14}}>
        {q.options.map((opt,i)=>{
          const isAns=i===q.answer, isWrong=wrongTried.includes(i);
          let bg=C.card,border=C.border,col=C.text,op=1;
          if(solved||revealed){ if(isAns){bg=C.lGreen;border=C.green;col="#065F46";}else op=0.35; }
          else if(isWrong){bg="#FEE2E2";border=C.red;col=C.red;op=0.6;}
          else if(selected===i){bg=C.lBlue;border=meta.color;col=meta.color;}
          const showMeaning=(solved||revealed);
          return(
            <div key={i} onClick={()=>handleSelect(i)} style={{background:bg,border:`2px solid ${border}`,borderRadius:14,padding:"13px 16px",marginBottom:10,cursor:(solved||revealed||isWrong)?"default":"pointer",display:"flex",alignItems:"center",gap:12,opacity:op,transition:"all .15s"}}>
              <div style={{width:36,height:36,borderRadius:10,background:(selected===i&&!isWrong)?meta.color:"#EEF2F7",color:(selected===i&&!isWrong)?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,flexShrink:0}}>{opt}</div>
              <div style={{flex:1}}>
                {showMeaning&&isAns&&<div style={{fontSize:11,color:"#065F46",fontStyle:"italic"}}>{q.meaning}</div>}
              </div>
              {(solved||revealed)&&isAns&&<span>✅</span>}
              {isWrong&&<span>❌</span>}
            </div>
          );
        })}
      </div>

      {solved&&<FeedbackBox badge={badge} meaning={q.meaning}/>}
      {revealed&&<RevealBox meaning={q.meaning}/>}
      {(solved||revealed)&&<OptionsGlossary q={q} lang="zh"/>}
      {(solved||revealed)&&!learnAck&&(
        <LearnCard q={q} sectionType="BianZi" wasCorrect={solved&&attempts===0}
          onAcknowledge={()=>setLearnAck(true)}/>
      )}
      {canNext
        ? <ActionBtn color={meta.color} onClick={next}>{qIdx+1>=items.length?"完成本节 →":"下一题 →"}</ActionBtn>
        : (solved||revealed)?null
        : <ActionBtn color={meta.color} onClick={handleCheck} disabled={selected===null}>确认答案</ActionBtn>
      }
    </div>
  );
}

function CiYuSection({items, onDone}){
  const meta = ZH_SECTIONS.CiYu;
  const [qIdx,setQIdx] = useState(0);
  const [selected,setSelected] = useState(null);
  const [attempts,setAttempts] = useState(0);
  const [wrongTried,setWrongTried] = useState([]);
  const [solved,setSolved] = useState(false);
  const [revealed,setRevealed] = useState(false);
  const [results,setResults] = useState([]);
  const startRef = useRef(Date.now());

  const q = items[qIdx];
  function resetQ(){ setSelected(null);setAttempts(0);setWrongTried([]);setSolved(false);setRevealed(false);startRef.current=Date.now(); }
  function handleSelect(i){ if(solved||revealed||wrongTried.includes(i)) return; setSelected(i); }
  function handleCheck(){
    if(selected===null||solved||revealed) return;
    const t=Date.now()-startRef.current;
    if(selected===q.answer){
      setSolved(true);
      setResults(r=>[...r,{id:q.id,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,timeTaken:t,sectionType:"CiYu",topic:"词语选择",sentence:q.sentence,correctAnswer:q.options?q.options[q.answer]:q.answer,meaning:q.meaning||null}]);
    } else {
      const na=attempts+1; setAttempts(na); setWrongTried(p=>[...p,selected]); setSelected(null);
      if(na>=3){ setRevealed(true); setResults(r=>[...r,{id:q.id,correct:false,attempts:0,timeTaken:t,sectionType:"CiYu",topic:"词语选择",sentence:q.sentence}]); }
    }
  }
  function next(){ if(qIdx+1>=items.length){ onDone(results); return; } setQIdx(i=>i+1); resetQ(); }
  const badge=solved?scoreBadge(attempts+1):null;
  const canNext=solved||revealed;
  const parts=q.sentence.split("___");

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>第 {qIdx+1} / {items.length} 题</span>
        <div style={{display:"flex",gap:4}}>
          {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<attempts?C.red:"#E2E8F0"}}/>)}
        </div>
      </div>
      <div style={{background:C.card,borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
        <TagPill color={meta.color} bg={meta.color+"18"}>词语选择</TagPill>
        {q.sentence&&<div style={{marginTop:8}}><SpeakBtn text={q.sentence.replace(/_+/g,"空格")} lang="zh"/></div>}
        <div style={{fontSize:16,fontWeight:700,color:C.text,lineHeight:2,marginTop:10}}>
          {parts[0]}
          <span style={{display:"inline-block",background:solved?"#D1FAE5":revealed?"#FEE2E2":"#EDE9FE",border:`2px solid ${solved?C.green:revealed?C.red:meta.color}`,borderRadius:8,padding:"0 8px",color:solved?"#065F46":revealed?C.red:meta.color,fontWeight:900}}>
            {(solved||revealed) ? q.options[q.answer] : "______"}
          </span>
          {parts[1]}
        </div>
      </div>
      {attempts>0&&!solved&&!revealed&&<HintBox text={q.hint}/>}
      <div style={{marginBottom:14}}>
        {q.options.map((opt,i)=>{
          const isAns=i===q.answer,isWrong=wrongTried.includes(i);
          let bg=C.card,border=C.border,col=C.text,op=1;
          if(solved||revealed){if(isAns){bg=C.lGreen;border=C.green;col="#065F46";}else op=0.35;}
          else if(isWrong){bg="#FEE2E2";border=C.red;col=C.red;op=0.6;}
          else if(selected===i){bg=C.lBlue;border=meta.color;col=meta.color;}
          const showM=solved||revealed;
          return(
            <div key={i} onClick={()=>handleSelect(i)} style={{background:bg,border:`2px solid ${border}`,borderRadius:14,padding:"12px 16px",marginBottom:10,cursor:(solved||revealed||isWrong)?"default":"pointer",display:"flex",alignItems:"center",gap:12,opacity:op,transition:"all .15s"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:(selected===i&&!isWrong)?meta.color:"#EEF2F7",color:(selected===i&&!isWrong)?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <span style={{fontSize:14,fontWeight:600,color:col}}>{opt}</span>
                {showM&&isAns&&<div style={{fontSize:11,color:"#065F46",marginTop:2,fontStyle:"italic"}}>{q.meaning}</div>}
                {showM&&!isAns&&<div style={{fontSize:11,color:"#94A3B8",marginTop:2,fontStyle:"italic"}}>{q.meaning}</div>}
              </div>
              {(solved||revealed)&&isAns&&<span>✅</span>}
              {isWrong&&<span>❌</span>}
            </div>
          );
        })}
      </div>
      {solved&&<FeedbackBox badge={badge} meaning={q.meaning}/>}
      {revealed&&<RevealBox meaning={q.meaning}/>}
      {(solved||revealed)&&<OptionsGlossary q={q} lang="zh"/>}
      {canNext
        ? <ActionBtn color={meta.color} onClick={next}>{qIdx+1>=items.length?"完成本节 →":"下一题 →"}</ActionBtn>
        : <ActionBtn color={meta.color} onClick={handleCheck} disabled={selected===null}>确认答案</ActionBtn>
      }
    </div>
  );
}

function KanTuSection({set, onDone}){
  const meta = ZH_SECTIONS.KanTu;
  const [answers,setAnswers] = useState({});
  const [checked,setChecked] = useState({});
  const [attempts,setAttempts] = useState({});
  const [results,setResults] = useState([]);
  const [usedWords,setUsedWords] = useState([]);
  const startRef = useRef(Date.now());

  const items = set.items;
  const allSettled = items.every(it=>checked[it.id]===true||checked[it.id]==="revealed");

  function selectWord(itemId, word){
    if(checked[itemId]) return;
    setAnswers(a=>({...a,[itemId]:word}));
  }

  function checkItem(item){
    const chosen=answers[item.id];
    if(!chosen||checked[item.id]) return;
    const t=Date.now()-startRef.current;
    if(chosen===item.answer){
      setChecked(p=>({...p,[item.id]:true}));
      setUsedWords(u=>[...u,chosen]);
      setResults(r=>[...r,{id:item.id,correct:(attempts[item.id]||0)===0,solvedAfterHint:(attempts[item.id]||0)>0,attempts:(attempts[item.id]||0)+1,timeTaken:t,sectionType:"KanTu",topic:"看图选词"}]);
    } else {
      const na=(attempts[item.id]||0)+1;
      setAttempts(p=>({...p,[item.id]:na}));
      setAnswers(a=>({...a,[item.id]:null}));
      if(na>=3){
        setChecked(p=>({...p,[item.id]:"revealed"}));
        setUsedWords(u=>[...u,item.answer]);
        setResults(r=>[...r,{id:item.id,correct:false,attempts:0,timeTaken:t,sectionType:"KanTu",topic:"看图选词"}]);
      }
    }
  }

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}> <div style={{background:C.lBlue,border:`1px solid ${meta.color}33`,borderRadius:14,padding:"10px 14px",marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:800,color:meta.color,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>词语库 Word Bank</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {set.wordBank.map(w=>{
            const used=usedWords.includes(w);
            return(
              <span key={w} style={{background:used?"#E2E8F0":"#fff",border:`1.5px solid ${used?"#CBD5E1":meta.color}`,borderRadius:10,padding:"4px 14px",fontSize:14,fontWeight:700,color:used?C.muted:C.text,textDecoration:used?"line-through":"none",transition:"all .2s"}}>{w}</span>
            );
          })}
        </div>
      </div> {items.map(item=>{
        const isC=checked[item.id]===true, isR=checked[item.id]==="revealed";
        const att=attempts[item.id]||0;
        return(
          <div key={item.id} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}> <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:72,height:72,borderRadius:16,background:isC?"#D1FAE5":isR?"#FEE2E2":"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,flexShrink:0,border:`2px solid ${isC?C.green:isR?C.red:C.border}`}}>
                {item.emoji}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.5,marginBottom:4}}>{item.emojiLabel}</div>
                {(isC||isR)&&(
                  <div style={{fontWeight:900,fontSize:16,color:isC?"#065F46":C.red}}>
                    {item.answer} {isC?"✅":"❌"}
                  </div>
                )}
              </div>
            </div> {att>0&&!isC&&!isR&&<HintBox text={item.hint}/>} {!isC&&!isR&&(
              <>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>
                  {set.wordBank.filter(w=>!usedWords.includes(w)||(answers[item.id]===w)).map(w=>{
                    const sel=answers[item.id]===w;
                    return(
                      <div key={w} onClick={()=>selectWord(item.id,w)} style={{background:sel?meta.color:"#F1F5F9",border:`2px solid ${sel?meta.color:C.border}`,borderRadius:10,padding:"6px 14px",fontSize:14,fontWeight:700,cursor:"pointer",color:sel?"#fff":C.text,transition:"all .15s"}}>
                        {w}
                      </div>
                    );
                  })}
                </div>
                <button onClick={()=>checkItem(item)} disabled={!answers[item.id]} style={{background:answers[item.id]?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"7px 18px",fontSize:13,fontWeight:700,cursor:answers[item.id]?"pointer":"not-allowed"}}>
                  确认 ({3-att} 次)
                </button>
              </>
            )}
          </div>
        );
      })}

      {allSettled&&<ActionBtn color={meta.color} onClick={()=>onDone(results)}>完成本节 →</ActionBtn>}
    </div>
  );
}

function PeiDuiSection({set, onDone}){
  const meta = ZH_SECTIONS.PeiDui;
  const [answers,setAnswers] = useState({});
  const [checked,setChecked] = useState({});
  const [attempts,setAttempts] = useState({});
  const [results,setResults] = useState([]);
  const [usedOpts,setUsedOpts] = useState([]);
  const startRef = useRef(Date.now());

  const items = set.items;
  const allSettled = items.every(it=>checked[it.id]===true||checked[it.id]==="revealed");

  function selectOpt(itemId,opt){
    if(checked[itemId]) return;
    setAnswers(a=>({...a,[itemId]:opt}));
  }

  function checkItem(item){
    const chosen=answers[item.id];
    if(!chosen||checked[item.id]) return;
    const t=Date.now()-startRef.current;
    if(chosen===item.answer){
      setChecked(p=>({...p,[item.id]:true}));
      setUsedOpts(u=>[...u,chosen]);
      setResults(r=>[...r,{id:item.id,correct:(attempts[item.id]||0)===0,solvedAfterHint:(attempts[item.id]||0)>0,attempts:(attempts[item.id]||0)+1,timeTaken:t,sectionType:"PeiDui",topic:"词语搭配"}]);
    } else {
      const na=(attempts[item.id]||0)+1;
      setAttempts(p=>({...p,[item.id]:na}));
      setAnswers(a=>({...a,[item.id]:null}));
      if(na>=3){
        setChecked(p=>({...p,[item.id]:"revealed"}));
        setUsedOpts(u=>[...u,item.answer]);
        setResults(r=>[...r,{id:item.id,correct:false,attempts:0,timeTaken:t,sectionType:"PeiDui",topic:"词语搭配"}]);
      }
    }
  }

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{background:C.lAmber,border:`1px solid ${meta.color}44`,borderRadius:14,padding:"10px 14px",marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:800,color:"#92400E",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>选项 Options (每个只用一次)</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {set.options.map(opt=>{
            const used=usedOpts.includes(opt);
            return <span key={opt} style={{background:used?"#E2E8F0":"#fff",border:`1.5px solid ${used?"#CBD5E1":"#D97706"}`,borderRadius:9,padding:"3px 12px",fontSize:13,fontWeight:700,color:used?C.muted:C.text,textDecoration:used?"line-through":"none"}}>{opt}</span>;
          })}
        </div>
      </div>

      {items.map((item,idx)=>{
        const isC=checked[item.id]===true, isR=checked[item.id]==="revealed";
        const att=attempts[item.id]||0;
        const blankParts=item.blank.split("　");
        return(
          <div key={item.id} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:26,height:26,borderRadius:8,background:isC?C.lGreen:isR?"#FEE2E2":meta.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:isC?C.green:isR?C.red:meta.color,flexShrink:0}}>
                {idx+1}
              </div>
              <div style={{fontSize:16,fontWeight:700,color:C.text,lineHeight:1.8}}>
                {blankParts[0]}（
                <span style={{display:"inline-block",background:isC?"#D1FAE5":isR?"#FEE2E2":"#DBEAFE",border:`1.5px solid ${isC?C.green:isR?C.red:meta.color}`,borderRadius:7,padding:"0 8px",minWidth:40,textAlign:"center",color:isC?"#065F46":isR?C.red:meta.color,fontWeight:900}}>
                  {(isC||isR)?item.answer:"？"}
                </span>
                ）{blankParts[1]||""}
              </div>
            </div>

            {att>0&&!isC&&!isR&&<HintBox text={item.hint}/>}

            {!isC&&!isR&&(
              <>
                <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:8}}>
                  {set.options.filter(o=>!usedOpts.includes(o)||(answers[item.id]===o)).map(opt=>{
                    const sel=answers[item.id]===opt;
                    return <div key={opt} onClick={()=>selectOpt(item.id,opt)} style={{background:sel?meta.color:"#F1F5F9",border:`2px solid ${sel?meta.color:C.border}`,borderRadius:9,padding:"5px 12px",fontSize:13,fontWeight:700,cursor:"pointer",color:sel?"#fff":C.text,transition:"all .15s"}}>{opt}</div>;
                  })}
                </div>
                <button onClick={()=>checkItem(item)} disabled={!answers[item.id]} style={{background:answers[item.id]?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:9,padding:"6px 16px",fontSize:12,fontWeight:700,cursor:answers[item.id]?"pointer":"not-allowed"}}>
                  确认 ({3-att} 次剩)
                </button>
              </>
            )}
            {isC&&<div style={{fontSize:12,color:C.green,fontWeight:700}}>✅ 正确！</div>}
            {isR&&<div style={{fontSize:12,color:C.red,fontWeight:700}}>📖 答案：{item.answer}</div>}
          </div>
        );
      })}

      {allSettled&&<ActionBtn color={meta.color} onClick={()=>onDone(results)}>完成本节 →</ActionBtn>}
    </div>
  );
}

function JuZiSection({items, onDone}){
  const meta = ZH_SECTIONS.JuZi;
  const [qIdx,setQIdx] = useState(0);
  const [shuffledTiles,setShuffledTiles] = useState([]);
  const [placed,setPlaced] = useState([]);   // tiles placed in order
  const [solved,setSolved] = useState(false);
  const [revealed,setRevealed] = useState(false);
  const [attempts,setAttempts] = useState(0);
  const [results,setResults] = useState([]);
  const startRef = useRef(Date.now());

  const q = items[qIdx];

  useEffect(()=>{
    setShuffledTiles(shuffle([...q.tiles]));
    setPlaced([]);
    setSolved(false);
    setRevealed(false);
    setAttempts(0);
    startRef.current=Date.now();
  }, [qIdx]);

  function tapTile(tile, fromPlaced){
    if(solved||revealed) return;
    if(fromPlaced){
      const idx=placed.indexOf(tile);
      const np=[...placed]; np.splice(idx,1);
      setPlaced(np);
      setShuffledTiles(p=>[...p,tile]);
    } else {
      setPlaced(p=>[...p,tile]);
      setShuffledTiles(p=>{ const np=[...p]; const i=np.indexOf(tile); np.splice(i,1); return np; });
    }
  }

  function checkSentence(){
    if(solved||revealed) return;
    const built = placed.join("");
    if(built === q.targetSentence){
      setSolved(true);
      setResults(r=>[...r,{id:q.id,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,timeTaken:Date.now()-startRef.current,sectionType:"JuZi",topic:"扩写句子"}]);
    } else {
      const na=attempts+1; setAttempts(na);
      if(na>=3){
        setRevealed(true);
        setResults(r=>[...r,{id:q.id,correct:false,attempts:0,timeTaken:Date.now()-startRef.current,sectionType:"JuZi",topic:"扩写句子"}]);
      }
    }
  }

  function resetTiles(){
    setShuffledTiles(shuffle([...q.tiles]));
    setPlaced([]);
  }

  function next(){ if(qIdx+1>=items.length){ onDone(results); return; } setQIdx(i=>i+1); }

  const badge = solved ? scoreBadge(attempts+1) : null;
  const canCheck = placed.length===q.tiles.length && !solved && !revealed;

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>第 {qIdx+1} / {items.length} 题</span>
        <div style={{display:"flex",gap:4}}>
          {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<attempts?C.red:"#E2E8F0"}}/>)}
        </div>
      </div> <div style={{background:C.card,borderRadius:18,padding:"16px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
        <TagPill color={meta.color} bg={meta.color+"18"}>扩写句子</TagPill>
        <div style={{marginTop:10,fontSize:12,fontWeight:700,color:C.muted,marginBottom:4}}>📋 任务</div>
        <div style={{fontSize:14,fontWeight:700,color:C.navy}}>{q.instruction}</div>
        {q.baseSentence&&(
          <div style={{marginTop:8,background:"#F8FAFC",borderRadius:10,padding:"8px 12px",fontSize:13,color:C.muted}}>
            原句：{q.baseSentence}
          </div>
        )}
      </div> {attempts>0&&!solved&&!revealed&&<HintBox text={q.hint}/>} <div style={{background:C.card,borderRadius:16,padding:"14px",marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
        <div style={{fontSize:11,fontWeight:800,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
          {solved?"✅ 完成！":revealed?"📖 正确答案":"👆 点击词语，按顺序排列"}
        </div> <div style={{minHeight:56,background:solved?"#D1FAE5":revealed?"#FEE2E2":"#F0F9FF",border:`2px dashed ${solved?C.green:revealed?C.red:meta.color}`,borderRadius:12,padding:"10px 10px",marginBottom:12,display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
          {revealed
            ? <span style={{fontSize:15,fontWeight:700,color:C.red,lineHeight:1.8}}>{q.targetSentence}</span>
            : placed.length===0
              ? <span style={{fontSize:13,color:C.muted,fontStyle:"italic"}}>在下方点击词语……</span>
              : placed.map((tile,i)=>(
                  <div key={i} onClick={()=>tapTile(tile,true)} style={{background:solved?"#A7F3D0":"#DBEAFE",border:`1.5px solid ${solved?C.green:meta.color}`,borderRadius:9,padding:"6px 12px",fontSize:15,fontWeight:700,cursor:solved?"default":"pointer",color:solved?"#065F46":meta.color,transition:"all .15s"}}>
                    {tile}
                  </div>
                ))
          }
        </div> {!solved&&!revealed&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {shuffledTiles.map((tile,i)=>(
              <div key={i} onClick={()=>tapTile(tile,false)} style={{background:"#F1F5F9",border:`2px solid ${C.border}`,borderRadius:9,padding:"6px 12px",fontSize:15,fontWeight:700,cursor:"pointer",color:C.text,transition:"all .15s"}}>
                {tile}
              </div>
            ))}
          </div>
        )}
      </div> {!solved&&!revealed&&placed.length>0&&(
        <button onClick={resetTiles} style={{background:"none",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",color:C.muted,marginBottom:10}}>
          🔄 重新排列
        </button>
      )}

      {solved&&<FeedbackBox badge={badge} meaning={null}/>}
      {revealed&&(
        <div style={{background:C.lRed,border:`1.5px solid ${C.red}`,borderRadius:14,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:13,color:C.red,marginBottom:4}}>📖 正确答案</div>
          <div style={{fontSize:15,fontWeight:700,color:C.text,lineHeight:1.8}}>{q.targetSentence}</div>
        </div>
      )}

      {(solved||revealed)
        ? <ActionBtn color={meta.color} onClick={next}>{qIdx+1>=items.length?"完成本节 →":"下一题 →"}</ActionBtn>
        : <ActionBtn color={meta.color} onClick={checkSentence} disabled={!canCheck}>检查句子</ActionBtn>
      }
    </div>
  );
}

function ZuJuSection({set, onDone}){
  const meta = ZH_SECTIONS.ZuJu;
  const [order,setOrder] = useState([]);       // indices in selected order
  const [checked,setChecked] = useState(false);
  const [attempts,setAttempts] = useState(0);
  const [solved,setSolved] = useState(false);
  const [revealed,setRevealed] = useState(false);
  const [shuffled] = useState(()=>shuffle([...set.sentences.map((_,i)=>i)]));
  const startRef = useRef(Date.now());

  function tapSentence(idx){
    if(checked||solved||revealed) return;
    if(order.includes(idx)){
      setOrder(o=>o.filter(i=>i!==idx));
    } else {
      setOrder(o=>[...o,idx]);
    }
  }

  function checkOrder(){
    if(order.length!==set.sentences.length) return;
    const t=Date.now()-startRef.current;
    const correct=order.every((idx,pos)=>set.correctOrder[pos]===idx);
    if(correct){
      setSolved(true);
      onDone([{id:set.id,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,timeTaken:t,sectionType:"ZuJu",topic:"组句成段"}]);
    } else {
      const na=attempts+1; setAttempts(na); setOrder([]);
      if(na>=3){
        setRevealed(true);
        onDone([{id:set.id,correct:false,attempts:0,timeTaken:t,sectionType:"ZuJu",topic:"组句成段"}]);
      }
    }
  }

  const badge = solved ? scoreBadge(attempts+1) : null;
  const displayOrder = order.length>0 ? order : shuffled;

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{background:"#F5F3FF",border:`1px solid #DDD6FE`,borderRadius:14,padding:"11px 14px",marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:800,color:"#4C1D95",marginBottom:4}}>📋 {set.setLabel}</div>
        <div style={{fontSize:12,color:"#6D28D9",lineHeight:1.6}}>
          {solved||revealed ? "正确顺序如下：" : "点击句子，按正确顺序排列（点击已选的可以取消）"}
        </div>
      </div>

      {attempts>0&&!solved&&!revealed&&<HintBox text={set.hint}/>} {(revealed ? set.correctOrder : shuffled).map((sentIdx,displayPos)=>{
        const sentence=set.sentences[sentIdx];
        const selectedPos=order.indexOf(sentIdx);
        const isSelected=selectedPos>=0;
        const isFirst=sentIdx===0; // first sentence is always labeled "1"
        return(
          <div key={sentIdx} onClick={()=>tapSentence(sentIdx)} style={{background:solved?"#D1FAE5":isSelected?C.lBlue:C.card,border:`2px solid ${solved?C.green:isSelected?meta.color:C.border}`,borderRadius:14,padding:"13px 14px",marginBottom:10,cursor:(solved||revealed)?"default":"pointer",display:"flex",alignItems:"flex-start",gap:12,transition:"all .15s"}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:solved?"#065F46":isSelected?meta.color:isFirst&&!order.length?"#1E3A6E":"#E2E8F0",color:solved||isSelected||isFirst?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,flexShrink:0,marginTop:1}}>
              {solved ? displayPos+1 : isSelected ? selectedPos+1 : isFirst&&!order.length ? "1" : "○"}
            </div>
            <div style={{fontSize:14,fontWeight:600,color:solved?"#065F46":C.text,lineHeight:1.7,flex:1}}>
              {sentence.text}
            </div>
          </div>
        );
      })}

      {solved&&<FeedbackBox badge={badge} meaning={null}/>}
      {revealed&&(
        <div style={{background:C.lRed,border:`1.5px solid ${C.red}`,borderRadius:14,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:13,color:C.red}}>📖 正确顺序已显示</div>
        </div>
      )}

      {!solved&&!revealed&&(
        <ActionBtn color={meta.color} onClick={checkOrder} disabled={order.length!==set.sentences.length}>
          {order.length<set.sentences.length ? `还需选 ${set.sentences.length-order.length} 句` : "确认顺序"}
        </ActionBtn>
      )}
    </div>
  );
}

function YueReadSection({set, onDone}){
  const meta = ZH_SECTIONS.YueRead;
  const [answers,setAnswers] = useState({});
  const [attempts,setAttempts] = useState({});
  const [correct,setCorrect] = useState({});
  const [revealed,setRevealed] = useState({});
  const [results,setResults] = useState([]);
  const startRef = useRef(Date.now());

  const qs = set.questions;
  const allSettled = qs.every(q=>correct[q.id]||revealed[q.id]);

  function selectAns(qid,i){ if(correct[qid]||revealed[qid]) return; setAnswers(a=>({...a,[qid]:i})); }
  function checkQ(q){
    const chosen=answers[q.id]; if(chosen===undefined||correct[q.id]||revealed[q.id]) return;
    const t=Date.now()-startRef.current;
    if(chosen===q.answer){
      setCorrect(p=>({...p,[q.id]:true}));
      setResults(r=>[...r,{id:q.id,correct:(attempts[q.id]||0)===0,solvedAfterHint:(attempts[q.id]||0)>0,attempts:(attempts[q.id]||0)+1,timeTaken:t,sectionType:"YueRead",topic:"阅读理解"}]);
    } else {
      const na=(attempts[q.id]||0)+1; setAttempts(p=>({...p,[q.id]:na}));
      setAnswers(a=>({...a,[q.id]:undefined}));
      if(na>=3){
        setRevealed(p=>({...p,[q.id]:true}));
        setResults(r=>[...r,{id:q.id,correct:false,attempts:0,timeTaken:t,sectionType:"YueRead",topic:"阅读理解"}]);
      }
    }
  }

  const passagePanel = (
    <div style={{fontSize:15,color:C.text,lineHeight:2.2,whiteSpace:"pre-line",letterSpacing:"0.02em"}}>
      <div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:10,textTransform:"uppercase",letterSpacing:2}}>
        {set.setLabel}
      </div>
      {set.passage}
    </div>
  );

  const questionsPanel = (
    <div style={{paddingBottom:100}}>
      {qs.map((q,qi)=>{
        const wa=attempts[q.id]||0, isC=correct[q.id], isR=revealed[q.id];
        return(
          <div key={q.id} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:8}}>{qi+1}. {q.question}</div>
            {wa>0&&!isC&&!isR&&<HintBox text={q.hint}/>}
            <div>
              {q.options.map((opt,i)=>{
                let bg="#F8FAFC",border=C.border,col=C.text,cursor="pointer",op=1;
                if(isC||isR)cursor="default";
                if((isC||isR)&&i===q.answer){bg=C.lGreen;border=C.green;col="#065F46";}
                else if((isC||isR)&&i!==q.answer) op=0.35;
                else if(answers[q.id]===i&&!isC&&!isR){bg=C.lBlue;border=meta.color;col=meta.color;}
                return(
                  <div key={i} onClick={()=>selectAns(q.id,i)} style={{background:bg,border:`2px solid ${border}`,borderRadius:12,padding:"10px 14px",marginBottom:8,cursor,display:"flex",alignItems:"center",gap:10,opacity:op,transition:"all .15s"}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:answers[q.id]===i&&!isC&&!isR?meta.color:"#EEF2F7",color:answers[q.id]===i&&!isC&&!isR?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div>
                    <span style={{fontSize:14,fontWeight:600,color:col,flex:1}}>{opt}</span>
                    {(isC||isR)&&i===q.answer&&<span>✅</span>}
                  </div>
                );
              })}
            </div>
            {!isC&&!isR&&(
              <button onClick={()=>checkQ(q)} disabled={answers[q.id]===undefined} style={{marginTop:4,background:answers[q.id]!==undefined?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"7px 18px",fontSize:13,fontWeight:700,cursor:answers[q.id]!==undefined?"pointer":"not-allowed"}}>
                确认 ({3-wa} 次剩)
              </button>
            )}
          </div>
        );
      })}
      {allSettled&&<ActionBtn color={meta.color} onClick={()=>onDone(results)}>完成本节 →</ActionBtn>}
    </div>
  );

  return (
    <SplitViewLayout
      leftContent={passagePanel}
      rightContent={questionsPanel}
      leftLabel="阅读短文"
      rightLabel="回答问题"
      headerHeight={80}
    />
  );
}


function ZhSessionScreen({plan, onFinish, onBack}){
  const [secIdx,setSecIdx] = useState(0);
  const [allResults,setAllResults] = useState([]);

  function handleSectionDone(results){
    const merged=[...allResults,...results];
    if(secIdx+1>=plan.length){ onFinish(merged); return; }
    setAllResults(merged);
    setSecIdx(i=>i+1);
  }

  const section = plan[secIdx];
  const isPastPaper = !!plan.isPastPaper;
  const meta = ZH_SECTIONS[section.type];
  const progress = Math.round((secIdx/plan.length)*100);

  return(
    <div style={{background:C.bg,minHeight:"100vh"}}> <div style={{background:`linear-gradient(135deg,${meta.color}dd,${meta.color})`,padding:"14px 20px 10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:9,width:32,height:32,cursor:"pointer",color:"#fff",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div style={{flex:1}}>
            <div style={{color:"#fff",fontSize:13,fontWeight:800}}>{meta.icon} {meta.label}</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:10,marginTop:1}}>{meta.sub} · 第{secIdx+1}/{plan.length}节</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.2)",borderRadius:9,padding:"3px 10px"}}>
            <span style={{color:"#fff",fontSize:11,fontWeight:700}}>{progress}%</span>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.25)",borderRadius:8,height:4}}>
          <div style={{background:"#fff",borderRadius:8,height:4,width:`${progress}%`,transition:"width .5s"}}/>
        </div>
      </div>

      {section.type==="BianZi"  &&<BianZiSection  key={secIdx} items={section.items}   onDone={handleSectionDone}/>}
      {section.type==="CiYu"    &&<CiYuSection    key={secIdx} items={section.items}   onDone={handleSectionDone}/>}
      {section.type==="KanTu"   &&<KanTuSection   key={secIdx} set={section.set}       onDone={handleSectionDone}/>}
      {section.type==="PeiDui"  &&<PeiDuiSection  key={secIdx} set={section.set}       onDone={handleSectionDone}/>}
      {section.type==="JuZi"    &&<JuZiSection    key={secIdx} items={section.items}   onDone={handleSectionDone}/>}
      {section.type==="ZuJu"    &&<ZuJuSection    key={secIdx} set={section.set}       onDone={handleSectionDone}/>}
      {section.type==="YueRead" &&<YueReadSection key={secIdx} set={section.set}       onDone={handleSectionDone}/>}
    </div>
  );
}






// ── Random shuffle (Fisher–Yates) ────────────────────────────


// ── Clickable word (tap to hear) ─────────────────────────────
export { ZhSessionScreen };
