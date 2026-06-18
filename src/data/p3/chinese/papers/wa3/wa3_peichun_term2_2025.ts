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
      method: "형성자(形声字) 변별 — 같은 성부 '青'에서 파생된 글자 구분",
      steps: [
        "보기 4글자는 모두 '青(qīng)'을 성부로 공유한다: 晴(맑을 청), 请(청할 청), 情(뜻 정), 青(푸를 청).",
        "문장의 '事___'는 '일, 사건'을 뜻하는 단어가 필요하다.",
        "'事情(shìqíng)'이 자연스러운 단어이므로 의미부 '忄(마음 심)'이 붙은 '情'을 고른다.",
      ],
      tip: "晴=날씨(日), 请=말(讠), 情=마음(忄). 의미부(部首)를 보고 뜻을 가른다.",
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
      method: "관용 표현(固定词组) 채우기",
      steps: [
        "'来不___ 吃早餐' → 시간이 부족해 아침을 못 먹는 상황.",
        "'来不及'가 '~할 겨를이 없다'라는 정해진 표현이다.",
        "'及(jí)'를 고른다.",
      ],
      tip: "급할 急(jí)과 헷갈리기 쉬움. '来得及 / 来不及'는 항상 '及'를 쓴다.",
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
      method: "의미부(部首)로 동작 동사 고르기",
      steps: [
        "차가 빠르게 달려 나무에 '부딪쳤다'는 동작이 필요하다.",
        "'撞'은 손동작 부수 '扌(手)'를 가진 '부딪치다'라는 뜻.",
        "懂(이해하다·忄), 理(다스리다·王), 童(아이)는 의미가 맞지 않는다.",
      ],
      tip: "扌(손)이 붙으면 손·몸의 동작인 경우가 많다 → 撞, 推, 拉.",
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
      method: "문맥 동작 동사 고르기",
      steps: [
        "집에 와서 샤워(冲凉) 전에 신발에 하는 동작 → '벗다'.",
        "'脱掉鞋子 / 把鞋子脱掉' = 신발을 벗다.",
        "推(밀다), 改(고치다), 退(물러나다)는 신발과 어울리지 않는다.",
      ],
      tip: "옷·신발을 벗을 땐 '脱', 입을 땐 '穿'.",
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
      method: "부사 의미 매칭 — '没想到(예상치 못하게)' 단서 활용",
      steps: [
        "앞에 '没想到(생각지도 못하게)'가 있어 '갑작스러움'을 나타내야 한다.",
        "'突然(갑자기)'이 '没想到'와 의미가 호응한다.",
        "刚刚(방금), 一直(줄곧), 经常(자주)은 '예상 밖' 느낌을 주지 못한다.",
      ],
      tip: "'没想到'와 '突然'은 자주 짝지어 나온다.",
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
      method: "동사+목적어 호응 확인",
      steps: [
        "'___ 了生日礼物，送给外婆' → 선물을 '마련/준비'해서 드린 것.",
        "'准备礼物'가 자연스러운 동목 호응이다.",
        "希望(바라다)·争取(쟁취하다)·庆祝(축하하다)는 '礼物'를 목적어로 잘 받지 않는다.",
      ],
      tip: "礼物와 자주 쓰는 동사: 准备/送/收/买.",
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
      method: "단서 '很重 / 几个人一起'로 동사 추론",
      steps: [
        "책상이 무거워 여러 명이 함께 해야 하는 동작 → 무거운 물건을 '옮기다'.",
        "'搬动'은 무거운 물건을 힘써 옮긴다는 뜻이라 적합.",
        "碰到(부딪치다), 溜走(몰래 가다), 拿走(들고 가다)는 무거운 책상에 부적절.",
      ],
      tip: "무거운 물건엔 '搬'을, 가벼운 물건엔 '拿'를 쓴다.",
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
          method: "직접 정보 찾기(细节题)",
          steps: [
            "첫 문장 '生日那天，叔叔送了我一台游戏机'에서 직접 확인.",
            "선물을 준 사람은 '叔叔(삼촌)'.",
          ],
          tip: "지문에 그대로 답이 나오는 세부정보 문제는 첫 문단을 먼저 본다.",
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
          method: "원인 찾기(因果题)",
          steps: [
            "엄마의 말: '功课做得很不认真，上课也常常睡觉'이 화난 이유.",
            "이것을 요약한 보기 (4) '学习不认真'이 정답.",
            "(2) 게임을 한 것은 직접 원인이 아니라 학습 태도가 핵심.",
          ],
          tip: "엄마/선생님 대사에 이유가 직접 들어있는 경우가 많다.",
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
          method: "행동의 의미 해석(推断题)",
          steps: [
            "'低下了头' 직후 '对不起…我知道错了'라고 말함.",
            "고개를 숙인 것은 잘못을 인정·반성하는 행동.",
            "보기 (1) '知道自己错了'가 정답.",
          ],
          tip: "'低下头'는 보통 부끄러움·반성의 신호.",
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
      method: "선택 관계 접속사 '或者'로 두 문장 합치기",
      steps: [
        "두 문장의 공통 부분 '我们可以'를 한 번만 쓴다.",
        "동사구 '游泳'과 '打球'를 '或者'로 연결한다.",
        "→ 我们可以游泳或者打球。",
      ],
      tip: "주어·앞부분이 같으면 반복하지 말고 뒷부분만 '或者'로 잇는다.",
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
      method: "공통 부분 생략 후 '或者' 연결",
      steps: [
        "공통 부분 '妹妹可以到图书馆'을 한 번만 쓴다.",
        "차이 나는 '借书'와 '看报纸'를 '或者'로 잇는다.",
        "→ 妹妹可以到图书馆借书或者看报纸。",
      ],
      tip: "장소(到图书馆)까지 같으면 그것도 반복하지 않는다.",
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
      method: "공통 부분 생략 후 '或者' 연결",
      steps: [
        "공통 부분 '小乐可以去'를 한 번만 쓴다.",
        "장소 '海边'과 '公园'을 '或者'로 잇는다.",
        "→ 小乐可以去海边或者公园。",
      ],
      tip: "'去'도 한 번만 쓰고 장소만 '或者'로 연결한다.",
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
      method: "상황어(状语) '~地' 위치 잡기 — 동사 앞",
      steps: [
        "'伤心地'는 '~하게'라는 상황어로, 꾸미는 동사 '哭' 바로 앞에 둔다.",
        "주어 '弟弟' 뒤, 동사 '哭了起来' 앞에 삽입.",
        "→ 弟弟伤心地哭了起来。",
      ],
      tip: "'…地' 뒤에는 반드시 동사가 온다(부사어 표지).",
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
      method: "상황어(状语) '~地' 위치 잡기 — 동사 앞",
      steps: [
        "'大口大口地'는 마시는 모습을 꾸미는 상황어.",
        "동사 '喝' 바로 앞, 주어 '我' 뒤에 둔다.",
        "→ 我大口大口地喝杯子里的牛奶。",
      ],
      tip: "동작의 '모양/방식'을 나타내는 말은 동사 앞.",
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
          method: "원인 서술형 — '因为' 구문으로 답하기",
          steps: [
            "질문이 '为什么'이므로 '因为…'로 시작하는 답을 만든다.",
            "1문단 '她从小就怕水，也没有学过游泳'을 근거로 인용.",
            "→ 因为她从小就怕水，也没有学过游泳。",
          ],
          tip: "'为什么' 질문은 답을 '因为…'로 마무리하면 안전하다.",
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
          method: "방법 서술형 — '怎么(어떻게)' 답하기",
          steps: [
            "선생님 말 '只要多练习这个动作，你就会习惯'이 단서.",
            "2문단 '小丽不停地练习'을 활용.",
            "→ 她不停地练习把头放进水里的动作。",
          ],
          tip: "'怎么' 질문은 구체적 '행동/방법'을 답에 넣는다.",
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
          method: "판단+근거 인용형 — 두 소문항 모두 답하기",
          steps: [
            "먼저 '喜欢吗?'에 명확히 답: 小丽喜欢上了游泳课。",
            "'从哪里可以看出'에는 지문의 마지막 문장(심리 묘사)을 근거로 인용.",
            "→ 从“今天真开心，我还想上游泳课！”可以看出。",
          ],
          tip: "'从哪里看出'은 반드시 지문 속 문장을 직접 근거로 든다.",
        },
      },
    ],
  },
];

export default wa3_peichun_term2_2025;
