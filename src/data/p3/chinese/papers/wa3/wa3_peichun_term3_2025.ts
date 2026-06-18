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
      method: "사건의 시간·인과 순서로 문장 배열하기",
      steps: [
        "① 시작 배경: '一个周末的下午，哥哥看到家里又脏又乱。' (원문 3번째 줄)",
        "② 발단: '哥哥就对妹妹说：…收拾房间吧！' (원문 5번째 줄)",
        "③ 전개: '妹妹听了哥哥的话，马上就拿起扫把来扫地。' (원문 1번째 줄)",
        "④ 전개: '哥哥也去拿了一块抹布把家里的桌子都抹干净了。' (원문 2번째 줄)",
        "⑤ 결말: '爸爸妈妈回来后，看到家里这么干净，开心极了。' (원문 4번째 줄)",
        "따라서 원문 등장 순서(위→아래)에 매기는 번호는 3, 4, 1, 5, 2.",
      ],
      tip: "‘제안→실행→결과’ 흐름과 ‘听了…的话’ 같은 연결어로 앞뒤를 잇는다.",
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
      method: "동사+명사 호응 짝짓기",
      steps: [
        "'破坏(파괴하다)'는 목적어로 큰 대상이 필요하다.",
        "단어库에서 '环境(환경)'이 의미상 가장 잘 어울린다.",
        "→ 破坏环境 (8).",
      ],
      tip: "‘环保(7)’는 ‘保护环境’처럼 명사적이라 ‘破坏’의 목적어로는 ‘环境(8)’이 자연스럽다.",
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
      method: "동사+장소 호응 짝짓기",
      steps: [
        "'厕所(화장실)' 앞에 올 동작은 '씻다/청소하다'.",
        "단어库의 '清洗'가 '厕所'와 호응.",
        "→ 清洗厕所 (6).",
      ],
      tip: "‘清洗’는 물로 닦는 청소에 자주 쓰인다.",
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
      method: "고정 표현(固定词组) 인식",
      steps: [
        "'废物___'는 환경 단원의 정해진 표현 '废物利用(폐품 재활용)'.",
        "단어库에서 '利用'을 고른다.",
        "→ 废物利用 (3).",
      ],
      tip: "환경 단원 단골 표현: 废物利用 / 保护环境 / 浪费水电.",
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
      method: "동사+명사 호응 짝짓기",
      steps: [
        "'水电(물·전기)'과 어울리는 동작 → '낭비하다'.",
        "단어库의 '浪费'를 고른다.",
        "→ 浪费水电 (5).",
      ],
      tip: "자원·시간·돈은 ‘浪费’와 잘 붙는다.",
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
      method: "동사+명사 호응 짝짓기",
      steps: [
        "'蚊虫(모기·벌레)' 앞에 올 동작 → '꾀어들이다/끌어오다'.",
        "단어库의 '引来'를 고른다.",
        "→ 引来蚊虫 (1).",
      ],
      tip: "쓰레기·더러움이 벌레를 ‘引来(끌어들임)’ 하는 맥락에 자주 등장.",
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
    q: "[그림 Q7: 재활용/쓰레기 분리수거 통들의 사진]",
    answer: 5, // 垃圾桶
    pinyin: "lā jī tǒng",
    meaning: "'垃圾桶' = rubbish bin / dustbin.",
    solution: {
      method: "그림-단어 대응 (사물 인식)",
      steps: [
        "그림은 재활용 표시(△)가 있는 큰 통들 → 쓰레기통.",
        "단어库에서 '垃圾桶'을 고른다 (5).",
      ],
      tip: "재활용 삼각 표시(♺)는 보통 ‘垃圾桶/回收箱’의 단서.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_008",
    topic: "KanTu",
    difficulty: "foundation",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[그림 Q8: 'GREEN'이라고 적힌 천 가방(에코백) 사진]",
    answer: 1, // 环保袋
    pinyin: "huán bǎo dài",
    meaning: "'环保袋' = reusable/eco-friendly bag.",
    solution: {
      method: "그림-단어 대응 (사물 인식)",
      steps: [
        "그림은 'GREEN'이라 적힌 재사용 천 가방.",
        "단어库에서 '环保袋'을 고른다 (1).",
      ],
      tip: "비닐봉지 대신 쓰는 천/재사용 가방 = 环保袋.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_009",
    topic: "KanTu",
    difficulty: "core",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[그림 Q9: 싱가포르 머라이언 상(분수에서 물을 뿜는 사자상) 사진]",
    answer: 6, // 鱼尾狮
    pinyin: "yú wěi shī",
    meaning: "'鱼尾狮' = the Merlion (Singapore's lion-fish landmark statue).",
    solution: {
      method: "그림-단어 대응 (싱가포르 상징물 인식)",
      steps: [
        "그림은 물을 뿜는 사자 머리+물고기 몸통의 상 → 머라이언.",
        "단어库에서 '鱼尾狮'을 고른다 (6).",
      ],
      tip: "‘鱼尾狮(머라이언)’은 싱가포르의 대표 랜드마크로 자주 출제.",
    },
  },
  {
    id: "p3_zh_wa3_pc3_010",
    topic: "KanTu",
    difficulty: "foundation",
    instruction:
      "从表中选出最适当的词语，然后把代表它的数目字填写在括号里。【词语库：1环保袋 2东海岸 3脚踏车 4国庆日 5垃圾桶 6鱼尾狮】",
    q: "[그림 Q10: 자전거 사진]",
    answer: 3, // 脚踏车
    pinyin: "jiǎo tà chē",
    meaning: "'脚踏车' = bicycle (Singaporean term; 自行车 in PRC).",
    solution: {
      method: "그림-단어 대응 (사물 인식)",
      steps: [
        "그림은 바퀴 두 개 달린 자전거.",
        "단어库에서 '脚踏车'을 고른다 (3).",
      ],
      tip: "싱가포르에서는 자전거를 ‘脚踏车’라고 한다(=自行车).",
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
          method: "원인 서술형 — '因为…所以…' 구문",
          steps: [
            "1문단 '小动物们在河边玩时有点吵，河马很生气，就把动物们都赶走了'에서 근거.",
            "'为什么' 질문이므로 '因为…所以…'로 묶어 답한다.",
            "→ 因为…有点吵，河马很生气，所以要赶走小动物们。",
          ],
          tip: "지문 속 ‘吵 → 生气 → 赶走’의 인과 사슬을 그대로 답에 담는다.",
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
          method: "구체 행동 나열형 — '怎么(어떻게)' 답하기",
          steps: [
            "4문단에 두 가지 도움 행동이 모두 나온다.",
            "① 小鸟把虫子吃掉, ② 小羊和小狗拔青草给河马吃.",
            "두 행동을 모두 적어야 2점 만점.",
          ],
          tip: "‘怎么帮助’는 동물별 행동을 빠짐없이 적어야 감점이 없다.",
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
          method: "추론+근거형 — '会怎么做 + 为什么' 두 부분 답하기",
          steps: [
            "앞부분: 행동 추측 → 小羊会原谅河马 (용서할 것이다).",
            "뒷부분: 이유 → 因为河马知道自己错了 (잘못을 인정하고 사과했으므로).",
            "두 소문항을 분리해서 모두 답한다.",
          ],
          tip: "‘…吗/会怎么做 + 为什么’는 반드시 ‘판단’과 ‘이유’를 모두 쓴다.",
        },
      },
    ],
  },
];

export default wa3_peichun_term3_2025;
