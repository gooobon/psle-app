// src/data/p3/chinese/papers/wa1_chij_revision1_2025.ts
// ---------------------------------------------------------------------------
// Source: P3_Chinese_WA1.pdf  →  圣尼各拉女校（小学部）CHIJ ST NICHOLAS GIRLS' SCHOOL
//         2025 三年级高级华文 · 复习（一）(Revision 1)
//         复习范围：第一课至第四课 ｜ /56
//         改正错字 20 + 填写汉字 10 + 填写汉语拼音 6 + 选择句子 8
//         + 看短文回答问题 6 + 数笔画写笔顺填拼音 6 = 56 分
// NOTE ON ANSWERS: No printed answer key for this 复习（一） in the scan.
//   改正错字 / 填写汉字 / 填拼音 / 数笔画 are objectively determinable;
//   选择句子 & 阅读 MCQ answers are derived from context (marked inline).
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

export const wa1_chij_revision1: Paper = {
  meta: {
    id: "p3_zh_wa1_chij_revision1_2025",
    level: "P3",
    subject: "Higher Chinese",
    assessment: "WA1",
    paperType: "CHIJ St Nicholas · 复习（一） (Revision 1)",
    source: "CHIJ St Nicholas Girls' School (圣尼各拉女校) · 2025 三年级高级华文 复习（一） · 第一课至第四课",
    totalMarks: 56,
    scope: "Lessons 1–4",
  },

  items: [
    // =====================================================================
    // (一) 改正错字 (Q1–Q10, 10 题 20 分) — find & correct the wrong character
    //   answer = the CORRECT character (text)
    // =====================================================================
    {
      id: "p3_zh_wa1chr1_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "我在纸上画了一个三脚形。",
      answer: "角", // 脚 → 角（三角形）
      pinyin: "sān jiǎo xíng",
      meaning: "triangle (三角形)",
      solution: {
        method: "同音字辨析：错字「脚」应改为「角」。",
        steps: ["1. 「三___形」是图形 → 三角形。", "2. 「脚」(jiǎo, 身体部位) 写错，应是「角」。"],
        tip: "三角形的『角』，不是脚步的『脚』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "小明改桌了迟到的坏习惯。",
      answer: "掉", // 桌 → 掉（改掉）
      pinyin: "gǎi diào",
      meaning: "to get rid of / break (a habit) (改掉)",
      solution: {
        method: "同音/形近字辨析：错字「桌」应改为「掉」。",
        steps: ["1. 「改___坏习惯」是去除习惯 → 改掉。", "2. 「桌」(zhuō, 桌子) 写错，应是「掉」。"],
        tip: "改掉坏习惯的『掉』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "我常常具手回答老师的问题。",
      answer: "举", // 具 → 举（举手）
      pinyin: "jǔ shǒu",
      meaning: "to raise one's hand (举手)",
      solution: {
        method: "形近字辨析：错字「具」应改为「举」。",
        steps: ["1. 「___手回答」是举起手 → 举手。", "2. 「具」(jù, 工具) 写错，应是「举」。"],
        tip: "举手的『举』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "她每天跑步，身体变得月来月健康。",
      answer: "越", // 月 → 越（越来越）
      pinyin: "yuè lái yuè",
      meaning: "more and more (越来越)",
      solution: {
        method: "同音字辨析：错字「月」应改为「越」。",
        steps: ["1. 「___来___健康」是程度加深 → 越来越。", "2. 「月」(yuè, 月亮) 写错，应是「越」。"],
        tip: "越来越……的『越』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "小鱼摆动末巴，在水里游来游去。",
      answer: "尾", // 末 → 尾（尾巴）
      pinyin: "wěi ba",
      meaning: "tail (尾巴)",
      solution: {
        method: "形近字辨析：错字「末」应改为「尾」。",
        steps: ["1. 「摆动___巴」是鱼的尾巴 → 尾巴。", "2. 「末」(mò, 末尾) 写错，应是「尾」。"],
        tip: "尾巴的『尾』，注意与『末』不同。",
      },
    },
    {
      id: "p3_zh_wa1chr1_006",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "姐姐很东事，每天都会帮妈妈扫地。",
      answer: "懂", // 东 → 懂（懂事）
      pinyin: "dǒng shì",
      meaning: "sensible; well-behaved (懂事)",
      solution: {
        method: "同音字辨析：错字「东」应改为「懂」。",
        steps: ["1. 「很___事，会帮忙」是明理 → 懂事。", "2. 「东」(dōng, 东西) 写错，应是「懂」。"],
        tip: "懂事的『懂』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_007",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "妈妈告诉我出门前要几得把门关好。",
      answer: "记", // 几 → 记（记得）
      pinyin: "jì de",
      meaning: "to remember (记得)",
      solution: {
        method: "同音字辨析：错字「几」应改为「记」。",
        steps: ["1. 「___得关门」是别忘 → 记得。", "2. 「几」(jǐ, 几个) 写错，应是「记」。"],
        tip: "记得的『记』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_008",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "课室里的书架上放了一此华文故事书。",
      answer: "些", // 此 → 些（一些）
      pinyin: "yì xiē",
      meaning: "some; a few (一些)",
      solution: {
        method: "形近字辨析：错字「此」应改为「些」。",
        steps: ["1. 「放了一___书」是数量 → 一些。", "2. 「此」(cǐ, 此时) 写错，应是「些」。"],
        tip: "一些的『些』，注意与『此』不同。",
      },
    },
    {
      id: "p3_zh_wa1chr1_009",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "哥哥想看看种在土里的绿豆会有什么变画。",
      answer: "化", // 画 → 化（变化）
      pinyin: "biàn huà",
      meaning: "change (变化)",
      solution: {
        method: "同音字辨析：错字「画」应改为「化」。",
        steps: ["1. 「有什么变___」是改变 → 变化。", "2. 「画」(huà, 画画) 写错，应是「化」。"],
        tip: "变化的『化』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_010",
      topic: "BianZi",
      difficulty: "core",
      instruction: "圈出句子中错误的汉字，然后把正确的汉字填写在括号里。",
      q: "只要他努力都书，就一定能考到好成绩。",
      answer: "读", // 都 → 读（读书）
      pinyin: "dú shū",
      meaning: "to study; to read (读书)",
      solution: {
        method: "同音/形近字辨析：错字「都」应改为「读」。",
        steps: ["1. 「努力___书」是学习 → 读书。", "2. 「都」(dōu, 都是) 写错，应是「读」。"],
        tip: "读书的『读』。",
      },
    },

    // =====================================================================
    // (二) 填写汉字 (Q11–Q15, 5 题 10 分) — write the character for the pinyin
    //   answer = the character (text)
    // =====================================================================
    {
      id: "p3_zh_wa1chr1_011",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "小蝌蚪的身体是___（hēi）色的。",
      answer: "黑",
      pinyin: "hēi",
      meaning: "black (黑)",
      solution: {
        method: "拼音写字：hēi → 黑。",
        steps: ["1. 读音 hēi。", "2. 「黑色」的「黑」。"],
        tip: "黑色的『黑』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_012",
      topic: "BianZi",
      difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "弟弟___（zǒng）是不听话，让妈妈很生气。",
      answer: "总",
      pinyin: "zǒng",
      meaning: "always (总，总是)",
      solution: {
        method: "拼音写字：zǒng → 总（总是）。",
        steps: ["1. 读音 zǒng。", "2. 「总是」的「总」。"],
        tip: "总是的『总』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_013",
      topic: "BianZi",
      difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "饭___（hé）里装着的食物是妈妈对我满满的爱。",
      answer: "盒",
      pinyin: "hé",
      meaning: "box (盒，饭盒)",
      solution: {
        method: "拼音写字：hé → 盒（饭盒）。",
        steps: ["1. 读音 hé。", "2. 装饭的容器是「饭盒」。"],
        tip: "饭盒的『盒』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_014",
      topic: "BianZi",
      difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "今天我___（shuì）到七点才起床，结果迟到了。",
      answer: "睡",
      pinyin: "shuì",
      meaning: "to sleep (睡，睡到)",
      solution: {
        method: "拼音写字：shuì → 睡（睡到）。",
        steps: ["1. 读音 shuì。", "2. 「睡到七点」的「睡」。"],
        tip: "睡觉的『睡』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_015",
      topic: "BianZi",
      difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "上课铃响了，小明连___（máng）跑进教室。",
      answer: "忙",
      pinyin: "máng",
      meaning: "busy; hurriedly (忙，连忙)",
      solution: {
        method: "拼音写字：máng → 忙（连忙）。",
        steps: ["1. 读音 máng。", "2. 「连忙」表示赶紧。"],
        tip: "连忙的『忙』。",
      },
    },

    // =====================================================================
    // (三) 填写汉语拼音 (Q16–Q18, 3 题 6 分) — write the pinyin (2 words each)
    // =====================================================================
    {
      id: "p3_zh_wa1chr1_016",
      topic: "PinYin",
      difficulty: "core",
      instruction: "把划线词语的汉语拼音填写在括号里。",
      q: "小明「翻」开书本，从里面「取」出一张书签。",
      answer: "翻：fān ／ 取：qǔ",
      pinyin: "fān ／ qǔ",
      meaning: "翻 = to flip / turn (pages)；取 = to take out",
      solution: {
        method: "逐字注音：翻(fān)、取(qǔ)。",
        steps: ["1. 「翻」声母 f，读 fān。", "2. 「取」读 qǔ（第三声）。"],
        tip: "翻＝fān，取＝qǔ。",
      },
    },
    {
      id: "p3_zh_wa1chr1_017",
      topic: "PinYin",
      difficulty: "core",
      instruction: "把划线词语的汉语拼音填写在括号里。",
      q: "那「辆」小汽车停在一棵「矮」树旁边。",
      answer: "辆：liàng ／ 矮：ǎi",
      pinyin: "liàng ／ ǎi",
      meaning: "辆 = (measure word for vehicles)；矮 = short / low",
      solution: {
        method: "逐字注音：辆(liàng)、矮(ǎi)。",
        steps: ["1. 「辆」读 liàng（后鼻音）。", "2. 「矮」读 ǎi（零声母，第三声）。"],
        tip: "辆＝liàng，矮＝ǎi。",
      },
    },
    {
      id: "p3_zh_wa1chr1_018",
      topic: "PinYin",
      difficulty: "stretch",
      instruction: "把划线词语的汉语拼音填写在括号里。",
      q: "这几棵树的树干「粗」，树枝「细」。",
      answer: "粗：cū ／ 细：xì",
      pinyin: "cū ／ xì",
      meaning: "粗 = thick；细 = thin / slender",
      solution: {
        method: "逐字注音：粗(cū)、细(xì)。",
        steps: ["1. 「粗」声母 c，读 cū。", "2. 「细」读 xì（第四声）。"],
        tip: "粗＝cū，细＝xì，是一对反义词。",
      },
    },

    // =====================================================================
    // (四) 选择句子 (Q19–Q22, 4 题 8 分) — pick the sentence with correct usage
    //   (derived answers — no printed key)
    // =====================================================================
    {
      id: "p3_zh_wa1chr1_019",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选择「希望」用法正确的句子，把号码填写在括号里。",
      q: "请选出「希望」用法正确的句子。",
      options: [
        "我希望将来能成为一名飞机师。",
        "我们希望很久的假期终于来了。",
        "同学们都希望着儿童节的到来。",
        "脚踏车是弟弟一直希望的礼物。",
      ],
      answer: 0, // (derived)
      pinyin: "xī wàng",
      meaning: "to hope (希望)",
      solution: {
        method: "辨析词义：「希望」用于对未来的盼望。",
        steps: [
          "1. 「希望将来能成为飞机师」是对未来的愿望 → 正确。",
          "2. 等待用『盼望』，已得到的礼物用『想要』。",
        ],
        tip: "希望＋将来/能……（对未来的愿望）。",
      },
    },
    {
      id: "p3_zh_wa1chr1_020",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "选择「练习」用法正确的句子，把号码填写在括号里。",
      q: "请选出「练习」用法正确的句子。",
      options: [
        "老师说只要我经常练习课本，就不会忘了新学的字。",
        "表哥读大学的时候，曾经到美国的一家大工厂练习。",
        "哥哥正在为明天的考试练习，因此没空和我玩游戏。",
        "我每天都练习唱歌，这样以后就能够参加歌唱比赛。",
      ],
      answer: 3, // (derived)
      pinyin: "liàn xí",
      meaning: "to practise (练习)",
      solution: {
        method: "辨析词义：「练习」指反复做某项技能。",
        steps: [
          "1. 「每天练习唱歌」是反复练技能 → 正确。",
          "2. 课本用『复习』，工厂用『实习』，为考试用『复习/准备』。",
        ],
        tip: "练习＋技能（唱歌/写字/打球）。",
      },
    },
    {
      id: "p3_zh_wa1chr1_021",
      topic: "CiYu",
      difficulty: "core",
      instruction: "选择「强壮」用法正确的句子，把号码填写在括号里。",
      q: "请选出「强壮」用法正确的句子。",
      options: [
        "这支笔非常强壮，我用了几年都没坏。",
        "他的数学很强壮，考试每次都得满分。",
        "这阵大风十分强壮，把大树都吹倒了。",
        "哥哥常常跑步和游泳，身体十分强壮。",
      ],
      answer: 3, // (derived)
      pinyin: "qiáng zhuàng",
      meaning: "strong; sturdy (强壮)",
      solution: {
        method: "辨析词义：「强壮」专指身体结实有力。",
        steps: [
          "1. 「身体十分强壮」 → 正确。",
          "2. 笔用『耐用』，能力用『强/好』，风用『强劲/大』。",
        ],
        tip: "强壮专门形容『身体』。",
      },
    },
    {
      id: "p3_zh_wa1chr1_022",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "选择「陪伴」用法正确的句子，把号码填写在括号里。",
      q: "请选出「陪伴」用法正确的句子。",
      options: [
        "听到喜欢的歌后，妹妹陪伴着歌声跳起舞来。",
        "我家的小狗每天都陪伴我，是我最好的朋友。",
        "下课后，老师让班长拿本子陪伴她去办公室。",
        "我们四个人互相陪伴，很快完成了小组作业。",
      ],
      answer: 1, // (derived)
      pinyin: "péi bàn",
      meaning: "to accompany; keep company (陪伴)",
      solution: {
        method: "辨析词义：「陪伴」指长时间相伴左右。",
        steps: [
          "1. 「小狗每天陪伴我」 → 正确。",
          "2. 随歌起舞用『随着』，带去办公室用『陪』，合作完成用『帮助/合作』。",
        ],
        tip: "陪伴＝长期作伴。",
      },
    },

    // =====================================================================
    // (五) 看短文，回答问题 (Q23–Q25, 3 题 6 分) — MCQ (Type B)
    //   (derived answers — no printed key)
    // =====================================================================
    {
      id: "p3_zh_wa1chr1_set1",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "看短文，回答问题（五）",
      passage:
        "星期天下午，叔叔带小光到动物园去看大象表演。他们来到大象表演处，见到大家在入口处排着队，" +
        "一个接一个地走进去。小光看见大象，乐得又叫又跳。他跑了过去，冲到大家的最前面，完全没有排队。\n" +
        "不久，表演就开始了。几头胖胖的大象给大家表演踢球、玩水，十分有趣！后来，工作人员给大象吃东西。" +
        "几头大象一只接一只地上前吃，没有一只乱推乱抢。大家看到大象那么可爱，都笑了起来。\n" +
        "这时，一个小朋友说：“妈妈，大象也会排队呢！”小光听了，看看在吃东西的大象，觉得很不好意思，脸红了起来。",
      questions: [
        {
          id: "p3_zh_wa1chr1_023",
          type: "MCQ",
          q: "从哪里可以看出小光急着想看表演？",
          options: [
            "他看到大象后又叫又跳。",
            "他跑到了大家的最前面。",
            "他在入口处完全没排队。",
            "他要叔叔带他去看表演。",
          ],
          answer: 1, // (derived)
          pinyin: "jí zhe",
          meaning: "in a hurry; eager (急着)",
          solution: {
            method: "抓动作词：『跑过去、冲到最前面』表现急切。",
            steps: ["1. 第一段：他跑过去、冲到最前面。", "2. 这表现出他『急着想看』表演。"],
            tip: "找表示『赶、冲、跑』的动作来证明急切。",
          },
        },
        {
          id: "p3_zh_wa1chr1_024",
          type: "MCQ",
          q: "下面哪个句子是正确的？",
          options: [
            "见了大象后，小光安静地坐在一旁。",
            "大象表演后，工作人员给它们喂食。",
            "见大象乱推乱抢食物，大家都笑了。",
            "小光看到大象表演后，脸红了起来。",
          ],
          answer: 1, // (derived)
          pinyin: "wèi shí",
          meaning: "to feed (喂食)",
          solution: {
            method: "逐项核对原文。",
            steps: [
              "1. 第二段：后来工作人员给大象吃东西 → (2) 正确。",
              "2. 大象『没有』乱推乱抢；小光脸红是因为小朋友的话，不是看表演。",
            ],
            tip: "判断对错题要回原文逐句核对。",
          },
        },
        {
          id: "p3_zh_wa1chr1_025",
          type: "MCQ",
          q: "听了小朋友的话，小光觉得不好意思，因为＿＿＿",
          options: [
            "小朋友比他聪明。",
            "他的脸红了起来。",
            "大象表演得很好。",
            "他完全没有排队。",
          ],
          answer: 3, // (derived)
          pinyin: "bù hǎo yì si",
          meaning: "embarrassed; shy (不好意思)",
          solution: {
            method: "找原因：连大象都排队，他却没排队，所以惭愧。",
            steps: [
              "1. 小朋友说『大象也会排队』。",
              "2. 小光想到自己『完全没有排队』，因此不好意思。",
            ],
            tip: "对照大象（会排队）与小光（没排队）的行为找原因。",
          },
        },
      ],
    },

    // =====================================================================
    // (六) 数笔画，写笔顺，填拼音 (Q26–Q28, 3 题 6 分)
    //   answer = stroke count (text, e.g. "9画"); pinyin field = the reading
    // =====================================================================
    {
      id: "p3_zh_wa1chr1_026",
      topic: "BianZi",
      difficulty: "stretch",
      instruction: "数一数这个字共有几画，并填上汉语拼音。（例：五 wǔ，4画）",
      q: "按",
      answer: "9画",
      pinyin: "àn",
      meaning: "to press; according to (按)",
      solution: {
        method: "拆部件数笔画：扌(3画) + 安(6画) = 9画。",
        steps: ["1. 提手旁「扌」是 3 画。", "2. 「安」是 6 画。", "3. 合计 9 画，读 àn。"],
        tip: "先把字拆成部件，再分别数笔画相加。",
      },
    },
    {
      id: "p3_zh_wa1chr1_027",
      topic: "BianZi",
      difficulty: "stretch",
      instruction: "数一数这个字共有几画，并填上汉语拼音。（例：五 wǔ，4画）",
      q: "卷",
      answer: "8画",
      pinyin: "juǎn",
      meaning: "to roll up; a roll (卷)",
      solution: {
        method: "按笔顺数：「卷」共 8 画。",
        steps: ["1. 上半部分「龹」依次写。", "2. 下部「㔾」收尾。", "3. 合计 8 画，读 juǎn。"],
        tip: "按正确笔顺一笔一笔数，避免漏数或多数。",
      },
    },
    {
      id: "p3_zh_wa1chr1_028",
      topic: "BianZi",
      difficulty: "stretch",
      instruction: "数一数这个字共有几画，并填上汉语拼音。（例：五 wǔ，4画）",
      q: "背",
      answer: "9画",
      pinyin: "bèi",
      meaning: "back (of the body); to carry on the back (背)",
      solution: {
        method: "拆部件数笔画：北(5画) + 月(4画) = 9画。",
        steps: ["1. 上部「北」是 5 画。", "2. 下部「月」是 4 画。", "3. 合计 9 画，读 bèi。"],
        tip: "上下结构的字，可分上、下两部分各自数。",
      },
    },
  ],
};

export default wa1_chij_revision1;
