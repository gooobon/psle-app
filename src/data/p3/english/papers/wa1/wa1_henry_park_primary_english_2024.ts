// =============================================================================
// src/data/p3/english/papers/wa1_henry_park_primary_english_2024.ts
// Henry Park Primary School — 2024 Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 53–59 (시험지 표지 p.1–7)
// Duration: 40 minutes / Total: 20 marks
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1HenryParkPrimaryEnglish2024: EnglishPaper = {
  meta: {
    school: 'Henry Park Primary School',
    year: 2024,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.53–59 (paper pp.1–7)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar Cloze — Passage A (4 x 1 mark)
    // 대명사(personal pronouns) 채우기. 보기: he, I, she, they, we, you
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2024-secA-passageA',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage A',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: he | I | she | they | we | you',
      passage:
        'It was the first day of the school holidays. Max and his sister, Sarah, were at the cinema. They wanted to watch a movie together.\n\n' +
        '"Which movie shall (1) ________ watch?" asked Max eagerly.\n\n' +
        '"Do (2) ________ want to watch the latest movie, \'Wonka\'?" suggested Sarah. "My friends watched it yesterday and (3) ________ liked it."\n\n' +
        'Max agreed and (4) ________ nodded. They joined the queue at the counter to buy the tickets.',
      marks: 4,
      questions: [
        {
          questionNo: '1',
          format: 'fib',
          marks: 1,
          stem: '"Which movie shall (1) ________ watch?" asked Max eagerly.',
          answer: 'we',
          solution: {
            method: '말하는 사람과 듣는 사람을 모두 포함하는 주어 대명사를 고른다.',
            steps: [
              'Max가 자신과 Sarah 두 사람이 "함께" 볼 영화를 묻고 있다.',
              '화자(Max) + 청자(Sarah)를 함께 가리키는 1인칭 복수 주어는 "we".',
              '"shall we watch?"는 함께 무엇을 할지 제안할 때 쓰는 자연스러운 표현.',
            ],
            tip: '"shall we ~?"는 "우리 ~할까?"라는 권유/제안 표현으로 자주 출제됩니다.',
          },
        },
        {
          questionNo: '2',
          format: 'fib',
          marks: 1,
          stem: '"Do (2) ________ want to watch the latest movie, \'Wonka\'?" suggested Sarah.',
          answer: 'you',
          solution: {
            method: 'Sarah가 상대방(Max)에게 직접 묻는 상황의 주어를 찾는다.',
            steps: [
              'Sarah가 Max에게 "~하고 싶니?"라고 직접 물어보고 있다.',
              '듣는 상대 한 사람을 가리키는 2인칭 주어는 "you".',
              '"Do you want ~?"는 상대의 의향을 묻는 기본 문형.',
            ],
            tip: '상대에게 직접 질문할 때 동사 do와 어울리는 주어는 보통 you입니다.',
          },
        },
        {
          questionNo: '3',
          format: 'fib',
          marks: 1,
          stem: '"My friends watched it yesterday and (3) ________ liked it."',
          answer: 'they',
          solution: {
            method: '앞에 나온 복수 명사(My friends)를 대신하는 대명사를 고른다.',
            steps: [
              '바로 앞 주어가 "My friends"(복수 사람).',
              '복수의 사람을 대신하는 주어 대명사는 "they".',
              '"they liked it"으로 문장이 자연스럽게 이어진다.',
            ],
            tip: '대명사는 바로 앞에 나온 명사가 누구/무엇인지를 먼저 확인하고 고릅니다.',
          },
        },
        {
          questionNo: '4',
          format: 'fib',
          marks: 1,
          stem: 'Max agreed and (4) ________ nodded.',
          answer: 'he',
          solution: {
            method: '문장의 주어가 남자 한 명(Max)임을 확인한다.',
            steps: [
              '"Max agreed and ___ nodded." — 고개를 끄덕인 사람은 Max.',
              'Max는 남자 한 명이므로 3인칭 단수 남성 주어 "he".',
              '남은 보기 중 he만 사용되지 않았으므로 he가 정답(단어는 ONCE only).',
            ],
            tip: '"Use each word ONCE only" 규칙이 있으면, 마지막 빈칸은 남은 단어로 검증할 수 있습니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section A: Grammar Cloze — Passage B (4 x 1 mark)
    // 동사 형태(verb forms) 채우기. 보기: grow, grows, grew, growing, grown, was growing
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2024-secA-passageB',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage B',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: grow | grows | grew | growing | grown | was growing',
      passage:
        'Tim is a good gardener. He enjoys (5) ________ sunflowers in his garden.\n\n' +
        'One morning, he planted some sunflower seeds given by a kind old lady. The next day, he exclaimed, "Alicia! The sunflowers have (6) ________ so tall!"\n\n' +
        '"How did they (7) ________ so quickly?" Alicia asked.\n\n' +
        'Tim wondered how the sunflowers (8) ________ overnight. He was amazed. Then he remembered the old woman telling him that they were magic seeds.',
      marks: 4,
      questions: [
        {
          questionNo: '5',
          format: 'fib',
          marks: 1,
          stem: 'He enjoys (5) ________ sunflowers in his garden.',
          answer: 'growing',
          solution: {
            method: 'enjoy 뒤에는 동명사(-ing)가 온다는 규칙을 적용한다.',
            steps: [
              '동사 enjoy는 목적어로 동명사(-ing)를 취한다 (enjoy doing).',
              '따라서 "enjoys growing"이 올바른 형태.',
              'to-부정사(to grow)는 enjoy와 함께 쓰지 않는다.',
            ],
            tip: 'enjoy, finish, keep, avoid 뒤에는 항상 -ing 형태가 옵니다.',
          },
        },
        {
          questionNo: '6',
          format: 'fib',
          marks: 1,
          stem: 'The sunflowers have (6) ________ so tall!',
          answer: 'grown',
          solution: {
            method: '"have + 과거분사" 현재완료 형태를 만든다.',
            steps: [
              '조동사 "have"가 앞에 있으므로 뒤에는 과거분사가 필요.',
              'grow의 과거분사는 grown (grow–grew–grown).',
              '"have grown so tall" = 지금 보니 (이미) 그만큼 자라 있다.',
            ],
            tip: 'have/has 뒤에는 동사의 과거분사(3단 변화 세 번째 형태)가 옵니다.',
          },
        },
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: '"How did they (7) ________ so quickly?" Alicia asked.',
          answer: 'grow',
          solution: {
            method: '조동사 did 뒤에는 동사원형이 온다는 규칙을 적용한다.',
            steps: [
              '의문문 "How did they ___?"에서 시제는 이미 did가 담당.',
              'did 뒤에는 항상 동사원형(grow)이 온다.',
              'grew(과거형)는 did와 함께 쓰지 않는다.',
            ],
            tip: 'do/does/did가 들어간 문장의 본동사는 반드시 동사원형입니다.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'Tim wondered how the sunflowers (8) ________ overnight.',
          answer: 'grew',
          solution: {
            method: '과거 사건을 서술하는 단순과거 동사를 고른다.',
            steps: [
              '문장 전체가 과거 이야기(wondered, planted 등 과거시제)이다.',
              '주어 "the sunflowers"는 복수이므로 "was growing"(단수)은 부적합.',
              '밤사이 자란 일을 나타내는 단순과거형 "grew"가 정답 (남은 단어로도 확인 가능).',
            ],
            tip: '주어가 복수면 was가 아니라 were를 쓰며, 단순한 과거 사실은 단순과거형으로 표현합니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Sentence Combining (2 x 1 mark) — Q9, Q10
    // =========================================================================
    {
      kind: 'single',
      id: 'hp2024-q9',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 9,
      marks: 1,
      stem:
        'Rewrite the two sentences as one, beginning with the given word, without changing the meaning.\n' +
        'Jason was cycling at the park. Jason saw his teacher.\n' +
        'When ________________________________________.',
      answer: 'When Jason was cycling at the park, he saw his teacher.',
      solution: {
        method: '"When"으로 시작하는 시간 부사절로 두 문장을 연결한다.',
        steps: [
          '두 사건이 같은 시간에 일어났음을 "When"으로 표현한다.',
          '첫 문장을 종속절로: "When Jason was cycling at the park,".',
          '두 번째 문장을 주절로 잇되, 반복되는 Jason은 대명사 he로 바꾼다: "he saw his teacher".',
          '완성: "When Jason was cycling at the park, he saw his teacher."',
        ],
        tip: '같은 사람이 반복되면 두 번째는 대명사(he/she)로 바꿔 자연스럽게 만듭니다. 종속절 뒤에는 쉼표(,)를 찍습니다.',
      },
    },
    {
      kind: 'single',
      id: 'hp2024-q10',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 10,
      marks: 1,
      stem:
        'Rewrite the two sentences as one, beginning with the given word, without changing the meaning.\n' +
        'Ali likes chocolate milk. Juliet also likes chocolate milk.\n' +
        'Both ________________________________________.',
      answer: 'Both Ali and Juliet like chocolate milk.',
      solution: {
        method: '"Both ... and ..." 구문으로 두 주어를 묶는다.',
        steps: [
          '두 사람이 같은 것을 좋아하므로 "Both A and B" 형태로 합친다.',
          '주어가 "Both Ali and Juliet"(복수)가 되면 동사는 likes → like로 바꾼다.',
          '완성: "Both Ali and Juliet like chocolate milk."',
        ],
        tip: '"Both A and B"는 항상 복수 취급이므로 동사에 -s를 붙이지 않습니다 (like, not likes).',
      },
    },

    // =========================================================================
    // Section C: Comprehension (10 marks) — Q11–19
    // 지문: 자연공원의 Amelia와 Ben, 그리고 kingfisher 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2024-secC-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section C: Comprehension — The Nature Park',
      instructions: 'Read the passage below and answer questions 11 to 19.',
      passage:
        'It was a cool breezy day. The family was at the nature park. As soon as they entered the park, they could hear birds chirping and leaves rustling. The children saw a monitor lizard swimming lazily in the water.\n\n' +
        '"I can\'t wait to see a crocodile," Amelia squealed, jumping up and down.\n\n' +
        'Her brother, Ben, covered his ears and frowned. "Don\'t scream, Amelia. Dad told us not to frighten the birds or destroy their nests," he reminded her. He hoped to see a kingfisher.\n\n' +
        'Suddenly, Ben stopped walking. He had spotted a bird on the branch of a tree. He looked through his binoculars. Then he whispered, "It\'s a kingfisher."\n\n' +
        'Amelia gripped his arm and squinted. "Where?" she yelled. She had forgotten what their father had told them. Startled, the bird flapped its wings and flew off. When Amelia realised what she had done, tears welled up in her eyes. She wiped them away and said softly, "I\'m sorry, Ben." She knew that she had frightened it away.\n\n' +
        'Ben felt disappointed, but he gave his sister a hug to comfort her. Kindly, he said, "It\'s all right, Amelia."\n\n' +
        'Suddenly, Amelia tapped her brother on his shoulder. She kept very quiet and did not make a sound. She pointed to something shiny in the water. Ben and Amelia stared at the water. As fast as lightning, a kingfisher dived into the water and caught a fish. Ben was thrilled!\n\n' +
        '"Well done, little sister," Ben said. Amelia smiled proudly at her big brother.',
      marks: 10,
      questions: [
        {
          questionNo: '11',
          format: 'mcq',
          marks: 1,
          stem:
            'The family heard sounds of ________ and leaves rustling when they entered the park. Choose the correct answer and write its number (1, 2 or 3) in the bracket.',
          options: [
            { label: '1', text: 'wind howling' },
            { label: '2', text: 'birds chirping' },
            { label: '3', text: 'water splashing' },
          ],
          answer: '2',
          solution: {
            method: '지문에서 "leaves rustling"과 함께 언급된 소리를 그대로 찾는다.',
            steps: [
              '첫 단락: "they could hear birds chirping and leaves rustling."',
              '"leaves rustling"과 짝지어진 소리는 "birds chirping".',
              '따라서 정답은 (2) birds chirping.',
            ],
            tip: '빈칸 채우기 MCQ는 지문에서 같은 문장을 찾아 그대로 대조하면 가장 정확합니다.',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem: 'Ben wanted to see a ________ that day. Write its number (1, 2 or 3) in the bracket.',
          options: [
            { label: '1', text: 'crocodile' },
            { label: '2', text: 'kingfisher' },
            { label: '3', text: 'monitor lizard' },
          ],
          answer: '2',
          solution: {
            method: '각 인물이 무엇을 보고 싶어 했는지 구분한다.',
            steps: [
              '지문: "He hoped to see a kingfisher." (He = Ben)',
              'crocodile을 보고 싶어 한 사람은 Amelia이다.',
              'monitor lizard는 이미 물에서 본 동물.',
              '따라서 Ben이 보고 싶어 한 것은 (2) kingfisher.',
            ],
            tip: '인물별로 원한 대상이 다를 때는 누가(he/she) 한 말·생각인지 꼭 구분하세요.',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes to show the sequence of events that happened in the passage.\n' +
            '( ) Ben forgave Amelia for frightening the bird away.\n' +
            '( ) Ben reminded Amelia about their Dad\'s instructions.\n' +
            '( ) Ben praised Amelia for being quiet and not frightening the bird.',
          answer:
            'Ben forgave Amelia for frightening the bird away = 2; Ben reminded Amelia about their Dad\'s instructions = 1; Ben praised Amelia for being quiet and not frightening the bird = 3',
          solution: {
            method: '사건이 지문에 등장한 순서대로 번호를 매긴다.',
            steps: [
              '먼저: 공원 입장 직후 Ben이 "Dad told us not to frighten the birds..."라며 아빠의 당부를 상기시킨다 → 1.',
              '다음: 새를 쫓아낸 뒤 Ben이 "It\'s all right, Amelia."라며 용서한다 → 2.',
              '마지막: Amelia가 조용히 해서 물총새를 볼 수 있게 되자 "Well done, little sister."라고 칭찬한다 → 3.',
            ],
            tip: '순서 문제는 지문을 위에서 아래로 따라가며 사건이 나오는 위치를 표시하면 헷갈리지 않습니다.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick ("True" or "False"): Amelia spotted the kingfisher first.',
          answer: 'False',
          solution: {
            method: '누가 먼저 새를 발견했는지 지문에서 확인한다.',
            steps: [
              '지문: "Suddenly, Ben stopped walking. He had spotted a bird... \'It\'s a kingfisher.\'"',
              '물총새를 처음 발견한 사람은 Ben이다.',
              '따라서 "Amelia가 먼저 발견했다"는 거짓 → False.',
            ],
            tip: 'True/False 문제는 문장 속 핵심 단어(여기서는 "first")가 지문과 맞는지 따져봅니다.',
          },
        },
        {
          questionNo: '15',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick ("True" or "False"): Amelia yelled loudly and frightened the kingfisher away.',
          answer: 'True',
          solution: {
            method: 'Amelia의 행동과 그 결과를 지문에서 확인한다.',
            steps: [
              '지문: "\'Where?\' she yelled." — Amelia가 큰 소리를 냈다.',
              '이어서 "Startled, the bird flapped its wings and flew off."',
              'Amelia의 고함 때문에 새가 놀라 날아갔으므로 → True.',
            ],
            tip: '원인(고함)과 결과(새가 날아감)가 지문에 모두 나오면 True로 판단합니다.',
          },
        },
        {
          questionNo: '16',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word, (A) gripped or (B) squinted, tells you that Amelia tried to strain her eyes to see clearly? Circle either (A) or (B). Sentence: "Amelia gripped his arm and squinted."',
          options: [
            { label: 'A', text: 'gripped' },
            { label: 'B', text: 'squinted' },
          ],
          answer: 'B',
          solution: {
            method: '두 단어의 뜻을 비교해 "눈을 가늘게 떠 자세히 보려 함"에 맞는 것을 고른다.',
            steps: [
              'gripped = 꽉 붙잡다 (손의 동작) → 보는 것과 관련 없음.',
              'squinted = 눈을 가늘게 뜨다 (잘 보려고 애쓸 때의 동작).',
              '눈을 애써 집중하는 의미는 (B) squinted.',
            ],
            tip: '단어 선택 문제는 각 단어가 가리키는 신체 동작/의미를 떠올려 질문의 뜻과 연결합니다.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem: 'What does the word "them" in line 13 refer to?',
          answer: 'the tears (that welled up in Amelia\'s eyes)',
          solution: {
            method: '대명사 them 바로 앞에 나온 복수 명사를 찾는다.',
            steps: [
              '해당 문장: "tears welled up in her eyes. She wiped them away".',
              '"wiped them away"에서 닦아낸 대상은 바로 앞의 "tears".',
              '따라서 them = the tears (Amelia의 눈에 고인 눈물).',
            ],
            tip: '지시어(them/it/they) 문제는 그 단어 바로 앞 문장에서 가장 가까운 명사를 먼저 확인합니다.',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 2,
          stem:
            'Name two things that their father advised them not to do when observing birds.\n(a) ________\n(b) ________',
          answer: '(a) frighten the birds  (b) destroy their nests',
          solution: {
            method: '아빠의 당부가 적힌 문장을 찾아 두 가지를 나눈다.',
            steps: [
              '지문: "Dad told us not to frighten the birds or destroy their nests".',
              '"or"로 두 가지 금지 사항이 연결되어 있다.',
              '(a) 새를 놀라게 하지 말 것 / (b) 둥지를 부수지 말 것.',
            ],
            tip: '"two things"를 요구하면 지문 한 문장 안의 "and/or"로 묶인 두 항목을 각각 답으로 나누세요.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem:
            'Write the words that best describe Amelia\'s behaviour at different parts of the story. Use the words given in the box (calm | excited).\n' +
            'At the start of the story: ________\n' +
            'At the end of the story: ________',
          answer: 'At the start: excited;  At the end: calm',
          solution: {
            method: '이야기 처음과 끝에서 Amelia의 행동 묘사를 찾아 보기 단어와 연결한다.',
            steps: [
              '처음: "Amelia squealed, jumping up and down." → 신난 모습 = excited.',
              '끝: "She kept very quiet and did not make a sound." → 차분한 모습 = calm.',
              '따라서 시작=excited, 끝=calm.',
            ],
            tip: '인물의 성격/기분 문제는 그 사람이 "무엇을 했는지(행동)"를 근거로 형용사를 고릅니다.',
          },
        },
      ],
    },
  ],
};

export default wa1HenryParkPrimaryEnglish2024;
