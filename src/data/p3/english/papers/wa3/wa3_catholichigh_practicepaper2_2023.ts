// ============================================================
// CATHOLIC HIGH SCHOOL (PRIMARY) — Primary 3 English Language
// Practice Paper 2
// Source: P3_English_WA3.pdf (pages 119–133)
//
// Sections:
//   A — Grammar MCQ         (Q1–Q8,   8 × 1m)
//   B — Vocabulary MCQ      (Q9–Q14,  6 × 1m)
//   C — Grammar Cloze A–F   (Q15–Q18, 4 × 1m)
//   D — Grammar Cloze bracket (Q19–Q22, 4 × 1m)
//   E — Vocabulary Cloze    (Q23–Q25, 3 × 1m)
//   F — Editing / Spelling  (Q26–Q30, 5 × 1m)
//   G — Comprehension Cloze (Q31–Q34, 4 × 1m)
//   H — Comprehension OE    (Q35–Q42, 8m)
//
// Answer key confirmed from official key sheet (page 133)
// ============================================================

export type TopicType =
  | "GrammarMCQ"
  | "VocabMCQ"
  | "GrammarCloze"
  | "VocabCloze"
  | "Editing"
  | "SentenceCombining"
  | "VisualText"
  | "ComprehensionMCQ"
  | "ComprehensionOE"
  | "ComprehensionFIB";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export interface QuestionTypeA {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  stimulus?: string;
  question: string;
  options?: Record<string, string>;
  answer: string;
  solution: Solution;
}

export interface PassageSet {
  kind: "B";
  id: string;
  topic: TopicType;
  passageTitle?: string;
  passage: string;
  questions: SetQuestion[];
}

export interface SetQuestion {
  id: string;
  marks: number;
  question: string;
  options?: Record<string, string>;
  answer: string;
  solution: Solution;
}

export type Question = QuestionTypeA | PassageSet;

export interface PaperMeta {
  school: string;
  level: string;
  subject: string;
  paperCode: string;
  year: number;
  totalMarks: number;
  sections: string[];
}

