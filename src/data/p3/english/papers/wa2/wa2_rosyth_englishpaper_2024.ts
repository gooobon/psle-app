// ============================================================
// Rosyth School — WA2 2024 (Term Two) Primary 3
// English Language  (Booklet A: 12 marks + Booklet B: 23 marks = 35 marks total)
// Duration: 50 minutes
// Booklet A: Grammar MCQ (4) | Vocabulary MCQ (3) | Visual Text (5)
// Booklet B: Grammar Cloze (4) | Vocab Cloze (4) | Sentence Manipulation (2)
//            Comprehension Cloze FIB (3) | Comprehension OE (10)
// ============================================================

import type {
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Rosyth School",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2 Term Two",
  year: 2024,
  totalMarks: 35,
  timeMinutes: 50,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  BOOKLET A — SECTION A: Grammar MCQ  (Q1–Q4, 4 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "rosyth2024-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Both Sarah and Jack __________ chosen to represent the school in the storytelling competition last year.",
    options: ["(1) is", "(2) was", "(3) are", "(4) were"],
    answer: "4",
    solution: {
      method: "Subject-verb agreement + past tense: 'Both…and' = plural; 'last year' = past.",
      steps: [
        "'Both Sarah and Jack' → joined by 'both…and' → PLURAL subject.",
        "'last year' → PAST tense.",
        "Plural past tense of 'to be' = WERE.",
        "(4) were → CORRECT.",
        "(2) was → singular past → WRONG.",
        "Answer: (4) were.",
      ],
      tip: "'Both X and Y' always takes a plural verb. Past tense: were (plural), was (singular). 'Both Sarah and Jack were chosen.'",
    },
  },

  {
    kind: "A",
    id: "rosyth2024-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question: "I __________ a midnight movie when someone knocked on the door.",
    options: [
      "(1) watch",
      "(2) will watch",
      "(3) have watched",
      "(4) was watching",
    ],
    answer: "4",
    solution: {
      method: "Past continuous: action in progress when another past event (knocking) occurred.",
      steps: [
        "'when someone knocked on the door' → past event that interrupted.",
        "The movie watching was ONGOING when the knock happened → PAST CONTINUOUS.",
        "(4) was watching → past continuous → CORRECT.",
        "(1) watch → present → WRONG.",
        "(3) have watched → present perfect → WRONG for this narrative context.",
        "Answer: (4) was watching.",
      ],
      tip: "Past continuous (was/were + -ing) = ongoing action. Simple past (knocked) = interrupting event. 'I was watching WHEN someone knocked.'",
    },
  },

  {
    kind: "A",
    id: "rosyth2024-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"__________ shirt that I am wearing now is too big for me," I told my brother.',
    options: ["(1) That", "(2) These", "(3) This", "(4) Those"],
    answer: "3",
    solution: {
      method: "Demonstrative pronoun: shirt = singular; 'I am wearing now' = near the speaker.",
      steps: [
        "Subject: 'shirt' → SINGULAR noun.",
        "'I am wearing NOW' → the speaker is wearing it → NEAR.",
        "Singular + near = THIS.",
        "(3) This → CORRECT.",
        "(1) That → singular but far → WRONG (wearing it now = near).",
        "(2) These / (4) Those → plural → WRONG.",
        "Answer: (3) This.",
      ],
      tip: "This + singular + near. You wear the shirt ON your body = very near to you → THIS shirt.",
    },
  },

  {
    kind: "A",
    id: "rosyth2024-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Sally looked __________ to see a pretty bird perched on a branch above her.",
    options: ["(1) up", "(2) down", "(3) behind", "(4) under"],
    answer: "1",
    solution: {
      method: "Preposition/adverb of direction: bird is on a branch ABOVE → look UP.",
      steps: [
        "The bird was on a branch ABOVE her → she looked UPWARD.",
        "'looked up' = directed gaze upward → CORRECT.",
        "(2) down → look downward → WRONG (bird is above).",
        "(3) behind → look backward → WRONG.",
        "(4) under → look below → WRONG.",
        "Answer: (1) up.",
      ],
      tip: "Bird perched ABOVE = look UP. Direction matches the bird's location relative to Sally.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET A — SECTION B: Vocabulary MCQ  (Q5–Q7, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "rosyth2024-q5",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Animals such as rabbits have white fur that help __________ them from their predators.",
    options: [
      "(1) cover",
      "(2) disguise",
      "(3) shelter",
      "(4) camouflage",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: fur that helps animals hide from predators = camouflage.",
      steps: [
        "White fur helps rabbits blend into snow so predators can't see them.",
        "'camouflage' = use colour/pattern to blend into surroundings and avoid detection → CORRECT.",
        "'cover' = put something over → doesn't specifically mean hide from predators.",
        "'disguise' = change appearance → possible but 'camouflage' is the precise term for animals.",
        "'shelter' = provide protection from weather → WRONG.",
        "Answer: (4) camouflage.",
      ],
      tip: "Camouflage = natural colouring/pattern that helps animals blend in and hide from predators. White fur on snow = camouflage.",
    },
  },

  {
    kind: "A",
    id: "rosyth2024-q6",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My mother always crosses her arms and __________ at us for making too much noise during bedtime.",
    options: ["(1) peeks", "(2) glares", "(3) peers", "(4) gazes"],
    answer: "2",
    solution: {
      method: "Vocabulary: the look a mother gives when angry about noise.",
      steps: [
        "Context: arms crossed + noise during bedtime → mother is ANGRY.",
        "'glares' = stares angrily and intensely at someone → CORRECT.",
        "'peeks' = looks quickly/secretly → not an angry look.",
        "'peers' = looks carefully/closely → curiosity, not anger.",
        "'gazes' = looks steadily with admiration → not anger.",
        "Answer: (2) glares.",
      ],
      tip: "Glare = stare angrily. When crossed arms + noise → angry stare = glare. 'My mother glares at us' = looks at us angrily.",
    },
  },

  {
    kind: "A",
    id: "rosyth2024-q7",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The kind and considerate girl __________ gave up her seat on the bus for the elderly woman.",
    options: [
      "(1) diligently",
      "(2) hesitantly",
      "(3) thoughtfully",
      "(4) reluctantly",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: 'kind and considerate' → gave up seat willingly and with care.",
      steps: [
        "The girl is described as 'kind and considerate' → she gave the seat with care/kindness.",
        "'thoughtfully' = in a considerate, caring way; with regard for others → CORRECT.",
        "'diligently' = with hard work/persistence → not about how you give up a seat.",
        "'hesitantly' = with uncertainty/reluctance → OPPOSITE of kind and considerate.",
        "'reluctantly' = unwillingly → OPPOSITE (she was kind and willing).",
        "Answer: (3) thoughtfully.",
      ],
      tip: "Thoughtfully = in a considerate, caring way. A kind and considerate person gives up their seat THOUGHTFULLY (happily and considerately).",
    },
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET A — SECTION C: Visual Text  (Q8–Q12, 5 marks)
  //  Advertisement: Animal Lover Poster Contest
  //  Organised by Evergreen Club, Sponsored by Sunshine Company
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rosyth2024-secC",
    topic: "VisualText",
    marks: 5,
    passageTitle: "Animal Lover Poster Contest — Advertisement",
    passageText: `
ADVERTISEMENT TEXT:
Title: Animal Lover Poster Contest
Tagline: Sponsored by Sunshine Company — Let your creativity shine!
Dates: 1 May 2024 – 10 June 2024

AN ANNUAL ART CONTEST FOR STUDENTS:
The Animal Lover Poster Contest for all primary school students is organised by Evergreen Club.
This year's theme is "A Better Home for Animals".
12 finalists will be selected on 11 June 2024 and their posters will be exhibited at the community centres in Singapore on 20 June 2024.

PRIZES:
Grand Prize:
• $500 cash
• A trophy and a pair of tickets to the Singapore Zoo
All the other 11 finalists will each receive:
• $50 Book Voucher
• A certificate of achievement

CONTEST INFORMATION:
• Entry forms can be downloaded from www.evergreenclub.com.
• All completed entry forms and posters should be submitted to Evergreen Club (10 Evergreen Avenue) by 10 June 2024.
• For more information, please contact the Evergreen Club Hotline at 6222 7167 from 9am to 5pm.
• Posters by last year's finalists for the themes "Beautiful Gardens" and "Peace" can be viewed at www.evergreenclub.com.
    `.trim(),
    questions: [
      {
        qid: "rosyth2024-q8",
        question:
          "The poster contest is sponsored by __________.\n(1) Evergreen Club\n(2) Sunshine Company\n(3) community centres\n(4) all primary schools",
        options: [
          "(1) Evergreen Club",
          "(2) Sunshine Company",
          "(3) community centres",
          "(4) all primary schools",
        ],
        answer: "2",
        solution: {
          method: "Literal reading: 'Sponsored by Sunshine Company' is stated directly.",
          steps: [
            "The ad states: 'Sponsored by SUNSHINE COMPANY'.",
            "Evergreen Club = ORGANISER (not sponsor).",
            "(2) Sunshine Company → CORRECT.",
            "Answer: (2) Sunshine Company.",
          ],
          tip: "Distinguish: Organiser (Evergreen Club) vs Sponsor (Sunshine Company). 'Sponsored by' is directly stated.",
        },
      },
      {
        qid: "rosyth2024-q9",
        question:
          "The theme for the 2024 Art Contest is __________.\n(1) Peace\n(2) Animal Lover\n(3) Beautiful Gardens\n(4) A Better Home for Animals",
        options: [
          "(1) Peace",
          "(2) Animal Lover",
          "(3) Beautiful Gardens",
          "(4) A Better Home for Animals",
        ],
        answer: "4",
        solution: {
          method: "Literal reading: 'This year's theme is…'",
          steps: [
            "Ad states: 'This year's theme is \"A BETTER HOME FOR ANIMALS\".'",
            "(4) A Better Home for Animals → CORRECT.",
            "(1) Peace and (3) Beautiful Gardens → LAST YEAR'S themes.",
            "(2) Animal Lover → the contest NAME, not the theme.",
            "Answer: (4) A Better Home for Animals.",
          ],
          tip: "This year's theme ≠ last year's themes. 'Beautiful Gardens' and 'Peace' were previous years. 2024 theme = 'A Better Home for Animals'.",
        },
      },
      {
        qid: "rosyth2024-q10",
        question:
          "Posters submitted by this year's finalists can be viewed __________.\n(1) at Evergreen Club\n(2) in all primary schools\n(3) at the Singapore Zoo\n(4) at the community centres",
        options: [
          "(1) at Evergreen Club",
          "(2) in all primary schools",
          "(3) at the Singapore Zoo",
          "(4) at the community centres",
        ],
        answer: "4",
        solution: {
          method: "Literal reading: where are finalists' posters exhibited?",
          steps: [
            "Ad: '12 finalists…their posters will be exhibited at the COMMUNITY CENTRES in Singapore on 20 June 2024.'",
            "(4) at the community centres → CORRECT.",
            "(1) Evergreen Club → where you SUBMIT entries, not where they're exhibited.",
            "(3) Singapore Zoo → prize (tickets), not exhibition venue.",
            "Answer: (4) at the community centres.",
          ],
          tip: "Exhibition (where posters are shown) = community centres. Submission (where you send entries) = Evergreen Club.",
        },
      },
      {
        qid: "rosyth2024-q11",
        question:
          "Completed entry forms must be submitted by __________.\n(1) 1 May 2024\n(2) 10 June 2024\n(3) 11 June 2024\n(4) 20 June 2024",
        options: [
          "(1) 1 May 2024",
          "(2) 10 June 2024",
          "(3) 11 June 2024",
          "(4) 20 June 2024",
        ],
        answer: "2",
        solution: {
          method: "Literal reading: submission deadline.",
          steps: [
            "Ad: 'All completed entry forms and posters should be submitted to Evergreen Club…by 10 JUNE 2024.'",
            "(2) 10 June 2024 → submission deadline → CORRECT.",
            "(3) 11 June 2024 → when finalists are SELECTED.",
            "(4) 20 June 2024 → when posters are EXHIBITED.",
            "Answer: (2) 10 June 2024.",
          ],
          tip: "Three key dates: 10 June = submission deadline; 11 June = finalists selected; 20 June = exhibition. Match the question to the right event.",
        },
      },
      {
        qid: "rosyth2024-q12",
        question:
          "Which one of the following is true of Animal Lover Poster Contest?\n(1) All 12 finalists will receive prizes.\n(2) All prize winners will receive $500.\n(3) All the winners will get to visit the Singapore Zoo.\n(4) Each winner will receive a certificate of achievement.",
        options: [
          "(1) All 12 finalists will receive prizes.",
          "(2) All prize winners will receive $500.",
          "(3) All the winners will get to visit the Singapore Zoo.",
          "(4) Each winner will receive a certificate of achievement.",
        ],
        answer: "1",
        solution: {
          method: "Evaluate each option against the advertisement facts.",
          steps: [
            "(1) All 12 finalists receive prizes → Grand Prize winner gets $500+trophy+zoo tickets; the OTHER 11 each get $50 Book Voucher + certificate. ALL 12 DO receive prizes → TRUE.",
            "(2) All receive $500 → ONLY the Grand Prize winner gets $500. Other 11 get $50 book voucher → FALSE.",
            "(3) All winners visit Singapore Zoo → ONLY the Grand Prize winner gets zoo tickets → FALSE.",
            "(4) Each winner receives a certificate → ONLY the 11 non-grand-prize finalists get certificates; the Grand Prize winner gets a trophy, not mentioned to have certificate → FALSE.",
            "Answer: (1).",
          ],
          tip: "Grand Prize (1 winner): $500 + trophy + zoo tickets. Other 11 finalists: $50 book voucher + certificate. ALL 12 receive SOME prize → option (1) is correct.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET B — SECTION D: Grammar Cloze  (Q13–Q16, 4 marks)
  //  Passage: Alice and Grandfather in the Park
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rosyth2024-secD",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Alice and Grandfather in the Park",
    passageText:
      "It was the June holidays. Alice happily walked with (13) __________ grandfather through the trail in the park. She admired the colourful flowers and sniffed (14) __________.\n\nThe flowers smelled amazing. Alice felt as if (15) __________ was in a magical forest. Grandfather shared interesting facts about the plants. As Alice and her grandfather explored further, (16) __________ found hidden paths and beautiful spots. It was a day that Alice and her grandfather would remember fondly.",
    wordBank: { A: "her", B: "she", C: "their", D: "it", E: "them", F: "they" },
    questions: [
      {
        qid: "rosyth2024-q13",
        blankLabel: "(13)",
        question: "Alice happily walked with (13) __________ grandfather through the trail.",
        answer: "A",
        solution: {
          method: "Possessive pronoun: Alice's grandfather → her grandfather.",
          steps: [
            "Alice walked with Alice's grandfather → possessive for she = HER.",
            "A (her) → 'her grandfather' → CORRECT.",
            "Answer: A (her).",
          ],
          tip: "Alice = she → her (possessive). 'Her grandfather' = Alice's grandfather.",
        },
      },
      {
        qid: "rosyth2024-q14",
        blankLabel: "(14)",
        question: "She admired the colourful flowers and sniffed (14) __________.",
        answer: "E",
        solution: {
          method: "Object pronoun: she sniffed the flowers → sniffed them.",
          steps: [
            "She sniffed the FLOWERS (plural) → object pronoun = THEM.",
            "E (them) → 'sniffed them' → CORRECT.",
            "D (it) → singular → WRONG (flowers is plural).",
            "Answer: E (them).",
          ],
          tip: "'Them' replaces plural nouns (flowers). She sniffed THEM = sniffed the flowers.",
        },
      },
      {
        qid: "rosyth2024-q15",
        blankLabel: "(15)",
        question: "Alice felt as if (15) __________ was in a magical forest.",
        answer: "B",
        solution: {
          method: "Subject pronoun: Alice felt as if Alice was in a forest → she.",
          steps: [
            "'Alice felt as if ______ was in a magical forest.'",
            "The subject of the 'as if' clause = Alice → SHE.",
            "B (she) → 'as if she was in a magical forest' → CORRECT.",
            "Answer: B (she).",
          ],
          tip: "Alice = she. In the 'as if' clause, the subject is still Alice → she.",
        },
      },
      {
        qid: "rosyth2024-q16",
        blankLabel: "(16)",
        question: "As Alice and her grandfather explored further, (16) __________ found hidden paths and beautiful spots.",
        answer: "F",
        solution: {
          method: "Subject pronoun: Alice and grandfather (two people) → they.",
          steps: [
            "Subject: 'Alice and her grandfather' → two people → THEY.",
            "F (they) → 'they found hidden paths' → CORRECT.",
            "Answer: F (they).",
          ],
          tip: "Alice AND her grandfather = two people = they (plural subject pronoun).",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET B — SECTION E: Vocabulary Cloze  (Q17–Q20, 4 marks)
  //  Passage: Sarah at the Dentist
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rosyth2024-secE",
    topic: "VocabCloze",
    marks: 4,
    passageTitle: "Sarah at the Dentist",
    passageText:
      "Sarah clutched her mother's hand tightly as they entered the dentist's office. The sharp tools on the tray looked scary and she could not help but (17) __________ in fear. Mother (18) __________ encouragingly, but Sarah still felt nervous sitting on the dentist's chair. The drill sounded like a monster, adding to her (19) __________. Mother (20) __________ comforting words into Sarah's ears. Sarah closed her eyes, ready to face her fear.",
    wordBank: {
      A: "anxiety",
      B: "excitement",
      C: "roared",
      D: "shiver",
      E: "whispered",
      F: "smiled",
    },
    questions: [
      {
        qid: "rosyth2024-q17",
        blankLabel: "(17)",
        question: "she could not help but (17) __________ in fear.",
        answer: "D",
        solution: {
          method: "Vocabulary: physical reaction to fear.",
          steps: [
            "'could not help but ______ in fear' → an involuntary reaction to being scared.",
            "D (shiver) = tremble/shake involuntarily → 'shiver in fear' = a natural fear response. CORRECT.",
            "C (roared) → shouted loudly → unlikely in a dentist's office.",
            "Answer: D (shiver).",
          ],
          tip: "'Shiver in fear' = shake/tremble from being scared. A natural physical reaction. 'Shiver with cold' or 'shiver in fear'.",
        },
      },
      {
        qid: "rosyth2024-q18",
        blankLabel: "(18)",
        question: "Mother (18) __________ encouragingly.",
        answer: "F",
        solution: {
          method: "Vocabulary: what a mother does with her face to encourage her child.",
          steps: [
            "'Mother ______ encouragingly' → a positive, reassuring action.",
            "F (smiled) → 'Mother smiled encouragingly' = gave a reassuring smile. CORRECT.",
            "E (whispered) → would need 'Mother whispered encouragingly' → possible but 'smiled encouragingly' is more natural as a non-verbal gesture of comfort.",
            "Answer: F (smiled).",
          ],
          tip: "'Smiled encouragingly' = gave a smile to encourage/reassure. A mother's encouraging smile helps ease fear.",
        },
      },
      {
        qid: "rosyth2024-q19",
        blankLabel: "(19)",
        question: "The drill sounded like a monster, adding to her (19) __________.",
        answer: "A",
        solution: {
          method: "Vocabulary: the emotion that increases when the drill sounds like a monster.",
          steps: [
            "The scary drill adds to Sarah's FEAR/WORRY.",
            "A (anxiety) = worry, nervousness, fear → 'adding to her anxiety'. CORRECT.",
            "B (excitement) → positive emotion → WRONG (the drill is scary, not exciting).",
            "Answer: A (anxiety).",
          ],
          tip: "Anxiety = feeling of worry and nervousness. A scary drill adds to anxiety (not excitement). 'Adding to her anxiety' = making her more scared.",
        },
      },
      {
        qid: "rosyth2024-q20",
        blankLabel: "(20)",
        question: "Mother (20) __________ comforting words into Sarah's ears.",
        answer: "E",
        solution: {
          method: "Vocabulary: how you say comforting words quietly into someone's ear.",
          steps: [
            "'______ comforting words into Sarah's ears' → words said quietly and softly.",
            "E (whispered) = spoke very softly → 'whispered comforting words' = said soft, quiet words to comfort. CORRECT.",
            "C (roared) → shouted loudly → OPPOSITE of quiet, comforting words.",
            "Answer: E (whispered).",
          ],
          tip: "'Whispered comforting words into her ears' = spoke very softly and gently to comfort her. Whispering into someone's ear implies closeness and gentleness.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET B — SECTION F: Sentence Manipulation  (Q21–Q22, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "rosyth2024-q21",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence with the same meaning.\n\nSam stood on a chair. He could reach the top of the shelf.\n\n__________ so that __________",
    answer:
      "Sam stood on a chair so that he could reach the top of the shelf.",
    solution: {
      method: "'So that' expresses purpose: the reason for an action.",
      steps: [
        "'So that' introduces the PURPOSE of the action.",
        "Sam stood on the chair FOR THE PURPOSE OF reaching the top shelf.",
        "Sam stood on a chair so that he could reach the top of the shelf.",
        "Answer: Sam stood on a chair so that he could reach the top of the shelf.",
      ],
      tip: "'So that + can/could' expresses purpose. 'He stood on a chair SO THAT he COULD reach' = the chair was the means, reaching was the goal.",
    },
  },

  {
    kind: "A",
    id: "rosyth2024-q22",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence with the same meaning.\n\nThe train was delayed. We took the bus.\n\nSince __________",
    answer:
      "Since the train was delayed, we took the bus.",
    solution: {
      method: "'Since' expresses reason/cause.",
      steps: [
        "'Since' = because / given that → introduces the reason.",
        "The train being delayed CAUSED them to take the bus.",
        "Structure: Since [reason/cause], [result].",
        "Since the train was delayed, we took the bus.",
        "Comma after the 'since' clause when it comes first.",
        "Answer: Since the train was delayed, we took the bus.",
      ],
      tip: "'Since' = because (in this context). 'Since the train was delayed' = because the train was delayed. Comma before the main clause.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET B — SECTION G: Comprehension Cloze FIB (Q23–Q25, 3 marks)
  //  Passage: Leya and Friends Raise Funds for SPCA
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rosyth2024-secG",
    topic: "ComprehensionFIB",
    marks: 3,
    passageTitle: "Helping Animals (adapted from channelnewsasia.com)",
    passageText:
      "Leya, who loves animals and enjoys drawing, gathered her friends to do something special. They wanted to help the rescued animals at the Society for the Prevention of Cruelty to Animals (SPCA) by raising funds. During their free time, Leya and her friends (23) __________ cute animal pictures on bookmarks and designed animal keychains. They added messages on the bookmarks to share how important it is to take good care (24) __________ animals. After getting permission from their teacher, they set (25) __________ booths in the school canteen. Over the next three days, they sold their creations and they felt happy knowing they had made a difference.",
    questions: [
      {
        qid: "rosyth2024-q23",
        blankLabel: "(23)",
        question: "Leya and her friends (23) __________ cute animal pictures on bookmarks.",
        answer: "drew",
        solution: {
          method: "Fill-in-the-blank: Leya enjoys drawing → drew pictures on bookmarks.",
          steps: [
            "Leya 'enjoys drawing' → she DREW pictures.",
            "Narrative in past tense → past tense of draw = DREW.",
            "Answer: drew.",
          ],
          tip: "Draw → drew (simple past). 'Drew cute animal pictures on bookmarks' = made drawings of animals on bookmarks.",
        },
      },
      {
        qid: "rosyth2024-q24",
        blankLabel: "(24)",
        question: "…how important it is to take good care (24) __________ animals.",
        answer: "of",
        solution: {
          method: "Fixed prepositional phrase: 'take care OF'.",
          steps: [
            "'take good care ______ animals' → fixed phrase 'take care OF'.",
            "Answer: of.",
          ],
          tip: "'Take care of' = fixed phrase. 'Take care OF animals' = look after animals. Always 'of' after 'care' when an object follows.",
        },
      },
      {
        qid: "rosyth2024-q25",
        blankLabel: "(25)",
        question: "…they set (25) __________ booths in the school canteen.",
        answer: "up",
        solution: {
          method: "Phrasal verb: 'set up' booths = assembled/established booths.",
          steps: [
            "'Set ______ booths' → phrasal verb for establishing/assembling booths.",
            "'set up' = establish, create, assemble → 'set up booths'. CORRECT.",
            "Answer: up.",
          ],
          tip: "'Set up' = establish or assemble something. 'Set up booths in the canteen' = assembled/created the selling stalls.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET B — SECTION H: Comprehension OE  (Q26–Q34, 10 marks)
  //  Passage: The Race (Sam, Ben, John and Ali)
  //  Adapted from "The Race" by Heather Klassen, Chicken Soup for the Kid's Soul
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rosyth2024-secH",
    topic: "ComprehensionOE",
    marks: 10,
    passageTitle: "The Race (adapted from 'The Race' by Heather Klassen, Chicken Soup for the Kid's Soul)",
    passageText:
      "Sam and Ben positioned their boat carefully at the starting line, eager for the race to start. After training diligently for the past few months, they were determined to win the race. It was their final chance to compete in the junior category.\n\nBang! The race had started. Sam and Ben paddled as fast as they could. Their boat shot ahead and they were in the lead. The boys felt confident about winning. However, they noticed their competitors, John and Ali, coming up fast beside them. Not wanting to lose, Sam and Ben paddled even harder.\n\nSuddenly, Sam heard a loud splash! He looked back and noticed that John and Ali had dropped their rowing oars into the water. Unable to move their boat, they were frantically calling for help.\n\n'We have to help them!' Sam shouted to Ben over the water splashing against their boat. Ben hesitated as they were in the lead, but he knew that winning was not everything. Together, they turned their boat around and headed towards John and Ali.\n\n'Throw us your tow rope!' Sam called out as they neared John and Ali's boat. With relief, John tossed the rope. Sam quickly caught it and passed it to Ben. Ben fastened it securely to their boat. Sam and Ben started paddling once again, this time, pulling John and Ali's boat along.\n\nAs the four boys reached the finishing line, they could see the smiles of the other competitors. Sam and Ben felt proud knowing that they had displayed sportsmanship.",
    questions: [
      {
        qid: "rosyth2024-q26",
        question:
          "Which word in the first paragraph tells us that the boys were looking forward to the race? [1m]",
        answer: "eager",
        solution: {
          method: "Vocabulary: find the word meaning 'looking forward to' in paragraph 1.",
          steps: [
            "Paragraph 1: 'Sam and Ben positioned their boat carefully at the starting line, EAGER for the race to start.'",
            "'eager' = enthusiastic and looking forward to something → CORRECT.",
            "Answer: eager.",
          ],
          tip: "Eager = very keen and looking forward to something. 'Eager for the race to start' = they couldn't wait for the race to begin.",
        },
      },
      {
        qid: "rosyth2024-q27",
        question:
          "TRUE or FALSE: Sam and Ben trained hard for the race. [1m]",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'After TRAINING DILIGENTLY for the past few months, they were determined to win the race.'",
            "Training diligently = trained hard → TRUE.",
            "Answer: True.",
          ],
          tip: "Diligently = with hard work and dedication. 'Trained diligently' = trained hard.",
        },
      },
      {
        qid: "rosyth2024-q28",
        question:
          "TRUE or FALSE: Sam and Ben would certainly be joining the junior category race the next time it is held. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'It was their FINAL CHANCE to compete in the junior category.'",
            "Final chance = last time → they CANNOT compete again in the junior category.",
            "Statement: 'would certainly be joining next time' → FALSE.",
            "Answer: False.",
          ],
          tip: "'Final chance' = last opportunity. After this race, they can no longer compete in the junior category (age limit presumably exceeded).",
        },
      },
      {
        qid: "rosyth2024-q29",
        question: "Why did John and Ali call for help? [2m]",
        answer:
          "John and Ali called for help because they dropped their rowing oars into the water and were unable to move their boat.",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'John and Ali had DROPPED THEIR ROWING OARS into the water. UNABLE TO MOVE their boat, they were frantically calling for help.'",
            "Reason: dropped oars → couldn't move boat → called for help.",
            "Answer: John and Ali called for help because they dropped their rowing oars into the water and were unable to move their boat.",
          ],
          tip: "2-mark answer: state the cause (dropped oars) AND the consequence (couldn't move their boat). Both are needed.",
        },
      },
      {
        qid: "rosyth2024-q30",
        question:
          "What does the word 'he' in line 12 refer to? [1m]",
        answer: "Ben",
        solution: {
          method: "Pronoun reference: line 12 of paragraph 4.",
          steps: [
            "Line 12 (paragraph 4): 'Sam shouted to Ben…Ben hesitated as they were in the lead, but HE knew that winning was not everything.'",
            "'He' = BEN (who hesitated but knew winning wasn't everything).",
            "Answer: Ben.",
          ],
          tip: "The 'he' in 'but he knew' refers to Ben — the last named person. Ben hesitated, but Ben knew winning wasn't everything.",
        },
      },
      {
        qid: "rosyth2024-q31",
        question:
          "Read paragraph 5. Decide who did the following actions. Tick your chosen answer.\nAction: flung the tow rope",
        options: ["Sam", "Ben", "John"],
        answer: "John",
        solution: {
          method: "Literal comprehension: paragraph 5.",
          steps: [
            "Paragraph 5: 'With relief, JOHN TOSSED the rope.'",
            "Tossed = flung/threw → JOHN flung the tow rope. CORRECT.",
            "Answer: John.",
          ],
          tip: "Tossed = flung/threw. John tossed the rope to Sam.",
        },
      },
      {
        qid: "rosyth2024-q32",
        question:
          "Read paragraph 5. Decide who did the following actions. Tick your chosen answer.\nAction: caught the tow rope",
        options: ["Sam", "Ben", "John"],
        answer: "Sam",
        solution: {
          method: "Literal comprehension: paragraph 5.",
          steps: [
            "Paragraph 5: 'SAM quickly CAUGHT it and passed it to Ben.'",
            "Sam caught the rope. CORRECT.",
            "Answer: Sam.",
          ],
          tip: "Sam caught the rope, then passed it to Ben. John threw it; Sam caught it; Ben fastened it.",
        },
      },
      {
        qid: "rosyth2024-q33",
        question:
          "Read paragraph 5. Decide who did the following actions. Tick your chosen answer.\nAction: fastened the rope to the boat",
        options: ["Sam", "Ben", "John"],
        answer: "Ben",
        solution: {
          method: "Literal comprehension: paragraph 5.",
          steps: [
            "Paragraph 5: 'BEN FASTENED it securely to their boat.'",
            "Ben fastened the rope. CORRECT.",
            "Answer: Ben.",
          ],
          tip: "Chain of actions: John tossed → Sam caught → Sam passed to Ben → BEN fastened it.",
        },
      },
      {
        qid: "rosyth2024-q34",
        question:
          "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story. [1m]\n___ John and Ali dropped their oars.\n___ Sam and Ben turned their boat around.\n___ John and Ali caught up with Sam and Ben.",
        answer:
          "John and Ali dropped their oars: 2\nSam and Ben turned their boat around: 3\nJohn and Ali caught up with Sam and Ben: 1",
        solution: {
          method: "Sequence comprehension: map events to passage order.",
          steps: [
            "Event 1 (paragraph 2): 'they noticed their competitors, John and Ali, COMING UP FAST beside them.' → John and Ali caught up. ORDER: 1",
            "Event 2 (paragraph 3): 'John and Ali had DROPPED THEIR ROWING OARS into the water.' ORDER: 2",
            "Event 3 (paragraph 4): 'Together, they TURNED THEIR BOAT AROUND and headed towards John and Ali.' ORDER: 3",
          ],
          tip: "Follow paragraph order: John/Ali catch up (para 2) → oars drop (para 3) → Sam/Ben turn around (para 4).",
        },
      },
    ],
  },
];

export const rosyth2024Paper = { meta, questions };
export default rosyth2024Paper;
