// =============================================================================
// src/data/p3/english/papers/practicepaper1_catholic_high_primary_english_2023.ts
// Catholic High School (Primary) — Primary 3 Practice Paper 1 (English)
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 96–106 (시험지 표지 p.1–11)
// Total: 50 marks
// 주의: 표지에 연도가 인쇄돼 있지 않음(내부 출처 인용은 What's Up 2021.10).
//       모음집 배열상 2023년으로 처리(검증 권장). 이 시험지는 WA가 아닌 'Practice Paper 1'.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법MCQ(8) B어휘MCQ(6) C문법클로즈(4) D문법클로즈(4) E어휘클로즈(3)
//       F교정(5) G독해클로즈(4) H독해(8) I독해서술형(8) = 50점
// =============================================================================

import type { EnglishPaper } from '../types';

export const practicePaper1CatholicHighPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2023,
    assessment: 'Practice Paper 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 50,
    sourcePages: 'pp.96–106 (paper pp.1–11)',
  },

  items: [
    // =========================================================================
    // Section A — Grammar MCQ (8 x 1 mark) — Q1–8
    // =========================================================================
    {
      kind: 'single',
      id: 'chs-pp1-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'My sister was hiding ________ the door. No one noticed her.',
      options: [
        { label: '1', text: 'with' },
        { label: '2', text: 'under' },
        { label: '3', text: 'behind' },
        { label: '4', text: 'between' },
      ],
      answer: '3',
      solution: {
        method: '문의 뒤에 숨어 보이지 않는 위치를 나타내는 전치사를 고른다.',
        steps: [
          '아무도 그녀를 보지 못했다 → 문 뒤에 가려져 있었다는 뜻.',
          '"behind the door"(문 뒤에)가 가장 자연스럽다.',
          'under(아래)/between(사이)/with(함께)는 문맥과 안 맞는다 → 정답 (3) behind.',
        ],
        tip: '전치사 문제는 "어디에 있어야 보이지 않을까?"처럼 상황을 그려보면 쉽습니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'All the pupils and teachers ________ to sing the national anthem every morning.',
      options: [
        { label: '1', text: 'stand' },
        { label: '2', text: 'stands' },
        { label: '3', text: 'is standing' },
        { label: '4', text: 'are standing' },
      ],
      answer: '1',
      solution: {
        method: '주어의 수와 "every morning"(반복되는 습관)을 본다.',
        steps: [
          '주어 "All the pupils and teachers"는 복수.',
          '"every morning"은 매일 반복되는 습관 → 단순현재.',
          '복수 주어의 단순현재형은 원형 stand → 정답 (1).',
        ],
        tip: '"every morning/day"처럼 반복을 나타내면 진행형이 아니라 단순현재를 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Everyone ________ quietly when the fire alarm went off.',
      options: [
        { label: '1', text: 'read' },
        { label: '2', text: 'reads' },
        { label: '3', text: 'is reading' },
        { label: '4', text: 'was reading' },
      ],
      answer: '4',
      solution: {
        method: '"went off"(과거)와 동시에 진행 중이던 동작을 나타낸다.',
        steps: [
          '"when the fire alarm went off" — 화재경보가 울린 시점은 과거.',
          '그 순간 모두가 책을 읽고 "있던" 중이었으므로 과거진행형.',
          '"Everyone"은 단수 취급 → was reading → 정답 (4).',
        ],
        tip: '과거의 한 시점에 진행 중이던 동작은 "was/were + -ing"(과거진행)으로 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'Meera does not like to swim ________ she enjoys cycling.',
      options: [
        { label: '1', text: 'or' },
        { label: '2', text: 'so' },
        { label: '3', text: 'but' },
        { label: '4', text: 'and' },
      ],
      answer: '3',
      solution: {
        method: '앞뒤 문장이 대조(반대)인지 인과인지 파악한다.',
        steps: [
          '앞: 수영을 좋아하지 않는다 / 뒤: 자전거 타기는 즐긴다 → 서로 대조.',
          '대조를 잇는 접속사는 but.',
          'so(그래서)·and(그리고)·or(또는)는 대조에 안 맞는다 → 정답 (3) but.',
        ],
        tip: '"좋아하지 않는다 ↔ 즐긴다"처럼 반대 내용이 이어지면 but을 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: '"Do not go there! ________ wild animals are very dangerous," warned the tour guide.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '4',
      solution: {
        method: '명사의 수와 거리를 본다.',
        steps: [
          '"wild animals"는 복수 → this/that 제외.',
          '"Do not go there"(저기 가지 마라)에서 동물들은 멀리 있음 → these가 아니라 those.',
          '따라서 정답은 (4) Those.',
        ],
        tip: '복수+먼 거리 = those. (these=복수+가까움)',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: "________ children like the 'Super Mario' movie. It is very popular among the kids.",
      options: [
        { label: '1', text: 'Few' },
        { label: '2', text: 'Little' },
        { label: '3', text: 'Many' },
        { label: '4', text: 'Much' },
      ],
      answer: '3',
      solution: {
        method: '명사의 가산 여부와 긍정 문맥(인기 많음)을 본다.',
        steps: [
          '"children"은 셀 수 있는 복수 명사 → little/much(불가산) 제외.',
          '영화가 아주 인기 있다는 긍정 문맥 → "많은 아이들"이 좋아함.',
          'Few(거의 없는)는 부정적 → 정답은 (3) Many.',
        ],
        tip: 'few=거의 없는(부정), many=많은(긍정). 가산 복수 명사에 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        '"Please ensure you have taken ________ with you before leaving the hall. Do not leave your belongings behind," reminded the Discipline Master.',
      options: [
        { label: '1', text: 'nothing' },
        { label: '2', text: 'anything' },
        { label: '3', text: 'everything' },
        { label: '4', text: 'something' },
      ],
      answer: '3',
      solution: {
        method: '"소지품을 두고 가지 말라"는 당부와 어울리는 대명사를 고른다.',
        steps: [
          '뒷문장: "Do not leave your belongings behind"(소지품을 두고 가지 마라).',
          '그러려면 "모든 것(everything)"을 챙겨야 한다.',
          'nothing/anything/something은 "모두 챙겨라"는 뜻과 안 맞는다 → 정답 (3) everything.',
        ],
        tip: '뒤 문장이 빈칸의 의미를 풀어주는 단서가 되는 경우가 많습니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'The trains are always on time, ________?',
      options: [
        { label: '1', text: 'do they?' },
        { label: '2', text: 'are they?' },
        { label: '3', text: "don't they?" },
        { label: '4', text: "aren't they?" },
      ],
      answer: '4',
      solution: {
        method: '부가의문문(tag question) 규칙을 적용한다.',
        steps: [
          '본문은 긍정문이고 동사가 "are" → 부가의문문은 부정으로, 같은 be동사 사용.',
          '주어 the trains는 they로 받는다.',
          '긍정 are + 부정 태그 → "aren\'t they?" → 정답 (4).',
        ],
        tip: '부가의문문: 긍정문 뒤엔 부정 태그, 본동사가 be면 태그도 be(aren\'t/isn\'t)를 씁니다.',
      },
    },

    // =========================================================================
    // Section B — Vocabulary MCQ (6 x 1 mark) — Q9–14
    // =========================================================================
    {
      kind: 'single',
      id: 'chs-pp1-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'My best friend, Thomas, broke ________ tears when his favourite toy was damaged.',
      options: [
        { label: '1', text: 'up' },
        { label: '2', text: 'into' },
        { label: '3', text: 'down' },
        { label: '4', text: 'through' },
      ],
      answer: '2',
      solution: {
        method: '"갑자기 울음을 터뜨리다"라는 숙어를 떠올린다.',
        steps: [
          '"break into tears" = 갑자기 울음을 터뜨리다(=burst into tears).',
          '빈칸 바로 뒤에 "tears"가 와서 "broke into tears"가 자연스럽다.',
          'up/down/through는 tears와 함께 이 의미로 쓰지 않는다 → 정답 (2) into.',
        ],
        tip: '"break into tears/laughter"는 감정이 갑자기 터져 나올 때 쓰는 숙어입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem:
        'Last night, my sister ________ down the stairs to the kitchen quietly as she did not want to wake anyone up.',
      options: [
        { label: '1', text: 'bolted' },
        { label: '2', text: 'darted' },
        { label: '3', text: 'scurried' },
        { label: '4', text: 'sneaked' },
      ],
      answer: '4',
      solution: {
        method: '"조용히, 들키지 않게" 움직이는 동작 동사를 고른다.',
        steps: [
          '"quietly... did not want to wake anyone up" → 몰래 살금살금 움직였다.',
          'sneak = 살금살금/몰래 움직이다 → 문맥에 맞는다.',
          'bolted/darted/scurried는 "빠르게" 움직임을 강조해 조용함과 안 맞는다 → 정답 (4) sneaked.',
        ],
        tip: '동작 동사는 속도(빠름)냐 은밀함(조용함)이냐를 구분해 고릅니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: '________ with anger, the restaurant manager scolded his staff who had broken the plates.',
      options: [
        { label: '1', text: 'Wailing' },
        { label: '2', text: 'Bellowing' },
        { label: '3', text: 'Mumbling' },
        { label: '4', text: 'Grumbling' },
      ],
      answer: '2',
      solution: {
        method: '화가 나서 직원을 야단치는 큰 목소리에 맞는 동사를 고른다.',
        steps: [
          '"with anger... scolded" → 화가 나 큰 소리로 꾸짖었다.',
          'bellow = 우렁차게 고함치다 → 분노에 찬 큰 목소리와 맞는다.',
          'wail(울부짖다)·mumble(웅얼대다)·grumble(투덜대다)은 큰 호통과 거리가 멀다 → 정답 (2) Bellowing.',
        ],
        tip: '소리의 크기·감정을 단어와 연결: bellow=분노의 큰 외침.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: 'Naina saw a ________ of birds when she went to the zoo with her family.',
      options: [
        { label: '1', text: 'flock' },
        { label: '2', text: 'pride' },
        { label: '3', text: 'colony' },
        { label: '4', text: 'school' },
      ],
      answer: '1',
      solution: {
        method: '동물 무리를 세는 집합명사(collective noun)를 고른다.',
        steps: [
          '새 떼는 "a flock of birds".',
          'a pride of lions(사자), a colony of ants(개미), a school of fish(물고기).',
          '새와 어울리는 것은 flock → 정답 (1).',
        ],
        tip: '집합명사는 동물별로 정해져 있습니다: flock(새/양), pride(사자), school(물고기).',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem:
        'While waiting for the results, Yuze was ________. He was confident he would do very well.',
      options: [
        { label: '1', text: 'as cold as ice' },
        { label: '2', text: 'as cunning as a fox' },
        { label: '3', text: 'as stubborn as a mule' },
        { label: '4', text: 'as cool as a cucumber' },
      ],
      answer: '4',
      solution: {
        method: '"자신감 있고 침착함"을 나타내는 직유를 고른다.',
        steps: [
          '뒷문장: "He was confident" → 결과를 기다리며 침착하고 여유로웠다.',
          '"as cool as a cucumber" = 아주 침착한/태연한.',
          'cold(차가운)·cunning(교활한)·stubborn(고집 센)은 침착함과 무관 → 정답 (4).',
        ],
        tip: '"as cool as a cucumber"는 긴장 상황에서도 침착함을 뜻하는 관용 직유입니다.',
      },
    },
    {
      kind: 'single',
      id: 'chs-pp1-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: '"I\'m afraid I have bad news for you," the doctor told my uncle ________.',
      options: [
        { label: '1', text: 'boldly' },
        { label: '2', text: 'bravely' },
        { label: '3', text: 'eagerly' },
        { label: '4', text: 'solemnly' },
      ],
      answer: '4',
      solution: {
        method: '나쁜 소식을 전하는 의사의 태도에 맞는 부사를 고른다.',
        steps: [
          '"bad news"(나쁜 소식)를 전하는 상황 → 진지하고 엄숙한 분위기.',
          'solemnly = 엄숙하게/진지하게 → 문맥에 맞는다.',
          'boldly(대담하게)·bravely(용감하게)·eagerly(열성적으로)는 나쁜 소식 전달과 안 맞는다 → 정답 (4) solemnly.',
        ],
        tip: '부사 문제는 그 상황의 분위기(여기서는 무겁고 진지함)와 맞는 말을 고릅니다.',
      },
    },

    // =========================================================================
    // Section C — Grammar Cloze (4 x 1 mark) — Q15–18 (보기 A~F)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C — Grammar Cloze',
      instructions:
        'Choose the most suitable answer from the box and fill in each blank. Write its letter (A to F). Use each word ONCE only. Box: (A) he  (B) her  (C) his  (D) it  (E) she  (F) you',
      passage:
        'Mabel was feeling upset as she had lost her precious pencil. (15) ________ was from her best friend. She and (16) ________ father searched high and low for it but could not find it. She was almost in tears. Just then, Larry, her brother, came to her room with her pencil. He had taken it to do (17) ________ homework. "Why did (18) ________ take my pencil without my permission?" cried Mabel. Larry apologised to her immediately.',
      marks: 4,
      questions: [
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: '(15) ________ was from her best friend. (앞 문장: she had lost her precious pencil.)',
          answer: 'D',
          solution: {
            method: '앞 문장에 나온 사물(pencil)을 대신하는 대명사를 고른다.',
            steps: [
              '앞 문장의 핵심 사물은 "her precious pencil"(연필).',
              '사물을 대신하는 주어 대명사는 "it".',
              '보기에서 it은 (D) → 정답 (D).',
            ],
            tip: '사람이 아닌 사물 하나를 대신할 때는 it을 씁니다.',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'She and (16) ________ father searched high and low for it.',
          answer: 'B',
          solution: {
            method: '"Mabel의 아빠"를 가리키는 소유격을 고른다.',
            steps: [
              '주인공은 Mabel(여자아이) → 그녀의 아빠.',
              '여성 소유격은 "her" → "her father".',
              '보기에서 her은 (B) → 정답 (B).',
            ],
            tip: '소유격: 남자 his, 여자 her, 사물 its.',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'He had taken it to do (17) ________ homework. (He = Larry)',
          answer: 'C',
          solution: {
            method: '"Larry의 숙제"를 가리키는 소유격을 고른다.',
            steps: [
              '연필을 가져간 사람은 Larry(남자) → 그의 숙제.',
              '남성 소유격은 "his" → "his homework".',
              '보기에서 his은 (C) → 정답 (C).',
            ],
            tip: '남자아이의 소유는 his로 표현합니다.',
          },
        },
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: '"Why did (18) ________ take my pencil without my permission?" cried Mabel (to Larry).',
          answer: 'F',
          solution: {
            method: 'Mabel이 Larry에게 직접 따지는 말의 주어를 고른다.',
            steps: [
              'Mabel이 Larry에게 직접 "왜 네가 가져갔니?"라고 묻는 상황.',
              '상대 한 사람을 가리키는 2인칭 주어는 "you".',
              '보기에서 you는 (F) → 정답 (F). (남은 A·E로도 확인 가능)',
            ],
            tip: '대화 속 상대에게 직접 묻는 주어는 you입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section D — Grammar Cloze (4 x 1 mark) — Q19–22 (괄호 중 택1)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D — Grammar Cloze',
      instructions: 'Underline the correct word from the words given in the brackets.',
      passage:
        'Who doesn\'t love cookies? The sweet snack (19) [is / are] a favourite among children and adults. It can be either chewy or crunchy. Usually, cookies (20) [contain / contains] a lot of fat and sugar. Bakers (21) [like / likes] to add chocolate chips or nuts to give more flavour to the cookies. This (22) [make / makes] the cookies even more delicious. Are you a cookie-lover? You can try making your very own cookies today.',
      marks: 4,
      questions: [
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'The sweet snack (19) [is / are] a favourite among children and adults.',
          answer: 'is',
          solution: {
            method: '주어의 수(단수/복수)에 동사를 맞춘다.',
            steps: [
              '주어 "The sweet snack"은 단수.',
              '단수 주어에는 is.',
              '따라서 "The sweet snack is a favourite" → is.',
            ],
            tip: '주어가 단수면 is, 복수면 are로 수일치합니다.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'Usually, cookies (20) [contain / contains] a lot of fat and sugar.',
          answer: 'contain',
          solution: {
            method: '주어 cookies(복수)에 동사를 맞춘다.',
            steps: [
              '주어 "cookies"는 복수.',
              '복수 주어에는 -s 없는 원형 동사 → contain.',
              '따라서 "cookies contain" → contain.',
            ],
            tip: '복수 주어의 현재형 동사에는 -s를 붙이지 않습니다.',
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'Bakers (21) [like / likes] to add chocolate chips or nuts.',
          answer: 'like',
          solution: {
            method: '주어 Bakers(복수)에 동사를 맞춘다.',
            steps: [
              '주어 "Bakers"는 복수.',
              '복수 주어 → like (원형).',
              '따라서 "Bakers like to add" → like.',
            ],
            tip: '주어가 사람 복수(Bakers)면 동사는 like입니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'This (22) [make / makes] the cookies even more delicious.',
          answer: 'makes',
          solution: {
            method: '주어 This(단수)에 동사를 맞춘다.',
            steps: [
              '주어 "This"는 단수(앞 내용 전체를 가리킴).',
              '3인칭 단수 현재형 → makes.',
              '따라서 "This makes the cookies..." → makes.',
            ],
            tip: 'This/It 같은 단수 주어의 현재형 동사에는 -s를 붙입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E — Vocabulary Cloze (3 x 1 mark) — Q23–25
    // 보기 6개 중 3개 사용 (avoided, healthy, ingredients, mixtures, refused, special)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secE-vcloze',
      topic: 'VocabCloze',
      title: 'Section E — Vocabulary Cloze',
      instructions:
        'Choose the most suitable answer from the box and fill in each blank. Use each word ONCE only. Box: avoided | healthy | ingredients | mixtures | refused | special (3 distractors)',
      passage:
        'Abu only ate pancakes. He simply (23) ________ to eat anything else. Abu\'s mother thought, "He should eat (24) ________ food like fruits and vegetables too!" She had an idea. She added blended carrots into the pancake batter. Abu gobbled up everything. She added different (25) ________ to the pancakes daily. One day, Abu caught his mother adding blended spinach into his pancakes. "You added vegetables?" he gasped. Abu realised that vegetables were not as bad as he had thought.\n\n(Adapted from storyberries.com — the boy who only ate pancakes)',
      marks: 3,
      questions: [
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'He simply (23) ________ to eat anything else.',
          answer: 'refused',
          solution: {
            method: '"to + 동사원형"과 어울리며 "거부했다"는 뜻의 단어를 고른다.',
            steps: [
              'Abu는 팬케이크만 먹고 다른 건 안 먹으려 했다 → 거부.',
              'refuse + to-부정사: "refused to eat"(먹기를 거부했다)가 문법·의미 모두 맞다.',
              'avoid는 동명사를 취해(avoided eating) "avoided to eat"는 틀림 → 정답 refused.',
            ],
            tip: 'refuse 뒤에는 to-부정사, avoid 뒤에는 -ing가 옵니다.',
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem: '"He should eat (24) ________ food like fruits and vegetables too!"',
          answer: 'healthy',
          solution: {
            method: '"과일과 채소" 같은 음식을 묘사하는 형용사를 고른다.',
            steps: [
              '과일·채소는 몸에 좋은 음식 → healthy food.',
              '"healthy food like fruits and vegetables"가 자연스럽다.',
              '따라서 정답은 healthy.',
            ],
            tip: '예시(fruits and vegetables)가 빈칸 형용사의 의미를 알려줍니다.',
          },
        },
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: 'She added different (25) ________ to the pancakes daily.',
          answer: 'ingredients',
          solution: {
            method: '팬케이크 반죽에 매일 넣은 "재료"를 뜻하는 단어를 고른다.',
            steps: [
              '엄마는 당근·시금치 등을 반죽에 넣었다 → 다양한 "재료".',
              'ingredients = 재료 → "different ingredients"가 자연스럽다.',
              '남은 보기(avoided/mixtures/special)는 문맥에 안 맞는다 → 정답 ingredients.',
            ],
            tip: '요리·음식 맥락에서 "넣는 것"은 보통 ingredients(재료)입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section F — Editing (5 x 1 mark) — Q26–30 (굵은 단어 철자 교정)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secF-editing',
      topic: 'Editing',
      title: 'Section F — Editing (Spelling)',
      instructions:
        'Correct the words in bold for spelling. Write the correct answer in the boxes. (굵은 단어 순서대로: strols(26), beautyful(27), suppots(28), importent(29), afforts(30))',
      passage:
        'Have you ever visited Bukit Timah Nature Reserve? I usually go there with my parents to hike and take long (26) [strols]. It is full of (27) [beautyful] flora and fauna. The nature reserve (28) [suppots] a variety of flowering plants and wildlife.\n\n' +
        'Some of these flowering plants and wildlife are slowly decreasing in numbers. This reminds us of how (29) [importent] conservation is. Without any conservation (30) [afforts], we would be at risk of losing our flora and fauna. Let\'s do our part to protect our ecosystem.\n\n' +
        '(Adapted from: "Sustain local biodiversity", What\'s Up, October 2021, page 5)',
      marks: 5,
      questions: [
        {
          questionNo: '26',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "take long strols".',
          answer: 'strolls',
          solution: {
            method: '"산책"을 뜻하는 단어의 정확한 철자를 떠올린다.',
            steps: [
              '잘못된 철자: strols.',
              '의미는 "한가로운 산책". 바른 단어는 strolls.',
              'l이 두 개(stroll), 복수는 strolls.',
            ],
            tip: 'stroll은 l을 두 번 씁니다(stroll → strolls).',
          },
        },
        {
          questionNo: '27',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "full of beautyful flora".',
          answer: 'beautiful',
          solution: {
            method: 'beauty + -ful 변형 규칙을 적용한다.',
            steps: [
              '잘못된 철자: beautyful.',
              'beauty의 y는 자음 뒤에서 i로 바뀐다 → beauti + ful.',
              '바른 철자: beautiful.',
            ],
            tip: '자음+y로 끝나는 단어에 접미사를 붙이면 y→i로 바뀝니다(beauty→beautiful).',
          },
        },
        {
          questionNo: '28',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "The nature reserve suppots a variety...".',
          answer: 'supports',
          solution: {
            method: '"뒷받침하다/유지하다"는 동사의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: suppots.',
              '바른 단어는 support — p 다음에 또 p, 그리고 r이 들어간다(sup-port).',
              '3인칭 단수형은 supports.',
            ],
            tip: 'support는 p가 두 번(sup-port)이며 r을 빠뜨리지 않도록 주의합니다.',
          },
        },
        {
          questionNo: '29',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "how importent conservation is".',
          answer: 'important',
          solution: {
            method: '"중요한"이라는 단어의 끝 철자(-ant)를 확인한다.',
            steps: [
              '잘못된 철자: importent.',
              '바른 단어는 important — 끝이 -ent가 아니라 -ant.',
              '따라서 important.',
            ],
            tip: 'important는 끝이 -ant입니다(importent ✗).',
          },
        },
        {
          questionNo: '30',
          format: 'editing',
          marks: 1,
          stem: 'Correct the bold word: "conservation afforts".',
          answer: 'efforts',
          solution: {
            method: '"노력"을 뜻하는 단어의 첫 글자를 확인한다.',
            steps: [
              '잘못된 철자: afforts.',
              '바른 단어는 effort — 첫 글자가 a가 아니라 e.',
              '복수형은 efforts.',
            ],
            tip: 'effort는 e로 시작합니다(afforts ✗ → efforts).',
          },
        },
      ],
    },

    // =========================================================================
    // Section G — Comprehension Cloze (4 x 1 mark) — Q31–34 (own word)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secG-ccloze',
      topic: 'ComprehensionFIB',
      title: 'Section G — Comprehension Cloze',
      instructions: 'Fill in the blanks with the most suitable word of your own.',
      passage:
        'Slime is fun to play with. It has a great texture and can be colourful too. Would you (31) ________ to make your own slime at home?\n\n' +
        'You just need to get some simple materials such (32) ________ glue, salt water and baking soda. In a bowl, pour in the glue and the baking soda and mix well. Finally, put in the salt water and watch the slime form. Once the (33) ________ has formed, you can stretch and mould it. You can also (34) ________ some food colouring into the slime. This addition gives your slime a vibrant colour. Start your slime experiment at home today!\n\n' +
        '(Adapted from homesciencetools.com — how to make slime)',
      marks: 4,
      questions: [
        {
          questionNo: '31',
          format: 'fib',
          marks: 1,
          stem: 'Would you (31) ________ to make your own slime at home?',
          answer: 'like',
          solution: {
            method: '"Would you ___ to ~?" 형태에 맞는 동사를 넣는다.',
            steps: [
              '"Would you like to ~?"는 "~하고 싶나요?"라는 표준 권유 표현.',
              '빈칸에 like를 넣으면 자연스럽다 → like. (공식 정답표 확인됨)',
            ],
            tip: '"Would you like to ~?"는 상대에게 권유할 때 쓰는 정해진 표현입니다.',
          },
        },
        {
          questionNo: '32',
          format: 'fib',
          marks: 1,
          stem: 'You just need... some simple materials such (32) ________ glue, salt water and baking soda.',
          answer: 'as',
          solution: {
            method: '"such ___ + 예시" 구문을 완성한다.',
            steps: [
              '"such as"는 "~와 같은"이라는 예시 도입 표현.',
              '뒤에 glue, salt water 등 예시가 나오므로 "such as"가 맞다.',
              '따라서 빈칸은 as.',
            ],
            tip: '"such as"는 예를 들 때 쓰는 굳어진 표현입니다.',
          },
        },
        {
          questionNo: '33',
          format: 'fib',
          marks: 1,
          stem: 'Once the (33) ________ has formed, you can stretch and mould it.',
          answer: 'slime',
          solution: {
            method: '글 전체 주제어를 떠올려 빈칸을 채운다.',
            steps: [
              '이 글은 "slime(슬라임)" 만드는 법.',
              '"watch the slime form" → 슬라임이 만들어진 뒤를 말하므로 "the slime has formed".',
              '따라서 빈칸은 slime.',
            ],
            tip: '독해 클로즈는 글 전체에서 반복되는 핵심어를 단서로 삼습니다.',
          },
        },
        {
          questionNo: '34',
          format: 'fib',
          marks: 1,
          stem: 'You can also (34) ________ some food colouring into the slime.',
          answer: 'add',
          solution: {
            method: '"색소를 슬라임에 ~하다"에 맞는 동사를 넣는다.',
            steps: [
              '식용 색소를 슬라임에 넣는 동작 → add(더하다)가 자연스럽다.',
              '"add some food colouring into the slime" → add. (공식 정답표 확인됨)',
            ],
            tip: '"add A into/to B"는 "A를 B에 더하다/넣다"는 뜻입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section H — Comprehension: Selected Response & Open-ended (8 marks) — Q35–41
    // 지문: Taki, Haru and Koko the monkey
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secH-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section H — Comprehension: Taki, Haru and Koko',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'Taki and Haru lived in a small village near the jungle. They made a living by hunting animals and selling their meat in the village market. They were carefree and happy.\n\n' +
        'One day, Taki and Haru were hunting for wild boars in the jungle. As it was getting late, they decided to go home even though they were empty-handed. Suddenly, they heard a sound. Thinking it could be a wild animal, they decided to investigate. As Haru went near a tree, he realised that the sound was coming from a baby monkey which had a cut on one of its paws. The monkey tapped miserably on the ground and stared weakly at the boys. Haru suggested they bring the monkey back.\n\n' +
        'The two boys took the poor monkey home. They gave it bananas to eat before treating its wound. They named the monkey Koko. Koko was a friendly but mischievous monkey. Sometimes, it would throw banana peels at passers-by. Koko was also a helpful monkey as it helped to guard the house when the boys were not around.\n\n' +
        'The two boys trained it to pluck coconuts and taught it some tricks so that they could earn some extra money. Koko performed these tricks for the villagers and they were amused. Some even paid Taki and Haru to get Koko to perform at village festivals.',
      marks: 8,
      questions: [
        {
          questionNo: '35',
          format: 'open',
          marks: 1,
          stem: "Where was Taki and Haru's village located?",
          answer: 'It was located near the jungle.',
          solution: {
            method: '지문 첫 문장에서 마을 위치를 찾는다.',
            steps: [
              '1단락: "Taki and Haru lived in a small village near the jungle."',
              '마을은 정글 근처에 있었다.',
              '완전한 문장으로: "It was located near the jungle."',
            ],
            tip: '위치(Where) 질문의 답은 보통 글 맨 앞 배경 설명에 있습니다.',
          },
        },
        {
          questionNo: '36',
          format: 'mcq',
          marks: 1,
          stem: "Tick your chosen answer. The word 'he' in line 7 refers to ________.",
          options: [
            { label: '1', text: 'Taki' },
            { label: '2', text: 'Haru' },
            { label: '3', text: 'the wild animal' },
          ],
          answer: '2',
          solution: {
            method: "대명사 'he' 바로 앞 주어를 찾는다.",
            steps: [
              '해당 문장: "As Haru went near a tree, he realised..."',
              "'he'는 바로 앞의 주어 Haru를 가리킨다.",
              '따라서 정답은 (2) Haru.',
            ],
            tip: '지시 대명사는 같은 문장 안 가장 가까운 주어를 먼저 확인합니다.',
          },
        },
        {
          questionNo: '37',
          format: 'mcq',
          marks: 1,
          stem:
            "Which word has the same meaning as 'sadly'? Circle (A) or (B). Sentence: \"The monkey tapped miserably (A) on the ground and stared weakly (B) at the boys.\"",
          options: [
            { label: 'A', text: 'miserably' },
            { label: 'B', text: 'weakly' },
          ],
          answer: 'A',
          solution: {
            method: "sadly(슬프게)와 같은 뜻의 단어를 고른다.",
            steps: [
              'miserably = 비참하게/슬프게 → sadly와 의미가 통한다.',
              'weakly = 약하게(기운 없이) → sadly와 다르다.',
              '따라서 정답은 (A) miserably.',
            ],
            tip: '-ly 부사의 어근 의미를 보면 동의어를 쉽게 찾습니다(miserable=비참한).',
          },
        },
        {
          questionNo: '38',
          format: 'open',
          marks: 1,
          stem:
            'Refer to paragraphs 2 and 3. Tick "True" or "False": Taki and Haru caught a wild boar before they found a monkey.',
          answer: 'False',
          solution: {
            method: '사냥 결과를 2단락에서 확인한다.',
            steps: [
              '2단락: "they decided to go home even though they were empty-handed."',
              '빈손(empty-handed)이었으므로 멧돼지를 잡지 못했다.',
              '따라서 "멧돼지를 잡았다"는 거짓 → False.',
            ],
            tip: '"empty-handed"(빈손)는 아무것도 못 잡았다는 핵심 단서입니다.',
          },
        },
        {
          questionNo: '39',
          format: 'open',
          marks: 1,
          stem:
            'Refer to paragraphs 2 and 3. Tick "True" or "False": Koko was a well-behaved monkey.',
          answer: 'False',
          solution: {
            method: 'Koko의 성격 묘사를 3단락에서 확인한다.',
            steps: [
              '3단락: "Koko was a friendly but mischievous monkey."',
              '장난기 많고(mischievous), 행인에게 바나나 껍질을 던지기도 했다.',
              '따라서 "얌전했다(well-behaved)"는 거짓 → False.',
            ],
            tip: '"mischievous"(장난꾸러기) 같은 단어가 나오면 well-behaved와 반대임을 기억하세요.',
          },
        },
        {
          questionNo: '40',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 to indicate the order of events.\n' +
            '( ) The boys fed Koko.\n' +
            '( ) The boys taught Koko tricks.\n' +
            "( ) The boys treated Koko's injured paw.",
          answer:
            "The boys fed Koko = 1; The boys taught Koko tricks = 3; The boys treated Koko's injured paw = 2",
          solution: {
            method: '지문 속 시간 단서(before, 이후 단락)를 따라 순서를 정한다.',
            steps: [
              '3단락: "They gave it bananas to eat before treating its wound." → 먹이를 먼저 줌(1), 그 다음 상처 치료(2).',
              '4단락: "trained it... taught it some tricks" → 나중에 재주를 가르침(3).',
              '따라서 순서: 먹이=1, 상처 치료=2, 재주 가르침=3.',
            ],
            tip: '"before"는 앞 동작이 먼저임을 알려주는 강력한 순서 단서입니다.',
          },
        },
        {
          questionNo: '41',
          format: 'open',
          marks: 2,
          stem:
            'Name two things that Koko did to earn money for the boys.\n(i) ________\n(ii) ________',
          answer: '(i) plucked coconuts  (ii) performed tricks (for the villagers / at village festivals)',
          solution: {
            method: '4단락에서 Koko가 돈벌이를 위해 한 일 두 가지를 찾는다.',
            steps: [
              '4단락: "trained it to pluck coconuts and taught it some tricks so that they could earn some extra money."',
              '"Koko performed these tricks for the villagers..." → 재주를 부려 보여줌.',
              '(i) 코코넛을 따는 일 / (ii) 마을 사람들 앞에서 재주를 부리는 일.',
            ],
            tip: '"two things"는 지문에서 and로 이어진 두 활동을 각각 나눠 적습니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section I — Comprehension: Open-ended (4 x 2 marks) — Q42–45
    // 지문: The Sad Peacock (공작과 나이팅게일, 요정)
    // =========================================================================
    {
      kind: 'set',
      id: 'chs-pp1-secI-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section I — Comprehension: The Sad Peacock',
      instructions: 'Read the passage carefully. Write your answers in complete sentences.',
      passage:
        'A stunning peacock was dancing happily on a cool windy day. The weather was so pleasant that he started singing too. However, his rough voice sounded so horrible that he became very upset about not being able to sing well.\n\n' +
        'At that moment, a nightingale started singing near him. The melodious voice of the nightingale further dampened his spirit. He wondered why he had such a horrible voice while the nightingale had such a beautiful one. The peacock even stopped dancing as sadness filled him.\n\n' +
        'A fairy appeared and noticed that the peacock who loved dancing was looking gloomy.\n\n' +
        '"Why do you look so sad?" the fairy asked the peacock. "Why don\'t I have a melodious voice just like the nightingale? It is unfair that I cannot sing as beautifully as the nightingale," complained the peacock.\n\n' +
        'The fairy calmly replied, "Everyone is special in his own way. We all have unique traits and talents that help us shine. The nightingale is blessed with a pleasant voice, but you are also blessed with your unique dancing talent." The fairy reminded the peacock not to compare himself with others.\n\n' +
        '"I understand now. I\'ll never be happy with myself if I keep comparing myself to others. Thank you for your advice," said the peacock.\n\n' +
        'The peacock thought how silly he had been. "I had been so busy comparing myself to others that I forgot I had my own unique talent." He learnt that he should treasure what he has and shine in his own way.\n\n' +
        '(Adapted from alltimeshortstories.com — the sad peacock moral stories)',
      marks: 8,
      questions: [
        {
          questionNo: '42',
          format: 'open',
          marks: 2,
          stem: 'What was the peacock doing at the start of the story?',
          answer: 'At the start of the story, the peacock was dancing and singing (happily, on a cool windy day).',
          solution: {
            method: '1단락에서 공작의 처음 행동 두 가지를 모두 찾아 완전한 문장으로 답한다.',
            steps: [
              '1단락: "A stunning peacock was dancing happily on a cool windy day. ... he started singing too."',
              '처음에 공작은 즐겁게 "춤추면서 노래도" 부르고 있었다.',
              '완전한 문장으로: "The peacock was dancing and singing." (두 가지를 모두 적어야 만점)',
            ],
            tip: '서술형은 주어와 동사를 갖춘 완전한 문장으로 답해야 만점입니다.',
          },
        },
        {
          questionNo: '43',
          format: 'open',
          marks: 2,
          stem: 'Which 3-word phrase in paragraph 2 shows that the peacock felt discouraged?',
          answer: 'dampened his spirit',
          solution: {
            method: '2단락에서 "기가 꺾였다"를 보여주는 세 단어 표현을 찾는다.',
            steps: [
              '2단락: "The melodious voice of the nightingale further dampened his spirit."',
              '"dampened his spirit" = 그의 기운을 꺾었다 → 낙담함.',
              '세 단어 표현이므로 그대로 "dampened his spirit".',
            ],
            tip: '"3-word phrase"는 정확히 세 단어를 지문에서 그대로 옮겨 적습니다.',
          },
        },
        {
          questionNo: '44',
          format: 'open',
          marks: 2,
          stem: "Who does the word 'you' in line 15 refer to?",
          answer: "The word 'you' refers to the peacock.",
          solution: {
            method: "요정이 말한 'you'가 누구를 향한 것인지 확인한다.",
            steps: [
              '15번째 줄: 요정이 "...but you are also blessed with your unique dancing talent."라고 말함.',
              '요정은 공작에게 말하고 있으므로 you = the peacock.',
              "완전한 문장: \"The word 'you' refers to the peacock.\"",
            ],
            tip: '대화 속 you는 "말을 듣고 있는 상대"를 가리킵니다(여기서는 공작).',
          },
        },
        {
          questionNo: '45',
          format: 'open',
          marks: 2,
          stem: 'Why did the peacock feel that he was silly at the end?',
          answer:
            'The peacock felt silly because he had been so busy comparing himself to others that he forgot he had his own unique talent.',
          solution: {
            method: '마지막 단락에서 공작이 스스로 한 말을 근거로 이유를 쓴다.',
            steps: [
              '마지막 단락: "I had been so busy comparing myself to others that I forgot I had my own unique talent."',
              '남과 비교하느라 자신만의 재능을 잊고 있었기 때문에 어리석었다고 느낌.',
              '완전한 문장으로 이유를 서술한다.',
            ],
            tip: '"Why" 질문은 "because ~" 형태로 이유를 분명히 밝혀 답합니다.',
          },
        },
      ],
    },
  ],
};

export default practicePaper1CatholicHighPrimaryEnglish2023;
