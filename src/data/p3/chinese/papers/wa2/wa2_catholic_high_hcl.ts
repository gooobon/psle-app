// =============================================================================
// P3 Chinese WA2 — Catholic High School (Primary) (公教中学 附小) Higher Chinese
// 三年级高级华文 计分式评价二 (Weighted Assessment 2) · 30 marks, 15 questions
// (Year not printed.)  Source: sgexam.com
// -----------------------------------------------------------------------------
// IDs namespaced with `_chs_` (Catholic High School).
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 扩写句子 / open-ended: `answer` is model-answer text.
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

export const wa2CatholicHighHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_catholic_high_hcl",
    school: "Catholic High School (Primary)",
    schoolZh: "公教中学（附小）",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "计分式评价二 (Weighted Assessment 2, year not printed)",
    source: "sgexam.com — Catholic High (Primary) WA2 (answers verified by official key)",
    totalMarks: 30,
  },
  items: [
    // 一、语文应用 (7题14分) — Q1–Q3 BianZi, Q4–Q7 CiYu
    {
      id: "p3_zh_wa2_chs_001", topic: "BianZi", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "妹妹（　）着外婆去巴刹买菜。", options: ["根", "跟", "腿", "很"], answer: 1,
      pinyin: "Mèimei gēn zhe wàipó qù bāshā mǎi cài.",
      meaning: "Little sister followed grandma to the market to buy groceries.",
      solution: { method: "Find the verb for 'follow'.", steps: ["（　）着外婆 → 跟着 (follow) → 跟."], tip: "跟 = follow; 根(root)/腿(leg)/很(very) don't fit." },
    },
    {
      id: "p3_zh_wa2_chs_002", topic: "BianZi", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "丽花每个星期天早上都要去上演（　）课。", options: ["艺", "意", "衣", "医"], answer: 0,
      pinyin: "Lìhuā měi ge xīngqītiān zǎoshang dōu yào qù shàng yǎnyì kè.",
      meaning: "Lihua goes to performing-arts class every Sunday morning.",
      solution: { method: "Form the word 演艺.", steps: ["演（　）课 → 演艺课 (performing arts) → 艺."], tip: "艺 = art/skill (演艺 = performing arts)." },
    },
    {
      id: "p3_zh_wa2_chs_003", topic: "BianZi", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "小华给妈妈留了一张（　）条，告诉妈妈他去打球。", options: ["变", "边", "便", "遍"], answer: 2,
      pinyin: "Xiǎo Huá gěi māma liú le yì zhāng biàntiáo, gàosu māma tā qù dǎqiú.",
      meaning: "Xiao Hua left mum a note telling her he had gone to play ball.",
      solution: { method: "Form the word 便条.", steps: ["一张（　）条 → 便条 (note) → 便."], tip: "便条 = a short note; 便 (biàn) here." },
    },
    {
      id: "p3_zh_wa2_chs_004", topic: "CiYu", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "哥哥向妈妈认错，妈妈（　）了他。", options: ["帮助", "陪伴", "改掉", "原谅"], answer: 3,
      pinyin: "Gēge xiàng māma rèncuò, māma yuánliàng le tā.",
      meaning: "Big brother admitted his mistake to mum, and mum forgave him.",
      solution: { method: "What does mum do after the apology?", steps: ["认错后，妈妈（　）了他 → 原谅 (forgive) → 原谅."], tip: "原谅 = forgive." },
    },
    {
      id: "p3_zh_wa2_chs_005", topic: "CiYu", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "爸爸不在家，他（　）去上班了。", options: ["马上", "正在", "刚刚", "总是"], answer: 2,
      pinyin: "Bàba bú zài jiā, tā gānggāng qù shàngbān le.",
      meaning: "Dad isn't home; he just left for work.",
      solution: { method: "He is already gone, so when did he leave?", steps: ["不在家 + 去上班了 → 刚刚 (just now) → 刚刚."], tip: "刚刚…了 = just did (something) a moment ago." },
    },
    {
      id: "p3_zh_wa2_chs_006", topic: "CiYu", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "哥哥很少生病，因为他天天做运动，身体很（　）。", options: ["健康", "能干", "高大", "合适"], answer: 0,
      pinyin: "Gēge hěn shǎo shēngbìng, yīnwèi tā tiāntiān zuò yùndòng, shēntǐ hěn jiànkāng.",
      meaning: "Big brother rarely falls ill because he exercises daily and is very healthy.",
      solution: { method: "Describe a body that rarely gets sick.", steps: ["天天运动 → 身体很健康 → 健康."], tip: "身体健康 = healthy; 能干/高大/合适 don't fit 身体." },
    },
    {
      id: "p3_zh_wa2_chs_007", topic: "CiYu", difficulty: "core",
      instruction: "请从提供的选项中选出正确的答案。",
      q: "时间不早了，你（　）收拾东西，我们回家了。", options: ["有时", "一直", "连忙", "赶快"], answer: 3,
      pinyin: "Shíjiān bù zǎo le, nǐ gǎnkuài shōushi dōngxi, wǒmen huíjiā le.",
      meaning: "It's getting late; hurry and pack up — we're going home.",
      solution: { method: "It's late, so urge speed.", steps: ["时间不早了 → （　）收拾 → 赶快 (hurry) → 赶快."], tip: "赶快 = hurry up (urging quick action)." },
    },

    // 二、扩写句子 (4题8分) — JuZi
    {
      id: "p3_zh_wa2_chs_008", topic: "JuZi", difficulty: "core",
      instruction: "把括号里的短语加在句子中适当的地方。",
      q: "地上有一些头发。（卷卷的）", answer: "地上有一些卷卷的头发。",
      pinyin: "Dìshàng yǒu yìxiē juǎnjuǎn de tóufa.",
      meaning: "There is some curly hair on the floor.",
      solution: { method: "Place the describing phrase before the noun.", steps: ["卷卷的 describes 头发 → before 头发."], tip: "…的 adjective goes right before the noun." },
    },
    {
      id: "p3_zh_wa2_chs_009", topic: "JuZi", difficulty: "core",
      instruction: "把括号里的短语加在句子中适当的地方。",
      q: "弟弟说爸爸要带他去动物园。（高兴地）", answer: "弟弟高兴地说爸爸要带他去动物园。",
      pinyin: "Dìdi gāoxìng de shuō bàba yào dài tā qù dòngwùyuán.",
      meaning: "Little brother happily said dad would take him to the zoo.",
      solution: { method: "Place the manner phrase before the verb 说.", steps: ["高兴地 describes how he said it → before 说."], tip: "…地 adverb goes before the verb." },
    },
    {
      id: "p3_zh_wa2_chs_010", topic: "JuZi", difficulty: "core",
      instruction: "把括号里的短语加在句子中适当的地方。",
      q: "爷爷在房间休息，奶奶推开房门。（轻轻地）", answer: "爷爷在房间休息，奶奶轻轻地推开房门。",
      pinyin: "Yéye zài fángjiān xiūxi, nǎinai qīngqīng de tuī kāi fángmén.",
      meaning: "Grandpa was resting in the room, and grandma gently pushed the door open.",
      solution: { method: "Place 轻轻地 before the verb 推开.", steps: ["轻轻地 describes how she pushed → before 推开房门."], tip: "Put the …地 phrase right before the action." },
    },
    {
      id: "p3_zh_wa2_chs_011", topic: "JuZi", difficulty: "core",
      instruction: "把括号里的短语加在句子中适当的地方。",
      q: "弟弟把掉在地上的水果捡起来。（一个一个地）", answer: "弟弟把掉在地上的水果一个一个地捡起来。",
      pinyin: "Dìdi bǎ diào zài dìshàng de shuǐguǒ yí ge yí ge de jiǎn qǐlái.",
      meaning: "Little brother picked up the fruit that fell on the floor one by one.",
      solution: { method: "Place 一个一个地 before the verb 捡.", steps: ["一个一个地 describes how he picked them up → before 捡起来."], tip: "The manner phrase goes just before the verb." },
    },

    // 三、阅读理解 (4题8分) — reading set (文文背错书包): Q12–Q14 MCQ + Q15 open
    {
      id: "p3_zh_wa2_chs_set1", topic: "YueReadMCQ", difficulty: "core",
      setLabel: "公教中学（附小）P3 HCL WA2 — 阅读理解（文文背错书包）",
      instruction: "根据短文的内容，回答下列问题。",
      passage:
        "最后一节是音乐课。一下课，文文就立刻走出音乐室，背着书包跑回家去。文文一边跑，一边想：今天功课很多，我一定要在傍晚前做完，才可以玩电脑游戏。\n\n" +
        "回到了家，文文打开书包，发现文具盒不是他的。他又把活动本拿出来，看到上面写着“小华”。原来文文背错了小华的书包。小华的书包和文文的一样，都是蓝色的。\n\n" +
        "这时，电话响了。文文接起电话，听到小华问：“文文，请问你是不是不小心拿错了我的书包？”\n\n" +
        "文文很不好意思地说：“是啊！你的书包在我这里。对不起，是我不好，放学后我赶着回家，没发现我拿错了书包。”\n\n" +
        "小华说：“没关系，你不是故意的，下次要小心点儿。”",
      questions: [
        { id: "p3_zh_wa2_chs_012", type: "MCQ", q: "为什么文文放学后要立刻回家？",
          options: ["因为文文要回家上音乐课。", "因为文文有很多功课要做。", "因为文文傍晚要去小华的家。", "因为文文要马上玩电脑游戏。"],
          answer: 1,
          pinyin: "Wèishéme Wénwen fàngxué hòu yào lìkè huíjiā?",
          meaning: "Why did Wenwen go straight home after school?",
          solution: { method: "Read his thoughts while running.", steps: ["今天功课很多，要在傍晚前做完 → 有很多功课要做."], tip: "Playing games is only after the homework is done." } },
        { id: "p3_zh_wa2_chs_013", type: "MCQ", q: "文文怎么知道自己背错了书包？",
          options: ["小华发现活动本上写着“文文”。", "文文看到文具盒和活动本不是他的。", "文文打电话问小华是不是背错了书包。", "小华告诉文文他们的书包都是蓝色的。"],
          answer: 1,
          pinyin: "Wénwen zěnme zhīdào zìjǐ bèi cuò le shūbāo?",
          meaning: "How did Wenwen realise he had taken the wrong bag?",
          solution: { method: "Read what he found at home.", steps: ["文具盒不是他的，活动本写着‘小华’ → 看到文具盒和活动本不是他的."], tip: "He discovered it himself before the call." } },
        { id: "p3_zh_wa2_chs_014", type: "MCQ", q: "为什么文文会背错书包？",
          options: ["因为文文放学后赶着回家。", "因为文文立刻走出音乐室。", "因为文文的书包被小华故意背走了。", "因为文文上的最后一节课是音乐课。"],
          answer: 0,
          pinyin: "Wèishéme Wénwen huì bèi cuò shūbāo?",
          meaning: "Why did Wenwen take the wrong bag?",
          solution: { method: "Read Wenwen's own explanation.", steps: ["他说：放学后我赶着回家，没发现拿错了书包 → 赶着回家."], tip: "The bags look identical, but the cause he gives is rushing home." } },
        { id: "p3_zh_wa2_chs_015", type: "OpenEnded", q: "从哪里可以看出小华不怪文文？（2分）",
          answer: "从小华说“没关系，你不是故意的，下次要小心点儿。”可以看出小华不怪文文。",
          pinyin: "Cóng nǎlǐ kěyǐ kàn chū Xiǎo Huá bú guài Wénwen?",
          meaning: "How can we tell that Xiao Hua didn't blame Wenwen?",
          solution: { method: "Quote Xiao Hua's reply.", steps: ["小华说‘没关系，你不是故意的’ → shows he didn't blame him."], tip: "Point to Xiao Hua's forgiving words." } },
      ],
    },
  ],
};

export default wa2CatholicHighHcl;
