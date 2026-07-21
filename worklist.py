# -*- coding: utf-8 -*-
import json, re, sys
SET=sys.argv[1]
seg=json.load(open('/tmp/out/zh_segments.json')); d=json.load(open('/tmp/out/zh_dict.json'))
sets=json.load(open('/tmp/out/wa1_zh_complete.json'))
acc=json.load(open('/tmp/out/zh_dict_authored.json')); bb=json.load(open('/tmp/out/zs01_10_backbone.json'))
HAN=re.compile(r'[一-鿿]')
def stim_of(s0):
    stim=[]
    def add(x):
        if isinstance(x,str) and HAN.search(x): stim.append(x)
    for sec in s0['plan']:
        t=sec['type']
        for it in sec.get('items',[]):
            if t in ('HanziMcq','PinyinMcq','VocabMcq'):
                add(it.get('sentence')); [add(o) for o in it.get('options',[])]
            elif t=='VocabMatch':
                [add(p) for p in it.get('pool',[])]; [add(sub.get('stem')) for sub in it.get('items',[])]
            elif t=='SentenceCraft':
                add(it.get('sentenceA')); add(it.get('sentenceB')); add(it.get('answer')); add(it.get('connector')); [add(x) for x in it.get('tiles',[])]
            elif t=='PassageCloze':
                add(it.get('passage')); [add(w) for w in it.get('wordBank',[])]; [add(b.get('answer')) for b in it.get('blanks',[])]
            elif t in ('ReadingMcq','ReadingOpen'):
                add(it.get('passage'))
                for q in it.get('questions',[]):
                    add(q.get('stem') or q.get('question')); [add(o) for o in q.get('options',[])]; add(q.get('answer'))
                    sol=q.get('solution',{})
                    if isinstance(sol,dict): add(sol.get('evidence'))
    return stim
s0=[s for s in sets if s['setId']==SET][0]
words=set()
for st in stim_of(s0):
    for tk in seg.get(st,[]):
        if tk['clk']: words.add(tk['t'])
content=[w for w in words if not d[w]['stop']]
new=sorted([w for w in content if w not in acc])
print(f'{SET} 내용어 {len(content)} | 중복 {len(content)-len(new)} | 신규 {len(new)}')
for w in new:
    e=bb.get(w,{}); en=e.get('en','') or '—'
    ex=((e.get('ex') or {}).get('zh') or 'NO-EX').replace('{u}','').replace('{/u}','')
    print(f"{w}\t{e.get('py','?')}\t{en}\t{ex}")
json.dump(new, open(f'/tmp/out/{SET.lower()}_new.json','w'), ensure_ascii=False)
