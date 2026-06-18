// =============================================================================
// Anglo-Chinese School (Primary) – 2023 End-of-Year Examination
// English Language  |  Paper 2 Booklet B  |  Primary 3
// Date: 23 October 2023   Duration: 1h 15 min
// Sections:
//   D Grammar Cloze  – Cloze 1: Pronouns (Q21–24, 4m)
//                    – Cloze 2: Subject-Verb Agreement (Q25–28, 4m)
//   E Editing        (Q29–34, 6m)
//   F Comprehension 1 – "A Kind Act" (Q35–39, 8m)
//   G Comprehension 2 – "Friendship" (Q40–45, 8m)
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_acsprimary_p2b_2023: QuestionSet = {
  id: "eoy_acsprimary_p2b_2023",
  school: "Anglo-Chinese School (Primary)",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2 Booklet B",
  totalMarks: 30,
  duration: 75,
  questions: [

    // =========================================================================
    // SECTION D: GRAMMAR CLOZE – Cloze 1: Pronouns  (Q21–24)  4 × 1m = 4 marks
    // Passage: Letter from Gopal to Ali about moving to a new neighbourhood.
    // Word bank: (A) it  (B) him  (C) my  (D) our  (E) their  (F) them
    // =========================================================================
    {
      id: "eoy_acsprimary_p2b_2023_q21",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 21,
      marks: 1,
      passageTitle: "Cloze 1 – Letter from Gopal",
      passage:
        "Dear Ali,\n\nLast weekend, my family moved into a new neighbourhood. We met Ken and his family. They are our new neighbours. They invited us over to (21) ______ house for tea. (22) ______ mother baked a chicken pie for them. They enjoyed eating (23) ______. After eating, Ken and I played football. I had a good time playing with (24) ______. I hope you can visit me soon.\n\nYour friend,\nGopal\n\n(Adapted from My Best Friend Moved Away)",
      wordBank: ["(A) it", "(B) him", "(C) my", "(D) our", "(E) their", "(F) them"],
      question: "They invited us over to (21) ______ house for tea.",
      answer: "E",
      answerWord: "their",
      solution: {
        method: "Pronoun reference – possessive pronouns",
        steps: [
          '"They" refers to Ken and his family (plural, third person).',
          'The blank is before "house", so we need a possessive pronoun.',
          "Possessive pronouns for 'they' = 'their'.",
          "'Their house' = the house belonging to Ken and his family.",
          "→ Answer: (E) their",
        ],
        tip: "Match the pronoun to the noun it replaces: They → their (possessive).",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q22",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 22,
      marks: 1,
      passageTitle: "Cloze 1 – Letter from Gopal",
      passage:
        "Dear Ali,\n\nLast weekend, my family moved into a new neighbourhood. We met Ken and his family. They are our new neighbours. They invited us over to (21) ______ house for tea. (22) ______ mother baked a chicken pie for them. They enjoyed eating (23) ______. After eating, Ken and I played football. I had a good time playing with (24) ______. I hope you can visit me soon.\n\nYour friend,\nGopal\n\n(Adapted from My Best Friend Moved Away)",
      wordBank: ["(A) it", "(B) him", "(C) my", "(D) our", "(E) their", "(F) them"],
      question: "(22) ______ mother baked a chicken pie for them.",
      answer: "C",
      answerWord: "my",
      solution: {
        method: "Pronoun reference – first-person possessive",
        steps: [
          "The letter is written by Gopal to Ali.",
          "Gopal says his own mother baked the chicken pie.",
          '"My" = belonging to the speaker (Gopal).',
          '"Our" would mean belonging to Gopal and Ken together, but only Gopal\'s mother baked.',
          "→ Answer: (C) my",
        ],
        tip: 'In a personal letter, the writer uses "my" to refer to their own family members.',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q23",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 23,
      marks: 1,
      passageTitle: "Cloze 1 – Letter from Gopal",
      passage:
        "Dear Ali,\n\nLast weekend, my family moved into a new neighbourhood. We met Ken and his family. They are our new neighbours. They invited us over to (21) ______ house for tea. (22) ______ mother baked a chicken pie for them. They enjoyed eating (23) ______. After eating, Ken and I played football. I had a good time playing with (24) ______. I hope you can visit me soon.\n\nYour friend,\nGopal\n\n(Adapted from My Best Friend Moved Away)",
      wordBank: ["(A) it", "(B) him", "(C) my", "(D) our", "(E) their", "(F) them"],
      question: "They enjoyed eating (23) ______.",
      answer: "A",
      answerWord: "it",
      solution: {
        method: "Pronoun reference – singular object pronoun",
        steps: [
          '"They enjoyed eating ______" → the blank replaces what they ate.',
          "What was eaten = 'a chicken pie' (singular, uncountable food item).",
          'Object pronoun for a singular thing = "it".',
          '"Them" is plural → does not match a single chicken pie.',
          "→ Answer: (A) it",
        ],
        tip: 'Use "it" to replace a single thing; "them" for multiple things.',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q24",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 24,
      marks: 1,
      passageTitle: "Cloze 1 – Letter from Gopal",
      passage:
        "Dear Ali,\n\nLast weekend, my family moved into a new neighbourhood. We met Ken and his family. They are our new neighbours. They invited us over to (21) ______ house for tea. (22) ______ mother baked a chicken pie for them. They enjoyed eating (23) ______. After eating, Ken and I played football. I had a good time playing with (24) ______. I hope you can visit me soon.\n\nYour friend,\nGopal\n\n(Adapted from My Best Friend Moved Away)",
      wordBank: ["(A) it", "(B) him", "(C) my", "(D) our", "(E) their", "(F) them"],
      question: "I had a good time playing with (24) ______.",
      answer: "B",
      answerWord: "him",
      solution: {
        method: "Pronoun reference – singular male object pronoun",
        steps: [
          '"I had a good time playing with ______" → who did Gopal play with?',
          "Gopal played football with Ken.",
          "Ken is a single male person.",
          'Object pronoun for a single male = "him".',
          "→ Answer: (B) him",
        ],
        tip: "Use 'him' as the object form of 'he'. Subject: he played; Object: playing with him.",
      },
    },

    // =========================================================================
    // SECTION D: GRAMMAR CLOZE – Cloze 2: Subject-Verb Agreement  (Q25–28)  4 × 1m = 4 marks
    // Passage: Mrs Ang's morning routine (adapted from The Happy Housewife)
    // Choose correct word from brackets
    // =========================================================================
    {
      id: "eoy_acsprimary_p2b_2023_q25",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 25,
      marks: 1,
      passageTitle: "Cloze 2 – Mrs Ang's Morning Routine",
      passage:
        "Mrs Ang is a mother of two children. Every morning, Mrs Ang (25) [wake / wakes] up early to prepare breakfast. Her children, Tina and Mary, always (26) [has / have] their breakfast before they go to school. As the school (27) [is / are] nearby, they do not need to leave home early. Mrs Ang and her children (28) [walk / walks] to the school together. After that, she goes for her morning exercise.\n\n(Adapted from The Happy Housewife)",
      question: "Every morning, Mrs Ang (25) [wake / wakes] up early to prepare breakfast.",
      options: [
        { label: "wake", text: "wake" },
        { label: "wakes", text: "wakes" },
      ],
      answer: "wakes",
      solution: {
        method: "Subject-Verb Agreement – singular third person",
        steps: [
          "Subject: 'Mrs Ang' = singular, third person (she).",
          "Rule: Singular subject + verb with -s ending.",
          '"wake" → used for plural subjects (I/you/we/they wake).',
          '"wakes" → correct for Mrs Ang (she wakes).',
          "→ Answer: wakes",
        ],
        tip: "For singular third-person subjects (he, she, it, a person's name), add -s or -es to the verb.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q26",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 26,
      marks: 1,
      passageTitle: "Cloze 2 – Mrs Ang's Morning Routine",
      passage:
        "Mrs Ang is a mother of two children. Every morning, Mrs Ang (25) [wake / wakes] up early to prepare breakfast. Her children, Tina and Mary, always (26) [has / have] their breakfast before they go to school. As the school (27) [is / are] nearby, they do not need to leave home early. Mrs Ang and her children (28) [walk / walks] to the school together. After that, she goes for her morning exercise.\n\n(Adapted from The Happy Housewife)",
      question: "Her children, Tina and Mary, always (26) [has / have] their breakfast.",
      options: [
        { label: "has", text: "has" },
        { label: "have", text: "have" },
      ],
      answer: "have",
      solution: {
        method: "Subject-Verb Agreement – compound plural subject",
        steps: [
          "Subject: 'Her children, Tina and Mary' = more than one person = plural.",
          "Rule: Plural subject → base form of verb (no -s).",
          '"Has" is used with singular subjects (he/she/it has).',
          '"Have" is used with plural subjects (they have).',
          "→ Answer: have",
        ],
        tip: "Two or more people joined by 'and' = plural subject → use 'have', not 'has'.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q27",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 27,
      marks: 1,
      passageTitle: "Cloze 2 – Mrs Ang's Morning Routine",
      passage:
        "Mrs Ang is a mother of two children. Every morning, Mrs Ang (25) [wake / wakes] up early to prepare breakfast. Her children, Tina and Mary, always (26) [has / have] their breakfast before they go to school. As the school (27) [is / are] nearby, they do not need to leave home early. Mrs Ang and her children (28) [walk / walks] to the school together. After that, she goes for her morning exercise.\n\n(Adapted from The Happy Housewife)",
      question: "As the school (27) [is / are] nearby, they do not need to leave home early.",
      options: [
        { label: "is", text: "is" },
        { label: "are", text: "are" },
      ],
      answer: "is",
      solution: {
        method: "Subject-Verb Agreement – singular institution",
        steps: [
          "Subject: 'the school' = a single institution = singular.",
          "Rule: Singular subject → is.",
          "\"Are\" is used with plural subjects (they/we are) or 'you are'.",
          '"Is" is correct for singular: the school is.',
          "→ Answer: is",
        ],
        tip: "Institutions and places treated as a single unit use 'is': the school is, the library is.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q28",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 28,
      marks: 1,
      passageTitle: "Cloze 2 – Mrs Ang's Morning Routine",
      passage:
        "Mrs Ang is a mother of two children. Every morning, Mrs Ang (25) [wake / wakes] up early to prepare breakfast. Her children, Tina and Mary, always (26) [has / have] their breakfast before they go to school. As the school (27) [is / are] nearby, they do not need to leave home early. Mrs Ang and her children (28) [walk / walks] to the school together. After that, she goes for her morning exercise.\n\n(Adapted from The Happy Housewife)",
      question: "Mrs Ang and her children (28) [walk / walks] to the school together.",
      options: [
        { label: "walk", text: "walk" },
        { label: "walks", text: "walks" },
      ],
      answer: "walk",
      solution: {
        method: "Subject-Verb Agreement – compound subject with 'and'",
        steps: [
          "Subject: 'Mrs Ang and her children' = two separate entities joined by 'and' = plural.",
          "Rule: Compound subject (A and B) = plural → use base form of verb.",
          '"Walks" is for singular third-person subjects.',
          '"Walk" is correct for plural compound subjects.',
          "→ Answer: walk",
        ],
        tip: "X and Y = plural; use the base form of the verb without -s.",
      },
    },

    // =========================================================================
    // SECTION E: EDITING  (Q29–34)  6 × 1 mark = 6 marks
    // Passage: "Grandmother's Birthday" – find spelling/grammar errors and
    // missing punctuation. Adapted from Children's Story – Grandmother's Birthday.
    // =========================================================================
    {
      id: "eoy_acsprimary_p2b_2023_q29",
      type: "B",
      topic: "Editing",
      qNumber: 29,
      marks: 1,
      passageTitle: "Editing – Grandmother's Birthday",
      passage:
        "It was Grandmother's birthday. Jack and Jill wanted to bake a cake to (29)[sirprise] (30)[hēr]. The children bought butter, (31)[suger] and eggs. Jack mixed the ingredients together and baked the cake (32)[at] the oven for an hour. Jill (33)[draw] a card for Grandmother. There were flowers (,)[○] butterflies and a rainbow on the card. When Grandmother saw the cake and card, she asked, \"Are these for me(,)[○]\" She was very happy.\n\n(Adapted from Children's Story – Grandmother's Birthday)",
      question: "(29) What is the correct spelling for the underlined word 'sirprise'?",
      answer: "surprise",
      solution: {
        method: "Spelling correction",
        steps: [
          '"sirprise" is a misspelling.',
          "The correct spelling is 'surprise'.",
          "Remember: s-u-r-p-r-i-s-e. The vowel after 's' is 'u', not 'i'.",
          "Memory tip: 'sur' + 'prise' (like a prize).",
        ],
        tip: "Tricky spelling: sur-PRISE. Think of it as containing the word 'prize' inside.',",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q30",
      type: "B",
      topic: "Editing",
      qNumber: 30,
      marks: 1,
      passageTitle: "Editing – Grandmother's Birthday",
      passage:
        "It was Grandmother's birthday. Jack and Jill wanted to bake a cake to (29)[sirprise] (30)[hēr]. The children bought butter, (31)[suger] and eggs. Jack mixed the ingredients together and baked the cake (32)[at] the oven for an hour. Jill (33)[draw] a card for Grandmother. There were flowers (,)[○] butterflies and a rainbow on the card. When Grandmother saw the cake and card, she asked, \"Are these for me(,)[○]\" She was very happy.\n\n(Adapted from Children's Story – Grandmother's Birthday)",
      question: "(30) The word 'hēr' has a wrong accent. What is the correct word?",
      answer: "her",
      solution: {
        method: "Spelling/usage correction – correct pronoun form",
        steps: [
          '"hēr" has an incorrect accent mark above the e.',
          "The correct object pronoun is simply 'her' (no accent).",
          "'her' = object pronoun for a female (e.g., bake a cake to her).",
          "English does not use accent marks; this is a spelling/usage error.",
        ],
        tip: "English words do not normally use accent marks. 'her' is spelled h-e-r.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q31",
      type: "B",
      topic: "Editing",
      qNumber: 31,
      marks: 1,
      passageTitle: "Editing – Grandmother's Birthday",
      passage:
        "It was Grandmother's birthday. Jack and Jill wanted to bake a cake to (29)[sirprise] (30)[hēr]. The children bought butter, (31)[suger] and eggs. Jack mixed the ingredients together and baked the cake (32)[at] the oven for an hour. Jill (33)[draw] a card for Grandmother. There were flowers (,)[○] butterflies and a rainbow on the card. When Grandmother saw the cake and card, she asked, \"Are these for me(,)[○]\" She was very happy.\n\n(Adapted from Children's Story – Grandmother's Birthday)",
      question: "(31) What is the correct spelling for the underlined word 'suger'?",
      answer: "sugar",
      solution: {
        method: "Spelling correction",
        steps: [
          '"suger" is a misspelling of "sugar".',
          "Correct spelling: s-u-g-a-r.",
          "The second vowel is 'a', not 'e'.",
          "Remember: SUGAR ends in '-ar', not '-er'.",
        ],
        tip: "Common spelling mistake: SUGAR (not 'suger'). The ending is -A-R.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q32",
      type: "B",
      topic: "Editing",
      qNumber: 32,
      marks: 1,
      passageTitle: "Editing – Grandmother's Birthday",
      passage:
        "It was Grandmother's birthday. Jack and Jill wanted to bake a cake to (29)[sirprise] (30)[hēr]. The children bought butter, (31)[suger] and eggs. Jack mixed the ingredients together and baked the cake (32)[at] the oven for an hour. Jill (33)[draw] a card for Grandmother. There were flowers (,)[○] butterflies and a rainbow on the card. When Grandmother saw the cake and card, she asked, \"Are these for me(,)[○]\" She was very happy.\n\n(Adapted from Children's Story – Grandmother's Birthday)",
      question: "(32) The word 'at' is incorrect. What is the correct preposition?",
      answer: "in",
      solution: {
        method: "Preposition correction – locations/enclosures",
        steps: [
          '"baked the cake at the oven" – using "at" for an enclosed appliance is incorrect.',
          'We say something is baked "in the oven" because the oven is an enclosed space.',
          '"At" is used for general locations (at the park, at school).',
          '"In" is used for enclosed spaces (in the oven, in the box).',
          "→ Correct preposition: in",
        ],
        tip: 'Use "in" for enclosed spaces like the oven: "baked in the oven".',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q33",
      type: "B",
      topic: "Editing",
      qNumber: 33,
      marks: 1,
      passageTitle: "Editing – Grandmother's Birthday",
      passage:
        "It was Grandmother's birthday. Jack and Jill wanted to bake a cake to (29)[sirprise] (30)[hēr]. The children bought butter, (31)[suger] and eggs. Jack mixed the ingredients together and baked the cake (32)[at] the oven for an hour. Jill (33)[draw] a card for Grandmother. There were flowers (,)[○] butterflies and a rainbow on the card. When Grandmother saw the cake and card, she asked, \"Are these for me(,)[○]\" She was very happy.\n\n(Adapted from Children's Story – Grandmother's Birthday)",
      question:
        "(33) The circled punctuation mark (a comma) in 'There were flowers ○ butterflies and a rainbow' is wrong. What is the correct punctuation?",
      answer: ",",
      solution: {
        method: "Punctuation – commas in a list",
        steps: [
          'The sentence lists three things: "flowers", "butterflies", and "a rainbow".',
          "In a list of three or more items, commas separate each item.",
          "A comma should appear after 'flowers': 'There were flowers, butterflies and a rainbow.'",
          "The circle marks where punctuation is missing or wrong; the correct mark is a comma.',",
        ],
        tip: "Use commas to separate items in a list of three or more things.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q34",
      type: "B",
      topic: "Editing",
      qNumber: 34,
      marks: 1,
      passageTitle: "Editing – Grandmother's Birthday",
      passage:
        "It was Grandmother's birthday. Jack and Jill wanted to bake a cake to (29)[sirprise] (30)[hēr]. The children bought butter, (31)[suger] and eggs. Jack mixed the ingredients together and baked the cake (32)[at] the oven for an hour. Jill (33)[draw] a card for Grandmother. There were flowers (,)[○] butterflies and a rainbow on the card. When Grandmother saw the cake and card, she asked, \"Are these for me(,)[○]\" She was very happy.\n\n(Adapted from Children's Story – Grandmother's Birthday)",
      question:
        "(34) The circled punctuation mark inside the speech marks 'Are these for me○\"' is missing. What is the correct punctuation?",
      answer: "?",
      solution: {
        method: "Punctuation – question mark for direct questions",
        steps: [
          '"Are these for me?" is a direct question.',
          "Direct questions end with a question mark (?).",
          "When the question is inside speech marks, the question mark goes before the closing speech mark.",
          "Correct form: 'Are these for me?\"'",
        ],
        tip: 'Direct questions always end with "?" – especially when using question words (Are, Is, Do, Can, etc.).',
      },
    },

    // =========================================================================
    // SECTION F: COMPREHENSION 1  (Q35–39)  8 marks
    // Passage: "A Kind Act" – Samy and Peter find a lost puppy named Sparkle.
    // =========================================================================
    {
      id: "eoy_acsprimary_p2b_2023_q35",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 35,
      marks: 1,
      passageTitle: "Comprehension 1 – A Kind Act",
      passage:
        "Last month, Samy was in the park with his friend, Peter. They were taking a walk. Just then, Samy spotted a puppy. It looked scared. Samy gently picked it up while Peter looked around the park. He was hoping to find its owner but there was no one in sight. They realised the puppy was lost and decided to take it home. Samy named it Sparkle. The boys took turns to look after it.\n\nLast Sunday, Peter noticed that Sparkle was missing. The boys searched the house but could not find it. They were worried and decided to search for Sparkle around the neighbourhood.\n\nWhile searching, the boys shouted, \"Sparkle, where are you?\" They hoped to get Sparkle's attention. Suddenly, Peter saw a little boy crying in pain and holding on to his leg. Peter and Samy immediately helped the boy up to a bench nearby. They cleaned his wound and put a plaster on it.\n\nFeeling better, the little boy spoke in a soft voice, \"Hi, I'm Meng Wee. Are you looking for your puppy? While I was playing, I saw a puppy running into that empty house.\" The boys heaved a sigh of relief. They rushed into the house. When they saw Sparkle, they rejoiced. After the incident, they promised to always be kind and to help anyone in need.\n\n(Adapted from A Kind Act)",
      question: "When Samy and Peter found the lost puppy, they __________.",
      options: [
        { label: "1", text: "returned it to its owner" },
        { label: "2", text: "took it for a walk in the park" },
        { label: "3", text: "took it home and looked after it" },
        { label: "4", text: "ignored it and continued their day" },
      ],
      answer: "3",
      solution: {
        method: "Reading comprehension – locating specific facts",
        steps: [
          'Locate in paragraph 1: "They realised the puppy was lost and decided to take it home. Samy named it Sparkle. The boys took turns to look after it."',
          "They took the puppy home and took turns looking after it.",
          "They did not find the owner (no one was in sight).",
          "→ Answer: (3) took it home and looked after it",
        ],
        tip: "Underline key actions in the passage: 'take it home' and 'look after it' = option 3.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q36",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 36,
      marks: 1,
      passageTitle: "Comprehension 1 – A Kind Act",
      passage:
        "Last month, Samy was in the park with his friend, Peter. They were taking a walk. Just then, Samy spotted a puppy. It looked scared. Samy gently picked it up while Peter looked around the park. He was hoping to find its owner but there was no one in sight. They realised the puppy was lost and decided to take it home. Samy named it Sparkle. The boys took turns to look after it.\n\nLast Sunday, Peter noticed that Sparkle was missing. The boys searched the house but could not find it. They were worried and decided to search for Sparkle around the neighbourhood.\n\nWhile searching, the boys shouted, \"Sparkle, where are you?\" They hoped to get Sparkle's attention. Suddenly, Peter saw a little boy crying in pain and holding on to his leg. Peter and Samy immediately helped the boy up to a bench nearby. They cleaned his wound and put a plaster on it.\n\nFeeling better, the little boy spoke in a soft voice, \"Hi, I'm Meng Wee. Are you looking for your puppy? While I was playing, I saw a puppy running into that empty house.\" The boys heaved a sigh of relief. They rushed into the house. When they saw Sparkle, they rejoiced. After the incident, they promised to always be kind and to help anyone in need.\n\n(Adapted from A Kind Act)",
      question: "Samy and Peter were worried last Sunday because Sparkle __________.",
      options: [
        { label: "1", text: "was crying" },
        { label: "2", text: "was injured" },
        { label: "3", text: "could not be found" },
        { label: "4", text: "could not be taken care of" },
      ],
      answer: "3",
      solution: {
        method: "Reading comprehension – cause and effect",
        steps: [
          'Paragraph 2: "Last Sunday, Peter noticed that Sparkle was missing. The boys searched the house but could not find it. They were worried..."',
          "The reason they were worried = Sparkle was missing (could not be found).",
          "Sparkle was not crying or injured (those describe Meng Wee).",
          "→ Answer: (3) could not be found",
        ],
        tip: "Track the sequence: Sparkle missing → searched → couldn't find → worried.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q37",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 37,
      marks: 3,
      passageTitle: "Comprehension 1 – A Kind Act",
      passage:
        "Last month, Samy was in the park with his friend, Peter. They were taking a walk. Just then, Samy spotted a puppy. It looked scared. Samy gently picked it up while Peter looked around the park. He was hoping to find its owner but there was no one in sight. They realised the puppy was lost and decided to take it home. Samy named it Sparkle. The boys took turns to look after it.\n\nLast Sunday, Peter noticed that Sparkle was missing. The boys searched the house but could not find it. They were worried and decided to search for Sparkle around the neighbourhood.\n\nWhile searching, the boys shouted, \"Sparkle, where are you?\" They hoped to get Sparkle's attention. Suddenly, Peter saw a little boy crying in pain and holding on to his leg. Peter and Samy immediately helped the boy up to a bench nearby. They cleaned his wound and put a plaster on it.\n\nFeeling better, the little boy spoke in a soft voice, \"Hi, I'm Meng Wee. Are you looking for your puppy? While I was playing, I saw a puppy running into that empty house.\" The boys heaved a sigh of relief. They rushed into the house. When they saw Sparkle, they rejoiced. After the incident, they promised to always be kind and to help anyone in need.\n\n(Adapted from A Kind Act)",
      question:
        "Match the following characters to their actions in the passage by drawing a straight line to connect them.\n\nPeter — … — looked for the puppy's owner.\nMeng Wee — … — gave the puppy a name.\nSamy — … — cried in pain.",
      answer:
        "Peter → looked for the puppy's owner.\nMeng Wee → cried in pain.\nSamy → gave the puppy a name.",
      solution: {
        method: "Reading comprehension – matching characters to actions",
        steps: [
          'Peter: "He was hoping to find its owner" (paragraph 1) → looked for the puppy\'s owner.',
          'Samy: "Samy named it Sparkle" (paragraph 1) → gave the puppy a name.',
          'Meng Wee: "a little boy crying in pain and holding on to his leg" → the boy who cried in pain = Meng Wee (he introduced himself later).',
        ],
        tip: "Scan the passage for each character's name and underline what they do.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q38",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 38,
      marks: 1,
      passageTitle: "Comprehension 1 – A Kind Act",
      passage:
        "Last month, Samy was in the park with his friend, Peter. They were taking a walk. Just then, Samy spotted a puppy. It looked scared. Samy gently picked it up while Peter looked around the park. He was hoping to find its owner but there was no one in sight. They realised the puppy was lost and decided to take it home. Samy named it Sparkle. The boys took turns to look after it.\n\nLast Sunday, Peter noticed that Sparkle was missing. The boys searched the house but could not find it. They were worried and decided to search for Sparkle around the neighbourhood.\n\nWhile searching, the boys shouted, \"Sparkle, where are you?\" They hoped to get Sparkle's attention. Suddenly, Peter saw a little boy crying in pain and holding on to his leg. Peter and Samy immediately helped the boy up to a bench nearby. They cleaned his wound and put a plaster on it.\n\nFeeling better, the little boy spoke in a soft voice, \"Hi, I'm Meng Wee. Are you looking for your puppy? While I was playing, I saw a puppy running into that empty house.\" The boys heaved a sigh of relief. They rushed into the house. When they saw Sparkle, they rejoiced. After the incident, they promised to always be kind and to help anyone in need.\n\n(Adapted from A Kind Act)",
      question: 'Which word in paragraph 4 means "jumped for joy"?',
      answer: "rejoiced",
      solution: {
        method: "Vocabulary in context – finding a word with given meaning",
        steps: [
          "Locate paragraph 4: last paragraph of the passage.",
          '"When they saw Sparkle, they rejoiced."',
          '"Rejoiced" means to feel or show great joy; commonly described as jumping for joy.',
          "→ Answer: rejoiced",
        ],
        tip: '"Rejoiced" = felt extreme happiness/joy; synonyms include celebrated, jumped for joy.',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q39",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 39,
      marks: 2,
      passageTitle: "Comprehension 1 – A Kind Act",
      passage:
        "Last month, Samy was in the park with his friend, Peter. They were taking a walk. Just then, Samy spotted a puppy. It looked scared. Samy gently picked it up while Peter looked around the park. He was hoping to find its owner but there was no one in sight. They realised the puppy was lost and decided to take it home. Samy named it Sparkle. The boys took turns to look after it.\n\nLast Sunday, Peter noticed that Sparkle was missing. The boys searched the house but could not find it. They were worried and decided to search for Sparkle around the neighbourhood.\n\nWhile searching, the boys shouted, \"Sparkle, where are you?\" They hoped to get Sparkle's attention. Suddenly, Peter saw a little boy crying in pain and holding on to his leg. Peter and Samy immediately helped the boy up to a bench nearby. They cleaned his wound and put a plaster on it.\n\nFeeling better, the little boy spoke in a soft voice, \"Hi, I'm Meng Wee. Are you looking for your puppy? While I was playing, I saw a puppy running into that empty house.\" The boys heaved a sigh of relief. They rushed into the house. When they saw Sparkle, they rejoiced. After the incident, they promised to always be kind and to help anyone in need.\n\n(Adapted from A Kind Act)",
      question:
        "What were two things the boys promised to do after the incident? [2 marks]",
      answer:
        "1. They promised to always be kind.\n2. They promised to help anyone in need.",
      solution: {
        method: "Reading comprehension – locating two specific promises",
        steps: [
          "Locate the final sentence: 'After the incident, they promised to always be kind and to help anyone in need.'",
          "Two promises are joined by 'and':",
          "1. to always be kind",
          "2. to help anyone in need",
          "Award 1 mark for each correct promise (accept paraphrases).",
        ],
        tip: '"And" joins two separate promises; find the two parts on either side of the conjunction.',
      },
    },

    // =========================================================================
    // SECTION G: COMPREHENSION 2  (Q40–45)  8 marks
    // Passage: "Friendship" – Elise and Mei Lin at a treasure hunt school camp.
    // =========================================================================
    {
      id: "eoy_acsprimary_p2b_2023_q40",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 40,
      marks: 1,
      passageTitle: "Comprehension 2 – Friendship",
      passage:
        "Elise and Mei Lin were neighbours and attended the same school. They were good friends and would always spend time together. One day, they attended a school camp. They took part in a treasure hunt for the first time and were determined to win.\n\nDuring the camp, Mrs Tan, their teacher, conducted a briefing for all the participating teams. Elise and Mei Lin did not pay attention. They were busy talking about how to win the hunt. After the briefing, each team was given ten minutes to confirm their plans before setting off. Elise and Mei Lin argued about whose plan was better. After the ten minutes was up, they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure, unlike other teams who were doing well.\n\nWhen they realised they were losing, Elise and Mei Lin got upset and started blaming each other. \"You didn't collect the map!\" Mei Lin complained. \"You didn't listen attentively to the clues given during the briefing,\" Elise argued. Mrs Tan witnessed them arguing and advised, \"Good friends should be working together instead of quarrelling.\"\n\nAfter hearing that, they felt foolish and began working together as a team. Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning. For the rest of the camp, they worked well together and enjoyed each other's company. Mrs Tan was pleased that the girls had learnt a valuable lesson.\n\n(Adapted from Friendship)",
      question: "Elise and Mei Lin were good friends and __________.",
      options: [
        { label: "1", text: "attended different schools" },
        { label: "2", text: "enjoyed spending time together" },
        { label: "3", text: "took part in many treasure hunts" },
        { label: "4", text: "did not like attending school camps" },
      ],
      answer: "2",
      solution: {
        method: "Reading comprehension – confirming stated facts",
        steps: [
          'Paragraph 1: "They were good friends and would always spend time together."',
          '"Would always spend time together" = enjoyed spending time together.',
          "They attended the same school (not different schools).",
          "This was their first treasure hunt.",
          "→ Answer: (2) enjoyed spending time together",
        ],
        tip: '"Would always spend time together" is a paraphrase for "enjoyed spending time together".',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q41",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 41,
      marks: 1,
      passageTitle: "Comprehension 2 – Friendship",
      passage:
        "Elise and Mei Lin were neighbours and attended the same school. They were good friends and would always spend time together. One day, they attended a school camp. They took part in a treasure hunt for the first time and were determined to win.\n\nDuring the camp, Mrs Tan, their teacher, conducted a briefing for all the participating teams. Elise and Mei Lin did not pay attention. They were busy talking about how to win the hunt. After the briefing, each team was given ten minutes to confirm their plans before setting off. Elise and Mei Lin argued about whose plan was better. After the ten minutes was up, they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure, unlike other teams who were doing well.\n\nWhen they realised they were losing, Elise and Mei Lin got upset and started blaming each other. \"You didn't collect the map!\" Mei Lin complained. \"You didn't listen attentively to the clues given during the briefing,\" Elise argued. Mrs Tan witnessed them arguing and advised, \"Good friends should be working together instead of quarrelling.\"\n\nAfter hearing that, they felt foolish and began working together as a team. Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning. For the rest of the camp, they worked well together and enjoyed each other's company. Mrs Tan was pleased that the girls had learnt a valuable lesson.\n\n(Adapted from Friendship)",
      question:
        "Elise and Mei Lin could not find any treasure because they __________.",
      options: [
        { label: "1", text: "did not have a plan" },
        { label: "2", text: "were not given time to plan" },
        { label: "3", text: "had argued with the other teams" },
        { label: "4", text: "were not determined to win the treasure hunt" },
      ],
      answer: "1",
      solution: {
        method: "Reading comprehension – cause and effect",
        steps: [
          'Paragraph 2: "they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure..."',
          '"Without having a plan" = did not have a plan.',
          "They were given time (ten minutes) but wasted it arguing.",
          "→ Answer: (1) did not have a plan",
        ],
        tip: 'The phrase "As a result" signals a cause-and-effect relationship; find the cause before it.',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q42",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 42,
      marks: 1,
      passageTitle: "Comprehension 2 – Friendship",
      passage:
        "Elise and Mei Lin were neighbours and attended the same school. They were good friends and would always spend time together. One day, they attended a school camp. They took part in a treasure hunt for the first time and were determined to win.\n\nDuring the camp, Mrs Tan, their teacher, conducted a briefing for all the participating teams. Elise and Mei Lin did not pay attention. They were busy talking about how to win the hunt. After the briefing, each team was given ten minutes to confirm their plans before setting off. Elise and Mei Lin argued about whose plan was better. After the ten minutes was up, they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure, unlike other teams who were doing well.\n\nWhen they realised they were losing, Elise and Mei Lin got upset and started blaming each other. \"You didn't collect the map!\" Mei Lin complained. \"You didn't listen attentively to the clues given during the briefing,\" Elise argued. Mrs Tan witnessed them arguing and advised, \"Good friends should be working together instead of quarrelling.\"\n\nAfter hearing that, they felt foolish and began working together as a team. Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning. For the rest of the camp, they worked well together and enjoyed each other's company. Mrs Tan was pleased that the girls had learnt a valuable lesson.\n\n(Adapted from Friendship)",
      question:
        "True or False? Elise and Mei Lin were punished by Mrs Tan for quarrelling.",
      answer: "False",
      solution: {
        method: "Reading comprehension – true/false verification",
        steps: [
          'Paragraph 3: "Mrs Tan witnessed them arguing and advised, \'Good friends should be working together instead of quarrelling.\'"',
          "Mrs Tan gave advice, not punishment.",
          "The passage does not mention any punishment.",
          "→ Answer: False",
        ],
        tip: 'Distinguish between "advised" (gave advice) and "punished". They are very different actions.',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q43",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 43,
      marks: 1,
      passageTitle: "Comprehension 2 – Friendship",
      passage:
        "Elise and Mei Lin were neighbours and attended the same school. They were good friends and would always spend time together. One day, they attended a school camp. They took part in a treasure hunt for the first time and were determined to win.\n\nDuring the camp, Mrs Tan, their teacher, conducted a briefing for all the participating teams. Elise and Mei Lin did not pay attention. They were busy talking about how to win the hunt. After the briefing, each team was given ten minutes to confirm their plans before setting off. Elise and Mei Lin argued about whose plan was better. After the ten minutes was up, they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure, unlike other teams who were doing well.\n\nWhen they realised they were losing, Elise and Mei Lin got upset and started blaming each other. \"You didn't collect the map!\" Mei Lin complained. \"You didn't listen attentively to the clues given during the briefing,\" Elise argued. Mrs Tan witnessed them arguing and advised, \"Good friends should be working together instead of quarrelling.\"\n\nAfter hearing that, they felt foolish and began working together as a team. Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning. For the rest of the camp, they worked well together and enjoyed each other's company. Mrs Tan was pleased that the girls had learnt a valuable lesson.\n\n(Adapted from Friendship)",
      question:
        "True or False? Elise and Mei Lin did not win the treasure hunt.",
      answer: "True",
      solution: {
        method: "Reading comprehension – true/false verification",
        steps: [
          'Paragraph 4: "Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning."',
          "The passage explicitly states they did not win.",
          "→ Answer: True",
        ],
        tip: '"Even though they did not win" directly confirms the statement is True.',
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q44",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 44,
      marks: 2,
      passageTitle: "Comprehension 2 – Friendship",
      passage:
        "Elise and Mei Lin were neighbours and attended the same school. They were good friends and would always spend time together. One day, they attended a school camp. They took part in a treasure hunt for the first time and were determined to win.\n\nDuring the camp, Mrs Tan, their teacher, conducted a briefing for all the participating teams. Elise and Mei Lin did not pay attention. They were busy talking about how to win the hunt. After the briefing, each team was given ten minutes to confirm their plans before setting off. Elise and Mei Lin argued about whose plan was better. After the ten minutes was up, they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure, unlike other teams who were doing well.\n\nWhen they realised they were losing, Elise and Mei Lin got upset and started blaming each other. \"You didn't collect the map!\" Mei Lin complained. \"You didn't listen attentively to the clues given during the briefing,\" Elise argued. Mrs Tan witnessed them arguing and advised, \"Good friends should be working together instead of quarrelling.\"\n\nAfter hearing that, they felt foolish and began working together as a team. Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning. For the rest of the camp, they worked well together and enjoyed each other's company. Mrs Tan was pleased that the girls had learnt a valuable lesson.\n\n(Adapted from Friendship)",
      question:
        "Put the events involving Elise and Mei Lin in the right sequence (1–4).\n\n[ ] They went for a school camp.\n[ ] They cooperated with each other.\n[ ] They listened to Mrs Tan's advice.\n[ ] They attended a briefing.",
      answer: "1 – They went for a school camp.\n4 – They cooperated with each other.\n3 – They listened to Mrs Tan's advice.\n2 – They attended a briefing.",
      solution: {
        method: "Reading comprehension – sequencing events",
        steps: [
          "Event 1 (first): They went for a school camp. (Paragraph 1)",
          "Event 2 (second): They attended a briefing during the camp. (Paragraph 2)",
          "Event 3 (third): They listened to Mrs Tan's advice when she intervened. (Paragraph 3)",
          "Event 4 (last): They cooperated with each other after the advice. (Paragraph 4)",
          "Sequence: 1, 4, 3, 2 → correct order is 1, 2, 3, 4 for the events listed.",
        ],
        tip: "Trace the story paragraph by paragraph to put events in story order.",
      },
    },

    {
      id: "eoy_acsprimary_p2b_2023_q45",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 45,
      marks: 2,
      passageTitle: "Comprehension 2 – Friendship",
      passage:
        "Elise and Mei Lin were neighbours and attended the same school. They were good friends and would always spend time together. One day, they attended a school camp. They took part in a treasure hunt for the first time and were determined to win.\n\nDuring the camp, Mrs Tan, their teacher, conducted a briefing for all the participating teams. Elise and Mei Lin did not pay attention. They were busy talking about how to win the hunt. After the briefing, each team was given ten minutes to confirm their plans before setting off. Elise and Mei Lin argued about whose plan was better. After the ten minutes was up, they still could not decide and went to look for the treasure without having a plan. As a result, they could not find any treasure, unlike other teams who were doing well.\n\nWhen they realised they were losing, Elise and Mei Lin got upset and started blaming each other. \"You didn't collect the map!\" Mei Lin complained. \"You didn't listen attentively to the clues given during the briefing,\" Elise argued. Mrs Tan witnessed them arguing and advised, \"Good friends should be working together instead of quarrelling.\"\n\nAfter hearing that, they felt foolish and began working together as a team. Even though they did not win the treasure hunt, they learnt that working together as a team was more important than winning. For the rest of the camp, they worked well together and enjoyed each other's company. Mrs Tan was pleased that the girls had learnt a valuable lesson.\n\n(Adapted from Friendship)",
      question:
        "Why did Elise and Mei Lin feel foolish during the treasure hunt? [2 marks]",
      answer:
        "Elise and Mei Lin felt foolish after listening to Mrs Tan's advice because they realised they had not been working together as a team / they had been quarrelling instead of cooperating.",
      solution: {
        method: "Reading comprehension – inferring reason/cause",
        steps: [
          'Paragraph 4: "After hearing that, they felt foolish and began working together as a team."',
          '"That" refers to Mrs Tan\'s advice: "Good friends should be working together instead of quarrelling."',
          "They felt foolish because they realised they had been quarrelling and not cooperating, which was not what good friends should do.",
          "Accept answers that mention: (1) they were not working together, or (2) they had been quarrelling/blaming each other.",
        ],
        tip: "The word 'foolish' links to their earlier behaviour – find what they regretted doing.",
      },
    },
  ],
};

export default eoy_acsprimary_p2b_2023;
