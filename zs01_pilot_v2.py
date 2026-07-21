# -*- coding: utf-8 -*-
import json, sys, re
sys.path[:0]=['/tmp/jb/jieba-0.42.1','/tmp/pp']
import jieba
from pypinyin import pinyin, Style

seed_py=json.load(open('/tmp/out/seed_py.json'))
known=set(json.load(open('/tmp/out/zh_dict.json')).keys())
for w in known:
    if len(w)>=2: jieba.add_word(w, freq=100000)

# 수동 경성/보정 맵 (seed에 없고 pypinyin이 틀리는 흔한 단어)
MANUAL={
 '奶奶':'nǎinai','妹妹':'mèimei','我们':'wǒmen','他们':'tāmen','你们':'nǐmen',
 '这个':'zhège','那个':'nàge','一个':'yí ge','出来':'chūlai','起来':'qǐlai',
 '困难':'kùnnan','身体':'shēntǐ','勤快':'qínkuai','勤劳':'qínláo','怀疑':'huáiyí',
 '失败':'shībài','次要':'cìyào','友谊':'yǒuyì','作业':'zuòyè','队员':'duìyuán',
 '运动会':'yùndònghuì','唱歌':'chànggē','晴天':'qíngtiān','黑暗':'hēi’àn',
 '家务':'jiāwù','一点':'yìdiǎn','一封':'yì fēng','这里':'zhèlǐ','明天':'míngtiān',
 '一道':'yí dào','每一':'měi yī','住在':'zhù zài','站了':'zhàn le','这么':'zhème',
 '一本':'yì běn','跑步':'pǎobù','东西':'dōngxi','足球':'zúqiú','比赛':'bǐsài',
}

def word_py(w):
    if w in seed_py: return seed_py[w]
    if w in MANUAL: return MANUAL[w]
    arr=pinyin(w, style=Style.TONE, errors='default')
    return ''.join(a[0] for a in arr)

def head_py(w):
    if w in seed_py: return seed_py[w]
    if w in MANUAL: return MANUAL[w]
    arr=pinyin(w, style=Style.TONE, errors='default')
    return ''.join(a[0] for a in arr)

PUNC=re.compile(r'[^一-鿿]')
def sent_py(s):
    out=[]
    for w in jieba.cut(s):
        if PUNC.fullmatch(w):
            out.append(w.strip())
        else:
            out.append(word_py(w))
    return ' '.join(x for x in out if x).replace(' 。','。').replace(' ，','，')

