// ============================================================
// Raffles Girls' Primary School — SA2 2023 Mock Exam (P3)
// English Language Paper  (50 marks, 1 h 15 min)
// Sections: A Grammar MCQ | B Vocabulary MCQ | C Vocabulary Cloze
//           D Grammar Cloze | E Comprehension OE (x2)
// ============================================================

import type {
  TopicType,
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Raffles Girls' Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "SA2 Mock Exam",
  year: 2023,
  totalMarks: 50,
  timeMinutes: 75,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Grammar MCQ  (Q1–Q10, 10 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "rgps2023-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Look at __________ group of girls dancing at the park across the road.",
    options: ["(1) this", "(2) that", "(3) these", "(4) those"],
    answer: "2",
    solution: {
      method: "Demonstrative pronouns: near vs far, singular vs plural.",
      steps: [
        "The subject is 'group' — a singular noun.",
        "The group is located 'across the road' — it is FAR from the speaker.",
        "For singular + far: use THAT.",
        "'this' = singular + near → wrong distance.",
        "'these' = plural + near → wrong number and distance.",
        "'those' = plural + far → wrong number.",
        "Answer: (2) that.",
      ],
      tip: "Near: this (singular), these (plural). Far: that (singular), those (plural). 'Group' is singular → that/this.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Since we had __________ time, we went to the library before returning to the classroom.",
    options: ["(1) little", "(2) many", "(3) some", "(4) a few"],
    answer: "3",
    solution: {
      method: "Quantifier agreement: 'time' is uncountable → only certain quantifiers apply.",
      steps: [
        "'time' (free time) is an UNCOUNTABLE noun.",
        "Quantifiers for uncountable nouns: little, much, some, a little, a lot of.",
        "'many' → used with countable plural nouns → INCORRECT.",
        "'a few' → used with countable plural nouns → INCORRECT.",
        "'little' → 'Since we had little time' = because we had almost no time → grammatically correct but meaning: they had VERY LITTLE time, yet went to library. Possible but context says they DID go, implying enough time.",
        "'some' → we had some time = enough time to visit library → BEST FIT for context.",
        "Answer: (3) some.",
      ],
      tip: "'Some time' means a reasonable amount. 'Little time' means barely any. The context (they DID visit the library) implies they had enough → 'some'.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question: "How does Jim __________ to school every day?",
    options: ["(1) go", "(2) went", "(3) goes", "(4) going"],
    answer: "3",
    solution: {
      method: "Subject-verb agreement: third person singular present simple.",
      steps: [
        "Subject: 'Jim' = third person singular (he).",
        "'every day' signals habitual action → SIMPLE PRESENT tense.",
        "Third person singular present: add -s/-es to the verb.",
        "go → goes (for he/she/it).",
        "'go' → used with I/you/we/they → WRONG for Jim.",
        "'went' → simple past → WRONG tense ('every day' = habit, not past).",
        "'going' → present participle → needs auxiliary (is going) → WRONG alone.",
        "Answer: (3) goes.",
      ],
      tip: "He/She/It → adds -s in present simple: go → goes, run → runs, eat → eats.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question: "There is no pupil in the classroom. Has __________ left?",
    options: [
      "(1) anyone",
      "(2) nobody",
      "(3) everybody",
      "(4) somebody",
    ],
    answer: "1",
    solution: {
      method: "Indefinite pronouns in questions: use 'anyone' in interrogative sentences.",
      steps: [
        "The sentence is a QUESTION: 'Has __________ left?'",
        "In questions, we use 'anyone' (not 'somebody'/'everybody'/'nobody').",
        "'nobody' → used in negative statements ('Nobody has left') → creates double negative in question context.",
        "'everybody' → means all people → illogical (no one is there).",
        "'somebody' → used in positive statements/requests → 'Has somebody left?' is grammatically possible but 'anyone' is more natural in questions.",
        "Standard rule: anybody/anyone in questions; somebody/someone in positives; nobody/no one in negatives.",
        "Answer: (1) anyone.",
      ],
      tip: "Question → anyone/anybody. Positive → someone/somebody. Negative → no one/nobody. 'Has anyone left?' is standard.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Xiao Li can sing __________ than her sister.",
    options: [
      "(1) beautiful",
      "(2) beautifully",
      "(3) more beautifully",
      "(4) most beautifully",
    ],
    answer: "3",
    solution: {
      method: "Comparative adverb: 'than' signals comparison between two people.",
      steps: [
        "'than her sister' → comparing two people → COMPARATIVE form required.",
        "Base adverb: beautifully (adverb modifying 'sing').",
        "Comparative of multi-syllable adverbs: MORE + adverb (more beautifully).",
        "'beautiful' → adjective, not adverb → WRONG (must modify verb 'sing').",
        "'beautifully' → base form, no comparison → WRONG.",
        "'most beautifully' → superlative (for 3+ people) → WRONG for comparing two.",
        "Answer: (3) more beautifully.",
      ],
      tip: "Two people → comparative: more beautifully. Three or more → superlative: most beautifully. Always use the adverb form (-ly) to modify verbs.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Since the restaurants are closed, we will eat __________ home.",
    options: ["(1) in", "(2) at", "(3) against", "(4) between"],
    answer: "2",
    solution: {
      method: "Preposition of place: fixed expression 'at home'.",
      steps: [
        "The expression for being/eating at one's house is 'AT home'.",
        "'at home' is a fixed prepositional phrase in English.",
        "'in home' is NOT standard English.",
        "'against' / 'between' → no connection to eating at home.",
        "Answer: (2) at.",
      ],
      tip: "Fixed phrases: at home, at school, at work, at the hospital. Use 'in' for rooms/buildings: 'in the kitchen', 'in the house'.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q7",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Last night, John did not __________ his homework as he had a terrible headache.",
    options: [
      "(1) complete",
      "(2) completes",
      "(3) completed",
      "(4) completing",
    ],
    answer: "1",
    solution: {
      method: "Auxiliary verb 'did not' requires base form of main verb.",
      steps: [
        "'did not' is the negative auxiliary in past simple.",
        "After 'did not', the main verb must be in the BASE FORM.",
        "'complete' (base form) → CORRECT.",
        "'completes' → third person singular present → WRONG after 'did not'.",
        "'completed' → simple past → WRONG (already marked by 'did').",
        "'completing' → present participle → WRONG alone after 'did not'.",
        "Answer: (1) complete.",
      ],
      tip: "Did + not + BASE FORM. The 'did' already carries the past tense, so the main verb stays in base form.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q8",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Billy came in last for the race __________ he was happy that he had completed it.",
    options: ["(1) as", "(2) but", "(3) since", "(4) unless"],
    answer: "2",
    solution: {
      method: "Conjunction: choose the word that expresses contrast.",
      steps: [
        "Two contrasting ideas: came in LAST (negative) vs. was HAPPY (positive).",
        "'but' = conjunction showing contrast/concession → PERFECT here.",
        "'as' = because / while → would show reason, not contrast.",
        "'since' = because / from the time that → reason, not contrast.",
        "'unless' = if not → conditional, not contrast.",
        "Answer: (2) but.",
      ],
      tip: "Contrast words: but, however, although, yet, even though. When two opposite ideas are joined, use 'but' as a simple coordinating conjunction.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q9",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Jane __________ Malaysia next month.",
    options: [
      "(1) visit",
      "(2) visited",
      "(3) visiting",
      "(4) is visiting",
    ],
    answer: "4",
    solution: {
      method: "Present continuous used for future arrangements.",
      steps: [
        "'next month' signals a FUTURE event.",
        "Present continuous (is/am/are + -ing) is commonly used for planned future events.",
        "'visit' → base form; needs auxiliary for future → WRONG alone.",
        "'visited' → past tense → WRONG ('next month' is future).",
        "'visiting' → present participle; needs auxiliary → WRONG alone.",
        "'is visiting' → present continuous → expresses a planned future action → CORRECT.",
        "Answer: (4) is visiting.",
      ],
      tip: "Future plans: 'I am visiting' / 'She is visiting' uses present continuous. Compare: 'I will visit' (unplanned/decision now). Both are possible for future, but 'is visiting' signals a confirmed arrangement.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q10",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Amy can cycle very well, __________ she?",
    options: ["(1) can", "(2) can't", "(3) does", "(4) doesn't"],
    answer: "2",
    solution: {
      method: "Question tag: positive statement → negative tag, using the same auxiliary.",
      steps: [
        "Statement: 'Amy CAN cycle very well' → positive statement.",
        "Question tag rule: positive statement → NEGATIVE tag.",
        "Auxiliary in statement = CAN → tag uses CAN'T.",
        "Subject in statement = Amy (she) → tag uses 'she'.",
        "Correct tag: 'can't she?'",
        "'can' → positive tag → WRONG (would follow a negative statement).",
        "'does/doesn't' → WRONG auxiliary (statement uses 'can', not 'does').",
        "Answer: (2) can't.",
      ],
      tip: "Question tags always use the same auxiliary as the main sentence: can → can't, is → isn't, has → hasn't. Positive statement → negative tag (and vice versa).",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Vocabulary MCQ  (Q11–Q16, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "rgps2023-q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Andy strapped the watch on his __________ so he raised his hand to look at the time.",
    options: ["(1) wrist", "(2) neck", "(3) knee", "(4) knuckle"],
    answer: "1",
    solution: {
      method: "Vocabulary: identify correct body part for wearing a watch.",
      steps: [
        "A watch is worn on the WRIST.",
        "The clue 'raised his hand to look at the time' confirms the watch is on the hand/arm area.",
        "'neck' → you wear a necklace on the neck, not a watch.",
        "'knee' → unrelated to wearing a watch.",
        "'knuckle' → joints on fingers; not where a watch goes.",
        "Answer: (1) wrist.",
      ],
      tip: "Body part collocations: watch → wrist; necklace → neck; ring → finger; bracelet → wrist. You 'strap' a watch onto your wrist.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Kate had to __________ Janet's idea of wearing a bright dress to the party.",
    options: [
      "(1) think up",
      "(2) think for",
      "(3) think out",
      "(4) think over",
    ],
    answer: "4",
    solution: {
      method: "Phrasal verb: choose the phrasal verb meaning 'to consider carefully'.",
      steps: [
        "Context: Kate had to [reconsider / carefully consider] Janet's idea.",
        "'think up' = to invent or create something new → WRONG here (Kate didn't create the idea).",
        "'think for' = NOT a standard phrasal verb in this context.",
        "'think out' = to think carefully about all aspects, plan thoroughly → possible but less common for this context.",
        "'think over' = to consider something carefully before deciding → BEST FIT. 'Kate had to think over Janet's idea' = consider it carefully.",
        "Answer: (4) think over.",
      ],
      tip: "Phrasal verbs with 'think': think up (invent), think over (consider carefully), think through (consider all aspects). 'Think over' is used for reconsidering or mulling over someone else's proposal.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "I should not have kicked the hungry cat. I __________ and apologised for my cruel act.",
    options: [
      "(1) imitated",
      "(2) admired",
      "(3) repeated",
      "(4) regretted",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary in context: choose the word matching feeling sorry for a past action.",
      steps: [
        "The speaker did something bad (kicked a cat) and is apologising.",
        "'imitated' = copied → does not fit (speaker didn't copy anyone).",
        "'admired' = looked upon with respect → opposite of remorse.",
        "'repeated' = did it again → contradicts the apology.",
        "'regretted' = felt sorry about a past action → PERFECT FIT. 'I regretted and apologised.'",
        "Answer: (4) regretted.",
      ],
      tip: "Regret = feel sorry for something you did. It naturally pairs with 'apologised' — both express remorse for past actions.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Metal beams are often used as __________ to help workers get to the high parts of a tall structure.",
    options: [
      "(1) building",
      "(2) sculpting",
      "(3) scaffolding",
      "(4) brainstorming",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: identify the construction term for temporary metal frameworks.",
      steps: [
        "Key clues: 'metal beams', 'help workers get to high parts', 'tall structure'.",
        "'building' → noun for a structure; not what metal beams are used AS → WRONG.",
        "'sculpting' → artistic shaping; no connection to construction access → WRONG.",
        "'scaffolding' = a temporary framework of metal tubes/beams erected to allow workers to access high areas of a building → PERFECT FIT.",
        "'brainstorming' → generating ideas → completely unrelated.",
        "Answer: (3) scaffolding.",
      ],
      tip: "Scaffolding = temporary metal structure used by construction workers. Remember: scaffold → scaffolding (the system of connected beams).",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q15",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "There are very few baby gorillas born each year. We should protect these __________ animals from dying out altogether.",
    options: [
      "(1) aged",
      "(2) extinct",
      "(3) abandoned",
      "(4) endangered",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: conservation term for species with very few individuals remaining.",
      steps: [
        "Clue: 'very few baby gorillas' + 'from dying out altogether' → these animals are at risk of extinction.",
        "'aged' = old → describes age, not conservation status.",
        "'extinct' = no longer existing → but the animals still EXIST (we are protecting them). If extinct, no protection is needed.",
        "'abandoned' = deserted/left alone → not a conservation term.",
        "'endangered' = at serious risk of extinction, still alive → CORRECT. We protect them to prevent extinction.",
        "Answer: (4) endangered.",
      ],
      tip: "Endangered species → still alive but at risk (gorillas, tigers). Extinct species → completely gone (dinosaurs, dodos). Protect ENDANGERED animals so they don't BECOME extinct.",
    },
  },

  {
    kind: "A",
    id: "rgps2023-q16",
    topic: "VocabMCQ",
    marks: 1,
    question: "You will __________ the river by littering it with rubbish.",
    options: [
      "(1) pollute",
      "(2) recycle",
      "(3) beautify",
      "(4) conserve",
    ],
    answer: "1",
    solution: {
      method: "Vocabulary: choose the word that correctly describes the result of littering a river.",
      steps: [
        "Action: littering the river with rubbish.",
        "Result: the river becomes dirty/contaminated.",
        "'pollute' = make (water/air/environment) dirty with harmful substances → MATCHES littering a river.",
        "'recycle' = process waste to reuse it → opposite of littering.",
        "'beautify' = make more beautiful → opposite of littering.",
        "'conserve' = protect and preserve → opposite of littering.",
        "Answer: (1) pollute.",
      ],
      tip: "Pollute = make dirty (pollution is the result). You pollute the river, the air, the environment. Conserve = protect; Recycle = reuse; Beautify = make beautiful.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Vocabulary Cloze  (Q17–Q24, 8 marks)
  //  Passage: Television Watching
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rgps2023-secC",
    topic: "VocabCloze",
    marks: 8,
    passageTitle: "Television Watching",
    passageText:
      "Many of us like to watch television. Some cannot (17) __________ without this activity. Have you ever asked yourself how much (18) __________ you spend on it? Watching television can actually be (19) __________. When we are glued to the television, it becomes a (20) __________. Why?\n\nWatching too much television can be harmful to your (21) __________ health. You might run the risk of being (22) __________ through lack of exercise and eating too much unhealthy (23) __________. Getting carried away watching television for hours on end is common. However, you are (24) __________ to control this addiction by being disciplined.\n\nOnly then, can you enjoy this recreational activity and stay healthy at the same time.",
    wordBank: {
      A: "able",
      B: "addictive",
      C: "general",
      D: "inactivity",
      E: "live",
      F: "overweight",
      G: "problem",
      H: "snacks",
      J: "success",
      K: "time",
      L: "underweight",
      M: "watch",
    },
    questions: [
      {
        qid: "rgps2023-q17",
        blankLabel: "(17)",
        question: "Some cannot (17) __________ without this activity.",
        answer: "E",
        solution: {
          method: "Vocabulary cloze: find the word that collocates with 'cannot … without this activity'.",
          steps: [
            "'cannot ______ without this activity' — the blank needs a verb that makes sense.",
            "'live without' is a standard phrase meaning 'cannot exist/function without'.",
            "E (live) → 'Some cannot live without this activity' = they are addicted/dependent. CORRECT.",
            "M (watch) → 'cannot watch without' is redundant (talking about watching TV already).",
            "Answer: E (live).",
          ],
          tip: "'Cannot live without' is a fixed idiom meaning being very dependent on something.",
        },
      },
      {
        qid: "rgps2023-q18",
        blankLabel: "(18)",
        question: "Have you ever asked yourself how much (18) __________ you spend on it?",
        answer: "K",
        solution: {
          method: "Vocabulary: 'how much _______ you spend' needs an uncountable noun.",
          steps: [
            "'how much _____ you spend on it' — measuring the amount devoted to TV.",
            "K (time) → 'how much time you spend on it' → standard phrase. CORRECT.",
            "M (watch) → 'how much watch you spend' → ungrammatical.",
            "D (inactivity) → 'how much inactivity you spend' → doesn't collocate with 'spend'.",
            "Answer: K (time).",
          ],
          tip: "'Spend time on something' is a fixed collocation. You always 'spend time', not 'spend inactivity'.",
        },
      },
      {
        qid: "rgps2023-q19",
        blankLabel: "(19)",
        question: "Watching television can actually be (19) __________.",
        answer: "B",
        solution: {
          method: "Vocabulary: the passage then says 'it becomes a problem' — the reason is addiction.",
          steps: [
            "After saying watching TV 'can be (19)', the text says 'it becomes a (20)' — these are linked.",
            "B (addictive) → 'Watching television can actually be addictive' → TV can be habit-forming. CORRECT.",
            "This sets up the problem discussed in the rest of the passage.",
            "C (general) → 'can be general' → doesn't make sense.",
            "Answer: B (addictive).",
          ],
          tip: "'Addictive' means something that makes you want more and more of it — sugar, games, TV. The passage is about TV addiction.",
        },
      },
      {
        qid: "rgps2023-q20",
        blankLabel: "(20)",
        question: "When we are glued to the television, it becomes a (20) __________. Why?",
        answer: "G",
        solution: {
          method: "Vocabulary: 'becomes a ____' needs a noun expressing a negative issue.",
          steps: [
            "'it becomes a ___' — the word must be a singular noun after 'a'.",
            "G (problem) → 'it becomes a problem' → CORRECT. TV addiction is a problem.",
            "D (inactivity) → 'becomes a inactivity' → wrong article ('a' before vowel sound needs 'an').",
            "B (addictive) → adjective, not a noun → WRONG after 'a'.",
            "Answer: G (problem).",
          ],
          tip: "After 'a/an', you need a NOUN. 'A problem' is correct. The 'Why?' following confirms this is a negative consequence to be explained.",
        },
      },
      {
        qid: "rgps2023-q21",
        blankLabel: "(21)",
        question: "Watching too much television can be harmful to your (21) __________ health.",
        answer: "C",
        solution: {
          method: "Vocabulary: 'your _____ health' needs an adjective modifying health.",
          steps: [
            "C (general) → 'your general health' = your overall/overall well-being. CORRECT.",
            "'general health' is a very common phrase meaning overall health.",
            "D (inactivity) → 'your inactivity health' → doesn't collocate.",
            "Answer: C (general).",
          ],
          tip: "'General health' = overall health and well-being. Common collocation: 'general health', 'general knowledge', 'general public'.",
        },
      },
      {
        qid: "rgps2023-q22",
        blankLabel: "(22)",
        question: "You might run the risk of being (22) __________ through lack of exercise and eating too much unhealthy food.",
        answer: "F",
        solution: {
          method: "Vocabulary: result of no exercise + too much unhealthy food = ?",
          steps: [
            "Clues: 'lack of exercise' + 'eating too much unhealthy' food.",
            "F (overweight) → becoming overweight from inactivity + overeating unhealthy food. CORRECT.",
            "L (underweight) → OPPOSITE; would result from not eating enough.",
            "D (inactivity) → 'being inactivity' → grammatically wrong.",
            "Answer: F (overweight).",
          ],
          tip: "Overweight = weighing too much (from too much food + too little exercise). Underweight = weighing too little. Context points to overweight.",
        },
      },
      {
        qid: "rgps2023-q23",
        blankLabel: "(23)",
        question: "…eating too much unhealthy (23) __________.",
        answer: "H",
        solution: {
          method: "Vocabulary: what unhealthy food is commonly eaten while watching TV?",
          steps: [
            "The passage links eating unhealthy food with watching TV.",
            "H (snacks) → unhealthy snacks (chips, sweets, etc.) eaten while watching TV. CORRECT.",
            "'eating too much unhealthy snacks' → common with TV watching.",
            "M (watch) → 'eating too much unhealthy watch' → makes no sense.",
            "Answer: H (snacks).",
          ],
          tip: "Snacks = small foods eaten between meals, often associated with TV watching. Common unhealthy snacks: chips, popcorn, sweets.",
        },
      },
      {
        qid: "rgps2023-q24",
        blankLabel: "(24)",
        question: "However, you are (24) __________ to control this addiction by being disciplined.",
        answer: "A",
        solution: {
          method: "Vocabulary: 'you are _____ to control' — which word fits this structure?",
          steps: [
            "'you are _____ to control' → needs an adjective that works with 'to + verb'.",
            "A (able) → 'you are able to control' = you have the ability to control. CORRECT.",
            "J (success) → 'you are success to control' → grammatically wrong.",
            "'able to' is the standard expression meaning 'can' / 'have the ability to'.",
            "Answer: A (able).",
          ],
          tip: "'Are able to' = can. Fixed structure: subject + am/is/are + able + to + base verb. 'You are able to control this' = You can control this.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Grammar Cloze  (Q25–Q32, 8 marks)
  //  Cloze Passage 1: Johnny at the Playground
  //  Cloze Passage 2: Meeting Joey for Lunch
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rgps2023-secD-p1",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Johnny at the Playground",
    passageText:
      'Johnny was feeling bored at home one Sunday morning. He pleaded with his father to take him out to (25) __________. "Daddy, do you remember I last (26) __________ at the playground? It was two weeks ago," Johnny said. Seeing how bored Johnny was, his father agreed and took him to the playground.\n\nAt the playground, Johnny saw many friends. Soon, they started (27) __________ together. They had an enjoyable time. Now, Johnny always (28) __________ hide-and-seek at the playground with his friends. They look forward to seeing one another.',
    wordBank: {
      A: "have played",
      B: "is playing",
      C: "play",
      D: "played",
      E: "plays",
      F: "playing",
      G: "were playing",
    },
    questions: [
      {
        qid: "rgps2023-q25",
        blankLabel: "(25)",
        question:
          "He pleaded with his father to take him out to (25) __________.",
        answer: "C",
        solution: {
          method: "Verb form after infinitive 'to': base form required.",
          steps: [
            "'to take him out to ______' → after 'to' (infinitive marker), use BASE FORM.",
            "C (play) → base form → CORRECT.",
            "E (plays) → third person singular present → WRONG after 'to'.",
            "F (playing) → present participle → would need 'to be playing' → WRONG here.",
            "Answer: C (play).",
          ],
          tip: "After 'to' (infinitive), always use base form: to play, to go, to eat — never to plays, to playing.",
        },
      },
      {
        qid: "rgps2023-q26",
        blankLabel: "(26)",
        question:
          '"Daddy, do you remember I last (26) __________ at the playground? It was two weeks ago."',
        answer: "D",
        solution: {
          method: "Simple past: 'last' + specific time ('two weeks ago') → simple past.",
          steps: [
            "Clues: 'last' + 'two weeks ago' → definite past time reference.",
            "Simple past is used for completed actions at a specific past time.",
            "D (played) → simple past of play → CORRECT.",
            "A (have played) → present perfect → used for unspecified time, not 'two weeks ago'.",
            "G (were playing) → past continuous → would say 'last time I was playing' which is odd.",
            "Answer: D (played).",
          ],
          tip: "Specific past time (yesterday, last week, two weeks ago, in 2020) → SIMPLE PAST. Present perfect is used when NO specific time is given.",
        },
      },
      {
        qid: "rgps2023-q27",
        blankLabel: "(27)",
        question:
          "Soon, they started (27) __________ together.",
        answer: "F",
        solution: {
          method: "Verb after 'started': requires -ing (gerund) form.",
          steps: [
            "'started' can be followed by a gerund (-ing) or infinitive (to + base).",
            "'started playing' is more natural and common in this context.",
            "F (playing) → gerund → 'they started playing together'. CORRECT.",
            "C (play) → base form → would need 'started to play' → not in word bank.",
            "G (were playing) → past continuous → 'started were playing' → ungrammatical.",
            "Answer: F (playing).",
          ],
          tip: "start + -ing or start + to + base verb are both correct: 'started playing' = 'started to play'. F (playing) is the only -ing option that fits.",
        },
      },
      {
        qid: "rgps2023-q28",
        blankLabel: "(28)",
        question:
          "Now, Johnny always (28) __________ hide-and-seek at the playground with his friends.",
        answer: "E",
        solution: {
          method: "Habitual present with 'always': third person singular present.",
          steps: [
            "'Now … always' → habitual/repeated action in the present.",
            "Subject: 'Johnny' = third person singular (he).",
            "Present simple + always: he/she/it → verb + s/es.",
            "E (plays) → 'Johnny always plays hide-and-seek' → CORRECT.",
            "B (is playing) → present continuous → 'always' with continuous has a different nuance (annoying habit); here it's a regular habit. 'Plays' is more natural.",
            "Answer: E (plays).",
          ],
          tip: "'Always' with present simple = regular habit. 'Johnny always plays' = he does this regularly. 'Is always playing' would imply an annoying/irritating habit.",
        },
      },
    ],
  },

  {
    kind: "B",
    id: "rgps2023-secD-p2",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Meeting Joey for Lunch",
    passageText:
      "Yesterday after school, I met my best friend, Joey, for lunch. When he arrived (29) __________ the canteen, he took a seat. Then he put his schoolbag down (30) __________ a sigh. He had received the results (31) __________ his Science examination that day. He told me that he had failed the examination (32) __________ he had studied very hard for it. I encouraged him not to give up and treated him to a cup of ice-cream to cheer him up.",
    wordBank: {
      A: "although",
      B: "at",
      C: "because",
      D: "of",
      E: "on",
      F: "to",
      G: "with",
    },
    questions: [
      {
        qid: "rgps2023-q29",
        blankLabel: "(29)",
        question: "When he arrived (29) __________ the canteen, he took a seat.",
        answer: "B",
        solution: {
          method: "Preposition of place with 'arrived': 'arrive at' for specific places.",
          steps: [
            "'arrived _____ the canteen' — choosing the right preposition.",
            "Use 'arrive at' for specific, smaller places (canteen, airport, school, station).",
            "Use 'arrive in' for larger areas (cities, countries).",
            "B (at) → 'arrived at the canteen' → CORRECT.",
            "E (on) → 'arrived on' → not used with buildings/places.",
            "Answer: B (at).",
          ],
          tip: "Arrive AT: specific places (school, canteen, station, airport). Arrive IN: large areas (Singapore, the city, Japan).",
        },
      },
      {
        qid: "rgps2023-q30",
        blankLabel: "(30)",
        question: "Then he put his schoolbag down (30) __________ a sigh.",
        answer: "G",
        solution: {
          method: "Preposition in fixed phrase 'with a sigh'.",
          steps: [
            "'put his schoolbag down _____ a sigh' — what preposition accompanies 'a sigh'?",
            "The fixed phrase is 'WITH a sigh' = while sighing / accompanied by a sigh.",
            "G (with) → 'put it down with a sigh' → CORRECT.",
            "E (on) → 'with on a sigh' → ungrammatical.",
            "Answer: G (with).",
          ],
          tip: "Fixed expressions: 'with a sigh', 'with a smile', 'with a groan', 'with a laugh' — use 'with' to describe accompanying actions/sounds.",
        },
      },
      {
        qid: "rgps2023-q31",
        blankLabel: "(31)",
        question: "He had received the results (31) __________ his Science examination that day.",
        answer: "D",
        solution: {
          method: "Preposition of possession/connection: 'results OF'.",
          steps: [
            "'the results _____ his Science examination' — which preposition links results to exam?",
            "D (of) → 'the results of his Science examination' → CORRECT. Fixed collocation.",
            "F (to) → 'results to his exam' → ungrammatical.",
            "B (at) → 'results at his exam' → incorrect.",
            "Answer: D (of).",
          ],
          tip: "'The results of' is a fixed phrase. Similarly: 'the end of', 'the purpose of', 'the cost of'. 'Of' shows belonging/connection.",
        },
      },
      {
        qid: "rgps2023-q32",
        blankLabel: "(32)",
        question:
          "He told me that he had failed the examination (32) __________ he had studied very hard for it.",
        answer: "A",
        solution: {
          method: "Conjunction of contrast: failed despite studying hard.",
          steps: [
            "Two contrasting ideas: failed the exam vs. studied very hard.",
            "A (although) → 'failed the examination although he had studied very hard' → shows contrast/unexpected result. CORRECT.",
            "C (because) → 'failed because he studied hard' → illogical (studying hard wouldn't cause failure).",
            "F (to) → 'failed to he had studied' → ungrammatical.",
            "Answer: A (although).",
          ],
          tip: "'Although' introduces a concessive clause: the result is surprising given the condition. 'He failed although he studied hard' = the studying didn't lead to the expected result.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Comprehension 1: Robert Bruce & the Spider
  //  (Q33–Q39, 8 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rgps2023-secE1",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "Bruce and the Spider",
    passageText:
      "There was once a king of Scotland named Robert Bruce. During his rule, he was at war with the King of England, King Edward. King Edward had led a great army into Scotland to drive him out of the land.\n\nDuring the war, Bruce led his army to fight against their foes six times. In each battle, his men were beaten and driven into flight. At last, his army was scattered and they were forced to hide in the woods or caves. Bruce was tired and was ready to give up hope.\n\nOne day in the cave, Bruce lay on the ground and saw a spider weaving a web on the ceiling. He watched on as it laboured slowly with determination. Six times it tried to throw her thread from one beam to another, six times it fell short.\n\nHowever, the spider did not lose hope. It tried the seventh time. Bruce almost forgot his own troubles as he watched it closely. This time, the thread was carried safely to the beam. \"I will try a seventh time too!\" cried Bruce.\n\nImmediately, he arose and left the cave. He called his men together. He told them his plans. Soon, an army of brave and ready men gathered. Bruce led his men to fight another battle with King Edward and this time, they succeeded.\n\nAdapted from https://americanliterature.com/author/james-baldwin/short-story/bruce-and-the-spider",
    questions: [
      {
        qid: "rgps2023-q33",
        question:
          "In paragraph 1, who does the word 'him' refer to?",
        answer: "Bruce",
        solution: {
          method: "Pronoun reference: trace 'him' back to its antecedent in paragraph 1.",
          steps: [
            "Paragraph 1: 'King Edward had led a great army into Scotland to drive HIM out of the land.'",
            "Who is being driven out? → Robert Bruce (the king of Scotland, the subject of the passage).",
            "King Edward leads the army against Bruce → 'him' = Bruce.",
            "Answer: Bruce.",
          ],
          tip: "For pronoun reference questions, find the nearest earlier noun that the pronoun logically refers to. King Edward is doing the driving, so 'him' must be Bruce.",
        },
      },
      {
        qid: "rgps2023-q34",
        question:
          "In paragraph 2, which word has the same meaning as 'enemies'?",
        answer: "foes",
        solution: {
          method: "Synonym search in paragraph 2.",
          steps: [
            "Paragraph 2: 'Bruce led his army to fight against their FOES six times.'",
            "'Foes' = enemies, opponents in battle.",
            "Answer: foes.",
          ],
          tip: "Foes = enemies. Other synonyms: opponents, adversaries, rivals. In literature, 'foes' is a formal/archaic word for enemies.",
        },
      },
      {
        qid: "rgps2023-q35",
        question:
          "Which one of these qualities best describes the spider in paragraph 3?\n(a) careless  (b) obedient  (c) persevering",
        options: ["careless", "obedient", "persevering"],
        answer: "persevering",
        solution: {
          method: "Character description: identify the trait shown by the spider's behaviour.",
          steps: [
            "Paragraph 3: The spider tried SIX TIMES and failed, but kept trying.",
            "Paragraph 4: It tried a SEVENTH time and succeeded.",
            "'persevering' = continuing to try despite difficulties/failures → MATCHES spider's behaviour.",
            "'careless' = not taking care → opposite; spider 'laboured with determination'.",
            "'obedient' = following orders → irrelevant to the spider.",
            "Answer: persevering.",
          ],
          tip: "Perseverance = not giving up despite repeated failure. The spider's repeated attempts (6 fails → 7th success) is the classic example of perseverance.",
        },
      },
      {
        qid: "rgps2023-q36",
        question:
          "TRUE or FALSE: Bruce defeated the King of England six times.",
        answer: "False",
        solution: {
          method: "Literal comprehension: what actually happened in the six battles?",
          steps: [
            "Paragraph 2: 'Bruce led his army to fight against their foes six times. In each battle, his men were beaten and driven into flight.'",
            "Bruce's army was BEATEN six times, not the enemy.",
            "Statement says 'Bruce defeated the King of England six times' → OPPOSITE of what happened.",
            "Answer: False.",
          ],
          tip: "Read carefully: Bruce FOUGHT six times but was DEFEATED each time. The statement reverses the outcome.",
        },
      },
      {
        qid: "rgps2023-q37",
        question:
          "TRUE or FALSE: Bruce saw the spider in the cave weave a web on the ceiling.",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'Bruce lay on the ground and saw a spider WEAVING A WEB ON THE CEILING.'",
            "The statement matches the text exactly.",
            "Answer: True.",
          ],
          tip: "Locate the exact sentence in the passage. 'Weaving a web on the ceiling' → confirmed in paragraph 3.",
        },
      },
      {
        qid: "rgps2023-q38",
        question:
          "TRUE or FALSE: The spider succeeded in throwing the thread over the beam on the sixth try.",
        answer: "False",
        solution: {
          method: "Literal comprehension: count the spider's attempts.",
          steps: [
            "Paragraph 3: 'Six times it tried to throw her thread…six times it fell short.' → Failed on tries 1–6.",
            "Paragraph 4: 'It tried the SEVENTH time…the thread was carried safely to the beam.'",
            "Success came on the SEVENTH try, not the sixth.",
            "Answer: False.",
          ],
          tip: "The number is key: 6 fails, 7th success. This mirrors Bruce's 6 military defeats before his eventual victory.",
        },
      },
      {
        qid: "rgps2023-q39",
        question:
          "In paragraph 5, what two things did Bruce do after he called his men together? [2m]\ni) ___\nii) ___",
        answer:
          "i) He told his men his plans.\nii) He led his men to fight another battle with King Edward.",
        solution: {
          method: "Sequence comprehension: identify TWO actions after 'called his men together' in paragraph 5.",
          steps: [
            "Paragraph 5: 'He called his men together. He told them his plans. Soon, an army of brave and ready men gathered. Bruce led his men to fight another battle with King Edward.'",
            "Action 1 (after calling them together): He told them his plans.",
            "Action 2: Bruce led his men to fight another battle with King Edward.",
            "Write as complete sentences for full marks.",
          ],
          tip: "For 2-mark questions asking for TWO things, provide two separate, clearly labelled answers. Each answer must be a complete sentence.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Comprehension 2: Ben and His Mother
  //  (Q40–Q47, 10 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rgps2023-secF",
    topic: "ComprehensionOE",
    marks: 10,
    passageTitle: "Ben and His Mother",
    passageText:
      "Ben always had excellent results in his school report cards. Father had passed away when he was one and it was Mother, a clothes cleaner, who paid for all his school fees.\n\nOne day, Ben's friend remarked about how perfect Ben's hands were. Curious, he asked if Ben had ever helped Mother wash clothes before.\n\nThe question saddened Ben as Mother was the only one doing the housework. He had never lifted a finger to help her. She did not want him to. Instead, she wanted him to focus on studying. When Ben came home that evening, he asked Mother to let him clean her hands. Eyes lighting up, she readily showed her hands to Ben.\n\nBen held Mother's hands and washed them with soap. His tears fell as he noticed that they were so wrinkled and bruised. As he was rinsing the soap off her hands, Mother cried out because some bruises were so painful.\n\nBen thought about how the pair of wrinkled and bruised hands had washed the clothes every day. He thought about how that pair of old hands had paid for his school fees and ensured that he had a bright future. The bruises on Mother's hands were the price that she had to pay. After cleaning Mother's hands, Ben quietly washed all the remaining clothes for her, a task long overdue.\n\nAdapted from https://krishnatoday.com/appreciate-others-good-works/",
    questions: [
      {
        qid: "rgps2023-q40",
        question:
          "Based on the passage, what did Ben's mother work as? [1m]",
        answer: "A clothes cleaner.",
        solution: {
          method: "Literal comprehension: find the occupation in paragraph 1.",
          steps: [
            "Paragraph 1: 'it was Mother, a clothes cleaner, who paid for all his school fees.'",
            "Mother worked as a CLOTHES CLEANER.",
            "Answer: A clothes cleaner.",
          ],
          tip: "Always write a complete noun phrase or sentence. 'A clothes cleaner' is sufficient here.",
        },
      },
      {
        qid: "rgps2023-q41",
        question:
          "Which sentence in paragraph 1 tells you that Ben did very well in school? [1m]",
        answer:
          "Ben always had excellent results in his school report cards.",
        solution: {
          method: "Literal: identify the sentence that describes academic performance.",
          steps: [
            "Paragraph 1 has two sentences: (1) About excellent results; (2) About Father passing away and Mother paying fees.",
            "'Ben always had excellent results in his school report cards' = directly states he did very well.",
            "Answer: Ben always had excellent results in his school report cards.",
          ],
          tip: "Copy the sentence EXACTLY from the passage. This question asks 'which sentence' — give the full sentence.",
        },
      },
      {
        qid: "rgps2023-q42",
        question:
          "In paragraph 2, what made Ben's friend curious enough to ask him if he had ever helped Mother wash the clothes? [2m]",
        answer:
          "Ben's friend remarked about how perfect Ben's hands were, and this made him curious about whether Ben had ever helped Mother wash clothes before.",
        solution: {
          method: "Inferential comprehension: what triggered the friend's curiosity?",
          steps: [
            "Paragraph 2: 'Ben's friend remarked about how PERFECT Ben's hands were. Curious, he asked if Ben had ever helped Mother wash clothes before.'",
            "The friend noticed Ben's hands were PERFECT (smooth, undamaged).",
            "This was surprising since Ben's mother did manual washing work.",
            "The perfect hands made the friend wonder if Ben ever helped with washing.",
            "Write as a complete sentence explaining the cause.",
          ],
          tip: "The inference: perfect hands → Ben never did manual housework → friend was curious. Connect the cause (perfect hands) to the curiosity (did he help mother?).",
        },
      },
      {
        qid: "rgps2023-q43",
        question:
          "TRUE or FALSE with reason: Mother did not want him to do the housework. [1m]",
        answer:
          "True. Mother wanted him to focus on studying.",
        solution: {
          method: "True/False with text evidence from paragraph 3.",
          steps: [
            "Paragraph 3: 'She did not want him to [help with housework]. Instead, she wanted him to focus on studying.'",
            "Statement: Mother did not want him to do housework → TRUE.",
            "Reason: She wanted him to focus on studying.",
          ],
          tip: "For True/False with reason, always provide a reason from the passage. One sentence from the text is usually enough.",
        },
      },
      {
        qid: "rgps2023-q44",
        question:
          "TRUE or FALSE with reason: Ben had never helped his mother around the house. [1m]",
        answer:
          "True. Mother was the only one doing the housework.",
        solution: {
          method: "True/False with text evidence from paragraph 3.",
          steps: [
            "Paragraph 3: 'Mother was the only one doing the housework. He had never lifted a finger to help her.'",
            "Statement: Ben had never helped → TRUE.",
            "Reason: Mother was the only one doing the housework. / He had never lifted a finger to help her.",
          ],
          tip: "'Never lifted a finger' is an idiom meaning 'never made any effort to help'.",
        },
      },
      {
        qid: "rgps2023-q45",
        question:
          "TRUE or FALSE with reason: Mother was reluctant to show him her hands. [1m]",
        answer:
          "False. Mother readily showed her hands to Ben.",
        solution: {
          method: "True/False with text evidence from paragraph 3.",
          steps: [
            "Paragraph 3: 'Eyes lighting up, she READILY showed her hands to Ben.'",
            "'Readily' = willingly, without hesitation.",
            "Statement says 'reluctant' (unwilling) → OPPOSITE of 'readily'.",
            "Answer: False. Mother readily showed her hands to Ben.",
          ],
          tip: "'Reluctant' = unwilling. 'Readily' = willingly. These are opposites. 'Eyes lighting up' also shows happiness, not reluctance.",
        },
      },
      {
        qid: "rgps2023-q46",
        question:
          "Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in paragraph 4. [1m]\n\n___ Ben held and washed his mother's hands with soap.\n___ Ben saw the wrinkles and bruises on Mother's hands.\n___ Mother felt much pain in her hands when Ben rinsed the soap off them.",
        answer:
          "Ben held and washed his mother's hands with soap: 1\nBen saw the wrinkles and bruises on Mother's hands: 2\nMother felt much pain in her hands when Ben rinsed the soap off them: 3",
        solution: {
          method: "Sequence comprehension: map events to their order in paragraph 4.",
          steps: [
            "Paragraph 4 sequence: (1) 'Ben held Mother's hands and washed them with soap.' (2) 'His tears fell as he noticed that they were so wrinkled and bruised.' (3) 'As he was rinsing the soap off her hands, Mother cried out because some bruises were so painful.'",
            "Event 1: Held and washed with soap → ORDER 1.",
            "Event 2: Saw wrinkles and bruises → ORDER 2.",
            "Event 3: Mother felt pain when rinsing → ORDER 3.",
          ],
          tip: "Re-read the paragraph sentence by sentence and number each listed event as you find it.",
        },
      },
      {
        qid: "rgps2023-q47",
        question:
          "In what ways did Mother's hard work help Ben? [2m] (Refer to paragraph 5.)",
        answer:
          "Mother's hard work paid for Ben's school fees and ensured that he had a bright future.",
        solution: {
          method: "Comprehension OE: extract TWO ways from paragraph 5.",
          steps: [
            "Paragraph 5: 'He thought about how that pair of old hands had PAID FOR HIS SCHOOL FEES and ENSURED THAT HE HAD A BRIGHT FUTURE.'",
            "Way 1: Mother's hard work paid for Ben's school fees.",
            "Way 2: It ensured that Ben had a bright future.",
            "Combine into one sentence for the 2-mark answer, or write two separate sentences.",
          ],
          tip: "2-mark open-ended answers usually require two points. Find both in the same sentence in paragraph 5.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const rgps2023Paper = { meta, questions };
export default rgps2023Paper;
