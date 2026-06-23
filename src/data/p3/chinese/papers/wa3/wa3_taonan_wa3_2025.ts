// ============================================================================
// Tao Nan Primary School (道南学校)
// P3 Higher Chinese (高级华文) — 2025 补充作业（三）/ Weighted Assessment 3
// 第五课至第六课
// Source: sgexam.com P3 Chinese WA3 compilation (answer key p95-96)
// Total marks: 45
//
// NOTE: 辨字/拼音/词语选择/改写/阅读MCQ/理解问答 섹션은 2024 补充(三)와 문항이
//   동일하지만(자립형 파일로 전부 수록), 词语搭配(Q12-16)·短文填空(Q21-24)는
//   2025 전용 문항으로 다름. 정답키(p95-96)와 전 문항 일치 확인됨.
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_taonan_wa3_2025: Question[] = [
  // ==========================================================================
  // (一) 辨字测验 BianZi — Q1-Q5 (5题5分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_001",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "我的家离学校很___，我可以走路去上学。",
    options: ["进", "金", "近", "今"],
    answer: 2, // 近
    pinyin: "jìn",
    meaning: "'近(jìn)' = near / close. 离学校很近 = very close to the school.",
    solution: {
      method: "Identifying similar-looking characters — '辶 (the walking radical)'",
      steps: [
        "Close enough to walk there means 'near' → 近.",
        "进 (to enter) · 金 (gold) · 今 (now) are not correct choices.",
      ],
      tip: "近 (near) ↔ 远 (far). 进 looks similar in shape to 近.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_002",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "上课前，我们要___备好课本和文具。",
    options: ["难", "准", "谁", "推"],
    answer: 1, // 准
    pinyin: "zhǔn bèi",
    meaning: "'准备(zhǔnbèi)' = to prepare.",
    solution: {
      method: "Recognising the word '准备'",
      steps: ["Getting 'ready' before class → 准备.", "Choose '准'."],
      tip: "The right side of 准 (准) and 难 (difficult) look similar.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_003",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "小华跑得太快，不小心___到了小明。",
    options: ["撞", "追", "跳", "跌"],
    answer: 0, // 撞
    pinyin: "zhuàng",
    meaning: "'撞(zhuàng)' = to bump into. 撞到了小明.",
    solution: {
      method: "Action verb from context",
      steps: ["Running fast and 'bumping into' someone → 撞.", "追 / 跳 / 跌 are not correct choices."],
      tip: "Bumping into a person or object → 撞到 / 撞上.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_004",
    topic: "BianZi",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "下午，爸爸带我去书___买了几本故事书。",
    options: ["尾", "屋", "居", "展"],
    answer: 3, // 展
    pinyin: "shū zhǎn",
    meaning: "'书展(shūzhǎn)' = book fair.",
    solution: {
      method: "Word recognition — an event for buying books",
      steps: ["A place where you buy storybooks → 书展 (book fair).", "Choose '展'."],
      tip: "The character '展' as seen in words like 书展 (book fair) and 画展 (art exhibition).",
    },
  },
  {
    id: "p3_zh_wa3_tnw_005",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "小安和欢欢吵架了，谁也不___谁。",
    options: ["管", "说", "听", "理"],
    answer: 3, // 理
    pinyin: "lǐ",
    meaning: "'理' = to pay attention to. 谁也不理谁 = neither acknowledges the other.",
    solution: {
      method: "Recognising the idiomatic expression '不理'",
      steps: ["After an argument, two people ignore each other → 谁也不理谁.", "Choose the character '理'."],
      tip: "'不理 (无视)' means to ignore someone / not respond to someone.",
    },
  },

  // ==========================================================================
  // (二) 汉语拼音 PinYin — Q6-Q7 (2题2分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_006",
    topic: "PinYin",
    difficulty: "core",
    instruction:
      "根据句子中划线的词语，选出正确的音节，然后把代表它的数字填写在括号里。【划线词：傍晚】",
    q: "【傍晚】，我和爸爸去海边骑脚踏车。",
    options: ["bàng wǎn", "bàng wǎng", "páng wǎn", "páng wǎng"],
    answer: 0, // bàng wǎn
    pinyin: "bàng wǎn",
    meaning: "'傍晚(bàngwǎn)' = dusk.",
    solution: {
      method: "Identifying the Initial (b) and Final (an) of a syllable",
      steps: ["傍 is pronounced bàng, not páng.", "晚 is pronounced wǎn, not wǎng."],
      tip: "The key is telling apart the Finals an and ang.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_007",
    topic: "PinYin",
    difficulty: "core",
    instruction:
      "根据句子中划线的词语，选出正确的音节，然后把代表它的数字填写在括号里。【划线词：跌倒】",
    q: "小文看到老爷爷【跌倒】了，就上前把他扶起来。",
    options: ["diē dǎo", "diē dào", "dié dǎo", "dié dào"],
    answer: 0, // diē dǎo
    pinyin: "diē dǎo",
    meaning: "'跌倒(diēdǎo)' = to fall down.",
    solution: {
      method: "Identifying the tones — 跌 (1st tone) and 倒 (3rd tone)",
      steps: ["跌 is pronounced diē (1st tone).", "倒 meaning 'to fall over' is pronounced dǎo (3rd tone)."],
      tip: "倒: when it means 'to fall over' → dǎo (3rd tone); when it means 'upside down / reverse' → dào (4th tone).",
    },
  },

  // ==========================================================================
  // (三) 词语选择 CiYu — Q8-Q11 (4题4分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_008",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "明天我们会去___新加坡动物园。",
    options: ["访问", "参观", "拜访", "看望"],
    answer: 1, // 参观
    pinyin: "cān guān",
    meaning: "'参观(cānguān)' = to visit (a place). 参观动物园.",
    solution: {
      method: "Telling apart verbs used for visiting a place",
      steps: ["When you go around and look at a place like a zoo → use 参观.", "訪問/拜訪/看望 (visiting a person) is not suitable here."],
      tip: "Use 參觀 for places or exhibitions; use 拜訪/看望 for visiting people.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_009",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "妹妹做错了事情，请求妈妈___她。",
    options: ["明白", "感谢", "原谅", "夸奖"],
    answer: 2, // 原谅
    pinyin: "yuán liàng",
    meaning: "'原谅(yuánliàng)' = to forgive.",
    solution: {
      method: "Match the meaning to the context.",
      steps: ["Asking for forgiveness after doing something wrong → use 原諒.", "明白/感謝/誇獎 are not suitable here."],
      tip: "When apologising and asking to be forgiven, use 請求原諒.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_010",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "妈妈觉得巴刹里卖的青菜和水果都非常___。",
    options: ["新奇", "新鲜", "清新", "清甜"],
    answer: 1, // 新鲜
    pinyin: "xīn xiān",
    meaning: "'新鲜(xīnxiān)' = fresh (food).",
    solution: {
      method: "Distinguishing similar words — vegetables and fruits.",
      steps: ["When vegetables and fruits are fresh → use 新鮮.", "新奇/清新 (for air)/清甜 are not suitable here."],
      tip: "Fresh food = 新鮮; fresh air (refreshing) = 清新.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_011",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "明天是奶奶的生日，我想送她一份___的礼物。",
    options: ["特色", "特意", "特地", "特别"],
    answer: 3, // 特别
    pinyin: "tè bié",
    meaning: "'特别(tèbié)' = special. 一份特别的礼物.",
    solution: {
      method: "'一份___的禮物' — this blank is the adjective position.",
      steps: ["The adjective that describes the gift → use 特別.", "特意/特地 (adverbs) and 特色 (noun) are not suitable here."],
      tip: "特意/特地 are adverbs that come before a verb.",
    },
  },

  // ==========================================================================
  // (四) 词语搭配 PeiDui — Q12-Q16 (5题5分)  ★2025 전용 문항★
  // 词语库: 1参加 2时间 3打扫 4努力 5品尝 6表演
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_012",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1参加 2时间 3打扫 4努力 5品尝 6表演】",
    q: "（___）美食",
    answer: 4, // 5品尝 → 品尝美食
    pinyin: "pǐn cháng měi shí",
    meaning: "'品尝美食' = to taste/savour delicious food.",
    solution: {
      method: "Verb and noun collocation (matching verbs with the correct nouns).",
      steps: ["The action before '美食 (delicious food)' → 'to taste'.", "'品尝' matches → 品尝美食 (5)."],
      tip: "To 'savour' delicious food → 品尝.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_013",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1参加 2时间 3打扫 4努力 5品尝 6表演】",
    q: "抓紧（___）",
    answer: 1, // 2时间 → 抓紧时间
    pinyin: "zhuā jǐn shí jiān",
    meaning: "'抓紧时间' = to make full use of time / hurry.",
    solution: {
      method: "Verb + Noun collocation (fixed expression)",
      steps: ["What comes after '抓紧 (to hold tight)' → 时间 (time).", "'抓紧时间' is a fixed expression (2)."],
      tip: "'To save time and hurry' → 抓紧时间.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_014",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1参加 2时间 3打扫 4努力 5品尝 6表演】",
    q: "（___）课室",
    answer: 2, // 3打扫 → 打扫课室
    pinyin: "dǎ sǎo kè shì",
    meaning: "'打扫课室' = to clean the classroom.",
    solution: {
      method: "Verb + Place collocation",
      steps: ["The action before '课室 (classroom)' → 'to clean'.", "'打扫' matches → 打扫课室 (3)."],
      tip: "To clean a room or classroom → 打扫.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_015",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1参加 2时间 3打扫 4努力 5品尝 6表演】",
    q: "观看（___）",
    answer: 5, // 6表演 → 观看表演
    pinyin: "guān kàn biǎo yǎn",
    meaning: "'观看表演' = to watch a performance.",
    solution: {
      method: "Verb + Noun collocation",
      steps: ["What comes after '观看 (to watch/view)' → a performance.", "'表演' matches → 观看表演 (6)."],
      tip: "To watch a performance or match → 观看.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_016",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1参加 2时间 3打扫 4努力 5品尝 6表演】",
    q: "（___）学习",
    answer: 3, // 4努力 → 努力学习
    pinyin: "nǔ lì xué xí",
    meaning: "'努力学习' = to study hard.",
    solution: {
      method: "Adverb + Verb Agreement",
      steps: ["Before '学习 (to study)' → use '열심히 (hard/diligently)'.", "'努力' matches → 努力学习 (option 4).", "The remaining '参加 (1)' is an unused trap word."],
      tip: "'Study hard' → 努力学习. (参加 goes with 比赛/活动, meaning competitions or activities)",
    },
  },

  // ==========================================================================
  // (五) 改写句子 + 仿写句子 JuZi — Q17-Q20 (4题8分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_017",
    topic: "JuZi",
    difficulty: "core",
    instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。（或者）",
    q: "放学后，同学们可以去操场打球。放学后，同学们可以去图书馆看书。",
    answer: "放学后，同学们可以去操场打球或者去图书馆看书。",
    pinyin:
      "fàng xué hòu, tóng xué men kě yǐ qù cāo chǎng dǎ qiú huò zhě qù tú shū guǎn kàn shū",
    meaning: "After school, students can play ball at the field or read at the library.",
    solution: {
      method: "Choice conjunction '或者' + omitting the shared part",
      steps: ["The shared part '放学后，同学们可以' is written only once.", "The two choices are joined with '或者'."],
      tip: "Since the places and actions are different, '去…' is kept twice and connected.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_018",
    topic: "JuZi",
    difficulty: "stretch",
    instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。（连）",
    q: "哥哥打破了弟弟的杯子。哥哥一句对不起也没说。",
    answer: "哥哥打破了弟弟的杯子，连一句对不起也没说。",
    pinyin: "gē ge dǎ pò le dì di de bēi zi, lián yí jù duì bù qǐ yě méi shuō",
    meaning: "Elder brother broke the cup and didn't even say a single sorry.",
    solution: {
      method: "Emphasis pattern '连…也…'",
      steps: ["Keep the first event, and rewrite the second sentence using the '连…也…' emphasis pattern.", "Add '连' before '一句对不起也没说'."],
      tip: "'连 A 也/都 B' = not even A / even A does B.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_019",
    topic: "JuZi",
    difficulty: "core",
    instruction: "B组：根据句式，仿写句子。（除了……还）",
    q: "例：除了苹果，我还喜欢吃西瓜。请仿写一个句子。",
    answer: "除了粉红色，我还喜欢蓝色。",
    pinyin: "chú le fěn hóng sè, wǒ hái xǐ huān lán sè",
    meaning: "Besides pink, I also like blue. (Model imitating '除了……还'.)",
    solution: {
      method: "Sentence pattern imitation — '除了 A，还 B'",
      steps: ["Keep the pattern '除了…，还…'.", "Use two words from the same category (colours).", "→ 除了粉红色，我还喜欢蓝色。 (Other correct answers are possible.)"],
      tip: "For 仿写, as long as the sentence structure matches, the content is free. Use words from the same category.",
    },
  },
  {
    id: "p3_zh_wa3_tnw_020",
    topic: "JuZi",
    difficulty: "core",
    instruction: "B组：根据句式，仿写句子。（有的……有的）",
    q: "例：巴士上有很多人，有的在睡觉，有的在看书。请仿写一个句子。",
    answer: "课堂里有很多同学，有的在听课，有的在看书。",
    pinyin: "kè táng lǐ yǒu hěn duō tóng xué, yǒu de zài tīng kè, yǒu de zài kàn shū",
    meaning: "There are many students in the classroom; some are listening, some are reading. (Model imitating '有的……有的'.)",
    solution: {
      method: "Copy the sentence pattern — '有的…，有的…'",
      steps: ["Keep the pattern 'Place + 有很多…，有的在 A，有的在 B'.", "→ 课堂里…，有的在听课，有的在看书。 (Other correct answers are possible.)"],
      tip: "When different people in a group are each doing different things, use 有的…有的….",
    },
  },

  // ==========================================================================
  // (六) 短文填空 TianKong — Q21-Q24 (4题4分) — SET  ★2025 전용 문항★
  // 词语库: 1着急 2答应 3好奇 4回答 5突然 6急忙
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_set1",
    topic: "TianKong",
    difficulty: "core",
    setLabel: "Tao Nan WA3 2025 — 短文填空（鸭子骗狐狸）",
    instruction:
      "根据短文的内容，选出最适当的答案，然后把代表它的数字（1-6）填写在右边的括号里。【词语库：1着急 2答应 3好奇 4回答 5突然 6急忙】",
    passage:
      "一天鸭子在河里洗完澡后，就往村子里走去。（Q21），一只狐狸从树林里跳了出来，想要吃掉鸭子。鸭子说：“狐狸先生，您先别吃我。告诉您，我会学狐狸叫。您先听我叫几声，再吃掉我吧!”狐狸听了，觉得很（Q22），心想：怎么可能？鸭子怎么会叫得像狐狸呢？于是，狐狸（Q23）了鸭子的请求，放开了它。\n" +
      "狐狸听鸭子叫了几声后，说：“你叫得一点儿也不像，还是听听我的叫声吧。”说完，它也叫了几声。这时，村子里的狗听到狐狸的叫声，一起冲了过来。狐狸听到远处的狗叫声，（Q24）逃走了。看到狐狸逃走了，鸭子便高高兴兴地回家了。",
    questions: [
      {
        id: "p3_zh_wa3_tnw_021",
        type: "MCQ",
        q: "（Q21），一只狐狸从树林里跳了出来。",
        options: ["着急", "答应", "好奇", "回答", "突然", "急忙"],
        answer: 4, // 5突然
        pinyin: "tū rán",
        meaning: "'突然' = suddenly. 突然，一只狐狸跳了出来 = suddenly a fox jumped out.",
        solution: {
          method: "Look for clues that show something appears suddenly.",
          steps: ["The fox jumps out all of a sudden → use 突然.", "→ 5 突然."],
          tip: "When something happens without any warning → use 突然.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_022",
        type: "MCQ",
        q: "狐狸听了，觉得很（Q22），心想：怎么可能？",
        options: ["着急", "答应", "好奇", "回答", "突然", "急忙"],
        answer: 2, // 3好奇
        pinyin: "hào qí",
        meaning: "'好奇' = curious. 觉得很好奇 = felt very curious.",
        solution: {
          method: "Look for an emotion adjective and the clue '心想：怎么可能？'",
          steps: ["The duck is surprised to hear the fox's voice — this feeling of wanting to know more → use 好奇.", "'怎么可能?' is a clue that shows curiosity.", "→ 3 好奇."],
          tip: "This is a '觉得很 + emotion adjective' slot. A question like '怎么可能?' is a signal for '好奇'.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_023",
        type: "MCQ",
        q: "于是，狐狸（Q23）了鸭子的请求，放开了它。",
        options: ["着急", "答应", "好奇", "回答", "突然", "急忙"],
        answer: 1, // 2答应
        pinyin: "dā ying",
        meaning: "'答应' = to agree/consent. 答应了鸭子的请求 = agreed to the duck's request.",
        solution: {
          method: "Make sure the verb and object match correctly: '___了…的请求'",
          steps: ["To 'grant/agree to' a request (부탁) → 答应 means to say yes to someone's request.", "This has a cause-and-effect relationship with '放开了它' (let it go) that comes after.", "→ 2 答应."],
          tip: "To 'agree to' a request → 答应请求 means to accept what someone has asked for.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_024",
        type: "MCQ",
        q: "狐狸听到远处的狗叫声，（Q24）逃走了。",
        options: ["着急", "答应", "好奇", "回答", "突然", "急忙"],
        answer: 5, // 6急忙
        pinyin: "jí máng",
        meaning: "'急忙' = hurriedly. 急忙逃走了 = hurriedly fled.",
        solution: {
          method: "Adverb + Verb agreement: the adverb must match and work together with the verb it describes.",
          steps: ["Running away 'quickly' because of a dog barking → 急忙 means to do something in a hurry.", "→ 6 急忙."],
          tip: "To do something urgently/quickly → use 急忙 + verb.",
        },
      },
    ],
  },

  // ==========================================================================
  // (七) 阅读理解 YueReadMCQ — Q25-Q28 (4题8分) — SET (自私的小狗)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_set2",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Tao Nan WA3 2025 — 阅读理解（自私的小狗）",
    instruction:
      "根据短文的内容，选出最适当的答案，然后把代表它的数字（1、2、3、4）填写在右边的括号里。",
    passage:
      "树林里已经好久没下过一场雨了，连河里的水都干了，只有小狗家里的井还有水。住在小狗家对面的花猫和猴子来找小狗，求小狗给它们一点水喝。\n" +
      "可是，小狗却摇摇头，大声地说：“不可以！”说完，它就把花猫和猴子赶了出去。\n" +
      "小狗担心邻居们来偷水，便把井口用盖子盖上，再用锁头锁住，然后才安心上床睡觉。\n" +
      "夜里，小狗的家着火了。邻居们都赶来救火，可是井盖被锁住了，它们没办法打水灭火。最后，小狗的家被大火烧光了。\n" +
      "小狗红着脸对大家说：“我只为自己着想，结果害了自己，我知道错了。”",
    questions: [
      {
        id: "p3_zh_wa3_tnw_025",
        type: "MCQ",
        q: "河水干了，给大家带来什么不便？",
        options: ["小动物没水喝。", "树林里不再下雨。", "花猫不可以过河。", "小狗无法安心睡觉。"],
        answer: 0,
        pinyin: "xiǎo dòng wù méi shuǐ hē",
        meaning: "The animals had no water to drink.",
        solution: {
          method: "Inferring details: use clues in the passage to figure out information not directly stated.",
          steps: ["The river dried up, so the animals came to look for water.", "→ (1) 小动物没水喝."],
          tip: "'求小狗给水喝' (begged the dog for water) is the clue to answer this question.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_026",
        type: "MCQ",
        q: "为什么小狗家里有水喝？",
        options: ["它家里的井还有水。", "它偷了邻居家的水。", "它家对面有一条河。", "它跟猴子要了一点水。"],
        answer: 0,
        pinyin: "tā jiā lǐ de jǐng hái yǒu shuǐ",
        meaning: "Because the well at its home still had water.",
        solution: {
          method: "Finding direct information: look for the answer that is clearly stated in the passage.",
          steps: ["'只有小狗家里的井还有水'.", "→ (1)."],
          tip: "The answer can be found in '只有…还有水' (only … still had water).",
        },
      },
      {
        id: "p3_zh_wa3_tnw_027",
        type: "MCQ",
        q: "从哪里可以看出小狗不为别人着想？",
        options: ["它把邻居赶出去。", "它大声跟邻居说话。", "它不让邻居来喝水。", "它不让邻居打水灭火。"],
        answer: 2,
        pinyin: "tā bú ràng lín jū lái hē shuǐ",
        meaning: "It refused to let the neighbours drink water.",
        solution: {
          method: "Finding evidence: look for '不为别人着想' (not thinking of others) in the passage.",
          steps: ["Even when asked for water, the character refused and chased the animals away.", "→ (3) 它不让邻居来喝水."],
          tip: "Option (4) describes the resulting harm, but the key point is that the character chose on their own not to give water.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_028",
        type: "MCQ",
        q: "这个故事告诉我们什么道理？",
        options: ["做人要有礼貌。", "应该多认识新朋友。", "不要对朋友说实话。", "做人不能只为自己着想。"],
        answer: 3,
        pinyin: "zuò rén bù néng zhǐ wèi zì jǐ zháo xiǎng",
        meaning: "One should not be selfish (think only of oneself).",
        solution: {
          method: "Understanding the main idea and lesson: what is the most important message the passage is teaching us?",
          steps: ["'我只为自己着想，结果害了自己'.", "→ (4) 做人不能只为自己着想."],
          tip: "The last line with a realization = the lesson/moral of the story.",
        },
      },
    ],
  },

  // ==========================================================================
  // (八) 理解问答 YueReadOpen — Q29-Q33 (5题9分) — SET (神笔马良)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tnw_set3",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Tao Nan WA3 2025 — 理解问答（神笔马良）",
    instruction: "根据文章的内容和上下文的意思，回答下列的问题。",
    passage:
      "古时候，有个名叫马良的孩子。他很喜欢画画，可是没有钱买画笔，每天只能用树枝在地上画画。\n" +
      "一天晚上，马良躺在床上休息。突然，床前出现了一道亮光，一位白头发的老爷爷出现了，交给马良一支漂亮的笔。“这支笔送给你，它能画出不同的颜色，也能让你画的画成真。”说完，老爷爷就不见了。\n" +
      "有了这支神笔，马良就到处帮人画画。有人的羊不见了，马良就给他画一只羊。谁家没水牛帮忙种田，马良就画一头水牛送给那家人。\n" +
      "这件事很快被贪心的国王知道了。国王把马良叫来，对他说：“只要你画一座金山给我，我就让你当大官。”马良知道国王没安好心，就先画了一片大海，然后又在大海中间画了一座金山。等马良画好了船，国王就上船出发了。\n" +
      "这时，马良开始画风。风越来越大，海浪也越来越强。最后，国王的船翻了。贪心的国王再也没有回来。",
    questions: [
      {
        id: "p3_zh_wa3_tnw_029a",
        type: "OpenEnded",
        q: "a）文中指“好看”的词语是：___（1分）",
        answer: "漂亮",
        pinyin: "piào liang",
        meaning: "'漂亮' = pretty (synonym of 好看).",
        solution: {
          method: "Find a word that means the same thing (synonym).",
          steps: ["The word that matches '好看' → found in the passage as '一支漂亮的笔'.", "→ 漂亮."],
          tip: "好看 ≈ 漂亮 ≈ 美丽.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_029b",
        type: "OpenEnded",
        q: "b）文中指“动手做”的词语是：___（1分）",
        answer: "开始",
        pinyin: "kāi shǐ",
        meaning: "'开始' = to begin (matching 动手做).",
        solution: {
          method: "Find a word from the passage that matches the meaning in context.",
          steps: ["The phrase that means the same as '动手做' → found in the passage as '马良开始画风'.", "→ 开始."],
          tip: "'动手' means to start taking action → it means the same as '开始' (to begin).",
        },
      },
      {
        id: "p3_zh_wa3_tnw_030",
        type: "OpenEnded",
        q: "为什么马良用树枝在地上画画？（1分）",
        answer:
          "因为马良很喜欢画画，可是没有钱买画笔，所以他每天只能用树枝在地上画画。",
        pinyin:
          "yīn wèi mǎ liáng hěn xǐ huān huà huà, kě shì méi yǒu qián mǎi huà bǐ, suǒ yǐ tā měi tiān zhǐ néng yòng shù zhī zài dì shàng huà huà",
        meaning: "Because Ma Liang loved drawing but had no money for a brush, so he could only draw on the ground with a twig.",
        solution: {
          method: "Give a reason using the sentence pattern '因为…所以…' (Because… Therefore…).",
          steps: ["Paragraph 1: He likes it but he has no money.", "→ 因为…没钱买画笔，所以只能用树枝在地上画画."],
          tip: "Include BOTH clues: '喜欢' (likes) AND '没钱' (has no money).",
        },
      },
      {
        id: "p3_zh_wa3_tnw_031",
        type: "OpenEnded",
        q: "老爷爷送给马良的笔有什么特别的地方？（2分）",
        answer: "那支神笔能画出不同的颜色，也能让马良画的画成真。",
        pinyin:
          "nà zhī shén bǐ néng huà chū bù tóng de yán sè, yě néng ràng mǎ liáng huà de huà chéng zhēn",
        meaning: "The magic brush could draw different colours and make what Ma Liang painted come true.",
        solution: {
          method: "Describe TWO features and change the person (e.g. from 'you' to the character's name).",
          steps: ["Quote what the old man said: '能画出不同的颜色，也能让你画的画成真'.", "Change '你' (you) to '马良' (Ma Liang).", "Write down BOTH features."],
          tip: "2 marks = TWO features required.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_032",
        type: "OpenEnded",
        q: "你觉得马良是一个怎样的孩子？为什么？（2分）",
        answer:
          "我觉得马良是一个乐于助人的孩子。因为马良到处帮人画画，有人的羊不见了，马良就给他画一只羊；谁家没水牛帮忙种田，马良就画一头水牛送给那家人。",
        pinyin:
          "wǒ jué de mǎ liáng shì yí gè lè yú zhù rén de hái zi. yīn wèi mǎ liáng dào chù bāng rén huà huà…",
        meaning: "I think Ma Liang is helpful, because he drew for people everywhere—a sheep for those who lost one, a buffalo for a family with none to plough.",
        solution: {
          method: "Question type: Give your opinion AND support it with evidence from the passage — answer the two smaller parts separately.",
          steps: ["Front: 乐于助人 (Happy to help others).", "Back: Proven with examples from the passage (sheep and water buffalo)."],
          tip: "Character words must be drawn from the actions described in the passage.",
        },
      },
      {
        id: "p3_zh_wa3_tnw_033",
        type: "OpenEnded",
        q: "如果你有一支神笔，你会怎么做？请举例说明。（2分）",
        answer:
          "如果我有一支神笔，我会帮助别人。比如有人的书包不见了，我画给他一个书包。",
        pinyin:
          "rú guǒ wǒ yǒu yì zhī shén bǐ, wǒ huì bāng zhù bié rén. bǐ rú yǒu rén de shū bāo bú jiàn le, wǒ huà gěi tā yí gè shū bāo.",
        meaning: "If I had a magic brush, I would help others. For example, if someone lost their school bag, I'd draw one for them. (Open answer.)",
        solution: {
          method: "Imagination + example type (open-ended question).",
          steps: ["Start with '如果我有…，我会…' (If I have…, I will…).", "'请举例说明' → Give a specific example (such as 书包/schoolbag).", "Match the theme of the passage (乐于助人 – happy to help others)."],
          tip: "Open-ended: A correct answer just needs the sentence frame + a specific example. The model answer is only one possible answer.",
        },
      },
    ],
  },
];

export default wa3_taonan_wa3_2025;
