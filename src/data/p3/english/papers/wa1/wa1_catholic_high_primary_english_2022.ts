// =============================================================================
// src/data/p3/english/papers/wa1_catholic_high_primary_english_2022.ts
// Catholic High School (Primary) — Primary 3 English Language 2022 Weighted Assessment 1
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 292–296 (시험지 표지 p.1–5)
// Total: 30 marks (30 questions)
// ★ 공식 정답표(p298) 기준 30문항 전부 100% 일치 확인됨.
// 구성: A문법MCQ(10) B어휘MCQ(10) C문법클로즈(5) D어휘클로즈(5) = 30점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1CatholicHighPrimaryEnglish2022: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2022,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 30,
    sourcePages: 'pp.292–296 (paper pp.1–5)',
  },

  items: [
    // Section A: Grammar MCQ (10 x 1m) Q1-10
    {
      kind: 'single', id: 'chs22-q1', topic: 'GrammarMCQ', format: 'mcq', questionNo: 1, marks: 1,
      stem: 'Max and his friend ________ to East Coast Park every Saturday morning.',
      options: [{ label: '1', text: 'cycle' }, { label: '2', text: 'cycles' }, { label: '3', text: 'cycled' }, { label: '4', text: 'are cycling' }],
      answer: '1',
      solution: { method: "See solution.", steps: ["See solution.", "See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q2', topic: 'GrammarMCQ', format: 'mcq', questionNo: 2, marks: 1,
      stem: 'Every pupil in the school ________ to take his temperature daily.',
      options: [{ label: '1', text: 'has' }, { label: '2', text: 'had' }, { label: '3', text: 'have' }, { label: '4', text: 'are having' }],
      answer: '1',
      solution: { method: "See solution.", steps: ["See solution.", "See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q3', topic: 'GrammarMCQ', format: 'mcq', questionNo: 3, marks: 1,
      stem: '________ group of boys on the field over there is playing soccer.',
      options: [{ label: '1', text: 'This' }, { label: '2', text: 'That' }, { label: '3', text: 'These' }, { label: '4', text: 'Those' }],
      answer: '2',
      solution: { method: "See solution.", steps: ["See solution.", "See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q4', topic: 'GrammarMCQ', format: 'mcq', questionNo: 4, marks: 1,
      stem: 'I have taken my friend\'s worksheets by mistake. I will return ________ to him when I see him.',
      options: [{ label: '1', text: 'it' }, { label: '2', text: 'us' }, { label: '3', text: 'his' }, { label: '4', text: 'them' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q5', topic: 'GrammarMCQ', format: 'mcq', questionNo: 5, marks: 1,
      stem: 'Mother ________ in the kitchen when her mobile phone rang.',
      options: [{ label: '1', text: 'cooks' }, { label: '2', text: 'cooked' }, { label: '3', text: 'is cooking' }, { label: '4', text: 'was cooking' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q6', topic: 'GrammarMCQ', format: 'mcq', questionNo: 6, marks: 1,
      stem: 'Chitra misses her best friend, Nisha. It has been five years ________ she left Singapore.',
      options: [{ label: '1', text: 'but' }, { label: '2', text: 'after' }, { label: '3', text: 'since' }, { label: '4', text: 'although' }],
      answer: '3',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q7', topic: 'GrammarMCQ', format: 'mcq', questionNo: 7, marks: 1,
      stem: 'Wee Boon\'s father ________ for a meeting earlier in the day.',
      options: [{ label: '1', text: 'left' }, { label: '2', text: 'leave' }, { label: '3', text: 'leaves' }, { label: '4', text: 'is leaving' }],
      answer: '1',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q8', topic: 'GrammarMCQ', format: 'mcq', questionNo: 8, marks: 1,
      stem: '"There is still ________ shampoo left in the bottle. Use it first," my mother told my sister.',
      options: [{ label: '1', text: 'any' }, { label: '2', text: 'few' }, { label: '3', text: 'some' }, { label: '4', text: 'many' }],
      answer: '3',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q9', topic: 'GrammarMCQ', format: 'mcq', questionNo: 9, marks: 1,
      stem: 'During the December holidays, Sally went ________ a vacation to New York with her family.',
      options: [{ label: '1', text: 'in' }, { label: '2', text: 'at' }, { label: '3', text: 'by' }, { label: '4', text: 'on' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q10', topic: 'GrammarMCQ', format: 'mcq', questionNo: 10, marks: 1,
      stem: '"Children, you must do the homework by ________ and not discuss the answers," Mrs Loh said.',
      options: [{ label: '1', text: 'itself' }, { label: '2', text: 'yourself' }, { label: '3', text: 'ourselves' }, { label: '4', text: 'yourselves' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    // Section B: Vocabulary MCQ (10 x 1m) Q11-20
    {
      kind: 'single', id: 'chs22-q11', topic: 'VocabMCQ', format: 'mcq', questionNo: 11, marks: 1,
      stem: 'The thief ________ towards the back door when he heard the police siren.',
      options: [{ label: '1', text: 'bolted' }, { label: '2', text: 'strolled' }, { label: '3', text: 'trudged' }, { label: '4', text: 'stomped' }],
      answer: '1',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q12', topic: 'VocabMCQ', format: 'mcq', questionNo: 12, marks: 1,
      stem: 'Some of the customers were unhappy with the service in the restaurant. They ________ about the poor service to the owner.',
      options: [{ label: '1', text: 'fussed' }, { label: '2', text: 'sobbed' }, { label: '3', text: 'nagged' }, { label: '4', text: 'grumbled' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q13', topic: 'VocabMCQ', format: 'mcq', questionNo: 13, marks: 1,
      stem: 'My brother gobbled the chocolate cake ________ as he was very hungry after lessons.',
      options: [{ label: '1', text: 'slowly' }, { label: '2', text: 'untidily' }, { label: '3', text: 'greedily' }, { label: '4', text: 'carelessly' }],
      answer: '3',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q14', topic: 'VocabMCQ', format: 'mcq', questionNo: 14, marks: 1,
      stem: '"Please ________ the volume of the television. I\'m trying to do my homework," I told my sister.',
      options: [{ label: '1', text: 'turn up' }, { label: '2', text: 'turn over' }, { label: '3', text: 'turn away' }, { label: '4', text: 'turn down' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q15', topic: 'VocabMCQ', format: 'mcq', questionNo: 15, marks: 1,
      stem: 'Gopal is unable to read without his glasses. He is blind like a ________.',
      options: [{ label: '1', text: 'bat' }, { label: '2', text: 'fox' }, { label: '3', text: 'pig' }, { label: '4', text: 'owl' }],
      answer: '1',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q16', topic: 'VocabMCQ', format: 'mcq', questionNo: 16, marks: 1,
      stem: 'I felt a ________ of water fall on my hand. I think we need to hurry as it might rain soon.',
      options: [{ label: '1', text: 'pool' }, { label: '2', text: 'drop' }, { label: '3', text: 'splash' }, { label: '4', text: 'puddle' }],
      answer: '2',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q17', topic: 'VocabMCQ', format: 'mcq', questionNo: 17, marks: 1,
      stem: 'Betty towers over her older brother. She is ________.',
      options: [{ label: '1', text: 'as tall as a giraffe' }, { label: '2', text: 'as wise as an owl' }, { label: '3', text: 'as big as an elephant' }, { label: '4', text: 'as proud as a peacock' }],
      answer: '1',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q18', topic: 'VocabMCQ', format: 'mcq', questionNo: 18, marks: 1,
      stem: 'Aaron spilled some hot coffee on himself and as a result has ________ his leg.',
      options: [{ label: '1', text: 'blazed' }, { label: '2', text: 'twisted' }, { label: '3', text: 'scalded' }, { label: '4', text: 'sprained' }],
      answer: '3',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q19', topic: 'VocabMCQ', format: 'mcq', questionNo: 19, marks: 1,
      stem: 'John is a ________ class monitor. You can trust him to take care of the class when the teacher is not around.',
      options: [{ label: '1', text: 'polite' }, { label: '2', text: 'strong' }, { label: '3', text: 'pleasant' }, { label: '4', text: 'responsible' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    {
      kind: 'single', id: 'chs22-q20', topic: 'VocabMCQ', format: 'mcq', questionNo: 20, marks: 1,
      stem: '"Smoking is ________ to your health. You should slowly quit smoking," the doctor advised my father.',
      options: [{ label: '1', text: 'fearful' }, { label: '2', text: 'hurtful' }, { label: '3', text: 'painful' }, { label: '4', text: 'harmful' }],
      answer: '4',
      solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." },
    },
    // Section C: Grammar Cloze (5 x 1m) Q21-25
    {
      kind: 'set',
      id: 'chs22-secC',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze',
      instructions: 'Box: (A) I  (B) it  (C) my  (D) us  (E) we',
      passage: '"Preventing food wastage is important," Miss Yeo told our class. She told (21) ________ that we would be participating in the \'Clean Plate\' campaign.\n\nMiss Yeo instructed all of us to order only what (22) ________ could finish to avoid wastage. When I got home, I told (23) ________ mother about the campaign. She was happy as (24) ________ will teach me good eating habits. The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign. I was proud to be part of this campaign.\n\n(Adapted from http://surl.li/bdxaw)',
      marks: 5,
      questions: [
        { questionNo: '21', format: 'fib', marks: 1, stem: 'She told (21) ________ that we would be participating...', answer: 'D',
          solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." } },
        { questionNo: '22', format: 'fib', marks: 1, stem: 'order only what (22) ________ could finish', answer: 'E',
          solution: { method: "See solution.", steps: ['"only what all of us can eat" → we.', "See solution."], tip: "See solution." } },
        { questionNo: '23', format: 'fib', marks: 1, stem: 'I told (23) ________ mother about the campaign.', answer: 'C',
          solution: { method: "See solution.", steps: ['"told ___ mother" → "to my mother" → my.', "See solution."], tip: "See solution." } },
        { questionNo: '24', format: 'fib', marks: 1, stem: 'She was happy as (24) ________ will teach me good eating habits.', answer: 'B',
          solution: { method: "See solution.", steps: ['"it (the campaign) will teach me good eating habits" → it.', "See solution."], tip: "See solution." } },
        { questionNo: '25', format: 'fib', marks: 1, stem: 'The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign.', answer: 'A',
          solution: { method: "See solution.", steps: ['"I waited for Miss Yeo" → I.', "See solution."], tip: "See solution." } },
      ],
    },
    // Section D: Vocabulary Cloze (5 x 1m) Q26-30
    {
      kind: 'set',
      id: 'chs22-secD',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions: 'Box: (A) carried  (B) medicine  (C) pet  (D) scratches  (E) whining',
      passage: 'Hazel adored animals. She wanted to own a (26) ________, but her parents could not afford to buy one. One day, Hazel was at the park when she heard an animal (27) ________ in pain. It was a stray puppy with many (28) ________ on its body. She gently (29) ________ the puppy to a veterinary clinic nearby. The vet applied some (30) ________ on the scratches. After the visit, Hazel decided to keep the puppy.',
      marks: 5,
      questions: [
        { questionNo: '26', format: 'fib', marks: 1, stem: 'She wanted to own a (26) ________', answer: 'C',
          solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." } },
        { questionNo: '27', format: 'fib', marks: 1, stem: 'she heard an animal (27) ________ in pain', answer: 'E',
          solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." } },
        { questionNo: '28', format: 'fib', marks: 1, stem: 'a stray puppy with many (28) ________ on its body', answer: 'D',
          solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." } },
        { questionNo: '29', format: 'fib', marks: 1, stem: 'She gently (29) ________ the puppy to a veterinary clinic nearby.', answer: 'A',
          solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." } },
        { questionNo: '30', format: 'fib', marks: 1, stem: 'The vet applied some (30) ________ on the scratches.', answer: 'B',
          solution: { method: "See solution.", steps: ["See solution.", "See solution."], tip: "See solution." } },
      ],
    },
  ],
};

export default wa1CatholicHighPrimaryEnglish2022;
