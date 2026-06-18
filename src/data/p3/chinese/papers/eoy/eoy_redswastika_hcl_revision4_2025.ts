// ============================================================
// School  : Red Swastika School (卍慈学校)
// Level   : Primary 3
// Subject : Higher Chinese (高级华文)
// Paper   : Revision 4 (复习四) — 第一课至第十五课
// Total   : 34 questions (45 marks)
// Source  : P3 Chinese EOY PDF, Pages 279–287
// ============================================================

export type Difficulty = "foundation" | "core" | "stretch";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

// ── Type A: Single question ────────────────────────────────
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

// ── Type B: Set / passage question ────────────────────────
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
// SECTION 一: 辨字测验 (BianZi) — Q1–Q5 (5 marks)
// 从所提供的选择中选出正确的字
// ==========================================================

export const bianziQuestions: QuestionA[] = [
  {
    id: "p3_zh_rs_rev4_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的字，然后把代表它的数目字填写在括号里。",
    q: "我要用心学习，努力____现愿望。",
    options: ["宝", "完", "实", "安"],
    answer: 3,
    pinyin: "shí xiàn",
    meaning: "to realize / to achieve (a wish)",
    solution: {
      method: "形近字辨析：选③实。'实现'意为达到愿望。'宝'指宝贝，'完'指完成，'安'指平安，均不合语境。",
      steps: [
        "理解句意：努力__现愿望 → 需要填一个与'现'搭配的字",
        "逐项排除：'宝现''完现''安现'均无意义",
        "确认：'实现'是固定词组，意为使愿望成真"
      ],
      tip: "记住常见搭配：实现愿望/梦想/目标。"
    }
  },
  {
    id: "p3_zh_rs_rev4_002",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的字，然后把代表它的数目字填写在括号里。",
    q: "妹妹生病了，妈妈____在家里陪她。",
    options: ["画", "留", "由", "苗"],
    answer: 2,
    pinyin: "liú",
    meaning: "to stay / to remain",
    solution: {
      method: "形近字辨析：选②留。'留在家里'意为留下来陪伴。'画''由''苗'在此均不符合语境。",
      steps: [
        "句意：妈妈____在家里陪生病的妹妹",
        "需要填一个表示'停留'的动词",
        "'留'有'留下来、停留'之意，符合语境"
      ],
      tip: "'留'与'画''由''苗'字形相似，注意笔画区别。"
    }
  },
  {
    id: "p3_zh_rs_rev4_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的字，然后把代表它的数目字填写在括号里。",
    q: "弟弟身上____的书包又大又重。",
    options: ["杯", "备", "被", "背"],
    answer: 4,
    pinyin: "bēi",
    meaning: "to carry on the back",
    solution: {
      method: "形近字辨析：选④背。'背书包'指把书包背在背上。注意声旁区别。",
      steps: [
        "句意：弟弟身上____的书包 → 书包怎么带？",
        "'背'(bēi)指用背部承担重物，'背书包'是正确搭配",
        "'杯'是杯子，'备'是准备，'被'是被子，均不符合"
      ],
      tip: "'背'多音字：bèi(背面/背诵) / bēi(背负/背包)，此处读bēi。"
    }
  },
  {
    id: "p3_zh_rs_rev4_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的字，然后把代表它的数目字填写在括号里。",
    q: "林太太每次都会带环保____去买东西。",
    options: ["袋", "代", "带", "装"],
    answer: 1,
    pinyin: "dài",
    meaning: "bag / sack",
    solution: {
      method: "形近字辨析：选①袋。'环保袋'指环保购物袋。'代'是代替，'带'是携带，'装'是装扮，均不符合。",
      steps: [
        "句意：带环保____去买东西 → 要填名词",
        "'袋'是名词，指袋子/包，与'环保'搭配成'环保袋'",
        "'代''带''装'为动词，不能跟'环保'直接搭配成名词"
      ],
      tip: "区分：袋(名词，袋子)、带(动词，携带)、代(动词，代替)。"
    }
  },
  {
    id: "p3_zh_rs_rev4_005",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的字，然后把代表它的数目字填写在括号里。",
    q: "老师要每个小____拿一张地图和活动说明。",
    options: ["助", "住", "组", "竹"],
    answer: 3,
    pinyin: "zǔ",
    meaning: "group",
    solution: {
      method: "形近字辨析：选③组。'小组'指团队/分组，老师让每个小组拿材料。",
      steps: [
        "句意：每个小____拿一张地图 → 指教室里的分组单位",
        "'小组'是课堂常用词，指学生分组",
        "'助''住''竹'均无法与'小'搭配成有意义的名词"
      ],
      tip: "记住：小组(xiǎo zǔ) — 课堂/活动中的小队单位。"
    }
  }
];

