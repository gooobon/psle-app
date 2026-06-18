import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const appPath = path.join(root, "src/app/ClaudeApp.js");

let content = fs.readFileSync(appPath, "utf8");

// ── 1. Backup MATH_QB + MATH_PAST_PAPER ─────────────────────────────────────
const mathStart = content.indexOf("const MATH_QB = ");
const mathEnd = content.indexOf("function buildMathPlan");
if (mathStart === -1 || mathEnd === -1) {
  console.error("Could not locate MATH_QB block for backup");
  process.exit(1);
}
const mathBlock = content.slice(mathStart, mathEnd);
const sandbox = {};
vm.runInNewContext(mathBlock, sandbox);

const backupDir = path.join(root, "src/data/p3/backup");
fs.mkdirSync(backupDir, { recursive: true });
const backupPath = path.join(backupDir, "math_science_backup.json");
fs.writeFileSync(
  backupPath,
  JSON.stringify(
    {
      extractedAt: new Date().toISOString(),
      source: "src/app/ClaudeApp.js",
      note: "Hardcoded math question bank purged from ClaudeApp.js. No SCIENCE_QB was present in the codebase.",
      MATH_QB: sandbox.MATH_QB,
      MATH_PAST_PAPER: sandbox.MATH_PAST_PAPER,
      SCIENCE_QB: null,
    },
    null,
    2,
  ),
);
console.log("Backup written:", backupPath);

// ── 2. Remove KaTeX math rendering block ────────────────────────────────────
const katexStart = content.indexOf("// ── KaTeX Math Rendering");
const katexEnd = content.indexOf("// ── Audio Feedback with Tone.js");
if (katexStart !== -1 && katexEnd !== -1) {
  content = content.slice(0, katexStart) + content.slice(katexEnd);
}

// ── 3. Remove speakMath from TTS ────────────────────────────────────────────
content = content.replace(
  /  speakMath\(text\)\s+\{ this\.speak\(text, 'en-SG', 0\.85\); \},\n/,
  "",
);

// ── 4. Remove MC … MathApp block ─────────────────────────────────────────────
const mcStart = content.indexOf("const MC = {");
const authStart = content.indexOf("function AuthScreen({onLogin, onSignup}){");
if (mcStart === -1 || authStart === -1) {
  console.error("Could not locate MC/MathApp block");
  process.exit(1);
}
content = content.slice(0, mcStart) + content.slice(authStart);

// ── 5. Remove MathApp routing in StudentApp ───────────────────────────────────
content = content.replace(
  /\n  if\(subjectSelected && subject==="Math" && isLive\) return\(\n    <MathApp[\s\S]*?\n  \);\n/,
  "\n",
);

// ── 6. Update SUBJECTS / LIVE_CONTENT ─────────────────────────────────────────
content = content.replace(
  /Math:\s+\{ label:"Mathematics", icon:"🔢", color:"#0D9488", live:true,\s+desc:"MCQ · Short Answer · Problem Sums" \},/,
  'Math:     { label:"Mathematics", icon:"🔢", color:"#0D9488", live:false, desc:"Coming soon!" },',
);
content = content.replace(
  /const LIVE_CONTENT = \{ "P3_English": true, "P3_Chinese": true, "P3_Math": true \};/,
  'const LIVE_CONTENT = { "P3_English": true, "P3_Chinese": true };',
);

// ── 7. Update coming-soon modal copy ──────────────────────────────────────────
content = content.replace(
  /✅ Currently available: P3 English, Chinese & Math/,
  "✅ Currently available: P3 English & Chinese",
);

// ── 8. Remove unused direct paper imports (bridge owns them) ─────────────────
content = content.replace(
  /import \{ allP3EnglishPapers \} from '@\/data\/p3\/english\/papers';\nimport \{ allP3ChinesePapers \} from '@\/data\/p3\/chinese\/papers';\n/,
  "",
);

// ── 9. Simplify getAIHint — drop Math branch ────────────────────────────────
content = content.replace(
  /const prompt = subject === 'Math'\n      \? `A Primary 3 Singapore student got this Math question wrong\.\nTopic: \$\{topic\}\nQuestion: \$\{question\}\n\$\{studentAnswer\?'Their answer: '\+studentAnswer:''\}\nGive ONE short hint \(max 15 words\) to guide them\. Use simple words\. Do NOT give the answer\.`\n      : subject === 'Chinese'/,
  "const prompt = subject === 'Chinese'",
);

fs.writeFileSync(appPath, content);
console.log("ClaudeApp.js purged. New size:", content.split("\n").length, "lines");
