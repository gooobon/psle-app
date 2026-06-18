// ============================================================
// RAFFLES GIRLS' PRIMARY SCHOOL
// 2025 END-OF-YEAR EXAMINATION — PRIMARY 3
// ENGLISH LANGUAGE PAPER 2
// Date: 23 October 2025  |  Total Time: 1 h 15 min
// Sections A–B: 16 marks  |  Sections C–F: 34 marks  |  Total: 50 marks
// ============================================================

import { QuestionSet } from '../../types';

const eoyRafflesGirlsPrimaryP2_2025: QuestionSet = {
  id: 'eoy_raffles_girls_primary_p2_2025',
  school: "Raffles Girls' Primary School",
  level: 'P3',
  year: 2025,
  exam: 'EOY',
  paper: 'Paper 2',
  subject: 'English',
  totalMarks: 50,
  duration: 75,

  questions: [

    // =========================================================
    // SECTION A: GRAMMAR MCQ (Questions 1–10) — 10 x 1 mark
    // =========================================================

    {
      id: 'rgps_p2_2025_q01',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 1,
      marks: 1,
      question: '"These books are ________. My parents bought them for my sister and me," said Paul.',
      options: ['his', 'hers', 'ours', 'theirs'],
      answer: 4,
      solution: {
        method: 'Pronoun reference and possession',
        steps: [
          'Identify whose books they are: bought for "my sister and me" = Paul\'s family.',
          '"These books are ___" → needs a possessive pronoun referring to Paul\'s parents / Paul\'s family.',
          'The parents bought the books for Paul and his sister → the books belong to (or were bought for) them.',
          '"Theirs" = belonging to "my sister and me" (the recipients) makes the most sense contextually — Paul is stating these books belong to them.',
          'Options 1 (his) and 2 (hers) are singular; option 3 (ours) would include the speaker AND addressee; "theirs" correctly refers to Paul and his sister.'
        ],
        tip: 'When the subject of a "to be" sentence uses a possessive pronoun, match it to the people or things mentioned as the owners/recipients.',
      },
    },

    {
      id: 'rgps_p2_2025_q02',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 2,
      marks: 1,
      question: 'There ________ a team of soccer players practising on the field yesterday.',
      options: ['is', 'are', 'was', 'were'],
      answer: 3,
      solution: {
        method: 'Subject-verb agreement with collective noun + past tense',
        steps: [
          'The subject is "a team" — a singular collective noun.',
          'Time clue: "yesterday" → past tense required.',
          'Singular subject + past tense → "was".',
          'Eliminate "is" and "are" (present tense); eliminate "were" (plural past).',
        ],
        tip: '"A team", "a group", "a flock" are singular collective nouns → use "was" in the past tense.',
      },
    },

    {
      id: 'rgps_p2_2025_q03',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 3,
      marks: 1,
      question: 'Would you like to pick ________ apples on the tree over there?',
      options: ['this', 'that', 'these', 'those'],
      answer: 4,
      solution: {
        method: 'Demonstrative adjective — number & distance',
        steps: [
          '"Apples" is plural → need a plural demonstrative adjective.',
          'Eliminate "this" (singular near) and "that" (singular far).',
          'The tree is "over there" = far away → use "those" (plural, far).',
          '"These" (plural, near) is incorrect because the tree is distant.',
        ],
        tip: 'Near + plural = these; Far + plural = those.',
      },
    },

    {
      id: 'rgps_p2_2025_q04',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 4,
      marks: 1,
      question: "She didn't eat lunch at school today, ________ she?",
      options: ['do', 'did', "don't", "didn't"],
      answer: 2,
      solution: {
        method: 'Question tag with negative statement',
        steps: [
          'The statement is negative ("didn\'t eat") → the question tag must be positive.',
          'The auxiliary in the main clause is "did" (past tense of "do").',
          'Positive tag using "did" → "did she?"',
          'Eliminate "do" (wrong tense), "don\'t" and "didn\'t" (negative tags are used with positive statements).',
        ],
        tip: 'Negative statement → positive tag. Match the tense and subject of the main clause.',
      },
    },

    {
      id: 'rgps_p2_2025_q05',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 5,
      marks: 1,
      question: 'The alarm clock rang and Judy got out of bed ________ to get ready for school.',
      options: ['quick', 'quickly', 'quicker', 'quickest'],
      answer: 2,
      solution: {
        method: 'Adverb vs adjective',
        steps: [
          '"Got out of bed" is a verb phrase → needs an adverb to modify how she got up.',
          'Adverb form of "quick" = "quickly".',
          '"Quick" is an adjective (modifies nouns); "quicker/quickest" are comparative/superlative adjectives.',
        ],
        tip: 'Adverbs modify verbs and usually end in "-ly". Use an adverb (quickly) to describe the manner of an action.',
      },
    },

    {
      id: 'rgps_p2_2025_q06',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 6,
      marks: 1,
      question: 'We stayed indoors to play board games ________ it was raining.',
      options: ['or', 'so', 'but', 'because'],
      answer: 4,
      solution: {
        method: 'Conjunction — cause and effect',
        steps: [
          'The first clause states an action (stayed indoors); the second clause gives the reason (raining).',
          '"Because" introduces a reason/cause.',
          '"So" introduces a result (reversed logic here); "but" introduces contrast; "or" introduces alternative.',
          'The rain caused them to stay indoors → "because" correctly shows this causal relationship.',
        ],
        tip: 'Use "because" when the second clause explains WHY the first clause happened.',
      },
    },

    {
      id: 'rgps_p2_2025_q07',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 7,
      marks: 1,
      question: 'The children ________ in the room when their parents came home.',
      options: ['study', 'studying', 'are studying', 'were studying'],
      answer: 4,
      solution: {
        method: 'Past continuous tense — ongoing action in the past',
        steps: [
          '"When their parents came home" → past time reference.',
          'The children\'s studying was an ongoing action interrupted by the parents coming home.',
          'Past continuous = "were studying" (was/were + verb-ing).',
          '"Study" and "are studying" are present; "studying" alone is not a complete verb.',
        ],
        tip: 'Use past continuous (was/were + -ing) for an action that was happening at a specific time in the past.',
      },
    },

    {
      id: 'rgps_p2_2025_q08',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 8,
      marks: 1,
      question: 'There was so ________ milk left in the refrigerator so I went to buy more.',
      options: ['few', 'little', 'many', 'much'],
      answer: 2,
      solution: {
        method: 'Quantifier — countable vs uncountable',
        steps: [
          '"Milk" is an uncountable noun.',
          'For uncountable nouns: use "little" (small amount) or "much" (large amount).',
          'The context says there was very little → "little" is correct.',
          '"Few" and "many" are for countable nouns; "much" would mean a large quantity (contradicts needing to buy more).',
        ],
        tip: '"Little/much" → uncountable nouns. "Few/many" → countable nouns. Use "little" for a small, insufficient quantity.',
      },
    },

    {
      id: 'rgps_p2_2025_q09',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 9,
      marks: 1,
      question: 'The dance performance will begin ________ noon on Saturday.',
      options: ['at', 'in', 'of', 'on'],
      answer: 1,
      solution: {
        method: 'Preposition of time',
        steps: [
          '"Noon" is a specific point in time.',
          'Use "at" for specific times (at noon, at 3 p.m., at midnight).',
          '"In" is used for months, years, seasons, and parts of the day (in the morning); "on" is used for days and dates.',
        ],
        tip: 'AT + specific time (at noon, at 6 o\'clock). ON + day/date. IN + month/year/part of day.',
      },
    },

    {
      id: 'rgps_p2_2025_q10',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 10,
      marks: 1,
      question: 'It was raining heavily just now and there was a wet umbrella at the gate. ________ must have left it there.',
      options: ['Nobody', 'Anybody', 'Somebody', 'Everybody'],
      answer: 3,
      solution: {
        method: 'Indefinite pronoun — logical inference',
        steps: [
          'The wet umbrella at the gate suggests a person left it there.',
          '"Nobody" means no one → contradicts the evidence of the umbrella.',
          '"Anybody" is used in questions/negatives.',
          '"Everybody" (everyone) is too broad.',
          '"Somebody" = an unspecified person → fits the deduction that an unknown person left it.',
        ],
        tip: 'Use "somebody/someone" to refer to an unknown or unspecified person in a positive statement.',
      },
    },

    // =========================================================
    // SECTION B: VOCABULARY MCQ (Questions 11–16) — 6 x 1 mark
    // =========================================================

    {
      id: 'rgps_p2_2025_q11',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 11,
      marks: 1,
      question: 'When someone helps you, it is important that you show ________ for their kindness.',
      options: ['trust', 'fairness', 'success', 'appreciation'],
      answer: 4,
      solution: {
        method: 'Context and word meaning',
        steps: [
          'The sentence is about responding to someone\'s kindness.',
          '"Appreciation" = gratitude, acknowledgment of kindness received.',
          '"Trust" = belief in reliability; "fairness" = treating people equally; "success" = achievement. None of these fit showing a response to kindness.',
        ],
        tip: 'Show "appreciation" when you are grateful for what someone has done for you.',
      },
    },

    {
      id: 'rgps_p2_2025_q12',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 12,
      marks: 1,
      question: 'A ________ of bees buzzed around the tree, filling the air with a humming sound.',
      options: ['pod', 'herd', 'swarm', 'gaggle'],
      answer: 3,
      solution: {
        method: 'Collective nouns for animals',
        steps: [
          'The sentence is about bees.',
          '"Swarm" is the collective noun for bees.',
          '"Pod" = whales/dolphins; "herd" = cattle/elephants; "gaggle" = geese.',
        ],
        tip: 'Collective nouns: a swarm of bees, a pod of whales, a herd of cattle, a gaggle of geese.',
      },
    },

    {
      id: 'rgps_p2_2025_q13',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 13,
      marks: 1,
      question: 'When Mike ________, crumbs and sauce end up all over the table, so he cleans them up with a paper towel.',
      options: ['eats like a slob', 'spills the beans', 'gulps like a fish', 'cries over spilt milk'],
      answer: 1,
      solution: {
        method: 'Idiom meaning and context',
        steps: [
          'The context describes messy eating (crumbs and sauce everywhere).',
          '"Eats like a slob" = eats in a very messy, untidy manner → matches the description perfectly.',
          '"Spills the beans" = reveals a secret; "gulps like a fish" is not a standard idiom; "cries over spilt milk" = worries about past mistakes. None match the context of messy eating.',
        ],
        tip: 'Idioms: "eats like a slob" = messy eating. Do not confuse with "spills the beans" (revealing secrets).',
      },
    },

    {
      id: 'rgps_p2_2025_q14',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 14,
      marks: 1,
      question: 'It is important to ________ your mistake and learn from it.',
      options: ['pick', 'realise', 'suggest', 'introduce'],
      answer: 2,
      solution: {
        method: 'Vocabulary in context',
        steps: [
          'The sentence talks about acknowledging a mistake before learning from it.',
          '"Realise" = to become aware of or understand something → fits the idea of recognising your mistake.',
          '"Pick your mistake" is meaningless; "suggest your mistake" is awkward; "introduce your mistake" does not make sense.',
        ],
        tip: '"Realise your mistake" = understand / acknowledge that you have made an error.',
      },
    },

    {
      id: 'rgps_p2_2025_q15',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 15,
      marks: 1,
      question: 'The bread has become ________ and we have to throw it away.',
      options: ['stale', 'faulty', 'damaged', 'miserable'],
      answer: 1,
      solution: {
        method: 'Vocabulary — food freshness',
        steps: [
          '"Stale" = (of food, especially bread/cake) no longer fresh, dry and unpleasant.',
          '"Faulty" = having a defect (used for objects/machines, not food typically).',
          '"Damaged" = physically harmed; "miserable" = very unhappy (used for people).',
          'The context of throwing away old bread clearly calls for "stale".',
        ],
        tip: '"Stale" is the word for food (especially bread) that is old and no longer fresh.',
      },
    },

    {
      id: 'rgps_p2_2025_q16',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 16,
      marks: 1,
      question: "When her friends are scared, Jane stays ________, always ready to help them.",
      options: [
        'as cold as ice',
        'as solid as a rock',
        'as light as a feather',
        'as timid as a mouse',
      ],
      answer: 2,
      solution: {
        method: 'Simile meaning and context',
        steps: [
          'Jane stays calm and reliable when her friends are scared → she is strong and dependable.',
          '"As solid as a rock" = very stable, reliable, and unwavering → matches Jane\'s character.',
          '"As cold as ice" = unfriendly or emotionally cold (negative connotation).',
          '"As light as a feather" = very light in weight.',
          '"As timid as a mouse" = very shy and fearful → opposite of helping friends.',
        ],
        tip: '"As solid as a rock" = very stable and dependable. Use this simile to describe someone calm and reliable under pressure.',
      },
    },

    // =========================================================
    // SECTION C: VOCABULARY CLOZE (Questions 17–24) — 8 x 1 mark
    // Passage: Strange Plants (Titan Arum, Pitcher Plant, Rafflesia, Sundew)
    // Word bank: attract(A) blooms(B) escape(C) funniest(D) help(E) nets(F)
    //            nutrients(G) prey(H) slippery(J) strangest(K) tastes(L) traps(M)
    // =========================================================

    {
      id: 'rgps_p2_2025_q17',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      setTitle: 'Vocabulary Cloze — Strange Plants',
      passageContext: `Some plants are not like the ones we see every day. The titan arum is one of the (17)________ plants in the world. It is known as the "corpse flower" because it smells like rotting meat when it (18)________. This strong and unpleasant smell usually attracts (19)________ that help it to spread its pollen grains. Another strange plant is the pitcher plant. It has deep, (20)________ leaves shaped like cups. Insects fall in and cannot (21)________. The Rafflesia is the world's largest flower. Like the titan arum, it also smells terrible to (22)________ insects. The sundew plant has sticky drops on its leaves, but these drops are actually (23)________. They are used to catch and digest insects to provide (24)________ the plant needs to grow well. These unusual plants show how clever nature can be at finding food.`,
      questionNumber: 17,
      marks: 1,
      question: 'The titan arum is one of the (17)________ plants in the world.',
      wordBank: {
        A: 'attract', B: 'blooms', C: 'escape', D: 'funniest',
        E: 'help', F: 'nets', G: 'nutrients', H: 'prey',
        J: 'slippery', K: 'strangest', L: 'tastes', M: 'traps',
      },
      answer: 'K',
      answerWord: 'strangest',
      solution: {
        method: 'Context — superlative adjective for an unusual plant',
        steps: [
          'The passage is about unusual plants.',
          'The titan arum is described as unusual ("not like the ones we see every day").',
          '"Strangest" (K) = most strange/unusual → correctly describes an extreme oddity.',
          '"Funniest" (D) doesn\'t fit — the plant is not described as amusing.',
        ],
        tip: 'Read the overall theme of the passage. "Strangest plants" echoes the topic sentence about plants that are different.',
      },
    },

    {
      id: 'rgps_p2_2025_q18',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 18,
      marks: 1,
      question: 'It is known as the "corpse flower" because it smells like rotting meat when it (18)________.',
      answer: 'B',
      answerWord: 'blooms',
      solution: {
        method: 'Context — when a flower produces its smell',
        steps: [
          'Flowers produce scent when they bloom (open/flower).',
          '"Blooms" (B) = when a flower opens/flowers.',
          'The smell occurs during flowering — this is scientifically accurate for the titan arum.',
        ],
        tip: 'Plants "bloom" when they flower. The titan arum\'s famous smell occurs when it blooms.',
      },
    },

    {
      id: 'rgps_p2_2025_q19',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 19,
      marks: 1,
      question: 'This strong and unpleasant smell usually attracts (19)________ that help it to spread its pollen grains.',
      answer: 'H',
      answerWord: 'prey',
      solution: {
        method: 'Context — what insects attracted by rotting smell are called',
        steps: [
          'The titan arum attracts insects with its rotten-meat smell.',
          'These insects are drawn to it as if it were their food source — they are "prey" to the plant\'s deception.',
          'In ecology, "prey" can also refer to organisms lured by a predator/plant.',
          '"Help" (E) or "nets" (F) do not make grammatical or semantic sense here.',
        ],
        tip: '"Prey" here means insects that are lured/attracted. The plant attracts "prey" (insects) using smell.',
      },
    },

    {
      id: 'rgps_p2_2025_q20',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 20,
      marks: 1,
      question: 'It has deep, (20)________ leaves shaped like cups.',
      answer: 'J',
      answerWord: 'slippery',
      solution: {
        method: 'Context — physical property that traps insects',
        steps: [
          'The pitcher plant traps insects in its cup-shaped leaves.',
          'For insects to fall in and be unable to escape, the inner surface must be "slippery".',
          '"Slippery" (J) = smooth and causes sliding → explains why insects cannot climb out.',
          'Other options (attract, nets, traps) don\'t function as adjectives describing a leaf texture.',
        ],
        tip: 'Pitcher plant leaves are slippery inside so insects cannot climb out after falling in.',
      },
    },

    {
      id: 'rgps_p2_2025_q21',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 21,
      marks: 1,
      question: 'Insects fall in and cannot (21)________.',
      answer: 'C',
      answerWord: 'escape',
      solution: {
        method: 'Context — trapped insects cannot get out',
        steps: [
          'After falling into the pitcher plant\'s slippery cup, insects are trapped.',
          '"Escape" (C) = to get free from a trap → "cannot escape" means they are stuck.',
          'All other options are nouns or verbs that don\'t fit grammatically or contextually here.',
        ],
        tip: '"Cannot escape" = cannot get out. This is the classic description of a carnivorous pitcher plant.',
      },
    },

    {
      id: 'rgps_p2_2025_q22',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 22,
      marks: 1,
      question: 'Like the titan arum, it also smells terrible to (22)________ insects.',
      answer: 'A',
      answerWord: 'attract',
      solution: {
        method: 'Context — purpose of the smell',
        steps: [
          'Just like the titan arum uses smell to draw in insects, the Rafflesia does the same.',
          '"Attract" (A) = to draw something towards; to lure.',
          '"Smells terrible to attract insects" = uses a bad smell as bait to lure insects.',
        ],
        tip: 'Carrion plants use foul smells to "attract" insects that mistake them for rotting food.',
      },
    },

    {
      id: 'rgps_p2_2025_q23',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 23,
      marks: 1,
      question: 'The sundew plant has sticky drops on its leaves, but these drops are actually (23)________.',
      answer: 'M',
      answerWord: 'traps',
      solution: {
        method: 'Context — the function of the sticky drops',
        steps: [
          'The sentence uses "but" to introduce a surprise — the sticky drops look harmless but are actually traps.',
          '"Traps" (M) = devices that catch things → the sticky drops trap insects.',
          '"Nets" (F) could work conceptually but "traps" is the exact function described.',
          'The next sentence confirms this: "They are used to catch and digest insects".',
        ],
        tip: 'The conjunction "but" signals a contrast or surprise. The harmless-looking drops are actually "traps".',
      },
    },

    {
      id: 'rgps_p2_2025_q24',
      type: 'B',
      topic: 'VocabCloze',
      setId: 'rgps_p2_2025_voccloze',
      questionNumber: 24,
      marks: 1,
      question: 'They are used to catch and digest insects to provide (24)________ the plant needs to grow well.',
      answer: 'G',
      answerWord: 'nutrients',
      solution: {
        method: 'Context — what plants get from food',
        steps: [
          'Carnivorous plants digest insects to get food value.',
          '"Nutrients" (G) = substances that plants (or animals) need to grow and stay healthy.',
          '"Help" (E) is not a noun that fits here; "prey" (H) is the insect, not what the plant gets from it.',
        ],
        tip: 'Plants get "nutrients" from digesting insects — this replaces what they cannot get from poor soil.',
      },
    },

    // =========================================================
    // SECTION D: GRAMMAR CLOZE (Questions 25–32) — 8 x 1 mark
    // TWO passages, 4 blanks each
    // =========================================================

    // --- Cloze Passage 1: Mother's Cooking (Q25–28) ---
    // Word bank: cook(A) cooked(B) cooking(C) cooks(D)
    //            has cooked(E) have cooked(F) is cooking(G) was cooking(H)

    {
      id: 'rgps_p2_2025_q25',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze1',
      setTitle: "Grammar Cloze 1 — Mother's Cooking",
      passageContext: `My mother loves spending time in the kitchen to prepare meals for our family. She usually (25)________ dinner every evening and we enjoy her dishes. Last Sunday, she (26)________ spicy chicken curry which was very delicious. For my father's birthday party next week, she plans to (27)________ a new dish she has found in a recipe book. Over the years, she is very proud of her (28)________. We always look forward to her dishes because they are tasty and nutritious.`,
      questionNumber: 25,
      marks: 1,
      question: 'She usually (25)________ dinner every evening and we enjoy her dishes.',
      wordBank: {
        A: 'cook', B: 'cooked', C: 'cooking', D: 'cooks',
        E: 'has cooked', F: 'have cooked', G: 'is cooking', H: 'was cooking',
      },
      answer: 'D',
      answerWord: 'cooks',
      solution: {
        method: 'Present simple — habitual action with "usually"',
        steps: [
          '"Usually" signals a habitual/regular action.',
          'Subject "she" is third-person singular → add -s to the verb.',
          'Present simple for habitual actions: "She usually cooks..."',
          'Eliminate past tense (B, H), present continuous (C, G), present perfect (E, F), and base form (A).',
        ],
        tip: '"Usually" + present simple. Third person singular needs the -s ending: cook → cooks.',
      },
    },

    {
      id: 'rgps_p2_2025_q26',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze1',
      questionNumber: 26,
      marks: 1,
      question: 'Last Sunday, she (26)________ spicy chicken curry which was very delicious.',
      answer: 'B',
      answerWord: 'cooked',
      solution: {
        method: 'Simple past tense — specific past time "Last Sunday"',
        steps: [
          '"Last Sunday" = a completed past event → use simple past tense.',
          'Simple past of "cook" = "cooked".',
          'Eliminate all present forms (A, C, D, G); past continuous (H) would imply an interrupted ongoing action; present perfect (E, F) can\'t follow "Last Sunday".',
        ],
        tip: '"Last Sunday/Monday/week/year" → always use simple past tense.',
      },
    },

    {
      id: 'rgps_p2_2025_q27',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze1',
      questionNumber: 27,
      marks: 1,
      question: "For my father's birthday party next week, she plans to (27)________ a new dish she has found in a recipe book.",
      answer: 'A',
      answerWord: 'cook',
      solution: {
        method: 'Infinitive after "plans to"',
        steps: [
          '"Plans to ___" requires a base form (infinitive without "to").',
          '"Plans to cook" = infinitive construction.',
          'After "to" (infinitive marker), always use the base form: cook, not cooks/cooked/cooking.',
        ],
        tip: 'After "to" (infinitive), always use the base form of the verb: "plans to cook", "wants to eat".',
      },
    },

    {
      id: 'rgps_p2_2025_q28',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze1',
      questionNumber: 28,
      marks: 1,
      question: 'Over the years, she is very proud of her (28)________.',
      answer: 'C',
      answerWord: 'cooking',
      solution: {
        method: 'Gerund as noun — "cooking" used as a thing she does',
        steps: [
          '"Proud of her ___" needs a noun.',
          '"Cooking" used as a gerund (verb-ing as noun) = the act/skill of cooking.',
          'This is common: "proud of her cooking, singing, dancing" → the activity as a concept.',
          'The other options here are verb forms, not appropriate nouns after "her".',
        ],
        tip: 'A gerund (-ing form) can function as a noun: "Her cooking is famous." "She is proud of her cooking."',
      },
    },

    // --- Cloze Passage 2: Samantha's Swimming Competition (Q29–32) ---
    // Word bank: but(A) for(B) from(C) or(D) so(E) until(F) when(G)

    {
      id: 'rgps_p2_2025_q29',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze2',
      setTitle: "Grammar Cloze 2 — Samantha's Swimming Competition",
      passageContext: `Samantha was going to take part in a swimming competition. She trained very hard in the pool (29)________ two hours daily to improve her speed. On the day of the race, she felt nervous (30)________ the moment she woke up to the start of the race. (31)________ the race started, her friends gathered by the poolside and cheered loudly to encourage her. During the race, Samantha felt very tired (32)________ she did not give up in order to complete it. She was thrilled with her performance as her hard work had paid off.`,
      questionNumber: 29,
      marks: 1,
      question: 'She trained very hard in the pool (29)________ two hours daily to improve her speed.',
      wordBank: {
        A: 'but', B: 'for', C: 'from', D: 'or', E: 'so', F: 'until', G: 'when',
      },
      answer: 'B',
      answerWord: 'for',
      solution: {
        method: 'Preposition of duration',
        steps: [
          '"Trained ... two hours daily" → indicates the duration of training.',
          'Use "for" to indicate a period/duration of time: "trained for two hours".',
          '"From" requires a starting point (from 9am); "until" requires an endpoint; others don\'t fit.',
        ],
        tip: '"For" + time period = duration. "She trained for two hours" = the training lasted two hours.',
      },
    },

    {
      id: 'rgps_p2_2025_q30',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze2',
      questionNumber: 30,
      marks: 1,
      question: 'On the day of the race, she felt nervous (30)________ the moment she woke up to the start of the race.',
      answer: 'C',
      answerWord: 'from',
      solution: {
        method: 'Preposition — starting point of a time range',
        steps: [
          '"From the moment she woke up to the start of the race" = a time range with a starting point and endpoint.',
          '"From ... to ..." = the standard construction for expressing a range.',
          '"From the moment she woke up" correctly identifies the starting point of her nervousness.',
        ],
        tip: '"From ... to ..." is used to express a time range: "from Monday to Friday", "from morning to night".',
      },
    },

    {
      id: 'rgps_p2_2025_q31',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze2',
      questionNumber: 31,
      marks: 1,
      question: '(31)________ the race started, her friends gathered by the poolside and cheered loudly.',
      answer: 'G',
      answerWord: 'when',
      solution: {
        method: 'Conjunction of time — simultaneous events',
        steps: [
          'Two events happen at the same time: the race starts AND friends gather to cheer.',
          '"When" introduces a time clause showing two simultaneous actions.',
          '"Until" (F) would mean the cheering happened right up to the start, not at the start.',
          '"But" (A) and "so" (E) are conjunctions for contrast/result, not time.',
        ],
        tip: '"When" connects two events that happen at the same time. "When the race started, her friends cheered."',
      },
    },

    {
      id: 'rgps_p2_2025_q32',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'rgps_p2_2025_gramcloze2',
      questionNumber: 32,
      marks: 1,
      question: 'During the race, Samantha felt very tired (32)________ she did not give up in order to complete it.',
      answer: 'A',
      answerWord: 'but',
      solution: {
        method: 'Conjunction — contrast/concession',
        steps: [
          'There is a clear contrast: she felt tired (negative) BUT she did not give up (positive).',
          '"But" introduces a contrasting clause.',
          '"So" (E) would mean the tiredness caused her to give up — the opposite of what happened.',
          '"Or" (D) introduces alternatives; "for" (B) introduces reasons.',
        ],
        tip: '"But" shows contrast: [negative situation] but [positive reaction]. Tired but persevered.',
      },
    },

    // =========================================================
    // SECTION E: OPEN-ENDED COMPREHENSION 1 (Questions 33–39)
    // Passage: The Patience Seed (Lina and her grandmother's seed)
    // Total: 8 marks
    // =========================================================

    {
      id: 'rgps_p2_2025_q33',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      setTitle: 'Comprehension 1 — The Patience Seed',
      passageContext: `Paragraph 1: Lina loved nature and enjoyed taking a walk in the garden. While her grandmother was arranging some flowers in a vase, she gave Lina a tiny seed and told her to plant it. Feeling excited, Lina placed the seed in a small pot. She covered it with soil, watered it gently and placed it near the window where there was a lot of sunlight.\n\nParagraph 2: Every morning, Lina checked the pot, hoping to see something. One week passed and the soil looked the same. Feeling worried, Lina asked her grandmother, "Grandma, why isn't the seed growing yet?" Her grandmother smiled warmly and replied, "Sometimes, good things take time to happen. With care and patience, a tiny seed can grow into something extraordinary."\n\nParagraph 3: Encouraged by her grandmother's words, Lina continued to care for the seed, believing that something magical would happen. She watered it daily and made sure it got sunlight.\n\nParagraph 4: One morning, Lina spotted a tiny green shoot pushing through the soil. She rushed to her grandmother and exclaimed, "Grandma! Look! It's finally growing!"\n\nParagraph 5: Lina took great care of the sprout. She was surprised when a beautiful pink flower bloomed after three weeks. Staring at her lovely plant, Lina felt extremely delighted as she finally understood what her grandmother had meant.\n\nAdapted from The Patience Seed by Mireia Gombau`,
      questionNumber: 33,
      marks: 1,
      question: 'Based on paragraph 1, where did Lina plant the tiny seed? Lina planted the tiny seed in a ______.',
      questionType: 'tick',
      options: ['pot', 'vase', 'garden'],
      answer: 'pot',
      solution: {
        method: 'Literal comprehension — locate specific detail',
        steps: [
          'Locate the relevant sentence in Paragraph 1: "Lina placed the seed in a small pot."',
          '"pot" is directly stated.',
          'The vase was used for flowers, not the seed; the garden is where Lina walked.',
        ],
        tip: 'Read the paragraph carefully. The answer is directly stated — "small pot".',
      },
    },

    {
      id: 'rgps_p2_2025_q34',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      questionNumber: 34,
      marks: 1,
      question: 'In paragraph 2, which word has the same meaning as "special"?',
      answer: 'extraordinary',
      solution: {
        method: 'Vocabulary — synonym from context',
        steps: [
          'The grandmother says: "a tiny seed can grow into something extraordinary."',
          '"Extraordinary" = very unusual, special, or remarkable.',
          'This is the synonym for "special" within paragraph 2.',
        ],
        tip: '"Extraordinary" = beyond ordinary = special/remarkable. Always quote the exact word from the passage.',
      },
    },

    {
      id: 'rgps_p2_2025_q35',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      questionNumber: 35,
      marks: 1,
      question: 'Lina felt worried when she did not see any changes to the seed at first. True or False?',
      answer: 'True',
      solution: {
        method: 'True/False — literal comprehension',
        steps: [
          'Paragraph 2: "Feeling worried, Lina asked her grandmother, \'Grandma, why isn\'t the seed growing yet?\'"',
          'Lina did feel worried when she saw no changes after one week → True.',
        ],
        tip: 'Find the sentence directly. "Feeling worried" confirms this is True.',
      },
    },

    {
      id: 'rgps_p2_2025_q36',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      questionNumber: 36,
      marks: 1,
      question: "Lina's grandmother told her to be patient because good things take time to happen. True or False?",
      answer: 'True',
      solution: {
        method: 'True/False — paraphrase check',
        steps: [
          'Grandmother\'s words (Paragraph 2): "Sometimes, good things take time to happen. With care and patience, a tiny seed can grow into something extraordinary."',
          'She explicitly says "patience" and "good things take time" → True.',
        ],
        tip: 'The grandmother\'s exact words confirm patience is the lesson. This is True.',
      },
    },

    {
      id: 'rgps_p2_2025_q37',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      questionNumber: 37,
      marks: 1,
      question: 'Lina cared for the seed and watered it every other day. True or False?',
      answer: 'False',
      solution: {
        method: 'True/False — precise detail check',
        steps: [
          'Paragraph 3: "She watered it daily..."',
          '"Daily" = every day, not "every other day" (every two days).',
          'The statement says "every other day" which is incorrect → False.',
        ],
        tip: '"Daily" ≠ "every other day". Read precisely — small differences in frequency change the meaning.',
      },
    },

    {
      id: 'rgps_p2_2025_q38',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      questionNumber: 38,
      marks: 1,
      question: 'How long did it take for the flower to bloom after Lina saw the sprout?',
      answer: '3 weeks',
      solution: {
        method: 'Literal comprehension — time detail',
        steps: [
          'Paragraph 5: "She was surprised when a beautiful pink flower bloomed after three weeks."',
          'The answer is directly stated: three weeks (after seeing the sprout).',
        ],
        tip: 'Time details are usually stated explicitly. Quote or closely paraphrase: "three weeks" or "3 weeks".',
      },
    },

    {
      id: 'rgps_p2_2025_q39',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp1',
      questionNumber: 39,
      marks: 2,
      question: 'In paragraph 5, list two feelings that Lina felt when her flower bloomed.',
      answer: ['She was extremely delighted.', 'She was surprised.'],
      solution: {
        method: 'Literal comprehension — identifying emotions from text',
        steps: [
          'Paragraph 5: "Lina felt extremely delighted" (emotion 1) and "She was surprised" (emotion 2).',
          'Both feelings are explicitly stated in the passage.',
          'Quote the exact words from the text for full marks.',
        ],
        tip: 'When asked to "list", pull directly from the text. Two distinct emotions: surprised + delighted.',
      },
    },

    // =========================================================
    // SECTION F: OPEN-ENDED COMPREHENSION 2 (Questions 40–48)
    // Passage: Library Lion (adapted from Library Lion by Michelle Knudsen)
    // Total: 10 marks
    // =========================================================

    {
      id: 'rgps_p2_2025_q40',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      setTitle: 'Comprehension 2 — Library Lion',
      passageContext: `Paragraph 1: In a quiet town, there was a special lion who loved to visit the library. One day, the lion walked into the library and the librarian, Miss Merry, was astonished. The lion loved to listen to stories.\n\nParagraph 2: Soon, he became friends with the librarian and the children who came to read books. Every day, he dusted the books diligently and helped the children to reach books on the highest shelves. Then he curled up in his favourite corner to wait for story hour to begin. The lion was allowed to stay in the library if he followed the rules. He obeyed the rules by walking softly and remaining quiet.\n\nParagraph 3: One day, Miss Merry slipped and fell while reaching for a book. She hurt her leg and needed help. The lion knew he had to do something. Even though roaring and running were against the rules, he ran to Miss Merry and let out the loudest roar to get everyone's attention. His roar alerted others to come to her rescue quickly.\n\nParagraph 4: After that, the lion left the library as he knew he had broken the library rules. The lion sat outside the library sadly, peering in through the glass doors. Everyone missed him dearly. The lion was loved by everyone in the library.\n\nParagraph 5: The next day, there was a new library rule: No roaring or running allowed, unless for a very good reason. When the lion returned to the library, the children were overjoyed and hugged him tightly. Miss Merry thanked him profusely for helping her.\n\nAdapted from Library Lion by Michelle Knudsen`,
      questionNumber: 40,
      marks: 1,
      question: 'In paragraph 1, which word has the same meaning as "peaceful"?',
      answer: 'quiet',
      solution: {
        method: 'Vocabulary — synonym within paragraph',
        steps: [
          'Paragraph 1 begins: "In a quiet town..."',
          '"Quiet" = calm and peaceful → synonym for "peaceful".',
          'The answer is the first word in paragraph 1.',
        ],
        tip: '"Quiet" and "peaceful" both describe a calm, undisturbed state. Always scan the paragraph for synonyms.',
      },
    },

    {
      id: 'rgps_p2_2025_q41',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 41,
      marks: 1,
      question: 'Why did the lion love going to the library? He loved ________.',
      questionType: 'tick',
      options: [
        'listening to stories',
        'reading books to the children',
        'reaching for the books on the middle shelves for the children',
      ],
      answer: 'listening to stories',
      solution: {
        method: 'Literal comprehension — reason stated in paragraph 1',
        steps: [
          'Paragraph 1: "The lion loved to listen to stories."',
          'This is directly stated. Not reading books to children (he helped them reach books, but this wasn\'t why he loved the library).',
          'He helped reach books on the HIGHEST shelves (not middle shelves).',
        ],
        tip: 'Always check the exact reason given in the passage. "The lion loved to listen to stories" is directly stated.',
      },
    },

    {
      id: 'rgps_p2_2025_q42',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 42,
      marks: 1,
      question: 'Which sentence in paragraph 2 shows you that the lion obeyed the library rules?',
      answer: 'He obeyed the rules by walking softly and remaining quiet.',
      solution: {
        method: 'Literal comprehension — identify evidence sentence',
        steps: [
          'The question asks for the specific sentence showing obedience.',
          'Paragraph 2: "He obeyed the rules by walking softly and remaining quiet."',
          'Quote this sentence in full for the mark.',
        ],
        tip: 'Quote the exact sentence from the passage. The word "obeyed" is your key word to locate it.',
      },
    },

    {
      id: 'rgps_p2_2025_q43',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 43,
      marks: 1,
      question: 'The lion was eager to listen to stories during story hour. True or False? Give a reason.',
      answer: 'True',
      answerReason: 'He curled up in his favourite corner to wait for story hour to begin.',
      solution: {
        method: 'True/False with evidence',
        steps: [
          'Paragraph 2: "Then he curled up in his favourite corner to wait for story hour to begin."',
          'Curling up in his favourite corner to WAIT for story hour shows eagerness/anticipation → True.',
          'State the reason by quoting the relevant sentence.',
        ],
        tip: 'Waiting eagerly in his corner shows anticipation. Quote the sentence as the reason.',
      },
    },

    {
      id: 'rgps_p2_2025_q44',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 44,
      marks: 1,
      question: 'The librarian shouted for help to get everyone\'s attention. True or False? Give a reason.',
      answer: 'False',
      answerReason: 'The lion let out the loudest roar to get everyone\'s attention.',
      solution: {
        method: 'True/False — identifying who took the action',
        steps: [
          'Paragraph 3: "he ran to Miss Merry and let out the loudest roar to get everyone\'s attention."',
          'It was THE LION who roared, not the librarian who shouted.',
          'Miss Merry was injured and needed help — she could not shout for help.',
          'Statement is False.',
        ],
        tip: 'Identify the subject of each action. The lion roared — not the librarian. Statement is False.',
      },
    },

    {
      id: 'rgps_p2_2025_q45',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 45,
      marks: 1,
      question: 'The lion left the library because he was mean to the children. True or False? Give a reason.',
      answer: 'False',
      answerReason: 'The lion left the library as he knew he had broken the library rules.',
      solution: {
        method: 'True/False — understanding motivation',
        steps: [
          'Paragraph 4: "the lion left the library as he knew he had broken the library rules."',
          'The lion left because he broke the rules by roaring — not because he was mean.',
          'In fact, he broke the rules to HELP Miss Merry, which is the opposite of being mean.',
          'Statement is False.',
        ],
        tip: 'The reason for leaving was rule-breaking, not meanness. Find the exact reason in paragraph 4.',
      },
    },

    {
      id: 'rgps_p2_2025_q46',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 46,
      marks: 1,
      question: 'Write 1, 2 and 3 in the boxes to indicate the order in which the events occurred in the passage.',
      questionType: 'sequencing',
      items: [
        'The librarian fell and hurt her leg in the library.',
        'A new library rule was introduced.',
        'The lion became friends with the librarian and the children.',
      ],
      answer: '2 – 3 – 1',
      answerDetail: {
        'The librarian fell and hurt her leg in the library.': 2,
        'A new library rule was introduced.': 3,
        'The lion became friends with the librarian and the children.': 1,
      },
      solution: {
        method: 'Sequencing — narrative order',
        steps: [
          'Event 1 (first in story): The lion became friends with the librarian and children (Paragraph 2).',
          'Event 2 (next): The librarian fell and hurt her leg (Paragraph 3).',
          'Event 3 (last): A new library rule was introduced (Paragraph 5).',
          'Order: Lion made friends (1) → Librarian fell (2) → New rule introduced (3).',
        ],
        tip: 'Sequence events by their paragraph numbers: Paragraph 2 → Paragraph 3 → Paragraph 5.',
      },
    },

    {
      id: 'rgps_p2_2025_q47',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 47,
      marks: 1,
      question: 'Based on the passage, which adjective best describes the lion?',
      questionType: 'tick',
      options: ['playful', 'helpful', 'bashful'],
      answer: 'helpful',
      solution: {
        method: 'Character inference',
        steps: [
          'The lion dusted books, helped children reach high shelves, and roared to save Miss Merry.',
          'All these actions show the lion was "helpful".',
          '"Playful" = fond of playing — not the main characteristic shown.',
          '"Bashful" = shy — the lion was confident and sociable.',
        ],
        tip: 'Choose the adjective that best fits ALL the lion\'s actions throughout the story. "Helpful" is the consistent theme.',
      },
    },

    {
      id: 'rgps_p2_2025_q48',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'rgps_p2_2025_comp2',
      questionNumber: 48,
      marks: 2,
      question: 'Give two ways the librarian and the children welcomed the lion back to the library.',
      answer: [
        '(i) The children were overjoyed and hugged him tightly.',
        '(ii) Miss Merry thanked him profusely for helping her.',
      ],
      solution: {
        method: 'Literal comprehension — identify two actions',
        steps: [
          'Paragraph 5: "the children were overjoyed and hugged him tightly" (way 1).',
          'Paragraph 5: "Miss Merry thanked him profusely for helping her" (way 2).',
          'Give one mark for each correct answer (2 marks total).',
        ],
        tip: 'Both answers are in the same paragraph. Quote or closely paraphrase the exact actions.',
      },
    },

  ], // end questions
};

export default eoyRafflesGirlsPrimaryP2_2025;