// ==========================================================
// SECTION 二: 词语选择 (CiYu) — Q6–Q9 (4 marks)
// 从所提供的选择中选出正确的词语
// ==========================================================

export const ciyuQuestions: QuestionA[] = [
  {
    id: "p3_zh_rs_rev4_006",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "听到哭声，妈妈____一看，才发现弟弟跌倒了。",
    options: ["着急", "决定", "跟着", "转身"],
    answer: 4,
    pinyin: "zhuǎn shēn",
    meaning: "to turn around",
    solution: {
      method: "词义辨析：选④转身。听到哭声后'转身一看'是符合逻辑的动作顺序。",
      steps: [
        "句意：听到哭声 → 妈妈做了什么动作 → 才发现弟弟跌倒",
        "'转身'指转过身体来看，动作符合情境",
        "'着急'是情绪，'决定'是决策，'跟着'是跟随，均不符合'____一看'的语法结构"
      ],
      tip: "注意'____一看'的句式，需要填一个可以与'一看'连用的动词词语。"
    }
  },
  {
    id: "p3_zh_rs_rev4_007",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "你不是故意害我跌倒的，____我不会怪你。",
    options: ["但是", "所以", "虽然", "就是"],
    answer: 2,
    pinyin: "suǒ yǐ",
    meaning: "therefore / so",
    solution: {
      method: "关联词辨析：选②所以。前半句'你不是故意的'是原因，后半句'我不会怪你'是结果，用'所以'连接因果。",
      steps: [
        "分析句子关系：[你不是故意的] → [我不会怪你] = 因果关系",
        "'所以'用于表示结果，符合逻辑",
        "'但是'表转折，'虽然'要与'但是'搭配，'就是'表强调，均不适合"
      ],
      tip: "因果关系常用：因为…所以… / 由于… 所以…"
    }
  },
  {
    id: "p3_zh_rs_rev4_008",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "小华长大后想当军人，好好____国家。",
    options: ["照顾", "关心", "保卫", "爱护"],
    answer: 3,
    pinyin: "bǎo wèi",
    meaning: "to defend / to protect (a country)",
    solution: {
      method: "词义辨析：选③保卫。'保卫国家'是当军人的职责，最为贴切。",
      steps: [
        "分析：当军人的职责是____国家",
        "'保卫'专指守护、捍卫国家/领土，与军人职责完全吻合",
        "'照顾'是照料，'关心'是关怀，'爱护'是爱惜，均不及'保卫'正式"
      ],
      tip: "固定搭配：保卫国家/保卫和平。"
    }
  },
  {
    id: "p3_zh_rs_rev4_009",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "表姐和几个朋友一起去____美术馆。",
    options: ["发现", "参观", "破坏", "游戏·搬动"],
    answer: 2,
    pinyin: "cān guān",
    meaning: "to visit (a place) / to tour",
    solution: {
      method: "词义辨析：选②参观。'参观美术馆'是固定搭配，指有目的地前往观看。",
      steps: [
        "分析：去美术馆做什么动作？",
        "'参观'指专程去观看某处，常用于博物馆、美术馆、工厂等",
        "'发现'是发现新事物，'破坏'是损坏，均与语境相悖"
      ],
      tip: "参观(cān guān)的宾语通常是场所：参观博物馆/工厂/展览。"
    }
  }
];

// ==========================================================
// SECTION 三: 看图选词 (KanTu) — Q10–Q13 (4 marks)
// 根据图意选出正确的词语
// ==========================================================

