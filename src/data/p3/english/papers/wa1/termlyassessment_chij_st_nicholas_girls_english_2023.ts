// =============================================================================
// src/data/p3/english/papers/termlyassessment_chij_st_nicholas_girls_english_2023.ts
// CHIJ St Nicholas Girls' School (Primary) — Primary 3 Termly Assessment
// English Language, Paper 2 (Booklet A + Booklet B)
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 124–136
//   Booklet A: pp.124–131 (7 printed pages, Q1–18, 18 marks)
//   Booklet B: pp.132–136 (4 printed pages, Q19–27, 10 marks)
// Total Time: 1 hour (Booklets A & B combined) / Total: 28 marks, 27 questions
// 주의: 표지에 연도 없음. 모음집 배열상 2023으로 처리(검증 권장).
// 주의: Q4 보기 (4)가 스캔본에 존재하지 않음(원본 인쇄 누락으로 추정).
//       (1)~(3) 보기만으로도 정답 (3) into가 명확하여 영향 없음.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const termlyAssessmentChijStNicholasGirlsEnglish2023: EnglishPaper = {
  meta: {
    school: "CHIJ St Nicholas Girls' School (Primary)",
    year: 2023,
    assessment: 'Termly Assessment — Paper 2 (Booklet A + B)',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 60,
    totalMarks: 28,
    sourcePages: 'pp.124–136 (Booklet A pp.1–7, Booklet B pp.1–4)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar MCQ (8 x 1 mark) — Q1–8 [Booklet A]
    // =========================================================================
    {
      kind: 'single',
      id: 'chij-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Ali and I are best friends. ________ are classmates too.',
      options: [
        { label: '1', text: 'He' },
        { label: '2', text: 'We' },
        { label: '3', text: 'You' },
        { label: '4', text: 'They' },
      ],
      answer: '2',
      solution: {
        method: '앞 문장의 주어("Ali and I")를 대신하는 대명사를 고른다.',
        steps: [
          '앞 문장: "Ali and I are best friends." — 화자(I)와 Ali 두 사람.',
          '화자 자신을 포함한 복수는 "we"로 받는다.',
          '따라서 "We are classmates too." → 정답 (2) We.',
        ],
        tip: '"Ali and I"처럼 화자 자신이 포함된 복수는 we로 이어받습니다.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Jennifer did not ________ to school last Friday.',
      options: [
        { label: '1', text: 'go' },
        { label: '2', text: 'goes' },
        { label: '3', text: 'gone' },
        { label: '4', text: 'went' },
      ],
      answer: '1',
      solution: {
        method: '조동사 did 뒤에는 동사원형이 온다는 규칙을 적용한다.',
        steps: [
          '부정문 "did not + base form of verb" 구조.',
          'did가 이미 과거시제를 담당하므로 본동사는 원형.',
          '따라서 "did not go" → 정답 (1) go.',
        ],
        tip: 'do/does/did가 있는 문장의 본동사는 항상 동사원형입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'I was caught in the rain ________ I got wet.',
      options: [
        { label: '1', text: 'as' },
        { label: '2', text: 'so' },
        { label: '3', text: 'but' },
        { label: '4', text: 'even though' },
      ],
      answer: '2',
      solution: {
        method: '앞뒤 문장이 원인-결과 관계인지 확인한다.',
        steps: [
          '앞: 비를 맞았다(원인) / 뒤: 젖었다(결과).',
          '원인과 결과를 잇는 접속사는 "so"(그래서).',
          '"but"(그러나)/"even though"(비록 ~이지만)는 대조 관계라 안 맞는다 → 정답 (2) so.',
        ],
        tip: 'We use "so" when the first part is the cause and the second part is the result.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: '"Muthu, please pour the juice ________ the cup carefully," said Mrs Bala.',
      options: [
        { label: '1', text: 'at' },
        { label: '2', text: 'on' },
        { label: '3', text: 'into' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the correct preposition for the action of pouring a drink "into (moving inside)" a cup.',
        steps: [
          'When pouring juice, it must go "into (moving inside)" the cup.',
          '"pour A into B" = to pour A inside B.',
          '"at" (towards something) / "on" (on top of something) do not match the action of pouring a liquid → Answer: (3) into. (Confirmed from official answer key)',
        ],
        tip:
          '"pour into a cup" is a fixed preposition phrase used to describe the action of pouring a liquid. (Note: Option (4) was not printed in the original scanned copy, but Answer (3) into has been confirmed from the official answer key.)',
      },
    },
    {
      kind: 'single',
      id: 'chij-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'My uncle lives ________ Block 56, Mayflower Street.',
      options: [
        { label: '1', text: 'in' },
        { label: '2', text: 'at' },
        { label: '3', text: 'on' },
        { label: '4', text: 'between' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the correct preposition to use in front of a specific building block number or address.',
        steps: [
          '"Block 56, Mayflower Street" is a specific address that includes a block number.',
          'We use "at" in front of a specific address (live at + block number).',
          '"in" is used for large areas like cities or countries, and "on" can be used before street names, but when a block number is included, "at" is more suitable → Answer: (2) at.',
        ],
        tip: 'We usually use "at" in front of an address with a specific block number (live at Block 56...).',
      },
    },
    {
      kind: 'single',
      id: 'chij-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        '"________ flowers are beautiful," said Mother who was holding a bouquet of roses.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'Those' },
        { label: '4', text: 'These' },
      ],
      answer: '4',
      solution: {
        method: 'Look at the number of the noun (singular/plural) and the distance (near/far).',
        steps: [
          '"flowers" is plural → this/that (singular) are not suitable.',
          'Mum is holding the flowers right now → the flowers are nearby.',
          'Plural + near = these → Answer: (4) These.',
        ],
        tip: 'Use \'these\' to point to plural objects that are nearby and held in your hands.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'Mother said, "You ________ brush your teeth or you will have tooth decay."',
      options: [
        { label: '1', text: 'can' },
        { label: '2', text: 'must' },
        { label: '3', text: 'might' },
        { label: '4', text: 'would' },
      ],
      answer: '2',
      solution: {
        method: 'The structure \'~ or result\' means something bad will happen if you don\'t do it — this is a strong obligation or warning.',
        steps: [
          '\'~ or you will have tooth decay\' is a strong warning that means something bad will happen if you don\'t act.',
          'The modal verb that shows strong obligation is \'must\' (meaning you absolutely have to do it).',
          '\'can\' (able to) / \'might\' (maybe) / \'would\' (would do) do not show strong enough obligation — so the answer is (2) must.',
        ],
        tip: 'The structure \'must... or (bad result)\' is used to warn someone that they absolutely have to do something.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'Sam did not do his homework yesterday as he had ________ to bring it home.',
      options: [
        { label: '1', text: 'forget' },
        { label: '2', text: 'forgot' },
        { label: '3', text: 'forgotten' },
        { label: '4', text: 'forgetting' },
      ],
      answer: '3',
      solution: {
        method: '\'had + past participle\' forms the Past Perfect tense.',
        steps: [
          'Because \'had\' comes before the verb, a past participle is needed after it.',
          'The past participle of \'forget\' is \'forgotten\' (forget – forgot – forgotten).',
          '\'had forgotten to bring it home\' means someone forgot to bring it home earlier — so the answer is (3) forgotten.',
        ],
        tip: 'After \'had\', always use the past participle (the third form of the verb).',
      },
    },

    // =========================================================================
    // Section B: Vocabulary MCQ (6 x 1 mark) — Q9–14 [Booklet A]
    // =========================================================================
    {
      kind: 'single',
      id: 'chij-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'Nancy was so hungry that her stomach ________.',
      options: [
        { label: '1', text: 'howled' },
        { label: '2', text: 'tumbled' },
        { label: '3', text: 'rumbled' },
        { label: '4', text: 'whimpered' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the verb that describes the sound your stomach makes when you are very hungry.',
        steps: [
          'When you are very hungry, your stomach makes a low rumbling sound.',
          '\'rumble\' means to make a low, rolling sound — so \'stomach rumbled\' is the correct expression.',
          '\'howled\' (to cry loudly) / \'tumbled\' (to fall and roll) / \'whimpered\' (to make a small crying sound) do not match the stomach — so the answer is (3) rumbled.',
        ],
        tip: '"stomach rumbles" is a fixed verb phrase used to describe the sound made when someone is hungry.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: 'These harmful gases can ________ the air of our country.',
      options: [
        { label: '1', text: 'hurt' },
        { label: '2', text: 'burn' },
        { label: '3', text: 'pollute' },
        { label: '4', text: 'endanger' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the most natural verb that goes with "air" as its object.',
        steps: [
          'The effect of harmful gases on the air → it pollutes the air.',
          '"pollute the air" = to make the air dirty and harmful → the most natural expression.',
          '"hurt" and "endanger" are usually used with living things, and "burn" refers to setting something on fire, so neither fits well with "air" → answer: (3) pollute.',
        ],
        tip: '"pollute" is commonly paired with nouns such as air, water, and environment.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'Father ________ the bunch of keys in his pocket to check if they were there.',
      options: [
        { label: '1', text: 'jiggled' },
        { label: '2', text: 'jabbed' },
        { label: '3', text: 'wiggled' },
        { label: '4', text: 'wrenched' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the verb that describes a light action of checking whether something is inside a pocket.',
        steps: [
          'The action of lightly shaking keys inside a pocket to check by sound or touch.',
          '"jiggle" = to shake lightly → a natural expression used when checking something inside a pocket.',
          '"jab" (to poke sharply) and "wrench" (to twist forcefully) are too strong, and "wiggle" is mainly used for moving a body part such as fingers → answer: (1) jiggled.',
        ],
        tip: '"jiggle keys in a pocket" is a common expression meaning to lightly shake keys inside a pocket to check they are there.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem:
        'The team proved that it was not ________ when it lost the competition to a team that lost last year.',
      options: [
        { label: '1', text: 'fierce' },
        { label: '2', text: 'jealous' },
        { label: '3', text: 'invincible' },
        { label: '4', text: 'frightened' },
      ],
      answer: '3',
      solution: {
        method: 'Think about what quality a "defeat" or "loss" proves about a team.',
        steps: [
          'They lost to the same team they lost to last year → this shows the team is not "unbeatable" or "invincible".',
          '"invincible" = unbeatable; never losing.',
          '"not invincible" (not unbeatable) connects naturally with the fact that they suffered a defeat → answer: (3) invincible.',
        ],
        tip: 'The question asks you to find the quality that the event (here, the defeat) disproves, based on the phrase \'proved that it was not [adjective]\'.',
      },
    },
    {
      kind: 'single',
      id: 'chij-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: '"Speak ________. The baby is sleeping," Mother whispered to me.',
      options: [
        { label: '1', text: 'softly' },
        { label: '2', text: 'wisely' },
        { label: '3', text: 'politely' },
        { label: '4', text: 'properly' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the adverb that fits the way you would speak when a baby is sleeping.',
        steps: [
          '\'The baby is sleeping\' → You should speak quietly so as not to wake the baby.',
          '\'Softly\' means in a quiet or gentle voice → This matches the idea of speaking quietly.',
          '\'Wisely\', \'politely\', and \'properly\' are not related to the volume or loudness of sound → The answer is (1) softly.',
        ],
        tip: 'The second part of the sentence (the baby is sleeping) is the clue that tells you the meaning of the missing adverb (quietly).',
      },
    },
    {
      kind: 'single',
      id: 'chij-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: 'The match has been ________ until tomorrow because of the bad weather.',
      options: [
        { label: '1', text: 'put on' },
        { label: '2', text: 'put off' },
        { label: '3', text: 'put out' },
        { label: '4', text: 'put away' },
      ],
      answer: '2',
      solution: {
        method: 'The question asks you to choose the verb phrase that matches the meaning of \'The match was postponed because of the weather\'.',
        steps: [
          'The match was moved to tomorrow because of bad weather.',
          '\'Put off\' means to delay or postpone → \'has been put off until tomorrow\' fits naturally.',
          '\'Put on\' (to wear / to perform), \'put out\' (to extinguish / to place outside), and \'put away\' (to tidy up) do not carry the meaning of postponement or delay → The answer is (2) put off.',
        ],
        tip: '\'Put off\' is a verb phrase used when a plan or event is moved to a later time.',
      },
    },

    // =========================================================================
    // Section C: Visual Text Comprehension MCQ (4 x 1 mark) — Q15–18 [Booklet A]
    // 광고: Power Lab Clearance Sale
    // =========================================================================
    {
      kind: 'set',
      id: 'chij-secC-visualtext',
      topic: 'VisualText',
      title: 'Section C: Visual Text Comprehension — Power Lab Clearance Sale',
      instructions:
        'Study the advertisement carefully and answer questions 15 to 18. Choose the most suitable answer (1, 2, 3 or 4).',
      passage:
        'POWER LAB CLEARANCE SALE\n' +
        'Date: Friday, 5 June to Sunday, 7 June\n' +
        'Opening Hours: Monday to Thursday – 10 am to 10 pm / Friday to Sunday – 11 am to 10 pm\n\n' +
        'Available only in stores!\n' +
        '- FREE Shopping Vouchers (first 100 customers)\n' +
        '- Bundle Deal! Buy a TV, a refrigerator & a washing machine at only $1,500! (Participating brands: Fony, Nayer & Techno)\n' +
        '- Free parking with purchases above $20\n' +
        '- Up to 70% OFF\n' +
        '- Only on Saturday, 6 June!\n' +
        '  Face Painting — For children below 12 years old\n' +
        '  Photo Booth — Available from 12 pm\n' +
        '  Food & Drinks — While stocks last\n' +
        '  Goodie Bags — First 50 walk-in customers\n\n' +
        'Shop Online @ www.powerlab.com.sg — Buy and pick up on the same day at your nearest store!\n' +
        'Power Lab Outlets:\n' +
        'Central Zone – Zivo Plaza #01-20\n' +
        'South Zone – Olive Point #02-27\n' +
        'North Zone – Mayflower Parade #04-11\n' +
        'West Zone – Westland Mall #03-90',
      marks: 4,
      questions: [
        {
          questionNo: '15',
          format: 'mcq',
          marks: 1,
          stem:
            'If Mr Wee wants to visit a store in the north zone, he should go to the store at ________.',
          options: [
            { label: '1', text: 'Olive Point' },
            { label: '2', text: 'Zivo Plaza' },
            { label: '3', text: 'Westland Mall' },
            { label: '4', text: 'Mayflower Parade' },
          ],
          answer: '4',
          solution: {
            method: 'Find the branch that belongs to the North Zone from the \'Power Lab Outlets\' list in the advertisement.',
            steps: [
              'The list shows: \'North Zone – Mayflower Parade #04-11\'.',
              'The branch that belongs to the North Zone is Mayflower Parade.',
              'Therefore, the answer is (4) Mayflower Parade.',
            ],
            tip: 'For visual aid questions, carefully locate the keyword (here, \'North Zone\') in the table or list and match it to the answer choices.',
          },
        },
        {
          questionNo: '16',
          format: 'mcq',
          marks: 1,
          stem:
            'Mrs Goh may visit any Power Lab store on ________ to enjoy the clearance sale.',
          options: [
            { label: '1', text: '5 June, 10 am' },
            { label: '2', text: '6 June, 10 am' },
            { label: '3', text: '7 June, 11 am' },
            { label: '4', text: '8 June, 11 am' },
          ],
          answer: '3',
          solution: {
            method: 'Find the answer choice that satisfies BOTH the sale period (5–7 June) AND the opening hours (which vary by day).',
            steps: [
              'Sale period: Friday 5 June – Sunday 7 June.',
              'Opening hours: Monday–Thursday 10am–10pm, Friday–Sunday 11am–10pm.',
              '(1) 5 June (Friday) at 10am → Friday opening is 11am → The shop is not open yet.',
              '(2) 6 June (Saturday) at 10am → Saturday opening is also 11am → The shop is not open yet.',
              '(4) 8 June (Monday) at 11am → The sale has already ended (sale ends 7 June).',
              '(3) 7 June (Sunday) at 11am → Within the sale period AND matches Sunday\'s opening time (11am) → Correct answer: (3).',
            ],
            tip: 'Both the date AND the time must be correct to get the right answer. If only one condition is met, it is wrong.',
          },
        },
        {
          questionNo: '17',
          format: 'mcq',
          marks: 1,
          stem:
            'John is 18 years old. If he visits a Power Lab store at 2 pm on 6 June, he can definitely ________.',
          options: [
            { label: '1', text: 'get a goodie bag' },
            { label: '2', text: 'visit a photo booth' },
            { label: '3', text: 'have his face painted' },
            { label: '4', text: 'get free food and drinks' },
          ],
          answer: '2',
          solution: {
            method: 'Look for the option that matches \'definitely\' — meaning it has no conditions or restrictions.',
            steps: [
              'Face Painting: \'below 12 years old\' — John is 18, so he does not qualify.',
              'Goodie Bags: \'first 50 walk-in customers\' — There is no guarantee John will be among the first 50.',
              'Food & Drinks: \'while stocks last\' — Stocks may run out, so it is not guaranteed.',
              'Photo Booth: \'available from 12 pm\' — The only condition is the time, and 2pm is after 12pm, so John can definitely use it → Correct answer: (2).',
            ],
            tip: '\'Definitely\' is a signal to find the option that is certain, with no other restrictions such as age, quantity, or stock limits.',
          },
        },
        {
          questionNo: '18',
          format: 'mcq',
          marks: 1,
          stem: 'Which of the following statements is true?',
          options: [
            { label: '1', text: 'All shoppers will receive free shopping vouchers.' },
            { label: '2', text: 'Online shoppers will be able to enjoy all the deals.' },
            { label: '3', text: 'If Mr Lee makes a purchase of $30, he will enjoy free parking.' },
            { label: '4', text: 'Mrs Bala can buy any television, refrigerator and washing machine at $1,500.' },
          ],
          answer: '3',
          solution: {
            method: 'Compare each option against the conditions stated in the advertisement one by one.',
            steps: [
              '(1) \'All shoppers\' — the free voucher is only for the \'first 100 customers\' → False.',
              '(2) The benefits are stated as \'Available only in stores!\' → Online shoppers cannot enjoy all the benefits → False.',
              '(3) \'Free parking with purchases above $20\' — $30 > $20, so free parking applies → True.',
              '(4) The Bundle Deal is limited to \'Participating brands: Fony, Nayer & Techno\' — \'any\' (any brand) is False.',
              'Therefore, the correct statement is (3).',
            ],
            tip: 'Options with absolute words like \'all\' or \'any\' often conflict with the limitations in the advertisement (such as specific brands or number of people).',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Comprehension [1] (10 marks) — Q19–27 [Booklet B]
    // 지문: Tan Tock Seng
    // =========================================================================
    {
      kind: 'set',
      id: 'chij-secD-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section D: Comprehension — Tan Tock Seng',
      instructions: 'Read the passage carefully and answer questions 19 to 27.',
      passage:
        'Tan Tock Seng was born in a humble family. He was quite poor. However, he was very eager to succeed. Born in Malaysia in 1798, he came to Singapore to find work.\n\n' +
        'As a young man, he was good at doing business. He would buy fresh vegetables and chickens from the countryside, and cycle long distances on his bicycle to sell them in the marketplace in town. He could not afford to take a ride on the rickshaw. Walking, or even running, would take too long. It was a tough life, but he was determined to succeed.\n\n' +
        'Very soon, the hardworking and thrifty man did well enough to buy a shophouse. With time, he also bought land and more shophouses, and rose from rags to riches.\n\n' +
        'Despite his wealth, he cared about the poor and needy. He saw that many workers from China were not fairly treated by the rich people who employed them. He gave generously to the needy and donated money to build a hospital.\n\n' +
        'Since then, Tan Tock Seng Hospital has been providing treatment for people from all walks of life. The poor and needy were appreciative of his help as they did not have to worry about their hospital bills. The hospital provided affordable and basic medical treatment for all. Till today, the hospital remains true to the goals and aspirations of its founder.\n\n' +
        "(Adapted from 'King Chulalongkorn and Other Stories of Respect' by Elizabeth Yeak)",
      marks: 10,
      questions: [
        {
          questionNo: '19',
          format: 'mcq',
          marks: 1,
          stem:
            'Tick your chosen answer. When Tan Tock Seng first came to Singapore, he wanted to ________.',
          options: [
            { label: '1', text: 'find work' },
            { label: '2', text: 'build a hospital' },
            { label: '3', text: 'help the poor and needy' },
          ],
          answer: '1',
          solution: {
            method: 'Look in Paragraph 1 for the reason why he first came to Singapore.',
            steps: [
              'Paragraph 1: \'Born in Malaysia in 1798, he came to Singapore to find work.\'',
              'His reason for coming was to find work.',
              'Building a hospital or helping the poor happened later (after he became wealthy) → The answer is (1) find work.',
            ],
            tip: 'For questions about \'first came\', look for the answer at the very beginning of the story.',
          },
        },
        {
          questionNo: '20',
          format: 'mcq',
          marks: 1,
          stem:
            'Tick your chosen answer. Tan Tock Seng ________ to town to sell vegetables and chickens.',
          options: [
            { label: '1', text: 'ran' },
            { label: '2', text: 'cycled' },
            { label: '3', text: 'walked' },
          ],
          answer: '2',
          solution: {
            method: 'Look in Paragraph 2 for how he travelled to town to sell vegetables and chickens.',
            steps: [
              'Paragraph 2: \'cycle long distances on his bicycle to sell them in the marketplace in town.\'',
              'He cycled (rode his bicycle) to town.',
              'The passage states \'Walking, or even running, would take too long\' → walked/ran are wrong answers → The correct answer is (2) cycled.',
            ],
            tip: 'If a mode of transport is directly mentioned in the passage, use it as the answer.',
          },
        },
        {
          questionNo: '21',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": He was born in a rich family.',
          answer: 'False',
          solution: {
            method: 'Check paragraph 1 to find out about the family background he was born into.',
            steps: [
              'Paragraph 1: \'Tan Tock Seng was born in a humble family. He was quite poor.\'',
              'He was born into a humble and poor family.',
              'Therefore, \'was born into a rich family\' is false → False.',
            ],
            tip: '\'Humble family\' (a simple and poor family) is the opposite of \'rich family\'.',
          },
        },
        {
          questionNo: '22',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick "True" or "False": He was born in China.',
          answer: 'False',
          solution: {
            method: 'Check paragraph 1 to find out where he was born.',
            steps: [
              'Paragraph 1: \'Born in Malaysia in 1798, he came to Singapore to find work.\'',
              'He was born in Malaysia.',
              'Therefore, \'was born in China\' is false → False. (The \'workers from China\' mentioned in the passage refers to other people he helped later on.)',
            ],
            tip: 'Even if a similar word (China) appears elsewhere in the passage, you must find the sentence that directly talks about where he was born.',
          },
        },
        {
          questionNo: '23',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": He bought his goods from the countryside.',
          answer: 'True',
          solution: {
            method: 'Check paragraph 2 to find out where the items were bought.',
            steps: [
              'Paragraph 2: \'He would buy fresh vegetables and chickens from the countryside.\'',
              'He bought vegetables and chickens from the countryside.',
              'The statement matches → True.',
            ],
            tip: 'In the \'buy A from B\' structure, identify B (the place) carefully.',
          },
        },
        {
          questionNo: '24',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": He saved up his money to buy his first shophouse.',
          answer: 'True',
          solution: {
            method: 'Check paragraph 3 for the connection between being hardworking and thrifty, and buying the first shop.',
            steps: [
              'Paragraph 3: \'the hardworking and thrifty man did well enough to buy a shophouse.\'',
              '\'Thrifty\' (spending carefully) implies that he saved up money.',
              'He was hardworking and thrifty, saved up money, and was able to buy a shop → True.',
            ],
            tip: 'Remember that the word \'thrifty\' (spending carefully) is connected to \'saved up money\'.',
          },
        },
        {
          questionNo: '25',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as "inexpensive"? Circle either (A) or (B). Sentence: "The hospital provided affordable (A) and basic (B) medical treatment for all."',
          options: [
            { label: 'A', text: 'affordable' },
            { label: 'B', text: 'basic' },
          ],
          answer: 'A',
          solution: {
            method: 'Choose a word that means the same as \'inexpensive\' (not expensive).',
            steps: [
              '\'Affordable\' means reasonably priced and not too expensive → it has the same meaning as \'inexpensive\'.',
              '\'Basic\' means simple or fundamental → it is not directly related to price.',
              'Therefore, the answer is (A) affordable.',
            ],
            tip: '\'Affordable\' is used in phrases like \'an affordable price\' and is often used as a synonym for \'inexpensive\'.',
          },
        },
        {
          questionNo: '26',
          format: 'open',
          marks: 1,
          stem:
            'These are some statements describing Tan Tock Seng. Put them in the right sequence according to the flow in the story. Write 1, 2, 3 on the lines.\n' +
            '( ) Tan Tock Seng bought land.\n' +
            '( ) Tan Tock Seng built a hospital for the poor.\n' +
            '( ) Tan Tock Seng went to the marketplace to sell goods.',
          answer:
            'Tan Tock Seng went to the marketplace to sell goods = 1; Tan Tock Seng bought land = 2; Tan Tock Seng built a hospital for the poor = 3',
          solution: {
            method: 'Arrange the events by following the order of the paragraphs in the passage (paragraphs 2 → 3 → 4).',
            steps: [
              'Paragraph 2: In his youth, he went to the market to sell vegetables and chickens → Event 1.',
              'Paragraph 3: After saving up money and buying a shop, he \'also bought land and more shops\' (bought land and more shophouses) → Event 2.',
              'Paragraph 4: After becoming rich, he \'donated money to build a hospital\' → Answer is 3.',
            ],
            tip: 'When a passage tells the life story of a person, the order of the paragraphs usually matches the order of events in time.',
          },
        },
        {
          questionNo: '27',
          format: 'open',
          marks: 2,
          stem:
            'According to the passage, tick 2 boxes to best describe how the poor and needy felt after Tan Tock Seng Hospital was built.\nOptions: inspired | relieved | satisfied | thankful',
          answer: 'relieved, thankful',
          solution: {
            method: 'Look for clue words in Paragraph 5 that show how the poor people felt.',
            steps: [
              'Paragraph 5: \'The poor and needy were appreciative of his help as they did not have to worry about their hospital bills.\'',
              '\'appreciative\' means the same as thankful — it shows that someone is grateful.',
              '\'did not have to worry\' means they no longer felt burdened or stressed, which means they felt relieved.',
              'So there are two correct answers: relieved and thankful.',
            ],
            tip: '\'appreciative\' is a synonym for thankful, and \'no longer need to worry\' is the clue word for relieved.',
          },
        },
      ],
    },
  ],
};

export default termlyAssessmentChijStNicholasGirlsEnglish2023;
