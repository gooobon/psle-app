// ============================================================
// Nanyang Primary School — 2024 Term 2 Weighted Assessment (WA2)
// English Language, Primary 3
// Total: 20 marks, Duration: 40 min
// Sections: A Grammar MCQ (3) | B Vocabulary MCQ (3) | C Grammar Cloze (3)
//           D Editing Spelling (3) | E Comprehension (8)
// ============================================================

import type {
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Nanyang Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2 Term 2",
  year: 2024,
  totalMarks: 20,
  timeMinutes: 40,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  (A) GRAMMAR MCQ  (Q1–Q3, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "nanyang2024-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Carlos __________ the glass bottle as he was making tea for his family.",
    options: ["(1) break", "(2) broke", "(3) breaks", "(4) has broken"],
    answer: "2",
    solution: {
      method: "Past simple: 'as he was making tea' sets a past continuous context, Carlos's action is a completed past event.",
      steps: [
        "'as he was making tea' → past continuous context for what was happening.",
        "Carlos dropped/broke the bottle → completed past action → SIMPLE PAST.",
        "break → irregular: BROKE (past).",
        "(2) broke → CORRECT.",
        "(4) has broken → present perfect → usually for past with present relevance, not a narrative past.",
        "Answer: (2) broke.",
      ],
      tip: "Broke = simple past of break. When narrating a past event in a story, use simple past. 'Carlos broke the bottle' = it happened then.",
    },
  },

  {
    kind: "A",
    id: "nanyang2024-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "I bought some chocolates for my sister but __________ few that I have kept here in my lunchbox are for me.",
    options: ["(1) this", "(2) that", "(3) these", "(4) those"],
    answer: "3",
    solution: {
      method: "Demonstrative pronoun: 'few chocolates in my lunchbox' → plural + near (speaker is holding/near them).",
      steps: [
        "'few that I have kept here in my lunchbox' → the chocolates ARE HERE with the speaker → NEAR.",
        "'few' → PLURAL (more than one chocolate).",
        "Plural + near = THESE.",
        "(3) these → CORRECT.",
        "(4) those → plural + far → WRONG (they are HERE).",
        "Answer: (3) these.",
      ],
      tip: "'Here' signals nearness → THESE (plural) or THIS (singular). 'These few chocolates I kept here' = the ones right here with me.",
    },
  },

  {
    kind: "A",
    id: "nanyang2024-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The puppy's playful behaviour has brought __________ laughter to the children at the playground.",
    options: ["(1) few", "(2) little", "(3) much", "(4) many"],
    answer: "3",
    solution: {
      method: "Quantifier: 'laughter' is uncountable; context implies large amount.",
      steps: [
        "'laughter' = uncountable noun (you can't count individual laughters).",
        "Quantifiers for uncountable: much, little, some, a lot of.",
        "'has brought ______ laughter' → positive amount → MUCH (large amount).",
        "(3) much → CORRECT for uncountable positive.",
        "(1) few / (4) many → countable plural → WRONG.",
        "(2) little → small amount → contradicts 'playful behaviour' bringing joy.",
        "Answer: (3) much.",
      ],
      tip: "Much = large amount (uncountable). Many = large number (countable). Laughter is uncountable → much laughter.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  (B) VOCABULARY MCQ  (Q4–Q6, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "nanyang2024-q4",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My brother and I were still laughing over the funny scenes of the __________ we had watched at the cinema.",
    options: ["(1) match", "(2) parade", "(3) concert", "(4) comedy"],
    answer: "4",
    solution: {
      method: "Vocabulary: 'funny scenes' + 'laughing' → what kind of show has funny scenes?",
      steps: [
        "Clues: 'laughing over funny scenes' → a funny type of entertainment.",
        "'comedy' = a film/show intended to make people laugh → CORRECT.",
        "'match' = sports game → no funny scenes.",
        "'parade' = procession → no funny scenes.",
        "'concert' = music performance → not typically funny scenes.",
        "Answer: (4) comedy.",
      ],
      tip: "Comedy = funny film/show. 'Funny scenes' + 'laughing' → they watched a comedy at the cinema.",
    },
  },

  {
    kind: "A",
    id: "nanyang2024-q5",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The little girl tucked her hands into her pockets to keep them warm in the __________ weather.",
    options: [
      "(1) chilly",
      "(2) humid",
      "(3) glorious",
      "(4) pleasant",
    ],
    answer: "1",
    solution: {
      method: "Vocabulary: weather where you need to keep hands warm = cold weather.",
      steps: [
        "'tucked hands into pockets to keep warm' → the weather is COLD.",
        "'chilly' = cold enough to feel uncomfortable → CORRECT.",
        "'humid' = warm and damp → not cold.",
        "'glorious' = beautiful and sunny → not cold.",
        "'pleasant' = agreeable/comfortable → not cold.",
        "Answer: (1) chilly.",
      ],
      tip: "Chilly = uncomfortably cold (but not freezing). 'Keep hands warm in chilly weather' = natural expression.",
    },
  },

  {
    kind: "A",
    id: "nanyang2024-q6",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Bernard drove his truck __________ and as a result, he was stopped by the traffic police.",
    options: [
      "(1) calmly",
      "(2) forcefully",
      "(3) recklessly",
      "(4) vigorously",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: driving that gets stopped by traffic police → dangerous driving.",
      steps: [
        "Result: stopped by traffic police → he was driving DANGEROUSLY/ILLEGALLY.",
        "'recklessly' = without care for danger, in a way likely to cause harm → CORRECT for dangerous driving.",
        "'calmly' = peacefully → police don't stop calm drivers.",
        "'forcefully' = with force → unusual for driving.",
        "'vigorously' = with energy/enthusiasm → not a driving violation.",
        "Answer: (3) recklessly.",
      ],
      tip: "Reckless driving = driving without regard for safety. Traffic police stop reckless drivers. 'Drive recklessly' is a standard expression.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  (C) GRAMMAR CLOZE  (Q7–Q9, 3 marks)
  //  Passage: My Brother and I (computer games)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "nanyang2024-secC",
    topic: "GrammarCloze",
    marks: 3,
    passageTitle: "Gaming Instead of Homework",
    passageText:
      "My brother and I had been playing computer games the whole afternoon, much to our mother's dismay. She had been nagging at (7) __________ to complete our homework first but sadly, (8) __________ words had fallen on deaf ears.\n\nWhen I heard Mother coming towards my room, I quickly shut down my computer before she decided to fly into a rage and ban (9) __________ from playing computer games for the whole of next week. I knew that my brother, who was still playing computer games next door, was going to have to face the music.",
    wordBank: { A: "her", B: "my", C: "me", D: "him", E: "us", F: "our" },
    questions: [
      {
        qid: "nanyang2024-q7",
        blankLabel: "(7)",
        question: "She had been nagging at (7) __________ to complete our homework first.",
        answer: "E",
        solution: {
          method: "Object pronoun: Mother was nagging at both the speaker AND the brother → us.",
          steps: [
            "Mother nagged at 'my brother and I' (both of them) → object = US.",
            "E (us) → 'nagging at us' → CORRECT.",
            "C (me) → only one person → WRONG (both brother and speaker).",
            "Answer: E (us).",
          ],
          tip: "'Us' = both the speaker and the brother. Mother nagged at BOTH of them.",
        },
      },
      {
        qid: "nanyang2024-q8",
        blankLabel: "(8)",
        question: "…sadly, (8) __________ words had fallen on deaf ears.",
        answer: "A",
        solution: {
          method: "Possessive pronoun: whose words? — Mother's words.",
          steps: [
            "'(8) words had fallen on deaf ears' → the words belong to MOTHER (she was the one nagging).",
            "Mother = she/her → possessive = HER.",
            "A (her) → 'her words' = Mother's words → CORRECT.",
            "F (our) → 'our words' → the children's words → WRONG (it was Mother who spoke).",
            "Answer: A (her).",
          ],
          tip: "'Her words' = Mother's words. 'Fallen on deaf ears' = nobody listened. The children ignored Mother's nagging.",
        },
      },
      {
        qid: "nanyang2024-q9",
        blankLabel: "(9)",
        question: "…ban (9) __________ from playing computer games for the whole of next week.",
        answer: "C",
        solution: {
          method: "Object pronoun: who is being banned — the speaker (I).",
          steps: [
            "'she decided to fly into a rage and ban (9) from playing' → banning the SPEAKER.",
            "The speaker = I → object = ME.",
            "C (me) → 'ban me from playing' → CORRECT.",
            "E (us) → both → possible but the speaker quickly shut down their computer to avoid being banned; they were worried about themselves specifically.",
            "Answer: C (me).",
          ],
          tip: "'Ban me from playing' = stop me from playing. The speaker shut their computer to avoid being banned personally.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  (D) EDITING FOR SPELLING  (Q10–Q12, 3 marks)
  //  Passage: Mother's Day Dinner
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "nanyang2024-secD",
    topic: "Editing",
    marks: 3,
    passageTitle: "Mother's Day Dinner",
    passageText:
      "Janelle and her family went out for dinner to celebrate Mother's Day. They (10) chose Mother's [faveret] Italian restaurant. She ordered the seafood spaghetti and her little brother ordered the mushroom pizza.\n\n(11) Janelle and her brother [prisanted] their mother with a handmade bracelet (12) made of pearls. Mother did not expect to receive such a [spasial] gift from them.\n\nEveryone beamed with joy at the celebration as they were having a whale of a time.",
    questions: [
      {
        qid: "nanyang2024-q10",
        blankLabel: "(10)",
        question: "Mother's [faveret] Italian restaurant — correct the underlined word (spelling).",
        answer: "favourite",
        solution: {
          method: "Spelling correction: 'faveret' → 'favourite' (British) or 'favorite' (American).",
          steps: [
            "'faveret' → wrong vowels: 'aver' instead of 'avour'.",
            "Correct (British): f-a-v-o-u-r-i-t-e = favourite.",
            "Correct (American): f-a-v-o-r-i-t-e = favorite.",
            "Answer: favourite / favorite.",
          ],
          tip: "Favourite = fav-OUR-ite (British) / fav-OR-ite (American). Both accepted. Remember the 'ou' (British) or 'o' (American) in the middle.",
        },
      },
      {
        qid: "nanyang2024-q11",
        blankLabel: "(11)",
        question: "Janelle and her brother [prisanted] their mother with a handmade bracelet — correct the underlined word (spelling).",
        answer: "presented",
        solution: {
          method: "Spelling correction: 'prisanted' → 'presented'.",
          steps: [
            "'prisanted' → wrong: 'pris-ant' instead of 'present'.",
            "The word = gave as a gift → PRESENTED.",
            "Correct: p-r-e-s-e-n-t-e-d.",
            "Answer: presented.",
          ],
          tip: "Present (verb) = give as a gift. Past tense: presented. 'Presented her mother with a bracelet' = gave her mother a bracelet as a gift.",
        },
      },
      {
        qid: "nanyang2024-q12",
        blankLabel: "(12)",
        question: "such a [spasial] gift from them — correct the underlined word (spelling).",
        answer: "special",
        solution: {
          method: "Spelling correction: 'spasial' → 'special'.",
          steps: [
            "'spasial' → wrong: 'spasi' instead of 'speci'.",
            "Correct: s-p-e-c-i-a-l = special.",
            "Answer: special.",
          ],
          tip: "Special = spe-CIAL. Remember the 'c' before 'ial': spe-C-ial. Not 'spasial'.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  (E) COMPREHENSION  (Q13–Q19, 8 marks)
  //  Passage: Liam and the Muddy Shoes
  //  Adapted from "Online Short Story – Mr Henderson's Encouragement"
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "nanyang2024-secE",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "Liam and the Muddy Shoes (adapted from 'Mr Henderson's Encouragement')",
    passageText:
      "Liam searched through the shoe cabinet anxiously. The school bus was coming any minute, and he did not want to be late for school.\n\nThen, he looked at the back door. There they were, covered in mud on the door mat. He recalled the path was muddy when he took Rocky for a walk last night.\n\nLiam did not want to wear the pair of muddy shoes to school, but he had no other options. He groaned inwardly as he knew the bus driver would be clicking his tongue irritatedly. He sprinted hurriedly out of the door. When the bus driver saw Liam's muddy shoes, he grumbled loudly as Liam boarded the bus. All the other students turned to look at him and laughed at his muddy shoes.\n\nIn class, Mr Johnson greeted him with a big smile, 'Liam, I read the book summary you have submitted and I really enjoyed it. You have a special way with words.' Liam grinned with delight, 'Thanks, Mr Johnson! I really like that book.'\n\n'Great! There are more in the series. I'll show you after class,' replied Mr Johnson. Liam's eyes danced with delight. He loved books, but he had none at home. He did not think about his bad day anymore. All he thought about was Mr Johnson showing him the books after class. He loved reading books especially those about science and those that included magical elements.\n\nWhen class ended, Mr Johnson showed Liam a bookshelf full of books. Liam looked uncertainly at his teacher and asked, 'Can I borrow them?' Mr Johnson smiled, 'Take one at a time, and yes, you can read them all!' Liam beamed, 'Thanks, Sir. I can hardly wait!'",
    questions: [
      {
        qid: "nanyang2024-q13",
        question:
          "Fill in the blank with suitable words.\nLiam finally found his shoes on __________. [1m]",
        answer: "the door mat",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'There they were, covered in mud on THE DOOR MAT.'",
            "Answer: the door mat.",
          ],
          tip: "Liam found his shoes on the door mat at the back door, covered in mud.",
        },
      },
      {
        qid: "nanyang2024-q14",
        question:
          "Pick out a two-word phrase from paragraph 3 which shows that Liam did not want to miss the bus. [1m]",
        answer: "sprinted hurriedly",
        solution: {
          method: "Locate the two-word phrase showing urgency in paragraph 3.",
          steps: [
            "Paragraph 3: 'He SPRINTED HURRIEDLY out of the door.'",
            "'Sprinted hurriedly' = ran very fast → showing he was rushing to catch the bus.",
            "Answer: sprinted hurriedly.",
          ],
          tip: "Sprinted = ran fast. Hurriedly = in a hurry. Both words together show Liam was rushing to not miss the bus.",
        },
      },
      {
        qid: "nanyang2024-q15",
        question:
          "Which word has the same meaning as 'in annoyance'? Circle (A) or (B). [1m]\n\n'He groaned inwardly as he knew the bus driver would be clicking his tongue irritatedly.'\n                     (A)                                                              (B)",
        options: ["(A) inwardly", "(B) irritatedly"],
        answer: "B",
        solution: {
          method: "Synonym: 'in annoyance' = with irritation/annoyance.",
          steps: [
            "'in annoyance' = with irritation, feeling annoyed.",
            "(A) 'inwardly' = inside himself, silently → describes HOW he groaned, not annoyance.",
            "(B) 'irritatedly' = in an annoyed/irritated manner → SYNONYM of 'in annoyance'. CORRECT.",
            "Answer: (B) irritatedly.",
          ],
          tip: "Irritatedly = in annoyance/with irritation. Both describe the same state of being annoyed.",
        },
      },
      {
        qid: "nanyang2024-q16",
        question:
          "Using information from paragraph 3, complete the sentences to show how the following characters were unkind to Liam. [2m]\na) The bus driver __________.\nb) The other students __________.",
        answer:
          "a) The bus driver grumbled loudly (as Liam boarded the bus).\nb) The other students laughed at Liam / at his muddy shoes.",
        solution: {
          method: "Literal comprehension: paragraph 3 — identify unkind actions of each character.",
          steps: [
            "Paragraph 3: 'the bus driver…GRUMBLED LOUDLY as Liam boarded the bus.'",
            "'All the other students turned to look at him and LAUGHED AT HIS MUDDY SHOES.'",
            "(a) Bus driver: grumbled loudly.",
            "(b) Other students: laughed at Liam/his muddy shoes.",
          ],
          tip: "2-mark answer: each character's unkind action. (a) grumbled loudly; (b) laughed at his muddy shoes.",
        },
      },
      {
        qid: "nanyang2024-q17",
        question:
          "Write 1, 2 and 3 in the blanks to show what happened first, next, and last. [1m]\n___ Liam wrote a book summary.\n___ Liam could not find his school shoes.\n___ Liam was praised by Mr Johnson for his good work.",
        answer:
          "Liam wrote a book summary: 1\nLiam could not find his school shoes: 2\nLiam was praised by Mr Johnson for his good work: 3",
        solution: {
          method: "Sequence: determine chronological order from the passage.",
          steps: [
            "Before the story: Liam had WRITTEN a book summary (referred to in paragraph 4, past action). ORDER: 1",
            "Start of story: Liam COULD NOT FIND his shoes (paragraph 1-2). ORDER: 2",
            "In class: Mr Johnson PRAISED Liam for the book summary (paragraph 4). ORDER: 3",
          ],
          tip: "The book summary was written before the events of that morning. Finding the shoes is the start of the story. Praise happens later in class.",
        },
      },
      {
        qid: "nanyang2024-q18",
        question:
          "Tick the word that best describes how Liam felt when he was told by Mr Johnson that he could borrow more books from the shelf. [1m]\n☐ excited  ☐ impatient  ☐ embarrassed",
        options: ["excited", "impatient", "embarrassed"],
        answer: "excited",
        solution: {
          method: "Inference: what emotion did Liam show when told he could borrow books?",
          steps: [
            "Paragraph 6: 'Liam BEAMED, \"Thanks, Sir. I can hardly wait!\"'",
            "'Beamed' = smiled broadly with joy. 'Can hardly wait' = very eager/excited.",
            "'excited' = very happy and eager → CORRECT.",
            "'impatient' = annoyed at waiting → not the same as eager excitement.",
            "'embarrassed' → negative emotion → WRONG (Liam was happy).",
            "Answer: excited.",
          ],
          tip: "'Beamed' and 'can hardly wait' = signs of excitement. Liam was delighted to be able to borrow books.",
        },
      },
      {
        qid: "nanyang2024-q19",
        question:
          "TRUE or FALSE: Liam was only interested in books about science. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 5.",
          steps: [
            "Paragraph 5: 'He loved reading books especially those about SCIENCE and those that included MAGICAL ELEMENTS.'",
            "Liam liked BOTH science books AND books with magical elements.",
            "Statement: 'only interested in science' → WRONG (also liked magical elements).",
            "Answer: False.",
          ],
          tip: "Key word: 'only'. Liam liked science AND magical elements books. 'Only science' is too narrow and incorrect.",
        },
      },
    ],
  },
];

export const nanyang2024Paper = { meta, questions };
export default nanyang2024Paper;