export const kantuQuestions: QuestionA[] = [
  {
    id: "p3_zh_rs_rev4_010",
    topic: "KanTu",
    difficulty: "foundation",
    instruction: "根据图意选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "图中显示一个蓝色回收用途的箱子（有回收标志）。",
    options: ["小纸箱", "回收箱", "垃圾桶", "日用品"],
    answer: 2,
    pinyin: "huí shōu xiāng",
    meaning: "recycling bin",
    solution: {
      method: "观察图中物品特征：箱子上有回收标志，因此是'回收箱'。",
      steps: [
        "观察图：箱子形状，带有回收符号",
        "'回收箱'专门用于收集可回收物品",
        "'垃圾桶'是丢普通垃圾用的，'小纸箱'只是纸质箱子"
      ],
      tip: "认识常见环保词汇：回收箱(huí shōu xiāng)、垃圾桶(lā jī tǒng)。"
    }
  },
  {
    id: "p3_zh_rs_rev4_011",
    topic: "KanTu",
    difficulty: "foundation",
    instruction: "根据图意选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "图中显示一个人用绳子牵着狗，做出拉的动作。",
    options: ["拉", "推", "打", "扔"],
    answer: 1,
    pinyin: "lā",
    meaning: "to pull",
    solution: {
      method: "观察图中人物动作：用绳子向自己方向施力，是'拉'的动作。",
      steps: [
        "观察：人拉着绳子，方向是向自己",
        "'拉'(lā) = pull，力的方向朝向自身",
        "'推'(tuī) = push，力的方向向外；此图方向不符"
      ],
      tip: "区分：拉(向自己)vs推(向外)，两者方向相反。"
    }
  },
  {
    id: "p3_zh_rs_rev4_012",
    topic: "KanTu",
    difficulty: "foundation",
    instruction: "根据图意选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "图中显示一个人蹲下来用手在画什么，地上有画笔和颜料。",
    options: ["运动", "折纸", "画画", "拍照"],
    answer: 3,
    pinyin: "huà huà",
    meaning: "to draw / to paint",
    solution: {
      method: "观察图中活动：人在使用画笔作画，动作是'画画'。",
      steps: [
        "图中关键词：画笔、颜料、蹲下来在纸上作图",
        "'画画'(huà huà) = 使用画笔/颜料创作图画",
        "'折纸'是折纸艺术，'拍照'需要相机"
      ],
      tip: "区分：画画(用笔画) vs 折纸(用纸折) vs 拍照(用相机)。"
    }
  },
  {
    id: "p3_zh_rs_rev4_013",
    topic: "KanTu",
    difficulty: "foundation",
    instruction: "根据图意选出正确的词语，然后把代表它的数目字填写在括号里。",
    q: "图中显示一只猫，箭头指向猫的尾巴部位。",
    options: ["眼睛", "鼻子", "耳朵", "尾巴"],
    answer: 4,
    pinyin: "wěi ba",
    meaning: "tail",
    solution: {
      method: "观察箭头所指位置：指向猫身体末端，即'尾巴'。",
      steps: [
        "观察图：猫的身体各部位",
        "箭头指向猫的身体末端细长处",
        "这是'尾巴'(wěi ba)，即tail"
      ],
      tip: "猫的身体部位：眼睛(yǎn jīng)、鼻子(bí zi)、耳朵(ěr duo)、尾巴(wěi ba)。"
    }
  }
];

// ==========================================================
// SECTION 四: 词语搭配 (PeiDui) — Q14–Q18 (5 marks)
// 从词语中选出可以搭配的词，每个词语只能用一次
// Word Bank: 1.准备 2.离开 3.伸出 4.发出 5.多元 6.强壮 7.小路 8.举手
// ==========================================================

