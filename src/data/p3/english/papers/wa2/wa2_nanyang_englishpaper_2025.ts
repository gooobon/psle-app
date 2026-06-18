// ============================================================
// Nanyang Primary School — 2025 Term 2 Weighted Assessment (WA2)
// English Language, Primary 3
// Total: 20 marks, Duration: 40 min
// Sections: A Grammar MCQ (3) | B Vocabulary MCQ (3) | C Grammar Cloze (3)
//           D Editing Spelling (3) | E Comprehension (8)
// ============================================================

import type { PaperQuestion, PaperMeta } from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Nanyang Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2 Term 2",
  year: 2025,
  totalMarks: 20,
  timeMinutes: 40,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  (A) GRAMMAR MCQ  (Q1–Q3, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "nanyang2025-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Raju __________ soundly even when his baby sister was screaming loudly.",
    options: ["(1) slept", "(2) sleep", "(3) sleeps", "(4) is sleeping"],
    answer: "1",
    solution: {
      method: "Past simple: 'was screaming' (past continuous) sets past context; Raju's action = simple past.",
      steps: [
        "'was screaming' → past context.",
        "Raju's action = completed past act → SIMPLE PAST.",
        "(1) slept → past of sleep → CORRECT.",
        "Answer: (1) slept.",
      ],
      tip: "When narrating a past story, use simple past. 'His baby sister was screaming' (past continuous) sets the scene; 'Raju slept' = his completed action.",
    },
  },

  {
    kind: "A",
    id: "nanyang2025-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Look! __________ birds flying across the bridge there look amazing.",
    options: ["(1) This", "(2) That", "(3) These", "(4) Those"],
    answer: "4",
    solution: {
      method: "Demonstrative pronoun: 'Look! … there' = plural birds far away → 'Those'.",
      steps: [
        "'birds' → PLURAL.",
        "'there' + 'Look!' → they are at a distance → FAR.",
        "Plural + far = THOSE.",
        "(4) Those → CORRECT.",
        "Answer: (4) Those.",
      ],
      tip: "Those = plural + far. When you say 'Look! … there', the birds are far away → THOSE birds.",
    },
  },

  {
    kind: "A",
    id: "nanyang2025-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question: "'Not all the guests are here. __________ of them are caught in the jam and will be late,' said Nani.",
    options: ["(1) Little", "(2) None", "(3) Some", "(4) Much"],
    answer: "3",
    solution: {
      method: "Quantifier: 'guests' = countable; some of them are stuck = partial group.",
      steps: [
        "'guests' = countable plural.",
        "Context: not all here → a PORTION are stuck in traffic.",
        "(3) Some → partial amount of countable noun. CORRECT.",
        "(2) None → zero → WRONG (some are stuck, others aren't).",
        "(1) Little / (4) Much → uncountable → WRONG.",
        "Answer: (3) Some.",
      ],
      tip: "'Some of them' = a part of the group. Some guests are late; others may already be there. 'Some' = partial quantity.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  (B) VOCABULARY MCQ  (Q4–Q6, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "nanyang2025-q4",
    topic: "VocabMCQ",
    marks: 1,
    question: "The fox yelped in terror as the __________ lion roared menacingly at it.",
    options: ["(1) timid", "(2) tame", "(3) fragile", "(4) ferocious"],
    answer: "4",
    solution: {
      method: "Vocabulary: a lion that makes a fox yelp in terror and roars menacingly.",
      steps: [
        "'roared menacingly' + fox yelped in TERROR → the lion is fierce/dangerous.",
        "(4) ferocious = extremely fierce, violent → CORRECT.",
        "(1) timid = shy/fearful → OPPOSITE.",
        "(2) tame = domesticated, gentle → WRONG.",
        "Answer: (4) ferocious.",
      ],
      tip: "Ferocious = extremely fierce and aggressive. A ferocious lion roars menacingly and terrifies the fox.",
    },
  },

  {
    kind: "A",
    id: "nanyang2025-q5",
    topic: "VocabMCQ",
    marks: 1,
    question: "The spy wore a costume and a hat to __________ herself so that nobody would recognise her at the party.",
    options: ["(1) cover", "(2) reveal", "(3) change", "(4) disguise"],
    answer: "4",
    solution: {
      method: "Vocabulary: a costume and hat to prevent recognition → disguise.",
      steps: [
        "Goal: 'nobody would RECOGNISE her' → she hid her identity.",
        "(4) disguise = change appearance to hide identity → CORRECT.",
        "(2) reveal = show/uncover → OPPOSITE.",
        "(3) change = alter → less precise than 'disguise'.",
        "Answer: (4) disguise.",
      ],
      tip: "'Disguise yourself' = change appearance so you can't be recognised. A costume and hat are classic disguise elements.",
    },
  },

  {
    kind: "A",
    id: "nanyang2025-q6",
    topic: "VocabMCQ",
    marks: 1,
    question: "Aishah jumped for joy when she received a/an __________ to her friend's birthday party.",
    options: ["(1) request", "(2) proposal", "(3) invitation", "(4) announcement"],
    answer: "3",
    solution: {
      method: "Vocabulary: what you receive to attend someone's birthday party.",
      steps: [
        "'Jumped for joy' → very happy to receive it.",
        "You receive a formal request to attend a party → an INVITATION.",
        "(3) invitation = formal request to attend an event → CORRECT.",
        "(1) request = asking for something → too general.",
        "(4) announcement = public statement → not a personal party card.",
        "Answer: (3) invitation.",
      ],
      tip: "'Invitation to a party' = a card/message asking you to come. 'Jumped for joy' shows how happy she was to be invited.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  (C) GRAMMAR CLOZE  (Q7–Q9, 3 marks)
  //  Passage: John and Sara plan a picnic
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "nanyang2025-secC",
    topic: "GrammarCloze",
    marks: 3,
    passageTitle: "Planning a Picnic",
    passageText: "'Our school holiday starts tomorrow! Shall (7) __________ organise a picnic at the Botanic Gardens for our family?' John asked his elder sister, Sara.\n\nSara agreed happily. The two siblings discussed what food (8) __________ family members would like to eat at the picnic. 'I can bake a butter cake. John, can (9) __________ make some ham and cheese sandwiches on your own?' Sara asked.\n\nJohn agreed and they went to the supermarket to buy groceries later in the afternoon.",
    wordBank: { A: "me", B: "they", C: "we", D: "our", E: "their", F: "you" },
    questions: [
      {
        qid: "nanyang2025-q7",
        blankLabel: "(7)",
        question: "Shall (7) __________ organise a picnic at the Botanic Gardens for our family?",
        answer: "C",
        solution: {
          method: "Subject pronoun: John is asking Sara (his sister) → they do it together → 'we'.",
          steps: [
            "John asks Sara to organise together → WE (includes both John and Sara).",
            "C (we) → 'Shall we organise' = shall the two of us organise. CORRECT.",
            "Answer: C (we).",
          ],
          tip: "'Shall we…?' = suggestion for both of us to do something together. John includes Sara.",
        },
      },
      {
        qid: "nanyang2025-q8",
        blankLabel: "(8)",
        question: "The two siblings discussed what food (8) __________ family members would like.",
        answer: "E",
        solution: {
          method: "Possessive: whose family? The siblings' family → their family.",
          steps: [
            "The siblings discussing their OWN family members → possessive = THEIR.",
            "E (their) → 'their family members' → CORRECT.",
            "Answer: E (their).",
          ],
          tip: "The siblings' family = THEIR family. 'Their family members' = the members of the siblings' family.",
        },
      },
      {
        qid: "nanyang2025-q9",
        blankLabel: "(9)",
        question: "John, can (9) __________ make some ham and cheese sandwiches on your own?",
        answer: "F",
        solution: {
          method: "Subject pronoun: Sara is speaking TO John → 'you'.",
          steps: [
            "Sara asks JOHN directly → second person = YOU.",
            "F (you) → 'can you make' → CORRECT.",
            "Answer: F (you).",
          ],
          tip: "In direct address to John, use 'you'. 'John, can YOU make…' = Sara is asking John specifically.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  (D) EDITING FOR SPELLING  (Q10–Q12, 3 marks)
  //  Passage: Tom and Sam and the Puppy
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "nanyang2025-secD",
    topic: "Editing",
    marks: 3,
    passageTitle: "The Surprise Puppy",
    passageText: "Tom and Sam were feeling bored at home. They decided to play a game of chess. Just as they were [angrossed](10) in the game, the doorbell rang. When Tom [openned](11) the door, he saw a [shevering](12) puppy wrapped in a blanket inside a box.\n\nTom squealed in delight as he loved dogs. When he stretched out his hand to pat it, the frightened puppy stared at him with big [beutifull](12b) eyes. Sam giggled and exclaimed, 'Did we order a new puppy?'",
    questions: [
      {
        qid: "nanyang2025-q10",
        blankLabel: "(10)",
        question: "Just as they were [angrossed] in the game — correct the underlined word (spelling).",
        answer: "engrossed",
        solution: {
          method: "Spelling: 'angrossed' → 'engrossed'.",
          steps: [
            "'engrossed' = completely absorbed in something.",
            "'angrossed' → wrong prefix 'an-' and wrong vowel: should be EN-grossed.",
            "Correct: e-n-g-r-o-s-s-e-d.",
            "Answer: engrossed.",
          ],
          tip: "Engrossed = en + grossed. Double 's': en-GROSS-ed. Prefix is EN- not AN-.",
        },
      },
      {
        qid: "nanyang2025-q11",
        blankLabel: "(11)",
        question: "When Tom [openned] the door — correct the underlined word (spelling).",
        answer: "shivering",
        solution: {
          method: "Spelling: 'shevering' → 'shivering'.",
          steps: [
            "'shevering' → wrong: 'sheve' instead of 'shiver'.",
            "shiver + -ing = shivering.",
            "Correct: s-h-i-v-e-r-i-n-g.",
            "Answer: shivering.",
          ],
          tip: "Shiver → shivering. SHI-ver-ing. The vowel is 'i' not 'e': shIvering.",
        },
      },
      {
        qid: "nanyang2025-q12",
        blankLabel: "(12)",
        question: "he saw a [shevering] puppy (Q11=shivering) / big [beutifull] eyes (Q12=beautiful) — correct both underlined words.",
        answer: "beautiful",
        solution: {
          method: "Spelling: 'beutifull' → 'beautiful'.",
          steps: [
            "'beutifull' → wrong: 'beutiful' instead of 'beautiful', and double L.",
            "beauty → beau + ti + ful = beautiful. Single L at end.",
            "Correct: b-e-a-u-t-i-f-u-l.",
            "Answer: beautiful.",
          ],
          tip: "Beautiful = beau + ti + ful. One L at the end (not -full). The 'beau' part: b-e-a-u.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  (E) COMPREHENSION  (Q13–Q19, 8 marks)
  //  Passage: Farmer Fred and the Frogs
  //  Adapted from "The Farmer and the Frogs"
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "nanyang2025-secE",
    topic: "ComprehensionOE",
    marks: 8,
    passageTitle: "Farmer Fred and the Frogs (adapted from 'The Farmer and the Frogs')",
    passageText: "Fred, a farmer, woke up to the sound of frogs croaking loudly at night during the rainy season. This continued every night. After many sleepless nights, Fred was too tired and grumpy to work in his fields during the day.\n\n'It is driving me crazy! We must get rid of these frogs!' the farmer yelled.\n\nOne day, Fred's wife returned from the market after buying groceries and told him some good news. A new restaurant which served frog legs as a popular dish had opened in town. Fred was pleased that he could get rid of the noisy frogs and earn a handsome sum by selling them.\n\nThe next day, Fred went to town. He told the restaurant owner that he could sell him an unlimited supply of frog legs. The restaurant owner asked, 'Where do you get so many frog legs?' Fred replied, 'There is a pond near my house and there are millions of them!' After discussing, they agreed that Fred would deliver five hundred frogs to the restaurant for the next several weeks.\n\nFred went to the pond to catch all the frogs he could get his hands on. To his surprise, he discovered that there were only two frogs in the pond. He searched the whole pond and the surrounding area to make sure that he did not make a mistake. He stared in disbelief at the two frogs that had been making such a din all this while. Fred's dream of making a fortune was immediately dashed that day.",
    questions: [
      {
        qid: "nanyang2025-q13",
        question: "Fill in the blank with a suitable word.\n\nFarmer Fred was not able to do his job well in the day as the frogs' loud croaking affected his __________ at night. [1m]",
        answer: "sleep",
        solution: {
          method: "Vocabulary/context: what did the croaking affect at night?",
          steps: [
            "Paragraph 1: 'Fred woke up to the sound of frogs croaking… After many SLEEPLESS NIGHTS, Fred was too tired.'",
            "The croaking disrupted his SLEEP at night → he became tired and couldn't work.",
            "Answer: sleep.",
          ],
          tip: "'Sleepless nights' = couldn't sleep. The croaking affected his SLEEP. He couldn't sleep properly.",
        },
      },
      {
        qid: "nanyang2025-q14",
        question: "Pick out a three-word phrase from paragraph 2 which shows why Farmer Fred wanted to remove the frogs. [1m]",
        answer: "Driving me crazy",
        solution: {
          method: "Locate three-word phrase in paragraph 2.",
          steps: [
            "Paragraph 2: 'It is DRIVING ME CRAZY!'",
            "'driving me crazy' = 3 words, shows the frogs are making him go mad.",
            "Answer: driving me crazy.",
          ],
          tip: "'Driving me crazy' = making him lose his mind. This 3-word phrase shows the frogs were causing him extreme frustration.",
        },
      },
      {
        qid: "nanyang2025-q15",
        question: "Based on the third paragraph, tick the word that best describes how Farmer Fred felt about selling the frogs to the restaurant owner. [1m]\n☐ annoyed  ☐ delighted  ☐ sorry",
        options: ["annoyed", "delighted", "sorry"],
        answer: "delighted",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'Fred was PLEASED that he could get rid of the noisy frogs and earn a handsome sum.'",
            "'pleased' = happy/delighted → delighted. CORRECT.",
            "Answer: delighted.",
          ],
          tip: "Pleased = happy = delighted. Fred was pleased to get rid of frogs AND earn money.",
        },
      },
      {
        qid: "nanyang2025-q16",
        question: "TRUE or FALSE: Farmer Fred's wife went to the market to sell frogs. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'Fred's wife returned from the market after BUYING GROCERIES.'",
            "She went to buy groceries, NOT to sell frogs → FALSE.",
            "Answer: False.",
          ],
          tip: "Fred's wife bought groceries at the market — she didn't sell frogs. She happened to hear about the restaurant there.",
        },
      },
      {
        qid: "nanyang2025-q17",
        question: "TRUE or FALSE: The restaurant owner asked Farmer Fred to work for him in the restaurant. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: paragraph 4.",
          steps: [
            "The restaurant owner asked WHERE Fred got so many frog legs — NOT to work for him.",
            "'The restaurant owner asked, \"Where do you get so many frog legs?\"'",
            "Statement: asked Fred to work for him → FALSE.",
            "Answer: False.",
          ],
          tip: "The restaurant owner asked about the source of frogs, not to hire Fred. They agreed that Fred would DELIVER frogs.",
        },
      },
      {
        qid: "nanyang2025-q18",
        question: "Write 1, 2 and 3 in the blanks to show what happened first, next, and last in the story. [1m]\n___ Farmer Fred tried to catch as many frogs as he could.\n___ The frogs' loud croaking made Farmer Fred angry.\n___ Farmer Fred knew about the new restaurant in town.",
        answer: "Farmer Fred tried to catch frogs: 3\nFrogs' loud croaking made Fred angry: 1\nFarmer Fred knew about the new restaurant: 2",
        solution: {
          method: "Sequence: paragraph 1 = croaking/angry. Paragraph 3 = wife told about restaurant. Paragraph 5 = Fred tried to catch frogs.",
          steps: [
            "Para 1: frogs' croaking → Fred angry. ORDER: 1",
            "Para 3: wife told him about restaurant. ORDER: 2",
            "Para 5: Fred went to catch frogs. ORDER: 3",
            "Answer: croaking/angry (1) → knew about restaurant (2) → tried to catch (3).",
          ],
          tip: "Follow paragraph order: problem (para 1) → solution found (para 3) → went to catch frogs (para 5).",
        },
      },
      {
        qid: "nanyang2025-q19",
        question: "Using information from paragraph 5, complete the sentences to explain Farmer Fred's feelings. [2m]\na) Farmer Fred was shocked as __________.\nb) Farmer Fred was disappointed as his __________.",
        answer: "a) Farmer Fred was shocked as there were only two frogs in the pond.\nb) Farmer Fred was disappointed as his dream of making a fortune was dashed.",
        solution: {
          method: "Literal comprehension: paragraph 5 for both feelings.",
          steps: [
            "Shocked: 'he DISCOVERED that there were ONLY TWO FROGS in the pond' → shocked by small number.",
            "Disappointed: 'Fred's DREAM OF MAKING A FORTUNE WAS IMMEDIATELY DASHED' → plan failed.",
            "(a) shocked as: there were only two frogs in the pond.",
            "(b) disappointed as his: dream of making a fortune was dashed.",
          ],
          tip: "(a) Shocked = surprised by how few frogs there were. (b) Disappointed = his get-rich plan failed. Both answers directly from paragraph 5.",
        },
      },
    ],
  },
];

export const nanyang2025Paper = { meta, questions };
export default nanyang2025Paper;
