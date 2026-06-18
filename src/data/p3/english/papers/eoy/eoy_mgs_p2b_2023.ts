// =============================================================================
// Methodist Girls' School (Primary) – 2023 End-of-Year Examination
// English Language  |  Paper 2 Booklet B  |  Primary 3
// Date: 25 October 2023   Booklet B: 20 marks
// Section D: Grammar Cloze – SVA (Q15–18, 4m) – "Going to School"
// Section E: Grammar Cloze – Prepositions/Conjunctions (Q19–22, 4m) – Aesop's Fable
// Section F: Editing  (Q23–26, 4m) – "If You Were President"
// Section G: Sentence Combining  (Q27–28, 2m)
// Section H: Comprehension Cloze  (Q29–35, 6m) – Rainforests
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_mgs_p2b_2023: QuestionSet = {
  id: "eoy_mgs_p2b_2023",
  school: "Methodist Girls' School (Primary)",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2 Booklet B",
  totalMarks: 20,
  duration: 75,
  questions: [

    // =========================================================================
    // SECTION D: GRAMMAR CLOZE – SVA  Q15–18  (4 × 1m = 4m)
    // Passage: Children going to school (adapted from "Going to school")
    // Underline correct word from brackets
    // Answers: Q15=do, Q16=survive, Q17=teach, Q18=is
    // =========================================================================
    {
      id: "eoy_mgs_p2b_2023_q15",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 15,
      marks: 1,
      passageTitle: "Grammar Cloze D – Going to School",
      passage:
        "Children go to school to learn the things they need to know when they grow up. However, only about half of the children in the world go to school. In poorer countries, many children (15) [do / does] not have time to go to school. They must work to help their family (16) [survive / survives]. They do not learn to read or write but are taught other skills they need, such as farming and sewing.\n\nSchools around the world can work in very different ways. Some schools do not have walls, chairs or even books. Nonetheless, all schools (17) [teach / teaches] basic skills such as reading and writing. Playing sports (18) [is / are] a skill children can learn at school too. Some schools are open to adults in the evening for them to continue learning too!\n\n(Adapted from 'Going to school')",
      question: "Many children (15) [do / does] not have time to go to school.",
      answer: "do",
      solution: {
        method: "Subject-verb agreement – plural subject with 'do/does'",
        steps: [
          "Subject: 'many children' = plural.",
          "'Does' is for singular third-person subjects (he/she/it/one person).",
          "'Do' is for plural subjects (they/many/children).",
          "→ Answer: do",
        ],
        tip: "Many children = plural → 'do not'. One child = singular → 'does not'.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q16",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 16,
      marks: 1,
      passageTitle: "Grammar Cloze D – Going to School",
      passage:
        "Children go to school to learn the things they need to know when they grow up. However, only about half of the children in the world go to school. In poorer countries, many children (15) [do / does] not have time to go to school. They must work to help their family (16) [survive / survives]. They do not learn to read or write but are taught other skills they need, such as farming and sewing.\n\nSchools around the world can work in very different ways. Some schools do not have walls, chairs or even books. Nonetheless, all schools (17) [teach / teaches] basic skills such as reading and writing. Playing sports (18) [is / are] a skill children can learn at school too. Some schools are open to adults in the evening for them to continue learning too!\n\n(Adapted from 'Going to school')",
      question: "They must work to help their family (16) [survive / survives].",
      answer: "survive",
      solution: {
        method: "Verb form after 'help' + object",
        steps: [
          "Structure: 'help their family ______'.",
          "After 'help + object', we use the BASE form of the verb (infinitive without 'to').",
          "'Help their family survive' = help them to survive.",
          "'Survives' = third-person singular; but after 'help', base form is used.",
          "→ Answer: survive",
        ],
        tip: "help + object + base form: help her carry, help them survive, help us understand.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q17",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 17,
      marks: 1,
      passageTitle: "Grammar Cloze D – Going to School",
      passage:
        "Children go to school to learn the things they need to know when they grow up. However, only about half of the children in the world go to school. In poorer countries, many children (15) [do / does] not have time to go to school. They must work to help their family (16) [survive / survives]. They do not learn to read or write but are taught other skills they need, such as farming and sewing.\n\nSchools around the world can work in very different ways. Some schools do not have walls, chairs or even books. Nonetheless, all schools (17) [teach / teaches] basic skills such as reading and writing. Playing sports (18) [is / are] a skill children can learn at school too. Some schools are open to adults in the evening for them to continue learning too!\n\n(Adapted from 'Going to school')",
      question: "Nonetheless, all schools (17) [teach / teaches] basic skills such as reading and writing.",
      answer: "teach",
      solution: {
        method: "Subject-verb agreement – 'all schools' = plural",
        steps: [
          "Subject: 'all schools' = plural (more than one school).",
          "'Teaches' = singular form → wrong for plural subject.",
          "'Teach' = base form, used with plural subjects → correct.",
          "→ Answer: teach",
        ],
        tip: "'All schools' = plural → teach (no -es). Compare: 'The school teaches' (singular).",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q18",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 18,
      marks: 1,
      passageTitle: "Grammar Cloze D – Going to School",
      passage:
        "Children go to school to learn the things they need to know when they grow up. However, only about half of the children in the world go to school. In poorer countries, many children (15) [do / does] not have time to go to school. They must work to help their family (16) [survive / survives]. They do not learn to read or write but are taught other skills they need, such as farming and sewing.\n\nSchools around the world can work in very different ways. Some schools do not have walls, chairs or even books. Nonetheless, all schools (17) [teach / teaches] basic skills such as reading and writing. Playing sports (18) [is / are] a skill children can learn at school too. Some schools are open to adults in the evening for them to continue learning too!\n\n(Adapted from 'Going to school')",
      question: "Playing sports (18) [is / are] a skill children can learn at school too.",
      answer: "is",
      solution: {
        method: "Subject-verb agreement – gerund subject = singular",
        steps: [
          "Subject: 'Playing sports' = a gerund phrase (verb + -ing used as noun).",
          "Gerund phrases acting as subjects are treated as SINGULAR.",
          "'Playing sports is...' = singular agreement.",
          "→ Answer: is",
        ],
        tip: "Gerund subjects (Playing, Running, Swimming) are singular → use 'is', not 'are'.",
      },
    },

    // =========================================================================
    // SECTION E: GRAMMAR CLOZE – Prepositions/Time conjunctions  Q19–22  (4m)
    // Word bank: (A) at  (B) before  (C) after  (D) by  (E) in  (F) while
    // Passage: Aesop's Fable – "A Lesson Learnt Too Late" (bird in a cage)
    // Answers: Q19=D (by), Q20=F (while), Q21=B (before), Q22=C (after)
    // =========================================================================
    {
      id: "eoy_mgs_p2b_2023_q19",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 19,
      marks: 1,
      passageTitle: "Grammar Cloze E – A Lesson Learnt Too Late",
      passage:
        "A bird which was in a cage hanging (19) ______ a window used to sing at night-time. A bat which heard her came up and asked why she only sang at night. She explained that she was captured (20) ______ she was singing in the daytime. Hence, this had taught her a lesson never to sing in the day.\n\n\"It's no use taking precautions now,\" said the bat. \"You should have been careful (21) ______ you were caught.\"\n\nLooking (22) ______ the cage she was trapped in, the bird realised that it was indeed a lesson learnt too late. Nonetheless, the bird thought a lesson learnt too late is better than not learning at all!\n\n(Adapted from Aesop's Fables 'A Lesson Learnt Too Late')",
      wordBank: ["(A) at", "(B) before", "(C) after", "(D) by", "(E) in", "(F) while"],
      question: "A bird which was in a cage hanging (19) ______ a window used to sing at night-time.",
      answer: "D",
      answerWord: "by",
      solution: {
        method: "Prepositions of position – next to / beside",
        steps: [
          "The cage was hanging near/next to a window.",
          "'At' = at a specific point; 'in' = inside; 'while' = time conjunction.",
          "'By' = next to, beside (physical location).",
          "'A cage hanging by a window' = hanging beside/next to the window.",
          "→ Answer: (D) by",
        ],
        tip: "'By' = next to/beside: stand by the door, sit by the window, hang by the wall.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q20",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 20,
      marks: 1,
      passageTitle: "Grammar Cloze E – A Lesson Learnt Too Late",
      passage:
        "A bird which was in a cage hanging (19) ______ a window used to sing at night-time. A bat which heard her came up and asked why she only sang at night. She explained that she was captured (20) ______ she was singing in the daytime. Hence, this had taught her a lesson never to sing in the day.\n\n\"It's no use taking precautions now,\" said the bat. \"You should have been careful (21) ______ you were caught.\"\n\nLooking (22) ______ the cage she was trapped in, the bird realised that it was indeed a lesson learnt too late. Nonetheless, the bird thought a lesson learnt too late is better than not learning at all!\n\n(Adapted from Aesop's Fables 'A Lesson Learnt Too Late')",
      wordBank: ["(A) at", "(B) before", "(C) after", "(D) by", "(E) in", "(F) while"],
      question: "She explained that she was captured (20) ______ she was singing in the daytime.",
      answer: "F",
      answerWord: "while",
      solution: {
        method: "Time conjunctions – simultaneous actions",
        steps: [
          "She was captured at the same time as she was singing.",
          "'While' = during the same time as; simultaneous events.",
          "'Before' = prior to; 'after' = following; 'at' = position/time point.",
          "'Was captured while she was singing' = captured during the act of singing.",
          "→ Answer: (F) while",
        ],
        tip: "'While' connects two simultaneous actions: was captured WHILE singing.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q21",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 21,
      marks: 1,
      passageTitle: "Grammar Cloze E – A Lesson Learnt Too Late",
      passage:
        "A bird which was in a cage hanging (19) ______ a window used to sing at night-time. A bat which heard her came up and asked why she only sang at night. She explained that she was captured (20) ______ she was singing in the daytime. Hence, this had taught her a lesson never to sing in the day.\n\n\"It's no use taking precautions now,\" said the bat. \"You should have been careful (21) ______ you were caught.\"\n\nLooking (22) ______ the cage she was trapped in, the bird realised that it was indeed a lesson learnt too late. Nonetheless, the bird thought a lesson learnt too late is better than not learning at all!\n\n(Adapted from Aesop's Fables 'A Lesson Learnt Too Late')",
      wordBank: ["(A) at", "(B) before", "(C) after", "(D) by", "(E) in", "(F) while"],
      question: "\"You should have been careful (21) ______ you were caught.\"",
      answer: "B",
      answerWord: "before",
      solution: {
        method: "Time conjunctions – sequence of events",
        steps: [
          "The bat says the bird should have been careful PRIOR to being caught.",
          "'Before' = at an earlier time than; precedes something.",
          "'You should have been careful before you were caught' = should have taken precaution earlier.",
          "→ Answer: (B) before",
        ],
        tip: "'Before' = prior to. Be careful BEFORE something bad happens, not after.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q22",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 22,
      marks: 1,
      passageTitle: "Grammar Cloze E – A Lesson Learnt Too Late",
      passage:
        "A bird which was in a cage hanging (19) ______ a window used to sing at night-time. A bat which heard her came up and asked why she only sang at night. She explained that she was captured (20) ______ she was singing in the daytime. Hence, this had taught her a lesson never to sing in the day.\n\n\"It's no use taking precautions now,\" said the bat. \"You should have been careful (21) ______ you were caught.\"\n\nLooking (22) ______ the cage she was trapped in, the bird realised that it was indeed a lesson learnt too late. Nonetheless, the bird thought a lesson learnt too late is better than not learning at all!\n\n(Adapted from Aesop's Fables 'A Lesson Learnt Too Late')",
      wordBank: ["(A) at", "(B) before", "(C) after", "(D) by", "(E) in", "(F) while"],
      question: "Looking (22) ______ the cage she was trapped in, the bird realised…",
      answer: "C",
      answerWord: "after",
      solution: {
        method: "Prepositions/conjunctions – examining something post-event",
        steps: [
          "'Looking after the cage' in this context means examining it in retrospect.",
          "Actually: 'Looking _____ the cage she was trapped in' = looking at the cage from a distance after consideration.",
          "Answer key: (C) after. 'Looking after the cage' = considering the cage she was in after (i.e., reflecting on it).",
          "→ Answer: (C) after",
        ],
        tip: "'After' can denote reflecting on something following an event.",
      },
    },

    // =========================================================================
    // SECTION F: EDITING  Q23–26  (4 × 1m = 4m)
    // Passage: "If You Were President" (adapted)
    // Answers: Q23=anywhere, Q24=their, Q25=decision, Q26=counts
    // =========================================================================
    {
      id: "eoy_mgs_p2b_2023_q23",
      type: "B",
      topic: "Editing",
      qNumber: 23,
      marks: 1,
      passageTitle: "Editing – If You Were President",
      passage:
        "If you were elected to be the President of America, what would your life be like? Firstly, your new home is the White House in Washington, D.C. The White House has bowling alleys, a swimming pool and a movie theatre. If you want a pizza, the Secret Service agents will pick it up for you. You will have your very own plane, Air Force One, and it will fly you (23)[aniwear] you want to go.\n\nBeing the President is a lot of work too. In the Oval Office, you will meet with the members of your Cabinet and listen to their advice. You will also meet with foreign leaders and listen to (24)[they're] needs. Before you make your final (25)[deesition], you will listen to the voices of the people. In a democracy, everyone's opinion (26)[count]. Hence, it is not an easy job to be the President.\n\n(Adapted from 'If You Were President')",
      question: "(23) Correct the spelling of the underlined word 'aniwear'.",
      answer: "anywhere",
      solution: {
        method: "Spelling correction",
        steps: [
          "'Aniwear' is a phonetic misspelling of 'anywhere'.",
          "Correct spelling: a-n-y-w-h-e-r-e.",
          "The word means 'to any place' → 'fly you anywhere you want to go'.",
          "→ Answer: anywhere",
        ],
        tip: "ANYWHERE = any + where. Means 'to/in any place'. Spelling: a-n-y-w-h-e-r-e.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q24",
      type: "B",
      topic: "Editing",
      qNumber: 24,
      marks: 1,
      passageTitle: "Editing – If You Were President",
      passage:
        "If you were elected to be the President of America, what would your life be like? Firstly, your new home is the White House in Washington, D.C. The White House has bowling alleys, a swimming pool and a movie theatre. If you want a pizza, the Secret Service agents will pick it up for you. You will have your very own plane, Air Force One, and it will fly you (23)[aniwear] you want to go.\n\nBeing the President is a lot of work too. In the Oval Office, you will meet with the members of your Cabinet and listen to their advice. You will also meet with foreign leaders and listen to (24)[they're] needs. Before you make your final (25)[deesition], you will listen to the voices of the people. In a democracy, everyone's opinion (26)[count]. Hence, it is not an easy job to be the President.\n\n(Adapted from 'If You Were President')",
      question: "(24) The underlined word 'they're' is incorrect. What is the correct word?",
      answer: "their",
      solution: {
        method: "Homophone correction – their/they're/there",
        steps: [
          "'they're' = they are (contraction).",
          "We need a possessive determiner before 'needs': 'listen to _____ needs'.",
          "'Their' = belonging to them (possessive) → 'their needs' = the foreign leaders' needs.",
          "→ Answer: their",
        ],
        tip: "Their = possessive (their book); They're = they are; There = place. Before a noun → 'their'.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q25",
      type: "B",
      topic: "Editing",
      qNumber: 25,
      marks: 1,
      passageTitle: "Editing – If You Were President",
      passage:
        "If you were elected to be the President of America, what would your life be like? Firstly, your new home is the White House in Washington, D.C. The White House has bowling alleys, a swimming pool and a movie theatre. If you want a pizza, the Secret Service agents will pick it up for you. You will have your very own plane, Air Force One, and it will fly you (23)[aniwear] you want to go.\n\nBeing the President is a lot of work too. In the Oval Office, you will meet with the members of your Cabinet and listen to their advice. You will also meet with foreign leaders and listen to (24)[they're] needs. Before you make your final (25)[deesition], you will listen to the voices of the people. In a democracy, everyone's opinion (26)[count]. Hence, it is not an easy job to be the President.\n\n(Adapted from 'If You Were President')",
      question: "(25) Correct the spelling of the underlined word 'deesition'.",
      answer: "decision",
      solution: {
        method: "Spelling correction",
        steps: [
          "'Deesition' is a misspelling.",
          "Correct spelling: d-e-c-i-s-i-o-n.",
          "The word means a choice or conclusion made after thinking.",
          "'De-ci-sion' = three syllables.",
          "→ Answer: decision",
        ],
        tip: "DECISION = decide + -sion. The 'c' makes an 's' sound: de-CI-sion.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q26",
      type: "B",
      topic: "Editing",
      qNumber: 26,
      marks: 1,
      passageTitle: "Editing – If You Were President",
      passage:
        "If you were elected to be the President of America, what would your life be like? Firstly, your new home is the White House in Washington, D.C. The White House has bowling alleys, a swimming pool and a movie theatre. If you want a pizza, the Secret Service agents will pick it up for you. You will have your very own plane, Air Force One, and it will fly you (23)[aniwear] you want to go.\n\nBeing the President is a lot of work too. In the Oval Office, you will meet with the members of your Cabinet and listen to their advice. You will also meet with foreign leaders and listen to (24)[they're] needs. Before you make your final (25)[deesition], you will listen to the voices of the people. In a democracy, everyone's opinion (26)[count]. Hence, it is not an easy job to be the President.\n\n(Adapted from 'If You Were President')",
      question: "(26) The underlined word 'count' is incorrect. What is the correct form?",
      answer: "counts",
      solution: {
        method: "Subject-verb agreement – singular subject",
        steps: [
          "Subject: 'everyone's opinion' = singular (one thing).",
          "'Count' = base form → used with plural subjects (they count).",
          "Singular subject → verb + -s: 'counts'.",
          "'Everyone's opinion counts' = singular → correct.",
          "→ Answer: counts",
        ],
        tip: "Everyone's opinion = singular → COUNTS. 'Every + noun' is always singular: everyone counts.",
      },
    },

    // =========================================================================
    // SECTION G: SENTENCE COMBINING  Q27–28  (2 × 1m = 2m)
    // Answers: Q27 = Before my grandmother goes to the market, she sends me to school.
    //          Q28 = Neither Amy nor her sister enjoys swimming.
    // =========================================================================
    {
      id: "eoy_mgs_p2b_2023_q27",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 27,
      marks: 1,
      question:
        "Rewrite as one sentence using 'Before':\nMy grandmother sends me to school. Then, she goes to the market.",
      answer: "Before my grandmother goes to the market, she sends me to school.",
      solution: {
        method: "Sentence combining – time sequence with 'before'",
        steps: [
          "Order of events: (1) sends me to school, THEN (2) goes to market.",
          "'Before' introduces the LATER event clause: 'Before she goes to market…'",
          "Combined: 'Before my grandmother goes to the market, she sends me to school.'",
          "Note: 'Before' clause can go first or second in the sentence.",
        ],
        tip: "'Before Y, do X' = X happens first, then Y. Before going to market, she sends me first.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q28",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 28,
      marks: 1,
      question:
        "Rewrite as one sentence using 'Neither … nor':\nAmy does not enjoy swimming. Her sister also does not enjoy it.",
      answer: "Neither Amy nor her sister enjoys swimming.",
      solution: {
        method: "Sentence combining – Neither…nor (double negative)",
        steps: [
          "'Neither A nor B' = both A and B do not do/like something.",
          "Structure: Neither Amy nor her sister + verb.",
          "SVA note: 'Neither A nor B' – the verb agrees with B (her sister = singular) → 'enjoys'.",
          "Combined: 'Neither Amy nor her sister enjoys swimming.'",
        ],
        tip: "'Neither A nor B' + verb agrees with B (closer noun): Neither Amy NOR HER SISTER (singular) → ENJOYS.",
      },
    },

    // =========================================================================
    // SECTION H: COMPREHENSION CLOZE  Q29–35  (6m)
    // Passage: Rainforests (adapted from 'Rainforest' by National Geographic Kids)
    // Open-ended fill-in-blank
    // Answers: Q29=with, Q30=found, Q31=from, Q32=its, Q33=however, Q34=example, Q35=than
    // =========================================================================
    {
      id: "eoy_mgs_p2b_2023_q29",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 29,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight.",
      answer: "with",
      solution: {
        method: "Preposition – fixed collocation 'compete with'",
        steps: [
          "'Compete ______ other plants' = the fixed phrase is 'compete WITH'.",
          "'Compete with' = to be in competition against others.",
          "→ Answer: with",
        ],
        tip: "Fixed collocation: compete WITH (someone/something). 'Compete against' is also correct but 'with' is the expected answer here.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q30",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 30,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet.",
      answer: "found",
      solution: {
        method: "Vocabulary in context – location of trees",
        steps: [
          "Kapok trees 'which are ______ in tropical rainforests around the world'.",
          "This describes where Kapok trees are located/exist.",
          "'Found' = existing in/located at a specific place.",
          "'Kapok trees which are found in tropical rainforests' = they exist there.",
          "→ Answer: found",
        ],
        tip: "When describing where something exists in nature, use 'found': 'Lions are found in Africa.'",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q31",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 31,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below.",
      answer: "from",
      solution: {
        method: "Prepositions – blocking/preventing something FROM reaching",
        steps: [
          "'Blocking the light ______ the trees below' = preventing light from reaching the trees below.",
          "'Block from' = to prevent something from getting to somewhere.",
          "'Block the light from the trees' = prevent the light from reaching the trees.",
          "→ Answer: from",
        ],
        tip: "'Block from' = prevent from reaching. 'Block the light from the trees below.'",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q32",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 32,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "A smaller tree will grow and take (32) ______ place.",
      answer: "its",
      solution: {
        method: "Possessive pronoun – referring to the fallen tree",
        steps: [
          "'Take ______ place' = take the place of (something).",
          "The smaller tree will take the place of the big tree that died.",
          "The big tree that died = 'it' → possessive = 'its'.",
          "'Take its place' = replace it.",
          "→ Answer: its",
        ],
        tip: "'Take its place' = replace it. 'Its' = possessive of 'it' (the fallen tree).",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q33",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 33,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "Most rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler.",
      answer: "However",
      solution: {
        method: "Discourse connectives – contrast/concession",
        steps: [
          "Previous sentence: most rainforests are near the Equator (hot).",
          "Next sentence: SOME rainforests are in temperate regions (cooler) → contrasting idea.",
          "'However' = nevertheless; introduces a contrasting idea.",
          "→ Answer: However",
        ],
        tip: "'However' = but/nevertheless. Used to introduce a contrasting or surprising fact.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q34",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 34,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "Hoh Rainforest in North America is an (34) ______ of a temperate rainforest.",
      answer: "example",
      solution: {
        method: "Vocabulary in context – giving an illustration",
        steps: [
          "The sentence introduces Hoh Rainforest to illustrate temperate rainforests.",
          "'Is an ______ of a temperate rainforest' = gives a specific case/illustration.",
          "'Example' = a specific instance that illustrates a general point.",
          "'Is an example of' = is one instance of this type.",
          "→ Answer: example",
        ],
        tip: "'Is an example of' = is a specific case/instance of something more general.",
      },
    },

    {
      id: "eoy_mgs_p2b_2023_q35",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 35,
      marks: 1,
      passageTitle: "Comprehension Cloze – Rainforests",
      passage:
        "Rainforests are lush, warm and wet habitats. Trees in the rainforest grow very tall because they have to compete (29) ______ other plants for sunlight. Kapok trees, which are (30) ______ in tropical rainforests around the world, can grow to 200 feet. The taller trees spread their branches and leaves, creating a canopy over the forest, blocking the light (31) ______ the trees below. However, when one of the big trees dies and falls, the opening lets in more sunlight so that a smaller tree will grow and take (32) ______ place.\n\nMost rainforests are situated along or near the Equator, where it tends to be hot. (33) ______, some rainforests grow in temperate regions where it is cooler. Hoh Rainforest in North America is an (34) ______ of a temperate rainforest. Like tropical rainforests, temperate rainforests get lots of rain.\n\nTrees and other plants release water into the atmosphere and the water falls back to Earth as rain. The trees in the rainforest can release a lot of water. In some rainforests, it rains more (35) ______ 100 000 litres of water every day! This helps to stabilise the world climate by making rain and absorbing carbon dioxide, thereby reducing global warming.\n\n(Adapted from 'Rainforest' by National Geographic Kids)",
      question: "In some rainforests, it rains more (35) ______ 100 000 litres of water every day!",
      answer: "than",
      solution: {
        method: "Comparatives – 'more than'",
        steps: [
          "'More ______ 100 000 litres' = a comparison showing it exceeds 100 000 litres.",
          "'More than' = exceeding a number.",
          "'More than 100 000 litres' = over 100 000 litres.",
          "→ Answer: than",
        ],
        tip: "'More than' = exceeding a quantity. 'It rains more than 100 000 litres' = over 100 000 litres.",
      },
    },
  ],
};

export default eoy_mgs_p2b_2023;
