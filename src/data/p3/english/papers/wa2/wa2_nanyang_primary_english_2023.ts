// =============================================================================
// src/data/p3/english/papers/wa2_nanyang_primary_english_2023.ts
// Nanyang Primary School — Term 2 Weighted Assessment 2 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 86–93 (시험지 표지 p.1–8)
// Duration: 40 minutes / Total: 20 marks
// 연도: 표지 미인쇄. Nanyang WA1과 동일 모음집 세트로 보아 2023년으로 처리(사용자 확정).
// ★ 모든 정답이 PDF p95의 공식 정답표(NANYANG WA2)와 100% 일치 확인 완료.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa2NanyangPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2023,
    assessment: 'Term 2 Weighted Assessment 2',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.86–93 (paper pp.1–8)',
  },

  items: [
    // =========================================================================
    // (A) Grammar — MCQ Q1–3 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny-wa2-2023-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: '________ girl sitting over there has the most beautiful smile.',
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
          '"girl"은 단수 → these/those(복수) 제외.',
          '"sitting over there"(저기 앉아 있는)는 멀리 있음 → this(가까움)가 아니라 that.',
          '따라서 정답은 (2) That.',
        ],
        tip: 'this/that=단수, these/those=복수. 가까우면 this/these, 멀면 that/those.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'The postman usually ________ letters to the residents in the evening.',
      options: [
        { label: '1', text: 'deliver' },
        { label: '2', text: 'delivers' },
        { label: '3', text: 'delivered' },
        { label: '4', text: 'delivering' },
      ],
      answer: '2',
      solution: {
        method: '빈도부사(usually)로 현재 습관임을, 주어로 동사 형태를 정한다.',
        steps: [
          '"usually"는 평소 반복되는 일(현재 습관)을 나타낸다 → 현재시제.',
          '주어 "The postman"은 3인칭 단수.',
          '3인칭 단수 현재형은 동사에 -s를 붙인다 → delivers, 정답 (2).',
        ],
        tip: '주어가 he/she/단수명사이고 현재 습관이면 동사에 -s를 붙입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'There are not ________ girls who are interested in football.',
      options: [
        { label: '1', text: 'few' },
        { label: '2', text: 'little' },
        { label: '3', text: 'many' },
        { label: '4', text: 'much' },
      ],
      answer: '3',
      solution: {
        method: '명사의 가산 여부와 부정문 구조를 본다.',
        steps: [
          '"girls"는 셀 수 있는 복수 명사 → little/much(불가산용) 제외.',
          '"are not ___ girls"(많지 않다) 구조에 어울리는 것은 many.',
          'few는 보통 not 없이 쓰여(=거의 없다) "are not few"는 어색 → 정답 (3) many.',
        ],
        tip: '가산 복수 명사의 양을 부정할 때는 not many를 씁니다.',
      },
    },

    // =========================================================================
    // (B) Vocabulary — MCQ Q4–6 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny-wa2-2023-q4',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'When I touched the cactus, the tiny ________ poked my fingers.',
      options: [
        { label: '1', text: 'tusks' },
        { label: '2', text: 'warts' },
        { label: '3', text: 'prickles' },
        { label: '4', text: 'whiskers' },
      ],
      answer: '3',
      solution: {
        method: '선인장(cactus)에 있고 손가락을 찌르는 것이 무엇인지 생각한다.',
        steps: [
          '선인장 표면에는 뾰족한 가시가 있다.',
          '가시 = prickles → 손가락을 찌른다(poked)는 표현과 맞는다.',
          'tusks(엄니)/warts(사마귀)/whiskers(수염)는 선인장과 무관 → 정답 (3) prickles.',
        ],
        tip: '특정 사물(cactus)과 짝지어지는 명사를 떠올리면 어휘 문제가 쉬워집니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'He ________ the door open, startling his sister who was just standing behind it.',
      options: [
        { label: '1', text: 'jiggled' },
        { label: '2', text: 'wiggled' },
        { label: '3', text: 'prodded' },
        { label: '4', text: 'wrenched' },
      ],
      answer: '4',
      solution: {
        method: '문을 갑자기 세게 여는 동작을 나타내는 동사를 고른다.',
        steps: [
          '뒤에 서 있던 여동생이 깜짝 놀랐다(startling) → 문이 갑자기 세게 열렸음.',
          'wrench = 힘껏 비틀어/잡아당기다 → "wrenched the door open"이 자연스럽다.',
          'jiggle/wiggle(살살 흔들다)·prod(쿡 찌르다)는 세게 여는 의미와 약하다 → 정답 (4) wrenched.',
        ],
        tip: '결과(여동생이 놀람)를 보고 동작의 강도에 맞는 동사를 고릅니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'When they cornered the wild boar and blocked it from escaping, it growled and became ________.',
      options: [
        { label: '1', text: 'as fierce as a lion' },
        { label: '2', text: 'as hungry as a bear' },
        { label: '3', text: 'as timid as a mouse' },
        { label: '4', text: 'as proud as a peacock' },
      ],
      answer: '1',
      solution: {
        method: '궁지에 몰려 으르렁대는 멧돼지의 상태에 맞는 직유(simile)를 고른다.',
        steps: [
          '도망 못 가게 몰리자 으르렁댔다(growled) → 사납고 공격적인 상태.',
          '"as fierce as a lion"(사자처럼 사나운)이 가장 잘 맞는다.',
          'timid(소심한)/proud(거만한)/hungry(배고픈)는 으르렁대는 상황과 안 맞는다 → 정답 (1).',
        ],
        tip: '"as ~ as ..." 직유 문제는 앞 문장의 상황·행동(growled)과 어울리는 성질을 고릅니다.',
      },
    },

    // =========================================================================
    // (C) Grammar Cloze — Q7–9 (3 marks)
    // 대명사 채우기, 보기 A~F (each once only)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny-wa2-2023-secC-cloze',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze',
      instructions:
        'There are 3 blanks, numbered 7 to 9. Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) I  (B) he  (C) we  (D) she  (E) you  (F) they',
      passage:
        'Ali plays soccer for the school team. (7) ________ asked Mary and Raju to come and watch him play in a match next Monday.\n\n' +
        '(8) ________ both agreed and went to the match. It was held at the sports stadium near their school. Mary was excited as (9) ________ had never been to a soccer match before.\n\n' +
        'After the match, the three friends went to a fast food restaurant to celebrate.',
      marks: 3,
      questions: [
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: 'Ali plays soccer for the school team. (7) ________ asked Mary and Raju to come and watch him play.',
          answer: 'B',
          solution: {
            method: '앞 문장 주어(Ali)를 대신하는 대명사를 고른다.',
            steps: [
              '바로 앞 주어가 "Ali"(남자 한 명).',
              'Mary와 Raju에게 와서 보라고 부탁한 사람도 Ali.',
              '남자 한 명을 대신하는 주어는 "he" → 보기 (B).',
            ],
            tip: '대명사는 바로 앞에 나온 명사(여기서는 Ali)를 먼저 확인하고 고릅니다.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: '(8) ________ both agreed and went to the match.',
          answer: 'F',
          solution: {
            method: '"both"(둘 다)로 두 사람(Mary와 Raju)을 가리킴을 파악한다.',
            steps: [
              '"both agreed" — 두 사람(Mary와 Raju)이 모두 동의했다.',
              '두 사람을 함께 가리키는 주어는 "they" → 보기 (F).',
            ],
            tip: '"both"가 있으면 주어는 보통 복수(they)입니다.',
          },
        },
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: 'Mary was excited as (9) ________ had never been to a soccer match before.',
          answer: 'D',
          solution: {
            method: '바로 앞 주어(Mary)를 대신하는 대명사를 고른다.',
            steps: [
              '"Mary was excited as ___ had never been..." — 경기를 처음 보는 사람은 Mary.',
              'Mary는 여자 한 명 → 주어 "she" → 보기 (D). (남은 A·C·E로도 확인 가능)',
            ],
            tip: '여자 한 명을 대신하는 주어 대명사는 she입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // (D) Editing for Spelling — Q10–12 (3 marks)
    // 지문: 올빼미(owls)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny-wa2-2023-secD-editing',
      topic: 'Editing',
      title: '(D) Editing for Spelling',
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each box. (밑줄 친 단어 = creachers(10), inseks(11), ameizing(12))',
      passage:
        'Have you ever heard a hoot at night? This may be the call of an owl looking for its dinner.\n\n' +
        'Owls have an acute sense of hearing. This helps them to find small (10) [creachers] in the dark. As the owls fly, they look straight down so that they can search and listen for their prey. They eat mice, frogs, snakes and small birds. Sometimes, they eat (11) [inseks] such as beetles and grasshoppers. If you ever get to see an owl in action, you will find that it is an (12) [ameizing] animal. Unfortunately, it is hard to spot one in Singapore.',
      marks: 3,
      questions: [
        {
          questionNo: '10',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "to find small creachers in the dark."',
          answer: 'creatures',
          solution: {
            method: '문맥(작은 생물)에 맞는 단어의 정확한 철자를 떠올린다.',
            steps: [
              '잘못된 철자: creachers.',
              '의미는 "생물/동물". 바른 단어는 creatures.',
              '-ture로 끝나며 발음은 "춰"처럼 나지만 철자는 t-u-r-e.',
            ],
            tip: 'creature, picture, nature처럼 "-ture"는 발음과 달리 t-u-r-e로 씁니다.',
          },
        },
        {
          questionNo: '11',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "they eat inseks such as beetles."',
          answer: 'insects',
          solution: {
            method: '딱정벌레·메뚜기를 가리키는 단어의 철자를 확인한다.',
            steps: [
              '잘못된 철자: inseks.',
              '딱정벌레와 메뚜기 같은 곤충 = insects.',
              '발음상 "-ks"로 들려도 철자는 c-t-s(insect → insects).',
            ],
            tip: 'insect의 복수는 끝에 -s만 붙인 insects입니다(소리 나는 대로 -ks로 쓰지 않기).',
          },
        },
        {
          questionNo: '12',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "it is an ameizing animal."',
          answer: 'amazing',
          solution: {
            method: '"놀라운"이라는 단어의 정확한 철자를 떠올린다.',
            steps: [
              '잘못된 철자: ameizing.',
              '바른 단어는 amazing (amaze + -ing).',
              'amaze의 e는 -ing 앞에서 탈락 → amazing (ei가 아니라 a).',
            ],
            tip: 'amaze → amazing처럼 -e로 끝나는 동사는 -ing 붙일 때 e를 뺍니다.',
          },
        },
      ],
    },

    // =========================================================================
    // (E) Comprehension — Q13–19 (8 marks)
    // 지문: Madam Ng Moey Chye, a Samsui woman (National Heritage Board)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny-wa2-2023-secE-comprehension',
      topic: 'ComprehensionOE',
      title: '(E) Comprehension — Madam Ng, a Samsui Woman',
      instructions: 'Read this passage and answer questions 13 to 19.',
      passage:
        'Madam Ng Moey Chye\'s job was to carry bricks at a construction site. She would wake up at dawn and walk from her home at Chinatown to Collyer Quay where she worked. Her job was hard and tiring but it was the only work she could do.\n\n' +
        'Madam Ng was born in Singapore in 1932. She was adopted when she was young and her adoptive parents never sent her to school. As an adult, Madam Ng could not find a job. She decided to work as a Samsui woman.\n\n' +
        'Like most Samsui women in Singapore in the past, Madam Ng did not get married. She was beyond the ideal age of marriage by the time she started work. She supported herself by working at construction sites. She also wore a bright red headscarf or \'hong toujin\'.\n\n' +
        'Today, at 85 years old, Madam Ng is retired and lives in a flat in Redhill. She is still healthy and cheerful, and does not let her age slow her down. She earns money by selling used cardboard that she collects from the neighbourhood.\n\n' +
        'Once a week, she goes to the Apex Club of Singapore where she receives a food package. She is grateful to the young volunteers there. Although she lives a simple life now, she chooses to see the brighter side of her situation. She feels fortunate that she is still in good health.\n\n' +
        '(Adapted from Conversations with Six Pioneering Tradesmen, National Heritage Board.)',
      marks: 8,
      questions: [
        {
          questionNo: '13',
          format: 'mcq',
          marks: 1,
          stem: 'The place where Madam Ng used to work at was ________.',
          options: [
            { label: '1', text: 'Redhill' },
            { label: '2', text: 'Chinatown' },
            { label: '3', text: 'Apex Club' },
            { label: '4', text: 'Collyer Quay' },
          ],
          answer: '4',
          solution: {
            method: '집(home)과 일터(work)를 구분해 일했던 장소를 찾는다.',
            steps: [
              '1단락: "walk from her home at Chinatown to Collyer Quay where she worked."',
              'Chinatown은 집, 일한 곳은 Collyer Quay.',
              'Redhill은 현재 사는 곳, Apex Club은 식품 받는 곳 → 정답 (4) Collyer Quay.',
            ],
            tip: '장소 문제는 "집/일터/현재 거주지"를 헷갈리지 않게 각각 구분하세요.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 2,
          stem:
            'Using information from Paragraph 2, complete the sentences that tell you why Madam Ng had to work as a Samsui woman even though the job was hard and tiring.\n' +
            'a) Her adoptive parents ________\n' +
            'b) She could ________',
          answer:
            'a) Her adoptive parents never sent (Madam Ng) her to school.  b) She could not find a job (as an adult).',
          solution: {
            method: '2단락에서 일하게 된 원인 두 가지를 순서대로 찾는다.',
            steps: [
              '2단락: "her adoptive parents never sent her to school." → a) 학교에 보내지 않음.',
              '"As an adult, Madam Ng could not find a job." → b) 일자리를 구할 수 없었음.',
              '교육을 못 받아 직업을 못 구했고, 그래서 Samsui 여성으로 일하게 되었다.',
            ],
            tip: '"complete the sentences" 문제는 주어진 시작 어구 뒤에 지문 표현을 자연스럽게 이어 적습니다.',
          },
        },
        {
          questionNo: '15',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as "past"? Circle either (A) or (B). Sentence: "She was beyond (A) the ideal (B) age of marriage by the time she started work."',
          options: [
            { label: 'A', text: 'beyond' },
            { label: 'B', text: 'ideal' },
          ],
          answer: 'A',
          solution: {
            method: 'past(지난/넘어선)와 같은 뜻의 단어를 두 보기 중에서 고른다.',
            steps: [
              'beyond = ~을 넘어선 → "past the age"(나이를 지난)와 의미가 통한다.',
              'ideal = 이상적인 → past와 뜻이 다르다.',
              '따라서 정답은 (A) beyond.',
            ],
            tip: '"beyond/past the age"는 "(어떤) 나이를 지난"이라는 같은 의미로 쓰입니다.',
          },
        },
        {
          questionNo: '16',
          format: 'open',
          marks: 1,
          stem:
            'From paragraph 4, pick out an 8-word phrase that tells you that Madam Ng is still active despite her old age.',
          answer: 'does not let her age slow her down',
          solution: {
            method: '4단락에서 "나이에 굴하지 않는다"를 보여주는 여덟 단어 표현을 찾는다.',
            steps: [
              '4단락: "...and does not let her age slow her down."',
              '나이가 자신을 느리게 만들도록 두지 않는다 = 여전히 활동적.',
              '여덟 단어: does / not / let / her / age / slow / her / down.',
            ],
            tip: '"8-word phrase"는 단어 수를 손가락으로 세어 정확히 여덟 개인지 확인하세요.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes provided to show what happened first, next and last in the story.\n' +
            '( ) Madam Ng was adopted.\n' +
            '( ) Madam Ng moved to a flat in Redhill.\n' +
            '( ) Madam Ng worked at construction sites.',
          answer:
            'Madam Ng was adopted = 1; Madam Ng moved to a flat in Redhill = 3; Madam Ng worked at construction sites = 2',
          solution: {
            method: '인생 사건을 시간 순서(어릴 때 → 성인 → 현재)로 배열한다.',
            steps: [
              '먼저: 어릴 때 입양됨("adopted when she was young") → 1.',
              '성인이 되어: 공사장에서 일함("supported herself by working at construction sites") → 2.',
              '현재: 은퇴 후 Redhill 아파트로 이사("retired and lives in a flat in Redhill") → 3.',
            ],
            tip: '시간 순서 문제는 "어린 시절 → 성인 → 현재(today)"처럼 인생 단계를 따라가면 쉽습니다.',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Madam Ng still supports herself after retirement.',
          answer: 'True',
          solution: {
            method: '은퇴 후 수입원이 있는지 4단락에서 확인한다.',
            steps: [
              '4단락: "She earns money by selling used cardboard that she collects from the neighbourhood."',
              '은퇴 후에도 폐지를 팔아 스스로 돈을 번다.',
              '따라서 "여전히 스스로를 부양한다"는 사실 → True.',
            ],
            tip: '"still"(여전히)이 든 진술은 현재 상황을 지문에서 확인해 판단합니다.',
          },
        },
        {
          questionNo: '19',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Madam Ng is a volunteer at the Apex Club.',
          answer: 'False',
          solution: {
            method: 'Apex Club에서 Madam Ng의 역할(받는 사람 vs 봉사자)을 구분한다.',
            steps: [
              '5단락: "she goes to the Apex Club... where she receives a food package."',
              '그녀는 식품을 "받는" 사람이며, "young volunteers"(젊은 봉사자들)에게 고마워한다.',
              '봉사자는 다른 사람들이므로 "Madam Ng이 봉사자"라는 진술은 거짓 → False.',
            ],
            tip: '"받는 사람"과 "봉사자"를 바꿔놓은 함정 진술에 주의하세요.',
          },
        },
      ],
    },
  ],
};

export default wa2NanyangPrimaryEnglish2023;
