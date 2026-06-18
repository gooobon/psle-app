// =============================================================================
// Maha Bodhi School – 2023 Semestral Assessment 2 (SA2)
// English Language  |  Paper 2 Booklet B  |  Primary 3
// Total Duration (A + B): 1h 20 min   |  Booklet B Max Marks: 30
// Section D: Grammar Cloze  – Passage 1 (Q21–23, verb forms, 3m)
//                           – Passage 2 (Q24–27, pronouns, 4m)
// Section E: Vocabulary Cloze (Q28–32, 5m) – Desert Animals
// Section F: Comprehension Cloze (Q33–37, 5m) – Pablo Picasso
// Section G: Sentence Manipulation – Combining (Q38–40, 3m)
// Section H: Comprehension Open-Ended (Q41–46b, 10m) – Bear in the Family
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_mahabodhi_p2b_2023: QuestionSet = {
  id: "eoy_mahabodhi_p2b_2023",
  school: "Maha Bodhi School",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2 Booklet B",
  totalMarks: 30,
  duration: 80,
  questions: [

    // =========================================================================
    // SECTION D: GRAMMAR CLOZE  Passage 1 (Q21–23) – Verb Forms
    // Word bank: hurt / hurting / hurts / is hurting / was hurting / is hurt
    // Passage: Alice at the beach steps on a clam (Ana and the Sea Star)
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2b_2023_q21",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 21,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Alice at the Beach",
      passage:
        "That morning, Alice was warily walking on the warm sand. She watched her step as she did not want to (21) ______ any sea stars washed ashore. Soon, her father called out to her to have breakfast together.\n\nWhile making her way back, Alice accidentally stepped on a sharp clam. She cried out, \"Ouch! It (22) ______!\" Alice's father ran over. When he saw that her foot (23) ______ badly, he took her to the clinic immediately. What an unlucky day!\n\n(Adapted from Ana and the Sea Star by R. Lynne Roelfs)",
      wordBank: ["hurt", "hurting", "hurts", "is hurting", "was hurting", "is hurt"],
      question: "She watched her step as she did not want to (21) ______ any sea stars washed ashore.",
      answer: "hurt",
      solution: {
        method: "Infinitive after 'to' – base form of verb",
        steps: [
          "Structure: 'did not want to ______'",
          "After 'to' (infinitive marker), we always use the base form of the verb.",
          "'to hurt' = to cause harm/injury to something.",
          "→ Answer: hurt (base form after 'to')",
        ],
        tip: "After 'to' (as infinitive marker), always use the BASE form: to hurt, to run, to eat.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q22",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 22,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Alice at the Beach",
      passage:
        "That morning, Alice was warily walking on the warm sand. She watched her step as she did not want to (21) ______ any sea stars washed ashore. Soon, her father called out to her to have breakfast together.\n\nWhile making her way back, Alice accidentally stepped on a sharp clam. She cried out, \"Ouch! It (22) ______!\" Alice's father ran over. When he saw that her foot (23) ______ badly, he took her to the clinic immediately. What an unlucky day!\n\n(Adapted from Ana and the Sea Star by R. Lynne Roelfs)",
      wordBank: ["hurt", "hurting", "hurts", "is hurting", "was hurting", "is hurt"],
      question: "She cried out, \"Ouch! It (22) ______!\"",
      answer: "hurts",
      solution: {
        method: "Present simple – describing current ongoing pain",
        steps: [
          "Alice just stepped on the clam and is exclaiming about current pain.",
          "She is expressing pain happening RIGHT NOW in the moment of speech.",
          "'It hurts!' = it is causing pain right now (present tense, third person singular).",
          "'Hurts' = present simple, third person singular of 'hurt'.",
          "→ Answer: hurts",
        ],
        tip: "Exclamations about current pain use present simple: 'It hurts!' not 'It is hurting!'",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q23",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 23,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Alice at the Beach",
      passage:
        "That morning, Alice was warily walking on the warm sand. She watched her step as she did not want to (21) ______ any sea stars washed ashore. Soon, her father called out to her to have breakfast together.\n\nWhile making her way back, Alice accidentally stepped on a sharp clam. She cried out, \"Ouch! It (22) ______!\" Alice's father ran over. When he saw that her foot (23) ______ badly, he took her to the clinic immediately. What an unlucky day!\n\n(Adapted from Ana and the Sea Star by R. Lynne Roelfs)",
      wordBank: ["hurt", "hurting", "hurts", "is hurting", "was hurting", "is hurt"],
      question: "When he saw that her foot (23) ______ badly, he took her to the clinic immediately.",
      answer: "was hurting",
      solution: {
        method: "Past progressive – ongoing condition at a past moment",
        steps: [
          "'When he saw' = a past moment when the father observed Alice's foot.",
          "At that past moment, the foot was in the process of hurting (ongoing state).",
          "Past progressive: 'was hurting' describes a condition ongoing at a past time.",
          "→ Answer: was hurting",
        ],
        tip: "'When he saw that her foot WAS HURTING' = the pain was in progress at the past moment he saw it.",
      },
    },

    // =========================================================================
    // SECTION D: GRAMMAR CLOZE  Passage 2 (Q24–27) – Pronouns
    // Word bank: her / me / them / he / they / she
    // Passage: Scaredy Monster can't sleep; calls his mum. (Scaredy Monster)
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2b_2023_q24",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 24,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Scaredy Monster",
      passage:
        "That night, like any other night, Scaredy Monster climbed into his bed. (24) ______ tossed and turned but could not fall asleep.\n\n\"Mum! Please come here!\" Scaredy called for his mother. Soon, (25) ______ sat by Scaredy and asked what was wrong. Scaredy replied, \"I don't know why it is so hard for (26) ______ to fall asleep.\" Scaredy's mother promised him that there were no more children under the bed and (27) ______ were long gone. The last one had truly terrified him!\n\n(Adapted from Scaredy Monster and the Bad Dream by Meika Hashimoto)",
      wordBank: ["her", "me", "them", "he", "they", "she"],
      question: "(24) ______ tossed and turned but could not fall asleep.",
      answer: "He",
      solution: {
        method: "Pronoun reference – singular male subject pronoun",
        steps: [
          "The subject of the sentence refers to Scaredy Monster.",
          "Scaredy Monster is male (referred to as 'his' in previous sentence).",
          "Subject pronoun for a male = 'he'.",
          "→ Answer: He",
        ],
        tip: "Scaredy Monster = male character. Subject pronoun: he tossed and turned.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q25",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 25,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Scaredy Monster",
      passage:
        "That night, like any other night, Scaredy Monster climbed into his bed. (24) ______ tossed and turned but could not fall asleep.\n\n\"Mum! Please come here!\" Scaredy called for his mother. Soon, (25) ______ sat by Scaredy and asked what was wrong. Scaredy replied, \"I don't know why it is so hard for (26) ______ to fall asleep.\" Scaredy's mother promised him that there were no more children under the bed and (27) ______ were long gone. The last one had truly terrified him!\n\n(Adapted from Scaredy Monster and the Bad Dream by Meika Hashimoto)",
      wordBank: ["her", "me", "them", "he", "they", "she"],
      question: "Soon, (25) ______ sat by Scaredy and asked what was wrong.",
      answer: "she",
      solution: {
        method: "Pronoun reference – singular female subject pronoun",
        steps: [
          "Scaredy called for 'his mother'. She came and sat by him.",
          "'His mother' = female person → subject pronoun = 'she'.",
          "→ Answer: she",
        ],
        tip: "His mother = female = she. Subject pronoun for female: she.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q26",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 26,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Scaredy Monster",
      passage:
        "That night, like any other night, Scaredy Monster climbed into his bed. (24) ______ tossed and turned but could not fall asleep.\n\n\"Mum! Please come here!\" Scaredy called for his mother. Soon, (25) ______ sat by Scaredy and asked what was wrong. Scaredy replied, \"I don't know why it is so hard for (26) ______ to fall asleep.\" Scaredy's mother promised him that there were no more children under the bed and (27) ______ were long gone. The last one had truly terrified him!\n\n(Adapted from Scaredy Monster and the Bad Dream by Meika Hashimoto)",
      wordBank: ["her", "me", "them", "he", "they", "she"],
      question: "\"I don't know why it is so hard for (26) ______ to fall asleep.\"",
      answer: "me",
      solution: {
        method: "Pronoun reference – first person object pronoun",
        steps: [
          "Scaredy is speaking about himself ('I don't know...').",
          "'For ______ to fall asleep' = talking about himself in the object position.",
          "Object pronoun for 'I' (speaker) = 'me'.",
          "→ Answer: me",
        ],
        tip: "I → me (object form). 'It is hard for ME' = Scaredy talking about himself as the object.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q27",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 27,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Scaredy Monster",
      passage:
        "That night, like any other night, Scaredy Monster climbed into his bed. (24) ______ tossed and turned but could not fall asleep.\n\n\"Mum! Please come here!\" Scaredy called for his mother. Soon, (25) ______ sat by Scaredy and asked what was wrong. Scaredy replied, \"I don't know why it is so hard for (26) ______ to fall asleep.\" Scaredy's mother promised him that there were no more children under the bed and (27) ______ were long gone. The last one had truly terrified him!\n\n(Adapted from Scaredy Monster and the Bad Dream by Meika Hashimoto)",
      wordBank: ["her", "me", "them", "he", "they", "she"],
      question: "…there were no more children under the bed and (27) ______ were long gone.",
      answer: "they",
      solution: {
        method: "Pronoun reference – plural subject pronoun",
        steps: [
          "The mother says 'no more children under the bed and _____ were long gone.'",
          "The blank refers to 'the children' (plural, third person).",
          "Subject pronoun for plural = 'they'.",
          "'They were long gone' = the children had already left.",
          "→ Answer: they",
        ],
        tip: "Children (plural) → they (subject) / them (object). 'They were gone' = subject position.",
      },
    },

    // =========================================================================
    // SECTION E: VOCABULARY CLOZE  Q28–32  (5 × 1m = 5m)
    // Word bank: store / cold / sunny / survive / adapt / sleeping / exploring / escape
    // Passage: How desert/cold-weather animals adapt (Bobbie Kalman)
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2b_2023_q28",
      type: "B",
      topic: "VocabCloze",
      qNumber: 28,
      marks: 1,
      passageTitle: "Vocabulary Cloze – How Animals Adapt",
      passage:
        "Deserts are dry places with little rain. They are so dry that animals that live there must learn to (28) ______ in order to stay alive. Camels, for example, (29) ______ fat in their humps and this provides them with energy. Some animals, like beetles, stay in holes to stay out of the sun.\n\nSome animals survive in (30) ______ places for all or part of the year. Changes to their body or behaviour keep them warm. For instance, the snow leopard has thick fur for obvious reasons. Another example is the bear that hibernates by (31) ______ during much of winter. It wakes up only on warm days to stretch or look for food.\n\nOther animals migrate to other places to (32) ______ the cold weather or find food and water. Sometimes, animals lose their homes and must find another one for themselves.\n\n(Adapted from How and Why do Animals Adapt by Bobbie Kalman)",
      wordBank: ["store", "cold", "sunny", "survive", "adapt", "sleeping", "exploring", "escape"],
      question: "They are so dry that animals that live there must learn to (28) ______ in order to stay alive.",
      answer: "adapt",
      solution: {
        method: "Vocabulary in context – thematic word choice",
        steps: [
          "The sentence is about what animals must do to stay alive in dry deserts.",
          "'In order to stay alive' = the purpose of what they must learn.",
          "'Adapt' = to change to suit new/difficult conditions.",
          "Animals 'adapt' to survive in harsh environments.",
          "→ Answer: adapt",
        ],
        tip: '"Adapt" = change to suit your environment. Desert animals adapt to survive the heat and dryness.',
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q29",
      type: "B",
      topic: "VocabCloze",
      qNumber: 29,
      marks: 1,
      passageTitle: "Vocabulary Cloze – How Animals Adapt",
      passage:
        "Deserts are dry places with little rain. They are so dry that animals that live there must learn to (28) ______ in order to stay alive. Camels, for example, (29) ______ fat in their humps and this provides them with energy. Some animals, like beetles, stay in holes to stay out of the sun.\n\nSome animals survive in (30) ______ places for all or part of the year. Changes to their body or behaviour keep them warm. For instance, the snow leopard has thick fur for obvious reasons. Another example is the bear that hibernates by (31) ______ during much of winter. It wakes up only on warm days to stretch or look for food.\n\nOther animals migrate to other places to (32) ______ the cold weather or find food and water. Sometimes, animals lose their homes and must find another one for themselves.\n\n(Adapted from How and Why do Animals Adapt by Bobbie Kalman)",
      wordBank: ["store", "cold", "sunny", "survive", "adapt", "sleeping", "exploring", "escape"],
      question: "Camels, for example, (29) ______ fat in their humps and this provides them with energy.",
      answer: "store",
      solution: {
        method: "Vocabulary in context – animal fact",
        steps: [
          "Camels are famous for using their humps to hold reserves of fat.",
          "'This provides them with energy' = the fat stored is used for energy.",
          "'Store' = to keep for future use.",
          "Camels STORE fat in their humps.",
          "→ Answer: store",
        ],
        tip: "Camels STORE fat (not water) in their humps. 'Store' = to save for later use.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q30",
      type: "B",
      topic: "VocabCloze",
      qNumber: 30,
      marks: 1,
      passageTitle: "Vocabulary Cloze – How Animals Adapt",
      passage:
        "Deserts are dry places with little rain. They are so dry that animals that live there must learn to (28) ______ in order to stay alive. Camels, for example, (29) ______ fat in their humps and this provides them with energy. Some animals, like beetles, stay in holes to stay out of the sun.\n\nSome animals survive in (30) ______ places for all or part of the year. Changes to their body or behaviour keep them warm. For instance, the snow leopard has thick fur for obvious reasons. Another example is the bear that hibernates by (31) ______ during much of winter. It wakes up only on warm days to stretch or look for food.\n\nOther animals migrate to other places to (32) ______ the cold weather or find food and water. Sometimes, animals lose their homes and must find another one for themselves.\n\n(Adapted from How and Why do Animals Adapt by Bobbie Kalman)",
      wordBank: ["store", "cold", "sunny", "survive", "adapt", "sleeping", "exploring", "escape"],
      question: "Some animals survive in (30) ______ places for all or part of the year. Changes to their body or behaviour keep them WARM.",
      answer: "cold",
      solution: {
        method: "Vocabulary in context – logical opposite clue",
        steps: [
          "The paragraph gives examples of snow leopards and hibernating bears.",
          "These are animals that live in cold climates.",
          "Clue: 'Changes to their body or behaviour keep them WARM' → they need to stay warm because it's cold.",
          "'Cold places' = environments like snowy mountains or freezing winters.",
          "→ Answer: cold",
        ],
        tip: "Clue: 'keep them warm' → the environment must be COLD; animals adapt to stay warm.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q31",
      type: "B",
      topic: "VocabCloze",
      qNumber: 31,
      marks: 1,
      passageTitle: "Vocabulary Cloze – How Animals Adapt",
      passage:
        "Deserts are dry places with little rain. They are so dry that animals that live there must learn to (28) ______ in order to stay alive. Camels, for example, (29) ______ fat in their humps and this provides them with energy. Some animals, like beetles, stay in holes to stay out of the sun.\n\nSome animals survive in (30) ______ places for all or part of the year. Changes to their body or behaviour keep them warm. For instance, the snow leopard has thick fur for obvious reasons. Another example is the bear that hibernates by (31) ______ during much of winter. It wakes up only on warm days to stretch or look for food.\n\nOther animals migrate to other places to (32) ______ the cold weather or find food and water. Sometimes, animals lose their homes and must find another one for themselves.\n\n(Adapted from How and Why do Animals Adapt by Bobbie Kalman)",
      wordBank: ["store", "cold", "sunny", "survive", "adapt", "sleeping", "exploring", "escape"],
      question: "Another example is the bear that hibernates by (31) ______ during much of winter.",
      answer: "sleeping",
      solution: {
        method: "Vocabulary in context – what hibernation means",
        steps: [
          "'Hibernates' means to spend the winter in a state of deep sleep.",
          "The blank follows 'by' → preposition + -ing form.",
          "'Hibernates by sleeping' = the bear hibernates by sleeping.",
          "'It wakes up only on warm days' confirms the bear is asleep most of winter.",
          "→ Answer: sleeping",
        ],
        tip: "Hibernation = extended sleep in winter. 'Hibernates by sleeping' = the method of hibernation.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q32",
      type: "B",
      topic: "VocabCloze",
      qNumber: 32,
      marks: 1,
      passageTitle: "Vocabulary Cloze – How Animals Adapt",
      passage:
        "Deserts are dry places with little rain. They are so dry that animals that live there must learn to (28) ______ in order to stay alive. Camels, for example, (29) ______ fat in their humps and this provides them with energy. Some animals, like beetles, stay in holes to stay out of the sun.\n\nSome animals survive in (30) ______ places for all or part of the year. Changes to their body or behaviour keep them warm. For instance, the snow leopard has thick fur for obvious reasons. Another example is the bear that hibernates by (31) ______ during much of winter. It wakes up only on warm days to stretch or look for food.\n\nOther animals migrate to other places to (32) ______ the cold weather or find food and water. Sometimes, animals lose their homes and must find another one for themselves.\n\n(Adapted from How and Why do Animals Adapt by Bobbie Kalman)",
      wordBank: ["store", "cold", "sunny", "survive", "adapt", "sleeping", "exploring", "escape"],
      question: "Other animals migrate to other places to (32) ______ the cold weather or find food and water.",
      answer: "escape",
      solution: {
        method: "Vocabulary in context – reason for migration",
        steps: [
          "Animals MIGRATE = move to different places seasonally.",
          "The reason is 'to _____ the cold weather' = to avoid/get away from cold.",
          "'Escape' = to get free from or avoid something unpleasant.",
          "'Escape the cold weather' = move away to avoid cold conditions.",
          "→ Answer: escape",
        ],
        tip: '"Escape" = get away from something unpleasant. Animals migrate to escape cold weather.',
      },
    },

    // =========================================================================
    // SECTION F: COMPREHENSION CLOZE  Q33–37  (5 × 1m = 5m)
    // Passage: Pablo Picasso (adapted from Pablo Picasso by Darice Bailer)
    // Open-ended fill-in-the-blank (no word bank)
    // Answers from key: Q33=School, Q34=Come, Q35=Later, Q36=Brighter, Q37=Best
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2b_2023_q33",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 33,
      marks: 1,
      passageTitle: "Comprehension Cloze – Pablo Picasso",
      passage:
        "Pablo Picasso was one of the most famous and talented artists of the 1900s. When he showed interest in art as a child, his father took him to an art (33) ______. At first, Picasso painted like the experts but later, he used his creativity to (34) ______ up with new ideas.\n\nWhen Picasso's friend died in 1901, Picasso expressed his sadness by painting pictures of sad people in shades of blue. This time became known as his Blue Period. A few years (35) ______, he began painting clowns and jugglers he saw at the circus. He felt happier and used (36) ______ colours than the ones before.\n\nTimes changed. Picasso did his (37) ______ to be unique as he did not want to be the same as the other artists. He created the Cubism art style where shapes are used in paintings. This is still admired to this day.\n\n(Adapted from Pablo Picasso by Darice Bailer)",
      question: "…his father took him to an art (33) ______.",
      answer: "school",
      solution: {
        method: "Comprehension cloze – inferring context",
        steps: [
          "Picasso's father took him to an 'art ______' to develop his interest in art.",
          "A place for learning art is an 'art school'.",
          "→ Answer: school",
        ],
        tip: "An 'art school' is where people go to learn and study art professionally.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q34",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 34,
      marks: 1,
      passageTitle: "Comprehension Cloze – Pablo Picasso",
      passage:
        "Pablo Picasso was one of the most famous and talented artists of the 1900s. When he showed interest in art as a child, his father took him to an art (33) ______. At first, Picasso painted like the experts but later, he used his creativity to (34) ______ up with new ideas.\n\nWhen Picasso's friend died in 1901, Picasso expressed his sadness by painting pictures of sad people in shades of blue. This time became known as his Blue Period. A few years (35) ______, he began painting clowns and jugglers he saw at the circus. He felt happier and used (36) ______ colours than the ones before.\n\nTimes changed. Picasso did his (37) ______ to be unique as he did not want to be the same as the other artists. He created the Cubism art style where shapes are used in paintings. This is still admired to this day.\n\n(Adapted from Pablo Picasso by Darice Bailer)",
      question: "…he used his creativity to (34) ______ up with new ideas.",
      answer: "come",
      solution: {
        method: "Phrasal verb – come up with",
        steps: [
          "'to ______ up with new ideas' = a phrasal verb meaning to think of/invent.",
          "'Come up with' = to think of or produce an idea.",
          "→ Answer: come",
        ],
        tip: '"Come up with" = to think of/produce (an idea, plan, solution). Very common phrasal verb.',
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q35",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 35,
      marks: 1,
      passageTitle: "Comprehension Cloze – Pablo Picasso",
      passage:
        "Pablo Picasso was one of the most famous and talented artists of the 1900s. When he showed interest in art as a child, his father took him to an art (33) ______. At first, Picasso painted like the experts but later, he used his creativity to (34) ______ up with new ideas.\n\nWhen Picasso's friend died in 1901, Picasso expressed his sadness by painting pictures of sad people in shades of blue. This time became known as his Blue Period. A few years (35) ______, he began painting clowns and jugglers he saw at the circus. He felt happier and used (36) ______ colours than the ones before.\n\nTimes changed. Picasso did his (37) ______ to be unique as he did not want to be the same as the other artists. He created the Cubism art style where shapes are used in paintings. This is still admired to this day.\n\n(Adapted from Pablo Picasso by Darice Bailer)",
      question: "A few years (35) ______, he began painting clowns and jugglers he saw at the circus.",
      answer: "later",
      solution: {
        method: "Time adverb in context",
        steps: [
          "'A few years ______' = a time expression showing passage of time.",
          "The Blue Period (1901) came first; then after a few years, he changed style.",
          "'Later' = at a subsequent time after something else.",
          "'A few years later' = after a few years had passed.",
          "→ Answer: later",
        ],
        tip: '"A few years later" = after a few years. Common time expression.',
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q36",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 36,
      marks: 1,
      passageTitle: "Comprehension Cloze – Pablo Picasso",
      passage:
        "Pablo Picasso was one of the most famous and talented artists of the 1900s. When he showed interest in art as a child, his father took him to an art (33) ______. At first, Picasso painted like the experts but later, he used his creativity to (34) ______ up with new ideas.\n\nWhen Picasso's friend died in 1901, Picasso expressed his sadness by painting pictures of sad people in shades of blue. This time became known as his Blue Period. A few years (35) ______, he began painting clowns and jugglers he saw at the circus. He felt happier and used (36) ______ colours than the ones before.\n\nTimes changed. Picasso did his (37) ______ to be unique as he did not want to be the same as the other artists. He created the Cubism art style where shapes are used in paintings. This is still admired to this day.\n\n(Adapted from Pablo Picasso by Darice Bailer)",
      question: "He felt happier and used (36) ______ colours than the ones before.",
      answer: "brighter",
      solution: {
        method: "Comparative adjectives – comparing colour choices",
        steps: [
          "Before = Blue Period (sad, blue/dark colours). Now = he 'felt happier'.",
          "When happier, he would use happier, more vivid colours.",
          "'______ colours than the ones before' = comparative form needed.",
          "Comparison of brightness: bright → brighter.",
          "'Brighter colours' = more vivid/happy colours (contrast to the blue sad period).",
          "→ Answer: brighter",
        ],
        tip: "Sad period = blue (dull). Happy period = brighter colours. 'Than' signals comparative: brighter.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q37",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 37,
      marks: 1,
      passageTitle: "Comprehension Cloze – Pablo Picasso",
      passage:
        "Pablo Picasso was one of the most famous and talented artists of the 1900s. When he showed interest in art as a child, his father took him to an art (33) ______. At first, Picasso painted like the experts but later, he used his creativity to (34) ______ up with new ideas.\n\nWhen Picasso's friend died in 1901, Picasso expressed his sadness by painting pictures of sad people in shades of blue. This time became known as his Blue Period. A few years (35) ______, he began painting clowns and jugglers he saw at the circus. He felt happier and used (36) ______ colours than the ones before.\n\nTimes changed. Picasso did his (37) ______ to be unique as he did not want to be the same as the other artists. He created the Cubism art style where shapes are used in paintings. This is still admired to this day.\n\n(Adapted from Pablo Picasso by Darice Bailer)",
      question: "Picasso did his (37) ______ to be unique as he did not want to be the same as the other artists.",
      answer: "best",
      solution: {
        method: "Fixed expression – 'do one's best'",
        steps: [
          "'Did his ______' → this is the idiom 'do one's best'.",
          "'Do one's best' = to try as hard as possible.",
          "Picasso tried his hardest to be different and unique.",
          "→ Answer: best",
        ],
        tip: '"Do one\'s best" = to try as hard as possible. "He did his best to be unique."',
      },
    },

    // =========================================================================
    // SECTION G: SENTENCE MANIPULATION – COMBINING  Q38–40  (3 × 1m = 3m)
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2b_2023_q38",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 38,
      marks: 1,
      question:
        "Combine using 'before':\nThe hole was filled with water. Then, Prince Zak saw the ball bobbing up.",
      answer: "The hole was filled with water before Prince Zak saw the ball bobbing up.",
      solution: {
        method: "Sentence combining – time sequence with 'before'",
        steps: [
          "First event: the hole was filled with water.",
          "Second event: Prince Zak saw the ball bobbing up.",
          "'Before' joins these so that event 1 happened BEFORE event 2.",
          "Combined: 'The hole was filled with water before Prince Zak saw the ball bobbing up.'",
        ],
        tip: "'Before' means the first clause happened PRIOR to the second. X happened before Y.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q39",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 39,
      marks: 1,
      question:
        "Combine using 'so':\nI forgot my wallet. I went back home to get my wallet.",
      answer: "I forgot my wallet so I went back home to get it.",
      solution: {
        method: "Sentence combining – result/consequence with 'so'",
        steps: [
          "Cause: I forgot my wallet.",
          "Effect/result: I went back home to get it.",
          "'So' introduces the result clause.",
          "Combined: 'I forgot my wallet so I went back home to get it.'",
          "Note: Replace 'my wallet' with 'it' in the second clause to avoid repetition.",
        ],
        tip: "'So' = therefore/as a result. X happened, SO Y happened. Use 'it' to avoid repeating the noun.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q40",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 40,
      marks: 1,
      question:
        "Combine using 'but':\nMr Tan asked Joy to start working on her project. Joy had already made plans with her friends.",
      answer: "Mr Tan asked Joy to start working on her project but she had already made plans with her friends.",
      solution: {
        method: "Sentence combining – contrast with 'but'",
        steps: [
          "Two contrasting ideas: Mr Tan's request vs Joy's existing plans.",
          "'But' introduces a contrasting/opposing idea.",
          "Combined: 'Mr Tan asked Joy to start working on her project but she had already made plans with her friends.'",
          "Note: Replace 'Joy' with 'she' in the second clause.",
        ],
        tip: "'But' joins two opposing or contrasting ideas. Replace the repeated noun with a pronoun.",
      },
    },

    // =========================================================================
    // SECTION H: COMPREHENSION OPEN-ENDED  Q41–46b  (10m)
    // Passage: "Bear in the Family" by Eric Walters
    // Characters: Hunter, Jasmine (siblings), Brody (dog)
    // Setting: Neighbours' house burned by forest fires; Brody digs hole near well
    //          Jasmine hears sound from hole – thinks it's the Jennings' cat, Kitty
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2b_2023_q41",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 41,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question: "What remained in the Jennings' house after the fire? [1m]",
      answer: "There were only some metal pots left inside the Jennings' house after the fire.",
      solution: {
        method: "Reading comprehension – locating specific detail",
        steps: [
          "Paragraph 1: 'Everything that had been inside was gone except for a few metal pots sticking out of the ashes.'",
          "What remained = a few metal pots.",
          "→ Answer: A few metal pots (sticking out of the ashes).",
        ],
        tip: "The word 'except' tells you what was NOT destroyed. Scan for 'except' in paragraph 1.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q42",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 42,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question:
        "The statements below show the events in the story. Put them in the right sequence. Write 1, 2 and 3.\n\n___ Brody barked.\n___ Brody dug a hole.\n___ Brody broke free from Jasmine's grip.",
      answer: "Brody dug a hole. → 1\nBrody barked. → 2\nBrody broke free from Jasmine's grip. → 3",
      solution: {
        method: "Sequencing events in the passage",
        steps: [
          "Event order from the passage:",
          "1. Brody had been digging a hole near the well (paragraph 3: 'he had been digging a hole').",
          "2. Brody suddenly barked (paragraph 3: 'interrupted by Brody's sudden barking').",
          "3. Jasmine grabbed Brody; he broke free (paragraph 3: 'He fought and broke free').",
          "→ Sequence: dug hole (1) → barked (2) → broke free (3)",
        ],
        tip: "Read the relevant paragraph carefully. Events happen in narrative order.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q43a",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 43,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question:
        "True or False with reason – (a) Their mother did not care about their neighbour.",
      answer: "False. She was glad that their neighbour (the Jennings) was safe.",
      solution: {
        method: "True/False with evidence from the passage",
        steps: [
          "Statement: 'Their mother did not care about their neighbour.'",
          "Passage: 'I'm so glad the Jennings finally agreed to leave. They're safe now.' + 'I'd been persuading them to.'",
          "The mother had been trying to persuade the Jennings to leave (caring for their safety).",
          "She is GLAD they are safe → she DOES care.",
          "→ FALSE. Reason: She was glad the neighbours were safe and had been persuading them to leave.",
        ],
        tip: "Find direct evidence of how the mother feels about the neighbours. 'So glad they are safe' = she cares.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q43b",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 43,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question:
        "True or False with reason – (b) Hunter was anxious when he asked about their house.",
      answer: "True. His lips quivered when he asked about their house.",
      solution: {
        method: "True/False with evidence – inferring emotion from body language",
        steps: [
          "Statement: 'Hunter was anxious when he asked about their house.'",
          "Passage: 'Hunter asked, his lip quivering.'",
          "'Quivering' = trembling/shaking slightly, often because of fear or nervousness.",
          "Quivering lips = a sign of fear or anxiety.",
          "→ TRUE. Reason: His lips quivered when he asked, showing he was anxious/worried.",
        ],
        tip: '"Quivering" = trembling from emotion. Quivering lips = nervous/anxious. Body language clue.',
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q44",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 44,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question: "What does the word 'it' in line 10 refer to? [1m]",
      answer: "It refers to the hole (that Brody had been digging).",
      solution: {
        method: "Pronoun reference – identifying antecedent",
        steps: [
          "Line 10: 'he had been digging a hole near the well and was trying to make it bigger.'",
          "'It' = what Brody was trying to make bigger.",
          "What was he digging and making bigger? = the hole.",
          "→ 'it' refers to the hole.",
        ],
        tip: "Find the nearest noun before 'it' that makes sense: Brody was making THE HOLE bigger.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q45",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 45,
      marks: 2,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question: "Why did Jasmine 'press her ears on the ground' in line 15? [2m]",
      answer: "She needed to get a better hearing / She pressed her ears on the ground to hear the sound more clearly and determine where it was coming from, as she could not tell just by listening to the sound in the air.",
      solution: {
        method: "Reading comprehension – explaining a character's action",
        steps: [
          "Line 14–15: 'She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.'",
          "She couldn't locate the sound by listening normally.",
          "Pressing ears to the ground = trying to hear through the ground more clearly.",
          "Reason: She needed to get a better hearing/determine where the sound was coming from.",
        ],
        tip: "Explain what came BEFORE an action to find the reason. She couldn't tell from the air → pressed to the ground.",
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q46",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 46,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question:
        "Which word has the same meaning as 'small'? Circle either (A) or (B).\n\nShe started to reach into the hole but it was too (A) narrow and (B) deep for her to feel anything.",
      answer: "A (narrow)",
      solution: {
        method: "Vocabulary – synonym for 'small'",
        steps: [
          "The word that means 'small' = 'narrow'.",
          "'Narrow' = not wide; having little distance from side to side = a small width.",
          "'Deep' = having a large distance from top to bottom = not related to 'small'.",
          "→ Answer: A (narrow)",
        ],
        tip: '"Narrow" = small in width. A narrow road = a small/thin road.',
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q46a",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 46,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question:
        "(a) Based on the last paragraph, which adjective best describes Jasmine?\n\n[ ] resilient\n[ ] sensitive\n[ ] quick-witted",
      options: [
        { label: "1", text: "resilient" },
        { label: "2", text: "sensitive" },
        { label: "3", text: "quick-witted" },
      ],
      answer: "1",
      answerWord: "resilient",
      solution: {
        method: "Character analysis – describing word from evidence",
        steps: [
          "Last paragraph: 'Jasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.'",
          "Despite the hole being too narrow/deep to reach into, Jasmine kept trying.",
          "Answer key: 'Resilient' = able to recover from difficulties; persistent despite challenges.",
          "'Sensitive' = easily affected by feelings (not the main trait shown here).",
          "'Quick-witted' = thinking quickly (she thought of the cat, but this isn't the focus).",
          "→ Answer: resilient",
        ],
        tip: '"Resilient" = not giving up despite difficulty. Jasmine kept trying even when the hole was too small.',
      },
    },

    {
      id: "eoy_mahabodhi_p2b_2023_q46b",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 46,
      marks: 1,
      passageTitle: "Comprehension – Bear in the Family",
      passage:
        "The log walls of their neighbours' house were burned down to the ground. Everything that had been inside was gone except for a few metal pots sticking out of the ashes.\n\"I'm so glad the Jennings finally agreed to leave. They're safe now,\" their mother said. \"I'd been persuading them to. There have been too many forest fires.\"\n\"Mum, will our house be like theirs?\" Hunter asked, his lip quivering. Before she could reply, their conversation was interrupted by Brody's sudden barking. They did not realise that he had been digging a hole near the well and was trying to make it bigger. Jasmine ran over and grabbed him by the collar. He fought and broke free.\n\"Brody!\" she exclaimed. She was about to grab him again when they heard something. It was soft, sort of like the wind blowing – no, it was like crying. Was it coming from the hole? She could not tell just by listening to the sound in the air. She dropped to her knees and pressed her ears on the ground.\n\"Is it coming from the well?\" Hunter asked. Jasmine shook her head and replied, \"It's coming from the hole Brody was digging.\"\nThe hole was not very large. The siblings looked at each other and Jasmine broke the silence. \"What if it's their cat, Kitty?\" She started to reach into the hole but it was too narrow and deep for her to feel anything.\nJasmine pictured the Jennings' orange cat down in the hole. Her heart sank at the thought. The sound came again. It sounded like a cry for help.\n\n(Adapted from Bear in the Family by Eric Walters)",
      question:
        "(b) Why do you say so? [1m]",
      answer: "She kept thinking that the cat was stuck below the hole so she kept trying (to reach in despite the difficulty).",
      solution: {
        method: "Comprehension – justifying character description with evidence",
        steps: [
          "You chose 'resilient' in part (a).",
          "Evidence: Even though the hole was too narrow and deep, Jasmine pictured the cat inside and the sound continued.",
          "She did not give up; she persisted in trying to help.",
          "Answer key: 'She kept thinking that the cat is stuck below the hole so she kept trying.'",
        ],
        tip: "Justify your character adjective with evidence: what did Jasmine DO that shows resilience?",
      },
    },
  ],
};

export default eoy_mahabodhi_p2b_2023;
