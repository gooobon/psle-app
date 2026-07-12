const fs=require('fs');
const {validatePracticeSets}=require('./zh_wa1_validate.js');
const sets=JSON.parse(fs.readFileSync('duoyinzi_cursor.json','utf8'));
const r=validatePracticeSets(sets,{requireExplain:true,expectSetCount:sets.length});
let issues=[...r.fails];
for(const s of sets){
  let duo=0;
  for(const sc of s.plan){
    if(!['HanziMcq','PinyinMcq','VocabMcq'].includes(sc.type)) continue;
    for(const q of sc.items){
      if(q.skill==='duoyinzi') duo++;
      if(Array.isArray(q.options) && new Set(q.options).size!==q.options.length) issues.push(q.id+': dup options');
      if(q.explain&&Array.isArray(q.explain.distractors)){
        q.explain.distractors.forEach((t,i)=>{
          if(t.includes('\u2713')&&i!==q.answer) issues.push(q.id+': \u2713 misplaced');
          if(!t.includes('\u2713')&&i===q.answer) issues.push(q.id+': answer lacks \u2713');
        });
        if(q.explain.distractors.length!==q.options.length) issues.push(q.id+': distractors len');
      }
    }
    if(sc.type==='PinyinMcq'){
      for(const q of sc.items){
        const o=(q.sentence.match(/\{u\}/g)||[]).length, c=(q.sentence.match(/\{\/u\}/g)||[]).length;
        if(o!==1||c!==1) issues.push(q.id+': {u} marker');
      }
    }
  }
  if(duo<1) issues.push(s.setId+': still no duoyinzi');
}
console.log('sets:',sets.length,'| result:', issues.length?issues:'ALL PASS');
