// =====================================================================================
// 道南学校 (Tao Nan School) - 2024 P3 高级华文 年终考试 试卷二 (45分)
// Source: sgexam.com P3 Chinese EOY compilation, pp.131-144
// Sections covered: 辨字测验 / 汉语拼音 / 词语选择 / 词语搭配 /
//                    改写句子+扩写句子(JuZi) / 短文填空 /
//                    阅读理解(MCQ) / 理解问答(OpenEnded)
// 听力 (Listening) and 看图写段/作文 (Composition) sections excluded per project rules.
// Note: this is a DIFFERENT (2024) Tao Nan EOY paper from the 2023 paper
// (p3_zh_eoy_tn_*); school code "tn24" is used to keep IDs globally unique.
// =====================================================================================

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export type ChineseTopic =
  | 'PinYin'
  | 'BianZi'
  | 'CiYu'
  | 'KanTu'
  | 'PeiDui'
  | 'TianKong'
  | 'ZuJu'
  | 'JuZi'
  | 'YueReadMCQ'
  | 'YueReadOpen';

export type Difficulty = 'foundation' | 'core' | 'stretch';

// Type A: 单一题目 (single standalone question)
export interface SingleQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  instruction: string;
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

// Type B: 组合题目 (set / passage-based question)
export interface SetSubQuestion {
  id: string;
  type: 'MCQ' | 'OpenEnded';
  q: string;
  options?: string[];
  answer: string | number;
  pinyin: string;
  meaning: string;
  solution: Solution;
}

export interface SetQuestion {
  id: string;
  topic: ChineseTopic;
  difficulty: Difficulty;
  setLabel: string;
  passage: string;
  wordBank?: string[];
  questions: SetSubQuestion[];
}

export type EoyTaoNan2024Paper2Question = SingleQuestion | SetQuestion;

// =====================================================================================
// 一、辨字测验 (BianZi) - 5题5分
// =====================================================================================

const bianZiInstruction =
  '从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字（1、2、3、4）填写在右边的括号里。';

const q1: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_001',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '小乐见到______居王伯伯，笑着和他打招呼。',
  options: ['邻', '领', '铃', '龄'],
  answer: 0,
  pinyin: 'lín',
  meaning: '"邻居" = neighbour',
  solution: {
    method:
      '「邻、领、铃、龄」字形相似（都含"令"），但只有一个字能跟"___居"组成常用词语。',
    steps: [
      '「邻」（lín）+ "居"= "邻居"，是指住在附近的人，"小乐见到邻居王伯伯"意思自然。',
      '「领（衣领/带领）、铃（铃声）、龄（年龄）」放进"___居"都不能组成有意义的词语。',
    ],
    tip: '「邻」字是「阝」（双耳旁）部，跟"地方、位置"有关，常见词语有"邻居、邻近"。',
  },
};

const q2: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_002',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '我家______近有一个小公园。',
  options: ['页', '贝', '付', '附'],
  answer: 3,
  pinyin: 'fù',
  meaning: '"附近" = nearby; in the vicinity',
  solution: {
    method:
      '「页、贝、付、附」字形相似，要选出能跟"___近"组成常用词语的字。',
    steps: [
      '「附」（fù）+ "近"= "附近"，表示在某个地方旁边不远处，"我家附近有一个小公园"意思自然。',
      '「页（一页纸）、贝（贝壳）、付（付钱）」放进"___近"都不能组成有意义的词语。',
    ],
    tip: '"附近"是描写位置关系时常用的词语，写法是「附」（阝+付），不要跟「付」（单独，付钱）混淆。',
  },
};

const q3: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_003',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '弟弟不小心弄______了图画纸。',
  options: ['皮', '坡', '破', '披'],
  answer: 2,
  pinyin: 'pò',
  meaning: '"弄破" = to tear (something) by accident',
  solution: {
    method:
      '「皮、坡、破、披」读音相近（pí/pō/pò/pī），字形也相似，要根据"弄___了图画纸"这个词组来判断。',
    steps: [
      '「破」（pò）+ "弄"= "弄破"，表示不小心把东西弄坏/撕坏，"弟弟不小心弄破了图画纸"意思自然。',
      '「皮（皮肤）、坡（斜坡）、披（披着）」放进"弄___了图画纸"都不能组成有意义的词语。',
    ],
    tip: '"弄破"常用来描写"不小心把纸、衣服、气球等弄坏/撕破"的情况。',
  },
};

const q4: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_004',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '天还没亮，林阿姨就已______出门上班了。',
  options: ['晶', '金', '巾', '经'],
  answer: 3,
  pinyin: 'jīng',
  meaning: '"已经" = already',
  solution: {
    method:
      '「晶、金、巾、经」字形相似，要选出能跟"已___"组成常用词语的字。',
    steps: [
      '「经」（jīng）+ "已"= "已经"，表示某件事情在说话之前就已经发生了，"天还没亮，林阿姨就已经出门上班了"意思自然。',
      '「晶（水晶）、金（黄金）、巾（毛巾）」放进"已___"都不能组成有意义的词语。',
    ],
    tip: '"已经"是描写"事情早已发生"时常用的词语，注意「经」字是「纟」（绞丝旁）部，跟"金、巾、晶"不同。',
  },
};

