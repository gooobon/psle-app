import fs from "fs";
import path from "path";

const file = path.resolve("src/app/ClaudeApp.js");
let src = fs.readFileSync(file, "utf8");

// 1. Add imports after use client imports
const importBlock = `import { allP3EnglishPapers } from '@/data/p3/english/papers';
import { allP3ChinesePapers } from '@/data/p3/chinese/papers';
import {
  pickEnglishPaper,
  pickChinesePaper,
  englishPaperToPlan,
  englishPaperToLegacyInfo,
  buildChinesePlanFromPaper,
} from '@/lib/p3PaperBridge';
`;

if (!src.includes("allP3EnglishPapers")) {
  src = src.replace(
    /("use client";\nimport React from 'react';\nimport \{ useState, useRef, useEffect \} from "react";\n)/,
    `$1\n${importBlock}`,
  );
}

// 2. Remove QB
src = src.replace(/const QB = \{[\s\S]*?\n\};\n\nfunction reviewDays/, "function reviewDays");

// 3. Remove ZH_QB + ZH_PAST_PAPER_AITONG
src = src.replace(
  /const ZH_QB = \{[\s\S]*?\n\};\n\nconst ZH_PAST_PAPER_AITONG = \{[\s\S]*?\n\};\n\nfunction buildZhPlan/,
  "function buildZhPlan",
);

// 4. Replace buildZhPlan + buildZhPastPaperPlan
src = src.replace(
  /function buildZhPlan\(sessionNum, level\) \{[\s\S]*?\n\}\n\nfunction buildZhPastPaperPlan\(sessionNum\) \{[\s\S]*?\n\}/,
  `function buildZhPlan(sessionNum, level) {
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
}`,
);

// 5. Fix ZhSessionScreen isPastPaper check
src = src.replace(
  /const isPastPaper = plan\[0\]\?\.items === ZH_PAST_PAPER_AITONG\?\.BianZi;/,
  "const isPastPaper = !!plan.isPastPaper;",
);

// 6. Remove PAST_PAPERS and replace selectPastPaper, buildPastPaperPlan, buildPlan
src = src.replace(
  /const PAST_PAPERS = \{[\s\S]*?\n\};\n\nfunction selectPastPaper[\s\S]*?\n\}\n\nfunction buildPastPaperPlan[\s\S]*?\n\}\n\n/,
  "",
);

const planFunctions = `function selectPastPaper(schoolName) {
  const paper = pickEnglishPaper({ schoolName, sessionNum: 11, isPastPaper: true });
  return englishPaperToLegacyInfo(paper);
}

function buildPastPaperPlan(settings, schoolName, sessionNum) {
  const paper = pickEnglishPaper({ schoolName, sessionNum: sessionNum||11, isPastPaper: true });
  return englishPaperToPlan(paper, settings, "medium", sessionNum, schoolName, pickByLevel, pickQuestionsForSchool);
}

`;

src = src.replace(/function buildPlan\(settings, schoolName, sessionNum, level\)\{[\s\S]*?\n\}/, "");

const buildPlanNew = `function buildPlan(settings, schoolName, sessionNum, level){
  const isPast = level==="pastpaper" || (sessionNum && sessionNum >= 11 && !LEVEL_MAP[level]);
  const paper = pickEnglishPaper({ schoolName, sessionNum: sessionNum||1, isPastPaper: isPast });
  return englishPaperToPlan(paper, settings, level, sessionNum, schoolName, pickByLevel, pickQuestionsForSchool);
}`;

// Insert plan functions before buildPlan location - find recommendLevel and insert before buildPlan
if (!src.includes("function selectPastPaper")) {
  src = src.replace(
    /(function recommendLevel\(history\)\{[\s\S]*?\n\}\n\n)/,
    `$1${planFunctions}`,
  );
}

if (!src.includes("englishPaperToPlan")) {
  // buildPlan was removed - add it back
  src = src.replace(
    /(function recommendLevel\(history\)\{[\s\S]*?\n\}\n\n(?:function selectPastPaper[\s\S]*?\n\}\n\nfunction buildPastPaperPlan[\s\S]*?\n\}\n\n)?)/,
    `$1${buildPlanNew}\n\n`,
  );
} else {
  src = src.replace(
    /function buildPlan\(settings, schoolName, sessionNum, level\)\{[\s\S]*?\n\}/,
    buildPlanNew,
  );
}

fs.writeFileSync(file, src, "utf8");
console.log("Refactored ClaudeApp.js");
console.log("Lines:", src.split("\n").length);
console.log("Has QB:", src.includes("const QB ="));
console.log("Has ZH_QB:", src.includes("const ZH_QB ="));
console.log("Has PAST_PAPERS:", src.includes("const PAST_PAPERS ="));
console.log("Has imports:", src.includes("allP3EnglishPapers"));
