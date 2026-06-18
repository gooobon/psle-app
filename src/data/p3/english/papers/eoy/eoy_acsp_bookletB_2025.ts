// ============================================================
// Anglo-Chinese School (Primary) — P3 English SA2 2022
// Paper 2, Booklet B  (30 marks total)
// Section D : Grammar Cloze 1 — Pronouns        (Q21–24, 4 marks)
// Section D : Grammar Cloze 2 — Subject-Verb Agr (Q25–28, 4 marks)
// Section E : Editing                            (Q29–34, 6 marks)
// Section F : Comprehension 1 "Careless Julia"   (Q35–39, 8 marks)
// Section G : Comprehension 2 "Friendship"       (Q40–45, 8 marks)
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  SECTION D — Grammar Cloze 1: Pronouns (Q21–24, 4 marks)
//  Passage: A Day Out in Bukit Timah
//  Word bank: A=he, B=his, C=him, D=they, E=their, F=them
// ============================================================

export const grammarCloze1: QuestionTypeB = {
  kind: "set",
  id: "acsp_sa2_2022_D_gc1",
  topic: "GrammarCloze",
  passage:
    "Last Sunday, Jason and his family hiked at the Bukit Timah Nature Reserve. (21) ___ saw many plants and animals. Jason spotted some monkeys. (22) ___ planned to tell his friends about them. He took photographs of the monkeys using (23) ___ camera. A while later, Jason's sister spotted two squirrels. She saw (24) ___ hiding in a tree. It was an interesting trip.\n\nAdapted from A Day Out in Bukit Timah\n\n[Word bank: A=he, B=his, C=him, D=they, E=their, F=them]",
  questions: [
    {
      id: "acsp_sa2_2022_D_gc1_21",
      marks: 1,
      question:
        "(21) ___ saw many plants and animals.\n[Word bank: A=he, B=his, C=him, D=they, E=their, F=them]",
      answer: "D (they)",
      solution: {
        method: "Pronoun reference — subject pronoun for plural group",
        steps: [
          "Subject of 'saw': who saw many plants and animals?",
          "Referring back: 'Jason and his family' = a group of people = plural.",
          "Subject pronoun for a plural third-person group = 'they'.",
          "Word bank option D = 'they' ✓.",
          "'he' (A) = singular — Jason alone; but 'Jason AND his family' is plural.",
          "'him' (C) = object pronoun, cannot be a subject.",
          "'their' (E) = possessive pronoun — cannot be the subject of 'saw'.",
        ],
        tip: "'Jason and his family' is plural (more than one person), so we use 'they' (subject) or 'them' (object). 'They saw...' = they are the ones doing the seeing = subject → 'they'.",
      },
    },
    {
      id: "acsp_sa2_2022_D_gc1_22",
      marks: 1,
      question:
        "Jason spotted some monkeys. (22) ___ planned to tell his friends about them.\n[Word bank: A=he, B=his, C=him, D=they, E=their, F=them]",
      answer: "A (he)",
      solution: {
        method: "Pronoun reference — singular male subject",
        steps: [
          "Subject of 'planned': who planned to tell his friends?",
          "The sentence refers specifically to 'Jason' (who just spotted the monkeys).",
          "Clue: '...tell HIS friends' — possessive 'his' confirms the subject is male and singular.",
          "Subject pronoun for singular male = 'he'.",
          "Word bank option A = 'he' ✓.",
          "'they' (D) = plural — but only Jason (singular) is the subject here.",
          "'him' (C) = object pronoun — cannot be the subject.",
        ],
        tip: "The possessive 'his' in the same sentence (his friends) confirms the subject is a male singular person — Jason. Subject pronoun for a male = 'he'.",
      },
    },
    {
      id: "acsp_sa2_2022_D_gc1_23",
      marks: 1,
      question:
        "He took photographs of the monkeys using (23) ___ camera.\n[Word bank: A=he, B=his, C=him, D=they, E=their, F=them]",
      answer: "B (his)",
      solution: {
        method: "Possessive pronoun — belonging to Jason",
        steps: [
          "Blank position: 'using ___ camera' — we need a word showing WHO the camera belongs to.",
          "The camera belongs to Jason (he = Jason).",
          "Possessive pronoun for 'he' = 'his'.",
          "Word bank option B = 'his' ✓.",
          "'he' (A) = subject pronoun — cannot modify a noun.",
          "'him' (C) = object pronoun — cannot modify a noun.",
          "'their' (E) = possessive for they/them — Jason is one person, not 'they'.",
        ],
        tip: "Possessive pronouns show ownership: my, his, her, its, our, their. 'His camera' = the camera belonging to him (Jason). We need a possessive here because it comes before a noun (camera).",
      },
    },
    {
      id: "acsp_sa2_2022_D_gc1_24",
      marks: 1,
      question:
        "Jason's sister spotted two squirrels. She saw (24) ___ hiding in a tree.\n[Word bank: A=he, B=his, C=him, D=they, E=their, F=them]",
      answer: "F (them)",
      solution: {
        method: "Object pronoun — replacing plural noun",
        steps: [
          "Blank position: 'She saw ___ hiding in a tree.'",
          "What did she see? → the two squirrels (already mentioned).",
          "We need an OBJECT pronoun to replace 'the two squirrels' (plural).",
          "Object pronoun for plural things/people = 'them'.",
          "Word bank option F = 'them' ✓.",
          "'they' (D) = subject pronoun — 'She saw they' is grammatically wrong.",
          "'their' (E) = possessive — cannot be the object of 'saw'.",
        ],
        tip: "Subject pronouns (they) do the action; object pronouns (them) receive the action. 'She SAW THEM' = them is the object (receiving the action of seeing). Compare: 'They hid' (subject) vs 'She saw them' (object).",
      },
    },
  ],
};

