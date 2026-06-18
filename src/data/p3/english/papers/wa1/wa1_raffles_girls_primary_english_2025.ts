// =============================================================================
// src/data/p3/english/papers/wa1_raffles_girls_primary_english_2025.ts
// Raffles Girls' Primary School — Weighted Assessment 1 (2025) English Language — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 251–256 (시험지 표지 p.1–6)
// Total Time: 50 minutes / Total: 15 marks (Section A 7 + Section B 8)
// ★ 공식 정답표(p257) 기준 13문항 전부 100% 일치 확인됨.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1RafflesGirlsPrimaryEnglish2025: EnglishPaper = {
  meta: {
    school: "Raffles Girls' Primary School",
    year: 2025,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 15,
    sourcePages: 'pp.251–256 (paper pp.1–6)',
  },

  items: [
    // =========================================================================
    // Section A: Comprehension 1 (7 marks) — Q1–6
    // 지문: Lily와 반짝이는 빨간 구슬 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2025-secA',
      topic: 'ComprehensionOE',
      title: 'Section A: Comprehension 1 — The Found Marble',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'One sunny afternoon, Lily was walking home from school when she found a glittery, red marble lying on the sidewalk. It was just like something from her favourite toy collection. As she picked it up, she thought about how lucky she was to find it. Just then, a thought crossed her mind, "The person who has lost it must be very sad."\n\n' +
        'Lily decided to take the marble to the lost-and-found corner at school. She told her teacher, Mrs Lim, about it. Mrs Lim smiled and said, "You\'re showing great care, Lily." She was proud of Lily\'s remarkable deed.\n\n' +
        'The next day, a boy named Max came to the lost-and-found corner and asked about a red marble. It was his! He had been looking for it and was so happy to get it back. He also discovered that it was Lily who had found it.\n\n' +
        '"Thank you, Lily! You\'re awesome!" he said. Lily felt a warm feeling in her heart. She realised that doing something kind for someone made her very happy. She also learned that sharing joy with others can bring happiness as well.\n\n' +
        '(Adapted)',
      marks: 7,
      questions: [
        {
          questionNo: '1',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 1, what does the word "glittery" mean in the story? The word means ________.',
          options: [
            { label: '1', text: 'small and rough' },
            { label: '2', text: 'bright and shiny' },
            { label: '3', text: 'old and scratched' },
          ],
          answer: '2',
          solution: {
            method: '"glittery"의 의미를 문맥(빨간 구슬 묘사)에서 파악한다.',
            steps: [
              '"glittery, red marble"(반짝이는 빨간 구슬) — glittery는 빛나는/반짝이는 성질을 묘사.',
              '"bright and shiny" = 밝고 반짝이는 → glittery와 정확히 일치.',
              '"small and rough"(작고 거친)/"old and scratched"(오래되고 긁힌)은 반짝임과 무관 → 정답 (2). (공식 정답표 확인됨)',
            ],
            tip: '"glitter"(반짝임)에서 파생된 "glittery"는 빛이 반짝거리는 외모를 나타냅니다.',
          },
        },
        {
          questionNo: '2',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 2, which word has the same meaning as "kindness"?',
          answer: 'care',
          solution: {
            method: '"kindness"(친절함)과 같은 뜻의 단어를 2단락에서 찾는다.',
            steps: [
              '2단락: "You\'re showing great care, Lily." — Mrs Lim이 Lily의 행동을 칭찬함.',
              '"care" = 배려/돌봄 → kindness(친절함)와 의미가 통한다.',
              '따라서 답은 care. (공식 정답표 확인됨)',
            ],
            tip: '"care"(배려)와 "kindness"(친절)은 타인을 위하는 마음이라는 공통된 의미를 가집니다.',
          },
        },
        {
          questionNo: '3',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 and 3, tick "True" or "False": Mrs Lim praised Lily for her kind deed.',
          answer: 'True',
          solution: {
            method: '2단락에서 Mrs Lim의 반응을 확인한다.',
            steps: [
              '2단락: "Mrs Lim smiled and said, \'You\'re showing great care, Lily.\' She was proud of Lily\'s remarkable deed."',
              'Mrs Lim이 "great care"라고 칭찬하고 "proud"(자랑스러워함) → 친절한 행동을 칭찬한 것이 맞다.',
              '따라서 True. (공식 정답표 확인됨)',
            ],
            tip: '"smiled", "you\'re showing great care", "proud"는 모두 칭찬의 표현입니다.',
          },
        },
        {
          questionNo: '4',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 and 3, tick "True" or "False": Max was glad to have found his lost marble.',
          answer: 'True',
          solution: {
            method: '3단락에서 Max가 구슬을 돌려받은 후의 감정을 확인한다.',
            steps: [
              '3단락: "He had been looking for it and was so happy to get it back."',
              '"so happy"(매우 기뻤다) → 돌려받아서 기뻐했다는 의미.',
              '"glad"(기쁜)는 "happy"와 같은 의미 → 따라서 True. (공식 정답표 확인됨)',
            ],
            tip: '"happy to get it back"과 "glad to have found"는 같은 의미의 표현입니다.',
          },
        },
        {
          questionNo: '5',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 and 3, tick "True" or "False": Lily decided to keep the marble for her collection.',
          answer: 'False',
          solution: {
            method: '2단락에서 Lily가 구슬로 무엇을 했는지 확인한다.',
            steps: [
              '2단락: "Lily decided to take the marble to the lost-and-found corner at school."',
              'Lily는 구슬을 본인 컬렉션에 넣지 않고 "분실물 코너"에 가져갔다.',
              '"decided to keep it for her collection"(자신의 컬렉션에 보관하기로)는 거짓 → False. (공식 정답표 확인됨)',
            ],
            tip: '1단락의 생각(컬렉션과 비슷한 것이라 운이 좋다고 생각함)과 실제 행동(분실물 코너에 제출)을 혼동하지 마세요.',
          },
        },
        {
          questionNo: '6',
          format: 'open',
          marks: 2,
          stem:
            'From the last paragraph, list two things that Lily learnt after having done the remarkable deed.\n(i) ________\n(ii) ________',
          answer:
            '(i) Lily learnt that doing something kind for someone made her very happy.\n(ii) Lily learnt that sharing joy with others can bring happiness as well.',
          solution: {
            method: '마지막 단락에서 Lily가 배운 두 가지를 찾는다.',
            steps: [
              '마지막 단락: "She realised that doing something kind for someone made her very happy. She also learned that sharing joy with others can bring happiness as well."',
              '(i) 누군가를 위해 친절한 일을 하는 것이 자신을 매우 행복하게 만들었다.',
              '(ii) 기쁨을 다른 사람과 나누는 것도 행복을 가져올 수 있다.',
            ],
            tip: '"She realised that ~" and "She also learned that ~" — 두 문장이 각각 (i), (ii)에 해당합니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Comprehension 2 (8 marks) — Q7–13
    // 지문: Fox and Alligator (교활한 여우와 악어의 농사 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2025-secB',
      topic: 'ComprehensionOE',
      title: 'Section B: Comprehension 2 — Fox and Alligator',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'Long ago, there lived a cunning fox and his good-natured friend, Alligator. Food was often scarce and they never had enough to eat. One day, they decided to grow their own. First, they planted some corn. Alligator asked, "How shall we share the corn?"\n\n' +
        '"You have all the parts that grow under the ground and I will take the parts that are growing above the ground," said Fox.\n\n' +
        'When they pulled out the plants, Alligator saw that only roots grew under the ground. The corn grew above the ground. Immediately, he realised he was tricked. Then, the cunning fox laughed and happily ate the corn.\n\n' +
        'Next, they decided to grow potatoes. When it was time to harvest the crop, Alligator said, "This time, I\'ll take the parts that grow above the ground." Fox agreed readily. When they dug up the plants, Alligator was upset to see all the potatoes growing beneath the ground. Fox laughed out loud and ate all the potatoes.\n\n' +
        'Then, Fox decided that they should grow sugarcane. He was just about to promise Alligator both the roots and leaves when Alligator came up with a good way to share the harvest fairly. Alligator suggested they split it equally. Feeling sorry, Fox agreed with Alligator.\n\n' +
        'From then on, Fox and Alligator always had plenty of food to eat and they lived happily ever after.\n\n' +
        '(Adapted from http://www.bbc.co.uk/cbeebies/stories/world)',
      marks: 8,
      questions: [
        {
          questionNo: '7',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 1, what was the relationship between Fox and Alligator?\nThey were ________.',
          answer: 'friends',
          solution: {
            method: '1단락에서 Fox와 Alligator의 관계를 찾는다.',
            steps: [
              '1단락: "there lived a cunning fox and his good-natured friend, Alligator."',
              'Alligator는 Fox의 "friend"(친구)로 소개된다.',
              '따라서 "They were friends." (공식 정답표 확인됨)',
            ],
            tip: '"his good-natured friend, Alligator"에서 관계(friend)를 직접 찾습니다.',
          },
        },
        {
          questionNo: '8',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 1, the word "scarce" means ________. Tick your chosen answer (Tick one only).',
          options: [
            { label: '1', text: 'unsuitable' },
            { label: '2', text: 'insufficient' },
            { label: '3', text: 'distasteful' },
          ],
          answer: '2',
          solution: {
            method: '"never had enough to eat"(충분히 먹지 못했다)라는 결과로 scarce의 의미를 추론한다.',
            steps: [
              '1단락: "Food was often scarce and they never had enough to eat."',
              '"never had enough to eat" → 음식이 부족했다는 의미.',
              '"scarce" = 부족한/드문 → "insufficient"(불충분한)와 정확히 일치. (공식 정답표 확인됨)',
            ],
            tip: '뒤따르는 결과 "never had enough to eat"이 scarce의 의미를 알려줍니다.',
          },
        },
        {
          questionNo: '9',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in paragraphs 3 and 4.\n' +
            '( ) Fox laughed and happily ate up all the corn.\n' +
            '( ) Alligator and Fox harvested the potatoes together.\n' +
            '( ) Alligator found out that he only had the roots of the corn plant.',
          answer:
            'Alligator found out that he only had the roots of the corn plant = 2; Fox laughed and happily ate up all the corn = 3; Alligator and Fox harvested the potatoes together = 1',
          solution: {
            method: '3단락(옥수수)과 4단락(감자)의 사건 순서를 따라간다.',
            steps: [
              '⚠ 정답표: 2, 3, 1 순서. 즉 "Fox laughed/ate corn"=2, "Alligator/Fox harvested potatoes"=3, "Alligator found out"=1이 아니라 보기의 첫째/둘째/셋째에 해당하는 숫자가 2, 3, 1이다.',
              '보기 순서대로: (Fox laughed/ate corn)=2, (Alligator/Fox harvested potatoes)=3, (Alligator found out only roots)=1.',
              '즉: 가장 먼저 일어난 것은 "Alligator found out he only had roots"(1번), 그 다음 "Fox laughed and ate the corn"(2번), 마지막이 "Alligator and Fox harvested potatoes"(3번).',
            ],
            tip:
              '3단락: 옥수수 수확 → Alligator가 뿌리만 갖게 됨(①) → Fox 웃으며 옥수수 먹음(②). 4단락: 감자 수확 → Alligator가 "위 부분"이라 감자를 못 가짐(③). 따라서 "Fox laughed/ate corn"=2, "potatoes together"=3, "roots of corn"=1.',
          },
        },
        {
          questionNo: '10',
          format: 'open',
          marks: 1,
          stem:
            'Which three-word phrase in paragraph 5 tells you that Alligator thought of a solution?',
          answer: 'came up with',
          solution: {
            method: '"생각해냈다/해결책을 생각해냈다"는 의미의 세 단어 구를 5단락에서 찾는다.',
            steps: [
              '5단락: "Alligator came up with a good way to share the harvest fairly."',
              '"came up with" = (아이디어/해결책을) 생각해내다 → 세 단어.',
              '따라서 답은 came up with. (공식 정답표 확인됨)',
            ],
            tip: '"came up with"는 "생각해내다/좋은 방법을 떠올리다"를 뜻하는 세 단어 구동사입니다.',
          },
        },
        {
          questionNo: '11',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 5, what did Fox and Alligator decide to do with the new crop that they were going to grow? Tick your chosen answer (Tick one only).',
          options: [
            { label: '1', text: 'They were going to divide the crop equally.' },
            { label: '2', text: 'They were going to have one part of the plant each.' },
            { label: '3', text: 'They were going to separate the roots and the leaves.' },
          ],
          answer: '1',
          solution: {
            method: '5단락에서 사탕수수 수확을 어떻게 나누기로 했는지 확인한다.',
            steps: [
              '5단락: "Alligator suggested they split it equally. Feeling sorry, Fox agreed with Alligator."',
              '"split it equally" = 똑같이 나누다 → "divide the crop equally"와 같은 의미.',
              '따라서 정답은 (1). (공식 정답표 확인됨)',
            ],
            tip: '"split equally"와 "divide equally"는 똑같이 나누다라는 동의어 표현입니다.',
          },
        },
        {
          questionNo: '12',
          format: 'open',
          marks: 1,
          stem: 'What does the word "it" in paragraph 5 refer to?\nThe word "it" refers to ________.',
          answer: 'the sugarcane',
          solution: {
            method: '"it" 바로 앞에 언급된 명사를 5단락에서 찾는다.',
            steps: [
              '5단락: "Then, Fox decided that they should grow sugarcane. ... Alligator suggested they split it equally."',
              '"it"은 바로 앞에 언급된 "the sugarcane"(사탕수수/수확물)을 가리킨다.',
              '따라서 "The word \'it\' refers to the sugarcane." (공식 정답표 확인됨)',
            ],
            tip: '대명사 it은 바로 앞 문장의 핵심 단수 명사를 가리킵니다.',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 2,
          stem:
            'Answer question 13 in a complete sentence. Based on paragraph 6, list two things that Fox and Alligator experienced when they agreed to be fair in sharing the crop they had harvested.',
          answer:
            'Fox and Alligator always had plenty of food to eat, and they lived happily ever after.',
          solution: {
            method: '마지막(6) 단락에서 공평하게 나눈 후의 결과 두 가지를 찾는다.',
            steps: [
              '6단락: "Fox and Alligator always had plenty of food to eat and they lived happily ever after."',
              '결과 1: 항상 충분한 음식이 생겼다(always had plenty of food to eat).',
              '결과 2: 행복하게 살게 되었다(lived happily ever after).',
              '두 가지를 모두 포함한 완전한 문장으로 답한다. (공식 정답표 확인됨)',
            ],
            tip: '"and"로 연결된 두 결과를 각각 (i), (ii)에 해당하는 내용으로 정리합니다.',
          },
        },
      ],
    },
  ],
};

export default wa1RafflesGirlsPrimaryEnglish2025;
