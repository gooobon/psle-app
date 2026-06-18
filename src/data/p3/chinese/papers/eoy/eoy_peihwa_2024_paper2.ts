// =====================================================================================
// 培华长老会小学 (Pei Hwa Presbyterian Primary School) - 2024 P3 高级华文
// Semestral Assessment (年终考试) Paper 2 (45分)
// Source: sgexam.com P3 Chinese EOY compilation, pp.119-129
// Sections covered: 辨字测验 / 词语选择 / 看图选词(KanTu, 连线题) / 词语搭配 /
//                    仿写句子+扩写句子(JuZi) / 组句成段(ZuJu) /
//                    阅读理解一(MCQ) / 阅读理解二(OpenEnded)
// 听力 (Listening) and 看图写话/作文 (Composition) excluded per project rules.
// =====================================================================================

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export type ChineseTopic =
  | 'PinYin'
  | 'BianZi'
  | 'CiYu'
  | 'KanTu'
  | 'PeiDui'
  | 'TianKong'
  | 'ZuJu'
  | 'JuZi'
  | 'YueReadMCQ'
  | 'YueReadOpen';

export type Difficulty = 'foundation' | 'core' | 'stretch';

// Type A: 单一题目 (single standalone question)
export interface SingleQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

// Type B: 组合题目 (set / passage-based question)
export interface SetSubQuestion {
  id: string;
  type: 'MCQ' | 'OpenEnded';
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SetQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  setLabel: string;
  passage: string;
  wordBank?: string[];
  questions: SetSubQuestion[];
}

export type EoyPeiHwaPaper2Question = SingleQuestion | SetQuestion;

// =====================================================================================
// 一、辨字测验 (BianZi) - 5题5分
// =====================================================================================

const bianZiInstruction =
  '从各题所提供的三个选项中，选出适当的一个，然后把代表它的号码（1、2或3）填写在右边的括号里。';

const q1: SingleQuestion = {
  id: 'p3_zh_eoy_ph_001',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '闹______是我的好朋友。',
  options: ['钟', '中', '种'],
  answer: 0,
  pinyin: 'nào zhōng',
  meaning: 'alarm clock (闹钟 = alarm clock)',
  solution: {
    method:
      '「钟、中、种」读音相近（zhōng/zhǒng），字形也相似，要根据"闹___"这个词组来判断。',
    steps: [
      '「钟」（zhōng）+ "闹"= "闹钟"，是用来叫人起床的时钟。',
      '"闹钟是我的好朋友"是一句拟人化的句子，把闹钟比作朋友，意思是闹钟每天提醒自己起床，意思自然。',
      '「中（中间）、种（种类）」放进"闹___"都不能组成有意义的词语。',
    ],
    tip: '"闹钟"是「闹」字最常见的搭配之一，注意「钟」字是「钅」（金）部，跟"金属制成的计时器"有关。',
  },
};

const q2: SingleQuestion = {
  id: 'p3_zh_eoy_ph_002',
  topic: 'BianZi',
  difficulty: 'foundation',
  instruction: bianZiInstruction,
  q: '我非常喜欢吃炒______。',
  options: ['反', '饭', '板'],
  answer: 1,
  pinyin: 'chǎo fàn',
  meaning: 'fried rice (炒饭 = fried rice)',
  solution: {
    method:
      '「反、饭、板」读音相近（fǎn/fàn/bǎn），但只有一个字能跟"炒___"组成常见的食物名称。',
    steps: [
      '「饭」（fàn）+ "炒"= "炒饭"，是常见的食物，"我非常喜欢吃炒饭"意思自然。',
      '「反（相反）、板（木板）」放进"炒___"都不能组成有意义的词语。',
    ],
    tip: '「饭」字是「饣」（食）部，跟"食物"有关；遇到不确定的字，可以先看部首帮助判断意思。',
  },
};

const q3: SingleQuestion = {
  id: 'p3_zh_eoy_ph_003',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '妹妹有一双大大的眼______。',
  options: ['晴', '青', '睛'],
  answer: 2,
  pinyin: 'yǎn jīng',
  meaning: 'eyes (眼睛 = eyes)',
  solution: {
    method:
      '「晴、青、睛」字形非常相似（都含「青」），但意思完全不同，要根据"眼___"这个词组来判断。',
    steps: [
      '「睛」（jīng）+ "眼"= "眼睛"，是身体器官，"妹妹有一双大大的眼睛"意思自然。',
      '「晴（qíng，天气晴）」是「日」部，跟天气有关；「青（qīng，颜色）」本身没有部首修饰，都不能跟"眼"组成有意义的词语。',
    ],
    tip: '区分「晴、睛、青」可以看部首：「日」（太阳）+ 青 = 晴（跟天气有关）；「目」（眼睛）+ 青 = 睛（跟眼睛有关）。',
  },
};

