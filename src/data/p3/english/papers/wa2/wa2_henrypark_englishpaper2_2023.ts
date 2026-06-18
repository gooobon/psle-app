// ============================================================
// Henry Park Primary School — 2023 Timed Practice Paper 2
// English Language Paper  (50 marks, 50 min)
// Part I:  A Vocabulary MCQ (6) | B Grammar MCQ (8)
// Part II: C Grammar Cloze conjunctions (4) | Verb tense cloze (4)
//          D Vocabulary Cloze FIB (5) | E Editing spelling (5)
//          F Synthesis (2) | G Comprehension 1 (8) | H Comprehension 2 (8)
// ============================================================

import type {
  TopicType,
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Henry Park Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "Timed Practice Paper 2",
  year: 2023,
  totalMarks: 50,
  timeMinutes: 50,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  PART I SECTION A — Vocabulary MCQ  (Q1–Q6, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "henrypark2-q1",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The __________ who snatched Mrs Lee's handbag disappeared before the policemen arrived at the scene.",
    options: [
      "(1) victim",
      "(2) culprit",
      "(3) witness",
      "(4) detective",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: identify who snatched the handbag.",
      steps: [
        "The blank refers to the person who COMMITTED the crime (snatched the handbag).",
        "'culprit' = the person responsible for a crime or wrongdoing. CORRECT.",
        "'victim' = the person harmed → Mrs Lee is the victim, not the blank.",
        "'witness' = someone who saw the event → they don't snatch.",
        "'detective' = person who investigates crimes → they don't snatch.",
        "Answer: (2) culprit.",
      ],
      tip: "Culprit = wrongdoer/offender. Victim = person harmed. Witness = person who observed. Detective = investigator. The person who snatched = culprit.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q2",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The thrifty man could not bear to spend so much money on that pair of leather shoes. He decided to buy a __________ pair of shoes.",
    options: ["(1) lower", "(2) better", "(3) cheaper", "(4) expensive"],
    answer: "3",
    solution: {
      method: "Vocabulary: thrifty man avoids spending too much → buys cheaper alternative.",
      steps: [
        "'Thrifty' = careful with money, avoiding waste → buys less expensive items.",
        "He couldn't bear to spend 'so much money' → he chose a CHEAPER option.",
        "(3) cheaper → costs less money → CORRECT.",
        "'lower' → 'a lower pair of shoes' → not standard collocation.",
        "'better' → contradicts his thrifty nature.",
        "'expensive' → opposite of what a thrifty man wants.",
        "Answer: (3) cheaper.",
      ],
      tip: "Thrifty = economical/frugal = prefers cheaper options. 'A cheaper pair of shoes' = one that costs less.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q3",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"I\'m sorry, I didn\'t mean to push you, Mr Tan. I\'ll help you pick up the books," Roy __________.',
    options: [
      "(1) hinted",
      "(2) reminded",
      "(3) apologised",
      "(4) questioned",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: Roy says 'I'm sorry' → he is apologising.",
      steps: [
        "Roy says 'I'm sorry, I didn't mean to…' → expressing apology.",
        "'apologised' = said sorry for a mistake. CORRECT.",
        "'hinted' = suggested indirectly → WRONG (Roy is direct).",
        "'reminded' = prompted someone to remember → WRONG.",
        "'questioned' = asked → WRONG.",
        "Answer: (3) apologised.",
      ],
      tip: "When someone says 'I'm sorry', the reporting verb is 'apologised'. The direct speech is an apology.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q4",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The children followed their parents' __________ to use the pedestrian crossing when they cross the road.",
    options: ["(1) report", "(2) advice", "(3) speech", "(4) answer"],
    answer: "2",
    solution: {
      method: "Vocabulary: guidance given by parents about road safety.",
      steps: [
        "Parents told children to use the pedestrian crossing → they gave guidance/recommendations.",
        "'advice' = recommendations or guidance on what to do. CORRECT.",
        "'report' = an account of events/findings → not guidance.",
        "'speech' = formal talk → not specific personal guidance.",
        "'answer' = a reply to a question → not guidance given.",
        "Answer: (2) advice.",
      ],
      tip: "'Advice' = guidance on what to do. 'Follow someone's advice' = do what they recommended. Note: 'advice' is uncountable (no plural).",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q5",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Sally showed off her __________ driving skills during the race and emerged as the champion.",
    options: [
      "(1) dull",
      "(2) messy",
      "(3) ordinary",
      "(4) impressive",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: the quality of skills that wins a race.",
      steps: [
        "'showed off' + skills + 'emerged as the champion' → she won → her skills were exceptional.",
        "'impressive' = causing admiration → CORRECT. Winning skills are impressive.",
        "'dull' = boring/uninteresting → WRONG (won the race).",
        "'messy' = untidy → WRONG.",
        "'ordinary' = nothing special → WRONG (she became champion).",
        "Answer: (4) impressive.",
      ],
      tip: "'Impressive skills' = skills that make others admire you. Champions show impressive skills. 'Showed off' also implies they were worth displaying.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q6",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My desk still feels sticky even after I have __________ off the sweetened drink that I had spilt this morning.",
    options: [
      "(1) wiped",
      "(2) dusted",
      "(3) rubbed",
      "(4) scratched",
    ],
    answer: "1",
    solution: {
      method: "Vocabulary: action to remove spilt liquid from a desk surface.",
      steps: [
        "A sweetened drink was SPILT → need to remove liquid from surface.",
        "'wiped off' = cleaned a surface by rubbing with a cloth to remove liquid. CORRECT.",
        "'dusted off' = removed dust (dry particles) → WRONG for liquid.",
        "'rubbed off' → possible but less natural for liquid cleaning.",
        "'scratched off' = scraped away → WRONG for liquid.",
        "Answer: (1) wiped.",
      ],
      tip: "'Wipe off' = clean a surface using a cloth/tissue, especially for liquid spills. 'Wipe off the drink' = clean it up. Fixed collocation.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  PART I SECTION B — Grammar MCQ  (Q7–Q14, 8 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "henrypark2-q7",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Nurul __________ to the swimming complex for swimming lessons every Sunday.",
    options: ["(1) go", "(2) goes", "(3) is going", "(4) was going"],
    answer: "2",
    solution: {
      method: "Subject-verb agreement + tense: 'every Sunday' = habitual present; 'Nurul' = singular.",
      steps: [
        "'every Sunday' → habitual action → SIMPLE PRESENT.",
        "Subject: 'Nurul' → third person singular (she).",
        "Third person singular + present simple → adds -s: GOES.",
        "(2) goes → CORRECT.",
        "(1) go → base form → WRONG for singular.",
        "(3) is going → continuous → WRONG for habit.",
        "Answer: (2) goes.",
      ],
      tip: "He/she/it + every [day/week] = goes/runs/eats (add -s). 'Nurul goes' every Sunday = her habit.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q8",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The postman had to deliver the mail the next day as nobody __________ at home that afternoon.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "3",
    solution: {
      method: "Subject-verb agreement + past tense: 'nobody' is singular; 'that afternoon' = past.",
      steps: [
        "'that afternoon' → past tense context.",
        "Subject: 'nobody' → singular (takes singular verb).",
        "Singular past tense of 'to be' = WAS.",
        "(3) was → CORRECT.",
        "'were' → plural → WRONG (nobody is singular).",
        "Answer: (3) was.",
      ],
      tip: "Nobody/someone/everyone/anybody = singular → was (past), is (present). 'Nobody was home' NOT 'nobody were home'.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q9",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Mrs Tan reminded her children to warm up the lunch by __________ before she left for work.",
    options: [
      "(1) himself",
      "(2) herself",
      "(3) yourselves",
      "(4) themselves",
    ],
    answer: "4",
    solution: {
      method: "Reflexive pronoun: children heating the lunch themselves.",
      steps: [
        "'reminded her children to warm up the lunch by ______'.",
        "The children do it BY themselves = on their own, without help.",
        "Subject of the action: 'her children' (plural, third person) → reflexive = THEMSELVES.",
        "(4) themselves → CORRECT.",
        "(3) yourselves → second person → WRONG (children, not 'you').",
        "Answer: (4) themselves.",
      ],
      tip: "Reflexive pronouns: myself, yourself, himself, herself, itself, THEMSELVES, ourselves, yourselves. 'By themselves' = on their own.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q10",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "There were __________ guests at Grandmother's 80th birthday party as she was well-loved by her friends and relatives.",
    options: [
      "(1) many",
      "(2) much",
      "(3) a few",
      "(4) a little",
    ],
    answer: "1",
    solution: {
      method: "Quantifier: 'guests' is countable plural; context shows large number.",
      steps: [
        "'guests' = countable plural noun.",
        "Context: grandmother is 'well-loved' → MANY people came.",
        "'many' → large number, countable plural. CORRECT.",
        "'much' → uncountable → WRONG.",
        "'a few' → small number → contradicts 'well-loved'.",
        "'a little' → uncountable → WRONG.",
        "Answer: (1) many.",
      ],
      tip: "Many = large number (countable). Much = large amount (uncountable). 'Many guests' (countable) vs 'much water' (uncountable).",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q11",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Look at __________ bears in the enclosure. Shall we go nearer to take some pictures of them?" Mother asked the children.',
    options: ["(1) this", "(2) that", "(3) these", "(4) those"],
    answer: "4",
    solution: {
      method: "Demonstrative pronoun: plural bears that are across the enclosure (far).",
      steps: [
        "Subject: 'bears' → PLURAL.",
        "Context: 'go nearer' → they are currently FAR AWAY.",
        "Plural + far = THOSE.",
        "(4) those → CORRECT.",
        "(3) these → plural + near → WRONG (would not need to 'go nearer').",
        "Answer: (4) those.",
      ],
      tip: "If you want to 'go nearer', the thing is currently FAR → those (plural). If it were close, you'd say 'these bears'.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q12",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Please speak softly. The children __________ at the moment," said Mrs Lim.',
    options: [
      "(1) slept",
      "(2) sleep",
      "(3) have slept",
      "(4) are sleeping",
    ],
    answer: "4",
    solution: {
      method: "Present continuous: 'at the moment' signals an ongoing action RIGHT NOW.",
      steps: [
        "'at the moment' → happening RIGHT NOW → PRESENT CONTINUOUS.",
        "(4) are sleeping → present continuous → CORRECT.",
        "(1) slept → past simple → WRONG.",
        "(2) sleep → present simple (habit) → WRONG ('at the moment' ≠ habit).",
        "(3) have slept → present perfect → completed, not ongoing.",
        "Answer: (4) are sleeping.",
      ],
      tip: "Time signals: at the moment / right now / currently → present continuous (is/are + -ing).",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q13",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Could you add __________ salt to this pot of soup?" asked Rachel, after taking a sip of the tasteless soup.',
    options: ["(1) a few", "(2) many", "(3) much", "(4) some"],
    answer: "4",
    solution: {
      method: "Quantifier: 'salt' is uncountable; polite request uses 'some'.",
      steps: [
        "'salt' = uncountable noun.",
        "Quantifiers for uncountable: much, some, a little, a lot of.",
        "'some' → used in polite requests ('Could you add some salt?') → CORRECT.",
        "'much' → technically valid but unusual in affirmative requests; 'some' is more natural.",
        "'a few' → countable → WRONG.",
        "'many' → countable → WRONG.",
        "Answer: (4) some.",
      ],
      tip: "In polite requests, 'some' is preferred: 'Could you add some salt/water/sugar?' 'Much' is more natural in questions/negatives.",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q14",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Sandy has been learning to play the piano __________ she was five years old.",
    options: ["(1) if", "(2) so", "(3) when", "(4) since"],
    answer: "4",
    solution: {
      method: "Conjunction + tense: 'has been learning' (present perfect continuous) + starting point → 'since'.",
      steps: [
        "'has been learning' → present perfect continuous → from a past point to now.",
        "'since' + a past point = from that time until now. CORRECT.",
        "'since she was five years old' = from the time she was five, continuing until now.",
        "'if' → conditional → WRONG.",
        "'when' → time point, but 'has been learning when' is not standard.",
        "Answer: (4) since.",
      ],
      tip: "Has/have been + -ing + 'since' [past point] = started then and continues now. 'Sandy has been learning since she was five' = she started at age 5 and still continues.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  PART II SECTION C — Grammar Cloze (Conjunctions + Verb Tenses)
  //  Q15–Q22, 8 marks total
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "henrypark2-secC1",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "A Day at East Coast Park (Conjunctions Cloze)",
    passageText:
      "During the holidays, Jane and her family went to East Coast Park. At the park, they cycled (15) __________ swam in the sea. (16) __________ it was time to go home, her father realised that the car key was missing while they were packing up. The family searched everywhere (17) __________ the key could not be found. They had to take a taxi home (18) __________ it was getting dark. The next day, her father found the key in one of the pockets of his pants.",
    wordBank: {
      and: "and",
      but: "but",
      if: "if",
      while: "while",
      although: "although",
      because: "because",
      when: "when",
      with: "with",
    },
    questions: [
      {
        qid: "henrypark2-q15",
        blankLabel: "(15)",
        question: "they cycled (15) __________ swam in the sea.",
        answer: "and",
        solution: {
          method: "Conjunction: two parallel actions joined.",
          steps: [
            "'cycled ______ swam' → two actions they did.",
            "'and' joins two parallel verbs: cycled AND swam. CORRECT.",
            "Answer: and.",
          ],
          tip: "'And' joins two similar/related things. 'Cycled and swam' = did both activities.",
        },
      },
      {
        qid: "henrypark2-q16",
        blankLabel: "(16)",
        question: "(16) __________ it was time to go home, her father realised that the car key was missing.",
        answer: "when",
        solution: {
          method: "Conjunction of time: action happened at the moment it was time to go.",
          steps: [
            "Father realised the key was missing AT the moment it was time to go.",
            "'when' = at the time that → CORRECT.",
            "'although' → contrast → WRONG.",
            "Answer: when.",
          ],
          tip: "'When' introduces a time clause: at that moment, the discovery happened.",
        },
      },
      {
        qid: "henrypark2-q17",
        blankLabel: "(17)",
        question: "The family searched everywhere (17) __________ the key could not be found.",
        answer: "but",
        solution: {
          method: "Conjunction of contrast: searched everywhere BUT still couldn't find it.",
          steps: [
            "Contrast: searched everywhere (effort) → key could not be found (failure).",
            "'but' → coordinating conjunction showing contrast. CORRECT.",
            "Answer: but.",
          ],
          tip: "'But' shows contrast or unexpected result: tried hard BUT failed.",
        },
      },
      {
        qid: "henrypark2-q18",
        blankLabel: "(18)",
        question: "They had to take a taxi home (18) __________ it was getting dark.",
        answer: "because",
        solution: {
          method: "Conjunction of reason: why did they take a taxi?",
          steps: [
            "Reason for taking taxi: it was getting dark (urgency/need).",
            "'because' = reason/cause. CORRECT.",
            "Answer: because.",
          ],
          tip: "'Because' introduces a reason. 'They took a taxi because it was dark' = the darkness is the reason.",
        },
      },
    ],
  },

  {
    kind: "B",
    id: "henrypark2-secC2",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Flying Kites (Verb Tense Cloze)",
    passageText:
      "It was a windy afternoon. Tom and his neighbour, Ali, decided that it was the perfect day to (19) __________ kites. They headed for the big field at the park. There were already people (20) __________ a few kites in the sky. Tom (21) __________ his kite so high that it almost reached the clouds! They were having so much fun. They did not realise three hours had gone by. 'Time (22) __________ when we are having fun!' exclaimed Tom. They made a promise that they would fly kites again the next weekend.",
    wordBank: {
      fly: "fly",
      flies: "flies",
      flew: "flew",
      "is flying": "is flying",
      flying: "flying",
      "have flown": "have flown",
    },
    questions: [
      {
        qid: "henrypark2-q19",
        blankLabel: "(19)",
        question: "decided that it was the perfect day to (19) __________ kites.",
        answer: "fly",
        solution: {
          method: "Infinitive after 'to': requires base form.",
          steps: [
            "'to ______ kites' → after 'to' (infinitive marker), use BASE FORM.",
            "'fly' → base form → CORRECT.",
            "Answer: fly.",
          ],
          tip: "After 'to', always use the base form: to fly, to go, to eat — never to flying or to flew.",
        },
      },
      {
        qid: "henrypark2-q20",
        blankLabel: "(20)",
        question: "There were already people (20) __________ a few kites in the sky.",
        answer: "flying",
        solution: {
          method: "Present participle after 'people': describes ongoing action.",
          steps: [
            "'people ______ kites' → the people are in the action of flying kites (at that moment).",
            "After 'people/someone/them + [activity verb]', use -ing form (present participle).",
            "'flying' → present participle → 'people flying kites'. CORRECT.",
            "Answer: flying.",
          ],
          tip: "'There were people flying kites' = people who were (in the process of) flying kites. -ing follows perception verbs or 'people doing'.",
        },
      },
      {
        qid: "henrypark2-q21",
        blankLabel: "(21)",
        question: "Tom (21) __________ his kite so high that it almost reached the clouds!",
        answer: "flew",
        solution: {
          method: "Past simple: narrative in past tense.",
          steps: [
            "The story is in past tense ('it was', 'they decided', 'headed').",
            "Tom's action: flew the kite → past simple of 'fly' = FLEW.",
            "fly → flew (irregular).",
            "Answer: flew.",
          ],
          tip: "Irregular verb: fly → flew (past simple). 'Tom flew his kite' = past action.",
        },
      },
      {
        qid: "henrypark2-q22",
        blankLabel: "(22)",
        question: "'Time (22) __________ when we are having fun!' exclaimed Tom.",
        answer: "flies",
        solution: {
          method: "Fixed idiom: 'Time flies' = time passes quickly. Third person singular present.",
          steps: [
            "Fixed English idiom: 'Time FLIES' = time passes quickly.",
            "Full saying: 'Time flies when you're having fun.'",
            "'flies' → third person singular of fly → CORRECT in this idiom.",
            "Answer: flies.",
          ],
          tip: "'Time flies (when you're having fun)' = fixed English idiom meaning time passes very quickly. 'Flies' is the present third-person form.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  PART II SECTION D — Vocabulary Cloze FIB  (Q23–Q27, 5 marks)
  //  Passage: Farewell for Mrs Tan
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "henrypark2-secD",
    topic: "ComprehensionFIB",
    marks: 5,
    passageTitle: "A Farewell for Mrs Tan",
    passageText:
      "Our form teacher, Mrs Tan, is retiring next year. Mrs Tan is a wonderful teacher and we will (23) __________ her when she retires. We are very (24) __________ for everything that she has done for us. We want to (25) __________ our appreciation to Mrs Tan by planning a farewell party for her at the canteen during our recess. We are planning to invite some of her (26) __________ whom she has taught before. We are sure that they would like to thank her too. We hope that she will enjoy the (27) __________ that we are going to plan for her. We hope everyone will enjoy themselves too.",
    questions: [
      {
        qid: "henrypark2-q23",
        blankLabel: "(23)",
        question: "we will (23) __________ her when she retires.",
        answer: "miss",
        solution: {
          method: "Vocabulary: what do you do when a teacher leaves and you are sad she's gone?",
          steps: [
            "'when she retires' = she will no longer be their teacher.",
            "'miss' = feel sad because someone/something is no longer present. CORRECT.",
            "Answer: miss.",
          ],
          tip: "'Miss someone' = feel sad because they are gone. 'We will miss Mrs Tan' = we will be sad when she leaves.",
        },
      },
      {
        qid: "henrypark2-q24",
        blankLabel: "(24)",
        question: "We are very (24) __________ for everything that she has done for us.",
        answer: "grateful",
        solution: {
          method: "Vocabulary: feeling thankful for what she has done.",
          steps: [
            "'for everything that she has done for us' → feeling THANKFUL.",
            "'grateful' = thankful, appreciative → CORRECT.",
            "Answer: grateful.",
          ],
          tip: "'Grateful for' = thankful for. Fixed phrase: 'grateful for everything she has done'.",
        },
      },
      {
        qid: "henrypark2-q25",
        blankLabel: "(25)",
        question: "We want to (25) __________ our appreciation to Mrs Tan.",
        answer: "show",
        solution: {
          method: "Vocabulary: the verb used with 'appreciation'.",
          steps: [
            "'______ our appreciation' = express/demonstrate our thankfulness.",
            "'show appreciation' = express appreciation through actions. CORRECT.",
            "Answer: show.",
          ],
          tip: "'Show appreciation' = demonstrate that you are grateful, typically through actions. Fixed expression.",
        },
      },
      {
        qid: "henrypark2-q26",
        blankLabel: "(26)",
        question: "We are planning to invite some of her (26) __________ whom she has taught before.",
        answer: "students",
        solution: {
          method: "Vocabulary: who has she taught? → her former students.",
          steps: [
            "'whom she has taught before' → people she TAUGHT = her STUDENTS.",
            "Answer: students.",
          ],
          tip: "A teacher teaches students. 'Former students' = people she taught in the past. 'Pupils' is also acceptable.",
        },
      },
      {
        qid: "henrypark2-q27",
        blankLabel: "(27)",
        question: "We hope that she will enjoy the (27) __________ that we are going to plan for her.",
        answer: "party",
        solution: {
          method: "Context: earlier mentioned 'a farewell party' → refers to the party.",
          steps: [
            "Earlier in the passage: 'planning a FAREWELL PARTY for her'.",
            "'the ______ we are going to plan' → the farewell party.",
            "Answer: party.",
          ],
          tip: "The passage already mentioned 'farewell party'. The blank refers back to it.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  PART II SECTION E — Editing / Spelling  (Q28–Q32, 5 marks)
  //  Passage: Vincent van Gogh
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "henrypark2-secE",
    topic: "Editing",
    marks: 5,
    passageTitle: "Vincent van Gogh",
    passageText:
      "Vincent van Gogh was not always considered as one of the greatest painters of all time. People used to laugh at his paintings as they were [diferent](28) from the other paintings they had seen. He only sold one of his [beutiful](29) paintings during his lifetime.\n\nBut now, many people around the world [celeberate](30) the life and work of Vincent van Gogh. People visit [musuems](31) and galleries just to see his art. They love to admire his paintings, [espacially](32) a painting which he named 'The Starry Night'. It is one of the most famous paintings in the world and is printed on many items such as mugs, magnets and postcards.",
    questions: [
      {
        qid: "henrypark2-q28",
        blankLabel: "(28)",
        question: "they were [diferent] from the other paintings — correct the underlined word (spelling).",
        answer: "different",
        solution: {
          method: "Spelling correction: 'diferent' → 'different'.",
          steps: [
            "'diferent' → missing double 'f'.",
            "Correct: dif-FER-ent → d-i-f-f-e-r-e-n-t.",
            "Answer: different.",
          ],
          tip: "Different = dif + FER + ent. Double F: diFFerent. Common error: single F.",
        },
      },
      {
        qid: "henrypark2-q29",
        blankLabel: "(29)",
        question: "one of his [beutiful] paintings — correct the underlined word (spelling).",
        answer: "beautiful",
        solution: {
          method: "Spelling correction: 'beutiful' → 'beautiful'.",
          steps: [
            "'beutiful' → wrong: 'beu' instead of 'beau'.",
            "beauty → beaUTIful = beau + ti + ful = beautiful.",
            "Correct: b-e-a-u-t-i-f-u-l.",
            "Answer: beautiful.",
          ],
          tip: "Beautiful = beau + ti + ful. The 'beau' part (French for beauty) has 'eau' not just 'eu'.",
        },
      },
      {
        qid: "henrypark2-q30",
        blankLabel: "(30)",
        question: "people around the world [celeberate] the life — correct the underlined word (spelling).",
        answer: "celebrate",
        solution: {
          method: "Spelling correction: 'celeberate' → 'celebrate'.",
          steps: [
            "'celeberate' → extra 'e' in the middle.",
            "Correct: cel-e-brate → c-e-l-e-b-r-a-t-e.",
            "Answer: celebrate.",
          ],
          tip: "Celebrate = cel-e-BRATE (not cel-e-ber-ate). Only 4 syllables: cel-e-brate.",
        },
      },
      {
        qid: "henrypark2-q31",
        blankLabel: "(31)",
        question: "People visit [musuems] and galleries — correct the underlined word (spelling).",
        answer: "museums",
        solution: {
          method: "Spelling correction: 'musuems' → 'museums'.",
          steps: [
            "'musuems' → letters transposed.",
            "Correct: mu-SE-ums → m-u-s-e-u-m-s.",
            "Answer: museums.",
          ],
          tip: "Museum = mu + SE + um. Plural: museums (add -s). Common error: reversing 'eu' to 'ue'.",
        },
      },
      {
        qid: "henrypark2-q32",
        blankLabel: "(32)",
        question: "his paintings, [espacially] a painting — correct the underlined word (spelling).",
        answer: "especially",
        solution: {
          method: "Spelling correction: 'espacially' → 'especially'.",
          steps: [
            "'espacially' → wrong: 'es' instead of 'es' is fine, but 'espac' instead of 'especi'.",
            "Correct: es-PEC-ial-ly → e-s-p-e-c-i-a-l-l-y.",
            "Double L before -y: especial + ly = especialLY.",
            "Answer: especially.",
          ],
          tip: "Especially = es + PECI + ally. Note: espeCIALly (not espaGIALly). Double L: especiaLLy.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  PART II SECTION F — Synthesis  (Q33–Q34, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "henrypark2-q33",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as one sentence without changing the meaning.\n\nThe show was entertaining. Everyone enjoyed the show.\n\n__________ because __________",
    answer:
      "Everyone enjoyed the show because it was entertaining.",
    solution: {
      method: "'Because' introduces the reason: entertainment caused enjoyment.",
      steps: [
        "Cause: the show was entertaining. Effect: everyone enjoyed it.",
        "'Because' introduces the cause: 'Everyone enjoyed the show BECAUSE it was entertaining.'",
        "Replace 'the show' with 'it' to avoid repetition.",
        "Answer: Everyone enjoyed the show because it was entertaining.",
      ],
      tip: "Cause-effect with 'because': [effect] because [cause]. 'Enjoyed the show BECAUSE it was entertaining.'",
    },
  },

  {
    kind: "A",
    id: "henrypark2-q34",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as one sentence without changing the meaning.\n\nDavid wanted the toy robot badly. David did not have enough money to buy it.\n\n__________ but __________",
    answer:
      "David wanted the toy robot badly but he did not have enough money to buy it.",
    solution: {
      method: "'But' connects the desire and the obstacle (contrast).",
      steps: [
        "Contrast: wanted badly vs did not have money.",
        "'but' joins two contrasting clauses.",
        "Replace second 'David' with 'he'.",
        "Answer: David wanted the toy robot badly but he did not have enough money to buy it.",
      ],
      tip: "'But' shows contrast or obstacle. 'Wanted badly BUT didn't have money' = the desire was strong but money was the problem.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  PART II SECTION G — Comprehension 1  (Q35–Q42, 8 marks)
  //  Passage: Ted, Dave, and the Seal
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "henrypark2-secG",
    topic: "ComprehensionMCQ",
    marks: 8,
    passageTitle: "The Seal and the Storm (adapted)",
    passageText:
      "Ted loved walking along the beach. After he had finished his dinner, he put on a jacket. Together with his dog, Dave, they went out for a walk. The strong wind blew against his face and the weather was cold.\n\nThe beach was only two kilometres from Ted's house, but the wind was blowing so strongly that it took him almost thirty minutes to reach there. When Ted finally arrived at the beach, he heard the sound of the waves breaking on the shore. The stormy weather made the waves huge that night. Dave barked in excitement as the seawater rushed towards the shore.\n\nAs they walked along the beach, Ted suddenly heard something in the water 'barking' back. At first, Ted thought there was another dog in the water. He spotted a tiny head with two big eyes, popping out in between the waves and took a closer look. Then, he saw two tiny ears and realised that it was a seal.\n\nThe seal had entangled itself in the large leaves of a brown sea plant. As the waves were too strong, it was unable to free itself. Ted did not know how to help the seal as he was not a good swimmer.\n\nSuddenly, Dave jumped into the water and swam towards the new-found 'friend'. After Dave pulled at the plant vigorously, the seal managed to break free and swim away. Dave swam back to shore. Ted hugged Dave and praised his clever dog.",
    questions: [
      {
        qid: "henrypark2-q35",
        question:
          "Ted wore a jacket as __________. [1m]\n(1) the weather was cold\n(2) the beach was far away\n(3) he loved walking along the beach",
        options: [
          "(1) the weather was cold",
          "(2) the beach was far away",
          "(3) he loved walking along the beach",
        ],
        answer: "1",
        solution: {
          method: "Literal comprehension: why did Ted wear a jacket?",
          steps: [
            "Paragraph 1: 'the strong wind blew against his face and the weather was COLD.'",
            "He put on a jacket because the WEATHER WAS COLD. CORRECT.",
            "(2) Far away → distance, not reason for jacket.",
            "(3) Loved walking → reason for going out, not for jacket.",
            "Answer: (1) the weather was cold.",
          ],
          tip: "Cause of wearing jacket = weather was cold. The strong wind and cold weather logically explain the jacket.",
        },
      },
      {
        qid: "henrypark2-q36",
        question:
          "__________ made Dave bark in excitement at the beach. [1m]\n(1) Large leaves of a brown sea plant\n(2) Seawater rushing towards the shore\n(3) The 'dog' with two big eyes swimming in the sea",
        options: [
          "(1) Large leaves of a brown sea plant",
          "(2) Seawater rushing towards the shore",
          "(3) The 'dog' with two big eyes swimming in the sea",
        ],
        answer: "2",
        solution: {
          method: "Literal comprehension: what made Dave bark?",
          steps: [
            "Paragraph 2: 'Dave barked in excitement as the SEAWATER RUSHED TOWARDS THE SHORE.'",
            "(2) Seawater rushing towards the shore → CORRECT.",
            "(1) Sea plant → that was what the seal was stuck in, discovered later.",
            "(3) 'Dog' with big eyes → Ted thought he saw a dog, discovered even later.",
            "Answer: (2).",
          ],
          tip: "Cause-effect: seawater rushed → Dave barked. This is explicit in paragraph 2.",
        },
      },
      {
        qid: "henrypark2-q37",
        question:
          "Why was the seal unable to swim freely? [1m]\n(1) The seal was not a good swimmer.\n(2) The wind was blowing too strongly.\n(3) The seal was entangled in the sea plant.",
        options: [
          "(1) The seal was not a good swimmer.",
          "(2) The wind was blowing too strongly.",
          "(3) The seal was entangled in the sea plant.",
        ],
        answer: "3",
        solution: {
          method: "Literal comprehension: paragraph 4.",
          steps: [
            "Paragraph 4: 'The seal had ENTANGLED ITSELF in the large leaves of a brown sea plant.'",
            "(3) Entangled in sea plant → CORRECT.",
            "(1) Not a good swimmer → Ted was not a good swimmer, not the seal.",
            "(2) Wind too strong → the seal was entangled, not blown away.",
            "Answer: (3).",
          ],
          tip: "Entangled = caught/tangled up in something. The sea plant trapped the seal. Don't confuse Ted's poor swimming with the seal's problem.",
        },
      },
      {
        qid: "henrypark2-q38",
        question:
          "TRUE or FALSE: Ted and Dave went for a walk in the morning. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: when did they go for a walk?",
          steps: [
            "Paragraph 1: 'After he had FINISHED HIS DINNER, he put on a jacket.'",
            "'The stormy weather made the waves huge THAT NIGHT.'",
            "After dinner = evening/night. NOT morning. Statement: False.",
            "Answer: False.",
          ],
          tip: "'After dinner' = evening. 'That night' confirms it was nighttime, not morning.",
        },
      },
      {
        qid: "henrypark2-q39",
        question:
          "TRUE or FALSE: Ted saw the seal's ears first. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: what did Ted see first?",
          steps: [
            "Paragraph 3: 'He spotted a tiny HEAD with two big EYES, popping out in between the waves and took a closer look. Then, he saw two tiny EARS.'",
            "Sequence: HEAD + EYES first → then EARS.",
            "Statement: saw EARS first → FALSE.",
            "Answer: False.",
          ],
          tip: "Ted first spotted the HEAD and EYES, then took a closer look and saw the EARS. Ears came second.",
        },
      },
      {
        qid: "henrypark2-q40",
        question:
          'What does the word "there" in the second paragraph refer to? Put a tick next to the correct answer. [1m]\n☐ Ted\'s house\n☐ The beach',
        options: ["Ted's house", "The beach"],
        answer: "The beach",
        solution: {
          method: "Pronoun reference: what does 'there' in paragraph 2 refer to?",
          steps: [
            "Paragraph 2: 'it took him almost thirty minutes to reach THERE.'",
            "Ted was walking from his house to the BEACH → 'there' = the beach.",
            "Answer: The beach.",
          ],
          tip: "'There' refers to the destination — Ted was heading TO the beach, so 'there' = the beach.",
        },
      },
      {
        qid: "henrypark2-q41",
        question:
          "Which sentence in the last paragraph tells you that Ted was happy with Dave? [1m]",
        answer: "Ted hugged Dave and praised his clever dog.",
        solution: {
          method: "Locate the sentence showing Ted's happiness with Dave.",
          steps: [
            "Last paragraph: 'Ted HUGGED Dave and PRAISED his clever dog.'",
            "Hugging and praising = happiness and appreciation. This sentence shows Ted was happy with Dave.",
            "Answer: Ted hugged Dave and praised his clever dog.",
          ],
          tip: "Copy the exact sentence. 'Hugged' and 'praised' both show positive feelings toward Dave.",
        },
      },
      {
        qid: "henrypark2-q42",
        question:
          "Put a tick next to the word that best describes Dave. [1m]\n☐ timid\n☐ brave\n☐ disobedient",
        options: ["timid", "brave", "disobedient"],
        answer: "brave",
        solution: {
          method: "Character inference: what does Dave's action show about his character?",
          steps: [
            "Dave JUMPED INTO THE WATER (strong, stormy sea) to help the seal.",
            "This shows courage/bravery — willing to enter dangerous water to help.",
            "'brave' = showing courage → CORRECT.",
            "'timid' = easily scared → OPPOSITE (Dave jumped in).",
            "'disobedient' = not following rules → WRONG.",
            "Answer: brave.",
          ],
          tip: "Dave jumped into stormy water without hesitation → brave. The passage ends with Ted calling Dave 'his clever dog' — both clever AND brave.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  PART II SECTION H — Comprehension 2  (Q43–Q49, 8 marks)
  //  Passage: Fiona and True Friends
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "henrypark2-secH",
    topic: "ComprehensionMCQ",
    marks: 8,
    passageTitle: "Fiona Famous (adapted from Pedro Pablo Sacristán)",
    passageText:
      "Fiona was the most popular girl in her class. She was kind and friendly to her classmates. She invited the whole class to her birthday party and gave everyone presents. She had so many friends but she did not have a true friend.\n\nOne day, everything changed. Mrs Lim, their teacher told the class to make three presents to give to three true friends. The students were having a great time making gifts.\n\nWhen the students had shared out all their presents, Fiona was the only one who had not received one! She felt terrible and cried bitterly. How could it be possible? She had so many friends. One by one, her classmates consoled her, each spending a short time with her and then they left her alone.\n\nWhen she got home, she cried and asked her mother where she could find true friends.\n\n'If you really want true friends, you will have to spend more time with your friends. You must show care for them and always be available, during good times and bad times,' advised her mother.\n\n'But I want to be everybody's friend!' Fiona protested.\n\n'There just isn't enough time to be available for everyone, so it's only possible to have a few true friends. The others will be playmates but they won't be your true friends,' said her mother, wisely.\n\nFiona realised that she had been a good companion to everyone but not a true friend to anyone. That night, she decided to change her ways so that she could finally have some true friends.",
    questions: [
      {
        qid: "henrypark2-q43",
        question:
          "Fiona had many friends because she __________. [1m]\n(1) was kind and friendly\n(2) enjoyed giving presents\n(3) spent time with each of them",
        options: [
          "(1) was kind and friendly",
          "(2) enjoyed giving presents",
          "(3) spent time with each of them",
        ],
        answer: "1",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'She was KIND AND FRIENDLY to her classmates' → reason for having many friends.",
            "(1) was kind and friendly → CORRECT.",
            "(2) enjoyed giving presents → she gave presents but the reason for friends is kindness.",
            "(3) spent time with each → she didn't; classmates only spent a SHORT time with her.",
            "Answer: (1) was kind and friendly.",
          ],
          tip: "The passage gives 'kind and friendly' as the description that explains her popularity. That is the direct reason for having many friends.",
        },
      },
      {
        qid: "henrypark2-q44",
        question:
          "The word 'it' in paragraph 3 refers to Fiona not __________. [1m]\n(1) feeling good\n(2) receiving a present\n(3) having three true friends",
        options: [
          "(1) feeling good",
          "(2) receiving a present",
          "(3) having three true friends",
        ],
        answer: "2",
        solution: {
          method: "Pronoun reference: what does 'it' refer to in paragraph 3?",
          steps: [
            "Paragraph 3: 'She felt terrible and cried bitterly. How could IT be possible?'",
            "What seemed impossible? → that she had NOT RECEIVED A PRESENT despite having so many friends.",
            "'it' = not receiving a present (the impossible situation).",
            "(2) receiving a present → 'It' = not receiving = CORRECT.",
            "Answer: (2).",
          ],
          tip: "What was 'possible' in question: Fiona had many friends but got NO presents. 'It' refers to that shocking situation = not receiving a present.",
        },
      },
      {
        qid: "henrypark2-q45",
        question: "Write T if True, F if False: Fiona's classmates spent a long time to console her.",
        answer: "F",
        solution: {
          method: "Literal comprehension: how long did classmates spend consoling Fiona?",
          steps: [
            "Paragraph 3: 'One by one, her classmates consoled her, each spending a SHORT TIME with her and then they left her alone.'",
            "Statement: 'spent a LONG time' → OPPOSITE of what the passage says ('short time').",
            "Answer: F (False).",
          ],
          tip: "SHORT time vs LONG time — the passage explicitly says 'short time'. The contrast shows they were not truly invested in her.",
        },
      },
      {
        qid: "henrypark2-q46",
        question: "Write T if True, F if False: Fiona's classmates did not like her.",
        answer: "F",
        solution: {
          method: "Inference: did classmates like her?",
          steps: [
            "Paragraph 1: She was 'kind and friendly' and 'had so many friends'.",
            "Paragraph 3: Classmates DID console her → they cared enough to comfort her.",
            "The problem was she had no TRUE FRIEND, not that classmates disliked her.",
            "Statement: 'did not like her' → FALSE.",
            "Answer: F (False).",
          ],
          tip: "Having many friends ≠ not being liked. The issue was depth of friendship, not whether classmates liked her. They DID console her.",
        },
      },
      {
        qid: "henrypark2-q47",
        question: "Write T if True, F if False: Fiona was not a true friend to any of her classmates.",
        answer: "T",
        solution: {
          method: "Literal comprehension: last paragraph.",
          steps: [
            "Last paragraph: 'Fiona realised that she had been a good companion to everyone but NOT A TRUE FRIEND TO ANYONE.'",
            "Statement: 'was not a true friend to any' → DIRECTLY supported by the text.",
            "Answer: T (True).",
          ],
          tip: "The passage explicitly states Fiona was 'not a true friend to anyone'. The final paragraph confirms this.",
        },
      },
      {
        qid: "henrypark2-q48",
        question:
          "Write 1, 2 and 3 in the boxes to arrange the sentences in order. [1m]\n___ Fiona's classmates did not give her any presents.\n___ Fiona gave all her classmates presents on her birthday.\n___ Fiona decided to change her ways so she could have true friends.",
        answer:
          "Fiona's classmates did not give her any presents: 2\nFiona gave all her classmates presents on her birthday: 1\nFiona decided to change her ways so she could have true friends: 3",
        solution: {
          method: "Sequence: map events to passage order.",
          steps: [
            "Event 1: Paragraph 1 — 'She invited the whole class to her birthday party and gave everyone PRESENTS.' → Fiona gave presents. ORDER: 1",
            "Event 2: Paragraph 3 — 'Fiona was the only one who had NOT RECEIVED ONE!' → classmates gave no presents to Fiona. ORDER: 2",
            "Event 3: Last paragraph — 'she decided to CHANGE HER WAYS'. ORDER: 3",
            "Sequence: gave presents (1) → received none (2) → decided to change (3).",
          ],
          tip: "Follow the story chronologically: first Fiona gave presents at her party → then discovered she got none → finally decided to change.",
        },
      },
      {
        qid: "henrypark2-q49",
        question:
          "List two things Fiona's mother advised her to do to find true friends. [2m]\n(a) ___\n(b) ___",
        answer:
          "(a) She has to spend more time with her friends.\n(b) She must show care for them and always be available during good times and bad times.",
        solution: {
          method: "Literal comprehension: two pieces of advice from mother in paragraph 5.",
          steps: [
            "Paragraph 5 (mother's advice): 'you will have to SPEND MORE TIME with your friends.'",
            "And: 'You must SHOW CARE for them and always be AVAILABLE, during good times and bad times.'",
            "Advice 1: Spend more time with friends.",
            "Advice 2: Show care and always be available for them (in good and bad times).",
          ],
          tip: "2-mark answer = 2 distinct pieces of advice. The mother gives two separate pieces of advice in paragraph 5.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const henrypark2023Paper2 = { meta, questions };
export default henrypark2023Paper2;