export const peiduiSet: QuestionSet = {
  id: "p3_zh_rs_rev4_set_peidui",
  topic: "PeiDui",
  difficulty: "core",
  setLabel: "Red Swastika Revision 4 — 词语搭配",
  wordBank: ["1.准备", "2.离开", "3.伸出", "4.发出", "5.多元", "6.强壮", "7.小路", "8.举手"],
  questions: [
    {
      id: "p3_zh_rs_rev4_014",
      type: "MCQ",
      q: "( ____ ) 双手",
      options: ["准备", "离开", "伸出", "发出", "多元", "强壮", "小路", "举手"],
      answer: "3.伸出",
      pinyin: "shēn chū",
      meaning: "to stretch out (hands)",
      solution: {
        method: "搭配辨析：'伸出双手'是固定表达，意为伸展双手。",
        steps: [
          "动词+双手：能搭配'双手'的动词有'伸出''举起''拍'等",
          "'伸出双手'最为自然，也是常见表达"
        ],
        tip: "固定搭配：伸出双手(帮助别人)。"
      }
    },
    {
      id: "p3_zh_rs_rev4_015",
      type: "MCQ",
      q: "( ____ ) 种族",
      options: ["准备", "离开", "伸出", "发出", "多元", "强壮", "小路", "举手"],
      answer: "5.多元",
      pinyin: "duō yuán",
      meaning: "multi-racial / diverse",
      solution: {
        method: "搭配辨析：'多元种族'指多民族社会，是新加坡常用词汇。",
        steps: [
          "形容词+种族：能修饰'种族'的形容词",
          "'多元种族'(multi-racial)是新加坡社会用语，指不同种族共存"
        ],
        tip: "新加坡常用语：多元种族社会(multi-racial society)、多元文化。"
      }
    },
    {
      id: "p3_zh_rs_rev4_016",
      type: "MCQ",
      q: "( ____ ) 食物",
      options: ["准备", "离开", "伸出", "发出", "多元", "强壮", "小路", "举手"],
      answer: "1.准备",
      pinyin: "zhǔn bèi",
      meaning: "to prepare (food)",
      solution: {
        method: "搭配辨析：'准备食物'意为预备食物，是最常见的搭配。",
        steps: [
          "动词+食物：'准备食物''发出食物'均可能",
          "'准备食物'(prepare food)更自然，日常生活中最常用"
        ],
        tip: "区分：准备食物(prepare) vs 发出食物(distribute，用于分发的场合)。"
      }
    },
    {
      id: "p3_zh_rs_rev4_017",
      type: "MCQ",
      q: "身体 ( ____ )",
      options: ["准备", "离开", "伸出", "发出", "多元", "强壮", "小路", "举手"],
      answer: "6.强壮",
      pinyin: "qiáng zhuàng",
      meaning: "strong / sturdy (body)",
      solution: {
        method: "搭配辨析：'身体强壮'描述体格健壮，是固定表达。",
        steps: [
          "身体+形容词：描述体格的形容词",
          "'强壮'专门形容体格健壮，与'身体'搭配最佳"
        ],
        tip: "近义词辨析：强壮(qiáng zhuàng，体格)vs健康(jiàn kāng，健康状态)。"
      }
    },
    {
      id: "p3_zh_rs_rev4_018",
      type: "MCQ",
      q: "沿着 ( ____ )",
      options: ["准备", "离开", "伸出", "发出", "多元", "强壮", "小路", "举手"],
      answer: "7.小路",
      pinyin: "xiǎo lù",
      meaning: "small path / lane",
      solution: {
        method: "搭配辨析：'沿着小路'意为沿着小径走，是常见的地点描写表达。",
        steps: [
          "'沿着'后面跟路/河/墙等地方名词",
          "'沿着小路'(along the small path)是正确搭配"
        ],
        tip: "介词'沿着'后跟线性地点：沿着小路/河边/走廊。"
      }
    }
  ]
};

// ==========================================================
// SECTION 五: 仿写句子 / 扩写句子 (JuZi) — Q19–Q23 (10 marks)
// ==========================================================

