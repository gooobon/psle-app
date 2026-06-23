// =============================================================================
// src/data/p3/english/papers/review1_maha_bodhi_english_2024.ts
// Maha Bodhi School — 2024 English Language Review (1) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 168–179 (시험지 표지 p.1–12)
// Duration: 50 minutes / Total: 30 marks / Date: 22 April 2024
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(6) B어휘(5) C문장부호(2) D문법클로즈(4) E어휘클로즈(5) E독해(8) = 30점
// =============================================================================

import type { EnglishPaper } from '../types';

export const review1MahaBodhiEnglish2024: EnglishPaper = {
  meta: {
    school: 'Maha Bodhi School',
    year: 2024,
    assessment: 'English Language Review (1)',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 30,
    sourcePages: 'pp.168–179 (paper pp.1–12)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (6 x 1 mark) — Q1–6
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2024-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last weekend, our family ________ to the beach.',
      options: [
        { label: '1', text: 'go' },
        { label: '2', text: 'goes' },
        { label: '3', text: 'went' },
        { label: '4', text: 'will go' },
      ],
      answer: '3',
      solution: {
        method: '"Last weekend"(과거 시점)에 맞는 동사 시제를 정한다.',
        steps: [
          '"Last weekend"는 명확한 과거 시점을 나타낸다.',
          'go의 과거형은 went.',
          '따라서 "our family went to the beach" → 정답 (3) went.',
        ],
        tip: '"last + time expression"(last weekend/night/year)은 과거시제의 신호입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'The men ________ a tent when a strong gust of wind blew it down.',
      options: [
        { label: '1', text: 'pitch' },
        { label: '2', text: 'pitched' },
        { label: '3', text: 'was pitching' },
        { label: '4', text: 'were pitching' },
      ],
      answer: '4',
      solution: {
        method: '"when ~ blew"(과거의 한 순간)와 동시에 진행 중이던 동작, 주어의 수를 본다.',
        steps: [
          '"when a strong gust of wind blew it down" — 바람이 분 것은 과거의 한 순간.',
          '그 순간 남자들은 텐트를 치는 "among / in the middle of"이었다 → 과거진행형.',
          '주어 "The men"은 복수 → "were pitching" → 정답 (4).',
        ],
        tip: '과거의 한 순간에 진행 중인 동작은 주어의 수에 맞춰 was/were + -ing로 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Gary was shocked to ________ all the money in his wallet missing.',
      options: [
        { label: '1', text: 'find' },
        { label: '2', text: 'finds' },
        { label: '3', text: 'found' },
        { label: '4', text: 'finding' },
      ],
      answer: '1',
      solution: {
        method: '"shocked to + base verb"(~해서 충격을 받다) 구문을 본다.',
        steps: [
          '"was shocked to + base verb"은 "was shocked after doing something"는 뜻의 정해진 구문.',
          'to 뒤에는 동사원형이 와야 한다.',
          '따라서 "shocked to find"(발견하고 충격받음) → 정답 (1) find.',
        ],
        tip: '감정 형용사(shocked, surprised, happy 등) + to + 동사원형은 자주 쓰이는 구문입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'They were fishing ________ the river and caught a lot of fish.',
      options: [
        { label: '1', text: 'by' },
        { label: '2', text: 'on' },
        { label: '3', text: 'under' },
        { label: '4', text: 'around' },
      ],
      answer: '1',
      solution: {
        method: '강 "beside / near"에서 낚시하는 위치를 나타내는 전치사를 고른다.',
        steps: [
          '낚시는 보통 강가(강 옆)에서 한다.',
          '"by the river" = 강가에서/강 옆에서.',
          'on(강 위, 배를 타고 있다면 가능하나 일반적이지 않음)/under(강 아래)/around(강 주변을 둘러서)는 덜 자연스럽다 → 정답 (1) by.',
        ],
        tip: '"by the river/sea"는 "at the riverside / at the seaside"라는 뜻으로 자주 쓰입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'There is not ________ rice left in the pot for dinner.',
      options: [
        { label: '1', text: 'little' },
        { label: '2', text: 'much' },
        { label: '3', text: 'some' },
        { label: '4', text: 'many' },
      ],
      answer: '2',
      solution: {
        method: '"rice"의 가산 여부와 부정문 구조를 본다.',
        steps: [
          '"rice"는 셀 수 없는 명사 → many(가산용) 제외.',
          '"There is not ___ rice left"(밥이 많이 남지 않았다)는 부정문.',
          '불가산 명사의 양을 부정할 때는 "not much" → 정답 (2) much.',
        ],
        tip: '불가산 명사의 양이 적음을 부정문으로 말할 때는 "not much"를 씁니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        '"Look! A few drops of paint ________ dripping on the floor now," she warned her father who was painting her room.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '2',
      solution: {
        method: '주어의 수("A few drops")와 시간 표지("now")를 본다.',
        steps: [
          '주어 "A few drops of paint"의 핵심 명사는 "drops"(복수).',
          '"now"(지금)는 현재시제를 가리킨다.',
          '복수 주어 + 현재시제 be동사 → are → 정답 (2).',
        ],
        tip: '"A few drops of"처럼 of 앞의 단어(drops)가 주어의 수를 결정합니다(복수).',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (5 x 1 mark) — Q7–11
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2024-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'Grandfather is ________. He gives all his grandchildren good advice.',
      options: [
        { label: '1', text: 'as fast as light' },
        { label: '2', text: 'as busy as a bee' },
        { label: '3', text: 'as wise as an owl' },
        { label: '4', text: 'as cunning as a fox' },
      ],
      answer: '3',
      solution: {
        method: '"gives good advice"는 특징에 맞는 직유를 고른다.',
        steps: [
          '"He gives all his grandchildren good advice." — 좋은 조언 = 지혜로움.',
          '"as wise as an owl" = 올빼미처럼 지혜로운.',
          'fast(빠른)/busy(바쁜)/cunning(교활한)은 "good at giving advice"과 안 맞는다 → 정답 (3).',
        ],
        tip: '"as wise as an owl"은 지혜로운 사람을 묘사하는 정해진 직유입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'My stomach was ________ in hunger as I had not eaten all day.',
      options: [
        { label: '1', text: 'shaking' },
        { label: '2', text: 'rumbling' },
        { label: '3', text: 'quivering' },
        { label: '4', text: 'grumbling' },
      ],
      answer: '2',
      solution: {
        method: '배가 고플 때 배에서 나는 소리를 나타내는 동사를 고른다.',
        steps: [
          '하루 종일 못 먹었다 → 배에서 꾸르륵 소리가 난다.',
          '"rumble" = (배에서) 꾸르륵거리다 → "stomach was rumbling"이 정확한 표현.',
          'shaking/quivering(떨림)·grumbling(투덜거림, 보통 사람의 불만)은 배고픈 배 소리와 덜 어울린다 → 정답 (2) rumbling.',
        ],
        tip: '"stomach rumbles/was rumbling"은 배고픈 배에서 나는 소리를 표현하는 정해진 동사입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'Helen put together a ________ of colourful beads and tied them around her wrist.',
      options: [
        { label: '1', text: 'string' },
        { label: '2', text: 'bottle' },
        { label: '3', text: 'bunch' },
        { label: '4', text: 'collection' },
      ],
      answer: '1',
      solution: {
        method: '구슬을 엮어 손목에 묶는 모양을 나타내는 명사를 고른다.',
        steps: [
          '구슬들을 모아 손목에 묶었다 → 실에 꿴 구슬 줄.',
          '"a string of beads" = 구슬을 꿴 줄(목걸이/팔찌 형태) → 가장 자연스럽다.',
          'bottle(병)/bunch(다발, 보통 과일·꽃)/collection(수집품)은 "tied together and worn around the wrist" 모양과 덜 맞는다 → 정답 (1) string.',
        ],
        tip: '"a string of beads/pearls"는 구슬을 실에 꿴 줄을 가리키는 정해진 표현입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem:
        'The weak kitten meowed ________ when it was unable to find a way out of the narrow hole.',
      options: [
        { label: '1', text: 'loudly' },
        { label: '2', text: 'gracefully' },
        { label: '3', text: 'helplessly' },
        { label: '4', text: 'wonderfully' },
      ],
      answer: '3',
      solution: {
        method: '"weak and in need of help"를 나타내는 부사를 고른다.',
        steps: [
          '"The weak kitten"(약한 새끼고양이)이 좁은 구멍에서 나오지 못해 야옹거렸다.',
          '"helplessly" = 무력하게, 도움을 청하듯 → 약한 새끼고양이의 상태와 정확히 일치.',
          'loudly(크게)/gracefully(우아하게)/wonderfully(멋지게)는 "weak and in a difficult situation"과 안 맞는다 → 정답 (3) helplessly.',
        ],
        tip: '"weak"(약한)이라는 형용사가 부사(helplessly)의 의미를 알려주는 단서입니다.',
      },
    },
    {
      kind: 'single',
      id: 'mb2024-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem:
        'Spiders ________ their prey by spinning their webs so that the prey cannot escape.',
      options: [
        { label: '1', text: 'kill' },
        { label: '2', text: 'trap' },
        { label: '3', text: 'wrap' },
        { label: '4', text: 'cover' },
      ],
      answer: '2',
      solution: {
        method: '"to trap so that one cannot escape"는 의미에 맞는 동사를 고른다.',
        steps: [
          '"so that the prey cannot escape"(먹이가 도망갈 수 없도록) — 가두는 동작.',
          '"trap" = 가두다/덫에 걸리게 하다 → 거미줄로 먹이를 가두는 것과 정확히 일치.',
          'kill(죽이다)/wrap(감싸다)/cover(덮다)는 "to prevent from escaping"는 의미를 직접 담지 않는다 → 정답 (2) trap.',
        ],
        tip: '"trap"은 거미줄·덫처럼 무언가를 가두어 빠져나가지 못하게 하는 동작입니다.',
      },
    },

    // =========================================================================
    // Section C: Punctuation (2 x 1 mark) — Q12–13
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2024-secC-punctuation',
      topic: 'GrammarCloze',
      title: 'Section C: Punctuation',
      instructions:
        'For each of the following, choose the word with the correct punctuation to complete the text. Write the number (1, 2, 3 or 4) in the brackets provided.',
      passage:
        'I was all alone at home when I heard a knock on the door. I looked out the window (12) ________ was standing there. (13) ________ I asked, peering nervously.',
      marks: 2,
      questions: [
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem: 'I looked out the window (12) ________ was standing there.',
          options: [
            { label: '1', text: 'someone' },
            { label: '2', text: 'Someone' },
            { label: '3', text: ', someone' },
            { label: '4', text: '. Someone' },
          ],
          answer: '4',
          solution: {
            method: '두 개의 완전한 문장을 올바르게 구분하는 문장부호를 고른다.',
            steps: [
              '"I looked out the window"와 "Someone was standing there"는 각각 완전한 문장(주어+동사)이다.',
              '두 개의 완전한 문장을 이을 때는 마침표(.)로 끝내고 새 문장을 대문자로 시작한다.',
              '"...the window. Someone was standing there." → 정답 (4) ". Someone".',
              '(보기 (1)·(2)는 문장부호 없이 두 문장을 붙여 써서 틀림. (3)은 접속사 없는 콤마 연결로 어색함.)',
            ],
            tip: '두 개의 독립된 완전한 문장은 마침표로 끝내고, 다음 문장은 대문자로 시작합니다.',
          },
        },
        {
          questionNo: '13',
          format: 'mcq',
          marks: 1,
          stem: '(13) ________ I asked, peering nervously.',
          options: [
            { label: '1', text: "Hello, who's there." },
            { label: '2', text: '"Hello, who\'s there.' },
            { label: '3', text: 'Hello, who\'s there"?' },
            { label: '4', text: '"Hello, who's there?'  },
          ],
          answer: '4',
          solution: {
            method: 'Check the position of the double quotation marks and the ending punctuation mark (question mark) in the quoted question.',
            steps: [
              'The spoken words are a question, so a question mark (?) is needed at the end.',
              'A direct quote uses an opening double quotation mark (")로 시작해야 한다.',
              '(1)은 따옴표가 없고 마침표로 끝남, (2)는 따옴표는 있지만 마침표로 끝남, (3)은 여는 따옴표가 없고 물음표 위치가 잘못됨.',
              '(4)는 여는 큰따옴표와 물음표가 올바른 위치에 있음 → 정답 (4). (공식 정답표 확인됨)',
            ],
            tip:
              '직접 인용한 질문은 "Starts with opening quotation marks + ends with a question mark"이 기본 규칙입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Grammar Cloze (4 x 1 mark) — Q14–17
    // 보기: his, hers, ours, mine, theirs, yours (8개 중 6개, 소유대명사)
    // 지문: Reindeer and Penguin (친구 사이의 비밀과 거짓 자랑 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2024-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D: Grammar Cloze',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write the answer in the blanks provided. Each word can only be used once. Box: his | hers | ours | mine | theirs | yours',
      passage:
        'Reindeer and Penguin are good friends. One day, Penguin found a basket of fruit and decided to keep it for themselves. He told Reindeer, "These fruit are (14) ________. Don\'t tell anyone about it."\n\n' +
        'The next day, Reindeer forgot about (15) ________ promise to Penguin and showed off the fruit to the other animals.\n\n' +
        '"Wow! Are all these (16) ________?" they asked Reindeer admiringly.\n\n' +
        '"Yes, they\'re all (17) ________," Reindeer boasted. Penguin could not believe his ears!\n\n' +
        '(Adapted from https://freestoriesforkids.com/childrenstories-and-tales/bigmouth-fox)',
      marks: 4,
      questions: [
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'He told Reindeer, "These fruit are (14) ________. Don\'t tell anyone about it."',
          answer: 'ours',
          solution: {
            method: 'Penguin이 발견한 과일을 Reindeer와 "Together" 가진 비밀로 표현하는 소유대명사를 고른다.',
            steps: [
              'Penguin은 Reindeer에게만 이 사실을 말하고("Don\'t tell anyone about it") 둘만의 비밀로 한다.',
              '"This fruit belongs to both of us"이라는 의미로 "ours"가 자연스럽다.',
              '뒤에서 Reindeer가 다른 동물들 앞에서 "mine"이라고 자랑하는 것과 대조되어 이야기가 자연스럽게 이어진다 → 정답 ours.',
            ],
            tip: '비밀을 공유하는 두 사람을 가리킬 때는 "ours"(우리의 것)를 씁니다.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem:
            'The next day, Reindeer forgot about (15) ________ promise to Penguin and showed off the fruit to the other animals.',
          answer: 'his',
          solution: {
            method: 'Reindeer(남자, 단수) 자신의 약속을 가리키는 소유격을 고른다.',
            steps: [
              '"Reindeer forgot about ___ promise" — Reindeer 자신이 한 약속.',
              'Reindeer는 단수 남성으로 취급되므로(이야기 끝의 "his ears" 참고) 소유격은 "his".',
              '따라서 "his promise" → 정답 his.',
            ],
            tip: '명사 앞의 소유격은 "Whose it belongs to"를 나타냅니다(Reindeer → his promise).',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: '"Wow! Are all these (16) ________?" they asked Reindeer admiringly.',
          answer: 'yours',
          solution: {
            method: '다른 동물들이 Reindeer에게 직접 묻는 말의 소유대명사를 고른다.',
            steps: [
              '다른 동물들이 Reindeer에게 "Is all of this yours?"라고 묻고 있다.',
              '상대(Reindeer)에게 "Is it yours?"라고 물을 때는 "yours".',
              '따라서 "Are all these yours?" → 정답 yours.',
            ],
            tip: '상대방의 소유를 물을 때는 "Is/Are this/these yours?"를 씁니다.',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: '"Yes, they\'re all (17) ________," Reindeer boasted. Penguin could not believe his ears!',
          answer: 'mine',
          solution: {
            method: 'Reindeer가 자기 자신의 것이라고 자랑하는 소유대명사를 고른다.',
            steps: [
              'Reindeer는 (사실 Penguin과 나눈 비밀임에도) 모든 과일이 "One's own"이라고 자랑한다.',
              '자기 자신의 것을 가리키는 소유대명사는 "mine".',
              '따라서 "they\'re all mine" → 정답 mine. (남은 hers/theirs는 사용되지 않음)',
            ],
            tip: '"mine"은 화자 자신의 소유를 자랑하거나 주장할 때 씁니다. Penguin이 놀란 이유는 Reindeer가 약속을 어기고 거짓 자랑을 했기 때문입니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E (Vocabulary Cloze, 5 x 1 mark) — Q18–22
    // 보기: courageous, timid, instantly, quivering, slowly, thankful, wobbling, strange (8개 중 5개)
    // 지문: Andy(소심한 소년)와 Sarah(용감한 친구), 학교폭력 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2024-secE-vcloze',
      topic: 'VocabCloze',
      title: 'Section E: Vocabulary Cloze',
      instructions:
        'Read the passage carefully. Choose the best word from the box and write the answer in the blanks provided. Each word can only be used once. Box: courageous | timid | instantly | quivering | slowly | thankful | wobbling | strange',
      passage:
        'Andy was a shy boy with little confidence. He was (18) ________ and was often picked on by Max, the class bully. Everyone was afraid of Max except for Sarah. Sarah was (19) ________ and not afraid to stand up to him.\n\n' +
        'One day during recess, Max was looking for Andy to bully him, as usual. Sarah could see Andy hiding in a corner. He was (20) ________ in fear. Sarah did not waste any time. She (21) ________ marched up to Max and told him to stop bullying others or else she would report him to the teacher. He felt angry. However, he did not want to get into trouble, so he stopped. Andy felt so (22) ________ that he had such a helpful friend like Sarah. She was one person who would always come to his rescue.',
      marks: 5,
      questions: [
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: 'He was (18) ________ and was often picked on by Max, the class bully.',
          answer: 'timid',
          solution: {
            method: '"A shy boy who is not very confident"을 나타내는 형용사를 고른다.',
            steps: [
              '앞 문장: "Andy was a shy boy with little confidence."',
              '"timid" = 소심한, 겁이 많은 → shy와 같은 의미.',
              '따라서 빈칸은 timid.',
            ],
            tip: '"shy with little confidence"(자신감 적은 소심함)는 timid와 동의어 관계입니다.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'Sarah was (19) ________ and not afraid to stand up to him.',
          answer: 'courageous',
          solution: {
            method: '"Not afraid to stand up against"는 의미에 맞는 형용사를 고른다.',
            steps: [
              '"not afraid to stand up to him"(그에게 맞서기를 두려워하지 않음) → 용감함.',
              '"courageous" = 용감한 → 정확히 일치.',
              '따라서 빈칸은 courageous.',
            ],
            tip: 'Andy(timid)와 Sarah(courageous)는 서로 대조되는 성격으로 묘사됩니다.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'He was (20) ________ in fear.',
          answer: 'quivering',
          solution: {
            method: '두려움에 떠는 모습을 나타내는 단어를 고른다.',
            steps: [
              'Andy가 구석에 숨어 있는 상황에서 "in fear"(두려움에) 어떤 상태였는지 묘사.',
              '"quivering" = (두려움 등으로) 떨다 → "quivering in fear"가 자연스럽다.',
              '따라서 빈칸은 quivering.',
            ],
            tip: '"quivering in fear"는 두려움에 몸을 떠는 모습을 나타내는 표현입니다.',
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'She (21) ________ marched up to Max and told him to stop bullying others.',
          answer: 'instantly',
          solution: {
            method: '"Right away, without any delay" 행동했음을 나타내는 부사를 고른다.',
            steps: [
              '앞 문장: "Sarah did not waste any time."(시간을 낭비하지 않았다) → 즉시 행동함을 강조.',
              '"instantly" = 즉시, 곧바로 → "instantly marched up to Max"가 자연스럽다.',
              '따라서 빈칸은 instantly.',
            ],
            tip: '"did not waste any time"은 뒤에 "instantly/immediately" 같은 부사가 자연스럽게 이어집니다.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem:
            'Andy felt so (22) ________ that he had such a helpful friend like Sarah.',
          answer: 'thankful',
          solution: {
            method: '도움을 받은 후의 감정을 나타내는 형용사를 고른다.',
            steps: [
              'Sarah가 자신을 도와준 뒤 Andy가 느낀 감정.',
              '"thankful" = 감사하는 → 도움받은 후의 감정과 정확히 일치.',
              '따라서 빈칸은 thankful. (남은 slowly/wobbling/strange는 사용되지 않음)',
            ],
            tip: '"felt so ___ that ~"는 보통 감정 형용사가 들어가며, 도움을 받은 상황에는 thankful이 자연스럽습니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E (Comprehension Open-Ended, 8 marks total: Q23-29) — note: 원문에는 "(10 marks)"로 표기되어 있으나
    // 실제 배점 합계(1+1+1+2+1+1+1=8)는 표지의 총점 30점과 일치함.
    // 지문: The King of the Forest (Lion, Mouse, Fox, hunters)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2024-secE-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section E: Comprehension Open-Ended — The King of the Forest',
      instructions:
        'Read the passage carefully and annotate. Answer the following questions in complete sentences (unless otherwise stated). Your answers must be based on the passage read.',
      passage:
        'In the forest, Lion was the king and all the animals were afraid of him. One day, Lion heard the cries of an animal in a cave. He saw a huge fox holding a tiny mouse in his paws.\n\n' +
        '"Please, Fox...I\'m too skinny for you to eat," Mouse begged but Fox ignored his pleas.\n\n' +
        'Lion walked in and immediately, Fox snapped its jaws shut and appeared nervous.\n\n' +
        '"Let the mouse go!" snarled Lion.\n\n' +
        'Instantly, Fox released Mouse from his hold. Mouse was so grateful and thanked Lion for saving him.\n\n' +
        '"If you ever need help, I will be there," said Mouse but Lion just laughed and said that Mouse was too small to help someone like him.\n\n' +
        'The next day, some hunters came to the forest. They wanted to trap and sell the animals as pets to people in other countries. While trying to save the other animals, Lion got caught in a huge net. The animals gathered to discuss how they could save Lion. However, they were scared that they would be caught by the hunters, except for Mouse. He ran quietly to Lion.\n\n' +
        '"Go back, Mouse. You\'re too small and cannot do much," Lion whispered.\n\n' +
        'Mouse said fearlessly, "I may be small but I have my talents." Immediately, he chewed on the net and freed Lion.\n\n' +
        '(Adapted from "The King of the Forest" by Elizabeth Yeak)',
      marks: 8,
      questions: [
        {
          questionNo: '23',
          format: 'open',
          marks: 1,
          stem: 'Which animal was crying in the cave?',
          answer: 'Mouse was crying in the cave.',
          solution: {
            method: '1단락에서 동굴 속 동물을 확인한다.',
            steps: [
              '1단락: "Lion heard the cries of an animal in a cave. He saw a huge fox holding a tiny mouse in his paws."',
              '2단락: "\'Please, Fox...I\'m too skinny for you to eat,\' Mouse begged" — Mouse가 애원하며 울고 있었다.',
              '따라서 동굴 속에서 울고 있던 동물은 Mouse → "Mouse was crying in the cave."',
            ],
            tip: '"cries"(울음/외침)를 내는 주체는 뒤에 이어지는 대화의 화자(Mouse)에서 확인합니다.',
          },
        },
        {
          questionNo: '24',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Why did Fox release Mouse from his hold?',
          options: [
            { label: '1', text: 'He found Mouse too skinny.' },
            { label: '2', text: 'He saw Lion and appeared nervous.' },
            { label: '3', text: 'Lion told him to do so.' },
          ],
          answer: '3',
          solution: {
            method: 'Mouse가 풀려난 직접적인 계기를 지문에서 찾는다.',
            steps: [
              '"\'Let the mouse go!\' snarled Lion. Instantly, Fox released Mouse from his hold."',
              'Fox가 Mouse를 놓아준 것은 Lion의 명령(Let the mouse go!) 때문이다.',
              'Fox가 긴장한 것(appeared nervous)은 Lion을 본 직후의 반응이지, 풀어준 직접적 "Reason"는 Lion의 지시이다 → 정답 (3).',
            ],
            tip: '"Instantly" 바로 앞 문장(직접적인 명령/사건)이 결과의 원인임을 나타냅니다.',
          },
        },
        {
          questionNo: '25',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Why did Lion laugh when Mouse offered to help him?',
          options: [
            { label: '1', text: 'He thought that Mouse was not talented enough.' },
            { label: '2', text: 'He thought that he would never need Mouse\'s help.' },
            { label: '3', text: 'He thought that Mouse was not strong enough to help him.' },
          ],
          answer: '3',
          solution: {
            method: '6단락에서 Lion이 웃은 이유에 해당하는 표현을 정확히 찾는다.',
            steps: [
              '6단락: "Lion just laughed and said that Mouse was too small to help someone like him."',
              '"too small to help"는 몸집(크기/힘)이 작아서 도울 수 없다는 의미 → "Not strong enough"와 연결된다.',
              '"talented"(재능)나 "never need help"는 본문의 "too small"과 직접 연결되지 않는다 → 정답 (3).',
            ],
            tip: '"too small to help"는 신체적 크기/힘 부족을 가리키므로 "not strong enough"와 짝지어집니다.',
          },
        },
        {
          questionNo: '26',
          format: 'open',
          marks: 2,
          stem:
            'State if each sentence is True or False. Give a reason why you think so.\n' +
            '(a) The hunters did not kill the animals for food.\n' +
            '(b) The animals did not help Lion because they were afraid of him.',
          answer:
            '(a) True — The hunters wanted to trap and sell the animals as pets to people in other countries, not kill them for food.\n' +
            '(b) False — The animals were afraid of being caught by the hunters (not afraid of Lion); that is why they did not help him.',
          solution: {
            method: '7단락에서 사냥꾼의 목적과 동물들이 돕지 않은 진짜 이유를 확인한다.',
            steps: [
              '(a) "They wanted to trap and sell the animals as pets to people in other countries." — 음식이 아니라 애완동물로 팔기 위함 → 진술 "Did not kill for food"는 참(True).',
              '(b) "they were scared that they would be caught by the hunters, except for Mouse." — 동물들이 두려워한 대상은 "Hunter"이지 "Lion"이 아니다 → 진술은 거짓(False).',
              '각 답에 지문에서 찾은 근거를 이유로 함께 적는다.',
            ],
            tip: '"because they were afraid of him(Lion)"처럼 두려움의 "Target"이 바뀌어 있는 함정 문장에 주의하세요.',
          },
        },
        {
          questionNo: '27',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story.\n' +
            '( ) Mouse offered to help Lion if he was ever in trouble.\n' +
            '( ) Lion saved Mouse from getting eaten by Fox.\n' +
            '( ) The animals were too scared to rescue Lion from the hunters.',
          answer:
            'Lion saved Mouse from getting eaten by Fox = 1; Mouse offered to help Lion if he was ever in trouble = 2; The animals were too scared to rescue Lion from the hunters = 3',
          solution: {
            method: '지문의 사건 순서(여우 사건 → 약속 → 사냥꾼 사건)를 따라간다.',
            steps: [
              '먼저: Lion이 Fox로부터 Mouse를 구해줌("Let the mouse go!") → 1.',
              '그 다음: Mouse가 "If you ever need help, I will be there"라고 도움을 약속함 → 2.',
              '마지막: 다음날 사냥꾼이 와서 Lion이 그물에 걸렸을 때, 동물들이 무서워서 돕지 못함("they were scared that they would be caught by the hunters") → 3.',
            ],
            tip: '"The next day"(다음날)는 새로운 사건(사냥꾼 등장)이 이전 사건들 이후에 일어남을 알려주는 단서입니다.',
          },
        },
        {
          questionNo: '28',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Mouse was ________ because she thought of a way to help Lion.',
          options: [
            { label: '1', text: 'kind' },
            { label: '2', text: 'brave' },
            { label: '3', text: 'intelligent' },
          ],
          answer: '3',
          solution: {
            method: '"thought of a way (came up with a way)"는 표현에 맞는 성격을 고른다.',
            steps: [
              '"thought of a way to help"는 아이디어/해결책을 생각해낸 것 → 영리함/지혜로움.',
              '"intelligent" = 영리한, 똑똑한 → "to think of / to come up with"라는 행위와 가장 직접적으로 연결된다.',
              'kind(친절한)/brave(용감한)는 행동의 동기나 태도를 나타내지만, "the ability to think of ideas / the ability to come up with ideas"을 직접 가리키지는 않는다 → 정답 (3) intelligent.',
            ],
            tip: '"thought of a way"(아이디어를 떠올림)는 보통 intelligent/clever와 짝지어집니다.',
          },
        },
        {
          questionNo: '29',
          format: 'open',
          marks: 1,
          stem: "Which of Mouse's actions eventually saved Lion?\nIt was ________",
          answer: 'chewing on (through) the net to free Lion.',
          solution: {
            method: '마지막 단락에서 Lion을 구한 직접적인 행동을 찾는다.',
            steps: [
              '마지막 단락: "Immediately, he chewed on the net and freed Lion."',
              'Lion을 구한 행동은 그물을 갉아서 끊은 것(chewed on the net).',
              '따라서 "It was chewing on the net to free Lion."',
            ],
            tip: '"eventually saved"는 이야기의 마지막 행동(결정적 사건)에서 답을 찾습니다.',
          },
        },
      ],
    },
  ],
};

export default review1MahaBodhiEnglish2024;
