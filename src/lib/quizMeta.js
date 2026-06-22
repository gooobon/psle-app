// ── Quiz metadata, section definitions, and vocabulary data ───
// Centralised constants extracted from QuizEngine.js

export const SECTIONS = {
  GrammarMCQ:    { label:"Grammar MCQ",           icon:"📝", color:"#3B82F6", fixedCount:16, timed:45 },
  VocabMCQ:      { label:"Vocabulary MCQ",         icon:"📚", color:"#8B5CF6", fixedCount:16, timed:45 },
  GrammarCloze:  { label:"Grammar Cloze",          icon:"✏️", color:"#10B981", blanksPerSet:4, timed:60 },
  VocabCloze:    { label:"Vocabulary Cloze",       icon:"🔤", color:"#F59E0B", blanksPerSet:4, timed:60 },
  Editing:       { label:"Editing for Spelling",   icon:"🔍", color:"#F97316", blanksPerSet:4, timed:50 },
  Comprehension: { label:"Comprehension",          icon:"📖", color:"#EF4444", blanksPerSet:6, timed:90 },
};

export const SECTION_ORDER = ["GrammarMCQ","VocabMCQ","GrammarCloze","VocabCloze","Editing","Comprehension"];

export const ZH_SECTIONS = {
  BianZi:    { label:"辨字测验", sub:"Choose the correct character", icon:"🔤", color:"#3B82F6" },
  CiYu:      { label:"词语选择", sub:"Choose the correct word",      icon:"📝", color:"#8B5CF6" },
  KanTu:     { label:"看图选词", sub:"Match picture to word",        icon:"🖼️", color:"#10B981" },
  PeiDui:    { label:"词语搭配", sub:"Word collocation matching",    icon:"🔗", color:"#F59E0B" },
  JuZi:      { label:"扩写句子", sub:"Build sentences with tiles",   icon:"🧩", color:"#F97316" },
  ZuJu:      { label:"组句成段", sub:"Arrange sentences in order",   icon:"📋", color:"#EC4899" },
  YueRead:   { label:"阅读理解", sub:"Reading comprehension",        icon:"📖", color:"#EF4444" },
};

export const ZH_SECTION_ORDER = ["BianZi","CiYu","KanTu","PeiDui","JuZi","ZuJu","YueRead"];

// ── English Vocabulary Dictionary (P3 Level) ─────────────────
export const WORD_DICT = {
  // Grammar / Tense markers
  "yesterday":"(time word) the day before today",
  "tomorrow":"(time word) the day after today",
  "already":"before now; by this time",
  "finally":"at last; after a long time",
  "suddenly":"quickly and without warning",
  "usually":"most of the time; normally",
  "always":"every time; all the time",
  "never":"not at any time",
  "often":"many times; frequently",
  "sometimes":"now and then; not always",
  // Common P3 Vocabulary
  "delicious":"very tasty and good to eat",
  "enormous":"very, very big; huge",
  "exhausted":"very, very tired",
  "frightened":"very scared or afraid",
  "generous":"willing to give and share with others",
  "grateful":"feeling thankful for something",
  "magnificent":"very grand and beautiful",
  "nervous":"worried or a little scared about something",
  "patient":"able to wait calmly without getting upset",
  "proud":"happy and pleased about something good",
  "responsible":"in charge of something; able to be trusted",
  "tremendous":"very large or impressive",
  "unfortunate":"unlucky; not lucky",
  "brave":"not afraid; willing to face danger",
  "careful":"thinking about what you do to avoid mistakes",
  "clever":"good at learning and understanding things",
  "curious":"wanting to know or learn about things",
  "determined":"not giving up; decided firmly",
  "excited":"very happy and looking forward to something",
  "helpful":"giving help to others; useful",
  "honest":"telling the truth; not lying",
  "kind":"caring about others; nice and friendly",
  "lonely":"sad because you are alone",
  "miserable":"very unhappy and sad",
  "obedient":"doing what you are told; following rules",
  "polite":"having good manners; respectful",
  "quiet":"making little or no noise",
  "shy":"nervous or uncomfortable with other people",
  "silly":"not serious; funny in a foolish way",
  "timid":"shy and easily frightened",
  "upset":"unhappy or worried about something",
  "worried":"feeling nervous that something bad might happen",
  // Action words
  "collected":"gathered things together",
  "discovered":"found something new",
  "examined":"looked at carefully",
  "explained":"made something clear",
  "noticed":"saw or became aware of",
  "observed":"watched carefully",
  "prepared":"made ready",
  "rescued":"saved from danger",
  "struggled":"tried hard against difficulty",
  "wandered":"walked without a fixed direction",
  // Adjectives from comprehension
  "ancient":"very old; from long ago",
  "cosy":"comfortable and warm",
  "damp":"slightly wet",
  "distant":"far away",
  "familiar":"well known; seen or heard many times before",
  "fragrant":"having a nice, sweet smell",
  "gloomy":"dark and sad",
  "lively":"full of life and energy",
  "peaceful":"calm and quiet",
  "precious":"very valuable or important",
  "rough":"not smooth; uneven",
  "smooth":"flat and even; not rough",
  "stern":"strict and serious",
  "weary":"very tired",
  "witty":"clever and funny",
};

