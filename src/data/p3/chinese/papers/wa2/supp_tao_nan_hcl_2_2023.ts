// =============================================================================
// P3 Chinese — Tao Nan School (道南学校) Higher Chinese
// 2023 三年级高级华文补充作业 (Supplementary Worksheet — number NOT printed in PDF;
//   labelled here as the 2nd Tao Nan supplementary worksheet in this compilation)
// Source: sgexam.com  |  Total: 45 marks, 33 questions
// >> ALL answers verified against the official ANSWER KEY printed in the PDF. <<
// -----------------------------------------------------------------------------
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配 / 短文填空: sub-question is MCQ whose `options` = the shared wordBank.
//   - Rewrite / open-ended: `answer` is model-answer text.
// =============================================================================

export type Difficulty = "foundation" | "core" | "stretch";

export type ChineseTopic =
  | "PinYin"
  | "BianZi"
  | "CiYu"
  | "KanTu"
  | "PeiDui"
  | "TianKong"
  | "JuZi"
  | "ZuJu"
  | "YueReadMCQ"
  | "YueReadOpen";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export interface SingleQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: number | string;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SetSubQuestion {
  id: string;
  type: "MCQ" | "OpenEnded";
  q: string;
  options?: string[];
  answer: number | string;
  imageHint?: string;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SetQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  setLabel: string;
  instruction?: string;
  passage?: string;
  wordBank?: string[];
  questions: SetSubQuestion[];
}

export type ChineseItem = SingleQuestion | SetQuestion;

export interface PaperMeta {
  paperId: string;
  school: string;
  schoolZh: string;
  level: string;
  subject: string;
  term: string;
  source: string;
  totalMarks: number;
}

export interface ChinesePaper {
  meta: PaperMeta;
  items: ChineseItem[];
}

