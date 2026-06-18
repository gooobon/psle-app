// src/data/p3/chinese/papers/wa1_2025.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  CHIJ ST NICHOLAS GIRLS' SCHOOL (Primary)
//         三年级高级华文学段考查 · 试卷二：语文理解与运用
//         考试范围：第一课至第八课 ｜ 第一部分 14 分 + 第二部分 16 分 = 30 分
// Answers verified against the printed ANSWER KEY (LEVEL: PRIMARY 3 / CHIJ /
// HIGHER CHINESE). Listening & long composition are intentionally excluded.
// ---------------------------------------------------------------------------

// NOTE: Types are declared module-locally so this file compiles standalone.
// You can later lift them into a shared `../types.ts` and `import` them here;
// because they're module-scoped, declaring them again in wa2/wa3/eoy is safe.

type Difficulty = "foundation" | "core" | "stretch";

type Topic =
  | "PinYin"      // 拼音
  | "BianZi"      // 辨字
  | "CiYu"        // 词语
  | "KanTu"       // 看图
  | "PeiDui"      // 搭配
  | "TianKong"    // 填空 (cloze)
  | "JuZi"        // 句子 (造句/仿写/扩写/连写)
  | "ZuJu"        // 组段
  | "YueReadMCQ"  // 阅读-选择
  | "YueReadOpen";// 阅读-问答

interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

// Type A — standalone item
interface SingleQuestion {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];        // omitted for open-ended items
  answer: number | string;   // MCQ: 0-based index ｜ open: answer text
  pinyin: string;
  meaning: string;
  solution: Solution;
}