// ============================================================
//  SECTION D — Grammar Cloze 2: Subject-Verb Agreement (Q25–28, 4 marks)
//  Passage: Road Safety for Children
// ============================================================

export const grammarCloze2: QuestionTypeB = {
  kind: "set",
  id: "acsp_sa2_2022_D_gc2",
  topic: "GrammarCloze",
  passage:
    "Road safety is important. My mother usually (25) [advise / advises] me to be careful whenever I cross the road. I always listen to her. After school, my classmates and I (26) [walk / walks] to the nearby pedestrian crossing. We (27) [raise / raises] our hands to alert drivers on the road. They always (28) [stop / stops] their vehicles for us. We walk across the road quickly and safely.\n\nAdapted from Road Safety for Children",
  questions: [
    {
      id: "acsp_sa2_2022_D_gc2_25",
      marks: 1,
      question:
        "My mother usually (25) [advise / advises] me to be careful whenever I cross the road.",
      answer: "advises",
      solution: {
        method: "Subject-verb agreement — singular third-person",
        steps: [
          "Subject: 'My mother' = singular third-person (she).",
          "For singular third-person subjects in Simple Present, add -s/-es to the verb.",
          "advise → advises ✓.",
          "'advise' is the base form — used for I/you/we/they, NOT for he/she/it.",
          "My mother → she → advises.",
        ],
        tip: "Simple rule: Add -s/-es to the verb when the subject is he, she, it, or a singular noun (my mother, the teacher, John). My mother = she → advises.",
      },
    },
    {
      id: "acsp_sa2_2022_D_gc2_26",
      marks: 1,
      question:
        "After school, my classmates and I (26) [walk / walks] to the nearby pedestrian crossing.",
      answer: "walk",
      solution: {
        method: "Subject-verb agreement — compound subject with 'I'",
        steps: [
          "Subject: 'my classmates and I' — this is a COMPOUND subject (more than one person).",
          "When 'and' joins two subjects, the result is PLURAL.",
          "Additionally, 'and I' makes it a first-person plural subject (equivalent to 'we').",
          "For plural/first-person subjects, use the BASE FORM of the verb (no -s).",
          "'walk' = base form ✓.",
          "'walks' = singular third-person form — wrong for a plural/compound subject.",
        ],
        tip: "When two subjects are joined by 'and', they become plural: 'my classmates AND I = we'. Plural subjects use the base verb form. 'We walk' ✓, never 'we walks'.",
      },
    },
    {
      id: "acsp_sa2_2022_D_gc2_27",
      marks: 1,
      question:
        "We (27) [raise / raises] our hands to alert drivers on the road.",
      answer: "raise",
      solution: {
        method: "Subject-verb agreement — 'we' is plural",
        steps: [
          "Subject: 'We' = first-person plural pronoun.",
          "For plural/first-person subjects, use the base form of the verb.",
          "'raise' = base form ✓.",
          "'raises' = singular third-person — NEVER used with 'we'.",
          "We raise, they raise, I raise — but he/she/it raises.",
        ],
        tip: "'We' is always plural. Plural subjects take the base verb: we raise, we walk, we stop. Never 'we raises', 'we walks', 'we stops'.",
      },
    },
    {
      id: "acsp_sa2_2022_D_gc2_28",
      marks: 1,
      question:
        "They always (28) [stop / stops] their vehicles for us.",
      answer: "stop",
      solution: {
        method: "Subject-verb agreement — 'they' is plural",
        steps: [
          "Subject: 'They' = third-person plural pronoun (referring to drivers).",
          "For plural subjects, use the base form of the verb.",
          "'stop' = base form ✓.",
          "'stops' = singular third-person — used for he/she/it, NOT they.",
          "They stop, we stop, I stop — but he/she/it stops.",
        ],
        tip: "'They' is always plural → base verb form. Only he/she/it/singular noun takes -s/-es. Drivers = they → stop (not stops).",
      },
    },
  ],
};

