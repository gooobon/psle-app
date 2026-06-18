// =============================================================================
// P3 Chinese — Red Swastika School (卍慈学校) Higher Chinese
// 2024 复习（二）/ Revision 2 (第四课至第六课)  ·  40 marks
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY. <<
// NOTE: "卍慈" is the Buddhist swastika emblem of the Red Swastika Society school
//       in Singapore — unrelated to any other use of the symbol.
// Kept with `rev2_` filename + `p3_zh_rev2_rs_*` ids.
// -----------------------------------------------------------------------------
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配: sub-question MCQ whose `options` = the shared wordBank.
//   - 组句成段 (ordering): each sub-question `answer` = its position number in the
//     paragraph (sentence 1 is fixed/given), as a number.
//   - 看图选词: each question has its own 4 options + `imageHint` (attach asset).
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

export const rev2RedSwastikaHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_rev2_red_swastika_hcl",
    school: "Red Swastika School",
    schoolZh: "卍慈学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2024 Revision 2 (复习二 / 第四课至第六课)",
    source: "sgexam.com — Red Swastika 2024 Revision 2 (answers verified by official key)",
    totalMarks: 40,
  },
  items: [
    // (一) 辨字测验 — BianZi (Q1–Q5)
    {
      id: "p3_zh_rev2_rs_001", topic: "BianZi", difficulty: "core",
      instruction: "从所提供的选择中选出正确的字。",
      q: "几个月后，小树的（　）越来越粗。", options: ["很", "跟", "根", "腿"], answer: 2,
      pinyin: "Jǐ ge yuè hòu, xiǎo shù de gēn yuèláiyuè cū.",
      meaning: "After a few months, the little tree's roots grew thicker and thicker.",
      solution: { method: "Which part of a tree gets thick?", steps: ["树的（　）→ 树根 (root) → 根."], tip: "根 = root; 跟(heel)/很(very)/腿(leg) don't fit a tree." },
    },
    {
      id: "p3_zh_rev2_rs_002", topic: "BianZi", difficulty: "core",
      instruction: "从所提供的选择中选出正确的字。",
      q: "今天妈妈带我去美食展，我（　）了很多食物。", options: ["长", "场", "尝", "常"], answer: 2,
      pinyin: "Jīntiān māma dài wǒ qù měishí zhǎn, wǒ cháng le hěnduō shíwù.",
      meaning: "Today mum took me to a food fair, and I tasted a lot of food.",
      solution: { method: "What do you do with food at a fair?", steps: ["（　）了很多食物 → 尝 (taste) → 尝."], tip: "尝 = taste (口 radical)." },
    },
    {
      id: "p3_zh_rev2_rs_003", topic: "BianZi", difficulty: "core",
      instruction: "从所提供的选择中选出正确的字。",
      q: "小文上前把小立（　）了起来。", options: ["按", "撞", "推", "扶"], answer: 3,
      pinyin: "Xiǎo Wén shàngqián bǎ Xiǎo Lì fú le qǐlái.",
      meaning: "Xiao Wen went forward and helped Xiao Li up.",
      solution: { method: "How do you help someone get up?", steps: ["把小立（　）起来 → 扶 (help up) → 扶."], tip: "扶 = support/help up by hand." },
    },
    {
      id: "p3_zh_rev2_rs_004", topic: "BianZi", difficulty: "core",
      instruction: "从所提供的选择中选出正确的字。",
      q: "小丽的头发长长的，眼（　）又大又圆，很可爱。", options: ["睛", "晴", "清", "请"], answer: 0,
      pinyin: "Xiǎo Lì de tóufa chángcháng de, yǎnjīng yòu dà yòu yuán, hěn kě'ài.",
      meaning: "Xiao Li has long hair and big, round eyes; she is very cute.",
      solution: { method: "Form the word 眼睛.", steps: ["眼（　）→ 眼睛 (eyes) → 睛."], tip: "睛 has the 目 (eye) radical; 晴(sunny) has the 日 (sun) radical." },
    },
    {
      id: "p3_zh_rev2_rs_005", topic: "BianZi", difficulty: "core",
      instruction: "从所提供的选择中选出正确的字。",
      q: "我家附（　）有一间图书馆，我常常到那里借书。", options: ["连", "近", "退", "进"], answer: 1,
      pinyin: "Wǒ jiā fùjìn yǒu yì jiān túshūguǎn, wǒ chángcháng dào nàlǐ jièshū.",
      meaning: "There is a library near my home, and I often go there to borrow books.",
      solution: { method: "Form the word 附近.", steps: ["附（　）→ 附近 (nearby) → 近."], tip: "附近 = nearby/vicinity." },
    },

    // (二) 词语选择 — CiYu (Q6–Q8)
    {
      id: "p3_zh_rev2_rs_006", topic: "CiYu", difficulty: "core",
      instruction: "从所提供的选择中选出正确的词语。",
      q: "经过多年的努力，他的愿望快要（　）了！", options: ["现在", "出现", "发现", "实现"], answer: 3,
      pinyin: "Jīngguò duōnián de nǔlì, tā de yuànwàng kuàiyào shíxiàn le!",
      meaning: "After years of effort, his wish is about to come true!",
      solution: { method: "What happens to a 愿望 (wish) after hard work?", steps: ["愿望快要（　）→ 实现 (come true) → 实现."], tip: "实现愿望 = make a wish come true." },
    },
    {
      id: "p3_zh_rev2_rs_007", topic: "CiYu", difficulty: "core",
      instruction: "从所提供的选择中选出正确的词语。",
      q: "一阵风吹过，树上的叶子不停地（　）。", options: ["按住", "披上", "摆动", "折好"], answer: 2,
      pinyin: "Yí zhèn fēng chuī guò, shù shàng de yèzi bùtíng de yáodòng.",
      meaning: "A gust of wind blew, and the leaves on the tree kept swaying.",
      solution: { method: "What do leaves do in the wind?", steps: ["叶子不停地（　）→ 摆动 (sway) → 摆动."], tip: "摆动 = sway/swing back and forth." },
    },
    {
      id: "p3_zh_rev2_rs_008", topic: "CiYu", difficulty: "core",
      instruction: "从所提供的选择中选出正确的词语。",
      q: "只要做好（　），就不用太担心考试。", options: ["习惯", "学习", "事情", "准备"], answer: 3,
      pinyin: "Zhǐyào zuò hǎo zhǔnbèi, jiù búyòng tài dānxīn kǎoshì.",
      meaning: "As long as you prepare well, you won't need to worry too much about the exam.",
      solution: { method: "What do you 做好 before an exam?", steps: ["做好（　）→ 做好准备 (be prepared) → 准备."], tip: "做好准备 = get ready / be well-prepared." },
    },

    // (三) 看图选词 — KanTu (Q9–Q11, each with its own options + imageHint)
    {
      id: "p3_zh_rev2_rs_009", topic: "KanTu", difficulty: "foundation",
      instruction: "根据图意选出正确的词语。",
      q: "看图选词（Q9）", options: ["吸管", "按钮", "手表", "闹钟"], answer: 3,
      imageHint: "A ringing alarm clock with two bells on top.",
      pinyin: "nàozhōng", meaning: "alarm clock",
      solution: { method: "Name the pictured object.", steps: ["A clock with bells that rings → 闹钟."], tip: "闹钟 = alarm clock; 手表 = wristwatch." },
    },
    {
      id: "p3_zh_rev2_rs_010", topic: "KanTu", difficulty: "core",
      instruction: "根据图意选出正确的词语。",
      q: "看图选词（Q10）", options: ["青蛙", "绿豆", "乌龟", "尾巴"], answer: 2,
      imageHint: "A small cartoon tortoise/turtle (rounded body, head, four short legs, small tail).",
      pinyin: "wūguī", meaning: "tortoise / turtle",
      solution: { method: "Name the small animal in the picture.", steps: ["Rounded animal with a shell-like body and short legs → 乌龟 (tortoise)."], tip: "乌龟 = tortoise/turtle." },
    },
    {
      id: "p3_zh_rev2_rs_011", topic: "KanTu", difficulty: "foundation",
      instruction: "根据图意选出正确的词语。",
      q: "看图选词（Q11）", options: ["电影", "电脑", "电话", "电灯"], answer: 1,
      imageHint: "A laptop computer (open screen and keyboard).",
      pinyin: "diànnǎo", meaning: "computer",
      solution: { method: "Name the electronic device.", steps: ["A device with a screen and keyboard → 电脑 (computer)."], tip: "电脑 = computer; all options start with 电 (electric)." },
    },

    // (四) 词语搭配 — PeiDui (Q12–Q15)
    {
      id: "p3_zh_rev2_rs_set1", topic: "PeiDui", difficulty: "core",
      setLabel: "卍慈学校 P3 HCL 复习二 — 词语搭配",
      instruction: "从所提供的词语中，选出可以和各题搭配成合理词组的词语（每个词语只能用一次）。",
      wordBank: ["贴在", "回答", "美食", "长出", "弄破", "跌倒", "练习", "画展"],
      questions: [
        { id: "p3_zh_rev2_rs_012", type: "MCQ", q: "（　）玩具", options: ["贴在","回答","美食","长出","弄破","跌倒","练习","画展"], answer: 4,
          pinyin: "nòngpò wánjù", meaning: "to break a toy",
          solution: { method: "What can happen to a toy?", steps: ["弄破玩具 = break a toy → 弄破."], tip: "弄破 = break/damage (something)." } },
        { id: "p3_zh_rev2_rs_013", type: "MCQ", q: "（　）受伤", options: ["贴在","回答","美食","长出","弄破","跌倒","练习","画展"], answer: 5,
          pinyin: "diēdǎo shòushāng", meaning: "to fall and get injured",
          solution: { method: "What leads to 受伤 (injury)?", steps: ["跌倒受伤 = fall and get hurt → 跌倒."], tip: "跌倒 = fall down." } },
        { id: "p3_zh_rev2_rs_014", type: "MCQ", q: "（　）纸上", options: ["贴在","回答","美食","长出","弄破","跌倒","练习","画展"], answer: 0,
          pinyin: "tiē zài zhǐ shàng", meaning: "to stick on the paper",
          solution: { method: "How does something get onto paper?", steps: ["贴在纸上 = stick on paper → 贴在."], tip: "贴在…上 = stick onto…" } },
        { id: "p3_zh_rev2_rs_015", type: "MCQ", q: "参观（　）", options: ["贴在","回答","美食","长出","弄破","跌倒","练习","画展"], answer: 7,
          pinyin: "cānguān huàzhǎn", meaning: "to visit an art exhibition",
          solution: { method: "What can you 参观 (visit)?", steps: ["参观画展 = visit an art exhibition → 画展."], tip: "参观 + 画展/工厂/博物馆." } },
      ],
    },

    // (五) 仿写句子(ZuJu) Q16–Q17 + 扩写句子(JuZi) Q18–Q19
    {
      id: "p3_zh_rev2_rs_016", topic: "ZuJu", difficulty: "core",
      instruction: "根据所提供的帮助词语，仿写（合并）句子。",
      q: "我们可以跑步。我们可以游泳。（“……或者……”）",
      answer: "我们可以跑步或者游泳。",
      pinyin: "Wǒmen kěyǐ pǎobù huòzhě yóuyǒng.",
      meaning: "We can run or swim.",
      solution: { method: "Join two options with 或者.", steps: ["Shared part 我们可以 stays once; link 跑步 或者 游泳."], tip: "或者 = or (in statements)." },
    },
    {
      id: "p3_zh_rev2_rs_017", topic: "ZuJu", difficulty: "stretch",
      instruction: "根据所提供的帮助词语，仿写（合并）句子。",
      q: "小美走进课室。林老师叫她拿出功课。（“……一……就……”）",
      answer: "小美一走进课室，林老师就叫她拿出功课。",
      pinyin: "Xiǎo Měi yì zǒu jìn kèshì, Lín lǎoshī jiù jiào tā ná chū gōngkè.",
      meaning: "As soon as Xiao Mei walked into the classroom, Teacher Lin told her to take out her homework.",
      solution: { method: "Use the pattern 一…就… for 'as soon as…'.", steps: ["一 + 第一个动作 (走进课室)，就 + 第二个动作 (叫她拿出功课)."], tip: "一…就… links two actions happening one right after the other." },
    },
    {
      id: "p3_zh_rev2_rs_018", topic: "JuZi", difficulty: "core",
      instruction: "利用括号里的词语扩写句子。",
      q: "小乐把画里的花儿涂上颜色。（一朵一朵地）",
      answer: "小乐把画里的花儿一朵一朵地涂上颜色。",
      pinyin: "Xiǎo Lè bǎ huà lǐ de huār yì duǒ yì duǒ de tú shàng yánsè.",
      meaning: "Xiao Le coloured the flowers in the picture one by one.",
      solution: { method: "Place the manner phrase before the verb 涂.", steps: ["一朵一朵地 describes how she coloured → before 涂上颜色."], tip: "Put the …地 phrase right before the verb." },
    },
    {
      id: "p3_zh_rev2_rs_019", topic: "JuZi", difficulty: "core",
      instruction: "利用括号里的词语扩写句子。",
      q: "小安不小心撞到小明，他说对不起。（连忙）",
      answer: "小安不小心撞到小明，他连忙说对不起。",
      pinyin: "Xiǎo Ān bù xiǎoxīn zhuàng dào Xiǎo Míng, tā liánmáng shuō duìbuqǐ.",
      meaning: "Xiao An accidentally bumped into Xiao Ming and quickly said sorry.",
      solution: { method: "Place 连忙 before the verb 说.", steps: ["连忙 describes how quickly he apologised → before 说对不起."], tip: "连忙 = hurriedly; goes before the verb." },
    },

    // (六) 组句成段 — ZuJu sentence ordering (Q20–Q24); sentence (1) is fixed
    {
      id: "p3_zh_rev2_rs_set2", topic: "ZuJu", difficulty: "stretch",
      setLabel: "卍慈学校 P3 HCL 复习二 — 组句成段（狗与山羊）",
      instruction:
        "请按先后顺序把句子排一排。第（1）句已给定：“一只狗不小心掉进了井里，它怎么跳也跳不出去。” 在每句的括号里填上它的顺序号（2–6）。",
      passage:
        "（1）一只狗不小心掉进了井里，它怎么跳也跳不出去。\n（正确顺序：1 → 23题 → 22题 → 20题 → 21题 → 24题）",
      questions: [
        { id: "p3_zh_rev2_rs_020", type: "OpenEnded", q: "山羊也想喝水，狗就叫它跳下来一起喝。", answer: 4,
          pinyin: "Shānyáng yě xiǎng hē shuǐ, gǒu jiù jiào tā tiào xiàlái yìqǐ hē.",
          meaning: "The goat also wanted to drink, so the dog told it to jump down and drink together.",
          solution: { method: "Place after the dog's lie.", steps: ["After the dog says it's drinking water (no.3), the goat wants to drink too → no.4."], tip: "This is the dog's trick to lure the goat in." } },
        { id: "p3_zh_rev2_rs_021", type: "OpenEnded", q: "山羊想也没想就马上跳了下去。", answer: 5,
          pinyin: "Shānyáng xiǎng yě méi xiǎng jiù mǎshàng tiào le xiàqù.",
          meaning: "Without thinking, the goat jumped straight down.",
          solution: { method: "Place after the dog invites it down.", steps: ["After being invited (no.4), the goat jumps in → no.5."], tip: "The goat acts before thinking." } },
        { id: "p3_zh_rev2_rs_022", type: "OpenEnded", q: "狗说外头太热了，它正在井里喝水。", answer: 3,
          pinyin: "Gǒu shuō wàitou tài rè le, tā zhèngzài jǐng lǐ hē shuǐ.",
          meaning: "The dog said it was too hot outside and that it was drinking water in the well.",
          solution: { method: "Place after the goat asks.", steps: ["After the goat asks what it's doing (no.2), the dog lies → no.3."], tip: "The dog's excuse comes right after the question." } },
        { id: "p3_zh_rev2_rs_023", type: "OpenEnded", q: "一头山羊经过看到了，问它在做什么。", answer: 2,
          pinyin: "Yì tóu shānyáng jīngguò kàndào le, wèn tā zài zuò shénme.",
          meaning: "A goat passing by saw it and asked what it was doing.",
          solution: { method: "Place right after the dog falls in.", steps: ["After the dog is stuck (no.1), a goat passes and asks → no.2."], tip: "The newcomer's question opens the conversation." } },
        { id: "p3_zh_rev2_rs_024", type: "OpenEnded", q: "狗飞快地跳在山羊的背上，又从山羊的背上跳了出去。", answer: 6,
          pinyin: "Gǒu fēikuài de tiào zài shānyáng de bèi shàng, yòu cóng shānyáng de bèi shàng tiào le chūqù.",
          meaning: "The dog quickly leapt onto the goat's back and then jumped out of the well.",
          solution: { method: "Place last — the dog escapes.", steps: ["After the goat jumps in (no.5), the dog uses its back to escape → no.6 (last)."], tip: "This is the ending: the dog tricks the goat to get out." } },
      ],
    },

    // (七) 阅读理解一 — YueReadMCQ set (Q25–Q27)
    {
      id: "p3_zh_rev2_rs_set3", topic: "YueReadMCQ", difficulty: "core",
      setLabel: "卍慈学校 P3 HCL 复习二 — 阅读理解一（小聪卖西瓜）",
      instruction: "根据短文的内容，选出最适当的答案。",
      passage:
        "一天，小聪在自己的西瓜田里卖西瓜。这时，路边来了一个老爷爷和一个小男孩，他们身上的衣服又旧又破。小男孩见了西瓜就哭闹着要吃西瓜。老爷爷对小男孩说：“别闹了，爷爷没有钱买西瓜。”\n\n" +
        "小聪摘了一个大西瓜，送到老爷爷的手里。小男孩便不哭了。老爷爷对小聪说：“谢谢！谢谢！”这时，小聪看见父亲向西瓜田走来，他马上让老爷爷和小男孩离开。\n\n" +
        "父亲指着慢慢走远的老爷爷和小男孩，问小聪：“你在做什么？”小聪红着脸说：“我……我卖……卖了一个西瓜。”说完，他从身上拿出了五元，交给了父亲。\n\n" +
        "父亲笑了，说：“这不是我昨天给你的钱吗？”小聪的脸更红了。\n\n" +
        "父亲摸了摸小聪的头，说：“孩子，你没做错，你做了一件好事啊！”听了父亲的话，小聪开心地笑了。",
      questions: [
        { id: "p3_zh_rev2_rs_025", type: "MCQ", q: "小男孩为什么一直哭闹？",
          options: ["因为他非常想吃西瓜。", "因为老爷爷的身上没有钱。", "因为他穿的衣服又旧又破。", "因为小聪不要把西瓜卖给他。"],
          answer: 0,
          pinyin: "Xiǎo nánhái wèishéme yìzhí kūnào?",
          meaning: "Why did the little boy keep crying and fussing?",
          solution: { method: "Find what the boy wanted.", steps: ["小男孩见了西瓜就哭闹着要吃西瓜 → 想吃西瓜."], tip: "He cried because he wanted to eat the watermelon." } },
        { id: "p3_zh_rev2_rs_026", type: "MCQ", q: "看见父亲从远处走来，小聪怎么做？",
          options: ["他把卖西瓜的钱给父亲。", "他告诉父亲有人想买西瓜。", "他让老爷爷和小男孩离开。", "他摘了一个大西瓜送给老爷爷。"],
          answer: 2,
          pinyin: "Kànjiàn fùqīn cóng yuǎnchù zǒu lái, Xiǎo Cōng zěnme zuò?",
          meaning: "When he saw his father approaching, what did Xiao Cong do?",
          solution: { method: "Read what he did on seeing his father.", steps: ["小聪看见父亲走来，他马上让老爷爷和小男孩离开."], tip: "He didn't want his father to see he'd given the watermelon away." } },
        { id: "p3_zh_rev2_rs_027", type: "MCQ", q: "父亲对小聪的行为有什么想法？",
          options: ["父亲认为小聪的行为是不对的。", "父亲认为小聪应该收老爷爷的钱。", "父亲认为小聪不应该把西瓜送给别人。", "父亲认为小聪把西瓜送给老爷爷是对的。"],
          answer: 3,
          pinyin: "Fùqīn duì Xiǎo Cōng de xíngwéi yǒu shénme xiǎngfǎ?",
          meaning: "What did the father think of Xiao Cong's behaviour?",
          solution: { method: "Read the father's words at the end.", steps: ["父亲说：孩子，你没做错，你做了一件好事啊！ → 认为是对的."], tip: "The father praised it as a good deed." } },
      ],
    },

    // (八) 阅读理解二 — YueReadOpen set (Q28–Q30)
    {
      id: "p3_zh_rev2_rs_set4", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "卍慈学校 P3 HCL 复习二 — 阅读理解二（河马与小鸟）",
      instruction: "先读下面的短文，然后回答问题。",
      passage:
        "树林里有一条小河，动物们常常到这里来喝水。有一天，一只河马来到了河边，想在那里住下来。它因为自己长得很强壮，就把动物们都赶走了，不让它们喝水。\n\n" +
        "动物们都很生气，一只小鸟对河马说：“这条河不是你的，你不能赶我们走！”河马头也不抬地说：“你只不过是一只小鸟，我才不理你呢！”大家都没办法，只好到别的地方去找水喝。\n\n" +
        "过了几天，当小鸟飞过小河时，它发现河马躺在河边，好像生病了。小鸟急忙飞到河马身边，关心地问：“河马大哥，你怎么了？”\n\n" +
        "“我的身上有很多虫子，它们把我咬得好痛呀！”河马回答。\n\n" +
        "小鸟飞到河马背后一看，啊，那里长满了小虫子。小鸟马上帮河马把虫子都吃掉。不久，河马的身子就慢慢好起来了。它知道错了，赶快向动物们说对不起，还请它们都回到河边喝水。后来，小河又跟以前一样热闹了。",
      questions: [
        { id: "p3_zh_rev2_rs_028", type: "OpenEnded", q: "河马来到河边后，做了什么事？（2分）",
          answer: "河马来到河边后，想住下来，就把动物们都赶走了，不让它们喝水。",
          pinyin: "Hémǎ lái dào hébiān hòu, zuò le shénme shì?",
          meaning: "What did the hippo do after it came to the riverside?",
          solution: { method: "Read paragraph 1.", steps: ["想住下来 → 把动物们都赶走，不让它们喝水."], tip: "State both: it wanted to stay, and it chased the animals away." } },
        { id: "p3_zh_rev2_rs_029", type: "OpenEnded", q: "看到河马好像生病了，小鸟怎样做？（2分）",
          answer: "小鸟急忙飞到河马身边，关心地问它怎么了。",
          pinyin: "Kàndào hémǎ hǎoxiàng shēngbìng le, xiǎo niǎo zěnyàng zuò?",
          meaning: "Seeing that the hippo seemed sick, what did the little bird do?",
          solution: { method: "Read paragraph 3.", steps: ["小鸟急忙飞到河马身边，关心地问它怎么了."], tip: "Describe the bird's caring action." } },
        { id: "p3_zh_rev2_rs_030", type: "OpenEnded", q: "为什么小鸟要吃掉河马身上的虫子？（2分）",
          answer: "因为虫子把河马咬得很痛，小鸟想要帮它（让它的身体好起来）。",
          pinyin: "Wèishéme xiǎo niǎo yào chī diào hémǎ shēn shàng de chóngzi?",
          meaning: "Why did the little bird eat up the bugs on the hippo's body?",
          solution: { method: "Find the bird's reason.", steps: ["虫子把河马咬得很痛 → 小鸟想帮它，让它好起来."], tip: "Begin with 因为 and give the helping reason." } },
      ],
    },
  ],
};

export default rev2RedSwastikaHcl;
