// =====================================================================================
// 道南学校 (Tao Nan School) - 2023 P3 高级华文 年终考试 (EOY) 试卷二 (45分)
// Source: sgexam.com P3 Chinese EOY compilation, pp.57-69
// Sections covered: 辨字测验 / 汉语拼音 / 词语选择 / 词语搭配 / 改写句子+扩写句子 /
//                    短文填空 / 阅读理解 (MCQ) / 理解问答 (OpenEnded)
// 听力 (Listening) and 看图写话/作文 (Composition) sections excluded per project rules.
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

export type EoyTaoNanPaper2Question = SingleQuestion | SetQuestion;

// =====================================================================================
// 一、辨字测验 (BianZi) - 5题5分
// =====================================================================================

const bianZiInstruction =
  '从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字（1、2、3、4）填写在右边的括号里。';

const q1: SingleQuestion = {
  id: 'p3_zh_eoy_tn_001',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '妈妈带小乐去组屋楼下溜滑______。',
  options: ['转', '轮', '轻', '较'],
  answer: 1,
  pinyin: 'lún',
  meaning: 'wheel / roller (as in "溜滑轮" = roller-skating)',
  solution: {
    method:
      '这四个字都有「车」部首，字形十分相似，要根据词语的意思来分辨，不能只看部首。',
    steps: [
      '先读懂句子：妈妈带小乐去组屋楼下做什么活动？',
      '「溜滑轮」是指穿上有轮子的鞋子滑行，也就是"roller-skating"。',
      '「转」是turn、「轻」是light（不重）、「较」是compare，放进句子里都不通顺。',
      '只有「轮」（lún，wheel）能跟"溜滑"组成「溜滑轮」，意思正确。',
    ],
    tip: '遇到「车」字部的形近字（转/轮/轻/较/软）时，先想想这个字单独的意思，再看看放进句子后是否合理。',
  },
};

const q2: SingleQuestion = {
  id: 'p3_zh_eoy_tn_002',
  topic: 'BianZi',
  difficulty: 'foundation',
  instruction: bianZiInstruction,
  q: '在爸爸的帮助下，妹妹学会了折______船。',
  options: ['只', '纸', '知', '指'],
  answer: 1,
  pinyin: 'zhǐ',
  meaning: 'paper (纸船 = paper boat)',
  solution: {
    method:
      '「只、纸、知、指」读音相近（zhǐ / zhī），但意思完全不同，要根据「折___船」这个动作来判断。',
    steps: [
      '「折」是fold（折叠）的意思，折船需要用什么材料？',
      '「纸」（zhǐ）是paper，"折纸船"= fold a paper boat，是常见的手工活动。',
      '「只」是数量词（一只）、「知」是to know、「指」是finger或to point，都不能跟"船"组成"折___船"。',
    ],
    tip: '「纸」字有「纟」部首，跟"线、布料"等material有关；「知、指」有「矢/扌」部首，跟材料无关。看部首可以帮助快速排除错误选项。',
  },
};

const q3: SingleQuestion = {
  id: 'p3_zh_eoy_tn_003',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '文安告诉老师有几个同学______负小丽。',
  options: ['欺', '期', '旗', '棋'],
  answer: 0,
  pinyin: 'qī',
  meaning: 'to bully (欺负 = to bully)',
  solution: {
    method:
      '「欺、期、旗、棋」都读qí/qī，字形也很相似，要根据"___负小丽"这个词组来判断哪个字能组成正确的词语。',
    steps: [
      '"___负"是指对别人做不好的事，让对方感到难过。',
      '「欺负」（qīfù）的意思是to bully（欺凌弱小），刚好符合句子的意思。',
      '「期、旗、棋」分别是period/期待、flag（旗子）、chess（棋子），都不能跟"负"组成有意义的词语。',
    ],
    tip: '「欺」字左边是「欠」部，跟"不足、亏待别人"有关，所以"欺负"表示让别人受亏待。',
  },
};

const q4: SingleQuestion = {
  id: 'p3_zh_eoy_tn_004',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '上楼梯时，小亮被别人______倒了。',
  options: ['追', '拿', '跌', '推'],
  answer: 3,
  pinyin: 'tuī',
  meaning: 'to push (被别人推倒了 = was pushed down by someone)',
  solution: {
    method:
      '要找出能跟"倒了"组成合理动作的词语：是谁让小亮"倒"（跌倒）的？',
    steps: [
      '句子说"被别人___倒了"，表示有人对小亮做了某个动作，使他倒下。',
      '「推」（tuī，to push）+ 倒 = "推倒"，表示被别人用力一推而跌倒，意思最贴切。',
      '「追」是chase（追赶）、「拿」是take（拿东西）、「跌」本身已经是"跌倒"的意思，跟"倒了"重复，都不适合。',
    ],
    tip: '「被」字句表示被动，后面通常接一个对别人造成影响的动作，如"推、打、骂"等。',
  },
};

