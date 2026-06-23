// src/data/p3/chinese/papers/eoy_nanyang_higher_paper2_2025.ts
// 南洋小学 (Nanyang Primary School) - P3 Higher Chinese Language - 2025 EOY Paper 2
// Source: P3_Chinese_EOY.pdf (pages 199-214)
// Paper 1 (Composition) is excluded per spec.

import type { EOYQuestion } from "./eoy_nanhua_higher_paper2_2025";

export const eoyNanyangHigherPaper2_2025: EOYQuestion[] = [
  // ===================== 一、辨字测验 (BianZi) Q1-Q5 =====================
  {
    id: "p3_zh_eoy_ny_001",
    topic: "BianZi",
    difficulty: "core",
    instruction: "读句子，选出正确的汉字，把代表它的号码写在括号里。",
    q: "弟弟喜欢（①眼 ②根 ③跟）哥哥玩游戏。",
    options: ["眼", "根", "跟"],
    answer: 3,
    pinyin: "gēn",
    meaning: "with, to follow (跟……玩 = to play with...)",
    solution: {
      method: "In '喜欢____哥哥玩游戏', choose the character that completes the meaning 'to play games together with older brother'.",
      steps: [
        "'____哥哥玩游戏' should mean 'older brother ____ play games'.",
        "①眼 (yǎn, eye) and ②根 (gēn, root) both do not mean 'together'.",
        "If we put in ③跟 (gēn, together with / to follow), it becomes '跟哥哥玩游戏 (to play games together with older brother)', which matches the meaning. So the answer is ③ 跟.",
      ],
      tip: "跟 (gēn) can be used as a preposition meaning 'together with', or as a verb meaning 'to follow'. 跟, 根, and 眼 sound similar, so you need to tell them apart by their shape (足 radical = 跟, 木 radical = 根, 目 radical = 眼).",
    },
  },
  {
    id: "p3_zh_eoy_ny_002",
    topic: "BianZi",
    difficulty: "core",
    instruction: "读句子，选出正确的汉字，把代表它的号码写在括号里。",
    q: "老师让我们把画（①贴 ②站 ③钻）在墙上。",
    options: ["贴", "站", "钻"],
    answer: 1,
    pinyin: "tiē",
    meaning: "to paste, to stick",
    solution: {
      method: "In '把画____在墙上 (to ____ the picture on the wall)', choose the verb that describes the action of putting a picture on a wall.",
      steps: [
        "'把画____在墙上' means 'to ____ the picture on the wall'.",
        "②站 (zhàn, to stand) and ③钻 (zuān, to drill / to dig into) are not related to fixing a picture onto a wall.",
        "①贴 (tiē, to stick / to paste) fits naturally in '贴在墙上 (to stick onto the wall)', so the answer is ① 贴.",
      ],
      tip: "贴 (tiē) means 'to stick' or 'to paste'. It is often used in phrases like 贴海报 (to put up a poster) and 贴邮票 (to stick a stamp).",
    },
  },
  {
    id: "p3_zh_eoy_ny_003",
    topic: "BianZi",
    difficulty: "core",
    instruction: "读句子，选出正确的汉字，把代表它的号码写在括号里。",
    q: "妈妈每天都会给院子里的几（①盆 ②盖 ③盒）花浇水。",
    options: ["盆", "盖", "盒"],
    answer: 1,
    pinyin: "pén",
    meaning: "pot, basin (measure word for potted plants)",
    solution: {
      method: "In '几____花 (a few ____ of flowers)', choose the measure word (classifier) that is suitable for counting pots of flowers.",
      steps: [
        "'给院子里的几____花浇水' means 'to water a few ____ of flowers in the garden'.",
        "②盖 (gài, lid) and ③盒 (hé, box) are not used as measure words for pots of flowers.",
        "①盆 (pén, flowerpot / basin) is used as a measure word for plants grown in pots, giving us '几盆花 (a few pots of flowers)', so the answer is ① 盆.",
      ],
      tip: "盆 (pén) is a measure word for things in a pot or basin shape. For example: 一盆花 (one pot of flowers), 一盆水 (one basin of water).",
    },
  },
  {
    id: "p3_zh_eoy_ny_004",
    topic: "BianZi",
    difficulty: "core",
    instruction: "读句子，选出正确的汉字，把代表它的号码写在括号里。",
    q: "张老师在儿（①同 ②童 ③桶）节那天为我们唱了一首歌。",
    options: ["同", "童", "桶"],
    answer: 2,
    pinyin: "tóng",
    meaning: "child (儿童节 = Children's Day)",
    solution: {
      method: "Find the character that combines with '儿____节' to form '儿童节' (Children's Day).",
      steps: [
        "'张老师在儿____节那天' means 'Teacher Zhang on Children's Day'.",
        "①同 (tóng, same) and ③桶 (tǒng, bucket) do not form real words like '儿同节' or '儿桶节'.",
        "Putting in ②童 (tóng, child) gives us '儿童节' (Children's Day), which is the correct word. So the answer is ②童.",
      ],
      tip: "童 (tóng) means 'child' and is used in words like 儿童 (children), 童话 (fairy tale), and 童年 (childhood). 同 (tóng) sounds the same but means 'same' or 'together'.",
    },
  },
  {
    id: "p3_zh_eoy_ny_005",
    topic: "BianZi",
    difficulty: "stretch",
    instruction: "读句子，选出正确的汉字，把代表它的号码写在括号里。",
    q: "小明（①像 ②响 ③想）一阵风一样冲过来，把小华撞倒了。",
    options: ["像", "响", "想"],
    answer: 1,
    pinyin: "xiàng",
    meaning: "to be like, as if (像……一样 = just like ...)",
    solution: {
      method: "In '____一阵风一样冲过来' (came rushing like a gust of wind), find the character that shows a comparison meaning 'like' or 'as'.",
      steps: [
        "'____一阵风一样冲过来' means 'came rushing ____a gust of wind'.",
        "②响 (xiǎng, to make a sound) and ③想 (xiǎng, to think) do not carry the meaning of comparison.",
        "Putting in ①像 (xiàng, to be like) gives us '像一阵风一样' (like a gust of wind), which matches the meaning in the sentence. So the answer is ①像.",
      ],
      tip: "'像……一样' is a set phrase meaning 'like' or 'as'. 想 (xiǎng, to think) and 像 (xiàng, to be like) sound similar, but you can tell them apart by their radicals (心 vs 人).",
    },
  },

  // ===================== 二、填写字词 (PinYin) Q6-Q9 =====================
  {
    id: "p3_zh_eoy_ny_006",
    topic: "PinYin",
    difficulty: "foundation",
    instruction: "根据汉语拼音把正确的字词写在格子里。",
    q: "这道数学题很 [ róng yì ]，我一下子就做完了。",
    answer: "容易",
    pinyin: "róng yì",
    meaning: "easy",
    solution: {
      method: "This question asks you to write the correct Chinese character (漢字) for the given Hanyu Pinyin (汉语拼音). Use both the pinyin and the context of the sentence to find the right word.",
      steps: [
        "Think of a word pronounced 'róng yì' that fits the sentence: 'This maths question is very ____, so I finished it right away'.",
        "'róng yì' matches the word '容易', which means 'easy'.",
        "Write '容易' correctly. Remember the stroke order and radicals for both 容 (róng) and 易 (yì).",
      ],
      tip: "The opposite of '容易' (easy) is '困难' or '难' (difficult). Try to learn them together!",
    },
  },
  {
    id: "p3_zh_eoy_ny_007",
    topic: "PinYin",
    difficulty: "core",
    instruction: "根据汉语拼音把正确的字词写在格子里。",
    q: "课室里的垂圾没清理，变得又 [zāng] 又 [chòu]。",
    answer: "脏 / 臭",
    pinyin: "zāng / chòu",
    meaning: "dirty / smelly",
    solution: {
      method: "The pattern '又____又____' is used to list two characteristics at the same time. Write the Chinese characters that match the pinyin given in each blank.",
      steps: [
        "The first blank 'zāng' matches the character '脏', which means 'dirty'.",
        "The second blank 'chòu' matches the character '臭', which means 'smelly'.",
        "So the completed phrase is '又脏又臭', meaning 'dirty and smelly'. This matches the context that the rubbish was not cleared, making the place dirty and smelly.",
      ],
      tip: "The pattern '又A又B' is used to show that something has two qualities or states at the same time. Examples: 又高又大 (tall and big), 又脏又臭 (dirty and smelly).",
    },
  },
  {
    id: "p3_zh_eoy_ny_008",
    topic: "PinYin",
    difficulty: "core",
    instruction: "根据汉语拼音把正确的字词写在格子里。",
    q: "每天晚上，爷爷都会到公园里 [sàn] [bù]。",
    answer: "散步",
    pinyin: "sàn bù",
    meaning: "to take a walk, to stroll",
    solution: {
      method: "Think of the Chinese characters that match the pinyin 'sàn bù', and check if it fits the context: 'Every evening, Grandpa ____s in the park'.",
      steps: [
        "'每天晚上，爷爷都会到公园里____' means 'Every evening, Grandpa ____s in the park'.",
        "The pinyin 'sàn bù' matches the characters '散步', which means 'to take a walk'.",
        "Taking a walk is a natural daily activity in the park, so '散步' is the correct answer.",
      ],
      tip: "'散 (sàn)' means 'to stroll/wander' and '步 (bù)' means 'step/walk'. Pay attention to the radicals of both characters (攴 and 止) and practise writing them carefully.",
    },
  },
  {
    id: "p3_zh_eoy_ny_009",
    topic: "PinYin",
    difficulty: "core",
    instruction: "根据汉语拼音把正确的字词写在格子里。",
    q: "下课前，老师让我们玩了一个有趣的 [cāi] [mí] 游戏。",
    answer: "猜谜",
    pinyin: "cāi mí",
    meaning: "to guess riddles",
    solution: {
      method: "Think of the Chinese characters that match the pinyin 'cāi mí', and check if it fits the context: 'a fun ____ game'.",
      steps: [
        "'老师让我们玩了一个有趣的____游戏' means 'The teacher let us play a fun ____ game'.",
        "The pinyin 'cāi mí' matches the characters '猜谜', which means 'to guess riddles'.",
        "'猜谜游戏' means 'riddle-guessing game', which fits naturally in the sentence, so '猜谜' is the correct answer.",
      ],
      tip: "'猜 (cāi)' means 'to guess' and '谜 (mí)' means 'riddle'. The phrase '猜谜语' is also commonly used with the same meaning.",
    },
  },

  // ===================== 三、词语搭配 (PeiDui) Q10-Q14 =====================
  {
    id: "p3_zh_eoy_ny_set1",
    topic: "PeiDui",
    difficulty: "core",
    setLabel: "Nanyang EOY Paper 2 - 三、词语搭配",
    passage: "选出正确的答案，把代表它的号码写在括号里。",
    wordBank: ["检查", "宠物", "跑步", "保护", "废物", "散步"],
    questions: [
      {
        id: "p3_zh_eoy_ny_010",
        type: "MCQ",
        q: "Q10.（　　）利用",
        options: ["检查", "宠物", "跑步", "保护", "废物", "散步"],
        answer: 5,
        pinyin: "fèi wù",
        meaning: "waste material (废物利用 = to recycle/reuse waste)",
        solution: {
          method: "Choose the word that goes naturally with '____利用 (to make use of ____)' .",
          steps: [
            "Find the word that works as the object of 利用 (lìyòng, to use/make use of).",
            "⑤废物 (fèiwù, waste/useless things) combines with 利用 to form the natural phrase '废物利用', which means to reuse or recycle old things.",
            "Options ①检查 ②宠物 ③跑步 ④保护 and ⑥散步 do not combine naturally with 利用.",
          ],
          tip: "'废物利用' means to make use of things that are no longer needed. This phrase often appears in topics related to 环保 (protecting the environment).",
        },
      },
      {
        id: "p3_zh_eoy_ny_011",
        type: "MCQ",
        q: "Q11. 照顾（　　）",
        options: ["检查", "宠物", "跑步", "保护", "废物", "散步"],
        answer: 2,
        pinyin: "chǒng wù",
        meaning: "pet",
        solution: {
          method: "Choose the word that goes naturally with '照顾____ (to take care of ____)' .",
          steps: [
            "The object of 照顾 (zhàogù, to take care of) should be something or someone that needs looking after.",
            "②宠物 (chǒngwù, pet) combines with 照顾 to form the natural phrase '照顾宠物', which means to take care of a pet.",
            "The other words do not work naturally as the object of 照顾.",
          ],
          tip: "照顾 + person/animal (e.g. 照顾弟弟, 照顾宠物, 照顾病人) is used to mean 'to take care of someone or something'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_012",
        type: "MCQ",
        q: "Q12.（　　）试卷",
        options: ["检查", "宠物", "跑步", "保护", "废物", "散步"],
        answer: 1,
        pinyin: "jiǎn chá",
        meaning: "to check, to examine (检查试卷 = to check an exam paper)",
        solution: {
          method: "Choose the word that goes naturally with '____试卷 (to ____ the exam paper)'.",
          steps: [
            "Find the word that describes an action done to 试卷 (shìjuàn, exam paper).",
            "①检查 (jiǎnchá, to check/inspect) combines with 试卷 to form the natural phrase '检查试卷', which means to check or review the exam paper.",
            "The other words do not combine naturally with 试卷.",
          ],
          tip: "检查 + noun (e.g. 检查作业, 检查试卷, 检查身体) is used to mean 'to check or review something'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_013",
        type: "MCQ",
        q: "Q13. 练习（　　）",
        options: ["检查", "宠物", "跑步", "保护", "废物", "散步"],
        answer: 3,
        pinyin: "pǎo bù",
        meaning: "to run, running",
        solution: {
          method: "Choose the word that goes naturally with '练习____ (to practise ____)'.",
          steps: [
            "The object of 练习 (liànxí, to practise) should be an action or skill that can be practised.",
            "③ 跑步 (pǎobù, running) combines with 练习 to make '练习跑步 (to practise running)', which is a natural expression.",
            "All the other words do not fit naturally as the object of 练习.",
          ],
          tip: "练习 + action/skill (e.g. 练习跑步, 练习写字, 练习唱歌) means 'to practise ~'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_014",
        type: "MCQ",
        q: "Q14.（　　）环境",
        options: ["检查", "宠物", "跑步", "保护", "废物", "散步"],
        answer: 4,
        pinyin: "bǎo hù",
        meaning: "to protect (保护环境 = to protect the environment)",
        solution: {
          method: "Choose the word that goes naturally with '____环境 (to ____ the environment)'.",
          steps: [
            "Find the word that describes an action you can do towards 环境 (huánjìng, environment).",
            "④ 保护 (bǎohù, to protect) combines with 环境 to make '保护环境 (to protect the environment)', which is a natural expression.",
            "All the other words do not combine naturally with 环境.",
          ],
          tip: "保护 + noun (e.g. 保护环境, 保护动物, 保护自己) means 'to protect ~'.",
        },
      },
    ],
  },

  // ===================== 四、词语选择 (CiYu) Q15-Q19 =====================
  {
    id: "p3_zh_eoy_ny_set2",
    topic: "CiYu",
    difficulty: "core",
    setLabel: "Nanyang EOY Paper 2 - 四、词语选择",
    passage: "选出正确的答案，把代表它的号码写在括号里。",
    wordBank: ["愿望", "请求", "果然", "虽然", "仔细", "希望"],
    questions: [
      {
        id: "p3_zh_eoy_ny_015",
        type: "MCQ",
        q: "Q15. 小明做事（　　），很少会做错。",
        options: ["愿望", "请求", "果然", "虽然", "仔细", "希望"],
        answer: 5,
        pinyin: "zǐ xì",
        meaning: "careful, meticulous",
        solution: {
          method: "In the sentence '小明做事____，很少会做错 (Xiao Ming does things ____, and rarely makes mistakes)', find the word that explains why he rarely makes mistakes.",
          steps: [
            "Find the word that describes a suitable personality or attitude that would lead to making very few mistakes.",
            "⑤ 仔细 (zǐxì, careful/thorough) fits perfectly with the idea that 'doing things carefully leads to fewer mistakes'.",
            "① 愿望 (wish) ② 请求 (request) ③ 果然 (as expected) ④ 虽然 (although~) ⑥ 希望 (hope) do not fit as adjectives describing how to '做事 (do things)'.",
          ],
          tip: "'做事仔细' means 'to do things carefully and thoroughly', and is often used to describe someone's personality or attitude.",
        },
      },
      {
        id: "p3_zh_eoy_ny_016",
        type: "MCQ",
        q: "Q16. 妈妈答应我的（　　），带我去动物园玩。",
        options: ["愿望", "请求", "果然", "虽然", "仔细", "希望"],
        answer: 2,
        pinyin: "qǐng qiú",
        meaning: "request",
        solution: {
          method: "In the sentence 'Mum granted my ____, and took me to the zoo (妈妈答应我的____，带我去动物园玩)', we need to find the right word to use as the object of '答应 (to grant/agree to)'.",
          steps: [
            "'答应' is a verb used when someone agrees to or grants another person's 'request'.",
            "When paired with ②请求 (qǐngqiú, request), it forms the natural phrase '答应我的请求 (to grant my request)'.",
            "①愿望 (wish) might seem possible in meaning, but '答应……的请求' is a more natural and standard expression, so it is the correct answer.",
          ],
          tip: "'答应 + person + 的 + 请求/要求' is a natural expression meaning 'to grant someone's request/demand'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_017",
        type: "MCQ",
        q: "Q17.（　　）题目很难，但小华仍然努力把它做完。",
        options: ["愿望", "请求", "果然", "虽然", "仔细", "希望"],
        answer: 4,
        pinyin: "suī rán",
        meaning: "although",
        solution: {
          method: "Since '但 (but/however)' appears at the end of the sentence, the first part of the sentence needs a conjunction that shows contrast (meaning 'even though/although').",
          steps: [
            "'____题目很难，但小华仍然努力把它做完' means '____the question was difficult, Xiao Hua still tried hard and finished it'.",
            "The conjunction that pairs with '但' is ④虽然 (suīrán, although/even though). '虽然……但……' is a fixed expression used to show contrast.",
            "The other words do not pair with '但' as conjunctions.",
          ],
          tip: "'虽然……但是/但……' is a paired conjunction expression. Remember that when you see one part, the other part must come with it.",
        },
      },
      {
        id: "p3_zh_eoy_ny_018",
        type: "MCQ",
        q: "Q18. 我按照老师说的方法去做，（　　）找到了答案。",
        options: ["愿望", "请求", "果然", "虽然", "仔细", "希望"],
        answer: 3,
        pinyin: "guǒ rán",
        meaning: "as expected, sure enough",
        solution: {
          method: "We need to find a word that means something turned out 'exactly as expected' after following the method the teacher taught.",
          steps: [
            "'我按照老师说的方法去做，____找到了答案' means 'I followed the method the teacher taught, and ____ found the answer'.",
            "Since the result of following the teacher's method turned out as expected (it worked), ③果然 (guǒrán, as expected/sure enough) is the right choice.",
            "The other words are not suitable adverbs for describing a result that turned out as expected.",
          ],
          tip: "果然 is used to emphasise that a method or prediction 'actually turned out to be correct'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_019",
        type: "MCQ",
        q: "Q19. 我（　　）假期快点到来，这样就可以去海边玩了。",
        options: ["愿望", "请求", "果然", "虽然", "仔细", "希望"],
        answer: 6,
        pinyin: "xī wàng",
        meaning: "to hope, to wish",
        solution: {
          method: "In '我____假期快点到来 (I ____ for the holidays to come quickly)', choose the verb that means 'to wish/to hope'.",
          steps: [
            "'假期快点到来' is something the speaker hopes for, so the verb before it must mean 'to wish' or 'to hope'.",
            "⑥希望 (xīwàng, to hope/to wish) is used as a verb to make the natural sentence '我希望…… (I hope that…)'.",
            "①愿望 (wish/desire) is a noun and cannot be used as a verb, so it does not fit in this sentence.",
          ],
          tip: "'希望' can be used as both a verb (to hope) and a noun (hope, wish), but '愿望' can only be used as a noun. '我希望……' is a very commonly used expression.",
        },
      },
    ],
  },

  // ===================== 五、扩写句子 (JuZi) Q20-Q24 =====================
  {
    id: "p3_zh_eoy_ny_020",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的短语扩写句子。",
    q: "上课时，同学们认真听讲。（必须）",
    answer: "上课时，同学们必须认真听讲。",
    pinyin: "bì xū",
    meaning: "must, have to",
    solution: {
      method: "Insert '必须 (must/have to)' from the brackets into the sentence to make it stronger. 必须 is an adverb that is placed after the subject and before the verb.",
      steps: [
        "Original sentence: 上课时，同学们认真听讲。(During class, the students listen carefully.)",
        "Since '必须' is an adverb showing strong obligation meaning 'must', it is placed after the subject (同学们) and before the verb (认真听讲).",
        "Result: 上课时，同学们必须认真听讲。— The meaning of obligation, 'must listen carefully', has been added.",
      ],
      tip: "必须 is an adverb showing strong obligation meaning 'must/have to'. Its negative forms are '不必 (no need to)' or '不能 (must not)'.",
    },
  },
  {
    id: "p3_zh_eoy_ny_021",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的短语扩写句子。",
    q: "奶奶带我去巴刹买水果。（附近的）",
    answer: "奶奶带我去附近的巴刹买水果。",
    pinyin: "fù jìn de",
    meaning: "nearby (the ~ nearby)",
    solution: {
      method: "Insert '附近的 (nearby)' from the brackets before the noun 巴刹 to give a more specific description of the place.",
      steps: [
        "Original sentence: 奶奶带我去巴刹买水果。(Grandma takes me to the market to buy fruit.)",
        "'附近的 (nearby)' is an adjective phrase that describes a noun, so it is placed directly before the noun it describes, '巴刹 (market)'.",
        "Result: 奶奶带我去附近的巴刹买水果。— More specific information, 'the nearby market', has been added.",
      ],
      tip: "The structure '……的 + noun' creates an adjective phrase that describes a noun. The describing word is always placed directly before the noun it describes.",
    },
  },
  {
    id: "p3_zh_eoy_ny_022",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的短语扩写句子。",
    q: "老师走进来，课室安静了许多。（一下子）",
    answer: "老师走进来，课室一下子安静了许多。",
    pinyin: "yī xià zi",
    meaning: "all at once, suddenly",
    solution: {
      method: "Insert '一下子 (suddenly / in an instant)' from the brackets before the verb (安静) to show that the change happened very quickly.",
      steps: [
        "Original sentence: 老师走进来，课室安静了许多。(When the teacher walked in, the classroom became much quieter.)",
        "'一下子' is an adverb meaning 'all at once / suddenly', so it is placed after the subject (课室) and before the verb (安静).",
        "Result: 老师走进来，课室一下子安静了许多。— This now gives a more vivid picture, meaning 'the classroom suddenly became quiet in an instant.'",
      ],
      tip: "'一下子' means 'in a short time / all of a sudden'. We use it to show that a change happened very quickly.",
    },
  },
  {
    id: "p3_zh_eoy_ny_023",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的短语扩写句子。",
    q: "看到爸爸买的礼物，妹妹跳了起来。（兴奋地）",
    answer: "看到爸爸买的礼物，妹妹兴奋地跳了起来。",
    pinyin: "xīng fèn de",
    meaning: "excitedly",
    solution: {
      method: "Insert '兴奋地 (excitedly)' from the brackets before the verb (跳了起来) to describe the feeling behind the action more clearly.",
      steps: [
        "Original sentence: 看到爸爸买的礼物，妹妹跳了起来。(Seeing the gift Dad bought, younger sister jumped up.)",
        "'兴奋地' is an adverb that describes the verb (跳了起来), so it is placed directly before the verb.",
        "Result: 看到爸爸买的礼物，妹妹兴奋地跳了起来。— This adds the feeling of being 'excited' to describe how she jumped up.",
      ],
      tip: "Adjective + '地' is used to make an adverb that describes a verb. We use this to show how someone does something or what feeling they have while doing it (e.g. 兴奋地, 难过地, 大声地).",
    },
  },
  {
    id: "p3_zh_eoy_ny_024",
    topic: "JuZi",
    difficulty: "core",
    instruction: "用括号里的短语扩写句子。",
    q: "看到妈妈忙着做家务，哥哥玩起了手机游戏。（偷偷地）",
    answer: "看到妈妈忙着做家务，哥哥偷偷地玩起了手机游戏。",
    pinyin: "tōu tōu de",
    meaning: "secretly, stealthily",
    solution: {
      method: "Insert '偷偷地 (secretly)' from the brackets before the verb (玩起了) to show that the action was done in a sneaky way.",
      steps: [
        "Original sentence: 看到妈妈忙着做家务，哥哥玩起了手机游戏。(Seeing Mum busy with housework, older brother started playing mobile games.)",
        "'偷偷地' is an adverb that describes the verb (玩起了), so it is placed directly before the verb.",
        "Result: 看到妈妈忙着做家务，哥哥偷偷地玩起了手机游戏。— This adds the idea that older brother played the game secretly without Mum knowing.",
      ],
      tip: "'偷偷地' is used when someone does something without others knowing. It is mostly used to describe actions that are naughty or mischievous.",
    },
  },

  // ===================== 六、短文填空 (TianKong) Q25-Q29 =====================
  {
    id: "p3_zh_eoy_ny_set3",
    topic: "TianKong",
    difficulty: "stretch",
    setLabel: "Nanyang EOY Paper 2 - 六、短文填空",
    passage:
      "小安一家人喜欢吃自助餐。\n这天，爸爸、妈妈和小安来到一家餐馆，兴高采烈地选自己喜欢的食物。\n小安不停地拿菜，Q25拿了好多食物。小安看到一道新菜，又拿了一大盘。可是，吃了一口，他发现不合口味，就不吃了。爸爸妈妈Q26他不要拿那么多食物，但是小安不听。\n爸爸拿出钱包，Q27付钱时，桌上还有好多没吃完的食物。服务生过来称了食物的重量，并生气地对他们说，为了让人们懂得爱惜食物，没吃完的食物都要按重量付钱。\n小安听了，感到十分Q28。他决定以后要更爱惜食物，吃多少就拿多少，不再Q29。",
    wordBank: ["告诉", "浪费", "轻手轻脚", "准备", "难为情", "不知不觉"],
    questions: [
      {
        id: "p3_zh_eoy_ny_025",
        type: "MCQ",
        q: "小安不停地拿菜，Q25拿了好多食物。",
        options: ["告诉", "浪费", "轻手轻脚", "准备", "难为情", "不知不觉"],
        answer: 6,
        pinyin: "bù zhī bù jué",
        meaning: "unconsciously, without realizing it",
        solution: {
          method: "We are looking for an expression that means Xiao An kept picking up food and 'without realising it' ended up taking a lot.",
          steps: [
            "'小安不停地拿菜，Q25拿了好多食物' = 'Xiao An kept picking up food, and Q25 took a lot of food.'",
            "It makes sense that because she kept picking up food, the amount grew without her noticing.",
            "⑥不知不觉 (bùzhī bùjué, 'without realising / before one knows it') fits this meaning best.",
          ],
          tip: "'不知不觉' is used when, as time passes or an action continues, a result happens without the person being aware of it.",
        },
      },
      {
        id: "p3_zh_eoy_ny_026",
        type: "MCQ",
        q: "爸爸妈妈Q26他不要拿那么多食物，但是小安不听。",
        options: ["告诉", "浪费", "轻手轻脚", "准备", "难为情", "不知不觉"],
        answer: 1,
        pinyin: "gào sù",
        meaning: "to tell, to inform",
        solution: {
          method: "We are looking for a verb that means the parents 'told' the child not to take too much food.",
          steps: [
            "'爸爸妈妈Q26他不要拿那么多食物' = 'Mum and Dad Q26 him not to take so much food.'",
            "Because the sentence continues with '不要……(do not…)', which is a command or advice, we need a verb meaning 'to tell / to inform'.",
            "①告诉 (gàosù, 'to tell / to inform') creates the natural structure '告诉他不要…… (tell him not to…)'.",
          ],
          tip: "'告诉 + person + (不要) action' is a commonly used pattern meaning 'to tell someone (not to) do something'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_027",
        type: "MCQ",
        q: "爸爸拿出钱包，Q27付钱时，桌上还有好多没吃完的食物。",
        options: ["告诉", "浪费", "轻手轻脚", "准备", "难为情", "不知不觉"],
        answer: 4,
        pinyin: "zhǔn bèi",
        meaning: "to prepare, to be about to (do something)",
        solution: {
          method: "We are looking for a word that describes Dad's action of taking out his wallet, getting ready to pay.",
          steps: [
            "'爸爸拿出钱包，Q27付钱时' = 'Dad took out his wallet, and when he Q27 to pay.'",
            "Since '拿出钱包 (take out the wallet)' is the action of getting ready to pay, ④准备 (zhǔnbèi, 'to prepare / to get ready') fits most naturally.",
            "'准备付钱 (get ready to pay / be about to pay)' matches the context of the sentence.",
          ],
          tip: "'准备 + action' means 'to prepare to do something' or 'to be about to do something'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_028",
        type: "MCQ",
        q: "小安听了，感到十分Q28。",
        options: ["告诉", "浪费", "轻手轻脚", "准备", "难为情", "不知不觉"],
        answer: 5,
        pinyin: "nán wéi qíng",
        meaning: "embarrassed, ashamed",
        solution: {
          method: "Find the adjective that describes how Xiao An felt after being scolded by the staff member.",
          steps: [
            "'小安听了，感到十分Q28' means 'After hearing that, Xiao An felt very Q28.'",
            "Since Xiao An was told off by the staff for wasting food, it is natural that she would feel embarrassed and uncomfortable.",
            "⑤难为情 (nánwéiqíng, embarrassed/uncomfortable) creates the natural phrase '感到十分难为情' meaning 'felt very embarrassed'.",
          ],
          tip: "'感到 + emotion adjective' means 'to feel a certain emotion'. 难为情 describes the feeling of embarrassment from doing something wrong or making a mistake.",
        },
      },
      {
        id: "p3_zh_eoy_ny_029",
        type: "MCQ",
        q: "他决定以后要更爱惜食物，吃多少就拿多少，不再Q29。",
        options: ["告诉", "浪费", "轻手轻脚", "准备", "难为情", "不知不觉"],
        answer: 2,
        pinyin: "làng fèi",
        meaning: "to waste",
        solution: {
          method: "From the promise 'to treasure food more, take only what you can eat, and never ____ again', find the verb that means 'to waste'.",
          steps: [
            "'不再Q29' means 'will not Q29 anymore'.",
            "The earlier sentences say '更爱惜食物 (treasure food more)' and '吃多少就拿多少 (take only what you can eat)', so the promise is about 'not wasting food'.",
            "②浪费 (làngfèi, to waste) creates the natural phrase '不再浪费' meaning 'will not waste anymore'.",
          ],
          tip: "'爱惜 (to treasure)' and '浪费 (to waste)' are antonyms (opposites). Remembering them together will help you answer context questions like this more easily.",
        },
      },
    ],
  },

  // ===================== 七、阅读理解一 (YueReadMCQ) Q30-Q32 =====================
  {
    id: "p3_zh_eoy_ny_set4",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Nanyang EOY Paper 2 - 七、阅读理解一",
    passage:
      "一个周末，我和姐姐去逛了本地最大的夜市。\n那天晚上，夜市非常热闹，人来人往，到处都是香喷喷的小吃和各种各样的商品。有的摊位在卖手工艺品，有的在卖玩具，还有不少人在排队买烤肉串和炸鸡翅。我买了棉花糖和鸡蛋仔，一边吃一边看着各种摊位。姐姐选了一些小礼物，想送给好友。\n我们逛得太开心，没注意时间。正当我们要走时，天空突然下起了大雨。我们没有带伞，周围也没有躲雨的地方，我们又冷又着急。姐姐拿出手机想叫车回家，却发现手机没电了。\n就在这时，一位阿姨走了过来。她看到我们淋湿了，马上把自己的伞递给我们，说：\u201c你们用吧，我家就在前面。\u201d我们连忙道谢，她笑着说：\u201c小事，不用客气。\u201d\n这件事深深感动了我。我相信，世界上和那位阿姨一样的好心人一定还有很多很多！",
    questions: [
      {
        id: "p3_zh_eoy_ny_030",
        type: "MCQ",
        q: "在夜市里，\u201c我\u201d买了什么？",
        options: ["玩具和小礼物。", "烤肉串和炸鸡翅。", "棉花糖和鸡蛋仔。"],
        answer: 3,
        pinyin: "mián huā táng",
        meaning: "cotton candy",
        solution: {
          method: "Find the part of the passage where '我 (I)' directly mentions what was bought.",
          steps: [
            "Passage: '我买了棉花糖和鸡蛋仔，一边吃一边看着各种摊位。'",
            "Here, '我' bought '棉花糖 (candy floss)' and '鸡蛋仔 (egg waffles)'.",
            "'玩具和小礼物 (toys and small gifts)' were bought by the older sister (姐姐), and '烤肉串和炸鸡翅 (grilled meat skewers and fried chicken wings)' were what others queued up to buy. So the correct answer is ③.",
          ],
          tip: "It is important to read carefully and keep track of what each character does or buys — be careful not to mix up '我' and '姐姐'.",
        },
      },
      {
        id: "p3_zh_eoy_ny_031",
        type: "MCQ",
        q: "以下哪一个是\u201c我们\u201d回不了家的原因？",
        options: [
          "夜市太大，\u201c我们\u201d迷路了。",
          "\u201c我们\u201d没有手机，不能叫车回家。",
          "天空下起了大雨，\u201c我们\u201d没带伞。",
        ],
        answer: 3,
        pinyin: "huí bù liǎo jiā",
        meaning: "unable to go home",
        solution: {
          method: "Find the part in the passage that explains the situation where they could not go home and the reason why.",
          steps: [
            "Passage: '正当我们要走时，天空突然下起了大雨。我们没有带伞，周围也没有躲雨的地方，我们又冷又着急。'",
            "A sudden heavy rain fell, and because they had no umbrella and nowhere to shelter from the rain, this is the direct cause of why it became difficult for them to go home.",
            "Option ① is wrong because there is nothing in the passage about getting lost. Option ② is not accurate because they did have a mobile phone, but its battery was dead — so saying 'they had no mobile phone' is incorrect. Therefore, the correct answer is ③.",
          ],
          tip: "For questions asking about a 'cause', it is effective to look just before or near the result (回不了家) to find the direct reason.",
        },
      },
      {
        id: "p3_zh_eoy_ny_032",
        type: "MCQ",
        q: "这件事让\u201c我\u201d有什么感受？",
        options: [
          "夜市的食物很好吃。",
          "世界上有很多好心人。",
          "碰到问题要请求别人帮忙。",
        ],
        answer: 2,
        pinyin: "gǎn shòu",
        meaning: "feeling, impression",
        solution: {
          method: "Find the part in the last sentence of the passage where 'I (我)' directly expresses what they felt or their thoughts after this experience.",
          steps: [
            "Last sentence of the passage: '这件事深深感动了我。我相信，世界上和那位阿姨一样的好心人一定还有很多很多！'",
            "Here, 'I' was deeply moved by the kind aunty's actions and came to believe that 'there must be many more good people like her in the world'.",
            "This matches exactly with option ② '世界上有很多好心人 (There are many kind-hearted people in the world)'.",
          ],
          tip: "The last paragraph or sentence of a passage usually contains the 'main idea' or 'lesson / feelings'. So for questions asking about '感受 (feelings)', always read the last part carefully.",
        },
      },
    ],
  },

  // ===================== 八、阅读理解二 (YueReadOpen) Q33-Q37 =====================
  {
    id: "p3_zh_eoy_ny_set5",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Nanyang EOY Paper 2 - 八、理解问答",
    passage:
      "一天下午，哥哥在家里写作业。弟弟想找他玩玩具车时，不小心把哥哥的新铅笔碰掉在地上。哥哥捡起笔，发现笔断了，他生气地拍了一下桌子，大声说：\u201c你弄坏了我的笔！\u201d\n弟弟吓了一跳，小声说：\u201c对不起……\u201d哥哥却气呼呼地转过头，不理他。弟弟拿着玩具车，在哥哥旁边转来转去，不肯离开，想要哥哥和他一起玩。可哥哥却好像没看见他一样。\n晚饭后，妈妈摸着哥哥的头，温和地说：\u201c上次你不小心弄坏弟弟的玩具车，他是怎么做的？\u201d哥哥开始回想起那天的事，弟弟不但没生气，还拿了另外一个给自己玩。可是今天，自己却没有原谅弟弟。\n想到这里，哥哥的脸红了。他走到弟弟身边，小声说：\u201c对不起，我不应该那么大声地骂你。\u201d弟弟听了，笑着说：\u201c没关系，我们还是好兄弟！\u201d",
    questions: [
      {
        id: "p3_zh_eoy_ny_033",
        type: "OpenEnded",
        q: "文中表示\u201c对别人做错事情后不再生气\u201d的词语是：______________（2分）",
        answer: "原谅",
        pinyin: "yuán liàng",
        meaning: "to forgive",
        solution: {
          method: "Find the word in the passage that matches the given meaning: 'to no longer be angry about a mistake someone else has made'.",
          steps: [
            "The word that means 'to no longer blame or be angry at someone for their mistake' is 'forgive'.",
            "In the passage, the sentence '可是今天，自己却没有原谅弟弟。' contains the word '原谅 (yuánliàng, to forgive)'.",
            "Therefore, the correct answer is '原谅'.",
          ],
          tip: "This type of question is a vocabulary comprehension question where you find the word in the passage that exactly matches the given definition. Knowing the meaning of words accurately will help you find the answer quickly.",
        },
      },
      {
        id: "p3_zh_eoy_ny_034",
        type: "OpenEnded",
        q: "哥哥的新铅笔是怎样断的？（1分）",
        answer: "弟弟想找哥哥玩玩具车时，不小心把哥哥的新铅笔碰掉在地上，铅笔就断了。",
        pinyin: "duàn",
        meaning: "to break, broken",
        solution: {
          method: "Find the part in the first paragraph of the passage that explains how and why the pencil broke.",
          steps: [
            "Passage: '弟弟想找他玩玩具车时，不小心把哥哥的新铅笔碰掉在地上。哥哥捡起笔，发现笔断了……'",
            "The younger brother accidentally knocked the older brother's new pencil onto the floor while trying to get him to play with toy cars together, and as a result, the pencil broke.",
            "Summarise this sequence of events and answer with a sentence like: '弟弟不小心把哥哥的新铅笔碰掉在地上弄断了。'",
          ],
          tip: "For '怎样……的?' questions, the key is to find the sequence of events or cause that led to the result (the pencil breaking) in the passage, and organise them in order.",
        },
      },
      {
        id: "p3_zh_eoy_ny_035",
        type: "OpenEnded",
        q: "从哪里可以看出弟弟很想要哥哥和他一起玩玩具车？（2分）",
        answer:
          "弟弟拿着玩具车，在哥哥旁边转来转去，不肯离开，从这里可以看出他很想要哥哥和他一起玩玩具车。",
        pinyin: "zhuàn lái zhuàn qù",
        meaning: "to wander around, to circle around",
        solution: {
          method: "This is a 'How do we know?' question, so find and quote the sentence in the passage that directly describes the younger brother's actions.",
          steps: [
            "Passage: '弟弟拿着玩具车，在哥哥旁边转来转去，不肯离开，想要哥哥和他一起玩。'",
            "This sentence directly describes how the younger brother was walking around the older brother with a toy car and refused to leave.",
            "Use this sentence to form your answer using the structure '从……可以看出……'.",
          ],
          tip: "For '从哪里可以看出……?' questions, you can often find the answer by directly quoting the sentence in the passage that describes what the character did or said.",
        },
      },
      {
        id: "p3_zh_eoy_ny_036",
        type: "OpenEnded",
        q:
          "根据短文内容，完成下面的表格：（2分）\n\n| | 弟弟的反应 |\n| 哥哥骂弟弟时 | __________________ |\n| 哥哥向弟弟道歉时 | __________________ |",
        answer:
          "哥哥骂弟弟时 → 弟弟吓了一跳，小声说\u201c对不起\u201d。\n哥哥向弟弟道歉时 → 弟弟笑着说\u201c没关系，我们还是好兄弟！\u201d",
        pinyin: "fǎn yìng",
        meaning: "reaction, response",
        solution: {
          method: "Find the younger brother's reaction in two different situations in the passage — when the older brother scolded him, and when the older brother apologised to him — and fill in the table.",
          steps: [
            "① '哥哥骂弟弟时 (When the older brother scolded the younger brother)': Find the sentence '弟弟吓了一跳，小声说：\"对不起……\"' in the passage → The younger brother was shocked and said \"对不起\" in a soft voice.",
            "② '哥哥向弟弟道歉时 (When the older brother apologised to the younger brother)': Find the sentence '弟弟听了，笑着说：\"没关系，我们还是好兄弟！\"' in the passage → The younger brother smiled and said \"没关系, we are still good brothers!\"",
            "Fill in each box of the table with the two different reactions.",
          ],
          tip: "Table completion questions test your ability to find and sort information from different parts of the passage based on situation or time. Start by finding the sentence that matches each situation, then organise your answers.",
        },
      },
      {
        id: "p3_zh_eoy_ny_037",
        type: "OpenEnded",
        q: "为什么哥哥的脸红了？（2分）",
        answer:
          "因为哥哥想起上次弟弟弄坏他的玩具车时，弟弟不但没生气，还拿了另外一个给自己玩，可是自己今天却大声地骂弟弟，所以感到羞愧，脸红了。",
        pinyin: "liǎn hóng",
        meaning: "to blush, face turning red (with embarrassment)",
        solution: {
          method: "The last part of the passage explains the *reason* why the older brother's face turned red, by comparing two events (past and present).",
          steps: [
            "In the passage: Mum asked the older brother, 'When your younger brother broke your toy in the past, what did he do?' The older brother then remembered that at that time, his younger brother did not get angry — instead, he gave him another toy.",
            "However, today the older brother got angry at his younger brother and scolded him loudly. When he compared his younger brother's kind behaviour in the past with his own behaviour today, he felt ashamed.",
            "Combine both comparisons to answer in the format: '因为……可是……所以脸红了' (Because… but… therefore his face turned red).",
          ],
          tip: "When answering a '为什么……?' (Why…?) question, if the passage compares or contrasts more than one event, you must include both events and explain them using cause and effect (因为...所以...) to give a complete answer.",
        },
      },
    ],
  },
];

export default eoyNanyangHigherPaper2_2025;
