// ============================================================================
// Red Swastika School (卍慈学校)
// P3 Higher Chinese (高级华文) — 复习（三）第七课至第十一课
// Source: sgexam.com P3 Chinese WA3 compilation (answer key labelled RED SWASTIKA)
// Total marks: 30
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_redswastika_rev3_2025: Question[] = [
  // ==========================================================================
  // (一) 辨字测验 BianZi — Q1-Q5 (5题5分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
    q: "妹妹在画好的贺年卡上___上颜色。",
    options: ["图", "涂", "吐", "突"],
    answer: 1, // 涂
    pinyin: "tú",
    meaning: "'涂(tú)' = to apply/spread (colour, paint). 涂上颜色 = to colour in.",
    solution: {
      method: "유사형 글자(形近字) 변별 + 동작 의미",
      steps: [
        "카드에 색을 '칠하는' 동작 → 涂.",
        "图(그림·명사), 吐(뱉다·口), 突(갑자기)는 의미 부적합.",
        "'涂(氵)'는 액체(물감)를 바르는 뜻.",
      ],
      tip: "색칠·물감 바르기엔 ‘涂’ (涂颜色/涂药).",
    },
  },
  {
    id: "p3_zh_wa3_rsw_002",
    topic: "BianZi",
    difficulty: "core",
    instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
    q: "他___试得了第一名，开心极了。",
    options: ["者", "孝", "老", "考"],
    answer: 3, // 考
    pinyin: "kǎo shì",
    meaning: "'考试(kǎoshì)' = examination / to take a test.",
    solution: {
      method: "단어 '考试' 인식 + 형근자 변별",
      steps: [
        "'___试得了第一名' → 시험에서 1등.",
        "'考试'이 필요하므로 '考'.",
        "者·孝·老는 모양이 비슷하나 '试'와 어울리지 않음.",
      ],
      tip: "考(시험 볼 고)와 老(늙을 로)는 윗부분이 비슷하니 주의.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
    q: "妈妈要我把家里的报纸放进回收___。",
    options: ["相", "箱", "想", "香"],
    answer: 1, // 箱
    pinyin: "huí shōu xiāng",
    meaning: "'回收箱(huíshōu xiāng)' = recycling bin/box.",
    solution: {
      method: "동음자 변별 + 의미부 '竹(상자)'",
      steps: [
        "신문지를 넣는 '상자' → 箱.",
        "'回收箱(재활용 상자)'.",
        "相/想/香은 동음이지만 '상자' 뜻이 없다.",
      ],
      tip: "‘箱’은 대나무·나무로 만든 상자류(箱子, 信箱).",
    },
  },
  {
    id: "p3_zh_wa3_rsw_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
    q: "妹妹一回到家后，就把鞋子___丢。",
    options: ["活", "话", "乱", "甜"],
    answer: 2, // 乱
    pinyin: "luàn",
    meaning: "'乱(luàn)' = in a disorderly manner / carelessly. 乱丢 = to throw about carelessly.",
    solution: {
      method: "부사적 의미 매칭",
      steps: [
        "신발을 '아무렇게나' 던지는 모습 → 乱丢.",
        "活(살다)·话(말)·甜(달다)은 의미가 맞지 않음.",
        "→ 乱.",
      ],
      tip: "‘乱+동사’ = 함부로/아무렇게나 ~하다 (乱丢, 乱跑, 乱说).",
    },
  },
  {
    id: "p3_zh_wa3_rsw_005",
    topic: "BianZi",
    difficulty: "core",
    instruction: "选出适当的字，然后把代表它的数目字填写在括号里。",
    q: "奶奶到超市买东西时，都会使用___保袋。",
    options: ["环", "还", "坏", "杯"],
    answer: 0, // 环
    pinyin: "huán bǎo dài",
    meaning: "'环保袋(huánbǎo dài)' = eco-friendly / reusable bag.",
    solution: {
      method: "단어 '环保袋' 인식",
      steps: [
        "마트에서 쓰는 재사용 가방 → 环保袋.",
        "'环(환경 환)'을 고른다.",
        "还(또)·坏(나쁘다)·杯(컵)은 부적합.",
      ],
      tip: "环(고리/환경)과 坏(나쁠 괴)는 자형이 유사 — 部首 ‘王’ vs ‘土’.",
    },
  },

  // ==========================================================================
  // (二) 词语选择 CiYu — Q6-Q10 (5题5分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_006",
    topic: "CiYu",
    difficulty: "core",
    instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
    q: "我们___三个人把这张又大又重的桌子抬出去。",
    options: ["如果", "可以", "就能", "需要"],
    answer: 3, // 需要
    pinyin: "xū yào",
    meaning: "'需要(xūyào)' = to need / require. 需要三个人 = need three people.",
    solution: {
      method: "문맥 의미 매칭",
      steps: [
        "크고 무거운 책상을 옮기려면 세 명이 '필요하다'.",
        "'需要三个人'이 자연스럽다.",
        "如果(만약)·可以(할 수 있다)·就能(곧 ~할 수 있다)은 문맥에 어색.",
      ],
      tip: "‘인원/조건이 있어야 가능’할 때 ‘需要’.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_007",
    topic: "CiYu",
    difficulty: "stretch",
    instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
    q: "姐姐___学校假期到老人院当义工。",
    options: ["使用", "利用", "选用", "借用"],
    answer: 1, // 利用
    pinyin: "lì yòng",
    meaning: "'利用(lìyòng)' = to make use of (time/opportunity). 利用假期 = make use of the holidays.",
    solution: {
      method: "근접어(近义词) 변별 — '시간/기회 활용'",
      steps: [
        "'___ 学校假期'에서 '시간을 활용하다'.",
        "'利用(시간·기회를 활용)'이 적합.",
        "使用(도구 사용), 选用(골라 쓰다), 借用(빌려 쓰다)은 '시간'과 부적합.",
      ],
      tip: "시간·기회는 ‘利用’, 물건·도구는 ‘使用’.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_008",
    topic: "CiYu",
    difficulty: "core",
    instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
    q: "爸爸___下个星期六带我们去动物园玩。",
    options: ["认为", "请求", "决定", "回答"],
    answer: 2, // 决定
    pinyin: "jué dìng",
    meaning: "'决定(juédìng)' = to decide. 决定带我们去 = decided to take us.",
    solution: {
      method: "문맥 동사 매칭",
      steps: [
        "다음 토요일에 데려가기로 '정하다' → 决定.",
        "认为(여기다)·请求(요청)·回答(대답)은 문맥에 맞지 않음.",
      ],
      tip: "미래 계획을 ‘정하다’ → ‘决定 + 동사구’.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_009",
    topic: "CiYu",
    difficulty: "stretch",
    instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
    q: "我每天用一___的时间来练习画画。",
    options: ["部分", "半边", "相同", "不同"],
    answer: 0, // 部分
    pinyin: "yí bù fen",
    meaning: "'一部分(yíbùfen)' = a part / a portion. 一部分时间 = part of the time.",
    solution: {
      method: "양사·명사 호응 '一___的时间'",
      steps: [
        "'一___的时间' → 시간의 '일부분'.",
        "'一部分的时间'이 자연스럽다.",
        "半边(한쪽)·相同(같은)·不同(다른)은 '时间'과 호응 어색.",
      ],
      tip: "전체 중 일부 → ‘一部分’ (一部分人/时间/钱).",
    },
  },
  {
    id: "p3_zh_wa3_rsw_010",
    topic: "CiYu",
    difficulty: "core",
    instruction: "选出适当的词语，然后把代表它的数目字填写在括号里。",
    q: "牛群___往前走，终于走到了河边。",
    options: ["停下了", "停不了", "不想停", "不停地"],
    answer: 3, // 不停地
    pinyin: "bù tíng de",
    meaning: "'不停地(bùtíng de)' = continuously / without stopping. 不停地往前走 = kept walking forward.",
    solution: {
      method: "단서 '终于走到了'로 추론 — 부사어 자리",
      steps: [
        "마침내 강가에 도착하려면 '쉬지 않고 계속' 걸어야 한다.",
        "'不停地 + 往前走'가 호응(부사어 ‘…地’).",
        "停下了/停不了/不想停은 '终于走到'와 모순.",
      ],
      tip: "‘…地 + 동사’ 구조와 ‘终于(마침내)’의 인과를 함께 본다.",
    },
  },

  // ==========================================================================
  // (三) 组句成段 ZuJu — Q11-Q15 (5题5分)
  // 첫 문장(1번)은 제시됨: "下课后，明华买了一碗鱼圆面。他吃完后，就去洗手。"
  // 각 문항은 해당 문장이 들어갈 순서 번호를 묻는다.
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_011",
    topic: "ZuJu",
    difficulty: "stretch",
    instruction:
      "请按先后顺序把下面的句子排一排。【已给(1)：下课后，明华买了一碗鱼圆面。他吃完后，就去洗手。】 请填入本句应排的顺序号。",
    q: "（ ）他没关水龙头，就和小光跑向球场去了。",
    answer: 3,
    pinyin: "tā méi guān shuǐ lóng tóu, jiù hé xiǎo guāng pǎo xiàng qiú chǎng qù le",
    meaning: "He didn't turn off the tap and ran off to the field with Xiao Guang. (Order position: 3)",
    solution: {
      method: "사건 순서 배열 — 시간·인과로 위치 추론",
      steps: [
        "전체 흐름: ①밥 먹고 손 씻음 → ②손 씻자마자 小光이 부름 → ③수도꼭지 안 잠그고 뛰어감 → ④물이 계속 흐름 → ⑤선생님이 불러 꾸짖음 → ⑥명화가 사과함.",
        "이 문장(수도 안 잠그고 뛰어감)은 ‘부름(2)’ 뒤, ‘물이 흐름(4)’ 앞.",
        "→ 순서 3.",
      ],
      tip: "‘没关水龙头, 就…跑’은 잘못이 시작되는 지점 → 중간 부분.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_012",
    topic: "ZuJu",
    difficulty: "stretch",
    instruction:
      "请按先后顺序把下面的句子排一排。【已给(1)：下课后，明华买了一碗鱼圆面。他吃完后，就去洗手。】 请填入本句应排的顺序号。",
    q: "（ ）明华听了，向老师说对不起，也答应不再这样做了。",
    answer: 6,
    pinyin: "míng huá tīng le, xiàng lǎo shī shuō duì bù qǐ, yě dā ying bù zài zhè yàng zuò le",
    meaning: "Ming Hua apologised to the teacher and promised not to do it again. (Order position: 6, the ending)",
    solution: {
      method: "결말 신호 포착",
      steps: [
        "'听了…说对不起…答应不再…'는 꾸중 뒤의 반응 → 이야기의 마무리.",
        "선생님이 꾸짖는 문장(5) 다음에 온다.",
        "→ 순서 6(마지막).",
      ],
      tip: "사과·반성·약속 문장은 보통 ‘맨 끝’.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_013",
    topic: "ZuJu",
    difficulty: "stretch",
    instruction:
      "请按先后顺序把下面的句子排一排。【已给(1)：下课后，明华买了一碗鱼圆面。他吃完后，就去洗手。】 请填入本句应排的顺序号。",
    q: "（ ）老师看见后，把明华叫回来，告诉他不应该浪费水。",
    answer: 5,
    pinyin: "lǎo shī kàn jiàn hòu, bǎ míng huá jiào huí lái, gào su tā bù yīng gāi làng fèi shuǐ",
    meaning: "The teacher saw it, called Ming Hua back, and told him not to waste water. (Order position: 5)",
    solution: {
      method: "인과 연결 — '看见 → 叫回来'",
      steps: [
        "물이 계속 흐르는 것(4)을 선생님이 '看见' 후 부르는 장면.",
        "물 흐름(4) 다음, 사과(6) 앞.",
        "→ 순서 5.",
      ],
      tip: "교사의 개입(看见后…告诉)은 잘못 직후, 사과 직전.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_014",
    topic: "ZuJu",
    difficulty: "stretch",
    instruction:
      "请按先后顺序把下面的句子排一排。【已给(1)：下课后，明华买了一碗鱼圆面。他吃完后，就去洗手。】 请填入本句应排的顺序号。",
    q: "（ ）明华刚洗完手，小光就叫他到球场去玩球。",
    answer: 2,
    pinyin: "míng huá gāng xǐ wán shǒu, xiǎo guāng jiù jiào tā dào qiú chǎng qù wán qiú",
    meaning: "Just after Ming Hua washed his hands, Xiao Guang called him to play ball at the field. (Order position: 2)",
    solution: {
      method: "연결어 '刚…就…'으로 직후 위치 파악",
      steps: [
        "'刚洗完手(1번 문장의 손 씻기 직후)'라는 단서.",
        "주어진 1번(손 씻기) 바로 다음에 온다.",
        "→ 순서 2.",
      ],
      tip: "‘刚…就…(막 ~하자마자)’는 앞 사건 바로 뒤를 가리킨다.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_015",
    topic: "ZuJu",
    difficulty: "stretch",
    instruction:
      "请按先后顺序把下面的句子排一排。【已给(1)：下课后，明华买了一碗鱼圆面。他吃完后，就去洗手。】 请填入本句应排的顺序号。",
    q: "（ ）水龙头没关上，水一直流个不停。",
    answer: 4,
    pinyin: "shuǐ lóng tóu méi guān shàng, shuǐ yì zhí liú gè bù tíng",
    meaning: "The tap was not turned off, and the water kept running. (Order position: 4)",
    solution: {
      method: "인과 결과 위치 파악",
      steps: [
        "'没关水龙头, 就…跑(3)'의 결과 → '물이 계속 흐름'.",
        "뛰어간 뒤(3) 다음, 선생님이 보는 장면(5) 앞.",
        "→ 순서 4.",
      ],
      tip: "원인(没关→跑) 뒤에 결과(水一直流)가 따라온다.",
    },
  },

  // ==========================================================================
  // (四) 词语搭配 PeiDui — Q16-Q19 (4题4分)
  // 词语库: 1爱护 2收拾 3贺卡 4赶紧 5地板 6请求
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_016",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "选择正确的词语，然后把代表它的数目字填写在括号里。【词语库：1爱护 2收拾 3贺卡 4赶紧 5地板 6请求】",
    q: "生日（___）",
    answer: 3, // 贺卡 → 生日贺卡
    pinyin: "shēng rì hè kǎ",
    meaning: "'生日贺卡' = birthday card.",
    solution: {
      method: "명사+명사 합성 짝짓기",
      steps: [
        "'生日(생일)' 뒤에 올 명사 → 카드.",
        "'贺卡(축하 카드)'가 호응 → 生日贺卡.",
      ],
      tip: "贺卡=축하 카드(贺年卡=연하장).",
    },
  },
  {
    id: "p3_zh_wa3_rsw_017",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "选择正确的词语，然后把代表它的数目字填写在括号里。【词语库：1爱护 2收拾 3贺卡 4赶紧 5地板 6请求】",
    q: "清洗（___）",
    answer: 5, // 地板 → 清洗地板
    pinyin: "qīng xǐ dì bǎn",
    meaning: "'清洗地板' = to clean/mop the floor.",
    solution: {
      method: "동사+명사 호응",
      steps: [
        "'清洗(씻다·닦다)'의 목적어 → 바닥.",
        "'地板(마룻바닥)'이 호응 → 清洗地板.",
      ],
      tip: "바닥을 닦다 → 清洗地板 / 擦地板.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_018",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "选择正确的词语，然后把代表它的数目字填写在括号里。【词语库：1爱护 2收拾 3贺卡 4赶紧 5地板 6请求】",
    q: "（___）花草",
    answer: 0, // 爱护 → 爱护花草
    pinyin: "ài hù huā cǎo",
    meaning: "'爱护花草' = to cherish/protect flowers and plants.",
    solution: {
      method: "동사+명사 호응",
      steps: [
        "'花草(화초)' 앞에 올 동작 → '아끼고 보호하다'.",
        "'爱护'가 호응 → 爱护花草.",
      ],
      tip: "공공물·동식물을 ‘아끼다’ → 爱护 (爱护公物/花草).",
    },
  },
  {
    id: "p3_zh_wa3_rsw_019",
    topic: "PeiDui",
    difficulty: "stretch",
    instruction:
      "选择正确的词语，然后把代表它的数目字填写在括号里。【词语库：1爱护 2收拾 3贺卡 4赶紧 5地板 6请求】",
    q: "（___）溜走",
    answer: 3, // 赶紧 → 赶紧溜走
    pinyin: "gǎn jǐn liū zǒu",
    meaning: "'赶紧溜走' = to hurriedly slip away.",
    solution: {
      method: "부사+동사 호응",
      steps: [
        "'溜走(몰래 빠져나가다)' 앞에 올 부사 → '서둘러'.",
        "'赶紧(얼른·서둘러)'이 호응 → 赶紧溜走.",
      ],
      tip: "‘赶紧+동사’ = 서둘러 ~하다 (赶紧走/赶紧做).",
    },
  },

  // ==========================================================================
  // (五) 仿写/改写句子 JuZi — Q20-Q22 (3题6分)
  // 例: 爷爷可以下棋。爷爷可以看书。(……或者……) → 爷爷可以下棋或者看书。
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_020",
    topic: "JuZi",
    difficulty: "stretch",
    instruction: "请根据所提供的例子和帮助词语，仿写一个句子。（如果……就……）",
    q: "我们把穿不下的衣服做成小袋子。我们能为环保尽一份力。",
    answer: "如果我们把穿不下的衣服做成小袋子，就能为环保尽一份力。",
    pinyin:
      "rú guǒ wǒ men bǎ chuān bú xià de yī fú zuò chéng xiǎo dài zi, jiù néng wèi huán bǎo jìn yí fèn lì",
    meaning: "If we turn clothes we've outgrown into small bags, we can do our part for the environment.",
    solution: {
      method: "가정 관계 '如果……就……'로 두 문장 합치기",
      steps: [
        "조건(앞 문장)을 '如果' 절에, 결과(뒤 문장)를 '就' 절에 둔다.",
        "두 번째 주어 '我们'은 생략 가능.",
        "→ 如果我们…做成小袋子，就能为环保尽一份力。",
      ],
      tip: "‘如果 A, 就 B’ = A하면 (그러면) B한다.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_021",
    topic: "JuZi",
    difficulty: "core",
    instruction: "请根据所提供的帮助词语扩写句子。（小心地）",
    q: "小安把心爱的故事书收进书包里。",
    answer: "小安小心地把心爱的故事书收进书包里。",
    pinyin: "xiǎo ān xiǎo xīn de bǎ xīn ài de gù shi shū shōu jìn shū bāo lǐ",
    meaning: "Xiao An carefully put his beloved storybook into his bag.",
    solution: {
      method: "상황어(状语) '小心地' 위치 — 把자문 동사 앞",
      steps: [
        "'小心地'는 동작의 방식을 꾸미는 상황어.",
        "把자문에서는 ‘주어 + 상황어 + 把…’ 순서.",
        "→ 小安小心地把…收进书包里。",
      ],
      tip: "把자문에 ‘…地’ 부사어를 넣을 땐 ‘把’ 앞에 둔다.",
    },
  },
  {
    id: "p3_zh_wa3_rsw_022",
    topic: "JuZi",
    difficulty: "stretch",
    instruction: "请用括号里的词语改写句子。（叫）",
    q: "小象说：“小熊，快想一个办法救小鸭子！”",
    answer: "小象叫小熊想一个办法救小鸭子。",
    pinyin: "xiǎo xiàng jiào xiǎo xióng xiǎng yí gè bàn fǎ jiù xiǎo yā zi",
    meaning: "The little elephant told the little bear to think of a way to save the duckling. (Direct → 兼语句 with 叫)",
    solution: {
      method: "직접화법 → 겸어문 '叫' 전환",
      steps: [
        "명령형 인용을 '叫 + 대상 + 동작'으로 변환.",
        "'说：“小熊，快…！”' → '叫小熊 想一个办法救小鸭子'.",
        "호칭 '小熊，'와 '快', 느낌표·따옴표는 정리.",
      ],
      tip: "‘叫 + 사람 + 시키는 행동’ — 명령 인용은 평서문으로 바꾼다.",
    },
  },

  // ==========================================================================
  // (六-1) 综合理解 YueReadMCQ — Q23 (MCQ) — SET (passage 공유)
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_set1",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Red Swastika 复习(三) — 综合理解（小猴）选择题",
    instruction: "根据短文内容，回答问题。",
    passage:
      "小猴是森林里最聪明的动物。森林里的小动物们遇到什么问题都会来找小猴帮忙。小猴教小鸟怎样唱歌，教小狗怎样写字，教小猫怎样画画。\n" +
      "小鸟想成为歌手，它每天一早起床就练歌。小狗想成为老师，它每天认真地学写字。小猫想成为画家，也每天到河边去练习画画。小猴想成为医生，可是它每天不是在家里喝茶、听音乐，就是躺在床上睡觉。\n" +
      "日子一天天过去了，小动物们都有了很大的进步。\n" +
      "这天，小猴拿起报纸来看时，才发现小动物们都实现自己的愿望。小猴伤心地说：“大家都努力学习，实现了自己的愿望，可是我呢？”",
    questions: [
      {
        id: "p3_zh_wa3_rsw_023",
        type: "MCQ",
        q: "为什么小动物们遇到问题都会找小猴帮忙？",
        options: [
          "因为它最喜欢帮助人。",
          "因为它是最聪明的小动物。",
          "因为它可以帮它们实现愿望。",
          "因为它会唱歌、写字和画画。",
        ],
        answer: 1, // 因为它是最聪明的小动物
        pinyin: "yīn wèi tā shì zuì cōng míng de xiǎo dòng wù",
        meaning: "Why do the animals seek the monkey's help? Because it is the cleverest animal in the forest.",
        solution: {
          method: "원인 찾기 — 첫 문장 인용",
          steps: [
            "1문장: '小猴是森林里最聪明的动物'.",
            "그래서 모두 도움을 청함.",
            "→ (2) 因为它是最聪明的小动物.",
          ],
          tip: "(4)는 ‘구체적 능력’일 뿐, 근본 이유는 ‘가장 똑똑함’.",
        },
      },
    ],
  },

  // ==========================================================================
  // (六-2) 综合理解 YueReadOpen — Q24-Q25 (주관식) — SET (같은 지문 공유)
  // ==========================================================================
  {
    id: "p3_zh_wa3_rsw_set2",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Red Swastika 复习(三) — 综合理解（小猴）问答题",
    instruction: "根据短文内容，回答问题。",
    passage:
      "小猴是森林里最聪明的动物。森林里的小动物们遇到什么问题都会来找小猴帮忙。小猴教小鸟怎样唱歌，教小狗怎样写字，教小猫怎样画画。\n" +
      "小鸟想成为歌手，它每天一早起床就练歌。小狗想成为老师，它每天认真地学写字。小猫想成为画家，也每天到河边去练习画画。小猴想成为医生，可是它每天不是在家里喝茶、听音乐，就是躺在床上睡觉。\n" +
      "日子一天天过去了，小动物们都有了很大的进步。\n" +
      "这天，小猴拿起报纸来看时，才发现小动物们都实现自己的愿望。小猴伤心地说：“大家都努力学习，实现了自己的愿望，可是我呢？”",
    questions: [
      {
        id: "p3_zh_wa3_rsw_024",
        type: "OpenEnded",
        q: "当小动物们在练习时，小猴在做什么？（2分）",
        answer:
          "当小动物们在练习时，小猴每天不是在家里喝茶、听音乐，就是躺在床上睡觉。",
        pinyin:
          "dāng xiǎo dòng wù men zài liàn xí shí, xiǎo hóu měi tiān bú shì zài jiā lǐ hē chá, tīng yīn yuè, jiù shì tǎng zài chuáng shàng shuì jiào",
        meaning: "While the other animals were practising, the monkey was either drinking tea and listening to music at home, or lying in bed sleeping.",
        solution: {
          method: "대비 행동 서술 — '不是…就是…' 구문 인용",
          steps: [
            "2문단 끝: '小猴…每天不是在家里喝茶、听音乐，就是躺在床上睡觉'.",
            "다른 동물의 노력과 대비되는 소원숭이의 게으른 행동을 그대로 옮긴다.",
          ],
          tip: "‘不是 A 就是 B’ 표현을 답에 그대로 살리면 만점에 가깝다.",
        },
      },
      {
        id: "p3_zh_wa3_rsw_025",
        type: "OpenEnded",
        q: "小猴实现自己的愿望了吗？它应该怎么做？（2分）",
        answer:
          "小猴没有实现自己的愿望。它应该努力学习，才能实现自己的愿望。",
        pinyin:
          "xiǎo hóu méi yǒu shí xiàn zì jǐ de yuàn wàng. tā yīng gāi nǔ lì xué xí, cái néng shí xiàn zì jǐ de yuàn wàng",
        meaning: "No, the monkey did not realise its wish. It should study/work hard so that it can achieve its dream.",
        solution: {
          method: "판단 + 조언형 — 두 소문항 모두 답하기",
          steps: [
            "앞: 사실 판단 → 小猴没有实现自己的愿望(다른 동물과 달리 노력 안 함).",
            "뒤: 조언 → 应该努力学习，才能实现愿望.",
            "‘…吗 + 应该怎么做’ 두 부분을 분리해 답한다.",
          ],
          tip: "마지막 ‘可是我呢?’ 한탄이 ‘소원 미실현’의 단서. 조언은 본문 주제(努力)와 연결.",
        },
      },
    ],
  },
];

export default wa3_redswastika_rev3_2025;