// ============================================================
//  SECTION E — Editing (Q29–34, 6 marks)
//  Passage: Mary and her rabbit Cottontail
//  Underlined = grammar error, Bold = spelling error, Circle = punctuation
// ============================================================

export const editing: QuestionTypeB = {
  kind: "set",
  id: "acsp_sa2_2022_E_editing",
  topic: "Editing",
  passage:
    "Mary's parents bought her a rabbit. She named it Cottontail. Every morning, (29)[___] (30)[___] Mary would let Cottontail out on its cage to hop around the house. Mary fed it vegtables daily. (31)[___] (32)[___] One day, Cottontail stop eating and grew weak. Mary take it to a vet. The vet (33)[___] said that Cottontail seemed fine but it might be lonely (?) Mary's parents then (34)[___] desided to buy Mary another rabbit. Cottontail was not lonely anymore.",
  questions: [
    {
      id: "acsp_sa2_2022_E_edit_29",
      marks: 1,
      question:
        "Every morning, (29)[___] Mary would let Cottontail out on its cage to hop around the house.\n(Error type: grammar — the underlined word 'on' is incorrect. Correct it.)",
      answer: "of",
      solution: {
        method: "Preposition correction — 'out of' vs 'out on'",
        steps: [
          "The phrase: 'let Cottontail out ___ its cage'.",
          "The correct phrasal verb/prepositional phrase is 'out OF' — meaning outside/from the inside of something.",
          "'Let out of its cage' = to release from the cage ✓.",
          "'out on its cage' makes no logical sense — you cannot be 'on' a cage and be let out.",
          "Answer: of.",
        ],
        tip: "The fixed phrase is 'out of': 'let the dog out of the house', 'get out of bed', 'let Cottontail out of its cage'. 'Out of' means from the inside to the outside.",
      },
    },
    {
      id: "acsp_sa2_2022_E_edit_30",
      marks: 1,
      question:
        "Mary fed it vegtables daily. (30)[___]\n(Error type: spelling — 'vegtables' is misspelled. Correct it.)",
      answer: "vegetables",
      solution: {
        method: "Spelling correction",
        steps: [
          "The word 'vegtables' is misspelled.",
          "Correct spelling: 'vegetables'.",
          "The error: 'vegtables' is missing the letter 'e' after 'veg'.",
          "Correct breakdown: vege-ta-bles.",
          "'Vege-' comes from 'vegetation'. Think: vege + tables = vegetables.",
        ],
        tip: "Vegetables = vege-ta-bles. Remember: VEGE (like veggie/vegetarian) + TABLES. Many students forget the 'e' after 'veg': veg-E-tables, not veg-tables.",
      },
    },
    {
      id: "acsp_sa2_2022_E_edit_31",
      marks: 1,
      question:
        "One day, Cottontail stop eating and grew weak. (31)[___]\n(Error type: grammar — 'stop' is incorrect. Correct it.)",
      answer: "stopped",
      solution: {
        method: "Tense consistency — Simple Past",
        steps: [
          "The passage is written in the past tense: 'bought', 'named', 'would let', 'fed'.",
          "The error: 'Cottontail stop eating' — 'stop' is the base/present form.",
          "In past tense, 'stop' → 'stopped' (double the 'p', add -ed).",
          "The second verb 'grew' confirms the past tense: stop + p → stopped.",
          "Answer: stopped.",
        ],
        tip: "Spelling rule for 'stopped': short vowel (o) + single consonant (p) → double the consonant before -ed. stop → stopped. Compare: walk → walked (no doubling needed as 'lk' is not a single consonant).",
      },
    },
    {
      id: "acsp_sa2_2022_E_edit_32",
      marks: 1,
      question:
        "Mary take it to a vet. (32)[___]\n(Error type: grammar — 'take' is incorrect. Correct it.)",
      answer: "took",
      solution: {
        method: "Tense correction — Simple Past irregular verb",
        steps: [
          "Passage is in past tense throughout.",
          "'Mary take it to a vet' — 'take' is present tense.",
          "Past tense of 'take' = 'took' (irregular verb).",
          "'Mary took it to a vet' ✓.",
          "Answer: took.",
        ],
        tip: "Irregular past tense: take → took (NOT 'taked'). Other common irregulars: go → went, give → gave, buy → bought, bring → brought, see → saw.",
      },
    },
    {
      id: "acsp_sa2_2022_E_edit_33",
      marks: 1,
      question:
        "The vet said that Cottontail seemed fine but it might be lonely (?) Mary's parents then...\n(Error type: punctuation — the '?' after 'lonely' is wrong. What should it be?)",
      answer: ".",
      solution: {
        method: "Punctuation correction — statement vs question",
        steps: [
          "The sentence: 'The vet said that Cottontail seemed fine but it might be lonely (?)'",
          "This is an INDIRECT STATEMENT (reported speech): 'The vet said that...'",
          "Indirect statements are NOT questions — they use a full stop (period), not a question mark.",
          "A question mark would only be used for a direct question: 'Is Cottontail lonely?'",
          "As an indirect statement ending, the correct punctuation is a full stop: '.'",
          "Answer: . (full stop/period)",
        ],
        tip: "Indirect speech / reported statements end with a full stop: 'She said that she was tired.' NOT 'She said that she was tired?' A question mark is only used for direct questions: 'Are you tired?'",
      },
    },
    {
      id: "acsp_sa2_2022_E_edit_34",
      marks: 1,
      question:
        "Mary's parents then desided to buy Mary another rabbit. (34)[___]\n(Error type: spelling — 'desided' is misspelled. Correct it.)",
      answer: "decided",
      solution: {
        method: "Spelling correction",
        steps: [
          "The word 'desided' is misspelled.",
          "Correct spelling: 'decided'.",
          "Error: 'desided' uses 's' instead of 'c'.",
          "Root word: decide (with 'c') → decided.",
          "Remember: deCide → deCided (the 'c' stays throughout).",
        ],
        tip: "Decide → decided. The root is 'decide' with a 'c', not an 's'. Think: deCision (noun) → deCide (verb). The 'c' sound can be tricky — but in 'decide', it's always the letter 'c'.",
      },
    },
  ],
};

