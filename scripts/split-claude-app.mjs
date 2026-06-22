import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "src");
const appPath = path.join(src, "app/ClaudeApp.js");

const lines = fs.readFileSync(appPath, "utf8").split("\n");

function slice(start, end) {
  return lines.slice(start - 1, end).join("\n");
}

function lineIndex(needle, from = 0) {
  const i = lines.findIndex((l, idx) => idx >= from && l.includes(needle));
  if (i === -1) throw new Error(`Not found: ${needle}`);
  return i + 1;
}

const A = {
  uiSharedStart: lineIndex("const C = {"),
  comingSoonToast: lineIndex("function ComingSoonToast"),
  subjectSelect: lineIndex("function SubjectSelectScreen"),
  getMistakeIds: lineIndex("function getMistakeIds"),
  sections: lineIndex("const SECTIONS = {"),
  subjects: lineIndex("const SUBJECTS = {"),
  zhSections: lineIndex("const ZH_SECTIONS = {"),
  zhSectionOrder: lineIndex("const ZH_SECTION_ORDER"),
  bianZi: lineIndex("function BianZiSection"),
  zhSession: lineIndex("function ZhSessionScreen"),
  zhResult: lineIndex("function ZhResultScreen"),
  zhHome: lineIndex("function ZhHome"),
  levelPicker: lineIndex("function LevelPicker"),
  chineseApp: lineIndex("function ChineseApp"),
  authScreen: lineIndex("function AuthScreen"),
  studentApp: lineIndex("function StudentApp"),
  pickByLevel: lineIndex("function pickByLevel"),
  comingSoonScreen: lineIndex("function ComingSoonScreen"),
  studentHome: lineIndex("function StudentHome"),
  studentResult: lineIndex("function StudentResultScreen"),
  adminApp: lineIndex("function AdminApp"),
  wordDict: lineIndex("const WORD_DICT = {"),
  shuffle: lineIndex("function shuffle(arr)"),
  sessionScreen: lineIndex("function SessionScreen"),
  summaryScreen: lineIndex("function SummaryScreen"),
  appFn: lineIndex("function App()"),
};

const uiSharedBody = slice(A.uiSharedStart, A.comingSoonToast - 1);

const dashboardBody = [
  slice(A.comingSoonToast, A.subjectSelect - 1),
  slice(A.subjectSelect, A.getMistakeIds - 1),
  slice(A.subjects, A.sections - 1),
  slice(A.comingSoonScreen, A.studentHome - 1),
  slice(A.studentHome, A.studentResult - 1),
  slice(A.zhHome, A.levelPicker - 1),
  slice(A.levelPicker, A.chineseApp - 1),
].join("\n\n");

const quizHelpers = slice(A.getMistakeIds, A.sections - 1);
const sectionMeta = slice(A.sections, A.zhSections - 1);
const zhSectionMeta = slice(A.zhSections, A.bianZi - 1);

const quizBody = [
  sectionMeta,
  zhSectionMeta,
  quizHelpers,
  slice(A.bianZi, A.zhSession - 1),
  slice(A.zhSession, A.zhResult - 1),
  slice(A.wordDict, A.shuffle - 1),
  slice(A.shuffle, A.sessionScreen - 1),
  slice(A.sessionScreen, A.appFn - 1),
].join("\n\n");

const resultBody = [
  slice(A.zhResult, A.zhHome - 1),
  slice(A.studentResult, A.adminApp - 1),
].join("\n\n");

fs.mkdirSync(path.join(src, "components"), { recursive: true });
fs.mkdirSync(path.join(src, "lib"), { recursive: true });

const uiSharedHeader = `"use client";
import React, { useState, useRef, useEffect } from "react";

`;

const uiSharedFooter = `
export {
  C, TTS, SpeakBtn, SFX,
  Motion, AnimNumber, StarBurst, AnimProgressBar,
  Wrap, TagPill, BigBtn, ActionBtn, InputField,
  ErrorBox, HintBox, FeedbackBox, LearnCard, RevealBox, WrongBanner, RuleCard,
  StudentBottomNav,
};
`;

fs.writeFileSync(
  path.join(src, "lib/uiShared.js"),
  uiSharedHeader + uiSharedBody + uiSharedFooter,
);

const dashboardHeader = `"use client";
import React, { useState } from "react";
import {
  C, Wrap, AnimNumber, AnimProgressBar,
} from "@/lib/uiShared";

`;

const studentShell = `
export function StudentShell({ user, grade, subject, onGradeChange, onSubjectChange, onLogout, toastMsg, onToastDone }) {
  return (
    <>
      <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A6E)",padding:"18px 20px 0"}}>
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
        </div>
        <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto"}}>
          {GRADES.map(g=>(
            <button key={g} onClick={()=>onGradeChange(g)} style={{background:grade===g?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.12)",border:"none",borderRadius:10,padding:"6px 14px",color:grade===g?"#0F172A":"rgba(255,255,255,0.7)",fontSize:13,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all 0.2s"}}>
              {g}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.12)"}}>
          {Object.entries(SUBJECTS).map(([key,sub])=>{
            const live=!!LIVE_CONTENT[\`\${grade}_\${key}\`];
            return(
              <button key={key} onClick={()=>onSubjectChange(key, live)} style={{flex:1,background:"none",border:"none",borderBottom:subject===key?"2.5px solid #fff":"2.5px solid transparent",padding:"10px 4px 10px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <span style={{fontSize:16}}>{sub.icon}</span>
                <span style={{fontSize:9,fontWeight:subject===key?800:500,color:subject===key?"#fff":"rgba(255,255,255,0.45)",whiteSpace:"nowrap"}}>{key}</span>
                {!live&&<span style={{fontSize:7,color:"rgba(255,255,255,0.5)",fontWeight:700}}>Coming Soon</span>}
              </button>
            );
          })}
        </div>
      </div>
      {toastMsg&&<ComingSoonToast message={toastMsg} onDone={onToastDone}/>}
    </>
  );
}
`;

