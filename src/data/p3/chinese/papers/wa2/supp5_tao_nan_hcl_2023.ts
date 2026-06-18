// =============================================================================
// P3 Chinese — Tao Nan School (道南学校) Higher Chinese
// 2023 三年级高级华文补充作业（五）(第九课至第十课)  ·  Supplementary Worksheet 5
// Source: sgexam.com  |  Total: 45 marks, 33 questions
// NOTE: This is a 2023 supplementary worksheet (补充作业), not a WA2 paper. Kept
//       with `supp5_` filename + `p3_zh_supp5_*` ids so it stays separate from WA2.
//       No answer-key grid was printed in the PDF (only an answering-tips page);
//       MCQ answers below are derived from the questions/passages.
// -----------------------------------------------------------------------------
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配 / 短文填空: each sub-question is MCQ whose `options` = the shared
//     wordBank, so `answer` is the 0-based index of the correct word in wordBank.
//   - Open-ended / rewrite items: `answer` is model-answer text.
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

export const supp5TaoNanHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_supp5_tao_nan_hcl",
    school: "Tao Nan School",
    schoolZh: "道南学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2023 Supplementary Worksheet 5 (补充作业五 / 第九课至第十课)",
    source: "sgexam.com — Tao Nan 2023 补充作业（五）",
    totalMarks: 45,
  },
  items: [
    // ---------------------------------------------------------------------
    // 一、辨字测验 — BianZi (Q1–Q5)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "弟弟把一片叶子当作小船放进（　）里。",
      options: ["可", "何", "河", "阿"],
      answer: 2,
      pinyin: "Dìdi bǎ yí piàn yèzi dàngzuò xiǎo chuán fàng jìn hé lǐ.",
      meaning: "Little brother put a leaf into the river, pretending it was a small boat.",
      solution: {
        method: "Pick the character that means the right thing.",
        steps: ["A boat goes into water → 河 (river).", "可/何/阿 share the sound but don't mean water."],
        tip: "河 has the 氵(water) radical — a clue it relates to water.",
      },
    },
    {
      id: "p3_zh_supp5_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "我们应该爱护（　）境清洁，不乱丢垃圾。",
      options: ["杯", "环", "怀", "坏"],
      answer: 1,
      pinyin: "Wǒmen yīnggāi àihù huánjìng qīngjié, bù luàn diū lājī.",
      meaning: "We should protect the cleanliness of the environment and not litter.",
      solution: {
        method: "Find the character that forms 环境.",
        steps: ["（　）境 → 环境 (environment) → 环.", "杯/怀/坏 don't make a word with 境."],
        tip: "环 (huán) vs 坏 (huài) look alike — check the right component.",
      },
    },
    {
      id: "p3_zh_supp5_003",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "每天早上，太阳都会从东边（　）上来。",
      options: ["举", "走", "升", "飞"],
      answer: 2,
      pinyin: "Měitiān zǎoshang, tàiyáng dōu huì cóng dōngbiān shēng shànglái.",
      meaning: "Every morning, the sun rises from the east.",
      solution: {
        method: "Match the verb to the sun.",
        steps: ["The sun 升 (rises) → 升上来.", "举/走/飞 don't describe the sun rising."],
        tip: "太阳升起 = the sun rises; a fixed pairing to remember.",
      },
    },
    {
      id: "p3_zh_supp5_004",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "爸爸先把车子（　）好，才来餐厅找我们。",
      options: ["位", "休", "付", "停"],
      answer: 3,
      pinyin: "Bàba xiān bǎ chēzi tíng hǎo, cái lái cāntīng zhǎo wǒmen.",
      meaning: "Dad parked the car first, then came to the restaurant to find us.",
      solution: {
        method: "Choose the verb for a car.",
        steps: ["把车子（　）好 → 停好 (park) → 停.", "位/休/付 don't go with 车子…好."],
        tip: "停车 = park a car; 停 has the 亻 + 亭 form.",
      },
    },
    {
      id: "p3_zh_supp5_005",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "哥哥的水壶坏了，他把水壶（　）掉。",
      options: ["披", "打", "扔", "拍"],
      answer: 2,
      pinyin: "Gēge de shuǐhú huài le, tā bǎ shuǐhú rēng diào.",
      meaning: "Brother's water bottle was broken, so he threw it away.",
      solution: {
        method: "Pick the verb that goes with 掉 (away).",
        steps: ["A broken bottle is 扔掉 (thrown away) → 扔.", "披/打/拍 don't mean discarding."],
        tip: "扔掉 = throw away; 扔 has the 扌(hand) radical.",
      },
    },

    // ---------------------------------------------------------------------
    // 二、汉语拼音 — PinYin (Q6–Q7)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_006",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节。",
      q: "哥哥想到了一个方法来称这块石头的<u>重量</u>。",
      options: ["zhòng liàng", "zhòng liáng", "chóng liáng", "chóng liàng"],
      answer: 0,
      pinyin: "zhòngliàng",
      meaning: "weight (of the underlined word 重量)",
      solution: {
        method: "Read the multi-pronunciation character 重 correctly.",
        steps: ["重量 (weight) is read zhòng-liàng, not chóng.", "量 here is liàng (4th tone)."],
        tip: "重 = zhòng (heavy/weight); 重 = chóng only means 'again/repeat' (重复).",
      },
    },
    {
      id: "p3_zh_supp5_007",
      topic: "PinYin",
      difficulty: "core",
      instruction: "根据句子中划线的词语，选出正确的音节。",
      q: "妈妈习惯用<u>竹竿</u>来晾衣服。",
      options: ["zú gān", "zú gāng", "zhú gān", "zhú gāng"],
      answer: 2,
      pinyin: "zhúgān",
      meaning: "bamboo pole (of the underlined word 竹竿)",
      solution: {
        method: "Check the initials and finals carefully.",
        steps: ["竹 = zhú (zh-, not z-).", "竿 = gān (no -ng). So 竹竿 = zhú gān."],
        tip: "Watch zh vs z and -an vs -ang; both must be right.",
      },
    },

    // ---------------------------------------------------------------------
    // 三、词语选择 — CiYu (Q8–Q11)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_008",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "只要（　）书上的方法去做，就能做出好吃的蛋糕。",
      options: ["听从", "按照", "答应", "想象"],
      answer: 1,
      pinyin: "Zhǐyào ànzhào shū shàng de fāngfǎ qù zuò, jiù néng zuò chū hǎochī de dàngāo.",
      meaning: "As long as you follow the method in the book, you can make a tasty cake.",
      solution: {
        method: "Pick the word that goes with 方法.",
        steps: ["按照…方法去做 = do it according to the method → 按照."],
        tip: "按照 = according to; pairs with 方法/规定/计划.",
      },
    },
    {
      id: "p3_zh_supp5_009",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "刮大风的时候，院子里的小树会不停地（　）。",
      options: ["变化", "下沉", "摇摆", "活动"],
      answer: 2,
      pinyin: "Guā dà fēng de shíhou, yuànzi lǐ de xiǎo shù huì bùtíng de yáobǎi.",
      meaning: "When the strong wind blows, the small tree in the yard keeps swaying.",
      solution: {
        method: "What does a tree do in the wind?",
        steps: ["A tree in strong wind 摇摆 (sways) → 摇摆."],
        tip: "摇摆 = sway side to side; fits trees, boats, etc.",
      },
    },
    {
      id: "p3_zh_supp5_010",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "小丽想到一个好（　），把掉进坑里的小狗救了上来。",
      options: ["说法", "看法", "办法", "做法"],
      answer: 2,
      pinyin: "Xiǎo Lì xiǎngdào yí ge hǎo bànfǎ, bǎ diào jìn kēng lǐ de xiǎo gǒu jiù le shànglái.",
      meaning: "Xiao Li thought of a good way to rescue the puppy that had fallen into the pit.",
      solution: {
        method: "Which word means a way to solve a problem?",
        steps: ["想到一个好办法 = thought of a good method → 办法.", "说法/看法/做法 don't mean a solution."],
        tip: "办法 = a way/method to solve something; 看法 = opinion.",
      },
    },
    {
      id: "p3_zh_supp5_011",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个选项中，选出适当的一个。",
      q: "姐姐想了一个晚上，终于（　）出国读书。",
      options: ["想象", "建议", "觉得", "决定"],
      answer: 3,
      pinyin: "Jiějie xiǎng le yí ge wǎnshang, zhōngyú juédìng chū guó dúshū.",
      meaning: "Sister thought for a whole night and finally decided to study abroad.",
      solution: {
        method: "Use the clue word 终于 (finally).",
        steps: ["终于…出国读书 → a final choice → 决定 (decide)."],
        tip: "终于 often pairs with 决定 — a decision after long thinking.",
      },
    },

    // ---------------------------------------------------------------------
    // 四、词语搭配 — PeiDui (Q12–Q16)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_set1",
      topic: "PeiDui",
      difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业五 — 词语搭配",
      instruction:
        "从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。",
      wordBank: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
      questions: [
        {
          id: "p3_zh_supp5_012",
          type: "MCQ",
          q: "保持（　）",
          options: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
          answer: 0,
          pinyin: "bǎochí jiànkāng",
          meaning: "to stay / keep healthy",
          solution: { method: "Match the verb 保持.", steps: ["保持健康 = keep healthy → 健康."], tip: "保持 + state (健康/安静/干净)." },
        },
        {
          id: "p3_zh_supp5_013",
          type: "MCQ",
          q: "（　）客人",
          options: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
          answer: 2,
          pinyin: "zhāohu kèrén",
          meaning: "to greet / receive guests",
          solution: { method: "What do you do with guests?", steps: ["招呼客人 = greet guests → 招呼."], tip: "招呼 = greet/attend to (people)." },
        },
        {
          id: "p3_zh_supp5_014",
          type: "MCQ",
          q: "转身（　）",
          options: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
          answer: 4,
          pinyin: "zhuǎnshēn líkāi",
          meaning: "to turn around and leave",
          solution: { method: "What follows 转身?", steps: ["转身离开 = turn and leave → 离开."], tip: "转身 + 离开/走 describes a movement away." },
        },
        {
          id: "p3_zh_supp5_015",
          type: "MCQ",
          q: "（　）干净",
          options: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
          answer: 1,
          pinyin: "qīngxǐ gānjìng",
          meaning: "to wash (something) clean",
          solution: { method: "Which verb results in 干净?", steps: ["清洗干净 = wash clean → 清洗."], tip: "清洗…干净 = wash until clean." },
        },
        {
          id: "p3_zh_supp5_016",
          type: "MCQ",
          q: "想出（　）",
          options: ["健康", "清洗", "招呼", "冲凉", "离开", "办法"],
          answer: 5,
          pinyin: "xiǎng chū bànfǎ",
          meaning: "to come up with a method / solution",
          solution: { method: "What can you 想出 (think up)?", steps: ["想出办法 = come up with a method → 办法."], tip: "想出 + 办法/主意 = think of a solution/idea." },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // 五、改写句子 — A组 ZuJu (combine with 因为) Q17–Q18; B组 JuZi (rewrite) Q19–Q20
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_017",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。",
      q: "今天我们不能去外婆的家。今天下雨了。（因为）",
      answer: "因为今天下雨了，所以今天我们不能去外婆的家。",
      pinyin: "Yīnwèi jīntiān xià yǔ le, suǒyǐ jīntiān wǒmen bùnéng qù wàipó de jiā.",
      meaning: "Because it rained today, we can't go to grandmother's house today.",
      solution: {
        method: "Join cause and result with 因为…所以….",
        steps: ["The rain is the cause; not going is the result.", "因为 + 下雨了，所以 + 不能去外婆的家."],
        tip: "因为 marks the reason; 所以 marks the result.",
      },
    },
    {
      id: "p3_zh_supp5_018",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "A组：请用括号里的词语，把两个句子改写成一个句子。",
      q: "在图书馆里大声说话是不对的。在图书馆里大声说话会吵到别人。（因为）",
      answer: "在图书馆里大声说话是不对的，因为这样会吵到别人。",
      pinyin: "Zài túshūguǎn lǐ dàshēng shuōhuà shì bú duì de, yīnwèi zhèyàng huì chǎo dào biérén.",
      meaning: "Speaking loudly in the library is wrong, because it disturbs others.",
      solution: {
        method: "State the claim, then give the reason with 因为.",
        steps: ["Keep one full clause, replace the repeated part with 这样.", "…是不对的，因为这样会吵到别人."],
        tip: "Use 这样 to avoid repeating '在图书馆里大声说话'.",
      },
    },
    {
      id: "p3_zh_supp5_019",
      topic: "JuZi",
      difficulty: "stretch",
      instruction: "B组：请用括号里的词语改写句子。",
      q: "姐姐对妹妹说：“妹妹，把书桌收拾干净。”（叫）",
      answer: "姐姐叫妹妹把书桌收拾干净。",
      pinyin: "Jiějie jiào mèimei bǎ shūzhuō shōushi gānjìng.",
      meaning: "Sister told her little sister to tidy up the desk.",
      solution: {
        method: "Turn direct speech into a 叫-sentence (reported command).",
        steps: ["Subject 姐姐 + 叫 + listener 妹妹 + the action.", "Drop the quotation marks and the address word."],
        tip: "“A 对 B 说：‘…’” → “A 叫 B + 动作” for commands.",
      },
    },
    {
      id: "p3_zh_supp5_020",
      topic: "JuZi",
      difficulty: "stretch",
      instruction: "B组：请用括号里的词语改写句子。",
      q: "小明对大家说：“这是我最喜欢的一本书。”（告诉）",
      answer: "小明告诉大家，这是他最喜欢的一本书。",
      pinyin: "Xiǎo Míng gàosu dàjiā, zhè shì tā zuì xǐhuan de yì běn shū.",
      meaning: "Xiao Ming told everyone that this was his favourite book.",
      solution: {
        method: "Convert direct speech to reported speech with 告诉.",
        steps: ["小明 + 告诉 + 大家 + content.", "Change the pronoun: 我 → 他 (speaker becomes 'he')."],
        tip: "In reported speech, change 我→他/她; drop the quotation marks.",
      },
    },

    // ---------------------------------------------------------------------
    // 六、短文填空 — TianKong cloze (Q21–Q24)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_set2",
      topic: "TianKong",
      difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业五 — 短文填空（雨衣）",
      instruction: "根据短文的内容，选出最适当的答案填入空格（每个词语用一次）。",
      wordBank: ["突然", "意思", "商量", "果然", "立刻", "主意"],
      passage:
        "一天下午，小丽和小英在商店里各自买了一件雨衣。她们刚走出店门，【Q21】下起了大雨。两人站在店门外，你看看我，我看看你，都不愿意穿上自己刚买的新雨衣，担心它会被雨水淋湿。于是，她们便站在店门外【Q22】要怎样回家。\n\n" +
        "店主听到了她们的对话，对她们说：“你们交换雨衣来穿吧。”她们想了想，觉得这是一个好【Q23】，便交换雨衣来穿。\n\n" +
        "穿上雨衣后，她们【Q24】跑回家。由于她们身上穿的都不是自己的雨衣，所以被雨淋湿了也不会心疼。",
      questions: [
        {
          id: "p3_zh_supp5_021",
          type: "MCQ",
          q: "她们刚走出店门，（　）下起了大雨。",
          options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
          answer: 0,
          pinyin: "tūrán",
          meaning: "suddenly",
          solution: { method: "Something unexpected happens.", steps: ["刚走出门就下大雨 = it suddenly rained → 突然."], tip: "突然 = suddenly, for unexpected events." },
        },
        {
          id: "p3_zh_supp5_022",
          type: "MCQ",
          q: "她们便站在店门外（　）要怎样回家。",
          options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
          answer: 2,
          pinyin: "shāngliang",
          meaning: "to discuss / talk over",
          solution: { method: "Two people deciding together.", steps: ["站在门外（　）要怎样回家 = discuss how to go home → 商量."], tip: "商量 = discuss/consult with someone." },
        },
        {
          id: "p3_zh_supp5_023",
          type: "MCQ",
          q: "她们想了想，觉得这是一个好（　）。",
          options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
          answer: 5,
          pinyin: "zhǔyi",
          meaning: "idea",
          solution: { method: "A good ___ = a good idea.", steps: ["一个好主意 = a good idea → 主意."], tip: "好主意 = good idea; 主意 = idea/plan." },
        },
        {
          id: "p3_zh_supp5_024",
          type: "MCQ",
          q: "穿上雨衣后，她们（　）跑回家。",
          options: ["突然", "意思", "商量", "果然", "立刻", "主意"],
          answer: 4,
          pinyin: "lìkè",
          meaning: "immediately / at once",
          solution: { method: "Right after putting on raincoats.", steps: ["穿上雨衣后（　）跑回家 = ran home immediately → 立刻."], tip: "立刻 = immediately; shows a quick next action." },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // 七、阅读理解 (选择) — YueReadMCQ set (Q25–Q28)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_set3",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "道南学校 P3 HCL 补充作业五 — 阅读理解（小鸟与鸟笼）",
      instruction: "根据短文的内容，选出最适当的答案。",
      passage:
        "小明生日那天，叔叔送了一个鸟笼给他。小明到屋外捉了一只小鸟，想把它养在笼子里。妈妈见了，说：“你把小鸟关进笼子里，它会失去自由而变得不开心。日子久了，小鸟不但会生病，还可能会死掉。”\n\n" +
        "小明不相信妈妈的话，还是把小鸟关进笼子里。他每天给小鸟喝水，抓虫子给它吃，一有空还陪它玩。可是，小鸟不吃也不喝，几天后便倒在笼子里，一动也不动。小明见了，心里很着急。他连忙打开笼子，想看看小鸟是不是生病了。没想到，小鸟却张开眼睛飞走了。\n\n" +
        "小明这才知道，小鸟并没有生病，只是想逃出鸟笼。他大声地对着小鸟说：“再见了，小鸟。我再也不把你关进笼子里了！”",
      questions: [
        {
          id: "p3_zh_supp5_025",
          type: "MCQ",
          q: "小明生日当天收到了什么礼物？",
          options: ["一只小鸟。", "一个鸟笼。", "鸟笼和小鸟。", "小鸟和小虫。"],
          answer: 1,
          pinyin: "Xiǎo Míng shēngrì dàngtiān shōudào le shénme lǐwù?",
          meaning: "What present did Xiao Ming receive on his birthday?",
          solution: {
            method: "Separate what was given from what he caught.",
            steps: ["叔叔送了一个鸟笼 (the gift).", "The bird he caught himself → the present is 一个鸟笼."],
            tip: "Trap: he got a bird too, but he caught it himself; only the cage was a gift.",
          },
        },
        {
          id: "p3_zh_supp5_026",
          type: "MCQ",
          q: "妈妈为什么不赞成小明把小鸟关在笼子里？",
          options: ["小鸟会着急。", "小鸟不会飞走。", "小鸟会失去自由。", "小鸟不会陪小明玩。"],
          answer: 2,
          pinyin: "Māma wèishéme bú zànchéng Xiǎo Míng bǎ xiǎo niǎo guān zài lóngzi lǐ?",
          meaning: "Why did mum disapprove of Xiao Ming keeping the bird in the cage?",
          solution: {
            method: "Find mum's reason in paragraph 1.",
            steps: ["Mum: 它会失去自由而变得不开心.", "→ 小鸟会失去自由."],
            tip: "Match the option to mum's exact words.",
          },
        },
        {
          id: "p3_zh_supp5_027",
          type: "MCQ",
          q: "小明打开笼子的原因是什么？",
          options: ["他想把小鸟放走。", "他想给小鸟喝水。", "他想陪小鸟一起玩。", "他想看小鸟是不是生病了。"],
          answer: 3,
          pinyin: "Xiǎo Míng dǎkāi lóngzi de yuányīn shì shénme?",
          meaning: "Why did Xiao Ming open the cage?",
          solution: {
            method: "Read the sentence before he opened it.",
            steps: ["他连忙打开笼子，想看看小鸟是不是生病了."],
            tip: "He didn't mean to free the bird — it flew off by itself.",
          },
        },
        {
          id: "p3_zh_supp5_028",
          type: "MCQ",
          q: "以下哪一个句子是正确的？",
          options: ["小鸟最后病死了。", "小鸟不爱吃小虫子。", "小鸟要住在笼子里。", "小鸟不想被关在笼子里。"],
          answer: 3,
          pinyin: "Yǐxià nǎ yí ge jùzi shì zhèngquè de?",
          meaning: "Which of the following sentences is correct?",
          solution: {
            method: "Check each option against the text.",
            steps: ["小鸟并没有生病，只是想逃出鸟笼.", "→ 小鸟不想被关在笼子里 is correct."],
            tip: "The bird wasn't sick (so not '病死了'); it simply wanted freedom.",
          },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // 八、理解问答 — YueReadOpen set (Q29–Q33)  [theme: 孝顺]
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_supp5_set4",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "道南学校 P3 HCL 补充作业五 — 理解问答（阿宝喂蚊子，主题：孝顺）",
      instruction: "根据文章的内容和上下文的意思，回答下列的问题。",
      passage:
        "古时候，有个孩子名叫阿宝。他的父母都是农夫。阿宝五六岁时就常常跟着父母去田里帮忙。邻居们都夸阿宝是个懂事的孩子。\n\n" +
        "阿宝家里很穷，连蚊帐也买不起，他们一家人到了夏天就会被又大又黑的蚊子咬得整晚都睡不好。\n\n" +
        "为了让在田里劳累了一天的父母睡个好觉，阿宝想到了一个好主意。每到晚上，阿宝就光着上身，睡在父母身旁。不一会儿，蚊子果然都飞到了他身上。阿宝任由蚊子咬他，一动也不动。爸爸妈妈醒来，看见这情形，赶紧把阿宝身上的蚊子全都赶跑了。\n\n" +
        "妈妈看着阿宝身上被蚊子咬出的大大小小的包，心疼地问阿宝：“阿宝，这么多蚊子在你身上，你怎么不赶走它们呢？”阿宝睁着大眼睛，说：“妈妈，我就是要让蚊子来咬我，这样蚊子就不会去咬您和爸爸了！”爸爸妈妈听了，感动得流下了眼泪。",
      questions: [
        {
          id: "p3_zh_supp5_029a",
          type: "OpenEnded",
          q: "文中形容“真的发生了”的词语是＿＿＿。（1分）",
          answer: "果然",
          pinyin: "guǒrán",
          meaning: "sure enough / as expected (the word in the text)",
          solution: {
            method: "Find the matching word in the text.",
            steps: ["“蚊子果然都飞到了他身上” → 果然 = it really happened as expected."],
            tip: "果然 = sure enough; the expected thing truly happened.",
          },
        },
        {
          id: "p3_zh_supp5_029b",
          type: "OpenEnded",
          q: "文中形容“舍不得”的词语是＿＿＿。（1分）",
          answer: "心疼",
          pinyin: "xīnténg",
          meaning: "to feel sorry / pained for someone (the word in the text)",
          solution: {
            method: "Find the matching word in the text.",
            steps: ["“妈妈…心疼地问阿宝” → 心疼 = feeling pained/loath to see him hurt."],
            tip: "心疼 = heart aches for someone you love.",
          },
        },
        {
          id: "p3_zh_supp5_030",
          type: "OpenEnded",
          q: "为什么邻居们会夸阿宝是个懂事的孩子？（1分）",
          answer: "因为阿宝五六岁时就常常跟着父母去田里帮忙。",
          pinyin: "Wèishéme línjū men huì kuā Ā Bǎo shì ge dǒngshì de háizi?",
          meaning: "Why did the neighbours praise Ah Bao as a sensible child?",
          solution: {
            method: "Find the reason in paragraph 1.",
            steps: ["阿宝五六岁就常跟父母去田里帮忙.", "Answer with 因为 + this fact."],
            tip: "“为什么” → begin with 因为 and cite the text.",
          },
        },
        {
          id: "p3_zh_supp5_031",
          type: "OpenEnded",
          q: "什么事令阿宝一家人一到夏天就整晚都睡不好？（2分）",
          answer: "因为他们家很穷，连蚊帐也买不起，夏天就会被又大又黑的蚊子咬得整晚都睡不好。",
          pinyin: "Shénme shì lìng Ā Bǎo yìjiā rén yí dào xiàtiān jiù zhěng wǎn dōu shuì bù hǎo?",
          meaning: "What caused Ah Bao's family to sleep badly all night every summer?",
          solution: {
            method: "Find the cause in paragraph 2.",
            steps: ["家里穷，买不起蚊帐 → 夏天被蚊子咬得睡不好.", "Include both the poverty and the mosquitoes."],
            tip: "Give the full cause-and-effect for 2 marks.",
          },
        },
        {
          id: "p3_zh_supp5_032",
          type: "OpenEnded",
          q: "爸爸妈妈看见阿宝被蚊子咬后，有什么反应？（2分）",
          answer:
            "他们赶紧把阿宝身上的蚊子全都赶跑了；妈妈心疼地问他为什么不赶走蚊子；听了阿宝的话后，他们感动得流下了眼泪。",
          pinyin: "Bàba māma kànjiàn Ā Bǎo bèi wénzi yǎo hòu, yǒu shénme fǎnyìng?",
          meaning: "How did the parents react when they saw Ah Bao being bitten by mosquitoes?",
          solution: {
            method: "List the parents' reactions directly (this is NOT a 'why' question).",
            steps: ["赶跑蚊子 → 心疼地问他 → 感动得流泪.", "Write the reactions out; do not start with 因为."],
            tip: "Per the worksheet's notes: just state the reactions, no 因为 needed.",
          },
        },
        {
          id: "p3_zh_supp5_033",
          type: "OpenEnded",
          q: "你认为阿宝是一个怎样的孩子？为什么？（2分）",
          answer:
            "我认为阿宝是一个孝顺（懂事）的孩子。因为他为了让劳累的父母睡个好觉，宁愿光着身子让蚊子咬自己，也不让蚊子去咬父母。",
          pinyin: "Nǐ rènwéi Ā Bǎo shì yí ge zěnyàng de háizi? Wèishéme?",
          meaning: "What kind of child do you think Ah Bao is? Why?",
          solution: {
            method: "Answer in two parts: a judgement + a reason from the story.",
            steps: ["Part 1: 阿宝是个孝顺/懂事的孩子 (ties to the theme 孝顺).", "Part 2: cite the example — he let mosquitoes bite him to protect his parents."],
            tip: "The two halves must be separate: first say what kind of child, then prove it with an event from the passage.",
          },
        },
      ],
    },
  ],
};

export default supp5TaoNanHcl;
