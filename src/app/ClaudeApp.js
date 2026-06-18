"use client";
import React from 'react';
import { useState, useRef, useEffect } from "react";

import {
  pickEnglishPaper,
  pickChinesePaper,
  englishPaperToPlan,
  englishPaperToLegacyInfo,
  buildChinesePlanFromPaper,
} from '@/lib/p3PaperBridge';

const C = {
  navy:"#1E3A6E", blue:"#3B82F6", purple:"#8B5CF6",
  amber:"#F59E0B", red:"#EF4444", green:"#10B981", orange:"#F97316",
  bg:"#F1F5F9", card:"#FFFFFF", text:"#0F172A",
  muted:"#64748B", border:"#E2E8F0",
  lBlue:"#DBEAFE", lGreen:"#D1FAE5", lRed:"#FEE2E2",
  lAmber:"#FEF3C7", lOrange:"#FFEDD5",
};

// ── Claude API — Dynamic AI Hints ────────────────────────────
async function getAIHint(question, topic, subject, studentAnswer=''){
  try {
    const prompt = subject === 'Chinese'
      ? `A Primary 3 Singapore student is learning Chinese.
Question: ${question}
Give ONE hint in English (max 15 words) to help them. Do NOT reveal the answer.`
      : `A Primary 3 Singapore student got this English question wrong.
Question: ${question}
Give ONE grammar/vocabulary hint (max 15 words). Do NOT give the answer.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 60,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if(!response.ok) return null;
    const data = await response.json();
    return data.content?.[0]?.text?.trim() || null;
  } catch(e){
    return null;  // Fail silently — fall back to static hint
  }
}

// AI Hint button — fetches Claude hint on demand
function AIHintBtn({question, topic, subject, studentAnswer, onHint}){
  const [loading, setLoading] = React.useState(false);
  const [used, setUsed]       = React.useState(false);

  async function handleClick(){
    if(loading || used) return;
    setLoading(true);
    const hint = await getAIHint(question, topic, subject, studentAnswer);
    setLoading(false);
    if(hint){ setUsed(true); onHint(hint); }
  }

  return(
    <button onClick={handleClick} disabled={loading||used}
      style={{background:used?"#F1F5F9":loading?"#FEF3C7":"#FFF7ED",
        border:"1.5px solid "+(used?"#CBD5E1":loading?"#FDE68A":"#F97316"),
        borderRadius:10,padding:"6px 14px",cursor:used||loading?"default":"pointer",
        fontSize:12,fontWeight:700,color:used?"#94A3B8":loading?"#92400E":"#EA580C",
        display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}>
      {loading ? <><span style={{animation:"spin .6s linear infinite",display:"inline-block"}}>⏳</span> Getting hint...</>
               : used ? "✅ Hint shown"
               : "🤖 Get AI Hint"}
    </button>
  );
}


// ── Web Speech API — Text-to-Speech ──────────────────────────
const TTS = {
  supported: typeof speechSynthesis !== 'undefined',

  speak(text, lang='en-SG', rate=0.9){
    if(!this.supported) return;
    speechSynthesis.cancel();
    const u   = new SpeechSynthesisUtterance(text);
    u.lang    = lang;
    u.rate    = rate;
    u.pitch   = 1.0;
    u.volume  = 0.9;
    speechSynthesis.speak(u);
  },

  speakChinese(text){ this.speak(text, 'zh-TW', 0.75); },
  speakEnglish(text){ this.speak(text, 'en-SG', 0.9);  },
  stop()            { if(this.supported) speechSynthesis.cancel(); },
};

// Speak button component
function SpeakBtn({text, lang='en', style={}}){
  const [speaking, setSpeaking] = React.useState(false);
  function handleSpeak(){
    if(!TTS.supported) return;
    setSpeaking(true);
    TTS.speak(text, lang==='zh'?'zh-TW':'en-SG', lang==='zh'?0.75:0.9);
    // Reset after estimated duration
    const ms = Math.max(1000, text.length * (lang==='zh'?300:120));
    setTimeout(()=>setSpeaking(false), ms);
  }
  if(!TTS.supported) return null;
  return(
    <button onClick={handleSpeak}
      style={{background:speaking?"#0D9488":"#F0FDF4",
        border:"1.5px solid #0D9488",borderRadius:8,
        padding:"4px 10px",cursor:"pointer",fontSize:13,
        transition:"all .2s",...style}}>
      {speaking?"🔊":"🔉"}
    </button>
  );
}


// ── SM-2 Spaced Repetition ────────────────────────────────────
// quality: 0=failed, 3=hard, 4=good, 5=easy
function sm2Update(card, quality){
  let { repetitions=0, easiness=2.5, interval=1, nextReview=null } = card||{};
  if(quality >= 3){
    interval = repetitions===0 ? 1 : repetitions===1 ? 6 : Math.round(interval * easiness);
    easiness = Math.max(1.3, easiness + 0.1 - (5-quality)*(0.08+(5-quality)*0.02));
    repetitions++;
  } else {
    repetitions = 0; interval = 1;
  }
  const due = new Date(); due.setDate(due.getDate() + interval);
  return { repetitions, easiness, interval, nextReview: due.toISOString() };
}

function isDue(card){
  if(!card?.nextReview) return true;
  return new Date(card.nextReview) <= new Date();
}

// Get overdue SR cards for a subject, up to maxN
function getSRDueItems(srData, subject, maxN=3){
  if(!srData) return [];
  return Object.entries(srData)
    .filter(([id, c]) => id.startsWith(subject) && isDue(c) && (c.repetitions||0) < 5)
    .sort((a,b) => new Date(a[1].nextReview||0) - new Date(b[1].nextReview||0))
    .slice(0, maxN)
    .map(([id]) => id);
}

// ── IndexedDB Persistent Storage ─────────────────────────────
const DB_NAME = 'GeniusProjectDB';
const DB_VER  = 1;
let _db = null;

async function getDB(){
  if(_db) return _db;
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if(!db.objectStoreNames.contains('progress'))
        db.createObjectStore('progress');
      if(!db.objectStoreNames.contains('sr'))
        db.createObjectStore('sr');
    };
    req.onsuccess = e => { _db = e.target.result; resolve(_db); };
    req.onerror   = () => reject(req.error);
  });
}

async function dbGet(store, key){
  try {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx  = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => res(req.result);
      req.onerror   = () => rej(req.error);
    });
  } catch(e){ return null; }
}

async function dbSet(store, key, value){
  try {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx  = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(value, key);
      req.onsuccess = () => res(true);
      req.onerror   = () => rej(req.error);
    });
  } catch(e){ return false; }
}

// Save progress to IndexedDB (called alongside window._GENIUS_STORE)
async function persistProgress(userId, grade, subject, data){
  const key = userId + '_' + grade + '_' + subject;
  await dbSet('progress', key, data);
}

// Load progress from IndexedDB on first login
async function loadPersistedProgress(userId, grade, subject){
  const key = userId + '_' + grade + '_' + subject;
  return await dbGet('progress', key);
}

// SR card storage
async function saveSRCard(userId, questionId, cardData){
  const key = userId + '_' + questionId;
  await dbSet('sr', key, cardData);
}

async function loadAllSRCards(userId){
  try {
    const db = await getDB();
    return new Promise((res) => {
      const tx     = db.transaction('sr', 'readonly');
      const store  = tx.objectStore('sr');
      const result = {};
      const req    = store.openCursor();
      req.onsuccess = e => {
        const cursor = e.target.result;
        if(cursor){
          if(cursor.key.startsWith(userId + '_'))
            result[cursor.key.replace(userId+'_','')] = cursor.value;
          cursor.continue();
        } else {
          res(result);
        }
      };
      req.onerror = () => res({});
    });
  } catch(e){ return {}; }
}


// ── Audio Feedback with Tone.js ──────────────────────────────
// Uses Tone.js (available in Claude Artifacts) for sound effects

let _toneReady = false;
let _toneLoading = false;

async function ensureTone(){
  if(_toneReady) return true;
  if(typeof Tone === 'undefined'){
    // Load Tone.js from CDN
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js';
      script.onload = () => { _toneReady = true; resolve(true); };
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }
  _toneReady = true;
  return true;
}

// Pre-load Tone.js
ensureTone();

const SFX = {
  // Correct answer — ascending bright notes
  async correct(){
    try {
      await ensureTone();
      if(typeof Tone === 'undefined') return;
      await Tone.start();
      const synth = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.5 }
      }).toDestination();
      const now = Tone.now();
      synth.triggerAttackRelease('E5', '16n', now);
      synth.triggerAttackRelease('G5', '16n', now + 0.1);
      synth.triggerAttackRelease('B5', '8n',  now + 0.2);
      setTimeout(()=>synth.dispose(), 1500);
    } catch(e){}
  },

  // Wrong answer — low short buzz
  async wrong(){
    try {
      await ensureTone();
      if(typeof Tone === 'undefined') return;
      await Tone.start();
      const synth = new Tone.Synth({
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.1 }
      }).toDestination();
      synth.volume.value = -6;
      synth.triggerAttackRelease('C3', '8n');
      setTimeout(()=>synth.dispose(), 800);
    } catch(e){}
  },

  // Perfect score — celebratory arpeggio
  async perfect(){
    try {
      await ensureTone();
      if(typeof Tone === 'undefined') return;
      await Tone.start();
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.8 }
      }).toDestination();
      const now = Tone.now();
      const notes = ['C5','E5','G5','C6'];
      notes.forEach((n,i)=>synth.triggerAttackRelease(n,'8n',now+i*0.12));
      setTimeout(()=>synth.dispose(), 2000);
    } catch(e){}
  },

  // Session complete — fanfare
  async complete(){
    try {
      await ensureTone();
      if(typeof Tone === 'undefined') return;
      await Tone.start();
      const synth = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.05, decay: 0.3, sustain: 0.4, release: 0.8 }
      }).toDestination();
      const now = Tone.now();
      ['G4','G4','G4','Eb4','Bb4','G4','Eb4','Bb4','G4'].forEach((n,i)=>{
        synth.triggerAttackRelease(n,'8n',now+i*0.18);
      });
      setTimeout(()=>synth.dispose(), 3000);
    } catch(e){}
  },

  // Hint used — gentle chime
  async hint(){
    try {
      await ensureTone();
      if(typeof Tone === 'undefined') return;
      await Tone.start();
      const synth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.6 }
      }).toDestination();
      synth.triggerAttackRelease('A4', '4n');
      setTimeout(()=>synth.dispose(), 1000);
    } catch(e){}
  },
};


// ── Motion Components (Framer Motion equivalent) ─────────────
// Pure CSS + React — same API feel as Framer Motion

// Inject all animation keyframes once
(function injectAnimations(){
  if(document.getElementById('genius-motion-styles')) return;
  const style = document.createElement('style');
  style.id = 'genius-motion-styles';
  style.textContent = `
    @keyframes gmFadeIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes gmFadeOut   { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-10px)} }
    @keyframes gmPop       { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
    @keyframes gmShake     { 0%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} 100%{transform:translateX(0)} }
    @keyframes gmPulse     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
    @keyframes gmSlideIn   { from{transform:translateX(-20px);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes gmSlideUp   { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes gmBounce    { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-12px)} 70%{transform:translateY(-6px)} }
    @keyframes gmSpin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gmStarBurst { 0%{transform:scale(0) rotate(0deg);opacity:1} 100%{transform:scale(2) rotate(180deg);opacity:0} }
    @keyframes gmCorrect   { 0%{background:inherit} 30%{background:#D1FAE5;transform:scale(1.02)} 100%{background:inherit;transform:scale(1)} }
    @keyframes gmWrong     { 0%{background:inherit} 30%{background:#FEE2E2} 100%{background:inherit} }
    
    .gm-fadeIn    { animation: gmFadeIn  0.35s ease forwards }
    .gm-pop       { animation: gmPop     0.4s  cubic-bezier(.175,.885,.32,1.275) forwards }
    .gm-shake     { animation: gmShake   0.5s  ease }
    .gm-pulse     { animation: gmPulse   1.5s  ease-in-out infinite }
    .gm-slideIn   { animation: gmSlideIn 0.3s  ease forwards }
    .gm-slideUp   { animation: gmSlideUp 0.35s ease forwards }
    .gm-bounce    { animation: gmBounce  0.6s  ease }
    .gm-spin      { animation: gmSpin    0.8s  linear infinite }
    .gm-correct   { animation: gmCorrect 0.6s  ease }
    .gm-wrong     { animation: gmWrong   0.4s  ease }
    
    .gm-fadeIn-1  { animation: gmFadeIn  0.35s ease 0.1s forwards; opacity:0 }
    .gm-fadeIn-2  { animation: gmFadeIn  0.35s ease 0.2s forwards; opacity:0 }
    .gm-fadeIn-3  { animation: gmFadeIn  0.35s ease 0.3s forwards; opacity:0 }
    .gm-fadeIn-4  { animation: gmFadeIn  0.35s ease 0.4s forwards; opacity:0 }
  `;
  document.head.appendChild(style);
})();

// Motion div — applies animation class, removes after done
function Motion({ children, anim='gm-fadeIn', delay=0, style={}, className='', onClick }){
  const [cls, setCls] = React.useState(anim);
  React.useEffect(()=>{
    const t = setTimeout(()=>setCls(''), 1200);
    return ()=>clearTimeout(t);
  },[anim]);
  const delayStyle = delay ? { animationDelay: delay+'ms', opacity: 0 } : {};
  return(
    <div className={cls+' '+className}
      style={{...delayStyle,...style}}
      onClick={onClick}>
      {children}
    </div>
  );
}

// Animated number — counts up from 0 to target
function AnimNumber({ value, duration=600, style={} }){
  const [display, setDisplay] = React.useState(0);
  React.useEffect(()=>{
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(()=>{
      start = Math.min(start + step, value);
      setDisplay(Math.round(start));
      if(start >= value) clearInterval(timer);
    }, 16);
    return ()=>clearInterval(timer);
  }, [value, duration]);
  return <span style={style}>{display}</span>;
}

// Star burst effect — shown on perfect answer
function StarBurst({ show }){
  if(!show) return null;
  const stars = ['⭐','🌟','✨','⭐','🌟'];
  return(
    <div style={{position:'absolute',top:'50%',left:'50%',
      transform:'translate(-50%,-50%)',pointerEvents:'none',zIndex:999}}>
      {stars.map((s,i)=>(
        <div key={i} style={{
          position:'absolute',
          top: Math.sin(i/stars.length*Math.PI*2)*40+'px',
          left: Math.cos(i/stars.length*Math.PI*2)*40+'px',
          fontSize:20,
          animation:`gmStarBurst 0.8s ease ${i*0.1}s forwards`,
          opacity:0,
        }}>{s}</div>
      ))}
    </div>
  );
}

// Progress bar with animation
function AnimProgressBar({ pct, color='#10B981', height=8, style={} }){
  const [width, setWidth] = React.useState(0);
  React.useEffect(()=>{
    const t = setTimeout(()=>setWidth(pct), 100);
    return ()=>clearTimeout(t);
  },[pct]);
  return(
    <div style={{background:'#E2E8F0',borderRadius:height,overflow:'hidden',...style}}>
      <div style={{
        background:color,borderRadius:height,height,
        width:width+'%',
        transition:'width 0.8s cubic-bezier(0.4,0,0.2,1)',
      }}/>
    </div>
  );
}


// ── App shell wrapper ─────────────────────────────────────────
function Wrap({children}){
  return(
    <div style={{
      fontFamily:"Nunito,system-ui,sans-serif",
      background:C.bg,
      minHeight:"100vh",
      maxWidth:430,
      width:"100%",
      margin:"0 auto",
      position:"relative",
      overflowX:"hidden",
      boxSizing:"border-box"
    }}>
      {children}
    </div>
  );
}

// ── Shared UI atoms (used throughout the app) ─────────────────

function TagPill({color, bg, children}){
  return(
    <span style={{background:bg||color+"18",color:color,fontSize:11,fontWeight:800,
      padding:"3px 10px",borderRadius:10,display:"inline-block"}}>
      {children}
    </span>
  );
}

function BigBtn({color, onClick, disabled, children}){
  return(
    <button onClick={onClick} disabled={!!disabled}
      style={{width:"100%",background:disabled?"#C8D3E0":color,color:"#fff",
        border:"none",borderRadius:16,padding:"16px",fontSize:15,fontWeight:900,
        cursor:disabled?"not-allowed":"pointer",marginTop:8,letterSpacing:.3}}>
      {children}
    </button>
  );
}

function ActionBtn({color, onClick, disabled, children}){
  return(
    <button onClick={onClick} disabled={!!disabled}
      style={{width:"100%",background:disabled?"#C8D3E0":`linear-gradient(135deg,${color},${color}cc)`,
        color:"#fff",border:"none",borderRadius:16,padding:"16px",fontSize:15,
        fontWeight:900,cursor:disabled?"not-allowed":"pointer",marginTop:8}}>
      {children}
    </button>
  );
}

function InputField({label, value, onChange, placeholder, type="text", onEnter}){
  return(
    <div style={{marginBottom:16}}>
      {label&&<div style={{fontSize:12,fontWeight:800,color:C.muted,marginBottom:6,
        textTransform:"uppercase",letterSpacing:.8}}>{label}</div>}
      <input
        type={type}
        value={value}
        onChange={e=>onChange(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&onEnter&&onEnter()}
        placeholder={placeholder||""}
        style={{width:"100%",padding:"13px 14px",borderRadius:12,
          border:`1.5px solid ${C.border}`,fontSize:14,fontWeight:600,
          color:C.text,background:C.card,boxSizing:"border-box",outline:"none"}}
      />
    </div>
  );
}

function ErrorBox({msg}){
  if(!msg) return null;
  return(
    <div style={{background:C.lRed,border:"1.5px solid "+C.red,borderRadius:12,
      padding:"10px 14px",marginBottom:12,fontSize:13,fontWeight:700,color:C.red}}>
      ⚠️ {msg}
    </div>
  );
}

function HintBox({text}){
  if(!text) return null;
  return(
    <div style={{background:C.lAmber,border:"1px solid #FDE68A",borderRadius:12,
      padding:"10px 13px",marginBottom:10}}>
      <div style={{fontSize:12,fontWeight:700,color:"#92400E"}}>💡 Hint: {text}</div>
    </div>
  );
}

function FeedbackBox({badge, meaning}){
  return(
    <div style={{background:C.lGreen,border:"1.5px solid "+C.green,borderRadius:14,
      padding:"11px 14px",marginBottom:10}}>
      <div style={{fontWeight:800,fontSize:14,color:"#065F46",marginBottom:meaning?4:0}}>
        {badge==="gold"?"⭐⭐⭐ Perfect!":badge==="silver"?"⭐⭐ Great!":"⭐ Correct!"}
      </div>
      {meaning&&<div style={{fontSize:12,color:"#047857",fontWeight:600}}>{meaning}</div>}
    </div>
  );
}

// ── Learning Card — shows key point after answering, gates "Next" ──
function LearnCard({ q, sectionType, wasCorrect, onAcknowledge }){
  const [secondsLeft, setSecondsLeft] = React.useState(3);
  const [acknowledged, setAcknowledged] = React.useState(false);

  React.useEffect(()=>{
    if(secondsLeft <= 0) return;
    const t = setTimeout(()=>setSecondsLeft(s=>s-1), 1000);
    return ()=>clearTimeout(t);
  }, [secondsLeft]);

  // Build the "key point" and "remember this" content from question data
  const keyPoint = (()=>{
    if(q.solution?.tip) return q.solution.tip;
    if(q.explanation)   return q.explanation;
    if(q.ruleCard?.title) return "Remember the rule: " + q.ruleCard.title;
    return null;
  })();

  // What to memorise (vocab/grammar/idiom/character)
  const memoryItem = (()=>{
    // Chinese: character + pinyin + meaning
    if(q.pinyin && q.meaning){
      const ans = q.options ? q.options[q.answer] : "";
      return { type:"chinese", char:ans, pinyin:q.pinyin, meaning:q.meaning };
    }
    // English vocab: the correct word + its meaning
    if(sectionType && sectionType.includes("Vocab") && q.options){
      const word = q.options[q.answer];
      const def  = (typeof WORD_DICT !== 'undefined' && WORD_DICT[word.toLowerCase()]) || null;
      if(def) return { type:"vocab", word, def };
    }
    // English grammar: the rule card
    if(q.ruleCard){
      return { type:"grammar", rule:q.ruleCard };
    }
    return null;
  })();

  const canProceed = secondsLeft <= 0;

  return(
    <div style={{background:wasCorrect?"#F0FDF4":"#FFF7ED",
      border:"2px solid "+(wasCorrect?"#10B981":"#F97316"),
      borderRadius:16,padding:"14px 16px",marginBottom:12,
      animation:"gmSlideUp 0.35s ease"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:18}}>{wasCorrect?"🎓":"📖"}</span>
        <div style={{fontSize:13,fontWeight:800,
          color:wasCorrect?"#065F46":"#9A3412"}}>
          {wasCorrect ? "Great! Now let's lock it in" : "Let's learn this properly"}
        </div>
      </div>

      {/* Key point */}
      {keyPoint && (
        <div style={{background:"#fff",borderRadius:10,padding:"10px 12px",marginBottom:10,
          border:"1px solid "+(wasCorrect?"#A7F3D0":"#FED7AA")}}>
          <div style={{fontSize:10,fontWeight:800,color:"#0D9488",marginBottom:4,
            textTransform:"uppercase",letterSpacing:.6}}>💡 Key Point</div>
          <div style={{fontSize:13,color:"#0F172A",fontWeight:600,lineHeight:1.6}}>
            {typeof keyPoint === 'string' ? keyPoint : ''}
          </div>
        </div>
      )}

      {/* Memory item — vocab / chinese / grammar */}
      {memoryItem && memoryItem.type === "chinese" && (
        <div style={{background:"#EFF6FF",borderRadius:10,padding:"10px 12px",marginBottom:10,
          border:"1px solid #BFDBFE"}}>
          <div style={{fontSize:10,fontWeight:800,color:"#1D4ED8",marginBottom:6,
            textTransform:"uppercase",letterSpacing:.6}}>📝 记住这个字 (Remember)</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:32,fontWeight:900,color:"#1E3A6E"}}>{memoryItem.char}</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#2563EB"}}>{memoryItem.pinyin}</div>
              <div style={{fontSize:12,color:"#475569"}}>{memoryItem.meaning}</div>
            </div>
            {typeof SpeakBtn !== 'undefined' &&
              <SpeakBtn text={memoryItem.char} lang="zh" style={{marginLeft:"auto"}}/>}
          </div>
        </div>
      )}

      {memoryItem && memoryItem.type === "vocab" && (
        <div style={{background:"#EFF6FF",borderRadius:10,padding:"10px 12px",marginBottom:10,
          border:"1px solid #BFDBFE"}}>
          <div style={{fontSize:10,fontWeight:800,color:"#1D4ED8",marginBottom:6,
            textTransform:"uppercase",letterSpacing:.6}}>📝 Word to Remember</div>
          <div style={{fontSize:16,fontWeight:800,color:"#1E3A6E"}}>{memoryItem.word}</div>
          <div style={{fontSize:12,color:"#475569",marginTop:2}}>{memoryItem.def}</div>
        </div>
      )}

      {memoryItem && memoryItem.type === "grammar" && (
        <div style={{marginBottom:10}}>
          <RuleCard card={memoryItem.rule}/>
        </div>
      )}

      {/* Gate button — disabled until timer ends */}
      <button
        onClick={()=>{ if(canProceed){ setAcknowledged(true); onAcknowledge(); } }}
        disabled={!canProceed}
        style={{width:"100%",
          background: canProceed ? (wasCorrect?"#10B981":"#F97316") : "#CBD5E1",
          color:"#fff",border:"none",borderRadius:12,padding:"13px",
          fontSize:14,fontWeight:800,
          cursor: canProceed ? "pointer" : "not-allowed",
          transition:"background .3s"}}>
        {canProceed
          ? "✓ I understand — Next"
          : `Read carefully... (${secondsLeft}s)`}
      </button>
    </div>
  );
}


function RevealBox({meaning}){
  return(
    <div style={{background:C.lRed,border:"1.5px solid "+C.red,borderRadius:14,
      padding:"11px 14px",marginBottom:10}}>
      <div style={{fontWeight:800,fontSize:13,color:C.red,marginBottom:meaning?4:0}}>
        📖 Let's learn from this one
      </div>
      {meaning&&<div style={{fontSize:12,color:"#991B1B",fontWeight:600}}>{meaning}</div>}
    </div>
  );
}

function WrongBanner({attempts}){
  const msgs=["Try again! 💪","One more try! Think carefully…","Showing the answer now…"];
  return(
    <div style={{background:C.lAmber,border:"1px solid #FDE68A",borderRadius:12,
      padding:"9px 13px",marginBottom:10}}>
      <div style={{fontSize:12,fontWeight:700,color:"#92400E"}}>
        ❌ {msgs[Math.min(attempts-1,2)]}
      </div>
    </div>
  );
}

function RuleCard({card}){
  if(!card) return null;
  // card can be a string OR an object {title, emoji, rows}
  if(typeof card === 'string'){
    return(
      <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:14,
        padding:"12px 14px",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:800,color:"#1D4ED8",marginBottom:4,
          textTransform:"uppercase",letterSpacing:.8}}>📌 Grammar Rule</div>
        <div style={{fontSize:13,fontWeight:600,color:C.text,lineHeight:1.6}}>{card}</div>
      </div>
    );
  }
  // Object form: {title, emoji, rows:[["clue","tense"],...]}
  const {title="", emoji="📌", rows=[]} = card;
  return(
    <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:14,
      padding:"12px 14px",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
        <span style={{fontSize:18}}>{emoji}</span>
        <div style={{fontSize:11,fontWeight:800,color:"#1D4ED8",
          textTransform:"uppercase",letterSpacing:.8}}>{title}</div>
      </div>
      {rows.length>0&&(
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <tbody>
            {rows.map((row,i)=>(
              <tr key={i} style={{background:i%2===0?"#EFF6FF":"#fff"}}>
                {row.map((cell,j)=>(
                  <td key={j} style={{padding:"4px 8px",color:j===0?C.muted:C.text,
                    fontWeight:j===1?700:400,borderBottom:"1px solid #DBEAFE",
                    fontSize:11}}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function StudentBottomNav({screen, setScreen, mistakeCount}){
  const tabs=[
    {key:"home",   icon:"🏠", label:"Home"},
    {key:"mistakes",icon:"❌", label:"Mistakes", badge:mistakeCount},
    {key:"review", icon:"📚", label:"Review"},
  ];
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
      width:"100%",maxWidth:430,background:C.card,borderTop:"1px solid "+C.border,
      display:"flex",zIndex:100}}>
      {tabs.map(t=>(
        <button key={t.key} onClick={()=>setScreen(t.key)}
          style={{flex:1,background:"none",border:"none",cursor:"pointer",
            padding:"10px 4px 12px",display:"flex",flexDirection:"column",
            alignItems:"center",gap:2,position:"relative"}}>
          <span style={{fontSize:20}}>{t.icon}</span>
          <span style={{fontSize:9,fontWeight:screen===t.key?800:500,
            color:screen===t.key?C.navy:C.muted}}>{t.label}</span>
          {t.badge>0&&(
            <span style={{position:"absolute",top:6,right:"20%",background:C.red,
              color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,
              fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {t.badge>9?"9+":t.badge}
            </span>
          )}
        </button>
      ))}
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
      fontSize:14,fontWeight:700,zIndex:300,boxShadow:"0 8px 32px rgba(0,0,0,.35)",
      maxWidth:"min(92vw,360px)",textAlign:"center"}}>
      {message}
    </div>
  );
}

function SubjectSelectScreen({user, grade, onLogout, onSelect, onGradeChange}){
  const [comingSoon, setComingSoon] = React.useState(null);
  const [toastMsg, setToastMsg] = React.useState(null);
  return(
    <div style={{minHeight:"100vh",background:C.bg}}>
      <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",padding:"24px 20px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,gap:8}}>
          <div>
            <div style={{color:"rgba(255,255,255,.5)",fontSize:10,fontWeight:700,
              letterSpacing:1.5,textTransform:"uppercase"}}>Genius Project</div>
            <div style={{color:"#fff",fontSize:20,fontWeight:900,marginTop:2}}>
              Hello, {user.name.split(" ")[0]}! 👋
            </div>
            <div style={{color:"rgba(255,255,255,.55)",fontSize:12,marginTop:2}}>
              {user.school||"Primary School"} · {grade}
            </div>
          </div>
          <button onClick={onLogout}
            style={{background:"rgba(255,255,255,.1)",border:"none",borderRadius:10,flexShrink:0,
              padding:"7px 12px",color:"rgba(255,255,255,.7)",cursor:"pointer",fontSize:12,fontWeight:700}}>
            Logout
          </button>
        </div>
        <div style={{display:"flex",gap:6}}>
          {GRADES.map(g=>(
            <button key={g} onClick={()=>onGradeChange(g)}
              style={{flex:1,background:g===grade?"rgba(255,255,255,.2)":"rgba(255,255,255,.07)",
                border:`1.5px solid ${g===grade?"rgba(255,255,255,.4)":"transparent"}`,
                borderRadius:10,padding:"6px 4px",color:g===grade?"#fff":"rgba(255,255,255,.45)",
                cursor:"pointer",fontSize:11,fontWeight:g===grade?800:500}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 80px"}}>
        <div style={{fontSize:13,fontWeight:800,color:C.muted,marginBottom:12,
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
                    <div style={{fontSize:16,fontWeight:900,
                      color:live?"#fff":"#64748B"}}>{sub.label}</div>
                    <div style={{fontSize:11,color:live?"rgba(255,255,255,.65)":"#94A3B8",
                      marginTop:1,overflow:"hidden",textOverflow:"ellipsis"}}>{sub.desc||""}</div>
                  </div>
                  {live
                    ?<span style={{marginLeft:"auto",flexShrink:0,background:"rgba(255,255,255,.2)",
                        color:"#fff",fontSize:10,fontWeight:800,padding:"3px 10px",
                        borderRadius:8}}>LIVE</span>
                    :<span style={{marginLeft:"auto",flexShrink:0,background:"#CBD5E1",
                        color:"#64748B",fontSize:10,fontWeight:800,padding:"3px 10px",
                        borderRadius:8}}>Coming Soon</span>
                  }
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {toastMsg&&<ComingSoonToast message={toastMsg} onDone={()=>setToastMsg(null)}/>}
      {comingSoon&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
          display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20}}>
          <div style={{background:"#fff",borderRadius:24,padding:"32px 24px",maxWidth:340,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>{SUBJECTS[comingSoon]?.icon||"🚧"}</div>
            <div style={{fontSize:20,fontWeight:900,color:C.text,marginBottom:8}}>
              {SUBJECTS[comingSoon]?.label} — Coming Soon!
            </div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:24}}>
              이 과목은 곧 제공될 예정입니다. 조금만 기다려 주세요!
            </div>
            <div style={{background:C.lGreen,borderRadius:12,padding:"10px 14px",marginBottom:20,
              fontSize:13,fontWeight:700,color:"#065F46"}}>
              ✅ Currently available: P3 English & Chinese
            </div>
            <button onClick={()=>setComingSoon(null)}
              style={{width:"100%",background:"linear-gradient(135deg,#1E3A6E,#2563EB)",
                color:"#fff",border:"none",borderRadius:14,padding:"14px",
                fontSize:15,fontWeight:900,cursor:"pointer"}}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Mistake Re-injection: pull up to N past-wrong question IDs ─
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


const SECTIONS = {
  GrammarMCQ:    { label:"Grammar MCQ",           icon:"📝", color:"#3B82F6", fixedCount:16, timed:45 },
  VocabMCQ:      { label:"Vocabulary MCQ",         icon:"📚", color:"#8B5CF6", fixedCount:16, timed:45 },
  GrammarCloze:  { label:"Grammar Cloze",          icon:"✏️", color:"#10B981", blanksPerSet:4, timed:60 },
  VocabCloze:    { label:"Vocabulary Cloze",       icon:"🔤", color:"#F59E0B", blanksPerSet:4, timed:60 },
  Editing:       { label:"Editing for Spelling",   icon:"🔍", color:"#F97316", blanksPerSet:4, timed:50 },
  Comprehension: { label:"Comprehension",          icon:"📖", color:"#EF4444", blanksPerSet:6, timed:90 },
};

const SECTION_ORDER = ["GrammarMCQ","VocabMCQ","GrammarCloze","VocabCloze","Editing","Comprehension"];

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
function guessFlag(ms,type){
  const t={GrammarMCQ:4000,VocabMCQ:4000,GrammarCloze:5000,VocabCloze:5000,Editing:4000,Comprehension:8000};
  return ms<(t[type]||4000);
}
function todayStr(){ return new Date().toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}); }
function dateLabel(ds){
  const today=todayStr();
  if(ds===today) return "Today";
  const yesterday=new Date(); yesterday.setDate(yesterday.getDate()-1);
  if(ds===yesterday.toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"})) return "Yesterday";
  return ds;
}

const SEED_MISTAKES = [
  { id:"gm04", date:"28 May 2026", section:"Grammar MCQ", topic:"Subject-Verb Agreement",
    sentence:"The students in the class ______ very excited about the school trip.",
    options:["was","is","were","has"], correctAnswer:2, studentAnswer:0,
    attempts:3, timeTaken:2800, flagged:true,
    explanation:"'Were' is correct. 'The students' is plural — more than one person — so we use 'were', not 'was'.",
    hint:"Think about whether 'students' is one person or many." },
  { id:"gm12", date:"28 May 2026", section:"Grammar MCQ", topic:"Present Perfect",
    sentence:"Matilda ______ already read all the books in the children's section.",
    options:["is","was","has","have"], correctAnswer:2, studentAnswer:3,
    attempts:2, timeTaken:5200, flagged:false,
    explanation:"'Has' is correct. Present perfect = has/have + past participle. Matilda is singular → 'has'.",
    hint:"Matilda is one person. Does one person use 'has' or 'have'?" },
  { id:"vm05", date:"28 May 2026", section:"Vocabulary MCQ", topic:"Context Vocabulary",
    sentence:"The class was very ______ when they heard the school trip was cancelled.",
    options:["delighted","disappointed","surprised","excited"], correctAnswer:1, studentAnswer:0,
    attempts:3, timeTaken:3100, flagged:true,
    explanation:"'Disappointed' means sad when something you hoped for doesn't happen. A cancelled trip = disappointment.",
    hint:"How would YOU feel if a fun trip was cancelled?" },
  { id:"gm07", date:"26 May 2026", section:"Grammar MCQ", topic:"Past Continuous",
    sentence:"The children ______ quietly when the fire drill suddenly went off.",
    options:["read","reads","were reading","have read"], correctAnswer:2, studentAnswer:0,
    attempts:3, timeTaken:2500, flagged:true,
    explanation:"'Were reading' is past continuous. The fire drill interrupted an ongoing action.",
    hint:"Two people were already doing something when the drill went off. Which tense shows an action in progress?" },
  { id:"vm09", date:"26 May 2026", section:"Vocabulary MCQ", topic:"Antonyms",
    sentence:"Despereaux was a timid mouse at first.",
    options:["scared","bold","quiet","small"], correctAnswer:1, studentAnswer:2,
    attempts:2, timeTaken:4800, flagged:false,
    explanation:"'Bold' is the opposite of 'timid'. Timid = shy and easily scared. Bold = confident and brave.",
    hint:"'Timid' means shy and easily frightened. What is the opposite of that?" },
  { id:"gm15", date:"24 May 2026", section:"Grammar MCQ", topic:"Past Perfect",
    sentence:"By the time Despereaux reached the dungeon, the princess ______ already been taken.",
    options:["is","was","has","had"], correctAnswer:3, studentAnswer:2,
    attempts:2, timeTaken:6200, flagged:false,
    explanation:"Past perfect = 'had + past participle'. The princess was taken before Despereaux arrived.",
    hint:"Which action happened first? Use past perfect for the earlier action." },
  { id:"vm16", date:"24 May 2026", section:"Vocabulary MCQ", topic:"Antonyms",
    sentence:"The children were very obedient in class.",
    options:["quiet","naughty","clever","happy"], correctAnswer:1, studentAnswer:0,
    attempts:3, timeTaken:3800, flagged:false,
    explanation:"'Naughty' is the opposite of 'obedient'. Obedient = follows rules. Naughty = breaks rules.",
    hint:"'Obedient' means following rules. What word means the opposite?" },
];

const INITIAL_MASTERY = {
  GrammarCloze:  { sets:1, streak:0 },
  VocabCloze:    { sets:1, streak:0 },
  Editing:       { sets:1, streak:0 },
  Comprehension: { sets:1, streak:0 },
};

const SUBJECTS = {
  English:  { label:"English",     icon:"📖", color:"#3B82F6", live:true,  desc:"Grammar · Vocab · Comprehension" },
  Math:     { label:"Mathematics", icon:"🔢", color:"#0D9488", live:false, desc:"Coming soon!" },
  Science:  { label:"Science",     icon:"🔬", color:"#F59E0B", live:false, desc:"Coming soon!" },
  Chinese:  { label:"Chinese 华文", icon:"🀄", color:"#EF4444", live:true,  desc:"辨字 · 词语 · 扩句 · 阅读" },
};
const GRADES = ["P3","P4","P5","P6"];

const LIVE_CONTENT = { "P3_English": true, "P3_Chinese": true };

// ── Seed accounts — always present after any artifact reload ──
const SEED_USERS = {
  "joonhee2018": {
    id:"joonhee2018", password:"002323", role:"student",
    name:"Joonhee", grade:"P3",
    school:"Ai Tong Primary School",
    childIds:[], createdAt:"2026-05-01"
  },
  "demo_student": {
    id:"demo_student", password:"demo123", role:"student",
    name:"Demo Student", grade:"P3",
    school:"Anglo-Chinese School (Junior)",
    childIds:[], createdAt:"2026-01-01"
  },
  "demo_parent": {
    id:"demo_parent", password:"demo456", role:"parent",
    name:"Demo Parent", grade:"P3",
    childIds:["demo_student"], createdAt:"2026-01-01"
  },
};

// Initialise store — preserve existing session data, seed missing accounts
if(!window._GENIUS_STORE){
  window._GENIUS_STORE = { users:{}, progress:{} };
}
const STORE = window._GENIUS_STORE;

// Merge seed users (never overwrite a user already registered this session)
Object.entries(SEED_USERS).forEach(([id, u])=>{
  if(!STORE.users[id]) STORE.users[id] = {...u};
});

function storeGet(key)   { return STORE[key]; }
function storeSet(key, v){ STORE[key] = v; }

function allUsers(){ return Object.values(STORE.users); }

const ADMIN_ACCOUNTS = [
  { id:"genius_admin", password:"GeniusAdmin2026!", name:"Genius Project Admin", role:"admin" },
  { id:"admin",        password:"admin123",          name:"Admin",               role:"admin" },
];
function isAdmin(id, pw){ return ADMIN_ACCOUNTS.find(a=>a.id===id&&a.password===pw)||null; }

function getProgress(userId, grade, subject){
  const key = userId+"_"+grade+"_"+subject;
  if(!STORE.progress[key]){
    const isDemoUser = userId==="demo_student";
    const seedH = isDemoUser && grade==="P3" && subject==="English" ? makeSeedHistory(userId) : [];
    STORE.progress[key] = {
      history: seedH,
      settings: {...DEFAULT_SETTINGS},
      mistakes: [],
      nextSession: seedH.length+1,
    };
  }
  return STORE.progress[key];
}

function setProgress(userId, grade, subject, data){
  const key = `${userId}_${grade}_${subject}`;
  STORE.progress[key] = data;
  // Persist to IndexedDB for survival across tab closes
  if(typeof persistProgress === 'function'){
    persistProgress(userId, grade, subject, data);
  }
}

function makeSeedHistory(userId){
  const seeds = {
    demo_student: [
      { sessionNum:1,  date:"10 May 2026", scores:{ GrammarMCQ:62, VocabMCQ:56, GrammarCloze:75, VocabCloze:50, Editing:87, Comprehension:66 }, totalPct:66, isMockExam:false,
        mistakes:[
          { id:"gm03", topic:"Simple Past", sectionType:"GrammarMCQ", correct:false, solvedAfterHint:true, attempts:2, difficulty:"core",
            q:"Yesterday, the children ______ to the zoo.", yourAnswer:"go", correctAnswer:"went",
            explanation:"'Yesterday' is a past-time clue, so we use the simple past tense 'went' (not 'go').",
            solution:{method:"Time Clue → Tense", steps:["'Yesterday' = past time","Past tense of 'go' = 'went'","Answer: went"], tip:"Past-time words (yesterday, last week) always need past tense."} },
          { id:"vm05", topic:"Vocabulary", sectionType:"VocabMCQ", correct:false, solvedAfterHint:false, attempts:1, difficulty:"core",
            q:"The naughty boy felt ______ after breaking the vase.", yourAnswer:"proud", correctAnswer:"guilty",
            explanation:"'Guilty' means feeling bad after doing something wrong — that fits breaking the vase." }
        ] },
      { sessionNum:2,  date:"13 May 2026", scores:{ GrammarMCQ:68, VocabMCQ:62, GrammarCloze:75, VocabCloze:62, Editing:87, Comprehension:66 }, totalPct:70, isMockExam:false,
        mistakes:[
          { id:"vm08", topic:"Vocabulary", sectionType:"VocabMCQ", correct:false, solvedAfterHint:false, attempts:1, difficulty:"stretch",
            q:"The ______ smell of fresh bread filled the kitchen.", yourAnswer:"gloomy", correctAnswer:"fragrant",
            explanation:"'Fragrant' means having a nice, sweet smell — perfect for fresh bread." }
        ] },
      { sessionNum:3,  date:"16 May 2026", scores:{ GrammarMCQ:75, VocabMCQ:68, GrammarCloze:100,VocabCloze:75, Editing:87, Comprehension:83 }, totalPct:79, isMockExam:false },
      { sessionNum:4,  date:"18 May 2026", scores:{ GrammarMCQ:81, VocabMCQ:75, GrammarCloze:100,VocabCloze:75, Editing:100,Comprehension:83 }, totalPct:85, isMockExam:false },
      { sessionNum:5,  date:"21 May 2026", scores:{ GrammarMCQ:87, VocabMCQ:81, GrammarCloze:100,VocabCloze:87, Editing:100,Comprehension:83 }, totalPct:89, isMockExam:false },
      { sessionNum:6,  date:"23 May 2026", scores:{ GrammarMCQ:87, VocabMCQ:81, GrammarCloze:100,VocabCloze:87, Editing:100,Comprehension:100},totalPct:92, isMockExam:false },
      { sessionNum:7,  date:"25 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:87, GrammarCloze:100,VocabCloze:87, Editing:100,Comprehension:100},totalPct:94, isMockExam:false },
      { sessionNum:8,  date:"26 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:87, GrammarCloze:100,VocabCloze:100,Editing:100,Comprehension:100},totalPct:96, isMockExam:false },
      { sessionNum:9,  date:"27 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:87, GrammarCloze:100,VocabCloze:100,Editing:100,Comprehension:100},totalPct:96, isMockExam:false },
      { sessionNum:10, date:"28 May 2026", scores:{ GrammarMCQ:93, VocabMCQ:93, GrammarCloze:100,VocabCloze:100,Editing:100,Comprehension:100},totalPct:97, isMockExam:false },
      { sessionNum:11, date:"28 May 2026", scores:{ GrammarMCQ:75, VocabMCQ:68, GrammarCloze:75, VocabCloze:75, Editing:87, Comprehension:83 }, totalPct:77, isMockExam:true, school:"Nanyang Primary", examType:"WA1" },
    ],
  };
  return seeds[userId] || seeds["demo_student"].map(s=>({...s, totalPct: Math.max(50, s.totalPct-15)}));
}

const DEFAULT_SETTINGS = {
  GrammarMCQ:    { count:16, difficulty:"standard" },
  VocabMCQ:      { count:16, difficulty:"standard" },
  GrammarCloze:  { sets:1 },
  VocabCloze:    { sets:1 },
  Editing:       { sets:1 },
  Comprehension: { sets:1 },
};

const MOCK_EXAMS = [
  { id:"nanyang_wa1_2025", school:"Nanyang Primary",    type:"WA1", year:2025 },
  { id:"nanhua_wa1_2025",  school:"Nan Hua Primary",    type:"WA1", year:2025 },
  { id:"henry_park_wa2",   school:"Henry Park Primary", type:"WA2", year:2025 },
];

function generateAdvice(history){
  if(!history.length) return [];
  const last3 = history.filter(h=>!h.isMockExam).slice(-3);
  if(!last3.length) return [];
  const avg = key => Math.round(last3.reduce((s,h)=>s+(h.scores[key]||0),0)/last3.length);
  const advice = [];
  const gm=avg("GrammarMCQ"), vm=avg("VocabMCQ"), comp=avg("Comprehension"), edit=avg("Editing");

  if(gm<70)  advice.push({type:"increase",section:"GrammarMCQ",icon:"📝",priority:"🔴 High",
    text:`Grammar MCQ avg is ${gm}% (last 3 sessions). Increase to 20 questions and use 'mixed' difficulty to reinforce weak tenses and SVA.`,action:{count:20,difficulty:"mixed"}});
  else if(gm>=90) advice.push({type:"advance",section:"GrammarMCQ",icon:"📝",priority:"🟢 Advance",
    text:`Grammar MCQ is strong at ${gm}%! Ready to challenge with advanced difficulty.`,action:{count:16,difficulty:"advanced"}});

  if(vm<65)  advice.push({type:"increase",section:"VocabMCQ",icon:"📚",priority:"🔴 High",
    text:`Vocabulary avg is ${vm}%. Increase to 20 questions and focus on synonyms/antonyms.`,action:{count:20,difficulty:"standard"}});
  else if(vm>=85) advice.push({type:"advance",section:"VocabMCQ",icon:"📚",priority:"🟢 Advance",
    text:`Vocabulary is doing well at ${vm}%. Consider advancing to mixed difficulty.`,action:{count:16,difficulty:"mixed"}});

  if(comp<70) advice.push({type:"increase",section:"Comprehension",icon:"📖",priority:"🔴 High",
    text:`Comprehension at ${comp}% carries the most PSLE marks. Increase to 2 sets immediately.`,action:{sets:2}});

  if(edit>=90) advice.push({type:"reduce",section:"Editing",icon:"🔍",priority:"🔵 Maintain",
    text:`Spelling/Editing is excellent at ${edit}%. Maintain current level.`,action:{sets:1}});

  if(!advice.length) advice.push({type:"maintain",section:"all",icon:"⭐",priority:"🟡 Good",
    text:`Balanced performance! Focus on consistency and aim for 85%+ across all sections.`,action:null});
  return advice;
}

const SCHOOL_PAPER_MAP = {
  "Nanyang Primary":    { style:"challenging", focusTopics:["Past Perfect","Subject-Verb Agreement","Synonyms"],      compStyle:"long_inference", mockRef:"nanyang_wa1_2025" },
  "Nan Hua Primary":    { style:"standard",    focusTopics:["Past Continuous","Conjunctions","Context Vocabulary"],   compStyle:"factual_plus",   mockRef:"nanhua_wa1_2025" },
  "Henry Park Primary": { style:"challenging", focusTopics:["Reflexive Pronouns","Present Perfect","Antonyms"],       compStyle:"long_inference", mockRef:"henry_park_wa2" },
  "Raffles Girls Prim": { style:"advanced",    focusTopics:["Past Perfect","Conjunctions","Synonyms"],                compStyle:"inference_heavy",mockRef:"nanyang_wa1_2025" },
  "CHIJ St Nicholas":   { style:"advanced",    focusTopics:["Subject-Verb Agreement","Prepositions","Antonyms"],      compStyle:"inference_heavy",mockRef:"nanyang_wa1_2025" },
  "Methodist Girls":    { style:"standard",    focusTopics:["Past Continuous","Question Words","Context Vocabulary"], compStyle:"factual_plus",   mockRef:"nanhua_wa1_2025" },
  "Tao Nan":            { style:"standard",    focusTopics:["Simple Past","Pronouns","Synonyms"],                     compStyle:"factual",        mockRef:"nanhua_wa1_2025" },
  "Maha Bodhi":         { style:"standard",    focusTopics:["Simple Past","Conjunctions","Context Vocabulary"],       compStyle:"factual",        mockRef:"nanhua_wa1_2025" },
};

function getSchoolProfile(schoolName){
  if(!schoolName) return null;
  for(const [key,val] of Object.entries(SCHOOL_PAPER_MAP)){
    if(schoolName.toLowerCase().includes(key.toLowerCase())) return {...val, schoolKey:key};
  }
  return null;
}

function pickQuestionsForSchool(allQs, schoolName, count){
  const profile = getSchoolProfile(schoolName);
  if(!profile || !profile.focusTopics) return allQs.slice(0, count);
  const priority = allQs.filter(q => profile.focusTopics.some(t => (q.topic||"").includes(t)));
  const rest     = allQs.filter(q => !profile.focusTopics.some(t => (q.topic||"").includes(t)));
  return [...priority, ...rest].slice(0, count);
}

const ZH_SECTIONS = {
  BianZi:    { label:"辨字测验", sub:"Choose the correct character", icon:"🔤", color:"#3B82F6" },
  CiYu:      { label:"词语选择", sub:"Choose the correct word",      icon:"📝", color:"#8B5CF6" },
  KanTu:     { label:"看图选词", sub:"Match picture to word",        icon:"🖼️", color:"#10B981" },
  PeiDui:    { label:"词语搭配", sub:"Word collocation matching",    icon:"🔗", color:"#F59E0B" },
  JuZi:      { label:"扩写句子", sub:"Build sentences with tiles",   icon:"🧩", color:"#F97316" },
  ZuJu:      { label:"组句成段", sub:"Arrange sentences in order",   icon:"📋", color:"#EC4899" },
  YueRead:   { label:"阅读理解", sub:"Reading comprehension",        icon:"📖", color:"#EF4444" },
};
const ZH_SECTION_ORDER = ["BianZi","CiYu","KanTu","PeiDui","JuZi","ZuJu","YueRead"];

function buildZhPlan(sessionNum, level) {
  const isPast = level==="pastpaper" || (sessionNum >= 11 && !LEVEL_MAP[level]);
  const paper = pickChinesePaper({ sessionNum: sessionNum||1, isPastPaper: isPast });
  const plan = buildChinesePlanFromPaper(paper, pickByLevel, level, sessionNum);
  plan.isPastPaper = isPast;
  return plan;
}

function buildZhPastPaperPlan(sessionNum) {
  const paper = pickChinesePaper({ sessionNum: sessionNum||11, isPastPaper: true });
  const plan = buildChinesePlanFromPaper(paper, null, "medium", sessionNum);
  plan.isPastPaper = true;
  return plan;
}

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

  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}> <div style={{background:"#F0F9FF",border:"1.5px solid #BAE6FD",borderRadius:16,padding:"14px 16px",marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>📖 阅读短文 — {set.setLabel}</div>
        <div style={{fontSize:14,color:C.text,lineHeight:2,whiteSpace:"pre-line"}}>{set.passage}</div>
      </div>

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
                    <span style={{fontSize:13,fontWeight:600,color:col,flex:1}}>{opt}</span>
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

function ZhHome({user, prog, onStart, onBack}){
  const history=prog.history||[];
  const avgTotal=history.length?Math.round(history.reduce((s,h)=>s+h.totalPct,0)/history.length):0;
  const [showRecent,setShowRecent]=useState(false);

  return(
    <div style={{paddingBottom:80}}> <div style={{background:"linear-gradient(135deg,#7C2D12,#EF4444)",padding:"20px 20px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div>
            <div style={{color:"rgba(255,255,255,.55)",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>Genius Project</div>
            <div style={{color:"#fff",fontSize:17,fontWeight:900}}>🀄 P3 高级华文</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:11,marginTop:2}}>菩提学校 · Maha Bodhi School</div>
          </div>
          <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"rgba(255,255,255,.85)",cursor:"pointer",fontSize:12,fontWeight:700}}>← 返回</button>
        </div>
      </div> <div style={{background:"#fff",padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:10}}>
          {[
            {icon:"📋",l:"练习次数",v:history.length},
            {icon:"🎯",l:"平均分",v:avgTotal?`${avgTotal}%`:"—"},
            {icon:"📅",l:"下一节",v:`#${prog.nextSession}`},
          ].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#F8FAFC",borderRadius:12,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:16}}>{s.icon}</div>
              <div style={{fontSize:15,fontWeight:900,color:"#7C2D12"}}>{s.v}</div>
              <div style={{fontSize:9,color:C.muted,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}> {prog.nextSession>=11&&(
          <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(15,23,42,.35)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}>📄</span>
              <div>
                <div style={{color:"#fff",fontSize:14,fontWeight:900}}>Ai Tong Primary 基出题 #{prog.nextSession-10}</div>
                <div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginTop:2}}>爱同学校 · 2024 SA1 真题</div>
              </div>
            </div>
          </div>
        )}
        <button onClick={onStart} style={{width:"100%",background:"linear-gradient(135deg,#7C2D12,#EF4444)",color:"#fff",border:"none",borderRadius:18,padding:0,cursor:"pointer",boxShadow:"0 8px 28px rgba(124,45,18,.35)",overflow:"hidden",textAlign:"left",marginBottom:16}}>
          <div style={{padding:"18px 20px"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.6)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>
              P3 高级华文 · 第{prog.nextSession}节
            </div>
            <div style={{fontSize:17,fontWeight:900,color:"#fff",marginBottom:4}}>▶ 开始今天的练习 →</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>辨字 · 词语 · 看图 · 搭配 · 扩句 · 组段 · 阅读</div>
          </div>
          <div style={{background:"rgba(255,255,255,.06)",padding:"8px 20px",display:"flex",gap:12}}>
            {ZH_SECTION_ORDER.map(k=>{
              const meta=ZH_SECTIONS[k];
              return <div key={k} style={{display:"flex",alignItems:"center",gap:3}}>
                <span style={{fontSize:12}}>{meta.icon}</span>
              </div>;
            })}
          </div>
        </button> <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          {ZH_SECTION_ORDER.map(k=>{
            const meta=ZH_SECTIONS[k];
            return(
              <div key={k} style={{background:"#fff",borderRadius:14,padding:"12px 10px",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                <div style={{fontSize:20,marginBottom:4}}>{meta.icon}</div>
                <div style={{fontSize:11,fontWeight:800,color:meta.color}}>{meta.label}</div>
                <div style={{fontSize:9,color:C.muted,marginTop:2,lineHeight:1.4}}>{meta.sub}</div>
              </div>
            );
          })}
        </div> {history.length>0&&(
          <div style={{background:"#fff",borderRadius:18,marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden"}}>
            <button onClick={()=>setShowRecent(p=>!p)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"13px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:13,color:C.text}}>📋 最近练习 ({history.length})</div>
              <span style={{color:C.muted,fontSize:13,transform:showRecent?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
            </button>
            {showRecent&&(
              <div style={{padding:"0 14px 14px"}}>
                {[...history].reverse().slice(0,5).map((h,i)=>{
                  const col=h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                      <div style={{width:32,height:32,borderRadius:9,background:col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🀄</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:700}}>第 #{h.sessionNum} 节</div>
                        <div style={{fontSize:10,color:C.muted}}>{h.date}</div>
                      </div>
                      <div style={{fontSize:16,fontWeight:900,color:col}}>{h.totalPct}%</div>
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


// ── Level Picker — choose difficulty set / past paper ────────
function LevelPicker({value, onChange, recommended}){
  const opts=[
    ["easy","🟢 Easy","Foundation level"],
    ["medium","🟡 Medium","Standard exam level"],
    ["hard","🔴 Hard","Above average"],
    ["pastpaper","🏫 Past Paper","Real school paper"],
  ];
  return(
    <div style={{background:"#fff",borderRadius:16,padding:"14px 16px",marginBottom:14,
      boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:12,fontWeight:800,color:"#0F172A"}}>🎯 Question Set</div>
        <div style={{fontSize:10,color:"#64748B"}}>
          ⭐ Recommended: <strong style={{color:"#0D9488"}}>
            {recommended==="easy"?"Easy":recommended==="hard"?"Hard":"Medium"}</strong>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {opts.map(([k,label,desc])=>{
          const sel=(value||recommended)===k;
          return(
            <button key={k} onClick={()=>onChange(k)}
              style={{background:sel?"#0F172A":"#F8FAFC",color:sel?"#fff":"#334155",
                border:"1.5px solid "+(sel?"#0F172A":"#E2E8F0"),borderRadius:12,
                padding:"9px 10px",cursor:"pointer",textAlign:"left"}}>
              <div style={{fontSize:12,fontWeight:800}}>{label}
                {recommended===k&&!value&&<span style={{marginLeft:4}}>⭐</span>}</div>
              <div style={{fontSize:9,opacity:.75,marginTop:1}}>{desc}</div>
            </button>
          );
        })}
      </div>
      <div style={{fontSize:10,color:"#94A3B8",marginTop:8,lineHeight:1.5}}>
        Sets change every session — you will never repeat the same set.
        Score &lt;60% → Easy next · 60–75% → Medium · &gt;75% → Hard.
      </div>
    </div>
  );
}

function ChineseApp({user, getProgress, setProgress, onBack}){
  const [level,setLevel]=React.useState(null);
  const grade="P3", subject="Chinese";
  const prog = getProgress(grade, subject);

  const [screen,setScreen] = useState("home");   // home | session | result
  const [inSession,setInSession] = useState(false);
  const [sessionResult,setSessionResult] = useState(null);

  function handleSessionDone(results){
    const sessionNum=prog.nextSession;
    const bySection={};
    ZH_SECTION_ORDER.forEach(t=>{
      const items=results.filter(r=>r.sectionType===t);
      if(items.length) bySection[t]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=results.length?Math.round(results.filter(r=>r.correct).length/results.length*100):0;
    const newEntry={sessionNum,date:todayStr(),scores:bySection,totalPct,mistakes:results.filter(r=>!r.correct).map(r=>({...r}))};
    const newMistakes=[...(prog.mistakes||[]),...results.filter(r=>!r.correct).map(r=>({...r,date:todayStr()}))];
    setProgress(grade,subject,{...prog,history:[...(prog.history||[]),newEntry],mistakes:newMistakes,nextSession:sessionNum+1});
    setSessionResult({results,sessionNum});
    setInSession(false);
    setScreen("result");
  }

  if(inSession) return(
    <Wrap>
      <ZhSessionScreen
        plan={buildZhPlan(prog.nextSession, level||recommendLevel(prog.history))}
        onFinish={handleSessionDone}
        onBack={()=>setInSession(false)}
      />
    </Wrap>
  );

  if(screen==="result"&&sessionResult) return(
    <Wrap>
      <ZhResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        onHome={()=>setScreen("home")}
        onNext={()=>{ setInSession(true); setScreen("home"); }}
      />
    </Wrap>
  );

  return(
    <Wrap>
      <><div style={{padding:"14px 16px 0"}}><LevelPicker value={level} onChange={setLevel} recommended={recommendLevel(prog.history)}/></div>
      <ZhHome user={user} prog={prog} onStart={()=>setInSession(true)} onBack={onBack}/></>
    </Wrap>
  );
}

function AuthScreen({onLogin, onSignup}){
  const [mode, setMode] = useState("login");   // login | signup_student | signup_parent
  return(
    <Wrap>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:"#0F172A"}}> <div style={{background:"linear-gradient(160deg,#1E3A6E,#1E40AF)",padding:"48px 24px 36px",textAlign:"center",flexShrink:0}}>
          <div style={{fontSize:56,marginBottom:10}}>🎓</div>
          <div style={{color:"#fff",fontSize:30,fontWeight:900,letterSpacing:1}}>Genius Project</div>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,marginTop:6}}>PSLE Practice · English · Math · Science · Chinese</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:16,flexWrap:"wrap"}}>
            {["P3","P4","P5","P6"].map(g=><span key={g} style={{background:"rgba(255,255,255,0.12)",borderRadius:8,padding:"4px 12px",color:"rgba(255,255,255,0.75)",fontSize:12,fontWeight:700}}>{g}</span>)}
          </div>
        </div> <div style={{flex:1,background:"#F1F5F9",borderRadius:"24px 24px 0 0",marginTop:-16,padding:"28px 20px 40px"}}>
          {mode==="login"    && <LoginForm onLogin={onLogin} onGoSignup={r=>setMode(r)}/>}
          {mode==="signup_student" && <SignupStudentForm onSignup={onSignup} onBack={()=>setMode("login")}/>}
          {mode==="signup_parent"  && <SignupParentForm  onSignup={onSignup} onBack={()=>setMode("login")}/>}
        </div>
      </div>
    </Wrap>
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
  const styleColors = {challenging:"#EF4444", advanced:"#7C3AED", standard:"#3B82F6"};
  const col = profile ? (styleColors[profile.style] || C.navy) : C.navy;
  return(
    <div style={{marginTop:10,background:col+"15",border:"1px solid "+col+"44",borderRadius:10,padding:"9px 13px",fontSize:12,fontWeight:600,lineHeight:1.6,color:col}}>
      {profile
        ? "📚 We have past papers from "+school+"! Focus topics: "+( profile.focusTopics ? profile.focusTopics.slice(0,3).join(", ") : "")
        : "📚 Got it! We'll use similar school papers as reference for your practice."}
    </div>
  );
}

function SchoolBanner({school}){
  const profile = getSchoolProfile(school);
  if(!profile) return null;
  const styleColors = {challenging:"#EF4444", advanced:"#7C3AED", standard:"#3B82F6"};
  const col = styleColors[profile.style] || C.navy;
  return(
    <div style={{background:col+"12",borderBottom:"1px solid "+col+"22",padding:"8px 16px",display:"flex",alignItems:"center",gap:8}}>
      <span style={{fontSize:16}}>🏫</span>
      <div style={{flex:1}}>
        <span style={{fontSize:12,fontWeight:700,color:col}}>{school}</span>
        <span style={{fontSize:11,color:C.muted}}> · Focus: </span>
        <span style={{fontSize:11,color:C.muted}}>{profile.focusTopics ? profile.focusTopics.slice(0,2).join(", ") : ""}</span>
      </div>
      <span style={{background:col,color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:8,textTransform:"uppercase"}}>{profile.style}</span>
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
    <div style={{position:"relative",marginBottom:0}}> <div onClick={()=>setOpen(o=>!o)} style={{background:"#fff",border:`1.5px solid ${open?C.navy:C.border}`,borderRadius:12,padding:"12px 14px",fontSize:14,fontWeight:hasVal?700:400,color:hasVal?"#0F172A":C.muted,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border 0.15s",boxShadow:open?"0 0 0 3px rgba(30,58,110,0.1)":"none"}}>
        <span style={{flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{displayVal}</span>
        <span style={{fontSize:12,color:C.muted,marginLeft:8,flexShrink:0,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span>
      </div> {open&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",border:`1.5px solid ${C.navy}`,borderRadius:14,boxShadow:"0 8px 32px rgba(15,23,42,0.18)",zIndex:999,overflow:"hidden"}}> <div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,background:"#F8FAFC"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"7px 12px"}}>
              <span style={{fontSize:14,color:C.muted}}>🔍</span>
              <input
                autoFocus
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="Search school name..."
                style={{border:"none",outline:"none",fontSize:13,flex:1,fontFamily:"Nunito,sans-serif",color:"#0F172A"}}
              />
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:C.muted,padding:0}}>×</button>}
            </div>
          </div> <div style={{maxHeight:240,overflowY:"auto"}}>
            {filtered.length===0&&(
              <div style={{padding:"16px",textAlign:"center",fontSize:13,color:C.muted}}>No schools found</div>
            )}
            {filtered.map((school,i)=>{
              const isSelected = school===value;
              const isOther    = school==="Other / Not Listed";
              const profile    = getSchoolProfile(school);
              const styleTag   = profile ? {challenging:"🔴",advanced:"🟣",standard:"🔵"}[profile.style] : null;
              return(
                <div key={i}
                  onClick={()=>{ onChange(school); setOpen(false); setSearch(""); }}
                  style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:isSelected?"#EFF6FF":"#fff",borderBottom:`1px solid ${C.border}`,transition:"background 0.1s"}}
                  onMouseEnter={e=>{ if(!isSelected) e.currentTarget.style.background="#F8FAFC"; }}
                  onMouseLeave={e=>{ if(!isSelected) e.currentTarget.style.background="#fff"; }}
                >
                  <span style={{fontSize:16,flexShrink:0}}>{isOther?"✏️":"🏫"}</span>
                  <span style={{flex:1,fontSize:13,fontWeight:isSelected?800:500,color:isSelected?C.navy:"#0F172A"}}>{school}</span>
                  {styleTag&&<span style={{fontSize:12,flexShrink:0}}>{styleTag}</span>}
                  {isSelected&&<span style={{fontSize:14,flexShrink:0}}>✓</span>}
                </div>
              );
            })}
          </div> <div style={{padding:"8px 14px",background:"#F8FAFC",borderTop:`1px solid ${C.border}`,display:"flex",gap:12,fontSize:10,color:C.muted}}>
            <span>🔴 Challenging</span><span>🟣 Advanced</span><span>🔵 Standard</span>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginForm({onLogin, onGoSignup}){
  const [role, setRole] = useState("student");
  const [id,   setId]   = useState("");
  const [pw,   setPw]   = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err,  setErr]  = useState("");

  function fillDemo(){
    if(role==="student"){ setId("demo_student"); setPw("demo123"); }
    else { setId("demo_parent"); setPw("demo456"); }
  }

  if(!STORE.users["demo_student"]){
    STORE.users["demo_student"] = {id:"demo_student",password:"demo123",name:"Mei Lin",grade:"P3",role:"student",avatar:"👧",color:"#3B82F6"};
    STORE.users["demo_parent"]  = {id:"demo_parent", password:"demo456",name:"Mrs Lee", role:"parent",childIds:["demo_student"]};
  }

  function handleLogin(){
    setErr("");
    const adminUser = isAdmin(id.trim(), pw);
    if(adminUser){ onLogin("admin", adminUser); return; }
    const user = allUsers().find(u=>u.id===id.trim()&&u.password===pw&&u.role===role);
    if(user) onLogin(role, user);
    else setErr("Wrong ID or password. Please check and try again.");
  }

  return(
    <div>
      <div style={{fontWeight:900,fontSize:20,color:"#0F172A",marginBottom:6}}>Welcome back 👋</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Log in to continue your practice</div> <div style={{display:"flex",background:"#E2E8F0",borderRadius:14,padding:4,marginBottom:20}}>
        {["student","parent"].map(r=>(
          <button key={r} onClick={()=>{setRole(r);setErr("");}} style={{flex:1,background:role===r?"#fff":"none",border:"none",borderRadius:11,padding:"10px 0",fontSize:14,fontWeight:800,cursor:"pointer",color:role===r?"#0F172A":C.muted,boxShadow:role===r?"0 2px 8px rgba(0,0,0,0.1)":"none",transition:"all 0.2s"}}>
            {r==="student"?"🎒 Student":"👩 Parent"}
          </button>
        ))}
      </div> <div onClick={fillDemo} style={{background:C.lBlue,border:`1px solid #BAE6FD`,borderRadius:12,padding:"10px 14px",marginBottom:18,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:11,fontWeight:800,color:"#1D4ED8",marginBottom:2}}>🎮 Try Demo Account</div>
          <div style={{fontSize:11,color:"#3B82F6"}}>{role==="student"?"ID: demo_student / PW: demo123":"ID: demo_parent / PW: demo456"}</div>
        </div>
        <span style={{color:"#3B82F6",fontSize:13,fontWeight:700}}>Fill →</span>
      </div>

      <InputField label="ID" value={id} onChange={setId} placeholder="Your login ID"/>
      <div style={{position:"relative",marginBottom:16}}>
        <InputField label="Password" value={pw} onChange={setPw} type={showPw?"text":"password"} placeholder="Your password" onEnter={handleLogin}/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted}}>{showPw?"🙈":"👁️"}</button>
      </div>

      {err&&<ErrorBox msg={err}/>}

      <BigBtn color={C.navy} onClick={handleLogin}>Log In →</BigBtn>

      <div style={{marginTop:20,textAlign:"center"}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:12}}>Don't have an account?</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>onGoSignup("signup_student")} style={{flex:1,background:"none",border:`2px solid ${C.navy}`,borderRadius:12,padding:"12px",fontSize:13,fontWeight:800,cursor:"pointer",color:C.navy}}>
            🎒 Student Sign Up
          </button>
          <button onClick={()=>onGoSignup("signup_parent")} style={{flex:1,background:"none",border:`2px solid #7C3AED`,borderRadius:12,padding:"12px",fontSize:13,fontWeight:800,cursor:"pointer",color:"#7C3AED"}}>
            👩 Parent Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function SignupStudentForm({onSignup, onBack}){
  const [form, setForm] = useState({name:"",grade:"P3",id:"",password:"",confirm:"",school:"",schoolCustom:""});
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [gender, setGender] = useState(null); // null | "boy" | "girl"

  const BOY_AVATARS = ["🦕","🦖","🐊","🐉","🦎"];
  const BOY_NAMES   = ["Bronto","Rex","Croco","Drake","Gecko"];

  const GIRL_AVATARS = ["🦄","🌸","🦋","🌈","⭐"];
  const GIRL_NAMES   = ["Uni","Blossom","Flutter","Rainbow","Starly"];

  const BOY_COLORS  = ["#3B82F6","#10B981","#0EA5E9","#6366F1","#14B8A6"];
  const GIRL_COLORS = ["#EC4899","#A855F7","#F472B6","#FB923C","#F43F5E"];

  const AVATARS = gender==="boy" ? BOY_AVATARS : gender==="girl" ? GIRL_AVATARS : [];
  const COLORS  = gender==="boy" ? BOY_COLORS  : gender==="girl" ? GIRL_COLORS  : [];
  const NAMES   = gender==="boy" ? BOY_NAMES   : gender==="girl" ? GIRL_NAMES   : [];

  const [avatar,   setAvatar]   = useState(null);
  const [colorIdx, setColorIdx] = useState(0);

  function f(k,v){ setForm(p=>({...p,[k]:v})); }

  function selectGender(g){
    setGender(g);
    setAvatar(g==="boy" ? BOY_AVATARS[0] : GIRL_AVATARS[0]);
    setColorIdx(0);
  }

  function handleSubmit(){
    setErr("");
    if(!gender)           return setErr("Please choose Boy or Girl.");
    if(!avatar)           return setErr("Please pick an avatar.");
    if(!form.name.trim()) return setErr("Please enter your name.");
    const schoolFinal = form.school==="other" ? form.schoolCustom.trim() : form.school;
    if(!form.id.trim())   return setErr("Please choose a Student ID.");
    if(form.id.includes(" ")) return setErr("ID cannot contain spaces.");
    if(allUsers().find(u=>u.id===form.id)) return setErr("This ID is already taken. Choose another.");
    if(form.password.length<6) return setErr("Password must be at least 6 characters.");
    if(form.password!==form.confirm) return setErr("Passwords do not match.");
    const user = { id:form.id, password:form.password, name:form.name.trim(), grade:form.grade, role:"student", gender, avatar, color:COLORS[colorIdx], school:schoolFinal };
    onSignup("student", user);
  }

  return(
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:700,marginBottom:16,padding:0}}>← Back to Login</button>
      <div style={{fontWeight:900,fontSize:20,color:"#0F172A",marginBottom:4}}>Create Student Account 🎒</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Set up your practice profile</div> <div style={{marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:800,color:C.muted,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Step 1 · I am a...</div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>selectGender("boy")} style={{flex:1,background:gender==="boy"?"linear-gradient(135deg,#3B82F6,#2563EB)":"#F1F5F9",border:gender==="boy"?"none":`2px solid ${C.border}`,borderRadius:16,padding:"18px 12px",cursor:"pointer",transition:"all 0.2s",boxShadow:gender==="boy"?"0 6px 18px rgba(59,130,246,0.35)":"none"}}>
            <div style={{fontSize:36,marginBottom:6}}>🦕</div>
            <div style={{fontSize:15,fontWeight:900,color:gender==="boy"?"#fff":"#0F172A"}}>Boy</div>
            <div style={{fontSize:10,color:gender==="boy"?"rgba(255,255,255,0.7)":C.muted,marginTop:2}}>Dinosaur avatars</div>
          </button>
          <button onClick={()=>selectGender("girl")} style={{flex:1,background:gender==="girl"?"linear-gradient(135deg,#EC4899,#A855F7)":"#F1F5F9",border:gender==="girl"?"none":`2px solid ${C.border}`,borderRadius:16,padding:"18px 12px",cursor:"pointer",transition:"all 0.2s",boxShadow:gender==="girl"?"0 6px 18px rgba(236,72,153,0.35)":"none"}}>
            <div style={{fontSize:36,marginBottom:6}}>🦄</div>
            <div style={{fontSize:15,fontWeight:900,color:gender==="girl"?"#fff":"#0F172A"}}>Girl</div>
            <div style={{fontSize:10,color:gender==="girl"?"rgba(255,255,255,0.7)":C.muted,marginTop:2}}>Unicorn avatars</div>
          </button>
        </div>
      </div> {gender&&(
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:800,color:C.muted,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>
            Step 2 · Pick your avatar
          </div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {AVATARS.map((av,i)=>{
              const isSelected = avatar===av;
              const selBg = gender==="boy"?"#DBEAFE":"#FCE7F3";
              const selBorder = gender==="boy"?C.blue:"#EC4899";
              return(
                <button key={i} onClick={()=>setAvatar(av)} style={{flex:1,padding:"10px 4px",borderRadius:14,background:isSelected?selBg:"#F8FAFC",border:isSelected?`2.5px solid ${selBorder}`:"2px solid #E2E8F0",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all 0.15s",boxShadow:isSelected?"0 4px 12px rgba(0,0,0,0.1)":"none"}}>
                  <span style={{fontSize:28}}>{av}</span>
                  <span style={{fontSize:9,fontWeight:700,color:isSelected?selBorder:C.muted}}>{NAMES[i]}</span>
                </button>
              );
            })}
          </div> <div style={{background:COLORS[colorIdx]+"15",border:`1.5px solid ${COLORS[colorIdx]}44`,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
            <div style={{width:56,height:56,borderRadius:16,background:COLORS[colorIdx],display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:`0 4px 14px ${COLORS[colorIdx]}55`,flexShrink:0}}>
              {avatar}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:4}}>Your Profile Card</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {COLORS.map((col,i)=>(
                  <button key={i} onClick={()=>setColorIdx(i)} style={{width:26,height:26,borderRadius:"50%",background:col,border:colorIdx===i?"3px solid #0F172A":"2.5px solid transparent",cursor:"pointer",transition:"all 0.15s",boxShadow:colorIdx===i?`0 2px 8px ${col}66`:"none"}}/>
                ))}
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:5}}>Pick a colour for your profile</div>
            </div>
          </div>
        </div>
      )}

      <InputField label="Full Name" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Mei Lin Tan"/> <div style={{marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:800,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
          🏫 Step 3 · Your School
        </div>
        <div style={{fontSize:12,color:C.muted,marginBottom:10,lineHeight:1.5}}>
          We use your school's past papers to tailor questions to your exam style!
        </div> <SchoolDropdown value={form.school} onChange={v=>f("school",v)}/>

        {form.school==="Other / Not Listed"&&(
          <div style={{marginTop:10}}>
            <InputField label="Type your school name" value={form.schoolCustom} onChange={v=>f("schoolCustom",v)} placeholder="e.g. Rosyth School"/>
          </div>
        )}
        {form.school&&form.school!=="Other / Not Listed"&&<SchoolFeedbackBox school={form.school}/>}
        {form.school==="Other / Not Listed"&&form.schoolCustom&&(
          <div style={{marginTop:8,background:"#F0FDF4",borderRadius:10,padding:"9px 13px",fontSize:12,color:"#065F46",fontWeight:600,lineHeight:1.6}}>
            📚 Got it! We'll use similar school papers as reference for your practice questions.
          </div>
        )}
      </div>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Grade</div>
        <div style={{display:"flex",gap:8}}>
          {GRADES.map(g=>(
            <button key={g} onClick={()=>f("grade",g)} style={{flex:1,background:form.grade===g?C.navy:"#F1F5F9",color:form.grade===g?"#fff":C.muted,border:"none",borderRadius:10,padding:"10px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <InputField label="Student ID (for login)" value={form.id} onChange={v=>f("id",v.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. mei_lin_2026"/>
      <div style={{position:"relative",marginBottom:4}}>
        <InputField label="Password (min 6 chars)" value={form.password} onChange={v=>f("password",v)} type={showPw?"text":"password"} placeholder="Create a password"/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted}}>{showPw?"🙈":"👁️"}</button>
      </div>
      <InputField label="Confirm Password" value={form.confirm} onChange={v=>f("confirm",v)} type="password" placeholder="Re-enter password" onEnter={handleSubmit}/>

      {err&&<ErrorBox msg={err}/>}
      <BigBtn color={C.navy} onClick={handleSubmit}>Create Student Account →</BigBtn>
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
    setLinkMsg("✅ Linked: "+child.name+" ("+child.grade+")");
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

  return(
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:13,fontWeight:700,marginBottom:16,padding:0}}>← Back to Login</button>
      <div style={{fontWeight:900,fontSize:20,color:"#0F172A",marginBottom:4}}>Create Parent Account 👩</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Monitor your child's progress</div>

      <InputField label="Parent Name" value={form.name} onChange={v=>f("name",v)} placeholder="e.g. Mrs Lee"/>
      <InputField label="Parent ID (for login)" value={form.id} onChange={v=>f("id",v.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. mrs_lee_parent"/>
      <div style={{position:"relative",marginBottom:4}}>
        <InputField label="Password (min 6 chars)" value={form.password} onChange={v=>f("password",v)} type={showPw?"text":"password"} placeholder="Create a password"/>
        <button onClick={()=>setShowPw(p=>!p)} style={{position:"absolute",right:12,bottom:14,background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.muted}}>{showPw?"🙈":"👁️"}</button>
      </div>
      <InputField label="Confirm Password" value={form.confirm} onChange={v=>f("confirm",v)} type="password" placeholder="Re-enter password"/> <div style={{background:"#F5F3FF",border:"1.5px solid #DDD6FE",borderRadius:16,padding:"14px",marginBottom:16,marginTop:4}}>
        <div style={{fontWeight:800,fontSize:13,color:"#4C1D95",marginBottom:8}}>🔗 Link Student Accounts</div>
        <div style={{fontSize:12,color:"#6D28D9",marginBottom:10,lineHeight:1.6}}>
          Ask your child to share their Student ID, then add it here. You can add multiple children.
        </div>
        <div style={{display:"flex",gap:8,marginBottom:6}}>
          <input value={childInput} onChange={e=>setChildInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") addChild();}} placeholder="Enter student ID..." style={{flex:1,border:"1.5px solid #DDD6FE",borderRadius:10,padding:"9px 12px",fontSize:13,outline:"none"}}/>
          <button onClick={addChild} style={{background:"#7C3AED",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Add</button>
        </div>
        {linkMsg&&<div style={{fontSize:12,color:linkMsg.startsWith("✅")?C.green:C.red,fontWeight:600,marginBottom:8}}>{linkMsg}</div>}
        {linkedIds.length===0&&<div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>No children linked yet. You can also add them later.</div>}
        {linkedIds.map(cid=>{
          const ch=allUsers().find(u=>u.id===cid);
          if(!ch) return null;
          return(
            <div key={cid} style={{display:"flex",alignItems:"center",gap:8,background:"#fff",borderRadius:10,padding:"8px 12px",marginBottom:6}}>
              <span style={{fontSize:18}}>{ch.avatar||"👤"}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#4C1D95"}}>{ch.name}</div>
                <div style={{fontSize:11,color:C.muted}}>{ch.grade} · ID: {cid}</div>
              </div>
              <button onClick={()=>removeChild(cid)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:16}}>×</button>
            </div>
          );
        })}
      </div>

      {err&&<ErrorBox msg={err}/>}
      <BigBtn color="#7C3AED" onClick={handleSubmit}>Create Parent Account →</BigBtn>
    </div>
  );
}

function StudentApp({user, onLogout, getProgress, setProgress}){
  const [enLevel,setEnLevel]=React.useState(null);
  const [grade,           setGrade]           = useState(user.grade||"P3");
  const [subject,         setSubject]         = useState("English");
  const [subjectSelected, setSubjectSelected] = useState(false);
  const [screen,          setScreen]          = useState("home");
  const [sessionResult,   setSessionResult]   = useState(null);
  const [inSession,       setInSession]       = useState(false);
  const [studentToast,    setStudentToast]    = useState(null);

  const prog = getProgress(grade, subject);
  const isLive = !!LIVE_CONTENT[`${grade}_${subject}`];

  const isMockDue = prog.nextSession > 1 && (prog.nextSession - 1) % 10 === 0;

  function startSession(){ setInSession(true); }

  function handleSessionDone(results){
    const sessionNum = prog.nextSession;
    const isMock = isMockDue;
    const scores = {};
    SECTION_ORDER.forEach(type=>{
      const items=results.filter(r=>r.sectionType===type);
      if(items.length) scores[type]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=results.length?Math.round(results.filter(r=>r.correct).length/results.length*100):0;
    const isPastPaper = sessionNum >= 11;
    const paperInfo = isPastPaper ? selectPastPaper(user.school) : null;
    const newEntry={ sessionNum, date:todayStr(), scores, totalPct,
      mistakes: results.filter(r=>!r.correct).map(r=>({...r})),
      isMockExam: isMock||isPastPaper,
      school: isMock?"Nanyang Primary": isPastPaper?(paperInfo?.label||"Past Paper"):undefined,
      examType: isMock?"WA1": isPastPaper?"Past Paper #"+(sessionNum-10):undefined };
    const newMistakes=[...(prog.mistakes||[]),...results.filter(r=>!r.correct).map(r=>({...r,date:todayStr()}))];
    const allLookedUp = [...new Set(results.flatMap(r=>r.lookedUpWords||[]))];
    const wrongWords  = [...new Set(results.filter(r=>!r.correct).flatMap(r=>{
      const sentence=r.sentence||"";
      return sentence.split(/\s+/).map(w=>w.replace(/[.,!?'"]/g,"").toLowerCase()).filter(w=>WORD_DICT[w]);
    }))];
    const vocabWords  = [...new Set([...allLookedUp,...wrongWords])];
    const prevVocab   = prog.vocabBook||[];
    const newVocab    = [...prevVocab];
    vocabWords.forEach(w=>{ if(!newVocab.find(v=>v.word===w)) newVocab.push({word:w,def:WORD_DICT[w]||"",addedDate:todayStr(),fromMistake:wrongWords.includes(w)}); });
    setProgress(grade, subject, { ...prog, history:[...prog.history, newEntry], mistakes:newMistakes, nextSession:sessionNum+1, vocabBook:newVocab });
    setSessionResult({results, sessionNum, isMock});
    setInSession(false);
    setScreen("result");
  }

  if(inSession) return(
    <Wrap>
      <SessionScreen
        plan={buildPlan(prog.settings, user.school, prog.nextSession, enLevel||recommendLevel(prog.history))}
        isMockExam={isMockDue}
        mockInfo={isMockDue?MOCK_EXAMS[0]:null}
        onFinish={handleSessionDone}
        onBack={()=>setInSession(false)}
      />
    </Wrap>
  );

  if(subjectSelected && subject==="Chinese" && isLive) return(
    <ChineseApp
      user={user}
      getProgress={(g,s)=>getProgress(user.id,g,s)}
      setProgress={(g,s,d)=>setProgress(user.id,g,s,d)}
      onBack={()=>setSubjectSelected(false)}
    />
  );


  if(!subjectSelected) return(
    <Wrap>
      <SubjectSelectScreen user={user} grade={grade} onLogout={onLogout}
        onSelect={(sub)=>{ setSubject(sub); setSubjectSelected(true); }}
        onGradeChange={(g)=>{ setGrade(g); setSubjectSelected(false); }}
      />
    </Wrap>
  );

  if(screen==="result"&&sessionResult) return(
    <Wrap>
      <StudentResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        isMock={sessionResult.isMock}
        onHome={()=>setScreen("home")}
        onNextSession={()=>{ setInSession(true); setScreen("home"); }}
      />
    </Wrap>
  );

  return(
    <Wrap> <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",padding:"18px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:12,background:user.color||C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{user.avatar||"🎒"}</div>
            <div>
              <div style={{color:"rgba(255,255,255,0.65)",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Genius Project</div>
              <div style={{color:"#fff",fontSize:15,fontWeight:800}}>{user.name}</div>
              {user.school&&<div style={{color:"rgba(255,255,255,0.55)",fontSize:10,marginTop:1}}>🏫 {user.school}</div>}
            </div>
          </div>
          <button onClick={onLogout} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"6px 12px",color:"rgba(255,255,255,0.8)",cursor:"pointer",fontSize:12,fontWeight:700}}>Logout</button>
        </div> <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto"}}>
          {GRADES.map(g=>(
            <button key={g} onClick={()=>{setGrade(g);setScreen("home");}} style={{background:grade===g?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.12)",border:"none",borderRadius:10,padding:"6px 14px",color:grade===g?"#0F172A":"rgba(255,255,255,0.7)",fontSize:13,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all 0.2s"}}>
              {g}
            </button>
          ))}
        </div> <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.12)"}}>
          {Object.entries(SUBJECTS).map(([key,sub])=>{
            const live=!!LIVE_CONTENT[`${grade}_${key}`];
            return(
              <button key={key} onClick={()=>{ setSubject(key); setScreen("home"); if(!live) setStudentToast("Coming Soon: 준비 중인 과목입니다"); else setStudentToast(null); }} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"10px 4px 10px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <span style={{fontSize:16}}>{sub.icon}</span>
                <span style={{fontSize:9,fontWeight:subject===key?800:500,color:subject===key?"#fff":"rgba(255,255,255,0.45)",whiteSpace:"nowrap"}}>{key}</span>
                {!live&&<span style={{fontSize:7,color:"rgba(255,255,255,0.5)",fontWeight:700}}>Coming Soon</span>}
              </button>
            );
          })}
        </div>
      </div> {!isLive ? (
        <ComingSoonScreen grade={grade} subject={subject}/>
      ) : screen==="home" ? (
        <><div style={{padding:"14px 16px 0"}}><LevelPicker value={enLevel} onChange={setEnLevel} recommended={recommendLevel(prog.history)}/></div>
      <StudentHome user={user} prog={prog} grade={grade} subject={subject} isMockDue={isMockDue} onStart={startSession} onMistakes={()=>setScreen("mistakes")} onReview={()=>setScreen("review")}/></>
      ) : screen==="mistakes" ? (
        <MistakesTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}/>
      ) : screen==="review" ? (
        <ReviewTab mistakes={prog.mistakes||[]} onBack={()=>setScreen("home")}/>
      ) : null}

      {studentToast&&<ComingSoonToast message={studentToast} onDone={()=>setStudentToast(null)}/>}
      <StudentBottomNav screen={screen} setScreen={setScreen} mistakeCount={(prog.mistakes||[]).filter(m=>m.date===todayStr()).length}/>
    </Wrap>
  );
}


// ── Level-aware question picker (easy/medium/hard sets) ──────
const LEVEL_MAP = { easy:"foundation", medium:"core", hard:"stretch" };
function pickByLevel(pool, level, seed, n){
  let candidates = pool;
  const want = LEVEL_MAP[level];
  if(want){
    const f = pool.filter(q=>(q.difficulty||"core")===want);
    if(f.length >= Math.min(n, 3)) candidates = f;
  }
  const sh = seededShuffle(candidates, (seed||1)*7919 + (want?want.length:0));
  const out=[]; for(let i=0;i<n;i++) out.push(sh[i%sh.length]);
  return out;
}
function recommendLevel(history){
  const last=(history||[]).filter(h=>!h.isMockExam).slice(-1)[0];
  if(!last) return "medium";
  const p=last.totalPct||0;
  return p<60?"easy": p<=75?"medium":"hard";
}

function selectPastPaper(schoolName) {
  const paper = pickEnglishPaper({ schoolName, sessionNum: 11, isPastPaper: true });
  return englishPaperToLegacyInfo(paper);
}

function buildPastPaperPlan(settings, schoolName, sessionNum) {
  const paper = pickEnglishPaper({ schoolName, sessionNum: sessionNum||11, isPastPaper: true });
  return englishPaperToPlan(paper, settings, "medium", sessionNum, schoolName, pickByLevel, pickQuestionsForSchool);
}

function buildPlan(settings, schoolName, sessionNum, level){
  const isPast = level==="pastpaper" || (sessionNum && sessionNum >= 11 && !LEVEL_MAP[level]);
  const paper = pickEnglishPaper({ schoolName, sessionNum: sessionNum||1, isPastPaper: isPast });
  return englishPaperToPlan(paper, settings, level, sessionNum, schoolName, pickByLevel, pickQuestionsForSchool);
}

function ComingSoonScreen({grade,subject}){
  const sub=SUBJECTS[subject];
  return(
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 24px",textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:16}}>{sub.icon}</div>
      <div style={{fontSize:20,fontWeight:900,color:"#0F172A",marginBottom:8}}>{grade} {sub.label}</div>
      <div style={{fontSize:14,color:C.muted,lineHeight:1.7,marginBottom:24}}>
        This subject is coming soon!<br/>We're working hard to bring you{"\n"}high-quality practice questions for {grade} {sub.label}.
      </div>
      <div style={{background:C.lBlue,borderRadius:14,padding:"12px 20px",fontSize:13,color:"#1D4ED8",fontWeight:600}}>
        ✅ Currently available: P3 English & Chinese
      </div>
    </div>
  );
}

function StudentHome({user, prog, grade, subject, isMockDue, onStart, onMistakes, onReview}){
  const history = prog.history||[];
  const regularH = history.filter(h=>!h.isMockExam);
  const mockH    = history.filter(h=>h.isMockExam);
  const avgTotal = regularH.length ? Math.round(regularH.reduce((s,h)=>s+h.totalPct,0)/regularH.length):0;
  const [graphMode,    setGraphMode]    = useState("total");
  const [showProgress, setShowProgress] = useState(false);
  const [showRecent,   setShowRecent]   = useState(false);

  const sectionAvgs={};
  SECTION_ORDER.forEach(type=>{
    const vals=regularH.map(h=>h.scores[type]).filter(v=>v!=null);
    sectionAvgs[type]=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
  });

  return(
    <div style={{paddingBottom:80}}> {user.school&&<SchoolBanner school={user.school}/>} <div style={{background:"#fff",padding:"14px 16px 0",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",gap:10,paddingBottom:14}}>
          {[{icon:"📋",l:"Sessions",v:history.length},{icon:"🎯",l:"Avg",v:avgTotal?`${avgTotal}%`:"—"},{icon:"🏫",l:"Mock",v:mockH.length},{icon:"📅",l:"Next",v:`#${prog.nextSession}`}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#F8FAFC",borderRadius:12,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:16}}>{s.icon}</div>
              <div style={{fontSize:15,fontWeight:900,color:C.navy}}>{s.v}</div>
              <div style={{fontSize:9,color:C.muted,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"16px 16px 0"}}> {prog.nextSession>=11&&(
          <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(15,23,42,0.35)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}>📄</span>
              <div>
                <div style={{color:"#fff",fontSize:14,fontWeight:900}}>Past Paper #{prog.nextSession-10} Unlocked!</div>
                <div style={{color:"rgba(255,255,255,0.75)",fontSize:12,marginTop:1}}>{user.school ? user.school+" style" : "School paper style"} · Real exam questions</div>
              </div>
            </div>
          </div>
        )}
        {isMockDue&&prog.nextSession<11&&(
          <div style={{background:"linear-gradient(135deg,#7C3AED,#8B5CF6)",borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(124,58,237,0.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}>🏫</span>
              <div>
                <div style={{color:"#fff",fontSize:14,fontWeight:900}}>Mock Exam Unlocked!</div>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,marginTop:1}}>10 sessions complete — real school paper test awaits</div>
              </div>
            </div>
          </div>
        )} <button onClick={onStart} style={{width:"100%",background:"linear-gradient(135deg,#0F172A,#1E3A6E)",color:"#fff",border:"none",borderRadius:18,padding:"0",marginBottom:16,cursor:"pointer",boxShadow:"0 8px 28px rgba(15,23,42,0.3)",overflow:"hidden",textAlign:"left"}}>
          <div style={{padding:"18px 20px"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>
              {grade} {subject} · {prog.nextSession>=11?"Past Paper #"+(prog.nextSession-10):isMockDue?"Mock Exam":"Session #"+prog.nextSession}
            </div>
            <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4}}>
              {prog.nextSession>=11?"🏫 Start Past Paper →":isMockDue?"🏫 Start Mock Exam →":"▶ Start Practice for Today →"}
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>{prog.nextSession>=11?"📄 Real school past paper · ~35 min":isMockDue?"Nanyang Primary WA1 style · ~30 min":"Grammar · Vocabulary · Comprehension · ~35 min"+(user.school?" · "+user.school+" style":"")}</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.06)",padding:"8px 20px",display:"flex",gap:12}}>
            {Object.entries(SECTIONS).map(([k,v])=>(
              <div key={k} style={{display:"flex",alignItems:"center",gap:4}}>
                <span style={{fontSize:13}}>{v.icon}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.5)",fontWeight:600}}>{k.replace("MCQ","").replace("Cloze","Cl.")}</span>
              </div>
            ))}
          </div>
        </button> {regularH.length>0&&(
          <div style={{background:"#fff",borderRadius:18,marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <button onClick={()=>setShowProgress(p=>!p)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:14,color:C.text}}>📊 My Progress</div>
              <span style={{color:C.muted,fontSize:13,transform:showProgress?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
            </button>
          {showProgress&&<div style={{padding:"0 16px 16px"}}>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
              <div style={{display:"flex",gap:5}}>
                {["total","section"].map(g=>(
                  <button key={g} onClick={()=>setGraphMode(g)} style={{background:graphMode===g?C.navy:"#F1F5F9",color:graphMode===g?"#fff":C.muted,border:"none",borderRadius:7,padding:"4px 9px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
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
                        <div style={{fontSize:8,color:col,fontWeight:800}}>{h.totalPct}%</div>
                        <div style={{width:"100%",background:col,borderRadius:"3px 3px 0 0",height:`${Math.max(h.totalPct*0.65,4)}%`,minHeight:4,position:"relative"}}>
                          {h.isMockExam&&<span style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",fontSize:8}}>🏫</span>}
                        </div>
                        <div style={{fontSize:7,color:C.muted}}>{`S${h.sessionNum}`}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{display:"flex",gap:10,fontSize:9,color:C.muted}}>
                  {[[C.green,"≥85%"],[C.amber,"70–84%"],[C.red,"<70%"],["#7C3AED","Mock"]].map(([c,l])=>(
                    <span key={l} style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:7,height:7,borderRadius:2,background:c}}/>{l}</span>
                  ))}
                </div>
              </div>
            ):(
              <div>
                {SECTION_ORDER.map(type=>{
                  const meta=SECTIONS[type]; const avg=sectionAvgs[type]; if(!avg) return null;
                  const col=avg>=85?C.green:avg>=70?C.amber:C.red;
                  return(
                    <div key={type} style={{marginBottom:9}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:11,fontWeight:700}}>{meta.icon} {meta.label}</span>
                        <span style={{fontSize:11,fontWeight:800,color:col}}>{avg}%</span>
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
              <div style={{fontWeight:800,fontSize:13,color:C.text}}>📋 Recent Sessions ({history.length})</div>
              <span style={{color:C.muted,fontSize:13,transform:showRecent?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
            </button>
          {showRecent&&<div style={{padding:"0 14px 14px"}}>
            {[...history].reverse().slice(0,5).map((h,i)=>{
              const col=h.totalPct>=85?C.green:h.totalPct>=70?C.amber:C.red;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:h.isMockExam?"#EDE9FE":col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                    {h.isMockExam?"🏫":"📝"}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text}}>{h.isMockExam?`Mock: ${h.school||""} ${h.examType||""}`:`Session #${h.sessionNum}`}</div>
                    <div style={{fontSize:10,color:C.muted}}>{h.date}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:16,fontWeight:900,color:col}}>{h.totalPct}%</div>
                    <div style={{fontSize:9,color:col}}>{h.totalPct>=85?"Excellent":h.totalPct>=70?"Good":"Keep Going"}</div>
                  </div>
                </div>
              );
            })}
          </div>}
          </div>
        )} <div style={{display:"flex",gap:10}}>
          <button onClick={onMistakes} style={{flex:1,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:14,padding:"12px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <span style={{fontSize:22}}>📅</span>
            <span style={{fontSize:11,fontWeight:700,color:C.text}}>Mistakes</span>
          </button>
          <button onClick={onReview} style={{flex:1,background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:14,padding:"12px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
            <span style={{fontSize:22}}>🔁</span>
            <span style={{fontSize:11,fontWeight:700,color:C.text}}>Review</span>
          </button>
        </div>
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

function AdminApp({user, onLogout}){
  const [tab, setTab] = useState("overview");
  const users = allUsers();
  const students = users.filter(u=>u.role==="student");
  const parents  = users.filter(u=>u.role==="parent");
  const T = {fontSize:12,padding:"7px 12px",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer"};
  const tabs = ["overview","students","accounts"];
  return(
    <Wrap>
      <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"16px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#fff",fontWeight:900,fontSize:15}}>🛡️ Admin Dashboard</div>
          <button onClick={onLogout} style={{...T,background:"rgba(255,255,255,.15)",color:"#fff",fontSize:11}}>Logout</button>
        </div>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{...T,background:tab===t?"#fff":"rgba(255,255,255,.15)",color:tab===t?"#1E3A6E":"#fff",fontSize:11,textTransform:"capitalize"}}>{t}</button>)}
        </div>
      </div>
      <div style={{padding:16}}>
        {tab==="overview"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              {[["👥","Total Users",users.length],["🎒","Students",students.length],["👩","Parents",parents.length]].map(([ic,lb,v],i)=>(
                <div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:22}}>{ic}</div>
                  <div style={{fontSize:18,fontWeight:900,color:"#1E3A6E"}}>{v}</div>
                  <div style={{fontSize:10,color:"#64748B"}}>{lb}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
              <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>Recent Students</div>
              {students.slice(0,8).map((s,i)=>{
                const prog = getProgress(s.id,"P3","English");
                const pct = prog.history?.length ? Math.round(prog.history.reduce((a,h)=>a+h.totalPct,0)/prog.history.length) : null;
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<7?"1px solid #F1F5F9":"none"}}>
                    <div style={{width:32,height:32,borderRadius:9,background:s.color||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{s.avatar||"🎒"}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700}}>{s.name}</div>
                      <div style={{fontSize:10,color:"#64748B"}}>{s.school||"—"} · {s.grade}</div>
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:pct>=70?"#10B981":pct?"#F59E0B":"#94A3B8"}}>{pct!=null?pct+"%":"—"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab==="students"&&(
          <div style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>All Students ({students.length})</div>
            {students.map((s,i)=>{
              const prog = getProgress(s.id,"P3","English");
              const sessions = prog.history?.length||0;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<students.length-1?"1px solid #F1F5F9":"none"}}>
                  <div style={{width:30,height:30,borderRadius:8,background:s.color||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{s.avatar||"🎒"}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700}}>{s.name} <span style={{color:"#94A3B8",fontWeight:400}}>({s.id})</span></div>
                    <div style={{fontSize:10,color:"#64748B"}}>{s.grade} · {sessions} sessions · {s.school||"—"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab==="accounts"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[["🎒 Students",students,"#1E3A6E"],["👩 Parents",parents,"#059669"],["🛡️ Admins",users.filter(u=>u.role==="admin"),"#7C3AED"]].map(([title,list,color],gi)=>(
              <div key={gi} style={{background:"#fff",borderRadius:14,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                <div style={{fontWeight:800,fontSize:13,color,marginBottom:8}}>{title} ({list.length})</div>
                {list.map((u,i)=>(
                  <div key={i} style={{fontSize:12,padding:"4px 0",borderBottom:i<list.length-1?"1px solid #F8FAFC":"none",color:"#0F172A"}}>
                    {u.name} · <span style={{color:"#64748B"}}>{u.id}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrap>
  );
}

function ParentApp({user, linkedStudents, onLogout, getProgress, setProgress, refresh}){
  const [selectedId, setSelectedId] = useState(linkedStudents[0]?.id||null);
  const [grade,   setGrade]   = useState("P3");
  const [subject, setSubject] = useState("English");
  const [tab,     setTab]     = useState("overview");

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

function ParentMistakesTab({child, history, grade, subject}){
  const [filterSession, setFilterSession] = React.useState("all");
  const [expanded, setExpanded] = React.useState(null);

  // Gather all mistakes from history sessions
  const allMistakes = [];
  (history||[]).forEach(h=>{
    (h.mistakes||[]).forEach(m=>{
      allMistakes.push({...m, sessionNum:h.sessionNum, sessionDate:h.date});
    });
  });

  // Also pull from prog.mistakes (the running list)
  const sessions = [...new Set(allMistakes.map(m=>m.sessionNum))].sort((a,b)=>b-a);
  const filtered = filterSession==="all" ? allMistakes
    : allMistakes.filter(m=>m.sessionNum===Number(filterSession));

  // Group by topic
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
      {/* Intro card for parents */}
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
          {/* Session filter */}
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

          {/* Topic summary */}
          <div style={{background:"#fff",borderRadius:14,padding:"12px 14px",marginBottom:14,
            boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
            <div style={{fontSize:11,fontWeight:800,color:"#64748B",marginBottom:8,
              textTransform:"uppercase",letterSpacing:.6}}>Mistakes by Topic</div>
            {Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length).map(([topic,items])=>(
              <div key={topic} style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",padding:"4px 0"}}>
                <span style={{fontSize:12,fontWeight:700,color:"#334155"}}>{topic}</span>
                <span style={{fontSize:12,fontWeight:800,color:"#DC2626"}}>
                  {items.length} wrong
                </span>
              </div>
            ))}
          </div>

          {/* Individual mistakes */}
          {filtered.map((m,i)=>{
            const isOpen = expanded===i;
            return(
              <div key={i} style={{background:"#fff",borderRadius:14,marginBottom:10,
                boxShadow:"0 2px 8px rgba(0,0,0,.05)",overflow:"hidden",
                border:"1.5px solid "+(isOpen?"#EF4444":"#E2E8F0")}}>
                <button onClick={()=>setExpanded(isOpen?null:i)}
                  style={{width:"100%",background:"none",border:"none",cursor:"pointer",
                    padding:"12px 14px",textAlign:"left",display:"flex",
                    alignItems:"center",gap:10}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#0F172A",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {m.q||m.sentence||m.id}
                    </div>
                    <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
                      <span style={{background:"#FEE2E2",color:"#991B1B",fontSize:10,
                        fontWeight:700,padding:"2px 7px",borderRadius:6}}>
                        {m.topic||m.sectionType}
                      </span>
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
        </>
      )}
    </div>
  );
}

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
                const byDiff = {foundation:0,core:0,stretch:0,total:0};
                const byDiffCorrect = {foundation:0,core:0,stretch:0};
                (history||[]).forEach(h=>{
                  // Count from history session scores (approximate)
                });
                // Show from mistakes - what difficulty are the wrong answers
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


// ── Vocab Quiz — wrong words with meanings/syn/ant, quiz mode ─
function buildVocabEntries(mistakes){
  const seen=new Set(); const out=[];
  (mistakes||[]).forEach(m=>{
    const word = m.correctAnswer!==undefined && m.options ? m.options[m.correctAnswer]
               : (typeof m.correctAnswer==="string" ? m.correctAnswer : null);
    if(!word) return;
    const clean=String(word).replace(/[.,!?'"]/g,"");
    if(seen.has(clean)) return;
    const isZh=/[\u4e00-\u9fff]/.test(clean);
    if(isZh){
      const info=ZH_CHAR_DICT[clean]||{};
      const meaning=info.meaning||(m.meaning?String(m.meaning).replace(/^[^=]*=\s*/,""):null);
      if(!meaning) return;
      seen.add(clean);
      out.push({word:clean,lang:"zh",meaning,pinyin:info.pinyin||m.pinyin||null,
        syn:info.syn||null,ant:info.ant||null,verified:!!info.meaning});
    } else {
      const key=clean.toLowerCase();
      const def=WORD_DICT[key]; if(!def) return;
      const sa=SYN_ANT[key]||{};
      seen.add(clean);
      out.push({word:clean,lang:"en",meaning:def,pinyin:null,
        syn:sa.syn?sa.syn.join(", "):null,ant:sa.ant?sa.ant.join(", "):null,verified:true});
    }
  });
  return out;
}

function VocabQuizTab({mistakes}){
  const entries = React.useMemo(()=>buildVocabEntries(mistakes),[mistakes]);
  const [order,setOrder]   = React.useState(()=>seededShuffle(entries.map((_,i)=>i),Date.now()%100000));
  const [idx,setIdx]       = React.useState(0);
  const [picked,setPicked] = React.useState(null);
  const [score,setScore]   = React.useState({right:0,wrong:0});
  const [done,setDone]     = React.useState(false);

  if(entries.length<2) return(
    <div style={{textAlign:"center",padding:"50px 20px",color:"#64748B"}}>
      <div style={{fontSize:44,marginBottom:12}}>📚</div>
      <div style={{fontSize:14,fontWeight:800,color:"#0F172A",marginBottom:6}}>Not enough words yet</div>
      <div style={{fontSize:12}}>Wrong vocabulary words from English & Chinese will collect here for quizzing.</div>
    </div>
  );

  const cur = entries[order[idx]||0];
  // 4 meaning options
  const opts = React.useMemo(()=>{
    const others=seededShuffle(entries.filter(e=>e.word!==cur.word),idx*31+7).slice(0,3);
    return seededShuffle([cur,...others],idx*13+3);
  },[idx,entries,cur]);

  function pick(i){
    if(picked!==null) return;
    setPicked(i);
    const ok = opts[i].word===cur.word;
    setScore(s=>({right:s.right+(ok?1:0),wrong:s.wrong+(ok?0:1)}));
    if(ok) SFX.correct(); else SFX.wrong();
  }
  function next(){
    if(idx+1>=order.length){ setDone(true); return; }
    setIdx(i=>i+1); setPicked(null);
  }

  if(done) return(
    <div style={{textAlign:"center",padding:"40px 20px"}}>
      <div style={{fontSize:44}}>🏆</div>
      <div style={{fontSize:18,fontWeight:900,color:"#0F172A",margin:"10px 0 4px"}}>
        {score.right} / {score.right+score.wrong} correct
      </div>
      <div style={{fontSize:12,color:"#64748B",marginBottom:16}}>
        👨‍👧 Parents: ask your child to say each word's meaning out loud, then retry!
      </div>
      <button onClick={()=>{setOrder(seededShuffle(entries.map((_,i)=>i),Date.now()%100000));
          setIdx(0);setPicked(null);setScore({right:0,wrong:0});setDone(false);}}
        style={{background:"#0F172A",color:"#fff",border:"none",borderRadius:12,
          padding:"12px 28px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
        🔁 Quiz Again (reshuffled)
      </button>
    </div>
  );

  return(
    <div style={{padding:"4px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:12,fontWeight:700,color:"#64748B"}}>Word {idx+1} / {order.length}</span>
        <span style={{fontSize:12,fontWeight:800}}>
          <span style={{color:"#10B981"}}>✓{score.right}</span>{" "}
          <span style={{color:"#EF4444"}}>✗{score.wrong}</span>
        </span>
      </div>

      {/* Word card */}
      <div style={{background:"#fff",borderRadius:16,padding:"20px 16px",marginBottom:12,
        boxShadow:"0 2px 10px rgba(0,0,0,.07)",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{fontSize:cur.lang==="zh"?34:24,fontWeight:900,color:"#0F172A"}}>{cur.word}</span>
          <SpeakBtn text={cur.word} lang={cur.lang}/>
        </div>
        {cur.pinyin&&<div style={{fontSize:13,color:"#2563EB",fontWeight:700,marginTop:4}}>{cur.pinyin}</div>}
        {!cur.verified&&<div style={{fontSize:10,color:"#92400E",marginTop:4}}>⚠️ 请家长确认</div>}
        <div style={{fontSize:12,color:"#64748B",marginTop:8}}>What does this word mean?</div>
      </div>

      {/* Meaning options */}
      {opts.map((o,i)=>{
        const isAns=o.word===cur.word;
        let bg="#fff",border="#E2E8F0";
        if(picked!==null){
          if(isAns){bg="#D1FAE5";border="#10B981";}
          else if(i===picked){bg="#FEE2E2";border="#EF4444";}
        }
        return(
          <div key={i} onClick={()=>pick(i)}
            style={{background:bg,border:"2px solid "+border,borderRadius:12,
              padding:"12px 14px",marginBottom:8,cursor:picked===null?"pointer":"default",
              fontSize:13,fontWeight:600,color:"#0F172A"}}>
            {o.meaning}
          </div>
        );
      })}

      {/* After pick: syn/ant reinforcement */}
      {picked!==null&&(
        <div className="gm-slideUp" style={{background:"#F8FAFC",border:"1.5px solid #CBD5E1",
          borderRadius:12,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:800,color:"#0F172A",marginBottom:4}}>
            {cur.word} = {cur.meaning}
          </div>
          {cur.syn&&<div style={{fontSize:11,color:"#0D9488",fontWeight:700}}>= same: {cur.syn}</div>}
          {cur.ant&&<div style={{fontSize:11,color:"#DC2626",fontWeight:700}}>≠ opposite: {cur.ant}</div>}
        </div>
      )}

      {picked!==null&&(
        <button onClick={next} style={{width:"100%",background:"#0F172A",color:"#fff",
          border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:800,cursor:"pointer"}}>
          {idx+1>=order.length?"Finish →":"Next Word →"}
        </button>
      )}
    </div>
  );
}

function MistakesTab({mistakes, onBack, vocabBook=[]}){
  const [filter, setFilter] = React.useState("all");
  const [view, setView]     = React.useState("list"); // list | quiz
  const [expanded, setExpanded] = React.useState(null);

  const today = todayStr();
  const filtered = filter==="today"
    ? mistakes.filter(m=>m.date===today)
    : filter==="week"
    ? mistakes.filter(m=>{ const d=new Date(m.date); const n=new Date(today); return (n-d)<7*86400000; })
    : mistakes;

  // Group by topic
  const byTopic = {};
  filtered.forEach(m=>{
    const key = m.topic||m.sectionType||"Other";
    if(!byTopic[key]) byTopic[key] = [];
    byTopic[key].push(m);
  });

  const topicColors = {
    "Numbers":"#3B82F6","Addition":"#10B981","Subtraction":"#F59E0B",
    "Multiplication":"#7C3AED","Division":"#F97316","Money":"#0D9488",
    "Measurement":"#EF4444","Fractions":"#EC4899","Patterns":"#6366F1",
    "Word Problem":"#0891B2","Grammar":"#3B82F6","Vocabulary":"#8B5CF6",
    "BianZi":"#EF4444","CiYu":"#F97316","Other":"#64748B",
  };

  return(
    <div style={{fontFamily:"Nunito,sans-serif",paddingBottom:80}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#7C2D12,#DC2626)",padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:12,
          fontWeight:700,marginBottom:10}}>← Back</button>
        <div style={{color:"#fff",fontSize:18,fontWeight:900}}>❌ Mistakes Log</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>
          {filtered.length} wrong answer{filtered.length!==1?"s":""}
          {mistakes.length>0&&` · ${Math.round((1-filtered.length/Math.max(mistakes.length,1))*100)}% accuracy`}
        </div>
      </div>

      {/* Sub-tabs: mistakes list / vocab quiz */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2E8F0"}}>
        {[["list","❌ Mistakes"],["quiz","📚 Vocab Quiz"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"12px 8px",
              fontSize:13,fontWeight:view===v?800:500,color:view===v?"#7C2D12":"#64748B",
              borderBottom:view===v?"2.5px solid #DC2626":"2.5px solid transparent"}}>{l}</button>
        ))}
      </div>
      {view==="quiz"&&<div style={{padding:"12px 16px"}}><VocabQuizTab mistakes={mistakes}/></div>}
      {view==="list"&&<>
      {/* Filter pills */}
      <div style={{display:"flex",gap:8,padding:"12px 16px",background:"#fff",
        borderBottom:"1px solid #E2E8F0"}}>
        {[["all","All"],["today","Today"],["week","This Week"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{background:filter===v?"#DC2626":"#F1F5F9",color:filter===v?"#fff":"#64748B",
              border:"none",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
            {l}
          </button>
        ))}
      </div>

      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"60px 24px",color:"#64748B"}}>
          <div style={{fontSize:48,marginBottom:12}}>🎉</div>
          <div style={{fontSize:16,fontWeight:800,color:"#0F172A",marginBottom:6}}>
            No mistakes {filter==="today"?"today":filter==="week"?"this week":"yet"}!
          </div>
          <div style={{fontSize:13}}>Keep up the great work!</div>
        </div>
      ):(
        <div style={{padding:"12px 16px"}}>
          {/* Topic summary bar */}
          <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:14,
            boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:11,fontWeight:800,color:"#64748B",marginBottom:10,
              textTransform:"uppercase",letterSpacing:.8}}>Weak Topics</div>
            {Object.entries(byTopic).sort((a,b)=>b[1].length-a[1].length).map(([topic,items])=>{
              const col = topicColors[topic]||"#64748B";
              const pct = Math.round(items.length/filtered.length*100);
              return(
                <div key={topic} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:700,color:col}}>{topic}</span>
                    <span style={{fontSize:11,color:"#64748B"}}>{items.length} mistake{items.length>1?"s":""}</span>
                  </div>
                  <div style={{background:"#F1F5F9",borderRadius:6,height:6}}>
                    <div style={{background:col,borderRadius:6,height:6,width:pct+"%",transition:"width .4s"}}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mistake list */}
          {filtered.slice().reverse().map((m,i)=>{
            const col = topicColors[m.topic||m.sectionType]||"#64748B";
            const isOpen = expanded===i;
            return(
              <div key={i} style={{background:"#fff",borderRadius:16,marginBottom:10,
                boxShadow:"0 2px 8px rgba(0,0,0,.06)",overflow:"hidden",
                border:"1.5px solid "+(isOpen?"#EF4444":"#E2E8F0")}}>
                <button onClick={()=>setExpanded(isOpen?null:i)}
                  style={{width:"100%",background:"none",border:"none",cursor:"pointer",
                    padding:"13px 16px",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:32,height:32,borderRadius:9,background:col+"18",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                    {m.sectionType==="MCQ"?"📊":m.sectionType==="ShortAnswer"?"✏️":
                     m.sectionType==="ProblemSum"?"📝":"🀄"}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#0F172A",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {m.q||m.id||"Question"}
                    </div>
                    <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
                      <span style={{background:col+"18",color:col,fontSize:10,fontWeight:700,
                        padding:"2px 7px",borderRadius:7}}>{m.topic||m.sectionType}</span>
                      <span style={{fontSize:10,color:"#94A3B8"}}>{m.date}</span>
                      {m.solvedAfterHint&&(
                        <span style={{background:"#FEF3C7",color:"#92400E",fontSize:10,fontWeight:700,
                          padding:"2px 7px",borderRadius:7}}>
                          💡 Solved on try {m.attempts||2}
                        </span>
                      )}
                      {!m.solvedAfterHint&&m.attempts===0&&(
                        <span style={{background:"#FEE2E2",color:"#991B1B",fontSize:10,fontWeight:700,
                          padding:"2px 7px",borderRadius:7}}>
                          ❌ Not solved
                        </span>
                      )}
                    </div>
                  </div>
                  <span style={{color:"#94A3B8",fontSize:16,
                    transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
                </button>

                {isOpen&&(
                  <div style={{padding:"0 16px 16px"}}>
                    {/* Question text */}
                    {m.q&&(
                      <div style={{background:"#F8FAFC",borderRadius:12,padding:"12px 14px",
                        marginBottom:10,fontSize:13,fontWeight:600,color:"#0F172A",lineHeight:1.7}}>
                        {m.q}
                      </div>
                    )}

                    {/* Your answer vs correct */}
                    <div style={{display:"flex",gap:8,marginBottom:10}}>
                      <div style={{flex:1,background:"#FEE2E2",borderRadius:10,padding:"9px 12px"}}>
                        <div style={{fontSize:10,fontWeight:700,color:"#991B1B",marginBottom:3}}>YOUR ANSWER</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#7F1D1D"}}>
                          {m.yourAnswer||"—"}
                        </div>
                      </div>
                      <div style={{flex:1,background:"#D1FAE5",borderRadius:10,padding:"9px 12px"}}>
                        <div style={{fontSize:10,fontWeight:700,color:"#065F46",marginBottom:3}}>CORRECT</div>
                        <div style={{fontSize:13,fontWeight:700,color:"#064E3B"}}>
                          {m.correctAnswer||m.answer||"—"}
                        </div>
                      </div>
                    </div>

                    {/* Solution if available */}
                    {m.solution&&(
                      <div style={{background:"#F0FDF4",border:"1.5px solid #10B981",
                        borderRadius:14,padding:"12px 14px"}}>
                        <div style={{fontSize:11,fontWeight:800,color:"#065F46",marginBottom:8,
                          textTransform:"uppercase",letterSpacing:.8}}>
                          📐 How to solve: {m.solution.method}
                        </div>
                        {(m.solution.steps||[]).slice(0,4).map((step,si)=>(
                          <div key={si} style={{display:"flex",gap:8,marginBottom:4,alignItems:"flex-start"}}>
                            <span style={{background:"#10B981",color:"#fff",borderRadius:"50%",
                              minWidth:18,height:18,fontSize:10,fontWeight:800,display:"flex",
                              alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                              {si+1}
                            </span>
                            <div style={{fontSize:12,color:"#0F172A",lineHeight:1.6,
                              fontFamily:/[=+\-×÷]/.test(step)?"monospace":"inherit"}}>
                              {step}
                            </div>
                          </div>
                        ))}
                        {m.solution.tip&&(
                          <div style={{background:"#FEF3C7",borderRadius:9,padding:"7px 10px",
                            marginTop:8,fontSize:11,color:"#92400E",fontWeight:700}}>
                            💡 {m.solution.tip.replace("🧠 ","")}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Chinese meaning */}
                    {m.meaning&&(
                      <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:12,
                        padding:"10px 12px",marginTop:8}}>
                        <div style={{fontSize:10,fontWeight:800,color:"#1D4ED8",marginBottom:3,
                          textTransform:"uppercase",letterSpacing:.7}}>📖 English Meaning</div>
                        <div style={{fontSize:13,fontWeight:600,color:"#1E40AF"}}>{m.meaning}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>}
    </div>
  );
}

function ReviewTab({mistakes, onBack}){
  const [view, setView] = React.useState("trend"); // trend | weak

  // Build session trend from mistakes (count per date)
  const sessionDates = [...new Set(mistakes.map(m=>m.date))].sort();
  const trendData = sessionDates.slice(-8).map(date=>{
    const dayMistakes = mistakes.filter(m=>m.date===date).length;
    return {date, mistakes: dayMistakes};
  });

  // Topic frequency
  const topicCount = {};
  mistakes.forEach(m=>{ const k=m.topic||m.sectionType||"Other"; topicCount[k]=(topicCount[k]||0)+1; });
  const topTopics = Object.entries(topicCount).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxCount = topTopics[0]?.[1]||1;

  const topicColors={
    "Numbers":"#3B82F6","Addition":"#10B981","Subtraction":"#F59E0B",
    "Multiplication":"#7C3AED","Division":"#F97316","Money":"#0D9488",
    "Word Problem":"#0891B2","Grammar":"#3B82F6","Vocabulary":"#8B5CF6",
    "BianZi":"#EF4444","CiYu":"#F97316","Other":"#64748B",
  };

  return(
    <div style={{fontFamily:"Nunito,sans-serif",paddingBottom:80}}>
      <div style={{background:"linear-gradient(135deg,#1E3A6E,#2563EB)",padding:"18px 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",
          borderRadius:9,padding:"6px 12px",color:"#fff",cursor:"pointer",fontSize:12,
          fontWeight:700,marginBottom:10}}>← Back</button>
        <div style={{color:"#fff",fontSize:18,fontWeight:900}}>📊 Review & Analysis</div>
        <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>
          {mistakes.length} total mistakes recorded
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",background:"#fff",borderBottom:"1px solid #E2E8F0"}}>
        {[["trend","📈 Trend"],["weak","🎯 Weak Topics"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,background:"none",border:"none",cursor:"pointer",
              padding:"13px 8px",fontSize:13,fontWeight:view===v?800:500,
              color:view===v?"#1E3A6E":"#64748B",
              borderBottom:view===v?"2.5px solid #1E3A6E":"2.5px solid transparent"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"16px"}}>
        {view==="trend"&&(
          <>
            {/* Mistakes over time bar chart */}
            <div style={{background:"#fff",borderRadius:18,padding:"16px",marginBottom:14,
              boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
              <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:14}}>
                Mistakes Per Session
              </div>
              {trendData.length===0?(
                <div style={{textAlign:"center",color:"#94A3B8",padding:"24px",fontSize:13}}>
                  No data yet. Complete some sessions first!
                </div>
              ):(
                <div style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>
                  {trendData.map((d,i)=>{
                    const maxM = Math.max(...trendData.map(x=>x.mistakes),1);
                    const h = Math.max((d.mistakes/maxM)*80,4);
                    const isLast = i===trendData.length-1;
                    return(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",
                        alignItems:"center",gap:4}}>
                        <div style={{fontSize:9,fontWeight:700,color:"#64748B"}}>
                          {d.mistakes}
                        </div>
                        <div style={{width:"100%",height:h,borderRadius:"4px 4px 0 0",
                          background:isLast?"#EF4444":"#BFDBFE",
                          transition:"height .4s"}}/>
                        <div style={{fontSize:8,color:"#94A3B8",textAlign:"center",
                          lineHeight:1.2,maxWidth:28,overflow:"hidden"}}>
                          {d.date.slice(0,5)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {trendData.length>=2&&(()=>{
                const first=trendData[0].mistakes, last=trendData[trendData.length-1].mistakes;
                const improved = last < first;
                return(
                  <div style={{background:improved?"#D1FAE5":"#FEF3C7",borderRadius:10,
                    padding:"8px 12px",marginTop:10,fontSize:12,fontWeight:700,
                    color:improved?"#065F46":"#92400E"}}>
                    {improved
                      ? `📉 Mistakes reduced from ${first} → ${last}. Great improvement!`
                      : last===first
                      ? "→ Steady performance. Keep practising!"
                      : `📈 More mistakes recently (${first} → ${last}). Review weak topics below.`}
                  </div>
                );
              })()}
            </div>

            {/* Recent 3 mistakes with solutions */}
            {mistakes.length>0&&(
              <div style={{background:"#fff",borderRadius:18,padding:"16px",
                boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
                <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:12}}>
                  🔁 Last Mistakes to Revisit
                </div>
                {mistakes.slice(-3).reverse().map((m,i)=>{
                  const col = topicColors[m.topic||m.sectionType]||"#64748B";
                  return(
                    <div key={i} style={{borderBottom:i<2?"1px solid #F1F5F9":"none",
                      paddingBottom:i<2?12:0,marginBottom:i<2?12:0}}>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <span style={{background:col+"18",borderRadius:8,padding:"4px 8px",
                          fontSize:10,fontWeight:700,color:col,flexShrink:0}}>
                          {m.topic||m.sectionType}
                        </span>
                        <div style={{fontSize:12,color:"#0F172A",fontWeight:600,lineHeight:1.5}}>
                          {(m.q||m.id||"—").slice(0,80)}{(m.q||"").length>80?"…":""}
                        </div>
                      </div>
                      {m.solution&&(
                        <div style={{background:"#F0FDF4",borderRadius:10,padding:"8px 10px",
                          marginTop:8,fontSize:11,color:"#065F46",fontWeight:600}}>
                          💡 {m.solution.tip
                            ? m.solution.tip.replace("🧠 ","")
                            : (m.solution.steps||[])[0]||"See solution in Mistakes tab"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view==="weak"&&(
          <div style={{background:"#fff",borderRadius:18,padding:"16px",
            boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#0F172A",marginBottom:14}}>
              Topics That Need More Practice
            </div>
            {topTopics.length===0?(
              <div style={{textAlign:"center",color:"#94A3B8",padding:"24px",fontSize:13}}>
                No data yet!
              </div>
            ):topTopics.map(([topic,count],i)=>{
              const col = topicColors[topic]||"#64748B";
              const pct = Math.round(count/maxCount*100);
              const priority = i===0?"🔴 High":i<=1?"🟠 Medium":"🟡 Low";
              return(
                <div key={topic} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:4}}>
                    <div>
                      <span style={{fontSize:12,fontWeight:800,color:col}}>{topic}</span>
                      <span style={{fontSize:10,color:"#94A3B8",marginLeft:6}}>{priority}</span>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:"#64748B"}}>
                      {count} mistake{count>1?"s":""}
                    </span>
                  </div>
                  <div style={{background:"#F1F5F9",borderRadius:8,height:8}}>
                    <div style={{background:col,borderRadius:8,height:8,
                      width:pct+"%",transition:"width .5s"}}/>
                  </div>
                  <div style={{fontSize:10,color:"#94A3B8",marginTop:3}}>
                    {i===0?"Focus on this topic first in your next session"
                     :i===1?"Revise this topic regularly"
                     :"Keep an eye on this topic"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


// ── English Vocabulary Dictionary (P3 Level) ─────────────────
// Used for vocabulary building, word definitions on hover
const WORD_DICT = {
  // Grammar / Tense markers
  "yesterday":"(time word) the day before today",
  "tomorrow":"(time word) the day after today",
  "already":"before now; by this time",
  "finally":"at last; after a long time",
  "suddenly":"quickly and without warning",
  "usually":"most of the time; normally",
  "always":"every time; all the time",
  "never":"not at any time",
  "often":"many times; frequently",
  "sometimes":"now and then; not always",
  // Common P3 Vocabulary
  "delicious":"very tasty and good to eat",
  "enormous":"very, very big; huge",
  "exhausted":"very, very tired",
  "frightened":"very scared or afraid",
  "generous":"willing to give and share with others",
  "grateful":"feeling thankful for something",
  "magnificent":"very grand and beautiful",
  "nervous":"worried or a little scared about something",
  "patient":"able to wait calmly without getting upset",
  "proud":"happy and pleased about something good",
  "responsible":"in charge of something; able to be trusted",
  "tremendous":"very large or impressive",
  "unfortunate":"unlucky; not lucky",
  "brave":"not afraid; willing to face danger",
  "careful":"thinking about what you do to avoid mistakes",
  "clever":"good at learning and understanding things",
  "curious":"wanting to know or learn about things",
  "determined":"not giving up; decided firmly",
  "excited":"very happy and looking forward to something",
  "helpful":"giving help to others; useful",
  "honest":"telling the truth; not lying",
  "kind":"caring about others; nice and friendly",
  "lonely":"sad because you are alone",
  "miserable":"very unhappy and sad",
  "obedient":"doing what you are told; following rules",
  "polite":"having good manners; respectful",
  "quiet":"making little or no noise",
  "shy":"nervous or uncomfortable with other people",
  "silly":"not serious; funny in a foolish way",
  "timid":"shy and easily frightened",
  "upset":"unhappy or worried about something",
  "worried":"feeling nervous that something bad might happen",
  // Action words
  "collected":"gathered things together",
  "discovered":"found something new",
  "examined":"looked at carefully",
  "explained":"made something clear",
  "noticed":"saw or became aware of",
  "observed":"watched carefully",
  "prepared":"made ready",
  "rescued":"saved from danger",
  "struggled":"tried hard against difficulty",
  "wandered":"walked without a fixed direction",
  // Adjectives from comprehension
  "ancient":"very old; from long ago",
  "cosy":"comfortable and warm",
  "damp":"slightly wet",
  "distant":"far away",
  "familiar":"well known; seen or heard many times before",
  "fragrant":"having a nice, sweet smell",
  "gloomy":"dark and sad",
  "lively":"full of life and energy",
  "peaceful":"calm and quiet",
  "precious":"very valuable or important",
  "rough":"not smooth; uneven",
  "smooth":"flat and even; not rough",
  "stern":"strict and serious",
  "weary":"very tired",
  "witty":"clever and funny",
};


// ── Synonyms & Antonyms (P3 English) ─────────────────────────
const SYN_ANT = {
  "faithful":{syn:["loyal","devoted"],ant:["disloyal","unfaithful"]},
  "delicious":{syn:["tasty","yummy"],ant:["awful","tasteless"]},
  "enormous":{syn:["huge","gigantic"],ant:["tiny","small"]},
  "exhausted":{syn:["tired","worn out"],ant:["energetic","fresh"]},
  "frightened":{syn:["scared","afraid"],ant:["brave","fearless"]},
  "generous":{syn:["kind","giving"],ant:["selfish","stingy"]},
  "grateful":{syn:["thankful"],ant:["ungrateful"]},
  "magnificent":{syn:["splendid","grand"],ant:["plain","ordinary"]},
  "nervous":{syn:["anxious","worried"],ant:["calm","relaxed"]},
  "patient":{syn:["calm","tolerant"],ant:["impatient"]},
  "proud":{syn:["pleased","delighted"],ant:["ashamed","guilty"]},
  "guilty":{syn:["ashamed","sorry"],ant:["innocent","proud"]},
  "brave":{syn:["courageous","fearless"],ant:["cowardly","timid"]},
  "careful":{syn:["cautious","attentive"],ant:["careless","reckless"]},
  "careless":{syn:["reckless","sloppy"],ant:["careful","cautious"]},
  "clever":{syn:["smart","bright"],ant:["foolish","slow"]},
  "curious":{syn:["inquisitive","eager"],ant:["uninterested","bored"]},
  "determined":{syn:["firm","resolute"],ant:["hesitant","unsure"]},
  "excited":{syn:["thrilled","eager"],ant:["bored","calm"]},
  "helpful":{syn:["useful","kind"],ant:["unhelpful","useless"]},
  "honest":{syn:["truthful","sincere"],ant:["dishonest","lying"]},
  "kind":{syn:["caring","gentle"],ant:["cruel","unkind"]},
  "lonely":{syn:["alone","isolated"],ant:["accompanied","popular"]},
  "miserable":{syn:["unhappy","sad"],ant:["happy","cheerful"]},
  "obedient":{syn:["well-behaved","dutiful"],ant:["naughty","disobedient"]},
  "polite":{syn:["courteous","well-mannered"],ant:["rude","impolite"]},
  "quiet":{syn:["silent","still"],ant:["noisy","loud"]},
  "noisy":{syn:["loud","rowdy"],ant:["quiet","silent"]},
  "shy":{syn:["timid","bashful"],ant:["confident","bold"]},
  "timid":{syn:["shy","fearful"],ant:["brave","bold"]},
  "upset":{syn:["distressed","unhappy"],ant:["pleased","calm"]},
  "worried":{syn:["anxious","concerned"],ant:["relaxed","carefree"]},
  "ancient":{syn:["old","aged"],ant:["modern","new"]},
  "cosy":{syn:["snug","comfortable"],ant:["uncomfortable","cold"]},
  "damp":{syn:["moist","wet"],ant:["dry"]},
  "distant":{syn:["faraway","remote"],ant:["near","close"]},
  "familiar":{syn:["well-known","common"],ant:["strange","unfamiliar"]},
  "fragrant":{syn:["sweet-smelling","scented"],ant:["smelly","stinky"]},
  "gloomy":{syn:["dark","dreary"],ant:["bright","cheerful"]},
  "lively":{syn:["energetic","active"],ant:["dull","lifeless"]},
  "peaceful":{syn:["calm","quiet"],ant:["noisy","chaotic"]},
  "precious":{syn:["valuable","treasured"],ant:["worthless"]},
  "rough":{syn:["uneven","coarse"],ant:["smooth","gentle"]},
  "smooth":{syn:["even","flat"],ant:["rough","bumpy"]},
  "stern":{syn:["strict","serious"],ant:["gentle","lenient"]},
  "weary":{syn:["tired","exhausted"],ant:["fresh","rested"]},
  "witty":{syn:["funny","clever"],ant:["dull","humourless"]},
  "disloyal":{syn:["unfaithful","treacherous"],ant:["loyal","faithful"]},
};

// ── Chinese character dictionary (P3, curated) ───────────────
const ZH_CHAR_DICT = {
  "冷":{pinyin:"lěng",meaning:"cold",syn:"寒",ant:"热"},
  "热":{pinyin:"rè",meaning:"hot",syn:"烫",ant:"冷"},
  "大":{pinyin:"dà",meaning:"big",syn:"巨",ant:"小"},
  "小":{pinyin:"xiǎo",meaning:"small",syn:"微",ant:"大"},
  "高":{pinyin:"gāo",meaning:"tall / high",syn:"耸",ant:"矮"},
  "矮":{pinyin:"ǎi",meaning:"short (height)",ant:"高"},
  "快":{pinyin:"kuài",meaning:"fast",syn:"迅速",ant:"慢"},
  "慢":{pinyin:"màn",meaning:"slow",ant:"快"},
  "新":{pinyin:"xīn",meaning:"new",ant:"旧"},
  "旧":{pinyin:"jiù",meaning:"old (things)",ant:"新"},
  "多":{pinyin:"duō",meaning:"many",ant:"少"},
  "少":{pinyin:"shǎo",meaning:"few",ant:"多"},
  "开":{pinyin:"kāi",meaning:"open",ant:"关"},
  "关":{pinyin:"guān",meaning:"close",ant:"开"},
  "早":{pinyin:"zǎo",meaning:"early",ant:"晚"},
  "晚":{pinyin:"wǎn",meaning:"late / evening",ant:"早"},
  "哭":{pinyin:"kū",meaning:"cry",ant:"笑"},
  "笑":{pinyin:"xiào",meaning:"laugh / smile",ant:"哭"},
  "买":{pinyin:"mǎi",meaning:"buy",ant:"卖"},
  "卖":{pinyin:"mài",meaning:"sell",ant:"买"},
  "来":{pinyin:"lái",meaning:"come",ant:"去"},
  "去":{pinyin:"qù",meaning:"go",ant:"来"},
  "高兴":{pinyin:"gāo xìng",meaning:"happy",syn:"开心 / 快乐",ant:"难过 / 伤心"},
  "开心":{pinyin:"kāi xīn",meaning:"happy / joyful",syn:"高兴",ant:"难过"},
  "难过":{pinyin:"nán guò",meaning:"sad",syn:"伤心",ant:"高兴"},
  "伤心":{pinyin:"shāng xīn",meaning:"heartbroken / sad",syn:"难过",ant:"开心"},
  "认真":{pinyin:"rèn zhēn",meaning:"serious / careful",syn:"仔细",ant:"马虎"},
  "马虎":{pinyin:"mǎ hu",meaning:"careless",ant:"认真"},
  "干净":{pinyin:"gān jìng",meaning:"clean",ant:"肮脏"},
  "美丽":{pinyin:"měi lì",meaning:"beautiful",syn:"漂亮",ant:"丑陋"},
  "漂亮":{pinyin:"piào liang",meaning:"pretty",syn:"美丽",ant:"难看"},
  "勇敢":{pinyin:"yǒng gǎn",meaning:"brave",ant:"胆小"},
  "聪明":{pinyin:"cōng míng",meaning:"clever / smart",ant:"愚笨"},
  "鼓励":{pinyin:"gǔ lì",meaning:"encourage",syn:"激励",ant:"打击"},
  "帮助":{pinyin:"bāng zhù",meaning:"help",syn:"协助"},
  "喜欢":{pinyin:"xǐ huan",meaning:"like",syn:"喜爱",ant:"讨厌"},
};

// ── Random shuffle (Fisher–Yates) ────────────────────────────
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ── Seeded shuffle (deterministic per session) ───────────────
function seededShuffle(arr, seed){
  const a=[...arr]; let s=seed||1;
  const rnd=()=>{ s=(s*9301+49297)%233280; return s/233280; };
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ── Clickable word (tap to hear) ─────────────────────────────
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
  return(
    <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:13,fontWeight:700,color:C.muted}}>Set {setIdx+1}/{sets.length}</span><TagPill color={meta.color} bg={meta.color+"18"}>{cs.setLabel}</TagPill></div>
      <div style={{background:"#F0F9FF",border:"1.5px solid #BAE6FD",borderRadius:16,padding:"14px 16px",marginBottom:16}}><div style={{fontSize:11,fontWeight:800,color:"#0284C7",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>📖 Read the Passage</div><div style={{fontSize:14,color:C.text,lineHeight:1.9,whiteSpace:"pre-line"}}>{cs.passage}</div></div>
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



function App(){
  const [auth,    setAuth]    = useState(null);   // { role, user }
  const [tick,    setTick]    = useState(0);       // force re-render after store mutations
  
  // On mount: load persisted progress from IndexedDB back into STORE
  React.useEffect(()=>{
    (async()=>{
      try {
        const db = await getDB();
        const tx = db.transaction('progress','readonly');
        const store = tx.objectStore('progress');
        const allKeys = await new Promise((res,rej)=>{
          const req = store.getAllKeys();
          req.onsuccess = ()=>res(req.result);
          req.onerror   = ()=>rej(req.error);
        });
        for(const key of allKeys){
          if(!STORE.progress[key]){
            const val = await dbGet('progress', key);
            if(val) STORE.progress[key] = val;
          }
        }
        if(allKeys.length > 0) setTick(t=>t+1);
      } catch(e){ /* IndexedDB not available — no problem */ }
    })();
  },[]);

  function refresh(){ setTick(t=>t+1); }

  function handleSignup(role, userData){
    STORE.users[userData.id] = {...userData, role};
    setAuth({role, user:userData});
  }
  function handleLogin(role, user){ 
    setAuth({role, user}); 
    if(!window._GENIUS_STORE) window._GENIUS_STORE = {users:{},progress:{}};
    window._GENIUS_STORE._currentUser = user.id;
  }
  function handleLogout(){ setAuth(null); }

  if(!auth) return <AuthScreen onLogin={handleLogin} onSignup={handleSignup}/>;

  if(auth.role==="student"){
    const user = STORE.users[auth.user.id] || auth.user;
    return <StudentApp
      user={user}
      onLogout={handleLogout}
      getProgress={(g,s)=>getProgress(user.id,g,s)}
      setProgress={(g,s,d)=>{ setProgress(user.id,g,s,d); refresh(); }}
    />;
  }

  if(auth.role==="parent"){
    const user = STORE.users[auth.user.id] || auth.user;
    const linkedStudents = (user.childIds||[]).map(cid=>STORE.users[cid]).filter(Boolean);
    return <ParentApp
      user={user}
      linkedStudents={linkedStudents}
      onLogout={handleLogout}
      getProgress={getProgress}
      setProgress={(uid,g,s,d)=>{ setProgress(uid,g,s,d); refresh(); }}
      refresh={refresh}
    />;
  }

  if(auth.role==="admin"){
    return <AdminApp
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