// ============================================================
//  SECTION F — Comprehension 1 "Careless Julia" (Q35–39, 8 marks)
// ============================================================

export const comprehension1: QuestionTypeB = {
  kind: "set",
  id: "acsp_sa2_2022_F_comp1",
  topic: "ComprehensionOE",
  passage: `Ring! The alarm clock went off, waking Julia up. She got out of bed to brush her teeth. "Mother!" Julia called out as she walked into the kitchen. She could not find her mother. Then, Julia remembered that it was a Saturday and her mother would be at the supermarket shopping for groceries.

Feeling hungry, Julia decided to cook some noodles. As she put the noodles into a pot of boiling water, the telephone rang. She raced out of the kitchen to answer it. It was her classmate, Jane. Jane told Julia about the new book she was reading. The girls chatted happily.

Suddenly, Julia smelled something burning. "My noodles!" she shouted. She quickly said goodbye to Jane and hung up. She had forgotten about her cooking. She dashed into the kitchen and smelt the burnt noodles. There was no more water in the pot. Julia immediately turned off the stove.

Just then, her mother came home. As soon as she smelled burnt food, she rushed into the kitchen. When she realised what had happened, she was very angry with Julia for leaving her pot unattended. Julia apologised profusely to her mother and promised to be careful next time.

Adapted from Careless Julia`,
  questions: [
    {
      id: "acsp_sa2_2022_F_35",
      marks: 1,
      question: "Julia went into the kitchen to ___.",
      options: [
        "cook noodles",
        "brush her teeth",
        "look for her mother",
        "turn off the alarm clock",
      ],
      answer: "look for her mother",
      solution: {
        method: "Locate purpose from passage — comprehension MCQ",
        steps: [
          "Paragraph 1: 'She got out of bed to brush her teeth. \"Mother!\" Julia called out as she walked into the kitchen.'",
          "Julia went into the kitchen calling for her mother — she was looking for her mother.",
          "Option (3): 'look for her mother' ✓.",
          "Option (1): 'cook noodles' — Julia decided to cook noodles AFTER she could not find her mother.",
          "Option (2): 'brush her teeth' — she brushed her teeth before going to the kitchen.",
          "Option (4): 'turn off the alarm clock' — the alarm woke her up in the bedroom, not the kitchen.",
        ],
        tip: "Follow the sequence of events carefully. Julia (1) got up, (2) brushed teeth, (3) went to kitchen and called 'Mother!' — so she went to the kitchen to look for her mother, not to cook.",
      },
    },
    {
      id: "acsp_sa2_2022_F_36",
      marks: 1,
      question: "Julia ended the phone call when she realised ___.",
      options: [
        "Jane said goodbye",
        "her noodles were burnt",
        "there was no water in the pot",
        "her mother had returned home",
      ],
      answer: "her noodles were burnt",
      solution: {
        method: "Locate reason for ending call",
        steps: [
          "Paragraph 3: 'Suddenly, Julia smelled something burning. \"My noodles!\" she shouted. She quickly said goodbye to Jane and hung up.'",
          "Julia ended the call BECAUSE she smelled something burning (her noodles).",
          "Option (2): 'her noodles were burnt' ✓.",
          "Option (1): Jane said goodbye — Julia was the one who said goodbye first.",
          "Option (3): 'no water in the pot' — she discovered this AFTER she hung up and dashed to the kitchen.",
          "Option (4): 'her mother returned home' — the mother came home in the NEXT paragraph (last).",
        ],
        tip: "The question asks WHY Julia ended the call. Find the moment she said goodbye — what happened just BEFORE? She smelled burning noodles → that's why she ended the call.",
      },
    },
    {
      id: "acsp_sa2_2022_F_37",
      marks: 2,
      question:
        "Match the following characters to their actions in the passage.\nJulia → ?\nJane → ?\nJulia's mother → ?",
      answer:
        "Julia → wanted to eat something (she was hungry and cooked noodles)\nJane → told someone about a book (she told Julia about the new book she was reading)\nJulia's mother → shopped for groceries (she was at the supermarket shopping for groceries)",
      solution: {
        method: "Match characters to actions using passage evidence",
        steps: [
          "Julia: 'Feeling hungry, Julia decided to cook some noodles.' → wanted to eat something ✓.",
          "Jane: 'Jane told Julia about the new book she was reading.' → told someone about a book ✓.",
          "Julia's mother: 'her mother would be at the supermarket shopping for groceries.' → shopped for groceries ✓.",
          "1 mark for each correct match (any two of the three, or all three for 2 marks).",
        ],
        tip: "For matching questions, go through the passage paragraph by paragraph and find what each character DOES. Look for action verbs next to each character's name.",
      },
    },
    {
      id: "acsp_sa2_2022_F_38",
      marks: 2,
      question:
        "Which word in paragraph 3 means 'ran quickly'?",
      answer: "dashed",
      solution: {
        method: "Vocabulary — synonym search in paragraph 3",
        steps: [
          "Paragraph 3: 'She dashed into the kitchen and smelt the burnt noodles.'",
          "'dashed' means to run/move very quickly in a direction ✓.",
          "This matches the meaning 'ran quickly'.",
          "Other words in paragraph 3: 'shouted', 'hung', 'forgotten', 'smelt', 'turned' — none mean 'ran quickly'.",
          "Answer: dashed.",
        ],
        tip: "'Dash' means to move or run very quickly. 'She dashed to the door' = she ran quickly to the door. Related words: sprint, bolt, race, rush.",
      },
    },
    {
      id: "acsp_sa2_2022_F_39",
      marks: 2,
      question:
        "What were TWO things Julia did to show that she regretted her actions?\n1.\n2.",
      answer:
        "1. Julia apologised profusely to her mother.\n2. Julia promised to be careful next time.",
      solution: {
        method: "Locate evidence of regret in final paragraph",
        steps: [
          "Last paragraph: 'Julia apologised profusely to her mother and promised to be careful next time.'",
          "Action 1 showing regret: She apologised profusely (sincerely/deeply).",
          "Action 2 showing regret: She promised to be careful next time.",
          "1 mark for each correct action.",
        ],
        tip: "When the question asks 'what did the character DO to show [emotion]', find ACTIONS (verbs) in the relevant paragraph. 'Apologised' and 'promised' are the two actions showing Julia was sorry/regretful.",
      },
    },
  ],
};

