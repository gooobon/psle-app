// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2022.ts
// Nanyang Primary School — 2022 Term 1 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 273–279 (시험지 표지 p.1–5)
// Duration: 30 minutes / Total: 20 marks
// ★ 공식 정답표(p289) 기준 20문항 전부 100% 일치 확인됨.
// 구성: A문법(4) B어휘(4) C전치사클로즈(4) D주술일치클로즈(4) E교정(4) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2022: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2022,
    assessment: 'Term 1 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 30,
    totalMarks: 20,
    sourcePages: 'pp.273–279 (paper pp.1–5)',
  },

  items: [
    // (A) Grammar Q1-4
    {
      kind: 'single', id: 'ny22wa1-q1', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 1, marks: 1,
      stem: 'Tom ________ as he was unwrapping the present and saw it was what he had wanted.',
      options: [{ label: '1', text: 'cheer' }, { label: '2', text: 'cheers' }, { label: '3', text: 'cheered' }, { label: '4', text: 'is cheering' }],
      answer: '3',
      solution: { method: '"was unwrapping"(과거진행) + "saw"(과거)에 맞는 시제를 고른다.', steps: ['"was unwrapping"(과거진행)과 "saw"(과거)가 모두 과거 시점을 나타낸다.', 'Tom이 기뻐한 것도 같은 과거 시점 → cheered(과거) → 정답 (3).'], tip: '지문 전체가 과거이면 빈칸도 과거형을 씁니다.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q2', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 2, marks: 1,
      stem: 'My sister prefers to complete the work ________ instead of asking for help.',
      options: [{ label: '1', text: 'herself' }, { label: '2', text: 'himself' }, { label: '3', text: 'ourselves' }, { label: '4', text: 'themselves' }],
      answer: '1',
      solution: { method: '"My sister"(3인칭 여성 단수)에 맞는 재귀대명사를 고른다.', steps: ['"My sister"는 3인칭 여성 단수 → herself.', '따라서 정답 (1) herself.'], tip: 'she/sister → herself' },
    },
    {
      kind: 'single', id: 'ny22wa1-q3', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 3, marks: 1,
      stem: 'Mother baked ________ mouth-watering apple pies on that table for our housewarming party.',
      options: [{ label: '1', text: 'this' }, { label: '2', text: 'that' }, { label: '3', text: 'these' }, { label: '4', text: 'those' }],
      answer: '4',
      solution: { method: '"apple pies"(복수) + "that table"(저쪽 테이블, 먼 거리)을 본다.', steps: ['"apple pies"는 복수 → these/those 중 하나.', '"on that table"(저 테이블)은 먼 거리 → those → 정답 (4).'], tip: '"that table"(먼 거리+단수) 위에 있는 복수 사물은 those로 가리킵니다.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q4', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 4, marks: 1,
      stem: 'Feeling anxious, Fiona took in ________ deep breaths before her performance.',
      options: [{ label: '1', text: 'any' }, { label: '2', text: 'much' }, { label: '3', text: 'a few' }, { label: '4', text: 'a little' }],
      answer: '3',
      solution: { method: '"deep breaths"(가산 복수)에 맞는 수량 표현을 고른다.', steps: ['"breaths"는 가산 복수 명사 → much/a little(불가산용) 제외.', '"a few" = 몇 개의(가산 복수) → "took a few deep breaths"가 자연스럽다 → 정답 (3).'], tip: '"take a few deep breaths"는 불안할 때 심호흡을 몇 번 하는 정해진 표현입니다.' },
    },
    // (B) Vocabulary Q5-8
    {
      kind: 'single', id: 'ny22wa1-q5', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 5, marks: 1,
      stem: 'The ________ warrior defeated all his enemies.',
      options: [{ label: '1', text: 'loud' }, { label: '2', text: 'invisible' }, { label: '3', text: 'invincible' }, { label: '4', text: 'unfriendly' }],
      answer: '3',
      solution: { method: '"모든 적을 물리쳤다"는 전사의 특성을 나타내는 형용사를 고른다.', steps: ['"defeated all his enemies"(모든 적을 물리침) → 패배하지 않는/무적의.', '"invincible" = 무적의, 정복할 수 없는 → 정확히 일치 → 정답 (3).'], tip: '"invincible"은 "in-(부정)+vincible(정복할 수 있는)"으로 "정복 불가능한/무적"을 뜻합니다.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q6', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 6, marks: 1,
      stem: 'Eating a ________ mushroom is deadly.',
      options: [{ label: '1', text: 'wild' }, { label: '2', text: 'bitter' }, { label: '3', text: 'poisonous' }, { label: '4', text: 'overcooked' }],
      answer: '3',
      solution: { method: '"먹으면 죽는다"는 결과에 맞는 버섯의 특성을 고른다.', steps: ['"is deadly"(치명적이다) → 독이 있어야 치명적.', '"poisonous" = 독이 있는 → 정확히 일치 → 정답 (3).'], tip: '"deadly"(치명적)는 poisonous(독이 있는)와 자연스럽게 짝을 이룹니다.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q7', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 7, marks: 1,
      stem: "The class roared with laughter when the teacher's stomach ________.",
      options: [{ label: '1', text: 'jumbled' }, { label: '2', text: 'rumbled' }, { label: '3', text: 'fumbled' }, { label: '4', text: 'crumbled' }],
      answer: '2',
      solution: { method: '배에서 꾸르륵 소리가 나는 동사를 고른다.', steps: ['"roared with laughter"(반 전체가 폭소) → 웃음의 원인은 선생님 배에서 소리가 남.', '"rumbled" = (배에서) 꾸르륵거리다 → 정답 (2).'], tip: '"stomach rumbled"는 배에서 꾸르륵 소리가 나는 것을 나타냅니다.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q8', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 8, marks: 1,
      stem: '"Shall we go on a ________ through the park?" Brother suggested as he put on his walking shoes.',
      options: [{ label: '1', text: 'stroll' }, { label: '2', text: 'swim' }, { label: '3', text: 'climb' }, { label: '4', text: 'picnic' }],
      answer: '1',
      solution: { method: '"through the park"(공원을 통해)와 "walking shoes"(걷는 신발)에 맞는 단어를 고른다.', steps: ['"put on his walking shoes"(걷는 신발 착용) → 걷는 활동.', '"through the park"(공원을 거니는) + "stroll"(산책) → 정확히 일치 → 정답 (1).'], tip: '"go on a stroll through the park"는 공원을 거닐다는 표현입니다.' },
    },
    // (C) Grammar Cloze – Prepositions Q9-12
    {
      kind: 'set',
      id: 'ny22wa1-secC',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Prepositions',
      instructions: 'Box: (A) up  (B) to  (C) down  (D) from  (E) under  (F) between',
      passage: '"Twenty, nineteen, eighteen..." Bob started counting (9) ________ loudly. Carol and I grinned as we signalled (10) ________ each other the possible hiding spots. "Should I hide under the blanket? No, that\'s too easy to find," I thought.\n\nJust then, I spotted a better location (11) ________ the corner of my eye. "The gap (12) ________ the wall and cupboard!" I giggled and scrambled to my new hideout.\n\n"Ready? I\'m coming!" Bob exclaimed.',
      marks: 4,
      questions: [
        { questionNo: '9', format: 'fib', marks: 1, stem: 'Bob started counting (9) ________ loudly.', answer: 'C',
          solution: { method: '"카운트다운"(숫자가 줄어드는)에 맞는 전치사구를 고른다.', steps: ['"Twenty, nineteen, eighteen..."는 카운트다운(하향) → "counting down"(셋 다운).', '보기에서 down은 (C) → 정답 (C).'], tip: '"count down"은 숫자가 내려가는 카운트다운을 나타냅니다.' } },
        { questionNo: '10', format: 'fib', marks: 1, stem: 'Carol and I grinned as we signalled (10) ________ each other the possible hiding spots.', answer: 'B',
          solution: { method: '"신호를 보내다"의 전치사를 고른다.', steps: ['"signal to someone" = ~에게 신호를 보내다 → 정해진 표현.', '보기에서 to는 (B) → 정답 (B).'], tip: '"signal to"는 누군가에게 신호를 보내는 표현입니다.' } },
        { questionNo: '11', format: 'fib', marks: 1, stem: 'I spotted a better location (11) ________ the corner of my eye.', answer: 'D',
          solution: { method: '"눈의 구석(곁눈)으로"라는 표현에 맞는 전치사를 고른다.', steps: ['"from the corner of my eye" = 곁눈으로/눈의 구석으로 → 정해진 관용구.', '보기에서 from은 (D) → 정답 (D).'], tip: '"from the corner of one\'s eye"는 곁눈으로 보다라는 관용 표현입니다.' } },
        { questionNo: '12', format: 'fib', marks: 1, stem: 'The gap (12) ________ the wall and cupboard!', answer: 'F',
          solution: { method: '"벽과 찬장 사이의 틈"에 맞는 전치사를 고른다.', steps: ['"the gap between A and B" = A와 B 사이의 틈 → 정해진 표현.', '보기에서 between은 (F) → 정답 (F).'], tip: '"between A and B"는 두 사물 사이를 나타냅니다.' } },
      ],
    },
    // (D) Grammar Cloze – SVA Q13-16
    {
      kind: 'set',
      id: 'ny22wa1-secD',
      topic: 'GrammarCloze',
      title: '(D) Grammar Cloze — Subject-Verb Agreement',
      instructions: 'Underline the correct word from the given words in the brackets.',
      passage: 'Superheroes (13) [come / comes] in all shapes and sizes. Sometimes, they even (14) [has / have] tails! Dogs can be superheroes too, and their keen sense of smell (15) [is / are] their superpower.\n\nOn October 11, 2021, a dog named Rocky (16) [was / were] presented with the "Animal of the Year" award. Rocky had helped to save over a hundred koalas from the Australian bushfires between 2019 and 2020.\n\nFor its bravery, it received a year\'s worth of dog treats!\n\n(Adapted from dogonews.com, 2021)',
      marks: 4,
      questions: [
        { questionNo: '13', format: 'fib', marks: 1, stem: 'Superheroes (13) [come / comes] in all shapes and sizes.', answer: 'come',
          solution: { method: '"Superheroes"(복수) → 동사 원형.', steps: ['복수 주어 + 단순현재 → come(원형).'], tip: '복수 주어에는 -s를 붙이지 않습니다.' } },
        { questionNo: '14', format: 'fib', marks: 1, stem: 'Sometimes, they even (14) [has / have] tails!', answer: 'have',
          solution: { method: '"they"(복수) → have.', steps: ['"they"는 복수 → have.'], tip: 'they → have (has는 단수 주어용)' } },
        { questionNo: '15', format: 'fib', marks: 1, stem: 'their keen sense of smell (15) [is / are] their superpower.', answer: 'is',
          solution: { method: '"sense of smell"(단수 핵심 명사)를 본다.', steps: ['"sense"가 핵심 명사(단수) → is.'], tip: '"A of B" 구조에서 A(핵심 명사)가 수를 결정합니다.' } },
        { questionNo: '16', format: 'fib', marks: 1, stem: 'a dog named Rocky (16) [was / were] presented with the "Animal of the Year" award.', answer: 'was',
          solution: { method: '"a dog"(단수) + 과거시제를 본다.', steps: ['단수 주어 + 과거 be동사 → was.'], tip: '단수 주어의 과거 be동사는 was입니다.' } },
      ],
    },
    // (E) Editing Q17-20
    {
      kind: 'set',
      id: 'ny22wa1-secE',
      topic: 'Editing',
      title: '(E) Editing for Spelling',
      instructions: 'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage: 'It was David\'s family outing day! At the beach, his father\'s arm (17) [musels] were put to good use as he carried their belongings from the car to their (18) [favurit] spot. His mother quickly set up the picnic mat and placed the containers of food on it. She asked cheekily, "David, feeling (19) [hangree] yet?"\n\nDavid nodded eagerly and squealed at the (20) [feest] prepared. There were tuna sandwiches, egg salad, and even a whole roasted chicken! "Let\'s dig in!" Father suggested.',
      marks: 4,
      questions: [
        { questionNo: '17', format: 'editing', marks: 1, stem: 'his father\'s arm [musels] were put to good use', answer: 'muscles',
          solution: { method: '"근육"의 정확한 철자를 확인한다.', steps: ['잘못된 철자: musels.', '바른 단어: muscles — m-u-s-c-l-e-s.'], tip: 'muscles는 "musc-les"로 c가 들어갑니다.' } },
        { questionNo: '18', format: 'editing', marks: 1, stem: 'their [favurit] spot', answer: 'favourite',
          solution: { method: '"좋아하는"이라는 단어의 정확한 철자를 확인한다.', steps: ['잘못된 철자: favurit.', '바른 단어: favourite — f-a-v-o-u-r-i-t-e.'], tip: 'favourite는 "fav-our-ite"로 씁니다.' } },
        { questionNo: '19', format: 'editing', marks: 1, stem: '"David, feeling [hangree] yet?"', answer: 'hungry',
          solution: { method: '"배고픈"이라는 단어의 정확한 철자를 확인한다.', steps: ['잘못된 철자: hangree.', '바른 단어: hungry — h-u-n-g-r-y.'], tip: 'hungry는 "hung-ry"로 씁니다.' } },
        { questionNo: '20', format: 'editing', marks: 1, stem: 'David nodded eagerly and squealed at the [feest] prepared.', answer: 'feast',
          solution: { method: '"잔치/성찬"이라는 단어의 정확한 철자를 확인한다.', steps: ['잘못된 철자: feest.', '바른 단어: feast — f-e-a-s-t (ea로 씀).'], tip: 'feast는 "fe-ast"로 ee가 아닌 ea로 씁니다.' } },
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2022;
