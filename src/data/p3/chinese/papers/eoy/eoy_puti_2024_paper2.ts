// =====================================================================================
// 菩提学校 (Bodhi School) - 2024 P3 高级华文 年终考试 试卷二 (45分)
// Source: sgexam.com P3 Chinese EOY compilation, pp.163-179
// Sections covered: 辨字测验 / 词语选择 / 看图选词(KanTu, 连线题) / 词语搭配 /
//                    扩写句子+仿写句子(JuZi) / 组句成段(ZuJu) /
//                    阅读理解一(MCQ, 便条) / 阅读理解二(OpenEnded)
// 听力 (Listening) and 试卷一/看图写段 (Composition, pp.175-178) excluded
// per project rules.
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

export type EoyPutiPaper2Question = SingleQuestion | SetQuestion;

// =====================================================================================
// 一、辨字测验 (BianZi) - 5题5分
// =====================================================================================

const bianZiInstruction =
  '从所提供的选项中选出正确的答案，然后把代表它的号码（1、2、3或4）写在括号里。';

const q1: SingleQuestion = {
  id: 'p3_zh_eoy_pt_001',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '小丽弄______了我的故事书。',
  options: ['被', '皮', '破', '坡'],
  answer: 2,
  pinyin: 'pò',
  meaning: '"弄破" = to tear (something) by accident',
  solution: {
    method:
      '「被、皮、破、坡」字形相似（都含"皮"的部件），但只有一个字能跟"弄___了"组成常用词语。',
    steps: [
      '「破」（pò）+ "弄"= "弄破"，表示不小心把东西弄坏/撕坏，"小丽弄破了我的故事书"意思自然。',
      '「被（被子/被动）、皮（皮肤）、坡（斜坡）」放进"弄___了"都不能组成有意义的词语。',
    ],
    tip: '"弄破"常用来描写"不小心把书本、衣服、纸张等弄坏/撕破"的情况。',
  },
};

const q2: SingleQuestion = {
  id: 'p3_zh_eoy_pt_002',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '你只要______着马路走，就能到小明的家了。',
  options: ['清', '法', '沿', '洞'],
  answer: 2,
  pinyin: 'yán',
  meaning: '"沿着" = along',
  solution: {
    method:
      '「清、法、沿、洞」字形相似，要选出能跟"___着马路走"组成合理词组的字。',
    steps: [
      '「沿」（yán）+ "着马路"= "沿着马路"，表示顺着马路前进，"你只要沿着马路走，就能到小明的家了"意思自然。',
      '「清（清楚）、法（方法）、洞（洞穴）」放进"___着马路走"都不能组成有意义的词语。',
    ],
    tip: '"沿着 + 路线（马路、小路、河边）"是常见搭配，表示顺着某条路线前进。',
  },
};

const q3: SingleQuestion = {
  id: 'p3_zh_eoy_pt_003',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '弟弟长大后想当军人，保______国家。',
  options: ['味', '卫', '位', '尾'],
  answer: 1,
  pinyin: 'wèi',
  meaning: '"保卫" = to defend',
  solution: {
    method:
      '「味、卫、位、尾」读音相近（wèi），字形也相似，要根据"保___国家"这个词组来判断。',
    steps: [
      '「卫」（wèi）+ "保"= "保卫"，表示用武力保护，"保卫国家"是描写军人职责时常用的搭配。',
      '「味（气味）、位（位置）、尾（尾巴）」放进"保___国家"都不能组成有意义的词语。',
    ],
    tip: '"保卫国家/保卫家园"是描写军人、警察等职责时常用的搭配。',
  },
};

const q4: SingleQuestion = {
  id: 'p3_zh_eoy_pt_004',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '星期六，爸爸带我去公园______脚踏车。',
  options: ['齐', '棋', '淇', '骑'],
  answer: 3,
  pinyin: 'qí',
  meaning: '"骑" = to ride (骑脚踏车 = to ride a bicycle)',
  solution: {
    method:
      '「齐、棋、淇、骑」读音相近（qí），字形也相似，要根据"___脚踏车"这个词组来判断。',
    steps: [
      '「骑」（qí）+ "脚踏车"= "骑脚踏车"，是描写"乘坐并操控两轮交通工具"的常用动词，意思自然。',
      '「齐（整齐）、棋（下棋）、淇（地名用字，如牛车水的"淇"）」放进"___脚踏车"都不能组成有意义的词语。',
    ],
    tip: '「骑」字是「马」部，本义跟"骑马"有关，引申为"跨坐在交通工具上并操控它"，常见词语有"骑脚踏车、骑摩托车"。',
  },
};

