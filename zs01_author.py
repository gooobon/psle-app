# -*- coding: utf-8 -*-
# ZS01 나머지 189어 저작. en/syn/ant = 손저작. 예문: ex_zh 있으면 사용, 없으면 정리된 auto, 없으면 flag.
import json, sys, re
sys.path[:0]=['/tmp/jb/jieba-0.42.1','/tmp/pp']
import jieba
from pypinyin import pinyin, Style
seed_py=json.load(open('/tmp/out/seed_py.json'))
d=json.load(open('/tmp/out/zh_dict.json'))
bb=json.load(open('/tmp/out/zs01_10_backbone.json'))
known=set(d.keys())
for w in known:
    if len(w)>=2: jieba.add_word(w, freq=100000)
MANUAL={'奶奶':'nǎinai','妹妹':'mèimei','我们':'wǒmen','他们':'tāmen','出来':'chūlai','起来':'qǐlai',
 '困难':'kùnnan','身体':'shēntǐ','作业':'zuòyè','东西':'dōngxi','时候':'shíhou','明白':'míngbai',
 '知道':'zhīdao','漂亮':'piàoliang','喜欢':'xǐhuan','爸爸':'bàba','弟弟':'dìdi','朋友':'péngyou',
 '爸爸妈妈':'bàba māma','饭菜':'fàncài','眼泪':'yǎnlèi','散步':'sànbù'}
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
    return ' '.join(x for x in out if x).replace(' 。','。').replace(' ，','，').replace(' ！','！').replace(' ？','？').replace(' ：','：')
def clean_ex(s):
    if not s: return None
    s=s.replace('{u}','').replace('{/u}','')
    s=re.sub(r'^[”“"\'』」、：:，,]+','',s).strip()
    s=re.sub(r'[“”"\']','',s)
    if '___' in s or '（' in s or '(' in s: return None
    if not (6<=len(s)<=22): return None
    return s

