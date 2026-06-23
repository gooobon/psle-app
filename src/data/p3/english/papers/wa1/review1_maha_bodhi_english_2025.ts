// =============================================================================
// src/data/p3/english/papers/review1_maha_bodhi_english_2025.ts
// Maha Bodhi School — 2025 Weighted Assessment 1, English Language Review (1) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 235–241 (시험지 표지 p.1~6, 8~11)
// Duration: 50 minutes / Total: 30 marks / Date: 7 May 2025
// ★ 공식 정답표(p243) 기준 Q1-2, Q14-Q29 확인됨.
// ⚠ Q3-Q13(Section A Q3-6, Section B Q7-11, Section C Q12-13): 원본 인쇄 p2-5가
//   PDF에서 별도 페이지로 분리 스캔되어 원문 확인 불가 → parentVerify: true 처리.
//   정답만 정답표 기준으로 기재 (Q3=1, Q4=4, Q5=4, Q6=2, Q7=3, Q8=3, Q9=4, Q10=4, Q11=1, Q12=2, Q13=4).
// 듣기·작문 제외. 확인된 문제는 100% 전사 + 상세 solution 포함.
// 구성: A문법(6) B어휘(5) C문장부호(2) D문법클로즈(4) E어휘클로즈(5) F독해(8) = 30점
// =============================================================================

import type { EnglishPaper } from '../types';

