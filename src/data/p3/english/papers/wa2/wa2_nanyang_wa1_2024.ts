// ============================================================
// NANYANG PRIMARY SCHOOL
// TERM 1 WEIGHTED ASSESSMENT 1 (WA1)
// ENGLISH LANGUAGE – PRIMARY 3
// Total: 20 marks | Duration: 40 minutes
// Sections: A Grammar MCQ (3), B Vocab MCQ (3), C Grammar Cloze (3),
//           D Editing for Spelling (3), E Comprehension (8)
// ============================================================

export type TopicType =
  | "GrammarMCQ" | "VocabMCQ" | "GrammarCloze" | "VocabCloze"
  | "Editing" | "SentenceCombining" | "VisualText"
  | "ComprehensionMCQ" | "ComprehensionOE" | "ComprehensionFIB";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export interface TypeAQuestion {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  question: string;
  options?: string[];
  answer: string;
  solution: Solution;
}

export interface TypeBPassage {
  kind: "B";
  id: string;
  topic: TopicType;
  title: string;
  instructions: string;
  wordBox?: string[];
  passage: string;
  questions: TypeBQuestion[];
}

export interface TypeBQuestion {
  id: string;
  questionNumber: number;
  marks: number;
  question: string;
  options?: string[];
  answer: string;
  solution: Solution;
}

export type Question = TypeAQuestion | TypeBPassage;

// ============================================================
// PAPER DATA
// ============================================================

