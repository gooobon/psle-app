// =====================================================================================
// 公立培群学校 (Pei Chun Public School) - 2021 P3 高级华文 年终考试 试卷二 (45分)
// Source: sgexam.com P3 Chinese EOY compilation, pp.90-104 (Booklet A + Booklet B)
// Sections covered: 辨字测验 / 词语选择 / 阅读理解(MCQ) / 组句成段(ZuJu) /
//                    词语搭配 / 看图选词(KanTu) / 连接句子+扩写句子(JuZi) /
//                    阅读理解(OpenEnded)
// 听力 (Listening), 口试 (Oral), 试卷一/作文 (Composition) excluded per project rules.
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

export type EoyPeiQunPaper2Question = SingleQuestion | SetQuestion;

// =====================================================================================
// （一）辨字测验 (BianZi) - 5题5分 (每题1分)
// =====================================================================================

const bianZiInstruction = '从各题所提供的四个答案中，选出正确的答案。';

const q1: SingleQuestion = {
  id: 'p3_zh_eoy_pq_001',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '学校就在我们家附______。',
  options: ['巾', '今', '近', '进'],
  answer: 2,
  pinyin: 'jìn',
  meaning: '"附近" = nearby; in the vicinity',
  solution: {
    method:
      '「巾、今、近、进」字形相似，但只有一个字能跟"附___"组成常用词语。',
    steps: [
      '「近」（jìn）+ "附"= "附近"，意思是"在某个地方旁边不远处"，"学校就在我们家附近"意思自然。',
      '「巾（毛巾）、今（今天）、进（前进）」都不能跟"附"组成有意义的词语。',
    ],
    tip: '"附近"是描写位置关系时常用的词语，注意它的写法是「近」（走字旁+斤），不是「进」（走字旁+井）。',
  },
};

const q2: SingleQuestion = {
  id: 'p3_zh_eoy_pq_002',
  topic: 'BianZi',
  difficulty: 'foundation',
  instruction: bianZiInstruction,
  q: '这些问题我看不______，你教我好吗？',
  options: ['懂', '重', '量', '里'],
  answer: 0,
  pinyin: 'dǒng',
  meaning: '"看不懂" = cannot understand (by reading/looking)',
  solution: {
    method:
      '"看不___"是一个常用的词组，要选出能跟"看不"组成表示"无法理解"意思的字。',
    steps: [
      '「懂」（dǒng，to understand）+ "看不"= "看不懂"，表示看了但不明白，"这些问题我看不懂，你教我好吗？"意思通顺。',
      '「重（zhòng，heavy）、量（liàng，measure）、里（lǐ，inside）」放进"看不___"都不能组成有意义的词语。',
    ],
    tip: '"看不懂、听不懂、想不明白"都是描写"无法理解"的常见词组。',
  },
};

const q3: SingleQuestion = {
  id: 'p3_zh_eoy_pq_003',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '小美______过头一看，原来是家明在叫她。',
  options: ['专', '低', '转', '底'],
  answer: 2,
  pinyin: 'zhuǎn',
  meaning: '"转过头" = turned her head around',
  solution: {
    method:
      '「专、低、转、底」字形相似，要选出能跟"___过头"组成"转动头部"这个动作的字。',
    steps: [
      '「转」（zhuǎn）+ "过头"= "转过头"，表示把头转向另一个方向，"小美转过头一看，原来是家明在叫她"描写小美回头看的动作，意思自然。',
      '「专（专心）、低（低头）、底（底下）」放进"___过头一看"都不能组成有意义的词语（"低头"虽是常见词，但"低过头"不是固定搭配）。',
    ],
    tip: '"转过头/转过身"常用来描写一个人改变面对的方向，去看后面或旁边的人或事物。',
  },
};

const q4: SingleQuestion = {
  id: 'p3_zh_eoy_pq_004',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '哥哥写的这______作文真不错！',
  options: ['条', '篇', '张', '片'],
  answer: 1,
  pinyin: 'piān',
  meaning: '"篇" = measure word for essays/articles (这篇作文 = this essay)',
  solution: {
    method:
      '「条、篇、张、片」都是量词，要选出能用来计量"作文"的量词。',
    steps: [
      '「篇」（piān）专门用来计量文章、作文、报道等成段的文字内容，"这篇作文"是固定搭配。',
      '「条」常用于细长的东西（一条路）、「张」常用于扁平的东西（一张纸）、「片」常用于薄片状的东西（一片面包），都不用来计量"作文"这种成篇的文字。',
    ],
    tip: '记量词时可以联想"这种东西的形状/性质"：成篇的文章用「篇」，细长的物体用「条」，扁平的物体用「张」。',
  },
};

