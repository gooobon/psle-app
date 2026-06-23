// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2023.ts
// Nanyang Primary School — Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 78–85 (시험지 표지 p.1–7)
// Duration: 40 minutes / Total: 20 marks
// 주의: 표지에 연도가 인쇄되어 있지 않음. 모음집 배열 순서상 2023년으로 추정
//       (명시적 'Nanyang 2024' 시험지는 PDF 뒤쪽 p200에 별도 존재). 연도 검증 권장.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.78–85 (paper pp.1–7)',
  },

  items: [
    // =========================================================================
    // (A) Grammar — MCQ Q1–3 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2023-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'John ________ when he watched the sad movie.',
      options: [
        { label: '1', text: 'cry' },
        { label: '2', text: 'cried' },
        { label: '3', text: 'cries' },
        { label: '4', text: 'is crying' },
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
      id: 'ny2023-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'There is not ________ orange juice left as Dad has drunk most of it.',
      options: [
        { label: '1', text: 'little' },
        { label: '2', text: 'some' },
        { label: '3', text: 'much' },
        { label: '4', text: 'many' },
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
      id: 'ny2023-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '"How about sharing your toys with ________ children over there?" the teacher asked.',
      options: [
        { label: '1', text: 'this' },
        { label: '2', text: 'that' },
        { label: '3', text: 'these' },
        { label: '4', text: 'those' },
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
    // (B) Vocabulary — MCQ Q4–6 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2023-q4',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'No one could recognise Barry in ________ as an alien at the party last night.',
      options: [
        { label: '1', text: 'parade' },
        { label: '2', text: 'bluffing' },
        { label: '3', text: 'disguise' },
        { label: '4', text: 'camouflage' },
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
      id: 'ny2023-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem:
        'The large amount of toxic waste emptied into this river ________ the habitat of many creatures living in it.',
      options: [
        { label: '1', text: 'attacked' },
        { label: '2', text: 'wrenched' },
        { label: '3', text: 'destroyed' },
        { label: '4', text: 'obstructed' },
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
      id: 'ny2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: 'The ________ curtains put up in the bedroom gave it a soft and cosy look.',
      options: [
        { label: '1', text: 'waxy' },
        { label: '2', text: 'bulky' },
        { label: '3', text: 'prickly' },
        { label: '4', text: 'velvety' },
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
    // (C) Grammar Cloze — Q7–9 (3 marks)
    // 대명사/소유격 채우기, 보기 A~F 중 택 (each word once only)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2023-secC-cloze',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze',
      instructions:
        'There are 3 blanks, numbered 7 to 9. Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) I  (B) they  (C) we  (D) our  (E) their  (F) you',
      passage:
        '"Teachers\' Day is coming! Shall (7) ________ make a gift for our teacher together?" Timmy asked his classmate, Annie.\n\n' +
        'Annie agreed and they sat down to discuss what gift (8) ________ teacher would like. "I can bake some chocolate cupcakes for her. Timmy, why don\'t (9) ________ make a nice card for her?" Annie suggested. Timmy thought that was a good idea and he started designing the card immediately.',
      marks: 3,
      questions: [
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: '"Shall (7) ________ make a gift for our teacher together?" Timmy asked his classmate, Annie.',
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
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'Annie agreed and they sat down to discuss what gift (8) ________ teacher would like.',
          answer: 'E',
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
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: '"Timmy, why don\'t (9) ________ make a nice card for her?" Annie suggested.',
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
    // (D) Editing for Spelling — Q10–12 (3 marks)
    // 밑줄 친 단어의 철자 오류를 바르게 고치기
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2023-secD-editing',
      topic: 'Editing',
      title: '(D) Editing for Spelling',
      instructions:
        "Study the example carefully.",
      passage:
        'It was Julie\'s birthday! She had been waiting eagerly to see what presents she would (10) [resieve]. Just then, the doorbell rang. Thinking it was a delivery meant for her, she opened the door. She was (11) [petreefyed] by what she saw.\n\n' +
        'It was a huge grizzly bear! Seeing her shocked face, the grizzly bear exclaimed, "Happy birthday, Julie!" She was (12) [suprized] to see her father in the bear costume. It was a memorable birthday for Julie.',
      marks: 3,
      questions: [
        {
          questionNo: '10',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "presents she would resieve."',
          answer: 'receive',
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
          questionNo: '11',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "She was petreefyed by what she saw."',
          answer: 'petrified',
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
          questionNo: '12',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "She was suprized to see her father."',
          answer: 'surprised',
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
    // (E) Comprehension — Q13–19 (8 marks)
    // 지문: The Little Thief in the Pantry (Greywhiskers 생쥐 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2023-secE-comprehension',
      topic: 'ComprehensionOE',
      title: '(E) Comprehension — The Little Thief in the Pantry',
      instructions: 'Read this passage and answer questions 13 to 19.',
      passage:
        '"Mother," said a little mouse, "the people in our house are so kind! They leave such nice things for us in the kitchen!"\n\n' +
        '"People are not as kind as you think. Greywhiskers, remember that you are not allowed to leave our mouse-hole by yourself as it is dangerous," warned Mother Mouse.\n\n' +
        'Greywhiskers nodded his head, but he had other plans. As soon as his mother had curled up for her daily nap, he scampered out of the mouse-hole to the kitchen.\n\n' +
        'He saw a cake on the table. Greywhiskers sniffed the cake, then nibbled on it greedily. The cake was not only fragrant, but also scrumptious! When he got home, he was scolded by his mother for disobeying her. He promised her that he would not do it again.\n\n' +
        'However, the naughty little mouse went to the kitchen again the next day. He saw his favourite cheese and ran forward to get it, but something snapped shut, trapping him. It was a mouse trap! Greywhiskers sobbed in a corner of the trap, wishing he had listened to his mother.\n\n' +
        'Soon, the man who had set the trap came. He saw the little mouse and said to a little girl, "See who ate your cake Ethel! I\'m going to get rid of it."\n\n' +
        'Ethel felt sorry for the mouse. Before the man could do anything, she lifted the lid of the trap, and the little mouse scurried home as quickly as it could.\n\n' +
        '(Adapted from: The Little Thief in the Pantry)',
      marks: 8,
      questions: [
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem:
            'Fill in the blank with a suitable word. Mother Mouse did not want Greywhiskers to leave the mouse-hole by himself as she felt that it was not ________ for him to do so.',
          answer: 'safe',
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
          questionNo: '14',
          format: 'open',
          marks: 1,
          stem:
            'Pick out a four-word phrase from paragraph 3 which shows that Greywhiskers was thinking about disobeying his mother.',
          answer: 'he had other plans',
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
          questionNo: '15',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as "delicious"? Circle either (A) or (B). Sentence: "The cake was not only fragrant (A), but also scrumptious (B)!"',
          options: [
            { label: 'A', text: 'fragrant' },
            { label: 'B', text: 'scrumptious' },
          ],
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
          questionNo: '16',
          format: 'open',
          marks: 2,
          stem:
            'Using information from paragraph 4, complete the sentences to show what each of the two mice did when Mother Mouse discovered that the little mouse had gone to the kitchen by himself.\n' +
            'a) Mother Mouse ________\n' +
            'b) The little mouse ________',
          answer:
            'a) Mother Mouse scolded him (Greywhiskers) for disobeying her.  b) The little mouse promised (her) that he would not do it again.',
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
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks to show what happened first, next, and last in the story.\n' +
            '( ) Mother Mouse slept.\n' +
            '( ) Greywhiskers was caught.\n' +
            '( ) Greywhiskers saw his favourite food in the kitchen.',
          answer:
            'Mother Mouse slept = 1; Greywhiskers was caught = 3; Greywhiskers saw his favourite food in the kitchen = 2',
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
          format: 'mcq',
          marks: 1,
          stem:
            'Tick the word that best describes how the little mouse felt when he was caught by the mouse trap.',
          options: [
            { label: '1', text: 'angry' },
            { label: '2', text: 'regretful' },
            { label: '3', text: 'guilty' },
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
          questionNo: '19',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Ethel was angry with the little mouse for eating her cake.',
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
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2023;
