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
      method: "동음·유사형(同音形近字) 변별 — 의미부 '氵(물)'",
      steps: [
        "나뭇잎을 작은 배로 띄울 '곳' → 물이 있는 강.",
        "'河'는 물 부수 '氵'를 가져 '강'을 뜻한다.",
        "可/何/阿는 물과 무관해 제외.",
      ],
      tip: "물과 관련된 글자엔 ‘氵’가 붙는다 → 河, 海, 池.",
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
      method: "유사형 글자 변별 + 단어 '环境' 인식",
      steps: [
        "'___境清洁'에서 '환경'이라는 단어가 필요 → 环境.",
        "'环(고리·환경)'을 고른다.",
        "杯(컵)·怀(품다)·坏(나쁘다)는 의미가 맞지 않음.",
      ],
      tip: "环(둥글 환)과 坏(나쁠 괴)는 모양이 비슷하니 주의.",
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
      method: "문맥에 맞는 동사 고르기",
      steps: [
        "해가 동쪽에서 하는 동작 → '떠오르다/올라오다'.",
        "'升上来'가 자연스럽다.",
        "举(들다)·走(걷다)·飞(날다)는 해의 동작으로 부적절.",
      ],
      tip: "해·달·기온이 오를 때 ‘升’을 쓴다 → 上升, 升起.",
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
      method: "동사+목적어 호응",
      steps: [
        "차(车子)에 대한 동작 → '주차하다/세우다'.",
        "'把车子停好'가 정확한 표현.",
        "位·休·付는 '车子'와 호응하지 않음.",
      ],
      tip: "‘把…停好’는 ‘잘 ~해 두다’의 把자문 구조.",
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
      method: "문맥 동작 동사 고르기 (扌 부수)",
      steps: [
        "고장 난(坏了) 물병을 '버리는' 동작 → 扔掉.",
        "'扔'을 고른다.",
        "拔(뽑다)·打(치다)·拍(두드리다)는 '버리다' 뜻이 아님.",
      ],
      tip: "‘扔掉’는 ‘버려 없애다’라는 결과보어 구조.",
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
      method: "다음자(多音字) '重'과 '量' 성조 판별",
      steps: [
        "'重'은 '무겁다'일 때 zhòng, '다시/거듭'일 때 chóng.",
        "여기선 '무게(重量)'이므로 zhòng.",
        "'量'은 명사 '양/무게'일 때 liàng(4성).",
        "→ zhòng liàng.",
      ],
      tip: "重量(무게)=zhòngliàng, 重复(반복)=chóngfù. 뜻으로 음을 가른다.",
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
      method: "권설음(zh)·운모(an) 정확히 듣기",
      steps: [
        "'竹'은 권설음 zhú (zú 아님).",
        "'竿'은 gān (gāng 아님, 비음운미 없음).",
        "→ zhú gān.",
      ],
      tip: "z/zh, n/ng 구분이 핵심. 竹=zhú, 竿=gān.",
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
      method: "전치사성 동사 의미 매칭",
      steps: [
        "'___ 书上的方法去做' → 방법'대로/에 따라' 한다.",
        "'按照(~에 따라)'가 '方法'와 호응.",
        "听从(따르다·사람말), 答应(승낙), 想象(상상)은 부적절.",
      ],
      tip: "‘按照+방법/规定/顺序’ 형태로 자주 쓰인다.",
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
      method: "상황(바람) 단서로 동사 고르기",
      steps: [
        "강한 바람에 작은 나무가 하는 동작 → 좌우로 '흔들리다'.",
        "'摇摆'가 적합.",
        "变化(변하다), 下沉(가라앉다), 活动(활동하다)은 부적절.",
      ],
      tip: "바람·물결에 흔들리는 모습은 ‘摇摆 / 摇晃’.",
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
      method: "근접 의미어(近义词) 변별",
      steps: [
        "문제(구덩이에 빠진 강아지)를 '해결하는 방법' → 办法.",
        "说法(견해·표현), 看法(관점), 做法(처리 방식)은 '해결책' 뉘앙스가 약함.",
        "'想到一个好办法'가 정해진 표현.",
      ],
      tip: "문제 해결의 ‘방법’엔 ‘办法’가 1순위 — 想办法/好办法.",
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
      method: "단서 '终于(마침내)'로 추론",
      steps: [
        "밤새 고민한(想了一个晚上) 끝에 '마침내(终于)' 하는 행동 → '결정하다'.",
        "'决定出国读书'가 자연스럽다.",
        "想象(상상), 建议(제안), 觉得(느끼다)는 '终于' 뒤 결단과 부적합.",
      ],
      tip: "‘终于’ 뒤에는 결정·완성 같은 결과 동사가 잘 온다.",
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
      method: "동사+명사 호응",
      steps: [
        "'保持(유지하다)' 뒤에 올 상태 명사 필요.",
        "'健康(건강)'이 호응 → 保持健康.",
      ],
      tip: "保持+健康/清洁/安静 처럼 ‘상태’가 목적어.",
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
      method: "동사+명사 호응",
      steps: [
        "'客人(손님)' 앞에 올 동작 → '맞이하다/응대하다'.",
        "'招呼'가 호응 → 招呼客人.",
      ],
      tip: "손님을 ‘맞이/응대’할 때 ‘招呼客人 / 接待客人’.",
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
      method: "연속 동작 짝짓기",
      steps: [
        "'转身(몸을 돌리다)' 다음 자연스러운 동작 → '떠나다'.",
        "'离开'가 호응 → 转身离开.",
      ],
      tip: "‘转身离开’는 ‘몸을 돌려 떠나다’의 굳어진 연속동작.",
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
      method: "동사+결과보어 짝짓기",
      steps: [
        "'___ 干净(깨끗하게 ~하다)'의 동사 자리.",
        "'清洗(씻다)'가 '干净'과 결과보어로 호응 → 清洗干净.",
      ],
      tip: "‘동사+干净’은 결과보어 — 洗干净, 擦干净, 打扫干净.",
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
      method: "동사+명사 호응",
      steps: [
        "'想出(생각해 내다)' 뒤 목적어 → '방법'.",
        "'办法'가 호응 → 想出办法.",
      ],
      tip: "‘想出’의 단골 목적어: 办法 / 主意.",
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
      method: "인과 관계 접속사 '因为'로 두 문장 합치기",
      steps: [
        "결과 문장(去不了)을 앞에, 원인(下雨了)을 '因为' 뒤에 둔다.",
        "공통 시간어 '今天'은 한 번만 쓴다.",
        "→ 今天我们不能去外婆的家，因为下雨了。",
      ],
      tip: "‘결과, 因为 원인’ 또는 ‘因为 원인, 所以 결과’ 둘 다 가능.",
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
      method: "인과 접속사 '因为' + 중복 주어 생략",
      steps: [
        "앞 문장(…是不对的)을 결과로, 뒤 문장의 핵심(会吵到别人)을 이유로.",
        "반복되는 '在图书馆里大声说话'는 두 번째에선 생략.",
        "→ …是不对的，因为会吵到别人。",
      ],
      tip: "같은 주어/주제는 ‘因为’ 절에서 생략해 간결하게.",
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
      method: "직접화법 → 겸어문(兼语句) '叫' 전환",
      steps: [
        "명령형 인용을 '叫 + 사람 + 동작'의 겸어문으로 바꾼다.",
        "'对妹妹说：“…”' → '叫妹妹 把书桌收拾干净'.",
        "따옴표와 호칭 '妹妹，'는 제거.",
      ],
      tip: "‘叫/让/请 + 대상 + 동사’ — 시키는 말은 따옴표 없이 평서문으로.",
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
      method: "직접화법 → 간접화법(转述句) '告诉' 전환",
      steps: [
        "'说：“…”' → '告诉大家 …'로 바꾼다.",
        "지시어·인칭 변환: 这→那, 我→他.",
        "→ 小明告诉大家那是他最喜欢的一本书。",
      ],
      tip: "간접화법 전환 시 ‘这→那, 我→他/她, 你→대상’으로 인칭·지시어를 꼭 바꾼다.",
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
          method: "갑작스러운 변화 단서",
          steps: [
            "가게를 막 나오자마자(刚走出店门) 비가 옴 → 예상 밖·갑작스러움.",
            "'突然下起了大雨'가 자연스럽다.",
            "→ 1 突然.",
          ],
          tip: "예고 없이 시작되는 비/사건엔 ‘突然’.",
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
          method: "동사 자리 + 뒤 목적어 '要怎样回家'",
          steps: [
            "'어떻게 집에 갈지'를 함께 '의논하다'.",
            "'商量(상의하다)'가 호응.",
            "→ 3 商量.",
          ],
          tip: "두 사람이 방법을 정하려 ‘의논’할 땐 ‘商量’.",
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
          method: "‘一个好___’ 명사 자리",
          steps: [
            "'好(좋은)' 뒤, 양사 '一个' 뒤에 올 명사 → '아이디어'.",
            "'一个好主意'가 굳어진 표현.",
            "→ 6 主意.",
          ],
          tip: "‘一个好主意 / 想个好办法’ 형태로 자주 출제.",
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
          method: "부사 자리 + 즉시성",
          steps: [
            "비옷을 입자마자(穿上雨衣后) 바로 한 행동.",
            "'立刻(즉시)'가 동사 '跑' 앞에서 호응.",
            "→ 5 立刻.",
          ],
          tip: "‘…后, 立刻/马上 + 동사’는 즉각 행동 패턴.",
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
          method: "세부정보 — 함정 구분",
          steps: [
            "1문장: '叔叔送了一个鸟笼给他' → 선물은 새장.",
            "小鸟는 '小明到屋外捉了' 즉 스스로 잡은 것이지 선물이 아님.",
            "→ (2) 一个鸟笼.",
          ],
          tip: "‘선물 vs 본인이 마련한 것’을 헷갈리지 않게 동사를 확인한다.",
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
          method: "원인 찾기 — 엄마 대사 인용",
          steps: [
            "엄마 말: '它会失去自由而变得不开心'.",
            "핵심은 '자유를 잃는다(失去自由)'.",
            "→ (3) 小鸟会失去自由.",
          ],
          tip: "인물의 ‘말’에 이유가 직접 들어있는 경우가 많다.",
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
          method: "원인 찾기 — 직접 진술",
          steps: [
            "2문단: '他连忙打开笼子，想看看小鸟是不是生病了'.",
            "→ (4) 想看小鸟是不是生病了.",
            "결과적으로 새가 날아간 것은 의도가 아님(没想到).",
          ],
          tip: "‘想/为了 + 행동’에 목적(원인)이 드러난다.",
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
          method: "전체 주제 파악(总结题) — 오답 소거",
          steps: [
            "마지막 문단: '小鸟并没有生病，只是想逃出鸟笼' → (1) 병사 X.",
            "새가 안 먹은 건 '자유가 없어서'이지 벌레를 싫어해서가 아님 → (2) X.",
            "새는 새장을 나가고 싶어함 → (3) X, (4) O.",
          ],
          tip: "‘正确한 문장 고르기’는 본문과 하나씩 대조해 소거한다.",
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
          method: "동의어 찾기(找近义词) — 본문에서 단어 추출",
          steps: [
            "'真的发生了(정말로 일어났다)'에 해당하는 말 찾기.",
            "본문: '蚊子果然都飞到了他身上'.",
            "→ 果然.",
          ],
          tip: "‘果然’ = 예상대로 진짜 그렇게 됨.",
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
          method: "동의어 찾기(找近义词)",
          steps: [
            "'舍不得(아까워하다/안쓰러워하다)'와 통하는 말 찾기.",
            "본문: '妈妈…心疼地问阿宝'.",
            "→ 心疼.",
          ],
          tip: "‘心疼’은 사랑하는 이가 아파/고생할 때 안쓰러운 마음.",
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
          method: "원인 서술형 — '因为' 인용",
          steps: [
            "1문단: '阿宝五六岁时就常常跟着父母去田里帮忙'이 칭찬 이유.",
            "'为什么' 질문 → '因为…'로 답한다.",
          ],
          tip: "원인 답은 본문 문장을 거의 그대로 옮겨 적으면 안전하다.",
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
          method: "원인 서술형",
          steps: [
            "2문단: '到了夏天就会被又大又黑的蚊子咬得整晚都睡不好'.",
            "가난해서 蚊帐(모기장)을 못 사는 점도 배경이지만, 직접 원인은 모기에 물려서.",
          ],
          tip: "‘什么事令…’도 결국 원인 질문 → 핵심 사건(蚊子咬)을 답에 담는다.",
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
          method: "반응(행동) 직접 서술 — '为什么' 아님에 주의",
          steps: [
            "질문이 '有什么反应'이므로 '因为'로 답하지 않는다(아빠·엄마의 행동을 그대로).",
            "3문단: '赶紧把阿宝身上的蚊子全都赶跑了'.",
            "→ 그 행동을 그대로 적는다.",
          ],
          tip: "‘有什么反应’ 유형은 인물의 ‘행동/반응’을 직서술. 이유 설명 X.",
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
          method: "평가+근거형 — 두 소문항 분리 답변(孝顺 주제 연결)",
          steps: [
            "앞: 인물 평가 → '我认为阿宝是一个心疼父母/孝顺的孩子'.",
            "뒤: 본문 속 구체 사례로 증명 → 光着上身睡在父母身旁让蚊子咬自己.",
            "두 부분(怎样 + 为什么)을 모두 채워야 만점.",
          ],
          tip: "‘怎样의 孩子 + 为什么’는 ‘성격평가 + 본문 근거’ 세트로 답한다.",
        },
      },
    ],
  },
];

export default wa3_taonan_supp5_2025;
