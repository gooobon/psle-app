// ============================================================================
// CHIJ St Nicholas Girls' School (圣尼各拉女校 小学部)
// P3 Higher Chinese (高级华文) — 2025 复习（四）第十三课至第十七课
// Source: sgexam.com P3 Chinese WA3 compilation (answer key p81)
// Total marks: 56
//
// NOTE: 改正错字(Q1-10)는 정답키(p81)의 '바른 글자'를 answer로 넣고 문장을 복원함.
//   인쇄된 '틀린 글자' 형태가 OCR상 불명확한 항목은 needsParentVerify: true.
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_chijstnicholas_rev4_2025: Question[] = [
  // ==========================================================================
  // (一) 改正错字 BianZi — Q1-Q10 (10题20分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn4_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "我不【感】在半夜上厕所。",
    answer: "敢",
    pinyin: "gǎn",
    meaning: "Correct '感→敢'. '不敢(bùgǎn)' = dare not. 我不敢在半夜上厕所.",
    solution: {
      method: "동음 오자 교정",
      steps: ["'不感'은 잘못 → '감히 ~하지 못하다'는 '不敢'.", "'感(느끼다)'을 '敢(감히)'으로 고친다."],
      tip: "敢(감히 감) vs 感(느낄 감) — 동음(gǎn), 자형 일부 유사.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_002",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "我们不应该给猴子【为】食。",
    answer: "喂",
    pinyin: "wèi",
    meaning: "Correct '为→喂'. '喂食(wèishí)' = to feed. 给猴子喂食 = feed the monkeys.",
    solution: {
      method: "동음 오자 교정 (口 부수)",
      steps: ["동물에게 '먹이를 주다' → 喂.", "'为(wèi)'를 '喂(wèi)'로 고친다."],
      tip: "喂(먹일 위)는 ‘口’ 부수, 为(할 위)와 동음.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "他总是【七】负弟弟，真过分！",
    answer: "欺",
    pinyin: "qī fu",
    meaning: "Correct '七→欺'. '欺负(qīfu)' = to bully. 欺负弟弟 = bully the younger brother.",
    solution: {
      method: "동음 오자 교정",
      steps: ["'七负'는 잘못 → '괴롭히다'는 '欺负'.", "'七(qī)'를 '欺(qī)'로 고친다."],
      tip: "欺负(괴롭히다)의 ‘欺’ — 七과 발음 같음.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "爸爸在水池里【样】了几条鱼。",
    answer: "养",
    pinyin: "yǎng",
    meaning: "Correct '样→养'. '养鱼(yǎngyú)' = to raise/keep fish.",
    solution: {
      method: "형근·동음 오자 교정",
      steps: ["물고기를 '기르다' → 养.", "'样(모양)'을 '养(기르다)'으로 고친다."],
      tip: "养(기를 양)과 样(모양 양) 자형 유사.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_005",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "我在【士】卷上写上自己的名字。",
    answer: "试",
    pinyin: "shì juàn",
    meaning: "Correct '士→试'. '试卷(shìjuàn)' = exam paper.",
    solution: {
      method: "형근 오자 교정",
      steps: ["이름을 쓰는 것 → '试卷(시험지)'.", "'士'를 '试'로 고친다."],
      tip: "试卷(시험지)의 ‘试’ — 士가 들어간 형근자.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_006",
    topic: "BianZi",
    difficulty: "core",
    needsParentVerify: true,
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "听写时，我发现小文在【偷错字】看。（정답 문장: 听写时，我发现小文在偷看。）",
    answer: "偷",
    pinyin: "tōu",
    meaning: "Corrected to '偷(tōu)'. '偷看(tōukàn)' = to peek/sneak a look. 小文在偷看 = Xiao Wen was peeking.",
    solution: {
      method: "문맥 동작 교정",
      steps: ["받아쓰기 중 몰래 '훔쳐보다' → 偷看.", "원문의 잘못된 글자를 '偷'로 고친다."],
      tip: "⚠ 인쇄된 ‘틀린 글자’ 형태가 OCR상 불명확. 바른 글자 ‘偷’만 확정 — 학부모 검수 권장.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_007",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "【灯】了三十分钟，巴士却还不来。",
    answer: "等",
    pinyin: "děng",
    meaning: "Correct '灯→等'. '等(děng)' = to wait. 等了三十分钟 = waited 30 minutes.",
    solution: {
      method: "형근 오자 교정",
      steps: ["버스를 '기다리다' → 等.", "'灯(등불)'을 '等(기다리다)'으로 고친다."],
      tip: "等(기다릴 등)과 灯(등 등) 자형 유사.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_008",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "我们刚搬来这里，认【视】的人不多。",
    answer: "识",
    pinyin: "rèn shi",
    meaning: "Correct '视→识'. '认识(rènshi)' = to know/be acquainted with. 认识的人不多.",
    solution: {
      method: "형근 오자 교정",
      steps: ["'认视'는 잘못 → '알다'는 '认识'.", "'视(보다)'를 '识(알다)'로 고친다."],
      tip: "认识(알다)의 ‘识’ — 视와 자형 비슷.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_009",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "我站了起来，把【做】位让给了老奶奶。",
    answer: "座",
    pinyin: "zuò wèi",
    meaning: "Correct '做→座'. '座位(zuòwèi)' = seat. 把座位让给老奶奶 = gave up the seat to the old lady.",
    solution: {
      method: "동음 오자 교정",
      steps: ["'做位'는 잘못 → '자리'는 '座位'.", "'做(하다)'를 '座(자리)'로 고친다."],
      tip: "座位(자리)·座(자리 좌) — 做(zuò)와 동음.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_010",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "我【望】了把作业带回家，结果被老师骂。",
    answer: "忘",
    pinyin: "wàng",
    meaning: "Correct '望→忘'. '忘(wàng)' = to forget. 忘了把作业带回家 = forgot to bring homework home.",
    solution: {
      method: "형근·동음 오자 교정",
      steps: ["숙제 가져오는 걸 '잊다' → 忘.", "'望(바라보다)'을 '忘(잊다)'으로 고친다."],
      tip: "忘(잊을 망)과 望(바랄 망) — 동음(wàng), 자형 유사.",
    },
  },

  // ==========================================================================
  // (二) 填写汉字 BianZi — Q11-Q15 (5题10分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn4_011",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "老鼠一见到猫，就掉头 ___（táo）走了。",
    answer: "逃",
    pinyin: "táo",
    meaning: "'逃(táo)' = to flee. 逃走 = run away.",
    solution: {
      method: "병음→한자 쓰기 (辶 부수)",
      steps: ["táo = 달아나다 → 逃.", "逃走 = 도망가다."],
      tip: "逃(달아날 도)는 ‘辶’ 부수.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_012",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "这次的科学题目一点儿也不难，很 ___（jiǎn）单。",
    answer: "简",
    pinyin: "jiǎn",
    meaning: "'简(jiǎn)' = simple. 简单 = simple/easy.",
    solution: {
      method: "병음→한자 쓰기 (竹 부수)",
      steps: ["jiǎn + 单 = 简单(간단하다).", "'不难'의 단서와 호응."],
      tip: "简单(간단)의 ‘简’ — ‘竹(대 죽)’ 부수.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_013",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "妈妈忙着照 ___（gù）弟弟，没时间休息。",
    answer: "顾",
    pinyin: "gù",
    meaning: "'顾(gù)' = to look after. 照顾 = to take care of.",
    solution: {
      method: "병음→한자 쓰기",
      steps: ["照 + gù = 照顾(돌보다).", "동생을 '돌보다'."],
      tip: "照顾(돌보다)의 ‘顾’.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_014",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "这个十二月 ___（jià）期，我们不会出国旅行。",
    answer: "假",
    pinyin: "jià",
    meaning: "'假(jià)' = holiday. 假期 = holiday/vacation.",
    solution: {
      method: "병음→한자 쓰기 (다음자 주의)",
      steps: ["jià + 期 = 假期(방학·휴가).", "'十二月假期' = 12월 방학."],
      tip: "假: 휴가=jià(4성), 가짜=jiǎ(3성). 뜻으로 음 결정.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_015",
    topic: "BianZi",
    difficulty: "stretch",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "我和弟弟一起讨 ___（lùn）怎么庆祝妈妈的生日。",
    answer: "论",
    pinyin: "lùn",
    meaning: "'论(lùn)' = to discuss. 讨论 = to discuss.",
    solution: {
      method: "병음→한자 쓰기 (讠 부수)",
      steps: ["讨 + lùn = 讨论(토론하다).", "어떻게 축하할지 '의논'."],
      tip: "讨论(토론)의 ‘论’ — ‘讠(말씀 언)’ 부수.",
    },
  },

  // ==========================================================================
  // (三) 填写汉语拼音 PinYin — Q16-Q17 (3题6分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn4_016",
    topic: "PinYin",
    difficulty: "stretch",
    instruction: "把划线词语的汉语拼音填写在括号里。",
    q: "我【沿】（___）着小路走，不久便来到了沙滩。",
    answer: "yán",
    pinyin: "yán",
    meaning: "'沿(yán)' = along. 沿着小路走 = walk along the path.",
    solution: {
      method: "병음 쓰기",
      steps: ["'沿着(~을 따라)'의 '沿' = yán (2성).", "→ yán."],
      tip: "沿着…走 = ~을 따라 걷다. ‘沿’=yán.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_017",
    topic: "PinYin",
    difficulty: "core",
    instruction: "把划线词语的汉语拼音填写在括号里。",
    q: "她张开【嘴】（___）巴，【念】（___）出一段课文。",
    answer: "zuǐ；niàn",
    pinyin: "zuǐ / niàn",
    meaning: "嘴(zuǐ) = mouth; 念(niàn) = to read aloud. 张开嘴巴，念出课文.",
    solution: {
      method: "병음 쓰기 — 두 글자(嘴/念)",
      steps: ["嘴(입) = zuǐ (3성).", "念(소리 내어 읽다) = niàn (4성).", "→ 嘴 zuǐ / 念 niàn."],
      tip: "嘴巴(입)·念课文(과문을 낭독). 두 글자 모두 정확히.",
    },
  },

  // ==========================================================================
  // (四) 选择句子 CiYu — Q18-Q21 (4题8分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn4_018",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：虽然】",
    q: "以下哪一句“虽然”用得正确？",
    options: [
      "虽然妹妹身体不舒服，我们就不要出去了。",
      "虽然老师不在教室，但同学们还是很安静。",
      "虽然大家都用环保袋购物，就能保护环境。",
      "虽然班长生病了，所以今天没来学校上课。",
    ],
    answer: 1, // (2)
    pinyin: "suī rán",
    meaning: "'虽然' = although. Correct in (2): although the teacher was absent, the students stayed quiet.",
    solution: {
      method: "양보 관계 정확성 — '虽然…但…'",
      steps: [
        "'虽然'은 '但是/还是'와 호응(양보).",
        "(2) '虽然…，但同学们还是很安静' ✓.",
        "(1)就 / (3)就 / (4)所以는 호응 어긋남.",
      ],
      tip: "‘虽然 A，但(是) B’ 짝이 맞는 문장.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_019",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：必须】",
    q: "以下哪一句“必须”用得正确？",
    options: [
      "弟弟必须先把功课做完，才可以出去玩。",
      "公公刚刚跌倒了，请朋友必须扶他回家。",
      "植物生长必须充足的阳光、水分和空气。",
      "妈妈一早到超市，买了必须的用品回来。",
    ],
    answer: 0, // (1)
    pinyin: "bì xū",
    meaning: "'必须' = must (+ verb). Correct in (1): must finish homework first before going out.",
    solution: {
      method: "어휘 용법 변별 — '必须'는 '반드시 ~해야 한다(+동사)'",
      steps: [
        "(1) '必须先把功课做完' → 동사 앞 ✓.",
        "(3)은 '需要', (4)는 '必需(필수품)'이 맞고, (2)는 어색.",
      ],
      tip: "必须+동사(반드시 해야 함) ↔ 必需+명사(필수품).",
    },
  },
  {
    id: "p3_zh_wa3_csn4_020",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：结果】",
    q: "以下哪一句“结果”用得正确？",
    options: [
      "哥哥每天只想着玩耍，结果听写不及格。",
      "我先把功课做完，结果才和妹妹一起玩。",
      "老师叫我们回家做功课，结果我做对了。",
      "我们不应该乱扔垃圾，结果会引来蚊虫。",
    ],
    answer: 0, // (1)
    pinyin: "jié guǒ",
    meaning: "'结果' = as a result. Correct in (1): only played every day, as a result failed the spelling test.",
    solution: {
      method: "인과 결과 정확성 판단",
      steps: [
        "'结果'는 '앞 원인 → 뒤 결과'를 이어야 한다.",
        "(1) '只想玩耍 → 听写不及格'이 자연스러운 인과 ✓.",
        "(2)才 / (3) / (4)会는 인과가 어색.",
      ],
      tip: "‘原因，结果 + 실제 일어난 일’ 구조가 맞는 문장.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_021",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：检查】",
    q: "以下哪一句“检查”用得正确？",
    options: [
      "只要检查报纸，就能知道最近发生的事。",
      "爸爸检查了手表，发现时间已经不早了。",
      "老师要我们检查之后，再把作业交给她。",
      "我们一做错事，妈妈就要我们好好检查。",
    ],
    answer: 2, // (3)
    pinyin: "jiǎn chá",
    meaning: "'检查' = to check/inspect. Correct in (3): the teacher asked us to check before handing in homework.",
    solution: {
      method: "어휘 용법 변별 — '检查'는 '점검·확인'",
      steps: [
        "(3) '检查之后再交作业' → 과제를 점검 ✓.",
        "(1)은 '看报纸', (2)는 '看了手表', (4)는 '反省'이 맞다.",
      ],
      tip: "‘잘못을 돌아보다’는 反省, 답안·물건을 ‘점검’은 检查.",
    },
  },

  // ==========================================================================
  // (五) 阅读了解 YueReadMCQ — Q22-Q24 (3题6分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn4_set1",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "CHIJ St Nicholas 复习(四) — 阅读了解（龟兔再赛）",
    instruction: "请阅读短文，然后回答以下的问题。",
    passage:
      "小白兔看不起小乌龟。它认为小乌龟爬得慢，比不上自己。有一次，小白兔在赛跑中输(shū)给小乌龟，心里很不高兴。于是，它约小乌龟再比一次，看谁先翻过小山、越过小河。\n" +
      "比赛一开始，小白兔就快步地向前冲。不久，它爬上了山顶。看见乌龟还在后面慢慢地爬，它忍不住哈哈大笑。可是，小白兔想起上次比赛的教训，便马上往河边跑去。\n" +
      "当小白兔来到河边时，看见小河上的桥倒了。它不会游泳，心里很着急。小白兔很难过，心想：这次比赛又要输了。就在这时，小乌龟追了上来。它停下脚步，对小白兔说：“来！我背你过河!”\n" +
      "小白兔听了，睁大了眼睛，不相信乌龟说的话。于是，它问小乌龟：“你为什么要这么做，你不怕输了比赛吗？”小乌龟笑了笑，说：“这没什么，友情第一，比赛第二。”就这样，它们俩一起过了河。\n" +
      "经过这次的比赛，小白兔知道自己错了，因为小乌龟不但本领一点儿也不小，还乐于助人。",
    questions: [
      {
        id: "p3_zh_wa3_csn4_022",
        type: "MCQ",
        q: "小白兔为什么要跟小乌龟再比一次？",
        options: [
          "因为它认为小乌龟一定会输的。",
          "因为它认为小乌龟有不少本领。",
          "因为它认为小乌龟会慢慢地爬。",
          "因为它认为小乌龟要得到教训。",
        ],
        answer: 0, // 一定会输
        pinyin: "yí dìng huì shū",
        meaning: "Why did the hare want another race? Because it thought the tortoise would surely lose.",
        solution: {
          method: "원인 추론 — 토끼의 심리",
          steps: [
            "'看不起小乌龟…比不上自己', 졌더니 '很不高兴' → 다시 이기려 함.",
            "토끼는 거북이가 질 거라 자신함.",
            "→ (1) 认为小乌龟一定会输的.",
          ],
          tip: "‘看不起 + 输了不高兴’ → 다시 이기려는 자만심이 동기.",
        },
      },
      {
        id: "p3_zh_wa3_csn4_023",
        type: "MCQ",
        q: "小乌龟要背小白兔过河，小白兔有什么感受？",
        options: ["很着急。", "很生气。", "很吃惊。", "很难过。"],
        answer: 2, // 很吃惊
        pinyin: "hěn chī jīng",
        meaning: "How did the hare feel when the tortoise offered to carry it? Very surprised (很吃惊).",
        solution: {
          method: "행동 단서로 감정 추론",
          steps: [
            "'睁大了眼睛，不相信乌龟说的话' → 놀람.",
            "경쟁자가 도와준다니 예상 밖 → 吃惊.",
            "→ (3) 很吃惊.",
          ],
          tip: "‘睁大眼睛·不相信’은 ‘놀람(吃惊)’의 전형적 표현.",
        },
      },
      {
        id: "p3_zh_wa3_csn4_024",
        type: "MCQ",
        q: "你认为小乌龟是只怎样的动物？",
        options: ["懂事。", "热心。", "诚实。", "聪明。"],
        answer: 1, // 热心
        pinyin: "rè xīn",
        meaning: "What kind of animal is the tortoise? Warm-hearted/helpful (热心).",
        solution: {
          method: "인물 성격 판단 — 행동 근거",
          steps: [
            "경쟁 중에도 '我背你过河', '友情第一' → 남을 돕는 마음.",
            "본문 끝 '乐于助人(남 돕기를 즐김)'과 연결.",
            "→ (2) 热心.",
          ],
          tip: "‘乐于助人’ = 热心. 경쟁보다 우정을 택한 행동이 근거.",
        },
      },
    ],
  },

  // ==========================================================================
  // (六) 数笔画，写笔顺，填拼音 PinYin — Q25-Q27 (3题6分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn4_025",
    topic: "PinYin",
    difficulty: "core",
    instruction: "数笔画，写笔顺，填拼音。【例：五（wǔ）4画】",
    q: "汉字「虎」的拼音和笔画数是？",
    answer: "hǔ（8画）",
    pinyin: "hǔ",
    meaning: "'虎(hǔ)' = tiger. 8 strokes.",
    solution: {
      method: "병음 + 필획 수 세기",
      steps: ["虎 = hǔ (3성).", "획수 총 8획."],
      tip: "老虎(호랑이)의 ‘虎’, 8획.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_026",
    topic: "PinYin",
    difficulty: "core",
    instruction: "数笔画，写笔顺，填拼音。【例：五（wǔ）4画】",
    q: "汉字「腿」的拼音和笔画数是？",
    answer: "tuǐ（13画）",
    pinyin: "tuǐ",
    meaning: "'腿(tuǐ)' = leg. 13 strokes.",
    solution: {
      method: "병음 + 필획 수 세기",
      steps: ["腿 = tuǐ (3성).", "획수 총 13획."],
      tip: "腿(다리)는 ‘月(肉)’ 부수, 13획.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_027",
    topic: "PinYin",
    difficulty: "core",
    instruction: "数笔画，写笔顺，填拼音。【例：五（wǔ）4画】",
    q: "汉字「传」的拼音和笔画数是？",
    answer: "chuán（6画）",
    pinyin: "chuán",
    meaning: "'传(chuán)' = to pass on / spread. 6 strokes.",
    solution: {
      method: "병음 + 필획 수 세기",
      steps: ["传 = chuán (2성).", "획수 총 6획."],
      tip: "传(전할 전)은 ‘亻(사람 인)’ 부수, 6획.",
    },
  },
];

export default wa3_chijstnicholas_rev4_2025;