// ── Synonyms & Antonyms (P3 English) ─────────────────────────
export const SYN_ANT = {
  "faithful":{syn:["loyal","devoted"],ant:["disloyal","unfaithful"]},
  "delicious":{syn:["tasty","yummy"],ant:["awful","tasteless"]},
  "enormous":{syn:["huge","gigantic"],ant:["tiny","small"]},
  "exhausted":{syn:["tired","worn out"],ant:["energetic","fresh"]},
  "frightened":{syn:["scared","afraid"],ant:["brave","fearless"]},
  "generous":{syn:["kind","giving"],ant:["selfish","stingy"]},
  "grateful":{syn:["thankful"],ant:["ungrateful"]},
  "magnificent":{syn:["splendid","grand"],ant:["plain","ordinary"]},
  "nervous":{syn:["anxious","worried"],ant:["calm","relaxed"]},
  "patient":{syn:["calm","tolerant"],ant:["impatient"]},
  "proud":{syn:["pleased","delighted"],ant:["ashamed","guilty"]},
  "guilty":{syn:["ashamed","sorry"],ant:["innocent","proud"]},
  "brave":{syn:["courageous","fearless"],ant:["cowardly","timid"]},
  "careful":{syn:["cautious","attentive"],ant:["careless","reckless"]},
  "careless":{syn:["reckless","sloppy"],ant:["careful","cautious"]},
  "clever":{syn:["smart","bright"],ant:["foolish","slow"]},
  "curious":{syn:["inquisitive","eager"],ant:["uninterested","bored"]},
  "determined":{syn:["firm","resolute"],ant:["hesitant","unsure"]},
  "excited":{syn:["thrilled","eager"],ant:["bored","calm"]},
  "helpful":{syn:["useful","kind"],ant:["unhelpful","useless"]},
  "honest":{syn:["truthful","sincere"],ant:["dishonest","lying"]},
  "kind":{syn:["caring","gentle"],ant:["cruel","unkind"]},
  "lonely":{syn:["alone","isolated"],ant:["accompanied","popular"]},
  "miserable":{syn:["unhappy","sad"],ant:["happy","cheerful"]},
  "obedient":{syn:["well-behaved","dutiful"],ant:["naughty","disobedient"]},
  "polite":{syn:["courteous","well-mannered"],ant:["rude","impolite"]},
  "quiet":{syn:["silent","still"],ant:["noisy","loud"]},
  "noisy":{syn:["loud","rowdy"],ant:["quiet","silent"]},
  "shy":{syn:["timid","bashful"],ant:["confident","bold"]},
  "timid":{syn:["shy","fearful"],ant:["brave","bold"]},
  "upset":{syn:["distressed","unhappy"],ant:["pleased","calm"]},
  "worried":{syn:["anxious","concerned"],ant:["relaxed","carefree"]},
  "ancient":{syn:["old","aged"],ant:["modern","new"]},
  "cosy":{syn:["snug","comfortable"],ant:["uncomfortable","cold"]},
  "damp":{syn:["moist","wet"],ant:["dry"]},
  "distant":{syn:["faraway","remote"],ant:["near","close"]},
  "familiar":{syn:["well-known","common"],ant:["strange","unfamiliar"]},
  "fragrant":{syn:["sweet-smelling","scented"],ant:["smelly","stinky"]},
  "gloomy":{syn:["dark","dreary"],ant:["bright","cheerful"]},
  "lively":{syn:["energetic","active"],ant:["dull","lifeless"]},
  "peaceful":{syn:["calm","quiet"],ant:["noisy","chaotic"]},
  "precious":{syn:["valuable","treasured"],ant:["worthless"]},
  "rough":{syn:["uneven","coarse"],ant:["smooth","gentle"]},
  "smooth":{syn:["even","flat"],ant:["rough","bumpy"]},
  "stern":{syn:["strict","serious"],ant:["gentle","lenient"]},
  "weary":{syn:["tired","exhausted"],ant:["fresh","rested"]},
  "witty":{syn:["funny","clever"],ant:["dull","humourless"]},
  "disloyal":{syn:["unfaithful","treacherous"],ant:["loyal","faithful"]},
};