export const suppTaoNanHcl2: ChinesePaper = {
  meta: {
    paperId: "p3_zh_supp_tn2_tao_nan_hcl",
    school: "Tao Nan School",
    schoolZh: "道南学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2023 Supplementary Worksheet (补充作业, number not printed)",
    source: "sgexam.com — Tao Nan 2023 补充作业 (answers verified by official key)",
    totalMarks: 45,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q5)
    {
      id: "p3_zh_supp_tn2_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "这袋米太重了，奶奶一人（　）不动。",
      options: ["披", "排", "抖", "提"],
      answer: 3,
      pinyin: "Zhè dài mǐ tài zhòng le, nǎinai yì rén tí bú dòng.",
      meaning: "This bag of rice is too heavy; grandma alone cannot lift it.",
      solution: {
        method: "Pick the verb for lifting something heavy.",
        steps: ["（　）不动 a heavy bag → 提不动 (cannot lift) → 提."],
        tip: "提 (with 扌 hand radical) = lift/carry by hand.",
      },
    },
    {
      id: "p3_zh_supp_tn2_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "同学们听了老师说的笑话，都（　）不住笑了。",
      options: ["忍", "念", "志", "忘"],
      answer: 0,
      pinyin: "Tóngxué men tīng le lǎoshī shuō de xiàohua, dōu rěn bú zhù xiào le.",
      meaning: "After hearing the teacher's joke, the students couldn't help laughing.",
      solution: {
        method: "Recall the phrase 忍不住.",
        steps: ["都（　）不住笑了 → 忍不住 (can't hold back) → 忍."],
        tip: "忍不住 = can't help (doing something).",
      },
    },
    {
      id: "p3_zh_supp_tn2_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "小华常常在班上（　）负同学，大家都不喜欢他。",
      options: ["棋", "旗", "期", "欺"],
      answer: 3,
      pinyin: "Xiǎo Huá chángcháng zài bān shàng qīfu tóngxué, dàjiā dōu bù xǐhuan tā.",
      meaning: "Xiao Hua often bullies classmates, so nobody likes him.",
      solution: {
        method: "Form the word 欺负.",
        steps: ["（　）负同学 → 欺负 (bully) → 欺."],
        tip: "棋/旗/期/欺 share the 其 part — pick the one that means 'bully'.",
      },
    },
    {
      id: "p3_zh_supp_tn2_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "妈妈只（　）了妹妹几口饭，妹妹就说她饱了。",
      options: ["喂", "吹", "咬", "吐"],
      answer: 0,
      pinyin: "Māma zhǐ wèi le mèimei jǐ kǒu fàn, mèimei jiù shuō tā bǎo le.",
      meaning: "Mum had only fed little sister a few mouthfuls of rice when she said she was full.",
      solution: {
        method: "Which verb means giving food to someone?",
        steps: ["（　）了妹妹几口饭 → 喂 (feed) → 喂."],
        tip: "喂 = feed (give food to a person/animal).",
      },
    },
    {
      id: "p3_zh_supp_tn2_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "小熊（　）坑里倒水，直到水满了为止。",
      options: ["主", "往", "住", "注"],
      answer: 1,
      pinyin: "Xiǎo xióng wǎng kēng lǐ dào shuǐ, zhídào shuǐ mǎn le wéizhǐ.",
      meaning: "The little bear poured water into the pit until it was full.",
      solution: {
        method: "Choose the word meaning 'towards/into'.",
        steps: ["（　）坑里倒水 → 往坑里倒水 (pour into the pit) → 往."],
        tip: "往…里 = into…; 往 marks direction.",
      },
    },

    // 二、汉语拼音 — PinYin (Q6–Q7)
    {
      id: "p3_zh_supp_tn2_006",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节。",
      q: "小丽买了一杯汽水，但忘了拿<u>吸管</u>。",
      options: ["sī guǎn", "xī guǎn", "sī guǎng", "xī guǎng"],
      answer: 1,
      pinyin: "xīguǎn",
      meaning: "straw (the underlined word 吸管)",
      solution: {
        method: "Check the initial of 吸 and the final of 管.",
        steps: ["吸 = xī (x-, not s-).", "管 = guǎn (no -ng). So 吸管 = xī guǎn."],
        tip: "Watch x vs s, and -an vs -ang.",
      },
    },
    {
      id: "p3_zh_supp_tn2_007",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节。",
      q: "小明就住在学校<u>附近</u>，上学很方便。",
      options: ["fú jìn", "fù jìn", "fú jìng", "fù jìng"],
      answer: 1,
      pinyin: "fùjìn",
      meaning: "nearby / the vicinity (the underlined word 附近)",
      solution: {
        method: "Check the tone of 附 and the final of 近.",
        steps: ["附 = fù (4th tone).", "近 = jìn (no -ng). So 附近 = fù jìn."],
        tip: "Watch the tone (fú vs fù) and -in vs -ing.",
      },
    },

    // 三、词语选择 — CiYu (Q8–Q11)
    {
      id: "p3_zh_supp_tn2_008",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "王老太太的儿女都在国外工作，只有她养的小猫（　）在她身边。",
      options: ["跟从", "保护", "陪伴", "招呼"],
      answer: 2,
      pinyin: "Wáng lǎo tàitai de érnǚ dōu zài guówài gōngzuò, zhǐyǒu tā yǎng de xiǎo māo péibàn zài tā shēnbiān.",
      meaning: "Old Mrs Wang's children all work abroad; only the cat she keeps stays by her side.",
      solution: {
        method: "Which word means 'keep company'?",
        steps: ["小猫（　）在她身边 → 陪伴 (accompany) → 陪伴."],
        tip: "陪伴 = accompany / keep someone company.",
      },
    },
    {
      id: "p3_zh_supp_tn2_009",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "小明突然不来学校上课，同学们都感到很（　）。",
      options: ["吃惊", "满意", "兴奋", "快活"],
      answer: 0,
      pinyin: "Xiǎo Míng tūrán bù lái xuéxiào shàngkè, tóngxué men dōu gǎndào hěn chījīng.",
      meaning: "Xiao Ming suddenly didn't come to school, and the classmates all felt very surprised.",
      solution: {
        method: "Use the clue word 突然 (suddenly).",
        steps: ["突然不来 → people feel 吃惊 (surprised) → 吃惊."],
        tip: "突然 often leads to 吃惊; 满意/兴奋/快活 don't fit a surprise.",
      },
    },
    {
      id: "p3_zh_supp_tn2_010",
      topic: "CiYu",
      difficulty: "stretch",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "（　）时间还早，你吃了晚餐后才回家。",
      options: ["除了", "假如", "只要", "反正"],
      answer: 3,
      pinyin: "Fǎnzhèng shíjiān hái zǎo, nǐ chī le wǎncān hòu cái huíjiā.",
      meaning: "Anyway, it's still early — go home after you've had dinner.",
      solution: {
        method: "Pick the connective that means 'in any case'.",
        steps: ["（　）时间还早 → 反正 (anyway / in any case) → 反正."],
        tip: "反正 = anyway; states a fact that doesn't change the result.",
      },
    },
    {
      id: "p3_zh_supp_tn2_011",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "经过（　）后，大家都同意让小丽当班长。",
      options: ["说明", "讨论", "指定", "请求"],
      answer: 1,
      pinyin: "Jīngguò tǎolùn hòu, dàjiā dōu tóngyì ràng Xiǎo Lì dāng bānzhǎng.",
      meaning: "After discussion, everyone agreed to make Xiao Li the class monitor.",
      solution: {
        method: "What happens before everyone agrees?",
        steps: ["经过（　）后大家同意 → 讨论 (discussion) → 讨论."],
        tip: "经过讨论 = after discussing; leads to a shared decision.",
      },
    },

    // 四、词语搭配 — PeiDui (Q12–Q16)
    {
      id: "p3_zh_supp_tn2_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业 — 词语搭配",
      instruction:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。",
      wordBank: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
      questions: [
        {
          id: "p3_zh_supp_tn2_012",
          type: "MCQ",
          q: "（　）复习",
          options: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
          answer: 0,
          pinyin: "rènzhēn fùxí",
          meaning: "to revise diligently / seriously",
          solution: { method: "How should one revise?", steps: ["认真复习 = revise seriously → 认真."], tip: "认真 = serious/careful; describes attitude." },
        },
        {
          id: "p3_zh_supp_tn2_013",
          type: "MCQ",
          q: "（　）身体",
          options: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
          answer: 2,
          pinyin: "bǎidòng shēntǐ",
          meaning: "to sway / move the body",
          solution: { method: "Which verb goes with 身体?", steps: ["摆动身体 = sway the body → 摆动."], tip: "摆动 = swing/sway side to side." },
        },
        {
          id: "p3_zh_supp_tn2_014",
          type: "MCQ",
          q: "轻声（　）",
          options: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
          answer: 4,
          pinyin: "qīngshēng shuōhuà",
          meaning: "to speak softly / in a low voice",
          solution: { method: "What do you do 轻声 (softly)?", steps: ["轻声说话 = speak softly → 说话."], tip: "轻声 + 说话 = talk quietly." },
        },
        {
          id: "p3_zh_supp_tn2_015",
          type: "MCQ",
          q: "爱护（　）",
          options: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
          answer: 5,
          pinyin: "àihù chǒngwù",
          meaning: "to care for / look after pets",
          solution: { method: "What can you 爱护 (cherish/care for)?", steps: ["爱护宠物 = care for pets → 宠物."], tip: "爱护 pairs with living things/objects you protect (宠物/花草/公物)." },
        },
        {
          id: "p3_zh_supp_tn2_016",
          type: "MCQ",
          q: "参加（　）",
          options: ["认真", "比赛", "摆动", "国家", "说话", "宠物"],
          answer: 1,
          pinyin: "cānjiā bǐsài",
          meaning: "to take part in a competition",
          solution: { method: "What do you 参加 (take part in)?", steps: ["参加比赛 = join a competition → 比赛."], tip: "参加 + event (比赛/活动/考试)." },
        },
      ],
    },

    // 五、改写句子(A组 ZuJu) + 扩写句子(B组 JuZi) (Q17–Q20)
    {
      id: "p3_zh_supp_tn2_017",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。",
      q: "妹妹想要养小猫。妹妹不懂得怎么照顾小猫。（却）",
      answer: "妹妹想要养小猫，却不懂得怎么照顾小猫。",
      pinyin: "Mèimei xiǎng yào yǎng xiǎo māo, què bù dǒngde zěnme zhàogù xiǎo māo.",
      meaning: "Little sister wants to keep a cat, but doesn't know how to take care of one.",
      solution: {
        method: "Join two contrasting facts with 却.",
        steps: ["Keep the subject once: 妹妹.", "Link the wish and the problem with 却 (but/yet)."],
        tip: "却 shows an unexpected contrast; it goes before the verb.",
      },
    },
    {
      id: "p3_zh_supp_tn2_018",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。",
      q: "刚下了一场雨。天气还是很热。（虽然……但是……）",
      answer: "虽然刚下了一场雨，但是天气还是很热。",
      pinyin: "Suīrán gāng xià le yì cháng yǔ, dànshì tiānqì háishi hěn rè.",
      meaning: "Although it just rained, the weather is still very hot.",
      solution: {
        method: "Use the paired connectives 虽然…但是….",
        steps: ["虽然 + first fact (it rained).", "但是 + the contrasting fact (still hot)."],
        tip: "虽然…但是… always come as a pair.",
      },
    },
    {
      id: "p3_zh_supp_tn2_019",
      topic: "JuZi",
      difficulty: "core",
      instruction: "B组：请用括号里的短语扩写句子。",
      q: "上课时，小文拿出一本漫画书来读。（偷偷地）",
      answer: "上课时，小文偷偷地拿出一本漫画书来读。",
      pinyin: "Shàngkè shí, Xiǎo Wén tōutōu de ná chū yì běn mànhuà shū lái dú.",
      meaning: "During the lesson, Xiao Wen secretly took out a comic book to read.",
      solution: {
        method: "Insert the manner phrase before the verb.",
        steps: ["偷偷地 describes how he took it out → put it before 拿出."],
        tip: "Adverbs ending in 地 go right before the verb.",
      },
    },
    {
      id: "p3_zh_supp_tn2_020",
      topic: "JuZi",
      difficulty: "core",
      instruction: "B组：请用括号里的短语扩写句子。",
      q: "爷爷坐在沙发上看电视，结果睡着了。（不知不觉）",
      answer: "爷爷坐在沙发上看电视，结果不知不觉睡着了。",
      pinyin: "Yéye zuò zài shāfā shàng kàn diànshì, jiéguǒ bùzhī-bùjué shuìzháo le.",
      meaning: "Grandpa sat on the sofa watching TV and, without realising it, fell asleep.",
      solution: {
        method: "Place the phrase before the verb it modifies.",
        steps: ["不知不觉 describes falling asleep → put it before 睡着了."],
        tip: "不知不觉 = without noticing; fits before an action that happens unawares.",
      },
    },

    // 六、短文填空 — TianKong (Q21–Q24)
    {
      id: "p3_zh_supp_tn2_set2",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业 — 短文填空（农夫救阿强）",
      instruction: "根据短文的内容，选出最适当的答案填入空格（每个词语用一次）。",
      wordBank: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
      passage:
        "阿强到城里去买东西，在路上碰到了坏人。坏人不但把他打伤，还抢走了他的钱，把他丢下后就【Q21】了。\n\n" +
        "过了不久，一个商人路过，见阿强受伤了，不想上前帮他，马上走掉了。\n\n" +
        "后来，一个农夫看见阿强躺在地上，便【Q22】走上前去，把他扶回家。农夫帮阿强把伤口【Q23】干净，然后让他躺在床上休息。\n\n" +
        "第二天一早，农夫出门前，想到阿强会肚子饿，便把食物【Q24】好了才去种田。阿强起身看见桌上的食物，感动得流下了眼泪。",
      questions: [
        {
          id: "p3_zh_supp_tn2_021",
          type: "MCQ",
          q: "坏人把他丢下后就（　）了。",
          options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
          answer: 4,
          pinyin: "táozǒu",
          meaning: "to flee / run away",
          solution: { method: "What does a bad person do after a crime?", steps: ["坏人（　）了 → 逃走 (fled) → 逃走."], tip: "逃走 = run away/escape." },
        },
        {
          id: "p3_zh_supp_tn2_022",
          type: "MCQ",
          q: "农夫看见阿强躺在地上，便（　）走上前去。",
          options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
          answer: 0,
          pinyin: "jímáng",
          meaning: "hurriedly / in a hurry",
          solution: { method: "How did the farmer go forward to help?", steps: ["（　）走上前去 → 急忙 (hurriedly) → 急忙."], tip: "急忙 = in a hurry; describes a quick reaction." },
        },
        {
          id: "p3_zh_supp_tn2_023",
          type: "MCQ",
          q: "农夫帮阿强把伤口（　）干净。",
          options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
          answer: 3,
          pinyin: "qīngxǐ",
          meaning: "to wash / clean (a wound)",
          solution: { method: "What do you do to a wound to make it 干净?", steps: ["把伤口（　）干净 → 清洗 (wash clean) → 清洗."], tip: "清洗…干净 = wash until clean (清洁 is an adjective, not a verb here)." },
        },
        {
          id: "p3_zh_supp_tn2_024",
          type: "MCQ",
          q: "农夫把食物（　）好了才去种田。",
          options: ["急忙", "准备", "清洁", "清洗", "逃走", "出发"],
          answer: 1,
          pinyin: "zhǔnbèi",
          meaning: "to prepare",
          solution: { method: "What do you do with food before leaving?", steps: ["把食物（　）好 → 准备好 (got it ready) → 准备."], tip: "准备好 = get something ready." },
        },
      ],
    },

    // 七、阅读理解 (选择) — YueReadMCQ set (Q25–Q28)
    {
      id: "p3_zh_supp_tn2_set3",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业 — 阅读理解（王伯伯的第一百个客人）",
      instruction: "根据短文的内容，选出最适当的答案。",
      passage:
        "王伯伯开了一家餐馆。他很热心，煮的食物也很美味。客人们都喜欢吃王伯伯的炒饭，因此餐馆外面常常有很多人在排队。\n\n" +
        "一天下午，一个老奶奶带着一个男孩走进了餐馆。老奶奶点了一盘炒饭。她把炒饭放到男孩的面前，让他自己吃。男孩小声地问老奶奶：“奶奶，您不喜欢吃炒饭吗？”老奶奶笑着对他说：“我不饿。”王伯伯看见了，又炒了一盘炒饭给老奶奶，对她说：“您是我们今天的第一百个客人，这两盘炒饭是送给你们的。”老奶奶听了，连声向王伯伯道谢，然后就和男孩一起吃炒饭。\n\n" +
        "第二天早上，王伯伯正在休息时，看到男孩坐在餐馆外面。男孩每看见一个客人走进店里，就把一块小石头放进他在地上画的圆圈里。午餐时间都快过了，男孩数了数，小石头却连五十个都不到。王伯伯想了想，就开始打电话给他的朋友们，把这件事告诉他们，问他们有没有空来餐馆吃饭。\n\n" +
        "客人们一个一个地走进餐馆，当第九十九块小石头被放进圆圈里后，男孩立刻站了起来，走进餐馆点了一包炒饭。王伯伯笑着把两包炒饭送给男孩，让他带回家和奶奶吃。",
      questions: [
        {
          id: "p3_zh_supp_tn2_025",
          type: "MCQ",
          q: "为什么很多客人在王伯伯的餐馆外面排队？",
          options: ["客人要向王伯伯道谢。", "客人要请王伯伯吃午餐。", "客人觉得王伯伯很热心。", "客人喜欢王伯伯煮的食物。"],
          answer: 3,
          pinyin: "Wèishéme hěnduō kèrén zài Wáng bóbo de cānguǎn wàimiàn páiduì?",
          meaning: "Why did many customers queue outside Uncle Wang's restaurant?",
          solution: {
            method: "Find the reason in paragraph 1.",
            steps: ["客人们都喜欢吃王伯伯的炒饭 → 喜欢王伯伯煮的食物."],
            tip: "热心 describes his character, but the queue is for his tasty food.",
          },
        },
        {
          id: "p3_zh_supp_tn2_026",
          type: "MCQ",
          q: "为什么男孩把石头放进他画的圆圈里？",
          options: ["他要把石头送给他的朋友。", "他要把石头带回家给奶奶看。", "他要数五十个石头才有炒饭吃。", "他要数有几个客人走进餐馆吃饭。"],
          answer: 3,
          pinyin: "Wèishéme nánhái bǎ shítou fàng jìn tā huà de yuánquān lǐ?",
          meaning: "Why did the boy put stones into the circle he drew?",
          solution: {
            method: "See what he does each time a customer enters.",
            steps: ["每看见一个客人走进店里就放一块石头 → counting customers.", "He wants to be the 100th customer (free fried rice)."],
            tip: "One stone = one customer; he is counting how many have entered.",
          },
        },
        {
          id: "p3_zh_supp_tn2_027",
          type: "MCQ",
          q: "王伯伯打电话给他的朋友们的原因是什么？",
          options: ["他想要朋友们去他的餐馆休息。", "他想请朋友们帮助男孩得到炒饭。", "他想知道朋友们喜不喜欢吃他的炒饭。", "他想让朋友们知道自己开了一家餐馆。"],
          answer: 1,
          pinyin: "Wáng bóbo dǎ diànhuà gěi tā de péngyou men de yuányīn shì shénme?",
          meaning: "Why did Uncle Wang phone his friends?",
          solution: {
            method: "Connect his action to the boy's goal.",
            steps: ["王伯伯想了想 (understood the boy wanted to be the 100th customer).", "He called friends to come so the boy could reach 100 → 帮助男孩得到炒饭."],
            tip: "Kindness: he secretly helps the boy win the free meal.",
          },
        },
        {
          id: "p3_zh_supp_tn2_028",
          type: "MCQ",
          q: "以下哪一个句子是对的？",
          options: ["老奶奶不喜欢吃炒饭。", "男孩想买炒饭给奶奶吃。", "王伯伯送给男孩两包炒饭。", "朋友们都没空到餐馆来吃饭。"],
          answer: 2,
          pinyin: "Yǐxià nǎ yí ge jùzi shì duì de?",
          meaning: "Which of the following sentences is correct?",
          solution: {
            method: "Match each option to the text.",
            steps: ["王伯伯笑着把两包炒饭送给男孩 → option 3 is stated directly."],
            tip: "老奶奶 said 我不饿 (not that she dislikes it); friends DID come.",
          },
        },
      ],
    },

    // 八、理解问答 — YueReadOpen set (Q29–Q33)  [theme: 守信用 / 诚实]
    {
      id: "p3_zh_supp_tn2_set4",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "道南学校 P3 HCL 补充作业 — 理解问答（立明卖纸巾，主题：守信用）",
      instruction: "根据文章的内容和上下文的意思，回答下列的问题。",
      passage:
        "每天放学后，立明一做完功课，就出门卖纸巾。一天，他走到一家书店门口，发现一位女士带着一个小女孩正要走进书店，就走上前对她们说：“请买两包纸巾吧，只要一元钱。”女士听了，笑着摇摇头。接着，立明又说：“我的爸爸生病了，妈妈一个人做工，白天帮人家洗衣服，晚上到工厂上班。请您买两包纸巾帮帮我吧。”女士听了，拿出五元钱给立明，向他买了两包纸巾。立明说：“我身上的钱不够，没办法找钱给您，我现在就回家去拿钱。”女士说：“你先拿着这些钱吧。我相信你一定会回来的。”立明听了，接过钱就立刻跑回家。\n\n" +
        "小女孩指着立明对女士说：“妈妈，我们不认识他，如果他不回来了，怎么办？”女士听了，笑着说：“我相信他会回来的。我们进去买书吧。”\n\n" +
        "立明回家拿了钱，马上跑回书店。半路上突然下起了大雨，地上很滑，立明不小心跌倒受伤，脚流了很多血。他走到书店门口，看到女士和小女孩正从书店里走出来，就走上前把钱还给女士。女士看到立明的脚在流血，关心地问他发生了什么事。立明笑着说：“我没事，谢谢您这么相信我。”说完，他就转身离开了。",
      questions: [
        {
          id: "p3_zh_supp_tn2_029a",
          type: "OpenEnded",
          q: "文中形容“发觉”的词语是＿＿＿。（1分）",
          answer: "发现",
          pinyin: "fāxiàn",
          meaning: "to discover / notice (the word in the text)",
          solution: { method: "Find the matching word.", steps: ["“发现一位女士…” → 发现 means notice/discover."], tip: "发现 = discover/notice." },
        },
        {
          id: "p3_zh_supp_tn2_029b",
          type: "OpenEnded",
          q: "文中形容“跟人、物或地方分开”的词语是＿＿＿。（1分）",
          answer: "离开",
          pinyin: "líkāi",
          meaning: "to leave / depart (the word in the text)",
          solution: { method: "Find the matching word.", steps: ["“他就转身离开了” → 离开 = leave/part from."], tip: "离开 = leave a person/place." },
        },
        {
          id: "p3_zh_supp_tn2_030",
          type: "OpenEnded",
          q: "每天放学后，立明会做什么？（1分）",
          answer: "立明一做完功课，就出门卖纸巾。",
          pinyin: "Měitiān fàngxué hòu, Lìmíng huì zuò shénme?",
          meaning: "What does Liming do every day after school?",
          solution: { method: "Find his routine in paragraph 1.", steps: ["一做完功课，就出门卖纸巾."], tip: "Copy the routine straight from the text." },
        },
        {
          id: "p3_zh_supp_tn2_031",
          type: "OpenEnded",
          q: "那位女士为什么决定帮助立明？（2分）",
          answer:
            "因为立明告诉那位女士，他的爸爸生病了，妈妈一个人做工，白天帮人家洗衣服，晚上到工厂上班；女士被他的话打动，所以决定帮助他。",
          pinyin: "Nà wèi nǚshì wèishéme juédìng bāngzhù Lìmíng?",
          meaning: "Why did the lady decide to help Liming?",
          solution: {
            method: "Find what Liming told her.",
            steps: ["He explained his sick father and hard-working mother.", "Moved by this, the lady decided to help."],
            tip: "Begin with 因为 and quote his explanation.",
          },
        },
        {
          id: "p3_zh_supp_tn2_032",
          type: "OpenEnded",
          q: "立明的脚流血的原因是什么？（2分）",
          answer:
            "因为立明着急跑回书店，半路上突然下起了大雨，地上很滑，立明不小心跌倒受伤，脚就流了很多血。",
          pinyin: "Lìmíng de jiǎo liúxiě de yuányīn shì shénme?",
          meaning: "What caused Liming's foot to bleed?",
          solution: {
            method: "Trace the cause in paragraph 3.",
            steps: ["突然下大雨 → 地滑 → 跌倒受伤 → 脚流血.", "Give the chain of causes."],
            tip: "Show the sequence: rain → slippery ground → fall → bleeding.",
          },
        },
        {
          id: "p3_zh_supp_tn2_033",
          type: "OpenEnded",
          q: "你觉得立明是个怎样的孩子？为什么？（2分）",
          answer:
            "我觉得立明是个守信用、诚实的好孩子。因为他答应把多出来的钱还给女士，虽然在路上跌倒受伤，但他仍然坚持走到书店门口，把钱还给了女士。",
          pinyin: "Nǐ juéde Lìmíng shì ge zěnyàng de háizi? Wèishéme?",
          meaning: "What kind of child do you think Liming is? Why?",
          solution: {
            method: "Give a judgement + a reason from the story.",
            steps: ["Part 1: 守信用/诚实 (trustworthy/honest) — ties to the theme.", "Part 2: even injured, he returned to give back the money."],
            tip: "Answer in two parts: what kind of child, then prove it with an event.",
          },
        },
      ],
    },
  ],
};

export default suppTaoNanHcl2;
