// src/data/p3/chinese/papers/wa1_red_swastika.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  卍慈学校 (RED SWASTIKA SCHOOL)
//         三年级高级华文 · 考查（一） ｜ 考试范围：第一课至第六课
//         辨字测验 5 + 词语选择 5 + 词语搭配 5 + 仿写句子 6 + 扩写句子 4 = 25 分
//         时间：30 分钟 ｜ 日期：4月29日
// NOTE ON ANSWERS: This 考查（一） paper has NO printed answer key in the scan
//   (the school section jumps straight to its 看图写段 composition paper).
//   MCQ answers (辨字/词语/搭配) are determined by unambiguous Chinese usage;
//   open-ended (仿写/扩写) answers are model answers. Marked "(derived)" inline.
//   Listening & long composition are excluded as requested.
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
  // For 搭配 (PeiDui): answer is the matched word TEXT from `wordBank`
  // (e.g. "受伤"), chosen as a string to avoid index-array ambiguity.
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

export const wa1_red_swastika: Paper = {
  meta: {
    id: "p3_zh_wa1_red_swastika_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    source: "Red Swastika School (卍慈学校) · 三年级高级华文 考查（一） · 第一课至第六课",
    totalMarks: 25,
    scope: "Lessons 1–6",
  },

  items: [
    // =====================================================================
    // (一) 辨字测验 (Q1–Q5, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1rs_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "美美被男同学___倒，她哭了起来。",
      options: ["准", "谁", "推", "难"],
      answer: 2, // (derived) 推倒
      pinyin: "tuī dǎo",
      meaning: "to push over; to knock down (推倒)",
      solution: {
        method: "形近字辨析：用力使人倒下用「推」。",
        steps: [
          "1. 句意是被同学『推得跌倒』。",
          "2. 「推倒」表示用力推使人倒下；准/谁/难 不合句意。",
        ],
        tip: "提手旁「推」表示用手用力的动作。",
      },
    },
    {
      id: "p3_zh_wa1rs_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "妈妈煮了一桌菜，我先___了一口。",
      options: ["常", "尝", "肠", "场"],
      answer: 1, // (derived) 尝
      pinyin: "cháng",
      meaning: "to taste (尝)",
      solution: {
        method: "同音字辨析：吃一点试味道用「尝」。",
        steps: [
          "1. 「___了一口」是先吃一点试味道。",
          "2. 「尝」就是品尝、试味道；常/肠/场 不合。",
        ],
        tip: "口字旁的「尝」与『吃、味道』有关。",
      },
    },
    {
      id: "p3_zh_wa1rs_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "子乐___望成为老师，教小朋友读书。",
      options: ["希", "西", "喜", "吸"],
      answer: 0, // (derived) 希望
      pinyin: "xī wàng",
      meaning: "to hope; hope (希望)",
      solution: {
        method: "同音字辨析：选「希」组成「希望」。",
        steps: [
          "1. 「___望成为老师」是一个愿望 → 希望。",
          "2. 西/喜/吸 都不能与「望」组成此义。",
        ],
        tip: "「希望」是高频词，记住写法。",
      },
    },
    {
      id: "p3_zh_wa1rs_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "小乐是我的好___伴，我们天天一起上学。",
      options: ["火", "伙", "灾", "灭"],
      answer: 1, // (derived) 伙伴
      pinyin: "huǒ bàn",
      meaning: "companion; partner; buddy (伙伴)",
      solution: {
        method: "形近字辨析：选「伙」组成「伙伴」。",
        steps: [
          "1. 天天一起上学的好朋友 → 「伙伴」。",
          "2. 火/灾/灭 与『伴』不成词。",
        ],
        tip: "单人旁「伙」表示同伴、一群人。",
      },
    },
    {
      id: "p3_zh_wa1rs_005",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
      q: "宝宝一天一天地长大，身体出现不少的变___。",
      options: ["华", "话", "画", "化"],
      answer: 3, // (derived) 变化
      pinyin: "biàn huà",
      meaning: "change; transformation (变化)",
      solution: {
        method: "同音字辨析：选「化」组成「变化」。",
        steps: [
          "1. 身体一天天改变 → 「变化」。",
          "2. 华/话/画 与「变」不成此义。",
        ],
        tip: "「变化」表示事物发生改变。",
      },
    },

    // =====================================================================
    // (二) 词语选择 (Q6–Q10, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1rs_006",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
      q: "人们想要有___的身体，就要多做运动、吃得健康。",
      options: ["瘦小", "胖胖", "强壮", "高大"],
      answer: 2, // (derived) 强壮
      pinyin: "qiáng zhuàng",
      meaning: "strong; sturdy; robust (强壮)",
      solution: {
        method: "联系上下文：多运动、吃健康 → 身体好。",
        steps: [
          "1. 后文说『多做运动、吃得健康』。",
          "2. 这是为了拥有「强壮」的身体。",
        ],
        tip: "形容身体好、有力气用「强壮」。",
      },
    },
    {
      id: "p3_zh_wa1rs_007",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
      q: "每个周末，阿姨都会到___的超市买新鲜的鱼。",
      options: ["附近", "远方", "身边", "下楼"],
      answer: 0, // (derived) 附近
      pinyin: "fù jìn",
      meaning: "nearby; in the vicinity (附近)",
      solution: {
        method: "判断词义：能形容『超市』位置的词。",
        steps: [
          "1. 空格修饰「超市」，表示地方。",
          "2. 「附近的超市」最自然；远方/身边/下楼 不搭。",
        ],
        tip: "「附近」表示离得近的地方。",
      },
    },
    {
      id: "p3_zh_wa1rs_008",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
      q: "昨天，爸爸买了___花送给妈妈。",
      options: ["一根", "一片", "一条", "一束"],
      answer: 3, // (derived) 一束
      pinyin: "yí shù",
      meaning: "a bunch / a bouquet (of flowers) (一束)",
      solution: {
        method: "量词搭配：花的量词是「束」。",
        steps: [
          "1. 空格是花的量词。",
          "2. 一束花 = 一把花；根/片/条 都不配『花』。",
        ],
        tip: "花用「一束」，记住这个量词搭配。",
      },
    },
    {
      id: "p3_zh_wa1rs_009",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
      q: "大明用力一拉，___了小华的校服。",
      options: ["打破", "跌破", "刮破", "弄破"],
      answer: 3, // (derived) 弄破
      pinyin: "nòng pò",
      meaning: "to tear / damage sth (by handling) (弄破)",
      solution: {
        method: "动词辨析：用力『拉』使衣服破 → 「弄破」。",
        steps: [
          "1. 动作是『用力一拉』，对象是校服（布料）。",
          "2. 打破多用于易碎物；跌破指摔；刮破指被尖物刮；『弄破』最贴合拉扯。",
        ],
        tip: "『破』前的动词要看是怎么造成的。",
      },
    },
    {
      id: "p3_zh_wa1rs_010",
      topic: "CiYu",
      difficulty: "foundation",
      instruction: "从所提供的选择中选出正确的词语，然后把代表它的数目字填写在括号里。",
      q: "老师说他是个___的孩子，能在短时间想到好主意。",
      options: ["聪明", "懂事", "努力", "热情"],
      answer: 0, // (derived) 聪明
      pinyin: "cōng míng",
      meaning: "clever; smart (聪明)",
      solution: {
        method: "抓关键句：短时间想到好主意 → 脑筋灵。",
        steps: [
          "1. 「短时间想到好主意」说明反应快、脑筋好。",
          "2. 「聪明」最贴切；懂事/努力/热情 不对应这点。",
        ],
        tip: "脑筋好、点子多用「聪明」。",
      },
    },

    // =====================================================================
    // (三) 词语搭配 (Q11–Q15, 5 题 5 分) — matching (Type B, shared wordBank)
    //   answer = matched word TEXT from wordBank
    // =====================================================================
    {
      id: "p3_zh_wa1rs_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "词语搭配（三）",
      passage:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表词语的号码填写在括号里。每个选项只能用一次。",
      wordBank: ["改掉", "扔掉", "参观", "原谅", "受伤", "扶着", "参赛", "愿望"],
      questions: [
        {
          id: "p3_zh_wa1rs_011",
          type: "MCQ",
          q: "跌倒（ ＿＿ ）",
          answer: "受伤", // (derived) 跌倒受伤
          pinyin: "shòu shāng",
          meaning: "to be injured / hurt (受伤)",
          solution: {
            method: "动作结果搭配：跌倒之后会受伤。",
            steps: ["1. 「跌倒」后接结果。", "2. 跌倒受伤 = 摔倒后受了伤。"],
            tip: "跌倒 → 受伤，因果搭配。",
          },
        },
        {
          id: "p3_zh_wa1rs_012",
          type: "MCQ",
          q: "实现（ ＿＿ ）",
          answer: "愿望", // (derived) 实现愿望
          pinyin: "yuàn wàng",
          meaning: "wish; aspiration (愿望)",
          solution: {
            method: "动宾搭配：能被『实现』的是愿望/梦想。",
            steps: ["1. 「实现」后接目标。", "2. 实现愿望 = 把心愿做成。"],
            tip: "实现＋愿望/梦想/目标。",
          },
        },
        {
          id: "p3_zh_wa1rs_013",
          type: "MCQ",
          q: "（ ＿＿ ）画展",
          answer: "参观", // (derived) 参观画展
          pinyin: "cān guān",
          meaning: "to visit / view (an exhibition) (参观)",
          solution: {
            method: "动宾搭配：到展览实地观看用『参观』。",
            steps: ["1. 「画展」是展览。", "2. 参观画展 = 去看画展。"],
            tip: "参观＋展览/动物园等地方。",
          },
        },
        {
          id: "p3_zh_wa1rs_014",
          type: "MCQ",
          q: "（ ＿＿ ）坏习惯",
          answer: "改掉", // (derived) 改掉坏习惯
          pinyin: "gǎi diào",
          meaning: "to get rid of / break (a bad habit) (改掉)",
          solution: {
            method: "动宾搭配：把不好的习惯去除用『改掉』。",
            steps: ["1. 「坏习惯」需要去除。", "2. 改掉坏习惯 = 把坏习惯改正除去。"],
            tip: "改掉＋坏习惯/毛病。",
          },
        },
        {
          id: "p3_zh_wa1rs_015",
          type: "MCQ",
          q: "（ ＿＿ ）旧报纸",
          answer: "扔掉", // (derived) 扔掉旧报纸
          pinyin: "rēng diào",
          meaning: "to throw away (扔掉)",
          solution: {
            method: "动宾搭配：不要的东西丢弃用『扔掉』。",
            steps: ["1. 「旧报纸」是不要的东西。", "2. 扔掉旧报纸 = 把旧报纸丢掉。"],
            tip: "扔掉＋垃圾/旧东西。（剩余 原谅/扶着/参赛 不用）",
          },
        },
      ],
    },

    // =====================================================================
    // (四) 仿写句子 (Q16–Q18, 3 题 6 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1rs_016",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请利用括号里的词语，把两个句子改写成一个句子。（一……就……）",
      q: "闹钟响起来。我和弟弟起床。",
      answer: "闹钟一响起来，我和弟弟就起床。", // (derived) model answer
      pinyin: "yī…jiù…",
      meaning: "as soon as … (then) … (一……就……)",
      solution: {
        method: "关联词「一……就……」表示前后两件事紧接着发生。",
        steps: [
          "1. 前一件事前加「一」：闹钟一响起来。",
          "2. 后一件事前加「就」：就起床。",
        ],
        tip: "「一」放在第一个动作前，「就」放在第二个动作前。",
      },
    },
    {
      id: "p3_zh_wa1rs_017",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请利用括号里的词语，把两个句子改写成一个句子。（只要……就……）",
      q: "我每天早睡早起。我不会常常生病。",
      answer: "只要我每天早睡早起，我就不会常常生病。", // (derived) model answer
      pinyin: "zhǐ yào…jiù…",
      meaning: "as long as … (then) … (只要……就……)",
      solution: {
        method: "关联词「只要……就……」表示条件与结果。",
        steps: [
          "1. 条件句前加「只要」：只要我每天早睡早起。",
          "2. 结果句前加「就」：我就不会常常生病。",
        ],
        tip: "「只要」接条件，「就」接结果。",
      },
    },
    {
      id: "p3_zh_wa1rs_018",
      topic: "JuZi",
      difficulty: "foundation",
      instruction: "请利用括号里的词语，把两个句子改写成一个句子。（或者）",
      q: "爷爷可以读故事书。爷爷可以玩电脑。",
      answer: "爷爷可以读故事书或者玩电脑。", // (derived) model answer
      pinyin: "huò zhě",
      meaning: "or; either … or … (或者)",
      solution: {
        method: "用「或者」连接两种可以选择的做法。",
        steps: [
          "1. 两句主语相同（爷爷），合并时只留一个主语。",
          "2. 用「或者」连接两个动作：读故事书或者玩电脑。",
        ],
        tip: "主语相同时不必重复，用「或者」连接动作即可。",
      },
    },

    // =====================================================================
    // (五) 扩写句子 (Q19–Q20, 2 题 4 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1rs_019",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请利用括号里的词语扩写句子。（画得）",
      q: "文方画图很好看。",
      answer: "文方画图画得很好看。", // (derived) model answer
      pinyin: "huà de",
      meaning: "drew/draws (in such a way that) … (画得)",
      solution: {
        method: "扩写：用「画得」补出程度补语。",
        steps: [
          "1. 找到动词「画」。",
          "2. 加「得」引出『怎么样』：画得很好看。",
        ],
        tip: "动词＋「得」＋形容词，说明做得怎么样。",
      },
    },
    {
      id: "p3_zh_wa1rs_020",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请利用括号里的词语扩写句子。（细细的）",
      q: "过了一天，绿豆长出了根。",
      answer: "过了一天，绿豆长出了细细的根。", // (derived) model answer
      pinyin: "xì xì de",
      meaning: "thin; slender (细细的)",
      solution: {
        method: "扩写：把「细细的」放在名词「根」前作修饰。",
        steps: [
          "1. 找到要修饰的名词「根」。",
          "2. 在它前面加「细细的」：细细的根。",
        ],
        tip: "形容词＋「的」放在名词前面修饰。",
      },
    },
  ],
};

export default wa1_red_swastika;
