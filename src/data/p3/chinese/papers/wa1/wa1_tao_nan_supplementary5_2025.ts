// src/data/p3/chinese/papers/wa1_tao_nan_supplementary5_2025.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  道南学校 (TAO NAN SCHOOL)
//         三年级高级华文补充作业（五） ｜ 范围：第九课至第十课 ｜ /45
//         辨字 5 + 汉语拼音 2 + 词语选择 4 + 词语搭配 5 + 改写句子 8
//         + 短文填空 4 + 阅读理解(选择) 8 + 理解问答 9 = 45 分
// ALL answers verified against the printed ANSWER KEY (道南学校 补充作业（五）).
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
  answer: number | string; // MCQ: 0-based index ｜ open: text
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

export const wa1_tao_nan_supplementary5: Paper = {
  meta: {
    id: "p3_zh_wa1_tao_nan_supplementary5_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    paperType: "Tao Nan · 补充作业（五） (Supplementary 5)",
    source: "Tao Nan School (道南学校) · 三年级高级华文补充作业（五） · 第九课至第十课",
    totalMarks: 45,
    scope: "Lessons 9–10",
  },

  items: [
    // =====================================================================
    // 一、辨字测验 (Q1–Q5, 5 题 5 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "弟弟把一片叶子当作小船放进___里。",
      options: ["可", "何", "河", "阿"],
      answer: 2, // 河
      pinyin: "hé",
      meaning: "river (河)",
      solution: {
        method: "形近字辨析：放小船的水流是「河」。",
        steps: ["1. 「放进___里」是放进水里。", "2. 三点水的「河」表示河流；可/何/阿 不对。"],
        tip: "三点水「河」与水有关。",
      },
    },
    {
      id: "p3_zh_wa1tns5_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "我们应该爱护___境清洁，不乱丢垃圾。",
      options: ["杯", "环", "怀", "坏"],
      answer: 1, // 环境
      pinyin: "huán jìng",
      meaning: "environment (环境)",
      solution: {
        method: "同音/形近字辨析：选「环」组成「环境」。",
        steps: ["1. 「爱护___境清洁」是保护环境。", "2. 「环境」最合句意；杯/怀/坏 不对。"],
        tip: "环境的『环』。",
      },
    },
    {
      id: "p3_zh_wa1tns5_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "每天早上，太阳都会从东边___上来。",
      options: ["举", "走", "升", "飞"],
      answer: 2, // 升
      pinyin: "shēng",
      meaning: "to rise (升)",
      solution: {
        method: "动词辨析：太阳从东边「升」上来。",
        steps: ["1. 描述太阳上升的动作。", "2. 「升」表示往上升；举/走/飞 不对。"],
        tip: "太阳升起的『升』。",
      },
    },
    {
      id: "p3_zh_wa1tns5_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "爸爸先把车子___好，才来餐厅找我们。",
      options: ["位", "休", "付", "停"],
      answer: 3, // 停
      pinyin: "tíng",
      meaning: "to park; to stop (停)",
      solution: {
        method: "动词辨析：把车子「停」好。",
        steps: ["1. 「把车子___好」是停车。", "2. 「停」表示停放；位/休/付 不对。"],
        tip: "停车的『停』。",
      },
    },
    {
      id: "p3_zh_wa1tns5_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "哥哥的水壶坏了，他把水壶___掉。",
      options: ["拔", "打", "扔", "拍"],
      answer: 2, // 扔
      pinyin: "rēng",
      meaning: "to throw away (扔)",
      solution: {
        method: "动词辨析：坏了的东西「扔」掉。",
        steps: ["1. 水壶坏了要丢弃。", "2. 「扔掉」表示丢掉；拔/打/拍 不对。"],
        tip: "扔掉＝丢掉。",
      },
    },

    // =====================================================================
    // 二、汉语拼音 (Q6–Q7, 2 题 2 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_006",
      topic: "PinYin",
      difficulty: "stretch",
      instruction: "根据句子中划线的词语，选出正确的音节，把代表它的数字填写在括号里。",
      q: "哥哥想到了一个方法来称这块石头的「重量」。",
      options: ["zhòng liàng", "zhòng liáng", "chóng liáng", "chóng liàng"],
      answer: 0, // zhòng liàng
      pinyin: "zhòng liàng",
      meaning: "weight (重量)",
      solution: {
        method: "多音字辨析：重(zhòng 重量／chóng 重复)、量(liàng 数量／liáng 测量)。",
        steps: [
          "1. 表示『有多重』时「重」读 zhòng。",
          "2. 「重量」的「量」是名词，读 liàng。",
        ],
        tip: "重量＝zhòng liàng；『重复』才读 chóng。",
      },
    },
    {
      id: "p3_zh_wa1tns5_007",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节，把代表它的数字填写在括号里。",
      q: "妈妈习惯用「竹竿」来晾衣服。",
      options: ["zú gān", "zú gāng", "zhú gān", "zhú gāng"],
      answer: 2, // zhú gān
      pinyin: "zhú gān",
      meaning: "bamboo pole (竹竿)",
      solution: {
        method: "区分声母 z/zh 与前后鼻音：竹(zhú)、竿(gān)。",
        steps: ["1. 「竹」声母是 zh，读 zhú。", "2. 「竿」是前鼻音 -n，读 gān。"],
        tip: "竹竿＝zhú gān。",
      },
    },

    // =====================================================================
    // 三、词语选择 (Q8–Q11, 4 题 4 分) — MCQ
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_008",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "只要___书上的方法去做，就能做出好吃的蛋糕。",
      options: ["听从", "按照", "答应", "想象"],
      answer: 1, // 按照
      pinyin: "àn zhào",
      meaning: "according to; in accordance with (按照)",
      solution: {
        method: "动宾搭配：依照方法去做用「按照」。",
        steps: ["1. 「___书上的方法去做」是依照方法。", "2. 「按照方法」最合句意。"],
        tip: "按照＋方法/规定。",
      },
    },
    {
      id: "p3_zh_wa1tns5_009",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "刮大风的时候，院子里的小树会不停地___。",
      options: ["变化", "下沉", "摇摆", "活动"],
      answer: 2, // 摇摆
      pinyin: "yáo bǎi",
      meaning: "to sway; to rock (摇摆)",
      solution: {
        method: "判断动作：大风吹，小树左右「摇摆」。",
        steps: ["1. 大风中小树会左右摆动。", "2. 「摇摆」最合句意；变化/下沉/活动 不对。"],
        tip: "被风吹得来回摆动用「摇摆」。",
      },
    },
    {
      id: "p3_zh_wa1tns5_010",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "小丽想到一个好___，把掉进坑里的小狗救了上来。",
      options: ["说法", "看法", "办法", "做法"],
      answer: 2, // 办法
      pinyin: "bàn fǎ",
      meaning: "method; way (to solve a problem) (办法)",
      solution: {
        method: "判断词义：解决问题的方法是「办法」。",
        steps: ["1. 「好___」用来救小狗，是解决问题的方法。", "2. 「办法」最合句意。"],
        tip: "解决问题用「办法」。",
      },
    },
    {
      id: "p3_zh_wa1tns5_011",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个，把代表它的数字填写在括号里。",
      q: "姐姐想了一个晚上，终于___出国读书。",
      options: ["想象", "建议", "觉得", "决定"],
      answer: 3, // 决定
      pinyin: "jué dìng",
      meaning: "to decide (决定)",
      solution: {
        method: "判断词义：想了很久后下定主意用「决定」。",
        steps: ["1. 「想了一个晚上，终于___」是做出选择。", "2. 「决定出国」最合句意。"],
        tip: "考虑后做出选择用「决定」。",
      },
    },

    // =====================================================================
    // 四、词语搭配 (Q12–Q16, 5 题 5 分) — matching (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "词语搭配（四）",
      passage:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1–6）填写在括号里。",
      wordBank: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
      questions: [
        {
          id: "p3_zh_wa1tns5_012",
          type: "MCQ",
          q: "保持（ ＿＿ ）",
          answer: "健康", // 保持健康
          pinyin: "jiàn kāng",
          meaning: "healthy; health (健康)",
          solution: {
            method: "动宾搭配：保持身体好的状态。",
            steps: ["1. 「保持」后接一种状态。", "2. 保持健康＝维持身体好。"],
            tip: "保持＋健康/清洁。",
          },
        },
        {
          id: "p3_zh_wa1tns5_013",
          type: "MCQ",
          q: "（ ＿＿ ）客人",
          answer: "招呼", // 招呼客人
          pinyin: "zhāo hu",
          meaning: "to greet / attend to (guests) (招呼)",
          solution: {
            method: "动宾搭配：接待客人用『招呼』。",
            steps: ["1. 「客人」需要接待。", "2. 招呼客人＝接待客人。"],
            tip: "招呼＋客人。",
          },
        },
        {
          id: "p3_zh_wa1tns5_014",
          type: "MCQ",
          q: "转身（ ＿＿ ）",
          answer: "离开", // 转身离开
          pinyin: "lí kāi",
          meaning: "to leave (离开)",
          solution: {
            method: "连动搭配：转过身然后『离开』。",
            steps: ["1. 「转身」后接下一个动作。", "2. 转身离开＝转过身走开。"],
            tip: "转身＋离开。",
          },
        },
        {
          id: "p3_zh_wa1tns5_015",
          type: "MCQ",
          q: "（ ＿＿ ）干净",
          answer: "清洗", // 清洗干净
          pinyin: "qīng xǐ",
          meaning: "to wash clean (清洗)",
          solution: {
            method: "动补搭配：洗到『干净』。",
            steps: ["1. 「干净」是结果。", "2. 清洗干净＝洗得干净。"],
            tip: "清洗＋干净。",
          },
        },
        {
          id: "p3_zh_wa1tns5_016",
          type: "MCQ",
          q: "想出（ ＿＿ ）",
          answer: "办法", // 想出办法
          pinyin: "bàn fǎ",
          meaning: "method; way (办法)",
          solution: {
            method: "动宾搭配：动脑筋得到『办法』。",
            steps: ["1. 「想出」后接结果。", "2. 想出办法＝动脑筋找到方法。（剩余 冲凉 不用）"],
            tip: "想出＋办法/主意。",
          },
        },
      ],
    },

    // =====================================================================
    // 五、改写句子 (Q17–Q20, 4 题 8 分) — open-ended
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_017",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（因为）",
      q: "今天我们不能去外婆的家。今天下雨了。",
      answer: "今天我们不能去外婆的家，因为下雨了。",
      pinyin: "yīn wèi",
      meaning: "because (因为)",
      solution: {
        method: "用「因为」连接结果与原因。",
        steps: ["1. 结果：不能去外婆家。", "2. 用「因为」引出原因：因为下雨了。"],
        tip: "因为后面接原因；重复的『今天』可省去一个。",
      },
    },
    {
      id: "p3_zh_wa1tns5_018",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语，把两个句子改写成一个句子。（因为）",
      q: "在图书馆里大声说话是不对的。在图书馆里大声说话会吵到别人。",
      answer: "在图书馆里大声说话是不对的，因为会吵到别人。",
      pinyin: "yīn wèi",
      meaning: "because (因为)",
      solution: {
        method: "用「因为」连接结论与理由，并省去重复部分。",
        steps: [
          "1. 结论：在图书馆大声说话是不对的。",
          "2. 用「因为」引出理由：因为会吵到别人（重复的部分省略）。",
        ],
        tip: "合并时把重复的『在图书馆里大声说话』省掉。",
      },
    },
    {
      id: "p3_zh_wa1tns5_019",
      topic: "JuZi",
      difficulty: "core",
      instruction: "请用括号里的词语改写句子。（叫）",
      q: "姐姐对妹妹说：“妹妹，把书桌收拾干净。”",
      answer: "姐姐叫妹妹把书桌收拾干净。",
      pinyin: "jiào",
      meaning: "to tell / ask sb to do sth (叫)",
      solution: {
        method: "把直接引语改成间接转述：用「叫」表示要求。",
        steps: [
          "1. 去掉引号和称呼「妹妹」。",
          "2. 用「叫」连接：姐姐叫妹妹把书桌收拾干净。",
        ],
        tip: "转述命令用「叫」，去掉引号。",
      },
    },
    {
      id: "p3_zh_wa1tns5_020",
      topic: "JuZi",
      difficulty: "stretch",
      instruction: "请用括号里的词语改写句子。（告诉）",
      q: "小明对大家说：“这是我最喜欢的一本书。”",
      answer: "小明告诉大家那是他最喜欢的一本书。",
      pinyin: "gào su",
      meaning: "to tell (告诉)",
      solution: {
        method: "改成间接转述：用「告诉」，并改人称与指示词。",
        steps: [
          "1. 用「告诉」代替「说」。",
          "2. 「这」改「那」，「我」改「他」：告诉大家那是他最喜欢的一本书。",
        ],
        tip: "转述时『这→那、我→他』，去掉引号。",
      },
    },

    // =====================================================================
    // 六、短文填空 (Q21–Q24, 4 题 4 分) — cloze (Type B, shared wordBank)
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_set2",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "短文填空（六）",
      passage:
        "一天下午，小丽和小英在商店里各自买了一件雨衣。她们刚走出店门，(21)＿＿下起了大雨。" +
        "两人站在店门外，你看看我，我看看你，都不愿意穿上自己刚买的新雨衣，担心它会被雨水淋湿。" +
        "于是，她们便站在店门外(22)＿＿要怎样回家。\n" +
        "店主听到了她们的对话，对她们说：“你们交换雨衣来穿吧。”她们想了想，觉得这是一个好(23)＿＿，" +
        "便交换雨衣来穿。\n" +
        "穿上雨衣后，她们(24)＿＿跑回家。由于她们身上穿的都不是自己的雨衣，所以被雨淋湿了也不会心疼。",
      wordBank: ["突然", "意思", "商量", "果然", "立刻", "主意"],
      questions: [
        {
          id: "p3_zh_wa1tns5_021",
          type: "MCQ",
          q: "(21) 她们刚走出店门，＿＿下起了大雨。",
          answer: "突然", // (1)
          pinyin: "tū rán",
          meaning: "suddenly (突然)",
          solution: {
            method: "看语境：意料之外、一下子下雨。",
            steps: ["1. 刚出门就下大雨，是没料到的。", "2. 「突然」表示意外、一下子发生。"],
            tip: "出乎意料、一下子发生用「突然」。",
          },
        },
        {
          id: "p3_zh_wa1tns5_022",
          type: "MCQ",
          q: "(22) 她们站在店门外＿＿要怎样回家。",
          answer: "商量", // (3)
          pinyin: "shāng liang",
          meaning: "to discuss (商量)",
          solution: {
            method: "看动作：两人一起讨论怎么办。",
            steps: ["1. 「要怎样回家」是两人一起想办法。", "2. 「商量」＝一起讨论。"],
            tip: "两人一起讨论用「商量」。",
          },
        },
        {
          id: "p3_zh_wa1tns5_023",
          type: "MCQ",
          q: "(23) 她们觉得这是一个好＿＿，便交换雨衣来穿。",
          answer: "主意", // (6)
          pinyin: "zhǔ yi",
          meaning: "idea (主意)",
          solution: {
            method: "看搭配：『一个好___』指好点子。",
            steps: ["1. 店主提的办法是个好点子。", "2. 「好主意」＝好点子。"],
            tip: "好点子＝好主意。",
          },
        },
        {
          id: "p3_zh_wa1tns5_024",
          type: "MCQ",
          q: "(24) 穿上雨衣后，她们＿＿跑回家。",
          answer: "立刻", // (5)
          pinyin: "lì kè",
          meaning: "immediately; at once (立刻)",
          solution: {
            method: "看语境：穿好就马上跑回家。",
            steps: ["1. 「穿上雨衣后……跑回家」是马上行动。", "2. 「立刻」＝马上。（剩余 意思/果然 不用）"],
            tip: "马上、立即用「立刻」。",
          },
        },
      ],
    },

    // =====================================================================
    // 七、阅读理解 (Q25–Q28, 4 题 8 分) — MCQ (Type B)
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_set3",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "阅读理解（七）",
      passage:
        "小明生日那天，叔叔送了一个鸟笼给他。小明到屋外捉了一只小鸟，想把它养在笼子里。" +
        "妈妈见了，说：“你把小鸟关进笼子里，它会失去自由而变得不开心。日子久了，小鸟不但会生病，还可能会死掉。”\n" +
        "小明不相信妈妈的话，还是把小鸟关进笼子里。他每天给小鸟喝水，抓虫子给它吃，一有空还陪它玩。" +
        "可是，小鸟不吃也不喝，几天后便倒在笼子里，一动也不动。小明见了，心里很着急。" +
        "他连忙打开笼子，想看看小鸟是不是生病了。没想到，小鸟却张开眼睛飞走了。\n" +
        "小明这才知道，小鸟并没有生病，只是想逃出鸟笼。他大声地对着小鸟说：“再见了，小鸟。我再也不把你关进笼子里了！”",
      questions: [
        {
          id: "p3_zh_wa1tns5_025",
          type: "MCQ",
          q: "小明生日当天收到了什么礼物？",
          options: ["一只小鸟。", "一个鸟笼。", "鸟笼和小鸟。", "小鸟和小虫。"],
          answer: 1, // 一个鸟笼
          pinyin: "niǎo lóng",
          meaning: "birdcage (鸟笼)",
          solution: {
            method: "直接提取：第一段说明礼物。",
            steps: ["1. 「叔叔送了一个鸟笼给他」。", "2. 小鸟是他自己捉的，不是礼物。"],
            tip: "注意区分『礼物』和『他自己捉的小鸟』。",
          },
        },
        {
          id: "p3_zh_wa1tns5_026",
          type: "MCQ",
          q: "妈妈为什么不赞成小明把小鸟关在笼子里？",
          options: [
            "小鸟会着急。",
            "小鸟不会飞走。",
            "小鸟会失去自由。",
            "小鸟不会陪小明玩。",
          ],
          answer: 2, // 小鸟会失去自由
          pinyin: "zì yóu",
          meaning: "freedom (自由)",
          solution: {
            method: "找原因：妈妈的话里说明原因。",
            steps: ["1. 妈妈说『它会失去自由而变得不开心』。", "2. 所以不赞成关小鸟。"],
            tip: "答案就在妈妈说的话里。",
          },
        },
        {
          id: "p3_zh_wa1tns5_027",
          type: "MCQ",
          q: "小明打开笼子的原因是什么？",
          options: [
            "他想把小鸟放走。",
            "他想给小鸟喝水。",
            "他想陪小鸟一起玩。",
            "他想看小鸟是不是生病了。",
          ],
          answer: 3, // 他想看小鸟是不是生病了
          pinyin: "shēng bìng",
          meaning: "to fall ill (生病)",
          solution: {
            method: "找原因：第二段说明打开笼子的原因。",
            steps: ["1. 小鸟倒在笼子里不动，小明很着急。", "2. 他『想看看小鸟是不是生病了』才打开笼子。"],
            tip: "回到『打开笼子』前后找原因。",
          },
        },
        {
          id: "p3_zh_wa1tns5_028",
          type: "MCQ",
          q: "以下哪一个句子是正确的？",
          options: [
            "小鸟最后病死了。",
            "小鸟不爱吃小虫子。",
            "小鸟要住在笼子里。",
            "小鸟不想被关在笼子里。",
          ],
          answer: 3, // 小鸟不想被关在笼子里
          pinyin: "guān",
          meaning: "to shut in; to lock up (关)",
          solution: {
            method: "整体理解：小鸟其实没病，只是想逃出鸟笼。",
            steps: [
              "1. 文末：小鸟并没有生病，只是想逃出鸟笼。",
              "2. 说明小鸟不想被关 → (4) 正确。",
            ],
            tip: "判断对错要看全文的结论。",
          },
        },
      ],
    },

    // =====================================================================
    // 八、理解问答 (Q29–Q33, 5 题 9 分) — open-ended (Type B)
    // =====================================================================
    {
      id: "p3_zh_wa1tns5_set4",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "理解问答（八）",
      passage:
        "古时候，有个孩子名叫阿宝。他的父母都是农夫。阿宝五六岁时就常常跟着父母去田里帮忙。" +
        "邻居们都夸阿宝是个懂事的孩子。\n" +
        "阿宝家里很穷，连蚊帐也买不起，他们一家人到了夏天就会被又大又黑的蚊子咬得整晚都睡不好。\n" +
        "为了让在田里劳累了一天的父母睡个好觉，阿宝想到了一个好主意。每到晚上，阿宝就光着上身，睡在父母身旁。" +
        "不一会儿，蚊子果然都飞到了他身上。阿宝任由蚊子咬他，一动也不动。爸爸妈妈醒来，看见这情形，" +
        "赶紧把阿宝身上的蚊子全都赶跑了。\n" +
        "妈妈看着阿宝身上被蚊子咬出的大大小小的包，心疼地问阿宝：“阿宝，这么多蚊子在你身上，你怎么不赶走它们呢？”" +
        "阿宝睁着大眼睛，说：“妈妈，我就是要让蚊子来咬我，这样蚊子就不会去咬您和爸爸了！”爸爸妈妈听了，感动得流下了眼泪。",
      questions: [
        {
          id: "p3_zh_wa1tns5_029a",
          type: "OpenEnded",
          q: "文中形容“真的发生了”的词语是：＿＿＿（1分）",
          answer: "果然",
          pinyin: "guǒ rán",
          meaning: "as expected; sure enough (果然)",
          solution: {
            method: "释义找词：把意思还原成文中的词。",
            steps: ["1. 「真的发生了、和预料的一样」就是『果然』。", "2. 文中『蚊子果然都飞到了他身上』。"],
            tip: "和预想一样发生＝果然。",
          },
        },
        {
          id: "p3_zh_wa1tns5_029b",
          type: "OpenEnded",
          q: "文中形容“舍不得”的词语是：＿＿＿（1分）",
          answer: "心疼",
          pinyin: "xīn téng",
          meaning: "to feel sorry for; to ache for sb (心疼)",
          solution: {
            method: "释义找词：把意思还原成文中的词。",
            steps: ["1. 「舍不得、疼惜」就是『心疼』。", "2. 文中『妈妈……心疼地问阿宝』。"],
            tip: "疼惜、舍不得＝心疼。",
          },
        },
        {
          id: "p3_zh_wa1tns5_030",
          type: "OpenEnded",
          q: "为什么邻居们会夸阿宝是个懂事的孩子？（1分）",
          answer: "因为阿宝五六岁时就常常跟着父母去田里帮忙。",
          pinyin: "dǒng shì",
          meaning: "sensible; well-behaved (懂事)",
          solution: {
            method: "找原因：第一段说明邻居称赞的原因。",
            steps: ["1. 看第一段。", "2. 因为他五六岁就常跟父母去田里帮忙。"],
            tip: "『为什么』题用『因为……』作答。",
          },
        },
        {
          id: "p3_zh_wa1tns5_031",
          type: "OpenEnded",
          q: "什么事令阿宝一家人一到夏天就整晚都睡不好？（2分）",
          answer: "因为到了夏天，他们会被又大又黑的蚊子咬得整晚都睡不好。",
          pinyin: "wén zi",
          meaning: "mosquito (蚊子)",
          solution: {
            method: "找原因：第二段说明睡不好的原因。",
            steps: ["1. 家里穷，买不起蚊帐。", "2. 夏天被又大又黑的蚊子咬，所以睡不好。"],
            tip: "抓住『蚊子咬』这个原因作答。",
          },
        },
        {
          id: "p3_zh_wa1tns5_032",
          type: "OpenEnded",
          q: "爸爸妈妈看见阿宝被蚊子咬后，有什么反应？（2分）",
          answer: "爸爸妈妈赶紧把阿宝身上的蚊子全都赶跑了。",
          pinyin: "gǎn pǎo",
          meaning: "to drive away (赶跑)",
          solution: {
            method: "直接提取：第三段写出父母的反应。",
            steps: ["1. 题型不是『为什么』，直接写出反应。", "2. 他们『赶紧把蚊子全都赶跑了』。"],
            tip: "『有什么反应』题直接写出做的动作，不用『因为』。",
          },
        },
        {
          id: "p3_zh_wa1tns5_033",
          type: "OpenEnded",
          q: "你认为阿宝是一个怎样的孩子？为什么？（2分）",
          answer:
            "我认为阿宝是一个心疼父母的好孩子。因为他为了让在田里劳累了一天的父母睡个好觉，光着上身睡在父母身旁，让蚊子咬自己。",
          pinyin: "xiào shùn",
          meaning: "filial; dutiful to parents (孝顺)",
          solution: {
            method: "分两部分作答：先评价，再从文中举例说明。",
            steps: [
              "1. 前半题：我认为阿宝是一个心疼/孝顺父母的好孩子。",
              "2. 后半题：从文中找事例——他光着上身睡在父母旁让蚊子咬自己。",
            ],
            tip: "『怎样的孩子？为什么？』要分开答：评价＋文中事例。",
          },
        },
      ],
    },
  ],
};

export default wa1_tao_nan_supplementary5;
