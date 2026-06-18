// =====================================================================================
// 公教中学(附小) (CHIJ St. Joseph's Convent/Catholic High - Gong Jiao Attached Primary)
// - 2024 P3 华文 年终考试 试卷二 (45分)
// Source: sgexam.com P3 Chinese EOY compilation, pp.149-161
// Sections covered (第一部分 12题15分 + 第二部分 18题30分):
//   辨字测验 / 词语选择 / 阅读理解一(MCQ) / 看图选词(KanTu, 连线题) /
//   词语搭配 / 扩写句子(JuZi) / 组句成段(ZuJu) / 阅读理解二(OpenEnded)
// 听力 (Listening, pp.145-148) and 看图写话/作文 (Composition) excluded
// per project rules.
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

export type EoyGongJiaoPaper2Question = SingleQuestion | SetQuestion;

// =====================================================================================
// 一、辨字测验 (BianZi) - 5题5分
// =====================================================================================

const bianZiInstruction = '请从提供的选项中选出正确的答案。';

const q1: SingleQuestion = {
  id: 'p3_zh_eoy_gj_001',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '那本书不是弟弟弄______的，你别怪他。',
  options: ['坡', '破', '被', '披'],
  answer: 1,
  pinyin: 'pò',
  meaning: '"弄破" = to tear (something) by accident',
  solution: {
    method:
      '「坡、破、被、披」读音相近（pō/pò/bèi/pī），字形也相似，要根据"弄___的"这个词组来判断。',
    steps: [
      '「破」（pò）+ "弄"= "弄破"，表示不小心把东西弄坏/撕坏，"那本书不是弟弟弄破的"意思自然。',
      '「坡（斜坡）、被（被子/被动）、披（披着）」放进"弄___的"都不能组成有意义的词语。',
    ],
    tip: '"弄破"常用来描写"不小心把书本、衣服、纸张等弄坏/撕破"的情况。',
  },
};

const q2: SingleQuestion = {
  id: 'p3_zh_eoy_gj_002',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '妹妹听不到闹______的响声，还在睡觉。',
  options: ['中', '冲', '钟', '种'],
  answer: 2,
  pinyin: 'zhōng',
  meaning: '"闹钟" = alarm clock',
  solution: {
    method:
      '「中、冲、钟、种」读音相近（zhōng/chōng/zhǒng），字形也相似，要根据"闹___"这个词组来判断。',
    steps: [
      '「钟」（zhōng）+ "闹"= "闹钟"，是用来叫人起床的时钟，"妹妹听不到闹钟的响声"意思自然。',
      '「中（中间）、冲（冲水）、种（种类）」放进"闹___"都不能组成有意义的词语。',
    ],
    tip: '"闹钟"是「闹」字最常见的搭配之一，注意「钟」字是「钅」（金）部，跟"金属制成的计时器"有关。',
  },
};

const q3: SingleQuestion = {
  id: 'p3_zh_eoy_gj_003',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '爸爸一有空，就会和我去______脚踏车。',
  options: ['棋', '骑', '汽', '齐'],
  answer: 1,
  pinyin: 'qí',
  meaning: '"骑" = to ride (骑脚踏车 = to ride a bicycle)',
  solution: {
    method:
      '「棋、骑、汽、齐」读音相近（qí/qì），字形也相似，要根据"___脚踏车"这个词组来判断。',
    steps: [
      '「骑」（qí）+ "脚踏车"= "骑脚踏车"，是描写"乘坐并操控两轮交通工具"的常用动词，意思自然。',
      '「棋（下棋）、汽（汽水/汽车，词性不同）、齐（整齐）」放进"___脚踏车"都不能组成有意义的词语。',
    ],
    tip: '「骑」字是「马」部，本义跟"骑马"有关，引申为"跨坐在交通工具上并操控它"，常见词语有"骑脚踏车、骑摩托车"。',
  },
};

const q4: SingleQuestion = {
  id: 'p3_zh_eoy_gj_004',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '现在是早上七点，太阳慢慢______起来了。',
  options: ['升', '生', '声', '绳'],
  answer: 0,
  pinyin: 'shēng',
  meaning: '"升起来" = to rise (e.g. the sun rising)',
  solution: {
    method:
      '「升、生、声、绳」读音相近（shēng），字形也相似，要根据"太阳慢慢___起来了"这个词组来判断。',
    steps: [
      '「升」（shēng）+ "起来"= "升起来"，表示物体从低处往高处移动，"太阳慢慢升起来了"描写日出的景象，意思自然。',
      '「生（出生/生气）、声（声音）、绳（绳子）」放进"太阳慢慢___起来了"都不能组成有意义的词语。',
    ],
    tip: '"升起来"常用来描写太阳、月亮、气球、旗子等"从低处往高处移动"的画面。',
  },
};

