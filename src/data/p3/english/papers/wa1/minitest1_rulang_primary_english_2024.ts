// =============================================================================
// src/data/p3/english/papers/minitest1_rulang_primary_english_2024.ts
// Rulang Primary School — Mini-Test 1 (English Language) 2024 — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 220–224 (시험지 표지 p.1–5)
// Duration: 30 minutes / Total: 20 marks / Date: 3 May 2024
// ★ 공식 정답표(p226) 기준 20문항 전부 100% 일치 확인됨.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(10) B어휘(5) C교정(5) = 20점
// 참고: 원본 Q7은 OCR/Optical Answer Sheet 형식 문제로, 보기 (4) "could"에
//       원본 인쇄상 취소선이 있었으나 정답(1) will에는 영향 없음.
// =============================================================================

import type { EnglishPaper } from '../types';

export const minitest1RulangPrimaryEnglish2024: EnglishPaper = {
  meta: {
    school: 'Rulang Primary School',
    year: 2024,
    assessment: 'Mini-Test 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 30,
    totalMarks: 20,
    sourcePages: 'pp.220–224 (paper pp.1–5)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (10 marks) — Q1–10
    // =========================================================================
    {
      kind: 'single',
      id: 'rulang2024-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'The pupils stayed behind ________ recess to clean the classroom.',
      options: [
        { label: '1', text: 'on' },
        { label: '2', text: 'with' },
        { label: '3', text: 'during' },
        { label: '4', text: 'towards' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the correct preposition that matches the meaning of \'during recess\'.',
        steps: [
          '\'stayed behind ___ recess to clean\' (stayed back during recess to clean) — during a period of time called recess.',
          '\'during\' is used to show something happening throughout a specific period or time.',
          'on/with/towards do not match the meaning of \'during a period of time\' → correct answer is (3) during.',
        ],
        tip: '\'during + noun (a period of time / an event)\' means something happens in that time (e.g. during recess, during the movie).',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: "Joan ________ a donation to Sunrise Old Folks' Home this morning.",
      options: [
        { label: '1', text: 'made' },
        { label: '2', text: 'makes' },
        { label: '3', text: 'is making' },
        { label: '4', text: 'was making' },
      ],
      answer: '1',
      solution: {
        method: 'Check whether "this morning" is already in the past.',
        steps: [
          '"this morning" is already over if the writer is writing in the afternoon or evening, so it is in the past.',
          'A finished action (making a donation) uses the simple past → made.',
          'So "Joan made a donation this morning" → answer (1) made.',
        ],
        tip: 'If "this morning/this afternoon" is already over in the context, use the simple past (made).',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem:
        'Both Siti and Ali ________ excited when they received movie tickets from their parents.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '4',
      solution: {
        method: 'Look at the subject ("Both Siti and Ali") and the tense ("received" = past).',
        steps: [
          '"Both A and B" is always a plural subject.',
          '"when they received" (past) — the whole sentence is in the past tense.',
          'Plural + past → were → answer (4).',
        ],
        tip: '"Both A and B" is a plural subject, so use are/were.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem:
        'Pointing to the books in front of her, Mrs Lim asked me, "Can you help me carry ________ books?"',
      options: [
        { label: '1', text: 'this' },
        { label: '2', text: 'that' },
        { label: '3', text: 'these' },
        { label: '4', text: 'those' },
      ],
      answer: '3',
      solution: {
        method: 'Look at whether the noun is plural and whether it is near.',
        steps: [
          '"books" is plural → rule out this/that (singular).',
          '"Pointing to the books in front of her" → the books are near.',
          'Plural + near = these → answer (3).',
        ],
        tip: '"in front of her" is a clue that the things are near.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Without any help, Tina and I completed the project by ________.',
      options: [
        { label: '1', text: 'myself' },
        { label: '2', text: 'herself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the reflexive pronoun that matches the subject "Tina and I" (we).',
        steps: [
          '"Tina and I" is a plural subject that includes the speaker.',
          'The reflexive pronoun for "we" is "ourselves".',
          '"completed the project by ourselves" (did it on our own) → answer (3).',
        ],
        tip: 'When the subject is "A and I", the reflexive pronoun is ourselves.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'Susan was determined to take part in the competition ________ she was feeling unwell.',
      options: [
        { label: '1', text: 'so' },
        { label: '2', text: 'since' },
        { label: '3', text: 'although' },
        { label: '4', text: 'because' },
      ],
      answer: '3',
      solution: {
        method: 'Check whether the two parts of the sentence show contrast.',
        steps: [
          'First part: decided to take part in the competition (determined) / second part: feeling unwell.',
          'She decided to take part even though she felt unwell → contrast.',
          '"although" shows this kind of contrast.',
          'so/because show cause and effect, which does not fit → answer (3) although.',
        ],
        tip: '"although" shows that something was done even though there was a difficulty or an opposite situation.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'This outfit suits Megan. She ________ definitely like it.',
      options: [
        { label: '1', text: 'will' },
        { label: '2', text: 'can' },
        { label: '3', text: 'may' },
        { label: '4', text: 'could' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the modal verb that goes with "definitely" to show certainty.',
        steps: [
          '"definitely like it" — a strong, certain prediction about the future.',
          '"will definitely" is a natural pair for a certain prediction.',
          'can/may/could show possibility or permission and do not fit "definitely" well → answer (1) will.',
        ],
        tip: '"definitely" shows certainty, so it often goes with will.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem:
        'Paul was proud of himself when Mr Gan presented him with a certificate ________ reading the most number of books last month.',
      options: [
        { label: '1', text: 'in' },
        { label: '2', text: 'of' },
        { label: '3', text: 'for' },
        { label: '4', text: 'from' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the preposition that fits "a certificate for [achievement / action]".',
        steps: [
          '"a certificate ___ reading the most books" (a certificate for reading the most books).',
          '"a certificate for [achievement / action]" = a certificate given for something done.',
          'in/of/from do not fit this meaning → answer (3) for.',
        ],
        tip: '"a certificate/award for [achievement]" is given for an achievement.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q9',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem:
        '"Would you like to have ________ sugar in your tea?" Mother asked Aunt Linda when she came over for a visit.',
      options: [
        { label: '1', text: 'a few' },
        { label: '2', text: 'many' },
        { label: '3', text: 'much' },
        { label: '4', text: 'a little' },
      ],
      answer: '4',
      solution: {
        method: 'Look at whether "sugar" is countable and at the polite offer.',
        steps: [
          '"sugar" is uncountable → rule out a few/many (used with countable nouns).',
          'When politely offering sugar for tea ("Would you like ~?"), "a little" sounds natural.',
          '"much" is usually used in negative sentences and questions, so it is less natural in an offer → answer (4) a little.',
        ],
        tip: 'When offering sugar or milk in a drink, "a little" is the natural expression.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q10',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: 'Adele visits her grandparents every weekend, ________?',
      options: [
        { label: '1', text: 'will she' },
        { label: '2', text: 'does she' },
        { label: '3', text: "won't she" },
        { label: '4', text: "doesn't she" },
      ],
      answer: '4',
      solution: {
        method: 'Apply the tag question rule: match the tense and use the opposite (positive/negative) form.',
        steps: [
          'The main sentence "Adele visits..." is simple present and positive.',
          'A tag question matches the tense of the main sentence and is negative if the main sentence is positive.',
          'The negative of the simple present for "Adele" (3rd person singular) is doesn\'t, and the pronoun is \'she\'.',
          'Therefore, the tag is \'doesn\'t she?\' → correct answer is (4).',
        ],
        tip: 'Question tags: a positive sentence uses a negative tag (positive sentence + doesn\'t/isn\'t she, etc.), and the tense must match the main sentence.',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (5 marks) — Q11–15
    // =========================================================================
    {
      kind: 'single',
      id: 'rulang2024-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'Adam ________ the tap as soon as he had washed his hands.',
      options: [
        { label: '1', text: 'turned in' },
        { label: '2', text: 'turned on' },
        { label: '3', text: 'turned off' },
        { label: '4', text: 'turned down' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the verb phrase that describes what is done to the tap \'after washing hands\'.',
        steps: [
          '\'as soon as he had washed his hands\' (once he finished washing his hands) → there is no need to keep the tap running anymore.',
          '\'turn off the tap\' = to switch off the tap.',
          'turned in (to submit) / turned on (to switch on) / turned down (to lower or reject) do not match the action after washing hands → correct answer is (3) turned off.',
        ],
        tip: '\'had washed\' (already finished washing) is naturally followed by the action of turning off the tap.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem:
        'The curtains flapped about as a ________ of wind blew through the window of the big house.',
      options: [
        { label: '1', text: 'puff' },
        { label: '2', text: 'gust' },
        { label: '3', text: 'flurry' },
        { label: '4', text: 'breeze' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the noun that describes the wind in \'so much that the curtains were shaking wildly\'.',
        steps: [
          '\'The curtains flapped about\' (the curtains were flapping around wildly) → this suggests a sudden and strong wind.',
          '"a gust of wind" = one sudden, strong burst of wind → matches the idea of shaking wildly.',
          'puff (a small breath of air) / flurry (swirling snow or movement) / breeze (a gentle wind) are all too weak to cause "shaking wildly" → correct answer is (2) gust.',
        ],
        tip: '"gust of wind" describes a sudden and strong burst of wind that happens in one go.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: "The audience had fun and ________ at the comedian's string of jokes.",
      options: [
        { label: '1', text: 'cackled' },
        { label: '2', text: 'guffawed' },
        { label: '3', text: 'squealed' },
        { label: '4', text: 'snickered' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the verb for how the audience reacted (laughter) to the comedian\'s jokes.',
        steps: [
          '"had fun" and "jokes" go with loud laughter.',
          '"guffawed" = laughed loudly → matches the happy mood exactly.',
          'cackled (a harsh, witch-like laugh)/squealed (made a high shriek)/snickered (laughed unkindly, negative) fit a happy audience less → answer (2) guffawed.',
        ],
        tip: '"guffaw" means to laugh loudly at a funny joke.',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem:
        'When Joe heard his bedroom door creak open in the middle of the night, he was ________ and trembled with fear.',
      options: [
        { label: '1', text: 'irritated' },
        { label: '2', text: 'alarmed' },
        { label: '3', text: 'ashamed' },
        { label: '4', text: 'embarrassed' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the feeling adjective that goes with "trembled with fear".',
        steps: [
          '"trembled with fear" → feeling startled and anxious.',
          '"alarmed" = frightened/anxious (sensing danger) → directly linked to fear.',
          'irritated (annoyed)/ashamed/embarrassed are different feelings from "fear" → answer (2) alarmed.',
        ],
        tip: '"trembled with fear" naturally goes with alarmed (startled and anxious).',
      },
    },
    {
      kind: 'single',
      id: 'rulang2024-q15',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 15,
      marks: 1,
      stem: 'All of us were nervous as we waited for our results, but Rachel was ________.',
      options: [
        { label: '1', text: 'as cold as ice' },
        { label: '2', text: 'as jumpy as a cat' },
        { label: '3', text: 'as meek as a mouse' },
        { label: '4', text: 'as cool as a cucumber' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the simile that means "not nervous", contrasting with "but".',
        steps: [
          '"All of us were nervous ... but Rachel was ___" — Rachel was not nervous, unlike everyone else.',
          '"as cool as a cucumber" = very calm and relaxed → the opposite of "nervous".',
          '"as jumpy as a cat" (easily frightened) is similar to nervous, so it does not give a contrast, and "as cold as ice" (unfriendly)/"as meek as a mouse" (gentle and timid) do not directly mean "not nervous" → answer (4).',
        ],
        tip: '"as cool as a cucumber" is a fixed simile meaning very calm even in a tense situation.',
      },
    },

    // =========================================================================
    // Section C: Editing for Spelling and Grammar (5 marks) — Q16–20
    // Passage: Introduction to the movie Kung Fu Panda
    // =========================================================================
    {
      kind: 'set',
      id: 'rulang2024-secC-editing',
      topic: 'Editing',
      title: 'Section C: Editing for Spelling and Grammar',
      instructions:
        'Correct each word in bold for spelling and each underlined word for grammar. Write the correct word in the box provided.',
      passage:
        'Do you remember the characters, Po and his friends, from the movie Kung Fu Panda? They are back (16) [togedder] for their fourth adventure this year. Po the Panda is (17) [serlecterd] to train a new warrior. Unfortunately, his mission (18) [became] very challenging when he meets a witch with magical powers. He teams up with his friends and they (19) [perservear] to stop the witch\'s plans.\n\n' +
        'The movie director said, "In this action-packed movie, we showcase how the characters interact (20) [by] one another during their adventure while staying true to themselves." The movie is being screened in cinemas now.\n\n' +
        '(Adapted from https://www.timeforkids.com/g56/panda-on-a-mission-g5/)',
      marks: 5,
      questions: [
        {
          questionNo: '16',
          format: 'editing',
          marks: 1,
          stem: 'They are back [togedder] for their fourth adventure this year.',
          answer: 'together',
          solution: {
            method: 'Check the correct spelling of the word "together".',
            steps: [
              'Incorrect spelling: togedder.',
              'The correct word is together — spelled "to-geth-er", using "th".',
              'Therefore, the answer is together.',
            ],
            tip: 'together is spelled "to-geth-er" — use "th", not "dd".',
          },
        },
        {
          questionNo: '17',
          format: 'editing',
          marks: 1,
          stem: 'Po the Panda is [serlecterd] to train a new warrior.',
          answer: 'selected',
          solution: {
            method: 'Check the correct spelling of the word meaning "to be chosen/selected".',
            steps: [
              'Incorrect spelling: serlecterd.',
              'The correct word is select — spelled "se-lect", and its past participle form is selected.',
              'Therefore, the answer is selected.',
            ],
            tip: 'select is spelled "se-lect" — not "serlect".',
          },
        },
        {
          questionNo: '18',
          format: 'editing',
          marks: 1,
          stem:
            'his mission [became] very challenging when he meets a witch with magical powers.',
          answer: 'becomes',
          solution: {
            method: 'Match the tense throughout the passage to the correct tense (movie plot summary = Present Tense).',
            steps: [
              'The passage introduces the movie plot using Present Tense: "Po the Panda is selected...", "He teams up...", "they persevere..."',
              'In the same sentence, "he meets a witch" is also in Present Tense.',
              'Therefore, "became" (Simple Past) does not match the tense used in the rest of the passage → it should be corrected to the Present Tense form "becomes".',
            ],
            tip: 'When describing a movie or book plot, we consistently use Present Tense (called the narrative present).',
          },
        },
        {
          questionNo: '19',
          format: 'editing',
          marks: 1,
          stem: "He teams up with his friends and they [perservear] to stop the witch's plans.",
          answer: 'persevere',
          solution: {
            method: 'Check the exact spelling of "to persevere / to keep trying steadily".',
            steps: [
              'Wrong spelling: perservear.',
              'The correct word is persevere — per-se-vere; watch the order of v and e.',
              'So the answer is persevere.',
            ],
            tip: 'persevere is spelt "per-se-vere" (perservear ✗).',
          },
        },
        {
          questionNo: '20',
          format: 'editing',
          marks: 1,
          stem:
            '"...we showcase how the characters interact [by] one another during their adventure..."',
          answer: 'with',
          solution: {
            method: 'Check the correct preposition that goes with "interact".',
            steps: [
              '"interact with someone" = a fixed preposition pair.',
              '"interact by" is not correct.',
              'So change by to with.',
            ],
            tip: '"interact with" is a fixed preposition pair.',
          },
        },
      ],
    },
  ],
};

export default minitest1RulangPrimaryEnglish2024;
