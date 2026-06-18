// src/data/p3/chinese/papers/wa1_tao_nan_maintest_2025.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  道南学校 (TAO NAN PRIMARY SCHOOL)
//         2025 Weighted Assessment 1 (本试卷) · 三年级高级华文 ｜ /45
//         辨字 5 + 汉语拼音 2 + 词语选择 4 + 词语搭配 5 + 改写/扩写句子 8
//         + 短文填空 4 + 阅读理解(选择) 8 + 理解问答 9 = 45 分
// ALL answers verified against the printed ANSWER KEY
// (SCHOOL: TAO NAN PRIMARY SCHOOL / 2025 WEIGHTED ASSESSMENT 1).
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

interface SingleQuestion {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: number | string;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

interface SetSubQuestion {
  id: string;
  type: "MCQ" | "OpenEnded";
  q: string;
  options?: string[];
  // MCQ: 0-based index into options.
  // PeiDui / TianKong: chosen word TEXT from wordBank.
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
    paperType: string;
    source: string;
    totalMarks: number;
    scope: string;
  };
  items: Question[];
}

// ---------------------------------------------------------------------------

export const wa1_tao_nan_maintest: Paper = {
  meta: {
    id: "p3_zh_wa1_tao_nan_maintest_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    paperType: "Tao Nan · 2025 Weighted Assessment 1 (本试卷)",
    source: "Tao Nan Primary School (道南学校) · 2025 三年级高级华文 Weighted Assessment 1",
    totalMarks: 45,
    scope: "Weighted Assessment 1 (Term 1)",
  },

  items: [
    // =====================================================================
    // 一、辨字测验 (Q1–Q5, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "这袋米太重了，奶奶一人___不动。",
      options: ["披", "排", "抖", "提"],
      answer: 3, // 提
      pinyin: "tí",
      meaning: "to lift / carry (by hand) (提)",
      solution: {
        method: "动词辨析：用手拎起重物用「提」。",
        steps: ["1. 「___不动」是拿不起来。", "2. 「提」表示用手拎；披/排/抖 不对。"],
        tip: "提东西的『提』，提手旁。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "同学们听了老师说的笑话，都___不住笑了。",
      options: ["忍", "念", "志", "忘"],
      answer: 0, // 忍不住
      pinyin: "rěn bú zhù",
      meaning: "cannot help (doing sth) (忍不住)",
      solution: {
        method: "同形旁辨析：选「忍」组成「忍不住」。",
        steps: ["1. 「___不住笑了」是控制不了。", "2. 「忍不住」最合句意；念/志/忘 不对。"],
        tip: "忍不住＝控制不了。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "小华常常在班上___负同学，大家都不喜欢他。",
      options: ["棋", "旗", "期", "欺"],
      answer: 3, // 欺负
      pinyin: "qī fu",
      meaning: "to bully (欺负)",
      solution: {
        method: "同音字辨析：选「欺」组成「欺负」。",
        steps: ["1. 「___负同学」是欺侮别人。", "2. 「欺负」最合句意；棋/旗/期 不对。"],
        tip: "欺负的『欺』。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_004",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "妈妈只___了妹妹几口饭，妹妹就说她饱了。",
      options: ["喂", "吹", "咬", "吐"],
      answer: 0, // 喂
      pinyin: "wèi",
      meaning: "to feed (喂)",
      solution: {
        method: "动词辨析：把饭送给别人吃用「喂」。",
        steps: ["1. 「___了妹妹几口饭」是给妹妹吃。", "2. 「喂」表示喂食；吹/咬/吐 不对。"],
        tip: "喂饭的『喂』。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "小熊___坑里倒水，直到水满了为止。",
      options: ["主", "往", "住", "注"],
      answer: 1, // 往
      pinyin: "wǎng",
      meaning: "towards; to (a place) (往)",
      solution: {
        method: "方位词辨析：朝着坑里用「往」。",
        steps: ["1. 「___坑里倒水」是朝坑里。", "2. 「往……里」表示方向；主/住/注 不对。"],
        tip: "往＋方向（往里/往前）。",
      },
    },

    // =====================================================================
    // 二、汉语拼音 (Q6–Q7, 2 题 2 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_006",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节，把代表它的数字填写在括号里。",
      q: "小丽买了一杯汽水，但忘了拿「吸管」。",
      options: ["sī guǎn", "xī guǎn", "sī guǎng", "xī guǎng"],
      answer: 1, // xī guǎn
      pinyin: "xī guǎn",
      meaning: "drinking straw (吸管)",
      solution: {
        method: "区分声母 s/x 与前后鼻音：吸(xī)、管(guǎn)。",
        steps: ["1. 「吸」声母是 x，读 xī。", "2. 「管」是前鼻音 -n，读 guǎn。"],
        tip: "吸管＝xī guǎn。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_007",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节，把代表它的数字填写在括号里。",
      q: "小明就住在学校「附近」，上学很方便。",
      options: ["fú jìn", "fù jìn", "fú jìng", "fù jìng"],
      answer: 1, // fù jìn
      pinyin: "fù jìn",
      meaning: "nearby; vicinity (附近)",
      solution: {
        method: "区分声调与前后鼻音：附(fù 第四声)、近(jìn 前鼻音)。",
        steps: ["1. 「附」读第四声 fù，不是 fú。", "2. 「近」是前鼻音 -n，读 jìn。"],
        tip: "附近＝fù jìn。",
      },
    },

    // =====================================================================
    // 三、词语选择 (Q8–Q11, 4 题 4 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_008",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "王老太太的儿女都在国外工作，只有她养的小猫___在她身边。",
      options: ["跟从", "保护", "陪伴", "招呼"],
      answer: 2, // 陪伴
      pinyin: "péi bàn",
      meaning: "to accompany; keep company (陪伴)",
      solution: {
        method: "判断词义：小猫长期相伴用「陪伴」。",
        steps: ["1. 儿女不在身边，只有小猫相伴。", "2. 「陪伴在身边」最合句意。"],
        tip: "长期作伴用「陪伴」。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_009",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "小明突然不来学校上课，同学们都感到很___。",
      options: ["吃惊", "满意", "兴奋", "快活"],
      answer: 0, // 吃惊
      pinyin: "chī jīng",
      meaning: "surprised; astonished (吃惊)",
      solution: {
        method: "判断情绪：意外的事让人「吃惊」。",
        steps: ["1. 「突然不来上课」是意外的事。", "2. 「吃惊」表示惊讶；满意/兴奋/快活 不合。"],
        tip: "意外、惊讶用「吃惊」。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_010",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "___时间还早，你吃了晚餐后才回家。",
      options: ["除了", "假如", "只要", "反正"],
      answer: 3, // 反正
      pinyin: "fǎn zhèng",
      meaning: "anyway; in any case (反正)",
      solution: {
        method: "判断关联：表示『无论如何、横竖』时间还早。",
        steps: ["1. 「___时间还早」表示既然时间还早。", "2. 「反正」表示无论如何；除了/假如/只要 不合。"],
        tip: "「反正」＝无论如何、横竖。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_011",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "经过___后，大家都同意让小丽当班长。",
      options: ["说明", "讨论", "指定", "请求"],
      answer: 1, // 讨论
      pinyin: "tǎo lùn",
      meaning: "to discuss (讨论)",
      solution: {
        method: "判断词义：大家一起商议用「讨论」。",
        steps: ["1. 「经过___后，大家都同意」是共同商议。", "2. 「讨论」最合句意。"],
        tip: "大家一起商议用「讨论」。",
      },
    },

    // =====================================================================
    // 四、词语搭配 (Q12–Q16, 5 题 5 分) — matching (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "词语搭配（四）",
      passage:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1–6）填写在括号里。",
      wordBank: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
      questions: [
        {
          id: "p3_zh_wa1tnwa_012",
          type: "MCQ",
          q: "（ ＿＿ ）复习",
          answer: "认真", // 认真复习
          pinyin: "rèn zhēn",
          meaning: "earnest; serious (认真)",
          solution: {
            method: "状中搭配：用心地复习。",
            steps: ["1. 「复习」前接态度词。", "2. 认真复习＝用心温习。"],
            tip: "认真＋做某事（复习/学习）。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_013",
          type: "MCQ",
          q: "（ ＿＿ ）身体",
          answer: "摆动", // 摆动身体
          pinyin: "bǎi dòng",
          meaning: "to sway / move (the body) (摆动)",
          solution: {
            method: "动宾搭配：让身体左右动用『摆动』。",
            steps: ["1. 「身体」可以左右摆动。", "2. 摆动身体＝晃动身体。"],
            tip: "摆动＋身体。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_014",
          type: "MCQ",
          q: "轻声（ ＿＿ ）",
          answer: "说话", // 轻声说话
          pinyin: "shuō huà",
          meaning: "to speak; to talk (说话)",
          solution: {
            method: "状中搭配：小声地说。",
            steps: ["1. 「轻声」修饰一个动作。", "2. 轻声说话＝小声地说话。"],
            tip: "轻声＋说话。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_015",
          type: "MCQ",
          q: "爱护（ ＿＿ ）",
          answer: "宠物", // 爱护宠物
          pinyin: "chǒng wù",
          meaning: "pet (宠物)",
          solution: {
            method: "动宾搭配：疼爱、照顾的对象。",
            steps: ["1. 「爱护」后接被照顾的对象。", "2. 爱护宠物＝好好照顾宠物。"],
            tip: "爱护＋宠物/花草/环境。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_016",
          type: "MCQ",
          q: "参加（ ＿＿ ）",
          answer: "比赛", // 参加比赛
          pinyin: "bǐ sài",
          meaning: "competition; contest (比赛)",
          solution: {
            method: "动宾搭配：报名加入的活动。",
            steps: ["1. 「参加」后接活动。", "2. 参加比赛＝加入比赛。（剩余 国家 不用）"],
            tip: "参加＋比赛/活动。",
          },
        },
      ],
    },

    // =====================================================================
    // 五、改写句子 + 扩写句子 (Q17–Q20, 4 题 8 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_017",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（却）",
      q: "妹妹想要养小猫。妹妹不懂得怎么照顾小猫。",
      answer: "妹妹想要养小猫，却不懂得怎么照顾小猫。",
      pinyin: "què",
      meaning: "but; yet (却)",
      solution: {
        method: "用「却」表示转折，并省去重复的主语。",
        steps: ["1. 前句：妹妹想要养小猫。", "2. 用「却」引出相反情况：却不懂得怎么照顾（省去重复的『妹妹/小猫』）。"],
        tip: "「却」表示『可是、然而』的转折。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_018",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（虽然……但是……）",
      q: "刚下了一场雨。天气还是很热。",
      answer: "虽然刚下了一场雨，但是天气还是很热。",
      pinyin: "suī rán…dàn shì…",
      meaning: "although … but … (虽然……但是……)",
      solution: {
        method: "关联词「虽然……但是……」表示转折。",
        steps: ["1. 前句前加「虽然」：虽然刚下了一场雨。", "2. 后句前加「但是」：但是天气还是很热。"],
        tip: "虽然（事实），但是（相反结果）。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_019",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的短语扩写句子。（偷偷地）",
      q: "上课时，小文拿出一本漫画书来读。",
      answer: "上课时，小文偷偷地拿出一本漫画书来读。",
      pinyin: "tōu tōu de",
      meaning: "secretly; stealthily (偷偷地)",
      solution: {
        method: "扩写：把「偷偷地」放在动词「拿出」前作修饰。",
        steps: ["1. 找到动作「拿出」。", "2. 在动作前加「偷偷地」。"],
        tip: "「……地」放在动词前，说明怎样做。",
      },
    },
    {
      id: "p3_zh_wa1tnwa_020",
      topic: "JuZi",
      difficulty: "stretch",
      instruction: "请用括号里的短语扩写句子。（不知不觉）",
      q: "爷爷坐在沙发上看电视，结果睡着了。",
      answer: "爷爷坐在沙发上看电视，结果不知不觉睡着了。",
      pinyin: "bù zhī bù jué",
      meaning: "unconsciously; without realizing (不知不觉)",
      solution: {
        method: "扩写：把「不知不觉」放在「睡着了」前。",
        steps: ["1. 找到结果「睡着了」。", "2. 在前面加「不知不觉」，表示自己没察觉。"],
        tip: "「不知不觉」形容在没察觉的情况下发生。",
      },
    },

    // =====================================================================
    // 六、短文填空 (Q21–Q24, 4 题 4 分) — cloze (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_set2",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "短文填空（六）",
      passage:
        "阿强到城里去买东西，在路上碰到了坏人。坏人不但把他打伤，还抢走了他的钱，把他丢下后就(21)＿＿了。\n" +
        "过了不久，一个商人路过，见阿强受伤了，不想上前帮他，马上走掉了。\n" +
        "后来，一个农夫看见阿强躺在地上，便(22)＿＿走上前去，把他扶回家。农夫帮阿强把伤口(23)＿＿干净，" +
        "然后让他躺在床上休息。\n" +
        "第二天一早，农夫出门前，想到阿强会肚子饿，便把食物(24)＿＿好了才去种田。" +
        "阿强起身看见桌上的食物，感动得流下了眼泪。",
      wordBank: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
      questions: [
        {
          id: "p3_zh_wa1tnwa_021",
          type: "MCQ",
          q: "(21) 坏人把他丢下后就＿＿了。",
          answer: "逃走", // (5)
          pinyin: "táo zǒu",
          meaning: "to flee; run away (逃走)",
          solution: {
            method: "看情节：坏人做了坏事后跑掉。",
            steps: ["1. 坏人抢钱后离开。", "2. 「逃走」表示做坏事后跑掉。"],
            tip: "做坏事后跑掉用「逃走」。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_022",
          type: "MCQ",
          q: "(22) 农夫看见阿强躺在地上，便＿＿走上前去。",
          answer: "急忙", // (1)
          pinyin: "jí máng",
          meaning: "hurriedly; in a hurry (急忙)",
          solution: {
            method: "看情境：看见有人受伤，赶紧上前。",
            steps: ["1. 阿强受伤躺在地上。", "2. 农夫「急忙」赶紧上前帮忙。"],
            tip: "赶紧、匆忙用「急忙」。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_023",
          type: "MCQ",
          q: "(23) 农夫帮阿强把伤口＿＿干净。",
          answer: "清洗", // (4)
          pinyin: "qīng xǐ",
          meaning: "to wash / clean (清洗)",
          solution: {
            method: "动补搭配：把伤口洗到『干净』。",
            steps: ["1. 「把伤口___干净」是清洗。", "2. 清洗干净＝洗得干净。"],
            tip: "清洗＋干净。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_024",
          type: "MCQ",
          q: "(24) 农夫把食物＿＿好了才去种田。",
          answer: "准备", // (2)
          pinyin: "zhǔn bèi",
          meaning: "to prepare; get ready (准备)",
          solution: {
            method: "动宾搭配：事先把食物弄好。",
            steps: ["1. 「把食物___好」是事先弄好。", "2. 「准备」最合句意。（剩余 清洁/出发 不用）"],
            tip: "准备＋食物/东西。",
          },
        },
      ],
    },

    // =====================================================================
    // 七、阅读理解 (Q25–Q28, 4 题 8 分) — MCQ (Type B)
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_set3",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "阅读理解（七）",
      passage:
        "王伯伯开了一家餐馆。他很热心，煮的食物也很美味。客人们都喜欢吃王伯伯的炒饭，因此餐馆外面常常有很多人在排队。\n" +
        "一天下午，一个老奶奶带着一个男孩走进了餐馆。老奶奶点了一盘炒饭。她把炒饭放到男孩的面前，让他自己吃。" +
        "男孩小声地问老奶奶：“奶奶，您不喜欢吃炒饭吗？”老奶奶笑着对他说：“我不饿。”王伯伯看见了，又炒了一盘炒饭给老奶奶，" +
        "对她说：“您是我们今天的第一百个客人，这两盘炒饭是送给你们的。”老奶奶听了，连声向王伯伯道谢，然后就和男孩一起吃炒饭。\n" +
        "第二天早上，王伯伯正在休息时，看到男孩坐在餐馆外面。男孩每看见一个客人走进店里，就把一块小石头放进他在地上画的圆圈里。" +
        "午餐时间都快过了，男孩数了数，小石头却连五十个都不到。王伯伯想了想，就开始打电话给他的朋友们，把这件事告诉他们，" +
        "问他们有没有空来餐馆吃饭。\n" +
        "客人们一个一个地走进餐馆，当第九十九块小石头被放进圆圈里后，男孩立刻站了起来，走进餐馆点了一包炒饭。" +
        "王伯伯笑着把两包炒饭送给男孩，让他带回家和奶奶吃。",
      questions: [
        {
          id: "p3_zh_wa1tnwa_025",
          type: "MCQ",
          q: "为什么很多客人在王伯伯的餐馆外面排队？",
          options: [
            "客人要向王伯伯道谢。",
            "客人要请王伯伯吃午餐。",
            "客人觉得王伯伯很热心。",
            "客人喜欢王伯伯煮的食物。",
          ],
          answer: 3, // 客人喜欢王伯伯煮的食物
          pinyin: "pái duì",
          meaning: "to queue up (排队)",
          solution: {
            method: "找原因：第一段说明排队的原因。",
            steps: ["1. 「煮的食物很美味，客人都喜欢吃」。", "2. 所以很多人排队。"],
            tip: "排队的原因＝食物好吃。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_026",
          type: "MCQ",
          q: "为什么男孩把石头放进他画的圆圈里？",
          options: [
            "他要把石头送给他的朋友。",
            "他要把石头带回家给奶奶看。",
            "他要数五十个石头才有炒饭吃。",
            "他要数有几个客人走进餐馆吃饭。",
          ],
          answer: 3, // 他要数有几个客人走进餐馆吃饭
          pinyin: "shǔ",
          meaning: "to count (数)",
          solution: {
            method: "理解行为：每来一个客人放一块石头 → 在数客人。",
            steps: ["1. 「每看见一个客人……就放一块石头」。", "2. 这是在数走进餐馆的客人。"],
            tip: "一个客人对一块石头，是在『数客人』。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_027",
          type: "MCQ",
          q: "王伯伯打电话给他的朋友们的原因是什么？",
          options: [
            "他想要朋友们去他的餐馆休息。",
            "他想请朋友们帮助男孩得到炒饭。",
            "他想知道朋友们喜不喜欢吃他的炒饭。",
            "他想让朋友们知道自己开了一家餐馆。",
          ],
          answer: 1, // 他想请朋友们帮助男孩得到炒饭
          pinyin: "bāng zhù",
          meaning: "to help (帮助)",
          solution: {
            method: "联系上下文：男孩要数够客人才点炒饭。",
            steps: [
              "1. 男孩要数够客人才会点炒饭，可是客人不够。",
              "2. 王伯伯叫朋友来吃饭，是想帮男孩凑够客人。",
            ],
            tip: "结合男孩的目的，推断王伯伯打电话是为了帮他。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_028",
          type: "MCQ",
          q: "以下哪一个句子是对的？",
          options: [
            "老奶奶不喜欢吃炒饭。",
            "男孩想买炒饭给奶奶吃。",
            "王伯伯送给男孩两包炒饭。",
            "朋友们都没空到餐馆来吃饭。",
          ],
          answer: 2, // 王伯伯送给男孩两包炒饭
          pinyin: "sòng",
          meaning: "to give (as a gift) (送)",
          solution: {
            method: "逐项核对原文。",
            steps: [
              "1. 文末：王伯伯把两包炒饭送给男孩 → (3) 正确。",
              "2. 老奶奶说『我不饿』是不想花钱；朋友们有来吃饭。",
            ],
            tip: "判断对错题要回原文逐句核对。",
          },
        },
      ],
    },

    // =====================================================================
    // 八、理解问答 (Q29–Q33, 5 题 9 分) — open-ended (Type B)
    // =====================================================================
    {
      id: "p3_zh_wa1tnwa_set4",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "理解问答（八）",
      passage:
        "每天放学后，立明一做完功课，就出门卖纸巾。一天，他走到一家书店门口，发现一位女士带着一个小女孩正要走进书店，" +
        "就走上前对她们说：“请买两包纸巾吧，只要一元钱。”女士听了，笑着摇摇头。接着，立明又说：" +
        "“我的爸爸生病了，妈妈一个人做工，白天帮人家洗衣服，晚上到工厂上班。请您买两包纸巾帮帮我吧。”" +
        "女士听了，拿出五元钱给立明，向他买了两包纸巾。立明说：“我身上的钱不够，没办法找钱给您，我现在就回家去拿钱。”" +
        "女士说：“你先拿着这些钱吧。我相信你一定会回来的。”立明听了，接过钱就立刻跑回家。\n" +
        "小女孩指着立明对女士说：“妈妈，我们不认识他，如果他不回来了，怎么办？”女士听了，笑着说：" +
        "“我相信他会回来的。我们进去买书吧。”\n" +
        "立明回家拿了钱，马上跑回书店。半路上突然下起了大雨，地上很滑，立明不小心跌倒受伤，脚流了很多血。" +
        "他走到书店门口，看到女士和小女孩正从书店里走出来，就走上前把钱还给女士。女士看到立明的脚在流血，" +
        "关心地问他发生了什么事。立明笑着说：“我没事，谢谢您这么相信我。”说完，他就转身离开了。",
      questions: [
        {
          id: "p3_zh_wa1tnwa_029a",
          type: "OpenEnded",
          q: "文中形容“发觉”的词语是：＿＿＿（1分）",
          answer: "发现",
          pinyin: "fā xiàn",
          meaning: "to discover; to notice (发现)",
          solution: {
            method: "近义词替换：把『发觉』换成文中的词。",
            steps: ["1. 「发觉」＝察觉、看到。", "2. 文中『发现一位女士……』中的『发现』。"],
            tip: "发觉＝发现。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_029b",
          type: "OpenEnded",
          q: "文中形容“跟人、物或地方分开”的词语是：＿＿＿（1分）",
          answer: "离开",
          pinyin: "lí kāi",
          meaning: "to leave; to depart (离开)",
          solution: {
            method: "释义找词：把解释还原成文中的词。",
            steps: ["1. 「跟人、物或地方分开」就是『离开』。", "2. 文末『他就转身离开了』。"],
            tip: "分开、走开＝离开。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_030",
          type: "OpenEnded",
          q: "每天放学后，立明会做什么？（1分）",
          answer: "立明一做完功课，就出门卖纸巾。",
          pinyin: "mài zhǐ jīn",
          meaning: "to sell tissue packets (卖纸巾)",
          solution: {
            method: "直接提取：第一段开头说明。",
            steps: ["1. 回到第一段第一句。", "2. 抄出『一做完功课，就出门卖纸巾』。"],
            tip: "1 分题答案就在原文。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_031",
          type: "OpenEnded",
          q: "那位女士为什么决定帮助立明？（2分）",
          answer:
            "因为立明告诉那位女士，他的爸爸生病了，妈妈一个人做工，白天帮人家洗衣服，晚上到工厂上班。",
          pinyin: "bāng zhù",
          meaning: "to help (帮助)",
          solution: {
            method: "找原因：立明说的话打动了女士。",
            steps: ["1. 看立明对女士说的话。", "2. 因为他家境困难（爸爸生病、妈妈辛苦做工）。"],
            tip: "原因藏在人物说的话里。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_032",
          type: "OpenEnded",
          q: "立明的脚流血的原因是什么？（2分）",
          answer:
            "因为立明跑回书店时，半路突然下起了大雨，地上很滑，他不小心跌倒受伤，脚流了很多血。",
          pinyin: "diē dǎo",
          meaning: "to fall down; to trip (跌倒)",
          solution: {
            method: "找原因：第三段说明跌倒受伤的经过。",
            steps: ["1. 半路下大雨，地上很滑。", "2. 立明不小心跌倒受伤，所以脚流血。"],
            tip: "把『下雨→地滑→跌倒受伤』连起来作答。",
          },
        },
        {
          id: "p3_zh_wa1tnwa_033",
          type: "OpenEnded",
          q: "你觉得立明是个怎样的孩子？为什么？（2分）",
          answer:
            "我觉得立明是个守信用、诚实的好孩子。因为他答应会把多的钱还给女士，虽然在路上跌倒受伤，但他仍然走到书店门口把钱还给女士。",
          pinyin: "shǒu xìn yòng",
          meaning: "to keep one's word; trustworthy (守信用)",
          solution: {
            method: "分两部分作答：先评价，再从文中举例说明。",
            steps: [
              "1. 前半题：我觉得立明是个守信用、诚实的好孩子。",
              "2. 后半题：从文中举例——他受伤了仍坚持把钱还给女士。",
            ],
            tip: "『怎样的孩子？为什么？』要分开答：评价＋文中事例。",
          },
        },
      ],
    },
  ],
};

export default wa1_tao_nan_maintest;