export const juziFanxie: QuestionA[] = [
  {
    id: "p3_zh_rs_rev4_019",
    topic: "JuZi",
    difficulty: "core",
    instruction: "根据所提供的例子和帮助词语，仿写句子。（……或者……）",
    q: "例句1：我和妈妈可以去打球。\n例句2：我和妈妈可以去游泳。\n→ 用\"……或者……\"将两句合并仿写。",
    answer: "我和妈妈可以去打球或者游泳。",
    pinyin: "huò zhě",
    meaning: "or / alternatively",
    solution: {
      method: "并列选择句式：A或者B，表示两种可能性均可接受。",
      steps: [
        "找出两个选择：打球 / 游泳",
        "用'或者'连接：可以去打球或者游泳",
        "完整句：我和妈妈可以去打球或者游泳。"
      ],
      tip: "区分：或者(选择，可以任选一个) vs 还是(疑问句中的选择)。"
    }
  },
  {
    id: "p3_zh_rs_rev4_020",
    topic: "JuZi",
    difficulty: "core",
    instruction: "根据所提供的例子和帮助词语，仿写句子。（……连……都/也……）",
    q: '例句1：爸爸工作太忙了。\n例句2：爸爸睡觉的时间都没有。\n→ 用"……连……都……"将两句合并仿写。',
    answer: "爸爸工作太忙了，连睡觉的时间都没有。",
    pinyin: "lián...dōu",
    meaning: "even...also (emphatic)",
    solution: {
      method: "'连……都……'句式强调程度极深，表示连最基本的事情都无法做到。",
      steps: [
        "确定被强调的内容：睡觉的时间",
        "套入句式：连 + [睡觉的时间] + 都 + [没有]",
        "完整句：爸爸工作太忙了，连睡觉的时间都没有。"
      ],
      tip: "句式：主语 + 太……了，连 + [最基本的事] + 都 + [没有/不能]。"
    }
  },
  {
    id: "p3_zh_rs_rev4_021",
    topic: "JuZi",
    difficulty: "core",
    instruction: "根据所提供的例子和帮助词语，仿写句子。（只要……就……）",
    q: '例句1：你好好向妈妈认错。\n例句2：妈妈不会再生你的气了。\n→ 用"只要……就……"将两句合并仿写。',
    answer: "只要你好好向妈妈认错，她就不会再生你的气了。",
    pinyin: "zhǐ yào...jiù",
    meaning: "as long as...then...",
    solution: {
      method: "'只要……就……'表示条件关系：满足前提条件，必然得到结果。",
      steps: [
        "找条件：你好好向妈妈认错",
        "找结果：妈妈不会再生气",
        "套入句式：只要 + [条件], + [主语] + 就 + [结果]",
        "完整句：只要你好好向妈妈认错，她就不会再生你的气了。"
      ],
      tip: "句式：只要 + 条件，+ 主语 + 就 + 结果。与'如果'不同，'只要'强调充分条件。"
    }
  }
];

export const juziKuoxie: QuestionA[] = [
  {
    id: "p3_zh_rs_rev4_022",
    topic: "JuZi",
    difficulty: "core",
    instruction: "请利用括号里的词语扩写句子。",
    q: "哥哥在房间里玩电子游戏。（偷偷地）",
    answer: "哥哥偷偷地在房间里玩电子游戏。",
    pinyin: "tōu tōu de",
    meaning: "secretly / stealthily",
    solution: {
      method: "副词扩写：将'偷偷地'作为方式副词，插入句子修饰动词。",
      steps: [
        "原句：哥哥在房间里玩电子游戏。",
        "'偷偷地'是方式副词，修饰动词'玩'",
        "位置：放在动词前，即'偷偷地玩'",
        "完整句：哥哥偷偷地在房间里玩电子游戏。"
      ],
      tip: "方式副词（如：偷偷地、飞快地、高兴地）通常放在动词之前。"
    }
  },
  {
    id: "p3_zh_rs_rev4_023",
    topic: "JuZi",
    difficulty: "core",
    instruction: "请利用括号里的词语扩写句子。",
    q: "我抱起了兔子，摸着它的毛发。（软软的）",
    answer: "我抱起了兔子，摸着它软软的毛发。",
    pinyin: "ruǎn ruǎn de",
    meaning: "soft and fluffy",
    solution: {
      method: "形容词扩写：将'软软的'作为形容词定语，修饰名词'毛发'。",
      steps: [
        "原句：我抱起了兔子，摸着它的毛发。",
        "'软软的'是形容词，用来描述毛发的质感",
        "位置：放在名词'毛发'前作定语",
        "完整句：我抱起了兔子，摸着它软软的毛发。"
      ],
      tip: "形容词定语（如：软软的、大大的、甜甜的）放在名词前，常见AABB叠词形式。"
    }
  }
];

// ==========================================================
// SECTION 六: 组句成段 (JuZi) — Q24–Q28 (5 marks)
// 请按先后顺序把下面的句子排一排
// 故事：王阿姨跌倒，两位男生帮忙
// 固定首句：(1) 一天早上，王阿姨到巴刹买菜。
// 答案：Q24=5, Q25=3, Q26=6, Q27=2, Q28=4
// ==========================================================

