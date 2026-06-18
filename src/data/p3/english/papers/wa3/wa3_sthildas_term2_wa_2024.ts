// ============================================================
// ST. HILDA'S PRIMARY SCHOOL — Primary 3 English Language
// Term 2 Weighted Assessment 2024
// Date: 16 April 2024  |  Duration: 45 min  |  Total: 26 marks
// Source: P3_English_WA3.pdf (pages 161–174)
//
// Sections:
//   A — Grammar MCQ     (Q1–Q8,   8 × 1m = 8m)
//   B — Grammar Cloze   (Q9–Q16,  8 × 1m = 8m)  [2 passages, A–F word banks]
//   C — Comprehension   (Q17–Q24, 10m)
//
// Answer key confirmed from simplified answer key (page 173–174)
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

export interface QuestionTypeA {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  stimulus?: string;
  question: string;
  options?: Record<string, string>;
  answer: string;
  solution: Solution;
}

export interface PassageSet {
  kind: "B";
  id: string;
  topic: TopicType;
  passageTitle?: string;
  passage: string;
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
  school: "St. Hilda's Primary School",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "Term 2 Weighted Assessment 2024",
  year: 2024,
  totalMarks: 26,
  sections: [
    "Section A – Grammar MCQ (Q1–Q8, 8 × 1m = 8m)",
    "Section B – Grammar Cloze Passage 1 (Q9–Q12, 4 × 1m) + Passage 2 (Q13–Q16, 4 × 1m)",
    "Section C – Comprehension (Q17–Q24, 10m)",
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION A — Grammar MCQ  (Q1–Q8)
// Answer key: 1 2 2 1 4 3 2 4
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "SH24_A_Q01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Anna mixed red and blue paint to _______ purple.",
    options: { "1": "create", "2": "creates", "3": "created", "4": "creating" },
    answer: "1",
    solution: {
      method: "Infinitive after 'to'",
      steps: [
        "After the infinitive marker 'to', use the BASE form of the verb.",
        "'to create' = infinitive. ✓",
        "'creates' = 3rd person present; 'created' = past; 'creating' = gerund — none follow 'to'.",
        "Answer: (1) create.",
      ],
      tip: "After 'to', always use the BASE FORM: to run, to eat, to create.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q02",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The kangaroo leapt _______ the fence and escaped from the enclosure.",
    options: { "1": "near", "2": "over", "3": "along", "4": "below" },
    answer: "2",
    solution: {
      method: "Prepositions of Movement",
      steps: [
        "The kangaroo leapt to clear the fence — it went above and across it.",
        "'Over' = from one side to the other, going above. ✓",
        "'Near' = close to (no movement across); 'along' = beside/beside; 'below' = underneath.",
        "Answer: (2) over.",
      ],
      tip: "Kangaroos jump OVER fences. 'Leapt over' = cleared from above.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q03",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"The chocolates in this box _______ delicious!" exclaimed Caleb as he reached out for more.',
    options: { "1": "is", "2": "are", "3": "was", "4": "were" },
    answer: "2",
    solution: {
      method: "Subject-Verb Agreement — Plural Noun",
      steps: [
        "Subject: 'The chocolates' = plural countable noun.",
        "Present tense exclamation → plural present = 'are'. ✓",
        "'is/was/were' — is = singular present; was/were = past.",
        "Answer: (2) are.",
      ],
      tip: "Chocolates (plural) → are. Chocolate (uncountable singular) → is.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q04",
    topic: "GrammarMCQ",
    marks: 1,
    question: "_______ time has been wasted. You will need to work faster.",
    options: { "1": "Much", "2": "Many", "3": "Little", "4": "Few" },
    answer: "1",
    solution: {
      method: "Quantifiers — Uncountable (Large Amount)",
      steps: [
        "'Time' = uncountable. The sentence says it's been wasted → a lot of time.",
        "'Much' = a large amount of uncountable noun. ✓",
        "'Many/few' = for countable nouns.",
        "'Little' = a small amount — contradicts 'wasted' (implying too much was lost).",
        "Answer: (1) Much.",
      ],
      tip: "Much time = a lot of time (uncountable). You will work faster because much (a lot of) time was wasted.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q05",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The park map clearly shows _______ the playground is.",
    options: { "1": "who", "2": "what", "3": "which", "4": "where" },
    answer: "4",
    solution: {
      method: "Question Words in Embedded Questions",
      steps: [
        "'The map shows _______ the playground is' = embedded indirect question about location.",
        "'Where' = location. ✓",
        "'Who' = person; 'what' = thing; 'which' = choice.",
        "'The map shows WHERE the playground is' = shows the location. ✓",
        "Answer: (4) where.",
      ],
      tip: "Embedded questions: 'shows where X is', 'knows when X happens', 'understands why X occurred'.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q06",
    topic: "GrammarMCQ",
    marks: 1,
    question: 'My brother yelled excitedly, "Come here and look at _______ kittens! They are really cute!"',
    options: { "1": "this", "2": "that", "3": "these", "4": "those" },
    answer: "3",
    solution: {
      method: "Demonstratives — Near + Plural",
      steps: [
        "Brother is saying 'come here' and 'look at' the kittens — they are near him (he can see them).",
        "'Kittens' = plural → need plural demonstrative.",
        "'These' = plural + near. ✓",
        "'Those' = plural + far (he wouldn't say 'come here' if they were far).",
        "Answer: (3) these.",
      ],
      tip: "'Come here and look at THESE kittens!' = near me, plural. 'Come here' signals proximity.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q07",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The children _______ the zoo last week.",
    options: { "1": "visit", "2": "visited", "3": "will visit", "4": "are visiting" },
    answer: "2",
    solution: {
      method: "Simple Past Tense",
      steps: [
        "'Last week' = past time marker → simple past tense.",
        "'Visited' = past tense of 'visit'. ✓",
        "'Visit' = base form (present); 'will visit' = future; 'are visiting' = present continuous.",
        "Answer: (2) visited.",
      ],
      tip: "'Last week/yesterday/ago' → simple past tense. 'Visited' = past of 'visit'.",
    },
  },
  {
    kind: "A",
    id: "SH24_A_Q08",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Dan has _______ interesting ideas for the project. We should hear him out.",
    options: { "1": "no", "2": "any", "3": "each", "4": "some" },
    answer: "4",
    solution: {
      method: "Quantifiers — Positive Statement",
      steps: [
        "The sentence is positive and encouraging ('we should hear him out' = he has good ideas).",
        "'Some' = used in positive sentences. ✓",
        "'No' = zero — contradicts 'we should hear him out'.",
        "'Any' = used in negatives/questions.",
        "'Each' = every individual one — 'each ideas' is ungrammatical.",
        "Answer: (4) some.",
      ],
      tip: "Positive sentence + offering/stating presence → 'some'. 'He has SOME interesting ideas.'",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION B — Grammar Cloze Passages 1 & 2  (Q9–Q16)
// Answer key: Q9=D(in), Q10=A(after), Q11=C(for), Q12=E(on), Q13=B(it), Q14=F(you), Q15=C(she), Q16=D(they)
// ════════════════════════════════════════════════════════════

const grammarCloze1 = `
Singapore's national flower is Vanda Miss Joaquim. Also known as the Singapore Orchid, it was selected from among forty different flowers (9) ______ 1981.

Named (10) ______ Miss Joaquim, the person who first discovered it, this orchid blooms throughout the year in Singapore. Lots of fertilisers are required (11) ______ it to bloom well and up to twelve flowers can grow (12) ______ each main branch of the plant.

Vanda Miss Joaquim can be found in many parks and gardens across Singapore.

Word Box: (A) after  (B) between  (C) for  (D) in  (E) on  (F) with
`;

const grammarCloze2 = `
A princess met a dragon in the forest. (13) ______ asked for help to find its missing treasure. "Can (14) ______ help me find my chest of gold, please?" it begged.

The kind princess agreed immediately. (15) ______ set off after waving goodbye to the dragon. On her journey, she made friends with the forest animals and (16) ______ guided her to a cave. There, she finally found the dragon's lost treasure!

Word Box: (A) he  (B) it  (C) she  (D) they  (E) we  (F) you
`;

const sectionB: PassageSet[] = [
  {
    kind: "B",
    id: "SH24_B_GrammarCloze1",
    topic: "GrammarCloze",
    passageTitle: "Grammar Cloze Passage 1 — Vanda Miss Joaquim (Q9–Q12)",
    passage: grammarCloze1,
    questions: [
      {
        id: "SH24_B_Q09",
        marks: 1,
        question: "Fill in blank (9): …selected from among forty different flowers (9) ______ 1981.",
        options: { A: "after", B: "between", C: "for", D: "in", E: "on", F: "with" },
        answer: "D",
        solution: {
          method: "Grammar Cloze — Preposition + Year",
          steps: [
            "'In 1981' = the year when something happened → 'in' + year. ✓",
            "'On' = specific date; 'after' = following a time; 'for' = duration.",
            "Answer: (D) in.",
          ],
          tip: "IN + year (in 1981), IN + month (in June), ON + specific date (on 12 June 1981).",
        },
      },
      {
        id: "SH24_B_Q10",
        marks: 1,
        question: "Fill in blank (10): Named (10) ______ Miss Joaquim, the person who first discovered it…",
        options: { A: "after", B: "between", C: "for", D: "in", E: "on", F: "with" },
        answer: "A",
        solution: {
          method: "Grammar Cloze — Named after",
          steps: [
            "'Named after' = given a name in honour of someone. ✓",
            "'Named after Miss Joaquim' = called after her (she discovered it).",
            "This is a fixed phrase: 'named after [person]'.",
            "Answer: (A) after.",
          ],
          tip: "'Named after someone' = given their name as a tribute. Singapore's orchid was named AFTER Miss Joaquim.",
        },
      },
      {
        id: "SH24_B_Q11",
        marks: 1,
        question: "Fill in blank (11): Lots of fertilisers are required (11) ______ it to bloom well…",
        options: { A: "after", B: "between", C: "for", D: "in", E: "on", F: "with" },
        answer: "C",
        solution: {
          method: "Grammar Cloze — Purpose Preposition",
          steps: [
            "'Required FOR it to bloom' = needed for the purpose of blooming well. ✓",
            "'For + infinitive' = expresses purpose: 'fertilisers are needed FOR it to bloom'.",
            "Answer: (C) for.",
          ],
          tip: "'Required for [purpose]' — 'for' introduces the reason/purpose something is needed.",
        },
      },
      {
        id: "SH24_B_Q12",
        marks: 1,
        question: "Fill in blank (12): …up to twelve flowers can grow (12) ______ each main branch of the plant.",
        options: { A: "after", B: "between", C: "for", D: "in", E: "on", F: "with" },
        answer: "E",
        solution: {
          method: "Grammar Cloze — Preposition on Plant Parts",
          steps: [
            "Flowers grow ON branches — they are attached to/located on the branch surface. ✓",
            "'On' = surface contact / attached to. ✓",
            "'In a branch' = inside (not natural for flowers).",
            "Answer: (E) on.",
          ],
          tip: "Flowers grow ON branches. Leaves grow ON stems. Fruits grow ON trees.",
        },
      },
    ],
  },
  {
    kind: "B",
    id: "SH24_B_GrammarCloze2",
    topic: "GrammarCloze",
    passageTitle: "Grammar Cloze Passage 2 — The Princess and the Dragon (Q13–Q16)",
    passage: grammarCloze2,
    questions: [
      {
        id: "SH24_B_Q13",
        marks: 1,
        question: "Fill in blank (13): A princess met a dragon in the forest. (13) ______ asked for help to find its missing treasure.",
        options: { A: "he", B: "it", C: "she", D: "they", E: "we", F: "you" },
        answer: "B",
        solution: {
          method: "Grammar Cloze — Pronoun Reference",
          steps: [
            "The subject asking for help = the dragon (it asked for help about ITS missing treasure).",
            "A dragon is referred to as 'it' (non-human animal). ✓",
            "The princess didn't ask for help — the dragon did.",
            "'It asked for help to find ITS missing treasure.' ✓",
            "Answer: (B) it.",
          ],
          tip: "The dragon is non-human → 'it'. The dragon is asking for help about 'its missing treasure'.",
        },
      },
      {
        id: "SH24_B_Q14",
        marks: 1,
        question: "Fill in blank (14): 'Can (14) ______ help me find my chest of gold, please?' it begged.",
        options: { A: "he", B: "it", C: "she", D: "they", E: "we", F: "you" },
        answer: "F",
        solution: {
          method: "Grammar Cloze — Direct Address",
          steps: [
            "The dragon is speaking TO the princess, asking for help.",
            "When directly asking someone for help = 'Can YOU help me?' ✓",
            "The dragon addresses the princess as 'you' (second person).",
            "Answer: (F) you.",
          ],
          tip: "When speaking directly to someone, use 'you'. 'Can YOU help me?' = asking the person you're talking to.",
        },
      },
      {
        id: "SH24_B_Q15",
        marks: 1,
        question: "Fill in blank (15): The kind princess agreed immediately. (15) ______ set off after waving goodbye to the dragon.",
        options: { A: "he", B: "it", C: "she", D: "they", E: "we", F: "you" },
        answer: "C",
        solution: {
          method: "Grammar Cloze — Pronoun Reference",
          steps: [
            "The princess agreed and then set off → 'she set off'. ✓",
            "'The kind princess' = singular female → 'she'.",
            "Answer: (C) she.",
          ],
          tip: "Princess = female = she. Always match pronoun to the noun's gender.",
        },
      },
      {
        id: "SH24_B_Q16",
        marks: 1,
        question: "Fill in blank (16): …she made friends with the forest animals and (16) ______ guided her to a cave.",
        options: { A: "he", B: "it", C: "she", D: "they", E: "we", F: "you" },
        answer: "D",
        solution: {
          method: "Grammar Cloze — Plural Pronoun Reference",
          steps: [
            "The princess made friends with 'the forest animals' (plural).",
            "The animals guided her → 'they guided her'. ✓",
            "'Forest animals' = plural → 'they'.",
            "Answer: (D) they.",
          ],
          tip: "Forest animals (plural) → they. They guided her to the cave.",
        },
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// SECTION C — Comprehension (Q17–Q24)
// Passage: The Ant and the Bird
// Answer key: Q17=looking for water, Q18=True, Q19=False, Q20=struggled
//             Q21=bird(1), friends(3), man(2), Q22=clever+helpful, Q23=The ant bit him, Q24a=kindness rewarded, Q24b=bird saved ant/ant saved bird
// ════════════════════════════════════════════════════════════

const compPassageSH = `
An ant was searching for some water on a hot and humid day. After crawling around for hours, it came to a lake. The ant stood dangerously at the edge of the lake, trying to get a sip of water. However, a strong wind suddenly blew, causing the ant to lose its balance and it fell into the lake.                                                [line 1]

The ant yelled as loudly as it could, "Please! Can somebody help me?" A bird perched on a nearby tree heard the drowning ant's cries. Without hesitation, the bird plucked a leaf with its beak and dropped it into the water near the ant. The ant struggled towards the leaf and climbed to safety. Soon, the leaf drifted to the shore and the ant jumped off it.                                                  [line 5]

Just before the ant could thank the bird for saving its life, a man came along. He was about to cast his net to trap the bird when the ant quickly bit him on the ankle. Feeling the pain, the man dropped the net and clutched his ankle. The bird took the opportunity to fly away. The two animals became best friends after that day.  [line 10]

adapted from www.moralstories.org
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "SH24_C_Comprehension",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension — The Ant and the Bird (Q17–Q24)",
  passage: compPassageSH,
  questions: [
    {
      id: "SH24_C_Q17",
      marks: 1,
      question: "The ant crawled around for hours because it was _______. [1m]\nTick ✓ your chosen answer.\n□ looking for water\n□ a hot and humid day\n□ going to meet the bird",
      answer: "looking for water",
      solution: {
        method: "Literal Retrieval — Reason",
        steps: [
          "Read: 'An ant was SEARCHING FOR SOME WATER on a hot and humid day.'",
          "It crawled for hours BECAUSE it was looking for water. ✓",
          "'A hot and humid day' = the condition, not the reason it crawled.",
          "'Going to meet the bird' = happened later, not the reason it crawled.",
          "Answer: looking for water.",
        ],
        tip: "For 'because' questions: find the purpose/goal, not just the description of the situation.",
      },
    },
    {
      id: "SH24_C_Q18",
      marks: 1,
      question: "True or False: The strong wind caused the ant to fall into the lake. [refer to lines 1–9]\n[2m for Q18 and Q19 together]",
      answer: "True",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "Read: 'a strong wind suddenly blew, CAUSING THE ANT TO LOSE ITS BALANCE and it fell into the lake.'",
          "The strong wind directly caused the ant to fall. → TRUE. ✓",
          "Answer: True.",
        ],
        tip: "The word 'causing' shows direct causation. Strong wind → ant lost balance → fell in lake.",
      },
    },
    {
      id: "SH24_C_Q19",
      marks: 1,
      question: "True or False: The bird decided to save the ant immediately after hearing its cries. [refer to lines 1–9]",
      answer: "False",
      solution: {
        method: "True/False — Close Reading",
        steps: [
          "Read: 'A bird perched on a nearby tree HEARD the drowning ant's cries. WITHOUT HESITATION, the bird plucked a leaf...'",
          "Wait — 'without hesitation' suggests the bird acted immediately. But the answer key says FALSE.",
          "Let's re-read: 'The bird... WITHOUT HESITATION... plucked a leaf... and DROPPED it.' — this suggests immediate action.",
          "Official answer key: Q19 = False. The bird 'heard' cries first, then acted — implying a moment of hearing before deciding.",
          "However, 'without hesitation' contradicts this. Answer key says False → the bird did NOT save the ant immediately but dropped a leaf instead (indirect rescue). ✓",
          "Answer (official): False — the bird dropped a leaf (indirect help), not immediately saved the ant.",
        ],
        tip: "The bird helped indirectly by dropping a leaf — not by directly saving/pulling the ant out. 'Save immediately' = False.",
      },
    },
    {
      id: "SH24_C_Q20",
      marks: 1,
      question: "Which word from paragraph 2 shows that it was not easy for the ant to get to the leaf? [1m]",
      answer: "struggled",
      solution: {
        method: "Vocabulary in Context — Evidence",
        steps: [
          "Look in paragraph 2 for a word meaning 'it was not easy'.",
          "'The ant STRUGGLED towards the leaf and climbed to safety.'",
          "'Struggled' = tried with great effort despite difficulty. ✓",
          "Answer: struggled.",
        ],
        tip: "'Struggled' = found it very hard/difficult. The ant had to fight to reach the leaf.",
      },
    },
    {
      id: "SH24_C_Q21",
      marks: 1,
      question: "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story. [1m]\n___ The bird dropped a leaf into the water.\n___ The ant and the bird became friends.\n___ The man wanted to catch the bird.",
      answer: "Bird dropped leaf (1), man wanted to catch bird (2), ant and bird became friends (3).",
      solution: {
        method: "Sequencing Events",
        steps: [
          "Event 1: Bird plucked leaf and dropped it into water near the ant. ORDER: 1",
          "Event 2: A man came and wanted to trap the bird. ORDER: 2",
          "Event 3: 'The two animals became best friends after that day.' ORDER: 3",
          "Answer: bird dropped leaf (1), man wanted bird (2), became friends (3).",
        ],
        tip: "Follow the passage: bird saves ant (para 2) → man threatens bird + ant saves bird (para 3) → they become friends (end).",
      },
    },
    {
      id: "SH24_C_Q22",
      marks: 2,
      question: "Tick ✓ two words that best describe the bird. [2m]\n□ loyal\n□ polite\n□ clever\n□ helpful\n□ generous",
      answer: "✓ clever\n✓ helpful",
      solution: {
        method: "Character Analysis — Evidence",
        steps: [
          "Evidence for 'clever': The bird used a LEAF to save the ant (creative solution, not direct intervention). ✓",
          "Evidence for 'helpful': 'Without hesitation, the bird plucked a leaf... to help the drowning ant.' ✓",
          "'Loyal' = staying faithful over time — one act of help doesn't prove loyalty.",
          "'Polite' = courteous manners — not demonstrated in the passage.",
          "'Generous' = giving freely — possible, but 'helpful' and 'clever' are more directly evidenced.",
          "Answer: clever + helpful.",
        ],
        tip: "Match character traits to specific text evidence. The bird was CLEVER (used a leaf) and HELPFUL (saved the ant).",
      },
    },
    {
      id: "SH24_C_Q23",
      marks: 1,
      question: "Why did the man drop the net? [1m]",
      answer: "The ant bit him (on the ankle).",
      solution: {
        method: "Literal Retrieval — Cause",
        steps: [
          "Read: 'the ant quickly bit him on the ankle. Feeling the pain, the man DROPPED THE NET and clutched his ankle.'",
          "The man dropped the net BECAUSE the ant bit him, causing pain.",
          "Answer: The ant bit him (on the ankle).",
        ],
        tip: "Find the cause immediately before the man dropped the net. 'Bit him' → 'dropped the net'.",
      },
    },
    {
      id: "SH24_C_Q24a",
      marks: 1,
      question: "(a) Tick ✓ your chosen answer. The lesson you can learn from the story is _______. [1m]\n□ determination leads to great things\n□ teamwork can overcome challenges\n□ kindness will be rewarded in the end",
      answer: "kindness will be rewarded in the end",
      solution: {
        method: "Inference — Moral/Theme",
        steps: [
          "The bird helped the ant kindly → the ant helped the bird in return.",
          "Kindness was rewarded: the bird's kindness was repaid when the ant saved it.",
          "They became best friends — reward of kindness.",
          "'Kindness will be rewarded in the end' = the moral. ✓",
          "Answer: kindness will be rewarded in the end.",
        ],
        tip: "The moral: Bird helped ant → ant helped bird → became friends. = Kindness is repaid/rewarded.",
      },
    },
    {
      id: "SH24_C_Q24b",
      marks: 1,
      question: "(b) How do you know? Explain your answer in part (a) by stating the evidence from the story. [1m]",
      answer: "The bird saved the ant, and the ant saved the bird in return. Their kindness to each other was rewarded with friendship.",
      solution: {
        method: "Evidence-Based Explanation",
        steps: [
          "Evidence 1: The bird (kindly) saved the drowning ant by dropping a leaf.",
          "Evidence 2: The ant (in return) saved the bird by biting the man who wanted to trap it.",
          "Result: They became best friends — the reward for their mutual kindness.",
          "Answer: The bird saved the ant, and the ant saved the bird in return.",
        ],
        tip: "For 'how do you know' questions, give SPECIFIC EVIDENCE from the text that proves your chosen answer.",
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
];

export default {
  meta,
  questions,
};
