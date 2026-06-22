// patch_dashboard.js
// Run: node patch_dashboard.js
// Adds AI Adaptive Practice button to SubjectSelectScreen in Dashboard.js

const fs = require('fs');
const path = require('path');

const dashPath = path.join(process.env.USERPROFILE, 'psle-app', 'src', 'components', 'Dashboard.js');
let content = fs.readFileSync(dashPath, 'utf8');

// ── 1. Find insertion point: after the subjects grid, before toastMsg
// The subjects grid ends with: {toastMsg&&<ComingSoonToast ...
const insertBefore = `  {toastMsg&&<ComingSoonToast message={toastMsg} onDone={()=>setToastMsg(null)}/>}`;

if (!content.includes(insertBefore)) {
  console.error('ERROR: Could not find insertion point in SubjectSelectScreen');
  console.log('Looking for:', insertBefore);
  process.exit(1);
}

// ── 2. AI Adaptive button + stage modal JSX
const aiButton = `
  {/* AI ADAPTIVE PRACTICE SECTION */}
  {showStageModal && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}
      onClick={()=>setShowStageModal(false)}>
      <div style={{background:"#fff",borderRadius:20,padding:"24px 20px",width:"min(92vw,360px)",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}
        onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:900,fontSize:17,color:"#1a1a2e",marginBottom:4}}>AI Adaptive Practice</div>
        <div style={{fontSize:12,color:"#888",marginBottom:16}}>Select exam stage for {grade} English</div>
        {["WA1","WA2","WA3","EOY"].map(stage => (
          <button key={stage} onClick={()=>{
            setShowStageModal(false);
            window.location.href = "/adaptive?grade="+grade+"&subject=English&stage="+stage+"&userId="+(user.id||"")+"&userName="+(encodeURIComponent(user.name||""))+"&school="+(encodeURIComponent(user.school||""));
          }} style={{
            width:"100%",marginBottom:8,padding:"12px 16px",borderRadius:12,
            border:"1.5px solid #E0E0EE",background:"#F8F8FF",
            cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"
          }}>
            <span style={{fontWeight:700,fontSize:14,color:"#1a1a2e"}}>{stage}</span>
            <span style={{fontSize:11,color:"#888"}}>
              {stage==="WA1"?"Term 1 Assessment":stage==="WA2"?"Mid-Year Exam":stage==="WA3"?"Term 3 Assessment":"End-of-Year Exam"}
            </span>
          </button>
        ))}
        <button onClick={()=>setShowStageModal(false)} style={{
          width:"100%",padding:"10px",borderRadius:12,border:"none",
          background:"#F0F0F8",color:"#888",fontWeight:600,fontSize:13,cursor:"pointer",marginTop:4
        }}>Cancel</button>
      </div>
    </div>
  )}
  <div style={{margin:"16px 16px 0"}}>
    <button onClick={()=>setShowStageModal(true)} style={{
      width:"100%",padding:"14px 16px",borderRadius:16,border:"none",
      background:"linear-gradient(135deg,#7B68EE,#5B4FBE)",
      color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",
      display:"flex",alignItems:"center",justifyContent:"center",gap:10,
      boxShadow:"0 4px 16px rgba(123,104,238,0.35)"
    }}>
      <span style={{fontSize:18}}>*</span>
      AI Adaptive Practice
      <span style={{fontSize:11,fontWeight:600,background:"rgba(255,255,255,0.2)",
        padding:"2px 8px",borderRadius:20}}>NEW</span>
    </button>
    <div style={{fontSize:10,color:"#94A3B8",textAlign:"center",marginTop:6}}>
      Personalised questions based on your performance
    </div>
  </div>
`;

// ── 3. Add useState for showStageModal
// Find: const [comingSoon, setComingSoon] = React.useState(null);
const stateInsertAfter = `const [comingSoon, setComingSoon] = React.useState(null);`;
if (!content.includes(stateInsertAfter)) {
  console.error('ERROR: Could not find useState insertion point');
  process.exit(1);
}

content = content.replace(
  stateInsertAfter,
  stateInsertAfter + `\n  const [showStageModal, setShowStageModal] = React.useState(false);`
);
console.log('✅ Added showStageModal state');

// ── 4. Insert AI button before toastMsg
content = content.replace(insertBefore, aiButton + `\n  ` + insertBefore);
console.log('✅ Added AI Adaptive Practice button');

// ── 5. Write back
fs.writeFileSync(dashPath, content, 'utf8');
const stats = fs.statSync(dashPath);
console.log('Done! Dashboard.js:', stats.size, 'bytes');
