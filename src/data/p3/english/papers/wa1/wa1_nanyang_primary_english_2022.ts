// =============================================================================
// src/data/p3/english/papers/wa1_nanyang_primary_english_2022.ts
// Nanyang Primary School — 2022 Term 1 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 273–279 (시험지 표지 p.1–5)
// Duration: 30 minutes / Total: 20 marks
// ★ 공식 정답표(p289) 기준 20문항 전부 100% 일치 확인됨.
// 구성: A문법(4) B어휘(4) C전치사클로즈(4) D주술일치클로즈(4) E교정(4) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1NanyangPrimaryEnglish2022: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2022,
    assessment: 'Term 1 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 30,
    totalMarks: 20,
    sourcePages: 'pp.273–279 (paper pp.1–5)',
  },

  items: [
    // (A) Grammar Q1-4
    {
      kind: 'single', id: 'ny22wa1-q1', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 1, marks: 1,
      stem: 'Tom ________ as he was unwrapping the present and saw it was what he had wanted.',
      options: [{ label: '1', text: 'cheer' }, { label: '2', text: 'cheers' }, { label: '3', text: 'cheered' }, { label: '4', text: 'is cheering' }],
      answer: '3',
      solution: { method: 'Choose the correct tense to match "was unwrapping" (Past Continuous) + "saw" (Simple Past).', steps: ['Both "was unwrapping" (Past Continuous) and "saw" (Simple Past) describe actions in the past.', 'Tom cheering also happened at the same past moment → cheered (Simple Past) → Answer (3).'], tip: 'If the whole passage is in the past, use the past tense form in the blank as well.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q2', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 2, marks: 1,
      stem: 'My sister prefers to complete the work ________ instead of asking for help.',
      options: [{ label: '1', text: 'herself' }, { label: '2', text: 'himself' }, { label: '3', text: 'ourselves' }, { label: '4', text: 'themselves' }],
      answer: '1',
      solution: { method: 'Choose the correct reflexive pronoun to match "My sister" (3rd person female singular).', steps: ['"My sister" is 3rd person female singular → herself.', 'Therefore, the answer is (1) herself.'], tip: 'she/sister → herself' },
    },
    {
      kind: 'single', id: 'ny22wa1-q3', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 3, marks: 1,
      stem: 'Mother baked ________ mouth-watering apple pies on that table for our housewarming party.',
      options: [{ label: '1', text: 'this' }, { label: '2', text: 'that' }, { label: '3', text: 'these' }, { label: '4', text: 'those' }],
      answer: '4',
      solution: { method: 'Look at "apple pies" (plural) + "that table" (over there, far away).', steps: ['"apple pies" is plural → it must be either these or those.', '"on that table" (far away) → those → Answer (4).'], tip: 'When referring to plural objects on a table that is far away, use those.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q4', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 4, marks: 1,
      stem: 'Feeling anxious, Fiona took in ________ deep breaths before her performance.',
      options: [{ label: '1', text: 'any' }, { label: '2', text: 'much' }, { label: '3', text: 'a few' }, { label: '4', text: 'a little' }],
      answer: '3',
      solution: { method: 'Choose the correct quantity expression to match "deep breaths" (countable plural).', steps: ['"breaths" is a countable plural noun → much and a little are for uncountable nouns, so they cannot be used.', '"a few" = a small number of (used with countable plural nouns) → "took a few deep breaths" sounds natural → Answer (3).'], tip: '"take a few deep breaths" is a fixed expression used to describe breathing deeply a few times when feeling anxious.' },
    },
    // (B) Vocabulary Q5-8
    {
      kind: 'single', id: 'ny22wa1-q5', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 5, marks: 1,
      stem: 'The ________ warrior defeated all his enemies.',
      options: [{ label: '1', text: 'loud' }, { label: '2', text: 'invisible' }, { label: '3', text: 'invincible' }, { label: '4', text: 'unfriendly' }],
      answer: '3',
      solution: { method: 'For \'defeated all enemies\', choose an adjective that describes the warrior\'s characteristic.', steps: ['\'Defeated all his enemies\' (beat every opponent) → never loses / cannot be beaten.', '\'Invincible\' = unbeatable, cannot be conquered → matches exactly → Answer (3).'], tip: '\'Invincible\' comes from \'in- (not) + vincible (able to be conquered)\', meaning \'cannot be conquered / unbeatable\'.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q6', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 6, marks: 1,
      stem: 'Eating a ________ mushroom is deadly.',
      options: [{ label: '1', text: 'wild' }, { label: '2', text: 'bitter' }, { label: '3', text: 'poisonous' }, { label: '4', text: 'overcooked' }],
      answer: '3',
      solution: { method: 'For \'eating it will cause death\', choose the adjective that matches this result about the mushroom.', steps: ['\'Is deadly\' (causes death) → something must be poisonous to be deadly.', '\'Poisonous\' = contains poison → matches exactly → Answer (3).'], tip: '\'Deadly\' (causes death) naturally pairs with \'poisonous\' (contains poison).' },
    },
    {
      kind: 'single', id: 'ny22wa1-q7', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 7, marks: 1,
      stem: "The class roared with laughter when the teacher's stomach ________.",
      options: [{ label: '1', text: 'jumbled' }, { label: '2', text: 'rumbled' }, { label: '3', text: 'fumbled' }, { label: '4', text: 'crumbled' }],
      answer: '2',
      solution: { method: '배에서 꾸르륵 소리가 나는 동사를 고른다.', steps: ['"roared with laughter"(반 전체가 폭소) → 웃음의 원인은 선생님 배에서 소리가 남.', '"rumbled" = (배에서) 꾸르륵거리다 → 정답 (2).'], tip: '"stomach rumbled"는 배에서 꾸르륵 소리가 나는 것을 나타냅니다.' },
    },
    {
      kind: 'single', id: 'ny22wa1-q8', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 8, marks: 1,
      stem: '"Shall we go on a ________ through the park?" Brother suggested as he put on his walking shoes.',
      options: [{ label: '1', text: 'stroll' }, { label: '2', text: 'swim' }, { label: '3', text: 'climb' }, { label: '4', text: 'picnic' }],
      answer: '1',
      solution: { method: '"through the park"(공원을 통해)와 "walking shoes"(걷는 신발)에 맞는 단어를 고른다.', steps: ['"put on his walking shoes"(걷는 신발 착용) → 걷는 활동.', '"through the park"(공원을 거니는) + "stroll"(산책) → 정확히 일치 → 정답 (1).'], tip: '"go on a stroll through the park"는 공원을 거닐다는 표현입니다.' },
    },
    // (C) Grammar Cloze – Prepositions Q9-12
    {
      kind: 'set',
      id: 'ny22wa1-secC',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Prepositions',
      instructions: 'Box: (A) up  (B) to  (C) down  (D) from  (E) under  (F) between',
      passage: '"Twenty, nineteen, eighteen..." Bob started counting (9) ________ loudly. Carol and I grinned as we signalled (10) ________ each other the possible hiding spots. "Should I hide under the blanket? No, that\'s too easy to find," I thought.\n\nJust then, I spotted a better location (11) ________ the corner of my eye. "The gap (12) ________ the wall and cupboard!" I giggled and scrambled to my new hideout.\n\n"Ready? I\'m coming!" Bob exclaimed.',
      marks: 4,
      questions: [
        { questionNo: '9', format: 'fib', marks: 1, stem: 'Bob started counting (9) ________ loudly.', answer: 'C',
          solution: { method: 'For \'countdown\' (numbers going down), choose the correct phrasal verb.', steps: ['\'Twenty, nineteen, eighteen...\' is counting downward → \'counting down\'.', 'Among the choices, \'down\' is option (C) → Answer (C).'], tip: '\'Count down\' means to count backwards, with numbers getting smaller.' } },
        { questionNo: '10', format: 'fib', marks: 1, stem: 'Carol and I grinned as we signalled (10) ________ each other the possible hiding spots.', answer: 'B',
          solution: { method: 'Choose the correct preposition for \'to send a signal\'.', steps: ['\'Signal to someone\' = to send a signal to a person → this is a fixed expression.', 'Among the choices, \'to\' is option (B) → Answer (B).'], tip: '"signal to" is an expression meaning to give a signal to someone.' } },
        { questionNo: '11', format: 'fib', marks: 1, stem: 'I spotted a better location (11) ________ the corner of my eye.', answer: 'D',
          solution: { method: 'Choose the correct preposition that fits the expression "from the corner of the eye".', steps: ['"from the corner of my eye" means to look sideways or out of the corner of your eye. It is a fixed idiom.', 'From the choices, "from" is option (D), so the answer is (D).'], tip: '"from the corner of one\'s eye" is an idiom meaning to look at something sideways, without turning your head fully.' } },
        { questionNo: '12', format: 'fib', marks: 1, stem: 'The gap (12) ________ the wall and cupboard!', answer: 'F',
          solution: { method: 'Choose the correct preposition that fits "the gap between the wall and the cupboard".', steps: ['"the gap between A and B" means the space or gap between A and B. This is a fixed expression.', 'From the choices, "between" is option (F), so the answer is (F).'], tip: '"between A and B" is used to show the space or position separating two things.' } },
      ],
    },
    // (D) Grammar Cloze – SVA Q13-16
    {
      kind: 'set',
      id: 'ny22wa1-secD',
      topic: 'GrammarCloze',
      title: '(D) Grammar Cloze — Subject-Verb Agreement',
      instructions: 'Underline the correct word from the given words in the brackets.',
      passage: 'Superheroes (13) [come / comes] in all shapes and sizes. Sometimes, they even (14) [has / have] tails! Dogs can be superheroes too, and their keen sense of smell (15) [is / are] their superpower.\n\nOn October 11, 2021, a dog named Rocky (16) [was / were] presented with the "Animal of the Year" award. Rocky had helped to save over a hundred koalas from the Australian bushfires between 2019 and 2020.\n\nFor its bravery, it received a year\'s worth of dog treats!\n\n(Adapted from dogonews.com, 2021)',
      marks: 4,
      questions: [
        { questionNo: '13', format: 'fib', marks: 1, stem: 'Superheroes (13) [come / comes] in all shapes and sizes.', answer: 'come',
          solution: { method: '"Superheroes" is plural, so we use the base form of the verb.', steps: ['Plural Subject + Simple Present → use "come" (base form).'], tip: 'With a plural subject, do not add -s to the verb.' } },
        { questionNo: '14', format: 'fib', marks: 1, stem: 'Sometimes, they even (14) [has / have] tails!', answer: 'have',
          solution: { method: '"they" is plural, so we use "have".', steps: ['"they" is plural, so we use "have".'], tip: '"they" → use "have" ("has" is used with singular subjects only).' } },
        { questionNo: '15', format: 'fib', marks: 1, stem: 'their keen sense of smell (15) [is / are] their superpower.', answer: 'is',
          solution: { method: 'Look at the key noun \'sense of smell\' (singular key noun).', steps: ['\'sense\' is the key noun (singular) → use is.'], tip: 'In an \'A of B\' structure, A (the key noun) determines the verb.' } },
        { questionNo: '16', format: 'fib', marks: 1, stem: 'a dog named Rocky (16) [was / were] presented with the "Animal of the Year" award.', answer: 'was',
          solution: { method: 'Look at \'a dog\' (singular) + past tense.', steps: ['Singular subject + past tense be verb → was.'], tip: 'The past tense be verb for a singular subject is was.' } },
      ],
    },
    // (E) Editing Q17-20
    {
      kind: 'set',
      id: 'ny22wa1-secE',
      topic: 'Editing',
      title: '(E) Editing for Spelling',
      instructions: 'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage: 'It was David\'s family outing day! At the beach, his father\'s arm (17) [musels] were put to good use as he carried their belongings from the car to their (18) [favurit] spot. His mother quickly set up the picnic mat and placed the containers of food on it. She asked cheekily, "David, feeling (19) [hangree] yet?"\n\nDavid nodded eagerly and squealed at the (20) [feest] prepared. There were tuna sandwiches, egg salad, and even a whole roasted chicken! "Let\'s dig in!" Father suggested.',
      marks: 4,
      questions: [
        { questionNo: '17', format: 'editing', marks: 1, stem: 'his father\'s arm [musels] were put to good use', answer: 'muscles',
          solution: { method: 'Check the correct spelling of \'muscle\'.', steps: ['Incorrect spelling: musels.', 'Correct word: muscles — m-u-s-c-l-e-s.'], tip: 'muscles is spelled \'musc-les\' — remember the letter c.' } },
        { questionNo: '18', format: 'editing', marks: 1, stem: 'their [favurit] spot', answer: 'favourite',
          solution: { method: 'Check the correct spelling of the word \'favourite\'.', steps: ['Incorrect spelling: favurit.', 'Correct word: favourite — f-a-v-o-u-r-i-t-e.'], tip: 'favourite is spelled \'fav-our-ite\'.' } },
        { questionNo: '19', format: 'editing', marks: 1, stem: '"David, feeling [hangree] yet?"', answer: 'hungry',
          solution: { method: 'Check the correct spelling of the word \'hungry\'.', steps: ['Incorrect spelling: hangree.', 'Correct word: hungry — h-u-n-g-r-y.'], tip: 'hungry is spelled as \'hung-ry\'.' } },
        { questionNo: '20', format: 'editing', marks: 1, stem: 'David nodded eagerly and squealed at the [feest] prepared.', answer: 'feast',
          solution: { method: 'Check the correct spelling of the word \'feast / banquet\'.', steps: ['Incorrect spelling: feest.', 'Correct word: feast — f-e-a-s-t (spelled with ea).'], tip: 'feast is spelled as \'fe-ast\', using ea and not ee.' } },
      ],
    },
  ],
};

export default wa1NanyangPrimaryEnglish2022;