const q5: SingleQuestion = {
  id: 'p3_zh_eoy_pt_005',
  topic: 'BianZi',
  difficulty: 'core',
  instruction: bianZiInstruction,
  q: '看到小丽帮助同学，老师向她______起大拇指。',
  options: ['竖', '束', '术', '数'],
  answer: 0,
  pinyin: 'shù',
  meaning: '"竖起大拇指" = to give a thumbs-up',
  solution: {
    method:
      '「竖、束、术、数」字形相似，要选出能跟"___起大拇指"组成合理词组的字。',
    steps: [
      '「竖」（shù）+ "起大拇指"= "竖起大拇指"，表示把大拇指立起来，是表示赞赏的常见手势，"老师向她竖起大拇指"意思自然。',
      '「束（一束花）、术（技术）、数（数字）」放进"___起大拇指"都不能组成有意义的词语。',
    ],
    tip: '"竖起大拇指"是表示"赞、好棒"的常见手势动作搭配，常用来描写老师/长辈对小孩的称赞。',
  },
};

// =====================================================================================
// 二、词语选择 (CiYu) - 4题4分
// =====================================================================================

const ciYuInstruction =
  '从所提供的选项中选出正确的答案，然后把代表它的号码（1、2、3或4）写在括号里。';

const q6: SingleQuestion = {
  id: 'p3_zh_eoy_pt_006',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '小华身体很______，很少生病。',
  options: ['特别', '高大', '强壮', '矮小'],
  answer: 2,
  pinyin: 'qiáng zhuàng',
  meaning: 'strong; sturdy',
  solution: {
    method:
      '"身体很___，很少生病"要选出能形容"健康有力、不容易生病"的形容词。',
    steps: [
      '「强壮」（qiángzhuàng，strong/sturdy）形容身体健康有力，"身体很强壮，很少生病"前后因果关系合理。',
      '「特别（special）、高大（tall and big）、矮小（short and small）」都不能直接表达"健康、不容易生病"的意思（高大/矮小描写的是体型，不是健康状况）。',
    ],
    tip: '"身体强壮"是描写"健康有力、不容易生病"的常见搭配。',
  },
};

const q7: SingleQuestion = {
  id: 'p3_zh_eoy_pt_007',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '我一看到弟弟跌倒，就______冲上前去扶他。',
  options: ['争取', '立刻', '出发', '一直'],
  answer: 1,
  pinyin: 'lì kè',
  meaning: 'immediately; at once',
  solution: {
    method:
      '"一看到弟弟跌倒，就___冲上前去扶他"要选出能表示"马上、毫不迟疑地行动"的词语。',
    steps: [
      '「立刻」（lìkè，immediately）+ 冲上前 = "立刻冲上前"，表示看到弟弟跌倒后马上做出反应，跟"一...就..."的句式呼应，意思自然。',
      '「争取（to strive for）、出发（to set off）、一直（continuously）」都不能准确表达"马上行动"的意思。',
    ],
    tip: '"一...就立刻..."强调"看到/听到某事后马上做出反应"，常用来描写关心、紧急的情景。',
  },
};

const q8: SingleQuestion = {
  id: 'p3_zh_eoy_pt_008',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '这次的作业很简单，因此他很快______了。',
  options: ['答应', '完成', '讨论', '认识'],
  answer: 1,
  pinyin: 'wán chéng',
  meaning: 'to complete; to finish',
  solution: {
    method:
      '"这次的作业很简单，因此他很快___了"要选出表示"把作业做完"的动词。',
    steps: [
      '「完成」（wánchéng，to complete）+ 了 = "完成了"，表示把作业做完，"作业很简单，因此他很快完成了"前后因果关系合理。',
      '「答应（to agree/promise）、讨论（to discuss）、认识（to know/recognise）」都不能表达"把作业做完"这个意思。',
    ],
    tip: '"作业简单 → 很快完成"是常见的因果描写，"完成"表示把一件事情做完。',
  },
};

const q9: SingleQuestion = {
  id: 'p3_zh_eoy_pt_009',
  topic: 'CiYu',
  difficulty: 'core',
  instruction: ciYuInstruction,
  q: '爸爸说今天会下雨，______下午就下起了大雨。',
  options: ['总是', '果然', '经常', '必须'],
  answer: 1,
  pinyin: 'guǒ rán',
  meaning: 'sure enough; as expected',
  solution: {
    method:
      '"爸爸说今天会下雨"是之前的预测，"___下午就下起了大雨"是后来发生的事实，要选出表示"跟预测的一样"的词语。',
    steps: [
      '「果然」（guǒrán，sure enough/as expected）+ 下午就下起了大雨 = "果然下午就下起了大雨"，表示事情跟爸爸预测的一样真的发生了，前后呼应。',
      '「总是（always）、经常（often）、必须（must）」都不能表达"跟之前预测的一样"这个意思。',
    ],
    tip: '"A说...，果然..."是常见的固定搭配，表示"事情跟之前说的/猜的一样发生了"。',
  },
};

// =====================================================================================
// 三、看图选词 (KanTu) - 4题4分
// =====================================================================================

