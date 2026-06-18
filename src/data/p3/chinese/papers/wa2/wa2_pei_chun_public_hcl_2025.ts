// =============================================================================
// P3 Chinese WA2 — Pei Chun Public School (公立培群学校) Higher Chinese
// Source: sgexam.com compilation  |  Paper code: P3/HCL/T2 WA (Booklet A + B)
// Structure: A部分 Q1–Q10 (OAS / MCQ, 10 marks) + B部分 Q11–Q18 (written, 16 marks)
// -----------------------------------------------------------------------------
// CONVENTION: `answer` for MCQ items is a 0-BASED array index into `options`.
//             (e.g. answer:2 means options[2] is correct.)
//             For written / open-ended items, `answer` is model-answer text.
//             >> If your WA1 files use 1-based indices, tell me and I'll switch.
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
  options?: string[]; // omit for written/open-ended
  answer: number | string; // MCQ: 0-based index | written: text
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
  passage: string;
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

export const wa2PeiChunPublicHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_pei_chun_public_hcl",
    school: "Pei Chun Public School",
    schoolZh: "公立培群学校",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "2025 Weighted Assessment 2 (第二学段测试)",
    source: "sgexam.com — P3/HCL/T2 WA",
    totalMarks: 26,
  },
  items: [
    // ---------------------------------------------------------------------
    // (一) 辨字测验 — BianZi (Q1–Q4)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa2_001",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "小时候的事（　），我还记在心里。",
      options: ["晴", "请", "情", "青"],
      answer: 2,
      pinyin: "Xiǎo shíhou de shìqing, wǒ hái jì zài xīnlǐ.",
      meaning: "The things from my childhood, I still keep them in my heart.",
      solution: {
        method: "Pick the character that completes the right word.",
        steps: [
          "The blank follows 事 → the word should be 事情 (a matter / thing).",
          "情 (qíng) means feeling/affair and fits; 晴(sunny), 请(please), 青(green) do not.",
        ],
        tip: "These four all sound like 'qing' — choose by meaning, not by sound.",
      },
    },
    {
      id: "p3_zh_wa2_002",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "上学快迟到了，我来不（　）吃早餐。",
      options: ["急", "及", "机", "己"],
      answer: 1,
      pinyin: "Shàngxué kuài chídào le, wǒ láibují chī zǎocān.",
      meaning: "I'm almost late for school, so there's no time to eat breakfast.",
      solution: {
        method: "Recognise the fixed phrase.",
        steps: [
          "来不（　）吃 → the set phrase is 来不及 (no time to do something).",
          "及 (jí) means 'in time / reach'; 急(anxious), 机(machine), 己(self) do not fit.",
        ],
        tip: "来不及 = cannot make it in time; 来得及 = there is still time.",
      },
    },
    {
      id: "p3_zh_wa2_003",
      topic: "BianZi",
      difficulty: "core",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "这辆车开得很快，（　）上了路边的大树。",
      options: ["懂", "撞", "理", "章"],
      answer: 1,
      pinyin: "Zhè liàng chē kāi de hěn kuài, zhuàng shàng le lùbiān de dà shù.",
      meaning: "This car was going very fast and crashed into the big tree by the road.",
      solution: {
        method: "Match the action to the situation.",
        steps: [
          "A fast car hitting a tree → 撞 (zhuàng, to crash into).",
          "懂(understand), 理(reason), 章(chapter) make no sense here.",
        ],
        tip: "撞 has the 扌(hand) radical — many 'doing/hitting' verbs use it.",
      },
    },
    {
      id: "p3_zh_wa2_004",
      topic: "BianZi",
      difficulty: "foundation",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "回到家，妹妹先把鞋子（　）掉，才去冲凉。",
      options: ["脱", "推", "改", "退"],
      answer: 0,
      pinyin: "Huí dào jiā, mèimei xiān bǎ xiézi tuōdiào, cái qù chōngliáng.",
      meaning: "After getting home, my sister takes off her shoes first, then goes to shower.",
      solution: {
        method: "Match the verb to the object.",
        steps: [
          "把鞋子（　）掉 → you 脱 (take off) shoes before showering.",
          "推(push), 改(change), 退(return) don't go with 鞋子…掉.",
        ],
        tip: "脱 + clothing/shoes = take off. 冲凉 is the local word for 'shower'.",
      },
    },

    // ---------------------------------------------------------------------
    // (二) 词语选择 — CiYu (Q5–Q7)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa2_005",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "哥哥正在房里做功课，没想到爸爸（　）走了进来。",
      options: ["刚刚", "一直", "经常", "突然"],
      answer: 3,
      pinyin: "Gēge zhèngzài fáng lǐ zuò gōngkè, méi xiǎngdào bàba tūrán zǒu le jìnlái.",
      meaning: "Big brother was doing homework when, to his surprise, dad suddenly walked in.",
      solution: {
        method: "Use the clue word in the sentence.",
        steps: [
          "没想到 (unexpectedly) signals something sudden → 突然 (suddenly).",
          "刚刚(just now), 一直(all along), 经常(often) don't match '没想到'.",
        ],
        tip: "Look for matching clue words: 没想到 pairs naturally with 突然.",
      },
    },
    {
      id: "p3_zh_wa2_006",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "小华（　）了生日礼物，送给外婆。",
      options: ["希望", "准备", "争取", "庆祝"],
      answer: 1,
      pinyin: "Xiǎo Huá zhǔnbèi le shēngrì lǐwù, sòng gěi wàipó.",
      meaning: "Xiao Hua prepared a birthday present to give to her grandmother.",
      solution: {
        method: "Find the verb that goes with the object.",
        steps: [
          "You 准备 (prepare) a present before giving it away.",
          "希望(hope), 争取(strive for), 庆祝(celebrate) don't take 礼物 as object here.",
        ],
        tip: "准备 + 礼物 = prepare a gift; 庆祝 takes events (庆祝生日), not objects.",
      },
    },
    {
      id: "p3_zh_wa2_007",
      topic: "CiYu",
      difficulty: "core",
      instruction: "从各题所提供的四个答案中，选出正确的答案。",
      q: "这张桌子很重，要几个人一起才能（　）。",
      options: ["碰到", "溜走", "搬动", "拿走"],
      answer: 2,
      pinyin: "Zhè zhāng zhuōzi hěn zhòng, yào jǐ ge rén yìqǐ cáinéng bāndòng.",
      meaning: "This table is very heavy; it takes several people working together to move it.",
      solution: {
        method: "Pick the word that fits 'heavy + several people'.",
        steps: [
          "A heavy table that needs many people → 搬动 (move something heavy).",
          "碰到(bump into), 溜走(slip away), 拿走(carry away) don't fit a heavy table.",
        ],
        tip: "搬 is used for moving big/heavy things; 拿 is for small things you can hold.",
      },
    },

    // ---------------------------------------------------------------------
    // (三) 阅读理解 (选择) — YueReadMCQ set (Q8–Q10)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa2_set1",
      topic: "YueReadMCQ",
      difficulty: "core",
      setLabel: "公立培群学校 P3 HCL WA2 — 阅读理解（选择）",
      instruction: "根据短文的内容和上下文的意思，选出正确的答案。",
      passage:
        "生日那天，叔叔送了我一台游戏机，我高兴极了！妈妈说：“只要你把功课做完，就可以玩游戏机。”从那天起，我一回到家，就很快把功课完成，然后拿起游戏机玩。\n\n" +
        "这一天，我在房间玩游戏机时，妈妈走了进来。她生气地说：“老师告诉我，你最近的功课做得很不认真，上课也常常睡觉。我会把游戏机收起来，这样你才能专心学习。”\n\n" +
        "听了妈妈的话，我低下了头，说：“对不起，妈妈。我知道错了。从今天起，我一定会好好学习。”",
      questions: [
        {
          id: "p3_zh_wa2_008",
          type: "MCQ",
          q: "谁送了“我”一台游戏机？",
          options: ["妈妈", "叔叔", "爸爸", "老师"],
          answer: 1,
          pinyin: "Shéi sòng le “wǒ” yì tái yóuxìjī?",
          meaning: "Who gave 'me' a game console?",
          solution: {
            method: "Locate the giver in the text.",
            steps: [
              "Sentence 1: 叔叔送了我一台游戏机.",
              "So the giver is 叔叔 (uncle).",
            ],
            tip: "Find the exact line that names who did the action.",
          },
        },
        {
          id: "p3_zh_wa2_009",
          type: "MCQ",
          q: "妈妈为什么很生气？",
          options: [
            "“我”没有做功课",
            "“我”在玩游戏机",
            "“我”在房里睡觉",
            "“我”学习不认真",
          ],
          answer: 3,
          pinyin: "Māma wèishéme hěn shēngqì?",
          meaning: "Why was mum very angry?",
          solution: {
            method: "Find the reason mum gives.",
            steps: [
              "Mum says: 你最近的功课做得很不认真，上课也常常睡觉.",
              "That is 学习不认真 (not serious about studying).",
            ],
            tip: "Trap: 'I' was playing the console, but mum's anger is about poor study attitude.",
          },
        },
        {
          id: "p3_zh_wa2_010",
          type: "MCQ",
          q: "“我”为什么低下了头？",
          options: [
            "“我”知道自己错了",
            "“我”正在玩游戏机",
            "“我”要把功课做完",
            "“我”把游戏机收好",
          ],
          answer: 0,
          pinyin: "“Wǒ” wèishéme dīxià le tóu?",
          meaning: "Why did 'I' lower my head?",
          solution: {
            method: "Read what 'I' said after lowering the head.",
            steps: [
              "“我”说：对不起，妈妈。我知道错了.",
              "Lowering the head shows 'I' realised the mistake → 知道自己错了.",
            ],
            tip: "Body language (低下了头) + the spoken words together give the answer.",
          },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // (四) 组合句子 — ZuJu (Q11–Q13)  «……或者……»
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa2_011",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "用括号里的词语来连接以下的句子。",
      q: "我们可以游泳。（……或者……）我们可以打球。",
      answer: "我们可以游泳或者打球。",
      pinyin: "Wǒmen kěyǐ yóuyǒng huòzhě dǎqiú.",
      meaning: "We can swim or play ball games.",
      solution: {
        method: "Join two choices with 或者.",
        steps: [
          "Both sentences share 我们可以 — say it once.",
          "Keep the two different actions and link them: 游泳 或者 打球.",
        ],
        tip: "或者 = 'or' for stating options in a statement (not a question).",
      },
    },
    {
      id: "p3_zh_wa2_012",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "用括号里的词语来连接以下的句子。",
      q: "妹妹可以到图书馆借书。（……或者……）妹妹可以到图书馆看报纸。",
      answer: "妹妹可以到图书馆借书或者看报纸。",
      pinyin: "Mèimei kěyǐ dào túshūguǎn jièshū huòzhě kàn bàozhǐ.",
      meaning: "Little sister can borrow books or read newspapers at the library.",
      solution: {
        method: "Merge the repeated part, link the two actions.",
        steps: [
          "Shared part: 妹妹可以到图书馆 — write it once.",
          "Connect the two activities: 借书 或者 看报纸.",
        ],
        tip: "Drop the repeated subject and place; only the verbs differ.",
      },
    },
    {
      id: "p3_zh_wa2_013",
      topic: "ZuJu",
      difficulty: "core",
      instruction: "用括号里的词语来连接以下的句子。",
      q: "小乐可以去海边。（……或者……）小乐可以去公园。",
      answer: "小乐可以去海边或者公园。",
      pinyin: "Xiǎo Lè kěyǐ qù hǎibiān huòzhě gōngyuán.",
      meaning: "Xiao Le can go to the seaside or the park.",
      solution: {
        method: "Combine two destinations with 或者.",
        steps: [
          "Shared part: 小乐可以去 — keep once.",
          "Link the places: 海边 或者 公园.",
        ],
        tip: "“小乐可以去海边或者去公园。” is also accepted (verb 去 repeated).",
      },
    },

    // ---------------------------------------------------------------------
    // (五) 扩写句子 — JuZi (Q14–Q15)  «add the word in the right place»
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa2_014",
      topic: "JuZi",
      difficulty: "core",
      instruction: "把括号里面的词语加在句子中适当的地方。",
      q: "弟弟哭了起来。（伤心地）",
      answer: "弟弟伤心地哭了起来。",
      pinyin: "Dìdi shāngxīn de kū le qǐlái.",
      meaning: "Little brother started crying sadly.",
      solution: {
        method: "Place the adverb before the verb.",
        steps: [
          "伤心地 describes how he cried → it goes in front of the verb 哭.",
          "Result: 弟弟 + 伤心地 + 哭了起来.",
        ],
        tip: "Words ending in 地 (adverbs) come right before the verb.",
      },
    },
    {
      id: "p3_zh_wa2_015",
      topic: "JuZi",
      difficulty: "core",
      instruction: "把括号里面的词语加在句子中适当的地方。",
      q: "我喝杯子里的牛奶。（大口大口地）",
      answer: "我大口大口地喝杯子里的牛奶。",
      pinyin: "Wǒ dàkǒu dàkǒu de hē bēizi lǐ de niúnǎi.",
      meaning: "I drink the milk in the cup in big gulps.",
      solution: {
        method: "Insert the manner adverb before the verb.",
        steps: [
          "大口大口地 tells how I drink → put it before 喝.",
          "Result: 我 + 大口大口地 + 喝杯子里的牛奶.",
        ],
        tip: "Manner phrase (…地) sits between the subject and the verb.",
      },
    },

    // ---------------------------------------------------------------------
    // (六) 阅读理解 (问答) — YueReadOpen set (Q16–Q18)
    // ---------------------------------------------------------------------
    {
      id: "p3_zh_wa2_set2",
      topic: "YueReadOpen",
      difficulty: "stretch",
      setLabel: "公立培群学校 P3 HCL WA2 — 阅读理解（问答）",
      instruction: "根据短文的内容和上下文的意思，回答下列的问题。",
      passage:
        "今天，老师带全班同学到游泳池上课。一开始，小丽很害怕。她从小就怕水，也没有学过游泳。但是，当小丽看到同学们一个个高兴地跳进水里时，她也跟着跳了进去。原来水没有小丽想的那么可怕！\n\n" +
        "过后，老师教同学们把头放进水里。小丽听不到外面的声音，也看不见老师，便赶快把头伸（shēn）出水面。老师看见了，便对她说：“只要多练习这个动作，你就会习惯在水里的感觉了。”听了老师的话，小丽不停地练习。很快地，她就不再害怕了。\n\n" +
        "下课后，小丽心想：今天真开心，我还想上游泳课！",
      questions: [
        {
          id: "p3_zh_wa2_016",
          type: "OpenEnded",
          q: "一开始，小丽为什么会害怕？（2分）",
          answer: "因为小丽从小就怕水，也没有学过游泳。",
          pinyin: "Yì kāishǐ, Xiǎo Lì wèishéme huì hàipà?",
          meaning: "At first, why was Xiao Li afraid?",
          solution: {
            method: "Find the cause stated in paragraph 1.",
            steps: [
              "Text: 她从小就怕水，也没有学过游泳.",
              "Answer using 因为… : state both reasons (afraid of water + never learnt).",
            ],
            tip: "“为什么” answers should begin with 因为 and copy both reasons.",
          },
        },
        {
          id: "p3_zh_wa2_017",
          type: "OpenEnded",
          q: "小丽怎么让自己习惯在水里的感觉？（2分）",
          answer: "她听了老师的话，不停地练习把头放进水里这个动作。",
          pinyin: "Xiǎo Lì zěnme ràng zìjǐ xíguàn zài shuǐ lǐ de gǎnjué?",
          meaning: "How did Xiao Li get used to the feeling of being in the water?",
          solution: {
            method: "Find what she did after the teacher spoke.",
            steps: [
              "Teacher: 只要多练习这个动作，你就会习惯… (the action = 把头放进水里).",
              "Text: 听了老师的话，小丽不停地练习 → she practised the action repeatedly.",
            ],
            tip: "“怎么” answers describe the action/method, here 不停地练习.",
          },
        },
        {
          id: "p3_zh_wa2_018",
          type: "OpenEnded",
          q: "小丽喜欢上游泳课吗？从哪里可以看出？（2分）",
          answer:
            "喜欢。因为下课后她心想：“今天真开心，我还想上游泳课！”",
          pinyin: "Xiǎo Lì xǐhuan shàng yóuyǒng kè ma? Cóng nǎlǐ kěyǐ kàn chū?",
          meaning: "Does Xiao Li like swimming lessons? How can we tell?",
          solution: {
            method: "Give a yes/no, then quote the evidence.",
            steps: [
              "State the answer: 喜欢 (yes).",
              "Evidence in the last line: 今天真开心，我还想上游泳课！",
            ],
            tip: "“从哪里可以看出” needs you to point to the exact sentence as proof.",
          },
        },
      ],
    },
  ],
};

export default wa2PeiChunPublicHcl;
