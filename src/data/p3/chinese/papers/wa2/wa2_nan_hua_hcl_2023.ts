// =============================================================================
// P3 Chinese WA2 — Nan Hua Primary School (南华小学) Higher Chinese
// 2023 三年级高级华文 学段测试 (WA2)  ·  35 min / 20 marks
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY. <<
// -----------------------------------------------------------------------------
// IDs are namespaced with `_nh_` (Nan Hua) to stay globally unique across papers.
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 短文填充 / 词语搭配: sub-question is MCQ whose `options` = the shared wordBank.
//   - Open-ended items: `answer` is model-answer text.
// =============================================================================

export type Difficulty = "foundation" | "core" | "stretch";

export type ChineseTopic =
  | "PinYin" | "BianZi" | "CiYu" | "KanTu" | "PeiDui"
  | "TianKong" | "JuZi" | "ZuJu" | "YueReadMCQ" | "YueReadOpen";

export interface Solution { method: string; steps: string[]; tip: string; }

export interface SingleQuestion {
  id: string; topic: ChineseTopic; difficulty: Difficulty; instruction: string;
  q: string; options?: string[]; answer: number | string;
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

export const wa2NanHuaHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_nan_hua_hcl",
    school: "Nan Hua Primary School",
    schoolZh: "南华小学",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2023 Weighted Assessment 2 (学段测试 WA2)",
    source: "sgexam.com — Nan Hua 2023 WA2 (answers verified by official key)",
    totalMarks: 20,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q2)
    {
      id: "p3_zh_wa2_nh_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "我们做错事时，（　）该道歉。",
      options: ["庆", "应", "店", "康"],
      answer: 1,
      pinyin: "Wǒmen zuò cuò shì shí, yīnggāi dàoqiàn.",
      meaning: "When we do something wrong, we should apologise.",
      solution: {
        method: "Form the word 应该.",
        steps: ["（　）该道歉 → 应该 (should) → 应."],
        tip: "庆/应/店/康 share the 广-ish look; pick the one for 'should'.",
      },
    },
    {
      id: "p3_zh_wa2_nh_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "医生说妈妈生病了，要在家里多休（　）。",
      options: ["西", "戏", "息", "喜"],
      answer: 2,
      pinyin: "Yīshēng shuō māma shēngbìng le, yào zài jiālǐ duō xiūxi.",
      meaning: "The doctor said mum is ill and should rest more at home.",
      solution: {
        method: "Form the word 休息.",
        steps: ["多休（　）→ 休息 (rest) → 息."],
        tip: "休息 = rest; 息 has 自 over 心.",
      },
    },

    // 二、词语选择 — CiYu (Q3–Q4)
    {
      id: "p3_zh_wa2_nh_003",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "我不小心撞到小乐，所以想让她（　）我。",
      options: ["陪伴", "回答", "原谅", "知道"],
      answer: 2,
      pinyin: "Wǒ bù xiǎoxīn zhuàng dào Xiǎo Lè, suǒyǐ xiǎng ràng tā yuánliàng wǒ.",
      meaning: "I accidentally bumped into Xiao Le, so I want her to forgive me.",
      solution: {
        method: "What do you want after doing something wrong to someone?",
        steps: ["撞到她 → 想让她原谅 (forgive) 我 → 原谅."],
        tip: "原谅 = forgive; the natural response to an apology.",
      },
    },
    {
      id: "p3_zh_wa2_nh_004",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "上学快要迟到了，我们（　）出门吧！",
      options: ["赶快", "刚刚", "突然", "已经"],
      answer: 0,
      pinyin: "Shàngxué kuài yào chídào le, wǒmen gǎnkuài chūmén ba!",
      meaning: "We're almost late for school; let's hurry out!",
      solution: {
        method: "Use the clue 快要迟到了 (almost late).",
        steps: ["快迟到 → 赶快 (quickly) 出门 → 赶快."],
        tip: "赶快 urges fast action; fits 'almost late'.",
      },
    },

    // 三、短文填充 — TianKong cloze (Q5–Q7)
    {
      id: "p3_zh_wa2_nh_set1",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "南华小学 P3 HCL WA2 — 短文填充（老奶奶跌倒）",
      instruction: "从所提供的词语中，选出短文所缺的词语填入空格。",
      wordBank: ["找", "逛", "立刻", "受伤"],
      passage:
        "上个周末，妈妈带妹妹和我到餐馆吃早餐，然后我们到附近【Q5】商场。一到那里，妹妹就看到一位老奶奶在上楼时不小心跌倒【Q6】了。妹妹对妈妈和我说：“请你们在这里等我一会儿。我很快就回来。”说完，妹妹【Q7】跑上前，扶起了老奶奶。妈妈看到了，说：“你真是一个好孩子！”",
      questions: [
        {
          id: "p3_zh_wa2_nh_005",
          type: "MCQ",
          q: "我们到附近（　）商场。",
          options: ["找", "逛", "立刻", "受伤"],
          answer: 1,
          pinyin: "guàng",
          meaning: "to stroll around / browse (a mall)",
          solution: { method: "What do you do at a mall?", steps: ["逛商场 = stroll/browse the mall → 逛."], tip: "逛 = wander/browse around shops." },
        },
        {
          id: "p3_zh_wa2_nh_006",
          type: "MCQ",
          q: "老奶奶在上楼时不小心跌倒（　）了。",
          options: ["找", "逛", "立刻", "受伤"],
          answer: 3,
          pinyin: "shòushāng",
          meaning: "to get hurt / injured",
          solution: { method: "What happens after falling?", steps: ["跌倒（　）了 → 受伤 (got injured) → 受伤."], tip: "跌倒受伤 = fall and get hurt." },
        },
        {
          id: "p3_zh_wa2_nh_007",
          type: "MCQ",
          q: "妹妹（　）跑上前，扶起了老奶奶。",
          options: ["找", "逛", "立刻", "受伤"],
          answer: 2,
          pinyin: "lìkè",
          meaning: "immediately / at once",
          solution: { method: "How quickly did she run forward?", steps: ["（　）跑上前 → 立刻 (immediately) → 立刻."], tip: "立刻 = at once; shows quick action." },
        },
      ],
    },

    // 四、词语搭配 — PeiDui (Q8–Q11)
    {
      id: "p3_zh_wa2_nh_set2",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "南华小学 P3 HCL WA2 — 词语搭配",
      instruction: "从所提供的选项中，找出能够和以下词语搭配组成短语的词语，把代表它的数字写在括号里。",
      wordBank: ["愿望", "收到", "强壮", "参观"],
      questions: [
        {
          id: "p3_zh_wa2_nh_008",
          type: "MCQ",
          q: "实现（　）",
          options: ["愿望", "收到", "强壮", "参观"],
          answer: 0,
          pinyin: "shíxiàn yuànwàng",
          meaning: "to fulfil a wish",
          solution: { method: "What can you 实现 (fulfil)?", steps: ["实现愿望 = fulfil a wish → 愿望."], tip: "实现 + 愿望/梦想/目标." },
        },
        {
          id: "p3_zh_wa2_nh_009",
          type: "MCQ",
          q: "身体（　）",
          options: ["愿望", "收到", "强壮", "参观"],
          answer: 2,
          pinyin: "shēntǐ qiángzhuàng",
          meaning: "to have a strong body / be physically strong",
          solution: { method: "Describe the body.", steps: ["身体强壮 = a strong body → 强壮."], tip: "强壮 describes a healthy, strong body." },
        },
        {
          id: "p3_zh_wa2_nh_010",
          type: "MCQ",
          q: "（　）书展",
          options: ["愿望", "收到", "强壮", "参观"],
          answer: 3,
          pinyin: "cānguān shūzhǎn",
          meaning: "to visit a book fair / exhibition",
          solution: { method: "What do you do at a 书展 (book fair)?", steps: ["参观书展 = visit a book fair → 参观."], tip: "参观 = visit (an exhibition/place to look around)." },
        },
        {
          id: "p3_zh_wa2_nh_011",
          type: "MCQ",
          q: "（　）卡片",
          options: ["愿望", "收到", "强壮", "参观"],
          answer: 1,
          pinyin: "shōudào kǎpiàn",
          meaning: "to receive a card",
          solution: { method: "What do you do with a card sent to you?", steps: ["收到卡片 = receive a card → 收到."], tip: "收到 = receive (something that comes to you)." },
        },
      ],
    },

    // 五、阅读理解 — reading set (notice) Q12 (MCQ) + Q13–Q14 (open)
    {
      id: "p3_zh_wa2_nh_set3",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "南华小学 P3 HCL WA2 — 阅读理解（书法比赛通告）",
      instruction: "根据短文（通告）的内容，回答下列的问题。",
      passage:
        "【通告】南华小学书法比赛\n\n" +
        "为了让同学们对书法更感兴趣，也让大家有机会练习书法，我校将会有一场书法比赛。比赛后，学校也会在不同角落贴上每一班前三名同学的书法作品。\n\n" +
        "日期：2023年10月5日（星期四）\n时间：早上8时至11时\n地点：南华小学礼堂\n\n" +
        "想参加比赛的同学，可以在10月1日前告诉你的华文老师。\n\n南华小学　9月1日",
      questions: [
        {
          id: "p3_zh_wa2_nh_012",
          type: "MCQ",
          q: "以下哪一句话是不对的？",
          options: [
            "同学们会在南华小学的礼堂比赛书法。",
            "南华小学书法比赛会在上午的时候开始。",
            "只有南华小学的学生才可以参加书法比赛。",
            "想参加比赛同学可以在10月5日告诉老师。",
          ],
          answer: 3,
          pinyin: "Yǐxià nǎ yí jù huà shì bú duì de?",
          meaning: "Which of the following statements is NOT correct?",
          solution: {
            method: "Check each statement against the notice.",
            steps: ["Notice: 想参加的同学可在10月1日前告诉华文老师.", "Option 4 says 10月5日 (the contest date), which is wrong → answer is option 4."],
            tip: "10月5日 is the contest day; the sign-up deadline is before 10月1日.",
          },
        },
        {
          id: "p3_zh_wa2_nh_013",
          type: "OpenEnded",
          q: "小文看到这则通告后，决定发短信请同班的小丽一起参加。帮小文完成短信中的空格：“……我想请你和我一起参加。我们可以在＿＿＿。”（2分）",
          answer: "我们可以在10月1日前告诉我们的华文老师。",
          pinyin: "Wǒmen kěyǐ zài shí yuè yī rì qián gàosu wǒmen de huáwén lǎoshī.",
          meaning: "We can tell our Chinese teacher before 1 October.",
          solution: {
            method: "Use the sign-up instruction from the notice.",
            steps: ["Notice: 想参加的同学可在10月1日前告诉华文老师.", "Complete the message with how to sign up."],
            tip: "Fill the blank with the action needed to join — telling the teacher before the deadline.",
          },
        },
        {
          id: "p3_zh_wa2_nh_014",
          type: "OpenEnded",
          q: "为什么学校会有书法比赛？（2分）",
          answer: "因为学校要让同学们对书法更感兴趣，也让大家有机会练习书法。",
          pinyin: "Wèishéme xuéxiào huì yǒu shūfǎ bǐsài?",
          meaning: "Why is the school holding a calligraphy competition?",
          solution: {
            method: "Find the purpose in the first line of the notice.",
            steps: ["为了让同学们对书法更感兴趣，也让大家有机会练习书法.", "Answer with 因为 + both reasons."],
            tip: "“为什么” → start with 因为 and give both purposes.",
          },
        },
      ],
    },
  ],
};

export default wa2NanHuaHcl;
