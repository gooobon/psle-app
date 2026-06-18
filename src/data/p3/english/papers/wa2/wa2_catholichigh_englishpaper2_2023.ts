// ============================================================
// Catholic High School (Primary) — Practice Paper 2, Primary 3
// English Language Paper  (50 marks)
// Sections: A Grammar MCQ (8) | B Vocabulary MCQ (6) | C Grammar Cloze letter (4)
//           D Grammar Cloze underline (4) | E Vocabulary Cloze (3)
//           F Editing / Spelling (5) | G Comprehension Cloze FIB (4)
//           H Comprehension Selected Response + OE (8) | I Comprehension OE (8)
// ============================================================

import type {
  TopicType,
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Catholic High School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  term: "Practice Paper 2",
  year: 2023,
  totalMarks: 50,
  timeMinutes: 0,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Grammar MCQ  (Q1–Q8, 8 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "cathhigh2-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Ali and his sister __________ to school every day.",
    options: ["(1) cycle", "(2) cycles", "(3) cycled", "(4) cycling"],
    answer: "1",
    solution: {
      method: "Subject-verb agreement + tense: plural subject + 'every day' → simple present base form.",
      steps: [
        "Subject: 'Ali and his sister' → joined by 'and' → PLURAL.",
        "'every day' → habitual present → SIMPLE PRESENT.",
        "Plural subject + present simple → BASE FORM (no -s).",
        "(1) cycle → base form → CORRECT.",
        "(2) cycles → singular -s → WRONG for plural.",
        "(3) cycled → past tense → WRONG ('every day' is present).",
        "(4) cycling → participle → needs auxiliary → WRONG alone.",
        "Answer: (1) cycle.",
      ],
      tip: "Ali AND his sister = two people = plural → cycle (not cycles). 'Every day' locks us into present simple.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Jun Xian __________ a song during the school's upcoming concert this November.",
    options: [
      "(1) sing",
      "(2) sings",
      "(3) was singing",
      "(4) will be singing",
    ],
    answer: "4",
    solution: {
      method: "Future tense: 'upcoming concert this November' signals a future planned event.",
      steps: [
        "'upcoming concert this November' → FUTURE event.",
        "(4) will be singing → future continuous → planned action that will be in progress. CORRECT.",
        "(1) sing / (2) sings → present tense → wrong for a future event.",
        "(3) was singing → past continuous → wrong tense.",
        "Answer: (4) will be singing.",
      ],
      tip: "Future continuous (will be + -ing) describes a future action in progress at a specific time. Upcoming events → future continuous.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Helen and Hannah share a room. The room is __________.",
    options: ["(1) its", "(2) hers", "(3) ours", "(4) theirs"],
    answer: "4",
    solution: {
      method: "Possessive pronoun: two people (Helen and Hannah) share a room → theirs.",
      steps: [
        "Two people (Helen and Hannah) share the room → the room belongs to THEM.",
        "'theirs' = possessive pronoun for they/them. CORRECT.",
        "'its' → for objects/animals → WRONG (owners are people).",
        "'hers' → singular female → WRONG (two people share it).",
        "'ours' → speaker included → WRONG (we are not Helen or Hannah).",
        "Answer: (4) theirs.",
      ],
      tip: "Two or more people sharing something → THEIRS. One female → hers. One male → his. Speaker included → ours.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "After taking so much time to complete her art project, Alisha had __________ time left to do other work as it was time for bed.",
    options: ["(1) little", "(2) many", "(3) some", "(4) several"],
    answer: "1",
    solution: {
      method: "Quantifier: 'time' is uncountable; context shows very little time remaining.",
      steps: [
        "'time' = uncountable → only 'little', 'much', 'some', 'a little' work with it.",
        "Context: took SO MUCH time on art project → very LITTLE time left.",
        "(1) little → small amount of uncountable noun → CORRECT. 'Little time left' = almost no time.",
        "(2) many → countable only → WRONG.",
        "(3) some → positive amount; contradicts 'took so much time…' leaving barely any.",
        "(4) several → countable plural → WRONG.",
        "Answer: (1) little.",
      ],
      tip: "Little (uncountable) = almost none. Few (countable) = almost none. She spent so long on the project that she had LITTLE time left.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "All the children __________ present for Uncle Lim's 80th birthday celebration last night.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "4",
    solution: {
      method: "Subject-verb agreement + past tense: 'last night' → past; 'all the children' → plural.",
      steps: [
        "'last night' → past tense.",
        "Subject: 'All the children' → PLURAL.",
        "Plural past tense of 'to be' → WERE.",
        "(4) were → plural past → CORRECT.",
        "(3) was → singular past → WRONG.",
        "(1) is / (2) are → present → WRONG.",
        "Answer: (4) were.",
      ],
      tip: "All the children (plural) + last night (past) = WERE. Singular past = was. Plural past = were.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Ken has been learning to play the piano __________ he was four years old. He will be taking his Grade 8 examination soon.",
    options: ["(1) if", "(2) so", "(3) from", "(4) since"],
    answer: "4",
    solution: {
      method: "Conjunction + tense: 'has been learning' (present perfect continuous) pairs with 'since' for time origin.",
      steps: [
        "'has been learning' → present perfect continuous → action from past to now.",
        "The time reference: 'he was four years old' = a past starting point.",
        "'since' + past point in time = from that time until now → CORRECT. 'Since he was four.'",
        "'from' → 'from he was four' → ungrammatical in English ('from + noun phrase', not 'from + clause').",
        "'if' → conditional → WRONG.",
        "'so' → result → WRONG.",
        "Answer: (4) since.",
      ],
      tip: "Present perfect (has been + -ing) + 'since' + starting point. 'Since he was four' = from age four until now. 'From' needs a noun: 'from age four' (but not 'from he was four').",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q7",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Look up there! __________ is Sheena\'s father performing a parachute jump for the National Day Parade," exclaimed Nasrin.',
    options: ["(1) This", "(2) That", "(3) These", "(4) Those"],
    answer: "2",
    solution: {
      method: "Demonstrative pronoun: pointing at something FAR AWAY (up in the sky).",
      steps: [
        "'Look UP THERE!' → the subject is UP IN THE SKY, far from the speaker.",
        "Subject referred to: singular (Sheena's father / the parachute jumper).",
        "Singular + far = THAT.",
        "(2) That → singular + far away → CORRECT.",
        "(1) This → singular + near → WRONG (up in sky = far).",
        "(3) These / (4) Those → plural → WRONG (one father/jumper).",
        "Answer: (2) That.",
      ],
      tip: "When you say 'Look UP there!' the thing is far away → use THAT (singular) or THOSE (plural). 'That is Sheena's father up there!'",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q8",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The car __________ off immediately when the traffic lights turned green.",
    options: ["(1) sped", "(2) speed", "(3) speeds", "(4) speeding"],
    answer: "1",
    solution: {
      method: "Past tense: 'when the traffic lights turned green' → past context.",
      steps: [
        "'when the traffic lights TURNED green' → past simple signal.",
        "The car's action is in the past → past tense required.",
        "speed → irregular past: SPED.",
        "(1) sped → simple past of speed → CORRECT.",
        "(2) speed → base form/present → WRONG.",
        "(3) speeds → present third person → WRONG.",
        "(4) speeding → participle → needs auxiliary → WRONG alone.",
        "Answer: (1) sped.",
      ],
      tip: "Irregular verb: speed → sped (past). Like feed → fed, bleed → bled. 'The car sped off' = the car drove away quickly (in the past).",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Vocabulary MCQ  (Q9–Q14, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "cathhigh2-q9",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"Please __________ your shoes and keep them in the shoe cabinet," Mrs Lim told her guests politely.',
    options: [
      "(1) take on",
      "(2) take up",
      "(3) take off",
      "(4) take down",
    ],
    answer: "3",
    solution: {
      method: "Phrasal verb: 'take _______ your shoes' before putting them in the cabinet.",
      steps: [
        "Context: shoes → shoe cabinet → guests must remove their shoes before entering.",
        "'take off' = remove (clothing/shoes). CORRECT.",
        "'take on' = accept a responsibility or hire someone → WRONG.",
        "'take up' = begin a hobby or occupy space → WRONG.",
        "'take down' = lower something or write something down → WRONG.",
        "Answer: (3) take off.",
      ],
      tip: "'Take off' = remove clothing/accessories. 'Take off your shoes/hat/jacket.' In Singapore homes, shoes are removed before entering.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"You should __________ your right fist and place it on the left side of your chest while saying the pledge," the teacher reminded the pupils.',
    options: ["(1) grab", "(2) slam", "(3) clench", "(4) squeeze"],
    answer: "3",
    solution: {
      method: "Vocabulary: the action of making a tight fist for the national pledge.",
      steps: [
        "Context: making a FIST and placing it on the chest (Pledge of Allegiance gesture).",
        "'clench' = close tightly (clench a fist) → STANDARD expression for making a fist. CORRECT.",
        "'grab' = seize suddenly with the hand → doesn't apply to making a fist.",
        "'slam' = hit hard against a surface → WRONG.",
        "'squeeze' = press from both sides → not the motion for a fist.",
        "Answer: (3) clench.",
      ],
      tip: "'Clench your fist' = close your hand tightly into a ball. Standard phrase. 'Clench your teeth' = bite down tightly. Both describe closing tightly.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My father bought a __________ of drawers to organise his study area.",
    options: ["(1) pack", "(2) flight", "(3) batch", "(4) chest"],
    answer: "4",
    solution: {
      method: "Vocabulary: identify the correct collective/compound noun for a piece of furniture with drawers.",
      steps: [
        "'a ______ of drawers' → a piece of furniture made of stacked drawers.",
        "'chest of drawers' = a tall piece of furniture with multiple drawers for storing things. CORRECT.",
        "'pack of drawers' → not a standard expression.",
        "'flight of drawers' → 'flight of stairs' is standard, but not 'flight of drawers'.",
        "'batch of drawers' → batch = group made at same time; not for furniture.",
        "Answer: (4) chest.",
      ],
      tip: "'A chest of drawers' = a piece of bedroom furniture with multiple stacked drawers. Fixed compound noun.",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The __________ will be coming tomorrow to repair the burst water pipes.",
    options: [
      "(1) cobbler",
      "(2) plumber",
      "(3) electrician",
      "(4) technician",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: identify the tradesperson who fixes water pipes.",
      steps: [
        "Task: repair BURST WATER PIPES → water/plumbing problem.",
        "'plumber' = person who installs and repairs water pipes and systems. CORRECT.",
        "'cobbler' = person who repairs shoes → WRONG.",
        "'electrician' = person who works with electrical wiring → WRONG.",
        "'technician' = general technical specialist; too vague for pipes specifically.",
        "Answer: (2) plumber.",
      ],
      tip: "Plumber → water pipes. Electrician → electrical wiring. Cobbler → shoes. Carpenter → wood. Know your tradespeople!",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "It was __________ of Mandy to give up her seat to the lady with an injured leg.",
    options: [
      "(1) diligent",
      "(2) grateful",
      "(3) responsible",
      "(4) considerate",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: identify the trait shown by giving up a seat for someone who needs it.",
      steps: [
        "Mandy gave up her seat to someone who NEEDED it (injured leg) → thinking of others.",
        "'considerate' = thinking carefully about others' needs/feelings. CORRECT.",
        "'diligent' = hardworking → WRONG (not about helping others).",
        "'grateful' = thankful → WRONG (Mandy gave, not received).",
        "'responsible' = reliable/dutiful → possible, but 'considerate' more specifically captures thinking of others' comfort.",
        "Answer: (4) considerate.",
      ],
      tip: "'Considerate' = thoughtful about others' needs. Giving up your seat for someone who needs it = considerate act. Contrast: 'responsible' (fulfilling duties), 'considerate' (caring about others).",
    },
  },

  {
    kind: "A",
    id: "cathhigh2-q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "All children are reminded to __________ their seat belts when they travel in school buses.",
    options: ["(1) bind", "(2) click", "(3) fasten", "(4) connect"],
    answer: "3",
    solution: {
      method: "Vocabulary: correct verb for seat belts.",
      steps: [
        "Standard instruction for seat belts: 'fasten your seat belt'. CORRECT.",
        "'fasten' = secure/attach firmly → standard expression for seatbelts.",
        "'bind' = tie tightly → not used for seatbelts.",
        "'click' = the sound a seatbelt makes, but not the verb instruction ('fasten/click in your belt' — 'click in' is informal).",
        "'connect' = link two things → not standard for seatbelts.",
        "Answer: (3) fasten.",
      ],
      tip: "Fixed expression: 'fasten your seat belt' = the standard instruction. Also acceptable: 'buckle up'. Never 'bind' or 'connect' your seatbelt.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Grammar Cloze (Letter Bank)  (Q15–Q18, 4 marks)
  //  Passage: Mae Carol Jemison (Astronaut)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secC",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Mae Carol Jemison (adapted from https://www.education.com)",
    passageText:
      "Mae Carol Jemison was born in 1956. When she was a child, she dreamt of travelling into space. She grew (15) __________ and became famous (16) __________ making that dream come true.\n\nIn school, Mae studied hard and did very well in all her subjects. She loved reading, especially (17) __________ the stars and studied how living things move about in space. In 1992, Mae was the first African American female to fly (18) __________ space. Today, she is a successful astronaut.",
    wordBank: {
      A: "about",
      B: "among",
      C: "for",
      D: "into",
      E: "of",
      F: "up",
    },
    questions: [
      {
        qid: "cathhigh2-q15",
        blankLabel: "(15)",
        question: "She grew (15) __________ and became famous.",
        answer: "F",
        solution: {
          method: "Phrasal verb: 'grew up' = became an adult.",
          steps: [
            "'grew ______ and became famous' → phrasal verb for becoming an adult.",
            "'grow up' = to become an adult → CORRECT.",
            "F (up) → 'She grew up' → CORRECT.",
            "Answer: F (up).",
          ],
          tip: "'Grow up' = become an adult. Fixed phrasal verb. 'She grew up and became a famous astronaut.'",
        },
      },
      {
        qid: "cathhigh2-q16",
        blankLabel: "(16)",
        question: "She became famous (16) __________ making that dream come true.",
        answer: "C",
        solution: {
          method: "Preposition: 'famous for + -ing' = fixed phrase.",
          steps: [
            "'became famous ______ making that dream come true.'",
            "Fixed phrase: 'famous FOR [doing something]' = known because of a particular achievement.",
            "C (for) → 'famous for making that dream come true' → CORRECT.",
            "Answer: C (for).",
          ],
          tip: "'Famous for' = known because of. 'She is famous for her kindness.' 'Famous for making her dream come true.'",
        },
      },
      {
        qid: "cathhigh2-q17",
        blankLabel: "(17)",
        question: "She loved reading, especially (17) __________ the stars.",
        answer: "A",
        solution: {
          method: "Preposition: 'reading about' the stars = reading information about them.",
          steps: [
            "'loved reading, especially ______ the stars' → what kind of reading?",
            "A (about) → 'reading about the stars' = reading information on the topic of stars. CORRECT.",
            "B (among) → 'reading among the stars' → doesn't collocate.",
            "Answer: A (about).",
          ],
          tip: "'Read about' = read information regarding a topic. 'She loves reading about space' = she reads books/articles on space topics.",
        },
      },
      {
        qid: "cathhigh2-q18",
        blankLabel: "(18)",
        question: "Mae was the first African American female to fly (18) __________ space.",
        answer: "D",
        solution: {
          method: "Preposition of direction: travelling from Earth into space requires 'into'.",
          steps: [
            "'to fly ______ space' → entering space from Earth.",
            "D (into) → directional preposition: movement from outside to inside a place. CORRECT.",
            "B (among) → would need 'among the stars', not 'among space'.",
            "Answer: D (into).",
          ],
          tip: "'Fly into space' = travel from Earth into outer space. 'Into' shows direction of movement entering a new area. Compare: 'in space' (already there) vs 'into space' (travelling there).",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Grammar Cloze (Underline)  (Q19–Q22, 4 marks)
  //  Passage: Wombats (adapted from animals.sandiegozoo.org)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secD",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Wombats (adapted from https://animals.sandiegozoo.org/animals/wombat)",
    passageText:
      "Wombats look like bears but are related to koalas and kangaroos. Like kangaroos, wombats (19) [spend / spends] most of their time grazing. They (20) [use / uses] their rodent-like teeth and strong jaws to grip and tear food such as roots, shoots and even tree bark. The young of a wombat (21) [is / are] called a joey. After birth, it (22) [stay / stays] in the mother's pouch for about ten months. The pouch faces backwards to protect the joey from dirt.",
    questions: [
      {
        qid: "cathhigh2-q19",
        blankLabel: "(19)",
        question: "Like kangaroos, wombats (19) [spend / spends] most of their time grazing.",
        answer: "spend",
        solution: {
          method: "Subject-verb agreement: 'wombats' is plural → base form.",
          steps: [
            "Subject: 'wombats' → plural.",
            "Present simple, plural → BASE FORM.",
            "'spend' (base form) → CORRECT.",
            "'spends' → third-person singular → WRONG.",
            "Answer: spend.",
          ],
          tip: "Wombats (plural, like 'they') → spend. One wombat → spends.",
        },
      },
      {
        qid: "cathhigh2-q20",
        blankLabel: "(20)",
        question: "They (20) [use / uses] their rodent-like teeth and strong jaws.",
        answer: "use",
        solution: {
          method: "Subject-verb agreement: 'They' is plural → base form.",
          steps: [
            "Subject: 'They' (wombats) → plural.",
            "Plural → base form → USE.",
            "'uses' → singular → WRONG.",
            "Answer: use.",
          ],
          tip: "They → use (base form). He/she/it → uses.",
        },
      },
      {
        qid: "cathhigh2-q21",
        blankLabel: "(21)",
        question: "The young of a wombat (21) [is / are] called a joey.",
        answer: "is",
        solution: {
          method: "Subject-verb agreement: 'The young of a wombat' = singular (one young animal).",
          steps: [
            "Subject: 'The young of a wombat' → referring to one baby wombat = singular.",
            "Singular → IS.",
            "Answer: is.",
          ],
          tip: "'The young of a wombat' = one baby → is. Compare: 'The young of wombats are…' (plural). Context: 'called A joey' (singular) confirms singular.",
        },
      },
      {
        qid: "cathhigh2-q22",
        blankLabel: "(22)",
        question: "After birth, it (22) [stay / stays] in the mother's pouch for about ten months.",
        answer: "stays",
        solution: {
          method: "Subject-verb agreement: 'it' (the joey) is singular → adds -s.",
          steps: [
            "Subject: 'it' (the joey) → third person singular.",
            "Third person singular present → STAYS (adds -s).",
            "Answer: stays.",
          ],
          tip: "He/she/it → stays. They → stay. The joey (it) → stays in the pouch.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Vocabulary Cloze  (Q23–Q25, 3 marks)
  //  Passage: The Bundle of Sticks (Aesop's Fable)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secE",
    topic: "VocabCloze",
    marks: 3,
    passageTitle: "The Bundle of Sticks (adapted from Aesop's Fables)",
    passageText:
      "There were four brothers who could not get along with one another. One day, after seeing them quarrel violently, Father tied a bundle of sticks and told them to take (23) __________ to break the sticks. One by one, each brother tried very hard, but no one was able to break a single stick.\n\nFather then (24) __________ the bundle and gave each son one stick. They broke the sticks easily.\n\n'See how (25) __________ the sticks were when they were put together. In the same way, as brothers, all of you should stay united,' said Father. The brothers then understood and nodded.\n\n'United we stand, divided we fall,' said the eldest son.",
    wordBank: {
      powerful: "powerful",
      strong: "strong",
      tied: "tied",
      time: "time",
      turns: "turns",
      untied: "untied",
    },
    questions: [
      {
        qid: "cathhigh2-q23",
        blankLabel: "(23)",
        question: "Father told them to take (23) __________ to break the sticks.",
        answer: "turns",
        solution: {
          method: "Vocabulary: 'take turns' = do something one after the other.",
          steps: [
            "'One by one, each brother tried…' → they tried in turn.",
            "'take turns' = each person has a go one after the other. CORRECT.",
            "'take time' → 'take time to break' = would mean spend time, but 'take turns' better matches 'one by one'.",
            "Answer: turns.",
          ],
          tip: "'Take turns' = do something alternately, one at a time. The passage confirms: 'one by one, each brother tried'.",
        },
      },
      {
        qid: "cathhigh2-q24",
        blankLabel: "(24)",
        question: "Father then (24) __________ the bundle and gave each son one stick.",
        answer: "untied",
        solution: {
          method: "Vocabulary: Father had TIED the bundle earlier, so now he UNTIES it.",
          steps: [
            "Earlier: 'Father TIED a bundle of sticks'.",
            "Now: to separate them, Father must UNTIE the bundle.",
            "'untied' = undid the knot/fastening. CORRECT.",
            "'tied' again would not result in giving each son one stick.",
            "Answer: untied.",
          ],
          tip: "Sequence: Father TIED → no one could break bundle → Father UNTIED → each son got one stick → broke easily. Untie = reverse of tie.",
        },
      },
      {
        qid: "cathhigh2-q25",
        blankLabel: "(25)",
        question: "'See how (25) __________ the sticks were when they were put together.'",
        answer: "strong",
        solution: {
          method: "Vocabulary: the lesson is about strength in unity — sticks together are strong.",
          steps: [
            "The moral: united we stand. Together, the bundle was unbreakable.",
            "'See how ______ the sticks were when put together' → the sticks' combined quality.",
            "'strong' = unable to be broken when united. CORRECT.",
            "'powerful' → possible but 'strong' is more precise for physical objects that resist breaking.",
            "Answer: strong.",
          ],
          tip: "The bundle of sticks fable's moral: unity = strength. 'How STRONG the sticks were together' → alone they break easily, together they are unbreakable.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Editing / Spelling  (Q26–Q30, 5 marks)
  //  Passage: De Ming and His Report Card
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secF",
    topic: "Editing",
    marks: 5,
    passageTitle: "De Ming and His Report Card",
    passageText:
      "De Ming was returning home in the bus. He held his report card and stared at his grades. Even though he knew his parents would be [desappointed](26), he had to show it to them.\n\n[Arived](27) home, he realised that the report card was not in his bag! He must have left it on the bus! When he was [paniking](28), his mother came home and saw the [worryed](29) look on his face. After finding out what had happened, De Ming's mother scolded him for being [cairless](30). She told him to apologise and explain to his teacher the next day in school.",
    questions: [
      {
        qid: "cathhigh2-q26",
        blankLabel: "(26)",
        question: "his parents would be [desappointed] — correct the bold word (spelling).",
        answer: "disappointed",
        solution: {
          method: "Spelling correction: 'desappointed' → 'disappointed'.",
          steps: [
            "'desappointed' → wrong prefix: 'des-' instead of 'dis-'.",
            "Correct: DIS-appointed → dis-ap-point-ed.",
            "Also note double 'p': dis-AP-POINTED.",
            "Correct: d-i-s-a-p-p-o-i-n-t-e-d.",
            "Answer: disappointed.",
          ],
          tip: "Disappointed = dis + appoint + ed. Note: DIS- (not des-) and double P: dis-AP-POINT-ed.",
        },
      },
      {
        qid: "cathhigh2-q27",
        blankLabel: "(27)",
        question: "When he [arived] home — correct the bold word (spelling).",
        answer: "arrived",
        solution: {
          method: "Spelling correction: 'arived' → 'arrived'.",
          steps: [
            "'arived' → missing double 'r': ar-RIVED.",
            "Arrive → past tense: arrived.",
            "Correct: a-r-r-i-v-e-d.",
            "Answer: arrived.",
          ],
          tip: "Arrive → arrived. Double 'r': AR-RIVE. Common mistake: one 'r'.",
        },
      },
      {
        qid: "cathhigh2-q28",
        blankLabel: "(28)",
        question: "When he was [paniking] — correct the bold word (spelling).",
        answer: "panicking",
        solution: {
          method: "Spelling correction: 'paniking' → 'panicking'.",
          steps: [
            "panic + -ing → add 'k' before -ing to preserve the hard /k/ sound.",
            "'paniking' → missing 'k' after 'c'.",
            "Rule: words ending in 'c' add 'k' before vowel suffixes: panic → panicking, picnic → picnicking.",
            "Correct: p-a-n-i-c-k-i-n-g.",
            "Answer: panicking.",
          ],
          tip: "Spelling rule: panic → panicking (add K before -ing). Also: picnic → picnicking, frolic → frolicking. The K preserves the hard /k/ sound.",
        },
      },
      {
        qid: "cathhigh2-q29",
        blankLabel: "(29)",
        question: "saw the [worryed] look on his face — correct the bold word (spelling).",
        answer: "worried",
        solution: {
          method: "Spelling correction: 'worryed' → 'worried'.",
          steps: [
            "worry + -ed → when adding -ed to words ending in consonant + y, change y to i.",
            "'worryed' → wrong: kept 'y' instead of changing to 'i'.",
            "worry → worried (y → i before -ed).",
            "Correct: w-o-r-r-i-e-d.",
            "Answer: worried.",
          ],
          tip: "Spelling rule: consonant + y → change y to i before adding -ed: worry → worried, carry → carried, study → studied.",
        },
      },
      {
        qid: "cathhigh2-q30",
        blankLabel: "(30)",
        question: "scolded him for being [cairless] — correct the bold word (spelling).",
        answer: "careless",
        solution: {
          method: "Spelling correction: 'cairless' → 'careless'.",
          steps: [
            "'cairless' → wrong vowel combination: 'cair' instead of 'care'.",
            "care + less = careless (simply add -less to 'care').",
            "Correct: c-a-r-e-l-e-s-s.",
            "Answer: careless.",
          ],
          tip: "careless = care + less. 'Care' has a long 'a' sound: /keər/. Double 's' at the end: care-LESS.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION G — Comprehension Cloze FIB  (Q31–Q34, 4 marks)
  //  Passage: Peter and Ahmad at the Void Deck
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secG",
    topic: "ComprehensionFIB",
    marks: 4,
    passageTitle: "No Ball Games at the Void Deck",
    passageText:
      "Peter and Ahmad wanted to play soccer in the field but it was raining heavily. They decided to play at the void deck. Although they saw the 'No Ball Games' sign, they ignored it.\n\n(31) __________ playing for about twenty minutes, they saw a policeman approaching. He immediately (32) __________ them from playing. The policeman pointed to the (33) __________ and told them sternly that they were not (34) __________ to play ball games there.\n\nPeter and Ahmad felt extremely embarrassed. They apologised profusely to the policeman and promised to follow rules in future.",
    questions: [
      {
        qid: "cathhigh2-q31",
        blankLabel: "(31)",
        question: "(31) __________ playing for about twenty minutes, they saw a policeman approaching.",
        answer: "After",
        solution: {
          method: "Time conjunction: 'playing for twenty minutes' happened first, then they saw policeman.",
          steps: [
            "Sequence: first they played 20 minutes → then saw policeman.",
            "'After playing for about twenty minutes' = following that period. CORRECT.",
            "Answer: After.",
          ],
          tip: "'After + -ing' = following that action. 'After playing for twenty minutes, they saw…' = first played, then saw policeman.",
        },
      },
      {
        qid: "cathhigh2-q32",
        blankLabel: "(32)",
        question: "He immediately (32) __________ them from playing.",
        answer: "stopped",
        solution: {
          method: "Vocabulary: the policeman's action — preventing them from continuing.",
          steps: [
            "The policeman saw them breaking rules → 'immediately ______ them from playing'.",
            "'stopped them from playing' = prevented them from continuing → CORRECT.",
            "Past tense needed (narrative in past).",
            "Answer: stopped.",
          ],
          tip: "'Stop someone from doing something' = prevent them. 'The policeman stopped them from playing.' Standard expression.",
        },
      },
      {
        qid: "cathhigh2-q33",
        blankLabel: "(33)",
        question: "The policeman pointed to the (33) __________ and told them sternly.",
        answer: "sign",
        solution: {
          method: "Vocabulary/context: the passage mentions a 'No Ball Games' sign — policeman points to it.",
          steps: [
            "Earlier in the passage: 'they saw the \"No Ball Games\" SIGN, they ignored it.'",
            "The policeman pointed to that sign to show them the rule.",
            "Answer: sign.",
          ],
          tip: "The 'No Ball Games' sign was mentioned at the start. The policeman pointed to the SIGN to emphasise the rule they ignored.",
        },
      },
      {
        qid: "cathhigh2-q34",
        blankLabel: "(34)",
        question: "He told them they were not (34) __________ to play ball games there.",
        answer: "allowed",
        solution: {
          method: "Vocabulary: they are not permitted to play ball games there.",
          steps: [
            "'Not ______ to play' = not permitted/not having permission.",
            "'allowed' = permitted, having permission → 'not allowed to play'. CORRECT.",
            "Answer: allowed.",
          ],
          tip: "'Not allowed to' = not permitted to = must not. 'You are not allowed to play ball games here' = the sign says so and it is prohibited.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION H — Comprehension Selected Response + OE
  //  (Q35–Q42, 8 marks)
  //  Passage: Sue Lin and Snowy (the Missing Dog)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secH",
    topic: "ComprehensionMCQ",
    marks: 8,
    passageTitle: "Sue Lin and Snowy",
    passageText:
      "Sue Lin was alone in her bedroom. She muttered to herself, 'Where are you, Snowy?' Her mother came in and sat beside her. She stroked her head and consoled her. 'Don't worry, sweetheart. We will find it,' Sue Lin's mother said.\n\nEvery day, Snowy would be waiting at the door for Sue Lin to come home from school. It would greet her by wagging its tail. After Sue Lin finished her homework, Snowy would be all ready to play with her. Snowy seemed to know when Sue Lin felt upset. It would simply sit quietly on her lap. Being the only child, Sue Lin had no sibling to keep her company. Snowy was everything to her. Sue Lin loved her pet dog with all her heart.\n\nOne day, Sue Lin came home and realised Snowy was not there at the door. She felt that something was amiss. She found out from her mother that her grandmother had left the door open when she went out to water the plants along the corridor. Snowy had run out of the house on its own and her grandmother had not noticed that.\n\nThe family put up notices about the missing dog around the neighbourhood. Sue Lin prayed that Snowy was fine and would return home soon.",
    questions: [
      {
        qid: "cathhigh2-q35",
        question:
          "Where was Sue Lin when her mother approached her? [1 mark]",
        answer: "Sue Lin was in her bedroom.",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'Sue Lin was alone in her BEDROOM.'",
            "Answer: Sue Lin was in her bedroom.",
          ],
          tip: "Location question → find the exact place mentioned. 'Alone in her bedroom' = the bedroom.",
        },
      },
      {
        qid: "cathhigh2-q36",
        question:
          "Which word in the sentence below has the same meaning as 'comforted'? Circle either (A) or (B). [1 mark]\n\n'She stroked her head and consoled her.'\n           (A)                    (B)",
        options: ["(A) stroked", "(B) consoled"],
        answer: "B",
        solution: {
          method: "Vocabulary synonym: 'comforted' = made someone feel better in distress.",
          steps: [
            "'Comforted' = made someone feel better when sad.",
            "(A) 'stroked' = gently rubbed → physical action, not emotional support.",
            "(B) 'consoled' = gave comfort to someone in distress → SYNONYM of comforted. CORRECT.",
            "Answer: (B) consoled.",
          ],
          tip: "Console = comfort someone who is sad or upset. 'Console' and 'comfort' are synonyms — both mean to ease someone's distress.",
        },
      },
      {
        qid: "cathhigh2-q37",
        question:
          "Tick your chosen answer: The word 'her' in line 7 refers to __________. [1 mark]\n☐ Snowy\n☐ Sue Lin\n☐ Sue Lin's mother",
        options: ["Snowy", "Sue Lin", "Sue Lin's mother"],
        answer: "Sue Lin",
        solution: {
          method: "Pronoun reference: trace 'her' in line 7.",
          steps: [
            "Line 7 (paragraph 2): 'It would simply sit quietly on HER lap.'",
            "'It' = Snowy (the dog). 'Her lap' = whose lap?",
            "The dog sits on SUE LIN'S lap (she is the owner being kept company).",
            "Answer: Sue Lin.",
          ],
          tip: "Pronoun reference: Snowy (it) sits on HER (Sue Lin's) lap. The dog belongs to Sue Lin and sits with her.",
        },
      },
      {
        qid: "cathhigh2-q38",
        question:
          "TRUE or FALSE: Sue Lin had a sister. [1 mark]",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'Being the ONLY CHILD, Sue Lin had NO SIBLING to keep her company.'",
            "No sibling = no sister. Statement says she had a sister → FALSE.",
            "Answer: False.",
          ],
          tip: "'Only child' = no siblings (no brothers or sisters). Sue Lin had NO sister.",
        },
      },
      {
        qid: "cathhigh2-q39",
        question:
          "TRUE or FALSE: Sue Lin would play with Snowy after finishing her homework. [1 mark]",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'After Sue Lin FINISHED HER HOMEWORK, Snowy would be all ready to PLAY WITH HER.'",
            "Statement matches the text exactly → TRUE.",
            "Answer: True.",
          ],
          tip: "Direct match: 'after finishing homework → play with Snowy'. The passage confirms this routine.",
        },
      },
      {
        qid: "cathhigh2-q40",
        question:
          "TRUE or FALSE: When Sue Lin felt upset, Snowy would cheer her up by wagging its tail. [1 mark]",
        answer: "False",
        solution: {
          method: "Literal comprehension: what Snowy does when Sue Lin is upset.",
          steps: [
            "Paragraph 2: 'Snowy seemed to know when Sue Lin felt upset. It would simply SIT QUIETLY ON HER LAP.'",
            "Statement: 'cheer her up by WAGGING ITS TAIL' → WRONG. Snowy wagged its tail as a GREETING, not when Sue Lin was upset.",
            "When upset, Snowy sits quietly on her lap.",
            "Answer: False.",
          ],
          tip: "Careful distinction: wagging tail = greeting when coming home from school. When UPSET: Snowy sits quietly on her lap. The statement confuses these two behaviours.",
        },
      },
      {
        qid: "cathhigh2-q41",
        question:
          "Write 1, 2 and 3 in the blanks to indicate the order of events. [1 mark]\n___ Sue Lin came home.\n___ Sue Lin's mother told her that Snowy was missing.\n___ Sue Lin's grandmother went out to water the plants.",
        answer:
          "Sue Lin came home: 2\nSue Lin's mother told her that Snowy was missing: 3\nSue Lin's grandmother went out to water the plants: 1",
        solution: {
          method: "Sequence comprehension: paragraph 3.",
          steps: [
            "Event sequence in paragraph 3:",
            "1st: 'her grandmother had LEFT THE DOOR OPEN when she went out to WATER THE PLANTS' → grandmother watered plants (1).",
            "2nd: 'Sue Lin CAME HOME and realised Snowy was not there' (2).",
            "3rd: 'She FOUND OUT FROM HER MOTHER' about what happened (3).",
            "Order: Grandmother watered plants (1) → Sue Lin came home (2) → Mother told her (3).",
          ],
          tip: "The grandmother's action happened BEFORE Sue Lin came home (she left door open while watering plants, which is why Snowy escaped before Sue Lin arrived).",
        },
      },
      {
        qid: "cathhigh2-q42",
        question:
          "What did Sue Lin's family do to find Snowy? [1 mark]",
        answer: "Sue Lin's family put up notices about the missing dog around the neighbourhood.",
        solution: {
          method: "Literal comprehension: paragraph 4.",
          steps: [
            "Paragraph 4: 'The family PUT UP NOTICES about the missing dog around the neighbourhood.'",
            "Answer: They put up notices about the missing dog around the neighbourhood.",
          ],
          tip: "The answer is directly in paragraph 4. 'Put up notices' = posted notices/flyers to inform neighbours about missing Snowy.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION I — Comprehension Open-ended  (Q43–Q46, 8 marks)
  //  Passage: The Foolish Lion and the Clever Rabbit
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh2-secI",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "The Foolish Lion and the Clever Rabbit (adapted from http://www.tell-a-tale.com)",
    passageText:
      "Once upon a time, there lived a fierce lion. All the jungle animals were scared of him. He was the king of the jungle. Being greedy, he hunted and killed many animals even when he was not hungry. Therefore, the animals constantly lived in fear as they knew that all of them would eventually be killed.\n\nOne day, a rabbit came up with a plan as she did not want to be eaten by the lion. She wanted to get rid of him. The rabbit pretended to rush into the lion's den, waking up the sleeping lion. The lion hollered and threatened to kill her.\n\nThe rabbit remained calm and said, 'Your Majesty, hear me out before you kill me. Six of us were coming to pay our respects to you today. On our way, another lion stopped us and claimed to be the new king of the jungle. He ate up my brothers. I escaped to tell you this.'\n\nThe lion was furious. He could not believe that another animal could be far superior to him. Immediately, he demanded that the rabbit take him to his enemy's den so that he could kill him. The rabbit led the lion to a deep well filled with water. The lion looked into the well and roared when he saw his reflection. He jumped into the well and drowned.\n\nAll the animals were very happy to learn that the witty little rabbit had tricked the lion. They were glad that the lion had been killed and celebrated all day long.",
    questions: [
      {
        qid: "cathhigh2-q43",
        question:
          "Why were the jungle animals scared of the lion? [2 marks]",
        answer:
          "The jungle animals were scared of the lion because he was greedy and hunted and killed many animals even when he was not hungry.",
        solution: {
          method: "Inferential/literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'Being greedy, he hunted and killed many animals even when he was not hungry.'",
            "'the animals constantly lived in fear as they knew that all of them would eventually be killed.'",
            "Reason: He killed animals even when not hungry → all animals feared they would eventually be killed.",
            "Write as a complete cause-effect sentence.",
          ],
          tip: "2-mark answer: include BOTH the cause (he hunted/killed even when not hungry) and the feared consequence (they would all eventually be killed).",
        },
      },
      {
        qid: "cathhigh2-q44",
        question:
          "Which word in paragraph two has the same meaning as 'shouted'?",
        answer: "hollered",
        solution: {
          method: "Vocabulary synonym: find the word for 'shouted' in paragraph 2.",
          steps: [
            "Paragraph 2: 'The lion HOLLERED and threatened to kill her.'",
            "'Hollered' = shouted loudly → SYNONYM of shouted. CORRECT.",
            "Answer: hollered.",
          ],
          tip: "'Holler' = shout loudly, usually in anger or to get attention. Southern American English word; used in literature for dramatic effect.",
        },
      },
      {
        qid: "cathhigh2-q45",
        question:
          "What does 'I' (line 10) refer to?",
        answer: "It refers to the rabbit.",
        solution: {
          method: "Pronoun reference: who is speaking in the quoted dialogue at line 10?",
          steps: [
            "Line 10 (paragraph 3): '\"…I escaped to tell you this.\"' — the rabbit is speaking to the lion.",
            "The rabbit says 'I' → 'I' refers to THE RABBIT.",
            "Answer: It refers to the rabbit.",
          ],
          tip: "In dialogue, 'I' always refers to the speaker. The rabbit is speaking this line, so 'I' = the rabbit.",
        },
      },
      {
        qid: "cathhigh2-q46",
        question:
          "Why did the lion jump into the well? [2 marks]",
        answer:
          "The lion thought that there was another lion in the well, and he wanted to kill it.",
        solution: {
          method: "Literal/inferential comprehension: paragraph 4.",
          steps: [
            "Paragraph 4: 'The lion looked into the well and ROARED when he saw HIS REFLECTION.'",
            "The lion saw his own reflection → thought it was ANOTHER lion (his enemy).",
            "He jumped in to kill his supposed enemy.",
            "Answer: The lion thought there was another lion in the well and wanted to kill it.",
          ],
          tip: "The lion's foolishness: he mistook his OWN REFLECTION for an enemy lion. The rabbit cleverly led him to the well knowing he would do this.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const cathhigh2023Paper2 = { meta, questions };
export default cathhigh2023Paper2;