export const zujuSet: QuestionSet = {
  id: "p3_zh_rs_rev4_set_zuju",
  topic: "JuZi",
  difficulty: "core",
  setLabel: "Red Swastika Revision 4 — 组句成段",
  passage: "请按先后顺序把下面的句子排一排，并在括号里写上相应的序号。（5题5分）\n固定首句：(1) 一天早上，王阿姨到巴刹买菜。",
  questions: [
    {
      id: "p3_zh_rs_rev4_024",
      type: "OpenEnded",
      q: "Q24 ( ____ ) 他们把王阿姨扶起来，还帮她把东西捡起来。",
      answer: "5",
      pinyin: "fú qǐ lái",
      meaning: "to help someone up",
      solution: {
        method: "排序分析：扶起阿姨是在发现她跌倒、有人路过之后，属于帮助动作，排第5。",
        steps: [
          "逻辑顺序：买菜→跌倒→东西散落→男生路过→扶起来→表扬",
          "'他们把王阿姨扶起来'发生在男生看到跌倒之后",
          "前一步是男生上前帮忙(4)，这一步是实际扶起(5)"
        ],
        tip: "排序题注意：时间顺序 + 因果逻辑，先确定首尾，再填中间。"
      }
    },
    {
      id: "p3_zh_rs_rev4_025",
      type: "OpenEnded",
      q: "Q25 ( ____ ) 她的东西从篮子里掉了出来。",
      answer: "3",
      pinyin: "diào chū lái",
      meaning: "to fall out of (a basket)",
      solution: {
        method: "排序分析：东西从篮子掉出来，是跌倒(2)的直接结果，排第3。",
        steps: [
          "跌倒(2) → 东西掉落(3) → 男生看到(4) → 扶起(5)",
          "掉东西是跌倒后立刻发生的事"
        ],
        tip: "注意事件的因果连锁：跌倒→物品散落→路人发现→帮助。"
      }
    },
    {
      id: "p3_zh_rs_rev4_026",
      type: "OpenEnded",
      q: "Q26 ( ____ ) 这两位男生的行为真值得我们学习。",
      answer: "6",
      pinyin: "zhí dé xué xí",
      meaning: "worthy of learning from",
      solution: {
        method: "排序分析：总结评价句，是整个故事的结尾，排第6（最后）。",
        steps: [
          "评价/总结句通常放在故事末尾",
          "'真值得我们学习'是对男生行为的整体评价",
          "所有事件发生完毕后才能作出评价"
        ],
        tip: "排序题中，评价/感想句通常是最后一句（结尾句）。"
      }
    },
    {
      id: "p3_zh_rs_rev4_027",
      type: "OpenEnded",
      q: "Q27 ( ____ ) 她经过游乐场时，不小心跌倒了。",
      answer: "2",
      pinyin: "jīng guò...diē dǎo",
      meaning: "passed by...and fell",
      solution: {
        method: "排序分析：阿姨去买菜的路上经过游乐场跌倒，是故事第二步，排第2。",
        steps: [
          "买菜(1) → 路上跌倒(2) → 东西掉落(3)",
          "跌倒是整个故事的起始事件（冲突点）"
        ],
        tip: "排序时先找'起因'：谁、在哪里、发生了什么事，这通常是第2步。"
      }
    },
    {
      id: "p3_zh_rs_rev4_028",
      type: "OpenEnded",
      q: "Q28 ( ____ ) 两位男生刚好路过，看到了，便立刻上前帮忙。",
      answer: "4",
      pinyin: "lì kè shàng qián",
      meaning: "immediately stepped forward to help",
      solution: {
        method: "排序分析：看到阿姨跌倒(东西散落后)，男生立刻上前，排第4。",
        steps: [
          "东西掉落(3) → 男生路过看到(4) → 男生扶起阿姨(5)",
          "'刚好路过'说明这是偶然发现，在跌倒之后"
        ],
        tip: "'立刻'暗示这是发现问题后的即时反应，接在'跌倒/东西散落'之后。"
      }
    }
  ]
};

