// ============================================================
// Methodist Girls' School (Primary) — WA2 2023 Primary 3
// English Language Paper  (15 marks, 40 min)
// Sections: A Vocabulary MCQ (2) | B Grammar MCQ (2)
//           C Sentence Combining (2) | D Editing (4) | F Comprehension (5)
// ============================================================

import type {
  TopicType,
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Methodist Girls' School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2",
  year: 2023,
  totalMarks: 15,
  timeMinutes: 40,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Vocabulary MCQ  (Q1–Q2, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2023-q1",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Many animal species are endangered due to the loss of their __________ when forests are cleared.",
    options: [
      "(1) nature",
      "(2) habitats",
      "(3) sceneries",
      "(4) background",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: animals lose their __________ when forests are cleared.",
      steps: [
        "Forests are cleared → animals lose the places where they live.",
        "'habitats' = the natural environment/home of an animal or plant. CORRECT.",
        "'nature' = the natural world broadly → not the specific home of animals.",
        "'sceneries' = views/landscapes → not where animals LIVE.",
        "'background' = setting/history → not used for animal living places.",
        "Answer: (2) habitats.",
      ],
      tip: "Habitat = the natural home of an animal. Deforestation destroys habitats. Common P3 vocabulary: habitat, endangered, deforestation.",
    },
  },

  {
    kind: "A",
    id: "mgs2023-q2",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "As a young artist, Vincent van Gogh loved to go to the mountains and paint because the scenery was __________.",
    options: [
      "(1) blissful",
      "(2) bountiful",
      "(3) beaming",
      "(4) breathtaking",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: the word that best describes spectacular mountain scenery.",
      steps: [
        "Van Gogh loved to paint the mountain scenery → it must be visually stunning.",
        "'breathtaking' = so beautiful it takes your breath away → CORRECT for spectacular natural scenery.",
        "'blissful' = perfectly happy/contented → describes a feeling, not scenery.",
        "'bountiful' = producing large quantities; generous → usually used for harvest/gifts.",
        "'beaming' = radiating brightness/smiling → not used to describe landscapes.",
        "Answer: (4) breathtaking.",
      ],
      tip: "'Breathtaking scenery' = scenery so beautiful it amazes you. Fixed collocation in English for stunning natural views.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Grammar MCQ  (Q3–Q4, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2023-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Mother __________ in the kitchen when the delivery man rang the doorbell.",
    options: [
      "(1) cooks",
      "(2) cooked",
      "(3) is cooking",
      "(4) was cooking",
    ],
    answer: "4",
    solution: {
      method: "Past continuous: action in progress when another past event (doorbell rang) occurred.",
      steps: [
        "'when the delivery man rang the doorbell' → past moment (rang = simple past).",
        "Mother was in the MIDDLE of cooking when the doorbell rang → past continuous.",
        "(4) was cooking → past continuous → CORRECT.",
        "(2) cooked → simple past → implies a completed action, not ongoing.",
        "(3) is cooking → present → WRONG tense.",
        "Answer: (4) was cooking.",
      ],
      tip: "Past continuous = was/were + -ing. Used for action in progress WHEN another event occurred. 'Mother was cooking WHEN the doorbell rang.'",
    },
  },

  {
    kind: "A",
    id: "mgs2023-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The troupe of dancers __________ taking a break before their next performance begins in an hour's time.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "1",
    solution: {
      method: "Subject-verb agreement: 'troupe' is a collective noun (singular unit) → 'is'.",
      steps: [
        "Subject: 'The troupe of dancers' — 'troupe' is a collective noun.",
        "'troupe' = a group performing together AS ONE UNIT → singular verb.",
        "Present tense: 'before their next performance begins' → present/future context.",
        "(1) is → singular present → CORRECT.",
        "(2) are → plural → WRONG (troupe is singular).",
        "(3) was / (4) were → past → WRONG.",
        "Answer: (1) is.",
      ],
      tip: "Collective nouns (troupe, team, class, group) + 'of [plural]' = treated as singular UNIT: 'The troupe IS'. Compare: 'The team is playing well.'",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Sentence Combining  (Q5–Q6, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2023-q5",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Combine the two sentences into one using the word given.\n\nSentences: Jane passed the test. She did not study.\nConnecting word: Although (must begin the sentence)",
    answer:
      "Although Jane did not study, she passed the test.",
    solution: {
      method: "'Although' introduces a contrasting/surprising concession at the start.",
      steps: [
        "Surprising contrast: did NOT study → YET passed.",
        "'Although' starts the sentence (given instruction).",
        "Although [concession/surprising fact], [main result].",
        "Although Jane did not study, she passed the test.",
        "Comma required after the 'Although' clause.",
        "Answer: Although Jane did not study, she passed the test.",
      ],
      tip: "'Although' starting a sentence always needs a comma before the main clause. The 'although' clause contains the SURPRISING condition; the main clause has the RESULT.",
    },
  },

  {
    kind: "A",
    id: "mgs2023-q6",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Combine the two sentences into one using the word given.\n\nSentences: The students hurried to their seats. The students saw their teacher approaching.\nConnecting word: when",
    answer:
      "The students hurried to their seats when they saw their teacher approaching.",
    solution: {
      method: "'When' connects trigger (saw teacher) and response (hurried to seats).",
      steps: [
        "Trigger: saw teacher approaching. Response: hurried to seats.",
        "Structure: [main action] when [trigger].",
        "The students hurried to their seats when they saw their teacher approaching.",
        "Replace second 'The students' with 'they'.",
        "Answer: The students hurried to their seats when they saw their teacher approaching.",
      ],
      tip: "'When' connects two related past events. The 'when' clause can come first or second. No comma needed when 'when' is in the middle.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Editing  (Q7–Q10, 4 marks)
  //  Passage: Whales (spelling bold + grammar underlined)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2023-secD",
    topic: "Editing",
    marks: 4,
    passageTitle: "Whales",
    passageText:
      "Whales are often mistaken to be fish, which are cold-blooded animals that can change their body temperature according to their environment. However, whales are actually warm-blooded mammals with a thick layer of fat under their skin called blubber that helps to (7) [maintane] a body temperature around 37 degrees celsius(°C). Whales give birth to their young alive and nourish them with milk. Whale calves are fed with milk and protected by their parents for at least a year. Some whales have two blowholes while others have one. The breathing process (8) [involved] removing air from their lungs through the blowholes before forming an upward pout of air and water. This is (9) [forlowed] by taking in fresh air into the lungs. Whales also have blubber to (10) [helps] whales float in water. Do you know that whale blubber is also used to make candles, soap, and lubricating oil?",
    questions: [
      {
        qid: "mgs2023-q7",
        blankLabel: "(7)",
        question: "helps to (7) [maintane] a body temperature — correct the bold word (spelling).",
        answer: "maintain",
        solution: {
          method: "Spelling correction: 'maintane' → 'maintain'.",
          steps: [
            "'maintane' → wrong: 'tane' instead of 'tain'.",
            "Correct: main-TAIN → m-a-i-n-t-a-i-n.",
            "Maintain ends in '-tain' (like obtain, retain, attain, sustain).",
            "Answer: maintain.",
          ],
          tip: "Maintain = main + TAIN. Remember the -tain family: maintain, obtain, retain, sustain, attain. All end in -TAIN.",
        },
      },
      {
        qid: "mgs2023-q8",
        blankLabel: "(8)",
        question: "The breathing process (8) [involved] removing air — correct the underlined word (grammar).",
        answer: "involves",
        solution: {
          method: "Grammar: present tense needed — the breathing process is a general fact, not past.",
          steps: [
            "The passage describes how whales breathe in GENERAL (factual/scientific).",
            "General facts → SIMPLE PRESENT tense.",
            "Subject: 'The breathing process' → singular.",
            "'involves' → third person singular present → CORRECT.",
            "'involved' → past tense → WRONG for a general fact.",
            "Answer: involves.",
          ],
          tip: "Scientific facts and general truths → present simple. 'Water boils at 100°C.' 'The breathing process INVOLVES…' not 'involved'.",
        },
      },
      {
        qid: "mgs2023-q9",
        blankLabel: "(9)",
        question: "This is (9) [forlowed] by taking in fresh air — correct the bold word (spelling).",
        answer: "followed",
        solution: {
          method: "Spelling correction: 'forlowed' → 'followed'.",
          steps: [
            "'forlowed' → wrong: 'forl' instead of 'foll'.",
            "Correct: FOLL-owed → f-o-l-l-o-w-e-d.",
            "Follow + -ed = followed. Double L: foLLow.",
            "Answer: followed.",
          ],
          tip: "Follow → followed. Double L: foLLow. 'This is followed by' = this comes after that action.",
        },
      },
      {
        qid: "mgs2023-q10",
        blankLabel: "(10)",
        question: "Whales also have blubber to (10) [helps] whales float in water — correct the underlined word (grammar).",
        answer: "help",
        solution: {
          method: "Grammar: verb form after infinitive 'to' → base form.",
          steps: [
            "'have blubber to ______ whales float' → after 'to' (infinitive), use BASE FORM.",
            "'help' → base form → CORRECT.",
            "'helps' → third person singular present → WRONG after 'to'.",
            "Answer: help.",
          ],
          tip: "After 'to' (infinitive), always use the base form: to help, to float, to go. Never to helps, to floats.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Comprehension (Selected Response)
  //  (Q11–Q15, 5 marks)
  //  Passage: Blackie the Dog
  //  Adapted from: Chicken Soup for the Kids' Soul "The Game of Love"
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2023-secF",
    topic: "ComprehensionMCQ",
    marks: 5,
    passageTitle: "Blackie (adapted from Chicken Soup for the Kids' Soul 'The Game of Love')",
    passageText:
      "Two years ago, Father brought Blackie home from a fishing trip in the mountains. It was full of cuts and so thin that its ribs could be clearly seen.\n\n'Can we keep him, please?' John begged his parents. Father hesitated. He warned John that Blackie would grow to be a big dog and require a lot of care. Besides, it was in such a bad condition that it might not be able to survive. John persisted and promised to take full responsibility for Blackie before his parents agreed to his request. He kept to his word and ensured that Blackie had clean food, water and medicine daily.\n\nOver the months, Blackie became a big, strong dog and was John's best companion. Every weekday afternoon, Blackie would wait for John at the playground until he returned home from school. One day, John was playing a new game on his mobile phone and was not paying attention as he did his usual walk. Suddenly, he heard a loud screeching of brakes. To his horror, he turned around only to see Blackie sailing through the air before it laid motionlessly on the road.\n\nWhen John's parents rushed to the accident scene, John was wailing with remorse. 'It is all my fault. Blackie thought the car was going to hit me as I was not looking and the car was coming from behind me,' John explained.\n\nFather consoled him saying that it was a gesture of love from Blackie. John was there when Blackie needed help and Blackie was there when it thought John needed it. Fortunately, Blackie was not badly injured and John learnt to be more careful in future.",
    questions: [
      {
        qid: "mgs2023-q11",
        question:
          "TRUE or FALSE: John's father was reluctant to keep Blackie as a pet at first.",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'Father HESITATED. He warned John that Blackie would grow to be a big dog…it might not be able to survive.'",
            "Hesitated = was unwilling/reluctant. Father warned against keeping Blackie.",
            "Statement: 'reluctant to keep Blackie' → TRUE.",
            "Answer: True.",
          ],
          tip: "Reluctant = unwilling, hesitant. Father HESITATED = was reluctant. He warned John, showing he didn't want to keep Blackie at first.",
        },
      },
      {
        qid: "mgs2023-q12",
        question:
          "TRUE or FALSE: John blamed himself for Blackie's accident.",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraph 4.",
          steps: [
            "Paragraph 4: 'It is all MY FAULT. Blackie thought the car was going to hit me as I was not looking…'",
            "John says 'all my fault' → he blamed himself.",
            "Statement: TRUE.",
            "Answer: True.",
          ],
          tip: "'It is all my fault' = self-blame. John explicitly blamed himself for not paying attention.",
        },
      },
      {
        qid: "mgs2023-q13",
        question:
          "Why did John's father think that Blackie was in a bad condition and would not survive at first? [1m]",
        answer:
          "Blackie was full of cuts and so thin that its ribs could be clearly seen.",
        solution: {
          method: "Literal comprehension: paragraph 1 and paragraph 2.",
          steps: [
            "Paragraph 1: 'It was FULL OF CUTS and SO THIN that its ribs could be clearly seen.'",
            "Paragraph 2: 'it was in such a bad condition that it might not be able to survive.'",
            "The reasons: cuts + extreme thinness (visible ribs).",
            "Answer: Blackie was full of cuts and so thin that its ribs could be clearly seen.",
          ],
          tip: "Use the description from paragraph 1 to answer WHY Father thought Blackie was in bad condition.",
        },
      },
      {
        qid: "mgs2023-q14",
        question:
          "Which word has the same meaning as 'vowed'? Circle (A) or (B). [1m]\n\n'John persisted and promised that he would take full responsibility for Blackie before his parents agreed to his request.'\n                              (A)                                                           (B)",
        options: ["(A) promised", "(B) agreed"],
        answer: "A",
        solution: {
          method: "Vocabulary synonym: 'vowed' = made a solemn promise.",
          steps: [
            "'vowed' = made a serious, solemn promise.",
            "(A) 'promised' = committed to do something → SYNONYM of vowed. CORRECT.",
            "(B) 'agreed' = said yes/consented → different meaning.",
            "Answer: (A) promised.",
          ],
          tip: "Vowed = promised solemnly. 'John vowed to take care of Blackie' = 'John promised to take care of Blackie'. Very similar in meaning.",
        },
      },
      {
        qid: "mgs2023-q15",
        question:
          "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story. [1m]\n\n___ Blackie waited for John to return home from school.\n___ John promised to take full responsibility for Blackie.\n___ Blackie met with an accident.",
        answer:
          "Blackie waited for John to return home from school: 2\nJohn promised to take full responsibility for Blackie: 1\nBlackie met with an accident: 3",
        solution: {
          method: "Sequence comprehension: map events to passage order.",
          steps: [
            "Event 1 (paragraph 2): John PROMISED to take full responsibility → ORDER 1.",
            "Event 2 (paragraph 3): 'Blackie would WAIT for John at the playground until he returned home' → ORDER 2.",
            "Event 3 (paragraph 3): Blackie MET WITH AN ACCIDENT → ORDER 3.",
            "Sequence: Promise (1) → Waiting at playground (2) → Accident (3).",
          ],
          tip: "Paragraph 2 = promise. Paragraph 3 starts with the routine (waiting), then the accident. Follow paragraph order.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const mgs2023Paper = { meta, questions };
export default mgs2023Paper;
