// ============================================================
// NAN HUA PRIMARY SCHOOL — Primary 3 English Language
// Term 3 Weighted Assessment 2025 (WA3)
// Source: P3_English_WA3.pdf (pages 110–116)
//
// Sections:
//   A — Grammar MCQ      (Q1–Q5,   5 × 1m = 5m)
//   B — Vocabulary MCQ   (Q6–Q10,  5 × 1m = 5m)
//   C — Comprehension    (Q11–Q17, 10m)
//       Q11 (1m), Q12 (1m), Q13 (2m), Q14 (2m), Q15 (1m), Q16 (1m), Q17 (2m)
//
// Answer key confirmed from official key sheet (page 116)
// Total: 20 marks
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
  school: "Nan Hua Primary School",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "Term 3 Weighted Assessment 2025 (WA3)",
  year: 2025,
  totalMarks: 20,
  sections: [
    "Section A – Grammar MCQ (Q1–Q5, 5 × 1m = 5m)",
    "Section B – Vocabulary MCQ (Q6–Q10, 5 × 1m = 5m)",
    "Section C – Comprehension (Q11–Q17, 10m)",
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION A — Grammar MCQ  (Q1–Q5)
// Answer key: 3 4 4 3 3
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "NH25_A_Q01",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Ahmad was watching television when he _______ the doorbell ring.",
    options: {
      "1": "hear",
      "2": "hears",
      "3": "heard",
      "4": "hearing",
    },
    answer: "3",
    solution: {
      method: "Past Tense — Simultaneous Actions",
      steps: [
        "The main clause 'was watching' is in past continuous (past event in progress).",
        "A past simple event interrupted: 'when he _______ the doorbell ring'.",
        "Interrupting past action → simple past: 'heard'. ✓",
        "'hear' = base form (present); 'hears' = 3rd person present; 'hearing' = present participle.",
        "Answer: (3) heard.",
      ],
      tip: "Past continuous + when + past simple = ongoing action interrupted by a sudden event. 'Was watching when he heard.'",
    },
  },
  {
    kind: "A",
    id: "NH25_A_Q02",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The ceiling fan that spins _______ our heads makes the room much cooler.",
    options: {
      "1": "into",
      "2": "along",
      "3": "under",
      "4": "above",
    },
    answer: "4",
    solution: {
      method: "Prepositions of Location",
      steps: [
        "A ceiling fan is mounted on the ceiling — it is positioned ABOVE our heads (higher than head level).",
        "'Above' = at a higher position than. ✓",
        "'Under' = below — a ceiling fan would be above, not under, our heads.",
        "'Into' = movement entering; 'along' = beside/beside — not position-descriptors for a ceiling fan.",
        "Answer: (4) above.",
      ],
      tip: "Ceiling fan → ceiling = highest point → the fan is ABOVE our heads. 'Above' = higher than.",
    },
  },
  {
    kind: "A",
    id: "NH25_A_Q03",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "John accidentally added too _______ salt in his cooking. The soup was too salty.",
    options: {
      "1": "few",
      "2": "little",
      "3": "many",
      "4": "much",
    },
    answer: "4",
    solution: {
      method: "Quantifiers — Uncountable Noun",
      steps: [
        "'Salt' = uncountable noun (cannot be counted individually).",
        "For large amounts of uncountable nouns: 'too much'. ✓",
        "'Too many' = for countable nouns in excessive quantity.",
        "'Too few' = for countable nouns (not enough).",
        "'Too little' = for uncountable nouns (not enough) — opposite meaning here.",
        "Context: John added SO MUCH salt that the soup was salty → 'too much'. ✓",
        "Answer: (4) much.",
      ],
      tip: "MUCH = uncountable (too much salt/water/sugar). MANY = countable (too many apples/children).",
    },
  },
  {
    kind: "A",
    id: "NH25_A_Q04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Every morning, Julia _______ a cup of Milo before going to school.",
    options: {
      "1": "drink",
      "2": "drunk",
      "3": "drinks",
      "4": "drinking",
    },
    answer: "3",
    solution: {
      method: "Simple Present Tense — Routine + 3rd Person Singular",
      steps: [
        "'Every morning' = habitual routine → simple present tense.",
        "'Julia' = singular third person (she) → verb needs -s.",
        "'drinks' = 3rd person singular simple present. ✓",
        "'drink' = base form (for I/you/we/they).",
        "'drunk' = past participle (used in perfect tenses).",
        "'drinking' = present participle — needs auxiliary 'is'.",
        "Answer: (3) drinks.",
      ],
      tip: "Routine + every day/morning/week → simple present. He/she/it → add -s: drinks, eats, runs.",
    },
  },
  {
    kind: "A",
    id: "NH25_A_Q05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"I need a vase for _______ flowers," Tom said, holding the bunch carefully.',
    options: {
      "1": "this",
      "2": "that",
      "3": "these",
      "4": "those",
    },
    answer: "3",
    solution: {
      method: "Demonstrative Adjectives — Near + Plural",
      steps: [
        "Tom is HOLDING the bunch of flowers — they are close to him (near).",
        "'Flowers' = plural noun → need a plural demonstrative.",
        "'These' = plural + near. ✓",
        "'Those' = plural + far (not in his hands).",
        "'This/that' = singular — wrong for plural 'flowers'.",
        "Answer: (3) these.",
      ],
      tip: "Tom is holding the flowers = they are near him = 'these'. If pointing at flowers across the room = 'those'.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION B — Vocabulary MCQ  (Q6–Q10)
// Answer key: 4 2 2 3 3
// ════════════════════════════════════════════════════════════
const sectionB: QuestionTypeA[] = [
  {
    kind: "A",
    id: "NH25_B_Q06",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Tigers use their stripes to _______ themselves while hunting in tall grass.",
    options: {
      "1": "cover",
      "2": "shield",
      "3": "recycle",
      "4": "camouflage",
    },
    answer: "4",
    solution: {
      method: "Science Vocabulary — Animal Adaptations",
      steps: [
        "Tigers use stripes to blend into tall grass while hunting — this is camouflage.",
        "'Camouflage' = disguise by blending into the surroundings. ✓",
        "'Cover' = to put over something — not specific to blending in.",
        "'Shield' = to protect with a barrier — stripes don't form a physical barrier.",
        "'Recycle' = to reuse materials — completely unrelated.",
        "Answer: (4) camouflage.",
      ],
      tip: "Camouflage = blending into surroundings to hide. Many animals use stripes/spots to camouflage themselves.",
    },
  },
  {
    kind: "A",
    id: "NH25_B_Q07",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Tom woke up late for school. He ran _______ to catch his school bus.",
    options: {
      "1": "as hot as fire",
      "2": "as fast as lightning",
      "3": "as slow as a tortoise",
      "4": "as calm as the clear sky",
    },
    answer: "2",
    solution: {
      method: "Similes — Speed",
      steps: [
        "Tom is late and needs to catch the bus → he must run VERY FAST.",
        "'As fast as lightning' = extremely fast. ✓",
        "'As slow as a tortoise' = very slow — contradicts the urgency.",
        "'As hot as fire' / 'as calm as the clear sky' = not about speed.",
        "Answer: (2) as fast as lightning.",
      ],
      tip: "Speed similes: as fast as lightning/wind/an arrow = very fast. As slow as a tortoise/snail = very slow.",
    },
  },
  {
    kind: "A",
    id: "NH25_B_Q08",
    topic: "VocabMCQ",
    marks: 1,
    question: "Janet is a _______. She does research on species of plants.",
    options: {
      "1": "florist",
      "2": "botanist",
      "3": "zoologist",
      "4": "archaeologist",
    },
    answer: "2",
    solution: {
      method: "Occupations Vocabulary — Science",
      steps: [
        "Janet does research on species of PLANTS → science of plants.",
        "'Botanist' = a scientist who studies plants. ✓",
        "'Florist' = sells flowers/arranges them — not a researcher.",
        "'Zoologist' = studies animals, not plants.",
        "'Archaeologist' = studies ancient human civilisations through artefacts.",
        "Answer: (2) botanist.",
      ],
      tip: "Botany = study of plants → botanist. Zoology = animals → zoologist. Archaeology = ancient cultures → archaeologist.",
    },
  },
  {
    kind: "A",
    id: "NH25_B_Q09",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Pulau Ubin is a _______ area, so people are not allowed to take home any sea animals or plants.",
    options: {
      "1": "rural",
      "2": "coastal",
      "3": "protected",
      "4": "recreation",
    },
    answer: "3",
    solution: {
      method: "Context Vocabulary — Conservation",
      steps: [
        "Because of this status, people are NOT ALLOWED to take sea animals or plants → it's legally protected.",
        "'Protected' = officially preserved/guarded by law to conserve nature. ✓",
        "'Rural' = relating to the countryside — not specifically about conservation.",
        "'Coastal' = near the coast — true of Pulau Ubin, but doesn't explain the restriction.",
        "'Recreation' = leisure activities — doesn't explain why animals can't be taken.",
        "Answer: (3) protected.",
      ],
      tip: "'Protected area' = nature reserve where wildlife is legally protected. Taking animals/plants from it is illegal.",
    },
  },
  {
    kind: "A",
    id: "NH25_B_Q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The old door _______ loudly when David opened it. His father told him to oil it to stop the sound.",
    options: {
      "1": "shouted",
      "2": "sneezed",
      "3": "squeaked",
      "4": "squawked",
    },
    answer: "3",
    solution: {
      method: "Precise Onomatopoeia / Verb",
      steps: [
        "An old door makes a high-pitched noise when opened → needs to be oiled.",
        "'Squeaked' = made a high-pitched creaking/squeaky sound. ✓",
        "'Shouted' = a person's loud voice — doors don't shout.",
        "'Sneezed' = the sound of sneezing — not a door sound.",
        "'Squawked' = harsh bird-like call — not typical for door sounds.",
        "Answer: (3) squeaked.",
      ],
      tip: "Doors squeak when the hinges are dry. Oiling them removes the squeak. 'Squeak' = high-pitched friction sound.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION C — Comprehension (Q11–Q17)
// Answer key: Q11=The teacher-in-charge of the Drama Club (Miss Goh)
//             Q12=froze, Q13=i)practised lines in mirror ii)practised with brother
//             Q14=Emma was worried she might forget her lines + Emma knew many people were watching
//             Q15=2,3,1, Q16=anxious, Q17=being brave doesn't mean not being scared but trying
// ════════════════════════════════════════════════════════════

const compPassage = `
Emma loved to read stories and act them out at home. The teacher-in-charge of the Drama Club, Miss Goh, approached her to play the lead role in the upcoming school play. "You can do it!" she assured her, giving her a thumbs-up. Emma froze.

"What if I forget my lines?" she asked Mother that night.                        [line 5]

Mother smiled gently. "Being nervous is okay, Emma. The only way to get past fear is to face it," she advised.

Emma practised her lines in front of the mirror every day. She even practised them with her little brother, who giggled every time she made a funny voice. Still, as the performance day drew closer, the butterflies in Emma's stomach fluttered more wildly. She tried hard not to think about making mistakes.            [line 10]

Finally, the big day arrived. Emma peeked out from behind the curtain and saw a huge audience. Her heart pounded.

"I can do this," she whispered, recalling all her practice.

When the curtain rose and the spotlight hit her, Emma felt the fear, but she did not let it stop her. She spoke clearly, remembered all her lines, and even made the audience laugh.                                                         [line 15]

After the show, Miss Goh congratulated her and said, "You were amazing, Emma!"

Emma grinned as she stepped back. She had been nervous the whole time, but being brave didn't mean not being scared — it just meant trying. She was glad that she did just that.                                                            [line 20]
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "NH25_C_Comprehension",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension — Emma and the School Play (Q11–Q17)",
  passage: compPassage,
  questions: [
    {
      id: "NH25_C_Q11",
      marks: 1,
      question:
        "Who asked Emma to play the lead role in the school play? (1m)",
      answer:
        "The teacher-in-charge of the Drama Club, Miss Goh, asked Emma to play the lead role.",
      solution: {
        method: "Literal Retrieval",
        steps: [
          "Read: 'The teacher-in-charge of the Drama Club, Miss Goh, approached her to play the lead role in the upcoming school play.'",
          "The person who asked = Miss Goh / the teacher-in-charge of the Drama Club.",
          "Answer: The teacher-in-charge of the Drama Club (Miss Goh) asked Emma.",
        ],
        tip: "For 'who' questions, identify the person performing the action in the relevant sentence.",
      },
    },
    {
      id: "NH25_C_Q12",
      marks: 1,
      question:
        "Which word in paragraph 1 shows that Emma was feeling nervous? (1m)",
      answer: "froze",
      solution: {
        method: "Vocabulary in Context — Word Evidence",
        steps: [
          "Paragraph 1: 'The teacher-in-charge of the Drama Club, Miss Goh, approached her to play the lead role... Emma froze.'",
          "'Froze' = stopped moving suddenly, became still with shock or fear. ✓",
          "When people hear surprising/frightening news, they 'freeze' — this shows nervousness/shock.",
          "Answer: froze.",
        ],
        tip: "'Froze' = became completely still from fear/shock. It's the key word showing Emma's nervous reaction.",
      },
    },
    {
      id: "NH25_C_Q13",
      marks: 2,
      question:
        "What did Emma do to get ready for the play? (2m)\n\n i. _______\nii. _______",
      answer:
        "i. Emma practised her lines in front of the mirror every day.\nii. Emma practised her lines with her little brother.",
      solution: {
        method: "Retrieval — Two-Part Answer",
        steps: [
          "Look in the passage for how Emma prepared:",
          "Point 1: 'Emma practised her lines in front of the mirror every day.' ✓",
          "Point 2: 'She even practised them with her little brother…' ✓",
          "Both are methods of preparation she used to get ready for the play.",
          "Answer: (i) Practised lines in front of the mirror every day. (ii) Practised with her little brother.",
        ],
        tip: "For '2m' retrieval questions, you need TWO distinct pieces of evidence from the passage. Both must be clearly from the text.",
      },
    },
    {
      id: "NH25_C_Q14",
      marks: 2,
      question:
        "Based on the passage, which two of the following statements are true? Tick ✓ the two statements. (2m)\n□ Emma was worried she might forget her lines.\n□ Emma forgot her lines during the play.\n□ Emma knew many people were watching the play.\n□ Emma felt calm and confident before the show started.",
      answer:
        "✓ Emma was worried she might forget her lines.\n✓ Emma knew many people were watching the play.",
      solution: {
        method: "True/False — Multiple Select",
        steps: [
          "Statement 1: 'Emma was worried she might forget her lines.' → 'What if I forget my lines?' she asked Mother. ✓ TRUE.",
          "Statement 2: 'Emma forgot her lines during the play.' → 'she... remembered all her lines'. FALSE.",
          "Statement 3: 'Emma knew many people were watching.' → 'Emma peeked out... and saw a huge audience.' ✓ TRUE.",
          "Statement 4: 'Emma felt calm and confident before the show.' → 'the butterflies in Emma's stomach fluttered more wildly' / 'Her heart pounded.' FALSE.",
          "Answer: Statements 1 and 3 are true.",
        ],
        tip: "Always verify all four options before ticking. Even 'obvious' statements need text evidence.",
      },
    },
    {
      id: "NH25_C_Q15",
      marks: 1,
      question:
        "Write 1, 2 or 3 in the blanks below to indicate the order in which the events occurred in the passage. (1m)\n\n___ Mother encouraged Emma.\n___ Brother was amused by Emma.\n___ Miss Goh showed her confidence in Emma.",
      answer: "Mother encouraged Emma (2), Brother was amused (3), Miss Goh showed confidence (1).",
      solution: {
        method: "Sequencing Events",
        steps: [
          "Event 1 (first): Miss Goh approached Emma and said 'You can do it!' → Miss Goh showed confidence in her. ORDER: 1",
          "Event 2: Emma asked her mother 'What if I forget my lines?' → Mother smiled and encouraged her. ORDER: 2",
          "Event 3: Emma practised with her little brother who giggled. → Brother was amused. ORDER: 3",
          "Answer: Miss Goh (1), Mother encouraged (2), Brother amused (3).",
        ],
        tip: "Read the passage chronologically. First = earliest in the story. Miss Goh approached first; then Mother; then practice with brother.",
      },
    },
    {
      id: "NH25_C_Q16",
      marks: 1,
      question:
        "Tick ✓ your chosen answer.\n\nBased on lines 10–11, how did Emma feel when the performance day drew nearer?\n\nShe felt _______. (1m)\n□ anxious\n□ excited",
      options: { anxious: "anxious", excited: "excited" },
      answer: "anxious",
      solution: {
        method: "Inference — Emotion from Description",
        steps: [
          "Lines 10–11: 'as the performance day drew closer, the butterflies in Emma's stomach fluttered more wildly. She tried hard not to think about making mistakes.'",
          "'Butterflies in stomach' = nervousness/anxiety. 'Fluttered more wildly' = increasing anxiety.",
          "'Tried hard not to think about making mistakes' = worried about errors.",
          "All signs point to anxiety/nervousness = 'anxious'. ✓",
          "'Excited' = positive anticipation — but Emma is clearly stressed/worried, not excited.",
          "Answer: anxious.",
        ],
        tip: "'Butterflies in stomach' is a metaphor for nervousness/anxiety. More butterflies = more anxious.",
      },
    },
    {
      id: "NH25_C_Q17",
      marks: 2,
      question:
        "What lesson did Emma learn from the whole experience? (2m)",
      answer:
        "Emma learnt that being brave doesn't mean not being scared — it just means trying (facing your fear and doing it anyway).",
      solution: {
        method: "Inference — Theme / Moral Lesson",
        steps: [
          "Read the last paragraph (lines 19–22):",
          "'She had been nervous the whole time, but being brave didn't mean not being scared — it just meant trying.'",
          "Emma's lesson: Bravery is not the absence of fear; it is the act of trying despite fear.",
          "Full answer: Emma learnt that being brave didn't mean not being scared, but just meant trying.",
        ],
        tip: "For 'lesson/moral' questions, look at the LAST paragraph of the passage. Authors usually reveal the theme there.",
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
