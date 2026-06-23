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
        method: '"did not get good grades"는 결과에 어울리는 감정 형용사를 고른다.',
        steps: [
          '시험에서 좋은 성적을 받지 못했다 → 실망/낙심하는 감정.',
          '"disheartened" = 낙심한, 의기소침한 → 정확히 일치.',
          'overjoyed(매우 기쁜)/fascinated(매료된)/enthusiastic(열정적인)은 긍정적 감정이라 안 맞는다 → 정답 (4) disheartened.',
        ],
        tip: '"did not achieve"처럼 부정적 결과 뒤에는 부정적 감정 형용사가 옵니다.',
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
        method: '신문 더미에서 좋은 기사를 "scanning and searching through" 동작을 나타내는 동사를 고른다.',
        steps: [
          '"look for a good article"(좋은 기사를 찾기 위해) 신문 더미를 훑어봄.',
          '"browse through" = (책·신문 등을) 휙휙 넘겨보다/훑어보다 → 정확히 일치.',
          'gazed(오래 응시함)/glared(노려봄)/peered(자세히 들여다봄)는 신문을 훑어보며 기사를 찾는 동작과 덜 맞는다 → 정답 (4) browsed.',
        ],
        tip: '"browse through" 는 신문·잡지·인터넷 등을 휙휙 넘겨보며 살펴보는 동작입니다.',
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
        method: '강연자에게 감사의 표시로 주는 기념품을 나타내는 명사를 고른다.',
        steps: [
          '강연을 해준 것에 대한 "a sign of thanks / appreciation"로 주는 것.',
          '"plaque" = (감사·기념의 의미로 주는) 명판/패 → 강연자에게 주는 감사패에 적합.',
          'prize(상품, 경쟁의 결과)/trophy(트로피, 경쟁의 승리)/correspondence(서신, 편지)는 "a thank-you gift"과 안 맞는다 → 정답 (3) plaque.',
        ],
        tip: '"plaque"는 감사·기념의 의미로 수여하는 패(상패와 비슷하지만 경쟁과 무관)입니다.',
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
        method: '먹잇감을 향해 "suddenly jumping and pouncing on" 동작을 나타내는 동사를 고른다.',
        steps: [
          '"waited for the right time and ___ on its prey" — 적절한 때를 기다렸다가 먹잇감에게 공격.',
          '"pounce on" = (갑자기) 달려들어 덮치다 → 사냥 동작과 정확히 일치.',
          'crept(살금살금 기어감)/limped(절뚝거림)/strolled(한가로이 걸음)는 "the action of pouncing"과 안 맞는다 → 정답 (4) pounced.',
        ],
        tip: '"pounce on its prey"는 동물이 갑자기 먹잇감을 덮치는 동작을 나타내는 정해진 표현입니다.',
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
        method: '결과("It is natural to have no friends")와 일치하는 주어를 고른다.',
        steps: [
          '"It\'s no wonder he has no friends."(친구가 없는 게 당연하다) → 모두가 그를 싫어한다는 의미.',
          '"Everybody dislikes Alan"(모두가 Alan을 싫어한다)이 결과와 자연스럽게 연결된다.',
          'Nobody(아무도 안)/Anybody/Somebody는 "Has no friends at all"을 설명하기에 부족 → 정답 (4) Everybody.',
        ],
        tip: '"It\'s no wonder ~"(~은 당연하다) 앞에는 그 결과의 원인이 되는 강한 진술(모두가 ~)이 자연스럽게 옵니다.',
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
        method: '"Look again"는 지시와 어울리는 장소부사를 고른다.',
        steps: [
          '"Go and look for it again"(다시 찾아봐라) → 책은 방 안 "Somewhere"에 있을 것이다.',
          '"somewhere" = 어딘가에 → 위치를 특정하지 않지만 존재함을 암시.',
          '"nowhere"(아무데도 없음)는 다시 찾아보라는 지시와 모순, "anywhere/everywhere"는 이 문맥에 덜 맞는다 → 정답 (4) somewhere.',
        ],
        tip: '"somewhere"는 정확한 위치는 모르지만 "Is somewhere"는 의미입니다.',
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
    // 보기: (A) annoyed (B) apologised (C) examined (D) fascinated (E) offered
    //       (F) patiently (G) reluctantly (H) spotted
    // 지문: Sam과 두리안 장수
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
            method: '오래 기다리는 태도를 나타내는 부사를 고른다.',
            steps: [
              '두리안을 포장하는 동안 가만히 기다리는 모습.',
              '"patiently" = 참을성 있게/끈기 있게 → "waited patiently"가 자연스럽다.',
              '보기에서 patiently는 (F) → 정답 (F).',
            ],
            tip: '"waited patiently"는 불평 없이 차분히 기다리는 모습을 나타냅니다.',
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
            method: '"Noticed / Spotted"는 의미의 동사를 고른다.',
            steps: [
              'Sam이 지켜보다가 주인의 부정행위를 "Realised / Noticed".',
              '"spotted" = (눈여겨보다가) 발견하다/알아채다.',
              '보기에서 spotted는 (H) → 정답 (H).',
            ],
            tip: '"spotted"는 주의 깊게 보다가 무언가를 알아챘을 때 씁니다.',
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
            method: '"Reluctantly, with a dissatisfied feeling" 행동했음을 나타내는 부사를 고른다.',
            steps: [
              '주인의 부정행위에 짜증났지만(annoyed) 그래도 돈을 지불해야 했음.',
              '"reluctantly" = 마지못해/꺼림칙하게 → 짜증난 감정과 어울린다.',
              '보기에서 reluctantly는 (G) → 정답 (G).',
            ],
            tip: '"annoyed"한 감정 뒤에는 "reluctantly"(마지못해)처럼 내키지 않는 행동이 자연스럽게 이어집니다.',
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
            method: '"Apologised shyly/with embarrassment"는 의미의 동사를 고른다.',
            steps: [
              '"Embarrassed"(당황하여) 한 행동.',
              '"apologised" = 사과했다 → "apologised to Sam for cheating"이 자연스럽다.',
              '보기에서 apologised는 (B) → 정답 (B). (남은 C·D·E는 사용되지 않음)',
            ],
            tip: '"Embarrassed, ... apologised"는 부끄러움 → 사과의 흐름을 보여줍니다.',
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
            method: '주어 "Everyone"의 수를 확인한다.',
            steps: [
              '"Everyone"은 항상 단수로 취급한다.',
              '단수 주어에 맞는 현재완료 조동사는 has.',
              '따라서 "Everyone... has received" → has.',
            ],
            tip: '"Everyone/Everybody/Someone" 등은 단수 동사(has, is, was)와 함께 씁니다.',
          },
        },
        {
          questionNo: '29',
          format: 'editing',
          marks: 1,
          stem: 'Lilian always ( do / does ) her homework immediately after taking her lunch.',
          answer: 'does',
          solution: {
            method: '주어 "Lilian"(단수)과 "always"(반복 습관)을 본다.',
            steps: [
              '"Lilian"은 3인칭 단수.',
              '"always"는 반복되는 습관 → 단순현재.',
              '3인칭 단수 현재형은 -s를 붙인 does → does.',
            ],
            tip: '3인칭 단수 주어의 현재형 동사는 -s/-es를 붙입니다(do → does).',
          },
        },
        {
          questionNo: '30',
          format: 'editing',
          marks: 1,
          stem: 'We need to do our part to keep the ( enviroment / environment ) clean.',
          answer: 'environment',
          solution: {
            method: '"Environment"이라는 단어의 정확한 철자를 확인한다.',
            steps: [
              '잘못된 철자: enviroment (n이 하나 빠짐).',
              '바른 단어는 environment — "environ" + "ment", n이 두 번 들어간다.',
              '따라서 environment.',
            ],
            tip: 'environment는 "environ-ment"로, n이 두 번 들어갑니다.',
          },
        },
        {
          questionNo: '31',
          format: 'editing',
          marks: 1,
          stem: 'The snake glided away to escape from its ( predator / predater ).',
          answer: 'predator',
          solution: {
            method: '"Predator"라는 단어의 끝 철자(-or vs -er)를 확인한다.',
            steps: [
              '잘못된 철자: predater.',
              '바른 단어는 predator — 끝이 -or.',
              '따라서 predator.',
            ],
            tip: 'predator는 끝이 -or입니다(predater ✗).',
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
            method: '"Disappointed"이라는 단어의 접두사(dis-)와 자음 중복을 확인한다.',
            steps: [
              '잘못된 철자: dissapointed (s가 두 번, p는 한 번).',
              '바른 단어는 disappointed — dis(접두사, s 한 번) + appoint(p가 두 번) + ed.',
              '따라서 disappointed.',
            ],
            tip: 'disappointed는 dis-(s 1개) + ap-point(p 2개) 구조입니다.',
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
        method: '원인과 결과를 "so"로 연결한다.',
        steps: [
          '원인: 숙제를 끝내지 않음 / 결과: 축구를 못함.',
          '"so"(그래서)는 원인 뒤에 결과를 연결하는 접속사.',
          '"Tom did not complete his homework, so he was not allowed to play soccer."',
          '두 번째 Tom은 반복을 피하기 위해 "he"로 바꾼다.',
        ],
        tip: '"A, so B"는 "Because of A (cause), B happens (effect)"라는 뜻입니다. 반복되는 이름은 대명사로 바꾸세요.',
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
        method: '두 사건을 "when"(~했을 때)으로 연결한다.',
        steps: [
          '앞: Emily가 놀랐다(결과/감정) / 뒤: 책상에서 생일 케이크를 보았다(원인이 된 사건).',
          '"when"은 "When ~ happened"라는 뜻으로 동시에 일어난/계기가 된 사건을 연결한다.',
          '"Emily was surprised when she saw a birthday cake on her desk."',
          '반복되는 Emily는 "she"로 바꾼다.',
        ],
        tip: '"A when B"는 "When B happened, A happened"는 뜻으로, 보통 감정(A)의 원인이 되는 사건(B)을 연결합니다.',
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
            method: '1단락에서 염소 떼가 길을 잃은 기간을 찾는다.',
            steps: [
              '1단락: "A herd of goats was lost in the forest for two days."',
              '염소 떼는 이틀(two days) 동안 길을 잃었다.',
              '따라서 답은 "two days" (또는 "for two days").',
            ],
            tip: '"How long"은 지문에서 기간을 나타내는 표현(for ~ days)을 그대로 찾으면 됩니다.',
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
            method: 'tired(피곤한)와 같은 뜻의 단어를 고른다.',
            steps: [
              'confused = 혼란스러운 → tired와 다른 의미.',
              'exhausted = 매우 피곤한, 지친 → tired와 동의어.',
              '따라서 정답은 (B) exhausted.',
            ],
            tip: 'exhausted는 "Very tired/exhausted"이라는 뜻으로 tired의 강한 동의어입니다.',
          },
        },
        {
          questionNo: '37',
          format: 'open',
          marks: 2,
          stem: 'Why did the brown goat want to rest?\nThe brown goat was ________ and ________.',
          answer: 'The brown goat was thirsty and hungry.',
          solution: {
            method: '2단락에서 갈색 염소가 쉬자고 한 이유 두 가지를 찾는다.',
            steps: [
              '2단락: "We have not eaten for days. I\'m so thirsty and hungry. Shall we take a rest?"',
              '쉬자고 한 이유는 목이 마르고(thirsty) 배가 고프기(hungry) 때문.',
              '빈칸에 각각 thirsty와 hungry를 적는다.',
            ],
            tip: '"Shall we take a rest?" 바로 앞의 두 형용사(thirsty, hungry)가 이유입니다.',
          },
        },
        {
          questionNo: '38',
          format: 'open',
          marks: 1,
          stem: "Which word in paragraph 5 has the same meaning as 'unfriendly'?",
          answer: 'hostile',
          solution: {
            method: 'unfriendly(불친절한/적대적인)와 같은 뜻의 단어를 5단락에서 찾는다.',
            steps: [
              '5단락: "The rest of the goats began to move away from the buffalo and they were hostile to him."',
              '"hostile" = 적대적인/불친절한 → unfriendly와 의미가 통한다.',
              '따라서 답은 hostile.',
            ],
            tip: '"hostile"은 적대적이고 불친절한 태도를 나타내는 단어입니다.',
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
            method: '각 보기를 지문과 하나씩 대조한다.',
            steps: [
              '(1) 5단락: 처음에 염소들은 버팔로를 무시하고 멀리하며 적대적이었다("Let\'s ignore him", "hostile to him") → 참.',
              '(2) 버팔로는 "To find the way" 도움을 주었을 뿐, "To find food"라는 언급은 없음 → 거짓.',
              '(3) 4단락: 버팔로는 "I\'ve been lost in the forest for four days"(나흘) — 이틀이 아님 → 거짓.',
              '(4) 1단락: 염소 떼가 가장 경험 많은 가장 늙은 염소를 따라갔음에도 길을 잃었다 → 가장 늙은 염소도 길을 몰랐음을 암시 → 참.',
              '따라서 참인 진술은 (1)과 (4).',
            ],
            tip: '숫자(four days vs two days)가 들어간 보기는 지문의 정확한 숫자와 꼭 대조하세요.',
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
            method: '마지막 단락에서 염소들의 최종 감정을 확인한다.',
            steps: [
              '마지막 단락: "The goats thanked the buffalo for helping them to find the way out of the forest."',
              '"thanked"(감사했다) → "grateful"(감사하는)과 의미가 통한다.',
              '따라서 정답은 grateful. (공식 정답표 확인됨)',
            ],
            tip: '"thanked"는 grateful(감사하는)과 직접 연결됩니다.',
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
            method: '1단락에서 상인의 직업/생계 수단을 찾는다.',
            steps: [
              '1단락: "A merchant wanted to sell a few sacks of salt to a village nearby."',
              '상인은 소금을 마을에 파는 일로 생계를 유지했다.',
              '따라서 "by selling salt to villages" → 정답.',
            ],
            tip: '"How did ~ earn a living"은 인물의 직업/거래 품목을 지문에서 찾으면 됩니다.',
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
              '해당 줄: "The size of the sacks shrunk as the salt in them reduced tremendously. Most of it had dissolved in the water."',
              "'it' refers to 'the salt' that was mentioned just before.",
              "Write as a complete sentence: \"'it' refers to the salt.\"",
            ],
            tip: '대명사 it은 바로 앞 문장의 단수 사물 명사(여기서는 salt)를 가리키는 경우가 많습니다.',
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
              '5단락: "...the merchant removed the sacks of cotton and led the drenched donkey out of the river."',
              '"drenched" = 완전히 젖은 → 정확히 일치.',
              '따라서 답은 drenched.',
            ],
            tip: '"drenched"는 물에 흠뻑 젖은 상태를 강조하는 단어입니다.',
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
            method: '지문의 날짜별 사건(첫째 날 → 둘째 날 → 셋째 날)을 따라간다.',
            steps: [
              '2단락(첫째 날): "Then the donkey tripped and fell into the water."(우연히 빠짐) → 1.',
              '3단락(둘째 날): "The donkey was very happy and boasted to his friends that he had found a way to make his work easier."(자랑함) → 2.',
              '5단락(셋째 날): "the donkey tried the same trick again. He jumped into the water..."(목화 자루와 함께 빠짐) → 3.',
            ],
            tip: '"The next day"/"On the third day" 같은 시간 표지를 따라가면 사건 순서를 쉽게 정리할 수 있습니다.',
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
            method: '각 단락이 가리키는 "for several days"인지 정확히 확인한다.',
            steps: [
              '(a) 2단락(첫째 날): "Then the donkey tripped and fell into the water."(우연한 사고) → 첫째 날에 일어남. 3단락(둘째 날): "fell into the water on purpose"(고의로) → 둘째 날은 고의였음. 따라서 "accidentally fell in on the second day"는 거짓(False).',
              '(b) 마지막 단락: "After that incident, the donkey never tried to be lazy again." → 교훈을 얻었음이 명확함 → 참(True).',
              '각 답에 지문에서 찾은 근거(이유)를 함께 적는다.',
            ],
            tip: '"accidentally"(우연히)와 "on purpose"(고의로)는 각각 다른 날(1일차/2일차)에 해당하므로 날짜를 혼동하지 않도록 주의하세요.',
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
            method: '소금과 목화의 성질 차이를 비교해 상인의 의도를 추론한다.',
            steps: [
              '소금은 물에 녹아 가벼워지지만(2단락), 목화는 물을 흡수해 "becomes three times heavier"(5단락: "three times heavier than before because the cotton absorbed water").',
              '당나귀는 이전처럼 짐이 가벼워질 것이라 기대하고 또 일부러 물에 빠졌지만, 목화 때문에 오히려 훨씬 무거워져 고생했다.',
              '이는 게으름을 피우려 한 당나귀에게 교훈을 주기 위한 상인의 의도된 함정이었다.',
              '두 재료의 물 흡수 성질 차이와 그로 인한 결과를 모두 포함해 답한다.',
            ],
            tip: '"Why"에 2점이 배정된 문제는 보통 두 가지 요소(성질의 차이 + 그로 인한 결과/교훈)를 모두 포함해야 합니다.',
          },
        },
      ],
    },
  ],
};

export default paper2NanHuaPrimaryEnglish2023;
