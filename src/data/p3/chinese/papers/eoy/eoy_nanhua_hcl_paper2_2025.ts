// ============================================================
// School  : Nan Hua Primary School (南华小学)
// Level   : Primary 3
// Subject : Higher Chinese — Paper 2 (高级华文 试卷二：语文理解与应用)
// Total   : 32 questions (45 marks)
// Time    : 1 hour 20 minutes
// Source  : P3 Chinese EOY PDF, Pages 289–304
// ============================================================

export type Difficulty = "foundation" | "core" | "stretch";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export interface QuestionA {
  id: string;
  topic: string;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SubQuestion {
  id: string;
  type: "MCQ" | "OpenEnded";
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface QuestionSet {
  id: string;
  topic: string;
  difficulty: Difficulty;
  setLabel: string;
  passage?: string;
  wordBank?: string[];
  questions: SubQuestion[];
}

// ==========================================================
// SECTION 一: 辨字测验 (BianZi) — Q1–Q4 (4 marks)
// 从各题所提供的四个选项中，选出适当的一个
// ==========================================================

export const bianziQuestions: QuestionA[] = [
  {
    id: "p3_zh_nh_p2_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "我吃过了晚饭，____回房间做功课。",
    options: ["边", "变", "便", "遍"],
    answer: 3,
    pinyin: "biàn",
    meaning: "then / thereupon (expressing immediate action)",
    solution: {
      method: "形近字辨析：选③便。'便'在此作副词，意为'就/立刻'，'吃完饭便回房间'是常见用法。",
      steps: [
        "句意：吃完饭后立刻____回房间 → 需要表示'随即/就'的副词",
        "'便'(biàn)作副词时表示'就/立刻'，如'吃完便走'",
        "'边'是边缘，'变'是变化，'遍'是次数量词，均不符合"
      ],
      tip: "'便'作副词：事情A完成后，立刻做事情B。如：吃过饭便回房/到了便通知我。"
    }
  },
  {
    id: "p3_zh_nh_p2_002",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "只要努力，这些事____我都能做好。",
    options: ["青", "请", "情", "晴"],
    answer: 3,
    pinyin: "qíng",
    meaning: "matter / situation (情 as part of the word context)",
    solution: {
      method: "形近字辨析：选③情。句中'这些事情'是名词词组，'情'与'事'搭配成'事情'。",
      steps: [
        "分析：'这些事____' → '____'填在'事'后面构成名词",
        "'事情'(shì qíng) = things / matters，是最常见搭配",
        "'青'是颜色，'请'是邀请，'晴'是天气，均不与'事'搭配"
      ],
      tip: "固定词组：事情(shì qíng)——学习中最基础的搭配之一。"
    }
  },
  {
    id: "p3_zh_nh_p2_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "小弟弟很勇敢，跌倒了会自己____起来。",
    options: ["巴", "吧", "把", "爬"],
    answer: 4,
    pinyin: "pá qǐ lái",
    meaning: "to crawl / climb up",
    solution: {
      method: "形近字辨析：选④爬。'爬起来'意为自己从地上爬起，体现勇敢。",
      steps: [
        "句意：跌倒后自己____起来 → 需要表示从地上站起的动词",
        "'爬起来'(páqǐlái) = get up by crawling/climbing",
        "'巴''吧'是语气词，'把'是介词/动词（把住），均不能构成'____起来'"
      ],
      tip: "'爬起来'强调自力更生从地上起身，符合'勇敢'的语境。"
    }
  },
  {
    id: "p3_zh_nh_p2_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "妈妈每天都很早起床，为我们____备早餐。",
    options: ["准", "难", "谁", "推"],
    answer: 1,
    pinyin: "zhǔn bèi",
    meaning: "to prepare",
    solution: {
      method: "形近字辨析：选①准。'准备早餐'意为提前准备早餐，是固定搭配。",
      steps: [
        "句意：妈妈早起为我们____备早餐 → '____备'构成一个词",
        "'准备'(zhǔnbèi) = prepare，是最常见的动词",
        "'难备'(无此词)，'谁备''推备'均无意义"
      ],
      tip: "固定搭配：准备早餐/准备功课/准备出发。"
    }
  }
];

// ==========================================================
// SECTION 二: 词语选择 (CiYu) — Q5–Q8 (4 marks)
// 从各题所提供的四个选项中，选出适当的一个
// ==========================================================

export const ciyuQuestions: QuestionA[] = [
  {
    id: "p3_zh_nh_p2_005",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "我____奶奶的病会快点好起来。",
    options: ["希望", "相信", "庆祝", "喜欢"],
    answer: 1,
    pinyin: "xī wàng",
    meaning: "to hope / wish",
    solution: {
      method: "词义辨析：选①希望。'希望奶奶的病好起来'表达一种对未来的期待，符合'希望'的语义。",
      steps: [
        "句意：我____奶奶的病会快点好 → 表达对未来的愿望",
        "'希望'(xīwàng) = hope，用于期盼某件事发生",
        "'相信'表确信，'庆祝'是庆典，'喜欢'是喜爱，均不符合期盼病好的语境"
      ],
      tip: "辨析：希望(未来的期盼) vs 相信(对现实/他人的信任)。"
    }
  },
  {
    id: "p3_zh_nh_p2_006",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "____让家人过好日子，爸爸每天努力工作。",
    options: ["如果", "因为", "为了", "总是"],
    answer: 3,
    pinyin: "wèi le",
    meaning: "in order to / for the sake of",
    solution: {
      method: "关联词辨析：选③为了。'为了'表目的，'为了让家人过好日子'是爸爸努力工作的目的。",
      steps: [
        "分析句子结构：[____让家人过好日子] + [爸爸每天努力工作]",
        "两者关系：前半句是目的，后半句是行动",
        "'为了'引导目的状语，符合句意；'因为'引导原因，'如果'表假设，均不对"
      ],
      tip: "目的关系：为了 + 目的 + 行动。如：为了健康，我每天运动。"
    }
  },
  {
    id: "p3_zh_nh_p2_007",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "哥哥每天早上都去公园做运动，身体很____。",
    options: ["聪明", "快乐", "强壮", "美丽"],
    answer: 3,
    pinyin: "qiáng zhuàng",
    meaning: "strong / physically fit",
    solution: {
      method: "词义辨析：选③强壮。每天运动的结果是身体'强壮'，与健康/体格相关。",
      steps: [
        "句意：做运动 → 身体____",
        "运动的效果是强化体格，所以选'强壮'",
        "'聪明'是智力，'快乐'是情绪，'美丽'是外表，均与运动效果无直接关系"
      ],
      tip: "运动→身体强壮(tǐgé jiànkāng)是常见因果搭配。"
    }
  },
  {
    id: "p3_zh_nh_p2_008",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "我在路上____了林老师，就上前跟他说早安。",
    options: ["撞倒", "参观", "碰到", "发现"],
    answer: 3,
    pinyin: "pèng dào",
    meaning: "to run into / to meet by chance",
    solution: {
      method: "词义辨析：选③碰到。'碰到老师'意为偶然遇见，然后上前打招呼，逻辑通顺。",
      steps: [
        "句意：路上____林老师 → 偶然相遇",
        "'碰到'(pèngdào) = to happen to meet，偶遇的意思",
        "'撞倒'是撞跌，'参观'是参观场所，'发现'多用于发现物品/现象"
      ],
      tip: "偶遇用'碰到'：在路上/商场碰到朋友。"
    }
  }
];

// ==========================================================
// SECTION 三: 短文填空 (TianKong) — Q9–Q12 (4 marks)
// 从括号中选出适当的词语，填写在括号里
// 词语库：(1)连忙 (2)一定 (3)总是 (4)争取 (5)需要 (6)溜走
// 短文：小猪与小兔建房子，狮子追小兔
// ==========================================================

export const tiankongSet: QuestionSet = {
  id: "p3_zh_nh_p2_set_tiankong",
  topic: "TianKong",
  difficulty: "core",
  setLabel: "Nan Hua P3 Higher Chinese Paper 2 — 短文填空",
  passage:
    "小猪看见小兔在忙着建房子，就好奇地问：'你做了三个门，有什么用？一个就够了！'\n\n" +
    "小兔笑了笑，说：'谁说一个家只Q9.( )一个门就够了？多开几个门，前后左右都可以进出，多好啊！'小猪听了，摇摇头走开了。\n\n" +
    "有一天，一只狮子追着小兔想要把它吃掉，小兔Q10.( )从前门逃回家。狮子见了，就在门口等着，它想：小兔Q11.( )会从这里出来的！可是狮子等了很久，也没有见到小兔出来。原来，小兔早就从后门Q12.( )了。",
  wordBank: ["(1)连忙", "(2)一定", "(3)总是", "(4)争取", "(5)需要", "(6)溜走"],
  questions: [
    {
      id: "p3_zh_nh_p2_009",
      type: "MCQ",
      q: "Q9: 谁说一个家只____一个门就够了？",
      options: ["连忙", "一定", "总是", "争取", "需要", "溜走"],
      answer: "(5)需要",
      pinyin: "xū yào",
      meaning: "to need / to require",
      solution: {
        method: "语境填词：'只____一个门'需要填表示'需求'的动词，选(5)需要。",
        steps: [
          "分析：'只需要一个门'是反问，表示小猪认为一个门足够",
          "'需要'(xūyào) = need，用于表达需求量",
          "排除：'连忙'是动作，'一定'是副词，均不能做谓语动词于此语境"
        ],
        tip: "谁说只需要——表示否定的反问，突出'需要'作谓语。"
      }
    },
    {
      id: "p3_zh_nh_p2_010",
      type: "MCQ",
      q: "Q10: 小兔____从前门逃回家。",
      options: ["连忙", "一定", "总是", "争取", "需要", "溜走"],
      answer: "(1)连忙",
      pinyin: "lián máng",
      meaning: "hurriedly / at once",
      solution: {
        method: "语境填词：狮子追来，小兔'____从前门逃'，需要表示慌忙迅速的副词，选(1)连忙。",
        steps: [
          "语境：狮子追来，形势紧急",
          "'连忙'(liánmáng) = hurriedly，表示紧急情况下的快速行动",
          "'总是'表习惯，'一定'表确信，均不符合紧急逃跑的语境"
        ],
        tip: "紧急情况下快速行动：连忙/赶忙/急忙——三个意思相近，但连忙最强调即时反应。"
      }
    },
    {
      id: "p3_zh_nh_p2_011",
      type: "MCQ",
      q: "Q11: 狮子想：小兔____会从这里出来的！",
      options: ["连忙", "一定", "总是", "争取", "需要", "溜走"],
      answer: "(2)一定",
      pinyin: "yī dìng",
      meaning: "certainly / definitely",
      solution: {
        method: "语境填词：狮子在门口等，心想小兔'____会出来'，表示狮子确信，选(2)一定。",
        steps: [
          "狮子的心理：它'确信'小兔会从门口出来",
          "'一定'(yīdìng) = definitely/certainly，表示强烈确信",
          "'总是'表习惯，此处不是描述习惯而是对当前情况的判断"
        ],
        tip: "区分：一定(对某件事确信) vs 总是(描述经常发生的习惯)。"
      }
    },
    {
      id: "p3_zh_nh_p2_012",
      type: "MCQ",
      q: "Q12: 原来，小兔早就从后门____了。",
      options: ["连忙", "一定", "总是", "争取", "需要", "溜走"],
      answer: "(6)溜走",
      pinyin: "liū zǒu",
      meaning: "to slip away / to sneak off",
      solution: {
        method: "语境填词：小兔从后门悄悄离开，不让狮子发现，选(6)溜走。",
        steps: [
          "小兔偷偷从后门离开，不让狮子知道",
          "'溜走'(liūzǒu) = to slip away quietly/secretly",
          "'逃走'也可以，但'溜走'更强调悄悄地，与情节更契合"
        ],
        tip: "'溜走'的关键含义：悄悄地、不被发现地离开，如猫咪悄悄溜走。"
      }
    }
  ]
};

// ==========================================================
// SECTION 四: 词语搭配 (PeiDui) — Q13–Q16 (4 marks)
// 从所提供的选项中找出能和以下词语搭配组成短语的词语
// 词语库：(1)写字 (2)习惯 (3)休息 (4)意思 (5)保卫 (6)回答
// ==========================================================

export const peiduiSet: QuestionSet = {
  id: "p3_zh_nh_p2_set_peidui",
  topic: "PeiDui",
  difficulty: "core",
  setLabel: "Nan Hua P3 Higher Chinese Paper 2 — 词语搭配",
  wordBank: ["(1)写字", "(2)习惯", "(3)休息", "(4)意思", "(5)保卫", "(6)回答"],
  questions: [
    {
      id: "p3_zh_nh_p2_013",
      type: "MCQ",
      q: "改掉 ( ____ )",
      options: ["写字", "习惯", "休息", "意思", "保卫", "回答"],
      answer: "(2)习惯",
      pinyin: "gǎi diào xí guàn",
      meaning: "to change a habit",
      solution: {
        method: "搭配辨析：'改掉习惯'意为改变不良习惯，是固定表达。",
        steps: [
          "'改掉'后跟可以被改变的事物，如坏习惯",
          "'改掉习惯'(gǎi diào xí guàn) = to break/change a habit",
          "'改掉写字''改掉意思'均无意义"
        ],
        tip: "固定搭配：改掉坏习惯/改掉错误——'改掉'的宾语通常是需要纠正的行为或习惯。"
      }
    },
    {
      id: "p3_zh_nh_p2_014",
      type: "MCQ",
      q: "( ____ ) 了时间",
      options: ["写字", "习惯", "休息", "意思", "保卫", "回答"],
      answer: "(3)休息",
      pinyin: "xiū xi le shí jiān",
      meaning: "rested (for a period of time)",
      solution: {
        method: "搭配辨析：'休息了时间'意为休息了一段时间，'了时间'前接动词。",
        steps: [
          "'____了时间'结构：动词 + 了 + 时间量词",
          "'休息了时间'表示休息了一段时间",
          "'写字了时间''保卫了时间'均不自然"
        ],
        tip: "动词+'了时间'格式：休息了/睡了/等了一段时间——用于描述持续行为。"
      }
    },
    {
      id: "p3_zh_nh_p2_015",
      type: "MCQ",
      q: "练习 ( ____ )",
      options: ["写字", "习惯", "休息", "意思", "保卫", "回答"],
      answer: "(1)写字",
      pinyin: "liàn xí xiě zì",
      meaning: "to practice writing characters",
      solution: {
        method: "搭配辨析：'练习写字'是学生最常见的课业活动，固定搭配。",
        steps: [
          "'练习'后跟技能类名词或动词短语",
          "'练习写字'(liàn xí xiě zì) = practice writing",
          "'练习习惯''练习意思'均不自然"
        ],
        tip: "固定搭配：练习写字/练习说话/练习弹琴——练习+技能动词。"
      }
    },
    {
      id: "p3_zh_nh_p2_016",
      type: "MCQ",
      q: "( ____ ) 国家",
      options: ["写字", "习惯", "休息", "意思", "保卫", "回答"],
      answer: "(5)保卫",
      pinyin: "bǎo wèi guó jiā",
      meaning: "to defend the country",
      solution: {
        method: "搭配辨析：'保卫国家'是固定表达，指守护、捍卫国家。",
        steps: [
          "'____国家'需要填保护性动词",
          "'保卫国家'(bǎo wèi guó jiā) = defend the country",
          "'回答国家''休息国家'均无意义"
        ],
        tip: "固定搭配：保卫国家/保卫和平——'保卫'的对象通常是国家或集体利益。"
      }
    }
  ]
};

// ==========================================================
// SECTION 五: 仿写句子 / 扩写句子 (JuZi) — Q17–Q20 (8 marks)
// 一) 仿写句子 (Q17–Q18, 4 marks)
// 二) 扩写句子 (Q19–Q20, 4 marks)
// ==========================================================

// 一) 仿写句子
export const juziFanxieQuestions: QuestionA[] = [
  {
    id: "p3_zh_nh_p2_017",
    topic: "JuZi",
    difficulty: "core",
    instruction: "根据所提供的句式，仿写一个句子。（……或者……）\n例：妈妈一进门，电话就响了。（一……就……）→ 姐姐一看到那只大狗，就害怕得哭了。",
    q: "爷爷可以在公园里下棋或者骑脚踏车。（……或者……）\n→ 仿写一个使用\"……或者……\"的句子。",
    answer: "我们可以去参观动物园或者植物园。（样例答案，学生可自行创作）",
    pinyin: "huò zhě",
    meaning: "or / alternatively",
    solution: {
      method: "仿写句式：A或者B，表示两个可以选择的选项。结构：主语 + 可以 + 动作A + 或者 + 动作B。",
      steps: [
        "参考例句：爷爷可以在公园里下棋或者骑脚踏车。",
        "句式要素：两个并列的选择，用'或者'连接",
        "自己造句：选两个可以选择的活动/地点，套入句式"
      ],
      tip: "'或者'用于陈述句选择，'还是'用于疑问句。如：你喜欢游泳还是跑步？（疑问）vs 你可以游泳或者跑步。（陈述）"
    }
  },
  {
    id: "p3_zh_nh_p2_018",
    topic: "JuZi",
    difficulty: "core",
    instruction: "根据所提供的句式，仿写一个句子。（只要……，就……）",
    q: '只要我有空，就会去外婆家玩。（只要……，就……）\n→ 仿写一个使用"只要……就……"的句子。',
    answer: "只要我做完功课，就可以玩电脑游戏。（样例答案，学生可自行创作）",
    pinyin: "zhǐ yào...jiù",
    meaning: "as long as...then...",
    solution: {
      method: "仿写句式：只要 + 条件，+ 主语 + 就 + 结果。",
      steps: [
        "参考例句：只要我有空，就会去外婆家玩。",
        "句式：[只要 + 条件] + [主语 + 就 + 结果]",
        "自己造句：设定一个条件和对应的结果，套入句式"
      ],
      tip: "只要…就…表示充分条件：条件满足，结果一定发生。常见例：只要努力，就会成功。"
    }
  }
];

// 二) 扩写句子
export const juziKuoxieQuestions: QuestionA[] = [
  {
    id: "p3_zh_nh_p2_019",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的词语或短语扩写句子。\n例：我和爸爸走向学校。（有说有笑地）→ 我和爸爸有说有笑地走向学校。",
    q: "妈妈给我们讲了一个故事。（有趣的）",
    answer: "妈妈给我们讲了一个有趣的故事。",
    pinyin: "yǒu qù de",
    meaning: "interesting",
    solution: {
      method: "形容词定语扩写：将'有趣的'插入句子，作名词'故事'的定语。",
      steps: [
        "原句：妈妈给我们讲了一个故事。",
        "'有趣的'是形容词，修饰名词'故事'",
        "定语位置：放在'故事'前，即'一个有趣的故事'",
        "完整句：妈妈给我们讲了一个有趣的故事。"
      ],
      tip: "形容词定语：形容词+'的'+名词，放在名词前。如：一个有趣的/精彩的/感人的故事。"
    }
  },
  {
    id: "p3_zh_nh_p2_020",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的词语或短语扩写句子。\n例：我和爸爸走向学校。（有说有笑地）→ 我和爸爸有说有笑地走向学校。",
    q: "上课铃声响了，我跑回课室。（飞快地）",
    answer: "上课铃声响了，我飞快地跑回课室。",
    pinyin: "fēi kuài de",
    meaning: "very fast / at lightning speed",
    solution: {
      method: "副词扩写：将'飞快地'作方式副词，插入句子修饰动词'跑'。",
      steps: [
        "原句：上课铃声响了，我跑回课室。",
        "'飞快地'是方式副词，修饰动词'跑'",
        "位置：放在动词'跑'前，即'飞快地跑'",
        "完整句：上课铃声响了，我飞快地跑回课室。"
      ],
      tip: "方式副词（如：飞快地、慢慢地、高兴地）放在动词前，描述动作的方式。"
    }
  }
];

// ==========================================================
// SECTION 六: 组句成段 (JuZi) — Q21–Q25 (5 marks)
// 按正确的顺序将句子排列起来
// 固定首句：(1) 星期天早上，小丽在家里吃早餐。
// 答案：Q21=4, Q22=6, Q23=2, Q24=5, Q25=3
// ==========================================================

export const zujuSet: QuestionSet = {
  id: "p3_zh_nh_p2_set_zuju",
  topic: "JuZi",
  difficulty: "core",
  setLabel: "Nan Hua P3 Higher Chinese Paper 2 — 组句成段",
  passage:
    "请按正确的顺序将句子排列起来，并在括号里写上相应的序号。（5题5分）\n固定首句：(1) 星期天早上，小丽在家里吃早餐。",
  questions: [
    {
      id: "p3_zh_nh_p2_021",
      type: "OpenEnded",
      q: "Q21 ( ____ ) 接着，她把干净的盘子收好。",
      answer: "4",
      pinyin: "shōu hǎo",
      meaning: "to put away / to store properly",
      solution: {
        method: "排序分析：'接着'表示继续动作，在洗干净后(3)再把盘子收好，排第4。",
        steps: [
          "逻辑顺序：吃早餐(1)→吃完(2)→拿去洗(2→3)→洗干净抹干(3)→收好盘子(4)→抹桌子(5)→妈妈表扬(6)",
          "'接着'是顺序词，表示紧接上一步",
          "洗好→擦干→收好是合理的清理顺序，'接着收好'在洗碗(3)之后"
        ],
        tip: "排序题：'接着''然后''最后'是顺序词，帮助确定步骤先后。"
      }
    },
    {
      id: "p3_zh_nh_p2_022",
      type: "OpenEnded",
      q: "Q22 ( ____ ) 妈妈看到了，说小丽是个懂事的孩子。",
      answer: "6",
      pinyin: "dǒng shì",
      meaning: "sensible / well-behaved",
      solution: {
        method: "排序分析：妈妈的评价是对所有行为的总结，属于结尾句，排第6（最后）。",
        steps: [
          "评价/总结通常放在故事末尾",
          "'妈妈看到了'—— 看到了所有行为之后才评价",
          "结尾：说小丽是'懂事的孩子'是对全文的总结"
        ],
        tip: "排序题结尾识别：含有表扬/评价/感想的句子通常是最后一句。"
      }
    },
    {
      id: "p3_zh_nh_p2_023",
      type: "OpenEnded",
      q: "Q23 ( ____ ) 吃完后，小丽把盘子拿去洗。",
      answer: "2",
      pinyin: "ná qù xǐ",
      meaning: "to take (dishes) to wash",
      solution: {
        method: "排序分析：'吃完后'说明这是吃完早餐(1)的直接下一步，排第2。",
        steps: [
          "吃早餐(1) → 吃完(2) → ...",
          "'吃完后，把盘子拿去洗'是紧接'吃早餐'后的动作",
          "排第2是最合逻辑的位置"
        ],
        tip: "'吃完后'这类时间状语是定位排序的关键，能帮助确定该句是哪个事件之后。"
      }
    },
    {
      id: "p3_zh_nh_p2_024",
      type: "OpenEnded",
      q: "Q24 ( ____ ) 最后，小丽把饭桌抹干净。",
      answer: "5",
      pinyin: "mǒ gān jìng",
      meaning: "to wipe clean",
      solution: {
        method: "排序分析：'最后'是明确的顺序词，且抹桌子是收好盘子(4)之后的最后一个清洁动作，排第5。",
        steps: [
          "'最后'表明这是倒数第二个动作（评价句在其后）",
          "收好盘子(4) → 最后抹桌子(5) → 妈妈评价(6)",
          "'最后'明确标出了这是一系列动作的最后一步"
        ],
        tip: "顺序词'最后'表示这是一系列动作中的最后一步，排在评价句之前。"
      }
    },
    {
      id: "p3_zh_nh_p2_025",
      type: "OpenEnded",
      q: "Q25 ( ____ ) 她先把盘子洗干净，再把盘子抹干。",
      answer: "3",
      pinyin: "xiān...zài...",
      meaning: "first...then...",
      solution: {
        method: "排序分析：'先...再...'描述洗碗的具体步骤，是'拿去洗(2)'的延续，排第3。",
        steps: [
          "拿去洗(2) → 先洗干净再抹干(3) → 接着收好(4)",
          "'先...再'是具体说明上一步骤的细节",
          "洗碗过程：拿去(2)→洗净抹干(3)→收好(4)"
        ],
        tip: "'先……再……'句式描述同一任务内的两个子步骤，通常紧跟任务开始之后。"
      }
    }
  ]
};

// ==========================================================
// SECTION 七: 阅读理解一 (YueReadMCQ + YueReadOpen) — Q26–Q28 (6 marks)
// 短文："开心学习"儿童假期才艺班（广告）
// ==========================================================

export const yueReadSet1: QuestionSet = {
  id: "p3_zh_nh_p2_set_yue1",
  topic: "YueReadMCQ",
  difficulty: "core",
  setLabel: "Nan Hua P3 Higher Chinese Paper 2 — 阅读理解一",
  passage:
    "【\"开心学习\"儿童假期才艺班】\n\n" +
    "六月假期马上就要到了，为了让学生的假期过得更开心，爱心民众俱乐部将和欢乐学习中心一起举办儿童假期才艺班。\n\n" +
    "我们欢迎7至12岁的小学生来参加。\n\n" +
    "【课程表】\n" +
    "歌唱班｜6月1日—6月5日｜爱心民众俱乐部\n" +
    "剪纸班｜6月1日—6月8日｜欢乐学习中心\n" +
    "游泳班｜6月5日—6月13日｜小太阳游泳馆\n\n" +
    "想参加的学生请在5月1日到5月20日之前到爱心民众俱乐部的网站上报名。第一天报名的学生可以去民众俱乐部办公室拿一份小礼物。\n\n" +
    "电话：66661234　网站：www.aixincc.com",
  questions: [
    {
      id: "p3_zh_nh_p2_026",
      type: "MCQ",
      q: "学生如果要参加才艺班，要怎么样报名？",
      options: [
        "去欢乐学习中心报名",
        "到小太阳游泳馆报名",
        "打电话去民众俱乐部报名",
        "在民众俱乐部网站上报名"
      ],
      answer: 4,
      pinyin: "bào míng",
      meaning: "to register / to sign up",
      solution: {
        method: "细节题：原文'请在5月1日到5月20日之前到爱心民众俱乐部的网站上报名'→ 选④。",
        steps: [
          "定位：报名方式",
          "原文：'到爱心民众俱乐部的网站上报名'",
          "选④：在民众俱乐部网站上报名"
        ],
        tip: "细节题：直接在广告中找'报名'相关的句子。"
      }
    },
    {
      id: "p3_zh_nh_p2_027",
      type: "MCQ",
      q: "以下哪一句话是不对的？",
      options: [
        "只有小学生可以参加儿童假期才艺班。",
        "参加才艺班可以让学生的假期更开心。",
        "只要参加才艺班就可以拿到一份礼物。",
        "儿童假期才艺班在不一样的地方上课。"
      ],
      answer: 3,
      pinyin: "lǐ wù",
      meaning: "gift / present",
      solution: {
        method: "判断正误题：选③。原文说'第一天报名的学生'才可以拿礼物，并非所有参加者都能拿到。",
        steps: [
          "逐项验证：",
          "①正确：'欢迎7至12岁的小学生'",
          "②正确：'让学生的假期过得更开心'",
          "③错误：只有'第一天报名'的学生才有礼物，不是'参加'就有",
          "④正确：三班地点不同（俱乐部/学习中心/游泳馆）"
        ],
        tip: "判断题技巧：逐一核实每个选项，找与原文不符的细节。特别注意数量/条件词：'只要''只有''第一天'。"
      }
    },
    {
      id: "p3_zh_nh_p2_028",
      type: "OpenEnded",
      q: "Q28: 如果你是明乐，看到这则广告后，想叫文文和你一起参加游泳班。请你完成这张便条，告诉他你想参加游泳班的原因和好处。（2分）\n便条内容：\n'我看到儿童假期才艺班的广告，想和你一起参加游泳班。我想参加是因为______。如果我们在5月1日报名，就可以______。请你和我一起去报名吧！'",
      answer: "我想参加是因为我想让自己的假期更开心（/想学游泳/想强身健体）。\n如果我们在5月1日报名，就可以拿到一个小礼物。",
      pinyin: "biàn tiáo",
      meaning: "note / short written message",
      solution: {
        method: "应用写作题：从广告中找出游泳班的好处和5月1日报名的奖励，填入便条。",
        steps: [
          "原因（从广告找）：'让假期过得更开心' / 学游泳健身",
          "5月1日报名的好处：原文'第一天报名的学生可以……拿一份小礼物'",
          "完整答案：因为→让假期更开心；5月1日→拿到一份小礼物"
        ],
        tip: "应用题：答案要从广告中找，一定要使用广告里的信息（如礼物/快乐假期）。"
      }
    }
  ]
};

// ==========================================================
// SECTION 八: 阅读理解二 (YueReadOpen) — Q29–Q32 (10 marks)
// 短文：小猪去巴刹买菜，迷路，遇牛爷爷的故事
// ==========================================================

export const yueReadSet2: QuestionSet = {
  id: "p3_zh_nh_p2_set_yue2",
  topic: "YueReadOpen",
  difficulty: "stretch",
  setLabel: "Nan Hua P3 Higher Chinese Paper 2 — 阅读理解二",
  passage:
    "一天，小猪去巴刹帮妈妈买菜。在路上，小猪一会儿跑去和小兔玩，一会儿跑去捉虫子，结果在树林里迷了路。\n\n" +
    "小猪找了半天，还是找不到去巴刹的路。它急得团团转，手心开始流汗。这时，它看到牛爷爷向他走过来。小猪跑上前指着牛爷爷说：'老牛，巴刹在哪里，你知道吗？'牛爷爷听了，对小猪说：'你这个孩子怎么这样跟大人说话，我不想理你。'\n\n" +
    "小猪听了，红着脸，低下头，对牛爷爷说：'对不起，我知道错了。请问您知道去巴刹的路该怎么走吗？'牛爷爷听了，笑了笑，对小猪说：'你一直向前走，就会看到一条小河。接着，向左转，再向前走就会到巴刹了！'\n\n" +
    "小猪听了牛爷爷的话，对他说：'谢谢您！'它照着牛爷爷说的方向走，不一会儿就走到巴刹了。",
  questions: [
    {
      id: "p3_zh_nh_p2_029",
      type: "OpenEnded",
      q: "在走去巴刹的路上，小猪为什么会迷路？（2分）",
      answer: "因为小猪一会儿跑去和小兔玩，一会儿跑去捉虫子。所以小猪迷路。",
      pinyin: "mí lù",
      meaning: "to get lost",
      solution: {
        method: "原因题：从短文第一段找到小猪迷路的直接原因。",
        steps: [
          "定位：第一段'在路上，小猪一会儿……一会儿……结果在树林里迷了路'",
          "原因：一会儿跑去和小兔玩，一会儿跑去捉虫子（分心走错路）",
          "答句：因为小猪一会儿……，一会儿……，所以迷路了。"
        ],
        tip: "原因题：用'因为……所以……'作答，原因从故事第一段找。"
      }
    },
    {
      id: "p3_zh_nh_p2_030",
      type: "OpenEnded",
      q: "从哪里可以看出小猪很着急？（2分）",
      answer: "从小猪在树林里迷了路。它找了半天，还是找不到去巴刹的路，小猪急得团团转，手心开始流汗。我可以看出小猪很着急。",
      pinyin: "zháo jí",
      meaning: "anxious / worried",
      solution: {
        method: "细节题：找出文中描写小猪着急状态的语句。",
        steps: [
          "定位：'它急得团团转，手心开始流汗'",
          "这两个细节（团团转/手心流汗）生动描写了着急的状态",
          "答句：从'急得团团转，手心开始流汗'可以看出小猪很着急。"
        ],
        tip: "描述人物情绪的细节：动作描写（团团转）+ 生理反应（流汗）=着急的表现。"
      }
    },
    {
      id: "p3_zh_nh_p2_031",
      type: "OpenEnded",
      q: "小猪是怎么找到去巴刹的路的？（3分）",
      answer: "小猪先问牛爷爷去巴刹的路，接着，牛爷爷叫小猪一直向前走，就会看到一条小河。接着，向左转，再向前走就会到巴刹了。小猪照着牛爷爷方向走，它才能找到巴刹的路的。",
      pinyin: "zhǎo dào lù",
      meaning: "to find the way",
      solution: {
        method: "经过题：梳理小猪找路的过程，包括向牛爷爷礼貌道歉后获得指引。",
        steps: [
          "步骤1：小猪先向牛爷爷道歉，礼貌地问路",
          "步骤2：牛爷爷给出指引——一直向前→看到小河→向左转→再向前",
          "步骤3：小猪按照指引走，找到了巴刹",
          "答句按顺序描述这三个步骤"
        ],
        tip: "经过题：按时间顺序列出事件的步骤，用'先…接着…最后'连接。"
      }
    },
    {
      id: "p3_zh_nh_p2_032",
      type: "OpenEnded",
      q: "你认为小猪是一只怎样的动物？你从哪里可以看出？（3分）",
      answer: "我认为小猪是一只知错能改的动物。我从小猪听了牛爷爷的话，它知道自己做错了，就有礼貌地再向牛爷爷问了一次路可以看出它是一只知错能改的动物。",
      pinyin: "zhī cuò néng gǎi",
      meaning: "able to recognize and correct one's mistakes",
      solution: {
        method: "评价题：根据小猪在故事中的行为变化，评价它的品格。",
        steps: [
          "小猪开始：无礼地叫牛爷爷'老牛'",
          "转变：听了牛爷爷的批评后，红着脸低下头道歉",
          "结论：知错能改——这是小猪的品格",
          "答句：我认为小猪是……的动物。从……可以看出。"
        ],
        tip: "评价题格式：我认为 + [品格形容词] + 从 + [文中证据] + 可以看出。"
      }
    }
  ]
};

// ==========================================================
// EXPORT — All questions grouped
// ==========================================================

export const nanHuaHCLPaper2 = {
  meta: {
    school: "Nan Hua Primary School (南华小学)",
    level: "Primary 3",
    subject: "Higher Chinese Paper 2 (高级华文 试卷二：语文理解与应用)",
    totalMarks: 45,
    timeAllowed: "1 hour 20 minutes",
    source: "P3 Chinese EOY PDF pp.289–304"
  },
  sections: {
    bianzi: bianziQuestions,          // Q1–Q4   (4 marks)
    ciyu: ciyuQuestions,              // Q5–Q8   (4 marks)
    tiankong: tiankongSet,            // Q9–Q12  (4 marks)
    peidui: peiduiSet,                // Q13–Q16 (4 marks)
    juziFanxie: juziFanxieQuestions,  // Q17–Q18 (4 marks)
    juziKuoxie: juziKuoxieQuestions,  // Q19–Q20 (4 marks)
    zuju: zujuSet,                    // Q21–Q25 (5 marks)
    yueRead1: yueReadSet1,            // Q26–Q28 (6 marks)
    yueRead2: yueReadSet2             // Q29–Q32 (10 marks)
  }
};

export default nanHuaHCLPaper2;
