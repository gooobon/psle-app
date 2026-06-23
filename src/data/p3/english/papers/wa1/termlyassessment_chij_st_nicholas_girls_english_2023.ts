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
        tip: '"so"는 앞 내용이 원인이고 뒤 내용이 그 결과일 때 씁니다.',
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
        method: '음료를 컵 "into (moving inside)" 따르는 동작에 맞는 전치사를 고른다.',
        steps: [
          '주스를 따를 때는 컵 "into (moving inside)" 들어가야 한다.',
          '"pour A into B" = A를 B 안으로 따르다.',
          '"at"(~을 향해)/"on"(~위에)은 액체를 따르는 동작과 안 맞는다 → 정답 (3) into. (공식 정답표 확인됨)',
        ],
        tip:
          '"pour into a cup"은 액체를 따르는 동작을 나타내는 정해진 전치사 표현입니다. (참고: 원본 스캔에 보기 (4)가 인쇄되어 있지 않았으나, 정답 (3) into는 공식 정답표로 확인됨)',
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
        method: '구체적인 건물 번지/주소 앞에 쓰는 전치사를 고른다.',
        steps: [
          '"Block 56, Mayflower Street"는 구체적인 주소(번지수 포함).',
          '구체적인 주소 앞에는 "at"을 쓴다 (live at + 번지).',
          '"in"은 도시/나라처럼 큰 지역에, "on"은 도로명 앞에 쓰일 수 있으나 번지수가 있으면 at이 더 적합 → 정답 (2) at.',
        ],
        tip: '구체적인 번지수가 있는 주소 앞에는 보통 "at"을 씁니다(live at Block 56...).',
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
        method: '명사의 수(단수/복수)와 거리(가까움/멈)를 본다.',
        steps: [
          '"flowers"는 복수 → this/that(단수) 제외.',
          '엄마가 직접 들고 있는(holding) 꽃다발 → 가까운 거리.',
          '복수+가까움 = these → 정답 (4) These.',
        ],
        tip: '손에 들고 있는 가까운 복수 사물은 these로 가리킵니다.',
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
        method: '"~ or result"(안 하면 ~된다)는 강한 의무/경고 구문을 본다.',
        steps: [
          '"~ or you will have tooth decay"(안 그러면 충치가 생긴다) → 강한 경고.',
          '강한 의무를 나타내는 조동사는 "must"(반드시 해야 한다).',
          'can(할 수 있다)/might(할지도 모른다)/would(~할 텐데)는 의무의 강도가 부족 → 정답 (2) must.',
        ],
        tip: '"must... or (bad result/consequence)"는 반드시 해야 할 일을 경고하는 구문입니다.',
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
        method: '"had + past participle" 과거완료 형태를 만든다.',
        steps: [
          '조동사 "had"가 앞에 있으므로 뒤에는 과거분사가 필요.',
          'forget의 과거분사는 forgotten (forget–forgot–forgotten).',
          '"had forgotten to bring it home"(가져오는 것을 잊었었다) → 정답 (3) forgotten.',
        ],
        tip: 'had 뒤에는 동사의 과거분사(3단 변화 세 번째 형태)가 옵니다.',
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
        method: '배가 고플 때 배에서 나는 소리를 나타내는 동사를 고른다.',
        steps: [
          '배가 많이 고프면 배에서 꾸르륵 소리가 난다.',
          '"rumble" = (배에서) 꾸르륵거리다 → "stomach rumbled"가 정확한 표현.',
          'howled(울부짖다)/tumbled(굴러떨어지다)/whimpered(낑낑거리다)는 배와 안 맞는다 → 정답 (3) rumbled.',
        ],
        tip: '"stomach rumbles"는 배고플 때 나는 소리를 표현하는 정해진 동사입니다.',
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
        method: '"air"를 목적어로 하는 자연스러운 동사를 고른다.',
        steps: [
          '해로운 가스가 공기에 끼치는 영향 → 공기를 오염시킴.',
          '"pollute the air" = 공기를 오염시키다 → 가장 자연스러운 표현.',
          'hurt/endanger는 보통 생명체에, burn은 불태움에 쓰여 air와 덜 어울린다 → 정답 (3) pollute.',
        ],
        tip: '"pollute"는 air, water, environment 같은 명사와 짝지어 자주 쓰입니다.',
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
        method: '주머니 속 물건이 있는지 확인하는 가벼운 동작을 나타내는 동사를 고른다.',
        steps: [
          '주머니 안에서 열쇠를 가볍게 흔들어 소리/감촉으로 확인하는 동작.',
          '"jiggle" = 가볍게 흔들다 → 주머니 속 물건을 확인할 때 쓰는 자연스러운 표현.',
          'jab(쿡 찌르다)/wrench(세게 비틀다)는 너무 강함, wiggle은 주로 몸의 일부(손가락 등)를 움직일 때 → 정답 (1) jiggled.',
        ],
        tip: '"jiggle keys in a pocket"은 주머니 속 열쇠를 가볍게 흔들어 확인하는 흔한 표현입니다.',
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
        method: '"defeat / loss"가 증명하는 성질이 무엇인지 생각한다.',
        steps: [
          '작년에 진 팀에게도 졌다 → 이 팀이 "unbeatable / invincible"이 아님을 보여준다.',
          '"invincible" = 무적의, 절대 지지 않는.',
          '"not invincible"(무적이 아니다)이 패배 사실과 자연스럽게 연결 → 정답 (3) invincible.',
        ],
        tip: '"proved that it was not [adjective]"는 사건(여기서는 패배)이 반증하는 성질을 찾는 문제입니다.',
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
        method: '아기가 자고 있을 때 말하는 방식에 맞는 부사를 고른다.',
        steps: [
          '"The baby is sleeping"(아기가 자고 있다) → 깨우지 않도록 조용히 말해야 함.',
          '"softly" = 작은 소리로/부드럽게 → 조용히 말하라는 의미에 맞는다.',
          'wisely(슬기롭게)/politely(공손하게)/properly(제대로)는 "volume of sound / loudness"와 무관 → 정답 (1) softly.',
        ],
        tip: '뒤 문장(아기가 잔다)이 빈칸 부사의 의미(조용히)를 알려주는 단서입니다.',
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
        method: '"The match was postponed because of the weather"는 의미의 동사구를 고른다.',
        steps: [
          '나쁜 날씨 때문에 경기가 내일로 연기되었다.',
          '"put off" = 연기하다/미루다 → "has been put off until tomorrow"가 자연스럽다.',
          'put on(입다/공연하다)/put out(끄다, 내놓다)/put away(치우다)는 "postponement / delay"의 의미가 없다 → 정답 (2) put off.',
        ],
        tip: '"put off"는 일정을 나중으로 미룰 때 쓰는 동사구입니다.',
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
            method: '광고의 "Power Lab Outlets" 목록에서 North Zone에 해당하는 지점을 찾는다.',
            steps: [
              '목록: "North Zone – Mayflower Parade #04-11".',
              'North Zone에 해당하는 지점은 Mayflower Parade.',
              '따라서 정답은 (4) Mayflower Parade.',
            ],
            tip: '시각 자료 문제는 표/목록에서 키워드(여기서는 North Zone)를 정확히 찾아 대조합니다.',
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
            method: '세일 기간(5~7월 6일)과 영업시간(요일별)을 동시에 만족하는 보기를 찾는다.',
            steps: [
              '세일 기간: 금요일 5 June ~ 일요일 7 June.',
              '영업시간: 월~목 10am~10pm, 금~일 11am~10pm.',
              '(1) 5 June(금) 10am → 금요일은 11am부터 개점 → 아직 문 안 엶.',
              '(2) 6 June(토) 10am → 토요일도 11am부터 개점 → 아직 문 안 엶.',
              '(4) 8 June(월) 11am → 세일 기간(7 June까지) 종료 후.',
              '(3) 7 June(일) 11am → 세일 기간 내 + 일요일 개점 시각(11am)과 일치 → 정답 (3).',
            ],
            tip: '날짜와 시각 두 조건을 모두 만족해야 정답입니다. 한쪽만 맞으면 오답이에요.',
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
            method: '"definitely"(반드시/확실히)에 해당하는, 조건/제한이 없는 항목을 찾는다.',
            steps: [
              'Face Painting: "below 12 years old" — John은 18세라 자격 없음.',
              'Goodie Bags: "first 50 walk-in customers" — 50명 안에 들지 보장 안 됨.',
              'Food & Drinks: "while stocks last" — 재고가 남아있어야 함, 보장 안 됨.',
              'Photo Booth: "available from 12 pm" — 시간 조건만 있고, 2pm은 12pm 이후이므로 확실히 이용 가능 → 정답 (2).',
            ],
            tip: '"definitely"는 다른 제한 조건(나이/수량/재고) 없이 확실히 가능한 항목을 찾는 신호입니다.',
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
            method: '각 보기를 광고의 조건과 하나씩 대조한다.',
            steps: [
              '(1) "All shoppers"(모든 손님) — 무료 상품권은 "first 100 customers"만 받음 → 거짓.',
              '(2) 혜택들은 "Available only in stores!"라고 명시 → 온라인 쇼핑객이 모든 혜택을 누릴 수 없음 → 거짓.',
              '(3) "Free parking with purchases above $20" — $30 > $20이므로 무료 주차 혜택을 받음 → 참.',
              '(4) Bundle Deal은 "Participating brands: Fony, Nayer & Techno"로 제한 — "any"(어떤 브랜드든)는 거짓.',
              '따라서 참인 진술은 (3).',
            ],
            tip: '"all/any" 같은 절대적 표현이 있는 보기는 광고의 제한 조건(특정 브랜드/인원수 등)과 자주 충돌합니다.',
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
            method: '싱가포르에 처음 온 목적을 1단락에서 찾는다.',
            steps: [
              '1단락: "Born in Malaysia in 1798, he came to Singapore to find work."',
              '처음 온 목적은 일을 찾는 것.',
              '병원 건립이나 빈민 돕기는 나중(부자가 된 후)의 일 → 정답 (1) find work.',
            ],
            tip: '"first came"(처음 왔을 때)는 이야기의 가장 앞부분에서 답을 찾습니다.',
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
            method: '채소와 닭을 팔러 시내에 갈 때의 이동 방법을 2단락에서 찾는다.',
            steps: [
              '2단락: "cycle long distances on his bicycle to sell them in the marketplace in town."',
              '자전거를 타고(cycled) 시내로 갔다.',
              '"Walking, or even running, would take too long"이라고 명시 → walked/ran은 오답 → 정답 (2) cycled.',
            ],
            tip: '지문에 이동수단이 직접 언급되면 그대로 답으로 사용합니다.',
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
            method: '출신 가정의 형편을 1단락에서 확인한다.',
            steps: [
              '1단락: "Tan Tock Seng was born in a humble family. He was quite poor."',
              '그는 가난한(humble, poor) 집안에서 태어났다.',
              '따라서 "was born into a rich family"는 거짓 → False.',
            ],
            tip: '"humble family"(평범하고 가난한 집안)는 "rich family"의 반대입니다.',
          },
        },
        {
          questionNo: '22',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick "True" or "False": He was born in China.',
          answer: 'False',
          solution: {
            method: '출생지를 1단락에서 확인한다.',
            steps: [
              '1단락: "Born in Malaysia in 1798, he came to Singapore to find work."',
              '그는 말레이시아(Malaysia)에서 태어났다.',
              '따라서 "was born in China"는 거짓 → False. (지문의 "workers from China"는 나중에 그가 도운 다른 사람들을 가리킴)',
            ],
            tip: '비슷한 단어(China)가 다른 곳에 나와도, 출생지에 관한 직접적인 문장을 찾아야 합니다.',
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
            method: '물건을 구입한 장소를 2단락에서 확인한다.',
            steps: [
              '2단락: "He would buy fresh vegetables and chickens from the countryside".',
              '채소와 닭을 시골(countryside)에서 구입했다.',
              '진술과 일치 → True.',
            ],
            tip: '"buy A from B" 구조에서 B(장소)를 정확히 확인합니다.',
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
            method: '근면·절약과 첫 상점 구입의 관계를 3단락에서 확인한다.',
            steps: [
              '3단락: "the hardworking and thrifty man did well enough to buy a shophouse."',
              '"thrifty"(절약하는)는 돈을 모았다는 뜻을 내포한다.',
              '근면하고 절약하여 돈을 모아 상점을 살 수 있었다 → True.',
            ],
            tip: '"thrifty"(절약하는)라는 단어가 "saved up money"(돈을 모았다)와 연결됨을 기억하세요.',
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
            method: 'inexpensive(비싸지 않은)와 같은 뜻의 단어를 고른다.',
            steps: [
              'affordable = (가격이) 적당한, 부담 없는 → inexpensive와 의미가 통한다.',
              'basic = 기본적인 → 가격과는 직접 관련 없음.',
              '따라서 정답은 (A) affordable.',
            ],
            tip: 'affordable은 "an affordable price"이라는 뜻으로 inexpensive와 자주 동의어로 쓰입니다.',
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
            method: '지문의 단락 순서(2→3→4단락)를 따라 사건을 배열한다.',
            steps: [
              '2단락: 젊은 시절 시장에 가서 채소·닭을 팔았다 → 1.',
              '3단락: 돈을 모아 상점을 산 뒤 "also bought land and more shops"(bought land and more shophouses) → 2.',
              '4단락: 부자가 된 뒤 "donated money to build a hospital"(donated money to build a hospital) → 3.',
            ],
            tip: '인물의 일생 이야기는 보통 지문의 단락 순서와 시간 순서가 일치합니다.',
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
            method: '5단락에서 빈민들의 감정을 나타내는 단서를 찾는다.',
            steps: [
              '5단락: "The poor and needy were appreciative of his help as they did not have to worry about their hospital bills."',
              '"appreciative"(감사하는) → thankful과 같은 의미.',
              '"did not have to worry"(걱정하지 않아도 됨) → 부담을 덜어 마음이 편해짐 = relieved.',
              '따라서 정답은 relieved와 thankful 두 가지.',
            ],
            tip: '"appreciative"는 thankful의 동의어, "no longer need to worry"는 relieved의 단서입니다.',
          },
        },
      ],
    },
  ],
};

export default termlyAssessmentChijStNicholasGirlsEnglish2023;
