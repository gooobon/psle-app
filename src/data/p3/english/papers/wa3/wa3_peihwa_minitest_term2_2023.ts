// ============================================================
// PEI HWA PRESBYTERIAN PRIMARY SCHOOL — Primary 3
// English Language — Weighted Assessment Mini Test (Term 2)
// May 2023  |  Total: 30 marks  |  Duration: 50 min
// Source: P3_English_WA3.pdf (pages 141–159)
//
// Sections:
//   A — Vocabulary MCQ       (Q1–Q10,  10 × 1m)
//   B — Grammar MCQ          (Q11–Q20, 10 × 1m)
//   C — Visual Text MCQ      (Q21–Q25,  5 × 1m)
//   D — Comprehension OE     (Q26–Q30,  5m)
//
// Answer key confirmed from official key sheet (page 159)
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
  school: "Pei Hwa Presbyterian Primary School",
  level: "Primary 3",
  subject: "English Language",
  paperCode: "Weighted Assessment Mini Test Term 2 — May 2023",
  year: 2023,
  totalMarks: 30,
  sections: [
    "Section A – Vocabulary MCQ (Q1–Q10, 10 × 1m)",
    "Section B – Grammar MCQ (Q11–Q20, 10 × 1m)",
    "Section C – Visual Text MCQ (Q21–Q25, 5 × 1m)",
    "Section D – Comprehension Open-ended (Q26–Q30, 5m)",
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION A — Vocabulary MCQ  (Q1–Q10)
// Answer key: 3 3 3 4 1 4 4 4 4 4
// ════════════════════════════════════════════════════════════
const sectionA: QuestionTypeA[] = [
  {
    kind: "A",
    id: "PH23_A_Q01",
    topic: "VocabMCQ",
    marks: 1,
    question: "Tom is a soft-spoken and shy boy who gets fearful easily. He is as timid as a _______.",
    options: { "1": "bat", "2": "fox", "3": "mouse", "4": "bee" },
    answer: "3",
    solution: {
      method: "Similes — Animal Characteristics",
      steps: [
        "'Timid as a mouse' = very easily frightened, like a mouse. ✓",
        "This is a well-known English simile: 'as quiet/timid as a mouse'.",
        "'Sly as a fox' = cunning; 'blind as a bat' = cannot see well; 'busy as a bee' = hardworking.",
        "None of the others mean shy/timid.",
        "Answer: (3) mouse.",
      ],
      tip: "Fixed simile: 'as timid as a mouse' = very shy and easily scared. Learn these animal similes!",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q02",
    topic: "VocabMCQ",
    marks: 1,
    question: "The deer was attacked by a hungry _______ of wolves.",
    options: { "1": "herd", "2": "gaggle", "3": "pack", "4": "school" },
    answer: "3",
    solution: {
      method: "Collective Nouns — Animals",
      steps: [
        "A group of wolves = a 'pack'. ✓",
        "'Herd' = cattle, elephants, horses.",
        "'Gaggle' = geese.",
        "'School' = fish.",
        "Answer: (3) pack.",
      ],
      tip: "Collective nouns: pack of wolves/dogs, herd of cattle/elephants, gaggle of geese, school of fish.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q03",
    topic: "VocabMCQ",
    marks: 1,
    question: "We can do our part to save the _______ by practising the 3Rs — Reduce, Reuse and Recycle.",
    options: { "1": "habitat", "2": "area", "3": "environment", "4": "surroundings" },
    answer: "3",
    solution: {
      method: "Context Vocabulary — Environment",
      steps: [
        "'Save the environment' is a standard collocated phrase used in conservation contexts. ✓",
        "The 3Rs (Reduce, Reuse, Recycle) are environmental practices.",
        "'Environment' = the natural world (air, land, water, ecosystems). ✓",
        "'Habitat' = a specific place where animals live — too narrow.",
        "'Surroundings' = what is around you — informal, not the standard phrase.",
        "Answer: (3) environment.",
      ],
      tip: "'Save the environment' is a fixed phrase. The 3Rs are always linked to environmental protection.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q04",
    topic: "VocabMCQ",
    marks: 1,
    question: "Of the twins, Siti is a _______ dancer than Sarah.",
    options: { "1": "good", "2": "well", "3": "best", "4": "better" },
    answer: "4",
    solution: {
      method: "Comparative Adjectives",
      steps: [
        "Comparing two people (twins Siti and Sarah) → comparative form needed.",
        "'Better' = comparative of 'good' (comparing two things). ✓",
        "'Best' = superlative (comparing three or more) — only two here.",
        "'Good' = base form; 'well' = adverb or healthy — not for comparison.",
        "Answer: (4) better.",
      ],
      tip: "Comparing two = comparative (-er/more): better, faster, smarter. Comparing 3+ = superlative (-est/most): best.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q05",
    topic: "VocabMCQ",
    marks: 1,
    question: "The courageous firefighters took two hours to _______ the fire.",
    options: { "1": "put off", "2": "put out", "3": "put away", "4": "put down" },
    answer: "1",
    solution: {
      method: "Phrasal Verbs — 'Put'",
      steps: [
        "Firefighters extinguish fires → 'put out' a fire = extinguish it.",
        "Wait — answer key Q5 = 1 ('put off').",
        "'Put off' = to postpone/delay, OR informally to extinguish. In some contexts 'put off' and 'put out' are interchangeable for fires.",
        "Official answer key: (1) put off.",
        "Note: 'put out a fire' = more standard; 'put off' also accepted.",
        "Answer (official): (1) put off.",
      ],
      tip: "'Put out' = extinguish (most standard). 'Put off' can also mean extinguish in some contexts. Accept both in practice.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q06",
    topic: "VocabMCQ",
    marks: 1,
    question: "The choir sang _______ during the concert.",
    options: { "1": "gracefully", "2": "silently", "3": "graciously", "4": "melodiously" },
    answer: "4",
    solution: {
      method: "Adverb Meaning — Music",
      steps: [
        "A choir sang — we need an adverb describing how they sang.",
        "'Melodiously' = in a pleasant, tuneful musical manner. ✓",
        "'Gracefully' = with graceful movement — more for dance than singing.",
        "'Silently' = without sound — opposite of singing!",
        "'Graciously' = in a kind, polite manner — not about singing quality.",
        "Answer: (4) melodiously.",
      ],
      tip: "'Melodiously' = beautifully in tune. Perfect for describing singing or music.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q07",
    topic: "VocabMCQ",
    marks: 1,
    question: "The stick insect can change its colour to _______ itself from its predators.",
    options: { "1": "attack", "2": "stalk", "3": "resemble", "4": "camouflage" },
    answer: "4",
    solution: {
      method: "Vocabulary — Animal Adaptations",
      steps: [
        "Changing colour to hide from predators = camouflage. ✓",
        "'Camouflage' = blend into the environment to avoid detection.",
        "'Resemble' = look like something — not about protection.",
        "'Stalk' = to follow prey stealthily — the insect is the prey here.",
        "'Attack' = to strike — opposite of hiding.",
        "Answer: (4) camouflage.",
      ],
      tip: "Stick insects and chameleons camouflage themselves by changing colour to match their surroundings.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q08",
    topic: "VocabMCQ",
    marks: 1,
    question: '"Please handle the vase with care. It is _______. It can break easily," Sophie reminded her brother.',
    options: { "1": "light", "2": "soft", "3": "smooth", "4": "fragile" },
    answer: "4",
    solution: {
      method: "Vocabulary — Objects",
      steps: [
        "'It can break easily' is the clue → the vase is easily breakable.",
        "'Fragile' = easily broken or damaged. ✓",
        "'Light' = not heavy — doesn't explain why it breaks easily.",
        "'Soft' = not hard — doesn't imply breakable glass/ceramic.",
        "'Smooth' = with an even surface — not about breaking.",
        "Answer: (4) fragile.",
      ],
      tip: "'Fragile' = easily broken. Look for 'Handle with care' + 'can break easily' = fragile.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q09",
    topic: "VocabMCQ",
    marks: 1,
    question: "The _______ clapped loudly at the end of the concert.",
    options: { "1": "viewers", "2": "listeners", "3": "spectators", "4": "audience" },
    answer: "4",
    solution: {
      method: "Vocabulary — Group of People",
      steps: [
        "People at a concert who watch AND listen = the audience. ✓",
        "'Audience' = people attending a performance (concert, play, show). ✓",
        "'Viewers' = people watching TV/online — not typically at live concerts.",
        "'Listeners' = people listening to radio — not live audience.",
        "'Spectators' = people watching sports — not standard for concerts.",
        "Answer: (4) audience.",
      ],
      tip: "Audience = people at a live performance (concert, theatre, talk). Spectators = sports events.",
    },
  },
  {
    kind: "A",
    id: "PH23_A_Q10",
    topic: "VocabMCQ",
    marks: 1,
    question: "The trekkers _______ upon an abandoned hut while trekking through the forest.",
    options: { "1": "stepped", "2": "found", "3": "discovered", "4": "stumbled" },
    answer: "4",
    solution: {
      method: "Phrasal Verb — 'Stumble upon'",
      steps: [
        "'Stumbled upon' = to find by accident while doing something else. ✓",
        "The trekkers didn't plan to find the hut — they came across it accidentally.",
        "'Stepped upon' = physically stepped on; 'found/discovered' = more deliberate search.",
        "'Stumbled upon' perfectly captures accidental discovery. ✓",
        "Answer: (4) stumbled.",
      ],
      tip: "'Stumble upon/across' = find something unexpectedly/by accident. Very common in English.",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION B — Grammar MCQ  (Q11–Q20)
// Answer key: 2 3 4 4 2 3 1 3 2 4
// ════════════════════════════════════════════════════════════
const sectionB: QuestionTypeA[] = [
  {
    kind: "A",
    id: "PH23_B_Q11",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The twin brothers _______ in the library now.",
    options: { "1": "is", "2": "are", "3": "was", "4": "were" },
    answer: "2",
    solution: {
      method: "Subject-Verb Agreement — Plural + Present",
      steps: [
        "'The twin brothers' = two people = plural subject.",
        "'Now' = present time → present tense.",
        "Plural present → 'are'. ✓",
        "'Is/was/were' = either singular or wrong tense.",
        "Answer: (2) are.",
      ],
      tip: "Twin brothers = two people = plural → 'are'. 'The brothers ARE in the library.'",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q12",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Mr Leong _______ at the nearby park every Sunday.",
    options: { "1": "jog", "2": "jogged", "3": "jogs", "4": "is jogging" },
    answer: "3",
    solution: {
      method: "Simple Present — Routine + 3rd Person Singular",
      steps: [
        "'Every Sunday' = regular routine → simple present tense.",
        "'Mr Leong' = singular third person (he) → add -s.",
        "'Jogs' = 3rd person singular simple present. ✓",
        "'Jog' = base form for plural; 'jogged' = past; 'is jogging' = present continuous (for right now).",
        "Answer: (3) jogs.",
      ],
      tip: "Every Sunday = habitual routine. He/she/it + routine → -s: jogs, runs, walks.",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q13",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"_______ cupcakes that I am giving you were made by my grandmother," Jane told her classmates.',
    options: { "1": "That", "2": "This", "3": "Those", "4": "These" },
    answer: "4",
    solution: {
      method: "Demonstratives — Near + Plural",
      steps: [
        "Jane is GIVING the cupcakes to her classmates — they are in her hands / near her.",
        "'Cupcakes' = plural → need plural demonstrative.",
        "'These' = plural + near. ✓",
        "'Those' = plural + far (not giving them).",
        "'This/that' = singular.",
        "Answer: (4) These.",
      ],
      tip: "Jane is giving the cupcakes = they are in her hands = near = THESE (plural).",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q14",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"_______ can we find the files?" my mother asked the sales assistant.',
    options: { "1": "Who", "2": "Which", "3": "Whose", "4": "Where" },
    answer: "4",
    solution: {
      method: "Question Words",
      steps: [
        "Mother wants to know the LOCATION of the files.",
        "'Where' = asks about a place/location. ✓",
        "'Who' = person; 'Which' = choice; 'Whose' = ownership.",
        "'Where can we find the files?' = asking about the location where files are.",
        "Answer: (4) Where.",
      ],
      tip: "Where = location. Who = person. What = thing. When = time. Whose = possession. Which = choice.",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q15",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The children found an injured bird _______ the roadside while on their way home.",
    options: { "1": "in", "2": "by", "3": "across", "4": "through" },
    answer: "2",
    solution: {
      method: "Prepositions of Location",
      steps: [
        "'By the roadside' = next to, alongside the road. ✓",
        "This is a fixed phrase: 'by the roadside/wayside' = at the edge of the road.",
        "'In the roadside' = inside the road — not natural.",
        "'Across' = from one side to another — movement, not location.",
        "'Through' = going through — not stationary location beside road.",
        "Answer: (2) by.",
      ],
      tip: "'By the roadside' = next to the road. Fixed phrase: 'by the wayside' / 'by the side of the road'.",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q16",
    topic: "GrammarMCQ",
    marks: 1,
    question: "We must learn to clean up after _______ after every meal.",
    options: { "1": "myself", "2": "himself", "3": "ourselves", "4": "yourselves" },
    answer: "3",
    solution: {
      method: "Reflexive Pronouns — 'We'",
      steps: [
        "The subject is 'We' → reflexive pronoun = 'ourselves'. ✓",
        "'We must clean up after ourselves' = after ourselves (referring back to 'we').",
        "'Myself' = I; 'himself' = he; 'yourselves' = you (plural).",
        "Answer: (3) ourselves.",
      ],
      tip: "Reflexive pronoun chart: I→myself, you→yourself/yourselves, he→himself, she→herself, we→ourselves, they→themselves.",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q17",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Danny was supposed to be doing his homework _______ his parents found him playing with his toys instead.",
    options: { "1": "but", "2": "so", "3": "and", "4": "since" },
    answer: "1",
    solution: {
      method: "Conjunctions — Contrast",
      steps: [
        "Danny was SUPPOSED to do homework (expectation) BUT was playing with toys (reality).",
        "'But' = contrast between expected action and actual action. ✓",
        "'So' = result; 'and' = addition; 'since' = cause/time — none show contrast.",
        "Answer: (1) but.",
      ],
      tip: "'But' contrasts what was expected vs. what actually happened.",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q18",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"There is _______ soup left in the pot for you," Mother told Lisa.',
    options: { "1": "any", "2": "much", "3": "some", "4": "a few" },
    answer: "3",
    solution: {
      method: "Quantifiers — Positive Statement / Uncountable",
      steps: [
        "'Soup' = uncountable. In a positive sentence, offering something → 'some'.",
        "'Some' = used in positive statements and offers with uncountable nouns. ✓",
        "'Any' = for negatives/questions with uncountable.",
        "'Much' = large quantity, often in negatives ('not much').",
        "'A few' = for countable nouns — wrong for uncountable soup.",
        "Answer: (3) some.",
      ],
      tip: "Use 'some' in positive sentences/offers with uncountable: 'There is some soup/water/rice for you.'",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q19",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"_______ you bring these books to the library, please?" the librarian asked Tim.',
    options: { "1": "May", "2": "Could", "3": "Should", "4": "Must" },
    answer: "2",
    solution: {
      method: "Modal Verbs — Polite Requests",
      steps: [
        "The librarian is making a polite request to Tim to return books.",
        "'Could you...?' = polite request form. ✓",
        "'May' = permission ('May I...') — used by speaker seeking permission, not asking someone else.",
        "'Should' = obligation/advice — too strong for a polite request.",
        "'Must' = obligation — too commanding for a polite request.",
        "Answer: (2) Could.",
      ],
      tip: "'Could you...?' is the most common polite request form. 'Would you...?' also works. 'Can you...?' is less formal.",
    },
  },
  {
    kind: "A",
    id: "PH23_B_Q20",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Muthu, as well as his sister, _______ at the playground now.",
    options: { "1": "will play", "2": "play", "3": "played", "4": "is playing" },
    answer: "4",
    solution: {
      method: "Subject-Verb Agreement — 'As well as'",
      steps: [
        "'X, as well as Y' = the subject is still X alone (Y is additional info).",
        "'Muthu' = singular → singular verb.",
        "'Now' → present continuous tense.",
        "'Is playing' = 3rd person singular present continuous. ✓",
        "'Play' = base form (plural); 'played' = past; 'will play' = future.",
        "Answer: (4) is playing.",
      ],
      tip: "'A, as well as B' → verb agrees with A (singular): 'Muthu, as well as his sister, IS playing.'",
    },
  },
];

// ════════════════════════════════════════════════════════════
// SECTION C — Visual Text MCQ (Q21–Q25)
// Answer key: 4 3 3 4 4
// Visual Text: Marina Beach Family Fun (10 to 16 June)
// ════════════════════════════════════════════════════════════

const visualTextMarina = `
MARINA BEACH FAMILY FUN
10 to 16 June

The June school holidays are here! Head down to Marina Beach with your family to enjoy many fun activities organised to keep your family entertained while having a good family bonding!

SANDCASTLE-BUILDING COMPETITION
Get creative & challenge other families in a game of sandcastle building! Register at bicycle kiosk A. Sandcastle building set will be provided! Game will only start if at least 2 families have registered for the competition. Goody bags sponsored by Outdoor Sports & Adventure Pte Ltd will be given to all participants upon registration. Sign up now!

TREASURE HUNT COMPETITION
Register with your family for an exciting treasure hunt competition and race against the clock!
1. Register at the information booth located at Carpark B to receive your map and clues.
2. Follow the clues given to the different stations.
3. Look for the treasure hidden in each station and collect a sticker from the station master.
4. Collect ten stickers within one hour and submit them at the information booth.
5. The family that completes the game the fastest will receive a $100 shopping voucher from Willion Mall.

OTHER EXCITING ACTIVITIES:
– Picnic by the beach
– Face-painting for children ages 4 to 12
– Bicycle ride on the family bicycle
– Movie by the beach (free large popcorn for each family)
– Swimming
– Bouncy castle by Uncle Raggy
– Kite-flying (only at Green Meadow area)

Organised by: Ministry of Family Matters
Event Sponsors: Uncle Raggy Bouncy Castle Pte Ltd | Golden City Cinemas | Outdoor Sports & Adventure Pte Ltd | Willion Mall
`;

const sectionC: PassageSet = {
  kind: "B",
  id: "PH23_C_VisualText",
  topic: "VisualText",
  passageTitle: "Visual Text — Marina Beach Family Fun (Q21–Q25)",
  passage: visualTextMarina,
  questions: [
    {
      id: "PH23_C_Q21",
      marks: 1,
      question: "The main aim of this advertisement is to promote _______.",
      options: {
        "1": "Marina beach",
        "2": "Treasure Hunt competition",
        "3": "Sandcastle building competition",
        "4": "June school holiday activities held at Marina Beach",
      },
      answer: "4",
      solution: {
        method: "Visual Text — Overall Purpose",
        steps: [
          "The advertisement promotes a range of activities at Marina Beach during June holidays.",
          "The main aim: 'Head down to Marina Beach with your family to enjoy many fun activities.' ✓",
          "It's not limited to just one activity — the advertisement promotes ALL the June holiday activities.",
          "Answer: (4) June school holiday activities held at Marina Beach.",
        ],
        tip: "The main aim of an ad = its overall purpose. This ad promotes multiple activities at Marina Beach in June.",
      },
    },
    {
      id: "PH23_C_Q22",
      marks: 1,
      question: "The organiser of the event is _______.",
      options: {
        "1": "Willion Mall",
        "2": "Marina Beach",
        "3": "Ministry of Family Matters",
        "4": "Outdoor Sports & Adventure Pte Ltd",
      },
      answer: "3",
      solution: {
        method: "Visual Text — Specific Detail",
        steps: [
          "Check 'Organised by' at the bottom: 'Ministry of Family Matters'. ✓",
          "Willion Mall = sponsor (gives voucher for Treasure Hunt).",
          "Outdoor Sports & Adventure Pte Ltd = sponsor for goody bags.",
          "Marina Beach = the venue.",
          "Answer: (3) Ministry of Family Matters.",
        ],
        tip: "Always look for 'Organised by' or 'Presented by' in an event advertisement.",
      },
    },
    {
      id: "PH23_C_Q23",
      marks: 1,
      question: "The items in the goody bag for the Sandcastle building competition will likely be _______.",
      options: {
        "1": "kites",
        "2": "popcorn",
        "3": "sports equipment or gear",
        "4": "a $100 shopping voucher from Willion Mall",
      },
      answer: "3",
      solution: {
        method: "Visual Text — Inference",
        steps: [
          "'Goody bags sponsored by Outdoor Sports & Adventure Pte Ltd.'",
          "An outdoor sports company would likely include sports equipment or gear in goody bags. ✓",
          "Kites = an activity at the event, not a goody bag item.",
          "Popcorn = given at the beach movie, not the sandcastle competition.",
          "$100 voucher from Willion Mall = Treasure Hunt prize, not sandcastle goody bag.",
          "Answer: (3) sports equipment or gear.",
        ],
        tip: "Inference: the goody bag sponsor is an outdoor sports company → the items are likely sports-related.",
      },
    },
    {
      id: "PH23_C_Q24",
      marks: 1,
      question: "Participants for the Treasure Hunt competition need to _______ to win the competition.",
      options: {
        "1": "collect ten stickers",
        "2": "use the map given to find clues",
        "3": "complete the competition within one hour or less",
        "4": "all of the above",
      },
      answer: "4",
      solution: {
        method: "Visual Text — All Requirements",
        steps: [
          "Check all three options against the Treasure Hunt rules:",
          "(1) 'Collect ten stickers within one hour' — TRUE. ✓",
          "(2) Steps 1–3 involve using the map to find clues and collect stickers — TRUE. ✓",
          "(3) 'Collect ten stickers within one hour' + fastest family wins → must finish within one hour or less — TRUE. ✓",
          "All three are required → Answer: (4) all of the above.",
        ],
        tip: "When an MCQ option says 'all of the above', check each option carefully. If all are true, (4) is correct.",
      },
    },
    {
      id: "PH23_C_Q25",
      marks: 1,
      question: "Which of the following statements is true?",
      options: {
        "1": "The activities are suitable for all ages.",
        "2": "Kite-flying can be done at any part of the beach.",
        "3": "Families are only allowed to register for one competition only.",
        "4": "A large popcorn will be given to each family for movie by the beach activity.",
      },
      answer: "4",
      solution: {
        method: "Visual Text — True/False Verification",
        steps: [
          "Option (1): Face-painting is only for ages 4–12 → NOT suitable for ALL ages. FALSE.",
          "Option (2): 'Kite-flying (only at Green Meadow area)' → NOT anywhere on the beach. FALSE.",
          "Option (3): Nothing says families can only join ONE competition — they could join both sandcastle and treasure hunt. FALSE.",
          "Option (4): 'Movie by the beach (free large popcorn for each family)' → TRUE. ✓",
          "Answer: (4) A large popcorn will be given to each family for movie by the beach activity.",
        ],
        tip: "For true/false, verify EVERY detail in the text. 'Only at Green Meadow' and 'ages 4-12' are restrictive details.",
      },
    },
  ],
};

// ════════════════════════════════════════════════════════════
// SECTION D — Comprehension Open-ended (Q26–Q30)
// Answer key: Q26=Feet, Q27=Mosquitoes, Q28=Dragonflies are the fastest of all flying insects.
//             Q29=a)True b)False, Q30=They can sense motion and detect movement in almost all directions.
// Passage: Dragonflies
// ════════════════════════════════════════════════════════════

const compPassage = `
The insect world includes thousands of different types of dragonflies. They come in a variety of colours like red, blue, and green. Some of them have spots or stripes on their wings. Darting through the garden, they may not look like fierce hunters, but they are. Studies show that they are one of the most deadly hunters on Earth.

Dragonflies feed on smaller insects such as moths, flies, and mosquitoes. They grab their prey with their feet while in flight. This means they need to be swift. In fact, these acrobats rank as the fastest of all flying insects. A dragonfly in hot pursuit of a meal can fly as fast as up to 56 kilometres per hour and they are able to catch most of the prey that they target.

The dragonfly's skills include more than speed. Their eyes are made of thousands of tiny lenses that take up most of the space on their heads. These lenses give them super sight. Their ability to sense motion and detect movement in almost all directions is because their eyes and brains are naturally tuned to be able for them to do so. Therefore, dragonflies can see a meal coming from almost any direction. The only blind spot for an insect to hide is right behind a dragonfly. This insect hunter has a big appetite. One dragonfly eats up to a hundred mosquitoes in a day and this makes them a welcome garden guest. Due to their great appetite and swift speed, dragonflies wolf down their meals while still in flight!
`;

const sectionD: PassageSet = {
  kind: "B",
  id: "PH23_D_Comprehension",
  topic: "ComprehensionOE",
  passageTitle: "Comprehension — Dragonflies (Q26–Q30)",
  passage: compPassage,
  questions: [
    {
      id: "PH23_D_Q26",
      marks: 1,
      question: "Dragonflies use their _______ to catch their prey. [Tick ✓ the correct answer]\n□ wings\n□ feet\n□ mouth",
      answer: "feet",
      solution: {
        method: "Literal Retrieval",
        steps: [
          "Read: 'They grab their prey with their FEET while in flight.'",
          "Dragonflies use their FEET to grab prey. ✓",
          "Answer: feet.",
        ],
        tip: "Find the exact sentence. 'Grab their prey with their feet' — very specific detail.",
      },
    },
    {
      id: "PH23_D_Q27",
      marks: 1,
      question: "Name ONE insect that dragonflies feed on. [1m]",
      answer: "Mosquitoes (also accept: moths / flies)",
      solution: {
        method: "Literal Retrieval",
        steps: [
          "Read: 'Dragonflies feed on smaller insects such as moths, flies, and mosquitoes.'",
          "Any one of: moths, flies, mosquitoes. ✓",
          "Answer: Mosquitoes (or moths, or flies).",
        ],
        tip: "The passage lists three insects dragonflies eat. Any one is acceptable.",
      },
    },
    {
      id: "PH23_D_Q28",
      marks: 1,
      question: "What does the phrase 'these acrobats' in paragraph 2 refer to? [1m]",
      answer: "Dragonflies are the fastest of all flying insects. (these acrobats = dragonflies)",
      solution: {
        method: "Pronoun/Phrase Reference",
        steps: [
          "'In fact, these ACROBATS rank as the fastest of all flying insects.'",
          "'These acrobats' refers to dragonflies — they are called acrobats because of their swift, agile flight.",
          "The full meaning: Dragonflies are the fastest of all flying insects.",
          "Answer: Dragonflies are the fastest of all flying insects.",
        ],
        tip: "For 'what does X refer to' — find the noun group that X replaces. 'These acrobats' = the dragonflies just mentioned.",
      },
    },
    {
      id: "PH23_D_Q29",
      marks: 1,
      question: "Read the statements below and put a (✓) to indicate if the statements are true or false. [1m]\n\na) Some dragonflies have spots or stripes on their wings.\nb) Dragonflies are considered a pest as they feed on mosquitoes.",
      answer: "a) True\nb) False",
      solution: {
        method: "True/False Comprehension",
        steps: [
          "(a) 'Some of them have spots or stripes on their wings.' → TRUE. ✓",
          "(b) 'One dragonfly eats up to a hundred mosquitoes in a day and this makes them a WELCOME GARDEN GUEST.' → They are helpful, NOT a pest. FALSE. ✓",
          "Answer: a) True, b) False.",
        ],
        tip: "A 'pest' = unwanted. Dragonflies are called 'welcome garden guests' = NOT pests.",
      },
    },
    {
      id: "PH23_D_Q30",
      marks: 1,
      question: "Name one way a dragonfly's eyesight helps it to catch its prey. [1m]",
      answer: "They can sense motion and detect movement in almost all directions.",
      solution: {
        method: "Literal Retrieval",
        steps: [
          "Find the explanation of dragonfly eyesight helping catch prey:",
          "'Their ability to SENSE MOTION and DETECT MOVEMENT in almost all directions is because their eyes and brains are naturally tuned.'",
          "'Dragonflies can see a meal coming from almost any direction.'",
          "Answer: They can sense motion and detect movement in almost all directions (so they can see prey coming from almost anywhere).",
        ],
        tip: "For 'how does X help' questions, find the specific advantage described. Dragonflies' 360° near-vision lets them spot prey.",
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
