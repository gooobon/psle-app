#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
P1 생성기: 중국어 자극 텍스트 빌드타임 분사 + 사전 골격 + 커버리지 검증.
※ jieba/pypinyin 필요 → 클라우드 컨테이너에서 실행(기기엔 미설치). 산출물(json)만 repo에 커밋.
입력: wa1_zh_complete.json
산출: zh_segments.json, zh_dict.json, zh_overrides.json, zh_stoplist.json, P1_coverage_report.md
"""
import json, re, sys, os
from collections import Counter, defaultdict

SRC = sys.argv[1] if len(sys.argv)>1 else 'wa1_zh_complete.json'
OUT = sys.argv[2] if len(sys.argv)>2 else '.'

sys.path[:0] = ['/tmp/jb/jieba-0.42.1', '/tmp/pp']
import jieba
from pypinyin import pinyin, Style

HAN = re.compile(r'[一-鿿]')
def has_han(s): return isinstance(s,str) and bool(HAN.search(s))
def is_han_tok(s): return bool(s) and all(HAN.match(c) for c in s)

sets = json.load(open(SRC, encoding='utf-8'))

# ---------- 1. 구조화된 데이터에서 '정답으로 확실한' 단어 수집 → jieba userdict ----------
# 이 단어들은 보기/어휘함/정답 등에서 온 '실단어'라 절대 쪼개지면 안 됨.
known_words = set()
def add_known(x):
    if is_han_tok(x) and len(x) >= 2:
        known_words.add(x)

# keyword 시드 (문맥 뜻/병음의 정본)
kw_en = defaultdict(Counter)      # (w,py) -> Counter(en)
kw_py = defaultdict(Counter)      # w -> Counter(py)
overrides = defaultdict(dict)     # itemId -> { word: {en,py} }

def item_id(it): return it.get('id','')

def harvest(sec):
    t = sec['type']
    for it in sec.get('items', []):
        iid = item_id(it)
        if t in ('HanziMcq','PinyinMcq','VocabMcq'):
            for o in it.get('options', []): add_known(o)
            for kw in it.get('keywords', []):
                add_known(kw['w']); kw_en[(kw['w'],kw['py'])][kw['en']] += 1; kw_py[kw['w']][kw['py']] += 1
                if iid: overrides[iid][kw['w']] = {'en':kw['en'],'py':kw['py']}
        elif t == 'VocabMatch':
            for p in it.get('pool', []): add_known(p)
            for kw in it.get('keywords', []):
                add_known(kw['w']); kw_en[(kw['w'],kw['py'])][kw['en']] += 1; kw_py[kw['w']][kw['py']] += 1
            for sub in it.get('items', []):
                siid = item_id(sub) or iid
                for kw in sub.get('keywords', []):
                    add_known(kw['w']); kw_en[(kw['w'],kw['py'])][kw['en']] += 1; kw_py[kw['w']][kw['py']] += 1
                    if siid: overrides[siid][kw['w']] = {'en':kw['en'],'py':kw['py']}
        elif t == 'SentenceCraft':
            add_known(it.get('answer'))
            for tile in it.get('tiles', []): add_known(tile)
            for kw in it.get('keywords', []):
                add_known(kw['w']); kw_en[(kw['w'],kw['py'])][kw['en']] += 1; kw_py[kw['w']][kw['py']] += 1
                if iid: overrides[iid][kw['w']] = {'en':kw['en'],'py':kw['py']}
        elif t == 'PassageCloze':
            for w in it.get('wordBank', []): add_known(w)
            for b in it.get('blanks', []):
                add_known(b.get('answer'))
                biid = it.get('id','') + '#' + str(b.get('num',''))
                for kw in b.get('keywords', []):
                    add_known(kw['w']); kw_en[(kw['w'],kw['py'])][kw['en']] += 1; kw_py[kw['w']][kw['py']] += 1
                    overrides[biid][kw['w']] = {'en':kw['en'],'py':kw['py']}
        elif t in ('ReadingMcq','ReadingOpen'):
            for q in it.get('questions', []):
                qiid = item_id(q) or iid
                for o in q.get('options', []): add_known(o)
                for kw in q.get('keywords', []):
                    add_known(kw['w']); kw_en[(kw['w'],kw['py'])][kw['en']] += 1; kw_py[kw['w']][kw['py']] += 1
                    if qiid: overrides[qiid][kw['w']] = {'en':kw['en'],'py':kw['py']}

for s in sets:
    for sec in s['plan']:
        harvest(sec)

for w in known_words:
    jieba.add_word(w, freq=100000)   # 정답 단어는 강하게 고정

# 인명 사전(jieba가 쪼개는 미등록 이름만 큐레이션) — 고유명사 과분할 교정
NAMES = ['小丽','小乌','小云','小亮','小伟','小俊','小刚','小华','小安','小实','小思','小恩',
         '小敏','小文','小明','小星','小杰','小松','小玲','小红','小美','小芬','小芳','小诗',
         '小雯','阿伟','阿华','阿强','阿文','阿杰']
for w in NAMES:
    jieba.add_word(w, freq=100000)
known_words |= set(NAMES)

print('known-good userdict words:', len(known_words), '(names:', len(NAMES), ')')

# ---------- 2. 자극 텍스트(학생이 읽고 클릭할 대상) 수집 ----------
stim_strings = []   # 순서 보존, 중복 허용(빈도 계산용)
def add_stim(x):
    if has_han(x): stim_strings.append(x)

for s in sets:
    for sec in s['plan']:
        t = sec['type']
        for it in sec.get('items', []):
            if t in ('HanziMcq','PinyinMcq','VocabMcq'):
                add_stim(it.get('sentence'))
                for o in it.get('options', []): add_stim(o)
            elif t == 'VocabMatch':
                for p in it.get('pool', []): add_stim(p)
                for sub in it.get('items', []): add_stim(sub.get('stem'))
            elif t == 'SentenceCraft':
                add_stim(it.get('sentenceA')); add_stim(it.get('sentenceB'))
                add_stim(it.get('answer')); add_stim(it.get('connector'))
                for tile in it.get('tiles', []): add_stim(tile)
            elif t == 'PassageCloze':
                add_stim(it.get('passage'))
                for w in it.get('wordBank', []): add_stim(w)
                for b in it.get('blanks', []): add_stim(b.get('answer'))
            elif t in ('ReadingMcq','ReadingOpen'):
                add_stim(it.get('passage'))
                for q in it.get('questions', []):
                    add_stim(q.get('stem') or q.get('question'))
                    for o in q.get('options', []): add_stim(o)
                    add_stim(q.get('answer'))
                    sol = q.get('solution', {})
                    if isinstance(sol, dict): add_stim(sol.get('evidence'))

uniq_strings = list(dict.fromkeys(stim_strings))
print('stimulus strings: total', len(stim_strings), 'unique', len(uniq_strings))

# ---------- 3. 분사 → 스팬맵 (문자열 완전 재구성 보장) ----------
# 문자열을 (한자 런) / (비한자 런)으로 나눔. 한자 런만 jieba로 분사, 각 토큰에 start/len 부여.
def segment_string(s):
    toks = []
    i = 0
    n = len(s)
    while i < n:
        if HAN.match(s[i]):
            j = i
            while j < n and HAN.match(s[j]): j += 1
            run = s[i:j]
            pos = i
            for w in jieba.cut(run, HMM=True):
                toks.append({'t': w, 's': pos, 'clk': True})
                pos += len(w)
            i = j
        else:
            j = i
            while j < n and not HAN.match(s[j]): j += 1
            toks.append({'t': s[i:j], 's': i, 'clk': False})
            i = j
    return toks

seg_map = {}
recon_fail = []
for s in uniq_strings:
    toks = segment_string(s)
    recon = ''.join(t['t'] for t in toks)
    if recon != s:
        recon_fail.append(s)
    seg_map[s] = toks

# ---------- 4. 클릭 토큰 집합 + 빈도 ----------
tok_freq = Counter()
for s in stim_strings:                     # 빈도는 전체 등장 기준
    for t in seg_map[s]:
        if t['clk']: tok_freq[t['t']] += 1

clickable_words = set(tok_freq)
print('unique clickable word tokens:', len(clickable_words))

# ---------- 5. 불용어 (관문 제외; 클릭은 됨) ----------
STOP = set(list("的了着地得和与跟就都也还又很太更最不没别很是有在把被让给对从向往为") +
    ["我","你","他","她","它","我们","你们","他们","她们","的话","一个","这","那","这个","那个",
     "这里","那里","这些","那些","什么","怎么","怎样","为什么","因为","所以","但是","可是","如果",
     "而且","然后","于是","一","二","三","要","会","能","可以","已经","正在","起来","出来","过来",
     "上","下","里","中","边","个","们","呢","吗","吧","啊","呀","哦","嗯","的时候","一直","已","却"])
stoplist = sorted([w for w in clickable_words if w in STOP])
print('stoplist words present:', len(stoplist))

# ---------- 6. 병음 ----------
def auto_py(w):
    try:
        arr = pinyin(w, style=Style.TONE, errors='ignore')
        return ' '.join(a[0] for a in arr) if len(w) > 1 else (arr[0][0] if arr else '')
    except Exception:
        return ''

# ---------- 7. 사전 골격 ----------
zh_dict = {}
for w in sorted(clickable_words):
    # 병음: keyword 정본 우선(최빈), 없으면 pypinyin
    if w in kw_py and kw_py[w]:
        py = kw_py[w].most_common(1)[0][0]
    else:
        py = auto_py(w)
    # 뜻(en): keyword 시드 최빈 (정책 B의 base 대표뜻; 문맥은 overrides가 담당)
    en = ''
    src = 'auto'
    en_cands = Counter()
    for (kw_w, kw_pyv), cnt in kw_en.items():
        if kw_w == w:
            for e, c in cnt.items(): en_cands[e] += c
    if en_cands:
        en = en_cands.most_common(1)[0][0]
        src = 'keyword'
    zh_dict[w] = {
        'py': py,
        'pos': '',
        'en': en,
        'syn': [],
        'ant': [],
        'ex': None,
        'freq': tok_freq[w],
        'len': len(w),
        'src': src,
        'stop': w in STOP,
        'needs_content': (en == '' or True)  # P1: 예문/동의어 미저작 → 전부 콘텐츠 필요
    }

# needs_content 정밀화: P1에선 예문(ex)이 없으면 콘텐츠 필요. 시드 en 있으면 '뜻은 시드됨'.
for w, e in zh_dict.items():
    e['needs_content'] = (e['ex'] is None) or (e['en'] == '')

# ---------- 8. 저장 ----------
os.makedirs(OUT, exist_ok=True)
json.dump(seg_map, open(os.path.join(OUT,'zh_segments.json'),'w',encoding='utf-8'), ensure_ascii=False)
json.dump(zh_dict, open(os.path.join(OUT,'zh_dict.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump({k:v for k,v in overrides.items()}, open(os.path.join(OUT,'zh_overrides.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=0)
json.dump(stoplist, open(os.path.join(OUT,'zh_stoplist.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=0)

# ---------- 9. 검증 ----------
errors = []
# (a) 스팬 재구성 100%
if recon_fail:
    errors.append(('RECON_FAIL', len(recon_fail), recon_fail[:5]))
# (b) 모든 클릭 토큰이 사전에 존재
missing = [t for s in uniq_strings for t in seg_map[s] if t['clk'] and t['t'] not in zh_dict]
if missing:
    errors.append(('TOKEN_NOT_IN_DICT', len(missing), [m['t'] for m in missing[:10]]))
# (c) 모든 사전 항목 py 존재
no_py = [w for w,e in zh_dict.items() if not e['py']]
if no_py:
    errors.append(('NO_PINYIN', len(no_py), no_py[:20]))
# (d) 스팬 start 오름차순 & 인접(공백 없음)
gap = []
for s in uniq_strings:
    pos = 0
    for t in seg_map[s]:
        if t['s'] != pos: gap.append((s, t)); break
        pos += len(t['t'])
    if pos != len(s): gap.append((s,'END'))
if gap:
    errors.append(('SPAN_GAP', len(gap), gap[:3]))

# 통계
seed_en = sum(1 for e in zh_dict.values() if e['src']=='keyword')
needs = sum(1 for e in zh_dict.values() if e['needs_content'])
content_words = sum(1 for e in zh_dict.values() if not e['stop'])

rep = []
rep.append('# P1 커버리지 검증 리포트\n')
rep.append(f'입력: {SRC} · 60세트\n')
rep.append('## 규모')
rep.append(f'- 자극 문자열: 총 {len(stim_strings)} / 유니크 {len(uniq_strings)}')
rep.append(f'- 유니크 클릭 단어(표제어): **{len(clickable_words)}**')
rep.append(f'  - 내용어(관문 대상): {content_words}')
rep.append(f'  - 불용어(관문 제외, 클릭O): {len(stoplist)}')
rep.append(f'- known-good userdict 고정 단어: {len(known_words)}')
rep.append(f'- 문맥 오버라이드(itemId) 시드: {sum(len(v) for v in overrides.values())} (항목 {len(overrides)}개)')
rep.append('')
rep.append('## 사전 시드 상태')
rep.append(f'- 뜻(en) keyword 시드 완료: {seed_en} / {len(zh_dict)}')
rep.append(f'- 콘텐츠(뜻+예문+동의/반의) 저작 필요: **{needs}** (P2 대상)')
rep.append('')
rep.append('## 기계검증')
if not errors:
    rep.append('**PASS — 위반 0건.**')
    rep.append('- 스팬 재구성 100% (모든 문자열이 토큰으로 빠짐없이 복원)')
    rep.append('- 모든 클릭 토큰이 사전에 존재 (미매핑 0)')
    rep.append('- 모든 사전 항목 병음 존재 (무병음 0)')
    rep.append('- 스팬 공백/중복 0 (start 연속)')
else:
    rep.append('**FAIL:**')
    for e in errors: rep.append(f'- {e[0]}: {e[1]}건 예) {e[2]}')
rep.append('')
rep.append('## 산출물')
rep.append('- `zh_segments.json` — 문자열→토큰 스팬맵 (렌더러 입력)')
rep.append('- `zh_dict.json` — 표제어 사전 골격 (P2에서 콘텐츠 채움)')
rep.append('- `zh_overrides.json` — itemId별 문맥 뜻/병음 (정책 B)')
rep.append('- `zh_stoplist.json` — 관문 제외 불용어')
open(os.path.join(OUT,'P1_coverage_report.md'),'w',encoding='utf-8').write('\n'.join(rep))

print('\n=== VERIFY:', 'PASS' if not errors else 'FAIL', '===')
for e in errors: print('  ', e[0], e[1])
print('seed_en', seed_en, 'needs_content', needs, 'content_words', content_words, 'stop', len(stoplist))