const q5: SingleQuestion = {
  id: 'p3_zh_eoy_pq_005',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '公公生病了，妈妈______他去看医生。',
  options: ['杯', '贝', '赔', '陪'],
  answer: 3,
  pinyin: 'péi',
  meaning: '"陪" = to accompany (陪他去看医生 = to accompany him to see the doctor)',
  solution: {
    method:
      '「杯、贝、赔、陪」字形相似，要选出能表示"妈妈和公公一起去看医生"这个意思的字。',
    steps: [
      '「陪」（péi，to accompany）+ "他去看医生"= "陪他去看医生"，表示妈妈跟公公一起去，意思自然。',
      '「杯（杯子）、贝（贝壳）、赔（赔钱，to compensate）」放进句子里都讲不通。',
    ],
    tip: '「陪」字是「阝」（双耳旁）部，跟"陪伴、随同"有关；「赔」字是「贝」部，跟"金钱、赔偿"有关，两者意思完全不同，要小心分辨。',
  },
};

// =====================================================================================
// （二）词语选择 (CiYu) - 4题4分 (每题1分)
// =====================================================================================

const ciYuInstruction = '从各题所提供的四个答案中，选出正确的答案。';

const q6: SingleQuestion = {
  id: 'p3_zh_eoy_pq_006',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '小文______学习，是个好孩子。',
  options: ['努力', '故意', '马上', '现在'],
  answer: 0,
  pinyin: 'nǔ lì',
  meaning: 'to work hard; diligently',
  solution: {
    method:
      '句子后半部分说"是个好孩子"，前半部分要选出一个能形容"小文学习态度好"的词语。',
    steps: [
      '「努力」（nǔlì，to work hard）+ 学习 = "努力学习"，表示认真学习，跟"是个好孩子"前后呼应，意思自然。',
      '「故意（on purpose）、马上（immediately）、现在（now）」都不能用来形容"学习态度好"。',
    ],
    tip: '"努力学习/努力工作"是常见搭配，"努力"用来形容做事认真、肯花心思。',
  },
};

const q7: SingleQuestion = {
  id: 'p3_zh_eoy_pq_007',
  topic: 'CiYu',
  difficulty: 'foundation',
  instruction: ciYuInstruction,
  q: '老师讲的故事非常______。',
  options: ['急忙', '整齐', '有趣', '吃惊'],
  answer: 2,
  pinyin: 'yǒu qù',
  meaning: 'interesting; fun',
  solution: {
    method: '要找出能形容"故事"内容的形容词。',
    steps: [
      '「有趣」（yǒuqù，interesting）可以用来形容故事生动、好玩，"老师讲的故事非常有趣"意思自然。',
      '「急忙（in a hurry）、整齐（neat/tidy）、吃惊（shocked）」都不能用来形容"故事"本身的内容。',
    ],
    tip: '形容故事、电影、书本好看好玩，常用「有趣、精彩、好看」等词语。',
  },
};

const q8: SingleQuestion = {
  id: 'p3_zh_eoy_pq_008',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '我们______老师会带大家到动物园去玩。',
  options: ['希望', '连忙', '告诉', '准备'],
  answer: 0,
  pinyin: 'xī wàng',
  meaning: 'to hope',
  solution: {
    method:
      '"我们___老师会带大家到动物园去玩"是说话人对未来的一种期待，要选出表示"期待将来发生某事"的词语。',
    steps: [
      '「希望」（xīwàng，to hope）后面可以接一整句话，表示对未来的期望，"我们希望老师会带大家到动物园去玩"意思通顺。',
      '「连忙（hurriedly）、告诉（to tell）、准备（to prepare）」都不能表达"对将来的期待"这个意思。',
    ],
    tip: '"我们希望..."、"我希望..."是表达对未来期望时常用的句式。',
  },
};

const q9: SingleQuestion = {
  id: 'p3_zh_eoy_pq_009',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '哥哥______留在新加坡读大学。',
  options: ['发现', '决定', '变成', '表演'],
  answer: 1,
  pinyin: 'jué dìng',
  meaning: 'to decide',
  solution: {
    method:
      '"哥哥___留在新加坡读大学"描写哥哥对自己未来做出的选择，要选出表示"做出选择"的词语。',
    steps: [
      '「决定」（juédìng，to decide）后面可以接一个表示行动的短语，"哥哥决定留在新加坡读大学"表示哥哥已经做出了这个选择，意思自然。',
      '「发现（to discover）、变成（to become）、表演（to perform）」都不能表达"做出选择/决定"的意思。',
    ],
    tip: '"决定 + 做某事"是表达"做出选择"时常用的固定搭配。',
  },
};