const q5: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_005',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '大家______着小路来到了海滩。',
  options: ['贴', '爬', '沿', '挂'],
  answer: 2,
  pinyin: 'yán',
  meaning: '"沿着" = along',
  solution: {
    method:
      '「贴、爬、沿、挂」字形相似，要选出能跟"___着小路"组成合理词组的字。',
    steps: [
      '「沿」（yán）+ "着小路"= "沿着小路"，表示顺着一条小路前进，"大家沿着小路来到了海滩"意思自然。',
      '「贴（贴上）、爬（爬行）、挂（挂着）」放进"___着小路"都不能组成有意义的词语（"爬着小路"不是常见搭配）。',
    ],
    tip: '"沿着 + 路线（小路、河边、海岸）"是常见搭配，表示顺着某条路线前进。',
  },
};

// =====================================================================================
// 二、汉语拼音 (PinYin) - 2题2分
// =====================================================================================

const pinYinInstruction =
  '根据句子中划线的词语，选出正确的音节，然后把代表它的数字（1、2、3、4）填写在右边的括号里。';

const q6: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_006',
  topic: 'PinYin',
  difficulty: 'core',
  instruction: pinYinInstruction,
  q: '爸爸这个周末会带我们去美术馆。（划线词语：周末）',
  options: ['zōu wèi', 'zhōu mò', 'zuō wèi', 'zhuō mò'],
  answer: 1,
  pinyin: 'zhōu mò',
  meaning: 'weekend',
  solution: {
    method:
      '「周末」的「周」声母是zh，韵母是ou，第一声；「末」声母是m，韵母是o，第四声。要逐字检查声母、韵母和声调。',
    steps: [
      '「周」不是"zōu"（z声母），而是"zhōu"（zh声母），注意翘舌音zh跟平舌音z的区别。',
      '「末」不是"wèi/wéi"（w声母），而是"mò"（m声母）。',
      '两个字合起来正确读音是"zhōu mò"，对应选项(2)。',
    ],
    tip: '「周」是zh声母（翘舌音），容易跟z声母（如"走"）混淆，平时可以多读"周末、周围、四周"巩固读音。',
  },
};

const q7: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_007',
  topic: 'PinYin',
  difficulty: 'core',
  instruction: pinYinInstruction,
  q: '这道题很容易，同学们都会做。（划线词语：容易）',
  options: ['lóng yì', 'nóng yí', 'róng yì', 'tóng yí'],
  answer: 2,
  pinyin: 'róng yì',
  meaning: 'easy',
  solution: {
    method:
      '「容易」的「容」声母是r，韵母是ong，第二声；「易」声母是y，韵母是i，第四声。要逐字检查声母和声调。',
    steps: [
      '「容」不是"lóng"（l声母）或"nóng"（n声母），而是"róng"（r声母），注意r跟l/n的区别。',
      '「易」是第四声"yì"，不是第二声"yí"。',
      '两个字合起来正确读音是"róng yì"，对应选项(3)。',
    ],
    tip: '「容」字的声母r跟「龙(lóng)、农(nóng)」的声母l/n字形相近、读音相似，要特别留意舌头摆放的位置。',
  },
};

// =====================================================================================
// 三、词语选择 (CiYu) - 4题4分
// =====================================================================================

const ciYuInstruction =
  '从各题所提供的四个选项中，选出适当的一个，然后把代表它的数字（1、2、3、4）填写在右边的括号里。';

const q8: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_008',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '奶奶生病了，爸爸在家______她。',
  options: ['关心', '保卫', '照顾', '爱护'],
  answer: 2,
  pinyin: 'zhào gù',
  meaning: 'to take care of',
  solution: {
    method:
      '"奶奶生病了，爸爸在家___她"要选出能形容"在家里照料生病的人"的词语。',
    steps: [
      '「照顾」（zhàogù，to take care of）+ 她 = "照顾她"，表示在生活上照料、看护生病的奶奶，意思自然。',
      '「关心（to care about，多指心理上的关注）、保卫（to defend）、爱护（to cherish/look after，多用于物品或环境）」都不能准确描述"在家照料病人"这个具体行为。',
    ],
    tip: '"照顾 + 生病的人/小孩/宠物"是描写日常照料行为时常用的搭配。',
  },
};