const q5: SingleQuestion = {
  id: 'p3_zh_eoy_tn_005',
  topic: 'BianZi',
  difficulty: 'foundation',
  instruction: bianZiInstruction,
  q: '姐姐做的面包又香又______，真好吃！',
  options: ['软', '粗', '鲜', '胖'],
  answer: 0,
  pinyin: 'ruǎn',
  meaning: 'soft (又香又软 = fragrant and soft)',
  solution: {
    method:
      '"又A又B"用来形容食物的两种特点，要选出能形容面包口感的词语。',
    steps: [
      '「香」已经形容了面包的气味（好闻），第二个词应该形容面包的口感或质地。',
      '「软」（ruǎn，soft）形容面包松软好吃的口感，"又香又软"非常合理。',
      '「粗」是coarse（粗糙）、「鲜」通常形容食物新鲜（鲜美）但搭配"又香又鲜"不常用、「胖」是fat（用来形容人或动物），都不适合形容面包的口感。',
    ],
    tip: '形容食物好吃，常用"又香又软、又香又脆、又甜又香"等"又...又..."的固定搭配，平时可以多读多记。',
  },
};

// =====================================================================================
// 二、汉语拼音 (PinYin) - 2题2分
// =====================================================================================

const pinYinInstruction =
  '根据句子中划线的词语，选出正确的音节，然后把代表它的数字（1、2、3、4）填写在右边的括号里。';

const q6: SingleQuestion = {
  id: 'p3_zh_eoy_tn_006',
  topic: 'PinYin',
  difficulty: 'core',
  instruction: pinYinInstruction,
  q: '小文向老师认错，希望老师会原谅她。（划线词语：原谅）',
  options: ['yán niàng', 'yán liàng', 'yuán niàng', 'yuán liàng'],
  answer: 3,
  pinyin: 'yuán liàng',
  meaning: 'to forgive',
  solution: {
    method:
      '「原谅」的「原」声母是y，韵母是uan，第二声；「谅」声母是l，韵母是iang，第四声。要逐字检查声母、韵母和声调。',
    steps: [
      '「原」不是"yán"（言/严的读音），而是"yuán"，注意有"u"这个介音。',
      '「谅」不是"niàng"（酿的读音，n声母），而是"liàng"，是l声母。',
      '两个字合起来正确读音是"yuán liàng"，符合选项(4)。',
    ],
    tip: '「原」和「言/严」字形不同但有些同学会读错声调或声母，平时可结合"原谅、原因、草原"等词语多读几次巩固读音。',
  },
};

const q7: SingleQuestion = {
  id: 'p3_zh_eoy_tn_007',
  topic: 'PinYin',
  difficulty: 'core',
  instruction: pinYinInstruction,
  q: '康康喝了太多冰水，结果肚子痛。（划线词语：结果）',
  options: ['jiē guǒ', 'jié guǒ', 'jiē gǒu', 'jié gǒu'],
  answer: 1,
  pinyin: 'jié guǒ',
  meaning: 'as a result; consequently',
  solution: {
    method:
      '「结果」的「结」在这里读第二声jié（不是第一声jiē），「果」读第三声guǒ（不是gǒu）。要注意多音字「结」的读音和声调差异。',
    steps: [
      '「结」是多音字：在"结果、结束"中读jié（第二声）；在"结实（牢固）"中才读jiē。这里表示"as a result"，所以读jié。',
      '「果」是guǒ（第三声，如水果的"果"），不是"gǒu"（小狗的"狗"音）。',
      '所以正确读音是"jié guǒ"，对应选项(2)。',
    ],
    tip: '「结」是常见的多音字，记住"结果"读jié guǒ，"结实"读jiē shi，可以避免混淆。',
  },
};

// =====================================================================================
// 三、词语选择 (CiYu) - 4题4分
// =====================================================================================

const ciYuInstruction =
  '从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字（1、2、3、4）填写在右边的括号里。';

const q8: SingleQuestion = {
  id: 'p3_zh_eoy_tn_008',
  topic: 'CiYu',
  difficulty: 'foundation',
  instruction: ciYuInstruction,
  q: '爷爷讲的故事很______，我们都爱听。',
  options: ['有趣', '漂亮', '容易', '聪明'],
  answer: 0,
  pinyin: 'yǒu qù',
  meaning: 'interesting; fun',
  solution: {
    method:
      '要找出能形容"故事"，并且能解释为什么"我们都爱听"的词语。',
    steps: [
      '"我们都爱听"是结果，前面的词语应该是"爱听"的原因。',
      '「有趣」（yǒuqù，interesting）形容故事生动好玩，让人喜欢听，因果关系最合理。',
      '「漂亮」通常形容外表、「容易」形容难度、「聪明」形容人的智力，都不能很好地形容"故事"内容本身。',
    ],
    tip: '形容故事、电影、书本等内容好看好玩，常用「有趣、精彩、好看」等词语。',
  },
};

