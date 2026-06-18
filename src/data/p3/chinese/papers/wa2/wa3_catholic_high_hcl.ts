// =============================================================================
// P3 Chinese — Catholic High School (Primary) (公教中学 附小) Higher Chinese
// 三年级高级华文 计分式评价三 (Weighted Assessment 3) · 30 marks, 14 questions
// (Year not printed.)  Source: sgexam.com
// >> ALL answers verified against the official ANSWER KEY (P124). <<
// -----------------------------------------------------------------------------
// IDs namespaced with `_chs_wa3_` (Catholic High School WA3).
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 短文填空: sub-question MCQ whose `options` = the shared wordBank.
//   - 组句成段 (Q10): single ordering question; `answer` = position numbers for the
//     four sentences in displayed order, e.g. "3,1,4,2".
//   - Open-ended: `answer` is model-answer text.
// =============================================================================

export type Difficulty = "foundation" | "core" | "stretch";
export type ChineseTopic =
  | "PinYin" | "BianZi" | "CiYu" | "KanTu" | "PeiDui"
  | "TianKong" | "JuZi" | "ZuJu" | "YueReadMCQ" | "YueReadOpen";
export interface Solution { method: string; steps: string[]; tip: string; }
export interface SingleQuestion {
  id: string; topic: ChineseTopic; difficulty: Difficulty; instruction: string;
  q: string; options?: string[]; answer: number | string; imageHint?: string;
  pinyin: string; meaning: string; solution: Solution;
}
export interface SetSubQuestion {
  id: string; type: "MCQ" | "OpenEnded"; q: string; options?: string[];
  answer: number | string; imageHint?: string;
  pinyin: string; meaning: string; solution: Solution;
}
export interface SetQuestion {
  id: string; topic: ChineseTopic; difficulty: Difficulty; setLabel: string;
  instruction?: string; passage?: string; wordBank?: string[]; questions: SetSubQuestion[];
}
export type ChineseItem = SingleQuestion | SetQuestion;
export interface PaperMeta {
  paperId: string; school: string; schoolZh: string; level: string;
  subject: string; term: string; source: string; totalMarks: number;
}
export interface ChinesePaper { meta: PaperMeta; items: ChineseItem[]; }

