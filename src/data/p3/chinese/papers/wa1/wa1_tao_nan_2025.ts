// src/data/p3/chinese/papers/wa1_tao_nan_2025.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  道南学校 (TAO NAN SCHOOL)
//         2024 三年级高级华文补充作业（一） ｜ 范围：第一课至第二课 ｜ /45
//         辨字 5 + 汉语拼音 2 + 词语选择 4 + 词语搭配 5 + 改写句子 8
//         + 短文填空 4 + 阅读理解(选择) 8 + 理解问答 9 = 45 分
// ALL answers verified against the printed ANSWER KEY (道南学校 …补充作业（一）).
// Listening & long composition excluded as requested.
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
  // PeiDui matching: the matched word TEXT from `wordBank`.
  // TianKong cloze: the chosen word TEXT from `wordBank`.
  // OpenEnded: model answer text.
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

export const wa1_tao_nan: Paper = {
  meta: {
    id: "p3_zh_wa1_tao_nan_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    source: "Tao Nan School (道南学校) · 2024 三年级高级华文补充作业（一） · 第一课至第二课",
    totalMarks: 45,
    scope: "Lessons 1–2",
  },

  items: [
    // =====================================================================
    // 一、辨字测验 (Q1–Q5, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tn_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "姐姐___望长大后可以成为一名护士。",
      options: ["西", "希", "息", "吸"],
      answer: 1, // 希望
      pinyin: "xī wàng",
      meaning: "to hope; hope (希望)",
      solution: {
        method: "同音字辨析：选「希」组成「希望」。",
        steps: ["1. 「___望」表示心里的盼望。", "2. 西/息/吸 与「望」不成此义。"],
        tip: "「希望」是高频词，记住写法。",
      },
    },
    {
      id: "p3_zh_wa1tn_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "我相___你可以学会游泳。",
      options: ["位", "像", "住", "信"],
      answer: 3, // 相信
      pinyin: "xiāng xìn",
      meaning: "to believe; to trust (相信)",
      solution: {
        method: "同音/形近字辨析：选「信」组成「相信」。",
        steps: ["1. 「相___你能学会」是表示信任。", "2. 「相信」最合句意。"],
        tip: "相信 = 觉得是真的、信任。",
      },
    },
    {
      id: "p3_zh_wa1tn_003",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "同学们在课室里认真地___书。",
      options: ["说", "取", "读", "丢"],
      answer: 2, // 读书
      pinyin: "dú shū",
      meaning: "to read; to study (读书)",
      solution: {
        method: "动宾搭配：在课室里对着书本做的事是「读」。",
        steps: ["1. 对象是「书」。", "2. 「读书」最合理；说/取/丢 不对。"],
        tip: "读＋书＝读书。",
      },
    },
    {
      id: "p3_zh_wa1tn_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "妈妈每天都来学校___妹妹放学。",
      options: ["报", "打", "捉", "接"],
      answer: 3, // 接
      pinyin: "jiē",
      meaning: "to fetch / pick sb up (接)",
      solution: {
        method: "动词辨析：去学校带人回家用「接」。",
        steps: ["1. 「___妹妹放学」是去带妹妹回家。", "2. 「接」表示去把人接回；报/打/捉 不对。"],
        tip: "接人放学＝去把人接回来。",
      },
    },
    {
      id: "p3_zh_wa1tn_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "王老师叫同学们把课本___到第十页。",
      options: ["开", "翻", "张", "拿"],
      answer: 1, // 翻
      pinyin: "fān",
      meaning: "to turn / flip (pages) (翻)",
      solution: {
        method: "动词搭配：翻书页用「翻」。",
        steps: ["1. 「把课本___到第十页」是翻书。", "2. 「翻到第十页」最自然。"],
        tip: "翻书、翻页都用「翻」。",
      },
    },

    // =====================================================================
    // 二、汉语拼音 (Q6–Q7, 2 题 2 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tn_006",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节，把代表它的数字填写在括号里。",
      q: "叔叔不但长得高，身体也很「强壮」。",
      options: ["qiáng chuàn", "qiáng zhuàn", "qiáng chuàng", "qiáng zhuàng"],
      answer: 3, // qiáng zhuàng
      pinyin: "qiáng zhuàng",
      meaning: "strong; sturdy (强壮)",
      solution: {
        method: "区分声母 zh/ch 与韵母 -uang/-uan：壮(zhuàng)。",
        steps: ["1. 「壮」声母是 zh，不是 ch。", "2. 「壮」韵母是 -uang，读 zhuàng。"],
        tip: "壮＝zhuàng，注意是后鼻音 -ng。",
      },
    },
    {
      id: "p3_zh_wa1tn_007",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节，把代表它的数字填写在括号里。",
      q: "欢欢每天「努力」练习唱歌，终于在歌唱比赛中得了第一名。",
      options: ["lǔ lì", "lǔ nì", "nǔ lì", "nǔ nì"],
      answer: 2, // nǔ lì
      pinyin: "nǔ lì",
      meaning: "to work hard; diligent (努力)",
      solution: {
        method: "区分声母 n/l：努(nǔ)、力(lì)。",
        steps: ["1. 「努」声母是 n，读 nǔ。", "2. 「力」声母是 l，读 lì。"],
        tip: "n 与 l 开头要分清：努(n) 力(l)。",
      },
    },

    // =====================================================================
    // 三、词语选择 (Q8–Q11, 4 题 4 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tn_008",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "妈妈起床后，___会先去做早餐。",
      options: ["其实", "一定", "主要", "也是"],
      answer: 1, // 一定
      pinyin: "yí dìng",
      meaning: "certainly; definitely (一定)",
      solution: {
        method: "判断语气：表示每天都这样、必然如此。",
        steps: ["1. 句意是妈妈起床后『总会』做早餐。", "2. 「一定」表示必然；其实/主要/也是 不合。"],
        tip: "表示必然、肯定用「一定」。",
      },
    },
    {
      id: "p3_zh_wa1tn_009",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "班长小美很能干，是老师的好___。",
      options: ["帮手", "用人", "家人", "朋友"],
      answer: 0, // 帮手
      pinyin: "bāng shǒu",
      meaning: "helper; assistant (帮手)",
      solution: {
        method: "联系上下文：能干、能帮老师做事 → 帮手。",
        steps: ["1. 「能干」说明她常帮老师。", "2. 老师的好「帮手」最贴切。"],
        tip: "帮忙做事的人＝帮手。",
      },
    },
    {
      id: "p3_zh_wa1tn_010",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "为了___我的愿望，我每天都认真学习。",
      options: ["现在", "现实", "实现", "实在"],
      answer: 2, // 实现
      pinyin: "shí xiàn",
      meaning: "to realize / fulfil (a wish) (实现)",
      solution: {
        method: "动宾搭配：能跟「愿望」搭配的是「实现」。",
        steps: ["1. 宾语是「愿望」。", "2. 实现愿望＝把心愿做成；现在/现实/实在 不搭。"],
        tip: "实现＋愿望/梦想。",
      },
    },
    {
      id: "p3_zh_wa1tn_011",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "当老师提问的时候，小光___第一个举手回答。",
      options: ["不但", "从来", "也许", "总是"],
      answer: 3, // 总是
      pinyin: "zǒng shì",
      meaning: "always (总是)",
      solution: {
        method: "判断语气：每次都这样 → 「总是」。",
        steps: ["1. 「提问的时候，___第一个举手」表示每次都这样。", "2. 「总是」表示一向、每次都。"],
        tip: "一向、每次都用「总是」。",
      },
    },

    // =====================================================================
    // 四、词语搭配 (Q12–Q16, 5 题 5 分) — matching (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1tn_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "词语搭配（四）",
      passage:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1–6）填写在括号里。",
      wordBank: ["写字", "懂事", "华文", "成为", "国家", "争取"],
      questions: [
        {
          id: "p3_zh_wa1tn_012",
          type: "MCQ",
          q: "保卫（ ＿＿ ）",
          answer: "国家", // 保卫国家
          pinyin: "guó jiā",
          meaning: "country; nation (国家)",
          solution: {
            method: "动宾搭配：守护、抵御的对象是『国家』。",
            steps: ["1. 「保卫」是守护、抵御。", "2. 保卫国家＝守护国家。"],
            tip: "保卫＋国家/家园。",
          },
        },
        {
          id: "p3_zh_wa1tn_013",
          type: "MCQ",
          q: "（ ＿＿ ）歌手",
          answer: "成为", // 成为歌手
          pinyin: "chéng wéi",
          meaning: "to become (成为)",
          solution: {
            method: "动宾搭配：变成某种身份用『成为』。",
            steps: ["1. 「歌手」是一种身份。", "2. 成为歌手＝变成歌手。"],
            tip: "成为＋身份（老师/歌手/医生）。",
          },
        },
        {
          id: "p3_zh_wa1tn_014",
          type: "MCQ",
          q: "复习（ ＿＿ ）",
          answer: "华文", // 复习华文
          pinyin: "huá wén",
          meaning: "Chinese language (subject) (华文)",
          solution: {
            method: "动宾搭配：复习的对象是科目。",
            steps: ["1. 「复习」后接学科。", "2. 复习华文＝温习华文功课。"],
            tip: "复习＋科目（华文/数学）。",
          },
        },
        {
          id: "p3_zh_wa1tn_015",
          type: "MCQ",
          q: "（ ＿＿ ）时间",
          answer: "争取", // 争取时间
          pinyin: "zhēng qǔ",
          meaning: "to strive for; to make the most of (争取)",
          solution: {
            method: "动宾搭配：努力把握时间用『争取』。",
            steps: ["1. 「时间」宝贵需要把握。", "2. 争取时间＝努力把握时间。"],
            tip: "争取＋时间/机会。",
          },
        },
        {
          id: "p3_zh_wa1tn_016",
          type: "MCQ",
          q: "用心（ ＿＿ ）",
          answer: "写字", // 用心写字
          pinyin: "xiě zì",
          meaning: "to write (characters) (写字)",
          solution: {
            method: "状中搭配：认真地做的动作。",
            steps: ["1. 「用心」修饰一个动作。", "2. 用心写字＝认真地写字。（剩余 懂事 不用）"],
            tip: "用心＋动作（写字/读书）。",
          },
        },
      ],
    },

    // =====================================================================
    // 五、改写句子 (Q17–Q20, 4 题 8 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1tn_017",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（他）",
      q: "弟弟哭了。妈妈连忙去抱弟弟。",
      answer: "弟弟哭了，妈妈连忙去抱他。",
      pinyin: "tā",
      meaning: "he / him (他)",
      solution: {
        method: "代词替换：合并时把重复的「弟弟」改成代词「他」。",
        steps: ["1. 两句都提到「弟弟」。", "2. 第二次出现改用「他」，避免重复。"],
        tip: "同一个人第二次出现可用代词代替。",
      },
    },
    {
      id: "p3_zh_wa1tn_018",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（她）",
      q: "今天是小乐的生日。我送小乐一本故事书。",
      answer: "今天是小乐的生日，我送她一本故事书。",
      pinyin: "tā",
      meaning: "she / her (她)",
      solution: {
        method: "代词替换：女性用「她」代替重复的「小乐」。",
        steps: ["1. 「小乐」是女生。", "2. 第二次出现改用「她」。"],
        tip: "女性用「她」，男性用「他」。",
      },
    },
    {
      id: "p3_zh_wa1tn_019",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（只要……就……）",
      q: "我做完功课。我可以和弟弟一起玩。",
      answer: "我只要做完功课，就可以和弟弟一起玩。",
      pinyin: "zhǐ yào…jiù…",
      meaning: "as long as … then … (只要……就……)",
      solution: {
        method: "关联词「只要……就……」表示条件与结果。",
        steps: ["1. 条件：做完功课 → 前加「只要」。", "2. 结果：可以一起玩 → 前加「就」。"],
        tip: "只要（条件），就（结果）。",
      },
    },
    {
      id: "p3_zh_wa1tn_020",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（只要……就……）",
      q: "明天不下雨。妈妈一定会带我去公园玩。",
      answer: "只要明天不下雨，妈妈就一定会带我去公园玩。",
      pinyin: "zhǐ yào…jiù…",
      meaning: "as long as … then … (只要……就……)",
      solution: {
        method: "关联词「只要……就……」：把条件放前，结果放后。",
        steps: ["1. 条件：明天不下雨 → 前加「只要」。", "2. 结果：带我去公园玩 → 加「就」。"],
        tip: "「就」常放在主语之后、动词之前（妈妈就一定会……）。",
      },
    },

    // =====================================================================
    // 六、短文填空 (Q21–Q24, 4 题 4 分) — cloze (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1tn_set2",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "短文填空（六）",
      passage:
        "弟弟不喜欢做运动。他平时只喜欢坐在沙发上一面看电视节目，一面吃东西，(21)＿＿越来越胖。" +
        "我们一家人看了都非常担心。\n" +
        "一天，上体育课时，弟弟只跑了一会儿就要坐下来休息。他脸色发白，还一直说头疼。" +
        "老师看见了，(22)＿＿打电话叫妈妈来带弟弟去看医生。\n" +
        "医生为弟弟检查身体后，对妈妈说：“他太胖了，又不运动。(23)＿＿再这样下去，" +
        "他的身体会越来越多毛病的。”弟弟听了，非常害怕。\n" +
        "从那天起，弟弟每个星期天都会和爸爸到公园去做运动，身体也(24)＿＿变得强壮了。" +
        "我们见了，都为他感到开心。",
      wordBank: ["常常", "结果", "如果", "开始", "排队", "连忙"],
      questions: [
        {
          id: "p3_zh_wa1tn_021",
          type: "MCQ",
          q: "(21) 一面看电视，一面吃东西，＿＿越来越胖。",
          answer: "结果", // (2)
          pinyin: "jié guǒ",
          meaning: "as a result; outcome (结果)",
          solution: {
            method: "看因果：吃多不动 → 导致变胖。",
            steps: ["1. 前面是原因（爱吃不动）。", "2. 「结果」引出后果（越来越胖）。"],
            tip: "「结果」表示前因带来的后果。",
          },
        },
        {
          id: "p3_zh_wa1tn_022",
          type: "MCQ",
          q: "(22) 老师看见了，＿＿打电话叫妈妈来带弟弟去看医生。",
          answer: "连忙", // (6)
          pinyin: "lián máng",
          meaning: "hurriedly; at once (连忙)",
          solution: {
            method: "看情境：看见学生不舒服，赶紧打电话。",
            steps: ["1. 情况紧急（脸色发白、头疼）。", "2. 「连忙」表示赶紧、马上。"],
            tip: "急着做某事用「连忙」。",
          },
        },
        {
          id: "p3_zh_wa1tn_023",
          type: "MCQ",
          q: "(23) ＿＿再这样下去，他的身体会越来越多毛病。",
          answer: "如果", // (3)
          pinyin: "rú guǒ",
          meaning: "if (如果)",
          solution: {
            method: "看句式：表示假设的条件。",
            steps: ["1. 「___再这样下去……会……」是假设。", "2. 「如果」引出假设条件。"],
            tip: "假设、提条件用「如果」。",
          },
        },
        {
          id: "p3_zh_wa1tn_024",
          type: "MCQ",
          q: "(24) 弟弟做运动后，身体也＿＿变得强壮了。",
          answer: "开始", // (4)
          pinyin: "kāi shǐ",
          meaning: "to start; to begin (开始)",
          solution: {
            method: "看变化：从某个时间起出现改变。",
            steps: ["1. 「从那天起」做运动。", "2. 身体「开始」变强壮，表示改变的起点。（剩余 常常/排队 不用）"],
            tip: "表示变化的起点用「开始」。",
          },
        },
      ],
    },

    // =====================================================================
    // 七、阅读理解 (Q25–Q28, 4 题 8 分) — MCQ (Type B)
    // =====================================================================
    {
      id: "p3_zh_wa1tn_set3",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "阅读理解（七）",
      passage:
        "从前，有个卖肉的老人，心地很好。老人自己一个人住，便养了一只小狗帮他看门。\n" +
        "有一天，老人卖完肉回家，在路上发现一只快要饿死的小狼，就把小狼抱回家。\n" +
        "不久，小狗和小狼都长大了。它们天天跟老人去卖肉。一天，老人卖完肉，像平时一样带着它们回家。" +
        "当他们走到一棵大树下时，老人坐下来休息，没想到一会儿就睡着了。\n" +
        "天黑了，老人还没有醒来。这时，狗和狼都饿了。狼想吃掉主人，可是狗不同意。" +
        "它一边保护主人，一边大声叫，把老人给吵醒了。狼看见主人醒了，就马上逃走了。",
      questions: [
        {
          id: "p3_zh_wa1tn_025",
          type: "MCQ",
          q: "有一天，老人在路上发现了什么？",
          options: [
            "一只会看门的小狗。",
            "一只大声叫的小狗。",
            "一只快饿死的小狼。",
            "一只会卖肉的小狼。",
          ],
          answer: 2,
          pinyin: "è sǐ",
          meaning: "to starve (to death) (饿死)",
          solution: {
            method: "直接提取：第二段写出『在路上发现』的内容。",
            steps: ["1. 回到第二段。", "2. 找出『发现一只快要饿死的小狼』。"],
            tip: "题目说『路上发现』，对应第二段的句子。",
          },
        },
        {
          id: "p3_zh_wa1tn_026",
          type: "MCQ",
          q: "小狗和小狼长大后做什么？",
          options: [
            "天天帮老人看门。",
            "天天在树下睡觉。",
            "天天吃老人卖的肉。",
            "天天跟老人去卖肉。",
          ],
          answer: 3,
          pinyin: "mài ròu",
          meaning: "to sell meat (卖肉)",
          solution: {
            method: "直接提取：第三段第一句。",
            steps: ["1. 找『长大后』的句子。", "2. 「它们天天跟老人去卖肉」。"],
            tip: "抓住『长大后』这个时间词找答案。",
          },
        },
        {
          id: "p3_zh_wa1tn_027",
          type: "MCQ",
          q: "狼为什么想吃掉主人？",
          options: ["它想吃肉。", "它不想睡。", "它非常饿。", "它长大了。"],
          answer: 2,
          pinyin: "è",
          meaning: "hungry (饿)",
          solution: {
            method: "找原因：第四段说明当时的情况。",
            steps: ["1. 看第四段：『狗和狼都饿了』。", "2. 因为很饿，所以狼想吃掉主人。"],
            tip: "『为什么』题要在前后文找原因。",
          },
        },
        {
          id: "p3_zh_wa1tn_028",
          type: "MCQ",
          q: "从哪里可以看出老人的心地很好？",
          options: [
            "他把快要饿死的小狼卖掉。",
            "他把快要饿死的小狼抱回家。",
            "他让快要饿死的小狼吃掉主人。",
            "他让快要饿死的小狼在树下休息。",
          ],
          answer: 1,
          pinyin: "xīn dì hǎo",
          meaning: "kind-hearted (心地好)",
          solution: {
            method: "找证据：用老人的行为证明他善良。",
            steps: ["1. 第二段：老人把快饿死的小狼『抱回家』。", "2. 救助小动物 → 心地好。"],
            tip: "『从哪里看出』要找出具体行为作证据。",
          },
        },
      ],
    },

    // =====================================================================
    // 八、理解问答 (Q29–Q33, 5 题 9 分) — open-ended (Type B)
    // =====================================================================
    {
      id: "p3_zh_wa1tn_set4",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "理解问答（八）",
      passage:
        "“校车来了！校车来了！”同学们一面大声喊叫，一面向校车冲去。老师在后面提醒道：“大家请排队。”" +
        "可是同学们都没有听老师的话，有的还一直玩闹，追打身边的同学。\n" +
        "忽然，前面传来一阵哭声。老师马上跑上前去看发生了什么事。一名学生告诉老师，一些同学互相推挤，" +
        "结果把其中一个同学——美华给推倒了。美华的脚受伤了，还流了很多血。\n" +
        "老师听了非常生气，便告诉同学们：“如果你们不排好队，就别想准时回家了！”同学们听了老师的话，" +
        "都吓了一跳。大家静了下来，看着老师。这时，老师指着美华，说：“你们看，就因为大家不好好排队，" +
        "结果害同学跌倒受伤了。”同学们听了老师的话后，脸都红了起来。",
      questions: [
        {
          id: "p3_zh_wa1tn_029a",
          type: "OpenEnded",
          q: "文中形容“十分”的词语是：＿＿＿（1分）",
          answer: "非常",
          pinyin: "fēi cháng",
          meaning: "very; extremely (非常)",
          solution: {
            method: "近义词替换：在文中找表示『十分、很』的词。",
            steps: ["1. 找文中表示程度高的词。", "2. 「非常生气」中的「非常」＝十分。"],
            tip: "『十分』＝『非常』。",
          },
        },
        {
          id: "p3_zh_wa1tn_029b",
          type: "OpenEnded",
          q: "文中形容“说给人，使人知道”的词语是：＿＿＿（1分）",
          answer: "告诉",
          pinyin: "gào su",
          meaning: "to tell; to inform (告诉)",
          solution: {
            method: "释义找词：把意思转成文中的词语。",
            steps: ["1. 「说给人、让人知道」就是『告诉』。", "2. 文中有『告诉同学们』『告诉老师』。"],
            tip: "把解释还原成原文里的词语。",
          },
        },
        {
          id: "p3_zh_wa1tn_030",
          type: "OpenEnded",
          q: "看见校车来了，同学们都怎么做？（1分）",
          answer: "同学们一面大声喊叫，一面向校车冲去。",
          pinyin: "chōng",
          meaning: "to rush; to dash (冲)",
          solution: {
            method: "直接提取：第一段写出同学们的做法。",
            steps: ["1. 回到第一段开头。", "2. 抄出『一面大声喊叫，一面向校车冲去』。"],
            tip: "1 分题答案就在原文，照写关键句。",
          },
        },
        {
          id: "p3_zh_wa1tn_031",
          type: "OpenEnded",
          q: "美华跌倒的原因是什么？（2分）",
          answer: "一些同学互相推挤，结果把美华推倒了。",
          pinyin: "tuī jǐ",
          meaning: "to push and shove (推挤)",
          solution: {
            method: "找原因：第二段说明美华跌倒的经过。",
            steps: ["1. 看第二段。", "2. 因为同学『互相推挤』，把美华推倒了。"],
            tip: "『原因』题要找出『因为……』的事件。",
          },
        },
        {
          id: "p3_zh_wa1tn_032",
          type: "OpenEnded",
          q: "为什么同学们听了老师的话后会脸红？（2分）",
          answer:
            "因为同学们听了老师的话后，知道自己不好好排队，结果害得同学美华跌倒受伤，所以脸红了。",
          pinyin: "liǎn hóng",
          meaning: "to blush (with shame) (脸红)",
          solution: {
            method: "因果推断：脸红＝感到惭愧、不好意思。",
            steps: ["1. 老师指出是因为大家不排队害同学受伤。", "2. 同学们觉得惭愧，所以脸红。"],
            tip: "用『因为……所以脸红』把惭愧的原因写清楚。",
          },
        },
        {
          id: "p3_zh_wa1tn_033",
          type: "OpenEnded",
          q: "如果你看到美华被人推倒了，你会怎么做？（2分）",
          answer: "我会上前把她扶起来，再把她扶到办公室清洗伤口。",
          pinyin: "fú",
          meaning: "to help sb up; to support (扶)",
          solution: {
            method: "开放题：写出至少两个帮助美华的行为。",
            steps: ["1. 先写一个动作：把她扶起来。", "2. 再写一个动作：送去办公室清洗伤口。"],
            tip: "2 分开放题要写『两个』合理的帮助行为。",
          },
        },
      ],
    },
  ],
};

export default wa1_tao_nan;
