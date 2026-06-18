// ============================================================
// HENRY PARK PRIMARY SCHOOL — Primary 3 English Language
// 2023 Timed Practice Paper 2 (Paper 2)
// Source: P3_English_WA3.pdf
//
// PART I  (14 marks)
//   Section A — Vocabulary MCQ          (Q1–Q6,   6 × 1m)
//   Section B — Grammar MCQ             (Q7–Q14,  8 × 1m)
//
// PART II (36 marks)
//   Section C — Grammar Cloze           (Q15–Q18, 4 × 1m)
//   Section D — Vocabulary Cloze        (Q19–Q22, 4 × 1m)
//   Section E — Spelling Editing        (Q23–Q27, 5 × 1m) + extra (Q28–Q32)
//   Section F — Synthesis               (Q33–Q34, 2 × 1m)
//   Section G — Comprehension 1 MCQ+OE (Q35–Q42, 8m)
//   Section H — Comprehension 2 MCQ+OE (Q43–Q49, 8m)
//
// (Listening & Creative Writing excluded per instructions)
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
  school: "Henry Park Primary School",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "2023 Timed Practice Paper 2",
  year: 2023,
  totalMarks: 50,
  sections: [
    "Part I Section A – Vocabulary MCQ (Q1–Q6, 6 × 1m)",
    "Part I Section B – Grammar MCQ (Q7–Q14, 8 × 1m)",
    "Part II Section C – Grammar Cloze (Q15–Q18, 4 × 1m)",
    "Part II Section D – Vocabulary Cloze (Q19–Q22, 4 × 1m)",
    "Part II Section E – Editing: Spelling (Q23–Q32, 5+5 × 1m)",
    "Part II Section F – Synthesis & Transformation (Q33–Q34, 2 × 1m)",
    "Part II Section G – Comprehension 1 (Q35–Q42, 8m)",
    "Part II Section H – Comprehension 2 (Q43–Q49, 8m)",
  ],
};

