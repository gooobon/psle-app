// src/data/p3/english/papers/eoy_catholichigh_p2_2025.ts
// Catholic High Primary School — P3 English EOY 2024 (SA2)
// Paper 2 — Sections A to I  (45 questions, 50 marks)
// Excludes: Composition (Paper 1) and Listening Comprehension (Paper 3)

import { ExamPaper } from "@/types/exam";

const paper: ExamPaper = {
  id: "eoy_catholichigh_p2_2024",
  school: "Catholic High Primary School",
  level: "P3",
  subject: "English",
  year: 2024,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,
  duration: 75,
  sections: [

    // ─────────────────────────────────────────
    // SECTION A – GRAMMAR MCQ (8 × 1m = 8m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secA",
      name: "Section A – Grammar MCQ",
      topic: "GrammarMCQ",
      instructions:
        "Choose the correct answer and shade the oval (1, 2, 3 or 4) on the Optical Answer Sheet provided.",
      marks: 8,
      questionType: "A",
      questions: [
        {
          id: "ch_2024_eoy_q1",
          qNumber: 1,
          topic: "GrammarMCQ",
          subtopic: "Verb Tense (Simple Past)",
          questionText:
            "Julia __________ all over the house for her missing book last night.",
          options: [
            { label: "1", text: "search" },
            { label: "2", text: "searches" },
            { label: "3", text: "searched" },
            { label: "4", text: "searching" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Verb tense — time adverbial",
            steps: [
              "The time clue 'last night' indicates a past action.",
              "Simple past tense is needed → 'searched'.",
              "'Search' = present base; 'searches' = present 3rd person; 'searching' = participle (needs auxiliary).",
              "Answer: (3) searched",
            ],
            tip: "Time words like 'last night', 'yesterday', 'ago' signal simple past tense.",
          },
        },
        {
          id: "ch_2024_eoy_q2",
          qNumber: 2,
          topic: "GrammarMCQ",
          subtopic: "Verb Tense (Past Continuous)",
          questionText:
            "The pupils __________ when the teacher walked into the classroom.",
          options: [
            { label: "1", text: "read" },
            { label: "2", text: "reads" },
            { label: "3", text: "are reading" },
            { label: "4", text: "were reading" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Past continuous vs. simple past",
            steps: [
              "The sentence describes an ongoing action (reading) interrupted by another action (teacher walked in).",
              "The interrupted, ongoing action uses past continuous: was/were + Ving.",
              "'Pupils' = plural → 'were reading'.",
              "Answer: (4) were reading",
            ],
            tip:
              "When one action (simple past) interrupts another ongoing action, the ongoing action uses past continuous (was/were + Ving).",
          },
        },
        {
          id: "ch_2024_eoy_q3",
          qNumber: 3,
          topic: "GrammarMCQ",
          subtopic: "Conjunction (Either…Or / Choice)",
          questionText:
            "I have not made up my mind on whether I want to wear sneakers __________ sandals to the birthday party later.",
          options: [
            { label: "1", text: "or" },
            { label: "2", text: "so" },
            { label: "3", text: "but" },
            { label: "4", text: "and" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Conjunction for alternatives",
            steps: [
              "The sentence presents TWO OPTIONS: sneakers or sandals.",
              "'Or' connects two alternatives when making a choice.",
              "'Whether … or' is a fixed structure for presenting two options.",
              "Answer: (1) or",
            ],
            tip: "'Whether A or B' = choosing between two options. 'Or' shows alternatives.",
          },
        },
        {
          id: "ch_2024_eoy_q4",
          qNumber: 4,
          topic: "GrammarMCQ",
          subtopic: "Demonstrative Pronoun (Far / Plural)",
          questionText:
            '"See __________ birds perched on the tree over there?" the guide pointed out.',
          options: [
            { label: "1", text: "this" },
            { label: "2", text: "that" },
            { label: "3", text: "these" },
            { label: "4", text: "those" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Demonstrative pronoun — distance and number",
            steps: [
              "Key clue: 'over there' = far away; 'birds' = plural.",
              "'This' = singular, near. 'That' = singular, far. 'These' = plural, near. 'Those' = plural, far.",
              "Far + plural → 'those'.",
              "Answer: (4) those",
            ],
            tip:
              "Near: this (singular) / these (plural). Far: that (singular) / those (plural).",
          },
        },
        {
          id: "ch_2024_eoy_q5",
          qNumber: 5,
          topic: "GrammarMCQ",
          subtopic: "Modal Verb (Possibility / Inability)",
          questionText:
            "This pizza is so large that even ten people __________ share it.",
          options: [
            { label: "1", text: "will" },
            { label: "2", text: "can" },
            { label: "3", text: "shall" },
            { label: "4", text: "might" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Modal verb for ability/possibility",
            steps: [
              "The sentence highlights the pizza's size — ten people would be ABLE to share it.",
              "'Can' expresses ability or possibility.",
              "'Will' is about future intention. 'Shall' = formal offer. 'Might' = uncertain possibility.",
              "Answer: (2) can",
            ],
            tip: "Use 'can' for ability and general possibility in present situations.",
          },
        },
        {
          id: "ch_2024_eoy_q6",
          qNumber: 6,
          topic: "GrammarMCQ",
          subtopic: "Possessive Pronoun (Mine)",
          questionText:
            '"I\'m sorry for taking your pencil by mistake. I thought it was __________.," Jane said to Sally.',
          options: [
            { label: "1", text: "hers" },
            { label: "2", text: "ours" },
            { label: "3", text: "mine" },
            { label: "4", text: "theirs" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Possessive pronoun — first person singular",
            steps: [
              "Jane is speaking — she thought the pencil belonged to HER (first person singular).",
              "'Mine' = possessive pronoun for 'I/me'.",
              "'Hers' = female third person. 'Ours' = first person plural. 'Theirs' = third person plural.",
              "Answer: (3) mine",
            ],
            tip: "The speaker (Jane) believed it was her own pencil → 'mine' (belonging to me).",
          },
        },
        {
          id: "ch_2024_eoy_q7",
          qNumber: 7,
          topic: "GrammarMCQ",
          subtopic: "Question Tag (Future)",
          questionText:
            '"Mr Tan will be returning our compositions tomorrow, __________?" Rafi asked.',
          options: [
            { label: "1", text: "is he" },
            { label: "2", text: "will he" },
            { label: "3", text: "isn't he" },
            { label: "4", text: "won't he" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Question tag for future auxiliary 'will'",
            steps: [
              "The main clause is positive and uses 'will' as the auxiliary.",
              "Question tag rule: positive main clause → negative tag.",
              "Negative of 'will' = 'won't'. Subject = 'he' (Mr Tan).",
              "Answer: (4) won't he",
            ],
            tip: "For 'will' statements: positive → won't [subject]; negative → will [subject].",
          },
        },
        {
          id: "ch_2024_eoy_q8",
          qNumber: 8,
          topic: "GrammarMCQ",
          subtopic: "Indefinite Pronoun (Negative Context)",
          questionText:
            "We had to go to a different dress shop because my mother could not find __________ that was suitable for her.",
          options: [
            { label: "1", text: "none" },
            { label: "2", text: "nothing" },
            { label: "3", text: "anything" },
            { label: "4", text: "everything" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Indefinite pronoun in negative clause",
            steps: [
              "The sentence already has a negative: 'could not find'.",
              "In negative sentences, use 'anything' (not 'nothing' — double negative is incorrect in Standard English).",
              "'None' is a pronoun meaning 'not any' — used as a subject, not after 'find'. 'Everything' contradicts 'not'.",
              "Answer: (3) anything",
            ],
            tip:
              "Use 'anything' after negative verbs (can't, couldn't, didn't). 'Nothing' is a negative pronoun itself — avoid double negatives.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION B – VOCABULARY MCQ (6 × 1m = 6m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secB",
      name: "Section B – Vocabulary MCQ",
      topic: "VocabMCQ",
      instructions:
        "Choose the correct answer and shade the oval (1, 2, 3 or 4) on the Optical Answer Sheet provided.",
      marks: 6,
      questionType: "A",
      questions: [
        {
          id: "ch_2024_eoy_q9",
          qNumber: 9,
          topic: "VocabMCQ",
          subtopic: "Adjective — Character Trait",
          questionText:
            "Mei Ling was __________ to solve the challenging problem sum question because she wanted to score full marks for her Mathematics test.",
          options: [
            { label: "1", text: "hesitant" },
            { label: "2", text: "reluctant" },
            { label: "3", text: "dedicated" },
            { label: "4", text: "determined" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Adjective connotation in context",
            steps: [
              "Mei Ling WANTS to score full marks → strong positive motivation to solve the problem.",
              "'Determined' = having a firm decision/drive to do something despite difficulty.",
              "'Hesitant' = uncertain, not eager. 'Reluctant' = unwilling. 'Dedicated' = committed over time (less about a single moment of resolve).",
              "Answer: (4) determined",
            ],
            tip:
              "'Determined' = resolute to achieve a goal right now. 'Dedicated' = long-term commitment.",
          },
        },
        {
          id: "ch_2024_eoy_q10",
          qNumber: 10,
          topic: "VocabMCQ",
          subtopic: "Collective Noun",
          questionText:
            "The __________ of actors reappeared on stage at the end of the performance and bowed to the audience.",
          options: [
            { label: "1", text: "cast" },
            { label: "2", text: "gang" },
            { label: "3", text: "army" },
            { label: "4", text: "board" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Collective noun for a group of performers",
            steps: [
              "A group of actors in a play/film is called the 'cast'.",
              "'Gang' = informal group, often with negative connotation. 'Army' = military force. 'Board' = a group of directors/administrators.",
              "Answer: (1) cast",
            ],
            tip:
              "Collective nouns for performers: cast (actors), troupe (performers), choir (singers), band (musicians).",
          },
        },
        {
          id: "ch_2024_eoy_q11",
          qNumber: 11,
          topic: "VocabMCQ",
          subtopic: "Simile / Idiom",
          questionText:
            "My father could lift the heavy box because he is __________.",
          options: [
            { label: "1", text: "as brave as a lion" },
            { label: "2", text: "as strong as an ox" },
            { label: "3", text: "as light as a feather" },
            { label: "4", text: "as cool as a cucumber" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Simile meaning selection",
            steps: [
              "The context is lifting a HEAVY BOX — requires strength.",
              "'As strong as an ox' = very physically strong.",
              "'As brave as a lion' = courageous. 'As light as a feather' = very light (opposite of strong). 'As cool as a cucumber' = calm under pressure.",
              "Answer: (2) as strong as an ox",
            ],
            tip:
              "Match the simile to the action: lifting heavy things → strength → 'strong as an ox'.",
          },
        },
        {
          id: "ch_2024_eoy_q12",
          qNumber: 12,
          topic: "VocabMCQ",
          subtopic: "Phrasal Verb",
          questionText:
            "A lot of supporters __________ at the stadium to support their favourite team.",
          options: [
            { label: "1", text: "turned in" },
            { label: "2", text: "turned up" },
            { label: "3", text: "turned over" },
            { label: "4", text: "turned away" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Phrasal verb meaning",
            steps: [
              "'Turned up' = arrived / appeared at a place.",
              "'Turned in' = submitted work or went to bed. 'Turned over' = flipped or handed to authorities. 'Turned away' = refused entry or left.",
              "Answer: (2) turned up",
            ],
            tip: "'Turn up' = to arrive or appear. Common in context of events and venues.",
          },
        },
        {
          id: "ch_2024_eoy_q13",
          qNumber: 13,
          topic: "VocabMCQ",
          subtopic: "Abstract Noun — Virtue",
          questionText:
            "Jared helped the elderly lady carry her bags of groceries. She thanked him for his __________.",
          options: [
            { label: "1", text: "loyalty" },
            { label: "2", text: "honesty" },
            { label: "3", text: "fairness" },
            { label: "4", text: "kindness" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Virtue vocabulary — matching action to quality",
            steps: [
              "Jared helped an elderly lady without being asked — this is an act of KINDNESS.",
              "'Loyalty' = faithfulness. 'Honesty' = truthfulness. 'Fairness' = treating equally.",
              "'Kindness' = being generous and caring to others.",
              "Answer: (4) kindness",
            ],
            tip: "Helping others without expectation of reward = kindness, not loyalty or honesty.",
          },
        },
        {
          id: "ch_2024_eoy_q14",
          qNumber: 14,
          topic: "VocabMCQ",
          subtopic: "Vocabulary — Describing Handwriting/Text",
          questionText:
            "The teacher was unable to read the pupil's untidy handwriting as it was __________.",
          options: [
            { label: "1", text: "illegal" },
            { label: "2", text: "illegible" },
            { label: "3", text: "invisible" },
            { label: "4", text: "incomplete" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Precise vocabulary selection",
            steps: [
              "'Illegible' = writing that cannot be read because it is too messy/unclear.",
              "'Illegal' = against the law. 'Invisible' = cannot be seen at all. 'Incomplete' = not finished.",
              "The context is untidy handwriting that cannot be read → 'illegible'.",
              "Answer: (2) illegible",
            ],
            tip:
              "'Legible' = can be read clearly. 'Illegible' = impossible to read. Remember: il- is a negative prefix.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION C – GRAMMAR CLOZE – Pronouns (4 × 1m = 4m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secC",
      name: "Section C – Grammar Cloze (Pronouns)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Choose the most suitable answer from the box below and fill in each blank. Write its letter (A to F) in the blank. Use each word ONCE only.",
      marks: 4,
      questionType: "B",
      passage: {
        title: "Picnic at East Coast Park",
        type: "prose",
        content: `Last Sunday, my family and I had a picnic at East Coast Park. Since (15)__________ arrived early, we managed to find a nice spot under a big tree. My sister and I quickly took out a frisbee to play. My mother reminded (16)__________ to stay in the shade so that we would not get sunburned. My father was taking a nap when the frisbee landed on (17)__________ face. (18)__________ yelped in pain and scolded us. We apologised to him and continued playing.`,
        wordBank: [
          { label: "A", word: "he" },
          { label: "B", word: "his" },
          { label: "C", word: "our" },
          { label: "D", word: "she" },
          { label: "E", word: "us" },
          { label: "F", word: "we" },
        ],
      },
      questions: [
        {
          id: "ch_2024_eoy_q15",
          qNumber: 15,
          topic: "GrammarCloze",
          subtopic: "Subject Pronoun (We)",
          questionText:
            "Since (15)__________ arrived early, we managed to find a nice spot.",
          blankPosition: 1,
          answer: "F",
          answerWord: "we",
          marks: 1,
          solution: {
            method: "Subject pronoun for family group",
            steps: [
              "The sentence is about 'my family and I' — a group including the speaker.",
              "Subject pronoun for this group = 'we'.",
              "Answer: (F) we",
            ],
            tip: "Subject pronouns: I, you, he, she, it, we, they — used before the verb as the subject.",
          },
        },
        {
          id: "ch_2024_eoy_q16",
          qNumber: 16,
          topic: "GrammarCloze",
          subtopic: "Object Pronoun (Us)",
          questionText:
            "My mother reminded (16)__________ to stay in the shade.",
          blankPosition: 2,
          answer: "E",
          answerWord: "us",
          marks: 1,
          solution: {
            method: "Object pronoun after verb",
            steps: [
              "After a verb (reminded), use an object pronoun.",
              "Mother reminded the children (sister and the speaker) = 'us'.",
              "Answer: (E) us",
            ],
            tip: "Object pronouns: me, you, him, her, it, us, them — used after verbs or prepositions.",
          },
        },
        {
          id: "ch_2024_eoy_q17",
          qNumber: 17,
          topic: "GrammarCloze",
          subtopic: "Possessive Pronoun (His)",
          questionText:
            "The frisbee landed on (17)__________ face.",
          blankPosition: 3,
          answer: "B",
          answerWord: "his",
          marks: 1,
          solution: {
            method: "Possessive adjective — male third person",
            steps: [
              "The frisbee landed on the father's face.",
              "The father = he → possessive adjective = 'his'.",
              "Answer: (B) his",
            ],
            tip: "Possessive adjectives go before nouns: my, your, his, her, its, our, their.",
          },
        },
        {
          id: "ch_2024_eoy_q18",
          qNumber: 18,
          topic: "GrammarCloze",
          subtopic: "Subject Pronoun (He)",
          questionText:
            "(18)__________ yelped in pain and scolded us.",
          blankPosition: 4,
          answer: "A",
          answerWord: "he",
          marks: 1,
          solution: {
            method: "Subject pronoun — male third person",
            steps: [
              "The father yelped and scolded the children.",
              "Subject pronoun for a male = 'he'.",
              "Answer: (A) he",
            ],
            tip: "He/she = subject (does the action). Him/her = object (receives the action).",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION D – GRAMMAR CLOZE – Underline Correct Word (4 × 1m = 4m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secD",
      name: "Section D – Grammar Cloze (Choose from Brackets)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Underline the correct word from the words given in the brackets.",
      marks: 4,
      questionType: "B",
      passage: {
        title: "Clean Water",
        type: "informational",
        content: `What happens if we run out of clean water to drink? Clean drinking water is important because it (19) [keep / keeps] us alive. Irresponsible human activities (20) [is / are] the cause of water pollution. Contaminated water is unsafe for drinking. Diseases (21) [spread / spreads] when people drink contaminated water. If we (22) [do / does] not stop water pollution, we will not have enough clean water to drink in the future. We must do our best to keep our water bodies clean.

Adapted from https://www.theworldcounts.com/stories/what-is-pollution-for-kids`,
      },
      questions: [
        {
          id: "ch_2024_eoy_q19",
          qNumber: 19,
          topic: "GrammarCloze",
          subtopic: "Subject-Verb Agreement",
          questionText:
            "Clean drinking water is important because it (19) [keep / keeps] us alive.",
          blankPosition: 1,
          answer: "keeps",
          marks: 1,
          solution: {
            method: "Subject-verb agreement — singular subject",
            steps: [
              "Subject: 'it' (= clean drinking water) = singular.",
              "Singular subject in present tense → verb with '-s': 'keeps'.",
              "Answer: keeps",
            ],
            tip: "He/she/it/singular noun + verb + s: 'it keeps', 'she runs', 'the dog barks'.",
          },
        },
        {
          id: "ch_2024_eoy_q20",
          qNumber: 20,
          topic: "GrammarCloze",
          subtopic: "Subject-Verb Agreement (Plural Subject)",
          questionText:
            "Irresponsible human activities (20) [is / are] the cause of water pollution.",
          blankPosition: 2,
          answer: "are",
          marks: 1,
          solution: {
            method: "Subject-verb agreement — plural subject",
            steps: [
              "Subject: 'Irresponsible human activities' = plural noun.",
              "Plural subject in present tense → 'are'.",
              "Answer: are",
            ],
            tip: "Activities (plural) → are. Activity (singular) → is.",
          },
        },
        {
          id: "ch_2024_eoy_q21",
          qNumber: 21,
          topic: "GrammarCloze",
          subtopic: "Subject-Verb Agreement (Plural Subject)",
          questionText:
            "Diseases (21) [spread / spreads] when people drink contaminated water.",
          blankPosition: 3,
          answer: "spread",
          marks: 1,
          solution: {
            method: "Subject-verb agreement — plural subject",
            steps: [
              "Subject: 'Diseases' = plural noun.",
              "Plural subject → base form verb (no '-s'): 'spread'.",
              "Answer: spread",
            ],
            tip: "Diseases (plural) → spread. Disease (singular) → spreads.",
          },
        },
        {
          id: "ch_2024_eoy_q22",
          qNumber: 22,
          topic: "GrammarCloze",
          subtopic: "Subject-Verb Agreement in Conditional",
          questionText:
            "If we (22) [do / does] not stop water pollution…",
          blankPosition: 4,
          answer: "do",
          marks: 1,
          solution: {
            method: "Subject-verb agreement — first person plural",
            steps: [
              "Subject: 'we' = first person plural.",
              "First person plural → base form auxiliary: 'do'.",
              "Answer: do",
            ],
            tip: "'We' always takes 'do' (not 'does') as the auxiliary in questions and negatives.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION E – VOCABULARY CLOZE (3 × 1m = 3m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secE",
      name: "Section E – Vocabulary Cloze",
      topic: "VocabCloze",
      instructions:
        "Read the passage carefully. Choose the most suitable answer from the box below and fill in each blank. Use each word ONCE only.",
      marks: 3,
      questionType: "B",
      passage: {
        title: "Bats — Nocturnal Fliers",
        type: "informational",
        content: `Bats are the only mammals that can truly fly. They have wings made of thin skin stretched between their long fingers. Most bats are (23)__________ animals which usually hunt at night. Some species of bats can live for more than thirty years. How do bats manage to live such long and healthy lives? Being able to fly means they can (24)__________ from predators more easily. Bats also live in flocks, making it harder for their (25)__________ to attack them. Another reason for their longer life span is bats have been known to share food so that helps to keep them from starving.

Adapted from "How Old Is A Whale" by Lily Murray`,
        wordBank: [
          { label: "1", word: "endangered" },
          { label: "2", word: "escape" },
          { label: "3", word: "nocturnal" },
          { label: "4", word: "predators" },
          { label: "5", word: "prey" },
          { label: "6", word: "survive" },
        ],
      },
      questions: [
        {
          id: "ch_2024_eoy_q23",
          qNumber: 23,
          topic: "VocabCloze",
          subtopic: "Science Vocabulary",
          questionText:
            "Most bats are (23)__________ animals which usually hunt at night.",
          blankPosition: 1,
          answer: "nocturnal",
          marks: 1,
          solution: {
            method: "Science vocabulary — time of activity",
            steps: [
              "Key clue: 'usually hunt at night' — night-active animals.",
              "'Nocturnal' = active at night (opposite of 'diurnal' = active during day).",
              "Answer: nocturnal",
            ],
            tip: "'Nocturnal' = active at night. E.g., owls, bats, raccoons are nocturnal animals.",
          },
        },
        {
          id: "ch_2024_eoy_q24",
          qNumber: 24,
          topic: "VocabCloze",
          subtopic: "Verb — Action to Avoid Danger",
          questionText:
            "Being able to fly means they can (24)__________ from predators more easily.",
          blankPosition: 2,
          answer: "escape",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Bats can fly → they can GET AWAY from predators.",
              "'Escape' = to get free from danger or captivity.",
              "'Survive' = to continue to live — not specific to fleeing predators.",
              "Answer: escape",
            ],
            tip: "'Escape from' = to get away from something dangerous. Always followed by 'from'.",
          },
        },
        {
          id: "ch_2024_eoy_q25",
          qNumber: 25,
          topic: "VocabCloze",
          subtopic: "Food Chain Vocabulary",
          questionText:
            "Bats live in flocks, making it harder for their (25)__________ to attack them.",
          blankPosition: 3,
          answer: "predators",
          marks: 1,
          solution: {
            method: "Food chain vocabulary",
            steps: [
              "Bats are prey animals — their enemies who attack them are 'predators'.",
              "'Predators' = animals that hunt and eat other animals.",
              "'Prey' = animals that are hunted and eaten by predators.",
              "Answer: predators",
            ],
            tip:
              "In a food chain: predator hunts prey. Bats are prey; owls and hawks are their predators.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION F – EDITING – Spelling (5 × 1m = 5m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secF",
      name: "Section F – Editing (Spelling)",
      topic: "Editing",
      instructions:
        "Correct the words in bold for spelling. Write the correct answer in the boxes provided.",
      marks: 5,
      questionType: "B",
      passage: {
        title: "Childhood Memories of Kampong Wak Hassan",
        type: "prose",
        content: `When I was a child, my parents would take me to my grandfather's village home in Malaysia. I would stay there every weekend and for a short (26) piriod during Chinese New Year. The bumpy car ride there often made me (27) dizzy from motion sikness but I would feel better when I saw the beach. Upon reaching, we would be greeted with the (28) saight of coconut trees and the sound of waves. I enjoyed the feeling of the sea (29) brieze on my face and watching the soldier crabs (30) skavenging on the shore at low tide. These fond memories will stay with me forever.

Adapted from https://biblioasia.nlb.gov.sg/places-and-buildings/2023/11/childhood-memories-kampong-wak-hassan`,
      },
      questions: [
        {
          id: "ch_2024_eoy_q26",
          qNumber: 26,
          topic: "Editing",
          subtopic: "Spelling",
          questionText: "…for a short piriod during Chinese New Year.",
          answer: "period",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'piriod' is misspelled. The correct spelling is 'period'.",
              "Break down: pe-ri-od.",
              "Answer: period",
            ],
            tip: "Remember: pe-ri-od. The vowel in the middle is 'i', not 'i-i'.",
          },
        },
        {
          id: "ch_2024_eoy_q27",
          qNumber: 27,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…often made me dizzy from motion sikness…",
          answer: "sickness",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'sikness' is misspelled. The correct spelling is 'sickness'.",
              "Break down: sick + ness = sickness.",
              "Answer: sickness",
            ],
            tip: "sick + -ness = sickness. Double 'k' retained: sick-ness.",
          },
        },
        {
          id: "ch_2024_eoy_q28",
          qNumber: 28,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…we would be greeted with the saight of coconut trees…",
          answer: "sight",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'saight' is misspelled. The correct spelling is 'sight'.",
              "'Sight' = the sense of vision, or something that can be seen.",
              "Answer: sight",
            ],
            tip: "sight = s-i-g-h-t. Common mistake: adding unnecessary vowel before '-ight'.",
          },
        },
        {
          id: "ch_2024_eoy_q29",
          qNumber: 29,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…the feeling of the sea brieze on my face…",
          answer: "breeze",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'brieze' is misspelled. The correct spelling is 'breeze'.",
              "'Breeze' = a gentle wind. Break down: breeze = br-ee-ze.",
              "Answer: breeze",
            ],
            tip: "breeze = b-r-e-e-z-e. The vowel sound /ee/ is spelt 'ee', not 'ie'.",
          },
        },
        {
          id: "ch_2024_eoy_q30",
          qNumber: 30,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…watching the soldier crabs skavenging on the shore at low tide.",
          answer: "scavenging",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'skavenging' is misspelled. The correct spelling is 'scavenging'.",
              "'Scavenge' = to search for food among waste. Scavenging = present participle.",
              "Answer: scavenging",
            ],
            tip: "scavenge → scavenging. Note: sc- at the start, not sk-.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION G – COMPREHENSION CLOZE (free write) (4 × 1m = 4m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secG",
      name: "Section G – Comprehension Cloze (Open Word)",
      topic: "VocabCloze",
      instructions:
        "Read the passage carefully. Fill in the blanks with the most suitable word of your own.",
      marks: 4,
      questionType: "B",
      passage: {
        title: "Singapore Oil Spill — June 2024",
        type: "informational",
        content: `On 14 June 2024, a damaged ship caused an oil spill in southern Singapore. Within a day, thick black (31)__________ could be seen in the waters of the beaches in Sentosa.

Due to the oil spill, all beach activities were stopped and the public was advised to stay (32)__________ from the affected areas. A cleanup of the beaches started immediately. Volunteers used shovels to (33)__________ bags with sand that had been stained by the thick black oil.

The oil spill also affected marine animals such as seabirds (34)__________ fish. The effects of the oil spill would be felt for months to come.

Adapted from https://www.straitstimes.com/singapore/environment/clean-up-operation-underway-in-sentosa-after-oil-washes-up-coast-of-tanjong-beach`,
      },
      questions: [
        {
          id: "ch_2024_eoy_q31",
          qNumber: 31,
          topic: "VocabCloze",
          subtopic: "Contextual Vocabulary (Oil Spill)",
          questionText:
            "Within a day, thick black (31)__________ could be seen in the waters of the beaches in Sentosa.",
          blankPosition: 1,
          answer: "oil",
          marks: 1,
          solution: {
            method: "Context inference",
            steps: [
              "The passage is about an oil spill — thick black liquid from a ship.",
              "The visible substance in the water = oil.",
              "Answer: oil",
            ],
            tip: "Read the passage title and opening sentence for the key context word.",
          },
        },
        {
          id: "ch_2024_eoy_q32",
          qNumber: 32,
          topic: "VocabCloze",
          subtopic: "Preposition / Adverb",
          questionText:
            "…the public was advised to stay (32)__________ from the affected areas.",
          blankPosition: 2,
          answer: "away",
          marks: 1,
          solution: {
            method: "Fixed phrase — stay away from",
            steps: [
              "'Stay away from' = to keep a distance from (danger/restricted area).",
              "The blank completes the fixed phrase 'stay ___ from'.",
              "Answer: away",
            ],
            tip: "'Stay away from' is a fixed phrase meaning to keep a safe distance.",
          },
        },
        {
          id: "ch_2024_eoy_q33",
          qNumber: 33,
          topic: "VocabCloze",
          subtopic: "Verb — Physical Action",
          questionText:
            "Volunteers used shovels to (33)__________ bags with sand that had been stained by the thick black oil.",
          blankPosition: 3,
          answer: "fill",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Volunteers used shovels — tools for digging and transferring material.",
              "They would FILL bags with the oil-stained sand to remove it.",
              "Answer: fill",
            ],
            tip: "You use a shovel to dig, scoop, and FILL containers. 'Fill bags with sand' is the natural expression.",
          },
        },
        {
          id: "ch_2024_eoy_q34",
          qNumber: 34,
          topic: "VocabCloze",
          subtopic: "Conjunction (Addition)",
          questionText:
            "The oil spill also affected marine animals such as seabirds (34)__________ fish.",
          blankPosition: 4,
          answer: "and",
          marks: 1,
          solution: {
            method: "Conjunction in a list",
            steps: [
              "The sentence lists two types of affected animals: seabirds and fish.",
              "When listing two final items, use 'and'.",
              "Answer: and",
            ],
            tip: "To connect the last two items in a list: X and Y. ('such as A and B').",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION H – COMPREHENSION – Selected Response + Open-ended (8m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secH",
      name: "Section H – Comprehension (Selected Response & Open-ended)",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer the questions that follow.",
      marks: 8,
      questionType: "B",
      passage: {
        title: "Meng and the Rice Cakes",
        type: "narrative",
        lineNumbers: true,
        content: `A long time ago, there was a boy named Meng who lived with his mother in a village. One day, his mother made rice cakes and a pie. She instructed him to take some of the food to his aunt who lived in the town. "These rice cakes and pie are very delicate. You must not shake this box. Carry it carefully," Mother advised Meng. He took the box and set off.

As Meng was walking, he said to himself, "I must not shake this important box." When he was walking down the path next to the rice field, a frog jumped onto the path. "Oops!" Meng shouted as he leapt backwards. He sighed in relief when he realised that he had not shaken the box.

Next, Meng reached a small stream. He jumped over it as he did not want to get his shoes wet. "Good, good, I did not shake it!"

At last, Meng arrived at his aunt's house in the town. He handed the box to her. His curious aunt wondered, "What is inside this box? What can it be?" She was so impatient that she quickly grabbed the box, put her ear to it and listened. There was no sound and she became more curious... She shook it all up!

Adapted from "How to Fool a Cat" by Hiroko Fujita and Fran Stallings`,
      },
      questions: [
        {
          id: "ch_2024_eoy_q35",
          qNumber: 35,
          topic: "ComprehensionOE",
          subtopic: "Literal — Character Detail",
          questionText: "Who did Meng live with? [1 mark]",
          answer: "Meng lived with his mother.",
          marks: 1,
          solution: {
            method: "Locate and retrieve",
            steps: [
              "Text: 'there was a boy named Meng who lived with his mother in a village.'",
              "Answer: Meng lived with his mother.",
            ],
            tip: "Answer in a complete sentence. Include the subject (Meng) and the relevant detail.",
          },
        },
        {
          id: "ch_2024_eoy_q36",
          qNumber: 36,
          topic: "ComprehensionOE",
          subtopic: "Selected Response — Pronoun Reference",
          questionText:
            "Tick √ your chosen answer.\nThe word \"it\" in line 4 refers to __________. [1 mark]\n□ the pie\n□ the box\n□ the town",
          answer: "the box",
          marks: 1,
          solution: {
            method: "Pronoun reference",
            steps: [
              "Line 4 context: '\"You must not shake this box. Carry it carefully,\"'",
              "'It' refers back to 'this box' — the item Meng must carry carefully.",
              "Answer: the box",
            ],
            tip:
              "To find what a pronoun refers to, look for the nearest noun before it that matches in number/gender.",
          },
        },
        {
          id: "ch_2024_eoy_q37",
          qNumber: 37,
          topic: "ComprehensionOE",
          subtopic: "Vocabulary — Synonym from Text",
          questionText:
            "Which word in the sentence below has the same meaning as \"became aware\"? Circle either (A) or (B). [1 mark]\n\nHe sighed in relief when he realised that he had not shaken the box.\n(A) sighed            (B) realised",
          answer: "B",
          marks: 1,
          solution: {
            method: "Vocabulary — word meaning matching",
            steps: [
              "'Became aware' = came to understand or know something.",
              "'Realised' = became aware of something.",
              "'Sighed' = exhaled deeply (an action, not related to awareness).",
              "Answer: (B) realised",
            ],
            tip: "'Realise' = to become aware of a fact. 'Realised' = became aware (past tense).",
          },
        },
        {
          id: "ch_2024_eoy_q38_39",
          qNumber: 38,
          topic: "ComprehensionOE",
          subtopic: "True / False — Paragraphs 2 and 3",
          questionText:
            "For questions 38 and 39, read each statement and tick \"True\" or \"False\". Refer to paragraphs 2 and 3 to help you. [2 marks]\n\n38. Meng was shocked when the frog jumped in front of him.\n39. Meng got his shoes wet while crossing the stream.",
          answer: "38: True   39: False",
          marks: 2,
          solution: {
            method: "True/False verification from specific paragraphs",
            steps: [
              "Q38: Para 2 — 'a frog jumped onto the path. \"Oops!\" Meng shouted as he leapt backwards.' → Meng was startled/shocked. → True",
              "Q39: Para 3 — 'He jumped over it as he did not want to get his shoes wet.' → He jumped OVER to avoid wet shoes — shoes stayed dry. → False",
              "Answers: 38: True  39: False",
            ],
            tip: "Always refer to the specific paragraph mentioned in the question.",
          },
        },
        {
          id: "ch_2024_eoy_q40",
          qNumber: 40,
          topic: "ComprehensionOE",
          subtopic: "Sequence — Story Events",
          questionText:
            "Write 1, 2 and 3 in the blanks below to indicate the order of what Meng did in the story. [1 mark]\n\n___ Meng reached the town.\n___ Meng crossed the stream.\n___ Meng walked past the rice field.",
          answer: "Meng reached the town: 3 | Meng crossed the stream: 2 | Meng walked past the rice field: 1",
          marks: 1,
          solution: {
            method: "Sequence of events",
            steps: [
              "Order from the story:",
              "1 — Walked past the rice field (paragraph 2: 'walking down the path next to the rice field')",
              "2 — Crossed the stream (paragraph 3: 'Meng reached a small stream')",
              "3 — Reached the town (paragraph 4: 'At last, Meng arrived at his aunt's house in the town')",
              "Answer: Rice field=1, Stream=2, Town=3",
            ],
            tip: "Read through the passage in order and match events to the sequence 1, 2, 3.",
          },
        },
        {
          id: "ch_2024_eoy_q41",
          qNumber: 41,
          topic: "ComprehensionOE",
          subtopic: "Inference — Character Qualities",
          questionText:
            "From the last paragraph, what two qualities did Meng's aunt have that made her shake the box?\n\ni. __________ [1 mark]\nii. __________ [1 mark]",
          answer: "i. curious   ii. impatient",
          marks: 2,
          solution: {
            method: "Character inference from text",
            steps: [
              "Text: 'His curious aunt wondered…' → quality: curious",
              "Text: 'She was so impatient that she quickly grabbed the box…' → quality: impatient",
              "Answer: i. curious  ii. impatient",
            ],
            tip:
              "The text directly states both adjectives. Look for words that DESCRIBE a character's personality or behaviour.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // SECTION I – COMPREHENSION – Open-ended (4 × 2m = 8m)
    // ─────────────────────────────────────────

    {
      id: "ch2024_secI",
      name: "Section I – Comprehension Open-ended",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer the questions that follow. Write your answers in complete sentences.",
      marks: 8,
      questionType: "B",
      passage: {
        title: "Tammy and the School Excursion",
        type: "narrative",
        lineNumbers: true,
        content: `Tammy hated Sundays. Everybody else hated Mondays the most but Tammy thought Sundays were harder to get through. Sunday was supposed to be a fun and relaxing day but Tammy could not relax at the thought of having to go to school the next day.

That Sunday was harder than usual. Tammy had to pack her bag for a school excursion that she did not want to go for the next day. Her class would be hiking at the nature park. Dad had been trying to convince her that she would love it when she got there.

Tammy wondered if Dad even cared for her safety. She was afraid of falling. She was also anxious about getting lost. Dad nodded solemnly. "Of course we care, but we think that hiking will do you more good than harm. It's always good to have new experiences," Dad replied.

Tammy was unconvinced. She had always been afraid of the outdoors. Being surrounded by tall trees made her feel uneasy. A ferocious creature could be hiding in the shadows, waiting to pounce on her. Tammy imagined being chased by a hungry wolf. She squeezed her eyes shut and shuddered. Dad put his comforting arm around Tammy's shoulders and sat closer to her.

"How about you bring Titi, your favourite stuffed tiger, along for the excursion? You could hug it when you feel scared," Dad suggested. Tammy opened her eyes widely. "You're right, Dad!" she exclaimed as she grabbed Titi from her bed.

Adapted from "Do You Know Me?" by Libby Scott & Rebecca Westcott`,
      },
      questions: [
        {
          id: "ch_2024_eoy_q42",
          qNumber: 42,
          topic: "ComprehensionOE",
          subtopic: "Inference — Character Feelings",
          questionText:
            "Why did Tammy think Sunday was the most difficult day of the week? [2 marks]",
          answer:
            "Tammy thought Sunday was the most difficult day of the week because she could not relax knowing she had to go to school the next day. She would worry about going to school, which made it hard for her to enjoy the day.",
          marks: 2,
          solution: {
            method: "Inference from paragraph 1",
            steps: [
              "Text: 'Sunday was supposed to be a fun and relaxing day but Tammy could not relax at the thought of having to go to school the next day.'",
              "Her Sunday was ruined by anxiety about Monday school.",
              "Award 1m for identifying she could not relax; 1m for explaining the reason (thought of going to school).",
            ],
            tip:
              "Answer in full sentences. Include BOTH what she felt AND why she felt that way.",
          },
        },
        {
          id: "ch_2024_eoy_q43",
          qNumber: 43,
          topic: "ComprehensionOE",
          subtopic: "Vocabulary — Pronoun Reference",
          questionText:
            "What does the word \"there\" in line 8 refer to? [1 mark]",
          answer: "The word 'there' refers to the nature park.",
          marks: 1,
          solution: {
            method: "Pronoun/adverb reference",
            steps: [
              "Line 8: 'Dad had been trying to convince her that she would love it when she got there.'",
              "'There' refers to the place being discussed — the nature park (where the hiking excursion takes place).",
              "Answer: 'there' refers to the nature park.",
            ],
            tip: "Trace back through the text to find which place or noun 'there' refers to.",
          },
        },
        {
          id: "ch_2024_eoy_q44",
          qNumber: 44,
          topic: "ComprehensionOE",
          subtopic: "Literal — Locating Two Details",
          questionText:
            "Based on paragraph 3, what were the two things Tammy was worried would happen to her on the school trip? [2 marks]",
          answer:
            "Tammy was worried she might fall during the hike. She was also worried that she might get lost.",
          marks: 2,
          solution: {
            method: "Locate two specific details",
            steps: [
              "Text (paragraph 3): 'She was afraid of falling. She was also anxious about getting lost.'",
              "Point 1: She was afraid of falling.",
              "Point 2: She was anxious about getting lost.",
            ],
            tip: "For two-mark questions asking for two things, identify two separate details from the specified paragraph.",
          },
        },
        {
          id: "ch_2024_eoy_q45",
          qNumber: 45,
          topic: "ComprehensionOE",
          subtopic: "Literal — Dad's Suggestion",
          questionText:
            "According to Dad, what could Tammy do to make her feel less uneasy during the excursion? [2 marks]",
          answer:
            "According to Dad, Tammy could bring her favourite stuffed tiger, Titi, along for the excursion. She could hug Titi whenever she felt scared.",
          marks: 2,
          solution: {
            method: "Locate specific suggestion from character dialogue",
            steps: [
              "Text: '\"How about you bring Titi, your favourite stuffed tiger, along for the excursion? You could hug it when you feel scared,\" Dad suggested.'",
              "Two parts to the answer: (1) bring Titi along; (2) hug it when scared.",
              "Award 1m for bringing Titi + 1m for hugging it when scared.",
            ],
            tip:
              "When asked 'According to [character]', your answer must come ONLY from what that character said.",
          },
        },
      ],
    },
  ],
};

export default paper;