# 저작 데이터 (내용 수정 반영)
E = [
("愿","v","willing; to wish",["愿意","情愿"],[],"我愿意帮妈妈做家务。","I am willing to help Mum with housework."),
("原","adj/n","original; former",["本来"],[],"他原来住在这里。","He originally lived here."),
("园","n","garden; park",["公园","花园"],[],"周末我们去公园玩。","On weekends we go to the park."),
("远","adj","far; distant",["遥远"],["近"],"学校离我家很远。","The school is far from my home."),
("信","v/n","to believe; a letter",["相信"],["怀疑"],"我给奶奶写了一封信。","I wrote a letter to Grandma."),
("心","n","heart; mind",["心里"],[],"他心里很开心。","He is very happy in his heart."),
("新","adj","new",["崭新"],["旧"],"我买了一本新书。","I bought a new book."),
("星","n","star",["星星"],[],"晚上天上有很多星星。","At night there are many stars in the sky."),
("愿望","n","a wish; something you hope for",["心愿","梦想"],[],"我的愿望是当医生。","My wish is to become a doctor."),
("梦想","n","dream; aspiration",["理想","愿望"],[],"当画家是她的梦想。","Being a painter is her dream."),
("实现","v","to come true; to achieve",["达成"],[],"只要努力，梦想会实现。","With hard work, dreams will come true."),
("坚持","v","to persist; to keep going",["持续"],["放弃"],"他坚持每天练习跑步。","He persists in practising running every day."),
("勇敢","adj","brave; courageous",["大胆","英勇"],["胆小"],"他勇敢地站了出来。","He bravely stood up."),
("努力","v/adj","to work hard; diligent",["用功"],["懒惰"],"我们要努力学习。","We must study hard."),
("认真","adj","careful; serious (in doing)",["仔细"],["马虎"],"她认真地做每一道题。","She does every question carefully."),
("放弃","v","to give up",["舍弃"],["坚持"],"遇到困难也不要放弃。","Don't give up even when you meet difficulties."),
("继续","v","to continue; to carry on",["接着"],["停止"],"休息后我们继续画画。","After resting we continue drawing."),
("决心","n","determination; resolve",["恒心"],[],"他下定决心要成功。","He is determined to succeed."),
("成功","v/n","to succeed; success",["成就"],["失败"],"努力练习才能成功。","Only by practising hard can you succeed."),
("表扬","v","to praise; to commend",["称赞","夸奖"],["批评"],"老师表扬了这个好孩子。","The teacher praised this good child."),
("鼓励","v","to encourage",["激励"],[],"妈妈鼓励我勇敢一点。","Mum encourages me to be braver."),
("懒惰","adj","lazy",["偷懒"],["勤劳"],"懒惰的人不会成功。","A lazy person will not succeed."),
("马虎","adj","careless; sloppy",["粗心"],["认真"],"做作业不能马虎。","You can't be careless with homework."),
("偷懒","v","to slack off; to be lazy",["懒惰"],["勤快"],"他从不偷懒。","He never slacks off."),
("选拔","v","to select (the best)",["挑选"],[],"学校选拔足球队员。","The school selects football team players."),
("推荐","v","to recommend",["介绍"],[],"老师推荐他参加比赛。","The teacher recommended him to join the contest."),
("请假","v","to ask for leave",["休假"],[],"他生病了，向老师请假。","He was ill and asked the teacher for leave."),
("举办","v","to hold (an event)",["举行"],[],"学校举办了运动会。","The school held a sports meet."),
("容易","adj","easy",["简单"],["困难"],"这道题很容易。","This question is very easy."),
("主要","adj","main; primary",["重要"],["次要"],"这篇短文主要写友谊。","This passage is mainly about friendship."),
("小明","name","Xiao Ming (a boy's name)",[],[],"小明是我的好朋友。","Xiao Ming is my good friend."),
("小美","name","Xiao Mei (a girl's name)",[],[],"小美每天练习画画。","Xiao Mei practises drawing every day."),
("练习","v","to practise",["训练"],[],"她每天练习画画。","She practises drawing every day."),
("参加","v","to take part in; to join",["加入"],[],"我想参加唱歌比赛。","I want to take part in the singing contest."),
("摔倒","v","to fall down",["跌倒"],[],"他跑步时不小心摔倒了。","He accidentally fell while running."),
("受伤","v","to get hurt; to be injured",["负伤"],[],"他摔倒后膝盖受伤了。","After falling, he hurt his knee."),
("害怕","v/adj","to be afraid; frightened",["恐惧"],["勇敢"],"妹妹害怕黑暗。","My little sister is afraid of the dark."),
("担心","v","to worry",["忧虑"],["放心"],"妈妈担心我的身体。","Mum worries about my health."),
("希望","v/n","to hope; hope",["盼望"],["失望"],"我希望明天是晴天。","I hope tomorrow is sunny."),
("相信","v","to believe; to trust",["信任"],["怀疑"],"我相信他能做到。","I believe he can do it."),
]

out={}
for w,pos,en,syn,ant,exzh,exen in E:
    out[w]={"py":head_py(w),"pos":pos,"en":en,"syn":syn,"ant":ant,
            "ex":{"zh":exzh,"py":sent_py(exzh),"en":exen},
            "src":"pilot","stop":False,"needs_content":False}
json.dump(out, open('/tmp/out/zs01_pilot_dict.json','w'), ensure_ascii=False, indent=1)

# verify
TONE=re.compile(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]');DIG=re.compile(r'[0-9]');HAN=re.compile(r'[一-鿿]')
errs=[]
for w,e in out.items():
    if not TONE.search(e['py']) or DIG.search(e['py']): errs.append((w,'head py',e['py']))
    ex=e['ex']
    if w not in ex['zh']: errs.append((w,'no headword in ex'))
    if not TONE.search(ex['py']) or DIG.search(ex['py']): errs.append((w,'ex py',ex['py']))
    if len(e['syn'])>2 or len(e['ant'])>2: errs.append((w,'>2'))
print('VERIFY', 'PASS' if not errs else 'FAIL', len(errs))
for x in errs[:20]: print(' ',x)
