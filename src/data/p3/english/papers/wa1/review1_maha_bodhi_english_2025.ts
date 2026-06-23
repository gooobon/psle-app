// =============================================================================
// src/data/p3/english/papers/review1_maha_bodhi_english_2025.ts
// Maha Bodhi School — 2025 Weighted Assessment 1, English Language Review (1) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 235–241 (시험지 표지 p.1~6, 8~11)
// Duration: 50 minutes / Total: 30 marks / Date: 7 May 2025
// ★ 공식 정답표(p243) 기준 Q1-2, Q14-Q29 확인됨.
// ⚠ Q3-Q13(Section A Q3-6, Section B Q7-11, Section C Q12-13): 원본 인쇄 p2-5가
//   PDF에서 별도 페이지로 분리 스캔되어 원문 확인 불가 → parentVerify: true 처리.
//   정답만 정답표 기준으로 기재 (Q3=1, Q4=4, Q5=4, Q6=2, Q7=3, Q8=3, Q9=4, Q10=4, Q11=1, Q12=2, Q13=4).
// 듣기·작문 제외. 확인된 문제는 100% 전사 + 상세 solution 포함.
// 구성: A문법(6) B어휘(5) C문장부호(2) D문법클로즈(4) E어휘클로즈(5) F독해(8) = 30점
// =============================================================================

import type { EnglishPaper } from '../types';

