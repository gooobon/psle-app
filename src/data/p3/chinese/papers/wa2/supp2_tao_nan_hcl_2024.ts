// =============================================================================
// P3 Chinese — Tao Nan School (道南学校) Higher Chinese
// 2024 三年级高级华文补充作业（二）(第三课至第四课)  ·  Supplementary Worksheet 2
// Theme: 诚实是一种美德 (honesty is a virtue)  ·  45 marks, 33 questions
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY. <<
// -----------------------------------------------------------------------------
// IDs namespaced with `_supp2_tn_` (distinct from 2023 supp5 / supp_tn2).
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配 / 短文填空: sub-question MCQ whose `options` = the shared wordBank.
//   - Rewrite / open-ended: `answer` is model-answer text.
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

export const supp2TaoNanHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_supp2_tao_nan_hcl",
    school: "Tao Nan School",
    schoolZh: "道南学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2024 Supplementary Worksheet 2 (补充作业二 / 第三课至第四课)",
    source: "sgexam.com — Tao Nan 2024 补充作业（二）(answers verified by official key)",
    totalMarks: 45,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q5)
    {
      id: "p3_zh_supp2_tn_001", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "我觉得有点儿冷，爸爸便为我（　）上一件外套。", options: ["皮", "坡", "披", "被"], answer: 2,
      pinyin: "Wǒ juéde yǒudiǎnr lěng, bàba biàn wèi wǒ pī shàng yí jiàn wàitào.",
      meaning: "I felt a bit cold, so dad draped a coat over me.",
      solution: { method: "Find the verb for putting a coat over someone.", steps: ["（　）上外套 → 披上 (drape on) → 披."], tip: "披 (扌radical) = drape over the shoulders." },
    },
    {
      id: "p3_zh_supp2_tn_002", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "小丽生日那天，妈妈送了一块三（　）形的手表给她。", options: ["脚", "角", "教", "交"], answer: 1,
      pinyin: "Xiǎo Lì shēngrì nà tiān, māma sòng le yí kuài sānjiǎoxíng de shǒubiǎo gěi tā.",
      meaning: "On Xiao Li's birthday, mum gave her a triangular watch.",
      solution: { method: "Form the word 三角形.", steps: ["三（　）形 → 三角形 (triangle) → 角."], tip: "角 = corner/angle; 三角形 = triangle." },
    },
    {
      id: "p3_zh_supp2_tn_003", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "老师要我早睡早起，改（　）迟到的坏习惯。", options: ["掉", "过", "变", "进"], answer: 0,
      pinyin: "Lǎoshī yào wǒ zǎo shuì zǎo qǐ, gǎi diào chídào de huài xíguàn.",
      meaning: "The teacher wants me to sleep and wake early, and get rid of the bad habit of being late.",
      solution: { method: "What do you do to a bad habit?", steps: ["改（　）坏习惯 → 改掉 (get rid of) → 掉."], tip: "改掉 = get rid of (a habit)." },
    },
    {
      id: "p3_zh_supp2_tn_004", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "我最喜欢做的事，就是和小（　）伴们一起玩游戏。", options: ["伙", "什", "保", "休"], answer: 0,
      pinyin: "Wǒ zuì xǐhuan zuò de shì, jiùshì hé xiǎo huǒbàn men yìqǐ wán yóuxì.",
      meaning: "My favourite thing to do is play games with my little friends.",
      solution: { method: "Form the word 伙伴.", steps: ["小（　）伴 → 小伙伴 (companions) → 伙."], tip: "伙伴 = companion/buddy." },
    },
    {
      id: "p3_zh_supp2_tn_005", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "小树一天天长高，树干也越来越（　）。", options: ["大", "短", "幼", "粗"], answer: 3,
      pinyin: "Xiǎo shù yì tiān tiān zhǎng gāo, shùgàn yě yuèláiyuè cū.",
      meaning: "The little tree grows taller each day, and its trunk gets thicker and thicker.",
      solution: { method: "How does a tree trunk grow?", steps: ["树干越来越（　）→ 粗 (thick) → 粗."], tip: "粗 = thick (for trunks/ropes); opposite of 细." },
    },

    // 二、汉语拼音 — PinYin (Q6–Q7)
    {
      id: "p3_zh_supp2_tn_006", topic: "PinYin", difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节。",
      q: "<u>闹钟</u>已经响了好几次，哥哥却还是不愿起床。",
      options: ["lào zōng", "lào zhōng", "nào zōng", "nào zhōng"], answer: 3,
      pinyin: "nàozhōng", meaning: "alarm clock (underlined word 闹钟)",
      solution: { method: "Check both syllables of 闹钟.", steps: ["闹 = nào (n-, not l-).", "钟 = zhōng (zh- and -ong). So 闹钟 = nào zhōng."], tip: "Watch n vs l and z vs zh." },
    },
    {
      id: "p3_zh_supp2_tn_007", topic: "PinYin", difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节。",
      q: "路上来往的<u>车辆</u>很多，我们过马路时一定要小心。",
      options: ["cē liǎng", "cē liàng", "chē liǎng", "chē liàng"], answer: 3,
      pinyin: "chēliàng", meaning: "vehicles (underlined word 车辆)",
      solution: { method: "Check the initial of 车 and the tone of 辆.", steps: ["车 = chē (ch-, not c-).", "辆 = liàng (4th tone). So 车辆 = chē liàng."], tip: "Watch c vs ch and the tone on 辆." },
    },

    // 三、词语选择 — CiYu (Q8–Q11)
    {
      id: "p3_zh_supp2_tn_008", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "（　）明文搬走后，我就再也没有见过他了。", options: ["果然", "只要", "自从", "除了"], answer: 2,
      pinyin: "Zìcóng Míngwén bān zǒu hòu, wǒ jiù zài yě méiyǒu jiàn guò tā le.",
      meaning: "Ever since Mingwen moved away, I have never seen him again.",
      solution: { method: "Which word means 'ever since'?", steps: ["（　）…搬走后 → 自从 (ever since) → 自从."], tip: "自从…后 marks the start point of a change." },
    },
    {
      id: "p3_zh_supp2_tn_009", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "鱼儿在水里（　）着身体，自由自在地游来游去。", options: ["摆动", "运动", "活动", "行动"], answer: 0,
      pinyin: "Yúr zài shuǐ lǐ bǎidòng zhe shēntǐ, zìyóu-zìzài de yóu lái yóu qù.",
      meaning: "The fish sways its body in the water, swimming around freely.",
      solution: { method: "How does a fish move its body?", steps: ["（　）着身体 → 摆动 (sway) → 摆动."], tip: "摆动 = sway/swing; the others mean general 'move/act'." },
    },
    {
      id: "p3_zh_supp2_tn_010", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "休息时，同学们在操场上（　）地玩游戏。", options: ["好奇", "快活", "努力", "热情"], answer: 1,
      pinyin: "Xiūxi shí, tóngxué men zài cāochǎng shàng kuàihuó de wán yóuxì.",
      meaning: "During break, the students play games happily on the field.",
      solution: { method: "How do children play?", steps: ["（　）地玩游戏 → 快活 (happily) → 快活."], tip: "快活 = cheerful/happy; fits playing." },
    },
    {
      id: "p3_zh_supp2_tn_011", topic: "CiYu", difficulty: "stretch",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "爷爷很疼爱妹妹，（　）没有骂过她。", options: ["从前", "从小", "从头", "从来"], answer: 3,
      pinyin: "Yéye hěn téng'ài mèimei, cónglái méiyǒu mà guò tā.",
      meaning: "Grandpa dotes on little sister and has never scolded her.",
      solution: { method: "Which goes with 没有…过 (never)?", steps: ["（　）没有骂过 → 从来没有 (never) → 从来."], tip: "从来 + 没(有) = never (up to now)." },
    },

    // 四、词语搭配 — PeiDui (Q12–Q16)
    {
      id: "p3_zh_supp2_tn_set1", topic: "PeiDui", difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业二 — 词语搭配",
      instruction: "从所提供的词语中，选出可以和各题搭配成合理词组的词语（数字 1-6）。",
      wordBank: ["健康", "变化", "个子", "陪伴", "准时", "爱惜"],
      questions: [
        { id: "p3_zh_supp2_tn_012", type: "MCQ", q: "（　）高大", options: ["健康","变化","个子","陪伴","准时","爱惜"], answer: 2,
          pinyin: "gèzi gāodà", meaning: "tall in stature / a big build",
          solution: { method: "What is 高大 (tall and big)?", steps: ["个子高大 = a tall build → 个子."], tip: "个子 = a person's height/build." } },
        { id: "p3_zh_supp2_tn_013", type: "MCQ", q: "身体（　）", options: ["健康","变化","个子","陪伴","准时","爱惜"], answer: 0,
          pinyin: "shēntǐ jiànkāng", meaning: "a healthy body",
          solution: { method: "Describe a good 身体 (body).", steps: ["身体健康 = healthy → 健康."], tip: "身体健康 = (be in) good health." } },
        { id: "p3_zh_supp2_tn_014", type: "MCQ", q: "（　）上课", options: ["健康","变化","个子","陪伴","准时","爱惜"], answer: 4,
          pinyin: "zhǔnshí shàngkè", meaning: "to be on time for class",
          solution: { method: "How should you go to class?", steps: ["准时上课 = on time for class → 准时."], tip: "准时 = punctual / on time." } },
        { id: "p3_zh_supp2_tn_015", type: "MCQ", q: "发生（　）", options: ["健康","变化","个子","陪伴","准时","爱惜"], answer: 1,
          pinyin: "fāshēng biànhuà", meaning: "a change occurs",
          solution: { method: "What can 发生 (happen)?", steps: ["发生变化 = a change occurs → 变化."], tip: "发生 + 变化/事情." } },
        { id: "p3_zh_supp2_tn_016", type: "MCQ", q: "（　）家人", options: ["健康","变化","个子","陪伴","准时","爱惜"], answer: 3,
          pinyin: "péibàn jiārén", meaning: "to keep family company",
          solution: { method: "What do you do with 家人 (family)?", steps: ["陪伴家人 = keep family company → 陪伴."], tip: "陪伴 = accompany / spend time with." } },
      ],
    },

    // 五、改写句子(A组 ZuJu, 一…就…) + 扩写句子(B组 JuZi) (Q17–Q20)
    {
      id: "p3_zh_supp2_tn_017", topic: "ZuJu", difficulty: "core",
      instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。",
      q: "小文打开钱包。小文发现他的钱不见了。（一……就……）",
      answer: "小文一打开钱包，就发现他的钱不见了。",
      pinyin: "Xiǎo Wén yì dǎkāi qiánbāo, jiù fāxiàn tā de qián bú jiàn le.",
      meaning: "As soon as Xiao Wen opened his wallet, he found his money was gone.",
      solution: { method: "Use 一…就… for two actions in quick succession.", steps: ["一 + 打开钱包，就 + 发现钱不见了."], tip: "一…就… = as soon as … then …" },
    },
    {
      id: "p3_zh_supp2_tn_018", topic: "ZuJu", difficulty: "core",
      instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。",
      q: "妈妈走进家门。弟弟向妈妈跑去。（一……就……）",
      answer: "妈妈一走进家门，弟弟就向她跑去。",
      pinyin: "Māma yì zǒu jìn jiāmén, dìdi jiù xiàng tā pǎo qù.",
      meaning: "As soon as mum walked through the door, little brother ran towards her.",
      solution: { method: "Use 一…就… linking the two events.", steps: ["一 + 妈妈走进家门，就 + 弟弟跑去 (她 = mum)."], tip: "Change 妈妈→她 in the second part to avoid repetition." },
    },
    {
      id: "p3_zh_supp2_tn_019", topic: "JuZi", difficulty: "core",
      instruction: "B组：请用括号里的短语扩写句子。",
      q: "爸爸送给欢欢一个书包作为生日礼物。（蓝色的）",
      answer: "爸爸送给欢欢一个蓝色的书包作为生日礼物。",
      pinyin: "Bàba sòng gěi Huānhuan yí ge lánsè de shūbāo zuòwéi shēngrì lǐwù.",
      meaning: "Dad gave Huanhuan a blue school bag as a birthday present.",
      solution: { method: "Place the colour phrase before the noun.", steps: ["蓝色的 describes 书包 → put it before 书包."], tip: "Adjective (…的) goes right before the noun." },
    },
    {
      id: "p3_zh_supp2_tn_020", topic: "JuZi", difficulty: "core",
      instruction: "B组：请用括号里的短语扩写句子。",
      q: "水壶有一条长长的带子。（妹妹的）",
      answer: "妹妹的水壶有一条长长的带子。",
      pinyin: "Mèimei de shuǐhú yǒu yì tiáo chángcháng de dàizi.",
      meaning: "Little sister's water bottle has a long strap.",
      solution: { method: "Place the possessive phrase before the noun.", steps: ["妹妹的 describes 水壶 → put it before 水壶."], tip: "Possessive …的 goes before the noun it owns." },
    },

    // 六、短文填空 — TianKong (Q21–Q24)
    {
      id: "p3_zh_supp2_tn_set2", topic: "TianKong", difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业二 — 短文填空（听写本子）",
      instruction: "根据短文的内容，选出最适当的答案填入空格（每个词语用一次）。",
      wordBank: ["眼睛", "定时", "摇头", "爱好", "要好", "一定"],
      passage:
        "小美是我的同学，也是我最【Q21】的朋友。每天放学后，她都会来我家和我一起做功课，一起游戏。\n\n" +
        "有一次听写时，坐在我旁边的小美碰了我一下，要我让她看我的听写本子。我不停地【Q22】，还把本子合起来，不让她看。她睁大了【Q23】，看了看我，然后生气地转过头去。\n\n" +
        "下课后，我对小美说：“虽然我们是好朋友，可是你要我把听写本子借给你看是不对的。你以后【Q24】要用功读书。”\n\n" +
        "小美听了，不好意思地低下了头。",
      questions: [
        { id: "p3_zh_supp2_tn_021", type: "MCQ", q: "她是我最（　）的朋友。", options: ["眼睛","定时","摇头","爱好","要好","一定"], answer: 4,
          pinyin: "yàohǎo", meaning: "close / on good terms (of friends)",
          solution: { method: "What kind of friend is she?", steps: ["最（　）的朋友 → 要好 (close) → 要好."], tip: "要好 = close/on intimate terms (friends)." } },
        { id: "p3_zh_supp2_tn_022", type: "MCQ", q: "我不停地（　），不让她看。", options: ["眼睛","定时","摇头","爱好","要好","一定"], answer: 2,
          pinyin: "yáotóu", meaning: "to shake one's head",
          solution: { method: "How does he refuse?", steps: ["不停地（　）→ 摇头 (shake head) → 摇头."], tip: "摇头 = shake the head (to say no)." } },
        { id: "p3_zh_supp2_tn_023", type: "MCQ", q: "她睁大了（　），看了看我。", options: ["眼睛","定时","摇头","爱好","要好","一定"], answer: 0,
          pinyin: "yǎnjing", meaning: "eyes",
          solution: { method: "What do you 睁大 (open wide)?", steps: ["睁大了（　）→ 睁大眼睛 → 眼睛."], tip: "睁大眼睛 = open one's eyes wide." } },
        { id: "p3_zh_supp2_tn_024", type: "MCQ", q: "你以后（　）要用功读书。", options: ["眼睛","定时","摇头","爱好","要好","一定"], answer: 5,
          pinyin: "yídìng", meaning: "definitely / must",
          solution: { method: "How strong is the advice?", steps: ["以后（　）要用功 → 一定要 (must) → 一定."], tip: "一定要 = must / definitely should." } },
      ],
    },

    // 七、阅读理解 (选择) — YueReadMCQ set (Q25–Q28)
    {
      id: "p3_zh_supp2_tn_set3", topic: "YueReadMCQ", difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业二 — 阅读理解（咖喱鸡的晚餐）",
      instruction: "根据短文的内容，选出最适当的答案。",
      passage:
        "今天，我刚走到家门口，就闻到一阵咖喱的香味儿。我轻轻地打开门，把书包放在客厅，然后冲到厨房，大声叫道：“奶奶，我回来了！”奶奶左手拿着一些咖喱叶，右手拿着一盒牛奶，温和地对我说：“你回来了啊！快去洗手。”我问奶奶：“好香啊！您在煮什么？”奶奶回答道：“不就是你和你爸爸最喜欢吃的……”这时，我看见桌上有一些鸡骨头，便高兴地喊道：“咖喱鸡！”奶奶听了，笑着点了点头。\n\n" +
        "晚上，奶奶最爱听的电台节目要开始了，但是她还在厨房里忙着。爷爷从书房里走到客厅对我说：“快做功课，你妈妈和妹妹快回来了。”说完，爷爷把报纸整理好，然后走到阳台去给花儿浇水。接着，他把收音机的音量调高，让奶奶可以一边煮饭，一边听电台节目。\n\n" +
        "不久，妈妈和妹妹回来了，而奶奶也煮好了晚饭。我们一家人开开心心地坐下来，一起享用美味可口的晚餐。",
      questions: [
        { id: "p3_zh_supp2_tn_025", type: "MCQ", q: "“我”和爸爸最爱的食物是什么？",
          options: ["牛奶。", "咖喱叶。", "咖喱鸡。", "鸡骨头。"], answer: 2,
          pinyin: "“Wǒ” hé bàba zuì ài de shíwù shì shénme?",
          meaning: "What is the favourite food of the narrator and dad?",
          solution: { method: "Match the clue: 鸡骨头 → the dish.", steps: ["奶奶说‘你和你爸爸最喜欢吃的’，我看到鸡骨头喊‘咖喱鸡’ → 咖喱鸡."], tip: "咖喱叶/牛奶/鸡骨头 are ingredients, not the dish." } },
        { id: "p3_zh_supp2_tn_026", type: "MCQ", q: "“我”回到家时，家里有些什么人？",
          options: ["爸爸和爷爷。", "爷爷和奶奶。", "妈妈和妹妹。", "奶奶和妹妹。"], answer: 1,
          pinyin: "“Wǒ” huí dào jiā shí, jiā lǐ yǒu xiē shénme rén?",
          meaning: "Who was at home when the narrator returned?",
          solution: { method: "Track who is home on arrival.", steps: ["奶奶在厨房，爷爷从书房出来 → 爷爷和奶奶.", "妈妈和妹妹 came back later."], tip: "Read carefully — mum and sister return only later." } },
        { id: "p3_zh_supp2_tn_027", type: "MCQ", q: "以下哪一项不是爷爷从书房走出来后所做的事情？",
          options: ["帮奶奶煮饭。", "给花儿浇水。", "叫“我”做功课。", "整理客厅里的报纸。"], answer: 0,
          pinyin: "Yǐxià nǎ yí xiàng bú shì yéye cóng shūfáng zǒu chūlái hòu suǒ zuò de shìqing?",
          meaning: "Which of these did grandpa NOT do after coming out of the study?",
          solution: { method: "List grandpa's actions, find the missing one.", steps: ["叫我做功课、整理报纸、浇水、调高收音机.", "他没有帮奶奶煮饭 → answer is 帮奶奶煮饭."], tip: "This is a NOT question — pick the action not mentioned." } },
        { id: "p3_zh_supp2_tn_028", type: "MCQ", q: "爷爷为什么要把收音机的音量调高？",
          options: ["让爷爷在书房里也听得见。", "让妈妈和妹妹在门外也听得见。", "让奶奶一边煮饭，一边听电台节目。", "让“我”一边做功课，一边听电台节目。"], answer: 2,
          pinyin: "Yéye wèishéme yào bǎ shōuyīnjī de yīnliàng tiáo gāo?",
          meaning: "Why did grandpa turn up the radio volume?",
          solution: { method: "Read the reason after the action.", steps: ["让奶奶可以一边煮饭，一边听电台节目."], tip: "He did it so grandma could cook and listen at once." } },
      ],
    },

    // 八、理解问答 — YueReadOpen set (Q29–Q33)  [theme: 诚实]
    {
      id: "p3_zh_supp2_tn_set4", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "道南学校 P3 HCL 补充作业二 — 理解问答（小华拾文具盒，主题：诚实）",
      instruction: "根据文章的内容和上下文的意思，回答下列的问题。",
      passage:
        "早上，小华在学校门口拾到一个漂亮的文具盒。他想：这应该是我们学校哪位同学的文具盒，不如我拿去交给老师吧！于是，他把文具盒放进书包里，然后走进了校门。\n\n" +
        "第一节是华文课。黄老师一走进教室，就大声问道：“文丽昨天新买的文具盒不见了，是谁拿走了？快还给她。”小华听了，心想：如果我把文具盒交出来，同学们可能会认为是我偷的；如果不交出来，让老师发现文具盒在我的书包里，那该怎么办？可是，我又没偷她的文具盒……\n\n" +
        "小华想了又想，最后还是决定把文具盒拿出来交给老师。他小声地对老师说：“老师，我在校门口拾到这个文具盒，不知道是不是文丽的？”\n\n" +
        "文丽看见心爱的文具盒，马上走上前向小华道谢。老师称赞小华是个诚实的孩子。小华听了，开心地笑了。",
      questions: [
        { id: "p3_zh_supp2_tn_029a", type: "OpenEnded", q: "文中形容“发觉”的词语是＿＿＿。（1分）",
          answer: "发现", pinyin: "fāxiàn", meaning: "to discover / notice (the word in the text)",
          solution: { method: "Find the matching word.", steps: ["“让老师发现文具盒…” → 发现 = discover/notice."], tip: "发现 = discover/notice." } },
        { id: "p3_zh_supp2_tn_029b", type: "OpenEnded", q: "文中形容“对如何行动做出主张”的词语是＿＿＿。（1分）",
          answer: "决定", pinyin: "juédìng", meaning: "to decide (the word in the text)",
          solution: { method: "Find the matching word.", steps: ["“最后还是决定把文具盒拿出来” → 决定 = decide."], tip: "决定 = decide (on a course of action)." } },
        { id: "p3_zh_supp2_tn_030", type: "OpenEnded", q: "小华在哪里拾到文具盒？（1分）",
          answer: "小华在学校门口拾到文具盒。",
          pinyin: "Xiǎo Huá zài nǎlǐ shí dào wénjùhé?",
          meaning: "Where did Xiao Hua pick up the pencil case?",
          solution: { method: "Find the place in paragraph 1.", steps: ["在学校门口拾到."], tip: "Answer with the exact place from the text." } },
        { id: "p3_zh_supp2_tn_031", type: "OpenEnded", q: "小华为什么要把文具盒放进书包里？（2分）",
          answer: "因为小华认为文具盒应该是他们学校其中一位同学的，他想把文具盒交给老师，所以把它放进书包里。",
          pinyin: "Xiǎo Huá wèishéme yào bǎ wénjùhé fàng jìn shūbāo lǐ?",
          meaning: "Why did Xiao Hua put the pencil case into his school bag?",
          solution: { method: "Find his intention.", steps: ["他想这是同学的，要交给老师 → 所以放进书包."], tip: "Begin with 因为 and state his intention to hand it in." } },
        { id: "p3_zh_supp2_tn_032", type: "OpenEnded", q: "小华交出文具盒后，老师和文丽有什么反应？（2分）",
          answer: "小华交出文具盒后，老师称赞小华是个诚实的孩子，文丽马上走上前向小华道谢。",
          pinyin: "Xiǎo Huá jiāo chū wénjùhé hòu, lǎoshī hé Wén Lì yǒu shénme fǎnyìng?",
          meaning: "After Xiao Hua handed in the pencil case, how did the teacher and Wen Li react?",
          solution: { method: "List both reactions (no 因为 needed).", steps: ["老师称赞他诚实；文丽向他道谢."], tip: "Write out the reactions of both people directly." } },
        { id: "p3_zh_supp2_tn_033", type: "OpenEnded", q: "如果你是小华，你会把文具盒拿出来交给老师吗？为什么？（2分，开放题）",
          answer: "如果我是小华，我会把文具盒交给老师。因为我要做一个诚实的孩子，文具盒是我捡到的，我应该把它物归原主。",
          pinyin: "Rúguǒ nǐ shì Xiǎo Huá, nǐ huì bǎ wénjùhé ná chūlái jiāo gěi lǎoshī ma? Wèishéme?",
          meaning: "If you were Xiao Hua, would you hand the pencil case to the teacher? Why?",
          solution: {
            method: "State your stance first, then give the reason.",
            steps: ["Part 1: 会/不会 (会 — yes, hand it in).", "Part 2: 因为… (honesty; return lost property to its owner)."],
            tip: "Per the worksheet notes: state 会/不会 first, then the reason — a stance with no reason scores zero.",
          },
        },
      ],
    },
  ],
};

export default supp2TaoNanHcl;
