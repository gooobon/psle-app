import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const appPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/app/ClaudeApp.js");
let s = fs.readFileSync(appPath, "utf8");
const re = /  return\(\s*\n    <Wrap>\s*<div style=\{\{background:"linear-gradient\(135deg,#0F172A,#1E3A6E\)"[\s\S]*?\n      <\/div>\s*\{\!isLive \? \(/;
const replacement = `  return(
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
if (!re.test(s)) {
  console.error("StudentApp shell block not found");
  process.exit(1);
}
s = s.replace(re, replacement);
// Remove duplicate ComingSoonToast at bottom if StudentShell handles it
s = s.replace(/\n      \{studentToast&&<ComingSoonToast message=\{studentToast\} onDone=\{\(\)=>setStudentToast\(null\)\}\/>\}/, "");
fs.writeFileSync(appPath, s);
console.log("Patched StudentApp");
