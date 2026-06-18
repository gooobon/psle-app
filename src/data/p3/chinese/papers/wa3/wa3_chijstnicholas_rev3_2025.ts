// ============================================================================
// CHIJ St Nicholas Girls' School (圣尼各拉女校 小学部)
// P3 Higher Chinese (高级华文) — 2025 复习（三）第九课至第十二课
// Source: sgexam.com P3 Chinese WA3 compilation
// Total marks: 56
//
// NOTE: 改正错字(Q1-10)는 인쇄된 '틀린 글자' 형태가 OCR상 일부 불명확하여,
//   정답키(p79)의 '바른 글자'를 answer로 넣고 의도 문장을 복원했음.
//   형태가 불확실한 항목은 needsParentVerify: true.
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_chijstnicholas_rev3_2025: Question[] = [
  // ==========================================================================
  // (一) 改正错字 BianZi — Q1-Q10 (10题20分)
  // 형식: 문장 속 틀린 글자를 찾아 바른 글자로 고친다. answer = 바른 글자.
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn3_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "我【让】为乱丢垃圾是不对的。",
    answer: "认",
    pinyin: "rèn wéi",
    meaning: "Correct '让→认'. '认为(rènwéi)' = to think/believe. 我认为乱丢垃圾是不对的.",
    solution: {
      method: "동음·형근 오자 교정",
      steps: [
        "'让为'는 잘못 → 올바른 단어는 '认为(생각하다)'.",
        "틀린 글자 '让(ràng)'을 '认(rèn)'으로 고친다.",
      ],
      tip: "认为(여기다) vs 让(양보하다) — 자형이 비슷하니 주의.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_002",
    topic: "BianZi",
    difficulty: "core",
    needsParentVerify: true,
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "我们不应该【摘错字】公园里的花朵。（정답 문장: 我们不应该摘公园里的花朵。）",
    answer: "摘",
    pinyin: "zhāi",
    meaning: "Corrected to '摘(zhāi)' = to pick (flowers). 不应该摘公园里的花朵 = shouldn't pick the flowers in the park.",
    solution: {
      method: "동작 동사 교정",
      steps: [
        "공원 꽃에 하는 동작 → '따다(摘)'.",
        "원문의 잘못된 글자를 '摘'으로 고친다.",
      ],
      tip: "⚠ 인쇄된 ‘틀린 글자’ 형태가 OCR상 불명확. 바른 글자 ‘摘’만 확정 — 학부모 검수 권장.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "桌上的糖果【印】来了很多蚂蚁。",
    answer: "引",
    pinyin: "yǐn lái",
    meaning: "Correct '印→引'. '引来(yǐnlái)' = to attract. 糖果引来了很多蚂蚁 = the sweets attracted many ants.",
    solution: {
      method: "동음 오자 교정",
      steps: [
        "'印来'는 잘못 → '끌어오다'는 '引来'.",
        "'印(yìn)'을 '引(yǐn)'으로 고친다.",
      ],
      tip: "引来(끌어들이다)와 印(찍다)은 발음이 비슷.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "我把国【七】画在明信片的中间。",
    answer: "旗",
    pinyin: "guó qí",
    meaning: "Correct '七→旗'. '国旗(guóqí)' = national flag. 把国旗画在明信片的中间.",
    solution: {
      method: "단어 의미로 오자 교정",
      steps: [
        "엽서에 그리는 것 → '国旗(국기)'.",
        "잘못된 '七'을 '旗'로 고친다.",
      ],
      tip: "国旗(국기)·旗子(깃발)의 ‘旗’.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_005",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "妈妈对我的学习表现很【慢】意。",
    answer: "满",
    pinyin: "mǎn yì",
    meaning: "Correct '慢→满'. '满意(mǎnyì)' = satisfied. 对我的学习表现很满意.",
    solution: {
      method: "동음 오자 교정",
      steps: [
        "'慢意'는 잘못 → '만족하다'는 '满意'.",
        "'慢(màn)'을 '满(mǎn)'으로 고친다.",
      ],
      tip: "满意(만족) vs 慢(느리다) — 발음·자형 유사.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_006",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "小明【专】过头来，笑着对我说话。",
    answer: "转",
    pinyin: "zhuǎn",
    meaning: "Correct '专→转'. '转过头来(zhuǎn guò tóu lái)' = to turn one's head around.",
    solution: {
      method: "형근 오자 교정",
      steps: [
        "고개를 '돌리다' → 转过头来.",
        "'专(zhuān)'을 '转(zhuǎn)'으로 고친다.",
      ],
      tip: "转(돌다)과 专(전문)은 우측이 비슷.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_007",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "周末，我和妹妹到公园【奇】脚踏车。",
    answer: "骑",
    pinyin: "qí",
    meaning: "Correct '奇→骑'. '骑脚踏车(qí jiǎotàchē)' = to ride a bicycle.",
    solution: {
      method: "동음·형근 오자 교정",
      steps: [
        "자전거를 '타다' → 骑.",
        "'奇(qí)'를 '骑(qí)'로 고친다(부수 ‘马’).",
      ],
      tip: "骑(말 탈 기)는 ‘马’ 부수. 奇(기이할 기)와 발음 같음.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_008",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "妈妈每天都会提着环保【带】去买东西。",
    answer: "袋",
    pinyin: "dài",
    meaning: "Correct '带→袋'. '环保袋(huánbǎo dài)' = reusable bag.",
    solution: {
      method: "동음 오자 교정",
      steps: [
        "'环保带'는 잘못 → '环保袋(에코백)'.",
        "'带(띠)'를 '袋(자루·가방)'로 고친다.",
      ],
      tip: "袋(주머니/가방)와 带(띠/지니다)는 동음(dài).",
    },
  },
  {
    id: "p3_zh_wa3_csn3_009",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "曹冲想办法，称出来大象的重【亮】。",
    answer: "量",
    pinyin: "zhòng liàng",
    meaning: "Correct '亮→量'. '重量(zhòngliàng)' = weight. 称出大象的重量.",
    solution: {
      method: "단어 의미로 오자 교정",
      steps: [
        "코끼리를 재는 것 → '重量(무게)'.",
        "'亮(밝다)'을 '量(양·무게)'으로 고친다.",
      ],
      tip: "曹冲称象(조충이 코끼리 무게를 잼) 이야기 — 重量.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_010",
    topic: "BianZi",
    difficulty: "core",
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "上课铃声响了，同学们都【忘】课室的方向走去。",
    answer: "往",
    pinyin: "wǎng",
    meaning: "Correct '忘→往'. '往……走去(wǎng…zǒu qù)' = to walk towards…. 往课室的方向走去.",
    solution: {
      method: "형근 오자 교정",
      steps: [
        "'____ 课室的方向走去' → '~을 향해(往)'.",
        "'忘(잊다)'을 '往(향하다)'으로 고친다.",
      ],
      tip: "往(향할 왕)과 忘(잊을 망)은 자형이 비슷.",
    },
  },

  // ==========================================================================
  // (二) 填写汉字 BianZi — Q11-Q15 (5题10分)
  // 拼音에 맞는 한자를 쓴다. answer = 한자.
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn3_011",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "她把儿时的玩具都 ___（rēng）掉了。",
    answer: "扔",
    pinyin: "rēng",
    meaning: "'扔(rēng)' = to throw away. 扔掉 = throw away.",
    solution: {
      method: "병음→한자 쓰기 (扌 부수)",
      steps: [
        "rēng = 던지다/버리다 → 扔.",
        "손동작이므로 부수 ‘扌’.",
      ],
      tip: "扔(rēng)·掉 결합 → 扔掉(버리다).",
    },
  },
  {
    id: "p3_zh_wa3_csn3_012",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "用过的 ___（píng）子，我们可以用来种花。",
    answer: "瓶",
    pinyin: "píng",
    meaning: "'瓶(píng)' = bottle. 瓶子 = bottle.",
    solution: {
      method: "병음→한자 쓰기",
      steps: ["píng + 子 = 瓶子(병)."],
      tip: "瓶子(병)는 ‘瓦’ 부수 포함.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_013",
    topic: "BianZi",
    difficulty: "stretch",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "哥哥跑步很快，轻松地 ___（chāo）越了前面的人。",
    answer: "超",
    pinyin: "chāo",
    meaning: "'超(chāo)' = to overtake/surpass. 超越 = to overtake.",
    solution: {
      method: "병음→한자 쓰기",
      steps: ["chāo + 越 = 超越(추월하다)."],
      tip: "超越(추월)·超过(초과)의 ‘超’ (走 부수).",
    },
  },
  {
    id: "p3_zh_wa3_csn3_014",
    topic: "BianZi",
    difficulty: "core",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "小文为了学好华文，每天都会读华文 ___（bào）纸。",
    answer: "报",
    pinyin: "bào",
    meaning: "'报(bào)' = newspaper. 报纸 = newspaper.",
    solution: {
      method: "병음→한자 쓰기",
      steps: ["bào + 纸 = 报纸(신문)."],
      tip: "报纸(신문)·报告(보고)의 ‘报’.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_015",
    topic: "BianZi",
    difficulty: "stretch",
    instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
    q: "休息时，我们一起帮老师把图书 ___（zhuāng）进箱子里。",
    answer: "装",
    pinyin: "zhuāng",
    meaning: "'装(zhuāng)' = to load/pack into. 装进箱子里 = pack into the box.",
    solution: {
      method: "병음→한자 쓰기",
      steps: ["zhuāng = (안에) 담다/넣다 → 装.", "装进…里 = ~안에 채워 넣다."],
      tip: "装(담을 장)·安装(설치)의 ‘装’.",
    },
  },

  // ==========================================================================
  // (三) 填写汉语拼音 PinYin — Q16-Q17 (3题6分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn3_016",
    topic: "PinYin",
    difficulty: "core",
    instruction: "把划线词语的汉语拼音填写在括号里。",
    q: "垃圾没人清理，环境变得又【脏】（___）又【臭】（___）。",
    answer: "zāng；chòu",
    pinyin: "zāng / chòu",
    meaning: "脏(zāng) = dirty; 臭(chòu) = smelly. 又脏又臭 = dirty and smelly.",
    solution: {
      method: "병음 쓰기 — 두 글자(脏/臭)",
      steps: [
        "脏(더럽다) = zāng (1성).",
        "臭(냄새나다) = chòu (4성).",
        "→ 脏 zāng / 臭 chòu.",
      ],
      tip: "又脏又臭 — 두 글자 모두 정확히 표기해야 점수.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_017",
    topic: "PinYin",
    difficulty: "core",
    instruction: "把划线词语的汉语拼音填写在括号里。",
    q: "六月的假【期】（___）里，我们一家人到日本游玩。",
    answer: "qī",
    pinyin: "qī",
    meaning: "'期(qī)' in 假期 = period/holiday. 假期(jiàqī) = holiday.",
    solution: {
      method: "병음 쓰기 — 다음자 주의",
      steps: [
        "'假期'의 '期'는 qī (1성).",
        "→ qī.",
      ],
      tip: "假期(jiàqī)=방학/휴가. ‘期’는 보통 qī.",
    },
  },

  // ==========================================================================
  // (四) 选择句子 CiYu — Q18-Q21 (4题8分)
  // 划线词语가 '바르게 쓰인' 문장을 고른다.
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn3_018",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：决定】",
    q: "以下哪一句“决定”用得正确？",
    options: [
      "我和妈妈都决定这一件衣服十分美丽。",
      "同学们决定班长这次的听写得了高分。",
      "大家都决定老师刚才讲的故事很有趣。",
      "我和姐姐决定每天早上都去公园跑步。",
    ],
    answer: 3, // (4)
    pinyin: "jué dìng",
    meaning: "'决定' = to decide. Correct only in (4): decided to jog every morning.",
    solution: {
      method: "어휘 용법 변별 — '决定'은 '~하기로 정하다'",
      steps: [
        "'决定'은 행동·계획을 정할 때 쓴다.",
        "(1)(2)(3)은 '판단/생각'이라 '觉得/认为'가 맞다.",
        "(4) '决定每天去跑步'만 올바른 용법.",
      ],
      tip: "决定 + 동작계획. 의견·판단엔 ‘觉得/认为’.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_019",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：如果】",
    q: "以下哪一句“如果”用得正确？",
    options: [
      "如果外面下着雨，我还是要去图书馆借书。",
      "如果哥哥每天专心听课，就能有好的表现。",
      "如果妹妹没有在比赛中得奖，但她很高兴。",
      "如果弟弟用心学习，妈妈说他是个好孩子。",
    ],
    answer: 1, // (2)
    pinyin: "rú guǒ",
    meaning: "'如果' = if. Correct only in (2): if elder brother listens attentively, he'll do well.",
    solution: {
      method: "가정 관계 정확성 판단 — '如果…就…'",
      steps: [
        "'如果'는 조건+결과(就/便)와 호응해야 한다.",
        "(2) '如果…专心听课，就能有好的表现'이 자연스러운 가정.",
        "(1)还是… / (3)但… / (4)는 호응이 어긋남.",
      ],
      tip: "‘如果 A，就 B’ 짝이 맞는 문장을 고른다.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_020",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：吃惊】",
    q: "以下哪一句“吃惊”用得正确？",
    options: [
      "那个不学习的孩子又迟到了，老师很吃惊。",
      "我的小狗已经病了几个月，我感到很吃惊。",
      "妹妹一直找不到回家的路，心里吃惊极了。",
      "今天早上学校突然停电，我们都十分吃惊。",
    ],
    answer: 3, // (4)
    pinyin: "chī jīng",
    meaning: "'吃惊' = to be startled/shocked (by something sudden). Correct in (4): sudden power cut shocked us.",
    solution: {
      method: "어휘 용법 변별 — '吃惊'은 '갑작스러운 일에 놀람'",
      steps: [
        "'吃惊'은 예상 밖의 갑작스러운 사건에 놀랄 때.",
        "(4) '突然停电' → '十分吃惊'이 자연스럽다.",
        "(1)迟到는 늘 있던 일, (2)오래 아픔, (3)길 못 찾음은 ‘着急’가 맞음.",
      ],
      tip: "‘吃惊’의 단짝 단서: 突然/没想到(갑작스러움).",
    },
  },
  {
    id: "p3_zh_wa3_csn3_021",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "选择正确的答案（划线词语用得正确的句子），然后把号码填写在括号里。【词语：利用】",
    q: "以下哪一句“利用”用得正确？",
    options: [
      "我利用休息的时间，完成了大部分的功课。",
      "电脑的利用十分大，帮助我们做了很多事。",
      "这台洗衣机是新的，奶奶不知道怎么利用。",
      "这支蓝色的笔用了很久也没坏，十分利用。",
    ],
    answer: 0, // (1)
    pinyin: "lì yòng",
    meaning: "'利用' = to make use of (time/resource). Correct in (1): used the rest time to finish homework.",
    solution: {
      method: "어휘 용법 변별 — '利用'은 '시간·기회·자원을 활용'",
      steps: [
        "(1) '利用休息的时间' → 시간을 활용 ✓.",
        "(2) '利用十分大'는 명사 오용(用处/作用), (3)도구는 '使用', (4) '十分利用'은 비문.",
      ],
      tip: "시간·기회는 ‘利用’, 기계·도구는 ‘使用’.",
    },
  },

  // ==========================================================================
  // (五) 看短文，回答问题 YueReadMCQ — Q22-Q24 (3题6分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn3_set1",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "CHIJ St Nicholas 复习(三) — 看短文回答（子文与妹妹）",
    instruction: "根据短文内容，选出最适当的答案。",
    passage:
      "一个下午，妈妈在喂两岁的妹妹吃水果，子文在玩手机游戏。\n" +
      "不久，外头下起了大雨。妈妈一边跑到厨房(chú)，一边大声喊道：“子文，妈妈去把屋外的衣服收进来，你看着妹妹。”子文没好气地回答道：“别担心，妹妹不会有事的!”子文看了妹妹一眼，又低头继续玩手机游戏，把妈妈的话当耳边风。\n" +
      "就在这时，妹妹不小心从沙发上跌了下来，痛得她放声大哭。子文见了，吓得不敢出声。妈妈听到妹妹的哭声，马上冲到客厅抱起妹妹，看她有没有受伤。\n" +
      "过后，妈妈拿走子文的手机，生气地对他说：“你只顾着玩，叫你做点儿事都做不好，以后不准你再玩手机游戏!”\n" +
      "子文低下头，一句话也不敢说。",
    questions: [
      {
        id: "p3_zh_wa3_csn3_022",
        type: "MCQ",
        q: "妈妈要子文 ___",
        options: ["收拾衣服。", "去做午餐。", "照顾妹妹。", "放下手机。"],
        answer: 2, // 照顾妹妹
        pinyin: "zhào gù mèi mei",
        meaning: "What did mum ask Zi Wen to do? To look after his little sister (照顾妹妹).",
        solution: {
          method: "세부정보 — 엄마 대사 인용",
          steps: [
            "엄마: '妈妈去把屋外的衣服收进来，你看着妹妹'.",
            "'看着妹妹' = 동생을 돌봐라.",
            "→ (3) 照顾妹妹.",
          ],
          tip: "옷을 거두는 건 ‘엄마’의 일, 子文의 일은 ‘동생 돌보기’.",
        },
      },
      {
        id: "p3_zh_wa3_csn3_023",
        type: "MCQ",
        q: "子文不把妈妈的话放在心上，因为他 ___",
        options: ["只想玩手机的游戏。", "讨厌年纪小的妹妹。", "一点也不喜欢妹妹。", "觉得妹妹会自己玩。"],
        answer: 0, // 只想玩手机的游戏
        pinyin: "zhǐ xiǎng wán shǒu jī de yóu xì",
        meaning: "Why did he ignore mum? Because he only wanted to keep playing his phone game.",
        solution: {
          method: "원인 추론",
          steps: [
            "'又低头继续玩手机游戏，把妈妈的话当耳边风'.",
            "게임에만 빠져 엄마 말을 흘려들음.",
            "→ (1) 只想玩手机的游戏.",
          ],
          tip: "‘当耳边风(귓등으로 흘리다)’ + 계속 게임 → 게임에 몰두가 원인.",
        },
      },
      {
        id: "p3_zh_wa3_csn3_024",
        type: "MCQ",
        q: "文中的子文是一个怎样的孩子？",
        options: ["不用功。", "不懂事。", "没爱心。", "没礼貌。"],
        answer: 1, // 不懂事
        pinyin: "bù dǒng shì",
        meaning: "What kind of child is Zi Wen? Not sensible / immature (不懂事).",
        solution: {
          method: "인물 성격 판단(总结题)",
          steps: [
            "엄마 부탁을 무시하다 동생이 다침 → 철없는 행동.",
            "'不懂事(철이 없다)'가 전체 행동을 가장 잘 요약.",
            "→ (2) 不懂事.",
          ],
          tip: "‘맡은 일을 제대로 안 하고 결과가 나쁨’ → 不懂事.",
        },
      },
    ],
  },

  // ==========================================================================
  // (六) 数笔画，写笔顺，填拼音 PinYin — Q25-Q27 (3题6分)
  // 예: 五（wǔ）4画
  // ==========================================================================
  {
    id: "p3_zh_wa3_csn3_025",
    topic: "PinYin",
    difficulty: "core",
    instruction: "数笔画，写笔顺，填拼音。【例：五（wǔ）4画】",
    q: "汉字「钱」的拼音和笔画数是？",
    answer: "qián（10画）",
    pinyin: "qián",
    meaning: "'钱(qián)' = money. 10 strokes.",
    solution: {
      method: "병음 + 필획 수 세기",
      steps: [
        "钱 = qián (2성).",
        "획수: 钅(5획) + 戋(5획) = 10획.",
      ],
      tip: "钱(돈 전)은 ‘钅(쇠 금)’ 부수, 총 10획.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_026",
    topic: "PinYin",
    difficulty: "core",
    instruction: "数笔画，写笔顺，填拼音。【例：五（wǔ）4画】",
    q: "汉字「离」的拼音和笔画数是？",
    answer: "lí（10画）",
    pinyin: "lí",
    meaning: "'离(lí)' = to leave / be apart from. 10 strokes.",
    solution: {
      method: "병음 + 필획 수 세기",
      steps: ["离 = lí (2성).", "획수 총 10획."],
      tip: "离开(떠나다)의 ‘离’, 10획.",
    },
  },
  {
    id: "p3_zh_wa3_csn3_027",
    topic: "PinYin",
    difficulty: "core",
    instruction: "数笔画，写笔顺，填拼音。【例：五（wǔ）4画】",
    q: "汉字「考」的拼音和笔画数是？",
    answer: "kǎo（6画）",
    pinyin: "kǎo",
    meaning: "'考(kǎo)' = to test / take an exam. 6 strokes.",
    solution: {
      method: "병음 + 필획 수 세기",
      steps: ["考 = kǎo (3성).", "획수 총 6획."],
      tip: "考试(시험)의 ‘考’, 6획.",
    },
  },
];

export default wa3_chijstnicholas_rev3_2025;
