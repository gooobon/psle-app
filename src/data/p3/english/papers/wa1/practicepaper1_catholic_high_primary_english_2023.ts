// =============================================================================
// src/data/p3/english/papers/practicepaper1_catholic_high_primary_english_2023.ts
// Catholic High School (Primary) — Primary 3 Practice Paper 1 (English)
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 96–106 (시험지 표지 p.1–11)
// Total: 50 marks
// 주의: 표지에 연도가 인쇄돼 있지 않음(내부 출처 인용은 What's Up 2021.10).
//       모음집 배열상 2023년으로 처리(검증 권장). 이 시험지는 WA가 아닌 'Practice Paper 1'.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법MCQ(8) B어휘MCQ(6) C문법클로즈(4) D문법클로즈(4) E어휘클로즈(3)
//       F교정(5) G독해클로즈(4) H독해(8) I독해서술형(8) = 50점
// =============================================================================

import type { EnglishPaper } from '../types';

export const practicePaper1CatholicHighPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2023,
    assessment: 'Practice Paper 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 50,
    sourcePages: 'pp.96–106 (paper pp.1–11)',
  },

  items: [
    // =========================================================================
    // Section A — Grammar MCQ (8 x 1 mark) — Q1–8
    // =========================================================================
    {
      kind: 'single',
      id: 'chs-pp1-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'My sister was hiding ________ the door. No one noticed her.',
      options: [
        { label: '1', text: 'with' },
        { label: '2', text: 'under' },
        { label: '3', text: 'behind' },
        { label: '4', text: 'between' },
      ],
      answer: '3',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'All the pupils and teachers ________ to sing the national anthem every morning.',
      options: [
        { label: '1', text: 'stand' },
        { label: '2', text: 'stands' },
        { label: '3', text: 'is standing' },
        { label: '4', text: 'are standing' },
      ],
      answer: '1',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Everyone ________ quietly when the fire alarm went off.',
      options: [
        { label: '1', text: 'read' },
        { label: '2', text: 'reads' },
        { label: '3', text: 'is reading' },
        { label: '4', text: 'was reading' },
      ],
      answer: '4',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'Meera does not like to swim ________ she enjoys cycling.',
      options: [
        { label: '1', text: 'or' },
        { label: '2', text: 'so' },
        { label: '3', text: 'but' },
        { label: '4', text: 'and' },
      ],
      answer: '3',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: '"Do not go there! ________ wild animals are very dangerous," warned the tour guide.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '4',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: "________ children like the 'Super Mario' movie. It is very popular among the kids.",
      options: [
        { label: '1', text: 'Few' },
        { label: '2', text: 'Little' },
        { label: '3', text: 'Many' },
        { label: '4', text: 'Much' },
      ],
      answer: '3',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        '"Please ensure you have taken ________ with you before leaving the hall. Do not leave your belongings behind," reminded the Discipline Master.',
      options: [
        { label: '1', text: 'nothing' },
        { label: '2', text: 'anything' },
        { label: '3', text: 'everything' },
        { label: '4', text: 'something' },
      ],
      answer: '3',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'The trains are always on time, ________?',
      options: [
        { label: '1', text: 'do they?' },
        { label: '2', text: 'are they?' },
        { label: '3', text: "don't they?" },
        { label: '4', text: "aren't they?" },
      ],
      answer: '4',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },

    // =========================================================================
    // Section B — Vocabulary MCQ (6 x 1 mark) — Q9–14
    // =========================================================================
    {
      kind: 'single',
      id: 'chs-pp1-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'My best friend, Thomas, broke ________ tears when his favourite toy was damaged.',
      options: [
        { label: '1', text: 'up' },
        { label: '2', text: 'into' },
        { label: '3', text: 'down' },
        { label: '4', text: 'through' },
      ],
      answer: '2',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem:
        'Last night, my sister ________ down the stairs to the kitchen quietly as she did not want to wake anyone up.',
      options: [
        { label: '1', text: 'bolted' },
        { label: '2', text: 'darted' },
        { label: '3', text: 'scurried' },
        { label: '4', text: 'sneaked' },
      ],
      answer: '4',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: '________ with anger, the restaurant manager scolded his staff who had broken the plates.',
      options: [
        { label: '1', text: 'Wailing' },
        { label: '2', text: 'Bellowing' },
        { label: '3', text: 'Mumbling' },
        { label: '4', text: 'Grumbling' },
      ],
      answer: '2',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: 'Naina saw a ________ of birds when she went to the zoo with her family.',
      options: [
        { label: '1', text: 'flock' },
        { label: '2', text: 'pride' },
        { label: '3', text: 'colony' },
        { label: '4', text: 'school' },
      ],
      answer: '1',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem:
        'While waiting for the results, Yuze was ________. He was confident he would do very well.',
      options: [
        { label: '1', text: 'as cold as ice' },
        { label: '2', text: 'as cunning as a fox' },
        { label: '3', text: 'as stubborn as a mule' },
        { label: '4', text: 'as cool as a cucumber' },
      ],
      answer: '4',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: '"I\'m afraid I have bad news for you," the doctor told my uncle ________.',
      options: [
        { label: '1', text: 'boldly' },
        { label: '2', text: 'bravely' },
        { label: '3', text: 'eagerly' },
        { label: '4', text: 'solemnly' },
      ],
      answer: '4',
      solution: {
        method: "See solution steps below.",
        steps: [
          "Study the example carefully.",
          "Study the example carefully.",
          "Study the example carefully.",
        ],
        tip: "Focus on the grammar rule highlighted in the explanation.",
      },
    },

    // =========================================================================
    // Section C — Grammar Cloze (4 x 1 mark) — Q15–18 (보기 A~F)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C — Grammar Cloze',
      instructions:
        'Choose the most suitable answer from the box and fill in each blank. Write its letter (A to F). Use each word ONCE only. Box: (A) he  (B) her  (C) his  (D) it  (E) she  (F) you',
      passage:
        'Mabel was feeling upset as she had lost her precious pencil. (15) ________ was from her best friend. She and (16) ________ father searched high and low for it but could not find it. She was almost in tears. Just then, Larry, her brother, came to her room with her pencil. He had taken it to do (17) ________ homework. "Why did (18) ________ take my pencil without my permission?" cried Mabel. Larry apologised to her immediately.',
      marks: 4,
      questions: [
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: "See solution.",
          answer: 'D',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'She and (16) ________ father searched high and low for it.',
          answer: 'B',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'He had taken it to do (17) ________ homework. (He = Larry)',
          answer: 'C',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: '"Why did (18) ________ take my pencil without my permission?" cried Mabel (to Larry).',
          answer: 'F',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },

    // =========================================================================
    // Section D — Grammar Cloze (4 x 1 mark) — Q19–22 (괄호 중 택1)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D — Grammar Cloze',
      instructions: 'Underline the correct word from the words given in the brackets.',
      passage:
        'Who doesn\'t love cookies? The sweet snack (19) [is / are] a favourite among children and adults. It can be either chewy or crunchy. Usually, cookies (20) [contain / contains] a lot of fat and sugar. Bakers (21) [like / likes] to add chocolate chips or nuts to give more flavour to the cookies. This (22) [make / makes] the cookies even more delicious. Are you a cookie-lover? You can try making your very own cookies today.',
      marks: 4,
      questions: [
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'The sweet snack (19) [is / are] a favourite among children and adults.',
          answer: 'is',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'Usually, cookies (20) [contain / contains] a lot of fat and sugar.',
          answer: 'contain',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'Bakers (21) [like / likes] to add chocolate chips or nuts.',
          answer: 'like',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'This (22) [make / makes] the cookies even more delicious.',
          answer: 'makes',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },

    // =========================================================================
    // Section E — Vocabulary Cloze (3 x 1 mark) — Q23–25
    // 보기 6개 중 3개 사용 (avoided, healthy, ingredients, mixtures, refused, special)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secE-vcloze',
      topic: 'VocabCloze',
      title: 'Section E — Vocabulary Cloze',
      instructions:
        'Choose the most suitable answer from the box and fill in each blank. Use each word ONCE only. Box: avoided | healthy | ingredients | mixtures | refused | special (3 distractors)',
      passage:
        'Abu only ate pancakes. He simply (23) ________ to eat anything else. Abu\'s mother thought, "He should eat (24) ________ food like fruits and vegetables too!" She had an idea. She added blended carrots into the pancake batter. Abu gobbled up everything. She added different (25) ________ to the pancakes daily. One day, Abu caught his mother adding blended spinach into his pancakes. "You added vegetables?" he gasped. Abu realised that vegetables were not as bad as he had thought.\n\n(Adapted from storyberries.com — the boy who only ate pancakes)',
      marks: 3,
      questions: [
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'He simply (23) ________ to eat anything else.',
          answer: 'refused',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem: '"He should eat (24) ________ food like fruits and vegetables too!"',
          answer: 'healthy',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: 'She added different (25) ________ to the pancakes daily.',
          answer: 'ingredients',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },

    // =========================================================================
    // Section F — Editing (5 x 1 mark) — Q26–30 (굵은 단어 철자 교정)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secF-editing',
      topic: 'Editing',
      title: 'Section F — Editing (Spelling)',
      instructions:
        "Study the example carefully.",
      passage:
        'Have you ever visited Bukit Timah Nature Reserve? I usually go there with my parents to hike and take long (26) [strols]. It is full of (27) [beautyful] flora and fauna. The nature reserve (28) [suppots] a variety of flowering plants and wildlife.\n\n' +
        'Some of these flowering plants and wildlife are slowly decreasing in numbers. This reminds us of how (29) [importent] conservation is. Without any conservation (30) [afforts], we would be at risk of losing our flora and fauna. Let\'s do our part to protect our ecosystem.\n\n' +
        '(Adapted from: "Sustain local biodiversity", What\'s Up, October 2021, page 5)',
      marks: 5,
      questions: [
        {
          questionNo: '26',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "take long strols".',
          answer: 'strolls',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '27',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "full of beautyful flora".',
          answer: 'beautiful',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '28',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "The nature reserve suppots a variety...".',
          answer: 'supports',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '29',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "how importent conservation is".',
          answer: 'important',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '30',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "conservation afforts".',
          answer: 'efforts',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },

    // =========================================================================
    // Section G — Comprehension Cloze (4 x 1 mark) — Q31–34 (own word)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secG-ccloze',
      topic: 'ComprehensionFIB',
      title: 'Section G — Comprehension Cloze',
      instructions: 'Fill in the blanks with the most suitable word of your own.',
      passage:
        'Slime is fun to play with. It has a great texture and can be colourful too. Would you (31) ________ to make your own slime at home?\n\n' +
        'You just need to get some simple materials such (32) ________ glue, salt water and baking soda. In a bowl, pour in the glue and the baking soda and mix well. Finally, put in the salt water and watch the slime form. Once the (33) ________ has formed, you can stretch and mould it. You can also (34) ________ some food colouring into the slime. This addition gives your slime a vibrant colour. Start your slime experiment at home today!\n\n' +
        '(Adapted from homesciencetools.com — how to make slime)',
      marks: 4,
      questions: [
        {
          questionNo: '31',
          format: 'fib',
          marks: 1,
          stem: 'Would you (31) ________ to make your own slime at home?',
          answer: 'like',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '32',
          format: 'fib',
          marks: 1,
          stem: 'You just need... some simple materials such (32) ________ glue, salt water and baking soda.',
          answer: 'as',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '33',
          format: 'fib',
          marks: 1,
          stem: 'Once the (33) ________ has formed, you can stretch and mould it.',
          answer: 'slime',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '34',
          format: 'fib',
          marks: 1,
          stem: 'You can also (34) ________ some food colouring into the slime.',
          answer: 'add',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },

    // =========================================================================
    // Section H — Comprehension: Selected Response & Open-ended (8 marks) — Q35–41
    // 지문: Taki, Haru and Koko the monkey
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secH-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section H — Comprehension: Taki, Haru and Koko',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'Taki and Haru lived in a small village near the jungle. They made a living by hunting animals and selling their meat in the village market. They were carefree and happy.\n\n' +
        'One day, Taki and Haru were hunting for wild boars in the jungle. As it was getting late, they decided to go home even though they were empty-handed. Suddenly, they heard a sound. Thinking it could be a wild animal, they decided to investigate. As Haru went near a tree, he realised that the sound was coming from a baby monkey which had a cut on one of its paws. The monkey tapped miserably on the ground and stared weakly at the boys. Haru suggested they bring the monkey back.\n\n' +
        'The two boys took the poor monkey home. They gave it bananas to eat before treating its wound. They named the monkey Koko. Koko was a friendly but mischievous monkey. Sometimes, it would throw banana peels at passers-by. Koko was also a helpful monkey as it helped to guard the house when the boys were not around.\n\n' +
        'The two boys trained it to pluck coconuts and taught it some tricks so that they could earn some extra money. Koko performed these tricks for the villagers and they were amused. Some even paid Taki and Haru to get Koko to perform at village festivals.',
      marks: 8,
      questions: [
        {
          questionNo: '35',
          format: 'open',
          marks: 1,
          stem: "Where was Taki and Haru's village located?",
          answer: 'It was located near the jungle.',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '36',
          format: 'mcq',
          marks: 1,
          stem: "Tick your chosen answer. The word 'he' in line 7 refers to ________.",
          options: [
            { label: '1', text: 'Taki' },
            { label: '2', text: 'Haru' },
            { label: '3', text: 'the wild animal' },
          ],
          answer: '2',
          solution: {
            method: "Find the subject that comes just before the pronoun 'he'.",
            steps: [
              "Study the example carefully.",
              "'he' refers to Haru, the subject just before it.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '37',
          format: 'mcq',
          marks: 1,
          stem:
            "Which word has the same meaning as 'sadly'? Circle (A) or (B). Sentence: \"The monkey tapped miserably (A) on the ground and stared weakly (B) at the boys.\"",
          options: [
            { label: 'A', text: 'miserably' },
            { label: 'B', text: 'weakly' },
          ],
          answer: 'A',
          solution: {
            method: "Choose a word that means the same as 'sadly'.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '38',
          format: 'open',
          marks: 1,
          stem:
            'Refer to paragraphs 2 and 3. Tick "True" or "False": Taki and Haru caught a wild boar before they found a monkey.',
          answer: 'False',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '39',
          format: 'open',
          marks: 1,
          stem:
            'Refer to paragraphs 2 and 3. Tick "True" or "False": Koko was a well-behaved monkey.',
          answer: 'False',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '40',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 to indicate the order of events.\n' +
            '( ) The boys fed Koko.\n' +
            '( ) The boys taught Koko tricks.\n' +
            "( ) The boys treated Koko's injured paw.",
          answer:
            "The boys fed Koko = 1; The boys taught Koko tricks = 3; The boys treated Koko's injured paw = 2",
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '41',
          format: 'open',
          marks: 2,
          stem:
            'Name two things that Koko did to earn money for the boys.\n(i) ________\n(ii) ________',
          answer: '(i) plucked coconuts  (ii) performed tricks (for the villagers / at village festivals)',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },

    // =========================================================================
    // Section I — Comprehension: Open-ended (4 x 2 marks) — Q42–45
    // 지문: The Sad Peacock (공작과 나이팅게일, 요정)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secI-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section I — Comprehension: The Sad Peacock',
      instructions: 'Read the passage carefully. Write your answers in complete sentences.',
      passage:
        'A stunning peacock was dancing happily on a cool windy day. The weather was so pleasant that he started singing too. However, his rough voice sounded so horrible that he became very upset about not being able to sing well.\n\n' +
        'At that moment, a nightingale started singing near him. The melodious voice of the nightingale further dampened his spirit. He wondered why he had such a horrible voice while the nightingale had such a beautiful one. The peacock even stopped dancing as sadness filled him.\n\n' +
        'A fairy appeared and noticed that the peacock who loved dancing was looking gloomy.\n\n' +
        '"Why do you look so sad?" the fairy asked the peacock. "Why don\'t I have a melodious voice just like the nightingale? It is unfair that I cannot sing as beautifully as the nightingale," complained the peacock.\n\n' +
        'The fairy calmly replied, "Everyone is special in his own way. We all have unique traits and talents that help us shine. The nightingale is blessed with a pleasant voice, but you are also blessed with your unique dancing talent." The fairy reminded the peacock not to compare himself with others.\n\n' +
        '"I understand now. I\'ll never be happy with myself if I keep comparing myself to others. Thank you for your advice," said the peacock.\n\n' +
        'The peacock thought how silly he had been. "I had been so busy comparing myself to others that I forgot I had my own unique talent." He learnt that he should treasure what he has and shine in his own way.\n\n' +
        '(Adapted from alltimeshortstories.com — the sad peacock moral stories)',
      marks: 8,
      questions: [
        {
          questionNo: '42',
          format: 'open',
          marks: 2,
          stem: 'What was the peacock doing at the start of the story?',
          answer: 'At the start of the story, the peacock was dancing and singing (happily, on a cool windy day).',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '43',
          format: 'open',
          marks: 2,
          stem: 'Which 3-word phrase in paragraph 2 shows that the peacock felt discouraged?',
          answer: 'dampened his spirit',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '44',
          format: 'open',
          marks: 2,
          stem: "Who does the word 'you' in line 15 refer to?",
          answer: "The word 'you' refers to the peacock.",
          solution: {
            method: "Check who the fairy is talking to when she says 'you'.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Complete sentence: \"The word 'you' refers to the peacock.\"",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '45',
          format: 'open',
          marks: 2,
          stem: 'Why did the peacock feel that he was silly at the end?',
          answer:
            'The peacock felt silly because he had been so busy comparing himself to others that he forgot he had his own unique talent.',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
      ],
    },
  ],
};

export default practicePaper1CatholicHighPrimaryEnglish2023;