const q9: SingleQuestion = {
  id: 'p3_zh_eoy_tn_009',
  topic: 'CiYu',
  difficulty: 'stretch',
  instruction: ciYuInstruction,
  q: '外面下着大雨，妹妹______想要出去玩。',
  options: ['假如', '只要', '仍然', '或者'],
  answer: 2,
  pinyin: 'réng rán',
  meaning: 'still; nevertheless',
  solution: {
    method:
      '前半句"外面下着大雨"是一个不利的条件，后半句"妹妹___想要出去玩"表示妹妹的想法没有因此改变，要选表示"despite this"的连接词。',
    steps: [
      '「仍然」（réngrán，still / nevertheless）表示尽管情况不好，但想法或行为没有改变，跟"虽然下大雨，但妹妹还是想出去玩"的意思一致。',
      '「假如」是if（表示假设）、「只要」是as long as（表示条件）、「或者」是or（表示选择），放在句子里都讲不通。',
      '因此正确答案是"仍然"。',
    ],
    tip: '「仍然」常用来表示"前面提到的不利情况，并没有改变后面的事实/想法"，常与"虽然...但仍然..."搭配。',
  },
};

const q10: SingleQuestion = {
  id: 'p3_zh_eoy_tn_010',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '今天是奶奶的生日，爸爸为她______了生日蛋糕。',
  options: ['实现', '决定', '争取', '准备'],
  answer: 3,
  pinyin: 'zhǔn bèi',
  meaning: 'to prepare',
  solution: {
    method:
      '要找出能跟"生日蛋糕"搭配的动词：爸爸对蛋糕做了什么动作？',
    steps: [
      '「准备」（zhǔnbèi，to prepare）+ 生日蛋糕 = "准备了生日蛋糕"，表示事先做好/买好蛋糕，意思自然。',
      '「实现」通常跟"梦想、愿望"搭配（实现梦想）、「决定」跟"事情、计划"搭配（做决定）、「争取」表示努力获得（争取机会），都不能直接搭配"蛋糕"。',
      '所以正确答案是"准备"。',
    ],
    tip: '"准备 + 食物/礼物/东西"是常见搭配，例如"准备晚餐、准备礼物"。',
  },
};

const q11: SingleQuestion = {
  id: 'p3_zh_eoy_tn_011',
  topic: 'CiYu',
  difficulty: 'stretch',
  instruction: ciYuInstruction,
  q: '妈妈要弟弟把饭吃完，不可以______食物。',
  options: ['代替', '浪费', '利用', '破坏'],
  answer: 1,
  pinyin: 'làng fèi',
  meaning: 'to waste',
  solution: {
    method:
      '句子前半部分"把饭吃完"提示我们，妈妈不希望弟弟把食物丢掉不吃，要找出表示"白白浪费、不珍惜"的词语。',
    steps: [
      '「浪费」（làngfèi，to waste）表示没有好好利用、白白丢掉，"不可以浪费食物"= 不可以把食物丢掉不吃，跟"把饭吃完"前后呼应。',
      '「代替」是replace（取代）、「利用」是make use of（通常是正面用法，跟句意相反）、「破坏」是to destroy（损坏），都不符合"把饭吃完"想表达的"珍惜食物"的意思。',
    ],
    tip: '"浪费食物/浪费时间/浪费金钱"都是常见搭配，意思是没有好好善用、白白losing掉。',
  },
};

// =====================================================================================
// 四、词语搭配 (PeiDui) - 5题5分
// =====================================================================================

