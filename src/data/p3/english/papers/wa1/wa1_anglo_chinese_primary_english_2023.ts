// =============================================================================
// wa1_anglo_chinese_primary_english_2023.ts
// Anglo-Chinese School (Primary) — 2023 Weighted Assessment 1 — English — P3
// Sections: A Vocabulary MCQ (6), B Editing (6), C Comprehension (8) = 20 marks
// Source PDF: P3_English_WA1.pdf, pp. 1–6
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1_anglo_chinese_primary_english_2023: EnglishPaper = {
  meta: {
    school: 'Anglo-Chinese School (Primary)',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 20,
    sourcePages: '1-6',
  },
  items: [
    // ---------------------------------------------------------------------
    // SECTION A — Vocabulary MCQ (6 x 1 mark = 6 marks)
    // For Q1–6, four options are given. Choose the correct answer.
    // ---------------------------------------------------------------------
    {
      kind: 'single',
      id: 'acs2023-q1',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Mrs Tan is planning a birthday party for her son. She is as ____________ as a bee.',
      options: [
        { label: '1', text: 'lazy' },
        { label: '2', text: 'tired' },
        { label: '3', text: 'busy' },
        { label: '4', text: 'sleepy' },
      ],
      answer: '3',
      solution: {
        method: 'Recognise the fixed simile (idiom) "as busy as a bee".',
        steps: [
          'The sentence uses the pattern "as ______ as a bee".',
          'Bees are famous for working hard and never stopping, so the set phrase is "as busy as a bee".',
          'Planning a party also means she has a lot of work to do, which fits "busy".',
          'Test the others: lazy, tired and sleepy are the opposite of how a bee behaves, so they do not fit.',
        ],
        tip: 'Animal similes are fixed: "as busy as a bee", "as quiet as a mouse", "as slow as a snail". Memorise them as whole phrases.',
      },
    },
    {
      kind: 'single',
      id: 'acs2023-q2',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Samuel was ____________ by his teacher for being a helpful student.',
      options: [
        { label: '1', text: 'agreed' },
        { label: '2', text: 'praised' },
        { label: '3', text: 'received' },
        { label: '4', text: 'welcomed' },
      ],
      answer: '2',
      solution: {
        method: 'Match the verb to the reason "for being a helpful student" (something good).',
        steps: [
          'Being helpful is a good thing, so the teacher would say something positive about Samuel.',
          '"praised" means to say good things about someone — it fits a reward for good behaviour.',
          '"agreed" needs "agreed with"; "received" and "welcomed" do not match being rewarded for helpfulness.',
        ],
        tip: 'When the clue says someone did something good, look for a positive verb such as praised, rewarded or thanked.',
      },
    },
    {
      kind: 'single',
      id: 'acs2023-q3',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: "Jane listened to her mother's ____________ to be careful while crossing the road.",
      options: [
        { label: '1', text: 'offer' },
        { label: '2', text: 'choice' },
        { label: '3', text: 'advice' },
        { label: '4', text: 'invitation' },
      ],
      answer: '3',
      solution: {
        method: 'Decide what kind of message tells you to "be careful".',
        steps: [
          'Telling someone to "be careful" is guidance about what they should do — that is advice.',
          '"advice" = a suggestion about what to do, which matches "to be careful".',
          'An offer, a choice or an invitation do not mean telling someone how to behave safely.',
        ],
        tip: '"advice" is a noun (the thing said); "advise" is the verb (the action). Here the blank follows "mother\'s", so a noun is needed.',
      },
    },
    {
      kind: 'single',
      id: 'acs2023-q4',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'The students need to hand in the project next week. They must start working on it ____________.',
      options: [
        { label: '1', text: 'gently' },
        { label: '2', text: 'gracefully' },
        { label: '3', text: 'attentively' },
        { label: '4', text: 'immediately' },
      ],
      answer: '4',
      solution: {
        method: 'Use the deadline clue "next week" to pick the adverb about timing.',
        steps: [
          'The project is due next week, so there is little time left.',
          '"immediately" means right away / without delay, which is what they must do to finish on time.',
          'gently, gracefully and attentively describe HOW to do something, not HOW SOON, so they do not match the time clue.',
        ],
        tip: 'Look for the clue word. A time word like "next week" usually points to a time adverb such as immediately, soon or quickly.',
      },
    },
    {
      kind: 'single',
      id: 'acs2023-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Tom had lost his way. He asked an old man for ____________ to the toy shop.',
      options: [
        { label: '1', text: 'tips' },
        { label: '2', text: 'rules' },
        { label: '3', text: 'directions' },
        { label: '4', text: 'suggestions' },
      ],
      answer: '3',
      solution: {
        method: 'Decide what someone who is lost needs in order to find a place.',
        steps: [
          'Tom "had lost his way", so he needs help to know which way to go.',
          '"directions" means instructions on how to get to a place — exactly what a lost person asks for.',
          'tips, rules and suggestions do not specifically mean "how to reach a place".',
        ],
        tip: 'When someone is lost, the keyword to look for is "directions" (the way to go).',
      },
    },
    {
      kind: 'single',
      id: 'acs2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: 'Sam was disappointed with his friend. He did not ____________ his promise.',
      options: [
        { label: '1', text: 'keep' },
        { label: '2', text: 'break' },
        { label: '3', text: 'achieve' },
        { label: '4', text: 'complete' },
      ],
      answer: '1',
      solution: {
        method: 'Use the collocation "keep a promise" together with the negative "did not".',
        steps: [
          'The fixed phrases are "keep a promise" (do what you said) and "break a promise" (fail to do it).',
          'Sam was disappointed, so the friend failed. With "did not", the blank must be "keep": "did not keep his promise" = he broke it.',
          'If we chose "break", "did not break his promise" would mean he kept it — that would not make Sam disappointed.',
        ],
        tip: 'Watch out for the negative word "not". "did not keep" already means "broke", so choosing "break" would double the meaning and be wrong.',
      },
    },

    // ---------------------------------------------------------------------
    // SECTION B — Editing (6 x 1 mark = 6 marks)
    // Each underlined word has a spelling or grammatical error. A wrong or
    // missing punctuation mark is shown by a circle. Write the correct word
    // or punctuation mark in each box.
    // ---------------------------------------------------------------------
    {
      kind: 'set',
      id: 'acs2023-editing',
      topic: 'Editing',
      title: 'Editing — A Day Out at East Coast Park',
      instructions:
        'Each of the underlined words contains either a spelling or grammatical error. A wrong or missing punctuation mark is denoted by a circle (O). Put the correct punctuation mark or word (in terms of usage, spelling and form) in each of the boxes.',
      passage:
        'Last Sunday, Tim went to East Coast Park with his family. Tim\'s father rented four bicycles (7)O After cycling, Tim built (8)sandcaskles with his brother, Alex. Soon, it was time (9)to lunch. The family went to Tim\'s (10)fevourite restaurant for a delicious meal. During lunch (11)O Alex and his parents gave Tim a surprise. They had bought Tim the storybook that he wanted. Tim (12)jump for joy and hugged his parents. It was an unforgettable outing for Tim.',
      marks: 6,
      questions: [
        {
          questionNo: '7',
          format: 'editing',
          marks: 1,
          stem: 'Punctuation circle after "rented four bicycles ( ) After cycling, ...".',
          answer: '.',
          solution: {
            method: 'A new sentence begins with the capital letter "After", so the sentence before it must end.',
            steps: [
              'Read the two parts: "...rented four bicycles" and "After cycling, Tim built...".',
              '"After" starts with a capital letter, which signals a new sentence.',
              'A statement that has finished needs a full stop, so the circle should be a full stop ( . ).',
            ],
            tip: 'When the next word is capitalised and starts a new idea, the missing punctuation is usually a full stop.',
          },
        },
        {
          questionNo: '8',
          format: 'editing',
          marks: 1,
          stem: 'Spelling: the underlined word "sandcaskles".',
          answer: 'sandcastles',
          solution: {
            method: 'Fix the spelling of the compound word sand + castles.',
            steps: [
              'The word is made of "sand" + "castles".',
              '"sandcaskles" is misspelt — there should be no "k"; it is spelt c-a-s-t-l-e-s.',
              'Correct spelling: "sandcastles".',
            ],
            tip: 'Break a long word into its smaller parts (sand + castles) to spell it correctly.',
          },
        },
        {
          questionNo: '9',
          format: 'editing',
          marks: 1,
          stem: 'Word usage: "Soon, it was time (to) lunch."',
          answer: 'for',
          solution: {
            method: 'Choose the correct preposition before a noun like "lunch".',
            steps: [
              'We say "time for lunch", not "time to lunch".',
              '"to" is used before a verb (time to eat), but "lunch" here is a noun.',
              'So the correct word is "for": "it was time for lunch".',
            ],
            tip: 'Remember: "time for + noun" (time for lunch) but "time to + verb" (time to eat).',
          },
        },
        {
          questionNo: '10',
          format: 'editing',
          marks: 1,
          stem: 'Spelling: the underlined word "fevourite".',
          answer: 'favourite',
          solution: {
            method: 'Correct the spelling using British (Singapore) spelling.',
            steps: [
              'The word should begin with "fa-", not "fe-".',
              'It is spelt f-a-v-o-u-r-i-t-e in British/Singapore English (with a "u").',
              'Correct spelling: "favourite".',
            ],
            tip: 'In Singapore, use British spelling: favourite, colour, neighbour — all keep the "u".',
          },
        },
        {
          questionNo: '11',
          format: 'editing',
          marks: 1,
          stem: 'Punctuation circle after "During lunch ( ) Alex and his parents...".',
          answer: ',',
          solution: {
            method: 'A short phrase at the start of a sentence is followed by a comma.',
            steps: [
              '"During lunch" is an introductory phrase that tells us WHEN.',
              'After such an opening phrase we pause, shown by a comma.',
              'So the circle should be a comma: "During lunch, Alex and his parents...".',
            ],
            tip: 'When a sentence opens with a time/place phrase (During lunch, In the morning, At the park), put a comma after it.',
          },
        },
        {
          questionNo: '12',
          format: 'editing',
          marks: 1,
          stem: 'Grammar (tense): the underlined word "Tim (jump) for joy".',
          answer: 'jumped',
          solution: {
            method: 'Match the verb tense to the rest of the story (past tense).',
            steps: [
              'The whole story happened "Last Sunday", so it is in the past tense.',
              'Other verbs are past: went, rented, built, gave, hugged.',
              'So "jump" must also be past tense: "jumped".',
            ],
            tip: 'Keep the tense the same all through a story. If it started in the past, every action verb stays in the past.',
          },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // SECTION C — Comprehension (8 marks)
    // ---------------------------------------------------------------------
    {
      kind: 'set',
      id: 'acs2023-comprehension',
      topic: 'ComprehensionMCQ',
      title: 'Comprehension — John and David',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'One morning, during recess, John was at the library. He looked rather worried. David, who happened to be nearby, saw John. He knew John often spent recess all by himself doing his homework. He wondered if John had not submitted his homework yet again. Out of concern, David approached John.\n\n' +
        '"I have a lot of things to do at home besides my homework. Do not be mistaken. I have not been watching television or playing video games at home," John replied.\n\n' +
        'David then found out from John that he had to take care of his younger brother, Samuel, who studied in a kindergarten near their house. He also had to do household chores as his parents had to work till late at night. David felt sorry for him. As David was good at solving Mathematics problems, he decided to help John with his homework. David went to John\'s house after school on Tuesdays and Thursdays. John did his homework while David looked after Samuel.\n\n' +
        'John was grateful that David had helped him. He was able to submit his homework punctually. From then on, the boys became good friends. They studied together after school every day.',
      paragraphs: [
        'One morning, during recess, John was at the library. He looked rather worried. David, who happened to be nearby, saw John. He knew John often spent recess all by himself doing his homework. He wondered if John had not submitted his homework yet again. Out of concern, David approached John.',
        '"I have a lot of things to do at home besides my homework. Do not be mistaken. I have not been watching television or playing video games at home," John replied.',
        'David then found out from John that he had to take care of his younger brother, Samuel, who studied in a kindergarten near their house. He also had to do household chores as his parents had to work till late at night. David felt sorry for him. As David was good at solving Mathematics problems, he decided to help John with his homework. David went to John\'s house after school on Tuesdays and Thursdays. John did his homework while David looked after Samuel.',
        'John was grateful that David had helped him. He was able to submit his homework punctually. From then on, the boys became good friends. They studied together after school every day.',
      ],
      marks: 8,
      questions: [
        {
          questionNo: '13',
          format: 'mcq',
          marks: 1,
          stem: 'David approached John because he wanted to ____________.',
          options: [
            { label: '1', text: 'ask John for help with his homework' },
            { label: '2', text: 'invite John to spend recess with him' },
            { label: '3', text: 'ask John to go to the library with him' },
            { label: '4', text: 'find out if John had done his homework' },
          ],
          answer: '4',
          solution: {
            method: 'Find the cause of David\'s action in paragraph 1.',
            steps: [
              'Paragraph 1 says David "wondered if John had not submitted his homework yet again".',
              '"Out of concern, David approached John" — he wanted to check on the homework problem.',
              'That matches option 4: to find out if John had done his homework.',
              'Option 1 is wrong because DAVID is the one good at Maths who later helps; he was not asking for help.',
            ],
            tip: 'Look for the sentence just before the action. The reason is usually stated right before "approached John".',
          },
        },
        {
          questionNo: '14',
          format: 'mcq',
          marks: 1,
          stem: 'John often ____________ after school.',
          options: [
            { label: '1', text: 'watched television' },
            { label: '2', text: 'played video games' },
            { label: '3', text: 'studied at the library' },
            { label: '4', text: 'took care of his younger brother' },
          ],
          answer: '4',
          solution: {
            method: 'Match the option to what the passage actually says John did at home.',
            steps: [
              'Paragraph 3: John "had to take care of his younger brother, Samuel".',
              'John clearly said he had NOT been watching television or playing video games, so options 1 and 2 are wrong.',
              'He did homework at home (not the library after school), so option 3 does not fit.',
              'The correct answer is option 4: he took care of his younger brother.',
            ],
            tip: 'Beware of "trap" options (TV, video games) that the passage says are NOT true. Re-read to check.',
          },
        },
        {
          questionNo: '15',
          format: 'matching',
          marks: 3,
          stem: 'Match the following characters to their actions in the passage by drawing a straight line to connect them.',
          pairs: [
            { left: 'John', right: 'did household chores.' },
            { left: 'David', right: 'could solve Mathematics problems.' },
            { left: 'Samuel', right: 'attended kindergarten.' },
          ],
          answer:
            'John → did household chores. ; David → could solve Mathematics problems. ; Samuel → attended kindergarten.',
          solution: {
            method: 'Scan paragraph 3 for each character\'s action.',
            steps: [
              'John: "He also had to do household chores" → John did household chores.',
              'David: "As David was good at solving Mathematics problems" → David could solve Mathematics problems.',
              'Samuel: his younger brother "who studied in a kindergarten" → Samuel attended kindergarten.',
            ],
            tip: 'For matching questions, underline each name in the passage first, then read the sentence around it to find the action.',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'Which word in paragraph 4 has the same meaning as "thankful"?',
          answer: 'grateful',
          solution: {
            method: 'Find the synonym of "thankful" in the last paragraph.',
            steps: [
              'Read paragraph 4: "John was grateful that David had helped him."',
              '"grateful" means feeling thankful for something done for you.',
              'So the word with the same meaning as "thankful" is "grateful".',
            ],
            tip: 'For "find the word that means..." questions, the answer is one single word copied exactly from the stated paragraph.',
          },
        },
        {
          questionNo: '17i',
          format: 'open',
          marks: 1,
          stem: 'What were the two things that David did to help John? (i)',
          answer: 'David helped John with his homework.',
          solution: {
            method: 'List the first helpful action from paragraph 3.',
            steps: [
              'Paragraph 3: David "decided to help John with his homework".',
              'This is the first thing David did to help John.',
            ],
            tip: 'When a question asks for "two things", give two clearly separate actions, one in (i) and one in (ii).',
          },
        },
        {
          questionNo: '17ii',
          format: 'open',
          marks: 1,
          stem: 'What were the two things that David did to help John? (ii)',
          answer: 'David took care of (looked after) John\'s younger brother, Samuel.',
          solution: {
            method: 'List the second helpful action from paragraph 3.',
            steps: [
              'Paragraph 3: "John did his homework while David looked after Samuel."',
              'So the second thing David did was take care of John\'s younger brother, Samuel.',
            ],
            tip: 'Use words from the passage ("looked after Samuel") but write a full sentence to earn the mark.',
          },
        },
      ],
    },
  ],
};

export default wa1_anglo_chinese_primary_english_2023;
