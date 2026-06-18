// ============================================================
// Catholic High School (Primary) — P3 English EOY 2022
// Paper 2  (50 marks — Sections A-B: 14m, Sections C-I: 36m)
// Section A : Grammar MCQ        (Q1–8,   8 marks)
// Section B : Vocabulary MCQ     (Q9–14,  6 marks)
// Section C : Grammar Cloze      (Q15–18, 4 marks) — Storytelling Competition
// Section D : Grammar Cloze 2    (Q19–22, 4 marks) — Dolphin Island
// Section E : Vocabulary Cloze   (Q23–25, 3 marks) — Ukulele
// Section F : Editing (Spelling) (Q26–30, 5 marks) — Carla the tennis player
// Section G : Comprehension Cloze(Q31–34, 4 marks) — Pizza vending machine
// Section H : Comprehension SR+OE(Q35–42, 8 marks) — Felix, Damian & the cat
// Section I : Comprehension OE   (Q43–46, 8 marks) — Keegan's aeroplane
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  SECTION A — Grammar MCQ (Q1–8, 8 marks)
// ============================================================

const sectionA: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chs_eoy2022_A_01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The burglar ___ the moment the siren rang.",
    options: ["fled", "flee", "flees", "was fleeing"],
    answer: 0,
    solution: {
      method: "Simple Past Tense — specific past moment",
      steps: [
        "'The moment the siren rang' = a completed past event.",
        "Simple Past is used for completed actions at a specific past time.",
        "'fled' = Simple Past of 'flee' (irregular verb) ✓.",
        "'flee' = base form — cannot stand alone as past tense.",
        "'flees' = Simple Present — wrong tense for a past event.",
        "'was fleeing' = Past Continuous — would suggest an action already in progress when interrupted, but here the burglar flees AS SOON AS (the moment) the siren rang — a completed, immediate reaction.",
        "Answer: (1) fled.",
      ],
      tip: "'Flee → fled' is an irregular verb (like fly→flew, see→saw). 'The moment' signals an immediate past reaction → Simple Past. 'The burglar fled the moment he heard the police' = he ran away immediately.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_02",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Faizal and Jasmal enjoy playing sports together. ___ favourite pastime is playing badminton.",
    options: ["Our", "Ours", "Their", "Theirs"],
    answer: 2,
    solution: {
      method: "Possessive adjective vs pronoun — modifying a noun",
      steps: [
        "'___ favourite pastime' — the blank comes BEFORE the noun 'pastime'.",
        "When a possessive word comes before a noun, it is a POSSESSIVE ADJECTIVE (my, your, his, her, its, our, their).",
        "Faizal and Jasmal = two people (plural, third-person) = 'their' ✓.",
        "'Their favourite pastime' = the pastime belonging to them ✓.",
        "'Theirs' = possessive PRONOUN — stands alone, cannot precede a noun ('Theirs is badminton', NOT 'Theirs pastime').",
        "'Our' = first-person plural — we are not Faizal and Jasmal.",
        "Answer: (3) Their.",
      ],
      tip: "THEIR (adjective) + noun: 'their pastime', 'their school'. THEIRS (pronoun) stands alone: 'That book is theirs.' Before a noun → use the adjective form (their).",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_03",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Lina made a mess on the table as she had used too ___ glue for her artwork.",
    options: ["few", "little", "many", "much"],
    answer: 3,
    solution: {
      method: "Quantifiers — countable vs uncountable + 'too'",
      steps: [
        "'glue' is an UNCOUNTABLE noun (you can't count individual glues).",
        "For uncountable nouns, use 'much' (not 'many') in negative/question contexts, and 'too much' for excess.",
        "'too much glue' = an excessive, unnecessary amount ✓.",
        "'many' is used with COUNTABLE plural nouns: too many books, too many students.",
        "'few' is for countable nouns: too few chairs.",
        "'little' means 'not much' — 'too little glue' would mean not enough, but she made a mess, so she used TOO MUCH, not too little.",
        "Answer: (4) much.",
      ],
      tip: "Uncountable nouns: much/little (how MUCH water?). Countable nouns: many/few (how MANY apples?). 'Too much glue' = she used more glue than needed, causing a mess.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Devi loves eating durians ___ her siblings do not.",
    options: ["as", "so", "while", "since"],
    answer: 2,
    solution: {
      method: "Conjunctions — contrast",
      steps: [
        "The sentence shows a CONTRAST: Devi loves durians, but her siblings do NOT.",
        "'while' is used to show contrast between two facts/situations ✓.",
        "'Devi loves durians while her siblings do not' = Devi loves them but her siblings do not like them.",
        "'as' = similarity or time ('as she was eating') — not contrast.",
        "'so' = result — 'Devi loves durians so her siblings do not' makes no logical sense.",
        "'since' = reason or time — not contrast.",
        "Answer: (3) while.",
      ],
      tip: "'While' shows contrast when referring to simultaneous situations: 'Some people like durians while others hate them.' It's like 'whereas' or 'but'. Don't confuse with 'while' for time (happening at the same time).",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Take a look at ___ ants here! They are moving in a single trail," said Jess, feeling amazed.',
    options: ["this", "that", "these", "those"],
    answer: 2,
    solution: {
      method: "Demonstrative adjectives — proximity and number",
      steps: [
        "'___ ants here' — 'here' signals the ants are NEAR the speaker.",
        "'ants' is PLURAL.",
        "Near + plural = 'these' ✓.",
        "'those' = plural + FAR — but 'here' means near.",
        "'this' = singular + near — 'ants' is plural.",
        "'that' = singular + far — both wrong.",
        "Answer: (3) these.",
      ],
      tip: "The word 'here' always signals NEARNESS → use this/these. 'There' signals distance → use that/those. 'Ants' is plural → these (near) or those (far). 'Here' → these ants ✓.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Last week, one of the Basketball CCA members ___ voted to be the captain.",
    options: ["were", "was", "are", "is"],
    answer: 1,
    solution: {
      method: "Subject-verb agreement + past tense with 'one of'",
      steps: [
        "Time clue: 'Last week' = past tense.",
        "Subject: 'one of the Basketball CCA members' — 'one of [plural noun]' takes a SINGULAR verb.",
        "Past tense of 'is/are' for singular = 'was'.",
        "'was' = singular past ✓.",
        "'were' = plural past — wrong for 'one of'.",
        "'are/is' = present tense — wrong for 'last week'.",
        "Answer: (2) was.",
      ],
      tip: "KEY RULE: 'One of [plural noun]' always takes a SINGULAR verb. 'One of the members WAS' ✓, never 'One of the members WERE' ✗. The verb agrees with 'one', not with 'members'.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_07",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Mother ___ in the kitchen when the doorbell rang.",
    options: ["cooks", "cooked", "is cooking", "was cooking"],
    answer: 3,
    solution: {
      method: "Past Continuous — interrupted background action",
      steps: [
        "'When the doorbell rang' = Simple Past interrupting action.",
        "Pattern: Past Continuous + when + Simple Past.",
        "Mother was in the middle of cooking (ongoing action) when doorbell rang (interruption).",
        "'was cooking' = Past Continuous for singular subject 'Mother' ✓.",
        "'cooked' = Simple Past — would mean she finished cooking, then the doorbell rang.",
        "'is cooking' / 'cooks' = present tense — wrong for a past story.",
        "Answer: (4) was cooking.",
      ],
      tip: "This question appeared in CHS WA1 too! 'When + Simple Past' triggers Past Continuous for the background action. Mother WAS COOKING (the ongoing movie) WHEN the doorbell RANG (the interruption).",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_A_08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The pupils will work on their class project later, ___?",
    options: ["won't they?", "don't they?", "will they?", "do they?"],
    answer: 0,
    solution: {
      method: "Question tags — future positive statement",
      steps: [
        "Main clause: 'The pupils WILL work...' = POSITIVE statement with modal 'will'.",
        "Rule: Positive statement → NEGATIVE question tag.",
        "The auxiliary is 'will' → negative form = 'won't'.",
        "Subject: 'the pupils' → pronoun = 'they'.",
        "Correct tag: 'won't they?' ✓.",
        "'will they?' = positive tag — wrong for a positive statement.",
        "'don't they?' / 'do they?' = wrong auxiliary — the main verb uses 'will', not 'do'.",
        "Answer: (1) won't they?",
      ],
      tip: "Question tag formula: 1) Find the auxiliary (will/is/have/do etc.), 2) Make it negative if statement is positive, 3) Replace subject with pronoun. 'Will work' → 'won't they?' ✓.",
    },
  },
];

// ============================================================
//  SECTION B — Vocabulary MCQ (Q9–14, 6 marks)
// ============================================================

const sectionB: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chs_eoy2022_B_09",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Last weekend, a ___ of dancers performed at the National Concert Hall.",
    options: ["band", "choir", "board", "company"],
    answer: 3,
    solution: {
      method: "Collective nouns for performers",
      steps: [
        "'___ of dancers' — we need the collective noun for a group of dancers.",
        "'company' = a collective noun for a group of dancers or performers ✓. ('a dance company')",
        "'band' = collective for musicians: 'a band of musicians/brothers'. Not standard for dancers.",
        "'choir' = collective for singers: 'a choir of singers'. Not for dancers.",
        "'board' = a group of directors/officials ('board of directors'). Not performers.",
        "Answer: (4) company.",
      ],
      tip: "Collective nouns for performing arts: a COMPANY of dancers/actors, a BAND of musicians, a CHOIR of singers, a TROUPE of performers. 'Dance company' is the standard term.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_B_10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "We had to call a ___ as we had lost the key to the main door.",
    options: ["cobbler", "plumber", "locksmith", "electrician"],
    answer: 2,
    solution: {
      method: "Vocabulary — professions and their specialties",
      steps: [
        "Context: Lost the key to the main door → need someone who works with locks and keys.",
        "'locksmith' = a person who makes, repairs, and opens locks and keys ✓.",
        "'cobbler' = a person who repairs shoes.",
        "'plumber' = a person who installs and repairs water pipes.",
        "'electrician' = a person who works with electrical wiring and systems.",
        "Answer: (3) locksmith.",
      ],
      tip: "Match the professional to their work: LOCKSMITH (locks/keys/doors), PLUMBER (pipes/water), ELECTRICIAN (wires/electricity), COBBLER (shoes), CARPENTER (wood), GLAZIER (glass).",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_B_11",
    topic: "VocabMCQ",
    marks: 1,
    question: "The cheetah is ___ to catch its prey.",
    options: ["sprinting", "scurrying", "swooping", "scrambling"],
    answer: 0,
    solution: {
      method: "Vocabulary — manner of movement + animal behaviour",
      steps: [
        "Context: A cheetah catching prey — cheetahs are famous for their extreme speed.",
        "'sprinting' = running very fast for a short distance ✓ — the cheetah is the world's fastest land animal.",
        "'scurrying' = moving quickly with short steps (used for small animals like mice/rats) — too small-scale for a cheetah.",
        "'swooping' = diving downward from height (used for birds of prey like eagles/hawks).",
        "'scrambling' = moving hastily using hands and feet, or climbing awkwardly — not how cheetahs move.",
        "Answer: (1) sprinting.",
      ],
      tip: "Animal movement vocabulary: SPRINT (cheetah, runner — flat-out fast), SWOOP (hawk, eagle — dive from sky), SCURRY (mouse, ant — quick tiny steps), LEAP (frog, cat — jump). Cheetahs are famous for SPRINTING.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_B_12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "As a form of protection, some lizards can ___ themselves by changing their body colours to blend into the surroundings.",
    options: ["cover", "defend", "disguise", "camouflage"],
    answer: 3,
    solution: {
      method: "Vocabulary — precise word for colour-changing concealment",
      steps: [
        "Context: Lizards change body colour to blend into surroundings = a natural concealment technique.",
        "'camouflage' = to conceal/hide by blending into surroundings using colour/pattern ✓.",
        "'camouflage themselves' = make themselves blend in visually — exact match for colour-changing lizards.",
        "'disguise' = to change appearance to look like something else — usually implies an active costume, not natural colour change.",
        "'defend' = to protect against attack — more general, doesn't specify HOW.",
        "'cover' = to put something over — doesn't describe colour-changing.",
        "Answer: (4) camouflage.",
      ],
      tip: "'Camouflage' is specifically about blending into the background using colour/pattern — exactly what chameleons and some lizards do. It comes from military usage (camouflage uniforms) but applies perfectly to nature.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_B_13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Mingzhe is ___. He keeps stepping on his partner's feet during the dance practices.",
    options: [
      "as tall as a giraffe",
      "as strong as an ox",
      "as clumsy as a bear",
      "as big as an elephant",
    ],
    answer: 2,
    solution: {
      method: "Simile — matching animal to behaviour",
      steps: [
        "Context: Mingzhe keeps stepping on his partner's feet during dance = he is CLUMSY.",
        "'as clumsy as a bear' = bears are associated with being big and awkward/clumsy ✓.",
        "The simile must describe CLUMSINESS — stepping on feet is a clumsy action.",
        "'as tall as a giraffe' = height — not relevant to stepping on feet.",
        "'as strong as an ox' = strength — not relevant.",
        "'as big as an elephant' = size — not relevant to clumsiness.",
        "Answer: (3) as clumsy as a bear.",
      ],
      tip: "Match the simile to the CHARACTER TRAIT shown by the evidence. Stepping on feet during dance = CLUMSY → 'clumsy as a bear'. Bears are famously seen as big and ungraceful despite being powerful.",
    },
  },
  {
    kind: "single",
    id: "chs_eoy2022_B_14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "It is important to check your work ___ before submitting it.",
    options: ["deliberately", "thoroughly", "attentively", "closely"],
    answer: 1,
    solution: {
      method: "Adverbs — most precise word for careful checking",
      steps: [
        "Context: Checking work before submitting — implies going through everything completely.",
        "'thoroughly' = in a complete, detailed, and careful way ✓. 'Check thoroughly' = check everything completely.",
        "'deliberately' = intentionally, on purpose — implies intent, not carefulness of checking.",
        "'attentively' = with great attention — possible but 'attentively' is more for listening/watching.",
        "'closely' = in close detail — similar to thoroughly but 'thoroughly' implies COMPLETENESS (nothing missed), which is more important for checking work.",
        "Answer: (2) thoroughly.",
      ],
      tip: "'Thoroughly' means completely and carefully, leaving nothing out: 'Read thoroughly', 'clean thoroughly', 'check thoroughly'. It's the best word when you want to say 'check EVERYTHING carefully'.",
    },
  },
];

// ============================================================
//  SECTION C — Grammar Cloze: Prepositions (Q15–18, 4 marks)
//  Passage: Annual Storytelling Competition
//  Word bank: A=for, B=in, C=of, D=on, E=to, F=with
// ============================================================

export const sectionC_gc: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_C_gc",
  topic: "GrammarCloze",
  passage:
    "It was morning assembly. I heard the prefect making an announcement through the loudspeaker (15) ___ my classroom, 'This is a reminder for those who have signed up (16) ___ the Annual Storytelling Competition to go (17) ___ the hall at 2 p.m.' I was really looking forward to taking part in the competition as the first prize would be the latest model (18) ___ MacBook Air. I could not wait for school to end and for the competition to start.\n\n[Word bank: A=for, B=in, C=of, D=on, E=to, F=with]",
  questions: [
    {
      id: "chs_eoy2022_C_15",
      marks: 1,
      question: "...the loudspeaker (15) ___ my classroom\n[Word bank: A=for, B=in, C=of, D=on, E=to, F=with]",
      answer: "B (in)",
      solution: {
        method: "Preposition of place — inside a room",
        steps: [
          "'through the loudspeaker ___ my classroom' — where is the loudspeaker?",
          "The loudspeaker is INSIDE the classroom → preposition = 'in'.",
          "'in my classroom' = inside my classroom ✓.",
          "'on' = on the surface/wall — 'the loudspeaker on the wall of my classroom' would work but 'in' is used here for the general location.",
          "Answer: B (in).",
        ],
        tip: "Use 'in' for being inside an enclosed space: in the classroom, in the room, in the hall. The announcement was heard IN (inside) the classroom.",
      },
    },
    {
      id: "chs_eoy2022_C_16",
      marks: 1,
      question: "...for those who have signed up (16) ___ the Annual Storytelling Competition\n[Word bank: A=for, B=in, C=of, D=on, E=to, F=with]",
      answer: "A (for)",
      solution: {
        method: "Preposition collocation — 'sign up for'",
        steps: [
          "The phrasal verb is 'sign up ___' + the event.",
          "Fixed collocation: 'sign up FOR something' = to register for/enroll in something ✓.",
          "'sign up for the competition' = to register to participate in the competition.",
          "'sign up to' would need a verb ('sign up to participate'), not a noun.",
          "Answer: A (for).",
        ],
        tip: "Fixed phrase: SIGN UP FOR [event/activity]. 'She signed up for the swimming class.' 'They signed up for the competition.' Always 'for' after 'sign up' when followed by a noun.",
      },
    },
    {
      id: "chs_eoy2022_C_17",
      marks: 1,
      question: "...to go (17) ___ the hall at 2 p.m.\n[Word bank: A=for, B=in, C=of, D=on, E=to, F=with]",
      answer: "E (to)",
      solution: {
        method: "Preposition of direction — movement toward a place",
        steps: [
          "'go ___ the hall' — 'go' indicates movement toward a destination.",
          "When showing direction/destination, use 'to': 'go TO the hall' ✓.",
          "'go to [place]' = move in the direction of a place.",
          "'go in the hall' would mean movement inside the hall (already there).",
          "Answer: E (to).",
        ],
        tip: "GO + TO = movement toward a destination: 'go to school', 'go to the hall', 'go to the park'. 'To' shows the destination of movement.",
      },
    },
    {
      id: "chs_eoy2022_C_18",
      marks: 1,
      question: "...the latest model (18) ___ MacBook Air\n[Word bank: A=for, B=in, C=of, D=on, E=to, F=with]",
      answer: "C (of)",
      solution: {
        method: "Preposition — 'model of' showing type/kind",
        steps: [
          "'the latest model ___ MacBook Air'",
          "'model of [product]' = a particular version/type of a product ✓.",
          "'the latest model of MacBook Air' = the newest version of the MacBook Air ✓.",
          "This is like saying 'the latest version of something'.",
          "'of' shows what kind/type the model is.",
          "Answer: C (of).",
        ],
        tip: "'Model of' = a type/version of something: 'the latest model of iPhone', 'a model of the Eiffel Tower'. 'Of' shows what the model represents or belongs to.",
      },
    },
  ],
};

// ============================================================
//  SECTION D — Grammar Cloze 2: SVA (Q19–22, 4 marks)
//  Passage: "Dolphin Island" movie review
// ============================================================

export const sectionD_gc2: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_D_gc2",
  topic: "GrammarCloze",
  passage:
    '"Dolphin Island" is a delightful family movie. It (19) [is / are] about a 12-year-old girl, Lynn, and her grandfather, looking after a marine conservation centre on a tropical island. Trouble (20) [begin / begins] when Lynn\'s wealthy parents decide they (21) [want / wants] to migrate to a different country. However, Lynn (22) [do / does] not want to leave her dolphin friends. She wants to remain on the island with her grandfather.\n\nAdapted from: https://www.movieguide.org/reviews/dolphin-island.html',
  questions: [
    {
      id: "chs_eoy2022_D_19",
      marks: 1,
      question: "It (19) [is / are] about a 12-year-old girl...",
      answer: "is",
      solution: {
        method: "Subject-verb agreement — 'it' is singular",
        steps: [
          "Subject: 'It' = singular third-person pronoun (referring to the movie).",
          "Singular subject → 'is' ✓.",
          "'are' = plural — wrong for 'It'.",
          "Answer: is.",
        ],
        tip: "It → is (always singular). We/They → are (plural). He/She/It → is; I → am; You/We/They → are.",
      },
    },
    {
      id: "chs_eoy2022_D_20",
      marks: 1,
      question: "Trouble (20) [begin / begins] when Lynn's wealthy parents decide...",
      answer: "begins",
      solution: {
        method: "Subject-verb agreement — 'Trouble' is singular uncountable",
        steps: [
          "Subject: 'Trouble' = uncountable noun → treated as SINGULAR.",
          "Singular subject in Simple Present → add -s: 'begins' ✓.",
          "'begin' = base form, used for plural/first-person — wrong for 'Trouble'.",
          "Answer: begins.",
        ],
        tip: "Uncountable nouns (trouble, news, information, advice) are always SINGULAR and take -s/-es verbs: 'Trouble begins', 'Good news arrives', 'The information is...'.",
      },
    },
    {
      id: "chs_eoy2022_D_21",
      marks: 1,
      question: "Lynn's wealthy parents decide they (21) [want / wants] to migrate...",
      answer: "want",
      solution: {
        method: "Subject-verb agreement — 'they' is plural",
        steps: [
          "Subject: 'they' = third-person PLURAL pronoun.",
          "Plural subject → base form: 'want' ✓.",
          "'wants' = singular (he/she/it) — wrong for 'they'.",
          "Answer: want.",
        ],
        tip: "'They' is always plural → base verb (want, go, like). Only he/she/it/singular nouns take -s/-es.",
      },
    },
    {
      id: "chs_eoy2022_D_22",
      marks: 1,
      question: "However, Lynn (22) [do / does] not want to leave...",
      answer: "does",
      solution: {
        method: "Subject-verb agreement — auxiliary in negative sentence",
        steps: [
          "Subject: 'Lynn' = singular third-person (she).",
          "Negative sentence with 'do': for singular subjects → 'does not' ✓.",
          "'do not' = used for I/you/we/they.",
          "'does not' = used for he/she/it/singular nouns like 'Lynn'.",
          "Answer: does.",
        ],
        tip: "Negatives: I/You/We/They + DO not. He/She/It/Lynn + DOES not. 'Lynn does not want' ✓.",
      },
    },
  ],
};

// ============================================================
//  SECTION E — Vocabulary Cloze (Q23–25, 3 marks)
//  Passage: The Ukulele
//  Word bank: different, introduced, materials, objects, similar, started
// ============================================================

export const sectionE_vc: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_E_vc",
  topic: "VocabCloze",
  passage:
    "The ukulele is a musical instrument in the string family. In 1929, it was (23) ___ in Japan and became popular there. The original ukuleles were made of wood. Nowadays, many are made of other (24) ___ such as plastic which makes them cheaper for consumers to buy. Ukuleles look (25) ___ to a guitar and are also played in the same way by plucking at the strings. Most ukuleles have four strings but some have as many as eight strings.\n\nAdapted from: https://www.softschools.com/facts/music_instruments/ukulele_facts/3065/\n\n[Word bank: different / introduced / materials / objects / similar / started]",
  questions: [
    {
      id: "chs_eoy2022_E_23",
      marks: 1,
      question: "In 1929, it was (23) ___ in Japan and became popular there.",
      answer: "introduced",
      solution: {
        method: "Vocabulary cloze — context of bringing something new to a place",
        steps: [
          "In 1929, the ukulele came to Japan for the first time and became popular.",
          "'introduced' = brought to a new place/market for the first time ✓.",
          "'When something is introduced to a place' = when it is brought there newly.",
          "'started' = began — 'it was started in Japan' would mean it originated in Japan (but it's Portuguese/Hawaiian in origin).",
          "Answer: introduced.",
        ],
        tip: "'Introduce' means to bring something to a new place or audience for the first time: 'Tea was introduced to England in the 17th century.' 'The iPhone was introduced in 2007.'",
      },
    },
    {
      id: "chs_eoy2022_E_24",
      marks: 1,
      question: "Nowadays, many are made of other (24) ___ such as plastic...",
      answer: "materials",
      solution: {
        method: "Vocabulary cloze — what things are made of",
        steps: [
          "'made of other ___' — what can things be made of?",
          "'materials' = the substance/matter from which something is made ✓.",
          "'Wood' and 'plastic' are both MATERIALS.",
          "'objects' = things — you cannot be 'made of other objects'.",
          "Answer: materials.",
        ],
        tip: "'Materials' = substances used to make things: wood, plastic, metal, fabric, glass. 'Made of other materials such as plastic' = constructed from different substances.",
      },
    },
    {
      id: "chs_eoy2022_E_25",
      marks: 1,
      question: "Ukuleles look (25) ___ to a guitar and are also played in the same way...",
      answer: "similar",
      solution: {
        method: "Vocabulary cloze — comparison adjective",
        steps: [
          "'look ___ to a guitar' — comparing the ukulele's appearance to a guitar.",
          "'similar to' = resembling, looking like ✓. 'look similar to' = look like.",
          "Clue: 'also played in the same way' confirms they are alike.",
          "'different' = not alike — contradicts 'also played in the same way'.",
          "Fixed phrase: 'similar TO' (not similar 'as' or similar 'from').",
          "Answer: similar.",
        ],
        tip: "Fixed phrase: SIMILAR TO. 'This looks similar to that.' 'Ukuleles look similar to guitars.' Compare: DIFFERENT FROM (not 'different to' or 'different than' in standard Singapore English).",
      },
    },
  ],
};

// ============================================================
//  SECTION F — Editing: Spelling (Q26–30, 5 marks)
//  Passage: Carla the tennis player
// ============================================================

export const sectionF_editing: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_F_editing",
  topic: "Editing",
  passage:
    "Carla took part in a major tennis competition. She was (26)[desappointed] when she lost the match by just two points. The 32-year-old had many (27)[suppoters] in the spectator stand and she felt bad for letting them down. She was so close to (28)[viktory].\n\nCarla's competitor, Mandy, was much (29)[yaunger] than her but had great (30)[strugled] skills. She strugled to keep up with Mandy's energy. Although Carla had lost, she vowed to train hard for the next competition.",
  questions: [
    {
      id: "chs_eoy2022_F_26",
      marks: 1,
      question: "She was (26) desappointed when she lost the match.\n(Spelling error in bold — correct it.)",
      answer: "disappointed",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'desappointed' — the prefix is wrong.",
          "Correct: 'disappointed'.",
          "Breakdown: dis- + appoint + -ed = disappointed.",
          "Only ONE 's' in 'dis-', not 'des-'.",
          "Double 'p' in 'appoint': dis-ap-POINT-ed.",
        ],
        tip: "DISAPPOINTED = dis + appoint + ed. One 's' (dis-), double 'p' (appoint). Think: the prefix 'dis-' + the verb 'appoint'. dis-APPOINT-ed.",
      },
    },
    {
      id: "chs_eoy2022_F_27",
      marks: 1,
      question: "...had many (27) suppoters in the spectator stand...\n(Spelling error in bold — correct it.)",
      answer: "supporters",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'suppoters' — missing a letter.",
          "Correct: 'supporters'.",
          "Root: support + -er + -s = supporters.",
          "The error drops the second 'r': supp-or-ters (not supp-o-ters).",
          "Breakdown: sup-port-ers.",
        ],
        tip: "SUPPORTERS = support + ers. 'Support' has double 'p' (sup-port) — keep the 'r' before '-ers': support-ers, not suppo-ters.",
      },
    },
    {
      id: "chs_eoy2022_F_28",
      marks: 1,
      question: "She was so close to (28) viktory.\n(Spelling error in bold — correct it.)",
      answer: "victory",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'viktory' — wrong letter used.",
          "Correct: 'victory'.",
          "The word uses 'c' not 'k': vic-to-ry.",
          "Think: Victor → victory (not 'viktor').",
          "Breakdown: vic-to-ry.",
        ],
        tip: "VICTORY = vic-to-ry. Always 'c', never 'k'. Remember: victorious → victory. The 'v-i-c' spelling stays the same.",
      },
    },
    {
      id: "chs_eoy2022_F_29",
      marks: 1,
      question: "Carla's competitor, Mandy, was much (29) yaunger than her...\n(Spelling error in bold — correct it.)",
      answer: "younger",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'yaunger' — wrong vowel combination.",
          "Correct: 'younger'.",
          "The vowel is 'ou' not 'au': y-ou-ng-er.",
          "Young → younger (comparative form, add -er).",
          "Think: young → younger, not 'yaung'.",
        ],
        tip: "YOUNGER = young + er. The root is 'young' (y-o-u-n-g) — the 'ou' vowel combination, like 'found', 'round', 'sound'. Add -er for comparative: young-er.",
      },
    },
    {
      id: "chs_eoy2022_F_30",
      marks: 1,
      question: "She (30) strugled to keep up with Mandy's energy.\n(Spelling error in bold — correct it.)",
      answer: "struggled",
      solution: {
        method: "Spelling correction — doubling rule",
        steps: [
          "Error: 'strugled' — missing a letter.",
          "Correct: 'struggled'.",
          "Root verb: 'struggle' → past tense 'struggled'.",
          "Rule: words ending in 'le' just add 'd': struggle → struggled.",
          "The error is missing one 'g': strug-gled, not stru-gled.",
        ],
        tip: "STRUGGLED = struggle + d. Words ending in '-le' form past tense by adding 'd': struggle → struggled, handle → handled, puzzle → puzzled. Note the double 'g' in 'struggle'.",
      },
    },
  ],
};

