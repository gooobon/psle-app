# -*- coding: utf-8 -*-
import json, sys, re
sys.path[:0]=['/tmp/jb/jieba-0.42.1','/tmp/pp']
import jieba
from pypinyin import pinyin, Style
seed_py=json.load(open('/tmp/out/seed_py.json'))
d=json.load(open('/tmp/out/zh_dict.json'))
for w in set(d):
    if len(w)>=2: jieba.add_word(w, freq=100000)
MANUAL={'妈妈':'māma','爸爸妈妈':'bàba māma','孩子':'háizi','告诉':'gàosu','自己':'zìjǐ'}
def wpy(w):
    if w in seed_py: return seed_py[w]
    if w in MANUAL: return MANUAL[w]
    return ''.join(a[0] for a in pinyin(w, style=Style.TONE, errors='default'))
PUNC=re.compile(r'[^一-鿿]')
def spy(s):
    out=[]
    for w in jieba.cut(s):
        out.append(w.strip() if PUNC.fullmatch(w) else wpy(w))
    return ' '.join(x for x in out if x).replace(' 。','。').replace(' ，','，').replace(' ！','！').replace(' ？','？')

# 누락 11 + (필요시 예문)
MISS=[
("妈妈","Mum",["母亲"],["爸爸"],"妈妈每天为我做饭。"),
("想","to think; to want",["思考"],[],"我想快点长大。"),
("每天","every day",[],[],"爷爷每天去公园散步。"),
("心里","in one's heart",[],[],"他心里很开心。"),
("自己","oneself",[],[],"这是我自己画的。"),
("告诉","to tell",[],[],"请告诉我你的名字。"),
("快乐","happy; joyful",["开心"],["伤心"],"祝你生日快乐。"),
("一本","one (book)",[],[],"我买了一本新书。"),
("小心","careful; to be careful",["当心"],["大意"],"过马路要小心。"),
("点头","to nod",[],["摇头"],"他点头表示同意。"),
("地说","(adverb marker) + to say",[],[],None),  # 분사 아티팩트→세그먼트 수정 대상
]
# 예문 미확보 32 (+아티팩트)
EX32={
"表演":"同学们上台表演节目。","大声":"请不要大声喧哗。","悄悄":"他悄悄地走进教室。",
"墙壁":"墙壁上挂着一幅地图。","小杰":"小杰是我的同桌。","足球运动员":"他想当足球运动员。",
"好孩子":"你是个听话的好孩子。","这么":"今天怎么这么冷？","决定":"我决定参加比赛。",
"之后":"吃完饭之后去散步。","马上":"铃响了，我们马上回座位。","停止":"过了一会儿，雨停止了。",
"请":"请坐下来休息。","这篇":"这篇短文很有趣。","短文":"老师让我们读一篇短文。",
"踢足球":"他喜欢在操场踢足球。","才能":"只有努力才能成功。","爸爸妈妈":"爸爸妈妈都很爱我。",
"关心":"老师很关心每个同学。","孩子":"这个孩子很懂事。","读":"我每天读课文。",
"意见":"请说说你的意见。","改进":"他改进了学习方法。","小小":"一颗小小的种子发芽了。",
"写得":"这个故事写得很生动。","生动":"这篇作文写得很生动。","有趣":"这本书很有趣。",
"相近":"这两个字读音相近。","好玩":"公园里很好玩。","后会":"我们后会有期。",
"感受":"写出你真实的感受。","得到":"他得到了老师的表扬。",
}

pilot=json.load(open('/tmp/out/zs01_pilot_dict.json'))
auth=json.load(open('/tmp/out/zs01_authored189.json'))

# 자기동의어/자기반의어 제거
for dd in (pilot,auth):
    for w,e in dd.items():
        e['syn']=[x for x in e['syn'] if x!=w][:2]
        e['ant']=[x for x in e['ant'] if x!=w][:2]

# 예문 채우기
for w,ex in EX32.items():
    if w in auth:
        auth[w]['ex']={'zh':ex,'py':spy(ex),'en':''}

# 누락 병합
for w,en,syn,ant,exzh in MISS:
    ex=None
    if exzh: ex={'zh':exzh,'py':spy(exzh),'en':''}
    auth[w]={'py':wpy(w),'pos':'','en':en,'syn':[x for x in syn if x!=w][:2],
             'ant':[x for x in ant if x!=w][:2],'ex':ex,'src':'authored','stop':False,'needs_content':False}

full={}
full.update(auth); full.update(pilot)  # pilot이 우선(최고품질)
json.dump(full, open('/tmp/out/zs01_full_dict.json','w'), ensure_ascii=False, indent=0)

# ── 종합 검증 ──
content=set(json.load(open('/tmp/out/zs01_words.json'))['content'])
TONE=re.compile(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]');DIG=re.compile(r'[0-9]');HAN=re.compile(r'[一-鿿]')
errs=[]; noex=[]
cover=content - set(full)
if cover: errs.append(('MISSING',len(cover),sorted(cover)))
for w,e in full.items():
    if not TONE.search(e['py']) or DIG.search(e['py']): errs.append((w,'py',e['py']))
    if not e['en'].strip(): errs.append((w,'no en'))
    ex=e['ex']
    if not ex: noex.append(w); continue
    if w not in ex['zh']: errs.append((w,'ex no headword',ex['zh']))
    if not TONE.search(ex['py']) or DIG.search(ex['py']): errs.append((w,'ex py',ex['py']))
    if len(ex['zh'])>22: errs.append((w,'ex long',len(ex['zh'])))
    if len(e['syn'])>2 or len(e['ant'])>2: errs.append((w,'>2'))
    for x in e['syn']+e['ant']:
        if x==w: errs.append((w,'self-rel'))
        if not HAN.search(x): errs.append((w,'nonhan rel',x))
print('ZS01 full dict entries:', len(full), '| content target:', len(content))
print('VERIFY:', 'PASS' if not errs else 'FAIL', '| errors', len(errs), '| no-example', len(noex))
for x in errs[:20]: print('  ',x)
if noex: print('  예문 없음:', noex)
