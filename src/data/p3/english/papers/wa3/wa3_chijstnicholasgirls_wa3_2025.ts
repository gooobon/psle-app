// ============================================================
// CHIJ ST NICHOLAS GIRLS' SCHOOL (PRIMARY)
// Primary 3 English Language
// 2025 Term 3 Weighted Assessment — Paper 2 (Booklets A & B)
// Source: P3_English_WA3.pdf (pages 120–132)
//
// BOOKLET A (18 marks):
//   Section A — Grammar MCQ       (Q1–Q10,  10 × 1m)
//   Section B — Vocabulary MCQ    (Q11–Q14,  4 × 1m)
//   Section C — Visual Text MCQ   (Q15–Q18,  4 × 1m)
//
// BOOKLET B (10 marks):
//   Section D — Comprehension OE  (Q19–Q25, 10m)
//
// Total: 28 marks (Booklets A + B)
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
  school: "CHIJ St Nicholas Girls' School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "2025 Term 3 Weighted Assessment — Paper 2",
  year: 2025,
  totalMarks: 28,
  sections: [
    "Booklet A Section A – Grammar MCQ (Q1–Q10, 10 × 1m)",
    "Booklet A Section B – Vocabulary MCQ (Q11–Q14, 4 × 1m)",
    "Booklet A Section C – Visual Text MCQ (Q15–Q18, 4 × 1m)",
    "Booklet B Section D – Comprehension Open-ended (Q19–Q25, 10m)",
  ],
};

