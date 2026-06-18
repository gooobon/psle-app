// ============================================================
// Anglo-Chinese School (Junior) — P3 English SA2 2022
// BOOKLET B  (34 marks total across 6 parts)
// Part 4  : Grammar Cloze 1        (Q17–20,  4 marks)
// Part 5  : Grammar Cloze 2        (Q21–24,  4 marks)
// Part 6  : Editing for Spelling & Grammar  (Q25–28,  4 marks)
// Part 7  : Synthesis & Transformation      (Q29–30,  4 marks)
// Part 8  : Comprehension Passage 1         (Q31–36, 10 marks)
// Part 9  : Comprehension Passage 2         (Q37–43,  8 marks)
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  PART 4 — Grammar Cloze 1 (Q17–20)
//  Passage: Jack and the girl at the playground
//  Word bank: A=her, B=his, C=we, D=she, E=I, F=our
// ============================================================

export const grammarCloze1: QuestionTypeB = {
  kind: "set",
  id: "acsj_eoy2022_B_gc1",
  topic: "GrammarCloze",
  passage:
    "The playground was Jack's favourite place in the neighbourhood. It felt like (17) ___ own private space because it was usually empty.\n\nOne afternoon, he was at the playground when a girl appeared beside him. \"Can (18) ___ join you?\" she asked.\n\nJake turned and ran away from her. Suddenly, he slipped and fell. The girl rushed over. Without saying a word, (19) ___ helped him up.\n\nJake smiled gratefully and asked, \"Shall (20) ___ be friends?\"",
  questions: [
    {
      id: "acsj_eoy2022_B_gc1_17",
      marks: 1,
      question:
        "It felt like (17) ___ own private space because it was usually empty.\n[Word bank: A=her, B=his, C=we, D=she, E=I, F=our]",
      answer: "B (his)",
      solution: {
        method: "Pronoun reference — possessive pronoun",
        steps: [
          "The sentence says 'It felt like ___ own private space'.",
          "Who does 'It' refer to? → The playground, which is Jack's favourite place.",
          "The subject introduced is 'Jack' (male, singular).",
          "Possessive pronoun for a male singular subject = 'his'.",
          "Word bank option B = 'his' ✓.",
          "'her' (A) = female, 'we' (C) = plural, 'she' (D) = subject pronoun not possessive, 'I' (E) = first person, 'our' (F) = plural possessive.",
        ],
        tip: "Find who the possessive refers to — Jack (he/his). Possessive pronoun for 'he' is always 'his'.",
      },
    },
    {
      id: "acsj_eoy2022_B_gc1_18",
      marks: 1,
      question:
        '"Can (18) ___ join you?" she asked.\n[Word bank: A=her, B=his, C=we, D=she, E=I, F=our]',
      answer: "E (I)",
      solution: {
        method: "Pronoun — subject pronoun after modal verb",
        steps: [
          "The question is from the girl: 'Can ___ join you?'",
          "The person asking to join is the girl herself — she is asking if she can join.",
          "The subject of the clause 'can ___ join you' is the girl (the one doing the joining).",
          "After a modal verb like 'can', we use a SUBJECT PRONOUN.",
          "The girl refers to herself in first person: 'I'.",
          "Word bank option E = 'I' ✓.",
          "'she' (D) would make it 'Can she join you?' — that would mean someone else is asking, not the girl herself.",
        ],
        tip: "When someone asks permission for themselves, they use 'I': 'Can I join you?' This is the first-person subject pronoun.",
      },
    },
    {
      id: "acsj_eoy2022_B_gc1_19",
      marks: 1,
      question:
        "Without saying a word, (19) ___ helped him up.\n[Word bank: A=her, B=his, C=we, D=she, E=I, F=our]",
      answer: "D (she)",
      solution: {
        method: "Pronoun reference — subject pronoun",
        steps: [
          "The sentence: 'The girl rushed over. Without saying a word, (19) ___ helped him up.'",
          "Who helped Jake up? → the girl who rushed over.",
          "The blank is the SUBJECT of the verb 'helped' — we need a subject pronoun.",
          "The girl is female and singular → subject pronoun = 'she'.",
          "Word bank option D = 'she' ✓.",
          "'her' (A) is an object pronoun — cannot be the subject of 'helped'.",
          "'we' (C) is plural and doesn't refer to just the girl.",
        ],
        tip: "Subject pronouns (I, he, she, we, they) go BEFORE the verb as the doer. Object pronouns (me, him, her, us, them) go AFTER the verb. 'She helped him up' ✓ (she = subject, him = object).",
      },
    },
    {
      id: "acsj_eoy2022_B_gc1_20",
      marks: 1,
      question:
        'Jake smiled gratefully and asked, "Shall (20) ___ be friends?"\n[Word bank: A=her, B=his, C=we, D=she, E=I, F=our]',
      answer: "C (we)",
      solution: {
        method: "Pronoun — inclusive 'we' after Shall",
        steps: [
          "Jake is asking if BOTH of them can be friends.",
          "'Shall ___ be friends?' — the subject includes Jake and the girl together.",
          "When referring to oneself and another person together = 'we' (plural first person).",
          "Word bank option C = 'we' ✓.",
          "'I' (E) would mean only Jake — but friends requires two people.",
          "'she' (D) refers to only the girl — incorrect as Jake is also part of the friendship.",
          "The expression 'Shall we?' is a common polite suggestion in English.",
        ],
        tip: "'Shall we?' is a fixed expression used to make polite suggestions or invitations. 'Shall we go?' 'Shall we be friends?' It always uses 'we' because it includes both the speaker and the listener.",
      },
    },
  ],
};