// ── Chinese character dictionary (P3, curated) ───────────────
export const ZH_CHAR_DICT = {
  "冷":{pinyin:"lěng",meaning:"cold",syn:"寒",ant:"热"},
  "热":{pinyin:"rè",meaning:"hot",syn:"烫",ant:"冷"},
  "大":{pinyin:"dà",meaning:"big",syn:"巨",ant:"小"},
  "小":{pinyin:"xiǎo",meaning:"small",syn:"微",ant:"大"},
  "高":{pinyin:"gāo",meaning:"tall / high",syn:"耸",ant:"矮"},
  "矮":{pinyin:"ǎi",meaning:"short (height)",ant:"高"},
  "快":{pinyin:"kuài",meaning:"fast",syn:"迅速",ant:"慢"},
  "慢":{pinyin:"màn",meaning:"slow",ant:"快"},
  "新":{pinyin:"xīn",meaning:"new",ant:"旧"},
  "旧":{pinyin:"jiù",meaning:"old (things)",ant:"新"},
  "多":{pinyin:"duō",meaning:"many",ant:"少"},
  "少":{pinyin:"shǎo",meaning:"few",ant:"多"},
  "开":{pinyin:"kāi",meaning:"open",ant:"关"},
  "关":{pinyin:"guān",meaning:"close",ant:"开"},
  "早":{pinyin:"zǎo",meaning:"early",ant:"晚"},
  "晚":{pinyin:"wǎn",meaning:"late / evening",ant:"早"},
  "哭":{pinyin:"kū",meaning:"cry",ant:"笑"},
  "笑":{pinyin:"xiào",meaning:"laugh / smile",ant:"哭"},
  "买":{pinyin:"mǎi",meaning:"buy",ant:"卖"},
  "卖":{pinyin:"mài",meaning:"sell",ant:"买"},
  "来":{pinyin:"lái",meaning:"come",ant:"去"},
  "去":{pinyin:"qù",meaning:"go",ant:"来"},
  "高兴":{pinyin:"gāo xìng",meaning:"happy",syn:"开心 / 快乐",ant:"难过 / 伤心"},
  "开心":{pinyin:"kāi xīn",meaning:"happy / joyful",syn:"高兴",ant:"难过"},
  "难过":{pinyin:"nán guò",meaning:"sad",syn:"伤心",ant:"高兴"},
  "伤心":{pinyin:"shāng xīn",meaning:"heartbroken / sad",syn:"难过",ant:"开心"},
  "认真":{pinyin:"rèn zhēn",meaning:"serious / careful",syn:"仔细",ant:"马虎"},
  "马虎":{pinyin:"mǎ hu",meaning:"careless",ant:"认真"},
  "干净":{pinyin:"gān jìng",meaning:"clean",ant:"肮脏"},
  "美丽":{pinyin:"měi lì",meaning:"beautiful",syn:"漂亮",ant:"丑陋"},
  "漂亮":{pinyin:"piào liang",meaning:"pretty",syn:"美丽",ant:"难看"},
  "勇敢":{pinyin:"yǒng gǎn",meaning:"brave",ant:"胆小"},
  "聪明":{pinyin:"cōng míng",meaning:"clever / smart",ant:"愚笨"},
  "鼓励":{pinyin:"gǔ lì",meaning:"encourage",syn:"激励",ant:"打击"},
  "帮助":{pinyin:"bāng zhù",meaning:"help",syn:"协助"},
  "喜欢":{pinyin:"xǐ huan",meaning:"like",syn:"喜爱",ant:"讨厌"},
};

// ── Shuffle utilities ─────────────────────────────────────────
export function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

export function seededShuffle(arr, seed){
  const a=[...arr]; let s=seed||1;
  const rnd=()=>{ s=(s*9301+49297)%233280; return s/233280; };
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
