// src/data/p3/chinese/papers/eoy_nanhua_higher_paper2_2025.ts
// 南华小学 (Nan Hua Primary School) - P3 高级华文 (Higher Chinese) - 2025 EOY 试卷二
// Source: P3_Chinese_EOY.pdf (pages 187-198)
// Listening (试卷三) and Composition (试卷一 看图作文) are excluded per spec.

export type Difficulty = "foundation" | "core" | "stretch";

export interface SolutionBlock {
  method: string;
  steps: string[];
  tip: string;
}

// Type A: single-question item
export interface QuestionTypeA {
  id: string;
  topic:
    | "PinYin"
    | "BianZi"
    | "CiYu"
    | "KanTu"
    | "PeiDui"
    | "TianKong"
    | "ZuJu"
    | "YueReadMCQ"
    | "YueReadOpen"
    | "JuZi";
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: SolutionBlock;
}

// Type B: set/passage-based item
export interface SubQuestion {
  id: string;
  type: "MCQ" | "OpenEnded";
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: SolutionBlock;
}

export interface QuestionTypeB {
  id: string;
  topic:
    | "PinYin"
    | "BianZi"
    | "CiYu"
    | "KanTu"
    | "PeiDui"
    | "TianKong"
    | "ZuJu"
    | "YueReadMCQ"
    | "YueReadOpen"
    | "JuZi";
  difficulty: Difficulty;
  setLabel: string;
  passage: string;
  wordBank?: string[];
  questions: SubQuestion[];
}

export type EOYQuestion = QuestionTypeA | QuestionTypeB;

