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
            method: 'Choose the subject that includes both Sarah and Tom, as Sarah is asking Tom to do something together with her using \'Shall we help together?\'',
            steps: [
              'Sarah is asking a question that includes both herself and Tom (\'Yes, let\'s do that\' — Tom agrees to join her).',
              'When the speaker (Sarah) includes herself in a group, the correct plural subject is \'we\'.',
              'Therefore, \'Should we help him?\' → the correct answer is \'we\'.',
            ],
            tip: 'When answering a question with \'Let\'s ~\' (meaning \'let us\'), we usually use \'we\' to make the suggestion.',
          },
        },
        {
          questionNo: '2',
          format: 'fib',
          marks: 1,
          stem: '"Yes, let\'s do that," Tom replied. (2) ________ walked up to the man.',
          answer: 'they',
          solution: {
            method: 'Choose the third-person plural subject that refers to both Sarah and Tom together.',
            steps: [
              'This sentence is told from an outside point of view, where the narrator is describing Sarah and Tom (third-person narration).',
              'Sarah and Tom together = third-person plural → \'they\'.',
              'Therefore, \'They walked up to the man.\' → the correct answer is \'they\'.',
            ],
            tip: 'In a story, when referring to two or more characters together, we use \'they\'.',
          },
        },
        {
          questionNo: '3',
          format: 'fib',
          marks: 1,
          stem: '"Can we help you with (3) ________ box?" Tom asked.',
          answer: 'your',
          solution: {
            method: 'Choose the possessive that Tom uses when speaking directly to the old man.',
            steps: [
              'Tom is asking the old man whether they can help with \'your box\'.',
              'The second-person possessive used to show that something belongs to the person you are talking to is \'your\'.',
              'Therefore, \'Can we help you with your box?\' → the correct answer is \'your\'.',
            ],
            tip: 'When \'you\' (object form) is already used in the sentence, use the possessive \'your\' to refer to something that belongs to that same person.',
          },
        },
        {
          questionNo: '4',
          format: 'fib',
          marks: 1,
          stem: 'Helping others made (4) ________ feel good.',
          answer: 'them',
          solution: {
            method: 'Choose the object pronoun that the narrator uses to refer to Sarah and Tom from the outside.',
            steps: [
              '"Helping others made ___ feel good" — helping other people made Sarah and Tom feel good.',
              'The pronoun that refers to Sarah and Tom (3rd person plural) as the object is "them".',
              'So "made them feel good" → the answer is them. (The remaining options us and you are not used here.)',
            ],
            tip: 'When referring to 3rd person plural as the object, we use them (the object form of the subject pronoun they).',
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
            method: 'Match the verb to "always... whenever" (repeated habit) and the subject (She, singular).',
            steps: [
              '"always... whenever she hears" shows a repeated habit → use Simple Present.',
              'The subject "She" is 3rd person singular → add -s to the verb.',
              'So "She always dances" → the answer is dances.',
            ],
            tip: '"always" and "whenever" are signal words for Simple Present showing repeated habits.',
          },
        },
        {
          questionNo: '6',
          format: 'fib',
          marks: 1,
          stem: 'Everyone took turns to (6) ________ on the stage.',
          answer: 'dance',
          solution: {
            method: 'Apply the structure "took turns to + base verb".',
            steps: [
              '"take turns to + base verb" means to do something one after another.',
              'After "to", use the base verb (base form of the verb).',
              'So "took turns to dance" → the answer is dance.',
            ],
            tip: 'After "to", always use the base verb (to + base verb).',
          },
        },
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: 'Jenny (7) ________ as gracefully as a ballerina.',
          answer: 'danced',
          solution: {
            method: 'Match the tense to the whole passage (\'Last weekend\' = past tense).',
            steps: [
              'A paragraph starting with \'Last weekend, my class had a party...\' is written in the Simple Past tense.',
              'Subject \'Jenny\' (singular) + past tense → danced.',
              'Therefore, \'Jenny danced as gracefully as a ballerina.\' → the correct answer is danced.',
            ],
            tip: 'All verbs inside a paragraph that begins with \'Last weekend\' should consistently be written in the Simple Past tense.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'While we (8) ________, the principal walked in and cheered for us.',
          answer: 'were dancing',
          solution: {
            method: 'In a \'While + subject + ___, [one past event]\' structure, look at the action that was already in progress.',
            steps: [
              'When \'the principal walked in\' (a single moment in the past) happened, \'we\' were in the middle of dancing.',
              'An action that was in progress at a specific point in the past → Past Continuous tense.',
              'Subject \'we\' (plural) → \'were dancing\' → the correct answer is were dancing.',
            ],
            tip: '\'While + subject + was/were -ing, [another past event]\' shows that while one action was in progress, another event happened.',
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
        method: 'Use the structure \'When + [short event], [situation that was already happening]\' to connect the two ideas.',
        steps: [
          '\'The doorbell rang\' is a short event that happened in a single moment.',
          '\'Rina was reading in her room\' is the situation that was already in progress when that short event happened.',
          'Structure: \'When + [short event], [situation that was already happening].\' → \'When the doorbell rang, Rina was reading in her room.\'',
        ],
        tip: 'After \'When\', we usually have a short, sudden event (rang), and after the comma, we have the longer action that was already in progress at that moment (was reading).',
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
        method: 'Use the structure "Both A and B" to join two people together.',
        steps: [
          'Since both people share the same trait (they like to sing in front of others), we join them using "Both A and B".',
          'When the subject becomes "Both Don and Ariel" (plural), the verb changes from likes → like.',
          'Completed sentence: "Both Don and Ariel like to sing in front of others."',
        ],
        tip: '"Both A and B" is treated as plural, so do not add -s to the verb (likes → like).',
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
            method: 'Look at the first sentence of Paragraph 1 to find the background (weather) that explains why the crow is thirsty.',
            steps: [
              'Paragraph 1: "On a hot summer day, a thirsty crow flew over a garden."',
              '"hot summer day" = "a sunny day" (bright and hot day) → The hot weather explains why the crow is thirsty.',
              'The passage only says "for hours" (searched for water for hours). The phrase "for days" (for several days) does not appear in the passage → Options (2) and (3) are false.',
              'Therefore, the correct answer is (1) was a sunny day.',
            ],
            tip: 'Carefully compare the exact time expression in the passage ("hours" vs "days") with each answer option.',
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
            method: 'Look in Paragraphs 1 and 2 to find the direct cause of "Excited".',
            steps: [
              'Paragraph 1: "Suddenly, it spotted a jug on a table in the garden."',
              'Paragraph 2: "Excited, the crow flew down and perched on the jug\'s rim."',
              'The crow became excited because it spotted "a jug on a table in the garden" → The correct answer is (1) a jug on a table.',
            ],
            tip: 'Find the cause of excitement (the thing discovered) in the sentence just before the word \'Excited\'.',
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
            method: 'Follow the order of paragraphs in the passage (Paragraph 2 → Paragraph 3 → Paragraph 5).',
            steps: [
              'Paragraph 2: \'the crow flew down and perched on the jug\'s rim.\' → 1.',
              'Paragraph 3: \'It looked around the garden and saw some small pebbles on the ground.\' → 2.',
              'Paragraph 5: \'the crow dipped its beak into the water and took a long, refreshing drink.\' → 3.',
            ],
            tip: 'The order of events simply follows the order in which the paragraphs appear in the passage.',
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
            method: 'Find the two reasons in Paragraph 2 why the crow could not reach the water with its beak.',
            steps: [
              'Paragraph 2: \'It looked inside and saw some water, but the water level was very low. The crow tried to reach the water with its beak, but it could not. The jug was too deep.\'',
              'Reason 1: The water level was very low.',
              'Reason 2: The jug was too deep.',
            ],
            tip: 'The two sentences that come after \'but\' match reasons (i) and (ii) respectively.',
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
            method: 'Choose the word that has the same meaning as \'worked hard without resting\'.',
            steps: [
              '\'tirelessly\' means without getting tired or without stopping → it matches exactly with \'worked hard without stopping\'.',
              '\'back and forth\' only describes the direction or pattern of movement, and does not directly mean \'without stopping\' or \'without rest\'.',
              'Therefore, the correct answer is (A) tirelessly.',
            ],
            tip: '"Tirelessly" means "kept going without getting tired", and it connects directly to "without stopping".',
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
              'The sentence is found at the boundary of paragraphs 4 and 5: "After a long time, the water finally rose high enough for the crow to reach it."',
              "'it' refers to 'the water' that was mentioned in the sentence just before.",
              "In a complete sentence: \"'it' refers to the water.\"",
            ],
            tip: 'The pronoun "it" often refers to the closest singular noun (a thing) in the sentence just before it.',
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
            method: 'Look at the last sentence of the final paragraph to find what the crow learned.',
            steps: [
              'The final paragraph states: "It had learned that with patience and smart thinking, even difficult problems could be solved."',
              'What the crow learned is: "With patience and wise thinking, even difficult problems can be solved."',
              'Copy the sentence directly from the passage and write it as a complete sentence in your answer.',
            ],
            tip: 'The part that comes after "learned that ~" is exactly the lesson that was learned.',
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