// ════════════════════════════════════════════════════════════
// META
// ════════════════════════════════════════════════════════════
export const meta: PaperMeta = {
  school: "Catholic High School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "Practice Paper 2",
  year: 2023,
  totalMarks: 50,
  sections: [
    "Section A – Grammar MCQ (Q1–Q8, 8 × 1m)",
    "Section B – Vocabulary MCQ (Q9–Q14, 6 × 1m)",
    "Section C – Grammar Cloze A–F (Q15–Q18, 4 × 1m)",
    "Section D – Grammar Cloze Bracket (Q19–Q22, 4 × 1m)",
    "Section E – Vocabulary Cloze (Q23–Q25, 3 × 1m)",
    "Section F – Editing: Spelling (Q26–Q30, 5 × 1m)",
    "Section G – Comprehension Cloze (Q31–Q34, 4 × 1m)",
    "Section H – Comprehension Open-ended (Q35–Q42, 8m)",
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION A — Grammar MCQ  (Q1–Q8)
// Answer key: 1 4 4 1 4 4 2 1
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "CH23_A_Q01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Ali and his sister _______ to school every day.",
    options: {
      "1": "cycle",
      "2": "cycles",
      "3": "cycled",
      "4": "cycling",
    },
    answer: "1",
    solution: {
      method: "Subject-Verb Agreement — Plural Subject",
      steps: [
        "'Ali and his sister' = two people = plural subject.",
        "Simple present (routine — 'every day') with plural subject → base form of verb.",
        "'cycle' (base form) is used for plural subjects (I/you/we/they). ✓",
        "'cycles' (3rd person singular) is only for he/she/it.",
        "Answer: (1) cycle.",
      ],
      tip: "X and Y = plural (two people) → use base form verb (no -s): 'cycle', 'walk', 'play'.",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q02",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Jun Xian _______ a song during the school's upcoming concert this November.",
    options: {
      "1": "sing",
      "2": "sings",
      "3": "was singing",
      "4": "will be singing",
    },
    answer: "4",
    solution: {
      method: "Future Continuous Tense",
      steps: [
        "'this November' / 'upcoming concert' = a future planned event.",
        "Future continuous (will be + -ing) describes a planned/scheduled action at a future time. ✓",
        "'sing / sings' = present tense — wrong for upcoming future event.",
        "'was singing' = past continuous — contradicts 'upcoming'.",
        "Answer: (4) will be singing.",
      ],
      tip: "'Upcoming' + future time marker → future continuous: 'will be + -ing'.",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q03",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Helen and Hannah share a room. The room is _______.",
    options: {
      "1": "its",
      "2": "hers",
      "3": "ours",
      "4": "theirs",
    },
    answer: "4",
    solution: {
      method: "Possessive Pronouns",
      steps: [
        "Helen and Hannah = two people = 'they'. The room belongs to them.",
        "Possessive pronoun for 'they' = 'theirs'. ✓",
        "'Its' = belonging to it (animal/thing).",
        "'Hers' = belonging to her (one female).",
        "'Ours' = belonging to us (first person plural).",
        "Answer: (4) theirs.",
      ],
      tip: "Possessive pronouns: mine, yours, his, hers, its, ours, theirs. For two girls sharing = theirs.",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "After taking so much time to complete her art project, Alisha had _______ time left to do other work as it was time for bed.",
    options: {
      "1": "little",
      "2": "many",
      "3": "some",
      "4": "several",
    },
    answer: "1",
    solution: {
      method: "Quantifiers — Uncountable Noun (Time)",
      steps: [
        "'Time' is uncountable → use quantifiers for uncountable nouns.",
        "Context: she used so much time on the project → very little time remained.",
        "'Little' = a small amount of (uncountable). ✓",
        "'Many / several' = for countable nouns.",
        "'Some' = a moderate amount — doesn't convey the near-zero amount implied.",
        "Answer: (1) little.",
      ],
      tip: "Time/water/money = uncountable → little (small amount) / much (large amount). NOT few/many.",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "All the children _______ present for Uncle Lim's 80th birthday celebration last night.",
    options: {
      "1": "is",
      "2": "are",
      "3": "was",
      "4": "were",
    },
    answer: "4",
    solution: {
      method: "Past Tense Subject-Verb Agreement — Plural",
      steps: [
        "'Last night' → past tense.",
        "'All the children' = plural subject → plural past tense verb.",
        "'Were' = plural past tense of 'be'. ✓",
        "'Was' = singular past tense (he/she/it was).",
        "'Is / are' = present tense — wrong.",
        "Answer: (4) were.",
      ],
      tip: "All (children/students/pupils) = plural → were (past), are (present). Single person → was, is.",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Ken has been learning to play the piano _______ he was four years old. He will be taking his Grade 8 examination soon.",
    options: {
      "1": "if",
      "2": "so",
      "3": "from",
      "4": "since",
    },
    answer: "4",
    solution: {
      method: "Conjunctions — Duration from Past to Present",
      steps: [
        "'Has been learning' = present perfect continuous — ongoing from past to now.",
        "'Since' + starting point in the past = from that time until now. ✓",
        "'Since he was four years old' = from the age of four, continuously until now.",
        "'If' = conditional, 'so' = result, 'from' = would need 'from the age of four'.",
        "Answer: (4) since.",
      ],
      tip: "Present perfect continuous + 'since' + past point = has been doing X since [age/year].",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q07",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Look up there! _______ is Sheena\'s father performing a parachute jump for the National Day Parade," exclaimed Nasrin.',
    options: {
      "1": "This",
      "2": "That",
      "3": "These",
      "4": "Those",
    },
    answer: "2",
    solution: {
      method: "Demonstrative Pronouns — Distance + Singular",
      steps: [
        "Nasrin is pointing UP at someone performing a parachute jump — the person is far away.",
        "Singular (one person = Sheena's father) + far away → 'That'. ✓",
        "'This' = singular + near.",
        "'These / Those' = plural.",
        "Answer: (2) That.",
      ],
      tip: "That/those = far. This/these = near. Singular: this/that. Plural: these/those.",
    },
  },
  {
    kind: "A",
    id: "CH23_A_Q08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The car _______ off immediately when the traffic lights turned green.",
    options: {
      "1": "sped",
      "2": "speed",
      "3": "speeds",
      "4": "speeding",
    },
    answer: "1",
    solution: {
      method: "Irregular Past Tense",
      steps: [
        "'When the traffic lights turned green' is a past time clause.",
        "The car's action also happened in the past → simple past tense needed.",
        "'Sped' is the irregular past tense of 'speed'. ✓",
        "'Speed / speeds' = present tense.",
        "'Speeding' = present participle — needs auxiliary verb.",
        "Answer: (1) sped.",
      ],
      tip: "Irregular verb: speed → sped (past). Like 'feed → fed', 'bleed → bled'.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION B — Vocabulary MCQ  (Q9–Q14)
// Answer key: 3 3 4 2 4 3
// ════════════════════════════════════════════════════════════
const sectionB: QuestionTypeA[] = [
  {
    kind: "A",
    id: "CH23_B_Q09",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"Please _______ your shoes and keep them in the shoe cabinet," Mrs Lim told her guests politely.',
    options: {
      "1": "take on",
      "2": "take up",
      "3": "take off",
      "4": "take down",
    },
    answer: "3",
    solution: {
      method: "Phrasal Verbs — Take",
      steps: [
        "Guests are being asked to remove shoes and put them in the cabinet.",
        "'Take off' = to remove clothing/shoes/hat. ✓",
        "'Take on' = to accept responsibility / hire someone.",
        "'Take up' = to begin a hobby / to occupy space.",
        "'Take down' = to write down / to lower/dismantle.",
        "Answer: (3) take off.",
      ],
      tip: "'Take off' shoes = remove shoes. Also: take off (plane departs), take off (remove clothes).",
    },
  },
  {
    kind: "A",
    id: "CH23_B_Q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"You should _______ your right fist and place it on the left side of your chest while saying the pledge," the teacher reminded the pupils.',
    options: {
      "1": "grab",
      "2": "slam",
      "3": "clench",
      "4": "squeeze",
    },
    answer: "3",
    solution: {
      method: "Precise Verb Meaning",
      steps: [
        "Making a fist by curling fingers tightly inward before placing on chest.",
        "'Clench' = to close or squeeze tightly, especially of hands/fists/teeth. ✓",
        "'Grab' = to seize something quickly — not the same as making a fist.",
        "'Slam' = to strike/shut with force — wrong context.",
        "'Squeeze' = to press tightly, but 'squeeze a fist' is not natural.",
        "Answer: (3) clench.",
      ],
      tip: "'Clench a fist' is a fixed collocation — it means tighten your hand into a fist.",
    },
  },
  {
    kind: "A",
    id: "CH23_B_Q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My father bought a _______ of drawers to organise his study area.",
    options: {
      "1": "pack",
      "2": "flight",
      "3": "batch",
      "4": "chest",
    },
    answer: "4",
    solution: {
      method: "Collective Nouns / Compound Nouns",
      steps: [
        "A storage furniture piece with multiple drawers is specifically called a 'chest of drawers'. ✓",
        "'Pack of drawers' — not a standard expression.",
        "'Flight of drawers' — not standard (flight of stairs is, but not drawers).",
        "'Batch of drawers' — not standard.",
        "Answer: (4) chest.",
      ],
      tip: "Fixed expression: 'a CHEST of drawers' = a piece of furniture with multiple drawers for storing clothes.",
    },
  },
  {
    kind: "A",
    id: "CH23_B_Q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The _______ will be coming tomorrow to repair the burst water pipes.",
    options: {
      "1": "cobbler",
      "2": "plumber",
      "3": "electrician",
      "4": "technician",
    },
    answer: "2",
    solution: {
      method: "Occupations / Jobs Vocabulary",
      steps: [
        "Burst water pipes → water/plumbing problem.",
        "'Plumber' = a person who installs and repairs water pipes and plumbing systems. ✓",
        "'Cobbler' = repairs shoes.",
        "'Electrician' = works with electrical wiring, not water pipes.",
        "'Technician' = general technical worker — too vague for pipe repair.",
        "Answer: (2) plumber.",
      ],
      tip: "Jobs: plumber (water pipes), electrician (wiring), cobbler (shoes), carpenter (wood).",
    },
  },
  {
    kind: "A",
    id: "CH23_B_Q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "It was _______ of Mandy to give up her seat to the lady with an injured leg.",
    options: {
      "1": "diligent",
      "2": "grateful",
      "3": "responsible",
      "4": "considerate",
    },
    answer: "4",
    solution: {
      method: "Character Traits Vocabulary",
      steps: [
        "Mandy gave up her seat for someone in need (injured) — she was thoughtful of others' comfort.",
        "'Considerate' = thoughtful about the needs and feelings of other people. ✓",
        "'Diligent' = hardworking, persistent — not about giving seats.",
        "'Grateful' = feeling thankful — Mandy gave up a seat, she didn't receive something.",
        "'Responsible' = reliable, trustworthy — doesn't specifically describe this act of kindness.",
        "Answer: (4) considerate.",
      ],
      tip: "Considerate = thinking of others' feelings. Grateful = thankful. They are often confused!",
    },
  },
  {
    kind: "A",
    id: "CH23_B_Q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "All children are reminded to _______ their seat belts when they travel in school buses.",
    options: {
      "1": "bind",
      "2": "click",
      "3": "fasten",
      "4": "connect",
    },
    answer: "3",
    solution: {
      method: "Collocations — Seat Belts",
      steps: [
        "The action of securing a seat belt is described by a specific verb.",
        "'Fasten' = to attach securely; 'fasten seat belts' is the standard collocation. ✓",
        "'Bind' = to tie with rope/bandage — not used for seat belts.",
        "'Click' describes the sound, not the formal instruction.",
        "'Connect' = to join things — not the standard verb for seat belts.",
        "Answer: (3) fasten.",
      ],
      tip: "Fixed collocation: 'fasten your seat belt' — also seen on aeroplanes. 'Please fasten your seat belt.'",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION C — Grammar Cloze (A–F word bank)  (Q15–Q18)
// Answer key: Q15=F(up), Q16=C(for), Q17=B(among), Q18=D(into)
// Passage: Mae Carol Jemison — first African American female astronaut
// ════════════════════════════════════════════════════════════

const grammarClozeC = `
Mae Carol Jemison was born in 1956. When she was a child, she dreamt of travelling into space. She grew (15) ______ and became famous (16) ______ making that dream come true.

In school, Mae studied hard and did very well in all her subjects. She loved reading, especially (17) ______ the stars and studied how living things move about in space. In 1992, Mae was the first African American female to fly (18) ______ space. Today, she is a successful astronaut.

Word Box: (A) about  (B) among  (C) for  (D) into  (E) of  (F) up
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "CH23_C_GrammarCloze",
  topic: "GrammarCloze",
  passageTitle: "Grammar Cloze — Mae Carol Jemison (Q15–Q18)",
  passage: grammarClozeC,
  questions: [
    {
      id: "CH23_C_Q15",
      marks: 1,
      question: "Fill in blank (15): She grew (15) ______ and became famous…",
      options: { A: "about", B: "among", C: "for", D: "into", E: "of", F: "up" },
      answer: "F",
      solution: {
        method: "Grammar Cloze — Phrasal Verb",
        steps: [
          "'Grew up' = to develop from a child into an adult. ✓",
          "This is a fixed phrasal verb: grow + up = mature/become an adult.",
          "'Grew about / among / for / into / of' are not natural in this context.",
          "Answer: (F) up.",
        ],
        tip: "'Grow up' is a fixed phrasal verb meaning to become an adult. She grew up and achieved her dream.",
      },
    },
    {
      id: "CH23_C_Q16",
      marks: 1,
      question: "Fill in blank (16): …became famous (16) ______ making that dream come true.",
      options: { A: "about", B: "among", C: "for", D: "into", E: "of", F: "up" },
      answer: "C",
      solution: {
        method: "Grammar Cloze — Preposition Collocation",
        steps: [
          "'Famous for' = known/celebrated because of something. ✓",
          "Collocation: 'famous FOR [reason/achievement]'.",
          "'Famous about' is not standard English.",
          "Answer: (C) for.",
        ],
        tip: "'Famous for' is always followed by the reason for being famous: 'famous for singing / famous for winning'.",
      },
    },
    {
      id: "CH23_C_Q17",
      marks: 1,
      question: "Fill in blank (17): …especially (17) ______ the stars and studied how living things move about in space.",
      options: { A: "about", B: "among", C: "for", D: "into", E: "of", F: "up" },
      answer: "A",
      solution: {
        method: "Grammar Cloze — Preposition after 'reading'",
        steps: [
          "'She loved reading, especially (17) ______ the stars'.",
          "'Reading about' = reading on the topic of. ✓",
          "'About' follows 'read/reading' to indicate the topic: 'read about stars'.",
          "Answer: (A) about.",
        ],
        tip: "To introduce a topic after 'read/learn/know', use 'about': 'read about stars', 'know about space'.",
      },
    },
    {
      id: "CH23_C_Q18",
      marks: 1,
      question: "Fill in blank (18): …the first African American female to fly (18) ______ space.",
      options: { A: "about", B: "among", C: "for", D: "into", E: "of", F: "up" },
      answer: "D",
      solution: {
        method: "Grammar Cloze — Preposition of Movement",
        steps: [
          "'Fly into space' = to travel/move into space (entering space). ✓",
          "'Into' = movement from outside to inside.",
          "'In space' would be correct for being already there, but here she is flying (travelling) to enter space.",
          "Answer: (D) into.",
        ],
        tip: "'Into' = movement entering a place. 'In' = already inside. Fly INTO space (entering it).",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION D — Grammar Cloze (bracket) (Q19–Q22)
// Answer key: Q19=spend, Q20=use, Q21=is, Q22=stays
// Passage: Wombats
// ════════════════════════════════════════════════════════════

const grammarClozeD = `
Wombats look like bears but are related to koalas and kangaroos. Like kangaroos, wombats (19) [spend / spends] most of their time grazing. They (20) [use / uses] their rodent-like teeth and strong jaws to grip and tear food such as roots, shoots and even tree bark. The young of a wombat (21) [is / are] called a joey. After birth, it (22) [stay / stays] in the mother's pouch for about ten months. The pouch faces backwards to protect the joey from dirt.
`;

const sectionD: PassageSet = {
  kind: "B",
  id: "CH23_D_GrammarCloze",
  topic: "GrammarCloze",
  passageTitle: "Grammar Cloze — Wombats (Q19–Q22)",
  passage: grammarClozeD,
  questions: [
    {
      id: "CH23_D_Q19",
      marks: 1,
      question: "Choose the correct word in brackets (19): wombats [spend / spends] most of their time grazing.",
      options: { spend: "spend", spends: "spends" },
      answer: "spend",
      solution: {
        method: "Subject-Verb Agreement — Plural Subject",
        steps: [
          "Subject: 'wombats' = plural noun.",
          "Plural subject → base form verb (no -s): 'spend'. ✓",
          "'Spends' = 3rd person singular (he/she/it) — wrong for plural.",
          "Answer: spend.",
        ],
        tip: "Plural subjects (wombats, children, dogs) → base form verb: spend, run, eat.",
      },
    },
    {
      id: "CH23_D_Q20",
      marks: 1,
      question: "Choose the correct word in brackets (20): They [use / uses] their rodent-like teeth…",
      options: { use: "use", uses: "uses" },
      answer: "use",
      solution: {
        method: "Subject-Verb Agreement — 'They'",
        steps: [
          "'They' = plural third person pronoun.",
          "Plural → base form: 'use'. ✓",
          "'Uses' = only for he/she/it (singular).",
          "Answer: use.",
        ],
        tip: "They/we/you/I → base form verb. He/she/it → add -s or -es.",
      },
    },
    {
      id: "CH23_D_Q21",
      marks: 1,
      question: "Choose the correct word in brackets (21): The young of a wombat [is / are] called a joey.",
      options: { is: "is", are: "are" },
      answer: "is",
      solution: {
        method: "Subject-Verb Agreement — 'The young of a wombat'",
        steps: [
          "The subject: 'The young of a wombat' — this refers to a single young wombat (one joey).",
          "Singular subject → 'is'. ✓",
          "Note: 'young' here is a noun meaning 'offspring/baby' — and the context 'called A joey' confirms singular.",
          "Answer: is.",
        ],
        tip: "'The young of a wombat' = one offspring = singular. Compare: 'The young of wombats are...' (plural).",
      },
    },
    {
      id: "CH23_D_Q22",
      marks: 1,
      question: "Choose the correct word in brackets (22): …it [stay / stays] in the mother's pouch for about ten months.",
      options: { stay: "stay", stays: "stays" },
      answer: "stays",
      solution: {
        method: "Subject-Verb Agreement — 'It'",
        steps: [
          "'It' = singular third person pronoun (referring to the joey).",
          "Singular subject → add -s: 'stays'. ✓",
          "'Stay' is base form — correct for I/you/we/they, not 'it'.",
          "Answer: stays.",
        ],
        tip: "It/he/she → add -s to the verb: stays, runs, eats. Always.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION E — Vocabulary Cloze (Q23–Q25)
// Answer key: Q23=turns, Q24=untied, Q25=strong
// Passage: Four Brothers and a Bundle of Sticks
// ════════════════════════════════════════════════════════════

const vocabClozeE = `
There were four brothers who could not get along with one another. One day, after seeing them quarrel violently, Father tied a bundle of sticks and told them to take (23) ______ to break the sticks. One by one, each brother tried very hard, but no one was able to break a single stick.

Father then (24) ______ the bundle and gave each son one stick. They broke the sticks easily.

"See how (25) ______ the sticks were when they were put together. In the same way, as brothers, all of you should stay united," said Father. The brothers then understood and nodded.

"United we stand, divided we fall," said the eldest son.

Word Box: powerful | strong | tied | time | turns | untied
`;

const sectionE: PassageSet = {
  kind: "B",
  id: "CH23_E_VocabCloze",
  topic: "VocabCloze",
  passageTitle: "Vocabulary Cloze — Bundle of Sticks (Q23–Q25)",
  passage: vocabClozeE,
  questions: [
    {
      id: "CH23_E_Q23",
      marks: 1,
      question: "Fill in blank (23): …told them to take (23) ______ to break the sticks.",
      options: {
        powerful: "powerful", strong: "strong", tied: "tied",
        time: "time", turns: "turns", untied: "untied",
      },
      answer: "turns",
      solution: {
        method: "Vocabulary Cloze — Idiom",
        steps: [
          "'Take turns' = to do something alternately, one after another. ✓",
          "The brothers each tried one by one → they took turns.",
          "'Take time' is possible but 'one by one, each brother tried' confirms it's 'turns'.",
          "Answer: turns.",
        ],
        tip: "'Take turns' = do something in rotation, one at a time. Fixed expression.",
      },
    },
    {
      id: "CH23_E_Q24",
      marks: 1,
      question: "Fill in blank (24): Father then (24) ______ the bundle and gave each son one stick.",
      options: {
        powerful: "powerful", strong: "strong", tied: "tied",
        time: "time", turns: "turns", untied: "untied",
      },
      answer: "untied",
      solution: {
        method: "Vocabulary Cloze — Antonym of 'tied'",
        steps: [
          "The bundle was previously TIED. Father then separated it → he UNTIED it.",
          "'Untied' = opposite of tied, to loosen/undo a knot. ✓",
          "The passage says 'gave each son ONE stick' — confirming he separated the bundle.",
          "Answer: untied.",
        ],
        tip: "If something was tied, you 'untie' it. The prefix 'un-' reverses the action.",
      },
    },
    {
      id: "CH23_E_Q25",
      marks: 1,
      question: "Fill in blank (25): 'See how (25) ______ the sticks were when they were put together.'",
      options: {
        powerful: "powerful", strong: "strong", tied: "tied",
        time: "time", turns: "turns", untied: "untied",
      },
      answer: "strong",
      solution: {
        method: "Vocabulary Cloze — Context / Moral",
        steps: [
          "The sticks could not be broken when bundled together → they were strong/unbreakable.",
          "'Strong' = not easily broken, having great strength. ✓",
          "'Powerful' could work but 'strong' is the more natural word for sticks/materials.",
          "The moral is about unity = strength → 'strong' fits the context perfectly.",
          "Answer: strong.",
        ],
        tip: "The moral 'United we stand' = together we are STRONG. 'Strong' is the key word for this parable.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION F — Editing: Spelling  (Q26–Q30)
// Answer key: Q26=disappointed, Q27=arrived, Q28=panicking, Q29=worried, Q30=careless
// Passage: De Ming and the lost report card
// ════════════════════════════════════════════════════════════

const editingPassageF = `
De Ming was returning home in the bus. He held his report card and stared at his grades. Even though he knew his parents would be (26)[desappointed] DESAPPOINTED, he had to show it to them.

(27)[arived] ARIVED home, he realised that the report card was not in his (28)[paniking] bag! He must have left it on the bus! When he was PANIKING, his mother came home and saw the (29)[worryed] WORRYED look on his face. After finding out what had happened, De Ming's mother scolded him for being (30)[cairless] CAIRLESS. She told him to apologise and explain to his teacher the next day in school.
`;

const sectionF: QuestionTypeA[] = [
  {
    kind: "A",
    id: "CH23_F_Q26",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassageF,
    question: "Q26: The bold word 'desappointed' is misspelled. Write the correct spelling.",
    answer: "disappointed",
    solution: {
      method: "Spelling Correction",
      steps: [
        "Misspelled: 'desappointed'.",
        "Correct: d-i-s-a-p-p-o-i-n-t-e-d.",
        "Errors: (1) 'des-' should be 'dis-', (2) only ONE 'p' vs correct double-p: dis-AP-POINTED.",
        "Break down: dis + appoint + ed = disappointed.",
        "Answer: disappointed.",
      ],
      tip: "DIS-APPOINT-ED: prefix 'dis-' + verb 'appoint' + '-ed'. Double 'p': disAPPointed.",
    },
  },
  {
    kind: "A",
    id: "CH23_F_Q27",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassageF,
    question: "Q27: The bold word 'arived' is misspelled. Write the correct spelling.",
    answer: "arrived",
    solution: {
      method: "Spelling Correction",
      steps: [
        "Misspelled: 'arived'.",
        "Correct: a-r-r-i-v-e-d.",
        "Error: single 'r' should be double 'r': aRRived.",
        "Break down: ar + rive + d = arrived. Double-r after 'a'.",
        "Answer: arrived.",
      ],
      tip: "ARRIVED: double-r. Remember: 'arrive' → 'arrived'. Like 'arrange', 'arrest', 'arrow' — double-r pattern.",
    },
  },
  {
    kind: "A",
    id: "CH23_F_Q28",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassageF,
    question: "Q28: The bold word 'paniking' is misspelled. Write the correct spelling.",
    answer: "panicking",
    solution: {
      method: "Spelling Correction — Adding -ing to Words Ending in 'c'",
      steps: [
        "Misspelled: 'paniking'.",
        "Correct: p-a-n-i-c-k-i-n-g.",
        "Rule: when a word ends in 'c', add 'k' before '-ing' or '-ed' to keep the hard /k/ sound.",
        "panic → panicking (add 'k' before -ing). ✓",
        "Other examples: picnic → picnicking, mimic → mimicking.",
        "Answer: panicking.",
      ],
      tip: "C + K rule: words ending in 'c' add 'k' before vowel suffixes (-ing, -ed, -er): panic → panicking.",
    },
  },
  {
    kind: "A",
    id: "CH23_F_Q29",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassageF,
    question: "Q29: The bold word 'worryed' is misspelled. Write the correct spelling.",
    answer: "worried",
    solution: {
      method: "Spelling Correction — Y to I Rule",
      steps: [
        "Misspelled: 'worryed'.",
        "Correct: w-o-r-r-i-e-d.",
        "Rule: when a word ends in 'y' preceded by a consonant, change 'y' to 'i' before adding '-ed'.",
        "worry → worr(y→i) + ed = worried. ✓",
        "Answer: worried.",
      ],
      tip: "Y → I rule: when adding -ed to words ending in consonant + y, change y to i: worry→worried, carry→carried, hurry→hurried.",
    },
  },
  {
    kind: "A",
    id: "CH23_F_Q30",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassageF,
    question: "Q30: The bold word 'cairless' is misspelled. Write the correct spelling.",
    answer: "careless",
    solution: {
      method: "Spelling Correction",
      steps: [
        "Misspelled: 'cairless'.",
        "Correct: c-a-r-e-l-e-s-s.",
        "Error: 'cair-' should be 'care-'. The root word is 'care', not 'cair'.",
        "Break down: care + less = careless. Double-s at the end.",
        "Answer: careless.",
      ],
      tip: "CARELESS = care + less. Think of the root word 'care' first, then add '-less' (without care).",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION G — Comprehension Cloze  (Q31–Q34)
// Answer key: Q31=After, Q32=stopped, Q33=sign, Q34=allowed
// Passage: Peter, Ahmad, and the No Ball Games sign
// ════════════════════════════════════════════════════════════

const compClozeG = `
Peter and Ahmad wanted to play soccer in the field but it was raining heavily. They decided to play at the void deck. Although they saw the "No Ball Games" sign, they ignored it.

(31) ______ playing for about twenty minutes, they saw a policeman approaching. He immediately (32) ______ them from playing. The policeman pointed to the (33) ______ and told them sternly that they were not (34) ______ to play ball games there.

Peter and Ahmad felt extremely embarrassed. They apologised profusely to the policeman and promised to follow rules in future.
`;

const sectionG: PassageSet = {
  kind: "B",
  id: "CH23_G_CompCloze",
  topic: "ComprehensionFIB",
  passageTitle: "Comprehension Cloze — Peter and Ahmad at the Void Deck (Q31–Q34)",
  passage: compClozeG,
  questions: [
    {
      id: "CH23_G_Q31",
      marks: 1,
      question: "Fill in blank (31): (31) ______ playing for about twenty minutes, they saw a policeman approaching.",
      answer: "After",
      solution: {
        method: "Comprehension Cloze — Time Conjunction",
        steps: [
          "The boys played first, THEN saw the policeman. The playing happened BEFORE seeing him.",
          "'After' + gerund phrase = having completed an action, then the next thing happened. ✓",
          "'After playing for twenty minutes, they saw...' = once twenty minutes of playing was done, the policeman appeared.",
          "Answer: After.",
        ],
        tip: "'After + -ing' introduces the action that happened first. After eating, she washed the dishes.",
      },
    },
    {
      id: "CH23_G_Q32",
      marks: 1,
      question: "Fill in blank (32): He immediately (32) ______ them from playing.",
      answer: "stopped",
      solution: {
        method: "Comprehension Cloze — Verb",
        steps: [
          "The policeman saw them playing illegally and intervened.",
          "'Stopped them from playing' = prevented them from continuing. ✓",
          "Collocation: 'stop someone from doing something' = prevent.",
          "Past tense needed (narrative context): stopped.",
          "Answer: stopped.",
        ],
        tip: "'Stop someone from doing something' = prevent. The policeman stopped = made them stop.",
      },
    },
    {
      id: "CH23_G_Q33",
      marks: 1,
      question: "Fill in blank (33): The policeman pointed to the (33) ______ and told them sternly…",
      answer: "sign",
      solution: {
        method: "Comprehension Cloze — Reference to Earlier Detail",
        steps: [
          'Earlier in the passage: \'Although they saw the "No Ball Games" sign…\'',
          "The policeman pointed to the sign they had ignored.",
          "Answer: sign.",
        ],
        tip: "Always look earlier in the passage for details that are referenced later. 'No Ball Games' sign was mentioned in paragraph 1.",
      },
    },
    {
      id: "CH23_G_Q34",
      marks: 1,
      question: "Fill in blank (34): …that they were not (34) ______ to play ball games there.",
      answer: "allowed",
      solution: {
        method: "Comprehension Cloze — Permission Verb",
        steps: [
          "'Not allowed to' = not permitted to, forbidden from.",
          "The 'No Ball Games' sign means ball games are not allowed/permitted there.",
          "'Not allowed to play' = prohibited from playing. ✓",
          "Answer: allowed.",
        ],
        tip: "'Not allowed to' = not permitted to. The 'No Ball Games' sign = ball games not allowed.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION H — Comprehension Open-ended  (Q35–Q42)
// Answer key: Q35=In the bedroom, Q36=B, Q37=Sue Lin, Q38=False
// (Q39–Q42 from visual inspection of the paper)
// Passage: Sue Lin and missing dog Snowy
// ════════════════════════════════════════════════════════════

const compPassageH = `
Sue Lin was alone in her bedroom. She muttered to herself, "Where are you, Snowy?" Her mother came in and sat beside her. She stroked her head and consoled her. "Don't worry, sweetheart. We will find it," Sue Lin's mother said.

Every day, Snowy would be waiting at the door for Sue Lin to come home from school. It would greet her by wagging its tail. After Sue Lin finished her homework, Snowy would be all ready to play with her. Snowy seemed to know when Sue Lin felt upset. It would simply sit quietly on her lap. Being the only child, Sue Lin had no sibling to keep her company. Snowy was everything to her. Sue Lin loved her pet dog with all her heart.                             [line 5—9]

One day, Sue Lin came home and realised Snowy was not there at the door. She felt that something was amiss. She found out from her mother that her grandmother had left the door open when she went out to water the plants along the corridor. Snowy had run out of the house on its own and her grandmother had not noticed that.                                                [line 10]

The family put up notices about the missing dog around the neighbourhood. Sue Lin prayed that Snowy was fine and would return home soon.                [line 15]
`;

const sectionH: PassageSet = {
  kind: "B",
  id: "CH23_H_Comprehension",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension — Sue Lin and Snowy (Q35–Q42)",
  passage: compPassageH,
  questions: [
    {
      id: "CH23_H_Q35",
      marks: 1,
      question: "Where was Sue Lin when her mother approached her? [1 mark]",
      answer: "In the bedroom.",
      solution: {
        method: "Literal Comprehension",
        steps: [
          "Read the opening: 'Sue Lin was alone in her bedroom.'",
          "Her mother 'came in' = entered the bedroom.",
          "Answer: In the bedroom.",
        ],
        tip: "For 'where' questions, check the opening sentence of the passage for location details.",
      },
    },
    {
      id: "CH23_H_Q36",
      marks: 1,
      question:
        "Which word in the sentence below has the same meaning as 'comforted'? Circle either (A) or (B). [1 mark]\n\n'She stroked her head and consoled her.'\n         (A) stroked              (B) consoled",
      options: { A: "stroked", B: "consoled" },
      answer: "B",
      solution: {
        method: "Synonym Identification",
        steps: [
          "'Comforted' = made someone feel less sad/upset, consoled.",
          "'Consoled' = provided comfort, made someone feel better in grief/sadness. ✓",
          "'Stroked' = moved the hand gently over something (physical action) — not synonymous with 'comforted'.",
          "Answer: (B) consoled.",
        ],
        tip: "Consoled = comforted. Both mean reducing sadness through words or presence.",
      },
    },
    {
      id: "CH23_H_Q37",
      marks: 1,
      question:
        "The word 'her' in line 7 refers to _______. Tick ✓ your chosen answer. [1 mark]\n□ Snowy\n□ Sue Lin\n□ Sue Lin's mother",
      options: { Snowy: "Snowy", "Sue Lin": "Sue Lin", "Sue Lin's mother": "Sue Lin's mother" },
      answer: "Sue Lin",
      solution: {
        method: "Pronoun Reference",
        steps: [
          "Line 7: 'It would simply sit quietly on HER lap.'",
          "'It' = Snowy (the dog). 'Her' = the owner whose lap Snowy sits on.",
          "Snowy sits on SUE LIN's lap — Sue Lin is the owner.",
          "Answer: Sue Lin.",
        ],
        tip: "For pronoun reference, find the nearest relevant noun earlier in the text that the pronoun can logically refer to.",
      },
    },
    {
      id: "CH23_H_Q38",
      marks: 1,
      question: "True or False: Sue Lin had a sister. [1 mark]",
      answer: "False",
      solution: {
        method: "True/False — Direct Contradiction",
        steps: [
          "Read: 'Being the only child, Sue Lin had NO SIBLING to keep her company.'",
          "'Only child' = no siblings → no sister (or brother). → FALSE.",
          "Answer: False.",
        ],
        tip: "'Only child' = no brothers or sisters at all. 'Sibling' includes both brothers and sisters.",
      },
    },
    {
      id: "CH23_H_Q39",
      marks: 1,
      question: "True or False: Sue Lin would play with Snowy after finishing her homework. [1 mark]",
      answer: "True",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Read: 'After Sue Lin finished her homework, Snowy would be all ready to play with her.'",
          "Yes — after homework, they would play. → TRUE.",
          "Answer: True.",
        ],
        tip: "Find the exact sentence. 'After Sue Lin finished her homework, Snowy would be all ready to play' — TRUE.",
      },
    },
    {
      id: "CH23_H_Q40",
      marks: 1,
      question: "True or False: When Sue Lin felt upset, Snowy would wag its tail to cheer her up. [1 mark]",
      answer: "False",
      solution: {
        method: "True/False — Close Reading",
        steps: [
          "Read: 'Snowy seemed to know when Sue Lin felt upset. It would simply SIT QUIETLY on her lap.'",
          "When upset, Snowy sat quietly — it did NOT wag its tail to cheer her up.",
          "Snowy wagged its tail when greeting her at the door (different situation).",
          "Answer: False.",
        ],
        tip: "Be careful: Snowy wags its tail at the DOOR (greeting), but when Sue Lin is UPSET, Snowy sits quietly on her lap.",
      },
    },
    {
      id: "CH23_H_Q41",
      marks: 1,
      question:
        "Write 1, 2 and 3 in the blanks below to indicate the order of events. [1 mark]\n___ Sue Lin came home.\n___ Sue Lin's mother told her that Snowy was missing.\n___ Sue Lin's grandmother went out to water the plants.",
      answer: "Sue Lin came home (2), mother told her Snowy missing (3), grandmother went out (1).",
      solution: {
        method: "Sequencing Events",
        steps: [
          "Step 1: Grandmother went out to water the plants — LEAVING THE DOOR OPEN. (This happened first.)",
          "Step 2: Sue Lin came home and 'Snowy was not there at the door'. (She arrived after Snowy was gone.)",
          "Step 3: 'She found out from her mother that her grandmother had left the door open…' (Mother tells her what happened.)",
          "Order: Grandmother went out (1), Sue Lin came home (2), mother told her (3).",
        ],
        tip: "Work backwards: to find cause, look for what triggered each event. The grandmother leaving door open triggered everything else.",
      },
    },
    {
      id: "CH23_H_Q42",
      marks: 1,
      question: "What did Sue Lin's family do to find Snowy? [1 mark]",
      answer: "They put up notices about the missing dog around the neighbourhood.",
      solution: {
        method: "Literal Retrieval",
        steps: [
          "Read: 'The family put up notices about the missing dog around the neighbourhood.'",
          "They distributed/posted notices (missing dog notices) in the neighbourhood.",
          "Answer: They put up notices about the missing dog around the neighbourhood.",
        ],
        tip: "For 'what did X do' questions, find the relevant action verb in the passage.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// FULL PAPER EXPORT
// ════════════════════════════════════════════════════════════
export const questions: Question[] = [
  ...sectionA,
  ...sectionB,
  sectionC,
  sectionD,
  sectionE,
  ...sectionF,
  sectionG,
  sectionH,
];

export default {
  meta,
  questions,
};
