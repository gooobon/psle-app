// ============================================================
// Maha Bodhi School — 2025 Weighted Assessment 2 (WA2)
// English Language Review (2), Primary Three
// Total: 30 marks, Duration: 50 min, Date: 22 August 2025
// Sections: A Grammar MCQ (6) | B Vocabulary MCQ (5) | C Punctuation (2)
//           D Grammar Cloze (4) | E Vocabulary Cloze (5) | F Comprehension OE (8)
// ============================================================

import type { PaperQuestion, PaperMeta } from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Maha Bodhi School",
  level: "Primary 3",
  subject: "English Language Review (2)",
  term: "WA2",
  year: 2025,
  totalMarks: 30,
  timeMinutes: 50,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Grammar MCQ  (Q1–Q6, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mahab2025-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Paul __________ the zoo with his family last Sunday.",
    options: ["(1) visit", "(2) visits", "(3) visited", "(4) was visiting"],
    answer: "3",
    solution: {
      method: "Past tense: 'last Sunday' = specific past time → simple past.",
      steps: [
        "'last Sunday' → SIMPLE PAST.",
        "(3) visited → past of visit → CORRECT.",
        "Answer: (3) visited.",
      ],
      tip: "'Last Sunday/week/month' triggers simple past. visit → visited.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question: "He bought __________ furniture recently for his new house.",
    options: ["(1) few", "(2) many", "(3) much", "(4) some"],
    answer: "4",
    solution: {
      method: "Quantifier: 'furniture' uncountable; positive statement → 'some'.",
      steps: [
        "'furniture' = uncountable → (1) few / (2) many WRONG.",
        "(4) some → natural for positive statements with uncountable nouns. CORRECT.",
        "Answer: (4) some.",
      ],
      tip: "'Some furniture' is correct in positive statements. 'Some' works with uncountable nouns.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The team captain convinced her coach that she was fully recovered and __________ play with her team.",
    options: ["(1) must", "(2) might", "(3) could", "(4) would"],
    answer: "3",
    solution: {
      method: "Modal: 'fully recovered' → ability to play → 'could'.",
      steps: [
        "Recovered → able to play → 'could' = past ability.",
        "(3) could → CORRECT.",
        "Answer: (3) could.",
      ],
      tip: "'Could' = was able to. 'She could play' = she had the ability to play after recovery.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Every year, a group of prize winners __________ given some special gifts.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "2",
    solution: {
      method: "SVA + tense: 'every year' = present; 'prize winners' (plural people) → 'are'.",
      steps: [
        "'every year' → PRESENT tense.",
        "The winners (plural people) → ARE given gifts.",
        "(2) are → CORRECT.",
        "Answer: (2) are.",
      ],
      tip: "'A group of winners' focusing on the individuals → 'are'. Present tense for 'every year'.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Jamie and Alex could not find their water bottles. The ones on the bench are probably __________.",
    options: ["(1) ours", "(2) hers", "(3) mine", "(4) theirs"],
    answer: "4",
    solution: {
      method: "Possessive pronoun: water bottles belong to Jamie and Alex (they/them) → theirs.",
      steps: [
        "Jamie and Alex = they → possessive = THEIRS.",
        "(4) theirs → CORRECT.",
        "Answer: (4) theirs.",
      ],
      tip: "They → their/theirs. The bottles on the bench probably belong to Jamie and Alex → theirs.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question: "He continued to work on his project __________ he was feeling unwell.",
    options: ["(1) so", "(2) since", "(3) although", "(4) however"],
    answer: "3",
    solution: {
      method: "Conjunction: contrast — worked despite being unwell → 'although'.",
      steps: [
        "Contrast: unwell BUT continued working.",
        "'although' = even though → introduces contrast. CORRECT.",
        "(4) 'however' is a conjunctive adverb, not a conjunction within one sentence.",
        "Answer: (3) although.",
      ],
      tip: "'Although' introduces a contrasting clause within ONE sentence. 'He worked although he was sick.'",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Vocabulary MCQ  (Q7–Q11, 5 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mahab2025-q7",
    topic: "VocabMCQ",
    marks: 1,
    question: "The friendly girl's __________ smile lit up the whole room when she stepped in.",
    options: ["(1) sly", "(2) cheeky", "(3) radiant", "(4) grateful"],
    answer: "3",
    solution: {
      method: "Vocabulary: a smile that 'lit up the whole room' → brilliant/glowing.",
      steps: [
        "'lit up the whole room' → bright, glowing smile.",
        "'radiant' = brilliantly warm and glowing. CORRECT.",
        "Answer: (3) radiant.",
      ],
      tip: "'Radiant smile' = brilliantly warm smile that seems to glow. 'Lit up the room' = radiant.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q8",
    topic: "VocabMCQ",
    marks: 1,
    question: "True friends will __________ you when you are feeling upset.",
    options: ["(1) please", "(2) satisfy", "(3) comfort", "(4) celebrate"],
    answer: "3",
    solution: {
      method: "Vocabulary: what true friends do when you feel upset.",
      steps: [
        "When upset → friends make you feel better → 'comfort'.",
        "(3) comfort = ease distress. CORRECT.",
        "Answer: (3) comfort.",
      ],
      tip: "'Comfort someone' = ease their distress. True friends COMFORT you when upset.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q9",
    topic: "VocabMCQ",
    marks: 1,
    question: "He wrapped the gift __________ so that the wrapping paper would not tear.",
    options: ["(1) neatly", "(2) gently", "(3) tightly", "(4) carelessly"],
    answer: "2",
    solution: {
      method: "Vocabulary: wrapping carefully to prevent tearing → gently.",
      steps: [
        "Goal: prevent tearing → need gentle handling.",
        "(2) gently = with softness/care → prevents tearing. CORRECT.",
        "(3) tightly → could cause tearing.",
        "Answer: (2) gently.",
      ],
      tip: "'Wrapped gently' = handled with care so the paper doesn't tear.",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q10",
    topic: "VocabMCQ",
    marks: 1,
    question: "The students were asked to __________ their homework.",
    options: ["(1) hand in", "(2) hand on", "(3) hand up", "(4) hand out"],
    answer: "1",
    solution: {
      method: "Phrasal verb: submit work to teacher = 'hand in'.",
      steps: [
        "'hand in' = submit work to authority. CORRECT.",
        "'hand out' = distribute (opposite direction).",
        "Answer: (1) hand in.",
      ],
      tip: "Students hand IN homework (submit to teacher). Teachers hand OUT worksheets (distribute to students).",
    },
  },

  {
    kind: "A",
    id: "mahab2025-q11",
    topic: "VocabMCQ",
    marks: 1,
    question: "Sungei Buloh has a __________ and diverse collection of plants and animals. You can see many varieties of them there that cannot be found in your neighbourhood.",
    options: ["(1) rich", "(2) special", "(3) beautiful", "(4) colourful"],
    answer: "1",
    solution: {
      method: "Vocabulary: large, varied collection in nature → 'rich'.",
      steps: [
        "Diverse + many varieties → abundant and varied.",
        "'rich' = having great variety and abundance. CORRECT.",
        "Answer: (1) rich.",
      ],
      tip: "'Rich and diverse collection' = many different types in abundance. 'Rich biodiversity' is a standard ecology phrase.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Punctuation  (Q12–Q13, 2 marks)
  //  Passage: Mohan at the Merlion Statue
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2025-secC",
    topic: "GrammarCloze",
    marks: 2,
    passageTitle: "Mohan at the Merlion Statue",
    passageText: "It was Mohan's first time seeing the Merlion statue. He was overjoyed and (12) __________ 'That's really amazing!' He then took out his camera. However, it did not seem to work (13) __________ had forgotten to charge his batteries beforehand!",
    questions: [
      {
        qid: "mahab2025-q12",
        blankLabel: "(12)",
        question: "He was overjoyed and (12) __________ 'That's really amazing!'\n(1) shouted  (2) shouted,  (3) Shouted  (4) Shouted!",
        options: ["(1) shouted", "(2) shouted,", "(3) Shouted", "(4) Shouted!"],
        answer: "2",
        solution: {
          method: "Reporting verb before direct speech → comma; middle of sentence → lowercase.",
          steps: [
            "Reporting verb before direct speech → needs comma.",
            "Middle of sentence → lowercase 's'.",
            "(2) shouted, → CORRECT.",
            "Answer: (2) shouted,",
          ],
          tip: "[reporting verb,] 'Direct speech.' Comma + lowercase when in middle of sentence.",
        },
      },
      {
        qid: "mahab2025-q13",
        blankLabel: "(13)",
        question: "it did not seem to work (13) __________ had forgotten to charge his batteries!",
        answer: "4",
        solution: {
          method: "Punctuation joining two related clauses; answer key = 4 (He with semicolon/period).",
          steps: [
            "The second clause explains WHY the camera didn't work.",
            "Answer key Q13 = 4 → capitalised 'He' after punctuation mark.",
            "Answer: (4).",
          ],
          tip: "Two related clauses: 'it did not work; He had forgotten to charge it' — strong punctuation separates but connects them.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Grammar Cloze (Verb Tenses)  (Q14–Q17, 4 marks)
  //  Passage: Sunflower Field
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2025-secD",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Sunflower Field",
    passageText: "In Central America, there is a huge sunflower field. Thousands of sunflowers are located there. Every summer, these sunflowers (14) __________ to be tall and vibrant. When their leaves are bright green and appear firm, this means they (15) __________ well.\n\nOnce, a farmer noticed that one patch (16) __________ faster than the rest. It could be due to the richer soil there. He also witnessed a single sunflower that (17) __________ remarkably well. That made him smile like a blooming flower.",
    wordBank: { grew: "grew", grow: "grow", grows: "grows", "was growing": "was growing", "were growing": "were growing", "are growing": "are growing" },
    questions: [
      {
        qid: "mahab2025-q14",
        blankLabel: "(14)",
        question: "Every summer, these sunflowers (14) __________ to be tall and vibrant.",
        answer: "grow",
        solution: {
          method: "'Every summer' = habitual present; sunflowers (plural) → grow.",
          steps: ["Every summer → simple present. Plural → base form: grow. Answer: grow."],
          tip: "'Every summer' = present simple habit. Plural subject → grow.",
        },
      },
      {
        qid: "mahab2025-q15",
        blankLabel: "(15)",
        question: "When their leaves are bright green, this means they (15) __________ well.",
        answer: "are growing",
        solution: {
          method: "Present continuous: currently in the process of growing well.",
          steps: ["Describing current ongoing growth → present continuous. They (plural) → are growing. Answer: are growing."],
          tip: "'Are growing well' = present continuous for ongoing process.",
        },
      },
      {
        qid: "mahab2025-q16",
        blankLabel: "(16)",
        question: "a farmer noticed that one patch (16) __________ faster than the rest.",
        answer: "grew",
        solution: {
          method: "Past simple: 'farmer noticed' (past) → reported action also past.",
          steps: ["'Noticed' (past) → reported clause also past. grow → grew. Answer: grew."],
          tip: "Past reporting: 'noticed that one patch GREW faster' — both verbs in past.",
        },
      },
      {
        qid: "mahab2025-q17",
        blankLabel: "(17)",
        question: "a single sunflower that (17) __________ remarkably well.",
        answer: "was growing",
        solution: {
          method: "Past continuous: farmer witnessed ongoing growth (past).",
          steps: ["'Witnessed' (past) + ongoing action being observed → past continuous. Singular subject → was growing. Answer: was growing."],
          tip: "'Was growing' = past continuous, describing growth the farmer observed in progress.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Vocabulary Cloze  (Q18–Q22, 5 marks)
  //  Passage: Harun's Scary Night
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2025-secE",
    topic: "VocabCloze",
    marks: 5,
    passageTitle: "Harun's Scary Night",
    passageText: "Harun was in bed one rainy night, getting ready to sleep. His grandmother was unwell and needed to stay at the hospital. His parents were there to (18) __________ her. Although he missed his grandmother, he had a test the following day and it was (19) __________ for him to get a good night's rest.\n\nThen, there was a loud thud from the balcony. Harun thought it could be the sound of a flower pot dropping due to the (20) __________. To calm himself down, he (21) __________ and uttered, 'Stop imagining things!'\n\nThe sound got louder and he could not take it any longer. He sat (22) __________ on his bed. Luckily, his father appeared by the door and apologised for giving him a scare. He had returned home.",
    wordBank: { impossible: "impossible", quivering: "quivering", breeze: "breeze", important: "important", storm: "storm", shrugged: "shrugged", company: "company", accompany: "accompany" },
    questions: [
      {
        qid: "mahab2025-q18",
        blankLabel: "(18)",
        question: "His parents were there to (18) __________ her.",
        answer: "accompany",
        solution: {
          method: "Vocabulary: parents going to be with grandmother at hospital.",
          steps: ["'accompany' = go with someone. CORRECT. Answer: accompany."],
          tip: "'Accompany' = go with, be present with someone.",
        },
      },
      {
        qid: "mahab2025-q19",
        blankLabel: "(19)",
        question: "it was (19) __________ for him to get a good night's rest.",
        answer: "important",
        solution: {
          method: "Vocabulary: rest before a test = necessary/important.",
          steps: ["Test the next day → rest is important. Answer: important."],
          tip: "Before a test, rest is IMPORTANT. 'It was important for him to rest.'",
        },
      },
      {
        qid: "mahab2025-q20",
        blankLabel: "(20)",
        question: "the sound of a flower pot dropping due to the (20) __________.",
        answer: "storm",
        solution: {
          method: "Vocabulary: rainy night weather that could knock over pots.",
          steps: ["Rainy night + loud thud → storm. CORRECT. Answer: storm."],
          tip: "Storm = strong rain/wind that can knock over flower pots on balconies.",
        },
      },
      {
        qid: "mahab2025-q21",
        blankLabel: "(21)",
        question: "To calm himself down, he (21) __________ and uttered, 'Stop imagining things!'",
        answer: "shrugged",
        solution: {
          method: "Vocabulary: dismissive gesture to calm down.",
          steps: ["'shrugged' = raised shoulders in dismissal → trying to be nonchalant. CORRECT. Answer: shrugged."],
          tip: "'Shrug' = gesture of dismissal. 'He shrugged and said...' = tried to dismiss his fear.",
        },
      },
      {
        qid: "mahab2025-q22",
        blankLabel: "(22)",
        question: "He sat (22) __________ on his bed.",
        answer: "quivering",
        solution: {
          method: "Vocabulary: how Harun sat when scared by louder sounds.",
          steps: ["Sound got louder → Harun was very scared → trembling/quivering. Answer: quivering."],
          tip: "'Quivering' = trembling/shaking from fear. 'Sat quivering' = sat trembling with fear.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Comprehension Open-Ended  (Q23–Q28, 8 marks)
  //  Passage: Stone Soup
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2025-secF",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "Stone Soup (adapted from The Stone Soup by Marcia Brown)",
    passageText: "One day, a traveller arrived at a village with nothing but an empty pot. His stomach was growling. He knocked on doors, asking for food. However, the villagers, fearing that they did not have enough, did not give any. He thought of an idea. He went to the village square, filled his pot with water and placed a stone inside. Feeling curious, the villagers gathered around and asked what he was doing.\n\n'I'm making a stone soup,' he said cheerfully. 'It will be delicious but it just needs more ingredients to bring out the flavour.' One villager, convinced by the idea, offered a few carrots. 'Perfect!' said the traveller, adding them to the pot.\n\nAnother supportive villager brought some potatoes. Soon others followed and gave onions, garlic and a bit of meat. Each person contributed a small ingredient, not thinking much about it. The pot boiled and the soup had a wonderful aroma.\n\nEventually, the stone was removed and the villagers all shared a hearty and tasty soup filled with a variety of ingredients. They sighed in amazement seeing how something that began with just a stone turned into a feast!\n\nThe traveller smiled, knowing he had not only filled their stomachs but also reminded them of the joy of sharing. That evening, the villagers let out cheers and hugged one another, grateful that they could enjoy food together.",
    questions: [
      {
        qid: "mahab2025-q23",
        question: "Which three-word phrase in the first paragraph tells us that the traveller was hungry? (1m)",
        answer: "stomach was growling",
        solution: {
          method: "Literal: paragraph 1 has 'His stomach was growling' = sign of hunger.",
          steps: ["'stomach was growling' = sound of hunger. 3 words. Answer: stomach was growling."],
          tip: "A growling stomach = hunger. Three words: stomach-was-growling.",
        },
      },
      {
        qid: "mahab2025-q24",
        question: "Why did the villagers not help the traveller at first? (1m)",
        answer: "They feared that they did not have enough food.",
        solution: {
          method: "Literal: 'villagers, fearing that they did not have enough, did not give any.'",
          steps: ["Reason: feared not having enough food. Answer: They feared that they did not have enough food."],
          tip: "The villagers feared scarcity — they thought they had too little to share.",
        },
      },
      {
        qid: "mahab2025-q25",
        question: "What does 'it' in line 7 refer to? (1m)\n'It' refers to the __________.",
        answer: "stone soup",
        solution: {
          method: "Pronoun reference: 'I'm making a stone soup... It will be delicious.'",
          steps: ["'It' = the stone soup (just mentioned). Answer: stone soup."],
          tip: "'I'm making STONE SOUP.' Next: 'IT will be delicious' → IT = stone soup.",
        },
      },
      {
        qid: "mahab2025-q26",
        question: "Tick the correct answer. Why did the traveller start cooking the soup with a stone? (1m)\n☐ He wanted to make the villagers curious.\n☐ He wanted the villagers to enjoy his soup.\n☐ He wanted the villagers to contribute some ingredients.",
        options: ["He wanted to make the villagers curious.", "He wanted the villagers to enjoy his soup.", "He wanted the villagers to contribute some ingredients."],
        answer: "He wanted the villagers to contribute some ingredients.",
        solution: {
          method: "Inferential: the traveller's END GOAL was to get ingredients from villagers.",
          steps: ["His plan: lure villagers with 'stone soup' → get them to contribute ingredients. END GOAL = contributions. Answer: He wanted the villagers to contribute some ingredients."],
          tip: "Making villagers curious = STRATEGY. Getting ingredients = GOAL. The stone was the trick to get people to donate food.",
        },
      },
      {
        qid: "mahab2025-q27",
        question: "Write 1, 2 and 3 in the blanks to indicate the order of events. (1m)\n___ The stone was removed from the soup.\n___ The villagers wondered what the traveller was up to.\n___ The traveller requested for some ingredients.",
        answer: "The stone was removed: 3\nVillagers wondered: 1\nTraveller requested ingredients: 2",
        solution: {
          method: "Sequence: villagers wondered (para 1) → traveller asked for ingredients (para 2) → stone removed (para 4).",
          steps: ["1: villagers gathered and wondered. 2: traveller asked for more ingredients. 3: stone was eventually removed. Answer: 3-1-2 → wondered=1, requested=2, removed=3."],
          tip: "Follow paragraph order: curious (para 1) → asked for ingredients (para 2) → stone removed (para 4).",
        },
      },
      {
        qid: "mahab2025-q28",
        question: "State if each sentence is True or False. Give a reason. (3 × 1m)\n(a) The traveller was quick-thinking.\n(b) The stone made the soup taste good by itself.\n(c) The villagers were overjoyed after having the 'stone soup'.",
        answer: "(a) True — he used a stone and got the villagers to contribute ingredients.\n(b) False — the ingredients given by the villagers made the soup taste good.\n(c) True — it was because after finishing the soup they hugged each other with joy.",
        solution: {
          method: "True/False with reasons from the passage.",
          steps: [
            "(a) Quick-thinking = clever plan → TRUE. He cleverly used a stone to trick villagers into contributing.",
            "(b) Stone alone made soup good → FALSE. The INGREDIENTS (carrots, potatoes, meat) made it tasty. Stone was removed.",
            "(c) Overjoyed → TRUE. 'Villagers let out cheers and hugged one another, grateful.' = joy/overjoyed.",
          ],
          tip: "(a)T: clever plan. (b)F: ingredients made soup good (not the stone). (c)T: cheers and hugs = overjoyed.",
        },
      },
    ],
  },
];

export const mahab2025Paper = { meta, questions };
export default mahab2025Paper;