// ==========================================================
// SECTION 七: 阅读理解一 (YueReadMCQ) — Q29–Q31 (6 marks)
// 短文：老公公与十根筷子的故事（团结合作）
// ==========================================================

export const yueReadSet1: QuestionSet = {
  id: "p3_zh_rs_rev4_set_yue1",
  topic: "YueReadMCQ",
  difficulty: "core",
  setLabel: "Red Swastika Revision 4 — 阅读理解一",
  passage:
    "很久以前，有一个老公公，他有十个儿子。这十个儿子天天都吵架，什么事都做不好，让老公公非常伤心。\n\n" +
    "有一天，老公公把十个儿子叫到面前。他先拿出十根筷子，分给他们每人一根，然后叫他们把筷子折断。儿子们轻轻一折，就把手中的筷子折断了。\n\n" +
    "老公公接着又拿出十根筷子，再叫他们把十根筷子一起折断。他们每个人都试了一次，谁也折不断那十根筷子。老公公说：'你们就像这些筷子，只要懂得合作，就能把事情做好。'",
  questions: [
    {
      id: "p3_zh_rs_rev4_029",
      type: "MCQ",
      q: "老公公为了什么事伤心？",
      options: [
        "他的儿子们不做工。",
        "他的儿子们整天吵架。",
        "他的儿子们天天出去玩。",
        "他的儿子们把筷子折断了。"
      ],
      answer: 2,
      pinyin: "chǎo jià",
      meaning: "to quarrel / to argue",
      solution: {
        method: "细节题：直接从短文第一段找答案。'这十个儿子天天都吵架，什么事都做不好，让老公公非常伤心。'",
        steps: [
          "定位关键信息：'让老公公非常伤心'的原因",
          "原文：'天天都吵架' → 选②"
        ],
        tip: "细节题：直接在原文找出表示原因的句子。"
      }
    },
    {
      id: "p3_zh_rs_rev4_030",
      type: "MCQ",
      q: "老公公第一次把十根筷子拿给儿子时，发生了什么事？",
      options: [
        "儿子们没有把筷子折断。",
        "儿子们很快就把筷子分开。",
        "儿子们把十根筷子放在一起。",
        "儿子们一下子就把筷子折断了。"
      ],
      answer: 4,
      pinyin: "zhé duàn",
      meaning: "to break / to snap",
      solution: {
        method: "细节题：第二段'儿子们轻轻一折，就把手中的筷子折断了'→ 选④。",
        steps: [
          "第一次：每人拿一根筷子",
          "'轻轻一折，就把筷子折断了' → 很容易折断",
          "选④：儿子们一下子就把筷子折断了"
        ],
        tip: "注意区分第一次(一人一根)和第二次(十根一起)的不同结果。"
      }
    },
    {
      id: "p3_zh_rs_rev4_031",
      type: "MCQ",
      q: "这件事让我们明白了什么道理？",
      options: [
        "孩子们应该学折筷子。",
        "孩子们应该学习合作。",
        "孩子们应该听父母的话。",
        "孩子们应该把事情做好。"
      ],
      answer: 2,
      pinyin: "hé zuò",
      meaning: "cooperation / to cooperate",
      solution: {
        method: "主旨题：老公公的话'只要懂得合作，就能把事情做好'→ 选②学习合作。",
        steps: [
          "找老公公说的道理：'只要懂得合作，就能把事情做好'",
          "核心是'合作'，选②孩子们应该学习合作"
        ],
        tip: "主旨题找结尾的道理/警示句，通常是老人/长者说的话。"
      }
    }
  ]
};

// ==========================================================
// SECTION 八: 阅读理解二 (YueReadOpen) — Q32–Q34 (6 marks)
// 短文：猫向母鸡学下蛋的故事
// ==========================================================