# ── 저작: (word, en, syn[], ant[], ex_zh|None) ──
A = [
("望","to look into the distance; to hope",["希望"],[],"他望着远方的大海。"),
("长大","to grow up",["成长"],[],None),
("后","after; behind",["以后"],["前"],"下课后我们一起回家。"),
("当","to be; to serve as",["担任"],[],"他长大想当老师。"),
("一名","one (person); a",[],[],None),
("医生","doctor",["大夫"],[],None),
("练","to practise; to train",["练习"],[],"他每天练毛笔字。"),
("一天","one day",[],[],None),
("登上","to step onto; to ascend",["踏上"],[],"运动员登上了领奖台。"),
("大","big; loud",["巨大"],["小"],"公园里有一棵大树。"),
("舞台","stage",[],[],"她第一次站上舞台。"),
("表演","to perform",["演出"],[],None),
("息","to rest; breath",["休息"],[],"跑完步要休息一下。"),
("习","to practise; habit",["学习"],[],"我们要复习功课。"),
("席","seat; mat",["座位"],[],"他出席了开学典礼。"),
("惜","to cherish; to pity",["爱惜"],[],"我们要爱惜粮食。"),
("爸爸","Dad",["父亲"],["妈妈"],None),
("励","to encourage",["鼓励"],[],"老师的话激励了我。"),
("不要","don't; do not",[],[],"上课不要说话。"),
("轻易","easily; lightly",["容易"],[],"困难面前不要轻易放弃。"),
("古","ancient; old",["古老"],["今"],"这是一座古老的桥。"),
("故","reason; on purpose; old",[],[],"他不是故意的。"),
("鼓","drum; to rouse",["鼓励"],[],"大家给他鼓掌。"),
("固","solid; firm",["坚固"],[],"这座桥很坚固。"),
("小华","Xiao Hua (a name)",[],[],None),
("相","each other; mutual",["互相"],[],"同学之间要互相帮助。"),
("只要","as long as",[],[],None),
("一定","certainly; surely",["肯定"],[],None),
("兴","to rise; to flourish",["高兴"],[],"六一儿童节同学们都很高兴。"),
("写","to write",[],[],None),
("日","day; sun",["太阳"],[],"星期日我在家休息。"),
("睡前","before sleeping",[],[],"睡前要刷牙。"),
("看一看","to take a look",["看看"],[],None),
("记","to remember; to record",["记住"],["忘"],"请记住老师的话。"),
("计","to count; to plan",["计算"],[],"我们计算一下用了多少钱。"),
("既","since; already",[],[],"他既聪明又努力。"),
("纪","discipline; era",["纪律"],[],"我们要遵守纪律。"),
("小文","Xiao Wen (a name)",[],[],None),
("成为","to become",[],[],None),
("画家","painter",[],[],None),
("科学家","scientist",[],[],None),
("练舞","to practise dancing",[],[],"她每天放学后练舞。"),
("弟弟","younger brother",[],["哥哥"],None),
("说出","to speak out; to say",["讲出"],[],None),
("地点","location; place",["地方"],[],"我们约好见面的地点。"),
("伤心","sad; heartbroken",["难过"],["开心"],"丢了小狗，她很伤心。"),
("开心","happy",["快乐"],["伤心"],None),
("终于","finally; at last",[],[],None),
("歌手","singer",[],[],"她的梦想是当歌手。"),
("随便","casually; as one pleases",["随意"],["认真"],"做事不能太随便。"),
("买","to buy",[],["卖"],"妈妈去市场买菜。"),
("新书","new book",[],[],"我借了一本新书。"),
("送给","to give (as a gift) to",["赠送"],[],"我把礼物送给妈妈。"),
("好好","properly; well",[],[],"你要好好休息。"),
("学习","to study; to learn",["学"],[],None),
("一张","one (flat thing)",[],[],"桌上有一张纸。"),
("一条","one (long thin thing)",[],[],"河里有一条鱼。"),
("一块","a piece of",[],[],"他吃了一块蛋糕。"),
("小丽","Xiao Li (a name)",[],[],None),
("下定","to make up (one's mind)",[],[],"他下定决心要努力。"),
("读书","to read; to study",["学习"],[],None),
("将来","future",["未来"],["过去"],"将来我想当医生。"),
("护士","nurse",[],[],"护士照顾生病的人。"),
("心情","mood; feelings",["心境"],[],"今天我的心情很好。"),
("心思","thoughts; mind",[],[],"我猜不透他的心思。"),
("心意","kind thought; intention",["心意"],[],"这份礼物代表我的心意。"),
("大家","everyone",["大伙"],[],None),
("听到","to hear",["听见"],[],"我听到了下课铃声。"),
("轻轻","gently; softly",[],["重重"],"她轻轻地关上门。"),
("大声","loudly",["高声"],["小声"],None),
("慢慢","slowly",[],["快快"],None),
("悄悄","quietly; secretly",["偷偷"],[],None),
("加油","to cheer on; keep it up",[],[],"同学们为他加油。"),
("图书","books",["书籍"],[],"图书馆里有很多图书。"),
("路","road; path",["道路"],[],None),
("难","difficult",["困难"],["容易"],None),
("走","to walk; to go",[],[],None),
("打算","to plan; plan",["计划"],[],None),
("虽然","although",[],[],"虽然下雨，我们还是去了。"),
("你的愿望","your wish",[],[],None),  # 분사 아티팩트: 你+的+愿望
("放学","to finish school",[],["上学"],None),
("画画","to draw; to paint",[],[],"妹妹喜欢画画。"),
("从不","never",[],[],None),
("一次","once; one time",[],[],"我去过一次北京。"),
("画","painting; to draw",[],[],"墙上挂着一幅画。"),
("花朵","flower",["花儿"],[],"花园里开满了花朵。"),
("老师","teacher",[],["学生"],None),
("贴","to paste; to stick",[],["撕"],None),
("班上","in the class",[],[],"班上有四十个同学。"),
("墙壁","wall",["墙"],[],None),
("同学","classmate",[],[],None),
("称赞","to praise",["夸奖","表扬"],["批评"],None),
("听","to listen",[],[],None),
("非常","very; extremely",["十分"],[],None),
("点点头","to nod one's head",["点头"],[],"他点点头表示同意。"),
("更加","even more",["更"],[],None),
("纷纷","one after another",[],[],"同学们纷纷举手发言。"),
("小杰","Xiao Jie (a name)",[],[],None),
("从小","from childhood",[],[],"他从小就爱画画。"),
("足球运动员","football player",[],[],None),
("到","to arrive; to reach",[],[],None),
("学校","school",[],[],None),
("操场","sports field; playground",[],[],None),
("踢球","to play ball; to kick a ball",[],[],None),
("时","time; when",["时候"],[],"上课时要专心。"),
("膝盖","knee",[],[],"他摔倒擦破了膝盖。"),
("心疼","to feel sorry for; to adore",["疼爱"],[],None),
("休息","to rest",[],[],None),
("几天","a few days",[],[],None),
("摇","to shake; to wave",["摇动"],[],"小狗摇着尾巴。"),
("摇头","to shake one's head",[],["点头"],"他摇头表示不同意。"),
("说","to say; to speak",["讲"],[],None),
("不想","don't want to",[],[],None),
("等","to wait",[],[],"请在门口等我。"),
("伤","wound; to hurt",["受伤"],[],"他的手受了伤。"),
("好","good; well",["不错"],["坏"],None),
("旁边","beside; next to",["身边"],[],None),
("微笑","to smile",["笑"],[],"她对我微笑。"),
("好孩子","good child",[],[],None),
("就要","to be about to",[],[],"比赛就要开始了。"),
("几个","a few; several",[],[],None),
("星期","week",[],[],"一个星期有七天。"),
("回到","to return to",[],[],"放学后我回到家里。"),
("看到","to see",["看见"],[],None),
("这么","so; such",[],[],None),
("决定","to decide; decision",["决心"],[],None),
("足球队","football team",[],[],"他加入了学校足球队。"),
("做","to do; to make",["干"],[],None),
("之后","after; afterwards",["以后"],["之前"],None),
("马上","at once; immediately",["立刻"],[],None),
("停止","to stop; to cease",["停"],["继续"],None),
("再也","(not) any more",[],[],"他再也不迟到了。"),
("请","please; to invite",[],[],None),
("帮","to help",["帮助"],[],None),
("这篇","this (article)",[],[],None),
("短文","short passage",["文章"],[],None),
("踢足球","to play football",[],[],None),
("才能","only then can",[],[],None),
("爸爸妈妈","parents; Mum and Dad",["父母"],[],None),
("多","many; much",["许多"],["少"],None),
("关心","to care about",["关怀"],[],None),
("孩子","child",["小孩"],[],None),
("小雯","Xiao Wen (a name)",[],[],None),
("作家","writer; author",[],[],None),
("喜欢","to like",["爱"],["讨厌"],None),
("课余时间","after-class time; spare time",["空余时间"],[],"他利用课余时间看书。"),
("故事","story",[],[],None),
("每次","each time; every time",[],[],None),
("完","to finish; to complete",["完成"],[],"我做完作业了。"),
("读","to read",["念"],[],None),
("好朋友","good friend",[],[],None),
("小芳","Xiao Fang (a name)",[],[],None),
("听完","to finish listening",[],[],"听完故事，大家都笑了。"),
("一些","some; a few",[],[],None),
("意见","opinion; suggestion",["看法"],[],None),
("哪里","where",[],[],"你的书包在哪里？"),
("改进","to improve",["改善"],[],None),
("小小","tiny; little",[],["大大"],None),
("比赛","competition; match",["竞赛"],[],None),
("交上","to hand in",["上交"],[],None),
("去","to go",[],["来"],None),
("结果","result; outcome",[],[],None),
("第一名","first place",[],["最后一名"],None),
("全班","the whole class",[],[],None),
("面前","in front of",["眼前"],[],"老师站在同学面前。"),
("写得","(written) so that",[],[],None),  # 아티팩트: 写+得
("生动","vivid; lively",["活泼"],["呆板"],None),
("有趣","interesting; fun",["好玩"],["无聊"],None),
("找出","to find out; to pick out",["找到"],[],"请找出句子里的错字。"),
("画线","to draw a line; to underline",[],[],"请在词语下面画线。"),
("词语","word; phrase",["词"],[],"这些词语的意思很相近。"),
("意思","meaning",[],[],"这个词是什么意思？"),
("相近","similar; close",["相似"],["相反"],None),
("讲","to speak; to tell",["说"],[],"老师在讲台上讲课。"),
("好玩","fun; enjoyable",["有趣"],["无聊"],None),
("后会","(artifact of 以后会)",[],[],None),  # 아티팩트
("感受","feeling; to feel",["感觉"],[],None),
("得到","to get; to obtain",["获得"],["失去"],None),
]

out={}
noex=[]
for w,en,syn,ant,exzh in A:
    ex=None
    if exzh:
        ex={'zh':exzh,'py':spy(exzh),'en':''}
    else:
        c=clean_ex(bb.get(w,{}).get('ex',{}).get('zh') if bb.get(w,{}).get('ex') else None)
        if c and w in c:
            ex={'zh':c,'py':spy(c),'en':''}
        else:
            noex.append(w)
    out[w]={'py':wpy(w),'pos':'','en':en,'syn':syn,'ant':ant,'ex':ex,
            'src':'authored','stop':False,'needs_content':False}
json.dump(out, open('/tmp/out/zs01_authored189.json','w'), ensure_ascii=False, indent=0)
print('authored', len(out))
print('예문 없음(영문예문 자동 미확보):', len(noex), noex[:40])
