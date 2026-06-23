// =============================================================================
// src/data/p3/english/papers/paper2_nan_hua_primary_english_2023.ts
// Nan Hua Primary School — English Language Paper 2 — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 182–196 (시험지 표지 p.1–13)
// Duration: 1 hour 15 minutes / Total: 50 marks (46 questions)
// 주의: 표지에 연도 없음. 모음집 배열상 2023으로 처리(검증 권장).
// 주의: Q40은 스캔 원본에 보기가 "sorry"·"grateful" 두 개만 인쇄되어 있음(셋째 보기 인쇄 누락 추정).
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A어휘MCQ(6) B문법MCQ(8) C문법클로즈(8) D어휘클로즈(5) E교정(5) F통합(2)
//       G독해1(8, 염소와 버팔로) 독해2(8, 상인과 당나귀) = 50점
// =============================================================================

import type { EnglishPaper } from '../types';

export const paper2NanHuaPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Nan Hua Primary School',
    year: 2023,
    assessment: 'Paper 2',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 75,
    totalMarks: 50,
    sourcePages: 'pp.182–196 (paper pp.1–13)',
  },

  items: [
    // =========================================================================
    // Section A: Vocabulary MCQ (6 x 1 mark) — Q1–6
    // =========================================================================
    {
      kind: 'single',
      id: 'nh2023-q1',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Molly was ________ as she did not achieve good grades in the mid-year examination.',
      options: [
        { label: '1', text: 'overjoyed' },
        { label: '2', text: 'fascinated' },
        { label: '3', text: 'enthusiastic' },
        { label: '4', text: 'disheartened' },
      ],
      answer: '4',
      solution: {
        method: 'Choose an emotion adjective that fits the result of \'did not get good grades\'.',
        steps: [
          'Not getting good grades in a test → feeling disappointed or disheartened.',
          '\'Disheartened\' means feeling sad and losing hope → it matches exactly.',
          'overjoyed (very happy) / fascinated (amazed) / enthusiastic (eager) are all positive emotions, so they do not fit → correct answer is (4) disheartened.',
        ],
        tip: 'After a negative result like \'did not achieve\', use a negative emotion adjective.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q2',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem:
        'Daniel ________ through the pile of newspapers to look for a good article that he could use for his presentation.',
      options: [
        { label: '1', text: 'gazed' },
        { label: '2', text: 'glared' },
        { label: '3', text: 'peered' },
        { label: '4', text: 'browsed' },
      ],
      answer: '4',
      solution: {
        method: 'Choose a verb that shows the action of \'scanning and searching through\' a pile of newspapers to find a good article.',
        steps: [
          'Looking through a pile of newspapers \'to look for a good article\'.',
          '\'Browse through\' means to flip through and skim pages of newspapers, magazines, etc. → it matches exactly.',
          'gazed (stared at something for a long time) / glared (looked angrily) / peered (looked closely at something) do not fit the action of flipping through newspapers to find an article → correct answer is (4) browsed.',
        ],
        tip: '\'Browse through\' is used when you flip through newspapers, magazines, or websites to look at things quickly.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q3',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem:
        'The principal presented a ________ to the guest speaker to thank her for giving a talk to the students.',
      options: [
        { label: '1', text: 'prize' },
        { label: '2', text: 'trophy' },
        { label: '3', text: 'plaque' },
        { label: '4', text: 'correspondence' },
      ],
      answer: '3',
      solution: {
        method: 'Choose a noun that describes a gift given to a speaker as a sign of thanks.',
        steps: [
          'Something given as \'a sign of thanks or appreciation\' for giving a talk.',
          '\'Plaque\' means a flat board or plate given as a sign of thanks or in memory of something → it is suitable as a thank-you gift for a speaker.',
          'prize (a reward for winning a competition) / trophy (awarded for winning) / correspondence (letters or messages) do not match \'a thank-you gift\' → correct answer is (3) plaque.',
        ],
        tip: 'A \'plaque\' is a flat plate awarded as a sign of thanks or remembrance, similar to an award but not related to any competition.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q4',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'The fox waited for the right time and ________ on its prey.',
      options: [
        { label: '1', text: 'crept' },
        { label: '2', text: 'limped' },
        { label: '3', text: 'strolled' },
        { label: '4', text: 'pounced' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the verb that shows the action of \'suddenly jumping and pouncing on\' a prey.',
        steps: [
          '\'waited for the right time and ___ on its prey\' — waited for the right moment, then attacked its prey.',
          '\'pounce on\' means to suddenly jump and attack → this matches the hunting action exactly.',
          'crept (moved quietly)/limped (walked with a limp)/strolled (walked slowly and relaxed) do not match \'the action of pouncing\' → correct answer is (4) pounced.',
        ],
        tip: '\'pounce on its prey\' is a set phrase that describes an animal suddenly leaping onto its prey.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem:
        "Timothy invited a ________ of musicians to perform for his school's hundredth anniversary celebration.",
      options: [
        { label: '1', text: 'army' },
        { label: '2', text: 'band' },
        { label: '3', text: 'choir' },
        { label: '4', text: 'troop' },
      ],
      answer: '2',
      solution: {
        method: '"a group of musicians"을 가리키는 집합명사를 고른다.',
        steps: [
          '"a ___ of musicians"(음악가들의 ~) — 함께 연주하는 음악가 집단.',
          '"band" = 악단/밴드 → "a band of musicians"가 가장 자연스럽다.',
          'army(군대)/troop(부대)는 군사 집단, choir는 보통 합창단(노래하는 사람들)을 가리켜 "musicians"(악기 연주자 포함)과 약간 거리감 → 정답 (2) band.',
        ],
        tip: '"a band of musicians"은 함께 연주하는 음악가 무리를 가리키는 자연스러운 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'Doctor Irene may look fierce but she is actually as ________ as a dove when treating her patients.',
      options: [
        { label: '1', text: 'busy' },
        { label: '2', text: 'gentle' },
        { label: '3', text: 'graceful' },
        { label: '4', text: 'devoted' },
      ],
      answer: '2',
      solution: {
        method: '"being ~ like a dove"이라는 직유에 어울리는 형용사를 고른다.',
        steps: [
          '"as ___ as a dove" — dove(비둘기)는 평화롭고 온화함의 상징.',
          '"gentle" = 부드러운/온화한 → "as gentle as a dove"가 정해진 직유 표현.',
          'busy(바쁜)/graceful(우아한)/devoted(헌신적인)는 dove와 짝지어 쓰이는 관용 표현이 아니다 → 정답 (2) gentle.',
        ],
        tip: '"as gentle as a dove"는 온화하고 부드러운 성격을 나타내는 정해진 직유입니다.',
      },
    },

    // =========================================================================
    // Section B: Grammar MCQ (8 x 1 mark) — Q7–14
    // =========================================================================
    {
      kind: 'single',
      id: 'nh2023-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        'The postman had to deliver the mail the next day as nobody ________ at home that afternoon.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '3',
      solution: {
        method: '주어의 수("nobody")와 전체 문장의 시제(과거)를 본다.',
        steps: [
          '"had to deliver"(과거) — 전체 문장이 과거시제.',
          '"nobody"는 단수 취급.',
          '단수+과거 → was → 정답 (3).',
        ],
        tip: '"nobody/somebody/everybody"는 항상 단수로 취급합니다.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem:
        'Mr Frank reminded his children to take care of ________ before he left for his business trip.',
      options: [
        { label: '1', text: 'himself' },
        { label: '2', text: 'ourselves' },
        { label: '3', text: 'yourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '4',
      solution: {
        method: '"his children"(3인칭 복수)을 가리키는 재귀대명사를 고른다.',
        steps: [
          '"reminded his children to take care of ___" — 아이들 스스로를 돌보라는 의미.',
          '"his children"은 3인칭 복수 → 재귀대명사 "themselves".',
          '따라서 정답은 (4) themselves.',
        ],
        tip: '재귀대명사는 문장의 주어/목적어가 가리키는 대상의 인칭·수에 맞춥니다(his children → themselves).',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q9',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem:
        '"Look at ________ penguins in the enclosure there. Shall we go nearer to take some pictures of them?" Bala asked his brother.',
      options: [
        { label: '1', text: 'this' },
        { label: '2', text: 'that' },
        { label: '3', text: 'these' },
        { label: '4', text: 'those' },
      ],
      answer: '4',
      solution: {
        method: '명사의 수(복수)와 거리(멈)를 본다.',
        steps: [
          '"penguins"는 복수 → this/that(단수) 제외.',
          '"in the enclosure there"(저쪽 우리 안)와 "go nearer"(더 가까이 가자)는 현재 멀리 있음을 의미.',
          '복수+먼 거리 = those → 정답 (4).',
        ],
        tip: '"Shall we go nearer"는 대상이 지금 멀리 있음을 알려주는 단서입니다(those).',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q10',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: 'The waiter asked the diners politely, "________ I take your order now?"',
      options: [
        { label: '1', text: 'Will' },
        { label: '2', text: 'Can' },
        { label: '3', text: 'May' },
        { label: '4', text: 'Must' },
      ],
      answer: '3',
      solution: {
        method: '"politely" 묻는 표현에 맞는 조동사를 고른다.',
        steps: [
          '"asked the diners politely" — 매우 공손한 표현이 필요.',
          '"May I take your order?"는 식당 서비스에서 가장 공식적이고 공손한 표현.',
          'Will/Can도 가능하나 "politely"라는 신호에 가장 적합한 것은 May → 정답 (3).',
        ],
        tip: '"May I ~?"는 Will/Can보다 더 공손하고 격식 있는 요청 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q11',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem:
        'Cathy and Peter walked hastily to the platform as the train was about to ________.',
      options: [
        { label: '1', text: 'left' },
        { label: '2', text: 'leave' },
        { label: '3', text: 'leaves' },
        { label: '4', text: 'leaving' },
      ],
      answer: '2',
      solution: {
        method: '"be about to + base verb (means something is going to happen very soon)" 구문을 적용한다.',
        steps: [
          '"was about to ___"는 "was just about to ~"는 뜻의 정해진 구문.',
          'to 뒤에는 동사원형이 온다.',
          '따라서 "was about to leave" → 정답 (2) leave.',
        ],
        tip: '"be about to + base verb (means something is going to happen very soon)"은 "just about to ~"이라는 뜻입니다.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q12',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: '________ one of the movies is the most interesting?',
      options: [
        { label: '1', text: 'Who' },
        { label: '2', text: 'Which' },
        { label: '3', text: 'Where' },
        { label: '4', text: 'Whose' },
      ],
      answer: '2',
      solution: {
        method: '"which one among several movies"을 묻는 의문사를 고른다.',
        steps: [
          '"___ one of the movies"는 여러 영화 중에서 선택을 묻는다.',
          '"Which"는 정해진 범위(여러 영화) 안에서 "which one"을 물을 때 쓴다.',
          'Who(누구)/Where(어디)/Whose(누구의)는 영화 선택을 묻기에 부적합 → 정답 (2) Which.',
        ],
        tip: '"Which one of ~"는 정해진 선택지 중에서 하나를 고를 때 쓰는 의문사입니다.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q13',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem:
        "________ in the class dislikes Alan because he likes to play pranks on people. It's no wonder he has no friends.",
      options: [
        { label: '1', text: 'Nobody' },
        { label: '2', text: 'Anybody' },
        { label: '3', text: 'Somebody' },
        { label: '4', text: 'Everybody' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the subject that matches the result: \'It is natural to have no friends\'.',
        steps: [
          '\'It\'s no wonder he has no friends.\' means that everyone dislikes him — so it makes sense he has no friends.',
          '\'Everybody dislikes Alan\' connects naturally to the result of having no friends.',
          'Nobody/Anybody/Somebody are not strong enough to explain \'has no friends at all\' → correct answer is (4) Everybody.',
        ],
        tip: 'Before \'It\'s no wonder ~\', a strong statement about the cause (such as \'everybody ~\') fits most naturally.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q14',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem:
        '"You must have placed your report book ________ in your bedroom. Go and look for it again," said Jill\'s mother.',
      options: [
        { label: '1', text: 'nowhere' },
        { label: '2', text: 'anywhere' },
        { label: '3', text: 'everywhere' },
        { label: '4', text: 'somewhere' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the place adverb that matches the instruction \'Look again\'.',
        steps: [
          '\'Go and look for it again\' → the book is probably \'somewhere\' inside the room.',
          '\'somewhere\' means in some place — it does not name the exact place, but suggests the thing exists there.',
          '\'nowhere\' (not in any place) contradicts the instruction to look again; \'anywhere/everywhere\' do not fit this context as well → correct answer is (4) somewhere.',
        ],
        tip: '\'somewhere\' means the exact location is unknown, but the book does exist in some place.',
      },
    },

    // =========================================================================
    // Section C: Grammar Cloze (8 x 1 mark) — Q15–22
    // Passage 1 (Q15-18): 보기 (A) her (B) I (C) me (D) they (E) we (F) you
    // Passage 2 (Q19-22): 보기 (G) at (H) before (J) during (K) in (L) into (M) on
    // =========================================================================
    {
      kind: 'set',
      id: 'nh2023-secC-passage1',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze — Passage 1',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write its letter (A to F) in each blank. USE EACH WORD ONCE ONLY. Box: (A) her  (B) I  (C) me  (D) they  (E) we  (F) you',
      passage:
        "Mr Lenny is Nora's English teacher. One day, Nora met up with her classmates, Amy and Gary, as (15) ________ wanted to discuss what to do for Mr Lenny on Teachers' Day.\n\n" +
        '"I think (16) ________ should make a gigantic card together," suggested Gary.\n\n' +
        '"Great idea, Gary! Could (17) ________ please bring some paper tomorrow?" Nora asked. Gary nodded.\n\n' +
        '"Nora and (18) ________ will bring some coloured markers then," volunteered Amy.\n\n' +
        'The next day, the children spent a few hours making the card for Mr Lenny.\n\n' +
        '(Adapted from Thank You, Mr T! by Laura Edlund)',
      marks: 4,
      questions: [
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem:
            "Nora met up with her classmates, Amy and Gary, as (15) ________ wanted to discuss what to do for Mr Lenny on Teachers' Day.",
          answer: 'D',
          solution: {
            method: 'Nora, Amy, Gary 세 사람을 함께 가리키는 주어 대명사를 고른다.',
            steps: [
              '"Nora met up with her classmates, Amy and Gary" — 세 사람(Nora, Amy, Gary)이 모두 의논하고 싶어함.',
              '서술자 자신("I")을 포함하지 않는 3인칭 복수 → "they".',
              '보기에서 they는 (D) → 정답 (D).',
            ],
            tip: '3인칭 시점 서술에서 등장인물 여러 명을 함께 가리킬 때는 they를 씁니다.',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: '"I think (16) ________ should make a gigantic card together," suggested Gary.',
          answer: 'E',
          solution: {
            method: 'Gary가 자신을 포함한 그룹(자신+Nora+Amy)을 가리키는 주어를 고른다.',
            steps: [
              '"make a gigantic card together"(함께 카드를 만들자) — Gary 자신을 포함한 제안.',
              '화자(Gary) 자신을 포함한 복수는 "we".',
              '보기에서 we는 (E) → 정답 (E).',
            ],
            tip: '"together"(함께)라는 단어는 화자 자신을 포함한 "we"의 단서입니다.',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: '"Great idea, Gary! Could (17) ________ please bring some paper tomorrow?" Nora asked.',
          answer: 'F',
          solution: {
            method: 'Nora가 Gary에게 직접 부탁하는 말의 주어를 고른다.',
            steps: [
              'Nora가 Gary("Gary!"라고 부른 직후)에게 직접 부탁하고 있다.',
              '상대방 한 명을 가리키는 2인칭 주어는 "you".',
              '보기에서 you는 (F) → 정답 (F).',
            ],
            tip: '대화에서 상대방에게 직접 부탁할 때는 "you"를 씁니다.',
          },
        },
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: '"Nora and (18) ________ will bring some coloured markers then," volunteered Amy.',
          answer: 'B',
          solution: {
            method: 'Amy 자신을 가리키는 1인칭 주어 대명사를 고른다.',
            steps: [
              'Amy가 스스로 자원하며 "Nora and ___ will bring the coloured pencils"라고 말한다.',
              '화자(Amy) 자신을 가리키는 1인칭 단수는 "I".',
              '보기에서 I는 (B) → 정답 (B). ("Nora and I" — 다른 사람과 함께 주어로 쓸 때도 I를 사용)',
            ],
            tip: '"A and I"처럼 다른 사람과 함께 자기 자신을 주어로 쓸 때도 I를 사용합니다(me가 아님).',
          },
        },
      ],
    },
    {
      kind: 'set',
      id: 'nh2023-secC-passage2',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze — Passage 2',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write its letter (G to M) in each blank. USE EACH WORD ONCE ONLY. Box: (G) at  (H) before  (J) during  (K) in  (L) into  (M) on',
      passage:
        'Bike-sharing services have made travel convenient but inconsiderate users have caused several problems. Two boys were seen damaging the locks on rental bicycles (19) ________ cycling off on their free ride. Their inconsiderate act was caught (20) ________ video. Recently, a couple was filmed tossing at least two rental bicycles (21) ________ a drain. The bike-sharing companies (22) ________ Singapore have introduced reward systems to encourage greater responsibility among bike users. Users who are caught not taking care of the bicycles would need to pay a fine.\n\n' +
        '(Adapted from "Boys filmed damaging locks on ofo bikes; video goes viral" by Ng Huiwen, SUT, Dec 10, 2017.)',
      marks: 4,
      questions: [
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem:
            'Two boys were seen damaging the locks on rental bicycles (19) ________ cycling off on their free ride.',
          answer: 'H',
          solution: {
            method: '두 동작(자물쇠 훼손, 자전거 타고 가기)의 시간 순서를 나타내는 전치사를 고른다.',
            steps: [
              '두 소년은 자물쇠를 훼손한 "After" 자전거를 타고 갔다 → 자물쇠 훼손이 먼저, 타고 가기가 나중.',
              '"before cycling off" = 타고 가기 전(즉, 그 전에 자물쇠를 훼손함).',
              '보기에서 before는 (H) → 정답 (H).',
            ],
            tip: '"A before B"는 "A before B"라는 뜻으로, A가 먼저 일어난 사건임을 나타냅니다.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'Their inconsiderate act was caught (20) ________ video.',
          answer: 'M',
          solution: {
            method: '"To be caught on camera"라는 표현에 맞는 전치사를 고른다.',
            steps: [
              '"caught on video" = 영상에 포착되다 → 정해진 전치사 표현.',
              '보기에서 on은 (M) → 정답 (M).',
            ],
            tip: '"caught on camera/video/tape"는 영상에 찍혔다는 뜻의 고정 표현입니다.',
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem:
            'Recently, a couple was filmed tossing at least two rental bicycles (21) ________ a drain.',
          answer: 'L',
          solution: {
            method: '물건을 "Into ~" 던지는 동작에 맞는 전치사를 고른다.',
            steps: [
              '자전거를 배수구 "Into" 던졌다는 의미.',
              '"toss A into B" = A를 B 안으로 던지다.',
              '보기에서 into는 (L) → 정답 (L).',
            ],
            tip: '"toss/throw something into something"은 물건을 안으로 던지는 동작을 나타냅니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem:
            'The bike-sharing companies (22) ________ Singapore have introduced reward systems to encourage greater responsibility among bike users.',
          answer: 'K',
          solution: {
            method: '회사가 위치한 국가/지역을 나타내는 전치사를 고른다.',
            steps: [
              '"the bike-sharing companies ___ Singapore" — 싱가포르"That is in ~" 회사들.',
              '국가/도시 앞에는 "in"을 쓴다.',
              '보기에서 in은 (K) → 정답 (K). (남은 G·J는 사용되지 않음)',
            ],
            tip: '국가·도시 이름 앞에서 "That is in ~"을 나타낼 때는 in을 씁니다(companies in Singapore).',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Vocabulary Cloze (5 x 1 mark) — Q23–27
    // Word bank: (A) annoyed (B) apologised (C) examined (D) fascinated (E) offered
    //       (F) patiently (G) reluctantly (H) spotted
    // Passage: Sam and the Durian Seller
    // =========================================================================
    {
      kind: 'set',
      id: 'nh2023-secD-vcloze',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions:
        'Read the passage carefully. Choose the most suitable word from the box and write its letter (A to H) in each blank. Box: (A) annoyed  (B) apologised  (C) examined  (D) fascinated  (E) offered  (F) patiently  (G) reluctantly  (H) spotted',
      passage:
        'It was Sam\'s birthday. He decided to treat himself to some durians. When he arrived at the market, he went to a durian stall and picked a few durians.\n\n' +
        'Sam waited (23) ________ for the man to pack his durians into styrofoam boxes. As Sam was watching the man pry open the durians, he (24) ________ the man dropping a section of each durian into another basket. Sam was (25) ________ by the man\'s dishonest act. He paid for his durians (26) ________ and told the man, "Sir, I saw what you did. Next time I won\'t buy durians from you." The man was taken aback by Sam\'s response.\n\n' +
        'Embarrassed, the man (27) ________ to Sam for cheating and gave him another box of durian. Sam accepted the box of durian and advised the man not to cheat his customers again.\n\n' +
        '(Original)',
      marks: 5,
      questions: [
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'Sam waited (23) ________ for the man to pack his durians into styrofoam boxes.',
          answer: 'F',
          solution: {
            method: 'Choose the adverb that describes the attitude of waiting for a long time.',
            steps: [
              'The action of staying still and waiting while the durian is being packed.',
              '"patiently" means to wait calmly without giving up → "waited patiently" sounds natural.',
              'In the word bank, patiently is (F) → Answer is (F).',
            ],
            tip: '"waited patiently" describes waiting quietly and calmly without complaining.',
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem:
            'As Sam was watching the man pry open the durians, he (24) ________ the man dropping a section of each durian into another basket.',
          answer: 'H',
          solution: {
            method: 'Choose the verb that means "Noticed / Spotted".',
            steps: [
              'Sam was watching carefully and "Realised / Noticed" the seller cheating.',
              '"spotted" means to notice or discover something after looking carefully.',
              'In the word bank, spotted is (H) → Answer is (H).',
            ],
            tip: '"spotted" is used when you notice something after paying close attention.',
          },
        },
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: "Sam was (25) ________ by the man's dishonest act.",
          answer: 'A',
          solution: {
            method: '부정행위를 본 후의 감정을 나타내는 형용사를 고른다.',
            steps: [
              '주인의 부정직한 행동(durian 일부를 빼돌림)을 봄.',
              '"annoyed" = 짜증난/언짢은 → 부정행위에 대한 자연스러운 반응.',
              '보기에서 annoyed는 (A) → 정답 (A).',
            ],
            tip: '부정행위(dishonest act)를 목격한 반응으로는 annoyed가 자연스럽습니다.',
          },
        },
        {
          questionNo: '26',
          format: 'fib',
          marks: 1,
          stem:
            'He paid for his durians (26) ________ and told the man, "Sir, I saw what you did. Next time I won\'t buy durians from you."',
          answer: 'G',
          solution: {
            method: 'Choose the adverb that describes doing something "reluctantly, with a dissatisfied feeling".',
            steps: [
              'Sam was annoyed by the seller\'s cheating, but still had to pay the money.',
              '"reluctantly" means doing something unwillingly → it matches the feeling of being annoyed.',
              'In the word bank, reluctantly is (G) → Answer is (G).',
            ],
            tip: 'After the feeling of being \'annoyed\', it is natural to follow up with an unwilling action like \'reluctantly\'.',
          },
        },
        {
          questionNo: '27',
          format: 'fib',
          marks: 1,
          stem:
            'Embarrassed, the man (27) ________ to Sam for cheating and gave him another box of durian.',
          answer: 'B',
          solution: {
            method: 'Choose a verb that means \'apologised shyly\' or \'apologised with embarrassment\'.',
            steps: [
              'An action done when feeling \'embarrassed\'.',
              '\'apologised\' means said sorry → \'apologised to Sam for cheating\' sounds natural.',
              'From the options, \'apologised\' is (B) → the answer is (B). (The remaining options C, D, and E are not used.)',
            ],
            tip: '\'Embarrassed, ... apologised\' shows the flow from feeling ashamed → saying sorry.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E: Editing for Spelling and Grammar (5 x 1 mark) — Q28–32
    // =========================================================================
    {
      kind: 'set',
      id: 'nh2023-secE-editing',
      topic: 'Editing',
      title: 'Section E: Editing for Spelling and Grammar',
      instructions: 'For each of the items, circle the correct word from the words given in the brackets.',
      marks: 5,
      questions: [
        {
          questionNo: '28',
          format: 'editing',
          marks: 1,
          stem: 'Everyone in the class party ( has / have ) received a gift from Mrs Kee.',
          answer: 'has',
          solution: {
            method: 'Check the number (singular or plural) of the subject \'Everyone\'.',
            steps: [
              '\'Everyone\' is always treated as singular.',
              'The Present Perfect helping verb that matches a singular subject is \'has\'.',
              'Therefore, \'Everyone... has received\' → use \'has\'.',
            ],
            tip: 'Words like \'Everyone\', \'Everybody\', and \'Someone\' are used with singular verbs such as \'has\', \'is\', and \'was\'.',
          },
        },
        {
          questionNo: '29',
          format: 'editing',
          marks: 1,
          stem: 'Lilian always ( do / does ) her homework immediately after taking her lunch.',
          answer: 'does',
          solution: {
            method: 'Look at the subject \'Lilian\' (singular) and the word \'always\' (repeated habit).',
            steps: [
              '\'Lilian\' is third person singular.',
              '\'always\' shows a repeated habit → use Simple Present tense.',
              'The Simple Present form for third person singular adds -s, giving \'does\' → use \'does\'.',
            ],
            tip: 'For a third-person singular subject in the present tense, add -s/-es to the verb (do → does).',
          },
        },
        {
          questionNo: '30',
          format: 'editing',
          marks: 1,
          stem: 'We need to do our part to keep the ( enviroment / environment ) clean.',
          answer: 'environment',
          solution: {
            method: 'Check the correct spelling of the word "environment".',
            steps: [
              'Incorrect spelling: enviroment (missing one \'n\').',
              'The correct word is environment — "environ" + "ment", with \'n\' appearing twice.',
              'Therefore: environment.',
            ],
            tip: '"Environment" is spelled "environ-ment", with \'n\' appearing twice.',
          },
        },
        {
          questionNo: '31',
          format: 'editing',
          marks: 1,
          stem: 'The snake glided away to escape from its ( predator / predater ).',
          answer: 'predator',
          solution: {
            method: 'Check the ending spelling of the word "predator" (-or vs -er).',
            steps: [
              'Incorrect spelling: predater.',
              'The correct word is predator — ending in -or.',
              'Therefore: predator.',
            ],
            tip: '"Predator" ends in -or (predater ✗).',
          },
        },
        {
          questionNo: '32',
          format: 'editing',
          marks: 1,
          stem:
            'Ben was ( disappointed / dissapointed ) when he was told that he was not selected to join the school team.',
          answer: 'disappointed',
          solution: {
            method: 'Check the prefix (dis-) and double consonants in the word "disappointed".',
            steps: [
              'Incorrect spelling: dissapointed (double \'s\', single \'p\').',
              'The correct word is disappointed — dis (prefix, one \'s\') + appoint (double \'p\') + ed.',
              'Therefore: disappointed.',
            ],
            tip: 'The word \'disappointed\' is spelled with dis- (one \'s\') + ap-point (two \'p\'s).',
          },
        },
      ],
    },

    // =========================================================================
    // Section F: Synthesis (2 x 1 mark) — Q33–34
    // =========================================================================
    {
      kind: 'single',
      id: 'nh2023-q33',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 33,
      marks: 1,
      stem:
        'Rewrite the given sentences as one sentence using the word provided. The meaning must be the same.\n' +
        'Tom did not complete his homework. Tom was not allowed to play soccer.\n' +
        '________________________________________, so ________________________________________.',
      answer: 'Tom did not complete his homework, so he was not allowed to play soccer.',
      solution: {
        method: 'Use \'so\' to connect a cause and an effect.',
        steps: [
          'Cause: did not finish homework / Effect: could not play football.',
          '\'so\' (therefore) is a conjunction that connects a cause to its effect.',
          '"Tom did not complete his homework, so he was not allowed to play soccer."',
          'The second mention of Tom is changed to \'he\' to avoid repeating the name.',
        ],
        tip: '\'A, so B\' means \'Because of A (cause), B happens (effect).\' Replace repeated names with pronouns.',
      },
    },
    {
      kind: 'single',
      id: 'nh2023-q34',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 34,
      marks: 1,
      stem:
        'Rewrite the given sentences as one sentence using the word provided. The meaning must be the same.\n' +
        'Emily was surprised. Emily saw a birthday cake on her desk.\n' +
        '________________________________________ when ________________________________________.',
      answer: 'Emily was surprised when she saw a birthday cake on her desk.',
      solution: {
        method: 'Use \'when\' to connect two events that happen at the same time or trigger each other.',
        steps: [
          'First part: Emily was surprised (effect/feeling) / Second part: she saw a birthday cake on the desk (the event that caused it).',
          '\'when\' means \'at the time when ~ happened\' and connects two events that occur together or trigger each other.',
          '"Emily was surprised when she saw a birthday cake on her desk."',
          'The repeated name Emily is changed to \'she\'.',
        ],
        tip: '\'A when B\' means \'When B happened, A happened.\' It is usually used to connect a feeling (A) to the event (B) that caused it.',
      },
    },

    // =========================================================================
    // Section G: Comprehension 1 (8 marks) — Q35–40
    // 지문: 길 잃은 염소 떼와 버팔로 (The Lost Camels, WOW Stories Volume 2)
    // =========================================================================
    {
      kind: 'set',
      id: 'nh2023-secG-comprehension1',
      topic: 'ComprehensionOE',
      title: 'Section G: Comprehension 1 — The Lost Goats and the Buffalo',
      instructions: 'Read the passage below and answer questions 35 to 40.',
      passage:
        'A herd of goats was lost in the forest for two days. They were confused and exhausted as none of them knew the way out. All they did was to follow the oldest goat who was the most experienced amongst them.\n\n' +
        'A brown goat grumbled, "We have not eaten for days. I\'m so thirsty and hungry. Shall we take a rest?"\n\n' +
        'When the goats were resting and discussing the way out, a buffalo appeared suddenly.\n\n' +
        'The buffalo pleaded desperately, "I\'ve been lost in the forest for four days. Can I join in because I don\'t know the way out?"\n\n' +
        'A young goat sighed, "Another lost animal! I don\'t think he will be able to provide any help. Let\'s ignore him." The rest of the goats began to move away from the buffalo and they were hostile to him.\n\n' +
        '"Stop this nonsense!" the oldest goat reprimanded the others. "He may be able to help advise us on the routes to avoid as he had been wandering in the forest longer than us," the oldest goat explained.\n\n' +
        'The goats were ashamed of themselves for their rude behaviour towards the buffalo. The animals managed to find the way out of the forest shortly after as they avoided the wrong routes pointed out by the buffalo. The goats thanked the buffalo for helping them to find the way out of the forest.\n\n' +
        '(Adapted from The Lost Camels by WOW Stories Volume 2)',
      marks: 8,
      questions: [
        {
          questionNo: '35',
          format: 'open',
          marks: 1,
          stem: 'How long was the herd of goats lost in the forest?',
          answer: 'They were lost in the forest for two days.',
          solution: {
            method: 'Look in Paragraph 1 for how long the herd of goats was lost.',
            steps: [
              'Paragraph 1: "A herd of goats was lost in the forest for two days."',
              'The herd of goats was lost for two days.',
              'So the answer is \'two days\' (or \'for two days\').',
            ],
            tip: 'For \'How long\' questions, find the expression showing a period of time in the passage (e.g. for ~ days) and use it directly as your answer.',
          },
        },
        {
          questionNo: '36',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as "tired"? Circle either (A) or (B). Sentence: "They were confused (A) and exhausted (B) as none of them knew the way out."',
          options: [
            { label: 'A', text: 'confused' },
            { label: 'B', text: 'exhausted' },
          ],
          answer: 'B',
          solution: {
            method: 'Choose a word that means the same as \'tired\'.',
            steps: [
              '\'confused\' means feeling mixed up or unsure — this has a different meaning from \'tired\'.',
              '\'exhausted\' means very tired or worn out — this is a synonym of \'tired\'.',
              'Therefore, the correct answer is (B) exhausted.',
            ],
            tip: '\'exhausted\' means \'very tired\', making it a strong synonym of \'tired\'.',
          },
        },
        {
          questionNo: '37',
          format: 'open',
          marks: 2,
          stem: 'Why did the brown goat want to rest?\nThe brown goat was ________ and ________.',
          answer: 'The brown goat was thirsty and hungry.',
          solution: {
            method: 'Find two reasons in Paragraph 2 that explain why the brown goat suggested taking a rest.',
            steps: [
              'Paragraph 2: "We have not eaten for days. I\'m so thirsty and hungry. Shall we take a rest?"',
              'The brown goat wanted to rest because it was thirsty and hungry.',
              'Write \'thirsty\' and \'hungry\' in the two blanks.',
            ],
            tip: 'The two adjectives \'thirsty\' and \'hungry\' that appear just before \'Shall we take a rest?\' are the two reasons.',
          },
        },
        {
          questionNo: '38',
          format: 'open',
          marks: 1,
          stem: "Which word in paragraph 5 has the same meaning as 'unfriendly'?",
          answer: 'hostile',
          solution: {
            method: 'Find a word in Paragraph 5 that means the same as \'unfriendly\'.',
            steps: [
              'Paragraph 5: "The rest of the goats began to move away from the buffalo and they were hostile to him."',
              '\'hostile\' means unfriendly or acting against someone — it has the same meaning as \'unfriendly\'.',
              'Therefore, the answer is \'hostile\'.',
            ],
            tip: '"Hostile" is a word that means having an unfriendly and aggressive attitude towards someone.',
          },
        },
        {
          questionNo: '39',
          format: 'open',
          marks: 2,
          stem:
            'Based on the passage, which two of the following statements are true? Tick the two statements.\n' +
            '(1) The goats did not want the buffalo to join them initially.\n' +
            '(2) The goats wanted the buffalo to help them to look for food.\n' +
            '(3) The buffalo was lost in the forest for two days.\n' +
            '(4) The oldest goat did not know the way out of the forest.',
          answer: '(1) and (4)',
          solution: {
            method: 'Check each answer option against the passage one by one.',
            steps: [
              '(1) Paragraph 5: At first, the goats ignored the buffalo, stayed away from him, and were hostile towards him ("Let\'s ignore him", "hostile to him") → True.',
              '(2) The buffalo only helped "To find the way" — there is no mention of "To find food" in the passage → False.',
              '(3) Paragraph 4: The buffalo said "I\'ve been lost in the forest for four days" (four days) — not two days → False.',
              '(4) Paragraph 1: Even though the goats followed the oldest and most experienced goat, they still got lost → This suggests that even the oldest goat did not know the way → True.',
              'Therefore, the statements that are true are (1) and (4).',
            ],
            tip: 'For answer options that include numbers (such as four days vs two days), always check them carefully against the exact numbers in the passage.',
          },
        },
        {
          questionNo: '40',
          format: 'open',
          marks: 1,
          stem:
            'Tick your chosen answer. The goats were ________ to the buffalo as he helped them to find the way out.\nOptions: sorry | grateful',
          answer: 'grateful',
          solution: {
            method: 'Check the last paragraph to find out how the goats feel at the end of the story.',
            steps: [
              'Last paragraph: "The goats thanked the buffalo for helping them to find the way out of the forest."',
              '"Thanked" (showed thanks) connects in meaning to "grateful" (feeling thankful).',
              'Therefore, the answer is grateful. (Confirmed against the answer key.)',
            ],
            tip: '"Thanked" links directly to the word grateful (feeling thankful).',
          },
        },
      ],
    },

    // =========================================================================
    // Comprehension 2 (8 marks) — Q41–46
    // 지문: 상인과 당나귀 (The Donkey, WOW Stories Volume 1)
    // =========================================================================
    {
      kind: 'set',
      id: 'nh2023-comprehension2',
      topic: 'ComprehensionOE',
      title: 'Comprehension 2 — The Merchant and the Donkey',
      instructions:
        'Read the following passage carefully and answer questions 41 to 46. All answers must be based on the given text. Answer in complete sentences.',
      passage:
        'A merchant wanted to sell a few sacks of salt to a village nearby. He tied up the sacks of salt on his donkey and set off.\n\n' +
        'The sacks that were filled with salt were very heavy and the donkey felt very tired. When they came to a river, they walked across the shallow water carefully. Then the donkey tripped and fell into the water. The size of the sacks shrunk as the salt in them reduced tremendously. Most of it had dissolved in the water. As such, the sacks felt lighter when the donkey stood up. The merchant was very upset and led the donkey back to the town.\n\n' +
        'The next day, they came to the river, the donkey remembered what had happened earlier and fell into the water on purpose. The trick worked as his load felt lighter immediately. The merchant watched the donkey fall but said nothing. The donkey was very happy and boasted to his friends that he had found a way to make his work easier.\n\n' +
        'On the third day, the merchant placed some sacks on his donkey again. Unknown to the donkey, the sacks were filled with cotton which the merchant had borrowed from another trader. The donkey followed the merchant happily.\n\n' +
        'When they reached the river, the donkey tried the same trick again. He jumped into the water but could not stand up this time. The load of the sacks was three times heavier than before because the cotton absorbed water. After watching the donkey struggle in the water for a while, the merchant removed the sacks of cotton and led the drenched donkey out of the river.\n\n' +
        'He looked at his donkey and said, "Do not try to be lazy again."\n\n' +
        'When the donkey realised that the merchant was teaching him a lesson, he was embarrassed and hung his head low. After that incident, the donkey never tried to be lazy again.\n\n' +
        "(Adapted from 'The Donkey' by WOW Stories Volume 1)",
      marks: 8,
      questions: [
        {
          questionNo: '41',
          format: 'open',
          marks: 1,
          stem: 'How did the merchant earn a living?\nThe merchant earned a living by ________.',
          answer: 'The merchant earned a living by selling (sacks of) salt to villages.',
          solution: {
            method: 'Find the merchant\'s job and how he earns a living in Paragraph 1.',
            steps: [
              'Paragraph 1: "A merchant wanted to sell a few sacks of salt to a village nearby."',
              'The merchant earned his living by selling salt to villages.',
              'Therefore, \'by selling salt to villages\' → correct answer.',
            ],
            tip: 'For \'How did ~ earn a living\' questions, look in the passage for the character\'s job or the item they traded.',
          },
        },
        {
          questionNo: '42',
          format: 'open',
          marks: 1,
          stem: "According to the passage, what does 'it' in line 6 refer to?",
          answer: 'It refers to the salt (in the sacks).',
          solution: {
            method: "Find the noun that 'it' refers to in the same sentence or the sentence before it.",
            steps: [
              'The relevant sentence is: \'The size of the sacks shrunk as the salt in them reduced tremendously. Most of it had dissolved in the water.\'',
              "'it' refers to 'the salt' that was mentioned just before.",
              "Write as a complete sentence: \"'it' refers to the salt.\"",
            ],
            tip: 'The pronoun \'it\' often refers to the singular noun in the sentence just before it — in this case, \'salt\'.',
          },
        },
        {
          questionNo: '43',
          format: 'open',
          marks: 1,
          stem: "Which word in paragraph 5 has the same meaning as 'completely wet'?",
          answer: 'drenched',
          solution: {
            method: "Find a word in paragraph 5 that means the same as 'completely wet'.",
            steps: [
              'Paragraph 5 states: \'...the merchant removed the sacks of cotton and led the drenched donkey out of the river.\'',
              '\'drenched\' means completely wet → this matches exactly.',
              'Therefore, the answer is \'drenched\'.',
            ],
            tip: '\'drenched\' is a word that emphasises being soaking wet from water.',
          },
        },
        {
          questionNo: '44',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 or 3 in the blanks below to indicate the order in which the events occurred in the passage.\n' +
            '( ) The donkey boasted to his friends.\n' +
            '( ) The donkey fell into the water accidentally.\n' +
            '( ) The donkey fell into the water with the sacks of cotton.',
          answer:
            'The donkey fell into the water accidentally = 1; The donkey boasted to his friends = 2; The donkey fell into the water with the sacks of cotton = 3',
          solution: {
            method: 'Follow the events in the passage day by day (Day 1 → Day 2 → Day 3).',
            steps: [
              'Paragraph 2 (Day 1): \'Then the donkey tripped and fell into the water.\' (fell in by accident) → 1.',
              'Paragraph 3 (Day 2): \'The donkey was very happy and boasted to his friends that he had found a way to make his work easier.\' (boasted to friends) → 2.',
              'Paragraph 5 (Day 3): \'the donkey tried the same trick again. He jumped into the water...\' (jumped in with the cotton sacks) → 3.',
            ],
            tip: 'Follow time signal words like \'The next day\' and \'On the third day\' to easily work out the order of events.',
          },
        },
        {
          questionNo: '45',
          format: 'open',
          marks: 2,
          stem:
            'Based on the passage, state whether each statement is true or false, then give a reason why you think so.\n' +
            '(a) The donkey fell into the river accidentally on the second day.\n' +
            '(b) The donkey learnt his lesson in the end.',
          answer:
            '(a) False — The donkey fell into the river accidentally on the FIRST day (not the second day); on the second day, he fell on purpose (deliberately, as a trick).\n' +
            '(b) True — After the merchant taught him a lesson with the heavy cotton sacks, the donkey was embarrassed and never tried to be lazy again.',
          solution: {
            method: 'Check carefully which paragraph is referring to \'for several days\'.',
            steps: [
              '(a) Paragraph 2 (Day 1): \'Then the donkey tripped and fell into the water.\' — this was an accident, and it happened on the first day. Paragraph 3 (Day 2): \'fell into the water on purpose\' — the second day was on purpose. So the statement \'accidentally fell in on the second day\' is False.',
              '(b) The last paragraph states: \'After that incident, the donkey never tried to be lazy again.\' — this clearly shows the donkey learned a lesson. So the statement is True.',
              'For each answer, include evidence (a reason) from the passage to support your choice.',
            ],
            tip: 'Note that \'accidentally\' (by accident) and \'on purpose\' (deliberately) happened on different days — Day 1 and Day 2 respectively. Be careful not to mix up the days.',
          },
        },
        {
          questionNo: '46',
          format: 'open',
          marks: 2,
          stem: 'Why did the merchant use sacks of cotton to teach the donkey a lesson?',
          answer:
            'The merchant used sacks of cotton because cotton absorbs water and becomes much heavier when wet (unlike salt, which dissolves and becomes lighter). So when the donkey deliberately fell into the water again expecting his load to feel lighter, the cotton sacks became three times heavier instead, punishing him for trying to be lazy and teaching him not to repeat the trick.',
          solution: {
            method: 'Compare the properties of salt and cotton to work out what the merchant planned to do.',
            steps: [
              'Salt dissolves in water and makes the load lighter (Paragraph 2). Cotton absorbs water and \'becomes three times heavier than before because the cotton absorbed water\' (Paragraph 5).',
              'The donkey expected the load to become lighter again like before, so it deliberately fell into the water. However, because of the cotton, the load became much heavier instead, and the donkey struggled greatly.',
              'This was the merchant\'s deliberate trap to teach the lazy donkey a lesson.',
              'Your answer should include both the difference in how the two materials react to water and the result that followed.',
            ],
            tip: 'For a \'Why\' question worth 2 marks, you usually need to include two parts: the difference in properties (how salt and cotton react differently to water) and the result or lesson that came from it.',
          },
        },
      ],
    },
  ],
};

export default paper2NanHuaPrimaryEnglish2023;