// ============================================================
//  SECTION G — Comprehension Cloze (Q31–34, 4 marks)
//  Passage: Pizza vending machine in Rome (own words)
// ============================================================

export const sectionG_compCloze: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_G_compCloze",
  topic: "GrammarCloze",
  passage:
    "Pizza can be eaten as a snack or a meal. A new pizza (31) ___ machine which produced freshly cooked pizzas in just three minutes was introduced in Rome recently.\n\nCustomers using the vending machine can (32) ___ from four different kinds of pizzas.\n\nThere were varying reviews by customers. 'It looks good but it is smaller (33) ___ the pizza in a restaurant and there are less toppings,' said one customer.\n\nAnother customer commented, 'I am fine with it, especially at times (34) ___ I am in a hurry.'\n\nMr Massimo Bucolo, who installed the machine, hopes that the machine will become popular with Rome's pizza-loving population.\n\nAdapted from: https://edition.cnn.com/travel/article/rome-pizza-vending-machine/index.html",
  questions: [
    {
      id: "chs_eoy2022_G_31",
      marks: 1,
      question: "A new pizza (31) ___ machine which produced freshly cooked pizzas in just three minutes...\n(Fill in the most suitable word of your own.)",
      answer: "vending",
      solution: {
        method: "Comprehension cloze — context word for automated food machine",
        steps: [
          "Context: A machine that produces pizzas for customers automatically.",
          "A machine that automatically sells food/items = a 'vending machine'.",
          "'pizza vending machine' = an automated machine that sells/dispenses pizzas ✓.",
          "The passage itself says 'Customers using the vending machine' later, confirming this word.",
          "Answer: vending.",
        ],
        tip: "A VENDING MACHINE is an automatic machine that dispenses food, drinks, or other items when you insert money. The passage confirms this word later: 'Customers using the vending machine...'",
      },
    },
    {
      id: "chs_eoy2022_G_32",
      marks: 1,
      question: "Customers using the vending machine can (32) ___ from four different kinds of pizzas.\n(Fill in the most suitable word of your own.)",
      answer: "choose / select / pick",
      solution: {
        method: "Comprehension cloze — verb for making a selection",
        steps: [
          "Customers can ___ from four different kinds of pizzas.",
          "When you have multiple options and pick one = 'choose' / 'select'.",
          "'choose from four kinds' = select one from four options ✓.",
          "Also acceptable: 'pick', 'select'.",
          "Answer: choose / select / pick.",
        ],
        tip: "When you have multiple options and pick one: CHOOSE FROM, SELECT FROM, PICK FROM. 'Customers can choose from four kinds of pizza.' This is a common phrase for vending machines and menus.",
      },
    },
    {
      id: "chs_eoy2022_G_33",
      marks: 1,
      question: "It looks good but it is smaller (33) ___ the pizza in a restaurant...\n(Fill in the most suitable word of your own.)",
      answer: "than",
      solution: {
        method: "Comprehension cloze — comparative structure",
        steps: [
          "'smaller ___ the pizza in a restaurant' — comparing sizes.",
          "Comparative structure: [adjective + -er] + THAN ✓.",
          "'smaller THAN' = the fixed grammar pattern for comparisons.",
          "Answer: than.",
        ],
        tip: "Comparative adjective pattern: [adjective]-er + THAN. Smaller THAN, bigger THAN, faster THAN, better THAN. NEVER 'smaller as' or 'smaller from'.",
      },
    },
    {
      id: "chs_eoy2022_G_34",
      marks: 1,
      question: "'I am fine with it, especially at times (34) ___ I am in a hurry.'\n(Fill in the most suitable word of your own.)",
      answer: "when",
      solution: {
        method: "Comprehension cloze — relative/time conjunction",
        steps: [
          "'at times ___ I am in a hurry' — connecting a time expression to a clause.",
          "'at times when' = during the times that / during occasions when ✓.",
          "'when' connects a time phrase ('at times') to a time clause ('I am in a hurry').",
          "Answer: when.",
        ],
        tip: "'At times when' = 'during the times that'. 'I like it, especially at times WHEN I am busy.' 'When' introduces time clauses after expressions like 'at times', 'on days', 'in moments'.",
      },
    },
  ],
};

