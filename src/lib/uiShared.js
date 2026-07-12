"use client";
import React, { useState, useRef, useEffect } from "react";

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
        fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:used?"#94A3B8":loading?"#92400E":"#EA580C",
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
        padding:"4px 10px",cursor:"pointer",fontSize:"calc(var(--fs) * 0.929)",
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
          fontSize:"calc(var(--fs) * 1.429)",
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
      fontFamily:"Nunito,system-ui,'KaiTi','STKaiti','LXGW WenKai',sans-serif",
      background:C.bg,
      minHeight:"100vh",
      maxWidth:"var(--wrap-w)",
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
    <span style={{background:bg||color+"18",color:color,fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,
      padding:"3px 10px",borderRadius:10,display:"inline-block"}}>
      {children}
    </span>
  );
}

function BigBtn({color, onClick, disabled, children}){
  return(
    <button onClick={onClick} disabled={!!disabled}
      style={{width:"100%",background:disabled?"#C8D3E0":color,color:"#fff",
        border:"none",borderRadius:16,padding:"16px",fontSize:"calc(var(--fs) * 1.071)",fontWeight:900,
        cursor:disabled?"not-allowed":"pointer",marginTop:8,letterSpacing:.3}}>
      {children}
    </button>
  );
}

function ActionBtn({color, onClick, disabled, children}){
  return(
    <button onClick={onClick} disabled={!!disabled}
      style={{width:"100%",background:disabled?"#C8D3E0":`linear-gradient(135deg,${color},${color}cc)`,
        color:"#fff",border:"none",borderRadius:16,padding:"16px",fontSize:"calc(var(--fs) * 1.071)",
        fontWeight:900,cursor:disabled?"not-allowed":"pointer",marginTop:8}}>
      {children}
    </button>
  );
}

function InputField({label, value, onChange, placeholder, type="text", onEnter}){
  return(
    <div style={{marginBottom:16}}>
      {label&&<div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:800,color:C.muted,marginBottom:6,
        textTransform:"uppercase",letterSpacing:.8}}>{label}</div>}
      <input
        type={type}
        value={value}
        onChange={e=>onChange(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&onEnter&&onEnter()}
        placeholder={placeholder||""}
        style={{width:"100%",padding:"13px 14px",borderRadius:12,
          border:`1.5px solid ${C.border}`,fontSize:"calc(var(--fs) * 1.000)",fontWeight:600,
          color:C.text,background:C.card,boxSizing:"border-box",outline:"none"}}
      />
    </div>
  );
}

function ErrorBox({msg}){
  if(!msg) return null;
  return(
    <div style={{background:C.lRed,border:"1.5px solid "+C.red,borderRadius:12,
      padding:"10px 14px",marginBottom:12,fontSize:"calc(var(--fs) * 0.929)",fontWeight:700,color:C.red}}>
      ⚠️ {msg}
    </div>
  );
}

function HintBox({text}){
  if(!text) return null;
  return(
    <div style={{background:C.lAmber,border:"1px solid #FDE68A",borderRadius:12,
      padding:"10px 13px",marginBottom:10}}>
      <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:"#92400E"}}>💡 Hint: {text}</div>
    </div>
  );
}

