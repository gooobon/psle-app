// =============================================================================
// P3 Chinese WA2 — Nan Hua Primary School (南华小学) Higher Chinese
// 2025 三年级高级华文 学段测试（WA2）· 35 min / 20 marks · 14 questions
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY (P154). <<
// Distinct from the 2023 Nan Hua WA2 paper (separate file).
// -----------------------------------------------------------------------------
// IDs namespaced with `_nh25_`. CONVENTION: MCQ `answer` = 0-BASED index.
//   - 短文填充 / 词语搭配: sub-question MCQ whose `options` = the shared wordBank.
//   - 便条 / open-ended: `answer` is model-answer text.
// =============================================================================

export type Difficulty = "foundation" | "core" | "stretch";
export type ChineseTopic =
  | "PinYin" | "BianZi" | "CiYu" | "KanTu" | "PeiDui"
  | "TianKong" | "JuZi" | "ZuJu" | "YueReadMCQ" | "YueReadOpen";
export interface Solution { method: string; steps: string[]; tip: string; }
export interface SingleQuestion {
  id: string; topic: ChineseTopic; difficulty: Difficulty; instruction: string;
  q: string; options?: string[]; answer: number | string; imageHint?: string;
  pinyin: string; meaning: string; solution: Solution;
}
export interface SetSubQuestion {
  id: string; type: "MCQ" | "OpenEnded"; q: string; options?: string[];
  answer: number | string; imageHint?: string;
  pinyin: string; meaning: string; solution: Solution;
}
export interface SetQuestion {
  id: string; topic: ChineseTopic; difficulty: Difficulty; setLabel: string;
  instruction?: string; passage?: string; wordBank?: string[]; questions: SetSubQuestion[];
}
export type ChineseItem = SingleQuestion | SetQuestion;
export interface PaperMeta {
  paperId: string; school: string; schoolZh: string; level: string;
  subject: string; term: string; source: string; totalMarks: number;
}
export interface ChinesePaper { meta: PaperMeta; items: ChineseItem[]; }