// ============================================================
//  PART 5 — Grammar Cloze 2 (Q21–24)
//  Passage: Painting and the stationery shop
//  Method: underline correct word in brackets
// ============================================================

export const grammarCloze2: QuestionTypeB = {
  kind: "set",
  id: "acsj_eoy2022_B_gc2",
  topic: "GrammarCloze",
  passage:
    "I love painting. My parents often (21) [praise / praises] me for being artistic.\n\nThey take me to the stationery shop every weekend. When we (22) [get / gets] there, I always head straight for the third row of shelves. It (23) [is / are] filled with all kinds of paint sets. I (24) [spend / spends] about fifteen minutes admiring the paint sets each time. Before I know it, it is time to leave.",
  questions: [
    {
      id: "acsj_eoy2022_B_gc2_21",
      marks: 1,
      question:
        "My parents often (21) [praise / praises] me for being artistic.",
      answer: "praise",
      solution: {
        method: "Subject-verb agreement — plural subject",
        steps: [
          "Subject: 'My parents' — this is PLURAL (two people).",
          "For plural subjects, use the base form of the verb (no -s ending).",
          "'praise' = base form ✓ (for plural subjects: they praise).",
          "'praises' = singular third-person form (for he/she/it).",
          "My parents → they → praise (not praises).",
        ],
        tip: "Add -s to the verb ONLY for singular third-person subjects (he/she/it). Plural subjects (we/they/my parents) use the base form.",
      },
    },
    {
      id: "acsj_eoy2022_B_gc2_22",
      marks: 1,
      question:
        "When we (22) [get / gets] there, I always head straight for the third row of shelves.",
      answer: "get",
      solution: {
        method: "Subject-verb agreement — 'we' is plural",
        steps: [
          "Subject: 'we' — this is a plural first-person pronoun.",
          "For plural subjects, use the base form of the verb.",
          "'get' = base form ✓.",
          "'gets' = singular third-person form — used for he/she/it, NOT for 'we'.",
          "We get, they get, I get — never 'we gets'.",
        ],
        tip: "'We' is always plural and always uses the base form of the verb. Never 'we gets', 'we runs', 'we eats'.",
      },
    },
    {
      id: "acsj_eoy2022_B_gc2_23",
      marks: 1,
      question:
        "It (23) [is / are] filled with all kinds of paint sets.",
      answer: "is",
      solution: {
        method: "Subject-verb agreement — 'it' is singular",
        steps: [
          "Subject: 'It' — referring to 'the third row of shelves' (treated as a single thing).",
          "'It' is a singular third-person pronoun.",
          "For singular third-person, use 'is' with the verb 'to be'.",
          "'is' ✓ — It is filled.",
          "'are' is used for plural subjects: they are, we are, the shelves are.",
        ],
        tip: "The verb 'to be': I am, He/She/It IS, We/You/They ARE. 'It is' is always correct for singular things.",
      },
    },
    {
      id: "acsj_eoy2022_B_gc2_24",
      marks: 1,
      question:
        "I (24) [spend / spends] about fifteen minutes admiring the paint sets each time.",
      answer: "spend",
      solution: {
        method: "Subject-verb agreement — 'I' takes base form",
        steps: [
          "Subject: 'I' — first-person singular.",
          "For the first-person singular 'I', we use the BASE FORM of the verb (no -s).",
          "'spend' = base form ✓.",
          "'spends' is used only for third-person singular (he/she/it).",
          "I spend, you spend, we spend, they spend — but he/she/it spends.",
        ],
        tip: "Only add -s to the verb for third-person singular: he, she, it, or a singular noun (the boy, my friend). For I, you, we, they — always use the base form.",
      },
    },
  ],
};

