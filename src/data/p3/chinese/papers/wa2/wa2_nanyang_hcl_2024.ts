// =============================================================================
// P3 Chinese WA2 — Nanyang Primary School (南洋小学) Higher Chinese
// 2024 计分测试（二）/ Second Weighted Assessment · 语文应用与理解 · 45 min / 42 marks
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY. <<
// Distinct from the undated Nanyang paper (wa2_nanyang_hcl.ts): same format, NEW
// questions. IDs here namespaced `_ny24_`.  辨字 uses 3 options (①②③).
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配 / 词语选择 / 短文填空: sub-question MCQ whose options = the wordBank.
//   - 填写字词 (write from pinyin) & open-ended: `answer` is text.
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

export const wa2Nanyang2024Hcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_nanyang_2024_hcl",
    school: "Nanyang Primary School",
    schoolZh: "南洋小学",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2024 Second Weighted Assessment / 计分测试（二）— 语文应用与理解",
    source: "sgexam.com — Nanyang 2024 WA2 (answers verified by official key)",
    totalMarks: 42,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q5, 3 options)
    {
      id: "p3_zh_wa2_ny24_001", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "中秋节的月亮是（　）的。", options: ["元", "圆", "园"], answer: 1,
      pinyin: "Zhōngqiū jié de yuèliang shì yuán de.",
      meaning: "The mid-autumn moon is round.",
      solution: { method: "Which word means 'round'?", steps: ["月亮是（　）的 → 圆 (round) → 圆."], tip: "圆 = round; 元(yuan)/园(garden) don't fit." },
    },
    {
      id: "p3_zh_wa2_ny24_002", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "牙齿是身体最（　）的部分。", options: ["更", "硬", "便"], answer: 1,
      pinyin: "Yáchǐ shì shēntǐ zuì yìng de bùfen.",
      meaning: "Teeth are the hardest part of the body.",
      solution: { method: "Describe teeth.", steps: ["最（　）的部分 → 硬 (hard) → 硬."], tip: "硬 = hard; opposite of 软." },
    },
    {
      id: "p3_zh_wa2_ny24_003", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "妹妹的生日愿望（　）现了。", options: ["头", "空", "实"], answer: 2,
      pinyin: "Mèimei de shēngrì yuànwàng shíxiàn le.",
      meaning: "Little sister's birthday wish came true.",
      solution: { method: "Form the word 实现.", steps: ["愿望（　）现 → 实现 (come true) → 实."], tip: "实现 = realise/come true." },
    },
    {
      id: "p3_zh_wa2_ny24_004", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "姐姐做了蛋糕请我品（　）。", options: ["学", "常", "尝"], answer: 2,
      pinyin: "Jiějie zuò le dàngāo qǐng wǒ pǐncháng.",
      meaning: "Sister made a cake and invited me to taste it.",
      solution: { method: "Form the word 品尝.", steps: ["品（　）→ 品尝 (taste) → 尝."], tip: "品尝 = taste/savour (口 radical on 尝)." },
    },
    {
      id: "p3_zh_wa2_ny24_005", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "军人叔叔保（　）我们的国家。", options: ["为", "卫", "位"], answer: 1,
      pinyin: "Jūnrén shūshu bǎowèi wǒmen de guójiā.",
      meaning: "The soldier defends our country.",
      solution: { method: "Form the word 保卫.", steps: ["保（　）国家 → 保卫 (defend) → 卫."], tip: "保卫 = defend/protect (a country)." },
    },

    // 二、填写字词 — PinYin (write from pinyin) (Q6–Q9)
    {
      id: "p3_zh_wa2_ny24_006", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "李［ā yí］是妈妈的好朋友。", answer: "阿姨",
      pinyin: "āyí", meaning: "auntie",
      solution: { method: "Write the word for the pinyin.", steps: ["ā yí → 阿姨 (auntie)."], tip: "阿姨 = auntie (a friendly term for an adult woman)." },
    },
    {
      id: "p3_zh_wa2_ny24_007", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "小文的［yǎn jīng］又大又亮，真好看！", answer: "眼睛",
      pinyin: "yǎnjing", meaning: "eyes",
      solution: { method: "Write the word for the pinyin.", steps: ["yǎn jīng → 眼睛 (eyes)."], tip: "睛 has the 目 (eye) radical." },
    },
    {
      id: "p3_zh_wa2_ny24_008", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "我［xī wàng］这次的华文考试能得满分。", answer: "希望",
      pinyin: "xīwàng", meaning: "to hope",
      solution: { method: "Write the word for the pinyin.", steps: ["xī wàng → 希望 (hope)."], tip: "希望 = hope/wish." },
    },
    {
      id: "p3_zh_wa2_ny24_009", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "明华的身体非常［qiáng zhuàng］，能拿很重的东西。", answer: "强壮",
      pinyin: "qiángzhuàng", meaning: "strong / robust",
      solution: { method: "Write the word for the pinyin.", steps: ["qiáng zhuàng → 强壮 (strong)."], tip: "强壮 = strong/sturdy." },
    },

    // 三、词语搭配 — PeiDui (Q10–Q14)
    {
      id: "p3_zh_wa2_ny24_set1", topic: "PeiDui", difficulty: "core",
      setLabel: "南洋小学 P3 HCL WA2(2024) — 词语搭配",
      instruction: "选出正确的答案，把代表它的号码写在括号里。",
      wordBank: ["准时", "问题", "改掉", "原谅", "跌倒", "连忙"],
      questions: [
        { id: "p3_zh_wa2_ny24_010", type: "MCQ", q: "（　）受伤", options: ["准时","问题","改掉","原谅","跌倒","连忙"], answer: 4,
          pinyin: "diēdǎo shòushāng", meaning: "to fall and get injured",
          solution: { method: "What leads to 受伤?", steps: ["跌倒受伤 → 跌倒."], tip: "跌倒 = fall down." } },
        { id: "p3_zh_wa2_ny24_011", type: "MCQ", q: "回答（　）", options: ["准时","问题","改掉","原谅","跌倒","连忙"], answer: 1,
          pinyin: "huídá wèntí", meaning: "to answer a question",
          solution: { method: "What do you 回答?", steps: ["回答问题 → 问题."], tip: "回答 + 问题." } },
        { id: "p3_zh_wa2_ny24_012", type: "MCQ", q: "（　）认错", options: ["准时","问题","改掉","原谅","跌倒","连忙"], answer: 5,
          pinyin: "liánmáng rèncuò", meaning: "to hurriedly admit one's mistake",
          solution: { method: "How does one 认错 quickly?", steps: ["连忙认错 → 连忙."], tip: "连忙 = hurriedly (before a verb)." } },
        { id: "p3_zh_wa2_ny24_013", type: "MCQ", q: "请求（　）", options: ["准时","问题","改掉","原谅","跌倒","连忙"], answer: 3,
          pinyin: "qǐngqiú yuánliàng", meaning: "to ask for forgiveness",
          solution: { method: "What do you 请求 after a mistake?", steps: ["请求原谅 → 原谅."], tip: "请求原谅 = ask to be forgiven." } },
        { id: "p3_zh_wa2_ny24_014", type: "MCQ", q: "（　）上学", options: ["准时","问题","改掉","原谅","跌倒","连忙"], answer: 0,
          pinyin: "zhǔnshí shàngxué", meaning: "to be on time for school",
          solution: { method: "How should you go to school?", steps: ["准时上学 → 准时."], tip: "准时 = on time." } },
      ],
    },

    // 四、词语选择 — CiYu (Q15–Q19)
    {
      id: "p3_zh_wa2_ny24_set2", topic: "CiYu", difficulty: "core",
      setLabel: "南洋小学 P3 HCL WA2(2024) — 词语选择",
      instruction: "选出正确的答案，把代表它的号码写在括号里。",
      wordBank: ["聪明", "能干", "摆动", "参观", "努力", "花展"],
      questions: [
        { id: "p3_zh_wa2_ny24_015", type: "MCQ", q: "妹妹听着动听的音乐，还不时（　）着身体。", options: ["聪明","能干","摆动","参观","努力","花展"], answer: 2,
          pinyin: "Mèimei tīng zhe dòngtīng de yīnyuè, hái bùshí bǎidòng zhe shēntǐ.",
          meaning: "Listening to the lovely music, little sister kept swaying her body.",
          solution: { method: "How does she move to music?", steps: ["（　）着身体 → 摆动 (sway) → 摆动."], tip: "摆动身体 = sway the body." } },
        { id: "p3_zh_wa2_ny24_016", type: "MCQ", q: "国外的学生和老师们明天来（　）南洋小学。", options: ["聪明","能干","摆动","参观","努力","花展"], answer: 3,
          pinyin: "Guówài de xuésheng hé lǎoshī men míngtiān lái cānguān Nányáng Xiǎoxué.",
          meaning: "Students and teachers from abroad will visit Nanyang Primary tomorrow.",
          solution: { method: "What do visitors do at a school?", steps: ["来（　）学校 → 参观 (visit) → 参观."], tip: "参观 = visit (to tour a place)." } },
        { id: "p3_zh_wa2_ny24_017", type: "MCQ", q: "只要我（　）学习，将来就能成为一名医生。", options: ["聪明","能干","摆动","参观","努力","花展"], answer: 4,
          pinyin: "Zhǐyào wǒ nǔlì xuéxí, jiānglái jiù néng chéngwéi yì míng yīshēng.",
          meaning: "As long as I study hard, I can become a doctor in future.",
          solution: { method: "How should you study to succeed?", steps: ["（　）学习 → 努力 (hard) → 努力."], tip: "努力学习 = study hard." } },
        { id: "p3_zh_wa2_ny24_018", type: "MCQ", q: "我早上一个人把课室打扫干净，老师说我真（　）。", options: ["聪明","能干","摆动","参观","努力","花展"], answer: 1,
          pinyin: "Wǒ zǎoshang yí ge rén bǎ kèshì dǎsǎo gānjìng, lǎoshī shuō wǒ zhēn nénggàn.",
          meaning: "I cleaned the classroom by myself in the morning; the teacher said I'm really capable.",
          solution: { method: "Praise for doing a task well alone?", steps: ["一个人打扫干净 → 真能干 → 能干."], tip: "能干 = capable/competent." } },
        { id: "p3_zh_wa2_ny24_019", type: "MCQ", q: "今年的（　）好看极了，五颜六色，有很多人前来。", options: ["聪明","能干","摆动","参观","努力","花展"], answer: 5,
          pinyin: "Jīnnián de huāzhǎn hǎokàn jí le, wǔyán-liùsè, yǒu hěnduō rén qiánlái.",
          meaning: "This year's flower show is gorgeous and colourful; many people came.",
          solution: { method: "What colourful event draws crowds?", steps: ["五颜六色，很多人前来 → 花展 (flower show) → 花展."], tip: "花展 = flower exhibition/show." } },
      ],
    },

    // 五、扩写句子 — JuZi (Q20–Q24)
    {
      id: "p3_zh_wa2_ny24_020", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "我常去图书馆读书。（附近的）", answer: "我常去附近的图书馆读书。",
      pinyin: "Wǒ cháng qù fùjìn de túshūguǎn dúshū.",
      meaning: "I often go to the nearby library to read.",
      solution: { method: "Place 附近的 before the noun.", steps: ["附近的 describes 图书馆 → before 图书馆."], tip: "…的 adjective goes before the noun." },
    },
    {
      id: "p3_zh_wa2_ny24_021", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "爸爸跳进了游泳池，我也跳了进去。（然后）", answer: "爸爸跳进了游泳池，然后我也跳了进去。",
      pinyin: "Bàba tiào jìn le yóuyǒngchí, ránhòu wǒ yě tiào le jìnqù.",
      meaning: "Dad jumped into the pool, then I jumped in too.",
      solution: { method: "Place 然后 before the second action.", steps: ["然后 links the two actions → before 我也跳了进去."], tip: "然后 = then/afterwards." },
    },
    {
      id: "p3_zh_wa2_ny24_022", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "小猫撞破了邻居的花盆，妈妈只好赔钱。（不小心）", answer: "小猫不小心撞破了邻居的花盆，妈妈只好赔钱。",
      pinyin: "Xiǎo māo bù xiǎoxīn zhuàng pò le línjū de huāpén, māma zhǐhǎo péiqián.",
      meaning: "The cat accidentally broke the neighbour's flowerpot, so mum had to pay for it.",
      solution: { method: "Place 不小心 before the verb 撞破.", steps: ["不小心 describes the accident → before 撞破."], tip: "不小心 = accidentally; goes before the verb." },
    },
    {
      id: "p3_zh_wa2_ny24_023", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "妈妈在后面大声叫小明，可他跑了出去。（头也不回地）", answer: "妈妈在后面大声叫小明，可他头也不回地跑了出去。",
      pinyin: "Māma zài hòumiàn dàshēng jiào Xiǎo Míng, kě tā tóu yě bù huí de pǎo le chūqù.",
      meaning: "Mum called Xiao Ming loudly from behind, but he ran off without even turning his head.",
      solution: { method: "Place 头也不回地 before the verb 跑.", steps: ["头也不回地 describes how he ran → before 跑了出去."], tip: "…地 manner phrase goes before the verb." },
    },
    {
      id: "p3_zh_wa2_ny24_024", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "小树长大，结出了很多甜甜的果子。（健康地）", answer: "小树健康地长大，结出了很多甜甜的果子。",
      pinyin: "Xiǎo shù jiànkāng de zhǎng dà, jié chū le hěnduō tiántián de guǒzi.",
      meaning: "The little tree grew up healthily and bore many sweet fruits.",
      solution: { method: "Place 健康地 before the verb 长大.", steps: ["健康地 describes how it grew → before 长大."], tip: "Put the …地 phrase right before the verb." },
    },

    // 六、短文填空 — TianKong (Q25–Q29)
    {
      id: "p3_zh_wa2_ny24_set3", topic: "TianKong", difficulty: "core",
      setLabel: "南洋小学 P3 HCL WA2(2024) — 短文填空（哈山的生日）",
      instruction: "读句子，选出正确的词语，把号码填写在括号里。",
      wordBank: ["经常", "刚刚", "后退", "特别", "图案", "躲开"],
      passage:
        "下课了，教室里热闹起来。\n\n" +
        "大卫的桌子旁围着一群同学。“我昨天过生日，妈妈给我做了一个汽车【Q25】的蛋糕，好吃极了！”大卫还没说完，小月又说：“我也是【Q26】才过完生日，爸爸做了一桌子好吃的呢！”同学们说得正开心时，哈山听了，为了【Q27】大家，便跑出了课室。哈山的好友文明看到了，便告诉同学们哈山的父母忙着工作，【Q28】出国，没时间陪他。听了文明的话，同学们准备送给哈山一个【Q29】的生日礼物。",
      questions: [
        { id: "p3_zh_wa2_ny24_025", type: "MCQ", q: "一个汽车（　）的蛋糕。", options: ["经常","刚刚","后退","特别","图案","躲开"], answer: 4,
          pinyin: "tú'àn", meaning: "pattern / design",
          solution: { method: "What does a cake have on it?", steps: ["汽车（　）的蛋糕 → 汽车图案 (car pattern) → 图案."], tip: "图案 = pattern/design." } },
        { id: "p3_zh_wa2_ny24_026", type: "MCQ", q: "我也是（　）才过完生日。", options: ["经常","刚刚","后退","特别","图案","躲开"], answer: 1,
          pinyin: "gānggāng", meaning: "just (a moment ago)",
          solution: { method: "When did the birthday just happen?", steps: ["（　）才过完生日 → 刚刚 (just) → 刚刚."], tip: "刚刚 = just now / recently." } },
        { id: "p3_zh_wa2_ny24_027", type: "MCQ", q: "哈山为了（　）大家，便跑出了课室。", options: ["经常","刚刚","后退","特别","图案","躲开"], answer: 5,
          pinyin: "duǒkāi", meaning: "to avoid / get away from",
          solution: { method: "Why did Hashan run out?", steps: ["为了（　）大家 → 躲开 (avoid) → 躲开."], tip: "躲开 = avoid / get out of the way." } },
        { id: "p3_zh_wa2_ny24_028", type: "MCQ", q: "哈山的父母忙着工作，（　）出国。", options: ["经常","刚刚","后退","特别","图案","躲开"], answer: 0,
          pinyin: "jīngcháng", meaning: "often / frequently",
          solution: { method: "How often do the parents travel abroad?", steps: ["忙着工作，（　）出国 → 经常 (often) → 经常."], tip: "经常 = often." } },
        { id: "p3_zh_wa2_ny24_029", type: "MCQ", q: "同学们准备送给哈山一个（　）的生日礼物。", options: ["经常","刚刚","后退","特别","图案","躲开"], answer: 3,
          pinyin: "tèbié", meaning: "special",
          solution: { method: "What kind of gift do they plan?", steps: ["一个（　）的礼物 → 特别 (special) → 特别."], tip: "特别 = special/particular." } },
      ],
    },

    // 七、阅读理解 — YueReadOpen set (Q30–Q34)  [小丽与文云]
    {
      id: "p3_zh_wa2_ny24_set4", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "南洋小学 P3 HCL WA2(2024) — 阅读理解（小丽与文云）",
      instruction: "读一读短文，然后回答问题。",
      passage:
        "小丽上了三年级，转到了家旁边的学校。\n\n" +
        "到了新学校，为了让小丽更好地适应学校生活，老师让文云做小丽的小伙伴。在文云的照顾下，小丽很快就适应了，还认识了很多的小伙伴，这让她喜欢上了新学校。\n\n" +
        "过了几天，小丽回家之后不爱说话了。妈妈看到了，问小丽发生了什么事。小丽伤心地说：“我一直以为文云是我最好的朋友，她每天休息时间陪我吃饭，陪我去图书馆读书，还和我玩我喜欢的跳飞机。可谁知今天她叫我去下棋，我不喜欢下棋，她就去找小明下棋了。她不是我好朋友了。”\n\n" +
        "那天傍晚，小丽和妈妈来到游乐场，看到不远处有一棵大树，树上还有很多小鸟。妈妈问小丽：“树上为什么会有这么多小鸟？”“小鸟要帮大树捉虫子啊！”小丽马上回答。妈妈笑着说：“是啊，有了小鸟，大树才能长得高大。可如果没有了大树，小鸟就没有家了。”小丽听了，点点头。妈妈又说：“那你有没有和文云做她想做的事啊？”这时，小丽大声说：“妈妈，我明白了，我和文云要像小鸟和大树一样互相照顾，这才是好朋友啊！”说完，小丽和妈妈都笑了起来。",
      questions: [
        { id: "p3_zh_wa2_ny24_030", type: "MCQ", q: "老师为什么让文云做小丽的小伙伴？",
          options: ["为了让小丽交很多的朋友。", "为了让小丽适应学校生活。", "为了让小丽喜欢上新学校。"],
          answer: 1,
          pinyin: "Lǎoshī wèishéme ràng Wén Yún zuò Xiǎo Lì de xiǎo huǒbàn?",
          meaning: "Why did the teacher make Wen Yun be Xiao Li's buddy?",
          solution: { method: "Find the teacher's stated purpose.", steps: ["为了让小丽更好地适应学校生活 → 适应学校生活."], tip: "Making friends / liking the school are results, not the stated purpose." } },
        { id: "p3_zh_wa2_ny24_031", type: "OpenEnded", q: "文云每天和小丽做什么？（2分）",
          answer: "文云每天休息时间陪小丽吃饭，去图书馆读书，还和小丽玩她喜欢的跳飞机。",
          pinyin: "Wén Yún měitiān hé Xiǎo Lì zuò shénme?",
          meaning: "What did Wen Yun do with Xiao Li every day?",
          solution: { method: "List the daily activities from paragraph 3.", steps: ["陪吃饭、去图书馆读书、玩跳飞机."], tip: "List all three activities mentioned." } },
        { id: "p3_zh_wa2_ny24_032", type: "OpenEnded", q: "为什么小丽觉得文云不是自己的好朋友？（2分）",
          answer: "因为文云叫小丽陪她下棋，小丽不喜欢下棋，文云就去找小明下棋了，让小丽觉得文云不喜欢她了，所以小丽觉得文云不是自己的好朋友。",
          pinyin: "Wèishéme Xiǎo Lì juéde Wén Yún bú shì zìjǐ de hǎo péngyou?",
          meaning: "Why did Xiao Li feel Wen Yun was no longer her good friend?",
          solution: { method: "Find the upsetting event.", steps: ["文云叫她下棋，她不喜欢 → 文云去找小明下棋 → 小丽觉得文云不喜欢她了."], tip: "Begin with 因为 and trace the chess incident." } },
        { id: "p3_zh_wa2_ny24_033", type: "OpenEnded", q: "根据短文，完成下面的表格（小丽的感受）：去游乐场前 / 去游乐场后。（2分）",
          answer: "去游乐场前——感到伤心；去游乐场后——感到开心。",
          pinyin: "Gēnjù duǎnwén, wánchéng biǎogé: Xiǎo Lì de gǎnshòu.",
          meaning: "Complete the table on Xiao Li's feelings, before and after the playground.",
          solution: {
            method: "Match the feeling to each time point.",
            steps: ["去游乐场前：伤心 (text: 小丽伤心地说…).", "去游乐场后：开心 (text: 小丽和妈妈都笑了起来)."],
            tip: "Find the emotion word in each part of the story.",
          },
        },
        { id: "p3_zh_wa2_ny24_034", type: "OpenEnded", q: "从哪里可以看出小鸟和大树是好朋友？（2分）",
          answer: "小鸟帮大树捉虫子，让大树长得高大；大树是小鸟的家，小鸟和大树互相照顾，从这里可以看出小鸟和大树是好朋友。",
          pinyin: "Cóng nǎlǐ kěyǐ kàn chū xiǎo niǎo hé dà shù shì hǎo péngyou?",
          meaning: "How can we tell the birds and the tree are good friends?",
          solution: { method: "Show the mutual help.", steps: ["小鸟捉虫子帮大树长高；大树是小鸟的家 → 互相照顾."], tip: "The key idea is 互相照顾 (looking after each other)." } },
      ],
    },
  ],
};

export default wa2Nanyang2024Hcl;
