"use client";
import React, { useState, useRef } from "react";
import {
  C, TTS, SpeakBtn, SFX,
  Wrap, TagPill, ActionBtn, HintBox, FeedbackBox, LearnCard, RevealBox, WrongBanner, RuleCard,
} from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER, WORD_DICT, SYN_ANT, shuffle, seededShuffle } from "@/lib/quizMeta";
import { reviewDays, scoreBadge, fmtTime, guessFlag, todayStr, dateLabel, TapWord, OptionsGlossary } from "@/lib/sessionUtils";
import SplitViewLayout from "@/components/SplitViewLayout";

function SessionScreen({plan, isMockExam, mockInfo, onFinish, onBack}){
  const [secIdx,setSecIdx]=useState(0);
  const [allResults,setAllResults]=useState([]);
  function handleSectionDone(results){ const merged=[...allResults,...results]; if(secIdx+1>=plan.length){onFinish(merged);return;} setAllResults(merged);setSecIdx(i=>i+1); }
  const section=plan[secIdx]; const meta=SECTIONS[section.type]; const progress=Math.round((secIdx/plan.length)*100);
  return(
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <div style={{background:isMockExam?"linear-gradient(135deg,#7C3AED,#8B5CF6)":`linear-gradient(135deg,${meta.color}dd,${meta.color})`,padding:"14px 20px 10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:9,width:32,height:32,cursor:"pointer",color:"#fff",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <div style={{flex:1}}>
            <div style={{color:"#fff",fontSize:13,fontWeight:800}}>{isMockExam?`🏫 Mock: ${mockInfo?.school||"School Paper"}`:meta.label}</div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:10}}>Section {secIdx+1}/{plan.length}</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.2)",borderRadius:9,padding:"3px 10px"}}><span style={{color:"#fff",fontSize:11,fontWeight:700}}>{progress}%</span></div>
        </div>
        <div style={{background:"rgba(255,255,255,0.25)",borderRadius:8,height:4}}>
          <div style={{background:"#fff",borderRadius:8,height:4,width:`${progress}%`,transition:"width 0.5s"}}/>
        </div>
      </div>
      {section.type==="GrammarMCQ"   &&<MCQSection   key={secIdx} items={section.items} sectionType="GrammarMCQ"   meta={meta} onDone={handleSectionDone}/>}
      {section.type==="VocabMCQ"     &&<MCQSection   key={secIdx} items={section.items} sectionType="VocabMCQ"     meta={meta} onDone={handleSectionDone}/>}
      {section.type==="GrammarCloze" &&<ClozeSection key={secIdx} sets={section.items}  sectionType="GrammarCloze" meta={meta} onDone={handleSectionDone}/>}
      {section.type==="VocabCloze"   &&<ClozeSection key={secIdx} sets={section.items}  sectionType="VocabCloze"   meta={meta} onDone={handleSectionDone}/>}
      {section.type==="Editing"      &&<EditSection  key={secIdx} sets={section.items}  sectionType="Editing"      meta={meta} onDone={handleSectionDone}/>}
      {section.type==="Comprehension"&&<CompSection  key={secIdx} sets={section.items}  sectionType="Comprehension"meta={meta} onDone={handleSectionDone}/>}
    </div>
  );
}

function SVASentence({sentence,highlights}){
  if(!highlights||!sentence) return <span>{sentence}</span>;
  const parts=[];
  let s=sentence;
  if(highlights.subject&&s.includes(highlights.subject)){
    const idx=s.indexOf(highlights.subject);
    if(idx>0)parts.push(<span key="pre">{s.slice(0,idx)}</span>);
    parts.push(<span key="sub" style={{background:"#DBEAFE",color:"#1E40AF",fontWeight:800,padding:"1px 3px",borderRadius:4}}>{highlights.subject}</span>);
    s=s.slice(idx+highlights.subject.length);
  }
  if(highlights.trap&&s.includes(highlights.trap)){
    const idx=s.indexOf(highlights.trap);
    if(idx>0)parts.push(<span key="pre2">{s.slice(0,idx)}</span>);
    parts.push(<span key="trap" style={{background:"#FEE2E2",color:"#991B1B",fontWeight:700,padding:"1px 3px",borderRadius:4,textDecoration:"line-through"}}>{highlights.trap}</span>);
    s=s.slice(idx+highlights.trap.length);
  }
  if(s)parts.push(<span key="rest">{s}</span>);
  return <span>{parts.length?parts:<span>{sentence}</span>}</span>;
}
function AnnotatedSentence({sentence}){
  return <span>{sentence}</span>;
}