// ════════════════════════════════════════════════════════════
// BOOKLET A, SECTION A — Grammar MCQ  (Q1–Q10)
// Answer key: 3 1 2 4 1 1 1 2 3 4
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "CHIJSN25_A_Q01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "My brother forgot to bring his lunch so I shared _______ with him.",
    options: { "1": "me", "2": "my", "3": "mine", "4": "myself" },
    answer: "3",
    solution: {
      method: "Possessive Pronouns",
      steps: [
        "'I shared _______ with him' — the blank needs a possessive pronoun (my lunch = mine).",
        "'Mine' = possessive pronoun replacing 'my lunch' (my + noun → mine). ✓",
        "'Me' = object pronoun (e.g. 'he gave me') — wrong here.",
        "'My' = possessive adjective, needs a noun after it: 'my lunch'.",
        "'Myself' = reflexive pronoun — not needed here.",
        "Answer: (3) mine.",
      ],
      tip: "'Mine' stands alone (no noun after): 'It is mine.' / 'I shared mine.' vs 'my lunch' (needs a noun).",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q02",
    topic: "GrammarMCQ",
    marks: 1,
    question: "There are _______ apples left in the basket. We need to buy more.",
    options: { "1": "a few", "2": "a little", "3": "a bit of", "4": "a lot of" },
    answer: "1",
    solution: {
      method: "Quantifiers — Countable Nouns (Small Quantity)",
      steps: [
        "'Apples' = countable noun (individual items you can count).",
        "'A few' = a small number of (countable). ✓",
        "'A little' = a small amount of (uncountable) — wrong for countable apples.",
        "'A bit of' = informal for small amount, used with uncountable — wrong here.",
        "'A lot of' = many/much — contradicts 'we need to buy more' (implying not enough).",
        "Answer: (1) a few.",
      ],
      tip: "A few = small number of countable things. A little = small amount of uncountable things.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q03",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The agile cat swiftly jumped _______ the fence and ran into our neighbour's garden.",
    options: { "1": "on", "2": "over", "3": "under", "4": "beside" },
    answer: "2",
    solution: {
      method: "Prepositions of Movement",
      steps: [
        "The cat jumped to get past the fence — it went from one side to the other, going above it.",
        "'Over' = from one side to the other, going above. ✓",
        "'On' = on top of (resting) — the cat landed on the other side, didn't rest on the fence.",
        "'Under' = below/beneath — the cat went over, not under.",
        "'Beside' = next to — not a movement over the fence.",
        "Answer: (2) over.",
      ],
      tip: "'Jump over' = clear something from above. 'Jump on' = land on top. Cats jump over fences, frogs jump over logs.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q04",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Mr Lim _______ a book when the pizza delivery man rang the bell.",
    options: { "1": "read", "2": "reads", "3": "is reading", "4": "was reading" },
    answer: "4",
    solution: {
      method: "Past Continuous — Interrupted Action",
      steps: [
        "A past continuous action (ongoing) was interrupted by a simple past event (bell rang).",
        "Structure: [was/were + verb-ing] when [simple past].",
        "'Was reading' = past continuous — ongoing at the time of interruption. ✓",
        "'Read' = simple past — implies completed action, not ongoing.",
        "'Reads' = present tense — wrong for a past event.",
        "'Is reading' = present continuous — wrong tense.",
        "Answer: (4) was reading.",
      ],
      tip: "Past continuous + when + past simple = action in progress when something interrupted. 'Was reading when the bell rang.'",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q05",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"The swarm of locusts _______ flying towards the field of crops! What do we do?" cried the farmers in dismay.',
    options: { "1": "is", "2": "are", "3": "was", "4": "were" },
    answer: "1",
    solution: {
      method: "Subject-Verb Agreement — Collective Noun",
      steps: [
        "The subject is 'The swarm of locusts' — 'swarm' is a collective noun, treated as singular.",
        "Singular collective noun + present tense → 'is'. ✓",
        "The exclamation is happening right now (present tense) → present tense needed.",
        "'Are / were' = plural — wrong for singular collective noun 'swarm'.",
        "Answer: (1) is.",
      ],
      tip: "Collective nouns (swarm, flock, herd, pack, team) = singular → 'is/was'. A swarm IS, a flock IS.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q06",
    topic: "GrammarMCQ",
    marks: 1,
    question: "_______ my mother worries for my safety, I am confident I am able to go to school by myself.",
    options: { "1": "As", "2": "While", "3": "Unless", "4": "However" },
    answer: "1",
    solution: {
      method: "Concession Conjunctions",
      steps: [
        "The sentence shows contrast: mother worries BUT I am confident.",
        "'As' here = 'although/even though' (concession). ✓",
        "'While' = while/although — also possible, but 'As' is slightly more natural for this formal register.",
        "Wait — answer key says (1) As. Let's verify: 'As my mother worries..., I am confident' = although she worries, I am still confident. ✓",
        "'Unless' = if not — changes the meaning entirely.",
        "'However' = cannot start a subordinate clause like this; it's an adverb, not a conjunction.",
        "Answer: (1) As.",
      ],
      tip: "'As' can mean 'because', 'while', or 'although' depending on context. Here: 'As (= although) my mother worries, I am confident.'",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q07",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Min Hui might _______ at the talent time contest if she is able to recover from her sore throat in time.",
    options: { "1": "sing", "2": "sang", "3": "sung", "4": "sings" },
    answer: "1",
    solution: {
      method: "Modal Verb + Base Form",
      steps: [
        "After modal verbs (might, can, will, should, would, could), use the BASE form of the verb.",
        "'Might sing' = modal + base form. ✓",
        "'Sang' = simple past — cannot follow a modal verb.",
        "'Sung' = past participle — used in perfect tenses (has sung), not after modals.",
        "'Sings' = 3rd person present — cannot follow a modal verb.",
        "Answer: (1) sing.",
      ],
      tip: "MODAL + BASE FORM always: might sing, can run, will come, should go, would eat.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q08",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"You haven\'t seen my keys, _______ you?" asked Father, searching the drawer frantically.',
    options: { "1": "did", "2": "has", "3": "had", "4": "have" },
    answer: "4",
    solution: {
      method: "Question Tags — Present Perfect",
      steps: [
        "The main clause is: 'You haven't seen my keys' — present perfect, negative.",
        "Negative statement → positive tag.",
        "Auxiliary verb in main clause = 'have' (present perfect) → tag uses 'have'.",
        "'haven't... have you?' = the tag repeats the auxiliary 'have'. ✓",
        "'Did' = simple past auxiliary — wrong for present perfect.",
        "'Has' = 3rd person singular — 'you' takes 'have', not 'has'.",
        "Answer: (4) have.",
      ],
      tip: "Question tags mirror the auxiliary: haven't → have; didn't → did; wasn't → was. 'You haven't... have you?'",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q09",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"Shall we buy _______ vegetables? They look fresh," asked Grandma, holding a couple of stalks in her hands.',
    options: { "1": "this", "2": "that", "3": "these", "4": "those" },
    answer: "3",
    solution: {
      method: "Demonstratives — Near + Plural",
      steps: [
        "Grandma is HOLDING the vegetables — they are in her hands, near her.",
        "'Vegetables' = plural noun.",
        "'These' = plural + near. ✓",
        "'Those' = plural + far.",
        "'This/that' = singular — wrong for plural 'vegetables'.",
        "Answer: (3) these.",
      ],
      tip: "Grandma is holding them = they are near = 'these'. If pointing at vegetables across the market = 'those'.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_A_Q10",
    topic: "GrammarMCQ",
    marks: 1,
    question: "By the time Khairul and his family arrived at the cinema, the movie _______.",
    options: { "1": "starts", "2": "started", "3": "has started", "4": "had started" },
    answer: "4",
    solution: {
      method: "Past Perfect — Prior Past Action",
      steps: [
        "'By the time they arrived' = two past events; the movie starting happened BEFORE they arrived.",
        "When one past action happened before another past action → past perfect (had + past participle). ✓",
        "'Had started' = past perfect — indicates it started before the arrival. ✓",
        "'Started' = simple past — both actions same time level; doesn't convey 'before'.",
        "'Has started' = present perfect — wrong for a purely past context.",
        "Answer: (4) had started.",
      ],
      tip: "'By the time [simple past]... [past perfect]' = sequence: Movie had started (first) → they arrived (second).",
    },
  },
];

// ════════════════════════════════════════════════════════════
// BOOKLET A, SECTION B — Vocabulary MCQ (Q11–Q14)
// Answer key: 4 4 4 2
// ════════════════════════════════════════════════════════════
const sectionB: QuestionTypeA[] = [
  {
    kind: "A",
    id: "CHIJSN25_B_Q11",
    topic: "VocabMCQ",
    marks: 1,
    question: "The leopard crept up quietly on its _______ before pouncing on it.",
    options: { "1": "carnivore", "2": "herbivore", "3": "predator", "4": "prey" },
    answer: "4",
    solution: {
      method: "Vocabulary — Predator-Prey Relationship",
      steps: [
        "The leopard is sneaking up on something it wants to catch and eat → its victim/target.",
        "'Prey' = an animal hunted or caught by a predator for food. ✓",
        "'Predator' = the hunter (the leopard IS the predator).",
        "'Carnivore' = meat-eating animal — describes the leopard, not its target.",
        "'Herbivore' = plant-eating animal — not relevant to what the leopard is chasing.",
        "Answer: (4) prey.",
      ],
      tip: "Predator = hunter (e.g. lion, leopard). Prey = the hunted (e.g. deer, rabbit). The leopard hunts its prey.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_B_Q12",
    topic: "VocabMCQ",
    marks: 1,
    question: "The soldiers smeared green paint all over their faces to _______ themselves in the dense jungle.",
    options: { "1": "mask", "2": "cover", "3": "disguise", "4": "camouflage" },
    answer: "4",
    solution: {
      method: "Vocabulary — Military / Nature",
      steps: [
        "Soldiers painted their faces green to blend into the jungle environment.",
        "'Camouflage' = to disguise by making something look like its surroundings. ✓",
        "'Disguise' = change appearance to be unrecognisable — possible but 'camouflage' is more precise for jungle/military context.",
        "'Mask' = cover the face — a mask is a physical object, not what paint does.",
        "'Cover' = to place something over — too general.",
        "Answer: (4) camouflage.",
      ],
      tip: "Camouflage = blend into the environment. Used for military, animals, and nature. Green paint in jungle = camouflage.",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_B_Q13",
    topic: "VocabMCQ",
    marks: 1,
    question: "The peacock strutted proudly and fanned its long tail, showing off the _______ colours.",
    options: { "1": "dull", "2": "pale", "3": "vibrant", "4": "radiant" },
    answer: "4",
    solution: {
      method: "Vocabulary — Descriptive Adjectives",
      steps: [
        "A peacock is famous for its spectacular, brilliant, glowing tail colours.",
        "'Radiant' = emitting bright light; brilliantly beautiful and glowing. ✓",
        "'Vibrant' = also means bright and vivid — very close.",
        "Note: answer key says (4) = 'radiant'. Radiant implies glowing/luminous beauty; vibrant is vivid but not luminous.",
        "'Dull/pale' = opposite of bright — wrong for a peacock showing off.",
        "Answer: (4) radiant.",
      ],
      tip: "Radiant = glowing with light or beauty. Vibrant = vivid/intense. Both describe bright colours; a peacock's tail is radiant (luminously beautiful).",
    },
  },
  {
    kind: "A",
    id: "CHIJSN25_B_Q14",
    topic: "VocabMCQ",
    marks: 1,
    question: "The pickpocket glanced _______ to ensure no one was looking and fished out the victim's wallet.",
    options: { "1": "quietly", "2": "furtively", "3": "stealthily", "4": "cautiously" },
    answer: "2",
    solution: {
      method: "Precise Adverb — Secret/Sneaky Action",
      steps: [
        "The pickpocket checked secretly to make sure nobody saw — a secretive, sly glance.",
        "'Furtively' = in a way that attempts to avoid notice; secretively and guiltily. ✓",
        "'Stealthily' = moving carefully to avoid being heard or seen — more about movement than glancing.",
        "'Cautiously' = carefully to avoid danger — less about secrecy/guilt.",
        "'Quietly' = without making sound — not specifically about being secretive.",
        "Answer: (2) furtively.",
      ],
      tip: "Furtive = sneaky, secretive, guilty-looking. A criminal checking around = furtive. 'A furtive glance' is a fixed expression.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// BOOKLET A, SECTION C — Visual Text MCQ (Q15–Q18)
// Answer key: 4 4 3 2
// Visual Text: Plant Power Workshop advertisement
// ════════════════════════════════════════════════════════════

const visualTextPlant = `
DON'T MISS THIS EXCITING SCIENCE WORKSHOP!

PLANT POWER WORKSHOP!
Why are our Venus flytraps so special?
Unlike regular ones, our plants stay healthy for a long time.
So, even if it's your first time growing a plant, your plant will do well.

WORKSHOP A                               WORKSHOP B
For children aged 8–10                   For children aged 11–14
Date: 8 Sep 2025 to 10 Sep 2025         Date: 11 Sep 2025 to 13 Sep 2025
Time: 9.30 a.m. – 3.30 p.m. daily      Time: 9.30 a.m. – 5.30 p.m. daily
Fee: $60 per child                       Fee: $80 per child

Workshop A Activities:
• Watch a Venus Flytrap in action during the feeding session
• Be engaged in challenging games about plants
• Make a "Plant Detective" notebook and learn:
  ✓ about their habitats and diets
  ✓ how these unusual plants survive in the wild

Workshop B Activities:
• Watch a Venus Flytrap in action during the feeding session
• Set up own tank with bug-eating plants and bring your creation home
• Conduct fun experiments on Venus flytraps

Register at our website www.venusflytrap.com by 30 August 2025!

To enquire:
– call 6600 7788
– Mondays to Saturdays
– 9 a.m. to 5 p.m.
Limited vacancies. Act fast to avoid disappointment!
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "CHIJSN25_C_VisualText",
  topic: "VisualText",
  passageTitle: "Visual Text — Plant Power Workshop (Q15–Q18)",
  passage: visualTextPlant,
  questions: [
    {
      id: "CHIJSN25_C_Q15",
      marks: 1,
      question: "Which of the following activities is conducted in BOTH workshops?",
      options: {
        "1": "playing games",
        "2": "doing experiments",
        "3": "creating a notebook",
        "4": "feeding a Venus flytrap plant",
      },
      answer: "4",
      solution: {
        method: "Visual Text — Compare Two Columns",
        steps: [
          "Compare activities in Workshop A and Workshop B.",
          "Both list: 'Watch a Venus Flytrap in action during the feeding session'. ✓",
          "Games → Workshop A only.",
          "Experiments → Workshop B only.",
          "Plant Detective notebook → Workshop A only.",
          "Answer: (4) feeding a Venus flytrap plant.",
        ],
        tip: "For 'both workshops' questions, find the item listed under BOTH columns. Scan each option against both lists.",
      },
    },
    {
      id: "CHIJSN25_C_Q16",
      marks: 1,
      question: "The aim of the Power Plant Workshop advertisement is to _______.",
      options: {
        "1": "teach children interesting facts about the Venus flytraps",
        "2": "let children conduct experiments on Venus flytraps",
        "3": "inform others that their Venus flytraps are special",
        "4": "encourage children to sign up for their workshop",
      },
      answer: "4",
      solution: {
        method: "Visual Text — Overall Purpose of Advertisement",
        steps: [
          "An advertisement's primary purpose is always to persuade people to buy/participate.",
          "'Don't miss this exciting science workshop!' + register by 30 August → clear call to action.",
          "The workshop invites children to sign up. ✓",
          "Options 1–3 describe content/features, not the PRIMARY PURPOSE (which is to get registrations).",
          "Answer: (4) encourage children to sign up for their workshop.",
        ],
        tip: "Advertisements = persuasion. Primary purpose is always to get people to sign up/buy/attend. Content details are secondary.",
      },
    },
    {
      id: "CHIJSN25_C_Q17",
      marks: 1,
      question: "Twelve-year-old Jing Hui will _______ if she signs up for Workshop B.",
      options: {
        "1": "pay $60",
        "2": "play games",
        "3": "bring home a tank which she set up",
        "4": "observe how Venus flytraps survive in the wild",
      },
      answer: "3",
      solution: {
        method: "Visual Text — Specific Detail + Age",
        steps: [
          "12-year-old → Workshop B (ages 11–14).",
          "Workshop B activities: feeding session; set up own tank and BRING YOUR CREATION HOME; experiments.",
          "Option (3): 'bring home a tank which she set up' = matches 'bring your creation home'. ✓",
          "Option (1): $60 is Workshop A fee; Workshop B costs $80.",
          "Option (2): Games are Workshop A only.",
          "Option (4): Learning how plants survive in the wild = Workshop A (Plant Detective notebook).",
          "Answer: (3) bring home a tank which she set up.",
        ],
        tip: "Match the child's age to the correct workshop first, then check which activities belong to that workshop.",
      },
    },
    {
      id: "CHIJSN25_C_Q18",
      marks: 1,
      question: "Which of the following statements is true?",
      options: {
        "1": "Workshop A costs more than Workshop B.",
        "2": "The Venus flytrap plants provided at the workshop are healthier.",
        "3": "Every child who is interested in any of the workshops will have a place.",
        "4": "If Jeannie has an enquiry, she must call the hotline on Sunday before 5 p.m.",
      },
      answer: "2",
      solution: {
        method: "Visual Text — True/False Verification",
        steps: [
          "Option (1): A = $60, B = $80 → B costs MORE than A. FALSE.",
          "Option (2): 'Unlike regular ones, our plants stay healthy for a long time.' → The workshop's Venus flytraps are healthier than regular ones. ✓ TRUE.",
          "Option (3): 'Limited vacancies. Act fast to avoid disappointment!' → NOT every interested child will get a place. FALSE.",
          "Option (4): Enquiries: Monday to Saturday, 9am–5pm. Sundays are NOT included. FALSE.",
          "Answer: (2) The Venus flytrap plants provided at the workshop are healthier.",
        ],
        tip: "For True/False visual text: verify every detail against the text. Sunday = not included in Mon–Sat. 'Limited vacancies' = not everyone gets in.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// BOOKLET B, SECTION D — Comprehension (Q19–Q25)
// Passage: Tom stows away on a ship (adapted from 'My Father's Dragon')
// Answer key (inferred from passage):
//   Q19=(3)a cat, Q20=corn sack/a corn sack, Q21=tied the sack+climbed into a sack he emptied
//   Q22=(a)He scratched his head (strange/odd); (b)He thought it was another bag of corn
//   Q23=(A)hoisted, Q24=Tom escaped(3),merchant searched(2),Tom knew ship docked(1)
//   Q25=Tom had crept out of the sack and vanished into the night (so the sack was gone)
// ════════════════════════════════════════════════════════════

const compPassageD = `
The night wind howled. Tom slipped past the night watchman who was distracted by a cat and hid among wheat sacks aboard a ship. As he was struggling with hardships, he wanted to go to a different place for a fresh start. The ship sailed at dawn. For six days, he hid without being detected.

Finally, a sailor shouted, "Corn sacks to be unloaded at Cranberry Port!" Tom knew he would be sent home if he was discovered. With sailors fast approaching, he emptied one labelled 'Cranberry' into the sea before climbing inside. He did not look exactly like the other corn sacks, but time was running out. He had to think fast. Securing the sack with a rubber band, he held his breath, hoping he would not be found out.          [line 5—8]

As the sailors unloaded, one scratched his head and said, "Weirdest corn sack I've seen!"                                                             [line 10]

Another grabbed Tom's elbow and laughed. "Another bag of corn!" he announced. With all his might, he hoisted the sack of 'corn' and hurled it into the cargo net.

Later, Tom learned the merchant spent all day recounting the sacks, searching for the mysterious sack of 'corn'. He never found it because as soon as it was dark, Tom crept out of the sack happily and vanished into the night.              [line 15]

Adapted from 'My Father's Dragon' by Ruth Stiles Gannett
`;

const sectionD: PassageSet = {
  kind: "B",
  id: "CHIJSN25_D_Comprehension",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension — Tom's Escape on the Ship (Q19–Q25)",
  passage: compPassageD,
  questions: [
    {
      id: "CHIJSN25_D_Q19",
      marks: 1,
      question: "The night watchman was distracted by _______. [1m]",
      options: { "1": "corn sacks", "2": "the wind", "3": "a cat", "4": "Tom" },
      answer: "3",
      solution: {
        method: "Literal Retrieval",
        steps: [
          "Read: 'Tom slipped past the night watchman who was distracted by a cat.'",
          "The watchman was distracted by a CAT. ✓",
          "Answer: (3) a cat.",
        ],
        tip: "For MCQ comprehension, always find the specific detail in the text. 'Distracted by a cat' — exact match to option (3).",
      },
    },
    {
      id: "CHIJSN25_D_Q20",
      marks: 1,
      question: "What does 'one' in line 7 refer to? [1m]\n[Write only the answer in the box.]\n\nIt refers to a _______.",
      answer: "corn sack (labelled 'Cranberry')",
      solution: {
        method: "Pronoun Reference",
        steps: [
          "Line 7: '…he emptied ONE labelled 'Cranberry' into the sea before climbing inside.'",
          "'One' replaces the nearest applicable noun. Looking back: 'corn sacks to be unloaded.'",
          "'One' = one [corn sack] labelled 'Cranberry'.",
          "Answer: a corn sack (labelled Cranberry).",
        ],
        tip: "For 'one' as a pronoun, look at the nouns mentioned just before it in the sentence or paragraph.",
      },
    },
    {
      id: "CHIJSN25_D_Q21",
      marks: 2,
      question: "How did Tom use his quick thinking to hide from the sailors? [2m]\n[Choose TWO actions by indicating with a tick.]\n\n□ He tied the sack.\n□ He realised that he would be sent home.\n□ He hid for six days without being found out.\n□ He went to a different place for a fresh start.\n□ He climbed into a sack that he had emptied.",
      answer: "✓ He tied the sack.\n✓ He climbed into a sack that he had emptied.",
      solution: {
        method: "Inference — Quick Thinking Actions",
        steps: [
          "The question asks specifically for Tom's QUICK THINKING to hide from sailors (when they were approaching).",
          "Action 1: 'Securing the sack with a rubber band' = He tied the sack. ✓",
          "Action 2: 'he emptied one labelled Cranberry... before climbing inside' = climbed into a sack he emptied. ✓",
          "'Realised he would be sent home' = realisation, not an action.",
          "'Hid for six days' = earlier action, not the quick thinking moment.",
          "'Different place/fresh start' = motivation, not quick thinking action.",
        ],
        tip: "The question asks specifically about quick thinking when sailors approached (lines 5–8). Focus on actions IN THAT MOMENT.",
      },
    },
    {
      id: "CHIJSN25_D_Q22",
      marks: 2,
      question: "Give a reason for each statement in the table below. [2m]\n\n(a) True: The first sailor noticed something strange about the corn sack he was about to unload.\n    He _______ [reason]\n\n(b) False: The second sailor knew Tom was in the sack.\n    He thought _______ [reason]",
      answer: "(a) He scratched his head (noticed the sack looked unusual / weirdest corn sack he'd seen).\n(b) He thought it was another bag of corn / it was a regular corn sack.",
      solution: {
        method: "True/False with Evidence",
        steps: [
          "(a) The first sailor said 'Weirdest corn sack I've seen!' and scratched his head → TRUE: he noticed something strange.",
          "Reason: He scratched his head (sign of puzzlement) because the sack looked different from the others.",
          "(b) The second sailor 'grabbed Tom's elbow and laughed. Another bag of corn!' → FALSE: he didn't know Tom was inside.",
          "He thought the sack was just another ordinary bag of corn.",
          "Answer: (a) He scratched his head and said it was the weirdest corn sack he'd seen. (b) He thought it was just another bag of corn.",
        ],
        tip: "True/False with reason: find text evidence. First sailor was puzzled (scratched head). Second sailor laughed and treated it as normal corn.",
      },
    },
    {
      id: "CHIJSN25_D_Q23",
      marks: 1,
      question: "Which word in paragraph 4 showed that it took a lot of strength to lift the sack? [1m]\n[Write only the required word.]\n\n'With all his might, he (A)hoisted the sack of 'corn' and (B)hurled it into the cargo net.'",
      options: { A: "hoisted", B: "hurled" },
      answer: "A",
      solution: {
        method: "Vocabulary — Synonym Identification",
        steps: [
          "'Took a lot of strength' = required physical effort.",
          "'Hoisted' = to lift or pull something heavy upward using great effort. ✓",
          "'Hurled' = to throw with great force — about speed/force of throwing, not the effort of lifting.",
          "The question is about LIFTING (strength) not throwing. 'Hoisted' = lifted with effort.",
          "Answer: (A) hoisted.",
        ],
        tip: "Hoist = lift something heavy with effort. 'Hoist a flag', 'hoist heavy cargo'. It specifically involves strength to raise.",
      },
    },
    {
      id: "CHIJSN25_D_Q24",
      marks: 1,
      question: "Put these events in the right sequence. Write 1, 2 and 3 on the lines. [1m]\n\n___ Tom escaped from the ship.\n___ Tom heard that the merchant searched for the sack of dried corn.\n___ Tom knew the ship had docked at Cranberry Port.",
      answer: "Tom escaped (3), merchant searched (2), Tom knew ship docked (1).",
      solution: {
        method: "Sequencing Events",
        steps: [
          "Event 1: A sailor shouted 'Corn sacks to be unloaded at Cranberry Port!' → Tom KNEW the ship docked. ORDER: 1",
          "Event 2: 'Tom learned the merchant spent all day recounting the sacks' → HEARD about searching. ORDER: 2",
          "Event 3: 'Tom crept out of the sack happily and vanished into the night.' → ESCAPED. ORDER: 3",
          "Answer: Docked at Cranberry (1), merchant searched (2), Tom escaped (3).",
        ],
        tip: "Follow the passage chronologically. Docked → merchant searched all day → Tom escaped at dark.",
      },
    },
    {
      id: "CHIJSN25_D_Q25",
      marks: 2,
      question: "In the last paragraph, why do you think the merchant never found the 'sack of corn'? [2m]\n[Write your answer in complete sentences.]\n\nTom had _______ and _______.",
      answer: "Tom had crept out of the sack and vanished into the night, so when the merchant searched, the sack was empty / Tom was gone.",
      solution: {
        method: "Inference — Cause and Effect",
        steps: [
          "The merchant searched for the 'mysterious sack of corn' all day.",
          "But: 'as soon as it was dark, Tom crept out of the sack happily and vanished into the night.'",
          "The merchant couldn't find it BECAUSE Tom had already escaped — the sack was no longer unusual (or Tom/sack was gone).",
          "Full answer: Tom had crept out of the sack and vanished into the night (so the mysterious 'sack' was no longer there).",
        ],
        tip: "Answer the 'why' by connecting: merchant searched all day → Tom escaped at night → by the time merchant looked again, the unusual sack/Tom was gone.",
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
];

export default {
  meta,
  questions,
};
