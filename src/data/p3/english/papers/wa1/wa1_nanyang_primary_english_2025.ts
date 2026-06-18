// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2025.ts
// Nanyang Primary School — 2025 Term 1 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 244–249 (시험지 표지 p.1–5)
// Duration: 30 minutes / Total: 20 marks
// ★ 공식 정답표(p250) 기준 20문항 전부 100% 일치 확인됨.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(4) B어휘(4) C전치사클로즈(4) D주술일치클로즈(4) E교정(4) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2025: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2025,
    assessment: 'Term 1 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 30,
    totalMarks: 20,
    sourcePages: 'pp.244–249 (paper pp.1–5)',
  },

  items: [
    // =========================================================================
    // (A) Grammar (4 marks) — Q1–4
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2025-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'After the movie ended, Robert ________ home for dinner.',
      options: [
        { label: '1', text: 'go' },
        { label: '2', text: 'went' },
        { label: '3', text: 'gone' },
        { label: '4', text: 'is going' },
      ],
      answer: '2',
      solution: {
        method: '"After the movie ended"(영화가 끝난 후)라는 과거 상황에 맞는 시제를 정한다.',
        steps: [
          '"ended"는 과거형 → 전체 문장이 과거 상황.',
          'go의 과거형은 went.',
          '따라서 "Robert went home for dinner" → 정답 (2) went.',
        ],
        tip: '종속절 "After ~ ended"가 과거이면 주절도 과거시제를 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2025-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'The child is only two years old, but he can feed ________.',
      options: [
        { label: '1', text: 'herself' },
        { label: '2', text: 'himself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '2',
      solution: {
        method: '주어 "he"(3인칭 남성 단수)에 맞는 재귀대명사를 고른다.',
        steps: [
          '"The child ... he can feed ___" — "the child"를 가리키는 "he"(남성).',
          '3인칭 남성 단수 재귀대명사는 "himself".',
          '따라서 "he can feed himself" → 정답 (2) himself.',
        ],
        tip: '"feed himself"(혼자 먹을 수 있다)는 두 살 아이의 자립을 나타내는 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2025-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Mei Ling shivered in fear on stage. She opened her mouth to speak but ________ words came out.',
      options: [
        { label: '1', text: 'no' },
        { label: '2', text: 'any' },
        { label: '3', text: 'little' },
        { label: '4', text: 'many' },
      ],
      answer: '1',
      solution: {
        method: '"하나도 나오지 않았다"는 의미에 맞는 한정사를 고른다.',
        steps: [
          '"words came out"(말이 나왔다)와 부정의 의미를 결합해야 한다.',
          '"no words came out" = 한 마디도 나오지 않았다 → 두려움으로 말이 전혀 안 나오는 상황과 정확히 일치.',
          'any는 부정문/의문문에서 "어떤 것도"를 의미하나 여기서는 긍정문이라 no가 더 자연스럽다 → 정답 (1) no.',
        ],
        tip: '"No + 명사"는 완전 부재(아무것도 없음)를 나타냅니다. "No words came out" = 말이 전혀 안 나왔다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2025-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: '"Father baked ________ cookies for us!" Lorrie exclaimed as she handed a plate of cookies to her brother.',
      options: [
        { label: '1', text: 'this' },
        { label: '2', text: 'that' },
        { label: '3', text: 'these' },
        { label: '4', text: 'those' },
      ],
      answer: '3',
      solution: {
        method: '"cookies"(복수)와 Lorrie가 직접 건네고 있는 상황(가까움)을 본다.',
        steps: [
          '"cookies"는 복수 명사 → this/that(단수) 제외.',
          '"handed a plate of cookies to her brother"(직접 건네고 있다) → 가까운 거리.',
          '복수 + 가까움 = these → 정답 (3) these.',
        ],
        tip: '직접 손에 들고 건네는 것은 가까운 거리 → these(복수)를 씁니다.',
      },
    },

    // =========================================================================
    // (B) Vocabulary (4 marks) — Q5–8
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2025-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'The ________ dog greeted everyone at the park, wagging its tail happily.',
      options: [
        { label: '1', text: 'fierce' },
        { label: '2', text: 'friendly' },
        { label: '3', text: 'grumpy' },
        { label: '4', text: 'courageous' },
      ],
      answer: '2',
      solution: {
        method: '"꼬리를 흔들며 모든 사람에게 인사했다"는 행동에 맞는 형용사를 고른다.',
        steps: [
          '"greeted everyone... wagging its tail happily"(기쁘게 꼬리를 흔들며 인사함) → 사람을 좋아하는 성격.',
          '"friendly" = 친근한/사교적인 → 정확히 일치.',
          'fierce(사나운)/grumpy(불만 많은)/courageous(용감한)는 이 행동과 안 맞는다 → 정답 (2) friendly.',
        ],
        tip: '"wagging its tail happily while greeting everyone"은 friendly(친근한)의 전형적인 모습입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2025-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: "The class ________ with laughter when they heard their classmate's joke.",
      options: [
        { label: '1', text: 'roared' },
        { label: '2', text: 'boasted' },
        { label: '3', text: 'rumbled' },
        { label: '4', text: 'groaned' },
      ],
      answer: '1',
      solution: {
        method: '"농담을 듣고 반 전체가 크게 웃었다"는 의미에 맞는 동사를 고른다.',
        steps: [
          '"with laughter"(웃음으로) + "when they heard their classmate\'s joke"(농담을 듣고) → 크게 웃음.',
          '"roared with laughter" = 크게 웃음/폭소 → 정확히 일치하는 표현.',
          'boasted(자랑했다)/rumbled(우르릉)/groaned(신음했다)는 "웃음"과 안 맞는다 → 정답 (1) roared.',
        ],
        tip: '"roared with laughter"는 크게 웃는 것을 나타내는 정해진 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2025-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'This ________ building is named the tallest man-made structure in the world.',
      options: [
        { label: '1', text: 'quaking' },
        { label: '2', text: 'towering' },
        { label: '3', text: 'trembling' },
        { label: '4', text: 'menacing' },
      ],
      answer: '2',
      solution: {
        method: '"세계에서 가장 높은 인공 구조물"이라는 의미에 맞는 형용사를 고른다.',
        steps: [
          '"the tallest man-made structure in the world"(세계에서 가장 높은 인공 구조물) → 매우 높이 솟아있는.',
          '"towering" = 우뚝 솟아있는 → "tallest"와 의미가 직접 연결된다.',
          'quaking(흔들리는)/trembling(떨리는)/menacing(위협적인)은 "매우 높음"을 나타내지 않는다 → 정답 (2) towering.',
        ],
        tip: '"towering"은 매우 높이 솟아있는 구조물·건물을 묘사할 때 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2025-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'Rita put up several ________ of her lost kitten all around the neighbourhood in hopes of finding it.',
      options: [
        { label: '1', text: 'menus' },
        { label: '2', text: 'posters' },
        { label: '3', text: 'websites' },
        { label: '4', text: 'instructions' },
      ],
      answer: '2',
      solution: {
        method: '"잃어버린 새끼고양이를 찾기 위해 동네에 게시하는 것"을 나타내는 명사를 고른다.',
        steps: [
          '"put up several ___ all around the neighbourhood" — 동네 곳곳에 붙이다.',
          '"posters" = 포스터 → "잃어버린 동물/사람" 전단지를 붙이는 것이 일반적인 방법.',
          'menus(메뉴판)/websites(웹사이트, 붙이지 않는다)/instructions(지시문)은 "동네에 붙이는 것"과 안 맞는다 → 정답 (2) posters.',
        ],
        tip: '"put up posters"(포스터를 붙이다)는 분실물/실종 반려동물 찾기에 흔히 쓰는 표현입니다.',
      },
    },

    // =========================================================================
    // (C) Grammar Cloze — Prepositions (4 marks) — Q9–12
    // 보기: (A) in (B) to (C) by (D) from (E) into (F) across
    // 지문: Maisie's Web (거미 Maisie)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2025-secC-prepositions',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Prepositions',
      instructions:
        'Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) in  (B) to  (C) by  (D) from  (E) into  (F) across',
      passage:
        "Maisie had a special gift of spinning the best webs. She lived (9) ________ Robert's house and loved to spin her webs all over the house.\n\n" +
        'One day, as she was resting (10) ________ her favourite window, she had a brilliant idea to surprise Robert when he returned home (11) ________ work. She began spinning the finest webs she had ever spun (12) ________ the entire living room. "Robert would finally notice my talent," she thought.\n\n' +
        '(Adapted from Maisie\'s Web)',
      marks: 4,
      questions: [
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: "She lived (9) ________ Robert's house and loved to spin her webs all over the house.",
          answer: 'A',
          solution: {
            method: '집 안에 사는 위치를 나타내는 전치사를 고른다.',
            steps: [
              '"lived ___ Robert\'s house" — Robert의 집 안에 살고 있다.',
              '"in a house" = 집 안에 → 거주 위치를 나타내는 전치사.',
              '보기에서 in은 (A) → 정답 (A).',
            ],
            tip: '건물/집 안에 사는/있는 경우 "in"을 씁니다(live in a house).',
          },
        },
        {
          questionNo: '10',
          format: 'fib',
          marks: 1,
          stem: 'One day, as she was resting (10) ________ her favourite window...',
          answer: 'C',
          solution: {
            method: '"창가에서 쉬고 있었다"는 표현에 맞는 전치사를 고른다.',
            steps: [
              '"resting ___ her favourite window" — 좋아하는 창문 옆/근처에서 쉬고 있었다.',
              '"by the window" = 창가에서/창문 옆에서 → 정해진 표현.',
              '보기에서 by는 (C) → 정답 (C).',
            ],
            tip: '"by the window"는 창가에 위치함을 나타내는 고정 표현입니다.',
          },
        },
        {
          questionNo: '11',
          format: 'fib',
          marks: 1,
          stem: '...she had a brilliant idea to surprise Robert when he returned home (11) ________ work.',
          answer: 'D',
          solution: {
            method: '"직장에서 집으로 돌아오다"라는 표현에 맞는 전치사를 고른다.',
            steps: [
              '"returned home ___ work" — 직장에서(출발점) 집으로 돌아오다.',
              '"from work" = 직장에서(출발점) → "return home from work"는 정해진 표현.',
              '보기에서 from은 (D) → 정답 (D).',
            ],
            tip: '"return home from work/school"은 직장/학교에서 돌아오는 정해진 표현입니다.',
          },
        },
        {
          questionNo: '12',
          format: 'fib',
          marks: 1,
          stem: 'She began spinning the finest webs she had ever spun (12) ________ the entire living room.',
          answer: 'F',
          solution: {
            method: '"거실 전체를 가로질러" 거미줄을 치는 동작에 맞는 전치사를 고른다.',
            steps: [
              '"spinning webs ___ the entire living room" — 거실 전체에 걸쳐 거미줄을 쳤다.',
              '"across" = 가로질러/전체에 걸쳐 → "across the room"이 자연스럽다.',
              '보기에서 across는 (F) → 정답 (F). (남은 B·E는 사용되지 않음)',
            ],
            tip: '"across the room"은 방을 가로질러/방 전체에 걸쳐라는 의미입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // (D) Grammar Cloze — Subject-Verb Agreement (4 marks) — Q13–16
    // 지문: Sea Turtles (ReadWorks)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2025-secD-sva',
      topic: 'GrammarCloze',
      title: '(D) Grammar Cloze — Subject-Verb Agreement',
      instructions: 'Underline the correct word from the given words in the brackets.',
      passage:
        'Thousands of people visit beaches to enjoy the sun and the sand. Among these beaches, some (13) [is / are] home to sea turtles. Female sea turtles (14) [swim / swims] from the ocean to the shore to lay eggs at night. Then, they return to the water.\n\n' +
        'Unfortunately, sea turtles are facing extinction! Therefore, volunteers are working hard to help them. They (15) [look / looks] closely at the sand to find the tracks left by the mother sea turtles. This (16) [help / helps] them to locate where the sea turtles laid their eggs so that they can protect that area. This increases the chance of the baby turtles making it to the ocean.\n\n' +
        '(Adapted from ReadWorks)',
      marks: 4,
      questions: [
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem: 'Among these beaches, some (13) [is / are] home to sea turtles.',
          answer: 'are',
          solution: {
            method: '주어 "some"(복수)의 수를 확인한다.',
            steps: [
              '"some" — "some of the beaches"(일부 해변들)을 가리켜 복수.',
              '복수 주어 → be동사 are.',
              '따라서 "some are home to sea turtles" → are.',
            ],
            tip: '"some"은 복수 명사를 가리킬 때 복수 동사(are)와 함께 씁니다.',
          },
        },
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Female sea turtles (14) [swim / swims] from the ocean to the shore to lay eggs at night.',
          answer: 'swim',
          solution: {
            method: '주어 "Female sea turtles"(복수)의 수를 확인한다.',
            steps: [
              '"Female sea turtles"는 복수 명사.',
              '복수 주어 + 단순현재 → 동사 원형(swim, -s 없음).',
              '따라서 "Female sea turtles swim" → swim.',
            ],
            tip: '복수 주어의 단순현재 동사에는 -s를 붙이지 않습니다.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'They (15) [look / looks] closely at the sand to find the tracks left by the mother sea turtles.',
          answer: 'look',
          solution: {
            method: '주어 "They"(복수)의 수를 확인한다.',
            steps: [
              '"They"는 "volunteers"를 가리키며 복수.',
              '복수 주어 + 단순현재 → 동사 원형.',
              '따라서 "They look closely" → look.',
            ],
            tip: 'They는 항상 복수 취급(look, not looks).',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'This (16) [help / helps] them to locate where the sea turtles laid their eggs...',
          answer: 'helps',
          solution: {
            method: '주어 "This"(단수)의 수를 확인한다.',
            steps: [
              '"This"는 단수 지시대명사(앞서 언급된 행동/방법을 가리킴).',
              '단수 주어 + 단순현재 → 동사에 -s 붙임.',
              '따라서 "This helps them" → helps.',
            ],
            tip: '"This/That"은 단수 → helps, works, makes 등.',
          },
        },
      ],
    },

    // =========================================================================
    // (E) Editing for Spelling (4 marks) — Q17–20
    // 지문: Davey와 형제의 숲속 모험
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2025-secE-editing',
      topic: 'Editing',
      title: '(E) Editing for Spelling',
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage:
        "Davey's brother had just climbed out of bed. He greeted Davey (17) [esciterdly], \"Good morning! It's a beautiful day, Davey! Are you (18) [readee] for our adventure?\"\n\n" +
        "The two brothers were looking forward to their fantastic day in the forest. (19) [brunches] Together with their friends, they tied loads of branches together and built a wooden fort in a few hours. Despite the blisters on his hands and (20) [skretches] on his legs, Davey had a huge smile on his face. He felt contented, his mind filled with new memories and experiences.\n\n" +
        '(Adapted from storyberries.com)',
      marks: 4,
      questions: [
        {
          questionNo: '17',
          format: 'editing',
          marks: 1,
          stem: 'He greeted Davey [esciterdly], "Good morning!"',
          answer: 'excitedly',
          solution: {
            method: '"신나게/흥분하며"라는 부사의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: esciterdly.',
              '바른 단어: excitedly — excited + -ly (excited의 d를 유지).',
              'e-x-c-i-t-e-d-l-y 순서 → excitedly.',
            ],
            tip: 'excitedly는 "excite + d + ly" 구조입니다. sc 대신 xc로 씁니다.',
          },
        },
        {
          questionNo: '18',
          format: 'editing',
          marks: 1,
          stem: '"Are you [readee] for our adventure?"',
          answer: 'ready',
          solution: {
            method: '"준비가 된"이라는 형용사의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: readee.',
              '바른 단어: ready — r-e-a-d-y.',
              '따라서 ready.',
            ],
            tip: 'ready는 "read + y"로 씁니다(readee ✗).',
          },
        },
        {
          questionNo: '19',
          format: 'editing',
          marks: 1,
          stem: 'Together with their friends, they tied loads of [brunches] together...',
          answer: 'branches',
          solution: {
            method: '"나뭇가지들"이라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: brunches(이건 "브런치의 복수형"이다).',
              '문맥상 "숲에서 나뭇가지를 묶어 요새를 만들었다" → 나뭇가지 = branches.',
              'branch의 복수형은 branches(br-a-nch-es) → branches.',
            ],
            tip: 'branch(나뭇가지)의 복수는 branches입니다. brunch(브런치)와 혼동하지 마세요.',
          },
        },
        {
          questionNo: '20',
          format: 'editing',
          marks: 1,
          stem: 'Despite the blisters on his hands and [skretches] on his legs...',
          answer: 'scratches',
          solution: {
            method: '"긁힌 상처들"이라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: skretches.',
              '바른 단어: scratches — scr-a-t-ch-es.',
              'scratch의 복수는 scratches → scratches.',
            ],
            tip: 'scratch(긁힌 상처)는 "scr-atch"로 씁니다(skr- 아님).',
          },
        },
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2025;