// ============================================================
//  PART 6 — Editing for Spelling & Grammar (Q25–28)
//  Passage: George at the clinic (bold = spelling error,
//  underlined = grammar error)
// ============================================================

export const editing: QuestionTypeB = {
  kind: "set",
  id: "acsj_eoy2022_B_editing",
  topic: "Editing",
  passage:
    "George woke up feeling unwell and dragged himself out of bed. He (25) [___] started cough almost immediately. \"I guess I won't be going to soccer practice (26) [___] today,\" he sighed in dissapointment. When he arrived at the clinic, he could (27) [___] not believe that there was ten other patients in the queue! Afraid that their (28) [___] illnesses may be contaigeous, he decided to wait outside.",
  questions: [
    {
      id: "acsj_eoy2022_B_edit_25",
      marks: 1,
      question:
        "He (25) [___] started cough almost immediately.\n(The word 'cough' contains a grammatical error — find and correct it.)",
      answer: "coughing",
      solution: {
        method: "Grammar editing — verb pattern after 'start'",
        steps: [
          "The error: 'started cough' — 'cough' is a bare noun/verb used incorrectly after 'started'.",
          "The verb 'start' is followed by either: (1) verb + -ing, OR (2) to + base verb.",
          "Correct patterns: 'started coughing' OR 'started to cough'.",
          "Since we need to correct 'cough', change it to 'coughing'.",
          "Answer: coughing.",
        ],
        tip: "Verbs like 'start', 'begin', 'stop', 'finish', 'keep' are often followed by the -ing form: 'He started coughing', 'She kept running', 'They stopped talking'.",
      },
    },
    {
      id: "acsj_eoy2022_B_edit_26",
      marks: 1,
      question:
        "He sighed in dissapointment. (26) [___]\n(The word 'dissapointment' is spelled incorrectly — correct it.)",
      answer: "disappointment",
      solution: {
        method: "Spelling correction",
        steps: [
          "The word 'dissapointment' has two spelling errors.",
          "Correct spelling: 'disappointment'.",
          "Common mistake: 'diss-' instead of 'dis-'. There is only ONE 's' at the start: dis-appoint-ment.",
          "Also: 'dis-a-ppoint' — note it is 'ap' with double 'p', not double 'a'.",
          "Breakdown: dis + appoint + ment = disappointment.",
        ],
        tip: "Remember: dis-APPOINT-ment. One 's', double 'p'. Think: 'dis' (prefix) + 'appoint' (verb). A common mnemonic: you get a 'dip' in your day — DIsaPPOINTment.",
      },
    },
    {
      id: "acsj_eoy2022_B_edit_27",
      marks: 1,
      question:
        "...he could not believe that there was ten other patients in the queue! (27) [___]\n(The word 'was' is underlined as a grammatical error — correct it.)",
      answer: "were",
      solution: {
        method: "Grammar editing — subject-verb agreement with 'there'",
        steps: [
          "The phrase: 'there was ten other patients'.",
          "In 'there is/are' sentences, the verb agrees with the SUBJECT that comes AFTER it.",
          "The subject here is 'ten other patients' — PLURAL.",
          "Plural subject → 'there WERE ten other patients' ✓.",
          "'there was' would be for singular: 'there was one patient'.",
          "Answer: were.",
        ],
        tip: "In 'there is/are' sentences, look at the noun AFTER the verb to decide: 'There IS a cat' (singular) vs 'There ARE ten cats' (plural). 'Ten patients' is plural → 'there WERE ten patients'.",
      },
    },
    {
      id: "acsj_eoy2022_B_edit_28",
      marks: 1,
      question:
        "Afraid that their illnesses may be contaigeous... (28) [___]\n(The word 'contaigeous' is spelled incorrectly — correct it.)",
      answer: "contagious",
      solution: {
        method: "Spelling correction",
        steps: [
          "The word 'contaigeous' is misspelled.",
          "Correct spelling: 'contagious'.",
          "Error: 'contai-g-eous' — the 'ai' vowel combination is incorrect.",
          "Correct: 'conta-g-ious' — 'conta' + 'gious' (like 'gi' sounds as in 'region').",
          "Breakdown: con-ta-gi-ous.",
          "Meaning: able to spread from person to person (diseases).",
        ],
        tip: "Contagious = con-TA-gi-ous. No 'ai' vowel pair — just 'a' then 'gious'. Think of 'conta-' as in 'contain' but with 'gious' ending: conta-gious.",
      },
    },
  ],
};

