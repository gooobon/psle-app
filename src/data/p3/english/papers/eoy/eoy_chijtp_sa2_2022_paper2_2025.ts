// ============================================================
// CHIJ Primary (Toa Payoh) — P3 English SA2 2022
// Paper 2  (50 marks)
// BOOKLET A (14 marks):
//   Section A : Grammar MCQ        (Q1–8,   8 marks)
//   Section B : Vocabulary MCQ     (Q9–14,  6 marks)
// BOOKLET B (20 marks):
//   Section C : Grammar Cloze      (Q15–22, 8 marks) — 2 passages
//   Section D : Vocabulary Cloze   (Q23–26, 4 marks) — Miss Molly
//   Section E : Editing (Spelling) (Q27–30, 4 marks) — Grandmother stories
//   Section F : Sentence Combining (Q31–34, 4 marks)
// COMPREHENSION (16 marks):
//   Section G : Comprehension A    (Q35–42, 8 marks) — Ben's shower prank
//   Section H : Comprehension B    (Q43–50, 8 marks) — Mr Ho's magic recorder
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  SECTION A — Grammar MCQ (Q1–8, 8 marks)
// ============================================================

const sectionA: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chij_sa2_2022_A_01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Jane and her sister ___ to the library once a month.",
    options: ["go", "goes", "went", "going"],
    answer: 0,
    solution: {
      method: "Subject-verb agreement + frequency = Simple Present",
      steps: [
        "'once a month' = regular habit → Simple Present.",
        "Subject: 'Jane and her sister' = compound subject = PLURAL (they).",
        "Plural subject in Simple Present → BASE FORM: go ✓.",
        "'goes' = singular (-s form) — wrong for plural subject.",
        "'went' = Simple Past — no past time clue.",
        "'going' = -ing form — needs auxiliary (is/are going).",
        "Answer: (1) go.",
      ],
      tip: "'Jane and her sister' = they = plural → base verb (go). 'Once a month' = Simple Present habit. Compare: 'Jane goes' (singular) vs 'Jane and her sister go' (plural).",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_02",
    topic: "GrammarMCQ",
    marks: 1,
    question: "They have eaten their lunch, ___ they?",
    options: ["did", "have", "didn't", "haven't"],
    answer: 3,
    solution: {
      method: "Question tags — Present Perfect positive statement",
      steps: [
        "Main clause: 'They HAVE eaten their lunch' = POSITIVE, Present Perfect (have + past participle).",
        "Rule: Positive → negative question tag.",
        "Auxiliary: 'have' → negative = 'haven't'.",
        "Subject: 'they' → pronoun = 'they'.",
        "Tag: 'haven't they?' ✓.",
        "'did/didn't' = Simple Past auxiliary — wrong (main clause uses 'have').",
        "'have' = positive — wrong for positive statement.",
        "Answer: (4) haven't.",
      ],
      tip: "Present Perfect question tag: 'have eaten' → 'haven't they?' Match the auxiliary exactly: have → haven't. Positive statement → negative tag.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_03",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Tom is away now but I am sure he will be back ___ Tuesday.",
    options: ["at", "in", "by", "until"],
    answer: 2,
    solution: {
      method: "Prepositions of time — deadline/no later than",
      steps: [
        "'will be back ___ Tuesday' = he will return on or before Tuesday.",
        "'by' = no later than a specified time/deadline ✓. 'Back by Tuesday' = back on or before Tuesday.",
        "'at' = used for specific clock times (at 3 pm), not days.",
        "'in' = used for months/years/periods (in January, in 2022).",
        "'until' = up to a time continuously — 'back until Tuesday' would mean he stays until Tuesday, which changes the meaning.",
        "Answer: (3) by.",
      ],
      tip: "'By' + time = no later than that time. 'Finish by Friday' = done on or before Friday. 'Back by Tuesday' = returns on Tuesday at the latest. Think of 'by' as a DEADLINE word.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"You ___ have stayed at home instead of playing soccer with your friends in the heavy rain," Mrs Jessica scolded her son.',
    options: ["shall", "might", "would", "should"],
    answer: 3,
    solution: {
      method: "Modal verbs — advice/reproach about past action",
      steps: [
        "Mrs Jessica is scolding = expressing regret/reproach about what her son did NOT do.",
        "'should have + past participle' = expressing that something was the right thing to do but wasn't done.",
        "'You should have stayed at home' = it was the right/advisable thing to stay home, but you didn't.",
        "'shall' = formal future/suggestion — not for past reproach.",
        "'might' = possibility — 'might have stayed' = possibly stayed, not a reproach.",
        "'would' = hypothetical or willingness — 'would have stayed' = in that hypothetical situation.",
        "Answer: (4) should.",
      ],
      tip: "'Should have + past participle' = a missed obligation or the right thing that wasn't done. Used for reproach: 'You should have been more careful!' = You weren't careful but should have been.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_05",
    topic: "GrammarMCQ",
    marks: 1,
    question: "A team of players ___ playing basketball just now.",
    options: ["is", "are", "was", "were"],
    answer: 2,
    solution: {
      method: "Subject-verb agreement + past tense",
      steps: [
        "'just now' = very recent past → PAST tense.",
        "Subject: 'A team' — 'team' is a COLLECTIVE NOUN. In Singapore English, collective nouns are typically treated as SINGULAR.",
        "Singular subject + Past → 'was' ✓.",
        "'were' = plural past — 'a team' as singular → 'was'.",
        "'is/are' = present tense — 'just now' signals past.",
        "Answer: (3) was.",
      ],
      tip: "Collective nouns (team, group, class, family) are treated as SINGULAR in Singapore English: 'The team WAS playing.' 'just now' = past tense signal → was (not were, not is/are).",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"I have ___ left to do as Jane has completed all the work," Celine said happily.',
    options: ["nothing", "anything", "everything", "something"],
    answer: 0,
    solution: {
      method: "Indefinite pronouns — positive sentence + negative meaning",
      steps: [
        "Context: Celine is happy because Jane completed everything — there is NO work left.",
        "'I have ___ left to do' = there is no task remaining.",
        "'nothing' = not any thing — 'I have nothing to do' = no tasks left ✓.",
        "'anything' = used in negatives ('I don't have anything') or questions — not in 'I have anything' (positive).",
        "'everything' = all things — 'I have everything to do' means all work remains, contradicting the happy context.",
        "'something' = one thing — 'I have something left to do' means there IS still work.",
        "Answer: (1) nothing.",
      ],
      tip: "NOTHING in a positive sentence structure = negative meaning ('zero things'). 'I have NOTHING to do' = 'I don't have ANYTHING to do.' She's happy because there's nothing left = all work is done.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_07",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Mary and Tom made ___ some sandwiches as they were feeling hungry.",
    options: ["herself", "himself", "ourselves", "themselves"],
    answer: 3,
    solution: {
      method: "Reflexive pronouns — plural third person",
      steps: [
        "'Mary and Tom' = two people = plural, third person (they).",
        "They made sandwiches FOR THEMSELVES = made it themselves, for their own use.",
        "Reflexive for 'they' = 'themselves' ✓.",
        "'herself' = for she (Mary alone).",
        "'himself' = for he (Tom alone).",
        "'ourselves' = for we (speaker included) — Mary and Tom are third persons, not the speaker.",
        "Answer: (4) themselves.",
      ],
      tip: "Reflexive pronouns for 'they' = THEMSELVES. 'They made it themselves' = they did it without help. 'They made it for themselves' = for their own benefit. Mary and Tom = they → themselves.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_A_08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "I know a lot about parrots as I have read ___ books about them.",
    options: ["any", "none", "many", "much"],
    answer: 2,
    solution: {
      method: "Quantifiers — countable noun + positive statement",
      steps: [
        "'books' = countable plural noun.",
        "The sentence is POSITIVE (affirmative): 'I have read ___ books.'",
        "'many' = large quantity for countable plural nouns in positive sentences ✓.",
        "'any' = used in negatives/questions: 'Have you read any books?' / 'I haven't read any books.'",
        "'none' = zero quantity — 'I have read none books' is grammatically wrong ('none of the books').",
        "'much' = for uncountable nouns — 'much water', NOT 'much books'.",
        "Answer: (3) many.",
      ],
      tip: "MANY = for countable plural nouns in positive sentences. MUCH = for uncountable nouns. ANY = in negatives/questions. 'I have read MANY books' ✓ (positive + countable plural).",
    },
  },
];

// ============================================================
//  SECTION B — Vocabulary MCQ (Q9–14, 6 marks)
// ============================================================

const sectionB: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chij_sa2_2022_B_09",
    topic: "VocabMCQ",
    marks: 1,
    question: "Jane is a ___ girl who fears everything.",
    options: ["timid", "brave", "honest", "intelligent"],
    answer: 0,
    solution: {
      method: "Vocabulary — character trait matching",
      steps: [
        "Jane 'fears everything' = she is very afraid.",
        "'timid' = shy and easily frightened ✓. A timid person fears many things.",
        "'brave' = not afraid, courageous — OPPOSITE of fearing everything.",
        "'honest' = truthful — not about fear.",
        "'intelligent' = smart — not about fear.",
        "Answer: (1) timid.",
      ],
      tip: "TIMID = easily frightened, shy, lacking courage. 'A timid person fears many things.' Antonym: brave. 'Timid' is the perfect word for someone who fears everything.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_B_10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "After trying to climb to the top of the mountain many times, we managed to reach the ___.",
    options: ["foot", "slope", "valley", "summit"],
    answer: 3,
    solution: {
      method: "Vocabulary — parts of a mountain",
      steps: [
        "Context: Trying to climb to the TOP of the mountain → finally reached the very top.",
        "'summit' = the highest point of a mountain ✓.",
        "'foot' = the BOTTOM of a mountain — the opposite of where you climb to.",
        "'slope' = the inclined side of a mountain — not the top.",
        "'valley' = a low area BETWEEN mountains — definitely not the top.",
        "Answer: (4) summit.",
      ],
      tip: "Parts of a mountain: SUMMIT/PEAK = the very top, SLOPE = the side, FOOT/BASE = the bottom, RIDGE = the long narrow top edge. Climbers aim for the SUMMIT.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_B_11",
    topic: "VocabMCQ",
    marks: 1,
    question: "The snake ___ away into the nearby bushes.",
    options: ["wiggled", "crawled", "scurried", "slithered"],
    answer: 3,
    solution: {
      method: "Vocabulary — manner of movement specific to snakes",
      steps: [
        "The question is about how a SNAKE moves.",
        "'slithered' = to move smoothly by sliding from side to side — the specific word for snake movement ✓.",
        "'wiggled' = to move with quick short twists — used for worms, fingers.",
        "'crawled' = to move on hands and knees (or for insects/babies).",
        "'scurried' = to move quickly with short steps — used for mice, insects.",
        "Answer: (4) slithered.",
      ],
      tip: "SLITHER is THE word for snake movement — smooth sideways gliding motion. 'The snake slithered through the grass.' This is an animal-specific movement word you should know.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_B_12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My sister ___ the job offer as she did not like the job.",
    options: ["turned in", "turned up", "turned over", "turned down"],
    answer: 3,
    solution: {
      method: "Phrasal verbs — 'turn down' = refuse/reject",
      steps: [
        "Context: She did not like the job → she REFUSED the offer.",
        "'turned down' = to refuse or reject an offer/invitation ✓.",
        "'turned in' = to submit/hand in something (turn in homework) or go to sleep.",
        "'turned up' = to arrive/appear, or to increase volume.",
        "'turned over' = to flip/roll something over.",
        "Answer: (4) turned down.",
      ],
      tip: "TURN DOWN = refuse/reject: 'She turned down the job offer.' 'He turned down her invitation.' Opposite: TURN DOWN (reject) vs ACCEPT/TAKE UP (accept).",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_B_13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Tim gobbled down the food after his soccer match since he was ___.",
    options: [
      "as gentle as a dove",
      "as hungry as a wolf",
      "as playful as a kitten",
      "as proud as a peacock",
    ],
    answer: 1,
    solution: {
      method: "Simile — match to context of eating quickly",
      steps: [
        "Tim 'gobbled down the food' = ate very quickly and greedily.",
        "We need a simile explaining WHY he ate so fast.",
        "'as hungry as a wolf' = extremely hungry ✓. Wolves are associated with great hunger.",
        "'as gentle as a dove' = very calm/peaceful — not relevant to eating fast.",
        "'as playful as a kitten' = very playful — not relevant.",
        "'as proud as a peacock' = very vain/proud — not relevant.",
        "Answer: (2) as hungry as a wolf.",
      ],
      tip: "Common animal similes: as HUNGRY as a WOLF (very hungry), as GENTLE as a DOVE (very calm), as PLAYFUL as a KITTEN (very fun), as PROUD as a PEACOCK (very vain). Gobbling food = very hungry → wolf.",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_B_14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "A crowd of ___ gathered near the scene to get a clearer view of the accident.",
    options: ["viewers", "audience", "onlookers", "spectators"],
    answer: 2,
    solution: {
      method: "Vocabulary — people watching an unplanned event",
      steps: [
        "Context: People gathering at an accident scene to watch.",
        "'onlookers' = people who watch an event (especially an accident or incident) from nearby ✓.",
        "'viewers' = people who watch TV/screens.",
        "'audience' = people at a planned performance (concert, theatre).",
        "'spectators' = people at a planned sports event.",
        "An accident is unplanned → the people watching are ONLOOKERS.",
        "Answer: (3) onlookers.",
      ],
      tip: "ONLOOKERS = people who happen to watch an unplanned event (accident, fight, incident). SPECTATORS = at sports events. AUDIENCE = at performances. VIEWERS = on TV. Accident → onlookers.",
    },
  },
];

// ============================================================
//  SECTION C — Grammar Cloze (Q15–22, 8 marks) — 2 passages
// ============================================================

export const grammarCloze1: QuestionTypeB = {
  kind: "set",
  id: "chij_sa2_2022_C_gc1",
  topic: "GrammarCloze",
  passage:
    "I was barbecuing chicken wings with my classmates when Tom asked (15) ___ if I wanted to go to the toilet with him. I agreed and (16) ___ got up and left.\n\nWalking back to the barbecue pit, Tom and I saw that (17) ___ classmates had gone off. Only the teachers had stayed behind. We were told that the students had gone back to (18) ___ tents as it was drizzling. Tom and I felt sad that the fun had ended.\n\n[Word bank: A=me, B=my, C=our, D=their, E=they, F=we]",
  questions: [
    {
      id: "chij_sa2_2022_C_15",
      marks: 1,
      question: "Tom asked (15) ___ if I wanted to go to the toilet.\n[Word bank: A=me, B=my, C=our, D=their, E=they, F=we]",
      answer: "A (me)",
      solution: {
        method: "Object pronoun after verb 'asked'",
        steps: [
          "Tom asked ___: the blank is the OBJECT of 'asked'.",
          "The speaker is 'I' → object = 'me'.",
          "'me' = first-person singular object pronoun ✓.",
          "'I' would be a subject pronoun — 'asked I' is wrong.",
          "Answer: A (me).",
        ],
        tip: "After verbs like 'asked', 'told', 'helped', use OBJECT pronouns: me, him, her, us, them. 'Tom asked ME' ✓ (me is the object receiving the asking).",
      },
    },
    {
      id: "chij_sa2_2022_C_16",
      marks: 1,
      question: "I agreed and (16) ___ got up and left.\n[Word bank: A=me, B=my, C=our, D=their, E=they, F=we]",
      answer: "F (we)",
      solution: {
        method: "Subject pronoun — speaker + Tom together",
        steps: [
          "'I agreed and ___ got up and left' — who got up and left?",
          "The speaker AND Tom both got up together.",
          "'I + Tom' = we (plural first person) → subject pronoun = 'we' ✓.",
          "Answer: F (we).",
        ],
        tip: "'I + [another person]' = WE. 'Tom and I agreed' → 'WE got up and left'. When two people act together and one is the speaker, use 'we'.",
      },
    },
    {
      id: "chij_sa2_2022_C_17",
      marks: 1,
      question: "Tom and I saw that (17) ___ classmates had gone off.\n[Word bank: A=me, B=my, C=our, D=their, E=they, F=we]",
      answer: "C (our)",
      solution: {
        method: "Possessive adjective — shared classmates",
        steps: [
          "'___ classmates had gone off' — whose classmates?",
          "Tom and I are from the same class → 'our' classmates ✓.",
          "'our' = possessive adjective for 'we' — the classmates belonging to Tom and the speaker.",
          "'their' = for 'they' (third person) — Tom and the speaker are not third persons here.",
          "Answer: C (our).",
        ],
        tip: "'Our' is the possessive for 'we'. Tom and I together = we → 'our classmates'. If it were someone else's classmates, it would be 'their'. But here, they ARE the class → our classmates.",
      },
    },
    {
      id: "chij_sa2_2022_C_18",
      marks: 1,
      question: "...the students had gone back to (18) ___ tents as it was drizzling.\n[Word bank: A=me, B=my, C=our, D=their, E=they, F=we]",
      answer: "D (their)",
      solution: {
        method: "Possessive adjective — third person plural",
        steps: [
          "'the students had gone back to ___ tents' — whose tents?",
          "The tents belong to 'the students' (third person plural).",
          "Possessive for 'they' = 'their' ✓.",
          "'our' = belonging to we (the speaker's group) — but the speaker and Tom had not yet gone back.",
          "Answer: D (their).",
        ],
        tip: "The students (they) went back to THEIR tents. The students = they → their (possessive). Compare: we → our, they → their.",
      },
    },
  ],
};

export const grammarCloze2: QuestionTypeB = {
  kind: "set",
  id: "chij_sa2_2022_C_gc2",
  topic: "GrammarCloze",
  passage:
    "Joel was a shepherd who earned a living by looking after sheep. One day, as he was tending his sheep (19) ___ the fields, he suddenly heard a howl. He trembled in fear and started to look (20) ___.\n\nThen, Joel saw a big black wolf standing (21) ___ a hilltop. He yelled for help and within minutes, several villagers came running (22) ___ him. Upon seeing the crowd of villagers, the wolf fled and was nowhere in sight.\n\n[Word bank: A=around, B=between, C=in, D=on, E=towards, F=under]",
  questions: [
    {
      id: "chij_sa2_2022_C_19",
      marks: 1,
      question: "...as he was tending his sheep (19) ___ the fields\n[Word bank: A=around, B=between, C=in, D=on, E=towards, F=under]",
      answer: "C (in)",
      solution: {
        method: "Preposition of place — inside/within an area",
        steps: [
          "'tending his sheep ___ the fields' — where? Inside the fields.",
          "'in' = within an enclosed/defined area ✓. 'In the fields' = inside the field area.",
          "'on' = on a surface — 'on the fields' is less natural.",
          "'around' = surrounding — 'around the fields' means outside the boundary.",
          "Answer: C (in).",
        ],
        tip: "We say 'in the fields' / 'in the park' / 'in the garden' — using 'in' for areas of land where you work or play. 'The sheep grazed IN the fields.'",
      },
    },
    {
      id: "chij_sa2_2022_C_20",
      marks: 1,
      question: "He trembled in fear and started to look (20) ___.\n[Word bank: A=around, B=between, C=in, D=on, E=towards, F=under]",
      answer: "A (around)",
      solution: {
        method: "Preposition — 'look around' = look in all directions",
        steps: [
          "'started to look ___' — when frightened, you look in all directions for the source.",
          "'around' = in all directions, surveying the surroundings ✓.",
          "'look around' = to look in every direction to find something ✓.",
          "'towards' = in a specific direction — but he doesn't yet know where the sound came from.",
          "Answer: A (around).",
        ],
        tip: "LOOK AROUND = look in all directions, surveying your surroundings. When scared by an unknown sound, you 'look around' to find the source. Fixed phrasal: 'look around', 'glance around'.",
      },
    },
    {
      id: "chij_sa2_2022_C_21",
      marks: 1,
      question: "Joel saw a big black wolf standing (21) ___ a hilltop.\n[Word bank: A=around, B=between, C=in, D=on, E=towards, F=under]",
      answer: "D (on)",
      solution: {
        method: "Preposition of place — on a surface/elevated area",
        steps: [
          "'standing ___ a hilltop' — the wolf is at the top of the hill.",
          "'on' = on top of / on the surface of ✓. 'Standing on a hilltop' = standing at the top.",
          "'in' = inside — you can't be 'inside' a hilltop.",
          "'under' = below — wolf is ON TOP, not under.",
          "Answer: D (on).",
        ],
        tip: "'ON a hilltop' = at the top of the hill. We say ON a mountain, ON a cliff, ON a hill — using 'on' for elevated surfaces/positions.",
      },
    },
    {
      id: "chij_sa2_2022_C_22",
      marks: 1,
      question: "...several villagers came running (22) ___ him.\n[Word bank: A=around, B=between, C=in, D=on, E=towards, F=under]",
      answer: "E (towards)",
      solution: {
        method: "Preposition of direction — movement in someone's direction",
        steps: [
          "'villagers came running ___ him' — they ran in Joel's direction.",
          "'towards' = in the direction of someone/something ✓. 'Running towards him' = running in his direction.",
          "'around' = circling — not the direction of movement here.",
          "'under' = below — not relevant.",
          "Answer: E (towards).",
        ],
        tip: "TOWARDS = in the direction of. 'The dog ran towards me.' 'She walked towards the door.' Villagers ran TOWARDS him (in his direction) to help him.",
      },
    },
  ],
};

// ============================================================
//  SECTION D — Vocabulary Cloze (Q23–26, 4 marks)
//  Passage: Miss Molly the librarian's farewell
//  Word bank: A=admire, B=announced, C=farewell, D=hear, E=listen, F=remember
// ============================================================

export const vocabCloze: QuestionTypeB = {
  kind: "set",
  id: "chij_sa2_2022_D_vc",
  topic: "VocabCloze",
  passage:
    "Miss Molly had been working in our school for more than twenty years. She was the school librarian. Everyone loved Miss Molly. During recess, all of us would gather around Miss Molly to (23) ___ to her stories.\n\nOne day, our principal (24) ___ that Miss Molly would be retiring soon. My classmates and I decided to give her a surprise (25) ___ party.\n\nOn Miss Molly's last day at work, we had a great time eating and chatting during the party. She was so touched by our actions that she was moved to tears. We will always (26) ___ Miss Molly and her wonderful stories. We hope that Miss Molly will visit us in school whenever she can.\n\n[Word bank: A=admire, B=announced, C=farewell, D=hear, E=listen, F=remember]",
  questions: [
    {
      id: "chij_sa2_2022_D_23",
      marks: 1,
      question: "...all of us would gather around Miss Molly to (23) ___ to her stories.\n[Word bank: A=admire, B=announced, C=farewell, D=hear, E=listen, F=remember]",
      answer: "E (listen)",
      solution: {
        method: "Vocabulary cloze — fixed phrase 'listen to'",
        steps: [
          "'___ to her stories' — the blank precedes 'to'.",
          "Fixed phrase: 'listen TO' stories/music/someone ✓.",
          "'hear' does not take 'to' in this structure — 'hear to' is not standard. You 'hear' something but 'listen TO' something.",
          "'admire' = to regard with respect — 'admire to stories' makes no sense.",
          "Answer: E (listen).",
        ],
        tip: "LISTEN TO = actively pay attention to sounds/speech. HEAR = passively perceive sound. 'I listen TO music' (active). 'I hear music' (passive). Always 'listen TO' — never 'listen music' or 'hear to music'.",
      },
    },
    {
      id: "chij_sa2_2022_D_24",
      marks: 1,
      question: "One day, our principal (24) ___ that Miss Molly would be retiring soon.\n[Word bank: A=admire, B=announced, C=farewell, D=hear, E=listen, F=remember]",
      answer: "B (announced)",
      solution: {
        method: "Vocabulary cloze — 'announce that' for official news",
        steps: [
          "'our principal ___ that Miss Molly would be retiring' — sharing official news.",
          "'announced' = to make an official public statement about something ✓.",
          "Principals make official announcements to the school.",
          "'hear' = passive receiving of information — the principal gives information, not receives.",
          "Answer: B (announced).",
        ],
        tip: "'Announce' = to officially inform/declare something publicly. Principals, teachers, and leaders ANNOUNCE news. 'The principal announced that...' = made an official statement that...",
      },
    },
    {
      id: "chij_sa2_2022_D_25",
      marks: 1,
      question: "...decided to give her a surprise (25) ___ party.\n[Word bank: A=admire, B=announced, C=farewell, D=hear, E=listen, F=remember]",
      answer: "C (farewell)",
      solution: {
        method: "Vocabulary cloze — 'farewell party' = goodbye party",
        steps: [
          "Context: Miss Molly is retiring → students give her a party for her last day.",
          "A party to say goodbye to someone who is leaving = a 'farewell' party ✓.",
          "'farewell party' = a gathering to bid someone goodbye ✓.",
          "'admire party' / 'hear party' / 'remember party' = not real party types.",
          "Answer: C (farewell).",
        ],
        tip: "FAREWELL = goodbye (formal). A 'farewell party' = a goodbye party for someone leaving. Related: farewell speech, farewell dinner, farewell gift. Common for retirements, transfers, graduations.",
      },
    },
    {
      id: "chij_sa2_2022_D_26",
      marks: 1,
      question: "We will always (26) ___ Miss Molly and her wonderful stories.\n[Word bank: A=admire, B=announced, C=farewell, D=hear, E=listen, F=remember]",
      answer: "F (remember)",
      solution: {
        method: "Vocabulary cloze — keeping memories",
        steps: [
          "'We will always ___ Miss Molly and her stories' — keeping her in memory.",
          "'remember' = to keep in one's memory, not forget ✓.",
          "'We will always remember her' = she will always be in our hearts/minds.",
          "'admire' = to respect — 'we will always admire her' is possible but 'remember' fits better with 'her stories' (you remember stories).",
          "The sentence pairs with the previous one about being touched to tears — emotional memory is most fitting.",
          "Answer: F (remember).",
        ],
        tip: "'Remember' = to keep in memory. 'We will always REMEMBER you' is the standard farewell expression. When someone leaves, we say 'We will always remember you and your kindness.'",
      },
    },
  ],
};

// ============================================================
//  SECTION E — Editing for Spelling (Q27–30, 4 marks)
//  Passage: Grandmother's stories
// ============================================================

export const editing: QuestionTypeB = {
  kind: "set",
  id: "chij_sa2_2022_E_editing",
  topic: "Editing",
  passage:
    "I always look forward to Grandmother visiting us every weekend. I (27)[skueal] will skueal with joy upon seeing her. Whenever she visits my family, she will tell me many (28)[intresting] stories. Grandmother is an (29)[exsilent] storyteller. I can listen to her for hours without feeling bored.\n\nOne of the stories that she told me was about a wealthy young girl who dressed herself up as a boy so that she could go to school. In those days, not many girls were allowed to (30)[resieve] education. They only learned how to cook, sew and paint. I realised that I am very lucky to be able to go to school now.",
  questions: [
    {
      id: "chij_sa2_2022_E_27",
      marks: 1,
      question: "I will (27) skueal with joy upon seeing her.\n(Spelling error — correct 'skueal'.)",
      answer: "squeal",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'skueal' — letters in wrong order and wrong spelling.",
          "Correct: 'squeal' — to make a high-pitched cry of excitement/delight.",
          "Breakdown: squ-eal (like 'squeak' but longer).",
          "'Squeal with joy' = cry out in delight ✓.",
        ],
        tip: "SQUEAL = squ-eal. Related: squeak, squeeze, squat — all start with 'squ'. 'Squeal with joy' = make a high-pitched excited sound. Not 'skueal'.",
      },
    },
    {
      id: "chij_sa2_2022_E_28",
      marks: 1,
      question: "...she will tell me many (28) intresting stories.\n(Spelling error — correct 'intresting'.)",
      answer: "interesting",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'intresting' — missing a letter.",
          "Correct: 'interesting'.",
          "The error drops the 'e' after 'inter': inter-est-ing.",
          "Breakdown: in-ter-est-ing (4 syllables).",
          "Root: 'interest' + '-ing' = interesting.",
        ],
        tip: "INTERESTING = inter-EST-ing. The root is 'interest' — keep the 'e' in 'interest': inter-E-st-ing. Many students drop the middle 'e': 'int-r-esting' (wrong) vs 'inter-E-sting' (correct).",
      },
    },
    {
      id: "chij_sa2_2022_E_29",
      marks: 1,
      question: "Grandmother is an (29) exsilent storyteller.\n(Spelling error — correct 'exsilent'.)",
      answer: "excellent",
      solution: {
        method: "Spelling correction",
        steps: [
          "Error: 'exsilent' — wrong letters.",
          "Correct: 'excellent'.",
          "Breakdown: ex-cel-lent (double 'l').",
          "Common trap: 'exsilent' confuses 'excellent' with 'silent'.",
          "Think: excel (to be very good at) + -lent = excellent.",
        ],
        tip: "EXCELLENT = ex-CEL-lent. Double 'l': excel-L-ent. Root: excel (to be very good). 'An excellent storyteller' = a very good storyteller. NOT 'exsilent' or 'excelent'.",
      },
    },
    {
      id: "chij_sa2_2022_E_30",
      marks: 1,
      question: "...not many girls were allowed to (30) resieve education.\n(Spelling error — correct 'resieve'.)",
      answer: "receive",
      solution: {
        method: "Spelling correction — 'i before e' rule",
        steps: [
          "Error: 'resieve' — vowels in wrong order.",
          "Correct: 'receive'.",
          "Spelling rule: 'i before e, EXCEPT after c'.",
          "After 'c' → 'ei': rec-EI-ve (c comes before ei).",
          "Breakdown: re-ceive.",
        ],
        tip: "RECEIVE = re-CEIVE. The rule: 'i before e, except after c.' After 'c' → use 'ei' not 'ie': reCEIve, deCEIve, percEIve, concEIve. NOT 'resieve'.",
      },
    },
  ],
};

// ============================================================
//  SECTION F — Sentence Combining (Q31–34, 4 marks)
// ============================================================

const sentenceCombining: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chij_sa2_2022_F_31",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence using 'and':\nBen added lettuce in his salad. He added some tomatoes too.",
    options: [],
    answer: 0,
    solution: {
      method: "Sentence combining using 'and'",
      steps: [
        "Two similar actions: (1) Ben added lettuce, (2) He added tomatoes.",
        "'and' joins similar/additional actions.",
        "Sample: 'Ben added lettuce and some tomatoes in his salad.'",
        "OR: 'Ben added lettuce in his salad and some tomatoes too.'",
        "Both items (lettuce + tomatoes) go together with 'and'.",
      ],
      tip: "'And' joins two similar things or actions. Remove repetition: 'He added lettuce AND (he added) tomatoes' → 'Ben added lettuce and some tomatoes in his salad.'",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_F_32",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence using 'when':\nThe mouse met the cat. The mouse was terrified.",
    options: [],
    answer: 0,
    solution: {
      method: "Sentence combining using 'when'",
      steps: [
        "The mouse meeting the cat caused its terror — sequence/cause.",
        "'when' shows one event happening at the same time or triggering another.",
        "Sample: 'The mouse was terrified when it met the cat.'",
        "OR: 'When the mouse met the cat, it was terrified.'",
        "Note: 'it' replaces 'the mouse' to avoid repetition.",
      ],
      tip: "'When' connects two events that happen around the same time. 'The mouse was terrified WHEN it met the cat.' If the 'when' clause comes first, add a comma: 'When the mouse met the cat, it was terrified.'",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_F_33",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence using 'so':\nThe woman jumped into the river. She wanted to save the drowning boy.",
    options: [],
    answer: 0,
    solution: {
      method: "Sentence combining using 'so'",
      steps: [
        "Sentence 1 is the RESULT, Sentence 2 is the REASON.",
        "'so' connects reason → result: [reason], so [result].",
        "Reorder: Reason first, then result with 'so'.",
        "Sample: 'The woman wanted to save the drowning boy, so she jumped into the river.'",
        "Note: A comma before 'so' when joining two complete clauses.",
      ],
      tip: "'So' shows result: [cause/reason] + so + [result/action]. 'She wanted to save him, SO she jumped in.' Put the reason first (she wanted to save), then 'so', then the action (she jumped).",
    },
  },
  {
    kind: "single",
    id: "chij_sa2_2022_F_34",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence using 'which':\nThis is my watch. I love it.",
    options: [],
    answer: 0,
    solution: {
      method: "Sentence combining using relative pronoun 'which'",
      steps: [
        "'which' is a relative pronoun used to add information about a thing.",
        "Replace 'it' in sentence 2 with 'which'.",
        "Sample: 'This is my watch, which I love.'",
        "The 'which' clause comes directly after the noun it describes ('my watch').",
        "Note: comma before 'which' for non-restrictive clause.",
      ],
      tip: "Use 'which' to join two sentences about the same THING. 'This is my watch. I love IT.' → 'This is my watch, WHICH I love.' 'Which' replaces 'it' and connects the two ideas.",
    },
  },
];

// ============================================================
//  SECTION G — Comprehension A (Q35–42, 8 marks)
//  Passage: Ben's shower prank on Mario
// ============================================================

export const compA: QuestionTypeB = {
  kind: "set",
  id: "chij_sa2_2022_G_compA",
  topic: "ComprehensionOE",
  passage: `Ben was perspiring profusely when he walked home from school on a hot day. He had just finished playing basketball and was feeling thirsty. After putting down his bag, he went to the kitchen to get a drink. He ransacked the refrigerator and spotted his favourite fruit juice. He poured the apple juice into a glass and drank it in big gulps. It refreshed him.

After quenching his thirst, he decided to take a shower. When he entered the bathroom, he was surprised to see Mario fast asleep in the bathtub. Suddenly, an idea struck Ben. He thought of playing a trick on Mario. He tiptoed towards Mario, turned on the shower and the cold water fell on Mario like rainfall. Mario woke up from his sleep and started barking and howling loudly. He scampered out of the bathroom.

The noise woke Ben's baby brother up and he wailed continuously. Ben tried to comfort his brother but to no avail. His mother was so angry that she took away Ben's electronic game. Ben was also forbidden from watching television programmes for a week. Ben regretted his foolish act.`,
  questions: [
    {
      id: "chij_sa2_2022_G_35",
      marks: 1,
      question:
        "Tick (✓) your chosen answer. [1m]\nWe can tell from the passage that it was a ___ day.\n[ ] rainy  [ ] windy  [ ] sunny",
      options: ["rainy", "windy", "sunny"],
      answer: "sunny",
      solution: {
        method: "Inference from context clues",
        steps: [
          "Passage: 'Ben was perspiring profusely when he walked home from school on a hot day.'",
          "'Hot day' + perspiring (sweating) = a SUNNY / hot day.",
          "'rainy' = wet weather — contradicts 'hot day'.",
          "'windy' = breezy — not mentioned.",
          "'sunny' = hot and bright ✓ — 'hot day' implies sunny.",
          "Answer: sunny.",
        ],
        tip: "A 'hot day' with perspiring (sweating) = sunny/hot weather. Infer the type of day from the clues: hot + sweating = sunny.",
      },
    },
    {
      id: "chij_sa2_2022_G_36",
      marks: 1,
      question:
        "Which word in the sentence has the same meaning as 'searched'? Circle either (A) or (B). [1m]\n'He ransacked (A) the refrigerator and spotted (B) his favourite fruit juice.'",
      answer: "(A) ransacked",
      solution: {
        method: "Vocabulary — synonym for 'searched'",
        steps: [
          "'searched' = looked through something to find what you want.",
          "'ransacked' = searched through in a disorganised/thorough way ✓.",
          "'spotted' = caught sight of / noticed — this is about FINDING, not searching.",
          "Answer: (A) ransacked.",
        ],
        tip: "'Ransacked' means to search through thoroughly and messily. 'He ransacked the fridge' = he looked through the fridge (perhaps making a mess). 'Spotted' = noticed/found, which is the RESULT of searching, not searching itself.",
      },
    },
    {
      id: "chij_sa2_2022_G_37",
      marks: 1,
      question: "What does the word 'It' in line 5 refer to? [1m]",
      answer: "The apple juice (that he poured into the glass and drank).",
      solution: {
        method: "Pronoun reference",
        steps: [
          "Line 5: 'He poured the apple juice into a glass and drank it in big gulps. It refreshed him.'",
          "'It refreshed him' — what refreshed him?",
          "The apple juice he just drank → 'It' = the apple juice ✓.",
          "Answer: the apple juice.",
        ],
        tip: "Find the noun just before 'It'. 'He drank the apple juice... It refreshed him.' The 'It' refers back to the apple juice (the thing he just drank that made him feel better).",
      },
    },
    {
      id: "chij_sa2_2022_G_38",
      marks: 1,
      question: "True or False: Mario was fast asleep in the bedroom. [1m]",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 2: 'he was surprised to see Mario fast asleep in the bathtub.'",
          "Mario was asleep in the BATHTUB, not the bedroom.",
          "Statement says 'bedroom' = FALSE ✓.",
        ],
        tip: "Mario was in the BATHTUB (in the bathroom), not the bedroom. Location matters! False.",
      },
    },
    {
      id: "chij_sa2_2022_G_39",
      marks: 1,
      question: "True or False: Ben was sorry for what he had done. [1m]",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Final sentence: 'Ben regretted his foolish act.'",
          "'Regretted' = felt sorry about ✓.",
          "Statement: 'Ben was sorry for what he had done' = True ✓.",
        ],
        tip: "'Regretted his foolish act' = was sorry/felt bad about what he did. True.",
      },
    },
    {
      id: "chij_sa2_2022_G_40",
      marks: 1,
      question: "Tick whether the statements best describe Ben or Mario. [1m x 2]\n(40) He was playful.\n(41) He was shocked.",
      answer:
        "(40) Ben — He was playful (he thought of playing a trick on Mario).\n(41) Mario — He was shocked (woke up suddenly from cold water).",
      solution: {
        method: "Character attribution from passage",
        steps: [
          "Q40: 'He was playful' — who was playful? Ben played a trick on Mario → BEN was playful ✓.",
          "Q41: 'He was shocked' — who was shocked? Mario woke up to cold water falling on him → MARIO was shocked ✓.",
          "Mario 'started barking and howling loudly' and 'scampered out' = he was shocked/startled.",
        ],
        tip: "Q40: Ben = playful (played the trick). Q41: Mario = shocked (woke to cold water). Match each statement to the character who best fits based on their ACTIONS in the story.",
      },
    },
    {
      id: "chij_sa2_2022_G_42",
      marks: 1,
      question: "How did Ben's mother punish him? [1m]",
      answer:
        "Ben's mother took away his electronic game AND forbade him from watching television programmes for a week.",
      solution: {
        method: "Locate punishment details from paragraph 3",
        steps: [
          "Paragraph 3: 'she took away Ben's electronic game. Ben was also forbidden from watching television programmes for a week.'",
          "Two punishments: (1) took away his electronic game, (2) no TV for a week.",
          "The question asks HOW she punished him — list both.",
        ],
        tip: "List BOTH punishments for a complete answer: no electronic game + no TV for a week. 'Also' in the passage signals there are two punishments.",
      },
    },
  ],
};

