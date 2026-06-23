// =============================================================================
// src/data/p3/english/papers/wa1_rosyth_primary_english_2023.ts
// Rosyth School — Weighted Assessment One (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 208–217 (시험지 표지 p.1–10)
// Duration: 50 minutes / Total: 35 marks
// 주의: 표지에 연도 없음. 모음집 배열상 2023으로 처리(검증 권장).
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// 구성: A문법(4) B어휘(3) C문법클로즈(4) D어휘클로즈(4) E문장조작(2)
//       F독해클로즈(3) G시각자료독해(5) H독해(10) = 35점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1RosythPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Rosyth School',
    year: 2023,
    assessment: 'Weighted Assessment One',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 35,
    sourcePages: 'pp.208–217 (paper pp.1–10)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (4 marks) — Q1–4
    // =========================================================================
    {
      kind: 'single',
      id: 'rosyth-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last week, the students ________ reminded to bring their thermometers daily.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '4',
      solution: {
        method: 'Look at the number of the subject (plural) and the time marker \'Last week\'.',
        steps: [
          '\'Last week\' tells us the sentence is about the past.',
          'The subject \'the students\' is plural.',
          'Plural subject + past tense be verb → were → Answer is (4).',
        ],
        tip: 'When there is a past time expression like \'Last week\', use was/were (use were if the subject is plural).',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem:
        '"Look, Mummy, I can ________ around like my pet rabbit!" exclaimed the little girl happily.',
      options: [
        { label: '1', text: 'fly' },
        { label: '2', text: 'hop' },
        { label: '3', text: 'flit' },
        { label: '4', text: 'jump' },
      ],
      answer: '2',
      solution: {
        method: 'Look at \'Like a pet rabbit\' and choose the verb that matches how a rabbit moves.',
        steps: [
          'The way a rabbit moves is called \'hop\' (to jump with short bouncy jumps).',
          '\'Hop around like my pet rabbit\' sounds natural.',
          'fly (to move through the air) / flit (to move lightly and quickly, usually for birds or insects) / jump (a general jump, not specific to rabbits) — these do not match how a rabbit typically moves → Answer is (2) hop.',
        ],
        tip: '\'Hop\' is the verb used to describe the short bouncy jumping movement of animals like rabbits and frogs.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'The bakery is located ________ the post office and the bookshop.',
      options: [
        { label: '1', text: 'at' },
        { label: '2', text: 'over' },
        { label: '3', text: 'along' },
        { label: '4', text: 'between' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the preposition that shows something is located between two places.',
        steps: [
          '\'The post office AND the bookshop\' — two places are mentioned.',
          '\'Between A and B\' means in the space that separates A and B.',
          'at / over / along do not directly mean \'in the space between two locations\' → Answer is (4) between.',
        ],
        tip: '\'Between A and B\' is used to show the position of something in the space that separates two points or objects.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: '"We are going to make this recycled toy ________," said the girls to their mother.',
      options: [
        { label: '1', text: 'myself' },
        { label: '2', text: 'herself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the reflexive pronoun that matches the subject \'We\' (the speakers themselves).',
        steps: [
          '\'The girls\' are saying \'We\' → they are referring to themselves as the speakers.',
          'The reflexive pronoun for first person plural (\'We\') is \'ourselves\'.',
          'Therefore, the correct answer is (3) ourselves.',
        ],
        tip: 'When \'We\' is the subject in a conversation, the reflexive pronoun is \'ourselves\' (note: \'themselves\' is used when talking about others from an observer\'s point of view).',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (3 marks) — Q5–7
    // =========================================================================
    {
      kind: 'single',
      id: 'rosyth-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Sandy had not taken her breakfast so she ________ ate her sandwich at lunch.',
      options: [
        { label: '1', text: 'slowly' },
        { label: '2', text: 'gently' },
        { label: '3', text: 'quickly' },
        { label: '4', text: 'briskly' },
      ],
      answer: '3',
      solution: {
        method: 'The situation is \'was hungry because he/she did not eat breakfast\' → choose the adverb that best describes how the person ate.',
        steps: [
          '\'Had not taken her breakfast\' (skipped breakfast) → she would be very hungry by lunchtime.',
          'A hungry person would usually eat \'quickly\'.',
          '\'Slowly\' and \'gently\' are the opposite of what a hungry person would do, and \'briskly\' is usually used for movements like walking, not eating → correct answer is (3) quickly.',
        ],
        tip: '\'Had not taken breakfast\' (feeling hungry) connects naturally with \'quickly ate\' (ate fast).',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: '"It\'s a ________ day, today. Let\'s go to the park to fly a kite," said my brother, Tim.',
      options: [
        { label: '1', text: 'windy' },
        { label: '2', text: 'rainy' },
        { label: '3', text: 'cloudy' },
        { label: '4', text: 'stormy' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the adjective that best describes weather that is good for flying a kite.',
        steps: [
          '\'Let\'s go to the park to fly a kite\' — you need wind to fly a kite.',
          '\'Windy\' means there is a lot of wind → this is the best weather for flying a kite.',
          '\'Rainy\' and \'stormy\' are not suitable for flying a kite, and \'cloudy\' is not directly related to wind → correct answer is (1) windy.',
        ],
        tip: 'To fly a kite, you need wind, so \'windy\' is the most natural choice.',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem:
        'John ________ his sister against the wall in anger when she broke his toy robot.',
      options: [
        { label: '1', text: 'flicked' },
        { label: '2', text: 'pushed' },
        { label: '3', text: 'pointed' },
        { label: '4', text: 'attacked' },
      ],
      answer: '2',
      solution: {
        method: 'For \'Did ~ with ~ against the wall\', choose the verb that matches a physical action.',
        steps: [
          '\'___ his sister against the wall\' — choose a verb that shows a physical pushing action.',
          '\'pushed\' means to shove someone → \'pushed against the wall\' sounds natural.',
          '\'flicked\' (lightly tapped) and \'pointed\' (indicated a direction) are too weak or unrelated; \'attacked\' is too general and does not fit the specific action of \'against the wall\' → correct answer is (2) pushed.',
        ],
        tip: '\'push someone against the wall\' describes the specific action of forcing someone up against a wall.',
      },
    },

    // =========================================================================
    // Section C: Grammar Cloze (4 marks) — Q8–11
    // 보기: walked, walk, walking, had walked
    // 지문: Mouse, Owl, Fox 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze',
      instructions:
        'Fill in each blank with the correct word from the box. Use each word once only. Box: walked | walk | walking | had walked',
      passage:
        'One day, Mouse went to the woods. While (8) ________, he saw Owl outside his treetop house. "Hello Owl," Mouse called. "I\'m taking a leisurely (9) ________ through the woods."\n\n' +
        '"Have you seen Fox?" asked Owl. "I was told that he (10) ________ through the woods earlier on too."\n\n' +
        '"No, I have not," replied Mouse. "When I (11) ________ past his logpile house, I did not see him."\n\n' +
        'Then Mouse waved goodbye to Owl and went on his way. He returned home and had a delicious meal.',
      marks: 4,
      questions: [
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'While (8) ________, he saw Owl outside his treetop house.',
          answer: 'walking',
          solution: {
            method: 'Apply the \'While + -ing\' (while doing something) structure.',
            steps: [
              '"While ___, he saw Owl" — "Saw Owl while walking".',
              '\'While -ing\' is a participial phrase that means \'while ~\' or \'during ~\'.',
              'Therefore, the blank should be filled with \'walking\'.',
            ],
            tip: '\'While -ing\' shows that one action was happening when another event occurred.',
          },
        },
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: '"I\'m taking a leisurely (9) ________ through the woods."',
          answer: 'walk',
          solution: {
            method: 'For \'a leisurely ___\' (a relaxed ~), choose the noun form.',
            steps: [
              'After \'take a ___\', a noun is needed.',
              '\'a leisurely walk\' = a relaxed stroll (noun).',
              'Therefore, the blank should be filled with \'walk\'.',
            ],
            tip: 'Phrases like \'take a walk / rest / break\' follow the pattern \'take a + noun\', which means \'to do ~\'.',
          },
        },
        {
          questionNo: '10',
          format: 'fib',
          marks: 1,
          stem: '"I was told that he (10) ________ through the woods earlier on too."',
          answer: 'walked',
          solution: {
            method: 'Look for the verb form that matches the past time expression \'earlier on\'.',
            steps: [
              '"Earlier on" refers to a point of time in the past.',
              'The Simple Past form is walked.',
              'Therefore, "he walked through the woods earlier on" → the answer is walked.',
            ],
            tip: '"Earlier on / earlier today" is often used together with the Simple Past tense.',
          },
        },
        {
          questionNo: '11',
          format: 'fib',
          marks: 1,
          stem: '"When I (11) ________ past his logpile house, I did not see him."',
          answer: 'had walked',
          solution: {
            method: 'Apply the remaining option (had walked) and check if it matches the meaning of the Past Perfect tense.',
            steps: [
              'The other three words (walking / walk / walked) have already been used in Q8–10 → the remaining word is "had walked".',
              '"When I had walked past his house, I did not see him." means "By the time he/she passed by the house (before that moment), he/she did not see him" — this uses the Past Perfect tense and sounds natural.',
              'Therefore, the answer for the blank is had walked.',
            ],
            tip: 'For a cloze activity where each word is used only once, always check at the end whether the remaining word fits naturally.',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Vocabulary Cloze (4 marks) — Q12–15
    // 보기: angry, spotted, nobody, agreed, somebody, captured (6개 중 4개)
    // 지문: Bear, Fox 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secD-vcloze',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions:
        'Fill in each blank with the correct word from the box. Use each word once only. Box: angry | spotted | nobody | agreed | somebody | captured',
      passage:
        'One day, Bear went hunting in the forest. He (12) ________ a hare and chased it. While chasing the hare, Bear crashed into a thorny bush. A huge thorn poked his paw.\n\n' +
        '"Remove this thorn for me!" Bear roared but (13) ________ dared to help as they were afraid of him. Finally, Fox approached Bear and said, "I will remove the thorn on one condition. You must promise not to hurt any of us again."\n\n' +
        'Upon hearing this, Bear became (14) ________ and refused. However, his paw hurt badly and only Fox had come forward to help him. In the end, he reluctantly (15) ________. He thanked Fox for removing the thorn from his paw. From that day onwards, Fox was greatly admired for courageously standing up to Bear.',
      marks: 4,
      questions: [
        {
          questionNo: '12',
          format: 'fib',
          marks: 1,
          stem: 'He (12) ________ a hare and chased it.',
          answer: 'spotted',
          solution: {
            method: '"Discovered and chased" — choose the verb that fits the flow of the sentence.',
            steps: [
              '"He ___ a hare and chased it" — he spotted the rabbit first, then chased it.',
              '"Spotted" means noticed / discovered → it is natural as the action that happens before chasing.',
              'Therefore, the answer for the blank is spotted.',
            ],
            tip: '"Spotted ... and chased" follows the natural order of Discover → Chase.',
          },
        },
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem:
            '"Remove this thorn for me!" Bear roared but (13) ________ dared to help as they were afraid of him.',
          answer: 'nobody',
          solution: {
            method: '"Could not help anyone because of ~" — choose the word that matches the meaning of the sentence.',
            steps: [
              '"as they were afraid of him" means there was no one willing to help Bear because they feared him.',
              '"nobody dared to help" means not a single person was brave enough to help.',
              'So the answer for the blank is "nobody".',
            ],
            tip: '"afraid of him" (they feared him) connects naturally with "nobody helped" (no one helped him).',
          },
        },
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Upon hearing this, Bear became (14) ________ and refused.',
          answer: 'angry',
          solution: {
            method: '"refused" goes with the feeling that matches the action of saying no.',
            steps: [
              'This is Bear\'s reaction after hearing Fox\'s condition: "must promise never to hurt us again".',
              'The proud Bear gets angry after hearing the condition → "angry".',
              'So "became angry and refused" → the answer is "angry".',
            ],
            tip: 'A negative feeling like "angry" usually comes before "refused" (turned down the offer).',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'In the end, he reluctantly (15) ________.',
          answer: 'agreed',
          solution: {
            method: '"reluctantly did ~" links the expression to the ending of the story.',
            steps: [
              '"his paw hurt badly and only Fox had come forward to help him" — Bear eventually needed the help.',
              '"reluctantly ___" means did something unwillingly → it means Bear accepted Fox\'s condition.',
              '"agreed" means to accept → "reluctantly agreed" (accepted unwillingly) → the answer is "agreed". (The remaining words "somebody" and "captured" are not used.)',
            ],
            tip: '"reluctantly agreed" means Bear did not really want to, but he accepted in the end.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E: Sentence Manipulation (2 marks) — Q16–17
    // =========================================================================
    {
      kind: 'single',
      id: 'rosyth-q16',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 16,
      marks: 1,
      stem:
        'Rewrite the given sentences as ONE sentence using the word provided. The meaning must be the same.\n' +
        'Tom forgot to attend the soccer practice. Tom\'s teacher was not angry.\n' +
        '________________________________________ but ________________________________________.',
      answer: "Tom forgot to attend the soccer practice, but his teacher was not angry.",
      solution: {
        method: 'Two events are joined using the contrast conjunction "but".',
        steps: [
          'Front: Tom missed soccer practice (negative) / Back: The teacher was not angry (unexpected result).',
          'Connect two sentences with \'but\': \'Tom forgot to attend the soccer practice, but...\'',
          'The repeated \'Tom\'s teacher\' is shortened to \'his teacher\'.',
          'Complete sentence: \'Tom forgot to attend the soccer practice, but his teacher was not angry.\'',
        ],
        tip: 'Use \'but\' to connect when the result is different from what you expected (expected: teacher would be angry / actual: teacher was not angry).',
      },
    },
    {
      kind: 'single',
      id: 'rosyth-q17',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 17,
      marks: 1,
      stem:
        'Rewrite the given sentences as ONE sentence using the word provided. The meaning must be the same.\n' +
        'Mary bought eggs and butter at the supermarket. Mary wanted to bake a cake.\n' +
        '________________________________________ so ________________________________________.',
      answer: 'Mary wanted to bake a cake, so she bought eggs and butter at the supermarket.',
      solution: {
        method: 'Since \'so\' connects a cause to its effect, always place the cause first.',
        steps: [
          'Relationship between the two events: \'wanted to make a cake\' (purpose/cause) → \'so he/she bought eggs and butter from the supermarket\' (result/action).',
          '\'so\' follows the order: \'[cause], so [effect]\'.',
          '"Mary wanted to bake a cake, so she bought eggs and butter at the supermarket."',
          'The second \'Mary\' is replaced with \'she\'.',
        ],
        tip: 'For \'so\' questions, first identify which sentence is the cause (purpose) and which is the effect (action), then place the cause first.',
      },
    },

    // =========================================================================
    // Section F: Comprehension Cloze (3 marks) — Q18–20
    // ONE WORD per blank. 지문: Green Tree Frog
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secF-ccloze',
      topic: 'ComprehensionFIB',
      title: 'Section F: Comprehension Cloze',
      instructions:
        'Read the passage carefully. Fill in each of the blanks with the most suitable word. YOU ARE ALLOWED TO USE ONLY ONE WORD FOR EACH BLANK.',
      passage:
        'Dogs and cats are commonly kept as pets but do you know that frogs can be good pets too? The Green Tree Frog is the most (18) ________ type of frog that people keep as pets.\n\n' +
        'The Green Tree Frog is (19) ________ in most parts of Australia. Its skin is usually bright green but can change to olive green. It has sticky pads on its toes which enable it to climb up flat surfaces without falling.\n\n' +
        'As adults, they can (20) ________ up to 10 cm long and live for 25 years! The Green Tree Frog is a solitary animal and it likes to live alone.\n\n' +
        '(Adapted from Frogs As Pets)',
      marks: 3,
      questions: [
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem:
            'The Green Tree Frog is the most (18) ________ type of frog that people keep as pets.',
          answer: 'common',
          solution: {
            method: 'Fill in the blank with a word that means \'the most commonly kept as pets by people\'.',
            steps: [
              '\'The most ___ type of frog that people keep as pets\' — the type that people choose most often.',
              '\'common\' means usual or widespread → it fits the meaning of \'the most commonly kept type\'.',
              'Therefore, the answer for the blank is: common. (Confirmed from the official answer key.)',
            ],
            tip: '\'The most common type that people keep\' means \'the type most commonly kept by people\'.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'The Green Tree Frog is (19) ________ in most parts of Australia.',
          answer: 'found',
          solution: {
            method: 'Fill in the blank with the word that fits the meaning of \'is found in / lives in ~\'.',
            steps: [
              '\'The Green Tree Frog is ___ in most parts of Australia\' — this means it lives in most parts of Australia.',
              '\'found\' means \'to be discovered\' → \'is found in\' (discovered in ~, meaning lives in ~) is a fixed phrase used to describe where animals or plants live.',
              'Therefore, the answer for the blank is \'found\'.',
            ],
            tip: '\'is found in [place]\' is a set phrase used to describe where animals or plants live.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'As adults, they can (20) ________ up to 10 cm long and live for 25 years!',
          answer: 'grow',
          solution: {
            method: 'Fill in the blank with the verb that fits the meaning of \'grows up to ~\'.',
            steps: [
              '\'can ___ up to 10 cm long\' — this means it can grow to a length of 10 cm.',
              '\'grow up to [length]\' means to grow as long as a certain size.',
              'Therefore, the answer for the blank is \'grow\'.',
            ],
            tip: '\'grow up to [size/length]\' is a set phrase used to describe how big an animal or plant can get.',
          },
        },
      ],
    },

    // =========================================================================
    // Section G: Visual Text Comprehension (5 marks) — Q21–25
    // 광고: Be Kind to Animals Day (Daisy Animal Shelter)
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secG-visualtext',
      topic: 'VisualText',
      title: 'Section G: Visual Text Comprehension — Be Kind to Animals Day',
      instructions: 'Study the poster carefully and then answer questions 21 to 25.',
      passage:
        'BE KIND TO ANIMALS DAY\n' +
        'Organised by Daisy Animal Shelter\n' +
        'Venue: Tanjong Puteh Park\n' +
        'Date: Saturday, 29 May 2021\n' +
        'Time: 9am to 5pm\n\n' +
        'Come with your family! Help us to provide care for these wonderful animals.\n\n' +
        'Are you ready to adopt a pet? Talks by Dr Shane & Dr Juliet\n' +
        '- "Am I ready for a pet?" Time: 11.00am – 11.30am\n' +
        '- "What is a healthy diet for my pet?" Time: 1.00pm – 1.30pm\n' +
        '- "Why exercise my pet?" Time: 3.00pm – 3.30pm\n\n' +
        'Pet Adoption\n' +
        'Come and view our adorable rescued animals. Adopt! Don\'t buy. Please give an abandoned pet a loving home.\n\n' +
        'Items for Sale\n' +
        'Pet food — Find a wide variety of food just for your precious pet.\n' +
        'Pet toys — Your pet will not be bored anymore!\n' +
        'Pet toiletries — Sweet-smelling shampoos and conditioners made from natural ingredients.\n' +
        'Get a free diary when you spend at least $60 on any of the above items.\n\n' +
        'For more information on pet adoption, please contact:\n' +
        '- Mdm Lim at 6762 9000 or lim@daisyanimalshelter.com\n' +
        '- Mdm Rani at 6762 9001 or rani@daisyanimalshelter.com',
      marks: 5,
      questions: [
        {
          questionNo: '21',
          format: 'mcq',
          marks: 1,
          stem: '"Be Kind to Animals Day" is an event held ________.',
          options: [
            { label: '1', text: 'throughout the month' },
            { label: '2', text: 'at the end of the month' },
            { label: '3', text: 'in the middle of the month' },
            { label: '4', text: 'at the beginning of the month' },
          ],
          answer: '2',
          solution: {
            method: 'Find where the date on the poster (29 May) falls within the month.',
            steps: [
              'The poster says: \'Date: Saturday, 29 May 2021\'.',
              'May has 31 days, so the 29th is near the end of the month.',
              '\'throughout the month\' (the whole month) / \'in the middle\' (mid-month) / \'at the beginning\' (early in the month) do not match the 29th → the correct answer is (2) at the end of the month.',
            ],
            tip: 'If the date is close to the last day of the month, we use \'at the end of the month\'.',
          },
        },
        {
          questionNo: '22',
          format: 'mcq',
          marks: 1,
          stem: 'The main purpose of the event is to ________.',
          options: [
            { label: '1', text: 'give out free diaries' },
            { label: '2', text: 'promote the sale of pets' },
            { label: '3', text: 'find homes for rescued animals' },
            { label: '4', text: 'teach pet owners about pet hygiene' },
          ],
          answer: '3',
          solution: {
            method: 'Look at the main message in the \'Pet Adoption\' section of the poster.',
            steps: [
              '\'Pet Adoption\' section: \'Come and view our adorable rescued animals. Adopt! Don\'t buy. Please give an abandoned pet a loving home.\'',
              'This directly shows the purpose of finding new homes (adoptive families) for rescued animals.',
              'A free diary (1), promoting sales (2), and hygiene education (4) are secondary or not the main purpose of the poster → The answer is (3).',
            ],
            tip: 'To find the \'main purpose\', look at the most emphasised section of the poster (in this case, Pet Adoption).',
          },
        },
        {
          questionNo: '23',
          format: 'mcq',
          marks: 1,
          stem: 'You can buy any of the following items at the event except ________.',
          options: [
            { label: '1', text: 'toys' },
            { label: '2', text: 'food' },
            { label: '3', text: 'diaries' },
            { label: '4', text: 'shampoos' },
          ],
          answer: '3',
          solution: {
            method: 'Tell apart the \'Items for Sale\' list from the \'free diary\'.',
            steps: [
              '\'Items for Sale\': Pet food, Pet toys, Pet toiletries (such as shampoo) — these are items you can buy.',
              'The diary is stated as \'Get a free diary when you spend at least $60\' — it is a free gift, not an item for sale.',
              'Therefore, the item that cannot be bought (not for sale) is (3) diaries.',
            ],
            tip: 'A \'free gift\' is different from an item \'for sale\'.',
          },
        },
        {
          questionNo: '24',
          format: 'mcq',
          marks: 1,
          stem: 'The organiser of the event is ________.',
          options: [
            { label: '1', text: 'Dr Juliet' },
            { label: '2', text: 'Dr Shane' },
            { label: '3', text: 'Tanjung Puteh Park' },
            { label: '4', text: 'Daisy Animal Shelter' },
          ],
          answer: '4',
          solution: {
            method: 'Check the \'Organised by\' section at the top of the poster.',
            steps: [
              'The poster states: \'Organised by Daisy Animal Shelter\'.',
              'Dr Shane and Dr Juliet are speakers, and Tanjong Puteh Park is only the venue — they are not the organisers.',
              'Therefore, the answer is (4) Daisy Animal Shelter.',
            ],
            tip: '\'Organised by\' is a phrase that directly tells you who is hosting the event.',
          },
        },
        {
          questionNo: '25',
          format: 'mcq',
          marks: 1,
          stem: 'Which one of the following statements is true?',
          options: [
            { label: '1', text: 'You may buy a pet at this event.' },
            { label: '2', text: 'Get a free gift when you spend $50.' },
            { label: '3', text: 'Contact Mdm Lim for more information.' },
            { label: '4', text: 'Dr Juliet will give a talk on how to choose a pet.' },
          ],
          answer: '3',
          solution: {
            method: 'Compare each option against the information in the poster one by one.',
            steps: [
              '(1) The poster says \'Adopt! Don\'t buy.\' — animals are adopted (for free), not bought → False.',
              '(2) The poster clearly states \'spend at least $60\', but the option says \'$50\' → the amount does not match → False.',
              '(3) \'For more information on pet adoption, please contact: Mdm Lim at 6762 9000...\' → True.',
              '(4) The talk titles listed are \'Am I ready for a pet?\', \'What is a healthy diet...\', and \'Why exercise my pet?\' — there is no talk about \'how to choose a pet\', and no talk is specifically matched to Dr Juliet → False.',
              'Therefore, the statement that is true is (3).',
            ],
            tip: 'Always double-check numbers (such as amounts of money) in advertisements to make sure they match exactly ($60 vs $50).',
          },
        },
      ],
    },

    // =========================================================================
    // Section H: Comprehension (10 marks) — Q26–32
    // 지문: Gloomy the Big Black Cloud
    // =========================================================================
    {
      kind: 'set',
      id: 'rosyth-secH-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section H: Comprehension — Gloomy the Big Black Cloud',
      instructions: 'Read the following passage carefully. Then write the answers for questions 26 to 32.',
      passage:
        'One hot day, Gloomy, the big black cloud, was sitting high up in the sky of the village. He had grown bigger and fatter due to the hot weather. Now, he was so big that he almost filled up the whole sky.\n\n' +
        'However, Gloomy had a problem. Try as he might, he could not rain. He was ashamed and did not want anyone to know. Gloomy felt worried. The villagers below were waiting patiently for him to provide enough water for their farms. Finally, he had no choice but to get help. He looked towards Cloud Land and saw several dark clouds from afar. He called Wind and said, "Please blow those dark clouds towards me." Wind did not like to be told what to do so he ignored Gloomy.\n\n' +
        'Feeling annoyed because Wind ignored him, Gloomy asked Lightning to flash his light at Wind. As Wind was afraid of Lightning, he quickly blew the dark clouds towards Gloomy. As soon as the dark clouds joined Gloomy, the rain fell.\n\n' +
        'Gloomy felt very happy and satisfied. With the help of the few dark clouds, he knew he had done a good job as the villagers had enough water for farming. After raining for a while, Gloomy started to shrink. Eventually, he disappeared but he knew that when the summer sun heats up the sky, he would appear again to provide more water for the land.\n\n' +
        '(Adapted from: Gloomy The Big Black Cloud)',
      marks: 10,
      questions: [
        {
          questionNo: '26',
          format: 'open',
          marks: 1,
          stem: 'Who was Gloomy?',
          answer: 'Gloomy was a/the big black cloud (in the sky above the village).',
          solution: {
            method: 'Find out who Gloomy is from the first sentence of Paragraph 1.',
            steps: [
              'Paragraph 1: \'One hot day, Gloomy, the big black cloud, was sitting high up in the sky of the village.\'',
              'Gloomy is a \'big black cloud\'.',
              'Written as a complete sentence: \'Gloomy was a big black cloud.\'',
            ],
            tip: 'A \'Who was ~\' question asks about the identity of a person or character. You can usually find the answer in the sentence where the character is first introduced.',
          },
        },
        {
          questionNo: '27',
          format: 'open',
          marks: 1,
          stem: "What was Gloomy's problem?",
          answer: 'Gloomy\'s problem was that he could not rain (no matter how hard he tried).',
          solution: {
            method: 'Find Gloomy\'s problem directly from the first sentence of Paragraph 2.',
            steps: [
              'Paragraph 2: \'However, Gloomy had a problem. Try as he might, he could not rain.\'',
              'Gloomy\'s problem was that he could not rain.',
              'Write as a complete sentence: "Gloomy\'s problem was that he could not rain."',
            ],
            tip: 'The sentence right after "had a problem" explains the specific details of what the problem was.',
          },
        },
        {
          questionNo: '28',
          format: 'open',
          marks: 1,
          stem: "Which word in paragraph 3 has the same meaning as 'displeased'?",
          answer: 'annoyed',
          solution: {
            method: "Find a word in paragraph 3 that means the same as 'displeased' (unhappy, not satisfied).",
            steps: [
              'Paragraph 3: "Feeling annoyed because Wind ignored him, Gloomy asked Lightning to flash his light at Wind."',
              '"annoyed" means feeling irritated or unhappy → it has the same meaning as displeased.',
              'Therefore, the answer is annoyed.',
            ],
            tip: '"annoyed" is a synonym that is often used interchangeably with displeased.',
          },
        },
        {
          questionNo: '29',
          format: 'open',
          marks: 3,
          stem:
            'For (a) to (c), read each statement and tick "True" or "False".\n' +
            '(a) The villagers did not have enough water for their farms at first.\n' +
            '(b) Gloomy gathered the dark clouds over on his own.\n' +
            '(c) Wind immediately helped Gloomy when he asked for help.',
          answer: '(a) True  (b) False  (c) False',
          solution: {
            method: 'Compare each statement against the facts in paragraphs 2 and 3.',
            steps: [
              '(a) Paragraph 2: "The villagers below were waiting patiently for him to provide enough water for their farms." — At first, there was not enough water and they were waiting → True.',
              '(b) Paragraph 2: Gloomy did not do it alone — he "had no choice but to get help" and received help from Wind and Lightning to gather dark clouds → "on his own" is not true → False.',
              '(c) Paragraph 2: "Wind did not like to be told what to do so he ignored Gloomy." — Wind did not help immediately and ignored Gloomy → False.',
            ],
            tip: 'Be careful with absolute words like "on his own" and "immediately" — check that they match exactly with what the passage says.',
          },
        },
        {
          questionNo: '30',
          format: 'open',
          marks: 1,
          stem: 'Why was Gloomy angry at Wind?',
          answer:
            'Gloomy was angry at Wind because Wind ignored him (refused to blow the dark clouds towards him when he asked for help).',
          solution: {
            method: 'Find the reason why Gloomy was upset in the first part of paragraph 3.',
            steps: [
              'Paragraph 3: "Feeling annoyed because Wind ignored him..."',
              'Gloomy was annoyed because Wind ignored him (Wind ignored his request for help).',
              'Write the reason as a complete sentence.',
            ],
            tip: 'In \'Feeling [emotion] because ~\', the reason comes right after the word \'because\'.',
          },
        },
        {
          questionNo: '31',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks below to indicate the order in which the events happened in the story.\n' +
            '( ) A few dark clouds joined Gloomy.\n' +
            '( ) Lightning frightened Wind.\n' +
            '( ) Gloomy rained.',
          answer:
            'Lightning frightened Wind = 1; A few dark clouds joined Gloomy = 2; Gloomy rained = 3',
          solution: {
            method: 'Follow the order of events in Paragraph 3: Lightning flashes → clouds join → rain falls.',
            steps: [
              'Paragraph 3: "Gloomy asked Lightning to flash his light at Wind. As Wind was afraid of Lightning, he quickly blew the dark clouds towards Gloomy. As soon as the dark clouds joined Gloomy, the rain fell."',
              'First: Lightning flashed his light at Wind, making Wind afraid → Event 1.',
              'Next: (The frightened Wind blew the clouds over,) and the dark clouds joined Gloomy → Event 2.',
              'Finally: The rain fell → Event 3.',
            ],
            tip: '\'As soon as A, B\' means that B happened immediately after A (A = Event 2, B = Event 3).',
          },
        },
        {
          questionNo: '32',
          format: 'open',
          marks: 2,
          stem: 'Why did Gloomy feel satisfied after he had rained?',
          answer:
            'Gloomy felt satisfied because, with the help of the dark clouds, he had done a good job — the villagers now had enough water for their farming.',
          solution: {
            method: 'Look at the beginning of Paragraph 4 to find the reason why he felt satisfied.',
            steps: [
              'Paragraph 4: "Gloomy felt very happy and satisfied. With the help of the few dark clouds, he knew he had done a good job as the villagers had enough water for farming."',
              'Gloomy felt satisfied because he had done a good job (with the help of the dark clouds) and had given the villagers enough water for farming.',
              'Include both parts in your answer — that he did a good job AND that the villagers had enough water — and write it as a complete sentence.',
            ],
            tip: 'The \'as ~\' clause right after \'felt satisfied because ~\' gives the specific reason that supports why he felt that way.',
          },
        },
      ],
    },
  ],
};

export default wa1RosythPrimaryEnglish2023;
