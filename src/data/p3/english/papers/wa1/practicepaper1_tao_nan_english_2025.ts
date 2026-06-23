// =============================================================================
// src/data/p3/english/papers/practicepaper1_tao_nan_english_2025.ts
// Tao Nan School — 2025 Primary 3 English Language Practice #1
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 258–270 (시험지 표지 p.1–13)
// Total: 50 marks (43 questions)
// ★ 공식 정답표(p272) 기준 전문항 확인됨.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(9) B어휘(6) C시각자료(5) D문법클로즈(4) E독해클로즈(4) F통합(4×2) G교정(6) H독해(8) = 50점
// =============================================================================

import type { EnglishPaper } from '../types';

export const practicePaper1TaoNanEnglish2025: EnglishPaper = {
  meta: {
    school: 'Tao Nan School',
    year: 2025,
    assessment: 'Practice Paper 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 50,
    sourcePages: 'pp.258–270 (paper pp.1–13)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (9 x 1m) — Q1–9
    // =========================================================================
    {
      kind: 'single',
      id: 'tn2025-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: '________ left the dirty tray on the table?',
      options: [
        { label: '1', text: 'Who' },
        { label: '2', text: 'What' },
        { label: '3', text: 'Where' },
        { label: '4', text: 'Whose' },
      ],
      answer: '1',
      solution: {
        method: '"The person who left a dirty tray on the table"을 묻는 의문사를 고른다.',
        steps: [
          '"___ left the dirty tray on the table?"에서 빈칸은 행위자(사람)를 묻는다.',
          '"Who"는 사람을 묻는 의문사.',
          'What(무엇)/Where(어디)/Whose(누구의 것)는 사람이 아닌 것을 묻는다 → 정답 (1) Who.',
        ],
        tip: '행위의 주체(사람)를 물을 때는 Who를 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: '________ the concert was cancelled, the organiser refunded us the money.',
      options: [
        { label: '1', text: 'If' },
        { label: '2', text: 'While' },
        { label: '3', text: 'Since' },
        { label: '4', text: 'Unless' },
      ],
      answer: '3',
      solution: {
        method: '"They gave a refund because the concert was cancelled"는 원인-결과 관계의 접속사를 고른다.',
        steps: [
          '"the concert was cancelled"(취소됨) → 그 결과로 환불해줌.',
          '"Since" = ~했기 때문에/~한 이후로 → 원인을 나타낸다.',
          'If(만약)/While(동시에)/Unless(~하지 않는다면)는 원인-결과 관계에 맞지 않는다 → 정답 (3) Since.',
        ],
        tip: '"Since + cause clause, result clause"은 "Because ~ / Since ~"라는 의미입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Mr Smith told his sons that he would be painting the treehouse ________.',
      options: [
        { label: '1', text: 'himself' },
        { label: '2', text: 'yourself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '1',
      solution: {
        method: '주어 "he"(Mr Smith)에 맞는 재귀대명사를 고른다.',
        steps: [
          '"he would be painting ... ___" — Mr Smith 자신이 직접 칠할 것이라는 의미.',
          '3인칭 남성 단수 주어 "he"의 재귀대명사는 "himself".',
          '따라서 정답은 (1) himself.',
        ],
        tip: 'he → himself(직접 하다), she → herself, they → themselves, we → ourselves',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'The library has a large collection of books, including ________ rare editions.',
      options: [
        { label: '1', text: 'few' },
        { label: '2', text: 'little' },
        { label: '3', text: 'many' },
        { label: '4', text: 'much' },
      ],
      answer: '3',
      solution: {
        method: '"books"(가산 복수)에 맞는 수량 형용사를 고른다.',
        steps: [
          '"rare editions"(희귀 판본들)은 가산 복수 명사.',
          '"many" = 많은 (가산 복수 명사와 함께 사용) → 정확히 일치.',
          'little/much는 불가산, few는 가산이나 "Negative numbers"(거의 없는) 의미라 "large collection"과 모순 → 정답 (3) many.',
        ],
        tip: '"many"는 가산 복수 명사와 함께 "Many / A lot of"을 나타냅니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: '________ news article which I am reading now is interesting.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '1',
      solution: {
        method: '"news article"(단수)와 "I am reading now"(지금 읽고 있는, 가까움)를 본다.',
        steps: [
          '"news article"은 단수 → these/those(복수) 제외.',
          '"which I am reading now"(지금 읽고 있는) → 가까이 있는 것.',
          '단수 + 가까움 = This → 정답 (1) This.',
        ],
        tip: '"I am reading now"는 지금 손에 들고 있는 것을 의미 → 가까운 거리 → this.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: "Shanti's sister laid the table as their mother ________ dinner.",
      options: [
        { label: '1', text: 'prepare' },
        { label: '2', text: 'prepares' },
        { label: '3', text: 'is preparing' },
        { label: '4', text: 'was preparing' },
      ],
      answer: '4',
      solution: {
        method: '"laid"(과거)와 동시에 진행 중이었던 동작을 나타낸다.',
        steps: [
          '"Shanti\'s sister laid the table"(과거) — "as"는 동시에 진행 중임을 나타낸다.',
          '"their mother"가 저녁을 준비하는 "Among"이었다 → 과거진행형.',
          '단수 "their mother" → "was preparing" → 정답 (4).',
        ],
        tip: '"As A + Simple Past, B was -ing"는 두 동작이 동시에 진행된 과거의 상황을 나타냅니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'My grandfather collects old coins. Some ________ no longer valuable.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '2',
      solution: {
        method: '주어 "Some"(복수)과 현재시제를 확인한다.',
        steps: [
          '"Some"은 "some of the coins"를 가리키며 복수.',
          '현재 상태를 나타내는 문장 → 현재시제.',
          '복수 + 현재 = are → 정답 (2) are.',
        ],
        tip: '"Some (of the coins) are ~"에서 Some은 복수 취급입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'The participants have started brisk walking, ________ they?',
      options: [
        { label: '1', text: "don't" },
        { label: '2', text: "didn't" },
        { label: '3', text: "hadn't" },
        { label: '4', text: "haven't" },
      ],
      answer: '4',
      solution: {
        method: '"have started"(현재완료)의 부가의문문을 고른다.',
        steps: [
          '"The participants have started ..."는 현재완료 긍정문.',
          '부가의문문은 긍정문 → 부정형, 현재완료의 부정 조동사는 "haven\'t".',
          '주어는 "the participants"(3인칭 복수) → "they" → 정답 (4) haven\'t they?',
        ],
        tip: '현재완료(have/has+pp) 긍정문의 부가의문문은 "Haven't/Hasn't + subject?"입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q9',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'The librarian reminded the boys not to lean ________ the bookshelf.',
      options: [
        { label: '1', text: 'at' },
        { label: '2', text: 'off' },
        { label: '3', text: 'along' },
        { label: '4', text: 'against' },
      ],
      answer: '4',
      solution: {
        method: '"lean against something"(무언가에 기대다)라는 표현을 확인한다.',
        steps: [
          '"lean against something" = ~에 기대다 → 정해진 전치사 표현.',
          'at/off/along은 "lean"과 자연스럽게 짝지어지지 않는다.',
          '따라서 정답은 (4) against.',
        ],
        tip: '"lean against"는 무언가에 기대는 동작을 나타내는 고정 전치사 표현입니다.',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (6 x 1m) — Q10–15
    // =========================================================================
    {
      kind: 'single',
      id: 'tn2025-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: 'Filled with ________, Alvin eagerly touched the Venus Flytrap.',
      options: [
        { label: '1', text: 'curiosity' },
        { label: '2', text: 'gratitude' },
        { label: '3', text: 'patience' },
        { label: '4', text: 'reluctance' },
      ],
      answer: '1',
      solution: {
        method: '"eagerly touched"(열심히/흥미롭게 만졌다)에 어울리는 감정을 고른다.',
        steps: [
          '"eagerly touched the Venus Flytrap" → 식충식물을 만지는 것은 호기심 때문.',
          '"curiosity" = 호기심 → "Filled with curiosity"가 "eagerly"와 자연스럽게 연결.',
          'gratitude(감사)/patience(인내)/reluctance(꺼림)은 이 행동의 동기와 맞지 않는다 → 정답 (1) curiosity.',
        ],
        tip: '"eagerly"(열심히, 간절히)는 흥미와 호기심(curiosity)의 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'Jake rehearsed his speech daily. However, when he was on stage, he ________.',
      options: [
        { label: '1', text: 'cried over spilt milk' },
        { label: '2', text: 'had a whale of a time' },
        { label: '3', text: 'was on top of the world' },
        { label: '4', text: 'had butterflies in his stomach' },
      ],
      answer: '4',
      solution: {
        method: '"however"로 대조되는 것 — 연습했지만 무대에서 다른 결과가 나온 상황을 찾는다.',
        steps: [
          '"rehearsed daily"(매일 연습함) → 하지만 무대에서 기대와 다른 상황 발생.',
          '"had butterflies in his stomach" = 매우 긴장하다/설레다/겁이 나다 → 무대 위에서 긴장한 것.',
          '"cried over spilt milk"(엎질러진 물을 후회)/"had a whale of a time"(즐거운 시간)/"was on top of the world"(매우 행복한)은 "Practised but performed differently on stage" 상황과 안 맞는다 → 정답 (4).',
        ],
        tip: '"have butterflies in one\'s stomach"은 무대/발표 전 극도로 긴장하는 상황을 나타냅니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: 'Zhiyi is ________. She hardly speaks in class.',
      options: [
        { label: '1', text: 'as good as gold' },
        { label: '2', text: 'as sweet as sugar' },
        { label: '3', text: 'as gentle as a dove' },
        { label: '4', text: 'as quiet as a mouse' },
      ],
      answer: '4',
      solution: {
        method: '"Hardly speaks in class"는 행동에 맞는 직유를 고른다.',
        steps: [
          '"She hardly speaks in class"(수업에서 거의 말하지 않는다) → 매우 조용함.',
          '"as quiet as a mouse" = 쥐처럼 조용한 → 정확히 일치.',
          'as good as gold(품행이 좋은)/as sweet as sugar(달콤한)/as gentle as a dove(온화한)는 "Quietness / Being quiet"과 직접 연결되지 않는다 → 정답 (4).',
        ],
        tip: '"as quiet as a mouse"는 "As quiet as a mouse"이라는 뜻의 정해진 직유 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: 'Worried that she would be late for her meeting, my aunt searched ________ for her car keys.',
      options: [
        { label: '1', text: 'keenly' },
        { label: '2', text: 'desperately' },
        { label: '3', text: 'accidentally' },
        { label: '4', text: 'enthusiastically' },
      ],
      answer: '2',
      solution: {
        method: '"Worrying about being late" 열쇠를 찾는 모습에 맞는 부사를 고른다.',
        steps: [
          '"Worried that she would be late"(늦을까봐 걱정함) → 급하고 절박하게 찾는 모습.',
          '"desperately" = 필사적으로/절박하게 → 시간에 쫓기며 찾는 상황과 정확히 일치.',
          'keenly(예리하게)/accidentally(우연히)/enthusiastically(열정적으로)는 "Searching anxiously and desperately" 모습과 덜 맞는다 → 정답 (2) desperately.',
        ],
        tip: '"worried"(걱정스러운)는 "desperately"(필사적으로)와 자연스럽게 연결됩니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: "My cousin's flight was ________ for two hours due to bad weather.",
      options: [
        { label: '1', text: 'kept' },
        { label: '2', text: 'delayed' },
        { label: '3', text: 'interrupted' },
        { label: '4', text: 'postponed' },
      ],
      answer: '2',
      solution: {
        method: '"delayed by 2 hours due to bad weather" 항공편의 상황에 맞는 동사를 고른다.',
        steps: [
          '"for two hours"(2시간 동안) — 일정 시간 동안 출발이 늦춰진 것.',
          '"delayed" = 지연된 → 비행기가 2시간 늦게 출발함 → 정확히 일치.',
          '"postponed"는 더 영구적인 미루기를 의미하고(날을 바꿈), "kept"/"interrupted"는 비행편 지연에 쓰지 않는다 → 정답 (2) delayed.',
        ],
        tip: '"flight was delayed"는 비행기가 예정 시간보다 늦게 출발함을 나타내는 고정 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q15',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 15,
      marks: 1,
      stem: 'Rose believes everything that people say. She is so ________.',
      options: [
        { label: '1', text: 'trusting' },
        { label: '2', text: 'sensible' },
        { label: '3', text: 'obedient' },
        { label: '4', text: 'cooperative' },
      ],
      answer: '1',
      solution: {
        method: '"believes everything everyone says"는 특성에 맞는 형용사를 고른다.',
        steps: [
          '"believes everything that people say"(모든 말을 믿는다) → 지나치게 믿는 성향.',
          '"trusting" = 잘 믿는/신뢰하는 → 이 행동의 성격과 정확히 일치.',
          'sensible(분별력 있는)/obedient(순종적인)/cooperative(협조적인)는 "believes everything" 행동과 직접 연결되지 않는다 → 정답 (1) trusting.',
        ],
        tip: '"trusting"은 타인을 쉽게/과도하게 믿는 성향을 나타냅니다.',
      },
    },

    // =========================================================================
    // Section C: Visual Text Comprehension (5 x 1m) — Q16–20
    // 광고: City Farm Tour (sgExplore, Aquaponics, Cage-free Farming)
    // =========================================================================
    {
      kind: 'set',
      id: 'tn2025-secC-visualtext',
      topic: 'VisualText',
      title: 'Section C: Visual Text — City Farm Tour Advertisement',
      instructions: 'Study the following advertisement and answer questions 16 to 20.',
      passage:
        'JOIN US ON A TOUR AT CITY FARM!\n\n' +
        'Location: 67 Farm Road\n' +
        'Opening Hours: 8.00 a.m. to 6.00 p.m. (Weekends and public holidays only)\n' +
        'Duration of tour: 1 hour\n' +
        'Age group: 3 years old and above\n' +
        'Admission fee: $20 per ticket\n' +
        'Organised by: sgExplore\n' +
        'Scan this QR code to sign up for the tour!\n\n' +
        'FARMING WITH AQUAPONICS\n' +
        'Aquaponics is a technique of growing plants and rearing fish together. Did you know that spinach can be grown using aquaponics?\n' +
        '[Diagram: Clean water → Grow Bed (Vegetables absorb nutrients) → waste water → Pump → back to fish tank. Tilapias eat and produce waste. Feed us at 9 a.m. for free.]\n\n' +
        'CAGE-FREE FARMING\n' +
        'Pet cute chickens! (silkie chicken)\n' +
        'Hens are happier and healthier when they are allowed to roam freely. They can even survive for up to 7 years! The eggs produced are of better quality too!\n\n' +
        'COMPOST STATION — place for turning food scraps into soil\n' +
        'Find out how we turn waste into fertiliser which is then used to nourish papaya trees.\n' +
        '[Image: stag beetles]',
      marks: 5,
      questions: [
        {
          questionNo: '16',
          format: 'mcq',
          marks: 1,
          stem: 'The last tour starts at ________.',
          options: [
            { label: '1', text: '8.00 a.m.' },
            { label: '2', text: '9.00 a.m.' },
            { label: '3', text: '5.00 p.m.' },
            { label: '4', text: '6.00 p.m.' },
          ],
          answer: '3',
          solution: {
            method: '운영 시간(6.00 p.m.까지)과 투어 시간(1시간)으로 마지막 투어 시작 시간을 계산한다.',
            steps: [
              '운영 시간: 8.00 a.m. ~ 6.00 p.m. / 투어 1시간.',
              '6.00 p.m.까지 운영하고 투어 시간이 1시간이므로 마지막 투어는 5.00 p.m.에 시작해야 6.00 p.m.에 끝난다.',
              '따라서 정답은 (3) 5.00 p.m. (공식 정답표 확인됨)',
            ],
            tip: '운영 종료 시각(6pm) - 투어 시간(1h) = 마지막 투어 시작 시각(5pm)',
          },
        },
        {
          questionNo: '17',
          format: 'mcq',
          marks: 1,
          stem:
            'Mrs Tan would like to visit the farm with her family. Which of the following statements is true?',
          options: [
            { label: '1', text: 'She must visit the farm only on weekdays.' },
            { label: '2', text: 'She had to scan the QR code to join a tour.' },
            { label: '3', text: 'She could roam freely on her own at the farm.' },
            { label: '4', text: 'She could take her two-year-old nephew with her on the visit.' },
          ],
          answer: '2',
          solution: {
            method: '각 보기를 광고 내용과 대조한다.',
            steps: [
              '(1) "Weekends and public holidays only" → 주말과 공휴일에만 → 평일 방문 불가 → 거짓(only weekdays라고 하면 거짓).',
              '(2) "Scan this QR code to sign up for the tour!" → 투어 등록을 위해 QR코드를 스캔해야 한다 → 참.',
              '(3) "Duration of tour: 1 hour"라 가이드 투어 형식으로 보이며, "roam freely on her own"은 언급 없음 → 참 여부 불확실하지만 비교적 부정에 가까움.',
              '(4) "Age group: 3 years old and above" → 2살은 해당되지 않음 → 거짓.',
              '따라서 참인 것은 (2). (공식 정답표 확인됨)',
            ],
            tip: 'QR code scanning은 광고에 명시된 투어 등록 방법입니다.',
          },
        },
        {
          questionNo: '18',
          format: 'mcq',
          marks: 1,
          stem: 'In an aquaponics system, clean water is ________.',
          options: [
            { label: '1', text: 'sent to the fish tank' },
            { label: '2', text: 'stored at the grow bed' },
            { label: '3', text: 'absorbed by the plants' },
            { label: '4', text: 'pumped out of the tank' },
          ],
          answer: '1',
          solution: {
            method: '아쿠아포닉스 다이어그램에서 깨끗한 물의 흐름을 확인한다.',
            steps: [
              '다이어그램: "Clean water → Grow Bed" — 깨끗한 물은 Grow Bed(재배 베드)로 간다.',
              '하지만 다이어그램의 전체 흐름: clean water는 물고기 탱크에서 나와 Grow Bed로 간다.',
              '정답표에서 Q18=1로 확인됨: 깨끗한 물은 물고기 탱크로 보내진다(순환 시스템). (공식 정답표 확인됨)',
            ],
            tip: '아쿠아포닉스는 순환 시스템: 물고기 → 폐수 → 식물이 영양분 흡수 → 깨끗한 물 → 다시 물고기에게.',
          },
        },
        {
          questionNo: '19',
          format: 'mcq',
          marks: 1,
          stem: 'You can see ________ in the Compost Station.',
          options: [
            { label: '1', text: 'tilapias' },
            { label: '2', text: 'spinach' },
            { label: '3', text: 'stag beetles' },
            { label: '4', text: 'papaya trees' },
          ],
          answer: '3',
          solution: {
            method: '"Compost Station" 섹션에서 볼 수 있는 것을 확인한다.',
            steps: [
              'Compost Station 섹션의 이미지: "stag beetles"가 나타나 있다.',
              'tilapias(아쿠아포닉스 탱크)/spinach(Grow Bed)/papaya trees(Compost Station이 나무를 영양함)는 Compost Station에서 볼 수 있는 생물이 아니다.',
              '광고 이미지 기준: 정답은 (3) stag beetles. (공식 정답표 확인됨)',
            ],
            tip: '광고 이미지에서 Compost Station 섹션의 그림(stag beetles)을 확인합니다.',
          },
        },
        {
          questionNo: '20',
          format: 'mcq',
          marks: 1,
          stem: 'Based on the advertisement, the main reason for cage-free farming is to ________.',
          options: [
            { label: '1', text: 'collect more eggs' },
            { label: '2', text: 'let visitors pet silkie chickens' },
            { label: '3', text: 'rear happier and healthier chickens' },
            { label: '4', text: 'help the chickens live for up to seven years' },
          ],
          answer: '3',
          solution: {
            method: '"Cage-free Farming" 섹션의 핵심 메시지를 찾는다.',
            steps: [
              '"Hens are happier and healthier when they are allowed to roam freely."',
              '이것이 Cage-free farming의 "main reason"(주된 이유) → 닭들을 더 행복하고 건강하게 키우기 위함.',
              '(1)/(4)는 부수적인 결과일 뿐이고, (2)는 다른 섹션(Pet cute chickens) 관련 → 정답 (3). (공식 정답표 확인됨)',
            ],
            tip: '"main reason"은 섹션의 첫 문장(핵심 주장)에서 찾습니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Grammar Cloze (4 x 1m) — Q21–24
    // 보기: (A) by (B) in (C) their (D) theirs (E) to (F) when (G) where (H) with
    // 지문: Traditional games in Southeast Asia (Sepak Takraw, Chapteh, Gasing, Congkak)
    // =========================================================================
    {
      kind: 'set',
      id: 'tn2025-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D: Grammar Cloze',
      instructions:
        'Read the passage carefully. Choose the correct answer from the words in the box. Write its letter (A to H) in each blank. EACH WORD CAN BE USED ONLY ONCE. Box: (A) by  (B) in  (C) their  (D) theirs  (E) to  (F) when  (G) where  (H) with',
      passage:
        'Traditional games in Southeast Asia are loads of fun! One popular game is Sepak Takraw. (21) ________ players on each side kick a rattan ball over a net, bouncing it off their chests, heads and shoulders. Chapteh challenges players to keep a special shuttlecock made (22) ________ a rubber disc and coloured feathers in the air using their feet. Gasing involves spinning big tops to see who can keep (23) ________ spinning the longest. In a game of Congkak, players compete to place the most marbles (24) ________ the large holes on the ends of the board, known as "storehouses". Which game would you like to try?',
      marks: 4,
      questions: [
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: '(21) ________ players on each side kick a rattan ball over a net...',
          answer: 'G',
          solution: {
            method: '"Sepak Takraw ___ players on each side"에서 구조를 파악한다.',
            steps: [
              'Sepak Takraw에 대한 소개: "___ players on each side kick a rattan ball..."',
              '"where" = 각 편에 ~명의 선수들이 있는 경기를 소개할 때 쓸 수 있으나, 문맥상 "(in this game) players on both sides do ~"는 의미.',
              '보기에서 where은 (G) → 정답 (G). (공식 정답표 확인됨)',
            ],
            tip: '"where players on each side..."는 경기의 설명을 계속하는 관계부사적 표현입니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'Chapteh challenges players to keep a special shuttlecock made (22) ________ a rubber disc and coloured feathers in the air...',
          answer: 'H',
          solution: {
            method: '"made ___ [material]"(~으로 만들어진)에 맞는 전치사를 고른다.',
            steps: [
              '"made with a rubber disc and coloured feathers" — 재료(고무 디스크와 색깔 깃털)를 사용해 만들어진.',
              '"made with"는 여러 재료를 사용해 만들어진 것을 나타낸다(made of는 단일 재료).',
              '보기에서 with는 (H) → 정답 (H). (공식 정답표 확인됨)',
            ],
            tip: '"made with A and B"는 A와 B를 사용해 만들어진 것을 나타냅니다.',
          },
        },
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'Gasing involves spinning big tops to see who can keep (23) ________ spinning the longest.',
          answer: 'D',
          solution: {
            method: '"keep ___ spinning"에서 팽이들을 가리키는 대명사를 고른다.',
            steps: [
              '"spinning big tops ... who can keep ___ spinning the longest" — 팽이들을 가리키는 대명사.',
              '"theirs"는 소유대명사로, 문맥상 각 선수의 팽이(their tops)를 가리킨다.',
              '보기에서 theirs는 (D) → 정답 (D). (공식 정답표 확인됨)',
            ],
            tip: '"keep theirs spinning"에서 theirs는 각 선수의 팽이(their tops)를 가리킵니다.',
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem: 'In a game of Congkak, players compete to place the most marbles (24) ________ the large holes on the ends of the board...',
          answer: 'B',
          solution: {
            method: '"inside the hole" 구슬을 넣는 동작에 맞는 전치사를 고른다.',
            steps: [
              '"place the most marbles ___ the large holes" — 큰 구멍 안에 구슬을 넣다.',
              '"in the holes" = 구멍 안에 → 정확히 일치.',
              '보기에서 in은 (B) → 정답 (B). (남은 A·C·E·F는 사용되지 않음, 공식 정답표 확인됨)',
            ],
            tip: '"place A in B"는 A를 B 안에 넣는 동작입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E: Comprehension Cloze (4 x 1m) — Q25–28
    // 보기: (A) camouflage (B) cheerful (C) disguise (D) memory
    //       (E) personal (F) pretend (G) thought (H) thrilling
    // 지문: Sam이 친구들에게 Dinosaur Park 투어 초대 편지
    // =========================================================================
    {
      kind: 'set',
      id: 'tn2025-secE-ccloze',
      topic: 'VocabCloze',
      title: 'Section E: Comprehension Cloze',
      instructions:
        'Read the passage carefully. Choose the correct word from the words given in the box. Write its letter (A to H) in each blank. EACH WORD CAN BE USED ONLY ONCE. Box: (A) camouflage  (B) cheerful  (C) disguise  (D) memory  (E) personal  (F) pretend  (G) thought  (H) thrilling',
      passage:
        'Hey there, adventurous friend!\n\n' +
        'Imagine a world where dinosaurs roam, and friends set off on exciting adventures! Let\'s (25) ________ to be explorers and uncover hidden treasures at the newly opened Dinosaur Park. With our (26) ________ gear, we\'ll be well-hidden into the wild as we observe the giants. We can also hop on (27) ________ rides and enjoy ourselves as we journey through the theme park. Wearing our explorer uniforms, every journey feels like a match made in heaven. With carefree hearts, we\'ll make each day a pleasant (28) ________. So, are you ready to join me on this interesting mission?\n\n' +
        'Adventure awaits,\nSam',
      marks: 4,
      questions: [
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: "Let's (25) ________ to be explorers and uncover hidden treasures...",
          answer: 'F',
          solution: {
            method: '"Let\'s ___ to be explorers"(탐험가인 척 하자)에 맞는 동사를 고른다.',
            steps: [
              '"Let\'s ___ to be explorers" — 탐험가인 "pretend" 하자는 초대 편지의 상상 놀이.',
              '"pretend to be ~" = ~인 척 하다 → 정확히 일치.',
              '보기에서 pretend는 (F) → 정답 (F). (공식 정답표 확인됨)',
            ],
            tip: '"pretend to be"는 "to pretend to be ~"라는 뜻의 표현입니다.',
          },
        },
        {
          questionNo: '26',
          format: 'fib',
          marks: 1,
          stem: "With our (26) ________ gear, we'll be well-hidden into the wild as we observe the giants.",
          answer: 'A',
          solution: {
            method: '"well-hidden"(잘 숨겨진)이 되게 하는 "gear"를 나타내는 단어를 고른다.',
            steps: [
              '"well-hidden into the wild" → 야생에서 잘 숨겨지게 하는 장비.',
              '"camouflage gear" = 위장 장비(보호색 장비) → "well-hidden"과 정확히 일치.',
              '보기에서 camouflage는 (A) → 정답 (A). (공식 정답표 확인됨)',
            ],
            tip: '"camouflage"는 환경에 맞게 색을 바꾸거나 감추는 위장을 의미합니다.',
          },
        },
        {
          questionNo: '27',
          format: 'fib',
          marks: 1,
          stem: "We can also hop on (27) ________ rides and enjoy ourselves as we journey through the theme park.",
          answer: 'H',
          solution: {
            method: '"hop on"(타다)할 수 있는 놀이공원 놀이기구를 묘사하는 형용사를 고른다.',
            steps: [
              '"hop on ___ rides and enjoy ourselves" — 즐길 수 있는 신나는 놀이기구.',
              '"thrilling" = 짜릿한/흥미진진한 → 놀이공원 rides 묘사에 적합.',
              '보기에서 thrilling는 (H) → 정답 (H). (공식 정답표 확인됨)',
            ],
            tip: '"thrilling rides"는 놀이공원에서 짜릿한 놀이기구를 나타내는 표현입니다.',
          },
        },
        {
          questionNo: '28',
          format: 'fib',
          marks: 1,
          stem: "With carefree hearts, we'll make each day a pleasant (28) ________.",
          answer: 'D',
          solution: {
            method: '"enjoyable ~"을 만들어 간다는 문맥에서 하루의 경험을 나타내는 명사를 고른다.',
            steps: [
              '"we\'ll make each day a pleasant ___" — 즐겁고 편안한 매일을 만들어 간다.',
              '"memory" = 기억/추억 → "a pleasant memory"(즐거운 추억)이 자연스럽다.',
              '보기에서 memory는 (D) → 정답 (D). (남은 B·C·E·G는 사용되지 않음, 공식 정답표 확인됨)',
            ],
            tip: '"make each day a pleasant memory"는 매일을 좋은 추억으로 만든다는 의미입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section F: Synthesis and Transformation (4 x 2m) — Q29–32
    // =========================================================================
    {
      kind: 'single',
      id: 'tn2025-q29',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 29,
      marks: 2,
      stem:
        'Rewrite the given sentence(s) using the word provided. The meaning must be the same.\n' +
        'Mr Ray has to work very hard. He has a family of seven to support.\n' +
        'To ________________________________________\n' +
        '________________________________________',
      answer: 'To support a family of seven, Mr Ray has to work very hard.',
      solution: {
        method: '"To + base verb"(목적)을 앞에 쓰고 나머지를 주절로 연결한다.',
        steps: [
          '"He has a family of seven to support"의 목적(가족을 부양하기 위해)이 앞으로 나온다.',
          '"To support a family of seven"으로 시작.',
          '완성: "To support a family of seven, Mr Ray has to work very hard." (공식 정답표 확인됨)',
        ],
        tip: '"To + base verb, Subject + Verb"는 목적(~하기 위해)을 문장 앞에 두는 변환입니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q30',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 30,
      marks: 2,
      stem:
        'Rewrite the given sentence(s) using the word provided. The meaning must be the same.\n' +
        'Mrs Tan gazed at the special artwork. Mrs Tan wanted to buy the special artwork.\n' +
        '________________________________________ because\n' +
        '________________________________________.',
      answer: 'Mrs Tan gazed at the special artwork because she wanted to buy it.',
      solution: {
        method: '두 문장을 "because"(원인)로 연결하고, 반복 명사는 대명사로 바꾼다.',
        steps: [
          '앞 문장(결과/행동): Mrs Tan gazed at the special artwork.',
          '뒷 문장(이유): she wanted to buy the special artwork → 반복되는 명사는 "it"으로 대체.',
          '"Mrs Tan gazed at the special artwork because she wanted to buy it." (공식 정답표 확인됨)',
        ],
        tip: '"A because B"에서 A가 결과, B가 이유입니다. 반복 명사는 대명사로 바꾸세요.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q31',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 31,
      marks: 2,
      stem:
        'Rewrite the given sentence(s) using the word provided. The meaning must be the same.\n' +
        'The students stood up to greet their principal when she entered the classroom.\n' +
        'As soon as ________________________________________\n' +
        '________________________________________.',
      answer: 'As soon as the principal entered the classroom, the students stood up to greet her.',
      solution: {
        method: '"As soon as" (A가 일어나자마자)로 시작하는 문장으로 변환한다.',
        steps: [
          '"when she entered"를 "As soon as the principal entered"로 변환.',
          '"As soon as"는 문장 앞에 위치하므로 원인 사건을 먼저 쓴다.',
          '"As soon as the principal entered the classroom, the students stood up to greet her." (공식 정답표 확인됨)',
        ],
        tip: '"As soon as A, B" = "As soon as A happened, B happened." "she"는 "the principal"로 명시합니다.',
      },
    },
    {
      kind: 'single',
      id: 'tn2025-q32',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 32,
      marks: 2,
      stem:
        'Rewrite the given sentence(s) using the word provided. The meaning must be the same.\n' +
        'The girl was hungry. The girl ate all the sandwiches on the plate.\n' +
        'Out of ________________________________________\n' +
        '________________________________________.',
      answer: 'Out of hunger, the girl ate all the sandwiches on the plate.',
      solution: {
        method: '"Out of + emotion/state"(~로 인해)로 시작하는 문장으로 변환한다.',
        steps: [
          '"The girl was hungry"(배가 고팠다)를 "out of hunger"(배고픔으로 인해)로 변환.',
          '"Out of hunger"로 시작하고 결과(접시의 모든 샌드위치를 먹었다)를 이어 쓴다.',
          '"Out of hunger, the girl ate all the sandwiches on the plate." (공식 정답표 확인됨)',
        ],
        tip: '"Out of + emotion/state"는 "because of ~ / due to ~"를 의미합니다(out of hunger, out of curiosity 등).',
      },
    },

    // =========================================================================
    // Section G: Spelling and Grammar (6 x 1m) — Q33–38
    // 지문: Lee 가족 바베큐 파티
    // =========================================================================
    {
      kind: 'set',
      id: 'tn2025-secG-editing',
      topic: 'Editing',
      title: 'Section G: Spelling and Grammar',
      instructions:
        'Each of the underlined words contains either a spelling or grammatical error. Write the correct word in each of the boxes.',
      passage:
        'The family gathered in the backyard for a barbecue at sunset. Mr Lee (33) [grill] the burgers while chatting with his daughter, who was showing off her new bicycle.\n\n' +
        'She asked if he could teach her some tricks; (34) [exclaim], "I can\'t wait to learn cool stunts!"\n\n' +
        'Mrs Lee, watching from the porch, worried (35) [by] their safety, called out to them to be careful.\n\n' +
        '"Don\'t worry, we\'ll be fine," (36) [asured] Mr Lee. He smiled at his wife and said, "By the way, I have bought you your favourite (37) [desart] - strawberry pudding!"\n\n' +
        'Mrs Lee laughed. She then said, "Thank you, but I\'ll have to (38) [excecise] later." Their daughter shook her head and parked her bicycle smilingly.',
      marks: 6,
      questions: [
        {
          questionNo: '33',
          format: 'editing',
          marks: 1,
          stem: 'Mr Lee (33) [grill] the burgers while chatting with his daughter...',
          answer: 'grilled',
          solution: {
            method: '"while chatting"(진행 중)이 과거시제를 나타내므로 주절 동사도 과거형으로 맞춘다.',
            steps: [
              '전체 지문이 과거 서술: "gathered"(과거), "was showing off"(과거진행).',
              '"Mr Lee ___ the burgers while chatting" → 과거에 굽고 있었던 것 → 과거형.',
              'grill의 과거형은 grilled. (공식 정답표 확인됨)',
            ],
            tip: '"while chatting"(과거진행)이 포함된 문장의 주절은 과거형으로 씁니다.',
          },
        },
        {
          questionNo: '34',
          format: 'editing',
          marks: 1,
          stem: 'She asked if he could teach her some tricks; (34) [exclaim], "I can\'t wait to learn cool stunts!"',
          answer: 'exclaiming',
          solution: {
            method: '"She asked ... [verb], ..."에서 현재분사로 동시 동작을 나타내야 한다.',
            steps: [
              '"She asked ... [exclaim]"에서 [exclaim]은 말하면서 동시에 일어나는 동작.',
              '분사구문(-ing)으로 써야 한다: exclaiming.',
              '따라서 exclaiming. (공식 정답표 확인됨)',
            ],
            tip: '세미콜론 뒤의 분사구문은 -ing 형태로 씁니다(exclaiming).',
          },
        },
        {
          questionNo: '35',
          format: 'editing',
          marks: 1,
          stem: 'Mrs Lee, watching from the porch, worried (35) [by] their safety, called out to them...',
          answer: 'for',
          solution: {
            method: '"worried ___ their safety"(안전을 걱정했다)의 올바른 전치사를 확인한다.',
            steps: [
              '"worried about/for someone\'s safety" — "worry about/for someone"이 정확한 표현.',
              '"worried for their safety"가 자연스럽다.',
              '"by"는 이 표현에 쓰이지 않는다 → for. (공식 정답표 확인됨)',
            ],
            tip: '"worry for/about someone\'s safety"는 안전을 걱정한다는 표현입니다.',
          },
        },
        {
          questionNo: '36',
          format: 'editing',
          marks: 1,
          stem: '"Don\'t worry, we\'ll be fine," (36) [asured] Mr Lee.',
          answer: 'assured',
          solution: {
            method: '"reassured ~"는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: asured (s가 하나 빠짐).',
              '바른 단어: assured — "as-sur-ed"(s가 두 개).',
              '따라서 assured. (공식 정답표 확인됨)',
            ],
            tip: 'assured는 "as-sur-ed"로, s가 두 개입니다(asured ✗).',
          },
        },
        {
          questionNo: '37',
          format: 'editing',
          marks: 1,
          stem: '"I have bought you your favourite (37) [desart] - strawberry pudding!"',
          answer: 'dessert',
          solution: {
            method: '"dessert"라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: desart.',
              '바른 단어: dessert — "des-sert"(s가 두 개, 끝이 -ert).',
              '따라서 dessert. (공식 정답표 확인됨)',
            ],
            tip: 'dessert(디저트)는 s가 두 개입니다. desert(사막)와 혼동하지 마세요.',
          },
        },
        {
          questionNo: '38',
          format: 'editing',
          marks: 1,
          stem: '"I\'ll have to (38) [excecise] later."',
          answer: 'exercise',
          solution: {
            method: '"to exercise"라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: excecise.',
              '바른 단어: exercise — "ex-er-cise".',
              '따라서 exercise. (공식 정답표 확인됨)',
            ],
            tip: 'exercise는 "ex-er-cise"로 씁니다(excecise ✗).',
          },
        },
      ],
    },

    // =========================================================================
    // Section H: Comprehension Open-Ended (8 marks) — Q39–43
    // 지문: Josh의 Pulau Ubin 조부모님과의 여행
    // =========================================================================
    {
      kind: 'set',
      id: 'tn2025-secH-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section H: Comprehension Open-Ended — An Adventure at Pulau Ubin',
      instructions:
        'Read the passage below and answer questions 39 to 43. Your answers must be based on the passage.',
      passage:
        '"Grandma, Grandpa, this is going to be awesome!" Josh exclaimed, his eyes twinkling with excitement as they stepped foot on Pulau Ubin. The air was filled with a sense of adventure, and Josh felt splendid.\n\n' +
        'Hand in hand, they walked into the lush greenery, amazed by the island\'s natural beauty. "Wow, this place is like a paradise!" Josh gasped, taking in the sights and sounds around him. The leaves rustled in the gentle breeze, and colourful birds danced in the trees.\n\n' +
        'Suddenly, a cheeky monkey swung down from the branches and grabbed Josh\'s food! "Oh no, my snacks!" Josh cried out in trepidation, watching helplessly as the animal darted away with his treats.\n\n' +
        'Grandma and Grandpa just chuckled and said, pointing to his bag, "I\'ve plenty more in here."\n\n' +
        'As Josh and his grandparents continued their adventure, they came across a wild boar blocking their path. Josh\'s heart raced, but Grandma and Grandpa held their grandson\'s hand tightly. "Let\'s slowly back away. It means no harm," Grandpa said. Eventually, the creature did trot away.\n\n' +
        'Just before lunchtime, Josh suddenly realised that his backpack was missing! "What do we do now?" he asked, pacing up and down.\n\n' +
        'Grandma patted his shoulder and suggested, "Let\'s retrace our steps and see if we can find it. We\'ll work together and solve this problem, just like we did with the monkey and the boar."\n\n' +
        'With determination and teamwork, the trio scoured the jungle until they found the backpack on a bench. Josh had forgotten to carry it with him when they left that resting spot earlier. Relieved, he hugged his grandparents appreciatively.\n\n' +
        '(Adapted)',
      marks: 8,
      questions: [
        {
          questionNo: '39',
          format: 'open',
          marks: 2,
          stem:
            "Write 'True' or 'False' in the boxes beside each statement.\n" +
            'a) The group was impressed by the natural beauty of the island.\n' +
            'b) The group hired transport to explore Pulau Ubin.',
          answer: 'a) True  b) False',
          solution: {
            method: '2단락(자연의 아름다움)과 1~2단락(교통 방법)을 각각 확인한다.',
            steps: [
              'a) 2단락: "amazed by the island\'s natural beauty." "Wow, this place is like a paradise!" → 자연의 아름다움에 감탄했다 → True.',
              'b) 지문 전체에 교통수단(버스, 자전거 등) 고용 관련 내용 없음. "they walked into the lush greenery"(직접 걸어 들어감) → 교통 고용 없음 → False.',
            ],
            tip: '"hired transport"(교통수단을 빌림)는 지문에서 전혀 언급되지 않습니다.',
          },
        },
        {
          questionNo: '40',
          format: 'open',
          marks: 2,
          stem: 'Write down two things Grandma and Grandpa did once they saw the wild boar.\na) ________\nb) ________',
          answer:
            'a) They held their grandson\'s hand tightly.\nb) They slowly backed away (from the wild boar).',
          solution: {
            method: '5단락에서 야생 멧돼지를 봤을 때 조부모님이 한 행동 두 가지를 찾는다.',
            steps: [
              '5단락: "Grandma and Grandpa held their grandson\'s hand tightly."',
              '"\'Let\'s slowly back away. It means no harm,\' Grandpa said."',
              '두 가지 행동: (a) 손자의 손을 꽉 잡음 / (b) 천천히 물러남.',
            ],
            tip: '"held their hand"와 "slowly back away"가 각각 (a), (b)에 해당합니다.',
          },
        },
        {
          questionNo: '41',
          format: 'mcq',
          marks: 1,
          stem:
            'From lines 17-18, tick (✓) one of the words that best describes how Josh felt.\n' +
            'Options: excited | panic-stricken | embarrassed',
          options: [
            { label: '1', text: 'excited' },
            { label: '2', text: 'panic-stricken' },
            { label: '3', text: 'embarrassed' },
          ],
          answer: '2',
          solution: {
            method: '지문 17-18행에서 배낭 분실 시 Josh의 감정을 확인한다.',
            steps: [
              '해당 행: "Josh suddenly realised that his backpack was missing! \'What do we do now?\' he asked, pacing up and down."',
              '"pacing up and down"(왔다 갔다 초조하게 걸음)은 극도로 불안한/당황한 상태.',
              '"panic-stricken" = 패닉 상태의 → 정확히 일치. (공식 정답표 확인됨)',
            ],
            tip: '"pacing up and down"(왔다 갔다)은 극도의 불안/패닉을 나타내는 행동입니다.',
          },
        },
        {
          questionNo: '42',
          format: 'mcq',
          marks: 1,
          stem:
            "Which word in the sentence below has the same meaning as 'perseverance'? Circle (A) or (B).\n" +
            '"With (A) determination and (B) teamwork, the trio scoured the jungle until they found the backpack on a bench."',
          options: [
            { label: 'A', text: 'determination' },
            { label: 'B', text: 'teamwork' },
          ],
          answer: 'A',
          solution: {
            method: '"perseverance"(끈기/인내)와 같은 뜻의 단어를 고른다.',
            steps: [
              '"perseverance" = 끈기/포기하지 않고 계속하는 자질.',
              '"determination" = 결연함/끝까지 해내려는 의지 → perseverance와 의미가 통한다.',
              '"teamwork"는 협력을 의미 → perseverance와 다르다.',
              '따라서 정답은 (A) determination. (공식 정답표 확인됨)',
            ],
            tip: '"perseverance"(끈기)와 "determination"(결연함)은 둘 다 포기하지 않고 계속하는 의지를 나타냅니다.',
          },
        },
        {
          questionNo: '43',
          format: 'open',
          marks: 2,
          stem: 'Did Josh enjoy his trip to Pulau Ubin? Give a reason. Your answer must be based on the text.',
          answer: 'Yes, he did. Josh enjoyed his trip to Pulau Ubin as the trip was filled with enjoyment (adventure/exciting events, and he was relieved and hugged his grandparents appreciatively at the end).',
          solution: {
            method: '지문 전체에서 Josh가 여행을 즐겼다는 근거를 찾는다.',
            steps: [
              '1단락: "this is going to be awesome!", "Josh felt splendid" → 즐거운 시작.',
              '2단락: "Wow, this place is like a paradise!" → 자연에 감탄.',
              '마지막 단락: "Relieved, he hugged his grandparents appreciatively." → 문제 해결 후 감사하며 마무리.',
              '"Yes, he enjoyed his trip as the trip was filled with enjoyment and adventure." (공식 정답표 확인됨)',
            ],
            tip: '"Did A enjoy B? Yes/No + reason"는 지문에서 감정 표현이 나타난 곳을 근거로 제시합니다.',
          },
        },
      ],
    },
  ],
};

export default practicePaper1TaoNanEnglish2025;