const q4: SingleQuestion = {
  id: 'p3_zh_eoy_ph_004',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '我认为使用环保______是对的。',
  options: ['带', '袋', '代'],
  answer: 1,
  pinyin: 'huán bǎo dài',
  meaning: 'eco-friendly bag; reusable bag (环保袋 = reusable shopping bag)',
  solution: {
    method:
      '「带、袋、代」读音相近（dài），字形也相似，要根据"环保___"这个词组来判断。',
    steps: [
      '「袋」（dài）+ "环保"= "环保袋"，是指可以重复使用、减少塑料污染的购物袋，"使用环保袋是对的"意思自然。',
      '「带（带子/动词"带"）、代（代替）」放进"环保___"都不能组成有意义的词语。',
    ],
    tip: '「袋」字是「衣」部，跟"装东西的布袋/口袋"有关，常见词语有"环保袋、购物袋、口袋"。',
  },
};

const q5: SingleQuestion = {
  id: 'p3_zh_eoy_ph_005',
  topic: 'BianZi',
  difficulty: 'foundation',
  instruction: bianZiInstruction,
  q: '妈妈生病了，她______在床上休息。',
  options: ['躺', '糖', '堂'],
  answer: 0,
  pinyin: 'tǎng',
  meaning: 'to lie down (躺在床上 = to lie on the bed)',
  solution: {
    method:
      '「躺、糖、堂」字形相似，要选出能跟"___在床上休息"组成合理动作的字。',
    steps: [
      '「躺」（tǎng，to lie down）+ "在床上"= "躺在床上"，描写一个人躺着休息的动作，意思自然。',
      '「糖（táng，糖果）、堂（táng，课堂/礼堂）」放进句子里都讲不通。',
    ],
    tip: '「躺」字是「身」部，跟"身体的姿势"有关；「糖、堂」分别是「米」部和「土」部，跟身体动作无关，可以从部首快速排除。',
  },
};

// =====================================================================================
// 二、词语选择 (CiYu) - 4题4分
// =====================================================================================

const ciYuInstruction =
  '从各题所提供的四个选项中，选出适当的一个，然后把代表它的号码（1、2、3或4）填写在右边的括号里。';

const q6: SingleQuestion = {
  id: 'p3_zh_eoy_ph_006',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '哥哥每天做运动，身体很______。',
  options: ['干净', '矮小', '聪明', '强壮'],
  answer: 3,
  pinyin: 'qiáng zhuàng',
  meaning: 'strong; sturdy',
  solution: {
    method:
      '"每天做运动"是原因，"身体很___"是结果，要选出能形容"运动带来的身体状态"的形容词。',
    steps: [
      '「强壮」（qiángzhuàng，strong/sturdy）形容身体健康有力，"每天做运动，身体很强壮"前后因果关系合理。',
      '「干净（clean）、矮小（short and small）、聪明（clever）」都不是"做运动"直接带来的身体变化，可以排除。',
    ],
    tip: '"身体强壮"是描写"经常运动、健康有力"的常见搭配。',
  },
};

const q7: SingleQuestion = {
  id: 'p3_zh_eoy_ph_007',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '新年时，牛车水有很多人，非常______。',
  options: ['好奇', '热闹', '热情', '清新'],
  answer: 1,
  pinyin: 'rè nao',
  meaning: 'bustling; lively',
  solution: {
    method:
      '"有很多人，非常___"要选出能形容"人多、气氛活跃"的词语。',
    steps: [
      '「热闹」（rènao，bustling/lively）形容人多、气氛活跃，"牛车水有很多人，非常热闹"意思自然，是描写过年时人多场面的常用词。',
      '「好奇（curious，形容人的心理）、热情（enthusiastic，形容人的态度）、清新（fresh，多形容空气/风格）」都不能用来形容"人多的场面"。',
    ],
    tip: '"热闹"专门用来形容"因为人多、声音多而显得活跃、有气氛"的场面，是描写节日、市集等场景的常用词。',
  },
};

const q8: SingleQuestion = {
  id: 'p3_zh_eoy_ph_008',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '小明主动向老师认错，老师______了他。',
  options: ['道歉', '整理', '关心', '原谅'],
  answer: 3,
  pinyin: 'yuán liàng',
  meaning: 'to forgive',
  solution: {
    method:
      '"小明主动认错"是原因，"老师___了他"是老师的回应，要选出表示"不再追究、接受对方道歉"的词语。',
    steps: [
      '「原谅」（yuánliàng，to forgive）+ 了他 = "原谅了他"，表示老师接受了小明的认错，不再责怪他，前后因果关系合理。',
      '「道歉（to apologise，应该是小明做的动作而不是老师）、整理（to tidy up）、关心（to care about）」都不能准确表达"老师对认错学生的回应"。',
    ],
    tip: '"主动认错 → 被原谅"是常见的因果关系，"原谅"表示"不再责怪/追究对方的错误"。',
  },
};

