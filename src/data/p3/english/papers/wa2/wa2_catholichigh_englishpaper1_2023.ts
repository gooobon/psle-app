// ============================================================
// Catholic High School (Primary) — Practice Paper 1, Primary 3
// English Language Paper  (50 marks)
// Sections: A Grammar MCQ (8) | B Vocabulary MCQ (6) | C Grammar Cloze (4)
//           D Grammar Cloze / Underline (4) | E Vocabulary Cloze (3)
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
  term: "Practice Paper 1",
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
    id: "cathhigh1-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question: "My sister was hiding __________ the door. No one noticed her.",
    options: ["(1) with", "(2) under", "(3) behind", "(4) between"],
    answer: "3",
    solution: {
      method: "Preposition of position: choose the word that fits hiding near a door so no one notices.",
      steps: [
        "Context: hidden so 'no one noticed her' → she is concealed.",
        "'with' → accompaniment, not hiding position → WRONG.",
        "'under' → beneath → you hide under a table, not under a door (doesn't stand flat).",
        "'behind' → at the back of something → 'hiding behind the door' is the STANDARD idiom for concealment. CORRECT.",
        "'between' → in the space separating two things → needs two objects.",
        "Answer: (3) behind.",
      ],
      tip: "Standard expression: 'hide behind the door' = stand behind it so it shields you. Similarly: hide behind a tree, hide behind a curtain.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "All the pupils and teachers __________ to sing the national anthem every morning.",
    options: [
      "(1) stand",
      "(2) stands",
      "(3) is standing",
      "(4) are standing",
    ],
    answer: "1",
    solution: {
      method: "Subject-verb agreement + tense: 'every morning' = habitual action; plural subject.",
      steps: [
        "'every morning' → habitual present action → SIMPLE PRESENT.",
        "Subject: 'All the pupils and teachers' → plural (more than one group joined by 'and').",
        "Present simple, plural subject: BASE FORM (no -s).",
        "(1) stand → base form → CORRECT for plural + simple present.",
        "(2) stands → third person singular → WRONG (subject is plural).",
        "(3) is standing / (4) are standing → present continuous → WRONG ('every morning' = habit, not continuous).",
        "Answer: (1) stand.",
      ],
      tip: "Two or more subjects joined by 'and' = plural → use base form in present simple. 'Pupils AND teachers stand' (not stands).",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Everyone __________ quietly when the fire alarm went off.",
    options: [
      "(1) read",
      "(2) reads",
      "(3) is reading",
      "(4) was reading",
    ],
    answer: "4",
    solution: {
      method: "Past continuous: action in progress when the alarm (past event) interrupted.",
      steps: [
        "'when the fire alarm went off' → past moment; people were doing something AT that time.",
        "The action of reading was ONGOING when the alarm happened → past continuous.",
        "(4) was reading → past continuous → CORRECT. 'Everyone was reading quietly when the alarm went off.'",
        "'Everyone' = singular (takes singular verb) → 'was' (not 'were').",
        "(1) read → past simple → implies completed act, not ongoing at a moment.",
        "(3) is reading → present continuous → WRONG tense.",
        "Answer: (4) was reading.",
      ],
      tip: "Past continuous: action in progress (was/were + -ing) when another event (simple past) happened. 'Everyone was reading when the alarm went off.'",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Meera does not like to swim __________ she enjoys cycling.",
    options: ["(1) or", "(2) so", "(3) but", "(4) and"],
    answer: "3",
    solution: {
      method: "Conjunction: 'does not like to swim' vs 'enjoys cycling' → contrast.",
      steps: [
        "Two contrasting ideas: doesn't like swimming / likes cycling.",
        "'but' = coordinating conjunction showing contrast. CORRECT.",
        "'or' = alternative choice → 'doesn't like swim or she enjoys cycling' → ungrammatical.",
        "'so' = result/consequence → swimming dislike doesn't cause cycling enjoyment.",
        "'and' = addition → would imply both are similar, but they contrast.",
        "Answer: (3) but.",
      ],
      tip: "'But' connects contrasting ideas: negative + positive, or two opposite situations.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Do not go there! __________ wild animals are very dangerous," warned the tour guide.',
    options: ["(1) This", "(2) That", "(3) These", "(4) Those"],
    answer: "3",
    solution: {
      method: "Demonstrative pronoun: plural animals that are nearby in context.",
      steps: [
        "The tour guide is warning about wild animals in a place (presumably nearby, being pointed to).",
        "The subject of the previous sentence is the dangerous place they're warning about.",
        "'wild animals' = PLURAL noun.",
        "For plural + relatively near reference: THESE.",
        "(3) These → plural + near → CORRECT. 'These wild animals are very dangerous.'",
        "'Those' → plural + far → possible, but 'these' is more common when pointing at something immediately in view.",
        "Answer: (3) These.",
      ],
      tip: "These = plural + near. Those = plural + far. Wild animals being pointed to during a tour are typically in view (near) → 'these wild animals'.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "__________ children like the 'Super Mario' movie. It is very popular among the kids.",
    options: ["(1) Few", "(2) Little", "(3) Many", "(4) Much"],
    answer: "3",
    solution: {
      method: "Quantifier: the second sentence says it's 'very popular' → large number of children like it.",
      steps: [
        "Clue: 'It is very popular among the kids' → MANY children like it.",
        "'children' = countable plural noun.",
        "'Many' = large number (used with countable plural). CORRECT.",
        "'Few' = small number (countable) → contradicts 'very popular'.",
        "'Little' = small amount (uncountable) → WRONG (children is countable).",
        "'Much' = large amount (uncountable) → WRONG (children is countable).",
        "Answer: (3) Many.",
      ],
      tip: "Many/few → countable plural nouns. Much/little → uncountable nouns. 'Many children' (correct). 'Much children' (WRONG).",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q7",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Please ensure you have taken __________ with you before leaving the hall. Do not leave your belongings behind," reminded the Discipline Master.',
    options: [
      "(1) nothing",
      "(2) anything",
      "(3) everything",
      "(4) something",
    ],
    answer: "3",
    solution: {
      method: "Indefinite pronoun: the instruction 'do not leave your belongings behind' implies taking ALL things.",
      steps: [
        "Context: 'Do not leave your belongings behind' → the DM wants everyone to take ALL their items.",
        "'everything' = all things → 'taken everything with you' = taken all your belongings. CORRECT.",
        "'nothing' → 'taken nothing with you' → contradiction (they should take their things).",
        "'anything' → possible in questions/negatives but 'ensure you have taken anything' is weaker than 'everything'.",
        "'something' → partial amount → the instruction means ALL, not just some.",
        "Answer: (3) everything.",
      ],
      tip: "'Everything' = all things. Used in positive instructions to mean 'all'. 'Take everything with you' = leave nothing behind.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q8",
    topic: "GrammarMCQ",
    marks: 1,
    question: "The trains are always on time, __________ ?",
    options: [
      "(1) do they?",
      "(2) are they?",
      "(3) don't they?",
      "(4) aren't they?",
    ],
    answer: "4",
    solution: {
      method: "Question tag: positive statement with 'are' → negative tag 'aren't they'.",
      steps: [
        "Statement: 'The trains ARE always on time' → positive, present simple with 'are'.",
        "Tag rule: positive statement → negative tag.",
        "Auxiliary used: ARE → tag uses AREN'T.",
        "Subject: 'The trains' (plural) → 'they'.",
        "Tag: aren't they?",
        "(1) do they → wrong auxiliary.",
        "(2) are they → positive tag (wrong after positive statement).",
        "(3) don't they → wrong auxiliary.",
        "Answer: (4) aren't they?",
      ],
      tip: "The verb 'are' in the statement → use 'aren't' in the tag. Positive → negative tag. 'The trains are always on time, aren't they?'",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Vocabulary MCQ  (Q9–Q14, 6 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "cathhigh1-q9",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My best friend, Thomas, broke __________ tears when his favourite toy was damaged.",
    options: ["(1) up", "(2) into", "(3) down", "(4) through"],
    answer: "2",
    solution: {
      method: "Phrasal verb: 'broke into tears' = suddenly started crying.",
      steps: [
        "'broke ______ tears' → choose the preposition to complete the idiom.",
        "'broke into tears' = suddenly began to cry → CORRECT. Fixed idiom.",
        "'broke up' = separated/broke apart or ended a relationship → WRONG.",
        "'broke down' = stopped working/had an emotional breakdown (possible) → but 'broke down in tears' is the correct form with 'in', not 'down tears'.",
        "'broke through' → penetrated → unrelated.",
        "Answer: (2) into.",
      ],
      tip: "Fixed idiom: 'break into tears' = suddenly start crying. Similarly: 'break into a run' (suddenly run), 'break into a smile' (suddenly smile).",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q10",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Last night, my sister __________ down the stairs to the kitchen quietly as she did not want to wake anyone up.",
    options: [
      "(1) bolted",
      "(2) darted",
      "(3) scurried",
      "(4) sneaked",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: choose the movement verb fitting 'quietly' and 'not wanting to wake anyone'.",
      steps: [
        "Key clues: 'quietly', 'did not want to wake anyone up'.",
        "'bolted' = ran away very fast → NOT quiet.",
        "'darted' = moved quickly and suddenly → NOT quiet.",
        "'scurried' = moved quickly with small steps (like a mouse) → suggests speed but not necessary quietness.",
        "'sneaked' = moved quietly and carefully to avoid being noticed → PERFECT FIT.",
        "Answer: (4) sneaked.",
      ],
      tip: "'Sneaked' (or 'snuck') = moved stealthily, quietly, to avoid detection. It directly matches 'quietly' and 'not wanting to wake anyone'.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "__________ with anger, the restaurant manager scolded his staff who had broken the plates.",
    options: [
      "(1) Wailing",
      "(2) Bellowing",
      "(3) Mumbling",
      "(4) Grumbling",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: choose the word matching scolding 'with anger' loudly.",
      steps: [
        "Context: 'with anger', 'scolded his staff' → loud, angry verbal expression.",
        "'Wailing' = crying/screaming with grief → not anger-scolding.",
        "'Bellowing' = shouting loudly (like a bull); expressing with a loud, powerful voice → MATCHES scolding angrily. CORRECT.",
        "'Mumbling' = speaking quietly and unclearly → OPPOSITE of scolding staff.",
        "'Grumbling' = complaining quietly → too mild for 'scolding'.",
        "Answer: (2) Bellowing.",
      ],
      tip: "'Bellow' = shout loudly, with power. A manager bellowing at staff = very angry, loud scolding. 'Bellowing with anger' is a natural collocation.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Naina saw a __________ of birds when she went to the zoo with her family.",
    options: ["(1) flock", "(2) pride", "(3) colony", "(4) school"],
    answer: "1",
    solution: {
      method: "Collective noun: identify the correct collective noun for birds.",
      steps: [
        "'flock' = collective noun for birds (and sheep). A FLOCK of birds. CORRECT.",
        "'pride' = collective noun for lions (a pride of lions).",
        "'colony' = collective noun for ants, bats, penguins.",
        "'school' = collective noun for fish (a school of fish).",
        "Answer: (1) flock.",
      ],
      tip: "Collective nouns for animals: flock (birds/sheep), pride (lions), pack (wolves), school (fish), herd (cattle/elephants), colony (ants). Birds → FLOCK.",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "While waiting for the results, Yuze was __________. He was confident he would do very well.",
    options: [
      "(1) as cold as ice",
      "(2) as cunning as a fox",
      "(3) as stubborn as a mule",
      "(4) as cool as a cucumber",
    ],
    answer: "4",
    solution: {
      method: "Idiom: choose the expression matching being calm and confident while waiting.",
      steps: [
        "Context: Yuze is CONFIDENT while waiting → he is calm, unbothered.",
        "'as cold as ice' = emotionally cold/unfeeling → not about calm confidence.",
        "'as cunning as a fox' = very clever/sly → not about calmness.",
        "'as stubborn as a mule' = very determined/inflexible → not about calm.",
        "'as cool as a cucumber' = very calm and composed despite pressure → PERFECT FIT. CORRECT.",
        "Answer: (4) as cool as a cucumber.",
      ],
      tip: "'Cool as a cucumber' = extremely calm and relaxed, not stressed. Used when someone remains composed in a stressful situation (like waiting for results).",
    },
  },

  {
    kind: "A",
    id: "cathhigh1-q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"I\'m afraid I have bad news for you," the doctor told my uncle __________.',
    options: [
      "(1) boldly",
      "(2) bravely",
      "(3) eagerly",
      "(4) solemnly",
    ],
    answer: "4",
    solution: {
      method: "Vocabulary: choose the adverb matching the tone of delivering bad news.",
      steps: [
        "Context: doctor delivering BAD NEWS → serious, grave, formal tone.",
        "'boldly' = with courage and confidence → doesn't match delivering bad news seriously.",
        "'bravely' = with courage facing difficulty → might suit the patient, not the doctor giving news.",
        "'eagerly' = enthusiastically/with excitement → OPPOSITE of delivering bad news.",
        "'solemnly' = in a serious and formal manner; gravely → PERFECT for delivering bad news. CORRECT.",
        "Answer: (4) solemnly.",
      ],
      tip: "'Solemnly' = seriously, gravely, with formality. Doctors, judges, and officials speak solemnly when delivering serious/bad news.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Grammar Cloze (Pronouns)  (Q15–Q18, 4 marks)
  //  Passage: Mabel's Lost Pencil
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secC",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Mabel's Lost Pencil",
    passageText:
      "Mabel was feeling upset as she had lost her precious pencil. (15) __________ was from her best friend. She and (16) __________ father searched high and low for it but could not find it. She was almost in tears. Just then, Larry, her brother, came to her room with her pencil. He had taken it to do (17) __________ homework. 'Why did (18) __________ take my pencil without my permission?' cried Mabel. Larry apologised to her immediately.",
    wordBank: {
      A: "he",
      B: "her",
      C: "his",
      D: "it",
      E: "she",
      F: "you",
    },
    questions: [
      {
        qid: "cathhigh1-q15",
        blankLabel: "(15)",
        question: "(15) __________ was from her best friend.",
        answer: "D",
        solution: {
          method: "Pronoun reference: what does '(15) was from her best friend' refer to?",
          steps: [
            "The previous sentence: 'she had lost her precious PENCIL.'",
            "The blank refers back to 'the pencil'.",
            "Pencil = an object (not a person) → pronoun = IT.",
            "D (it) → 'It was from her best friend' → the pencil was given by her best friend. CORRECT.",
            "Answer: D (it).",
          ],
          tip: "When referring back to an object (pencil), use 'it'. Reserve he/she for people.",
        },
      },
      {
        qid: "cathhigh1-q16",
        blankLabel: "(16)",
        question: "She and (16) __________ father searched high and low for it.",
        answer: "B",
        solution: {
          method: "Possessive pronoun: 'She and ______ father' — whose father?",
          steps: [
            "'She and ______ father' — the father belongs to Mabel (she).",
            "Possessive for she = HER.",
            "B (her) → 'She and her father searched' → CORRECT.",
            "C (his) → 'his father' → refers to someone else's father → WRONG.",
            "Answer: B (her).",
          ],
          tip: "'She and her father' = Mabel and Mabel's father. Use 'her' as the possessive for the same female subject.",
        },
      },
      {
        qid: "cathhigh1-q17",
        blankLabel: "(17)",
        question: "He had taken it to do (17) __________ homework.",
        answer: "C",
        solution: {
          method: "Possessive pronoun: whose homework is Larry doing?",
          steps: [
            "Subject: 'He' = Larry (the brother).",
            "'to do ______ homework' — Larry's own homework.",
            "Possessive for he = HIS.",
            "C (his) → 'to do his homework' → CORRECT.",
            "B (her) → Mabel's homework → WRONG (Larry did his own).",
            "Answer: C (his).",
          ],
          tip: "He → his (possessive). She → her. It → its. They → their.",
        },
      },
      {
        qid: "cathhigh1-q18",
        blankLabel: "(18)",
        question: "'Why did (18) __________ take my pencil without my permission?' cried Mabel.",
        answer: "F",
        solution: {
          method: "Subject pronoun in direct speech: Mabel is talking TO Larry.",
          steps: [
            "Mabel is scolding Larry: 'Why did ______ take my pencil?'",
            "She is asking Larry directly → the subject is the person being spoken TO = YOU (Larry).",
            "F (you) → 'Why did YOU take my pencil?' → CORRECT. Direct address.",
            "A (he) → third person → would be talking ABOUT Larry, not TO him.",
            "Answer: F (you).",
          ],
          tip: "In direct speech, when confronting the person directly: 'Why did YOU…?' uses 'you'. If talking about someone: 'Why did he/she…?'",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Grammar Cloze (Underline)  (Q19–Q22, 4 marks)
  //  Passage: Cookies
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secD",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Cookies",
    passageText:
      "Who doesn't love cookies? The sweet snack (19) [is / are] a favourite among children and adults. It can be either chewy or crunchy. Usually, cookies (20) [contain / contains] a lot of fat and sugar. Bakers (21) [like / likes] to add chocolate chips or nuts to give more flavour to the cookies. This (22) [make / makes] the cookies even more delicious. Are you a cookie-lover? You can try making your very own cookies today.",
    questions: [
      {
        qid: "cathhigh1-q19",
        blankLabel: "(19)",
        question: "The sweet snack (19) [is / are] a favourite among children and adults.",
        answer: "is",
        solution: {
          method: "Subject-verb agreement: 'snack' is singular uncountable → 'is'.",
          steps: [
            "Subject: 'The sweet snack' → singular (one type of snack).",
            "Singular subject → singular verb → IS.",
            "Answer: is.",
          ],
          tip: "'Snack' is singular. 'The sweet snack IS a favourite.' If it were 'Cookies ARE', we'd use 'are'. But 'snack' (singular) → is.",
        },
      },
      {
        qid: "cathhigh1-q20",
        blankLabel: "(20)",
        question: "Usually, cookies (20) [contain / contains] a lot of fat and sugar.",
        answer: "contain",
        solution: {
          method: "Subject-verb agreement: 'cookies' is plural → base form 'contain'.",
          steps: [
            "Subject: 'cookies' → plural.",
            "Present simple, plural subject → BASE FORM (no -s).",
            "Answer: contain.",
          ],
          tip: "Cookies (plural) → contain (base form). He/she/it → contains (adds -s).",
        },
      },
      {
        qid: "cathhigh1-q21",
        blankLabel: "(21)",
        question: "Bakers (21) [like / likes] to add chocolate chips or nuts to give more flavour.",
        answer: "like",
        solution: {
          method: "Subject-verb agreement: 'Bakers' is plural → base form.",
          steps: [
            "Subject: 'Bakers' → plural.",
            "Plural subject → base form → LIKE.",
            "Answer: like.",
          ],
          tip: "Bakers (they) → like. One baker → likes.",
        },
      },
      {
        qid: "cathhigh1-q22",
        blankLabel: "(22)",
        question: "This (22) [make / makes] the cookies even more delicious.",
        answer: "makes",
        solution: {
          method: "Subject-verb agreement: 'This' is singular → 'makes'.",
          steps: [
            "Subject: 'This' → singular demonstrative pronoun (third person singular).",
            "Third person singular present → adds -s → MAKES.",
            "Answer: makes.",
          ],
          tip: "This/That → singular → makes. These/Those → plural → make.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Vocabulary Cloze  (Q23–Q25, 3 marks)
  //  Passage: Abu the Picky Eater
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secE",
    topic: "VocabCloze",
    marks: 3,
    passageTitle: "Abu the Picky Eater",
    passageText:
      "Abu only ate pancakes. He simply (23) __________ to eat anything else. Abu's mother thought, 'He should eat (24) __________ food like fruits and vegetables too!' She had an idea. She added blended carrots into the pancake batter. Abu gobbled up everything. She added different (25) __________ to the pancakes daily. One day, Abu caught his mother adding blended spinach into his pancakes. 'You added vegetables?' he gasped. Abu realised that vegetables were not as bad as he had thought.",
    wordBank: {
      avoided: "avoided",
      healthy: "healthy",
      ingredients: "ingredients",
      mixtures: "mixtures",
      refused: "refused",
      special: "special",
    },
    questions: [
      {
        qid: "cathhigh1-q23",
        blankLabel: "(23)",
        question: "He simply (23) __________ to eat anything else.",
        answer: "refused",
        solution: {
          method: "Vocabulary: 'simply ______ to eat anything else' — what verb fits a picky eater?",
          steps: [
            "Context: Abu ONLY ate pancakes → he would not eat other food.",
            "'refused' = said no to / would not do something → 'refused to eat anything else'. CORRECT.",
            "'avoided' → 'avoided to eat' is less natural; 'avoided eating' is standard.",
            "Answer: refused.",
          ],
          tip: "Refused + to + infinitive = did not do something by choice. 'Refused to eat' is the standard pattern.",
        },
      },
      {
        qid: "cathhigh1-q24",
        blankLabel: "(24)",
        question: "He should eat (24) __________ food like fruits and vegetables too!",
        answer: "healthy",
        solution: {
          method: "Vocabulary: what kind of food are fruits and vegetables?",
          steps: [
            "Examples: fruits and vegetables → these are HEALTHY foods.",
            "'healthy food' = nutritious food good for the body. CORRECT.",
            "'special food' → fruits/vegetables are not typically 'special'.",
            "Answer: healthy.",
          ],
          tip: "Fruits and vegetables = healthy food. This is a standard vocabulary association in Singapore P3 English.",
        },
      },
      {
        qid: "cathhigh1-q25",
        blankLabel: "(25)",
        question: "She added different (25) __________ to the pancakes daily.",
        answer: "ingredients",
        solution: {
          method: "Vocabulary: what is added to pancakes to make them different each day?",
          steps: [
            "The mother hid vegetables in the pancakes → she added different things (carrots, spinach) each day.",
            "'ingredients' = components/things added to a recipe. CORRECT.",
            "'mixtures' → could work but 'different mixtures to the pancakes' is less precise.",
            "Answer: ingredients.",
          ],
          tip: "Ingredients = the individual components used in cooking/baking. Carrots, spinach, batter = ingredients. The mother added different secret ingredients daily.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Editing / Spelling  (Q26–Q30, 5 marks)
  //  Passage: Bukit Timah Nature Reserve
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secF",
    topic: "Editing",
    marks: 5,
    passageTitle: "Bukit Timah Nature Reserve (adapted from 'Sustain local biodiversity', What's Up, October 2021)",
    passageText:
      "Have you ever visited Bukit Timah Nature Reserve? I usually go there (26) __________ (27) __________ with my parents to hike and take long [strols]. It is full of [beautyful] flora and (28) __________ fauna. The nature reserve [suppots] a variety of flowering plants and wildlife.\n\nSome of these flowering plants and wildlife are slowly decreasing in numbers. (29) __________ This reminds us of how [importent] conservation is. Without any conservation (30) __________ [afforts], we would be at risk of losing our flora and fauna. Let's do our part to protect our ecosystem.",
    questions: [
      {
        qid: "cathhigh1-q26",
        blankLabel: "(26)",
        question: "I usually go there (26) __________ — correct the underlined word 'strols' for spelling.",
        answer: "strolls",
        solution: {
          method: "Spelling correction: 'strols' is missing a letter.",
          steps: [
            "'take long strols' → 'strols' is a misspelling of 'strolls'.",
            "Stroll = to walk leisurely. Third person plural: strolls (but here it's a noun).",
            "Noun: 'strolls' (plural noun) = leisurely walks.",
            "Correct spelling: s-t-r-o-l-l-s (double L).",
            "Answer: strolls.",
          ],
          tip: "Stroll (verb/noun) → double L: stroll, strolled, strolling, strolls. Common misspelling: strols (missing one L).",
        },
      },
      {
        qid: "cathhigh1-q27",
        blankLabel: "(27)",
        question: "It is full of [beautyful] flora — correct the bold word (spelling).",
        answer: "beautiful",
        solution: {
          method: "Spelling correction: 'beautyful' → 'beautiful'.",
          steps: [
            "'beautyful' → common mistake: keeping 'beauty' unchanged.",
            "When adding '-ful', the 'y' in 'beauty' changes to 'i'.",
            "beauty → beaut-i-ful = beautiful.",
            "Correct: b-e-a-u-t-i-f-u-l.",
            "Answer: beautiful.",
          ],
          tip: "Spelling rule: when -ful is added to words ending in -ty, the y changes to i: beauty → beautiful, pity → pitiful.",
        },
      },
      {
        qid: "cathhigh1-q28",
        blankLabel: "(28)",
        question: "The nature reserve [suppots] a variety of flowering plants — correct the bold word (spelling).",
        answer: "supports",
        solution: {
          method: "Spelling correction: 'suppots' is missing 'r'.",
          steps: [
            "'suppots' → should be 'supports' (missing 'r').",
            "Support + s (third person singular) = supports.",
            "Correct: s-u-p-p-o-r-t-s.",
            "Answer: supports.",
          ],
          tip: "Support → supports (he/she/it). Check for missing letters: supp-O-R-ts.",
        },
      },
      {
        qid: "cathhigh1-q29",
        blankLabel: "(29)",
        question: "This reminds us of how [importent] conservation is — correct the bold word (spelling).",
        answer: "important",
        solution: {
          method: "Spelling correction: 'importent' → 'important'.",
          steps: [
            "'importent' → wrong vowel in the last syllable.",
            "Correct: im-por-TANT (ends in -ant, not -ent).",
            "Correct spelling: i-m-p-o-r-t-a-n-t.",
            "Answer: important.",
          ],
          tip: "Important ends in -ANT (not -ENT). Trick: 'It is IMPORT-ANT to remember the A.'",
        },
      },
      {
        qid: "cathhigh1-q30",
        blankLabel: "(30)",
        question: "Without any conservation [afforts] — correct the bold word (spelling).",
        answer: "efforts",
        solution: {
          method: "Spelling correction: 'afforts' → 'efforts'.",
          steps: [
            "'afforts' → wrong: starts with 'aff' instead of 'eff'.",
            "Correct: efforts = e-f-f-o-r-t-s.",
            "Effort (singular) → efforts (plural).",
            "Answer: efforts.",
          ],
          tip: "Effort starts with 'eff' (not 'aff'): ef-FORT. Common misspelling: afforts (confusing with words like 'afford').",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION G — Comprehension Cloze / Fill-in-the-Blank
  //  (Q31–Q34, 4 marks) — student fills own words
  //  Passage: Making Slime
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secG",
    topic: "ComprehensionFIB",
    marks: 4,
    passageTitle: "Making Slime (adapted from https://www.homesciencetools.com)",
    passageText:
      "Slime is fun to play with. It has a great texture and can be colourful too. Would you (31) __________ to make your own slime at home?\n\nYou just need to get some simple materials such (32) __________ glue, salt water and baking soda. In a bowl, pour in the glue and the baking soda and mix well. Finally, put in the salt water and watch the slime form. Once the (33) __________ has formed, you can stretch and mould it. You can also (34) __________ some food colouring into the slime. This addition gives your slime a vibrant colour. Start your slime experiment at home today!",
    questions: [
      {
        qid: "cathhigh1-q31",
        blankLabel: "(31)",
        question: "Would you (31) __________ to make your own slime at home?",
        answer: "like",
        solution: {
          method: "Fill-in-the-blank: 'Would you ______ to…?' — standard modal question form.",
          steps: [
            "'Would you ______ to make your own slime?' → standard polite question/invitation.",
            "Fixed phrase: 'Would you LIKE to…?' = Do you want to…?",
            "Answer: like.",
          ],
          tip: "'Would you like to…?' is the standard polite way to offer/invite. Always followed by 'to + base verb'.",
        },
      },
      {
        qid: "cathhigh1-q32",
        blankLabel: "(32)",
        question: "You just need to get some simple materials such (32) __________ glue, salt water and baking soda.",
        answer: "as",
        solution: {
          method: "Fixed phrase: 'such as' introduces examples.",
          steps: [
            "'such ______ glue, salt water…' → introducing examples.",
            "Fixed phrase: 'such AS' = for example, like.",
            "Answer: as.",
          ],
          tip: "'Such as' = for example. 'Materials such as glue' = 'materials like glue'. Never 'such like' or 'such for'.",
        },
      },
      {
        qid: "cathhigh1-q33",
        blankLabel: "(33)",
        question: "Once the (33) __________ has formed, you can stretch and mould it.",
        answer: "slime",
        solution: {
          method: "Comprehension fill-in: the passage is about making slime; what has formed?",
          steps: [
            "The passage is about making SLIME.",
            "'Once the ______ has formed' → what forms after following the recipe? SLIME.",
            "Answer: slime.",
          ],
          tip: "Read the passage title and context: the recipe makes SLIME. 'Once the slime has formed' = the final product is ready.",
        },
      },
      {
        qid: "cathhigh1-q34",
        blankLabel: "(34)",
        question: "You can also (34) __________ some food colouring into the slime.",
        answer: "add",
        solution: {
          method: "Vocabulary fill-in: what do you do with food colouring to put it in slime?",
          steps: [
            "'you can also ______ some food colouring into the slime'.",
            "Standard cooking/crafting verb for putting something in a mixture: ADD.",
            "Answer: add.",
          ],
          tip: "'Add something into/to' = put something into a mixture. Standard recipe language: 'add food colouring to the slime'.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION H — Comprehension: Selected Response + OE
  //  (Q35–Q41, 8 marks)
  //  Passage: Taki, Haru, and the Monkey Koko
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secH",
    topic: "ComprehensionMCQ",
    marks: 8,
    passageTitle: "Taki, Haru, and Koko the Monkey",
    passageText:
      "Taki and Haru lived in a small village near the jungle. They made a living by hunting animals and selling their meat in the village market. They were carefree and happy.\n\nOne day, Taki and Haru were hunting for wild boars in the jungle. As it was getting late, they decided to go home even though they were empty-handed. Suddenly, they heard a sound. Thinking it could be a wild animal, they decided to investigate. As Haru went near a tree, he realised that the sound was coming from a baby monkey which had a cut on one of its paws. The monkey tapped miserably on the ground and stared weakly at the boys. Haru suggested they bring the monkey back.\n\nThe two boys took the poor monkey home. They gave it bananas to eat before treating its wound. They named the monkey Koko. Koko was a friendly but mischievous monkey. Sometimes, it would throw banana peels at passers-by. Koko was also a helpful monkey as it helped to guard the house when the boys were not around.\n\nThe two boys trained it to pluck coconuts and taught it some tricks so that they could earn some extra money. Koko performed these tricks for the villagers and they were amused. Some even paid Taki and Haru to get Koko to perform at village festivals.",
    questions: [
      {
        qid: "cathhigh1-q35",
        question:
          "Where was Taki and Haru's village located? [1 mark]",
        answer:
          "Their village was located near the jungle.",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'Taki and Haru lived in a small village near the jungle.'",
            "Answer: Their village was located near the jungle.",
          ],
          tip: "Location questions: find the exact phrase in the passage. 'Near the jungle' is the answer.",
        },
      },
      {
        qid: "cathhigh1-q36",
        question:
          "Tick your chosen answer: The word 'he' in line 7 refers to __________. [1 mark]\n☐ Taki\n☐ Haru\n☐ the wild animal",
        options: ["Taki", "Haru", "the wild animal"],
        answer: "Haru",
        solution: {
          method: "Pronoun reference: trace 'he' in line 7.",
          steps: [
            "Line 7 (paragraph 2): 'As Haru went near a tree, HE realised that the sound was coming from a baby monkey…'",
            "'He' = HARU (who went near the tree).",
            "Answer: Haru.",
          ],
          tip: "Pronoun reference: 'As Haru went near a tree, he…' — the 'he' refers back to the last named male subject, which is Haru.",
        },
      },
      {
        qid: "cathhigh1-q37",
        question:
          "Which word in the sentence below has the same meaning as 'sadly'? Circle (A) or (B). [1 mark]\n\n'The monkey tapped miserably on the ground and stared weakly at the boys.'\n                              (A)                              (B)",
        options: ["(A) miserably", "(B) weakly"],
        answer: "A",
        solution: {
          method: "Synonym search: find the synonym of 'sadly'.",
          steps: [
            "'Sadly' = in an unhappy, sorrowful way.",
            "(A) 'miserably' = very unhappily, in a state of misery → SYNONYM of sadly. CORRECT.",
            "(B) 'weakly' = without strength → describes physical weakness, not sadness.",
            "Answer: (A) miserably.",
          ],
          tip: "Miserably = sadly, unhappily, wretchedly. Weakly = without physical strength. Don't confuse emotional state (miserably/sadly) with physical state (weakly).",
        },
      },
      {
        qid: "cathhigh1-q38",
        question:
          "TRUE or FALSE: Taki and Haru caught a wild boar before they found a monkey.",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'they decided to go home even though they were EMPTY-HANDED.'",
            "Empty-handed = caught NOTHING → they did NOT catch a wild boar.",
            "Statement says they caught a wild boar → FALSE.",
            "Answer: False.",
          ],
          tip: "'Empty-handed' = having caught or achieved nothing. They returned without catching any wild boars.",
        },
      },
      {
        qid: "cathhigh1-q39",
        question:
          "TRUE or FALSE: Koko was a well-behaved monkey.",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'Koko was a friendly but MISCHIEVOUS monkey. Sometimes, it would throw banana peels at passers-by.'",
            "'Mischievous' = naughty, causing trouble → NOT well-behaved.",
            "Statement: Koko was well-behaved → FALSE.",
            "Answer: False.",
          ],
          tip: "Mischievous = naughty, causing minor harm playfully. Throwing banana peels at people = NOT well-behaved.",
        },
      },
      {
        qid: "cathhigh1-q40",
        question:
          "Write 1, 2 and 3 in the blanks to indicate the order of events. [1 mark]\n___ The boys fed Koko.\n___ The boys taught Koko tricks.\n___ The boys treated Koko's injured paw.",
        answer:
          "The boys fed Koko: 1\nThe boys taught Koko tricks: 3\nThe boys treated Koko's injured paw: 2",
        solution: {
          method: "Sequence comprehension: paragraph 3 and 4.",
          steps: [
            "Paragraph 3: 'They gave it BANANAS TO EAT before treating its wound.' → Fed Koko FIRST (1).",
            "Then: 'treating its wound' = treated Koko's injured paw (2).",
            "Paragraph 4: 'trained it to pluck coconuts and TAUGHT IT SOME TRICKS' → taught tricks (3).",
            "Sequence: Fed (1) → Treated paw (2) → Taught tricks (3).",
          ],
          tip: "Keyword: 'before' tells you the order. 'They gave it bananas to eat BEFORE treating its wound' → bananas first, then treating wound.",
        },
      },
      {
        qid: "cathhigh1-q41",
        question:
          "Name two things that Koko did to earn money for the boys. [2 marks]\ni) ___\nii) ___",
        answer:
          "i) Koko plucked coconuts for the boys.\nii) Koko performed tricks for the villagers.",
        solution: {
          method: "Comprehension: paragraph 4 names TWO money-earning activities.",
          steps: [
            "Paragraph 4: 'The two boys trained it to PLUCK COCONUTS and taught it some TRICKS so that they could earn some extra money.'",
            "'Koko performed these tricks for the villagers and they were amused. Some even PAID Taki and Haru to get Koko to perform at village festivals.'",
            "Activity 1: Plucked coconuts.",
            "Activity 2: Performed tricks for the villagers (at village festivals).",
          ],
          tip: "2-mark answer = 2 distinct activities. Both must come from the passage. Write complete sentences for full marks.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION I — Comprehension Open-ended  (Q42–Q45, 8 marks)
  //  Passage: The Sad Peacock
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "cathhigh1-secI",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "The Sad Peacock (adapted from https://alltimeshortstories.com)",
    passageText:
      "A stunning peacock was dancing happily on a cool windy day. The weather was so pleasant that he started singing too. However, his rough voice sounded so horrible that he became very upset about not being able to sing well.\n\nAt that moment, a nightingale started singing near him. The melodious voice of the nightingale further dampened his spirit. He wondered why he had such a horrible voice while the nightingale had such a beautiful one. The peacock even stopped dancing as sadness filled him.\n\nA fairy appeared and noticed that the peacock who loved dancing was looking gloomy.\n\n'Why do you look so sad?' the fairy asked the peacock. 'Why don't I have a melodious voice just like the nightingale? It is unfair that I cannot sing as beautifully as the nightingale,' complained the peacock.\n\nThe fairy calmly replied, 'Everyone is special in his own way. We all have unique traits and talents that help us shine. The nightingale is blessed with a pleasant voice, but you are also blessed with your unique dancing talent.' The fairy reminded the peacock not to compare himself with others.\n\n'I understand now. I'll never be happy with myself if I keep comparing myself to others. Thank you for your advice,' said the peacock.\n\nThe peacock thought how silly he had been. 'I had been so busy comparing myself to others that I forgot I had my own unique talent.' He learnt that he should treasure what he has and shine in his own way.",
    questions: [
      {
        qid: "cathhigh1-q42",
        question:
          "What was the peacock doing at the start of the story? [2 marks]",
        answer:
          "The peacock was dancing happily and singing on a cool windy day.",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'A stunning peacock was DANCING HAPPILY on a cool windy day…he started SINGING too.'",
            "Two activities: dancing AND singing.",
            "Write a complete sentence including both.",
          ],
          tip: "2-mark question about what the peacock was doing: must include BOTH activities (dancing and singing) for full marks.",
        },
      },
      {
        qid: "cathhigh1-q43",
        question:
          "Which 3-word phrase in paragraph 2 shows that the peacock felt discouraged?",
        answer: "dampened his spirit",
        solution: {
          method: "Locate specific phrase in paragraph 2 showing discouragement.",
          steps: [
            "Paragraph 2: 'The melodious voice of the nightingale further DAMPENED HIS SPIRIT.'",
            "'Dampened his spirit' = reduced his enthusiasm/made him feel discouraged. CORRECT.",
            "Count: dampened (1) his (2) spirit (3) → exactly 3 words.",
            "Answer: dampened his spirit.",
          ],
          tip: "'Dampen someone's spirit' = reduce enthusiasm, make someone feel less hopeful or happy. It's a 3-word phrase in paragraph 2.",
        },
      },
      {
        qid: "cathhigh1-q44",
        question:
          "Who does the word 'you' in line 15 refer to? [2 marks]",
        answer: "The word 'you' refers to the peacock.",
        solution: {
          method: "Pronoun reference: line 15 in the passage.",
          steps: [
            "Line 15 (paragraph 5): 'The nightingale is blessed with a pleasant voice, but YOU are also blessed with your unique dancing talent.'",
            "The fairy is speaking TO the peacock → 'you' = the peacock.",
            "Answer: 'you' refers to the peacock.",
          ],
          tip: "In dialogue, 'you' refers to the person being spoken TO. The fairy is talking to the peacock → 'you' = peacock.",
        },
      },
      {
        qid: "cathhigh1-q45",
        question:
          "Why did the peacock feel that he was silly at the end? [2 marks]",
        answer:
          "The peacock felt silly because he had been comparing himself to others and forgot that he had his own unique talent of dancing.",
        solution: {
          method: "Inferential comprehension: paragraph 7.",
          steps: [
            "Paragraph 7: 'I had been so busy COMPARING MYSELF TO OTHERS that I forgot I had my own unique talent.'",
            "He felt silly because: (1) he wasted time comparing himself to others, and (2) he forgot his own unique dancing talent.",
            "Write as a complete cause-effect sentence.",
          ],
          tip: "For 'why' questions, look for the reason the character gives. The peacock's own words in paragraph 7 explain why he felt silly: comparing himself + forgetting his own talent.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const cathhigh2023Paper1 = { meta, questions };
export default cathhigh2023Paper1;
