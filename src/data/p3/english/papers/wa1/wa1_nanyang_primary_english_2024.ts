// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2024.ts
// Nanyang Primary School — 2024 Term 1 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 200–205 (시험지 표지 p.1–5)
// Duration: 30 minutes / Total: 20 marks
// ★ 공식 정답표(p206) 기준 20문항 전부 100% 일치 확인됨.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(4) B어휘(4) C전치사클로즈(4) D주술일치클로즈(4) E교정(4) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2024: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2024,
    assessment: 'Term 1 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 30,
    totalMarks: 20,
    sourcePages: 'pp.200–205 (paper pp.1–5)',
  },

  items: [
    // =========================================================================
    // (A) Grammar (4 marks) — Q1–4
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2024-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last Sunday, Oliver ________ a nature walk along the MacRitchie Reservoir.',
      options: [
        { label: '1', text: 'take' },
        { label: '2', text: 'took' },
        { label: '3', text: 'takes' },
        { label: '4', text: 'is taking' },
      ],
      answer: '2',
      solution: {
        method: 'Decide the correct verb tense to match the past time \'Last Sunday\'.',
        steps: [
          '\'Last Sunday\' shows a clear point in the past.',
          'The Simple Past form of \'take\' is \'took\'.',
          'So \'Oliver took a nature walk\' → the correct answer is (2) took.',
        ],
        tip: '\'Last + time expression\' is used with Simple Past tense verbs (took, went, did, etc.).',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'When Nina won the race, she was so proud of ________ for training tirelessly.',
      options: [
        { label: '1', text: 'myself' },
        { label: '2', text: 'herself' },
        { label: '3', text: 'yourself' },
        { label: '4', text: 'themselves' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the correct reflexive pronoun to match the subject \'Nina\' (3rd person, female, singular).',
        steps: [
          '\'Nina ... was so proud of ___\' — Nina feels proud of herself.',
          'Nina is 3rd person, female, singular → the reflexive pronoun is \'herself\'.',
          'So the correct answer is (2) herself.',
        ],
        tip: 'A reflexive pronoun must match the subject in person, gender, and number (Nina → herself).',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem:
        '"________ cup of lemonade is so sour! Please add more sugar syrup," said Sara as she pointed to the cup in her hand.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '1',
      solution: {
        method: 'Look at the noun\'s number (singular or plural) and distance (near or far).',
        steps: [
          '\'cup\' is singular → rule out \'these\' and \'those\' (plural).',
          '\'the cup in her hand\' — the cup is very close (she is holding it).',
          'Singular + near = \'This\' → the correct answer is (1).',
        ],
        tip: 'When a singular object is very close, like something held in your hand, we use \'this\'.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem:
        'The tickets for the charity funfair were sold out. ________ people turned up to support the event for the homeless.',
      options: [
        { label: '1', text: 'A few' },
        { label: '2', text: 'Many' },
        { label: '3', text: 'Much' },
        { label: '4', text: 'Some' },
      ],
      answer: '2',
      solution: {
        method: 'For \'The tickets were sold out\', choose the correct quantity word that matches the situation.',
        steps: [
          '\'The tickets ... were sold out\' (tickets were all sold) → This suggests that many people came.',
          '\'people\' is a countable noun → \'Much\' (used for uncountable nouns) cannot be used.',
          'Since the tickets were sold out, it means many people came, so \'Many\' is the most natural choice → Answer: (2) Many.',
        ],
        tip: '\'sold out\' is a clue that tells us a large number of people attended.',
      },
    },

    // =========================================================================
    // (B) Vocabulary (4 marks) — Q5–8
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2024-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem:
        "The ________ created stunning artwork to beautify the walls of the school library. The artwork featured popular characters from children's books.",
      options: [
        { label: '1', text: 'actor' },
        { label: '2', text: 'artist' },
        { label: '3', text: 'author' },
        { label: '4', text: 'advertiser' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the job name for a person who "Made a wonderful artwork".',
        steps: [
          '"created stunning artwork" — someone who makes paintings or works of art.',
          '"artist" = a person who makes art → a perfect match for someone who creates artwork.',
          'actor/author (writes books)/advertiser are not directly related to making artwork → answer (2) artist.',
        ],
        tip: 'A person who makes artwork is an artist.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'Jakob ________ in the piercing wind, so he wrapped himself more tightly in his thick woollen jacket.',
      options: [
        { label: '1', text: 'waved' },
        { label: '2', text: 'fluttered' },
        { label: '3', text: 'shivered' },
        { label: '4', text: 'shattered' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the verb for how a person\'s body reacts to "Biting/harsh wind".',
        steps: [
          'Trembling in the "piercing wind" → "shivered" (shook from the cold).',
          'The next sentence "wrapped himself more tightly in his thick woollen jacket" also supports the cold.',
          'waved/fluttered (usually flags or leaves)/shattered (broke into pieces) are not how a person reacts to cold → answer (3) shivered.',
        ],
        tip: '"shiver" means to shake because of cold or fear.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        '"Where is the toilet?" Aisha ________ in Mother\'s ear during the movie, not wanting to disturb the others.',
      options: [
        { label: '1', text: 'shouted' },
        { label: '2', text: 'gossiped' },
        { label: '3', text: 'chattered' },
        { label: '4', text: 'whispered' },
      ],
      answer: '4',
      solution: {
        method: 'For the intention \'so as not to disturb others\', choose the correct speaking verb that matches.',
        steps: [
          '\'not wanting to disturb the others\' (not wanting to bother other people) → This means speaking quietly.',
          '\'whispered\' = spoke very quietly → This also fits well with \'in Mother\'s ear\'.',
          'shouted (yelled) / gossiped (talked about others) / chattered (talked noisily) all go against or do not fit with speaking quietly → Answer: (4) whispered.',
        ],
        tip: '\'whisper in someone\'s ear\' is the action of speaking so softly that only that person can hear.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem:
        "There was a ________ display of fireworks at the Marina Bay on New Year's Day. Everyone applauded after it ended.",
      options: [
        { label: '1', text: 'dull' },
        { label: '2', text: 'limp' },
        { label: '3', text: 'grim' },
        { label: '4', text: 'vibrant' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the adjective describing the fireworks that fits the reaction "Everyone clapped".',
        steps: [
          '"Everyone applauded after it ended" → hints that the fireworks were colourful and wonderful.',
          '"vibrant" = bright and full of life → fits fireworks that deserve applause.',
          'dull (boring)/limp (floppy)/grim (gloomy) are all negative, so they do not fit clapping → answer (4) vibrant.',
        ],
        tip: 'The reaction that follows (applauded) is a clue to whether the adjective is positive or negative.',
      },
    },

    // =========================================================================
    // (C) Grammar Cloze — Prepositions (4 marks) — Q9–12
    // Options: (A) down (B) for (C) from (D) of (E) through (F) up
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2024-secC-prepositions',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Prepositions',
      instructions:
        'Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) down  (B) for  (C) from  (D) of  (E) through  (F) up',
      passage:
        'Having the service dog, Knight, was one of the best decisions Patrick made. Patrick used a wheelchair to get (9) ________ one place to another. Ever since an accident, Patrick was not able to move about to do simple chores by himself.\n\n' +
        'A year ago, while struggling to get (10) ________ the front door, Patrick dropped his keys. It was a nightmare (11) ________ him to reach out for the keys because leaning out of his wheelchair to pick (12) ________ the keys was dangerous. He could fall out easily.\n\n' +
        'With Knight around, Peter had someone to look out for him. "With a simple command, Knight knows what to do!" said Peter with relief.\n\n' +
        '(Adapted from Changing a Life: Patrick and Service Dog Knight. NEADS: World Class Service Dogs.)',
      marks: 4,
      questions: [
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: 'Patrick used a wheelchair to get (9) ________ one place to another.',
          answer: 'C',
          solution: {
            method: 'Choose the preposition that fits "From one place to another place".',
            steps: [
              '"get from one place to another" = to move from one place to another → a fixed expression.',
              '"from" shows "From one place (starting point)".',
              'In the word list, from is (C) → answer (C).',
            ],
            tip: '"from A to B" is a pair of prepositions meaning "From A to B".',
          },
        },
        {
          questionNo: '10',
          format: 'fib',
          marks: 1,
          stem: 'A year ago, while struggling to get (10) ________ the front door, Patrick dropped his keys.',
          answer: 'E',
          solution: {
            method: 'Choose the preposition that fits "To go through a door".',
            steps: [
              '"get through the door" = to pass through the door.',
              '"through" is the preposition that means passing through.',
              'In the word list, through is (E) → answer (E).',
            ],
            tip: '"get through a door/gate" shows passing through a door or entrance.',
          },
        },
        {
          questionNo: '11',
          format: 'fib',
          marks: 1,
          stem: 'It was a nightmare (11) ________ him to reach out for the keys...',
          answer: 'B',
          solution: {
            method: 'Choose the preposition that means "For someone / When it comes to someone".',
            steps: [
              '"It was a nightmare ___ him" — it means "It was like a nightmare for him".',
              '"for" is used to mean "For someone / To someone".',
              'In the word list, for is (B) → answer (B).',
            ],
            tip: '"It was [adjective] for someone" means "It was [adjective] for someone / to someone".',
          },
        },
        {
          questionNo: '12',
          format: 'fib',
          marks: 1,
          stem: '...leaning out of his wheelchair to pick (12) ________ the keys was dangerous.',
          answer: 'F',
          solution: {
            method: 'Choose the preposition in the phrasal verb "To pick up something that fell on the floor".',
            steps: [
              '"pick up the keys" = to lift the keys (from the floor).',
              '"up" shows lifting from a low place to a higher place.',
              'In the word list, up is (F) → answer (F). (A and D are left unused.)',
            ],
            tip: '"pick up something" is a fixed expression for lifting something that has fallen.',
          },
        },
      ],
    },

    // =========================================================================
    // (D) Grammar Cloze — Subject-Verb Agreement (4 marks) — Q13–16
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2024-secD-svagreement',
      topic: 'GrammarCloze',
      title: '(D) Grammar Cloze — Subject-Verb Agreement',
      instructions: 'Underline the correct word from the given words in the brackets.',
      passage:
        'Lions are known as symbols of power and strength. Very few animals (13) [is / are] a threat to lions. Leopards and hyenas (14) [hunt / hunts] lion cubs only when the adult lions are out of sight.\n\n' +
        'Unfortunately, humans (15) [has / have] been a real threat to adult lions. Lions are hunted for their body parts or displayed as a symbol of achievement. This (16) [was / were] accepted in the past. In recent years, many animal welfare groups have come forward to stand against such hunting practices.\n\n' +
        '(Adapted from Thomson, S. (2023). Save the...LIONS.)',
      marks: 4,
      questions: [
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem: 'Very few animals (13) [is / are] a threat to lions.',
          answer: 'are',
          solution: {
            method: 'Look at the number (plural) of the subject "Very few animals".',
            steps: [
              '"animals" is a plural noun.',
              'Plural subject → the be verb is are.',
              'So "Very few animals are a threat" → are.',
            ],
            tip: '"Very few + plural noun" is a plural subject, so use are.',
          },
        },
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Leopards and hyenas (14) [hunt / hunts] lion cubs only when the adult lions are out of sight.',
          answer: 'hunt',
          solution: {
            method: 'Look at the plural subject joined by "and".',
            steps: [
              '"Leopards and hyenas" are two nouns joined by and, so the subject is plural.',
              'Plural subject + simple present → base form of the verb.',
              'So "Leopards and hyenas hunt" → hunt.',
            ],
            tip: 'A subject joined by A and B is plural, so do not add -s to the verb.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'Unfortunately, humans (15) [has / have] been a real threat to adult lions.',
          answer: 'have',
          solution: {
            method: 'Look at the number (plural) of the subject "humans".',
            steps: [
              '"humans" is a plural noun.',
              'The present perfect helping verb for a plural subject is have.',
              'So "humans have been" → have.',
            ],
            tip: 'Use "have been" with a plural subject in the present perfect (has is for a singular subject).',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'This (16) [was / were] accepted in the past.',
          answer: 'was',
          solution: {
            method: 'Look at the number (singular) of the subject "This".',
            steps: [
              '"This" is a singular pronoun (it refers to the situation in the previous sentence).',
              'The past be verb for a singular subject is was.',
              'So "This was accepted" → was.',
            ],
            tip: '"This/That" are singular, and "These/Those" are plural.',
          },
        },
      ],
    },

    // =========================================================================
    // (E) Editing for Spelling (4 marks) — Q17–20
    // Passage: The story of Walt Disney and a tame mouse
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2024-secE-editing',
      topic: 'Editing',
      title: '(E) Editing for Spelling',
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage:
        'Do you know of anyone who keeps a field mouse as a pet? Walt Disney once (17) [corght] a mouse and made a leash for it using a string.\n\n' +
        'One fine school day, Walt (18) [hurryed] into class and showed everyone his new pet. One of his classmates saw the little animal and (19) [skreemed]. Their teacher stomped right over and scolded Walt. Walt was not upset. He was (20) [pleesed] to get all the attention with his pet mouse for a day. At that time, he did not know that another mouse, Mickey Mouse, would make him really famous all over the world.\n\n' +
        '(Adapted from Stewart, W. (2014). Who Was Walt Disney?)',
      marks: 4,
      questions: [
        {
          questionNo: '17',
          format: 'editing',
          marks: 1,
          stem: 'Walt Disney once [corght] a mouse and made a leash for it using a string.',
          answer: 'caught',
          solution: {
            method: 'Check the correct spelling of "Caught / Grabbed" (the past tense of catch).',
            steps: [
              'Wrong spelling: corght.',
              'The past tense of catch is caught (irregular verb catch–caught–caught).',
              'So the answer is caught.',
            ],
            tip: 'The past tense of catch is caught (catched ✗).',
          },
        },
        {
          questionNo: '18',
          format: 'editing',
          marks: 1,
          stem: 'One fine school day, Walt [hurryed] into class and showed everyone his new pet.',
          answer: 'hurried',
          solution: {
            method: 'Apply the rule for adding -ed to hurry (y→i).',
            steps: [
              'Wrong spelling: hurryed.',
              'For a verb ending in consonant + y, change y to i before adding -ed: hurry → hurri + ed.',
              'So the answer is hurried.',
            ],
            tip: 'hurry → hurried, carry → carried: y changes to i + ed.',
          },
        },
        {
          questionNo: '19',
          format: 'editing',
          marks: 1,
          stem: 'One of his classmates saw the little animal and [skreemed].',
          answer: 'screamed',
          solution: {
            method: 'Check the correct spelling of "Screamed".',
            steps: [
              'Wrong spelling: skreemed.',
              'The correct word is scream — it starts with sc and is spelt with ea.',
              'The past tense is screamed.',
            ],
            tip: 'scream is spelt "sc-ream", with sc and ea (not sk or ee).',
          },
        },
        {
          questionNo: '20',
          format: 'editing',
          marks: 1,
          stem: 'Walt was not upset. He was [pleesed] to get all the attention with his pet mouse for a day.',
          answer: 'pleased',
          solution: {
            method: 'Check the correct spelling of "Was happy / Rejoiced".',
            steps: [
              'Wrong spelling: pleesed.',
              'The correct word is please — spelt with ea (plea-se).',
              'The past/adjective form is pleased.',
            ],
            tip: 'please/pleased is spelt "plea-se", with ea (not ee).',
          },
        },
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2024;