const q5: SingleQuestion = {
  id: 'p3_zh_eoy_gj_005',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '我和姐姐常去附______的游乐场玩。',
  options: ['紧', '净', '尽', '近'],
  answer: 3,
  pinyin: 'jìn',
  meaning: '"附近" = nearby; in the vicinity',
  solution: {
    method:
      '「紧、净、尽、近」字形相似（都含"尽/近"的部件），要选出能跟"附___"组成常用词语的字。',
    steps: [
      '「近」（jìn）+ "附"= "附近"，表示在某个地方旁边不远处，"我和姐姐常去附近的游乐场玩"意思自然。',
      '「紧（紧张）、净（干净）、尽（尽力）」放进"附___"都不能组成有意义的词语。',
    ],
    tip: '"附近"是描写位置关系时常用的词语，写法是「附」（阝+付）+「近」（走字旁+斤）。',
  },
};

// =====================================================================================
// 二、词语选择 (CiYu) - 4题4分
// =====================================================================================

const ciYuInstruction = '请从提供的选项中选出正确的答案。';

const q6: SingleQuestion = {
  id: 'p3_zh_eoy_gj_006',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '小强不听话，老师______不让他去操场踢球。',
  options: ['决定', '认为', '告诉', '希望'],
  answer: 0,
  pinyin: 'jué dìng',
  meaning: 'to decide',
  solution: {
    method:
      '"小强不听话"是原因，"老师___不让他去操场踢球"是老师采取的行动，要选出表示"做出选择/决定"的词语。',
    steps: [
      '「决定」（juédìng，to decide）+ 不让他去 = "决定不让他去操场踢球"，表示老师因为小强不听话而做出这个处理方式，意思自然。',
      '「认为（想法）、告诉（to tell，后面通常接对象+内容）、希望（hope，多用于期待将来发生的事）」都不能准确表达"老师做出处理决定"这个意思。',
    ],
    tip: '"决定 + 做某事/不做某事"是表达"做出选择"时常用的固定搭配。',
  },
};

const q7: SingleQuestion = {
  id: 'p3_zh_eoy_gj_007',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '这件衣服是表姐______的，非常特别。',
  options: ['请求', '爱护', '讨论', '设计'],
  answer: 3,
  pinyin: 'shè jì',
  meaning: 'to design',
  solution: {
    method:
      '"这件衣服是表姐___的，非常特别"要选出表示"创作出这件特别衣服"的动词。',
    steps: [
      '「设计」（shèjì，to design）+ "是表姐...的"= "是表姐设计的"，表示这件衣服是表姐构思制作的，跟"非常特别"前后呼应，意思自然。',
      '「请求（to request）、爱护（to cherish）、讨论（to discuss）」都不能表达"创作出一件物品"这个意思。',
    ],
    tip: '"是...设计的"常用来描写一件特别的作品（衣服、海报、卡片）是由谁构思创作出来的。',
  },
};

const q8: SingleQuestion = {
  id: 'p3_zh_eoy_gj_008',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '小华做完功课后，都会______地看看有没有写错字。',
  options: ['努力', '仔细', '安静', '吃惊'],
  answer: 1,
  pinyin: 'zǐ xì',
  meaning: 'carefully; in detail',
  solution: {
    method:
      '"___地看看有没有写错字"要选出能形容"检查时的态度"的词语。',
    steps: [
      '「仔细」（zǐxì，carefully）+ 地看看 = "仔细地看看"，表示认真、用心地检查，"看看有没有写错字"需要"仔细"的态度，意思自然。',
      '「努力（hardworking，多用于学习/做事的努力程度）、安静（quiet）、吃惊（shocked）」都不能准确描述"检查错字"时的态度。',
    ],
    tip: '"仔细地检查/仔细地看"常用来描写"认真、用心地查看细节"的动作。',
  },
};

const q9: SingleQuestion = {
  id: 'p3_zh_eoy_gj_009',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '一只大狗______冲了出来，我吓得大叫一声。',
  options: ['开始', '正在', '突然', '准时'],
  answer: 2,
  pinyin: 'tū rán',
  meaning: 'suddenly',
  solution: {
    method:
      '"___冲了出来，我吓得大叫一声"要选出能形容"事情发生得很快、出乎意料"的词语。',
    steps: [
      '「突然」（tūrán，suddenly）+ 冲了出来 = "突然冲了出来"，表示大狗毫无预警地冲出来，让人吓了一跳，"我吓得大叫一声"是因为这件事来得很突然，意思自然。',
      '「开始（to start）、正在（in the middle of doing something）、准时（on time）」都不能表达"出乎意料、毫无预警"的意思。',
    ],
    tip: '"突然 + 动作"常用来描写"毫无预警地发生的事情"，常跟"吓了一跳、吓得大叫"等表示惊吓的描写搭配。',
  },
};