const paper: {
  school: string;
  level: string;
  subject: string;
  term: string;
  year: number;
  totalMarks: number;
  duration: string;
  questions: Question[];
} = {
  school: "Nanyang Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "Term 1 Weighted Assessment 1 (WA1)",
  year: 2024,
  totalMarks: 20,
  duration: "40 minutes",
  questions: [

    // ══════════════════════════════════════════════════
    // SECTION A: GRAMMAR MCQ (Q1–3, 3 marks)
    // ══════════════════════════════════════════════════

    {
      kind: "A",
      id: "NYP-WA1-A-Q1",
      topic: "GrammarMCQ",
      marks: 1,
      question: "John ________ when he watched the sad movie.\n(1) cry\n(2) cried\n(3) cries\n(4) is crying",
      options: ["cry", "cried", "cries", "is crying"],
      answer: "(2) cried",
      solution: {
        method: "Simple past tense — time clue 'when he watched'",
        steps: [
          "The time clause 'when he watched the sad movie' uses the simple past tense ('watched').",
          "The main clause must also be in the simple past tense for consistency.",
          "Simple past of 'cry' is 'cried' (cry → cried, regular verb with y→ied rule).",
          "(1) 'cry' is base form (present), (3) 'cries' is present tense, (4) 'is crying' is present continuous — all wrong for past.",
        ],
        tip: "When the time clause uses a past verb ('watched'), the main clause should also be past ('cried').",
      },
    },

    {
      kind: "A",
      id: "NYP-WA1-A-Q2",
      topic: "GrammarMCQ",
      marks: 1,
      question: "There is not ________ orange juice left as Dad has drunk most of it.\n(1) little\n(2) some\n(3) much\n(4) many",
      options: ["little", "some", "many", "much"],
      answer: "(3) much",
      solution: {
        method: "Quantifier with uncountable nouns in negative sentences",
        steps: [
          "Orange juice is an uncountable noun (liquid) — we cannot count individual units.",
          "For uncountable nouns: use 'much' in negative/question sentences.",
          "'There is not much…' is the correct negative pattern with uncountable nouns.",
          "(4) 'many' is for countable nouns (many bottles, many cups), not for juice itself.",
          "(1) 'little' means a small amount — used in positive sentences ('little juice left').",
          "(2) 'some' is used in positive statements ('there is some juice').",
        ],
        tip: "Uncountable nouns → much (negative/question) / some (positive). Countable → many/some.",
      },
    },

    {
      kind: "A",
      id: "NYP-WA1-A-Q3",
      topic: "GrammarMCQ",
      marks: 1,
      question: "\"How about sharing your toys with ________ children over there?\" the teacher asked.\n(1) this\n(2) that\n(3) these\n(4) those",
      options: ["this", "that", "these", "those"],
      answer: "(4) those",
      solution: {
        method: "Demonstrative pronouns — distance and number",
        steps: [
          "The noun 'children' is plural.",
          "For plural nouns: use 'these' (near) or 'those' (far).",
          "The phrase 'over there' indicates the children are FAR AWAY from the speaker.",
          "Far + plural → 'those'. Therefore 'those children over there' is correct.",
          "(1) 'this' = singular + near. (2) 'that' = singular + far. (3) 'these' = plural + near.",
        ],
        tip: "Remember: This/These = NEAR; That/Those = FAR. This/That = SINGULAR; These/Those = PLURAL.",
      },
    },

    // ══════════════════════════════════════════════════
    // SECTION B: VOCABULARY MCQ (Q4–6, 3 marks)
    // ══════════════════════════════════════════════════

    {
      kind: "A",
      id: "NYP-WA1-B-Q4",
      topic: "VocabMCQ",
      marks: 1,
      question: "No one could recognise Barry in ________ as an alien at the party last night.\n(1) parade\n(2) bluffing\n(3) disguise\n(4) camouflage",
      options: ["parade", "bluffing", "disguise", "camouflage"],
      answer: "(3) disguise",
      solution: {
        method: "Vocabulary — word meaning in context",
        steps: [
          "The sentence says no one could recognise Barry — he was dressed as an alien.",
          "'Disguise' means a costume or change of appearance to hide one's true identity.",
          "(4) 'camouflage' = blending into the environment (used by soldiers/animals), not a party costume.",
          "(1) 'parade' = a march/procession — not about hiding identity.",
          "(2) 'bluffing' = pretending/deceiving verbally, not a physical disguise.",
          "'In disguise' is the correct idiom for being dressed up to hide who you are.",
        ],
        tip: "'In disguise' is a fixed phrase meaning dressed to hide identity. Camouflage blends in; disguise transforms appearance.",
      },
    },

    {
      kind: "A",
      id: "NYP-WA1-B-Q5",
      topic: "VocabMCQ",
      marks: 1,
      question: "The large amount of toxic waste emptied into this river ________ the habitat of many creatures living in it.\n(1) attacked\n(2) wrenched\n(3) destroyed\n(4) obstructed",
      options: ["attacked", "wrenched", "destroyed", "obstructed"],
      answer: "(3) destroyed",
      solution: {
        method: "Vocabulary — precise word meaning",
        steps: [
          "Toxic waste emptied into a river would ruin/eliminate the habitat of creatures.",
          "'Destroyed' means completely ruined or eliminated — appropriate for a habitat made unliveable by toxic waste.",
          "(1) 'attacked' = a physical assault — habitats are not attacked, they are destroyed.",
          "(2) 'wrenched' = twisted/pulled violently — does not collocate with habitat.",
          "(4) 'obstructed' = blocked — refers to physical blockage, not destruction of a habitat.",
        ],
        tip: "'Destroyed' collocates with habitat, environment, home — it means completely ruined. 'Obstructed' means blocked, not ruined.",
      },
    },

    {
      kind: "A",
      id: "NYP-WA1-B-Q6",
      topic: "VocabMCQ",
      marks: 1,
      question: "The ________ curtains put up in the bedroom gave it a soft and cosy look.\n(1) waxy\n(2) bulky\n(3) prickly\n(4) velvety",
      options: ["waxy", "bulky", "prickly", "velvety"],
      answer: "(4) velvety",
      solution: {
        method: "Vocabulary — texture adjective",
        steps: [
          "The curtains give a 'soft and cosy look' — the adjective must mean soft.",
          "'Velvety' means having a soft, smooth texture like velvet — perfectly describes soft curtains.",
          "(1) 'waxy' = having a shiny, wax-like surface — not soft/cosy.",
          "(2) 'bulky' = large and heavy — not a texture word.",
          "(3) 'prickly' = having sharp points — the opposite of soft.",
        ],
        tip: "'Velvety' describes a smooth, soft texture like velvet fabric. Match the adjective to 'soft and cosy'.",
      },
    },

    // ══════════════════════════════════════════════════
    // SECTION C: GRAMMAR CLOZE (Q7–9, 3 marks)
    // Passage: Teachers' Day
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "NYP-WA1-C-CLOZE",
      topic: "GrammarCloze",
      title: "Section C: Grammar Cloze (3 marks, Q7–9)",
      instructions:
        "There are 3 blanks, numbered 7 to 9 in the passage below. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. Use each word once only.",
      wordBox: ["(A) I", "(B) they", "(C) we", "(D) our", "(E) their", "(F) you"],
      passage:
        '"Teachers\' Day is coming! Shall (7) ________ make a gift for our teacher together?" Timmy asked his classmate, Annie.\n\nAnnie agreed and they sat down to discuss what gift (8) ________ teacher would like. "I can bake some chocolate cupcakes for her. Timmy, why don\'t (9) ________ make a nice card for her?" Annie suggested. Timmy thought that was a good idea and he started designing the card immediately.',
      questions: [
        {
          id: "NYP-WA1-C-Q7",
          questionNumber: 7,
          marks: 1,
          question: '"Teachers\' Day is coming! Shall (7) ________ make a gift for our teacher together?"',
          answer: "(C) we",
          solution: {
            method: "Pronoun in question — suggesting shared action",
            steps: [
              "Timmy is asking Annie to make a gift TOGETHER — he includes himself in the suggestion.",
              "'Shall we…?' is the standard English question form for making suggestions that include the speaker.",
              "Since Timmy includes himself and Annie, the pronoun is 'we'.",
              "(A) 'I' would only be the speaker. (F) 'you' would be asking only Annie. Neither is correct.",
            ],
            tip: "'Shall we…?' is a fixed suggestion structure. Use 'we' when the speaker includes themselves in the proposal.",
          },
        },
        {
          id: "NYP-WA1-C-Q8",
          questionNumber: 8,
          marks: 1,
          question: "…they sat down to discuss what gift (8) ________ teacher would like.",
          answer: "(E) their",
          solution: {
            method: "Possessive pronoun — reference to Timmy and Annie",
            steps: [
              "The antecedent is 'they' (Timmy and Annie together).",
              "'Their' is the possessive form of 'they' — used to show something belongs to them.",
              "'Their teacher' means the teacher who belongs to/teaches both of them.",
              "(D) 'our' would be used if the narrator was one of them speaking — but this is third-person narrative.",
            ],
            tip: "They → their (possessive). 'Their teacher' = the teacher of Timmy and Annie.",
          },
        },
        {
          id: "NYP-WA1-C-Q9",
          questionNumber: 9,
          marks: 1,
          question: '"Timmy, why don\'t (9) ________ make a nice card for her?" Annie suggested.',
          answer: "(F) you",
          solution: {
            method: "Pronoun — direct address",
            steps: [
              "Annie is speaking directly to Timmy: 'Timmy, why don't ________ make a nice card?'",
              "She is asking him to do something — addressing him directly.",
              "'You' is the second-person pronoun used when speaking directly to someone.",
              "'Why don't you…?' is a standard suggestion directed at the person being spoken to.",
            ],
            tip: "When speaking directly to one person and suggesting they do something, use 'you'.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION D: EDITING FOR SPELLING (Q10–12, 3 marks)
    // Passage: Julie's Birthday
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "NYP-WA1-D-EDITING",
      topic: "Editing",
      title: "Section D: Editing for Spelling (3 marks, Q10–12)",
      instructions:
        "Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.",
      passage:
        "It was Julie's birthday! She had been waiting eagerly to see what presents she would (10) resieve. Just then, the doorbell rang. Thinking it was a delivery meant for her, she opened the door. She was (11) petreefyed by what she saw.\n\nIt was a huge grizzly bear! Seeing her shocked face, the grizzly bear exclaimed, \"Happy birthday, Julie!\" She was (12) suprized to see her father in the bear costume. It was a memorable birthday for Julie.",
      questions: [
        {
          id: "NYP-WA1-D-Q10",
          questionNumber: 10,
          marks: 1,
          question: "She would (10) resieve → correct spelling?",
          answer: "receive",
          solution: {
            method: "Spelling rule — 'i before e except after c'",
            steps: [
              "The misspelled word is 'resieve' — the 'ie/ei' letters are in the wrong order.",
              "Rule: 'i before e, except after c'. After 'c', the order is 'ei' not 'ie'.",
              "'Receive' has 'c' before the vowels — so it must be 'ei': r-e-c-e-i-v-e.",
              "Correct spelling: RECEIVE.",
            ],
            tip: "After C, use EI: reCEIve, deCEIve, percEIve. This is the 'i before e except after c' rule.",
          },
        },
        {
          id: "NYP-WA1-D-Q11",
          questionNumber: 11,
          marks: 1,
          question: "She was (11) petreefyed → correct spelling?",
          answer: "petrified",
          solution: {
            method: "Correct spelling of 'petrified'",
            steps: [
              "The misspelled word 'petreefyed' has two errors: 'ee' instead of 'i' and 'y' spelling issues.",
              "Correct spelling: p-e-t-r-i-f-i-e-d → PETRIFIED.",
              "'Petrified' = extremely frightened / turned to stone (figuratively).",
              "Break it down: pet-ri-fied. The suffix is '-fied' (from 'fy' → 'fied' when making past tense).",
            ],
            tip: "Petrified = extremely scared. Remember: pet-ri-FIED (not 'treefyed'). Common in comprehension passages.",
          },
        },
        {
          id: "NYP-WA1-D-Q12",
          questionNumber: 12,
          marks: 1,
          question: "She was (12) suprized → correct spelling?",
          answer: "surprised",
          solution: {
            method: "Correct spelling — 'surprised'",
            steps: [
              "The misspelled word 'suprized' is missing the 'r' in 'sur-' and uses 'z' instead of 's'.",
              "Correct spelling: s-u-r-p-r-i-s-e-d → SURPRISED.",
              "British/Singapore English uses 'surprised' with an 's' (not 'z').",
              "Break it down: sur-pris-ed. Note the double 'r': s-u-R-p-R-i-s-e-d.",
            ],
            tip: "SURPRISED: sur + prise + d. Both 'r's are important. Use 's' not 'z' in Singapore English.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION E: COMPREHENSION (Q13–19, 8 marks)
    // Passage: Greywhiskers the Mouse (adapted from The Little Thief in the Pantry)
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "NYP-WA1-E-COMPREHENSION",
      topic: "ComprehensionOE",
      title: "Section E: Comprehension (8 marks, Q13–19)",
      instructions: "Read this passage and answer questions 13 to 19.",
      passage:
        '"Mother," said a little mouse, "the people in our house are so kind! They leave such nice things for us in the kitchen!"\n\n"People are not as kind as you think. Greywhiskers, remember that you are not allowed to leave our mouse-hole by yourself as it is dangerous," warned Mother Mouse.\n\nGreywhiskers nodded his head, but he had other plans. As soon as his mother had curled up for her daily nap, he scampered out of the mouse-hole to the kitchen.\n\nHe saw a cake on the table. Greywhiskers sniffed the cake, then nibbled on it greedily. The cake was not only fragrant, but also scrumptious! When he got home, he was scolded by his mother for disobeying her. He promised her that he would not do it again.\n\nHowever, the naughty little mouse went to the kitchen again the next day. He saw his favourite cheese and ran forward to get it, but something snapped shut, trapping him. It was a mouse trap! Greywhiskers sobbed in a corner of the trap, wishing he had listened to his mother.\n\nSoon, the man who had set the trap came. He saw the little mouse and said to a little girl, "See who ate your cake, Ethel! I\'m going to get rid of it."\n\nEthel felt sorry for the mouse. Before the man could do anything, she lifted the lid of the trap, and the little mouse scurried home as quickly as it could.\n\nAdapted from: The Little Thief in the Pantry',
      questions: [
        {
          id: "NYP-WA1-E-Q13",
          questionNumber: 13,
          marks: 1,
          question:
            "Fill in the blank with a suitable word.\nMother Mouse did not want Greywhiskers to leave the mouse-hole by himself as she felt that it was not ________ for him to do so.",
          answer: "safe",
          solution: {
            method: "Inference + vocabulary — find suitable word",
            steps: [
              "Mother Mouse's warning: 'you are not allowed to leave our mouse-hole by yourself as it is dangerous.'",
              "The blank asks for a word meaning 'not dangerous' — the opposite is what she wanted.",
              "The sentence says 'not ________' — so the word must be a positive word meaning SAFE.",
              "Suitable word: 'safe'. (Mother thought it was dangerous → not safe.)",
            ],
            tip: "'Dangerous' → 'not safe'. The blank is a negative form, so the word itself should be positive.",
          },
        },
        {
          id: "NYP-WA1-E-Q14",
          questionNumber: 14,
          marks: 1,
          question:
            "Pick out a four-word phrase from paragraph 3 which shows that Greywhiskers was thinking about disobeying his mother.",
          answer: "he had other plans",
          solution: {
            method: "Phrase extraction — inference clue",
            steps: [
              "Locate paragraph 3: 'Greywhiskers nodded his head, but he had other plans.'",
              "'He had other plans' is a 4-word phrase showing he was planning to do something else (disobey).",
              "Despite nodding (appearing to agree), he was secretly planning to sneak out.",
            ],
            tip: "'Other plans' implies he intended to do something different from what his mother said — count the words: he(1) had(2) other(3) plans(4).",
          },
        },
        {
          id: "NYP-WA1-E-Q15",
          questionNumber: 15,
          marks: 1,
          question:
            "Which word has the same meaning as 'delicious'? Circle either (A) or (B).\n\nThe cake was not only (A) fragrant, but also (B) scrumptious!",
          answer: "(B) scrumptious",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "'Delicious' means very tasty/pleasing to eat.",
              "(A) 'fragrant' = having a pleasant smell — related to aroma, not taste.",
              "(B) 'scrumptious' = extremely delicious — exactly matches the meaning of 'delicious'.",
              "Therefore, circle (B) scrumptious.",
            ],
            tip: "'Scrumptious' = delicious (taste). 'Fragrant' = nice smell. Don't confuse taste and smell.",
          },
        },
        {
          id: "NYP-WA1-E-Q16",
          questionNumber: 16,
          marks: 2,
          question:
            "Using information from paragraph 4, complete the sentences to show what each of the two mice did when Mother Mouse discovered that the little mouse had gone to the kitchen by himself.\n\na) Mother Mouse _______________________________\nb) The little mouse _______________________________",
          answer:
            "a) Mother Mouse scolded the little mouse.\nb) The little mouse promised he would not go to the kitchen by himself (again).",
          solution: {
            method: "Literal comprehension — extract actions from paragraph 4",
            steps: [
              "Locate paragraph 4: 'When he got home, he was scolded by his mother for disobeying her. He promised her that he would not do it again.'",
              "a) Mother Mouse's action: scolded the little mouse.",
              "b) Little mouse's action: promised he would not do it again / would not go to the kitchen by himself.",
              "Write in complete phrases to fill each blank naturally.",
            ],
            tip: "Find the two actions in paragraph 4. Mother scolded → mouse promised. Both are clearly stated.",
          },
        },
        {
          id: "NYP-WA1-E-Q17",
          questionNumber: 17,
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks to show what happened first, next, and last in the story.\n\n[ ] Mother Mouse slept.\n[ ] Greywhiskers was caught.\n[ ] Greywhiskers saw his favourite food in the kitchen.",
          answer: "1 (Mother Mouse slept), 3 (Greywhiskers was caught), 2 (Greywhiskers saw his favourite food)",
          solution: {
            method: "Sequencing — story order",
            steps: [
              "Event A — Mother Mouse slept: 'As soon as his mother had curled up for her daily nap…' → paragraph 3, this happens FIRST (1).",
              "Event B — Greywhiskers saw his favourite food: paragraph 5 — 'He saw his favourite cheese…' → happens SECOND (2). Wait — the cheese visit is the second day's event.",
              "Event C — Greywhiskers was caught: paragraph 5 — 'something snapped shut, trapping him.' → happens LAST (3), after seeing the cheese.",
              "Correct sequence: Mother slept (1) → Saw favourite food / cheese (2) → Was caught (3).",
            ],
            tip: "Follow the story chronologically across paragraphs. Look for time words: 'as soon as', 'the next day', 'soon'.",
          },
        },
        {
          id: "NYP-WA1-E-Q18",
          questionNumber: 18,
          marks: 1,
          question:
            "Tick ✓ the word that best describes how the little mouse felt when he was caught by the mouse trap.\n\n[ ] angry\n[ ] regretful\n[ ] guilty",
          options: ["angry", "regretful", "guilty"],
          answer: "regretful",
          solution: {
            method: "Inference — character feelings",
            steps: [
              "Find how the mouse felt when caught: 'Greywhiskers sobbed in a corner of the trap, wishing he had listened to his mother.'",
              "'Wishing he had listened to his mother' = he regretted not listening → REGRETFUL.",
              "'Guilty' means knowing you did wrong — possible, but 'regretful' better captures 'wishing he had listened'.",
              "'Angry' has no support from the text.",
            ],
            tip: "'Wishing he had done differently' = regret. 'Regretful' is the best word here.",
          },
        },
        {
          id: "NYP-WA1-E-Q19",
          questionNumber: 19,
          marks: 1,
          question:
            "Read the statement given and tick ✓ 'True' or 'False'. The first example has been done for you.\n\nEthel was angry with the little mouse for eating her cake. True / False?",
          answer: "False",
          solution: {
            method: "True/False — inference from character action",
            steps: [
              "The passage says: 'Ethel felt sorry for the mouse. Before the man could do anything, she lifted the lid of the trap…'",
              "Feeling SORRY and FREEING the mouse shows she was not angry — she was compassionate.",
              "If she were angry, she would have let the man 'get rid of it', not freed it.",
              "Statement is FALSE.",
            ],
            tip: "Actions reveal feelings: freeing the mouse = not angry. Feeling sorry = sympathy, not anger.",
          },
        },
      ],
    },
  ],
};

export default paper;