export const yueReadSet2: QuestionSet = {
  id: "p3_zh_rs_rev4_set_yue2",
  topic: "YueReadOpen",
  difficulty: "stretch",
  setLabel: "Red Swastika Revision 4 — 阅读理解二",
  passage:
    "猫和母鸡生活在同一个地方。\n\n" +
    "猫看见母鸡每天都能下一个蛋，心里想：要是我也能每天下一个蛋，主人一定会更喜欢我的！\n\n" +
    "于是，猫对母鸡说：'请教我怎样下蛋吧！'\n\n" +
    "母鸡说：'下蛋是我们的事，你是学不会的。你还是去捉老鼠吧！'猫听了母鸡的话，很不高兴，认为母鸡不想教它，就生气地离开了。\n\n" +
    "一天，猫看见母鸡在吃沙子，心想：原来要这样做才能下蛋！于是，它吃了几口沙子，然后回家，学着母鸡的样子准备下蛋。可是，半天过去了，它还是没有下蛋。\n\n" +
    "猫很伤心。它终于明白了自己只能捉老鼠，下蛋的事还是让母鸡去做吧！",
  questions: [
    {
      id: "p3_zh_rs_rev4_032",
      type: "OpenEnded",
      q: "猫为什么要学下蛋？（2分）",
      answer: "猫要学下蛋，因为如果它能每天下一个蛋，主人一定会更喜欢它。",
      pinyin: "xià dàn",
      meaning: "to lay eggs",
      solution: {
        method: "原因题：在短文中找猫想学下蛋的动机。",
        steps: [
          "定位：'猫看见母鸡每天都能下一个蛋，心里想'",
          "原因：'要是我也能每天下一个蛋，主人一定会更喜欢我的'",
          "答句格式：猫要学下蛋，因为……"
        ],
        tip: "回答'为什么'题：用'因为'连接原因，确保答案来自原文。"
      }
    },
    {
      id: "p3_zh_rs_rev4_033",
      type: "OpenEnded",
      q: "母鸡为什么不教猫怎么下蛋？（2分）",
      answer: "母鸡不教猫下蛋，因为下蛋是母鸡的事，猫学不会的。",
      pinyin: "xué bù huì",
      meaning: "cannot learn / incapable of learning",
      solution: {
        method: "细节题：找母鸡的理由。母鸡说'下蛋是我们的事，你是学不会的'。",
        steps: [
          "定位：母鸡说的话",
          "理由：'下蛋是我们的事，你是学不会的'",
          "答句：母鸡不教猫下蛋，因为下蛋是母鸡的事，猫学不会的。"
        ],
        tip: "引用原文中人物的话来回答原因题，可以适当改写为陈述句。"
      }
    },
    {
      id: "p3_zh_rs_rev4_034",
      type: "OpenEnded",
      q: "猫还会想要下蛋吗？你是怎么知道的？（2分）",
      answer: "猫不想下蛋。因为它终于明白了自己只能捉老鼠，下蛋的事还是让母鸡去做。",
      pinyin: "zhōng yú míng bái",
      meaning: "finally understood",
      solution: {
        method: "推断题：根据最后一段，猫的态度发生了改变。",
        steps: [
          "原文最后：'它终于明白了自己只能捉老鼠，下蛋的事还是让母鸡去做吧'",
          "结论：猫不再想下蛋了，接受了自己的本职（捉老鼠）",
          "答题：猫不想下蛋。因为它终于明白了……"
        ],
        tip: "推断题：找出表示态度转变的关键词，如'终于明白''后悔''决定'等。"
      }
    }
  ]
};

// ==========================================================
// EXPORT — All questions grouped
// ==========================================================

export const redSwastikaRevision4 = {
  meta: {
    school: "Red Swastika School (卍慈学校)",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    paper: "Revision 4 — 第一课至第十五课",
    totalMarks: 45,
    source: "P3 Chinese EOY PDF pp.279–287"
  },
  sections: {
    bianzi: bianziQuestions,        // Q1–Q5  (5 marks)
    ciyu: ciyuQuestions,            // Q6–Q9  (4 marks)
    kantu: kantuQuestions,          // Q10–Q13 (4 marks)
    peidui: peiduiSet,              // Q14–Q18 (5 marks)
    juziFanxie: juziFanxie,         // Q19–Q21 (仿写, 6 marks)
    juziKuoxie: juziKuoxie,         // Q22–Q23 (扩写, 4 marks)
    zuju: zujuSet,                  // Q24–Q28 (5 marks)
    yueRead1: yueReadSet1,          // Q29–Q31 (6 marks)
    yueRead2: yueReadSet2           // Q32–Q34 (6 marks)
  }
};

export default redSwastikaRevision4;
