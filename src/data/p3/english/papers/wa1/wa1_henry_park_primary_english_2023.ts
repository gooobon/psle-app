// =============================================================================
// Henry Park Primary School — 2023 Weighted Assessment 1 (English) — Primary 3
// Duration: 35 minutes / Total: 20 marks
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1HenryParkPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Henry Park Primary School',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 35,
    totalMarks: 20,
    sourcePages: 'pp.140-145',
  },
  items: [
    {
      kind: 'set',
      id: 'hp2023-secA-passageA',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Possessive Pronouns',
      instructions: 'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: hers | his | mine | ours | theirs | yours',
      passage: 'Sam and Ken were in class.\n\n\'Sam found several pencils on the floor and asked, "These pencils do not belong to me. Are they (1) ________?"\n\nKen replied, "No, they are not (2) ________. Meiling was doing her work here earlier. They could be (3) ________."\n\nSam said, "Besides Meiling, the Science Club members were here too. These pencils might be one of (4) ________." Ken nodded in agreement.',
      marks: 4,
      questions: [
        {
          questionNo: '1',
          format: 'fib',
          marks: 1,
          stem: 'Are they (1) ________? (Sam asking Ken)',
          answer: 'yours',
          solution: {
            method: 'Identify who Sam is asking — he is asking Ken directly, so "yours" is correct.',
            steps: [
              'Sam is asking Ken if the pencils belong to Ken.',
              'When asking someone if something belongs to them, use "yours".',
              'Answer: yours',
            ],
            tip: 'Use "yours" when asking someone if something belongs to them.',
          },
        },
        {
          questionNo: '2',
          format: 'fib',
          marks: 1,
          stem: 'No, they are not (2) ________.',
          answer: 'mine',
          solution: {
            method: 'Ken is saying the pencils do not belong to him — use "mine" (belonging to me).',
            steps: [
              'Ken is the speaker saying "they are not ___".',
              'Ken refers to himself → "mine" (= belonging to me).',
              'Answer: mine',
            ],
            tip: 'Use "mine" when the speaker refers to something belonging to themselves.',
          },
        },
        {
          questionNo: '3',
          format: 'fib',
          marks: 1,
          stem: 'Meiling was doing her work here earlier. They could be (3) ________.',
          answer: 'hers',
          solution: {
            method: 'Meiling is a girl (she/her) — the possessive pronoun is "hers".',
            steps: [
              'The pencils could belong to Meiling.',
              'Meiling is female and singular → possessive pronoun = "hers".',
              'Answer: hers',
            ],
            tip: 'Possessive pronouns: his (male), hers (female), theirs (plural).',
          },
        },
        {
          questionNo: '4',
          format: 'fib',
          marks: 1,
          stem: 'These pencils might be one of (4) ________ (Science Club members).',
          answer: 'theirs',
          solution: {
            method: 'Science Club members = plural group → use "theirs".',
            steps: [
              'The Science Club members are a group of people (plural).',
              'Possessive pronoun for a plural group = "theirs".',
              'Answer: theirs',
            ],
            tip: 'Use "theirs" for plural groups. "ours" includes the speaker, so it does not fit here.',
          },
        },
      ],
    },
    {
      kind: 'set',
      id: 'hp2023-secB-passageB',
      topic: 'GrammarCloze',
      title: 'Section B: Grammar Cloze — Verb Tenses',
      instructions: 'Read the passage below. Choose the correct form of the verb from the box. Word box: borrows | borrowed | borrow | was borrowing',
      passage: 'John loves visiting the library near his home. He (5) ________ several books each time he goes there. Two weeks ago, he (6) ________ a book about space. As he (7) ________ the books, the librarian commented that John was a good reader. Many children (8) ________ these books as they are interesting. John thanked the librarian before leaving.',
      marks: 4,
      questions: [
        {
          questionNo: '5',
          format: 'fib',
          marks: 1,
          stem: 'He (5) ________ several books each time he goes there.',
          answer: 'borrows',
          solution: {
            method: 'Subject "He" (singular) + repeated habit (each time) → Simple Present with -s.',
            steps: [
              '"each time he goes there" signals a repeated habit → Simple Present.',
              'Subject is "He" (third person singular) → add -s to the verb.',
              'borrow → borrows',
            ],
            tip: 'For repeated actions with "each time / every time", use Simple Present. Add -s for he/she/it.',
          },
        },
        {
          questionNo: '6',
          format: 'fib',
          marks: 1,
          stem: 'Two weeks ago, he (6) ________ a book about space.',
          answer: 'borrowed',
          solution: {
            method: '"Two weeks ago" is a past time signal → Simple Past.',
            steps: [
              '"Two weeks ago" clearly indicates past time.',
              'Simple Past of "borrow" = "borrowed".',
              'Answer: borrowed',
            ],
            tip: 'Time signals like "ago", "yesterday", "last week" indicate Simple Past tense.',
          },
        },
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: 'As he (7) ________ the books, the librarian commented.',
          answer: 'was borrowing',
          solution: {
            method: '"As he ___ the books, the librarian commented" — ongoing action interrupted by past event → Past Continuous.',
            steps: [
              '"As" + ongoing background action → Past Continuous (was/were + -ing).',
              'The librarian commenting is the interrupting event (Simple Past).',
              'He (singular) was borrowing → "was borrowing".',
            ],
            tip: 'Pattern: As + subject + was/were + -ing, Simple Past. The -ing action was in progress when the other happened.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'Many children (8) ________ these books as they are interesting.',
          answer: 'borrow',
          solution: {
            method: '"as they are interesting" = present general fact → Simple Present. Subject "Many children" is plural → base form.',
            steps: [
              '"as they are interesting" is a general present fact.',
              '"Many children" is a plural subject → no -s on the verb.',
              'Answer: borrow (base form for plural subjects).',
            ],
            tip: 'Plural subjects (children, people, students) use the base form of the verb in Simple Present.',
          },
        },
      ],
    },
    {
      kind: 'single',
      id: 'hp2023-q9',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 9,
      marks: 1,
      stem: 'Rewrite the two sentences as one using "but", without changing the meaning.\nAndy sprained his ankle during tennis practice. Andy did not cry.',
      answer: 'Andy sprained his ankle during tennis practice, but he did not cry.',
      solution: {
        method: 'Use "but" to join two contrasting ideas. Replace the repeated subject with a pronoun.',
        steps: [
          'The two events contrast — injury vs. no crying.',
          'Join with "but": "Andy sprained his ankle during tennis practice, but..."',
          'Replace the second "Andy" with "he" to avoid repetition.',
          'Full sentence: Andy sprained his ankle during tennis practice, but he did not cry.',
        ],
        tip: 'Use "but" for contrast. Replace repeated subject names with pronouns (Andy → he).',
      },
    },
    {
      kind: 'single',
      id: 'hp2023-q10',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 10,
      marks: 1,
      stem: 'Rewrite the two sentences as one, beginning with the given word, without changing the meaning.\nBen is a responsible class monitor. Dave is a responsible class monitor too.\nBoth ________________________________________.',
      answer: 'Both Ben and Dave are responsible class monitors.',
      solution: {
        method: 'Use "Both A and B" to combine two subjects sharing the same description.',
        steps: [
          'Both Ben and Dave share the same quality (responsible class monitor).',
          'Use: Both Ben and Dave are responsible class monitors.',
          'Change the verb from "is" to "are" (Both...and... = plural).',
          'Change "monitor" to "monitors" (plural noun).',
        ],
        tip: 'Both A and B = plural → use "are". Also change singular nouns to plural form.',
      },
    },
  ],
};

export default wa1HenryParkPrimaryEnglish2023;