const dashboardExports = `
export {
  SUBJECTS, GRADES, LIVE_CONTENT,
  ComingSoonToast, SubjectSelectScreen, ComingSoonScreen,
  LevelPicker, StudentHome, ZhHome, StudentShell,
};
`;

fs.writeFileSync(
  path.join(src, "components/Dashboard.js"),
  dashboardHeader + dashboardBody + studentShell + dashboardExports,
);

const quizHeader = `"use client";
import React, { useState, useRef } from "react";
import {
  C, TTS, SpeakBtn, SFX,
  Wrap, TagPill, ActionBtn, HintBox, FeedbackBox, LearnCard, RevealBox, WrongBanner, RuleCard,
} from "@/lib/uiShared";

`;

const quizExports = `
export {
  SECTIONS, SECTION_ORDER, ZH_SECTIONS, ZH_SECTION_ORDER,
  WORD_DICT,
  reviewDays, scoreBadge, fmtTime, guessFlag, todayStr, dateLabel,
  seededShuffle,
  SessionScreen, ZhSessionScreen,
};
`;

fs.writeFileSync(
  path.join(src, "components/QuizEngine.js"),
  quizHeader + quizBody + quizExports,
);

const resultHeader = `"use client";
import React from "react";
import { C, AnimProgressBar } from "@/lib/uiShared";
import { SECTIONS, SECTION_ORDER, ZH_SECTION_ORDER, ZH_SECTIONS } from "@/components/QuizEngine";

`;

const resultExports = `
export { StudentResultScreen, ZhResultScreen };
`;

fs.writeFileSync(
  path.join(src, "components/ResultScreen.js"),
  resultHeader + resultBody + resultExports,
);

const newImports = `"use client";
import React from 'react';
import { useState, useRef, useEffect } from "react";

import {
  pickEnglishPaper,
  pickChinesePaper,
  englishPaperToPlan,
  englishPaperToLegacyInfo,
  buildChinesePlanFromPaper,
} from '@/lib/p3PaperBridge';

import {
  SUBJECTS, GRADES, LIVE_CONTENT,
  ComingSoonToast, SubjectSelectScreen, ComingSoonScreen,
  LevelPicker, StudentHome, ZhHome, StudentShell,
} from '@/components/Dashboard';

import {
  SessionScreen, ZhSessionScreen,
  SECTION_ORDER, ZH_SECTION_ORDER,
  WORD_DICT, todayStr, fmtTime, seededShuffle,
} from '@/components/QuizEngine';

import { StudentResultScreen, ZhResultScreen } from '@/components/ResultScreen';

import { Wrap, StudentBottomNav, C, BigBtn, ErrorBox, InputField } from '@/lib/uiShared';

`;

const claudeCore = [
  slice(A.getMistakeIds, A.sections - 1),
  slice(lineIndex("const LIVE_CONTENT =") + 1, A.zhSections - 1),
  slice(lineIndex("function buildZhPlan"), A.bianZi - 1),
].join("\n\n");

const claudeApps = [
  slice(A.chineseApp, A.authScreen - 1),
  slice(A.authScreen, A.studentApp - 1),
  slice(A.studentApp, A.pickByLevel - 1),
  slice(A.pickByLevel, A.comingSoonScreen - 1),
  slice(A.adminApp, A.wordDict - 1),
  slice(A.appFn, lines.length),
].join("\n\n");

let newClaudeApp = newImports + claudeCore + "\n\n" + claudeApps;

fs.writeFileSync(appPath, newClaudeApp);

console.log("Split complete.");
for (const f of ["lib/uiShared.js", "components/Dashboard.js", "components/QuizEngine.js", "components/ResultScreen.js", "app/ClaudeApp.js"]) {
  const n = fs.readFileSync(path.join(src, f), "utf8").split("\n").length;
  console.log(`${f}: ${n} lines`);
}

// Thin StudentApp: use StudentShell instead of duplicated header chrome
const studentPatchRe = /  return\(\s*\n    <Wrap>\s*<div style=\{\{background:"linear-gradient\(135deg,#0F172A,#1E3A6E\)"[\s\S]*?\n      <\/div>\s*\{\!isLive \? \(/;
const studentPatch = `  return(
    <Wrap>
      <StudentShell
        user={user}
        grade={grade}
        subject={subject}
        onGradeChange={(g)=>{setGrade(g);setScreen("home");}}
        onSubjectChange={(key, live)=>{ setSubject(key); setScreen("home"); if(!live) setStudentToast("Coming Soon: \u00ec\u00a4\u0080\u00eb\u00b9\u0084 \u00ec\u00a4\u0091\u00ec\u009d\u00b8 \u00ea\u00b3\u00bc\u00eb\u00aa\u00a9\u00ec\u009e\u0085\u00eb\u008b\u0088\u00eb\u008b\u00a4"); else setStudentToast(null); }}
        onLogout={onLogout}
        toastMsg={studentToast}
        onToastDone={()=>setStudentToast(null)}
      />
      {!isLive ? (`;
if (studentPatchRe.test(newClaudeApp)) {
  newClaudeApp = newClaudeApp.replace(studentPatchRe, studentPatch);
  newClaudeApp = newClaudeApp.replace(/\n      \{studentToast&&<ComingSoonToast message=\{studentToast\} onDone=\{\(\)=>setStudentToast\(null\)\}\/>\}/, "");
  fs.writeFileSync(appPath, newClaudeApp);
}
