// =============================================================================
// src/data/p3/english/papers/practicepaper2_catholic_high_primary_english_2023.ts
// Catholic High School (Primary) — Primary 3 Practice Paper 2 (English)
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 108–118 (시험지 표지 p.1–11)
// Total: 50 marks
// 주의: 표지에 연도 없음. Practice Paper 1과 동일 시리즈로 보아 2023으로 처리(사용자 확정).
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법MCQ(8) B어휘MCQ(6) C문법클로즈(4) D문법클로즈(4) E어휘클로즈(3)
//       F교정(5) G독해클로즈(4) H독해(8) I독해서술형(8) = 50점
// =============================================================================

import type { EnglishPaper } from '../types';

export const practicePaper2CatholicHighPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2023,
    assessment: 'Practice Paper 2',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 50,
    sourcePages: 'pp.108–118 (paper pp.1–11)',
  },

  items: [
    // =========================================================================
    // Section A — Grammar MCQ (8 x 1 mark) — Q1–8
    // =========================================================================
    {
      kind: 'single',
      id: 'chs-pp2-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Ali and his sister ________ to school every day.',
      options: [
        { label: '1', text: 'cycle' },
        { label: '2', text: 'cycles' },
        { label: '3', text: 'cycled' },
        { label: '4', text: 'cycling' },
      ],
      answer: '1',
      solution: {
        method: '주어의 수와 "every day"(반복 습관)를 본다.',
        steps: [
          '주어 "Ali and his sister"는 복수.',
          '"every day"는 매일 반복되는 일 → 단순현재.',
          '복수 주어의 단순현재형은 원형 cycle → 정답 (1).',
        ],
        tip: '주어가 and로 연결된 복수면 동사에 -s를 붙이지 않습니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: "Jun Xian ________ a song during the school's upcoming concert this November.",
      options: [
        { label: '1', text: 'sing' },
        { label: '2', text: 'sings' },
        { label: '3', text: 'was singing' },
        { label: '4', text: 'will be singing' },
      ],
      answer: '4',
      solution: {
        method: '"upcoming"(앞으로의)와 "this November"(미래 시점)로 미래시제를 파악한다.',
        steps: [
          '"upcoming concert"(다가오는 콘서트)는 아직 일어나지 않은 미래의 일.',
          '미래의 한 시점에 진행될 일은 미래진행형 "will be -ing"으로 표현.',
          '따라서 "will be singing" → 정답 (4).',
        ],
        tip: '"upcoming", "next", "this(미래 날짜와 함께)"는 미래시제의 신호입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Helen and Hannah share a room. The room is ________.',
      options: [
        { label: '1', text: 'its' },
        { label: '2', text: 'hers' },
        { label: '3', text: 'ours' },
        { label: '4', text: 'theirs' },
      ],
      answer: '4',
      solution: {
        method: '두 사람(Helen, Hannah)이 함께 쓰는 방의 소유를 나타내는 대명사를 고른다.',
        steps: [
          'Helen과 Hannah 두 사람이 방을 함께 쓴다 → 그들의(their) 것.',
          '소유대명사 형태(명사 없이 단독 사용)는 "theirs".',
          '"hers"는 한 사람의 것, "ours"는 화자 포함 → 둘 다 부적합 → 정답 (4) theirs.',
        ],
        tip: '소유대명사: mine/yours/his/hers/its/ours/theirs. 두 사람의 것은 theirs.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem:
        'After taking so much time to complete her art project, Alisha had ________ time left to do other work as it was time for bed.',
      options: [
        { label: '1', text: 'little' },
        { label: '2', text: 'many' },
        { label: '3', text: 'some' },
        { label: '4', text: 'several' },
      ],
      answer: '1',
      solution: {
        method: '"time"의 가산 여부와 문맥(거의 없음)을 본다.',
        steps: [
          '"time"은 셀 수 없는 명사 → many/several(가산용) 제외.',
          '"so much time"을 미술 프로젝트에 써서 잠잘 시간이 되었다 → 남은 시간이 거의 없음.',
          '"little time"(거의 없는 시간)이 가장 적합 → 정답 (1).',
        ],
        tip: 'little=거의 없는(불가산), few=거의 없는(가산). some/many/several은 "있다"는 의미라 문맥과 안 맞습니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: "All the children ________ present for Uncle Lim's 80th birthday celebration last night.",
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '4',
      solution: {
        method: '주어의 수와 시간 표지(last night)로 시제를 정한다.',
        steps: [
          '"last night"는 과거 시점 → be동사는 과거형(was/were).',
          '주어 "All the children"은 복수.',
          '복수 주어의 과거형 be동사는 were → 정답 (4).',
        ],
        tip: '"last night/yesterday" 등 과거 표현이 있으면 was/were로 시제를 맞춥니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'Ken has been learning to play the piano ________ he was four years old. He will be taking his Grade 8 examination soon.',
      options: [
        { label: '1', text: 'if' },
        { label: '2', text: 'so' },
        { label: '3', text: 'from' },
        { label: '4', text: 'since' },
      ],
      answer: '4',
      solution: {
        method: '"has been -ing"(현재완료진행)와 짝을 이루는 시간 접속사를 고른다.',
        steps: [
          '"has been learning"은 과거부터 지금까지 계속됨을 나타내는 현재완료진행형.',
          '이런 문형은 보통 "since + 과거 시점"과 함께 쓰인다.',
          '"since he was four years old"(네 살 때부터) → 정답 (4) since.',
        ],
        tip: '"have/has been -ing ... since ~"는 "~부터 지금까지 계속"이라는 짝꿍 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        '"Look up there! ________ is Sheena\'s father performing a parachute jump for the National Day Parade," exclaimed Nasrin.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '2',
      solution: {
        method: '"동사 is"(단수)와 "Look up there"(멀리 위)를 본다.',
        steps: [
          '뒤의 동사가 "is"(단수) → these/those(복수) 제외.',
          '"Look up there!"(저 위를 봐!)는 멀리 있는 대상 → this(가까움)가 아니라 that.',
          '따라서 정답은 (2) That.',
        ],
        tip: '동사가 is(단수)이면 this/that 중 하나, 동사가 are(복수)이면 these/those 중 하나입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'The car ________ off immediately when the traffic lights turned green.',
      options: [
        { label: '1', text: 'sped' },
        { label: '2', text: 'speed' },
        { label: '3', text: 'speeds' },
        { label: '4', text: 'speeding' },
      ],
      answer: '1',
      solution: {
        method: '"turned green"(과거)과 같은 시제의 동사 형태를 고른다.',
        steps: [
          '"when the traffic lights turned green" — turned은 과거형.',
          '같은 시점의 일이므로 "speed off"도 과거형이어야 한다.',
          'speed의 과거형은 sped (불규칙 동사) → 정답 (1).',
        ],
        tip: 'speed의 과거형은 speeded가 아니라 sped입니다(불규칙 동사 변화 주의).',
      },
    },

    // =========================================================================
    // Section B — Vocabulary MCQ (6 x 1 mark) — Q9–14
    // =========================================================================
    {
      kind: 'single',
      id: 'chs-pp2-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: '"Please ________ your shoes and keep them in the shoe cabinet," Mrs Lim told her guests politely.',
      options: [
        { label: '1', text: 'take on' },
        { label: '2', text: 'take up' },
        { label: '3', text: 'take off' },
        { label: '4', text: 'take down' },
      ],
      answer: '3',
      solution: {
        method: '신발을 벗고 신발장에 넣는다는 의미의 동사 숙어를 고른다.',
        steps: [
          '신발을 벗고 보관하라는 요청 → "take off"(벗다).',
          '"take off your shoes"는 신발을 벗으라는 표준 표현.',
          'take on(맡다)/take up(차지하다, 시작하다)/take down(내리다, 받아적다)은 의미가 다르다 → 정답 (3) take off.',
        ],
        tip: '"take off"는 옷이나 신발을 벗을 때 쓰는 가장 흔한 숙어입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem:
        '"You should ________ your right fist and place it on the left side of your chest while saying the pledge," the teacher reminded the pupils.',
      options: [
        { label: '1', text: 'grab' },
        { label: '2', text: 'slam' },
        { label: '3', text: 'clench' },
        { label: '4', text: 'squeeze' },
      ],
      answer: '3',
      solution: {
        method: '맹세할 때 손을 가슴에 대는 동작(주먹을 꽉 쥐다)을 나타내는 동사를 고른다.',
        steps: [
          '국기에 대한 맹세를 할 때 오른손을 주먹 쥐어 가슴에 댄다.',
          'clench = (주먹·이를) 꽉 쥐다/악물다 → "clench your right fist"가 자연스럽다.',
          'grab(움켜잡다)·slam(세게 닫다)·squeeze(짜다)는 이 동작과 안 맞는다 → 정답 (3) clench.',
        ],
        tip: '"clench a fist"는 주먹을 꽉 쥐는 동작을 나타내는 정해진 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'My father bought a ________ of drawers to organise his study area.',
      options: [
        { label: '1', text: 'pack' },
        { label: '2', text: 'flight' },
        { label: '3', text: 'batch' },
        { label: '4', text: 'chest' },
      ],
      answer: '4',
      solution: {
        method: '"~ of drawers"라는 가구 명칭을 떠올린다.',
        steps: [
          '"a chest of drawers" = 서랍장 (가구를 가리키는 정해진 표현).',
          'pack/flight/batch of drawers는 영어에서 쓰이지 않는다.',
          '따라서 정답은 (4) chest.',
        ],
        tip: '"chest of drawers"는 서랍장을 뜻하는 통째로 외워야 할 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: 'The ________ will be coming tomorrow to repair the burst water pipes.',
      options: [
        { label: '1', text: 'cobbler' },
        { label: '2', text: 'plumber' },
        { label: '3', text: 'electrician' },
        { label: '4', text: 'technician' },
      ],
      answer: '2',
      solution: {
        method: '"수도 파이프(water pipes)"를 고치는 직업을 고른다.',
        steps: [
          '수도/배관 관련 일을 하는 사람은 plumber(배관공).',
          'cobbler(신발 수선공)/electrician(전기 기술자)/technician(일반 기술자)은 파이프와 직접 관련이 적다.',
          '따라서 정답은 (2) plumber.',
        ],
        tip: '직업명 어휘는 "어떤 일을 고치는가"와 연결해 외우면 쉽습니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: 'It was ________ of Mandy to give up her seat to the lady with an injured leg.',
      options: [
        { label: '1', text: 'diligent' },
        { label: '2', text: 'grateful' },
        { label: '3', text: 'responsible' },
        { label: '4', text: 'considerate' },
      ],
      answer: '4',
      solution: {
        method: '다리를 다친 사람에게 자리를 양보한 행동을 나타내는 성격 형용사를 고른다.',
        steps: [
          '자리를 양보한 것은 남을 배려하는 행동.',
          'considerate = 사려 깊은/배려심 있는 → 가장 적합.',
          'diligent(근면한)/grateful(감사하는)/responsible(책임감 있는)은 "배려"와 직접 관련 없다 → 정답 (4) considerate.',
        ],
        tip: '"It was [형용사] of [사람] to ~"는 그 사람의 성격/태도를 평가하는 구문입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp2-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: 'All children are reminded to ________ their seat belts when they travel in school buses.',
      options: [
        { label: '1', text: 'bind' },
        { label: '2', text: 'click' },
        { label: '3', text: 'fasten' },
        { label: '4', text: 'connect' },
      ],
      answer: '3',
      solution: {
        method: '"안전벨트를 ~하다"에 어울리는 동사를 고른다.',
        steps: [
          '안전벨트를 맬 때 쓰는 동사는 "fasten"(매다, 채우다).',
          '"fasten your seat belt"는 항공기·차량 안내에서 흔히 쓰는 표현.',
          'bind(묶다)/click(클릭하다)/connect(연결하다)는 안전벨트와 덜 어울린다 → 정답 (3) fasten.',
        ],
        tip: '"fasten your seat belt"는 안전벨트 착용을 나타내는 표준 표현입니다.',
      },
    },

    // =========================================================================
    // Section C — Grammar Cloze (4 x 1 mark) — Q15–18 (보기 A~F)
    // 지문: Mae Carol Jemison (우주비행사)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C — Grammar Cloze',
      instructions:
        'Choose the most suitable answer from the box and fill in each blank. Write its letter (A to F). Use each word ONCE only. Box: (A) about  (B) among  (C) for  (D) into  (E) of  (F) up',
      passage:
        'Mae Carol Jemison was born in 1956. When she was a child, she dreamt of travelling into space. She grew (15) ________ and became famous (16) ________ making that dream come true.\n\n' +
        'In school, Mae studied hard and did very well in all her subjects. She loved reading, especially (17) ________ the stars and studied how living things move about in space. In 1992, Mae was the first African American female to fly (18) ________ space. Today, she is a successful astronaut.\n\n' +
        '(Adapted from: https://www.education.com/workbooks/independent/)',
      marks: 4,
      questions: [
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'She grew (15) ________ and became famous for making that dream come true.',
          answer: 'F',
          solution: {
            method: '"grow up"(자라다)이라는 동사구를 완성한다.',
            steps: [
              '"grow up" = 자라다, 성장하다.',
              '문맥상 어릴 적 꿈을 가진 뒤 "자라서" 유명해졌다는 의미.',
              '보기에서 up은 (F) → 정답 (F).',
            ],
            tip: '"grow up"은 "자라다"라는 뜻의 자주 쓰이는 동사구입니다.',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: '...and became famous (16) ________ making that dream come true.',
          answer: 'C',
          solution: {
            method: '"famous for ~"(~으로 유명한) 구문을 완성한다.',
            steps: [
              '"famous for + -ing/명사"는 "~으로 유명한"이라는 뜻.',
              '"famous for making that dream come true"가 자연스럽다.',
              '보기에서 for는 (C) → 정답 (C).',
            ],
            tip: '"famous for"는 유명한 이유를 나타낼 때 쓰는 정해진 전치사 표현입니다.',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'She loved reading, especially (17) ________ the stars and studied how living things move about in space.',
          answer: 'A',
          solution: {
            method: '"~에 관한 글을 읽다"라는 표현에 맞는 전치사를 고른다.',
            steps: [
              '"reading about the stars" = 별에 관해 읽다.',
              '"about"은 "~에 관하여"라는 의미의 전치사.',
              '보기에서 about은 (A) → 정답 (A).',
            ],
            tip: '"read/talk/think about something"은 "~에 관하여"라는 의미의 짝꿍 전치사입니다.',
          },
        },
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem:
            'In 1992, Mae was the first African American female to fly (18) ________ space.',
          answer: 'D',
          solution: {
            method: '"우주로 날아가다"는 방향성을 나타내는 전치사를 고른다.',
            steps: [
              '"fly into space" = 우주 안으로(into) 날아가다.',
              '"into"는 안으로 들어가는 움직임을 나타낸다.',
              '보기에서 into는 (D) → 정답 (D). (남은 B·E로도 확인 가능)',
            ],
            tip: '"fly into space"는 우주로 진입하는 동작을 나타내는 표현입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section D — Grammar Cloze (4 x 1 mark) — Q19–22 (괄호 중 택1)
    // 지문: Wombats (웜뱃)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D — Grammar Cloze',
      instructions: 'Underline the correct word from the words given in the brackets.',
      passage:
        'Wombats look like bears but are related to koalas and kangaroos. Like kangaroos, wombats (19) [spend / spends] most of their time grazing. They (20) [use / uses] their rodent-like teeth and strong jaws to grip and tear food such as roots, shoots and even tree bark. The young of a wombat (21) [is / are] called a joey. After birth, it (22) [stay / stays] in the mother\'s pouch for about ten months. The pouch faces backwards to protect the joey from dirt.\n\n' +
        '(Adapted from: https://animals.sandiegozoo.org/animals/wombat)',
      marks: 4,
      questions: [
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'Like kangaroos, wombats (19) [spend / spends] most of their time grazing.',
          answer: 'spend',
          solution: {
            method: '주어 wombats(복수)에 동사를 맞춘다.',
            steps: [
              '주어 "wombats"는 복수.',
              '복수 주어 → 동사 원형 spend.',
              '따라서 "wombats spend" → spend.',
            ],
            tip: '복수 주어의 단순현재형 동사에는 -s를 붙이지 않습니다.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'They (20) [use / uses] their rodent-like teeth and strong jaws to grip and tear food.',
          answer: 'use',
          solution: {
            method: '주어 They(복수)에 동사를 맞춘다.',
            steps: [
              '주어 "They"(= wombats)는 복수.',
              '복수 주어 → 동사 원형 use.',
              '따라서 "They use" → use.',
            ],
            tip: '대명사 They는 항상 복수 취급, 동사에 -s를 붙이지 않습니다.',
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'The young of a wombat (21) [is / are] called a joey.',
          answer: 'is',
          solution: {
            method: '주어의 핵심어(단수/복수)를 정확히 찾는다.',
            steps: [
              '문법적 주어는 "The young of a wombat"인데, "of a wombat"은 수식어.',
              '"a joey"라고 단수로 불린다는 점에서 이 주어 전체는 단수(한 마리의 새끼)로 취급.',
              '단수 → is. 따라서 "The young of a wombat is called a joey."',
            ],
            tip: '"of ~" 수식어구가 붙어도 핵심 의미(여기서는 한 마리)에 따라 단수/복수를 정합니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: "After birth, it (22) [stay / stays] in the mother's pouch for about ten months.",
          answer: 'stays',
          solution: {
            method: '주어 it(단수)에 동사를 맞춘다.',
            steps: [
              '주어 "it"(= the joey)은 단수.',
              '3인칭 단수 현재형 → stays.',
              '따라서 "it stays" → stays.',
            ],
            tip: '주어가 it/he/she(단수)이면 동사에 -s를 붙입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E — Vocabulary Cloze (3 x 1 mark) — Q23–25
    // 지문: The Bundle of Sticks (이솝우화)
    // 보기 6개 중 3개 사용 (powerful, strong, tied, time, turns, untied)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secE-vcloze',
      topic: 'VocabCloze',
      title: 'Section E — Vocabulary Cloze',
      instructions:
        'Choose the most suitable answer from the box and fill in each blank. Use each word ONCE only. Box: powerful | strong | tied | time | turns | untied (3 distractors)',
      passage:
        'There were four brothers who could not get along with one another. One day, after seeing them quarrel violently, Father tied a bundle of sticks and told them to take (23) ________ to break the sticks. One by one, each brother tried very hard, but no one was able to break a single stick.\n\n' +
        'Father then (24) ________ the bundle and gave each son one stick. They broke the sticks easily.\n\n' +
        '"See how (25) ________ the sticks were when they were put together. In the same way, as brothers, all of you should stay united," said Father. The brothers then understood and nodded.\n\n' +
        '"United we stand, divided we fall," said the eldest son.\n\n' +
        '(Adapted from: https://www.shortkidstories.com/story/aesops-fables/#the_bundle_of_sticks)',
      marks: 3,
      questions: [
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'Father... told them to take (23) ________ to break the sticks.',
          answer: 'turns',
          solution: {
            method: '"한 명씩 차례로 시도하다"라는 표현에 맞는 단어를 고른다.',
            steps: [
              '다음 문장: "One by one, each brother tried" — 한 명씩 순서대로 시도했다.',
              '"take turns"(번갈아/차례로 하다)가 이 상황과 맞는다.',
              '따라서 정답은 turns.',
            ],
            tip: '"take turns to do something"은 "차례로 ~하다"라는 뜻의 숙어입니다.',
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem: 'Father then (24) ________ the bundle and gave each son one stick.',
          answer: 'untied',
          solution: {
            method: '묶음을 풀어서 막대를 하나씩 나눠준 동작에 맞는 동사를 고른다.',
            steps: [
              '아버지는 묶음(bundle)을 풀어 각자에게 막대 하나씩 주었다.',
              '"untie"는 "풀다"(tie의 반대) → untied가 맞다.',
              '"tied"(묶었다)는 이미 처음에 한 행동이므로 여기서는 반대 동작 필요 → 정답 untied.',
            ],
            tip: 'tied(묶었다)와 untied(풀었다)는 반대말로, 문맥상 동작 방향을 확인합니다.',
          },
        },
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: '"See how (25) ________ the sticks were when they were put together."',
          answer: 'strong',
          solution: {
            method: '"함께 묶이면 부러지지 않는다"는 성질을 나타내는 형용사를 고른다.',
            steps: [
              '묶음 상태에서는 부러뜨릴 수 없었다 → 강함을 나타냄.',
              '"strong"(강한, 튼튼한)이 막대 다발의 상태를 묘사하기에 적합.',
              '"powerful"은 보통 사람/힘/기계 등에 쓰여 막대를 묘사하기엔 strong이 더 자연스럽다 → 정답 strong.',
            ],
            tip: '사물의 물리적 강도를 표현할 땐 보통 strong을 씁니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section F — Editing (5 x 1 mark) — Q26–30
    // 지문: De Ming의 성적표 이야기
    // 굵은 단어 순서: desappointed(26), arived(27), paniking(28), worryed(29), cairless(30)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secF-editing',
      topic: 'Editing',
      title: 'Section F — Editing (Spelling)',
      instructions:
        'Correct the words in bold for spelling. Write the correct answer in the boxes provided.',
      passage:
        'De Ming was returning home in the bus. He held his report card and stared at his grades. Even though he knew his parents would be (26) [desappointed], he had to show it to them.\n\n' +
        'When he (27) [arived] home, he realised that the report card was not in his bag! He must have left it on the bus! When he was (28) [paniking], his mother came home and saw the (29) [worryed] look on his face. After finding out what had happened, De Ming\'s mother scolded him for being (30) [cairless]. She told him to apologise and explain to his teacher the next day in school.',
      marks: 5,
      questions: [
        {
          questionNo: '26',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "Even though he knew his parents would be desappointed".',
          answer: 'disappointed',
          solution: {
            method: '"실망한"이라는 단어의 첫 음절 철자를 확인한다.',
            steps: [
              '잘못된 철자: desappointed.',
              '바른 단어는 disappointed — 접두사가 de-가 아니라 dis-.',
              '따라서 disappointed.',
            ],
            tip: 'dis-로 시작하는 단어(disappoint, disagree, dislike)를 de-로 잘못 쓰지 않도록 주의하세요.',
          },
        },
        {
          questionNo: '27',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "When he arived home".',
          answer: 'arrived',
          solution: {
            method: '"도착했다"는 단어의 자음 중복을 확인한다.',
            steps: [
              '잘못된 철자: arived.',
              '바른 단어는 arrive — r이 두 개(ar-rive).',
              '과거형은 arrived.',
            ],
            tip: 'arrive는 r을 두 번 씁니다(a-rr-ive).',
          },
        },
        {
          questionNo: '28',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "When he was paniking".',
          answer: 'panicking',
          solution: {
            method: 'panic + -ing 변형 규칙(c 뒤 k 추가)을 적용한다.',
            steps: [
              '잘못된 철자: paniking.',
              'panic처럼 c로 끝나는 동사는 -ing 앞에 k를 추가한다(소리 유지 위해).',
              '바른 형태: panicking.',
            ],
            tip: 'panic, picnic처럼 c로 끝나는 동사는 -ing/-ed 붙일 때 k를 추가합니다(panicking, picnicked).',
          },
        },
        {
          questionNo: '29',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "saw the worryed look on his face".',
          answer: 'worried',
          solution: {
            method: 'worry + -ed 변형 규칙(y→i)을 적용한다.',
            steps: [
              '잘못된 철자: worryed.',
              '자음+y로 끝나는 동사는 -ed 붙일 때 y를 i로 바꾼다: worry → worri + ed.',
              '바른 형태: worried.',
            ],
            tip: 'worry → worried, carry → carried처럼 y→i+ed로 바뀝니다.',
          },
        },
        {
          questionNo: '30',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "scolded him for being cairless".',
          answer: 'careless',
          solution: {
            method: '"care + less" 구조의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: cairless.',
              '바른 단어는 care(돌봄) + less(없는) = careless(부주의한).',
              '따라서 careless.',
            ],
            tip: 'careless = care + less. "cair"가 아니라 "care"로 시작합니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section G — Comprehension Cloze (4 x 1 mark) — Q31–34 (own word)
    // 지문: Peter와 Ahmad, 축구공/No Ball Games 표지판
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secG-ccloze',
      topic: 'ComprehensionFIB',
      title: 'Section G — Comprehension Cloze',
      instructions: 'Fill in the blanks with the most suitable word of your own.',
      passage:
        'Peter and Ahmad wanted to play soccer in the field but it was raining heavily. They decided to play at the void deck. Although they saw the "No Ball Games" sign, they ignored it.\n\n' +
        '(31) ________ playing for about twenty minutes, they saw a policeman approaching. He immediately (32) ________ them from playing. The policeman pointed to the (33) ________ and told them sternly that they were not (34) ________ to play ball games there.\n\n' +
        'Peter and Ahmad felt extremely embarrassed. They apologised profusely to the policeman and promised to follow rules in future.',
      marks: 4,
      questions: [
        {
          questionNo: '31',
          format: 'fib',
          marks: 1,
          stem: '(31) ________ playing for about twenty minutes, they saw a policeman approaching.',
          answer: 'After',
          solution: {
            method: '"~한 지 20분 후" 의미에 맞는 시간 접속사를 넣는다.',
            steps: [
              '20분 동안 놀고 나서 경찰을 보았다는 시간 순서.',
              '"After playing for about twenty minutes"(20분 동안 놀고 난 후) → After.',
              '따라서 빈칸은 After.',
            ],
            tip: '"After + -ing"는 "~한 후에"라는 뜻으로 사건의 순서를 나타냅니다.',
          },
        },
        {
          questionNo: '32',
          format: 'fib',
          marks: 1,
          stem: 'He immediately (32) ________ them from playing.',
          answer: 'stopped',
          solution: {
            method: '"~하는 것을 못하게 하다"는 뜻의 동사를 "~ from -ing" 구조에 넣는다.',
            steps: [
              '경찰이 그들이 노는 것을 막았다.',
              '"stop someone from doing something" = ~가 ~하는 것을 막다.',
              '따라서 빈칸은 stopped. (공식 정답표 확인됨)',
            ],
            tip: '"stop someone from -ing"는 누군가의 행동을 막을 때 쓰는 정해진 표현입니다.',
          },
        },
        {
          questionNo: '33',
          format: 'fib',
          marks: 1,
          stem: 'The policeman pointed to the (33) ________ and told them sternly...',
          answer: 'sign',
          solution: {
            method: '경찰이 가리킨 대상을 1단락에서 찾는다.',
            steps: [
              '1단락: 두 사람은 "No Ball Games" 표지판(sign)을 보고도 무시했다.',
              '경찰이 가리킨 것은 바로 그 표지판.',
              '따라서 빈칸은 sign.',
            ],
            tip: '독해 클로즈는 앞부분에 이미 언급된 명사를 다시 가리킬 때가 많습니다.',
          },
        },
        {
          questionNo: '34',
          format: 'fib',
          marks: 1,
          stem: '...and told them sternly that they were not (34) ________ to play ball games there.',
          answer: 'allowed',
          solution: {
            method: '"~하는 것이 허용되지 않다"는 뜻의 단어를 넣는다.',
            steps: [
              '"No Ball Games" 표지판은 공놀이를 금지한다는 뜻.',
              '"were not allowed to play"(놀도록 허용되지 않았다)가 자연스럽다.',
              '따라서 빈칸은 allowed. (공식 정답표 확인됨)',
            ],
            tip: '"allowed to do something"은 "~하도록 허용되다"라는 뜻입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section H — Comprehension: Selected Response & Open-ended (8 marks) — Q35–42
    // 지문: Sue Lin and Snowy (강아지를 잃은 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secH-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section H — Comprehension: Sue Lin and Snowy',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'Sue Lin was alone in her bedroom. She muttered to herself, "Where are you, Snowy?" Her mother came in and sat beside her. She stroked her head and consoled her. "Don\'t worry, sweetheart. We will find it," Sue Lin\'s mother said.\n\n' +
        'Every day, Snowy would be waiting at the door for Sue Lin to come home from school. It would greet her by wagging its tail. After Sue Lin finished her homework, Snowy would be all ready to play with her. Snowy seemed to know when Sue Lin felt upset. It would simply sit quietly on her lap. Being the only child, Sue Lin had no sibling to keep her company. Snowy was everything to her. Sue Lin loved her pet dog with all her heart.\n\n' +
        'One day, Sue Lin came home and realised Snowy was not there at the door. She felt that something was amiss. She found out from her mother that her grandmother had left the door open when she went out to water the plants along the corridor. Snowy had run out of the house on its own and her grandmother had not noticed that.\n\n' +
        'The family put up notices about the missing dog around the neighbourhood. Sue Lin prayed that Snowy was fine and would return home soon.',
      marks: 8,
      questions: [
        {
          questionNo: '35',
          format: 'open',
          marks: 1,
          stem: 'Where was Sue Lin when her mother approached her?',
          answer: 'Sue Lin was alone in her bedroom.',
          solution: {
            method: '지문 첫 문장에서 Sue Lin의 위치를 찾는다.',
            steps: [
              '1단락: "Sue Lin was alone in her bedroom."',
              '엄마가 들어와 곁에 앉기 전, Sue Lin은 자기 방에 있었다.',
              '완전한 문장: "Sue Lin was alone in her bedroom."',
            ],
            tip: '장소(Where) 질문은 인물이 처음 등장하는 문장에서 답을 찾습니다.',
          },
        },
        {
          questionNo: '36',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as \'comforted\'? Circle (A) or (B). Sentence: "She stroked (A) her head and consoled (B) her."',
          options: [
            { label: 'A', text: 'stroked' },
            { label: 'B', text: 'consoled' },
          ],
          answer: 'B',
          solution: {
            method: "comforted(위로하다)와 같은 뜻의 단어를 고른다.",
            steps: [
              'stroked = (부드럽게) 쓰다듬다 → 신체적 동작.',
              'consoled = 위로하다 → comforted와 같은 의미.',
              '따라서 정답은 (B) consoled.',
            ],
            tip: 'console과 comfort는 둘 다 "위로하다"는 뜻의 동의어입니다.',
          },
        },
        {
          questionNo: '37',
          format: 'mcq',
          marks: 1,
          stem: "Tick your chosen answer. The word 'her' in line 7 refers to ________.",
          options: [
            { label: '1', text: 'Snowy' },
            { label: '2', text: 'Sue Lin' },
            { label: '3', text: "Sue Lin's mother" },
          ],
          answer: '2',
          solution: {
            method: "대명사 'her'가 가리키는 인물을 문맥에서 찾는다.",
            steps: [
              '7번째 줄: "It would simply sit quietly on her lap." (It = Snowy)',
              'Snowy가 무릎 위에 앉는 대상은 주인인 Sue Lin.',
              '따라서 \'her\'는 (2) Sue Lin을 가리킨다.',
            ],
            tip: "동물(It)의 행동 대상이 누구인지(주인)를 먼저 파악하면 'her'를 쉽게 찾을 수 있습니다.",
          },
        },
        {
          questionNo: '38',
          format: 'open',
          marks: 1,
          stem: 'Refer to lines 4 to 9. Tick "True" or "False": Sue Lin had a sister.',
          answer: 'False',
          solution: {
            method: 'Sue Lin의 형제 관계를 4~9줄에서 확인한다.',
            steps: [
              '2단락: "Being the only child, Sue Lin had no sibling to keep her company."',
              'Sue Lin은 외동(only child)이며 형제가 없다.',
              '따라서 "여동생이 있었다"는 거짓 → False.',
            ],
            tip: '"only child"(외동)라는 표현이 나오면 형제자매가 없음을 뜻합니다.',
          },
        },
        {
          questionNo: '39',
          format: 'open',
          marks: 1,
          stem:
            'Refer to lines 4 to 9. Tick "True" or "False": Sue Lin would play with Snowy after finishing her homework.',
          answer: 'True',
          solution: {
            method: '숙제 후 행동을 지문에서 확인한다.',
            steps: [
              '2단락: "After Sue Lin finished her homework, Snowy would be all ready to play with her."',
              '숙제를 마치면 Snowy와 놀았다.',
              '진술과 지문이 일치 → True.',
            ],
            tip: '"After ~ finished homework"처럼 시간 순서가 명확한 문장은 그대로 대조하면 됩니다.',
          },
        },
        {
          questionNo: '40',
          format: 'open',
          marks: 1,
          stem:
            'Refer to lines 4 to 9. Tick "True" or "False": When Sue Lin felt upset, Snowy would cheer her up by wagging its tail.',
          answer: 'False',
          solution: {
            method: 'Sue Lin이 속상할 때 Snowy의 행동을 정확히 확인한다.',
            steps: [
              '2단락: "Snowy seemed to know when Sue Lin felt upset. It would simply sit quietly on her lap."',
              '속상할 때 Snowy는 "꼬리를 흔드는 것"이 아니라 "무릎에 조용히 앉는다".',
              '"wagging its tail"(꼬리 흔들기)은 학교에서 돌아올 때(door에서)의 행동이지, 속상할 때의 행동이 아니다 → False.',
            ],
            tip: '같은 단락 안에서도 "다른 상황(when)"에 따른 행동을 구분해야 합니다.',
          },
        },
        {
          questionNo: '41',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 to indicate the order of events.\n' +
            '( ) Sue Lin came home.\n' +
            "( ) Sue Lin's mother told her that Snowy was missing.\n" +
            "( ) Sue Lin's grandmother went out to water the plants.",
          answer:
            "Sue Lin's grandmother went out to water the plants = 1; Sue Lin came home = 2; Sue Lin's mother told her that Snowy was missing = 3",
          solution: {
            method: '3단락의 사건 순서를 따라간다.',
            steps: [
              '먼저: 할머니가 화초에 물을 주러 나가며 문을 열어둠("her grandmother had left the door open when she went out to water the plants") → 1.',
              '그 사이 Snowy가 집을 나갔고, 이후 Sue Lin이 집에 돌아옴("Sue Lin came home and realised Snowy was not there") → 2.',
              '그 다음: 엄마에게서 자초지종을 들음("She found out from her mother that...") → 3.',
            ],
            tip: '사건의 원인(문이 열림)이 결과(개가 사라짐, 알게 됨)보다 먼저 일어났음을 기억하세요.',
          },
        },
        {
          questionNo: '42',
          format: 'open',
          marks: 1,
          stem: "What did Sue Lin's family do to find Snowy?",
          answer: 'They put up notices about the missing dog around the neighbourhood.',
          solution: {
            method: '마지막 단락에서 가족이 한 행동을 찾는다.',
            steps: [
              '마지막 단락: "The family put up notices about the missing dog around the neighbourhood."',
              '가족은 동네에 실종 전단지(notices)를 붙였다.',
              '완전한 문장으로: "They put up notices about the missing dog around the neighbourhood."',
            ],
            tip: '"What did ~ do"는 지문 속 행동 동사(put up)를 그대로 활용해 답합니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section I — Comprehension: Open-ended (4 x 2 marks) — Q43–46
    // 지문: The Foolish Lion and the Clever Rabbit (판차탄트라)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp2-secI-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section I — Comprehension: The Foolish Lion and the Clever Rabbit',
      instructions: 'Read the passage carefully. Write your answers in complete sentences.',
      passage:
        'Once upon a time, there lived a fierce lion. All the jungle animals were scared of him. He was the king of the jungle. Being greedy, he hunted and killed many animals even when he was not hungry. Therefore, the animals constantly lived in fear as they knew that all of them would eventually be killed.\n\n' +
        'One day, a rabbit came up with a plan as she did not want to be eaten by the lion. She wanted to get rid of him. The rabbit pretended to rush into the lion\'s den, waking up the sleeping lion. The lion hollered and threatened to kill her.\n\n' +
        'The rabbit remained calm and said, "Your Majesty, hear me out before you kill me. Six of us were coming to pay our respects to you today. On our way, another lion stopped us and claimed to be the new king of the jungle. He ate up my brothers. I escaped to tell you this."\n\n' +
        'The lion was furious. He could not believe that another animal could be far superior to him. Immediately, he demanded that the rabbit take him to his enemy\'s den so that he could kill him. The rabbit led the lion to a deep well filled with water. The lion looked into the well and roared when he saw his reflection. He jumped into the well and drowned.\n\n' +
        'All the animals were very happy to learn that the witty little rabbit had tricked the lion. They were glad that the lion had been killed and celebrated all day long.\n\n' +
        '(Adapted from: http://www.tell-a-tale.com/panchatantra-foolish-lion-clever-rabbit/)',
      marks: 8,
      questions: [
        {
          questionNo: '43',
          format: 'open',
          marks: 2,
          stem: 'Why were the jungle animals scared of the lion?',
          answer:
            'The jungle animals were scared of the lion because he was greedy and hunted and killed many animals even when he was not hungry.',
          solution: {
            method: '1단락에서 동물들이 무서워한 이유를 찾는다.',
            steps: [
              '1단락: "Being greedy, he hunted and killed many animals even when he was not hungry."',
              '배고프지 않을 때도 욕심으로 동물들을 사냥해 죽였다.',
              '"therefore, the animals constantly lived in fear" — 그래서 동물들은 항상 두려움 속에 살았다.',
              '이유를 완전한 문장으로 서술한다.',
            ],
            tip: '"Why" 질문은 결과(lived in fear) 앞의 원인 문장에서 답을 찾습니다.',
          },
        },
        {
          questionNo: '44',
          format: 'open',
          marks: 2,
          stem: 'Which word in paragraph two has the same meaning as "shouted"?',
          answer: 'hollered',
          solution: {
            method: 'shouted(소리쳤다)와 같은 뜻의 단어를 2단락에서 찾는다.',
            steps: [
              '2단락: "The lion hollered and threatened to kill her."',
              'hollered = 큰 소리로 외쳤다 → shouted와 같은 의미.',
              '따라서 답은 hollered.',
            ],
            tip: '동의어 찾기는 보기 단어를 "shouted"로 바꿔 문장이 자연스러운지 확인합니다.',
          },
        },
        {
          questionNo: '45',
          format: 'open',
          marks: 2,
          stem: 'What does "I" (line 10) refer to?',
          answer: '"I" refers to the rabbit.',
          solution: {
            method: '10번째 줄의 화자가 누구인지 확인한다.',
            steps: [
              '3단락은 토끼(the rabbit)가 사자에게 하는 말("The rabbit... said, \\"Your Majesty...")',
              '"I escaped to tell you this."에서 "I"는 말하는 사람인 토끼.',
              '완전한 문장: "\'I\' refers to the rabbit."',
            ],
            tip: '대화문에서 "I"는 그 말을 하는 화자(여기서는 토끼)를 가리킵니다.',
          },
        },
        {
          questionNo: '46',
          format: 'open',
          marks: 2,
          stem: 'Why did the lion jump into the well?',
          answer:
            'The lion jumped into the well because he saw his own reflection in the water and thought it was the other lion (his enemy), so he roared and jumped in to attack it.',
          solution: {
            method: '4단락에서 사자가 우물에 뛰어든 직접적 원인을 찾는다.',
            steps: [
              '4단락: "The lion looked into the well and roared when he saw his reflection. He jumped into the well and drowned."',
              '사자는 물에 비친 자신의 모습을 "적(다른 사자)"으로 오해했다.',
              '그 적을 공격하려고 우물 속으로 뛰어들었다가 빠져 죽었다.',
              '이유를 완전한 문장으로 서술한다.',
            ],
            tip: '"reflection"(비친 모습)을 적으로 오해한 것이 사건의 핵심 원인입니다.',
          },
        },
      ],
    },
  ],
};

export default practicePaper2CatholicHighPrimaryEnglish2023;
