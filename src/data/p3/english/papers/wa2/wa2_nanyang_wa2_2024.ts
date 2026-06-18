// ============================================================
// NANYANG PRIMARY SCHOOL
// TERM 2 WEIGHTED ASSESSMENT 2 (WA2)
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
  term: "Term 2 Weighted Assessment 2 (WA2)",
  year: 2024,
  totalMarks: 20,
  duration: "40 minutes",
  questions: [

    // ══════════════════════════════════════════════════
    // SECTION A: GRAMMAR MCQ (Q1–3, 3 marks)
    // ══════════════════════════════════════════════════

    {
      kind: "A",
      id: "NYP-WA2-A-Q1",
      topic: "GrammarMCQ",
      marks: 1,
      question: "________ girl sitting over there has the most beautiful smile.\n(1) This\n(2) That\n(3) These\n(4) Those",
      options: ["This", "That", "These", "Those"],
      answer: "(2) That",
      solution: {
        method: "Demonstrative adjective — singular noun, far distance",
        steps: [
          "The noun 'girl' is singular.",
          "For singular nouns: use 'this' (near) or 'that' (far).",
          "'Over there' indicates the girl is FAR AWAY from the speaker.",
          "Far + singular → 'That'. Full sentence: 'That girl sitting over there…'",
          "(3) 'These' and (4) 'Those' are for plural nouns. (1) 'This' is near, not far.",
        ],
        tip: "Singular + Near = This. Singular + Far = That. Plural + Near = These. Plural + Far = Those.",
      },
    },

    {
      kind: "A",
      id: "NYP-WA2-A-Q2",
      topic: "GrammarMCQ",
      marks: 1,
      question: "The postman usually ________ letters to the residents in the evening.\n(1) deliver\n(2) delivers\n(3) delivered\n(4) delivering",
      options: ["deliver", "delivers", "delivered", "delivering"],
      answer: "(2) delivers",
      solution: {
        method: "Subject-verb agreement + simple present (habitual action)",
        steps: [
          "The subject is 'The postman' — singular (one person).",
          "The adverb 'usually' signals a habitual/routine action → simple present tense.",
          "Simple present with singular subject: add -s → 'delivers'.",
          "(1) 'deliver' is base form (no -s) — used for plural subjects (they deliver).",
          "(3) 'delivered' is past tense. (4) 'delivering' needs an auxiliary (is delivering).",
        ],
        tip: "Singular subject + habitual action = verb + s. The postman delivers (not deliver).",
      },
    },

    {
      kind: "A",
      id: "NYP-WA2-A-Q3",
      topic: "GrammarMCQ",
      marks: 1,
      question: "There are not ________ girls who are interested in football.\n(1) few\n(2) little\n(3) many\n(4) much",
      options: ["few", "little", "many", "much"],
      answer: "(3) many",
      solution: {
        method: "Quantifier — countable plural noun in negative sentence",
        steps: [
          "'Girls' is a countable plural noun.",
          "For countable plural nouns in negative/question sentences → use 'many'.",
          "'There are not many girls…' is correct.",
          "(4) 'much' is for uncountable nouns (not much water, not much time).",
          "(1) 'few' = small number — used in positive statements: 'There are few girls…'",
          "(2) 'little' is for uncountable nouns in positive statements.",
        ],
        tip: "Countable plural + negative = NOT MANY. Uncountable + negative = NOT MUCH.",
      },
    },

    // ══════════════════════════════════════════════════
    // SECTION B: VOCABULARY MCQ (Q4–6, 3 marks)
    // ══════════════════════════════════════════════════

    {
      kind: "A",
      id: "NYP-WA2-B-Q4",
      topic: "VocabMCQ",
      marks: 1,
      question: "When I touched the cactus, the tiny ________ poked my fingers.\n(1) tusks\n(2) warts\n(3) prickles\n(4) whiskers",
      options: ["tusks", "warts", "prickles", "whiskers"],
      answer: "(3) prickles",
      solution: {
        method: "Vocabulary — word meaning in context",
        steps: [
          "A cactus has sharp, pointed spines on its surface.",
          "'Prickles' = small sharp points on a plant that can poke/sting you — exactly describes cactus spines.",
          "(1) 'tusks' = large ivory teeth on elephants — not on plants.",
          "(2) 'warts' = small bumpy growths on skin — not on cacti.",
          "(4) 'whiskers' = long hairs on animals' faces — not plant features.",
        ],
        tip: "Cactus → spines → PRICKLES. Remember: plants have prickles/thorns; animals have tusks/whiskers.",
      },
    },

    {
      kind: "A",
      id: "NYP-WA2-B-Q5",
      topic: "VocabMCQ",
      marks: 1,
      question: "He ________ the door open, startling his sister who was just standing behind it.\n(1) jiggled\n(2) wiggled\n(3) prodded\n(4) wrenched",
      options: ["jiggled", "wiggled", "prodded", "wrenched"],
      answer: "(4) wrenched",
      solution: {
        method: "Vocabulary — precise action verb",
        steps: [
          "The action startled someone standing behind the door — this suggests a sudden, forceful movement.",
          "'Wrenched' = pulled or twisted with great force suddenly — fits a door being thrown open violently.",
          "(1) 'jiggled' = moved up and down or back and forth slightly — too gentle.",
          "(2) 'wiggled' = moved with small, rapid side-to-side movements — too gentle for a startling action.",
          "(3) 'prodded' = poked with a finger or stick — not an action you do to a door.",
        ],
        tip: "'Wrenched' implies sudden force. The clue is 'startling his sister' — a gentle action wouldn't startle someone.",
      },
    },

    {
      kind: "A",
      id: "NYP-WA2-B-Q6",
      topic: "VocabMCQ",
      marks: 1,
      question: "When they cornered the wild boar and blocked it from escaping, it growled and became ________.\n(1) as fierce as a lion\n(2) as hungry as a bear\n(3) as timid as a mouse\n(4) as proud as a peacock",
      options: [
        "as fierce as a lion",
        "as hungry as a bear",
        "as timid as a mouse",
        "as proud as a peacock",
      ],
      answer: "(1) as fierce as a lion",
      solution: {
        method: "Simile selection — context clues",
        steps: [
          "The wild boar was cornered, could not escape, and GROWLED → it became aggressive and dangerous.",
          "'As fierce as a lion' = extremely aggressive and dangerous — matches growling when cornered.",
          "(2) 'as hungry as a bear' = very hungry — no mention of hunger in context.",
          "(3) 'as timid as a mouse' = very shy/afraid — opposite of growling when cornered.",
          "(4) 'as proud as a peacock' = very vain/proud — not relevant to a cornered animal growling.",
        ],
        tip: "Cornered + growling = aggressive/fierce. Match the animal behaviour to the appropriate simile.",
      },
    },

    // ══════════════════════════════════════════════════
    // SECTION C: GRAMMAR CLOZE (Q7–9, 3 marks)
    // Passage: Ali's Soccer Match
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "NYP-WA2-C-CLOZE",
      topic: "GrammarCloze",
      title: "Section C: Grammar Cloze (3 marks, Q7–9)",
      instructions:
        "There are 3 blanks, numbered 7 to 9 in the passage below. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. Use each word once only.",
      wordBox: ["(A) I", "(B) he", "(C) we", "(D) she", "(E) you", "(F) they"],
      passage:
        "Ali plays soccer for the school team. (7) ________ asked Mary and Raju to come and watch him play in a match next Monday.\n\n(8) ________ both agreed and went to the match. It was held at the sports stadium near their school. Mary was excited as (9) ________ had never been to a soccer match before.\n\nAfter the match, the three friends went to a fast food restaurant to celebrate.",
      questions: [
        {
          id: "NYP-WA2-C-Q7",
          questionNumber: 7,
          marks: 1,
          question: "(7) ________ asked Mary and Raju to come and watch him play in a match next Monday.",
          answer: "(B) he",
          solution: {
            method: "Pronoun reference — Ali (singular male)",
            steps: [
              "The subject of this sentence is Ali, already introduced in the previous sentence.",
              "Ali is a single male — replace with third-person singular masculine pronoun 'he'.",
              "'He asked Mary and Raju…' correctly continues the narrative about Ali.",
            ],
            tip: "Ali (male, singular) → he. The subject of the sentence is the one doing the asking.",
          },
        },
        {
          id: "NYP-WA2-C-Q8",
          questionNumber: 8,
          marks: 1,
          question: "(8) ________ both agreed and went to the match.",
          answer: "(F) they",
          solution: {
            method: "Pronoun reference — Mary and Raju (plural)",
            steps: [
              "The antecedent is 'Mary and Raju' — two people.",
              "Two people together = plural → use 'they'.",
              "'They both agreed' correctly refers to both Mary and Raju going to the match.",
            ],
            tip: "Two or more people = 'they'. The word 'both' confirms there are two subjects.",
          },
        },
        {
          id: "NYP-WA2-C-Q9",
          questionNumber: 9,
          marks: 1,
          question: "Mary was excited as (9) ________ had never been to a soccer match before.",
          answer: "(D) she",
          solution: {
            method: "Pronoun reference — Mary (singular female)",
            steps: [
              "The subject of this clause is Mary — a single female.",
              "Third-person singular feminine pronoun = 'she'.",
              "'Mary was excited as she had never been to a soccer match before.'",
            ],
            tip: "Mary (female, singular) → she. Match the gender and number of the antecedent.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION D: EDITING FOR SPELLING (Q10–12, 3 marks)
    // Passage: About Owls
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "NYP-WA2-D-EDITING",
      topic: "Editing",
      title: "Section D: Editing for Spelling (3 marks, Q10–12)",
      instructions:
        "Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.",
      passage:
        "Have you ever heard a hoot at night? This may be the call of an owl looking for its dinner.\n\nOwls have an acute sense of hearing. This helps them to find small (10) creachers in the dark. As the owls fly, they look straight down so that they can search and listen for their prey. They eat mice, frogs, snakes and small birds.\n\n(11) Sumtimes, they eat (12) inseks such as beetles and grasshoppers.\n\nIf you ever get to see an owl in action, you will find that it is an amazing animal. Unfortunately, it is hard to spot one in Singapore.",
      questions: [
        {
          id: "NYP-WA2-D-Q10",
          questionNumber: 10,
          marks: 1,
          question: "Small (10) creachers → correct spelling?",
          answer: "creatures",
          solution: {
            method: "Correct spelling — 'creatures'",
            steps: [
              "Misspelled: 'creachers'. The error is in the suffix: '-achers' instead of '-atures'.",
              "Correct spelling: c-r-e-a-t-u-r-e-s → CREATURES.",
              "'Creatures' = living beings/animals. Root word: 'create' → creature.",
              "Note: 'creature' has the same root as 'create' — it means something that was created.",
            ],
            tip: "CREATURES: cre-a-tures. Think of 'create' → creature → creatures.",
          },
        },
        {
          id: "NYP-WA2-D-Q11",
          questionNumber: 11,
          marks: 1,
          question: "(11) Sumtimes → correct spelling?",
          answer: "Sometimes",
          solution: {
            method: "Correct spelling — 'sometimes'",
            steps: [
              "Misspelled: 'Sumtimes'. The error is 'Sum' instead of 'Some'.",
              "Correct spelling: S-o-m-e-t-i-m-e-s → SOMETIMES.",
              "Break it down: some + times = sometimes.",
              "Remember: 'some' (s-o-m-e) not 'sum' (which means a mathematical total).",
            ],
            tip: "SOMETIMES = some + times. 'Some' has an 'o' in it. 'Sum' means a total number — completely different word.",
          },
        },
        {
          id: "NYP-WA2-D-Q12",
          questionNumber: 12,
          marks: 1,
          question: "(12) inseks → correct spelling?",
          answer: "insects",
          solution: {
            method: "Correct spelling — 'insects'",
            steps: [
              "Misspelled: 'inseks'. Two errors: 'eks' instead of 'ects' (missing the 'ct').",
              "Correct spelling: i-n-s-e-c-t-s → INSECTS.",
              "Break it down: in-sect-s. 'Sect' contains the 'ct' cluster.",
              "Insects = small animals with 6 legs (beetles, grasshoppers, ants).",
            ],
            tip: "INSECTS: in-SECTS. The 'ct' blend is important — in-sect-s not in-sek-s.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION E: COMPREHENSION (Q13–19, 8 marks)
    // Passage: Madam Ng Moey Chye – Samsui Woman
    // (Adapted from Conversations with Six Pioneering Tradesmen, National Heritage Board)
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "NYP-WA2-E-COMPREHENSION",
      topic: "ComprehensionOE",
      title: "Section E: Comprehension (8 marks, Q13–19)",
      instructions: "Read this passage and answer questions 13 to 19.",
      passage:
        "Madam Ng Moey Chye's job was to carry bricks at a construction site. She would wake up at dawn and walk from her home at Chinatown to Collyer Quay where she worked. Her job was hard and tiring but it was the only work she could do.\n\nMadam Ng was born in Singapore in 1932. She was adopted when she was young and her adoptive parents never sent her to school. As an adult, Madam Ng could not find a job. She decided to work as a Samsui woman.\n\nLike most Samsui women in Singapore in the past, Madam Ng did not get married. She was beyond the ideal age of marriage by the time she started work. She supported herself by working at construction sites. She also wore a bright red headscarf or 'hong toujin'.\n\nToday, at 85 years old, Madam Ng is retired and lives in a flat in Redhill. She is still healthy and cheerful, and does not let her age slow her down. She earns money by selling used cardboard that she collects from the neighbourhood.\n\nOnce a week, she goes to the Apex Club of Singapore where she receives a food package. She is grateful to the young volunteers there. Although she lives a simple life now, she chooses to see the brighter side of her situation. She feels fortunate that she is still in good health.\n\nAdapted from Conversations with Six Pioneering Tradesmen, National Heritage Board.",
      questions: [
        {
          id: "NYP-WA2-E-Q13",
          questionNumber: 13,
          marks: 1,
          question:
            "The place where Madam Ng used to work at was ________.\n1) Redhill\n2) Chinatown\n3) Apex Club\n4) Collyer Quay",
          options: ["Redhill", "Chinatown", "Apex Club", "Collyer Quay"],
          answer: "(4) Collyer Quay",
          solution: {
            method: "Literal comprehension — location",
            steps: [
              "Locate paragraph 1: 'She would wake up at dawn and walk from her home at Chinatown to Collyer Quay where she worked.'",
              "'Where she worked' = Collyer Quay.",
              "Chinatown is where she LIVED, not where she worked.",
              "Redhill is where she lives NOW (retired). Apex Club is where she goes weekly for food.",
            ],
            tip: "Distinguish between where she LIVED (Chinatown), where she WORKED (Collyer Quay), and where she lives NOW (Redhill).",
          },
        },
        {
          id: "NYP-WA2-E-Q14",
          questionNumber: 14,
          marks: 2,
          question:
            "Using information from Paragraph 2, complete the sentences that tell you why Madam Ng had to work as a Samsui woman even though the job was hard and tiring.\n\na) Her adoptive parents _______________________________\nb) She could _______________________________",
          answer:
            "a) Her adoptive parents never sent Madam Ng to school.\nb) She could not find a job (as an adult).",
          solution: {
            method: "Cause and effect — paragraph 2",
            steps: [
              "Paragraph 2: 'her adoptive parents never sent her to school. As an adult, Madam Ng could not find a job. She decided to work as a Samsui woman.'",
              "Cause 1: Adoptive parents never sent her to school → no education.",
              "Cause 2: As an adult, could not find a job → led her to become a Samsui woman.",
              "a) Her adoptive parents never sent Madam Ng to school.",
              "b) She could not find a job.",
            ],
            tip: "Chain of causes: no school → no qualifications → could not find a job → became Samsui woman.",
          },
        },
        {
          id: "NYP-WA2-E-Q15",
          questionNumber: 15,
          marks: 1,
          question:
            "Which word has the same meaning as 'past'? Circle either (A) or (B).\n\nShe was (A) beyond the (B) ideal age of marriage by the time she started work.",
          answer: "(A) beyond",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "'Past' in this context means 'after a certain point/age' — having gone beyond something.",
              "'Beyond' = past/further than — used to mean she was older than the typical marriage age.",
              "(B) 'ideal' = perfect/best — this means the best age for marriage, not the same as 'past'.",
              "Therefore circle (A) beyond.",
            ],
            tip: "'Beyond the age of marriage' = past the typical age for marriage. Beyond = past (in the sense of 'further than a point').",
          },
        },
        {
          id: "NYP-WA2-E-Q16",
          questionNumber: 16,
          marks: 1,
          question:
            "From paragraph 4, pick out an 8-word phrase that tells you that Madam Ng is still active despite her old age.",
          answer: "does not let her age slow her down",
          solution: {
            method: "Phrase extraction — count words carefully",
            steps: [
              "Locate paragraph 4: 'She is still healthy and cheerful, and does not let her age slow her down.'",
              "The phrase about being active despite old age: 'does not let her age slow her down'.",
              "Count: does(1) not(2) let(3) her(4) age(5) slow(6) her(7) down(8) = exactly 8 words.",
            ],
            tip: "Count every word carefully including 'not', 'her', 'her'. The 8-word phrase starts with 'does'.",
          },
        },
        {
          id: "NYP-WA2-E-Q17",
          questionNumber: 17,
          marks: 1,
          question:
            "Write 1, 2 and 3 in the boxes provided to show what happened first, next and last in the story.\n\n[ ] Madam Ng was adopted.\n[ ] Madam Ng moved to a flat in Redhill.\n[ ] Madam Ng worked at construction sites.",
          answer:
            "Madam Ng was adopted = 1 (first)\nMadam Ng worked at construction sites = 2 (next)\nMadam Ng moved to a flat in Redhill = 3 (last)",
          solution: {
            method: "Sequencing — life events in order",
            steps: [
              "Event A — Adopted: 'She was adopted when she was young' (paragraph 2) → FIRST (1).",
              "Event B — Worked at construction sites: 'She supported herself by working at construction sites' (paragraph 3) → adult life → SECOND (2).",
              "Event C — Moved to Redhill: 'Today, at 85 years old, Madam Ng is retired and lives in a flat in Redhill' (paragraph 4) → NOW/present → LAST (3).",
            ],
            tip: "Follow her life timeline: childhood (adopted) → adult working life → now (retired in Redhill).",
          },
        },
        {
          id: "NYP-WA2-E-Q18",
          questionNumber: 18,
          marks: 1,
          question:
            "True or False? Madam Ng still supports herself after retirement.",
          answer: "True",
          solution: {
            method: "True/False — inference from paragraph 4",
            steps: [
              "Paragraph 4: 'She earns money by selling used cardboard that she collects from the neighbourhood.'",
              "'Earns money' after retirement = she still supports herself financially.",
              "Statement is TRUE.",
            ],
            tip: "Supporting herself = earning her own money. She sells cardboard = earns money = self-supporting even after retirement.",
          },
        },
        {
          id: "NYP-WA2-E-Q19",
          questionNumber: 19,
          marks: 1,
          question:
            "True or False? Madam Ng is a volunteer at the Apex Club.",
          answer: "False",
          solution: {
            method: "True/False — careful reading",
            steps: [
              "Paragraph 5: 'Once a week, she goes to the Apex Club of Singapore where she receives a food package. She is grateful to the young volunteers there.'",
              "Madam Ng RECEIVES a food package from the Apex Club — she is a RECIPIENT, not a volunteer.",
              "The volunteers are described as 'young volunteers' who give out food — not Madam Ng.",
              "Statement is FALSE.",
            ],
            tip: "She receives a food package = she is helped BY volunteers, not the volunteer herself.",
          },
        },
      ],
    },
  ],
};

export default paper;
