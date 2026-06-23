// ============================================================================
// Tao Nan Primary School (道南学校)
// P3 Higher Chinese (高级华文) — 2024 补充作业（三）第五课至第六课
// Source: sgexam.com P3 Chinese WA3 compilation
// Total marks: 45
//
// ⚠ 정답키 주의: PDF 내장 ANSWER KEY(p64)의 OCR이 词语搭配(Q12-16)·短文填空(Q22-24)
//   구간에서 어긋나 있어, 해당 문항은 문법·교과상 명확한 정답으로 채우고
//   needsParentVerify: true 로 표시함. (辨字/拼音/阅读MCQ Q25-28은 정답키와 일치)
// ============================================================================

import type { Question } from "@/data/p3/chinese/types";

export const wa3_taonan_supp3_2024: Question[] = [
  // ==========================================================================
  // (一) 辨字测验 BianZi — Q1-Q5 (5题5分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_001",
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
      method: "Distinguishing similar-looking and similar-sounding characters — 'Walking Radical (辶)'",
      steps: [
        "Close enough to walk there means 'near' → 近.",
        "进 (to enter) · 金 (gold) · 今 (now) do not fit the meaning.",
        "'近' uses the radical '辶' (walking radical), which relates to distance or movement.",
      ],
      tip: "近 (near) ↔ 远 (far). Be careful — 进 (to enter) looks very similar to 近.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_002",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "上课前，我们要___备好课本和文具。",
    options: ["难", "准", "谁", "推"],
    answer: 1, // 准 (准备)
    pinyin: "zhǔn bèi",
    meaning: "'准备(zhǔnbèi)' = to prepare / get ready.",
    solution: {
      method: "Recognising the word '准备' (to prepare)",
      steps: [
        "The situation is about getting your books and stationery ready before class.",
        "'准备' (to prepare) is needed here, so the answer is '准'.",
        "难 (difficult) · 谁 (who) · 推 (to push) do not fit.",
      ],
      tip: "Be careful — the right side of 准 (准) and 难 (difficult) look very similar.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_003",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "小华跑得太快，不小心___到了小明。",
    options: ["撞", "追", "跳", "跌"],
    answer: 0, // 撞
    pinyin: "zhuàng",
    meaning: "'撞(zhuàng)' = to bump into / collide. 撞到了小明 = bumped into Xiao Ming.",
    solution: {
      method: "Understanding action verbs from context — running fast and 'bumping into someone'",
      steps: [
        "Running too fast and accidentally 'bumping into' someone → 撞.",
        "追 (to chase) · 跳 (to jump) · 跌 (to trip and fall) do not match '到了小明'.",
      ],
      tip: "When you bump into a person or object, use '撞' (as in 撞到 / 撞上).",
    },
  },
  {
    id: "p3_zh_wa3_tn3_004",
    topic: "BianZi",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "下午，爸爸带我去书___买了几本故事书。",
    options: ["尾", "屋", "居", "展"],
    answer: 3, // 展 (书展)
    pinyin: "shū zhǎn",
    meaning: "'书展(shūzhǎn)' = book fair / book exhibition.",
    solution: {
      method: "Word recognition — 'a place or event where books are sold'",
      steps: [
        "A place or event where you buy storybooks → 书展 (Book Fair).",
        "Among the choices, the character '展' (meaning 'to display') forms the word '书展'.",
        "'尾' (tail), '屋' (house), and '居' (to live) do not match the meaning of 'buying books'.",
      ],
      tip: "The character '展' appears in: 展览 (exhibition), 书展 (book fair), and 画展 (art exhibition).",
    },
  },
  {
    id: "p3_zh_wa3_tn3_005",
    topic: "BianZi",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "小安和欢欢吵架了，谁也不___谁。",
    options: ["管", "说", "听", "理"],
    answer: 3, // 理 (不理)
    pinyin: "lǐ",
    meaning: "'理(lǐ)' here = to pay attention to / acknowledge. 谁也不理谁 = neither pays attention to the other.",
    solution: {
      method: "Recognising the set phrase '不理', which means 'to ignore someone' or 'to not respond to someone'.",
      steps: [
        "After an argument, when both sides ignore each other → 谁也不理谁 (Neither person talks to the other).",
        "We choose '理' because the phrase means the opposite of paying attention to or acknowledging someone.",
        "'管' has a similar meaning, but '谁也不理谁' is the fixed, correct expression to use.",
      ],
      tip: "'不理' means to ignore someone or to refuse to respond to them.",
    },
  },

  // ==========================================================================
  // (二) 汉语拼音 PinYin — Q6-Q7 (2题2分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_006",
    topic: "PinYin",
    difficulty: "core",
    instruction:
      "根据句子中划线的词语，选出正确的音节，然后把代表它的数字填写在括号里。【划线词：傍晚】",
    q: "【傍晚】，我和爸爸去海边骑脚踏车。",
    options: ["bàng wǎn", "bàng wǎng", "páng wǎn", "páng wǎng"],
    answer: 0, // bàng wǎn
    pinyin: "bàng wǎn",
    meaning: "'傍晚(bàngwǎn)' = dusk / towards evening.",
    solution: {
      method: "Listen carefully to the Initial (b) and Final (an) sounds to tell characters apart.",
      steps: [
        "'傍' is pronounced bàng — not páng.",
        "'晚' is pronounced wǎn — not wǎng. There is no nasal ending '-ng' in this sound.",
        "→ bàng wǎn.",
      ],
      tip: "傍晚 (bàngwǎn) means dusk or evening. The key skill is telling apart the Finals '-an' and '-ang'.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_007",
    topic: "PinYin",
    difficulty: "core",
    instruction:
      "根据句子中划线的词语，选出正确的音节，然后把代表它的数字填写在括号里。【划线词：跌倒】",
    q: "小文看到老爷爷【跌倒】了，就上前把他扶起来。",
    options: ["diē dǎo", "diē dào", "dié dǎo", "dié dào"],
    answer: 0, // diē dǎo
    pinyin: "diē dǎo",
    meaning: "'跌倒(diēdǎo)' = to fall down / trip over.",
    solution: {
      method: "Identifying tones — 跌 is 1st tone and 倒 is 3rd tone.",
      steps: [
        "'跌' is pronounced diē (1st tone) — not dié (2nd tone).",
        "'倒 (to fall down)' is 3rd tone: dǎo — not dào; 4th tone dào means 'upside down / to pour'.",
        "→ diē dǎo.",
      ],
      tip: "倒: to fall down = dǎo (3rd tone); upside down / to pour = dào (4th tone). Choose the tone based on the meaning.",
    },
  },

  // ==========================================================================
  // (三) 词语选择 CiYu — Q8-Q11 (4题4分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_008",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "明天我们会去___新加坡动物园。",
    options: ["访问", "参观", "拜访", "看望"],
    answer: 1, // 参观
    pinyin: "cān guān",
    meaning: "'参观(cānguān)' = to visit (a place/exhibition). 参观动物园 = visit the zoo.",
    solution: {
      method: "Telling apart verbs used for visiting places",
      steps: [
        "When you go around a 'place or facility' like a zoo → use 参观.",
        "访问 (interview / visit someone), 拜访 / 看望 (visit a person) are not suitable for visiting a place.",
      ],
      tip: "For places and exhibitions, use '参观'; for visiting a person, use '拜访 / 看望'.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_009",
    topic: "CiYu",
    difficulty: "core",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "妹妹做错了事情，请求妈妈___她。",
    options: ["明白", "感谢", "原谅", "夸奖"],
    answer: 2, // 原谅
    pinyin: "yuán liàng",
    meaning: "'原谅(yuánliàng)' = to forgive. 请求妈妈原谅她 = ask mum to forgive her.",
    solution: {
      method: "Matching meaning to context — 'did something wrong → ask for…'",
      steps: [
        "After doing something wrong, you ask Mum for 'forgiveness' → use 原谅.",
        "明白 (understand), 感谢 (thank), 夸奖 (praise) do not fit this context.",
      ],
      tip: "When apologising for a mistake, use '请求原谅' (to ask for forgiveness).",
    },
  },
  {
    id: "p3_zh_wa3_tn3_010",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "妈妈觉得巴刹里卖的青菜和水果都非常___。",
    options: ["新奇", "新鲜", "清新", "清甜"],
    answer: 1, // 新鲜
    pinyin: "xīn xiān",
    meaning: "'新鲜(xīnxiān)' = fresh (food). 青菜和水果很新鲜 = the vegetables and fruit are fresh.",
    solution: {
      method: "Telling apart similar words — which one goes with 'vegetables and fruit'",
      steps: [
        "When vegetables and fruit are 'fresh' → use 新鲜.",
        "新奇 (novel / surprising), 清新 (fresh and clean, used for air), 清甜 (clear and sweet) are not suitable here.",
      ],
      tip: "When food is fresh, use '新鲜'. For fresh air, use '清新'.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_011",
    topic: "CiYu",
    difficulty: "stretch",
    instruction:
      "从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字填写在括号里。",
    q: "明天是奶奶的生日，我想送她一份___的礼物。",
    options: ["特色", "特意", "特地", "特别"],
    answer: 3, // 特别
    pinyin: "tè bié",
    meaning: "'特别(tèbié)' = special. 一份特别的礼物 = a special gift.",
    solution: {
      method: "'一份___的礼物' — this blank is the position for an adjective.",
      steps: [
        "The adjective that describes '礼物 (gift)' → '特别的 (special)'.",
        "'特别的礼物 (a special gift)' is the natural combination.",
        "'特意/特地 (adverb: on purpose)' and '特色 (characteristic, noun)' do not fit in the '一份…的礼物 (a ... gift)' position.",
      ],
      tip: "'特意/特地' are adverbs that go before verbs, while '特别' can also be used as an adjective to describe nouns.",
    },
  },

  // ==========================================================================
  // (四) 词语搭配 PeiDui — Q12-Q16 (5题5分)
  // 词语库: 1认真 2比赛 3摆动 4国家 5说话 6宠物
  // ⚠ 정답키 OCR이 이 구간에서 어긋남 → 문법상 명확한 정답 사용 + needsParentVerify
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_012",
    topic: "PeiDui",
    difficulty: "core",
    needsParentVerify: true,
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1认真 2比赛 3摆动 4国家 5说话 6宠物】",
    q: "（___）复习",
    answer: 1, // 认真 → 认真复习
    pinyin: "rèn zhēn fù xí",
    meaning: "'认真复习' = to revise seriously/diligently.",
    solution: {
      method: "Adverb + Verb agreement",
      steps: [
        "The word that should come before '复习 (to revise)' → 'seriously/carefully'.",
        "'认真复习 (revise seriously)' is the standard combination.",
      ],
      tip: "⚠ This answer does not match the PDF answer key due to an OCR error (the key shows 5). '认真复习' is the grammatically correct answer, so it is kept as option 1. Parent review is recommended.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_013",
    topic: "PeiDui",
    difficulty: "core",
    needsParentVerify: true,
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1认真 2比赛 3摆动 4国家 5说话 6宠物】",
    q: "（___）身体",
    answer: 3, // 摆动 → 摆动身体
    pinyin: "bǎi dòng shēn tǐ",
    meaning: "'摆动身体' = to sway/move the body.",
    solution: {
      method: "Verb + Noun agreement",
      steps: [
        "To 'sway' '身体 (body)' from side to side → 摆动身体.",
        "The other words (比赛·国家·说话) do not pair naturally with '身体 (body)'.",
      ],
      tip: "⚠ This answer does not match the PDF answer key due to an OCR error (the key shows 2). '摆动身体' is the grammatically correct answer, so it is kept as option 3. Parent review is recommended.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_014",
    topic: "PeiDui",
    difficulty: "core",
    needsParentVerify: true,
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1认真 2比赛 3摆动 4国家 5说话 6宠物】",
    q: "轻声（___）",
    answer: 5, // 说话 → 轻声说话
    pinyin: "qīng shēng shuō huà",
    meaning: "'轻声说话' = to speak softly / in a low voice.",
    solution: {
      method: "Adverb + Verb agreement",
      steps: [
        "The action that should follow '轻声 (in a soft voice)' → 'to speak'.",
        "'轻声说话 (speak softly)' is the standard combination.",
      ],
      tip: "⚠ The PDF answer key does not match the OCR scan (scanned as option 3). '轻声说话' is grammatically correct, so the answer is kept as 5. Parent review is recommended.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_015",
    topic: "PeiDui",
    difficulty: "core",
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1认真 2比赛 3摆动 4国家 5说话 6宠物】",
    q: "爱护（___）",
    answer: 6, // 宠物 → 爱护宠物
    pinyin: "ài hù chǒng wù",
    meaning: "'爱护宠物' = to care for / cherish pets.",
    solution: {
      method: "Verb + Noun matching",
      steps: [
        "The object of '爱护 (to care for / protect)' → animals or pets.",
        "From the word bank, '宠物 (pet)' matches correctly.",
      ],
      tip: "(This question matches the PDF answer key: 6) To care for plants and animals → 爱护.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_016",
    topic: "PeiDui",
    difficulty: "core",
    needsParentVerify: true,
    instruction:
      "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。【词语库：1认真 2比赛 3摆动 4国家 5说话 6宠物】",
    q: "参加（___）",
    answer: 2, // 比赛 → 参加比赛
    pinyin: "cān jiā bǐ sài",
    meaning: "'参加比赛' = to take part in a competition.",
    solution: {
      method: "Verb + Noun matching",
      steps: [
        "The object of '参加 (to participate in)' → a competition or match.",
        "From the word bank, '比赛 (competition)' matches correctly → 参加比赛.",
        "The remaining word '国家 (country)' is an unused distractor word.",
      ],
      tip: "⚠ The PDF answer key does not match the OCR scan (scanned as option 4). '参加比赛' is grammatically correct, so the answer is kept as 2. Parent review is recommended.",
    },
  },

  // ==========================================================================
  // (五) 改写句子 + 仿写句子 JuZi — Q17-Q20 (4题8分)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_017",
    topic: "JuZi",
    difficulty: "core",
    instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。（或者）",
    q: "放学后，同学们可以去操场打球。放学后，同学们可以去图书馆看书。",
    answer: "放学后，同学们可以去操场打球或者去图书馆看书。",
    pinyin:
      "fàng xué hòu, tóng xué men kě yǐ qù cāo chǎng dǎ qiú huò zhě qù tú shū guǎn kàn shū",
    meaning: "After school, students can go to the field to play ball or to the library to read.",
    solution: {
      method: "Combining two sentences using the either/or conjunction '或者', and leaving out the repeated common part.",
      steps: [
        "The common part '放学后，同学们可以' is written only once.",
        "The two choices '去操场打球' and '去图书馆看书' are joined together using '或者'.",
        "→ …可以去操场打球或者去图书馆看书。",
      ],
      tip: "Because the places and actions are different, '去…' is kept in both choices and connected with '或者'.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_018",
    topic: "JuZi",
    difficulty: "stretch",
    instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。（连）",
    q: "哥哥打破了弟弟的杯子。哥哥一句对不起也没说。",
    answer: "哥哥打破了弟弟的杯子，连一句对不起也没说。",
    pinyin: "gē ge dǎ pò le dì di de bēi zi, lián yí jù duì bù qǐ yě méi shuō",
    meaning: "Elder brother broke younger brother's cup and didn't even say a single sorry.",
    solution: {
      method: "Combining sentences using the emphasis structure '连…也…'",
      steps: [
        "Keep the first event (breaking the cup) as it is, and rewrite the second sentence using the '连…也…' emphasis structure.",
        "Add '连' in front of '一句对不起也没说'.",
        "→ …连一句对不起也没说。",
      ],
      tip: "'连 A 也/都 B' means 'even A, B' (used for emphasis). It is often used together with the '一句…也没…' pattern.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_019",
    topic: "JuZi",
    difficulty: "core",
    instruction: "B组：根据句式，仿写句子。（除了……还）",
    q: "例：除了苹果，我还喜欢吃西瓜。请仿写一个句子。",
    answer: "除了猫，我还喜欢狮子。",
    pinyin: "chú le māo, wǒ hái xǐ huān shī zi",
    meaning: "Besides cats, I also like lions. (Model sentence imitating '除了……还'.)",
    solution: {
      method: "Sentence pattern imitation (仿写) — '除了 A，还 B'",
      steps: [
        "Keep the structure '除了 + subject 1，还 + subject 2'.",
        "Both subjects should belong to the same category for the sentence to sound natural (e.g. animals: 猫/狮子).",
        "→ 除了猫，我还喜欢狮子。 (Other answers are also accepted.)",
      ],
      tip: "For 仿写, as long as you follow the same structure, the content is up to you. Try to fill in words from the same category.",
    },
  },
  {
    id: "p3_zh_wa3_tn3_020",
    topic: "JuZi",
    difficulty: "core",
    instruction: "B组：根据句式，仿写句子。（有的……有的）",
    q: "例：巴士上有很多人，有的在睡觉，有的在看书。请仿写一个句子。",
    answer: "公园里有很多人，有的在打太极，有的在跑步。",
    pinyin:
      "gōng yuán lǐ yǒu hěn duō rén, yǒu de zài dǎ tài jí, yǒu de zài pǎo bù",
    meaning: "There are many people in the park; some are doing tai chi, some are jogging. (Model imitating '有的……有的'.)",
    solution: {
      method: "Sentence pattern imitation (仿写) — '有的…，有的…'",
      steps: [
        "Keep the structure: 'place + 有很多人，有的在 A，有的在 B'.",
        "The two actions should be things that would naturally happen at that place.",
        "→ 公园里…，有的在打太极，有的在跑步。 (Other answers are also accepted.)",
      ],
      tip: "'有的…有的…' is used to describe different actions being done by different people in a group.",
    },
  },

  // ==========================================================================
  // (六) 短文填空 TianKong — Q21-Q24 (4题4分) — SET
  // 词语库: 1急忙 2准备 3清洁 4清洗 5逃走 6出发
  // ⚠ 정답키 OCR이 Q22-Q24 어긋남 → 문법상 명확한 정답 사용 + needsParentVerify
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_set1",
    topic: "TianKong",
    difficulty: "core",
    setLabel: "Tao Nan 补充(三)2024 — 短文填空（农夫救阿强）",
    instruction:
      "根据短文的内容，选出最适当的答案，然后把代表它的数字（1-6）填写在右边的括号里。【词语库：1急忙 2准备 3清洁 4清洗 5逃走 6出发】",
    passage:
      "阿强到城里去买东西，在路上碰到了坏人。坏人不但把他打伤，还抢走了他的钱，把他丢下后就（Q21）了。\n" +
      "过了不久，一个商人路过，见阿强受伤了，不想上前帮他，马上走掉了。\n" +
      "后来，一个农夫看见阿强躺在地上，便（Q22）走上前去，把他扶回家。农夫帮阿强把伤口（Q23）干净，然后让他躺在床上休息。\n" +
      "第二天一早，农夫出门前，想到阿强会肚子饿，便把食物（Q24）好了才去种田。阿强起身看见桌上的食物，感动得流下了眼泪。",
    questions: [
      {
        id: "p3_zh_wa3_tn3_021",
        type: "MCQ",
        q: "把他丢下后就（Q21）了。",
        options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
        answer: 4, // 5逃走
        pinyin: "táo zǒu",
        meaning: "'逃走' = to flee / run away. 坏人逃走了 = the bad man fled.",
        solution: {
          method: "Predicting the next action of the character (坏人).",
          steps: [
            "After the bad person hits someone and takes their money, the next action would be to 'run away'.",
            "'逃走' matches the sentence → Answer: 5 逃走.",
          ],
          tip: "(Matches PDF answer key: 5) When a criminal runs away, we use '逃走'.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_022",
        type: "MCQ",
        needsParentVerify: true,
        q: "一个农夫看见阿强躺在地上，便（Q22）走上前去。",
        options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
        answer: 0, // 1急忙
        pinyin: "jí máng",
        meaning: "'急忙' = hurriedly. 急忙走上前去 = hurried forward.",
        solution: {
          method: "Adverb + Verb agreement",
          steps: [
            "Seeing an injured person and rushing over 'quickly'.",
            "'急忙走上前去' sounds natural → Answer: 1 急忙.",
          ],
          tip: "⚠ Does not match PDF answer key OCR (key shows 3 清洁 — '清洁走上前' is not correct Chinese). '急忙' is the correct answer so we keep 1, but parents are advised to double-check.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_023",
        type: "MCQ",
        needsParentVerify: true,
        q: "农夫帮阿强把伤口（Q23）干净。",
        options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
        answer: 3, // 4清洗
        pinyin: "qīng xǐ",
        meaning: "'清洗' = to wash/clean. 把伤口清洗干净 = clean the wound thoroughly.",
        solution: {
          method: "Verb + Result Complement '…干净' agreement",
          steps: [
            "To 'wash clean' a wound (伤口) → 清洗干净.",
            "'清洗' matches the sentence → Answer: 4 清洗.",
          ],
          tip: "⚠ Does not match PDF answer key OCR (key shows 2 准备 — '准备干净' is not correct Chinese). '清洗干净' is the correct answer so we keep 4, but parents are advised to double-check.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_024",
        type: "MCQ",
        needsParentVerify: true,
        q: "便把食物（Q24）好了才去种田。",
        options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
        answer: 1, // 2准备
        pinyin: "zhǔn bèi",
        meaning: "'准备' = to prepare. 把食物准备好 = prepare the food (ready).",
        solution: {
          method: "Verb + '好了' (completed result) agreement",
          steps: [
            "Before going to the farm, 'prepare' the food in advance → 准备好.",
            "'准备' matches the sentence → Answer: 2 准备.",
          ],
          tip: "⚠ Does not match PDF answer key OCR (key shows 6 出发 — '出发好了' is not correct Chinese). '准备好' is the correct answer so we keep 2, but parents are advised to double-check.",
        },
      },
    ],
  },

  // ==========================================================================
  // (七) 阅读理解 YueReadMCQ — Q25-Q28 (4题8分) — SET (정답키 일치 확인됨)
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_set2",
    topic: "YueReadMCQ",
    difficulty: "core",
    setLabel: "Tao Nan 补充(三)2024 — 阅读理解（自私的小狗）",
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
        id: "p3_zh_wa3_tn3_025",
        type: "MCQ",
        q: "河水干了，给大家带来什么不便？",
        options: ["小动物没水喝。", "树林里不再下雨。", "花猫不可以过河。", "小狗无法安心睡觉。"],
        answer: 0, // 小动物没水喝
        pinyin: "xiǎo dòng wù méi shuǐ hē",
        meaning: "What inconvenience did the dried-up river cause? The animals had no water to drink.",
        solution: {
          method: "Inferring specific details",
          steps: [
            "The river dried up, so 花猫 and 猴子 came to 小狗 to ask for water.",
            "This means the animals had no water to drink, which was a problem for everyone.",
            "→ (1) 小动物没水喝.",
          ],
          tip: "'求小狗给水喝' is the direct clue that tells us there was a water shortage.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_026",
        type: "MCQ",
        q: "为什么小狗家里有水喝？",
        options: ["它家里的井还有水。", "它偷了邻居家的水。", "它家对面有一条河。", "它跟猴子要了一点水。"],
        answer: 0, // 它家里的井还有水
        pinyin: "tā jiā lǐ de jǐng hái yǒu shuǐ",
        meaning: "Why did the dog still have water? Because the well at its home still had water.",
        solution: {
          method: "Finding information directly stated in the text.",
          steps: [
            "Sentence 1: '只有小狗家里的井还有水'.",
            "→ (1) 它家里的井还有水.",
          ],
          tip: "The phrase '只有…还有水' contains the answer right inside it.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_027",
        type: "MCQ",
        q: "从哪里可以看出小狗不为别人着想？",
        options: ["它把邻居赶出去。", "它大声跟邻居说话。", "它不让邻居来喝水。", "它不让邻居打水灭火。"],
        answer: 2, // 它不让邻居来喝水
        pinyin: "tā bú ràng lín jū lái hē shuǐ",
        meaning: "Where can we see the dog was selfish? It refused to let the neighbours drink water.",
        solution: {
          method: "Finding evidence — behaviours that show '不为别人着想' (not thinking of others).",
          steps: [
            "The neighbours asked for water, but 小狗 said '不可以' and sent them away.",
            "Not caring about others = refusing to give water. This is the key behaviour.",
            "→ (3) 它不让邻居来喝水.",
          ],
          tip: "Option (4) — refusing to help put out the fire — shows harm caused as a result. The more important clue is the act of refusing to share water on purpose.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_028",
        type: "MCQ",
        q: "这个故事告诉我们什么道理？",
        options: ["做人要有礼貌。", "应该多认识新朋友。", "不要对朋友说实话。", "做人不能只为自己着想。"],
        answer: 3, // 做人不能只为自己着想
        pinyin: "zuò rén bù néng zhǐ wèi zì jǐ zháo xiǎng",
        meaning: "What's the moral? One should not think only of oneself (be selfish).",
        solution: {
          method: "Understanding the main idea or lesson of the story (主旨题).",
          steps: [
            "The last sentence: '我只为自己着想，结果害了自己'.",
            "The lesson is: being selfish will end up hurting yourself.",
            "→ (4) 做人不能只为自己着想.",
          ],
          tip: "At the end of a story, when a character says something that shows what they have learnt, that line is often the lesson of the story.",
        },
      },
    ],
  },

  // ==========================================================================
  // (八) 理解问答 YueReadOpen — Q29-Q33 (5题9分) — SET
  // ==========================================================================
  {
    id: "p3_zh_wa3_tn3_set3",
    topic: "YueReadOpen",
    difficulty: "stretch",
    setLabel: "Tao Nan 补充(三)2024 — 理解问答（神笔马良）",
    instruction: "根据文章的内容和上下文的意思，回答下列的问题。",
    passage:
      "古时候，有个名叫马良的孩子。他很喜欢画画，可是没有钱买画笔，每天只能用树枝在地上画画。\n" +
      "一天晚上，马良躺在床上休息。突然，床前出现了一道亮光，一位白头发的老爷爷出现了，交给马良一支漂亮的笔。“这支笔送给你，它能画出不同的颜色，也能让你画的画成真。”说完，老爷爷就不见了。\n" +
      "有了这支神笔，马良就到处帮人画画。有人的羊不见了，马良就给他画一只羊。谁家没水牛帮忙种田，马良就画一头水牛送给那家人。\n" +
      "这件事很快被贪心的国王知道了。国王把马良叫来，对他说：“只要你画一座金山给我，我就让你当大官。”马良知道国王没安好心，就先画了一片大海，然后又在大海中间画了一座金山。等马良画好了船，国王就上船出发了。\n" +
      "这时，马良开始画风。风越来越大，海浪也越来越强。最后，国王的船翻了。贪心的国王再也没有回来。",
    questions: [
      {
        id: "p3_zh_wa3_tn3_029a",
        type: "OpenEnded",
        q: "a）文中指“好看”的词语是：___（1分）",
        answer: "漂亮",
        pinyin: "piào liang",
        meaning: "'漂亮' = pretty / good-looking (synonym of 好看).",
        solution: {
          method: "Finding words with similar meanings (找近义词).",
          steps: [
            "Find the word that means 'good-looking' or 'nice to look at'.",
            "Text: '交给马良一支漂亮的笔'.",
            "→ 漂亮.",
          ],
          tip: "好看 ≈ 漂亮 ≈ 美丽.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_029b",
        type: "OpenEnded",
        q: "b）文中指“动手做”的词语是：___（1分）",
        answer: "开始",
        pinyin: "kāi shǐ",
        meaning: "'开始' = to begin / start (here: start doing/acting, matching 动手做).",
        solution: {
          method: "Find a synonym or a word that matches the meaning in context.",
          steps: [
            "Find the word in the text that has the same meaning as '动手做' (to start doing something yourself).",
            "Text: '这时，马良开始画风'.",
            "→ 开始.",
          ],
          tip: "'动手' means 'to start an action or task' — connect it to the word '开始' in the text.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_030",
        type: "OpenEnded",
        q: "为什么马良用树枝在地上画画？（1分）",
        answer:
          "因为马良很喜欢画画，可是没有钱买画笔，所以他每天只能用树枝在地上画画。",
        pinyin:
          "yīn wèi mǎ liáng hěn xǐ huān huà huà, kě shì méi yǒu qián mǎi huà bǐ, suǒ yǐ tā měi tiān zhǐ néng yòng shù zhī zài dì shàng huà huà",
        meaning: "Because Ma Liang loved drawing but had no money to buy a brush, so he could only draw on the ground with a twig.",
        solution: {
          method: "Cause-and-effect sentence type — use the structure '因为…所以…' (Because… Therefore…).",
          steps: [
            "Paragraph 1: '他很喜欢画画，可是没有钱买画笔'.",
            "So he used a tree branch to draw pictures on the ground.",
            "→ 因为…没钱买画笔，所以只能用树枝在地上画画.",
          ],
          tip: "Make sure your answer includes both clues: '喜欢' (he likes drawing) and '没钱' (he has no money).",
        },
      },
      {
        id: "p3_zh_wa3_tn3_031",
        type: "OpenEnded",
        q: "老爷爷送给马良的笔有什么特别的地方？（2分）",
        answer:
          "那支神笔能画出不同的颜色，也能让马良画的画成真。",
        pinyin:
          "nà zhī shén bǐ néng huà chū bù tóng de yán sè, yě néng ràng mǎ liáng huà de huà chéng zhēn",
        meaning: "The magic brush could draw different colours and could make what Ma Liang painted come true.",
        solution: {
          method: "Describe both characteristics — make sure to include all two points.",
          steps: [
            "The old man's words: '它能画出不同的颜色，也能让你画的画成真'.",
            "Write down both special things about the brush: ① it can draw different colours, and ② the drawings it makes become real.",
            "This is a reported-speech answer, so change the pronoun from '你' to '马良' or '他'.",
          ],
          tip: "'有什么特别的地方' is asking for all the special features — if there are two points, make sure you write both.",
        },
      },
      {
        id: "p3_zh_wa3_tn3_032",
        type: "OpenEnded",
        q: "你觉得马良是一个怎样的孩子？为什么？（2分）",
        answer:
          "我觉得马良是一个乐于助人的孩子。因为有人的羊不见了，马良就给他画一只羊；谁家没水牛帮忙种田，马良就画一头水牛送给那家人。",
        pinyin:
          "wǒ jué de mǎ liáng shì yí gè lè yú zhù rén de hái zi. yīn wèi yǒu rén de yáng bú jiàn le, mǎ liáng jiù gěi tā huà yì zhī yáng; shéi jiā méi shuǐ niú bāng máng zhòng tián, mǎ liáng jiù huà yì tóu shuǐ niú sòng gěi nà jiā rén.",
        meaning: "I think Ma Liang is a helpful child, because when someone lost a sheep he drew one for them, and when a family had no buffalo to plough, he drew one and gave it to them.",
        solution: {
          method: "Evaluation + Text Evidence Question — Two separate sub-questions",
          steps: [
            "First part: Describe the character's personality → e.g. 乐于助人 (always willing to help others).",
            "Second part: Prove it using a specific example from the passage (e.g. drew a sheep and a water buffalo for others).",
            "Make sure you answer BOTH parts (怎样 + 为什么) fully.",
          ],
          tip: "The describing word for '怎样的孩子' must come directly from the character's actions in the passage (e.g. 乐于助人 / 孝顺 / 诚实).",
        },
      },
      {
        id: "p3_zh_wa3_tn3_033",
        type: "OpenEnded",
        q: "如果你有一支神笔，你会怎么做？请举例说明。（2分）",
        answer:
          "如果我有一支神笔，我会帮助有需要的人。我会画房子，给那些没钱买房子的人，让他们有地方住。",
        pinyin:
          "rú guǒ wǒ yǒu yì zhī shén bǐ, wǒ huì bāng zhù yǒu xū yào de rén. wǒ huì huà fáng zi, gěi nà xiē méi qián mǎi fáng zi de rén, ràng tā men yǒu dì fāng zhù.",
        meaning: "If I had a magic brush, I would help people in need. I would draw houses for those who can't afford one, so they'd have a place to live. (Open answer — example provided.)",
        solution: {
          method: "Imagination + Example Question (Open-ended) — '如果…我会… + give an example'",
          steps: [
            "Start with '如果我有…，我会…' to show what you would do.",
            "Since the question says '请举例说明', give a specific example (e.g. a house / a school bag).",
            "It is even better if your answer matches the theme of the passage (乐于助人 — helping others).",
          ],
          tip: "For open-ended questions, you just need the correct sentence structure + a specific example to get full marks. The model answer is only one possible answer.",
        },
      },
    ],
  },
];

export default wa3_taonan_supp3_2024;
