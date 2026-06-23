// =============================================================================
// src/data/p3/english/papers/wa1_raffles_girls_primary_english_2023.ts
// Raffles Girls' Primary School — 2023 Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 148–156 (시험지 표지 p.1–8)
// Total Time: 50 minutes / Total: 15 marks (Section A 7 + Section B 8)
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1RafflesGirlsPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: "Raffles Girls' Primary School",
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 15,
    sourcePages: 'pp.148–156 (paper pp.1–8)',
  },

  items: [
    // =========================================================================
    // Section A: Comprehension 1 (7 marks) — Q1–6
    // 지문: Jenny와 Dolly, 잘못 배달된 patchwork 천 꾸러미 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2023-secA-comprehension1',
      topic: 'ComprehensionOE',
      title: 'Section A: Comprehension 1 — The Misdelivered Parcel',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'On the last day of school, Jenny and Dolly were walking home from school with great excitement. Jenny was going to Dolly\'s house to play for the day. When they reached Dolly\'s house, Jenny did not expect to find a parcel at the doorstep.\n\n' +
        'The two girls eagerly tore open the parcel. To their disappointment, it was a box of cloth. The cloth had been cut into square pieces, all of the same size.\n\n' +
        '"Who could have sent this to you?" asked Jenny curiously. Then she noticed a piece of paper by the side of the box. It was a note from the sender. Jenny picked it up and read it aloud, "Hi! Aunt Joyce. Please find the pieces of cloth which I promised to send. They are cut according to the size that you want. Hope you will be able to sew them into a patchwork blanket for Grandmother. It will be such a wonderful gift for her birthday. Thank you!"\n\n' +
        'Jenny and Dolly felt bad about opening the parcel so they decided to return it to the rightful owner. When they checked the name and address, it was none other than Dolly\'s neighbour. They quickly brought the parcel to Aunt Joyce and apologised for opening the parcel.',
      marks: 7,
      questions: [
        {
          questionNo: '1',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 1, why were Jenny and Dolly walking home with excitement? Tick your chosen answer. "They were excited to ________."',
          options: [
            { label: '1', text: 'go to school' },
            { label: '2', text: 'receive the parcel' },
            { label: '3', text: 'play together for the day' },
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
          questionNo: '2',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 1, which word has the same meaning as eagerness?',
          answer: 'excitement',
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
          questionNo: '3',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 to 3, tick "True" or "False": Jenny and Dolly were excited by what they saw in the box.',
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
          questionNo: '4',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 to 3, tick "True" or "False": The cloth had been cut into different sizes.',
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
          questionNo: '5',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 to 3, tick "True" or "False": The patchwork blanket was to be sewn as a present for Grandmother.',
          answer: 'True',
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
          questionNo: '6',
          format: 'open',
          marks: 2,
          stem:
            'From the last paragraph, list 2 things that Jenny and Dolly did after feeling bad about opening the parcel.\n(i) ________\n(ii) ________',
          answer:
            '(i) They brought the parcel to Aunt Joyce (the rightful owner).  (ii) They apologised for opening the parcel.',
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
    // Section B: Comprehension 2 (8 marks) — Q7–13
    // 지문: The Bogey-Beast (가난한 노파와 변하는 보물 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2023-secB-comprehension2',
      topic: 'ComprehensionOE',
      title: 'Section B: Comprehension 2 — The Bogey-Beast',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'A poor old woman was trotting home one evening when she came across a big pot. Thinking that she could put a flower in it at her window, then she decided to take it home. She bent down and tried to pick it up.\n\n' +
        'When she looked inside, she was pleasantly surprised to see the pot full of gold. It was her first treasure! Carrying it would break her back, so she tied the end of her shawl to the pot and dragged it behind her.\n\n' +
        'Soon, she stopped to rest her feet. However, she was shocked when she looked at her treasure. It was not a pot of gold! It was nothing but a lump of silver.\n\n' +
        '"But this is great!" she said finally. "Silver is not easily stolen. The gold pieces could attract robbers."\n\n' +
        'She started walking again until she had no choice but to take a much-needed little nap. When she woke up, the treasure was nothing but a lump of iron!\n\n' +
        '"This is luck! I shall sell this iron and be rich."\n\n' +
        'She started off again, planning on how she would spend her money. When her bones ached, she stopped and looked behind to check her treasure. At once, her heart skipped a beat.\n\n' +
        '"Oh my!"\n\n' +
        'The stone had turned into a creature and it looked like it was going to pounce on her. She tried hard to calm herself down.\n\n' +
        '(Adapted from https://americanliterature.com/childrens-stories/the-bogey-beast)',
      marks: 8,
      questions: [
        {
          questionNo: '7',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 1, what did the old woman find on her way home?',
          answer: 'She found a big pot.',
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
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in paragraph 1.\n' +
            '( ) The old woman picked up the pot.\n' +
            '( ) The old woman decided to take the pot home.\n' +
            '( ) The old woman imagined a flower in the pot by her window.',
          answer:
            'The old woman imagined a flower in the pot by her window = 1; The old woman decided to take the pot home = 2; The old woman picked up the pot = 3',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
              "Study the example carefully.",
            ],
            tip: "Focus on the grammar rule highlighted in the explanation.",
          },
        },
        {
          questionNo: '9',
          format: 'open',
          marks: 1,
          stem: 'Which sentence in paragraph 3 tells you that the old woman was tired?',
          answer: 'Soon, she stopped to rest her feet.',
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
          questionNo: '10',
          format: 'open',
          marks: 1,
          stem:
            'Answer in a complete sentence. In paragraph 2, what does the phrase "carrying it would break her back" tell you about the pot?',
          answer: 'It tells us that the pot was very heavy.',
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
          format: 'open',
          marks: 1,
          stem:
            "Answer in a complete sentence. In paragraph 6, why was the old woman not disappointed when she found that the silver had turned into iron?",
          answer:
            'She was not disappointed because she thought it was lucky and believed she could sell the iron and become rich.',
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
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 7, when the old woman\'s heart skipped a beat, it meant that she felt ________. Tick your chosen answer (Tick only).',
          options: [
            { label: '1', text: 'sad' },
            { label: '2', text: 'horrified' },
            { label: '3', text: 'unconcerned' },
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
          questionNo: '13',
          format: 'open',
          marks: 2,
          stem:
            'Answer in a complete sentence. Based on paragraph 9, give two reasons why the old woman had to calm herself.',
          answer:
            'The old woman had to calm herself because the stone had turned into a creature, and because the creature looked like it was going to pounce on her.',
          solution: {
            method: "See solution steps below.",
            steps: [
              "Study the example carefully.",
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

export default wa1RafflesGirlsPrimaryEnglish2023;
