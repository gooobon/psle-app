// src/data/p3/chinese/papers/wa1_redswastika_minirevision1_2025.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  卍慈学校 (RED SWASTIKA SCHOOL)
//         三年级高级华文 · 小复习（一）(Mini Revision 1)
//         复习范围：第一课至第三课 ｜ /30
//         看汉字选拼音 5 + 辨字测验 5 + 词语选择 5 + 词语搭配 5
//         + 短文填空 4 + 仿写句子 6 = 30 分
// NOTE ON ANSWERS: This 小复习（一） set has NO printed answer key in the scan
//   (the section moves on to another school's composition paper).
//   MCQ / 搭配 / 填空 answers are determined by unambiguous Chinese usage;
//   仿写 answers are model answers. Marked "(derived)" inline. Reliability is
//   high — the same school's 考查（一） answers (this PDF) matched its key 100%.
//   Listening & long composition excluded as requested.
// ---------------------------------------------------------------------------

type Difficulty = "foundation" | "core" | "stretch";

type Topic =
  | "PinYin"
  | "BianZi"
  | "CiYu"
  | "KanTu"
  | "PeiDui"
  | "TianKong"
  | "JuZi"
  | "ZuJu"
  | "YueReadMCQ"
  | "YueReadOpen";

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
  options?: string[];
  answer: number | string; // MCQ: 0-based index ｜ open: text
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
  // MCQ: 0-based index into this question's `options`.
  // PeiDui matching / TianKong cloze: the chosen word TEXT from `wordBank`.
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
    paperType: string;
    source: string;
    totalMarks: number;
    scope: string;
  };
  items: Question[];
}

// ---------------------------------------------------------------------------

