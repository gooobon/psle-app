// ============================================================================
// Pei Chun Public School (公立培群学校)
// P3 Higher Chinese (高级华文) — 第二学段测试 (Term 2 Weighted Assessment)
// Source: sgexam.com P3 Chinese WA3 compilation
// Total marks: 26 (Booklet A: 10 / Booklet B: 16)
// NOTE: 听力(Listening) 및 看图作文(Composition)은 제외함.
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_peichun_term2_2025: Question[] = [
  // ==========================================================================
  // (一) 辨字测验 BianZi — Booklet A, Q1-Q4 (4题4分, 每题1分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc2_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "小时候的事（___），我还记在心里。",
    options: ["晴", "请", "情", "青"],
    answer: 2, // 情 (事情)
    pinyin: "shì qíng",
    meaning: "matter / affair — '事情(shìqíng)' means 'a matter, an event'. Here the blank completes 事情.",
    solution: {
      method: "Identifying Phono-semantic Characters (形声字) — telling apart characters that share the same phonetic component '青'",
      steps: [
        "All 4 answer choices share '青 (qīng)' as their phonetic component: 晴 (clear weather), 请 (to invite/request), 情 (feeling/matter), 青 (green/blue).",
        "The blank in '事___' needs a word that means 'matter' or 'affair'.",
        "'事情 (shìqíng)' is the natural word here, so we choose '情', which has the semantic component '忄(heart radical)', suggesting something related to feelings or matters.",
      ],
      tip: "晴 = weather (日 sun radical), 请 = speech (讠speech radical), 情 = heart/feeling (忄heart radical). Look at the semantic component (部首) to work out the meaning.",
    },
  },
  {
    id: "p3_zh_wa3_pc2_002",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "上学快迟到了，我来不（___）吃早餐。",
    options: ["急", "及", "机", "己"],
    answer: 1, // 及 (来不及)
    pinyin: "lái bù jí",
    meaning: "'来不及(láibùjí)' = there isn't enough time / too late to do something.",
    solution: {
      method: "Filling in a fixed expression (固定词组)",
      steps: [
        "'来不___ 吃早餐' → a situation where there is not enough time to eat breakfast.",
        "'来不及' is a set phrase meaning 'there is no time to do something' or 'it is too late to do something'.",
        "We choose '及 (jí)'.",
      ],
      tip: "Be careful not to mix it up with 急 (jí), which means 'urgent'. The phrases '来得及' and '来不及' always use '及'.",
    },
  },
  {
    id: "p3_zh_wa3_pc2_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "这辆车开得很快，（___）上了路边的大树。",
    options: ["懂", "撞", "理", "童"],
    answer: 1, // 撞
    pinyin: "zhuàng",
    meaning: "'撞(zhuàng)' = to crash into / collide. 撞上了大树 = crashed into the tree.",
    solution: {
      method: "Choosing an action verb using the semantic component (部首)",
      steps: [
        "We need an action word meaning the car was going fast and 'crashed into' a tree.",
        "'撞' has the hand radical '扌(手)', and it means 'to crash into' or 'to collide with'.",
        "懂 (to understand · 忄), 理 (to manage · 王), and 童 (child) do not fit the meaning here.",
      ],
      tip: "Characters with 扌(hand radical) often describe actions done with the hands or body → for example: 撞 (crash), 推 (push), 拉 (pull).",
    },
  },
  {
    id: "p3_zh_wa3_pc2_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "回到家，妹妹先把鞋子（___）掉，才去冲凉。",
    options: ["脱", "推", "改", "退"],
    answer: 0, // 脱
    pinyin: "tuō",
    meaning: "'脱(tuō)' = to take off (clothes/shoes). 脱鞋 = take off shoes.",
    solution: {
      method: "Choosing the right action verb based on context",
      steps: [
        "What do you do with your shoes when you come home before showering (冲凉)? → You 'take them off' (脱).",
        "'脱掉鞋子 / 把鞋子脱掉' means to take off your shoes.",
        "推 (push), 改 (change/fix), and 退 (step back) do not go together with shoes.",
      ],
      tip: "Use '脱' when taking off clothes or shoes, and '穿' when putting them on.",
    },
  },

  // ==========================================================================
  // (二) 词语选择 CiYu — Booklet A, Q5-Q7 (3题3分, 每题1分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc2_005",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "哥哥正在房里做功课，没想到爸爸（___）走了进来。",
    options: ["刚刚", "一直", "经常", "突然"],
    answer: 3, // 突然
    pinyin: "tū rán",
    meaning: "'突然(tūrán)' = suddenly / unexpectedly.",
    solution: {
      method: "Matching adverb meanings — use the clue '没想到 (unexpectedly)'",
      steps: [
        "Because '没想到 (didn't expect)' appears at the start, the sentence needs a word that shows something happened suddenly or by surprise.",
        "'突然 (suddenly)' matches the meaning of '没想到' very well.",
        "刚刚 (just now), 一直 (all along), and 经常 (often) do not give the feeling of something unexpected.",
      ],
      tip: "'没想到' and '突然' are often used together as a pair.",
    },
  },
  {
    id: "p3_zh_wa3_pc2_006",
    topic: "CiYu",
    difficulty: "core",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "小华（___）了生日礼物，送给外婆。",
    options: ["希望", "准备", "争取", "庆祝"],
    answer: 1, // 准备
    pinyin: "zhǔn bèi",
    meaning: "'准备(zhǔnbèi)' = to prepare / get ready. 准备礼物 = prepare a gift.",
    solution: {
      method: "Checking that the verb and object match correctly (Subject-Verb Agreement)",
      steps: [
        "'___ 了生日礼物，送给外婆' → This means someone prepared or got a gift to give to Grandma.",
        "'准备礼物' is the most natural verb-object match here.",
        "希望 (hope), 争取 (strive for), and 庆祝 (celebrate) are not usually used with '礼物' as the object.",
      ],
      tip: "Common verbs used with 礼物: 准备 (prepare) / 送 (give) / 收 (receive) / 买 (buy).",
    },
  },
  {
    id: "p3_zh_wa3_pc2_007",
    topic: "CiYu",
    difficulty: "stretch",
    instruction: "从各题所提供的四个答案中，选出正确的答案。",
    q: "这张桌子很重，要几个人一起才能（___）。",
    options: ["碰到", "溜走", "搬动", "拿走"],
    answer: 2, // 搬动
    pinyin: "bān dòng",
    meaning: "'搬动(bāndòng)' = to move (something heavy). 搬动桌子 = move the heavy table.",
    solution: {
      method: "Use the clues '很重 / 几个人一起' to figure out the correct verb.",
      steps: [
        "The desk is heavy and needs several people to move it together → the action is 'to move a heavy object'.",
        "'搬动' means to move something heavy with effort, so it is the best fit.",
        "碰到 (to bump into), 溜走 (to sneak away), and 拿走 (to take away) do not make sense with a heavy desk.",
      ],
      tip: "Use '搬' for heavy objects and '拿' for light objects.",
    },
  },

  // ==========================================================================
  // (三) 阅读理解 YueReadMCQ — Booklet A, Q8-Q10 (3题3分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc2_set1",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Pei Chun 第二学段 — Booklet A 阅读理解（游戏机）",
    instruction: "根据短文的内容和上下文的意思，选出正确的答案。",
    passage:
      "生日那天，叔叔送了我一台游戏机，我高兴极了！妈妈说：“只要你把功课做完，就可以玩游戏机。”从那天起，我一回到家，就很快把功课完成，然后拿起游戏机玩。\n" +
      "这一天，我在房间玩游戏机时，妈妈走了进来。她生气地说：“老师告诉我，你最近的功课做得很不认真，上课也常常睡觉。我会把游戏机收起来，这样你才能专心学习。”\n" +
      "听了妈妈的话，我低下了头，说：“对不起，妈妈。我知道错了。从今天起，我一定会好好学习。”",
    questions: [
      {
        id: "p3_zh_wa3_pc2_008",
        type: "MCQ",
        q: "谁送了“我”一台游戏机？",
        options: ["妈妈。", "叔叔。", "爸爸。", "老师。"],
        answer: 1, // 叔叔
        pinyin: "shū shu",
        meaning: "Who gave 'me' the game console? Answer: 叔叔 (uncle).",
        solution: {
          method: "Finding information directly from the text (Detail Question)",
          steps: [
            "The answer can be found directly in the first sentence: '生日那天，叔叔送了我一台游戏机'.",
            "The person who gave the gift is '叔叔' (uncle).",
          ],
          tip: "For detail questions where the answer appears directly in the passage, always check the first paragraph first.",
        },
      },
      {
        id: "p3_zh_wa3_pc2_009",
        type: "MCQ",
        q: "妈妈为什么很生气？",
        options: [
          "“我”没有做功课。",
          "“我”在玩游戏机。",
          "“我”在房里睡觉。",
          "“我”学习不认真。",
        ],
        answer: 3, // 学习不认真
        pinyin: "xué xí bù rèn zhēn",
        meaning: "Why was mum angry? Because 'I' was not studying seriously (上课睡觉, 功课不认真).",
        solution: {
          method: "Finding the reason or cause (Cause-and-Effect Question)",
          steps: [
            "Mum's words: '功课做得很不认真，上课也常常睡觉' tell us why she is angry.",
            "Option (4) '学习不认真', which summarises this, is the correct answer.",
            "Option (2) playing games is not the main cause — the key issue is the poor attitude towards learning.",
          ],
          tip: "The reason is often found directly in what the mum or teacher says in the passage.",
        },
      },
      {
        id: "p3_zh_wa3_pc2_010",
        type: "MCQ",
        q: "“我”为什么低下了头？",
        options: [
          "“我”知道自己错了。",
          "“我”正在玩游戏机。",
          "“我”要把功课做完。",
          "“我”把游戏机收好。",
        ],
        answer: 0, // 知道自己错了
        pinyin: "zhī dào zì jǐ cuò le",
        meaning: "Why did 'I' lower my head? Because 'I' knew I was wrong (low head = shame/admitting fault).",
        solution: {
          method: "Understanding the meaning behind an action (Inference Question)",
          steps: [
            "Right after '低下了头' (lowered her head), she said '对不起…我知道错了' (Sorry… I know I was wrong).",
            "Lowering one's head is an action that shows admitting a mistake and feeling sorry.",
            "Option (1) '知道自己错了' (knew she did something wrong) is the correct answer.",
          ],
          tip: "'低下头' (lower one's head) usually signals feeling embarrassed or sorry about something.",
        },
      },
    ],
  },

  // ==========================================================================
  // (四) 组合句子 JuZi — Booklet B, Q11-Q13 (3题6分, 每题2分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc2_011",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的词语来连接以下的句子。（……或者……）",
    q: "我们可以游泳。我们可以打球。",
    answer: "我们可以游泳或者打球。",
    pinyin: "wǒ men kě yǐ yóu yǒng huò zhě dǎ qiú",
    meaning: "We can swim or play ball. ('或者' = or, connecting two choices.)",
    solution: {
      method: "Use the conjunction '或者' (or) to join two sentences that show a choice.",
      steps: [
        "Since both sentences share '我们可以' (We can), write it only once.",
        "Connect the verb phrases '游泳' (swim) and '打球' (play ball) using '或者'.",
        "→ 我们可以游泳或者打球。",
      ],
      tip: "When the subject and the first part are the same in both sentences, do not repeat them — just join the different ending parts with '或者'.",
    },
  },
  {
    id: "p3_zh_wa3_pc2_012",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的词语来连接以下的句子。（……或者……）",
    q: "妹妹可以到图书馆借书。妹妹可以到图书馆看报纸。",
    answer: "妹妹可以到图书馆借书或者看报纸。",
    pinyin: "mèi mei kě yǐ dào tú shū guǎn jiè shū huò zhě kàn bào zhǐ",
    meaning: "Younger sister can borrow books or read newspapers at the library.",
    solution: {
      method: "Leave out the common part and connect the different parts with '或者'.",
      steps: [
        "Since both sentences share '妹妹可以到图书馆' (younger sister can go to the library), write it only once.",
        "Connect the different parts '借书' (borrow books) and '看报纸' (read newspapers) using '或者'.",
        "→ 妹妹可以到图书馆借书或者看报纸。",
      ],
      tip: "If even the place '到图书馆' (to the library) is the same in both sentences, do not repeat it either.",
    },
  },
  {
    id: "p3_zh_wa3_pc2_013",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的词语来连接以下的句子。（……或者……）",
    q: "小乐可以去海边。小乐可以去公园。",
    answer: "小乐可以去海边或者公园。",
    pinyin: "xiǎo lè kě yǐ qù hǎi biān huò zhě gōng yuán",
    meaning: "Xiao Le can go to the beach or the park.",
    solution: {
      method: "Leave out the common part and connect the different parts with '或者'.",
      steps: [
        "Since both sentences share '小乐可以去' (Xiao Le can go to), write it only once.",
        "Connect the two places '海边' (the beach) and '公园' (the park) using '或者'.",
        "→ 小乐可以去海边或者公园。",
      ],
      tip: "Use '去' only once, and connect the two places using '或者'.",
    },
  },

  // ==========================================================================
  // (五) 扩写句子 JuZi — Booklet B, Q14-Q15 (2题4分, 每题2分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc2_014",
    topic: "JuZi",
    difficulty: "core",
    instruction: "把括号里面的词语加在句子中适当的地方。（伤心地）",
    q: "弟弟哭了起来。",
    answer: "弟弟伤心地哭了起来。",
    pinyin: "dì di shāng xīn de kū le qǐ lái",
    meaning: "Younger brother started crying sadly. ('伤心地' = sadly, an adverbial before the verb.)",
    solution: {
      method: "Positioning the adverbial (状语) '~地' — it goes BEFORE the verb.",
      steps: [
        "'伤心地' is an adverbial meaning 'sadly'. Place it directly before the verb it describes, '哭'.",
        "Insert it after the subject '弟弟' and before the verb '哭了起来'.",
        "→ 弟弟伤心地哭了起来。",
      ],
      tip: "After '…地', there must always be a verb. ('地' is the adverbial marker.)",
    },
  },
  {
    id: "p3_zh_wa3_pc2_015",
    topic: "JuZi",
    difficulty: "core",
    instruction: "把括号里面的词语加在句子中适当的地方。（大口大口地）",
    q: "我喝杯子里的牛奶。",
    answer: "我大口大口地喝杯子里的牛奶。",
    pinyin: "wǒ dà kǒu dà kǒu de hē bēi zi lǐ de niú nǎi",
    meaning: "I gulped down the milk in the cup. ('大口大口地' = in big gulps, adverbial before verb.)",
    solution: {
      method: "Positioning the adverbial (状语) '~地' — it goes BEFORE the verb.",
      steps: [
        "'大口大口地' is an adverbial that describes how someone drinks.",
        "Place it directly before the verb '喝' and after the subject '我'.",
        "→ 我大口大口地喝杯子里的牛奶。",
      ],
      tip: "Words that describe the manner or way of an action go BEFORE the verb.",
    },
  },

  // ==========================================================================
  // (六) 阅读理解 YueReadOpen — Booklet B, Q16-Q18 (3题6分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_pc2_set2",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Pei Chun 第二学段 — Booklet B 阅读理解（小丽学游泳）",
    instruction: "根据短文的内容和上下文的意思，回答下列的问题。",
    passage:
      "今天，老师带全班同学到游泳池上课。一开始，小丽很害怕。她从小就怕水，也没有学过游泳。但是，当小丽看到同学们一个个高兴地跳进水里时，她也跟着跳了进去。原来水没有小丽想的那么可怕！\n" +
      "过后，老师教同学们把头放进水里。小丽听不到外面的声音，也看不见老师，便赶快把头伸(shēn)出水面。老师看见了，便对她说：“只要多练习这个动作，你就会习惯在水里的感觉了。”听了老师的话，小丽不停地练习。很快地，她就不再害怕了。\n" +
      "下课后，小丽心想：今天真开心，我还想上游泳课！",
    questions: [
      {
        id: "p3_zh_wa3_pc2_016",
        type: "OpenEnded",
        q: "一开始，小丽为什么会害怕？（2分）",
        answer: "一开始小丽会害怕，因为她从小就怕水，也没有学过游泳。",
        pinyin: "yī kāi shǐ xiǎo lì huì hài pà, yīn wèi tā cóng xiǎo jiù pà shuǐ, yě méi yǒu xué guò yóu yǒng",
        meaning: "At first Xiao Li was afraid because she had feared water since young and had never learnt to swim.",
        solution: {
          method: "Answering 'reason' questions — use the '因为' structure.",
          steps: [
            "Because the question uses '为什么', your answer should begin with '因为…'.",
            "Use the evidence from paragraph 1: '她从小就怕水，也没有学过游泳'.",
            "→ 因为她从小就怕水，也没有学过游泳。",
          ],
          tip: "For '为什么' questions, it is always safe to end your answer with a '因为…' clause.",
        },
      },
      {
        id: "p3_zh_wa3_pc2_017",
        type: "OpenEnded",
        q: "小丽怎么让自己习惯在水里的感觉？（2分）",
        answer: "她不停地练习把头放进水里的动作，让自己习惯在水里的感觉。",
        pinyin: "tā bù tíng de liàn xí bǎ tóu fàng jìn shuǐ lǐ de dòng zuò, ràng zì jǐ xí guàn zài shuǐ lǐ de gǎn jué",
        meaning: "She kept practising the action of putting her head into the water so as to get used to the feeling.",
        solution: {
          method: "Answering 'method' questions — answer using '怎么 (how)'.",
          steps: [
            "The teacher's words '只要多练习这个动作，你就会习惯' is your clue.",
            "Use the phrase '小丽不停地练习' from Paragraph 2.",
            "→ 她不停地练习把头放进水里的动作。",
          ],
          tip: "For '怎么' questions, include a specific action or method in your answer.",
        },
      },
      {
        id: "p3_zh_wa3_pc2_018",
        type: "OpenEnded",
        q: "小丽喜欢上游泳课吗？从哪里可以看出？（2分）",
        answer:
          "小丽喜欢上了游泳课。从“下课后，小丽心想：今天真开心，我还想上游泳课！”可以看出来。",
        pinyin: "xiǎo lì xǐ huān shàng le yóu yǒng kè. cóng …… kě yǐ kàn chū lái",
        meaning: "Yes, Xiao Li liked the swimming lesson. It can be seen from her thought after class: 'Today was so fun, I want to attend swimming lessons again!'",
        solution: {
          method: "Judgement + Evidence question — make sure you answer both parts.",
          steps: [
            "First, clearly answer '喜欢吗?' : 小丽喜欢上了游泳课。",
            "For '从哪里可以看出', quote the last sentence of the passage (which describes her feelings) as your evidence.",
            "→ 从“今天真开心，我还想上游泳课！”可以看出。",
          ],
          tip: "For '从哪里看出' questions, you must always quote a sentence directly from the passage as your evidence.",
        },
      },
    ],
  },
];

export default wa3_peichun_term2_2025;