const peiDuiSet: SetQuestion = {
  id: 'p3_zh_eoy_tn_set1',
  topic: 'PeiDui',
  difficulty: 'core',
  setLabel: 'Tao Nan EOY Paper 2 - 四、词语搭配',
  passage:
    '从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。',
  wordBank: ['卡片', '发出', '照顾', '保卫', '发抖', '参加'],
  questions: [
    {
      id: 'p3_zh_eoy_tn_012',
      type: 'MCQ',
      q: '设计（　　）',
      options: ['卡片', '发出', '照顾', '保卫', '发抖', '参加'],
      answer: 0,
      pinyin: 'kǎ piàn',
      meaning: 'card (设计卡片 = to design a card)',
      solution: {
        method: '"设计"后面应该接一个可以被"设计"的物品名词。',
        steps: [
          '「卡片」（kǎpiàn，card）是名词，可以被"设计"，例如"设计生日卡片"。',
          '其他词语如"发出、照顾、保卫、发抖、参加"都是动词，动词后面不能直接再接动词。',
        ],
        tip: '"设计 + 名词（卡片/海报/标志）"是常见搭配，"设计"的对象通常是可以画出来或做出来的东西。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_013',
      type: 'MCQ',
      q: '全身（　　）',
      options: ['卡片', '发出', '照顾', '保卫', '发抖', '参加'],
      answer: 4,
      pinyin: 'fā dǒu',
      meaning: 'to tremble; to shiver (全身发抖 = trembling all over)',
      solution: {
        method: '"全身"是身体各部位，后面应接一个形容身体状态/反应的词语。',
        steps: [
          '「发抖」（fādǒu，to tremble/shiver）形容身体因为冷、害怕或生病而颤动，"全身发抖"表示整个身体都在颤抖，非常合理。',
          '"全身卡片、全身保卫、全身参加"等都没有意义，可以排除。',
        ],
        tip: '"全身 + 发抖/发热/无力"常用来描写人因为冷、紧张或生病时的身体反应。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_014',
      type: 'MCQ',
      q: '（　　）宠物',
      options: ['卡片', '发出', '照顾', '保卫', '发抖', '参加'],
      answer: 2,
      pinyin: 'zhào gù',
      meaning: 'to take care of (照顾宠物 = to take care of a pet)',
      solution: {
        method: '"___宠物"前面需要一个表示对待动物的动词。',
        steps: [
          '「照顾」（zhàogù，to take care of）+ 宠物 = "照顾宠物"，表示喂食、清理等日常照料，意思自然。',
          '"发出宠物、保卫宠物、参加宠物"都不是常见或合理的搭配。',
        ],
        tip: '"照顾 + 人/动物（弟弟、病人、宠物）"是常见搭配，表示日常的关心与看管。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_015',
      type: 'MCQ',
      q: '（　　）响声',
      options: ['卡片', '发出', '照顾', '保卫', '发抖', '参加'],
      answer: 1,
      pinyin: 'fā chū',
      meaning: 'to give out; to emit (发出响声 = to make a sound)',
      solution: {
        method: '"___响声"前面需要一个表示"产生声音"的动词。',
        steps: [
          '「发出」（fāchū，to give out/emit）+ 响声 = "发出响声"，表示某个东西产生了声音，是固定搭配。',
          '"照顾响声、保卫响声、参加响声"在意思上都不通顺，可以排除。',
        ],
        tip: '"发出 + 声音/响声/光/味道"是常见搭配，表示某物产生了某种现象。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_016',
      type: 'MCQ',
      q: '（　　）比赛',
      options: ['卡片', '发出', '照顾', '保卫', '发抖', '参加'],
      answer: 5,
      pinyin: 'cān jiā',
      meaning: 'to take part in (参加比赛 = to take part in a competition)',
      solution: {
        method: '"___比赛"前面需要一个表示"加入活动"的动词。',
        steps: [
          '「参加」（cānjiā，to take part in）+ 比赛 = "参加比赛"，是非常常见的固定搭配。',
          '其余词语跟"比赛"组合都没有合理意义，可以排除。',
        ],
        tip: '"参加 + 活动名词（比赛、活动、典礼、聚会）"是日常生活中很常用的搭配，一定要熟记。',
      },
    },
  ],
};

// =====================================================================================
// 五、改写句子 + 扩写句子 (JuZi) - 4题8分
// A组：用括号里的词语，把两个句子改写成一个句子。
// B组：用括号里的词语，扩写句子。
// =====================================================================================

const q17: SingleQuestion = {
  id: 'p3_zh_eoy_tn_017',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'A组：请用括号里的词语，把两个句子改写成一个句子。',
  q: '小伟喜欢打篮球。\n小伟不喜欢踢足球。（……却……）',
  answer: '小伟喜欢打篮球，却不喜欢踢足球。',
  pinyin: 'què',
  meaning: '"却" = but / yet (turning-point connector)',
  solution: {
    method:
      '「却」用来连接两个意思相反或有转折的句子，表示"前面是A，但后面却是相反的B"。改写时要去掉重复的主语（小伟）。',
    steps: [
      '找出两句的共同主语：两句都是"小伟"，合并后只需保留一次。',
      '前一句保留原意："小伟喜欢打篮球"。',
      '后一句去掉主语，用「却」连接："却不喜欢踢足球"。',
      '合并：「小伟喜欢打篮球，却不喜欢踢足球。」',
    ],
    tip: '「却」前后的内容通常是相反或对比的（喜欢 vs 不喜欢），写完后读一读，确认句子表达了"转折"的语气。',
  },
};

const q18: SingleQuestion = {
  id: 'p3_zh_eoy_tn_018',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'A组：请用括号里的词语，把两个句子改写成一个句子。',
  q: '爸爸在国外工作。\n爸爸每天都会打电话给我。（虽然……但是）',
  answer: '虽然爸爸在国外工作，但是每天都会打电话给我。',
  pinyin: 'suī rán ... dàn shì',
  meaning: '"虽然...但是..." = although... but...',
  solution: {
    method:
      '「虽然...但是...」是一组固定的关联词，"虽然"放在第一个分句前，"但是"放在第二个分句前，表示前后情况形成对比但并不矛盾。',
    steps: [
      '把「虽然」放在第一句开头："虽然爸爸在国外工作"。',
      '把「但是」放在第二句开头，并去掉重复的主语"爸爸"："但是每天都会打电话给我"。',
      '合并：「虽然爸爸在国外工作，但是每天都会打电话给我。」',
    ],
    tip: '「虽然」和「但是」必须成对出现，分别放在两个分句的开头，不能只用其中一个。',
  },
};

const q19: SingleQuestion = {
  id: 'p3_zh_eoy_tn_019',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'B组：请用括号里的词语，扩写句子。',
  q: '看到桌上的鸡饭，我的口水流了出来。（忍不住）',
  answer: '看到桌上的鸡饭，我的口水忍不住流了出来。',
  pinyin: 'rěn bu zhù',
  meaning: '"忍不住" = cannot help (doing something); unable to resist',
  solution: {
    method:
      '「忍不住」是副词，通常放在主语之后、动词之前，用来强调"控制不住自己、不由自主地"做某事。',
    steps: [
      '找出句子中的主语和动词：主语是"我的口水"，动词是"流了出来"。',
      '把「忍不住」插入主语和动词之间："我的口水忍不住流了出来"。',
      '完整句子：「看到桌上的鸡饭，我的口水忍不住流了出来。」',
    ],
    tip: '「忍不住」一般放在"想要克制却控制不了"的动作前面，例如"忍不住笑了出来、忍不住哭了"。',
  },
};

const q20: SingleQuestion = {
  id: 'p3_zh_eoy_tn_020',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'B组：请用括号里的词语，扩写句子。',
  q: '小月往杯子里倒果汁，直到杯子满了。（不停地）',
  answer: '小月不停地往杯子里倒果汁，直到杯子满了。',
  pinyin: 'bù tíng de',
  meaning: '"不停地" = continuously; without stopping',
  solution: {
    method:
      '「不停地」是副词，用来形容一个动作持续不断地进行，通常放在主语之后、动词词组之前。',
    steps: [
      '找出主语"小月"和要修饰的动作"往杯子里倒果汁"。',
      '把「不停地」放在主语和动作之间："小月不停地往杯子里倒果汁"。',
      '保留后半句不变："直到杯子满了"。',
      '完整句子：「小月不停地往杯子里倒果汁，直到杯子满了。」',
    ],
    tip: '「不停地 + 动词」表示动作一直持续、没有中断，常用来描写重复或连续的动作，如"不停地说话、不停地下雨"。',
  },
};

// =====================================================================================
// 六、短文填空 (TianKong) - 4题4分
// =====================================================================================

const tianKongSet: SetQuestion = {
  id: 'p3_zh_eoy_tn_set2',
  topic: 'TianKong',
  difficulty: 'core',
  setLabel: 'Tao Nan EOY Paper 2 - 六、短文填空',
  passage:
    '一天下午，小安在房间休息时，听到妹妹在客厅喊道："哥哥，你喜欢的电视节目快___(Q21)___啦！"小安听了，马上从床上跳了下来。\n\n这时，门铃响了。小安打开门一看，___(Q22)___是邻居小文。小文着急地说："小安，你有空吗？我有几道数学题不会做，你能教教我吗？"小安听了，便带着小文到房间教他做功课。\n\n一个小时后，小文做完功课就回家了。妹妹___(Q23)___地问："哥哥，为什么你要教小文做功课，不看你最喜欢的节目呢？"小安微笑着说："因为___(Q24)___别人比看节目更快乐啊！"',
  wordBank: ['原来', '帮助', '奇怪', '认为', '好奇', '开始'],
  questions: [
    {
      id: 'p3_zh_eoy_tn_021',
      type: 'MCQ',
      q: '你喜欢的电视节目快___(Q21)___啦！',
      options: ['原来', '帮助', '奇怪', '认为', '好奇', '开始'],
      answer: 5,
      pinyin: 'kāi shǐ',
      meaning: 'to start; to begin',
      solution: {
        method: '妹妹在喊小安，提示一件即将发生的事情——电视节目快要"怎样"了？',
        steps: [
          '"快___啦"表示某件事情即将发生，符合这个语境的词语是表示"即将进行"的动词。',
          '「开始」（kāishǐ，to start）+ 啦 = "快开始啦"，表示节目马上要开始播放，意思最贴切。',
          '"原来、帮助、奇怪、认为、好奇"放进句子里都讲不通。',
        ],
        tip: '"快___啦"后面常接表示动作即将发生的词语，如"开始、到了、结束"等。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_022',
      type: 'MCQ',
      q: '小安打开门一看，___(Q22)___是邻居小文。',
      options: ['原来', '帮助', '奇怪', '认为', '好奇', '开始'],
      answer: 0,
      pinyin: 'yuán lái',
      meaning:
        '"原来" = it turns out (to be); as it turns out',
      solution: {
        method: '小安打开门之前并不知道是谁，打开后才发现是谁——要选表示"发现真相"的词语。',
        steps: [
          '「原来」（yuánlái，it turns out that）常用在"打开/看了之后才知道真实情况"的句子中。',
          '"打开门一看，原来是邻居小文"表示小安一开始不知道门外是谁，看了之后才知道是小文，意思非常自然。',
          '其余词语放入句子都不能表达"恍然发现"的意思。',
        ],
        tip: '"一看，原来是..."是固定的表达方式，用来描写"发现真相、解开疑惑"的瞬间。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_023',
      type: 'MCQ',
      q: '妹妹___(Q23)___地问："哥哥，为什么你要教小文做功课……"',
      options: ['原来', '帮助', '奇怪', '认为', '好奇', '开始'],
      answer: 4,
      pinyin: 'hào qí',
      meaning: 'curious',
      solution: {
        method: '妹妹想知道哥哥为什么不看自己喜欢的节目，而去教小文做功课——要选一个能形容"想知道原因"的态度的词语。',
        steps: [
          '「好奇」（hàoqí，curious）+ 地问 = "好奇地问"，表示妹妹很想知道哥哥为什么这样做，态度自然。',
          '「奇怪」一般用来形容事情本身不寻常（这件事很奇怪），而不是用来形容"问"的态度，所以"奇怪地问"不如"好奇地问"贴切。',
          '"原来、帮助、认为、开始"放进句子都不合适。',
        ],
        tip: '"好奇地问/好奇地看"形容一个人因为想知道更多而提出问题或观察，是常见的描写人物态度的词语。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_024',
      type: 'MCQ',
      q: '小安微笑着说："因为___(Q24)___别人比看节目更快乐啊！"',
      options: ['原来', '帮助', '奇怪', '认为', '好奇', '开始'],
      answer: 1,
      pinyin: 'bāng zhù',
      meaning: 'to help',
      solution: {
        method: '小安放弃看自己喜欢的节目，去教小文做功课，他认为这样做让自己更开心，要选出小安"做了什么"。',
        steps: [
          '「帮助」（bāngzhù，to help）+ 别人 = "帮助别人"，正好对应小安"教小文做功课"这个行为。',
          '"因为帮助别人比看节目更快乐啊"表示小安觉得帮助别人比看电视更让他开心，符合整篇短文的主题。',
          '"原来、奇怪、认为、好奇、开始"放进句子里都不能正确表达这个意思。',
        ],
        tip: '这篇短文的主题是"帮助别人会带来快乐"，做填空题时可以联系全文主旨来判断答案。',
      },
    },
  ],
};

// =====================================================================================
// 七、阅读理解 (YueReadMCQ) - 4题8分
// =====================================================================================

const yueReadMcqSet: SetQuestion = {
  id: 'p3_zh_eoy_tn_set3',
  topic: 'YueReadMCQ',
  difficulty: 'core',
  setLabel: 'Tao Nan EOY Paper 2 - 七、阅读理解',
  passage:
    '上华文课时，王老师对同学们说："昨天，我们学完了《地球妈妈》这篇课文，现在我们来进行小组活动。我会把大家分成两人一组，让你们讨论应该怎样保护环境，然后我会请几组同学出来说一说，看看哪一组说得最好。"\n\n文文听了，兴奋地对坐在旁边的小明说："小明，你的华文那么好，我们一定能拿第一名！"谁知道，王老师把他和坐在他前面的小美分到了一组。小美高兴地转过身，小声地问文文："文文，我们要说什么好呢？"文文看了小美一眼，没有理她。小美伤心地低下了头，不知道该怎么办才好。\n\n小明看到了，生气地对文文说："文文，小美在问你呢，你怎么不理她？"文文回答："小美说话声音很小，同学们一定听不清，我们这组拿不到第一名了。"小明说："小美只是对自己没信心，所以不敢大声说话。你陪她多练习几次，她一定可以说得更好！"听了小明的话，文文的脸红了起来，他明白了不应该看不起别人。文文不好意思地向小美道歉，然后和她一起开心地讨论了起来。',
  questions: [
    {
      id: 'p3_zh_eoy_tn_025',
      type: 'MCQ',
      q: '上课时，王老师要大家做什么？',
      options: [
        '一起学课文。',
        '练习大声地说话。',
        '分成两组进行活动。',
        '讨论怎样保护环境。',
      ],
      answer: 3,
      pinyin: 'bǎo hù huán jìng',
      meaning: 'to protect the environment',
      solution: {
        method: '答案就在第一段，王老师交代了小组活动的内容，要仔细找出活动的具体要求。',
        steps: [
          '第一段中王老师说："让你们讨论应该怎样保护环境"。',
          '这说明小组活动的内容是"讨论怎样保护环境"，对应选项(4)。',
          '"一起学课文"是昨天已完成的事；"练习大声地说话"和"分成两组"都不是王老师明确交代的活动内容（是两人一组，不是两组）。',
        ],
        tip: '阅读理解的"做什么"类问题，答案通常可以在原文中找到明确的句子，注意细节（如"两人一组"而非"分成两组"）。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_026',
      type: 'MCQ',
      q: '小美见文文不理自己，有什么感受？',
      options: ['伤心。', '生气。', '没有信心。', '不好意思。'],
      answer: 0,
      pinyin: 'shāng xīn',
      meaning: 'sad; heartbroken',
      solution: {
        method: '找出文中描写小美在文文不理她之后的反应的句子。',
        steps: [
          '第二段写道："文文看了小美一眼，没有理她。小美伤心地低下了头，不知道该怎么办才好。"',
          '"伤心地低下了头"直接说明了小美的感受是"伤心"，对应选项(1)。',
          '"生气"是小明的反应（对文文生气）；"没有信心"是小美原本不敢大声说话的原因，但不是"被不理"之后的感受；"不好意思"是文文后来向小美道歉时的感受。',
        ],
        tip: '回答"感受/心情"类问题时，要在原文中找出直接描写人物情绪的词语，如"伤心、生气、高兴"等。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_027',
      type: 'MCQ',
      q: '以下哪一个句子是正确的？',
      options: [
        '小明坐在小美的旁边。',
        '小美说话的声音很小。',
        '同学们都想和小美一组。',
        '文文和小美得了第一名。',
      ],
      answer: 1,
      pinyin: 'shēng yīn',
      meaning: 'voice; sound',
      solution: {
        method: '逐一对照原文，找出与原文内容相符的句子。',
        steps: [
          '原文说"坐在旁边的小明"是文文旁边的人，而小美是"坐在他（文文）前面"的，所以"小明坐在小美的旁边"不正确。',
          '文文说："小美说话声音很小，同学们一定听不清"——这跟选项(2)"小美说话的声音很小"一致，是正确的。',
          '原文没有提到"同学们都想和小美一组"，也没有说文文和小美最后得了第一名，这两个选项无法从原文中得到支持。',
        ],
        tip: '"以下哪一个句子是正确的"题型要逐句核对原文，特别留意人物的位置关系（旁边/前面）和事情有没有真的发生。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_028',
      type: 'MCQ',
      q: '小明的话让文文明白了什么？',
      options: [
        '要懂得保护环境。',
        '不应该看不起别人。',
        '做错了事要立刻道歉。',
        '要向华文好的同学学习。',
      ],
      answer: 1,
      pinyin: 'kàn bu qǐ',
      meaning: 'to look down on (someone)',
      solution: {
        method: '找出文中描写文文听完小明的话之后，心里明白了什么道理的句子。',
        steps: [
          '原文写道："听了小明的话，文文的脸红了起来，他明白了不应该看不起别人。"',
          '这句话直接说明了文文明白的道理是"不应该看不起别人"，对应选项(2)。',
          '"保护环境"是这次小组活动的主题，但不是文文从小明的话中明白的道理；"立刻道歉"和"向华文好的同学学习"都不是原文直接说明的道理。',
        ],
        tip: '"明白了什么道理"类问题，答案常常紧跟在"明白了..."、"懂得了..."这类句子后面，要找到原句再作答。',
      },
    },
  ],
};

// =====================================================================================
// 八、理解问答 (YueReadOpen) - 5题9分 (Q29 含 a/b 两小题，共6个子题)
// =====================================================================================

const yueReadOpenSet: SetQuestion = {
  id: 'p3_zh_eoy_tn_set4',
  topic: 'YueReadOpen',
  difficulty: 'stretch',
  setLabel: 'Tao Nan EOY Paper 2 - 八、理解问答',
  passage:
    '明华有个坏习惯，做功课时总是不专心，每天都要花很长的时间才能做完。\n\n为了帮明华改掉这个坏习惯，爸爸想到了一个好办法。明华生日那天，爸爸买了一台新的游戏机送给他。"明华，这是爸爸送给你的生日礼物。"爸爸说，"可是你每天必须认真做半个小时的功课，才能玩十分钟的游戏。"明华笑着接过礼物，对爸爸说："好的，我一定会认真做功课的！"\n\n接下来的几天，明华心里一直想着新的游戏机。他总是一边做功课，一边不停地问："爸爸，半个小时到了吗？"爸爸见明华一直问，便又买了一个小闹钟放在书桌上，让明华自己去看还要多久才能玩游戏。\n\n过了几个星期，明华学会了安排时间。他有时还会把所有的功课都做完，才去玩游戏机。就这样，明华不知不觉地养成了每天按时完成功课的好习惯，学习时也越来越专心了。爸爸见了，很开心。',
  questions: [
    {
      id: 'p3_zh_eoy_tn_029a',
      type: 'OpenEnded',
      q: '文中形容"一定要"的词语是：______ （1分）',
      answer: '必须',
      pinyin: 'bì xū',
      meaning: 'must; have to',
      solution: {
        method: '在原文中找出一个意思跟"一定要"相同的词语。',
        steps: [
          '在第二段中，爸爸说："可是你每天必须认真做半个小时的功课，才能玩十分钟的游戏。"',
          '「必须」（bìxū，must）的意思就是"一定要"，符合题目要求。',
        ],
        tip: '做"找出意思相同的词语"题时，先在脑中想出近义词，再到原文中找出对应的词。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_029b',
      type: 'OpenEnded',
      q: '文中形容"没有注意或没有感觉到"的词语是：______ （1分）',
      answer: '不知不觉',
      pinyin: 'bù zhī bù jué',
      meaning: 'unknowingly; unconsciously; without realizing it',
      solution: {
        method: '在原文中找出一个表示"没有察觉、自然而然"的成语。',
        steps: [
          '在最后一段中："明华不知不觉地养成了每天按时完成功课的好习惯"。',
          '「不知不觉」（bùzhībùjué）的意思是"没有察觉到、不自觉地"，正好符合"没有注意或没有感觉到"的意思。',
        ],
        tip: '「不知不觉」是常见的四字词语，常用来描写一种习惯或变化在不经意间慢慢形成。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_030',
      type: 'OpenEnded',
      q: '明华有什么坏习惯？（1分）',
      answer: '明华做功课时总是不专心，每天都要花很长的时间才能做完。', // 官方改正纸答案
      pinyin: 'huài xí guàn',
      meaning: 'bad habit',
      solution: {
        method: '答案在文章第一段，直接说明了明华的坏习惯是什么。',
        steps: [
          '第一段第一句："明华有个坏习惯，做功课时总是不专心，每天都要花很长的时间才能做完。"',
          '把这句话改写成自己的答案：明华做功课时不专心，所以每次都要花很久才能做完功课。',
        ],
        tip: '回答"是什么"类问题时，可以直接引用或改写原文第一句的关键信息，确保意思完整。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_031',
      type: 'OpenEnded',
      q: '看到爸爸送给他的游戏机，明华有什么反应？（2分）',
      answer: '明华笑着接过礼物，答应爸爸他会认真做功课。', // 官方改正纸答案
      pinyin: 'fǎn yìng',
      meaning: 'reaction; response',
      solution: {
        method:
          '找出第二段中描写明华收到游戏机后的动作和说的话，这两部分合起来就是他的"反应"。',
        steps: [
          '原文："明华笑着接过礼物，对爸爸说：‘好的，我一定会认真做功课的！’"',
          '第一点（1分）：明华笑着接过礼物（开心地收下礼物）。',
          '第二点（1分）：明华答应爸爸他会认真做功课。',
          '把两点合并写成完整的句子作答，可以拿到满分2分：「明华笑着接过礼物，答应爸爸他会认真做功课。」',
        ],
        tip: '"有什么反应"类问题通常包含"心情/表情"和"说的话或做的事"两部分，2分的题目往往需要写出两点才能拿满分。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_032',
      type: 'OpenEnded',
      q: '刚收到游戏机的那几天，明华有没有认真做功课？从哪里可以看出？（2分）',
      answer:
        '刚收到游戏机的那几天，明华没有认真做功课。他心里一直想着新的游戏机，总是一边做功课，一边不停地问爸爸，半个小时到了没有。', // 官方改正纸答案
      pinyin: 'zhuān xīn',
      meaning: 'focused; attentive',
      solution: {
        method:
          '先回答"有没有"（没有），再从第三段中找出能证明这一点的具体描写。',
        steps: [
          '第一点（1分）：回答"没有"——刚收到游戏机的那几天，明华没有认真做功课。',
          '第二点（1分）：原文第三段写道："他心里一直想着新的游戏机，总是一边做功课，一边不停地问爸爸，半个小时到了没有"，这说明他做功课时心思都在游戏机上，不专心。',
          '把"没有"和"从哪里看出"两部分合并写成完整句子，才能拿到2分的满分。',
        ],
        tip: '"有没有...？从哪里可以看出？"这类题目一定要回答两部分：先表态（有/没有），再引用原文细节作为证据。',
      },
    },
    {
      id: 'p3_zh_eoy_tn_033',
      type: 'OpenEnded',
      q: '你觉得爸爸还可以用什么办法让明华按时完成功课？（2分）',
      answer:
        '我觉得爸爸可以让明华自己设计一份学习时间表，然后按照时间表上的时间，按时完成功课。（参考答案，言之有理即可）', // 官方改正纸答案
      pinyin: 'shí jiān biǎo',
      meaning: 'timetable; schedule',
      solution: {
        method:
          '这是开放性问题，没有唯一的标准答案，只要建议合理、跟"帮助孩子按时完成功课"这个主题相关，并且写成完整的句子，就能得分。',
        steps: [
          '想一想生活中常见的"帮助安排时间"的方法，例如：制定时间表、设定奖励制度、陪伴孩子一起做功课等。',
          '选择一个自己觉得最合理的办法，并简单说明这个办法可以怎么帮助明华。',
          '参考答案：「我觉得爸爸可以让明华自己设计一份学习时间表，然后按照时间表上的时间，按时完成功课。」',
        ],
        tip: '回答开放性问题时，建议要"具体可行"，并尽量用一句完整的话写出"什么办法"+"为什么/怎样有帮助"。',
      },
    },
  ],
};

// =====================================================================================
// Export
// =====================================================================================

const eoyTaoNanPaper2: EoyTaoNanPaper2Question[] = [
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  q10,
  q11,
  peiDuiSet,
  q17,
  q18,
  q19,
  q20,
  tianKongSet,
  yueReadMcqSet,
  yueReadOpenSet,
];

export default eoyTaoNanPaper2;
