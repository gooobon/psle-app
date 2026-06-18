// =============================================================================
// src/data/p3/english/papers/wa1_rosyth_primary_english_2023.ts
// Rosyth School — Weighted Assessment One (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 208–217 (시험지 표지 p.1–10)
// Duration: 50 minutes / Total: 35 marks
// 주의: 표지에 연도 없음. 모음집 배열상 2023으로 처리(검증 권장).
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(4) B어휘(3) C문법클로즈(4) D어휘클로즈(4) E문장조작(2)
//       F독해클로즈(3) G시각자료독해(5) H독해(10) = 35점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1RosythPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Rosyth School',
    year: 2023,
    assessment: 'Weighted Assessment One',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 35,
    sourcePages: 'pp.208–217 (paper pp.1–10)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (4 marks) — Q1–4
    // =========================================================================
    {
      kind: 'single',
      id: 'rosyth-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last week, the students ________ reminded to bring their thermometers daily.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '4',
      solution: {
        method: '주어의 수(복수)와 시간 표지("Last week")를 본다.',
        steps: [
          '"Last week"은 과거 시점을 나타낸다.',
          '주어 "the students"는 복수.',
          '복수 주어 + 과거 be동사 → were → 정답 (4).',
        ],
        tip: '"Last week"처럼 과거 시간 표현이 있으면 was/were를 씁니다(주어가 복수면 were).',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem:
        '"Look, Mummy, I can ________ around like my pet rabbit!" exclaimed the little girl happily.',
      options: [
        { label: '1', text: 'fly' },
        { label: '2', text: 'hop' },
        { label: '3', text: 'flit' },
        { label: '4', text: 'jump' },
      ],
      answer: '2',
      solution: {
        method: '"애완 토끼처럼" 움직이는 동작에 맞는 동사를 고른다.',
        steps: [
          '토끼(rabbit)가 움직이는 방식은 "hop"(깡충깡충 뛰다).',
          '"hop around like my pet rabbit"가 자연스럽다.',
          'fly(날다)/flit(훌쩍 옮겨다니다, 보통 새·곤충)/jump(점프하다, 토끼보다는 일반적)는 토끼 특유의 움직임과 덜 맞는다 → 정답 (2) hop.',
        ],
        tip: '"hop"은 토끼·개구리처럼 깡충깡충 뛰는 동작을 나타내는 정해진 동사입니다.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'The bakery is located ________ the post office and the bookshop.',
      options: [
        { label: '1', text: 'at' },
        { label: '2', text: 'over' },
        { label: '3', text: 'along' },
        { label: '4', text: 'between' },
      ],
      answer: '4',
      solution: {
        method: '"두 장소 사이"에 위치함을 나타내는 전치사를 고른다.',
        steps: [
          '"the post office AND the bookshop" — 두 장소가 언급됨.',
          '"between A and B" = A와 B 사이에.',
          'at/over/along은 "두 곳 사이"라는 의미를 직접 담지 않는다 → 정답 (4) between.',
        ],
        tip: '"between A and B"는 두 지점/사물 사이의 위치를 나타냅니다.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: '"We are going to make this recycled toy ________," said the girls to their mother.',
      options: [
        { label: '1', text: 'myself' },
        { label: '2', text: 'herself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '3',
      solution: {
        method: '주어 "We"(화자들 자신)에 맞는 재귀대명사를 고른다.',
        steps: [
          '"the girls"가 "We"라고 말하고 있다 → 화자 자신들을 가리킴.',
          '1인칭 복수("We")의 재귀대명사는 "ourselves".',
          '따라서 정답은 (3) ourselves.',
        ],
        tip: '대화 속 "We"가 주어이면 재귀대명사는 ourselves입니다(themselves는 3인칭 관찰자 시점에서 쓰임).',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (3 marks) — Q5–7
    // =========================================================================
    {
      kind: 'single',
      id: 'rosyth-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Sandy had not taken her breakfast so she ________ ate her sandwich at lunch.',
      options: [
        { label: '1', text: 'slowly' },
        { label: '2', text: 'gently' },
        { label: '3', text: 'quickly' },
        { label: '4', text: 'briskly' },
      ],
      answer: '3',
      solution: {
        method: '"아침을 먹지 못해 배고팠다"는 상황에 맞는 식사 속도를 나타내는 부사를 고른다.',
        steps: [
          '"had not taken her breakfast"(아침을 안 먹었다) → 점심때 매우 배고픔.',
          '배고픈 사람은 보통 음식을 "빨리(quickly)" 먹는다.',
          'slowly(천천히)/gently(부드럽게)는 배고픈 상황과 반대, briskly(활발하게)는 보통 걷기 등 움직임에 쓰여 식사에는 덜 어울린다 → 정답 (3) quickly.',
        ],
        tip: '"had not taken breakfast"(배고픔)는 "quickly ate"(빨리 먹었다)와 자연스럽게 연결됩니다.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: '"It\'s a ________ day, today. Let\'s go to the park to fly a kite," said my brother, Tim.',
      options: [
        { label: '1', text: 'windy' },
        { label: '2', text: 'rainy' },
        { label: '3', text: 'cloudy' },
        { label: '4', text: 'stormy' },
      ],
      answer: '1',
      solution: {
        method: '"연을 날리기 좋은 날씨"에 어울리는 형용사를 고른다.',
        steps: [
          '"Let\'s go to the park to fly a kite"(연을 날리러 가자) — 연을 날리려면 바람이 필요하다.',
          '"windy" = 바람이 부는 → 연날리기에 적합한 날씨.',
          'rainy(비 오는)/stormy(폭풍우의)는 연날리기에 부적합, cloudy(흐린)는 바람과 직접 관련 없다 → 정답 (1) windy.',
        ],
        tip: '연날리기(fly a kite)에는 바람(wind)이 필요하므로 windy가 가장 자연스럽습니다.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        'John ________ his sister against the wall in anger when she broke his toy robot.',
      options: [
        { label: '1', text: 'flicked' },
        { label: '2', text: 'pushed' },
        { label: '3', text: 'pointed' },
        { label: '4', text: 'attacked' },
      ],
      answer: '2',
      solution: {
        method: '"~을 벽에 대고 ~했다"는 신체적 동작에 맞는 동사를 고른다.',
        steps: [
          '"___ his sister against the wall"(여동생을 벽에 대고 ~했다) — 신체적으로 밀치는 동작.',
          '"pushed" = 밀었다 → "pushed against the wall"이 자연스럽다.',
          'flicked(가볍게 튕겼다)/pointed(가리켰다)는 약하거나 무관, attacked(공격했다)는 더 강하고 일반적인 단어로 이 문맥의 구체적 동작(against the wall)과 덜 맞는다 → 정답 (2) pushed.',
        ],
        tip: '"push someone against the wall"은 벽으로 밀어붙이는 구체적인 동작을 나타냅니다.',
      },
    },

    // =========================================================================
    // Section C: Grammar Cloze (4 marks) — Q8–11
    // 보기: walked, walk, walking, had walked
    // 지문: Mouse, Owl, Fox 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze',
      instructions:
        'Fill in each blank with the correct word from the box. Use each word once only. Box: walked | walk | walking | had walked',
      passage:
        'One day, Mouse went to the woods. While (8) ________, he saw Owl outside his treetop house. "Hello Owl," Mouse called. "I\'m taking a leisurely (9) ________ through the woods."\n\n' +
        '"Have you seen Fox?" asked Owl. "I was told that he (10) ________ through the woods earlier on too."\n\n' +
        '"No, I have not," replied Mouse. "When I (11) ________ past his logpile house, I did not see him."\n\n' +
        'Then Mouse waved goodbye to Owl and went on his way. He returned home and had a delicious meal.',
      marks: 4,
      questions: [
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'While (8) ________, he saw Owl outside his treetop house.',
          answer: 'walking',
          solution: {
            method: '"While + -ing"(~하는 동안) 구문을 적용한다.',
            steps: [
              '"While ___, he saw Owl" — "걷고 있는 동안 Owl을 보았다".',
              '"While -ing"는 "~하는 동안"이라는 뜻의 분사구문.',
              '따라서 빈칸은 walking.',
            ],
            tip: '"While -ing"는 한 동작이 진행되는 동안 다른 일이 일어났음을 나타냅니다.',
          },
        },
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: '"I\'m taking a leisurely (9) ________ through the woods."',
          answer: 'walk',
          solution: {
            method: '"a leisurely ___"(여유로운 ~) — 명사 형태를 고른다.',
            steps: [
              '"take a ___"(~을 하다) 뒤에는 명사가 온다.',
              '"a leisurely walk" = 여유로운 산책(명사).',
              '따라서 빈칸은 walk.',
            ],
            tip: '"take a walk/rest/break"처럼 "take a + 명사"는 "~을 하다"라는 뜻입니다.',
          },
        },
        {
          questionNo: '10',
          format: 'fib',
          marks: 1,
          stem: '"I was told that he (10) ________ through the woods earlier on too."',
          answer: 'walked',
          solution: {
            method: '"earlier on"(앞서/이전에)이라는 과거 표현에 맞는 동사 형태를 고른다.',
            steps: [
              '"earlier on"은 과거의 한 시점을 가리킨다.',
              '단순과거형은 walked.',
              '따라서 "he walked through the woods earlier on" → 정답 walked.',
            ],
            tip: '"earlier on/earlier today"는 단순과거시제와 자주 함께 쓰입니다.',
          },
        },
        {
          questionNo: '11',
          format: 'fib',
          marks: 1,
          stem: '"When I (11) ________ past his logpile house, I did not see him."',
          answer: 'had walked',
          solution: {
            method: '남은 보기(had walked)를 적용하고 과거완료의 의미를 확인한다.',
            steps: [
              '나머지 세 단어(walking/walk/walked)는 이미 Q8~10에서 사용됨 → 남은 단어는 "had walked".',
              '"When I had walked past his house, I did not see him."은 "그의 집을 지나갔을 때(그 전에 이미 지나간 상태)는 그를 보지 못했다"는 의미로 자연스럽다.',
              '따라서 빈칸은 had walked.',
            ],
            tip: '단어를 한 번씩만 쓰는 클로즈 문제는, 남은 단어가 자연스럽게 맞는지 마지막에 확인합니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Vocabulary Cloze (4 marks) — Q12–15
    // 보기: angry, spotted, nobody, agreed, somebody, captured (6개 중 4개)
    // 지문: Bear, Fox 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secD-vcloze',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions:
        'Fill in each blank with the correct word from the box. Use each word once only. Box: angry | spotted | nobody | agreed | somebody | captured',
      passage:
        'One day, Bear went hunting in the forest. He (12) ________ a hare and chased it. While chasing the hare, Bear crashed into a thorny bush. A huge thorn poked his paw.\n\n' +
        '"Remove this thorn for me!" Bear roared but (13) ________ dared to help as they were afraid of him. Finally, Fox approached Bear and said, "I will remove the thorn on one condition. You must promise not to hurt any of us again."\n\n' +
        'Upon hearing this, Bear became (14) ________ and refused. However, his paw hurt badly and only Fox had come forward to help him. In the end, he reluctantly (15) ________. He thanked Fox for removing the thorn from his paw. From that day onwards, Fox was greatly admired for courageously standing up to Bear.',
      marks: 4,
      questions: [
        {
          questionNo: '12',
          format: 'fib',
          marks: 1,
          stem: 'He (12) ________ a hare and chased it.',
          answer: 'spotted',
          solution: {
            method: '"발견하고 쫓았다"는 흐름에 맞는 동사를 고른다.',
            steps: [
              '"He ___ a hare and chased it" — 토끼를 발견한 후 쫓았다.',
              '"spotted" = 발견했다/알아챘다 → 쫓기 전의 동작으로 자연스럽다.',
              '따라서 빈칸은 spotted.',
            ],
            tip: '"spotted ... and chased"는 "발견 → 추격"의 자연스러운 순서입니다.',
          },
        },
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem:
            '"Remove this thorn for me!" Bear roared but (13) ________ dared to help as they were afraid of him.',
          answer: 'nobody',
          solution: {
            method: '"~ 때문에 아무도 돕지 못했다"는 의미에 맞는 단어를 고른다.',
            steps: [
              '"as they were afraid of him"(그를 무서워했기 때문에) → 도와줄 사람이 없었다는 의미.',
              '"nobody dared to help" = 아무도 돕지 못했다.',
              '따라서 빈칸은 nobody.',
            ],
            tip: '"afraid of him"(그를 무서워함)은 "nobody helped"(아무도 돕지 않음)와 자연스럽게 이어집니다.',
          },
        },
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Upon hearing this, Bear became (14) ________ and refused.',
          answer: 'angry',
          solution: {
            method: '"거절했다(refused)"는 행동과 짝을 이루는 감정을 고른다.',
            steps: [
              'Fox의 조건("다시는 우리를 해치지 않겠다고 약속해야 한다")을 들은 Bear의 반응.',
              '거만한 Bear가 조건을 듣고 화를 냄 → "angry"(화난).',
              '따라서 "became angry and refused" → 정답 angry.',
            ],
            tip: '"refused"(거절했다) 앞에는 보통 부정적 감정(angry)이 옵니다.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'In the end, he reluctantly (15) ________.',
          answer: 'agreed',
          solution: {
            method: '"마지못해 ~했다"는 표현과 이야기의 결말을 연결한다.',
            steps: [
              '"his paw hurt badly and only Fox had come forward to help him" — 결국 도움이 필요했음.',
              '"reluctantly ___" = 마지못해 ~했다 → Fox의 조건을 받아들였다는 의미.',
              '"agreed" = 동의했다 → "reluctantly agreed"(마지못해 동의했다) → 정답 agreed. (남은 somebody·captured는 사용되지 않음)',
            ],
            tip: '"reluctantly agreed"는 내키지 않지만 결국 받아들였다는 뜻입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E: Sentence Manipulation (2 marks) — Q16–17
    // =========================================================================
    {
      kind: 'single',
      id: 'rosyth-q16',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 16,
      marks: 1,
      stem:
        'Rewrite the given sentences as ONE sentence using the word provided. The meaning must be the same.\n' +
        'Tom forgot to attend the soccer practice. Tom\'s teacher was not angry.\n' +
        '________________________________________ but ________________________________________.',
      answer: "Tom forgot to attend the soccer practice, but his teacher was not angry.",
      solution: {
        method: '두 사건을 대조 접속사 "but"으로 연결한다.',
        steps: [
          '앞: Tom이 축구 연습에 빠짐(부정적) / 뒤: 선생님이 화내지 않음(예상과 다른 결과).',
          '"but"(그러나)으로 두 문장을 연결: "Tom forgot to attend the soccer practice, but..."',
          '반복되는 "Tom\'s teacher"는 "his teacher"로 줄여 쓴다.',
          '완성: "Tom forgot to attend the soccer practice, but his teacher was not angry."',
        ],
        tip: '예상(혼날 것 같음)과 다른 결과(화내지 않음)가 이어질 때 "but"으로 연결합니다.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q17',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 17,
      marks: 1,
      stem:
        'Rewrite the given sentences as ONE sentence using the word provided. The meaning must be the same.\n' +
        'Mary bought eggs and butter at the supermarket. Mary wanted to bake a cake.\n' +
        '________________________________________ so ________________________________________.',
      answer: 'Mary wanted to bake a cake, so she bought eggs and butter at the supermarket.',
      solution: {
        method: '"so"는 원인 뒤에 결과를 연결하므로, 원인(목적)을 먼저 배치한다.',
        steps: [
          '두 사건의 관계: "케이크를 만들고 싶었다"(목적/원인) → "그래서 슈퍼마켓에서 계란과 버터를 샀다"(결과/행동).',
          '"so"(그래서)는 "[원인], so [결과]" 순서로 쓴다.',
          '"Mary wanted to bake a cake, so she bought eggs and butter at the supermarket."',
          '두 번째 Mary는 "she"로 바꾼다.',
        ],
        tip: '"so" 문제는 두 문장 중 어느 것이 "원인(목적)"이고 어느 것이 "결과(행동)"인지 먼저 파악한 뒤, 원인을 앞에 둡니다.',
      },
    },

    // =========================================================================
    // Section F: Comprehension Cloze (3 marks) — Q18–20
    // ONE WORD per blank. 지문: Green Tree Frog
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secF-ccloze',
      topic: 'ComprehensionFIB',
      title: 'Section F: Comprehension Cloze',
      instructions:
        'Read the passage carefully. Fill in each of the blanks with the most suitable word. YOU ARE ALLOWED TO USE ONLY ONE WORD FOR EACH BLANK.',
      passage:
        'Dogs and cats are commonly kept as pets but do you know that frogs can be good pets too? The Green Tree Frog is the most (18) ________ type of frog that people keep as pets.\n\n' +
        'The Green Tree Frog is (19) ________ in most parts of Australia. Its skin is usually bright green but can change to olive green. It has sticky pads on its toes which enable it to climb up flat surfaces without falling.\n\n' +
        'As adults, they can (20) ________ up to 10 cm long and live for 25 years! The Green Tree Frog is a solitary animal and it likes to live alone.\n\n' +
        '(Adapted from Frogs As Pets)',
      marks: 3,
      questions: [
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem:
            'The Green Tree Frog is the most (18) ________ type of frog that people keep as pets.',
          answer: 'common',
          solution: {
            method: '"사람들이 애완용으로 가장 많이 기르는"이라는 의미에 맞는 단어를 넣는다.',
            steps: [
              '"the most ___ type of frog that people keep as pets" — 사람들이 가장 많이 선택하는 종류.',
              '"common" = 흔한, 일반적인 → "가장 흔하게 기르는 종류"라는 의미에 적합.',
              '따라서 빈칸은 common. (공식 정답표 확인됨)',
            ],
            tip: '"the most common type that people keep"은 "사람들이 가장 흔히 기르는 종류"라는 뜻입니다.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'The Green Tree Frog is (19) ________ in most parts of Australia.',
          answer: 'found',
          solution: {
            method: '"~에서 발견된다/서식한다"는 의미에 맞는 단어를 넣는다.',
            steps: [
              '"The Green Tree Frog is ___ in most parts of Australia" — 호주 대부분 지역에 산다는 의미.',
              '"found" = 발견되다 → "is found in"(~에서 발견된다, 즉 ~에 서식한다)는 동식물의 분포를 설명하는 정해진 표현.',
              '따라서 빈칸은 found.',
            ],
            tip: '"is found in [지역]"은 동식물의 서식 분포를 설명하는 표현입니다.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'As adults, they can (20) ________ up to 10 cm long and live for 25 years!',
          answer: 'grow',
          solution: {
            method: '"~까지 자란다"는 의미에 맞는 동사를 넣는다.',
            steps: [
              '"can ___ up to 10 cm long" — 길이가 10cm까지 커진다는 의미.',
              '"grow up to [길이]" = ~까지 자라다.',
              '따라서 빈칸은 grow.',
            ],
            tip: '"grow up to [크기/길이]"는 동식물의 성장 크기를 설명하는 표현입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section G: Visual Text Comprehension (5 marks) — Q21–25
    // 광고: Be Kind to Animals Day (Daisy Animal Shelter)
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secG-visualtext',
      topic: 'VisualText',
      title: 'Section G: Visual Text Comprehension — Be Kind to Animals Day',
      instructions: 'Study the poster carefully and then answer questions 21 to 25.',
      passage:
        'BE KIND TO ANIMALS DAY\n' +
        'Organised by Daisy Animal Shelter\n' +
        'Venue: Tanjong Puteh Park\n' +
        'Date: Saturday, 29 May 2021\n' +
        'Time: 9am to 5pm\n\n' +
        'Come with your family! Help us to provide care for these wonderful animals.\n\n' +
        'Are you ready to adopt a pet? Talks by Dr Shane & Dr Juliet\n' +
        '- "Am I ready for a pet?" Time: 11.00am – 11.30am\n' +
        '- "What is a healthy diet for my pet?" Time: 1.00pm – 1.30pm\n' +
        '- "Why exercise my pet?" Time: 3.00pm – 3.30pm\n\n' +
        'Pet Adoption\n' +
        'Come and view our adorable rescued animals. Adopt! Don\'t buy. Please give an abandoned pet a loving home.\n\n' +
        'Items for Sale\n' +
        'Pet food — Find a wide variety of food just for your precious pet.\n' +
        'Pet toys — Your pet will not be bored anymore!\n' +
        'Pet toiletries — Sweet-smelling shampoos and conditioners made from natural ingredients.\n' +
        'Get a free diary when you spend at least $60 on any of the above items.\n\n' +
        'For more information on pet adoption, please contact:\n' +
        '- Mdm Lim at 6762 9000 or lim@daisyanimalshelter.com\n' +
        '- Mdm Rani at 6762 9001 or rani@daisyanimalshelter.com',
      marks: 5,
      questions: [
        {
          questionNo: '21',
          format: 'mcq',
          marks: 1,
          stem: '"Be Kind to Animals Day" is an event held ________.',
          options: [
            { label: '1', text: 'throughout the month' },
            { label: '2', text: 'at the end of the month' },
            { label: '3', text: 'in the middle of the month' },
            { label: '4', text: 'at the beginning of the month' },
          ],
          answer: '2',
          solution: {
            method: '포스터의 날짜(29 May)를 한 달 안에서의 위치로 환산한다.',
            steps: [
              '포스터: "Date: Saturday, 29 May 2021".',
              '5월은 31일까지 있으므로 29일은 달의 "끝부분"에 해당한다.',
              '"throughout the month"(한 달 내내)/"in the middle"(중반)/"at the beginning"(초반)은 29일과 안 맞는다 → 정답 (2) at the end of the month.',
            ],
            tip: '날짜 숫자가 그 달의 마지막 날짜에 가까우면 "at the end of the month"입니다.',
          },
        },
        {
          questionNo: '22',
          format: 'mcq',
          marks: 1,
          stem: 'The main purpose of the event is to ________.',
          options: [
            { label: '1', text: 'give out free diaries' },
            { label: '2', text: 'promote the sale of pets' },
            { label: '3', text: 'find homes for rescued animals' },
            { label: '4', text: 'teach pet owners about pet hygiene' },
          ],
          answer: '3',
          solution: {
            method: '포스터의 핵심 메시지("Pet Adoption" 섹션)를 확인한다.',
            steps: [
              '"Pet Adoption" 섹션: "Come and view our adorable rescued animals. Adopt! Don\'t buy. Please give an abandoned pet a loving home."',
              '이는 구조된 동물들에게 새로운 집(입양 가정)을 찾아주려는 목적을 직접 나타낸다.',
              '무료 다이어리(1)·판매 촉진(2)·위생 교육(4)은 부수적이거나 포스터의 핵심 목적이 아니다 → 정답 (3).',
            ],
            tip: '"main purpose"는 포스터에서 가장 강조된 섹션(여기서는 Pet Adoption)에서 찾습니다.',
          },
        },
        {
          questionNo: '23',
          format: 'mcq',
          marks: 1,
          stem: 'You can buy any of the following items at the event except ________.',
          options: [
            { label: '1', text: 'toys' },
            { label: '2', text: 'food' },
            { label: '3', text: 'diaries' },
            { label: '4', text: 'shampoos' },
          ],
          answer: '3',
          solution: {
            method: '"Items for Sale" 목록과 "free diary"의 차이를 구분한다.',
            steps: [
              '"Items for Sale": Pet food, Pet toys, Pet toiletries(샴푸 등) — 이들은 판매 품목.',
              '다이어리는 "Get a free diary when you spend at least $60"라고 명시 — 판매 품목이 아니라 "무료 증정품".',
              '따라서 살 수 없는(판매하지 않는) 것은 (3) diaries.',
            ],
            tip: '"free gift"(무료 증정품)는 "for sale"(판매 품목)과 다릅니다.',
          },
        },
        {
          questionNo: '24',
          format: 'mcq',
          marks: 1,
          stem: 'The organiser of the event is ________.',
          options: [
            { label: '1', text: 'Dr Juliet' },
            { label: '2', text: 'Dr Shane' },
            { label: '3', text: 'Tanjung Puteh Park' },
            { label: '4', text: 'Daisy Animal Shelter' },
          ],
          answer: '4',
          solution: {
            method: '포스터 상단의 "Organised by" 항목을 확인한다.',
            steps: [
              '포스터: "Organised by Daisy Animal Shelter".',
              'Dr Shane/Dr Juliet은 강연자, Tanjong Puteh Park은 장소(venue)일 뿐 주최자가 아니다.',
              '따라서 정답은 (4) Daisy Animal Shelter.',
            ],
            tip: '"Organised by"는 행사 주최자를 직접 명시하는 표현입니다.',
          },
        },
        {
          questionNo: '25',
          format: 'mcq',
          marks: 1,
          stem: 'Which one of the following statements is true?',
          options: [
            { label: '1', text: 'You may buy a pet at this event.' },
            { label: '2', text: 'Get a free gift when you spend $50.' },
            { label: '3', text: 'Contact Mdm Lim for more information.' },
            { label: '4', text: 'Dr Juliet will give a talk on how to choose a pet.' },
          ],
          answer: '3',
          solution: {
            method: '각 보기를 포스터의 내용과 하나씩 대조한다.',
            steps: [
              '(1) "Adopt! Don\'t buy." — 동물은 입양(무료)하는 것이지 구매하는 것이 아니다 → 거짓.',
              '(2) "spend at least $60"으로 명시되어 있는데 보기는 "$50" → 금액 불일치 → 거짓.',
              '(3) "For more information on pet adoption, please contact: Mdm Lim at 6762 9000..." → 참.',
              '(4) 강연 제목들("Am I ready for a pet?", "What is a healthy diet...", "Why exercise my pet?") 중 "how to choose a pet"이라는 주제는 없고, 특정 강연자(Dr Juliet)와 짝지어진 내용도 명시되지 않음 → 거짓.',
              '따라서 참인 진술은 (3).',
            ],
            tip: '광고 속 숫자(금액 등)는 정확히 일치하는지 항상 다시 확인하세요($60 vs $50).',
          },
        },
      ],
    },

    // =========================================================================
    // Section H: Comprehension (10 marks) — Q26–32
    // 지문: Gloomy the Big Black Cloud
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secH-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section H: Comprehension — Gloomy the Big Black Cloud',
      instructions: 'Read the following passage carefully. Then write the answers for questions 26 to 32.',
      passage:
        'One hot day, Gloomy, the big black cloud, was sitting high up in the sky of the village. He had grown bigger and fatter due to the hot weather. Now, he was so big that he almost filled up the whole sky.\n\n' +
        'However, Gloomy had a problem. Try as he might, he could not rain. He was ashamed and did not want anyone to know. Gloomy felt worried. The villagers below were waiting patiently for him to provide enough water for their farms. Finally, he had no choice but to get help. He looked towards Cloud Land and saw several dark clouds from afar. He called Wind and said, "Please blow those dark clouds towards me." Wind did not like to be told what to do so he ignored Gloomy.\n\n' +
        'Feeling annoyed because Wind ignored him, Gloomy asked Lightning to flash his light at Wind. As Wind was afraid of Lightning, he quickly blew the dark clouds towards Gloomy. As soon as the dark clouds joined Gloomy, the rain fell.\n\n' +
        'Gloomy felt very happy and satisfied. With the help of the few dark clouds, he knew he had done a good job as the villagers had enough water for farming. After raining for a while, Gloomy started to shrink. Eventually, he disappeared but he knew that when the summer sun heats up the sky, he would appear again to provide more water for the land.\n\n' +
        '(Adapted from: Gloomy The Big Black Cloud)',
      marks: 10,
      questions: [
        {
          questionNo: '26',
          format: 'open',
          marks: 1,
          stem: 'Who was Gloomy?',
          answer: 'Gloomy was a/the big black cloud (in the sky above the village).',
          solution: {
            method: '1단락 첫 문장에서 Gloomy의 정체를 확인한다.',
            steps: [
              '1단락: "One hot day, Gloomy, the big black cloud, was sitting high up in the sky of the village."',
              'Gloomy는 "큰 검은 구름"이다.',
              '완전한 문장으로: "Gloomy was a big black cloud."',
            ],
            tip: '"Who was ~"는 인물(또는 캐릭터)의 정체를 묻는 질문으로, 보통 처음 등장하는 문장에서 답을 찾습니다.',
          },
        },
        {
          questionNo: '27',
          format: 'open',
          marks: 1,
          stem: "What was Gloomy's problem?",
          answer: 'Gloomy\'s problem was that he could not rain (no matter how hard he tried).',
          solution: {
            method: '2단락 첫 문장에서 Gloomy의 문제를 직접 찾는다.',
            steps: [
              '2단락: "However, Gloomy had a problem. Try as he might, he could not rain."',
              'Gloomy의 문제는 비를 내릴 수 없다는 것.',
              '완전한 문장으로: "Gloomy\'s problem was that he could not rain."',
            ],
            tip: '"had a problem" 바로 뒤 문장이 문제의 구체적인 내용을 설명합니다.',
          },
        },
        {
          questionNo: '28',
          format: 'open',
          marks: 1,
          stem: "Which word in paragraph 3 has the same meaning as 'displeased'?",
          answer: 'annoyed',
          solution: {
            method: "displeased(불쾌한, 마음에 들지 않는)와 같은 뜻의 단어를 3단락에서 찾는다.",
            steps: [
              '3단락: "Feeling annoyed because Wind ignored him, Gloomy asked Lightning to flash his light at Wind."',
              '"annoyed" = 짜증난/언짢은 → displeased와 의미가 통한다.',
              '따라서 답은 annoyed.',
            ],
            tip: '"annoyed"는 displeased(불쾌해하는)와 자주 교체되어 쓰이는 동의어입니다.',
          },
        },
        {
          questionNo: '29',
          format: 'open',
          marks: 3,
          stem:
            'For (a) to (c), read each statement and tick "True" or "False".\n' +
            '(a) The villagers did not have enough water for their farms at first.\n' +
            '(b) Gloomy gathered the dark clouds over on his own.\n' +
            '(c) Wind immediately helped Gloomy when he asked for help.',
          answer: '(a) True  (b) False  (c) False',
          solution: {
            method: '각 진술을 2~3단락의 사실과 대조한다.',
            steps: [
              '(a) 2단락: "The villagers below were waiting patiently for him to provide enough water for their farms." — 처음에는 물이 충분하지 않아 기다리고 있었음 → True.',
              '(b) 2단락: Gloomy는 혼자서가 아니라 "had no choice but to get help"하여 Wind와 Lightning의 도움을 받아 어두운 구름을 모았다 → "on his own"(혼자서)은 거짓 → False.',
              '(c) 2단락: "Wind did not like to be told what to do so he ignored Gloomy." — Wind는 즉시 돕지 않고 무시했다 → False.',
            ],
            tip: '"on his own"(혼자서), "immediately"(즉시)처럼 절대적인 표현이 들어간 진술은 지문과 정확히 일치하는지 꼼꼼히 확인하세요.',
          },
        },
        {
          questionNo: '30',
          format: 'open',
          marks: 1,
          stem: 'Why was Gloomy angry at Wind?',
          answer:
            'Gloomy was angry at Wind because Wind ignored him (refused to blow the dark clouds towards him when he asked for help).',
          solution: {
            method: '3단락 첫 부분에서 Gloomy가 화난 이유를 찾는다.',
            steps: [
              '3단락: "Feeling annoyed because Wind ignored him..."',
              'Gloomy가 화난 이유는 Wind가 그를 무시했기 때문(도와달라는 부탁을 무시함).',
              '완전한 문장으로 이유를 서술한다.',
            ],
            tip: '"Feeling [감정] because ~"에서 because 뒤가 바로 이유입니다.',
          },
        },
        {
          questionNo: '31',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks below to indicate the order in which the events happened in the story.\n' +
            '( ) A few dark clouds joined Gloomy.\n' +
            '( ) Lightning frightened Wind.\n' +
            '( ) Gloomy rained.',
          answer:
            'Lightning frightened Wind = 1; A few dark clouds joined Gloomy = 2; Gloomy rained = 3',
          solution: {
            method: '3단락의 사건 순서(번개 → 구름 합류 → 비)를 따라간다.',
            steps: [
              '3단락: "Gloomy asked Lightning to flash his light at Wind. As Wind was afraid of Lightning, he quickly blew the dark clouds towards Gloomy. As soon as the dark clouds joined Gloomy, the rain fell."',
              '먼저: Lightning이 Wind를 향해 빛을 번쩍여 Wind를 두렵게 함 → 1.',
              '그 다음: (두려워진 Wind가 구름을 불어 보내) 어두운 구름들이 Gloomy와 합류함 → 2.',
              '마지막: 비가 내림 → 3.',
            ],
            tip: '"As soon as A, B"는 A 다음에 곧바로 B가 일어났음을 나타냅니다(A=2번, B=3번).',
          },
        },
        {
          questionNo: '32',
          format: 'open',
          marks: 2,
          stem: 'Why did Gloomy feel satisfied after he had rained?',
          answer:
            'Gloomy felt satisfied because, with the help of the dark clouds, he had done a good job — the villagers now had enough water for their farming.',
          solution: {
            method: '4단락 첫 부분에서 만족한 이유를 찾는다.',
            steps: [
              '4단락: "Gloomy felt very happy and satisfied. With the help of the few dark clouds, he knew he had done a good job as the villagers had enough water for farming."',
              '만족한 이유는 (어두운 구름들의 도움으로) 일을 잘 해냈고, 농사에 필요한 물을 마을 사람들에게 충분히 제공했기 때문.',
              '두 가지 요소(좋은 일을 해냄 + 마을 사람들이 충분한 물을 얻음)를 포함해 완전한 문장으로 답한다.',
            ],
            tip: '"felt satisfied because ~" 직후 문장의 "as ~"절이 구체적인 이유를 보충 설명합니다.',
          },
        },
      ],
    },
  ],
};

export default wa1RosythPrimaryEnglish2023;
