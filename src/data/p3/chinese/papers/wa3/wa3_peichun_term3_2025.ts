// ============================================================================
// Pei Chun Public School (公立培群学校)
// P3 Higher Chinese (高级华文) — 第三学段测试 (Term 3 Weighted Assessment)
// Source: sgexam.com P3 Chinese WA3 compilation
// Total marks: 20
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_peichun_term3_2025: Question[] = [
  // ==========================================================================
  // (一) 组句成段 ZuJu — Q1 (1题5分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc3_001",
    topic: "ZuJu",
    difficulty: "stretch",
    instruction:
      "根据所提供的短句，把下面的句子重新排列，组成合理的段落，然后把数目字填写在括号里。",
    // q에는 원문 보기(섞인 순서)를 보존. 보기 앞 번호는 원문 등장 순서.
    q:
      "（ ）妹妹听了哥哥的话，马上就拿起扫把来扫地。\n" +
      "（ ）哥哥也去拿了一块抹布把家里的桌子都抹干净了。\n" +
      "（ ）一个周末的下午，哥哥看到家里又脏又乱。\n" +
      "（ ）爸爸妈妈回来后，看到家里这么干净，开心极了。\n" +
      "（ ）哥哥就对妹妹说：“我们一起帮爸爸妈妈收拾房间吧！”",
    // answer: 원문 등장 순서대로 매겨야 할 순서 번호 (위에서부터)
    answer: "3, 4, 1, 5, 2",
    pinyin: "zǔ jù chéng duàn",
    meaning:
      "Re-order the sentences into a logical paragraph. Correct sequence: (3)(4)(1)(5)(2). Logical story order: see solution.",
    solution: {
      method: "Arranging sentences in the order events happen (time and cause-and-effect)",
      steps: [
        "① Background: '一个周末的下午，哥哥看到家里又脏又乱。' (3rd line in the original text)",
        "② Beginning: '哥哥就对妹妹说：…收拾房间吧！' (5th line in the original text)",
        "③ Development: '妹妹听了哥哥的话，马上就拿起扫把来扫地。' (1st line in the original text)",
        "④ Development: '哥哥也去拿了一块抹布把家里的桌子都抹干净了。' (2nd line in the original text)",
        "⑤ Ending: '爸爸妈妈回来后，看到家里这么干净，开心极了。' (4th line in the original text)",
        "So the correct order of the lines from top to bottom in the original text is: 3, 4, 1, 5, 2.",
      ],
      tip: "We can follow the flow of 'suggestion → action → result', and use linking words like '听了…的话' to connect the sentences.",
    },
  },

  // ==========================================================================
  // (二) 词语搭配 PeiDui — Q2-Q6 (5题5分, 每题1分)
  // 词语库: 1引来 2招呼 3利用 4保护 5浪费 6清洗 7环保 8环境
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc3_002",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题的词语搭配成合理词组的词语，然后把代表它的数目字填写在括号里。每个词语只能用一次。【词语库：1引来 2招呼 3利用 4保护 5浪费 6清洗 7环保 8环境】",
    q: "破坏（___）",
    answer: 8, // 环境 → 破坏环境
    pinyin: "pò huài huán jìng",
    meaning: "'破坏环境' = to destroy/damage the environment.",
    solution: {
      method: "Matching verbs with the correct nouns (Verb + Noun pairing)",
      steps: [
        "'破坏 (to destroy/damage)' needs a big or important thing as its object.",
        "From the word bank, '环境 (environment)' fits best in meaning.",
        "→ 破坏环境 (8).",
      ],
      tip: "'环保 (7)' is used more like a noun (short for 'protecting the environment'), so '环境 (8)' is the more natural object to use after '破坏'.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_003",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题的词语搭配成合理词组的词语，然后把代表它的数目字填写在括号里。每个词语只能用一次。【词语库：1引来 2招呼 3利用 4保护 5浪费 6清洗 7环保 8环境】",
    q: "（___）厕所",
    answer: 6, // 清洗 → 清洗厕所
    pinyin: "qīng xǐ cè suǒ",
    meaning: "'清洗厕所' = to clean/wash the toilet.",
    solution: {
      method: "Matching verbs with the correct places (Verb + Place pairing)",
      steps: [
        "The action that goes before '厕所 (toilet)' should mean 'to wash' or 'to clean'.",
        "'清洗' from the word bank matches correctly with '厕所'.",
        "→ 清洗厕所 (6).",
      ],
      tip: "'清洗' is often used for cleaning something by washing it with water.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_004",
    topic: "PeiDui",
    difficulty: "stretch",
    instruction:
      "从所提供的词语中，选出可以和各题的词语搭配成合理词组的词语，然后把代表它的数目字填写在括号里。每个词语只能用一次。【词语库：1引来 2招呼 3利用 4保护 5浪费 6清洗 7环保 8环境】",
    q: "废物（___）",
    answer: 3, // 利用 → 废物利用
    pinyin: "fèi wù lì yòng",
    meaning: "'废物利用' = to reuse/recycle waste materials (a fixed environmental phrase).",
    solution: {
      method: "Recognising fixed phrases (固定词组)",
      steps: [
        "'废物___' is a fixed phrase from the Environment topic: 废物利用 (recycling waste materials).",
        "Choose '利用' from the word bank.",
        "→ 废物利用 (3).",
      ],
      tip: "Common fixed phrases from the Environment topic: 废物利用 / 保护环境 / 浪费水电.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_005",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题的词语搭配成合理词组的词语，然后把代表它的数目字填写在括号里。每个词语只能用一次。【词语库：1引来 2招呼 3利用 4保护 5浪费 6清洗 7环保 8环境】",
    q: "（___）水电",
    answer: 5, // 浪费 → 浪费水电
    pinyin: "làng fèi shuǐ diàn",
    meaning: "'浪费水电' = to waste water and electricity.",
    solution: {
      method: "Matching verb + noun pairs",
      steps: [
        "Think about what action goes with '水电 (water and electricity)' → 'to waste'.",
        "Choose '浪费' from the word bank.",
        "→ 浪费水电 (5).",
      ],
      tip: "'浪费' often goes together with resources, time, and money.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_006",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题的词语搭配成合理词组的词语，然后把代表它的数目字填写在括号里。每个词语只能用一次。【词语库：1引来 2招呼 3利用 4保护 5浪费 6清洗 7环保 8环境】",
    q: "（___）蚊虫",
    answer: 1, // 引来 → 引来蚊虫
    pinyin: "yǐn lái wén chóng",
    meaning: "'引来蚊虫' = to attract mosquitoes/insects.",
    solution: {
      method: "Matching verb + noun pairs",
      steps: [
        "Think about what action goes before '蚊虫 (mosquitoes and insects)' → 'to attract or draw in'.",
        "Choose '引来' from the word bank.",
        "→ 引来蚊虫 (1).",
      ],
      tip: "'引来 (to attract)' often appears in contexts where rubbish or dirt attracts insects.",
    },
  },

  // ==========================================================================
  // (三) 看图选词 KanTu — Q7-Q10 (4题4分, 每题1分)
  // 词语库: 1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc3_007",
    topic: "KanTu",
    difficulty: "foundation",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[Picture Q7: Photo of recycling and waste-sorting bins]",
    answer: 5, // 垃圾桶
    pinyin: "lā jī tǒng",
    meaning: "'垃圾桶' = rubbish bin / dustbin.",
    solution: {
      method: "Matching pictures to words (identifying objects)",
      steps: [
        "The picture shows large bins with a recycling symbol (△) → these are rubbish bins.",
        "Choose '垃圾桶' from the word list (5).",
      ],
      tip: "The recycling triangle symbol (♺) is usually a clue for '垃圾桶/回收箱' (rubbish bin/recycling box).",
    },
  },
  {
    id: "p3_zh_wa3_pc3_008",
    topic: "KanTu",
    difficulty: "foundation",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[Picture Q8: A photo of a cloth bag (eco bag) with the word 'GREEN' printed on it]",
    answer: 1, // 环保袋
    pinyin: "huán bǎo dài",
    meaning: "'环保袋' = reusable/eco-friendly bag.",
    solution: {
      method: "Picture-word matching (object recognition)",
      steps: [
        "The picture shows a reusable cloth bag with the word 'GREEN' printed on it.",
        "Choose '环保袋' from the word list (1).",
      ],
      tip: "A cloth or reusable bag used instead of a plastic bag = 环保袋 (eco bag).",
    },
  },
  {
    id: "p3_zh_wa3_pc3_009",
    topic: "KanTu",
    difficulty: "core",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[Picture Q9: A photo of the Singapore Merlion statue (a lion statue with water spouting from its mouth)]",
    answer: 6, // 鱼尾狮
    pinyin: "yú wěi shī",
    meaning: "'鱼尾狮' = the Merlion (Singapore's lion-fish landmark statue).",
    solution: {
      method: "Picture-word matching (recognition of Singapore landmark)",
      steps: [
        "The picture shows a statue with a lion's head and a fish's body, spouting water → this is the Merlion.",
        "Choose '鱼尾狮' from the word list (6).",
      ],
      tip: "'鱼尾狮 (Merlion)' is a famous Singapore landmark and often appears in exam questions.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_010",
    topic: "KanTu",
    difficulty: "foundation",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[Picture Q10: A photo of a bicycle]",
    answer: 3, // 脚踏车
    pinyin: "jiǎo tà chē",
    meaning: "'脚踏车' = bicycle (Singaporean term; 自行车 in PRC).",
    solution: {
      method: "Picture-word matching (object recognition)",
      steps: [
        "The picture shows a bicycle with two wheels.",
        "Choose '脚踏车' from the word bank (3).",
      ],
      tip: "In Singapore, a bicycle is called '脚踏车' (same as '自行车').",
    },
  },

  // ==========================================================================
  // (四) 理解问答 YueReadOpen — Q11-Q13 (3题6分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc3_set1",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Pei Chun 第三学段 — 理解问答（河马与小动物）",
    instruction: "根据短文的内容和上下文的意思，回答下列的问题。",
    passage:
      "树林里有一条小河，河边住着很多小动物，它们常常到这里来喝水、玩耍(shuǎ)。有一天，一只河马来到这里，就在那里住下了。可是，小动物们在河边玩时有点吵，河马很生气，就把动物们都赶走了。\n" +
      "一只小羊生气地对河马说：“为什么要赶我们走？”河马不理它，它只好难过地走开了。\n" +
      "有一天，当一只小鸟飞过小河时，它发现河马躺(tǎng)在河边，好像生病了。小鸟飞到河马身边，问：“河马大哥，你怎么了？”“我身上有很多虫子。”河马回答。\n" +
      "小鸟马上叫小动物们来帮助河马，小鸟把河马身上的虫子都吃掉了，小羊和小狗拔了很多青草给河马吃。很快地，河马的身体就好了。\n" +
      "河马知道自己错了，向小动物们说对不起，还请它们都回到河边来玩。小河又热闹起来了。",
    questions: [
      {
        id: "p3_zh_wa3_pc3_011",
        type: "OpenEnded",
        q: "河马为什么要赶走小动物们？（2分）",
        answer:
          "因为小动物们在河边玩时有点吵，河马很生气，所以要赶走小动物们。",
        pinyin:
          "yīn wèi xiǎo dòng wù men zài hé biān wán shí yǒu diǎn chǎo, hé mǎ hěn shēng qì, suǒ yǐ yào gǎn zǒu xiǎo dòng wù men",
        meaning: "Because the little animals were a bit noisy while playing by the river, the hippo got angry and chased them away.",
        solution: {
          method: "Cause-and-effect answer type — use the '因为…所以…' sentence pattern.",
          steps: [
            "Find your evidence from Paragraph 1: '小动物们在河边玩时有点吵，河马很生气，就把动物们都赶走了'.",
            "Because the question asks '为什么', you must answer using the '因为…所以…' pattern.",
            "→ 因为…有点吵，河马很生气，所以要赶走小动物们。",
          ],
          tip: "The passage shows a chain of causes and effects: '吵 → 生气 → 赶走'. Make sure your answer includes all three parts.",
        },
      },
      {
        id: "p3_zh_wa3_pc3_012",
        type: "OpenEnded",
        q: "小动物们知道河马生病了后，它们是怎么帮助河马的？（2分）",
        answer:
          "小鸟把河马身上的虫子都吃掉了，小羊和小狗拔了很多青草给河马吃。",
        pinyin:
          "xiǎo niǎo bǎ hé mǎ shēn shàng de chóng zi dōu chī diào le, xiǎo yáng hé xiǎo gǒu bá le hěn duō qīng cǎo gěi hé mǎ chī",
        meaning: "The little bird ate up all the bugs on the hippo's body, and the lamb and the dog pulled lots of grass for the hippo to eat.",
        solution: {
          method: "Listing specific actions answer type — answering '怎么 (how)' questions.",
          steps: [
            "Paragraph 4 contains both helping actions.",
            "① 小鸟把虫子吃掉, ② 小羊和小狗拔青草给河马吃.",
            "You must write down both actions to get full marks (2 points).",
          ],
          tip: "For '怎么帮助', you must include every action for each animal — missing any action will cost you marks.",
        },
      },
      {
        id: "p3_zh_wa3_pc3_013",
        type: "OpenEnded",
        q: "你认为小羊听到河马说对不起后，它会怎么做？为什么？（2分）",
        answer: "小羊会原谅河马，因为河马知道自己错了。",
        pinyin:
          "xiǎo yáng huì yuán liàng hé mǎ, yīn wèi hé mǎ zhī dào zì jǐ cuò le",
        meaning: "The lamb would forgive the hippo, because the hippo realised it was wrong (and apologised).",
        solution: {
          method: "Inference + evidence answer type — you must answer two parts: '会怎么做 (what will happen)' and '为什么 (why)'.",
          steps: [
            "First part: predict the action → 小羊会原谅河马 (Little Sheep will forgive Hippo).",
            "Second part: give the reason → 因为河马知道自己错了 (because Hippo admitted his mistake and apologised).",
            "Answer both sub-questions separately — do not leave either part out.",
          ],
          tip: "For '...吗/会怎么做 + 为什么' questions, you must always write BOTH your 'judgement/decision' AND your 'reason'.",
        },
      },
    ],
  },
];

export default wa3_peichun_term3_2025;
