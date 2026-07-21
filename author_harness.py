# -*- coding: utf-8 -*-
# 재사용 저작 하네스: python author_harness.py ZS02 zs02_data.json
# zs02_data.json = [[w,en,[syn],[ant], ex_zh|null], ...]
import json, sys, re
sys.path[:0]=['/tmp/jb/jieba-0.42.1','/tmp/pp']
import jieba
from pypinyin import pinyin, Style
SET=sys.argv[1]; DATA=sys.argv[2]
seed_py=json.load(open('/tmp/out/seed_py.json'))
d=json.load(open('/tmp/out/zh_dict.json'))
bb=json.load(open('/tmp/out/zs01_10_backbone.json'))
acc=json.load(open('/tmp/out/zh_dict_authored.json'))
for w in set(d):
    if len(w)>=2: jieba.add_word(w, freq=100000)
MANUAL={'妈妈':'māma','爸爸妈妈':'bàba māma','孩子':'háizi','告诉':'gàosu','自己':'zìjǐ',
 '奶奶':'nǎinai','妹妹':'mèimei','哥哥':'gēge','姐姐':'jiějie','爷爷':'yéye','外婆':'wàipó',
 '东西':'dōngxi','时候':'shíhou','明白':'míngbai','朋友':'péngyou','衣服':'yīfu','家务':'jiāwù',
 '热闹':'rènao','舍不得':'shěbude','答应':'dāying','漂亮':'piàoliang','喜欢':'xǐhuan','认识':'rènshi',
 '我们':'wǒmen','他们':'tāmen','出来':'chūlai','起来':'qǐlai','过去':'guòqu','回来':'huílai',
 '身体':'shēntǐ','故事':'gùshi','打扫':'dǎsǎo','收拾':'shōushi','暖和':'nuǎnhuo','便宜':'piányi'}
def wpy(w):
    if w in seed_py: return seed_py[w]
    if w in MANUAL: return MANUAL[w]
    return ''.join(a[0] for a in pinyin(w, style=Style.TONE, errors='default'))
PUNC=re.compile(r'[^一-鿿]')
def spy(s):
    out=[w.strip() if PUNC.fullmatch(w) else wpy(w) for w in jieba.cut(s)]
    r=' '.join(x for x in out if x)
    for p in '。，！？：':
        r=r.replace(' '+p,p)
    return r
def clean_ex(s):
    if not s: return None
    s=s.replace('{u}','').replace('{/u}','')
    s=re.sub(r'^[”“"\x27』」、：:，,]+','',s).strip()
    s=re.sub(r'[“”"\x27]','',s)
    if '___' in s or '（' in s or '(' in s: return None
    if not (6<=len(s)<=22): return None
    return s

A=json.load(open(DATA))
out={}
noex=[]
for row in A:
    w,en,syn,ant,exzh = row[:5]
    exen = row[5] if len(row)>5 else ''
    ex=None
    if exzh:
        ex={'zh':exzh,'py':spy(exzh),'en':exen}
    else:
        c=clean_ex((bb.get(w,{}).get('ex') or {}).get('zh'))
        if c and w in c: ex={'zh':c,'py':spy(c),'en':''}
        else: noex.append(w)
    out[w]={'py':wpy(w),'pos':'','en':en,
            'syn':[x for x in syn if x!=w][:2],'ant':[x for x in ant if x!=w][:2],
            'ex':ex,'src':'authored','stop':False,'needs_content':False}

# merge into accumulated
acc.update(out)
json.dump(acc, open('/tmp/out/zh_dict_authored.json','w'), ensure_ascii=False, indent=0)
json.dump(out, open(f'/tmp/out/{SET.lower()}_dict.json','w'), ensure_ascii=False, indent=0)

# verify this set's entries
TONE=re.compile(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]');DIG=re.compile(r'[0-9]');HAN=re.compile(r'[一-鿿]')
errs=[]
for w,e in out.items():
    if not TONE.search(e['py']) or DIG.search(e['py']): errs.append((w,'py',e['py']))
    if not e['en'].strip(): errs.append((w,'no en'))
    ex=e['ex']
    if ex:
        if w not in ex['zh']: errs.append((w,'ex no hw',ex['zh']))
        if not TONE.search(ex['py']) or DIG.search(ex['py']): errs.append((w,'ex py',ex['py']))
        if len(ex['zh'])>22: errs.append((w,'ex long'))
print(f'{SET}: authored {len(out)} | acc total {len(acc)}')
print('VERIFY', 'PASS' if not errs else 'FAIL', '| errs', len(errs), '| no-ex', len(noex))
for x in errs[:25]: print('  ',x)
if noex: print('  NO-EX(예문 손저작 필요):', noex)
