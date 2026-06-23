// =============================================================================
// src/data/p3/english/papers/wa1_catholic_high_primary_english_2022.ts
// Catholic High School (Primary) — Primary 3 English Language 2022 Weighted Assessment 1
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 292–296 (시험지 표지 p.1–5)
// Total: 30 marks (30 questions)
// ★ 공식 정답표(p298) 기준 30문항 전부 100% 일치 확인됨.
// 구성: A문법MCQ(10) B어휘MCQ(10) C문법클로즈(5) D어휘클로즈(5) = 30점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1CatholicHighPrimaryEnglish2022: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2022,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 30,
    sourcePages: 'pp.292–296 (paper pp.1–5)',
  },

  items: [
    // Section A: Grammar MCQ (10 x 1m) Q1-10
    {
      kind: 'single', id: 'chs22-q1', topic: 'GrammarMCQ', format: 'mcq', questionNo: 1, marks: 1,
      stem: 'Max and his friend ________ to East Coast Park every Saturday morning.',
      options: [{ label: '1', text: 'cycle' }, { label: '2', text: 'cycles' }, { label: '3', text: 'cycled' }, { label: '4', text: 'are cycling' }],
      answer: '1',
      solution: { method: '"every Saturday morning"(매주 토요일)이라는 반복 습관과 복수 주어를 본다.', steps: ['"Max and his friend"는 복수.', '"every Saturday morning"은 반복 습관 → 단순현재, 복수 주어 → 동사 원형.', 'cycle(복수 주어 단순현재) → 정답 (1).'], tip: '"every + time expression"은 단순현재 반복 동작을 나타냅니다.' },
    },
    {
      kind: 'single', id: 'chs22-q2', topic: 'GrammarMCQ', format: 'mcq', questionNo: 2, marks: 1,
      stem: 'Every pupil in the school ________ to take his temperature daily.',
      options: [{ label: '1', text: 'has' }, { label: '2', text: 'had' }, { label: '3', text: 'have' }, { label: '4', text: 'are having' }],
      answer: '1',
      solution: { method: '"Every pupil"(단수)과 현재 규칙을 본다.', steps: ['"Every pupil"은 단수 취급.', '현재 규칙/의무 → 단순현재, 단수 → has.', 'has → 정답 (1).'], tip: '"Every" 뒤의 명사는 단수 취급합니다(has, is, was).' },
    },
    {
      kind: 'single', id: 'chs22-q3', topic: 'GrammarMCQ', format: 'mcq', questionNo: 3, marks: 1,
      stem: '________ group of boys on the field over there is playing soccer.',
      options: [{ label: '1', text: 'This' }, { label: '2', text: 'That' }, { label: '3', text: 'These' }, { label: '4', text: 'Those' }],
      answer: '2',
      solution: { method: '"group"(단수) + "over there"(먼 거리)를 본다.', steps: ['"group"은 단수 → This/That.', '"over there"(저쪽)는 먼 거리 → That.', 'That → 정답 (2).'], tip: '"over there"(저쪽)는 먼 거리 → that/those.' },
    },
    {
      kind: 'single', id: 'chs22-q4', topic: 'GrammarMCQ', format: 'mcq', questionNo: 4, marks: 1,
      stem: 'I have taken my friend\'s worksheets by mistake. I will return ________ to him when I see him.',
      options: [{ label: '1', text: 'it' }, { label: '2', text: 'us' }, { label: '3', text: 'his' }, { label: '4', text: 'them' }],
      answer: '4',
      solution: { method: '"worksheets"(복수 명사)를 가리키는 목적격 대명사를 고른다.', steps: ['"worksheets"는 복수 → them(복수 목적격).', 'them → 정답 (4).'], tip: '복수 사물의 목적격 대명사는 them입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q5', topic: 'GrammarMCQ', format: 'mcq', questionNo: 5, marks: 1,
      stem: 'Mother ________ in the kitchen when her mobile phone rang.',
      options: [{ label: '1', text: 'cooks' }, { label: '2', text: 'cooked' }, { label: '3', text: 'is cooking' }, { label: '4', text: 'was cooking' }],
      answer: '4',
      solution: { method: '"rang"(과거)가 일어났을 때 진행 중이던 동작을 고른다.', steps: ['"rang"는 과거의 한순간.', 'Mother는 그 순간 요리하는 "among / in the middle of"이었다 → 과거진행형.', '단수 → was cooking → 정답 (4).'], tip: '"when + past event"에서 진행 중이던 동작은 was/were -ing입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q6', topic: 'GrammarMCQ', format: 'mcq', questionNo: 6, marks: 1,
      stem: 'Chitra misses her best friend, Nisha. It has been five years ________ she left Singapore.',
      options: [{ label: '1', text: 'but' }, { label: '2', text: 'after' }, { label: '3', text: 'since' }, { label: '4', text: 'although' }],
      answer: '3',
      solution: { method: '"It has been [period of time] + ___"에 맞는 접속사를 고른다.', steps: ['"It has been five years since she left"(그녀가 떠난 이후 5년이 됐다) — 정해진 표현.', '"since" = ~한 이후로 → 정답 (3).'], tip: '"It has been [period of time] since [past event]"은 "It has been [period of time] since something happened"라는 뜻입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q7', topic: 'GrammarMCQ', format: 'mcq', questionNo: 7, marks: 1,
      stem: 'Wee Boon\'s father ________ for a meeting earlier in the day.',
      options: [{ label: '1', text: 'left' }, { label: '2', text: 'leave' }, { label: '3', text: 'leaves' }, { label: '4', text: 'is leaving' }],
      answer: '1',
      solution: { method: '"earlier in the day"(오늘 낮 일찍)라는 과거 시점을 본다.', steps: ['"earlier in the day"는 이미 지나간 과거 시점.', '단순과거 → left → 정답 (1).'], tip: '"earlier"는 과거시제의 신호입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q8', topic: 'GrammarMCQ', format: 'mcq', questionNo: 8, marks: 1,
      stem: '"There is still ________ shampoo left in the bottle. Use it first," my mother told my sister.',
      options: [{ label: '1', text: 'any' }, { label: '2', text: 'few' }, { label: '3', text: 'some' }, { label: '4', text: 'many' }],
      answer: '3',
      solution: { method: '"shampoo"(불가산)와 긍정문의 수량사를 고른다.', steps: ['shampoo는 불가산 → few/many 제외.', '긍정문 + 불가산 → "some"(얼마간 있다) → 정답 (3).'], tip: '긍정문에서 불가산 명사와 함께는 some을 씁니다.' },
    },
    {
      kind: 'single', id: 'chs22-q9', topic: 'GrammarMCQ', format: 'mcq', questionNo: 9, marks: 1,
      stem: 'During the December holidays, Sally went ________ a vacation to New York with her family.',
      options: [{ label: '1', text: 'in' }, { label: '2', text: 'at' }, { label: '3', text: 'by' }, { label: '4', text: 'on' }],
      answer: '4',
      solution: { method: '"went ___ a vacation"에 맞는 전치사를 고른다.', steps: ['"went on a vacation" = 휴가를 갔다 → 정해진 표현.', '"on" → 정답 (4).'], tip: '"go on a vacation/trip/holiday"는 휴가/여행을 가다라는 표현입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q10', topic: 'GrammarMCQ', format: 'mcq', questionNo: 10, marks: 1,
      stem: '"Children, you must do the homework by ________ and not discuss the answers," Mrs Loh said.',
      options: [{ label: '1', text: 'itself' }, { label: '2', text: 'yourself' }, { label: '3', text: 'ourselves' }, { label: '4', text: 'yourselves' }],
      answer: '4',
      solution: { method: '"you"(복수 - children에게)에 맞는 재귀대명사를 고른다.', steps: ['"Children, you..."에서 you는 복수(여러 학생들)를 가리킴.', '2인칭 복수 재귀대명사 → yourselves → 정답 (4).'], tip: '여러 사람에게 "you" 복수로 말할 때 재귀대명사는 yourselves입니다.' },
    },
    // Section B: Vocabulary MCQ (10 x 1m) Q11-20
    {
      kind: 'single', id: 'chs22-q11', topic: 'VocabMCQ', format: 'mcq', questionNo: 11, marks: 1,
      stem: 'The thief ________ towards the back door when he heard the police siren.',
      options: [{ label: '1', text: 'bolted' }, { label: '2', text: 'strolled' }, { label: '3', text: 'trudged' }, { label: '4', text: 'stomped' }],
      answer: '1',
      solution: { method: '"Heard the police siren and quickly escaped through the back door"에 맞는 동사를 고른다.', steps: ['"heard the police siren"(경찰 사이렌) → 급하게 도망침.', '"bolted" = 급히 달아나다 → 정확히 일치 → 정답 (1).'], tip: '"bolt"는 두려움에 급히 달아나는 동작입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q12', topic: 'VocabMCQ', format: 'mcq', questionNo: 12, marks: 1,
      stem: 'Some of the customers were unhappy with the service in the restaurant. They ________ about the poor service to the owner.',
      options: [{ label: '1', text: 'fussed' }, { label: '2', text: 'sobbed' }, { label: '3', text: 'nagged' }, { label: '4', text: 'grumbled' }],
      answer: '4',
      solution: { method: '"To the owner about unsatisfactory service"라는 상황에 맞는 동사를 고른다.', steps: ['"unhappy with the service"(불만족) → 불평함.', '"grumbled about" = ~에 대해 투덜거리다/불평하다 → 정확히 일치 → 정답 (4).'], tip: '"grumble about"는 무언가에 대해 투덜거리는 동작입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q13', topic: 'VocabMCQ', format: 'mcq', questionNo: 13, marks: 1,
      stem: 'My brother gobbled the chocolate cake ________ as he was very hungry after lessons.',
      options: [{ label: '1', text: 'slowly' }, { label: '2', text: 'untidily' }, { label: '3', text: 'greedily' }, { label: '4', text: 'carelessly' }],
      answer: '3',
      solution: { method: '"Was so hungry that he/she gobbled up the cake"에 맞는 부사를 고른다.', steps: ['"very hungry"(매우 배고픔) + "gobbled"(허겁지겁 먹다) → 탐욕스럽게/욕심껏.', '"greedily" = 탐욕스럽게, 욕심껏 → 정확히 일치 → 정답 (3).'], tip: '"gobble + greedily"는 배고픔에 욕심껏 먹는 모습을 강조합니다.' },
    },
    {
      kind: 'single', id: 'chs22-q14', topic: 'VocabMCQ', format: 'mcq', questionNo: 14, marks: 1,
      stem: '"Please ________ the volume of the television. I\'m trying to do my homework," I told my sister.',
      options: [{ label: '1', text: 'turn up' }, { label: '2', text: 'turn over' }, { label: '3', text: 'turn away' }, { label: '4', text: 'turn down' }],
      answer: '4',
      solution: { method: '"Trying to do homework and asking someone to do something about the volume"는 문맥을 파악한다.', steps: ['"I\'m trying to do my homework"(숙제 중) → 조용히 해달라 → 볼륨을 줄여달라.', '"turn down the volume" = 볼륨을 줄이다 → 정답 (4).'], tip: '"turn down"은 볼륨·온도 등을 줄이는 동작입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q15', topic: 'VocabMCQ', format: 'mcq', questionNo: 15, marks: 1,
      stem: 'Gopal is unable to read without his glasses. He is blind like a ________.',
      options: [{ label: '1', text: 'bat' }, { label: '2', text: 'fox' }, { label: '3', text: 'pig' }, { label: '4', text: 'owl' }],
      answer: '1',
      solution: { method: '"Cannot see without glasses"는 특성과 맞는 동물 직유를 고른다.', steps: ['"unable to read without his glasses"(안경 없이 못 봄) → 시력이 매우 나쁨.', '"as blind as a bat" = 박쥐처럼 눈이 나쁜 → 정해진 직유 → 정답 (1).'], tip: '"as blind as a bat"은 눈이 매우 나쁜 것을 나타내는 정해진 직유입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q16', topic: 'VocabMCQ', format: 'mcq', questionNo: 16, marks: 1,
      stem: 'I felt a ________ of water fall on my hand. I think we need to hurry as it might rain soon.',
      options: [{ label: '1', text: 'pool' }, { label: '2', text: 'drop' }, { label: '3', text: 'splash' }, { label: '4', text: 'puddle' }],
      answer: '2',
      solution: { method: '"It looks like it will rain soon"는 문맥에서 손에 떨어진 것을 나타내는 단어를 고른다.', steps: ['"it might rain soon"(곧 비가 올 것) → 비 한 방울이 손에 떨어짐.', '"a drop of water" = 물 한 방울 → 정확히 일치 → 정답 (2).'], tip: '"a drop of water"는 물 한 방울로, 비가 시작될 때 느끼는 것입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q17', topic: 'VocabMCQ', format: 'mcq', questionNo: 17, marks: 1,
      stem: 'Betty towers over her older brother. She is ________.',
      options: [{ label: '1', text: 'as tall as a giraffe' }, { label: '2', text: 'as wise as an owl' }, { label: '3', text: 'as big as an elephant' }, { label: '4', text: 'as proud as a peacock' }],
      answer: '1',
      solution: { method: '"towers over her older brother"(오빠보다 훨씬 크다)에 맞는 직유를 고른다.', steps: ['"towers over"(훨씬 키가 큰) → 매우 큰 키.', '"as tall as a giraffe" = 기린처럼 키가 큰 → 정답 (1).'], tip: '"tower over someone"은 훨씬 키가 큰 것을 나타내며, 기린(giraffe)은 키가 큰 동물입니다.' },
    },
    {
      kind: 'single', id: 'chs22-q18', topic: 'VocabMCQ', format: 'mcq', questionNo: 18, marks: 1,
      stem: 'Aaron spilled some hot coffee on himself and as a result has ________ his leg.',
      options: [{ label: '1', text: 'blazed' }, { label: '2', text: 'twisted' }, { label: '3', text: 'scalded' }, { label: '4', text: 'sprained' }],
      answer: '3',
      solution: { method: '"Spilled hot coffee"는 결과로 생기는 부상을 고른다.', steps: ['"spilled hot coffee"(뜨거운 커피를 쏟음) → 화상.', '"scalded" = (뜨거운 액체로) 화상을 입다 → 정답 (3).'], tip: '"scald"는 뜨거운 액체나 증기로 화상을 입는 것을 나타냅니다.' },
    },
    {
      kind: 'single', id: 'chs22-q19', topic: 'VocabMCQ', format: 'mcq', questionNo: 19, marks: 1,
      stem: 'John is a ________ class monitor. You can trust him to take care of the class when the teacher is not around.',
      options: [{ label: '1', text: 'polite' }, { label: '2', text: 'strong' }, { label: '3', text: 'pleasant' }, { label: '4', text: 'responsible' }],
      answer: '4',
      solution: { method: '"Takes care of the class when the teacher is away"는 특성에 맞는 형용사를 고른다.', steps: ['"You can trust him to take care of the class"(믿고 맡길 수 있음) → 책임감 있는.', '"responsible" = 책임감 있는 → 정확히 일치 → 정답 (4).'], tip: '"trust him to take care"는 책임감(responsible)의 특성을 나타냅니다.' },
    },
    {
      kind: 'single', id: 'chs22-q20', topic: 'VocabMCQ', format: 'mcq', questionNo: 20, marks: 1,
      stem: '"Smoking is ________ to your health. You should slowly quit smoking," the doctor advised my father.',
      options: [{ label: '1', text: 'fearful' }, { label: '2', text: 'hurtful' }, { label: '3', text: 'painful' }, { label: '4', text: 'harmful' }],
      answer: '4',
      solution: { method: '"Is ___ for one's health"는 표현에 맞는 형용사를 고른다.', steps: ['"Smoking is ___ to your health" → 건강에 해롭다.', '"harmful to health" = 건강에 해로운 → 정확히 일치 → 정답 (4).'], tip: '"harmful to"는 건강·환경에 해롭다는 정해진 표현입니다.' },
    },
    // Section C: Grammar Cloze (5 x 1m) Q21-25
    {
      kind: 'set',
      id: 'chs22-secC',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze',
      instructions: 'Box: (A) I  (B) it  (C) my  (D) us  (E) we',
      passage: '"Preventing food wastage is important," Miss Yeo told our class. She told (21) ________ that we would be participating in the \'Clean Plate\' campaign.\n\nMiss Yeo instructed all of us to order only what (22) ________ could finish to avoid wastage. When I got home, I told (23) ________ mother about the campaign. She was happy as (24) ________ will teach me good eating habits. The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign. I was proud to be part of this campaign.\n\n(Adapted from http://surl.li/bdxaw)',
      marks: 5,
      questions: [
        { questionNo: '21', format: 'fib', marks: 1, stem: 'She told (21) ________ that we would be participating...', answer: 'D',
          solution: { method: 'Miss Yeo가 "we (our class students)"에게 말했다.', steps: ['"us"이라는 목적격 → us.', '보기 (D) us → 정답 (D).'], tip: 'us = 우리를(1인칭 복수 목적격)' } },
        { questionNo: '22', format: 'fib', marks: 1, stem: 'order only what (22) ________ could finish', answer: 'E',
          solution: { method: '"only what we can eat" → 주어는 "we".', steps: ['"only what all of us can eat" → we.', '보기 (E) we → 정답 (E).'], tip: 'we = 우리가(1인칭 복수 주격)' } },
        { questionNo: '23', format: 'fib', marks: 1, stem: 'I told (23) ________ mother about the campaign.', answer: 'C',
          solution: { method: '"my mother"라는 소유격.', steps: ['"told ___ mother" → "to my mother" → my.', '보기 (C) my → 정답 (C).'], tip: 'my = 나의(1인칭 단수 소유격)' } },
        { questionNo: '24', format: 'fib', marks: 1, stem: 'She was happy as (24) ________ will teach me good eating habits.', answer: 'B',
          solution: { method: '"campaign"을 가리키는 주어를 고른다.', steps: ['"it (the campaign) will teach me good eating habits" → it.', '보기 (B) it → 정답 (B).'], tip: '"the campaign"(단수 사물)을 받는 주어 대명사는 it입니다.' } },
        { questionNo: '25', format: 'fib', marks: 1, stem: 'The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign.', answer: 'A',
          solution: { method: '"I (the speaker) waited for Miss Yeo"의 주어.', steps: ['"I waited for Miss Yeo" → I.', '보기 (A) I → 정답 (A).'], tip: '화자 자신이 주어이면 I를 씁니다.' } },
      ],
    },
    // Section D: Vocabulary Cloze (5 x 1m) Q26-30
    {
      kind: 'set',
      id: 'chs22-secD',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions: 'Box: (A) carried  (B) medicine  (C) pet  (D) scratches  (E) whining',
      passage: 'Hazel adored animals. She wanted to own a (26) ________, but her parents could not afford to buy one. One day, Hazel was at the park when she heard an animal (27) ________ in pain. It was a stray puppy with many (28) ________ on its body. She gently (29) ________ the puppy to a veterinary clinic nearby. The vet applied some (30) ________ on the scratches. After the visit, Hazel decided to keep the puppy.',
      marks: 5,
      questions: [
        { questionNo: '26', format: 'fib', marks: 1, stem: 'She wanted to own a (26) ________', answer: 'C',
          solution: { method: '사고 싶었지만 부모가 살 수 없었던 것을 고른다.', steps: ['"adored animals"(동물을 좋아함) → "pet"(애완동물)을 원했다.', '보기 (C) pet → 정답 (C).'], tip: '"adored animals"는 pet을 원했다는 문맥 단서입니다.' } },
        { questionNo: '27', format: 'fib', marks: 1, stem: 'she heard an animal (27) ________ in pain', answer: 'E',
          solution: { method: '동물이 아파서 내는 소리를 나타내는 단어를 고른다.', steps: ['"in pain"(아파서) 동물이 내는 소리 → "whining"(낑낑거림).', '보기 (E) whining → 정답 (E).'], tip: '"whining"은 개·강아지가 아파서 낑낑거리는 소리입니다.' } },
        { questionNo: '28', format: 'fib', marks: 1, stem: 'a stray puppy with many (28) ________ on its body', answer: 'D',
          solution: { method: '강아지 몸에 있는 상처를 나타내는 단어를 고른다.', steps: ['"stray puppy"(떠돌이 강아지) + 몸의 상처 → "scratches"(긁힌 상처들).', '보기 (D) scratches → 정답 (D).'], tip: '"scratches"는 날카로운 것에 긁힌 상처들을 나타냅니다.' } },
        { questionNo: '29', format: 'fib', marks: 1, stem: 'She gently (29) ________ the puppy to a veterinary clinic nearby.', answer: 'A',
          solution: { method: '강아지를 동물병원으로 데려가는 동작을 나타내는 동사를 고른다.', steps: ['"to a veterinary clinic"(동물병원으로) 강아지를 옮김.', '"carried" = 안고/들고 갔다 → 정답 (A).'], tip: '"carried ... to"는 무언가를 들고/안고 어딘가로 가다라는 뜻입니다.' } },
        { questionNo: '30', format: 'fib', marks: 1, stem: 'The vet applied some (30) ________ on the scratches.', answer: 'B',
          solution: { method: '수의사가 긁힌 상처에 발라주는 것을 고른다.', steps: ['"vet applied some ___ on the scratches"(긁힌 상처에 바름) → "medicine"(약).', '보기 (B) medicine → 정답 (B).'], tip: '"applied medicine on the scratches"는 상처에 약을 바르다라는 뜻입니다.' } },
      ],
    },
  ],
};

export default wa1CatholicHighPrimaryEnglish2022;