export const wa3CatholicHighHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa3_catholic_high_hcl",
    school: "Catholic High School (Primary)",
    schoolZh: "公教中学（附小）",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "计分式评价三 (Weighted Assessment 3, year not printed)",
    source: "sgexam.com — Catholic High (Primary) WA3 (answers verified by official key)",
    totalMarks: 30,
  },
  items: [
    // 一、语文应用 (6题12分) — Q1–Q3 BianZi, Q4–Q6 CiYu
    {
      id: "p3_zh_chs_wa3_001", topic: "BianZi", difficulty: "core",
      instruction: "从提供的选项中选出正确的答案。",
      q: "工人刚刚（　）洗地板，地板还是湿的。", options: ["请", "清", "情", "晴"], answer: 1,
      pinyin: "Gōngrén gānggāng qīngxǐ dìbǎn, dìbǎn háishi shī de.",
      meaning: "The worker just washed the floor, and the floor is still wet.",
      solution: { method: "Form the word 清洗.", steps: ["（　）洗地板 → 清洗 (wash clean) → 清."], tip: "清 (氵 water radical) for 清洗; 请/情/晴 don't fit." },
    },
    {
      id: "p3_zh_chs_wa3_002", topic: "BianZi", difficulty: "core",
      instruction: "从提供的选项中选出正确的答案。",
      q: "弟弟一整天都在玩电脑游戏，把时间都浪（　）了。", options: ["飞", "非", "废", "费"], answer: 3,
      pinyin: "Dìdi yì zhěng tiān dōu zài wán diànnǎo yóuxì, bǎ shíjiān dōu làngfèi le.",
      meaning: "Little brother played computer games all day and wasted all his time.",
      solution: { method: "Form the word 浪费.", steps: ["浪（　）→ 浪费 (waste) → 费."], tip: "浪费 = waste; 费 (with 贝, money) here." },
    },
    {
      id: "p3_zh_chs_wa3_003", topic: "BianZi", difficulty: "core",
      instruction: "从提供的选项中选出正确的答案。",
      q: "妈妈叫我去称一称这些水果的重（　）。", options: ["量", "亮", "谅", "辆"], answer: 0,
      pinyin: "Māma jiào wǒ qù chēng yi chēng zhèxiē shuǐguǒ de zhòngliàng.",
      meaning: "Mum asked me to weigh these fruits.",
      solution: { method: "Form the word 重量.", steps: ["称…的重（　）→ 重量 (weight) → 量."], tip: "重量 = weight; 量 (liàng) here." },
    },
    {
      id: "p3_zh_chs_wa3_004", topic: "CiYu", difficulty: "core",
      instruction: "从提供的选项中选出正确的答案。",
      q: "妹妹拿不到架子上的书，便（　）哥哥帮她拿。", options: ["相信", "答应", "请求", "决定"], answer: 2,
      pinyin: "Mèimei ná bú dào jiàzi shàng de shū, biàn qǐngqiú gēge bāng tā ná.",
      meaning: "Little sister couldn't reach the book on the shelf, so she asked big brother to get it for her.",
      solution: { method: "What does she do to get help?", steps: ["（　）哥哥帮她 → 请求 (ask/request) → 请求."], tip: "请求 = ask someone (to do something)." },
    },
    {
      id: "p3_zh_chs_wa3_005", topic: "CiYu", difficulty: "core",
      instruction: "从提供的选项中选出正确的答案。",
      q: "老师告诉我们（　）课室前，记得关灯。", options: ["准备", "离开", "溜走", "追上"], answer: 1,
      pinyin: "Lǎoshī gàosu wǒmen líkāi kèshì qián, jìde guān dēng.",
      meaning: "The teacher told us to remember to turn off the lights before leaving the classroom.",
      solution: { method: "What do you do before turning off lights?", steps: ["（　）课室前 → 离开 (leave) → 离开."], tip: "离开 = leave (a place)." },
    },
    {
      id: "p3_zh_chs_wa3_006", topic: "CiYu", difficulty: "stretch",
      instruction: "从提供的选项中选出正确的答案。",
      q: "（　）你把功课做完，就可以出去玩。", options: ["因为", "果然", "为了", "如果"], answer: 3,
      pinyin: "Rúguǒ nǐ bǎ gōngkè zuò wán, jiù kěyǐ chūqù wán.",
      meaning: "If you finish your homework, you can go out to play.",
      solution: { method: "Which connective pairs with 就 here?", steps: ["（　）…就… → 如果…就… (if…then…) → 如果."], tip: "如果…就… = if … then …" },
    },

    // 二、短文填空 (3题6分) — TianKong
    {
      id: "p3_zh_chs_wa3_set1", topic: "TianKong", difficulty: "core",
      setLabel: "公教中学（附小）P3 HCL WA3 — 短文填空（弟弟掉面包）",
      instruction: "根据短文的内容和上下文的意思，从表中选出适当的词语（数字 1-6）。",
      wordBank: ["引来", "碰到", "累", "连忙", "仔细", "脏"],
      passage:
        "星期天早上，我到公园去跑步。回到家后，我觉得很【Q7】，就坐下来休息。弟弟坐在我旁边读书。\n\n" +
        "这时，我发现地上有东西。我【Q8】地看，原来是一小块面包。我问弟弟：“这是你掉的吗？”弟弟不好意思地说：“是的，可是我不是故意的。”\n\n" +
        "我对弟弟说：“你快捡起来，不然会【Q9】虫子。爸爸妈妈会生气的。”弟弟听了，马上把面包捡起来丢进垃圾桶。",
      questions: [
        { id: "p3_zh_chs_wa3_007", type: "MCQ", q: "回到家后，我觉得很（　）。", options: ["引来","碰到","累","连忙","仔细","脏"], answer: 2,
          pinyin: "lèi", meaning: "tired",
          solution: { method: "How do you feel after running?", steps: ["跑步回来 → 觉得很累 → 累."], tip: "累 = tired." } },
        { id: "p3_zh_chs_wa3_008", type: "MCQ", q: "我（　）地看，原来是一小块面包。", options: ["引来","碰到","累","连忙","仔细","脏"], answer: 4,
          pinyin: "zǐxì", meaning: "carefully / closely",
          solution: { method: "How do you look to make out a small object?", steps: ["（　）地看 → 仔细地看 (look closely) → 仔细."], tip: "仔细 = careful/attentive." } },
        { id: "p3_zh_chs_wa3_009", type: "MCQ", q: "不然会（　）虫子。", options: ["引来","碰到","累","连忙","仔细","脏"], answer: 0,
          pinyin: "yǐnlái", meaning: "to attract / draw (insects)",
          solution: { method: "What does dropped food do to insects?", steps: ["不捡会（　）虫子 → 引来虫子 (attract bugs) → 引来."], tip: "引来 = attract/draw over." } },
      ],
    },

    // 三、组句成段 (4句4分) — ZuJu single ordering question (Q10)
    {
      id: "p3_zh_chs_wa3_010", topic: "ZuJu", difficulty: "stretch",
      instruction: "重新排列句子，组成合理的段落。在每句前的括号里填上顺序号（1-4）。",
      q:
        "为下面四句排序（句子按此顺序列出，答案为各句的顺序号）：\n" +
        "（甲）过后，我们找个座位坐下来，专心地看书。\n" +
        "（乙）今天最后一节华文课时，老师带我们去图书馆看书。\n" +
        "（丙）放学了，我们把书放回书架，老师看了，开心地笑了。\n" +
        "（丁）到了图书馆，我们先选自己爱看的书。",
      answer: "3,1,4,2",
      pinyin: "Zǔ jù chéng duàn (túshūguǎn kàn shū).",
      meaning: "Order the four sentences into a paragraph about going to the library to read.",
      solution: {
        method: "Follow the time order of the library trip.",
        steps: [
          "1: 乙 — 老师带我们去图书馆 (teacher takes us there).",
          "2: 丁 — 到了图书馆，先选书 (at the library, choose books).",
          "3: 甲 — 过后找座位坐下看书 (then sit and read).",
          "4: 丙 — 放学了把书放回书架 (after school, return books).",
          "So 甲乙丙丁 → 3,1,4,2.",
        ],
        tip: "Use the time clues: 今天…课时 → 到了 → 过后 → 放学了.",
      },
    },

    // 四、阅读理解 (4题8分) — reading set (文强收拾书包): Q11–Q12 MCQ + Q13–Q14 open
    {
      id: "p3_zh_chs_wa3_set2", topic: "YueReadMCQ", difficulty: "core",
      setLabel: "公教中学（附小）P3 HCL WA3 — 阅读理解（文强收拾书包）",
      instruction: "根据短文和上下文的意思，回答下列问题。",
      passage:
        "一天下午，文强做完功课后，便开始收拾书包。\n\n" +
        "文强先把笔和尺放进文具盒里，再把文具盒、故事书和课本放进书包。最后，他看身边没人，就拿起玩具车和游戏机，赶快把它们放进了书包里。\n\n" +
        "没想到，妈妈就站在身后，问道：“文强，你为什么把玩具车和游戏机放进书包里？”妈妈话还没说完，文强便笑着说：“它们也喜欢上课啊！”\n\n" +
        "听了文强的话，妈妈觉得又好气又好笑。她从书包里拿出了玩具车和游戏机，对文强说：“你还是在学校专心上课吧，它们会在家里等你回来！”文强不好意思地点了点头。",
      questions: [
        { id: "p3_zh_chs_wa3_011", type: "MCQ", q: "文强做完功课后又做了什么？",
          options: ["收拾书包", "玩游戏机", "读故事书", "找玩具车"], answer: 0,
          pinyin: "Wénqiáng zuò wán gōngkè hòu yòu zuò le shénme?",
          meaning: "What did Wenqiang do after finishing his homework?",
          solution: { method: "Read the first line.", steps: ["做完功课后，便开始收拾书包 → 收拾书包."], tip: "The answer is the very next action stated." } },
        { id: "p3_zh_chs_wa3_012", type: "MCQ", q: "为什么文强说“它们也喜欢上课啊！”？",
          options: ["因为文强的上课伙伴是玩具车和游戏机。", "因为文强想带玩具车和游戏机去学校玩。", "因为文强知道玩具车和游戏机也想学习。", "因为文强说了个玩具车和游戏机的笑话。"],
          answer: 1,
          pinyin: "Wèishéme Wénqiáng shuō “tāmen yě xǐhuan shàngkè a”?",
          meaning: "Why did Wenqiang say \"they also like going to class\"?",
          solution: { method: "Find his real motive.", steps: ["他偷偷把玩具放进书包 → 想带去学校玩，于是找借口说‘它们也喜欢上课’ → 想带玩具去学校玩."], tip: "It's an excuse — he really wanted to bring the toys to play." } },
        { id: "p3_zh_chs_wa3_013", type: "OpenEnded", q: "从哪里可以看出文强不想让妈妈知道他把玩具车和游戏机放进书包里？（2分）",
          answer: "从“最后，他看身边没人，就拿起玩具车和游戏机，赶快把它们放进了书包里。”可以看出文强不想让妈妈知道。",
          pinyin: "Cóng nǎlǐ kěyǐ kàn chū Wénqiáng bù xiǎng ràng māma zhīdào?",
          meaning: "How can we tell Wenqiang didn't want mum to know he put the toy car and game console in his bag?",
          solution: { method: "Quote the sneaky action.", steps: ["他看身边没人，就赶快把玩具放进书包 → shows he did it secretly."], tip: "Point to '看身边没人…赶快放进书包'." } },
        { id: "p3_zh_chs_wa3_014", type: "OpenEnded", q: "听了妈妈的话后，文强应该怎么做？（2分）",
          answer: "听了妈妈的话后，他应该把玩具车和游戏机留在家里，在学校专心上课。",
          pinyin: "Tīng le māma de huà hòu, Wénqiáng yīnggāi zěnme zuò?",
          meaning: "After hearing mum's words, what should Wenqiang do?",
          solution: { method: "Use mum's advice as the answer.", steps: ["把玩具留在家里，在学校专心上课."], tip: "Mum's words tell him exactly what he should do." } },
      ],
    },
  ],
};

export default wa3CatholicHighHcl;