// =====================================================================================
// （三）阅读理解 (YueReadMCQ) - 3题6分 (每题2分)
// =====================================================================================

const yueReadMcqSet: SetQuestion = {
  id: 'p3_zh_eoy_pq_set1',
  topic: 'YueReadMCQ',
  difficulty: 'core',
  setLabel: 'Pei Chun EOY Paper 2 - （三）阅读理解',
  passage:
    '下课的时候，我拿了球和同学们在课室里玩。\n\n当我们玩得很高兴的时候，突然"砰(pēng)"的一声，课室里的窗被打破了。\n\n大家看了都很害怕地跑掉了，只有我怕得站在那里。过了一会儿，我拿了球走去办公室。\n\n我把事情跟老师说，老师听了说："你很诚(chéng)实，又知道要认错，是个好孩子。不过，你以后不能在课室里玩球了！"',
  questions: [
    {
      id: 'p3_zh_eoy_pq_010',
      type: 'MCQ',
      q: '下课的时候，"我"和同学们在哪里玩球？',
      options: ['课室里。', '操场上。', '草地上。', '办公室。'],
      answer: 0,
      pinyin: 'kè shì',
      meaning: 'classroom',
      solution: {
        method: '答案就在文章第一句，直接说明了"我"和同学们玩球的地方。',
        steps: [
          '第一句写道："下课的时候，我拿了球和同学们在课室里玩。"',
          '"在课室里玩"说明他们玩球的地方是"课室里"，对应选项(1)。',
          '"操场上、草地上、办公室"都不是文中提到的玩球地点（办公室是后来"我"去找老师的地方）。',
        ],
        tip: '阅读理解的"在哪里"类问题，答案通常就在文章第一两句话中，留意地点名词。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_011',
      type: 'MCQ',
      q: '同学们为什么都很害怕？',
      options: [
        '他们正在课室玩球。',
        '他们正要去办公室。',
        '他们打破教室的窗。',
        '他们听到有人说话。',
      ],
      answer: 2,
      pinyin: 'hài pà',
      meaning: 'afraid; scared',
      solution: {
        method: '找出文中描写"害怕"之前发生的事，那就是同学们害怕的原因。',
        steps: [
          '第二段写道："突然‘砰’的一声，课室里的窗被打破了。"',
          '第三段接着说："大家看了都很害怕地跑掉了"，说明同学们是因为窗户被打破这件事而感到害怕。',
          '"打破窗"这件事正是大家害怕的原因，对应选项(3)。"正在课室玩球"是之前的状态，不是害怕的原因；"正要去办公室"和"听到有人说话"都跟原文不符。',
        ],
        tip: '"为什么...？"类问题的答案，通常是紧接在"结果句"（这里是"都很害怕地跑掉了"）前面的那句话，留意因果关系。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_012',
      type: 'MCQ',
      q: '"我"为什么要走去办公室？',
      options: [
        '"我"和同学玩得很高兴。',
        '"我"要走去跟老师认错。',
        '"我"要把球拿去给老师。',
        '"我"不能在课室里玩球。',
      ],
      answer: 1,
      pinyin: 'rèn cuò',
      meaning: 'to admit a mistake; to own up',
      solution: {
        method: '找出文章最后一段，老师对"我"说的话，从中可以推断"我"去办公室的目的。',
        steps: [
          '最后一段中老师说："你很诚实，又知道要认错，是个好孩子。"',
          '老师称赞"我"懂得"认错"，说明"我"主动去办公室找老师，是为了承认打破窗户这件事是自己的责任。',
          '"和同学玩得很高兴"是之前发生的事；"把球拿去给老师"和"不能在课室里玩球"都不是"我"去办公室的目的，而是事情发生后老师的处理结果。',
        ],
        tip: '有时候答案不是直接写出来的，需要根据人物的对话（如老师称赞"我"知道认错）来推断人物的行为动机。',
      },
    },
  ],
};

// =====================================================================================
// （四）组句成段 (ZuJu) - 1题5分
// =====================================================================================

const zuJuSet: SetQuestion = {
  id: 'p3_zh_eoy_pq_set2',
  topic: 'ZuJu',
  difficulty: 'stretch',
  setLabel: 'Pei Chun EOY Paper 2 - （四）组句成段',
  passage:
    '根据所提供的短句，把下面的句子重新排列，组成合理的段落，然后把数目字填写在括号里。\n\n（1）上个星期天，我和弟弟一起到海边玩。\n\n（　）我急忙拾起一块石头向狗扔去，它赶快跑掉。\n（　）过后，我快步地走上前抱住弟弟，说："弟弟别怕！我们回家吧！"\n（　）这时，不知哪儿来的一只狗，向弟弟跑去。\n（　）我们一会儿踏脚车，一会儿玩泥沙，玩得很开心。\n（　）他怕得说不出话来。',
  questions: [
    {
      id: 'p3_zh_eoy_pq_013a',
      type: 'OpenEnded',
      q: '我们一会儿踏脚车，一会儿玩泥沙，玩得很开心。',
      answer: 2,
      pinyin: 'yī huìr ... yī huìr ...',
      meaning: '"一会儿...，一会儿..." = (does) one thing, then another, alternately',
      solution: {
        method:
          '先理清整段故事的发展顺序：到海边玩 → 玩得开心 → 一只狗向弟弟跑去 → 弟弟害怕说不出话 → "我"扔石头赶走狗 → 抱住弟弟安慰他。',
        steps: [
          '这句话描写"我"和弟弟刚到海边时玩耍的情景，应该紧接在第（1）句之后。',
          '"玩得很开心"是平静的开头，跟后面"狗跑来"形成对比，是事件发生前的背景描写。',
          '因此这句话排在第2位。',
        ],
        tip: '排序题可以先找出"事件发生前的背景描写"（通常是平静、开心的画面），这类句子往往排在故事的前面。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_013b',
      type: 'OpenEnded',
      q: '这时，不知哪儿来的一只狗，向弟弟跑去。',
      answer: 3,
      pinyin: 'zhè shí',
      meaning: '"这时" = at this moment; just then',
      solution: {
        method: '「这时」常用来表示"在前面描写的情景中，突然发生了一件新事情"。',
        steps: [
          '在"我们玩得很开心"（第2位）之后，「这时」引出了一件突发事件——一只狗向弟弟跑去。',
          '这件事是后面"弟弟害怕"和"我赶走狗"的起因，所以排在它们之前。',
          '因此这句话排在第3位。',
        ],
        tip: '「这时」「突然」「忽然」等词常用来引出故事中的"转折事件"，是判断排序的重要线索。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_013c',
      type: 'OpenEnded',
      q: '他怕得说不出话来。',
      answer: 4,
      pinyin: 'pà',
      meaning: '"怕" = afraid; scared',
      solution: {
        method: '这句话描写弟弟看到狗跑来之后的反应，应该紧接在"狗向弟弟跑去"之后。',
        steps: [
          '狗向弟弟跑去（第3位）之后，弟弟感到害怕，"怕得说不出话来"是他当下的反应。',
          '这句话是"我"接下来采取行动（扔石头赶狗、安慰弟弟）的原因之一，所以排在它们之前。',
          '因此这句话排在第4位。',
        ],
        tip: '描写人物"反应/情绪"的句子，通常紧跟在"引发这种情绪的事件"之后。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_013d',
      type: 'OpenEnded',
      q: '我急忙拾起一块石头向狗扔去，它赶快跑掉。',
      answer: 5,
      pinyin: 'jí máng',
      meaning: '"急忙" = hastily; in a hurry',
      solution: {
        method: '这句话描写"我"看到弟弟害怕之后采取的行动，应该排在"弟弟害怕"之后。',
        steps: [
          '弟弟"怕得说不出话来"（第4位）之后，"我"必须采取行动保护弟弟。',
          '"急忙拾起一块石头向狗扔去，它赶快跑掉"描写"我"赶走狗的过程，是解决"狗追弟弟"这个问题的关键行动。',
          '因此这句话排在第5位。',
        ],
        tip: '在"问题出现→解决问题"的故事结构中，"解决问题的行动"通常排在"问题/危险出现"之后。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_013e',
      type: 'OpenEnded',
      q: '过后，我快步地走上前抱住弟弟，说："弟弟别怕！我们回家吧！"',
      answer: 6,
      pinyin: 'guò hòu',
      meaning: '"过后" = afterwards; after that',
      solution: {
        method: '「过后」表示"在前面的事情发生之后"，这句话描写整件事情的结尾。',
        steps: [
          '狗被赶走（第5位）之后，"我"接着安慰受到惊吓的弟弟，并提议回家。',
          '"过后...抱住弟弟，说：‘弟弟别怕！我们回家吧！’"是整个事件的收尾，安抚情绪并结束这次出游。',
          '因此这句话排在第6位，是整段的最后一句。',
        ],
        tip: '「过后」常用来引出故事的结尾部分，描写事情解决后人物的反应或后续安排。',
      },
    },
  ],
};

// =====================================================================================
// （五）词语搭配 (PeiDui) - 5题5分 (每题1分)
// =====================================================================================

const peiDuiSet: SetQuestion = {
  id: 'p3_zh_eoy_pq_set3',
  topic: 'PeiDui',
  difficulty: 'core',
  setLabel: 'Pei Chun EOY Paper 2 - （五）词语搭配',
  passage:
    '从所提供的词语中，选出可以和各题的词语搭配成合理词组的词语，然后把代表它的数目字填写在括号里。',
  wordBank: ['问题', '回答', '容易', '强壮', '咬断', '原谅', '设计', '练习'],
  questions: [
    {
      id: 'p3_zh_eoy_pq_014',
      type: 'MCQ',
      q: '（　　）竹子',
      options: ['问题', '回答', '容易', '强壮', '咬断', '原谅', '设计', '练习'],
      answer: 4,
      pinyin: 'yǎo duàn',
      meaning: 'to bite through (咬断竹子 = to bite a bamboo stick in two)',
      solution: {
        method: '"___竹子"前面需要一个表示"对竹子做的动作"的动词。',
        steps: [
          '「咬断」（yǎoduàn，to bite through）+ 竹子 = "咬断竹子"，描写用嘴咬断竹子（例如熊猫咬竹子），意思自然。',
          '其余词语跟"竹子"组合都没有合理意义，可以排除。',
        ],
        tip: '"咬断 + 物品名词（竹子、绳子、树枝）"是常见搭配，表示用牙齿把物体咬开/咬断。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_015',
      type: 'MCQ',
      q: '（　　）贺卡',
      options: ['问题', '回答', '容易', '强壮', '咬断', '原谅', '设计', '练习'],
      answer: 6,
      pinyin: 'shè jì',
      meaning: 'to design (设计贺卡 = to design a greeting card)',
      solution: {
        method: '"___贺卡"前面需要一个表示"制作/创作贺卡"的动词。',
        steps: [
          '「设计」（shèjì，to design）+ 贺卡 = "设计贺卡"，表示构思并制作一张贺卡，是常见的手工/美术活动。',
          '"问题贺卡、回答贺卡、容易贺卡、强壮贺卡、咬断贺卡、原谅贺卡、练习贺卡"都没有意义，可以排除。',
        ],
        tip: '"设计 + 名词（贺卡、卡片、海报）"是常见搭配，表示构思并做出某个物品。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_016',
      type: 'MCQ',
      q: '讨论（　　）',
      options: ['问题', '回答', '容易', '强壮', '咬断', '原谅', '设计', '练习'],
      answer: 0,
      pinyin: 'wèn tí',
      meaning: 'problem; issue; question (讨论问题 = to discuss an issue)',
      solution: {
        method: '"讨论___"后面需要一个表示"可以讨论的内容"的名词。',
        steps: [
          '「问题」（wèntí，problem/issue）是名词，"讨论问题"是非常常见的固定搭配，表示就某件事情交换意见。',
          '其余词语大多是动词或形容词，不能作为"讨论"的对象。',
        ],
        tip: '"讨论 + 问题/事情/计划"是常见搭配，"讨论"的对象通常是一件需要大家交换看法的事。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_017',
      type: 'MCQ',
      q: '请求（　　）',
      options: ['问题', '回答', '容易', '强壮', '咬断', '原谅', '设计', '练习'],
      answer: 5,
      pinyin: 'yuán liàng',
      meaning: 'forgiveness (请求原谅 = to ask for forgiveness)',
      solution: {
        method: '"请求___"后面需要一个表示"向别人提出的请求内容"的词语。',
        steps: [
          '「原谅」（yuánliàng，forgiveness/to forgive）+ "请求"= "请求原谅"，表示请别人不要再追究自己的错误，是常见的固定搭配。',
          '其余词语跟"请求"组合都不能组成有意义的词语。',
        ],
        tip: '"请求原谅/请求帮助"是表示"向别人提出某种请求"时常用的搭配。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_018',
      type: 'MCQ',
      q: '举手（　　）',
      options: ['问题', '回答', '容易', '强壮', '咬断', '原谅', '设计', '练习'],
      answer: 1,
      pinyin: 'huí dá',
      meaning: 'to answer (举手回答 = to raise one\'s hand to answer)',
      solution: {
        method: '"举手___"后面需要一个表示"举手之后要做的事"的动词。',
        steps: [
          '「回答」（huídá，to answer）+ "举手"= "举手回答"，描写学生举起手表示想回答老师的问题，是课堂上常见的情景。',
          '其余词语跟"举手"组合都不能组成有意义的词语。',
        ],
        tip: '"举手回答/举手发言"是描写课堂活动时常用的搭配。',
      },
    },
  ],
};

// =====================================================================================
// （六）看图选词 (KanTu) - 4题4分 (每题1分)
// =====================================================================================

const kanTuSet: SetQuestion = {
  id: 'p3_zh_eoy_pq_set4',
  topic: 'KanTu',
  difficulty: 'foundation',
  setLabel: 'Pei Chun EOY Paper 2 - （六）看图选词',
  passage:
    '从表中选出最适当的词语，然后把代表它的数目字填写在括号里。\n\nQ19：图中画着一个人坐在车里，箭头指着他，他正开心地挥手。\nQ20：图中画着两个小朋友，一个开心地挥手，向另一个打招呼。\nQ21：图中画着一台旧式电视机，上面有天线。\nQ22：图中画着一家人在户外的草地上铺了布，坐着吃东西，周围有树和车子。',
  wordBank: ['野餐', '山洞', '打招呼', '散步', '司机', '电视机'],
  questions: [
    {
      id: 'p3_zh_eoy_pq_019',
      type: 'MCQ',
      q: 'Q19：图中箭头指着坐在车里、正在开车的那个人，他是什么身份？',
      options: ['野餐', '山洞', '打招呼', '散步', '司机', '电视机'],
      answer: 4,
      pinyin: 'sī jī',
      meaning: 'driver',
      solution: {
        method: '图中箭头指向坐在驾驶座、手握方向盘的人，要选出能形容这个人"身份/职业"的词语。',
        steps: [
          '「司机」（sījī，driver）是指驾驶车辆的人，图中箭头特别指出"驾驶座上的这个人"，正好对应"司机"这个身份。',
          '"野餐、山洞、打招呼、散步、电视机"都跟"开车的人"这个画面无关，可以排除。',
        ],
        tip: '看图选词时，留意图中箭头或特别标示的部分，它通常是在提示"要描述的对象是谁/是什么"。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_020',
      type: 'MCQ',
      q: 'Q20：图中两个小朋友互相挥手，他们在做什么？',
      options: ['野餐', '山洞', '打招呼', '散步', '司机', '电视机'],
      answer: 2,
      pinyin: 'dǎ zhāo hu',
      meaning: 'to greet; to say hello',
      solution: {
        method: '图中两个人都举起手向对方挥动，要选出能形容这个动作的词语。',
        steps: [
          '「打招呼」（dǎ zhāohu，to greet）是指人们见面时用言语或动作（如挥手）表示问候，图中两个小朋友互相挥手正是"打招呼"的动作。',
          '"野餐、山洞、散步、司机、电视机"都不能形容"互相挥手问候"这个动作，可以排除。',
        ],
        tip: '看到图中人物互相挥手、点头、说"你好"等动作，通常对应"打招呼"这个词语。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_021',
      type: 'MCQ',
      q: 'Q21：图中是一台带有天线的旧式电器，它是什么？',
      options: ['野餐', '山洞', '打招呼', '散步', '司机', '电视机'],
      answer: 5,
      pinyin: 'diàn shì jī',
      meaning: 'television set',
      solution: {
        method: '图中物品有屏幕和天线，是一种常见的家用电器，要选出能描述这件物品的名词。',
        steps: [
          '「电视机」（diànshìjī，television set）是指用来观看节目的电器，图中带天线的方形电器正是旧式电视机的样子。',
          '"野餐、山洞、打招呼、散步、司机"都不是物品名词，无法用来描述图中的电器。',
        ],
        tip: '看图选词时，如果图中是一件具体的物品（家电、家具、交通工具等），通常对应词库中的名词。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_022',
      type: 'MCQ',
      q: 'Q22：图中一家人在户外的草地上铺了布，坐着吃东西，他们在做什么活动？',
      options: ['野餐', '山洞', '打招呼', '散步', '司机', '电视机'],
      answer: 0,
      pinyin: 'yě cān',
      meaning: 'picnic',
      solution: {
        method: '图中一家人在户外坐在布上吃东西，周围有树和车子，要选出能描述这种户外活动的词语。',
        steps: [
          '「野餐」（yěcān，picnic）是指在户外（如草地、公园）铺布坐下一起吃东西的活动，跟图中描绘的场景完全相符。',
          '"山洞、打招呼、散步、司机、电视机"都不能描述"在户外铺布吃东西"这个活动，可以排除。',
        ],
        tip: '看图选词时，如果图中出现"在户外铺布、一家人围坐吃东西、有食物篮子"等元素，通常对应"野餐"这个词语。',
      },
    },
  ],
};

// =====================================================================================
// （七）连接句子 (JuZi) - 3题6分 (每题2分)
// =====================================================================================

const lianJieInstruction = '用括号里的词语来连接以下的句子。';

const q23: SingleQuestion = {
  id: 'p3_zh_eoy_pq_023',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: lianJieInstruction,
  q: '她做完功课。\n她可以去游乐场玩。（只要……就……）',
  answer: '只要她做完功课，就可以去游乐场玩。',
  pinyin: 'zhǐ yào ... jiù ...',
  meaning: '"只要...就..." = as long as... then...',
  solution: {
    method:
      '「只要...就...」是一组固定的关联词，表示"只要满足前面的条件，后面的事就会发生"。「只要」放在第一个分句前，「就」放在第二个分句前。',
    steps: [
      '把「只要」放在第一句开头："只要她做完功课"。',
      '把「就」放在第二句开头，并去掉重复的主语"她"："就可以去游乐场玩"。',
      '合并：「只要她做完功课，就可以去游乐场玩。」',
    ],
    tip: '「只要...就...」表示一种"条件关系"：只要A发生，B就会发生，常用来描写"做到某件事就能换来某个结果"。',
  },
};

const q24: SingleQuestion = {
  id: 'p3_zh_eoy_pq_024',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: lianJieInstruction,
  q: '哥哥很聪明。\n哥哥很不听话。（虽然……但是……）',
  answer: '哥哥虽然很聪明，但是很不听话。',
  pinyin: 'suī rán ... dàn shì ...',
  meaning: '"虽然...但是..." = although... but...',
  solution: {
    method:
      '「虽然...但是...」是一组表示转折的关联词。「虽然」可以放在主语之后，「但是」放在第二个分句前，去掉重复的主语。',
    steps: [
      '找出两句的共同主语"哥哥"，合并后只保留一次。',
      '把「虽然」放在主语之后："哥哥虽然很聪明"。',
      '把「但是」放在第二句开头，并去掉重复的主语："但是很不听话"。',
      '合并：「哥哥虽然很聪明，但是很不听话。」',
    ],
    tip: '「虽然」不一定要放在句子最开头，也可以放在主语后面（如"哥哥虽然..."），意思不变。',
  },
};

const q25: SingleQuestion = {
  id: 'p3_zh_eoy_pq_025',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: lianJieInstruction,
  q: '妈妈离开。\n妹妹哭了。（……一……，……就……）',
  answer: '妈妈一离开，妹妹就哭了。',
  pinyin: 'yī ... jiù ...',
  meaning: '"一...，就..." = as soon as... then...',
  solution: {
    method:
      '「一...，就...」表示"前一个动作刚发生，后一个动作马上就跟着发生"。「一」放在第一个分句的主语之后，「就」放在第二个分句的主语之后。',
    steps: [
      '把「一」放在第一句主语之后："妈妈一离开"。',
      '把「就」放在第二句主语之后："妹妹就哭了"。',
      '合并：「妈妈一离开，妹妹就哭了。」',
    ],
    tip: '「一...，就...」强调两件事之间几乎没有时间差，常用来描写"一件事刚发生，另一件事立刻跟着发生"。',
  },
};

// =====================================================================================
// （八）扩写句子 (JuZi) - 2题4分 (每题2分)
// =====================================================================================

const kuoXieInstruction = '把括号里面的词语加在句子中适当的地方。';

const q26: SingleQuestion = {
  id: 'p3_zh_eoy_pq_026',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '小猫得救了，动物们都拍手叫好。（兴奋地）',
  answer: '小猫得救了，动物们都兴奋地拍手叫好。',
  pinyin: 'xīng fèn de',
  meaning: '"兴奋地" = excitedly',
  solution: {
    method:
      '「兴奋地」是副词，用来形容动作时的心情/状态，通常放在主语之后、动词之前。',
    steps: [
      '找出主语"动物们"和动词"拍手叫好"。',
      '把「兴奋地」放在主语和动词之间："动物们兴奋地拍手叫好"。',
      '完整句子：「小猫得救了，动物们都兴奋地拍手叫好。」',
    ],
    tip: '「兴奋地」常用来形容因为开心、激动而做出的动作，如"兴奋地叫好、兴奋地跳起来"。',
  },
};

const q27: SingleQuestion = {
  id: 'p3_zh_eoy_pq_027',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '小朋友们在空地上玩球。（干净的）',
  answer: '小朋友们在干净的空地上玩球。',
  pinyin: 'gān jìng de',
  meaning: '"干净的" = clean',
  solution: {
    method:
      '「干净的」是形容词，用来修饰名词，通常放在被修饰的名词之前。',
    steps: [
      '找出句子中要被修饰的名词"空地"。',
      '把「干净的」放在"空地"前面："干净的空地"。',
      '完整句子：「小朋友们在干净的空地上玩球。」',
    ],
    tip: '形容词扩写句子时，通常把形容词直接放在它要修饰的名词前面，"在 + 形容词 + 名词 + 上"是常见的地点描写句式。',
  },
};

// =====================================================================================
// （九）阅读理解 (YueReadOpen) - 3题6分 (每题2分)
// =====================================================================================

const yueReadOpenSet: SetQuestion = {
  id: 'p3_zh_eoy_pq_set5',
  topic: 'YueReadOpen',
  difficulty: 'stretch',
  setLabel: 'Pei Chun EOY Paper 2 - （九）阅读理解',
  passage:
    '星期天，明华在家照顾生病的妈妈。小成来找明华，叫他一起去玩电脑游戏。明华说："对不起，我要在家里照顾妈妈。"小成没办法，只好找别的小朋友一起玩电脑游戏。\n\n到了吃药的时间，明华倒了开水走到妈妈床前，轻声地对妈妈说："妈妈，该吃药了。"妈妈吃过了药，明华拿一颗糖给妈妈吃。因为明华知道妈妈吃过药，嘴巴一定很苦。\n\n过后，明华拿了一本故事书，讲了一个故事给妈妈听。看到明华那么做，妈妈很开心，病也好多了。',
  questions: [
    {
      id: 'p3_zh_eoy_pq_028',
      type: 'OpenEnded',
      q: '明华为什么留在家里？（2分）',
      answer: '明华留在家里是因为他要照顾生病的妈妈。',
      pinyin: 'zhào gù',
      meaning: 'to take care of',
      solution: {
        method: '答案在文章第一段，直接说明了明华留在家里的原因。',
        steps: [
          '第一段写道："星期天，明华在家照顾生病的妈妈。"以及明华对小成说："对不起，我要在家里照顾妈妈。"',
          '这两处都说明明华留在家里的原因是要照顾生病的妈妈。',
          '把原因写成完整的句子作答："明华留在家里是因为他要照顾生病的妈妈。"',
        ],
        tip: '"为什么...？"类问题的答案，通常可以直接在原文中找到说明原因的句子，改写成"...是因为..."的形式。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_029',
      type: 'OpenEnded',
      q: '从哪里可以看出明华很爱妈妈？（2分）',
      answer:
        '明华照顾生病的妈妈，倒开水给妈妈吃药、吃药后拿糖给妈妈吃，还讲故事给妈妈听，从这些地方可以看出他很爱妈妈。',
      pinyin: 'ài',
      meaning: '"爱" = to love; to care for',
      solution: {
        method:
          '这是2分的"从哪里可以看出..."题型，需要从文中找出多处能体现"明华爱妈妈"的具体行为，写出至少两点才能拿到满分。',
        steps: [
          '第二段：明华倒开水、轻声提醒妈妈吃药，吃药后还拿糖给妈妈吃（因为知道吃药后嘴巴会苦）。',
          '第三段：明华拿故事书，讲故事给妈妈听，让妈妈开心。',
          '把这些具体的照顾行为写出来，作为"明华很爱妈妈"的证据。',
        ],
        tip: '"从哪里可以看出...？"类题目要引用原文中具体的行为描写作为证据，不能只回答"因为他很乖"等笼统的话。',
      },
    },
    {
      id: 'p3_zh_eoy_pq_030',
      type: 'OpenEnded',
      q: '看到明华这样照顾妈妈，你认为他是一个怎样的孩子？（2分）',
      answer: '看到明华这样照顾妈妈，我认为他是一个懂事的好孩子。（参考答案，言之有理即可）',
      pinyin: 'dǒng shì',
      meaning: '"懂事" = sensible; thoughtful (for one\'s age)',
      solution: {
        method:
          '这是开放性问题，要根据明华在文中的行为（照顾生病的妈妈、放弃玩游戏、细心地倒水拿药、讲故事陪伴妈妈），给出一个合理的人物评价。',
        steps: [
          '想一想明华做了哪些事：留下照顾妈妈、提醒妈妈吃药、给妈妈糖、讲故事给妈妈听。',
          '根据这些行为，选择一个合适的形容词来评价明华，例如"懂事、孝顺、体贴、细心"等。',
          '写成完整的句子，例如：「我认为他是一个懂事的好孩子。」',
        ],
        tip: '"你认为他是一个怎样的孩子？"类问题，答案要跟文中描写的具体行为相符，常用"懂事、孝顺、体贴、细心、善良"等词语来评价。',
      },
    },
  ],
};

// =====================================================================================
// Export
// =====================================================================================

const eoyPeiQunPaper2: EoyPeiQunPaper2Question[] = [
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
  zuJuSet,
  peiDuiSet,
  kanTuSet,
  q23,
  q24,
  q25,
  q26,
  q27,
  yueReadOpenSet,
];

export default eoyPeiQunPaper2;
