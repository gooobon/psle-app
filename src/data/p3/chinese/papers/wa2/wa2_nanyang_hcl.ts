// =============================================================================
// P3 Chinese WA2 — Nanyang Primary School (南洋小学) Higher Chinese
// 计分测试（二）/ Second Weighted Assessment · 语文应用与理解 · 45 min / 42 marks
// (Year NOT printed on paper or answer key — distinct from the 2025 Nanyang paper.)
// Source: sgexam.com   >> ALL answers verified against the official ANSWER KEY. <<
// -----------------------------------------------------------------------------
// IDs namespaced with `_ny_`. NOTE: 辨字 here uses 3 options (①②③), not 4.
// CONVENTION: MCQ `answer` = 0-BASED index into `options`.
//   - 词语搭配 / 词语选择 / 短文填空: sub-question MCQ whose `options` = the wordBank.
//   - 填写字词 (write characters from pinyin) & open-ended: `answer` is text.
// =============================================================================

export type Difficulty = "foundation" | "core" | "stretch";
export type ChineseTopic =
  | "PinYin" | "BianZi" | "CiYu" | "KanTu" | "PeiDui"
  | "TianKong" | "JuZi" | "ZuJu" | "YueReadMCQ" | "YueReadOpen";
export interface Solution { method: string; steps: string[]; tip: string; }
export interface SingleQuestion {
  id: string; topic: ChineseTopic; difficulty: Difficulty; instruction: string;
  q: string; options?: string[]; answer: number | string;
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

export const wa2NanyangHcl: ChinesePaper = {
  meta: {
    paperId: "p3_zh_wa2_nanyang_hcl",
    school: "Nanyang Primary School",
    schoolZh: "南洋小学",
    level: "Primary 3",
    subject: "Higher Chinese (高级华文)",
    term: "Second Weighted Assessment / 计分测试（二）— 语文应用与理解 (year not printed)",
    source: "sgexam.com — Nanyang WA2 (answers verified by official key)",
    totalMarks: 42,
  },
  items: [
    // 一、辨字测验 — BianZi (Q1–Q5, 3 options each)
    {
      id: "p3_zh_wa2_ny_001", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "他买东西忘了（　）钱。", options: ["父", "付", "复"], answer: 1,
      pinyin: "Tā mǎi dōngxi wàng le fù qián.",
      meaning: "He forgot to pay when he bought things.",
      solution: { method: "Form the word for paying.", steps: ["（　）钱 → 付钱 (pay) → 付."], tip: "付 = pay; 父(father)/复(again) don't fit." },
    },
    {
      id: "p3_zh_wa2_ny_002", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "弟弟用（　）管喝果汁。", options: ["吸", "习", "西"], answer: 0,
      pinyin: "Dìdi yòng xīguǎn hē guǒzhī.",
      meaning: "Little brother drinks juice with a straw.",
      solution: { method: "Form the word 吸管.", steps: ["（　）管 → 吸管 (straw) → 吸."], tip: "吸 = suck/inhale (口 radical)." },
    },
    {
      id: "p3_zh_wa2_ny_003", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "我用（　）色笔在画纸上画画。", options: ["菜", "彩", "采"], answer: 1,
      pinyin: "Wǒ yòng cǎisèbǐ zài huàzhǐ shàng huàhuà.",
      meaning: "I draw on the drawing paper with colour pens.",
      solution: { method: "Form the word 彩色.", steps: ["（　）色笔 → 彩色笔 (colour pens) → 彩."], tip: "彩 = colour; 采(pick)/菜(vegetable) don't fit." },
    },
    {
      id: "p3_zh_wa2_ny_004", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "姐姐到附（　）的小贩中心吃鸡饭。", options: ["退", "遍", "近"], answer: 2,
      pinyin: "Jiějie dào fùjìn de xiǎofàn zhōngxīn chī jīfàn.",
      meaning: "Sister went to the nearby hawker centre to eat chicken rice.",
      solution: { method: "Form the word 附近.", steps: ["附（　）→ 附近 (nearby) → 近."], tip: "附近 = nearby/vicinity." },
    },
    {
      id: "p3_zh_wa2_ny_005", topic: "BianZi", difficulty: "core",
      instruction: "读句子，选出正确的汉字。",
      q: "我为生病的婆婆（　）上一件毛衣。", options: ["皮", "披", "坡"], answer: 1,
      pinyin: "Wǒ wèi shēngbìng de pópo pī shàng yí jiàn máoyī.",
      meaning: "I draped a sweater over my sick grandmother.",
      solution: { method: "Find the verb for putting clothing over the shoulders.", steps: ["（　）上毛衣 → 披上 (drape on) → 披."], tip: "披 = drape over; has the 扌 hand radical." },
    },

    // 二、填写字词 — PinYin: write the characters from pinyin (Q6–Q9)
    {
      id: "p3_zh_wa2_ny_006", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "妹妹张大［yǎn jīng］看着我。", answer: "眼睛",
      pinyin: "yǎnjīng", meaning: "eyes",
      solution: { method: "Write the word for the given pinyin.", steps: ["yǎn jīng → 眼睛 (eyes)."], tip: "睛 (eye) has 目 radical — not 晴(sunny)/情(feeling)." },
    },
    {
      id: "p3_zh_wa2_ny_007", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "班长把故事书［zhěng qí］地放在书架上。", answer: "整齐",
      pinyin: "zhěngqí", meaning: "neat / tidy",
      solution: { method: "Write the word for the given pinyin.", steps: ["zhěng qí → 整齐 (neat/tidy)."], tip: "整齐 describes things arranged in order." },
    },
    {
      id: "p3_zh_wa2_ny_008", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "只要你天天运动，身体就会［qiáng zhuàng］起来。", answer: "强壮",
      pinyin: "qiángzhuàng", meaning: "strong / robust",
      solution: { method: "Write the word for the given pinyin.", steps: ["qiáng zhuàng → 强壮 (strong)."], tip: "强壮 describes a strong, healthy body." },
    },
    {
      id: "p3_zh_wa2_ny_009", topic: "PinYin", difficulty: "core",
      instruction: "根据汉语拼音把正确的字词写在格子里。",
      q: "小狗汪汪是我最好的朋友，一直［péi bàn］着我。", answer: "陪伴",
      pinyin: "péibàn", meaning: "to accompany",
      solution: { method: "Write the word for the given pinyin.", steps: ["péi bàn → 陪伴 (accompany)."], tip: "陪伴 = keep someone company." },
    },

    // 三、词语搭配 — PeiDui (Q10–Q14)
    {
      id: "p3_zh_wa2_ny_set1", topic: "PeiDui", difficulty: "core",
      setLabel: "南洋小学 P3 HCL WA2 — 词语搭配",
      instruction: "选出正确的答案，把代表它的号码写在括号里。",
      wordBank: ["搬动", "变化", "赶快", "发出", "有趣", "希望"],
      questions: [
        { id: "p3_zh_wa2_ny_010", type: "MCQ", q: "（　）躲开", options: ["搬动","变化","赶快","发出","有趣","希望"], answer: 2,
          pinyin: "gǎnkuài duǒkāi", meaning: "to quickly dodge / get out of the way",
          solution: { method: "How do you 躲开 (dodge) in time?", steps: ["赶快躲开 → 赶快."], tip: "赶快 = quickly; urges fast action." } },
        { id: "p3_zh_wa2_ny_011", type: "MCQ", q: "故事（　）", options: ["搬动","变化","赶快","发出","有趣","希望"], answer: 4,
          pinyin: "gùshi yǒuqù", meaning: "an interesting story",
          solution: { method: "Describe a good story.", steps: ["故事有趣 → 有趣."], tip: "有趣 = interesting/fun." } },
        { id: "p3_zh_wa2_ny_012", type: "MCQ", q: "（　）椅子", options: ["搬动","变化","赶快","发出","有趣","希望"], answer: 0,
          pinyin: "bāndòng yǐzi", meaning: "to move a chair",
          solution: { method: "What do you do to a chair?", steps: ["搬动椅子 → 搬动."], tip: "搬动 = move (something heavy)." } },
        { id: "p3_zh_wa2_ny_013", type: "MCQ", q: "发生（　）", options: ["搬动","变化","赶快","发出","有趣","希望"], answer: 1,
          pinyin: "fāshēng biànhuà", meaning: "a change occurs",
          solution: { method: "What can 发生 (happen)?", steps: ["发生变化 → 变化."], tip: "发生 + 变化/事情." } },
        { id: "p3_zh_wa2_ny_014", type: "MCQ", q: "（　）声音", options: ["搬动","变化","赶快","发出","有趣","希望"], answer: 3,
          pinyin: "fāchū shēngyīn", meaning: "to make a sound",
          solution: { method: "What do you do with a 声音 (sound)?", steps: ["发出声音 → 发出."], tip: "发出 + 声音/光." } },
      ],
    },

    // 四、词语选择 — CiYu (word-bank style) (Q15–Q19)
    {
      id: "p3_zh_wa2_ny_set2", topic: "CiYu", difficulty: "core",
      setLabel: "南洋小学 P3 HCL WA2 — 词语选择",
      instruction: "选出正确的答案，把代表它的号码写在括号里。",
      wordBank: ["争取", "容易", "参观", "请求", "立刻", "实现"],
      questions: [
        { id: "p3_zh_wa2_ny_015", type: "MCQ", q: "哥哥（　）了上大学的愿望。", options: ["争取","容易","参观","请求","立刻","实现"], answer: 5,
          pinyin: "Gēge shíxiàn le shàng dàxué de yuànwàng.", meaning: "Big brother fulfilled his wish of going to university.",
          solution: { method: "What do you do to a 愿望 (wish)?", steps: ["实现愿望 → 实现."], tip: "实现 + 愿望/梦想." } },
        { id: "p3_zh_wa2_ny_016", type: "MCQ", q: "我（　）妈妈让我去上演艺课。", options: ["争取","容易","参观","请求","立刻","实现"], answer: 3,
          pinyin: "Wǒ qǐngqiú māma ràng wǒ qù shàng yǎnyì kè.", meaning: "I begged mum to let me attend the performing-arts class.",
          solution: { method: "How do you ask mum for permission?", steps: ["请求妈妈 → 请求."], tip: "请求 = request/beg someone." } },
        { id: "p3_zh_wa2_ny_017", type: "MCQ", q: "老师带我们去（　）饼干工厂。", options: ["争取","容易","参观","请求","立刻","实现"], answer: 2,
          pinyin: "Lǎoshī dài wǒmen qù cānguān bǐnggān gōngchǎng.", meaning: "The teacher took us to visit a biscuit factory.",
          solution: { method: "What do you do at a factory tour?", steps: ["参观工厂 → 参观."], tip: "参观 = visit (to look around)." } },
        { id: "p3_zh_wa2_ny_018", type: "MCQ", q: "每次比赛，弟弟都（　）做到最好。", options: ["争取","容易","参观","请求","立刻","实现"], answer: 0,
          pinyin: "Měi cì bǐsài, dìdi dōu zhēngqǔ zuò dào zuì hǎo.", meaning: "In every competition, little brother strives to do his best.",
          solution: { method: "Pick the word for trying hard for a goal.", steps: ["争取做到最好 → 争取."], tip: "争取 = strive for / try hard to achieve." } },
        { id: "p3_zh_wa2_ny_019", type: "MCQ", q: "看到老奶奶跌倒了，我（　）上前扶她起来。", options: ["争取","容易","参观","请求","立刻","实现"], answer: 4,
          pinyin: "Kàndào lǎo nǎinai diédǎo le, wǒ lìkè shàngqián fú tā qǐlái.", meaning: "Seeing the old lady fall, I immediately went forward to help her up.",
          solution: { method: "How fast did you react?", steps: ["立刻上前 → 立刻."], tip: "立刻 = immediately / at once." } },
      ],
    },

    // 五、扩写句子 — JuZi (Q20–Q24)
    {
      id: "p3_zh_wa2_ny_020", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "这只手表是老师的。（三角形的）", answer: "这只三角形的手表是老师的。",
      pinyin: "Zhè zhī sānjiǎoxíng de shǒubiǎo shì lǎoshī de.",
      meaning: "This triangular watch belongs to the teacher.",
      solution: { method: "Place the describing phrase before the noun.", steps: ["三角形的 describes 手表 → put it before 手表."], tip: "An adjective phrase (…的) goes right before the noun." },
    },
    {
      id: "p3_zh_wa2_ny_021", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "弟弟为妈妈打扫房子。（懂事的）", answer: "懂事的弟弟为妈妈打扫房子。",
      pinyin: "Dǒngshì de dìdi wèi māma dǎsǎo fángzi.",
      meaning: "The sensible little brother cleaned the house for mum.",
      solution: { method: "Place the adjective before the subject it describes.", steps: ["懂事的 describes 弟弟 → put it before 弟弟."], tip: "…的 describing a person goes before that person." },
    },
    {
      id: "p3_zh_wa2_ny_022", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "小明说：“对不起，是我不小心推了你。”（不好意思地）",
      answer: "小明不好意思地说：“对不起，是我不小心推了你。”",
      pinyin: "Xiǎo Míng bùhǎoyìsi de shuō: “Duìbuqǐ, shì wǒ bù xiǎoxīn tuī le nǐ.”",
      meaning: "Xiao Ming said embarrassedly, \"Sorry, I pushed you by accident.\"",
      solution: { method: "Place the manner phrase before the verb 说.", steps: ["不好意思地 describes how he 说 → put it before 说."], tip: "…地 (adverb) goes before the verb." },
    },
    {
      id: "p3_zh_wa2_ny_023", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "姐姐看到奶奶正在睡午觉，就关门。（轻轻地）",
      answer: "姐姐看到奶奶正在睡午觉，就轻轻地关门。",
      pinyin: "Jiějie kàndào nǎinai zhèngzài shuì wǔjiào, jiù qīngqīng de guānmén.",
      meaning: "Seeing grandma taking a nap, sister gently closed the door.",
      solution: { method: "Place the adverb before the verb 关门.", steps: ["轻轻地 describes how she closed the door → before 关门."], tip: "Put the …地 phrase right before the action." },
    },
    {
      id: "p3_zh_wa2_ny_024", topic: "JuZi", difficulty: "core",
      instruction: "用括号里的短语扩写句子。",
      q: "听到心爱的小猫不见了，他哭了。（伤心地）",
      answer: "听到心爱的小猫不见了，他伤心地哭了。",
      pinyin: "Tīngdào xīn'ài de xiǎo māo bú jiàn le, tā shāngxīn de kū le.",
      meaning: "Hearing that his beloved cat was missing, he cried sadly.",
      solution: { method: "Place the manner phrase before the verb 哭.", steps: ["伤心地 describes how he cried → before 哭了."], tip: "…地 adverb goes before the verb 哭." },
    },

    // 六、短文填空 — TianKong cloze (Q25–Q29)
    {
      id: "p3_zh_wa2_ny_set3", topic: "TianKong", difficulty: "core",
      setLabel: "南洋小学 P3 HCL WA2 — 短文填空（立明在图书馆）",
      instruction: "读句子，选出正确的词语，把号码填写在括号里。",
      wordBank: ["连忙", "问题", "不要紧", "准时", "突然", "来不及"],
      passage:
        "上个星期五，立明一下课就跑去图书馆。他告诉自己：“还了书就马上去食堂吃东西。今天一定要【Q25】回去课室，不能再迟到了！”\n\n" +
        "没想到，立明看到图书馆里的新书就忘了时间。还有五分钟就要上课了，立明心里感到着急，怕【Q26】吃完妈妈给他准备的点心。于是，他在图书馆里找了一个安静的角落，心想：只要没人看见我在这里吃东西，应该就没【Q27】吧！\n\n" +
        "正当立明要把食物放进嘴巴时，身后【Q28】传来脚步声。他吓了一跳，【Q29】转过身，原来是一位老师。立明知道自己做错了，便红着脸低下头说：“对不起……”",
      questions: [
        { id: "p3_zh_wa2_ny_025", type: "MCQ", q: "今天一定要（　）回去课室，不能再迟到了。", options: ["连忙","问题","不要紧","准时","突然","来不及"], answer: 3,
          pinyin: "zhǔnshí", meaning: "punctual / on time",
          solution: { method: "What must he do to avoid being late?", steps: ["（　）回去课室，不能迟到 → 准时."], tip: "准时 = on time." } },
        { id: "p3_zh_wa2_ny_026", type: "MCQ", q: "怕（　）吃完妈妈给他准备的点心。", options: ["连忙","问题","不要紧","准时","突然","来不及"], answer: 5,
          pinyin: "láibují", meaning: "no time to (do something)",
          solution: { method: "He worries he won't have enough time.", steps: ["怕（　）吃完 → 来不及."], tip: "来不及 = cannot finish in time." } },
        { id: "p3_zh_wa2_ny_027", type: "MCQ", q: "应该就没（　）吧！", options: ["连忙","问题","不要紧","准时","突然","来不及"], answer: 1,
          pinyin: "wèntí", meaning: "problem",
          solution: { method: "He hopes there is no ___.", steps: ["没（　）吧 → 没问题吧 → 问题."], tip: "没问题 = no problem." } },
        { id: "p3_zh_wa2_ny_028", type: "MCQ", q: "身后（　）传来脚步声。", options: ["连忙","问题","不要紧","准时","突然","来不及"], answer: 4,
          pinyin: "tūrán", meaning: "suddenly",
          solution: { method: "The footsteps came unexpectedly.", steps: ["（　）传来脚步声 → 突然."], tip: "突然 = suddenly." } },
        { id: "p3_zh_wa2_ny_029", type: "MCQ", q: "他吓了一跳，（　）转过身。", options: ["连忙","问题","不要紧","准时","突然","来不及"], answer: 0,
          pinyin: "liánmáng", meaning: "hurriedly / at once",
          solution: { method: "How did he turn around after the fright?", steps: ["吓了一跳，（　）转过身 → 连忙."], tip: "连忙 = hurriedly (react quickly)." } },
      ],
    },

    // 七、阅读理解 — YueReadOpen set (Q30–Q34)  [小光长大了]
    {
      id: "p3_zh_wa2_ny_set4", topic: "YueReadOpen", difficulty: "stretch",
      setLabel: "南洋小学 P3 HCL WA2 — 阅读理解（小光长大了）",
      instruction: "读一读短文，然后回答问题。",
      passage:
        "小光从小不管做什么事都要大人帮忙。每天早上闹钟一响，小光就会开始哭闹，直到大人把他抱下床。接着，小光还要奶奶帮他刷牙、洗脸、换衣服。吃早餐时，如果爷爷不把食物放进他嘴里，他就一口也不吃。看到小光这样，妈妈感到很生气。\n\n" +
        "再过一个月，小光就要上学了。为了让他学会自己做好自己的事，妈妈想了一个办法。一天早上，妈妈把几个闹钟放在小光床底下，当闹钟响起时，小光又开始大哭，可是过了很久都没人来帮忙，小光觉得很吵，只好自己从床上爬起来找闹钟。又等了一会儿，还是没人进来房间，小光才发现爷爷奶奶都不在家。这时，小光的肚子很饿，他想：如果不刷牙就吃东西，实在太不卫生了。小光只好乖乖地自己去刷牙吃早餐。\n\n" +
        "就这样过了一个月。开学第一天，妈妈才刚做好早餐，穿好校服的小光就来到饭厅，大声说道：“妈妈，早安！我准备好了！”看着小光安静地吃着早餐，妈妈摸了摸小光的头，笑着对他说：“你长大了！”",
      questions: [
        {
          id: "p3_zh_wa2_ny_030", type: "MCQ",
          q: "为什么小光每天早上都会哭闹？",
          options: ["因为他不要上学。", "因为他的闹钟响了。", "因为他要大人抱他下床。"],
          answer: 2,
          pinyin: "Wèishéme Xiǎo Guāng měitiān zǎoshang dōu huì kūnào?",
          meaning: "Why does Xiao Guang cry and fuss every morning?",
          solution: {
            method: "Find what the crying achieves.",
            steps: ["闹钟一响，小光就哭闹，直到大人把他抱下床.", "→ 他哭闹是为了要大人抱他下床."],
            tip: "He fusses so the adults will carry him out of bed.",
          },
        },
        {
          id: "p3_zh_wa2_ny_031", type: "OpenEnded",
          q: "妈妈怎么让小光自己起床？（2分）",
          answer: "妈妈把几个闹钟放在床底下，当闹钟响起时，大人都没有来帮忙，他觉得很吵，他只好自己从床上爬起来找闹钟。",
          pinyin: "Māma zěnme ràng Xiǎo Guāng zìjǐ qǐchuáng?",
          meaning: "How did mum get Xiao Guang to get up by himself?",
          solution: { method: "Describe mum's plan from paragraph 2.", steps: ["闹钟放床底 → 响时没人帮 → 他嫌吵，只好自己爬起来找闹钟."], tip: "“怎么” → describe the method/steps mum used." },
        },
        {
          id: "p3_zh_wa2_ny_032", type: "OpenEnded",
          q: "为什么小光会乖乖地自己去刷牙？（2分）",
          answer: "因为没有人帮小光刷牙，但小光的肚子很饿，他认为如果不刷牙就去吃早餐很不卫生，所以他会乖乖地自己去刷牙。",
          pinyin: "Wèishéme Xiǎo Guāng huì guāiguāi de zìjǐ qù shuāyá?",
          meaning: "Why did Xiao Guang obediently brush his teeth by himself?",
          solution: { method: "Find his reasoning.", steps: ["没人帮他，肚子饿，他想不刷牙就吃东西太不卫生 → 所以自己去刷牙."], tip: "Start with 因为 and give his thought about hygiene." },
        },
        {
          id: "p3_zh_wa2_ny_033", type: "OpenEnded",
          q: "根据短文内容，完成下面的表格（妈妈的感受）：（2分）",
          answer: "看到小光总要大人帮忙做事——感到很生气；看到小光准备好去上学——感到很开心。",
          pinyin: "Gēnjù duǎnwén nèiróng, wánchéng xiàmiàn de biǎogé.",
          meaning: "Based on the passage, complete the table (mum's feelings).",
          solution: {
            method: "Match each situation to mum's feeling in the text.",
            steps: ["看到小光总要大人帮忙做事 → 很生气 (text: 妈妈感到很生气).", "看到小光准备好去上学 → 很开心 (text: 笑着说‘你长大了’)."],
            tip: "Find the emotion word in the matching part of the story.",
          },
        },
        {
          id: "p3_zh_wa2_ny_034", type: "OpenEnded",
          q: "从哪里可以看出小光长大了？（2分）",
          answer: "小光会自己起床、自己刷牙、自己穿好校服、自己吃早餐，从这里可以看出小光长大了。",
          pinyin: "Cóng nǎlǐ kěyǐ kàn chū Xiǎo Guāng zhǎng dà le?",
          meaning: "How can we tell that Xiao Guang has grown up?",
          solution: { method: "List the things he can now do alone.", steps: ["自己起床、刷牙、穿校服、吃早餐 → shows he has grown up."], tip: "“从哪里看出” → point to the actions that prove it." },
        },
      ],
    },
  ],
};

export default wa2NanyangHcl;