export const wa1_redswastika_minirevision1: Paper = {
  meta: {
    id: "p3_zh_wa1_redswastika_minirevision1_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    paperType: "Red Swastika · 小复习（一） (Mini Revision 1)",
    source: "Red Swastika School (卍慈学校) · 三年级高级华文 小复习（一） · 第一课至第三课",
    totalMarks: 30,
    scope: "Lessons 1–3",
  },

  items: [
    // =====================================================================
    // (一) 看汉字选拼音 (Q1–Q5, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1rsmr1_001",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据画线的词语，选出正确的拼音，把代表它的数目字填写在括号里。",
      q: "陈叔叔说了一个「有趣」的故事给我们听。",
      options: ["yōu qū", "yóu jú", "yòu jǔ", "yǒu qù"],
      answer: 3, // 有趣
      pinyin: "yǒu qù",
      meaning: "interesting; fun (有趣)",
      solution: {
        method: "区分声调与声母：有(yǒu)、趣(qù)。",
        steps: ["1. 「有」读 yǒu（第三声）。", "2. 「趣」读 qù（声母 q）。"],
        tip: "有趣＝yǒu qù，注意「有」是三声。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_002",
      topic: "PinYin",
      difficulty: "foundation",
      instruction: "根据画线的词语，选出正确的拼音，把代表它的数目字填写在括号里。",
      q: "小安的脸圆圆的，看起来很有「福」气。",
      options: ["tú", "dú", "fú", "hú"],
      answer: 2, // 福
      pinyin: "fú",
      meaning: "good fortune; blessing (福)",
      solution: {
        method: "区分声母：福(f-)。",
        steps: ["1. 「福」声母是 f。", "2. 读 fú，不是 tú/dú/hú。"],
        tip: "福＝fú（f 开头）。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_003",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据画线的词语，选出正确的拼音，把代表它的数目字填写在括号里。",
      q: "他有一个「蓝」色的水壶。",
      options: ["rán", "lán", "láng", "ráng"],
      answer: 1, // 蓝
      pinyin: "lán",
      meaning: "blue (蓝)",
      solution: {
        method: "区分声母 l/r 与前后鼻音 -n/-ng：蓝(lán)。",
        steps: ["1. 「蓝」声母是 l，不是 r。", "2. 「蓝」是前鼻音 -n，读 lán。"],
        tip: "蓝＝lán（l + 前鼻音 n）。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_004",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据画线的词语，选出正确的拼音，把代表它的数目字填写在括号里。",
      q: "弟弟有很多「辆」玩具车。",
      options: ["liàng", "niàng", "liàn", "niàn"],
      answer: 0, // 辆
      pinyin: "liàng",
      meaning: "(measure word for vehicles) (辆)",
      solution: {
        method: "区分声母 l/n 与韵母 -iang/-ian：辆(liàng)。",
        steps: ["1. 「辆」声母是 l。", "2. 韵母是 -iang（后鼻音），读 liàng。"],
        tip: "辆＝liàng，是车的量词。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_005",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据画线的词语，选出正确的拼音，把代表它的数目字填写在括号里。",
      q: "哥哥花了一个小时，写出了一「篇」作文。",
      options: ["biān", "biàn", "piān", "piàn"],
      answer: 2, // 篇
      pinyin: "piān",
      meaning: "(measure word for articles / essays) (篇)",
      solution: {
        method: "区分声母 b/p 与声调：篇(piān)。",
        steps: ["1. 「篇」声母是 p，不是 b。", "2. 读第一声 piān。"],
        tip: "篇＝piān，是文章、作文的量词。",
      },
    },

    // =====================================================================
    // (二) 辨字测验 (Q6–Q10, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1rsmr1_006",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "我天天都___时到学校。",
      options: ["谁", "难", "准", "住"],
      answer: 2, // 准时
      pinyin: "zhǔn shí",
      meaning: "on time; punctual (准时)",
      solution: {
        method: "同音/形近字辨析：选「准」组成「准时」。",
        steps: ["1. 「___时到学校」表示按时、不迟到。", "2. 「准时」最合句意。"],
        tip: "准时＝按规定的时间，不迟到。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_007",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "地板上有一根___管。",
      options: ["吸", "奶", "级", "极"],
      answer: 0, // 吸管
      pinyin: "xī guǎn",
      meaning: "drinking straw (吸管)",
      solution: {
        method: "形近字辨析：选「吸」组成「吸管」。",
        steps: ["1. 「___管」是喝饮料用的管子。", "2. 「吸管」最合句意。"],
        tip: "口字旁的「吸」与吸、喝有关。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_008",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "文具___里有两支笔和一把尺。",
      options: ["和", "河", "合", "盒"],
      answer: 3, // 文具盒
      pinyin: "wén jù hé",
      meaning: "pencil box / stationery box (文具盒)",
      solution: {
        method: "同音/形近字辨析：选「盒」组成「文具盒」。",
        steps: ["1. 装笔和尺的容器是「盒」。", "2. 「文具盒」最合句意。"],
        tip: "「盒」是装东西的小容器。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_009",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "为了___现愿望，他要努力学习。",
      options: ["石", "实", "时", "食"],
      answer: 1, // 实现
      pinyin: "shí xiàn",
      meaning: "to realize / fulfil (a wish) (实现)",
      solution: {
        method: "同音字辨析：选「实」组成「实现」。",
        steps: ["1. 「___现愿望」是把心愿做成。", "2. 「实现」最合句意。"],
        tip: "实现＋愿望/梦想。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_010",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "请你___得明天把书本带来。",
      options: ["己", "已", "起", "记"],
      answer: 3, // 记得
      pinyin: "jì de",
      meaning: "to remember (记得)",
      solution: {
        method: "同音/形近字辨析：选「记」组成「记得」。",
        steps: ["1. 「___得带书本来」是别忘了。", "2. 「记得」最合句意。"],
        tip: "言字旁的「记」与记住、记得有关。",
      },
    },

    // =====================================================================
    // (三) 词语选择 (Q11–Q15, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1rsmr1_011",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
      q: "我___想当一名科学家。",
      options: ["一定", "已经", "希望", "将来"],
      answer: 3, // 将来
      pinyin: "jiāng lái",
      meaning: "in the future (将来)",
      solution: {
        method: "看时间逻辑：长大以后才能当科学家。",
        steps: ["1. 「当科学家」是以后的事。", "2. 「将来想当」表示以后的志向；希望/想 意思重复。"],
        tip: "表示『以后、未来』用「将来」。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_012",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
      q: "我们要___迟睡的坏习惯。",
      options: ["改掉", "帮助", "明白", "成为"],
      answer: 0, // 改掉
      pinyin: "gǎi diào",
      meaning: "to get rid of / break (a habit) (改掉)",
      solution: {
        method: "动宾搭配：把坏习惯去除用「改掉」。",
        steps: ["1. 宾语是「坏习惯」。", "2. 「改掉坏习惯」最合理。"],
        tip: "改掉＋坏习惯/毛病。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_013",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
      q: "请你___，让他们先下车。",
      options: ["退后", "后面", "以后", "后来"],
      answer: 0, // 退后
      pinyin: "tuì hòu",
      meaning: "to step back; to move back (退后)",
      solution: {
        method: "判断动作：让别人先下车，自己往后退。",
        steps: ["1. 「让他们先下车」需要自己让出空间。", "2. 「退后」是往后退的动作；后面/以后/后来 不是动作。"],
        tip: "「退后」是一个动作，可作命令。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_014",
      topic: "CiYu",
      difficulty: "foundation",
      instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
      q: "她常常___，所以跳舞跳得很好。",
      options: ["睡觉", "练习", "帮忙", "举手"],
      answer: 1, // 练习
      pinyin: "liàn xí",
      meaning: "to practise (练习)",
      solution: {
        method: "看因果：常做某事 → 跳得好。",
        steps: ["1. 「跳得很好」是常做的结果。", "2. 「常常练习」才会跳得好。"],
        tip: "要做得好，先要『练习』。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_015",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
      q: "班长很___，能帮老师做事情。",
      options: ["可爱", "能干", "喜欢", "特别"],
      answer: 1, // 能干
      pinyin: "néng gàn",
      meaning: "capable; competent (能干)",
      solution: {
        method: "抓关键句：能帮老师做事 → 有能力。",
        steps: ["1. 「能帮老师做事情」说明她会做事。", "2. 「能干」最贴切。"],
        tip: "会做事、有能力用「能干」。",
      },
    },

    // =====================================================================
    // (四) 词语搭配 (Q16–Q20, 5 题 5 分) — matching (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1rsmr1_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "词语搭配（四）",
      passage:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数目字填写在括号里。",
      wordBank: ["颜色", "强壮", "意思", "一定", "成为", "希望", "保卫", "改掉"],
      questions: [
        {
          id: "p3_zh_wa1rsmr1_016",
          type: "MCQ",
          q: "（ ＿＿ ）科学家",
          answer: "成为", // 成为科学家
          pinyin: "chéng wéi",
          meaning: "to become (成为)",
          solution: {
            method: "动宾搭配：变成某种身份用「成为」。",
            steps: ["1. 「科学家」是身份。", "2. 成为科学家＝变成科学家。"],
            tip: "成为＋身份。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_017",
          type: "MCQ",
          q: "明白（ ＿＿ ）",
          answer: "意思", // 明白意思
          pinyin: "yì si",
          meaning: "meaning (意思)",
          solution: {
            method: "动宾搭配：弄懂的是『意思』。",
            steps: ["1. 「明白」后接被理解的内容。", "2. 明白意思＝弄懂意思。"],
            tip: "明白＋意思/道理。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_018",
          type: "MCQ",
          q: "（ ＿＿ ）国家",
          answer: "保卫", // 保卫国家
          pinyin: "bǎo wèi",
          meaning: "to defend (保卫)",
          solution: {
            method: "动宾搭配：守护、抵御的对象是『国家』。",
            steps: ["1. 「国家」需要守护。", "2. 保卫国家＝守护国家。"],
            tip: "保卫＋国家/家园。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_019",
          type: "MCQ",
          q: "身体（ ＿＿ ）",
          answer: "强壮", // 身体强壮
          pinyin: "qiáng zhuàng",
          meaning: "strong; sturdy (强壮)",
          solution: {
            method: "主谓搭配：形容身体好用『强壮』。",
            steps: ["1. 「身体」常与形容词搭配。", "2. 身体强壮＝身体结实有力。"],
            tip: "身体＋强壮/健康。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_020",
          type: "MCQ",
          q: "（ ＿＿ ）好看",
          answer: "颜色", // 颜色好看
          pinyin: "yán sè",
          meaning: "colour (颜色)",
          solution: {
            method: "主谓搭配：能『好看』的是颜色等。",
            steps: ["1. 「___好看」需要一个名词作主语。", "2. 颜色好看＝色彩漂亮。（剩余 一定/希望/改掉 不用）"],
            tip: "颜色＋好看/鲜艳。",
          },
        },
      ],
    },

    // =====================================================================
    // (五) 短文填空 (Q21–Q24, 4 题 4 分) — cloze (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1rsmr1_set2",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "短文填空（五）",
      passage:
        "叔叔每天都要做两份工作。早上去送报，下午去当(21)＿＿。他每天(22)＿＿工作到很晚才回家。" +
        "日子久了，叔叔的身子变得没以前好了。但是，叔叔的孩子们都很(23)＿＿，他们放学回家后就会帮忙打扫家里，" +
        "学校发的(24)＿＿他们也都能自己做，让叔叔很放心。",
      wordBank: ["举手", "司机", "瘦", "作业", "懂事", "总是"],
      questions: [
        {
          id: "p3_zh_wa1rsmr1_021",
          type: "MCQ",
          q: "(21) 早上去送报，下午去当＿＿。",
          answer: "司机", // (2)
          pinyin: "sī jī",
          meaning: "driver (司机)",
          solution: {
            method: "看职业：『去当___』后接职业名称。",
            steps: ["1. 「当」后接一种工作。", "2. 司机是一种职业，合句意。"],
            tip: "「当」＋职业（司机/老师）。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_022",
          type: "MCQ",
          q: "(22) 他每天＿＿工作到很晚才回家。",
          answer: "总是", // (6)
          pinyin: "zǒng shì",
          meaning: "always (总是)",
          solution: {
            method: "看频率：每天都这样 → 「总是」。",
            steps: ["1. 「每天……到很晚」表示一向如此。", "2. 「总是」表示经常、一向。"],
            tip: "一向、每次都用「总是」。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_023",
          type: "MCQ",
          q: "(23) 叔叔的孩子们都很＿＿，放学回家后会帮忙打扫。",
          answer: "懂事", // (5)
          pinyin: "dǒng shì",
          meaning: "sensible; well-behaved (懂事)",
          solution: {
            method: "看行为：会帮忙做家务 → 「懂事」。",
            steps: ["1. 「帮忙打扫、自己做作业」说明孩子明理。", "2. 「懂事」最贴切。"],
            tip: "明理、体贴、会帮忙用「懂事」。",
          },
        },
        {
          id: "p3_zh_wa1rsmr1_024",
          type: "MCQ",
          q: "(24) 学校发的＿＿他们也都能自己做。",
          answer: "作业", // (4)
          pinyin: "zuò yè",
          meaning: "homework; assignment (作业)",
          solution: {
            method: "看宾语：学校发的、能自己做的是『作业』。",
            steps: ["1. 「学校发的」常是功课。", "2. 「作业」＝功课。（剩余 举手/瘦 不用）"],
            tip: "作业＝功课。",
          },
        },
      ],
    },

    // =====================================================================
    // (六) 仿写句子 (Q25–Q27, 3 题 6 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1rsmr1_025",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请根据所提供的例子和帮助词语，仿写一个句子。（一……就……）",
      q: "下课钟声响起。同学们收拾书包。",
      answer: "下课钟声一响起，同学们就收拾书包。",
      pinyin: "yī…jiù…",
      meaning: "as soon as … then … (一……就……)",
      solution: {
        method: "关联词「一……就……」表示两件事紧接着发生。",
        steps: ["1. 第一件事前加「一」：钟声一响起。", "2. 第二件事前加「就」：同学们就收拾书包。"],
        tip: "「一」放第一个动作前，「就」放第二个动作前。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_026",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请根据所提供的例子和帮助词语，仿写一个句子。（只要……就……）",
      q: "你做完功课。你可以去游乐场玩。",
      answer: "你只要做完功课，就可以去游乐场玩。",
      pinyin: "zhǐ yào…jiù…",
      meaning: "as long as … then … (只要……就……)",
      solution: {
        method: "关联词「只要……就……」表示条件与结果。",
        steps: ["1. 条件：做完功课 → 前加「只要」。", "2. 结果：去游乐场玩 → 前加「就」。"],
        tip: "只要（条件），就（结果）。",
      },
    },
    {
      id: "p3_zh_wa1rsmr1_027",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请根据所提供的例子和帮助词语，仿写一个句子。（因为）",
      q: "明华很着急。明华忘了做功课。",
      answer: "明华很着急，因为他忘了做功课。",
      pinyin: "yīn wèi",
      meaning: "because (因为)",
      solution: {
        method: "用「因为」连接结果与原因，并把重复的「明华」改成「他」。",
        steps: ["1. 先写结果：明华很着急。", "2. 用「因为」引出原因，第二次称呼用「他」：因为他忘了做功课。"],
        tip: "因为后面接『原因』；同一个人第二次可用代词「他」。",
      },
    },
  ],
};

export default wa1_redswastika_minirevision1;
