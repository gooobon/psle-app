// ============================================================
// Tao Nan School — 2023 Practice Paper 3, Primary 3
// English Language Paper  (50 marks)
// Sections: A Grammar MCQ (9) | B Vocabulary MCQ (6) | C Visual Text (5)
//           D Grammar Cloze (4) | E Comprehension Cloze (4)
//           F Synthesis & Transformation (8) | G Editing (6) | H Comprehension OE (8)
// ============================================================

import type {
  TopicType,
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Tao Nan School",
  level: "Primary 3",
  subject: "English Language",
  term: "Practice Paper 3",
  year: 2023,
  totalMarks: 50,
  timeMinutes: 0, // not stated on paper
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Grammar MCQ  (Q1–Q9, 9 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "taonan2023-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Mrs Chan __________ me English last year.",
    options: ["(1) teach", "(2) taught", "(3) teaches", "(4) teaching"],
    answer: "2",
    solution: {
      method: "Tense: 'last year' is a specific past time marker → simple past required.",
      steps: [
        "'last year' → definite past time → SIMPLE PAST tense.",
        "'teach' → base form (present) → WRONG.",
        "'taught' → simple past of 'teach' → CORRECT.",
        "'teaches' → third-person singular present → WRONG.",
        "'teaching' → present participle, needs auxiliary → WRONG alone.",
        "Answer: (2) taught.",
      ],
      tip: "Irregular verb: teach → taught (past), taught (past participle). Time words like 'last year/week/month' always trigger simple past.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Sumei stood nervously on stage. She tried to speak but __________ words came out of her mouth.",
    options: ["(1) no", "(2) all", "(3) any", "(4) some"],
    answer: "1",
    solution: {
      method: "Quantifier in negative context after 'but': 'no words came out' = zero words.",
      steps: [
        "Context: she tried to speak BUT ______ words came out → no words came out at all.",
        "'no' + noun = zero quantity in a positive sentence structure. 'No words came out' = not a single word.",
        "'all' → 'all words came out' → opposite meaning.",
        "'any' → 'any words came out' → would need 'didn't' for the negative (She tried but didn't say any words).",
        "'some' → positive quantity → doesn't fit 'she tried to speak but…'.",
        "Answer: (1) no.",
      ],
      tip: "Use 'no + noun' in a positive sentence structure to express zero: 'no words' = 'not a single word'. Don't confuse with 'not any' which needs a negative verb.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Your sister is going to the library later, __________ ?",
    options: ["(1) is she", "(2) isn't she", "(3) does she", "(4) doesn't she"],
    answer: "2",
    solution: {
      method: "Question tag: positive statement with auxiliary 'is' → negative tag 'isn't she'.",
      steps: [
        "Statement: 'Your sister IS going to the library later' → positive, present continuous.",
        "Auxiliary in statement: IS.",
        "Positive statement → NEGATIVE tag.",
        "Tag must use same auxiliary: ISN'T.",
        "Subject pronoun for 'your sister' = she.",
        "Correct tag: isn't she?",
        "'is she' → positive tag → WRONG (statement is positive).",
        "'does/doesn't she' → wrong auxiliary (statement uses 'is', not 'does').",
        "Answer: (2) isn't she.",
      ],
      tip: "Present continuous: is/are + -ing → tag uses is/are. Positive statement → negative tag. 'Your sister is going…, isn't she?'",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"The mail in the drawers __________ mine but Dad\'s," I told my mother.',
    options: ["(1) isn't", "(2) aren't", "(3) wasn't", "(4) weren't"],
    answer: "1",
    solution: {
      method: "Subject-verb agreement + tense: 'the mail' is singular; direct speech uses present tense.",
      steps: [
        "Subject: 'The mail' (singular, uncountable) — the letters/post in the drawers.",
        "The speaker is currently telling the mother → present tense context (direct speech).",
        "Singular present negative: ISN'T.",
        "'aren't' → plural → WRONG (mail is singular).",
        "'wasn't/weren't' → past tense → WRONG (direct speech is present).",
        "Answer: (1) isn't.",
      ],
      tip: "'Mail' as a noun for letters/post is uncountable and singular → isn't (not aren't). In direct speech ('I told my mother…'), the quoted sentence stays in its original tense.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My uncle met the President __________ at the Istana and even shook her hand.",
    options: [
      "(1) herself",
      "(2) himself",
      "(3) myself",
      "(4) ourselves",
    ],
    answer: "1",
    solution: {
      method: "Reflexive/emphatic pronoun: must match the subject being emphasised ('the President').",
      steps: [
        "The pronoun emphasises 'the President' (an additional emphasis, not a reflexive action).",
        "The President is referred to with 'her hand' → she/her → female.",
        "Emphatic pronoun for she/her = HERSELF.",
        "'himself' → male → WRONG (shook HER hand confirms female).",
        "'myself' → first person → WRONG (subject is uncle).",
        "'ourselves' → plural first person → WRONG.",
        "Answer: (1) herself.",
      ],
      tip: "Emphatic pronouns: myself, yourself, himself, HERSELF, itself, ourselves, yourselves, themselves. Match the gender and number of the noun being emphasised. 'The President herself' = even the President (emphasis on importance).",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Camouflage helps some prey blend into their habitats. __________ makes them difficult for predators to find.",
    options: ["(1) This", "(2) That", "(3) These", "(4) Those"],
    answer: "1",
    solution: {
      method: "Demonstrative pronoun referring back to the previous sentence: singular concept = 'This'.",
      steps: [
        "The second sentence refers to the IDEA/FACT stated in the first sentence (that camouflage helps prey blend in).",
        "The concept referred to is singular (one idea/fact).",
        "'This' = demonstrative pronoun referring to a just-mentioned idea or nearby concept. CORRECT.",
        "'That' = singular but refers to something further away or previously mentioned more distantly.",
        "'These/Those' = plural → WRONG (one idea is singular).",
        "'This' is standard when referring to the immediately preceding statement.",
        "Answer: (1) This.",
      ],
      tip: "When the second sentence refers back to the idea of the first sentence, use 'This' (singular concept just mentioned). 'This makes them…' = 'The fact that they blend in makes them…'",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q7",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Ramu __________ in the basketball tournament next week.",
    options: [
      "(1) play",
      "(2) plays",
      "(3) has played",
      "(4) will be playing",
    ],
    answer: "4",
    solution: {
      method: "Future tense: 'next week' signals a future event; future continuous fits a planned ongoing action.",
      steps: [
        "'next week' → FUTURE event.",
        "(1) play → base form, present → WRONG.",
        "(2) plays → present simple → WRONG tense.",
        "(3) has played → present perfect → refers to recent past, not future → WRONG.",
        "(4) will be playing → future continuous → planned action that will be in progress next week → CORRECT.",
        "Answer: (4) will be playing.",
      ],
      tip: "Future continuous (will be + -ing) is used for actions that will be in progress at a future time. 'He will be playing in the tournament next week' = it's arranged and he'll be in the middle of it.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q8",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Chek Jawa has a rich collection of plants, birds and animals. There, we can learn about and __________ nature.",
    options: [
      "(1) enjoy",
      "(2) enjoys",
      "(3) enjoyed",
      "(4) can enjoy",
    ],
    answer: "4",
    solution: {
      method: "Parallel structure after 'can learn about and ___': the second verb must match the first.",
      steps: [
        "Structure: 'we CAN learn about and ______ nature.'",
        "The conjunction 'and' joins two verbs: 'learn about' and '______'.",
        "Both verbs share the auxiliary 'can': 'we can learn about and can enjoy' → shortened to 'can enjoy'.",
        "(4) can enjoy → maintains parallel structure with 'can learn'. CORRECT.",
        "(1) enjoy → base form works grammatically ('can learn and enjoy'), but the answer key confirms (4).",
        "With 'and' linking verbs, both often need the same auxiliary structure for clarity.",
        "Answer: (4) can enjoy.",
      ],
      tip: "Parallel structure: 'we can [learn about] and [can enjoy] nature' → both actions share the modal 'can'. Writing 'can enjoy' makes the parallelism explicit.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q9",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Father cannot go to work today as he is down __________ a bad cold.",
    options: ["(1) on", "(2) by", "(3) from", "(4) with"],
    answer: "4",
    solution: {
      method: "Fixed prepositional phrase: 'down with a cold/illness'.",
      steps: [
        "'He is down ______ a bad cold' — fill in the preposition.",
        "Fixed idiom: 'down WITH a cold/fever/flu' = suffering from an illness.",
        "(4) with → 'down with a bad cold' → CORRECT. Standard phrase.",
        "(1) on → 'down on a cold' → not standard.",
        "(2) by → 'down by a cold' → not standard.",
        "(3) from → 'down from a cold' → not standard.",
        "Answer: (4) with.",
      ],
      tip: "Fixed idiom: 'be down with [illness]' = be ill with that disease. 'She is down with the flu' / 'He is down with a fever.'",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Vocabulary MCQ  (Q10–Q15, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "taonan2023-q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "To find her missing cat, Lucy put up several __________ of her pet all around her neighbourhood.",
    options: [
      "(1) posters",
      "(2) banners",
      "(3) brochures",
      "(4) advertisements",
    ],
    answer: "1",
    solution: {
      method: "Vocabulary: identify the correct word for notices put up to find a missing animal.",
      steps: [
        "Clue: 'to find her missing cat' + 'put up … all around her neighbourhood'.",
        "'posters' = printed sheets displaying an image and information, put up on walls/poles to notify people. COMMON for missing pets. CORRECT.",
        "'banners' = large horizontal signs (usually for events/promotions), not typically for missing pets.",
        "'brochures' = folded leaflets for information/advertising → not put up on walls.",
        "'advertisements' = could work broadly, but specifically for missing pets, 'posters' is the standard word.",
        "Answer: (1) posters.",
      ],
      tip: "Missing pet notices = posters (or flyers, notices). 'Put up posters' is the standard collocation. You put up posters on trees, walls, and lamp posts.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My father bought the __________ computer model as his current one does not have the newest features.",
    options: ["(1) latest", "(2) purest", "(3) largest", "(4) strongest"],
    answer: "1",
    solution: {
      method: "Vocabulary: the reason given ('does not have the newest features') determines the answer.",
      steps: [
        "Reason for buying new computer: 'does not have the newest features'.",
        "He wants the model with the NEWEST features → 'latest' = most recent/newest.",
        "'latest' → the most recent model → matches 'newest features'. CORRECT.",
        "'purest' → free from contamination → irrelevant to computers.",
        "'largest' → biggest size → not implied by 'newest features'.",
        "'strongest' → most powerful/durable → possible but 'newest features' specifically points to 'latest'.",
        "Answer: (1) latest.",
      ],
      tip: "'Latest' = most recent/newest (in time). 'Latest model' = the newest model. The clue 'newest features' directly points to 'latest'.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The icy mountain was so slippery that we __________ down the track instead of walking on it.",
    options: [
      "(1) strode",
      "(2) strolled",
      "(3) scuttled",
      "(4) slithered",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: choose the movement verb that fits slipping on an icy surface.",
      steps: [
        "Context: icy mountain, very slippery, they couldn't walk → they moved in a sliding/gliding way.",
        "'strode' = walked with long, confident steps → implies control, not slipping → WRONG.",
        "'strolled' = walked slowly and leisurely → implies control → WRONG.",
        "'scuttled' = moved quickly with short steps (like a crab) → doesn't match icy sliding → WRONG.",
        "'slithered' = moved smoothly, twisting/sliding along a surface (like a snake or on ice) → CORRECT. Perfect for sliding on an icy surface.",
        "Answer: (4) slithered.",
      ],
      tip: "Slithered = slid/glided in a sinuous way along a surface. On ice or mud, people/animals slither. Snakes slither. It implies uncontrolled smooth movement.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Aminah's house was burgled last week. The police are __________ the case.",
    options: [
      "(1) looking up",
      "(2) looking by",
      "(3) looking for",
      "(4) looking into",
    ],
    answer: "4",
    solution: {
      method: "Phrasal verb: choose the phrasal verb meaning 'to investigate'.",
      steps: [
        "Context: burglary → police involvement → investigating.",
        "'looking up' = searching for information (in a book/database) OR looking upward → WRONG in this context.",
        "'looking by' = NOT a standard phrasal verb.",
        "'looking for' = trying to find something/someone → the police aren't looking FOR the case, they're investigating it.",
        "'looking into' = investigating or examining a matter closely → CORRECT. 'The police are looking into the case' = investigating it.",
        "Answer: (4) looking into.",
      ],
      tip: "'Look into' = investigate/examine. 'The authorities looked into the matter.' Don't confuse with 'look for' (search for) or 'look up' (find info/look upward).",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Melody waited __________ for her father to return home with her favourite fruit – durians.",
    options: [
      "(1) keenly",
      "(2) eagerly",
      "(3) determinedly",
      "(4) wholeheartedly",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: choose the adverb matching waiting with excitement and anticipation.",
      steps: [
        "Context: Melody is waiting for her FAVOURITE fruit → she is excited and impatient.",
        "'keenly' = with great interest and enthusiasm → possible, but 'eagerly' is more specifically about waiting with anticipation.",
        "'eagerly' = with great enthusiasm and desire; implies happy impatience → BEST for waiting for something you love. CORRECT.",
        "'determinedly' = with determination/willpower → suits overcoming challenges, not waiting for a treat.",
        "'wholeheartedly' = with total commitment/sincerity → more for activities or beliefs, not waiting.",
        "Answer: (2) eagerly.",
      ],
      tip: "'Wait eagerly' = standard collocation for excited anticipation. You wait eagerly for a gift, a meal, an event. 'Eagerly' always implies positive excitement.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q15",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Weiming's face turned red with __________ when he realised that he had worn his pyjama bottoms to school.",
    options: [
      "(1) fear",
      "(2) disbelief",
      "(3) hesitation",
      "(4) embarrassment",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: identify the emotion that makes a face turn red in this situation.",
      steps: [
        "Situation: Weiming wore PYJAMAS to school — a very embarrassing mistake.",
        "'fear' → fear can cause paleness, not typically red face; also fear doesn't match the situation.",
        "'disbelief' → shock at not believing something → face might not turn red.",
        "'hesitation' → uncertainty before acting → not an emotion that causes blushing.",
        "'embarrassment' → social shame/awkwardness → causes blushing (face turning red). CORRECT.",
        "Answer: (4) embarrassment.",
      ],
      tip: "Red face = embarrassment or anger. In this context (silly mistake at school), embarrassment is the clear answer. 'Turn red with embarrassment' is a fixed collocation.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Visual Text Comprehension  (Q16–Q20, 5 marks)
  //  Advertisement: 2 Days 1 Night Stargazing Camp
  //  Organised by Channing Space Club
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "taonan2023-secC",
    topic: "VisualText",
    marks: 5,
    passageTitle: "Advertisement: 2 Days 1 Night Stargazing Camp",
    passageText: `
ADVERTISEMENT TEXT (visual):
Title: 2 Days 1 Night Stargazing Camp — Organised by Channing Space Club

VENUE: Seablue Campsite
- 1 hour's drive from Channing Space Club
- Dark skies make it ideal and popular for stargazers
- Telescopes will NOT be provided

PARTICIPANTS: Children of ages 9 and 10

COST: $100 per participant
INCLUDES:
- 3 meals for 2 days
- Transport to the campsite
- Singapore Space Observatory entry tickets
- Free T-shirt!

ACTIVITIES:
Day 1 — Seablue Campsite:
• Learn how to identify the stars and planets without using a telescope
• Make your own telescope and learn how to use it (no experience needed)
  - Use recyclable materials to make your very own telescope
  - Materials will be provided
• Camping under the stars
  - Bring your own sleeping bags
  - Tents will be provided

Day 2 — Visit to the Singapore Space Observatory:
• 45-minute drive from the campsite
• Learn more about the skies from our experienced trainers

Registration closes on 11 November 2022

Early bird offer: $20 off if you register before 31 October 2022

Download the application form at www.channingspaceclub.com and
email it to channingspaceclub@gmail.com

For enquiries, call Mr Joseph Lim at 6443 2154
    `.trim(),
    questions: [
      {
        qid: "taonan2023-q16",
        question:
          "The main aim of the camp is to __________.\n(1) introduce children to stargazing\n(2) visit the Singapore Space Observatory\n(3) teach children how to make a telescope\n(4) recruit new members to join Channing Space Club",
        options: [
          "(1) introduce children to stargazing",
          "(2) visit the Singapore Space Observatory",
          "(3) teach children how to make a telescope",
          "(4) recruit new members to join Channing Space Club",
        ],
        answer: "1",
        solution: {
          method: "Visual text: identify the MAIN/overall aim of the camp from the title and activities.",
          steps: [
            "Title: '2 Days 1 Night STARGAZING Camp' → stargazing is the central theme.",
            "(1) Introduce children to stargazing → MAIN aim, encompasses all activities.",
            "(2) Visit the Singapore Space Observatory → one activity, not the MAIN aim.",
            "(3) Teach how to make a telescope → one activity on Day 1, not the main aim.",
            "(4) Recruit new members → not mentioned anywhere.",
            "Answer: (1) introduce children to stargazing.",
          ],
          tip: "For 'main aim' questions, look at the title and overall theme, not individual activities. Activities are means to achieve the main aim.",
        },
      },
      {
        qid: "taonan2023-q17",
        question:
          "The camp is organised by __________.\n(1) Mr Joseph Lim\n(2) Seablue Campsite\n(3) Channing Space Club\n(4) Singapore Space Observatory",
        options: [
          "(1) Mr Joseph Lim",
          "(2) Seablue Campsite",
          "(3) Channing Space Club",
          "(4) Singapore Space Observatory",
        ],
        answer: "3",
        solution: {
          method: "Literal reading of the advertisement header.",
          steps: [
            "The advertisement clearly states: 'Organised by Channing Space Club'.",
            "Mr Joseph Lim = contact person for enquiries, NOT the organiser.",
            "Seablue Campsite = the venue.",
            "Singapore Space Observatory = visited on Day 2.",
            "Answer: (3) Channing Space Club.",
          ],
          tip: "Organised by ≠ contact person / venue / place visited. Always read the specific label 'organised by' in the ad.",
        },
      },
      {
        qid: "taonan2023-q18",
        question:
          "Seablue Campsite is a suitable location for stargazing because it is __________.\n(1) dimly lit\n(2) a popular spot\n(3) equipped with telescopes\n(4) located very near Channing Space Club",
        options: [
          "(1) dimly lit",
          "(2) a popular spot",
          "(3) equipped with telescopes",
          "(4) located very near Channing Space Club",
        ],
        answer: "1",
        solution: {
          method: "Inference from visual text: why are dark skies good for stargazing?",
          steps: [
            "Ad says: 'The dark skies of this campsite make it an ideal and popular spot for stargazers.'",
            "Dark skies = no artificial light = DIMLY LIT → good for seeing stars.",
            "(1) dimly lit → matches 'dark skies' — inferred from 'dark skies'. CORRECT.",
            "(2) popular spot → mentioned, but popularity isn't why it's SUITABLE for stargazing.",
            "(3) equipped with telescopes → OPPOSITE: 'Telescopes will not be provided'.",
            "(4) located very near → OPPOSITE: '1 hour's drive away from Channing Space Club'.",
            "Answer: (1) dimly lit.",
          ],
          tip: "Inference: 'dark skies' = low light pollution = dimly lit = good for stargazing. Bright city lights make it hard to see stars.",
        },
      },
      {
        qid: "taonan2023-q19",
        question:
          "The participants of the camp must __________.\n(1) pay an additional $100 for meals\n(2) come prepared with sleeping bags\n(3) go to Seablue Campsite on their own\n(4) buy the T-shirt from Channing Space Club",
        options: [
          "(1) pay an additional $100 for meals",
          "(2) come prepared with sleeping bags",
          "(3) go to Seablue Campsite on their own",
          "(4) buy the T-shirt from Channing Space Club",
        ],
        answer: "2",
        solution: {
          method: "Locate specific requirements stated in the advertisement.",
          steps: [
            "(1) pay an additional $100 for meals → WRONG: the $100 fee already INCLUDES 3 meals.",
            "(2) come prepared with sleeping bags → 'Bring your own sleeping bags' → CORRECT. Participants must bring their own.",
            "(3) go to Seablue Campsite on their own → WRONG: 'transport to the campsite' is included in the $100.",
            "(4) buy the T-shirt → WRONG: T-shirt is FREE (included).",
            "Answer: (2) come prepared with sleeping bags.",
          ],
          tip: "Check what's INCLUDED vs what participants must bring themselves. Transport and T-shirt are included; sleeping bags are NOT.",
        },
      },
      {
        qid: "taonan2023-q20",
        question:
          "Which one of the following statements is TRUE?\n(1) Participants have to bring their own tents.\n(2) Participants must email their interest to Mr Joseph Lim.\n(3) Participants will need to know how to use a telescope.\n(4) Participants pay less if they register before 31 October 2022.",
        options: [
          "(1) Participants have to bring their own tents.",
          "(2) Participants must email their interest to Mr Joseph Lim.",
          "(3) Participants will need to know how to use a telescope.",
          "(4) Participants pay less if they register before 31 October 2022.",
        ],
        answer: "4",
        solution: {
          method: "Evaluate each statement against the advertisement facts.",
          steps: [
            "(1) Bring their own tents → 'Tents will be provided' → FALSE.",
            "(2) Email to Mr Joseph Lim → WRONG: email the APPLICATION FORM to channingspaceclub@gmail.com. Mr Joseph Lim is for phone enquiries.",
            "(3) Need to know how to use a telescope → 'no experience needed' / 'learn how to use it' → they learn AT the camp → FALSE.",
            "(4) Pay less if register before 31 October → 'Early bird offer: $20 off if you register before 31 October 2022' → TRUE. $100 - $20 = $80.",
            "Answer: (4).",
          ],
          tip: "For 'which is TRUE' questions, systematically check each option against the text. Look for exact supporting evidence.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Grammar Cloze  (Q21–Q24, 4 marks)
  //  Passage: Fishing Encounter with a Snake
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "taonan2023-secD",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "A Fishing Encounter (adapted from http://readworks.org)",
    passageText:
      "I was fishing at a river one afternoon. All of a sudden, I felt something tickling my foot. I looked (21) __________ and realised that it was a long, black snake! It appeared to be asleep (22) __________ the ankle-deep water. I stood frozen (23) __________ the ground as the water shifted a part of (24) __________ body onto my leg. Within a split second, I leapt out of the water. Filled with fear, I reminded myself never to fish in that area again.",
    wordBank: {
      A: "at",
      B: "down",
      C: "in",
      D: "into",
      E: "its",
      F: "it's",
      G: "to",
      H: "up",
    },
    questions: [
      {
        qid: "taonan2023-q21",
        blankLabel: "(21)",
        question: "I looked (21) __________ and realised that it was a long, black snake!",
        answer: "B",
        solution: {
          method: "Preposition/adverb of direction: looking towards your feet while standing in water.",
          steps: [
            "The narrator felt something tickling their FOOT → naturally would look DOWN to see it.",
            "B (down) → 'looked down' = directed gaze downward → CORRECT.",
            "H (up) → 'looked up' = looked above → WRONG (snake is at foot level).",
            "A (at) → 'looked at' needs an object → 'looked at and realised' is incomplete.",
            "Answer: B (down).",
          ],
          tip: "'Look down' = direct your gaze downward. Logical when something tickles your foot while standing in water.",
        },
      },
      {
        qid: "taonan2023-q22",
        blankLabel: "(22)",
        question: "It appeared to be asleep (22) __________ the ankle-deep water.",
        answer: "C",
        solution: {
          method: "Preposition of location: snake is inside/within the water.",
          steps: [
            "The snake is IN the water (submerged in ankle-deep water).",
            "C (in) → 'asleep in the ankle-deep water' → CORRECT. The snake is within the water.",
            "D (into) → 'into' is directional (movement from outside to inside) → WRONG here (no movement).",
            "A (at) → 'asleep at the water' → not natural for being submerged.",
            "Answer: C (in).",
          ],
          tip: "Use 'in' for being inside/within a liquid or enclosed space. 'In the water' = submerged in it. 'Into' = movement entering it.",
        },
      },
      {
        qid: "taonan2023-q23",
        blankLabel: "(23)",
        question: "I stood frozen (23) __________ the ground as the water shifted a part of its body onto my leg.",
        answer: "G",
        solution: {
          method: "Preposition: 'stood frozen to the ground' = fixed expression.",
          steps: [
            "'Stood frozen ______ the ground' → idiom: 'frozen to the ground/spot' = unable to move from fear.",
            "G (to) → 'stood frozen to the ground' = couldn't move from fear. Fixed idiom. CORRECT.",
            "C (in) → 'frozen in the ground' → suggests buried in ground, not standard.",
            "B (down) → 'frozen down the ground' → ungrammatical.",
            "Answer: G (to).",
          ],
          tip: "Fixed idiom: 'frozen to the spot/ground' = paralysed with fear, unable to move. The preposition is always 'to'.",
        },
      },
      {
        qid: "taonan2023-q24",
        blankLabel: "(24)",
        question: "…as the water shifted a part of (24) __________ body onto my leg.",
        answer: "E",
        solution: {
          method: "Possessive pronoun vs contraction: 'its' (possessive) vs 'it's' (it is).",
          steps: [
            "'a part of ______ body' → needs a POSSESSIVE pronoun (the snake's body).",
            "E (its) → possessive pronoun for 'it' (the snake) → 'a part of its body'. CORRECT.",
            "F (it's) → contraction of 'it is' → 'a part of it is body' → WRONG grammatically.",
            "Rule: its = possessive. it's = it is/it has.",
            "Answer: E (its).",
          ],
          tip: "Critical distinction: ITS = possessive (the snake's body = its body). IT'S = it is/it has. Never use an apostrophe for the possessive 'its'.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Comprehension Cloze (Vocabulary)
  //  (Q25–Q28, 4 marks)
  //  Passage: Guide Dogs (adapted from https://www.ideapod.com)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "taonan2023-secE",
    topic: "VocabCloze",
    marks: 4,
    passageTitle: "Guide Dogs (adapted from https://www.ideapod.com)",
    passageText:
      "Dogs are Man's best friends. They are not only loyal, but also make great pets. Dogs can also be trained for specific (25) __________ such as retrieving shoes and opening doors. For at least 2000 years, these creatures have been (26) __________ the blind. Today, we also have 'hearing ear' dogs for the (27) __________. These canines are trained to (28) __________ their owners to warning sounds, such as a fire alarm. Thus, saving their owners from any mishaps.",
    wordBank: {
      A: "alert",
      B: "blind",
      C: "chores",
      D: "deaf",
      E: "following",
      F: "guiding",
      G: "inform",
      H: "tasks",
    },
    questions: [
      {
        qid: "taonan2023-q25",
        blankLabel: "(25)",
        question: "Dogs can also be trained for specific (25) __________ such as retrieving shoes and opening doors.",
        answer: "H",
        solution: {
          method: "Vocabulary: choose the word for specific jobs/duties dogs are trained to do.",
          steps: [
            "Examples given: retrieving shoes, opening doors → these are specific JOBS/duties.",
            "H (tasks) → specific tasks = specific jobs/duties. CORRECT.",
            "C (chores) → household chores = routine domestic duties. While possible, 'tasks' is more precise for trained behaviours.",
            "E (following) → 'trained for specific following' → ungrammatical.",
            "Answer: H (tasks).",
          ],
          tip: "'Tasks' = specific jobs or duties assigned to someone. 'Chores' = routine domestic work (washing, cleaning). Dogs are trained for specific tasks.",
        },
      },
      {
        qid: "taonan2023-q26",
        blankLabel: "(26)",
        question: "For at least 2000 years, these creatures have been (26) __________ the blind.",
        answer: "F",
        solution: {
          method: "Vocabulary: what have dogs been doing for blind people for 2000 years?",
          steps: [
            "Context: dogs helping blind people for 2,000 years → they GUIDE the blind.",
            "F (guiding) → 'guiding the blind' = leading blind people around safely. CORRECT.",
            "E (following) → 'following the blind' → dogs follow blind people (not helpful).",
            "A (alert) → 'alerting the blind' → alerts are for deaf people (see next blank).",
            "Answer: F (guiding).",
          ],
          tip: "Guide dogs = specially trained dogs that GUIDE blind people. They lead their owner around obstacles. 'Guiding' is the specific function.",
        },
      },
      {
        qid: "taonan2023-q27",
        blankLabel: "(27)",
        question: "Today, we also have 'hearing ear' dogs for the (27) __________.",
        answer: "D",
        solution: {
          method: "Vocabulary: 'hearing ear' dogs are for people who cannot hear.",
          steps: [
            "'Hearing ear' dogs → dogs that serve as the owner's ears.",
            "The previous sentence mentions dogs for the BLIND → this is contrasting with dogs for a different disability.",
            "'Hearing ear' dogs → for people who cannot HEAR = the DEAF.",
            "D (deaf) → CORRECT.",
            "B (blind) → that's the previous sentence's group.",
            "Answer: D (deaf).",
          ],
          tip: "'Hearing ear' dogs = for the deaf (people who cannot hear). Guide dogs = for the blind (people who cannot see). Both are types of service dogs.",
        },
      },
      {
        qid: "taonan2023-q28",
        blankLabel: "(28)",
        question: "These canines are trained to (28) __________ their owners to warning sounds, such as a fire alarm.",
        answer: "A",
        solution: {
          method: "Vocabulary: what do 'hearing ear' dogs do with warning sounds?",
          steps: [
            "Context: dogs trained to [do something] to their owners about warning sounds.",
            "A (alert) → 'alert their owners to warning sounds' = warn/notify their owners about sounds. CORRECT.",
            "G (inform) → 'inform their owners to' → doesn't collocate naturally; 'inform of' is standard, but 'alert to' is more precise for sudden warnings.",
            "Answer: A (alert).",
          ],
          tip: "Fixed phrase: 'alert someone TO something' = warn someone about a danger. 'Alert to the sound' = warn about the sound. Service dogs alert their deaf owners to alarms.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Synthesis & Transformation  (Q29–Q32, 8 marks)
  //  Each question = 2 marks
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "taonan2023-q29",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Rewrite as ONE sentence with the same meaning using the word provided.\n\nNancy brought many blueberries. Nancy did not share the blueberries with her classmates.\n\nEven though __________",
    answer:
      "Even though Nancy brought many blueberries, she did not share them with her classmates.",
    solution: {
      method: "Use 'Even though' to show contrast: she had many but didn't share.",
      steps: [
        "'Even though' = stronger form of 'although', introducing a surprising contrast.",
        "Structure: Even though [surprising/contrary fact], [main result].",
        "Even though Nancy brought many blueberries, [the surprising result:] she did not share them with her classmates.",
        "Replace the repeated 'the blueberries' with 'them' to avoid repetition.",
        "Comma after the subordinate clause when it comes first.",
        "Answer: Even though Nancy brought many blueberries, she did not share them with her classmates.",
      ],
      tip: "'Even though' is stronger than 'although' — it emphasises the surprising contrast. Comma after the 'Even though' clause when placed at the start.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q30",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Rewrite as ONE sentence with the same meaning using the word provided.\n\nRaj washed his hands. Then, he sat down to eat.\n\nRaj sat down __________",
    answer:
      "Raj sat down to eat after washing his hands.",
    solution: {
      method: "Use 'after' to show sequence: washing hands happened first, then sitting down.",
      steps: [
        "Sequence: (1) washed hands → (2) sat down to eat.",
        "Starting word given: 'Raj sat down' → must keep this as the main clause.",
        "After + -ing form (gerund): 'after washing his hands'.",
        "Full sentence: Raj sat down to eat after washing his hands.",
        "No comma needed when 'after' clause comes at the end.",
        "Answer: Raj sat down to eat after washing his hands.",
      ],
      tip: "When the sentence STARTS with the SECOND event, use 'after + -ing' for the first event. 'Raj sat down to eat after washing his hands.' The gerund (-ing) shows the earlier action.",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q31",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Rewrite as ONE sentence with the same meaning using the word provided.\n\nThe Venus Flytrap does not have hands or legs. It traps flies and other small insects using its leaves.\n\n__________ However, __________",
    answer:
      "The Venus Flytrap does not have hands or legs. However, it traps flies and other small insects using its leaves.",
    solution: {
      method: "'However' connects two contrasting sentences; each keeps its structure.",
      steps: [
        "'However' = a conjunctive adverb showing contrast, placed at the start of the second sentence.",
        "The two sentences contrast: no hands/legs → BUT still traps insects (using leaves).",
        "Structure: [Sentence 1]. However, [Sentence 2].",
        "Sentence 1: The Venus Flytrap does not have hands or legs.",
        "Sentence 2: However, it traps flies and other small insects using its leaves.",
        "Answer: The Venus Flytrap does not have hands or legs. However, it traps flies and other small insects using its leaves.",
      ],
      tip: "'However' is a conjunctive adverb, not a conjunction. It must start a NEW sentence (or clause after a semicolon). Always followed by a comma: 'However, [result].'",
    },
  },

  {
    kind: "A",
    id: "taonan2023-q32",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Rewrite as ONE sentence with the same meaning using the word provided.\n\nThe sow bug curls up to protect itself from predators. The opossum plays dead to protect itself from predators.\n\n__________ while __________",
    answer:
      "The sow bug curls up to protect itself from predators while the opossum plays dead to protect itself from predators.",
    solution: {
      method: "'While' joins two parallel actions happening simultaneously or in contrast.",
      steps: [
        "'While' connects two actions that contrast or happen at the same time.",
        "Both animals protect themselves differently: sow bug curls up vs opossum plays dead.",
        "Structure: [Action 1] while [Action 2].",
        "The sow bug curls up to protect itself from predators while the opossum plays dead to protect itself from predators.",
        "No comma needed when 'while' is in the middle.",
        "Answer: The sow bug curls up to protect itself from predators while the opossum plays dead to protect itself from predators.",
      ],
      tip: "'While' shows simultaneous or contrasting actions. Both animals protect themselves, but using DIFFERENT methods — 'while' highlights this contrast. The sentence may start with either animal.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION G — Spelling, Punctuation & Grammar (Editing)
  //  (Q33–Q38, 6 marks)
  //  Passage: Mount Kuta / Sarah's Climb
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "taonan2023-secG",
    topic: "Editing",
    marks: 6,
    passageTitle: "Sarah's Climb (adapted from http://newsforkids.net)",
    passageText:
      "Mount Kuta is a famous mountain-sized rock in Bukit National Park in Malaysia.\n\n(33) It is well known for being one of the most challenging places to ascend. [At] 12 June 2011, ten-year-old Sarah decided to climb this mountain. She was the youngest (34) [sucesfully] person to reach the top. During the extremely dangerous hike, Sarah felt exhausted and was sunburnt due to the intense heat. However, she persevered. Her (35) father was very impressed. He told the reporters proudly(●) 'Sarah was positive throughout the entire adventure.'\n\nIndeed, Sarah was in high spirits when she reached the summit. Smiling (36) [jubeelantly], Sarah gave this piece of advice to anyone who was thinking about doing (37) [anything] similar. 'You don't need any special skills or talents. You just have to put (38) your mind to it and be determined(●)' she said. Sarah eventually went on to conquer higher and even more challenging mountains.",
    questions: [
      {
        qid: "taonan2023-q33",
        blankLabel: "(33)",
        question:
          "He told the reporters proudly [At] 12 June 2011 — Correct the underlined word.",
        answer: "On",
        solution: {
          method: "Preposition of time: use 'on' for specific dates.",
          steps: [
            "'12 June 2011' is a SPECIFIC DATE.",
            "Preposition for specific dates: ON.",
            "'At' → used for times of day (at 3pm) or expressions (at night) → WRONG for a date.",
            "'In' → used for months/years/seasons → WRONG for a specific date.",
            "'On 12 June 2011' = CORRECT.",
            "Answer: On.",
          ],
          tip: "Time prepositions: AT (times: 3pm, noon), IN (months/years: in June, in 2011), ON (specific dates: on 12 June, on Monday).",
        },
      },
      {
        qid: "taonan2023-q34",
        blankLabel: "(34)",
        question:
          "She was the youngest [sucesfully] person to reach the top — Correct the bold word (spelling).",
        answer: "successfully",
        solution: {
          method: "Spelling correction: 'sucesfully' is misspelled.",
          steps: [
            "The intended word is the adverb meaning 'in a successful manner'.",
            "'sucesfully' → missing letters: needs double-s and double-l.",
            "Correct: s-u-c-c-e-s-s-f-u-l-l-y → 'successfully'.",
            "Break down: success + ful + ly = successfully.",
            "Answer: successfully.",
          ],
          tip: "Successfully = success + -ful + -ly. Double 'c', double 's', double 'l': suCC-eSS-fuLLy.",
        },
      },
      {
        qid: "taonan2023-q35",
        blankLabel: "(35)",
        question:
          "He told the reporters proudly(●)'Sarah was positive…' — Correct the missing/wrong punctuation mark (circle).",
        answer: ",",
        solution: {
          method: "Punctuation: a comma is needed between a reporting verb and the direct speech quote.",
          steps: [
            "Structure: 'He told the reporters proudly [PUNCT] \"Sarah was positive…\"'",
            "When the reporting clause comes BEFORE the direct speech, separate them with a COMMA.",
            "Correct: 'He told the reporters proudly, \"Sarah was positive throughout the entire adventure.\"'",
            "Answer: , (comma).",
          ],
          tip: "Punctuation rule for direct speech: [Reporting clause], \"[Direct speech]\" — comma before the opening quote. Also: capital letter to start the quoted speech.",
        },
      },
      {
        qid: "taonan2023-q36",
        blankLabel: "(36)",
        question:
          "Smiling [jubeelantly], Sarah gave this piece of advice — Correct the bold word (spelling).",
        answer: "jubilantly",
        solution: {
          method: "Spelling correction: 'jubeelantly' is misspelled.",
          steps: [
            "The intended word: adverb meaning 'in a joyful, triumphant way'.",
            "'jubeelantly' → wrong: has 'ee' instead of 'i', and double 'l'.",
            "Correct spelling: j-u-b-i-l-a-n-t-l-y → 'jubilantly'.",
            "Root word: jubilant → jubilantly.",
            "Answer: jubilantly.",
          ],
          tip: "Jubilant → jubilantly. Remember: j-u-b-I-l-a-n-t (not 'jubeel'). The root is 'jubil-' as in jubilee.",
        },
      },
      {
        qid: "taonan2023-q37",
        blankLabel: "(37)",
        question:
          "…to anyone who was thinking about doing [anything] similar — Correct the underlined word.",
        answer: "something",
        solution: {
          method: "Grammar: use 'something' in a positive context, 'anything' in questions/negatives.",
          steps: [
            "Context: 'to anyone who was thinking about doing ______ similar' → positive statement.",
            "'anything' → used in questions, negatives, and conditional sentences.",
            "'something' → used in positive statements.",
            "'doing something similar' = a positive statement about an action. CORRECT.",
            "'doing anything similar' would be appropriate in: 'without doing anything similar' or 'Was she doing anything similar?'",
            "Answer: something.",
          ],
          tip: "Something = positive statements ('I want something'). Anything = questions/negatives ('Do you want anything?' / 'I don't want anything'). Here it's a positive context.",
        },
      },
      {
        qid: "taonan2023-q38",
        blankLabel: "(38)",
        question:
          "'You just have to put your mind to it and be determined(●)' she said — Correct the missing/wrong punctuation mark (circle).",
        answer: ",",
        solution: {
          method: "Punctuation: when the reporting clause comes AFTER the direct speech, use a comma (not a full stop) inside the closing quotation mark.",
          steps: [
            "Structure: '\"[Direct speech](PUNCT)\" she said.'",
            "When the speech tag ('she said') FOLLOWS the direct speech, the direct speech ends with a COMMA (not a full stop) inside the closing quote.",
            "Correct: '\"…and be determined,\" she said.'",
            "Answer: , (comma).",
          ],
          tip: "Direct speech rule: If 'she said/he shouted' comes AFTER, put a comma at the end of the speech, before the closing quote: '\"…determined,\" she said.' NOT a full stop before 'she said'.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION H — Comprehension Open-ended  (Q39–Q44, 8 marks)
  //  Passage: The Cave Adventure (Bill and Sam)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "taonan2023-secH",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "The Cave Adventure",
    passageText:
      '"Look at that!" Bill gave a shout of surprise. He and his brother, Sam, were catching insects near their campsite when they sighted it on top of a hill.\n\n"Let\'s check it out!" Sam said, his eyes lit up with excitement. "Race you to the hill," he challenged. Laughing, they ran until they came to the cave entrance. Fearlessly, Sam stepped inside but he was not able to see anything in the cave. It was pitch black. Curious to find out what was inside, the duo hurried back to their campsite to get a torch.\n\nMoments later, their real adventure began. With great caution, they entered the unknown. There was a strong odour of rotting wood. Bill wrinkled his nose at the unpleasant smell while Sam sneezed noisily several times. Deeper and deeper they ventured. Soon, they stumbled upon some uneven steps which they began to climb gingerly. Then, Bill, who had been talking incessantly all this while, suddenly went quiet. He stared, mouth agape, at something on the ground ahead of them. It was a half-burnt candle.\n\n"Look, we\'re not the first ones here!" he said. Hearts beating like bongo drums, the boys continued walking. Was anyone still in the cave? Their question was soon answered by the sound of someone humming. "AH!" They screamed and fled out of the cave as fast as their legs could carry them.',
    questions: [
      {
        qid: "taonan2023-q39",
        question:
          "Where were Sam and Bill when they spotted the cave? (2 marks)",
        answer:
          "They were near their campsite, catching insects.",
        solution: {
          method: "Literal comprehension: paragraph 1 states their location.",
          steps: [
            "Paragraph 1: 'He and his brother, Sam, were catching insects near their campsite when they sighted it on top of a hill.'",
            "Location: near their campsite.",
            "Activity: catching insects.",
            "Write a complete sentence: 'They were near their campsite, catching insects.'",
          ],
          tip: "2-mark location question: state WHERE they were (near campsite) AND what they were doing (catching insects) for full marks.",
        },
      },
      {
        qid: "taonan2023-q40",
        question:
          "What does the 'real adventure' (line 8) refer to? (2 marks)",
        answer:
          "The 'real adventure' refers to Sam and Bill actually entering the cave with a torch to explore it.",
        solution: {
          method: "Inference/context: what happened just before and after 'real adventure'?",
          steps: [
            "Before 'real adventure': boys had gone to cave entrance, couldn't see, went back to get torch.",
            "Line 8: 'Moments later, their real adventure began. With great caution, they entered the unknown.'",
            "'Real adventure' = the actual exploration of the cave (going inside with the torch).",
            "The first attempt was just peeking → the REAL adventure = entering the cave and exploring it.",
            "Answer: The 'real adventure' refers to Sam and Bill exploring/entering the cave (with the torch).",
          ],
          tip: "For 'what does X refer to' questions, look at what immediately follows the phrase in the text. 'They entered the unknown' = exploring the inside of the cave.",
        },
      },
      {
        qid: "taonan2023-q41",
        question:
          "Which word has the same meaning as 'continuously'? Circle (A) or (B).\n\n'Bill, who had been talking incessantly all this while, suddenly went quiet.'\n                                           (A)                  (B)",
        options: ["(A) incessantly", "(B) suddenly"],
        answer: "A",
        solution: {
          method: "Vocabulary: find the synonym of 'continuously' among the two labelled words.",
          steps: [
            "'Continuously' = without stopping, non-stop.",
            "(A) 'incessantly' = without stopping, continuously → SYNONYM.",
            "(B) 'suddenly' = unexpectedly, all at once → NOT a synonym of continuously.",
            "Answer: (A) incessantly.",
          ],
          tip: "Incessantly = without ceasing/stopping = continuously. The passage says Bill 'had been talking incessantly ALL THIS WHILE' — the 'all this while' confirms it means non-stop.",
        },
      },
      {
        qid: "taonan2023-q42",
        question:
          "Which one of the following statements is true? Put a tick in the box. (1 mark)\n☐ Sam entered the cave before Bill did.\n☐ Sam stopped chattering when he spotted the candle.\n☐ The boys found out who was singing in the cave.",
        options: [
          "Sam entered the cave before Bill did.",
          "Sam stopped chattering when he spotted the candle.",
          "The boys found out who was singing in the cave.",
        ],
        answer: "Sam entered the cave before Bill did.",
        solution: {
          method: "Evaluate each statement against the passage text.",
          steps: [
            "Statement 1: 'Sam entered the cave before Bill did.' → Paragraph 2: 'Fearlessly, Sam stepped inside' → SAM stepped inside first. TRUE.",
            "Statement 2: 'Sam stopped chattering when he spotted the candle.' → WRONG: it was BILL who went quiet after spotting the candle. ('Bill…suddenly went quiet…at something on the ground. It was a half-burnt candle.')",
            "Statement 3: 'The boys found out who was singing in the cave.' → WRONG: 'someone humming' — they heard humming but FLED; they never found out who it was.",
            "Answer: Sam entered the cave before Bill did.",
          ],
          tip: "Cross-check each detail: who entered first (Sam), who went quiet (Bill), did they identify the person humming (NO). Tricky swap of Sam/Bill is a common comprehension trap.",
        },
      },
      {
        qid: "taonan2023-q43",
        question:
          "Write down the five-word phrase in paragraph 4 that tells you that the boys were nervous from lines 15–18. (1 mark)",
        answer: "Hearts beating like bongo drums",
        solution: {
          method: "Locate the specific phrase in paragraph 4 (lines 15-18) that shows nervousness.",
          steps: [
            "Paragraph 4, lines 15-16: '\"Look, we\'re not the first ones here!\" he said. Hearts beating like bongo drums, the boys continued walking.'",
            "'Hearts beating like bongo drums' = simile describing fast, loud heartbeats → sign of nervousness/fear.",
            "Count the words: Hearts (1) beating (2) like (3) bongo (4) drums (5) → exactly 5 words.",
            "Answer: Hearts beating like bongo drums.",
          ],
          tip: "Five-word phrase = count carefully. 'Hearts beating like bongo drums' is a simile: fast-beating hearts (like bongo drum beats) = nervous/scared.",
        },
      },
      {
        qid: "taonan2023-q44",
        question:
          "Write 1, 2 and 3 in the blanks to indicate the order in which the events occurred in the story. (1 mark)\n___ Bill and Sam discovered that someone was in the cave.\n___ Bill and Sam were camping when they saw a cave.\n___ Bill and Sam returned to their campsite to get a torch.",
        answer:
          "Bill and Sam discovered that someone was in the cave: 3\nBill and Sam were camping when they saw a cave: 1\nBill and Sam returned to their campsite to get a torch: 2",
        solution: {
          method: "Sequence comprehension: map events to their passage order.",
          steps: [
            "Event A — 'Bill and Sam were camping when they saw a cave.' → Paragraph 1: they spot the cave while catching insects near campsite. ORDER: 1",
            "Event B — 'Bill and Sam returned to their campsite to get a torch.' → Paragraph 2: 'the duo hurried back to their campsite to get a torch.' ORDER: 2",
            "Event C — 'Bill and Sam discovered that someone was in the cave.' → Paragraph 4: they heard someone humming. ORDER: 3",
            "Sequence: Saw cave (1) → Got torch (2) → Discovered someone (3).",
          ],
          tip: "For sequence questions, read paragraph by paragraph and match each listed event to where it appears. Don't rely on memory.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const taonan2023Paper = { meta, questions };
export default taonan2023Paper;
