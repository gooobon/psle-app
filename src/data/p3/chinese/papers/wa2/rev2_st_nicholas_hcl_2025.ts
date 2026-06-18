// =============================================================================
// P3 Chinese — CHIJ St Nicholas Girls' School (圣尼各拉女校 · 小学) Higher Chinese
// 2025 三年级高级华文复习（二）/ 2025 Revision 2 · 第五课至第八课 · 56 marks · 28 Q
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY (P174+P175). <<
// Distinct from the CHIJ St Nicholas WA2 paper (separate file).
// -----------------------------------------------------------------------------
// IDs namespaced with `_rev2_sn25_`. CONVENTION: MCQ `answer` = 0-BASED index.
//   - 改正错字 (correct the wrong character): topic BianZi, open, answer = correct char.
//   - 填写汉字 / 填写汉语拼音 / 数笔画填拼音: topic PinYin, open, answer = text.
//   - 选择句子: CiYu word-usage MCQ.  看短文回答问题: YueReadMCQ set.
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

export const rev2StNicholas2025Hcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_rev2_st_nicholas_2025_hcl",
    school: "CHIJ St Nicholas Girls' School (Primary)",
    schoolZh: "圣尼各拉女校（小学）",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2025 Revision 2 (复习二 / 第五课至第八课)",
    source: "sgexam.com — CHIJ St Nicholas 2025 Revision 2 (answers verified by official key)",
    totalMarks: 56,
  },
  items: [
    // (一) 改正错字 (10题20分) — BianZi: find the wrong character, write the correct one.
    {
      id: "p3_zh_rev2_sn25_001", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "一开时，我就跑在最前面。（错字“时”应改为？）", answer: "始",
      pinyin: "Yì kāishǐ, wǒ jiù pǎo zài zuì qiánmiàn.",
      meaning: "Right at the start, I ran at the very front. (一开始)",
      solution: { method: "Which word forms 一开始?", steps: ["一开（时/始）→ 一开始 (at the start) → 时 should be 始."], tip: "开始 = begin; not 时." },
    },
    {
      id: "p3_zh_rev2_sn25_002", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "妹妹帮娃娃船上漂亮的裙子。（错字“船”应改为？）", answer: "穿",
      pinyin: "Mèimei bāng wáwá chuān shàng piàoliang de qúnzi.",
      meaning: "Little sister helped the doll put on a pretty dress. (穿上)",
      solution: { method: "Which word means 'put on (clothes)'?", steps: ["（船/穿）上裙子 → 穿上 (put on) → 船 should be 穿."], tip: "穿 = wear/put on; not 船 (boat)." },
    },
    {
      id: "p3_zh_rev2_sn25_003", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "弟弟很热，就把外衣给说了。（错字“说”应改为？）", answer: "脱",
      pinyin: "Dìdi hěn rè, jiù bǎ wàiyī gěi tuō le.",
      meaning: "Little brother was hot, so he took off his jacket. (脱了)",
      solution: { method: "Which word means 'take off'?", steps: ["把外衣给（说/脱）了 → 脱 (take off) → 说 should be 脱."], tip: "脱 = take off; not 说 (speak)." },
    },
    {
      id: "p3_zh_rev2_sn25_004", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "外公的角受伤了，不能做运动。（错字“角”应改为？）", answer: "脚",
      pinyin: "Wàigōng de jiǎo shòushāng le, bù néng zuò yùndòng.",
      meaning: "Grandpa's foot was injured, so he can't exercise. (脚)",
      solution: { method: "Which word means 'foot'?", steps: ["外公的（角/脚）受伤 → 脚 (foot) → 角 should be 脚."], tip: "脚 (with 月/肉 radical) = foot; not 角 (horn/corner)." },
    },
    {
      id: "p3_zh_rev2_sn25_005", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "我一不小心朋倒了邻居的花盆。（错字“朋”应改为？）", answer: "碰",
      pinyin: "Wǒ yí bù xiǎoxīn pèng dǎo le línjū de huāpén.",
      meaning: "I carelessly knocked over the neighbour's flowerpot. (碰倒)",
      solution: { method: "Which word means 'bump/knock'?", steps: ["（朋/碰）倒了花盆 → 碰倒 (knock over) → 朋 should be 碰."], tip: "碰 = bump/knock; not 朋 (friend)." },
    },
    {
      id: "p3_zh_rev2_sn25_006", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "我和妈妈到服近的公园做运动。（错字“服”应改为？）", answer: "附",
      pinyin: "Wǒ hé māma dào fùjìn de gōngyuán zuò yùndòng.",
      meaning: "Mum and I went to a nearby park to exercise. (附近)",
      solution: { method: "Which word forms 附近?", steps: ["（服/附）近的公园 → 附近 (nearby) → 服 should be 附."], tip: "附近 = nearby; not 服." },
    },
    {
      id: "p3_zh_rev2_sn25_007", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "我今天迟到了，来不记坐校车上学。（错字“记”应改为？）", answer: "及",
      pinyin: "Wǒ jīntiān chídào le, láibují zuò xiàochē shàngxué.",
      meaning: "I was late today and didn't make it in time to take the school bus. (来不及)",
      solution: { method: "Which word forms 来不及?", steps: ["来不（记/及）→ 来不及 (no time) → 记 should be 及."], tip: "来不及 = too late; not 记." },
    },
    {
      id: "p3_zh_rev2_sn25_008", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "妹妹跌倒了，爸爸叫她自己吧起来。（错字“吧”应改为？）", answer: "爬",
      pinyin: "Mèimei diēdǎo le, bàba jiào tā zìjǐ pá qǐlái.",
      meaning: "Little sister fell, and dad told her to get up by herself. (爬起来)",
      solution: { method: "Which word means 'get up / crawl up'?", steps: ["自己（吧/爬）起来 → 爬起来 → 吧 should be 爬."], tip: "爬起来 = get up; not 吧 (particle)." },
    },
    {
      id: "p3_zh_rev2_sn25_009", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "外婆父了钱后，便拿着水果回家去。（错字“父”应改为？）", answer: "付",
      pinyin: "Wàipó fù le qián hòu, biàn ná zhe shuǐguǒ huí jiā qù.",
      meaning: "After grandma paid, she took the fruit and went home. (付了钱)",
      solution: { method: "Which word means 'pay'?", steps: ["（父/付）了钱 → 付钱 (pay) → 父 should be 付."], tip: "付 = pay; not 父 (father)." },
    },
    {
      id: "p3_zh_rev2_sn25_010", topic: "BianZi", difficulty: "core",
      instruction: "请圈出错误的汉字，然后把正确的汉字填写在括号里。",
      q: "姐姐吐然出现在我面前，把我吓了一跳。（错字“吐”应改为？）", answer: "突",
      pinyin: "Jiějie tūrán chūxiàn zài wǒ miànqián, bǎ wǒ xià le yí tiào.",
      meaning: "Big sister suddenly appeared in front of me and gave me a fright. (突然)",
      solution: { method: "Which word forms 突然?", steps: ["（吐/突）然出现 → 突然 (suddenly) → 吐 should be 突."], tip: "突然 = suddenly; not 吐 (spit)." },
    },

    // (二) 填写汉字 (5题10分) — PinYin (write the character for the pinyin)
    {
      id: "p3_zh_rev2_sn25_011", topic: "PinYin", difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "制作彩虹转盘＿＿（xū）要硬纸板。", answer: "需",
      pinyin: "xū", meaning: "need (需要)",
      solution: { method: "Write the character for xū.", steps: ["（xū）要 → 需要 (need) → 需."], tip: "需 = need." },
    },
    {
      id: "p3_zh_rev2_sn25_012", topic: "PinYin", difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "这份练习一共有七个＿＿（bù）分。", answer: "部",
      pinyin: "bù", meaning: "part (部分)",
      solution: { method: "Write the character for bù.", steps: ["七个（bù）分 → 部分 (parts) → 部."], tip: "部分 = part." },
    },
    {
      id: "p3_zh_rev2_sn25_013", topic: "PinYin", difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "我的书桌太＿＿（luàn）了，找东西很不方便。", answer: "乱",
      pinyin: "luàn", meaning: "messy (乱)",
      solution: { method: "Write the character for luàn.", steps: ["太（luàn）了 → 乱 (messy) → 乱."], tip: "乱 = messy/disordered." },
    },
    {
      id: "p3_zh_rev2_sn25_014", topic: "PinYin", difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "爸爸把花盆＿＿（bān）到客厅里。", answer: "搬",
      pinyin: "bān", meaning: "to move/carry (搬)",
      solution: { method: "Write the character for bān.", steps: ["把花盆（bān）到 → 搬 (move) → 搬."], tip: "搬 = move/carry (heavy things)." },
    },
    {
      id: "p3_zh_rev2_sn25_015", topic: "PinYin", difficulty: "core",
      instruction: "把跟括号里汉语拼音相应的汉字填写在横线上。",
      q: "爷爷每天＿＿（bàng）晚都会和几个朋友一起下棋。", answer: "傍",
      pinyin: "bàng", meaning: "near (傍晚 = evening)",
      solution: { method: "Write the character for bàng.", steps: ["（bàng）晚 → 傍晚 (evening) → 傍."], tip: "傍晚 = evening/dusk." },
    },

    // (三) 填写汉语拼音 (3题6分) — PinYin (write the pinyin of the underlined words)
    {
      id: "p3_zh_rev2_sn25_016", topic: "PinYin", difficulty: "core",
      instruction: "把划线词语的汉语拼音填写在括号里。",
      q: "我们去<u>逛</u>夜市、<u>尝</u>美食。", answer: "guàng / cháng",
      pinyin: "guàng / cháng", meaning: "to stroll / to taste",
      solution: { method: "Write the pinyin of each underlined word.", steps: ["逛 = guàng (stroll).", "尝 = cháng (taste)."], tip: "Watch the tones: guàng (4th), cháng (2nd)." },
    },
    {
      id: "p3_zh_rev2_sn25_017", topic: "PinYin", difficulty: "core",
      instruction: "把划线词语的汉语拼音填写在括号里。",
      q: "我的活动本不知道是<u>谁</u>弄<u>破</u>的。", answer: "shuí / pò",
      pinyin: "shuí / pò", meaning: "who / to break",
      solution: { method: "Write the pinyin of each underlined word.", steps: ["谁 = shuí (who).", "破 = pò (break)."], tip: "谁 reads shuí (or shéi); 破 = pò." },
    },
    {
      id: "p3_zh_rev2_sn25_018", topic: "PinYin", difficulty: "core",
      instruction: "把划线词语的汉语拼音填写在括号里。",
      q: "他的书包很<u>轻</u>，但水壶却很<u>重</u>。", answer: "qīng / zhòng",
      pinyin: "qīng / zhòng", meaning: "light / heavy",
      solution: { method: "Write the pinyin of each underlined word.", steps: ["轻 = qīng (light).", "重 = zhòng (heavy)."], tip: "轻 (1st tone) vs 重 (zhòng, 4th tone)." },
    },

    // (四) 选择句子 (4题8分) — CiYu word-usage MCQ
    {
      id: "p3_zh_rev2_sn25_019", topic: "CiYu", difficulty: "stretch",
      instruction: "选择正确地使用画线词语的句子。",
      q: "以下哪个句子正确地使用了“连忙”？",
      options: [
        "看见弟弟跌倒了，我连忙跑过去把他扶起来。",
        "我帮妈妈扫地和洗菜，妈妈连忙感到很开心。",
        "门外的小树一天一天连忙长高，变成了大树。",
        "哥哥连忙去跑步和游泳，身体变得非常强壮。",
      ],
      answer: 0,
      pinyin: "liánmáng", meaning: "Which sentence uses 连忙 (hurriedly) correctly?",
      solution: { method: "连忙 = a quick response to something that just happened.", steps: ["弟弟跌倒 → 连忙跑去扶 (correct)."], tip: "连忙 needs a sudden trigger; not for slow growth or habits." },
    },
    {
      id: "p3_zh_rev2_sn25_020", topic: "CiYu", difficulty: "stretch",
      instruction: "选择正确地使用画线词语的句子。",
      q: "以下哪个句子正确地使用了“原谅”？",
      options: [
        "爸妈工作十分辛苦，我们应该原谅他们。",
        "哥哥今天身体很不舒服，我们要原谅他。",
        "他只是去帮同学拿书，我们不要原谅他。",
        "虽然妹妹弄坏我的玩具，我还是原谅她。",
      ],
      answer: 3,
      pinyin: "yuánliàng", meaning: "Which sentence uses 原谅 (forgive) correctly?",
      solution: { method: "原谅 = forgive after a wrongdoing.", steps: ["妹妹弄坏玩具 → 我还是原谅她 (correct)."], tip: "原谅 needs a fault to forgive, not hard work or illness." },
    },
    {
      id: "p3_zh_rev2_sn25_021", topic: "CiYu", difficulty: "stretch",
      instruction: "选择正确地使用画线词语的句子。",
      q: "以下哪个句子正确地使用了“休息”？",
      options: [
        "过去的三年里，王奶奶都在国外的老人院休息。",
        "妹妹放学回家后觉得非常累，就躺在床上休息。",
        "爷爷六十岁那年休息后，每天都到公园打太极。",
        "这家在山上的旅馆空气很新鲜，适合人们休息。",
      ],
      answer: 1,
      pinyin: "xiūxi", meaning: "Which sentence uses 休息 (rest) correctly?",
      solution: { method: "休息 = take a rest when tired.", steps: ["累了 → 躺在床上休息 (correct)."], tip: "住老人院→住; 六十岁→退休; 休息 fits resting when tired." },
    },
    {
      id: "p3_zh_rev2_sn25_022", topic: "CiYu", difficulty: "stretch",
      instruction: "选择正确地使用画线词语的句子。",
      q: "以下哪个句子正确地使用了“整齐”？",
      options: [
        "图书馆里的书摆放得很整齐。",
        "妈妈气我没有把书包整齐好。",
        "老师喜欢鞋袜都整齐的学生。",
        "妹妹每天自己把房间整齐好。",
      ],
      answer: 0,
      pinyin: "zhěngqí", meaning: "Which sentence uses 整齐 (neat) correctly?",
      solution: { method: "整齐 describes things arranged neatly.", steps: ["书摆放得很整齐 (correct)."], tip: "As a verb you 整理 (tidy); 整齐 is the neat result (adjective)." },
    },

    // (五) 看短文，回答问题 (3题6分) — YueReadMCQ set (明明)
    {
      id: "p3_zh_rev2_sn25_set1", topic: "YueReadMCQ", difficulty: "core",
      setLabel: "圣尼各拉女校 P3 HCL 2025 复习二 — 看短文回答问题（懂事的明明）",
      instruction: "看短文，回答问题。",
      passage:
        "一天，妈妈下班回家了。明明看到后，立刻跑过去接过她的皮包，还倒了一杯水给她喝。妈妈摸了摸明明的头，夸他是个懂事的好孩子。\n\n" +
        "吃完晚饭后，明明发现地板上有几粒饭粒，便主动拿起扫把，把地板打扫干净。他还帮忙收拾碗筷，再把餐桌擦干净。爸爸看到了，笑着说：“明明长大了，真是爸爸妈妈的好帮手！”\n\n" +
        "周末，明明知道同学小乐生病了，便特地画了一张美丽的卡片给他。卡片上面写着：“小乐，希望你快点好起来，我们一起玩游戏！”接着，他把卡片送到小乐家，还带了一些小饼干，想让小乐开心一点。小乐接过卡片和饼干，感动地说：“谢谢你，明明，你真是我的好朋友！”\n\n" +
        "明明不但关心家人，乐于助人，还关心朋友。他用自己的行动，让身边的人感受到爱。",
      questions: [
        { id: "p3_zh_rev2_sn25_023", type: "MCQ", q: "明明是怎样关心妈妈的？",
          options: ["明明跟妈妈一起玩游戏。", "明明给妈妈画了生日卡。", "明明给妈妈倒了一杯水。", "明明给妈妈带了小饼干。"],
          answer: 2,
          pinyin: "Míngming shì zěnyàng guānxīn māma de?",
          meaning: "How did Mingming show care for his mum?",
          solution: { method: "Read paragraph 1.", steps: ["接过皮包，倒了一杯水给她 → 给妈妈倒了一杯水."], tip: "The card and biscuits were for the sick classmate, not mum." } },
        { id: "p3_zh_rev2_sn25_024", type: "MCQ", q: "从哪里可以知道小乐收到明明的卡片后很感动？",
          options: ["小乐说明明真是他的好朋友。", "小乐立刻收下明明的小饼干。", "小乐马上跟明明一起玩游戏。", "小乐把一张卡片送到明明家。"],
          answer: 0,
          pinyin: "Cóng nǎlǐ kěyǐ zhīdào Xiǎo Lè shōudào kǎpiàn hòu hěn gǎndòng?",
          meaning: "How do we know Xiao Le was moved after receiving the card?",
          solution: { method: "Read Xiao Le's words.", steps: ["小乐感动地说‘你真是我的好朋友’ → 说明明真是他的好朋友."], tip: "His grateful words show he was moved." } },
        { id: "p3_zh_rev2_sn25_025", type: "MCQ", q: "文中的明明是个怎样的孩子？",
          options: ["明明是个很聪明的孩子。", "明明是个很懂事的孩子。", "明明是个爱做事的孩子。", "明明是个爱表现的孩子。"],
          answer: 1,
          pinyin: "Wén zhōng de Míngming shì ge zěnyàng de háizi?",
          meaning: "What kind of child is Mingming in the passage?",
          solution: { method: "Use the overall description.", steps: ["关心家人、乐于助人、被夸懂事 → 很懂事的孩子."], tip: "The passage and mum both call him 懂事 (sensible)." } },
      ],
    },

    // (六) 数笔画，填拼音 (3题6分) — PinYin (write pinyin + count strokes)
    {
      id: "p3_zh_rev2_sn25_026", topic: "PinYin", difficulty: "stretch",
      instruction: "数笔画，填拼音（写出汉字的拼音和总笔画数）。例：五（wǔ）4画。",
      q: "“近” 的拼音和笔画数是？", answer: "jìn（7画）",
      pinyin: "jìn", meaning: "near / close (近, 7 strokes)",
      solution: { method: "Read the character and count its strokes.", steps: ["近 = jìn.", "斤(4画) + 辶(3画) = 7画."], tip: "近 = jìn, 7 strokes." },
    },
    {
      id: "p3_zh_rev2_sn25_027", topic: "PinYin", difficulty: "stretch",
      instruction: "数笔画，填拼音（写出汉字的拼音和总笔画数）。",
      q: "“病” 的拼音和笔画数是？", answer: "bìng（10画）",
      pinyin: "bìng", meaning: "illness (病, 10 strokes)",
      solution: { method: "Read the character and count its strokes.", steps: ["病 = bìng.", "疒(5画) + 丙(5画) = 10画."], tip: "病 = bìng, 10 strokes." },
    },
    {
      id: "p3_zh_rev2_sn25_028", topic: "PinYin", difficulty: "stretch",
      instruction: "数笔画，填拼音（写出汉字的拼音和总笔画数）。",
      q: "“或” 的拼音和笔画数是？", answer: "huò（8画）",
      pinyin: "huò", meaning: "or (或, 8 strokes)",
      solution: { method: "Read the character and count its strokes.", steps: ["或 = huò.", "Count the strokes of 或 = 8画."], tip: "或 = huò, 8 strokes." },
    },
  ],
};

export default rev2StNicholas2025Hcl;
