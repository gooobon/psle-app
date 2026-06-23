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
      method: "Correcting a wrong character that sounds the same (homophone error)",
      steps: ["'不感' is wrong → to mean 'dare not do something', the correct word is '不敢'.", "Change '感 (to feel)' to '敢 (to dare)'."],
      tip: "敢 (to dare) vs 感 (to feel) — same sound (gǎn), and their written forms look a little similar.",
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
      method: "Correcting a wrong character that sounds the same (homophone error) — involves the '口' radical",
      steps: ["To 'feed' an animal → use 喂.", "Change '为 (wèi)' to '喂 (wèi)'."],
      tip: "喂 (to feed) has the '口' radical, and sounds the same as 为 (to do/for).",
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
      method: "Correcting a wrong character that sounds the same (homophone error)",
      steps: ["'七负' is wrong → to mean 'to bully', the correct word is '欺负'.", "Change '七 (qī)' to '欺 (qī)'."],
      tip: "The '欺' in 欺负 (to bully) — sounds exactly the same as 七.",
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
      method: "Correcting a wrong character that looks similar and sounds the same",
      steps: ["To 'raise' or 'keep' fish → use 养.", "Change '样 (appearance/shape)' to '养 (to raise/to keep)'."],
      tip: "The characters 养 and 样 look similar in shape.",
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
      method: "Correction of a look-alike character mistake.",
      steps: ["Writing one's name → '试卷' (exam paper).", "Change '士' to '试'."],
      tip: "The character '试' in 试卷 (exam paper) — a look-alike character that contains '士'.",
    },
  },
  {
    id: "p3_zh_wa3_csn4_006",
    topic: "BianZi",
    difficulty: "core",
    needsParentVerify: true,
    instruction: "请在错误的汉字下面划线，然后把正确的汉字填写在括号里。",
    q: "During 听写 (dictation), I found that 小文 was 【偷错字】looking secretly. (Correct sentence: 听写时，我发现小文在偷看。)",
    answer: "偷",
    pinyin: "tōu",
    meaning: "Corrected to '偷(tōu)'. '偷看(tōukàn)' = to peek/sneak a look. 小文在偷看 = Xiao Wen was peeking.",
    solution: {
      method: "Correction of an action word based on context.",
      steps: ["To secretly look during dictation → 偷看.", "Change the wrong character in the original to '偷'."],
      tip: "⚠ The printed 'wrong character' form is unclear in OCR. Only the correct character '偷' is confirmed — parent review is recommended.",
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
      method: "Correction of a look-alike character mistake.",
      steps: ["To 'wait' for a bus → 等.", "Change '灯 (light)' to '等 (to wait)'."],
      tip: "The characters 等 and 灯 look similar in shape.",
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
      method: "Correction of a look-alike character mistake.",
      steps: ["'认视' is wrong → the correct word for 'to know someone' is '认识'.", "Change '视 (to see/look)' to '识 (to know/recognise)'."],
      tip: "In 认识 (to know someone), the character '识' looks similar to '视', so be careful not to mix them up.",
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
      method: "Correcting a wrong character that sounds the same as the right one",
      steps: ["'做位' is wrong → the correct word for 'seat' is '座位'.", "Change '做 (to do)' to '座 (seat)'."],
      tip: "'座位 (seat)' uses '座 (seat)' — it sounds the same as '做 (zuò)', so they are easy to mix up.",
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
      method: "Correcting characters that look similar or sound the same",
      steps: ["To 'forget' to bring homework → use the character 忘.", "Change '望 (to look into the distance)' to '忘 (to forget)'."],
      tip: "'忘 (to forget)' and '望 (to hope/look)' sound the same (wàng) and look similar, so be careful not to mix them up.",
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
      method: "Writing Chinese characters from Pinyin (using the 辶 radical)",
      steps: ["táo = to run away → 逃.", "逃走 = to run away / to escape."],
      tip: "The character 逃 (to escape) uses the '辶' radical.",
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
      method: "Writing Chinese characters from Pinyin (竹 radical)",
      steps: ["jiǎn + 单 = 简单 (simple / easy).", "Matches the clue given by '不难' (not difficult)."],
      tip: "The character '简' in 简单 (simple) uses the '竹 (bamboo)' radical.",
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
      method: "Writing Chinese characters from Pinyin",
      steps: ["照 + gù = 照顾 (to take care of).", "Meaning: to 'take care of' a younger sibling."],
      tip: "The character '顾' in 照顾 (to take care of).",
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
      method: "Writing Chinese characters from Pinyin (watch out — this character has more than one pronunciation!)",
      steps: ["jià + 期 = 假期 (school holiday / vacation).", "'十二月假期' means the December school holidays."],
      tip: "假 has two readings: jià (4th tone) means holiday/vacation, jiǎ (3rd tone) means fake/false. The meaning of the word helps you decide which pronunciation to use.",
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
      method: "Writing Chinese characters from Pinyin (讠radical)",
      steps: ["讨 + lùn = 讨论 (to discuss).", "Talking about how to celebrate — meaning 'to discuss'."],
      tip: "The character '论' in '讨论' (discussion) belongs to the '讠(speech)' radical.",
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
      method: "Writing Pinyin",
      steps: ["The character '沿' in '沿着' (along/following) is pronounced yán (2nd tone).", "→ yán."],
      tip: "'沿着…走' means 'to walk along…'. '沿' is pronounced yán.",
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
      method: "Writing Pinyin — two characters (嘴 / 念)",
      steps: ["'嘴' (mouth) is pronounced zuǐ (3rd tone).", "'念' (to read aloud) is pronounced niàn (4th tone).", "→ 嘴 zuǐ / 念 niàn."],
      tip: "'嘴巴' (mouth) and '念课文' (read the passage aloud). Make sure both characters are written correctly.",
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
      method: "Using concessive sentence structures correctly — '虽然…但…' (Although… But…)",
      steps: [
        "'虽然' (although) must be paired with '但是' or '还是' to form a correct concessive sentence.",
        "(2) '虽然…，但同学们还是很安静' ✓.",
        "Options (1) '就', (3) '就', and (4) '所以' do not correctly pair with '虽然'.",
      ],
      tip: "The correct pattern is '虽然 A，但(是) B' — make sure both parts of the pair match.",
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
      method: "Knowing how to use vocabulary correctly — '必须' means 'must / have to' and is always followed by a verb.",
      steps: [
        "Example (1): '必须先把功课做完' — '必须' is placed before the verb. ✓",
        "For (3), the correct word is '需要' (need); for (4), the correct word is '必需' (necessity/essential item); and (2) sounds unnatural.",
      ],
      tip: "必须 + verb (something you must do) ↔ 必需 + noun (something you must have). These two words are different!",
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
      method: "Deciding if a cause and effect is correct",
      steps: [
        "'结果' must connect a cause at the front to a result at the back.",
        "(1) 'Only wanting to play → failing dictation' is a natural cause and effect ✓.",
        "(2) 才 / (3) / (4) 会 have awkward cause-and-effect connections.",
      ],
      tip: "The correct sentence structure is: 'Cause, Result + what actually happened'.",
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
      method: "Learning the difference between vocabulary words — '检查' means 'to check or inspect'.",
      steps: [
        "(3) '检查之后再交作业' → checking the work before handing it in ✓.",
        "(1) should use '看报纸', (2) should use '看了手表', and (4) should use '反省'.",
      ],
      tip: "'Reflecting on a mistake' uses 反省, while 'checking an answer or an item' uses 检查.",
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
          method: "Finding the reason — understanding the rabbit's feelings",
          steps: [
            "The rabbit '看不起小乌龟' and thinks the tortoise is no match for him. After losing, he feels '很不高兴', so he wants to win again.",
            "The rabbit is confident that the tortoise will lose.",
            "→ (1) 认为小乌龟一定会输的.",
          ],
          tip: "'看不起 + feeling unhappy after losing' → the rabbit's pride is what motivates him to race again.",
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
          method: "Using clues about actions to figure out how a character feels",
          steps: [
            "'睁大了眼睛，不相信乌龟说的话' shows surprise.",
            "It is surprising that a competitor offers to help → 吃惊 (shocked/surprised).",
            "→ (3) 很吃惊.",
          ],
          tip: "'睁大眼睛·不相信' (wide eyes, disbelief) is a typical expression of surprise (吃惊).",
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
          method: "Judging a character's personality — based on their actions",
          steps: [
            "Even during a race, saying '我背你过河' and putting '友情第一' shows a caring and helpful heart.",
            "This connects to '乐于助人 (happy to help others)' at the end of the passage.",
            "→ (2) 热心.",
          ],
          tip: "'乐于助人' = being warm-hearted and helpful. The evidence is choosing friendship over winning the competition.",
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
      method: "Learn the Pinyin and count the number of strokes.",
      steps: ["虎 = hǔ (3rd tone).", "Total stroke count: 8 strokes."],
      tip: "'虎' from 老虎 (tiger) has 8 strokes.",
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
      method: "Learn the Pinyin and count the number of strokes.",
      steps: ["腿 = tuǐ (3rd tone).", "Total stroke count: 13 strokes."],
      tip: "'腿' (leg) uses the '月(肉)' radical and has 13 strokes.",
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
      method: "Pinyin + counting the number of strokes",
      steps: ["传 = chuán (2nd tone).", "Total stroke count: 6 strokes."],
      tip: "传 (meaning: to pass on/transmit) uses the '亻(person)' radical, 6 strokes.",
    },
  },
];

export default wa3_chijstnicholas_rev4_2025;
