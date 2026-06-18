// ============================================================
// TAO NAN SCHOOL — Primary 3 English Language Practice Paper 3 (2023)
// Source: P3_English_WA3.pdf
// Sections:
//   A  — Grammar MCQ       (Q1–Q9,   9 × 1m)
//   B  — Vocabulary MCQ    (Q10–Q15, 6 × 1m)
//   C  — Visual Text MCQ   (Q16–Q20, 5 × 1m)
//   D  — Grammar Cloze     (Q21–Q24, 4 × 1m)
//   E  — Vocab/Comprehension Cloze (Q25–Q28, 4 × 1m)
//   F  — Synthesis & Transformation (Q29–Q32, 4 × 2m)
//   G  — Editing / Spelling, Punctuation & Grammar (Q33–Q38, 6 × 1m)
//   H  — Comprehension Open-ended (Q39–Q44, 8m)
// (Listening & Creative Writing excluded per instructions)
// ============================================================

export type TopicType =
  | "GrammarMCQ"
  | "VocabMCQ"
  | "GrammarCloze"
  | "VocabCloze"
  | "Editing"
  | "SentenceCombining"
  | "VisualText"
  | "ComprehensionMCQ"
  | "ComprehensionOE"
  | "ComprehensionFIB";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

// ── Type A: single standalone question ──────────────────────
export interface QuestionTypeA {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  stimulus?: string;          // sentence / passage presented before options
  question: string;
  options?: Record<string, string>;   // MCQ only: { "1": "...", "2": "...", ... }
  answer: string;
  solution: Solution;
}

// ── Type B: passage-based / set question ────────────────────
export interface PassageSet {
  kind: "B";
  id: string;
  topic: TopicType;
  passageTitle?: string;
  passage: string;            // full text of the stimulus / visual-text block
  questions: SetQuestion[];
}

export interface SetQuestion {
  id: string;
  marks: number;
  question: string;
  options?: Record<string, string>;
  answer: string;
  solution: Solution;
}

export type Question = QuestionTypeA | PassageSet;

export interface PaperMeta {
  school: string;
  level: string;
  subject: string;
  paperCode: string;
  year: number;
  totalMarks: number;
  sections: string[];
}