export const review1MahaBodhiEnglish2025: EnglishPaper = {
  meta: {
    school: 'Maha Bodhi School',
    year: 2025,
    assessment: 'Weighted Assessment 1 — English Language Review (1)',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 30,
    sourcePages: 'pp.235–241 (paper pp.1, 6–11)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar (6 x 1 mark) — Q1–6
    // Q1-2는 원문 확인됨 / Q3-6는 원문 미확인 (parentVerify)
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2025-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Last Thursday, my friends and I ________ to the cinema.',
      options: [
        { label: '1', text: 'go' },
        { label: '2', text: 'went' },
        { label: '3', text: 'are going' },
        { label: '4', text: 'were going' },
      ],
      answer: '2',
      solution: {
        method: 'Identify the correct verb tense to match the past time signal "Last Thursday".',
        steps: [
          '"Last Thursday" shows a clear point in the past.',
          'The Simple Past form of "go" is "went".',
          'Therefore, "my friends and I went to the cinema" → Answer: (2) went.',
        ],
        tip: '"Last + time expression" is used with Simple Past tense (went, made, was, etc.).',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Ruby ________ when her cat jumped onto her bed.',
      options: [
        { label: '1', text: 'slept' },
        { label: '2', text: 'sleeps' },
        { label: '3', text: 'is sleeping' },
        { label: '4', text: 'was sleeping' },
      ],
      answer: '4',
      solution: {
        method: '"when + past event" describes an action that was already in progress when the past event happened.',
        steps: [
          '"when her cat jumped onto her bed" — "jumped" refers to a single moment in the past.',
          'At that moment, Ruby was in the middle of sleeping → Past Continuous tense is used.',
          'The subject "Ruby" is singular → "was sleeping" → Answer: (4).',
        ],
        tip: 'When using "when + Simple Past (a single moment in the past)", the action already in progress is written as was/were + -ing.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '(Original question not available — based on answer key, the correct answer is: (1))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '1',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — confirmed as Answer (1) based on official answer key.',
        steps: ['Corresponding page from original printed PDF p2-5 not found.', 'Based on official answer key (p243): Q3 Answer = (1).'],
        tip: 'Please check with a parent to update the original text and answer options.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: '(Original text not verified — Answer based on answer key: (4))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — Answer based on official answer key: (4).',
        steps: ['Based on official answer key (p243): Q4 Answer = (4).'],
        tip: 'Please check with a parent to update the original text and answer options.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: '(Original text not verified — Answer based on answer key: (4))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: 'Original text not confirmed — Answer is (4) based on official answer key.',
        steps: ['Based on official answer key (p243): Q5 answer = (4).'],
        tip: 'Please check the original text and options after parent verification.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: '(Original text not confirmed — Answer based on answer key: (2))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '2',
      parentVerify: true,
      solution: {
        method: 'Original text not confirmed — Answer is (2) based on official answer key.',
        steps: ['Based on official answer key (p243): Q6 answer = (2).'],
        tip: 'Please check the original text and options after parent verification.',
      },
    },

    // =========================================================================
    // Section B: Vocabulary (5 x 1 mark) — Q7–11 (원문 미확인)
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2025-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: '(Original text not confirmed — Answer based on answer key: (3))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '3',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — answer is (3) based on official answer key.',
        steps: ['Based on official answer key (p243): Q7 answer = (3).'],
        tip: 'Please update the original text and options after parent verification.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: '(Original text not verified — answer based on answer key: (3))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '3',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — answer is (3) based on official answer key.',
        steps: ['Based on official answer key (p243): Q8 answer = (3).'],
        tip: 'Please update the original text and options after parent verification.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: '(Original text not verified — answer based on answer key: (4))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: 'Original question not verified — answer is (4) based on official answer key.',
        steps: ['Based on official answer key (p243): Q9 answer = (4).'],
        tip: 'Please check the original question and options after parent verification.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: '(Original question not verified — answer based on answer key: (4))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: 'Original question not verified — answer is (4) based on official answer key.',
        steps: ['Based on official answer key (p243): Q10 answer = (4).'],
        tip: 'Please check the original question and options after parent verification.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: '(Original text not verified — answer based on answer key: (1))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '1',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — correct answer based on official answer key: (1).',
        steps: ['Based on official answer key (p243): Q11 answer = (1).'],
        tip: 'Please check with a parent to update the original question and options.',
      },
    },

    // =========================================================================
    // Section C: Punctuation (2 x 1 mark) — Q12–13 (원문 미확인)
    // =========================================================================
    {
      kind: 'single',
      id: 'mb2025-q12',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem: '(Original text not verified — answer based on answer key: (2))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '2',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — correct answer based on official answer key: (2).',
        steps: ['Based on official answer key (p243): Q12 answer = (2).'],
        tip: 'Update the original text and answer options after parent verification.',
      },
    },
    {
      kind: 'single',
      id: 'mb2025-q13',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: '(Original text not verified — answer based on official answer key: (4))',
      options: [
        { label: '1', text: '(Option 1)' },
        { label: '2', text: '(Option 2)' },
        { label: '3', text: '(Option 3)' },
        { label: '4', text: '(Option 4)' },
      ],
      answer: '4',
      parentVerify: true,
      solution: {
        method: 'Original text not verified — answer is (4) based on official answer key.',
        steps: ['Based on official answer key (p243): Q13 answer = (4).'],
        tip: 'Update the original text and answer options after parent verification.',
      },
    },

    // =========================================================================
    // Section D: Grammar Cloze (4 x 1 mark) — Q14–17
    // 보기: his, hers, ours, mine, theirs, yours
    // 지문: Tom and Mary 연습장 이야기 (p236 확인됨)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2025-secD-cloze',
      topic: 'GrammarCloze',
      title: 'Section D: Grammar Cloze — Possessive Pronouns',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write the answer in the blanks provided. Each word can only be used once. Box: his | hers | ours | mine | theirs | yours',
      passage:
        'The leaders gave out the practice books. Tom and Mary did not receive (14) ________, so both approached the teacher. Only one book without a name was with the teacher. Tom flipped through the pages and realised it was not (15) ________. He told Mary that the book had to be (16) ________. Mary looked at the pages and exclaimed, "Yes! It\'s (17) ________!"\n\n' +
        '"Tom, your book is on your desk!" his classmate exclaimed.\n\n' +
        'Feeling relieved, Tom returned to his seat to get ready for the lesson.',
      marks: 4,
      questions: [
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: 'Tom and Mary did not receive (14) ________, so both approached the teacher.',
          answer: 'theirs',
          solution: {
            method: 'Choose the possessive pronoun that refers to both Tom and Mary together.',
            steps: [
              'Both Tom and Mary did not receive theirs → \'belonging to both of them (theirs)\'.',
              '\'they did not receive theirs\' (each of them did not receive what belonged to them) → theirs.',
              'Therefore, the answer is theirs. (Confirmed by official answer key)',
            ],
            tip: 'Since \'both approached the teacher\' refers to two people together, the correct possessive pronoun is theirs.',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: 'Tom flipped through the pages and realised it was not (15) ________.',
          answer: 'his',
          solution: {
            method: 'Choose the possessive pronoun that checks whether something belongs to Tom himself.',
            steps: [
              'Tom was flipping through the pages when he realised, \'This is not mine.\'',
              'The possessive pronoun referring to Tom is \'his\'.',
              'Therefore, \'it was not his\' → the answer is his. (Confirmed in the official answer key)',
            ],
            tip: 'Tom is a male singular noun, so his possession is shown using \'his\'.',
          },
        },
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'He told Mary that the book had to be (16) ________.',
          answer: 'hers',
          solution: {
            method: 'Choose the possessive pronoun where Tom says to Mary, \'This is yours.\'',
            steps: [
              'Tom confirmed it was not his → so he concluded it must belong to Mary.',
              'Mary is a female singular noun, so the possessive pronoun referring to her is \'hers\'.',
              'Therefore, \'the book had to be hers\' → the answer is hers. (Confirmed in the official answer key)',
            ],
            tip: 'Mary is a female singular noun, so her possession is shown using \'hers\'.',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'Mary looked at the pages and exclaimed, "Yes! It\'s (17) ________!"',
          answer: 'mine',
          solution: {
            method: 'Choose the possessive pronoun where Mary checks for herself and calls out, \'Mine!\'',
            steps: [
              'Mary checked the pages herself and called out, \'Yes, this is mine!\'',
              'The possessive pronoun used when the speaker refers to something belonging to themselves is \'mine\'.',
              'Therefore, \'It\'s mine!\' → the answer is mine. (Confirmed in the official answer key)',
            ],
            tip: '\'mine\' is a possessive pronoun used when the speaker confirms or claims that something belongs to themselves.',
          },
        },
      ],
    },

    // =========================================================================
    // Section E: Vocabulary Cloze (5 x 1 mark) — Q18–22
    // 보기: perching, huge, delicious, sly, beautiful, wide, talented, climbing (8개 중 5개)
    // 지문: 원숭이와 까마귀 이야기 (p237 확인됨)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2025-secE-vcloze',
      topic: 'VocabCloze',
      title: 'Section E: Vocabulary Cloze',
      instructions:
        'Read the passage carefully. Choose the best word from the box and write the answer in the blanks provided. Each word can only be used once. Box: perching | huge | delicious | sly | beautiful | wide | talented | climbing',
      passage:
        'A hungry monkey was searching for food. He saw a crow with black feathers (18) ________ on the branch of a tree. What caught his attention was the piece of banana in the crow\'s beak.\n\n' +
        '"No need to search any further," thought the (19) ________ monkey. He was going to trick the crow into giving him the banana.\n\n' +
        'He walked to the bottom of the tree and cried, "Good morning, you\'re such a (20) ________ bird with your shiny black feathers! I\'m sure you have a lovely voice too!"\n\n' +
        'The crow was so pleased to hear the praise and decided to sing for the monkey. She opened its beak (21) ________, all ready to sing. Just then, the banana fell out of her mouth and straight into his.\n\n' +
        'The monkey licked his mouth after eating the piece of (22) ________ banana. After thanking the crow, the monkey walked away.',
      marks: 5,
      questions: [
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: 'He saw a crow with black feathers (18) ________ on the branch of a tree.',
          answer: 'perching',
          solution: {
            method: 'Choose the verb that describes a bird sitting on a branch.',
            steps: [
              '"perching on the branch" means a bird is sitting/resting on a branch.',
              '"Perch" is the exact word used to describe a bird sitting/resting on a branch, rod, or similar object.',
              'Therefore, the answer for the blank is "perching". (Confirmed from official answer key)',
            ],
            tip: '"Perching" describes the action of a bird sitting/resting on something thin, like a branch or a wire.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: '"No need to search any further," thought the (19) ________ monkey.',
          answer: 'sly',
          solution: {
            method: '"Trying to trick the crow to get the banana" — choose an adjective that describes the monkey\'s character.',
            steps: [
              '"He was going to trick the crow" tells us the monkey wanted to deceive the crow — this means the monkey is cunning.',
              '"Sly" means cunning or sneaky — this matches perfectly.',
              'Therefore, the answer for the blank is "sly". (Confirmed from official answer key)',
            ],
            tip: '"Trick" (to deceive) and "sly" (cunning/sneaky) are a natural and common word pair.',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: '"Good morning, you\'re such a (20) ________ bird with your shiny black feathers!"',
          answer: 'beautiful',
          solution: {
            method: '"Shiny black feathers" — choose an adjective that is used to compliment them.',
            steps: [
              'Complimenting "shiny black feathers" means praising the crow\'s appearance.',
              '"Beautiful" means attractive or lovely — it fits naturally as a compliment about feathers and appearance.',
              'Therefore, the answer for the blank is "beautiful". (Confirmed from official answer key)',
            ],
            tip: 'When complimenting appearance (especially feathers or fur), "beautiful" is the most natural word to use.',
          },
        },
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'She opened its beak (21) ________, all ready to sing.',
          answer: 'wide',
          solution: {
            method: '"Opened his mouth wide to sing" — choose the word that best fits this description.',
            steps: [
              '"opened its beak ___, all ready to sing" — the bird opened its beak wide, ready to sing.',
              '"opened wide" means to open something fully → similar to the expression "open one\'s mouth wide".',
              'Therefore, the answer for the blank is wide. (Confirmed from official answer key)',
            ],
            tip: '"open wide" is an expression that describes the action of opening one\'s mouth (or beak) as wide as possible.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'The monkey licked his mouth after eating the piece of (22) ________ banana.',
          answer: 'delicious',
          solution: {
            method: '"licked his lips" — choose a describing word (adjective) for the banana that matches this action.',
            steps: [
              '"licked his mouth" means he licked his lips → showing that something tasted so good he licked his lips.',
              '"delicious" means very tasty → connects naturally with "licked his mouth".',
              'Therefore, the answer for the blank is delicious. (The remaining words huge, talented, and climbing are not used — confirmed from official answer key)',
            ],
            tip: '"licked his lips/mouth after eating" shows that the food tasted very good.',
          },
        },
      ],
    },

    // =========================================================================
    // Section F: Comprehension Open-Ended (8 marks) — Q23–29
    // 지문: Ivan the Gorilla (pp.238-239 확인됨)
    // =========================================================================
    {
      kind: 'set',
      id: 'mb2025-secF-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section F: Comprehension Open-Ended — Ivan the Gorilla',
      instructions:
        'Read the passage carefully and annotate it. Answer the following questions in complete sentences. Your answers must be based on the passage read.',
      passage:
        'Ivan the gorilla had always been alone. He could not believe his eyes when he entered the new enclosure and saw three female gorillas and a young male. They stared at him, pointing and hooting. Kinyani, the largest among the female gorillas, terrified Ivan although he was twice her size. Her piercing hoots made him shiver with fear.\n\n' +
        'Ivan approached them but they showed their sharp teeth. Kinyani wanted to know if Ivan could protect her family in times of danger. She threw a stick at him to test his reaction. Seeing that he did not move, she stared fiercely at him.\n\n' +
        'The young male went closer to Ivan. He was eyeing Ivan\'s food. Refusing to give in, Ivan gathered his strength and let out a loud grumble. He beat his chest so loudly that everyone could hear. Kinyani and the others watched. Ivan moved towards the young male who took a step back.\n\n' +
        'Kinyani ambled towards Ivan. She tapped him on the shoulder and ran away. He was not sure what she was doing. She strolled back and gave him a slight push. He then realised she was inviting him to play with them.\n\n' +
        'After playing, Ivan rested on the grass. The other gorillas came and lay next to him. Together, they enjoyed the warmth of the sun.\n\n' +
        '(Adapted from One and Only Ivan by Katherine Applegate)',
      marks: 8,
      questions: [
        {
          questionNo: '23',
          format: 'open',
          marks: 1,
          stem: 'Who was Kinyani?',
          answer: 'Kinyani was the largest among the female gorillas (in the new enclosure).',
          solution: {
            method: 'Find the sentence in Paragraph 1 that introduces Kinyani.',
            steps: [
              'Paragraph 1: "Kinyani, the largest among the female gorillas, terrified Ivan although he was twice her size."',
              'Kinyani is the largest among the female gorillas.',
              'As a complete sentence: "Kinyani was the largest among the female gorillas."',
            ],
            tip: 'For Who questions, look for the sentence where the character is first introduced, usually with a descriptive phrase right beside the name.',
          },
        },
        {
          questionNo: '24',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Ivan was afraid of Kinyani because she ________.',
          options: [
            { label: '1', text: 'pointed at him' },
            { label: '2', text: 'made terrifying noises' },
            { label: '3', text: 'gave him a slight push' },
          ],
          answer: '2',
          solution: {
            method: 'Find the direct reason in Paragraph 1 for why Ivan was afraid of Kinyani.',
            steps: [
              'Paragraph 1: "Kinyani, the largest among the female gorillas, terrified Ivan... Her piercing hoots made him shiver with fear."',
              'What frightened Ivan was Kinyani\'s "piercing hoots" (sharp crying sounds) → "terrifying noises".',
              '(1) pointed at him — The passage says "they stared at him, pointing", which is the whole group\'s action, not the reason Kinyani frightened him. (3) refers to the playful behaviour mentioned at the end.',
              'Therefore, the correct answer is (2) made terrifying noises. (Confirmed against official answer key)',
            ],
            tip: 'The specific reason for "terrified Ivan" is found in "piercing hoots made him shiver".',
          },
        },
        {
          questionNo: '25',
          format: 'open',
          marks: 1,
          stem: 'Why did Kinyani stare fiercely at Ivan?',
          answer: 'Kinyani stared fiercely at Ivan because she threw a stick at him to test his reaction and he did not move.',
          solution: {
            method: 'Find the reason why Kinyani stared fiercely at Ivan in Paragraph 2.',
            steps: [
              'Paragraph 2: "She threw a stick at him to test his reaction. Seeing that he did not move, she stared fiercely at him."',
              'Even after she threw the stick at Ivan, he did not move → she took this as a sign that he was ignoring her, so she stared fiercely at him.',
              'In a complete sentence: "Because she threw a stick at Ivan to test him, and he did not move."',
            ],
            tip: 'In "Seeing that ~, she stared", the \'Seeing that\' clause gives the reason.',
          },
        },
        {
          questionNo: '26',
          format: 'mcq',
          marks: 1,
          stem: 'Which word would you use to describe Ivan in paragraph 3?',
          options: [
            { label: '1', text: 'kind' },
            { label: '2', text: 'brave' },
            { label: '3', text: 'proud' },
          ],
          answer: '2',
          solution: {
            method: 'Identify what Ivan\'s actions in Paragraph 3 tell us about his character.',
            steps: [
              'Paragraph 3: "Refusing to give in, Ivan gathered his strength and let out a loud grumble. He beat his chest..."',
              '"Refusing to give in" + acting boldly even in the face of a threat → bravery.',
              '"brave" is the most suitable answer. (Confirmed against official answer key)',
            ],
            tip: '"Refusing to give in" (not giving up) is the key clue that shows courage (brave).',
          },
        },
        {
          questionNo: '27',
          format: 'open',
          marks: 2,
          stem:
            'State if each sentence is True or False. Give a reason why you think so.\n' +
            '(a) The other gorillas did not welcome Ivan when he approached them.\n' +
            '(b) The young male was not afraid when he saw how Ivan behaved.',
          answer:
            '(a) True — When Ivan approached them, they showed their sharp teeth, which means they were hostile and did not welcome him.\n' +
            '(b) False — Ivan moved towards the young male who took a step back, which shows the young male was afraid.',
          solution: {
            method: 'Check paragraph 2 (whether Ivan was welcomed) and paragraph 3 (the young male\'s reaction) separately.',
            steps: [
              '(a) Paragraph 2: \'Ivan approached them but they showed their sharp teeth.\' → Showing teeth = hostile = not welcoming → True.',
              '(b) Paragraph 3: \'Ivan moved towards the young male who took a step back.\' → Stepping back = afraid → \'not afraid\' is false → False.',
            ],
            tip: '\'Showed their sharp teeth\' (baring their teeth) shows a warning or hostile attitude, while \'took a step back\' (stepping backwards) shows fear.',
          },
        },
        {
          questionNo: '28',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story.\n' +
            '( ) Kinyani ran away from Ivan.\n' +
            '( ) Kinyani tapped on Ivan\'s shoulder.\n' +
            '( ) Kinyani strolled back to Ivan.',
          answer: 'Kinyani tapped on Ivan\'s shoulder = 1; Kinyani ran away from Ivan = 2; Kinyani strolled back to Ivan = 3',
          solution: {
            method: 'Follow the order of Kinyani\'s actions in paragraph 4.',
            steps: [
              'Paragraph 4: \'She tapped him on the shoulder and ran away... She strolled back and gave him a slight push.\'',
              'First: tapped him on the shoulder → 1.',
              'Next: ran away → 2.',
              'Last: strolled back → 3.',
            ],
            tip: 'When actions are connected by \'and\' or \'then\', the one that comes first in the sentence happens first.',
          },
        },
        {
          questionNo: '29',
          format: 'open',
          marks: 1,
          stem: 'How do you know the gorillas accepted Ivan in the end? Name one action.',
          answer: 'They lay next to him on the grass (and enjoyed the warmth of the sun together).',
          solution: {
            method: 'Look in the last paragraph for actions that show the gorillas have accepted Ivan.',
            steps: [
              'Last paragraph: \'The other gorillas came and lay next to him. Together, they enjoyed the warmth of the sun.\'',
              'Lying down next to Ivan = shows acceptance and closeness.',
              '\'They lay next to him.\' or \'They enjoyed the warmth of the sun together.\'',
            ],
            tip: 'Lying physically close to someone or being together is a typical way to show acceptance and bonding between animals.',
          },
        },
      ],
    },
  ],
};

export default review1MahaBodhiEnglish2025;
