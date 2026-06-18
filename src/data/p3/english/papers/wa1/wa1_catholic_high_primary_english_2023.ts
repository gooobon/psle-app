// =============================================================================
// src/data/p3/english/papers/wa1_catholic_high_primary_english_2023.ts
// Catholic High School (Primary) — Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 160–164 (시험지 표지 p.1–5)
// Total: 30 marks (Section A 10 + Section B 10 + Section C 5 + Section D 5)
// 주의: 표지에 연도 없음. 모음집 배열상 2023으로 처리(검증 권장).
//       다른 Catholic High 자료(Practice Paper 1·2)와 구분하기 위해 'Weighted Assessment 1'로 분류.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1CatholicHighPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 30,
    sourcePages: 'pp.160–164 (paper pp.1–5)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar MCQ (10 x 1m) — Q1–10
    // =========================================================================
    {
      kind: 'single',
      id: 'chswa1-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Max and his friend ________ to East Coast Park every Saturday morning.',
      options: [
        { label: '1', text: 'cycle' },
        { label: '2', text: 'cycles' },
        { label: '3', text: 'cycled' },
        { label: '4', text: 'are cycling' },
      ],
      answer: '1',
      solution: {
        method: '주어의 수와 "every Saturday morning"(반복 습관)을 본다.',
        steps: [
          '주어 "Max and his friend"는 복수.',
          '"every Saturday morning"은 매주 반복되는 습관 → 단순현재.',
          '복수 주어의 단순현재형은 원형 cycle → 정답 (1).',
        ],
        tip: '"every + 시간 표현"은 반복 습관을 나타내는 단순현재의 신호입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Every pupil in the school ________ to take his temperature daily.',
      options: [
        { label: '1', text: 'has' },
        { label: '2', text: 'had' },
        { label: '3', text: 'have' },
        { label: '4', text: 'are having' },
      ],
      answer: '1',
      solution: {
        method: '"Every + 명사"는 단수로 취급된다는 규칙과 "daily"(반복 습관)를 본다.',
        steps: [
          '"Every pupil"은 문법적으로 단수 주어로 취급한다.',
          '"daily"는 매일 반복되는 일 → 단순현재.',
          '단수 주어의 단순현재 "have"의 형태는 has → 정답 (1).',
        ],
        tip: '"Every + 명사(단수형)"는 항상 단수 동사와 함께 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '________ group of boys on the field over there is playing soccer.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '2',
      solution: {
        method: '명사의 수(단수/복수)와 거리(가까움/멈)를 본다.',
        steps: [
          '"group"은 단수 명사(동사 is와 일치) → these/those(복수) 제외.',
          '"on the field over there"(저쪽 운동장)는 멀리 있음 → this가 아니라 that.',
          '따라서 정답은 (2) That.',
        ],
        tip: '"group, team, class"처럼 집합을 가리키는 명사는 보통 단수로 취급합니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem:
        "I have taken my friend's worksheets by mistake. I will return ________ to him when I see him.",
      options: [
        { label: '1', text: 'it' },
        { label: '2', text: 'us' },
        { label: '3', text: 'his' },
        { label: '4', text: 'them' },
      ],
      answer: '4',
      solution: {
        method: '앞 문장의 명사("worksheets")의 수를 확인해 대명사를 고른다.',
        steps: [
          '앞 문장: "I have taken my friend\'s worksheets"(복수, worksheets).',
          '복수 명사를 대신하는 목적격 대명사는 "them".',
          '따라서 "I will return them to him" → 정답 (4) them.',
        ],
        tip: '대명사는 가리키는 명사가 단수인지 복수인지 먼저 확인합니다(worksheets = 복수 → them).',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Mother ________ in the kitchen when her mobile phone rang.',
      options: [
        { label: '1', text: 'cooks' },
        { label: '2', text: 'cooked' },
        { label: '3', text: 'is cooking' },
        { label: '4', text: 'was cooking' },
      ],
      answer: '4',
      solution: {
        method: '"when ~ rang"(과거의 한 순간)과 동시에 진행 중이던 동작을 나타낸다.',
        steps: [
          '"when her mobile phone rang" — rang은 과거형, 특정 순간을 가리킴.',
          '그 순간 엄마는 요리를 "하고 있던 중"이었다 → 과거진행형.',
          '주어 "Mother"는 단수 → "was cooking" → 정답 (4).',
        ],
        tip: '"when + 과거형(한 순간의 사건)"이 있으면, 그 순간 진행 중이던 동작은 was/were -ing로 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: 'Chitra misses her best friend, Nisha. It has been five years ________ she left Singapore.',
      options: [
        { label: '1', text: 'but' },
        { label: '2', text: 'after' },
        { label: '3', text: 'since' },
        { label: '4', text: 'although' },
      ],
      answer: '3',
      solution: {
        method: '"It has been + 기간 + ___ + 과거 사건" 구문에 맞는 접속사를 고른다.',
        steps: [
          '"It has been five years ___ she left"는 "떠난 지 5년이 되었다"는 의미.',
          '"It has been + 기간 + since + 과거 사건"은 정해진 구문(since = ~한 이래로).',
          '따라서 정답은 (3) since.',
        ],
        tip: '"It has been [기간] since [과거 사건]"은 "~한 지 [기간]이 되었다"는 뜻의 고정 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: "Wee Boon's father ________ for a meeting earlier in the day.",
      options: [
        { label: '1', text: 'left' },
        { label: '2', text: 'leave' },
        { label: '3', text: 'leaves' },
        { label: '4', text: 'is leaving' },
      ],
      answer: '1',
      solution: {
        method: '"earlier in the day"(이미 지난 그날의 시간)로 과거시제를 파악한다.',
        steps: [
          '"earlier in the day"는 "그날 중 이미 지난 시점"을 가리키며 과거시제를 요구한다.',
          'leave의 과거형은 left.',
          '따라서 "Wee Boon\'s father left for a meeting earlier in the day." → 정답 (1) left.',
        ],
        tip: '"earlier in the day/week" 같은 표현은 보통 과거시제와 함께 쓰입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem:
        '"There is still ________ shampoo left in the bottle. Use it first," my mother told my sister.',
      options: [
        { label: '1', text: 'any' },
        { label: '2', text: 'few' },
        { label: '3', text: 'some' },
        { label: '4', text: 'many' },
      ],
      answer: '3',
      solution: {
        method: '"shampoo"의 가산 여부와 문장의 긍정/부정을 본다.',
        steps: [
          '"shampoo"는 셀 수 없는 명사 → few/many(가산용) 제외.',
          '"There is still ___ shampoo left"는 긍정문(샴푸가 남아있다는 사실 전달).',
          '긍정문에서 "약간 남아있다"는 의미에는 "some"이 자연스럽다 → 정답 (3) some.',
        ],
        tip: '"any"는 주로 부정문/의문문에, "some"은 긍정문에 쓰입니다(불가산 명사 모두 가능).',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q9',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'During the December holidays, Sally went ________ a vacation to New York with her family.',
      options: [
        { label: '1', text: 'in' },
        { label: '2', text: 'at' },
        { label: '3', text: 'by' },
        { label: '4', text: 'on' },
      ],
      answer: '4',
      solution: {
        method: '"휴가를 가다"라는 표현에 맞는 전치사를 고른다.',
        steps: [
          '"go on a vacation/holiday/trip" = 휴가/여행을 가다 → 정해진 전치사 표현.',
          'in/at/by는 이 표현에 쓰이지 않는다.',
          '따라서 정답은 (4) on.',
        ],
        tip: '"go on a vacation/trip/holiday"는 통째로 외워야 할 전치사 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q10',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem:
        '"Children, you must do the homework by ________ and not discuss the answers," Mrs Loh said.',
      options: [
        { label: '1', text: 'itself' },
        { label: '2', text: 'yourself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'yourselves' },
      ],
      answer: '4',
      solution: {
        method: '"Children"(여러 명, 2인칭 you)에 맞는 재귀대명사를 고른다.',
        steps: [
          'Mrs Loh이 여러 아이들("Children")에게 직접 말하고 있다 → 2인칭 복수 "you".',
          '2인칭 복수의 재귀대명사는 "yourselves".',
          '"by yourselves"(너희들 스스로) → 정답 (4) yourselves.',
        ],
        tip: '"by oneself"는 "스스로/혼자서"라는 뜻이며, 듣는 대상이 여러 명이면 yourselves를 씁니다.',
      },
    },

    // =========================================================================
    // Section B: Vocabulary MCQ (10 x 1m) — Q11–20
    // =========================================================================
    {
      kind: 'single',
      id: 'chswa1-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'The thief ________ towards the back door when he heard the police siren.',
      options: [
        { label: '1', text: 'bolted' },
        { label: '2', text: 'strolled' },
        { label: '3', text: 'trudged' },
        { label: '4', text: 'stomped' },
      ],
      answer: '1',
      solution: {
        method: '경찰 사이렌을 듣고 도망치는 도둑의 동작에 맞는 동사를 고른다.',
        steps: [
          '경찰 사이렌을 듣고 급히 도망쳤다 → 매우 빠르게 달아남.',
          '"bolt" = 갑자기 빠르게 달아나다 → 도둑의 행동과 정확히 일치.',
          'strolled(한가로이 걷다)/trudged(터덜터덜 걷다)/stomped(발을 구르며 걷다)는 급한 도주와 안 맞는다 → 정답 (1) bolted.',
        ],
        tip: '"bolted"는 놀라서 갑자기 빠르게 달아나는 동작을 나타냅니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem:
        'Some of the customers were unhappy with the service in the restaurant. They ________ about the poor service to the owner.',
      options: [
        { label: '1', text: 'fussed' },
        { label: '2', text: 'sobbed' },
        { label: '3', text: 'nagged' },
        { label: '4', text: 'grumbled' },
      ],
      answer: '4',
      solution: {
        method: '"불만스러워 불평했다"는 의미에 맞는 동사를 고른다.',
        steps: [
          '손님들이 서비스에 불만을 느끼고 사장에게 그것에 대해 말했다.',
          '"grumble about something to someone" = ~에게 ~에 대해 (낮은 목소리로) 불평하다.',
          'sobbed(흐느꼈다)는 슬픔, fussed/nagged는 더 격하거나 반복적인 잔소리 느낌 → "grumbled"가 가장 자연스럽다 → 정답 (4).',
        ],
        tip: '"grumble about X to Y"는 불만을 표현할 때 자주 쓰는 짝꿍 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: 'My brother gobbled the chocolate cake ________ as he was very hungry after lessons.',
      options: [
        { label: '1', text: 'slowly' },
        { label: '2', text: 'untidily' },
        { label: '3', text: 'greedily' },
        { label: '4', text: 'carelessly' },
      ],
      answer: '3',
      solution: {
        method: '"매우 배고팠다"는 이유와 "gobbled"(급히 먹어치웠다)에 어울리는 부사를 고른다.',
        steps: [
          '"gobbled"은 이미 급하게 먹는 모습을 나타낸다.',
          '"as he was very hungry"(배고팠기 때문에) → 욕심내듯 먹었다는 의미로 "greedily"가 자연스럽다.',
          'slowly(천천히)는 gobbled와 모순, untidily/carelessly는 배고픔과 직접 관련 없음 → 정답 (3) greedily.',
        ],
        tip: '이유(very hungry)가 행동의 감정(욕심내며 = greedily)을 알려주는 단서입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: '"Please ________ the volume of the television. I\'m trying to do my homework," I told my sister.',
      options: [
        { label: '1', text: 'turn up' },
        { label: '2', text: 'turn over' },
        { label: '3', text: 'turn away' },
        { label: '4', text: 'turn down' },
      ],
      answer: '4',
      solution: {
        method: '"숙제하는 데 방해된다"는 상황에서 음량에 대한 요청을 생각한다.',
        steps: [
          '"I\'m trying to do my homework"(숙제 중) → 조용한 환경이 필요함.',
          '"turn down the volume" = 음량을 줄이다.',
          'turn up(높이다)은 반대 의미, turn over(뒤집다)/turn away(외면하다)는 음량과 무관 → 정답 (4) turn down.',
        ],
        tip: '"turn up/down the volume"은 소리를 높이거나 줄일 때 쓰는 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q15',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 15,
      marks: 1,
      stem: 'Gopal is unable to read without his glasses. He is blind like a ________.',
      options: [
        { label: '1', text: 'bat' },
        { label: '2', text: 'fox' },
        { label: '3', text: 'pig' },
        { label: '4', text: 'owl' },
      ],
      answer: '1',
      solution: {
        method: '"눈이 매우 나쁘다"를 나타내는 직유(simile) 관용어를 고른다.',
        steps: [
          '"blind as a bat" = 눈이 매우 나쁜(박쥐처럼 시력이 안 좋은) → 매우 흔한 영어 관용 표현.',
          'fox(교활한)/pig(욕심 많은)/owl(지혜로운)은 시력과 관련된 관용 표현이 아니다.',
          '따라서 정답은 (1) bat.',
        ],
        tip: '"as blind as a bat"는 시력이 매우 나쁨을 나타내는 정해진 직유 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q16',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 16,
      marks: 1,
      stem:
        'I felt a ________ of water fall on my hand. I think we need to hurry as it might rain soon.',
      options: [
        { label: '1', text: 'pool' },
        { label: '2', text: 'drop' },
        { label: '3', text: 'splash' },
        { label: '4', text: 'puddle' },
      ],
      answer: '2',
      solution: {
        method: '손에 떨어진 작은 물의 단위를 나타내는 명사를 고른다.',
        steps: [
          '비가 오기 전 손에 떨어진 작은 물 한 알 → "a drop of water"(물 한 방울).',
          'pool(연못/물웅덩이)·puddle(고인 물웅덩이)은 이미 모인 물, splash(첨벙거림)는 소리/움직임을 강조.',
          '"손에 떨어진 한 알"이라는 의미에 가장 맞는 것은 (2) drop.',
        ],
        tip: '"a drop of water"는 작은 물방울 하나를 가리키는 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q17',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 17,
      marks: 1,
      stem: 'Betty towers over her older brother. She is ________.',
      options: [
        { label: '1', text: 'as tall as a giraffe' },
        { label: '2', text: 'as wise as an owl' },
        { label: '3', text: 'as big as an elephant' },
        { label: '4', text: 'as proud as a peacock' },
      ],
      answer: '1',
      solution: {
        method: '"tower over"(훨씬 더 크다)와 어울리는 직유를 고른다.',
        steps: [
          '"towers over her older brother" = 오빠보다 훨씬 키가 크다.',
          '"as tall as a giraffe"(기린처럼 키가 큰)는 큰 키를 직접 표현.',
          'wise(지혜로운)/big(덩치가 큰, 키와는 다름)/proud(거만한)는 "키가 크다"와 안 맞는다 → 정답 (1).',
        ],
        tip: '"tower over"는 키/높이가 압도적으로 큼을 의미하므로 키와 관련된 직유를 고릅니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q18',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 18,
      marks: 1,
      stem: 'Aaron spilled some hot coffee on himself and as a result has ________ his leg.',
      options: [
        { label: '1', text: 'blazed' },
        { label: '2', text: 'twisted' },
        { label: '3', text: 'scalded' },
        { label: '4', text: 'sprained' },
      ],
      answer: '3',
      solution: {
        method: '뜨거운 액체로 인한 피부 손상을 나타내는 동사를 고른다.',
        steps: [
          '뜨거운 커피를 자기 몸에 쏟았다 → 화상(뜨거운 액체로 인한 상처).',
          '"scald" = 뜨거운 액체에 데다 → 정확히 일치.',
          'twisted(삐다)/sprained(접질리다)는 관절 부상, blazed(불타다)는 직접 화상 표현이 아님 → 정답 (3) scalded.',
        ],
        tip: '"scald"는 특히 뜨거운 물·음료 등 액체에 의한 화상을 가리킵니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q19',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 19,
      marks: 1,
      stem:
        'John is a ________ class monitor. You can trust him to take care of the class when the teacher is not around.',
      options: [
        { label: '1', text: 'polite' },
        { label: '2', text: 'strong' },
        { label: '3', text: 'pleasant' },
        { label: '4', text: 'responsible' },
      ],
      answer: '4',
      solution: {
        method: '"믿고 맡길 수 있다"는 신뢰와 어울리는 성격 형용사를 고른다.',
        steps: [
          '"You can trust him to take care of the class"(맡겨도 믿을 수 있다) → 책임감.',
          '"responsible" = 책임감 있는 → 신뢰와 직접 연결된다.',
          'polite(공손한)/strong(강한)/pleasant(상냥한)은 "맡길 수 있는 신뢰감"과 직접 관련 없다 → 정답 (4) responsible.',
        ],
        tip: '"trust someone to do something"은 책임감(responsible)과 짝지어 자주 쓰입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q20',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 20,
      marks: 1,
      stem:
        '"Smoking is ________ to your health. You should slowly quit smoking," the doctor advised my father.',
      options: [
        { label: '1', text: 'fearful' },
        { label: '2', text: 'hurtful' },
        { label: '3', text: 'painful' },
        { label: '4', text: 'harmful' },
      ],
      answer: '4',
      solution: {
        method: '"건강에 ~하다"는 표준 경고 표현에 맞는 형용사를 고른다.',
        steps: [
          '"harmful to your health"(건강에 해로운)는 흡연 경고에서 가장 흔히 쓰이는 표현.',
          'fearful(두려운)/hurtful(상처 주는, 보통 감정에)/painful(아픈)은 "건강에 해롭다"는 표준 표현이 아니다.',
          '따라서 정답은 (4) harmful.',
        ],
        tip: '"harmful to your health"는 흡연·오염 등 건강 경고에서 자주 쓰이는 정해진 표현입니다.',
      },
    },

    // =========================================================================
    // Section C: Grammar Cloze (5 x 1m) — Q21–25
    // 보기: (A) I (B) it (C) my (D) us (E) we
    // 지문: Clean Plate 캠페인
    // =========================================================================
    {
      kind: 'set',
      id: 'chswa1-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write its letter (A to E) in each blank. USE EACH WORD ONCE ONLY. Box: (A) I  (B) it  (C) my  (D) us  (E) we',
      passage:
        '"Preventing food wastage is important," Miss Yeo told our class. She told (21) ________ that we would be participating in the \'Clean Plate\' campaign.\n\n' +
        'Miss Yeo instructed all of us to order only what (22) ________ could finish to avoid wastage. When I got home, I told (23) ________ mother about the campaign. She was happy as (24) ________ will teach me good eating habits. The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign. I was proud to be part of this campaign.\n\n' +
        '(Adapted from: http://surl.li/bdxaw)',
      marks: 5,
      questions: [
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'She told (21) ________ that we would be participating in the \'Clean Plate\' campaign.',
          answer: 'D',
          solution: {
            method: 'Miss Yeo가 "우리 반(our class)"에게 한 말의 목적어를 고른다.',
            steps: [
              '문장 앞: "Miss Yeo told our class." — 선생님이 학급 전체에게 말함.',
              '"우리(반 전체)"를 가리키는 목적격 대명사는 "us".',
              '보기에서 us는 (D) → 정답 (D).',
            ],
            tip: '"told 목적어"에서 목적어는 말을 들은 대상을 가리키는 목적격 대명사입니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'Miss Yeo instructed all of us to order only what (22) ________ could finish to avoid wastage.',
          answer: 'E',
          solution: {
            method: '"우리 모두(all of us)"를 가리키는 주어 대명사를 고른다.',
            steps: [
              '"all of us"(우리 모두)가 다 먹을 수 있는 만큼만 시키라는 지시.',
              '"우리"를 가리키는 주어 대명사는 "we".',
              '보기에서 we는 (E) → 정답 (E).',
            ],
            tip: '목적격(us)이 이미 언급됐다면, 같은 사람들을 주어로 가리킬 때는 주격(we)을 씁니다.',
          },
        },
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'When I got home, I told (23) ________ mother about the campaign.',
          answer: 'C',
          solution: {
            method: '화자(I) 자신의 엄마를 가리키는 소유격을 고른다.',
            steps: [
              '주어가 "I"(나)이고, "엄마"는 나의 엄마.',
              '1인칭 소유격은 "my".',
              '보기에서 my는 (C) → 정답 (C).',
            ],
            tip: '"I"의 소유격은 my입니다(my mother = 나의 엄마).',
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem: 'She was happy as (24) ________ will teach me good eating habits.',
          answer: 'B',
          solution: {
            method: '앞에서 언급된 사물(캠페인)을 대신하는 대명사를 고른다.',
            steps: [
              '문맥상 "좋은 식습관을 가르쳐줄 것"의 주체는 앞서 언급된 "the campaign"(캠페인, 사물).',
              '사물을 대신하는 주어 대명사는 "it".',
              '보기에서 it은 (B) → 정답 (B).',
            ],
            tip: '캠페인/제도처럼 사물·개념을 가리킬 때는 it을 씁니다.',
          },
        },
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: 'The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign.',
          answer: 'A',
          solution: {
            method: '뒤에 나오는 "give me"의 me와 같은 사람(화자 자신)을 가리키는 주어 대명사를 고른다.',
            steps: [
              '"...give me more details" — me는 화자 자신.',
              '화자 자신을 가리키는 1인칭 단수 주어는 "I".',
              '보기에서 I는 (A) → 정답 (A). (남은 단어 없이 5개 모두 사용 완료)',
            ],
            tip: '문장 안에 "me"가 나오면 같은 문장의 주어는 보통 "I"입니다(같은 화자).',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Vocabulary Cloze (5 x 1m) — Q26–30
    // 보기: (A) carried (B) medicine (C) pet (D) scratches (E) whining
    // 지문: Hazel과 길 잃은 강아지
    // =========================================================================
    {
      kind: 'set',
      id: 'chswa1-secD-vcloze',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write its letter (A to E) in each blank. USE EACH WORD ONCE ONLY. Box: (A) carried  (B) medicine  (C) pet  (D) scratches  (E) whining',
      passage:
        'Hazel adored animals. She wanted to own a (26) ________, but her parents could not afford to buy one. One day, Hazel was at the park when she heard an animal (27) ________ in pain. It was a stray puppy with many (28) ________ on its body. She gently (29) ________ the puppy to a veterinary clinic nearby. The vet applied some (30) ________ on the scratches. After the visit, Hazel decided to keep the puppy.',
      marks: 5,
      questions: [
        {
          questionNo: '26',
          format: 'fib',
          marks: 1,
          stem: 'She wanted to own a (26) ________, but her parents could not afford to buy one.',
          answer: 'C',
          solution: {
            method: '"동물을 좋아해서 갖고 싶어한 것"이 무엇인지 생각한다.',
            steps: [
              '"Hazel adored animals. She wanted to own a ___" → 키우고 싶은 동물 = 애완동물.',
              '"pet"(애완동물)이 가장 자연스럽다.',
              '보기에서 pet은 (C) → 정답 (C).',
            ],
            tip: '"own a pet"은 애완동물을 키운다는 뜻의 흔한 표현입니다.',
          },
        },
        {
          questionNo: '27',
          format: 'fib',
          marks: 1,
          stem: 'Hazel was at the park when she heard an animal (27) ________ in pain.',
          answer: 'E',
          solution: {
            method: '아픈 동물이 내는 소리를 나타내는 단어를 고른다.',
            steps: [
              '"heard an animal ___ in pain" — 아파서 내는 소리.',
              '"whining" = 낑낑대는 소리 → 아픈 동물(특히 개)이 내는 소리.',
              '보기에서 whining은 (E) → 정답 (E).',
            ],
            tip: '"whining"은 강아지가 아프거나 슬플 때 내는 낑낑거리는 소리를 나타냅니다.',
          },
        },
        {
          questionNo: '28',
          format: 'fib',
          marks: 1,
          stem: 'It was a stray puppy with many (28) ________ on its body.',
          answer: 'D',
          solution: {
            method: '강아지 몸에 난 상처의 종류를 나타내는 단어를 고른다.',
            steps: [
              '"a stray puppy with many ___ on its body" — 몸에 난 상처들.',
              '"scratches" = 긁힌 상처들 → 아파서 낑낑거리는 강아지의 상태와 일치.',
              '보기에서 scratches는 (D) → 정답 (D).',
            ],
            tip: '뒤에 나오는 "the vet applied some medicine on the scratches"와 연결해 확인할 수 있습니다.',
          },
        },
        {
          questionNo: '29',
          format: 'fib',
          marks: 1,
          stem: 'She gently (29) ________ the puppy to a veterinary clinic nearby.',
          answer: 'A',
          solution: {
            method: '강아지를 동물병원까지 옮긴 동작을 나타내는 동사를 고른다.',
            steps: [
              '"gently ___ the puppy to a veterinary clinic" — 강아지를 조심스럽게 데려갔다.',
              '"carried" = (안아서) 데려갔다 → 아픈 강아지를 옮기는 동작에 자연스럽다.',
              '보기에서 carried는 (A) → 정답 (A).',
            ],
            tip: '"gently carried"는 다친 동물을 조심스럽게 안아 옮길 때 쓰는 표현입니다.',
          },
        },
        {
          questionNo: '30',
          format: 'fib',
          marks: 1,
          stem: 'The vet applied some (30) ________ on the scratches.',
          answer: 'B',
          solution: {
            method: '상처에 발라주는 것을 나타내는 단어를 고른다.',
            steps: [
              '"The vet applied some ___ on the scratches" — 상처에 무언가를 발랐다.',
              '"medicine" = 약 → 상처에 바르는 약품.',
              '보기에서 medicine은 (B) → 정답 (B). (5개 보기 모두 사용 완료)',
            ],
            tip: '"apply medicine on a wound"는 상처에 약을 바른다는 뜻의 표현입니다.',
          },
        },
      ],
    },
  ],
};

export default wa1CatholicHighPrimaryEnglish2023;
