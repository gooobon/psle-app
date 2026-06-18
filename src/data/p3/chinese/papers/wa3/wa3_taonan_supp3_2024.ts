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
      method: "동음·형근자(同音形近字) 변별 — '走之旁(辶)'",
      steps: [
        "걸어서 갈 수 있을 만큼 '가깝다' → 近.",
        "进(들어가다)·金(금)·今(지금)은 의미 부적합.",
        "'近'은 거리를 뜻하는 '辶(쉬엄쉬엄 갈 착)' 부수.",
      ],
      tip: "近(가깝다) ↔ 远(멀다). 进(들어가다)와 모양이 비슷하니 주의.",
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
      method: "단어 '准备' 인식",
      steps: [
        "수업 전에 교재·문구를 '준비'하는 상황.",
        "'准备'가 필요하므로 '准'.",
        "难(어렵다)·谁(누구)·推(밀다)는 부적합.",
      ],
      tip: "准(준할 준)과 难(어려울 난)은 우측 모양이 비슷하니 주의.",
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
      method: "문맥 동작 동사 — 빨리 달리다 '부딪치다'",
      steps: [
        "빨리 달리다 실수로 사람과 '부딪치다' → 撞.",
        "追(쫓다)·跳(뛰다)·跌(넘어지다)는 '到了小明'과 부적합.",
      ],
      tip: "사람·물체에 부딪칠 땐 ‘撞’ (撞到/撞上).",
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
      method: "단어 인식 — '책을 사는 장소/행사'",
      steps: [
        "이야기책을 사는 곳/행사 → 书展(도서전).",
        "보기 중 '展(펼칠 전)'이 '书展'을 이룬다.",
        "尾(꼬리)·屋(집)·居(거주)는 '책을 사다'와 어울리지 않음.",
      ],
      tip: "展览(전람)·书展(도서전)·画展(미술전)의 ‘展’.",
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
      method: "관용 표현 '不理(상대하지 않다)' 인식",
      steps: [
        "다툰 뒤 서로 '상대하지 않는다' → 谁也不理谁.",
        "'理'를 고른다(아는 척하다·상대하다의 부정).",
        "管(상관하다)도 비슷하나 '谁也不理谁'가 정해진 표현.",
      ],
      tip: "‘不理(无视)’ = 무시하다/상대 안 하다.",
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
      method: "성모(b)·운모(an) 정확히 듣기",
      steps: [
        "'傍'은 bàng (páng 아님).",
        "'晚'은 wǎn (wǎng 아님, 비음운미 없음).",
        "→ bàng wǎn.",
      ],
      tip: "傍晚(bàngwǎn)=해질녘. an/ang 구분이 핵심.",
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
      method: "성조 판별 — 跌(1성) 倒(3성)",
      steps: [
        "'跌'은 1성 diē (dié 아님).",
        "'倒(넘어지다)'는 3성 dǎo (dào 아님; 4성 dào는 ‘거꾸로/붓다’).",
        "→ diē dǎo.",
      ],
      tip: "倒: 넘어지다=dǎo(3성), 거꾸로/따르다=dào(4성). 뜻으로 성조 결정.",
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
      method: "장소 방문 동사 변별",
      steps: [
        "동물원 같은 '장소·시설'을 둘러보는 것 → 参观.",
        "访问(인터뷰·방문 사람), 拜访/看望(사람을 찾아뵙다)은 '장소'에 부적합.",
      ],
      tip: "장소·전시는 ‘参观’, 사람은 ‘拜访/看望’.",
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
      method: "문맥 의미 매칭 — '做错事→请求…'",
      steps: [
        "잘못한 뒤 엄마에게 '용서'를 청한다 → 原谅.",
        "明白(이해), 感谢(감사), 夸奖(칭찬)은 문맥에 안 맞음.",
      ],
      tip: "잘못을 빌 땐 ‘请求原谅’.",
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
      method: "근접어 변별 — '채소·과일'과 호응",
      steps: [
        "야채·과일이 '싱싱하다' → 新鲜.",
        "新奇(신기하다), 清新(상쾌하다·공기), 清甜(맑고 달다)은 부적합.",
      ],
      tip: "음식이 싱싱할 땐 ‘新鲜’ (공기는 ‘清新’).",
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
      method: "'一份___的礼物' — 형용사 자리",
      steps: [
        "'礼物(선물)'를 꾸미는 형용사 → '특별한'.",
        "'特别的礼物'가 자연스럽다.",
        "特意/特地(부사: 일부러), 特色(특색·명사)은 '一份…的礼物' 자리에 부적합.",
      ],
      tip: "‘特意/特地’는 동사 앞 부사, ‘特别’은 명사 꾸미는 형용사로도 쓰임.",
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
      method: "부사어+동사 호응",
      steps: [
        "'复习(복습하다)' 앞에 올 말 → '열심히/진지하게'.",
        "'认真复习'이 표준 결합.",
      ],
      tip: "⚠ PDF 정답키 OCR과 불일치(키엔 5로 찍힘). ‘认真复习’이 문법상 정답이라 1로 두되 학부모 검수 권장.",
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
      method: "동사+명사 호응",
      steps: [
        "'身体(몸)'를 좌우로 '흔들다' → 摆动身体.",
        "다른 단어(比赛·国家·说话)는 '身体'와 호응 안 됨.",
      ],
      tip: "⚠ PDF 정답키 OCR과 불일치(키엔 2로 찍힘). ‘摆动身体’가 문법상 정답이라 3으로 두되 학부모 검수 권장.",
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
      method: "부사어+동사 호응",
      steps: [
        "'轻声(작은 소리로)' 뒤에 올 동작 → '말하다'.",
        "'轻声说话'가 표준 결합.",
      ],
      tip: "⚠ PDF 정답키 OCR과 불일치(키엔 3으로 찍힘). ‘轻声说话’가 문법상 정답이라 5로 두되 학부모 검수 권장.",
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
      method: "동사+명사 호응",
      steps: [
        "'爱护(아끼다·보호하다)'의 목적어 → 동물·반려동물.",
        "단어库에서 '宠物(반려동물)'이 호응.",
      ],
      tip: "(이 문항은 PDF 정답키와 일치: 6) 동식물을 아끼다 → 爱护.",
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
      method: "동사+명사 호응",
      steps: [
        "'参加(참가하다)'의 목적어 → 대회/시합.",
        "단어库에서 '比赛(경기)'가 호응 → 参加比赛.",
        "남은 '国家(나라)'는 미사용 함정어.",
      ],
      tip: "⚠ PDF 정답키 OCR과 불일치(키엔 4로 찍힘). ‘参加比赛’가 문법상 정답이라 2로 두되 학부모 검수 권장.",
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
      method: "선택 접속사 '或者'로 합치기 + 공통부 생략",
      steps: [
        "공통부 '放学后，同学们可以'를 한 번만 쓴다.",
        "두 선택지 '去操场打球'와 '去图书馆看书'를 '或者'로 잇는다.",
        "→ …可以去操场打球或者去图书馆看书。",
      ],
      tip: "장소·동작이 다르므로 ‘去…’를 두 번 다 살려 ‘或者’로 연결.",
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
      method: "강조 구문 '连…也…'로 합치기",
      steps: [
        "앞 사건(打破杯子)을 그대로 두고, 뒷 문장을 '连…也…' 강조구로.",
        "'一句对不起也没说' 앞에 '连'을 붙인다.",
        "→ …连一句对不起也没说。",
      ],
      tip: "‘连 A 也/都 B’ = A조차도 B하다(강조). ‘一句…也没…’와 자주 결합.",
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
      method: "문형 모방(仿写) — '除了 A，还 B'",
      steps: [
        "'除了 + 대상1，还 + 대상2' 틀을 유지한다.",
        "두 대상은 같은 범주여야 자연스럽다(예: 동물 猫/狮子).",
        "→ 除了猫，我还喜欢狮子。 (다른 정답도 가능)",
      ],
      tip: "仿写는 ‘틀만 같으면’ 내용은 자유. 같은 범주의 단어를 넣자.",
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
      method: "문형 모방(仿写) — '有的…，有的…'",
      steps: [
        "'장소 + 有很多人，有的在 A，有的在 B' 틀을 지킨다.",
        "두 동작은 그 장소에서 일어날 법한 것으로.",
        "→ 公园里…，有的在打太极，有的在跑步。 (다른 정답도 가능)",
      ],
      tip: "‘有的…有的…’는 여럿 중 일부씩 다른 행동을 나열할 때.",
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
          method: "행위자(坏人)의 다음 행동 추론",
          steps: [
            "나쁜 사람이 때리고 돈을 뺏은 뒤 하는 행동 → '달아나다'.",
            "'逃走'가 호응 → 5 逃走.",
          ],
          tip: "(PDF 정답키와 일치: 5) 범인이 도망칠 땐 ‘逃走’.",
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
          method: "부사어+동사 호응",
          steps: [
            "다친 사람을 보고 '서둘러' 다가가는 모습.",
            "'急忙走上前去'가 자연스럽다 → 1 急忙.",
          ],
          tip: "⚠ PDF 정답키 OCR과 불일치(키엔 3 清洁로 찍힘 — ‘清洁走上前’은 비문). ‘急忙’이 정답이라 1로 두되 학부모 검수 권장.",
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
          method: "동사+결과보어 '…干净' 호응",
          steps: [
            "상처(伤口)를 '깨끗이 씻다' → 清洗干净.",
            "'清洗'가 호응 → 4 清洗.",
          ],
          tip: "⚠ PDF 정답키 OCR과 불일치(키엔 2 准备로 찍힘 — ‘准备干净’은 비문). ‘清洗干净’이 정답이라 4로 두되 학부모 검수 권장.",
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
          method: "동사+'好了'(완료 결과) 호응",
          steps: [
            "밭에 나가기 전 음식을 '준비해 두다' → 准备好.",
            "'准备'가 호응 → 2 准备.",
          ],
          tip: "⚠ PDF 정답키 OCR과 불일치(키엔 6 出发로 찍힘 — ‘出发好了’은 비문). ‘准备好’가 정답이라 2로 두되 학부모 검수 권장.",
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
          method: "세부정보 추론",
          steps: [
            "강물이 마르자 花猫·猴子가 小狗에게 물을 구하러 옴.",
            "즉 동물들이 마실 물이 없어진 것이 불편.",
            "→ (1) 小动物没水喝.",
          ],
          tip: "‘求小狗给水喝’가 ‘물 부족’의 직접 단서.",
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
          method: "직접 정보 찾기",
          steps: [
            "1문장: '只有小狗家里的井还有水'.",
            "→ (1) 它家里的井还有水.",
          ],
          tip: "‘只有…还有水’ 구문에 답이 그대로 있다.",
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
          method: "근거 찾기 — '不为别人着想'의 행동",
          steps: [
            "이웃이 물을 청했지만 '不可以'라며 쫓아냄.",
            "남을 배려하지 않는 행동 = 물을 안 줌.",
            "→ (3) 它不让邻居来喝水.",
          ],
          tip: "(4) 불 끄기 거부는 ‘결과적 피해’이지, 자발적 ‘안 줌’이 핵심 단서.",
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
          method: "주제·교훈 파악(主旨题)",
          steps: [
            "마지막 문장: '我只为自己着想，结果害了自己'.",
            "이기심이 자신을 해친다는 교훈.",
            "→ (4) 做人不能只为自己着想.",
          ],
          tip: "이야기 끝 인물의 ‘깨달음 대사’가 곧 교훈인 경우가 많다.",
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
          method: "동의어 찾기(找近义词)",
          steps: [
            "'好看(보기 좋다)'에 해당하는 말 찾기.",
            "본문: '交给马良一支漂亮的笔'.",
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
          method: "동의어/문맥어 찾기",
          steps: [
            "'动手做(직접 하기 시작하다)'와 통하는 본문 단어 찾기.",
            "본문: '这时，马良开始画风'.",
            "→ 开始.",
          ],
          tip: "‘动手’은 ‘일·행동을 시작함’ → 본문의 ‘开始’와 연결.",
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
          method: "원인 서술형 — '因为…所以…'",
          steps: [
            "1문단: '他很喜欢画画，可是没有钱买画笔'.",
            "그래서 나뭇가지로 땅에 그림.",
            "→ 因为…没钱买画笔，所以只能用树枝在地上画画.",
          ],
          tip: "‘喜欢 + 没钱’의 두 단서를 모두 답에 담는다.",
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
          method: "특징 두 가지 모두 서술",
          steps: [
            "노인의 말: '它能画出不同的颜色，也能让你画的画成真'.",
            "두 가지 특별함(① 색칠 ② 그림이 진짜가 됨)을 모두 적는다.",
            "전환 답이므로 '你→马良(他)'로 인칭 변경.",
          ],
          tip: "‘有什么特别的地方’은 특징을 빠짐없이 — 두 점이면 두 가지.",
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
          method: "평가+본문 근거형 — 두 소문항 분리",
          steps: [
            "앞: 성격 평가 → 乐于助人(남을 잘 돕는).",
            "뒤: 본문의 구체 사례(羊·水牛 그려 줌)로 증명.",
            "두 부분(怎样 + 为什么)을 모두 채운다.",
          ],
          tip: "‘怎样的孩子’ 평가어는 본문 행동에서 직접 끌어낸다(乐于助人/孝顺/诚实 등).",
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
          method: "상상+예시형(개방형) — '如果…我会… + 举例'",
          steps: [
            "'如果我有…，我会…'로 시작해 의도를 밝힌다.",
            "'请举例说明'이 있으므로 구체적 예(房子/책가방 등)를 든다.",
            "본문 주제(乐于助人)와 결을 맞추면 더 좋다.",
          ],
          tip: "개방형은 ‘틀 + 구체 예시’만 갖추면 정답. 모범답안은 한 예일 뿐.",
        },
      },
    ],
  },
];

export default wa3_taonan_supp3_2024;
