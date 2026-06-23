// =============================================================================
// src/data/p3/english/papers/wa1_raffles_girls_primary_english_2025.ts
// Raffles Girls'Primary School — Weighted Assessment 1 (2025) English Language — Primary 3
// Source PDF: P3_English_WA1.pdf, physical pages 251–256 (cover page p.1–6)
// Total Time: 50 minutes / Total: 15 marks (Section A 7 + Section B 8)
// ★ All 13 questions verified 100% correct against official answer key (p257).
// Listening and composition excluded. All questions fully transcribed with detailed solutions.
// =============================================================================

import type { EnglishPaper } from'../types';

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
            method: 'Find the meaning of "glittery" from the context (description of the red marble).',
            steps: [
              '"glittery, red marble" — the word glittery describes something that sparkles or shines.',
              '"bright and shiny" means something that gives off light and sparkles — this matches glittery exactly.',
              '"small and rough" and "old and scratched" have nothing to do with sparkling or shining, so they are incorrect. The answer is (2). (Verified against official answer key.)',
            ],
            tip: '"glittery" comes from the word "glitter" and describes an appearance that sparkles or shines with light.',
          },
        },
        {
          questionNo: '2',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 2, which word has the same meaning as "kindness"?',
          answer: 'care',
          solution: {
            method: 'Find a word in Paragraph 2 that means the same as "kindness".',
            steps: [
              'In Paragraph 2, Mrs Lim says: "You\'re showing great care, Lily." — Mrs Lim is praising Lily\'s actions.',
              '"care" means looking out for others and thinking about their feelings — this has the same meaning as "kindness".',
              'Therefore, the answer is care. (Verified against official answer key.)',
            ],
            tip: 'Both "care" and "kindness" share the same idea — thinking about and doing good things for others.',
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
            method: 'Look at Paragraph 2 to find out how Mrs Lim reacted.',
            steps: [
              'In Paragraph 2: "Mrs Lim smiled and said, \'You\'re showing great care, Lily.\' She was proud of Lily\'s remarkable deed."',
              'Mrs Lim praised Lily by saying "great care" and felt "proud" of her — this confirms that Mrs Lim was praising Lily\'s kind action.',
              'Therefore, the answer is True. (Verified against official answer key.)',
            ],
            tip: '"smiled", "you\'re showing great care", and "proud" are all expressions of praise.',
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
            method: 'Check paragraph 3 to find out how Max felt after getting his marble back.',
            steps: [
              'Paragraph 3: "He had been looking for it and was so happy to get it back."',
              '"so happy" means he was very pleased to get it back.',
              '"glad" (pleased) means the same as "happy", so the answer is True. (Confirmed in answer key)',
            ],
            tip: '"happy to get it back" and "glad to have found" express the same meaning.',
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
            method: 'Check paragraph 2 to find out what Lily did with the marble.',
            steps: [
              'Paragraph 2: "Lily decided to take the marble to the lost-and-found corner at school."',
              'Lily did not keep the marble for herself — she brought it to the Lost and Found corner.',
              '"decided to keep it for her collection" is not true, so the answer is False. (Confirmed in answer key)',
            ],
            tip: 'Do not mix up what Lily thought in paragraph 1 (she thought she was lucky as it looked like her collection) with what she actually did (she handed it in to the lost-and-found corner).',
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
            method: 'Look at the last paragraph to find the two things Lily learned.',
            steps: [
              'Last paragraph: "She realised that doing something kind for someone made her very happy. She also learned that sharing joy with others can bring happiness as well."',
              '(i) Doing something kind for someone made her very happy.',
              '(ii) Sharing joy with others can also bring happiness.',
            ],
            tip: 'The sentences \'She realised that ~\' and \'She also learned that ~\' match (i) and (ii) respectively.',
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
            method: 'Find the relationship between Fox and Alligator in paragraph 1.',
            steps: [
              'Paragraph 1: \'there lived a cunning fox and his good-natured friend, Alligator.\'',
              'Alligator is introduced as Fox\'s \'friend\'.',
              'Therefore, the answer is \'They were friends.\' (confirmed in official answer key)',
            ],
            tip: 'Find the relationship (friend) directly from the phrase \'his good-natured friend, Alligator\'.',
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
            method: 'Use the result \'never had enough to eat\' to infer the meaning of \'scarce\'.',
            steps: [
              'Paragraph 1: \'Food was often scarce and they never had enough to eat.\'',
              '\'never had enough to eat\' → this tells us that food was in short supply.',
              '\'scarce\' means not enough / rare → matches exactly with \'insufficient\'. (confirmed in official answer key)',
            ],
            tip: 'The result that follows, \'never had enough to eat\', tells us what \'scarce\' means.',
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
            method: 'Follow the order of events in paragraph 3 (corn) and paragraph 4 (potatoes).',
            steps: [
              '⚠ Answer key: the order is 2, 3, 1. This means the numbers for the first, second, and third options listed are 2, 3, 1 — not that \'Fox laughed/ate corn\' is event 1.',
              'Going by the order of the options: (Fox laughed/ate corn) = 2, (Alligator/Fox harvested potatoes) = 3, (Alligator found out he only had roots) = 1.',
              'In other words: the first thing that happened was \'Alligator found out he only had roots\' (1st), then \'Fox laughed and ate the corn\' (2nd), and finally \'Alligator and Fox harvested potatoes\' (3rd).',
            ],
            tip:
              'Paragraph 3: Corn harvest → Alligator only gets the roots (①) → Fox laughs and eats the corn (②). Paragraph 4: Potato harvest → Alligator asks for \'the top part / upper section\' so he gets no potatoes (③). Therefore: \'Fox laughed/ate corn\' = 2, \'potatoes together\' = 3, \'roots of corn\' = 1.',
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
            method: 'Find the three-word phrase in Paragraph 5 that means \'thought of a solution / came up with an answer\'.',
            steps: [
              'Paragraph 5 states: \'Alligator came up with a good way to share the harvest fairly.\'',
              '\'Came up with\' is a three-word phrase that means to think of an idea or solution.',
              'Therefore, the answer is \'came up with\'. (Verified against official answer key.)',
            ],
            tip: '\'Came up with\' is a three-word phrasal verb that means \'to think of a good idea / to find a solution\'.',
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
            method: 'Check Paragraph 5 to find out how they decided to share the sugarcane harvest.',
            steps: [
              'Paragraph 5 states: \'Alligator suggested they split it equally. Feeling sorry, Fox agreed with Alligator.\'',
              '\'Split it equally\' means to divide into equal parts, which has the same meaning as \'divide the crop equally\'.',
              'Therefore, the answer is (1). (Verified against official answer key.)',
            ],
            tip: '\'Split equally\' and \'divide equally\' are synonyms — both mean to share something into equal parts.',
          },
        },
        {
          questionNo: '12',
          format: 'open',
          marks: 1,
          stem: 'What does the word "it" in paragraph 5 refer to?\nThe word "it" refers to ________.',
          answer: 'the sugarcane',
          solution: {
            method: 'Find the noun mentioned just before \'it\' in Paragraph 5.',
            steps: [
              'Paragraph 5 states: \'Then, Fox decided that they should grow sugarcane. ... Alligator suggested they split it equally.\'',
              '\'It\' refers to \'the sugarcane\' mentioned just before it in the paragraph.',
              'Therefore, the answer is: \'The word \\\'it\\\' refers to the sugarcane.\' (Verified against official answer key.)',
            ],
            tip: 'The pronoun \'it\' refers to the key singular noun in the sentence just before it.',
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
            method: 'In the last paragraph (paragraph 6), find the two outcomes that happened after they shared fairly.',
            steps: [
              'Paragraph 6: "Fox and Alligator always had plenty of food to eat and they lived happily ever after."',
              'Outcome 1: They always had enough food (always had plenty of food to eat).',
              'Outcome 2: They lived happily (lived happily ever after).',
              'Answer in one complete sentence that includes both outcomes. (Verified against official answer scheme)',
            ],
            tip: 'The two outcomes connected by \'and\' should be matched to (i) and (ii) respectively.',
          },
        },
      ],
    },
  ],
};

export default wa1RafflesGirlsPrimaryEnglish2025;
