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
        method: '"during recess"이라는 의미에 맞는 전치사를 고른다.',
        steps: [
          '"stayed behind ___ recess to clean"(쉬는 시간 동안 남아서 청소함) — 쉬는 시간이라는 기간 동안.',
          '"during"은 특정 기간/시간대 동안을 나타낸다.',
          'on/with/towards는 "during a period of time"이라는 의미와 안 맞는다 → 정답 (3) during.',
        ],
        tip: '"during + noun (a period of time / an event)"는 "while doing something"이라는 뜻입니다(during recess, during the movie).',
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
        method: '"this morning"이 이미 지난 시점인지(과거) 확인한다.',
        steps: [
          '"this morning"은 글을 쓰는 시점이 오늘 오후/저녁이라면 이미 끝난 과거의 일.',
          '완료된 행동(기부함)을 나타내는 단순과거 → made.',
          '따라서 "Joan made a donation this morning" → 정답 (1) made.',
        ],
        tip: '"this morning/this afternoon"은 문맥상 이미 끝난 일이면 단순과거(made)로 씁니다.',
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
        method: '주어의 수("Both Siti and Ali")와 시제("received"=과거)를 본다.',
        steps: [
          '"Both A and B"는 항상 복수 주어.',
          '"when they received"(과거) — 전체 문장이 과거시제.',
          '복수+과거 → were → 정답 (4).',
        ],
        tip: '"Both A and B"는 복수 주어이므로 are/were를 씁니다.',
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
        method: '명사의 수(복수)와 거리(가까움)을 본다.',
        steps: [
          '"books"는 복수 → this/that(단수) 제외.',
          '"Pointing to the books in front of her"(자기 앞에 있는 책들을 가리키며) → 가까운 거리.',
          '복수+가까움 = these → 정답 (3).',
        ],
        tip: '"in front of her"(자기 앞에 있는)는 가까운 거리를 나타내는 단서입니다.',
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
        method: '주어 "Tina and I"(1인칭 복수)에 맞는 재귀대명사를 고른다.',
        steps: [
          '"Tina and I"는 화자 자신을 포함한 복수 주어.',
          '1인칭 복수의 재귀대명사는 "ourselves".',
          '"completed the project by ourselves"(우리끼리/스스로 완성했다) → 정답 (3).',
        ],
        tip: '"A and I"가 주어이면 재귀대명사는 ourselves입니다.',
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
        method: '앞뒤 내용이 대조/양보 관계인지 확인한다.',
        steps: [
          '앞: 대회에 참가하기로 결심함(determined) / 뒤: 몸이 안 좋음(feeling unwell).',
          '몸이 안 좋음에도 "despite / in spite of" 참가를 결심함 → 대조/양보 관계.',
          '"although"(비록 ~이지만)가 양보의 의미를 나타낸다.',
          'so(그래서)/because(왜냐하면)는 원인-결과 관계라 안 맞는다 → 정답 (3) although.',
        ],
        tip: '"although"는 뒤 내용이 앞 내용에 대한 장애물/반대 상황임에도 그렇게 했다는 것을 나타냅니다.',
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
        method: '"definitely"(반드시/확실히)와 어울리는 확신의 조동사를 고른다.',
        steps: [
          '"definitely like it"(분명히 좋아할 것이다) — 강한 확신을 나타내는 미래 예측.',
          '"will definitely"는 확신에 찬 미래 예측을 나타내는 자연스러운 짝.',
          'can/may/could는 가능성·허락을 나타내어 "definitely"(확실함)와 어울림이 약하다 → 정답 (1) will.',
        ],
        tip: '"definitely"는 확신을 나타내는 단어이므로 will과 자주 짝지어집니다.',
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
        method: '"a certificate for [achievement / action]"라는 표현에 맞는 전치사를 고른다.',
        steps: [
          '"a certificate ___ reading the most books"(가장 많은 책을 읽은 것에 대한 상장).',
          '"a certificate for [achievement / action]" = ~에 대한 상장/증명서.',
          'in/of/from은 이 의미와 안 맞는다 → 정답 (3) for.',
        ],
        tip: '"a certificate/award for [achievement]"는 어떤 성취에 대해 주는 상을 나타냅니다.',
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
        method: '"sugar"의 가산 여부와 공손한 권유 표현을 본다.',
        steps: [
          '"sugar"는 셀 수 없는 명사 → a few/many(가산용) 제외.',
          '차에 설탕을 권하는 공손한 표현 "Would you like ~?"에는 적은 양을 나타내는 "a little"이 자연스럽다.',
          '"much"는 보통 부정문/의문문에 쓰이며 권유 표현에는 덜 자연스럽다 → 정답 (4) a little.',
        ],
        tip: '음료에 설탕/우유 등을 권할 때는 "a little"(약간)이 자연스러운 표현입니다.',
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
        method: '부가의문문(tag question)의 시제·긍정/부정 일치 규칙을 적용한다.',
        steps: [
          '본문장 "Adele visits..."는 단순현재 + 긍정문.',
          '부가의문문은 본문장과 시제를 일치시키고, 긍정문이면 부정 형태로 묻는다.',
          '단순현재 부정 조동사는 doesn\'t, 주어는 Adele(3인칭 단수)을 받는 she.',
          '따라서 "doesn\'t she?" → 정답 (4).',
        ],
        tip: '부가의문문: 긍정문 → 부정형 태그 (긍정문 + doesn\'t/isn\'t she 등), 시제는 본문장과 일치시킵니다.',
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
        method: '"after washing hands"에 수도꼭지에 하는 동작을 나타내는 동사구를 고른다.',
        steps: [
          '"as soon as he had washed his hands"(손을 다 씻고 나서) → 물을 더 이상 틀어둘 필요가 없음.',
          '"turn off the tap" = 수도꼭지를 끄다.',
          'turned in(제출하다)/turned on(틀다)/turned down(줄이다, 거절하다)은 손을 씻은 후의 동작과 안 맞는다 → 정답 (3) turned off.',
        ],
        tip: '"had washed"(이미 다 씻음) 다음에는 수도꼭지를 끄는 동작(turn off)이 자연스럽습니다.',
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
        method: '"so much that the curtains were shaking wildly"의 바람을 나타내는 명사를 고른다.',
        steps: [
          '"The curtains flapped about"(커튼이 마구 흔들렸다) → 갑작스럽고 강한 바람.',
          '"a gust of wind" = 한차례의 강한 바람(돌풍) → 강하게 흔들리는 모습과 일치.',
          'puff(작은 한 번의 입김)/flurry(눈발이 흩날리는 모습)/breeze(약한 바람)는 "shaking wildly"에 비해 약하다 → 정답 (2) gust.',
        ],
        tip: '"gust of wind"는 갑작스럽고 강한 한차례의 바람을 나타냅니다.',
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
        method: '코미디언의 농담에 대한 관객의 반응(웃음)을 나타내는 동사를 고른다.',
        steps: [
          '"had fun"(즐거워했다)와 "jokes"(농담들)에 어울리는 큰 웃음.',
          '"guffawed" = 큰 소리로 웃었다(폭소) → 즐거운 분위기와 정확히 일치.',
          'cackled(꺅꺅 웃음, 보통 마녀 같은 느낌)/squealed(꺅 소리를 지름)/snickered(킥킥거리며 비웃음, 부정적)는 즐거운 관객 반응과 덜 맞는다 → 정답 (2) guffawed.',
        ],
        tip: '"guffaw"는 즐거운 농담에 큰 소리로 웃는 것을 나타냅니다.',
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
        method: '"trembled with fear"는 결과와 어울리는 감정 형용사를 고른다.',
        steps: [
          '"trembled with fear"(두려움에 떨었다) → 깜짝 놀라고 불안한 감정.',
          '"alarmed" = 놀란/불안한(위험을 느낌) → fear와 직접 연결.',
          'irritated(짜증난)/ashamed(부끄러운)/embarrassed(당황한, 민망함)는 "fear"과는 다른 감정 → 정답 (2) alarmed.',
        ],
        tip: '"trembled with fear"는 alarmed(놀라서 불안해진)와 자연스럽게 짝을 이룹니다.',
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
        method: '"but"으로 대조되는, "not nervous"을 나타내는 직유를 고른다.',
        steps: [
          '"All of us were nervous ... but Rachel was ___" — Rachel은 모두와 달리 긴장하지 않았다.',
          '"as cool as a cucumber" = 매우 차분하고 침착한 → "nervous"와 정반대.',
          '"as jumpy as a cat"(겁이 많고 불안한)은 오히려 nervous와 비슷한 의미라 대조에 안 맞고, "as cold as ice"(차가운 성격)/"as meek as a mouse"(온순한)는 "not nervous"을 직접 나타내지 않는다 → 정답 (4).',
        ],
        tip: '"as cool as a cucumber"는 긴장된 상황에서도 매우 침착함을 나타내는 정해진 직유입니다.',
      },
    },

    // =========================================================================
    // Section C: Editing for Spelling and Grammar (5 marks) — Q16–20
    // 지문: Kung Fu Panda 영화 소개
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
            method: '"together"라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: togedder.',
              '바른 단어는 together — "to-geth-er"로 th를 사용한다.',
              '따라서 together.',
            ],
            tip: 'together는 "ge-th-er"로, dd가 아닌 th를 씁니다.',
          },
        },
        {
          questionNo: '17',
          format: 'editing',
          marks: 1,
          stem: 'Po the Panda is [serlecterd] to train a new warrior.',
          answer: 'selected',
          solution: {
            method: '"to be chosen/selected"라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: serlecterd.',
              '바른 단어는 select — se-lect, 과거분사형은 selected.',
              '따라서 selected.',
            ],
            tip: 'select는 "se-lect"로 씁니다(serlect ✗).',
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
            method: '지문 전체의 시제(영화 줄거리 소개 = 현재시제)와 일치시킨다.',
            steps: [
              '지문은 영화 줄거리를 현재시제로 소개한다: "Po the Panda is selected...", "He teams up...", "they persevere..."',
              '같은 문장의 "he meets a witch"도 현재시제.',
              '따라서 "became"(과거)은 전체 시제와 어긋남 → 현재형 becomes로 고쳐야 한다.',
            ],
            tip: '영화/책 줄거리를 소개할 때는 보통 현재시제(narrative present)를 일관되게 사용합니다.',
          },
        },
        {
          questionNo: '19',
          format: 'editing',
          marks: 1,
          stem: "He teams up with his friends and they [perservear] to stop the witch's plans.",
          answer: 'persevere',
          solution: {
            method: '"to persevere / to keep trying steadily"는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: perservear.',
              '바른 단어는 persevere — per-se-vere로 v와 e의 순서에 주의.',
              '따라서 persevere.',
            ],
            tip: 'persevere는 "per-se-vere"로 씁니다(perservear ✗).',
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
            method: '"interact"와 짝지어지는 올바른 전치사를 확인한다.',
            steps: [
              '"interact with someone" = ~와 상호작용하다 → 정해진 전치사 짝.',
              '"interact by"는 올바른 표현이 아니다.',
              '따라서 by를 with로 고친다.',
            ],
            tip: '"interact with"는 항상 짝을 이루는 고정 전치사 표현입니다.',
          },
        },
      ],
    },
  ],
};

export default minitest1RulangPrimaryEnglish2024;