// ════════════════════════════════════════════════════════════
// PART I, SECTION A — Vocabulary MCQ  (Q1–Q6)
// Answer key: 2 3 3 2 4 1
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "HP23_A_Q01",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The _______ who snatched Mrs Lee's handbag disappeared before the policemen arrived at the scene.",
    options: {
      "1": "victim",
      "2": "culprit",
      "3": "witness",
      "4": "detective",
    },
    answer: "2",
    solution: {
      method: "Context Vocabulary — Crime Scene",
      steps: [
        "We need someone who committed a crime (snatching a handbag).",
        "'Culprit' = the person responsible for a crime or wrongdoing. ✓",
        "'Victim' = the person harmed (Mrs Lee is the victim, not the blank).",
        "'Witness' = someone who saw the crime happen — doesn't match 'snatched and disappeared'.",
        "'Detective' = a police officer who investigates crimes — doesn't snatch handbags.",
        "Answer: (2) culprit.",
      ],
      tip: "Crime vocabulary: victim (harmed), culprit/criminal (did it), witness (saw it), detective (investigates it).",
    },
  },
  {
    kind: "A",
    id: "HP23_A_Q02",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The thrifty man could not bear to spend so much money on that pair of leather shoes. He decided to buy a _______ pair of shoes.",
    options: {
      "1": "lower",
      "2": "better",
      "3": "cheaper",
      "4": "expensive",
    },
    answer: "3",
    solution: {
      method: "Context Vocabulary — Synonyms",
      steps: [
        "'Thrifty' = careful about spending money, not wasteful.",
        "He can't bear to spend so much → he wants shoes that cost less.",
        "'Cheaper' = costing less money. ✓",
        "'Lower' is not standard — 'lower price' works, but 'a lower pair of shoes' is not natural.",
        "'Better' contradicts the idea of being thrifty.",
        "'Expensive' = costing more money — the opposite of what he wants.",
        "Answer: (3) cheaper.",
      ],
      tip: "Thrifty → wants to spend less → cheaper. Always look at the context sentence for the 'because' reason.",
    },
  },
  {
    kind: "A",
    id: "HP23_A_Q03",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"I\'m sorry, I didn\'t mean to push you, Mr Tan. I\'ll help you pick up the books," Roy _______.',
    options: {
      "1": "hinted",
      "2": "reminded",
      "3": "apologised",
      "4": "questioned",
    },
    answer: "3",
    solution: {
      method: "Dialogue Tag / Reporting Verb",
      steps: [
        "Roy says 'I'm sorry, I didn't mean to push you' — this is expressing regret for a mistake.",
        "'Apologised' = said sorry, expressed regret. ✓",
        "'Hinted' = suggested indirectly — doesn't match a direct apology.",
        "'Reminded' = told someone something they might have forgotten — wrong context.",
        "'Questioned' = asked a question — wrong; Roy is saying sorry, not asking.",
        "Answer: (3) apologised.",
      ],
      tip: "Dialogue verbs: said/exclaimed (general), apologised (sorry), questioned (asked), protested (objected). Match the emotion to the verb.",
    },
  },
  {
    kind: "A",
    id: "HP23_A_Q04",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The children followed their parents' _______ to use the pedestrian crossing when they cross the road.",
    options: {
      "1": "report",
      "2": "advice",
      "3": "speech",
      "4": "answer",
    },
    answer: "2",
    solution: {
      method: "Context Vocabulary — Guidance",
      steps: [
        "Parents tell children to use the pedestrian crossing for safety — this is guidance/recommendation.",
        "'Advice' = suggestions or recommendations to help someone. ✓",
        "'Report' = a factual account of information — not instructions from parents.",
        "'Speech' = formal speaking, a talk — too formal for parental instructions at home.",
        "'Answer' = a reply to a question — wrong context.",
        "Answer: (2) advice.",
      ],
      tip: "'Follow one's advice' is a common collocation. Parents giving safety tips = advice.",
    },
  },
  {
    kind: "A",
    id: "HP23_A_Q05",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Sally showed off her _______ driving skills during the race and emerged as the champion.",
    options: {
      "1": "dull",
      "2": "messy",
      "3": "ordinary",
      "4": "impressive",
    },
    answer: "4",
    solution: {
      method: "Context Vocabulary — Positive Adjective",
      steps: [
        "Sally won the race and emerged as champion — her skills must be very good.",
        "'Impressive' = causing admiration, remarkably good. ✓",
        "'Dull' = boring, not exciting — contradicts 'showed off' and 'champion'.",
        "'Messy' = untidy, disorganised — negative, doesn't lead to winning.",
        "'Ordinary' = average, nothing special — a champion wouldn't have ordinary skills.",
        "Answer: (4) impressive.",
      ],
      tip: "'Showed off' + winning = very good skills. Choose the strongly positive adjective.",
    },
  },
  {
    kind: "A",
    id: "HP23_A_Q06",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My desk still feels sticky even after I have _______ off the sweetened drink that I had spilt this morning.",
    options: {
      "1": "wiped",
      "2": "dusted",
      "3": "rubbed",
      "4": "scratched",
    },
    answer: "1",
    solution: {
      method: "Phrasal Verb / Collocation",
      steps: [
        "The context is cleaning a spilt drink off a desk.",
        "'Wiped off' = to clean a surface by moving a cloth across it. ✓",
        "'Dusted off' = to remove dust (dry particles) — not for sticky liquid.",
        "'Rubbed off' = possible, but less natural for cleaning spilt drinks.",
        "'Scratched off' = to remove with fingernails or a sharp object — wrong for liquid.",
        "Answer: (1) wiped.",
      ],
      tip: "'Wipe' is the standard verb for cleaning liquid spills from surfaces. 'Wipe off / wipe up'.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// PART I, SECTION B — Grammar MCQ  (Q7–Q14)
// Answer key: 2 3 4 1 4 4 4 4
// ════════════════════════════════════════════════════════════
const sectionB: QuestionTypeA[] = [
  {
    kind: "A",
    id: "HP23_B_Q07",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Nurul _______ to the swimming complex for swimming lessons every Sunday.",
    options: {
      "1": "go",
      "2": "goes",
      "3": "is going",
      "4": "was going",
    },
    answer: "2",
    solution: {
      method: "Simple Present Tense — Routine",
      steps: [
        "'Every Sunday' is a time marker for habitual/routine action → simple present tense.",
        "Subject 'Nurul' is third person singular → add '-s' to the verb.",
        "'goes' = 3rd person singular simple present. ✓",
        "'go' is base form — used for I/you/we/they, not she/he/it.",
        "'is going' = present progressive — for things happening NOW, not every Sunday.",
        "'was going' = past progressive — contradicts 'every Sunday' (current routine).",
        "Answer: (2) goes.",
      ],
      tip: "Routine/habitual actions with every day/week/Sunday → simple present. He/she/it → add -s/-es.",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The postman had to deliver the mail the next day as nobody _______ at home that afternoon.",
    options: {
      "1": "is",
      "2": "are",
      "3": "was",
      "4": "were",
    },
    answer: "3",
    solution: {
      method: "Past Tense — Subject-Verb Agreement",
      steps: [
        "The sentence describes a past situation ('had to deliver', 'that afternoon') → past tense needed.",
        "Subject is 'nobody' — singular indefinite pronoun.",
        "'Nobody' takes singular verb: 'nobody was' (not 'were'). ✓",
        "'is/are' = present tense — wrong.",
        "'were' = past plural — wrong for singular 'nobody'.",
        "Answer: (3) was.",
      ],
      tip: "Nobody/somebody/everybody/anyone = singular → use 'was' (past), 'is' (present).",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q09",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Mrs Tan reminded her children to warm up the lunch by _______ before she left for work.",
    options: {
      "1": "himself",
      "2": "herself",
      "3": "yourselves",
      "4": "themselves",
    },
    answer: "4",
    solution: {
      method: "Reflexive Pronoun — Plural",
      steps: [
        "The subject of 'warm up' = 'her children' (plural, third person).",
        "The reflexive pronoun must match: plural third person = 'themselves'. ✓",
        "'Himself' = singular male; 'herself' = singular female; 'yourselves' = plural second person.",
        "'Themselves' refers back to 'her children'. ✓",
        "Answer: (4) themselves.",
      ],
      tip: "Reflexive pronoun chart: I→myself, you→yourself, he→himself, she→herself, we→ourselves, they→themselves.",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q10",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "There were _______ guests at Grandmother's 80th birthday party as she was well-loved by her friends and relatives.",
    options: {
      "1": "many",
      "2": "much",
      "3": "a few",
      "4": "a little",
    },
    answer: "1",
    solution: {
      method: "Quantifiers — Countable vs Uncountable",
      steps: [
        "'Guests' is a countable noun (you can count individual guests).",
        "'Many' is used with countable nouns in positive/negative sentences. ✓",
        "'Much' is used with uncountable nouns (water, sugar, time).",
        "'A few' = a small number — but Grandmother was well-loved, implying many people came.",
        "'A little' = a small amount — used with uncountable nouns.",
        "Answer: (1) many.",
      ],
      tip: "Countable → many/few. Uncountable → much/little. Guests = countable → use 'many'.",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q11",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Look at _______ bears in the enclosure. Shall we go nearer to take some pictures of them?" Mother asked the children.',
    options: {
      "1": "this",
      "2": "that",
      "3": "these",
      "4": "those",
    },
    answer: "4",
    solution: {
      method: "Demonstrative Adjectives — Distance + Plural",
      steps: [
        "The bears are 'in the enclosure' — they are at a distance from the speaker.",
        "'Bears' is plural → need a plural demonstrative.",
        "'Those' = plural + far/distant. ✓",
        "'These' = plural + near — but the bears are in an enclosure away from them.",
        "'This/that' = singular — wrong for plural 'bears'.",
        "Answer: (4) those.",
      ],
      tip: "Near = this/these; Far = that/those. Singular = this/that; Plural = these/those. Bears are distant → those.",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q12",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Please speak softly. The children _______ at the moment," said Mrs Lim.',
    options: {
      "1": "slept",
      "2": "sleep",
      "3": "have slept",
      "4": "are sleeping",
    },
    answer: "4",
    solution: {
      method: "Present Continuous — Action Happening Now",
      steps: [
        "'At the moment' = right now, currently happening.",
        "Present continuous = is/are + verb-ing, used for actions happening at this moment.",
        "'Are sleeping' = present continuous. ✓",
        "'Slept' = simple past — wrong.",
        "'Sleep' = simple present — wrong for 'at the moment'.",
        "'Have slept' = present perfect — refers to completed action, not current.",
        "Answer: (4) are sleeping.",
      ],
      tip: "'At the moment', 'now', 'right now', 'currently' → present continuous tense.",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q13",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Could you add _______ salt to this pot of soup?" asked Rachel, after taking a sip of the tasteless soup.',
    options: {
      "1": "a few",
      "2": "many",
      "3": "much",
      "4": "some",
    },
    answer: "4",
    solution: {
      method: "Quantifiers — Uncountable Noun in Request",
      steps: [
        "'Salt' is uncountable (you can't say 'one salt, two salts').",
        "For uncountable nouns in positive requests, 'some' is the natural quantifier. ✓",
        "'A few / many' = for countable nouns — wrong for salt.",
        "'Much' = for uncountable nouns in negatives/questions, not positive requests.",
        "'Could you add some salt?' is the natural, polite request form. ✓",
        "Answer: (4) some.",
      ],
      tip: "Use 'some' in positive requests/offers with uncountable nouns: 'some water', 'some salt', 'some advice'.",
    },
  },
  {
    kind: "A",
    id: "HP23_B_Q14",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Sandy has been learning to play the piano _______ she was five years old.",
    options: {
      "1": "if",
      "2": "so",
      "3": "when",
      "4": "since",
    },
    answer: "4",
    solution: {
      method: "Conjunctions — Time / Duration",
      steps: [
        "The sentence uses present perfect 'has been learning' — this tense is used with 'since' for a starting point in the past.",
        "'Since' + point in time (she was five years old) = from that time until now. ✓",
        "'If' = conditional — wrong here.",
        "'So' = result connector — wrong.",
        "'When' = at the time that — would need past tense: 'she learned when she was five'.",
        "Answer: (4) since.",
      ],
      tip: "Present perfect + since + [point in past] = has been doing X since [age/year]. 'Since' marks the START of an action that continues now.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// PART II, SECTION C — Grammar Cloze (Q15–Q18)
// Answer key: And, When, But, Because
// Passage: Jane and family at East Coast Park
// ════════════════════════════════════════════════════════════

const grammarClozePassage = `
During the holidays, Jane and her family went to East Coast Park. At the park, they cycled (15) ______ swam in the sea. (16) ______ it was time to go home, her father realised that the car key was missing while they were packing up. The family searched everywhere (17) ______ the key could not be found. They had to take a taxi home (18) ______ it was getting dark. The next day, her father found the key in one of the pockets of his pants.

Word Box: and | but | if | while | although | because | when | with
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "HP23_C_GrammarCloze",
  topic: "GrammarCloze",
  passageTitle: "Grammar Cloze — East Coast Park (Questions 15–18)",
  passage: grammarClozePassage,
  questions: [
    {
      id: "HP23_C_Q15",
      marks: 1,
      question:
        "Fill in blank (15): …they cycled (15) ______ swam in the sea.",
      options: {
        and: "and",
        but: "but",
        if: "if",
        while: "while",
        although: "although",
        because: "because",
        when: "when",
        with: "with",
      },
      answer: "And",
      solution: {
        method: "Grammar Cloze — Conjunction (Addition)",
        steps: [
          "'Cycled (15) ______ swam' — two activities done by the same people.",
          "'And' = addition connector, joining two parallel verbs. ✓",
          "'But' = contrast — they didn't do one INSTEAD of the other.",
          "'While' = simultaneously — possible (while cycling they were also swimming?) but 'and' is more natural for listing activities.",
          "Answer: And.",
        ],
        tip: "When listing two activities done by the same person/group, 'and' is the natural connector.",
      },
    },
    {
      id: "HP23_C_Q16",
      marks: 1,
      question:
        "Fill in blank (16): (16) ______ it was time to go home, her father realised…",
      options: {
        and: "and",
        but: "but",
        if: "if",
        while: "while",
        although: "although",
        because: "because",
        when: "when",
        with: "with",
      },
      answer: "When",
      solution: {
        method: "Grammar Cloze — Time Conjunction",
        steps: [
          "The blank begins a time clause — 'at the time it was time to go home'.",
          "'When' = at the time that (simultaneous or triggering event). ✓",
          "'While' = during the same period — less precise here (going home is a moment, not duration).",
          "'If' = conditional — there's no condition here; it WAS time to go home.",
          "Answer: When.",
        ],
        tip: "'When' introduces a specific moment. 'While' introduces a period of time. 'It was time to go home' is a moment → 'when'.",
      },
    },
    {
      id: "HP23_C_Q17",
      marks: 1,
      question:
        "Fill in blank (17): The family searched everywhere (17) ______ the key could not be found.",
      options: {
        and: "and",
        but: "but",
        if: "if",
        while: "while",
        although: "although",
        because: "because",
        when: "when",
        with: "with",
      },
      answer: "But",
      solution: {
        method: "Grammar Cloze — Contrast Conjunction",
        steps: [
          "'Searched everywhere' → expected result: found it. But the actual result: 'could not be found'.",
          "This is a contrast between expectation and reality → 'but'. ✓",
          "'Although' would also show contrast but structure would be: 'Although the family searched everywhere, the key could not be found.' — different word order.",
          "With the structure '[action] (blank) [unexpected result]', 'but' fits perfectly.",
          "Answer: But.",
        ],
        tip: "'But' joins two contrasting clauses in the same sentence without changing word order.",
      },
    },
    {
      id: "HP23_C_Q18",
      marks: 1,
      question:
        "Fill in blank (18): They had to take a taxi home (18) ______ it was getting dark.",
      options: {
        and: "and",
        but: "but",
        if: "if",
        while: "while",
        although: "although",
        because: "because",
        when: "when",
        with: "with",
      },
      answer: "Because",
      solution: {
        method: "Grammar Cloze — Reason Conjunction",
        steps: [
          "Why did they take a taxi? Because it was getting dark (reason/cause).",
          "'Because' + reason clause = explains why the action happened. ✓",
          "'When' = time (not explaining why they took a taxi).",
          "'While' = simultaneous — doesn't give a reason.",
          "Answer: Because.",
        ],
        tip: "'Because' introduces the reason. 'They did X because Y happened.' The Y is the cause.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// PART II, SECTION D (relabelled) — Vocabulary Cloze (Q19–Q22)
// Answer key: Fly (19), Flying (20), Flew (21), Flies (22)
// Passage: Tom and Ali flying kites
// ════════════════════════════════════════════════════════════

const vocabClozeKite = `
It was a windy afternoon. Tom and his neighbour, Ali, decided that it was the perfect day to (19) ______ kites. They headed for the big field at the park. There were already people (20) ______ a few kites in the sky. Tom (21) ______ his kite so high that it almost reached the clouds! They were having so much fun. They did not realise three hours had gone by. "Time (22) ______ when we are having fun!" exclaimed Tom. They made a promise that they would fly kites again the next weekend.

Word Box: fly | flies | flew | is flying | flying | have flown
`;

const sectionD: PassageSet = {
  kind: "B",
  id: "HP23_D_VocabCloze_Kite",
  topic: "VocabCloze",
  passageTitle: "Vocabulary Cloze — Kite Flying (Questions 19–22)",
  passage: vocabClozeKite,
  questions: [
    {
      id: "HP23_D_Q19",
      marks: 1,
      question:
        "Fill in blank (19): …decided that it was the perfect day to (19) ______ kites.",
      options: {
        fly: "fly",
        flies: "flies",
        flew: "flew",
        "is flying": "is flying",
        flying: "flying",
        "have flown": "have flown",
      },
      answer: "Fly",
      solution: {
        method: "Verb Form after 'to' (Infinitive)",
        steps: [
          "After 'to' (the infinitive marker), the base form of the verb is used.",
          "'to fly' = infinitive form. ✓",
          "'flies' = 3rd person present — cannot follow 'to'.",
          "'flew' = past tense — cannot follow 'to'.",
          "'flying' = gerund/present participle — used after prepositions or as adjective, not 'to'.",
          "Answer: fly.",
        ],
        tip: "After 'to', always use the BASE form of the verb: to run, to eat, to fly.",
      },
    },
    {
      id: "HP23_D_Q20",
      marks: 1,
      question:
        "Fill in blank (20): There were already people (20) ______ a few kites in the sky.",
      options: {
        fly: "fly",
        flies: "flies",
        flew: "flew",
        "is flying": "is flying",
        flying: "flying",
        "have flown": "have flown",
      },
      answer: "Flying",
      solution: {
        method: "Present Participle after Noun",
        steps: [
          "'There were people (20) ______ kites' — the participle describes what the people were doing.",
          "After a noun, a present participle (verb-ing) describes the noun's action: 'people flying kites' = people who were flying kites. ✓",
          "This is a reduced relative clause: 'people who were flying kites' → 'people flying kites'.",
          "Answer: flying.",
        ],
        tip: "Noun + verb-ing = reduced relative clause. 'A dog barking outside' = 'a dog that was barking outside'.",
      },
    },
    {
      id: "HP23_D_Q21",
      marks: 1,
      question:
        "Fill in blank (21): Tom (21) ______ his kite so high that it almost reached the clouds!",
      options: {
        fly: "fly",
        flies: "flies",
        flew: "flew",
        "is flying": "is flying",
        flying: "flying",
        "have flown": "have flown",
      },
      answer: "Flew",
      solution: {
        method: "Simple Past Tense — Narrative",
        steps: [
          "The passage is describing events that happened in the past (past narrative).",
          "'Flew' is the simple past tense of 'fly'. ✓",
          "The surrounding verbs: 'decided', 'headed', 'reached' — all past tense.",
          "Answer: flew.",
        ],
        tip: "In a past narrative, all action verbs should be in simple past. 'fly' → irregular past: 'flew'.",
      },
    },
    {
      id: "HP23_D_Q22",
      marks: 1,
      question:
        "Fill in blank (22): \"Time (22) ______ when we are having fun!\"",
      options: {
        fly: "fly",
        flies: "flies",
        flew: "flew",
        "is flying": "is flying",
        flying: "flying",
        "have flown": "have flown",
      },
      answer: "Flies",
      solution: {
        method: "Idiomatic Expression — 'Time flies'",
        steps: [
          "'Time flies when you're having fun' is a well-known English idiom meaning time passes quickly.",
          "'Time' is singular (third person) → 'flies' (3rd person singular present). ✓",
          "The expression is stated as a general truth → simple present tense.",
          "Answer: flies.",
        ],
        tip: "Learn the idiom 'Time flies' = time passes quickly. It's a fixed expression always in simple present.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// PART II, SECTION E — Vocabulary Cloze (Q23–Q27) & Editing/Spelling (Q28–Q32)
// Answer key from key sheet:
//   Q23=Miss, Q24=Grateful, Q25=Show, Q26=Students, Q27=Party
//   Q28=Different, Q29=Beautiful, Q30=Celebrate, Q31=Museums, Q32=Especially
// ════════════════════════════════════════════════════════════

const vocabClozeTeacher = `
Our form teacher, Mrs Tan, is retiring next year. Mrs Tan is a wonderful teacher and we will (23) ______ her when she retires. We are very (24) ______ for everything that she has done for us. We want to (25) ______ our appreciation to Mrs Tan by planning a farewell party for her at the canteen during our recess. We are planning to invite some of her (26) ______ whom she has taught before. We are sure that they would like to thank her too. We hope that she will enjoy the (27) ______ that we are going to plan for her. We hope everyone will enjoy themselves too.
`;

const sectionE1: PassageSet = {
  kind: "B",
  id: "HP23_E1_VocabCloze_Teacher",
  topic: "VocabCloze",
  passageTitle: "Vocabulary Cloze — Mrs Tan's Retirement (Questions 23–27)",
  passage: vocabClozeTeacher,
  questions: [
    {
      id: "HP23_E1_Q23",
      marks: 1,
      question:
        "Fill in blank (23): …we will (23) ______ her when she retires.",
      answer: "Miss",
      solution: {
        method: "Context Vocabulary — Feelings about Departure",
        steps: [
          "Mrs Tan is leaving (retiring). The students feel sad about this.",
          "'Miss' = to feel sad because someone is not there anymore. ✓",
          "'We will miss her' = we will feel the absence of her and wish she were still there.",
          "Answer: Miss.",
        ],
        tip: "'Miss someone' = feel their absence, wish they were here. 'I miss my grandmother' (who has passed) / 'I'll miss you' (when someone leaves).",
      },
    },
    {
      id: "HP23_E1_Q24",
      marks: 1,
      question:
        "Fill in blank (24): We are very (24) ______ for everything that she has done for us.",
      answer: "Grateful",
      solution: {
        method: "Context Vocabulary — Feelings of Thankfulness",
        steps: [
          "The students appreciate what Mrs Tan has done for them.",
          "'Grateful' = feeling or showing thanks and appreciation. ✓",
          "Synonym: 'thankful'. 'We are very grateful for...' is a natural collocation.",
          "Answer: Grateful.",
        ],
        tip: "'Grateful for' + reason = the standard expression for feeling thankful.",
      },
    },
    {
      id: "HP23_E1_Q25",
      marks: 1,
      question:
        "Fill in blank (25): We want to (25) ______ our appreciation to Mrs Tan by planning a farewell party…",
      answer: "Show",
      solution: {
        method: "Collocation — Show appreciation",
        steps: [
          "'Show our appreciation' = demonstrate how much we value/thank her.",
          "'Show appreciation' is a fixed collocation. ✓",
          "Other options: 'express appreciation' also works, but 'show' is the answer here.",
          "Answer: Show.",
        ],
        tip: "Collocations: show/express/demonstrate appreciation. 'Show' is the most common and natural verb here.",
      },
    },
    {
      id: "HP23_E1_Q26",
      marks: 1,
      question:
        "Fill in blank (26): We are planning to invite some of her (26) ______ whom she has taught before.",
      answer: "Students",
      solution: {
        method: "Context Vocabulary — Teacher's Former Pupils",
        steps: [
          "Mrs Tan is a teacher. She has taught people → those people are her students/pupils.",
          "'Students' = people she has taught in the past. ✓",
          "The relative clause 'whom she has taught before' confirms these are former pupils.",
          "Answer: Students.",
        ],
        tip: "Teacher → teaches → students/pupils. 'Whom she has taught before' = former students.",
      },
    },
    {
      id: "HP23_E1_Q27",
      marks: 1,
      question:
        "Fill in blank (27): We hope that she will enjoy the (27) ______ that we are going to plan for her.",
      answer: "Party",
      solution: {
        method: "Context Vocabulary — Event",
        steps: [
          "The passage mentions 'planning a farewell party for her' earlier.",
          "The blank refers back to this event — 'the party that we are going to plan'. ✓",
          "Answer: Party.",
        ],
        tip: "Look for earlier mentions in the passage for context clues — 'farewell party' was mentioned in the previous sentence.",
      },
    },
  ],
};

// Editing — Spelling (Q28–Q32): Vincent van Gogh passage
const editingVanGogh = `
Vincent van Gogh was not always considered as one of the greatest painters of all (28)[diferent] time. People used to laugh at his paintings as they were DIFERENT from the other paintings (29)[beutiful] they had seen. He only sold one of his BEUTIFUL paintings during his lifetime. But now, many people around the world (30)[celeberate] CELEBERATE the life and work of Vincent van (31)[musuems] Gogh. People visit MUSUEMS and galleries just to see his art. They love to admire his (32)[espacially] paintings, ESPACIALLY a painting which he named "The Starry Night". It is one of the most famous paintings in the world and is printed on many items such as mugs, magnets and postcards.
`;

const sectionE2: QuestionTypeA[] = [
  {
    kind: "A",
    id: "HP23_E2_Q28",
    topic: "Editing",
    marks: 1,
    stimulus: editingVanGogh,
    question:
      "Q28: The underlined word 'diferent' is misspelled. Write the correct spelling.",
    answer: "Different",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The misspelled word is 'diferent'.",
        "Correct spelling: d-i-f-f-e-r-e-n-t.",
        "The error: missing one 'f'. The word has a double-f: diFFerent.",
        "Break it down: differ + ent = different.",
        "Answer: Different.",
      ],
      tip: "Memory trick: 'DIFF' (like in difference) + 'erent' = diFFerent. Double-F!",
    },
  },
  {
    kind: "A",
    id: "HP23_E2_Q29",
    topic: "Editing",
    marks: 1,
    stimulus: editingVanGogh,
    question:
      "Q29: The underlined word 'beutiful' is misspelled. Write the correct spelling.",
    answer: "Beautiful",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The misspelled word is 'beutiful'.",
        "Correct spelling: b-e-a-u-t-i-f-u-l.",
        "The error: missing 'a' → 'beau' not 'beu'. Think 'BEAU' (as in handsome in French).",
        "Break down: beau + ti + ful = beautiful.",
        "Answer: Beautiful.",
      ],
      tip: "BEAUTIFUL: starts with 'BEAU' (think 'beautiful beau'). Mnemonic: Big Elephants Are Ugly To Irritate For Uncle Leonard = B-E-A-U-T-I-F-U-L.",
    },
  },
  {
    kind: "A",
    id: "HP23_E2_Q30",
    topic: "Editing",
    marks: 1,
    stimulus: editingVanGogh,
    question:
      "Q30: The underlined word 'celeberate' is misspelled. Write the correct spelling.",
    answer: "Celebrate",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The misspelled word is 'celeberate'.",
        "Correct spelling: c-e-l-e-b-r-a-t-e.",
        "The error: an extra 'e' → 'celeberate' vs 'celebrate'.",
        "Break down: cele + brate = celebrate. Only one 'e' after 'b'.",
        "Answer: Celebrate.",
      ],
      tip: "cel-e-BRATE (not cel-e-be-rate). Think of 'brat' in the middle: celeBRATE.",
    },
  },
  {
    kind: "A",
    id: "HP23_E2_Q31",
    topic: "Editing",
    marks: 1,
    stimulus: editingVanGogh,
    question:
      "Q31: The underlined word 'musuems' is misspelled. Write the correct spelling.",
    answer: "Museums",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The misspelled word is 'musuems'.",
        "Correct spelling: m-u-s-e-u-m-s.",
        "The error: 'musuems' vs 'museums' — the letters 'e' and 'u' are switched in the middle.",
        "Break down: mu + se + um + s = museums. Remember: muse + um.",
        "Answer: Museums.",
      ],
      tip: "MUSEUM: think of a 'MUSE' (Greek goddess of arts) + 'um' = museum. mu-SE-um not mu-SU-em.",
    },
  },
  {
    kind: "A",
    id: "HP23_E2_Q32",
    topic: "Editing",
    marks: 1,
    stimulus: editingVanGogh,
    question:
      "Q32: The underlined word 'espacially' is misspelled. Write the correct spelling.",
    answer: "Especially",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The misspelled word is 'espacially'.",
        "Correct spelling: e-s-p-e-c-i-a-l-l-y.",
        "The error: 'espacially' vs 'especially' — 'sp' not 'sp+a', and double-l before y.",
        "Break down: e + spec + ial + ly = especially.",
        "Answer: Especially.",
      ],
      tip: "ESPECIALLY: e-SPEC-ially (spec = look at specially). Not 'espacially' — no 'a' after 'esp'.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// PART II, SECTION F — Synthesis & Transformation  (Q33–Q34)
// Answer key: Q33 = "Everyone enjoyed the show because it was entertaining."
//             Q34 = "David wanted the toy robot badly but he did not have enough money to buy it."
// ════════════════════════════════════════════════════════════
const sectionF: QuestionTypeA[] = [
  {
    kind: "A",
    id: "HP23_F_Q33",
    topic: "SentenceCombining",
    marks: 1,
    stimulus:
      "The show was entertaining. Everyone enjoyed the show.",
    question:
      "Rewrite the sentences as one sentence. Your sentence must end with the word 'because'.\n\n_______ because _______",
    answer: "Everyone enjoyed the show because it was entertaining.",
    solution: {
      method: "Sentence Combining — Reason Clause with 'because'",
      steps: [
        "Identify cause and effect: Show was entertaining (cause) → Everyone enjoyed it (effect).",
        "Structure: [Effect] because [Cause].",
        "'Everyone enjoyed the show because it was entertaining.' ✓",
        "Note: Replace 'the show' in the second clause with 'it' to avoid repetition.",
        "Answer: Everyone enjoyed the show because it was entertaining.",
      ],
      tip: "'Because' introduces the cause/reason. Put the effect first, then 'because', then the reason.",
    },
  },
  {
    kind: "A",
    id: "HP23_F_Q34",
    topic: "SentenceCombining",
    marks: 1,
    stimulus:
      "David wanted the toy robot badly. David did not have enough money to buy it.",
    question:
      "Rewrite the sentences as one sentence using 'but'.\n\n_______ but _______",
    answer:
      "David wanted the toy robot badly but he did not have enough money to buy it.",
    solution: {
      method: "Sentence Combining — Contrast with 'but'",
      steps: [
        "'But' shows contrast between what David wanted and what he could do.",
        "First clause: 'David wanted the toy robot badly'",
        "Second clause (after 'but'): 'he did not have enough money to buy it'",
        "Replace 'David' with 'he' in the second clause.",
        "Answer: David wanted the toy robot badly but he did not have enough money to buy it.",
      ],
      tip: "'But' = contrast. Desired outcome + 'but' + actual limitation/obstacle.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// PART II, SECTION G — Comprehension 1 (Q35–Q42)
// Passage: Ted, Dave the dog, and the Seal
// Answer key: Q35=1, Q36=2, Q37=3, Q38=False, Q39=False, Q40=The beach, Q41=Ted hugged Dave and praised his clever dog., Q42=Brave
// ════════════════════════════════════════════════════════════

const comp1Passage = `
Ted loved walking along the beach. After he had finished his dinner, he put on a jacket. Together with his dog, Dave, they went out for a walk. The strong wind blew against his face and the weather was cold.

The beach was only two kilometres from Ted's house, but the wind was blowing so strongly that it took him almost thirty minutes to reach there. When Ted finally arrived at the beach, he heard the sound of the waves breaking on the shore. The stormy weather made the waves huge that night. Dave barked in excitement as the seawater rushed towards the shore.               [line 5]

As they walked along the beach, Ted suddenly heard something in the water 'barking' back. At first, Ted thought there was another dog in the water. He spotted a tiny head with two big eyes, popping out in between the waves and took a closer look. Then, he saw two tiny ears and realised that it was a seal.

The seal had entangled itself in the large leaves of a brown sea plant. As the waves were too strong, it was unable to free itself. Ted did not know how to help the seal as he was not a good swimmer.                    [line 15]

Suddenly, Dave jumped into the water and swam towards the new-found "friend". After Dave pulled at the plant vigorously, the seal managed to break free and swim away. Dave swam back to shore. Ted hugged Dave and praised his clever dog.

Adapted from 'The Seal and the Storm'
`;

const sectionG: PassageSet = {
  kind: "B",
  id: "HP23_G_Comp1",
  topic: "ComprehensionMCQ",
  passageTitle: "Comprehension 1 — Ted, Dave and the Seal (Questions 35–42)",
  passage: comp1Passage,
  questions: [
    {
      id: "HP23_G_Q35",
      marks: 1,
      question: "Ted wore a jacket as _______ .",
      options: {
        "1": "the weather was cold",
        "2": "the beach was far away",
        "3": "he loved walking along the beach",
      },
      answer: "1",
      solution: {
        method: "Literal Comprehension — Reason",
        steps: [
          "Read: 'he put on a jacket. Together with his dog, Dave, they went out for a walk. The strong wind blew against his face and the weather was cold.'",
          "The jacket was put on because the weather was cold. ✓",
          "Option (2): the beach being far away is mentioned later — not why he wore a jacket.",
          "Option (3): loving walks explains why he went out, not why he wore a jacket.",
          "Answer: (1) the weather was cold.",
        ],
        tip: "For 'reason' questions, look for the 'because' or the cause-effect relationship near the detail mentioned.",
      },
    },
    {
      id: "HP23_G_Q36",
      marks: 1,
      question: "_______ made Dave bark in excitement at the beach.",
      options: {
        "1": "Large leaves of a brown sea plant",
        "2": "Seawater rushing towards the shore",
        "3": "The 'dog' with two big eyes swimming in the sea",
      },
      answer: "2",
      solution: {
        method: "Literal Comprehension — Cause",
        steps: [
          "Read: 'Dave barked in excitement as the seawater rushed towards the shore.'",
          "The seawater rushing to shore made Dave bark. ✓",
          "Option (1): brown sea plant is mentioned later — related to the seal, not Dave's barking.",
          "Option (3): Ted spotted the creature AFTER Dave barked.",
          "Answer: (2) Seawater rushing towards the shore.",
        ],
        tip: "Find the exact sentence with Dave barking and look at what 'as/because/when' follows it.",
      },
    },
    {
      id: "HP23_G_Q37",
      marks: 1,
      question: "Why was the seal unable to swim freely?",
      options: {
        "1": "The seal was not a good swimmer.",
        "2": "The wind was blowing too strongly.",
        "3": "The seal was entangled in the sea plant.",
      },
      answer: "3",
      solution: {
        method: "Literal Comprehension — Reason",
        steps: [
          "Read: 'The seal had entangled itself in the large leaves of a brown sea plant. As the waves were too strong, it was unable to free itself.'",
          "Primary reason: entangled in the sea plant. ✓",
          "Option (1): Ted (not the seal) was not a good swimmer.",
          "Option (2): Strong waves are mentioned but the root cause is the entanglement.",
          "Answer: (3) The seal was entangled in the sea plant.",
        ],
        tip: "Go back to the exact paragraph about the seal. 'Entangled' = trapped/caught in.",
      },
    },
    {
      id: "HP23_G_Q38",
      marks: 1,
      question:
        "True or False: Ted and Dave went for a walk in the morning. (T/F)",
      answer: "False",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Read: 'After he had finished his dinner, he put on a jacket... they went out for a walk.'",
          "They went AFTER dinner → evening/night, not morning.",
          "Additionally: 'The stormy weather made the waves huge THAT NIGHT.'",
          "Answer: False.",
        ],
        tip: "For True/False, find the key detail in the text. 'After dinner' + 'that night' = evening walk.",
      },
    },
    {
      id: "HP23_G_Q39",
      marks: 1,
      question: "True or False: Ted saw the seal's ears first. (T/F)",
      answer: "False",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Read: 'He spotted a tiny head with two big eyes... Then, he saw two tiny ears and realised that it was a seal.'",
          "Ted saw the head and eyes FIRST, then the ears.",
          "Answer: False.",
        ],
        tip: "Sequence of events: head with big eyes → THEN tiny ears. Ears were seen second, not first.",
      },
    },
    {
      id: "HP23_G_Q40",
      marks: 1,
      question:
        "What does the word 'there' in the second paragraph refer to? Put a tick (✓) next to the correct answer.\n□ Ted's house\n□ The beach",
      answer: "The beach",
      solution: {
        method: "Vocabulary in Context — Pronoun Reference",
        steps: [
          "Read: 'The beach was only two kilometres from Ted's house, but the wind was blowing so strongly that it took him almost thirty minutes to reach THERE.'",
          "'There' = the destination he was going to = the beach. ✓",
          "'Ted's house' is where he started from, not where he was going.",
          "Answer: The beach.",
        ],
        tip: "For pronoun reference questions, find the word in the passage and look at what noun came before it in the same or previous sentence.",
      },
    },
    {
      id: "HP23_G_Q41",
      marks: 1,
      question:
        "Which sentence in the last paragraph tells you that Ted was happy with Dave? [1m]\nWrite it down.",
      answer: "Ted hugged Dave and praised his clever dog.",
      solution: {
        method: "Retrieval — Evidence from Text",
        steps: [
          "Look in the last paragraph for evidence of Ted's happiness with Dave.",
          "'Ted hugged Dave and praised his clever dog.' — hugging and praising = happiness and approval. ✓",
          "This is the sentence that shows Ted was pleased with Dave.",
          "Answer: Ted hugged Dave and praised his clever dog.",
        ],
        tip: "Emotions are often shown through actions: hugging = affection/happiness; praising = approval.",
      },
    },
    {
      id: "HP23_G_Q42",
      marks: 1,
      question:
        "Put a tick (✓) next to the word that best describes Dave.\nDave is _______ .\n□ timid\n□ brave\n□ disobedient",
      answer: "Brave",
      solution: {
        method: "Character Analysis — Inference",
        steps: [
          "Dave jumped into stormy, strong waves to help a seal — this required courage.",
          "'Brave' = showing courage in the face of danger. ✓",
          "'Timid' = fearful, shy — Dave jumped into the water without hesitation.",
          "'Disobedient' = not following instructions — no evidence of disobedience.",
          "Answer: Brave.",
        ],
        tip: "Character traits are inferred from actions. Dave jumping into strong waves to rescue = brave.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// PART II, SECTION H — Comprehension 2 (Q43–Q49)
// Passage: Fiona and True Friends
// Answer key: Q43=1, Q44=2, Q45=F, Q46=F, Q47=T, Q48=2,1,3, Q49a+b=open-ended
// ════════════════════════════════════════════════════════════

const comp2Passage = `
Fiona was the most popular girl in her class. She was kind and friendly to her classmates. She invited the whole class to her birthday party and gave everyone presents. She had so many friends but she did not have a true friend.

One day, everything changed. Mrs Lim, their teacher told the class to make three presents to give to three true friends. The students were having a great time making gifts.                                                [line 5]

When the students had shared out all their presents, Fiona was the only one who had not received one! She felt terrible and cried bitterly. How could it be possible? She had so many friends. One by one, her classmates consoled her, each spending a short time with her and then they left her alone.                                                    [line 10]

When she got home, she cried and asked her mother where she could find true friends.

"If you really want true friends, you will have to spend more time with your friends. You must show care for them and always be available, during good times and bad times," advised her mother.                               [line 15]

"But I want to be everybody's friend!" Fiona protested.

"There just isn't enough time to be available for everyone, so it's only possible to have a few true friends. The others will be playmates but they won't be your true friends," said her mother, wisely.

Fiona realised that she had been a good companion to everyone but not a true friend to anyone. That night, she decided to change her ways so that she could finally have some true friends.               [line 20]

Adapted from Fiona Famous written by Pedro Pablo Sacristán
`;

const sectionH: PassageSet = {
  kind: "B",
  id: "HP23_H_Comp2",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension 2 — Fiona and True Friends (Questions 43–49)",
  passage: comp2Passage,
  questions: [
    {
      id: "HP23_H_Q43",
      marks: 1,
      question: "Fiona had many friends because she _______ .",
      options: {
        "1": "was kind and friendly",
        "2": "enjoyed giving presents",
        "3": "spent time with each of them",
      },
      answer: "1",
      solution: {
        method: "Literal Comprehension — Reason",
        steps: [
          "Read: 'Fiona was the most popular girl in her class. She was kind and friendly to her classmates.'",
          "Being 'kind and friendly' is given as the description of why she was popular and had many friends. ✓",
          "Option (2): She gave presents, but the passage states this as an action, not the reason for having friends.",
          "Option (3): She spent only a short time with classmates (as consolers) — she wasn't spending quality time.",
          "Answer: (1) was kind and friendly.",
        ],
        tip: "Look at the opening description of why she was popular. The first paragraph sets up the reason.",
      },
    },
    {
      id: "HP23_H_Q44",
      marks: 1,
      question:
        "The word 'it' in paragraph 3 refers to Fiona not _______ .",
      options: {
        "1": "feeling good",
        "2": "receiving a present",
        "3": "having three true friends",
      },
      answer: "2",
      solution: {
        method: "Pronoun Reference",
        steps: [
          "Para 3: 'Fiona was the only one who had not received one! She felt terrible... How could IT be possible?'",
          "'It' refers to the situation described just before: Fiona NOT receiving a present.",
          "How could IT (= not receiving a present) be possible?",
          "Answer: (2) receiving a present.",
        ],
        tip: "For 'it refers to' questions, look at the sentence before. 'It' = the situation just described = not receiving a present.",
      },
    },
    {
      id: "HP23_H_Q45",
      marks: 1,
      question:
        "True or False: Fiona's classmates spent a long time to console her. (T/F)",
      answer: "F",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Read: 'One by one, her classmates consoled her, each spending a SHORT TIME with her and then they left her alone.'",
          "They spent a SHORT time — not a long time. → FALSE.",
          "Answer: F (False).",
        ],
        tip: "'A short time' vs 'a long time'. Always check the exact words — they often contain the key difference.",
      },
    },
    {
      id: "HP23_H_Q46",
      marks: 1,
      question:
        "True or False: Fiona's classmates did not like her. (T/F)",
      answer: "F",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "The passage says she was 'the most popular girl' — popular means people liked her.",
          "Her classmates consoled her (showed they cared) and made presents for others.",
          "The issue was she had no TRUE friend, not that they disliked her.",
          "Answer: F (False).",
        ],
        tip: "Don't confuse 'no true friends' with 'not liked'. Fiona was popular — people liked her, but friendship requires more depth.",
      },
    },
    {
      id: "HP23_H_Q47",
      marks: 1,
      question:
        "True or False: Fiona was not a true friend to any of her classmates. (T/F)",
      answer: "T",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Read: 'Fiona realised that she had been a good companion to everyone but not a true friend to anyone.'",
          "The text explicitly states she was NOT a true friend to anyone. → TRUE.",
          "Answer: T (True).",
        ],
        tip: "The last paragraph directly states this — always check the conclusion of the passage for summary statements.",
      },
    },
    {
      id: "HP23_H_Q48",
      marks: 1,
      question:
        "Write the numbers 1, 2 and 3 in the boxes below to arrange the sentences in order. (1m)\n\n___ Fiona's classmates did not give her any presents.\n___ Fiona gave all her classmates presents on her birthday.\n___ Fiona decided to change her ways so she could have true friends.",
      answer: "Fiona gave presents (1), classmates did not give her presents (2), Fiona decided to change (3).",
      solution: {
        method: "Sequencing Events",
        steps: [
          "Event 1: Fiona invited the class to her birthday and gave everyone presents. → Order: 1",
          "Event 2: Mrs Lim told them to make gifts for TRUE friends → Fiona received none. → Order: 2",
          "Event 3: That night, Fiona decided to change her ways. → Order: 3",
          "Boxes: classmates did not give her presents = 2; Fiona gave presents = 1; Fiona decided to change = 3.",
        ],
        tip: "Read through the whole passage first, then match events to their order of occurrence.",
      },
    },
    {
      id: "HP23_H_Q49",
      marks: 2,
      question:
        "List two things Fiona's mother advised her to do to find true friends. [2m]\n(a) ______\n(b) ______",
      answer:
        "(a) Spend more time with your friends. (b) Show care for them and always be available during good times and bad times.",
      solution: {
        method: "Retrieval — Two-Part Answer",
        steps: [
          "Find the mother's advice (lines 13–15):",
          "'If you really want true friends, you will have to SPEND MORE TIME with your friends.'",
          "'You must SHOW CARE for them and always BE AVAILABLE, during good times and bad times.'",
          "(a) Spend more time with friends.",
          "(b) Show care for them and be available during good times and bad times.",
        ],
        tip: "Multi-part answers: scan the passage for lists (words like 'and', numbers, bullet points). The mother gives two separate pieces of advice.",
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
  sectionE1,
  ...sectionE2,
  ...sectionF,
  sectionG,
  sectionH,
];

export default {
  meta,
  questions,
};