const kanTuSet: SetQuestion = {
  id: 'p3_zh_eoy_pt_set1',
  topic: 'KanTu',
  difficulty: 'foundation',
  setLabel: 'Bodhi 2024 EOY Paper 2 - 三、看图选词',
  passage:
    '根据图画，选出适当的词语，然后把代表它的号码（1、2、3或4）写在括号里。（每个选项只可以用一次）\n\nQ10：图中两个小女孩面对面，举起手互相挥动，开心地打招呼。\nQ11：图中是一个有瓶盖、瓶身有横纹的塑料瓶子。\nQ12：图中是一只猫的脸，嘴边长着一根根的细毛。\nQ13：图中是一个带轮子、印有回收标志（三个箭头围成的循环图案）的垃圾箱。',
  wordBank: ['瓶子', '回收箱', '胡子', '打招呼'],
  questions: [
    {
      id: 'p3_zh_eoy_pt_010',
      type: 'MCQ',
      q: 'Q10：图中两个小女孩面对面，举起手互相挥动，她们在做什么？',
      options: ['瓶子', '回收箱', '胡子', '打招呼'],
      answer: 3,
      pinyin: 'dǎ zhāo hu',
      meaning: 'to greet; to say hello',
      solution: {
        method: '图中两个人都举起手向对方挥动，要选出能形容这个动作的词语。',
        steps: [
          '「打招呼」（dǎ zhāohu，to greet）是指人们见面时用言语或动作（如挥手）表示问候，图中两个小女孩互相挥手正是"打招呼"的动作。',
          '"瓶子、回收箱、胡子"都不能形容"互相挥手问候"这个动作，可以排除。',
        ],
        tip: '图中如果出现"两人互相挥手、点头、微笑"等动作，通常对应"打招呼"这个词语。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_011',
      type: 'MCQ',
      q: 'Q11：图中是一个有瓶盖、瓶身有横纹的塑料容器，这是什么？',
      options: ['瓶子', '回收箱', '胡子', '打招呼'],
      answer: 0,
      pinyin: 'píng zi',
      meaning: 'bottle',
      solution: {
        method: '图中物品是一个细长、有瓶盖的容器，要选出能描述这件物品的名词。',
        steps: [
          '「瓶子」（píngzi，bottle）是指用来装液体的细长容器，图中带瓶盖、瓶身有横纹的物品正是瓶子的样子。',
          '"回收箱、胡子、打招呼"都不能用来描述"一个塑料容器"，可以排除。',
        ],
        tip: '图中如果出现"细长、有瓶盖的容器"，通常对应"瓶子"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_012',
      type: 'MCQ',
      q: 'Q12：图中一只猫的脸上，嘴边长着一根根的细毛，这是什么？',
      options: ['瓶子', '回收箱', '胡子', '打招呼'],
      answer: 2,
      pinyin: 'hú zi',
      meaning: 'whiskers; beard',
      solution: {
        method: '图中猫的嘴边画着一根根细长的毛，要选出能形容这种"嘴边的细毛"的名词。',
        steps: [
          '「胡子」（húzi，whiskers/beard）是指嘴边长出来的细毛，人和某些动物（如猫）的嘴边都会有胡子。',
          '图中猫的嘴边正画着这种细毛，对应"胡子"。',
          '"瓶子、回收箱、打招呼"都不能用来描述"嘴边的细毛"，可以排除。',
        ],
        tip: '图中如果出现"动物嘴边一根根的细毛"，通常对应"胡子"这个词。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_013',
      type: 'MCQ',
      q: 'Q13：图中是一个带轮子、印有循环箭头标志的垃圾箱，这是什么？',
      options: ['瓶子', '回收箱', '胡子', '打招呼'],
      answer: 1,
      pinyin: 'huí shōu xiāng',
      meaning: 'recycling bin',
      solution: {
        method: '图中物品是一个印有"三个箭头围成的循环图案"的箱子，要选出能描述这种"用来回收物品的箱子"的名词。',
        steps: [
          '「回收箱」（huíshōuxiāng，recycling bin）是指专门用来收集可回收物品（如塑料瓶、纸张）的箱子，箱子上常印有循环箭头标志。',
          '图中箱子正印着这种标志，对应"回收箱"。',
          '"瓶子、胡子、打招呼"都不能用来描述"一个带回收标志的箱子"，可以排除。',
        ],
        tip: '图中如果出现"箱子上印有三个箭头围成的循环图案"，通常对应"回收箱"这个词，跟环保主题相关。',
      },
    },
  ],
};

// =====================================================================================
// 四、词语搭配 (PeiDui) - 5题5分
// =====================================================================================

const peiDuiSet: SetQuestion = {
  id: 'p3_zh_eoy_pt_set2',
  topic: 'PeiDui',
  difficulty: 'core',
  setLabel: 'Bodhi 2024 EOY Paper 2 - 四、词语搭配',
  passage:
    '从选项中选出一个适当的词语，把代表正确答案的号码（1-8）写在括号里。（每个选项只可以用一次）',
  wordBank: ['实现', '蚊虫', '原谅', '种族', '浪费', '冒出', '赶快', '散步'],
  questions: [
    {
      id: 'p3_zh_eoy_pt_014',
      type: 'MCQ',
      q: '出门（　　）',
      options: ['实现', '蚊虫', '原谅', '种族', '浪费', '冒出', '赶快', '散步'],
      answer: 7,
      pinyin: 'sàn bù',
      meaning: 'to go for a walk (出门散步 = to go out for a walk)',
      solution: {
        method: '"出门___"后面需要一个表示"出门后进行的活动"的词语。',
        steps: [
          '「散步」（sànbù，to take a walk）+ "出门"= "出门散步"，表示离开家到外面慢慢走走，是常见搭配。',
          '其余词语跟"出门"组合都不能组成有意义的词语。',
        ],
        tip: '"出门散步"是描写日常休闲活动时常用的搭配。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_015',
      type: 'MCQ',
      q: '（　　）愿望',
      options: ['实现', '蚊虫', '原谅', '种族', '浪费', '冒出', '赶快', '散步'],
      answer: 0,
      pinyin: 'shí xiàn',
      meaning: 'to fulfil (实现愿望 = to fulfil a wish)',
      solution: {
        method: '"___愿望"前面需要一个表示"让心里的想法成为现实"的动词。',
        steps: [
          '「实现」（shíxiàn，to fulfil/realise）+ 愿望 = "实现愿望"，是非常常见的固定搭配，表示心里的愿望最终达成了。',
          '其余词语跟"愿望"组合都不能组成有意义的词语。',
        ],
        tip: '"实现 + 梦想/愿望/计划"是常见搭配，表示原本只是想法的事情最终成为现实。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_016',
      type: 'MCQ',
      q: '多元（　　）',
      options: ['实现', '蚊虫', '原谅', '种族', '浪费', '冒出', '赶快', '散步'],
      answer: 3,
      pinyin: 'zhǒng zú',
      meaning: 'race; ethnicity (多元种族 = multi-racial)',
      solution: {
        method: '"多元___"后面需要一个表示"群体/民族"的名词。',
        steps: [
          '「种族」（zhǒngzú，race/ethnicity）+ "多元"= "多元种族"，是描写新加坡社会特点时常用的词语，表示由多个不同民族组成。',
          '其余词语跟"多元"组合都不能组成有意义的词语。',
        ],
        tip: '"多元种族"是描写新加坡社会的常用词语，常出现在介绍国家/社会特点的课文中。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_017',
      type: 'MCQ',
      q: '（　　）时间',
      options: ['实现', '蚊虫', '原谅', '种族', '浪费', '冒出', '赶快', '散步'],
      answer: 4,
      pinyin: 'làng fèi',
      meaning: 'to waste (浪费时间 = to waste time)',
      solution: {
        method: '"___时间"前面需要一个表示"白白用掉、没有好好利用"的动词。',
        steps: [
          '「浪费」（làngfèi，to waste）+ 时间 = "浪费时间"，表示没有好好利用时间，是非常常见的固定搭配。',
          '其余词语跟"时间"组合都不能组成有意义的词语。',
        ],
        tip: '"浪费 + 时间/食物/金钱"是常见搭配，表示没有好好利用某种资源。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_018',
      type: 'MCQ',
      q: '引来（　　）',
      options: ['实现', '蚊虫', '原谅', '种族', '浪费', '冒出', '赶快', '散步'],
      answer: 1,
      pinyin: 'wén chóng',
      meaning: 'mosquito; insect (引来蚊虫 = to attract mosquitoes)',
      solution: {
        method: '"引来___"后面需要一个表示"被吸引过来的小动物"的名词。',
        steps: [
          '「蚊虫」（wénchóng，mosquito/insect）+ "引来"= "引来蚊虫"，表示某种环境（如垃圾、积水）吸引蚊子昆虫聚集，是常见搭配。',
          '其余词语跟"引来"组合都不能组成有意义的词语。',
        ],
        tip: '"引来蚊虫"常用来描写"环境不卫生、容易招来蚊虫"的情况，跟环保/卫生主题相关。',
      },
    },
  ],
};

// =====================================================================================
// 五、(A) 扩写句子 + (B) 仿写句子 (JuZi) - 5题10分
// =====================================================================================

const kuoXieInstruction = '(A) 扩写句子：请把括号里的词语加在句子中适当的地方。';

const q19: SingleQuestion = {
  id: 'p3_zh_eoy_pt_019',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: kuoXieInstruction,
  q: '我把衣服放在床上。（轻轻地）',
  answer: '我轻轻地把衣服放在床上。',
  pinyin: 'qīng qīng de',
  meaning: '"轻轻地" = gently; softly',
  solution: {
    method:
      '「轻轻地」是副词，用来形容动作做得很轻、很温和，通常放在主语之后、动词/"把"字之前。',
    steps: [
      '找出主语"我"和要修饰的动作"把衣服放在床上"。',
      '把「轻轻地」放在主语和"把"字之间："我轻轻地把衣服放在床上"。',
      '完整句子：「我轻轻地把衣服放在床上。」',
    ],
    tip: '在"把"字句中，副词通常放在主语之后、"把"字之前，如"我轻轻地把门关上"。',
  },
};

const q20: SingleQuestion = {
  id: 'p3_zh_eoy_pt_020',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: '(A) 扩写句子：请用括号里的关联词，把两个句子改写成一个句子。',
  q: '妹妹每天练习写字。\n妹妹能把字写好。（只要……就……）',
  answer: '只要妹妹每天练习写字，就能把字写好。',
  pinyin: 'zhǐ yào ... jiù ...',
  meaning: '"只要...就..." = as long as... then...',
  solution: {
    method:
      '「只要...就...」是一组固定的关联词，表示"只要满足前面的条件，后面的事就会发生"。「只要」放在第一个分句前，「就」放在第二个分句前，去掉重复的主语。',
    steps: [
      '找出两句的共同主语"妹妹"，合并后只保留一次。',
      '把「只要」放在第一句开头："只要妹妹每天练习写字"。',
      '把「就」放在第二句开头，并去掉重复的主语："就能把字写好"。',
      '合并：「只要妹妹每天练习写字，就能把字写好。」',
    ],
    tip: '「只要...就...」表示一种"条件关系"：只要A发生，B就会发生，常用来描写"做到某件事就能换来某个结果"。',
  },
};

const q21: SingleQuestion = {
  id: 'p3_zh_eoy_pt_021',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: '(A) 扩写句子：请用括号里的关联词，把两个句子改写成一个句子。',
  q: '我回到家。\n小白猫向我跑过来。（一……就……）',
  answer: '我一回到家，小白猫就向我跑过来。',
  pinyin: 'yī ... jiù ...',
  meaning: '"一...，就..." = as soon as... then...',
  solution: {
    method:
      '「一...，就...」表示"前一个动作刚发生，后一个动作马上就跟着发生"。「一」放在第一个分句的主语之后，「就」放在第二个分句的主语之后。',
    steps: [
      '把「一」放在第一句主语之后："我一回到家"。',
      '把「就」放在第二句主语之后："小白猫就向我跑过来"。',
      '合并：「我一回到家，小白猫就向我跑过来。」',
    ],
    tip: '「一...，就...」强调两件事之间几乎没有时间差，常用来描写"一件事刚发生，另一件事立刻跟着发生"。',
  },
};

const q22: SingleQuestion = {
  id: 'p3_zh_eoy_pt_022',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: '(A) 扩写句子：请用括号里的关联词，把两个句子改写成一个句子。',
  q: '姐姐可以吃鸡饭。\n姐姐可以吃炒面。（……或者……）',
  answer: '姐姐可以吃鸡饭或者炒面。',
  pinyin: 'huò zhě',
  meaning: '"或者" = or',
  solution: {
    method:
      '「或者」用来连接两个可以选择的事物，表示"两者之中选一个都可以"。改写时要去掉重复的主语和谓语"姐姐可以吃"。',
    steps: [
      '找出两句的共同部分："姐姐可以吃"，合并后只保留一次。',
      '把两个不同的食物用「或者」连接："鸡饭或者炒面"。',
      '合并：「姐姐可以吃鸡饭或者炒面。」',
    ],
    tip: '「或者」常用来连接两个并列的选项，表示"任选其一都可以"，注意改写时要去掉重复的主语和动词，只保留一次。',
  },
};

const q23: SingleQuestion = {
  id: 'p3_zh_eoy_pt_023',
  topic: 'JuZi',
  difficulty: 'core',
  instruction: '(B) 把三个句子改写成一个句子。',
  q: '弟弟的眼睛大大的。\n弟弟的耳朵圆圆的。\n弟弟的嘴巴小小的。',
  answer: '弟弟的眼睛大大的，耳朵圆圆的，嘴巴小小的。',
  pinyin: 'dà dà de, yuán yuán de, xiǎo xiǎo de',
  meaning: '"大大的、圆圆的、小小的" = big, round, small (重叠形容词，描写外貌)',
  solution: {
    method:
      '三句话都是描写"弟弟的"某个身体部位，合并时只需保留一次"弟弟的"，后面用逗号把三个部位和形容词依次列出。',
    steps: [
      '找出三句的共同部分"弟弟的"，合并后只保留一次，放在句子开头。',
      '依次列出三个部位和它们的形容词："眼睛大大的"、"耳朵圆圆的"、"嘴巴小小的"，中间用逗号隔开。',
      '合并：「弟弟的眼睛大大的，耳朵圆圆的，嘴巴小小的。」',
    ],
    tip: '描写一个人外貌的多个部位时，常把"XX的"放在句子开头，后面用逗号列出"部位+形容词"，最后一项前可加"和"也可以不加，视句意流畅度而定。',
  },
};

// =====================================================================================
// 六、组句成段 (ZuJu) - 1题5分
// =====================================================================================

const zuJuSet: SetQuestion = {
  id: 'p3_zh_eoy_pt_set3',
  topic: 'ZuJu',
  difficulty: 'stretch',
  setLabel: 'Bodhi 2024 EOY Paper 2 - 六、组句成段',
  passage:
    '按先后顺序把下面的句子排一排。\n\n（　）到家后，他先冲凉才吃午饭。\n（　）等妈妈回来时，他折纸飞机，自己玩了起来。\n（1）放学后，小明自己走回家。\n（　）学完听写后，小明帮忙扫地、抹桌椅。\n（　）接着，他开始写作业和学听写。\n（　）妈妈回来后，不但看到小明把作业做完了，又帮她做家务，便夸他是个好孩子。',
  questions: [
    {
      id: 'p3_zh_eoy_pt_024a',
      type: 'OpenEnded',
      q: '到家后，他先冲凉才吃午饭。',
      answer: 2,
      pinyin: 'chōng liáng',
      meaning: '"冲凉" = to take a shower',
      solution: {
        method:
          '先理清整段故事的发展顺序：放学走回家 → 到家先冲凉吃午饭 → 写作业学听写 → 听写后帮忙做家务 → 等妈妈回来时玩纸飞机 → 妈妈回来夸奖。',
        steps: [
          '"放学后，小明自己走回家"（第1位，已给出）之后，下一件事就是"到家后"做的事。',
          '"到家后，他先冲凉才吃午饭"描写小明到家后的第一件事，紧接在"走回家"之后。',
          '因此这句话排在第2位。',
        ],
        tip: '"到家后，先...才..."这类句子通常紧跟在"放学/回家"这类句子之后，描写到家后的第一件事。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_024b',
      type: 'OpenEnded',
      q: '接着，他开始写作业和学听写。',
      answer: 3,
      pinyin: 'jiē zhe',
      meaning: '"接着" = then; next',
      solution: {
        method: '「接着」表示"紧接着前一件事之后发生的事"。',
        steps: [
          '"到家后先冲凉吃午饭"（第2位）之后，「接着」引出小明做的下一件事——写作业和学听写。',
          '这件事是后面"学完听写后帮忙做家务"（第4位）的前提，所以排在它之前。',
          '因此这句话排在第3位。',
        ],
        tip: '「接着」常用来连接两个先后发生的动作，是判断排序的重要线索词。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_024c',
      type: 'OpenEnded',
      q: '学完听写后，小明帮忙扫地、抹桌椅。',
      answer: 4,
      pinyin: 'xué wán',
      meaning: '"学完" = after finishing learning/practising',
      solution: {
        method: '这句话描写"学完听写之后"小明做的事，应该紧接在"写作业和学听写"之后。',
        steps: [
          '小明"开始写作业和学听写"（第3位）之后，完成了听写练习，接着帮忙做家务（扫地、抹桌椅）。',
          '"学完听写后"这个时间词明确表示这件事发生在"学听写"之后。',
          '因此这句话排在第4位。',
        ],
        tip: '"学完...后，..."这类句子明确点出"在某件事完成之后"，是判断排序的重要线索。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_024d',
      type: 'OpenEnded',
      q: '等妈妈回来时，他折纸飞机，自己玩了起来。',
      answer: 5,
      pinyin: 'děng ... shí',
      meaning: '"等...时" = while waiting for...',
      solution: {
        method: '这句话描写小明做完家务之后、妈妈还没回来之前的活动。',
        steps: [
          '小明帮忙做完家务（第4位）之后，在等妈妈回来的这段时间里，他折纸飞机自己玩。',
          '"等妈妈回来时"这个时间词表示这件事发生在"妈妈回来"（第6位）之前。',
          '因此这句话排在第5位。',
        ],
        tip: '"等...时，..."这类句子描写"在等待某件事发生之前的活动"，通常排在"那件事发生"之前。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_024e',
      type: 'OpenEnded',
      q: '妈妈回来后，不但看到小明把作业做完了，又帮她做家务，便夸他是个好孩子。',
      answer: 6,
      pinyin: 'kuā',
      meaning: '"夸" = to praise',
      solution: {
        method: '这句话描写"妈妈回来"之后发生的事，是整段故事的结尾。',
        steps: [
          '小明在等妈妈回来时玩纸飞机（第5位）之后，接下来就是"妈妈回来"。',
          '"妈妈回来后，...便夸他是个好孩子"是对小明整天表现（做完作业、做家务）的总结性评价，适合作为结尾。',
          '因此这句话排在第6位，是整段的最后一句。',
        ],
        tip: '故事类短文的最后一句通常是长辈/他人的评价或总结，常含有"夸、表扬、称赞"等词语。',
      },
    },
  ],
};

// =====================================================================================
// 七、阅读理解一 (YueReadMCQ) - 3题6分 (便条)
// =====================================================================================

const yueReadMcqSet: SetQuestion = {
  id: 'p3_zh_eoy_pt_set4',
  topic: 'YueReadMCQ',
  difficulty: 'core',
  setLabel: 'Bodhi 2024 EOY Paper 2 - 七、阅读理解一（便条）',
  passage:
    '小乐：\n\n我和邻居小爱一起去附近的公园做运动。之后，我会去美味蛋糕店买蛋糕，下午四点钟回家。妈妈叫你在家里做功课，不可以去同学的家玩。\n\n我们晚上要一起去奶奶家吃晚饭，因为今天是她的60岁生日。\n\n姐姐\n10月8日\n下午2点',
  questions: [
    {
      id: 'p3_zh_eoy_pt_025',
      type: 'MCQ',
      q: '谁和姐姐一起去公园做运动？',
      options: ['小乐', '小爱', '奶奶', '妈妈'],
      answer: 1,
      pinyin: 'lín jū',
      meaning: 'neighbour',
      solution: {
        method: '答案就在便条第一句，直接说明了和姐姐一起去公园的人是谁。',
        steps: [
          '便条写道："我和邻居小爱一起去附近的公园做运动。"',
          '"我"是写便条的人（姐姐），"邻居小爱"是和姐姐一起去公园的人，对应选项(2)。',
          '"小乐、奶奶、妈妈"在这句话中都没有被提到是和姐姐一起去公园的人。',
        ],
        tip: '阅读便条类文章时，要先弄清楚"我"是谁、便条是写给谁的，再根据这些线索回答问题。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_026',
      type: 'MCQ',
      q: '晚上，小乐一家要去哪里？',
      options: ['公园。', '蛋糕店。', '奶奶的家。', '同学的家。'],
      answer: 2,
      pinyin: 'shēng rì',
      meaning: 'birthday',
      solution: {
        method: '找出便条中描写"晚上"要做的事的句子。',
        steps: [
          '便条最后写道："我们晚上要一起去奶奶家吃晚饭，因为今天是她的60岁生日。"',
          '这句话直接说明晚上小乐一家要去"奶奶的家"，对应选项(3)。',
          '"公园、蛋糕店"是姐姐"之后"（下午）会去的地方，不是"晚上"的安排；"同学的家"是妈妈"不准"小乐去的地方。',
        ],
        tip: '阅读便条时要留意不同的时间词（之后、下午、晚上），把每个时间对应的活动分清楚，不要混淆。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_027',
      type: 'MCQ',
      q: '这张便条是谁写给谁的？',
      options: [
        '姐姐写给奶奶的。',
        '小乐写给妈妈的。',
        '小乐写给姐姐的。',
        '姐姐写给小乐的。',
      ],
      answer: 3,
      pinyin: 'biàn tiáo',
      meaning: 'note',
      solution: {
        method: '看便条的"开头称呼"和"结尾署名"，就能知道是谁写给谁的。',
        steps: [
          '便条开头写着"小乐："，说明这张便条是写给"小乐"看的。',
          '便条结尾署名"姐姐"，说明写便条的人是"姐姐"。',
          '所以这张便条是"姐姐写给小乐的"，对应选项(4)。',
        ],
        tip: '判断便条/书信"谁写给谁"，要看开头的称呼（收信人）和结尾的署名（写信人）。',
      },
    },
  ],
};

// =====================================================================================
// 八、阅读理解二 (YueReadOpen) - 3题6分
// =====================================================================================

const yueReadOpenSet: SetQuestion = {
  id: 'p3_zh_eoy_pt_set5',
  topic: 'YueReadOpen',
  difficulty: 'stretch',
  setLabel: 'Bodhi 2024 EOY Paper 2 - 八、阅读理解二',
  passage:
    '放学后，小丽背着书包到图书馆看书。\n\n到了图书馆，小丽很快地选了一本童话故事书，然后坐下来看。\n\n过了一会儿，小丽觉得肚子饿，她想：这本书真有趣，我不想离开。还好书包里有一包饼干，我可以拿出来吃！小丽一边吃，一边看书，饼干掉在了书上，把书弄脏了。班长看到小丽这样做，对她说："你不应该在图书馆里吃东西。"但小丽不听班长的话，又吃了一口饼干。于是，班长生气地去找老师。\n\n老师很快地走过来，看到小丽在吃东西，便走上前，说："小丽，你不应该在图书馆吃东西，这样做会把书本和桌子弄脏的。"小丽听了老师的话后，马上把饼干收进书包里。\n\n这时，图书管理员走了过来，说："图书馆是让同学们看书的地方，我们应该保持干净。"小丽听了，红着脸，低下头，把桌子清理干净。\n\n老师看到小丽知错能改，开心地笑了。',
  questions: [
    {
      id: 'p3_zh_eoy_pt_028',
      type: 'OpenEnded',
      q: '为什么小丽会在图书馆里吃饼干？（2分）',
      answer:
        '因为小丽觉得肚子饿，可是她觉得书很有趣，不想离开，还好书包里有一包饼干，就拿出来吃。', // 官方答案
      pinyin: 'dù zi è',
      meaning: '"肚子饿" = hungry',
      solution: {
        method:
          '答案在第三段，小丽心里想的内容包含了她吃饼干的两个原因，要写出两点才能拿满分。',
        steps: [
          '第一点（1分）：第三段写道，小丽"觉得肚子饿"，这是她想吃东西的直接原因。',
          '第二点（1分）：她心想"这本书真有趣，我不想离开"，所以没有去食堂，刚好"书包里有一包饼干"，就拿出来吃。',
          '把这两点合并写成完整的句子作答。',
        ],
        tip: '2分的"为什么...？"题目通常需要写出两个相关的原因/细节，只写一点可能只拿到部分分数。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_029a',
      type: 'OpenEnded',
      q: '根据文章内容，把答案写在表格里：听了班长的话后，小丽怎么做？（1分）',
      answer: '小丽不听班长的话，又吃了一口饼干。', // 官方答案: 吃一口饼干
      pinyin: 'bù tīng',
      meaning: '"不听" = did not listen to',
      solution: {
        method: '找出第三段中描写小丽听了班长的话之后的反应。',
        steps: [
          '第三段写道："班长看到小丽这样做，对她说：‘你不应该在图书馆里吃东西。’但小丽不听班长的话，又吃了一口饼干。"',
          '这句话直接说明了小丽听了班长的话之后的反应：不听劝告，继续吃饼干。',
        ],
        tip: '表格题要根据题目给定的"条件"（这里是"听了班长的话后"）在原文中找出对应的那一句反应。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_029b',
      type: 'OpenEnded',
      q: '根据文章内容，把答案写在表格里：听了老师的话后，小丽怎么做？（1分）',
      answer: '小丽马上把饼干收进书包里。', // 官方答案
      pinyin: 'mǎ shàng',
      meaning: '"马上" = immediately',
      solution: {
        method: '找出第四段中描写小丽听了老师的话之后的反应。',
        steps: [
          '第四段写道："小丽听了老师的话后，马上把饼干收进书包里。"',
          '这句话直接说明了小丽听了老师的话之后的反应：马上把饼干收起来，停止在图书馆吃东西。',
        ],
        tip: '对比"听了班长的话"和"听了老师的话"两种反应（不听 vs 马上听从），可以帮助理解小丽态度的变化过程。',
      },
    },
    {
      id: 'p3_zh_eoy_pt_030',
      type: 'OpenEnded',
      q: '你认为小丽是一个怎么样的孩子？从哪里可以看出？（2分）',
      answer:
        '我认为小丽是个知错能改的好孩子。从"小丽听了，红着脸，低下头，把桌子清理干净"可以看出。', // 官方答案
      pinyin: 'zhī cuò néng gǎi',
      meaning: '"知错能改" = able to admit and correct one\'s mistakes',
      solution: {
        method:
          '这是2分的"你认为...？从哪里可以看出？"题型，第一部分给出对人物的评价，第二部分要引用文中具体的行为作为证据。',
        steps: [
          '第一点（1分）：根据小丽前后态度的变化（一开始不听劝告，后来听了图书管理员的话后感到惭愧并清理桌子），可以给出评价，例如"知错能改的好孩子"。',
          '第二点（1分）：最后一段写道："小丽听了，红着脸，低下头，把桌子清理干净。"——这就是"知错能改"的具体表现，可以作为证据。',
          '把评价和证据合并成一句话作答。',
        ],
        tip: '"你认为...是个怎样的孩子？从哪里可以看出？"类问题，评价（如"知错能改、懂事"）要跟文中描写的具体行为相符，并把这些行为作为证据写出来。',
      },
    },
  ],
};

// =====================================================================================
// Export
// =====================================================================================

const eoyPutiPaper2: EoyPutiPaper2Question[] = [
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  kanTuSet,
  peiDuiSet,
  q19,
  q20,
  q21,
  q22,
  q23,
  zuJuSet,
  yueReadMcqSet,
  yueReadOpenSet,
];

export default eoyPutiPaper2;
