// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2023.ts
// Nanyang Primary School — Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 78–85 (시험지 표지 p.1–7)
// Duration: 40 minutes / Total: 20 marks
// 주의: 표지에 연도가 인쇄되어 있지 않음. 모음집 배열 순서상 2023년으로 추정
//       (명시적 'Nanyang 2024' 시험지는 PDF 뒤쪽 p200에 별도 존재). 연도 검증 권장.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.78–85 (paper pp.1–7)',
  },

  items: [
    // =========================================================================
    // (A) Grammar — MCQ Q1–3 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2023-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'John ________ when he watched the sad movie.',
      options: [
        { label: '1', text: 'cry' },
        { label: '2', text: 'cried' },
        { label: '3', text: 'cries' },
        { label: '4', text: 'is crying' },
      ],
      answer: '2',
      solution: {
        method: '시간 표지(when he watched)로 문장의 시제를 파악한다.',
        steps: [
          '"when he watched the sad movie" — watched는 과거형.',
          '같은 과거의 일이므로 동사도 과거형이어야 한다.',
          'cry의 과거형은 cried → 정답 (2).',
        ],
        tip: '한 문장 안 다른 동사가 과거형이면, 빈칸 동사도 보통 과거형으로 맞춥니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2023-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'There is not ________ orange juice left as Dad has drunk most of it.',
      options: [
        { label: '1', text: 'little' },
        { label: '2', text: 'some' },
        { label: '3', text: 'much' },
        { label: '4', text: 'many' },
      ],
      answer: '3',
      solution: {
        method: '셀 수 있는지(가산/불가산)와 부정문 여부를 따진다.',
        steps: [
          'orange juice는 셀 수 없는 명사(불가산) → many는 불가.',
          '부정문 "is not ___"에서는 some보다 much/any가 자연스럽다.',
          '"not much orange juice"(많이 남아있지 않다)가 가장 자연스럽다 → 정답 (3).',
        ],
        tip: '불가산 명사에는 much, 가산 복수 명사에는 many를 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2023-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '"How about sharing your toys with ________ children over there?" the teacher asked.',
      options: [
        { label: '1', text: 'this' },
        { label: '2', text: 'that' },
        { label: '3', text: 'these' },
        { label: '4', text: 'those' },
      ],
      answer: '4',
      solution: {
        method: '명사의 수(단수/복수)와 거리(가까움/멈)를 본다.',
        steps: [
          '"children"은 복수 → this/that(단수) 제외.',
          '"over there"(저기)는 멀리 있음 → these(가까움)가 아니라 those.',
          '따라서 정답은 (4) those.',
        ],
        tip: 'this/these=가까운 것, that/those=먼 것. 단수는 this/that, 복수는 these/those.',
      },
    },

    // =========================================================================
    // (B) Vocabulary — MCQ Q4–6 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny2023-q4',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'No one could recognise Barry in ________ as an alien at the party last night.',
      options: [
        { label: '1', text: 'parade' },
        { label: '2', text: 'bluffing' },
        { label: '3', text: 'disguise' },
        { label: '4', text: 'camouflage' },
      ],
      answer: '3',
      solution: {
        method: '"Nobody recognised him/her"는 문맥에 맞는 단어와 관용구를 찾는다.',
        steps: [
          '외계인 분장으로 정체를 숨겼기에 아무도 못 알아본 상황.',
          '"in disguise"(변장하여)는 정체를 감출 때 쓰는 굳어진 표현.',
          'camouflage는 보통 군사·동물의 위장에 쓰여 문맥과 덜 맞는다 → 정답 (3) disguise.',
        ],
        tip: '"in disguise"는 "While in disguise"라는 자주 나오는 숙어입니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2023-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem:
        'The large amount of toxic waste emptied into this river ________ the habitat of many creatures living in it.',
      options: [
        { label: '1', text: 'attacked' },
        { label: '2', text: 'wrenched' },
        { label: '3', text: 'destroyed' },
        { label: '4', text: 'obstructed' },
      ],
      answer: '3',
      solution: {
        method: '독성 폐기물이 서식지에 끼치는 결과로 알맞은 동사를 고른다.',
        steps: [
          '독성 폐기물(toxic waste)은 생물의 서식지를 망가뜨린다.',
          'destroy = 파괴하다 → 서식지 파괴라는 의미에 가장 적합.',
          'attacked/wrenched/obstructed는 서식지에 대한 표현으로 부자연스럽다 → 정답 (3) destroyed.',
        ],
        tip: '주어(원인)와 목적어(대상)를 함께 보고 가장 자연스러운 동사를 고릅니다.',
      },
    },
    {
      kind: 'single',
      id: 'ny2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: 'The ________ curtains put up in the bedroom gave it a soft and cosy look.',
      options: [
        { label: '1', text: 'waxy' },
        { label: '2', text: 'bulky' },
        { label: '3', text: 'prickly' },
        { label: '4', text: 'velvety' },
      ],
      answer: '4',
      solution: {
        method: '"soft and cosy"(부드럽고 포근한)와 어울리는 형용사를 찾는다.',
        steps: [
          '커튼이 방을 부드럽고 포근해 보이게 했다.',
          'velvety = 벨벳처럼 부드러운 → soft and cosy와 가장 잘 어울린다.',
          'waxy(밀랍 같은)/bulky(부피 큰)/prickly(따가운)는 부드러움과 거리가 멀다 → 정답 (4) velvety.',
        ],
        tip: '빈칸 뒤의 결과·묘사("soft and cosy")가 형용사 선택의 단서입니다.',
      },
    },

    // =========================================================================
    // (C) Grammar Cloze — Q7–9 (3 marks)
    // 대명사/소유격 채우기, 보기 A~F 중 택 (each word once only)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2023-secC-cloze',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze',
      instructions:
        'There are 3 blanks, numbered 7 to 9. Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) I  (B) they  (C) we  (D) our  (E) their  (F) you',
      passage:
        '"Teachers\' Day is coming! Shall (7) ________ make a gift for our teacher together?" Timmy asked his classmate, Annie.\n\n' +
        'Annie agreed and they sat down to discuss what gift (8) ________ teacher would like. "I can bake some chocolate cupcakes for her. Timmy, why don\'t (9) ________ make a nice card for her?" Annie suggested. Timmy thought that was a good idea and he started designing the card immediately.',
      marks: 3,
      questions: [
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: '"Shall (7) ________ make a gift for our teacher together?" Timmy asked his classmate, Annie.',
          answer: 'C',
          solution: {
            method: '말하는 사람(Timmy)과 듣는 사람(Annie)을 함께 포함하는 주어를 고른다.',
            steps: [
              'Timmy가 Annie에게 "Together" 만들자고 제안.',
              '화자+청자를 함께 가리키는 1인칭 복수 주어는 "we".',
              '보기에서 we는 (C) → 정답 (C).',
            ],
            tip: '"Shall we ~ together?"는 함께 하자는 제안의 대표 표현입니다.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'Annie agreed and they sat down to discuss what gift (8) ________ teacher would like.',
          answer: 'E',
          solution: {
            method: '서술(narration)에서 두 사람의 선생님을 가리키는 소유격을 고른다.',
            steps: [
              '문장은 작가가 Timmy와 Annie를 3인칭으로 서술하는 부분.',
              '두 사람(they)의 선생님이므로 소유격 "their" teacher.',
              '보기에서 their은 (E) → 정답 (E).',
            ],
            tip: '직접 대화가 아닌 서술 문장에서 "Their ~"는 our가 아니라 their로 표현합니다.',
          },
        },
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: '"Timmy, why don\'t (9) ________ make a nice card for her?" Annie suggested.',
          answer: 'F',
          solution: {
            method: 'Annie가 상대(Timmy)에게 직접 권하는 말의 주어를 고른다.',
            steps: [
              'Annie가 Timmy에게 "Why don't you ~?"라고 직접 제안.',
              '상대 한 사람을 가리키는 2인칭 주어는 "you".',
              '보기에서 you는 (F) → 정답 (F). (남은 단어 A·B·D로도 확인 가능)',
            ],
            tip: '"Why don\'t you ~?"는 상대에게 권유할 때 쓰는 표현입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // (D) Editing for Spelling — Q10–12 (3 marks)
    // 밑줄 친 단어의 철자 오류를 바르게 고치기
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2023-secD-editing',
      topic: 'Editing',
      title: '(D) Editing for Spelling',
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes. (밑줄 친 단어 = resieve(10), petreefyed(11), suprized(12))',
      passage:
        'It was Julie\'s birthday! She had been waiting eagerly to see what presents she would (10) [resieve]. Just then, the doorbell rang. Thinking it was a delivery meant for her, she opened the door. She was (11) [petreefyed] by what she saw.\n\n' +
        'It was a huge grizzly bear! Seeing her shocked face, the grizzly bear exclaimed, "Happy birthday, Julie!" She was (12) [suprized] to see her father in the bear costume. It was a memorable birthday for Julie.',
      marks: 3,
      questions: [
        {
          questionNo: '10',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "presents she would resieve."',
          answer: 'receive',
          solution: {
            method: '"e before i / ei" 철자 규칙을 적용한다.',
            steps: [
              '잘못된 철자: resieve.',
              'c 다음에는 "ei"를 쓴다 (i before e, except after c).',
              '바른 철자: receive.',
            ],
            tip: '"i before e, except after c" — c 뒤에서는 ei 순서(receive, ceiling)를 기억하세요.',
          },
        },
        {
          questionNo: '11',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "She was petreefyed by what she saw."',
          answer: 'petrified',
          solution: {
            method: '문맥(겁에 질림)에 맞는 단어의 정확한 철자를 떠올린다.',
            steps: [
              '잘못된 철자: petreefyed.',
              '의미는 "Terrified". 바른 단어는 petrified.',
              '-fy로 끝나는 동사의 과거형은 y→i 후 -ed: petrify → petrified.',
            ],
            tip: '자음+y로 끝나는 동사는 과거형에서 y를 i로 바꾸고 -ed를 붙입니다.',
          },
        },
        {
          questionNo: '12',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "She was suprized to see her father."',
          answer: 'surprised',
          solution: {
            method: '자주 빠뜨리는 글자(첫 번째 r)를 확인한다.',
            steps: [
              '잘못된 철자: suprized.',
              '올바른 단어는 surprised — 앞부분 "sur-"에 r이 들어간다.',
              '또한 영국식·표준 철자는 -ised/-ized 중 -ised가 흔하지만 여기서는 surprised로 교정.',
            ],
            tip: 'surprise는 발음상 잘 안 들리는 첫 r(sur-)을 빠뜨리지 않도록 주의하세요.',
          },
        },
      ],
    },

    // =========================================================================
    // (E) Comprehension — Q13–19 (8 marks)
    // 지문: The Little Thief in the Pantry (Greywhiskers 생쥐 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny2023-secE-comprehension',
      topic: 'ComprehensionOE',
      title: '(E) Comprehension — The Little Thief in the Pantry',
      instructions: 'Read this passage and answer questions 13 to 19.',
      passage:
        '"Mother," said a little mouse, "the people in our house are so kind! They leave such nice things for us in the kitchen!"\n\n' +
        '"People are not as kind as you think. Greywhiskers, remember that you are not allowed to leave our mouse-hole by yourself as it is dangerous," warned Mother Mouse.\n\n' +
        'Greywhiskers nodded his head, but he had other plans. As soon as his mother had curled up for her daily nap, he scampered out of the mouse-hole to the kitchen.\n\n' +
        'He saw a cake on the table. Greywhiskers sniffed the cake, then nibbled on it greedily. The cake was not only fragrant, but also scrumptious! When he got home, he was scolded by his mother for disobeying her. He promised her that he would not do it again.\n\n' +
        'However, the naughty little mouse went to the kitchen again the next day. He saw his favourite cheese and ran forward to get it, but something snapped shut, trapping him. It was a mouse trap! Greywhiskers sobbed in a corner of the trap, wishing he had listened to his mother.\n\n' +
        'Soon, the man who had set the trap came. He saw the little mouse and said to a little girl, "See who ate your cake Ethel! I\'m going to get rid of it."\n\n' +
        'Ethel felt sorry for the mouse. Before the man could do anything, she lifted the lid of the trap, and the little mouse scurried home as quickly as it could.\n\n' +
        '(Adapted from: The Little Thief in the Pantry)',
      marks: 8,
      questions: [
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem:
            'Fill in the blank with a suitable word. Mother Mouse did not want Greywhiskers to leave the mouse-hole by himself as she felt that it was not ________ for him to do so.',
          answer: 'safe',
          solution: {
            method: '엄마가 밖에 나가지 못하게 한 이유를 지문에서 찾아 반대말로 빈칸을 채운다.',
            steps: [
              '2단락: "you are not allowed to leave our mouse-hole by yourself as it is dangerous".',
              '엄마는 밖이 "Dangerous"하다고 했다.',
              '"To be dangerous"의 반대 의미로 빈칸을 채우면 "not safe"(안전하지 않다) → safe.',
            ],
            tip: '지문의 단어(dangerous)를 빈칸 문장 형태(not ____)에 맞게 반대말(safe)로 바꿔야 합니다.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 1,
          stem:
            'Pick out a four-word phrase from paragraph 3 which shows that Greywhiskers was thinking about disobeying his mother.',
          answer: 'he had other plans',
          solution: {
            method: '3단락에서 "Secretly thought of something else"를 보여주는 네 단어 표현을 찾는다.',
            steps: [
              '3단락: "Greywhiskers nodded his head, but he had other plans."',
              '겉으로는 끄덕였지만 속으로 딴생각을 품었음을 보여주는 부분.',
              '네 단어 표현은 "he had other plans".',
            ],
            tip: '"four-word phrase"는 정확히 네 단어를 그대로 옮겨 적습니다.',
          },
        },
        {
          questionNo: '15',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as "delicious"? Circle either (A) or (B). Sentence: "The cake was not only fragrant (A), but also scrumptious (B)!"',
          options: [
            { label: 'A', text: 'fragrant' },
            { label: 'B', text: 'scrumptious' },
          ],
          answer: 'B',
          solution: {
            method: 'delicious(맛있는)와 같은 뜻의 단어를 두 보기 중에서 고른다.',
            steps: [
              'fragrant = 향기로운 (냄새) → 맛과 직접 관련 없음.',
              'scrumptious = 아주 맛있는 → delicious와 같은 뜻.',
              '따라서 정답은 (B) scrumptious.',
            ],
            tip: 'fragrant는 "Smell", scrumptious는 "Taste"을 나타냄을 구분하세요.',
          },
        },
        {
          questionNo: '16',
          format: 'open',
          marks: 2,
          stem:
            'Using information from paragraph 4, complete the sentences to show what each of the two mice did when Mother Mouse discovered that the little mouse had gone to the kitchen by himself.\n' +
            'a) Mother Mouse ________\n' +
            'b) The little mouse ________',
          answer:
            'a) Mother Mouse scolded him (Greywhiskers) for disobeying her.  b) The little mouse promised (her) that he would not do it again.',
          solution: {
            method: '4단락 마지막 두 문장에서 엄마와 새끼 쥐의 행동을 각각 찾는다.',
            steps: [
              '4단락: "he was scolded by his mother for disobeying her." → 엄마가 야단쳤다(scolded).',
              '"He promised her that he would not do it again." → 새끼 쥐는 다시 안 하겠다고 약속했다(promised).',
              'a)에는 엄마의 행동(꾸짖음), b)에는 새끼 쥐의 행동(약속)을 적는다.',
            ],
            tip: '"each of the two"는 두 인물의 행동을 각각 나눠 써야 모두 득점합니다.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks to show what happened first, next, and last in the story.\n' +
            '( ) Mother Mouse slept.\n' +
            '( ) Greywhiskers was caught.\n' +
            '( ) Greywhiskers saw his favourite food in the kitchen.',
          answer:
            'Mother Mouse slept = 1; Greywhiskers was caught = 3; Greywhiskers saw his favourite food in the kitchen = 2',
          solution: {
            method: '사건이 지문에 나오는 순서대로 번호를 매긴다.',
            steps: [
              '먼저: 엄마가 낮잠을 잤다("his mother had curled up for her daily nap") → 1.',
              '다음 날: Greywhiskers가 부엌에서 좋아하는 음식(치즈)을 봤다 → 2.',
              '그 직후: 덫에 걸렸다("something snapped shut, trapping him") → 3.',
            ],
            tip: '"Seeing their favourite food"과 "Getting caught in a trap"은 같은 단락에 연달아 나오므로 순서에 주의하세요.',
          },
        },
        {
          questionNo: '18',
          format: 'mcq',
          marks: 1,
          stem:
            'Tick the word that best describes how the little mouse felt when he was caught by the mouse trap.',
          options: [
            { label: '1', text: 'angry' },
            { label: '2', text: 'regretful' },
            { label: '3', text: 'guilty' },
          ],
          answer: '2',
          solution: {
            method: '덫에 걸렸을 때 새끼 쥐의 반응을 지문에서 찾아 감정을 고른다.',
            steps: [
              '5단락: "Greywhiskers sobbed... wishing he had listened to his mother."',
              '엄마 말을 들었어야 했다고 후회하며 흐느꼈다.',
              '"Regretful / Feeling sorry" 감정 = regretful → 정답 (2).',
            ],
            tip: '"wishing he had ~"(~했더라면)는 후회(regret)를 나타내는 단서 표현입니다.',
          },
        },
        {
          questionNo: '19',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Ethel was angry with the little mouse for eating her cake.',
          answer: 'False',
          solution: {
            method: 'Ethel이 쥐를 대한 태도를 지문에서 확인한다.',
            steps: [
              '마지막 단락: "Ethel felt sorry for the mouse."',
              '그녀는 화내기는커녕 덫을 열어 쥐를 풀어주었다.',
              '따라서 "felt angry"는 거짓 → False.',
            ],
            tip: '인물의 감정 True/False는 그 인물이 실제로 한 행동(여기서는 쥐를 풀어줌)으로 판단합니다.',
          },
        },
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2023;
