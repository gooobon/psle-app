// =============================================================================
// src/data/p3/english/papers/wa1/test_comprehension_8types_golden.ts
// GOLDEN TEST PAPER: 8-type Comprehension renderer verification (The Donkey).
// Single Comprehension set with all 8 question formats, standard schema.
// =============================================================================
export const testComprehension8TypesGolden = {
  meta: {
    school: 'Comprehension 8-Type Test',
    year: 2023,
    assessment: 'Paper 2',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 15,
    totalMarks: 10,
  },
  items: [
    {
      kind: 'set',
      id: 'nh2023-comprehension-donkey',
      topic: 'Comprehension',
      title: 'Comprehension: The Lazy Donkey',
      instructions: 'Read the passage carefully and answer questions 41 to 48.',
      passage:
        'A merchant wanted to sell a few sacks of salt to a village nearby. He tied up the sacks of salt on his donkey and set off.\n\n' +
        'The sacks that were filled with salt were very heavy and the donkey felt very tired. When they came to a river, they walked across the shallow water carefully. Then the donkey tripped and fell into the water. The size of the sacks shrunk as the salt in them reduced tremendously. Most of it had dissolved in the water. As such, the sacks felt lighter when the donkey stood up. The merchant was very upset and led the donkey back to the town.\n\n' +
        'The next day, they came to the river. The donkey remembered what had happened earlier and fell into the water on purpose. The trick worked as his load felt lighter immediately. The merchant watched the donkey fall but said nothing. The donkey was very happy and boasted to his friends that he had found a way to make his work easier.\n\n' +
        'On the third day, the merchant placed some sacks on his donkey again. Unknown to the donkey, the sacks were filled with cotton which the merchant had borrowed from another trader. The donkey followed the merchant happily.\n\n' +
        'When they reached the river, the donkey tried the same trick again. He jumped into the water but could not stand up this time. The load of the sacks was three times heavier than before because the cotton absorbed water. After watching the donkey struggle in the water for a while, the merchant removed the sacks of cotton and led the drenched donkey out of the river.\n\n' +
        'He looked at his donkey and said, "Do not try to be lazy again."\n\n' +
        'When the donkey realised that the merchant was teaching him a lesson, he was embarrassed and hung his head low. After that incident, the donkey never tried to be lazy again.\n\n' +
        "(Adapted from 'The Donkey' by WOW Stories Volume 1)",
      marks: 10,
      questions: [

        {
          questionNo: '41',
          format: 'fill_blank',
          marks: 1,
          stem: 'How did the merchant earn a living?\nThe merchant earned a living by ______.',
          answer: 'selling salt',
          acceptableAnswers: [
            'selling salt', 'selling sacks of salt', 'selling salt to villages',
            'selling sacks of salt to villages', 'selling salt to a village',
          ],
          solution: {
            evidence: 'A merchant wanted to sell a few sacks of salt to a village nearby',
            evidenceParagraph: 1,
            keywords: ['earn a living', 'sell', 'salt'],
            answerFormat: 'Complete the blank: "by selling ____"',
            tip: 'For "How did ~ earn a living" questions, find the character\'s job or what they traded in Paragraph 1.',
            steps: [
              'Paragraph 1: "A merchant wanted to sell a few sacks of salt to a village nearby."',
              'His job = selling salt ? he earned a living by selling salt.',
            ],
          },
        },

        {
          questionNo: '42',
          format: 'mcq',
          marks: 1,
          stem: 'Why did the sacks feel lighter after the donkey fell into the water on the first day?',
          options: [
            'The donkey became stronger.',
            'The salt dissolved in the water.',
            'The merchant removed some sacks.',
            'The water pushed the sacks up.',
          ],
          answer: 1,
          solution: {
            evidence: 'The size of the sacks shrunk as the salt in them reduced tremendously. Most of it had dissolved in the water.',
            evidenceParagraph: 2,
            trap: 'the sacks felt lighter when the donkey stood up',
            trapExplanation: 'The sacks felt lighter as a RESULT, but the actual cause was the salt dissolving ? read for the reason, not just the result.',
            keywords: ['lighter', 'dissolved', 'reduced'],
            tip: 'Find the CAUSE (why), not just what happened. The salt dissolving is the cause of the lighter load.',
            steps: [
              'Paragraph 2: "the salt in them reduced tremendously. Most of it had dissolved in the water."',
              'Salt dissolved ? less salt ? lighter sacks. Answer (2).',
            ],
          },
        },

        {
          questionNo: '43',
          format: 'ab_circle',
          marks: 1,
          stem: 'Which word has the same meaning as "completely wet"? Circle either (A) or (B).',
          abSentence: 'After watching the donkey (A) struggle in the water, the merchant led the (B) drenched donkey out of the river.',
          abChoices: { A: 'struggle', B: 'drenched' },
          answer: 'B',
          solution: {
            evidence: 'led the drenched donkey out of the river',
            evidenceParagraph: 5,
            trap: 'struggle',
            trapExplanation: '"struggle" means to fight or try hard ? it does NOT mean wet. Only "drenched" means completely wet.',
            keywords: ['completely wet', 'drenched'],
            tip: '"drenched" = soaked / completely wet from water.',
            steps: [
              '(A) struggle = to fight/try hard ? not about being wet.',
              '(B) drenched = completely wet ? matches. Answer (B).',
            ],
          },
        },

        {
          questionNo: '44',
          format: 'fill_word',
          marks: 1,
          stem: 'Which word in paragraph 3 shows that the donkey was proud of his trick?',
          answer: 'boasted',
          acceptableAnswers: ['boasted', 'boast'],
          solution: {
            evidence: 'The donkey was very happy and boasted to his friends',
            evidenceParagraph: 3,
            keywords: ['proud', 'boasted'],
            tip: '"boasted" = talked proudly about something you did ? it shows the donkey was proud.',
            steps: [
              'Paragraph 3: "The donkey was very happy and boasted to his friends..."',
              '"boasted" shows pride ? answer.',
            ],
          },
        },

        {
          questionNo: '45',
          format: 'sequence',
          marks: 1,
          stem: 'Write 1, 2 or 3 in the blanks to show the order in which the events happened.',
          sequenceItems: [
            'The donkey boasted to his friends.',
            'The donkey fell into the water accidentally.',
            'The donkey could not stand up because of the cotton.',
          ],
          answer: [2, 1, 3], // boasted=2nd, accidental fall=1st, cotton=3rd
          solution: {
            evidence: 'Then the donkey tripped and fell into the water',
            evidenceParagraph: 2,
            keywords: ['The next day', 'On the third day', 'order'],
            tip: 'Use time signals: Day 1 (accidental fall) ? Day 2 (boasted) ? Day 3 (cotton).',
            steps: [
              'Day 1 (Para 2): fell accidentally ? 1',
              'Day 2 (Para 3): boasted to friends ? 2',
              'Day 3 (Para 5): could not stand up (cotton) ? 3',
            ],
          },
        },

        {
          questionNo: '46',
          format: 'true_false',
          marks: 2,
          stem: 'Read each statement and decide if it is True or False.',
          statements: [
            'The donkey fell into the water on purpose on the first day.',
            'The cotton became heavier because it absorbed water.',
          ],
          answer: ['False', 'True'],
          solution: {
            evidence: 'Then the donkey tripped and fell into the water',
            evidenceParagraph: 2,
            trap: 'fell into the water on purpose',
            trapExplanation: 'On Day 1 the donkey "tripped and fell" (accident). It was only on Day 2 that he fell on purpose.',
            keywords: ['tripped', 'on purpose', 'absorbed water'],
            tip: 'Watch the DAY carefully ? the donkey fell by accident on Day 1, on purpose on Day 2.',
            steps: [
              'Statement 1: Para 2 says he "tripped and fell" on Day 1 = accident ? False.',
              'Statement 2: Para 5 says "cotton absorbed water" ? heavier ? True.',
            ],
          },
        },

        {
          questionNo: '47',
          format: 'tf_reason',
          marks: 2,
          stem: 'The donkey learnt his lesson in the end. Is this statement True or False? Give a reason.',
          answer: 'True',
          acceptableAnswers: [
            'he never tried to be lazy again',
            'after that incident the donkey never tried to be lazy again',
            'the donkey never tried to be lazy again',
          ],
          solution: {
            evidence: 'After that incident, the donkey never tried to be lazy again.',
            evidenceParagraph: 7,
            keywords: ['lesson', 'never', 'lazy again'],
            answerFormat: 'True/False + "because ..." (quote evidence from the last paragraph)',
            tip: 'For T/F + reason, your reason must quote or paraphrase the exact evidence from the passage.',
            steps: [
              'Last paragraph: "the donkey never tried to be lazy again."',
              'This shows he learnt his lesson ? True, because he never tried to be lazy again.',
            ],
          },
        },

        {
          questionNo: '48',
          format: 'open_sentence',
          marks: 2,
          stem: 'Why did the merchant use sacks of cotton to teach the donkey a lesson?',
          answer: 'The merchant used cotton because cotton absorbs water and becomes much heavier, so the donkey\'s trick of falling into the water would make his load heavier instead of lighter.',
          acceptableAnswers: [
            'because cotton absorbs water and becomes heavier',
            'cotton absorbs water so the load became heavier',
            'so that the load would become heavier when wet',
          ],
          solution: {
            evidence: 'The load of the sacks was three times heavier than before because the cotton absorbed water.',
            evidenceParagraph: 5,
            keywords: ['cotton', 'absorbed water', 'heavier'],
            answerFormat: 'Start with "Because..." or "The merchant used cotton because..."',
            tip: 'For "Why" questions worth 2 marks, include BOTH the cause (cotton absorbs water) AND the effect (load became heavier).',
            steps: [
              'Paragraph 5: "the cotton absorbed water" ? "three times heavier".',
              'Cotton gets heavier when wet ? the donkey\'s lazy trick backfired.',
            ],
          },
        },
      ],
    },
  ],
};

export default testComprehension8TypesGolden;
