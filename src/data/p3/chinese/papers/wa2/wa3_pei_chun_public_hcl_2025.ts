// =============================================================================
// P3 Chinese WA3 (T3 / 第三学段) — Pei Chun Public School (公立培群学校) Higher Chinese
// Source: sgexam.com compilation  |  Paper code: P3/HCL/T3 WA  (50 min / 20 marks)
// NOTE: This paper is a Term-3 (WA3) paper found inside the WA2 PDF. It is kept
//       with a `wa3_` filename + `p3_zh_wa3_*` ids so it does NOT collide with WA2.
// -----------------------------------------------------------------------------
// CONVENTION: `answer` for MCQ items = 0-BASED array index into `options`.
//   - 词语搭配 / 看图选词: each sub-question is MCQ whose `options` = the shared
//     wordBank, so `answer` is the 0-based index of the correct word in wordBank.
//   - 组句成段 (sentence ordering): `answer` is the reading order as a string of
//     position numbers matching the displayed fragment order (e.g. "3,4,1,5,2").
//   - Open-ended: `answer` is model-answer text.
//   - 看图选词 sub-questions carry `imageHint` (the picture is not embedded here —
//     attach the matching asset in the app).
// =============================================================================

export type Difficulty = "foundation" | "core" | "stretch";

export type ChineseTopic =
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

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export interface SingleQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: number | string;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SetSubQuestion {
  id: string;
  type: "MCQ" | "OpenEnded";
  q: string;
  options?: string[];
  answer: number | string;
  imageHint?: string; // for 看图 (picture) questions; attach asset in app
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SetQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  setLabel: string;
  instruction?: string;
  passage?: string;
  wordBank?: string[];
  questions: SetSubQuestion[];
}

export type ChineseItem = SingleQuestion | SetQuestion;

export interface PaperMeta {
  paperId: string;
  school: string;
  schoolZh: string;
  level: string;
  subject: string;
  term: string;
  source: string;
  totalMarks: number;
}

export interface ChinesePaper {
  meta: PaperMeta;
  items: ChineseItem[];
}