const q9: SingleQuestion = {
  id: 'p3_zh_eoy_ph_009',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '我______地对妈妈说："我得了第一名！"',
  options: ['生气', '难过', '兴奋', '着急'],
  answer: 2,
  pinyin: 'xīng fèn',
  meaning: 'excited',
  solution: {
    method:
      '说话内容"我得了第一名！"是一件令人开心的事，要选出能形容"得了第一名后"的心情的词语。',
    steps: [
      '「兴奋」（xīngfèn，excited）+ 地说 = "兴奋地说"，形容因为开心、激动而说话，"我兴奋地对妈妈说：‘我得了第一名！’"意思自然。',
      '「生气（angry）、难过（sad）、着急（anxious）」都是负面或紧张的情绪，跟"得了第一名"这个好消息不符。',
    ],
    tip: '说话内容是好消息时，常搭配"兴奋地、高兴地、开心地"等表示正面情绪的词语。',
  },
};

// =====================================================================================
// 三、看图选词 (KanTu) - 4题4分 (把图画和词语连起来)
// =====================================================================================

const kanTuSet: SetQuestion = {
  id: 'p3_zh_eoy_ph_set1',
  topic: 'KanTu',
  difficulty: 'foundation',
  setLabel: 'Pei Hwa SA Paper 2 - 三、看图选词',
  passage:
    '把图画和词语连起来。\n\nQ10：图中一群人站在一幅画/告示前，认真地看着。\nQ11：图中是一张写着"Dear Mother, You are the best mom in the world. I love you so much..."的字条。\nQ12：图中是一个垃圾桶，里面装满了垃圾，还有苍蝇飞来飞去。\nQ13：图中一个人蹲着，拿着相机对着前方拍。',
  wordBank: ['垃圾', '参观', '便条', '拍照'],
  questions: [
    {
      id: 'p3_zh_eoy_ph_010',
      type: 'MCQ',
      q: 'Q10：图中一群人站在一幅画/告示前，认真地看着，他们在做什么？',
      options: ['垃圾', '参观', '便条', '拍照'],
      answer: 1,
      pinyin: 'cān guān',
      meaning: 'to visit; to tour (e.g. an exhibition or place)',
      solution: {
        method: '图中一群人正站在某个展示物前面看，要选出能形容"一群人去看展示物"这个活动的词语。',
        steps: [
          '「参观」（cānguān，to visit/tour）是指到某个地方去观看、了解，例如参观博物馆、参观展览。',
          '图中一群人站在画/告示前观看，正是"参观"的画面。',
          '"垃圾、便条、拍照"都跟"一群人观看展示物"这个画面无关，可以排除。',
        ],
        tip: '图中如果出现"一群人在看某个展示物/建筑物"，通常对应"参观"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_011',
      type: 'MCQ',
      q: 'Q11：图中是一张写着对妈妈说的话的字条，这是什么？',
      options: ['垃圾', '参观', '便条', '拍照'],
      answer: 2,
      pinyin: 'biàn tiáo',
      meaning: 'note (a short written message)',
      solution: {
        method: '图中是一张写满文字、留给妈妈看的小纸条，要选出能形容这种"简短留言"的名词。',
        steps: [
          '「便条」（biàntiáo，note）是指写给别人看的简短留言，通常用来传达一件简单的事情或心意。',
          '图中的字条写着对妈妈说的话，正是"便条"的例子。',
          '"垃圾、参观、拍照"都不能用来描述"一张写着话的纸条"。',
        ],
        tip: '图中如果出现"一张写满字的小纸条/留言"，通常对应"便条"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_012',
      type: 'MCQ',
      q: 'Q12：图中是一个装满垃圾、还有苍蝇飞来飞去的垃圾桶，这是什么？',
      options: ['垃圾', '参观', '便条', '拍照'],
      answer: 0,
      pinyin: 'lā jī',
      meaning: 'rubbish; litter',
      solution: {
        method: '图中垃圾桶里装满了各种废弃物品，要选出能形容这些"被丢弃的东西"的词语。',
        steps: [
          '「垃圾」（lājī，rubbish）是指人们不要、丢弃的东西。',
          '图中垃圾桶里装满了各种废弃物品，加上苍蝇飞来飞去，正是"垃圾"的画面。',
          '"参观、便条、拍照"都不能用来描述"垃圾桶里的废弃物品"。',
        ],
        tip: '图中如果出现"垃圾桶、废弃物品、苍蝇"，通常对应"垃圾"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_013',
      type: 'MCQ',
      q: 'Q13：图中一个人蹲着，拿相机对着前方拍，他在做什么？',
      options: ['垃圾', '参观', '便条', '拍照'],
      answer: 3,
      pinyin: 'pāi zhào',
      meaning: 'to take a photo',
      solution: {
        method: '图中人物手持相机，对着前方按下快门，要选出能形容这个动作的词语。',
        steps: [
          '「拍照」（pāizhào，to take a photo）是指用相机/手机把眼前的景物记录下来。',
          '图中人物蹲着、拿着相机对准前方，正是"拍照"的动作。',
          '"垃圾、参观、便条"都不能用来描述"用相机拍摄"这个动作。',
        ],
        tip: '图中如果出现"人物手持相机、对着某物按快门"，通常对应"拍照"这个词。',
      },
    },
  ],
};

// =====================================================================================
// 四、词语搭配 (PeiDui) - 5题5分
// =====================================================================================

const peiDuiSet: SetQuestion = {
  id: 'p3_zh_eoy_ph_set2',
  topic: 'PeiDui',
  difficulty: 'core',
  setLabel: 'Pei Hwa SA Paper 2 - 四、词语搭配',
  passage:
    '从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的号码（1-6）填写在括号里。',
  wordBank: ['搬动', '冒出', '小路', '重量', '溜走', '练习'],
  questions: [
    {
      id: 'p3_zh_eoy_ph_014',
      type: 'MCQ',
      q: '（　　）冷汗',
      options: ['搬动', '冒出', '小路', '重量', '溜走', '练习'],
      answer: 1,
      pinyin: 'mào chū',
      meaning: 'to emit; to give off (冒出冷汗 = to break into a cold sweat)',
      solution: {
        method: '"___冷汗"前面需要一个表示"冷汗产生"的动词。',
        steps: [
          '「冒出」（màochū，to emit/give off）+ 冷汗 = "冒出冷汗"，表示人因紧张、害怕而出汗，是常见搭配。',
          '其余词语跟"冷汗"组合都没有合理意义，可以排除。',
        ],
        tip: '"冒出 + 冷汗/烟/水"是常见搭配，表示某种物质从内部渗出或产生。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_015',
      type: 'MCQ',
      q: '（　　）椅子',
      options: ['搬动', '冒出', '小路', '重量', '溜走', '练习'],
      answer: 0,
      pinyin: 'bān dòng',
      meaning: 'to move (something heavy) (搬动椅子 = to move a chair)',
      solution: {
        method: '"___椅子"前面需要一个表示"移动家具"的动词。',
        steps: [
          '「搬动」（bāndòng，to move something heavy）+ 椅子 = "搬动椅子"，表示把椅子从一个地方移到另一个地方，是常见搭配。',
          '"冒出椅子、小路椅子、重量椅子、溜走椅子、练习椅子"都没有意义，可以排除。',
        ],
        tip: '"搬动 + 家具/重物（椅子、桌子、箱子）"是常见搭配，表示移动较重的物品。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_016',
      type: 'MCQ',
      q: '（　　）跑步',
      options: ['搬动', '冒出', '小路', '重量', '溜走', '练习'],
      answer: 5,
      pinyin: 'liàn xí',
      meaning: 'to practise (练习跑步 = to practise running)',
      solution: {
        method: '"___跑步"前面需要一个表示"为了进步而反复进行某动作"的动词。',
        steps: [
          '「练习」（liànxí，to practise）+ 跑步 = "练习跑步"，表示反复进行跑步训练，意思自然。',
          '其余词语跟"跑步"组合都不能组成有意义的词语。',
        ],
        tip: '"练习 + 动作/技能（跑步、写字、唱歌）"是常见搭配，表示反复操作以求进步。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_017',
      type: 'MCQ',
      q: '沿着（　　）',
      options: ['搬动', '冒出', '小路', '重量', '溜走', '练习'],
      answer: 2,
      pinyin: 'xiǎo lù',
      meaning: 'small path; lane (沿着小路 = along the path)',
      solution: {
        method: '"沿着___"后面需要一个表示"可以行走的路线"的名词。',
        steps: [
          '「小路」（xiǎolù，small path）+ "沿着"= "沿着小路"，表示顺着一条小路前进，是常见搭配。',
          '其余词语都不是"路线/地点"类名词，不能跟"沿着"搭配。',
        ],
        tip: '"沿着 + 路线名词（小路、河边、海岸）"是常见搭配，表示顺着某条路线移动。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_018',
      type: 'MCQ',
      q: '称出（　　）',
      options: ['搬动', '冒出', '小路', '重量', '溜走', '练习'],
      answer: 3,
      pinyin: 'zhòng liàng',
      meaning: 'weight (称出重量 = to weigh out the weight)',
      solution: {
        method: '"称出___"后面需要一个表示"用磅秤量出来的结果"的名词。',
        steps: [
          '「重量」（zhòngliàng，weight）+ "称出"= "称出重量"，表示用磅秤量出物品有多重，是常见搭配。',
          '其余词语跟"称出"组合都不能组成有意义的词语。',
        ],
        tip: '"称出 + 重量"是固定搭配，"称"是动作（用磅秤量），"重量"是结果。',
      },
    },
  ],
};

// =====================================================================================
// 五、A组：仿写句子 (JuZi) - 2题4分
// =====================================================================================

const fangXieInstruction = 'A、仿写句子：用括号里的关联词，把两个句子改写成一个句子。';

const q19: SingleQuestion = {
  id: 'p3_zh_eoy_ph_019',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: fangXieInstruction,
  q: '用"一边……一边……"把两个句子改写成一个句子。\n弟弟做作业。\n弟弟看电视。',
  answer: '弟弟一边做作业，一边看电视。',
  pinyin: 'yī biān ... yī biān ...',
  meaning: '"一边...，一边..." = to do two things at the same time',
  solution: {
    method:
      '「一边...，一边...」表示同一个人同时进行两个动作。把两句共同的主语保留一次，再分别在两个动作前加上「一边」。',
    steps: [
      '找出两句的共同主语"弟弟"，合并后只保留一次。',
      '在第一个动作前加上「一边」："弟弟一边做作业"。',
      '在第二个动作前也加上「一边」："一边看电视"。',
      '合并：「弟弟一边做作业，一边看电视。」',
    ],
    tip: '「一边...，一边...」用来描写"同时做两件事"，注意两个动作必须是同一个主语同时进行的，例如"一边吃饭，一边聊天"。',
  },
};

const q20: SingleQuestion = {
  id: 'p3_zh_eoy_ph_020',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: fangXieInstruction,
  q: '用"一……就……"把两个句子改写成一个句子。\n奶奶打开门。\n小猫会跑出去。',
  answer: '奶奶一打开门，小猫就会跑出去。',
  pinyin: 'yī ... jiù ...',
  meaning: '"一...，就..." = as soon as... then...',
  solution: {
    method:
      '「一...，就...」表示"前一个动作刚发生，后一个动作马上就跟着发生"。「一」放在第一个分句的主语之后，「就」放在第二个分句的主语之后。',
    steps: [
      '把「一」放在第一句主语之后："奶奶一打开门"。',
      '把「就」放在第二句主语之后，并保留原句中的"会"："小猫就会跑出去"。',
      '合并：「奶奶一打开门，小猫就会跑出去。」',
    ],
    tip: '「一...，就...」强调两件事之间几乎没有时间差，常用来描写"一件事刚发生，另一件事立刻跟着发生"。',
  },
};

// =====================================================================================
// 五、B组：扩写句子 (JuZi) - 3题6分
// =====================================================================================

const kuoXieInstruction = 'B、扩写句子：把括号里的词语加在句子中适当的地方。';

const q21: SingleQuestion = {
  id: 'p3_zh_eoy_ph_021',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '公园里有很多花，弟弟想要画下来。（漂亮的）',
  answer: '公园里有很多漂亮的花，弟弟想要画下来。',
  pinyin: 'piào liang de',
  meaning: '"漂亮的" = beautiful; pretty',
  solution: {
    method:
      '「漂亮的」是形容词，用来修饰名词，通常放在被修饰的名词之前。',
    steps: [
      '找出句子中要被修饰的名词"花"。',
      '把「漂亮的」放在"花"前面："很多漂亮的花"。',
      '完整句子：「公园里有很多漂亮的花，弟弟想要画下来。」',
    ],
    tip: '形容词扩写句子时，通常把形容词直接放在它要修饰的名词前面，"很多 + 漂亮的 + 名词"是常见的描写句式。',
  },
};

const q22: SingleQuestion = {
  id: 'p3_zh_eoy_ph_022',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '知道自己错了，小华低下了头。（不好意思地）',
  answer: '知道自己错了，小华不好意思地低下了头。',
  pinyin: 'bù hǎo yì si de',
  meaning: '"不好意思地" = embarrassedly; with embarrassment',
  solution: {
    method:
      '「不好意思地」是副词，用来形容动作时的心情/状态，通常放在主语之后、动词之前。',
    steps: [
      '找出主语"小华"和动词"低下了头"。',
      '把「不好意思地」放在主语和动词之间："小华不好意思地低下了头"。',
      '完整句子：「知道自己错了，小华不好意思地低下了头。」',
    ],
    tip: '「不好意思地」常用来形容因为做错事、害羞而表现出的动作，如"不好意思地笑了笑、不好意思地道歉"。',
  },
};

const q23: SingleQuestion = {
  id: 'p3_zh_eoy_ph_023',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '心爱的玩具坏了，妹妹哭了出来。（忍不住）',
  answer: '心爱的玩具坏了，妹妹忍不住哭了出来。',
  pinyin: 'rěn bu zhù',
  meaning: '"忍不住" = cannot help (doing something); unable to resist',
  solution: {
    method:
      '「忍不住」是副词，通常放在主语之后、动词之前，用来强调"控制不住自己、不由自主地"做某事。',
    steps: [
      '找出句子中的主语"妹妹"和动词"哭了出来"。',
      '把「忍不住」插入主语和动词之间："妹妹忍不住哭了出来"。',
      '完整句子：「心爱的玩具坏了，妹妹忍不住哭了出来。」',
    ],
    tip: '「忍不住」一般放在"想要克制却控制不了"的动作前面，例如"忍不住笑了出来、忍不住哭了"。',
  },
};

// =====================================================================================
// 六、组句成段 (ZuJu) - 1题5分
// =====================================================================================

const zuJuSet: SetQuestion = {
  id: 'p3_zh_eoy_ph_set3',
  topic: 'ZuJu',
  difficulty: 'stretch',
  setLabel: 'Pei Hwa SA Paper 2 - 六、组句成段',
  passage:
    '重新排列句子，组成合理的段落。\n\n（　）今天是妈妈的生日，我和爸爸很早起床准备早餐。\n（　）我和爸爸一起对妈妈说："生日快乐！"\n（　）爸爸煮了面线，我把昨天买的面包和牛奶摆在桌上。\n（　）妈妈起床后，看见桌上的生日面线和早餐，脸上乐开了花。\n（　）妈妈听了很开心，说："谢谢你们给我的生日惊喜！"',
  questions: [
    {
      id: 'p3_zh_eoy_ph_024a',
      type: 'OpenEnded',
      q: '今天是妈妈的生日，我和爸爸很早起床准备早餐。',
      answer: 1,
      pinyin: 'shēng rì',
      meaning: 'birthday',
      solution: {
        method:
          '先理清整段故事的发展顺序：今天是妈妈生日，"我"和爸爸早起准备早餐 → 准备食物、摆桌 → 妈妈起床看见早餐 → 一起说生日快乐 → 妈妈开心道谢。',
        steps: [
          '这句话交代了整件事的背景（今天是妈妈的生日）和起因（我和爸爸早起准备早餐），是整段故事的开头。',
          '没有其他句子比这句更适合作为开头，因为其余句子都是后续发生的具体事情。',
          '因此这句话排在第1位。',
        ],
        tip: '排序题中，交代"时间、人物、起因"的句子（背景介绍）通常排在段落的第一位。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_024b',
      type: 'OpenEnded',
      q: '爸爸煮了面线，我把昨天买的面包和牛奶摆在桌上。',
      answer: 2,
      pinyin: 'miàn xiàn',
      meaning: 'thin noodles (面线 = misua/thin wheat noodles)',
      solution: {
        method: '这句话描写"我和爸爸准备早餐"的具体内容，应该紧接在第1句之后。',
        steps: [
          '第1句说"我和爸爸很早起床准备早餐"，这句话正是"准备早餐"的具体做法（煮面线、摆面包和牛奶）。',
          '这句话是后面"妈妈看见桌上的早餐"（第3句）的前提，所以要排在它之前。',
          '因此这句话排在第2位。',
        ],
        tip: '描写"具体行动/过程"的句子，通常紧跟在交代"要做什么事"的句子之后。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_024c',
      type: 'OpenEnded',
      q: '妈妈起床后，看见桌上的生日面线和早餐，脸上乐开了花。',
      answer: 3,
      pinyin: 'lè kāi le huā',
      meaning: '"乐开了花" = beamed with joy; overjoyed',
      solution: {
        method: '这句话描写"早餐准备好之后"，妈妈起床看到的反应。',
        steps: [
          '早餐准备好（第2句）之后，接下来就是妈妈起床、看见早餐并感到开心。',
          '"脸上乐开了花"描写妈妈看到早餐时的开心表情，是后面"我们对妈妈说生日快乐"（第4句）的场景背景。',
          '因此这句话排在第3位。',
        ],
        tip: '"X起床后，看见...，感到..."这类句子常用来描写"准备好的事情被发现/呈现"之后人物的反应。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_024d',
      type: 'OpenEnded',
      q: '我和爸爸一起对妈妈说："生日快乐！"',
      answer: 4,
      pinyin: 'shēng rì kuài lè',
      meaning: '"生日快乐" = Happy Birthday',
      solution: {
        method: '这句话描写"我和爸爸"对妈妈的祝福，应该紧接在妈妈看见早餐之后。',
        steps: [
          '妈妈看见早餐、感到开心（第3句）之后，"我和爸爸"接着向妈妈说出生日祝福。',
          '"我和爸爸一起对妈妈说：‘生日快乐！’"是这次惊喜行动的"高潮"部分，是妈妈下一句感谢的原因。',
          '因此这句话排在第4位。',
        ],
        tip: '描写"人物说的话/祝福"的句子，通常出现在"对方已经注意到/发现了某件事"之后。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_024e',
      type: 'OpenEnded',
      q: '妈妈听了很开心，说："谢谢你们给我的生日惊喜！"',
      answer: 5,
      pinyin: 'jīng xǐ',
      meaning: '"惊喜" = a pleasant surprise',
      solution: {
        method: '这句话描写妈妈听到祝福之后的回应，是整段故事的结尾。',
        steps: [
          '"我和爸爸"说出生日祝福（第4句）之后，妈妈做出回应——感谢他们带来的惊喜。',
          '"谢谢你们给我的生日惊喜！"是对整件事情（准备生日早餐、说生日快乐）的总结性回应，适合作为结尾。',
          '因此这句话排在第5位，是整段的最后一句。',
        ],
        tip: '故事类短文的最后一句通常是人物的感谢、总结或感受，可以用来判断哪句话排在最后。',
      },
    },
  ],
};

// =====================================================================================
// 七、阅读理解一 (YueReadMCQ) - 3题6分
// =====================================================================================

const yueReadMcqSet: SetQuestion = {
  id: 'p3_zh_eoy_ph_set4',
  topic: 'YueReadMCQ',
  difficulty: 'core',
  setLabel: 'Pei Hwa SA Paper 2 - 七、阅读理解一',
  passage:
    '小明和小海是同学，也是邻居。星期六上午，小明到小海家和小海一起做作业。\n\n小明做完作业就回家了。他走进家门，闻到一阵香味。原来妈妈在做他最喜欢吃的炸鸡翅和虾球。小明高兴地说："今天有这么多好吃的食物呀！"\n\n这时，小明想起小海说他的爸爸妈妈出门了，中午赶不回来给他做午餐，他要自己下楼吃。\n\n小明问妈妈："妈妈，小海的爸爸妈妈不在家，我可以请小海来家里吃午餐吗？"妈妈笑着说："当然可以！"小明马上打电话请小海到家里吃饭。\n\n吃完午餐，小明又请小海吃蛋糕。过后，小海向小明和他的妈妈道谢，小明说："别客气！"小明的妈妈也说："欢迎你常来我们家玩。"',
  questions: [
    {
      id: 'p3_zh_eoy_ph_025',
      type: 'MCQ',
      q: '星期六上午，小明做了什么？',
      options: [
        '帮妈妈一起做饭。',
        '去小海家做作业。',
        '教小海做炸鸡翅。',
        '陪妈妈下楼吃饭。',
      ],
      answer: 1,
      pinyin: 'zuò yè',
      meaning: 'homework; schoolwork',
      solution: {
        method: '答案就在文章第一句，直接说明了"星期六上午"小明做的事。',
        steps: [
          '第一段写道："星期六上午，小明到小海家和小海一起做作业。"',
          '这句话直接说明小明星期六上午去了小海家做作业，对应选项(2)。',
          '"帮妈妈做饭、教小海做炸鸡翅、陪妈妈下楼吃饭"都是后来发生的事情或文中没有提到的内容。',
        ],
        tip: '阅读理解的"做了什么"类问题，答案通常就在文章开头的句子里，留意时间词（如"星期六上午"）来定位答案。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_026',
      type: 'MCQ',
      q: '小明走进家门，闻到了什么味道？',
      options: ['花儿的香味。', '书本的香味。', '蛋糕的香味。', '食物的香味。'],
      answer: 3,
      pinyin: 'xiāng wèi',
      meaning: 'fragrance; pleasant smell',
      solution: {
        method: '找出文中描写小明走进家门后闻到的味道是什么。',
        steps: [
          '第二段写道："他走进家门，闻到一阵香味。原来妈妈在做他最喜欢吃的炸鸡翅和虾球。"',
          '这阵香味是妈妈正在烹煮的"炸鸡翅和虾球"散发出来的，属于"食物的香味"，对应选项(4)。',
          '"花儿、书本、蛋糕"的香味在原文中都没有提到（蛋糕是后来小明请小海吃的，不是小明一进门闻到的味道）。',
        ],
        tip: '"闻到了什么味道"类问题的答案，要找出"产生这股味道的具体来源"（这里是妈妈正在烹煮的食物）。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_027',
      type: 'MCQ',
      q: '小明为什么请小海到家里吃饭？',
      options: [
        '小海和小明一样，也喜欢吃炸鸡翅和虾球。',
        '小海的爸爸妈妈出门了，小海要下楼吃午餐。',
        '小明想让小海知道，他妈妈做的虾球很好吃。',
        '小海闻到炸鸡翅和虾球的香味，要去小明家吃。',
      ],
      answer: 1,
      pinyin: 'xià lóu',
      meaning: '"下楼" = to go downstairs',
      solution: {
        method: '找出文中描写小明"想起"小海的情况，那就是他请小海到家里吃饭的原因。',
        steps: [
          '第三段写道："小明想起小海说他的爸爸妈妈出门了，中午赶不回来给他做午餐，他要自己下楼吃。"',
          '正因为小海中午没有人陪他吃饭、要自己下楼吃，小明才会问妈妈能不能请小海来家里吃午餐，对应选项(2)。',
          '"小海喜欢吃炸鸡翅虾球、小明想炫耀妈妈手艺、小海闻到香味主动要来"都不是原文所写的原因。',
        ],
        tip:'"为什么...？"类问题的答案，常常是文中"小明想起..."这类描写人物心理活动的句子，留意这类句子提供的背景信息。',
      },
    },
  ],
};

// =====================================================================================
// 八、阅读理解二 (YueReadOpen) - 3题6分
// =====================================================================================

const yueReadOpenSet: SetQuestion = {
  id: 'p3_zh_eoy_ph_set5',
  topic: 'YueReadOpen',
  difficulty: 'stretch',
  setLabel: 'Pei Hwa SA Paper 2 - 八、阅读理解二',
  passage:
    '小文有一个坏习惯，看到同学有玩具时，会故意抢过来玩。看到同学生气了，小文就会说："还给你。我只是开个玩笑，你有什么好生气的？"\n\n这天放学后，小文走出学校大门，没走几步，就被一个高年级男生拉住了。小文看到这个高大的男生，害怕地问："你有什么事吗？"那个男生指着小文的手表，说："把你的手表给我！"小文听了，吓得全身都在发抖。\n\n这时，一个声音传来，"你们在干什么？"小文转头一看，王老师正向他们走过来。那个男生看到王老师后，就赶快逃走了。\n\n小文把刚才发生的事情告诉王老师，还跟他说了一声谢谢。王老师说："抢别人的东西是不对的，开玩笑也不行。"听了王老师的话，小文想到自己做过的事，脸红了起来，说："王老师，您说得对，我再也不敢这样做了。"',
  questions: [
    {
      id: 'p3_zh_eoy_ph_028',
      type: 'OpenEnded',
      q: '小文的坏习惯是什么？（1分）',
      answer: '小文看到同学有玩具时，会故意抢过来玩。',
      pinyin: 'huài xí guàn',
      meaning: 'bad habit',
      solution: {
        method: '答案在文章第一句，直接说明了小文的坏习惯是什么。',
        steps: [
          '第一段第一句："小文有一个坏习惯，看到同学有玩具时，会故意抢过来玩。"',
          '把这句话改写成答案：小文看到同学有玩具时，会故意抢过来玩。',
        ],
        tip: '回答"是什么"类问题时，可以直接引用或改写原文第一句的关键信息，确保意思完整。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_029',
      type: 'OpenEnded',
      q: '为什么小文怕那个高年级的男生？（2分）',
      answer:
        '因为那个高年级男生长得高大，还拉住小文，指着小文的手表，要小文把手表给他，所以小文很害怕。',
      pinyin: 'hài pà',
      meaning: 'afraid; scared',
      solution: {
        method:
          '这是2分的"为什么...？"题型，需要写出"男生的样子/行为"以及"男生要求小文做的事"两点，才能拿到满分。',
        steps: [
          '第一点（1分）：第二段写道，那个男生"高大"，并"拉住"了小文，让小文感到害怕。',
          '第二点（1分）：那个男生"指着小文的手表，说：‘把你的手表给我！’"，这种威胁的话让小文更害怕。',
          '把两点合并成一句话作答："因为那个高年级男生长得高大，还拉住小文，指着小文的手表要他把手表给他，所以小文很害怕。"',
        ],
        tip: '2分的"为什么...？"题目通常需要包含两个相关的细节（外貌/动作 + 语言/威胁），只写一点可能只拿到1分。',
      },
    },
    {
      id: 'p3_zh_eoy_ph_030',
      type: 'OpenEnded',
      q: '为什么小文的脸红了起来？（1分）小文明白了什么道理？（2分）',
      answer:
        '小文的脸红了起来，是因为他听了王老师的话后，想到自己也曾经做过抢别人东西、开玩笑的坏事，感到不好意思。小文明白了抢别人的东西是不对的，开玩笑也不可以这样做。',
      pinyin: 'dào lǐ',
      meaning: 'lesson; principle; reason',
      solution: {
        method:
          '这道题分为两部分，第一部分（1分）问"原因"，第二部分（2分）问"明白的道理"，两部分都要回答才能拿到满分。',
        steps: [
          '第一部分（1分）：最后一段写道，小文"听了王老师的话，想到自己做过的事，脸红了起来"——因为小文知道自己也犯过同样的错误（抢别人东西、用"开玩笑"当借口），听了老师的话后感到不好意思，所以脸红了。',
          '第二部分（2分）：王老师说："抢别人的东西是不对的，开玩笑也不行。"——这正是小文明白的道理：抢别人的东西是不对的，而且不能用"开玩笑"作为抢东西的理由。',
          '把两部分写成完整的句子作答。',
        ],
        tip: '这类"两小问"的题目（先问原因，再问道理）要分别回答，第一小问通常对应人物的"心理活动/表情变化"，第二小问通常对应文中长辈/老师说的"道理性"的话。',
      },
    },
  ],
};

// =====================================================================================
// Export
// =====================================================================================

const eoyPeiHwaPaper2: EoyPeiHwaPaper2Question[] = [
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  kanTuSet,
  peiDuiSet,
  q19,
  q20,
  q21,
  q22,
  q23,
  zuJuSet,
  yueReadMcqSet,
  yueReadOpenSet,
];

export default eoyPeiHwaPaper2;
