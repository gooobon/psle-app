# -*- coding: utf-8 -*-
# ZS01-10 자동 백본: 병음 + 실문장 예문 + 시드 en. 손저작 남는 필드 리포트.
import json, sys, re
sys.path[:0]=['/tmp/jb/jieba-0.42.1','/tmp/pp']
import jieba
from pypinyin import pinyin, Style
from collections import Counter, defaultdict

seg=json.load(open('zh_segments.json'))
d=json.load(open('zh_dict.json'))
sets=json.load(open('wa1_zh_complete.json'))
seed_py=json.load(open('seed_py.json'))
HAN=re.compile(r'[一-鿿]')
known=set(d.keys())
for w in known:
    if len(w)>=2: jieba.add_word(w, freq=100000)

MANUAL=json.load(open('/dev/stdin')) if False else {
 '奶奶':'nǎinai','妹妹':'mèimei','我们':'wǒmen','他们':'tāmen','你们':'nǐmen',
 '这个':'zhège','那个':'nàge','出来':'chūlai','起来':'qǐlai','下来':'xiàlai',
 '困难':'kùnnan','身体':'shēntǐ','勤快':'qínkuai','怀疑':'huáiyí','作业':'zuòyè',
 '运动会':'yùndònghuì','唱歌':'chànggē','东西':'dōngxi','时候':'shíhou','明白':'míngbai',
 '知道':'zhīdao','漂亮':'piàoliang','衣服':'yīfu','头发':'tóufa','眼睛':'yǎnjing',
 '喜欢':'xǐhuan','爸爸':'bàba','哥哥':'gēge','弟弟':'dìdi','姐姐':'jiějie',
 '朋友':'péngyou','关系':'guānxi','清楚':'qīngchu','暖和':'nuǎnhuo','热闹':'rènao',
}
def wpy(w):
    if w in seed_py: return seed_py[w]
    if w in MANUAL: return MANUAL[w]
    return ''.join(a[0] for a in pinyin(w, style=Style.TONE, errors='default'))
PUNC=re.compile(r'[^一-鿿]')
def spy(s):
    out=[]
    for w in jieba.cut(s):
        if PUNC.fullmatch(w): out.append(w.strip())
        else: out.append(wpy(w))
    return ' '.join(x for x in out if x).replace(' 。','。').replace(' ，','，').replace(' ！','！').replace(' ？','？')

targets=set(f'ZS{n:02d}' for n in range(1,11))

# 각 단어가 등장하는 stimulus 문장 수집 (실문장 예문 후보)
def stim_of(s0):
    out=[]
    def add(x):
        if isinstance(x,str) and HAN.search(x): out.append(x)
    for sec in s0['plan']:
        t=sec['type']
        for it in sec.get('items',[]):
            if t in ('HanziMcq','PinyinMcq','VocabMcq'):
                add(it.get('sentence'))
            elif t=='SentenceCraft':
                add(it.get('sentenceA')); add(it.get('sentenceB'))
            elif t=='PassageCloze':
                add(it.get('passage'))
            elif t in ('ReadingMcq','ReadingOpen'):
                add(it.get('passage'))
    return out

# passage를 문장 단위로 쪼갬
def split_sents(text):
    return [x for x in re.split(r'(?<=[。！？])', text) if HAN.search(x)]

word_sents=defaultdict(list)
content=set()
for s in sets:
    if s['setId'] not in targets: continue
    for st in stim_of(s):
        for sent in split_sents(st):
            sent=sent.strip()
            if '___' in sent or '（' in sent or '(' in sent: 
                # 빈칸/괄호 문장은 예문 부적합 (일부만)
                clean=re.sub(r'[（(].*?[)）]','',sent)
                clean=clean.replace('___','').replace('__','')
                if '___' in sent: continue
                sent=clean.strip()
            toks=[t['t'] for t in seg.get(sent,[]) if t['clk']] if sent in seg else list(jieba.cut(sent))
            for w in toks:
                if HAN.search(w): word_sents[w].append(sent)
    # content words of this set
    for st in ( [x for sec in s['plan'] for x in [] ] ):
        pass

# content 목록 (전 배치)
content=set(json.load(open('zs01_10_content.json')))

def best_example(w):
    cands=[c for c in word_sents.get(w,[]) if w in c and 6<=len(c)<=20 and '___' not in c]
    cands.sort(key=lambda c:(abs(len(c)-12)))
    return cands[0] if cands else None

backbone={}
need_en=[]; need_ex=[]
for w in sorted(content):
    e=d[w]
    py=wpy(w)
    en=e['en'] if e['src']=='keyword' and e['en'] else ''
    ex=best_example(w)
    if not en: need_en.append(w)
    if not ex: need_ex.append(w)
    backbone[w]={'py':py,'pos':'','en':en,'syn':[],'ant':[],
                 'ex':({'zh':ex,'py':spy(ex),'en':''} if ex else None),
                 'src':'auto','stop':False,'needs_content':True}
json.dump(backbone, open('zs01_10_backbone.json','w'), ensure_ascii=False)
print('backbone words:', len(backbone))
print('  en 시드 채움:', len(content)-len(need_en), '/ 신규 en 필요:', len(need_en))
print('  실문장 예문 확보:', len(content)-len(need_ex), '/ 예문 손저작 필요:', len(need_ex))
json.dump(need_en, open('need_en.json','w'), ensure_ascii=False)
json.dump(need_ex, open('need_ex.json','w'), ensure_ascii=False)