// ============================================================
//  SECTION G — Comprehension 2 "Friendship" (Q40–45, 8 marks)
// ============================================================

export const comprehension2: QuestionTypeB = {
  kind: "set",
  id: "acsp_sa2_2022_G_comp2",
  topic: "ComprehensionOE",
  passage: `Alan wore very thick glasses. Jack, his classmate, liked to tease him about his glasses. Alan would avoid Jack every time he saw him. He wished that Jack would not pick on him.

One day, their Science teacher, Mr Tan, walked into the classroom and announced that there would be a quiz the following week. After school, many of them gathered in groups to revise for the quiz at the library. As Alan studied with his friends, he noticed Jack sitting alone. Jack was staring at his notes, looking very worried. Alan could see that he was having trouble preparing for the quiz. No one wanted to help him.

Alan thought hard about whether he should help Jack. Should I help him? Should I let him suffer alone since he has always been nasty to me? At that moment, Alan remembered his teacher, Miss Joy, telling the class to help those in need even if they were unkind to them. Alan made up his mind to help Jack. He plucked up his courage and walked to Jack. "Shall we study together?" Alan asked.

Surprised by Alan's offer, Jack nodded gratefully. With Alan's help, he revised for the quiz and did well. After that day, Jack stopped picking on Alan. He apologised for his bad behaviour. They became good friends.

Adapted from Friendship`,
  questions: [
    {
      id: "acsp_sa2_2022_G_40",
      marks: 1,
      question:
        "Alan would try to get away from Jack because Alan ___.",
      options: [
        "wore thick glasses",
        "had many other friends",
        "liked studying on his own",
        "was always teased by Jack",
      ],
      answer: "was always teased by Jack",
      solution: {
        method: "Locate reason from paragraph 1 — MCQ",
        steps: [
          "Paragraph 1: 'Jack, his classmate, liked to tease him about his glasses. Alan would avoid Jack every time he saw him.'",
          "Alan avoided (tried to get away from) Jack BECAUSE Jack liked to tease him.",
          "Option (4): 'was always teased by Jack' ✓.",
          "Option (1): 'wore thick glasses' — Alan wore glasses, but that's not WHY he avoided Jack.",
          "Option (2): 'had many other friends' — Alan DID study with his friends (para 2) but this is not the reason he avoided Jack.",
          "Option (3): 'liked studying on his own' — not supported by the passage.",
        ],
        tip: "For 'because' questions, find the CAUSE of the action. Alan avoided Jack BECAUSE Jack teased him. The glasses were the target of teasing, but the reason for avoiding is being teased.",
      },
    },
    {
      id: "acsp_sa2_2022_G_41",
      marks: 1,
      question: "Mr Tan announced to the class that ___.",
      options: [
        "he would be giving them a quiz",
        "everyone had to study together",
        "everyone had to gather in groups",
        "he would give them some revision notes",
      ],
      answer: "he would be giving them a quiz",
      solution: {
        method: "Locate announcement — MCQ",
        steps: [
          "Paragraph 2: 'their Science teacher, Mr Tan, walked into the classroom and announced that there would be a quiz the following week.'",
          "Mr Tan announced: there would be a quiz the following week.",
          "Option (1): 'he would be giving them a quiz' ✓.",
          "Option (2): 'study together' — this is what students chose to do, not Mr Tan's announcement.",
          "Option (3): 'gather in groups' — students gathered in groups after school, not Mr Tan's instruction.",
          "Option (4): 'revision notes' — not mentioned.",
        ],
        tip: "Find the word 'announced' in the passage and read what follows it. 'Announced that there would be a quiz' → he would be giving them a quiz.",
      },
    },
    {
      id: "acsp_sa2_2022_G_42",
      marks: 1,
      question:
        "True or False: Jack was seated by himself in the library.",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 2: 'he noticed Jack sitting alone.'",
          "Sitting alone = by himself (no one else with him).",
          "The statement 'Jack was seated by himself in the library' = TRUE ✓.",
          "'Sitting alone' and 'seated by himself' mean the same thing.",
        ],
        tip: "'Sitting alone' = 'seated by himself' = 'by himself' = no one else with him. These are all ways of saying the same thing. The statement matches the passage → True.",
      },
    },
    {
      id: "acsp_sa2_2022_G_43",
      marks: 1,
      question:
        "True or False: Jack was confident that he could prepare for the quiz on his own.",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — inference from passage",
        steps: [
          "Paragraph 2: 'Jack was staring at his notes, looking very worried. Alan could see that he was having trouble preparing for the quiz.'",
          "Jack was looking WORRIED and having TROUBLE — this is the OPPOSITE of confident.",
          "If he was confident, he would be calm and happy, not worried.",
          "Statement 'Jack was confident he could prepare on his own' = FALSE.",
        ],
        tip: "'Confident' means sure of yourself. Jack was 'worried' and 'having trouble' — both show he was NOT confident. Watch for statements that use positive words to describe a negative situation.",
      },
    },
    {
      id: "acsp_sa2_2022_G_44",
      marks: 2,
      question:
        "Put these events in the right sequence. Write 1, 2, 3 and 4.\n___ Alan remembered Miss Joy's advice.\n___ Alan decided to help Jack.\n___ Alan saw Jack looking worried.\n___ Alan and his friends went to the library.",
      answer:
        "2 — Alan remembered Miss Joy's advice.\n3 — Alan decided to help Jack.\n1 — Alan saw Jack looking worried.\n... Actually:\n1 — Alan and his friends went to the library.\n2 — Alan saw Jack looking worried.\n3 — Alan remembered Miss Joy's advice.\n4 — Alan decided to help Jack.",
      solution: {
        method: "Sequencing events from paragraph 2 and 3",
        steps: [
          "Trace the events in order from the passage:",
          "Step 1: 'many of them gathered in groups to revise for the quiz at the library. As Alan studied with his friends...' → Alan and his friends went to the library.",
          "Step 2: 'he noticed Jack sitting alone. Jack was staring at his notes, looking very worried.' → Alan saw Jack looking worried.",
          "Step 3: 'At that moment, Alan remembered his teacher, Miss Joy, telling the class to help those in need...' → Alan remembered Miss Joy's advice.",
          "Step 4: 'Alan made up his mind to help Jack.' → Alan decided to help Jack.",
          "Sequence: Library → Saw Jack → Remembered Miss Joy → Decided to help.",
        ],
        tip: "For sequencing, trace the CAUSE-AND-EFFECT chain: They went to the library → Alan noticed Jack → Alan thought about it and remembered Miss Joy → Alan made his decision. The advice comes BEFORE the decision.",
      },
    },
    {
      id: "acsp_sa2_2022_G_45",
      marks: 2,
      question: "Why was Jack surprised by Alan's offer?",
      answer:
        "Jack was surprised because he had always been unkind/nasty to Alan by teasing him, so he did not expect Alan to offer to help him. He would not have thought that Alan would still be willing to help him despite his bad behaviour.",
      solution: {
        method: "Inference — why would someone be surprised?",
        steps: [
          "Jack had always teased Alan (paragraph 1) — he was unkind/nasty to Alan.",
          "Alan had always avoided Jack because of the teasing.",
          "So when Alan offered to help, Jack would be surprised because:",
          "→ He had been mean to Alan, so he would not expect kindness in return.",
          "→ Alan could have ignored him or let him suffer, but chose to help instead.",
          "Evidence: Paragraph 4: 'Surprised by Alan's offer, Jack nodded gratefully.'",
          "For 2 marks: State that Jack had been nasty to Alan AND that he therefore did not expect Alan to help him.",
        ],
        tip: "To answer 'why was X surprised?', think about what made the situation UNEXPECTED. Jack teased Alan → Alan had reason to dislike Jack → helping Jack was unexpected/surprising. The surprise comes from the contrast between Jack's past behaviour and Alan's kind response.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — ACS(P) Booklet B
// ============================================================

export const acsp_sa2_2022_bookletB: Question[] = [
  grammarCloze1,
  grammarCloze2,
  editing,
  comprehension1,
  comprehension2,
];

export const paperMetaACSP_B = {
  school: "Anglo-Chinese School (Primary)",
  code: "ACS(P)",
  year: 2022,
  exam: "Semestral Assessment 2 (SA2 / EOY)",
  level: "Primary 3",
  paper: "Paper Two (Booklet B)",
  totalMarks: 30,
  sections: [
    { name: "Section D: Grammar Cloze 1 (Pronouns)", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section D: Grammar Cloze 2 (Subject-Verb)", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section E: Editing", questions: 6, marks: 6, topic: "Editing" as Topic },
    { name: "Section F: Comprehension 1 — Careless Julia", questions: 5, marks: 8, topic: "ComprehensionOE" as Topic },
    { name: "Section G: Comprehension 2 — Friendship", questions: 6, marks: 8, topic: "ComprehensionOE" as Topic },
  ],
};