// Type B — passage / set item
interface SetSubQuestion {
  id: string;
  type: "MCQ" | "OpenEnded";
  q: string;
  options?: string[];
  answer: number | string;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

interface SetQuestion {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  setLabel: string;
  passage: string;
  wordBank?: string[];
  questions: SetSubQuestion[];
}

type Question = SingleQuestion | SetQuestion;

interface Paper {
  meta: {
    id: string;
    level: "P3";
    subject: "Higher Chinese";
    assessment: "WA1";
    source: string;
    totalMarks: number;
    scope: string;
  };
  items: Question[];
}

// ---------------------------------------------------------------------------

export const wa1_2025: Paper = {
  meta: {
    id: "p3_zh_wa1_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    source: "CHIJ St Nicholas Girls' School (Primary) · 试卷二：语文理解与运用 · 第一课至第八课",
    totalMarks: 30,
    scope: "Lessons 1–8",
  },

  items: [
    // =====================================================================
    // 一、语文应用 (Q1–Q14, 14 题 14 分) — all MCQ
    // =====================================================================

    // ---- Q1–Q2 拼音 ----
    {
      id: "p3_zh_wa1_001",
      topic: "PinYin",
      difficulty: "core",
      instruction: "请选出画线词语的汉语拼音。",
      q: "我们都「相信」班长说的话是真的。",
      options: ["xiāng xìn", "xiāng xìng", "xiǎng xìn", "xiǎng xìng"],
      answer: 0,
      pinyin: "xiāng xìn",
      meaning: "to believe; to trust",
      solution: {
        method: "区分声母与声调：相(xiāng) ≠ 想(xiǎng)；信(xìn) ≠ 兴(xìng)。",
        steps: [
          "1. 「相」读 xiāng（第一声），不要读成「想」xiǎng。",
          "2. 「信」读 xìn（前鼻音 -n），不要读成 xìng（后鼻音 -ng）。",
        ],
        tip: "前鼻音 -n 与后鼻音 -ng 是 P3 拼音的常考易错点。",
      },
    },
    {
      id: "p3_zh_wa1_002",
      topic: "PinYin",
      difficulty: "core",
      instruction: "请选出画线词语的汉语拼音。",
      q: "妈妈要出门时，「突然」下起了大雨。",
      options: ["hū lán", "hū rán", "tū lán", "tū rán"],
      answer: 3,
      pinyin: "tū rán",
      meaning: "suddenly; all of a sudden",
      solution: {
        method: "区分声母 t/h 与 r/l：突(tū)、然(rán)。",
        steps: [
          "1. 「突」声母是 t，读 tū，不是 hū。",
          "2. 「然」声母是 r，读 rán，不是 lán。",
        ],
        tip: "r 与 l 的开头音容易混，记住「然」是 r-。",
      },
    },

    // ---- Q3–Q5 辨字 ----
    {
      id: "p3_zh_wa1_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字填入横线上。",
      q: "水池里的蝌蚪身体起了变___，尾巴慢慢不见了。",
      options: ["画", "话", "化", "划"],
      answer: 2,
      pinyin: "biàn huà",
      meaning: "change; transformation (变化)",
      solution: {
        method: "同音字辨析：根据词义选「化」组成「变化」。",
        steps: [
          "1. 句意是身体发生了改变 → 需要「变化」。",
          "2. 画/话/划 都不能与「变」组成合理词语。",
        ],
        tip: "先把空格连成词，再判断哪个字义对。",
      },
    },
    {
      id: "p3_zh_wa1_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字填入横线上。",
      q: "我们很多年没见到表弟，他的___子和以前不同了。",
      options: ["洋", "样", "祥", "痒"],
      answer: 1,
      pinyin: "yàng zi",
      meaning: "appearance; the way sb looks (样子)",
      solution: {
        method: "形近字辨析：选「样」组成「样子」。",
        steps: [
          "1. 句意指人的外貌长相 → 「样子」。",
          "2. 洋(海洋)、祥(吉祥)、痒(发痒) 都不合句意。",
        ],
        tip: "木字旁的「样」表示模样、样子。",
      },
    },
    {
      id: "p3_zh_wa1_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字填入横线上。",
      q: "我已经把明天上课要用的文具___备好了。",
      options: ["准", "谁", "唯", "推"],
      answer: 0,
      pinyin: "zhǔn bèi",
      meaning: "to prepare; to get ready (准备)",
      solution: {
        method: "同音/形近字辨析：选「准」组成「准备」。",
        steps: [
          "1. 句意是事先做好预备 → 「准备」。",
          "2. 谁/唯/推 都不能与「备」搭配成词。",
        ],
        tip: "「准备」是高频词，记住搭配。",
      },
    },

    // ---- Q6–Q9 词语（填空选词）----
    {
      id: "p3_zh_wa1_006",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选出适当的词语填入横线上。",
      q: "哥哥起晚了，___和我们一起吃早餐就上学去了。",
      options: ["想不到", "受不了", "忍不住", "来不及"],
      answer: 3,
      pinyin: "lái bù jí",
      meaning: "no time to do sth; too late",
      solution: {
        method: "联系上下文：起晚了 → 没有时间。",
        steps: [
          "1. 起晚了说明时间不够。",
          "2. 「来不及」表示时间太紧、没能做到。",
        ],
        tip: "看前因（起晚了）推后果（来不及）。",
      },
    },
    {
      id: "p3_zh_wa1_007",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选出适当的词语填入横线上。",
      q: "弟弟努力学习，___以后能成为一名老师。",
      options: ["决定", "明白", "希望", "好像"],
      answer: 2,
      pinyin: "xī wàng",
      meaning: "to hope; hope",
      solution: {
        method: "判断语气：表达对未来的愿望。",
        steps: [
          "1. 「以后能成为老师」是一个愿望。",
          "2. 「希望」表示心里盼望的事。",
        ],
        tip: "对还没发生、心里想要的事用「希望」。",
      },
    },
    {
      id: "p3_zh_wa1_008",
      topic: "CiYu",
      difficulty: "foundation",
      instruction: "选出适当的词语填入横线上。",
      q: "哥哥很___，什么数学题都难不倒他。",
      options: ["专心", "聪明", "用功", "认真"],
      answer: 1,
      pinyin: "cōng míng",
      meaning: "clever; smart",
      solution: {
        method: "抓关键句：什么题都难不倒 → 头脑好。",
        steps: [
          "1. 「难不倒他」说明他很会想、脑筋好。",
          "2. 「聪明」最贴近这个意思。",
        ],
        tip: "专心/用功/认真说态度，聪明说脑筋。",
      },
    },
    {
      id: "p3_zh_wa1_009",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选出适当的词语填入横线上。",
      q: "妹妹一个人搬不动这张桌子，___我们帮忙。",
      options: ["答应", "喜欢", "需要", "愿意"],
      answer: 2,
      pinyin: "xū yào",
      meaning: "to need; to require",
      solution: {
        method: "联系上下文：搬不动 → 需要别人帮。",
        steps: [
          "1. 「搬不动」说明力气不够。",
          "2. 「需要帮忙」最合句意。",
        ],
        tip: "缺少、不够时用「需要」。",
      },
    },

    // ---- Q10–Q14 词语（选出正确句子 / 词语运用）----
    {
      id: "p3_zh_wa1_010",
      topic: "CiYu",
      difficulty: "core",
      instruction: "以下哪个句子是正确的？（词语：参观）",
      q: "请选出「参观」用法正确的句子。",
      options: [
        "姐姐参观书法比赛得到第一名。",
        "老师要带我们参观野生动物园。",
        "丽丽参观了很久才把书还给我。",
        "他空闲的时候喜欢参观故事书。",
      ],
      answer: 1,
      pinyin: "cān guān",
      meaning: "to visit / tour (a place)",
      solution: {
        method: "辨析词义：「参观」用于到某个地方实地看。",
        steps: [
          "1. 「参观」的对象是地方或展览（动物园、博物馆）。",
          "2. 比赛、书、故事书都不能「参观」。",
        ],
        tip: "「参观」后面接『地方』。",
      },
    },
    {
      id: "p3_zh_wa1_011",
      topic: "CiYu",
      difficulty: "core",
      instruction: "以下哪个句子是正确的？（词语：懂事）",
      q: "请选出「懂事」用法正确的句子。",
      options: [
        "爷爷每天都看报纸，是个很懂事的人。",
        "我要多看故事书，才能变得更加懂事。",
        "小明一向很懂事，大家都相信他的话。",
        "文文真懂事，常常帮忙妈妈照顾妹妹。",
      ],
      answer: 3,
      pinyin: "dǒng shì",
      meaning: "sensible; well-behaved (esp. of a child)",
      solution: {
        method: "辨析词义：「懂事」指明白道理、体贴别人（多用于小孩）。",
        steps: [
          "1. 「懂事」常用来形容孩子明理、会帮忙。",
          "2. 「帮忙照顾妹妹」最能体现「懂事」。",
        ],
        tip: "懂事 = 明白事理、体贴他人。",
      },
    },
    {
      id: "p3_zh_wa1_012",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（词语：保卫）",
      q: "请选出「保卫」用法正确的句子。",
      options: [
        "我没把钱包保卫好，结果钱包不见了。",
        "为了保卫这只小花猫，我把它带回家。",
        "哥哥长大了以后想当军人，保卫国家。",
        "我们应该常常运动，保卫身体的健康。",
      ],
      answer: 2,
      pinyin: "bǎo wèi",
      meaning: "to defend; to protect (against attack)",
      solution: {
        method: "辨析词义：「保卫」指守护、抵御（多用于国家、家园）。",
        steps: [
          "1. 「保卫」常与『国家、家园』搭配。",
          "2. 钱包用「保管」，身体用「保护」，小猫用「保护」。",
        ],
        tip: "保卫(抵御)＞保护＞保管，搭配各不同。",
      },
    },
    {
      id: "p3_zh_wa1_013",
      topic: "CiYu",
      difficulty: "core",
      instruction: "以下哪个句子是正确的？（词语：附近）",
      q: "请选出「附近」用法正确的句子。",
      options: [
        "外公得了重感冒，便叫我们不要附近他。",
        "学校就在我的家附近，我可以走路上学。",
        "叔叔出国了，难怪附近一直没有见到他。",
        "我听不到小明在说什么，就走到他附近。",
      ],
      answer: 1,
      pinyin: "fù jìn",
      meaning: "nearby; vicinity",
      solution: {
        method: "辨析词性：「附近」是名词/方位词，不是动词。",
        steps: [
          "1. 「附近」指『旁边、不远的地方』。",
          "2. 「家附近」正确；不能说『附近他』（应用『靠近』）。",
        ],
        tip: "附近 = 一个地方，不能直接带宾语。",
      },
    },
    {
      id: "p3_zh_wa1_014",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（词语：陪伴）",
      q: "请选出「陪伴」用法正确的句子。",
      options: [
        "弟弟有很多功课不会做，便请妈妈陪伴他做。",
        "休息的时候，我陪伴老师拿本子到教员室去。",
        "爸爸送了一只玩具狗给我，让它每天陪伴我。",
        "我和欢欢是好朋友，我们常常都陪伴在一起。",
      ],
      answer: 2,
      pinyin: "péi bàn",
      meaning: "to accompany; to keep company",
      solution: {
        method: "辨析词义：「陪伴」指长时间相伴左右。",
        steps: [
          "1. 「陪伴」强调相伴、做伴。",
          "2. 玩具狗『每天陪伴我』正确；做功课用『陪』『教』，一起用『相处』。",
        ],
        tip: "陪伴 = 长期作伴；动作性的『帮、教』不用陪伴。",
      },
    },

    // =====================================================================
    // 二、造句 (Q15–Q17, 3 题 6 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1_015",
      topic: "JuZi",
      difficulty: "core",
      instruction: "使用词语造一个有语境且合理的句子。",
      q: "连忙：",
      answer: "妹妹跌倒了，我连忙把她扶起来。",
      pinyin: "lián máng",
      meaning: "hurriedly; at once",
      solution: {
        method: "造句：「连忙」表示『马上、赶紧』，后接动作。",
        steps: [
          "1. 先想一个需要『赶紧做』的情境。",
          "2. 在动作前加上「连忙」。",
        ],
        tip: "连忙后面一定要跟一个动作（连忙+做……）。",
      },
    },
    {
      id: "p3_zh_wa1_016",
      topic: "JuZi",
      difficulty: "core",
      instruction: "使用词语造一个有语境且合理的句子。",
      q: "容易：",
      answer: "老师给我们的功课真容易，我很快就做完了。",
      pinyin: "róng yì",
      meaning: "easy",
      solution: {
        method: "造句：「容易」表示『不难、简单』。",
        steps: [
          "1. 想一件简单的事（功课、题目）。",
          "2. 用「容易」形容，并补上结果。",
        ],
        tip: "可补『很快就做完』让句子更完整。",
      },
    },
    {
      id: "p3_zh_wa1_017",
      topic: "JuZi",
      difficulty: "core",
      instruction: "使用词语造一个有语境且合理的句子。",
      q: "原谅：",
      answer: "我打破妈妈的杯子，但她原谅了我。",
      pinyin: "yuán liàng",
      meaning: "to forgive; to pardon",
      solution: {
        method: "造句：「原谅」用于做错事后被宽恕。",
        steps: [
          "1. 先写出『做错的事』。",
          "2. 再写出对方『原谅了』。",
        ],
        tip: "前面写错事，后面写原谅，因果更清楚。",
      },
    },

    // =====================================================================
    // 三、阅读理解 (Q18–Q22, 5 题 10 分) — open-ended set
    // =====================================================================
    {
      id: "p3_zh_wa1_set1",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "阅读理解（一）",
      passage:
        "一天，白马觉得全身没力，还发高烧。它知道自己病了，赶快去找牛医生给它看病。" +
        "牛医生为白马看病时，发现它得到的是一种新的病。牛医生为白马看完病后，没开药给白马吃，" +
        "只叫白马回家后要好好休息。\n\n" +
        "几天后，森林里越来越多动物也得了同样的病。那些没有生病的动物知道后，十分害怕，" +
        "不知道怎么办才好。公鸡担心自己会得到这种新的病，马上到处找食物，然后把找到的食物全搬回自己的家里。" +
        "这样一来，它就可以一直留在家里，等那些病倒的动物身体好了之后才出来。其他动物看见了，也学公鸡那么做。" +
        "动作比较慢的乌龟找不到食物，只好饿肚子。\n\n" +
        "大象先生知道后，对大家说：“你们不要紧张，也不要抢食物。只要你们注意卫生，就不会生病。”" +
        "接着，它又说：“在困难的时候，大家更应该互相照顾。”大家听了大象先生的话后，觉得很有道理。" +
        "它们把食物分给那些没有东西吃的动物后，和以前一样继续过着快乐的生活。",
      questions: [
        {
          id: "p3_zh_wa1_018",
          type: "OpenEnded",
          q: "白马怎么知道自己病了？（2分）",
          answer: "因为白马觉得全身没力，还发高烧，所以白马知道自己病了。",
          pinyin: "fā gāo shāo",
          meaning: "to run a high fever (发高烧)",
          solution: {
            method: "从短文找线索：身体出现的症状。",
            steps: [
              "1. 回到第一段。",
              "2. 找出『觉得全身没力、还发高烧』这两个症状。",
            ],
            tip: "题目问『怎么知道』，答案要写出身体的感觉/症状。",
          },
        },
        {
          id: "p3_zh_wa1_019",
          type: "OpenEnded",
          q: "从哪里可以看出牛医生没办法把白马的病医好？（2分）",
          answer:
            "从“牛医生为白马看完病后，没开药给白马吃，只叫白马回家后要好好休息。”可以看出牛医生没办法把白马的病医好。",
          pinyin: "yī hǎo",
          meaning: "to cure; to heal (医好)",
          solution: {
            method: "引用原文：找出『没开药、只叫回家休息』的句子。",
            steps: [
              "1. 在第一段找牛医生的做法。",
              "2. 用『从……可以看出……』的句式引用原句作答。",
            ],
            tip: "『从哪里看出』题，要先引用原文，再点明结论。",
          },
        },
        {
          id: "p3_zh_wa1_020",
          type: "OpenEnded",
          q: "那些没有生病的动物知道有一种新的病后，有什么反应？（1分）",
          answer: "那些没生病的动物知道有一种新的病后十分害怕，不知道怎么办才好。",
          pinyin: "hài pà",
          meaning: "to be afraid; scared (害怕)",
          solution: {
            method: "直接提取：第二段开头写出它们的反应。",
            steps: [
              "1. 回到第二段第一句。",
              "2. 抄出『十分害怕，不知道怎么办才好』。",
            ],
            tip: "1 分题答案就在原文，照写关键句即可。",
          },
        },
        {
          id: "p3_zh_wa1_021",
          type: "OpenEnded",
          q: "为什么那些没生病的动物要到处找食物？（3分）",
          answer:
            "因为它们担心自己会得到那种新的病，所以到处找食物，把食物全搬回家里。这样一来，它们就可以一直留在家里，等那些病倒的动物身体好了之后才出来。",
          pinyin: "dān xīn",
          meaning: "to worry; to be anxious (担心)",
          solution: {
            method: "因果推断：先找原因（担心生病），再说目的（留在家里）。",
            steps: [
              "1. 在第二段找公鸡的想法。",
              "2. 把『担心生病』和『搬食物回家、留在家里』连起来作答。",
            ],
            tip: "3 分题要答完整：原因 + 目的，用『因为……所以……这样一来……』。",
          },
        },
        {
          id: "p3_zh_wa1_022",
          type: "OpenEnded",
          q: "你从这个故事中学到了什么道理？（2分）",
          answer: "我从这个故事中学到了在困难的时候，大家应该互相照顾。",
          pinyin: "hù xiāng zhào gù",
          meaning: "to take care of one another (互相照顾)",
          solution: {
            method: "扣主题：从大象先生的话提炼道理。",
            steps: [
              "1. 看第三段大象先生说的话。",
              "2. 把『在困难的时候要互相照顾』写成道理。",
            ],
            tip: "『学到什么道理』题，常可从人物说的话里找答案。",
          },
        },
      ],
    },
  ],
};

export default wa1_2025;
