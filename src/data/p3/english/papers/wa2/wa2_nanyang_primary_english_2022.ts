// =============================================================================
// src/data/p3/english/papers/wa2_nanyang_primary_english_2022.ts
// Nanyang Primary School — 2022 Term 2 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 281–287 (시험지 표지 p.1–7)
// Duration: 40 minutes / Total: 20 marks
// ★ 공식 정답표(p289-290) 기준 19문항 전부 100% 일치 확인됨.
// 구성: A문법(3) B어휘(3) C인칭대명사클로즈(3) D교정(3) E독해(8) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa2NanyangPrimaryEnglish2022: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2022,
    assessment: 'Term 2 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.281–287 (paper pp.1–7)',
  },

  items: [
    // (A) Grammar Q1-3
    {
      kind: 'single', id: 'ny22wa2-q1', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 1, marks: 1,
      stem: 'When Tom ________ home, he decided to take a nap.',
      options: [{ label: '1', text: 'reach' }, { label: '2', text: 'reaches' }, { label: '3', text: 'reached' }, { label: '4', text: 'is reaching' }],
      answer: '3',
      solution: { method: '"When" + 과거 문맥에 맞는 시제를 고른다.', steps: ['"decided to take a nap"(과거) → 도착도 같은 과거 시점.', '"reached" → 정답 (3).'], tip: '"When Tom reached home"은 집에 도착했을 때라는 과거 표현입니다.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q2', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 2, marks: 1,
      stem: 'Mother bought ________ flour to bake a cake.',
      options: [{ label: '1', text: 'little' }, { label: '2', text: 'some' }, { label: '3', text: 'much' }, { label: '4', text: 'many' }],
      answer: '2',
      solution: { method: '"flour"(불가산 명사)에 맞는 수량사를 고른다.', steps: ['flour는 불가산 → many 제외.', '"some" = 얼마간/약간 → 긍정문에서 불가산 명사와 함께 자연스럽다 → 정답 (2).'], tip: '"some flour"처럼 긍정문에서 불가산 명사와 함께 some을 씁니다.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q3', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 3, marks: 1,
      stem: '"________ book here belongs to my brother," said Ahmad.',
      options: [{ label: '1', text: 'This' }, { label: '2', text: 'That' }, { label: '3', text: 'These' }, { label: '4', text: 'Those' }],
      answer: '1',
      solution: { method: '"book"(단수) + "here"(가까운 곳)를 본다.', steps: ['"book"은 단수 → This/That 중 하나.', '"here"(여기) = 가까운 곳 → This → 정답 (1).'], tip: '"here"(여기에 있는)는 가까운 거리 → this/these.' },
    },
    // (B) Vocabulary Q4-6
    {
      kind: 'single', id: 'ny22wa2-q4', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 4, marks: 1,
      stem: 'The bald eagle ________ down from the sky to catch its prey.',
      options: [{ label: '1', text: 'soared' }, { label: '2', text: 'stepped' }, { label: '3', text: 'dropped' }, { label: '4', text: 'swooped' }],
      answer: '4',
      solution: { method: '독수리가 먹이를 잡기 위해 "plunging down steeply" 동작을 나타내는 동사를 고른다.', steps: ['"down from the sky to catch its prey"(하늘에서 먹이를 잡으러 아래로) → 급강하.', '"swooped" = 급강하하다 → 정확히 일치 → 정답 (4).'], tip: '"swoop down"은 새·비행기가 빠르게 아래로 급강하하는 동작입니다.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q5', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 5, marks: 1,
      stem: 'Vincent van Gogh was a ________ painter whose works are exhibited around the world.',
      options: [{ label: '1', text: 'smart' }, { label: '2', text: 'famous' }, { label: '3', text: 'resourceful' }, { label: '4', text: 'quick-witted' }],
      answer: '2',
      solution: { method: '"displayed all around the world"는 사실에 맞는 형용사를 고른다.', steps: ['"works are exhibited around the world"(작품이 전 세계에 전시됨) → 세계적으로 알려진.', '"famous" = 유명한 → 정확히 일치 → 정답 (2).'], tip: '전 세계 전시 = 세계적 명성 = famous.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q6', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 6, marks: 1,
      stem: 'The goat is running away as fast as it can from its ________.',
      options: [{ label: '1', text: 'prey' }, { label: '2', text: 'victim' }, { label: '3', text: 'target' }, { label: '4', text: 'predator' }],
      answer: '4',
      solution: { method: '"a goat that is running away"를 쫓는 존재를 나타내는 단어를 고른다.', steps: ['"running away from its ___" → 염소를 잡으려는 포식자.', '"predator" = 포식자 → 정확히 일치 → 정답 (4).'], tip: '먹이(prey/goat)가 도망치는 대상은 포식자(predator)입니다.' },
    },
    // (C) Grammar Cloze – Pronouns Q7-9
    {
      kind: 'set',
      id: 'ny22wa2-secC',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Personal Pronouns',
      instructions: 'Box: (A) her  (B) I  (C) me  (D) my  (E) we  (F) you',
      passage: 'I arrived home one day to find my sister sitting at the kitchen table, crying.\n\n"Sally, what\'s wrong?" (7) ________ asked.\n\n"Nothing!" she snarled.\n\n"Then why are (8) ________ crying?" I said. She lifted up her fist and banged it on the table.\n\n"Go away and leave (9) ________ alone!" she yelled. It was at this moment that I decided to give her some time to cool down.',
      marks: 3,
      questions: [
        { questionNo: '7', format: 'fib', marks: 1, stem: '"Sally, what\'s wrong?" (7) ________ asked.', answer: 'B',
          solution: { method: '화자 자신("I")이 물었다.', steps: ['서술자(화자)가 Sally에게 물음 → I.', '보기에서 I는 (B) → 정답 (B).'], tip: '화자 자신이 말하는 주어는 I입니다.' } },
        { questionNo: '8', format: 'fib', marks: 1, stem: '"Then why are (8) ________ crying?" I said.', answer: 'F',
          solution: { method: '"the speaker asking Sally directly"의 주어를 고른다.', steps: ['Sally(상대방)에게 "Why are you crying?"라고 물음 → you.', '보기에서 you는 (F) → 정답 (F).'], tip: '상대방에게 직접 묻는 주어는 you입니다.' } },
        { questionNo: '9', format: 'fib', marks: 1, stem: '"Go away and leave (9) ________ alone!" she yelled.', answer: 'C',
          solution: { method: '"leave me alone"는 말의 목적어를 고른다.', steps: ['Sally가 화자(나)에게 "leave me (myself) alone"고 함.', 'Sally가 "I (the speaker)"에게 말하는 것이므로 목적어는 "me (the object form of I)".', '보기에서 me는 (C) → 정답 (C).'], tip: '"leave me alone"은 나를 혼자 내버려 두라는 표현입니다.' } },
      ],
    },
    // (D) Editing Q10-12
    {
      kind: 'set',
      id: 'ny22wa2-secD',
      topic: 'Editing',
      title: '(D) Editing for Spelling',
      instructions: 'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage: 'The Venus Flytrap is a carnivorous plant that eats small insects. It (10) [leetle] grows in soil that has nitrogen. It gets its nitrogen from the insects it traps.\n\nThe Venus Flytrap can snap shut very (11) [quikly]. When an insect crawls (12) [leefs] along the and touches any hair on them, the trap will snap close within twenty seconds.\n\nThe Venus Flytrap is a fascinating plant indeed.',
      marks: 3,
      questions: [
        { questionNo: '10', format: 'editing', marks: 1, stem: 'grows in soil that has [leetle] nitrogen.', answer: 'little',
          solution: { method: '"very few / hardly any"을 나타내는 단어의 철자를 확인한다.', steps: ['잘못된 철자: leetle.', '바른 단어: little — l-i-t-t-l-e.'], tip: 'little은 "lit-tle"로 tt가 들어갑니다.' } },
        { questionNo: '11', format: 'editing', marks: 1, stem: 'The Venus Flytrap can snap shut very [quikly].', answer: 'quickly',
          solution: { method: '"quickly / fast"라는 부사의 철자를 확인한다.', steps: ['잘못된 철자: quikly (ck 빠짐).', '바른 단어: quickly — q-u-i-c-k-l-y.'], tip: 'quickly는 "quick+ly"로 ck가 들어갑니다.' } },
        { questionNo: '12', format: 'editing', marks: 1, stem: 'When an insect crawls [leefs] along the and touches any hair on them...', answer: 'leaves',
          solution: { method: '"leaves"이라는 단어의 복수 철자를 확인한다.', steps: ['잘못된 철자: leefs.', '바른 단어: leaves — l-e-a-v-e-s (leaf의 불규칙 복수형).'], tip: 'leaf의 복수는 leaves (leaf → leaves, 불규칙 변화).' } },
      ],
    },
    // (E) Comprehension Q13-19
    {
      kind: 'set',
      id: 'ny22wa2-secE',
      topic: 'ComprehensionOE',
      title: '(E) Comprehension — The Story of Zan',
      instructions: 'Read this passage and answer questions 13 to 19.',
      passage: 'On the island of Crete, Earth Mother had a child called Zan. The bees of the forest brought honey for little Zan and the wild goats gave him milk. They also made some toys for him. Each toy was made of precious metals, and Zan played happily with his toys.\n\nTime passed and Zan grew up. Grateful to his animal friends which cared for him, Zan rewarded them. He made a law that the goats could roam freely. He made beehives to protect the bees. Then, Zan took his toys and hid them carefully in a secret cave where they would be safe.\n\nOne day, three men climbed up the mountains to find treasure. They discovered the cave. "There must be a treasure in there," one man said. They put on armour that protected them from the bees and stormed into the cave.\n\nSuddenly, Zan appeared. "Stop!" he shouted. "You have come here to rob and kill. I will let you live, but from now on, you must not tell other people where my cave is." The men shivered when they saw Zan.\n\nHe then cast a spell on the men, turning them into birds. One turned into an owl, one turned into a parrot and the last one became a mynah. The birds flew away and were never seen again.\n\n(Source: Adapted from the Story of Zan)',
      marks: 8,
      questions: [
        { questionNo: '13', format: 'open', marks: 1,
          stem: 'Fill in the blank with suitable words. Zan\'s toys were special as they were made of ________.',
          answer: 'precious metals',
          solution: { method: '1단락에서 장난감 재료를 찾는다.', steps: ['"Each toy was made of precious metals"(귀금속으로 만들어짐).', '따라서 "precious metals" → 정답.'], tip: '"made of"는 재료를 나타냅니다.' } },
        { questionNo: '14', format: 'open', marks: 2,
          stem: 'Explain why Zan rewarded his animal friends.',
          answer: 'Zan rewarded his animal friends because he was grateful to them as they had cared for him when he was young.',
          solution: { method: '2단락에서 Zan이 보상한 이유를 찾는다.', steps: ['"Grateful to his animal friends which cared for him, Zan rewarded them."', '이유: 동물 친구들이 그를 돌봐줬기 때문에 감사함.'], tip: '"Grateful to ~" = ~에게 감사해서가 이유입니다.' } },
        { questionNo: '15', format: 'mcq', marks: 1,
          stem: 'Which word has the same meaning as "charged"? Circle either (A) or (B). "They put on armour that (A) protected them from the bees and (B) stormed into the cave."',
          options: [{ label: 'A', text: 'protected' }, { label: 'B', text: 'stormed' }],
          answer: 'B',
          solution: { method: '"charged"(돌진하다)와 같은 뜻을 고른다.', steps: ['"charged" = 돌진했다/돌격했다.', '"stormed" = 몰아쳐 들어갔다 → 돌격의 의미 → 정답 (B).'], tip: '"stormed into"는 힘차게/격렬하게 돌진해 들어가는 동작입니다.' } },
        { questionNo: '16', format: 'open', marks: 1,
          stem: 'Read the statement and tick "True" or "False": Zan treasured his toys.',
          answer: 'True',
          solution: { method: '2단락에서 Zan이 장난감을 어떻게 다뤘는지 확인한다.', steps: ['"Zan took his toys and hid them carefully in a secret cave where they would be safe."', '소중히 숨겨 보관함 → treasured(소중히 여겼다) → True.'], tip: '"hid them carefully where they would be safe"는 소중히 여겼음을 나타냅니다.' } },
        { questionNo: '17', format: 'open', marks: 1,
          stem: 'Read the statement and tick "True" or "False": The three men turned themselves into birds.',
          answer: 'False',
          solution: { method: '마지막 단락에서 새로 변한 주체를 확인한다.', steps: ['"He then cast a spell on the men, turning them into birds."', 'Zan이 주문을 걸어 새로 변하게 한 것 → 남자들 스스로 변한 것이 아님 → False.'], tip: '"He cast a spell"이 능동 주체입니다(men이 스스로 변한 게 아님).' } },
        { questionNo: '18', format: 'mcq', marks: 1,
          stem: 'Tick the word that best describes how the three men felt in paragraph 4.',
          options: [{ label: '1', text: 'angry' }, { label: '2', text: 'cold' }, { label: '3', text: 'frightened' }],
          answer: '3',
          solution: { method: '4단락에서 남자들의 감정을 찾는다.', steps: ['"The men shivered when they saw Zan."', '"shivered"(떨었다) = 두려움/공포 → frightened(겁먹은) → 정답 (3).'], tip: '"shivered"는 추위나 두려움에 떠는 것으로, 여기서는 두려움(frightened)을 나타냅니다.' } },
        { questionNo: '19', format: 'open', marks: 1,
          stem: 'Write 1, 2 and 3 in the blanks to show what happened first, next, and last in the story.\n( ) Zan warned the men.\n( ) Zan had a happy childhood.\n( ) The men wanted to look for treasure.',
          answer: 'Zan warned the men = 3; Zan had a happy childhood = 1; The men wanted to look for treasure = 2',
          solution: { method: '단락 순서에 따라 사건을 정렬한다.', steps: ['1단락: Zan이 행복한 어린 시절을 보냄 → 1.', '3단락: 세 남자가 보물을 찾으러 옴 → 2.', '4단락: Zan이 남자들에게 경고함 → 3.'], tip: '이야기 순서: 유년기(1) → 남자들 등장(2) → Zan 경고(3).' } },
      ],
    },
  ],
};

export default wa2NanyangPrimaryEnglish2022;
