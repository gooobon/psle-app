// =============================================================================
// P3 Chinese WA2 — CHIJ St Nicholas Girls' School (圣尼各拉女校 · 小学部) Higher Chinese
// 学段考查 试卷二：语文理解与运用 (WA2, Paper 2) · 第一课至第八课 · 1 hour / 30 marks
// (Year not printed.)  Source: sgexam.com
// >> Q1–Q14 MCQ answers verified against the official ANSWER KEY (CHIJ).        <<
// >> Q15–Q22 use the official model answers from the key.                       <<
// Distinct from the 2025 CHIJ St Nicholas Revision paper (handled separately).
// -----------------------------------------------------------------------------
// IDs namespaced with `_sn_`. CONVENTION: MCQ `answer` = 0-BASED index.
//   - 第一部分 Q1–Q14 are OAS (optical answer sheet) MCQ, 4 options each.
//   - 造句 / 阅读理解 (Q15–Q22) are open-ended; `answer` is the model text.
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

export const wa2StNicholasHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_st_nicholas_hcl",
    school: "CHIJ St Nicholas Girls' School (Primary)",
    schoolZh: "圣尼各拉女校（小学部）",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "学段考查 试卷二：语文理解与运用 (WA2, year not printed)",
    source: "sgexam.com — CHIJ St Nicholas WA2 (Q1–14 verified by official key)",
    totalMarks: 30,
  },
  items: [
    // ===== 第一部分 (14题14分) · 一、语文应用 =====
    // Q1–Q2 — PinYin (choose the pinyin of the underlined word)
    {
      id: "p3_zh_wa2_sn_001", topic: "PinYin", difficulty: "core",
      instruction: "请选出画线词语的汉语拼音。",
      q: "我们都<u>相信</u>班长说的话是真的。",
      options: ["xiāng xìn", "xiāng xìng", "xiǎng xìn", "xiǎng xìng"], answer: 0,
      pinyin: "xiāngxìn", meaning: "to believe / trust (underlined word 相信)",
      solution: { method: "Check the initials and tones.", steps: ["相 = xiāng (1st tone, x-).", "信 = xìn (no -ng). So 相信 = xiāng xìn."], tip: "Watch -an vs -ang and the tone on 信." },
    },
    {
      id: "p3_zh_wa2_sn_002", topic: "PinYin", difficulty: "core",
      instruction: "请选出画线词语的汉语拼音。",
      q: "妈妈要出门时，<u>突然</u>下起了大雨。",
      options: ["hū lán", "hū rán", "tū lán", "tū rán"], answer: 3,
      pinyin: "tūrán", meaning: "suddenly (underlined word 突然)",
      solution: { method: "Check both syllables.", steps: ["突 = tū (t-, not h-).", "然 = rán (r-, not l-). So 突然 = tū rán."], tip: "Watch t vs h and r vs l." },
    },

    // Q3–Q5 — BianZi
    {
      id: "p3_zh_wa2_sn_003", topic: "BianZi", difficulty: "core",
      instruction: "选出正确的字。",
      q: "水池里的蝌蚪身体起了变（　），尾巴慢慢不见了。",
      options: ["画", "话", "化", "划"], answer: 2,
      pinyin: "Shuǐchí lǐ de kēdǒu shēntǐ qǐ le biànhuà, wěiba mànmàn bú jiàn le.",
      meaning: "The tadpoles in the pond changed, and their tails slowly disappeared.",
      solution: { method: "Form the word 变化.", steps: ["变（　）→ 变化 (change) → 化."], tip: "变化 = change; 画(draw)/话(speech)/划(stroke) don't fit." },
    },
    {
      id: "p3_zh_wa2_sn_004", topic: "BianZi", difficulty: "core",
      instruction: "选出正确的字。",
      q: "我们很多年没见到表弟，他的（　）子和以前不同了。",
      options: ["洋", "样", "祥", "痒"], answer: 1,
      pinyin: "Wǒmen hěnduō nián méi jiàndào biǎodì, tā de yàngzi hé yǐqián bùtóng le.",
      meaning: "We hadn't seen our cousin for years; his appearance is different from before.",
      solution: { method: "Form the word 样子.", steps: ["（　）子 → 样子 (appearance) → 样."], tip: "样子 = appearance; 洋/祥/痒 share the 羊 part but don't fit." },
    },
    {
      id: "p3_zh_wa2_sn_005", topic: "BianZi", difficulty: "core",
      instruction: "选出正确的字。",
      q: "我已经把明天上课要用的文具（　）备好了。",
      options: ["准", "谁", "唯", "推"], answer: 0,
      pinyin: "Wǒ yǐjīng bǎ míngtiān shàngkè yào yòng de wénjù zhǔnbèi hǎo le.",
      meaning: "I have already prepared the stationery I'll need for class tomorrow.",
      solution: { method: "Form the word 准备.", steps: ["（　）备好 → 准备 (prepare) → 准."], tip: "准备 = prepare." },
    },

    // Q6–Q9 — CiYu (choose the right word)
    {
      id: "p3_zh_wa2_sn_006", topic: "CiYu", difficulty: "core",
      instruction: "选出适当的词语。",
      q: "哥哥起晚了，（　）和我们一起吃早餐就上学去了。",
      options: ["想不到", "受不了", "忍不住", "来不及"], answer: 3,
      pinyin: "Gēge qǐ wǎn le, láibují hé wǒmen yìqǐ chī zǎocān jiù shàngxué qù le.",
      meaning: "Big brother woke up late and had no time to eat breakfast with us before going to school.",
      solution: { method: "He woke up late, so there was no time.", steps: ["起晚了 → 来不及吃早餐 → 来不及."], tip: "来不及 = no time to (do something)." },
    },
    {
      id: "p3_zh_wa2_sn_007", topic: "CiYu", difficulty: "core",
      instruction: "选出适当的词语。",
      q: "弟弟努力学习，（　）以后能成为一名老师。",
      options: ["决定", "明白", "希望", "好像"], answer: 2,
      pinyin: "Dìdi nǔlì xuéxí, xīwàng yǐhòu néng chéngwéi yì míng lǎoshī.",
      meaning: "Little brother studies hard, hoping to become a teacher in future.",
      solution: { method: "What is the wish behind studying hard?", steps: ["努力学习，（　）以后…→ 希望 (hope) → 希望."], tip: "希望 = hope (for a future goal)." },
    },
    {
      id: "p3_zh_wa2_sn_008", topic: "CiYu", difficulty: "core",
      instruction: "选出适当的词语。",
      q: "哥哥很（　），什么数学题都难不倒他。",
      options: ["专心", "聪明", "用功", "认真"], answer: 1,
      pinyin: "Gēge hěn cōngmíng, shénme shùxué tí dōu nán bù dǎo tā.",
      meaning: "Big brother is very clever; no maths problem can stump him.",
      solution: { method: "Why can no problem stump him?", steps: ["难不倒他 → 因为他很聪明 → 聪明."], tip: "聪明 = clever/intelligent." },
    },
    {
      id: "p3_zh_wa2_sn_009", topic: "CiYu", difficulty: "core",
      instruction: "选出适当的词语。",
      q: "妹妹一个人搬不动这张桌子，（　）我们帮忙。",
      options: ["答应", "喜欢", "需要", "愿意"], answer: 2,
      pinyin: "Mèimei yí ge rén bān bú dòng zhè zhāng zhuōzi, xūyào wǒmen bāngmáng.",
      meaning: "Little sister can't move this table by herself; she needs our help.",
      solution: { method: "She can't do it alone, so she…", steps: ["搬不动 → 需要帮忙 → 需要."], tip: "需要 = need." },
    },

    // Q10–Q14 — CiYu word-usage ("which sentence is correct")
    {
      id: "p3_zh_wa2_sn_010", topic: "CiYu", difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（“参观”的正确用法）",
      q: "以下哪个句子是正确的？（参观）",
      options: [
        "姐姐参观书法比赛得到第一名。",
        "老师要带我们参观野生动物园。",
        "丽丽参观了很久才把书还给我。",
        "他空闲的时候喜欢参观故事书。",
      ],
      answer: 1,
      pinyin: "cānguān", meaning: "Which sentence uses 参观 (to visit/tour) correctly?",
      solution: { method: "参观 = visit a place/exhibition.", steps: ["参观野生动物园 (visit the zoo) is correct.", "比赛→参加; 看书→看/读, not 参观."], tip: "参观 goes with places/exhibitions, not books or contests." },
    },
    {
      id: "p3_zh_wa2_sn_011", topic: "CiYu", difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（“懂事”的正确用法）",
      q: "以下哪个句子是正确的？（懂事）",
      options: [
        "爷爷每天都看报纸，是个很懂事的人。",
        "我要多看故事书，才能变得更加懂事。",
        "小明一向很懂事，大家都相信他的话。",
        "文文真懂事，常常帮忙妈妈照顾妹妹。",
      ],
      answer: 3,
      pinyin: "dǒngshì", meaning: "Which sentence uses 懂事 (sensible/thoughtful) correctly?",
      solution: { method: "懂事 = sensible, considerate (usually of a child).", steps: ["帮妈妈照顾妹妹 shows being 懂事 → option 4."], tip: "懂事 describes thoughtful, mature behaviour." },
    },
    {
      id: "p3_zh_wa2_sn_012", topic: "CiYu", difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（“保卫”的正确用法）",
      q: "以下哪个句子是正确的？（保卫）",
      options: [
        "我没把钱包保卫好，结果钱包不见了。",
        "为了保卫这只小花猫，我把它带回家。",
        "哥哥长大以后想当军人，保卫国家。",
        "我们应该常常运动，保卫身体的健康。",
      ],
      answer: 2,
      pinyin: "bǎowèi", meaning: "Which sentence uses 保卫 (to defend) correctly?",
      solution: { method: "保卫 = defend (something big, e.g. a country).", steps: ["保卫国家 (defend the country) is correct.", "钱包→保管; 小猫→保护; 健康→保持."], tip: "保卫 pairs with 国家/家园, not small items or health." },
    },
    {
      id: "p3_zh_wa2_sn_013", topic: "CiYu", difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（“附近”的正确用法）",
      q: "以下哪个句子是正确的？（附近）",
      options: [
        "外公得了重感冒，便叫我们不要附近他。",
        "学校就在我的家附近，我可以走路上学。",
        "叔叔出国了，难怪附近一直没有见到他。",
        "我听不到小明在说什么，就走到他附近。",
      ],
      answer: 1,
      pinyin: "fùjìn", meaning: "Which sentence uses 附近 (nearby) correctly?",
      solution: { method: "附近 = nearby (a place).", steps: ["学校在家附近 (near home) is correct.", "靠近 him→接近; 最近 (recently)→not 附近."], tip: "附近 describes location, not time or approaching a person." },
    },
    {
      id: "p3_zh_wa2_sn_014", topic: "CiYu", difficulty: "stretch",
      instruction: "以下哪个句子是正确的？（“陪伴”的正确用法）",
      q: "以下哪个句子是正确的？（陪伴）",
      options: [
        "弟弟有很多功课不会做，便请妈妈陪伴他做。",
        "休息的时候，我陪伴老师拿本子到教员室去。",
        "爸爸送了一只玩具狗给我，让它每天陪伴我。",
        "我和欢欢是好朋友，我们常常都陪伴在一起。",
      ],
      answer: 2,
      pinyin: "péibàn", meaning: "Which sentence uses 陪伴 (to accompany/keep company) correctly?",
      solution: { method: "陪伴 = keep someone company.", steps: ["玩具狗每天陪伴我 (the toy dog keeps me company) is correct."], tip: "陪伴 = be a companion to someone over time." },
    },

    // ===== 第二部分 (16分) · 二、造句 (Q15–Q17) =====
    {
      id: "p3_zh_wa2_sn_015", topic: "ZuJu", difficulty: "core",
      instruction: "使用词语造一个有语境且合理的句子。",
      q: "用“连忙”造句。",
      answer: "妹妹跌倒了，我连忙把她扶起来。",
      pinyin: "Mèimei diēdǎo le, wǒ liánmáng bǎ tā fú qǐlái.",
      meaning: "My little sister fell, and I quickly helped her up.",
      solution: { method: "Use 连忙 (hurriedly) before a verb in a real situation.", steps: ["Give a cause (someone fell), then a quick reaction with 连忙."], tip: "连忙 shows a fast response to something that just happened." },
    },
    {
      id: "p3_zh_wa2_sn_016", topic: "ZuJu", difficulty: "core",
      instruction: "使用词语造一个有语境且合理的句子。",
      q: "用“容易”造句。",
      answer: "老师给我们的功课真容易，我很快就做完了。",
      pinyin: "Lǎoshī gěi wǒmen de gōngkè zhēn róngyì, wǒ hěn kuài jiù zuò wán le.",
      meaning: "The homework the teacher gave us was really easy; I finished it quickly.",
      solution: { method: "Use 容易 (easy) to describe a task.", steps: ["Say something is 容易, then a result (finished quickly)."], tip: "容易 = easy; pair it with a believable outcome." },
    },
    {
      id: "p3_zh_wa2_sn_017", topic: "ZuJu", difficulty: "core",
      instruction: "使用词语造一个有语境且合理的句子。",
      q: "用“原谅”造句。",
      answer: "我打破妈妈的杯子，但她原谅了我。",
      pinyin: "Wǒ dǎpò māma de bēizi, dàn tā yuánliàng le wǒ.",
      meaning: "I broke mum's cup, but she forgave me.",
      solution: { method: "Use 原谅 (forgive) after a mistake.", steps: ["State a wrongdoing, then someone 原谅 (forgives)."], tip: "原谅 = forgive; needs a mistake to forgive." },
    },

    // ===== 第二部分 · 三、阅读理解 (Q18–Q22) =====
    {
      id: "p3_zh_wa2_sn_set1", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "圣尼各拉女校 P3 HCL WA2 — 阅读理解（白马生病·大象先生）",
      instruction: "根据短文的内容和上下文的意思，回答下列问题。",
      passage:
        "一天，白马觉得全身没力，还发高烧。它知道自己病了，赶快去找牛医生给它看病。牛医生为白马看病时，发现它得到的是一种新的病。牛医生为白马看完病后，没开药给白马吃，只叫白马回家后要好好休息。\n\n" +
        "几天后，森林里越来越多动物也得了同样的病。那些没有生病的动物知道后，十分害怕，不知道怎么办才好。公鸡担心自己会得到这种新的病，马上到处找食物，然后把找到的食物全搬回自己的家里。这样一来，它就可以一直留在家里，等那些病倒的动物身体好了之后才出来。其他动物看见了，也学公鸡那么做。动作比较慢的乌龟找不到食物，只好饿肚子。\n\n" +
        "大象先生知道后，对大家说：“你们不要紧张，也不要抢食物。只要你们注意卫生，就不会生病。”接着，它又说：“在困难的时候，大家更应该互相照顾。”大家听了大象先生的话后，觉得很有道理。它们把食物分给那些没有东西吃的动物后，和以前一样继续过着快乐的生活。",
      questions: [
        {
          id: "p3_zh_wa2_sn_018", type: "OpenEnded", q: "白马怎么知道自己病了？（2分）",
          answer: "因为白马觉得全身没力，还发高烧，所以白马知道自己病了。",
          pinyin: "Báimǎ zěnme zhīdào zìjǐ bìng le?",
          meaning: "How did the white horse know it was ill?",
          solution: { method: "Find the symptoms in paragraph 1.", steps: ["全身没力 + 发高烧 → it knew it was ill."], tip: "List the symptoms it felt." },
        },
        {
          id: "p3_zh_wa2_sn_019", type: "OpenEnded", q: "从哪里可以看出牛医生没办法把白马的病医好？（2分）",
          answer: "从“牛医生为白马看完病后，没开药给白马吃，只叫白马回家后要好好休息。”可以看出牛医生没法把白马的病医好。",
          pinyin: "Cóng nǎlǐ kěyǐ kàn chū niú yīshēng méi bànfǎ bǎ báimǎ de bìng yī hǎo?",
          meaning: "How can we tell the cow-doctor couldn't cure the white horse's illness?",
          solution: { method: "Find the doctor's action.", steps: ["没开药，只叫它回家休息 → couldn't cure it."], tip: "Point to the clue: no medicine, just rest." },
        },
        {
          id: "p3_zh_wa2_sn_020", type: "OpenEnded", q: "那些没有生病的动物知道有一种新的病后，有什么反应？（1分）",
          answer: "那些没生病的动物知道有一种新的病后，十分害怕，不知道怎么办才好。",
          pinyin: "Nàxiē méiyǒu shēngbìng de dòngwù zhīdào yǒu yì zhǒng xīn de bìng hòu, yǒu shénme fǎnyìng?",
          meaning: "How did the healthy animals react on learning about the new illness?",
          solution: { method: "Find their reaction in paragraph 2.", steps: ["十分害怕，不知道怎么办才好."], tip: "State their fear directly." },
        },
        {
          id: "p3_zh_wa2_sn_021", type: "OpenEnded", q: "为什么那些没生病的动物要到处找食物？（3分）",
          answer: "那些没生病的动物要到处找食物，因为它们担心自己会得到那种新的病。它们把找到的食物全搬回家里，这样一来，它们就可以一直留在家里，等那些病倒的动物身体好了之后才出来。",
          pinyin: "Wèishéme nàxiē méi shēngbìng de dòngwù yào dàochù zhǎo shíwù?",
          meaning: "Why did the healthy animals go everywhere looking for food?",
          solution: { method: "Find the reason and the plan.", steps: ["怕得病 → 囤积食物 → 留在家里等病倒的动物好了才出来."], tip: "Give the fear plus how hoarding food lets them stay home." },
        },
        {
          id: "p3_zh_wa2_sn_022", type: "OpenEnded", q: "你从这个故事中学到了什么道理？（2分）",
          answer: "我从这个故事中学到了在困难的时候，大家应该互相照顾。",
          pinyin: "Nǐ cóng zhège gùshi zhōng xué dào le shénme dàolǐ?",
          meaning: "What lesson did you learn from this story?",
          solution: { method: "Use 大象先生's words as the moral.", steps: ["在困难的时候，大家应该互相照顾 (and not hoard / panic)."], tip: "The moral: help one another in hard times." },
        },
      ],
    },
  ],
};

export default wa2StNicholasHcl;