// ============================================================
//  PART 7 — Synthesis & Transformation (Q29–30)
// ============================================================

const sentenceCombining: QuestionTypeA[] = [
  {
    kind: "single",
    id: "acsj_eoy2022_B_sc_29",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Rewrite as ONE sentence using the word 'when':\nI got home. I changed out of my uniform.\n\n[Complete: ___ when ___]",
    options: [],
    answer: 0,
    solution: {
      method: "Sentence combining using 'when' — sequence of events",
      steps: [
        "We need to join 'I got home' and 'I changed out of my uniform' using 'when'.",
        "'when' shows that one action happened immediately after/at the same time as another.",
        "Structure: [Second action clause] when [First action clause].",
        "OR: [First action clause] when [Second action clause].",
        "Sample answer: 'I changed out of my uniform when I got home.'",
        "OR: 'When I got home, I changed out of my uniform.' (comma needed when 'when' clause comes first)",
        "Both actions are in Simple Past (got, changed) — keep same tense in combined sentence.",
      ],
      tip: "When combining with 'when', you can put either clause first. If the 'when' clause comes FIRST, add a comma: 'When I got home, I changed.' If it comes SECOND, no comma needed: 'I changed when I got home.'",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_B_sc_30",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Rewrite as ONE sentence using the word 'or':\nWe can go to the zoo this Saturday. We can go to the zoo next Sunday.\n\n[Complete: ___ or ___]",
    options: [],
    answer: 0,
    solution: {
      method: "Sentence combining using 'or' — presenting alternatives",
      steps: [
        "We need to join two alternative choices using 'or'.",
        "Both sentences share the same action: 'go to the zoo'.",
        "The only difference is the time: 'this Saturday' vs 'next Sunday'.",
        "We can shorten by combining the different parts.",
        "Sample answer: 'We can go to the zoo this Saturday or next Sunday.'",
        "Alternative full form: 'We can go to the zoo this Saturday or we can go to the zoo next Sunday.' (less concise but also correct).",
        "'or' is used to give alternative options/choices.",
      ],
      tip: "When both sentences are nearly identical and differ only in one part, use 'or' to join just the different parts: 'We can go this Saturday OR next Sunday.' This is much cleaner than repeating the whole sentence.",
    },
  },
];

// ============================================================
//  PART 8 — Comprehension Passage 1 (Q31–36, 10 marks)
//  Passage: Wilbur the pig (adapted from Charlotte's Web theme)
// ============================================================

export const comprehension1: QuestionTypeB = {
  kind: "set",
  id: "acsj_eoy2022_B_comp1",
  topic: "ComprehensionOE",
  passage: `When Wilbur the pig was five weeks old, Fern's father said it was time to sell it. Fern broke down and wept but her father was firm about it. Wilbur's appetite had increased. It was beginning to eat scraps of food in addition to milk. Fern's father was not willing to provide for it any longer.

He patted Fern's head and tried to pacify her, "I know it's hard. You have had your fun raising a baby pig and have grown attached to it. Wilbur is not a baby any longer and it has got to be sold. I've already sold its ten brothers and sisters."

"Give Uncle Homer a call," suggested Fern's mother to Fern. "He sometimes raises a pig. If Wilbur goes there to live, you can walk down the road and visit it as often as you like."

"How much money should I ask for him?" Fern wanted to know.

"Well," said her father, "Tell your Uncle Homer you've got a pig you'll sell for only six dollars and see what he says."

When Uncle Homer heard how cheap Wilbur cost, he was delighted. However, he was concerned about the fact that Wilbur was the smallest of all its siblings. Eventually, he said he would buy the pig.

The next day, Wilbur was taken from its home under the apple tree and went to live in Uncle Homer's barn. Fern's eyes brimmed with tears as she waved goodbye.`,
  questions: [
    {
      id: "acsj_eoy2022_B_comp1_31",
      marks: 2,
      question:
        "In paragraph 1, why did Fern's father want to sell Wilbur?",
      answer:
        "Fern's father wanted to sell Wilbur because Wilbur's appetite had increased and it was eating more food (scraps in addition to milk). Fern's father was not willing to provide for it any longer / it was too costly to keep feeding Wilbur.",
      solution: {
        method: "Locate information in paragraph 1",
        steps: [
          "The question asks for the reason FROM paragraph 1.",
          "Key sentences: 'Wilbur's appetite had increased. It was beginning to eat scraps of food in addition to milk. Fern's father was not willing to provide for it any longer.'",
          "Reason 1: Wilbur was eating more (increased appetite, eating scraps + milk).",
          "Reason 2: Fern's father was unwilling/unable to keep providing food for it.",
          "For 2 marks, give BOTH parts of the reason OR one strong complete reason.",
          "Write in a complete sentence.",
        ],
        tip: "When a question says 'In paragraph X', your answer must come from that paragraph. Underline/find the relevant sentences and put them in your own words in a complete sentence.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp1_32",
      marks: 1,
      question:
        "Which word in paragraph 2 has the same meaning as 'to help someone to calm down'?",
      answer: "pacify",
      solution: {
        method: "Vocabulary — find synonym in passage",
        steps: [
          "Look in paragraph 2 for a word meaning 'to help someone to calm down'.",
          "Paragraph 2: 'He patted Fern's head and tried to pacify her...'",
          "'pacify' means to make someone calm/less angry or upset.",
          "This matches 'to help someone to calm down' exactly.",
          "Answer: pacify.",
        ],
        tip: "For vocabulary questions asking you to find a word in the passage, scan the relevant paragraph for a word that matches the given definition. 'Pacify' → to make peaceful/calm (think: peace → pacify).",
      },
    },
    {
      id: "acsj_eoy2022_B_comp1_33",
      marks: 2,
      question:
        "Why was it hard for Fern to let Wilbur go?",
      answer:
        "It was hard for Fern to let Wilbur go because she had grown attached to Wilbur / she had fun raising Wilbur as a baby pig and loved it very much. She was sad to be separated from the pig she had cared for.",
      solution: {
        method: "Inference + text evidence",
        steps: [
          "Fern's father explains in paragraph 2: 'You have had your fun raising a baby pig and have grown attached to it.'",
          "'Grown attached to it' means Fern had developed a strong emotional bond with Wilbur.",
          "Also: Fern 'broke down and wept' (paragraph 1) and her eyes 'brimmed with tears' when saying goodbye.",
          "So the reason is: she loved Wilbur and had bonded with him through raising him.",
          "For 2 marks: state the main reason (emotional attachment) and support with evidence from the text.",
        ],
        tip: "When asked WHY something was hard or how someone felt, look for words describing emotions AND evidence in the passage. 'Grew attached to' is the key phrase here.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp1_34",
      marks: 1,
      question: "Where did Uncle Homer live?",
      answer:
        "Uncle Homer lived down the road (from Fern's house) / on a farm with a barn near Fern's home.",
      solution: {
        method: "Locate factual information",
        steps: [
          "Find mentions of Uncle Homer's location in the passage.",
          "Paragraph 3: 'If Wilbur goes there to live, you can walk down the road and visit it as often as you like.'",
          "Final paragraph: 'went to live in Uncle Homer's barn.'",
          "Uncle Homer lived: (1) down the road from Fern's house, (2) on a farm/in a barn.",
          "Either detail is acceptable for 1 mark.",
        ],
        tip: "Factual location questions: scan the passage for the person's name and look for place/location words nearby. 'Down the road' and 'barn' are both valid answers.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp1_35",
      marks: 2,
      question:
        "What were Uncle Homer's reasons to buy or not to buy Wilbur?\n(i) Reason to buy Wilbur:\n(ii) Reason not to buy Wilbur:",
      answer:
        "(i) Reason to buy: Wilbur was very cheap — only six dollars. Uncle Homer was delighted at how cheap Wilbur cost.\n(ii) Reason NOT to buy: Wilbur was the smallest of all its siblings / Uncle Homer was concerned that Wilbur was very small.",
      solution: {
        method: "Identifying contrasting reasons from passage",
        steps: [
          "Find the paragraph about Uncle Homer's decision (second-to-last paragraph).",
          "'When Uncle Homer heard how cheap Wilbur cost, he was delighted.' → Reason TO buy: cheapness/low price.",
          "'However, he was concerned about the fact that Wilbur was the smallest of all its siblings.' → Reason NOT to buy: Wilbur was the smallest/smallest pig.",
          "'Eventually, he said he would buy the pig.' — he decided to buy despite his concern.",
          "1 mark for each correct reason.",
        ],
        tip: "Contrast questions often use 'however' or 'but' in the passage. The word 'However' signals the switch from positive (reason to buy) to negative (reason not to buy). Look for these signal words.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp1_36",
      marks: 2,
      question:
        "How did Fern feel when Wilbur moved to Uncle Homer's barn? Support your answer with evidence from the passage.",
      answer:
        "Fern felt sad / upset when Wilbur moved to Uncle Homer's barn. Evidence: 'Fern's eyes brimmed with tears as she waved goodbye.' This shows she was on the verge of crying and was very sad to see Wilbur leave.",
      solution: {
        method: "Inference of emotion + textual evidence",
        steps: [
          "Identify the emotion from the last paragraph.",
          "Key evidence: 'Fern's eyes brimmed with tears as she waved goodbye.'",
          "'Brimmed with tears' = her eyes were full of tears, about to cry → she was SAD/UPSET.",
          "State the emotion clearly: 'Fern felt sad/upset.'",
          "Then quote/paraphrase the evidence: 'Her eyes brimmed with tears as she waved goodbye.'",
          "For 2 marks: 1 mark for correct emotion, 1 mark for evidence from passage.",
        ],
        tip: "For 'How did X feel + support with evidence' questions: (1) Name the emotion clearly, (2) Quote or paraphrase the exact phrase from the passage that shows this emotion. 'Brimmed with tears' → very sad, nearly crying.",
      },
    },
  ],
};

// ============================================================
//  PART 9 — Comprehension Passage 2 (Q37–43, 8 marks)
//  Passage: The Man in the Moon — informational text
// ============================================================

export const comprehension2: QuestionTypeB = {
  kind: "set",
  id: "acsj_eoy2022_B_comp2",
  topic: "ComprehensionOE",
  passage: `Have you ever heard about the Man in the Moon? For thousands of years, people have examined the Moon and imagined faces, animals and lots of other things. We see different things on the Moon's surface because it is not a single colour. Instead, there are light areas and dark areas.

Astronomers have studied the Moon through telescopes for a long time. Astronauts have also visited it. That is how we know that the light parts of the Moons are mountain ranges. They are just like the ones we have on Earth. Scientists call them highlands.

The large dark areas of the Moon are its seas. These seas are very different from the oceans on our planet. Long ago, people mistakenly believed that those dark areas contained water. The Moon's seas formed when dark lava flowed over those parts of the Moon. Inside these seas, there are bright craters. Those formed when rocks from space, called meteors, slammed into the lava, blasting them away.

You can view the Moon from anywhere. Some things on the Moon's face can be seen with just your eyes. Some craters become visible when you use binoculars. Through a telescope, you can see thousands of craters, seas and mountains.`,
  questions: [
    {
      id: "acsj_eoy2022_B_comp2_37",
      marks: 1,
      question:
        "Which word has the same meaning as 'looked carefully at' in paragraph 1?\nCircle either (A) or (B).\n\n'For thousands of years, people have examined (A) the Moon and imagined (B) faces, animals and lots of other things.'",
      answer: "(A) examined",
      solution: {
        method: "Vocabulary — find synonym in passage extract",
        steps: [
          "The question asks for the word meaning 'looked carefully at'.",
          "Option (A): 'examined' = to look at carefully and in detail ✓.",
          "Option (B): 'imagined' = to form a picture in your mind — this is NOT 'looked carefully at'.",
          "'Examined' fits: 'For thousands of years, people have examined the Moon' = looked at it carefully.",
          "Answer: (A) examined.",
        ],
        tip: "To 'examine' something means to look at it very carefully and attentively. A doctor examines a patient. Scientists examine specimens. This is the same as 'looking carefully at'.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp2_38",
      marks: 2,
      question:
        "The light parts of the Moons are mountain ranges. How did we come to know this?\n(i)\n(ii)",
      answer:
        "(i) Astronomers/scientists studied the Moon through telescopes for a long time.\n(ii) Astronauts visited the Moon.",
      solution: {
        method: "Locate two pieces of information from paragraph 2",
        steps: [
          "Paragraph 2: 'Astronomers have studied the Moon through telescopes for a long time. Astronauts have also visited it. That is how we know that the light parts of the Moons are mountain ranges.'",
          "The sentence 'That is how we know' points back to TWO methods:",
          "(i) Astronomers studying through telescopes.",
          "(ii) Astronauts visiting the Moon.",
          "1 mark for each correct answer.",
        ],
        tip: "When the question asks 'How did we know/find out?', look for the explanation just BEFORE the fact is stated. 'That is how we know' is a signal phrase pointing back to the methods.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp2_39",
      marks: 1,
      question:
        "The word 'They' in paragraph 2 refers to ___.\n(a) telescopes\n(b) astronauts\n(c) mountain ranges\n(d) light parts of the moon",
      options: ["telescopes", "astronauts", "mountain ranges", "light parts of the moon"],
      answer: "c",
      solution: {
        method: "Pronoun reference — identifying antecedent",
        steps: [
          "Find 'They' in paragraph 2: 'They are just like the ones we have on Earth.'",
          "Look at the sentence BEFORE: 'the light parts of the Moons are mountain ranges.'",
          "'They' refers to the mountain ranges on the Moon — being compared to mountain ranges on Earth.",
          "Answer: (c) mountain ranges.",
          "'Telescopes' and 'astronauts' are mentioned but are not what is being compared to Earth.",
          "'Light parts of the moon' is close but 'They' specifically refers to what the light parts ARE — the mountain ranges.",
        ],
        tip: "To find what a pronoun refers to, look at the noun(s) JUST BEFORE it in the text. 'They' replaces a plural noun. The nearest plural noun is 'mountain ranges'.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp2_40",
      marks: 1,
      question:
        "True or False: The seas on the moon are unlike Earth's oceans.",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — locate and verify statement",
        steps: [
          "Find information about Moon seas in paragraph 3.",
          "Passage: 'These seas are very different from the oceans on our planet.'",
          "'Very different from' = unlike.",
          "So the statement 'the seas on the moon are unlike Earth's oceans' = TRUE ✓.",
        ],
        tip: "For True/False, find the exact sentence in the passage and check if the statement MATCHES what is written. 'Very different from' = 'unlike' → True.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp2_41",
      marks: 1,
      question:
        "True or False: The seas on the moon contain water.",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — locate and verify statement",
        steps: [
          "Find information about water on Moon seas in paragraph 3.",
          "Passage: 'Long ago, people mistakenly believed that those dark areas contained water.'",
          "Key word: 'mistakenly' — they were WRONG to believe this.",
          "The Moon's seas formed from lava, NOT water.",
          "So the statement 'the seas on the moon contain water' = FALSE ✓.",
        ],
        tip: "Watch out for trick statements based on misconceptions mentioned in the passage. The passage says people MISTAKENLY believed there was water — meaning there is NO water. The answer is False.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp2_42",
      marks: 1,
      question:
        "Write 1, 2 and 3 in the blanks below to show the SEQUENCE of how bright craters were formed in paragraph 3.\n___  The lava was blasted away.\n___  The lava flowed over parts of the Moon.\n___  Meteors from space slammed into the lava.",
      answer:
        "3 — The lava was blasted away.\n1 — The lava flowed over parts of the Moon.\n2 — Meteors from space slammed into the lava.",
      solution: {
        method: "Sequence/ordering — paragraph 3",
        steps: [
          "Find the sequence in paragraph 3: 'The Moon's seas formed when dark lava flowed over those parts of the Moon. Inside these seas, there are bright craters. Those formed when rocks from space, called meteors, slammed into the lava, blasting them away.'",
          "Step 1 (first): Dark lava flowed over parts of the Moon.",
          "Step 2 (second): Meteors slammed into the lava.",
          "Step 3 (third/result): The lava was blasted away (forming craters).",
          "So the order is: Lava flowed (1) → Meteors slammed (2) → Lava blasted away (3).",
        ],
        tip: "For sequencing questions, look for time/order clue words: 'first', 'then', 'when', 'after'. Here the paragraph describes a chain of events — follow the logical cause-and-effect order.",
      },
    },
    {
      id: "acsj_eoy2022_B_comp2_43",
      marks: 1,
      question:
        "From the last paragraph, we learn that the ___ allow us to view the most details on the Moon.\n(tick one: eyes / binoculars / telescopes)",
      answer: "telescopes",
      solution: {
        method: "Locate comparative information in final paragraph",
        steps: [
          "Last paragraph: 'Some things on the Moon's face can be seen with just your eyes. Some craters become visible when you use binoculars. Through a telescope, you can see thousands of craters, seas and mountains.'",
          "Eyes → can see SOME things.",
          "Binoculars → can see SOME craters.",
          "Telescope → can see THOUSANDS of craters, seas and mountains (the MOST detail).",
          "Therefore telescopes allow the most detailed view.",
          "Answer: telescopes.",
        ],
        tip: "Compare the three options in the last paragraph. The key word is 'thousands' — a telescope gives the most detail. When comparing options, look for superlative indicators: 'most', 'thousands', 'all kinds of'.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — BOOKLET B
// ============================================================

export const acsj_eoy2022_bookletB: Question[] = [
  grammarCloze1,
  grammarCloze2,
  editing,
  ...sentenceCombining,
  comprehension1,
  comprehension2,
];

export const paperMetaB = {
  school: "Anglo-Chinese School (Junior)",
  code: "ACS(J)",
  year: 2022,
  exam: "Semestral Assessment 2 (SA2 / EOY)",
  level: "Primary 3",
  booklet: "B",
  totalMarks: 34,
  sections: [
    { name: "Part 4: Grammar Cloze 1", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Part 5: Grammar Cloze 2", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Part 6: Editing for Spelling & Grammar", questions: 4, marks: 4, topic: "Editing" as Topic },
    { name: "Part 7: Synthesis & Transformation", questions: 2, marks: 4, topic: "SentenceCombining" as Topic },
    { name: "Part 8: Comprehension Passage 1", questions: 6, marks: 10, topic: "ComprehensionOE" as Topic },
    { name: "Part 9: Comprehension Passage 2", questions: 7, marks: 8, topic: "ComprehensionOE" as Topic },
  ],
};
