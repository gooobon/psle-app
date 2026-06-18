// ============================================================
// ST. HILDA'S PRIMARY SCHOOL
// TERM 2 WEIGHTED ASSESSMENT 2024
// ENGLISH LANGUAGE – PRIMARY 3
// Total: 26 marks | Duration: 45 minutes
// Date: 16 April 2024
// Sections: A Grammar MCQ (8 × 1m), B Grammar Cloze (8 × 1m), C Comprehension (10m)
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
  school: "St. Hilda's Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "Term 2 Weighted Assessment 2024",
  year: 2024,
  totalMarks: 26,
  duration: "45 minutes",
  questions: [

    // ══════════════════════════════════════════════════
    // SECTION A: GRAMMAR MCQ (Q1–8, 8 marks)
    // ══════════════════════════════════════════════════

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q1",
      topic: "GrammarMCQ",
      marks: 1,
      question: "Anna mixed red and blue paint to ________ purple.\n(1) create\n(2) creates\n(3) created\n(4) creating",
      options: ["create", "creates", "created", "creating"],
      answer: "(1) create",
      solution: {
        method: "Infinitive of purpose after 'to'",
        steps: [
          "The word 'to' here is used as an infinitive marker showing purpose ('in order to').",
          "After 'to' (infinitive marker), use the base form of the verb.",
          "Base form of 'create' = 'create' (no changes).",
          "(2) 'creates' adds -s for third person — not used after infinitive 'to'.",
          "(3) 'created' is past tense — not used after infinitive 'to'.",
          "(4) 'creating' is gerund/present participle — needs 'be' before it.",
        ],
        tip: "After 'to' (as infinitive of purpose), always use the BASE FORM of the verb: to create, to run, to make.",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q2",
      topic: "GrammarMCQ",
      marks: 1,
      question: "The kangaroo leapt ________ the fence and escaped from the enclosure.\n(1) near\n(2) over\n(3) along\n(4) below",
      options: ["near", "over", "along", "below"],
      answer: "(2) over",
      solution: {
        method: "Preposition of movement — direction relative to obstacle",
        steps: [
          "The kangaroo 'leapt' and 'escaped' — it cleared/crossed an obstacle (the fence).",
          "'Over' means across and above something — the kangaroo jumped across the top of the fence.",
          "(1) 'near' = close to but not crossing — doesn't indicate escape.",
          "(3) 'along' = following the length of something — doesn't indicate jumping across.",
          "(4) 'below' = under — a kangaroo jumping below a fence doesn't make sense.",
          "'Leapt over the fence' = jumped across the fence to escape.",
        ],
        tip: "'Over' shows movement from one side to another by going above something. Kangaroos JUMP OVER, not near/along/below.",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q3",
      topic: "GrammarMCQ",
      marks: 1,
      question: '"The chocolates in this box ________ delicious!" exclaimed Caleb as he reached out for more.\n(1) is\n(2) are\n(3) was\n(4) were',
      options: ["is", "are", "was", "were"],
      answer: "(2) are",
      solution: {
        method: "Subject-verb agreement — plural noun + present tense",
        steps: [
          "The subject is 'The chocolates' — plural noun.",
          "The speech is happening now (Caleb is currently eating them, present context).",
          "Plural subject + present tense → use 'are'.",
          "(1) 'is' is for singular subjects (the chocolate IS delicious).",
          "(3) 'was' and (4) 'were' are past tense — Caleb is currently exclaiming, so present is needed.",
        ],
        tip: "Chocolates (plural) + present = ARE. Don't be tricked by the nearby singular 'box' — the subject is 'chocolates'.",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q4",
      topic: "GrammarMCQ",
      marks: 1,
      question: "________ time has been wasted. You will need to work faster.\n(1) Much\n(2) Many\n(3) Little\n(4) Few",
      options: ["Much", "Many", "Little", "Few"],
      answer: "(1) Much",
      solution: {
        method: "Quantifier — uncountable noun 'time'",
        steps: [
          "'Time' is an uncountable noun (you cannot count individual 'times' in this context).",
          "For uncountable nouns: use 'much' (large amount) or 'little' (small amount).",
          "The sentence says time 'has been wasted' — a large amount → 'Much time'.",
          "(2) 'Many' is for countable plural nouns (many minutes — but 'time' itself is uncountable).",
          "(4) 'Few' is for countable plural nouns.",
          "(3) 'Little' means a small amount — but the context implies a lot of time was wasted, needing to work faster.",
        ],
        tip: "Time = uncountable → MUCH or LITTLE (not many/few). Context: lots wasted = MUCH.",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q5",
      topic: "GrammarMCQ",
      marks: 1,
      question: "The park map clearly shows ________ the playground is.\n(1) who\n(2) what\n(3) which\n(4) where",
      options: ["who", "what", "which", "where"],
      answer: "(4) where",
      solution: {
        method: "Embedded question / indirect question — location",
        steps: [
          "The sentence is an indirect question (embedded in a statement): 'shows ________ the playground is.'",
          "This asks about the LOCATION of the playground — where it is.",
          "'Where' introduces a clause about location: 'where the playground is'.",
          "(1) 'who' = person. (2) 'what' = thing/action. (3) 'which' = choosing between options.",
          "None of those relate to location — 'where' is correct.",
        ],
        tip: "Where = location. Who = person. What = thing. Which = choice. Here we need location → WHERE.",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q6",
      topic: "GrammarMCQ",
      marks: 1,
      question: 'My brother yelled excitedly, "Come here and look at ________ kittens! They are really cute!"\n(1) this\n(2) that\n(3) these\n(4) those',
      options: ["this", "that", "these", "those"],
      answer: "(3) these",
      solution: {
        method: "Demonstrative adjective — plural + proximity",
        steps: [
          "The noun 'kittens' is plural.",
          "For plural: 'these' (near) or 'those' (far).",
          "The brother yells 'Come HERE and look at…' — the kittens are near him (he is with them).",
          "Near + plural → 'these'.",
          "(4) 'those' would be used if the kittens were far away.",
        ],
        tip: "'Come HERE' = the kittens are near the speaker = THESE (not those).",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q7",
      topic: "GrammarMCQ",
      marks: 1,
      question: "The children ________ the zoo last week.\n(1) visit\n(2) visited\n(3) will visit\n(4) are visiting",
      options: ["visit", "visited", "will visit", "are visiting"],
      answer: "(2) visited",
      solution: {
        method: "Simple past tense — time clue 'last week'",
        steps: [
          "'Last week' is a past time marker → the action happened in the past.",
          "Simple past tense: visited (visit → visited, regular verb).",
          "(1) 'visit' = base/present form (no past marker).",
          "(3) 'will visit' = future tense — contradicts 'last week'.",
          "(4) 'are visiting' = present continuous — contradicts 'last week'.",
        ],
        tip: "Time clue 'last week' = simple past. Visit → visited (add -ed for regular verbs).",
      },
    },

    {
      kind: "A",
      id: "SHP-T2WA-2024-A-Q8",
      topic: "GrammarMCQ",
      marks: 1,
      question: "Dan has ________ interesting ideas for the project. We should hear him out.\n(1) no\n(2) any\n(3) each\n(4) some",
      options: ["no", "any", "each", "some"],
      answer: "(4) some",
      solution: {
        method: "Quantifier 'some' in positive statements",
        steps: [
          "The second sentence says 'We should hear him out' — positive recommendation, suggesting the ideas are good.",
          "The sentence is a positive statement (not a question or negative).",
          "'Some' is used in positive statements to refer to an unspecified number/amount.",
          "(1) 'no' = zero ideas — contradicts 'we should hear him out'.",
          "(2) 'any' is used in negatives/questions ('does he have any ideas?').",
          "(3) 'each' refers to individual items — not used with plural uncountable 'ideas' in this context.",
        ],
        tip: "SOME = positive statements. ANY = negatives or questions. 'He has SOME ideas' (good!) vs 'He doesn't have ANY ideas'.",
      },
    },

    // ══════════════════════════════════════════════════
    // SECTION B: GRAMMAR CLOZE (Q9–16, 8 marks)
    // Passage 1: Vanda Miss Joaquim (Q9–12)
    // Passage 2: Princess and Dragon (Q13–16)
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "SHP-T2WA-2024-B-PASS1",
      topic: "GrammarCloze",
      title: "Section B: Grammar Cloze – Passage 1 (Q9–12, 4 marks)",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. USE A WORD ONCE ONLY.",
      wordBox: [
        "(A) after", "(B) between", "(C) for",
        "(D) in", "(E) on", "(F) with",
      ],
      passage:
        "Singapore's national flower is Vanda Miss Joaquim. Also known as the Singapore Orchid, it was selected from among forty different flowers (9)________ 1981.\n\nNamed (10)________ Miss Joaquim, the person who first discovered it, this orchid blooms throughout the year in Singapore. Lots of fertilisers are required (11)________ it to bloom well and up to twelve flowers can grow (12)________ each main branch of the plant.\n\nVanda Miss Joaquim can be found in many parks and gardens across Singapore.\n\nadapted from www.nparks.gov.sg",
      questions: [
        {
          id: "SHP-T2WA-2024-B-P1-Q9",
          questionNumber: 9,
          marks: 1,
          question: "…it was selected from among forty different flowers (9)________ 1981.",
          answer: "(D) in",
          solution: {
            method: "Preposition of time — year",
            steps: [
              "'1981' is a year — a specific calendar year.",
              "For years, we use the preposition 'in': in 1981, in 2024.",
              "(A) 'after' = following a time point, not used with a year alone.",
              "(B) 'between' = in the middle of two things.",
              "(E) 'on' is used for specific dates (on 1 January) and days (on Monday), not years.",
            ],
            tip: "IN + year (in 1981, in 2024). ON + date (on 1 April). AT + time (at 3pm).",
          },
        },
        {
          id: "SHP-T2WA-2024-B-P1-Q10",
          questionNumber: 10,
          marks: 1,
          question: "Named (10)________ Miss Joaquim, the person who first discovered it…",
          answer: "(A) after",
          solution: {
            method: "Fixed phrase — 'named after'",
            steps: [
              "'Named after' is a fixed phrase in English meaning 'given the name of (someone/something)'.",
              "The orchid was given the name 'Miss Joaquim' in honour of Miss Joaquim who discovered it.",
              "'Named after Miss Joaquim' = the name comes FROM Miss Joaquim.",
              "(F) 'with' / (D) 'in' / other options do not form the idiom 'named ___'.",
            ],
            tip: "'Named after' is a fixed phrase. X is named AFTER Y = X was given Y's name as an honour.",
          },
        },
        {
          id: "SHP-T2WA-2024-B-P1-Q11",
          questionNumber: 11,
          marks: 1,
          question: "Lots of fertilisers are required (11)________ it to bloom well…",
          answer: "(C) for",
          solution: {
            method: "Preposition of purpose — 'required for'",
            steps: [
              "'Required for' is the correct collocation: something is required FOR a purpose.",
              "Fertilisers are required FOR it (the orchid) to bloom well — purpose/benefit.",
              "(F) 'with' would change the meaning: 'required with it' doesn't express purpose.",
              "(A) 'after' is a time preposition, not purpose.",
            ],
            tip: "Required FOR [purpose/person]. Pattern: fertilisers are required FOR [the plant] to bloom.",
          },
        },
        {
          id: "SHP-T2WA-2024-B-P1-Q12",
          questionNumber: 12,
          marks: 1,
          question: "…up to twelve flowers can grow (12)________ each main branch of the plant.",
          answer: "(E) on",
          solution: {
            method: "Preposition of position — attached to a surface",
            steps: [
              "Flowers grow ON branches — they are attached to and grow from the surface of branches.",
              "'On' is used for surfaces and things attached to surfaces.",
              "(D) 'in' = inside/within something — flowers don't grow inside branches.",
              "(B) 'between' = in the space separating two things — doesn't fit here.",
            ],
            tip: "Flowers grow ON branches (attached to surface). Fruits grow ON trees. Use ON for things attached to surfaces.",
          },
        },
      ],
    },

    {
      kind: "B",
      id: "SHP-T2WA-2024-B-PASS2",
      topic: "GrammarCloze",
      title: "Section B: Grammar Cloze – Passage 2 (Q13–16, 4 marks)",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. USE A WORD ONCE ONLY.",
      wordBox: [
        "(A) he", "(B) it", "(C) she",
        "(D) they", "(E) we", "(F) you",
      ],
      passage:
        "A princess met a dragon in the forest. (13)________ asked for help to find its missing treasure. \"Can (14)________ help me find my chest of gold, please?\" it begged.\n\nThe kind princess agreed immediately. (15)________ set off after waving goodbye to the dragon. On her journey, she made friends with the forest animals and (16)________ guided her to a cave. There, she finally found the dragon's lost treasure!",
      questions: [
        {
          id: "SHP-T2WA-2024-B-P2-Q13",
          questionNumber: 13,
          marks: 1,
          question: "A princess met a dragon in the forest. (13)________ asked for help to find its missing treasure.",
          answer: "(B) it",
          solution: {
            method: "Pronoun reference — the dragon (non-human)",
            steps: [
              "The subject of the second sentence is the dragon — the one asking for help.",
              "Dragons are non-human creatures → use 'it' (not he/she).",
              "Evidence: 'its missing treasure' also uses 'its' confirming the dragon is 'it'.",
              "(A) 'he' and (C) 'she' are for people.",
            ],
            tip: "Non-human creatures (dragon, dog, cat) = 'it' unless the passage treats them as gendered characters.",
          },
        },
        {
          id: "SHP-T2WA-2024-B-P2-Q14",
          questionNumber: 14,
          marks: 1,
          question: '"Can (14)________ help me find my chest of gold, please?" it begged.',
          answer: "(F) you",
          solution: {
            method: "Pronoun — direct address in question",
            steps: [
              "The dragon is asking the princess to help it — speaking directly to her.",
              "When asking someone directly to do something, use 'you': 'Can you help me?'",
              "(C) 'she' would be talking ABOUT the princess to a third party, not TO her.",
              "'Can you help me?' is the standard question form when speaking to someone.",
            ],
            tip: "'Can you help me?' = speaking directly to the listener. Use YOU when addressing the person directly.",
          },
        },
        {
          id: "SHP-T2WA-2024-B-P2-Q15",
          questionNumber: 15,
          marks: 1,
          question: "The kind princess agreed immediately. (15)________ set off after waving goodbye to the dragon.",
          answer: "(C) she",
          solution: {
            method: "Pronoun reference — the princess (female)",
            steps: [
              "The subject of this sentence is 'The kind princess' — a female character.",
              "Third-person singular feminine pronoun = 'she'.",
              "'She set off' correctly replaces 'The kind princess set off'.",
              "(A) 'he' is for male. (B) 'it' is for non-human. (D) 'they' is plural.",
            ],
            tip: "Princess (female, singular) → SHE. Always match pronoun to the antecedent's gender and number.",
          },
        },
        {
          id: "SHP-T2WA-2024-B-P2-Q16",
          questionNumber: 16,
          marks: 1,
          question: "…she made friends with the forest animals and (16)________ guided her to a cave.",
          answer: "(D) they",
          solution: {
            method: "Pronoun reference — the forest animals (plural)",
            steps: [
              "The antecedent is 'the forest animals' — plural.",
              "Third-person plural pronoun = 'they'.",
              "'They guided her to a cave' — the animals collectively guided the princess.",
              "(C) 'she' is singular/female — refers to the princess, not the animals.",
            ],
            tip: "Forest animals (plural, group) → THEY. Multiple animals doing something together = they.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION C: COMPREHENSION (Q17–24, 10 marks)
    // Passage: The Ant and the Bird (adapted from www.moralstories.org)
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "SHP-T2WA-2024-C-COMPREHENSION",
      topic: "ComprehensionOE",
      title: "Section C: Comprehension (10 marks, Q17–24)",
      instructions:
        "Read this passage carefully and answer questions 17 to 24.",
      passage:
        "An ant was searching for some water on a hot and humid day. After crawling around for hours, it came to a lake. The ant stood dangerously at the edge of the lake, trying to get a sip of water. However, a strong wind suddenly blew, causing the ant to lose its balance and it fell into the lake.\n\nThe ant yelled as loudly as it could, \"Please! Can somebody help me?\" A bird perched on a nearby tree heard the drowning ant's cries. Without hesitation, the bird plucked a leaf with its beak and dropped it into the water near the ant. The ant struggled towards the leaf and climbed to safety. Soon, the leaf drifted to the shore and the ant jumped off it.\n\nJust before the ant could thank the bird for saving its life, a man came along. He was about to cast his net to trap the bird when the ant quickly bit him on the ankle. Feeling the pain, the man dropped the net and clutched his ankle. The bird took the opportunity to fly away. The two animals became best friends after that day.\n\nadapted from www.moralstories.org",
      questions: [
        {
          id: "SHP-T2WA-2024-C-Q17",
          questionNumber: 17,
          marks: 1,
          question:
            "Tick ✓ your chosen answer.\nThe ant crawled around for hours because it was ________.\n\n[ ] looking for water\n[ ] a hot and humid day\n[ ] going to meet the bird",
          options: [
            "looking for water",
            "a hot and humid day",
            "going to meet the bird",
          ],
          answer: "looking for water",
          solution: {
            method: "Literal comprehension — WHY question",
            steps: [
              "Find the reason the ant crawled around: 'An ant was searching for some water on a hot and humid day.'",
              "The ant crawled because it was SEARCHING FOR WATER — looking for water.",
              "Option 2 ('a hot and humid day') is the weather condition, not the reason the ant crawled.",
              "Option 3 ('going to meet the bird') is wrong — they meet by chance, not by plan.",
            ],
            tip: "The question asks WHY it crawled (cause/purpose) — not the weather. 'Searching for water' = looking for water.",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q18",
          questionNumber: 18,
          marks: 1,
          question:
            "True or False? The strong wind caused the ant to fall into the lake. (Refer to lines 1 to 9)",
          answer: "True",
          solution: {
            method: "True/False — literal check from passage",
            steps: [
              "Paragraph 1: 'a strong wind suddenly blew, causing the ant to lose its balance and it fell into the lake.'",
              "The strong wind directly caused the ant to fall in.",
              "Statement is TRUE.",
            ],
            tip: "The word 'causing' links the wind directly to the fall — clear cause and effect. TRUE.",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q19",
          questionNumber: 19,
          marks: 1,
          question:
            "True or False? The bird decided to save the ant immediately after hearing its cries. (Refer to lines 1 to 9)",
          answer: "True",
          solution: {
            method: "True/False — inference from 'without hesitation'",
            steps: [
              "'Without hesitation, the bird plucked a leaf with its beak and dropped it into the water near the ant.'",
              "'Without hesitation' = immediately, without delay.",
              "The bird acted at once after hearing the ant — statement is TRUE.",
            ],
            tip: "'Without hesitation' = immediately. The bird did not wait or think — it acted right away.",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q20",
          questionNumber: 20,
          marks: 1,
          question:
            "Which word from paragraph 2 shows that it was not easy for the ant to get to the leaf?",
          answer: "struggled",
          solution: {
            method: "Vocabulary extraction — word showing difficulty",
            steps: [
              "Locate paragraph 2: 'The ant struggled towards the leaf and climbed to safety.'",
              "'Struggled' means to make a great effort, especially against difficulty — not easy.",
              "This word shows it was hard for the ant to reach the leaf.",
            ],
            tip: "'Struggled' = had difficulty, made great effort. It shows something was NOT EASY.",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q21",
          questionNumber: 21,
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story.\n\n[ ] The bird dropped a leaf into the water.\n[ ] The ant and the bird became friends.\n[ ] The man wanted to catch the bird.",
          answer: "1 (bird dropped leaf), 3 (ant and bird became friends), 2 (man wanted to catch bird)",
          solution: {
            method: "Sequencing — story order across paragraphs",
            steps: [
              "Event A — Bird dropped leaf: paragraph 2 — 'the bird plucked a leaf… and dropped it into the water near the ant.' → FIRST (1).",
              "Event B — Man wanted to catch the bird: paragraph 3 — 'He was about to cast his net to trap the bird…' → SECOND (2).",
              "Event C — Ant and bird became friends: paragraph 3 end — 'The two animals became best friends after that day.' → LAST (3).",
              "Order: Dropped leaf (1) → Man tried to catch bird (2) → Became friends (3).",
            ],
            tip: "Follow the events across paragraphs in order. 'After that day' signals the final outcome.",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q22",
          questionNumber: 22,
          marks: 2,
          question:
            "Tick ✓ two words that best describe the bird.\n\n[ ] loyal\n[ ] polite\n[ ] clever\n[ ] helpful\n[ ] generous",
          options: ["loyal", "polite", "clever", "helpful", "generous"],
          answer: "clever and helpful",
          solution: {
            method: "Character inference — two descriptors",
            steps: [
              "Evidence for HELPFUL: The bird helped the ant without hesitation by dropping a leaf → it is helpful.",
              "Evidence for CLEVER: The bird 'took the opportunity to fly away' when the man dropped his net — it was smart enough to use the moment to escape → clever.",
              "'Loyal' — there is no evidence the bird stayed faithful to someone over time.",
              "'Polite' — no evidence of polite behaviour (saying please/thank you).",
              "'Generous' — close, but 'clever' is better supported by the escape scene.",
            ],
            tip: "Look for TWO traits with EVIDENCE from the story. Helpful (saved ant) + Clever (escaped the net).",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q23",
          questionNumber: 23,
          marks: 1,
          question: "Why did the man drop the net?",
          answer: "The ant bit him (on the ankle) / Because the ant bit him on the ankle.",
          solution: {
            method: "Literal comprehension — cause and effect",
            steps: [
              "Locate the reason the man dropped the net: 'the ant quickly bit him on the ankle. Feeling the pain, the man dropped the net and clutched his ankle.'",
              "Cause: the ant bit him on the ankle.",
              "Effect: the pain caused him to drop the net.",
              "Answer: The ant bit him on the ankle (causing pain), so he dropped the net.",
            ],
            tip: "Look for 'because' or 'feeling the pain' — these signal cause. The ant bit him → pain → dropped net.",
          },
        },
        {
          id: "SHP-T2WA-2024-C-Q24",
          questionNumber: 24,
          marks: 2,
          question:
            "(a) Tick ✓ your chosen answer.\nThe lesson you can learn from the story is ________.\n\n[ ] determination leads to great things\n[ ] teamwork can overcome challenges\n[ ] kindness will be rewarded in the end\n\n(b) How do you know? Explain your answer in part (a) by stating the evidence from the story.",
          answer:
            "(a) kindness will be rewarded in the end\n(b) The bird was kind and saved the ant by dropping a leaf. When the man tried to trap the bird, the ant repaid the bird's kindness by biting the man and saving the bird.",
          solution: {
            method: "Inference — moral/theme + evidence",
            steps: [
              "(a) The story is about one act of kindness (bird saves ant) being returned (ant saves bird) → 'kindness will be rewarded in the end'.",
              "'Determination' — no evidence of determination as the main theme.",
              "'Teamwork' — they help each other, but the core message is about returning kindness.",
              "(b) Evidence: Bird was kind → saved the drowning ant. Later → ant bit the man to save the bird. The bird's initial kindness was rewarded when the ant saved it.",
            ],
            tip: "For moral/lesson questions: the moral is shown through what happens at the END. Kindness returned = kindness rewarded.",
          },
        },
      ],
    },
  ],
};

export default paper;