// ============================================================
//  SECTION H — Comprehension 1: SR + OE (Q35–42, 8 marks)
//  Passage: Felix, Damian and the stray cat
// ============================================================

export const sectionH_comp1: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_H_comp1",
  topic: "ComprehensionOE",
  passage: `Felix and his brother Damian were walking home on a rainy afternoon. "Meow," they heard a sound coming from behind a rubbish bin. They approached it and saw a cat. The cat was drenched and looked filthy so they decided to take it home.

While Felix was giving the cat a warm bath, Damian went to get some milk. Watching the cat slurp up the milk greedily, Damian took pity on it and suggested keeping it. Felix agreed readily and found a basket. Immediately, he placed the cat gently into it. The cat fell asleep soon after.

In the evening, when the children's mother returned home, she called out, "It's time to eat." At that moment, the cat woke up and meowed loudly. "We're coming!" replied Felix and Damian.

Felix opened the room door and saw Mother standing there with a frown. "I heard some meowing sounds coming from your room. Is there a cat in your room?" she asked in disbelief.

"Yes, Mother! It's our new pet cat," the boys excitedly shouted.

"No way are you keeping a cat in the house! Take it out now!" roared Mother.

The boys did not know that their mother disliked cats. They had no choice but to take the poor cat back to where they had found it.`,
  questions: [
    {
      id: "chs_eoy2022_H_35",
      marks: 1,
      question: "Where did Felix and Damian find the cat? [1 mark]",
      answer: "Felix and Damian found the cat behind a rubbish bin.",
      solution: {
        method: "Locate factual information",
        steps: [
          "Paragraph 1: 'they heard a sound coming from behind a rubbish bin. They approached it and saw a cat.'",
          "The cat was found behind a rubbish bin ✓.",
          "Write in a complete sentence.",
        ],
        tip: "Scan for where the cat was — look for location words. 'Behind a rubbish bin' is the answer. Write a complete sentence: 'They found the cat behind a rubbish bin.'",
      },
    },
    {
      id: "chs_eoy2022_H_36",
      marks: 1,
      question: "Which word in the sentence below has the same meaning as 'very wet'? Circle either (A) or (B). 'The cat was drenched (A) and looked filthy (B) so they decided to take it home.'",
      answer: "(A) drenched",
      solution: {
        method: "Vocabulary — synonym for 'very wet'",
        steps: [
          "'drenched' = completely soaked with water, very wet ✓.",
          "'filthy' = very dirty/unclean — not 'very wet'.",
          "The cat was out in the rain → drenched = soaking wet.",
          "Answer: (A) drenched.",
        ],
        tip: "'Drenched' = completely wet through. 'I was drenched after walking in the rain.' Related: soaked, soaking wet, dripping wet.",
      },
    },
    {
      id: "chs_eoy2022_H_37",
      marks: 1,
      question: "The word 'he' in line 6 refers to ___. [1 mark]\n(Tick: Felix / the cat / Damian)",
      answer: "Felix",
      solution: {
        method: "Pronoun reference — find antecedent",
        steps: [
          "Line 6: 'Felix agreed readily and found a basket. Immediately, he placed the cat gently into it.'",
          "'he' comes right after 'Felix agreed... and found a basket' → 'he' refers to Felix.",
          "Felix found the basket → Felix placed the cat into it.",
          "Answer: Felix.",
        ],
        tip: "To find what 'he/she/it/they' refers to, look at the sentence immediately before. 'Felix agreed... found a basket. Immediately, HE placed...' → HE = Felix.",
      },
    },
    {
      id: "chs_eoy2022_H_38",
      marks: 1,
      question: "Write 1, 2 and 3 in the blanks to indicate the order of events. [1 mark]\n___ The cat drank the milk.\n___ Felix gave the cat a warm bath.\n___ Felix and Damian decided to keep the cat.",
      answer: "2 — The cat drank the milk.\n1 — Felix gave the cat a warm bath.\n3 — Felix and Damian decided to keep the cat.",
      solution: {
        method: "Sequencing events from paragraph 2",
        steps: [
          "Paragraph 2: 'While Felix was giving the cat a warm bath (1st), Damian went to get some milk. Watching the cat slurp up the milk greedily (2nd), Damian took pity on it and suggested keeping it (3rd).'",
          "Step 1: Felix gave the cat a warm bath.",
          "Step 2: The cat drank (slurped up) the milk.",
          "Step 3: They decided to keep the cat.",
          "Sequence: Bath → Milk → Decision to keep.",
        ],
        tip: "'While Felix was giving the bath' → bath comes FIRST. Then 'watching the cat slurp the milk' → milk comes SECOND. Then 'suggested keeping it' → decision THIRD.",
      },
    },
    {
      id: "chs_eoy2022_H_39",
      marks: 1,
      question: "True or False: The children's mother told them it was dinner time.",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 3: 'when the children's mother returned home, she called out, \"It's time to eat.\"'",
          "'It's time to eat' = it is dinner time ✓.",
          "Statement says 'told them it was dinner time' — she called out to tell them it was time to eat = True ✓.",
        ],
        tip: "'It's time to eat' = it is mealtime/dinner time. The mother's words directly match the statement. True.",
      },
    },
    {
      id: "chs_eoy2022_H_40",
      marks: 1,
      question: "True or False: The children woke the cat up.",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 3: 'the cat woke up and meowed loudly' — the cat woke up on its own when the mother called out.",
          "The mother's voice woke the cat — NOT the children.",
          "Statement: 'The children woke the cat up' = FALSE.",
        ],
        tip: "The cat woke up spontaneously when it heard the mother's voice ('It's time to eat'). The children did NOT wake the cat. False.",
      },
    },
    {
      id: "chs_eoy2022_H_41",
      marks: 1,
      question: "True or False: Felix opened the door and saw his mother looking unhappy.",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 4: 'Felix opened the room door and saw Mother standing there with a frown.'",
          "'With a frown' = looking unhappy/displeased ✓.",
          "Statement: 'saw his mother looking unhappy' = True ✓.",
        ],
        tip: "'With a frown' = looking displeased/unhappy. A frown = an unhappy/worried facial expression. True.",
      },
    },
    {
      id: "chs_eoy2022_H_42",
      marks: 1,
      question: "Why did the children's mother not allow them to keep the cat? [1 mark]",
      answer: "The children's mother did not allow them to keep the cat because she disliked cats.",
      solution: {
        method: "Locate reason from final paragraph",
        steps: [
          "Final paragraph: 'The boys did not know that their mother disliked cats.'",
          "The reason = the mother DISLIKED cats.",
          "Write in complete sentence.",
        ],
        tip: "The final paragraph gives the REAL reason — the mother disliked cats. This is stated directly. 'She disliked cats' is the clear answer.",
      },
    },
  ],
};

