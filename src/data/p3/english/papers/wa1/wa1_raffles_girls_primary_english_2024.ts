// =============================================================================
// src/data/p3/english/papers/wa1_raffles_girls_primary_english_2024.ts
// Raffles Girls'Primary School — 2024 Weighted Assessment 1 (English) — Primary 3
// Original PDF: P3_English_WA1.pdf, physical pages 65–73 (cover page p.1–9)
// Total Time: 50 minutes / Total: 15 marks (Section A 7 + Section B 8)
// Listening and writing excluded. All questions 100% transcribed with detailed solutions.
// =============================================================================

import type { EnglishPaper } from'../types';

export const wa1RafflesGirlsPrimaryEnglish2024: EnglishPaper = {
  meta: {
    school: "Raffles Girls' Primary School",
    year: 2024,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 15,
    sourcePages: 'pp.65–73 (paper pp.1–9)',
  },

  items: [
    // =========================================================================
    // Section A: Comprehension 1 (7 marks) — Q1–6
    // 지문: The Nightingale (Adapted from Treasury of Asian Folktales, Linda Gan)
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2024-secA-comprehension1',
      topic: 'ComprehensionOE',
      title: 'Section A: Comprehension 1 — The Nightingale',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'Long ago, a beautiful nightingale flew into Mr Wu\'s garden. It sang so sweetly that anyone who heard it would be attracted to its singing.\n\n' +
        'Mr Wu\'s daughter, Ling, listened to the nightingale\'s songs and she fell in love instantly with it. When the evening was over, Ling told her father all about the nightingale\'s melodious singing. He then captured the nightingale and placed it in a cage in the balcony.\n\n' +
        'Ling wanted to have the nightingale all to herself so she sent her father a toy bird which could sing and dance. He was so fascinated by the toy bird that he forgot all about the nightingale. Ling was glad that her plan worked and hid the nightingale in her room instead.\n\n' +
        'After some time, the toy bird stopped singing and dancing. Mr Wu longed for music so he searched high and low for the nightingale and finally found it in Ling\'s room. He reprimanded Ling for being selfish. Then he suggested placing the cage in the living room for everyone to enjoy the nightingale\'s singing.\n\n' +
        'Mr Wu was happy to hear the beautiful singing of the nightingale. He promised to get rid of the toy bird and to take good care of the nightingale forever.\n\n' +
        '(Adapted from Treasury of Asian Folktales retold by Linda Gan)',
      marks: 7,
      questions: [
        {
          questionNo: '1',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 1, why did everyone fall in love with the nightingale\'s singing? Tick your chosen answer. "The nightingale ________."',
          options: [
            { label: '1', text: 'sang very sweetly' },
            { label: '2', text: 'was beautiful' },
            { label: '3', text: 'could dance very well' },
          ],
          answer: '1',
          solution: {
            method: 'Find the reason why everyone was attracted, directly from Paragraph 1.',
            steps: [
              'Paragraph 1: "It sang so sweetly that anyone who heard it would be attracted to its singing."',
              'The reason everyone was attracted is because it "sang very sweetly".',
              'Therefore, the answer is (1) sang very sweetly.',
            ],
            tip: 'For "why" questions, look for the cause that comes before the effect in the passage — for example, look out for the "so ~ that" sentence structure.',
          },
        },
        {
          questionNo: '2',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 2, which word has the same meaning as immediately?',
          answer: 'instantly',
          solution: {
            method: 'Find a word in Paragraph 2 that means the same as "immediately".',
            steps: [
              'Paragraph 2: "she fell in love instantly with it."',
              '"instantly" means right away, without delay — the same meaning as "immediately".',
              'Therefore, the answer is "instantly".',
            ],
            tip: 'For synonym questions, try replacing the given word with the word from the passage and check if the meaning still makes sense.',
          },
        },
        {
          questionNo: '3',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 and 3, tick "True" or "False": Mr Wu kept the nightingale in his room.',
          answer: 'False',
          solution: {
            method: 'Check where Mr Wu placed the nightingale.',
            steps: [
              'Paragraph 2: Mr Wu caught the bird and put it in "a cage in the balcony" (a cage on the balcony).',
              'He did not place it in his room — it was Ling who hid the nightingale in her room ("hid the nightingale in her room").',
              'Therefore, the statement "Mr Wu placed it in his room" is not true → False.',
            ],
            tip: 'For True/False questions about locations, you must clearly identify where each character placed the object — match the right person to the right place.',
          },
        },
        {
          questionNo: '4',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 and 3, tick "True" or "False": Ling did not enjoy listening to the nightingale\'s singing.',
          answer: 'False',
          solution: {
            method: 'Check whether Ling liked the nightingale\'s song.',
            steps: [
              'Paragraph 2: \'she fell in love instantly with it.\' — Ling loved the bird right away.',
              'Paragraph 3: She even hid the bird in her room so she could keep it all to herself.',
              'Therefore, \'did not enjoy\' is false → False.',
            ],
            tip: 'When a statement uses a negative form (did not ~), if it is the opposite of what the passage says, the answer is False.',
          },
        },
        {
          questionNo: '5',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 and 3, tick "True" or "False": At first, the nightingale was put in a cage and placed in the balcony.',
          answer: 'True',
          solution: {
            method: 'Check the passage to find out where the bird was placed at first.',
            steps: [
              'Paragraph 2: \'He then captured the nightingale and placed it in a cage in the balcony.\'',
              'At first, the bird was put in a cage and placed on the balcony.',
              'The statement matches the passage → True.',
            ],
            tip: 'When a statement includes \'at first\', the timing must also match the passage for the answer to be True.',
          },
        },
        {
          questionNo: '6',
          format: 'open',
          marks: 2,
          stem:
            'From the last paragraph, list 2 things that Mr Wu promised to do to keep the nightingale forever.\n(i) ________\n(ii) ________',
          answer: '(i) get rid of the toy bird  (ii) take good care of the nightingale',
          solution: {
            method: 'In the last paragraph, find the sentence with \'promised to ~\' and identify the two promises made.',
            steps: [
              'Last paragraph: \'He promised to get rid of the toy bird and to take good care of the nightingale forever.\'',
              'The word \'and\' connects two promises together.',
              '(i) To get rid of the toy bird / (ii) To take good care of the nightingale forever.',
            ],
            tip: '"list 2 things" means you write down each of the two actions connected by "and" in a sentence separately.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Comprehension 2 (8 marks) — Q7–13
    // 지문: Collecting Saga Seeds (Adapted from memoriesoftrees.com)
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2024-secB-comprehension2',
      topic: 'ComprehensionOE',
      title: 'Section B: Comprehension 2 — Collecting Saga Seeds',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'Back when we did not have any toys, the seeds, flowers and leaves of local plants were our playthings. One of my favourite pastime was collecting saga seeds. While waiting for our grandmother to pick us up after school, my brother and I would challenge each other to look for the bright red seeds. We did not mind getting our hands dirty for these little treasures. We dug around the ground around the saga trees as if they were excavation sites. It became a competition between us to be the first to find a red seed - and my brother usually won. I have kept some of the seeds even till today.\n\n' +
        '"Never put the saga seeds in your mouth. They are harmful," our grandmother warned us after our toddler sister almost swallowed one of them. Since then, we began to keep the saga seeds in jars. The deep red seeds of the saga trees gave us hours of enjoyment. Sometimes we would put the seeds in empty Yakult bottles and seal the top of the bottles with masking tape to make musical shakers. We would also use the seeds for our Art and Craft projects.\n\n' +
        'Collecting saga seeds was almost as cool as collecting marbles, stamps and postcards. Some people would place them in special glass jars to be used as beautiful ornaments at home while others gave them to their loved ones to express their love for them.\n\n' +
        '(Adapted from https://www.memoriesoftrees.com/?p=99)',
      marks: 8,
      questions: [
        {
          questionNo: '7',
          format: 'open',
          marks: 1,
          stem: "In paragraph 1, what was the writer's favourite activity in his childhood?",
          answer: 'collecting saga seeds',
          solution: {
            method: 'Find the sentence in paragraph 1 that contains the word "favourite".',
            steps: [
              'Paragraph 1: "One of my favourite pastime was collecting saga seeds."',
              'Her favourite activity was collecting saga seeds.',
              'So the answer is collecting saga seeds.',
            ],
            tip: 'Finding the key word of the question (favourite) in the passage helps you locate the answer sentence quickly.',
          },
        },
        {
          questionNo: '8',
          format: 'mcq',
          marks: 1,
          stem: 'In paragraph 1, the words "little treasures" refer to ________. Tick one only.',
          options: [
            { label: '1', text: 'flowers' },
            { label: '2', text: 'leaves' },
            { label: '3', text: 'saga seeds' },
          ],
          answer: '3',
          solution: {
            method: 'Look at the context just before and after "little treasures" to find what it refers to.',
            steps: [
              'Paragraph 1: while searching for bright red seeds (saga seeds), she called them "these little treasures".',
              '"little treasures" is a metaphor for those red saga seeds.',
              'So the answer is (3) saga seeds.',
            ],
            tip: 'For a figurative expression (like little treasures), look near it to find what it really refers to.',
          },
        },
        {
          questionNo: '9',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes to indicate the order in which the events occurred in paragraph 2.\n' +
            "( ) The writer's grandmother warned them not to put the saga seeds in their mouths.\n" +
            "( ) The writer's toddler sister almost accidentally swallowed a saga seed.\n" +
            '( ) The writer and her brother put the saga seeds in jars.',
          answer:
            "The writer's grandmother warned them = 2; The writer's toddler sister almost swallowed a saga seed = 1; The writer and her brother put the saga seeds in jars = 3",
          solution: {
            method: 'Use the time words (after, since then) in paragraph 2 as clues to put the events in order.',
            steps: [
              '"...our grandmother warned us AFTER our toddler sister almost swallowed one": the sister almost swallowing a seed came first (1), then the grandmother\'s warning (2).',
              '"Since then, we began to keep the saga seeds in jars.": keeping them in jars came last (3).',
              'So the order is: sister almost swallowed a seed = 1, grandmother\'s warning = 2, kept in jars = 3.',
            ],
            tip: 'Time linking words such as "after", "since then" and "then" are the key clues for sequencing questions.',
          },
        },
        {
          questionNo: '10',
          format: 'open',
          marks: 1,
          stem: "Which word in paragraph 2 has the same meaning as 'deadly'?",
          answer: 'harmful',
          solution: {
            method: "Find a word in Paragraph 2 that has a similar meaning to 'deadly' (harmful/dangerous).",
            steps: [
              'Paragraph 2: "They are harmful,": the grandmother warned that the seeds were harmful.',
              'harmful = causing harm, which has a similar meaning to deadly.',
              'So the answer is harmful.',
            ],
            tip: 'For synonym questions, the answer is often in a warning or explanation sentence in the passage.',
          },
        },
        {
          questionNo: '11',
          format: 'open',
          marks: 1,
          stem:
            'Which three-word phrase in paragraph 2 tells you that the writer and her brother spent a lot of fun time playing with the seeds?',
          answer: 'hours of enjoyment',
          solution: {
            method: 'Find the three-word phrase in paragraph 2 that means "many happy times".',
            steps: [
              'Paragraph 2: "The deep red seeds of the saga trees gave us hours of enjoyment."',
              '"hours of enjoyment" is the three-word phrase and means "long-lasting joy".',
              'So the answer is hours of enjoyment.',
            ],
            tip: 'If the question asks for a "three-word phrase", copy exactly three words from the passage.',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 2, why were the writer and her brother careful not to leave the saga seeds lying around in the house? Tick one only.',
          options: [
            { label: '1', text: 'They wanted to make musical shakers using Yakult bottles.' },
            { label: '2', text: 'They did not want their toddler sister to swallow the seeds accidentally.' },
            { label: '3', text: 'They wanted to use the seeds for their Art and Craft projects.' },
          ],
          answer: '2',
          solution: {
            method: 'Find in paragraph 2 the reason (cause) the seeds were kept in jars.',
            steps: [
              'Paragraph 2: after the toddler sister almost swallowed a seed, the grandmother warned them, so they began to keep the seeds in jars.',
              'They did not leave them lying around the house so that the sister would not swallow one by accident.',
              'So the answer is (2) so that the toddler sister would not swallow them by accident.',
            ],
            tip: 'Take note that the wrong options (shakers, Art and Craft) are only "the use of seeds", not "the reason for being careful".',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 2,
          stem:
            'Answer in a complete sentence. Based on paragraph 3, list two ways people could use the jars of saga seeds they had collected.',
          answer:
            'People could place them in special glass jars to be used as beautiful ornaments at home, and they could give them to their loved ones to express their love.',
          solution: {
            method: 'Find the two uses in the "Some people... while others..." sentence in paragraph 3.',
            steps: [
              'Paragraph 3: "Some people would place them in special glass jars to be used as beautiful ornaments at home while others gave them to their loved ones to express their love for them."',
              'Use 1: put them in special glass jars as ornaments at home.',
              'Use 2: give them to loved ones as gifts to show affection.',
              'Answer in a complete sentence that includes both uses.',
            ],
            tip: 'If the question asks for a "complete sentence", answer with a full sentence that has a subject and a verb so that no marks are lost.',
          },
        },
      ],
    },
  ],
};

export default wa1RafflesGirlsPrimaryEnglish2024;
