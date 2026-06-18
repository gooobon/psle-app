// ============================================================
// Maha Bodhi School — 2024 Weighted Assessment 2 (WA2)
// English Language Review (2), Primary Three
// Total: 30 marks, Duration: 50 min
// Sections: A Grammar MCQ (6) | B Vocabulary MCQ (5) | C Punctuation (2)
//           D Grammar Cloze (4) | E Vocabulary Cloze (5) | F Comprehension OE (8)
// ============================================================

import type {
  TopicType,
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Maha Bodhi School",
  level: "Primary 3",
  subject: "English Language Review (2)",
  term: "WA2",
  year: 2024,
  totalMarks: 30,
  timeMinutes: 50,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Grammar MCQ  (Q1–Q6, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mahab2024-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Sarah __________ chicken rice last night.",
    options: ["(1) ate", "(2) eat", "(3) eats", "(4) eating"],
    answer: "1",
    solution: {
      method: "Past tense: 'last night' signals simple past.",
      steps: [
        "'last night' → definite past time → SIMPLE PAST.",
        "eat → irregular past: ATE.",
        "(1) ate → CORRECT.",
        "(2) eat → base form → WRONG.",
        "(3) eats → present singular → WRONG.",
        "(4) eating → participle → needs auxiliary → WRONG alone.",
        "Answer: (1) ate.",
      ],
      tip: "Irregular verb: eat → ate (past). 'Last night' always triggers simple past.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Please share __________ information about Chek Jawa Wetlands with me as I will be going there next week.",
    options: ["(1) a", "(2) an", "(3) much", "(4) some"],
    answer: "4",
    solution: {
      method: "Quantifier: 'information' is uncountable; polite request → 'some'.",
      steps: [
        "'information' = uncountable noun.",
        "'a/an' → only with singular countable nouns → WRONG.",
        "'much' → used in questions/negatives, rarely in positive requests.",
        "'some' → used in positive requests with uncountable nouns → CORRECT.",
        "Answer: (4) some.",
      ],
      tip: "'Some information' is standard in polite requests. 'Some' works with both countable plural and uncountable nouns.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"__________ we play outside after we finish our homework?" Jonathan asked politely.',
    options: ["(1) Will", "(2) Must", "(3) Could", "(4) Would"],
    answer: "3",
    solution: {
      method: "Modal verb for polite request/permission: 'Could we…?' is more polite.",
      steps: [
        "Context: Jonathan is asking POLITELY for PERMISSION to play outside.",
        "'Could we play…?' = polite request for permission → CORRECT.",
        "'Will we play?' = future statement/less polite request.",
        "'Must we play?' = obligation → WRONG (they want to play, not must).",
        "'Would we play?' = not standard for a permission request.",
        "Answer: (3) Could.",
      ],
      tip: "Polite requests: Could we…? / May we…? / Can we…? 'Could' is the most formal and polite for permission-seeking.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question: "There __________ five children playing at the playground now.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "2",
    solution: {
      method: "Subject-verb agreement with 'there is/are': 'five children' is plural, 'now' is present.",
      steps: [
        "'now' → present tense.",
        "Subject: 'five children' → PLURAL.",
        "'There are' + plural subject → CORRECT.",
        "(1) is → singular → WRONG.",
        "(3) was / (4) were → past → WRONG ('now' = present).",
        "Answer: (2) are.",
      ],
      tip: "There is + singular. There are + plural. 'There ARE five children' because 'five' is plural.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question: '"The toy belongs to me. It\'s __________," Tom replied.',
    options: ["(1) hers", "(2) ours", "(3) mine", "(4) yours"],
    answer: "3",
    solution: {
      method: "Possessive pronoun: Tom says the toy belongs to HIM → mine.",
      steps: [
        "'The toy belongs to ME' → Tom is speaking about HIS OWN toy.",
        "'mine' = belonging to me (first person possessive pronoun). CORRECT.",
        "'hers' → female → WRONG (Tom is male).",
        "'ours' → includes speaker + others → WRONG (only Tom).",
        "'yours' → second person → WRONG (Tom speaks in first person).",
        "Answer: (3) mine.",
      ],
      tip: "Possessive pronouns: mine (I/me), yours (you), his (he), hers (she), ours (we), theirs (they). Tom = he → mine (because he says 'me').",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Sally was studying for the test __________ her brother played in the next room.",
    options: [
      "(1) while",
      "(2) unless",
      "(3) because",
      "(4) however",
    ],
    answer: "1",
    solution: {
      method: "Conjunction of simultaneity: two actions happening at the same time.",
      steps: [
        "Two simultaneous actions: Sally studying AND brother playing.",
        "'while' = during the same time as → CORRECT for simultaneous actions.",
        "'unless' = if not → conditional → WRONG.",
        "'because' = reason → WRONG (brother playing is not the reason for studying).",
        "'however' = conjunctive adverb, not conjunction → WRONG here.",
        "Answer: (1) while.",
      ],
      tip: "'While' = at the same time as. 'Sally was studying WHILE her brother played' = both actions happened simultaneously.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Vocabulary MCQ  (Q7–Q11, 5 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mahab2024-q7",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The pupils were __________ in the classroom as the door was jammed.",
    options: [
      "(1) captured",
      "(2) stopped",
      "(3) trapped",
      "(4) closed",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: the result of being unable to leave a room with a jammed door.",
      steps: [
        "Door was JAMMED → they could not get out → they were caught inside.",
        "'trapped' = unable to escape from a place/situation → CORRECT.",
        "'captured' = caught by an enemy/captor → WRONG (no captor involved).",
        "'stopped' = halted → not the same as being unable to leave.",
        "'closed' = shut → describes the door, not the pupils.",
        "Answer: (3) trapped.",
      ],
      tip: "'Trapped' = stuck inside, unable to escape. 'The pupils were trapped' = they couldn't get out because the door was jammed.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q8",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The children were shocked when they came across a __________ tree in the jungle that blocked their path.",
    options: ["(1) long", "(2) vast", "(3) gigantic", "(4) immense"],
    answer: "3",
    solution: {
      method: "Vocabulary: the size of a tree that shocks children and blocks their path.",
      steps: [
        "The tree BLOCKED their path AND SHOCKED them → it was extremely large.",
        "'gigantic' = extremely large (used for solid objects like trees) → CORRECT.",
        "'long' = extended in length → used for distances, not typically for trees that block paths.",
        "'vast' = very large (usually area: vast plains, vast ocean) → less natural for a single tree.",
        "'immense' = extremely large → possible but 'gigantic' is more commonly used for a single impressive tree.",
        "Answer: (3) gigantic.",
      ],
      tip: "'Gigantic' = very large (like a giant). Best for describing a single impressive object like a tree. 'Vast' is for areas; 'immense' is more abstract.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q9",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "During art class, we practised drawing different __________. Sally commented, 'It's really hard to draw the circles!'",
    options: [
      "(1) sizes",
      "(2) shapes",
      "(3) conditions",
      "(4) appearances",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: what do art students practise drawing? Context clue: circles.",
      steps: [
        "Clue: 'It's hard to draw the CIRCLES' → circles are a SHAPE.",
        "They practised drawing different SHAPES → circles, squares, triangles etc.",
        "'shapes' → CORRECT. Art class vocabulary.",
        "'sizes' → different sizes? But 'draw the circles' suggests shapes, not just sizes.",
        "'conditions' → completely irrelevant.",
        "Answer: (2) shapes.",
      ],
      tip: "Circles are shapes. Art class = drawing different shapes. The clue 'draw the circles' confirms SHAPES.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The young girl held her mother's hand __________ as they crossed the road.",
    options: ["(1) tightly", "(2) deeply", "(3) closely", "(4) strongly"],
    answer: "1",
    solution: {
      method: "Vocabulary adverb: how you hold someone's hand when crossing the road safely.",
      steps: [
        "Crossing the road = danger → hold hand FIRMLY/TIGHTLY for safety.",
        "'tightly' = firmly, with a strong grip → CORRECT for holding a hand.",
        "'deeply' = to a great depth → used for breathing, feelings; not for holding hands.",
        "'closely' = at close distance or with attention → not the right collocate for 'held hand'.",
        "'strongly' = with force → possible but 'tightly' is the standard collocate for 'hold hand'.",
        "Answer: (1) tightly.",
      ],
      tip: "Fixed collocation: 'held tightly' = gripped firmly. Safety context confirms 'tightly' — you hold someone's hand TIGHTLY when crossing a road.",
    },
  },

  {
    kind: "A",
    id: "mahab2024-q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The pupils were __________ as they listened to the tour guide who showed them interesting sea creatures around Chek Jawa Wetlands.",
    options: [
      "(1) heads up",
      "(2) stand by",
      "(3) all ears",
      "(4) in tune",
    ],
    answer: "3",
    solution: {
      method: "Idiom: expression for listening very attentively.",
      steps: [
        "Context: pupils listening ATTENTIVELY to tour guide showing interesting things.",
        "'all ears' = listening very attentively, fully engaged → CORRECT.",
        "'heads up' = warning/alert → WRONG.",
        "'stand by' = wait / be ready → WRONG.",
        "'in tune' = in agreement / in harmony → WRONG for listening attentively.",
        "Answer: (3) all ears.",
      ],
      tip: "'All ears' = listening very attentively. 'I'm all ears' = I'm ready to listen carefully. Perfect for pupils eagerly listening to a tour guide.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Punctuation  (Q12–Q13, 2 marks)
  //  Passage: Thumbelina (adapted from Christian Hans Anderson)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2024-secC",
    topic: "GrammarCloze",
    marks: 2,
    passageTitle: "Thumbelina (adapted from Thumbelina by Christian Hans Andersen)",
    passageText:
      "Thumbelina saw a beautiful butterfly in the garden.\n\n'Look, a butterfly! It's so colorful!' she shouted excitedly. Thumbelina smiled as she (12) __________ 'Let's follow it!'\n\nThey tiptoed and moved quietly behind it (13) __________ try not to scare it away.",
    questions: [
      {
        qid: "mahab2024-q12",
        blankLabel: "(12)",
        question:
          "Thumbelina smiled as she (12) __________ 'Let's follow it!'\n(1) said,  (2) said  (3) Said,  (4) Said!",
        options: ["(1) said,", "(2) said", "(3) Said,", "(4) Said!"],
        answer: "1",
        solution: {
          method: "Punctuation: reporting verb before direct speech needs a comma; 'said' is lowercase.",
          steps: [
            "'Thumbelina smiled as she ______ \"Let's follow it!\"'",
            "The reporting verb 'said' introduces direct speech → needs COMMA after it.",
            "It's in the MIDDLE of a sentence (not at the start) → lowercase 's'.",
            "(1) said, → lowercase + comma → CORRECT.",
            "(3) Said, → uppercase wrong (not at sentence start).",
            "(2) said → missing comma before direct speech.",
            "Answer: (1) said,",
          ],
          tip: "When the reporting verb comes before direct speech: [said,] 'Direct speech'. Comma + lowercase (unless start of sentence).",
        },
      },
      {
        qid: "mahab2024-q13",
        blankLabel: "(13)",
        question:
          "They tiptoed and moved quietly behind it (13) __________ try not to scare it away.\n(1) .They  (2) ?They  (3) :They  (4) ,they",
        options: ["(1) .They", "(2) ?They", "(3) :They", "(4) ,they"],
        answer: "4",
        solution: {
          method: "Punctuation: comma connecting two clauses in the same sentence.",
          steps: [
            "Structure: 'They tiptoed and moved quietly behind it, [so as] to try not to scare it away.'",
            "This is ONE continuing sentence → no full stop (eliminates (1)).",
            "No question/colon fits → eliminates (2) and (3).",
            "(4) ,they → comma + lowercase 'they' = continues the sentence. CORRECT.",
            "Answer: (4) ,they.",
          ],
          tip: "A comma links two parts of ONE sentence. After a comma, don't capitalise (unless proper noun). 'They moved quietly, they tried not to scare it' — comma connects.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Grammar Cloze (Verb Tenses)  (Q14–Q17, 4 marks)
  //  Passage: Snow White and the Seven Dwarves
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2024-secD",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Snow White and the Seven Dwarves (adapted from Brothers Grimm)",
    passageText:
      "Snow White and the seven dwarves sat down at the table to have dinner. They (14) __________ their dinner at seven o'clock in the evening. They (15) __________ their dinner when Snow White asked them, 'What do you think about this spaghetti? I spent two hours preparing it!'\n\n'This is amazing! I love to (16) __________ spaghetti!' Dopey replied.\n\nSneezy laughed, 'Look at Bashful! He is clapping his hands as he (17) __________!'\n\nThey enjoyed their dinner that night.",
    wordBank: {
      ate: "ate",
      eat: "eat",
      eats: "eats",
      eating: "eating",
      "was eating": "was eating",
      "were eating": "were eating",
    },
    questions: [
      {
        qid: "mahab2024-q14",
        blankLabel: "(14)",
        question: "They (14) __________ their dinner at seven o'clock in the evening.",
        answer: "ate",
        solution: {
          method: "Simple past: 'at seven o'clock' = specific past time.",
          steps: [
            "'at seven o'clock' → specific past time → SIMPLE PAST.",
            "eat → ATE (irregular past). CORRECT.",
            "Answer: ate.",
          ],
          tip: "Specific time in past (at 7 o'clock, last night, yesterday) → simple past. Eat → ate.",
        },
      },
      {
        qid: "mahab2024-q15",
        blankLabel: "(15)",
        question: "They (15) __________ their dinner when Snow White asked them.",
        answer: "were eating",
        solution: {
          method: "Past continuous: action in progress WHEN Snow White asked.",
          steps: [
            "'when Snow White asked' → past moment that interrupted an ongoing action.",
            "They were in the middle of eating WHEN she asked → PAST CONTINUOUS.",
            "Subject: 'They' (plural) → were eating.",
            "Answer: were eating.",
          ],
          tip: "Past continuous (were eating) = ongoing action. Simple past (asked) = interrupting event. 'They were eating WHEN Snow White asked.'",
        },
      },
      {
        qid: "mahab2024-q16",
        blankLabel: "(16)",
        question: "'I love to (16) __________ spaghetti!' Dopey replied.",
        answer: "eat",
        solution: {
          method: "Base form after 'to' (infinitive).",
          steps: [
            "'love to ______' → after 'to', use BASE FORM.",
            "eat → base form. CORRECT.",
            "Answer: eat.",
          ],
          tip: "After 'to' (infinitive): always base form. Love to eat, love to play, love to sing.",
        },
      },
      {
        qid: "mahab2024-q17",
        blankLabel: "(17)",
        question: "'He is clapping his hands as he (17) __________!'",
        answer: "eats",
        solution: {
          method: "Present simple: habitual/characteristic action (he claps as he eats = his habit).",
          steps: [
            "'he (17) ______' → subject is 'he' (third person singular).",
            "The sentence describes what Bashful is currently doing (eating) as he claps.",
            "The 'as he ___' clause could be present simple for a habit/characteristic → eats.",
            "Bashful IS eating (right now) → 'is eating' or habitual 'eats'. Since the word bank has 'eats', that's the answer.",
            "Answer: eats.",
          ],
          tip: "'He eats' = third person singular present. 'He is clapping as he eats' = he habitually claps when eating.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Vocabulary Cloze  (Q18–Q22, 5 marks)
  //  Passage: Emily at Gardens by the Bay (Venus Flytrap)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2024-secE",
    topic: "VocabCloze",
    marks: 5,
    passageTitle: "A Visit to Gardens by the Bay",
    passageText:
      "Last weekend, Emily visited Gardens by the Bay with her family. As they walked through the beautiful Flower Dome, she saw many colourful plants from all over the world.\n\nOne of the (18) __________ plants that she saw was the Venus Flytrap. Emily was (19) __________ by the plant as it could eat insects! She learned that the plant catches its (20) __________ by snapping its leaves shut. The pitcher plant was also very unusual due to its big and colourful leaf that (21) __________ insects to go inside.\n\nEmily and her family spent a long time exploring and learning about how these plants (22) __________ in places where there are not a lot of nutrients. It was a fun day for Emily. She learnt a lot about unusual plants that day.",
    wordBank: {
      amazed: "amazed",
      attracts: "attracts",
      catch: "catch",
      digest: "digest",
      interesting: "interesting",
      land: "land",
      prey: "prey",
      survive: "survive",
    },
    questions: [
      {
        qid: "mahab2024-q18",
        blankLabel: "(18)",
        question: "One of the (18) __________ plants that she saw was the Venus Flytrap.",
        answer: "interesting",
        solution: {
          method: "Vocabulary: describe a plant that 'was' notable (can eat insects).",
          steps: [
            "A plant that eats insects is unusual and notable.",
            "'interesting' = holding attention, noteworthy → CORRECT.",
            "Answer: interesting.",
          ],
          tip: "'Interesting plants' = plants that caught attention. The Venus Flytrap eating insects makes it interesting.",
        },
      },
      {
        qid: "mahab2024-q19",
        blankLabel: "(19)",
        question: "Emily was (19) __________ by the plant as it could eat insects!",
        answer: "amazed",
        solution: {
          method: "Vocabulary: emotion felt when seeing a plant that eats insects.",
          steps: [
            "A plant that eats insects is surprising and astonishing.",
            "'amazed' = feeling great surprise and wonder → CORRECT.",
            "'by the plant' → passive construction: Emily was amazed BY the plant.",
            "Answer: amazed.",
          ],
          tip: "'Amazed by' = filled with wonder/astonishment by something. A plant that eats insects = amazing!",
        },
      },
      {
        qid: "mahab2024-q20",
        blankLabel: "(20)",
        question: "She learned that the plant catches its (20) __________ by snapping its leaves shut.",
        answer: "prey",
        solution: {
          method: "Vocabulary: what a carnivorous plant catches.",
          steps: [
            "The plant CATCHES something by snapping its leaves → insects/animals it eats.",
            "'prey' = animals hunted/caught as food → CORRECT for a carnivorous plant.",
            "'catch' → verb, not a noun fitting 'its __' → WRONG.",
            "Answer: prey.",
          ],
          tip: "'Prey' = the animal (or insect) that a predator hunts. Venus Flytrap's prey = insects.",
        },
      },
      {
        qid: "mahab2024-q21",
        blankLabel: "(21)",
        question: "The pitcher plant was also very unusual due to its big and colourful leaf that (21) __________ insects to go inside.",
        answer: "attracts",
        solution: {
          method: "Vocabulary: how the pitcher plant's colourful leaf functions.",
          steps: [
            "A big, colourful leaf → insects are drawn to it → the leaf ATTRACTS insects.",
            "'attracts' = draws attention of; lures → CORRECT.",
            "'land' → insects land ON the leaf, but 'attracts to go inside' is more specific.",
            "Answer: attracts.",
          ],
          tip: "'Attracts insects to go inside' = the leaf's colour/size lures insects into the pitcher. 'Attract' = draw towards.",
        },
      },
      {
        qid: "mahab2024-q22",
        blankLabel: "(22)",
        question: "…how these plants (22) __________ in places where there are not a lot of nutrients.",
        answer: "survive",
        solution: {
          method: "Vocabulary: how plants manage in nutrient-poor places.",
          steps: [
            "Not a lot of nutrients → difficult growing conditions.",
            "These carnivorous plants EAT insects TO SURVIVE where nutrients are scarce.",
            "'survive' = continue to live despite difficult conditions → CORRECT.",
            "'digest' → digesting is what they do to food, not how they survive in places.",
            "Answer: survive.",
          ],
          tip: "Carnivorous plants 'survive' in nutrient-poor environments by eating insects (getting nutrients from prey). 'Survive in' = continue to live in (difficult conditions).",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Comprehension Open-Ended  (Q23–Q29, 8 marks)
  //  Passage: Ollie, the Ball and the Shoe
  //  Adapted from "The Shoe That Flew" by Andrea Kaczmarek
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mahab2024-secF",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "Ollie and the Flying Shoe (adapted from 'The Shoe That Flew' by Andrea Kaczmarek)",
    passageText:
      "It was a warm and sunny Sunday morning. Ollie was having fun playing in the garden with his sister. He was running and bouncing the ball. He kicked it around the garden.\n\n'Watch me!' Ollie laughed as he gave the ball a mighty kick. Ollie's mother and sister watched in shock as the force sent the ball and his shoe flying as high as they could be.\n\n'Oh no!' Ollie cried as the ball and shoe flew over the garden walls and landed in the neighbour's garden.\n\nOllie and his sister ran over to the neighbour's gate. They saw the neighbour's dog playing with the ball. The shoe was beside the dog. When the dog saw them, it started barking fiercely at them. Ollie and his sister quickly stepped backwards. They wondered what to do next. They knew Mr Hays, their neighbour, was a stern man and might not like them to be near his garden.\n\nJust then, Mrs Hays who had heard the dog's barking, came out of the house. She smiled at Ollie and her sister as she picked up the ball and shoe, and returned it to them.\n\n'Thank you, Mrs Hays! I will be careful when I play next time!' Ollie said gratefully.\n\n'You're welcome, Ollie. Just be sure to play safely,' Mrs Hays replied gently.",
    questions: [
      {
        qid: "mahab2024-q23",
        question: "What does 'it' in line 3 refer to? (1m)\n\"It\" refers to the __________.",
        answer: "ball",
        solution: {
          method: "Pronoun reference: line 3 'He kicked IT around the garden.'",
          steps: [
            "Line 3: 'He was running and bouncing the BALL. He kicked IT around the garden.'",
            "'it' refers back to the most recently mentioned object = the BALL.",
            "Answer: ball.",
          ],
          tip: "'It' refers to the last mentioned singular object. Line 2-3: bouncing the ball → kicked IT = kicked the ball.",
        },
      },
      {
        qid: "mahab2024-q24",
        question: "Which word in lines 4 to 6 has the same meaning as 'strong'? (1m)\nThe word is __________.",
        answer: "mighty",
        solution: {
          method: "Vocabulary synonym: find the word for 'strong' in lines 4-6.",
          steps: [
            "Lines 4-6: 'he gave the ball a MIGHTY kick'.",
            "'mighty' = very strong/powerful → SYNONYM of strong. CORRECT.",
            "Answer: 'mighty'.",
          ],
          tip: "Mighty = very powerful, strong. 'A mighty kick' = a very powerful kick. Word in quotation marks in answer key.",
        },
      },
      {
        qid: "mahab2024-q25",
        question:
          "TRUE or FALSE: Ollie and his sister were worried that the dog would play with their ball.",
        answer: "False",
        solution: {
          method: "Comprehension: what worried Ollie and his sister?",
          steps: [
            "Paragraph 4: 'When the dog saw them, it started BARKING FIERCELY at them. Ollie and his sister quickly stepped BACKWARDS.'",
            "They were worried about the dog BARKING FIERCELY at them, not about it playing with their ball.",
            "Statement: 'worried that the dog would play with their ball' → FALSE.",
            "Answer: False.",
          ],
          tip: "The children were scared of the BARKING dog, not worried about it playing with the ball. The ball concern was separate.",
        },
      },
      {
        qid: "mahab2024-q26",
        question:
          "TRUE or FALSE: Ollie and his sister did not know how to get the shoe and ball back.",
        answer: "True",
        solution: {
          method: "Comprehension: paragraph 4 states they were unsure what to do.",
          steps: [
            "Paragraph 4: 'They wondered WHAT TO DO NEXT.'",
            "They didn't know what to do → TRUE.",
            "Answer: True.",
          ],
          tip: "'Wondered what to do next' = didn't know what to do = didn't know how to get their things back.",
        },
      },
      {
        qid: "mahab2024-q27",
        question:
          "State if each sentence is True or False. Give a reason. (2 × 1m)\n(a) Ollie went over to the neighbour's gate by himself.\n(b) The children were afraid of the dog.",
        answer:
          "(a) False. Ollie and his sister ran over to the neighbour's gate together.\n(b) True. They quickly stepped backwards when the dog started barking fiercely at them.",
        solution: {
          method: "True/False with reason from the passage.",
          steps: [
            "(a) 'Ollie AND HIS SISTER ran over to the neighbour's gate.' → He did NOT go alone → FALSE. Reason: his sister went with him.",
            "(b) 'When the dog saw them, it started BARKING FIERCELY at them. Ollie and his sister QUICKLY STEPPED BACKWARDS.' → They were scared → TRUE. Reason: they stepped backwards when the dog barked.",
          ],
          tip: "(a) 'by himself' = alone. But passage says his SISTER went with him → False. (b) Stepping backwards = scared of the dog → True.",
        },
      },
      {
        qid: "mahab2024-q28",
        question:
          "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story. (1m)\n___ Ollie gave the ball a mighty kick.\n___ Ollie thanked his neighbour.\n___ Ollie stepped backwards.",
        answer:
          "Ollie gave the ball a mighty kick: 1\nOllie thanked his neighbour: 3\nOllie stepped backwards: 2",
        solution: {
          method: "Sequence comprehension.",
          steps: [
            "Paragraph 2: 'he gave the ball a MIGHTY KICK' → ORDER 1.",
            "Paragraph 4: 'Ollie and his sister QUICKLY STEPPED BACKWARDS' → ORDER 2.",
            "Paragraph 6: 'Thank you, Mrs Hays! … Ollie said GRATEFULLY' → ORDER 3.",
          ],
          tip: "Kick (para 2) → stepped backwards (para 4) → thanked neighbour (para 6). Follow paragraph order.",
        },
      },
      {
        qid: "mahab2024-q29",
        question:
          "Tick the best adjective to describe Mrs Hays. Mrs Hays was __________ towards the children. (1m)\n☐ stern  ☐ friendly  ☐ grateful",
        options: ["stern", "friendly", "grateful"],
        answer: "friendly",
        solution: {
          method: "Character description: what adjective describes Mrs Hays's behaviour?",
          steps: [
            "Mrs Hays: 'She SMILED at Ollie and her sister as she PICKED UP the ball and shoe, and RETURNED it to them.'",
            "She also said 'You're welcome, Ollie' → kind and friendly.",
            "'friendly' → warm, kind, approachable → CORRECT.",
            "'stern' → that described MR Hays, not Mrs Hays.",
            "'grateful' → the children were grateful, not Mrs Hays.",
            "Answer: friendly.",
          ],
          tip: "Mrs Hays smiled, helped them, and responded warmly = FRIENDLY. Don't confuse with Mr Hays (who was STERN).",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const mahab2024Paper = { meta, questions };
export default mahab2024Paper;