const q9: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_009',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '老师让我们______有熊猫图案的明信片。',
  options: ['变化', '表演', '设计', '参观'],
  answer: 2,
  pinyin: 'shè jì',
  meaning: 'to design',
  solution: {
    method:
      '"老师让我们___有熊猫图案的明信片"要选出表示"创作、制作出有图案的物品"的词语。',
    steps: [
      '「设计」（shèjì，to design）+ 明信片 = "设计...明信片"，表示构思并画出有熊猫图案的明信片，是常见的美术活动。',
      '「变化（change）、表演（to perform）、参观（to visit）」都不能表达"创作出一件带图案的作品"这个意思。',
    ],
    tip: '"设计 + 有...图案的物品（明信片、卡片、海报）"是描写美术/手工活动时常用的搭配。',
  },
};

const q10: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_010',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '小文的腿受伤了，______妈妈扶他上下楼。',
  options: ['指定', '需要', '结果', '必须'],
  answer: 1,
  pinyin: 'xū yào',
  meaning: 'to need',
  solution: {
    method:
      '"小文的腿受伤了"是原因，"___妈妈扶他上下楼"是结果，要选出表示"因为受伤而依赖别人帮助"的词语。',
    steps: [
      '「需要」（xūyào，to need）+ 妈妈扶他 = "需要妈妈扶他上下楼"，表示因为腿受伤，行动不便，所以需要妈妈的帮助，前后因果关系合理。',
      '「指定（to designate）、结果（result，用作连接词时通常放在句首）、必须（must，语气过于强硬，不符合"因受伤而需要帮助"的语境）」都不如"需要"准确。',
    ],
    tip: '"因为受伤/生病，需要别人帮助"是常见的因果搭配，"需要"强调"有这个需求"，语气比"必须"温和。',
  },
};

const q11: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_011',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '妹妹很______，会自己折衣服。',
  options: ['懂事', '努力', '健康', '细心'],
  answer: 0,
  pinyin: 'dǒng shì',
  meaning: 'sensible; thoughtful (for one\'s age)',
  solution: {
    method:
      '"妹妹很___，会自己折衣服"要选出能形容"小孩子能自己做家务、不用大人操心"这种品质的词语。',
    steps: [
      '「懂事」（dǒngshì，sensible）形容小孩子明白事理、能自己处理一些事情，"很懂事，会自己折衣服"意思自然。',
      '「努力（hardworking，多用于学习/做事的态度）、健康（healthy，跟"折衣服"无关）、细心（careful，多用于做事认真细致，但不如"懂事"贴切）」都不如"懂事"准确。',
    ],
    tip: '"懂事"常用来形容小孩子"明白道理、能自己照顾自己/帮忙做事"，是长辈夸奖小孩时常用的词语。',
  },
};

// =====================================================================================
// 四、词语搭配 (PeiDui) - 5题5分
// =====================================================================================

