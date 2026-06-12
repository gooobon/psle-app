"use client";
import React from 'react';
import { useState, useRef, useEffect } from "react";

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
    const prompt = subject === 'Math'
      ? `A Primary 3 Singapore student got this Math question wrong.
Topic: ${topic}
Question: ${question}
${studentAnswer?'Their answer: '+studentAnswer:''}
Give ONE short hint (max 15 words) to guide them. Use simple words. Do NOT give the answer.`
      : subject === 'Chinese'
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
  speakMath(text)   { this.speak(text, 'en-SG', 0.85); },
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


// ── KaTeX Math Rendering ─────────────────────────────────────
// Loads KaTeX from CDN on first use, renders LaTeX math notation

let _katexLoaded = false;
let _katexLoading = false;
let _katexCallbacks = [];

function loadKaTeX(){
  if(_katexLoaded) return Promise.resolve();
  if(_katexLoading) return new Promise(r=>_katexCallbacks.push(r));
  _katexLoading = true;
  return new Promise((resolve) => {
    // Load CSS
    if(!document.getElementById('katex-css')){
      const link = document.createElement('link');
      link.id   = 'katex-css';
      link.rel  = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.22/katex.min.css';
      document.head.appendChild(link);
    }
    // Load JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.22/katex.min.js';
    script.onload = () => {
      _katexLoaded = true;
      _katexLoading = false;
      _katexCallbacks.forEach(cb=>cb());
      _katexCallbacks = [];
      resolve();
    };
    script.onerror = () => { _katexLoading = false; resolve(); };
    document.head.appendChild(script);
  });
}

// Pre-load KaTeX when the app starts
loadKaTeX();

// KaTeX render component — renders LaTeX math inline
function MathSpan({ tex, block=false }){
  const ref = React.useRef(null);
  React.useEffect(()=>{
    if(!ref.current) return;
    loadKaTeX().then(()=>{
      if(!window.katex || !ref.current) return;
      try {
        window.katex.render(tex, ref.current, {
          throwOnError: false,
          displayMode: block,
          trust: false,
        });
      } catch(e){ ref.current.textContent = tex; }
    });
  }, [tex, block]);
  return <span ref={ref} style={{fontFamily:"KaTeX_Main,serif"}}>{tex}</span>;
}

// Convert text like "2/5" to KaTeX "\frac{2}{5}"
// and "2/5 - 3/10" to proper LaTeX
function textToKaTeX(text){
  // Convert simple fractions: 2/5 → \frac{2}{5}
  return text
    .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
    .replace(/−/g, '-')
    .replace(/×/g, '\\times')
    .replace(/÷/g, '\\div');
}

