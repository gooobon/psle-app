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
      method: "Correcting characters that look or sound alike (homophone/similar-shape errors)",
      steps: [
        "'让为' is wrong → the correct word is '认为' (to think/believe).",
        "Change the wrong character '让 (ràng)' to '认 (rèn)'.",
      ],
      tip: "'认为' (to think) vs '让' (to let/give way) — these characters look similar, so be careful!",
    },
  },
  {
    id: "p3_zh_wa3_csn3_002",
    topic: "BianZi",
    difficulty: "core",
    needsParentVerify: true,
    instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
    q: "我们不应该【摘错字】公园里的花朵。(Correct sentence: 我们不应该摘公园里的花朵。)",
    answer: "摘",
    pinyin: "zhāi",
    meaning: "Corrected to '摘(zhāi)' = to pick (flowers). 不应该摘公园里的花朵 = shouldn't pick the flowers in the park.",
    solution: {
      method: "Correcting the action verb",
      steps: [
        "The action done to flowers in the park → 'to pick' (摘).",
        "Change the wrong character in the original sentence to '摘'.",
      ],
      tip: "⚠ The wrong character shown in print is unclear in the scanned image. Only the correct character '摘' is confirmed — parents are advised to check the original.",
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
      method: "Correcting a homophone error (characters that sound alike)",
      steps: [
        "'印来' is wrong → the correct word for 'to attract/draw in' is '引来'.",
        "Change '印 (yìn)' to '引 (yǐn)'.",
      ],
      tip: "'引来' (to attract) and '印' (to print/stamp) sound similar — do not mix them up!",
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
      method: "Correcting a wrong character based on word meaning",
      steps: [
        "What is drawn on a postcard → '国旗' (national flag).",
        "Change the wrong character '七' to '旗'.",
      ],
      tip: "'旗' is the character used in words like 国旗 (national flag) and 旗子 (flag).",
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
      method: "Correcting a mistake caused by same pronunciation (homophone error)",
      steps: [
        "'慢意' is wrong — the correct word for 'satisfied' is '满意'.",
        "Change '慢 (màn)' to '满 (mǎn)'.",
      ],
      tip: "满意 (satisfied) vs 慢 (slow) — they sound similar and look alike.",
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
      method: "Correcting a mistake caused by similar-looking characters (similar form error)",
      steps: [
        "'To turn one's head' in Chinese is 转过头来.",
        "Change '专 (zhuān)' to '转 (zhuǎn)'.",
      ],
      tip: "转 (to turn) and 专 (specialised) look similar on the right side.",
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
      method: "Correcting a mistake caused by both same pronunciation and similar-looking characters",
      steps: [
        "'To ride a bicycle' in Chinese uses the character 骑.",
        "Change '奇 (qí)' to '骑 (qí)' — remember that 骑 has the radical '马' (horse).",
      ],
      tip: "骑 (to ride) uses the '马' (horse) radical. It sounds the same as 奇 (strange/odd).",
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
      method: "Correcting a mistake caused by same pronunciation (homophone error)",
      steps: [
        "'环保带' is wrong → correct word is '环保袋 (eco bag)'.",
        "Change '带' (belt/ribbon) to '袋' (bag/sack).",
      ],
      tip: "'袋' (bag/pocket) and '带' (belt/to carry) sound the same in Chinese: both are pronounced 'dài'.",
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
      method: "Correcting the wrong character by thinking about the meaning of the word.",
      steps: [
        "Weighing an elephant → the correct word is '重量' (weight).",
        "Change '亮' (bright) to '量' (amount/weight).",
      ],
      tip: "This is from the story of Cao Chong Weighing the Elephant (曹冲称象) — the key word is '重量' (weight).",
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
      method: "Correcting the wrong character by looking at its shape.",
      steps: [
        "'____ 课室的方向走去' → use '往' to mean 'towards' or 'in the direction of'.",
        "Change '忘' (to forget) to '往' (towards/in the direction of).",
      ],
      tip: "'往' (towards) and '忘' (to forget) look very similar in written form.",
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
      method: "Writing Chinese characters from Pinyin — focus on characters with the '扌' (hand) radical.",
      steps: [
        "'rēng' means to throw or to toss → the correct character is '扔'.",
        "Because this action is done with the hand, the character uses the '扌' (hand) radical.",
      ],
      tip: "'扔' (rēng) + '掉' together form '扔掉', which means 'to throw away'.",
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
      method: "Write the Chinese character from the pinyin given.",
      steps: ["píng + 子 = 瓶子 (bottle)."],
      tip: "瓶子 (bottle) contains the radical '瓦'.",
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
      method: "Write the Chinese character from the pinyin given.",
      steps: ["chāo + 越 = 超越 (to overtake / surpass)."],
      tip: "Both 超越 (surpass) and 超过 (exceed) use '超', which has the radical '走'.",
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
      method: "Write the Chinese character from the pinyin given.",
      steps: ["bào + 纸 = 报纸 (newspaper)."],
      tip: "Both 报纸 (newspaper) and 报告 (report) use the character '报'.",
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
      method: "Write the Chinese character from the pinyin given.",
      steps: ["zhuāng = to put (something) inside / to fill in → 装.", "装进…里 = to put / fill something inside something else."],
      tip: "The character '装' appears in both 装 (to contain/pack) and 安装 (to install).",
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
      method: "Write the pinyin — two characters (脏 / 臭).",
      steps: [
        "脏 (dirty) = zāng (1st tone).",
        "臭 (smells bad) = chòu (4th tone).",
        "→ 脏 zāng / 臭 chòu.",
      ],
      tip: "又脏又臭 — Both characters must be written correctly to get the mark.",
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
      method: "Writing Pinyin — Watch out for characters with more than one pronunciation.",
      steps: [
        "The character '期' in '假期' is pronounced qī (1st tone).",
        "→ qī.",
      ],
      tip: "假期 (jiàqī) means holiday or vacation. '期' is usually pronounced qī.",
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
      method: "Vocabulary usage — '决定' means 'to decide to do something'.",
      steps: [
        "'决定' is used when deciding on an action or a plan.",
        "Sentences (1), (2), and (3) express opinions or thoughts, so '觉得' or '认为' should be used instead.",
        "Only sentence (4) '决定每天去跑步' uses '决定' correctly.",
      ],
      tip: "决定 + action or plan. For opinions and judgements, use '觉得' or '认为'.",
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
      method: "Identifying correct conditional relationships — '如果…就…'",
      steps: [
        "'如果' must be paired with a result clause using '就' or '便'.",
        "Sentence (2) '如果…专心听课，就能有好的表现' is a natural and correct conditional sentence.",
        "Sentence (1) uses 还是…, sentence (3) uses 但…, and sentence (4) has a mismatched pairing — none of these are correct.",
      ],
      tip: "Choose the sentence where '如果 A，就 B' are correctly paired together.",
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
      method: "Vocabulary Usage — '吃惊' means 'being surprised by something sudden and unexpected'",
      steps: [
        "'吃惊' is used when you are shocked by something sudden that you did not expect.",
        "(4) '突然停电' → '十分吃惊' is the natural and correct choice here.",
        "(1) Being late happens often, (2) being sick for a long time, (3) getting lost — these all fit '着急', not '吃惊'.",
      ],
      tip: "Key clue words that go with '吃惊': 突然 / 没想到 (something sudden or unexpected).",
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
      method: "Vocabulary Usage — '利用' means 'to make use of time, opportunities, or resources'",
      steps: [
        "(1) '利用休息的时间' → using time wisely ✓",
        "(2) '利用十分大' is wrong because '利用' is a verb, not a noun — use '用处' or '作用' instead. (3) For tools and machines, use '使用'. (4) '十分利用' is incorrect and does not make sense.",
      ],
      tip: "Use '利用' for time and opportunities. Use '使用' for machines and tools.",
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
          method: "Finding Details — quoting what Mum said",
          steps: [
            "Mum said: '妈妈去把屋外的衣服收进来，你看着妹妹'.",
            "'看着妹妹' means 'look after your younger sister'.",
            "→ (3) 照顾妹妹.",
          ],
          tip: "Bringing in the clothes is Mum's job. 子文's job is to look after his younger sister.",
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
          method: "Finding the Reason",
          steps: [
            "'又低头继续玩手机游戏，把妈妈的话当耳边风'.",
            "He was too focused on his game and did not listen carefully to what Mum said.",
            "→ (1) 只想玩手机的游戏.",
          ],
          tip: "'Turn a deaf ear (귓등으로 흘리다)' + keeps playing games → Being too focused on games is the cause.",
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
          method: "Judging a character's personality (Summary Question / 总结题)",
          steps: [
            "Ignores mum's request and younger sibling gets hurt → Immature, irresponsible behaviour.",
            "'不懂事 (immature/irresponsible)' best summarises the character's overall behaviour.",
            "→ (2) 不懂事.",
          ],
          tip: "'Does not do their duty properly and causes a bad outcome' → 不懂事 (immature/irresponsible).",
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
      method: "Pinyin + Counting the number of strokes",
      steps: [
        "钱 = qián (2nd tone).",
        "Stroke count: 钅 (5 strokes) + 戋 (5 strokes) = 10 strokes total.",
      ],
      tip: "钱 (money) uses the radical '钅 (metal)', and has 10 strokes in total.",
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
      method: "Pinyin + Counting the number of strokes",
      steps: ["离 = lí (2nd tone).", "Total stroke count: 10 strokes."],
      tip: "'离' from 离开 (to leave/depart), has 10 strokes.",
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
      method: "Pinyin + Counting the number of strokes",
      steps: ["考 = kǎo (3rd tone).", "Total of 6 strokes."],
      tip: "The character '考' from 考试 (exam), 6 strokes.",
    },
  },
];

export default wa3_chijstnicholas_rev3_2025;
