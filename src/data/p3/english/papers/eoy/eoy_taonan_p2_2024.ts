// src/data/p3/english/papers/eoy_taonan_p2_2024.ts
// Tao Nan School — 2024 Primary 3 End-of-Year Examination
// English Language Paper 2 (Booklets A & B) — Primary 3
// Date: 21 October 2024  |  Total: 50 marks (Booklet A: 20, Booklet B: 30)

import { QuestionSet } from "@/types/questions";

export const eoy_taonan_p2_2024: QuestionSet = {
  id: "eoy_taonan_p2_2024",
  school: "Tao Nan School",
  level: "P3",
  subject: "English",
  year: 2024,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // BOOKLET A
    // ─────────────────────────────────────────────

    // ── Section A: Grammar MCQ (9 marks, Q1–9) ─────────────────────────────
    {
      id: "bookletA_sectionA",
      title: "Section A: Grammar",
      type: "GrammarMCQ",
      marks: 9,
      instructions:
        "For each question from 1 to 9, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4). Shade the correct oval (1, 2, 3 or 4) on the OAS.",
      questions: [
        {
          id: "taonan_eoy24_A1",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText: "____________ left the dirty tray on the table?",
          options: [
            { id: 1, text: "Who" },
            { id: 2, text: "What" },
            { id: 3, text: "Where" },
            { id: 4, text: "Whose" },
          ],
          answer: 1,
          solution: {
            method: "Question Words (Interrogative Pronouns)",
            steps: [
              "The blank asks about the PERSON who left the tray — needs a question word for a person.",
              "'Who' = asks about a person (subject position here).",
              "'What' = asks about a thing; 'Where' = asks about a place; 'Whose' = asks about possession.",
            ],
            tip: "WHO = person (subject). 'Who left the tray?' = asking which person performed the action.",
          },
        },
        {
          id: "taonan_eoy24_A2",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "____________ the concert was cancelled, the organiser refunded us the money.",
          options: [
            { id: 1, text: "If" },
            { id: 2, text: "While" },
            { id: 3, text: "Since" },
            { id: 4, text: "Unless" },
          ],
          answer: 3,
          solution: {
            method: "Conjunctions — Cause/Reason",
            steps: [
              "The concert being cancelled is the REASON the organiser refunded the money.",
              "'Since' (= because) introduces a reason clause.",
              "'If' = conditional; 'While' = simultaneous; 'Unless' = except if.",
            ],
            tip: "SINCE = because. 'Since the concert was cancelled' = because it was cancelled. The refund is a natural consequence.",
          },
        },
        {
          id: "taonan_eoy24_A3",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Mr Smith told his sons that he would be painting the treehouse ____________.",
          options: [
            { id: 1, text: "himself" },
            { id: 2, text: "yourself" },
            { id: 3, text: "ourselves" },
            { id: 4, text: "themselves" },
          ],
          answer: 1,
          solution: {
            method: "Reflexive Pronouns — Emphasis",
            steps: [
              "The subject is 'he' (Mr Smith) — doing the painting himself, without help.",
              "Reflexive/emphatic pronoun for 'he' = 'himself'.",
              "'Yourself' = you; 'ourselves' = we; 'themselves' = they.",
            ],
            tip: "He → HIMSELF. Used for emphasis: 'he would paint it himself' (without help from others).",
          },
        },
        {
          id: "taonan_eoy24_A4",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "The library has a large collection of books, including ____________ rare editions.",
          options: [
            { id: 1, text: "few" },
            { id: 2, text: "little" },
            { id: 3, text: "many" },
            { id: 4, text: "much" },
          ],
          answer: 3,
          solution: {
            method: "Quantifiers — Countable Nouns",
            steps: [
              "'Editions' is countable (rare editions = individual books you can count).",
              "'Many' is used with countable plural nouns.",
              "'Little/much' = for uncountable; 'few' = for countable but implies not many (would be negative).",
              "'Many rare editions' = a large number — matches 'large collection'.",
            ],
            tip: "Countable noun (editions) + large quantity → MANY. 'Few' implies not many; 'many' confirms the large collection.",
          },
        },
        {
          id: "taonan_eoy24_A5",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "____________ news article which I am reading now is interesting.",
          options: [
            { id: 1, text: "This" },
            { id: 2, text: "That" },
            { id: 3, text: "These" },
            { id: 4, text: "Those" },
          ],
          answer: 1,
          solution: {
            method: "Demonstrative Adjectives — Proximity + Number",
            steps: [
              "'Article' is singular + 'which I am reading NOW' = near/current.",
              "Near + singular = 'This'.",
              "'That' = far + singular; 'These' = near + plural; 'Those' = far + plural.",
            ],
            tip: "'Reading NOW' = happening right now = near to speaker → THIS (near + singular).",
          },
        },
        {
          id: "taonan_eoy24_A6",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Shanti's sister laid the table as their mother ____________ dinner.",
          options: [
            { id: 1, text: "prepare" },
            { id: 2, text: "prepares" },
            { id: 3, text: "is preparing" },
            { id: 4, text: "was preparing" },
          ],
          answer: 4,
          solution: {
            method: "Tense — Past Continuous (Simultaneous Actions)",
            steps: [
              "'Laid the table' = simple past action. The mother was preparing dinner at the SAME TIME.",
              "Simultaneous ongoing past action = past continuous: 'was preparing'.",
              "'Is preparing' = present; 'prepares' = present simple; 'prepare' = base form.",
            ],
            tip: "Two things happening at the same time in the past: 'laid the table' WHILE 'was preparing'. Simultaneous = past continuous.",
          },
        },
        {
          id: "taonan_eoy24_A7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "My grandfather collects old coins. Some ____________ no longer valuable.",
          options: [
            { id: 1, text: "is" },
            { id: 2, text: "are" },
            { id: 3, text: "was" },
            { id: 4, text: "were" },
          ],
          answer: 2,
          solution: {
            method: "Subject-Verb Agreement — Present Tense",
            steps: [
              "'Some' refers to 'some [of the coins]' — plural.",
              "Present context (he 'collects') + plural subject 'some' = 'are'.",
              "'Is' = singular present; 'was'/'were' = past tense.",
            ],
            tip: "SOME (plural, referring to coins) + present tense = ARE. 'Some are no longer valuable.'",
          },
        },
        {
          id: "taonan_eoy24_A8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "The participants have started brisk walking, ____________ they?",
          options: [
            { id: 1, text: "don't" },
            { id: 2, text: "didn't" },
            { id: 3, text: "hadn't" },
            { id: 4, text: "haven't" },
          ],
          answer: 4,
          solution: {
            method: "Question Tags — Present Perfect",
            steps: [
              "Main clause: 'The participants HAVE started' = present perfect, positive.",
              "Positive statement → negative tag. Present perfect auxiliary = 'have'.",
              "Tag: 'haven't they?' (negative of 'have' + subject 'they').",
            ],
            tip: "HAVE (positive, present perfect) → HAVEN'T (negative tag). 'Have started → haven't they?'",
          },
        },
        {
          id: "taonan_eoy24_A9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "The librarian reminded the boys not to lean ____________ the bookshelf.",
          options: [
            { id: 1, text: "at" },
            { id: 2, text: "off" },
            { id: 3, text: "along" },
            { id: 4, text: "against" },
          ],
          answer: 4,
          solution: {
            method: "Prepositions of Contact",
            steps: [
              "'Lean against' = to rest your body on/against a surface while standing.",
              "'Lean against the bookshelf' = push one's body/weight on the shelf.",
              "'Lean at' is not standard; 'lean off' doesn't fit; 'lean along' doesn't make sense here.",
            ],
            tip: "'Lean AGAINST' = press your body onto a surface. Standard expression for leaning on walls/shelves/fences.",
          },
        },
      ],
    },

    // ── Section B: Vocabulary MCQ (6 marks, Q10–15) ────────────────────────
    {
      id: "bookletA_sectionB",
      title: "Section B: Vocabulary",
      type: "VocabMCQ",
      marks: 6,
      instructions:
        "For each question from 10 to 15, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4). Shade the correct oval (1, 2, 3 or 4) on the OAS.",
      questions: [
        {
          id: "taonan_eoy24_B10",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Filled with ____________, Alvin eagerly touched the Venus Flytrap.",
          options: [
            { id: 1, text: "curiosity" },
            { id: 2, text: "gratitude" },
            { id: 3, text: "patience" },
            { id: 4, text: "reluctance" },
          ],
          answer: 1,
          solution: {
            method: "Context Clues — Emotion",
            steps: [
              "'Eagerly touched' = enthusiastically, wanting to explore/find out.",
              "'Curiosity' = wanting to know/explore — fits 'eagerly' touching something unusual.",
              "'Gratitude' = thankfulness; 'patience' = calmness; 'reluctance' = unwillingness (opposite of eager).",
            ],
            tip: "EAGERLY + touching something interesting = CURIOSITY (wanting to know/explore). Eagerness comes from curiosity.",
          },
        },
        {
          id: "taonan_eoy24_B11",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Jake rehearsed his speech daily. However, when he was on stage, he ____________.",
          options: [
            { id: 1, text: "cried over spilt milk" },
            { id: 2, text: "had a whale of a time" },
            { id: 3, text: "was on top of the world" },
            { id: 4, text: "had butterflies in his stomach" },
          ],
          answer: 4,
          solution: {
            method: "Idioms — Nervousness",
            steps: [
              "'However' signals a contrast — he practised but something unexpected happened on stage.",
              "'Had butterflies in his stomach' = felt nervous/anxious — common feeling when performing despite practice.",
              "'Cried over spilt milk' = regretted something past; 'had a whale of a time' = enjoyed greatly; 'on top of the world' = very happy.",
            ],
            tip: "'Butterflies in the stomach' = feeling nervous (literally the fluttery feeling before a performance). Perfect for someone anxious on stage.",
          },
        },
        {
          id: "taonan_eoy24_B12",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Zhiyi is ____________. She hardly speaks in class.",
          options: [
            { id: 1, text: "as good as gold" },
            { id: 2, text: "as sweet as sugar" },
            { id: 3, text: "as gentle as a dove" },
            { id: 4, text: "as quiet as a mouse" },
          ],
          answer: 4,
          solution: {
            method: "Similes — Character Description",
            steps: [
              "'Hardly speaks in class' = very quiet, almost silent.",
              "'As quiet as a mouse' = extremely quiet (mice move silently).",
              "'As good as gold' = very well-behaved; 'as sweet as sugar' = very kind; 'as gentle as a dove' = very gentle.",
            ],
            tip: "'As quiet as a MOUSE' = very silent. Mice are associated with quiet, stealthy movement.",
          },
        },
        {
          id: "taonan_eoy24_B13",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Worried that she would be late for her meeting, my aunt searched ____________ for her car keys.",
          options: [
            { id: 1, text: "keenly" },
            { id: 2, text: "desperately" },
            { id: 3, text: "accidentally" },
            { id: 4, text: "enthusiastically" },
          ],
          answer: 2,
          solution: {
            method: "Context Clues — Adverb of Manner",
            steps: [
              "She is WORRIED about being late — the search reflects urgency and desperation.",
              "'Desperately' = with great urgency and anxiety — fits searching while worried about being late.",
              "'Keenly' = eagerly; 'enthusiastically' = with excitement (not fitting for a worried, urgent search).",
            ],
            tip: "Worried + late + searching = DESPERATELY (with great urgency/anxiety). Desperation comes from the fear of being late.",
          },
        },
        {
          id: "taonan_eoy24_B14",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "My cousin's flight was ____________ for two hours due to bad weather.",
          options: [
            { id: 1, text: "kept" },
            { id: 2, text: "delayed" },
            { id: 3, text: "interrupted" },
            { id: 4, text: "postponed" },
          ],
          answer: 2,
          solution: {
            method: "Word Choice — Aviation Vocabulary",
            steps: [
              "A flight that is late due to weather is 'delayed' (still happening, just later).",
              "'Delayed' = held back in time by a specific amount (two hours).",
              "'Postponed' = scheduled for another time entirely (not just 2 hours); 'interrupted' = stopped mid-way; 'kept' doesn't fit.",
            ],
            tip: "Flight DELAYED = pushed back in time (still same day, just later). 'Postponed' = moved to another day entirely.",
          },
        },
        {
          id: "taonan_eoy24_B15",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Rose believes everything that people say. She is so ____________.",
          options: [
            { id: 1, text: "trusting" },
            { id: 2, text: "sensible" },
            { id: 3, text: "obedient" },
            { id: 4, text: "cooperative" },
          ],
          answer: 1,
          solution: {
            method: "Context Clues — Character Trait",
            steps: [
              "Rose believes EVERYTHING people say = she is too willing to trust others.",
              "'Trusting' = readily believing others, sometimes too easily.",
              "'Sensible' = practical/wise (would NOT believe everything); 'obedient' = follows rules; 'cooperative' = works well with others.",
            ],
            tip: "Believing EVERYTHING people say = overly TRUSTING. A trusting person accepts what others tell them easily.",
          },
        },
      ],
    },

    // ── Section C: Visual Text MCQ (5 marks, Q16–20) ───────────────────────
    {
      id: "bookletA_sectionC",
      title: "Section C: Visual Text Comprehension",
      type: "VisualText",
      marks: 5,
      instructions:
        "Study the following advertisement and answer questions 16 to 20.",
      passageTitle: "City Farm Tour Advertisement",
      passageText: `Join us on a tour at City Farm!

Location: 67 Farm Road
Opening Hours: 8.00 a.m. to 6.00 p.m. (Weekends and public holidays only)
Duration of tour: 1 hour
Age group: 3 years old and above
Admission fee: $20 per ticket
[Scan this QR code to sign up for the tour!]
Organised by: sgExplore

FARMING WITH AQUAPONICS
Aquaponics is a technique of growing plants and rearing fish together.
Did you know that spinach can be grown using aquaponics?
- Vegetables in the Grow Bed absorb nutrients from the water.
- Tilapias eat and then produce waste.
- Clean water is pumped back; waste water goes to Grow Bed via Pump.
- Feed us at 9 a.m. for free.

CAGE-FREE FARMING
Pet cute chickens! silkie chicken
Hens are happier and healthier when they are allowed to roam freely.
They can even survive for up to 7 years! The eggs produced are of better quality too!

COMPOST STATION – place for turning food scraps into soil
Find out how we turn waste into fertiliser which is then used to nourish papaya trees.
[stag beetles shown]`,
      questions: [
        {
          id: "taonan_eoy24_C16",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "The last tour starts at ____________.",
          options: [
            { id: 1, text: "8.00 a.m." },
            { id: 2, text: "9.00 a.m." },
            { id: 3, text: "5.00 p.m." },
            { id: 4, text: "6.00 p.m." },
          ],
          answer: 3,
          solution: {
            method: "Inference from Visual Text — Timing",
            steps: [
              "Opening hours: 8.00 a.m. to 6.00 p.m. Duration of tour: 1 hour.",
              "The LAST tour must start at 5.00 p.m. so it ends by 6.00 p.m. closing time.",
              "If the last tour started at 6.00 p.m., it would run until 7.00 p.m. — beyond closing time.",
            ],
            tip: "Last tour = closing time MINUS duration. 6:00 p.m. − 1 hour = 5:00 p.m. The last tour starts at 5:00 p.m.",
          },
        },
        {
          id: "taonan_eoy24_C17",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText:
            "Mrs Tan would like to visit the farm with her family. Which of the following statements is true?",
          options: [
            { id: 1, text: "She must visit the farm only on weekdays." },
            { id: 2, text: "She had to scan the QR code to join a tour." },
            { id: 3, text: "She could roam freely on her own at the farm." },
            { id: 4, text: "She could take her two-year-old nephew with her on the visit." },
          ],
          answer: 2,
          solution: {
            method: "Information Retrieval — True Statement",
            steps: [
              "Option 2: 'Scan this QR code to sign up for the tour!' = she scans QR to join. TRUE.",
              "Option 1: Opening hours = WEEKENDS and public holidays only — not weekdays. FALSE.",
              "Option 3: It's a guided tour (1 hour duration with a guide) — not roam freely alone. FALSE.",
              "Option 4: Age group = 3 years old and above. A 2-year-old = CANNOT join. FALSE.",
            ],
            tip: "QR code = way to sign up. Weekends ONLY (not weekdays). Age 3+: 2-year-old cannot join. Only option 2 is TRUE.",
          },
        },
        {
          id: "taonan_eoy24_C18",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "In an aquaponics system, clean water is ____________.",
          options: [
            { id: 1, text: "sent to the fish tank" },
            { id: 2, text: "stored at the grow bed" },
            { id: 3, text: "absorbed by the plants" },
            { id: 4, text: "pumped out of the tank" },
          ],
          answer: 1,
          solution: {
            method: "Diagram Reading",
            steps: [
              "The diagram shows: Clean water → fish tank (where tilapias are).",
              "Clean water is sent/cycled back to the fish tank.",
              "Waste water goes to the grow bed (not clean water); absorbed by plants refers to nutrients, not the clean water itself.",
            ],
            tip: "Follow the arrows in the aquaponics diagram. CLEAN water goes to the FISH TANK (where the tilapias are).",
          },
        },
        {
          id: "taonan_eoy24_C19",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "You can see ____________ in the Compost Station.",
          options: [
            { id: 1, text: "tilapias" },
            { id: 2, text: "spinach" },
            { id: 3, text: "stag beetles" },
            { id: 4, text: "papaya trees" },
          ],
          answer: 3,
          solution: {
            method: "Information Retrieval from Visual",
            steps: [
              "Compost Station section shows stag beetles (pictured).",
              "Tilapias = aquaponics tank; spinach = grow bed; papaya trees = nourished by fertiliser but not IN the station.",
              "Stag beetles are shown in the Compost Station section.",
            ],
            tip: "Look at the Compost Station section specifically. STAG BEETLES are pictured there.",
          },
        },
        {
          id: "taonan_eoy24_C20",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText:
            "Based on the advertisement, the main reason for cage-free farming is to ____________.",
          options: [
            { id: 1, text: "collect more eggs" },
            { id: 2, text: "let visitors pet silkie chickens" },
            { id: 3, text: "rear happier and healthier chickens" },
            { id: 4, text: "help the chickens live for up to seven years" },
          ],
          answer: 3,
          solution: {
            method: "Main Idea — Visual Text",
            steps: [
              "The Cage-free Farming section states: 'Hens are happier and healthier when they are allowed to roam freely.'",
              "The MAIN reason = to rear happier and healthier chickens.",
              "Better eggs and longer life are BENEFITS of cage-free, not the main reason.",
              "Petting chickens is an activity, not the reason for cage-free farming.",
            ],
            tip: "The MAIN reason is stated first: 'happier and healthier when allowed to roam freely.' Other benefits (eggs, longer life) follow from this.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B
    // ─────────────────────────────────────────────

    // ── Section D: Grammar Cloze (4 marks, Q21–24) ─────────────────────────
    {
      id: "bookletB_sectionD",
      title: "Section D: Grammar Cloze",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the passage carefully. Choose the correct answer from the words in the box. Write its letter (A to H) in each blank. EACH WORD CAN BE USED ONLY ONCE.",
      wordBox: {
        A: "by",
        B: "in",
        C: "their",
        D: "theirs",
        E: "to",
        F: "when",
        G: "where",
        H: "with",
      },
      passageText: `Traditional games in Southeast Asia are loads of fun! One popular game is Sepak Takraw, (21)_____ players on each side kick a rattan ball over a net, bouncing it off their chests, heads and shoulders. Chapteh challenges players to keep a special shuttlecock made (22)_____ a rubber disc and coloured feathers in the air using their feet. Gasing involves spinning big tops to see who can keep (23)_____ spinning the longest. In a game of Congkak, players compete to place the most marbles (24)_____ the large holes on the ends of the board, known as "storehouses". Which game would you like to try?`,
      answers: {
        21: { letter: "G", word: "where" },
        22: { letter: "H", word: "with" },
        23: { letter: "C", word: "their" },
        24: { letter: "B", word: "in" },
      },
      questionsSolutions: [
        {
          id: "taonan_eoy24_D21",
          blank: 21,
          answer: "G — where",
          solution: {
            method: "Grammar Cloze — Relative Pronoun",
            steps: [
              "'Sepak Takraw, ___ players on each side kick a ball over a net.'",
              "'Where' = in which — referring back to the game (a situation/context where something happens).",
              "'When' refers to time; 'where' refers to place/situation/context.",
            ],
            tip: "'A game WHERE players kick a ball' = a game in which (context/situation). WHERE can introduce relative clauses about situations.",
          },
        },
        {
          id: "taonan_eoy24_D22",
          blank: 22,
          answer: "H — with",
          solution: {
            method: "Grammar Cloze — Preposition of Material",
            steps: [
              "'A shuttlecock made ___ a rubber disc and coloured feathers.'",
              "'Made with' = constructed using these materials.",
              "'Made of' = made from a single material; 'made with' = assembled using components.",
            ],
            tip: "'Made WITH' = using these components (rubber disc + feathers = components). 'Made with' + list of ingredients/parts.",
          },
        },
        {
          id: "taonan_eoy24_D23",
          blank: 23,
          answer: "C — their",
          solution: {
            method: "Grammar Cloze — Possessive Pronoun",
            steps: [
              "'See who can keep ___ spinning the longest.' = who can keep their [top] spinning.",
              "'Their' = possessive for 'players' (the tops belonging to the players).",
              "'Their' refers back to the players in the Gasing game.",
            ],
            tip: "Players keep THEIR [tops] spinning. 'Their' = possessive pronoun referring to the players.",
          },
        },
        {
          id: "taonan_eoy24_D24",
          blank: 24,
          answer: "B — in",
          solution: {
            method: "Grammar Cloze — Preposition of Location",
            steps: [
              "'Players compete to place the most marbles ___ the large holes.'",
              "'In the holes' = inside the holes — marbles are placed inside the holes.",
              "'In' = inside a space/container.",
            ],
            tip: "Place marbles IN holes = inside them. IN = inside a container/space.",
          },
        },
      ],
    },

    // ── Section E: Comprehension Cloze (4 marks, Q25–28) ───────────────────
    {
      id: "bookletB_sectionE",
      title: "Section E: Comprehension Cloze",
      type: "VocabCloze",
      marks: 4,
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box. Write its letter (A to H) in each blank. EACH WORD CAN BE USED ONLY ONCE.",
      wordBox: {
        A: "camouflage",
        B: "cheerful",
        C: "disguise",
        D: "memory",
        E: "personal",
        F: "pretend",
        G: "thought",
        H: "thrilling",
      },
      passageText: `Hey there, adventurous friend!

Imagine a world where dinosaurs roam, and friends set off on exciting adventures! Let's (25)_____ to be explorers and uncover hidden treasures at the newly opened Dinosaur Park. With our (26)_____ gear, we'll be well-hidden into the wild as we observe the giants. We can also hop on (27)_____ rides and enjoy ourselves as we journey through the theme park. Wearing our explorer uniforms, every journey feels like a match made in heaven. With carefree hearts, we'll make each day a pleasant (28)_____. So, are you ready to join me on this interesting mission?

Adventure awaits,
Sam`,
      answers: {
        25: { letter: "F", word: "pretend" },
        26: { letter: "A", word: "camouflage" },
        27: { letter: "H", word: "thrilling" },
        28: { letter: "D", word: "memory" },
      },
      questionsSolutions: [
        {
          id: "taonan_eoy24_E25",
          blank: 25,
          answer: "F — pretend",
          solution: {
            method: "Vocabulary Cloze — Verb",
            steps: [
              "'Let's ___ to be explorers' = imagining/acting as if they are explorers.",
              "'Pretend' = to act as if something is true when it isn't.",
              "'Disguise' = to conceal identity; 'pretend' = to imagine/play-act.",
            ],
            tip: "Let's PRETEND = let's imagine/play-act as if we are explorers. Children pretend to be things they're not.",
          },
        },
        {
          id: "taonan_eoy24_E26",
          blank: 26,
          answer: "A — camouflage",
          solution: {
            method: "Vocabulary Cloze — Noun",
            steps: [
              "'With our ___ gear, we'll be well-hidden' = gear that helps them blend in/hide.",
              "'Camouflage' = gear that makes you blend into surroundings (used for hiding).",
              "'Disguise' = changes appearance; 'camouflage' = blends into environment.",
            ],
            tip: "CAMOUFLAGE gear = clothing/equipment that helps you blend in and hide from view. Used by explorers and soldiers.",
          },
        },
        {
          id: "taonan_eoy24_E27",
          blank: 27,
          answer: "H — thrilling",
          solution: {
            method: "Vocabulary Cloze — Adjective (Rides)",
            steps: [
              "'Hop on ___ rides and enjoy ourselves' = exciting, adrenaline-filled rides.",
              "'Thrilling' = very exciting, causing a rush of excitement.",
              "'Cheerful' = happy but not specifically exciting; 'thrilling' better describes exciting rides.",
            ],
            tip: "Theme park RIDES that you 'enjoy' = THRILLING (exciting, adrenaline-filled). Thrilling rides = roller coasters etc.",
          },
        },
        {
          id: "taonan_eoy24_E28",
          blank: 28,
          answer: "D — memory",
          solution: {
            method: "Vocabulary Cloze — Noun",
            steps: [
              "'We'll make each day a pleasant ___' = something to look back on fondly.",
              "'Memory' = something remembered from the past; 'a pleasant memory' = a happy recollection.",
              "Making each day 'a pleasant memory' = creating good experiences to remember.",
            ],
            tip: "'Make each day a pleasant MEMORY' = create something worth remembering. Experiences become memories.",
          },
        },
      ],
    },

    // ── Section F: Synthesis and Transformation (4 x 2 marks, Q29–32) ───────
    {
      id: "bookletB_sectionF",
      title: "Section F: Synthesis and Transformation of Sentences",
      type: "SentenceCombining",
      marks: 8,
      instructions:
        "For each of the questions 29 to 32, rewrite the given sentence(s) using the word provided. The meaning of the sentence(s) must be the same as the meaning of the given sentence(s).",
      questions: [
        {
          id: "taonan_eoy24_F29",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          questionText:
            "Mr Ray has to work very hard. He has a family of seven to support.\n\nTo ___________________________________",
          startingWord: "To",
          answer: "To support a family of seven, Mr Ray has to work very hard.",
          solution: {
            method: "Sentence Combining — Infinitive of Purpose",
            steps: [
              "The second sentence explains WHY he works hard: to support his family.",
              "Structure: 'To [purpose], [action].'",
              "Correct: 'To support a family of seven, Mr Ray has to work very hard.'",
            ],
            tip: "TO + verb = in order to (purpose). Put the reason first: 'To support..., Mr Ray has to work hard.'",
          },
        },
        {
          id: "taonan_eoy24_F30",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          questionText:
            "Mrs Tan gazed at the special artwork. Mrs Tan wanted to buy the special artwork.\n\n____________ because ___________________________________",
          startingWord: "because",
          answer: "Mrs Tan gazed at the special artwork because she wanted to buy it.",
          solution: {
            method: "Sentence Combining — Because (Reason)",
            steps: [
              "'Because' introduces the reason for gazing.",
              "She gazed (action) because she wanted to buy it (reason).",
              "Replace 'the special artwork' with 'it' to avoid repetition.",
              "Correct: 'Mrs Tan gazed at the special artwork because she wanted to buy it.'",
            ],
            tip: "BECAUSE = gives the reason. Gazed at it BECAUSE she wanted to buy it. Replace repeated noun with 'it'.",
          },
        },
        {
          id: "taonan_eoy24_F31",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          questionText:
            "The students stood up to greet their principal when she entered the classroom.\n\nAs soon as ___________________________________",
          startingWord: "As soon as",
          answer: "As soon as the principal entered the classroom, the students stood up to greet her.",
          solution: {
            method: "Sentence Combining — As soon as (Immediate Sequence)",
            steps: [
              "'As soon as' = immediately when something happens.",
              "The principal entering triggered the students standing up immediately.",
              "Structure: 'As soon as [trigger], [immediate response].'",
              "Correct: 'As soon as the principal entered the classroom, the students stood up to greet her.'",
            ],
            tip: "'AS SOON AS' = the moment X happened, Y happened immediately. Principal entered → immediately students stood up.",
          },
        },
        {
          id: "taonan_eoy24_F32",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          questionText:
            "The girl was hungry. The girl ate all the sandwiches on the plate.\n\nOut of ___________________________________",
          startingWord: "Out of",
          answer: "Out of hunger, the girl ate all the sandwiches on the plate.",
          solution: {
            method: "Sentence Combining — Out of (Cause)",
            steps: [
              "'Out of' + emotion/state = because of / driven by that feeling.",
              "She ate because of hunger → 'Out of hunger, she ate...'",
              "Structure: 'Out of [emotion/state], [action].'",
              "Correct: 'Out of hunger, the girl ate all the sandwiches on the plate.'",
            ],
            tip: "'OUT OF' + noun = because of / driven by. 'Out of hunger' = because she was hungry. She ate out of hunger.",
          },
        },
      ],
    },

    // ── Section G: Editing for SPG (6 marks, Q33–38) ───────────────────────
    {
      id: "bookletB_sectionG",
      title: "Section G: Spelling and Grammar",
      type: "Editing",
      marks: 6,
      instructions:
        "Each of the underlined words contains either a spelling or grammatical error. Write the correct word in each of the boxes.",
      passageText: `The family gathered in the backyard for a barbecue at sunset. Mr Lee (33)[grilled] the burgers while chatting with his daughter, who was showing off her new bicycle. She asked if he could teach her some tricks, exclaim (34)[exclaimed], "I can't wait to learn cool stunts!" Mrs Lee, watching from the porch, worried by (35)[for] their safety, called out to them to be careful. "Don't worry, we'll be fine," asured (36)[assured] Mr Lee. He smiled at his wife and said, "By the way, I have bought you your favourite desart (37)[dessert] - strawberry pudding!" Mrs Lee laughed. She then said, "Thank you, but I'll have to excecise (38)[exercise] later." Their daughter shook her head and parked her bicycle smilingly.`,
      questions: [
        {
          id: "taonan_eoy24_G33",
          blank: 33,
          type: "grammar",
          errorWord: "grill (implied — answer key says 'grilled')",
          correctWord: "grilled",
          context: "Mr Lee (33) the burgers while chatting",
          answer: "grilled",
          solution: {
            method: "Editing — Grammar (Past Tense)",
            steps: [
              "The passage is narrated in past tense ('gathered', 'chatting').",
              "'Grill' is base form — should be 'grilled' (simple past).",
              "Correct: 'Mr Lee grilled the burgers.'",
            ],
            tip: "Past tense narrative: gathered → grilled. Change base form to PAST SIMPLE.",
          },
        },
        {
          id: "taonan_eoy24_G34",
          blank: 34,
          type: "grammar",
          errorWord: "exclaim",
          correctWord: "exclaimed",
          context: "she asked if he could teach her some tricks, exclaim",
          answer: "exclaimed",
          solution: {
            method: "Editing — Grammar (Past Tense)",
            steps: [
              "'Exclaim' is base/present form — in a past narrative, should be 'exclaimed'.",
              "Correct: 'she... exclaimed, \"I can't wait...\"'",
            ],
            tip: "Past tense narrative → exclaim becomes EXCLAIMED.",
          },
        },
        {
          id: "taonan_eoy24_G35",
          blank: 35,
          type: "grammar",
          errorWord: "by",
          correctWord: "for",
          context: "worried by their safety",
          answer: "for",
          solution: {
            method: "Editing — Grammar (Preposition)",
            steps: [
              "'Worried by' is incorrect. The correct preposition is 'worried for'.",
              "'Worried for someone's safety' = concerned about their wellbeing.",
              "'Worried by' = disturbed/caused worry by (passive sense); 'worried for' = anxious about someone's welfare.",
            ],
            tip: "WORRIED FOR = anxious about someone's wellbeing. 'Worried for their safety' = concerned they might get hurt.",
          },
        },
        {
          id: "taonan_eoy24_G36",
          blank: 36,
          type: "spelling",
          errorWord: "asured",
          correctWord: "assured",
          answer: "assured",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Asured' is missing a letter — should be 'assured' (double 's').",
              "Correct spelling: a-s-s-u-r-e-d.",
              "'Assured' = told someone confidently to remove their worry.",
            ],
            tip: "ASSURED = reassured. Spelling: as + SURED → aSSURed. Double 's' after 'a'.",
          },
        },
        {
          id: "taonan_eoy24_G37",
          blank: 37,
          type: "spelling",
          errorWord: "desart",
          correctWord: "dessert",
          answer: "dessert",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Desart' is a misspelling. The sweet food is 'dessert' (double 's').",
              "Correct spelling: d-e-s-s-e-r-t.",
              "Remember: 'dessert' has double 's' (two spoonfuls of sugar!) vs 'desert' (one 's', the dry land).",
            ],
            tip: "DESSERT (sweet food) = double 's'. Trick: 'strawberry shortcake' = SS = double S = deSSert.",
          },
        },
        {
          id: "taonan_eoy24_G38",
          blank: 38,
          type: "spelling",
          errorWord: "excecise",
          correctWord: "exercise",
          answer: "exercise",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Excecise' is a phonetic misspelling of 'exercise'.",
              "Correct spelling: e-x-e-r-c-i-s-e.",
              "Break it down: ex-er-cise.",
            ],
            tip: "EXERCISE: ex + er + cise. Common error is the 'r' and 'c'. Not 'excecise' or 'exercize'.",
          },
        },
      ],
    },

    // ── Section H: Comprehension Open-ended (8 marks, Q39–43) ──────────────
    {
      id: "bookletB_sectionH",
      title: "Section H: Comprehension Open-ended",
      type: "ComprehensionOE",
      marks: 8,
      instructions:
        "Read the passage below and answer questions 39 to 43. Your answers must be based on the passage.",
      passageTitle: "A Day on Pulau Ubin",
      passageText: `"Grandma, Grandpa, this is going to be awesome!" Josh exclaimed, his eyes twinkling with excitement as they stepped foot on Pulau Ubin. The air was filled with a sense of adventure, and Josh felt splendid.

Hand in hand, they walked into the lush greenery, amazed by the island's natural beauty. "Wow, this place is like a paradise!" Josh gasped, taking in the sights and sounds around him. The leaves rustled in the gentle breeze, and colourful birds danced in the trees.

Suddenly, a cheeky monkey swung down from the branches and grabbed Josh's food! "Oh no, my snacks!" Josh cried out in trepidation, watching helplessly as the animal darted away with his treats.

Grandma and Grandpa just chuckled and said, pointing to his bag, "I've plenty more in here."

As Josh and his grandparents continued their adventure, they came across a wild boar blocking their path. Josh's heart raced, but Grandma and Grandpa held their grandson's hand tightly. "Let's slowly back away. It means no harm," Grandpa said. Eventually, the creature did trot away.

Just before lunchtime, Josh suddenly realised that his backpack was missing! "What do we do now?" he asked, pacing up and down.

Grandma patted his shoulder and suggested, "Let's retrace our steps and see if we can find it. We'll work together and solve this problem, just like we did with the monkey and the boar."

With determination and teamwork, the trio scoured the jungle until they found the backpack on a bench. Josh had forgotten to carry it with him when they left that resting spot earlier. Relieved, he hugged his grandparents appreciatively.`,
      questions: [
        {
          id: "taonan_eoy24_H39",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 2,
          questionText:
            "Write 'True' or 'False' in the boxes beside each statement.\na) The group was impressed by the natural beauty of the island.\nb) The group hired transport to explore Pulau Ubin.",
          answer: "a) True\nb) False",
          solution: {
            method: "True/False — Text Evidence",
            steps: [
              "(a) Paragraph 2: 'they walked into the lush greenery, amazed by the island's natural beauty.' → impressed = amazed. TRUE.",
              "(b) They walked ('hand in hand') — no mention of hired transport. They explored on foot. FALSE.",
            ],
            tip: "(a) 'amazed by natural beauty' = impressed → TRUE. (b) They walked, no transport mentioned → FALSE.",
          },
        },
        {
          id: "taonan_eoy24_H40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Write down two things Grandma and Grandpa did once they saw the wild boar.\na) ___\nb) ___",
          answer:
            "a) Grandma and Grandpa held their grandson's hand tightly.\nb) They slowly backed away (from the boar).",
          solution: {
            method: "Evidence Retrieval — Two Actions",
            steps: [
              "Paragraph 5: 'Grandma and Grandpa held their grandson's hand tightly.'",
              "Paragraph 5: 'Let's slowly back away.' → they backed away from the boar.",
              "Two actions: (1) held Josh's hand, (2) backed away slowly.",
            ],
            tip: "Find TWO things they DID when they saw the boar: (1) held his hand tightly, (2) slowly backed away.",
          },
        },
        {
          id: "taonan_eoy24_H41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "From lines 17–18, tick (✓) one of the words that best describes how Josh felt.\n☐ excited / ☐ panic-stricken / ☐ embarrassed",
          answer: "panic-stricken",
          solution: {
            method: "Inference from Text",
            steps: [
              "Lines 17-18 (paragraph 6): 'Josh suddenly realised that his backpack was missing! ...he asked, pacing up and down.'",
              "'Pacing up and down' = a sign of anxiety/panic.",
              "'Panic-stricken' = in a panic — fits losing his backpack.",
            ],
            tip: "'Pacing up and down' = physical sign of PANIC. Josh was panic-stricken when he lost his backpack.",
          },
        },
        {
          id: "taonan_eoy24_H42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word in the sentence below has the same meaning as 'perseverance'? Circle (A) or (B).\n'With determination (A) and teamwork (B), the trio scoured the jungle until they found the backpack on a bench.'",
          answer: "A — determination",
          solution: {
            method: "Synonym Identification",
            steps: [
              "'Perseverance' = continuing despite difficulty, persistence.",
              "'Determination' = the quality of being determined, resolving to achieve something despite obstacles.",
              "'Teamwork' = working together as a team — a different concept.",
            ],
            tip: "PERSEVERANCE = keeping going despite difficulty = DETERMINATION. Both mean resolve and not giving up.",
          },
        },
        {
          id: "taonan_eoy24_H43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Did Josh enjoy his trip to Pulau Ubin? Give a reason. Your answer must be based on the text.",
          answer:
            "Yes, Josh enjoyed his trip to Pulau Ubin because he felt like the island was a paradise and he called it 'awesome'. / Yes, Josh enjoyed his trip. He was excited and exclaimed that the trip was going to be awesome when they first arrived.",
          solution: {
            method: "Inference + Evidence",
            steps: [
              "Yes — there is positive evidence in the text.",
              "Evidence 1: 'This is going to be awesome!' (paragraph 1) — excited before the trip.",
              "Evidence 2: 'This place is like a paradise!' (paragraph 2) — impressed by the island.",
              "Although there were challenges (monkey, boar, lost backpack), his overall reaction is positive.",
            ],
            tip: "Yes + text evidence. Use Josh's own words ('awesome', 'paradise') as proof. He expressed delight throughout the trip.",
          },
        },
      ],
    },
  ],
};