function MCQSection({items,sectionType,meta,onDone}){
  const [qIdx,setQIdx]=useState(0);
  const [attempts,setAttempts]=useState(0);
  const [wrongTried,setWrongTried]=useState([]);
  const [selected,setSelected]=useState(null);
  const [solved,setSolved]=useState(false);
  const [revealed,setRevealed]=useState(false);
  const [results,  setResults]  = useState([]);
  const [lookedUp, setLookedUp] = useState([]);
  const startRef=useRef(Date.now());
  const q=items[qIdx]||items[0];
  function resetQ(){ setAttempts(0);setWrongTried([]);setSelected(null);setSolved(false);setRevealed(false);startRef.current=Date.now(); setLearnAck(false); }
  function handleSelect(i){ if(solved||revealed||wrongTried.includes(i)) return; setSelected(i); }
  function handleCheck(){
    if(selected===null||solved||revealed) return;
    const t=Date.now()-startRef.current;
    if(selected===q.answer){ setSolved(true); setResults(r=>[...r,{id:q.id,topic:q.topic,sentence:q.sentence,options:q.options,correctAnswer:q.answer,studentAnswer:selected,sectionType,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,timeTaken:t,flagged:guessFlag(t,sectionType),explanation:q.explanation||"",hint:q.hints?.[0]||"",lookedUpWords:lookedUp}]); }
    else { const na=attempts+1;setAttempts(na);setWrongTried(p=>[...p,selected]);setSelected(null); if(na>=3){setRevealed(true);setResults(r=>[...r,{id:q.id,topic:q.topic,sentence:q.sentence,options:q.options,correctAnswer:q.answer,studentAnswer:selected,sectionType,correct:false,attempts:0,timeTaken:t,flagged:guessFlag(t,sectionType),explanation:q.explanation||"",hint:q.hints?.[0]||"",lookedUpWords:lookedUp}]);} }
  }
  function next(){ if(qIdx+1>=items.length){onDone(results);return;} setQIdx(i=>i+1);resetQ(); }
  const [learnAck, setLearnAck] = useState(false);
  const canNext=(solved||revealed)&&learnAck; const canCheck=selected!==null&&!solved&&!revealed;
  const badge=solved?scoreBadge(attempts+1):null;
  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>Q {qIdx+1} / {items.length}</span>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<attempts?C.red:"#E2E8F0"}}/>)}
          <span style={{fontSize:10,color:C.muted,marginLeft:4}}>tries</span>
        </div>
      </div>
      <div style={{background:C.card,borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:6}}>
          <TagPill color={meta.color} bg={meta.color+"18"}>{q.topic}</TagPill>
          {q.emoji&&<span style={{fontSize:18}}>{q.emoji}</span>}
        </div>
        {false&&q.wordNote&&null}
        {q.question&&<div style={{fontSize:13,color:C.muted,marginBottom:8}}>{q.question}</div>}
        {q.highlights
          ? <SVASentence sentence={q.sentence} subject={q.highlights.subject} trap={q.highlights.trap}/>
          : <div style={{background:"#F0F9FF",borderRadius:12,padding:"12px 16px",fontSize:16,fontWeight:700,color:C.text,lineHeight:1.7}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <SpeakBtn text={q.sentence.replace(/_+/g,"blank")} lang="en" style={{flexShrink:0,marginTop:2}}/>
                <div style={{flex:1}}>
                  <AnnotatedSentence sentence={q.sentence} onLookup={(w)=>{setLookedUp(p=>[...new Set([...p,w])]); TTS.speakEnglish(w);}}/>
                </div>
              </div>
            </div>
        }
      </div>
      {attempts>0&&!solved&&!revealed&&<HintBox text={q.hints&&q.hints[Math.min(attempts-1,1)]} level={attempts}/>}
      {attempts>0&&!solved&&!revealed&&q.ruleCard&&<RuleCard card={q.ruleCard}/>}
      {attempts>0&&!solved&&!revealed&&<WrongBanner attempts={attempts}/>}
      <div style={{marginBottom:14}}>
        {(q.options||[]).map((opt,i)=>{
          const isWrong=wrongTried.includes(i);const isAns=i===q.answer;
          let bg=C.card,border=C.border,col=C.text,op=1;
          if(revealed||solved){if(isAns){bg=C.lGreen;border=C.green;col="#065F46";}else op=0.35;}
          else if(isWrong){bg="#FEE2E2";border=C.red;col=C.red;op=0.6;}
          else if(selected===i){bg=C.lBlue;border=meta.color;col=meta.color;}
          const showMeaning = (solved||revealed);
          const cleanOpt = opt.replace(/[.,!?'"]/g,"").toLowerCase();
          const meaning = showMeaning ? (WORD_DICT[cleanOpt] || null) : null;
          return(
            <div key={i} onClick={()=>handleSelect(i)} style={{background:bg,border:`2px solid ${border}`,borderRadius:14,padding:"13px 16px",marginBottom:10,cursor:(solved||revealed||isWrong)?"default":"pointer",display:"flex",alignItems:"center",gap:12,opacity:op,transition:"all 0.15s"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:(selected===i&&!isWrong)?meta.color:"#EEF2F7",color:(selected===i&&!isWrong)?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{String.fromCharCode(65+i)}</div>
              <div style={{flex:1}}>
                <span style={{fontSize:14,fontWeight:600,color:col}}>{opt}</span>
                {meaning&&(
                  <div style={{fontSize:11,color:isAns?"#065F46":"#64748B",marginTop:3,fontStyle:"italic",lineHeight:1.4}}>
                    {meaning}
                  </div>
                )}
              </div>
              {(solved||revealed)&&isAns&&<span style={{flexShrink:0}}>✅</span>}
              {isWrong&&<span style={{flexShrink:0}}>❌</span>}
            </div>
          );
        })}
      </div>
      {solved&&<FeedbackBox badge={badge} explanation={q.explanation||""}/>}
      {revealed&&<RevealBox explanation={q.explanation||""}/>}
      {(solved||revealed)&&<OptionsGlossary q={q} lang="en"/>}
      {(solved||revealed)&&!learnAck&&(
        <LearnCard q={q} sectionType={sectionType} wasCorrect={solved&&attempts===0}
          onAcknowledge={()=>setLearnAck(true)}/>
      )}
      {canNext?<ActionBtn color={meta.color} onClick={next}>{qIdx+1>=items.length?"Finish Section →":"Next Question →"}</ActionBtn>
               :(solved||revealed)?null
               :<ActionBtn color={meta.color} onClick={handleCheck} disabled={!canCheck}>Check Answer</ActionBtn>}
    </div>
  );
}

function ClozeSection({sets,sectionType,meta,onDone}){
  const [setIdx,setSetIdx]=useState(0);
  const [cAns,setCAns]=useState({});const [cAtt,setCAtt]=useState({});const [cCor,setCCor]=useState({});const [cRev,setCRev]=useState({});
  const [results,setResults]=useState([]);const startRef=useRef(Date.now());
  const cs=sets[setIdx]||sets[0]||{}; const blanks=cs.blanks||[];
  function allSettled(){return blanks.length>0&&blanks.every(b=>cCor[b.num]||cRev[b.num]);}
  function handleSelect(num,opt){if(cCor[num]||cRev[num])return;setCAns(a=>({...a,[num]:opt}));}
  function handleCheck(blank){
    const chosen=cAns[blank.num]; if(!chosen)return;
    const t=Date.now()-startRef.current;
    if(chosen===blank.answer){setCCor(p=>({...p,[blank.num]:true}));setResults(r=>[...r,{id:`${cs.id}_${blank.num}`,topic:sectionType,sectionType,correct:(cAtt[blank.num]||0)===0,solvedAfterHint:(cAtt[blank.num]||0)>0,attempts:(cAtt[blank.num]||0)+1,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}
    else{const prev=cAtt[blank.num]||0;const next=prev+1;setCAtt(p=>({...p,[blank.num]:next}));setCAns(a=>({...a,[blank.num]:null}));if(next>=3){setCRev(p=>({...p,[blank.num]:true}));setResults(r=>[...r,{id:`${cs.id}_${blank.num}`,topic:sectionType,sectionType,correct:false,attempts:0,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}}
  }
  function next(){if(setIdx+1>=sets.length){onDone(results);return;}setSetIdx(i=>i+1);setCAns({});setCAtt({});setCCor({});setCRev({});startRef.current=Date.now();}
  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span><TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill></div>
      {cs.wordBank&&<div style={{background:C.lBlue,border:`1px solid ${meta.color}33`,borderRadius:14,padding:"10px 14px",marginBottom:14}}><div style={{fontSize:11,fontWeight:800,color:meta.color,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Word Bank</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{cs.wordBank.map(w=><span key={w} style={{background:"#fff",border:`1px solid ${meta.color}44`,borderRadius:8,padding:"3px 12px",fontSize:13,fontWeight:600}}>{w}</span>)}</div></div>}
      <div style={{background:"#F0F9FF",border:"1.5px solid #BAE6FD",borderRadius:16,padding:"14px 16px",marginBottom:16}}><div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>📖 Read & Fill in the Blanks</div><div style={{fontSize:14,color:C.text,lineHeight:2}}>{cs.passage}</div></div>
      {blanks.map(b=>{
        const wa=cAtt[b.num]||0;const correct=cCor[b.num];const rev=cRev[b.num];
        return(<div key={b.num} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:26,height:26,borderRadius:8,background:correct?C.lGreen:rev?"#FEE2E2":meta.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:correct?C.green:rev?C.red:meta.color}}>{b.num}</div><span style={{fontSize:13,fontWeight:700,color:correct?C.green:rev?C.red:C.text}}>{correct?"✅ Correct!":rev?"📖 Answer shown":wa>0?`❌ Try again (${3-wa} left)`:"Choose the correct word"}</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>{(b.wordBank||cs.wordBank||[]).map(opt=>{let bg="#F1F5F9",border=C.border,col=C.text,cursor="pointer";if(correct||rev)cursor="default";if((correct||rev)&&opt===b.answer){bg=C.lGreen;border=C.green;col="#065F46";}else if(cAns[b.num]===opt&&!correct&&!rev){bg=C.lBlue;border=meta.color;col=meta.color;}return(<div key={opt} onClick={()=>handleSelect(b.num,opt)} style={{background:bg,border:`2px solid ${border}`,borderRadius:10,padding:"7px 16px",fontSize:14,fontWeight:600,cursor,color:col,transition:"all 0.15s"}}>{opt}</div>);})}</div>
          {wa>0&&!correct&&!rev&&b.hints&&<HintBox text={b.hints&&b.hints[Math.min(wa-1,1)]} level={wa}/>}
          {rev&&<div style={{background:"#FEE2E2",border:`1px solid ${C.red}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:C.red,fontWeight:600}}>✏️ Answer: <strong>{b.answer}</strong></div>}
          {!correct&&!rev&&<button onClick={()=>handleCheck(b)} disabled={!cAns[b.num]} style={{marginTop:6,background:cAns[b.num]?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"7px 20px",fontSize:13,fontWeight:700,cursor:cAns[b.num]?"pointer":"not-allowed"}}>Check ({3-wa} tries left)</button>}
        </div>);
      })}
      {allSettled()&&<ActionBtn color={meta.color} onClick={next}>{setIdx+1>=sets.length?"Finish Section →":`Next Set →`}</ActionBtn>}
    </div>
  );
}

function EditSection({sets,sectionType,meta,onDone}){
  const [setIdx,setSetIdx]=useState(0);const [answers,setAnswers]=useState({});const [attempts,setAttempts]=useState({});const [correct,setCorrect]=useState({});const [revealed,setRevealed]=useState({});const [results,setResults]=useState([]);const startRef=useRef(Date.now());
  const cs=sets[setIdx]||sets[0]||{}; const items=cs.items||[];
  function allSettled(){return items.every(item=>correct[item.id]||revealed[item.id]);}
  function handleSelect(id,opt){if(correct[id]||revealed[id])return;setAnswers(a=>({...a,[id]:opt}));}
  function handleCheck(item){const chosen=answers[item.id];if(!chosen)return;const t=Date.now()-startRef.current;if(item.options[item.answer]===chosen){setCorrect(p=>({...p,[item.id]:true}));setResults(r=>[...r,{id:item.id,topic:"Editing",sectionType,correct:(attempts[item.id]||0)===0,solvedAfterHint:(attempts[item.id]||0)>0,attempts:(attempts[item.id]||0)+1,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}else{const prev=attempts[item.id]||0;const next=prev+1;setAttempts(p=>({...p,[item.id]:next}));setAnswers(a=>({...a,[item.id]:null}));if(next>=3){setRevealed(p=>({...p,[item.id]:true}));setResults(r=>[...r,{id:item.id,topic:"Editing",sectionType,correct:false,attempts:0,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}}}
  function next(){if(setIdx+1>=sets.length){onDone(results);return;}setSetIdx(i=>i+1);setAnswers({});setAttempts({});setCorrect({});setRevealed({});startRef.current=Date.now();}
  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span><TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill></div>
      <div style={{background:"#FFF7ED",border:"1px solid #FDE68A",borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#78350F"}}>{cs.instructions}</div>
      {(items||[]).map(item=>{const wa=attempts[item.id]||0;const isC=correct[item.id];const isR=revealed[item.id];const cw=item.options[item.answer];
        return(<div key={item.id} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:14,lineHeight:1.8,marginBottom:10,color:C.text}}>{item.sentence.split(item.wrongWord).map((part,i,arr)=>(<span key={i}>{part}{i<arr.length-1&&<span style={{background:"#FEF3C7",border:"1px dashed #F59E0B",borderRadius:4,padding:"1px 6px",fontWeight:700,color:isC||isR?"#065F46":"#92400E",textDecoration:isC||isR?"line-through":"none"}}>{item.wrongWord}</span>}</span>))}{(isC||isR)&&<span style={{background:C.lGreen,border:`1px solid ${C.green}`,borderRadius:4,padding:"1px 6px",fontWeight:700,color:C.green,marginLeft:4}}>→ {cw}</span>}</div>
          <div style={{marginBottom:8,fontSize:12,fontWeight:700,color:C.muted}}>Choose the correct spelling:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>{(item.options||[]).map((opt,i)=>{let bg="#F1F5F9",border=C.border,col=C.text,cursor="pointer";if(isC||isR)cursor="default";if((isC||isR)&&i===item.answer){bg=C.lGreen;border=C.green;col="#065F46";}else if(answers[item.id]===opt&&!isC&&!isR){bg=C.lBlue;border=meta.color;col=meta.color;}return(<div key={opt} onClick={()=>handleSelect(item.id,opt)} style={{background:bg,border:`2px solid ${border}`,borderRadius:10,padding:"6px 14px",fontSize:14,fontWeight:600,cursor,color:col,transition:"all 0.15s"}}>{opt}</div>);})}</div>
          {wa>0&&!isC&&!isR&&<HintBox text={item.hints&&item.hints[Math.min(wa-1,1)]} level={wa}/>}
          {isR&&<div style={{background:"#FEE2E2",border:`1px solid ${C.red}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:C.red,fontWeight:600}}>✏️ Correct spelling: <strong>{cw}</strong></div>}
          {!isC&&!isR&&<button onClick={()=>handleCheck(item)} disabled={!answers[item.id]} style={{marginTop:6,background:answers[item.id]?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"7px 20px",fontSize:13,fontWeight:700,cursor:answers[item.id]?"pointer":"not-allowed"}}>Check ({3-wa} tries left)</button>}
        </div>);
      })}
      {allSettled()&&<ActionBtn color={meta.color} onClick={next}>{setIdx+1>=sets.length?"Finish Section →":"Next Set →"}</ActionBtn>}
    </div>
  );
}

function CompSection({sets,sectionType,meta,onDone}){
  const [setIdx,setSetIdx]=useState(0);const [answers,setAnswers]=useState({});const [attempts,setAttempts]=useState({});const [correct,setCorrect]=useState({});const [revealed,setRevealed]=useState({});const [results,setResults]=useState([]);const startRef=useRef(Date.now());
  const cs=sets[setIdx]||sets[0]||{};
  function allSettled(){return (cs.questions||[]).every(q=>correct[q.id]||revealed[q.id]);}
  function handleSelect(qid,i){if(correct[qid]||revealed[qid])return;setAnswers(a=>({...a,[qid]:i}));}
  function handleCheck(q){const chosen=answers[q.id];if(chosen===undefined)return;const t=Date.now()-startRef.current;if(chosen===q.answer){setCorrect(p=>({...p,[q.id]:true}));setResults(r=>[...r,{id:q.id,topic:"Comprehension",sectionType,correct:(attempts[q.id]||0)===0,solvedAfterHint:(attempts[q.id]||0)>0,attempts:(attempts[q.id]||0)+1,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}else{const prev=attempts[q.id]||0;const next=prev+1;setAttempts(p=>({...p,[q.id]:next}));setAnswers(a=>({...a,[q.id]:undefined}));if(next>=3){setRevealed(p=>({...p,[q.id]:true}));setResults(r=>[...r,{id:q.id,topic:"Comprehension",sectionType,correct:false,attempts:0,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}}}
  function next(){if(setIdx+1>=sets.length){onDone(results);return;}setSetIdx(i=>i+1);setAnswers({});setAttempts({});setCorrect({});setRevealed({});startRef.current=Date.now();}

  const passagePanel = (
    <div style={{fontSize:14,color:C.text,lineHeight:2,whiteSpace:"pre-line"}}>
      {cs.passage}
    </div>
  );

  const questionsPanel = (
    <div style={{paddingBottom:100}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span>
        <TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill>
      </div>
      {(cs.questions||[]).map((q,qi)=>{const wa=attempts[q.id]||0;const isC=correct[q.id];const isR=revealed[q.id];
        return(<div key={q.id} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:8}}>{qi+1}. {q.question}</div>
          {wa>0&&!isC&&!isR&&q.hints&&<HintBox text={q.hints&&q.hints[Math.min(wa-1,1)]} level={wa}/>}
          <div>{(q.options||[]).map((opt,i)=>{let bg="#F8FAFC",border=C.border,col=C.text,cursor="pointer",op=1;if(isC||isR)cursor="default";if((isC||isR)&&i===q.answer){bg=C.lGreen;border=C.green;col="#065F46";}else if((isC||isR)&&i!==q.answer)op=0.35;else if(answers[q.id]===i&&!isC&&!isR){bg=C.lBlue;border=meta.color;col=meta.color;}return(<div key={i} onClick={()=>handleSelect(q.id,i)} style={{background:bg,border:`2px solid ${border}`,borderRadius:12,padding:"10px 14px",marginBottom:8,cursor,display:"flex",alignItems:"center",gap:10,opacity:op,transition:"all 0.15s"}}><div style={{width:22,height:22,borderRadius:"50%",background:answers[q.id]===i&&!isC&&!isR?meta.color:"#EEF2F7",color:answers[q.id]===i&&!isC&&!isR?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>{String.fromCharCode(65+i)}</div><span style={{fontSize:13,fontWeight:600,color:col,flex:1}}>{opt}</span>{(isC||isR)&&i===q.answer&&<span>✅</span>}</div>);})}</div>
          {!isC&&!isR&&<button onClick={()=>handleCheck(q)} disabled={answers[q.id]===undefined} style={{marginTop:4,background:answers[q.id]!==undefined?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"7px 18px",fontSize:13,fontWeight:700,cursor:answers[q.id]!==undefined?"pointer":"not-allowed"}}>Check ({3-wa} tries left)</button>}
        </div>);
      })}
      {allSettled()&&<ActionBtn color={meta.color} onClick={next}>{setIdx+1>=sets.length?"Finish Section →":"Next Set →"}</ActionBtn>}
    </div>
  );

  return (
    <SplitViewLayout
      leftContent={passagePanel}
      rightContent={questionsPanel}
      leftLabel="Read the Passage"
      rightLabel="Questions"
      headerHeight={80}
    />
  );
}

function SummaryScreen({summary,mastery,onHome,onRetry}){
  const {results,duration}=summary;
  const total=results.length; const correct=results.filter(r=>r.correct).length;
  const pct=total?Math.round((correct/total)*100):0;
  const flagged=results.filter(r=>r.flagged); const wrong=results.filter(r=>!r.correct);
  const bySection={};SECTION_ORDER.forEach(t=>{bySection[t]=results.filter(r=>r.sectionType===t);});
  return(
    <div style={{paddingBottom:80}}>
      <div style={{background:`linear-gradient(135deg,${C.navy},#2563EB)`,borderRadius:"0 0 24px 24px",padding:"28px 24px",textAlign:"center",color:"#fff",marginBottom:20,boxShadow:"0 8px 28px rgba(30,58,110,0.35)"}}>
        <div style={{fontSize:48}}>{pct>=80?"🏆":pct>=60?"👍":"💪"}</div>
        <div style={{fontSize:38,fontWeight:900,margin:"8px 0 4px"}}>{pct}%</div>
        <div style={{fontSize:15,opacity:0.9}}>{correct}/{total} correct · {fmtTime(duration)}</div>
      </div>
      <div style={{padding:"0 16px"}}>
        <div style={{background:C.card,borderRadius:18,padding:"16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>📊 Section Breakdown</div>
          {SECTION_ORDER.map(type=>{const meta=SECTIONS[type];const items=bySection[type]||[];if(!items.length)return null;const c=items.filter(r=>r.correct).length;const p=Math.round((c/items.length)*100);return(<div key={type} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:700}}>{meta.icon} {meta.label}</span><span style={{fontSize:12,fontWeight:800,color:p>=80?C.green:p>=60?C.amber:C.red}}>{c}/{items.length} ({p}%)</span></div><div style={{background:"#EEF2F7",borderRadius:8,height:8}}><div style={{background:p>=80?C.green:p>=60?C.amber:C.red,borderRadius:8,height:8,width:`${p}%`,transition:"width 0.6s"}}/></div></div>);})}
        </div>
        {flagged.length>0&&(<div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:16,padding:"14px",marginBottom:14}}><div style={{fontWeight:800,fontSize:13,color:"#92400E",marginBottom:6}}>⚡ {flagged.length} Quick Answer{flagged.length>1?"s":""} Flagged</div>{(flagged||[]).map(f=>(<div key={f.id} style={{fontSize:12,color:"#78350F",marginBottom:3}}>• {f.topic} — {fmtTime(f.timeTaken)}</div>))}</div>)}
        {wrong.length>0&&(<div style={{background:C.lRed,border:`1px solid #FECACA`,borderRadius:16,padding:"14px",marginBottom:14}}><div style={{fontWeight:800,fontSize:13,color:C.red,marginBottom:8}}>📅 Added to Mistakes Log</div>{(wrong||[]).map((w,i)=>(<div key={i} style={{fontSize:13,color:C.text,marginBottom:4}}>• {w.topic}</div>))}</div>)}
        <button onClick={onHome} style={{width:"100%",background:`linear-gradient(135deg,${C.navy},#2563EB)`,color:"#fff",border:"none",borderRadius:18,padding:"16px 0",fontSize:15,fontWeight:900,cursor:"pointer",marginBottom:10}}>← Back to Home</button>
        <button onClick={onRetry} style={{width:"100%",background:"none",color:C.navy,border:`2px solid ${C.navy}`,borderRadius:18,padding:"14px 0",fontSize:15,fontWeight:800,cursor:"pointer"}}>🔄 New Session</button>
      </div>
    </div>
  );
}


export { SessionScreen };