// Smart question renderer — detects if question has fractions
function MathQ({ text, style={} }){
  const hasFraction = /\d+\/\d+/.test(text);
  if(!hasFraction) return(
    <span style={style}>{text}</span>
  );
  // Split on fraction patterns and render each part
  const parts = text.split(/(\d+\/\d+)/g);
  return(
    <span style={style}>
      {parts.map((part, i) => {
        if(/^\d+\/\d+$/.test(part)){
          const [num, den] = part.split('/');
          return <MathSpan key={i} tex={`\\frac{${num}}{${den}}`}/>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
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

function SubjectSelectScreen({user, grade, onLogout, onSelect, onGradeChange}){
  const [comingSoon, setComingSoon] = React.useState(null);
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
            <button key={key} onClick={()=>live?onSelect(key):setComingSoon(key)}
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
                        borderRadius:8}}>Soon</span>
                  }
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {comingSoon&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",
          display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20}}>
          <div style={{background:"#fff",borderRadius:24,padding:"32px 24px",maxWidth:340,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>{SUBJECTS[comingSoon]?.icon||"🚧"}</div>
            <div style={{fontSize:20,fontWeight:900,color:C.text,marginBottom:8}}>
              {SUBJECTS[comingSoon]?.label} — Coming Soon!
            </div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:24}}>
              We're building high-quality practice questions for this subject. Check back soon!
            </div>
            <div style={{background:C.lGreen,borderRadius:12,padding:"10px 14px",marginBottom:20,
              fontSize:13,fontWeight:700,color:"#065F46"}}>
              ✅ Currently available: P3 English, Chinese & Math
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

const QB = {

  GrammarMCQ:[
    { id:"gm01", difficulty:"foundation", topic:"Simple Past",
      sentence:"Last Saturday, Wilbur the pig ______ in the mud all morning.",
      options:["play","plays","played","is playing"], answer:2,
      hints:["'Last Saturday' is a time clue. Did this happen in the past or right now?"],
      ruleCard:{ title:"Time Clue → Tense", emoji:"🕐",
        rows:[["yesterday / last ___","Simple Past ✅"],["every day","Simple Present"],["right now","Present Continuous"],["tomorrow","Future"]] } },

    { id:"gm02", difficulty:"foundation", topic:"Simple Past",
      sentence:"Matilda ______ six books from the library last week.",
      options:["borrow","borrows","borrowed","is borrowing"], answer:2,
      hints:["'Last week' = already finished. Which tense shows finished past actions?"],
      ruleCard:{ title:"Simple Past (-ed)", emoji:"📅",
        rows:[["borrow","borrowed"],["walk","walked"],["play","played"],["talk","talked"]] } },

    { id:"gm03", difficulty:"foundation", topic:"Question Words",
      sentence:"______ left the storybook on the classroom floor?",
      options:["Who","What","Where","When"], answer:0,
      hints:["What kind of answer fits here — a person's name, a thing, a place, or a time?"],
      ruleCard:{ title:"Question Words", emoji:"❓",
        rows:[["Who","a person 👤"],["What","a thing 📦"],["Where","a place 📍"],["When","a time 🕐"],["Why","a reason 💭"],["How","a way/amount 🔢"]] } },

    { id:"gm04", difficulty:"foundation", topic:"Subject-Verb Agreement",
      sentence:'The basket of apples ______ placed on the kitchen counter.',
      options:["were","are","was","have been"], answer:2,
      highlights:{ subject:"The basket", trap:"of apples" },
      hints:["Find the REAL subject. Cross out 'of apples' — what is left?"],
      ruleCard:{ title:"⚠️ SVA Trap: 'The ___ of ___'", emoji:"🎯",
        rows:[["The basket of apples","= ONE basket → was"],["The group of friends","= ONE group → was"],["The box of chocolates","= ONE box → was"],["Rule: ignore 'of ___'","focus on FIRST noun"]] } },

    { id:"gm05", difficulty:"foundation", topic:"Subject vs Object Pronoun",
      sentence:"Nick came up with a new word, and ______ called it a 'frindle'.",
      options:["she","him","he","they"], answer:2,
      hints:["Who is doing the action 'called'? Nick. Is Nick the one doing it, or receiving it?"],
      ruleCard:{ title:"He vs Him (Subject vs Object)", emoji:"🔄",
        rows:[["DOING the action","he / she / they ✅"],["RECEIVING the action","him / her / them ✅"],["___ ran fast","He ran fast ✅"],["I saw ___","I saw him ✅"],["Quick test:","replace with 'he' or 'him'?"]] } },

    { id:"gm06", difficulty:"foundation", topic:"Past Continuous",
      sentence:"Totto-Chan ______ out of the window when her teacher called her name.",
      options:["looked","looks","look","was looking"], answer:3,
      hints:["Two things: teacher called (quick) + Totto-Chan doing something (already ongoing). Which was already happening?"],
      ruleCard:{ title:"Past Continuous: Was/Were + -ing", emoji:"⏳",
        rows:[["ongoing action","was/were + verb-ing"],["sudden interruption","simple past"],["She ___ when he arrived","was sleeping 😴"],["He arrived while she ___","was reading 📚"],["One person","was + -ing"],["Two+ people","were + -ing"]] } },

    { id:"gm07", difficulty:"foundation", topic:"Past Continuous",
      sentence:"The children ______ quietly when the fire drill suddenly went off.",
      options:["read","reads","were reading","have read"], answer:2,
      hints:["The fire drill (sudden) interrupted something the children were already doing. Which was the ongoing action?"],
      ruleCard:{ title:"Was vs Were in Past Continuous", emoji:"👥",
        rows:[["I / he / she / it","was + -ing"],["you / we / they","were + -ing"],["Totto-Chan was ___ing","one person"],["The children were ___ing","many people"]] } },

    { id:"gm08", difficulty:"core", topic:"Conjunction – Contrast",
      sentence:"Nick wanted to call his pen a 'frindle', ______ his teacher did not agree.",
      options:["so","because","but","and"], answer:2,
      hints:["Nick's idea ↔ teacher disagrees. Are these two ideas going in the same direction, or opposite?"],
      ruleCard:{ title:"Conjunctions: Which One?", emoji:"🔗",
        rows:[["same direction","and"],["opposite ideas","but ✅"],["giving a reason","because"],["showing a result","so"],["showing purpose","so that"]] } },

    { id:"gm09", difficulty:"core", topic:"Conjunction – Purpose",
      sentence:"Despereaux practised being brave every day ______ he could protect the princess.",
      options:["but","although","because of","so that"], answer:3,
      hints:["Why did Despereaux practise? He had a GOAL: to protect the princess. Which word shows a goal or purpose?"],
      ruleCard:{ title:"Because vs So That", emoji:"🎯",
        rows:[["because","gives a reason (past cause)","She cried because she was sad"],["so that","shows a goal (future purpose)","She studied so that she could pass"],["Test:","ask WHY → because","ask WHAT FOR → so that"]] } },

    { id:"gm10", difficulty:"core", topic:"Preposition – Place",
      sentence:"The spider built her web ______ the corner of the barn.",
      options:["on","in","under","along"], answer:1,
      hints:["A corner is a space — like a pocket. Is the web sitting ON TOP, or nestled INSIDE the corner space?"],
      ruleCard:{ title:"In / On / Under / Along", emoji:"📍",
        rows:[["in","inside a space: in the box, in the corner"],["on","on a surface: on the table, on the wall"],["under","below: under the bed"],["along","beside/following: along the road"]] } },

    { id:"gm11", difficulty:"core", topic:"Preposition – Place",
      sentence:"Despereaux hid ______ the big pile of books in the castle library.",
      options:["above","behind","along","between"], answer:1,
      hints:["Despereaux is hiding — he needs to be out of sight. Which position makes him invisible?"],
      ruleCard:{ title:"Position Prepositions", emoji:"🗺️",
        rows:[["above","higher than ↑"],["below / under","lower than ↓"],["behind","at the back (hidden) 🫣"],["in front of","facing you"],["between","in the middle of two things"]] } },

    { id:"gm12", difficulty:"core", topic:"Present Perfect",
      sentence:"Matilda ______ already read all the books in the children's section.",
      options:["is","was","has","have"], answer:2,
      hints:["'Already' is a keyword for present perfect tense. Present perfect = has/have + past participle (read/done/eaten)."],
      ruleCard:{ title:"Present Perfect: Has or Have?", emoji:"✅",
        rows:[["I / You / We / They","have + past participle"],["He / She / It (one person)","has + past participle ✅"],["Matilda has read","ONE person = has"],["They have read","many = have"],["Clue words:","already / just / ever / never / yet"]] } },

    { id:"gm13", difficulty:"core", topic:"Subject-Verb Agreement",
      sentence:'The group of friends ______ planning a surprise party for their teacher.',
      options:["are","were","was","have"], answer:2,
      highlights:{ subject:"The group", trap:"of friends" },
      hints:["Cross out 'of friends'. What is the real subject? Is it singular or plural?"],
      ruleCard:{ title:"⚠️ SVA Trap: 'The ___ of ___'", emoji:"🎯",
        rows:[["The group of friends","ONE group → was"],["The team of players","ONE team → was"],["The bunch of flowers","ONE bunch → was"],["👉 Always check:","what is the FIRST noun?"]] } },

    { id:"gm14", difficulty:"core", topic:"Reflexive Pronouns",
      sentence:"The children decorated the classroom ______ without asking for help.",
      options:["himself","itself","themselves","ourselves"], answer:2,
      hints:["Who did it? The children (= they). Which reflexive pronoun matches 'they'?"],
      ruleCard:{ title:"Reflexive Pronouns", emoji:"🪞",
        rows:[["I","myself"],["you","yourself"],["he","himself"],["she","herself"],["it","itself"],["we","ourselves"],["they","themselves ✅"]] } },

    { id:"gm15", difficulty:"stretch", topic:"Past Perfect",
      sentence:"By the time Despereaux reached the dungeon, the princess ______ already been taken.",
      options:["is","was","has","had"], answer:3,
      hints:["Two things happened in the past. Which came FIRST — Despereaux arriving, or princess being taken away?"],
      ruleCard:{ title:"Past Perfect: had + past participle", emoji:"⏰",
        rows:[["2 past events → use had for the EARLIER one",""],["By the time A happened...","...B had already happened"],["Despereaux arrived (2nd)","princess had been taken (1st)"],["has","present perfect (connected to NOW)"],["had","past perfect (before another past event) ✅"]] } },

    { id:"gm16", difficulty:"stretch", topic:"Conjunction – Reason",
      sentence:"The class was sad ______ their favourite teacher was leaving the school.",
      options:["but","although","because","so"], answer:2,
      hints:["Why were they sad? The teacher leaving is the REASON. Which word introduces a reason?"],
      ruleCard:{ title:"Because vs So", emoji:"🔗",
        rows:[["because","introduces a REASON","She was tired because she ran."],["so","introduces a RESULT","She ran, so she was tired."],["Test:","WHY? → because","WHAT HAPPENED? → so"]] } },
  ],

  VocabMCQ:[
    { id:"vm01", difficulty:"foundation", topic:"Vocabulary",
      sentence:"Charlotte was a ______ friend to Wilbur — she never gave up on him.",
      options:["disloyal","faithful","careless","noisy"], answer:1,
      hints:["Charlotte never gave up on Wilbur. What kind of friend always stays?"] },
    { id:"vm02", difficulty:"foundation", topic:"Vocabulary",
      sentence:"Despereaux was a very ______ mouse. He was not afraid to face the cat.",
      options:["sleepy","timid","brave","clumsy"], answer:2,
      hints:["He was NOT afraid. What word describes someone who does not feel fear?"] },
    { id:"vm03", difficulty:"foundation", topic:"Vocabulary",
      sentence:"Matilda felt very ______ when she found a new book to read.",
      options:["upset","bored","delighted","frightened"], answer:2,
      hints:["Finding something you love makes you feel how?"] },
    { id:"vm04", difficulty:"foundation", topic:"Vocabulary",
      sentence:"The students were ______ as they listened carefully to the story.",
      options:["noisy","silent","clumsy","restless"], answer:1,
      hints:["They were listening carefully. Would they be making noise?"] },
    { id:"vm05", difficulty:"foundation", topic:"Vocabulary",
      sentence:"The class was very ______ when they heard the school trip was cancelled.",
      options:["delighted","amused","disappointed","excited"], answer:2,
      hints:["The trip was cancelled — something they hoped for did not happen. How would they feel?"] },
    { id:"vm06", difficulty:"foundation", topic:"Vocabulary",
      sentence:"Nick came up with a ______ idea — he invented a brand new word for 'pen'.",
      options:["boring","common","clumsy","creative"], answer:3,
      hints:["He invented something completely new. What kind of idea is that?"] },
    { id:"vm07", difficulty:"foundation", topic:"Vocabulary",
      sentence:"Charlotte was ______ to help Wilbur no matter how hard things were.",
      options:["afraid","unwilling","determined","confused"], answer:2,
      hints:["She never gave up. What word describes someone who has firmly made up their mind?"] },
    { id:"vm08", difficulty:"core", topic:"Vocabulary",
      sentence:"The old library was ______ — it had thousands of books from floor to ceiling.",
      options:["tiny","dim","empty","enormous"], answer:3,
      hints:["Thousands of books from floor to ceiling — how big does the library need to be?"] },
    { id:"vm09", difficulty:"core", topic:"Vocabulary",
      sentence:"Despereaux was ______ at first, but he learnt to be brave.",
      options:["bold","timid","clever","cheerful"], answer:1,
      hints:["He later became brave — so he was the opposite at first."] },
    { id:"vm10", difficulty:"core", topic:"Vocabulary",
      sentence:"Totto-Chan was ______ when she saw that her classrooms were old train carriages.",
      options:["bored","astonished","angry","tired"], answer:1,
      hints:["Seeing train carriages as classrooms for the first time — would you be bored, or extremely surprised?"] },
    { id:"vm11", difficulty:"core", topic:"Vocabulary",
      sentence:"The teacher gave a ______ explanation of the grammar rule before moving on.",
      options:["lengthy","confusing","brief","repeated"], answer:2,
      hints:["She moved on quickly after explaining — was the explanation long or short?"] },
    { id:"vm12", difficulty:"core", topic:"Vocabulary",
      sentence:"Harvey was ______ with his little brother for causing trouble again and again.",
      options:["pleased","proud","delighted","frustrated"], answer:3,
      hints:["His brother kept causing trouble repeatedly. How would that make you feel?"] },
    { id:"vm13", difficulty:"core", topic:"Vocabulary",
      sentence:"The path through the forest was ______, and only one person could walk through at a time.",
      options:["wide","narrow","curved","muddy"], answer:1,
      hints:["Only one person could walk through — was it wide or not?"] },
    { id:"vm14", difficulty:"core", topic:"Vocabulary",
      sentence:"Wilbur was a ______ pig who never hurt any of the other animals on the farm.",
      options:["rough","fierce","gentle","noisy"], answer:2,
      hints:["He never hurt anyone — was he rough or kind and soft?"] },
    { id:"vm15", difficulty:"stretch", topic:"Vocabulary",
      sentence:"The princess was kept in a ______ dungeon with no windows and no light.",
      options:["cheerful","bright","gloomy","colourful"], answer:2,
      hints:["No windows, no light — does that sound bright and happy, or dark and depressing?"] },
    { id:"vm16", difficulty:"stretch", topic:"Vocabulary",
      sentence:"The children were very ______ in class — they always followed the teacher's instructions.",
      options:["naughty","noisy","lazy","obedient"], answer:3,
      hints:["They always followed instructions. What word describes children who do what they are told?"] },
  ],

  GrammarCloze:[
    { id:"gc_set1", difficulty:"foundation", setLabel:"Set 1 — Pronouns",
      passage:'Mei and her brother Sam went to the school fair. (1)______ were very excited. Sam wanted to try the games, but Mei told (2)______ to visit the book stall first. "Can (3)______ look at the books together?" she asked. Sam smiled and agreed. In the end, (4)______ both had a wonderful time.',
      blanks:[
        { num:1, answer:"They", wordBank:["They","We","Them","It"],
          hints:["Mei and Sam together = two people doing something. Which pronoun is for two people as the SUBJECT?"] },
        { num:2, answer:"him", wordBank:["him","his","he","them"],
          hints:["Mei told someone — that someone is Sam (one boy). Is Sam doing the action, or receiving it?"] },
        { num:3, answer:"we", wordBank:["we","us","they","our"],
          hints:["Mei means herself AND Sam doing something together. Who is doing the action 'look'?"] },
        { num:4, answer:"they", wordBank:["they","them","we","both"],
          hints:["Mei and Sam had a wonderful time. Two people as the subject of a sentence?"] },
      ],
    },
    { id:"gc_set2", difficulty:"core", setLabel:"Set 2 — Tenses",
      passage:'Last Sunday, the school (1)______ a fun reading carnival. The children (2)______ books and playing games when the rain suddenly started. Everyone quickly (3)______ inside. By the time the rain stopped, they (4)______ already finished three rounds of games.',
      blanks:[
        { num:1, answer:"held", wordBank:["hold","holds","held","is holding"],
          hints:["'Last Sunday' = past. Which form of 'hold' is simple past?"] },
        { num:2, answer:"were reading", wordBank:["read","reads","were reading","have read"],
          hints:["The rain suddenly interrupted something children were already doing. Which tense shows 'already in progress'?"] },
        { num:3, answer:"went", wordBank:["go","goes","went","was going"],
          hints:["A quick completed action in the past. Simple past of 'go'?"] },
        { num:4, answer:"had", wordBank:["have","has","had","were"],
          hints:["'Already' + something completed BEFORE the rain stopped = past perfect."] },
      ],
    },
    { id:"gc_set3", difficulty:"stretch", setLabel:"Set 3 — Conjunctions & Prepositions",
      passage:'Despereaux lived (1)______ a tiny hole in the castle wall. He loved reading (2)______ he had discovered books. One day he ventured out (3)______ he wanted to see the princess. He was nervous (4)______ he walked bravely through the long corridor.',
      blanks:[
        { num:1, answer:"in", wordBank:["in","on","at","under"],
          hints:["He lived INSIDE a hole. Which preposition means inside a space?"] },
        { num:2, answer:"because", wordBank:["but","because","although","so"],
          hints:["Why did he love reading? He discovered books — that's a REASON. Which word shows reason?"] },
        { num:3, answer:"because", wordBank:["but","although","because","while"],
          hints:["Why did he venture out? He wanted to see the princess — that's a REASON."] },
        { num:4, answer:"but", wordBank:["and","but","so","because"],
          hints:["Nervous AND brave at the same time — do these contrast or agree?"] },
      ],
    },
  ],

  VocabCloze:[
    { id:"vc_set1", difficulty:"foundation", setLabel:"Set 1 — Charlotte's Web",
      wordBank:["gentle","loyal","famous","worried"],
      passage:'Charlotte was a (1)______ and caring friend. She was (2)______ about Wilbur because the farmer wanted to sell him. Charlotte worked hard to make Wilbur (3)______ by spinning words into her web. The other animals in the barn thought she was a very (4)______ spider.',
      blanks:[
        { num:1, answer:"gentle", hints:["Charlotte was kind and soft — she never hurt anyone. Which word describes that?"] },
        { num:2, answer:"worried", hints:["She cared about Wilbur and feared something bad might happen. Which word shows that feeling?"] },
        { num:3, answer:"famous", hints:["Words in a web brought many people to see Wilbur. What did he become?"] },
        { num:4, answer:"loyal", hints:["Charlotte always helped Wilbur and never gave up on him. What kind of friend is that?"] },
      ],
    },
    { id:"vc_set2", difficulty:"core", setLabel:"Set 2 — Matilda",
      wordBank:["enormous","curious","determined","clever"],
      passage:'Matilda was an extremely (1)______ girl who could read by the age of three. She was always (2)______ about new things and loved exploring ideas. The school library seemed (3)______ to her, filled with thousands of books. Matilda was (4)______ to read every single one.',
      blanks:[
        { num:1, answer:"clever", hints:["She could read at age three. What word describes someone very smart and quick?"] },
        { num:2, answer:"curious", hints:["She always wanted to find out more about new things."] },
        { num:3, answer:"enormous", hints:["Thousands of books — does that need a big or small library?"] },
        { num:4, answer:"determined", hints:["She made up her mind to read EVERY book and nothing would stop her."] },
      ],
    },
    { id:"vc_set3", difficulty:"stretch", setLabel:"Set 3 — Totto-Chan",
      wordBank:["astonished","creative","welcoming","unique"],
      passage:'Totto-Chan was (1)______ when she saw that the classrooms were train carriages. The headmaster, Mr Kobayashi, ran a very (2)______ school where children could learn in (3)______ ways. He was always (4)______ to new students and made everyone feel at home.',
      blanks:[
        { num:1, answer:"astonished", hints:["Seeing train carriages as classrooms for the first time — would you be bored or extremely surprised?"] },
        { num:2, answer:"unique", hints:["No other school had train carriages as classrooms. What word means 'one of a kind'?"] },
        { num:3, answer:"creative", hints:["Learning in unusual and imaginative ways."] },
        { num:4, answer:"welcoming", hints:["He made everyone feel at home — was he friendly or unfriendly?"] },
      ],
    },
  ],

  Editing:[
    { id:"ed_set1", difficulty:"stretch", setLabel:"Set 1",
      instructions:"Each sentence has ONE spelling mistake. Find and choose the correct spelling.",
      items:[
        { id:"ed1a", difficulty:"foundation", sentence:"Charlotte was a very patiant spider who never gave up.", wrongWord:"patiant",
          options:["patiant","patient","pashent","pateint"], answer:1,
          hints:["Say it slowly: pay-shunt. Which spelling looks right?"] },
        { id:"ed1b", difficulty:"foundation", sentence:"Matilda visited the liberry every day after school.", wrongWord:"liberry",
          options:["liberry","libary","library","librery"], answer:2,
          hints:["Say it carefully: li-BRAR-y. There's a hidden 'r' in the middle."] },
        { id:"ed1c", difficulty:"foundation", sentence:"The children were very exitd about the school trip.", wrongWord:"exitd",
          options:["exitd","exited","excited","exciteed"], answer:2,
          hints:["This word means very happy and looking forward to something. How do you spell it?"] },
        { id:"ed1d", difficulty:"foundation", sentence:"Wilbur felt gratefull to have such a kind friend.", wrongWord:"gratefull",
          options:["gratefull","greatful","grateful","graitful"], answer:2,
          hints:["This word means thankful. It ends in just ONE 'l', not two."] },
      ],
    },
    { id:"ed_set2", difficulty:"stretch", setLabel:"Set 2",
      instructions:"Each sentence has ONE spelling mistake. Find and choose the correct spelling.",
      items:[
        { id:"ed2a", difficulty:"foundation", sentence:"Despereaux was very couragous when he faced the cat.", wrongWord:"couragous",
          options:["couragous","courageous","couragious","corrageous"], answer:1,
          hints:["This word means very brave. It has the word 'age' inside it: cour-AGE-ous."] },
        { id:"ed2b", difficulty:"core", sentence:"Nick's teacher was suprised by his new word 'frindle'.", wrongWord:"suprised",
          options:["suprised","surprised","surpised","surprized"], answer:1,
          hints:["Say it: sur-PRIZE-d. There's an 'r' after 'su'."] },
        { id:"ed2c", difficulty:"core", sentence:"The princess was imprissoned in the dark dungeon.", wrongWord:"imprissoned",
          options:["imprissoned","inprisoned","imprisoned","imprisioned"], answer:2,
          hints:["Think of the base word 'prison'. How do you add 'im-' and '-ed' to it?"] },
        { id:"ed2d", difficulty:"core", sentence:"Totto-Chan was fasinated by the train carriages.", wrongWord:"fasinated",
          options:["fasinated","facinated","fascinated","fasscinated"], answer:2,
          hints:["There's a silent 'c' hiding in this word: fas-C-inated."] },
      ],
    },
    { id:"ed_set3", difficulty:"stretch", setLabel:"Set 3",
      instructions:"Each sentence has ONE spelling mistake. Find and choose the correct spelling.",
      items:[
        { id:"ed3a", difficulty:"core", sentence:"Harvey's little brother Fudge was always causing mischef.", wrongWord:"mischef",
          options:["mischef","mischief","misscheif","misschief"], answer:1,
          hints:["Say it: mis-CHEEF. The 'ie' comes before 'f'."] },
        { id:"ed3b", difficulty:"core", sentence:"The librerian smiled when she saw Matilda come in.", wrongWord:"librerian",
          options:["librerian","liberian","librarian","libriarian"], answer:2,
          hints:["This person works in a library. The word has 'librar-' from 'library'."] },
        { id:"ed3c", difficulty:"stretch", sentence:"Charlotte felt extreemly tired after spinning her web.", wrongWord:"extreemly",
          options:["extreemly","extremly","extremely","extremelly"], answer:2,
          hints:["Base word is 'extreme'. Just add '-ly'. Don't change the spelling of 'extreme'."] },
        { id:"ed3d", difficulty:"stretch", sentence:"The brave knight promissed to protect the princess always.", wrongWord:"promissed",
          options:["promissed","promised","promiced","prommised"], answer:1,
          hints:["Base word is 'promise'. Drop the final 'e' and add '-d'."] },
      ],
    },
  ],

  Comprehension:[
    { id:"comp_set1", difficulty:"foundation", setLabel:"Set 1 — The Reading Carnival",
      passage:`Every year, Maplewood Primary School held a Reading Carnival. This year, the theme was "Books That Changed the World." Students dressed up as their favourite book characters and set up stalls to share their favourite stories.

Tommy dressed as Despereaux, the brave little mouse. He was nervous at first because he had to speak to many people. However, he took a deep breath and began telling the story with great excitement. Soon, a large crowd gathered around his stall.

Miss Lim, the school librarian, was very pleased to see so many students sharing their love of reading. "Books open doors to new worlds," she said with a smile. By the end of the day, every student had borrowed at least one new book to take home.`,
      questions:[
        { id:"cs1q1", type:"MCQ", question:'What was the theme of this year\'s Reading Carnival?',
          options:["Stories from Singapore","Books That Changed the World","Famous Scientists","Adventures at Sea"], answer:1,
          hints:["The theme is mentioned directly in the first paragraph. Re-read it carefully."] },
        { id:"cs1q2", type:"MCQ", question:"Which book character did Tommy dress up as?",
          options:["Charlotte","Matilda","Despereaux","Wilbur"], answer:2,
          hints:["The second paragraph tells you exactly who Tommy dressed as."] },
        { id:"cs1q3", type:"MCQ", question:"Why was Tommy nervous at first?",
          options:["He forgot his costume.","He had to speak to many people.","He could not find his stall.","He lost his book."], answer:1,
          hints:["The second paragraph explains why Tommy was nervous."] },
        { id:"cs1q4", type:"MCQ", question:"What does Miss Lim's quote 'Books open doors to new worlds' suggest?",
          options:["Books are heavy and hard to carry.","Reading helps you explore new ideas and places.","Every book has a door drawn on the cover.","Books can be used to build real doors."], answer:1,
          hints:["'Open doors to new worlds' is not about real doors. Doors let you go somewhere — what do books let you do?"] },
        { id:"cs1q5", type:"TF", question:"True or False: Every student borrowed at least one new book by the end of the day.",
          options:["True","False"], answer:0,
          hints:["The last sentence of the passage tells you exactly this."] },
        { id:"cs1q6", type:"TF", question:"True or False: Tommy gave up speaking because he was too nervous.",
          options:["True","False"], answer:1,
          hints:["The passage says Tommy was nervous, but what did he do AFTER that?"] },
      ],
    },
    { id:"comp_set2", difficulty:"core", setLabel:"Set 2 — A Spider's Gift",
      passage:`Wilbur the pig lived on a farm with many other animals. He was always cheerful and friendly, but he was also afraid — afraid that one day the farmer would take him away.

Charlotte, a grey spider who lived in the corner of the barn, noticed how sad Wilbur looked. "I will help you," she said quietly. That night, while everyone slept, Charlotte spun the words "Some Pig" into her web.

The next morning, the farmer gasped when he saw the words. News spread quickly, and people came from far away to see the special pig. The farmer decided that Wilbur was too special to be sold.

Wilbur was overjoyed. He turned to thank Charlotte, but she looked pale and tired. "You are my dear friend," she whispered. "That is enough for me."`,
      questions:[
        { id:"cs2q1", type:"MCQ", question:"Why was Wilbur afraid?",
          options:["He had no friends.","The farmer might take him away.","He did not like the barn.","He was hungry."], answer:1,
          hints:["The first paragraph explains what Wilbur was afraid of."] },
        { id:"cs2q2", type:"MCQ", question:"What did Charlotte spin into her web?",
          options:["'Great Friend'","'Save Me'","'Some Pig'","'Special Farm'"], answer:2,
          hints:["The second paragraph tells you exactly what Charlotte spun."] },
        { id:"cs2q3", type:"MCQ", question:"Why did the farmer decide not to sell Wilbur?",
          options:["The weather was bad.","Wilbur ran away.","Wilbur was too special because of Charlotte's web.","The farmer forgot."], answer:2,
          hints:["What happened after people read the web and came to see Wilbur?"] },
        { id:"cs2q4", type:"MCQ", question:"What does 'overjoyed' mean in the passage?",
          options:["very sad","very angry","very tired","very happy"], answer:3,
          hints:["'Over-' often means 'very much'. Wilbur just found out he was safe — how would he feel?"] },
        { id:"cs2q5", type:"MCQ", question:"What does Charlotte's last line tell us about her character?",
          options:["She wanted a reward.","She was selfish.","She was a selfless and caring friend.","She was angry at Wilbur."], answer:2,
          hints:["Charlotte said helping Wilbur was 'enough' for her — she asked for nothing in return. What does that show?"] },
        { id:"cs2q6", type:"TF", question:"True or False: Charlotte spun the web during the day while the farmer watched.",
          options:["True","False"], answer:1,
          hints:["When did Charlotte spin the web? Check the second paragraph carefully."] },
      ],
    },
    { id:"comp_set3", difficulty:"stretch", setLabel:"Set 3 — The Power of a Word",
      passage:`Nick Allen was a boy who loved making up games and bending the rules. One day in class, his teacher Mrs Granger explained how words get into dictionaries. "People start using a new word," she said, "and eventually it becomes part of the language."

This gave Nick an idea. He picked up his pen and said, "From now on, this is called a frindle." He convinced his friends to use the word too. Soon, the whole school was saying "frindle" instead of "pen."

Mrs Granger was not pleased. She gave Nick extra work every time he used the word. But Nick did not give up. Years later, Nick's story made the news. The word "frindle" was printed in dictionaries all over the country.

Nick smiled when he heard the news. A single idea, shared with friends, had changed the English language forever.`,
      questions:[
        { id:"cs3q1", type:"MCQ", question:"How do new words get into dictionaries, according to Mrs Granger?",
          options:["Teachers decide which words go in.","People start using them until they become part of the language.","Students vote for their favourite words.","Scientists test the words first."], answer:1,
          hints:["Mrs Granger explains this in the first paragraph."] },
        { id:"cs3q2", type:"MCQ", question:"What did Nick call his pen?",
          options:["a nick","a granger","a frindle","a scribble"], answer:2,
          hints:["Nick came up with a brand new word for his pen."] },
        { id:"cs3q3", type:"MCQ", question:"Why did Mrs Granger give Nick extra work?",
          options:["He was late for school.","He forgot his homework.","He kept using the word 'frindle'.","He was talking in class."], answer:2,
          hints:["What was Mrs Granger not pleased about?"] },
        { id:"cs3q4", type:"MCQ", question:"What does 'convinced' mean in the passage?",
          options:["confused","persuaded","ordered","ignored"], answer:1,
          hints:["Nick got his friends to start using the word — he didn't force them, but they agreed. Which word describes that?"] },
        { id:"cs3q5", type:"TF", question:"True or False: Nick gave up using the word 'frindle' when his teacher punished him.",
          options:["True","False"], answer:1,
          hints:["What does the passage say Nick did after Mrs Granger gave extra work?"] },
        { id:"cs3q6", type:"TF", question:"True or False: The word 'frindle' was eventually printed in dictionaries.",
          options:["True","False"], answer:0,
          hints:["The third paragraph tells you what happened years later."] },
      ],
    },
  ],
};

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
  Math:     { label:"Mathematics", icon:"🔢", color:"#0D9488", live:true,  desc:"MCQ · Short Answer · Problem Sums" },
  Science:  { label:"Science",     icon:"🔬", color:"#F59E0B", live:false, desc:"Coming soon!" },
  Chinese:  { label:"Chinese 华文", icon:"🀄", color:"#EF4444", live:true,  desc:"辨字 · 词语 · 扩句 · 阅读" },
};
const GRADES = ["P3","P4","P5","P6"];

const LIVE_CONTENT = { "P3_English": true, "P3_Chinese": true, "P3_Math": true };

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

const ZH_QB = {

  BianZi: [
    { id:"bz01", difficulty:"foundation", sentence:"今天天气很___，大家都穿上了外套。",
      options:["冷","令","零","玲"], answer:0,
      pinyin:"lěng", hint:"天气冷了要穿外套。想想'冷'字怎么写？两点水+令。", meaning:"冷 = cold" },
    { id:"bz02", difficulty:"foundation", sentence:"小明很___力，每天都认真做功课。",
      options:["努","怒","奴","怎"], answer:0,
      pinyin:"nǔ", hint:"努力 = work hard. 努 = try hard, 怒 = angry. 做功课要___力！", meaning:"努力 = to work hard" },
    { id:"bz03", difficulty:"foundation", sentence:"上课时，同学们都___心地听老师讲课。",
      options:["专","砖","转","赚"], answer:0,
      pinyin:"zhuān", hint:"专心 = concentrate. 专 means 'focused/dedicated'. 上课要___心！", meaning:"专心 = to concentrate, focus" },
    { id:"bz04", difficulty:"foundation", sentence:"欢欢看到地上有垃___，就把它拾起来。",
      options:["及","级","圾","极"], answer:2,
      pinyin:"jī", hint:"垃圾 = rubbish. 这两个字总是在一起的 — 垃___！", meaning:"垃圾 = rubbish, trash" },
    { id:"bz05", difficulty:"foundation", sentence:"弟弟___天都在公园里跑步锻炼身体。",
      options:["每","没","买","卖"], answer:0,
      pinyin:"měi", hint:"___天 = every day. 每天、每周、每月 — 都用'每'！", meaning:"每天 = every day" },
    { id:"bz06", difficulty:"foundation", sentence:"他每天___步上学，从不迟到。",
      options:["徒","途","图","度"], answer:0,
      pinyin:"tú", hint:"徒步 = on foot. 想想'徒步'的意思。", meaning:"徒步 = to walk on foot" },
    { id:"bz07", difficulty:"foundation", sentence:"妈妈叫我___着她买菜的钱，不要弄丢了。",
      options:["拿","拾","握","揣"], answer:3,
      pinyin:"chuāi", hint:"揣着 = to hold/carry in the hand or pocket.", meaning:"揣 = to tuck into, to hold" },
    { id:"bz08", difficulty:"foundation", sentence:"春天来了，花园里的花都___放了。",
      options:["开","盛","怒","齐"], answer:1,
      pinyin:"shèng", hint:"盛开 = in full bloom. 形容花开得很旺盛。", meaning:"盛开 = to bloom abundantly" },
    { id:"bz09", difficulty:"foundation", sentence:"他___得满头大汗，还是没放弃。",
      options:["汗","流","淌","跑"], answer:1,
      pinyin:"liú", hint:"流汗 = to sweat. 三点水旁，与液体流动有关。", meaning:"流 = to flow" },
    { id:"bz10", difficulty:"foundation", sentence:"小明___心地为同学擦了黑板。",
      options:["热","耐","用","细"], answer:0,
      pinyin:"rè", hint:"热心 = warm-hearted, enthusiastic. 热心肠的人会主动帮忙。", meaning:"热心 = warm-hearted, enthusiastic" },
    { id:"bz11", difficulty:"foundation", note:"verify-parent", sentence:"小明很___心，把房间打扫得干干净净。",
      options:["细","西","希","系"], answer:0,
      pinyin:"xì", hint:"细心 = careful. 细心的反义词是粗心。", meaning:"细心 = careful, attentive" },
    { id:"bz12", difficulty:"foundation", sentence:"今天是妈妈的生日，我送了她一___花。",
      options:["束","速","粟","俗"], answer:0,
      pinyin:"shù", hint:"一束花 = a bunch of flowers. 量词：一___花。", meaning:"束 = bunch (measure word)" },
    { id:"bz13", difficulty:"foundation", sentence:"弟弟喜欢在公园里___风筝。",
      options:["放","仿","访","纺"], answer:0,
      pinyin:"fàng", hint:"放风筝 = fly a kite. 放学、放假、放风筝都用'放'！", meaning:"放 = to fly/let go" },
    { id:"bz14", difficulty:"foundation", note:"verify-parent", sentence:"老师___励同学们要多读书。",
      options:["鼓","古","谷","固"], answer:0,
      pinyin:"gǔ", hint:"鼓励 = to encourage. 老师___励我们努力学习！", meaning:"鼓励 = to encourage" },
    { id:"bz15", difficulty:"foundation", sentence:"我们要___护环境，不乱扔垃圾。",
      options:["保","宝","报","抱"], answer:0,
      pinyin:"bǎo", hint:"保护 = to protect. 保护环境 = protect the environment.", meaning:"保护 = to protect" },
    { id:"bz16", difficulty:"foundation", sentence:"小华___着微笑走进教室，和同学们打招呼。",
      options:["带","戴","待","贷"], answer:0,
      pinyin:"dài", hint:"带着笑容 = with a smile. 带 = to bring/carry along.", meaning:"带 = to bring, carry along" },
    { id:"bz17", difficulty:"foundation", sentence:"妈妈叫我去___场买一些蔬菜。",
      options:["市","事","是","士"], answer:0,
      pinyin:"shì", hint:"市场 = market. 菜市场 = vegetable market.", meaning:"市场 = market" },
    { id:"bz18", difficulty:"foundation", note:"verify-parent", sentence:"弟弟___到地上，妈妈连忙跑去扶他。",
      options:["跌","蝶","叠","碟"], answer:0,
      pinyin:"diē", hint:"跌倒 = to fall down. 足字旁和脚有关。", meaning:"跌倒 = to fall down" },
    { id:"bz19", difficulty:"foundation", note:"verify-parent", sentence:"小红每天___晨都去操场跑步。",
      options:["清","亲","情","青"], answer:0,
      pinyin:"qīng", hint:"清晨 = early morning. 清清的水，清___的天。", meaning:"清晨 = early morning" },
    { id:"bz20", difficulty:"foundation", note:"verify-parent", sentence:"上课时大家要___心听老师讲课，不说话。",
      options:["用","勇","永","泳"], answer:0,
      pinyin:"yòng", hint:"用心 = pay attention. 上课___心听讲！", meaning:"用心 = wholeheartedly, carefully" },
  ],

  CiYu: [
    { id:"cy01", difficulty:"foundation", sentence:"妈妈叫我___手，然后才能吃饭。",
      options:["洗","写","细","系"], answer:0,
      hint:"吃饭前要把___洗干净。", meaning:"洗手 = wash hands" },
    { id:"cy02", difficulty:"foundation", sentence:"小华___力地帮老师搬书，老师很高兴。",
      options:["用","由","游","友"], answer:0,
      hint:"用力 = use strength/effort. 他很___力地帮忙！", meaning:"用力 = to use effort, with force" },
    { id:"cy03", difficulty:"foundation", sentence:"我们要___护小动物，不可以伤害它们。",
      options:["爱","哀","矮","碍"], answer:0,
      hint:"爱护 = to take care of/love. 爱___动物！", meaning:"爱护 = to cherish and protect" },
    { id:"cy04", difficulty:"foundation", sentence:"放学后，他___心地把书包整理好。",
      options:["细","小","西","希"], answer:0,
      hint:"细心 = careful. 他很___心，不会忘记东西。", meaning:"细心 = careful, attentive" },
    { id:"cy05", difficulty:"foundation", sentence:"小红___地完成了所有作业，才去玩。",
      options:["懒洋洋","认认真真","慢吞吞","大大方方"], answer:1,
      hint:"把作业做好了才去玩，说明她___。", meaning:"认认真真 = seriously and carefully" },
    { id:"cy06", difficulty:"foundation", sentence:"天气这么热，妈妈给我们买了冰淇淋___。",
      options:["解渴","解闷","解围","解决"], answer:0,
      hint:"天热吃冰淇淋是为了___。", meaning:"解渴 = to quench thirst" },
    { id:"cy07", difficulty:"foundation", sentence:"运动会上，同学们都在为校队___加油。",
      options:["热烈","积极","用力","努力"], answer:0,
      hint:"加油时的气氛是___的。", meaning:"热烈 = enthusiastic, lively" },
    { id:"cy08", difficulty:"foundation", sentence:"妹妹的画作___地挂在墙上，十分好看。",
      options:["整整齐齐","乱七八糟","慢慢腾腾","高高兴兴"], answer:0,
      hint:"好看的画一定是___挂好的。", meaning:"整整齐齐 = neat and tidy" },
    { id:"cy09", difficulty:"foundation", sentence:"小明每天___时上学，从来不迟到。",
      options:["按","安","暗","案"], answer:0,
      hint:"按时 = on time. 按时上学、按时睡觉。", meaning:"按时 = on time, punctually" },
    { id:"cy10", difficulty:"foundation", sentence:"老师___励我们多看课外书，增长知识。",
      options:["鼓","古","谷","固"], answer:0,
      hint:"鼓励 = to encourage. 老师___励我们努力！", meaning:"鼓励 = to encourage" },
    { id:"cy11", difficulty:"foundation", sentence:"小华看见老婆婆提着重东西，___忙上前帮忙。",
      options:["连","莲","帘","廉"], answer:0,
      hint:"连忙 = immediately, at once. 看到需要帮助就___忙上前。", meaning:"连忙 = immediately, right away" },
    { id:"cy12", difficulty:"foundation", sentence:"我们要___护大自然，不破坏动植物。",
      options:["保","宝","报","抱"], answer:0,
      hint:"保护 = to protect. 保护环境、保护动物。", meaning:"保护 = to protect" },
    { id:"cy13", difficulty:"foundation", sentence:"运动会上，同学们都在为校队___加油。",
      options:["热烈","积极","用力","努力"], answer:0,
      hint:"加油时的气氛是___的。热烈鼓掌、热烈欢迎。", meaning:"热烈 = enthusiastic, warm" },
    { id:"cy14", difficulty:"foundation", sentence:"妹妹的画作___地挂在墙上，十分好看。",
      options:["整整齐齐","乱七八糟","慢慢腾腾","高高兴兴"], answer:0,
      hint:"好看的画一定是___挂好的。", meaning:"整整齐齐 = neat and tidy" },
    { id:"cy15", difficulty:"foundation", sentence:"天气这么热，妈妈给我们买了冰淇淋___。",
      options:["解渴","解闷","解围","解决"], answer:0,
      hint:"天热吃冰淇淋是为了___（止渴）。", meaning:"解渴 = to quench thirst" },
    { id:"cy16", difficulty:"foundation", sentence:"小红___认真真地完成了所有作业，才去玩。",
      options:["认","真","认认","仔"], answer:2,
      hint:"___真真 = very seriously/carefully. AABB reduplication pattern.", meaning:"认认真真 = seriously and carefully" },
  ],

  KanTu: [
    { id:"kt_set1", difficulty:"foundation", setLabel:"Set 1",
      wordBank:["环保袋","吸管","明信片","青蛙"],
      items:[
        { id:"kt01", emoji:"🐸", emojiLabel:"一种绿色的小动物，住在水边", answer:"青蛙",
          hint:"这是一种会跳跃、叫声'呱呱'的动物。" },
        { id:"kt02", emoji:"🥤", emojiLabel:"喝饮料时用的细管子", answer:"吸管",
          hint:"喝珍珠奶茶时会用到这个。" },
        { id:"kt03", emoji:"💌", emojiLabel:"写了问候语寄给朋友的卡片", answer:"明信片",
          hint:"旅行时寄给朋友的小卡片。" },
        { id:"kt04", emoji:"🛍️", emojiLabel:"购物时用的布袋，对环境友好", answer:"环保袋",
          hint:"不用塑料袋，用这个更环保。" },
      ]
    },
    { id:"kt_set2", difficulty:"foundation", setLabel:"Set 2",
      wordBank:["彩虹","蜡烛","书包","跷跷板"],
      items:[
        { id:"kt05", emoji:"🌈", emojiLabel:"雨后天空出现的七色弧线", answer:"彩虹",
          hint:"下雨后在天空中能看到，有七种颜色。" },
        { id:"kt06", emoji:"🕯️", emojiLabel:"生日蛋糕上点燃的细长物", answer:"蜡烛",
          hint:"过生日时要吹这个，然后许愿。" },
        { id:"kt07", emoji:"🎒", emojiLabel:"上学时背在背上装书的袋子", answer:"书包",
          hint:"每天上学都要背着它。" },
        { id:"kt08", emoji:"⚖️", emojiLabel:"公园里两个小孩一上一下玩的", answer:"跷跷板",
          hint:"两个人坐在两头，一高一低地玩。" },
      ]
    },
    { id:"kt_set3", difficulty:"foundation", setLabel:"Set 3",
      wordBank:["望远镜","闹钟","雨衣","风筝"],
      items:[
        { id:"kt09", emoji:"🔭", emojiLabel:"看远处用的光学仪器", answer:"望远镜",
          hint:"去看星星或观鸟时会用到。" },
        { id:"kt10", emoji:"⏰", emojiLabel:"早上叫你起床的响声机器", answer:"闹钟",
          hint:"它会发出声音提醒你该起床了。" },
        { id:"kt11", emoji:"🌂", emojiLabel:"下雨天穿的防水衣", answer:"雨衣",
          hint:"下雨天骑车时穿，不用撑伞。" },
        { id:"kt12", emoji:"🪁", emojiLabel:"用线拉着在空中飞的玩具", answer:"风筝",
          hint:"在公园放这个时，要拉着线。" },
      ]
    },
    { id:"kt_set4", difficulty:"foundation", setLabel:"Set 4",
      wordBank:["钢琴","蝴蝶","气球","冰淇淋"],
      items:[
        { id:"kt13", emoji:"🎹", emojiLabel:"有很多黑白键，用手指弹奏的乐器", answer:"钢琴",
          hint:"美术课上用来涂颜色，有很多种颜色。" },
        { id:"kt14", emoji:"🦋", emojiLabel:"有彩色翅膀、会飞的美丽昆虫", answer:"蝴蝶",
          hint:"花园里常见，翅膀像彩色的画。" },
        { id:"kt15", emoji:"🎈", emojiLabel:"充满空气、会飞起来的彩色圆形物", answer:"气球",
          hint:"生日派对上常见，用嘴吹大的。" },
        { id:"kt16", emoji:"🍦", emojiLabel:"冷冷甜甜、夏天最爱吃的甜点", answer:"冰淇淋",
          hint:"天热时最好吃，放在甜筒里的冷食。" },
      ]
    },
    { id:"kt_set5", difficulty:"foundation", setLabel:"Set 5",
      wordBank:["地球仪","剪刀","毛巾","雨衣"],
      items:[
        { id:"kt17", emoji:"🌍", emojiLabel:"圆形的地球模型，可以转动", answer:"地球仪",
          hint:"课室里的圆球，上面画着国家和海洋。" },
        { id:"kt18", emoji:"✂️", emojiLabel:"用来剪纸和布的工具，有两个刃", answer:"剪刀",
          hint:"做手工时会用到，要小心别剪到手。" },
        { id:"kt19", emoji:"🧣", emojiLabel:"洗澡后用来擦干身体的布", answer:"毛巾",
          hint:"洗完脸或洗完澡后用来擦干水分的布。" },
        { id:"kt20", emoji:"🧥", emojiLabel:"下雨天穿的防水长外衣", answer:"雨衣",
          hint:"骑车时下雨了就要穿这个，不需要打伞。" },
      ]
    },
    { id:"kt_set6", difficulty:"foundation", setLabel:"Set 6",
      wordBank:["蜡笔","直尺","橡皮擦","铅笔盒"],
      items:[
        { id:"kt21", emoji:"🖍️", emojiLabel:"彩色的绘画工具，小朋友喜欢用来涂色", answer:"蜡笔",
          hint:"美术课上用来涂颜色的工具。" },
        { id:"kt22", emoji:"📏", emojiLabel:"用来画直线和量长度的工具", answer:"直尺",
          hint:"数学课上量线段时会用到。" },
        { id:"kt23", emoji:"🩹", emojiLabel:"写错字时用来擦掉铅笔字的小工具", answer:"橡皮擦",
          hint:"写错了用这个擦掉就好了。" },
        { id:"kt24", emoji:"💼", emojiLabel:"装铅笔和文具的小盒子", answer:"铅笔盒",
          hint:"里面放着铅笔、尺子和橡皮擦。" },
      ]
    },
  ],

  PeiDui: [
    { id:"pd_set1", difficulty:"core", setLabel:"Set 1",
      options:["全身","涂上","环境","决定","有趣","摇动","任务","生活"],
      items:[
        { id:"pd01", blank:"(　)尾巴",  answer:"摇动", hint:"动物高兴时会___尾巴。" },
        { id:"pd02", blank:"故事(　)",  answer:"有趣", hint:"好看的故事书是___的。" },
        { id:"pd03", blank:"(　)习惯",  answer:"生活", hint:"每天的___习惯要养好。" },
        { id:"pd04", blank:"破坏(　)",  answer:"环境", hint:"乱扔垃圾会___环境。" },
        { id:"pd05", blank:"(　)发抖",  answer:"全身", hint:"天气很冷，他___发抖。" },
      ]
    },
    { id:"pd_set2", difficulty:"core", setLabel:"Set 2",
      options:["认真","保护","整理","分享","勇敢","照顾","帮助","完成"],
      items:[
        { id:"pd06", blank:"(　)功课",  answer:"完成", hint:"做作业要___功课。" },
        { id:"pd07", blank:"___地发言", answer:"勇敢", hint:"在班上___地说出自己的想法。" },
        { id:"pd08", blank:"(　)弟妹",  answer:"照顾", hint:"哥哥姐姐要___年幼的弟妹。" },
        { id:"pd09", blank:"(　)书包",  answer:"整理", hint:"放学前要___书包。" },
        { id:"pd10", blank:"(　)同学",  answer:"帮助", hint:"朋友有困难时要___他们。" },
      ]
    },
    { id:"pd_set3", difficulty:"core", setLabel:"Set 3",
      options:["欢乐","参加","安慰","爱护","热闹","合力","独立","节省"],
      items:[
        { id:"pd11", blank:"(　)活动",  answer:"参加", hint:"学校举行运动会，大家都去___。" },
        { id:"pd12", blank:"(　)能源",  answer:"节省", hint:"随手关灯是___能源的好习惯。" },
        { id:"pd13", blank:"(　)动物",  answer:"爱护", hint:"我们要___小动物，不能伤害它们。" },
        { id:"pd14", blank:"(　)完成",  answer:"合力", hint:"大家___把任务完成得又快又好。" },
        { id:"pd15", blank:"___的气氛", answer:"热闹", hint:"运动会上，场面非常___。" },
      ]
    },
    { id:"pd_set4", difficulty:"core", setLabel:"Set 4",
      options:["认真","保护","整理","分享","勇敢","照顾","帮助","完成"],
      items:[
        { id:"pd16", blank:"(　)功课",  answer:"完成", hint:"做作业要___功课，才能去玩。" },
        { id:"pd17", blank:"___地回答", answer:"勇敢", hint:"老师提问，要___地举手回答。" },
        { id:"pd18", blank:"(　)弟妹",  answer:"照顾", hint:"哥哥姐姐要___年幼的弟弟妹妹。" },
        { id:"pd19", blank:"(　)书包",  answer:"整理", hint:"每天放学前要___书包。" },
        { id:"pd20", blank:"(　)同学",  answer:"帮助", hint:"朋友有困难时，应该___他们。" },
      ]
    },
    { id:"pd_set5", difficulty:"core", setLabel:"Set 5",
      options:["欢乐","参加","安慰","爱护","热闹","合力","独立","节省"],
      items:[
        { id:"pd21", blank:"(　)活动",  answer:"参加", hint:"学校举行运动会，同学们都去___活动。" },
        { id:"pd22", blank:"(　)能源",  answer:"节省", hint:"随手关灯是___能源的好习惯。" },
        { id:"pd23", blank:"(　)动物",  answer:"爱护", hint:"我们要___小动物，不能伤害它们。" },
        { id:"pd24", blank:"(　)完成",  answer:"合力", hint:"大家___把任务完成得又快又好。" },
        { id:"pd25", blank:"___的气氛", answer:"热闹", hint:"运动会上，场面非常___。" },
      ]
    },
    { id:"pd_set6", difficulty:"core", setLabel:"Set 6",
      options:["珍惜","改正","关心","努力","快乐","整齐","安全","坚持"],
      items:[
        { id:"pd26", blank:"(　)学习",  answer:"努力", hint:"要___学习，才能取得好成绩。" },
        { id:"pd27", blank:"(　)时间",  answer:"珍惜", hint:"光阴似箭，我们要___每一分钟。" },
        { id:"pd28", blank:"(　)错误",  answer:"改正", hint:"做错了不要紧，重要的是___错误。" },
        { id:"pd29", blank:"___排队",   answer:"整齐", hint:"打水时要___排队，不插队。" },
        { id:"pd30", blank:"___过马路", answer:"安全", hint:"要___过马路，要看红绿灯。" },
      ]
    },
  ],

  JuZi: [
    { id:"jz01", difficulty:"core", type:"expand",
      instruction:"把词语按顺序排成一句话",
      baseSentence:"",
      targetSentence:"我喜欢吃苹果。",
      tiles:["我","喜欢","吃","苹果","。"],
      hint:"谁(我) + 喜欢做什么(喜欢吃) + 什么(苹果)" },
    { id:"jz02", difficulty:"core", type:"expand",
      instruction:"把词语按顺序排成一句话",
      baseSentence:"",
      targetSentence:"弟弟在公园里跑步。",
      tiles:["弟弟","在","公园里","跑步","。"],
      hint:"谁(弟弟) + 在哪里(在公园里) + 做什么(跑步)" },
    { id:"jz03", difficulty:"core", type:"expand",
      instruction:"把词语按顺序排成一句话",
      baseSentence:"",
      targetSentence:"妈妈在厨房做饭。",
      tiles:["妈妈","在","厨房","做饭","。"],
      hint:"谁(妈妈) + 在哪里(在厨房) + 做什么(做饭)" },
    { id:"jz04", difficulty:"core", type:"expand",
      instruction:"用「一边……一边……」完成句子",
      baseSentence:"他听音乐，他做功课。",
      targetSentence:"他一边听音乐，一边做功课。",
      tiles:["他","一边","听音乐","，","一边","做功课","。"],
      hint:"'一边……一边……'表示两件事同时进行。" },
    { id:"jz05", difficulty:"core", type:"combine",
      instruction:"把三个句子改写成一个句子",
      baseSentence:"花园里的花香香的。花园里的草绿绿的。花园里的树高高的。",
      targetSentence:"花园里的花香香的，草绿绿的，树高高的。",
      tiles:["花园里的","花","香香的","，","草","绿绿的","，","树","高高的","。"],
      hint:"三个句子的主语都是'花园里的___'，可以合并。" },
    { id:"jz06", difficulty:"core", type:"expand",
      instruction:"用「……都……」改写句子",
      baseSentence:"老师叫了小明几次。小明没有听到。",
      targetSentence:"老师叫了小明几次，他都没有听到。",
      tiles:["老师","叫了","小明","几次","，","他","都","没有","听到","。"],
      hint:"'都'表示全部，每一次都没有听到。" },
    { id:"jz07", difficulty:"core", type:"expand",
      instruction:"用「因为……所以……」改写句子",
      baseSentence:"天气很冷。大家都穿上了外套。",
      targetSentence:"因为天气很冷，所以大家都穿上了外套。",
      tiles:["因为","天气","很冷","，","所以","大家","都","穿上了","外套","。"],
      hint:"先写原因（因为），再写结果（所以）。" },
    { id:"jz08", difficulty:"core", type:"expand",
      instruction:"用「不但……而且……」扩写句子",
      baseSentence:"小华很聪明。小华很努力。",
      targetSentence:"小华不但很聪明，而且很努力。",
      tiles:["小华","不但","很聪明","，","而且","很努力","。"],
      hint:"'不但……而且……'表示两个都有，层层递进。" },
    { id:"jz09", difficulty:"core", type:"expand",
      instruction:"把词语按顺序排成一句话",
      baseSentence:"",
      targetSentence:"哥哥在房间里看书。",
      tiles:["哥哥","在","房间里","看书","。"],
      hint:"谁 + 在哪里 + 做什么" },
    { id:"jz10", difficulty:"core", type:"expand",
      instruction:"用「一边……一边……」排列句子",
      baseSentence:"",
      targetSentence:"他一边走路一边唱歌。",
      tiles:["他","一边","走路","，","一边","唱歌","。"],
      hint:"一边___，一边___ = doing two things at the same time" },
    { id:"jz11", difficulty:"core", type:"expand",
      instruction:"用「因为……所以……」排列句子",
      baseSentence:"",
      targetSentence:"因为天气很冷，所以大家穿上了外套。",
      tiles:["因为","天气","很冷","，","所以","大家","穿上了","外套","。"],
      hint:"因为(reason) + 所以(result)" },
    { id:"jz12", difficulty:"core", type:"expand",
      instruction:"用「虽然……但是……」排列句子",
      baseSentence:"",
      targetSentence:"虽然天气很热，但是我们还是去跑步。",
      tiles:["虽然","天气","很热","，","但是","我们","还是","去跑步","。"],
      hint:"虽然(despite) + 但是(still...)" },
  ],

  ZuJu: [
    { id:"zj01", difficulty:"core", setLabel:"小华去操场玩",
      sentences:[
        { id:"s1", difficulty:"core", text:"周末，小华和朋友们一起去操场玩。" },
        { id:"s2", difficulty:"core", text:"他们到了操场后，先踢足球。" },
        { id:"s3", difficulty:"core", text:"踢完球，他们坐下来休息。" },
        { id:"s4", difficulty:"core", text:"他们玩得很开心，才回家吃晚饭。" },
      ],
      correctOrder:[0,1,2,3],
      hint:"想想：去操场→踢足球→休息→回家" },
    { id:"zj02", difficulty:"core", setLabel:"小明帮助老人",
      sentences:[
        { id:"s1", text:"放学后，小明走在回家的路上。" },
        { id:"s2", text:"他看见一位老婆婆手里提着很重的菜篮。" },
        { id:"s3", text:"小明连忙跑上前，帮老婆婆提菜篮。" },
        { id:"s4", text:"老婆婆笑着说谢谢，夸小明是好孩子。" },
      ],
      correctOrder:[0,1,2,3],
      hint:"放学→看见老婆婆→上前帮忙→老婆婆道谢" },
    { id:"zj03", difficulty:"core", setLabel:"图书馆的一天",
      sentences:[
        { id:"s1", text:"星期六早上，玲玲和妈妈一起去图书馆。" },
        { id:"s2", text:"她们走进图书馆，发现里面有很多小朋友在看书。" },
        { id:"s3", text:"玲玲找到了一本她一直想看的故事书。" },
        { id:"s4", text:"她安静地坐下来，专心地看了起来。" },
        { id:"s5", difficulty:"core", text:"不知不觉，时间过得很快，妈妈来叫她回家了。" },
        { id:"s6", difficulty:"core", text:"玲玲把书借回家，打算明天继续看完。" },
      ],
      correctOrder:[0,1,2,3,4,5],
      hint:"故事顺序：出发→进入图书馆→找书→看书→时间到→借书回家" },
    { id:"zj04", difficulty:"core", setLabel:"老师生病了",
      sentences:[
        { id:"s1", text:"今天，老师生病了，不能来上课。" },
        { id:"s2", text:"班长告诉同学们，大家要自习。" },
        { id:"s3", text:"同学们安静地坐着，认真地做功课。" },
        { id:"s4", text:"老师回来后，表扬了大家。" },
      ],
      correctOrder:[0,1,2,3],
      hint:"老师生病→班长说自习→大家自习→老师回来表扬" },
    { id:"zj05", difficulty:"core", setLabel:"去超市买东西",
      sentences:[
        { id:"s1", text:"星期六，妈妈带我去超市买东西。" },
        { id:"s2", text:"我们先买了蔬菜和水果。" },
        { id:"s3", text:"然后，妈妈让我去拿一盒牛奶。" },
        { id:"s4", text:"结账后，我们高高兴兴地回家了。" },
      ],
      correctOrder:[0,1,2,3],
      hint:"去超市→买蔬菜水果→拿牛奶→结账回家" },
    { id:"zj06", difficulty:"core", setLabel:"种花的故事",
      sentences:[
        { id:"s1", text:"小红在花盆里种下了一粒种子。" },
        { id:"s2", text:"她每天给种子浇水和晒太阳。" },
        { id:"s3", text:"几个星期后，种子发芽了。" },
        { id:"s4", text:"小红看见小芽，高兴地跳了起来。" },
      ],
      correctOrder:[0,1,2,3],
      hint:"种种子→浇水晒太阳→发芽→高兴" },
  ],

  YueRead: [
    { id:"yr_set1", difficulty:"stretch", setLabel:"爸爸的信",
      passage:"明安：\n\n爷爷生病了，我去超市买一些水果，然后把水果送到爷爷的家。你放学回来先吃午餐，午餐已经准备好了，就放在桌子上。你要做完所有的功课，才可以看电视。妹妹五点下课，你记得去接她回家。你有什么事就给我打电话。\n\n爸爸\n10月8日上午11点",
      questions:[
        { id:"yr01", question:"爸爸去超市买水果是为了什么？",
          options:["送给明安吃","送给爷爷","送给妹妹","送给老师"], answer:1,
          hint:"爸爸为什么要买水果？因为谁生病了？" },
        { id:"yr02", question:"明安放学回来，要先做什么？",
          options:["看电视","做功课","吃午餐","接妹妹"], answer:2,
          hint:"信里说'你放学回来先___'。" },
        { id:"yr03", question:"明安什么时候才可以看电视？",
          options:["放学后马上","吃完午餐后","做完所有功课后","接了妹妹后"], answer:2,
          hint:"'你要___才可以看电视'。" },
      ]
    },
    { id:"yr_set2", difficulty:"stretch", setLabel:"环保小卫士",
      passage:"志华是个环保小卫士。他每天都会把家里的旧报纸收集起来，等积累了很多才拿去回收。班里举行环保展览，志华把收集的废纸做成了美丽的手工艺品，老师和同学们都觉得很有创意。志华说：「只要我们多用心，废物也可以变成宝物！」大家听了都鼓起掌来，为他加油打气。",
      questions:[
        { id:"yr04", question:"志华为什么很兴奋？",
          options:["他很喜欢环保","他家里有废物","他喜欢收垃圾","他得了奖"], answer:0,
          hint:"志华是环保小卫士，他的兴趣是什么？" },
        { id:"yr05", question:"志华是怎么回收那么多旧报纸的？",
          options:["他家里到处是垃圾","他每天把旧报纸收起来","他朋友把旧报纸给了他","他每天买新报纸"], answer:1,
          hint:"信里说志华___旧报纸。" },
        { id:"yr06", question:"同学们听了志华的话后，有什么反应？",
          options:["觉得他说错了","悄悄走开了","为他鼓掌加油","给他更多废纸"], answer:2,
          hint:"'大家听了都___来'。" },
      ]
    },
    { id:"yr_set3", difficulty:"stretch", setLabel:"雨天的温暖",
      passage:"放学时，天空下起了大雨。丽丽没有带雨伞，只好站在学校门口等雨停。这时，她的好朋友小乐撑着雨伞走来了。小乐看见丽丽淋湿了，就说：「我们一起共用雨伞吧！」丽丽很高兴，连声说谢谢。她们一起走回家，脸上都带着笑容。",
      questions:[
        { id:"yr07", question:"丽丽为什么站在学校门口？",
          options:["她在等朋友","她忘了带书包","她没有带雨伞","她在看雨景"], answer:2,
          hint:"丽丽为什么不回家？因为她___。" },
        { id:"yr08", question:"小乐看到丽丽时，心里想到什么？",
          options:["要快点回家","要送雨伞给丽丽","是否要和丽丽共用雨伞","要打电话给妈妈"], answer:2,
          hint:"小乐心中'交锋'的两个念头是什么？" },
        { id:"yr09", question:"小乐最后做了什么决定？",
          options:["自己先回家","打电话叫家长","邀请丽丽共用雨伞","借雨伞给丽丽"], answer:2,
          hint:"小乐想起妈妈的话后，做了什么？" },
      ]
    },
    { id:"yr_set4", difficulty:"stretch", setLabel:"小明的一天",
      passage:"今天是星期六。小明早上八点起床，刷牙洗脸后，和妈妈一起吃早餐。早餐后，小明做了一个小时的功课。中午，爸爸做了好吃的午餐。下午，小明去公园和朋友踢足球。晚上，一家人一起看电视。小明觉得今天过得很开心。",
      questions:[
        { id:"yr10", question:"小明早上几点起床？",
          options:["七点","八点","九点","十点"], answer:1,
          hint:"文章里写了小明___点起床。" },
        { id:"yr11", question:"小明早餐后做了什么？",
          options:["踢足球","看电视","做功课","睡觉"], answer:2,
          hint:"早餐'后'，小明做了___。" },
        { id:"yr12", question:"下午，小明去哪里玩？",
          options:["图书馆","学校","超市","公园"], answer:3,
          hint:"下午他去___和朋友踢足球。" },
      ]
    },
    { id:"yr_set5", difficulty:"stretch", setLabel:"小猫咪咪",
      passage:"小华家有一只小猫，名字叫咪咪。咪咪有一身白色的毛，眼睛又大又圆。咪咪很聪明，每次小华叫它的名字，它就会跑过来。咪咪喜欢喝牛奶，也喜欢吃鱼。每天放学后，咪咪都会在门口等小华回家。小华很喜欢咪咪，每天都帮它梳毛。",
      questions:[
        { id:"yr13", question:"咪咪的毛是什么颜色的？",
          options:["黑色","黄色","白色","花色"], answer:2,
          hint:"文章说咪咪有一身___色的毛。" },
        { id:"yr14", question:"咪咪喜欢吃什么？",
          options:["饼干","鱼","蔬菜","饭"], answer:1,
          hint:"文章说咪咪喜欢喝牛奶，也喜欢吃___。" },
        { id:"yr15", question:"每天放学后，咪咪在哪里等小华？",
          options:["客厅","房间","门口","厨房"], answer:2,
          hint:"咪咪都在___等小华回家。" },
      ]
    },
    { id:"yr_set6", difficulty:"stretch", setLabel:"节约用水",
      passage:"水是我们生活中不可缺少的。我们每天喝水、洗澡和做饭都需要水。可是地球上的淡水不多，我们要节约用水。我们可以洗手后把水龙头关好，不让水白白流掉。洗菜的水也可以用来浇花。每个人都节约一点水，就能保护我们的地球。",
      questions:[
        { id:"yr16", question:"这篇文章主要讲什么？",
          options:["如何做饭","节约用水","地球的历史","如何洗澡"], answer:1,
          hint:"文章的主要内容是关于___的重要性。" },
        { id:"yr17", question:"洗菜的水可以用来做什么？",
          options:["喝水","洗手","浇花","洗澡"], answer:2,
          hint:"文章说洗菜的水可以用来___。" },
        { id:"yr18", question:"我们节约用水是为了什么？",
          options:["省钱","保护地球","洗更多澡","做更多饭"], answer:1,
          hint:"每人节约一点水，就能___我们的地球。" },
      ]
    },
  ],
};

const ZH_PAST_PAPER_AITONG = {
  label:"Ai Tong Primary School 爱同学校",
  year:"2024 Semestral Assessment 1",
  BianZi:[
    { id:"at_bz1", sentence:"运动会上，同学们___力为校队加油。",
      options:["用","勇","永","泳"], answer:0,
      pinyin:"yòng", hint:"用力 = use force/effort. 用力呐喊为校队加油！", meaning:"用力 = with force, to put in effort" },
    { id:"at_bz2", sentence:"他___心地帮妈妈洗碗，把每个碗都洗得干干净净。",
      options:["细","西","希","系"], answer:0,
      pinyin:"xì", hint:"细心 = careful. 做事要___心，才能做好。", meaning:"细心 = careful, attentive" },
    { id:"at_bz3", sentence:"小丽___时完成了作业，老师对她点头微笑。",
      options:["按","安","暗","案"], answer:0,
      pinyin:"àn", hint:"按时 = on time. 按时睡觉、按时上学、按时___作业。", meaning:"按时 = on time, punctually" },
    { id:"at_bz4", sentence:"妈妈买了一___玫瑰花，放在花瓶里。",
      options:["束","速","粟","俗"], answer:0,
      pinyin:"shù", hint:"一束花 = a bunch of flowers. 量词：一___花。", meaning:"束 = bunch/bundle (measure word)" },
    { id:"at_bz5", sentence:"小明___到地上，小红连忙跑过去扶他。",
      options:["跌","蝶","叠","碟"], answer:0,
      pinyin:"diē", hint:"跌倒 = fall down. 足字旁和脚/走路有关。", meaning:"跌倒 = to fall down" },
  ],
  CiYu:[
    { id:"at_cy1", sentence:"运动会上，同学们都___力地为校队加油打气。",
      options:["用","由","游","友"], answer:0,
      hint:"用力 = using effort/strength. 大家___力地为校队加油！", meaning:"用力 = to put in effort" },
    { id:"at_cy2", sentence:"老师___励我们要坚持练习，不要轻易放弃。",
      options:["鼓","古","谷","固"], answer:0,
      hint:"鼓励 = to encourage. 老师___励我们不要放弃。", meaning:"鼓励 = to encourage" },
    { id:"at_cy3", sentence:"小红看见老婆婆提着重物，___忙上前帮忙。",
      options:["连","莲","帘","廉"], answer:0,
      hint:"连忙 = right away, immediately. 看到需要帮助，___忙去做！", meaning:"连忙 = immediately, at once" },
    { id:"at_cy4", sentence:"我们要___护环境，爱护花草树木，不随地扔垃圾。",
      options:["保","宝","报","抱"], answer:0,
      hint:"保护 = to protect. 保护___境、保护动物。", meaning:"保护 = to protect" },
  ],
  KanTu:{
    id:"at_kt", setLabel:"Ai Tong KanTu",
    wordBank:["蜡笔","橡皮擦","直尺","铅笔盒"],
    items:[
      { id:"at_kt1", emoji:"🖍️", emojiLabel:"彩色绘画工具，美术课用来涂色", answer:"蜡笔",
        hint:"美术课上用来给图画涂颜色。" },
      { id:"at_kt2", emoji:"📏", emojiLabel:"量长度和画直线的工具", answer:"直尺",
        hint:"数学课量线段时会用到。" },
      { id:"at_kt3", emoji:"🩹", emojiLabel:"擦掉铅笔字的小工具", answer:"橡皮擦",
        hint:"写错了就用这个擦掉。" },
      { id:"at_kt4", emoji:"💼", emojiLabel:"装文具的小盒子", answer:"铅笔盒",
        hint:"里面放着铅笔、尺子和橡皮擦。" },
    ]
  },
  PeiDui:{
    id:"at_pd", setLabel:"Ai Tong PeiDui",
    options:["全身","涂上","环境","决定","有趣","摇动","任务","生活"],
    items:[
      { id:"at_pd1", blank:"(　)尾巴",  answer:"摇动", hint:"小狗高兴时会___尾巴。" },
      { id:"at_pd2", blank:"故事(　)",  answer:"有趣", hint:"好看的故事书是___的。" },
      { id:"at_pd3", blank:"(　)习惯",  answer:"生活", hint:"每天的___习惯要养成好的。" },
      { id:"at_pd4", blank:"破坏(　)",  answer:"环境", hint:"乱扔垃圾会破坏___。" },
      { id:"at_pd5", blank:"(　)发抖",  answer:"全身", hint:"天气很冷，他___发抖。" },
    ]
  },
  JuZi:[
    { id:"at_jz1", type:"expand",
      instruction:"把词语按顺序排成一句话",
      baseSentence:"",
      targetSentence:"同学们在操场上踢足球。",
      tiles:["同学们","在","操场上","踢足球","。"],
      hint:"谁(同学们) + 在哪里(在操场上) + 做什么(踢足球)" },
    { id:"at_jz2", type:"expand",
      instruction:"用「虽然……但是……」排列句子",
      baseSentence:"",
      targetSentence:"虽然他跑得很慢，但是他坚持跑完了全程。",
      tiles:["虽然","他","跑得","很慢","，","但是","他","坚持","跑完了","全程","。"],
      hint:"虽然(problem) + 但是(still did it)" },
    { id:"at_jz3", type:"expand",
      instruction:"用「因为……所以……」排列句子",
      baseSentence:"",
      targetSentence:"因为他努力学习，所以成绩很好。",
      tiles:["因为","他","努力学习","，","所以","成绩","很好","。"],
      hint:"因为(reason) + 所以(result)" },
  ],
  ZuJu:{
    id:"at_zj", setLabel:"运动会的一天",
    sentences:[
      { id:"s1", text:"今天是学校的运动会。" },
      { id:"s2", text:"同学们穿上运动服，在操场上集合。" },
      { id:"s3", text:"运动会上，大家都努力地参加比赛。" },
      { id:"s4", text:"运动会结束后，同学们高高兴兴地回家了。" },
    ],
    correctOrder:[0,1,2,3],
    hint:"运动会→穿运动服集合→努力比赛→结束回家"
  },
  YueRead:{
    id:"at_yr", setLabel:"爱同学校运动会",
    passage:"今天是爱同学校一年一度的运动会。清早，同学们穿着整齐的运动服，精神抖擞地来到操场。操场上人山人海，十分热闹。比赛开始了，运动员们奋力向前冲，观众们也大声地为他们加油打气。小明参加了一百米短跑比赛。虽然他跑得气喘吁吁，但他还是坚持跑完了全程。最后，小明获得了第三名，他高兴地举起奖牌，向同学们微笑。",
    questions:[
      { id:"at_yr1", question:"运动会在哪里举行？",
        options:["礼堂","课室","操场","图书馆"], answer:2,
        hint:"同学们来到___参加运动会。" },
      { id:"at_yr2", question:"小明参加了哪个比赛项目？",
        options:["跳高","一百米短跑","跳绳","接力赛"], answer:1,
        hint:"文章说小明参加了___比赛。" },
      { id:"at_yr3", question:"小明最后得了第几名？",
        options:["第一名","第二名","第三名","第四名"], answer:2,
        hint:"小明获得了第___名，举起了奖牌。" },
    ]
  },
};

function buildZhPlan(sessionNum, level) {
  if(level==="pastpaper" || (sessionNum >= 11 && !LEVEL_MAP[level])) return buildZhPastPaperPlan(sessionNum||11);
  const sIdx = ((sessionNum||1)-1) % 10;
  const bz = ZH_QB.BianZi;
  const cy = ZH_QB.CiYu;
  const bzItems = pickByLevel(bz, level, sessionNum, 5);
  const cyItems = pickByLevel(cy, level, sessionNum, 4);
  const ktSet = ZH_QB.KanTu[sIdx % ZH_QB.KanTu.length];
  const pdSet = ZH_QB.PeiDui[sIdx % ZH_QB.PeiDui.length];
  const jzCount = ZH_QB.JuZi.length;
  const jzItems = []; for(let i=0;i<3;i++) jzItems.push(ZH_QB.JuZi[(sIdx*3+i)%jzCount]);
  const zjSet = ZH_QB.ZuJu[sIdx % ZH_QB.ZuJu.length];
  const yrSet = ZH_QB.YueRead[sIdx % ZH_QB.YueRead.length];
  return [
    { type:"BianZi",  items:bzItems },
    { type:"CiYu",    items:cyItems },
    { type:"KanTu",   set:ktSet },
    { type:"PeiDui",  set:pdSet },
    { type:"JuZi",    items:jzItems },
    { type:"ZuJu",    set:zjSet },
    { type:"YueRead", set:yrSet },
  ];
}

function buildZhPastPaperPlan(sessionNum) {
  const pp = ZH_PAST_PAPER_AITONG;
  return [
    { type:"BianZi",  items:pp.BianZi },
    { type:"CiYu",    items:pp.CiYu },
    { type:"KanTu",   set:pp.KanTu },
    { type:"PeiDui",  set:pp.PeiDui },
    { type:"JuZi",    items:pp.JuZi },
    { type:"ZuJu",    set:pp.ZuJu },
    { type:"YueRead", set:pp.YueRead },
  ];
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
  const isPastPaper = plan[0]?.items === ZH_PAST_PAPER_AITONG?.BianZi;
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

const MC = {
  navy:"#1E3A6E", teal:"#0D9488", green:"#10B981", red:"#EF4444",
  amber:"#F59E0B", purple:"#7C3AED", orange:"#F97316", blue:"#3B82F6",
  bg:"#F0FDF4", card:"#FFFFFF", text:"#0F172A", muted:"#64748B",
  border:"#D1FAE5", lGreen:"#D1FAE5", lRed:"#FEE2E2", lAmber:"#FEF3C7",
  lBlue:"#DBEAFE", lTeal:"#CCFBF1",
};

const TOPIC_COLOR = {
  "Numbers":      "#3B82F6",
  "Addition":     "#10B981",
  "Subtraction":  "#F59E0B",
  "Multiplication":"#7C3AED",
  "Division":     "#F97316",
  "Money":        "#0D9488",
  "Measurement":  "#EF4444",
  "Fractions":    "#EC4899",
  "Patterns":     "#6366F1",
  "Word Problem": "#0891B2",
};

const MATH_QB = {

  // ── Section A: MCQ (20 questions) ────────────────────────
  MCQ: [
    { id:"m01", difficulty:"foundation", topic:"Numbers",
      q:"In 6825, the digit 8 is in the _______ place.",
      options:["ones","tens","hundreds","thousands"], answer:2,
      solution:{
        method:"Place Value Chart",
        steps:["Th  H  T  O", " 6  8  2  5", "    ↑", "HUNDREDS", "Answer: Hundreds place"],
        tip:"Count from the RIGHT: O · T · H · Th"
      }
    },
    { id:"m02", difficulty:"foundation", topic:"Addition",
      q:"What is the sum of 3456 and 1298?",
      options:["2158","4644","4754","4854"], answer:3,
      solution:{
        method:"Column Addition",
        steps:["  3 4 5 6", "+ 1 2 9 8", "─────────", "O: 6+8=14 → write 4, carry 1", "T: 5+9+1=15 → write 5, carry 1", "H: 4+2+1=7", "Th: 3+1=4", "─────────", "  4 7 5 4"],
        tip:"Always add from the ONES column first →"
      }
    },
    { id:"m03", difficulty:"core", topic:"Numbers",
      q:"Arrange the following numbers in decreasing order: 7450, 7540, 7405",
      options:["7540, 7450, 7405","7540, 7405, 7450","7405, 7450, 7540","7450, 7405, 7540"], answer:0,
      solution:{
        method:"Compare Place by Place",
        steps:["7 5 4 0  ← H=5 (biggest)", "7 4 5 0  ← H=4, T=5", "7 4 0 5  ← H=4, T=0 (smallest)", "─────────────────", "Decreasing: 7540 > 7450 > 7405"],
        tip:"Compare LEFT to RIGHT — first different digit decides!"
      }
    },
    { id:"m04", difficulty:"foundation", topic:"Multiplication",
      q:"8 × 6 is the same as _______.",
      options:["8 + 6","6 + 6 + 6 + 6 + 6 + 6 + 6 + 6","8 × 8 × 8 × 8 × 8 × 8","8 + 8 + 8 + 8 + 8 + 8"], answer:3,
      solution:{
        method:"Multiplication Table",
        steps:["8 × 6 = ?", "8 × 1 = 8", "8 × 2 = 16", "8 × 3 = 24", "8 × 4 = 32", "8 × 5 = 40", "8 × 6 = 48", "= 8+8+8+8+8+8 ← 6 eights"],
        tip:"8×6 = add 8 six times"
      }
    },
    { id:"m05", difficulty:"foundation", topic:"Money",
      q:"Jenny has $45.20. Her father gives her $10. How much does she have now?",
      options:["$35.20","$46.20","$55.20","$50.20"], answer:2,
      solution:{
        method:"Money Addition",
        steps:["  $ 4 5 . 2 0", "+ $ 1 0 . 0 0", "─────────────", "  $ 5 5 . 2 0"],
        tip:"Line up the decimal points!"
      }
    },
    { id:"m06", difficulty:"stretch", topic:"Division",
      q:"When a number is divided by 7, the quotient is 12 and the remainder is 3. What is the number?",
      options:["84","87","81","22"], answer:1,
      solution:{
        method:"Work Backwards",
        steps:["Quotient × Divisor = ?", "   12    ×    7   = 84", "", "84 + Remainder = Answer", "84 +     3     = 87", "", "Check: 87 ÷ 7 = 12 r 3 ✓"],
        tip:"Number = (Q × D) + R"
      }
    },
    { id:"m07", difficulty:"foundation", topic:"Numbers",
      q:"In 4519, the value of the digit 5 is _______.",
      options:["5","50","500","5000"], answer:2,
      solution:{
        method:"Place Value Chart",
        steps:["Th  H  T  O", " 4  5  1  9", "    ↑", "5 is in HUNDREDS", "Value = 5 × 100 = 500"],
        tip:"Value = digit × its column (1 / 10 / 100 / 1000)"
      }
    },
    { id:"m08", difficulty:"core", topic:"Division",
      q:"Which of the following leaves NO remainder when divided by 4?",
      options:["14","46","58","72"], answer:3,
      solution:{
        method:"Division Check",
        steps:["14 ÷ 4 = 3 r 2  ✗", "46 ÷ 4 = 11 r 2  ✗", "58 ÷ 4 = 14 r 2  ✗", "72 ÷ 4 = 18 r 0  ✓", "Answer: 72"],
        tip:"No remainder = divisible exactly"
      }
    },
    { id:"m09", difficulty:"core", topic:"Money",
      q:"Mr Tan bought trousers for $73.40. He gave the cashier two $50 notes. How much change did he receive?",
      options:["$23.40","$26.60","$123.40","$173.40"], answer:1,
      solution:{
        method:"Change Calculation",
        steps:["2 × $50 = $100.00", "", "  $ 1 0 0 . 0 0", "−  $ 7 3 . 4 0", "────────────────", "  $  2 6 . 6 0"],
        tip:"Change = Given − Price"
      }
    },
    { id:"m10", difficulty:"foundation", topic:"Numbers",
      q:"In 7394, the digit 9 is in the _______ place.",
      options:["ones","tens","hundreds","thousands"], answer:1,
      solution:{
        method:"Place Value Chart",
        steps:["Th  H  T  O", " 7  3  9  4", "       ↑", "9 is in TENS place"],
        tip:"Count from RIGHT: O · T · H · Th"
      }
    },
    { id:"m11", difficulty:"foundation", topic:"Multiplication",
      q:"7 × 8 is the same as _______.",
      options:["7 + 8","8 + 8 + 8 + 8 + 8 + 8 + 8","7 × 7 × 7 × 7 × 7 × 7 × 7 × 7","7 + 7 + 7 + 7 + 7 + 7 + 7 + 7"], answer:3,
      solution:{
        method:"Multiplication Table",
        steps:["7 × 8 = ?", "7 × 8 = 7+7+7+7+7+7+7+7", "     = 14+14+14+14", "     = 28+28", "     = 56"],
        tip:"7×8 = add 7 eight times"
      }
    },
    { id:"m12", difficulty:"foundation", topic:"Addition",
      q:"What is the sum of 5134 and 2865?",
      options:["7989","7999","8099","8999"], answer:1,
      solution:{
        method:"Column Addition",
        steps:["  5 1 3 4", "+ 2 8 6 5", "─────────", "O: 4+5=9", "T: 3+6=9", "H: 1+8=9", "Th: 5+2=7", "─────────", "  7 9 9 9"],
        tip:"No carrying needed here — each column ≤ 9"
      }
    },
    { id:"m13", difficulty:"core", topic:"Subtraction",
      q:"Subtract 3245 from 6000.",
      options:["2755","2855","3245","3755"], answer:0,
      solution:{
        method:"Column Subtraction",
        steps:["  6 0 0 0", "− 3 2 4 5", "─────────", "Borrow: 6000 → 5|9|9|10", "O: 10−5=5", "T: 9−4=5", "H: 9−2=7", "Th: 5−3=2", "─────────", "  2 7 5 5"],
        tip:"When you see 0s, borrow from the left!"
      }
    },
    { id:"m14", difficulty:"core", topic:"Division",
      q:"What is the remainder when 569 is divided by 7?",
      options:["1","2","3","4"], answer:1,
      solution:{
        method:"Long Division",
        steps:["  8 1", "7 ) 5 6 9", "   5 6  ↓", "   ─────", "     0 9", "     0 7", "     ───", "       2  ← Remainder", "Answer: 569 ÷ 7 = 81 r 2"],
        tip:"Remainder = what's left over"
      }
    },
    { id:"m15", difficulty:"core", topic:"Multiplication",
      q:"A stationery shop sells markers in boxes of 8. If it sold 45 boxes, how many markers were sold?",
      options:["53","320","360","400"], answer:2,
      solution:{
        method:"Multiplication",
        steps:["  4 5", "×  8", "────", "8×5 = 40 → write 0, carry 4", "8×4 = 32+4 = 36", "────", "  3 6 0", "Answer: 360 markers"],
        tip:"45×8: multiply ones first, then tens"
      }
    },
    { id:"m16", difficulty:"core", topic:"Numbers",
      q:"What is the product of 500 and 7?",
      options:["350","507","3500","5007"], answer:2,
      solution:{
        method:"Multiplication with Zeros",
        steps:["500 × 7", "= 5 × 7 × 100", "= 35 × 100", "= 3500"],
        tip:"Ignore zeros, multiply, then add zeros back"
      }
    },
    { id:"m17", difficulty:"core", topic:"Addition",
      q:"Find the missing number: _______ + 1500 = 4200",
      options:["2700","2600","3700","5700"], answer:0,
      solution:{
        method:"Missing Addend",
        steps:["? + 1500 = 4200", "", "  4 2 0 0", "− 1 5 0 0", "─────────", "  2 7 0 0", "", "Check: 2700 + 1500 = 4200 ✓"],
        tip:"? = Total − Known part"
      }
    },
    { id:"m18", difficulty:"stretch", topic:"Subtraction",
      q:"Subtract 4567 from 8000.",
      options:["3433","3533","4433","4533"], answer:0,
      solution:{
        method:"Column Subtraction",
        steps:["  8 0 0 0", "− 4 5 6 7", "─────────", "Borrow: 8000 → 7|9|9|10", "O: 10−7=3", "T: 9−6=3", "H: 9−5=4", "Th: 7−4=3", "─────────", "  3 4 3 3"],
        tip:"Multiple zeros: borrow from thousands"
      }
    },
    { id:"m19", difficulty:"core", topic:"Addition",
      q:"What is the sum of 2345 and 6789?",
      options:["8024","8134","9034","9134"], answer:3,
      solution:{
        method:"Column Addition",
        steps:["  2 3 4 5", "+ 6 7 8 9", "─────────", "O: 5+9=14 → write 4, carry 1", "T: 4+8+1=13 → write 3, carry 1", "H: 3+7+1=11 → write 1, carry 1", "Th: 2+6+1=9", "─────────", "  9 1 3 4"],
        tip:"Carry over when column sum ≥ 10"
      }
    },
    { id:"m20", difficulty:"stretch", topic:"Subtraction",
      q:"Find the difference between 7000 and 1458.",
      options:["5542","5642","6542","8458"], answer:0,
      solution:{
        method:"Column Subtraction",
        steps:["  7 0 0 0", "− 1 4 5 8", "─────────", "Borrow: 7000 → 6|9|9|10", "O: 10−8=2", "T: 9−5=4", "H: 9−4=5", "Th: 6−1=5", "─────────", "  5 5 4 2"],
        tip:"Cascade borrow through all zeros"
      }
    },
  ],

  // ── Section B: Short Answer (28 questions) ───────────────
  ShortAnswer: [
    { id:"s01", difficulty:"foundation", topic:"Numbers",
      q:"Write eight thousand, nine hundred and five in numerals.",
      answer:"8905", unit:"",
      solution:{
        method:"Place Value",
        steps:["Th  H  T  O", " 8  9  0  5", "↑            → 8 thousands = 8000", "    ↑        → 9 hundreds  =  900", "       ↑     → 0 tens      =    0", "          ↑  → 5 ones      =    5", "─────────────────────────", "8000+900+0+5 = 8905"],
        tip:"No tens mentioned → write 0 in the T column!"
      }
    },
    { id:"s02", difficulty:"stretch", topic:"Numbers",
      q:"Use all digits 3, 0, 7, 2 to form the smallest 4-digit odd number. (Each digit used once.)",
      answer:"2037", unit:"",
      solution:{
        method:"Smallest Odd Number",
        steps:["Digits: 3  0  7  2", "Need: ODD → last digit = 3 or 7", "", "Try O=7: remaining = {0,2,3}", "Th  H  T  O", " 2  0  3  7  → 2037", "", "Try O=3: remaining = {0,2,7}", "Th  H  T  O", " 2  0  7  3  → 2073", "", "2037 < 2073 → Answer: 2037"],
        tip:"Smallest + Odd: smallest odd digit goes LAST, then fill smallest to largest"
      }
    },
    { id:"s03", difficulty:"foundation", topic:"Patterns",
      q:"Find the missing number in the pattern: 3450, 3550, 3650, _____, 3850",
      answer:"3750", unit:"",
      solution:{
        method:"Number Pattern",
        steps:["3450 → 3550 → 3650 → ? → 3850", "        +100    +100       +100", "", "Rule: +100 each time", "3650 + 100 = 3750", "", "Check: 3750 + 100 = 3850 ✓"],
        tip:"Find the gap between any two consecutive numbers"
      }
    },
    { id:"s04", difficulty:"core", topic:"Division",
      q:"What is the remainder when 458 is divided by 6?",
      answer:"2", unit:"",
      solution:{
        method:"Long Division",
        steps:["   7 6", "6 ) 4 5 8", "   4 2  ↓", "   ─────", "     3 8", "     3 6", "     ───", "       2  ← Remainder", "Answer: 458 ÷ 6 = 76 r 2"],
        tip:"Remainder = 458 − (6 × 76) = 458 − 456 = 2"
      }
    },
    { id:"s05", difficulty:"core", topic:"Money",
      q:"A shirt costs $35.50. A pair of pants costs $12.40 more than the shirt. How much does the pair of pants cost?",
      answer:"47.90", unit:"$",
      solution:{
        method:"Bar Model + Column Addition",
        steps:["Shirt  [    $35.50    ]", "Pants  [    $35.50    ][+$12.40]", "              ?", "", "  $ 3 5 . 5 0", "+ $ 1 2 . 4 0", "─────────────", "  $ 4 7 . 9 0"],
        tip:"'More than' → add the extra"
      }
    },
    { id:"s06", difficulty:"core", topic:"Multiplication",
      q:"Find the product of 148 and 8.",
      answer:"1184", unit:"",
      solution:{
        method:"Long Multiplication",
        steps:["    1 4 8", "  ×     8", "  ───────", "  8×8=64 → write 4, carry 6", "  8×4=32 +6=38 → write 8, carry 3", "  8×1=8  +3=11 → write 11", "  ───────", "  1 1 8 4"],
        tip:"Multiply from ONES → TENS → HUNDREDS"
      }
    },
    { id:"s07", difficulty:"core", topic:"Addition",
      q:"The sum of two numbers is 3400. One of the numbers is 1250. What is the other number?",
      answer:"2150", unit:"",
      solution:{
        method:"Part-Whole Model",
        steps:["Total    [         3400        ]", "Part 1   [  1250  ] Part 2 [?]", "", "  3 4 0 0", "− 1 2 5 0", "─────────", "  2 1 5 0", "", "Check: 1250 + 2150 = 3400 ✓"],
        tip:"Part 2 = Total − Part 1"
      }
    },
    { id:"s08", difficulty:"core", topic:"Division",
      q:"Mrs Lee baked 145 tarts. She packed them into boxes of 6. How many tarts were left unpacked?",
      answer:"1", unit:"",
      solution:{
        method:"Long Division",
        steps:["   2 4", "6 ) 1 4 5", "   1 2  ↓", "   ─────", "     2 5", "     2 4", "     ───", "       1  ← Remainder", "1 tart left unpacked"],
        tip:"The remainder = tarts that couldn't fill a box"
      }
    },
    { id:"s09", difficulty:"core", topic:"Numbers",
      q:"Find the value of 608 × 9.",
      answer:"5472", unit:"",
      solution:{
        method:"Long Multiplication",
        steps:["    6 0 8", "  ×     9", "  ───────", "  9×8=72 → write 2, carry 7", "  9×0=0  +7=7 → write 7  ← don't skip!", "  9×6=54 → write 54", "  ───────", "  5 4 7 2"],
        tip:"608 has a 0 in tens — still multiply! 9×0=0"
      }
    },
    { id:"s10", difficulty:"stretch", topic:"Division",
      q:"What is the quotient when 804 is divided by 6?",
      answer:"134", unit:"",
      solution:{
        method:"Long Division",
        steps:["    1 3 4", "6 ) 8 0 4", "    6    ↓↓", "    ──────", "    2 0  ↓", "    1 8  ↓", "    ──────", "      2 4", "      2 4", "      ───", "        0", "Answer: 134"],
        tip:"D→M→S→B: Divide, Multiply, Subtract, Bring down"
      }
    },
    { id:"s11", difficulty:"core", topic:"Subtraction",
      q:"Find the missing number: 5400 − _____ = 1850",
      answer:"3550", unit:"",
      solution:{
        method:"Missing Subtrahend",
        steps:["5400 − ? = 1850", "? = 5400 − 1850", "", "  5 4 0 0", "− 1 8 5 0", "─────────", "  3 5 5 0", "", "Check: 5400 − 3550 = 1850 ✓"],
        tip:"? = big number − result"
      }
    },
    { id:"s12", difficulty:"stretch", topic:"Multiplication",
      q:"Find the missing number: 4 groups of 8 = _____ + 12",
      answer:"20", unit:"",
      solution:{
        method:"Balance Equation",
        steps:["4 × 8 = ? + 12", "", "Left side:  4 × 8 = 32", "", "32 = ? + 12", "?  = 32 − 12", "?  = 20", "", "Check: 4×8 = 20+12 → 32=32 ✓"],
        tip:"Calculate the known side first!"
      }
    },
    { id:"s13", difficulty:"core", topic:"Numbers",
      q:"Write 9 thousands and 34 ones in numerals.",
      answer:"9034", unit:"",
      solution:{
        method:"Place Value",
        steps:["34 ones = 3 tens + 4 ones", "", "Th  H  T  O", " 9  0  3  4", "↑   ↑  ↑  ↑", "9k  0 34ones", "", "Answer: 9034"],
        tip:"TRAP: 34 ones = 3 tens + 4 ones. Put 3 in T column, 4 in O column. Answer is 9034, NOT 934!"
      }
    },
    { id:"s14", difficulty:"stretch", topic:"Numbers",
      q:"Find the sum of the values of digit 6 in 6204 and 2761.",
      answer:"6060", unit:"",
      solution:{
        method:"Place Value × 2",
        steps:["6204:  Th H T O", "        6 2 0 4", "        ↑ → 6 × 1000 = 6000", "", "2761:  Th H T O", "        2 7 6 1", "              ↑ ... no", "           ↑ → 6 × 10 = 60", "", "  6000", "+   60", "──────", "  6060"],
        tip:"Same digit, different position = different VALUE"
      }
    },
    { id:"s15", difficulty:"core", topic:"Multiplication",
      q:"Multiply 106 by 5.",
      answer:"530", unit:"",
      solution:{
        method:"Long Multiplication",
        steps:["    1 0 6", "  ×     5", "  ───────", "  5×6=30 → write 0, carry 3", "  5×0=0  +3=3 → write 3", "  5×1=5  → write 5", "  ───────", "    5 3 0"],
        tip:"0 in the middle: still multiply! 5×0=0"
      }
    },
    { id:"s16", difficulty:"foundation", topic:"Measurement",
      q:"Write 2 kilograms 25 grams in grams.",
      answer:"2025", unit:"g",
      solution:{
        method:"Unit Conversion",
        steps:["1 kg = 1000 g", "", "2 kg = 2 × 1000 = 2000 g", "", "2000 g + 25 g = 2025 g"],
        tip:"kg → g: multiply by 1000"
      }
    },
    { id:"s17", difficulty:"core", topic:"Money",
      q:"Ming wanted to buy a board game for $82.40. He had $27.80. How much MORE money does he need?",
      answer:"54.60", unit:"$",
      solution:{
        method:"Column Subtraction",
        steps:["Need = Price − Have", "", "  $ 8 2 . 4 0", "− $ 2 7 . 8 0", "─────────────", "  $ 5 4 . 6 0"],
        tip:"How much MORE needed = Price − Money he has"
      }
    },
    { id:"s18", difficulty:"stretch", topic:"Fractions",
      q:"Find the value of 2/5 − 3/10.",
      answer:"1/10", unit:"",
      solution:{
        method:"Common Denominator",
        steps:["2/5 − 3/10", "", "2/5 = 4/10  (×2 top and bottom)", "", "4/10 − 3/10 = 1/10", "", "Answer: 1/10"],
        tip:"Make denominators the SAME before subtracting"
      }
    },
    { id:"s19", difficulty:"foundation", topic:"Numbers",
      q:"Write seven hundred and twelve in numerals.",
      answer:"712", unit:"",
      solution:{
        method:"Place Value",
        steps:["seven hundred → 700 → H = 7", "twelve = 10 + 2 → T = 1, O = 2", "", "H  T  O", "7  1  2", "", "Answer: 712"],
        tip:"'Twelve' gives you both T and O digits!"
      }
    },
    { id:"s20", difficulty:"foundation", topic:"Patterns",
      q:"Find the missing number: 120, 130, 140, _____, 160, 170",
      answer:"150", unit:"",
      solution:{
        method:"Number Pattern",
        steps:["120 → 130 → 140 → ? → 160 → 170", "      +10    +10       +10   +10", "", "Rule: +10", "140 + 10 = 150"],
        tip:"Find the gap, then apply the rule"
      }
    },
    { id:"s21", difficulty:"foundation", topic:"Addition",
      q:"Add 485 and 236.",
      answer:"721", unit:"",
      solution:{
        method:"Column Addition",
        steps:["  4 8 5", "+ 2 3 6", "───────", "O: 5+6=11 → write 1, carry 1", "T: 8+3+1=12 → write 2, carry 1", "H: 4+2+1=7", "───────", "  7 2 1"],
        tip:"Start from ones, carry when ≥ 10"
      }
    },
    { id:"s22", difficulty:"core", topic:"Addition",
      q:"Add 3648 and 2954.",
      answer:"6602", unit:"",
      solution:{
        method:"Column Addition",
        steps:["  3 6 4 8", "+ 2 9 5 4", "─────────", "O: 8+4=12 → write 2, carry 1", "T: 4+5+1=10 → write 0, carry 1", "H: 6+9+1=16 → write 6, carry 1", "Th: 3+2+1=6", "─────────", "  6 6 0 2"],
        tip:"Carry in EVERY column possible here!"
      }
    },
    { id:"s23", difficulty:"stretch", topic:"Subtraction",
      q:"Subtract 1987 from 4050.",
      answer:"2063", unit:"",
      solution:{
        method:"Column Subtraction",
        steps:["  4 0 5 0", "− 1 9 8 7", "─────────", "O: 0→borrow → 10−7=3", "T: 4→3(lent)→3−8→borrow→13−8=5", "H: 0→borrow → 9−9=0... wait", "Easier: 4050−2000=2050, +13=2063", "─────────", "  2 0 6 3", "Check: 2063+1987=4050 ✓"],
        tip:"Round 1987→2000, subtract, add back 13"
      }
    },
    { id:"s24", difficulty:"core", topic:"Multiplication",
      q:"Find the product of 238 and 7.",
      answer:"1666", unit:"",
      solution:{
        method:"Long Multiplication",
        steps:["    2 3 8", "  ×     7", "  ───────", "  7×8=56 → write 6, carry 5", "  7×3=21 +5=26 → write 6, carry 2", "  7×2=14 +2=16 → write 16", "  ───────", "  1 6 6 6"],
        tip:"Always add the carry BEFORE writing down"
      }
    },
    { id:"s25", difficulty:"core", topic:"Numbers",
      q:"Write 8000 + 40 + 5 as a 4-digit number.",
      answer:"8045", unit:"",
      solution:{
        method:"Expanded Form",
        steps:["8000 + 40 + 5", "", "Th  H  T  O", " 8  0  4  5", "↑   ↑  ↑  ↑", "8k  0  4  5", "", "Answer: 8045 (not 845!)"],
        tip:"No hundreds → H = 0, must be placeholder"
      }
    },
    { id:"s26", difficulty:"core", topic:"Patterns",
      q:"Find the missing number: 2450, 2600, 2750, ___, 3050, 3200",
      answer:"2900", unit:"",
      solution:{
        method:"Number Pattern",
        steps:["2450 → 2600 → 2750 → ? → 3050 → 3200", "       +150    +150       +150   +150", "", "Rule: +150", "2750 + 150 = 2900", "Check: 2900+150=3050 ✓"],
        tip:"The gap is 150, not 100 — always calculate!"
      }
    },
    { id:"s27", difficulty:"foundation", topic:"Addition",
      q:"What number must be added to 3400 to make 8000?",
      answer:"4600", unit:"",
      solution:{
        method:"Missing Addend",
        steps:["3400 + ? = 8000", "", "  8 0 0 0", "− 3 4 0 0", "─────────", "  4 6 0 0", "", "Check: 3400+4600=8000 ✓"],
        tip:"? = Total − Known part"
      }
    },
    { id:"s28", difficulty:"core", topic:"Multiplication",
      q:"Find the product of 105 and 8.",
      answer:"840", unit:"",
      solution:{
        method:"Long Multiplication",
        steps:["    1 0 5", "  ×     8", "  ───────", "  8×5=40 → write 0, carry 4", "  8×0=0  +4=4 → write 4", "  8×1=8  → write 8", "  ───────", "    8 4 0"],
        tip:"Middle zero: 8×0=0, then add carry!"
      }
    },
  ],

  // ── Section C: Problem Sums ───────────────────────────────
  ProblemSum: [
    { id:"p01", difficulty:"core", topic:"Word Problem",
      q:"There are 1250 boys in a school. There are 380 fewer girls than boys.\n(a) How many girls are there?\n(b) How many students altogether?",
      parts:[
        { label:"(a) Number of girls", answer:"870",
          solution:{
            method:"Bar Model",
            steps:["Boys  [          1250          ]", "Girls [      ?      ] 380 fewer", "", "Girls = 1250 − 380", "", "  1 2 5 0", "−   3 8 0", "─────────", "    8 7 0 boys"],
            tip:"'Fewer than' → subtract from the bigger number"
          }
        },
        { label:"(b) Total students", answer:"2120",
          solution:{
            method:"Addition",
            steps:["Total = Boys + Girls", "", "  1 2 5 0  (boys)", "+   8 7 0  (girls)", "─────────", "  2 1 2 0  students"],
            tip:"'Altogether' = add both groups"
          }
        }
      ]
    },
    { id:"p02", difficulty:"core", topic:"Word Problem",
      q:"Mr Tan bought 8 boxes of pens. There were 24 pens in each box. He gave 45 pens to his students. How many pens did he have left?",
      parts:[
        { label:"Pens left", answer:"147",
          solution:{
            method:"×  then  −",
            steps:["Step 1: Total pens", "  2 4", "×  8", "────", "  192 pens", "", "Step 2: Pens left", "  192 − 45 = 147 pens"],
            tip:"Find total FIRST, then subtract what was used"
          }
        }
      ]
    },
    { id:"p03", difficulty:"stretch", topic:"Word Problem",
      q:"Mary saved $140. She saved 4 times as much as Peter. How much did they save altogether?",
      parts:[
        { label:"Total savings", answer:"$175",
          solution:{
            method:"Bar Model (÷)",
            steps:["【Concept 1: Times As Much → Divide to find 1 unit】", "Mary  [====][====][====][====]  $140", "Peter [====]   ← 1 unit = ?", "1 unit = $140 ÷ 4 = $35  (Peter\'s savings)", "", "【Concept 2: Altogether → Add Both】", "Total = Mary + Peter", "Total = $140 + $35 = $175"],
            tip:"'4 times as much' → divide to find 1 unit"
          }
        }
      ]
    },
    { id:"p04", difficulty:"core", topic:"Word Problem",
      q:"A baker baked 420 cupcakes. He sold 215 in the morning and packed the rest equally into 5 boxes. How many cupcakes in each box?",
      parts:[
        { label:"Cupcakes per box", answer:"41",
          solution:{
            method:"−  then  ÷",
            steps:["Step 1: Remaining cupcakes", "420 − 215 = 205", "", "Step 2: Per box", "  2 0 5 ÷ 5", "", "   4 1", "5) 2 0 5", "   2 0", "   ───", "     0 5", "     0 5", "     ───", "       0", "Answer: 41 per box"],
            tip:"Find the 'rest' first, then divide equally"
          }
        }
      ]
    },
    { id:"p05", difficulty:"stretch", topic:"Word Problem",
      q:"Ahmad and Ben have 640 marbles altogether. Ahmad has 120 more than Ben. How many marbles does Ben have?",
      parts:[
        { label:"Ben's marbles", answer:"260",
          solution:{
            method:"Bar Model",
            steps:["【Concept 1: Bar Model — Draw It Out】", "Ahmad [====][====][+120]", "Ben   [====]", "Total: 640", "", "【Concept 2: Remove Extra, Then Halve】", "2 equal parts = 640 − 120 = 520", "1 part (Ben)  = 520 ÷ 2 = 260", "", "Check: Ben=260, Ahmad=260+120=380", "       260+380 = 640 ✓"],
            tip:"Strip the extra first, then halve"
          }
        }
      ]
    },
    { id:"p06", difficulty:"stretch", topic:"Word Problem",
      q:"A dress costs $58.50. It costs $15.20 more than a skirt.\n(a) How much does the skirt cost?\n(b) Jane bought 1 dress and 1 skirt. She gave $150. How much change?",
      parts:[
        { label:"(a) Skirt cost", answer:"$43.30",
          solution:{
            method:"Bar Model",
            steps:["【Concept: \'More than\' → Find the cheaper item】", "Dress costs $15.20 MORE than Skirt", "So: Skirt = Dress − $15.20", "  $58.50", "− $15.20", "--------", "  $43.30"],
            tip:"Dress costs MORE → Skirt = Dress − extra"
          }
        },
        { label:"(b) Change received", answer:"$48.20",
          solution:{
            method:"Add then Change",
            steps:["Total = $58.50 + $43.30 = $101.80", "", "  $ 1 5 0 . 0 0", "− $ 1 0 1 . 8 0", "───────────────", "  $   4 8 . 2 0"],
            tip:"Change = Given − Total cost"
          }
        }
      ]
    },
    { id:"p07", difficulty:"core", topic:"Word Problem",
      q:"Factory A produces 3450 bags. Factory B produces 850 fewer bags.\n(a) How many bags does Factory B produce?\n(b) How many bags do both factories produce altogether?",
      parts:[
        { label:"(a) Factory B bags", answer:"2600",
          solution:{
            method:"Subtraction",
            steps:["Factory A [          3450          ]", "Factory B [       ?      ] 850 less", "", "  3 4 5 0", "−   8 5 0", "─────────", "  2 6 0 0 bags"],
            tip:"'850 fewer' → subtract"
          }
        },
        { label:"(b) Total bags", answer:"6050",
          solution:{
            method:"Addition",
            steps:["  3 4 5 0  (A)", "+ 2 6 0 0  (B)", "─────────", "  6 0 5 0  bags"],
            tip:"Both factories together = add"
          }
        }
      ]
    },
    { id:"p08", difficulty:"core", topic:"Word Problem",
      q:"A florist has 300 roses. She packs them into bouquets of 9 roses each.\n(a) Greatest number of bouquets she can make?\n(b) How many roses left unpacked?",
      parts:[
        { label:"(a) Number of bouquets", answer:"33",
          solution:{
            method:"Long Division",
            steps:["   3 3", "9) 3 0 0", "   2 7  ↓", "   ──────", "     3 0", "     2 7", "     ───", "       3  ← Remainder", "33 complete bouquets"],
            tip:"Quotient = complete groups"
          }
        },
        { label:"(b) Roses unpacked", answer:"3",
          solution:{
            method:"Remainder",
            steps:["300 − (9 × 33)", "= 300 − 297", "= 3 roses left"],
            tip:"Remainder = leftover after dividing"
          }
        }
      ]
    },
    { id:"p09", difficulty:"foundation", topic:"Word Problem",
      q:"There are 1250 girls in a school. There are 250 more boys than girls.\n(a) How many boys?\n(b) How many students altogether?",
      parts:[
        { label:"(a) Number of boys", answer:"1500",
          solution:{
            method:"Addition",
            steps:["Boys = Girls + 250", "", "  1 2 5 0  (girls)", "+   2 5 0", "─────────", "  1 5 0 0  boys"],
            tip:"'More than' → add"
          }
        },
        { label:"(b) Total students", answer:"2750",
          solution:{
            method:"Addition",
            steps:["  1 2 5 0  (girls)", "+ 1 5 0 0  (boys)", "─────────", "  2 7 5 0  students"],
            tip:""
          }
        }
      ]
    },
    { id:"p10", difficulty:"core", topic:"Word Problem",
      q:"Mrs Wong bought 7 packets of sweets. There were 35 sweets in each packet. She gave 68 sweets to her neighbours. How many sweets did she have left?",
      parts:[
        { label:"Sweets left", answer:"177",
          solution:{
            method:"×  then  −",
            steps:["Step 1: Total sweets", "  3 5", "×  7", "────", "  7×5=35 → write 5, carry 3", "  7×3=21 +3=24", "  245 sweets", "", "Step 2: Left", "  245 − 68 = 177 sweets"],
            tip:"Find total first, then subtract given away"
          }
        }
      ]
    },
    { id:"p11", difficulty:"core", topic:"Word Problem",
      q:"John saved $180. He saved 3 times as much as his sister. How much did they save altogether?",
      parts:[
        { label:"Total savings", answer:"$240",
          solution:{
            method:"Bar Model (÷)",
            steps:["John   [===][===][===]  $180", "Sister [===]              ?", "        1 unit", "", "1 unit = $180 ÷ 3 = $60 (sister)", "", "Total = $180 + $60 = $240"],
            tip:"'3 times as much' → divide to find 1 unit"
          }
        }
      ]
    },
    { id:"p12", difficulty:"core", topic:"Word Problem",
      q:"A farmer collected 530 eggs. He sold 260 in the morning and packed the rest equally into 6 trays. How many eggs in each tray?",
      parts:[
        { label:"Eggs per tray", answer:"45",
          solution:{
            method:"−  then  ÷",
            steps:["Step 1: Eggs left", "530 − 260 = 270 eggs", "", "Step 2: Per tray", "   4 5", "6) 2 7 0", "   2 4  ↓", "   ──────", "     3 0", "     3 0", "     ───", "       0", "Answer: 45 eggs per tray"],
            tip:"Subtract first, then divide"
          }
        }
      ]
    },
    { id:"p13", difficulty:"stretch", topic:"Word Problem",
      q:"Sarah and Lily have 750 stickers altogether. Lily has 150 more stickers than Sarah. How many stickers does Sarah have?",
      parts:[
        { label:"Sarah's stickers", answer:"300",
          solution:{
            method:"Bar Model",
            steps:["Sarah [====]", "Lily  [====][+150]", "Total: 750", "", "2 equal parts = 750 − 150 = 600", "Sarah = 600 ÷ 2 = 300", "", "Lily = 300 + 150 = 450", "Check: 300 + 450 = 750 ✓"],
            tip:"Remove the extra, then halve"
          }
        }
      ]
    },
    { id:"p14", difficulty:"stretch", topic:"Word Problem",
      q:"A pair of shoes costs $65.50. It costs $22.40 more than a shirt.\n(a) How much does the shirt cost?\n(b) Ali bought 1 pair of shoes and 1 shirt. He gave $150. How much change?",
      parts:[
        { label:"(a) Shirt cost", answer:"$43.10",
          solution:{
            method:"Bar Model",
            steps:["Shoes  [    ?    ][+$22.40]  = $65.50", "Shirt  [    ?    ]", "", "  $ 6 5 . 5 0", "− $ 2 2 . 4 0", "─────────────", "  $ 4 3 . 1 0"],
            tip:"Shirt (cheaper) = Shoes − extra"
          }
        },
        { label:"(b) Change received", answer:"$41.40",
          solution:{
            method:"Add then Change",
            steps:["  $ 6 5 . 5 0  (shoes)", "+ $ 4 3 . 1 0  (shirt)", "─────────────", "  $ 1 0 8 . 6 0  total", "", "  $ 1 5 0 . 0 0", "− $ 1 0 8 . 6 0", "───────────────", "  $   4 1 . 4 0  change"],
            tip:"Always find total cost first"
          }
        }
      ]
    },
    { id:"p15", difficulty:"core", topic:"Word Problem",
      q:"There are 3 schools: A, B, and C. School A has 1200 students. School B has 350 more than A. School C has 180 fewer than B. How many students in School C?",
      parts:[
        { label:"Students in School C", answer:"1370",
          solution:{
            method:"Chain Model",
            steps:["A = 1200", "B = 1200 + 350 = 1550", "C = 1550 − 180 = 1370", "", "  1 5 5 0", "−   1 8 0", "─────────", "  1 3 7 0 students"],
            tip:"Work A → B → C in order"
          }
        }
      ]
    },
    { id:"p16", difficulty:"core", topic:"Word Problem",
      q:"A bookshop owner bought 5 cartons of notebooks. Each carton had 150 notebooks. He then bought another 345 loose notebooks. How many notebooks altogether?",
      parts:[
        { label:"Total notebooks", answer:"1095",
          solution:{
            method:"×  then  +",
            steps:["Step 1: In cartons", "  1 5 0", "×     5", "───────", "    750", "", "Step 2: Total", "  750 + 345 = 1095 notebooks"],
            tip:"Two groups: multiply one, then add the other"
          }
        }
      ]
    },
    { id:"p17", difficulty:"core", topic:"Word Problem",
      q:"There are 3 fish tanks A, B, C. Tank A has 1250 fish. Tank B has 340 more than A. Tank C has 150 fewer than B. How many fish in Tank C?",
      parts:[
        { label:"Fish in Tank C", answer:"1440",
          solution:{
            method:"Chain Model",
            steps:["A = 1250", "B = 1250 + 340 = 1590", "C = 1590 − 150 = 1440", "", "Answer: 1440 fish"],
            tip:"Work step by step: A → B → C"
          }
        }
      ]
    },
    { id:"p18", difficulty:"foundation", topic:"Word Problem",
      q:"Mr Lee had $4000. He bought a TV for $1250 and a sofa for $1890.\n(a) How much did he spend altogether?\n(b) How much money did he have left?",
      parts:[
        { label:"(a) Total spent", answer:"$3140",
          solution:{
            method:"Column Addition",
            steps:["  $ 1 2 5 0  (TV)", "+ $ 1 8 9 0  (sofa)", "───────────", "  $ 3 1 4 0  spent"],
            tip:"Total spent = add all items"
          }
        },
        { label:"(b) Money left", answer:"$860",
          solution:{
            method:"Column Subtraction",
            steps:["  $ 4 0 0 0", "− $ 3 1 4 0", "───────────", "  $   8 6 0  left"],
            tip:"Left = Started − Spent"
          }
        }
      ]
    },
  ],
};


const MATH_PAST_PAPER = {
  school: "Ai Tong Primary School",
  year: "2024 Semestral Assessment 1",
  MCQ: [
    { id:"at_m01", topic:"Numbers",
      q:"In 5836, the digit 8 is in the _______ place.",
      options:["ones","tens","hundreds","thousands"], answer:2,
      solution:{method:"Place Value Chart",steps:["5|8|3|6 → Th|H|T|O","8 is in HUNDREDS place"],tip:"🧠 Count from right: O, T, H, Th"}
    },
    { id:"at_m02", topic:"Numbers",
      q:"Arrange the following in decreasing order: 4270, 4720, 4027",
      options:["4720, 4270, 4027","4720, 4027, 4270","4027, 4270, 4720","4270, 4027, 4720"], answer:0,
      solution:{method:"Compare Digit by Digit",steps:["All start with 4. Compare hundreds: 7>2>0","Decreasing: 4720 > 4270 > 4027"],tip:"🧠 Decreasing = largest first"}
    },
    { id:"at_m03", topic:"Addition",
      q:"What is the sum of 2468 and 3795?",
      options:["6163","6253","6263","6363"], answer:2,
      solution:{method:"Column Addition",steps:["Answer: 6263"],tip:"🧠 Add right to left, carry when ≥10!"}
    },
    { id:"at_m04", topic:"Multiplication",
      q:"6 × 9 is the same as _______.",
      options:["6 + 9","9 + 9 + 9 + 9 + 9 + 9","6 × 6 × 6 × 6 × 6 × 6 × 6 × 6 × 6","6 + 6 + 6 + 6 + 6 + 6 + 6 + 6 + 6"], answer:3,
      solution:{method:"Repeated Addition",steps:["6 × 9 = 6 added 9 times","= 6+6+6+6+6+6+6+6+6 = 54"],tip:"🧠 a × b = a added b times"}
    },
    { id:"at_m05", topic:"Division",
      q:"When a number is divided by 6, the quotient is 15 and the remainder is 4. What is the number?",
      options:["90","94","96","100"], answer:1,
      solution:{method:"Reverse Division",steps:["Number = (Quotient × Divisor) + Remainder","= (15 × 6) + 4","= 90 + 4 = 94"],tip:"🧠 Number = (Q × D) + R"}
    },
    { id:"at_m06", topic:"Money",
      q:"A book costs $12.85. A pen costs $3.40 less than the book. How much do they cost altogether?",
      options:["$9.45","$16.25","$22.30","$25.70"], answer:2,
      solution:{method:"Compare then Add",steps:["Pen = $12.85 - $3.40 = $9.45","Total = $12.85 + $9.45 = $22.30"],tip:"🧠 Find pen cost first, then add both!"}
    },
  ],
  ShortAnswer: [
    { id:"at_s01", topic:"Numbers",
      q:"Write six thousand, four hundred and eight in numerals.",
      answer:"6408", unit:"",
      solution:{method:"Place Value",steps:["6000 + 400 + 0 + 8 = 6408"],tip:"🧠 Remember the 0 in the tens place!"}
    },
    { id:"at_s02", topic:"Numbers",
      q:"Use all digits 4, 0, 6, 1 to form the largest 4-digit even number. (Each digit used once.)",
      answer:"6410", unit:"",
      solution:{method:"Largest Even Strategy",steps:["Answer: 6410"],tip:"🧠 Largest even: sort descending, ensure last digit is even"}
    },
    { id:"at_s03", topic:"Patterns",
      q:"Find the missing number: 5100, 5300, 5500, _____, 5900",
      answer:"5700", unit:"",
      solution:{method:"Number Pattern",steps:["5300-5100=200, pattern: +200","Missing = 5500 + 200 = 5700"],tip:"🧠 Find the rule (+200) then apply!"}
    },
    { id:"at_s04", topic:"Division",
      q:"What is the remainder when 347 is divided by 8?",
      answer:"3", unit:"",
      solution:{method:"Division",steps:["347 ÷ 8: 8×43=344","347 - 344 = 3","Remainder = 3"],tip:"🧠 Find the largest multiple of 8 ≤ 347"}
    },
    { id:"at_s05", topic:"Multiplication",
      q:"Find the product of 125 and 7.",
      answer:"875", unit:"",
      solution:{method:"Long Multiplication",steps:["125 × 7","= 100×7 + 25×7"],tip:"🧠 Split: 125 = 100+25, multiply each part!"}
    },
    { id:"at_s06", topic:"Addition",
      q:"The sum of two numbers is 4600. One number is 1850. What is the other?",
      answer:"2750", unit:"",
      solution:{method:"Part-Whole",steps:["Other = 4600 - 1850 = 2750"],tip:"🧠 Part + Part = Whole → Other = Whole - Known"}
    },
  ],
  ProblemSum: [
    { id:"at_p01", topic:"Word Problem",
      q:"There are 1350 pupils in Ai Tong Primary. There are 280 more girls than boys.\n(a) How many boys are there?\n(b) How many girls are there?",
      parts:[
        { label:"(a) Number of boys", answer:"535",
          solution:{method:"Bar Model",steps:["Boys + Girls = 1350","Girls = Boys + 280"],tip:"🧠 Bar Model: 2 equal parts + 280 extra = 1350. Equal part = (1350-280)÷2"}
        },
        { label:"(b) Number of girls", answer:"815",
          solution:{method:"Addition",steps:["Girls = 535 + 280 = 815"],tip:"🧠 Girls = Boys + extra"}
        }
      ]
    },
    { id:"at_p02", topic:"Word Problem",
      q:"Mr Lim bought 9 boxes of oranges. Each box had 48 oranges. He threw away 25 rotten oranges. How many good oranges did he have?",
      parts:[
        { label:"Good oranges", answer:"407",
          solution:{method:"Multiply then Subtract",steps:["Total = 9 × 48 = 432","Good = 432 - 25 = 407"],tip:"🧠 Find total first, then remove the rotten ones!"}
        }
      ]
    },
    { id:"at_p03", topic:"Word Problem",
      q:"A school has 5 classes of P3 students. Each class has 40 students. Of these, 85 students joined the art club. How many did NOT join the art club?",
      parts:[
        { label:"Students NOT in art club", answer:"115",
          solution:{method:"Multiply then Subtract",steps:["Total P3 = 5 × 40 = 200","Not in art club = 200 - 85 = 115"],tip:"🧠 Find total, subtract the ones who joined!"}
        }
      ]
    },
  ],
};

function buildMathPlan(sessionNum, level) {
  if (level==="pastpaper" || (sessionNum >= 11 && !LEVEL_MAP[level])) return buildMathPastPaper();
  const mcqItems = pickByLevel(MATH_QB.MCQ,        level, sessionNum, 6);
  const saItems  = pickByLevel(MATH_QB.ShortAnswer, level, sessionNum, 6);
  const psItems  = pickByLevel(MATH_QB.ProblemSum,  level, sessionNum, 4);
  return { mcqItems, saItems, psItems, sessionNum, isPastPaper: false, level };
}

function buildMathPastPaper() {
  return {
    mcqItems: MATH_PAST_PAPER.MCQ,
    saItems:  MATH_PAST_PAPER.ShortAnswer,
    psItems:  MATH_PAST_PAPER.ProblemSum,
    sessionNum: 11,
    isPastPaper: true,
    paperInfo: MATH_PAST_PAPER,
  };
}

function MWrap({children}){
  return <div style={{fontFamily:"Nunito,sans-serif",background:MC.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto"}}>{children}</div>;
}

function TopicBadge({topic}){
  const col = TOPIC_COLOR[topic] || "#64748B";
  return <span style={{background:col+"18",color:col,fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:9}}>{topic}</span>;
}

function SolutionBox({solution, show}){
  const [expanded, setExpanded] = useState(true);
  if(!show || !solution) return null;
  if(typeof solution !== 'object') return null;
  const steps = Array.isArray(solution.steps) ? solution.steps : [];
  const method = typeof solution.method === 'string' ? solution.method : '';
  const tip    = typeof solution.tip    === 'string' ? solution.tip    : '';

  function renderStep(step, i){
    if(!step) return null;
    // Safety: never render objects directly
    if(typeof step !== 'string') return null;
    const isAnswer  = /^Answer:|^Ans:/i.test(step);
    const isCheck   = /^Check:/i.test(step);
    const isColArith= /^[\s\d\$\+\-×÷×\.]+$/.test(step)  // pure number lines
                    || /^[─═]+$/.test(step.trim())         // divider lines
                    || /^\s*([\d\$]+[\s\d\.\$]*[│]?)/.test(step) && step.trim().length > 2;
    const isBarModel= step.includes('[') && step.includes(']');
    const isPV      = /^(Th|H|T|O)/.test(step.trim()) || /^\s*↑/.test(step) || step.includes('↑');
    const isLabel   = /^[A-Z][a-z]+:/.test(step) && !isAnswer && !isCheck; // "Step 1:", "O:", "T:"
    const isDivider = /^[─═\-]+$/.test(step.trim());
    const isRule    = /^Rule/.test(step) || /^Need:/.test(step);
    const isBlank   = step.trim() === '';

    if(isBlank) return <div key={i} style={{height:6}}/>;

    if(isAnswer) return(
      <div key={i} style={{background:"#065F46",borderRadius:8,padding:"7px 12px",
        marginTop:6,marginBottom:4,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:14}}>✅</span>
        <span style={{fontSize:14,fontWeight:900,color:"#fff",fontFamily:"monospace"}}>{step}</span>
      </div>
    );

    if(isCheck) return(
      <div key={i} style={{background:"#ECFDF5",borderRadius:7,padding:"5px 10px",
        marginTop:4,display:"flex",gap:6,alignItems:"center"}}>
        <span style={{fontSize:11}}>✔️</span>
        <span style={{fontSize:12,color:"#065F46",fontWeight:700,fontFamily:"monospace"}}>{step}</span>
      </div>
    );

    if(isDivider) return(
      <div key={i} style={{fontFamily:"monospace",color:"#94A3B8",
        fontSize:13,letterSpacing:.5,margin:"1px 0",paddingLeft:2}}>{step}</div>
    );

    if(isBarModel) return(
      <div key={i} style={{background:"#F8FAFC",border:"1px solid #E2E8F0",
        borderRadius:7,padding:"5px 10px",margin:"3px 0",
        fontFamily:"monospace",fontSize:12,color:"#1E3A6E",
        fontWeight:600,letterSpacing:.3,whiteSpace:"pre"}}>
        {step}
      </div>
    );

    if(isPV) return(
      <div key={i} style={{fontFamily:"monospace",fontSize:12,color:"#1D4ED8",
        fontWeight:700,letterSpacing:2,padding:"2px 4px",whiteSpace:"pre"}}>{step}</div>
    );

    // Column arithmetic: lines with digits, $, spaces, operators
    const looksNumeric = /^[\s\d\$\+\-×÷\.,:←↓↑→rR]+$/.test(step)
                      || /^\s*[\d\$]/.test(step) && /[\d]/.test(step);
    if(looksNumeric || step.startsWith('  ') && /\d/.test(step)) return(
      <div key={i} style={{fontFamily:"'Courier New',monospace",fontSize:13,
        color:"#0F172A",fontWeight:700,letterSpacing:1,
        padding:"1px 4px",whiteSpace:"pre"}}>{step}</div>
    );

    if(isLabel) return(
      <div key={i} style={{fontSize:12,fontWeight:700,color:"#0D9488",
        marginTop:5,marginBottom:2}}>{step}</div>
    );

    if(isRule) return(
      <div key={i} style={{background:"#FEF3C7",borderRadius:7,padding:"5px 10px",
        fontSize:12,fontWeight:700,color:"#92400E",margin:"3px 0"}}>{step}</div>
    );

    // Default: explanation text
    return(
      <div key={i} style={{display:"flex",gap:7,marginBottom:4,alignItems:"flex-start"}}>
        <span style={{background:"#0D9488",color:"#fff",borderRadius:"50%",
          minWidth:18,height:18,fontSize:10,fontWeight:800,display:"flex",
          alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
          {i+1}
        </span>
        <div style={{fontSize:12,color:"#0F172A",lineHeight:1.6,fontWeight:500}}>
          {step}
        </div>
      </div>
    );
  }


  return(
    <div style={{background:"#F0FDF4",border:"2px solid #10B981",borderRadius:16,marginTop:10,overflow:"hidden"}}> <button onClick={()=>setExpanded(p=>!p)}
        style={{width:"100%",background:"#D1FAE5",border:"none",cursor:"pointer",padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",textAlign:"left"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>📐</span>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:800,color:"#065F46",textTransform:"uppercase",letterSpacing:.8}}>How to solve this</div>
            <div style={{fontSize:12,fontWeight:700,color:"#0D9488"}}>{method}</div>
          </div>
          {solution.difficulty&&(
            <span style={{
              background:solution.difficulty==="foundation"?"#DBEAFE":
                         solution.difficulty==="core"?"#FEF3C7":"#FEE2E2",
              color:solution.difficulty==="foundation"?"#1D4ED8":
                    solution.difficulty==="core"?"#92400E":"#991B1B",
              fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:8,flexShrink:0
            }}>
              {solution.difficulty==="foundation"?"⬤ Foundation":
               solution.difficulty==="core"?"⬤⬤ Core":"⬤⬤⬤ Stretch"}
            </span>
          )}
        </div>
        <span style={{color:"#0D9488",fontSize:14,fontWeight:700,transform:expanded?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
      </button>

      {expanded&&(
        <div style={{padding:"12px 14px"}}> <div style={{background:"#fff",borderRadius:10,padding:"10px 12px",marginBottom:10,border:"1px solid #A7F3D0"}}>
            <div style={{fontSize:10,fontWeight:800,color:"#0D9488",marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>Working</div>
            {solution.steps.map((step,i)=>renderStep(step,i))}
          </div> {tip&&(
            <div style={{background:"#FEF3C7",borderRadius:10,padding:"9px 12px",border:"1px solid #FDE68A",display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:14,flexShrink:0}}>💡</span>
              <div>
                <div style={{fontSize:10,fontWeight:800,color:"#92400E",marginBottom:2,textTransform:"uppercase",letterSpacing:.7}}>Key Concept</div>
                <div style={{fontSize:12,color:"#78350F",fontWeight:600,lineHeight:1.6}}>{tip.replace("🧠 ","")}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HintBtn({onClick, shown}){
  return(
    <button onClick={onClick} style={{background:shown?"#FEF3C7":"#fff",border:"1.5px solid #F59E0B",borderRadius:9,padding:"5px 12px",fontSize:11,fontWeight:700,color:"#D97706",cursor:"pointer",marginTop:6}}>
      {shown ? "💡 Hide Hint" : "💡 Need a Hint?"}
    </button>
  );
}

function ProgressHeader({current, total, section, color, onBack}){
  const pct = Math.round((current/total)*100);
  return(
    <div style={{background:`linear-gradient(135deg,${color}dd,${color})`,padding:"14px 20px 10px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:9,width:32,height:32,cursor:"pointer",color:"#fff",fontSize:15}}>←</button>
        <div style={{flex:1}}>
          <div style={{color:"#fff",fontSize:13,fontWeight:800}}>{section}</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:10,marginTop:1}}>Question {current} of {total}</div>
        </div>
        <div style={{background:"rgba(255,255,255,.2)",borderRadius:9,padding:"3px 10px"}}>
          <span style={{color:"#fff",fontSize:11,fontWeight:700}}>{pct}%</span>
        </div>
      </div>
      <div style={{background:"rgba(255,255,255,.25)",borderRadius:8,height:4}}>
        <div style={{background:"#fff",borderRadius:8,height:4,width:`${pct}%`,transition:"width .4s"}}/>
      </div>
    </div>
  );
}

function MathMCQSection({items, onDone}){
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [wrongTried, setWrongTried] = useState([]);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [learnAck, setLearnAck] = useState(false);
  const [results, setResults] = useState([]);
  const startRef = useRef(Date.now());

  const q = items[qIdx];
  const color = TOPIC_COLOR[q.topic] || MC.teal;

  function resetQ(){setSelected(null);setAttempts(0);setWrongTried([]);setSolved(false);setRevealed(false);setShowSolution(false);setShowHint(false);setLearnAck(false);startRef.current=Date.now();}
  function handleSelect(i){if(solved||revealed||wrongTried.includes(i))return;setSelected(i);}
  function handleCheck(){
    if(selected===null||solved||revealed)return;
    const t=Date.now()-startRef.current;
    if(selected===q.answer){
      setSolved(true);setShowSolution(true);
      SFX.correct();
      setResults(r=>[...r,{id:q.id,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,topic:q.topic,
        sectionType:"MCQ", q:q.q,
        yourAnswer:q.options?q.options[selected]:"",
        correctAnswer:q.options?q.options[q.answer]:String(q.answer),
        solution:q.solution||null, difficulty:q.difficulty||"core"}]);
    } else {
      const na=attempts+1;setAttempts(na);setWrongTried(p=>[...p,selected]);setSelected(null);
      if(na>=3){setRevealed(true);setShowSolution(true);SFX.wrong();
        setResults(r=>[...r,{id:q.id,correct:false,attempts:0,topic:q.topic,
          sectionType:"MCQ",q:q.q,
          yourAnswer:selected!==null&&q.options?q.options[selected]:"",
          correctAnswer:q.options?q.options[q.answer]:String(q.answer),
          solution:q.solution||null, difficulty:q.difficulty||"core"}]);}
      else setShowHint(true);
    }
  }
  function next(){if(qIdx+1>=items.length){onDone(results);return;}setQIdx(i=>i+1);resetQ();}

  return(
    <div>
      <ProgressHeader current={qIdx+1} total={items.length} section="📊 Section A: Multiple Choice" color={color} onBack={()=>onDone(results)}/>
      <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <TopicBadge topic={q.topic}/>
          <div style={{display:"flex",gap:4}}>
            {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<attempts?MC.red:"#D1FAE5"}}/>)}
          </div>
        </div>
        <div style={{background:MC.card,borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <MathQ text={q.q} style={{fontSize:15,fontWeight:700,color:MC.text,lineHeight:1.7,flex:1}}/>
            <SpeakBtn text={q.q} lang="en" style={{flexShrink:0,marginTop:2}}/>
          </div>
        </div>

        {attempts>0&&!solved&&!revealed&&showHint&&(
          <div style={{background:MC.lAmber,border:"1px solid #FDE68A",borderRadius:12,padding:"10px 12px",marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:"#92400E"}}>💡 Hint: {q.solution.tip}</div>
          </div>
        )}

        <div style={{marginBottom:14}}>
          {q.options.map((opt,i)=>{
            const isAns=i===q.answer, isWrong=wrongTried.includes(i);
            let bg=MC.card, border=MC.border, col=MC.text, op=1;
            if(solved||revealed){if(isAns){bg="#D1FAE5";border=MC.green;col="#065F46";}else op=0.35;}
            else if(isWrong){bg=MC.lRed;border=MC.red;col=MC.red;op=0.6;}
            else if(selected===i){bg=MC.lBlue;border=color;col=color;}
            return(
              <div key={i} onClick={()=>handleSelect(i)}
                className={(solved&&isAns)?'gm-correct':(isWrong)?'gm-wrong':''}
                style={{background:bg,border:`2px solid ${border}`,borderRadius:14,padding:"13px 16px",marginBottom:10,cursor:(solved||revealed||isWrong)?"default":"pointer",display:"flex",alignItems:"center",gap:12,opacity:op,transition:"all .15s"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:(selected===i&&!isWrong)?color:"#EEF2F7",color:(selected===i&&!isWrong)?"#fff":MC.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{i+1}</div>
                <span style={{fontSize:14,fontWeight:600,color:col,flex:1}}>{opt}</span>
                {(solved||revealed)&&isAns&&<span>✅</span>}
                {isWrong&&<span>❌</span>}
              </div>
            );
          })}
        </div>

        {solved&&(
          <div className="gm-pop" style={{background:MC.lGreen,border:"1.5px solid "+MC.green,borderRadius:14,padding:"11px 14px",marginBottom:10,position:"relative",overflow:"hidden"}}>
            <StarBurst show={attempts===0}/>
            <div style={{fontWeight:800,fontSize:14,color:"#065F46"}}>
              {attempts===0?"⭐⭐⭐ First try! Perfect!":attempts===1?"⭐⭐ Second try! Great!":"⭐ Third try! Correct!"}
            </div>
          </div>
        )}
        {revealed&&(
          <div style={{background:MC.lRed,border:"1.5px solid "+MC.red,borderRadius:14,padding:"11px 14px",marginBottom:10}}>
            <div style={{fontWeight:800,fontSize:13,color:MC.red}}>📖 Let's learn from this question</div>
          </div>
        )}

        <SolutionBox solution={q.solution} show={showSolution}/>

        {(solved||revealed)&&!learnAck&&(
            <LearnCard q={q} sectionType="MathMCQ" wasCorrect={solved&&attempts===0}
              onAcknowledge={()=>setLearnAck(true)}/>
          )}
          {(solved||revealed)&&learnAck
          ? <button onClick={next} style={{width:"100%",background:`linear-gradient(135deg,${color},${color}cc)`,color:"#fff",border:"none",borderRadius:16,padding:"17px",fontSize:15,fontWeight:900,cursor:"pointer",marginTop:12}}>
              {qIdx+1>=items.length?"Complete Section →":"Next Question →"}
            </button>
          : (solved||revealed) ? null
          : <button onClick={handleCheck} disabled={selected===null} style={{width:"100%",background:selected!==null?`linear-gradient(135deg,${color},${color}cc)`:"#C8D3E0",color:"#fff",border:"none",borderRadius:16,padding:"17px",fontSize:15,fontWeight:900,cursor:selected!==null?"pointer":"not-allowed",marginTop:8}}>
              Check Answer
            </button>
        }
      </div>
    </div>
  );
}

function MathShortAnswerSection({items, onDone}){
  const [qIdx, setQIdx] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const q = items[qIdx];
  const color = TOPIC_COLOR[q.topic] || MC.blue;

  function resetQ(){setInputVal("");setAttempts(0);setSolved(false);setRevealed(false);setShowSolution(false);setShowHint(false);if(inputRef.current)inputRef.current.focus();}

  function handleCheck(){
    if(solved||revealed||!inputVal.trim())return;
    const raw = inputVal.trim().replace(/\s/g,'');
    const expected = q.answer.replace(/\s/g,'');
    const normalize = s => s.replace(/[$,]/g,'').toLowerCase();
    const correct = normalize(raw)===normalize(expected);

    if(correct){
      setSolved(true);setShowSolution(true);
      SFX.correct();
      setResults(r=>[...r,{id:q.id,correct:attempts===0,solvedAfterHint:attempts>0,attempts:attempts+1,topic:q.topic,
        sectionType:"ShortAnswer",q:q.q,yourAnswer:inputVal,correctAnswer:q.answer,
        solution:q.solution||null,difficulty:q.difficulty||"core"}]);
    } else {
      const na=attempts+1;setAttempts(na);setInputVal("");
      if(na>=2){setRevealed(true);setShowSolution(true);SFX.wrong();
        setResults(r=>[...r,{id:q.id,correct:false,attempts:0,topic:q.topic,
          sectionType:"ShortAnswer",q:q.q,yourAnswer:inputVal,
          correctAnswer:q.answer,solution:q.solution||null,difficulty:q.difficulty||"core"}]);}
      else setShowHint(true);
    }
  }

  function next(){if(qIdx+1>=items.length){onDone(results);return;}setQIdx(i=>i+1);resetQ();}

  return(
    <div>
      <ProgressHeader current={qIdx+1} total={items.length} section="✏️ Section B: Short Answer" color={color} onBack={()=>onDone(results)}/>
      <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <TopicBadge topic={q.topic}/>
          <div style={{display:"flex",gap:4}}>
            {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<attempts?MC.red:"#D1FAE5"}}/>)}
          </div>
        </div>

        <div style={{background:MC.card,borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <MathQ text={q.q} style={{fontSize:15,fontWeight:700,color:MC.text,lineHeight:1.7,flex:1}}/>
            <SpeakBtn text={q.q} lang="en" style={{flexShrink:0,marginTop:2}}/>
          </div>
        </div>

        {attempts===1&&!solved&&!revealed&&showHint&&q.solution?.tip&&(
          <div style={{background:MC.lAmber,border:"1px solid #FDE68A",borderRadius:12,
            padding:"10px 12px",marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:800,color:"#92400E",marginBottom:3}}>
              💡 HINT ({2} tries left)
            </div>
            <div style={{fontSize:12,fontWeight:600,color:"#78350F"}}>
              {q.solution.tip.replace("🧠 ","")}
            </div>
          </div>
        )}
        {attempts===2&&!solved&&!revealed&&(
          <div className="gm-slideUp" style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:12,
            padding:"10px 12px",marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:800,color:"#1D4ED8",marginBottom:6}}>
              📐 Let me show you how to START this (last try!)
            </div>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{background:"#3B82F6",color:"#fff",borderRadius:"50%",width:18,height:18,
                fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>1</span>
              <div style={{fontSize:12,color:"#1E3A6E",fontWeight:600,lineHeight:1.6,fontFamily:"monospace"}}>
                {(q.solution?.steps||[])[0]||"Think about what the question is asking..."}
              </div>
            </div>
          </div>
        )}

        {!solved&&!revealed&&(
          <div style={{background:MC.card,borderRadius:14,padding:"14px",marginBottom:12,boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:12,fontWeight:700,color:MC.muted,marginBottom:8}}>Your answer {q.unit&&`(in ${q.unit})`}:</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {q.unit==="$"&&<span style={{fontSize:18,fontWeight:800,color:color}}>$</span>}
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={inputVal}
                onChange={e=>setInputVal(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleCheck()}
                placeholder="Type your answer..."
                style={{flex:1,fontSize:18,fontWeight:700,padding:"10px 14px",borderRadius:10,border:`2px solid ${color}`,outline:"none",color:MC.text}}
              />
              {q.unit&&q.unit!=="$"&&<span style={{fontSize:14,fontWeight:700,color:MC.muted}}>{q.unit}</span>}
            </div>
          </div>
        )}

        {revealed&&(
          <div style={{background:MC.lGreen,border:"1.5px solid "+MC.green,borderRadius:14,padding:"14px",marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:MC.muted,marginBottom:4}}>Correct answer:</div>
            <div style={{fontSize:22,fontWeight:900,color:"#065F46"}}>{q.unit==="$"?"$":""}{q.answer}{q.unit&&q.unit!=="$"?" "+q.unit:""}</div>
          </div>
        )}
        {solved&&(
          <div style={{background:MC.lGreen,border:"1.5px solid "+MC.green,borderRadius:14,padding:"11px 14px",marginBottom:10}}>
            <div style={{fontWeight:800,color:"#065F46"}}>{attempts===0?"⭐⭐⭐ Correct first try!":"⭐⭐ Correct on try 2!"}</div>
          </div>
        )}

        <SolutionBox solution={q.solution} show={showSolution}/>

        {(solved||revealed)&&!learnAck&&(
            <LearnCard q={q} sectionType="MathShortAnswer" wasCorrect={solved&&attempts===0}
              onAcknowledge={()=>setLearnAck(true)}/>
          )}
          {(solved||revealed)&&learnAck
          ? <button onClick={next} style={{width:"100%",background:`linear-gradient(135deg,${color},${color}cc)`,color:"#fff",border:"none",borderRadius:16,padding:"17px",fontSize:15,fontWeight:900,cursor:"pointer",marginTop:12}}>
              {qIdx+1>=items.length?"Complete Section →":"Next Question →"}
            </button>
          : (solved||revealed) ? null
          : <button onClick={handleCheck} disabled={!inputVal.trim()} style={{width:"100%",background:inputVal.trim()?`linear-gradient(135deg,${color},${color}cc)`:"#C8D3E0",color:"#fff",border:"none",borderRadius:16,padding:"17px",fontSize:15,fontWeight:900,cursor:inputVal.trim()?"pointer":"not-allowed",marginTop:8}}>
              Check Answer
            </button>
        }
      </div>
    </div>
  );
}

function MathProblemSection({items, onDone}){
  const [qIdx, setQIdx] = useState(0);
  const [partAnswers, setPartAnswers] = useState({});
  const [partAttempts, setPartAttempts] = useState({});
  const [partSolved, setPartSolved] = useState({});
  const [partRevealed, setPartRevealed] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [results, setResults] = useState([]);

  const q = items[qIdx];
  const color = "#0891B2";

  function allPartsSettled(){
    return q.parts.every((_,i)=>partSolved[i]||partRevealed[i]);
  }

  function handlePartCheck(partIdx){
    const part = q.parts[partIdx];
    const raw = (partAnswers[partIdx]||"").trim().replace(/\s/g,'');
    const expected = part.answer.replace(/[$,\s]/g,'');
    const normalize = s => s.replace(/[$,]/g,'').toLowerCase();
    const correct = normalize(raw)===normalize(expected);

    if(correct){
      setPartSolved(p=>({...p,[partIdx]:true}));
      setShowSolution(p=>({...p,[partIdx]:true}));
      setResults(r=>[...r,{id:q.id+"_p"+partIdx,correct:(partAttempts[partIdx]||0)===0,solvedAfterHint:(partAttempts[partIdx]||0)>0,
        attempts:(partAttempts[partIdx]||0)+1,topic:q.topic,sectionType:"ProblemSum",
        q:q.q,correctAnswer:part.answer,solution:part.solution||null}]);
    } else {
      const na=(partAttempts[partIdx]||0)+1;
      setPartAttempts(p=>({...p,[partIdx]:na}));
      setPartAnswers(p=>({...p,[partIdx]:""}));
      if(na>=3){
        setPartRevealed(p=>({...p,[partIdx]:true}));
        setShowSolution(p=>({...p,[partIdx]:true}));
        setResults(r=>[...r,{id:q.id+"_p"+partIdx,correct:false,attempts:0,
          topic:q.topic,sectionType:"ProblemSum",
          q:q.q,correctAnswer:part.answer,solution:part.solution||null}]);
      }
      // show scaffold hint after attempt 1
    }
  }

  function next(){
    if(qIdx+1>=items.length){onDone(results);return;}
    setQIdx(i=>i+1);
    setPartAnswers({});setPartAttempts({});setPartSolved({});setPartRevealed({});setShowSolution({});
  }

  return(
    <div>
      <ProgressHeader current={qIdx+1} total={items.length} section="📝 Section C: Problem Sums" color={color} onBack={()=>onDone(results)}/>
      <div style={{padding:"16px 16px 100px",overflowY:"auto",maxHeight:"calc(100vh - 80px)"}}>
        <TopicBadge topic={q.topic}/> <div style={{background:MC.card,borderRadius:18,padding:"18px 16px",margin:"10px 0 14px",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <div style={{fontSize:14,fontWeight:700,color:MC.text,lineHeight:1.8,whiteSpace:"pre-line",flex:1}}>{q.q}</div>
            <SpeakBtn text={q.q} lang="en" style={{flexShrink:0,marginTop:2}}/>
          </div>
        </div> {q.parts.map((part, pIdx)=>{
          const isSolved = partSolved[pIdx];
          const isRevealed = partRevealed[pIdx];
          const att = partAttempts[pIdx]||0;
          const settled = isSolved||isRevealed;
          const partColor = isSolved?"#065F46":isRevealed?MC.red:color;

          return(
            <div key={pIdx} style={{background:MC.card,borderRadius:16,padding:"14px 16px",marginBottom:12,boxShadow:"0 1px 6px rgba(0,0,0,.06)",border:`1.5px solid ${settled?(isSolved?"#10B981":"#EF4444"):"#D1FAE5"}`}}>
              <div style={{fontSize:13,fontWeight:800,color:partColor,marginBottom:8}}>{part.label}</div>

              {att===1&&!settled&&part.solution?.tip&&(
                <div style={{background:MC.lAmber,border:"1px solid #FDE68A",borderRadius:10,
                  padding:"8px 10px",marginBottom:8}}>
                  <div style={{fontSize:10,fontWeight:800,color:"#92400E",marginBottom:2}}>
                    💡 HINT (2 tries left)
                  </div>
                  <div style={{fontSize:12,color:"#78350F",fontWeight:600,lineHeight:1.5}}>
                    {part.solution.tip}
                  </div>
                </div>
              )}
              {att===2&&!settled&&(
                <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:10,
                  padding:"8px 10px",marginBottom:8}}>
                  <div style={{fontSize:10,fontWeight:800,color:"#1D4ED8",marginBottom:5}}>
                    📐 SCAFFOLD — First step (last try!):
                  </div>
                  <div style={{display:"flex",gap:7,alignItems:"flex-start"}}>
                    <span style={{background:"#3B82F6",color:"#fff",borderRadius:"50%",
                      minWidth:17,height:17,fontSize:10,fontWeight:800,display:"flex",
                      alignItems:"center",justifyContent:"center",flexShrink:0}}>1</span>
                    <div style={{fontSize:12,color:"#1E3A6E",fontWeight:600,lineHeight:1.5,
                      fontFamily:"monospace"}}>
                      {(part.solution?.steps||[])[0]||"Re-read the question carefully."}
                    </div>
                  </div>
                </div>
              )}

              {settled&&(
                <div style={{background:isSolved?"#D1FAE5":"#FEE2E2",borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                  <div style={{fontSize:11,color:MC.muted,marginBottom:2}}>Answer:</div>
                  <div style={{fontSize:20,fontWeight:900,color:partColor}}>{part.answer}</div>
                </div>
              )}

              {!settled&&(
                <div style={{display:"flex",gap:8,marginBottom:8}}>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={partAnswers[pIdx]||""}
                    onChange={e=>setPartAnswers(p=>({...p,[pIdx]:e.target.value}))}
                    onKeyDown={e=>e.key==="Enter"&&handlePartCheck(pIdx)}
                    placeholder="Your answer..."
                    style={{flex:1,fontSize:16,fontWeight:700,padding:"9px 12px",borderRadius:10,border:`2px solid ${color}`,outline:"none"}}
                  />
                  <button onClick={()=>handlePartCheck(pIdx)} disabled={!(partAnswers[pIdx]||"").trim()}
                    style={{background:(partAnswers[pIdx]||"").trim()?color:"#C8D3E0",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:700,cursor:(partAnswers[pIdx]||"").trim()?"pointer":"not-allowed"}}>
                    Check
                  </button>
                </div>
              )}

              <SolutionBox solution={part.solution} show={showSolution[pIdx]}/>
            </div>
          );
        })}

        {allPartsSettled()&&(
          <button onClick={next} style={{width:"100%",background:`linear-gradient(135deg,${color},${color}cc)`,color:"#fff",border:"none",borderRadius:16,padding:"17px",fontSize:15,fontWeight:900,cursor:"pointer",marginTop:4}}>
            {qIdx+1>=items.length?"Complete Section →":"Next Problem →"}
          </button>
        )}
      </div>
    </div>
  );
}

function MathSessionScreen({plan, onFinish, onBack}){
  const [phase, setPhase] = useState("mcq"); // mcq | sa | ps
  const [mcqResults, setMcqResults] = useState([]);
  const [saResults,  setSaResults]  = useState([]);

  function handleMCQDone(r){setMcqResults(r);setPhase("sa");}
  function handleSADone(r){setSaResults(r);setPhase("ps");}
  function handlePSDone(r){onFinish([...mcqResults,...saResults,...r]);}

  if(phase==="mcq") return <MWrap><MathMCQSection items={plan.mcqItems} onDone={handleMCQDone}/></MWrap>;
  if(phase==="sa")  return <MWrap><MathShortAnswerSection items={plan.saItems} onDone={handleSADone}/></MWrap>;
  if(phase==="ps")  return <MWrap><MathProblemSection items={plan.psItems} onDone={handlePSDone}/></MWrap>;
  return null;
}

function MathResultScreen({results, sessionNum, onHome, onNext}){
  const total=results.length, correct=results.filter(r=>r.correct).length;
  const pct=total?Math.round(correct/total*100):0;
  const col=pct>=85?"#10B981":pct>=70?"#F59E0B":"#EF4444";
  const bySection={"MCQ":[],"ShortAnswer":[],"ProblemSum":[]};
  results.forEach(r=>{if(bySection[r.sectionType])bySection[r.sectionType].push(r);});
  const wrong=results.filter(r=>!r.correct);
  const topicPerf={};
  results.forEach(r=>{
    if(!topicPerf[r.topic])topicPerf[r.topic]={c:0,t:0};
    topicPerf[r.topic].t++;
    if(r.correct)topicPerf[r.topic].c++;
  });
  const weakTopics=Object.entries(topicPerf).filter(([,v])=>v.c/v.t<0.7).map(([k])=>k);
  return(
    <div style={{paddingBottom:20}}>
      <div style={{background:`linear-gradient(135deg,${col},${col}cc)`,padding:"32px 24px",textAlign:"center"}}>
        <div style={{fontSize:52}}>{pct>=85?"🏆":pct>=70?"⭐":"💪"}</div>
        <div style={{fontSize:44,fontWeight:900,color:"#fff",margin:"8px 0 2px"}}>
          <AnimNumber value={pct} duration={800}/>%
        </div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.85)"}}>{correct}/{total} correct</div>
      </div>
      <div style={{padding:"18px 16px"}}>
        <div style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
          <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>Scores by Section</div>
          {[["📊 MCQ","MCQ"],["✏️ Short Answer","ShortAnswer"],["📝 Problem Sums","ProblemSum"]].map(([label,key])=>{
            const items=bySection[key];
            if(!items.length)return null;
            const c=items.filter(r=>r.correct).length;
            const p=Math.round(c/items.length*100);
            const sc=p>=85?"#10B981":p>=70?"#F59E0B":"#EF4444";
            return(
              <div key={key} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:12,fontWeight:700}}>{label}</span>
                  <span style={{fontSize:12,fontWeight:800,color:sc}}>{c}/{items.length} · {p}%</span>
                </div>
                <AnimProgressBar pct={p} color={sc} height={7}/>
              </div>
            );
          })}
        </div>
        {weakTopics.length>0&&(
          <div style={{background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:12,padding:"11px 14px",marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:12,color:"#92400E",marginBottom:4}}>📚 Topics to Revise</div>
            {weakTopics.map(t=><div key={t} style={{fontSize:12,color:"#78350F"}}>• {t}</div>)}
          </div>
        )}
        <div style={{background:"linear-gradient(135deg,#0F172A,#0D9488)",borderRadius:16,padding:"16px",marginBottom:10}}>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginBottom:4}}>Ready to continue?</div>
          <div style={{color:"#fff",fontSize:14,fontWeight:800,marginBottom:10}}>Session #{sessionNum+1} ready!</div>
          <button onClick={onNext} style={{width:"100%",background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)",borderRadius:10,padding:"12px",color:"#fff",fontSize:14,fontWeight:900,cursor:"pointer"}}>
            ▶ Start Next Session →
          </button>
        </div>
        <button onClick={onHome} style={{width:"100%",background:"none",border:"1.5px solid #D1FAE5",borderRadius:12,padding:"12px",fontSize:13,fontWeight:700,cursor:"pointer",color:MC.muted}}>← Back to Home</button>
      </div>
    </div>
  );
}

function MathHome({user, prog, onStart, onBack}){
  const history=prog.history||[];
  const avgTotal=history.length?Math.round(history.reduce((s,h)=>s+h.totalPct,0)/history.length):0;
  const nextSession=prog.nextSession||1;
  const [showRecent,setShowRecent]=useState(false);
  return(
    <div style={{paddingBottom:80}}>
      <div style={{background:"linear-gradient(135deg,#0D9488,#0891B2)",padding:"20px 20px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div>
            <div style={{color:"rgba(255,255,255,.55)",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>Genius Project</div>
            <div style={{color:"#fff",fontSize:17,fontWeight:900}}>🔢 P3 Mathematics</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:11,marginTop:2}}>{user.school||"Primary School"} · Aligned to MOE P3</div>
          </div>
          <button onClick={onBack} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:10,padding:"7px 12px",color:"rgba(255,255,255,.85)",cursor:"pointer",fontSize:12,fontWeight:700}}>← Back</button>
        </div>
      </div>
      <div style={{background:"#fff",padding:"14px 16px",borderBottom:"1px solid #D1FAE5"}}>
        <div style={{display:"flex",gap:10}}>
          {[{icon:"📋",l:"Sessions",v:history.length},{icon:"🎯",l:"Average",v:avgTotal?`${avgTotal}%`:"—"},{icon:"📅",l:"Next",v:`#${nextSession}`}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#F0FDF4",borderRadius:12,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontSize:16}}>{s.icon}</div>
              <div style={{fontSize:15,fontWeight:900,color:"#0D9488"}}>{s.v}</div>
              <div style={{fontSize:9,color:MC.muted,fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 16px 0"}}>
        {nextSession>=11&&(
          <div style={{background:"linear-gradient(135deg,#0F172A,#0D9488)",borderRadius:16,padding:"14px 16px",marginBottom:14,boxShadow:"0 4px 16px rgba(13,148,136,.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:28}}>🏫</span>
              <div>
                <div style={{color:"#fff",fontSize:14,fontWeight:900}}>Ai Tong Past Paper #{nextSession-10}</div>
                <div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginTop:2}}>Ai Tong Primary · 2024 SA1 · Real exam style</div>
              </div>
            </div>
          </div>
        )}
        <button onClick={onStart} style={{width:"100%",background:"linear-gradient(135deg,#0D9488,#0891B2)",color:"#fff",border:"none",borderRadius:18,padding:0,cursor:"pointer",boxShadow:"0 8px 28px rgba(13,148,136,.35)",overflow:"hidden",textAlign:"left",marginBottom:16}}>
          <div style={{padding:"18px 20px"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.6)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>P3 Mathematics · Session #{nextSession}</div>
            <div style={{fontSize:17,fontWeight:900,color:"#fff",marginBottom:4}}>▶ Start Practice →</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>MCQ · Short Answer · Problem Sums · Step-by-step solutions</div>
          </div>
          <div style={{background:"rgba(255,255,255,.08)",padding:"8px 20px",display:"flex",gap:16}}>
            {["📊 MCQ","✏️ Short Ans","📝 Problem Sums"].map((s,i)=><span key={i} style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:700}}>{s}</span>)}
          </div>
        </button>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
          {[["📊","MCQ","4 options"],["✏️","Short Ans","Type answer"],["📝","Prob Sums","Step guide"]].map(([icon,label,sub],i)=>(
            <div key={i} style={{background:"#fff",borderRadius:14,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
              <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
              <div style={{fontSize:11,fontWeight:800,color:"#0D9488"}}>{label}</div>
              <div style={{fontSize:9,color:MC.muted,marginTop:2}}>{sub}</div>
            </div>
          ))}
        </div>
        {history.length>0&&(
          <div style={{background:"#fff",borderRadius:18,marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.06)",overflow:"hidden"}}>
            <button onClick={()=>setShowRecent(p=>!p)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"13px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800,fontSize:13}}>📋 Recent Sessions ({history.length})</div>
              <span style={{color:MC.muted,fontSize:13,transform:showRecent?"rotate(90deg)":"none",transition:"transform .2s"}}>›</span>
            </button>
            {showRecent&&(
              <div style={{padding:"0 14px 14px"}}>
                {[...history].reverse().slice(0,5).map((h,i)=>{
                  const col=h.totalPct>=85?"#10B981":h.totalPct>=70?"#F59E0B":"#EF4444";
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<4?"1px solid #D1FAE5":"none"}}>
                      <div style={{width:32,height:32,borderRadius:9,background:col+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🔢</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:700}}>Session #{h.sessionNum}{h.isPastPaper?" 📄":""}</div>
                        <div style={{fontSize:10,color:MC.muted}}>{h.date}</div>
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

function MathApp({user, getProgress, setProgress, onBack}){
  const [level,setLevel]=React.useState(null);
  const grade="P3", subject="Math";
  const prog = getProgress(grade, subject);
  const [screen, setScreen] = useState("home");
  const [inSession, setInSession] = useState(false);
  const [sessionResult, setSessionResult] = useState(null);

  function handleSessionDone(results){
    const sessionNum = prog.nextSession||1;
    const bySection={};
    ["MCQ","ShortAnswer","ProblemSum"].forEach(t=>{
      const items=results.filter(r=>r.sectionType===t);
      if(items.length) bySection[t]=Math.round(items.filter(r=>r.correct).length/items.length*100);
    });
    const totalPct=results.length?Math.round(results.filter(r=>r.correct).length/results.length*100):0;
    const isPP=sessionNum>=11;
    const newEntry={sessionNum,date:new Date().toLocaleDateString("en-SG",{day:"2-digit",month:"short",year:"numeric"}),scores:bySection,totalPct,isPastPaper:isPP,mistakes:results.filter(r=>!r.correct).map(r=>({...r}))};
    const newMistakes=[...(prog.mistakes||[]),...results.filter(r=>!r.correct).map(r=>({...r,date:newEntry.date}))];
    setProgress(grade,subject,{...prog,history:[...(prog.history||[]),newEntry],mistakes:newMistakes,nextSession:(prog.nextSession||1)+1});
    setSessionResult({results,sessionNum});
    setInSession(false);
    setScreen("result");
    // Play completion fanfare
    const pct = results.length ? Math.round(results.filter(r=>r.correct).length/results.length*100) : 0;
    setTimeout(()=>{ pct >= 85 ? SFX.perfect() : SFX.complete(); }, 300);
  }

  if(inSession) return(
    <MWrap>
      <MathSessionScreen
        plan={buildMathPlan(prog.nextSession||1, level||recommendLevel(prog.history))}
        onFinish={handleSessionDone}
        onBack={()=>setInSession(false)}
      />
    </MWrap>
  );
  if(screen==="result"&&sessionResult) return(
    <MWrap>
      <MathResultScreen
        results={sessionResult.results}
        sessionNum={sessionResult.sessionNum}
        onHome={()=>setScreen("home")}
        onNext={()=>{setInSession(true);setScreen("home");}}
      />
    </MWrap>
  );
  return(
    <MWrap>
      <><div style={{padding:"14px 16px 0"}}><LevelPicker value={level} onChange={setLevel} recommended={recommendLevel(prog.history)}/></div>
      <MathHome user={user} prog={prog} onStart={()=>setInSession(true)} onBack={onBack}/></>
    </MWrap>
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

  if(subjectSelected && subject==="Math" && isLive) return(
    <MathApp
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
              <button key={key} onClick={()=>{setSubject(key);setScreen("home");}} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"10px 4px 10px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <span style={{fontSize:16}}>{sub.icon}</span>
                <span style={{fontSize:9,fontWeight:subject===key?800:500,color:subject===key?"#fff":"rgba(255,255,255,0.45)",whiteSpace:"nowrap"}}>{key}</span>
                {!live&&<span style={{fontSize:7,color:"rgba(255,255,255,0.35)",fontWeight:600}}>Soon</span>}
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

      <StudentBottomNav screen={screen} setScreen={setScreen} mistakeCount={(prog.mistakes||[]).filter(m=>m.date===todayStr()).length}/>
    </Wrap>
  );
}

const PAST_PAPERS = {

  "Nanyang Primary": {
    label:"Nanyang Primary WA1",
    GrammarMCQ:[
      { id:"ny_g01", topic:"Subject-Verb Agreement",
        sentence:"The bouquet of roses ______ placed on the teacher's desk.",
        options:["were","are","was","have been"], answer:2,
        hints:["Find the real subject. 'Of roses' is extra — what is the first noun?"],
        ruleCard:{ title:"SVA Trap: 'The ___ of ___'", emoji:"🎯",
          rows:[["The bouquet of roses","ONE bouquet → was"],["The bunch of grapes","ONE bunch → was"],["Rule:","ignore 'of ___', focus on FIRST noun"]] } },
      { id:"ny_g02", topic:"Past Perfect",
        sentence:"By the time Sarah arrived at school, the morning assembly ______ already begun.",
        options:["has","is","had","was"], answer:2,
        hints:["Two past events. Which happened FIRST — Sarah arriving, or assembly starting?"] },
      { id:"ny_g03", topic:"Past Continuous",
        sentence:"The children ______ happily in the playground when it suddenly started to rain.",
        options:["played","are playing","plays","were playing"], answer:3,
        hints:["Rain interrupted something already in progress. Which tense shows ongoing action?"] },
      { id:"ny_g04", topic:"Reflexive Pronouns",
        sentence:"My sister and I decorated the room ______ as a surprise for our parents.",
        options:["himself","ourselves","themselves","herself"], answer:1,
        hints:["Who is 'my sister and I'? That's 'we'. Which reflexive pronoun matches 'we'?"] },
      { id:"ny_g05", topic:"Conjunction – Purpose",
        sentence:"James studied very hard ______ he could do well in the examination.",
        options:["but","because","so that","although"], answer:2,
        hints:["James had a GOAL: to do well. Which word shows a goal or purpose?"] },
      { id:"ny_g06", topic:"Preposition – Place",
        sentence:"The librarian placed the new books ______ the top shelf.",
        options:["in","along","on","under"], answer:2,
        hints:["Books on a flat surface (shelf). Which word shows 'on a surface'?"] },
      { id:"ny_g07", topic:"Subject-Verb Agreement",
        sentence:"Neither the students nor the teacher ______ aware of the changes to the timetable.",
        options:["are","were","have","was"], answer:3,
        hints:["'Neither...nor': the verb matches the NEAREST subject, which is 'the teacher' (singular)."] },
      { id:"ny_g08", topic:"Present Perfect",
        sentence:"The scientists ______ not yet found a cure for the disease.",
        options:["are","had","has","have"], answer:3,
        hints:["'Scientists' = plural + 'yet' = present perfect clue. Plural → have or has?"] },
    ],
    VocabMCQ:[
      { id:"ny_v01", topic:"Context Vocabulary",
        sentence:"The doctor advised the patient to ______ from strenuous activities for two weeks.",
        options:["perform","refrain","enjoy","continue"], answer:1,
        hints:["The doctor told the patient not to do something. Which word means 'to stop from doing'?"] },
      { id:"ny_v02", topic:"Synonyms",
        sentence:"The explorer was ______ when he discovered a hidden cave behind the waterfall.",
        options:["bored","frightened","elated","confused"], answer:2,
        hints:["Discovering something amazing — would you feel sad or extremely happy?"] },
      { id:"ny_v03", topic:"Context Vocabulary",
        sentence:"The ______ crowd cheered loudly as the athlete crossed the finish line.",
        options:["gloomy","frantic","jubilant","timid"], answer:2,
        hints:["The crowd was cheering for a winner. What kind of mood would they be in?"] },
      { id:"ny_v04", topic:"Antonyms",
        sentence:"The new manager was known for being ______, always willing to listen to his staff.",
        options:["arrogant","approachable","stubborn","impatient"], answer:1,
        hints:["He was WILLING to listen — was he difficult to talk to, or easy to talk to?"] },
      { id:"ny_v05", topic:"Context Vocabulary",
        sentence:"Despite the heavy rain, the rescue team ______ through the flooded streets.",
        options:["strolled","waded","sprinted","drifted"], answer:1,
        hints:["They were moving through FLOOD water. Which word describes moving through water?"] },
      { id:"ny_v06", topic:"Synonyms",
        sentence:"The scientist's ______ work on the new vaccine saved thousands of lives.",
        options:["lazy","groundbreaking","ordinary","repetitive"], answer:1,
        hints:["Work that saved thousands of lives — was it ordinary or very important?"] },
      { id:"ny_v07", topic:"Context Vocabulary",
        sentence:"The young artist had a natural ______ for painting and could create beautiful works effortlessly.",
        options:["talent","obstacle","failure","dislike"], answer:0,
        hints:["She could do it 'effortlessly' — what natural ability does that suggest?"] },
      { id:"ny_v08", topic:"Antonyms",
        sentence:"The old bridge was ______ and could no longer support heavy vehicles.",
        options:["sturdy","modern","fragile","expensive"], answer:2,
        hints:["It couldn't support heavy vehicles — was it strong or weak?"] },
    ],
    GrammarCloze: "gc_set2",
    VocabCloze:   "vc_set2",
    Editing:      "ed_set2",
    Comprehension:"comp_set2",
  },

  "Nan Hua Primary": {
    label:"Nan Hua Primary WA1",
    GrammarMCQ:[
      { id:"nh_g01", topic:"Simple Past",
        sentence:"The students ______ their project presentation last Friday afternoon.",
        options:["complete","completes","completed","are completing"], answer:2,
        hints:["'Last Friday' = finished past action. Which form is simple past?"] },
      { id:"nh_g02", topic:"Conjunctions",
        sentence:"Li Mei studied hard ______ she still did not score well in the test.",
        options:["and","so","but","because"], answer:2,
        hints:["She studied hard ↔ she didn't score well. Are these ideas opposite?"] },
      { id:"nh_g03", topic:"Past Continuous",
        sentence:"Father ______ the car when he noticed a strange sound from the engine.",
        options:["drive","drove","is driving","was driving"], answer:3,
        hints:["He noticed something while already doing something. Which tense shows 'in the middle of doing'?"] },
      { id:"nh_g04", topic:"Question Words",
        sentence:"______ long did it take for the rescue team to reach the trapped miners?",
        options:["How","What","When","Where"], answer:0,
        hints:["The answer would be a duration of time (e.g. '3 hours'). Which question word asks about amount?"] },
      { id:"nh_g05", topic:"Preposition – Place",
        sentence:"The children found a bird's nest ______ the branches of the tall tree.",
        options:["on","among","beside","below"], answer:1,
        hints:["A nest hidden inside multiple branches. Which word means 'in the middle of several things'?"] },
      { id:"nh_g06", topic:"Present Perfect",
        sentence:"She ______ been waiting for the bus for over half an hour.",
        options:["is","was","has","had"], answer:2,
        hints:["She started waiting and is STILL waiting now. Which tense connects past to present?"] },
      { id:"nh_g07", topic:"Subject vs Object Pronoun",
        sentence:"Mother gave ______ a surprise present on my birthday.",
        options:["I","my","me","mine"], answer:2,
        hints:["Mother gave something TO someone. Is that person doing or receiving?"] },
      { id:"nh_g08", topic:"Conjunction – Reason",
        sentence:"The match was cancelled ______ the heavy thunderstorm.",
        options:["because","because of","although","since"], answer:1,
        hints:["'Heavy thunderstorm' is a NOUN (thing), not a full sentence. Which phrase goes before a noun to give a reason?"] },
    ],
    VocabMCQ:[
      { id:"nh_v01", topic:"Context Vocabulary",
        sentence:"The young chef was ______ to receive praise from the famous food critic.",
        options:["devastated","thrilled","reluctant","confused"], answer:1,
        hints:["The famous critic praised him — how would a young chef feel?"] },
      { id:"nh_v02", topic:"Synonyms",
        sentence:"The mountaineer showed great ______ in climbing the steep rocky path.",
        options:["laziness","fear","perseverance","confusion"], answer:2,
        hints:["Climbing a steep rocky path takes effort and not giving up. What quality is that?"] },
      { id:"nh_v03", topic:"Context Vocabulary",
        sentence:"The teacher spoke in a ______ voice so as not to disturb the students who were concentrating.",
        options:["loud","shrill","hushed","booming"], answer:2,
        hints:["She didn't want to disturb them — was she speaking loudly or softly?"] },
      { id:"nh_v04", topic:"Antonyms",
        sentence:"The new playground equipment looked ______ and was a danger to young children.",
        options:["sturdy","safe","colourful","hazardous"], answer:3,
        hints:["It was a DANGER to children — the opposite of safe. Which word means dangerous?"] },
      { id:"nh_v05", topic:"Context Vocabulary",
        sentence:"The volunteers worked ______ to pack food parcels for the needy families.",
        options:["lazily","grudgingly","diligently","carelessly"], answer:2,
        hints:["Volunteers helping needy families — would they work with care and effort?"] },
      { id:"nh_v06", topic:"Synonyms",
        sentence:"The hikers were ______ after walking for eight hours in the hot sun.",
        options:["energetic","refreshed","exhausted","cheerful"], answer:2,
        hints:["Eight hours of walking in hot sun — how would your body feel?"] },
      { id:"nh_v07", topic:"Context Vocabulary",
        sentence:"The puppy ______ around the garden, sniffing every flower and chasing butterflies.",
        options:["trudged","frolicked","stumbled","retreated"], answer:1,
        hints:["A playful puppy exploring a garden — would it move heavily or playfully?"] },
      { id:"nh_v08", topic:"Antonyms",
        sentence:"The scientist remained ______ despite the many failed experiments.",
        options:["hopeful","discouraged","optimistic","determined"], answer:1,
        hints:["This is the word that means the OPPOSITE of remaining positive. Which option means losing hope?"] },
    ],
    GrammarCloze: "gc_set3",
    VocabCloze:   "vc_set3",
    Editing:      "ed_set3",
    Comprehension:"comp_set3",
  },

};

function selectPastPaper(schoolName){
  if(!schoolName) return PAST_PAPERS["Nanyang Primary"];
  const keys = Object.keys(PAST_PAPERS);
  for(const key of keys){
    if(schoolName.toLowerCase().includes(key.toLowerCase())) return PAST_PAPERS[key];
  }
  const profile = getSchoolProfile(schoolName);
  if(profile && profile.style==="standard")  return PAST_PAPERS["Nan Hua Primary"];
  return PAST_PAPERS["Nanyang Primary"];
}

function buildPastPaperPlan(settings, schoolName, sessionNum){
  const paper = selectPastPaper(schoolName);
  const s     = settings||DEFAULT_SETTINGS;
  const sections = [];

  sections.push({type:"GrammarMCQ", items: paper.GrammarMCQ||QB.GrammarMCQ});
  sections.push({type:"VocabMCQ",   items: paper.VocabMCQ  ||QB.VocabMCQ});

  ["GrammarCloze","VocabCloze","Editing","Comprehension"].forEach(type=>{
    const setKey   = paper[type];
    const allSets  = QB[type];
    const chosen   = setKey ? allSets.filter(s=>s.id===setKey) : [allSets[0]];
    const useSet   = chosen.length ? chosen : [allSets[0]];
    sections.push({type, sets:1, items:useSet});
  });

  return sections;
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

function buildPlan(settings, schoolName, sessionNum, level){
  if(level==="pastpaper" || (sessionNum && sessionNum >= 11 && !LEVEL_MAP[level])){
    return buildPastPaperPlan(settings, schoolName, sessionNum||11);
  }
  const s   = settings||DEFAULT_SETTINGS;
  const sIdx = sessionNum ? ((sessionNum-1) % 10) : 0; // 0-9

  const gmAll = pickQuestionsForSchool(QB.GrammarMCQ, schoolName, QB.GrammarMCQ.length);
  const vmAll = pickQuestionsForSchool(QB.VocabMCQ,   schoolName, QB.VocabMCQ.length);

  const GM_COUNT = 10;
  const VM_COUNT = 10;
  const gmItems = pickByLevel(gmAll, level, sessionNum, GM_COUNT);
  const vmItems = pickByLevel(vmAll, level, sessionNum, VM_COUNT);

  const sections = [];
  sections.push({type:"GrammarMCQ", items:gmItems});
  sections.push({type:"VocabMCQ",   items:vmItems});

  ["GrammarCloze","VocabCloze","Editing","Comprehension"].forEach(type=>{
    const maxSets = s[type]?.sets||1;
    const allSets = QB[type]||[];
    if(!allSets.length) return;
    const chosen = [];
    for(let i=0;i<maxSets;i++){
      chosen.push(allSets[(sIdx+i)%allSets.length]);
    }
    sections.push({type, sets:maxSets, items:chosen});
  });

  return sections;
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
        ✅ Currently available: P3 English
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
                  <button key={key} onClick={()=>setSubject(key)} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"8px 4px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                    <span style={{fontSize:15}}>{sub.icon}</span>
                    <span style={{fontSize:9,fontWeight:subject===key?800:400,color:subject===key?"#fff":"rgba(255,255,255,0.4)"}}>{key}</span>
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