function FeedbackBox({badge, meaning}){
  return(
    <div style={{background:C.lGreen,border:"1.5px solid "+C.green,borderRadius:14,
      padding:"11px 14px",marginBottom:10}}>
      <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 1.000)",color:"#065F46",marginBottom:meaning?4:0}}>
        {badge==="gold"?"⭐⭐⭐ Perfect!":badge==="silver"?"⭐⭐ Great!":"⭐ Correct!"}
      </div>
      {meaning&&<div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#047857",fontWeight:600}}>{meaning}</div>}
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
        <span style={{fontSize:"calc(var(--fs) * 1.286)"}}>{wasCorrect?"🎓":"📖"}</span>
        <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:800,
          color:wasCorrect?"#065F46":"#9A3412"}}>
          {wasCorrect ? "Great! Now let's lock it in" : "Let's learn this properly"}
        </div>
      </div>

      {/* Key point */}
      {keyPoint && (
        <div style={{background:"#fff",borderRadius:10,padding:"10px 12px",marginBottom:10,
          border:"1px solid "+(wasCorrect?"#A7F3D0":"#FED7AA")}}>
          <div style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:800,color:"#0D9488",marginBottom:4,
            textTransform:"uppercase",letterSpacing:.6}}>💡 Key Point</div>
          <div style={{fontSize:"calc(var(--fs) * 0.929)",color:"#0F172A",fontWeight:600,lineHeight:1.6}}>
            {typeof keyPoint === 'string' ? keyPoint : ''}
          </div>
        </div>
      )}

      {/* Memory item — vocab / chinese / grammar */}
      {memoryItem && memoryItem.type === "chinese" && (
        <div style={{background:"#EFF6FF",borderRadius:10,padding:"10px 12px",marginBottom:10,
          border:"1px solid #BFDBFE"}}>
          <div style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:800,color:"#1D4ED8",marginBottom:6,
            textTransform:"uppercase",letterSpacing:.6}}>📝 记住这个字 (Remember)</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:32,fontWeight:900,color:"#1E3A6E"}}>{memoryItem.char}</div>
            <div>
              <div style={{fontSize:"calc(var(--fs) * 1.000)",fontWeight:700,color:"#2563EB"}}>{memoryItem.pinyin}</div>
              <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#475569"}}>{memoryItem.meaning}</div>
            </div>
            {typeof SpeakBtn !== 'undefined' &&
              <SpeakBtn text={memoryItem.char} lang="zh" style={{marginLeft:"auto"}}/>}
          </div>
        </div>
      )}

      {memoryItem && memoryItem.type === "vocab" && (
        <div style={{background:"#EFF6FF",borderRadius:10,padding:"10px 12px",marginBottom:10,
          border:"1px solid #BFDBFE"}}>
          <div style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:800,color:"#1D4ED8",marginBottom:6,
            textTransform:"uppercase",letterSpacing:.6}}>📝 Word to Remember</div>
          <div style={{fontSize:"calc(var(--fs) * 1.143)",fontWeight:800,color:"#1E3A6E"}}>{memoryItem.word}</div>
          <div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#475569",marginTop:2}}>{memoryItem.def}</div>
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
          fontSize:"calc(var(--fs) * 1.000)",fontWeight:800,
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
      <div style={{fontWeight:800,fontSize:"calc(var(--fs) * 0.929)",color:C.red,marginBottom:meaning?4:0}}>
        📖 Let's learn from this one
      </div>
      {meaning&&<div style={{fontSize:"calc(var(--fs) * 0.857)",color:"#991B1B",fontWeight:600}}>{meaning}</div>}
    </div>
  );
}

function WrongBanner({attempts}){
  const msgs=["Try again! 💪","One more try! Think carefully…","Showing the answer now…"];
  return(
    <div style={{background:C.lAmber,border:"1px solid #FDE68A",borderRadius:12,
      padding:"9px 13px",marginBottom:10}}>
      <div style={{fontSize:"calc(var(--fs) * 0.857)",fontWeight:700,color:"#92400E"}}>
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
        <div style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:"#1D4ED8",marginBottom:4,
          textTransform:"uppercase",letterSpacing:.8}}>📌 Grammar Rule</div>
        <div style={{fontSize:"calc(var(--fs) * 0.929)",fontWeight:600,color:C.text,lineHeight:1.6}}>{card}</div>
      </div>
    );
  }
  // Object form: {title, emoji, rows:[["clue","tense"],...]}
  const {title="", emoji="📌", rows=[]} = card;
  return(
    <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:14,
      padding:"12px 14px",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
        <span style={{fontSize:"calc(var(--fs) * 1.286)"}}>{emoji}</span>
        <div style={{fontSize:"calc(var(--fs) * 0.786)",fontWeight:800,color:"#1D4ED8",
          textTransform:"uppercase",letterSpacing:.8}}>{title}</div>
      </div>
      {rows.length>0&&(
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"calc(var(--fs) * 0.857)"}}>
          <tbody>
            {rows.map((row,i)=>(
              <tr key={i} style={{background:i%2===0?"#EFF6FF":"#fff"}}>
                {row.map((cell,j)=>(
                  <td key={j} style={{padding:"4px 8px",color:j===0?C.muted:C.text,
                    fontWeight:j===1?700:400,borderBottom:"1px solid #DBEAFE",
                    fontSize:"calc(var(--fs) * 0.786)"}}>
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
          <span style={{fontSize:"calc(var(--fs) * 1.429)"}}>{t.icon}</span>
          <span style={{fontSize:"calc(var(--fs) * 0.780)",fontWeight:screen===t.key?800:500,
            color:screen===t.key?C.navy:C.muted}}>{t.label}</span>
          {t.badge>0&&(
            <span style={{position:"absolute",top:6,right:"20%",background:C.red,
              color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:"calc(var(--fs) * 0.780)",
              fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {t.badge>9?"9+":t.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}


export {
  C, TTS, SpeakBtn, SFX,
  Motion, AnimNumber, StarBurst, AnimProgressBar,
  Wrap, TagPill, BigBtn, ActionBtn, InputField,
  ErrorBox, HintBox, FeedbackBox, LearnCard, RevealBox, WrongBanner, RuleCard,
  StudentBottomNav,
};
