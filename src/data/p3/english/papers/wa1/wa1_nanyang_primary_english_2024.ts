// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2024.ts
// Nanyang Primary School — 2024 Term 1 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 200–205 (시험지 표지 p.1–5)
// Duration: 30 minutes / Total: 20 marks
// ★ 공식 정답표(p206) 기준 20문항 전부 100% 일치 확인됨.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(4) B어휘(4) C전치사클로즈(4) D주술일치클로즈(4) E교정(4) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2024: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2024,
    assessment: 'Term 1 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 30,
    totalMarks: 20,
    sourcePages: 'pp.200–205 (paper pp.1–5)',
  },

  items: [
    // =========================================================================
    // (A) Grammar (4 marks) — Q1–4
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2024-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last Sunday, Oliver ________ a nature walk along the MacRitchie Reservoir.',
      options: [
        { label: '1', text: 'take' },
        { label: '2', text: 'took' },
        { label: '3', text: 'takes' },
        { label: '4', text: 'is taking' },
      ],
      answer: '2',
      solution: {
        method: '"Last Sunday"(과거 시점)에 맞는 동사 시제를 정한다.',
        steps: [
          '"Last Sunday"는 명확한 과거 시점을 나타낸다.',
          'take의 과거형은 took.',
          '따라서 "Oliver took a nature walk" → 정답 (2) took.',
        ],
        tip: '"Last + 시간 표현"은 과거시제(took, went, did 등)와 함께 쓰입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'When Nina won the race, she was so proud of ________ for training tirelessly.',
      options: [
        { label: '1', text: 'myself' },
        { label: '2', text: 'herself' },
        { label: '3', text: 'yourself' },
        { label: '4', text: 'themselves' },
      ],
      answer: '2',
      solution: {
        method: '주어 "Nina"(3인칭 여성 단수)에 맞는 재귀대명사를 고른다.',
        steps: [
          '"Nina ... was so proud of ___" — Nina 자신에 대한 자랑스러움.',
          'Nina는 3인칭 여성 단수 → 재귀대명사 "herself".',
          '따라서 정답은 (2) herself.',
        ],
        tip: '재귀대명사는 문장의 주어와 인칭·성별·수가 일치해야 합니다(Nina → herself).',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem:
        '"________ cup of lemonade is so sour! Please add more sugar syrup," said Sara as she pointed to the cup in her hand.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '1',
      solution: {
        method: '명사의 수(단수)와 거리(가까움)을 본다.',
        steps: [
          '"cup"은 단수 → these/those(복수) 제외.',
          '"the cup in her hand"(손에 든 컵)는 매우 가까운 거리.',
          '단수+가까움 = This → 정답 (1).',
        ],
        tip: '손에 들고 있는 것처럼 매우 가까운 단수 사물은 "this"로 가리킵니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem:
        'The tickets for the charity funfair were sold out. ________ people turned up to support the event for the homeless.',
      options: [
        { label: '1', text: 'A few' },
        { label: '2', text: 'Many' },
        { label: '3', text: 'Much' },
        { label: '4', text: 'Some' },
      ],
      answer: '2',
      solution: {
        method: '"표가 매진되었다"는 사실과 어울리는 인원 표현을 고른다.',
        steps: [
          '"The tickets ... were sold out"(표가 매진됨) → 많은 사람이 왔음을 암시.',
          '"people"은 가산명사 → "Much"(불가산용) 제외.',
          '매진된 만큼 많은 사람이 왔다는 의미로 "Many"가 가장 자연스럽다 → 정답 (2) Many.',
        ],
        tip: '"sold out"(매진)은 많은 사람이 참여했음을 암시하는 단서입니다.',
      },
    },

    // =========================================================================
    // (B) Vocabulary (4 marks) — Q5–8
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2024-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem:
        "The ________ created stunning artwork to beautify the walls of the school library. The artwork featured popular characters from children's books.",
      options: [
        { label: '1', text: 'actor' },
        { label: '2', text: 'artist' },
        { label: '3', text: 'author' },
        { label: '4', text: 'advertiser' },
      ],
      answer: '2',
      solution: {
        method: '"멋진 작품(artwork)을 만든" 사람을 가리키는 직업명을 고른다.',
        steps: [
          '"created stunning artwork"(멋진 작품을 만들었다) — 그림/미술 작품을 만든 사람.',
          '"artist" = 화가/예술가 → artwork를 만드는 사람과 정확히 일치.',
          'actor(배우)/author(작가, 글)/advertiser(광고주)는 "artwork 제작"과 직접 관련 없다 → 정답 (2) artist.',
        ],
        tip: '"artwork"(미술 작품)을 만드는 사람은 artist입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'Jakob ________ in the piercing wind, so he wrapped himself more tightly in his thick woollen jacket.',
      options: [
        { label: '1', text: 'waved' },
        { label: '2', text: 'fluttered' },
        { label: '3', text: 'shivered' },
        { label: '4', text: 'shattered' },
      ],
      answer: '3',
      solution: {
        method: '"매서운 바람"에 대한 사람의 신체 반응을 나타내는 동사를 고른다.',
        steps: [
          '"piercing wind"(매서운 바람)에 떠는 모습 → "shivered"(추워서 떨었다).',
          '뒤 문장 "wrapped himself more tightly in his thick woollen jacket"(두꺼운 옷을 더 단단히 둘렀다)도 추위를 뒷받침한다.',
          'waved(흔들었다)/fluttered(나풀거렸다, 보통 깃발·잎)/shattered(부서졌다)는 사람이 추위에 보이는 반응이 아니다 → 정답 (3) shivered.',
        ],
        tip: '"shiver"는 추위나 두려움으로 몸을 떠는 동작을 나타냅니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        '"Where is the toilet?" Aisha ________ in Mother\'s ear during the movie, not wanting to disturb the others.',
      options: [
        { label: '1', text: 'shouted' },
        { label: '2', text: 'gossiped' },
        { label: '3', text: 'chattered' },
        { label: '4', text: 'whispered' },
      ],
      answer: '4',
      solution: {
        method: '"다른 사람들을 방해하지 않으려고"라는 의도에 맞는 말하기 동사를 고른다.',
        steps: [
          '"not wanting to disturb the others"(다른 사람들을 방해하지 않으려고) → 조용히 말함.',
          '"whispered" = 속삭였다 → "in Mother\'s ear"(엄마 귀에 대고)와도 잘 맞는다.',
          'shouted(소리쳤다)/gossiped(수다 떨었다)/chattered(재잘거렸다)는 모두 "조용히"와 반대되거나 부적합 → 정답 (4) whispered.',
        ],
        tip: '"whisper in someone\'s ear"는 남에게 들리지 않게 속삭이는 동작입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2024-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem:
        "There was a ________ display of fireworks at the Marina Bay on New Year's Day. Everyone applauded after it ended.",
      options: [
        { label: '1', text: 'dull' },
        { label: '2', text: 'limp' },
        { label: '3', text: 'grim' },
        { label: '4', text: 'vibrant' },
      ],
      answer: '4',
      solution: {
        method: '"모두가 박수쳤다"는 반응에 어울리는 불꽃놀이 묘사 형용사를 고른다.',
        steps: [
          '"Everyone applauded after it ended"(모두가 박수쳤다) → 화려하고 멋진 불꽃놀이였음을 암시.',
          '"vibrant" = 화려하고 생동감 있는 → 박수를 받을 만한 멋진 불꽃놀이에 적합.',
          'dull(따분한)/limp(흐물흐물한)/grim(음울한)은 모두 부정적이라 박수와 안 맞는다 → 정답 (4) vibrant.',
        ],
        tip: '뒤따르는 반응(applauded)이 형용사의 긍정/부정 방향을 알려주는 단서입니다.',
      },
    },

    // =========================================================================
    // (C) Grammar Cloze — Prepositions (4 marks) — Q9–12
    // 보기: (A) down (B) for (C) from (D) of (E) through (F) up
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2024-secC-prepositions',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Prepositions',
      instructions:
        'Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) down  (B) for  (C) from  (D) of  (E) through  (F) up',
      passage:
        'Having the service dog, Knight, was one of the best decisions Patrick made. Patrick used a wheelchair to get (9) ________ one place to another. Ever since an accident, Patrick was not able to move about to do simple chores by himself.\n\n' +
        'A year ago, while struggling to get (10) ________ the front door, Patrick dropped his keys. It was a nightmare (11) ________ him to reach out for the keys because leaning out of his wheelchair to pick (12) ________ the keys was dangerous. He could fall out easily.\n\n' +
        'With Knight around, Peter had someone to look out for him. "With a simple command, Knight knows what to do!" said Peter with relief.\n\n' +
        '(Adapted from Changing a Life: Patrick and Service Dog Knight. NEADS: World Class Service Dogs.)',
      marks: 4,
      questions: [
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: 'Patrick used a wheelchair to get (9) ________ one place to another.',
          answer: 'C',
          solution: {
            method: '"한 장소에서 다른 장소로" 이동한다는 표현에 맞는 전치사를 고른다.',
            steps: [
              '"get from one place to another" = 한 곳에서 다른 곳으로 이동하다 → 정해진 표현.',
              '"from"이 "한 장소(시작점)에서"를 나타낸다.',
              '보기에서 from은 (C) → 정답 (C).',
            ],
            tip: '"from A to B"는 "A에서 B로"라는 뜻의 짝꿍 전치사입니다.',
          },
        },
        {
          questionNo: '10',
          format: 'fib',
          marks: 1,
          stem: 'A year ago, while struggling to get (10) ________ the front door, Patrick dropped his keys.',
          answer: 'E',
          solution: {
            method: '"문을 통과해 들어가다"는 동작에 맞는 전치사를 고른다.',
            steps: [
              '"get through the door" = 문을 통과해 지나가다.',
              '"through"는 통과의 의미를 가진 전치사.',
              '보기에서 through는 (E) → 정답 (E).',
            ],
            tip: '"get through a door/gate"는 문/출입구를 통과하는 동작을 나타냅니다.',
          },
        },
        {
          questionNo: '11',
          format: 'fib',
          marks: 1,
          stem: 'It was a nightmare (11) ________ him to reach out for the keys...',
          answer: 'B',
          solution: {
            method: '"~에게 있어"라는 의미의 전치사를 고른다.',
            steps: [
              '"It was a nightmare ___ him" — "그에게는 악몽 같았다"는 의미.',
              '"for"는 "~에게 있어/~에게는"이라는 의미로 쓰인다.',
              '보기에서 for는 (B) → 정답 (B).',
            ],
            tip: '"It was [형용사] for someone"은 "~에게는 [형용사]였다"는 뜻입니다.',
          },
        },
        {
          questionNo: '12',
          format: 'fib',
          marks: 1,
          stem: '...leaning out of his wheelchair to pick (12) ________ the keys was dangerous.',
          answer: 'F',
          solution: {
            method: '"바닥에 떨어진 것을 집어 들다"라는 동사구의 전치사를 고른다.',
            steps: [
              '"pick up the keys" = 열쇠를 집어 들다(바닥에서 위로).',
              '"up"은 아래에서 위로 들어 올리는 동작을 나타낸다.',
              '보기에서 up은 (F) → 정답 (F). (남은 A·D는 사용되지 않음)',
            ],
            tip: '"pick up something"은 떨어진 물건을 집어 드는 동작을 나타내는 정해진 표현입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // (D) Grammar Cloze — Subject-Verb Agreement (4 marks) — Q13–16
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2024-secD-svagreement',
      topic: 'GrammarCloze',
      title: '(D) Grammar Cloze — Subject-Verb Agreement',
      instructions: 'Underline the correct word from the given words in the brackets.',
      passage:
        'Lions are known as symbols of power and strength. Very few animals (13) [is / are] a threat to lions. Leopards and hyenas (14) [hunt / hunts] lion cubs only when the adult lions are out of sight.\n\n' +
        'Unfortunately, humans (15) [has / have] been a real threat to adult lions. Lions are hunted for their body parts or displayed as a symbol of achievement. This (16) [was / were] accepted in the past. In recent years, many animal welfare groups have come forward to stand against such hunting practices.\n\n' +
        '(Adapted from Thomson, S. (2023). Save the...LIONS.)',
      marks: 4,
      questions: [
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem: 'Very few animals (13) [is / are] a threat to lions.',
          answer: 'are',
          solution: {
            method: '주어 "Very few animals"의 수(복수)를 본다.',
            steps: [
              '"animals"는 복수 명사.',
              '복수 주어 → be동사는 are.',
              '따라서 "Very few animals are a threat" → are.',
            ],
            tip: '"Very few + 복수명사"는 복수 주어이므로 are를 씁니다.',
          },
        },
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Leopards and hyenas (14) [hunt / hunts] lion cubs only when the adult lions are out of sight.',
          answer: 'hunt',
          solution: {
            method: '"and"로 연결된 복수 주어를 본다.',
            steps: [
              '"Leopards and hyenas"는 두 개의 명사가 and로 연결되어 복수 주어.',
              '복수 주어 + 단순현재 → 동사 원형.',
              '따라서 "Leopards and hyenas hunt" → hunt.',
            ],
            tip: 'A and B로 연결된 주어는 복수로 취급하여 동사에 -s를 붙이지 않습니다.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'Unfortunately, humans (15) [has / have] been a real threat to adult lions.',
          answer: 'have',
          solution: {
            method: '주어 "humans"의 수(복수)를 본다.',
            steps: [
              '"humans"는 복수 명사.',
              '복수 주어의 현재완료 조동사는 have.',
              '따라서 "humans have been" → have.',
            ],
            tip: '복수 주어 + 현재완료는 "have been"을 씁니다(has는 단수 주어용).',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'This (16) [was / were] accepted in the past.',
          answer: 'was',
          solution: {
            method: '주어 "This"의 수(단수)를 본다.',
            steps: [
              '"This"는 단수 지시대명사(앞 문장의 상황을 가리킴).',
              '단수 주어의 과거 be동사는 was.',
              '따라서 "This was accepted" → was.',
            ],
            tip: '"This/That"은 단수, "These/Those"는 복수 취급합니다.',
          },
        },
      ],
    },

    // =========================================================================
    // (E) Editing for Spelling (4 marks) — Q17–20
    // 지문: Walt Disney와 길든 들쥐 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2024-secE-editing',
      topic: 'Editing',
      title: '(E) Editing for Spelling',
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage:
        'Do you know of anyone who keeps a field mouse as a pet? Walt Disney once (17) [corght] a mouse and made a leash for it using a string.\n\n' +
        'One fine school day, Walt (18) [hurryed] into class and showed everyone his new pet. One of his classmates saw the little animal and (19) [skreemed]. Their teacher stomped right over and scolded Walt. Walt was not upset. He was (20) [pleesed] to get all the attention with his pet mouse for a day. At that time, he did not know that another mouse, Mickey Mouse, would make him really famous all over the world.\n\n' +
        '(Adapted from Stewart, W. (2014). Who Was Walt Disney?)',
      marks: 4,
      questions: [
        {
          questionNo: '17',
          format: 'editing',
          marks: 1,
          stem: 'Walt Disney once [corght] a mouse and made a leash for it using a string.',
          answer: 'caught',
          solution: {
            method: '"잡았다"는 단어(catch의 과거형)의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: corght.',
              'catch의 과거형은 caught (불규칙 동사 catch–caught–caught).',
              '따라서 caught.',
            ],
            tip: 'catch의 과거형은 caught입니다(catched ✗).',
          },
        },
        {
          questionNo: '18',
          format: 'editing',
          marks: 1,
          stem: 'One fine school day, Walt [hurryed] into class and showed everyone his new pet.',
          answer: 'hurried',
          solution: {
            method: 'hurry + -ed 변형 규칙(y→i)을 적용한다.',
            steps: [
              '잘못된 철자: hurryed.',
              '자음+y로 끝나는 동사는 -ed 붙일 때 y를 i로 바꾼다: hurry → hurri + ed.',
              '따라서 hurried.',
            ],
            tip: 'hurry → hurried, carry → carried처럼 y→i+ed로 바뀝니다.',
          },
        },
        {
          questionNo: '19',
          format: 'editing',
          marks: 1,
          stem: 'One of his classmates saw the little animal and [skreemed].',
          answer: 'screamed',
          solution: {
            method: '"비명을 질렀다"는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: skreemed.',
              '바른 단어는 scream — sc로 시작하고 ea로 쓴다.',
              '과거형은 screamed.',
            ],
            tip: 'scream은 "sc-ream"으로, sk나 ee가 아닌 sc와 ea로 씁니다.',
          },
        },
        {
          questionNo: '20',
          format: 'editing',
          marks: 1,
          stem: 'Walt was not upset. He was [pleesed] to get all the attention with his pet mouse for a day.',
          answer: 'pleased',
          solution: {
            method: '"기뻐했다"는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: pleesed.',
              '바른 단어는 please — ea로 쓴다(plea-se).',
              '과거형/형용사형은 pleased.',
            ],
            tip: 'please/pleased는 "plea-se"로, ee가 아닌 ea로 씁니다.',
          },
        },
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2024;