// =====================================================================================
// 三、阅读理解一 (YueReadMCQ) - 3题6分
// =====================================================================================

const yueReadMcqSet: SetQuestion = {
  id: 'p3_zh_eoy_gj_set1',
  topic: 'YueReadMCQ',
  difficulty: 'core',
  setLabel: 'Gong Jiao 2024 EOY Paper 2 - 三、阅读理解一',
  passage:
    '开学时，小明和小红虽然是同班同学，但是他们谁都不认识。\n\n小明的数学很好，可是华文却不太好。小红的华文很好，数学题却常常不会做。为了让同学们之间互相认识，学习互相帮助，老师让小明坐在小红的旁边。谁在学习上有问题，就请旁边的同学教他。\n\n有一天，数学老师说学校要举行数学比赛。小红想要参加，可是担心自己在比赛中做得不好，就请小明帮她复习数学题目。\n\n过了几天，华文老师说学校要举行作文比赛。小明想要参加，小红知道后，便教小明怎么写作文。\n\n比赛的日子到了，小明和小红都做得不错。小明在作文比赛中得了第三名，小红在数学比赛中得了第二名。他们发现互相帮助让他们学到了更多知识，还让他们成为好朋友。',
  questions: [
    {
      id: 'p3_zh_eoy_gj_010',
      type: 'MCQ',
      q: '老师怎么让同学之间学习互相帮助？',
      options: [
        '小明坐在小红旁边，两人可以学习更多知识。',
        '在学习上有问题的同学，请旁边的同学教他。',
        '他选小红参加数学比赛，小明参加作文比赛。',
        '同学们经过互相学习，在比赛中得到前三名。',
      ],
      answer: 1,
      pinyin: 'bāng zhù',
      meaning: 'to help',
      solution: {
        method: '答案在第二段，直接说明了老师让同学们互相帮助的方法。',
        steps: [
          '第二段写道："为了让同学们之间互相认识，学习互相帮助，老师让小明坐在小红的旁边。谁在学习上有问题，就请旁边的同学教他。"',
          '老师的方法是"让有学习困难的同学，请坐在旁边的同学教他"，对应选项(2)。',
          '"小明坐在小红旁边可以学习更多知识"只是这个安排带来的好处，不是老师采取的"方法"本身；"他选小红参加数学比赛、小明参加作文比赛"和"在比赛中得到前三名"都是后来发生的事，不是老师让同学互相帮助的方法。',
        ],
        tip: '"老师怎么...？"类问题的答案，通常是文中描写老师"具体做法/安排"的句子，留意"老师让..."这类句式。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_011',
      type: 'MCQ',
      q: '在比赛前，小红和小明互相帮助，比赛的结果怎么样？',
      options: [
        '小红的数学成绩和小明的作文都进步了。',
        '小红帮小明在作文比赛中得到了第二名。',
        '小明和小红参加比赛后成为了好朋友。',
        '小明和小红在不同的比赛中得到前三名。',
      ],
      answer: 3,
      pinyin: 'míng cì',
      meaning: 'ranking; placing',
      solution: {
        method: '找出文章最后一段，描写两人在比赛中分别取得的名次。',
        steps: [
          '最后一段写道："小明在作文比赛中得了第三名，小红在数学比赛中得了第二名。"',
          '这说明小明和小红"在不同的比赛中（作文比赛和数学比赛）都得到了前三名"，对应选项(4)。',
          '原文没有具体说明"数学成绩和作文进步了多少"，也没有说"小红帮小明得到第二名"（小红是在数学比赛得第二，不是帮小明）；"成为好朋友"是结果之一，但题目问的是"比赛的结果"（即名次），选项(4)更直接对应名次结果。',
        ],
        tip: '"比赛的结果怎么样？"类问题要找出文中具体的"名次/成绩"描述，而不是笼统的感受或人物关系变化。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_012',
      type: 'MCQ',
      q: '小明和小红发现互相帮助让他们__________',
      options: [
        '学习怎么教同学，一起进步。',
        '坐在一起，可以问很多问题。',
        '本来不认识，后来互相认识了。',
        '学到更多知识，也成为好朋友。',
      ],
      answer: 3,
      pinyin: 'hǎo péng yǒu',
      meaning: 'good friend',
      solution: {
        method: '答案就在文章最后一句，直接说明了两人"发现"互相帮助带来的好处。',
        steps: [
          '最后一段最后一句写道："他们发现互相帮助让他们学到了更多知识，还让他们成为好朋友。"',
          '这句话直接对应选项(4)"学到更多知识，也成为好朋友"。',
          '"学习怎么教同学、坐在一起问问题、本来不认识后来认识"都不是文章最后这句话明确说明的内容。',
        ],
        tip: '这类"句子填空"题（选出最适合接在句子后面的内容），答案往往可以直接在原文中找到一句话几乎一字不差地对应。',
      },
    },
  ],
};

// =====================================================================================
// 四、看图选词 (KanTu) - 4题4分 (把图画和词语连起来)
// =====================================================================================

const kanTuSet: SetQuestion = {
  id: 'p3_zh_eoy_gj_set2',
  topic: 'KanTu',
  difficulty: 'foundation',
  setLabel: 'Gong Jiao 2024 EOY Paper 2 - 四、看图选词',
  passage:
    '请把图画和词语连起来。\n\nQ13：图中画着一些圆圆的、一颗一颗叠在一起的泡泡。\nQ14：图中画着一颗钻石，周围有光芒，闪闪发亮。\nQ15：图中画着一只猫的脸，箭头指着它嘴边的胡子。\nQ16：图中画着一只手拿着钱（$符号），表示要付钱。',
  wordBank: ['亮晶晶', '泡泡', '付钱', '胡子'],
  questions: [
    {
      id: 'p3_zh_eoy_gj_013',
      type: 'MCQ',
      q: 'Q13：图中画着一些圆圆的、一颗一颗叠在一起的圆圈，这是什么？',
      options: ['亮晶晶', '泡泡', '付钱', '胡子'],
      answer: 1,
      pinyin: 'pào pào',
      meaning: 'bubble(s)',
      solution: {
        method: '图中是一些圆形的、轻飘飘叠在一起的圆圈，要选出能形容这种"圆形空心球体"的名词。',
        steps: [
          '「泡泡」（pàopào，bubble）是指吹出来的、圆形的、里面是空气的小球，图中的圆圈正是泡泡的样子。',
          '"亮晶晶、付钱、胡子"都不能用来描述"一颗一颗叠在一起的圆圈"，可以排除。',
        ],
        tip: '图中如果出现"圆形、轻飘飘、一颗一颗的小球"，通常对应"泡泡"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_014',
      type: 'MCQ',
      q: 'Q14：图中画着一颗钻石，周围有光芒，闪闪发亮，可以用什么词语形容？',
      options: ['亮晶晶', '泡泡', '付钱', '胡子'],
      answer: 0,
      pinyin: 'liàng jīng jīng',
      meaning: 'sparkling; glittering',
      solution: {
        method: '图中钻石周围画着光芒线条，表示物体在发光、闪烁，要选出能形容这种"闪闪发光"状态的词语。',
        steps: [
          '「亮晶晶」（liàngjīngjīng，sparkling）是用来形容物体闪闪发光、十分明亮的样子，钻石周围的光芒正是"亮晶晶"的表现。',
          '"泡泡、付钱、胡子"都不能用来形容"物体闪闪发光"的样子，可以排除。',
        ],
        tip: '图中如果出现"物体周围有光芒线条，表示在发光"，通常对应"亮晶晶"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_015',
      type: 'MCQ',
      q: 'Q15：图中一只猫的脸上，箭头指着它嘴边长长的毛，这是什么？',
      options: ['亮晶晶', '泡泡', '付钱', '胡子'],
      answer: 3,
      pinyin: 'hú zi',
      meaning: 'whiskers; beard',
      solution: {
        method: '图中箭头指着猫嘴边一根根细长的毛，要选出能形容这种"嘴边的细毛"的名词。',
        steps: [
          '「胡子」（húzi，whiskers/beard）是指嘴边长出来的细毛，人和某些动物（如猫）的嘴边都会有胡子。',
          '图中箭头特别指向猫嘴边的细毛，正是"胡子"。',
          '"亮晶晶、泡泡、付钱"都不能用来描述"嘴边的细毛"，可以排除。',
        ],
        tip: '图中如果出现"箭头指向动物/人嘴边的细毛"，通常对应"胡子"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_016',
      type: 'MCQ',
      q: 'Q16：图中一只手拿着写有$符号的钱，这表示在做什么？',
      options: ['亮晶晶', '泡泡', '付钱', '胡子'],
      answer: 2,
      pinyin: 'fù qián',
      meaning: 'to pay (money)',
      solution: {
        method: '图中手中拿着的是钱（$符号），要选出能形容"用钱来交换东西/服务"这个动作的词语。',
        steps: [
          '「付钱」（fùqián，to pay）是指把钱交给对方，作为购买东西或服务的报酬。',
          '图中一只手拿着钱，正是"付钱"的动作。',
          '"亮晶晶、泡泡、胡子"都不能用来描述"拿钱交给别人"这个动作，可以排除。',
        ],
        tip: '图中如果出现"手中拿着钱/$符号，递给别人"，通常对应"付钱"这个词。',
      },
    },
  ],
};

// =====================================================================================
// 五、词语搭配 (PeiDui) - 5题5分
// =====================================================================================

const peiDuiSet: SetQuestion = {
  id: 'p3_zh_eoy_gj_set3',
  topic: 'PeiDui',
  difficulty: 'core',
  setLabel: 'Gong Jiao 2024 EOY Paper 2 - 五、词语搭配',
  passage:
    '从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的号码（1-8）填写在括号里。',
  wordBank: ['快活', '指定', '拇指', '搬动', '有趣', '左手', '参观', '山洞'],
  questions: [
    {
      id: 'p3_zh_eoy_gj_017',
      type: 'MCQ',
      q: '故事（　　）',
      options: ['快活', '指定', '拇指', '搬动', '有趣', '左手', '参观', '山洞'],
      answer: 4,
      pinyin: 'yǒu qù',
      meaning: 'interesting (故事有趣 = the story is interesting)',
      solution: {
        method: '"故事___"后面需要一个能形容"故事内容/好不好听"的形容词。',
        steps: [
          '「有趣」（yǒuqù，interesting）+ "故事"= "故事有趣"，表示这个故事生动好玩，意思自然。',
          '其余词语跟"故事"组合都不能组成有意义的词语。',
        ],
        tip: '"故事 + 有趣/精彩"是常见搭配，用来形容故事内容生动好玩。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_018',
      type: 'MCQ',
      q: '竖起（　　）',
      options: ['快活', '指定', '拇指', '搬动', '有趣', '左手', '参观', '山洞'],
      answer: 2,
      pinyin: 'mǔ zhǐ',
      meaning: 'thumb (竖起拇指 = to give a thumbs-up)',
      solution: {
        method: '"竖起___"后面需要一个表示"身体可以竖起的部位"的名词。',
        steps: [
          '「拇指」（mǔzhǐ，thumb）+ "竖起"= "竖起拇指"，表示把大拇指立起来，是表示赞赏、称赞的常见手势。',
          '其余词语跟"竖起"组合都不能组成有意义的词语。',
        ],
        tip: '"竖起拇指"是表示"赞、好棒"的常见手势动作搭配。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_019',
      type: 'MCQ',
      q: '钻进（　　）',
      options: ['快活', '指定', '拇指', '搬动', '有趣', '左手', '参观', '山洞'],
      answer: 7,
      pinyin: 'shān dòng',
      meaning: 'cave (钻进山洞 = to crawl into a cave)',
      solution: {
        method: '"钻进___"后面需要一个表示"可以钻进去的空间/地方"的名词。',
        steps: [
          '「山洞」（shāndòng，cave）+ "钻进"= "钻进山洞"，表示弯着身子进入一个洞穴空间，是常见搭配。',
          '其余词语跟"钻进"组合都不能组成有意义的词语。',
        ],
        tip: '"钻进 + 洞穴/缝隙/被窝"是常见搭配，表示弯身进入一个狭小的空间。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_020',
      type: 'MCQ',
      q: '（　　）书展',
      options: ['快活', '指定', '拇指', '搬动', '有趣', '左手', '参观', '山洞'],
      answer: 6,
      pinyin: 'cān guān',
      meaning: 'to visit (参观书展 = to visit a book fair)',
      solution: {
        method: '"___书展"前面需要一个表示"去看展览活动"的动词。',
        steps: [
          '「参观」（cānguān，to visit）+ "书展"= "参观书展"，表示去书展走走看看，是常见搭配。',
          '其余词语跟"书展"组合都不能组成有意义的词语。',
        ],
        tip: '"参观 + 展览/书展/博物馆"是常见搭配，表示到某个场所去观看、了解。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_021',
      type: 'MCQ',
      q: '（　　）椅子',
      options: ['快活', '指定', '拇指', '搬动', '有趣', '左手', '参观', '山洞'],
      answer: 3,
      pinyin: 'bān dòng',
      meaning: 'to move (something heavy) (搬动椅子 = to move a chair)',
      solution: {
        method: '"___椅子"前面需要一个表示"移动家具"的动词。',
        steps: [
          '「搬动」（bāndòng，to move something heavy）+ "椅子"= "搬动椅子"，表示把椅子从一个地方移到另一个地方，是常见搭配。',
          '其余词语跟"椅子"组合都不能组成有意义的词语。',
        ],
        tip: '"搬动 + 家具/重物（椅子、桌子、箱子）"是常见搭配，表示移动较重的物品。',
      },
    },
  ],
};

// =====================================================================================
// 六、扩写句子 (JuZi) - 5题10分
// =====================================================================================

const kuoXieInstruction = '请把括号里的词语加在句子中适当的地方。';

const q22: SingleQuestion = {
  id: 'p3_zh_eoy_gj_022',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '我吃着炸鸡，太好吃了！（香香的）',
  answer: '我吃着香香的炸鸡，太好吃了！',
  pinyin: 'xiāng xiāng de',
  meaning: '"香香的" = fragrant; nice-smelling',
  solution: {
    method:
      '「香香的」是形容词，用来修饰名词，通常放在被修饰的名词之前。',
    steps: [
      '找出句子中要被修饰的名词"炸鸡"。',
      '把「香香的」放在"炸鸡"前面："香香的炸鸡"。',
      '完整句子：「我吃着香香的炸鸡，太好吃了！」',
    ],
    tip: '形容食物香味/口感的词语（香香的、软软的、甜甜的）通常直接放在食物名词前面。',
  },
};

const q23: SingleQuestion = {
  id: 'p3_zh_eoy_gj_023',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '婆婆的牙齿不好，喜欢吃食物。（软软的）',
  answer: '婆婆的牙齿不好，喜欢吃软软的食物。',
  pinyin: 'ruǎn ruǎn de',
  meaning: '"软软的" = soft',
  solution: {
    method:
      '「软软的」是形容词，用来修饰名词，通常放在被修饰的名词之前。',
    steps: [
      '找出句子中要被修饰的名词"食物"。',
      '把「软软的」放在"食物"前面："软软的食物"。',
      '完整句子：「婆婆的牙齿不好，喜欢吃软软的食物。」',
    ],
    tip: '"牙齿不好 → 喜欢吃软软的食物"是常见的因果描写，"软软的"形容食物容易咀嚼。',
  },
};

const q24: SingleQuestion = {
  id: 'p3_zh_eoy_gj_024',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '弟弟考到第一名，他跳了起来。（兴奋地）',
  answer: '弟弟考到第一名，他兴奋地跳了起来。',
  pinyin: 'xīng fèn de',
  meaning: '"兴奋地" = excitedly',
  solution: {
    method:
      '「兴奋地」是副词，用来形容动作时的心情/状态，通常放在主语之后、动词之前。',
    steps: [
      '找出主语"他"和动词"跳了起来"。',
      '把「兴奋地」放在主语和动词之间："他兴奋地跳了起来"。',
      '完整句子：「弟弟考到第一名，他兴奋地跳了起来。」',
    ],
    tip: '「兴奋地」常用来形容因为开心、激动而做出的动作，如"兴奋地跳起来、兴奋地叫好"。',
  },
};

const q25: SingleQuestion = {
  id: 'p3_zh_eoy_gj_025',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '孩子们喊着："小明掉进水里了！"（不停地）',
  answer: '孩子们不停地喊着："小明掉进水里了！"',
  pinyin: 'bù tíng de',
  meaning: '"不停地" = continuously; without stopping',
  solution: {
    method:
      '「不停地」是副词，用来形容一个动作持续不断地进行，通常放在主语之后、动词之前。',
    steps: [
      '找出主语"孩子们"和动词"喊着"。',
      '把「不停地」放在主语和动词之间："孩子们不停地喊着"。',
      '保留后面的话语不变："‘小明掉进水里了！’"',
      '完整句子：「孩子们不停地喊着：‘小明掉进水里了！’」',
    ],
    tip: '"不停地 + 动词"表示动作一直持续、没有中断，常用来描写紧急、慌乱的情景，如"不停地喊、不停地哭"。',
  },
};

const q26: SingleQuestion = {
  id: 'p3_zh_eoy_gj_026',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '丽丽上课不专心，拿出一本书来看。（偷偷地）',
  answer: '丽丽上课不专心，偷偷地拿出一本书来看。',
  pinyin: 'tōu tōu de',
  meaning: '"偷偷地" = secretly; stealthily',
  solution: {
    method:
      '「偷偷地」是副词，用来形容动作时不让别人发现的状态，通常放在主语之后、动词之前。',
    steps: [
      '找出主语"丽丽"和动词"拿出一本书来看"。',
      '把「偷偷地」放在主语和动词之间："丽丽偷偷地拿出一本书来看"。',
      '完整句子：「丽丽上课不专心，偷偷地拿出一本书来看。」',
    ],
    tip: '「偷偷地」常用来形容"不想让别人（如老师）发现"的动作，跟"上课不专心"前后呼应。',
  },
};

// =====================================================================================
// 七、组句成段 (ZuJu) - 1题5分
// =====================================================================================

const zuJuSet: SetQuestion = {
  id: 'p3_zh_eoy_gj_set4',
  topic: 'ZuJu',
  difficulty: 'stretch',
  setLabel: 'Gong Jiao 2024 EOY Paper 2 - 七、组句成段',
  passage:
    '重新排列句子，组成合理的段落。\n\n（　）小文立刻对我说："别吃面了，面里有头发！"\n（　）这时，小文看到我的面里有一根头发。\n（　）我把头发拿出来，笑着对他说谢谢。\n（　）休息时，我和小文买了面，便一起坐下来吃。\n（　）我低下头看了看，果然有一根长长的头发。',
  questions: [
    {
      id: 'p3_zh_eoy_gj_027a',
      type: 'OpenEnded',
      q: '休息时，我和小文买了面，便一起坐下来吃。',
      answer: 1,
      pinyin: 'xiū xi shí',
      meaning: '"休息时" = during the break',
      solution: {
        method:
          '先理清整段故事的发展顺序：休息时买面一起吃 → 小文发现面里有头发并提醒 → "我"低头看确认 → "我"把头发拿出来并道谢。',
        steps: [
          '这句话交代了"休息时"这个时间和"我和小文买了面一起吃"这件事，是整件事的开端。',
          '其余句子都是吃面过程中发生的具体事情，应该排在这句话之后。',
          '因此这句话排在第1位。',
        ],
        tip: '排序题中，交代"时间、人物、起因"的句子（背景介绍）通常排在段落的第一位。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_027b',
      type: 'OpenEnded',
      q: '这时，小文看到我的面里有一根头发。',
      answer: 2,
      pinyin: 'zhè shí',
      meaning: '"这时" = at this moment; just then',
      solution: {
        method: '「这时」常用来表示"在前面描写的情景中，突然发生了一件新事情"。',
        steps: [
          '在"我和小文一起吃面"（第1位）之后，「这时」引出了一件突发情况——小文发现了"我"的面里有头发。',
          '这件事是后面"小文提醒我"和"我低头检查"的起因，所以排在它们之前。',
          '因此这句话排在第2位。',
        ],
        tip: '「这时」「突然」「忽然」等词常用来引出故事中的"转折事件"，是判断排序的重要线索。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_027c',
      type: 'OpenEnded',
      q: '小文立刻对我说："别吃面了，面里有头发！"',
      answer: 3,
      pinyin: 'lì kè',
      meaning: '"立刻" = immediately',
      solution: {
        method: '这句话描写小文发现头发之后的反应（提醒"我"），应该紧接在"小文看到头发"之后。',
        steps: [
          '小文"看到我的面里有一根头发"（第2位）之后，立刻提醒"我"不要再吃了。',
          '"立刻对我说"是小文发现头发后的第一反应，紧接在"看到"之后。',
          '因此这句话排在第3位。',
        ],
        tip: '"X立刻说/做..."这类句子通常紧跟在"X看到/发现了什么"之后，描写人物发现问题后的第一反应。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_027d',
      type: 'OpenEnded',
      q: '我低下头看了看，果然有一根长长的头发。',
      answer: 4,
      pinyin: 'guǒ rán',
      meaning: '"果然" = sure enough; as expected',
      solution: {
        method: '这句话描写"我"听了小文的话之后的反应——低头检查并确认。',
        steps: [
          '小文提醒"我"（第3位）之后，"我"才会低下头去检查自己的面。',
          '"果然有一根长长的头发"表示检查后确认了小文说的是真的，是"我"接下来把头发拿出来（第5位）这个行动的前提。',
          '因此这句话排在第4位。',
        ],
        tip: '「果然」常用来表示"经过检查/验证后，发现事情跟别人说的/自己猜的一样"，常紧跟在"被提醒/被告知"之后。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_027e',
      type: 'OpenEnded',
      q: '我把头发拿出来，笑着对他说谢谢。',
      answer: 5,
      pinyin: 'xiè xie',
      meaning: '"谢谢" = thank you',
      solution: {
        method: '这句话描写"我"确认头发存在后采取的行动，以及对小文的回应，是整段故事的结尾。',
        steps: [
          '"我"低头确认有头发（第4位）之后，接下来要做的事就是把头发拿出来。',
          '"笑着对他说谢谢"是"我"对小文提醒自己这件事的感谢，是整件事的圆满收尾。',
          '因此这句话排在第5位，是整段的最后一句。',
        ],
        tip: '故事类短文的最后一句通常是人物的行动结果或感谢/感受，可以用来判断哪句话排在最后。',
      },
    },
  ],
};

// =====================================================================================
// 八、阅读理解二 (YueReadOpen) - 3题6分
// =====================================================================================

const yueReadOpenSet: SetQuestion = {
  id: 'p3_zh_eoy_gj_set5',
  topic: 'YueReadOpen',
  difficulty: 'stretch',
  setLabel: 'Gong Jiao 2024 EOY Paper 2 - 八、阅读理解二',
  passage:
    '放学的铃声响了，同学们有说有笑地离开了课堂。丽丽经过食堂，发现一张桌子上有一个文具盒。她走过去拿起来看，心想：这个文具盒真漂亮！这是我喜欢的红色，上面还有恐龙的图案。丽丽看到周围没人注意她，就把文具盒放进书包里。\n\n回到家后，丽丽从书包里拿出红色的文具盒。姐姐发现了，好奇地问丽丽："这个文具盒是谁的？"丽丽便把在食堂捡到文具盒的事情告诉了姐姐。\n\n姐姐听完后，非常生气地说："捡到东西应该交给老师，你怎么可以自己藏起来带回家呢？这是不对的行为！"丽丽听了，低下头不说话。姐姐看了，接着说："文具盒的主人找不到它一定很着急。明天你要把文具盒交给老师，向老师说对不起。"丽丽红着脸，说："姐姐，我知道错了。明天我一定把文具盒交给老师。"\n\n姐姐摸了摸丽丽的头，说："知错能改就是好孩子！"',
  questions: [
    {
      id: 'p3_zh_eoy_gj_028',
      type: 'OpenEnded',
      q: '为什么丽丽喜欢那个文具盒？（2分）',
      answer: '因为丽丽觉得文具盒很漂亮，是她喜欢的红色，上面还有恐龙的图案。', // 官方答案
      pinyin: 'piào liang',
      meaning: 'beautiful; pretty',
      solution: {
        method:
          '答案在第一段，丽丽看到文具盒时心里想的内容，正是她喜欢这个文具盒的原因。',
        steps: [
          '第一段写道，丽丽心想："这个文具盒真漂亮！这是我喜欢的红色，上面还有恐龙的图案。"',
          '第一点（1分）：文具盒很漂亮，是丽丽喜欢的红色。',
          '第二点（1分）：文具盒上还有恐龙的图案。',
          '把这两点合并成一句话作答："因为丽丽觉得文具盒很漂亮，是她喜欢的红色，上面还有恐龙的图案。"',
        ],
        tip: '"为什么喜欢...？"类问题的答案，通常是文中人物心理活动（心想：...）里描写"物品特点"的部分，2分题通常需要写出两个特点。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_029',
      type: 'OpenEnded',
      q: '姐姐认为丽丽做错了什么事？她为什么这么认为？（2分）',
      answer:
        '姐姐认为丽丽捡到东西应该交给老师，不应该把捡到的文具盒收起来带回家。因为文具盒的主人找不到它一定很着急。', // 官方答案
      pinyin: 'zhǎo bú dào',
      meaning: '"找不到" = cannot find',
      solution: {
        method:
          '找出第三段中姐姐说的话，第一部分是"丽丽做错了什么"，第二部分是"姐姐为什么这么认为"。',
        steps: [
          '第一点（1分）：姐姐说："捡到东西应该交给老师，你怎么可以自己藏起来带回家呢？这是不对的行为！"——丽丽做错的事是"捡到文具盒后没有交给老师，而是自己藏起来带回家"。',
          '第二点（1分）：姐姐接着说："文具盒的主人找不到它一定很着急。"——姐姐认为这样做不对，是因为文具盒的主人会因为找不到东西而感到着急。',
          '把两点合并写成完整的句子作答。',
        ],
        tip: '这类"做错了什么+为什么"的两小问题目，要分别从文中找出"姐姐批评的内容"和"姐姐给出的理由"两部分。',
      },
    },
    {
      id: 'p3_zh_eoy_gj_030',
      type: 'OpenEnded',
      q: '你认为丽丽是个怎样的孩子？从哪里可以看出？（2分）',
      answer:
        '我认为丽丽是个知错能改的好孩子。她听了姐姐的话后，知道自己做错事，向姐姐说对不起，答应把文具盒交给老师。', // 官方答案
      pinyin: 'zhī cuò néng gǎi',
      meaning: '"知错能改" = able to admit and correct one\'s mistakes',
      solution: {
        method:
          '这是2分的"你认为...？从哪里可以看出？"题型，第一部分给出对人物的评价，第二部分要引用文中具体的行为作为证据。',
        steps: [
          '第一点（1分）：根据丽丽听了姐姐的话后的反应，可以给出评价，例如"知错能改的好孩子"。',
          '第二点（1分）：第三段最后写道，丽丽红着脸说："姐姐，我知道错了。明天我一定把文具盒交给老师。"——这就是"知错能改"的具体表现，可以作为证据。',
          '把评价和证据合并成一句话作答。',
        ],
        tip: '"你认为...是个怎样的孩子？从哪里可以看出？"类问题，评价（如"懂事、知错能改"）要跟文中描写的具体行为相符，并把这些行为作为证据写出来。',
      },
    },
  ],
};

// =====================================================================================
// Export
// =====================================================================================

const eoyGongJiaoPaper2: EoyGongJiaoPaper2Question[] = [
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  yueReadMcqSet,
  kanTuSet,
  peiDuiSet,
  q22,
  q23,
  q24,
  q25,
  q26,
  zuJuSet,
  yueReadOpenSet,
];

export default eoyGongJiaoPaper2;