// ============================================================
//  SECTION I — Comprehension 2: Open-ended (Q43–46, 8 marks)
//  Passage: Keegan's model aeroplane
// ============================================================

export const sectionI_comp2: QuestionTypeB = {
  kind: "set",
  id: "chs_eoy2022_I_comp2",
  topic: "ComprehensionOE",
  passage: `It was a bright and sunny day. Keegan and I arranged to spend the afternoon at his place. Eager to show me his large collection of toys, he took me to his room. Among all the toys, his most treasured one was a model aeroplane. Keegan said it was a gift from his uncle who worked as a pilot.

I wanted to take a closer look at it so I asked Keegan if I could hold it in my hands. He graciously agreed. Knowing how fragile the aeroplane was, I carefully removed it from the display cabinet. Just as I was putting it back, I sneezed. "Snap!" one of the wings of the model aeroplane broke in my hands.

When Keegan saw this, tears welled up in his eyes. Soon, tears started to roll down his cheeks uncontrollably. With my head hung low, I rushed out of his house as I did not know how to console him.

For the next few days, I stayed out of Keegan's way in school. I was worried that he would still be angry with me. Feeling miserable without his company, I mustered up the courage to approach Keegan after school one day.

I told Keegan, "I am so sorry for breaking your precious aeroplane."

"It's okay! Our friendship is more important than a toy aeroplane," Keegan replied with a smile.

I was extremely touched when I heard what he said. I offered to fix the broken wing of the damaged aeroplane. Keegan took me to his house and we fixed it together.`,
  questions: [
    {
      id: "chs_eoy2022_I_43",
      marks: 2,
      question: "Why did Keegan take the writer to his room?",
      answer:
        "Keegan took the writer to his room because he was eager to show the writer his large collection of toys.",
      solution: {
        method: "Locate reason from paragraph 1",
        steps: [
          "Paragraph 1: 'Eager to show me his large collection of toys, he took me to his room.'",
          "Reason: He was eager to show the writer his large collection of toys.",
          "Write in a complete sentence with 'because'.",
        ],
        tip: "The phrase 'Eager to show me his large collection of toys' directly states the reason. 'Eager to do something' = wanting to do something enthusiastically. Keegan was excited to show his toy collection.",
      },
    },
    {
      id: "chs_eoy2022_I_44",
      marks: 2,
      question: "What does 'it' (line 5) refer to?",
      answer: "It refers to the model aeroplane (Keegan's most treasured toy which was a gift from his uncle).",
      solution: {
        method: "Pronoun reference — find antecedent of 'it'",
        steps: [
          "Line 5: 'I wanted to take a closer look at it so I asked Keegan if I could hold it in my hands.'",
          "What does 'it' refer to? Look at the preceding sentence: 'his most treasured one was a model aeroplane.'",
          "'it' = the model aeroplane ✓.",
          "Answer: The model aeroplane.",
        ],
        tip: "When asked what a pronoun refers to, find the NOUN it replaces by looking at the sentence before. 'Most treasured one was a MODEL AEROPLANE' → 'I wanted a closer look at IT' = the model aeroplane.",
      },
    },
    {
      id: "chs_eoy2022_I_45",
      marks: 2,
      question: "Which 3-word phrase in paragraph 3 showed that the writer was feeling embarrassed?",
      answer: "with my head hung low",
      solution: {
        method: "Locate specific phrase + identify emotion",
        steps: [
          "Paragraph 3: 'With my head hung low, I rushed out of his house...'",
          "'With my head hung low' = a phrase describing someone looking down in shame/embarrassment ✓.",
          "Hanging your head = feeling ashamed or embarrassed (physical gesture of shame).",
          "Count the words: 'with my head' = 3 words? No. 'head hung low' = 3 words ✓.",
          "The exact 3-word phrase: 'head hung low'.",
        ],
        tip: "'Head hung low' is a 3-word phrase meaning ashamed or embarrassed. The full phrase is 'with my head hung low' — the 3-word core is 'head hung low'. Hanging one's head = a universal gesture of shame/embarrassment.",
      },
    },
    {
      id: "chs_eoy2022_I_46",
      marks: 2,
      question: "What two things did the writer do to mend his friendship with Keegan?",
      answer:
        "1. The writer mustered up the courage to approach Keegan and apologised sincerely for breaking the aeroplane.\n2. The writer offered to fix the broken wing of the damaged aeroplane (and they fixed it together).",
      solution: {
        method: "Locate two specific actions from paragraphs 4–6",
        steps: [
          "Action 1 (paragraph 4–5): 'I mustered up the courage to approach Keegan after school one day. I told Keegan, \"I am so sorry for breaking your precious aeroplane.\"' → the writer apologised.",
          "Action 2 (paragraph 6): 'I offered to fix the broken wing of the damaged aeroplane. Keegan took me to his house and we fixed it together.' → the writer offered to and helped fix the aeroplane.",
          "1 mark for each correct action.",
        ],
        tip: "To 'mend a friendship' = repair/restore a friendship. Look for what the writer DID to make things better: (1) apologised sincerely, (2) offered to fix and fixed the broken aeroplane. Both are actions of making amends.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — CHS EOY 2022 Paper 2
// ============================================================

export const chs_eoy2022_paper2: Question[] = [
  ...sectionA,
  ...sectionB,
  sectionC_gc,
  sectionD_gc2,
  sectionE_vc,
  sectionF_editing,
  sectionG_compCloze,
  sectionH_comp1,
  sectionI_comp2,
];

export const paperMetaCHS_EOY = {
  school: "Catholic High School (Primary)",
  code: "CHS(P)",
  year: 2022,
  exam: "End-of-Year Examination (EOY) — Paper 2",
  level: "Primary 3",
  totalMarks: 50,
  sections: [
    { name: "Section A: Grammar MCQ", questions: 8, marks: 8, topic: "GrammarMCQ" as Topic },
    { name: "Section B: Vocabulary MCQ", questions: 6, marks: 6, topic: "VocabMCQ" as Topic },
    { name: "Section C: Grammar Cloze — Storytelling Competition", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section D: Grammar Cloze 2 — Dolphin Island", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section E: Vocabulary Cloze — Ukulele", questions: 3, marks: 3, topic: "VocabCloze" as Topic },
    { name: "Section F: Editing Spelling — Carla", questions: 5, marks: 5, topic: "Editing" as Topic },
    { name: "Section G: Comprehension Cloze — Pizza Machine", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section H: Comprehension 1 — Felix and the Cat", questions: 8, marks: 8, topic: "ComprehensionOE" as Topic },
    { name: "Section I: Comprehension 2 — Keegan's Aeroplane", questions: 4, marks: 8, topic: "ComprehensionOE" as Topic },
  ],
};
