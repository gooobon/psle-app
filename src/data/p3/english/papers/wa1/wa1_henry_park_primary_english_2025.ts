// =============================================================================
// src/data/p3/english/papers/wa1_henry_park_primary_english_2025.ts
// Henry Park Primary School — 2025 Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 228–233 (시험지 표지 p.1–6)
// Duration: 40 minutes / Total: 20 marks (Section A 8 + Section B 2 + Section C 10)
// ★ 공식 정답표(p234) 기준 18문항 중 17개 100% 일치, Q11은 정답표 기준으로 수정함.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1HenryParkPrimaryEnglish2025: EnglishPaper = {
  meta: {
    school: 'Henry Park Primary School',
    year: 2025,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.228–233 (paper pp.1–6)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar Cloze — Passage A (4 marks) — Q1–4
    // 보기: them, us, you, they, we, your
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2025-secA-passageA',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage A',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: them | us | you | they | we | your',
      passage:
        'Sarah and Tom saw an old man on the dock. He was trying to carry a big, heavy box.\n\n' +
        '"Should (1) ________ help him?" Sarah asked. "Yes, let\'s do that," Tom replied. (2) ________ walked up to the man.\n\n' +
        '"Can we help you with (3) ________ box?" Tom asked. The old man smiled.\n\n' +
        '"Thank you, that\'s very kind of you," he said.\n\n' +
        'Sarah and Tom carried the box together. It was quite heavy for them, but they were happy to help the old man. Helping others made (4) ________ feel good.',
      marks: 4,
      questions: [
        {
          questionNo: '1',
          format: 'fib',
          marks: 1,
          stem: '"Should (1) ________ help him?" Sarah asked.',
          answer: 'we',
          solution: {
            method: 'Sarah가 Tom에게 자신과 Tom을 포함해 "Shall we help together?"라고 묻는 주어를 고른다.',
            steps: [
              'Sarah는 자기 자신과 Tom을 포함해서 묻고 있다("Yes, let\'s do that" — Tom도 함께 동의함).',
              '화자(Sarah) 자신을 포함한 복수 주어는 "we".',
              '따라서 "Should we help him?" → 정답 we.',
            ],
            tip: '"Let\'s ~"(우리 ~하자)로 답하는 질문에는 보통 "we"로 제안합니다.',
          },
        },
        {
          questionNo: '2',
          format: 'fib',
          marks: 1,
          stem: '"Yes, let\'s do that," Tom replied. (2) ________ walked up to the man.',
          answer: 'they',
          solution: {
            method: 'Sarah와 Tom 두 사람을 함께 가리키는 3인칭 복수 주어를 고른다.',
            steps: [
              '이 문장은 서술자가 Sarah와 Tom을 외부에서 바라보는 시점(3인칭 서술).',
              'Sarah와 Tom 두 사람 = 3인칭 복수 → "they".',
              '따라서 "They walked up to the man." → 정답 they.',
            ],
            tip: '이야기 서술에서 등장인물 두 명 이상을 함께 가리킬 때는 they를 씁니다.',
          },
        },
        {
          questionNo: '3',
          format: 'fib',
          marks: 1,
          stem: '"Can we help you with (3) ________ box?" Tom asked.',
          answer: 'your',
          solution: {
            method: 'Tom이 노인(old man)에게 직접 묻는 말의 소유격을 고른다.',
            steps: [
              'Tom이 노인에게 "Your box"를 도와줄지 묻고 있다.',
              '상대방(노인)의 소유를 나타내는 2인칭 소유격은 "your".',
              '따라서 "Can we help you with your box?" → 정답 your.',
            ],
            tip: '"you"(목적격)가 이미 쓰였으면, 같은 사람의 소유물을 가리킬 때는 소유격 "your"를 씁니다.',
          },
        },
        {
          questionNo: '4',
          format: 'fib',
          marks: 1,
          stem: 'Helping others made (4) ________ feel good.',
          answer: 'them',
          solution: {
            method: '서술자가 Sarah와 Tom을 외부에서 가리키는 목적격 대명사를 고른다.',
            steps: [
              '"Helping others made ___ feel good" — 다른 사람을 도운 것이 Sarah와 Tom의 기분을 좋게 만들었다.',
              'Sarah와 Tom(3인칭 복수)을 목적어로 가리키는 대명사는 "them".',
              '따라서 "made them feel good" → 정답 them. (남은 us·you는 사용되지 않음)',
            ],
            tip: '3인칭 복수를 목적어로 가리킬 때는 them을 씁니다(주격 they의 목적격형).',
          },
        },
      ],
    },

    // =========================================================================
    // Section A: Grammar Cloze — Passage B (4 marks) — Q5–8
    // 보기: dance, dances, danced, dancing, are dancing, were dancing
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2025-secA-passageB',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage B',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: dance | dances | danced | dancing | are dancing | were dancing',
      passage:
        'Jenny loves dancing. She always (5) ________ with a big smile whenever she hears her favourite songs. Last weekend, my class had a party in the school hall. Everyone took turns to (6) ________ on the stage. Jenny (7) ________ as gracefully as a ballerina.\n\n' +
        'While we (8) ________, the principal walked in and cheered for us. It was the best day of the year.',
      marks: 4,
      questions: [
        {
          questionNo: '5',
          format: 'fib',
          marks: 1,
          stem: 'She always (5) ________ with a big smile whenever she hears her favourite songs.',
          answer: 'dances',
          solution: {
            method: '"always... whenever"(반복 습관)와 주어(She, 단수)에 맞춘다.',
            steps: [
              '"always... whenever she hears"는 반복되는 습관 → 단순현재.',
              '주어 "She"는 3인칭 단수 → 동사에 -s.',
              '따라서 "She always dances" → 정답 dances.',
            ],
            tip: '"always/whenever"는 반복 습관을 나타내는 단순현재의 신호입니다.',
          },
        },
        {
          questionNo: '6',
          format: 'fib',
          marks: 1,
          stem: 'Everyone took turns to (6) ________ on the stage.',
          answer: 'dance',
          solution: {
            method: '"took turns to + base verb" 구문을 적용한다.',
            steps: [
              '"take turns to + base verb" = 차례로 ~하다.',
              'to 뒤에는 동사원형이 온다.',
              '따라서 "took turns to dance" → 정답 dance.',
            ],
            tip: '"to" 뒤에는 항상 동사원형이 옵니다(to + base verb).',
          },
        },
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: 'Jenny (7) ________ as gracefully as a ballerina.',
          answer: 'danced',
          solution: {
            method: '지문 전체의 시제("Last weekend"=과거)에 맞춘다.',
            steps: [
              '"Last weekend, my class had a party..."로 시작하는 단락은 과거시제 서술.',
              '주어 "Jenny"(단수) + 과거 → danced.',
              '따라서 "Jenny danced as gracefully as a ballerina." → 정답 danced.',
            ],
            tip: '"Last weekend"로 시작하는 단락 안의 모든 동사는 과거시제로 일관되게 씁니다.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'While we (8) ________, the principal walked in and cheered for us.',
          answer: 'were dancing',
          solution: {
            method: '"While + subject + ___, [one past event]" 구조에서 진행 중이던 동작을 본다.',
            steps: [
              '"the principal walked in"(과거의 한 순간)이 일어났을 때, "we"는 춤을 추는 "In the middle of / during"이었다.',
              '특정 과거 시점에 진행 중인 동작 → 과거진행형.',
              '주어 "we"(복수) → "were dancing" → 정답 were dancing.',
            ],
            tip: '"While + subject + was/were -ing, [another past event]"은 한 동작이 진행되는 동안 다른 일이 일어났음을 나타냅니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Sentence Combining — Q9–10
    // =========================================================================
    {
      kind: 'single',
      id: 'hp2025-q9',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 9,
      marks: 1,
      stem:
        'Rewrite the two sentences as one sentence without changing the original meaning.\n' +
        'Rina was reading in her room. The doorbell rang.\n' +
        'When ________________________________________\n' +
        '________________________________________',
      answer: 'When the doorbell rang, Rina was reading in her room.',
      solution: {
        method: '"When + [short event], [situation that was already happening]" 구조로 연결한다.',
        steps: [
          '"The doorbell rang"(초인종이 울림)은 한순간에 일어난 짧은 사건.',
          '"Rina was reading in her room"(읽고 있던 중)은 그 사건이 일어났을 때 진행 중이던 상황.',
          '"When + [short event], [situation that was already happening]." 구조: "When the doorbell rang, Rina was reading in her room."',
        ],
        tip: '"When" 뒤에는 보통 짧고 갑작스러운 사건(rang)이 오고, 그 뒤 콤마 뒤에는 그 순간 진행 중이던 더 긴 동작(was reading)이 옵니다.',
      },
    },
    {
      kind: 'single',
      id: 'hp2025-q10',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 10,
      marks: 1,
      stem:
        'Rewrite the two sentences as one sentence without changing the original meaning.\n' +
        'Don likes to sing in front of others. Ariel likes to sing in front of others too.\n' +
        'Both ________________________________________\n' +
        '________________________________________',
      answer: 'Both Don and Ariel like to sing in front of others.',
      solution: {
        method: '"Both A and B" 구문으로 두 사람을 묶는다.',
        steps: [
          '두 사람 모두 같은 특징(다른 사람 앞에서 노래하는 것을 좋아함)을 가지므로 "Both A and B"로 합친다.',
          '주어가 "Both Don and Ariel"(복수)이 되면 동사는 likes → like로 바꾼다.',
          '완성: "Both Don and Ariel like to sing in front of others."',
        ],
        tip: '"Both A and B"는 복수 취급이므로 동사에 -s를 붙이지 않습니다(likes → like).',
      },
    },

    // =========================================================================
    // Section C: Comprehension (10 marks) — Q11–18
    // 지문: The Thirsty Crow (Aesop's Fables)
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2025-secC-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section C: Comprehension — The Thirsty Crow',
      instructions: 'Read the passage below and answer questions 11 to 18.',
      passage:
        'On a hot summer day, a thirsty crow flew over a garden. The crow had been searching for water for hours and was getting tired and impatient. Suddenly, it spotted a jug on a table in the garden.\n\n' +
        'Excited, the crow flew down and perched on the jug\'s rim. It looked inside and saw some water, but the water level was very low. The crow tried to reach the water with its beak, but it could not. The jug was too deep.\n\n' +
        'The crow thought hard about what to do. It looked around the garden and saw some small pebbles on the ground. An idea struck the clever bird!\n\n' +
        'One by one, the crow picked up the pebbles with its beak and dropped them into the jug. Plop, plop, plop! With each pebble that was dropped into the jug, the water level rose a little.\n\n' +
        'The crow worked tirelessly, flying back and forth between the ground and the jug. After a long time, the water finally rose high enough for the crow to reach it.\n\n' +
        'Happily, the crow dipped its beak into the water and took a long, refreshing drink. It had solved the problem all by itself!\n\n' +
        'As the crow flew away, it swelled with pride and satisfaction. It had learned that with patience and smart thinking, even difficult problems could be solved.\n\n' +
        '(Adapted from "The Thirsty Crow," a classic tale from Aesop\'s Fables.)',
      marks: 10,
      questions: [
        {
          questionNo: '11',
          format: 'mcq',
          marks: 1,
          stem: 'The crow was thirsty as it ________.',
          options: [
            { label: '1', text: 'was a sunny day' },
            { label: '2', text: 'had been flying for days' },
            { label: '3', text: 'had not drunk water for days' },
          ],
          answer: '1',
          solution: {
            method: '1단락 첫 문장에서 까마귀가 목이 마른 배경(날씨)을 확인한다.',
            steps: [
              '1단락: "On a hot summer day, a thirsty crow flew over a garden."',
              '"hot summer day"(더운 여름날) = "a sunny day"(맑고 더운 날) → 더운 날씨가 갈증의 배경.',
              '지문에는 "for hours"(몇 시간 동안 물을 찾음)라고만 나오며, "for days"(며칠 동안)라는 표현은 없음 → (2)·(3) 거짓.',
              '따라서 정답은 (1) was a sunny day.',
            ],
            tip: '지문의 정확한 시간 표현("hours" vs "days")을 보기와 꼼꼼히 대조하세요.',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem: 'The crow was excited because it saw ________.',
          options: [
            { label: '1', text: 'a jug on a table' },
            { label: '2', text: 'some water in a pond' },
            { label: '3', text: 'a table in the garden' },
          ],
          answer: '1',
          solution: {
            method: '1~2단락에서 "Excited"의 직접적인 원인을 찾는다.',
            steps: [
              '1단락: "Suddenly, it spotted a jug on a table in the garden."',
              '2단락: "Excited, the crow flew down and perched on the jug\'s rim."',
              '까마귀가 흥분한 것은 "The kettle (jar) on the garden table"를 발견했기 때문 → 정답 (1) a jug on a table.',
            ],
            tip: '"Excited" 바로 앞 문장에서 흥분한 원인(발견한 대상)을 찾습니다.',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes below to show the sequence of events that happened in the passage.\n' +
            '( ) The crow saw pebbles on the ground.\n' +
            '( ) The crow drank the water.\n' +
            "( ) The crow landed on the jug's rim.",
          answer:
            "The crow landed on the jug's rim = 1; The crow saw pebbles on the ground = 2; The crow drank the water = 3",
          solution: {
            method: '지문의 단락 순서(2단락 → 3단락 → 5단락)를 따라간다.',
            steps: [
              '2단락: "the crow flew down and perched on the jug\'s rim." → 1.',
              '3단락: "It looked around the garden and saw some small pebbles on the ground." → 2.',
              '5단락: "the crow dipped its beak into the water and took a long, refreshing drink." → 3.',
            ],
            tip: '사건의 순서는 지문의 단락이 전개되는 순서를 그대로 따라가면 됩니다.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 2,
          stem:
            'State two reasons why the crow could not reach the water in the jug with its beak.\n(i) ________\n(ii) ________',
          answer:
            '(i) The water level was very low.\n(ii) The jug was too deep.',
          solution: {
            method: '2단락에서 부리로 물에 닿을 수 없었던 두 가지 이유를 찾는다.',
            steps: [
              '2단락: "It looked inside and saw some water, but the water level was very low. The crow tried to reach the water with its beak, but it could not. The jug was too deep."',
              '이유 1: 물의 높이가 매우 낮았다(the water level was very low).',
              '이유 2: 항아리가 너무 깊었다(the jug was too deep).',
            ],
            tip: '"but" 뒤에 나오는 두 문장이 각각 (i), (ii)의 이유에 해당합니다.',
          },
        },
        {
          questionNo: '15',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word, (A) or (B), in the sentence below tells you that the crow worked hard without stopping? Circle either (A) or (B). Sentence: "The crow worked tirelessly (A), flying back and forth (B) between the ground and the jug."',
          options: [
            { label: 'A', text: 'tirelessly' },
            { label: 'B', text: 'forth' },
          ],
          answer: 'A',
          solution: {
            method: '"Worked hard without resting"는 의미와 같은 단어를 고른다.',
            steps: [
              '"tirelessly" = 지치지 않고/쉬지 않고 → "worked hard without stopping"과 정확히 일치.',
              '"back and forth"(왔다 갔다)는 움직임의 방향/패턴을 나타낼 뿐, "Without stopping / Without rest"을 직접 의미하지 않는다.',
              '따라서 정답은 (A) tirelessly.',
            ],
            tip: '"tirelessly"는 "Kept going without getting tired"라는 뜻으로, "without stopping"과 직접 연결됩니다.',
          },
        },
        {
          questionNo: '16',
          format: 'open',
          marks: 1,
          stem: 'What does the word "it" in line 14 refer to?',
          answer: 'It refers to the water (in the jug).',
          solution: {
            method: "Find the key noun in the sentence just before 'it'.",
            steps: [
              '해당 문장(4~5단락 경계): "After a long time, the water finally rose high enough for the crow to reach it."',
              "'it' refers to 'the water' that was mentioned in the sentence just before.",
              "In a complete sentence: \"'it' refers to the water.\"",
            ],
            tip: '대명사 it은 바로 앞 문장에서 가장 가까운 단수 사물 명사를 가리키는 경우가 많습니다.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem: 'What did the crow learn from solving the problem?',
          answer:
            'The crow learned that with patience and smart thinking, even difficult problems could be solved.',
          solution: {
            method: '마지막 단락의 마지막 문장에서 까마귀가 배운 점을 찾는다.',
            steps: [
              '마지막 단락: "It had learned that with patience and smart thinking, even difficult problems could be solved."',
              '까마귀가 배운 것은 "With patience and wise thinking, even difficult problems can be solved."는 점.',
              '지문의 문장을 그대로 옮겨 완전한 문장으로 답한다.',
            ],
            tip: '"learned that ~"의 ~ 부분이 바로 배운 교훈입니다.',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 2,
          stem:
            "Write the words that best describe the crow's feelings at different parts of the story. Use the words given in the box below.\n" +
            'Box: frustrated | proud\n' +
            'At the start of the story: ________\n' +
            'At the end of the story: ________',
          answer: 'At the start of the story: frustrated.  At the end of the story: proud.',
          solution: {
            method: '이야기의 처음과 끝에서 까마귀의 감정 변화를 확인한다.',
            steps: [
              '처음(1~2단락): "was getting tired and impatient", "tried to reach the water with its beak, but it could not" → 답답함/짜증 = frustrated.',
              '끝(마지막 단락): "it swelled with pride and satisfaction" → 자랑스러움 = proud.',
              '따라서 처음 = frustrated, 끝 = proud.',
            ],
            tip: '이야기의 시작과 끝에서 인물의 감정이 어떻게 변화했는지(좌절 → 자부심) 비교하는 문제입니다.',
          },
        },
      ],
    },
  ],
};

export default wa1HenryParkPrimaryEnglish2025;
