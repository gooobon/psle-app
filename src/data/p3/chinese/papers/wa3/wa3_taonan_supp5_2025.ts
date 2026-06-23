// ============================================================================
// Tao Nan Primary School (道南学校)
// P3 Higher Chinese (高级华文) — 2023 补充作业（五）第九课至第十课
// Source: sgexam.com P3 Chinese WA3 compilation
// Total marks: 45
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_taonan_supp5_2025: Question[] = [
  // ==========================================================================
  // (一) 辨字测验 BianZi — Q1-Q5 (5题5分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_001",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "弟弟把一片叶子当作小船放进___里。",
    options: ["可", "何", "河", "阿"],
    answer: 2, // 河
    pinyin: "hé",
    meaning: "'河(hé)' = river. 放进河里 = put it into the river.",
    solution: {
      method: "Homophones and similar-looking characters — the meaning component '氵(water)'",
      steps: [
        "We need a 'place' to float a leaf like a small boat → somewhere with water, like a river.",
        "'河' has the water radical '氵', so it means 'river'.",
        "可, 何, and 阿 have nothing to do with water, so they are not the answer.",
      ],
      tip: "Characters related to water have '氵' → for example, 河 (river), 海 (sea), 池 (pond).",
    },
  },
  {
    id: "p3_zh_wa3_tn5_002",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "我们应该爱护___境清洁，不乱丢垃圾。",
    options: ["杯", "环", "怀", "坏"],
    answer: 1, // 环 (环境)
    pinyin: "huán jìng",
    meaning: "'环境(huánjìng)' = environment. 爱护环境 = cherish/protect the environment.",
    solution: {
      method: "Identifying similar-looking characters + recognising the word '环境' (environment)",
      steps: [
        "The phrase '___境清洁' needs the word meaning 'environment' → 环境.",
        "We choose '环', which means 'ring' or 'environment'.",
        "杯 (cup), 怀 (to hold in the arms), and 坏 (bad) do not fit the meaning.",
      ],
      tip: "Be careful: 环 (ring/environment) and 坏 (bad) look very similar!",
    },
  },
  {
    id: "p3_zh_wa3_tn5_003",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "每天早上，太阳都会从东边___上来。",
    options: ["举", "走", "升", "飞"],
    answer: 2, // 升
    pinyin: "shēng",
    meaning: "'升(shēng)' = to rise. 太阳升上来 = the sun rises.",
    solution: {
      method: "Choosing the correct verb to match the context",
      steps: [
        "The action the sun does in the east → 'to rise up'.",
        "'升上来' sounds the most natural here.",
        "举 (to lift), 走 (to walk), and 飞 (to fly) do not describe what the sun does.",
      ],
      tip: "When the sun, moon, or temperature goes up, we use '升' → for example, 上升, 升起.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_004",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "爸爸先把车子___好，才来餐厅找我们。",
    options: ["位", "休", "付", "停"],
    answer: 3, // 停
    pinyin: "tíng",
    meaning: "'停(tíng)' = to stop/park. 把车子停好 = park the car (properly).",
    solution: {
      method: "Verb + Object Agreement",
      steps: [
        "The action done to a car (车子) → use '停' meaning 'to park/stop'.",
        "'把车子停好' is the correct expression.",
        "'位', '休', and '付' do not match with '车子' as action verbs.",
      ],
      tip: "'把…停好' is a 把-sentence structure meaning 'to properly settle something'.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_005",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "哥哥的水壶坏了，他把水壶___掉。",
    options: ["拔", "打", "扔", "拍"],
    answer: 2, // 扔
    pinyin: "rēng",
    meaning: "'扔(rēng)' = to throw away. 扔掉 = throw away/discard.",
    solution: {
      method: "Choosing the correct action verb based on context (verbs with the 扌 radical)",
      steps: [
        "The action of 'throwing away' a broken (坏了) water bottle → use '扔掉'.",
        "Choose '扔'.",
        "'拔' (to pull out), '打' (to hit), and '拍' (to pat) do not mean 'to throw away'.",
      ],
      tip: "'扔掉' is a result complement structure meaning 'to throw away and be rid of it'.",
    },
  },

  // ==========================================================================
  // (二) 汉语拼音 PinYin — Q6-Q7 (2题2分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_006",
    topic: "PinYin",
    difficulty: "stretch",
    instruction:
      "根据句子中划线的词语，选出正确的音节，然后把代表它的数字填写在括号里。【划线词：重量】",
    q: "哥哥想到了一个方法来称这块石头的【重量】。",
    options: ["zhòng liàng", "zhòng liáng", "chóng liáng", "chóng liàng"],
    answer: 0, // zhòng liàng
    pinyin: "zhòng liàng",
    meaning: "'重量(zhòngliàng)' = weight. 多音字 '重' here reads zhòng (heavy), not chóng (again).",
    solution: {
      method: "Identifying the correct tone for the multi-pronunciation characters (多音字) '重' and '量'",
      steps: [
        "'重' is pronounced 'zhòng' when it means 'heavy', and 'chóng' when it means 'again/repeat'.",
        "Here, it refers to 'weight' (重量), so it is pronounced 'zhòng'.",
        "'量' is pronounced 'liàng' (4th tone) when used as a noun meaning 'amount/weight'.",
        "→ zhòng liàng.",
      ],
      tip: "'重量' (weight) = zhòngliàng; '重复' (repetition) = chóngfù. The meaning determines the pronunciation.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_007",
    topic: "PinYin",
    difficulty: "stretch",
    instruction:
      "根据句子中划线的词语，选出正确的音节，然后把代表它的数字填写在括号里。【划线词：竹竿】",
    q: "妈妈习惯用【竹竿】来晾衣服。",
    options: ["zú gān", "zú gāng", "zhú gān", "zhú gāng"],
    answer: 2, // zhú gān
    pinyin: "zhú gān",
    meaning: "'竹竿(zhúgān)' = a bamboo pole.",
    solution: {
      method: "Listen carefully to the retroflex initial (zh) and the final (an)",
      steps: [
        "'竹' uses the retroflex sound zhú — not zú.",
        "'竿' is pronounced gān — not gāng. There is no nasal ending.",
        "→ zhú gān.",
      ],
      tip: "Telling apart z/zh and n/ng is the key point. 竹=zhú, 竿=gān.",
    },
  },

  // ==========================================================================
  // (三) 词语选择 CiYu — Q8-Q11 (4题4分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_008",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "只要___书上的方法去做，就能做出好吃的蛋糕。",
    options: ["听从", "按照", "答应", "想象"],
    answer: 1, // 按照
    pinyin: "àn zhào",
    meaning: "'按照(ànzhào)' = according to / in accordance with. 按照方法 = follow the method.",
    solution: {
      method: "Match the meaning of prepositional verbs",
      steps: [
        "'___ 书上的方法去做' → doing something 'according to' or 'following' a method.",
        "'按照 (according to)' pairs correctly with '方法'.",
        "听从 (follow someone's words), 答应 (agree/promise), and 想象 (imagine) do not fit here.",
      ],
      tip: "'按照' is often used in the pattern: 按照 + method / rule / order (e.g. 按照规定, 按照顺序).",
    },
  },
  {
    id: "p3_zh_wa3_tn5_009",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "刮大风的时候，院子里的小树会不停地___。",
    options: ["变化", "下沉", "摇摆", "活动"],
    answer: 2, // 摇摆
    pinyin: "yáo bǎi",
    meaning: "'摇摆(yáobǎi)' = to sway / swing back and forth.",
    solution: {
      method: "Use context clues about the situation (wind) to choose the right verb",
      steps: [
        "When a strong wind blows against a small tree, the action is swaying side to side.",
        "'摇摆' is the best fit here.",
        "变化 (change), 下沉 (sink), and 活动 (move around/exercise) do not fit this situation.",
      ],
      tip: "When something sways in wind or waves, use '摇摆' or '摇晃'.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_010",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "小丽想到一个好___，把掉进坑里的小狗救了上来。",
    options: ["说法", "看法", "办法", "做法"],
    answer: 2, // 办法
    pinyin: "bàn fǎ",
    meaning: "'办法(bànfǎ)' = method / solution to solve a problem. 好办法 = a good solution.",
    solution: {
      method: "Tell apart words with similar meanings (近义词)",
      steps: [
        "The 'way to solve' a problem (a puppy that has fallen into a pit) → 办法.",
        "说法 (opinion/expression), 看法 (viewpoint), 做法 (way of handling) have a weaker meaning of 'solution'.",
        "'想到一个好办法' is a set phrase.",
      ],
      tip: "For a 'method' to solve a problem, 办法 is the top choice — 想办法/好办法.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_011",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "姐姐想了一个晚上，终于___出国读书。",
    options: ["想象", "建议", "觉得", "决定"],
    answer: 3, // 决定
    pinyin: "jué dìng",
    meaning: "'决定(juédìng)' = to decide / make a decision.",
    solution: {
      method: "Use the clue '终于 (finally)' to work out the answer.",
      steps: [
        "After thinking all night (想了一个晚上), the action that comes after '终于 (finally)' means → 'to decide'.",
        "'决定出国读书' sounds natural.",
        "想象 (imagine), 建议 (suggest), 觉得 (feel) do not fit well after '终于' when showing a final decision.",
      ],
      tip: "After '终于', result verbs such as deciding or completing something work best.",
    },
  },

  // ==========================================================================
  // (四) 词语搭配 PeiDui — Q12-Q16 (5题5分)
  // 词语库: 1健康 2清洗 3招呼 4冲凉 5离开 6办法
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_012",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1健康 2清洗 3招呼 4冲凉 5离开 6办法】",
    q: "保持（___）",
    answer: 1, // 健康 → 保持健康
    pinyin: "bǎo chí jiàn kāng",
    meaning: "'保持健康' = to stay/keep healthy.",
    solution: {
      method: "Verb + Noun collocation",
      steps: [
        "A state noun is needed after '保持 (to keep/maintain)'.",
        "'健康 (health)' collocates correctly → 保持健康.",
      ],
      tip: "保持 is followed by a 'state' as its object, like 保持+健康/清洁/安静.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_013",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1健康 2清洗 3招呼 4冲凉 5离开 6办法】",
    q: "（___）客人",
    answer: 3, // 招呼 → 招呼客人
    pinyin: "zhāo hu kè rén",
    meaning: "'招呼客人' = to greet / attend to guests.",
    solution: {
      method: "Verb + Noun collocation",
      steps: [
        "The action that goes before '客人 (guest)' should mean 'to welcome / to receive'.",
        "'招呼' matches with → 招呼客人.",
      ],
      tip: "When greeting or serving guests: '招呼客人 / 接待客人'.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_014",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1健康 2清洗 3招呼 4冲凉 5离开 6办法】",
    q: "转身（___）",
    answer: 5, // 离开 → 转身离开
    pinyin: "zhuǎn shēn lí kāi",
    meaning: "'转身离开' = to turn around and leave.",
    solution: {
      method: "Matching verbs that go together in a sequence",
      steps: [
        "The natural action that follows '转身 (to turn around)' → 'to leave'.",
        "'离开' matches with → 转身离开.",
      ],
      tip: "'转身离开' is a fixed sequence of actions meaning 'to turn around and leave'.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_015",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1健康 2清洗 3招呼 4冲凉 5离开 6办法】",
    q: "（___）干净",
    answer: 2, // 清洗 → 清洗干净
    pinyin: "qīng xǐ gān jìng",
    meaning: "'清洗干净' = to wash clean (washed thoroughly clean).",
    solution: {
      method: "Matching Verb + Result Complement pairs",
      steps: [
        "What verb goes in the blank for '___ 干净 (to ___ cleanly)'.",
        "'清洗 (to wash)' pairs with '干净' as a Result Complement → 清洗干净.",
      ],
      tip: "'Verb + 干净' is a Result Complement — 洗干净, 擦干净, 打扫干净.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_016",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1健康 2清洗 3招呼 4冲凉 5离开 6办法】",
    q: "想出（___）",
    answer: 6, // 办法 → 想出办法
    pinyin: "xiǎng chū bàn fǎ",
    meaning: "'想出办法' = to think of a solution / come up with a method.",
    solution: {
      method: "Verb + Noun matching",
      steps: [
        "The object that comes after '想出 (to think of)' → 'a method/way'.",
        "'办法' matches with → 想出办法.",
      ],
      tip: "Common objects used with '想出': 办法 / 主意.",
    },
  },

  // ==========================================================================
  // (五) 改写句子 JuZi — Q17-Q20 (4题8分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_017",
    topic: "JuZi",
    difficulty: "core",
    instruction: "请用括号里的词语，把两个句子改写成一个句子。（因为）",
    q: "今天我们不能去外婆的家。今天下雨了。",
    answer: "今天我们不能去外婆的家，因为下雨了。",
    pinyin: "jīn tiān wǒ men bù néng qù wài pó de jiā, yīn wèi xià yǔ le",
    meaning: "We can't go to grandma's house today because it rained.",
    solution: {
      method: "Joining two sentences using the cause-and-effect conjunction '因为'",
      steps: [
        "Put the result sentence (去不了) first, and place the cause (下雨了) after '因为'.",
        "The shared time word '今天' should only be written once.",
        "→ 今天我们不能去外婆的家，因为下雨了。",
      ],
      tip: "Both structures work: 'Result, 因为 Cause' or '因为 Cause, 所以 Result'.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_018",
    topic: "JuZi",
    difficulty: "core",
    instruction: "请用括号里的词语，把两个句子改写成一个句子。（因为）",
    q: "在图书馆里大声说话是不对的。在图书馆里大声说话会吵到别人。",
    answer: "在图书馆里大声说话是不对的，因为会吵到别人。",
    pinyin:
      "zài tú shū guǎn lǐ dà shēng shuō huà shì bù duì de, yīn wèi huì chǎo dào bié rén",
    meaning: "Speaking loudly in the library is wrong, because it disturbs others.",
    solution: {
      method: "Causal conjunction '因为' + omit the repeated subject.",
      steps: [
        "Use the first sentence (…是不对的) as the result, and the key idea from the second sentence (会吵到别人) as the reason.",
        "The repeated phrase '在图书馆里大声说话' should be left out the second time.",
        "→ …是不对的，因为会吵到别人。",
      ],
      tip: "If the subject is the same, leave it out in the '因为' clause to keep the sentence short and neat.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_019",
    topic: "JuZi",
    difficulty: "stretch",
    instruction: "请用括号里的词语改写句子。（叫）",
    q: "姐姐对妹妹说：“妹妹，把书桌收拾干净。”",
    answer: "姐姐叫妹妹把书桌收拾干净。",
    pinyin: "jiě jie jiào mèi mei bǎ shū zhuō shōu shi gān jìng",
    meaning: "Elder sister told/asked the younger sister to tidy up the desk. (Direct → indirect command with 叫.)",
    solution: {
      method: "Change direct speech into a pivot sentence (兼语句) using '叫'.",
      steps: [
        "Change a command in quotes into a pivot sentence using the pattern '叫 + person + action'.",
        "'对妹妹说：“…”' → '叫妹妹 把书桌收拾干净'.",
        "Remove the quotation marks and the address term '妹妹，'.",
      ],
      tip: "For sentences using '叫/让/请 + person + verb', write it as a plain statement without quotation marks.",
    },
  },
  {
    id: "p3_zh_wa3_tn5_020",
    topic: "JuZi",
    difficulty: "stretch",
    instruction: "请用括号里的词语改写句子。（告诉）",
    q: "小明对大家说：“这是我最喜欢的一本书。”",
    answer: "小明告诉大家那是他最喜欢的一本书。",
    pinyin: "xiǎo míng gào su dà jiā nà shì tā zuì xǐ huān de yì běn shū",
    meaning: "Xiao Ming told everyone that that was his favourite book. (Direct → reported speech.)",
    solution: {
      method: "Change direct speech into indirect speech (转述句) using '告诉'.",
      steps: [
        "Change '说：\"…\"' to '告诉大家 …'.",
        "Change demonstratives and pronouns: 这→那, 我→他.",
        "→ 小明告诉大家那是他最喜欢的一本书。",
      ],
      tip: "When changing to indirect speech, always switch: 这→那, 我→他/她, 你→the person being referred to.",
    },
  },

  // ==========================================================================
  // (六) 短文填空 TianKong — Q21-Q24 (4题4分) — SET
  // 词语库: 1突然 2意思 3商量 4果然 5立刻 6主意
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_set1",
    topic: "TianKong",
    difficulty: "core",
    setLabel: "Tao Nan 补充(五) — 短文填空（交换雨衣）",
    instruction:
      "根据短文的内容，选出最适当的答案，然后把代表它的数字（1-6）填写在右边的括号里。【词语库：1突然 2意思 3商量 4果然 5立刻 6主意】",
    passage:
      "一天下午，小丽和小英在商店里各自买了一件雨衣。她们刚走出店门，（Q21）下起了大雨。两人站在店门外，你看看我，我看看你，都不愿意穿上自己刚买的新雨衣，担心它会被雨水淋湿。于是，她们便站在店门外（Q22）要怎样回家。\n" +
      "店主听到了她们的对话，对她们说：“你们交换雨衣来穿吧。”她们想了想，觉得这是一个好（Q23），便交换雨衣来穿。\n" +
      "穿上雨衣后，她们（Q24）跑回家。由于她们身上穿的都不是自己的雨衣，所以被雨淋湿了也不会心疼。",
    questions: [
      {
        id: "p3_zh_wa3_tn5_021",
        type: "MCQ",
        q: "（Q21）下起了大雨。",
        // 보기를 단어库 번호로 매핑하여 표기
        options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
        answer: 0, // 1突然
        pinyin: "tū rán",
        meaning: "'突然' = suddenly. 突然下起了大雨 = it suddenly started to rain heavily.",
        solution: {
          method: "Clue: sudden change",
          steps: [
            "It started raining right after they walked out of the shop → something unexpected and sudden.",
            "'突然下起了大雨' is the most natural way to say it.",
            "→ 1 突然.",
          ],
          tip: "Use '突然' when rain or an event starts without any warning.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_022",
        type: "MCQ",
        q: "她们便站在店门外（Q22）要怎样回家。",
        options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
        answer: 2, // 3商量
        pinyin: "shāng liang",
        meaning: "'商量' = to discuss / talk over. 商量要怎样回家 = discuss how to get home.",
        solution: {
          method: "Verb position + object '要怎样回家' that follows",
          steps: [
            "'Discuss' what to do and how to get home together.",
            "'商量 (to discuss)' matches best here.",
            "→ 3 商量.",
          ],
          tip: "When two people are trying to decide on a plan together, use '商量'.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_023",
        type: "MCQ",
        q: "她们想了想，觉得这是一个好（Q23），便交换雨衣来穿。",
        options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
        answer: 5, // 6主意
        pinyin: "zhǔ yi",
        meaning: "'主意' = idea / plan. 一个好主意 = a good idea.",
        solution: {
          method: "'一个好___' — noun position",
          steps: [
            "After '好 (good)' and the measure word '一个', the word that fits is 'idea'.",
            "'一个好主意' is a fixed, commonly used phrase.",
            "→ 6 主意.",
          ],
          tip: "'一个好主意 / 想个好办法' — these forms often appear in exam questions.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_024",
        type: "MCQ",
        q: "穿上雨衣后，她们（Q24）跑回家。",
        options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
        answer: 4, // 5立刻
        pinyin: "lì kè",
        meaning: "'立刻' = immediately / at once. 立刻跑回家 = ran home immediately.",
        solution: {
          method: "Adverb position + idea of doing something immediately",
          steps: [
            "The action happened right after putting on the raincoat (穿上雨衣后).",
            "'立刻 (immediately)' goes before the verb '跑' and matches the meaning perfectly.",
            "→ 5 立刻.",
          ],
          tip: "'...后, 立刻/马上 + verb' shows an immediate action pattern.",
        },
      },
    ],
  },

  // ==========================================================================
  // (七) 阅读理解 YueReadMCQ — Q25-Q28 (4题8分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_set2",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Tao Nan 补充(五) — 阅读理解（小明与小鸟）",
    instruction:
      "根据短文的内容，选出最适当的答案，然后把代表它的数字（1、2、3、4）填写在右边的括号里。",
    passage:
      "小明生日那天，叔叔送了一个鸟笼给他。小明到屋外捉了一只小鸟，想把它养在笼子里。妈妈见了，说：“你把小鸟关进笼子里，它会失去自由而变得不开心。日子久了，小鸟不但会生病，还可能会死掉。”\n" +
      "小明不相信妈妈的话，还是把小鸟关进笼子里。他每天给小鸟喝水，抓虫子给它吃，一有空还陪它玩。可是，小鸟不吃也不喝，几天后便倒在笼子里，一动也不动。小明见了，心里很着急。他连忙打开笼子，想看看小鸟是不是生病了。没想到，小鸟却张开眼睛飞走了。\n" +
      "小明这才知道，小鸟并没有生病，只是想逃出鸟笼。他大声地对着小鸟说：“再见了，小鸟。我再也不把你关进笼子里了！”",
    questions: [
      {
        id: "p3_zh_wa3_tn5_025",
        type: "MCQ",
        q: "小明生日当天收到了什么礼物？",
        options: ["一只小鸟。", "一个鸟笼。", "鸟笼和小鸟。", "小鸟和小虫。"],
        answer: 1, // 一个鸟笼
        pinyin: "yí gè niǎo lóng",
        meaning: "What gift did Xiao Ming receive on his birthday? A birdcage (一个鸟笼).",
        solution: {
          method: "Finding specific details — spotting the trap",
          steps: [
            "Sentence 1: '叔叔送了一个鸟笼给他' → the gift is a birdcage.",
            "The bird '小鸟' was '小明到屋外捉了' — meaning Xiao Ming caught it himself, so it is not a gift.",
            "→ (2) 一个鸟笼.",
          ],
          tip: "Check the verb carefully so you do not mix up 'what was given as a gift' and 'what the person got on their own'.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_026",
        type: "MCQ",
        q: "妈妈为什么不赞成小明把小鸟关在笼子里？",
        options: ["小鸟会着急。", "小鸟不会飞走。", "小鸟会失去自由。", "小鸟不会陪小明玩。"],
        answer: 2, // 会失去自由
        pinyin: "huì shī qù zì yóu",
        meaning: "Why did mum disapprove? Because the bird would lose its freedom (and become unhappy).",
        solution: {
          method: "Finding the cause — quoting what Mum said",
          steps: [
            "Mum said: '它会失去自由而变得不开心'.",
            "The key idea is 'losing freedom (失去自由)'.",
            "→ (3) 小鸟会失去自由.",
          ],
          tip: "The reason is often found directly in what a character says.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_027",
        type: "MCQ",
        q: "小明打开笼子的原因是什么？",
        options: [
          "他想把小鸟放走。",
          "他想给小鸟喝水。",
          "他想陪小鸟一起玩。",
          "他想看小鸟是不是生病了。",
        ],
        answer: 3, // 想看小鸟是不是生病了
        pinyin: "xiǎng kàn xiǎo niǎo shì bú shì shēng bìng le",
        meaning: "Why did Xiao Ming open the cage? Because he wanted to see whether the bird was sick.",
        solution: {
          method: "Finding the cause — direct statement",
          steps: [
            "Paragraph 2: '他连忙打开笼子，想看看小鸟是不是生病了'.",
            "→ (4) 想看小鸟是不是生病了.",
            "The bird flying away was not on purpose (没想到).",
          ],
          tip: "'想/为了 + action' shows the purpose (cause) behind the action.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_028",
        type: "MCQ",
        q: "以下哪一个句子是正确的？",
        options: ["小鸟最后病死了。", "小鸟不爱吃小虫子。", "小鸟要住在笼子里。", "小鸟不想被关在笼子里。"],
        answer: 3, // 不想被关在笼子里
        pinyin: "bù xiǎng bèi guān zài lóng zi lǐ",
        meaning: "Which statement is correct? The bird did not want to be locked in the cage.",
        solution: {
          method: "Understanding the main theme (总结题) — removing wrong answers",
          steps: [
            "Last paragraph: '小鸟并没有生病，只是想逃出鸟笼' → (1) The bird did NOT die of illness.",
            "The bird did not eat because it had no freedom, not because it disliked the worm → (2) X.",
            "The bird wants to leave the cage → (3) X, (4) O.",
          ],
          tip: "For 'choose the correct sentence' questions, compare each option with the passage one by one and eliminate the wrong ones.",
        },
      },
    ],
  },

  // ==========================================================================
  // (八) 理解问答 YueReadOpen — Q29-Q33 (5题9分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn5_set3",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Tao Nan 补充(五) — 理解问答（阿宝喂蚊子/孝顺）",
    instruction: "根据文章的内容和上下文的意思，回答下列的问题。",
    passage:
      "古时候，有个孩子名叫阿宝。他的父母都是农夫。阿宝五六岁时就常常跟着父母去田里帮忙。邻居们都夸阿宝是个懂事的孩子。\n" +
      "阿宝家里很穷，连蚊帐也买不起，他们一家人到了夏天就会被又大又黑的蚊子咬得整晚都睡不好。\n" +
      "为了让在田里劳累了一天的父母睡个好觉，阿宝想到了一个好主意。每到晚上，阿宝就光着上身，睡在父母身旁。不一会儿，蚊子果然都飞到了他身上。阿宝任由蚊子咬他，一动也不动。爸爸妈妈醒来，看见这情形，赶紧把阿宝身上的蚊子全都赶跑了。\n" +
      "妈妈看着阿宝身上被蚊子咬出的大大小小的包，心疼地问阿宝：“阿宝，这么多蚊子在你身上，你怎么不赶走它们呢？”阿宝睁着大眼睛，说：“妈妈，我就是要让蚊子来咬我，这样蚊子就不会去咬您和爸爸了！”爸爸妈妈听了，感动得流下了眼泪。",
    questions: [
      {
        id: "p3_zh_wa3_tn5_029a",
        type: "OpenEnded",
        q: "a）文中形容“真的发生了”的词语是 ___（1分）",
        answer: "果然",
        pinyin: "guǒ rán",
        meaning: "'果然' = as expected / sure enough (it really happened as predicted).",
        solution: {
          method: "Finding synonyms (找近义词) — pick the word directly from the passage.",
          steps: [
            "Find the phrase in the passage that means 'it really happened / it truly came true'.",
            "The passage says: '蚊子果然都飞到了他身上'.",
            "→ 果然.",
          ],
          tip: "'果然' means things turned out exactly as expected — it really happened just like that.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_029b",
        type: "OpenEnded",
        q: "b）文中形容“舍不得”的词语是：___（1分）",
        answer: "心疼",
        pinyin: "xīn téng",
        meaning: "'心疼' = to feel deep affection/pity for; to be reluctant to see someone suffer.",
        solution: {
          method: "Finding synonyms (找近义词).",
          steps: [
            "Find the phrase that has the same meaning as '舍不得' (to feel it is a pity / to feel sorry for someone).",
            "The passage says: '妈妈…心疼地问阿宝'.",
            "→ 心疼.",
          ],
          tip: "'心疼' means feeling sad and sorry for someone you love when they are hurt or having a hard time.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_030",
        type: "OpenEnded",
        q: "为什么邻居们会夸阿宝是个懂事的孩子？（1分）",
        answer:
          "邻居们夸阿宝是个懂事的孩子，因为他五六岁时就常常跟着父母去田里帮忙。",
        pinyin:
          "lín jū men kuā ā bǎo shì gè dǒng shì de hái zi, yīn wèi tā wǔ liù suì shí jiù cháng cháng gēn zhe fù mǔ qù tián lǐ bāng máng",
        meaning: "The neighbours praised Ah Bao as a sensible child because, even at five or six years old, he often went to the fields with his parents to help.",
        solution: {
          method: "Answering a 'reason' question — use '因为' in your answer.",
          steps: [
            "Paragraph 1: '阿宝五六岁时就常常跟着父母去田里帮忙' is the reason for the praise.",
            "When the question asks '为什么', always answer with '因为…'.",
          ],
          tip: "For reason answers, it is safe to copy the sentence from the passage almost exactly as it is.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_031",
        type: "OpenEnded",
        q: "什么事令阿宝一家人一到夏天就整晚都睡不好？（2分）",
        answer:
          "因为到了夏天，他们一家人会被又大又黑的蚊子咬得整晚都睡不好。",
        pinyin:
          "yīn wèi dào le xià tiān, tā men yì jiā rén huì bèi yòu dà yòu hēi de wén zi yǎo de zhěng wǎn dōu shuì bù hǎo",
        meaning: "Because in summer the whole family was bitten by big, black mosquitoes all night and couldn't sleep well.",
        solution: {
          method: "Cause/Reason answer type",
          steps: [
            "Paragraph 2: '到了夏天就会被又大又黑的蚊子咬得整晚都睡不好'.",
            "Being too poor to buy a mosquito net (蚊帐) is part of the background, but the direct cause is being bitten by mosquitoes.",
          ],
          tip: "'什么事令…' is also asking for a cause — make sure your answer includes the key event (蚊子咬).",
        },
      },
      {
        id: "p3_zh_wa3_tn5_032",
        type: "OpenEnded",
        q: "爸爸妈妈看见阿宝被蚊子咬后，有什么反应？（2分）",
        answer: "爸爸妈妈赶紧把阿宝身上的蚊子全都赶跑了。",
        pinyin:
          "bà ba mā ma gǎn jǐn bǎ ā bǎo shēn shàng de wén zi quán dōu gǎn pǎo le",
        meaning: "Dad and mum hurriedly chased away all the mosquitoes on Ah Bao's body.",
        solution: {
          method: "Describe the reaction/action directly — note that this is NOT a '为什么' question.",
          steps: [
            "Since the question asks '有什么反应', do NOT answer with '因为' — instead, write the father's and mother's actions directly.",
            "Paragraph 3: '赶紧把阿宝身上的蚊子全都赶跑了'.",
            "→ Write that action directly in your answer.",
          ],
          tip: "For '有什么反应' question type, describe the character's action or reaction directly. Do NOT explain the reason.",
        },
      },
      {
        id: "p3_zh_wa3_tn5_033",
        type: "OpenEnded",
        q: "你认为阿宝是一个怎样的孩子？为什么？（2分）",
        answer:
          "我认为阿宝是一个心疼父母（孝顺）的好孩子。因为他为了让在田里劳累了一天的父母睡个好觉，光着上身睡在父母身旁，让蚊子来咬自己。",
        pinyin:
          "wǒ rèn wéi ā bǎo shì yí gè xīn téng fù mǔ (xiào shùn) de hǎo hái zi. yīn wèi tā wèi le ràng fù mǔ shuì gè hǎo jué, guāng zhe shàng shēn shuì zài fù mǔ shēn páng, ràng wén zi lái yǎo zì jǐ.",
        meaning: "I think Ah Bao is a child who loves/honours his parents, because to let his tired parents sleep well, he slept bare-bodied beside them and let the mosquitoes bite him instead.",
        solution: {
          method: "Opinion + Evidence answer type — answer the two parts separately (connect to the theme of 孝顺).",
          steps: [
            "First part: Give your opinion of the character → '我认为阿宝是一个心疼父母/孝顺的孩子'.",
            "Second part: Prove it with a specific example from the passage → 光着上身睡在父母身旁让蚊子咬自己.",
            "You must complete both parts (怎样 + 为什么) to get full marks.",
          ],
          tip: "'怎样的孩子 + 为什么' must be answered as a set: character description + evidence from the passage.",
        },
      },
    ],
  },
];

export default wa3_taonan_supp5_2025;
