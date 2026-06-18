// ============================================================
// Methodist Girls' School (Primary) — WA2 2022 Primary 3
// English Language Paper  (25 marks, 45 min)
// Sections: A Vocabulary MCQ | B Grammar MCQ | C Grammar Cloze
//           D Sentence Combining | E Editing | F Comprehension
// ============================================================

export type TopicType =
  | "GrammarMCQ"
  | "VocabMCQ"
  | "GrammarCloze"
  | "VocabCloze"
  | "Editing"
  | "SentenceCombining"
  | "VisualText"
  | "ComprehensionMCQ"
  | "ComprehensionOE"
  | "ComprehensionFIB";

// ── Type A: standalone question ──────────────────────────────
export interface TypeAQuestion {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  question: string;
  options?: string[];           // MCQ only
  answer: string;
  solution: {
    method: string;
    steps: string[];
    tip: string;
  };
}

// ── Type B: passage / set question ───────────────────────────
export interface TypeBPassage {
  kind: "B";
  id: string;
  topic: TopicType;
  marks: number;
  passageTitle?: string;
  passageText: string;
  wordBank?: Record<string, string>; // e.g. { A: "see", B: "saw", … }
  questions: TypeBQuestion[];
}

export interface TypeBQuestion {
  qid: string;
  blankLabel?: string;           // "(7)", "(13)", etc.
  question: string;
  options?: string[];
  answer: string;
  solution: {
    method: string;
    steps: string[];
    tip: string;
  };
}

export type PaperQuestion = TypeAQuestion | TypeBPassage;

// ── Paper metadata ────────────────────────────────────────────
export interface PaperMeta {
  school: string;
  level: string;
  subject: string;
  term: string;
  year: number;
  totalMarks: number;
  timeMinutes: number;
}

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────

