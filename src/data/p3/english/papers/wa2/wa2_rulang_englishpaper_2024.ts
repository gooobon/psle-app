// ============================================================
// Rulang Primary School — 2024 WA2 Mini-Test 2
// English Language Use and Comprehension, Primary 3
// Total: 25 marks, Duration: 1 Hour, Date: 16 August 2024
// Sections: A Vocabulary Cloze (5) | B Grammar Cloze (5)
//           C Synthesis & Transformation (5) | D Comprehension OE (10)
// ============================================================

import type {
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Rulang Primary School",
  level: "Primary 3",
  subject: "English Language Use and Comprehension",
  term: "WA2 Mini-Test 2",
  year: 2024,
  totalMarks: 25,
  timeMinutes: 60,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Vocabulary Cloze  (Q1–Q5, 5 marks)
  //  Passage: Hibernation (adapted from natgeokids.com)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rulang2024-secA",
    topic: "VocabCloze",
    marks: 5,
    passageTitle: "Hibernation (adapted from natgeokids.com)",
    passageText:
      "Do you know that when animals hibernate, they are not actually sleeping? When the weather is extremely cold and food is in short supply, animals like bears and bats become (1) __________ to save energy. During this time, also known as hibernation, their heart rates and breathing slow down, and their body temperature drops. This allows them to use up their stored energy (2) __________.\n\nDuring the long hibernation period, these animals do not eat or drink. To (3) __________ themselves for it, they will eat a lot more before winter. Some animals eat so much that they (4) __________ to twice their normal size. This is perfectly fine as they eventually lose half their body weight during the hibernation period.\n\nWhile hibernation is a natural behaviour in some animals, human activities such as deforestation can (5) __________ this process. When their habitats are destroyed, these animals might not be able to survive winter.",
    wordBank: {
      A: "arrange",
      B: "disrupt",
      C: "gently",
      D: "grow",
      E: "inactive",
      F: "decrease",
      G: "prepare",
      H: "slowly",
      J: "sluggish",
      K: "spoil",
    },
    questions: [
      {
        qid: "rulang2024-q1",
        blankLabel: "(1)",
        question: "animals like bears and bats become (1) __________ to save energy.",
        answer: "E",
        solution: {
          method: "Vocabulary: what do animals become to save energy in cold weather?",
          steps: [
            "Animals slow down and save energy → they become INACTIVE (not doing much).",
            "E (inactive) = not active, doing nothing → CORRECT.",
            "J (sluggish) = slow and not energetic → possible, but 'inactive' better describes the energy-saving state.",
            "Answer: E (inactive).",
          ],
          tip: "Inactive = not active, conserving energy. Hibernating animals become INACTIVE (heart rate slows, breathing slows) to save energy.",
        },
      },
      {
        qid: "rulang2024-q2",
        blankLabel: "(2)",
        question: "This allows them to use up their stored energy (2) __________.",
        answer: "H",
        solution: {
          method: "Vocabulary: how do they use stored energy during hibernation?",
          steps: [
            "Body temperature drops, heart rate slows → they use stored energy at a SLOW rate.",
            "H (slowly) → 'use up their stored energy slowly'. CORRECT.",
            "C (gently) → 'use energy gently' → less natural.",
            "Answer: H (slowly).",
          ],
          tip: "Hibernating animals use stored energy SLOWLY (their metabolism is very slow). 'Slowly' is the natural adverb here.",
        },
      },
      {
        qid: "rulang2024-q3",
        blankLabel: "(3)",
        question: "To (3) __________ themselves for it, they will eat a lot more before winter.",
        answer: "G",
        solution: {
          method: "Vocabulary: what do animals do before winter to get ready for hibernation?",
          steps: [
            "'to ______ themselves for it' → getting ready for hibernation.",
            "G (prepare) = make ready → 'prepare themselves for hibernation'. CORRECT.",
            "A (arrange) → 'arrange themselves' → not natural.",
            "Answer: G (prepare).",
          ],
          tip: "'Prepare for' = get ready for. Animals PREPARE for hibernation by eating a lot before winter.",
        },
      },
      {
        qid: "rulang2024-q4",
        blankLabel: "(4)",
        question: "Some animals eat so much that they (4) __________ to twice their normal size.",
        answer: "D",
        solution: {
          method: "Vocabulary: what happens when animals eat a lot? They get bigger.",
          steps: [
            "Eating a lot → body size increases.",
            "D (grow) = increase in size → 'grow to twice their normal size'. CORRECT.",
            "F (decrease) → get smaller → OPPOSITE.",
            "Answer: D (grow).",
          ],
          tip: "'Grow to twice their normal size' = become twice as big. Animals eat a lot before hibernation and put on weight (grow).",
        },
      },
      {
        qid: "rulang2024-q5",
        blankLabel: "(5)",
        question: "human activities such as deforestation can (5) __________ this process.",
        answer: "B",
        solution: {
          method: "Vocabulary: what does deforestation do to hibernation?",
          steps: [
            "Deforestation = negative impact on animals' habitats.",
            "'can ______ this process' → deforestation interferes with/harms hibernation.",
            "B (disrupt) = interrupt or interfere with → 'disrupt this process'. CORRECT.",
            "K (spoil) → possible but 'disrupt' is more precise for interfering with a natural process.",
            "Answer: B (disrupt).",
          ],
          tip: "Disrupt = interrupt, interfere with. Human activities DISRUPT natural processes like hibernation.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Grammar Cloze  (Q6–Q10, 5 marks)
  //  Passage: Orion Jean – Kindness (adapted from timeforkids.com)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rulang2024-secB",
    topic: "GrammarCloze",
    marks: 5,
    passageTitle: "Orion Jean – Spreading Kindness (adapted from timeforkids.com)",
    passageText:
      "When Orion Jean was nine, he wrote a speech about kindness and entered it in a contest. He used the prize money he won to spread his message on kindness far and wide. For his first charity event, Orion collected toys and donated (6) __________ to a hospital. It was (7) __________ largest donation the hospital had ever received.\n\nA few years later, Orion received the Time Magazine Kid of the Year award for making a great impact in his community. Since then, he (8) __________ continued his mission to spread kindness. Apart from donating food to needy families, he donates many books as he wants to share the gift of reading (9) __________ other children.\n\nOrion has also just released his second book, Race to Kindness. He said it shows how everybody can be kind. 'Anything (10) __________ possible with the power of kindness. Always choose to be kind,' he said.",
    wordBank: {
      A: "a",
      B: "the",
      C: "has",
      D: "had",
      E: "is",
      F: "them",
      G: "for",
      H: "with",
    },
    questions: [
      {
        qid: "rulang2024-q6",
        blankLabel: "(6)",
        question: "Orion collected toys and donated (6) __________ to a hospital.",
        answer: "F",
        solution: {
          method: "Object pronoun: donated the toys → donated them.",
          steps: [
            "Donated the TOYS (plural) to a hospital → object pronoun = THEM.",
            "F (them) → 'donated them to a hospital' → CORRECT.",
            "Answer: F (them).",
          ],
          tip: "'Them' replaces the plural noun 'toys'. He collected toys and donated THEM (the toys).",
        },
      },
      {
        qid: "rulang2024-q7",
        blankLabel: "(7)",
        question: "It was (7) __________ largest donation the hospital had ever received.",
        answer: "B",
        solution: {
          method: "Article: superlative 'largest' requires the definite article 'the'.",
          steps: [
            "'______ largest donation' → before a superlative, use THE.",
            "B (the) → 'the largest donation' → CORRECT.",
            "A (a) → indefinite article → WRONG before superlatives.",
            "Answer: B (the).",
          ],
          tip: "Rule: THE + superlative (the largest, the best, the most beautiful). Always use 'the' before superlatives.",
        },
      },
      {
        qid: "rulang2024-q8",
        blankLabel: "(8)",
        question: "Since then, he (8) __________ continued his mission to spread kindness.",
        answer: "C",
        solution: {
          method: "Tense: 'since then' + present perfect → 'has continued'.",
          steps: [
            "'Since then, he ______ continued' → 'since' signals present perfect.",
            "C (has) → 'he has continued' = present perfect for ongoing action from past to now.",
            "D (had) → past perfect → WRONG with 'since then' in present context.",
            "Answer: C (has).",
          ],
          tip: "'Since + past time → has/have + past participle (present perfect). 'Since then, he HAS continued' = from that time until now he continues.",
        },
      },
      {
        qid: "rulang2024-q9",
        blankLabel: "(9)",
        question: "he donates many books as he wants to share the gift of reading (9) __________ other children.",
        answer: "H",
        solution: {
          method: "Preposition: 'share something with someone' = fixed phrase.",
          steps: [
            "'share the gift of reading ______ other children' → share WITH.",
            "Fixed phrase: 'share [something] WITH [someone]'.",
            "H (with) → 'share the gift of reading with other children'. CORRECT.",
            "G (for) → 'share for other children' → not standard.",
            "Answer: H (with).",
          ],
          tip: "'Share with' = fixed collocation. 'Share the joy WITH your friends.' Always 'with' when sharing involves others.",
        },
      },
      {
        qid: "rulang2024-q10",
        blankLabel: "(10)",
        question: "'Anything (10) __________ possible with the power of kindness.'",
        answer: "E",
        solution: {
          method: "Subject-verb agreement: 'Anything' is singular → 'is'.",
          steps: [
            "Subject: 'Anything' → third person singular (like 'it').",
            "Present simple, singular → IS.",
            "E (is) → 'Anything IS possible' → CORRECT.",
            "Answer: E (is).",
          ],
          tip: "Anything/everything/something/nothing = singular → IS (present), WAS (past). 'Anything IS possible.'",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Synthesis & Transformation  (Q11–Q15, 5 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "rulang2024-q11",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence.\n\nWe were very hungry. We bought some noodles.\n\n__________ since __________",
    answer:
      "We bought some noodles since we were very hungry.",
    solution: {
      method: "'Since' = because. Reason: hungry → bought noodles.",
      steps: [
        "Reason: we were hungry. Result: we bought noodles.",
        "'since' = because → introduces reason.",
        "We bought some noodles since we were very hungry.",
        "Answer: We bought some noodles since we were very hungry.",
      ],
      tip: "'Since' here means 'because'. 'We bought noodles since (= because) we were hungry.' The 'since' clause gives the reason.",
    },
  },

  {
    kind: "A",
    id: "rulang2024-q12",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence.\n\nLisa likes tomatoes. Lisa's brother does not like tomatoes.\n\n__________ but __________",
    answer:
      "Lisa likes tomatoes but her brother does not.",
    solution: {
      method: "'But' connects contrasting likes.",
      steps: [
        "Contrast: Lisa likes / brother does not.",
        "'but' → contrast conjunction.",
        "Lisa likes tomatoes but her brother does not (like tomatoes).",
        "Avoid repetition: omit 'like tomatoes' at the end.",
        "Answer: Lisa likes tomatoes but her brother does not.",
      ],
      tip: "When two clauses contrast, use 'but'. Avoid repeating the same object: 'does not' (omit 'like tomatoes').",
    },
  },

  {
    kind: "A",
    id: "rulang2024-q13",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence.\n\nI was cycling at the park. I saw an injured bird.\n\nWhile __________",
    answer:
      "While I was cycling at the park, I saw an injured bird.",
    solution: {
      method: "'While' = during the time that; connects two simultaneous/overlapping events.",
      steps: [
        "Two events: cycling (ongoing) + saw bird (moment within that).",
        "'While' = during the time that → 'While I was cycling…'",
        "While I was cycling at the park, I saw an injured bird.",
        "Comma after 'while' clause.",
        "Answer: While I was cycling at the park, I saw an injured bird.",
      ],
      tip: "'While + past continuous' for ongoing action; 'simple past' for what happened during. Comma after the 'while' clause when it comes first.",
    },
  },

  {
    kind: "A",
    id: "rulang2024-q14",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence.\n\nThe computer is not working. The printer is not working.\n\nBoth __________",
    answer:
      "Both the computer and the printer are not working.",
    solution: {
      method: "'Both…and…' joins two subjects that share the same situation.",
      steps: [
        "Both items are not working → combine with 'both…and'.",
        "'Both the computer and the printer are not working.'",
        "'Both X and Y' = plural subject → plural verb 'are'.",
        "Answer: Both the computer and the printer are not working.",
      ],
      tip: "'Both X and Y' is always plural → use ARE (not is). 'Both the computer AND the printer ARE not working.'",
    },
  },

  {
    kind: "A",
    id: "rulang2024-q15",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Rewrite as ONE sentence.\n\nThe children were nervous. The children put up a great performance.\n\nEven though __________",
    answer:
      "Even though the children were nervous, they put up a great performance.",
    solution: {
      method: "'Even though' = despite the fact that; emphasises unexpected contrast.",
      steps: [
        "Contrast: nervous (expected poor performance) → GREAT performance (surprising).",
        "'Even though' introduces the surprising/contrary condition.",
        "Even though the children were nervous, they put up a great performance.",
        "Comma after 'Even though' clause; replace second 'the children' with 'they'.",
        "Answer: Even though the children were nervous, they put up a great performance.",
      ],
      tip: "'Even though' = stronger than 'although'. Shows a very surprising contrast. Always followed by a comma when starting the sentence.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Comprehension Open-Ended  (Q16–Q20, 10 marks)
  //  Passage: Mia and Buddy the Lost Dog
  //  Adapted from readthetale.com
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "rulang2024-secD",
    topic: "ComprehensionOE",
    marks: 10,
    passageTitle: "Mia and Buddy (adapted from readthetale.com)",
    passageText:
      "One afternoon, Mia was strolling at the neighbourhood park when she spotted a small puppy wandering alone. Mia noticed that it had a collar around its neck. 'It must be someone's pet!' Mia thought. She looked around but there was no one in sight.\n\nMia hesitated for a while before approaching it. She extended her hand gently, allowing the puppy to sniff her fingers. The puppy was hesitant at first, but Mia offered a reassuring smile and whispered soothing words to it. The puppy started to relax and nudged Mia's hand with its wet nose. Mia knelt down beside it and saw that attached to its collar was a tag with the name 'Buddy' engraved on it. Buddy looked at her sadly and Mia's heart swelled with determination to help Buddy find its owner.\n\nTogether with Buddy, Mia began a journey through the neighbourhood, asking neighbours and strangers if they recognised Buddy. However, no one did. As the sun began to set, Mia began to feel discouraged. Just as she was wondering what to do next, they saw a group of boys playing soccer. Buddy started barking loudly and dashed towards them, its tail wagging. The boys looked up in shock and one of their faces lit up. 'Buddy!' the boy yelled as he scooped the puppy up.\n\n'Is this your puppy?' Mia asked, her eyes twinkling excitedly. The boy nodded. He explained that Buddy had slipped away during a thunderstorm a few days ago and his family had been searching for it.\n\n'Thank you!' he said gratefully. Mia smiled, her heart warmed by the reunion.",
    questions: [
      {
        qid: "rulang2024-q16",
        question:
          "How did Mia know that Buddy was lost when she first saw it at the park? [2m]",
        answer:
          "Mia knew Buddy was lost because it was wandering alone in the park and it had a collar around its neck, suggesting it was someone's pet. There was no owner in sight.",
        solution: {
          method: "Literal + inferential comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'a small puppy WANDERING ALONE. Mia noticed that it had A COLLAR around its neck.'",
            "Clues: (1) wandering alone = no owner present; (2) collar = it's someone's pet.",
            "'She looked around but there was NO ONE IN SIGHT' → no owner around.",
            "Answer: Buddy was wandering alone with no owner in sight, and it had a collar suggesting it was someone's pet.",
          ],
          tip: "2-mark answer: two clues. (1) Wandering alone / no owner in sight. (2) Had a collar = belongs to someone (is a pet).",
        },
      },
      {
        qid: "rulang2024-q17",
        question:
          "What did Mia do to make Buddy feel more comfortable around her? [2m]",
        answer:
          "Mia offered a reassuring smile and whispered soothing words to Buddy.",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'Mia offered A REASSURING SMILE and WHISPERED SOOTHING WORDS to it.'",
            "Two actions: (1) offered a reassuring smile; (2) whispered soothing words.",
            "Answer: Mia offered a reassuring smile and whispered soothing words to Buddy.",
          ],
          tip: "2-mark answer: both actions needed. She also extended her hand gently (to let it sniff), but the two main comforting actions are the smile and whispered words.",
        },
      },
      {
        qid: "rulang2024-q18",
        question:
          "From paragraph 3, state two reasons why Mia felt discouraged. [2m]",
        answer:
          "Mia felt discouraged because it was getting late (the sun was setting) and no one recognised Buddy.",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'However, NO ONE DID (recognise Buddy).'",
            "And: 'As the SUN BEGAN TO SET, Mia began to feel discouraged.'",
            "Two reasons: (1) No one recognised Buddy; (2) It was getting late (sun setting).",
            "Answer: No one recognised Buddy, and it was getting late (the sun was setting).",
          ],
          tip: "2-mark answer = 2 reasons. Find them in paragraph 3: (1) no one recognised Buddy; (2) sun began to set (getting late/dark).",
        },
      },
      {
        qid: "rulang2024-q19a",
        question:
          "Refer to paragraph 3. What does the word 'they' refer to? [1m]",
        answer: "Mia and Buddy",
        solution: {
          method: "Pronoun reference: 'they saw a group of boys playing soccer.'",
          steps: [
            "Paragraph 3: 'Just as she was wondering what to do next, THEY saw a group of boys…'",
            "Who are 'they'? = Mia and Buddy (they had been travelling together through the neighbourhood).",
            "Answer: Mia and Buddy.",
          ],
          tip: "'They' = the people/beings who have been together in the narrative. Mia and Buddy were searching together → they = Mia and Buddy.",
        },
      },
      {
        qid: "rulang2024-q19b",
        question:
          "Refer to paragraph 3. What does the word 'them' refer to? [1m]",
        answer: "The group of boys playing soccer.",
        solution: {
          method: "Pronoun reference: 'dashed towards them'.",
          steps: [
            "Paragraph 3: 'Buddy started barking loudly and dashed towards THEM, its tail wagging.'",
            "'Them' = the group of boys playing soccer (mentioned just before).",
            "Answer: The group of boys playing soccer.",
          ],
          tip: "'Them' replaces the last mentioned plural noun/group = the boys playing soccer. Buddy ran towards THEM (the boys).",
        },
      },
      {
        qid: "rulang2024-q20a",
        question:
          "TRUE or FALSE: Buddy ran away from its home as it did not like living there. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 4.",
          steps: [
            "Paragraph 4: 'Buddy had SLIPPED AWAY DURING A THUNDERSTORM a few days ago.'",
            "'Slipped away during a thunderstorm' = accidentally got lost, NOT voluntarily ran away.",
            "Statement: 'did not like living there' → NO evidence of this; it slipped away accidentally.",
            "Answer: False.",
          ],
          tip: "'Slipped away during a thunderstorm' = accidentally got lost (scared by storm). NOT because it didn't like home. The statement implies deliberate action → False.",
        },
      },
      {
        qid: "rulang2024-q20b",
        question:
          "TRUE or FALSE: Buddy was reunited with its owner in the end. [1m]",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraphs 3-5.",
          steps: [
            "Paragraph 3: 'Buddy!' the boy yelled as he scooped the puppy up.' → the boy (owner) found Buddy.",
            "Paragraph 4: 'Is this your puppy?' → Yes, the boy nodded (confirmed ownership).",
            "Buddy was reunited with its owner → TRUE.",
            "Answer: True.",
          ],
          tip: "The boy recognized Buddy and scooped it up. The family had been searching → they were reunited. TRUE.",
        },
      },
    ],
  },
];

export const rulang2024Paper = { meta, questions };
export default rulang2024Paper;
