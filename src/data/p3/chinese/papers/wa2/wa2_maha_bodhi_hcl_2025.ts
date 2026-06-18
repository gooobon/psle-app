// =============================================================================
// P3 Chinese WA2 — Maha Bodhi Primary School (菩提学校) Higher Chinese
// 2025 高级华文 积分测试（二）/ 2025 Weighted Assessment 2 · 语文应用与理解 section
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY (P144). <<
// -----------------------------------------------------------------------------
// NOTE: The 看图写段 (guided picture composition, ≥50 字) component on the cover page
//       is a WRITING task and is EXCLUDED per the project's "no composition" rule.
//       This file contains only the 17 objective questions of the language paper.
//       Per-section marks were not printed on the paper.
// IDs namespaced with `_mb_`. CONVENTION: MCQ `answer` = 0-BASED index.
//   - 短文填空: sub-question MCQ whose `options` = the shared wordBank.
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

export const wa2MahaBodhiHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_maha_bodhi_hcl",
    school: "Maha Bodhi Primary School",
    schoolZh: "菩提学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2025 Weighted Assessment 2 (积分测试二 — 语文应用与理解; 看图写段 excluded)",
    source: "sgexam.com — Maha Bodhi 2025 WA2 (answers verified by official key)",
    totalMarks: 17,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q5)
    {
      id: "p3_zh_wa2_mb_001", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "快下雨了，妈妈（　）忙把衣服收进屋里。", options: ["连", "过", "边", "迟"], answer: 0,
      pinyin: "Kuài xià yǔ le, māma liánmáng bǎ yīfu shōu jìn wū lǐ.",
      meaning: "It was about to rain, so mum hurriedly brought the clothes inside.",
      solution: { method: "Form the word 连忙.", steps: ["（　）忙 → 连忙 (hurriedly) → 连."], tip: "连忙 = hurriedly; the options all share the 辶 radical." },
    },
    {
      id: "p3_zh_wa2_mb_002", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "奶奶叫我（　）她到楼下去买面包。", options: ["队", "除", "阵", "陪"], answer: 3,
      pinyin: "Nǎinai jiào wǒ péi tā dào lóuxià qù mǎi miànbāo.",
      meaning: "Grandma asked me to go downstairs with her to buy bread.",
      solution: { method: "Which word means 'accompany'?", steps: ["（　）她到楼下 → 陪她 (accompany) → 陪."], tip: "陪 = accompany; the options all share the 阝 radical." },
    },
    {
      id: "p3_zh_wa2_mb_003", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "小树的树干越来越（　），树枝越来越长。", options: ["组", "姐", "粗", "助"], answer: 2,
      pinyin: "Xiǎo shù de shùgàn yuèláiyuè cū, shùzhī yuèláiyuè cháng.",
      meaning: "The little tree's trunk grows thicker and its branches grow longer.",
      solution: { method: "How does a trunk grow?", steps: ["树干越来越（　）→ 粗 (thick) → 粗."], tip: "粗 = thick (for trunks)." },
    },
    {
      id: "p3_zh_wa2_mb_004", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "文华将来想当（　）学家。", options: ["棵", "科", "客", "渴"], answer: 1,
      pinyin: "Wénhuá jiānglái xiǎng dāng kēxuéjiā.",
      meaning: "Wenhua wants to become a scientist in the future.",
      solution: { method: "Form the word 科学家.", steps: ["（　）学家 → 科学家 (scientist) → 科."], tip: "科学家 = scientist; 科 here." },
    },
    {
      id: "p3_zh_wa2_mb_005", topic: "BianZi", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "小乐每天都会（　）习老师教的课文。", options: ["福", "复", "服", "父"], answer: 1,
      pinyin: "Xiǎo Lè měitiān dōu huì fùxí lǎoshī jiāo de kèwén.",
      meaning: "Xiao Le revises the texts the teacher taught every day.",
      solution: { method: "Form the word 复习.", steps: ["（　）习 → 复习 (revise) → 复."], tip: "复习 = revise; 复 here (not 福/服/父)." },
    },

    // 二、词语选择 — CiYu (Q6–Q10)
    {
      id: "p3_zh_wa2_mb_006", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "只要你好好（　），一定可以把画画好。", options: ["希望", "睡觉", "努力", "变化"], answer: 2,
      pinyin: "Zhǐyào nǐ hǎohǎo nǔlì, yídìng kěyǐ bǎ huà huà hǎo.",
      meaning: "As long as you work hard, you can definitely draw well.",
      solution: { method: "What must you do to draw well?", steps: ["好好（　）→ 好好努力 (work hard) → 努力."], tip: "努力 = work hard / make an effort." },
    },
    {
      id: "p3_zh_wa2_mb_007", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "他说的话都不是真的，你不要（　）他。", options: ["认识", "相信", "保卫", "争取"], answer: 1,
      pinyin: "Tā shuō de huà dōu bú shì zhēn de, nǐ bú yào xiāngxìn tā.",
      meaning: "What he says isn't true; don't believe him.",
      solution: { method: "What should you not do to a liar?", steps: ["不要（　）他 → 不要相信 (believe) → 相信."], tip: "相信 = believe/trust." },
    },
    {
      id: "p3_zh_wa2_mb_008", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "鱼儿（　）着尾巴，在水里游来游去。", options: ["摆动", "活动", "走动", "运动"], answer: 0,
      pinyin: "Yúr bǎidòng zhe wěiba, zài shuǐ lǐ yóu lái yóu qù.",
      meaning: "The fish swishes its tail, swimming around in the water.",
      solution: { method: "How does a fish move its tail?", steps: ["（　）着尾巴 → 摆动 (swish/sway) → 摆动."], tip: "摆动 = sway/swing (the tail)." },
    },
    {
      id: "p3_zh_wa2_mb_009", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "哥哥改掉了坏（　），不再让妈妈伤心。", options: ["练习", "心情", "伙伴", "习惯"], answer: 3,
      pinyin: "Gēge gǎi diào le huài xíguàn, bú zài ràng māma shāngxīn.",
      meaning: "Big brother got rid of his bad habit and no longer makes mum sad.",
      solution: { method: "What can you 改掉 (get rid of)?", steps: ["改掉坏（　）→ 坏习惯 (bad habit) → 习惯."], tip: "改掉坏习惯 = get rid of a bad habit." },
    },
    {
      id: "p3_zh_wa2_mb_010", topic: "CiYu", difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      q: "林阿姨讲的故事非常（　），大家都听得很认真。", options: ["准时", "有趣", "懂事", "热闹"], answer: 1,
      pinyin: "Lín āyí jiǎng de gùshi fēicháng yǒuqù, dàjiā dōu tīng de hěn rènzhēn.",
      meaning: "Auntie Lin's story was very interesting, and everyone listened attentively.",
      solution: { method: "Describe a story everyone listens to closely.", steps: ["故事非常（　）→ 有趣 (interesting) → 有趣."], tip: "有趣 = interesting; fits a story." },
    },

    // 三、短文填空 — TianKong (Q11–Q14, two short passages from textbook)
    {
      id: "p3_zh_wa2_mb_set1", topic: "TianKong", difficulty: "core",
      setLabel: "菩提学校 P3 HCL WA2 — 短文填空（课文一、课文三）",
      instruction: "根据短文的内容和上下文的意思，选出适当的答案（每个选项只能用一次）。",
      wordBank: ["从来", "样子", "上面", "愿望", "为了", "颜色"],
      passage:
        "（取自课文第一课）有时候，我站在镜子前，学着老师的【Q11】：“同学们，请把书打开，翻到第十页，跟我读。”这个美丽的【Q12】好像就在眼前。\n\n" +
        "（取自课文第三课）这只手表十分特别。它是粉红的，是我最喜欢的【Q13】。它的形状是三角形的，我【Q14】没有见过三角形的手表！它还有一个表盖，上面画着一个小公主的图案。表盖旁边有一个按钮，一按按钮，表盖就会打开，我就能看到时间。",
      questions: [
        { id: "p3_zh_wa2_mb_011", type: "MCQ", q: "我站在镜子前，学着老师的（　）。", options: ["从来","样子","上面","愿望","为了","颜色"], answer: 1,
          pinyin: "yàngzi", meaning: "appearance / manner",
          solution: { method: "What do you imitate of a teacher?", steps: ["学着老师的（　）→ 样子 (manner) → 样子."], tip: "学着…的样子 = imitate the way/manner of…" } },
        { id: "p3_zh_wa2_mb_012", type: "MCQ", q: "这个美丽的（　）好像就在眼前。", options: ["从来","样子","上面","愿望","为了","颜色"], answer: 3,
          pinyin: "yuànwàng", meaning: "wish / aspiration",
          solution: { method: "What can be 美丽 and 在眼前?", steps: ["美丽的（　）→ 愿望 (becoming a teacher) → 愿望."], tip: "愿望 = wish/aspiration." } },
        { id: "p3_zh_wa2_mb_013", type: "MCQ", q: "它是粉红的，是我最喜欢的（　）。", options: ["从来","样子","上面","愿望","为了","颜色"], answer: 5,
          pinyin: "yánsè", meaning: "colour",
          solution: { method: "粉红 is a kind of what?", steps: ["粉红…我最喜欢的（　）→ 颜色 (colour) → 颜色."], tip: "粉红 (pink) is a 颜色 (colour)." } },
        { id: "p3_zh_wa2_mb_014", type: "MCQ", q: "我（　）没有见过三角形的手表！", options: ["从来","样子","上面","愿望","为了","颜色"], answer: 0,
          pinyin: "cónglái", meaning: "never (up to now)",
          solution: { method: "Which goes with 没有…过?", steps: ["（　）没有见过 → 从来没有见过 (never seen) → 从来."], tip: "从来 + 没(有)…过 = have never …" } },
      ],
    },

    // 四、阅读理解 — YueReadMCQ (Q15–Q17, 小猫米米)
    {
      id: "p3_zh_wa2_mb_set2", topic: "YueReadMCQ", difficulty: "core",
      setLabel: "菩提学校 P3 HCL WA2 — 阅读理解（小猫米米与奇怪的书包）",
      instruction: "从各题所提供的四个选项中，选出适当的答案。",
      passage:
        "一天，小猫米米发现桌子上有一个奇怪的书包。这个书包会自己动，还会发出声音。米米很好奇，就走上前去看一看。\n\n" +
        "米米试着用爪子拍了拍书包，书包没有再动，也安静了下来。米米感到害怕想要躲起来，可是它又想知道书包里有什么。它跳上桌子，用力地踢了书包一下。书包掉在地上，打开了！\n\n" +
        "这时，书包里跳出了一只玩具小鸡。小鸡在地上走来走去，还一直“叽叽”叫。米米怕得马上跳到椅子上。它小心地看了一会儿，发现小鸡原来一点儿也不可怕。\n\n" +
        "后来，米米把小鸡当成了好朋友，每天一起玩。米米很高兴自己没有因为害怕就躲起来，要是它躲起来，就不会发现新事物了！",
      questions: [
        { id: "p3_zh_wa2_mb_015", type: "MCQ", q: "米米第一次看到书包时，它是怎么做的？",
          options: ["它用爪子去拍书包。", "它走上前去看一看。", "它马上跳到椅子上。", "它找个地方躲起来。"], answer: 1,
          pinyin: "Mǐmi dì-yī cì kàndào shūbāo shí, tā shì zěnme zuò de?",
          meaning: "What did Mimi do when it first saw the bag?",
          solution: { method: "Find the first action.", steps: ["米米很好奇，就走上前去看一看 → 走上前去看一看."], tip: "拍书包/跳椅子 happen later; the first action is approaching to look." } },
        { id: "p3_zh_wa2_mb_016", type: "MCQ", q: "米米为什么用力地踢了书包一下？",
          options: ["因为它要让书包不停地动。", "因为它要让书包发出声音。", "因为它想知道怎么打开书包。", "因为它想知道书包里有什么。"], answer: 3,
          pinyin: "Mǐmi wèishéme yònglì de tī le shūbāo yí xià?",
          meaning: "Why did Mimi kick the bag hard?",
          solution: { method: "Find its motive before kicking.", steps: ["它想知道书包里有什么 → 用力踢开它."], tip: "Curiosity about the contents drove the kick." } },
        { id: "p3_zh_wa2_mb_017", type: "MCQ", q: "这件事让米米学到了什么？",
          options: ["不可以动别人的东西。", "不可以去发现新事物。", "不能因为害怕就躲起来。", "不能因为好奇就做错事。"], answer: 2,
          pinyin: "Zhè jiàn shì ràng Mǐmi xué dào le shénme?",
          meaning: "What did Mimi learn from this?",
          solution: { method: "Read the last paragraph's reflection.", steps: ["要是它躲起来，就不会发现新事物 → 不能因为害怕就躲起来."], tip: "The lesson: don't hide out of fear, or you'll miss new things." } },
      ],
    },
  ],
};

export default wa2MahaBodhiHcl;
