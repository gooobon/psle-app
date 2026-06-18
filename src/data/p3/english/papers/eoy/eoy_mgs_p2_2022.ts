// src/data/p3/english/papers/eoy_mgs_p2_2022.ts
// Methodist Girls' School (Primary) — P3 English EOY 2022
// Paper 2: Booklet A (Grammar MCQ + Vocab MCQ) + Booklet B (Grammar Cloze × 2, Editing, Synthesis, Vocab Cloze) + Booklet C (Comprehension 1 MCQ/FIB/T‑F, Comprehension 2 OE)
// Listening excluded per instructions. Long composition excluded.

import { PaperSet } from "../../types";

const eoy_mgs_p2_2022: PaperSet = {
  id: "eoy_mgs_p2_2022",
  school: "Methodist Girls' School (Primary)",
  schoolCode: "mgs",
  level: "P3",
  subject: "English",
  paperType: "EOY",
  year: 2022,
  paper: 2,
  totalMarks: 50,
  sections: [
    // ─────────────────────────────────────────────
    // BOOKLET A — Section A: Grammar MCQ (Q1–Q8, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletA_secA",
      sectionLabel: "Booklet A — Section A: Grammar",
      topic: "GrammarMCQ",
      instructions:
        "For each question from 1 to 8, four options are given. One of them is the correct answer. Make your choice (1, 2, 3, or 4) and shade your answer on the Optical Answer Sheet.",
      marks: 8,
      questions: [
        {
          id: "mgs22_A1",
          type: "A",
          qNumber: 1,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The bags of rice __________ heavy. I need help carrying them to the car now.",
          options: ["is", "are", "was", "were"],
          answer: 2,
          answerText: "are",
          solution: {
            method: "Subject-Verb Agreement",
            steps: [
              "Identify the subject: 'The bags of rice' — 'bags' is a plural noun.",
              "The sentence uses the present tense (I need help NOW).",
              "Plural noun + present tense → 'are'.",
              "Eliminate: (1) 'is' is singular; (3) 'was' and (4) 'were' are past tense.",
            ],
            tip: "Always look at the head noun of the subject phrase. 'Bags' (plural) takes 'are', not 'is'.",
          },
        },
        {
          id: "mgs22_A2",
          type: "A",
          qNumber: 2,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "It was raining heavily when the accident __________.",
          options: ["happen", "happens", "happened", "was happening"],
          answer: 3,
          answerText: "happened",
          solution: {
            method: "Past Tense Sequencing",
            steps: [
              "Key clue: 'It WAS raining' — the main time frame is past.",
              "The two actions (raining, accident happening) occurred at the same past moment.",
              "Use simple past 'happened' for the second action that occurred at a specific moment.",
              "'Was happening' implies the accident was in progress, but the sentence describes the event of the accident occurring, so simple past is correct.",
            ],
            tip: "When a subordinate clause uses 'when' and describes a completed event, use simple past.",
          },
        },
        {
          id: "mgs22_A3",
          type: "A",
          qNumber: 3,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "__________ Siti was hungry, she did not eat during recess.",
          options: ["If", "As", "Since", "Although"],
          answer: 4,
          answerText: "Although",
          solution: {
            method: "Conjunctions of Concession",
            steps: [
              "Identify the contrast: being hungry VS. not eating — these are contradictory actions.",
              "'Although' introduces a concessive clause — the first fact is surprising given the second.",
              "(1) 'If' = condition; (2) 'As' = because/time; (3) 'Since' = because.",
              "Only 'Although' correctly signals the 'despite' relationship.",
            ],
            tip: "When two clauses seem to contradict each other, use 'Although', 'Though', or 'Even though'.",
          },
        },
        {
          id: "mgs22_A4",
          type: "A",
          qNumber: 4,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "My sister and I could not fall asleep last night as we had watched a horror movie. __________ kept us up the whole night!",
          options: ["It", "We", "She", "They"],
          answer: 1,
          answerText: "It",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "What kept them up? → 'the horror movie' (singular, inanimate object).",
              "Use 'It' to refer to a single inanimate thing.",
              "(2) 'We' would mean the sisters kept themselves up; (3) 'She' refers to a singular female person; (4) 'They' is plural.",
            ],
            tip: "Find what the pronoun refers to. A movie is a single inanimate object → 'It'.",
          },
        },
        {
          id: "mgs22_A5",
          type: "A",
          qNumber: 5,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mrs Lim instructed the children to __________ their temperature when they walked into the classroom.",
          options: ["take", "took", "takes", "taking"],
          answer: 1,
          answerText: "take",
          solution: {
            method: "Infinitive after 'instruct to'",
            steps: [
              "The verb pattern is: instruct + object + TO + base verb.",
              "'Mrs Lim instructed the children TO ___' → base form needed.",
              "'take' is the correct base form.",
              "Eliminate: (2) 'took' is past tense; (3) 'takes' is 3rd person singular present; (4) 'taking' is gerund/present participle.",
            ],
            tip: "After 'instruct/ask/tell someone TO', always use the base form of the verb.",
          },
        },
        {
          id: "mgs22_A6",
          type: "A",
          qNumber: 6,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "There was only __________ sugar left so Mariam could not bake the cake. She likes her cake to be sweet.",
          options: ["many", "much", "a few", "a little"],
          answer: 4,
          answerText: "a little",
          solution: {
            method: "Countable vs Uncountable Nouns",
            steps: [
              "Sugar is an uncountable noun → cannot use 'many' or 'a few' (countable).",
              "'Much' means a large quantity (uncountable). 'A little' means a small amount (uncountable).",
              "The sentence says 'only ___ sugar left', indicating a small/insufficient amount.",
              "'A little' = small quantity; correct here. 'Much' would contradict 'only … so she could not bake'.",
            ],
            tip: "For uncountable nouns: use 'much' (large) or 'a little' (small). 'Many'/'a few' are for countable nouns.",
          },
        },
        {
          id: "mgs22_A7",
          type: "A",
          qNumber: 7,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Karthik will not be late for school if he __________ home on time.",
          options: ["left", "leave", "leaves", "is leaving"],
          answer: 3,
          answerText: "leaves",
          solution: {
            method: "First Conditional (Real Condition)",
            steps: [
              "Sentence structure: 'will + base verb' in the main clause → first conditional (real future condition).",
              "First conditional rule: IF + present simple, WILL + base verb.",
              "Subject 'he' is third person singular → 'leaves'.",
              "Eliminate: (1) 'left' is past; (2) 'leave' missing third-person -s; (4) 'is leaving' is continuous.",
            ],
            tip: "In 'If … will …' sentences, the IF clause takes present simple: 'if he leaves' (not 'will leave').",
          },
        },
        {
          id: "mgs22_A8",
          type: "A",
          qNumber: 8,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Meimei, you are supposed to do your homework now, __________ you?" Xueping questioned her sister.',
          options: ["isn't", "don't", "aren't", "doesn't"],
          answer: 3,
          answerText: "aren't",
          solution: {
            method: "Question Tags",
            steps: [
              "The main verb is 'are' (you are supposed to…).",
              "Question tag rule: auxiliary of main clause → negated tag.",
              "'You are' → tag must be 'aren't you?'",
              "Eliminate: (1) 'isn't' is for 'is'; (2) 'don't' is for do; (4) 'doesn't' is for does.",
            ],
            tip: "Question tag = auxiliary verb from the main clause, made negative. 'You ARE supposed' → 'aren't you?'",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET A — Section B: Vocabulary MCQ (Q9–Q14, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletA_secB",
      sectionLabel: "Booklet A — Section B: Vocabulary",
      topic: "VocabMCQ",
      instructions:
        "For each question from 9 to 14, four options are given. One of them is the correct answer. Make your choice (1, 2, 3, or 4) and shade your answer on the Optical Answer Sheet.",
      marks: 6,
      questions: [
        {
          id: "mgs22_B9",
          type: "A",
          qNumber: 9,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Jeralyn was __________ when her teacher praised her for showing improvement in her spelling.",
          options: [
            "as busy as a bee",
            "as wise as an owl",
            "as proud as a peacock",
            "as hardworking as an ant",
          ],
          answer: 3,
          answerText: "as proud as a peacock",
          solution: {
            method: "Similes / Idioms in Context",
            steps: [
              "Context: teacher praised Jeralyn → she felt proud/pleased.",
              "'As proud as a peacock' = very proud (peacocks fan their feathers showing off).",
              "(1) as busy as a bee = very busy; (2) as wise as an owl = very wise; (4) as hardworking as an ant = very hardworking.",
              "Only 'as proud as a peacock' matches the emotion after receiving praise.",
            ],
            tip: "Match the simile to the emotion described. Praise → pride → 'proud as a peacock'.",
          },
        },
        {
          id: "mgs22_B10",
          type: "A",
          qNumber: 10,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Mrs Raja had to __________ the party to a later date as only five people could gather at her house due to the pandemic.",
          options: ["put up", "put off", "put out", "put down"],
          answer: 2,
          answerText: "put off",
          solution: {
            method: "Phrasal Verbs",
            steps: [
              "Context: party moved to a later date = postponed.",
              "'Put off' = postpone / delay.",
              "(1) 'put up' = accommodate or display; (3) 'put out' = extinguish or inconvenience; (4) 'put down' = write down, or suppress, or euthanise.",
              "Only 'put off' means to postpone.",
            ],
            tip: "Memorise 'put off' = postpone. 'She put off the meeting until next week.'",
          },
        },
        {
          id: "mgs22_B11",
          type: "A",
          qNumber: 11,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The __________ at the football match cheered loudly when Bryan scored a goal for Singapore.",
          options: ["patrons", "witnesses", "spectators", "customers"],
          answer: 3,
          answerText: "spectators",
          solution: {
            method: "Word Meaning / Register",
            steps: [
              "Who watches a sports match? → spectators (people who watch sports events).",
              "(1) patrons = customers of a business / supporters of an art; (2) witnesses = people who see an event and may testify; (4) customers = people who buy goods/services.",
              "'Spectators' specifically refers to people watching a sporting event.",
            ],
            tip: "Spectators watch sports; audience watch performances; patrons support businesses or arts.",
          },
        },
        {
          id: "mgs22_B12",
          type: "A",
          qNumber: 12,
          topic: "VocabMCQ",
          marks: 1,
          question:
            '"That man has been loitering outside our school for a long time. He looks __________. Let\'s report him to the police!" Giselle exclaimed.',
          options: ["innocent", "exhausted", "suspicious", "approachable"],
          answer: 3,
          answerText: "suspicious",
          solution: {
            method: "Context Clues",
            steps: [
              "Clues: loitering (hanging around without reason) for a long time → this is unusual behaviour.",
              "Giselle wants to report him to the police → she thinks something is wrong.",
              "'Suspicious' = giving the impression that something is wrong or illegal.",
              "(1) innocent = not guilty; (2) exhausted = very tired; (4) approachable = friendly / easy to talk to.",
            ],
            tip: "When someone loiters and needs to be reported, they look 'suspicious'.",
          },
        },
        {
          id: "mgs22_B13",
          type: "A",
          qNumber: 13,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "My friends and I clapped joyously when the principal __________ during assembly that our class was one of the cleanest in school.",
          options: ["informed", "introduced", "advertised", "announced"],
          answer: 4,
          answerText: "announced",
          solution: {
            method: "Precise Word Meaning",
            steps: [
              "Context: principal speaking at an assembly to share news publicly.",
              "'Announced' = made a formal public statement to a group.",
              "(1) 'informed' = told someone specific information (less formal/public); (2) 'introduced' = presented someone/something for the first time; (3) 'advertised' = promoted a product/service.",
              "A principal at assembly making a school-wide declaration = 'announced'.",
            ],
            tip: "'Announced' is the best word for a formal public declaration to an audience.",
          },
        },
        {
          id: "mgs22_B14",
          type: "A",
          qNumber: 14,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Ramu was careless. He __________ threw the ball too high and it hit the beehive!",
          options: [
            "purposely",
            "cautiously",
            "deliberately",
            "accidentally",
          ],
          answer: 4,
          answerText: "accidentally",
          solution: {
            method: "Adverbs of Manner",
            steps: [
              "Key clue: 'Ramu was CARELESS' → he did not intend to throw it too high.",
              "'Accidentally' = without intention, by mistake — matches 'careless'.",
              "(1) purposely = on purpose; (2) cautiously = carefully; (3) deliberately = on purpose/intentionally.",
              "Purposely and deliberately both mean intentional action, contradicting 'careless'.",
            ],
            tip: "Careless behaviour leads to accidental mistakes. Purposely/deliberately imply intention.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section C: Grammar Cloze – Underline (Q15–Q18, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletB_secC",
      sectionLabel: "Booklet B — Section C: Grammar Cloze (Underline)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Underline the correct word from the words given in the brackets.",
      marks: 4,
      passage: {
        title: "Polar Bears",
        text: "Polar bears are soon becoming extinct. As one of the species most affected by the climate change, there (15) [is / are] much concern over their fate. Climate change (16) [reduce / reduces] the amount of sea ice in their homes. This means that the polar bears (17) [need / needs] to travel longer distances to hunt and mate. To help save the polar bears, everyone (18) [has / have] a part to play. Let us save them by taking public transport so that less energy is used.",
        source: "Adapted from '15 Animals That Will Be Extinct by 2050 If We Don't Help by Ian Carey'",
      },
      questions: [
        {
          id: "mgs22_C15",
          type: "A",
          qNumber: 15,
          topic: "GrammarCloze",
          marks: 1,
          question: "there (15) [is / are] much concern over their fate.",
          options: ["is", "are"],
          answer: 1,
          answerText: "is",
          solution: {
            method: "Subject-Verb Agreement with 'there is/are'",
            steps: [
              "In 'there is/are' constructions, the verb agrees with the noun that follows.",
              "Noun after blank: 'much concern' — 'concern' is an uncountable singular noun.",
              "Singular uncountable noun → 'is'.",
            ],
            tip: "'There is' + uncountable/singular noun. 'There are' + plural noun.",
          },
        },
        {
          id: "mgs22_C16",
          type: "A",
          qNumber: 16,
          topic: "GrammarCloze",
          marks: 1,
          question: "Climate change (16) [reduce / reduces] the amount of sea ice.",
          options: ["reduce", "reduces"],
          answer: 2,
          answerText: "reduces",
          solution: {
            method: "Subject-Verb Agreement (3rd Person Singular)",
            steps: [
              "Subject: 'Climate change' — singular noun phrase.",
              "General scientific fact → present simple tense.",
              "3rd person singular + present simple → add -s: 'reduces'.",
            ],
            tip: "He/she/it (or a singular noun) in present simple → verb + -s.",
          },
        },
        {
          id: "mgs22_C17",
          type: "A",
          qNumber: 17,
          topic: "GrammarCloze",
          marks: 1,
          question: "the polar bears (17) [need / needs] to travel longer distances.",
          options: ["need", "needs"],
          answer: 1,
          answerText: "need",
          solution: {
            method: "Subject-Verb Agreement (Plural)",
            steps: [
              "Subject: 'the polar bears' — plural noun.",
              "Plural noun in present simple → base verb without -s.",
              "'need' (no -s) is correct.",
            ],
            tip: "Plural subjects take the base form in present simple: 'they need', 'the bears need'.",
          },
        },
        {
          id: "mgs22_C18",
          type: "A",
          qNumber: 18,
          topic: "GrammarCloze",
          marks: 1,
          question: "everyone (18) [has / have] a part to play.",
          options: ["has", "have"],
          answer: 1,
          answerText: "has",
          solution: {
            method: "Indefinite Pronouns — Subject-Verb Agreement",
            steps: [
              "'Everyone' is an indefinite pronoun that is always singular.",
              "Even though it refers to many people, it takes a singular verb.",
              "everyone → 'has' (singular).",
            ],
            tip: "Everyone/somebody/nobody/anyone are always singular → use 'has', 'is', 'was' etc.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section D: Grammar Cloze – Word Bank (Q19–Q22, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletB_secD",
      sectionLabel: "Booklet B — Section D: Grammar Cloze (Word Bank)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box and fill in the blanks. Write the LETTER ONLY. Use each word once only.",
      marks: 4,
      passage: {
        title: "The Jellyfish Encounter",
        wordBank: [
          { letter: "A", word: "around" },
          { letter: "B", word: "away" },
          { letter: "C", word: "down" },
          { letter: "D", word: "into" },
          { letter: "E", word: "off" },
          { letter: "F", word: "with" },
        ],
        text: "It was a beautiful day. Andrew and Bobby had been fishing the whole morning. \"The water looks inviting. I'm going for a swim,\" Andrew remarked and immediately jumped (19) ______ the cool water. \"Watch out for jellyfish. There are some lurking (20) ______. They might sting you,\" warned Bobby. However, Andrew paid no attention. Moments later, there was a loud scream. \"Help! Jellyfish!\" Instantly, Bobby started the motorboat and sped towards Andrew. The waves created as the motorboat sped past Andrew pushed the floating jellyfish (21) ______ from him. Andrew scrambled onto the boat (22) ______ visible red spots all over his body as a result of the stings. It was indeed a painful encounter for Andrew.",
      },
      questions: [
        {
          id: "mgs22_D19",
          type: "A",
          qNumber: 19,
          topic: "GrammarCloze",
          marks: 1,
          question: "Andrew immediately jumped (19) ______ the cool water.",
          answer: "D",
          answerText: "into",
          solution: {
            method: "Preposition of Direction",
            steps: [
              "Andrew jumped from outside → entered the water. This is movement from outside to inside.",
              "'Into' = movement to the interior of something.",
              "Contrast: 'in' describes location; 'into' describes movement toward the inside.",
            ],
            tip: "'Jump into' = enter by jumping. 'Into' shows direction/movement inward.",
          },
        },
        {
          id: "mgs22_D20",
          type: "A",
          qNumber: 20,
          topic: "GrammarCloze",
          marks: 1,
          question: "There are some lurking (20) ______.",
          answer: "A",
          answerText: "around",
          solution: {
            method: "Preposition of Location",
            steps: [
              "Context: jellyfish are lurking (hiding/waiting) in the water nearby.",
              "'Around' = in the surrounding area / in various places nearby.",
              "Bobby is warning Andrew that jellyfish are lurking in the vicinity.",
            ],
            tip: "'Lurking around' = hidden nearby, in the surrounding area.",
          },
        },
        {
          id: "mgs22_D21",
          type: "A",
          qNumber: 21,
          topic: "GrammarCloze",
          marks: 1,
          question: "The waves pushed the floating jellyfish (21) ______ from him.",
          answer: "B",
          answerText: "away",
          solution: {
            method: "Preposition of Direction",
            steps: [
              "The waves moved the jellyfish in a direction that increased distance from Andrew.",
              "'Away from' = in a direction that increases distance.",
              "This is the standard phrase: 'push/move/keep away from'.",
            ],
            tip: "'Away from' = moving or keeping at a greater distance. The jellyfish moved away from Andrew.",
          },
        },
        {
          id: "mgs22_D22",
          type: "A",
          qNumber: 22,
          topic: "GrammarCloze",
          marks: 1,
          question: "Andrew scrambled onto the boat (22) ______ visible red spots all over his body.",
          answer: "F",
          answerText: "with",
          solution: {
            method: "Preposition showing accompaniment/state",
            steps: [
              "Context: Andrew got back on the boat and he had red spots on his body.",
              "'With' here indicates a state/condition accompanying the action.",
              "Structure: 'scrambled onto the boat WITH [condition/feature]'.",
              "Compare: 'He came home with mud on his shoes.'",
            ],
            tip: "'With' can describe a physical condition or feature accompanying someone. 'He arrived with bruises.'",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section E: Editing (Q23–Q26, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletB_secE",
      sectionLabel: "Booklet B — Section E: Editing",
      topic: "Editing",
      instructions:
        "Read the passage carefully. The words that are underlined have either a spelling or grammatical error. Write the correct word in each of the boxes. Put the correct punctuation mark in the circle.",
      marks: 4,
      passage: {
        title: "Stages of Sleep",
        text: "Scientists think that sleep is the time when the body repairs itself. The human brain is the control centre for sleep. It sends messages to the body as it goes throo (23) several stages of sleep each night. During the first stage, the eyes close and the muscles begin to relaxing (24). You may have seen a classmate fall into this stage of sleep at school. As your classmate's muscles relax, her head may drop or her pencil may fall from her hand. If you gently touch your friend, she should wake up easily before the teacher notices! Once the muscles relax, the body moves quickly into the second stage. This (25) is light sleep and most people still hears (25) sounds or feel touch at this point. Next comes a period of deeper sleep. During the third stage, the body does not respond (26) easily anymore. It is also not aware if the seroundings (26) are hot or cold. It is harder to wake someone from this stage than from one of the earlier stages.",
        source: "Adapted from 'Sleeping for Good Health'",
      },
      questions: [
        {
          id: "mgs22_E23",
          type: "A",
          qNumber: 23,
          topic: "Editing",
          marks: 1,
          question: "throo (spelling error)",
          errorWord: "throo",
          answer: "through",
          solution: {
            method: "Spelling Correction",
            steps: [
              "The word 'throo' does not exist in standard English.",
              "The correct spelling is 'through' (meaning from one side/end to another).",
              "Memory trick: th-r-o-u-g-h — 'rough' is hidden inside: th+rough.",
            ],
            tip: "'Through' is one of the most commonly misspelled words. Remember: t-h-r-o-u-g-h.",
          },
        },
        {
          id: "mgs22_E24",
          type: "A",
          qNumber: 24,
          topic: "Editing",
          marks: 1,
          question: "begin to relaxing (grammatical error)",
          errorWord: "relaxing",
          answer: "relax",
          solution: {
            method: "Verb Form after 'begin to'",
            steps: [
              "The pattern 'begin + to + verb' requires the base infinitive form.",
              "'Begin to relax' is correct; 'begin to relaxing' is incorrect.",
              "Compare: 'begin to run', 'begin to understand', 'begin to relax'.",
            ],
            tip: "After 'begin/start + to', use the base form (infinitive): 'begin to relax', not 'begin to relaxing'.",
          },
        },
        {
          id: "mgs22_E25",
          type: "A",
          qNumber: 25,
          topic: "Editing",
          marks: 1,
          question: "most people still hears (grammatical error)",
          errorWord: "hears",
          answer: "hear",
          solution: {
            method: "Subject-Verb Agreement",
            steps: [
              "Subject: 'most people' → plural.",
              "Plural subject in present simple → base verb without -s.",
              "'hear' (no -s) is correct; 'hears' is 3rd person singular.",
            ],
            tip: "'People' is plural. 'Most people hear' (NOT 'hears'). Compare: 'The person hears.'",
          },
        },
        {
          id: "mgs22_E26",
          type: "A",
          qNumber: 26,
          topic: "Editing",
          marks: 1,
          question: "seroundings (spelling error)",
          errorWord: "seroundings",
          answer: "surroundings",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Seroundings' is a misspelling.",
              "The correct word is 'surroundings' = the things/environment around a person.",
              "Breakdown: sur-round-ings. The root is 'surround' + -ings.",
            ],
            tip: "Surroundings = environment around you. Remember: surROUNDings — 'round' is in the middle.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section F: Synthesis / Sentence Combining (Q27–Q28, 2 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletB_secF",
      sectionLabel: "Booklet B — Section F: Synthesis",
      topic: "SentenceCombining",
      instructions:
        "For each of the questions 27 and 28, rewrite the given sentence(s) using the word(s) provided. Your answer must be in one sentence. The meaning of the sentence must be the same as the meaning of the given sentence(s).",
      marks: 2,
      questions: [
        {
          id: "mgs22_F27",
          type: "A",
          qNumber: 27,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "I am going to borrow books. My siblings are also going to borrow books.\n\nRewrite using: and",
          answer: "My siblings and I are going to borrow books.",
          alternativeAnswers: [
            "I am going to borrow books and so are my siblings.",
            "My siblings and I will be borrowing books.",
          ],
          solution: {
            method: "Sentence Combining with 'and'",
            steps: [
              "Both sentences share the same predicate: 'going to borrow books'.",
              "Join the subjects with 'and': 'My siblings and I'.",
              "Note: In English, 'I' should come LAST when combining with other people: 'My siblings and I' (NOT 'I and my siblings').",
              "Full answer: 'My siblings and I are going to borrow books.'",
            ],
            tip: "When combining subjects with 'and', put 'I' last: 'John and I', 'My friends and I'.",
          },
        },
        {
          id: "mgs22_F28",
          type: "A",
          qNumber: 28,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "The mutton curry was spicy. Stella could not finish it.\n\nRewrite using: because",
          answer:
            "Stella could not finish the mutton curry because it was spicy.",
          alternativeAnswers: [
            "Stella could not finish it because the mutton curry was spicy.",
          ],
          solution: {
            method: "Sentence Combining with 'because'",
            steps: [
              "'Because' introduces the reason/cause.",
              "Cause: the mutton curry was spicy.",
              "Effect: Stella could not finish it.",
              "Structure: [Effect] because [Cause] → 'Stella could not finish the mutton curry because it was spicy.'",
            ],
            tip: "Because + reason clause. Effect comes first, then 'because', then the reason.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section G: Comprehension Cloze / Vocab Cloze (Q29–Q34, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletB_secG",
      sectionLabel: "Booklet B — Section G: Comprehension Cloze",
      topic: "VocabCloze",
      instructions:
        "Fill in each blank with the most suitable word.",
      marks: 6,
      passage: {
        title: "Kevin the Class Clown",
        text: "Kevin was our class clown who liked to do silly things to make everyone (29) ______. Whenever our teacher, Mrs Ang was not looking, he would either make funny faces behind her back, or even create his own dance steps. Sometimes, we could not control (30) ______ and would burst out laughing, much to Mrs Ang's annoyance.\n\nOne day, Kevin was up to his usual antics. He (31) ______ up to Mrs Ang's desk and placed a life-like rubber cockroach on it. Unfortunately for Mrs Ang, she did not notice the cockroach and placed her hands on it while talking to us. When she (32) ______ it, she gave a loud and piercing (33) ______. Her face was as white as sheet, and we all thought that Kevin would be in serious trouble.\n\nTo our surprise, Mrs Ang did not (34) ______ Kevin for his prank. She just told him not to do it again next time.",
      },
      questions: [
        {
          id: "mgs22_G29",
          type: "A",
          qNumber: 29,
          topic: "VocabCloze",
          marks: 1,
          question: "Kevin liked to do silly things to make everyone (29) ______.",
          answer: "laugh",
          solution: {
            method: "Context — Vocabulary",
            steps: [
              "Kevin is described as a 'class clown' who does 'silly things'.",
              "A class clown's purpose is to make classmates laugh.",
              "Later: 'we would burst out laughing' confirms this.",
            ],
            tip: "Class clowns do silly things to make people laugh. The answer must be 'laugh'.",
          },
        },
        {
          id: "mgs22_G30",
          type: "A",
          qNumber: 30,
          topic: "VocabCloze",
          marks: 1,
          question: "we could not control (30) ______ and would burst out laughing.",
          answer: "ourselves",
          solution: {
            method: "Reflexive Pronouns",
            steps: [
              "Subject: 'we' → reflexive pronoun is 'ourselves'.",
              "'Control ourselves' = restrain/hold back (a reflexive action).",
              "Pattern: we + control + ourselves (same subject and object).",
            ],
            tip: "Reflexive pronouns: I→myself, you→yourself, he→himself, we→ourselves, they→themselves.",
          },
        },
        {
          id: "mgs22_G31",
          type: "A",
          qNumber: 31,
          topic: "VocabCloze",
          marks: 1,
          question: "He (31) ______ up to Mrs Ang's desk and placed a life-like rubber cockroach on it.",
          answer: "sneaked",
          solution: {
            method: "Context — Verb Choice",
            steps: [
              "Kevin did not want the teacher to notice him approaching her desk.",
              "'Sneaked up' = moved quietly and secretly to avoid detection.",
              "Story is in past tense, so past form 'sneaked' (or 'snuck') is needed.",
            ],
            tip: "Sneak up = approach quietly and secretly. Past tense: sneaked or snuck.",
          },
        },
        {
          id: "mgs22_G32",
          type: "A",
          qNumber: 32,
          topic: "VocabCloze",
          marks: 1,
          question: "When she (32) ______ it, she gave a loud and piercing scream.",
          answer: "felt",
          solution: {
            method: "Context — Sensory Verb",
            steps: [
              "Mrs Ang 'placed her hands on it' — she touched the cockroach.",
              "When she became aware of touching it through her hands → she 'felt' it.",
              "'Felt' = became aware of through touch.",
            ],
            tip: "She didn't SEE it (she didn't notice it), but when she put her hands on it, she FELT it.",
          },
        },
        {
          id: "mgs22_G33",
          type: "A",
          qNumber: 33,
          topic: "VocabCloze",
          marks: 1,
          question: "she gave a loud and piercing (33) ______.",
          answer: "scream",
          solution: {
            method: "Context — Noun",
            steps: [
              "Mrs Ang was shocked by the cockroach touching her.",
              "A 'loud and piercing ______' when frightened → a scream.",
              "The adjectives 'loud' and 'piercing' describe a scream perfectly.",
            ],
            tip: "A 'loud and piercing scream' is a fixed phrase used when someone is very frightened.",
          },
        },
        {
          id: "mgs22_G34",
          type: "A",
          qNumber: 34,
          topic: "VocabCloze",
          marks: 1,
          question: "Mrs Ang did not (34) ______ Kevin for his prank.",
          answer: "scold",
          solution: {
            method: "Context — Verb",
            steps: [
              "Kevin played a prank that frightened Mrs Ang badly.",
              "The expected consequence: Mrs Ang would scold/punish him.",
              "'To our surprise' she did NOT [punish] him — just told him not to do it again.",
              "'Scold' = reprimand, tell someone off for doing something wrong.",
            ],
            tip: "When a teacher tells a student off for bad behaviour, she scolds them. 'Punish' also acceptable.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET C — Section H: Comprehension 1 (Q35–Q38, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletC_secH",
      sectionLabel: "Booklet C — Section H: Comprehension 1",
      topic: "ComprehensionMCQ",
      instructions:
        "Read the following passage carefully and answer questions 35 to 38.",
      marks: 4,
      passage: {
        title: "Jacob and the Diving Board",
        source: "Adapted from 'Jabari Jumps' by Gaia Cornwall, 2017",
        text: `"I'm jumping off the diving board today," Jacob told his dad. "Really?" responded his dad. The diving board was high. Nonetheless, Jacob had just passed his swim test and wanted to mark the occasion by jumping off the board. He watched the other kids climb the long ladder. They walked all the way out to the end of the board, spread their arms, bent their knees and sprang up. And then they dove down. Splash! "Looks easy," Jacob said.

Jacob stood at the bottom of the ladder and looked up. "You can go before me if you want," he told the kids behind him. "I need to think about what kind of special jump I'm going to do." After a minute, Jacob started to climb up the ladder. The ladder was very tall, he thought. Sensing that Jacob was slowing down, his father called out, "Are you okay?"

"I'm just a little tired," Jacob retorted. "Maybe you should climb down and take a tiny rest," suggested his dad. A tiny rest sounded like a good idea and Jacob climbed back down. "It's okay to feel a little scared," comforted his dad. "Sometimes, if I feel scared, I take a deep breath and tell myself I am ready."

Jacob took a deep breath and felt the air fill his body. He looked up and began to climb up again, until he got to the top. Jacob stood up straight. He walked all the way to the end of the board cautiously. At the end of the board, he looked out as far as he could see. He felt he was ready. He took a deep breath, spread his arms and bent his knees. Then, he sprang up and off the board, flying! Jacob hit the water with a splash. He went down deep into the water and then came back up. When he floated back up, he exclaimed, "Double backflip is next!"`,
      },
      questions: [
        {
          id: "mgs22_H35",
          type: "A",
          qNumber: 35,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "Jacob wanted to jump off the diving board because __________.",
          options: [
            "the diving board was high.",
            "he had just passed his swim test.",
            "he was keen to try out some kind of special jump.",
            "the other kids made it look easy.",
          ],
          answer: 2,
          answerText: "he had just passed his swim test.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Find the reason in the passage: 'Jacob had just passed his swim test and wanted to mark the occasion by jumping off the board.'",
              "'Mark the occasion' = celebrate/commemorate the event of passing the swim test.",
              "(1) The high board was a challenge, not a reason; (3) He mentioned a special jump as an excuse to delay; (4) He said 'Looks easy' but it wasn't his reason for going.",
            ],
            tip: "Always find the specific sentence in the passage that gives the reason. The key phrase is 'mark the occasion'.",
          },
        },
        {
          id: "mgs22_H36",
          type: "A",
          qNumber: 36,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Which word has the same meaning as 'realising'? Circle either (A) or (B).\n\nSensing (A) that Jacob was slowing down, his dad called out, 'Are you okay?' 'I'm just a little tired,' Jacob retorted. (B)",
          options: ["Sensing (A)", "retorted (B)"],
          answer: 1,
          answerText: "Sensing (A)",
          solution: {
            method: "Vocabulary in Context — Synonym",
            steps: [
              "The question asks for the word with the same meaning as 'realising'.",
              "'Sensing' = becoming aware of / realising through perception.",
              "'Retorted' = replied sharply — this has nothing to do with realising.",
            ],
            tip: "'Sensing' and 'realising' both mean becoming aware of something. They are synonyms here.",
          },
        },
        {
          id: "mgs22_H37",
          type: "A",
          qNumber: 37,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "True or False: Jacob climbed down from the board because he felt tired.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "True/False Comprehension",
            steps: [
              "Jacob said 'I'm just a little tired' — but this was an excuse.",
              "The passage tells us 'It's okay to feel a little scared,' comforted his dad — suggesting Jacob was scared, not just tired.",
              "Jacob climbed down because he was scared/nervous, not because he was truly tired.",
              "Therefore the statement is FALSE.",
            ],
            tip: "Don't just take what a character says at face value. The author hints Jacob was scared by having the dad say 'It's okay to feel scared'.",
          },
        },
        {
          id: "mgs22_H38",
          type: "A",
          qNumber: 38,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "True or False: Eventually, Jacob enjoyed jumping off the diving board.",
          options: ["True", "False"],
          answer: 1,
          answerText: "True",
          solution: {
            method: "True/False Comprehension",
            steps: [
              "At the end, Jacob jumped off successfully and exclaimed 'Double backflip is next!'",
              "This exclamation shows excitement and enthusiasm → he enjoyed it.",
              "Therefore the statement is TRUE.",
            ],
            tip: "His excited exclamation at the end tells us he enjoyed the experience and wants to do more.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET C — Section I: Comprehension 2 Open-Ended (Q39–Q43, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "bookletC_secI",
      sectionLabel: "Booklet C — Section I: Comprehension 2",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer questions 39 to 43.",
      marks: 8,
      passage: {
        title: "Billie at the Concert",
        source: "Adapted from 'Alfie at Nursery School' by Shirley Hughes",
        text: `Adam's little sister, Billie, yearned to go to Merlion Primary School with Adam, but she was too young. Every morning, when she and Mother said goodbye to Adam at the school gate, she tried to get out of the stroller to go with him. "You'll be able to come to school with me one day," Adam told her kindly. "But you are not old enough yet." This did not appease Billie. She kicked her feet about grumpily when she saw him enter the school.

In a month's time, there was going to be a special day at the school when all the families would be invited to attend a mid-year concert. The children rehearsed very hard for it. Some were going to play drums and triangles while others were going to sing. Adam was going to be the lead singer in his class performance. The children also designed and painted the lovely programme sheets.

When the day of the concert came, everyone was ushered into the auditorium. When everyone was seated, Miss Rina, one of the music teachers, struck up a tune on the piano and all the children began to sing and play their very best. Then, a very embarrassing thing happened...

Billie wriggled off Mother's lap and ran up the stage to stand next to Adam. She was determined to join in with the singing though she did not know the words. Adam went pink in the face. He looked across at Mother, and Mother looked at him. They both knew very well that if either of them tried to make Billie go back to her seat, she would make a terrible fuss.

Adam held her hand tightly and went on singing. Luckily, Billie behaved very well. She just stood there, proudly beaming at everyone. After the performance, Adam and his classmates bowed to the audience and the audience gave a resounding roar of applause. Billie ran back to sit on Mother's lap again, good as gold.

"Having a little sister is a lot of responsibility sometimes," Adam said to Mother when they were getting ready to go home. "You're quite right. Nonetheless, you have saved the concert for everyone, Adam, and I'm so proud of you!" Mother grinned.`,
      },
      questions: [
        {
          id: "mgs22_I39",
          type: "A",
          qNumber: 39,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word from Paragraph 1 has the same meaning as 'irritably'?",
          answer: "grumpily",
          solution: {
            method: "Vocabulary — Find Synonym in Passage",
            steps: [
              "Target meaning: 'irritably' = in an annoyed, ill-tempered manner.",
              "Scan Paragraph 1 for adverbs describing Billie's mood.",
              "'She kicked her feet about grumpily' — 'grumpily' means in a displeased/irritable way.",
            ],
            tip: "Look for adverbs (words ending in -ly) in the given paragraph. 'Grumpily' = in an irritated/bad-tempered way.",
          },
        },
        {
          id: "mgs22_I40",
          type: "A",
          qNumber: 40,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story.\n\n___ The children began singing.\n___ Miss Rina struck up a tune on the piano.\n___ Billie ran up onto the stage.",
          answer: "2 / 1 / 3",
          answerDetail: {
            "The children began singing": "2",
            "Miss Rina struck up a tune on the piano": "1",
            "Billie ran up onto the stage": "3",
          },
          solution: {
            method: "Sequencing — Story Order",
            steps: [
              "From the passage: 'Miss Rina struck up a tune on the piano' FIRST.",
              "THEN: 'all the children began to sing and play their very best.'",
              "THEN: 'a very embarrassing thing happened' → 'Billie wriggled off Mother's lap and ran up the stage.'",
              "Order: Miss Rina (1) → Children sing (2) → Billie runs up (3).",
            ],
            tip: "Re-read the passage section carefully to find what happened first, second, and third.",
          },
        },
        {
          id: "mgs22_I41",
          type: "A",
          qNumber: 41,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "From the passage, Adam and his schoolmates put in a lot of effort to prepare for the concert. What did they do? [2m]\n(i) ___________\n(ii) ___________",
          answer: [
            "(i) They rehearsed very hard for the concert.",
            "(ii) They designed and painted the lovely programme sheets.",
          ],
          solution: {
            method: "Open-Ended — Find Two Pieces of Evidence",
            steps: [
              "Question asks what they did to PREPARE → look for preparation activities.",
              "Evidence 1: 'The children rehearsed very hard for it.' → rehearsed/practised.",
              "Evidence 2: 'The children also designed and painted the lovely programme sheets.' → made programme sheets.",
              "Each answer should be a complete sentence.",
            ],
            tip: "P3 comprehension: give 2 separate pieces of evidence from the passage. Use the passage words.",
          },
        },
        {
          id: "mgs22_I42",
          type: "A",
          qNumber: 42,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "State whether each statement is True or False. Give a reason for your answer.\ni. Adam was embarrassed that Billie ran up the stage and stood next to him.\nii. Billie was happy that she joined her brother on stage in the performance.",
          answer: [
            "i. True. Adam went pink in the face (when Billie ran up to the stage).",
            "ii. True. Billie stood on stage proudly beaming at everyone.",
          ],
          solution: {
            method: "True/False with Text Evidence",
            steps: [
              "i: 'Adam went pink in the face' — going red/pink in the face = blushing from embarrassment. TRUE.",
              "ii: 'She just stood there, proudly beaming at everyone' — beaming = smiling widely and happily. TRUE.",
              "Each answer must state True/False AND give a reason from the text.",
            ],
            tip: "For True/False with reasons: state True/False first, then copy or paraphrase the evidence from the passage.",
          },
        },
        {
          id: "mgs22_I43",
          type: "A",
          qNumber: 43,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Explain clearly why Adam's mother was proud of him. [2m]",
          answer:
            "Mother was proud of Adam because he managed to hold Billie's hand and kept her well behaved on stage, allowing the concert to continue successfully for everyone.",
          solution: {
            method: "Open-Ended Explanation",
            steps: [
              "Find what Mother said: 'you have saved the concert for everyone, Adam, and I'm so proud of you!'",
              "Why did he save it? He held Billie's hand, didn't panic, and Billie behaved well as a result.",
              "Full explanation: Adam stayed calm, held Billie's hand, and the concert went on smoothly without Billie causing a fuss.",
              "Answer must show cause-and-effect: Adam's action → concert saved → mother proud.",
            ],
            tip: "Explain the chain: Adam held Billie's hand → Billie behaved → concert went on smoothly → Mother was proud.",
          },
        },
      ],
    },
  ],
};

export default eoy_mgs_p2_2022;