// ============================================================
//  SECTION H — Comprehension B (Q43–50, 8 marks)
//  Passage: Mr Ho and the magic recorder
// ============================================================

export const compB: QuestionTypeB = {
  kind: "set",
  id: "chij_sa2_2022_H_compB",
  topic: "ComprehensionOE",
  passage: `Mr Ho lived in a room in Chinatown. Recently, he had fallen ill and lost his job. As a result, he owed the landlady two months' rent. One day, the landlady swaggered towards Mr Ho's room and screamed at the top of her voice. She demanded that Mr Ho pay what he owed her immediately or he would have to move out of her flat.

The smart man began playing his recorder. "Please excuse me. I have to play my recorder for an hour. Otherwise, money will not grow in my wallet and I won't be able to pay you my rent," explained Mr Ho politely. "You mean the recorder can provide you with the money you need simply by playing it?" asked the curious landlady.

"Certainly! This is a magic recorder," said Mr Ho. The gullible landlady believed Mr Ho. "If you give me your instrument, I shall forget your debt," she said. Mr Ho handed the recorder to her. He warned the landlady to keep the recorder for a week before she played it or she would not get any money.

The landlady could not wait and spent the whole day at home playing her recorder. Hour after hour, she checked her purse. Nothing appeared! Shaking with rage, she went to Mr Ho's place. He asked if she had obeyed his instructions. The landlady turned red with embarrassment and admitted she was impatient. Mr Ho chided her for her impatience but was laughing to himself for tricking the greedy landlady.`,
  questions: [
    {
      id: "chij_sa2_2022_H_43",
      marks: 1,
      question: "Why was Mr Ho not able to pay the landlady two months' rent? [1m]",
      answer:
        "Mr Ho was not able to pay the landlady because he had fallen ill and lost his job, so he had no money.",
      solution: {
        method: "Locate cause from paragraph 1",
        steps: [
          "Paragraph 1: 'Recently, he had fallen ill and lost his job. As a result, he owed the landlady two months' rent.'",
          "Cause: He fell ill AND lost his job → had no income → could not pay.",
          "Answer: He had fallen ill and lost his job (so he had no money).",
        ],
        tip: "'As a result' is a signal phrase pointing back to the CAUSE. The cause = fell ill + lost job. Both reasons together explain why he had no money to pay rent.",
      },
    },
    {
      id: "chij_sa2_2022_H_44",
      marks: 1,
      question: "Which word in Paragraph 2 has the same meaning as 'clever'? [1m]",
      answer: "smart",
      solution: {
        method: "Vocabulary — synonym in paragraph 2",
        steps: [
          "Paragraph 2 begins: 'The smart man began playing his recorder.'",
          "'smart' = clever, intelligent ✓.",
          "Answer: smart.",
        ],
        tip: "Scan paragraph 2 for a word meaning 'clever'. 'The SMART man' = the clever man. 'Smart' is a synonym for clever.",
      },
    },
    {
      id: "chij_sa2_2022_H_45",
      marks: 1,
      question: "What did the landlady want in exchange for the rent owed by Mr Ho? [1m]",
      answer: "The landlady wanted Mr Ho's recorder (magic recorder) in exchange for forgetting his debt.",
      solution: {
        method: "Locate exchange deal from paragraph 3",
        steps: [
          "Paragraph 3: '\"If you give me your instrument, I shall forget your debt,\" she said.'",
          "The landlady wanted: Mr Ho's instrument (the recorder).",
          "In exchange for: forgetting his debt (the two months' rent).",
          "Answer: She wanted his recorder (instrument).",
        ],
        tip: "Find the deal the landlady made: 'Give me your instrument → I will forget your debt.' She wanted the RECORDER in exchange for cancelling the rent owed.",
      },
    },
    {
      id: "chij_sa2_2022_H_46",
      marks: 1,
      question: "What does the word 'debt' in line 12 refer to? [1m]",
      answer: "The 'debt' refers to the two months' rent that Mr Ho owed the landlady.",
      solution: {
        method: "Vocabulary — contextual meaning",
        steps: [
          "'debt' = money owed to someone.",
          "In context: Mr Ho owed the landlady two months' rent.",
          "The 'debt' = the two months' rent owed to the landlady ✓.",
          "Answer: the two months' rent Mr Ho owed the landlady.",
        ],
        tip: "'Debt' = money or something owed to another person. In this context, Mr Ho's DEBT = the two months of unpaid rent he owed the landlady.",
      },
    },
    {
      id: "chij_sa2_2022_H_47",
      marks: 1,
      question: "Which three-word phrase in Paragraph 4 tells us that the landlady was angry? [1m]",
      answer: "Shaking with rage",
      solution: {
        method: "Locate 3-word phrase showing anger",
        steps: [
          "Paragraph 4: 'Shaking with rage, she went to Mr Ho's place.'",
          "'Shaking with rage' = trembling with extreme anger ✓.",
          "This 3-word phrase describes the landlady's anger physically.",
          "Answer: Shaking with rage.",
        ],
        tip: "'Shaking with rage' = trembling with extreme anger. 'Rage' = extreme anger. 'Shaking' = uncontrollable physical trembling from intense emotion. Count: Shaking (1) with (2) rage (3) = 3 words.",
      },
    },
    {
      id: "chij_sa2_2022_H_48",
      marks: 2,
      question:
        "State whether Q48 is True or False and give a reason.\n(48) Mr Ho did not own the flat.",
      options: ["True", "False"],
      answer: "True — Mr Ho did not own the flat. He was a TENANT (renter) who lived in a room owned by the landlady. Evidence: 'he owed the landlady two months' rent' — tenants pay rent to owners; if he owned the flat, he would not pay rent to the landlady.",
      solution: {
        method: "True/False with reason — inference from context",
        steps: [
          "Statement: 'Mr Ho did not own the flat.'",
          "Evidence: 'he owed the landlady two months' rent' — he PAID RENT to the landlady.",
          "If you pay rent, you are a TENANT, not the owner.",
          "The landlady OWNED the flat; Mr Ho RENTED a room in it.",
          "Statement = TRUE.",
          "Reason: He paid rent to the landlady, which means she was the owner and he was the tenant.",
        ],
        tip: "For True/False + reason: (1) State True/False, (2) Give evidence from passage. 'He owed RENT to the landlady' = he was renting, not owning. Owners don't pay rent to others.",
      },
    },
    {
      id: "chij_sa2_2022_H_49",
      marks: 2,
      question:
        "State whether Q49 is True or False and give a reason.\n(49) The landlady obeyed Mr Ho's instructions to wait a week before playing the recorder.",
      options: ["True", "False"],
      answer: "False — The landlady did NOT obey Mr Ho's instructions. Evidence: 'The landlady could not wait and spent the whole day at home playing her recorder.' She played it immediately (the same day), not after a week.",
      solution: {
        method: "True/False with reason — verify against paragraph 4",
        steps: [
          "Mr Ho's instruction: 'keep the recorder for a week before she played it.'",
          "What the landlady did: 'The landlady could not wait and spent the whole day at home playing her recorder.'",
          "She played it the SAME DAY, not after a week → she did NOT obey.",
          "Statement = FALSE.",
          "Reason: She 'could not wait' and played the recorder the same day, instead of waiting a week.",
        ],
        tip: "Mr Ho said WAIT A WEEK. The landlady played it THE SAME DAY. She did NOT obey → False. The evidence is 'The landlady could not wait' — she was impatient (she even admitted this).",
      },
    },
    {
      id: "chij_sa2_2022_H_50",
      marks: 1,
      question:
        "Write 1, 2 and 3 in the blanks below to sequence the order of the events in the passage. [1m]\n___ The landlady was scolded by Mr Ho for being impatient.\n___ The landlady demanded payment from Mr Ho.\n___ The landlady believed Mr Ho and took his recorder.",
      answer:
        "3 — The landlady was scolded by Mr Ho for being impatient.\n1 — The landlady demanded payment from Mr Ho.\n2 — The landlady believed Mr Ho and took his recorder.",
      solution: {
        method: "Sequencing events across paragraphs",
        steps: [
          "Step 1: Paragraph 1 — 'She demanded that Mr Ho pay what he owed her' → landlady demanded payment (1st).",
          "Step 2: Paragraph 3 — '\"If you give me your instrument, I shall forget your debt,\" she said' → she believed him and took the recorder (2nd).",
          "Step 3: Paragraph 4 — 'Mr Ho chided her for her impatience' = scolded her for being impatient (3rd).",
          "Order: Demand payment (1) → Take recorder (2) → Scolded (3).",
        ],
        tip: "Follow the story: First she demanded payment → then she believed the trick and took the recorder → then after playing it (and getting nothing), she went back and was scolded. Paragraph order guides the sequence.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — CHIJ SA2 2022 Paper 2
// ============================================================

export const chij_sa2_2022_paper2: Question[] = [
  ...sectionA,
  ...sectionB,
  grammarCloze1,
  grammarCloze2,
  vocabCloze,
  editing,
  ...sentenceCombining,
  compA,
  compB,
];

export const paperMetaCHIJ = {
  school: "CHIJ Primary (Toa Payoh)",
  code: "CHIJ(TP)",
  year: 2022,
  exam: "Semestral Assessment 2 (SA2 / EOY) — Paper 2",
  level: "Primary 3",
  totalMarks: 50,
  sections: [
    { name: "Section A: Grammar MCQ", questions: 8, marks: 8, topic: "GrammarMCQ" as Topic },
    { name: "Section B: Vocabulary MCQ", questions: 6, marks: 6, topic: "VocabMCQ" as Topic },
    { name: "Section C: Grammar Cloze 1 — Barbecue", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section C: Grammar Cloze 2 — Joel the Shepherd", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section D: Vocabulary Cloze — Miss Molly", questions: 4, marks: 4, topic: "VocabCloze" as Topic },
    { name: "Section E: Editing Spelling — Grandmother's Stories", questions: 4, marks: 4, topic: "Editing" as Topic },
    { name: "Section F: Sentence Combining", questions: 4, marks: 4, topic: "SentenceCombining" as Topic },
    { name: "Section G: Comprehension A — Ben's Prank", questions: 8, marks: 8, topic: "ComprehensionOE" as Topic },
    { name: "Section H: Comprehension B — Mr Ho's Recorder", questions: 8, marks: 8, topic: "ComprehensionOE" as Topic },
  ],
};