const peiDuiSet: SetQuestion = {
  id: 'p3_zh_eoy_tn24_set1',
  topic: 'PeiDui',
  difficulty: 'core',
  setLabel: 'Tao Nan 2024 EOY Paper 2 - 四、词语搭配',
  passage:
    '从所提供的词语中，选出可以和各题搭配成合理词组的词语，然后把代表它的数字（1-6）填写在括号里。',
  wordBank: ['全身', '安静', '废物', '按照', '愿望', '收拾'],
  questions: [
    {
      id: 'p3_zh_eoy_tn24_012',
      type: 'MCQ',
      q: '保持（　　）',
      options: ['全身', '安静', '废物', '按照', '愿望', '收拾'],
      answer: 1,
      pinyin: 'ān jìng',
      meaning: 'quiet (保持安静 = to keep quiet)',
      solution: {
        method: '"保持___"后面需要一个表示"可以维持的状态"的词语。',
        steps: [
          '「安静」（ānjìng，quiet）+ "保持"= "保持安静"，表示让周围的环境维持不发出声音的状态，是非常常见的固定搭配（例如图书馆、考场）。',
          '其余词语跟"保持"组合都不能组成有意义的词语。',
        ],
        tip: '"保持 + 状态词（安静、整洁、健康）"是常见搭配，表示让某种好的状态持续下去。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_013',
      type: 'MCQ',
      q: '实现（　　）',
      options: ['全身', '安静', '废物', '按照', '愿望', '收拾'],
      answer: 4,
      pinyin: 'yuàn wàng',
      meaning: 'wish (实现愿望 = to fulfil a wish)',
      solution: {
        method: '"实现___"后面需要一个表示"心里想要达成的事情"的名词。',
        steps: [
          '「愿望」（yuànwàng，wish）+ 实现 = "实现愿望"，是非常常见的固定搭配，表示心里的愿望最终达成了。',
          '其余词语跟"实现"组合都不能组成有意义的词语。',
        ],
        tip: '"实现 + 梦想/愿望/计划"是常见搭配，表示原本只是想法的事情最终成为现实。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_014',
      type: 'MCQ',
      q: '（　　）发抖',
      options: ['全身', '安静', '废物', '按照', '愿望', '收拾'],
      answer: 0,
      pinyin: 'quán shēn',
      meaning: 'whole body (全身发抖 = trembling all over)',
      solution: {
        method: '"___发抖"前面需要一个表示"身体哪个部位/范围"的名词。',
        steps: [
          '「全身」（quánshēn，whole body）+ 发抖 = "全身发抖"，表示整个身体都在颤抖，常用来描写人因为冷、害怕或生病而颤动。',
          '其余词语跟"发抖"组合都不能组成有意义的词语。',
        ],
        tip: '"全身 + 发抖/发热/无力"常用来描写人因为冷、紧张或生病时的身体反应。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_015',
      type: 'MCQ',
      q: '（　　）整齐',
      options: ['全身', '安静', '废物', '按照', '愿望', '收拾'],
      answer: 5,
      pinyin: 'shōu shi',
      meaning: 'to tidy up (收拾整齐 = to tidy up)',
      solution: {
        method: '"___整齐"前面需要一个表示"整理物品"的动词。',
        steps: [
          '「收拾」（shōushi，to tidy up）+ 整齐 = "收拾整齐"，表示把东西整理得有条理，是常见搭配。',
          '其余词语跟"整齐"组合都不能组成有意义的词语。',
        ],
        tip: '"收拾整齐"常用来描写把房间、书包、桌子等整理得干净有条理。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_016',
      type: 'MCQ',
      q: '（　　）利用',
      options: ['全身', '安静', '废物', '按照', '愿望', '收拾'],
      answer: 2,
      pinyin: 'fèi wù',
      meaning: 'waste material (废物利用 = recycling/reuse of waste materials)',
      solution: {
        method: '"___利用"前面需要一个表示"被重新使用的东西"的名词。',
        steps: [
          '「废物」（fèiwù，waste material）+ "利用"= "废物利用"，是常用的环保词语，表示把没用的东西重新使用。',
          '其余词语跟"利用"组合都不能组成有意义的固定词语。',
        ],
        tip: '"废物利用"是描写"把垂手可得的废弃物品变成有用物品"的常用四字词语，跟环保主题密切相关。',
      },
    },
  ],
};

// =====================================================================================
// 五、改写句子 + 扩写句子 (JuZi) - 4题8分
// A组：用括号里的词语，把两个句子改写成一个句子。
// B组：用括号里的词语，扩写句子。
// =====================================================================================

const q17: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_017',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'A组：请用括号里的词语，把两个句子改写成一个句子。',
  q: '我打开家门。\n客人走了进来。（一……就……）',
  answer: '我一打开家门，客人就走了进来。',
  pinyin: 'yī ... jiù ...',
  meaning: '"一...，就..." = as soon as... then...',
  solution: {
    method:
      '「一...，就...」表示"前一个动作刚发生，后一个动作马上就跟着发生"。「一」放在第一个分句的主语之后，「就」放在第二个分句的主语之后。',
    steps: [
      '把「一」放在第一句主语之后："我一打开家门"。',
      '把「就」放在第二句主语之后："客人就走了进来"。',
      '合并：「我一打开家门，客人就走了进来。」',
    ],
    tip: '「一...，就...」强调两件事之间几乎没有时间差，常用来描写"一件事刚发生，另一件事立刻跟着发生"。',
  },
};

const q18: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_018',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'A组：请用括号里的词语，把两个句子改写成一个句子。',
  q: '小安喜欢读故事书。\n小安不喜欢去图书馆借书。（却）',
  answer: '小安喜欢读故事书，却不喜欢去图书馆借书。',
  pinyin: 'què',
  meaning: '"却" = but / yet (turning-point connector)',
  solution: {
    method:
      '「却」用来连接两个意思相反或有转折的句子，表示"前面是A，但后面却是相反的B"。改写时要去掉重复的主语（小安）。',
    steps: [
      '找出两句的共同主语：两句都是"小安"，合并后只需保留一次。',
      '前一句保留原意："小安喜欢读故事书"。',
      '后一句去掉主语，用「却」连接："却不喜欢去图书馆借书"。',
      '合并：「小安喜欢读故事书，却不喜欢去图书馆借书。」',
    ],
    tip: '「却」前后的内容通常是相反或对比的（喜欢读故事书 vs 不喜欢去图书馆借书），写完后读一读，确认句子表达了"转折"的语气。',
  },
};

const q19: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_019',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'B组：请用括号里的词语，扩写句子。',
  q: '为了能在听写中得满分，小明每天都复习。（认真地）',
  answer: '为了能在听写中得满分，小明每天都认真地复习。',
  pinyin: 'rèn zhēn de',
  meaning: '"认真地" = seriously; conscientiously',
  solution: {
    method:
      '「认真地」是副词，用来形容动作时的态度，通常放在主语之后、动词之前。',
    steps: [
      '找出主语"小明"和动词"复习"。',
      '把「认真地」放在主语和动词之间："小明认真地复习"。',
      '完整句子：「为了能在听写中得满分，小明每天都认真地复习。」',
    ],
    tip: '「认真地」常用来形容"专心、用心"地做某件事，例如"认真地听讲、认真地完成作业"。',
  },
};

const q20: SingleQuestion = {
  id: 'p3_zh_eoy_tn24_020',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: 'B组：请用括号里的词语，扩写句子。',
  q: '爷爷送了一份生日礼物给弟弟。（特别的）',
  answer: '爷爷送了一份特别的生日礼物给弟弟。',
  pinyin: 'tè bié de',
  meaning: '"特别的" = special',
  solution: {
    method:
      '「特别的」是形容词，用来修饰名词，通常放在被修饰的名词之前。',
    steps: [
      '找出句子中要被修饰的名词"生日礼物"。',
      '把「特别的」放在"生日礼物"前面："一份特别的生日礼物"。',
      '完整句子：「爷爷送了一份特别的生日礼物给弟弟。」',
    ],
    tip: '形容词扩写句子时，通常把形容词直接放在它要修饰的名词前面，"一份 + 特别的 + 名词"是常见的描写句式。',
  },
};

// =====================================================================================
// 六、短文填空 (TianKong) - 4题4分
// =====================================================================================

const tianKongSet: SetQuestion = {
  id: 'p3_zh_eoy_tn24_set2',
  topic: 'TianKong',
  difficulty: 'core',
  setLabel: 'Tao Nan 2024 EOY Paper 2 - 六、短文填空',
  passage:
    '一天，妈妈在厨房里做饭。她对正在玩游戏的小明说："小明，你去___(Q21)___买些鸡蛋回来。家里没有鸡蛋了。"\n\n小明听了，心想：我___(Q22)___帮妈妈的忙，可是这个游戏太好玩了，我想再玩一会儿。于是，他对妈妈说："我还在玩游戏，等一下才去买。"妈妈听了，___(Q23)___自己去买鸡蛋。\n\n过了好久，小明玩完了游戏，才想起妈妈叫他去买鸡蛋。他立刻走进厨房，___(Q24)___妈妈做好了午饭。看着桌上炒好的鸡蛋，小明不好意思地低下了头。',
  wordBank: ['应该', '请求', '虽然', '只好', '超市', '发现'],
  questions: [
    {
      id: 'p3_zh_eoy_tn24_021',
      type: 'MCQ',
      q: '"小明，你去___(Q21)___买些鸡蛋回来。家里没有鸡蛋了。"',
      options: ['应该', '请求', '虽然', '只好', '超市', '发现'],
      answer: 4,
      pinyin: 'chāo shì',
      meaning: 'supermarket',
      solution: {
        method: '妈妈要小明去买鸡蛋——要选出一个表示"可以买到鸡蛋的地方"的名词。',
        steps: [
          '「超市」（chāoshì，supermarket）是可以买到鸡蛋等食品的地方，"你去超市买些鸡蛋回来"意思自然。',
          '"应该、请求、虽然、只好、发现"都不是地点名词，放进句子里都讲不通。',
        ],
        tip: '"去 + 地点（超市、市场、商店）+ 买..."是描写购物时常用的句式。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_022',
      type: 'MCQ',
      q: '小明听了，心想：我___(Q22)___帮妈妈的忙，可是这个游戏太好玩了，我想再玩一会儿。',
      options: ['应该', '请求', '虽然', '只好', '超市', '发现'],
      answer: 0,
      pinyin: 'yīng gāi',
      meaning: 'should; ought to',
      solution: {
        method:
          '小明心里知道自己"理应"去帮妈妈，但又想多玩一会儿游戏——要选出表示"理应做某事"的词语。',
        steps: [
          '「应该」（yīnggāi，should）+ 帮妈妈的忙 = "应该帮妈妈的忙"，表示小明知道这是他应该做的事，但还是想再玩一会儿，前后形成了"明知该做却拖延"的心理冲突，意思自然。',
          '"请求、虽然、只好、超市、发现"放进句子里都不能表达"理应做某事"这个意思。',
        ],
        tip: '"我应该..."常用来描写一个人"知道自己理应做某事"的心理活动，常与"但是/可是"搭配，表示明知该做却没有马上去做。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_023',
      type: 'MCQ',
      q: '于是，他对妈妈说："我还在玩游戏，等一下才去买。"妈妈听了，___(Q23)___自己去买鸡蛋。',
      options: ['应该', '请求', '虽然', '只好', '超市', '发现'],
      answer: 3,
      pinyin: 'zhǐ hǎo',
      meaning: 'to have no choice but to; to be forced to',
      solution: {
        method:
          '妈妈本来是要小明去买鸡蛋的，但小明说要"等一下"——要选出表示"没有别的办法，被迫这样做"的词语。',
        steps: [
          '「只好」（zhǐhǎo，to have no choice but to）+ 自己去买鸡蛋 = "只好自己去买鸡蛋"，表示妈妈因为等不到小明，没有别的办法，只能自己去买，意思自然。',
          '"应该、请求、虽然、超市、发现"放进句子里都不能表达"无奈、被迫"的意思。',
        ],
        tip: '"只好..."常用来描写"原本希望由别人做，但因为对方没有做，自己被迫去做"这种无奈的情况。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_024',
      type: 'MCQ',
      q: '他立刻走进厨房，___(Q24)___妈妈做好了午饭。看着桌上炒好的鸡蛋，小明不好意思地低下了头。',
      options: ['应该', '请求', '虽然', '只好', '超市', '发现'],
      answer: 5,
      pinyin: 'fā xiàn',
      meaning: 'to discover; to find out',
      solution: {
        method: '小明走进厨房后看到了一件事（妈妈已经做好午饭），要选出表示"看到/注意到某件事"的动词。',
        steps: [
          '「发现」（fāxiàn，to discover）+ 妈妈做好了午饭 = "发现妈妈做好了午饭"，表示小明走进厨房后注意到这件事，意思自然。',
          '"应该、请求、虽然、只好、超市"放进句子里都不能表达"看到/注意到某件事"的意思。',
        ],
        tip: '"走进...，发现..."是描写"进入某个地方后，注意到一件意料之外或重要的事情"时常用的句式。',
      },
    },
  ],
};

// =====================================================================================
// 七、阅读理解 (YueReadMCQ) - 4题8分
// =====================================================================================

const yueReadMcqSet: SetQuestion = {
  id: 'p3_zh_eoy_tn24_set3',
  topic: 'YueReadMCQ',
  difficulty: 'core',
  setLabel: 'Tao Nan 2024 EOY Paper 2 - 七、阅读理解',
  passage:
    '一天下午，小猫吃完了午餐，便往森林走去。\n\n半路上，小猫碰到了小白兔。小白兔看到小猫拿着雨伞累得满头大汗，好奇地问："小猫，现在是晴天，你怎么不把伞收好呀？伞那么重，你举着它不累吗？"\n\n小猫回答："这把伞坏了，我不能把它收起来。我很想把雨伞丢掉，可以晒一晒太阳。但是，如果等一会儿下雨怎么办呢？"\n\n小白兔想了想，说："这太简单了！你只要在雨伞上挖几个洞，太阳不就可以照在你身上了吗？"小猫听了，兴奋地说："你说得对，谢谢你！"说完，它就从书包里拿起剪刀在雨伞上剪了几个洞。\n\n剪完后，阳光从雨伞的洞里照了进来。小猫终于晒到了太阳，它高兴地和小白兔说"再见"，然后满意地唱着歌走回家。\n\n过了一会儿，太阳躲到云朵里。天突然黑了，接着又刮起了大风，还开始打雷闪电，小猫感到很害怕。不久，下起了大雨。这时，小猫看到雨水都从伞的洞里流了进来，它一下子就被雨淋湿了，连忙向家跑去。',
  questions: [
    {
      id: 'p3_zh_eoy_tn24_025',
      type: 'MCQ',
      q: '为什么小白兔让小猫把雨伞收好？',
      options: [
        '因为雨伞很湿。',
        '因为雨伞坏了。',
        '因为小猫看上去很累。',
        '因为小猫想要晒太阳。',
      ],
      answer: 2,
      pinyin: 'lèi',
      meaning: 'tired',
      solution: {
        method: '找出文中描写小白兔看到小猫时的样子，那就是小白兔提出建议的原因。',
        steps: [
          '第二段写道："小白兔看到小猫拿着雨伞累得满头大汗，好奇地问：‘...你怎么不把伞收好呀？...你举着它不累吗？’"',
          '小白兔是因为看到小猫拿着雨伞显得很疲累（满头大汗），才建议他把伞收起来，对应选项(3)。',
          '"雨伞很湿、雨伞坏了"是后面小猫自己说出来的情况，不是小白兔一开始提出建议的原因；"小猫想要晒太阳"也是小猫后来才说的想法。',
        ],
        tip: '"为什么...？"类问题的答案，通常紧跟在"提出建议/做出反应"的句子之前，留意人物当时"看到了什么"。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_026',
      type: 'MCQ',
      q: '小白兔想到了什么办法来帮小猫？',
      options: [
        '让小猫把雨伞丢掉。',
        '让小猫把雨伞举起来。',
        '让小猫买一把新的雨伞。',
        '让小猫在雨伞上剪几个洞。',
      ],
      answer: 3,
      pinyin: 'jiàn dòng',
      meaning: '"挖洞/剪洞" = to cut/dig a hole',
      solution: {
        method: '找出文中小白兔提出的具体建议。',
        steps: [
          '第四段写道，小白兔说："你只要在雨伞上挖几个洞，太阳不就可以照在你身上了吗？"',
          '这个建议正是"让小猫在雨伞上剪几个洞"，对应选项(4)。',
          '"丢掉雨伞、举起雨伞、买新雨伞"都不是小白兔提出的办法（"丢掉雨伞"是小猫自己原本的想法，但被自己否定了）。',
        ],
        tip: '"想到了什么办法"类问题，答案通常是文中人物用"你只要...就..."或"你可以..."这类句式提出的具体建议。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_027',
      type: 'MCQ',
      q: '小猫跑回家的原因是什么？',
      options: [
        '它被大雨淋湿了。',
        '它害怕打雷闪电。',
        '它看到天突然黑了。',
        '它听说要刮大风了。',
      ],
      answer: 0,
      pinyin: 'lín shī',
      meaning: '"淋湿" = to get drenched/soaked',
      solution: {
        method: '找出文章最后一句，描写小猫"连忙向家跑去"之前发生的事。',
        steps: [
          '最后一段写道："小猫看到雨水都从伞的洞里流了进来，它一下子就被雨淋湿了，连忙向家跑去。"',
          '"被雨淋湿了"是小猫"连忙向家跑去"的直接原因，对应选项(1)。',
          '"害怕打雷闪电、天突然黑了、刮大风"都是在小猫被淋湿之前发生的天气变化，是背景描写，不是它跑回家的直接原因。',
        ],
        tip: '"原因"类问题的答案，通常紧跟在"结果句"（这里是"连忙向家跑去"）的前面，留意"一下子就..."这类表示直接因果关系的句子。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_028',
      type: 'MCQ',
      q: '以下哪一个句子是正确的？',
      options: [
        '小猫边唱歌边走回家。',
        '小猫没吃午餐就出门了。',
        '小白兔从书包里拿出剪刀。',
        '小白兔不想和小猫说"再见"。',
      ],
      answer: 0,
      pinyin: 'biān ... biān ...',
      meaning: '"边...边..." = while doing one thing, also doing another',
      solution: {
        method: '逐一对照原文，找出与原文内容相符的句子。',
        steps: [
          '第五段写道："它高兴地和小白兔说‘再见’，然后满意地唱着歌走回家"，这跟选项(1)"小猫边唱歌边走回家"意思一致，是正确的。',
          '第一段说"小猫吃完了午餐，便往森林走去"，所以"没吃午餐就出门"不正确。',
          '原文是"小猫"自己从书包里拿出剪刀，不是"小白兔"，所以选项(3)不正确。',
          '小猫"高兴地和小白兔说‘再见’"，说明双方是互相道别的，"小白兔不想说再见"在原文中没有依据。',
        ],
        tip: '"以下哪一个句子是正确的"题型要逐句核对原文，特别留意人物的动作主体（是"小猫"还是"小白兔"做的）。',
      },
    },
  ],
};

// =====================================================================================
// 八、理解问答 (YueReadOpen) - 5题9分 (Q29 含 a/b 两小题，共6个子题)
// =====================================================================================

const yueReadOpenSet: SetQuestion = {
  id: 'p3_zh_eoy_tn24_set4',
  topic: 'YueReadOpen',
  difficulty: 'stretch',
  setLabel: 'Tao Nan 2024 EOY Paper 2 - 八、理解问答',
  passage:
    '一个年轻人跟着老师学跳舞，他想赶快把舞练好，但总是学不好。\n\n一天练完舞后，年轻人心情不好，便出门散步。他在路边看到一位老奶奶在做饼。她做好饼后轻轻一抛，那张饼像有眼睛一样，刚好掉在了其他做好的饼上。\n\n年轻人看了，感到非常吃惊，走上前问道："老奶奶，您怎么扔得这么准啊？"老奶奶笑着说："我告诉自己不要着急，慢慢来，练习久了，就越扔越准了。"\n\n听了老奶奶的话，年轻人明白了，说："原来是这样。我学跳舞的时候太着急，没有静下心来好好练习，才会练不好。我要多多向您学习。"',
  questions: [
    {
      id: 'p3_zh_eoy_tn24_029a',
      type: 'OpenEnded',
      q: '文中形容"希望在短时间完成事情"的词语是：______ （1分）',
      answer: '赶快',
      pinyin: 'gǎn kuài',
      meaning: 'to hurry; to do something quickly',
      solution: {
        method: '在原文中找出一个表示"想要尽快做完某件事"的词语。',
        steps: [
          '第一段写道："一个年轻人跟着老师学跳舞，他想赶快把舞练好，但总是学不好。"',
          '「赶快」（gǎnkuài）的意思是"尽快、迅速地"，正好符合"希望在短时间完成事情"的意思。',
        ],
        tip: '做"找出意思相同的词语"题时，先在脑中想出近义词（如"快点、马上"），再到原文中找出对应的词。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_029b',
      type: 'OpenEnded',
      q: '文中形容"知道"的词语是：______ （1分）',
      answer: '明白',
      pinyin: 'míng bai',
      meaning: 'to understand; to realise',
      solution: {
        method: '在原文中找出一个表示"理解、知道了某件事"的词语。',
        steps: [
          '最后一段写道："听了老奶奶的话，年轻人明白了，说：‘原来是这样。...’"',
          '「明白」（míngbai，to understand/realise）的意思就是"知道、懂得"，符合题目要求。',
        ],
        tip: '「明白」常用来描写一个人"听了别人的话之后，理解了某个道理"，常与"原来..."搭配出现。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_030',
      type: 'OpenEnded',
      q: '年轻人为什么出门散步？（1分）',
      answer: '因为年轻人练完舞后心情不好，所以出门散步。', // 官方答案
      pinyin: 'xīn qíng',
      meaning: 'mood; feelings',
      solution: {
        method: '答案在第二段第一句，直接说明了年轻人出门散步的原因。',
        steps: [
          '第二段写道："一天练完舞后，年轻人心情不好，便出门散步。"',
          '"练完舞后心情不好"正是年轻人出门散步的原因，把它改写成"因为...所以..."的句子作答即可。',
        ],
        tip: '"为什么...？"类问题的答案，通常可以直接在原文中找到说明原因的句子，改写成"因为...所以..."的形式。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_031',
      type: 'OpenEnded',
      q: '什么事让年轻人感到吃惊？（2分）',
      answer:
        '老奶奶做好饼后轻轻一抛，那张饼就像长了眼睛一样，刚好掉在其他做好的饼上，这件事让年轻人感到吃惊。', // 官方答案
      pinyin: 'chī jīng',
      meaning: 'shocked; surprised',
      solution: {
        method:
          '找出第二段中描写"老奶奶做饼"的具体情景，这件事就是让年轻人"非常吃惊"的原因。',
        steps: [
          '第二段写道："她做好饼后轻轻一抛，那张饼像有眼睛一样，刚好掉在了其他做好的饼上。"',
          '紧接着第三段写道："年轻人看了，感到非常吃惊"，说明上面这件事正是让他吃惊的原因。',
          '把这件事写成完整的句子作答：老奶奶做好饼后轻轻一抛，那张饼就像长了眼睛一样，刚好掉在其他做好的饼上，这件事让年轻人感到吃惊。',
        ],
        tip: '"什么事让...感到...？"类问题的答案，通常是紧跟在情绪描写句（这里是"感到非常吃惊"）之前的那个具体事件，2分题需要写出完整的事件细节。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_032',
      type: 'OpenEnded',
      q: '老奶奶的饼为什么会越扔越准？（2分）',
      answer:
        '因为老奶奶①告诉自己，不要着急，慢慢练，②练习久了所以饼会越扔越准。', // 官方答案
      pinyin: 'liàn xí',
      meaning: 'to practise',
      solution: {
        method: '找出第三段中老奶奶自己说明"扔得准"的原因。',
        steps: [
          '第三段写道，老奶奶笑着说："我告诉自己不要着急，慢慢来，练习久了，就越扔越准了。"',
          '第一点（1分）：老奶奶告诉自己不要着急、慢慢来。',
          '第二点（1分）：因为练习了很久，所以越扔越准。',
          '把这两点合并写成完整的句子作答。',
        ],
        tip: '2分的"为什么...？"题目通常需要写出"心态/态度"和"结果/过程"两个要点，只写一点可能只拿到部分分数。',
      },
    },
    {
      id: 'p3_zh_eoy_tn24_033',
      type: 'OpenEnded',
      q: '你认为年轻人以后会怎么做？（2分）',
      answer:
        '我认为年轻人以后会①向老奶奶学习，②练习跳舞时不会心急，会静下心来好好练习。（参考答案，言之有理即可）', // 官方答案
      pinyin: 'jìng xià xīn lái',
      meaning: '"静下心来" = to calm down and focus',
      solution: {
        method:
          '这是开放性问题，要根据年轻人在文章最后说的话（"我要多多向您学习"），推测他以后的行为会有什么改变。',
        steps: [
          '最后一段写道：年轻人说："我学跳舞的时候太着急，没有静下心来好好练习，才会练不好。我要多多向您学习。"',
          '根据这句话，可以推测年轻人以后会：①向老奶奶学习（学习她"不着急、慢慢练"的态度）；②练习跳舞时不再心急，会静下心来好好练习。',
          '把这两点写成完整的句子作答。',
        ],
        tip: '"你认为...以后会怎么做？"类问题，答案要跟人物在文中说的话/想法一致，2分题通常需要写出两个相关的要点。',
      },
    },
  ],
};

// =====================================================================================
// Export
// =====================================================================================

const eoyTaoNan2024Paper2: EoyTaoNan2024Paper2Question[] = [
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  q10,
  q11,
  peiDuiSet,
  q17,
  q18,
  q19,
  q20,
  tianKongSet,
  yueReadMcqSet,
  yueReadOpenSet,
];

export default eoyTaoNan2024Paper2;