export const review1MahaBodhiEnglish2025: EnglishPaper = {
  meta: {
    school: 'Maha Bodhi School',
    year: 2025,
    assessment: 'Weighted Assessment 1 — English Language Review (1)',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 30,
    sourcePages: 'pp.235–241 (paper pp.1, 6–11)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (6 x 1 mark) — Q1–6
    // Q1-2는 원문 확인됨 / Q3-6는 원문 미확인 (parentVerify)
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2025-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last Thursday, my friends and I ________ to the cinema.',
      options: [
        { label: '1', text: 'go' },
        { label: '2', text: 'went' },
        { label: '3', text: 'are going' },
        { label: '4', text: 'were going' },
      ],
      answer: '2',
      solution: {
        method: '"Last Thursday"(과거 시점)에 맞는 동사 시제를 정한다.',
        steps: [
          '"Last Thursday"는 명확한 과거 시점을 나타낸다.',
          'go의 과거형은 went.',
          '따라서 "my friends and I went to the cinema" → 정답 (2) went.',
        ],
        tip: '"Last + time expression"은 과거시제(went, made, was 등)와 함께 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Ruby ________ when her cat jumped onto her bed.',
      options: [
        { label: '1', text: 'slept' },
        { label: '2', text: 'sleeps' },
        { label: '3', text: 'is sleeping' },
        { label: '4', text: 'was sleeping' },
      ],
      answer: '4',
      solution: {
        method: '"when + past event"이 일어났을 때 진행 중이던 동작을 나타낸다.',
        steps: [
          '"when her cat jumped onto her bed" — "jumped"는 과거의 한순간.',
          '그 순간 Ruby는 자고 있는 "in the middle of / during"이었다 → 과거진행형.',
          '주어 "Ruby"는 단수 → "was sleeping" → 정답 (4).',
        ],
        tip: '"when + Simple Past (a single moment in the past)"에서 진행 중이던 동작은 was/were -ing로 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (1))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '1',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표에서 정답 (1)로 확인됨.',
        steps: ['원본 PDF 인쇄 p2-5 해당 페이지 미발견.', '공식 정답표(p243) 기준: Q3 정답 = (1).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (4))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (4).',
        steps: ['공식 정답표(p243) 기준: Q4 정답 = (4).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (4))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (4).',
        steps: ['공식 정답표(p243) 기준: Q5 정답 = (4).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (2))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '2',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (2).',
        steps: ['공식 정답표(p243) 기준: Q6 정답 = (2).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (5 x 1 mark) — Q7–11 (원문 미확인)
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2025-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (3))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '3',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (3).',
        steps: ['공식 정답표(p243) 기준: Q7 정답 = (3).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (3))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '3',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (3).',
        steps: ['공식 정답표(p243) 기준: Q8 정답 = (3).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (4))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (4).',
        steps: ['공식 정답표(p243) 기준: Q9 정답 = (4).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (4))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (4).',
        steps: ['공식 정답표(p243) 기준: Q10 정답 = (4).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (1))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '1',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (1).',
        steps: ['공식 정답표(p243) 기준: Q11 정답 = (1).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },

    // =========================================================================
    // Section C: Punctuation (2 x 1 mark) — Q12–13 (원문 미확인)
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2025-q12',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (2))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '2',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (2).',
        steps: ['공식 정답표(p243) 기준: Q12 정답 = (2).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q13',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: '(원문 미확인 — 정답표 기준 정답: (4))',
      options: [
        { label: '1', text: '(보기 1)' },
        { label: '2', text: '(보기 2)' },
        { label: '3', text: '(보기 3)' },
        { label: '4', text: '(보기 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: '원문 미확인 — 공식 정답표 기준 정답 (4).',
        steps: ['공식 정답표(p243) 기준: Q13 정답 = (4).'],
        tip: '학부모 확인 후 원문과 보기를 업데이트하세요.',
      },
    },

    // =========================================================================
    // Section D: Grammar Cloze (4 x 1 mark) — Q14–17
    // 보기: his, hers, ours, mine, theirs, yours
    // 지문: Tom and Mary 연습장 이야기 (p236 확인됨)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2025-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D: Grammar Cloze — Possessive Pronouns',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write the answer in the blanks provided. Each word can only be used once. Box: his | hers | ours | mine | theirs | yours',
      passage:
        'The leaders gave out the practice books. Tom and Mary did not receive (14) ________, so both approached the teacher. Only one book without a name was with the teacher. Tom flipped through the pages and realised it was not (15) ________. He told Mary that the book had to be (16) ________. Mary looked at the pages and exclaimed, "Yes! It\'s (17) ________!"\n\n' +
        '"Tom, your book is on your desk!" his classmate exclaimed.\n\n' +
        'Feeling relieved, Tom returned to his seat to get ready for the lesson.',
      marks: 4,
      questions: [
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Tom and Mary did not receive (14) ________, so both approached the teacher.',
          answer: 'theirs',
          solution: {
            method: 'Tom and Mary 두 사람을 함께 가리키는 소유대명사를 고른다.',
            steps: [
              'Tom and Mary 둘 다 받지 못했다 → "belonging to both of them (theirs)".',
              '"they did not receive theirs"(그들 각자의 것을 받지 못했다) → theirs.',
              '따라서 정답 theirs. (공식 정답표 확인됨)',
            ],
            tip: '"both approached the teacher"로 두 사람 모두를 가리키는 소유대명사는 theirs입니다.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'Tom flipped through the pages and realised it was not (15) ________.',
          answer: 'his',
          solution: {
            method: 'Tom 자신의 것인지 확인하는 소유대명사를 고른다.',
            steps: [
              'Tom이 장을 넘겨보다가 "This is not mine"라고 깨달았다.',
              'Tom을 가리키는 소유대명사는 "his"(그의 것).',
              '따라서 "it was not his" → 정답 his. (공식 정답표 확인됨)',
            ],
            tip: 'Tom(남성 단수)의 소유는 his로 나타냅니다.',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'He told Mary that the book had to be (16) ________.',
          answer: 'hers',
          solution: {
            method: 'Tom이 Mary에게 "This is yours"이라고 말하는 소유대명사를 고른다.',
            steps: [
              'Tom은 자신의 것이 아님을 확인하고 → Mary의 것임을 추론.',
              'Mary(여성 단수)의 소유를 가리키는 소유대명사는 "hers".',
              '따라서 "the book had to be hers" → 정답 hers. (공식 정답표 확인됨)',
            ],
            tip: 'Mary(여성 단수)의 소유는 hers로 나타냅니다.',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'Mary looked at the pages and exclaimed, "Yes! It\'s (17) ________!"',
          answer: 'mine',
          solution: {
            method: 'Mary 자신이 확인하며 "Mine"이라고 외치는 소유대명사를 고른다.',
            steps: [
              'Mary가 장을 확인하고 직접 "Yes, this is mine!"라고 외쳤다.',
              '화자(Mary) 자신의 것을 가리키는 소유대명사는 "mine".',
              '따라서 "It\'s mine!" → 정답 mine. (공식 정답표 확인됨)',
            ],
            tip: '"mine"은 화자 자신의 것임을 확인·주장할 때 쓰는 소유대명사입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E: Vocabulary Cloze (5 x 1 mark) — Q18–22
    // 보기: perching, huge, delicious, sly, beautiful, wide, talented, climbing (8개 중 5개)
    // 지문: 원숭이와 까마귀 이야기 (p237 확인됨)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2025-secE-vcloze',
      topic: 'VocabCloze',
      title: 'Section E: Vocabulary Cloze',
      instructions:
        'Read the passage carefully. Choose the best word from the box and write the answer in the blanks provided. Each word can only be used once. Box: perching | huge | delicious | sly | beautiful | wide | talented | climbing',
      passage:
        'A hungry monkey was searching for food. He saw a crow with black feathers (18) ________ on the branch of a tree. What caught his attention was the piece of banana in the crow\'s beak.\n\n' +
        '"No need to search any further," thought the (19) ________ monkey. He was going to trick the crow into giving him the banana.\n\n' +
        'He walked to the bottom of the tree and cried, "Good morning, you\'re such a (20) ________ bird with your shiny black feathers! I\'m sure you have a lovely voice too!"\n\n' +
        'The crow was so pleased to hear the praise and decided to sing for the monkey. She opened its beak (21) ________, all ready to sing. Just then, the banana fell out of her mouth and straight into his.\n\n' +
        'The monkey licked his mouth after eating the piece of (22) ________ banana. After thanking the crow, the monkey walked away.',
      marks: 5,
      questions: [
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: 'He saw a crow with black feathers (18) ________ on the branch of a tree.',
          answer: 'perching',
          solution: {
            method: '새가 나뭇가지에 앉아있는 모습을 나타내는 동사를 고른다.',
            steps: [
              '"perching on the branch" = 나뭇가지에 (새가) 앉아 있다.',
              'perch는 새가 가지·막대 등에 앉아 있는 동작을 나타내는 정확한 단어.',
              '따라서 빈칸은 perching. (공식 정답표 확인됨)',
            ],
            tip: '"perching"은 새가 나뭇가지·철사 등 가느다란 것 위에 앉아 있는 모습을 묘사합니다.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: '"No need to search any further," thought the (19) ________ monkey.',
          answer: 'sly',
          solution: {
            method: '"trying to trick the crow to get the banana" 원숭이의 성격을 나타내는 형용사를 고른다.',
            steps: [
              '"He was going to trick the crow"(까마귀를 속이려 했다) → 교활한 원숭이.',
              '"sly" = 교활한 → 정확히 일치.',
              '따라서 빈칸은 sly. (공식 정답표 확인됨)',
            ],
            tip: '"trick"(속이다) + "sly"(교활한)는 자연스러운 짝꿍 표현입니다.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: '"Good morning, you\'re such a (20) ________ bird with your shiny black feathers!"',
          answer: 'beautiful',
          solution: {
            method: '"shiny black feathers"을 칭찬하는 형용사를 고른다.',
            steps: [
              '"shiny black feathers"(반짝이는 검은 깃털)에 대한 칭찬 → 외모를 칭찬.',
              '"beautiful" = 아름다운 → 깃털 외모 칭찬에 자연스럽다.',
              '따라서 빈칸은 beautiful. (공식 정답표 확인됨)',
            ],
            tip: '외모를 칭찬할 때(especially 깃털·털)는 beautiful이 가장 자연스럽습니다.',
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'She opened its beak (21) ________, all ready to sing.',
          answer: 'wide',
          solution: {
            method: '"opened his mouth wide to sing"는 표현에 맞는 단어를 고른다.',
            steps: [
              '"opened its beak ___, all ready to sing" — 노래하기 위해 부리를 크게 열었다.',
              '"opened wide" = 활짝 열었다 → "open one\'s mouth wide"와 같은 표현.',
              '따라서 빈칸은 wide. (공식 정답표 확인됨)',
            ],
            tip: '"open wide"는 입(부리)을 최대한 크게 벌리는 동작을 나타내는 표현입니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'The monkey licked his mouth after eating the piece of (22) ________ banana.',
          answer: 'delicious',
          solution: {
            method: '"licked his lips"는 행동에 어울리는 바나나 묘사 형용사를 고른다.',
            steps: [
              '"licked his mouth"(입술을 핥았다) → 맛있어서 입술을 핥는 모습.',
              '"delicious" = 맛있는 → "licked his mouth"와 자연스럽게 연결.',
              '따라서 빈칸은 delicious. (남은 huge·talented·climbing은 사용되지 않음, 공식 정답표 확인됨)',
            ],
            tip: '"licked his lips/mouth after eating"은 음식이 맛있었음을 나타냅니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section F: Comprehension Open-Ended (8 marks) — Q23–29
    // 지문: Ivan the Gorilla (pp.238-239 확인됨)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2025-secF-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section F: Comprehension Open-Ended — Ivan the Gorilla',
      instructions:
        'Read the passage carefully and annotate it. Answer the following questions in complete sentences. Your answers must be based on the passage read.',
      passage:
        'Ivan the gorilla had always been alone. He could not believe his eyes when he entered the new enclosure and saw three female gorillas and a young male. They stared at him, pointing and hooting. Kinyani, the largest among the female gorillas, terrified Ivan although he was twice her size. Her piercing hoots made him shiver with fear.\n\n' +
        'Ivan approached them but they showed their sharp teeth. Kinyani wanted to know if Ivan could protect her family in times of danger. She threw a stick at him to test his reaction. Seeing that he did not move, she stared fiercely at him.\n\n' +
        'The young male went closer to Ivan. He was eyeing Ivan\'s food. Refusing to give in, Ivan gathered his strength and let out a loud grumble. He beat his chest so loudly that everyone could hear. Kinyani and the others watched. Ivan moved towards the young male who took a step back.\n\n' +
        'Kinyani ambled towards Ivan. She tapped him on the shoulder and ran away. He was not sure what she was doing. She strolled back and gave him a slight push. He then realised she was inviting him to play with them.\n\n' +
        'After playing, Ivan rested on the grass. The other gorillas came and lay next to him. Together, they enjoyed the warmth of the sun.\n\n' +
        '(Adapted from One and Only Ivan by Katherine Applegate)',
      marks: 8,
      questions: [
        {
          questionNo: '23',
          format: 'open',
          marks: 1,
          stem: 'Who was Kinyani?',
          answer: 'Kinyani was the largest among the female gorillas (in the new enclosure).',
          solution: {
            method: '1단락에서 Kinyani를 소개하는 문장을 찾는다.',
            steps: [
              '1단락: "Kinyani, the largest among the female gorillas, terrified Ivan although he was twice her size."',
              'Kinyani는 암컷 고릴라 중 가장 큰 개체이다.',
              '완전한 문장으로: "Kinyani was the largest among the female gorillas."',
            ],
            tip: 'Who 질문은 인물/캐릭터 첫 등장 문장(동격 설명)에서 답을 찾습니다.',
          },
        },
        {
          questionNo: '24',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Ivan was afraid of Kinyani because she ________.',
          options: [
            { label: '1', text: 'pointed at him' },
            { label: '2', text: 'made terrifying noises' },
            { label: '3', text: 'gave him a slight push' },
          ],
          answer: '2',
          solution: {
            method: '1단락에서 Ivan이 Kinyani를 두려워한 직접적인 이유를 찾는다.',
            steps: [
              '1단락: "Kinyani, the largest among the female gorillas, terrified Ivan... Her piercing hoots made him shiver with fear."',
              'Ivan을 두렵게 만든 것은 Kinyani의 "piercing hoots"(날카로운 울음소리) → "terrifying noises".',
              '(1) pointed at him — 지문은 "they stared at him, pointing"이므로 전체 무리의 행동이지 Kinyani의 두려움 원인이 아님. (3)은 마지막에 나오는 장난치는 행동.',
              '따라서 정답은 (2) made terrifying noises. (공식 정답표 확인됨)',
            ],
            tip: '"terrified Ivan"의 구체적인 이유는 "piercing hoots made him shiver"에서 찾습니다.',
          },
        },
        {
          questionNo: '25',
          format: 'open',
          marks: 1,
          stem: 'Why did Kinyani stare fiercely at Ivan?',
          answer: 'Kinyani stared fiercely at Ivan because she threw a stick at him to test his reaction and he did not move.',
          solution: {
            method: '2단락에서 Kinyani가 Ivan을 날카롭게 쏘아본 이유를 찾는다.',
            steps: [
              '2단락: "She threw a stick at him to test his reaction. Seeing that he did not move, she stared fiercely at him."',
              'Ivan이 막대기를 던졌음에도 꼼짝하지 않자 → 자신을 무시하는 것으로 받아들여 날카롭게 쏘아봄.',
              '완전한 문장으로: "Because she threw a stick at Ivan to test him, and he did not move."',
            ],
            tip: '"Seeing that ~ , she stared"에서 Seeing that 절이 이유를 제공합니다.',
          },
        },
        {
          questionNo: '26',
          format: 'mcq',
          marks: 1,
          stem: 'Which word would you use to describe Ivan in paragraph 3?',
          options: [
            { label: '1', text: 'kind' },
            { label: '2', text: 'brave' },
            { label: '3', text: 'proud' },
          ],
          answer: '2',
          solution: {
            method: '3단락에서 Ivan의 행동이 보여주는 성격을 파악한다.',
            steps: [
              '3단락: "Refusing to give in, Ivan gathered his strength and let out a loud grumble. He beat his chest..."',
              '"Refusing to give in"(물러서지 않으며) + 위협 앞에서도 당당히 행동 → 용감함.',
              '"brave"(용감한)가 가장 적합하다. (공식 정답표 확인됨)',
            ],
            tip: '"Refusing to give in"(포기하지 않음)은 용기(brave)를 나타내는 핵심 단서입니다.',
          },
        },
        {
          questionNo: '27',
          format: 'open',
          marks: 2,
          stem:
            'State if each sentence is True or False. Give a reason why you think so.\n' +
            '(a) The other gorillas did not welcome Ivan when he approached them.\n' +
            '(b) The young male was not afraid when he saw how Ivan behaved.',
          answer:
            '(a) True — When Ivan approached them, they showed their sharp teeth, which means they were hostile and did not welcome him.\n' +
            '(b) False — Ivan moved towards the young male who took a step back, which shows the young male was afraid.',
          solution: {
            method: '2단락(환영 여부)과 3단락(어린 수컷 반응)을 각각 확인한다.',
            steps: [
              '(a) 2단락: "Ivan approached them but they showed their sharp teeth." → 이빨을 드러냄 = 적대적 = 환영하지 않음 → True.',
              '(b) 3단락: "Ivan moved towards the young male who took a step back." → 뒤로 물러섬 = 무서워함 → "not afraid"는 거짓 → False.',
            ],
            tip: '"showed their sharp teeth"(이빨을 드러냄)는 경고/적대적 태도를, "took a step back"(뒤로 물러섬)은 두려움을 나타냅니다.',
          },
        },
        {
          questionNo: '28',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story.\n' +
            '( ) Kinyani ran away from Ivan.\n' +
            '( ) Kinyani tapped on Ivan\'s shoulder.\n' +
            '( ) Kinyani strolled back to Ivan.',
          answer: 'Kinyani tapped on Ivan\'s shoulder = 1; Kinyani ran away from Ivan = 2; Kinyani strolled back to Ivan = 3',
          solution: {
            method: '4단락의 Kinyani 행동 순서를 따라간다.',
            steps: [
              '4단락: "She tapped him on the shoulder and ran away... She strolled back and gave him a slight push."',
              '먼저: 어깨를 두드림(tapped) → 1.',
              '그 다음: 달아남(ran away) → 2.',
              '마지막: 다시 걸어서 돌아옴(strolled back) → 3.',
            ],
            tip: '행동들이 and, then으로 연결된 경우 앞에 오는 것이 먼저입니다.',
          },
        },
        {
          questionNo: '29',
          format: 'open',
          marks: 1,
          stem: 'How do you know the gorillas accepted Ivan in the end? Name one action.',
          answer: 'They lay next to him on the grass (and enjoyed the warmth of the sun together).',
          solution: {
            method: '마지막 단락에서 고릴라들이 Ivan을 받아들였음을 보여주는 행동을 찾는다.',
            steps: [
              '마지막 단락: "The other gorillas came and lay next to him. Together, they enjoyed the warmth of the sun."',
              'Ivan 옆에 눕는 행동 = 수용·친밀감을 나타냄.',
              '"They lay next to him." 또는 "They enjoyed the warmth of the sun together."',
            ],
            tip: '신체적으로 가까이 눕거나 함께 있는 행동은 동물들 사이의 수용/유대를 보여주는 전형적인 표현입니다.',
          },
        },
      ],
    },
  ],
};

export default review1MahaBodhiEnglish2025;