export const wa2NanHua2025Hcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_nan_hua_2025_hcl",
    school: "Nan Hua Primary School",
    schoolZh: "南华小学",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2025 Weighted Assessment 2 (学段测试 WA2)",
    source: "sgexam.com — Nan Hua 2025 WA2 (answers verified by official key)",
    totalMarks: 20,
  },
  items: [
    // 一、辨字测验 (2题2分) — BianZi
    {
      id: "p3_zh_wa2_nh25_001", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "为了（　）现愿望，我要用功读书。", options: ["实", "识", "食", "时"], answer: 0,
      pinyin: "Wèile shíxiàn yuànwàng, wǒ yào yònggōng dúshū.",
      meaning: "To fulfil my wish, I must study hard.",
      solution: { method: "Form the word 实现.", steps: ["（　）现愿望 → 实现 (fulfil) → 实."], tip: "实现愿望 = fulfil a wish." },
    },
    {
      id: "p3_zh_wa2_nh25_002", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "巴士马上就开走了，你再不快点就来不（　）了。", options: ["吸", "极", "级", "及"], answer: 3,
      pinyin: "Bāshì mǎshàng jiù kāi zǒu le, nǐ zài bú kuài diǎn jiù láibují le.",
      meaning: "The bus is about to leave; if you don't hurry, you won't make it in time.",
      solution: { method: "Form the word 来不及.", steps: ["来不（　）→ 来不及 (no time) → 及."], tip: "来不及 = too late / no time to." },
    },

    // 二、词语选择 (2题2分) — CiYu
    {
      id: "p3_zh_wa2_nh25_003", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "明华很（　），每天都会帮妈妈收拾房间。", options: ["懂事", "聪明", "认真", "可爱"], answer: 0,
      pinyin: "Mínghuá hěn dǒngshì, měitiān dōu huì bāng māma shōushi fángjiān.",
      meaning: "Minghua is very sensible; she helps mum tidy the room every day.",
      solution: { method: "What word fits helping mum daily?", steps: ["帮妈妈收拾房间 → 很懂事 (sensible) → 懂事."], tip: "懂事 = sensible/considerate." },
    },
    {
      id: "p3_zh_wa2_nh25_004", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "弟弟（　）从房间里跑出来，把我撞倒了。", options: ["经常", "总是", "突然", "立刻"], answer: 2,
      pinyin: "Dìdi tūrán cóng fángjiān lǐ pǎo chūlái, bǎ wǒ zhuàng dǎo le.",
      meaning: "Little brother suddenly ran out of the room and knocked me over.",
      solution: { method: "How did it happen — unexpectedly?", steps: ["（　）跑出来撞倒我 → 突然 (suddenly) → 突然."], tip: "突然 = suddenly; fits an unexpected event." },
    },

    // 三、短文填充 (3题6分) — TianKong
    {
      id: "p3_zh_wa2_nh25_set1", topic: "TianKong", difficulty: "core",
      setLabel: "南华小学 P3 HCL WA2 — 短文填充（王奶奶逛夜市）",
      instruction: "从所提供的词语中，选出短文所缺的词语（每个选项用一次）。",
      wordBank: ["参观", "陪", "逛", "样子"],
      passage:
        "邻居王奶奶八十岁了，她一个人住。一天，我告诉她这个周末楼下有夜市，她听了后，对我说：“我好久没有去【Q5】夜市了。那里应该会很热闹，我好想去啊！”\n\n" +
        "听了她的话，我真想为她做点什么。妈妈知道了我的想法，说：“不如我们一起【Q6】她去夜市吧。”我高兴地点了点头。\n\n" +
        "周末到了，我们带王奶奶去夜市尝了很多美食，还玩了很多游戏。看到她开心的【Q7】，我心里乐开了花。",
      questions: [
        { id: "p3_zh_wa2_nh25_005", type: "MCQ", q: "我好久没有去（　）夜市了。", options: ["参观","陪","逛","样子"], answer: 2,
          pinyin: "guàng", meaning: "to stroll around (a market)",
          solution: { method: "What do you do at a night market?", steps: ["（　）夜市 → 逛夜市 (stroll the market) → 逛."], tip: "逛 = stroll/browse (markets, streets)." } },
        { id: "p3_zh_wa2_nh25_006", type: "MCQ", q: "不如我们一起（　）她去夜市吧。", options: ["参观","陪","逛","样子"], answer: 1,
          pinyin: "péi", meaning: "to accompany",
          solution: { method: "What do you do for grandma so she can go?", steps: ["一起（　）她去 → 陪她去 (accompany) → 陪."], tip: "陪 = accompany someone." } },
        { id: "p3_zh_wa2_nh25_007", type: "MCQ", q: "看到她开心的（　），我心里乐开了花。", options: ["参观","陪","逛","样子"], answer: 3,
          pinyin: "yàngzi", meaning: "look / appearance",
          solution: { method: "What do you see of her happiness?", steps: ["开心的（　）→ 开心的样子 (happy look) → 样子."], tip: "开心的样子 = a happy look/expression." } },
      ],
    },

    // 四、词语搭配 (4题4分) — PeiDui
    {
      id: "p3_zh_wa2_nh25_set2", topic: "PeiDui", difficulty: "core",
      setLabel: "南华小学 P3 HCL WA2 — 词语搭配",
      instruction: "从所提供的选项中，找出能够和以下词语搭配组成短语的词语（数字 1-4）。",
      wordBank: ["练习", "改掉", "健康", "附近"],
      questions: [
        { id: "p3_zh_wa2_nh25_008", type: "MCQ", q: "身体（　）", options: ["练习","改掉","健康","附近"], answer: 2,
          pinyin: "shēntǐ jiànkāng", meaning: "a healthy body",
          solution: { method: "Describe a good 身体.", steps: ["身体健康 = healthy → 健康."], tip: "身体健康 = in good health." } },
        { id: "p3_zh_wa2_nh25_009", type: "MCQ", q: "学校（　）", options: ["练习","改掉","健康","附近"], answer: 3,
          pinyin: "xuéxiào fùjìn", meaning: "near the school",
          solution: { method: "Where, relative to school?", steps: ["学校附近 = near the school → 附近."], tip: "附近 = nearby / vicinity." } },
        { id: "p3_zh_wa2_nh25_010", type: "MCQ", q: "（　）写字", options: ["练习","改掉","健康","附近"], answer: 0,
          pinyin: "liànxí xiězì", meaning: "to practise writing",
          solution: { method: "What do you do to improve writing?", steps: ["练习写字 = practise writing → 练习."], tip: "练习 = practise." } },
        { id: "p3_zh_wa2_nh25_011", type: "MCQ", q: "（　）习惯", options: ["练习","改掉","健康","附近"], answer: 1,
          pinyin: "gǎi diào xíguàn", meaning: "to get rid of a habit",
          solution: { method: "What do you do to a bad habit?", steps: ["改掉习惯 = get rid of a habit → 改掉."], tip: "改掉(坏)习惯 = break/get rid of a habit." } },
      ],
    },

    // 五、阅读理解 (3题6分) — reading set (advertisement) : Q12 MCQ + Q13 便条 + Q14 open
    {
      id: "p3_zh_wa2_nh25_set3", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "南华小学 P3 HCL WA2 — 阅读理解（广告：快来买《华文学习乐》吧！）",
      instruction: "根据短文的内容，回答下列问题。",
      passage:
        "【广告】快来买《华文学习乐》吧！\n\n" +
        "为了让同学爱上华文，把华文学得更好，学校希望同学能买《华文学习乐》来阅读。《华文学习乐》是一份新的儿童报纸，里面有很多有趣的故事和非常好玩的游戏。今天就快到学校的书店去买《华文学习乐》吧！\n\n" +
        "在5月1日前买《华文学习乐》，就可以得到一份小礼物！你还在等什么呢？\n\n" +
        "＊＊每份报纸只卖一元＊＊",
      questions: [
        { id: "p3_zh_wa2_nh25_012", type: "MCQ", q: "以下哪一句话是不对的？",
          options: [
            "《华文学习乐》是一份新的儿童报纸。",
            "《华文学习乐》里有非常好玩的游戏。",
            "同学能在《华文学习乐》读到很多故事。",
            "只要买《华文学习乐》就能得到小礼物。",
          ],
          answer: 3,
          pinyin: "Yǐxià nǎ yí jù huà shì bú duì de?",
          meaning: "Which of these statements is INCORRECT?",
          solution: {
            method: "Check each statement against the advert.",
            steps: ["The gift requires buying 在5月1日前 (before 1 May).", "So ‘只要买…就能得到小礼物’ (just buying gets a gift) is wrong → option 4."],
            tip: "This is a NOT question — the gift has a date condition.",
          } },
        { id: "p3_zh_wa2_nh25_013", type: "OpenEnded",
          q: "如果你是小明，请写一张便条给妈妈，告诉她你想买一份《华文学习乐》，还想得到一份小礼物。（按格式填写：“妈妈：我今天看了广告，觉得《华文学习乐》是一份很好的报纸，我＿＿。请您给我＿＿，我想在＿＿前，到＿＿买这份报纸。这样，我还能得到一份小礼物。 明亮 4月7日 晚上8点”）",
          answer: "妈妈：我今天看了广告，觉得《华文学习乐》是一份很好的报纸，我想买一份。请您给我一元，我想在5月1日前，到学校的书店买这份报纸。这样，我还能得到一份小礼物呢。",
          pinyin: "Xiě yì zhāng biàntiáo gěi māma.",
          meaning: "Write a note to mum saying you want to buy the paper and get the free gift.",
          solution: {
            method: "Fill each blank using the advert's facts.",
            steps: [
              "我＿ → 我想买一份 (I want to buy one).",
              "请您给我＿ → 一元 (price = $1).",
              "我想在＿前 → 5月1日 (gift deadline).",
              "到＿买 → 学校的书店 (the school bookshop).",
            ],
            tip: "Pull the price, deadline and place straight from the advert.",
          } },
        { id: "p3_zh_wa2_nh25_014", type: "OpenEnded", q: "学校为什么要同学买《华文学习乐》来阅读？",
          answer: "学校希望同学爱上华文，把华文学得更好。",
          pinyin: "Xuéxiào wèishéme yào tóngxué mǎi 《Huáwén Xuéxí Lè》 lái yuèdú?",
          meaning: "Why does the school want students to buy and read 《华文学习乐》?",
          solution: { method: "Find the school's stated purpose.", steps: ["为了让同学爱上华文，把华文学得更好 → that is the reason."], tip: "The first line of the advert states the purpose." } },
      ],
    },
  ],
};

export default wa2NanHua2025Hcl;
