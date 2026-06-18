// =============================================================================
// P3 Chinese WA2 — Pei Hwa Presbyterian Primary School (培华长老会小学) Higher Chinese
// Weighted Assessment 2 · Primary 3 · Higher Chinese Language · 30 min / 14 marks
// (Year not printed.)  Source: sgexam.com
// >> ALL answers verified against the official ANSWER KEY. <<
// -----------------------------------------------------------------------------
// IDs namespaced with `_phw_`. CONVENTION: MCQ `answer` = 0-BASED index.
//   - 辨字 uses 3 options. 看图选词 / 词语搭配 use a shared wordBank (answer = index).
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

export const wa2PeiHwaHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_pei_hwa_hcl",
    school: "Pei Hwa Presbyterian Primary School",
    schoolZh: "培华长老会小学",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "Weighted Assessment 2 (year not printed)",
    source: "sgexam.com — Pei Hwa Presbyterian WA2 (answers verified by official key)",
    totalMarks: 14,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q3, 3 options)
    {
      id: "p3_zh_wa2_phw_001", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的三个选项中，选出适当的一个。",
      q: "小华的爸爸（　）张，我叫他张叔叔。", options: ["形", "信", "姓"], answer: 2,
      pinyin: "Xiǎo Huá de bàba xìng Zhāng, wǒ jiào tā Zhāng shūshu.",
      meaning: "Xiao Hua's father's surname is Zhang; I call him Uncle Zhang.",
      solution: { method: "Which word means 'family name'?", steps: ["（　）张 → 姓张 (surname Zhang) → 姓."], tip: "姓 = surname (女 + 生)." },
    },
    {
      id: "p3_zh_wa2_phw_002", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的三个选项中，选出适当的一个。",
      q: "欢欢吐了，妈妈（　）她去看医生。", options: ["倍", "培", "陪"], answer: 2,
      pinyin: "Huānhuan tù le, māma péi tā qù kàn yīshēng.",
      meaning: "Huanhuan threw up, so mum accompanied her to see the doctor.",
      solution: { method: "Which word means 'accompany'?", steps: ["妈妈（　）她去 → 陪她 (accompany) → 陪."], tip: "陪 (阝 + 咅) = accompany; 倍(times)/培(cultivate) don't fit." },
    },
    {
      id: "p3_zh_wa2_phw_003", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的三个选项中，选出适当的一个。",
      q: "姐姐的家（　）近有一所学校。", options: ["附", "付", "咐"], answer: 0,
      pinyin: "Jiějie de jiā fùjìn yǒu yì suǒ xuéxiào.",
      meaning: "There is a school near sister's home.",
      solution: { method: "Form the word 附近.", steps: ["（　）近 → 附近 (nearby) → 附."], tip: "附 (阝 + 付) for 附近; 付(pay)/咐(instruct) don't fit." },
    },

    // 二、词语选择 — CiYu (Q4–Q7, 4 options)
    {
      id: "p3_zh_wa2_phw_004", topic: "CiYu", difficulty: "core",
      instruction: "从各题的四个选项中，选出适当的一个。",
      q: "这次画画比赛，我想要（　）拿到第一名。", options: ["安排", "学习", "争取", "取得"], answer: 2,
      pinyin: "Zhè cì huàhuà bǐsài, wǒ xiǎng yào zhēngqǔ ná dào dì-yī míng.",
      meaning: "In this drawing competition, I want to strive to get first place.",
      solution: { method: "Pick the word for trying hard to achieve.", steps: ["想要（　）拿到第一名 → 争取 (strive for) → 争取."], tip: "争取 = strive for; goes before the goal." },
    },
    {
      id: "p3_zh_wa2_phw_005", topic: "CiYu", difficulty: "core",
      instruction: "从各题的四个选项中，选出适当的一个。",
      q: "小明已养成睡前整理书包的好（　）。", options: ["朋友", "习惯", "练习", "帮手"], answer: 1,
      pinyin: "Xiǎo Míng yǐ yǎngchéng shuì qián zhěnglǐ shūbāo de hǎo xíguàn.",
      meaning: "Xiao Ming has developed the good habit of tidying his school bag before bed.",
      solution: { method: "What does 养成 (develop) go with?", steps: ["养成…好（　）→ 好习惯 (good habit) → 习惯."], tip: "养成习惯 = form a habit." },
    },
    {
      id: "p3_zh_wa2_phw_006", topic: "CiYu", difficulty: "core",
      instruction: "从各题的四个选项中，选出适当的一个。",
      q: "哥哥长大后想当军人，（　）国家。", options: ["安全", "认识", "庆祝", "保卫"], answer: 3,
      pinyin: "Gēge zhǎngdà hòu xiǎng dāng jūnrén, bǎowèi guójiā.",
      meaning: "Big brother wants to be a soldier when he grows up, to defend the country.",
      solution: { method: "What does a soldier do for the country?", steps: ["军人（　）国家 → 保卫国家 (defend) → 保卫."], tip: "保卫 = defend/protect (a country)." },
    },
    {
      id: "p3_zh_wa2_phw_007", topic: "CiYu", difficulty: "core",
      instruction: "从各题的四个选项中，选出适当的一个。",
      q: "弟弟向爸爸认错，爸爸（　）了他。", options: ["改正", "弄坏", "忘记", "原谅"], answer: 3,
      pinyin: "Dìdi xiàng bàba rèncuò, bàba yuánliàng le tā.",
      meaning: "Little brother admitted his mistake to dad, and dad forgave him.",
      solution: { method: "What does dad do after the apology?", steps: ["认错后，爸爸（　）了他 → 原谅 (forgive) → 原谅."], tip: "原谅 = forgive (response to an apology)." },
    },

    // 三、看图选词 — KanTu matching (Q8–Q11)
    {
      id: "p3_zh_wa2_phw_set1", topic: "KanTu", difficulty: "foundation",
      setLabel: "培华长老会小学 P3 HCL WA2 — 看图选词（连线）",
      instruction: "把图画和词语连起来。",
      wordBank: ["读故事", "科学家", "强壮", "时钟"],
      questions: [
        { id: "p3_zh_wa2_phw_008", type: "MCQ", q: "看图选词（Q8）", options: ["读故事","科学家","强壮","时钟"], answer: 2,
          imageHint: "A boy flexing his muscles to show he is strong.",
          pinyin: "qiángzhuàng", meaning: "strong / muscular",
          solution: { method: "Describe the boy.", steps: ["A boy showing big muscles → 强壮 (strong)."], tip: "强壮 = strong/robust." } },
        { id: "p3_zh_wa2_phw_009", type: "MCQ", q: "看图选词（Q9）", options: ["读故事","科学家","强壮","时钟"], answer: 3,
          imageHint: "A flower-shaped wall clock showing the time.",
          pinyin: "shízhōng", meaning: "clock",
          solution: { method: "Name the timekeeping object.", steps: ["A round clock face → 时钟 (clock)."], tip: "时钟 = clock." } },
        { id: "p3_zh_wa2_phw_010", type: "MCQ", q: "看图选词（Q10）", options: ["读故事","科学家","强壮","时钟"], answer: 1,
          imageHint: "A person in a lab coat and glasses holding flasks/test tubes.",
          pinyin: "kēxuéjiā", meaning: "scientist",
          solution: { method: "Who wears a lab coat with flasks?", steps: ["Person with lab coat and flasks → 科学家 (scientist)."], tip: "科学家 = scientist." } },
        { id: "p3_zh_wa2_phw_011", type: "MCQ", q: "看图选词（Q11）", options: ["读故事","科学家","强壮","时钟"], answer: 0,
          imageHint: "An adult reading a book to a child.",
          pinyin: "dú gùshi", meaning: "to read a story",
          solution: { method: "What is the adult doing with the child?", steps: ["Adult reading a book to a child → 读故事 (read a story)."], tip: "读故事 = read a story (aloud)." } },
      ],
    },

    // 四、词语搭配 — PeiDui (Q12–Q14)
    {
      id: "p3_zh_wa2_phw_set2", topic: "PeiDui", difficulty: "core",
      setLabel: "培华长老会小学 P3 HCL WA2 — 词语搭配",
      instruction: "从所提供的词语中，选出可以和各题搭配成合理词组的词语（数字 1-4）。",
      wordBank: ["认真", "意思", "跌倒", "脚步"],
      questions: [
        { id: "p3_zh_wa2_phw_012", type: "MCQ", q: "停下（　）", options: ["认真","意思","跌倒","脚步"], answer: 3,
          pinyin: "tíng xià jiǎobù", meaning: "to stop one's footsteps / halt",
          solution: { method: "What can you 停下 (stop)?", steps: ["停下脚步 = halt one's steps → 脚步."], tip: "停下脚步 = stop walking." } },
        { id: "p3_zh_wa2_phw_013", type: "MCQ", q: "（　）受伤", options: ["认真","意思","跌倒","脚步"], answer: 2,
          pinyin: "diēdǎo shòushāng", meaning: "to fall and get injured",
          solution: { method: "What leads to 受伤 (injury)?", steps: ["跌倒受伤 = fall and get hurt → 跌倒."], tip: "跌倒 = fall down." } },
        { id: "p3_zh_wa2_phw_014", type: "MCQ", q: "（　）复习", options: ["认真","意思","跌倒","脚步"], answer: 0,
          pinyin: "rènzhēn fùxí", meaning: "to revise diligently",
          solution: { method: "How should one revise?", steps: ["认真复习 = revise seriously → 认真."], tip: "认真 = serious/careful (attitude)." } },
      ],
    },
  ],
};

export default wa2PeiHwaHcl;