export const wa3PeiChunPublicHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa3_pei_chun_public_hcl",
    school: "Pei Chun Public School",
    schoolZh: "公立培群学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "Term 3 Weighted Assessment (第三学段测试 / WA3)",
    source: "sgexam.com — P3/HCL/T3 WA",
    totalMarks: 20,
  },
  items: [
    // ---------------------------------------------------------------------
    // (一) 组句成段 — ZuJu (sentence ordering) Q1  (5 marks)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa3_001",
      topic: "ZuJu",
      difficulty: "stretch",
      instruction:
        "根据所提供的短句，把下面的句子重新排列，组成合理的段落，然后把数目字填写在括号里。",
      q: "把下面五个句子排成通顺的段落（在每句前的括号里填上顺序号）：",
      options: [
        "妹妹听了哥哥的话，马上就拿起扫把来扫地。",
        "哥哥也去拿了一块抹布把家里的桌子都抹干净了。",
        "一个周末的下午，哥哥看到家里又脏又乱。",
        "爸爸妈妈回来后，看到家里这么干净，开心极了。",
        "哥哥就对妹妹说：“我们一起帮爸爸妈妈收拾房间吧！”",
      ],
      answer: "3,4,1,5,2", // order numbers for the fragments in the displayed order
      pinyin:
        "Yí ge zhōumò de xiàwǔ, gēge kàndào jiā lǐ yòu zāng yòu luàn. Gēge jiù duì mèimei shuō: “Wǒmen yìqǐ bāng bàba māma shōushi fángjiān ba!” Mèimei tīng le gēge de huà, mǎshàng jiù ná qǐ sàobǎ lái sǎodì. Gēge yě qù ná le yí kuài mābù bǎ jiā lǐ de zhuōzi dōu mā gānjìng le. Bàba māma huílái hòu, kàndào jiā lǐ zhème gānjìng, kāixīn jí le.",
      meaning:
        "One weekend afternoon, big brother saw the house was dirty and messy. He said to his sister, 'Let's help mum and dad tidy the room!' The sister took a broom and swept the floor right away. Brother got a cloth and wiped all the tables clean. When mum and dad came home and saw the house so clean, they were overjoyed.",
      solution: {
        method: "Order by story logic: trigger → suggestion → actions → result.",
        steps: [
          "Start with the time + problem: 一个周末的下午…家里又脏又乱 (no.1).",
          "Brother proposes to tidy up (no.2), sister acts first (no.3), brother acts next (no.4).",
          "End with parents' reaction (no.5). Final order: C → E → A → B → D = 3,4,1,5,2.",
        ],
        tip: "Find the opening sentence (sets time/scene) and the closing sentence (a result) first, then fill the middle.",
      },
    },

    // ---------------------------------------------------------------------
    // (二) 词语搭配 — PeiDui (collocation, choose from word bank) Q2–Q6  (5 marks)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa3_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "公立培群学校 P3 HCL T3 — 词语搭配",
      instruction:
        "从所提供的词语中，选出可以和各题的词语搭配成合理的词组的词语，然后把代表它的数目字填写在括号里。每个词语只能用一次。",
      wordBank: ["引来", "招呼", "利用", "保护", "浪费", "清洗", "环保", "环境"],
      questions: [
        {
          id: "p3_zh_wa3_002",
          type: "MCQ",
          q: "破坏（　）",
          options: ["引来", "招呼", "利用", "保护", "浪费", "清洗", "环保", "环境"],
          answer: 7,
          pinyin: "pòhuài huánjìng",
          meaning: "to destroy / damage the environment",
          solution: {
            method: "Match a noun that fits the verb 破坏.",
            steps: ["破坏 (destroy) needs something to destroy → 环境 (environment).", "破坏环境 is a common collocation."],
            tip: "破坏 pairs with abstract nouns like 环境/感情, not actions.",
          },
        },
        {
          id: "p3_zh_wa3_003",
          type: "MCQ",
          q: "（　）厕所",
          options: ["引来", "招呼", "利用", "保护", "浪费", "清洗", "环保", "环境"],
          answer: 5,
          pinyin: "qīngxǐ cèsuǒ",
          meaning: "to clean / wash the toilet",
          solution: {
            method: "Pick the verb that goes before 厕所.",
            steps: ["You 清洗 (wash/clean) a toilet → 清洗厕所."],
            tip: "清洗 = wash clean; used for places/objects that get dirty.",
          },
        },
        {
          id: "p3_zh_wa3_004",
          type: "MCQ",
          q: "废物（　）",
          options: ["引来", "招呼", "利用", "保护", "浪费", "清洗", "环保", "环境"],
          answer: 2,
          pinyin: "fèiwù lìyòng",
          meaning: "to reuse waste / make use of waste materials",
          solution: {
            method: "Recall the fixed four-character phrase.",
            steps: ["废物利用 means putting waste to good use → 利用."],
            tip: "废物利用 is a set phrase about recycling/reusing.",
          },
        },
        {
          id: "p3_zh_wa3_005",
          type: "MCQ",
          q: "（　）水电",
          options: ["引来", "招呼", "利用", "保护", "浪费", "清洗", "环保", "环境"],
          answer: 4,
          pinyin: "làngfèi shuǐdiàn",
          meaning: "to waste water and electricity",
          solution: {
            method: "Choose the verb that fits 水电 (utilities).",
            steps: ["浪费水电 = wasting water and electricity → 浪费."],
            tip: "浪费 = waste (resources, time, money).",
          },
        },
        {
          id: "p3_zh_wa3_006",
          type: "MCQ",
          q: "（　）蚊虫",
          options: ["引来", "招呼", "利用", "保护", "浪费", "清洗", "环保", "环境"],
          answer: 0,
          pinyin: "yǐnlái wénchóng",
          meaning: "to attract mosquitoes and insects",
          solution: {
            method: "Find the verb meaning 'cause to come'.",
            steps: ["Dirty places 引来 (attract) mosquitoes → 引来蚊虫."],
            tip: "引来 = draw/attract something (often unwanted).",
          },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // (三) 看图选词 — KanTu (picture → word) Q7–Q10  (4 marks)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa3_set2",
      topic: "KanTu",
      difficulty: "foundation",
      setLabel: "公立培群学校 P3 HCL T3 — 看图选词",
      instruction: "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。",
      wordBank: ["环保袋", "东海岸", "脚踏车", "国庆日", "垃圾桶", "鱼尾狮"],
      questions: [
        {
          id: "p3_zh_wa3_007",
          type: "MCQ",
          q: "看图选词（Q7）",
          options: ["环保袋", "东海岸", "脚踏车", "国庆日", "垃圾桶", "鱼尾狮"],
          answer: 4,
          imageHint: "Photo of large outdoor rubbish/recycling bins (recycle triangle visible).",
          pinyin: "lājītǒng",
          meaning: "rubbish bin",
          solution: {
            method: "Name the object in the picture.",
            steps: ["The bins for throwing rubbish → 垃圾桶."],
            tip: "垃圾 = rubbish, 桶 = bin/bucket.",
          },
        },
        {
          id: "p3_zh_wa3_008",
          type: "MCQ",
          q: "看图选词（Q8）",
          options: ["环保袋", "东海岸", "脚踏车", "国庆日", "垃圾桶", "鱼尾狮"],
          answer: 0,
          imageHint: "A green reusable shopping/tote bag printed with the word 'GREEN'.",
          pinyin: "huánbǎo dài",
          meaning: "reusable / eco-friendly bag",
          solution: {
            method: "Identify the reusable bag.",
            steps: ["A cloth bag used instead of plastic → 环保袋."],
            tip: "环保 = environmental-protection; 环保袋 = green bag.",
          },
        },
        {
          id: "p3_zh_wa3_009",
          type: "MCQ",
          q: "看图选词（Q9）",
          options: ["环保袋", "东海岸", "脚踏车", "国庆日", "垃圾桶", "鱼尾狮"],
          answer: 5,
          imageHint: "Singapore landmark statue spouting water from its mouth (the Merlion).",
          pinyin: "yúwěishī",
          meaning: "the Merlion (Singapore's lion-fish statue)",
          solution: {
            method: "Recognise the famous Singapore statue.",
            steps: ["A lion head with a fish body spouting water → 鱼尾狮 (Merlion)."],
            tip: "鱼尾 = fish tail, 狮 = lion → 鱼尾狮.",
          },
        },
        {
          id: "p3_zh_wa3_010",
          type: "MCQ",
          q: "看图选词（Q10）",
          options: ["环保袋", "东海岸", "脚踏车", "国庆日", "垃圾桶", "鱼尾狮"],
          answer: 2,
          imageHint: "Line drawing of a bicycle.",
          pinyin: "jiǎotàchē",
          meaning: "bicycle",
          solution: {
            method: "Name the two-wheeled vehicle.",
            steps: ["A vehicle with two wheels and pedals → 脚踏车 (bicycle)."],
            tip: "脚踏车 (lit. foot-pedal vehicle) = bicycle; also 自行车/单车.",
          },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // (四) 理解问答 — YueReadOpen set (Q11–Q13)  (6 marks)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa3_set3",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "公立培群学校 P3 HCL T3 — 理解问答（河马与小动物）",
      instruction: "根据短文的内容和上下文的意思，回答下列的问题。",
      passage:
        "树林里有一条小河，河边住着很多小动物，它们常常到这里来喝水、玩耍（shuǎ）。有一天，一只河马来到这里，就在那里住下了。可是，小动物们在河边玩时有点吵，河马很生气，就把动物们都赶走了。\n\n" +
        "一只小羊生气地对河马说：“为什么要赶我们走？”河马不理它，它只好难过地走开了。\n\n" +
        "有一天，当一只小鸟飞过小河时，它发现河马躺（tǎng）在河边，好像生病了。小鸟飞到河马身边，问：“河马大哥，你怎么了？”“我身上有很多虫子。”河马回答。\n\n" +
        "小鸟马上叫小动物们来帮助河马，小鸟把河马身上的虫子都吃掉了，小羊和小狗拔了很多青草给河马吃。很快地，河马的身体就好了。\n\n" +
        "河马知道自己错了，向小动物们说对不起，还请它们都回到河边来玩。小河又热闹起来了。",
      questions: [
        {
          id: "p3_zh_wa3_011",
          type: "OpenEnded",
          q: "河马为什么要赶走小动物们？（2分）",
          answer: "因为小动物们在河边玩的时候有点吵，河马很生气，就把它们赶走了。",
          pinyin: "Hémǎ wèishéme yào gǎnzǒu xiǎo dòngwù men?",
          meaning: "Why did the hippo chase the small animals away?",
          solution: {
            method: "Find the cause in paragraph 1.",
            steps: ["Text: 小动物们在河边玩时有点吵，河马很生气.", "Answer with 因为… stating the noise made the hippo angry."],
            tip: "“为什么” → begin the answer with 因为 and state the reason from the text.",
          },
        },
        {
          id: "p3_zh_wa3_012",
          type: "OpenEnded",
          q: "小动物们知道河马生病了后，它们是怎么帮助河马的？（2分）",
          answer: "小鸟把河马身上的虫子都吃掉了，小羊和小狗拔了很多青草给河马吃。",
          pinyin: "Xiǎo dòngwù men zhīdào hémǎ shēngbìng le hòu, tāmen shì zěnme bāngzhù hémǎ de?",
          meaning: "After the animals learnt the hippo was sick, how did they help it?",
          solution: {
            method: "List the helping actions from paragraph 4.",
            steps: ["小鸟 ate the bugs on the hippo; 小羊和小狗 pulled grass for it to eat.", "Include both actions for full marks."],
            tip: "“怎么帮助” needs the specific actions, not just 'they helped'.",
          },
        },
        {
          id: "p3_zh_wa3_013",
          type: "OpenEnded",
          q: "你认为小羊听到河马说对不起后，它会怎么做？为什么？（2分）",
          answer:
            "我认为小羊会原谅河马，回到小河边来玩。因为河马已经知道自己错了，还真诚地向大家道歉了。",
          pinyin: "Nǐ rènwéi xiǎo yáng tīngdào hémǎ shuō duìbuqǐ hòu, tā huì zěnme zuò? Wèishéme?",
          meaning: "What do you think the little goat will do after hearing the hippo apologise? Why?",
          solution: {
            method: "Give an opinion + a reason (open-ended).",
            steps: ["State what the goat does (e.g. forgive and return to play).", "Give a reason based on the story (the hippo admitted its mistake and apologised)."],
            tip: "Opinion questions need BOTH a clear choice and a 'because' reason; there is no single fixed answer.",
          },
        },
      ],
    },
  ],
};

export default wa3PeiChunPublicHcl;
