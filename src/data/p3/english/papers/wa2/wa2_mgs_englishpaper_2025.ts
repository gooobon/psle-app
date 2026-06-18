// ============================================================
// Methodist Girls' School (Primary) — WA2 2025 Primary 3
// English Language Paper  (25 marks, 45 min)
// Sections: A Vocabulary MCQ (3) | B Grammar MCQ (3)
//           C Grammar Cloze (4) | D Sentence Combining (2)
//           E Editing (5) | F Comprehension Selected Response (8)
// ============================================================

import type { PaperQuestion, PaperMeta } from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Methodist Girls' School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2",
  year: 2025,
  totalMarks: 25,
  timeMinutes: 45,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Vocabulary MCQ  (Q1–Q3, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2025-q1",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Many students __________ in annoyance when their teacher assigned them more homework to complete for the weekend.",
    options: ["(1) grinned", "(2) grumbled", "(3) quaked", "(4) quivered"],
    answer: "2",
    solution: {
      method: "Vocabulary: reaction in annoyance when given more homework.",
      steps: [
        "'in annoyance' = feeling irritated → expression of displeasure.",
        "'grumbled' = complained in a low, unhappy way → CORRECT for annoyance.",
        "'grinned' = smiled broadly → WRONG (not an annoyed reaction).",
        "'quaked/quivered' = trembled → fear, not annoyance.",
        "Answer: (2) grumbled.",
      ],
      tip: "'Grumbled in annoyance' = expressed displeasure by muttering complaints. Annoyance → grumble.",
    },
  },

  {
    kind: "A",
    id: "mgs2025-q2",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"Yesterday, I visited the __________ and saw many paintings and sculptures," James shared with me excitedly during lunch.',
    options: ["(1) gallery", "(2) garage", "(3) stable", "(4) stadium"],
    answer: "1",
    solution: {
      method: "Vocabulary: a place where paintings and sculptures are displayed.",
      steps: [
        "'paintings and sculptures' → art venue.",
        "'gallery' = a room/building for displaying art. CORRECT.",
        "'garage' = for vehicles → WRONG.",
        "'stable' = for horses → WRONG.",
        "'stadium' = for sports → WRONG.",
        "Answer: (1) gallery.",
      ],
      tip: "Art gallery = a place displaying paintings and sculptures. 'Art gallery' is the standard term.",
    },
  },

  {
    kind: "A",
    id: "mgs2025-q3",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Tom covered his mouth timidly and __________ when he saw the school bully slip and fall down the stairs.",
    options: ["(1) shrilled", "(2) shrieked", "(3) chuckled", "(4) guffawed"],
    answer: "3",
    solution: {
      method: "Vocabulary: laughing quietly when covering mouth timidly.",
      steps: [
        "'covered his mouth TIMIDLY' → small, suppressed laugh.",
        "'chuckled' = laughed quietly/softly. CORRECT.",
        "'guffawed' = laughed loudly and heartily → WRONG (timid + covered mouth).",
        "'shrieked/shrilled' = sharp cry → not a laugh.",
        "Answer: (3) chuckled.",
      ],
      tip: "Chuckle = quiet, suppressed laugh. Covering mouth timidly → small, hidden chuckle. Guffaw = loud laugh.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Grammar MCQ  (Q4–Q6, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2025-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My grandmother could not sleep well last night because of the loud music that __________ blasting from my neighbour's house.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "3",
    solution: {
      method: "Past tense: 'last night' = past; music = singular → 'was'.",
      steps: [
        "'last night' → PAST tense.",
        "Subject: 'music' → singular (uncountable).",
        "Singular past = WAS.",
        "(3) was → CORRECT.",
        "Answer: (3) was.",
      ],
      tip: "Music (singular) + last night (past) → WAS blasting. 'The music was blasting' = past continuous.",
    },
  },

  {
    kind: "A",
    id: "mgs2025-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The basketball team had just ended their practice. These balls must be __________.",
    options: ["(1) his", "(2) ours", "(3) yours", "(4) theirs"],
    answer: "4",
    solution: {
      method: "Possessive pronoun: balls belong to the basketball team (they/them) → theirs.",
      steps: [
        "Basketball team just ended practice → the balls belong to THEM.",
        "Possessive for they/them = THEIRS.",
        "(4) theirs → CORRECT.",
        "Answer: (4) theirs.",
      ],
      tip: "The team = they → their/theirs. 'These balls must be theirs' = they belong to the team.",
    },
  },

  {
    kind: "A",
    id: "mgs2025-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question: "We will have to complete our project __________ a week's time.",
    options: ["(1) at", "(2) in", "(3) by", "(4) before"],
    answer: "2",
    solution: {
      method: "Preposition of time: 'in a week's time' = after one week has passed.",
      steps: [
        "'in a week's time' = after one week → fixed expression.",
        "'in' is used with periods of time: 'in two days', 'in a week'. CORRECT.",
        "'at' = specific point (at 5 o'clock).",
        "'by' = deadline (by Friday).",
        "Answer: (2) in.",
      ],
      tip: "'In a week's time' = after one week has passed. Fixed expression. 'In' + period = after that period.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Grammar Cloze  (Q7–Q10, 4 marks)
  //  Passage: Kylie's First Day of School
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2025-secC",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "Kylie's First Day of School",
    passageText:
      "It was the first day of school. Kylie could not wait to (7) __________ her new classmates in school. Her mother (8) __________ her favourite eggs when Kylie entered the kitchen.\n\nAfter having a mouthful of the eggs, Kylie complained that they (9) __________ bland. She decided to add some salt and pepper. Then, Kylie walked to school with her mother. At the gate, a group of children (10) __________ to their parents. Kylie hugged her mother before skipping into the school.",
    wordBank: { A: "see", B: "saw", C: "was waving", D: "were waving", E: "taste", F: "tasted", G: "prepared", H: "was preparing" },
    questions: [
      {
        qid: "mgs2025-q7",
        blankLabel: "(7)",
        question: "Kylie could not wait to (7) __________ her new classmates.",
        answer: "A",
        solution: {
          method: "Infinitive after 'to': base form.",
          steps: ["'to ______' → base form needed.", "A (see) = base form of see → CORRECT.", "Answer: A (see)."],
          tip: "After 'to' (infinitive marker), always use base form: to see, to meet.",
        },
      },
      {
        qid: "mgs2025-q8",
        blankLabel: "(8)",
        question: "Her mother (8) __________ her favourite eggs when Kylie entered the kitchen.",
        answer: "H",
        solution: {
          method: "Past continuous: mother's ongoing action interrupted by Kylie entering.",
          steps: [
            "'when Kylie entered' → past interruption.",
            "Mother was in the middle of preparing eggs → PAST CONTINUOUS.",
            "Subject: 'Her mother' (singular) → was preparing.",
            "H (was preparing) → CORRECT.",
            "Answer: H (was preparing).",
          ],
          tip: "Past continuous = ongoing action when interrupted. 'Mother WAS PREPARING eggs when Kylie entered.'",
        },
      },
      {
        qid: "mgs2025-q9",
        blankLabel: "(9)",
        question: "Kylie complained that they (9) __________ bland.",
        answer: "F",
        solution: {
          method: "Past simple: reported speech in past; eggs' quality = past.",
          steps: [
            "'complained' (past) → reported speech → also past.",
            "F (tasted) = past simple of taste → 'they tasted bland'. CORRECT.",
            "E (taste) → base form → WRONG in past reported speech.",
            "Answer: F (tasted).",
          ],
          tip: "In past reported speech, the verb shifts to past: 'complained that they TASTED bland.'",
        },
      },
      {
        qid: "mgs2025-q10",
        blankLabel: "(10)",
        question: "At the gate, a group of children (10) __________ to their parents.",
        answer: "C",
        solution: {
          method: "Past continuous: children were in the act of waving (ongoing scene).",
          steps: [
            "Scene description: a group of children waving (ongoing at that moment).",
            "C (was waving) → singular. D (were waving) → plural.",
            "Subject: 'a group of children' — group acts as singular collective → was waving.",
            "Answer: C (was waving).",
          ],
          tip: "'A group of children was waving' — group (collective singular) → was. Were would be for 'the children'.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Sentence Combining  (Q11–Q12, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2025-q11",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Combine the two sentences into one.\n\nIt was raining heavily. The girls continued to swim.\n\n__________ although __________",
    answer: "The girls continued to swim although it was raining heavily.",
    solution: {
      method: "'Although' introduces contrast: swam despite heavy rain.",
      steps: [
        "Contrast: heavy rain → BUT girls still swam.",
        "'although' = even though.",
        "The girls continued to swim although it was raining heavily.",
        "Answer: The girls continued to swim although it was raining heavily.",
      ],
      tip: "'Although' = despite the fact that. The 'although' clause gives the surprising condition; main clause gives the result.",
    },
  },

  {
    kind: "A",
    id: "mgs2025-q12",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Combine the two sentences into one.\n\nAli screamed. He saw the mouse.\n\nWhen __________",
    answer: "When Ali saw the mouse, he screamed.",
    solution: {
      method: "'When' connects trigger (saw mouse) and response (screamed).",
      steps: [
        "Trigger: saw mouse. Response: screamed.",
        "When [trigger], [response].",
        "When Ali saw the mouse, he screamed.",
        "Comma after 'when' clause when it starts the sentence.",
        "Answer: When Ali saw the mouse, he screamed.",
      ],
      tip: "'When' starting a sentence: When [clause], [main clause]. Comma required after the 'when' clause.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Editing  (Q13–Q17, 5 marks)
  //  Passage: Oceans (spelling bold + grammar underlined)
  //  Adapted from "Underwater Action" What's Up May 2022
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2025-secE",
    topic: "Editing",
    marks: 5,
    passageTitle: "Oceans (adapted from 'Underwater Action', What's Up May 2022)",
    passageText:
      "Oceans cover 70 percent of Earth's surface. Did you [knew](13) that all the oceans of the world form one continuous body of water? As ocean [curants](14) move water around Earth, places are kept at the right temperature.\n\nNobody knows [ehzactly](15) how many types of living things there are in the ocean. Scientists [discovers](16) new marine species every year. When we learn more about these creatures, we can then take better care [in](17) our planet. Let us do our part to make a difference!",
    questions: [
      {
        qid: "mgs2025-q13",
        blankLabel: "(13)",
        question: "Did you [knew] that — correct the bold word (grammar).",
        answer: "know",
        solution: {
          method: "Grammar: 'Did you know' — after 'did', use base form.",
          steps: [
            "'Did you ______' → auxiliary 'did' → BASE FORM follows.",
            "know → base form. CORRECT.",
            "'knew' → simple past → WRONG after 'did'.",
            "Answer: know.",
          ],
          tip: "After 'did/didn't', always base form: 'Did you know?' NOT 'Did you knew?'",
        },
      },
      {
        qid: "mgs2025-q14",
        blankLabel: "(14)",
        question: "As ocean [curants] move water — correct the bold word (spelling).",
        answer: "currents",
        solution: {
          method: "Spelling: 'curants' → 'currents'.",
          steps: [
            "'curants' → wrong: missing 'r' and wrong ending.",
            "Correct: cur-RENTS → c-u-r-r-e-n-t-s.",
            "Answer: currents.",
          ],
          tip: "Currents = cur-RENTS. Double R: cuRRents. Ocean currents = flows of water.",
        },
      },
      {
        qid: "mgs2025-q15",
        blankLabel: "(15)",
        question: "Nobody knows [ehzactly] how many — correct the bold word (spelling).",
        answer: "exactly",
        solution: {
          method: "Spelling: 'ehzactly' → 'exactly'.",
          steps: [
            "'ehzactly' → wrong: 'ehz' instead of 'ex'.",
            "Correct: EX-act-ly → e-x-a-c-t-l-y.",
            "Answer: exactly.",
          ],
          tip: "Exactly = EX + act + ly. Starts with EX- not EHZ-. ex-ACT-ly.",
        },
      },
      {
        qid: "mgs2025-q16",
        blankLabel: "(16)",
        question: "Scientists [discovers] new marine species every year — correct the underlined word (grammar).",
        answer: "discover",
        solution: {
          method: "Grammar SVA: 'Scientists' = plural → base form.",
          steps: [
            "Subject: 'Scientists' → PLURAL.",
            "Plural present simple → BASE FORM: discover.",
            "'discovers' → singular -s → WRONG for plural.",
            "Answer: discover.",
          ],
          tip: "Scientists (plural, like 'they') → discover (base form). He/she/it discovers; they discover.",
        },
      },
      {
        qid: "mgs2025-q17",
        blankLabel: "(17)",
        question: "take better care [in] our planet — correct the underlined word (grammar/preposition).",
        answer: "of",
        solution: {
          method: "Preposition: 'take care of' = fixed phrase.",
          steps: [
            "'take better care ______ our planet' → fixed phrase 'take care OF'.",
            "'in' → WRONG preposition here.",
            "Answer: of.",
          ],
          tip: "'Take care OF' = fixed expression. 'Take care of our planet' = look after our planet. Never 'take care in'.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Comprehension (Selected Response)  (Q18–Q25, 8 marks)
  //  Passage: The Elephant Rope
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2025-secF",
    topic: "ComprehensionMCQ",
    marks: 8,
    passageTitle: "The Elephant Rope (adapted from The Elephant Rope)",
    passageText:
      "A man was walking through an elephant camp when he spotted adult elephants not kept in cages or held by any metal chains. All that was holding them back from escaping the camp was a small piece of rope tying one of their legs to a wooden stick stuck to the ground.\n\nAs the man gazed upon the elephants, he was completely confused. He could not understand why the elephants did not think of using their strength to break away from the rope and the stick. They could easily have done so, but they did not even try.\n\nCurious to know the answer, he asked a trainer nearby why the elephants were just standing around and have never tried to escape. The trainer explained that the herd of elephants had been captured since they were young. At a young age, a short piece of rope was strong enough to tie them to the wooden stick stuck to the ground. This prevented them from escaping. As these elephants grew bigger, they continued to believe that it would be impossible for them to break free. Since the elephants had failed to escape when they were young, they continued to believe that it was impossible to escape and did not bother to try to break free anymore.\n\nThe man realised that it was not the ropes that were holding the adult elephants back. It was their own belief that it was just impossible for them to escape that caused the elephants to be stuck right where they were.",
    questions: [
      {
        qid: "mgs2025-q18",
        question:
          "The elephants in the elephant camp were __________. [1m]\n(1) kept in cages\n(2) held by metal chains\n(3) spotted escaping from the camp\n(4) tied to a wooden stick stuck to the ground",
        options: [
          "(1) kept in cages",
          "(2) held by metal chains",
          "(3) spotted escaping from the camp",
          "(4) tied to a wooden stick stuck to the ground",
        ],
        answer: "4",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Para 1: 'not kept in cages or held by any metal chains.'",
            "'a small piece of rope tying one of their legs to a WOODEN STICK STUCK TO THE GROUND.'",
            "(4) tied to a wooden stick → CORRECT.",
            "Answer: (4).",
          ],
          tip: "The elephants were NOT in cages or chains. They were tied with rope to a wooden stick in the ground.",
        },
      },
      {
        qid: "mgs2025-q19",
        question: "TRUE or FALSE: When the elephants grew bigger, they did not bother to try and escape. [1m]",
        answer: "True",
        solution: {
          method: "Literal: paragraph 3.",
          steps: [
            "Para 3: 'As these elephants grew bigger, they continued to believe it would be IMPOSSIBLE for them to break free… did not bother to try to break free anymore.'",
            "Statement: TRUE.",
            "Answer: True.",
          ],
          tip: "As they grew, they still believed escape was impossible → didn't bother to try.",
        },
      },
      {
        qid: "mgs2025-q20",
        question: "TRUE or FALSE: The trainer wanted to find out why the elephants did not bother to escape. [1m]",
        answer: "False",
        solution: {
          method: "Literal: who wanted to find out?",
          steps: [
            "'Curious to know the answer, HE (the man) asked a trainer.'",
            "It was the MAN who wanted to find out, NOT the trainer.",
            "Statement: 'trainer wanted to find out' → FALSE.",
            "Answer: False.",
          ],
          tip: "The MAN was curious and asked the trainer. The trainer already knew the answer.",
        },
      },
      {
        qid: "mgs2025-q21",
        question: "TRUE or FALSE: A small piece of rope tied to a wooden stick was strong enough to prevent a young elephant from escaping. [1m]",
        answer: "True",
        solution: {
          method: "Literal: paragraph 3.",
          steps: [
            "Para 3: 'At a young age, A SHORT PIECE OF ROPE WAS STRONG ENOUGH TO TIE THEM to the wooden stick. This PREVENTED THEM FROM ESCAPING.'",
            "Statement: TRUE.",
            "Answer: True.",
          ],
          tip: "When young, a small rope was strong enough to hold them. As they grew, the rope was no longer strong enough but they didn't try.",
        },
      },
      {
        qid: "mgs2025-q22",
        question:
          "Which word has the same meaning as 'puzzled'? Circle (A) or (B). [1m]\n\n'As the man gazed upon the elephants, he was completely confused.'\n                          (A)                                        (B)",
        options: ["(A) gazed", "(B) confused"],
        answer: "B",
        solution: {
          method: "Vocabulary synonym: 'puzzled' = confused/unable to understand.",
          steps: [
            "'puzzled' = confused, unable to understand.",
            "(B) 'confused' = unable to understand → SYNONYM. CORRECT.",
            "(A) 'gazed' = looked steadily → different meaning.",
            "Answer: (B) confused.",
          ],
          tip: "Puzzled = confused. 'He was completely confused' = 'he was completely puzzled'. Both mean unable to understand.",
        },
      },
      {
        qid: "mgs2025-q23",
        question: "What could the elephants have easily done (lines 7 to 8)? [1m]",
        answer: "They could have used their strength to break away from the rope and the stick.",
        solution: {
          method: "Literal: lines 7-8 of paragraph 2.",
          steps: [
            "Lines 7-8: 'He could not understand why the elephants did not think of using their STRENGTH TO BREAK AWAY FROM THE ROPE AND THE STICK. They could EASILY have done so.'",
            "Answer: They could have used their strength to break away from the rope and the stick.",
          ],
          tip: "The passage explicitly says the elephants 'could easily have' broken away using their strength, but didn't try.",
        },
      },
      {
        qid: "mgs2025-q24",
        question:
          "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred. [1m]\n___ The man spoke to the trainer in the camp.\n___ The man saw elephants in the camp.\n___ The man knew why the elephants did not escape.",
        answer:
          "The man spoke to the trainer: 2\nThe man saw elephants: 1\nThe man knew why: 3",
        solution: {
          method: "Sequence: para 1 = saw elephants; para 3 = spoke to trainer; para 3-4 = knew why.",
          steps: [
            "Para 1: Man SAW ELEPHANTS. ORDER: 1",
            "Para 3: Man ASKED TRAINER. ORDER: 2",
            "Para 4: Man REALISED/KNEW why. ORDER: 3",
            "Answer: saw (1) → spoke to trainer (2) → knew why (3).",
          ],
          tip: "Follow paragraph order: saw elephants (para 1) → asked trainer (para 3) → understood why (para 4).",
        },
      },
      {
        qid: "mgs2025-q25",
        question: "What caused the adult elephants to be stuck in the camp? [1m]",
        answer:
          "The adult elephants believed that it was just impossible for them to escape.",
        solution: {
          method: "Literal: paragraph 4.",
          steps: [
            "Para 4: 'It was THEIR OWN BELIEF that it was just impossible for them to escape that caused the elephants to be stuck.'",
            "Answer: Their own belief that it was impossible to escape.",
          ],
          tip: "NOT the rope itself — it was their BELIEF that held them back. Paragraph 4 makes this explicit.",
        },
      },
    ],
  },
];

export const mgs2025Paper = { meta, questions };
export default mgs2025Paper;
