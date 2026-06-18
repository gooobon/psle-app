// ============================================================
// Anglo-Chinese School (Primary) — P3 English SA2 2022
// Paper 2, Booklet A  (20 marks total)
// Section A : Grammar MCQ       (Q1–8,   8 marks)
// Section B : Vocabulary MCQ    (Q9–14,  6 marks)
// Section C : Visual Text MCQ   (Q15–20, 6 marks)
//             Poster: Barker Road Learning Festival
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  SECTION A — Grammar MCQ (Q1–8, 8 marks)
// ============================================================

const sectionA_grammarMCQ: QuestionTypeA[] = [
  {
    kind: "single",
    id: "acsp_sa2_2022_A_01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Tom ___ to school when it started to rain.",
    options: ["walk", "is walking", "was walking", "were walking"],
    answer: 2,
    solution: {
      method: "Past Continuous Tense — interrupted action",
      steps: [
        "The sentence: 'Tom ___ to school when it started to rain.'",
        "'When it started to rain' = the interrupting action in Simple Past.",
        "Pattern: Past Continuous + 'when' + Simple Past.",
        "Tom was in the middle of walking (ongoing action) when the rain started (interruption).",
        "'was walking' = Past Continuous for singular subject 'Tom' (he/she/it → was).",
        "'were walking' is for plural subjects (we/they) — 'Tom' is singular.",
        "'walk' and 'is walking' are present tense — wrong for a past context.",
        "Answer: (3) was walking.",
      ],
      tip: "Past Continuous = was/were + verb-ing. Use 'was' for singular (I/he/she/it) and 'were' for plural (we/they). 'Tom was walking when it started to rain.' Think: the walk was the 'movie in the background' when the rain interrupted.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_02",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Mrs Lee ___ cookies and sells them at the fair.",
    options: ["bake", "bakes", "baked", "was baking"],
    answer: 1,
    solution: {
      method: "Subject-verb agreement + Simple Present Tense (habit/routine)",
      steps: [
        "The sentence describes Mrs Lee's activity of baking and selling cookies at the fair — a habitual activity.",
        "Simple Present Tense is used for habits/routines.",
        "Subject: 'Mrs Lee' = singular third-person (she).",
        "For singular third-person in Simple Present: add -s/-es to the verb.",
        "bake → bakes ✓.",
        "The coordination with 'sells' (also Simple Present, 3rd person singular) confirms this.",
        "'baked' is past tense — not a current habit.",
        "'was baking' is Past Continuous — action at a specific past moment.",
        "Answer: (2) bakes.",
      ],
      tip: "When you see 'and' connecting two verbs in the same sentence, they should be in the same tense. 'bakes...and sells' — both are Simple Present, 3rd person singular. The -s on 'sells' is your clue!",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_03",
    topic: "GrammarMCQ",
    marks: 1,
    question: "There was a ___ of buffaloes drinking water at the river.",
    options: ["herd", "flock", "pack", "school"],
    answer: 0,
    solution: {
      method: "Collective nouns for animals",
      steps: [
        "The sentence requires the correct COLLECTIVE NOUN for buffaloes.",
        "Collective nouns for animals: a HERD of buffaloes ✓.",
        "'flock' = for birds (a flock of birds/sheep) — not used for buffaloes.",
        "'pack' = for wolves or dogs (a pack of wolves).",
        "'school' = for fish (a school of fish).",
        "Buffaloes are large land mammals grouped as a HERD.",
        "Answer: (1) herd.",
      ],
      tip: "Collective noun groups to memorise: HERD (cattle, buffaloes, elephants), FLOCK (birds, sheep), PACK (wolves, dogs), SCHOOL (fish), PRIDE (lions), SWARM (bees).",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My sister ___ cry whenever she sees spiders. She is very afraid of them.",
    options: ["will", "must", "could", "should"],
    answer: 0,
    solution: {
      method: "Modal verbs — habitual tendency ('will')",
      steps: [
        "The sentence describes a habitual behaviour: 'whenever she sees spiders' (every time).",
        "'will' can express predictable, habitual behaviour: 'She will cry whenever she sees spiders' = she always/predictably cries. ✓",
        "'must' expresses strong obligation or necessity — not a habit.",
        "'could' expresses past ability or possibility — not the right fit for a present habit.",
        "'should' expresses advice — 'she should cry' makes no sense here.",
        "Answer: (1) will.",
      ],
      tip: "'Will' has a special use for expressing habitual or predictable behaviour: 'Oil will float on water', 'Boys will be boys', 'She will cry whenever she sees spiders.' This is different from future 'will'.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Hassan kicked a ball ___ the top of the fence and hit his neighbour.",
    options: ["in", "on", "over", "under"],
    answer: 2,
    solution: {
      method: "Prepositions of direction/movement",
      steps: [
        "The sentence describes the path of the ball: it was kicked and went ___ the top of the fence.",
        "The ball went past and beyond the top of the fence (and hit the neighbour on the other side).",
        "'over' = across and past the top of something ✓. 'Over the fence' means the ball went up and across the fence.",
        "'in' = inside something — a ball cannot go 'in the top of the fence'.",
        "'on' = on the surface — 'on the top of the fence' would mean it sat on the fence, not passed over it.",
        "'under' = below — the ball cannot go under the fence top and still hit the neighbour.",
        "Answer: (3) over.",
      ],
      tip: "Direction prepositions: OVER = across from one side to the other (clearning the obstacle), UNDER = below, THROUGH = via the inside, PAST = alongside. A ball going over a fence clears it and goes to the other side.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"You must paint the picture by ___. I will not help you," Ali\'s father told him.',
    options: ["myself", "himself", "yourself", "yourselves"],
    answer: 2,
    solution: {
      method: "Reflexive pronouns — matching subject",
      steps: [
        "Ali's father is speaking to Ali (second person singular: 'you').",
        "The sentence: 'You must paint the picture by ___.'",
        "Reflexive pronoun for 'you' (singular) = 'yourself'.",
        "'myself' = used when the speaker (I) does something alone → Father would say 'I will do it myself'.",
        "'himself' = used for he/him → If describing Ali in third person: 'He must do it himself.'",
        "'yourselves' = reflexive for 'you' plural — but Ali is one person (singular).",
        "Answer: (3) yourself.",
      ],
      tip: "Reflexive pronouns match the subject: myself (I), yourself (you singular), himself (he), herself (she), itself (it), ourselves (we), yourselves (you plural), themselves (they). Father speaks to ONE Ali = 'yourself'.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_07",
    topic: "GrammarMCQ",
    marks: 1,
    question: "James rested at home ___ he was unwell.",
    options: ["as", "so", "but", "and"],
    answer: 0,
    solution: {
      method: "Conjunctions — reason",
      steps: [
        "The two clauses: 'James rested at home' (result/action) + 'he was unwell' (reason).",
        "We need a conjunction showing the reason for resting.",
        "'as' is a subordinating conjunction meaning 'because' — it introduces the reason. ✓",
        "'James rested at home as he was unwell' = 'James rested because he was unwell'.",
        "'so' shows result — 'he was unwell, so he rested.' The clause order would be reversed.",
        "'but' shows contrast — there is no contrast here.",
        "'and' shows addition — doesn't show reason/cause.",
        "Answer: (1) as.",
      ],
      tip: "'As', 'since', and 'because' can all introduce reasons. 'As' and 'since' often come in the middle or beginning of a sentence: 'James rested as he was unwell.' = 'Since he was unwell, James rested.'",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_A_08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "There is ___ ringing the doorbell. Please see who it is.",
    options: ["no one", "anyone", "someone", "everyone"],
    answer: 2,
    solution: {
      method: "Indefinite pronouns — positive statement",
      steps: [
        "The sentence is a POSITIVE/AFFIRMATIVE statement: 'There is ___ ringing the doorbell.'",
        "'someone' is used in positive statements to refer to an unknown person. ✓",
        "'anyone' is used in negative statements and questions: 'Is there anyone at the door?', 'There isn't anyone.'",
        "'no one' means nobody — 'There is no one ringing the doorbell' would mean no person is there. But the next sentence 'Please see who it is' implies SOMEONE is there.",
        "'everyone' = all people — too broad and doesn't fit the context.",
        "Answer: (3) someone.",
      ],
      tip: "Indefinite pronoun rules: SOME-/SOME- words (someone, something, somewhere) = positive statements. ANY-/ANY- words (anyone, anything, anywhere) = negatives and questions. Someone IS at the door (positive) ✓.",
    },
  },
];

// ============================================================
//  SECTION B — Vocabulary MCQ (Q9–14, 6 marks)
// ============================================================

const sectionB_vocabMCQ: QuestionTypeA[] = [
  {
    kind: "single",
    id: "acsp_sa2_2022_B_09",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Tim is like a ___. He remembers everything his teacher taught him.",
    options: ["rag", "cloth", "towel", "sponge"],
    answer: 3,
    solution: {
      method: "Simile / figurative language — context",
      steps: [
        "The sentence says Tim 'remembers everything' — he absorbs all information.",
        "The comparison 'Tim is like a ___' describes how he absorbs information.",
        "A 'sponge' absorbs water (and everything it touches) completely — used as a simile for someone who absorbs knowledge easily. ✓",
        "The expression 'like a sponge' is commonly used to describe someone who learns and remembers everything quickly.",
        "'rag', 'cloth', and 'towel' are all types of fabric — they can absorb liquids but are NOT used in this common simile about memory/learning.",
        "Answer: (4) sponge.",
      ],
      tip: "The expression 'like a sponge' describes someone who absorbs information quickly and completely — just as a sponge absorbs water. E.g. 'Young children learn languages like sponges.'",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_B_10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Mrs Lee put on her jacket. She was feeling ___ in the air-conditioned room.",
    options: ["hot", "cold", "cool", "warm"],
    answer: 1,
    solution: {
      method: "Context clues — logical cause and effect",
      steps: [
        "Context: Mrs Lee put on her jacket in an air-conditioned room.",
        "Why would someone put on a jacket? → Because they feel COLD.",
        "Air-conditioned rooms are cold/chilly.",
        "'cold' = feeling too low in temperature, needing extra layers ✓.",
        "'hot' = feeling warm/overheated — putting on a jacket makes no sense if you're hot.",
        "'cool' = slightly cold but comfortable — putting on a jacket suggests she felt MORE than just cool.",
        "'warm' = comfortably warm — if warm, she would NOT need a jacket.",
        "Answer: (2) cold.",
      ],
      tip: "When someone puts on extra clothing (jacket, coat, sweater), they are feeling COLD. The action tells you about the feeling. Air conditioners make rooms cold — so Mrs Lee felt cold and put on her jacket.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_B_11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "While walking along the pavement, I accidentally stepped into a ___ of water.",
    options: ["puddle", "wave", "drop", "sea"],
    answer: 0,
    solution: {
      method: "Vocabulary — appropriate noun for context",
      steps: [
        "Context: walking along the pavement (sidewalk) and stepping into a small amount of water.",
        "A 'puddle' is a small pool of water on the ground (from rain) — found on pavements ✓.",
        "'wave' = water that moves in the sea/ocean — you cannot step into a wave on a pavement.",
        "'drop' = a tiny amount of water (a raindrop) — far too small to 'step into'.",
        "'sea' = a large body of water — impossible to find on a pavement.",
        "Answer: (1) puddle.",
      ],
      tip: "A 'puddle' is a small shallow pool of water on the ground, usually from rain. You can accidentally step into a puddle while walking — this is a very common everyday experience!",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_B_12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "I ___ these interesting books from the school library yesterday.",
    options: ["lent", "rented", "bought", "borrowed"],
    answer: 3,
    solution: {
      method: "Vocabulary — library context + verb direction",
      steps: [
        "Context: taking books FROM the school library.",
        "When you take books from a library to use temporarily and return them, you 'borrow' them.",
        "'borrowed' = past tense of borrow = to take something temporarily from someone/somewhere ✓.",
        "'lent' = to give something to someone temporarily — you LEND to others; a library LENDS to you. A student does not 'lend' from a library.",
        "'rented' = to pay money to use something temporarily — libraries are usually free; you borrow, not rent.",
        "'bought' = to purchase permanently — library books are borrowed, not bought.",
        "Answer: (4) borrowed.",
      ],
      tip: "Important word pair: LEND (give) vs BORROW (take). 'The library LENDS books to students.' 'Students BORROW books from the library.' You are the one receiving → you BORROWED.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_B_13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "I unlocked and opened the ___ to let the fresh air in.",
    options: ["shelves", "curtains", "drawers", "windows"],
    answer: 3,
    solution: {
      method: "Vocabulary — context + physical logic",
      steps: [
        "Actions: 'unlocked and opened the ___' + purpose 'to let the fresh air in'.",
        "What can be unlocked, opened, AND lets fresh air in?",
        "'windows' = can be locked/unlocked, opened, and allow fresh air to enter ✓.",
        "'shelves' = cannot be unlocked or opened; they hold objects.",
        "'curtains' = soft fabric that can be drawn open but NOT unlocked (they have no lock).",
        "'drawers' = can be opened but cannot let fresh air in (they are furniture compartments).",
        "Answer: (4) windows.",
      ],
      tip: "Use ALL the clues in the sentence: (1) 'unlocked' → needs a lock, (2) 'opened' → can open, (3) 'let fresh air in' → must allow airflow. Only WINDOWS have all three features.",
    },
  },
  {
    kind: "single",
    id: "acsp_sa2_2022_B_14",
    topic: "VocabMCQ",
    marks: 1,
    question: "National Day is celebrated ___ on 9 August.",
    options: ["daily", "yearly", "weekly", "monthly"],
    answer: 1,
    solution: {
      method: "Vocabulary — frequency words + factual knowledge",
      steps: [
        "Context: 'National Day is celebrated ___ on 9 August.'",
        "National Day (Singapore's) happens ONCE A YEAR, on 9 August.",
        "'yearly' = once a year / annually ✓.",
        "'daily' = every day — National Day is not celebrated every day.",
        "'weekly' = every week — National Day is not weekly.",
        "'monthly' = every month — National Day is not monthly.",
        "Answer: (2) yearly.",
      ],
      tip: "Frequency words: daily (every day), weekly (every week), monthly (every month), yearly/annually (every year). National Day is an annual event (once per year) = yearly.",
    },
  },
];

// ============================================================
//  SECTION C — Visual Text Comprehension (Q15–20, 6 marks)
//  Poster: Barker Road Learning Festival
// ============================================================

const visualTextPassage = `BARKER ROAD LEARNING FESTIVAL

Come and join us at the Barker Road Learning Festival.
Date: 1 December
Time: 8 a.m. to 1 p.m.
Venue: Barker Road Community Club
This learning festival aims to encourage everyone to learn new skills.

ACTIVITIES FOR FAMILIES: 8 a.m. to 10 a.m.
Parents can take part in these activities with their children and learn with them.
• Sandcastle Workshop — Learn to build sandcastles with special tools.
• Baking Workshop — Learn to bake 4 types of tarts from Chef Mel.
• Art Workshop — Learn to paint a portrait from an artist.

ACTIVITIES FOR PRIMARY SCHOOL CHILDREN: 1 p.m. to 3 p.m.
Collect coupons from Barker Road Community Club from 1 to 30 September to take part in these activities:
• K-pop Dance Workshop
• Beatboxing Workshop

• To register for the workshops, scan the QR code.
• For more details, visit the official website at www.barkerroadlf.com or call Julie at 6388 7779.
• Registration will end on 25 November at 11 p.m.
• Early birds who register before 1 November get a goodie bag.

Organised by: Barker Road Community Club
Sponsored by: Learning For Everyone Centre
Supported by: Families Forever Club`;

export const sectionC_visualText: QuestionTypeB = {
  kind: "set",
  id: "acsp_sa2_2022_C_visual",
  topic: "VisualText",
  passage: visualTextPassage,
  questions: [
    {
      id: "acsp_sa2_2022_C_15",
      marks: 1,
      question:
        "The purpose of the learning festival is to ___.",
      options: [
        "collect coupons for the activities",
        "encourage children only to learn",
        "promote learning of new skills",
        "get families to bond",
      ],
      answer: "promote learning of new skills",
      solution: {
        method: "Locate purpose statement in visual text",
        steps: [
          "The poster states: 'This learning festival aims to encourage everyone to learn new skills.'",
          "The purpose = to encourage EVERYONE to learn new skills = promote learning of new skills. ✓",
          "Option (1): 'collect coupons' — coupons are for children's activities, not the overall purpose.",
          "Option (2): 'encourage children only' — the poster says 'EVERYONE', not only children.",
          "Option (4): 'get families to bond' — bonding is a benefit but not the stated aim of the festival.",
          "Answer: (3) promote learning of new skills.",
        ],
        tip: "For purpose questions, look for key phrases like 'aims to', 'purpose is to', 'is designed to'. The poster says 'aims to encourage everyone to learn new skills' → the purpose is promoting/encouraging learning of new skills.",
      },
    },
    {
      id: "acsp_sa2_2022_C_16",
      marks: 1,
      question: "The activities for families are held in the ___.",
      options: ["night", "evening", "morning", "afternoon"],
      answer: "morning",
      solution: {
        method: "Locate specific time information in visual text",
        steps: [
          "The poster: 'ACTIVITIES FOR FAMILIES: 8 a.m. to 10 a.m.'",
          "8 a.m. to 10 a.m. = morning hours.",
          "'morning' = the period from early to around noon ✓.",
          "'afternoon' = 12 noon to 6 p.m. — family activities are 8-10 a.m., NOT afternoon.",
          "'evening' = approximately 6 p.m. onwards — not applicable.",
          "'night' = after dark — the activities are in the morning.",
          "Answer: (3) morning.",
        ],
        tip: "Time of day: morning = before noon (a.m.), afternoon = noon to ~6 p.m. (p.m.), evening = ~6-9 p.m., night = after 9 p.m. 8 a.m. to 10 a.m. = morning.",
      },
    },
    {
      id: "acsp_sa2_2022_C_17",
      marks: 1,
      question: "To register for the workshops, you can ___.",
      options: [
        "call Julie",
        "visit the website",
        "scan the QR code",
        "go to the community club",
      ],
      answer: "scan the QR code",
      solution: {
        method: "Locate specific instruction in visual text",
        steps: [
          "The poster: 'To register for the workshops, scan the QR code.'",
          "The specific instruction for REGISTRATION is: scan the QR code ✓.",
          "'call Julie' / 'visit the website' — these are for getting MORE DETAILS, not registering.",
          "'go to the community club' — this is where you collect coupons (for children's activities), not to register.",
          "Answer: (3) scan the QR code.",
        ],
        tip: "For visual text questions, match the EXACT action required to the EXACT outcome. 'Register' ≠ 'get more details'. The QR code is specifically for registration; the website/phone is for more details.",
      },
    },
    {
      id: "acsp_sa2_2022_C_18",
      marks: 1,
      question:
        "The Barker Road Learning Festival is sponsored by ___.",
      options: [
        "Barker Road",
        "Families Forever Club",
        "Barker Road Community Club",
        "Learning For Everyone Centre",
      ],
      answer: "Learning For Everyone Centre",
      solution: {
        method: "Locate 'sponsored by' in visual text",
        steps: [
          "The poster clearly states: 'Sponsored by: Learning For Everyone Centre'.",
          "'Organised by: Barker Road Community Club' — this is the organiser, NOT sponsor.",
          "'Supported by: Families Forever Club' — this is the supporter, NOT sponsor.",
          "These three roles (organised/sponsored/supported) are different.",
          "Answer: (4) Learning For Everyone Centre.",
        ],
        tip: "Visual texts often have multiple organisations listed with different roles. Be careful to match the RIGHT role. 'Sponsored by' ≠ 'Organised by' ≠ 'Supported by'. Read carefully and find 'sponsored'.",
      },
    },
    {
      id: "acsp_sa2_2022_C_19",
      marks: 1,
      question:
        "Students need to collect coupons from the community club in ___.",
      options: ["September", "October", "November", "December"],
      answer: "September",
      solution: {
        method: "Locate coupon collection period in visual text",
        steps: [
          "The poster: 'Collect coupons from Barker Road Community Club from 1 to 30 September.'",
          "Coupon collection period = 1 to 30 September ✓.",
          "'November' — this is when registration ends (25 November).",
          "'December' — this is when the festival is held (1 December).",
          "'October' — not mentioned as a significant date.",
          "Answer: (1) September.",
        ],
        tip: "Multiple dates are mentioned in the poster. Be careful to link each date to the correct event: September = coupon collection, November 1 = early bird deadline, November 25 = registration end, December 1 = festival date.",
      },
    },
    {
      id: "acsp_sa2_2022_C_20",
      marks: 1,
      question: "Which of the following is TRUE of the event?",
      options: [
        "Families can take part in the Beatboxing Workshop.",
        "Participants will learn to bake more than 4 types of tarts.",
        "All primary school children can take part in afternoon activities.",
        "Participants can get a goodie bag if they sign up on 1 November.",
      ],
      answer: "Participants can get a goodie bag if they sign up on 1 November.",
      solution: {
        method: "Fact-checking each option against visual text",
        steps: [
          "Option (1): Families can take part in Beatboxing Workshop. → FALSE. Beatboxing is for PRIMARY SCHOOL CHILDREN, not families.",
          "Option (2): Participants will learn to bake MORE THAN 4 types of tarts. → FALSE. The poster says 'bake 4 types of tarts' — exactly 4, not more than 4.",
          "Option (3): ALL primary school children can take part in afternoon activities. → FALSE. Only children who COLLECT COUPONS (from 1-30 September) can join these activities.",
          "Option (4): Participants can get a goodie bag if they sign up on 1 November. → TRUE. 'Early birds who register BEFORE 1 November get a goodie bag.' If they sign up ON 1 November (i.e., before the deadline), they qualify. ✓",
          "Answer: (4).",
        ],
        tip: "For 'which is TRUE' questions, systematically check each option against the poster. For Option 4: 'before 1 November' = before the 1st, which means registering on 1 November itself qualifies as 'before' (the deadline is 25 November; 1 November is an early bird date). Always check the EXACT words.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — ACS(P) Booklet A
// ============================================================

export const acsp_sa2_2022_bookletA: Question[] = [
  ...sectionA_grammarMCQ,
  ...sectionB_vocabMCQ,
  sectionC_visualText,
];

export const paperMetaACSP = {
  school: "Anglo-Chinese School (Primary)",
  code: "ACS(P)",
  year: 2022,
  exam: "Semestral Assessment 2 (SA2 / EOY)",
  level: "Primary 3",
  paper: "Paper Two (Booklet A)",
  totalMarks: 20,
  sections: [
    { name: "Section A: Grammar MCQ", questions: 8, marks: 8, topic: "GrammarMCQ" as Topic },
    { name: "Section B: Vocabulary MCQ", questions: 6, marks: 6, topic: "VocabMCQ" as Topic },
    { name: "Section C: Visual Text Comprehension", questions: 6, marks: 6, topic: "VisualText" as Topic },
  ],
};