export const meta: PaperMeta = {
  school: "Methodist Girls' School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2",
  year: 2022,
  totalMarks: 25,
  timeMinutes: 45,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  SECTION A — Vocabulary MCQ  (Q1–Q3, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2022-q1",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Many students __________ in annoyance when their teacher assigned them more homework to complete for the weekend.",
    options: ["(1) grinned", "(2) grumbled", "(3) quaked", "(4) quivered"],
    answer: "2",
    solution: {
      method: "Vocabulary-in-context: choose the word that best fits the emotion expressed (annoyance).",
      steps: [
        "The key clue is 'in annoyance' — the students are unhappy/frustrated.",
        "grinned = smiled widely → does NOT match annoyance.",
        "grumbled = complained quietly in an unhappy way → MATCHES annoyance perfectly.",
        "quaked = trembled with fear → does not fit annoyance.",
        "quivered = trembled slightly (often with emotion/cold) → possible but weaker than grumbled.",
        "Answer: (2) grumbled.",
      ],
      tip: "When the sentence already tells you the emotion ('in annoyance'), pick the verb that directly expresses that emotion. 'Grumbled' is the standard word for muttering complaints.",
    },
  },

  {
    kind: "A",
    id: "mgs2022-q2",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"Yesterday, I visited the __________ and saw many paintings and sculptures," James shared with me excitedly during lunch.',
    options: ["(1) gallery", "(2) garage", "(3) stable", "(4) stadium"],
    answer: "1",
    solution: {
      method: "Vocabulary: identify the place that contains paintings and sculptures.",
      steps: [
        "Clue words: 'paintings and sculptures' — these are works of art.",
        "gallery = a place where works of art are displayed → MATCHES.",
        "garage = a place to park or repair cars → does not match.",
        "stable = a building where horses are kept → does not match.",
        "stadium = a large sports venue → does not match.",
        "Answer: (1) gallery.",
      ],
      tip: "Art gallery questions are common — remember: paintings + sculptures = art gallery.",
    },
  },

  {
    kind: "A",
    id: "mgs2022-q3",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Tom covered his mouth timidly and __________ when he saw the school bully slip and fall down the stairs.",
    options: [
      "(1) shrilled",
      "(2) shrieked",
      "(3) chuckled",
      "(4) guffawed",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: choose the laugh/sound word that fits the context of 'covering his mouth timidly'.",
      steps: [
        "Key clue: Tom covered his mouth TIMIDLY — he is shy or trying to hide his reaction.",
        "shrilled = made a high piercing sound → not typically used for laughter.",
        "shrieked = cried out with a loud sharp sound (fear/excitement) → too loud/bold for 'timidly'.",
        "chuckled = laughed quietly to oneself → MATCHES 'timidly' and covering his mouth.",
        "guffawed = laughed loudly and heartily → opposite of timid.",
        "Answer: (3) chuckled.",
      ],
      tip: "Intensity matters: 'timidly' + 'covered his mouth' → quiet, restrained laughter → chuckled. Guffawed is always loud; shrieked is a sharp cry.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION B — Grammar MCQ  (Q4–Q6, 3 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2022-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My grandmother could not sleep well last night because of the loud music that __________ blasting from my neighbour's house.",
    options: ["(1) is", "(2) are", "(3) was", "(4) were"],
    answer: "3",
    solution: {
      method: "Subject-verb agreement + tense: the relative clause modifies 'music' and refers to the past.",
      steps: [
        "The main clause is in the PAST ('could not sleep well last night') → the relative clause must also be past tense.",
        "The subject of the relative clause is 'music' — singular uncountable noun.",
        "Singular past tense of 'to be' = WAS.",
        "'are' / 'is' → present tense → eliminated.",
        "'were' → past but plural → eliminated (music is singular).",
        "Answer: (3) was.",
      ],
      tip: "Time clues like 'last night' lock the whole sentence into the past. Always check: singular subject → was; plural subject → were.",
    },
  },

  {
    kind: "A",
    id: "mgs2022-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The basketball team had just ended their practice. These balls must be __________.",
    options: ["(1) his", "(2) ours", "(3) yours", "(4) theirs"],
    answer: "4",
    solution: {
      method: "Pronoun reference: identify who the balls belong to based on context.",
      steps: [
        "The basketball team just finished practice — the balls belong to the TEAM.",
        "'his' → singular male → does not match 'team' (plural referent in context).",
        "'ours' → speaker + others → no indication the speaker owns them.",
        "'yours' → the listener's → no indication.",
        "'theirs' → belonging to them (the team) → MATCHES the basketball team.",
        "Answer: (4) theirs.",
      ],
      tip: "Possessive pronouns without a noun: his / hers / ours / yours / theirs / mine / its. Match the pronoun to who 'they' refers to in the previous sentence.",
    },
  },

  {
    kind: "A",
    id: "mgs2022-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question: "We will have to complete our project __________ a week's time.",
    options: ["(1) at", "(2) in", "(3) by", "(4) before"],
    answer: "2",
    solution: {
      method: "Preposition of time: choose the correct preposition for a duration/deadline.",
      steps: [
        "The phrase 'a week's time' expresses a span/duration of time into the future.",
        "'at' → used for specific clock times (at 3 pm) or expressions like 'at night' → not for durations.",
        "'in' + duration → 'in a week's time' = after a period of one week from now → standard English idiom. CORRECT.",
        "'by' → means no later than a deadline → would need 'by next week' or 'by Friday', not 'by a week's time'.",
        "'before' → same issue as 'by' — not used with 'a week's time' in this way.",
        "Answer: (2) in.",
      ],
      tip: "Fixed phrase: 'in a week's time' / 'in two days' time' = after that period elapses. Compare: 'by next Friday' = no later than that date.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION C — Grammar Cloze  (Q7–Q10, 4 marks)
  //  Passage: First Day of School (Kylie)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2022-secC",
    topic: "GrammarCloze",
    marks: 4,
    passageTitle: "First Day of School",
    passageText:
      "It was the first day of school. Kylie could not wait to (7) her new classmates in school. Her mother (8) her favourite eggs when Kylie entered the kitchen. After having a mouthful of the eggs, Kylie complained that they (9) bland. She decided to add some salt and pepper. Then, Kylie walked to school with her mother. At the gate, a group of children (10) to their parents. Kylie hugged her mother before skipping into the school.",
    wordBank: {
      A: "see",
      B: "saw",
      C: "was waving",
      D: "were waving",
      E: "taste",
      F: "tasted",
      G: "prepared",
      H: "was preparing",
    },
    questions: [
      {
        qid: "mgs2022-q7",
        blankLabel: "(7)",
        question:
          "Kylie could not wait to __________ her new classmates in school.",
        answer: "A",
        solution: {
          method: "Verb form after modal 'could not wait to': base form required.",
          steps: [
            "'could not wait to' is a modal expression → must be followed by the BASE FORM of a verb.",
            "Base form options in the word bank: A (see) and E (taste).",
            "Context: Kylie wants to meet her new classmates → 'see' is correct (you 'see' people).",
            "Answer: A (see).",
          ],
          tip: "After 'to' (infinitive), always use the base form of the verb. 'See' collocates naturally with people: 'I can't wait to see you.'",
        },
      },
      {
        qid: "mgs2022-q8",
        blankLabel: "(8)",
        question:
          "Her mother __________ her favourite eggs when Kylie entered the kitchen.",
        answer: "H",
        solution: {
          method: "Past continuous vs simple past: action in progress when another action happened.",
          steps: [
            "Structure: 'Her mother ______ eggs WHEN Kylie entered' → two past actions.",
            "'When Kylie entered' is a completed past action (simple past).",
            "The mother's action was ONGOING at the time Kylie entered → past continuous.",
            "Subject 'mother' = singular → 'was preparing' (not 'were preparing').",
            "Answer: H (was preparing).",
          ],
          tip: "When two past events occur together and one was in progress: use PAST CONTINUOUS ('was/were + -ing') for the ongoing action, SIMPLE PAST for the interrupting event.",
        },
      },
      {
        qid: "mgs2022-q9",
        blankLabel: "(9)",
        question:
          "Kylie complained that they __________ bland.",
        answer: "F",
        solution: {
          method: "Past tense reporting with 'that' clause; 'they' = the eggs (plural).",
          steps: [
            "'Kylie complained that they ______ bland' — reported speech in the past.",
            "Subject 'they' (the eggs) is PLURAL.",
            "Simple past of taste → 'tasted' (F) → matches plural subject in past tense context.",
            "'taste' (E) is present tense → eliminated.",
            "'tasted' (F) = past simple of taste → CORRECT.",
            "Answer: F (tasted).",
          ],
          tip: "In reported speech, the verb in the 'that' clause backshifts to the past. 'taste → tasted' for past tense.",
        },
      },
      {
        qid: "mgs2022-q10",
        blankLabel: "(10)",
        question:
          "At the gate, a group of children __________ to their parents.",
        answer: "D",
        solution: {
          method: "Subject-verb agreement with 'a group of children' (plural meaning) + ongoing past action.",
          steps: [
            "Scene: Kylie arrived at the gate — this is a past moment (narrative in past tense).",
            "The children waving was an action happening at that moment → past continuous.",
            "Subject: 'a group of children' — when 'a group of' is used to refer to members doing something together, the verb can agree with the plural 'children'.",
            "Past continuous options: C (was waving) or D (were waving).",
            "'a group of children' → focus on the children (plural) → 'were waving'.",
            "Answer: D (were waving).",
          ],
          tip: "With 'a group of [plural noun]', if the meaning focuses on the individual members, use the plural verb: 'a group of children were waving'. Compare: 'the group was noisy' (group as a unit).",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION D — Sentence Combining  (Q11–Q12, 2 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "mgs2022-q11",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Combine the two sentences into one using the word given.\n\nSentences: It was raining heavily. The girls continued to swim.\nConnecting word: although",
    answer:
      "The girls continued to swim although it was raining heavily.",
    solution: {
      method: "Use 'although' to show contrast between two clauses; either clause may come first.",
      steps: [
        "'Although' introduces a subordinate clause showing contrast/concession.",
        "Two valid structures:\n  (a) Although it was raining heavily, the girls continued to swim.\n  (b) The girls continued to swim although it was raining heavily.",
        "Both are grammatically correct. A comma is used when 'although' clause comes first.",
        "Do NOT use 'but' alongside 'although' (common error).",
        "Model answer: The girls continued to swim although it was raining heavily.",
      ],
      tip: "When 'although' starts the sentence, add a comma before the main clause. When it's in the middle, no comma is needed.",
    },
  },

  {
    kind: "A",
    id: "mgs2022-q12",
    topic: "SentenceCombining",
    marks: 1,
    question:
      "Combine the two sentences into one using the word given.\n\nSentences: Ali screamed. He saw the mouse.\nConnecting word: When (must begin the sentence)",
    answer:
      "When Ali saw the mouse, he screamed.",
    solution: {
      method: "Use 'When' to connect the cause (seeing the mouse) and the effect (screaming). 'When' starts the sentence.",
      steps: [
        "The prompt says 'When' — place it at the start of the sentence.",
        "'When' introduces the time/trigger: 'When Ali saw the mouse'.",
        "The result follows as the main clause: 'he screamed'.",
        "Comma required after the 'When' clause when it is placed first.",
        "Answer: When Ali saw the mouse, he screamed.",
      ],
      tip: "If the prompt gives you the first word, the structure is: When [cause], [effect]. Don't forget the comma after the subordinate clause.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  SECTION E — Editing  (Q13–Q17, 5 marks)
  //  Passage: "Underwater Action" (adapted)
  //  Correct bold words (spelling) and underlined words (grammar)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2022-secE",
    topic: "Editing",
    marks: 5,
    passageTitle: "Underwater Action (adapted from What's Up May 2022)",
    passageText:
      "Oceans cover 70 percent of Earth's surface. Did you [knew](13) that all the oceans of the world form one continuous body of water? As ocean [curants](14) move water around Earth, places are kept at the right temperature.\n\nNobody knows [ehzactly](15) how many types of living things there are in the ocean. Scientists [discovers](16) new marine species every year. When we learn more about these creatures, we can then take better care [in](17) our planet. Let us do our part to make a difference!",
    questions: [
      {
        qid: "mgs2022-q13",
        blankLabel: "(13)",
        question:
          "Did you [knew] that all the oceans of the world form one continuous body of water? — Correct the underlined word.",
        answer: "know",
        solution: {
          method: "Grammar: auxiliary verb 'did' must be followed by the base form of the main verb.",
          steps: [
            "Structure: 'Did you ____?' — 'did' is the auxiliary verb in a question.",
            "After an auxiliary verb (did / do / does / will / can, etc.), the main verb must be in the BASE FORM.",
            "'knew' is past tense → INCORRECT after 'did'.",
            "Base form of 'know' = 'know'.",
            "Answer: know.",
          ],
          tip: "Golden rule: Did + subject + BASE FORM. Never 'did you knew' — it's always 'did you know'.",
        },
      },
      {
        qid: "mgs2022-q14",
        blankLabel: "(14)",
        question:
          "As ocean [curants] move water around Earth, places are kept at the right temperature. — Correct the bold word (spelling).",
        answer: "currents",
        solution: {
          method: "Spelling correction: 'curants' is misspelled.",
          steps: [
            "Context: ocean ______ move water → referring to flows of water in the ocean.",
            "The correct word is 'currents' (noun, plural) meaning streams of water/air moving in a direction.",
            "'curants' → missing 'r' and 'e' → misspelled.",
            "Correct spelling: c-u-r-r-e-n-t-s.",
            "Answer: currents.",
          ],
          tip: "Ocean currents — remember the double 'r' and '-ent' ending. Think: electric current, ocean current — same spelling pattern.",
        },
      },
      {
        qid: "mgs2022-q15",
        blankLabel: "(15)",
        question:
          "Nobody knows [ehzactly] how many types of living things there are in the ocean. — Correct the bold word (spelling).",
        answer: "exactly",
        solution: {
          method: "Spelling correction: 'ehzactly' is misspelled.",
          steps: [
            "The intended word is the adverb meaning 'precisely' / 'with complete accuracy'.",
            "'ehzactly' → 'eh' at the start is wrong; the letter 'z' is also misplaced.",
            "Correct spelling: e-x-a-c-t-l-y ('exactly').",
            "Break it down: ex-act-ly.",
            "Answer: exactly.",
          ],
          tip: "Exactly = ex + act + ly. The 'x' makes the /gz/ sound. A common misspelling is using 'z' instead of 'x'.",
        },
      },
      {
        qid: "mgs2022-q16",
        blankLabel: "(16)",
        question:
          "Scientists [discovers] new marine species every year. — Correct the underlined word.",
        answer: "discover",
        solution: {
          method: "Grammar: subject-verb agreement — plural subject 'Scientists' needs a plural verb form.",
          steps: [
            "Subject: 'Scientists' — third-person PLURAL.",
            "Present simple: plural subjects take the BASE FORM (no -s/-es).",
            "'discovers' has the -s ending → used only for third-person singular (he/she/it discovers).",
            "'Scientists discover' is the correct form.",
            "Answer: discover.",
          ],
          tip: "Subject-verb agreement: he/she/it → adds -s (discovers). They/we/you/I → base form (discover). 'Scientists' = they → no -s.",
        },
      },
      {
        qid: "mgs2022-q17",
        blankLabel: "(17)",
        question:
          "We can then take better care [in] our planet. — Correct the underlined word.",
        answer: "of",
        solution: {
          method: "Grammar: fixed prepositional phrase — 'take care OF'.",
          steps: [
            "The phrase 'take care' is always followed by 'of' when an object follows.",
            "'take care in' is not a standard English idiom.",
            "'in' → INCORRECT preposition here.",
            "Correct: 'take better care of our planet'.",
            "Answer: of.",
          ],
          tip: "Fixed phrase: take care OF something/someone. Also: 'be careful of', 'beware of'. The preposition 'of' follows 'care' as a noun.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  SECTION F — Comprehension  (Q18–Q25, 8 marks total)
  //  Passage: "The Elephant Rope" (adapted)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2022-secF",
    topic: "ComprehensionMCQ",
    marks: 8,
    passageTitle: "The Elephant Rope",
    passageText:
      "A man was walking through an elephant camp when he spotted adult elephants not kept in cages or held by any metal chains. All that was holding them back from escaping the camp, was a small piece of rope tying one of their legs to a wooden stick stuck to the ground.\n\nAs the man gazed upon the elephants, he was completely confused. He could not understand why the elephants did not think of using their strength to break away from the rope and the stick. They could easily have done so, but they did not even try.\n\nCurious to know the answer, he asked a trainer nearby why the elephants were just standing around and have never tried to escape. The trainer explained that the herd of elephants had been captured since they were young. At a young age, a short piece of rope was strong enough to tie them to the wooden stick stuck to the ground. This prevented them from escaping. As these elephants grew bigger, they continued to believe that it would be impossible for them to break free. Since the elephants had failed to escape when they were young, they continued to believe that it was impossible to escape and did not bother to try to break free anymore.\n\nThe man realised that it was not the ropes that were holding the adult elephants back. It was their own belief that it was just impossible for them to escape that caused the elephants to be stuck right where they were.",
    questions: [
      // Q18 — MCQ [1m]
      {
        qid: "mgs2022-q18",
        question:
          "The elephants in the elephant camp were __________.\n(1) kept in cages\n(2) held by metal chains\n(3) spotted escaping from the camp\n(4) tied to a wooden stick stuck to the ground",
        options: [
          "(1) kept in cages",
          "(2) held by metal chains",
          "(3) spotted escaping from the camp",
          "(4) tied to a wooden stick stuck to the ground",
        ],
        answer: "4",
        solution: {
          method: "Literal comprehension: locate the detail in paragraph 1.",
          steps: [
            "Paragraph 1: 'adult elephants not kept in cages or held by any metal chains' → eliminates (1) and (2).",
            "Paragraph 1: 'All that was holding them back…was a small piece of rope tying one of their legs to a wooden stick stuck to the ground.'",
            "(3) is wrong — they were NOT escaping.",
            "(4) matches the text exactly.",
            "Answer: (4).",
          ],
          tip: "For 'which is true' MCQ, the wrong options often reverse what the text says. Look for the passage's exact wording.",
        },
      },

      // Q19–Q21 — True/False [3m]
      {
        qid: "mgs2022-q19",
        question:
          "TRUE or FALSE: When the elephants grew bigger, they did not bother to try and escape.",
        answer: "True",
        solution: {
          method: "Locate evidence in paragraph 3.",
          steps: [
            "Paragraph 3: 'they continued to believe that it was impossible to escape and did not bother to try to break free anymore.'",
            "This confirms the statement is TRUE.",
          ],
          tip: "For True/False, always find the supporting line in the passage. Don't rely on general knowledge.",
        },
      },
      {
        qid: "mgs2022-q20",
        question:
          "TRUE or FALSE: The trainer wanted to find out why the elephants did not bother to escape.",
        answer: "False",
        solution: {
          method: "Identify who wanted to find out: the man, not the trainer.",
          steps: [
            "Paragraph 3: 'Curious to know the answer, HE asked a trainer nearby…' — HE = the man.",
            "It was the MAN who was curious and wanted to know.",
            "The trainer already knew the answer — he explained it.",
            "Statement says the TRAINER wanted to find out → FALSE.",
          ],
          tip: "Swap-the-subject trick: the statement replaces 'the man' with 'the trainer'. Always check WHO does the action.",
        },
      },
      {
        qid: "mgs2022-q21",
        question:
          "TRUE or FALSE: A small piece of rope tied to a wooden stick was strong enough to prevent a young elephant from escaping.",
        answer: "True",
        solution: {
          method: "Locate the detail about young elephants in paragraph 3.",
          steps: [
            "Paragraph 3: 'At a young age, a short piece of rope was strong enough to tie them to the wooden stick stuck to the ground. This prevented them from escaping.'",
            "Statement matches this information → TRUE.",
          ],
          tip: "The passage says 'at a young age' the rope worked. As adults it would not have worked physically — but the elephants still believed it.",
        },
      },

      // Q22 — Vocabulary (word meaning) [1m]
      {
        qid: "mgs2022-q22",
        question:
          'Which word has the same meaning as "puzzled"? Circle (A) or (B).\n\n"As the man gazed upon the elephants, he was completely confused."\n                                 (A)                          (B)',
        options: ["(A) gazed", "(B) confused"],
        answer: "B",
        solution: {
          method: "Find the synonym of 'puzzled' among the two underlined/labelled words.",
          steps: [
            "'Puzzled' means unable to understand something; feeling confused.",
            "(A) 'gazed' = looked at steadily → not the same as puzzled.",
            "(B) 'confused' = unable to understand; puzzled → SYNONYM.",
            "Answer: (B) confused.",
          ],
          tip: "Puzzled = confused = baffled = perplexed. They all describe the same feeling of not understanding something.",
        },
      },

      // Q23 — Open-ended [1m]
      {
        qid: "mgs2022-q23",
        question:
          "What could the elephants have easily done (line 7 to 8)?",
        answer:
          "The elephants could have easily used their strength to break away from the rope and the stick.",
        solution: {
          method: "Locate the answer in lines 7–8 of the passage (paragraph 2).",
          steps: [
            "Lines 7–8 (paragraph 2): 'He could not understand why the elephants did not think of using their strength to break away from the rope and the stick. They could easily have done so, but they did not even try.'",
            "The question asks what they COULD have easily done.",
            "Answer: Use their strength to break away from the rope and the stick.",
            "Write as a complete sentence starting from 'The elephants could have…'.",
          ],
          tip: "For open-ended comprehension, always write a COMPLETE sentence. Use the passage language but rephrase if needed to make it your own sentence.",
        },
      },

      // Q24 — Sequence ordering [1m]
      {
        qid: "mgs2022-q24",
        question:
          "Write 1, 2 and 3 in the blanks to indicate the order in which the events occurred in the story.\n\n___ The man spoke to the trainer in the camp.\n___ The man saw elephants in the camp.\n___ The man knew why the elephants did not escape.",
        answer:
          "The man spoke to the trainer in the camp: 2\nThe man saw elephants in the camp: 1\nThe man knew why the elephants did not escape: 3",
        solution: {
          method: "Sequence comprehension: map the events to their order in the passage.",
          steps: [
            "Event 1 — 'The man saw elephants in the camp.' → Paragraph 1: man walks through camp and spots elephants. ORDER: 1",
            "Event 2 — 'The man spoke to the trainer in the camp.' → Paragraph 3: 'he asked a trainer nearby'. ORDER: 2",
            "Event 3 — 'The man knew why the elephants did not escape.' → Paragraph 3/4: trainer explains; man realises. ORDER: 3",
            "Sequence: Saw elephants (1) → Spoke to trainer (2) → Knew why (3).",
          ],
          tip: "For sequence questions, read the passage in order and number each listed event as you find it. Don't rely on memory — scan the text.",
        },
      },

      // Q25 — Open-ended [1m]
      {
        qid: "mgs2022-q25",
        question:
          "What caused the adult elephants to be stuck in the camp?",
        answer:
          "The adult elephants believed that it was impossible for them to escape, so they did not bother to try to break free.",
        solution: {
          method: "Inferential/literal comprehension: combine paragraphs 3 and 4 to explain the cause.",
          steps: [
            "Paragraph 4: 'It was their own belief that it was just impossible for them to escape that caused the elephants to be stuck right where they were.'",
            "The cause = their OWN BELIEF that escape was impossible.",
            "This belief formed because they failed to escape when young.",
            "Write as a complete sentence: 'The adult elephants believed that it was impossible for them to escape, so they did not bother to try.'",
          ],
          tip: "The passage explicitly states the cause in the final paragraph. For cause questions ('What caused…?'), look for because/reason/so that language in the text.",
        },
      },
    ],
  },
];

// ── Convenience export ────────────────────────────────────────
export const mgs2022Paper = { meta, questions };
export default mgs2022Paper;
