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
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:9,width:32,height:32,cursor:"pointer",color:"#fff",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>â†</button>
          <div style={{flex:1}}>
            <div style={{color:"#fff",fontSize:13,fontWeight:800}}>{isMockExam?`ðŸ« Mock: ${mockInfo?.school||"School Paper"}`:meta.label}</div>
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
      {section.type==="Editing"      &&<EditSection  key={secIdx} sets={section.items}  sectionType="Editing"      meta={meta} onDone={handleSectionDone} level={section.level}/>}
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

// ── MCQItem: 문제 1개 담당. key 로 마운트되어 상태 완전 초기화 보장 ──
function MCQItem({q, qIdx, total, sectionType, meta, onResult, onNext}){
  const [attempts,  setAttempts]  = useState(0);
  const [wrongTried,setWrongTried]= useState([]);
  const [selected,  setSelected]  = useState(null);
  const [solved,    setSolved]    = useState(false);
  const [revealed,  setRevealed]  = useState(false);
  const [learnAck,  setLearnAck]  = useState(false);
  const [lookedUp,  setLookedUp]  = useState([]);
  const startRef = useRef(Date.now());

  const canCheck = selected!==null && !solved && !revealed;
  const canNext  = (solved||revealed) && learnAck;
  const badge    = solved ? scoreBadge(attempts+1) : null;

  function handleSelect(i){
    if(solved||revealed||wrongTried.includes(i)) return;
    setSelected(i);
  }

  function handleCheck(){
    if(!canCheck) return;
    const t = Date.now()-startRef.current;
    if(selected===q.answer){
      setSolved(true);
      onResult({id:q.id,topic:q.topic,sentence:q.sentence,options:q.options,
        correctAnswer:q.answer,studentAnswer:selected,sectionType,
        correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,
        timeTaken:t,flagged:guessFlag(t,sectionType),
        explanation:q.explanation||"",hint:q.hints?.[0]||"",lookedUpWords:lookedUp});
    } else {
      const na = attempts+1;
      setAttempts(na);
      setWrongTried(p=>[...p,selected]);
      setSelected(null);
      if(na>=3){
        setRevealed(true);
        onResult({id:q.id,topic:q.topic,sentence:q.sentence,options:q.options,
          correctAnswer:q.answer,studentAnswer:selected,sectionType,
          correct:false,attempts:0,timeTaken:t,flagged:guessFlag(t,sectionType),
          explanation:q.explanation||"",hint:q.hints?.[0]||"",lookedUpWords:lookedUp});
      }
    }
  }

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>Q {qIdx+1} / {total}</span>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{width:8,height:8,borderRadius:"50%",
              background:i<attempts?"#EF4444":"#E2E8F0"}}/>
          ))}
          <span style={{fontSize:10,color:C.muted,marginLeft:4}}>tries</span>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:18,padding:"18px 16px",marginBottom:14,
        boxShadow:"0 2px 12px rgba(0,0,0,0.08)",border:"1.5px solid #E2E8F0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
          <TagPill color={meta.color} bg={meta.color+"18"}>{q.topic}</TagPill>
          {q.emoji&&<span style={{fontSize:18}}>{q.emoji}</span>}
        </div>
        {q.question&&<div style={{fontSize:13,color:"#475569",marginBottom:8,fontWeight:600}}>{q.question}</div>}
        {q.highlights
          ? <SVASentence sentence={q.sentence} highlights={q.highlights}/>
          : <div style={{background:"#F0F9FF",borderRadius:12,padding:"14px 16px",
              fontSize:16,fontWeight:800,color:"#0F172A",lineHeight:1.8}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <SpeakBtn text={q.sentence.replace(/_+/g,"blank")} lang="en" style={{flexShrink:0,marginTop:2}}/>
                <div style={{flex:1}}>
                  <AnnotatedSentence sentence={q.sentence}
                    onLookup={(w)=>{setLookedUp(p=>[...new Set([...p,w])]);TTS.speakEnglish(w);}}/>
                </div>
              </div>
            </div>
        }
      </div>
      {wrongTried.length>0&&!solved&&!revealed&&(
        <HintBox text={q.hints&&q.hints[Math.min(attempts-1,1)]} level={attempts}/>
      )}
      {wrongTried.length>0&&!solved&&!revealed&&q.ruleCard&&(
        <RuleCard card={q.ruleCard}/>
      )}
      {wrongTried.length>0&&!solved&&!revealed&&(
        <WrongBanner attempts={attempts}/>
      )}
      <div style={{marginBottom:14}}>
        {(q.options||[]).map((opt,i)=>{
          const isWrong = wrongTried.includes(i);
          const isAns   = i===q.answer;
          const isSel   = selected===i;
          let bg="#fff", border=C.border, col="#0F172A", op=1;
          if(solved||revealed){
            if(isAns){ bg=C.lGreen; border=C.green; col="#065F46"; }
            else { op=0.45; }
          } else if(isWrong){
            bg="#FEE2E2"; border=C.red; col=C.red; op=0.7;
          } else if(isSel){
            bg=C.lBlue; border=meta.color; col=meta.color;
          }
          const meaning = (solved||revealed)
            ? (WORD_DICT[opt.replace(/[.,!'"]/g,"").toLowerCase()]||null) : null;
          return(
            <div key={i} onClick={()=>handleSelect(i)}
              style={{background:bg,border:`2px solid ${border}`,borderRadius:14,
                padding:"13px 16px",marginBottom:10,opacity:op,
                cursor:(solved||revealed||isWrong)?"default":"pointer",
                display:"flex",alignItems:"center",gap:12,
                transition:"background 0.12s, border 0.12s, opacity 0.12s"}}>
              <div style={{width:30,height:30,borderRadius:"50%",flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:13,fontWeight:800,
                background:isSel&&!isWrong&&!(solved||revealed)?meta.color
                          :(solved||revealed)&&isAns?"#10B981"
                          :isWrong?"#FCA5A5":"#EEF2F7",
                color:isSel&&!isWrong&&!(solved||revealed)?"#fff"
                     :(solved||revealed)&&isAns?"#fff"
                     :isWrong?C.red:C.muted}}>
                {String.fromCharCode(65+i)}
              </div>
              <div style={{flex:1}}>
                <span style={{fontSize:15,fontWeight:700,color:col}}>{opt}</span>
                {meaning&&(
                  <div style={{fontSize:11,color:isAns?"#065F46":"#64748B",
                    marginTop:3,fontStyle:"italic"}}>{meaning}</div>
                )}
              </div>
              {(solved||revealed)&&isAns&&<span style={{flexShrink:0,fontSize:18}}>&#x2705;</span>}
              {isWrong&&!solved&&!revealed&&<span style={{flexShrink:0,fontSize:18}}>&#x274C;</span>}
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
      {canNext
        ? <ActionBtn color={meta.color} onClick={onNext}>
            {qIdx+1>=total?"Finish Section →":"Next Question →"}
          </ActionBtn>
        : !(solved||revealed)&&
          <ActionBtn color={meta.color} onClick={handleCheck} disabled={!canCheck}>
            Check Answer
          </ActionBtn>
      }
    </div>
  );
}

function MCQSection({items,sectionType,meta,onDone}){
  const [qIdx,    setQIdx]   = useState(0);
  const [results, setResults]= useState([]);
  function handleResult(r){ setResults(p=>[...p,r]); }
  function handleNext(){
    if(qIdx+1>=items.length){ onDone([...results]); return; }
    setQIdx(i=>i+1);
  }
  const q   = items[qIdx]||items[0];
  const key = q?.id ? `${sectionType}_${q.id}` : `${sectionType}_q${qIdx}`;
  return(
    <MCQItem key={key} q={q} qIdx={qIdx} total={items.length}
      sectionType={sectionType} meta={meta}
      onResult={handleResult} onNext={handleNext}/>
  );
}
function ClozeSection({sets,sectionType,meta,onDone}){
  const [setIdx,setSetIdx]=useState(0);
  const [cAns,setCAns]=useState({});
  const [cAtt,setCAtt]=useState({});
  const [cCor,setCCor]=useState({});
  const [cRev,setCRev]=useState({});
  const [results,setResults]=useState([]);
  const [submitted,setSubmitted]=useState(false);
  // Word Bank: which word is "selected" (pending placement into next blank)
  const [wbSelected,setWbSelected]=useState(null);
  // Word Bank: which blank num is "active" (waiting for a word tap)
  const [activeBlank,setActiveBlank]=useState(null);
  const startRef=useRef(Date.now());

  const cs=sets[setIdx]||sets[0]||{};
  const blanks=cs.blanks||[];
  // Detect cloze type
  const isBracket = blanks.length>0 && blanks.every(b=>b.choices&&b.choices.length>=2);
  const hasWordBank = (cs.wordBank&&cs.wordBank.length>0) || blanks.some(b=>b.wordBank&&b.wordBank.length>0);
  const wordBank = cs.wordBank || (blanks[0]?.wordBank) || [];

  function allAnswered(){
    return blanks.length>0 && blanks.every(b=>cAns[b.num]!=null);
  }
  function allSettled(){
    if(isBracket) return submitted;
    return blanks.length>0 && blanks.every(b=>cCor[b.num]||cRev[b.num]);
  }

  // â”€â”€ Word Bank handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function handleWbTap(word){
    if(submitted) return;
    if(wbSelected===word){ setWbSelected(null); setActiveBlank(null); return; }
    setWbSelected(word);
    // Auto-fill next unanswered blank
    const nextBlank = blanks.find(b=>cAns[b.num]==null);
    if(nextBlank){
      setCAns(a=>({...a,[nextBlank.num]:word}));
      setWbSelected(null);
      setActiveBlank(null);
    } else {
      setActiveBlank(null);
    }
  }
  function handleBlankTap(num){
    if(submitted) return;
    if(!hasWordBank) return;
    if(cAns[num]!=null){
      // Cancel: return word to bank
      setCAns(a=>({...a,[num]:null}));
      setWbSelected(null);
    } else if(wbSelected!=null){
      setCAns(a=>({...a,[num]:wbSelected}));
      setWbSelected(null);
    } else {
      setActiveBlank(num);
    }
  }

  // â”€â”€ Word Bank submit (check all at once) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function handleWbSubmit(){
    if(!allAnswered()) return;
    const t=Date.now()-startRef.current;
    blanks.forEach(b=>{
      const chosen=cAns[b.num];
      const correct=chosen===b.answer;
      if(correct) setCCor(p=>({...p,[b.num]:true}));
      else setCRev(p=>({...p,[b.num]:true}));
      setResults(r=>[...r,{id:`${cs.id}_${b.num}`,topic:sectionType,sectionType,correct,attempts:1,solvedAfterHint:false,timeTaken:t,flagged:guessFlag(t,sectionType)}]);
    });
    setSubmitted(true);
  }

  // â”€â”€ Bracket handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function handleBracketSelect(num,opt){
    if(submitted) return;
    setCAns(a=>({...a,[num]:opt}));
  }
  function handleBracketSubmit(){
    if(!allAnswered()) return;
    const t=Date.now()-startRef.current;
    blanks.forEach(b=>{
      const chosen=cAns[b.num];
      const correct=chosen===b.answer;
      if(correct) setCCor(p=>({...p,[b.num]:true}));
      else setCRev(p=>({...p,[b.num]:true}));
      setResults(r=>[...r,{id:`${cs.id}_${b.num}`,topic:sectionType,sectionType,correct,attempts:1,solvedAfterHint:false,timeTaken:t,flagged:guessFlag(t,sectionType)}]);
    });
    setSubmitted(true);
  }

  // â”€â”€ Word Bank MCQ (per-blank, old style fallback) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function handleSelect(num,opt){if(cCor[num]||cRev[num])return;setCAns(a=>({...a,[num]:opt}));}
  function handleCheck(blank){
    const chosen=cAns[blank.num]; if(!chosen)return;
    const t=Date.now()-startRef.current;
    if(chosen===blank.answer){setCCor(p=>({...p,[blank.num]:true}));setResults(r=>[...r,{id:`${cs.id}_${blank.num}`,topic:sectionType,sectionType,correct:(cAtt[blank.num]||0)===0,solvedAfterHint:(cAtt[blank.num]||0)>0,attempts:(cAtt[blank.num]||0)+1,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}
    else{const prev=cAtt[blank.num]||0;const next=prev+1;setCAtt(p=>({...p,[blank.num]:next}));setCAns(a=>({...a,[blank.num]:null}));if(next>=3){setCRev(p=>({...p,[blank.num]:true}));setResults(r=>[...r,{id:`${cs.id}_${blank.num}`,topic:sectionType,sectionType,correct:false,attempts:0,timeTaken:t,flagged:guessFlag(t,sectionType)}]);}}
  }

  function next(){
    if(setIdx+1>=sets.length){onDone(results);return;}
    setSetIdx(i=>i+1);
    setCAns({});setCAtt({});setCCor({});setCRev({});
    setSubmitted(false);setWbSelected(null);setActiveBlank(null);
    startRef.current=Date.now();
  }

  // â”€â”€ Render passage with inline bracket choices â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function renderBracketPassage(){
    if(!cs.passage) return null;
    // Build map of blank num -> blank object
    const blankMap={};
    blanks.forEach(b=>{ blankMap[b.num]=b; });
    // Split passage by blank markers like (19), (20)...
    const parts=cs.passage.split(/(\(\d+\))/g);
    return(
      <div style={{fontSize:14,color:C.text,lineHeight:2.2}}>
        {parts.map((part,i)=>{
          const m=part.match(/^\((\d+)\)$/);
          if(m){
            const num=parseInt(m[1],10);
            const b=blankMap[num];
            if(!b||!b.choices) return <span key={i} style={{fontWeight:700}}>{part}</span>;
            const chosen=cAns[num];
            const isCorrect=submitted&&cCor[num];
            const isWrong=submitted&&cRev[num];
            return(
              <span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,margin:"0 2px",verticalAlign:"middle"}}>
                <span style={{fontSize:11,fontWeight:800,color:C.muted,marginRight:2}}>({num})</span>
                {b.choices.map(ch=>{
                  const sel=chosen===ch;
                  let bg="transparent",col=C.text,borderB="none",fw=500;
                  if(sel&&!submitted){bg=C.lBlue;col=meta.color;borderB=`2px solid ${meta.color}`;fw=700;}
                  if(sel&&isCorrect){bg=C.lGreen;col=C.green;borderB=`2px solid ${C.green}`;fw=700;}
                  if(sel&&isWrong){bg="#FEE2E2";col=C.red;borderB=`2px solid ${C.red}`;fw=700;}
                  if(!sel&&submitted&&ch===b.answer){bg=C.lGreen;col=C.green;fw=700;}
                  return(
                    <span key={ch} onClick={()=>handleBracketSelect(num,ch)}
                      style={{background:bg,color:col,border:borderB||`1.5px solid ${sel?"transparent":C.border}`,
                        borderRadius:8,padding:"2px 10px",fontSize:13,fontWeight:fw,
                        cursor:submitted?"default":"pointer",transition:"all 0.15s",display:"inline-block"}}>
                      {ch}
                    </span>
                  );
                })}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  }

  // â”€â”€ Render passage with blank boxes (Word Bank type) â”€â”€â”€â”€â”€â”€â”€â”€
  function renderWordBankPassage(){
    if(!cs.passage) return null;
    const blankMap={};
    blanks.forEach(b=>{ blankMap[b.num]=b; });
    const parts=cs.passage.split(/(\(\d+\))/g);
    return(
      <div style={{fontSize:14,color:C.text,lineHeight:2.4}}>
        {parts.map((part,i)=>{
          const m=part.match(/^\((\d+)\)$/);
          if(m){
            const num=parseInt(m[1],10);
            const b=blankMap[num];
            const filled=cAns[num];
            const isCorrect=submitted&&cCor[num];
            const isWrong=submitted&&cRev[num];
            const isActive=activeBlank===num;
            let bg="#F1F5F9",col=C.muted,border=`2px dashed ${C.border}`;
            if(filled&&!submitted){bg=C.lBlue;col=meta.color;border=`2px solid ${meta.color}`;}
            if(isCorrect){bg=C.lGreen;col=C.green;border=`2px solid ${C.green}`;}
            if(isWrong){bg="#FEE2E2";col=C.red;border=`2px solid ${C.red}`;}
            if(isActive&&!filled){border=`2px solid ${meta.color}`;bg=meta.color+"10";}
            return(
              <span key={i} style={{display:"inline-flex",alignItems:"center",gap:3,verticalAlign:"middle",margin:"0 2px"}}>
                <span style={{fontSize:11,fontWeight:800,color:C.muted}}>({num})</span>
                <span onClick={()=>handleBlankTap(num)}
                  style={{minWidth:80,background:bg,color:col,border,borderRadius:8,
                    padding:"2px 10px",fontSize:13,fontWeight:700,cursor:submitted?"default":"pointer",
                    textAlign:"center",display:"inline-block",transition:"all 0.15s"}}>
                  {filled||(isWrong?b?.answer:"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0")}
                </span>
                {isWrong&&filled!==b?.answer&&<span style={{fontSize:11,color:C.red,textDecoration:"line-through"}}>{filled}</span>}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  }

  // â”€â”€ BRACKET TYPE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if(isBracket){
    return(
      <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span>
          <TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill>
        </div>
        <div style={{background:"#F0F9FF",border:"1.5px solid #BAE6FD",borderRadius:16,padding:"16px 18px",marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>
            ðŸ“– Underline the correct word in each bracket
          </div>
          {renderBracketPassage()}
        </div>
        {submitted&&(
          <div style={{background:C.lGreen,border:`1px solid ${C.green}`,borderRadius:12,padding:"10px 14px",marginBottom:12,fontSize:13,fontWeight:700,color:"#065F46"}}>
            âœ… {blanks.filter(b=>cCor[b.num]).length}/{blanks.length} correct
          </div>
        )}
        {!submitted&&(
          <button onClick={handleBracketSubmit} disabled={!allAnswered()}
            style={{width:"100%",background:allAnswered()?meta.color:"#C8D3E0",color:"#fff",border:"none",
              borderRadius:14,padding:"13px",fontSize:15,fontWeight:800,
              cursor:allAnswered()?"pointer":"not-allowed",marginBottom:12}}>
            Submit
            {!allAnswered()&&<div style={{fontSize:11,fontWeight:500,marginTop:2,opacity:0.8}}>
              Select an answer for each bracket first
            </div>}
          </button>
        )}
        {allSettled()&&<ActionBtn color={meta.color} onClick={next}>{setIdx+1>=sets.length?"Finish Section â†’":"Next Set â†’"}</ActionBtn>}
      </div>
    );
  }

  // â”€â”€ WORD BANK TYPE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if(hasWordBank){
    const usedWords=Object.values(cAns).filter(Boolean);
    return(
      <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span>
          <TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill>
        </div>

        {/* Word Bank Box */}
        <div style={{background:C.lBlue,border:`1.5px solid ${meta.color}44`,borderRadius:14,padding:"12px 14px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:800,color:meta.color,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
            Word Bank â€” tap a word, then tap its blank
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {wordBank.map((w,i)=>{
              const letter=String.fromCharCode(65+i);
              const used=usedWords.includes(w);
              const sel=wbSelected===w;
              let bg="#fff",border=`1.5px solid ${meta.color}33`,col=meta.color,op=1,cursor="pointer";
              if(used&&!submitted){bg="#E2E8F0";col=C.muted;border=`1.5px solid ${C.border}`;op=0.5;cursor="default";}
              if(sel){bg=meta.color;col="#fff";border=`1.5px solid ${meta.color}`;}
              if(submitted){cursor="default";}
              return(
                <div key={w} onClick={()=>{if(!used&&!submitted)handleWbTap(w);}}
                  style={{background:bg,border,borderRadius:10,padding:"6px 14px",
                    fontSize:13,fontWeight:700,cursor,color:col,opacity:op,
                    transition:"all 0.15s",display:"flex",alignItems:"center",gap:5,
                    boxShadow:sel?"0 2px 8px "+meta.color+"44":"none"}}>
                  <span style={{fontSize:11,fontWeight:800,opacity:0.6}}>({letter})</span>
                  {w}
                </div>
              );
            })}
          </div>
        </div>

        {/* Passage with inline blank boxes */}
        <div style={{background:"#F0F9FF",border:"1.5px solid #BAE6FD",borderRadius:16,padding:"16px 18px",marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>
            ðŸ“– Tap a word above, then tap its blank â€” tap a filled blank to undo
          </div>
          {renderWordBankPassage()}
        </div>

        {submitted&&(
          <div style={{background:C.lGreen,border:`1px solid ${C.green}`,borderRadius:12,padding:"10px 14px",marginBottom:12,fontSize:13,fontWeight:700,color:"#065F46"}}>
            âœ… {blanks.filter(b=>cCor[b.num]).length}/{blanks.length} correct
          </div>
        )}
        {!submitted&&(
          <button onClick={handleWbSubmit} disabled={!allAnswered()}
            style={{width:"100%",background:allAnswered()?meta.color:"#C8D3E0",color:"#fff",border:"none",
              borderRadius:14,padding:"13px",fontSize:15,fontWeight:800,
              cursor:allAnswered()?"pointer":"not-allowed",marginBottom:12}}>
            Submit
            {!allAnswered()&&<div style={{fontSize:11,fontWeight:500,marginTop:2,opacity:0.8}}>
              Fill in all blanks first
            </div>}
          </button>
        )}
        {allSettled()&&<ActionBtn color={meta.color} onClick={next}>{setIdx+1>=sets.length?"Finish Section â†’":"Next Set â†’"}</ActionBtn>}
      </div>
    );
  }

  // â”€â”€ FALLBACK: per-blank MCQ (original behaviour) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span><TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill></div>
      <div style={{background:"#F0F9FF",border:"1.5px solid #BAE6FD",borderRadius:16,padding:"14px 16px",marginBottom:16}}><div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>ðŸ“– Read & Fill in the Blanks</div><div style={{fontSize:14,color:C.text,lineHeight:2}}>{cs.passage}</div></div>
      {blanks.map(b=>{
        const wa=cAtt[b.num]||0;const correct=cCor[b.num];const rev=cRev[b.num];
        return(<div key={b.num} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:26,height:26,borderRadius:8,background:correct?C.lGreen:rev?"#FEE2E2":meta.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:correct?C.green:rev?C.red:meta.color}}>{b.num}</div><span style={{fontSize:13,fontWeight:700,color:correct?C.green:rev?C.red:C.text}}>{correct?"âœ… Correct!":rev?"ðŸ“– Answer shown":wa>0?`âŒ Try again (${3-wa} left)`:"Choose the correct word"}</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>{(b.wordBank||cs.wordBank||[]).map(opt=>{let bg="#F1F5F9",border=C.border,col=C.text,cursor="pointer";if(correct||rev)cursor="default";if((correct||rev)&&opt===b.answer){bg=C.lGreen;border=C.green;col="#065F46";}else if(cAns[b.num]===opt&&!correct&&!rev){bg=C.lBlue;border=meta.color;col=meta.color;}return(<div key={opt} onClick={()=>handleSelect(b.num,opt)} style={{background:bg,border:`2px solid ${border}`,borderRadius:10,padding:"7px 16px",fontSize:14,fontWeight:600,cursor,color:col,transition:"all 0.15s"}}>{opt}</div>);})}</div>
          {wa>0&&!correct&&!rev&&b.hints&&<HintBox text={b.hints&&b.hints[Math.min(wa-1,1)]} level={wa}/>}
          {rev&&<div style={{background:"#FEE2E2",border:`1px solid ${C.red}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:C.red,fontWeight:600}}>âœï¸ Answer: <strong>{b.answer}</strong></div>}
          {!correct&&!rev&&<button onClick={()=>handleCheck(b)} disabled={!cAns[b.num]} style={{marginTop:6,background:cAns[b.num]?meta.color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"7px 20px",fontSize:13,fontWeight:700,cursor:cAns[b.num]?"pointer":"not-allowed"}}>Check ({3-wa} tries left)</button>}
        </div>);
      })}
      {allSettled()&&<ActionBtn color={meta.color} onClick={next}>{setIdx+1>=sets.length?"Finish Section â†’":`Next Set â†’`}</ActionBtn>}
    </div>
  );
}

function EditSection({sets, sectionType, meta, onDone, level}){
  const [setIdx,setSetIdx]   = useState(0);
  const [typedAnswers,setTypedAnswers] = useState({});   // item.id -> string
  const [attempts,setAttempts]   = useState({});         // item.id -> number
  const [correct,setCorrect]     = useState({});
  const [revealed,setRevealed]   = useState({});
  const [showHint,setShowHint]   = useState({});         // item.id -> bool
  const [results,setResults]     = useState([]);
  const startRef = useRef(Date.now());

  const cs    = sets[setIdx] || sets[0] || {};
  const items = cs.items || [];

  // Levenshtein distance for typo detection
  function levenshtein(a, b){
    const m=a.length, n=b.length;
    const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i?j?0:i:j));
    for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
      dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
    return dp[m][n];
  }

  function normalize(s){ return (s||"").trim().toLowerCase(); }

  // Max attempts by level: easy=1, medium=2, hard=3
  function maxAttempts(){
    if(level==="easy")   return 1;
    if(level==="hard")   return 3;
    return 2; // medium (default)
  }

  // Hint after attempt N by level:
  // easy: show hint immediately (before first attempt)
  // medium: show after 1st fail
  // hard: show after 2nd fail
  function hintThreshold(){
    if(level==="easy")   return 0;
    if(level==="hard")   return 2;
    return 1;
  }

  // Generate progressive hint: reveal more letters each time
  function generateHint(answer, attemptNum){
    const letters = String(answer ?? '').split("");
    const revealCount = level==="easy" ? Math.ceil(letters.length/2)
                      : level==="hard" ? 1
                      : 2;
    // Always reveal first letter + some more based on attemptNum
    const toReveal = Math.min(revealCount + attemptNum, letters.length);
    return letters.map((c,i) => i < toReveal ? c : (c===" " ? " " : "_")).join(" ");
  }

  function allSettled(){
    return items.every(item => correct[item.id] || revealed[item.id]);
  }

  function handleCheck(item){
    const typed  = normalize(typedAnswers[item.id] || "");
    const answer = normalize(item.answer);
    if(!typed) return;
    const t = Date.now() - startRef.current;
    const wa = attempts[item.id] || 0;

    if(typed === answer){
      // Correct!
      setCorrect(p=>({...p,[item.id]:true}));
      setResults(r=>[...r,{
        id:item.id, topic:"Editing", sectionType,
        correct: wa===0,
        solvedAfterHint: wa>0,
        attempts: wa+1,
        timeTaken: t,
        flagged: guessFlag(t, sectionType)
      }]);
    } else {
      const dist = levenshtein(typed, answer);
      const next = wa + 1;
      setAttempts(p=>({...p,[item.id]:next}));
      setTypedAnswers(a=>({...a,[item.id]:""}));

      // Show hint after threshold
      if(next >= hintThreshold()){
        setShowHint(p=>({...p,[item.id]:true}));
      }

      // Reveal after max attempts
      if(next >= maxAttempts()){
        setRevealed(p=>({...p,[item.id]:true}));
        setResults(r=>[...r,{
          id:item.id, topic:"Editing", sectionType,
          correct:false, attempts:next, timeTaken:t,
          flagged: guessFlag(t, sectionType)
        }]);
      }
    }
  }

  function handleNext(){
    if(setIdx+1>=sets.length){ onDone(results); return; }
    setSetIdx(i=>i+1);
    setTypedAnswers({}); setAttempts({});
    setCorrect({}); setRevealed({}); setShowHint({});
    startRef.current=Date.now();
  }

  // Level badge
  const lvlBadge = level==="easy" ? {label:"Easy ðŸŸ¢", bg:"#D1FAE5", col:"#065F46"}
                 : level==="hard" ? {label:"Hard ðŸ”´", bg:"#FEE2E2", col:"#991B1B"}
                 : {label:"Medium ðŸŸ¡", bg:"#FEF3C7", col:"#92400E"};

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{background:lvlBadge.bg,color:lvlBadge.col,borderRadius:8,padding:"2px 10px",fontSize:11,fontWeight:700}}>{lvlBadge.label}</span>
          <TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill>
        </div>
      </div>
      <div style={{background:"#FFF7ED",border:"1px solid #FDE68A",borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#78350F"}}>{cs.instructions}</div>

      {items.map(item=>{
        const wa    = attempts[item.id] || 0;
        const isC   = correct[item.id];
        const isR   = revealed[item.id];
        const typed = typedAnswers[item.id] || "";
        const hint  = showHint[item.id] ? generateHint(item.answer, wa) : null;
        const triesLeft = maxAttempts() - wa;

        return(
          <div key={item.id} style={{background:C.card,borderRadius:16,padding:"14px 16px",marginBottom:14,
            boxShadow: isC?"0 0 0 2px #10B981":"0 2px 8px rgba(0,0,0,0.06)",
            border: isC?`1.5px solid ${C.green}`:isR?`1.5px solid ${C.red}`:"1.5px solid transparent"}}>

            {/* Sentence with wrong word highlighted */}
            <div style={{fontSize:14,lineHeight:1.9,marginBottom:12,color:C.text}}>
              {item.sentence.split(item.wrongWord).map((part,i,arr)=>(
                <span key={i}>{part}{i<arr.length-1&&(
                  <span style={{background:"#FEF3C7",border:"1px dashed #F59E0B",borderRadius:4,
                    padding:"1px 6px",fontWeight:700,
                    color: isC||isR ? "#065F46":"#92400E",
                    textDecoration: isC||isR ? "line-through":"none"}}>
                    {item.wrongWord}
                  </span>
                )}</span>
              ))}
              {(isC||isR)&&<span style={{background:C.lGreen,border:`1px solid ${C.green}`,
                borderRadius:4,padding:"1px 8px",fontWeight:800,color:C.green,marginLeft:6,fontSize:14}}>
                â†’ {item.answer}
              </span>}
            </div>

            {/* Easy mode: show hint before first attempt */}
            {level==="easy" && !isC && !isR && (
              <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,
                padding:"6px 12px",marginBottom:10,fontSize:12,color:"#1D4ED8",fontWeight:600}}>
                ðŸ’¡ Hint: {generateHint(item.answer, 0)}
              </div>
            )}

            {/* Progressive hint after failure */}
            {hint && level!=="easy" && !isC && !isR && (
              <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,
                padding:"6px 12px",marginBottom:10,fontSize:12,color:"#1D4ED8",fontWeight:600,
                letterSpacing:2}}>
                ðŸ’¡ Hint: {hint}
              </div>
            )}

            {/* Typing input */}
            {!isC && !isR && (
              <div style={{marginBottom:8}}>
                <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:6}}>
                  Type the correct spelling:
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <input
                    type="text"
                    value={typed}
                    onChange={e=>setTypedAnswers(a=>({...a,[item.id]:e.target.value}))}
                    onKeyDown={e=>{ if(e.key==="Enter") handleCheck(item); }}
                    placeholder="Type your answer..."
                    style={{flex:1,padding:"8px 12px",borderRadius:10,fontSize:14,fontWeight:600,
                      border:`2px solid ${typed ? meta.color : C.border}`,outline:"none",
                      background:"#FAFAFA",color:C.text}}
                  />
                  <button onClick={()=>handleCheck(item)} disabled={!typed}
                    style={{background:typed?meta.color:"#C8D3E0",color:"#fff",border:"none",
                      borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:700,
                      cursor:typed?"pointer":"not-allowed",whiteSpace:"nowrap"}}>
                    Check
                  </button>
                </div>
                <div style={{fontSize:11,color:wa>0?C.red:C.muted,marginTop:4,fontWeight:600}}>
                  {wa===0 ? `${maxAttempts()} attempt${maxAttempts()>1?"s":""} allowed`
                          : `${triesLeft} attempt${triesLeft!==1?"s":""} left`}
                </div>
              </div>
            )}

            {/* Correct feedback */}
            {isC && (
              <div style={{background:C.lGreen,border:`1px solid ${C.green}`,borderRadius:10,
                padding:"10px 14px",fontSize:13}}>
                <div style={{fontWeight:800,color:C.green,marginBottom:4}}>
                  {wa===0?"â­ Perfect spelling!":"âœ… Correct!"}
                </div>
                {item.hints&&item.hints[0]&&(
                  <div style={{fontSize:12,color:"#065F46"}}>ðŸ’¡ {item.hints[0]}</div>
                )}
              </div>
            )}

            {/* Revealed (failed) feedback */}
            {isR && (
              <div style={{background:"#FEE2E2",border:`1px solid ${C.red}`,borderRadius:10,
                padding:"10px 14px",fontSize:13}}>
                <div style={{fontWeight:800,color:C.red,marginBottom:4}}>
                  âœï¸ Correct spelling: <strong>{item.answer}</strong>
                </div>
                {item.hints&&item.hints[0]&&(
                  <div style={{fontSize:12,color:"#7F1D1D",marginTop:4}}>ðŸ’¡ {item.hints[0]}</div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {allSettled()&&(
        <ActionBtn color={meta.color} onClick={handleNext}>
          {setIdx+1>=sets.length?"Finish Section â†’":"Next Set â†’"}
        </ActionBtn>
      )}
    </div>
  );
}


function CompSection({ sets, sectionType, meta, onDone }) {
  const [setIdx, setSetIdx] = useState(0);
  const [allResults, setAllResults] = useState([]);

  const set = sets[setIdx] || sets[0] || {};
  const sectionLabel = (meta && meta.label) || "Comprehension";
  const marks = set.marks || (set.questions ? set.questions.length : 1);

  function handlePageDone(results, advance) {
    if (advance === true) {
      // move to next set or finish section
      if (setIdx + 1 >= sets.length) {
        onDone(allResults);
      } else {
        setSetIdx(i => i + 1);
      }
      return;
    }
    if (results) {
      setAllResults(prev => [...prev, ...results]);
    }
  }

  return (
    <CompPageInner
      key={setIdx}
      set={set}
      sectionLabel={sectionLabel}
      marks={marks}
      meta={meta}
      onPageDone={handlePageDone}
    />
  );
}

function CompPageInner({ set, sectionLabel, marks, meta, onPageDone }) {
  const questions = set.questions || [];
  const passage   = set.passage   || '';

  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQ,   setActiveQ]   = useState(null);
  const startRef = useRef(Date.now());

  // Exam typography tokens -- no emojis, no bright colors
  const EX = {
    border: '1.5px solid #1a1a1a',
    thin:   '1px solid #1a1a1a',
    font:   "'Times New Roman', Georgia, serif",
    sans:   'Arial, sans-serif',
    ink:    '#1a1a1a',
    correct:'#dfeede',
    wrong:  '#f5dede',
    sel:    '#e9e9e9',
    muted:  '#555',
    faint:  '#888',
  };

  // -------------------------------------------------
  // Format detection -- new 8-type schema takes priority
  // -------------------------------------------------
  function getFormat(q) {
    const f = q.format || '';
    const NEW_FORMATS = ['fill_blank','fill_word','mcq','ab_circle','true_false','sequence','tf_reason','open_sentence'];
    if (NEW_FORMATS.includes(f)) return f;
    // Legacy aliases from old schema
    if (f === 'truefalse')         return 'true_false';
    if (f === 'truefalse_reason')  return 'tf_reason';
    if (f === 'fill' || f === 'fill_short') return 'fill_blank';
    if (f === 'open' || f === 'open_multi') return 'open_sentence';
    // Infer from structure fields
    if (q.statements && q.statements.length) return 'true_false';
    if (q.abSentence || q.abChoices)         return 'ab_circle';
    if (q.sequenceItems && q.sequenceItems.length) return 'sequence';
    if (q.options && q.options.length >= 2)  return 'mcq';
    return 'open_sentence';
  }

  function norm(s) {
    return String(s || '').trim().toLowerCase().replace(/[.,!?'"]/g, '');
  }

  function isAutoGraded(q) {
    return ['mcq','ab_circle','true_false','sequence','fill_blank','fill_word'].includes(getFormat(q));
  }

  function isAnswered(q) {
    const f   = getFormat(q);
    const val = answers[q.id];
    if (f === 'true_false') {
      const stmts = q.statements || [];
      return stmts.length > 0 && stmts.every((_, si) => (val || [])[si] !== undefined);
    }
    if (f === 'sequence') {
      const items = q.sequenceItems || q.items || [];
      return items.length > 0 && items.every((_, i) => answers[q.id + '_seq_' + i] !== undefined);
    }
    if (f === 'tf_reason') {
      return val !== undefined && (answers[q.id + '_reason'] || '').trim().length > 0;
    }
    return val !== undefined && String(val).trim().length > 0;
  }

  const allAnswered = questions.length > 0 && questions.every(isAnswered);

  // -------------------------------------------------
  // Grading
  // -------------------------------------------------
  function correctIdxForMcq(q) {
    const opts = (q.options || []).map(o => typeof o === 'string' ? o : String(o.text || o));
    const a = q.answer;
    if (typeof a === 'number') return a;
    if (typeof a === 'string') {
      const li = a.toUpperCase().charCodeAt(0) - 65;
      if (li >= 0 && li < opts.length) return li;
      const n = parseInt(a, 10);
      if (!isNaN(n)) return n >= 1 ? n - 1 : n;
    }
    return 0;
  }

  function gradeQuestion(q) {
    const f   = getFormat(q);
    const val = answers[q.id];
    if (f === 'mcq')       return val === correctIdxForMcq(q);
    if (f === 'ab_circle') return norm(val) === norm(q.answer);
    if (f === 'true_false') {
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return correct.every((a, i) => norm((val || [])[i]) === norm(a));
    }
    if (f === 'sequence') {
      const items   = q.sequenceItems || q.items || [];
      const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || '').split(',').map(Number);
      return items.every((_, i) => parseInt(answers[q.id + '_seq_' + i] || '0', 10) === correct[i]);
    }
    if (f === 'fill_blank' || f === 'fill_word') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      return accept.some(a => norm(val) === norm(a));
    }
    if (f === 'tf_reason') return norm(val) === norm(q.answer);
    return false; // open_sentence -- not auto-graded
  }

  // -------------------------------------------------
  // Submit / Finish
  // -------------------------------------------------
  function handleSubmit() {
    if (submitted || !allAnswered) return;
    setSubmitted(true);
    setActiveQ(questions[0]?.id || null);
  }

  function handleFinish() {
    const t = Date.now() - startRef.current;
    const results = questions.map(q => ({
      id:          q.id,
      topic:       'Comprehension',
      sectionType: 'Comprehension',
      correct:     gradeQuestion(q),
      timeTaken:   Math.round(t / Math.max(questions.length, 1)),
    }));
    onPageDone(results);
    onPageDone(null, true);
  }

  // -------------------------------------------------
  // Passage with post-submit highlights
  // -------------------------------------------------
  function renderPassageText(aq) {
    if (!passage) return null;
    const evidence = aq?.solution?.evidence || null;
    const trap     = aq?.solution?.trap     || null;
    if (!evidence && !trap) {
      return <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}>{passage}</span>;
    }
    let segs = [{ text: passage, type: 'plain' }];
    function applyHl(segArr, target, type) {
      if (!target) return segArr;
      const out = [];
      segArr.forEach(seg => {
        if (seg.type !== 'plain') { out.push(seg); return; }
        const idx = seg.text.indexOf(target);
        if (idx === -1) { out.push(seg); return; }
        if (idx > 0) out.push({ text: seg.text.slice(0, idx), type: 'plain' });
        out.push({ text: target, type });
        const after = seg.text.slice(idx + target.length);
        if (after) out.push({ text: after, type: 'plain' });
      });
      return out;
    }
    segs = applyHl(segs, evidence, 'evidence');
    segs = applyHl(segs, trap,     'trap');
    return (
      <span style={{ whiteSpace: 'pre-line', lineHeight: 2.05 }}>
        {segs.map((seg, i) => {
          if (seg.type === 'plain')
            return <span key={i}>{seg.text}</span>;
          if (seg.type === 'evidence')
            return <span key={i} style={{ borderBottom: '2px solid #1a1a1a', fontWeight: 700 }}>{seg.text}</span>;
          return <span key={i} style={{ borderBottom: '1px dashed #999', fontStyle: 'italic' }}>{seg.text}</span>;
        })}
      </span>
    );
  }

  // -------------------------------------------------
  // Per-format input renderers (exam style)
  // -------------------------------------------------
  function renderInput(q) {
    const f   = getFormat(q);
    const val = answers[q.id];

    // -- FILL_BLANK --------------------------------
    if (f === 'fill_blank') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      const ok  = submitted && accept.some(a => norm(val) === norm(a));
      const bad = submitted && !ok;
      return (
        <div style={{ marginTop: 10 }}>
          {!submitted ? (
            <input type="text" value={val || ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              style={{ border: 'none', borderBottom: EX.border, minWidth: 200,
                padding: '2px 6px', fontSize: 14, fontFamily: EX.font,
                outline: 'none', background: 'transparent' }} />
          ) : (
            <div>
              <span style={{ fontFamily: EX.font, fontSize: 14 }}>
                <u>{val || '(blank)'}</u>
              </span>
              <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700,
                color: ok ? '#1a6b2e' : '#9b1c1c', marginTop: 6 }}>
                {ok ? 'CORRECT' : 'INCORRECT'}
              </div>
              {bad && q.answer && (
                <div style={{ marginTop: 4, border: EX.thin, padding: '6px 12px',
                  fontFamily: EX.font, fontSize: 14 }}>
                  {q.answer}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- FILL_WORD ---------------------------------
    if (f === 'fill_word') {
      const accept = [q.answer, ...(q.acceptableAnswers || [])].filter(Boolean);
      const ok  = submitted && accept.some(a => norm(val) === norm(a));
      const bad = submitted && !ok;
      return (
        <div style={{ marginTop: 10 }}>
          {!submitted ? (
            <input type="text" value={val || ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              style={{ border: EX.border, width: '100%', maxWidth: 280,
                padding: '8px 12px', fontSize: 14, fontFamily: EX.font, outline: 'none' }} />
          ) : (
            <div>
              <div style={{ display: 'inline-block', border: EX.thin, padding: '5px 12px',
                fontFamily: EX.font, fontSize: 14, maxWidth: 280 }}>
                {val || '(blank)'}
              </div>
              <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700,
                color: ok ? '#1a6b2e' : '#9b1c1c', marginTop: 6 }}>
                {ok ? 'CORRECT' : 'INCORRECT'}
              </div>
              {bad && q.answer && (
                <div style={{ marginTop: 4, border: EX.thin, padding: '6px 12px',
                  fontFamily: EX.font, fontSize: 14 }}>
                  {q.answer}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- MCQ ---------------------------------------
    if (f === 'mcq') {
      const opts   = (q.options || []).map(o => typeof o === 'string' ? o : String(o.text || o));
      const corr   = correctIdxForMcq(q);
      const chosen = val;
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', minWidth: 260, width: 'auto' }}>
            <tbody>
              {opts.map((opt, i) => {
                let bg = 'transparent';
                if (submitted) { if (i === corr) bg = EX.correct; else if (chosen === i) bg = EX.wrong; }
                else if (chosen === i) bg = EX.sel;
                return (
                  <tr key={i} style={{ background: bg }}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: i }))}>
                    <td style={{ border: EX.thin, padding: '7px 12px', width: 46, textAlign: 'center',
                      fontFamily: EX.sans, fontWeight: 700, fontSize: 13,
                      cursor: submitted ? 'default' : 'pointer' }}>
                      ({i + 1})
                    </td>
                    <td style={{ border: EX.thin, padding: '7px 14px', fontFamily: EX.font, fontSize: 14,
                      cursor: submitted ? 'default' : 'pointer' }}>
                      {opt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ fontFamily: EX.sans, fontSize: 14, marginTop: 6 }}>
            Answer:{' '}
            <span style={{ display: 'inline-block', minWidth: 42, border: EX.thin,
              padding: '2px 10px', textAlign: 'center', fontWeight: 700 }}>
              {chosen !== undefined ? '(' + (chosen + 1) + ')' : '(  )'}
            </span>
          </div>
        </div>
      );
    }

    // -- AB_CIRCLE ---------------------------------
    if (f === 'ab_circle') {
      const sentence = q.abSentence || q.stem || '';
      const choices  = q.abChoices  || {};
      const chosen   = val;
      const matchArr = [...sentence.matchAll(/\(([AB])\)\s*(\S+)/g)];

      if (!matchArr.length) {
        // Fallback: show plain A / B buttons from abChoices
        return (
          <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px', fontFamily: EX.font, fontSize: 14 }}>
            {['A', 'B'].map(lab => {
              let bg = 'transparent';
              if (submitted) { if (lab === q.answer) bg = EX.correct; else if (chosen === lab) bg = EX.wrong; }
              else if (chosen === lab) bg = EX.sel;
              return (
                <span key={lab}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: lab }))}
                  style={{ fontWeight: 700, borderBottom: '2px solid #1a1a1a', padding: '0 2px',
                    background: bg, cursor: submitted ? 'default' : 'pointer',
                    userSelect: 'none', marginRight: 16 }}>
                  ({lab}) {choices[lab] || lab}
                </span>
              );
            })}
          </div>
        );
      }

      // Build sentence segments: plain text + interactive (A)/(B) word spans
      const parts = [];
      let pos = 0;
      for (const m of matchArr) {
        if (m.index > pos) parts.push({ type: 'text', text: sentence.slice(pos, m.index) });
        parts.push({ type: 'word', lab: m[1], word: m[2] });
        pos = m.index + m[0].length;
      }
      if (pos < sentence.length) parts.push({ type: 'text', text: sentence.slice(pos) });

      return (
        <div style={{ marginTop: 10, border: EX.border, padding: '12px 16px',
          fontSize: 14, lineHeight: 1.9, fontFamily: EX.font }}>
          {parts.map((part, pi) => {
            if (part.type === 'text') return <span key={pi}>{part.text}</span>;
            const lab = part.lab;
            let bg = 'transparent';
            if (submitted) { if (lab === q.answer) bg = EX.correct; else if (chosen === lab) bg = EX.wrong; }
            else if (chosen === lab) bg = EX.sel;
            return (
              <span key={pi}
                onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: lab }))}
                style={{ fontWeight: 700, borderBottom: '2px solid #1a1a1a', padding: '0 2px',
                  background: bg, cursor: submitted ? 'default' : 'pointer', userSelect: 'none' }}>
                {part.word}
                <span style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                  verticalAlign: 'super', color: EX.muted }}>({lab})</span>
              </span>
            );
          })}
        </div>
      );
    }

    // -- TRUE_FALSE --------------------------------
    if (f === 'true_false') {
      const stmts   = q.statements || [];
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', width: '100%', fontFamily: EX.font }}>
            <thead>
              <tr>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 54 }}></th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', textAlign: 'left' }}>Statement</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>True</th>
                <th style={{ border: EX.thin, background: '#f0f0f0', fontFamily: EX.sans,
                  fontSize: 13, fontWeight: 700, padding: '7px 6px', width: 64, textAlign: 'center' }}>False</th>
              </tr>
            </thead>
            <tbody>
              {stmts.map((stmt, si) => {
                const lab    = String.fromCharCode(97 + si);
                const chosen = (val || [])[si];
                const corr   = correct[si];
                function tfCell(t) {
                  let bg = 'transparent';
                  if (submitted) { if (t === corr) bg = EX.correct; else if (chosen === t) bg = EX.wrong; }
                  else if (chosen === t) bg = EX.sel;
                  return (
                    <td key={t}
                      onClick={() => {
                        if (submitted) return;
                        const next = [...(answers[q.id] || [])];
                        next[si] = t;
                        setAnswers(a => ({ ...a, [q.id]: next }));
                      }}
                      style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                        cursor: submitted ? 'default' : 'pointer', background: bg, fontSize: 16 }}>
                      {chosen === t ? '\u2713' : (submitted && t === corr ? '\u2713' : '')}
                    </td>
                  );
                }
                return (
                  <tr key={si}>
                    <td style={{ border: EX.thin, padding: '9px 6px', textAlign: 'center',
                      fontWeight: 700, fontFamily: EX.sans, fontSize: 13 }}>({lab})</td>
                    <td style={{ border: EX.thin, padding: '9px 11px', fontSize: 13.5, verticalAlign: 'top' }}>
                      {stmt}
                    </td>
                    {tfCell('True')}
                    {tfCell('False')}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // -- SEQUENCE ----------------------------------
    if (f === 'sequence') {
      const items   = q.sequenceItems || q.items || [];
      const correct = Array.isArray(q.answer) ? q.answer : String(q.answer || '').split(',').map(Number);
      const maxN    = items.length;
      return (
        <div style={{ marginTop: 10 }}>
          <table style={{ border: EX.border, borderCollapse: 'collapse', width: '100%', fontFamily: EX.font }}>
            <tbody>
              {items.map((item, ii) => {
                const key    = q.id + '_seq_' + ii;
                const chosen = answers[key];
                const corr   = correct[ii];
                const ok     = submitted && chosen === corr;
                return (
                  <tr key={ii}>
                    <td style={{ border: EX.thin, padding: '10px 12px', width: 90, textAlign: 'center',
                      background: submitted ? (ok ? EX.correct : EX.wrong) : 'transparent' }}>
                      <span style={{ display: 'inline-flex', gap: 3 }}>
                        {Array.from({ length: maxN }, (_, n) => n + 1).map(n => (
                          <button key={n}
                            onClick={() => !submitted && setAnswers(a => ({ ...a, [key]: n }))}
                            style={{ width: 24, height: 24, border: EX.thin,
                              background: chosen === n ? '#1a1a1a' : '#fff',
                              color:      chosen === n ? '#fff'    : '#1a1a1a',
                              fontFamily: EX.sans, fontSize: 12,
                              cursor: submitted ? 'default' : 'pointer' }}>
                            {n}
                          </button>
                        ))}
                      </span>
                    </td>
                    <td style={{ border: EX.thin, padding: '10px 12px', fontSize: 13.5 }}>
                      {item}
                      {submitted && !ok && (
                        <span style={{ fontFamily: EX.sans, fontSize: 12, color: '#9b1c1c', marginLeft: 8 }}>
                          (should be {corr})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // -- TF_REASON ---------------------------------
    if (f === 'tf_reason') {
      const tfVal   = val;
      const reason  = answers[q.id + '_reason'] || '';
      const correct = typeof q.answer === 'object' ? q.answer?.verdict : q.answer;
      const modelAns = (q.acceptableAnswers && q.acceptableAnswers[0]) || q.solution?.evidence || '';
      return (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['True', 'False'].map(opt => {
              let bg = '#fff';
              if (submitted) {
                if (norm(opt) === norm(correct)) bg = EX.correct;
                else if (norm(tfVal) === norm(opt)) bg = EX.wrong;
              } else if (tfVal === opt) bg = EX.sel;
              return (
                <button key={opt}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: opt }))}
                  style={{ flex: 1, padding: '8px 0', border: EX.border, background: bg,
                    color: EX.ink, fontFamily: EX.sans, fontWeight: 700, fontSize: 14,
                    cursor: submitted ? 'default' : 'pointer' }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {!submitted ? (
            <textarea value={reason} rows={3}
              onChange={e => setAnswers(a => ({ ...a, [q.id + '_reason']: e.target.value }))}
              placeholder="Give a reason for your answer..."
              style={{ width: '100%', padding: '8px 12px', border: EX.border,
                fontFamily: EX.font, fontSize: 14, outline: 'none',
                resize: 'vertical', boxSizing: 'border-box' }} />
          ) : (
            <div>
              <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                Your reason
              </div>
              <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14, minHeight: 40 }}>
                {reason || '(no reason given)'}
              </div>
              {modelAns && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                    Model answer
                  </div>
                  <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14 }}>
                    {modelAns}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // -- OPEN_SENTENCE (default) -------------------
    const openVal  = val || '';
    const modelAns = typeof q.answer === 'string' ? q.answer : '';
    return (
      <div style={{ marginTop: 10 }}>
        {!submitted ? (
          <textarea value={openVal} rows={3}
            onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
            placeholder="Write your answer in a complete sentence..."
            style={{ width: '100%', padding: '8px 12px', border: EX.border,
              fontFamily: EX.font, fontSize: 14, outline: 'none',
              resize: 'vertical', boxSizing: 'border-box' }} />
        ) : (
          <div>
            <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
              Your answer
            </div>
            <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font,
              fontSize: 14, minHeight: 40, whiteSpace: 'pre-line' }}>
              {openVal || '(no answer given)'}
            </div>
            {modelAns && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: EX.sans, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 3 }}>
                  Model answer
                </div>
                <div style={{ border: EX.thin, padding: '8px 12px', fontFamily: EX.font, fontSize: 14 }}>
                  {modelAns}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------
  // Evidence box (post-submit, black-and-white exam style)
  // -------------------------------------------------
  function renderEvidenceBox(q) {
    if (!submitted) return null;
    const sol = q.solution || {};
    const tip            = sol.tip            || '';
    const evidence       = sol.evidence       || '';
    const trap           = sol.trap           || '';
    const trapExplanation= sol.trapExplanation|| '';
    const answerFormat   = sol.answerFormat   || '';
    const steps          = sol.steps          || [];
    if (!tip && !evidence && !trap && !answerFormat && !steps.length) return null;

    function exBox(label, content, clickable) {
      return (
        <div key={label}
          onClick={clickable ? () => setActiveQ(q.id) : undefined}
          style={{ border: '1px solid #bbb', padding: '9px 12px', fontSize: 13,
            marginBottom: 8, cursor: clickable ? 'pointer' : 'default', fontFamily: EX.font }}>
          <div style={{ fontFamily: EX.sans, fontWeight: 700, fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '.5px', color: EX.muted, marginBottom: 4 }}>
            {label}
          </div>
          {content}
        </div>
      );
    }

    return (
      <div style={{ marginTop: 12, borderTop: '1px solid #ccc', paddingTop: 12 }}>
        {tip && exBox('Tip', <div>{tip}</div>)}
        {evidence && exBox('Where to find it',
          <div>
            <div style={{ borderLeft: '3px solid #1a1a1a', paddingLeft: 9, fontStyle: 'italic', marginBottom: 4 }}>
              "{evidence}"
            </div>
            <div style={{ fontFamily: EX.sans, fontSize: 11, color: EX.faint }}>
              Tap to highlight in the passage
            </div>
          </div>, true
        )}
        {trap && exBox('Trap to avoid',
          <div>"{trap}"{trapExplanation ? ' -- ' + trapExplanation : ''}</div>
        )}
        {answerFormat && exBox('Answer format', <div>{answerFormat}</div>)}
        {steps.length > 0 && (
          <div style={{ fontFamily: EX.font, fontSize: 13, paddingLeft: 4 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ marginBottom: 3 }}>{i + 1}. {step}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------
  // Layout
  // -------------------------------------------------
  const activeQuestion    = submitted ? (questions.find(q => q.id === activeQ) || null) : null;
  const autoGradedTotal   = questions.filter(isAutoGraded).length;
  const autoGradedScore   = submitted ? questions.filter(q => isAutoGraded(q) && gradeQuestion(q)).length : 0;
  const openTotal         = questions.filter(q => !isAutoGraded(q)).length;

  const passagePanel = (
    <div style={{ fontFamily: EX.font, fontSize: 15.5, lineHeight: 2.05, color: EX.ink }}>
      <div style={{ fontFamily: EX.sans, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: 1, borderBottom: '1px solid #ccc', paddingBottom: 8, marginBottom: 14, color: '#333' }}>
        Read the Passage
      </div>
      {renderPassageText(activeQuestion)}
      {submitted && activeQuestion && (
        <div style={{ marginTop: 14, fontFamily: EX.sans, fontSize: 11, color: EX.faint,
          display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <span>
            <span style={{ borderBottom: '2px solid #1a1a1a', fontWeight: 700, marginRight: 4 }}>
              evidence
            </span>
            Evidence
          </span>
          <span>
            <span style={{ borderBottom: '1px dashed #999', fontStyle: 'italic', marginRight: 4 }}>
              trap
            </span>
            Trap to avoid
          </span>
        </div>
      )}
    </div>
  );

  const questionsPanel = (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12, fontFamily: EX.sans }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: EX.muted }}>
          {sectionLabel} ({marks} mark{marks !== 1 ? 's' : ''})
        </span>
        {submitted && (
          <span style={{ fontSize: 13, fontWeight: 800,
            color: autoGradedScore === autoGradedTotal ? '#1a6b2e' : '#9b1c1c' }}>
            {autoGradedScore}/{autoGradedTotal} correct
            {openTotal > 0 && ' + ' + openTotal + ' open'}
          </span>
        )}
      </div>

      {questions.map((q, qi) => {
        const f        = getFormat(q);
        const isActive = activeQ === q.id && submitted;
        const tagLabel = f.replace(/_/g, ' ').toUpperCase();
        return (
          <div key={q.id}
            onClick={() => submitted && setActiveQ(q.id)}
            style={{ background: '#fff',
              border: isActive ? '2px solid #1a1a1a' : EX.border,
              padding: '16px 18px', marginBottom: 16,
              cursor: submitted ? 'pointer' : 'default' }}>

            {/* Header: Q41. [1m]               FILL BLANK */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12,
              alignItems: 'baseline', fontFamily: EX.sans }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{q.questionNo || qi + 1}.</span>
              {q.marks && <span style={{ fontSize: 11, color: EX.faint }}>[{q.marks}m]</span>}
              <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700,
                letterSpacing: '.5px', textTransform: 'uppercase', color: EX.muted,
                border: '1px solid #aaa', padding: '2px 7px' }}>
                {tagLabel}
              </span>
            </div>

            {/* Stem */}
            <div style={{ fontSize: 14.5, lineHeight: 1.55, whiteSpace: 'pre-line',
              fontFamily: EX.font }}>
              {q.stem || q.question || ''}
            </div>

            {/* Format-specific input */}
            {renderInput(q)}

            {/* Explanation boxes (post-submit) */}
            {renderEvidenceBox(q)}
          </div>
        );
      })}

      {/* Submit / Next Section */}
      {!submitted ? (
        <button onClick={handleSubmit} disabled={!allAnswered}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: allAnswered ? EX.ink : '#bbb',
            color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
            cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
          {allAnswered ? 'Submit Answers' : 'Answer all questions to submit'}
        </button>
      ) : (
        <button onClick={handleFinish}
          style={{ width: '100%', padding: '13px', fontFamily: EX.sans,
            background: EX.ink, color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Next Section
        </button>
      )}
    </div>
  );

  if (typeof SplitViewLayout !== 'undefined') {
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

  return (
    <div style={{ padding: '0 0 80px' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #E2E8F0', marginBottom: 12 }}>
        {passagePanel}
      </div>
      <div style={{ padding: '0 16px' }}>{questionsPanel}</div>
    </div>
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
        <div style={{fontSize:48}}>{pct>=80?"ðŸ†":pct>=60?"ðŸ‘":"ðŸ’ª"}</div>
        <div style={{fontSize:38,fontWeight:900,margin:"8px 0 4px"}}>{pct}%</div>
        <div style={{fontSize:15,opacity:0.9}}>{correct}/{total} correct Â· {fmtTime(duration)}</div>
      </div>
      <div style={{padding:"0 16px"}}>
        <div style={{background:C.card,borderRadius:18,padding:"16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>ðŸ“Š Section Breakdown</div>
          {SECTION_ORDER.map(type=>{const meta=SECTIONS[type];const items=bySection[type]||[];if(!items.length)return null;const c=items.filter(r=>r.correct).length;const p=Math.round((c/items.length)*100);return(<div key={type} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:700}}>{meta.icon} {meta.label}</span><span style={{fontSize:12,fontWeight:800,color:p>=80?C.green:p>=60?C.amber:C.red}}>{c}/{items.length} ({p}%)</span></div><div style={{background:"#EEF2F7",borderRadius:8,height:8}}><div style={{background:p>=80?C.green:p>=60?C.amber:C.red,borderRadius:8,height:8,width:`${p}%`,transition:"width 0.6s"}}/></div></div>);})}
        </div>
        {flagged.length>0&&(<div style={{background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:16,padding:"14px",marginBottom:14}}><div style={{fontWeight:800,fontSize:13,color:"#92400E",marginBottom:6}}>âš¡ {flagged.length} Quick Answer{flagged.length>1?"s":""} Flagged</div>{(flagged||[]).map(f=>(<div key={f.id} style={{fontSize:12,color:"#78350F",marginBottom:3}}>â€¢ {f.topic} â€” {fmtTime(f.timeTaken)}</div>))}</div>)}
        {wrong.length>0&&(<div style={{background:C.lRed,border:`1px solid #FECACA`,borderRadius:16,padding:"14px",marginBottom:14}}><div style={{fontWeight:800,fontSize:13,color:C.red,marginBottom:8}}>ðŸ“… Added to Mistakes Log</div>{(wrong||[]).map((w,i)=>(<div key={i} style={{fontSize:13,color:C.text,marginBottom:4}}>â€¢ {w.topic}</div>))}</div>)}
        <button onClick={onHome} style={{width:"100%",background:`linear-gradient(135deg,${C.navy},#2563EB)`,color:"#fff",border:"none",borderRadius:18,padding:"16px 0",fontSize:15,fontWeight:900,cursor:"pointer",marginBottom:10}}>â† Back to Home</button>
        <button onClick={onRetry} style={{width:"100%",background:"none",color:C.navy,border:`2px solid ${C.navy}`,borderRadius:18,padding:"14px 0",fontSize:15,fontWeight:800,cursor:"pointer"}}>ðŸ”„ New Session</button>
      </div>
    </div>
  );
}


export { SessionScreen };