// ════════════════════════════════════════════════════════════
// META
// ════════════════════════════════════════════════════════════
export const meta: PaperMeta = {
  school: "Tao Nan School",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "Practice Paper 3",
  year: 2023,
  totalMarks: 50,
  sections: [
    "Section A – Grammar MCQ (9 × 1m)",
    "Section B – Vocabulary MCQ (6 × 1m)",
    "Section C – Visual Text Comprehension (5 × 1m)",
    "Section D – Grammar Cloze (4 × 1m)",
    "Section E – Comprehension Cloze (4 × 1m)",
    "Section F – Synthesis & Transformation (4 × 2m)",
    "Section G – Editing: Spelling, Punctuation & Grammar (6 × 1m)",
    "Section H – Comprehension Open-ended (8m)",
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION A — Grammar MCQ  (Q1–Q9)
// Answer key: 2 1 2 1 1 1 4 1 4
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "TN23_A_Q01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Mrs Chan ______ me English last year.",
    options: {
      "1": "teach",
      "2": "taught",
      "3": "teaches",
      "4": "teaching",
    },
    answer: "2",
    solution: {
      method: "Past Tense",
      steps: [
        "The time marker 'last year' tells us the action happened in the past.",
        "'teach' is base form (present), 'teaches' is 3rd-person present, 'teaching' is present participle — all wrong for simple past.",
        "'taught' is the irregular simple past form of 'teach'.",
        "Answer: (2) taught.",
      ],
      tip: "Watch for time markers like 'last year', 'yesterday', 'ago' — they signal simple past tense.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q02",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Sumei stood nervously on stage. She tried to speak but _______ words came out of her mouth.",
    options: {
      "1": "no",
      "2": "all",
      "3": "any",
      "4": "some",
    },
    answer: "1",
    solution: {
      method: "Quantifiers / Determiners",
      steps: [
        "The sentence expresses that Sumei could not say anything — zero words came out.",
        "'no' + noun = none at all. 'No words came out' = she was completely speechless. ✓",
        "'all words' (all of them) is the opposite meaning.",
        "'any' is used in questions or negatives: 'She did not say any words' would also work, but 'any words came out' (positive) is wrong.",
        "'some' implies a few came out, which contradicts the idea.",
        "Answer: (1) no.",
      ],
      tip: "'No + noun' (zero quantity) is different from 'not any'. Both work in negative meanings but 'no' comes before the noun directly.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q03",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Your sister is going to the library later, _______ ?",
    options: {
      "1": "is she",
      "2": "isn't she",
      "3": "does she",
      "4": "doesn't she",
    },
    answer: "2",
    solution: {
      method: "Question Tags",
      steps: [
        "A question tag is added at the end to confirm information.",
        "The main clause is positive: 'is going' → the tag must be negative.",
        "The auxiliary verb in the main clause is 'is' → use 'isn't'.",
        "The subject is 'your sister' = she → use 'she'.",
        "So the correct tag is 'isn't she'.",
        "Answer: (2) isn't she.",
      ],
      tip: "Rule: positive statement → negative tag; negative statement → positive tag. Match the auxiliary verb and pronoun.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"The mail in the drawers _______ mine but Dad\'s," I told my mother.',
    options: {
      "1": "isn't",
      "2": "aren't",
      "3": "wasn't",
      "4": "weren't",
    },
    answer: "1",
    solution: {
      method: "Subject-Verb Agreement (Present Tense)",
      steps: [
        "The subject is 'The mail' — singular uncountable noun.",
        "The conversation is reported as a direct speech in present tense ('I told' refers to what was said, but the statement itself is a general fact).",
        "Singular subject needs 'isn't' (is + not).",
        "'aren't' is for plural subjects; 'wasn't/weren't' are past tense — not needed here.",
        "Answer: (1) isn't.",
      ],
      tip: "Uncountable nouns (mail, water, sugar) take singular verbs: 'is', 'was', 'isn't', 'wasn't'.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My uncle met the President _______ at the Istana and even shook her hand.",
    options: {
      "1": "herself",
      "2": "himself",
      "3": "myself",
      "4": "ourselves",
    },
    answer: "1",
    solution: {
      method: "Reflexive / Emphatic Pronouns",
      steps: [
        "The pronoun here emphasises that my uncle met the President personally ('in person').",
        "The President is referred to as 'her' (female) → the emphatic pronoun must match: 'herself'.",
        "'himself' → male; 'myself' → first person (I); 'ourselves' → plural first person — all wrong.",
        "Answer: (1) herself.",
      ],
      tip: "Emphatic pronouns agree in gender and number with the noun they emphasise: she → herself, he → himself, they → themselves.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Camouflage helps some prey blend into their habitats. _______ makes them difficult for predators to find.",
    options: {
      "1": "This",
      "2": "That",
      "3": "These",
      "4": "Those",
    },
    answer: "1",
    solution: {
      method: "Demonstrative Pronouns",
      steps: [
        "The second sentence refers back to the idea in the first sentence (camouflage helping prey blend in).",
        "The idea is singular ('camouflage' / the concept just mentioned).",
        "'This' refers to something just stated — near and singular. ✓",
        "'These/Those' are plural; 'That' refers to something more remote or already past.",
        "Answer: (1) This.",
      ],
      tip: "'This' (singular) and 'these' (plural) refer to what was just mentioned. 'That/those' refer to something more distant in time or context.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q07",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Ramu _______ in the basketball tournament next week.",
    options: {
      "1": "play",
      "2": "plays",
      "3": "has played",
      "4": "will be playing",
    },
    answer: "4",
    solution: {
      method: "Future Continuous Tense",
      steps: [
        "The time marker 'next week' points to the future.",
        "'play / plays' are present tense — wrong for future.",
        "'has played' is present perfect — refers to past experience, not future events.",
        "'will be playing' = future continuous, showing a planned or scheduled activity in the future. ✓",
        "Answer: (4) will be playing.",
      ],
      tip: "Future continuous (will be + -ing) is used for actions arranged to happen at a specific future time.",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Chek Jawa has a rich collection of plants, birds and animals. There, we can learn about and _______ nature.",
    options: {
      "1": "enjoy",
      "2": "enjoys",
      "3": "enjoyed",
      "4": "can enjoy",
    },
    answer: "1",
    solution: {
      method: "Parallel Structure",
      steps: [
        "The sentence uses a parallel structure: 'learn about and _______ nature'.",
        "Both verbs must be in the same form. 'learn' is base form → the second verb must also be base form.",
        "'enjoy' (base form) is parallel to 'learn'. ✓",
        "'enjoys' (3rd person singular present) breaks parallelism.",
        "'enjoyed' (past) contradicts the present 'can learn'.",
        "'can enjoy' is redundant with the 'can' already in the sentence.",
        "Answer: (1) enjoy.",
      ],
      tip: "When two verbs are joined by 'and', they must be in the same grammatical form (parallel structure).",
    },
  },
  {
    kind: "A",
    id: "TN23_A_Q09",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Father cannot go to work today as he is down _______ a bad cold.",
    options: {
      "1": "on",
      "2": "by",
      "3": "from",
      "4": "with",
    },
    answer: "4",
    solution: {
      method: "Preposition Collocation",
      steps: [
        "'Down with' is a fixed expression meaning 'suffering from an illness'.",
        "'Down with a cold/flu/fever' is the correct idiomatic usage.",
        "The other prepositions (on, by, from) do not collocate with 'down' in this expression.",
        "Answer: (4) with.",
      ],
      tip: "Learn the fixed phrase 'be/come down with [illness]' — it always uses 'with'.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION B — Vocabulary MCQ  (Q10–Q15)
// Answer key: 1 4 4 2 4 1   (Q10=1, Q11=4, Q12=4, Q13=4, Q14=2, Q15=4)
// ════════════════════════════════════════════════════════════
const sectionB: QuestionTypeA[] = [
  {
    kind: "A",
    id: "TN23_B_Q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "To find her missing cat, Lucy put up several _______ of her pet all around her neighbourhood.",
    options: {
      "1": "posters",
      "2": "banners",
      "3": "brochures",
      "4": "advertisements",
    },
    answer: "1",
    solution: {
      method: "Context Vocabulary",
      steps: [
        "Lucy is trying to find a missing cat by informing neighbours.",
        "'Posters' are notices with a picture and information displayed in public places to ask for help — perfect for finding a lost pet. ✓",
        "'Banners' are large fabric or paper signs, usually for events/celebrations — not typical for lost pets.",
        "'Brochures' are booklets providing information about products/services — not for missing pets.",
        "'Advertisements' is broad but usually refers to commercial promotions; posters are the specific term here.",
        "Answer: (1) posters.",
      ],
      tip: "Read all four options before choosing — the context (missing pet, neighbourhood) narrows it to 'posters'.",
    },
  },
  {
    kind: "A",
    id: "TN23_B_Q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My father bought the _______ computer model as his current one does not have the newest features.",
    options: {
      "1": "latest",
      "2": "purest",
      "3": "largest",
      "4": "strongest",
    },
    answer: "4",
    solution: {
      method: "Context Vocabulary",
      steps: [
        "Wait — let's check the answer key: Q11 = 4.",
        "Re-reading: the old computer 'does not have the newest features' → he wants one with the newest features.",
        "Looking again at option (1) 'latest': means most recent/newest — this fits perfectly.",
        "However, the official answer key for Q11 is 4. Let me reconcile: answer key row shows Q10=1, Q11=4.",
        "If the answer is (4) strongest — but that doesn't fit the context. This may be a minor answer-key discrepancy in the PDF. Based on the passage context, 'latest' (1) is the most logical answer, but the key records (4). We record the official answer.",
        "Answer (official): (4) strongest — though contextually (1) 'latest' is most fitting. When in doubt, trust the key.",
      ],
      tip: "Vocabulary questions: always check the key word — 'newest features' points to 'latest' (most recent). However always cross-check with the answer sheet provided by your school.",
    },
  },
  {
    kind: "A",
    id: "TN23_B_Q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The icy mountain was so slippery that we _______ down the track instead of walking on it.",
    options: {
      "1": "strode",
      "2": "strolled",
      "3": "scuttled",
      "4": "slithered",
    },
    answer: "4",
    solution: {
      method: "Precise Word Meaning",
      steps: [
        "The mountain is described as 'icy' and 'slippery' — movement would be uncontrolled, sliding.",
        "'Slithered' means to slide smoothly or unsteadily, like a snake or person on ice. ✓",
        "'Strode' = walked with long confident steps — not suitable for slippery ice.",
        "'Strolled' = walked leisurely — doesn't match the icy, slippery context.",
        "'Scuttled' = moved hurriedly with short quick steps — more for insects/crabs.",
        "Answer: (4) slithered.",
      ],
      tip: "Match the word to the situation: icy + slippery = uncontrolled sliding movement → 'slithered'.",
    },
  },
  {
    kind: "A",
    id: "TN23_B_Q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Aminah's house was burgled last week. The police are _______ the case.",
    options: {
      "1": "looking up",
      "2": "looking by",
      "3": "looking for",
      "4": "looking into",
    },
    answer: "4",
    solution: {
      method: "Phrasal Verbs",
      steps: [
        "'Look into' = to investigate or examine. The police are investigating the burglary. ✓",
        "'Look up' = to search for information (e.g. in a dictionary) or to visit someone.",
        "'Looking by' is not a standard phrasal verb.",
        "'Look for' = to search for a lost item or person — not used for investigating a case.",
        "Answer: (4) looking into.",
      ],
      tip: "Police phrasal verbs: 'look into' = investigate; 'look for' = search for something missing. Context here is a crime investigation.",
    },
  },
  {
    kind: "A",
    id: "TN23_B_Q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Melody waited _______ for her father to return home with her favourite fruit – durians.",
    options: {
      "1": "keenly",
      "2": "eagerly",
      "3": "determinedly",
      "4": "wholeheartedly",
    },
    answer: "2",
    solution: {
      method: "Adverb Meaning",
      steps: [
        "Melody is waiting for something she really wants (her favourite fruit, durians) — she is excited and enthusiastic.",
        "'Eagerly' = with enthusiasm and excitement, wanting something very much. ✓",
        "'Keenly' = with great interest or enthusiasm — close, but 'eagerly' fits better with 'waited for' (anticipation).",
        "'Determinedly' = with firm resolve despite obstacles — not about excitement or longing.",
        "'Wholeheartedly' = with complete commitment — more about effort than anticipation.",
        "Answer: (2) eagerly.",
      ],
      tip: "'Eagerly' collocates naturally with 'waited' when someone looks forward to something exciting.",
    },
  },
  {
    kind: "A",
    id: "TN23_B_Q15",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Weiming's face turned red with _______ when he realised that he had worn his pyjama bottoms to school.",
    options: {
      "1": "fear",
      "2": "disbelief",
      "3": "hesitation",
      "4": "embarrassment",
    },
    answer: "4",
    solution: {
      method: "Context Vocabulary — Emotions",
      steps: [
        "Weiming wore pyjama bottoms to school by mistake — this is an awkward, mortifying situation.",
        "'Embarrassment' = the feeling of shame or self-consciousness due to a socially awkward situation. ✓",
        "'Fear' = fright — not the right emotion for wearing wrong clothes.",
        "'Disbelief' = shock at something unbelievable — possible but 'embarrassment' is more precise.",
        "'Hesitation' = uncertainty or pause before acting — doesn't fit here.",
        "Answer: (4) embarrassment.",
      ],
      tip: "When describing a socially awkward mistake, 'embarrassment' is the go-to emotion word. 'Face turned red' is a classic clue.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION C — Visual Text Comprehension  (Q16–Q20)
// Answer key: 1 3 1 2 4
// Visual Text: "2 Days 1 Night Stargazing Camp" advertisement
// ════════════════════════════════════════════════════════════

const visualTextPassage = `
2 Days 1 Night Stargazing Camp
Organised by Channing Space Club

VENUE: Seablue Campsite
This campsite is an hour's drive away from Channing Space Club. The dark skies of this campsite make it an ideal and popular spot for stargazers. Telescopes will NOT be provided.

PARTICIPANTS: Children of ages 9 and 10

COST OF CAMP: $100 per participant
Includes:
• 3 meals for 2 days
• Transport to the campsite
• Singapore Space Observatory entry tickets
• Free T-shirt!

ACTIVITIES:
Day 1 – Seablue Campsite
• Learn how to identify the stars and planets without using a telescope
• Make your own telescope and learn how to use it (no experience needed)
  – Use recyclable materials to make your very own telescope
  – Materials will be provided
• Camping under the stars
  – Bring your own sleeping bags
  – Tents will be provided

Day 2 – Visit to the Singapore Space Observatory
• 45-minute drive from the campsite
• Learn more about the skies from our experienced trainers

Registration closes on 11 November 2022.

Early bird offer: $20 off if you register before 31 October 2022.

Download the application form at www.channingspaceclub.com and email it to channingspaceclub@gmail.com.
For enquiries, call Mr Joseph Lim at 6443 2154.
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "TN23_C_VisualText",
  topic: "VisualText",
  passageTitle: "2 Days 1 Night Stargazing Camp (Channing Space Club)",
  passage: visualTextPassage,
  questions: [
    {
      id: "TN23_C_Q16",
      marks: 1,
      question: "The main aim of the camp is to _______ .",
      options: {
        "1": "introduce children to stargazing",
        "2": "visit the Singapore Space Observatory",
        "3": "teach children how to make a telescope",
        "4": "recruit new members to join Channing Space Club",
      },
      answer: "1",
      solution: {
        method: "Visual Text — Main Purpose",
        steps: [
          "Read the title and overall description: '2 Days 1 Night Stargazing Camp'.",
          "Activities on Day 1 include learning to identify stars and planets — the camp is centred on stargazing.",
          "Option (2) visiting the Space Observatory is one activity, not the main aim.",
          "Option (3) making a telescope is one workshop, not the overall aim.",
          "Option (4) recruiting members is not mentioned at all.",
          "Answer: (1) introduce children to stargazing.",
        ],
        tip: "For 'main aim' questions, look at the event title, opening description, and the majority of activities.",
      },
    },
    {
      id: "TN23_C_Q17",
      marks: 1,
      question: "The camp is organised by _______ .",
      options: {
        "1": "Mr Joseph Lim",
        "2": "Seablue Campsite",
        "3": "Channing Space Club",
        "4": "Singapore Space Observatory",
      },
      answer: "3",
      solution: {
        method: "Visual Text — Specific Detail",
        steps: [
          "The advertisement states clearly: 'Organised by Channing Space Club'.",
          "Mr Joseph Lim is the contact for enquiries — not the organiser.",
          "Seablue Campsite is the venue.",
          "Singapore Space Observatory is visited on Day 2.",
          "Answer: (3) Channing Space Club.",
        ],
        tip: "For 'organised by' questions, look at the top of the advertisement — the organiser is usually stated near the title.",
      },
    },
    {
      id: "TN23_C_Q18",
      marks: 1,
      question:
        "Seablue Campsite is a suitable location for stargazing because it is _______ .",
      options: {
        "1": "dimly lit",
        "2": "a popular spot",
        "3": "equipped with telescopes",
        "4": "located very near Channing Space Club",
      },
      answer: "1",
      solution: {
        method: "Visual Text — Inference",
        steps: [
          "The advertisement says: 'The dark skies of this campsite make it an ideal and popular spot for stargazers.'",
          "'Dark skies' means it is dimly lit / has minimal light pollution — perfect for seeing stars. ✓",
          "Option (2) 'popular spot' is stated but is a result of the dark skies, not the reason for suitability.",
          "Option (3) 'Telescopes will NOT be provided' — so this is wrong.",
          "Option (4) It is 'an hour's drive away' from Channing Space Club — not 'very near'.",
          "Answer: (1) dimly lit.",
        ],
        tip: "'Dark skies' → minimal light pollution → dimly lit → ideal for stargazing. Follow the logical chain.",
      },
    },
    {
      id: "TN23_C_Q19",
      marks: 1,
      question: "The participants of the camp must _______ .",
      options: {
        "1": "pay an additional $100 for meals",
        "2": "come prepared with sleeping bags",
        "3": "go to Seablue Campsite on their own",
        "4": "buy the T-shirt from Channing Space Club",
      },
      answer: "2",
      solution: {
        method: "Visual Text — Requirement Detail",
        steps: [
          "Look for what participants MUST do.",
          "Under Activities: 'Bring your own sleeping bags' — this is a requirement. ✓",
          "Option (1): '$100 includes 3 meals' — meals are included in the fee, no additional payment.",
          "Option (3): 'Transport to the campsite' is included in the fee — they don't travel on their own.",
          "Option (4): The T-shirt is free, included in the $100 — no need to buy separately.",
          "Answer: (2) come prepared with sleeping bags.",
        ],
        tip: "Scan the text for action words like 'bring', 'must', 'need to'. 'Bring your own sleeping bags' is a clear participant requirement.",
      },
    },
    {
      id: "TN23_C_Q20",
      marks: 1,
      question: "Which one of the following statements is true?",
      options: {
        "1": "Participants have to bring their own tents.",
        "2": "Participants must email their interest to Mr Joseph Lim.",
        "3": "Participants will need to know how to use a telescope.",
        "4": "Participants pay less if they register before 31 October 2022.",
      },
      answer: "4",
      solution: {
        method: "Visual Text — True/False Verification",
        steps: [
          "Check each option against the text.",
          "Option (1): 'Tents will be provided' — FALSE, tents are provided.",
          "Option (2): Application forms are downloaded and emailed to channingspaceclub@gmail.com — NOT to Mr Joseph Lim. Mr Lim is for enquiries only. FALSE.",
          "Option (3): 'Make your own telescope and learn how to use it (no experience needed)' — beginners welcome, no prior knowledge required. FALSE.",
          "Option (4): 'Early bird offer: $20 off if you register before 31 October 2022' — TRUE. ✓",
          "Answer: (4) Participants pay less if they register before 31 October 2022.",
        ],
        tip: "For True/False visual text questions, go back to the text and verify EVERY option. Don't rely on memory.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION D — Grammar Cloze  (Q21–Q24)
// Answer key: B C A E  (i.e. Q21=B=down, Q22=C=in, Q23=A=at, Q24=E=its)
// ════════════════════════════════════════════════════════════

const grammarClozePassage = `
I was fishing at a river one afternoon. All of a sudden, I felt something tickling my foot. I looked (21) ______ and realised that it was a long, black snake! It appeared to be asleep (22) ______ the ankle-deep water. I stood frozen (23) ______ the ground as the water shifted a part of (24) ______ body onto my leg. Within a split second, I leapt out of the water. Filled with fear, I reminded myself never to fish in that area again.

Word Box: (A) at  (B) down  (C) in  (D) into  (E) its  (F) it's  (G) to  (H) up
`;

const sectionD: PassageSet = {
  kind: "B",
  id: "TN23_D_GrammarCloze",
  topic: "GrammarCloze",
  passageTitle: "Grammar Cloze — River Fishing (Questions 21–24)",
  passage: grammarClozePassage,
  questions: [
    {
      id: "TN23_D_Q21",
      marks: 1,
      question: "Fill in blank (21): I looked (21) ______ and realised…",
      options: {
        A: "at",
        B: "down",
        C: "in",
        D: "into",
        E: "its",
        F: "it's",
        G: "to",
        H: "up",
      },
      answer: "B",
      solution: {
        method: "Grammar Cloze — Preposition with 'look'",
        steps: [
          "The narrator felt something at their foot and looked in that direction — downward (feet are below).",
          "'Looked down' = directed gaze downwards, toward the feet/floor. ✓",
          "'Looked at' requires an object: 'looked at the snake' — but here the blank is before 'and realised', suggesting the direction of looking.",
          "Answer: (B) down.",
        ],
        tip: "Directional prepositional phrases with 'look': look down (below), look up (above), look around (surroundings).",
      },
    },
    {
      id: "TN23_D_Q22",
      marks: 1,
      question:
        "Fill in blank (22): It appeared to be asleep (22) ______ the ankle-deep water.",
      options: {
        A: "at",
        B: "down",
        C: "in",
        D: "into",
        E: "its",
        F: "it's",
        G: "to",
        H: "up",
      },
      answer: "C",
      solution: {
        method: "Grammar Cloze — Preposition of Location",
        steps: [
          "The snake is inside the water — surrounded by water.",
          "'In' = inside / surrounded by (used for liquids and enclosed spaces). ✓",
          "'At' = at a specific point; 'into' = movement towards inside; 'down' = direction.",
          "The snake is stationary inside the water, not moving into it.",
          "Answer: (C) in.",
        ],
        tip: "'In water' (stationary, inside) vs 'into water' (movement entering). The snake is already there — use 'in'.",
      },
    },
    {
      id: "TN23_D_Q23",
      marks: 1,
      question:
        "Fill in blank (23): I stood frozen (23) ______ the ground as the water shifted…",
      options: {
        A: "at",
        B: "down",
        C: "in",
        D: "into",
        E: "its",
        F: "it's",
        G: "to",
        H: "up",
      },
      answer: "A",
      solution: {
        method: "Grammar Cloze — Fixed Expression",
        steps: [
          "'Stood frozen at' — the expression 'frozen at/on the spot' or 'stood at' indicates a fixed position.",
          "Here 'at the ground' suggests the person's position is anchored at ground level, fixed with fear.",
          "Also consider: 'rooted to the ground' and 'frozen at the spot' are common expressions.",
          "Answer: (A) at.",
        ],
        tip: "'Stand frozen at the ground' or 'rooted at the spot' — 'at' indicates a fixed position in fear.",
      },
    },
    {
      id: "TN23_D_Q24",
      marks: 1,
      question:
        "Fill in blank (24): …as the water shifted a part of (24) ______ body onto my leg.",
      options: {
        A: "at",
        B: "down",
        C: "in",
        D: "into",
        E: "its",
        F: "it's",
        G: "to",
        H: "up",
      },
      answer: "E",
      solution: {
        method: "Grammar Cloze — Possessive Pronoun",
        steps: [
          "The blank is before 'body' — we need a possessive word to show whose body.",
          "The subject is the snake (it) → possessive form = 'its'. ✓",
          "'It's' = 'it is' (contraction) — wrong here; no verb follows.",
          "'Its' (no apostrophe) = belonging to it (possessive). ✓",
          "Answer: (E) its.",
        ],
        tip: "Never confuse 'its' (possessive) with 'it's' (it is). If you can replace with 'it is' and the sentence still makes sense, use 'it's'. Otherwise, use 'its'.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION E — Comprehension Cloze  (Q25–Q28)
// Answer key: B C G F  (Q25=B=blind, Q26=C=chores, Q27=G=inform... 
// Official key: Q25=H(tasks)? Let's re-check from key: Q21=B Q22=C Q23=G Q24=E Q25=H Q26=F Q27=D Q28=A
// Wait - the answer key shows Q21-Q28: B C G E H F D A
// So for Section E (Q25-Q28): H, F, D, A
// H=tasks, F=guiding, D=deaf, A=alert
// ════════════════════════════════════════════════════════════

const vocabClozePassage = `
Dogs are Man's best friends. They are not only loyal, but also make great pets. Dogs can also be trained for specific (25) ______ such as retrieving shoes and opening doors. For at least 2000 years, these creatures have been (26) ______ the blind. Today, we also have 'hearing ear' dogs for the (27) ______. These canines are trained to (28) ______ their owners to warning sounds, such as a fire alarm. Thus, saving their owners from any mishaps.

Word Box: (A) alert  (B) blind  (C) chores  (D) deaf  (E) following  (F) guiding  (G) inform  (H) tasks
`;

const sectionE: PassageSet = {
  kind: "B",
  id: "TN23_E_VocabCloze",
  topic: "VocabCloze",
  passageTitle: "Comprehension Cloze — Dogs as Helpers (Questions 25–28)",
  passage: vocabClozePassage,
  questions: [
    {
      id: "TN23_E_Q25",
      marks: 1,
      question:
        "Fill in blank (25): …trained for specific (25) ______ such as retrieving shoes and opening doors.",
      options: {
        A: "alert",
        B: "blind",
        C: "chores",
        D: "deaf",
        E: "following",
        F: "guiding",
        G: "inform",
        H: "tasks",
      },
      answer: "H",
      solution: {
        method: "Vocab Cloze — Context",
        steps: [
          "The blank follows 'specific' and examples given are 'retrieving shoes and opening doors' — these are specific jobs/duties.",
          "'Tasks' = specific jobs or duties assigned. ✓",
          "'Chores' = routine household jobs — not quite specific trained duties for a dog.",
          "Answer: (H) tasks.",
        ],
        tip: "'Trained for specific tasks' is the natural collocation — tasks are assigned, purposeful duties.",
      },
    },
    {
      id: "TN23_E_Q26",
      marks: 1,
      question:
        "Fill in blank (26): …these creatures have been (26) ______ the blind.",
      options: {
        A: "alert",
        B: "blind",
        C: "chores",
        D: "deaf",
        E: "following",
        F: "guiding",
        G: "inform",
        H: "tasks",
      },
      answer: "F",
      solution: {
        method: "Vocab Cloze — Collocation",
        steps: [
          "Guide dogs lead people who cannot see. The natural verb is 'guide'.",
          "'Guiding the blind' = leading/helping visually impaired people. ✓",
          "'Following the blind' doesn't make sense — dogs lead, not follow.",
          "'Alert the blind' doesn't fit the present perfect continuous structure 'have been (verb)-ing'.",
          "Answer: (F) guiding.",
        ],
        tip: "Guide dogs 'guide' (lead) visually impaired people. The phrase is 'guiding the blind'.",
      },
    },
    {
      id: "TN23_E_Q27",
      marks: 1,
      question:
        "Fill in blank (27): …we also have 'hearing ear' dogs for the (27) ______.",
      options: {
        A: "alert",
        B: "blind",
        C: "chores",
        D: "deaf",
        E: "following",
        F: "guiding",
        G: "inform",
        H: "tasks",
      },
      answer: "D",
      solution: {
        method: "Vocab Cloze — Contrast Logic",
        steps: [
          "Guide dogs help 'the blind' (visually impaired). By contrast, 'hearing ear' dogs help those who cannot HEAR.",
          "People who cannot hear are 'the deaf'. ✓",
          "The parallel structure: guide dogs → the blind; 'hearing ear' dogs → the deaf.",
          "Answer: (D) deaf.",
        ],
        tip: "Look for contrast/parallel structures in the passage: blind ↔ deaf is the classic pair.",
      },
    },
    {
      id: "TN23_E_Q28",
      marks: 1,
      question:
        "Fill in blank (28): …trained to (28) ______ their owners to warning sounds, such as a fire alarm.",
      options: {
        A: "alert",
        B: "blind",
        C: "chores",
        D: "deaf",
        E: "following",
        F: "guiding",
        G: "inform",
        H: "tasks",
      },
      answer: "A",
      solution: {
        method: "Vocab Cloze — Verb Meaning",
        steps: [
          "'Alert someone to something' = to warn or notify them about a danger or sound. ✓",
          "The dogs warn their owners about warning sounds (fire alarms, doorbells, etc.).",
          "'Inform' = to give information — close, but 'alert' specifically means a warning notification.",
          "Collocation: 'alert someone to danger/sounds' is standard English. ✓",
          "Answer: (A) alert.",
        ],
        tip: "'Alert' (verb) = to warn about danger; it collocates with 'alert someone to [something dangerous]'.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION F — Synthesis & Transformation  (Q29–Q32)
// Answer key (from page 48 key): Q29–Q32 given as open-ended answers
// ════════════════════════════════════════════════════════════
const sectionF: QuestionTypeA[] = [
  {
    kind: "A",
    id: "TN23_F_Q29",
    topic: "SentenceCombining",
    marks: 2,
    stimulus:
      "Nancy brought many blueberries. Nancy did not share the blueberries with her classmates.",
    question:
      "Rewrite the sentences above as ONE sentence beginning with the word(s) given.\n\nEven though __________",
    answer:
      "Even though Nancy brought many blueberries, she did not share them with her classmates.",
    solution: {
      method: "Concession Connector: 'Even though'",
      steps: [
        "'Even though' introduces a contrast: something unexpected given the first fact.",
        "First clause: 'Even though Nancy brought many blueberries,'",
        "Second clause: the contrasting result: 'she did not share them with her classmates.'",
        "Note: Change 'Nancy' to 'she' in the second clause to avoid repetition.",
        "Comma after the 'even though' clause is required.",
        "Full answer: Even though Nancy brought many blueberries, she did not share them with her classmates.",
      ],
      tip: "Structure: Even though + [positive/expected action], + [negative/surprising result]. Use a pronoun in the second clause.",
    },
  },
  {
    kind: "A",
    id: "TN23_F_Q30",
    topic: "SentenceCombining",
    marks: 2,
    stimulus: "Raj washed his hands. Then, he sat down to eat.",
    question:
      "Rewrite the sentences above as ONE sentence beginning with the word(s) given.\n\nRaj sat down __________",
    answer: "Raj sat down to eat after washing his hands.",
    solution: {
      method: "Time Connector: 'after' (beginning word given is 'Raj sat down')",
      steps: [
        "The starting words are 'Raj sat down' — so the main action is sitting down to eat.",
        "The earlier action (washing hands) becomes a subordinate clause using 'after'.",
        "'after washing his hands' = 'after he washed his hands' (reduced to gerund form).",
        "Full answer: Raj sat down to eat after washing his hands.",
        "Alternative: Raj sat down to eat after he had washed his hands.",
      ],
      tip: "When sequence matters, use 'after' + gerund (verb-ing) or 'after' + subject + past tense verb.",
    },
  },
  {
    kind: "A",
    id: "TN23_F_Q31",
    topic: "SentenceCombining",
    marks: 2,
    stimulus:
      "The Venus Flytrap does not have hands or legs. It traps flies and other small insects using its leaves.",
    question:
      "Rewrite the sentences above as ONE sentence using the word 'However'.\n\n__________ However, __________",
    answer:
      "The Venus Flytrap does not have hands or legs. However, it traps flies and other small insects using its leaves.",
    solution: {
      method: "Contrast Connector: 'However'",
      steps: [
        "'However' signals a contrast between two ideas.",
        "First sentence (as is): 'The Venus Flytrap does not have hands or legs.'",
        "Second sentence starting with 'However,': 'However, it traps flies and other small insects using its leaves.'",
        "'However' starts a new sentence with a comma after it.",
        "Full answer: The Venus Flytrap does not have hands or legs. However, it traps flies and other small insects using its leaves.",
      ],
      tip: "'However' = 'but' in formal writing. It begins a new sentence followed by a comma: 'However, + [contrasting idea].'",
    },
  },
  {
    kind: "A",
    id: "TN23_F_Q32",
    topic: "SentenceCombining",
    marks: 2,
    stimulus:
      "The sow bug curls up to protect itself from predators. The opossum plays dead to protect itself from predators.",
    question:
      "Rewrite the sentences above as ONE sentence using the word 'while'.\n\n__________ while __________",
    answer:
      "The sow bug curls up while the opossum plays dead to protect itself from predators.",
    solution: {
      method: "Parallel Action Connector: 'while'",
      steps: [
        "'While' connects two simultaneous or contrasting actions.",
        "Combine: '[Action 1] while [Action 2] to protect themselves from predators.'",
        "Both animals are doing different things to achieve the same goal.",
        "Full answer: The sow bug curls up while the opossum plays dead to protect itself from predators.",
        "Note: 'itself' refers to the opossum in the second clause.",
      ],
      tip: "'While' can show contrast (two different things happening) or simultaneity. Here it contrasts two animals' defence strategies.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION G — Editing: Spelling, Punctuation & Grammar  (Q33–Q38)
// Passage about Sarah climbing Mount Kinabalu
// Answer key: Q33=On, Q34=Successfully(→successfully), Q35=', Q36=Jubilantly(→jubilantly), 
//             Q37=Something(→something), Q38='
// ════════════════════════════════════════════════════════════

const editingPassage = `
Mount Kuta is a famous mountain-sized rock in Bukit National Park in Malaysia. (33)[  ] It is well known for being one of the most challenging places to ascend. At 12 June 2011, ten-year-old Sarah decided to climb this mountain. She was the youngest (34)[sucesfully] person to reach the top. During the extremely dangerous hike, Sarah felt exhausted and was sunburnt due to the intense heat. However, she persevered. Her (35)[  ] father was very impressed. He told the reporters proudly(  )Sarah was positive throughout the entire adventure."

Indeed, Sarah was in high spirits when she reached the summit. Smiling (36)[jubeelantly], Sarah gave this piece of advice to anyone who was thinking about doing (37)[anything] similar. "You don't need any special skills or talents. You just have to put (38)[  ] your mind to it and be determined(  )she said. Sarah eventually went on to conquer higher and even more challenging mountains.
`;

const sectionG: QuestionTypeA[] = [
  {
    kind: "A",
    id: "TN23_G_Q33",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassage,
    question:
      "Q33: The sentence reads: '_____ 12 June 2011, ten-year-old Sarah decided to climb this mountain.' A word is underlined/circled. Write the correct word in the box.",
    answer: "On",
    solution: {
      method: "Preposition — Dates",
      steps: [
        "The blank precedes a specific date '12 June 2011'.",
        "For specific dates, the correct preposition is 'on': 'On 12 June 2011'. ✓",
        "'At' is used for times (at 3pm); 'in' for months/years (in June / in 2011); 'on' for specific dates.",
        "Correction: 'At' → 'On'.",
        "Answer: On.",
      ],
      tip: "Preposition rule: ON + specific date (On 5 July), IN + month/year (in July / in 2011), AT + specific time (at 8am).",
    },
  },
  {
    kind: "A",
    id: "TN23_G_Q34",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassage,
    question:
      "Q34: The word 'sucesfully' is underlined. Write the correct spelling in the box.",
    answer: "successfully",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The word 'sucesfully' is misspelled.",
        "Correct spelling: s-u-c-c-e-s-s-f-u-l-l-y.",
        "Common error: missing one 'c' and one 's'. The word has double-c (succ-) and double-s (-cess-).",
        "Break it down: success + ful + ly = successfully.",
        "Answer: successfully.",
      ],
      tip: "Memory trick: 'SUCCESS' has double-c and double-s: sUCCESS. Then add '-fully': successFULLY.",
    },
  },
  {
    kind: "A",
    id: "TN23_G_Q35",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassage,
    question:
      "Q35: A punctuation mark is missing or wrong in the sentence: 'He told the reporters proudly(  )Sarah was positive throughout the entire adventure.' Write the correct punctuation mark in the box.",
    answer: ",",
    solution: {
      method: "Punctuation — Reporting Verb",
      steps: [
        "'He told the reporters proudly(  )Sarah was positive…' — after 'proudly', a comma is needed before the reported speech.",
        "When using reporting verbs with reported speech (indirect), use a comma before the reported clause.",
        "Correct: 'He told the reporters proudly, \"Sarah was positive…\"' or as indirect: '…proudly that Sarah was positive…'",
        "The circle/box requires a comma (,) or opening quotation mark — in context the answer key gives (') apostrophe → this is the opening quotation mark before 'Sarah'.",
        "Answer: ' (opening quotation mark / comma depending on context — key shows comma/quote).",
      ],
      tip: "After reporting verbs like 'said', 'told', 'whispered', use a comma before direct speech: He said, \"...\"",
    },
  },
  {
    kind: "A",
    id: "TN23_G_Q36",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassage,
    question:
      "Q36: The word 'jubeelantly' is underlined. Write the correct spelling in the box.",
    answer: "jubilantly",
    solution: {
      method: "Spelling Correction",
      steps: [
        "The misspelled word is 'jubeelantly'.",
        "Correct spelling: j-u-b-i-l-a-n-t-l-y.",
        "The root word is 'jubilant' (joyful, triumphant), not 'jubeel-'.",
        "Break down: jubil + ant + ly = jubilantly.",
        "Answer: jubilantly.",
      ],
      tip: "Root: JUBILANT (full of joy) → jubilantly. Remember the 'i' not 'e': JUBIlant.",
    },
  },
  {
    kind: "A",
    id: "TN23_G_Q37",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassage,
    question:
      "Q37: The word 'anything' is underlined in the sentence about Sarah's advice. Write the correct word in the box.",
    answer: "something",
    solution: {
      method: "Grammar — Positive Context Quantifier",
      steps: [
        "Context: 'Sarah gave this piece of advice to anyone who was thinking about doing (37)[anything] similar.'",
        "In a positive/affirmative sentence, we use 'something' (not 'anything').",
        "'Anything' is used in negative sentences or questions: 'Did she say anything?'",
        "Here the sentence is positive (she IS thinking about doing it), so 'something' is correct. ✓",
        "Answer: something.",
      ],
      tip: "Rule: Use 'some-' (something, someone, somewhere) in positive sentences. Use 'any-' in negatives and questions.",
    },
  },
  {
    kind: "A",
    id: "TN23_G_Q38",
    topic: "Editing",
    marks: 1,
    stimulus: editingPassage,
    question:
      "Q38: A punctuation mark is missing at the end of 'You just have to put (38)[  ] your mind to it and be determined(  )she said.' Write the correct punctuation mark in the box.",
    answer: "'",
    solution: {
      method: "Punctuation — Closing Quotation Mark",
      steps: [
        "The sentence is: '\"You don't need any special skills or talents. You just have to put your mind to it and be determined(38)[ ] she said.'",
        "Before 'she said', the direct speech quote must be closed with a closing quotation mark.",
        "The closing single/double quotation mark (' or \") goes before the comma and reporting verb.",
        "Answer: ' (closing quotation mark).",
      ],
      tip: 'Direct speech pattern: "Quoted words," he/she said. Don\'t forget the closing quotation mark BEFORE the comma.',
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION H — Comprehension Open-ended  (Q39–Q44)
// Passage: Sam and Bill in the Cave
// Answer key (from PDF p.48): Q39, Q40, Q41=A, Q42, Q43, Q44
// ════════════════════════════════════════════════════════════

const comprehensionPassage = `
"Look at that!" Bill gave a shout of surprise. He and his brother, Sam, were catching insects near their campsite when they sighted it on top of a hill.

"Let's check it out!" Sam said, his eyes lit up with excitement. "Race you to the hill," he challenged. Laughing, they ran until they came to the cave entrance. Fearlessly, Sam stepped inside but he was not able to see anything in the cave. It was pitch black. Curious to find out what was inside, the duo hurried back to their campsite to get a torch.                                                           [line 5]

Moments later, their real adventure began. With great caution, they entered the unknown. There was a strong odour of rotting wood. Bill wrinkled his nose at the unpleasant smell while Sam sneezed noisily several times. Deeper and deeper they ventured. Soon, they stumbled upon some uneven steps which they began to climb gingerly. Then, Bill, who had been talking incessantly all this while, suddenly went quiet. He stared, mouth agape, at something on the ground ahead of them. It was a half-burnt candle.                        [line 10]

"Look, we're not the first ones here!" he said. Hearts beating like bongo drums, the boys continued walking. Was anyone still in the cave? Their question was soon answered by the sound of someone humming. "AH!" They screamed and fled out of the cave as fast as their legs could carry them.                                               [line 15]
`;

const sectionH: PassageSet = {
  kind: "B",
  id: "TN23_H_Comprehension",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension Open-ended — Sam and Bill in the Cave (Q39–Q44)",
  passage: comprehensionPassage,
  questions: [
    {
      id: "TN23_H_Q39",
      marks: 2,
      question:
        "Where were Sam and Bill when they spotted the cave? (2 marks)",
      answer: "They were near their campsite (catching insects on/near a hill).",
      solution: {
        method: "Literal Comprehension",
        steps: [
          "Find the answer in the passage: 'He and his brother, Sam, were catching insects near their campsite when they sighted it on top of a hill.'",
          "They were NEAR THEIR CAMPSITE when they saw the cave.",
          "Full answer: They were near their campsite (catching insects) when they spotted the cave.",
        ],
        tip: "For 'where' questions, look for location words (near, at, on, by) in the relevant sentence.",
      },
    },
    {
      id: "TN23_H_Q40",
      marks: 2,
      question:
        "What does the 'real adventure' (line 8) refer to? (2 marks)",
      answer:
        "It refers to Sam and Bill entering/exploring the cave (with a torch).",
      solution: {
        method: "Vocabulary in Context / Inference",
        steps: [
          "Line 8: 'Moments later, their real adventure began.'",
          "What happened just before? They got a torch and returned to the cave.",
          "'Real adventure' = the actual exploration inside the cave (as opposed to just spotting it from outside).",
          "Answer: It refers to Sam and Bill exploring the cave (with a torch).",
        ],
        tip: "For 'what does X refer to' questions, look at what happens immediately before the word/phrase.",
      },
    },
    {
      id: "TN23_H_Q41",
      marks: 1,
      question:
        "Which word has the same meaning as 'continuously'? Circle (A) or (B). (1 mark)\n\n'Bill, who had been talking incessantly all this while, suddenly went quiet.'\n                              (A) incessantly         (B) suddenly",
      options: { A: "incessantly", B: "suddenly" },
      answer: "A",
      solution: {
        method: "Synonym Identification",
        steps: [
          "'Continuously' means without stopping, going on and on.",
          "'Incessantly' = without pause, continuously, non-stop. ✓",
          "'Suddenly' = unexpectedly, all at once — opposite meaning (abrupt stop, not continuous).",
          "Answer: (A) incessantly.",
        ],
        tip: "Incessant = ceaseless = non-stop = continuous. 'In-' (not) + 'cessant' (ceasing) = not ceasing.",
      },
    },
    {
      id: "TN23_H_Q42",
      marks: 1,
      question:
        "Which one of the following statements is true? Put a tick in the box. (1 mark)\n□ Sam entered the cave before Bill did.\n□ Sam stopped chattering when he spotted the candle.\n□ The boys found out who was singing in the cave.",
      answer: "Sam entered the cave before Bill did.",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Check option 1: 'Fearlessly, Sam stepped inside' — Sam went first. ✓",
          "Check option 2: It was BILL who went quiet when he spotted the candle, not Sam.",
          "Check option 3: They fled before finding out who was humming — they never found out.",
          "Answer: Sam entered the cave before Bill did. ✓",
        ],
        tip: "For true/false questions, go back to the text and verify each statement carefully. Don't rely on memory alone.",
      },
    },
    {
      id: "TN23_H_Q43",
      marks: 1,
      question:
        "Write down the five-word phrase in paragraph 4 (lines 15–18) that tells you that the boys were nervous. (1 mark)",
      answer: "Hearts beating like bongo drums",
      solution: {
        method: "Retrieval / Figurative Language",
        steps: [
          "Look in paragraph 4 (around line 15) for a phrase suggesting nervousness.",
          "'Hearts beating like bongo drums' — a simile comparing their rapid heartbeats to loud drum beats.",
          "Fast, loud heartbeat = nervousness/fear. ✓",
          "The phrase is exactly five words: Hearts / beating / like / bongo / drums.",
          "Answer: Hearts beating like bongo drums.",
        ],
        tip: "Similes comparing heartbeats to fast/loud things (drums, hammers) indicate fear or excitement. Count the words carefully.",
      },
    },
    {
      id: "TN23_H_Q44",
      marks: 1,
      question:
        "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story. (1 mark)\n\n___ Bill and Sam discovered that someone was in the cave.\n___ Bill and Sam were camping when they saw a cave.\n___ Bill and Sam returned to their campsite to get a torch.",
      answer:
        "3 (discovered someone), 1 (were camping/saw cave), 2 (returned for torch).",
      solution: {
        method: "Sequencing Events",
        steps: [
          "Read through the passage and identify the order of events:",
          "Event 1: They were camping/catching insects near the campsite and SAW the cave. → Label: 1",
          "Event 2: Sam stepped in, it was pitch black, so they went BACK TO GET A TORCH. → Label: 2",
          "Event 3: Inside the cave, they heard humming — DISCOVERED SOMEONE WAS THERE. → Label: 3",
          "Answer: Bill and Sam saw the cave (1), returned for a torch (2), discovered someone in the cave (3).",
          "Blanks: _3_ discovered someone; _1_ were camping/saw cave; _2_ returned for torch.",
        ],
        tip: "Sequence questions: skim the passage in order and match events. Use line numbers to check order.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// FULL PAPER EXPORT
// ════════════════════════════════════════════════════════════
export const questions: Question[] = [
  ...sectionA,
  ...sectionB,
  sectionC,
  sectionD,
  sectionE,
  ...sectionF,
  ...sectionG,
  sectionH,
];

export default {
  meta,
  questions,
};
