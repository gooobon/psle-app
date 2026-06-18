// =============================================================================
// P3 Chinese WA2 — Nanyang Primary School (南洋小学) Higher Chinese
// 2025 三年级计分测试（二）· 语文应用与理解 · 45 min / 44 marks · 34 questions
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY (P166+P167). <<
// Distinct from the undated Nanyang WA2 and the 2024 Nanyang WA2 (separate files).
// (Cover prints /44; the section headers sum to 42 — minor printed discrepancy.)
// -----------------------------------------------------------------------------
// IDs namespaced with `_ny25_`. NOTE: 辨字 uses 3 options.
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配 / 词语选择 / 短文填空: sub-question MCQ whose `options` = the wordBank.
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

export const wa2Nanyang2025Hcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_nanyang_2025_hcl",
    school: "Nanyang Primary School",
    schoolZh: "南洋小学",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2025 Second Weighted Assessment / 计分测试（二）— 语文应用与理解",
    source: "sgexam.com — Nanyang 2025 WA2 (answers verified by official key)",
    totalMarks: 44,
  },
  items: [
    // 一、辨字测验 (5题5分) — BianZi (3 options)
    {
      id: "p3_zh_wa2_ny25_001", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "哥哥不小心打（　）了水杯。", options: ["披", "坡", "破"], answer: 2,
      pinyin: "Gēge bù xiǎoxīn dǎ pò le shuǐbēi.",
      meaning: "Big brother accidentally broke the cup.",
      solution: { method: "Form the word 打破.", steps: ["打（　）水杯 → 打破 (break) → 破."], tip: "破 = break/broken; 披(drape)/坡(slope) don't fit." },
    },
    {
      id: "p3_zh_wa2_ny25_002", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "我水壶的盖子是（　）色的。", options: ["绿", "线", "练"], answer: 0,
      pinyin: "Wǒ shuǐhú de gàizi shì lǜsè de.",
      meaning: "The cap of my water bottle is green.",
      solution: { method: "Form the word 绿色.", steps: ["（　）色 → 绿色 (green) → 绿."], tip: "绿 = green; 线(thread)/练(practise) don't fit." },
    },
    {
      id: "p3_zh_wa2_ny25_003", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "楼下的马路上有很多（　）车。", options: ["转", "辆", "较"], answer: 1,
      pinyin: "Lóuxià de mǎlù shàng yǒu hěnduō liàng chē.",
      meaning: "There are many cars on the road downstairs.",
      solution: { method: "Which is the measure word for vehicles?", steps: ["很多（　）车 → 很多辆车 → 辆."], tip: "辆 = measure word for vehicles (一辆车)." },
    },
    {
      id: "p3_zh_wa2_ny25_004", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "那本书总共有三百五十（　）。", options: ["页", "业", "叶"], answer: 0,
      pinyin: "Nà běn shū zǒnggòng yǒu sānbǎi wǔshí yè.",
      meaning: "That book has 350 pages in total.",
      solution: { method: "What unit counts book pages?", steps: ["三百五十（　）→ 页 (page) → 页."], tip: "页 = page; 业(trade)/叶(leaf) don't fit." },
    },
    {
      id: "p3_zh_wa2_ny25_005", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "我认真学习，每天（　）习课文。", options: ["付", "复", "父"], answer: 1,
      pinyin: "Wǒ rènzhēn xuéxí, měitiān fùxí kèwén.",
      meaning: "I study seriously and revise the texts every day.",
      solution: { method: "Form the word 复习.", steps: ["（　）习课文 → 复习 (revise) → 复."], tip: "复习 = revise; 付(pay)/父(father) don't fit." },
    },

    // 二、填写字词 (4题8分) — PinYin (write from pinyin)
    {
      id: "p3_zh_wa2_ny25_006", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "我在［xiū xi］的时候，最喜欢看书。", answer: "休息",
      pinyin: "xiūxi", meaning: "to rest",
      solution: { method: "Write the word for the pinyin.", steps: ["xiū xi → 休息 (rest)."], tip: "休息 = rest." },
    },
    {
      id: "p3_zh_wa2_ny25_007", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "我们一起把课室的桌椅摆放［zhěng qí］。", answer: "整齐",
      pinyin: "zhěngqí", meaning: "neat / tidy",
      solution: { method: "Write the word for the pinyin.", steps: ["zhěng qí → 整齐 (neat)."], tip: "整齐 = neat/orderly." },
    },
    {
      id: "p3_zh_wa2_ny25_008", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "我和妹妹可以坐巴士［huò zhě］地铁去图书馆借书。", answer: "或者",
      pinyin: "huòzhě", meaning: "or",
      solution: { method: "Write the word for the pinyin.", steps: ["huò zhě → 或者 (or)."], tip: "或者 = or (linking choices)." },
    },
    {
      id: "p3_zh_wa2_ny25_009", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "我们正［zhǔn bèi］去公园跑步，天空就下起了大雨。", answer: "准备",
      pinyin: "zhǔnbèi", meaning: "to be about to / prepare",
      solution: { method: "Write the word for the pinyin.", steps: ["zhǔn bèi → 准备 (about to / prepare)."], tip: "正准备 = (be) just about to." },
    },

    // 三、词语搭配 (5题5分) — PeiDui
    {
      id: "p3_zh_wa2_ny25_set1", topic: "PeiDui", difficulty: "core",
      setLabel: "南洋小学 P3 HCL 2025 WA2 — 词语搭配",
      instruction: "选出正确的答案，把代表它的号码写在括号里。",
      wordBank: ["健康", "爱护", "附近", "保卫", "答应", "愿望"],
      questions: [
        { id: "p3_zh_wa2_ny25_010", type: "MCQ", q: "学校（　）", options: ["健康","爱护","附近","保卫","答应","愿望"], answer: 2,
          pinyin: "xuéxiào fùjìn", meaning: "near the school",
          solution: { method: "Where, relative to school?", steps: ["学校附近 → 附近."], tip: "附近 = nearby." } },
        { id: "p3_zh_wa2_ny25_011", type: "MCQ", q: "（　）动物", options: ["健康","爱护","附近","保卫","答应","愿望"], answer: 1,
          pinyin: "àihù dòngwù", meaning: "to care for / protect animals",
          solution: { method: "What should you do for animals?", steps: ["爱护动物 → 爱护."], tip: "爱护 = cherish/protect." } },
        { id: "p3_zh_wa2_ny25_012", type: "MCQ", q: "身体（　）", options: ["健康","爱护","附近","保卫","答应","愿望"], answer: 0,
          pinyin: "shēntǐ jiànkāng", meaning: "a healthy body",
          solution: { method: "Describe a good body.", steps: ["身体健康 → 健康."], tip: "身体健康 = good health." } },
        { id: "p3_zh_wa2_ny25_013", type: "MCQ", q: "（　）请求", options: ["健康","爱护","附近","保卫","答应","愿望"], answer: 4,
          pinyin: "dāying qǐngqiú", meaning: "to agree to a request",
          solution: { method: "What do you do to a 请求 (request)?", steps: ["答应请求 → 答应."], tip: "答应 = agree/promise." } },
        { id: "p3_zh_wa2_ny25_014", type: "MCQ", q: "实现（　）", options: ["健康","爱护","附近","保卫","答应","愿望"], answer: 5,
          pinyin: "shíxiàn yuànwàng", meaning: "to fulfil a wish",
          solution: { method: "What can you 实现 (fulfil)?", steps: ["实现愿望 → 愿望."], tip: "实现愿望 = fulfil a wish." } },
      ],
    },

    // 四、词语选择 (5题5分) — CiYu
    {
      id: "p3_zh_wa2_ny25_set2", topic: "CiYu", difficulty: "core",
      setLabel: "南洋小学 P3 HCL 2025 WA2 — 词语选择",
      instruction: "选出正确的答案，把代表它的号码写在括号里。",
      wordBank: ["连忙", "傍晚", "强壮", "意思", "伙伴", "努力"],
      questions: [
        { id: "p3_zh_wa2_ny25_015", type: "MCQ", q: "只要多运动，身体就会更加（　）。", options: ["连忙","傍晚","强壮","意思","伙伴","努力"], answer: 2,
          pinyin: "Zhǐyào duō yùndòng, shēntǐ jiù huì gèngjiā qiángzhuàng.", meaning: "With more exercise, the body becomes stronger.",
          solution: { method: "What does exercise make the body?", steps: ["更加（　）→ 更加强壮 → 强壮."], tip: "强壮 = strong/robust." } },
        { id: "p3_zh_wa2_ny25_016", type: "MCQ", q: "看到校长走了过来，我（　）向他问好。", options: ["连忙","傍晚","强壮","意思","伙伴","努力"], answer: 0,
          pinyin: "Kàndào xiàozhǎng zǒu le guòlái, wǒ liánmáng xiàng tā wènhǎo.", meaning: "Seeing the principal come over, I hurriedly greeted him.",
          solution: { method: "How quickly did you greet him?", steps: ["（　）向他问好 → 连忙 (hurriedly) → 连忙."], tip: "连忙 = hurriedly." } },
        { id: "p3_zh_wa2_ny25_017", type: "MCQ", q: "小文平日很关心同学，有很多好（　）。", options: ["连忙","傍晚","强壮","意思","伙伴","努力"], answer: 4,
          pinyin: "Xiǎo Wén píngrì hěn guānxīn tóngxué, yǒu hěnduō hǎo huǒbàn.", meaning: "Xiao Wen cares about classmates and has many good companions.",
          solution: { method: "Caring people have many good…?", steps: ["很多好（　）→ 好伙伴 → 伙伴."], tip: "伙伴 = companion/buddy." } },
        { id: "p3_zh_wa2_ny25_018", type: "MCQ", q: "每天（　），我都会陪奶奶去公园找朋友。", options: ["连忙","傍晚","强壮","意思","伙伴","努力"], answer: 1,
          pinyin: "Měitiān bàngwǎn, wǒ dōu huì péi nǎinai qù gōngyuán zhǎo péngyou.", meaning: "Every evening, I accompany grandma to the park to meet friends.",
          solution: { method: "Which is a time of day?", steps: ["每天（　）→ 每天傍晚 (evening) → 傍晚."], tip: "傍晚 = evening/dusk." } },
        { id: "p3_zh_wa2_ny25_019", type: "MCQ", q: "同学们都不知道这个字的（　），只好去问老师。", options: ["连忙","傍晚","强壮","意思","伙伴","努力"], answer: 3,
          pinyin: "Tóngxué men dōu bù zhīdào zhège zì de yìsi, zhǐhǎo qù wèn lǎoshī.", meaning: "The students didn't know the character's meaning, so they asked the teacher.",
          solution: { method: "What of a character don't they know?", steps: ["这个字的（　）→ 意思 (meaning) → 意思."], tip: "意思 = meaning." } },
      ],
    },

    // 五、扩写句子 (5题5分) — JuZi
    {
      id: "p3_zh_wa2_ny25_020", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "妈妈送给我一个书包。（蓝色的）", answer: "妈妈送给我一个蓝色的书包。",
      pinyin: "Māma sòng gěi wǒ yí ge lánsè de shūbāo.",
      meaning: "Mum gave me a blue school bag.",
      solution: { method: "Place the colour phrase before the noun.", steps: ["蓝色的 describes 书包 → before 书包."], tip: "…的 adjective goes before the noun." },
    },
    {
      id: "p3_zh_wa2_ny25_021", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "听写的时候，我会写好每一个字。（细心地）", answer: "听写的时候，我会细心地写好每一个字。",
      pinyin: "Tīngxiě de shíhou, wǒ huì xìxīn de xiě hǎo měi yí ge zì.",
      meaning: "During dictation, I carefully write each character well.",
      solution: { method: "Place the manner phrase before the verb 写.", steps: ["细心地 describes how I write → before 写好."], tip: "…地 adverb goes before the verb." },
    },
    {
      id: "p3_zh_wa2_ny25_022", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "奶奶在沙发上睡着了，我走回房间看书。（轻轻地）", answer: "奶奶在沙发上睡着了，我轻轻地走回房间看书。",
      pinyin: "Nǎinai zài shāfā shàng shuì zháo le, wǒ qīngqīng de zǒu huí fángjiān kàn shū.",
      meaning: "Grandma fell asleep on the sofa, so I quietly walked back to my room to read.",
      solution: { method: "Place 轻轻地 before the verb 走.", steps: ["轻轻地 describes how I walked → before 走回."], tip: "Put the …地 phrase right before the action." },
    },
    {
      id: "p3_zh_wa2_ny25_023", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "看到弟弟跌倒了，我把他扶起来。（立刻）", answer: "看到弟弟跌倒了，我立刻把他扶起来。",
      pinyin: "Kàndào dìdi diēdǎo le, wǒ lìkè bǎ tā fú qǐlái.",
      meaning: "Seeing little brother fall, I immediately helped him up.",
      solution: { method: "Place 立刻 before the verb phrase.", steps: ["立刻 describes how fast I acted → before 把他扶起来."], tip: "立刻 = immediately." },
    },
    {
      id: "p3_zh_wa2_ny25_024", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "做完功课后，我和妹妹一起看电视。（全部的）", answer: "做完全部的功课后，我和妹妹一起看电视。",
      pinyin: "Zuò wán quánbù de gōngkè hòu, wǒ hé mèimei yìqǐ kàn diànshì.",
      meaning: "After finishing all the homework, my sister and I watched TV together.",
      solution: { method: "Place 全部的 before the noun 功课.", steps: ["全部的 describes 功课 → before 功课."], tip: "全部的功课 = all the homework." },
    },

    // 六、短文填空 (5题5分) — TianKong
    {
      id: "p3_zh_wa2_ny25_set3", topic: "TianKong", difficulty: "core",
      setLabel: "南洋小学 P3 HCL 2025 WA2 — 短文填空（美云的手表）",
      instruction: "读句子，选出正确的词语，然后把号码填写在括号里。",
      wordBank: ["原谅", "习惯", "赶快", "希望", "突然", "一直"],
      passage:
        "一天，美云带了一只新手表来学校。那只手表很漂亮，小丽很【Q25】自己也能有一只一样的。\n\n" +
        "当同学们去操场上体育课时，小丽【Q26】在课室门口的地上看到一只手表。她定睛一看——这不是美云的手表吗？小丽见旁边没人，就【Q27】把手表捡起来，放进自己的书包里。后来，美云发现手表不见了，到处去找，但怎么都找不到。\n\n" +
        "接下来的几堂课，小丽一个字也听不进去，因为心里有个声音【Q28】在说：“你这样做是错的，你这样做是错的……”\n\n" +
        "放学了，小丽把手表还给美云，低着头对她说：“对不起……”美云笑了笑，【Q29】了小丽。",
      questions: [
        { id: "p3_zh_wa2_ny25_025", type: "MCQ", q: "小丽很（　）自己也能有一只一样的（手表）。", options: ["原谅","习惯","赶快","希望","突然","一直"], answer: 3,
          pinyin: "xīwàng", meaning: "to hope / wish",
          solution: { method: "She wishes she had one too.", steps: ["很（　）自己也能有 → 希望 → 希望."], tip: "希望 = hope/wish." } },
        { id: "p3_zh_wa2_ny25_026", type: "MCQ", q: "小丽（　）在地上看到一只手表。", options: ["原谅","习惯","赶快","希望","突然","一直"], answer: 4,
          pinyin: "tūrán", meaning: "suddenly",
          solution: { method: "She saw it unexpectedly.", steps: ["（　）看到 → 突然看到 → 突然."], tip: "突然 = suddenly." } },
        { id: "p3_zh_wa2_ny25_027", type: "MCQ", q: "她见旁边没人，就（　）把手表捡起来。", options: ["原谅","习惯","赶快","希望","突然","一直"], answer: 2,
          pinyin: "gǎnkuài", meaning: "quickly / in a hurry",
          solution: { method: "She acted fast while no one watched.", steps: ["就（　）捡起来 → 赶快 → 赶快."], tip: "赶快 = quickly." } },
        { id: "p3_zh_wa2_ny25_028", type: "MCQ", q: "心里有个声音（　）在说：“你这样做是错的……”", options: ["原谅","习惯","赶快","希望","突然","一直"], answer: 5,
          pinyin: "yìzhí", meaning: "continuously / all the time",
          solution: { method: "The voice kept on speaking.", steps: ["（　）在说 → 一直在说 → 一直."], tip: "一直 = continuously / all along." } },
        { id: "p3_zh_wa2_ny25_029", type: "MCQ", q: "美云笑了笑，（　）了小丽。", options: ["原谅","习惯","赶快","希望","突然","一直"], answer: 0,
          pinyin: "yuánliàng", meaning: "to forgive",
          solution: { method: "After the apology, what did Meiyun do?", steps: ["笑了笑，（　）了小丽 → 原谅 → 原谅."], tip: "原谅 = forgive (response to sorry)." } },
      ],
    },

    // 七、阅读理解 (5题9分) — YueReadOpen set (回收旧书 / 助人为快乐之本)
    {
      id: "p3_zh_wa2_ny25_set4", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "南洋小学 P3 HCL 2025 WA2 — 阅读理解（回收旧书）",
      instruction: "读一读短文，然后回答问题。",
      passage:
        "一天早上，王老师对同学们说：“下一周学校有一个回收旧书本的活动，请同学们把不读的旧课本和故事书带来学校。”小光听了，好奇地问道：“那些书都没用处了，收来做什么？”小丁也问：“是拿去卖吗？还是送给图书馆？”王老师摇了摇头，说：“你们记得我以前说过，有些地方的小朋友没钱买书吗？如果把这些书送给他们读，不就能帮助他们吗？”\n\n" +
        "第二周，搬书工人来了。他们看着像山一样高的书，着急地对王老师说：“今天有几个工人生病了，这怎么搬得完呢？”于是，王老师大声喊道：“同学们，我们来帮帮他们吧！”大家都点了点头。有的同学按住电梯，让工人把重重的箱子搬进电梯；有的同学把小包的书本拿到了一楼；还有的同学把书本放上卡车。\n\n" +
        "过了一会儿，书搬完了，搬书工人笑着向大家道谢。\n\n" +
        "回到课室里，同学们虽然觉得搬书不容易，但他们还是面带笑容，心里也乐开了花，因为大家都明白了“助人为快乐之本”的道理。",
      questions: [
        { id: "p3_zh_wa2_ny25_030", type: "MCQ", q: "学校为什么要回收旧书？（1分）",
          options: ["因为要把旧书拿出去卖。", "因为要摆放在图书馆里。", "因为要帮助有需要的人。"], answer: 2,
          pinyin: "Xuéxiào wèishéme yào huíshōu jiù shū?",
          meaning: "Why did the school collect old books?",
          solution: { method: "Read the teacher's reason.", steps: ["送给没钱买书的小朋友 → 帮助有需要的人."], tip: "Not for selling or the library — to help those in need." } },
        { id: "p3_zh_wa2_ny25_031", type: "OpenEnded", q: "小光听到学校要回收旧书后，为什么感到好奇？（2分）",
          answer: "因为小光认为那些书都没用处了，不明白收来做什么，所以小光听到学校要回收旧书后感到好奇。",
          pinyin: "Xiǎo Guāng tīng dào xuéxiào yào huíshōu jiù shū hòu, wèishéme gǎndào hàoqí?",
          meaning: "Why was Xiao Guang curious when he heard the school would collect old books?",
          solution: { method: "Read Xiao Guang's question.", steps: ["他觉得旧书没用处了，不明白收来做什么 → 所以好奇."], tip: "Begin with 因为 and give his puzzlement." } },
        { id: "p3_zh_wa2_ny25_032", type: "OpenEnded", q: "同学们怎样帮助搬书工人？（2分）",
          answer: "有的同学按住电梯，让工人把重重的箱子搬进电梯；有的同学把小包的书本拿到一楼；还有的同学把书本放上卡车。",
          pinyin: "Tóngxué men zěnyàng bāngzhù bān shū gōngrén?",
          meaning: "How did the students help the book-movers?",
          solution: { method: "List the three ways from paragraph 2.", steps: ["按电梯、把小包书拿到一楼、把书放上卡车."], tip: "Give all three actions." } },
        { id: "p3_zh_wa2_ny25_033", type: "OpenEnded", q: "根据短文，完成下面的表格（搬书工人的感受）：（2分）",
          answer: "开始搬书前——着急；搬完书之后——感到开心。",
          pinyin: "Gēnjù duǎnwén, wánchéng biǎogé (bān shū gōngrén de gǎnshòu).",
          meaning: "Complete the table: the book-movers' feelings before and after.",
          solution: {
            method: "Match each time to the workers' feeling.",
            steps: ["开始搬书前 → 着急 (worried they couldn't finish).", "搬完书之后 → 感到开心 (笑着道谢)."],
            tip: "Find the emotion word in each part of the story.",
          } },
        { id: "p3_zh_wa2_ny25_034", type: "OpenEnded", q: "从哪里可以看出同学们明白了“助人为快乐之本”的道理？（2分）",
          answer: "同学们虽然觉得搬书不容易，但是他们还是面带笑容，心里也乐开了。从这里可以看出同学们都明白了“助人为快乐之本”的道理。",
          pinyin: "Cóng nǎlǐ kěyǐ kàn chū tóngxué men míngbai le “zhù rén wéi kuàilè zhī běn” de dàolǐ?",
          meaning: "How can we tell the students understood that 'helping others is the source of joy'?",
          solution: { method: "Quote the ending.", steps: ["搬书虽累，但他们面带笑容、心里乐开了花 → shows they understood the lesson."], tip: "Point to their smiles and joy after the hard work." } },
      ],
    },
  ],
};

export default wa2Nanyang2025Hcl;