export const eoyNanHuaHigherPaper2_2025: EOYQuestion[] = [
  // ===================== 一、辨字测验 (BianZi) Q1-Q4 =====================
  {
    id: "p3_zh_eoy_nh_001",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "每天傍晚，爷爷都到附____的公园运动。",
    options: ["迟", "近", "退", "逃"],
    answer: 2,
    pinyin: "jìn",
    meaning: "near, close (附近 = nearby)",
    solution: {
      method: "Character Recognition Question — Based on the context, the sentence should mean 'a park near a place', so we need to find the character that completes the word '附近' (nearby).",
      steps: [
        "Find the character that can be used together with '附' (which is already in the blank) to form a correct word.",
        "(1) 迟 (late) → 附迟 (✗), (2) 近 (close/near) → 附近 (✓, nearby), (3) 退 (retreat) → 附退 (✗), (4) 逃 (escape) → 附逃 (✗)",
        "'附近的公园' means 'the park nearby', which fits the context. So the correct answer is (2) 近.",
      ],
      tip: "'近 (jìn)' and '进 (jìn)' sound the same but have different meanings. 近 = near/close, 进 = to enter/go in. Be careful not to mix them up!",
    },
  },
  {
    id: "p3_zh_eoy_nh_002",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "学校的讲堂共有三百个____位。",
    options: ["作", "做", "坐", "座"],
    answer: 4,
    pinyin: "zuò",
    meaning: "seat (座位 = seat; measure word for seats)",
    solution: {
      method: "Find the character that combines with '位' to form the word '座位' (seat).",
      steps: [
        "The sentence means: 'The auditorium has a total of 300 ____位 (seats) altogether.'",
        "(1) 作 (zuò, to do/make), (2) 做 (zuò, to do), (3) 坐 (zuò, to sit), (4) 座 (zuò, seat/a measure word) — the character that forms '座位' (seat) is (4) 座.",
        "Be careful not to mix up '坐' (to sit, a verb) and '座' (seat, a noun/measure word)!",
      ],
      tip: "'座' is also used as a measure word for buildings. Example: 一座大楼 (one building). '坐' is a verb that means the action of sitting.",
    },
  },
  {
    id: "p3_zh_eoy_nh_003",
    topic: "BianZi",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "爸爸教我用瓶____做一辆小汽车。",
    options: ["盆", "蓝", "盖", "盒"],
    answer: 3,
    pinyin: "gài",
    meaning: "cap, lid (瓶盖 = bottle cap)",
    solution: {
      method: "Find the character that combines with '瓶' to form the word '瓶盖' (bottle cap).",
      steps: [
        "Based on the context, the sentence means that Dad taught how to make a small model car using bottle caps.",
        "(1) 盆 (pén, flowerpot/basin), (2) 蓝 (lán, blue), (3) 盖 (gài, to cover/lid), (4) 盒 (hé, box) — the character that forms '瓶盖' (bottle cap) is (3) 盖.",
        "'盒' (hé, box) and '盖' (gài, lid/cover) look similar but have different pronunciations and meanings. Be careful not to mix them up!",
      ],
      tip: "'盖 (gài)' can also be used as a verb meaning 'to cover'. Example: 盖被子 (to cover yourself with a blanket).",
    },
  },
  {
    id: "p3_zh_eoy_nh_004",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "姐姐____求妈妈让她到游泳池去游泳。",
    options: ["青", "请", "清", "睛"],
    answer: 2,
    pinyin: "qǐng",
    meaning: "to request, please (请求 = to request)",
    solution: {
      method: "Find the character that combines with '____求' to form the word '请求' (to request).",
      steps: [
        "The sentence means: 'Elder sister ____求 (requested) mum to let her go to the swimming pool to swim.'",
        "Among (1) 青 (qīng, blue/green), (2) 请 (qǐng, to invite/request), (3) 清 (qīng, clear), and (4) 睛 (jīng, eyeball), the character that forms '请求' is (2) 请.",
        "青, 请, 清, and 睛 all sound similar or look similar in shape, so you must pay attention to the radical (部首) to tell them apart — 请 has the 言 (speech) radical, which relates to 'requesting'.",
      ],
      tip: "Characters with the 言 (speech) radical are often related to 'speaking' or 'requesting'. Remember these together: 请, 说, 话, 语.",
    },
  },

  // ===================== 二、词语选择 (CiYu) Q5-Q8 =====================
  {
    id: "p3_zh_eoy_nh_005",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "老师告诉我们要____把每件事都做好。",
    options: ["实现", "争取", "相信", "讨论"],
    answer: 2,
    pinyin: "zhēng qǔ",
    meaning: "to strive for, to work hard to achieve",
    solution: {
      method: "Choose the word that best fits the context — the meaning 'to strive/try hard to do everything well' (争取) fits naturally here.",
      steps: [
        "'老师告诉我们要____把每件事都做好' means: 'The teacher told us that we should ____ to do everything well.'",
        "(1) 实现 (shíxiàn, to achieve/realise) is used for achieving goals or dreams, while (3) 相信 (xiāngxìn, to believe) and (4) 讨论 (tǎolùn, to discuss) do not fit the context.",
        "(2) 争取 (zhēngqǔ, to strive/try hard to achieve something) best fits the meaning of 'trying hard to do everything well'.",
      ],
      tip: "争取 is usually followed by a goal (e.g. 把…做好, 机会, 时间). Example: 争取时间 (to strive to save time / to make the most of time).",
    },
  },
  {
    id: "p3_zh_eoy_nh_006",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "爸爸说今天会下雨，下午____下起了大雨。",
    options: ["突然", "虽然", "果然", "仍然"],
    answer: 3,
    pinyin: "guǒ rán",
    meaning: "as expected, sure enough",
    solution: {
      method: "Choose the word that shows something predicted earlier actually happened.",
      steps: [
        "The first part of the sentence says 'Dad said it would rain today', and the second part says 'it really did rain'.",
        "When a prediction turns out to be correct, we use (3) 果然 (guǒrán, just as expected / sure enough).",
        "(1) 突然 (suddenly) is used for something that happens without warning; (2) 虽然 (although) shows contrast; (4) 仍然 (still/as before) shows no change — so none of these fit here.",
      ],
      tip: "果然 means 'just as expected'. It often appears when the earlier part of the sentence contains words like 听说, 说, or 以为, showing a prediction or something heard beforehand.",
    },
  },
  {
    id: "p3_zh_eoy_nh_007",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "看到弟弟把公园里的花摘了，妈妈很____。",
    options: ["兴奋", "认真", "满意", "吃惊"],
    answer: 4,
    pinyin: "chī jīng",
    meaning: "shocked, surprised",
    solution: {
      method: "Choose the word that best describes how Mum felt when she saw her younger sibling picking flowers in the park.",
      steps: [
        "Picking flowers in the park without permission is a negative action, so Mum was most likely surprised or shocked.",
        "(1) 兴奋 (excited), (2) 认真 (hardworking), and (3) 满意 (satisfied) are all positive feelings, so they do not fit here.",
        "(4) 吃惊 (chījīng, to be shocked/surprised) is the most natural reaction for Mum after seeing what her younger sibling did.",
      ],
      tip: "吃惊 means 'to be surprised by something' and is often used together with 看到 or 听到 (e.g. 'saw something and got a shock').",
    },
  },
  {
    id: "p3_zh_eoy_nh_008",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数目字（1、2、3或4）填写在右边的括号里。",
    q: "老师____的新游戏，让学习变得更有趣。",
    options: ["设计", "说明", "使用", "检查"],
    answer: 1,
    pinyin: "shè jì",
    meaning: "to design",
    solution: {
      method: "In the phrase 'to _____ a new game', we need to find the word that means creating or inventing a new game for the first time.",
      steps: [
        "The sentence means: 'The new game that the teacher _____ made learning more fun.'",
        "(2) 说明 (to explain), (3) 使用 (to use), and (4) 检查 (to check) all describe actions done to a game that already exists.",
        "The action of creating something new is (1) 设计 (shèjì, to design/create).",
      ],
      tip: "设计 is usually followed by the thing that was created, such as 游戏 (game), 海报 (poster), or 衣服 (clothes).",
    },
  },

  // ===================== 三、短文填空 (TianKong) Q9-Q12 =====================
  {
    id: "p3_zh_eoy_nh_set1",
    topic: "TianKong",
    difficulty: "stretch",
    setLabel: "Nan Hua EOY Paper 2 - 三、短文填空",
    passage:
      "休息时，小华和康康在草场上玩球。小华踢得太用力，康康Q9.(　　)躲开，被球打到了，痛得哇哇大叫。小华看见了，吓得冒出冷汗，Q10.(　　)溜走。\n第二天，小华在玩\u201c你追我跑\u201d的时候，不小心跌伤了。康康见了，立刻跑上前去扶他。小华觉得Q11.(　　)，不好意思地说：\u201c谢谢你！对……对不起，昨天是我的错，你可以Q12.(　　)我吗？\u201d\n康康听了，笑着说：\u201c没关系，你以后小心点儿。\u201d说完，他们便一起走回课室。",
    wordBank: ["连忙", "不客气", "来不及", "难为情", "原谅", "着急"],
    questions: [
      {
        id: "p3_zh_eoy_nh_009",
        type: "MCQ",
        q: "康康Q9.(　　)躲开，被球打到了，痛得哇哇大叫。",
        options: ["连忙", "不客气", "来不及", "难为情"],
        answer: 3,
        pinyin: "lái bù jí",
        meaning: "too late, not in time",
        solution: {
          method: "Find the word that means Kang Kang 'had no time to dodge' because the ball came too fast.",
          steps: [
            "We can tell from the result '被球打到了 (got hit by the ball)' that Kang Kang was not able to react in time.",
            "(3) 来不及 (láibùjí, to not have enough time to do something) matches the meaning of 'could not dodge in time'.",
            "(1) 连忙 (quickly/hurriedly) means acting fast, so it does not fit with the result of getting hit. (2) 不客气 (you're welcome) and (4) 难为情 (to feel embarrassed) do not match the context.",
          ],
          tip: "来不及 means 'not having enough time to do something'. It is the opposite of 来得及 (to have enough time to do something).",
        },
      },
      {
        id: "p3_zh_eoy_nh_010",
        type: "MCQ",
        q: "小华看见了，吓得冒出冷汗，Q10.(　　)溜走。",
        options: ["连忙", "不客气", "来不及", "难为情"],
        answer: 1,
        pinyin: "lián máng",
        meaning: "hastily, promptly",
        solution: {
          method: "Xiao Hua is shocked and breaking out in a cold sweat — find the word that means she 'quickly ran away'.",
          steps: [
            "After '吓得冒出冷汗 (was so scared she broke out in a cold sweat)', an adverb showing quick action should follow.",
            "(1) 连忙 (liánmáng, promptly/right away) is the most natural adverb to describe 溜走 (slip away quietly).",
            "The other words do not make sense as adverbs to describe 溜走.",
          ],
          tip: "连忙 is an adverb that shows actions happening quickly one after another. It is placed before the verb.",
        },
      },
      {
        id: "p3_zh_eoy_nh_011",
        type: "MCQ",
        q: "小华觉得Q11.(　　)，不好意思地说：\u201c谢谢你！对……对不起……\u201d",
        options: ["连忙", "不客气", "来不及", "难为情"],
        answer: 4,
        pinyin: "nán wéi qíng",
        meaning: "embarrassed, awkward (to feel)",
        solution: {
          method: "Find the word that shows Xiao Hua felt 'embarrassed and awkward' after receiving help from Kang Kang.",
          steps: [
            "Xiao Hua had hurt Kang Kang yesterday, but today Kang Kang helped her — so she feels sorry and embarrassed.",
            "(4) 难为情 (nánwéiqíng, to feel embarrassed/awkward) connects naturally with 不好意思 (to feel embarrassed).",
            "(1) 连忙, (2) 不客气, and (3) 来不及 are not feeling adjectives, so they are not suitable to come after 觉得 (to feel).",
          ],
          tip: "难为情 is often used in the pattern 觉得难为情 (to feel embarrassed/awkward), and it describes feelings like guilt or shame.",
        },
      },
      {
        id: "p3_zh_eoy_nh_012",
        type: "MCQ",
        q: "你可以Q12.(　　)我吗？",
        options: ["连忙", "不客气", "来不及", "原谅"],
        answer: 4,
        pinyin: "yuán liàng",
        meaning: "to forgive",
        solution: {
          method: "Find the verb that fits when apologising and making a request — 'Can you _____ me?'",
          steps: [
            "After apologising, Xiao Hua asks: '你可以____我吗? (Can you _____ me?)'",
            "After an apology, the most suitable request is to ask for forgiveness, so (5) 原谅 (yuánliàng, to forgive) is the best answer.",
            "原谅 follows the pattern: 原谅 + person (to forgive someone), and it often appears after an apology like 对不起.",
          ],
          tip: "原谅 + person (e.g. 原谅我, 原谅他) means 'to forgive someone'.",
        },
      },
    ],
  },

  // ===================== 四、词语搭配 (PeiDui) Q13-Q16 =====================
  {
    id: "p3_zh_eoy_nh_set2",
    topic: "PeiDui",
    difficulty: "core",
    setLabel: "Nan Hua EOY Paper 2 - 四、词语搭配",
    passage:
      "从所提供的词语中，选出能够和以下词语搭配组成短语的词语，然后把代表它的数目字（1-6）写在括号里。",
    wordBank: ["任务", "破坏", "发抖", "摆动", "强壮", "希望"],
    questions: [
      {
        id: "p3_zh_eoy_nh_013",
        type: "MCQ",
        q: "Q13.(　　)环境",
        options: ["任务", "破坏", "发抖", "摆动", "强壮", "希望"],
        answer: 2,
        pinyin: "pò huài",
        meaning: "to destroy, to damage (破坏环境 = to damage the environment)",
        solution: {
          method: "Find the word that goes naturally with '____环境(environment)'.",
          steps: [
            "环境 (huánjìng, environment) is used with verbs such as 'to protect' or 'to destroy'.",
            "(2) When combined with 破坏 (pòhuài, to destroy), it forms the natural phrase '破坏环境 (to destroy the environment)'.",
            "任务/发抖/摆动/强壮/希望do not go naturally with '环境'.",
          ],
          tip: "破坏 + noun (e.g. 环境, 关系, 东西) means 'to ruin/destroy something'.",
        },
      },
      {
        id: "p3_zh_eoy_nh_014",
        type: "MCQ",
        q: "Q14. 全身(　　)",
        options: ["任务", "破坏", "发抖", "摆动", "强壮", "希望"],
        answer: 3,
        pinyin: "fā dǒu",
        meaning: "to shiver, to tremble (全身发抖 = to tremble all over)",
        solution: {
          method: "Find the word that goes naturally with '全身(whole body)____'.",
          steps: [
            "全身 (quánshēn, whole body) is used with words that describe actions or states happening across the entire body.",
            "(3) When combined with 发抖 (fādǒu, to tremble), it forms the natural phrase '全身发抖 (the whole body is trembling)'.",
            "All the other words do not make sense when combined with 全身.",
          ],
          tip: "发抖 describes the state of the body shaking due to cold, fear, or excitement. Example: 冷得发抖 (shivering from the cold).",
        },
      },
      {
        id: "p3_zh_eoy_nh_015",
        type: "MCQ",
        q: "Q15.(　　)尾巴",
        options: ["任务", "破坏", "发抖", "摆动", "强壮", "希望"],
        answer: 4,
        pinyin: "bǎi dòng",
        meaning: "to wag, to swing (摆动尾巴 = to wag the tail)",
        solution: {
          method: "Find the word that goes naturally with '____尾巴(tail)'.",
          steps: [
            "尾巴 (wěiba, tail) is used with words that describe actions such as 'to swing' or 'to move'.",
            "(4) When combined with 摆动 (bǎidòng, to swing/sway), it forms the natural phrase '摆动尾巴 (to wag the tail)'.",
            "All the other words do not make sense when combined with 尾巴.",
          ],
          tip: "摆动 means 'to swing from side to side' and is often used with words like 钟摆 (pendulum), 尾巴 (tail), and 树枝 (tree branch).",
        },
      },
      {
        id: "p3_zh_eoy_nh_016",
        type: "MCQ",
        q: "Q16. 完成(　　)",
        options: ["任务", "破坏", "发抖", "摆动", "强壮", "希望"],
        answer: 1,
        pinyin: "rèn wù",
        meaning: "task, mission (完成任务 = to complete a task)",
        solution: {
          method: "Find the word that goes naturally with 完成 (wánchéng, to complete/finish) ____.",
          steps: [
            "The object after 完成 (wánchéng, to complete/finish) should be a noun that refers to a 'task or job'.",
            "(1) When combined with 任务 (rènwù, mission/task), it forms the natural phrase 完成任务 (to complete a mission/task).",
            "破坏, 发抖, 摆动, 强壮, and 希望 do not work as objects after 完成.",
          ],
          tip: "Just like 完成任务, 完成作业, and 完成工作, the word after 完成 should be a noun that means 'something that needs to be done'.",
        },
      },
    ],
  },

  // ===================== 五、(一) 仿写句子 (JuZi) Q17-Q18 =====================
  {
    id: "p3_zh_eoy_nh_017",
    topic: "JuZi",
    difficulty: "stretch",
    instruction:
      "（一）仿写句子：根据所提供的句式，仿写一个句子。\n例子：爷爷可以去公园散步或者找朋友谈天。（……或者……）\n仿写：小光可以喝牛奶或者果汁。",
    q: "只要今天不下雨，我们就去公园跑步。\n（只要……，就……）\n仿写：____________________",
    answer:
      "（参考答案）只要明天不刮风，妹妹就去海边放风筝。 / 只要他考试及格，爸爸就带他去看电影。",
    pinyin: "zhǐ yào ... jiù ...",
    meaning: "as long as ..., then ... (a conditional sentence pattern)",
    solution: {
      method: "Use the '只要……，就……' structure from the example sentence to write a new sentence that naturally connects a condition (只要) with its result (就).",
      steps: [
        "Step 1: Write the '只要 + condition' part. Example: 只要明天不刮风 (As long as it is not windy tomorrow).",
        "Step 2: Write the '就 + result/action' part. Example: 妹妹就去海边放风筝 (my younger sister will go to the beach to fly a kite).",
        "Step 3: Put both parts together to form a complete sentence, like '只要明天不刮风，妹妹就去海边放风筝。' Make sure the subject is consistent and the condition and result are connected in a logical way.",
      ],
      tip: "'只要……就……' means 'as long as the condition is met, the result will happen'. It is similar to '如果……就……(if… then…)', but it puts more emphasis on the condition being sufficient to cause the result.",
    },
  },
  {
    id: "p3_zh_eoy_nh_018",
    topic: "JuZi",
    difficulty: "stretch",
    instruction:
      "（一）仿写句子：根据所提供的句式，仿写一个句子。",
    q: "我叫了他很多次，他却没有回答。\n（……，却……）\n仿写：____________________",
    answer:
      "（参考答案）妈妈做了很多好吃的菜，弟弟却一口也不吃。 / 天已经很晚了，妹妹却还不想睡觉。",
    pinyin: "què",
    meaning: "however, yet (indicates an unexpected contrast)",
    solution: {
      method: "Use the '……，却……' structure from the example sentence to write a new sentence that shows a contrast or an unexpected result compared to the first part.",
      steps: [
        "Step 1: Write an action or situation in the first part. Example: 妈妈做了很多好吃的菜 (Mum cooked a lot of delicious food).",
        "Step 2: After '却', write a result that is opposite or unexpected. Example: 弟弟却一口也不吃 (but my younger brother did not eat even a single bite).",
        "Step 3: Join both parts together to form a contrast sentence using '却'. Note that '却' is usually placed in the second part of the sentence, after the subject and before the verb.",
      ],
      tip: "'却' has a similar meaning to '但是 (however/but)', but the difference is that '却' is an adverb placed in the middle of the sentence, after the subject. Example: 他很努力，成绩却不好。(He works very hard, but his results are not good.)",
    },
  },

  // ===================== 五、(二) A) 改写句子 - 改成陈述句 Q19 =====================
  {
    id: "p3_zh_eoy_nh_019",
    topic: "JuZi",
    difficulty: "core",
    instruction:
      "（二）句子变变变 A）改写句子，把对话改成陈述句 (chén shù jù)。\n例子：妈妈对妹妹说：\u201c把门拉开。\u201d\n改写：妈妈叫妹妹把门拉开。",
    q: "爸爸对小文说：\u201c出门前要记得关灯。\u201d\n改写：____________________",
    answer: "爸爸叫小文出门前要记得关灯。",
    pinyin: "chén shù jù",
    meaning: "declarative sentence (statement)",
    solution: {
      method: "This question asks you to change a direct speech sentence (\"……\") into indirect speech (a statement). Like the example, change the form 'A对B说：\"……\"' to the form 'A叫B……'.",
      steps: [
        "Original sentence: 爸爸对小文说：\"出门前要记得关灯。\" (Dad said to Xiao Wen: \"Remember to turn off the lights before going out.\")",
        "Change '对……说' to '叫', and keep the content inside the quotation marks the same. Because the content is a command or request, it connects naturally with '叫'.",
        "Result: 爸爸叫小文出门前要记得关灯。— The quotation marks and '说' are removed, and it becomes a statement in the form '叫 + person + action'.",
      ],
      tip: "The basic pattern is: '对……说：\"……\"' → '叫……+ content'. When the sentence is a command, it is natural to use '叫'.",
    },
  },

  // ===================== 五、(二) B) 扩写句子 Q20 =====================
  {
    id: "p3_zh_eoy_nh_020",
    topic: "JuZi",
    difficulty: "core",
    instruction:
      "B）用括号里的词语扩写 (kuò xiě) 句子。\n例子：天上有一个月亮。（弯弯的）\n扩写：天上有一个弯弯的月亮。",
    q: "小猫把桌子上的鱼吃掉了。（偷偷地）\n扩写：____________________",
    answer: "小猫偷偷地把桌子上的鱼吃掉了。",
    pinyin: "tōu tōu de",
    meaning: "secretly, stealthily",
    solution: {
      method: "Use the word in brackets (偷偷地) to expand (扩写) the original sentence to make it more detailed and vivid. Since '偷偷地' is an adverb that describes how the action is done, place it in front of the verb.",
      steps: [
        "Original sentence: 小猫把桌子上的鱼吃掉了。(The cat ate up the fish on the table.)",
        "'偷偷地' (secretly) is an adverb that describes how the action '吃掉' (eat up) is done. In a '把' sentence, it is placed after '把' and before the verb.",
        "Result: 小猫偷偷地把桌子上的鱼吃掉了。— Insert '偷偷地' before '把桌子上的鱼' to expand the sentence.",
      ],
      tip: "In a '把' sentence, adverbs (e.g. 偷偷地, 一下子) can usually be placed after the subject and before '把', or after '把' and before the object. In this case, placing it before '把' sounds more natural.",
    },
  },

  // ===================== 六、组句成段 (ZuJu) Q21-Q25 =====================
  {
    id: "p3_zh_eoy_nh_set3",
    topic: "ZuJu",
    difficulty: "stretch",
    setLabel: "Nan Hua EOY Paper 2 - 六、组句成段",
    passage:
      "Arrange the sentences in the correct order and write the correct number in the brackets.\n(1) 小明和小华不小心弄脏了邻居的鞋。← This is already given as sentence 1 (the beginning of the story).",
    wordBank: [
      "(1) 小明和小华不小心弄脏了邻居的鞋。",
      "小明想了想，明白自己做得不对。",
      "小明见邻居不在家，想赶快离开。",
      "小华说：\u201c不行，我们应该认错。\u201d",
      "他对小华说：\u201c反正没有人看到，我们赶快走吧！\u201d",
      "他决定和小华一起给邻居留一张便条，向她道歉。",
    ],
    questions: [
      {
        id: "p3_zh_eoy_nh_021",
        type: "OpenEnded",
        q: "Q21. 小明想了想，明白自己做得不对。",
        answer: "5",
        pinyin: "míng bái",
        meaning: "to understand, to realize",
        solution: {
          method: "Understand the flow of the story (cause → conflict → realisation → solution) to decide where this sentence belongs.",
          steps: [
            "Full story outline: (1) They dirtied the shoes → tried to leave → Hua Hua objected → friend made a suggestion → realisation → decided to apologise.",
            "The sentence 'clearly realised it was their own fault' should come right after the friend said 'No, you must apologise', and right before the final decision (to leave a note).",
            "Therefore, this sentence is in the 5th position.",
          ],
          tip: "For 'arrange sentences into a paragraph' questions, look carefully at the time order, cause and effect, and how a character's feelings change (e.g. wants to leave → conflict → realisation → action).",
        },
      },
      {
        id: "p3_zh_eoy_nh_022",
        type: "OpenEnded",
        q: "Q22. 小明见邻居不在家，想赶快离开。",
        answer: "2",
        pinyin: "lí kāi",
        meaning: "to leave",
        solution: {
          method: "Right after the event where the shoes got dirty, figure out where the sentence showing the character's first reaction (wanting to leave) should go.",
          steps: [
            "Right after the event in (1) where the shoes were dirtied, the characters' first reaction was the thought: 'There are no neighbours around, let's leave quickly.'",
            "This is the second step in the story, before the conflict begins, so it comes in 2nd place.",
          ],
          tip: "After the first sentence of a story, there is usually the character's 'first reaction'. After that comes another character's opinion, which starts the conflict.",
        },
      },
      {
        id: "p3_zh_eoy_nh_023",
        type: "OpenEnded",
        q: "Q23. 小华说：\u201c不行，我们应该认错。\u201d",
        answer: "4",
        pinyin: "rèn cuò",
        meaning: "to admit a mistake",
        solution: {
          method: "After Xiao Ming said 'let's leave quickly', figure out where the sentence showing Xiao Hua's opposing opinion (that they should apologise) should go.",
          steps: [
            "Right after Xiao Ming said 'Nobody saw us, let's leave quickly' (sentence 3, not sentence 5), it is natural for Xiao Hua to disagree and say 'No, we must own up to our mistake.'",
            "Therefore, this sentence comes right after sentence 3, so it is in 4th place.",
          ],
          tip: "When dialogue sentences appear one after another, follow the flow where B's response (agreement or disagreement) comes after A's words.",
        },
      },
      {
        id: "p3_zh_eoy_nh_024",
        type: "OpenEnded",
        q: "Q24. 他对小华说：\u201c反正没有人看到，我们赶快走吧！\u201d",
        answer: "3",
        pinyin: "fǎn zhèng",
        meaning: "anyway, regardless",
        solution: {
          method: "After Xiao Ming made up his mind that he 'wants to leave' (sentence 2), figure out where the dialogue sentence where he actually says this to Xiao Hua should go.",
          steps: [
            "In sentence 2, Xiao Ming felt that he 'wanted to leave quickly', and the next step is that he actually says to Xiao Hua: 'Nobody saw us, let's go quickly.'",
            "This must come before Xiao Hua's disagreement (sentence 4: 'No, we must apologise'), so it is in 3rd place.",
          ],
          tip: "After a sentence about what a character 'thinks', there is usually a sentence where the character actually 'says' that thought out loud.",
        },
      },
      {
        id: "p3_zh_eoy_nh_025",
        type: "OpenEnded",
        q: "Q25. 他决定和小华一起给邻居留一张便条，向她道歉。",
        answer: "6",
        pinyin: "dào qiàn",
        meaning: "to apologize",
        solution: {
          method: "At the end of the story, figure out where the sentence goes that shows what action Xiao Ming decided to take after he realised his mistake.",
          steps: [
            "In sentence 5, Xiao Ming realised that he had done something wrong.",
            "The final action that follows the realisation (deciding to leave a note and apologise) is the last step of the story, so it comes 6th (last) in order.",
          ],
          tip: "Ending sentences in a story often include expressions like '决定' (to decide), '于是' (so/therefore), and '最后' (finally).",
        },
      },
    ],
  },

  // ===================== 七、阅读理解(一) (YueReadMCQ + YueReadOpen) Q26-Q28 =====================
  {
    id: "p3_zh_eoy_nh_set4",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Nan Hua EOY Paper 2 - 七、阅读理解（一）欢天喜地庆祝儿童节",
    passage:
      "欢天喜地庆祝儿童节\n为了庆祝儿童节，老师们准备了各种有趣的活动，希望同学们能有一个难忘的儿童节。\n同学们当天将会有一个小时的休息时间，让大家能到各个地点去参加不同的活动。\n日期：2025年10月10日\n时间：休息时间，上午9点至11点\n地点：礼堂／图书馆／篮球场\n\n【活动表】\n上午9点到10点（一、二、三年级）：折纸飞机★学会废物利用（礼堂）；书法比赛（图书馆）\n上午10点到11点（四、五、六年级）：制作彩虹转盘★必须自己带硬纸板（篮球场）；猜字谜比赛（图书馆）\n\n如果你想要参加书法比赛或者猜字谜比赛，请在10月8日以前向你的华文老师报名。\n欢乐小学\n10月1日",
    questions: [
      {
        id: "p3_zh_eoy_nh_026",
        type: "MCQ",
        q: "为什么欢乐小学要准备各种有趣的活动？",
        options: [
          "希望同学们可以有一个难忘的下午。",
          "希望同学们能过一个快乐的儿童节。",
          "希望同学们有一个小时的休息时间。",
          "希望同学们参加活动后能得到礼物。",
        ],
        answer: 2,
        pinyin: "nán wàng",
        meaning: "unforgettable, memorable",
        solution: {
          method: "Look in the first paragraph of the notice to find the 'purpose' behind why the activity was organised.",
          steps: [
            "Paragraph 1 of the passage: '为了庆祝儿童节，老师们准备了各种有趣的活动，希望同学们能有一个难忘的儿童节。'",
            "Here, it says they hope everyone can have '一个难忘的儿童节' (an unforgettable Children's Day), which matches option (2) — wishing everyone a happy Children's Day.",
            "Option (1) says 'afternoon', but the passage says '儿童节' (Children's Day). Option (3) describes the format of the activity, not the purpose. Option (4) is not mentioned in the passage.",
          ],
          tip: "Focus on the key sentence in the passage (usually in the first paragraph) and look out for purpose phrases like '为了……，希望……' — this will help you find the answer easily.",
        },
      },
      {
        id: "p3_zh_eoy_nh_027",
        type: "MCQ",
        q: "以下哪一句话是对的？",
        options: [
          "小四的学生可以报名参加书法比赛。",
          "想折纸飞机的学生可以到篮球场报到。",
          "学生必须自己带硬纸板来制作彩虹转盘。",
          "参加各种活动都必须在10月8日以前报名。",
        ],
        answer: 3,
        pinyin: "yìng zhǐ bǎn",
        meaning: "cardboard",
        solution: {
          method: "Check each detail in the activity schedule (timetable) one by one against the passage to find the correct statement.",
          steps: [
            "Option (1): 书法比赛 is scheduled for Primary 1–3 students (9–10am), so it is wrong to say Primary 4 (小四) students can join.",
            "Option (2): 折纸飞机 takes place in the 礼堂 (hall), so it is wrong to say students need to go to the 篮球场 (basketball court).",
            "Option (3): Under 制作彩虹转盘, it clearly states '★必须自己带硬纸板' (students must bring their own cardboard), so this statement is correct.",
            "Option (4): The passage only states that 书法比赛 or 猜字谜比赛 require sign-up before 8 October, so it is wrong to say 'all activities' require early registration.",
          ],
          tip: "For this type of question, compare each option carefully against the table or details in the passage one by one. Pay special attention to words like '都/全部/每个' (all/every), and check whether they truly match what the passage says.",
        },
      },
      {
        id: "p3_zh_eoy_nh_028",
        type: "OpenEnded",
        q:
          "如果你是小康，今年三年级，想要参加儿童节的庆祝活动。请你完成以下便条，告诉安安儿童节庆祝活动的日期，你想参加哪一个活动，以及那个活动的地点，并问他要不要和你一起参加这个活动。（2分）\n\n安安：\n　　学校将在______________________庆祝儿童节，当天会有很多有趣的活动。我想要参加的活动是______________，想请你和我一起去。我们可以在休息时间去______________参加这个活动。你______________吗？\n\n小康\n10月2日 下午5点",
        answer:
          "安安：\n　　学校将在10月10日庆祝儿童节，当天会有很多有趣的活动。我想要参加的活动是折纸飞机，想请你和我一起去。我们可以在休息时间去礼堂参加这个活动。你可以和我一起参加吗？",
        pinyin: "biàn tiáo",
        meaning: "note, memo",
        solution: {
          method: "Use the information from the notice in the passage to fill in 4 blanks and complete a short note (便条) introducing the activities to a friend and asking if they would like to join.",
          steps: [
            "Blank 1: The date of the Children's Day event → The passage states '日期：2025年10月10日' → Answer: '10月10日'.",
            "2nd blank: Think about an activity that a Primary 3 student (小康) can join → Students from Primary 1 to 3 can choose between 折纸飞机 or 书法比赛 during the '9–10am' slot → Example answer: '折纸飞机'.",
            "3rd blank: Think about where that activity takes place → 折纸飞机 is held in the 礼堂 (school hall) → Answer: '礼堂'.",
            "4th blank: Write a sentence asking if the other person wants to join you together → Use a format like '你可以和我一起参加吗?' or '你要不要和我一起参加?'.",
          ],
          tip: "When writing a 便条 (note), make sure to include the correct details from the passage (such as the date, activity, and place). At the end, it is natural to finish with a question asking for the other person's opinion.",
        },
      },
    ],
  },

  // ===================== 八、阅读理解二 (YueReadOpen) Q29-Q32 =====================
  {
    id: "p3_zh_eoy_nh_set5",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Nan Hua EOY Paper 2 - 八、阅读理解二",
    passage:
      "小宝从小就喜欢画画。他常常一画就是几个小时，连妈妈叫他吃饭都听不见。可是，他怎么画都画得不太好。\n有一天，老师让同学在班上画画，并选出最好的三张参加比赛。小宝看到同学都画得很好，对自己没信心，但还是努力地完成他的画。\n当天，小宝的画没被选中，他很难过。老师看到了，对他说：\u201c不要放弃。只要继续努力，你的画以后一定能被选上的！\u201d\n第二年，学校又有画画比赛。这一次，小宝的画被选上了！有同学问他：\u201c你怎么会有那么大的进步？\u201d小宝说：\u201c听了老师的话，我每天花更多时间练习，还会多看和画画有关的书。\u201d老师听了，说：\u201c同学们，我们要多向小宝学习！\u201d",
    questions: [
      {
        id: "p3_zh_eoy_nh_029",
        type: "OpenEnded",
        q: "从哪里可以看出小宝喜欢画画？（2分）",
        answer:
          "\u201c小宝从小就喜欢画画。他常常一画就是几个小时，连妈妈叫他吃饭都听不见。\u201d从这里可以看出小宝喜欢画画。",
        pinyin: "cóng nǎ lǐ",
        meaning: "from where (used to ask for textual evidence)",
        solution: {
          method: "For questions that ask 'How do you know?' or 'Where can you tell from?', the key skill is to find the sentence in the passage that directly shows that information, and quote it in your answer.",
          steps: [
            "Look in the first paragraph of the passage for a direct piece of evidence that shows 小宝 loves drawing.",
            "The sentence '他常常一画就是几个小时，连妈妈叫他吃饭都听不见。' shows that he is so focused on drawing that he loses track of time and does not even hear his mum calling him for meals.",
            "You can either quote this sentence directly, or use a frame like '从…可以看出小宝喜欢画画' to complete your answer.",
          ],
          tip: "For '从哪里可以看出……?' (How can you tell that…?) question types, the answer is often already in the passage. Find the relevant sentence and copy it out using quotation marks.",
        },
      },
      {
        id: "p3_zh_eoy_nh_030",
        type: "OpenEnded",
        q: "看到同学都画得很好，小宝有什么反应？（2分）",
        answer: "他对自己没有信心，但还是努力地完成他的画。",
        pinyin: "xìn xīn",
        meaning: "confidence",
        solution: {
          method: "Find the part in the passage that describes 小宝's feelings and actions after seeing his classmates' drawings.",
          steps: [
            "Second paragraph of the passage: '小宝看到同学都画得很好，对自己没信心，但还是努力地完成他的画。'",
            "Your answer must include both reactions from this sentence — (1) he lost confidence in himself, and (2) he still tried his best to finish his drawing.",
            "Include both points in your answer, for example: '他对自己没有信心，但还是努力地完成他的画。'",
          ],
          tip: "For 2-mark questions, there are usually two key pieces of information that must be included in your answer. Make sure to find both pieces of information from the passage and include them — do not leave either one out.",
        },
      },
      {
        id: "p3_zh_eoy_nh_031",
        type: "OpenEnded",
        q: "小宝怎么画得越来越好？（3分）",
        answer:
          "因为他听从老师的鼓励，坚持不断练习，还经常看和画画有关的书，所以画得越来越好。",
        pinyin: "jiān chí",
        meaning: "to persist, to keep on (doing something)",
        solution: {
          method: "Look at the last paragraph of the passage and find all the reasons or methods that explain why 小宝's drawings kept getting better. Since this question is worth 3 marks, you need to include three key points in your answer.",
          steps: [
            "Passage: 'Xiao Bao said: \"After listening to my teacher's words, I spend more time practising every day, and I also read more books related to drawing.\"'",
            "3 key points: ① Listened to the teacher's words (encouragement), ② Spends more time practising every day, ③ Reads more books related to drawing.",
            "Link these 3 key points using the '因为……所以……' structure to form a complete sentence: '因为他听从老师的鼓励，坚持不断练习，还经常看和画画有关的书，所以画得越来越好。'",
          ],
          tip: "The more marks a question is worth (in this case, 3 marks), the more key points you need to include in your answer. It is important not to leave out any of the points listed in the passage.",
        },
      },
      {
        id: "p3_zh_eoy_nh_032",
        type: "OpenEnded",
        q: "你从小宝身上学到什么？（3分）",
        answer: "我学到做事要坚持不放弃，只要努力就会进步。",
        pinyin: "fàng qì",
        meaning: "to give up",
        solution: {
          method: "This question has no single fixed answer — it is a 'personal opinion / lesson learnt' question. Express a lesson that is related to the theme of the passage (perseverance, hard work, regaining confidence) in your own words.",
          steps: [
            "Identify the main message of the passage: Xiao Bao was not very good at drawing at first, but after receiving encouragement from the teacher, he kept working hard and eventually improved.",
            "The general lesson we can learn from this is: 'If we keep working hard without giving up, we will improve.'",
            "Express this using the '我学到……' structure: '我学到做事要坚持不放弃，只要努力就会进步。' (Other reasonable lessons may also be accepted as correct answers.)",
          ],
          tip: "For 'feelings / lesson learnt' questions like this, your answer must be related to the theme of the passage. It is best to write a complete sentence using '我学到/ 我明白了 + lesson learnt'. Since there is no single fixed answer, any response that is logically connected to the passage will be accepted as correct.",
        },
      },
    ],
  },
];

export default eoyNanHuaHigherPaper2_2025;
