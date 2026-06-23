// =============================================================================
// src/data/p3/english/papers/wa2_nanyang_primary_english_2023.ts
// Nanyang Primary School — Term 2 Weighted Assessment 2 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 86–93 (시험지 표지 p.1–8)
// Duration: 40 minutes / Total: 20 marks
// 연도: 표지 미인쇄. Nanyang WA1과 동일 모음집 세트로 보아 2023년으로 처리(사용자 확정).
// ★ 모든 정답이 PDF p95의 공식 정답표(NANYANG WA2)와 100% 일치 확인 완료.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa2NanyangPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2023,
    assessment: 'Term 2 Weighted Assessment 2',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.86–93 (paper pp.1–8)',
  },

  items: [
    // =========================================================================
    // (A) Grammar — MCQ Q1–3 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny-wa2-2023-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: '________ girl sitting over there has the most beautiful smile.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '2',
      solution: {
        method: 'Look at the noun — is it singular or plural, and is it near or far?',
        steps: [
          '"girl" is singular → we cannot use these/those (which are plural).',
          '"sitting over there" means the girl is far away → use that, not this (which is for things nearby).',
          'So the correct answer is (2) That.',
        ],
        tip: 'this/that = singular, these/those = plural. Use this/these for things nearby, and that/those for things far away.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'The postman usually ________ letters to the residents in the evening.',
      options: [
        { label: '1', text: 'deliver' },
        { label: '2', text: 'delivers' },
        { label: '3', text: 'delivered' },
        { label: '4', text: 'delivering' },
      ],
      answer: '2',
      solution: {
        method: 'The frequency adverb (usually) tells us it is a present habit, and the subject tells us which verb form to use.',
        steps: [
          '"usually" describes something that happens regularly (a present habit) → use the Present Simple tense.',
          'The subject "The postman" is third person singular.',
          'For third person singular in the Present Simple, add -s to the verb → delivers. The correct answer is (2).',
        ],
        tip: 'If the subject is he/she/a singular noun and it is a present habit, add -s to the verb.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'There are not ________ girls who are interested in football.',
      options: [
        { label: '1', text: 'few' },
        { label: '2', text: 'little' },
        { label: '3', text: 'many' },
        { label: '4', text: 'much' },
      ],
      answer: '3',
      solution: {
        method: 'Check whether the noun is countable or uncountable, and look at the sentence structure (negative).',
        steps: [
          '"girls" is a countable plural noun → we cannot use little or much (these are for uncountable nouns).',
          'The structure "are not ___ girls" (meaning not many) fits the word many.',
          'few is usually used without not (meaning hardly any), so "are not few" sounds unnatural → the correct answer is (3) many.',
        ],
        tip: 'When you want to say there is not a large number of a countable plural noun, use not many.',
      },
    },

    // =========================================================================
    // (B) Vocabulary — MCQ Q4–6 (3 marks)
    // =========================================================================
    {
      kind: 'single',
      id: 'ny-wa2-2023-q4',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'When I touched the cactus, the tiny ________ poked my fingers.',
      options: [
        { label: '1', text: 'tusks' },
        { label: '2', text: 'warts' },
        { label: '3', text: 'prickles' },
        { label: '4', text: 'whiskers' },
      ],
      answer: '3',
      solution: {
        method: 'Think about what is on a cactus that can poke your finger.',
        steps: [
          'The surface of a cactus has sharp, pointed spikes.',
          'Spikes = prickles → this matches the action of being poked (poked) by them.',
          'tusks / warts / whiskers have nothing to do with a cactus → the correct answer is (3) prickles.',
        ],
        tip: 'When you think of nouns that are closely linked to a specific object (like cactus), vocabulary questions become much easier.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q5',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'He ________ the door open, startling his sister who was just standing behind it.',
      options: [
        { label: '1', text: 'jiggled' },
        { label: '2', text: 'wiggled' },
        { label: '3', text: 'prodded' },
        { label: '4', text: 'wrenched' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the verb that best describes the action of suddenly opening a door with great force.',
        steps: [
          'The younger sister standing behind was startled (startling) → this tells us the door was flung open suddenly and forcefully.',
          'wrench = to twist or pull hard → \'wrenched the door open\' sounds the most natural here.',
          'jiggle / wiggle (to shake gently) and prod (to poke lightly) do not suggest a forceful opening → the correct answer is (4) wrenched.',
        ],
        tip: 'Look at the result (the sister was startled) to choose the verb that matches the strength of the action.',
      },
    },
    {
      kind: 'single',
      id: 'ny-wa2-2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem:
        'When they cornered the wild boar and blocked it from escaping, it growled and became ________.',
      options: [
        { label: '1', text: 'as fierce as a lion' },
        { label: '2', text: 'as hungry as a bear' },
        { label: '3', text: 'as timid as a mouse' },
        { label: '4', text: 'as proud as a peacock' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the simile that best matches the state of a wild boar that is cornered and growling.',
        steps: [
          'When it was cornered and could not escape, it growled → it is in a fierce and aggressive state.',
          '\'as fierce as a lion\' (as fierce as a lion) fits the best.',
          'timid / proud / hungry do not match a growling, cornered situation → the correct answer is (1).',
        ],
        tip: 'For \'as ~ as ...\' simile questions, choose the quality that best matches the situation and action (growled) described in the sentence before it.',
      },
    },

    // =========================================================================
    // (C) Grammar Cloze — Q7–9 (3 marks)
    // 대명사 채우기, 보기 A~F (each once only)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny-wa2-2023-secC-cloze',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze',
      instructions:
        'There are 3 blanks, numbered 7 to 9. Choose the correct word from the box and write its letter (A to F) in each blank. Use each word once only. Box: (A) I  (B) he  (C) we  (D) she  (E) you  (F) they',
      passage:
        'Ali plays soccer for the school team. (7) ________ asked Mary and Raju to come and watch him play in a match next Monday.\n\n' +
        '(8) ________ both agreed and went to the match. It was held at the sports stadium near their school. Mary was excited as (9) ________ had never been to a soccer match before.\n\n' +
        'After the match, the three friends went to a fast food restaurant to celebrate.',
      marks: 3,
      questions: [
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: 'Ali plays soccer for the school team. (7) ________ asked Mary and Raju to come and watch him play.',
          answer: 'B',
          solution: {
            method: 'Choose the pronoun that replaces the subject (Ali) from the previous sentence.',
            steps: [
              'The subject just before is \'Ali\' (one male).',
              'Ali is also the person who asked Mary and Raju to come and see.',
              'The subject pronoun that replaces one male is \'he\' → Answer (B).',
            ],
            tip: 'When choosing a pronoun, always check the noun that appeared just before (in this case, Ali).',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: '(8) ________ both agreed and went to the match.',
          answer: 'F',
          solution: {
            method: 'Understand that \'both\' refers to two people (Mary and Raju) together.',
            steps: [
              '\'both agreed\' — both people (Mary and Raju) agreed.',
              'The subject pronoun that refers to two people together is \'they\' → Answer (F).',
            ],
            tip: 'When you see \'both\', the subject pronoun is usually plural (they).',
          },
        },
        {
          questionNo: '9',
          format: 'fib',
          marks: 1,
          stem: 'Mary was excited as (9) ________ had never been to a soccer match before.',
          answer: 'D',
          solution: {
            method: 'Choose the pronoun that replaces the subject (Mary) from the previous sentence.',
            steps: [
              '\'Mary was excited as ___ had never been...\' — Mary is the one who has never watched the match before.',
              'Mary is one female → subject pronoun is \'she\' → Answer (D). (You can also check using the remaining options A, C, and E.)',
            ],
            tip: 'The subject pronoun that replaces one female is \'she\'.',
          },
        },
      ],
    },

    // =========================================================================
    // (D) Editing for Spelling — Q10–12 (3 marks)
    // 지문: 올빼미(owls)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny-wa2-2023-secD-editing',
      topic: 'Editing',
      title: '(D) Editing for Spelling',
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each box. (The underlined words are: creachers (10), inseks (11), ameizing (12))',
      passage:
        'Have you ever heard a hoot at night? This may be the call of an owl looking for its dinner.\n\n' +
        'Owls have an acute sense of hearing. This helps them to find small (10) [creachers] in the dark. As the owls fly, they look straight down so that they can search and listen for their prey. They eat mice, frogs, snakes and small birds. Sometimes, they eat (11) [inseks] such as beetles and grasshoppers. If you ever get to see an owl in action, you will find that it is an (12) [ameizing] animal. Unfortunately, it is hard to spot one in Singapore.',
      marks: 3,
      questions: [
        {
          questionNo: '10',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "to find small creachers in the dark."',
          answer: 'creatures',
          solution: {
            method: 'Think of the correct spelling of the word that fits the context (small living creatures).',
            steps: [
              'Incorrect spelling: creachers.',
              'The meaning is "living things/animals". The correct word is creatures.',
              'It ends in -ture. Even though it sounds like "wow / whoa", the spelling is t-u-r-e.',
            ],
            tip: 'Words like creature, picture, and nature all end in "-ture" — even though it doesn\'t sound that way, always spell it t-u-r-e.',
          },
        },
        {
          questionNo: '11',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "they eat inseks such as beetles."',
          answer: 'insects',
          solution: {
            method: 'Check the spelling of the word that refers to beetles and grasshoppers.',
            steps: [
              'Incorrect spelling: inseks.',
              'Insects like beetles and grasshoppers = insects.',
              'Even though it sounds like "-ks" when you say it, the spelling is c-t-s (insect → insects).',
            ],
            tip: 'To make insect plural, just add -s to get insects. Don\'t spell it with -ks the way it sounds.',
          },
        },
        {
          questionNo: '12',
          format: 'editing',
          marks: 1,
          stem: 'Correct the spelling of the underlined word: "it is an ameizing animal."',
          answer: 'amazing',
          solution: {
            method: 'Think about the correct spelling of the word that means "amazing / surprising".',
            steps: [
              'Incorrect spelling: ameizing.',
              'The correct word is amazing (amaze + -ing).',
              'The e in amaze is dropped before adding -ing → amazing (the vowel is a, not ei).',
            ],
            tip: 'Just like amaze → amazing, when a verb ends in -e, drop the e before adding -ing.',
          },
        },
      ],
    },

    // =========================================================================
    // (E) Comprehension — Q13–19 (8 marks)
    // 지문: Madam Ng Moey Chye, a Samsui woman (National Heritage Board)
    // =========================================================================
    {
      kind: 'set',
      id: 'ny-wa2-2023-secE-comprehension',
      topic: 'ComprehensionOE',
      title: '(E) Comprehension — Madam Ng, a Samsui Woman',
      instructions: 'Read this passage and answer questions 13 to 19.',
      passage:
        'Madam Ng Moey Chye\'s job was to carry bricks at a construction site. She would wake up at dawn and walk from her home at Chinatown to Collyer Quay where she worked. Her job was hard and tiring but it was the only work she could do.\n\n' +
        'Madam Ng was born in Singapore in 1932. She was adopted when she was young and her adoptive parents never sent her to school. As an adult, Madam Ng could not find a job. She decided to work as a Samsui woman.\n\n' +
        'Like most Samsui women in Singapore in the past, Madam Ng did not get married. She was beyond the ideal age of marriage by the time she started work. She supported herself by working at construction sites. She also wore a bright red headscarf or \'hong toujin\'.\n\n' +
        'Today, at 85 years old, Madam Ng is retired and lives in a flat in Redhill. She is still healthy and cheerful, and does not let her age slow her down. She earns money by selling used cardboard that she collects from the neighbourhood.\n\n' +
        'Once a week, she goes to the Apex Club of Singapore where she receives a food package. She is grateful to the young volunteers there. Although she lives a simple life now, she chooses to see the brighter side of her situation. She feels fortunate that she is still in good health.\n\n' +
        '(Adapted from Conversations with Six Pioneering Tradesmen, National Heritage Board.)',
      marks: 8,
      questions: [
        {
          questionNo: '13',
          format: 'mcq',
          marks: 1,
          stem: 'The place where Madam Ng used to work at was ________.',
          options: [
            { label: '1', text: 'Redhill' },
            { label: '2', text: 'Chinatown' },
            { label: '3', text: 'Apex Club' },
            { label: '4', text: 'Collyer Quay' },
          ],
          answer: '4',
          solution: {
            method: 'Tell the difference between home and work to find the place where someone worked.',
            steps: [
              '1단락: "walk from her home at Chinatown to Collyer Quay where she worked."',
              'Chinatown은 집, 일한 곳은 Collyer Quay.',
              'Redhill은 현재 사는 곳, Apex Club은 식품 받는 곳 → 정답 (4) Collyer Quay.',
            ],
            tip: '장소 문제는 "home / workplace / current place of living"를 헷갈리지 않게 각각 구분하세요.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 2,
          stem:
            'Using information from Paragraph 2, complete the sentences that tell you why Madam Ng had to work as a Samsui woman even though the job was hard and tiring.\n' +
            'a) Her adoptive parents ________\n' +
            'b) She could ________',
          answer:
            'a) Her adoptive parents never sent (Madam Ng) her to school.  b) She could not find a job (as an adult).',
          solution: {
            method: '2단락에서 일하게 된 원인 두 가지를 순서대로 찾는다.',
            steps: [
              '2단락: "her adoptive parents never sent her to school." → a) 학교에 보내지 않음.',
              '"As an adult, Madam Ng could not find a job." → b) 일자리를 구할 수 없었음.',
              '교육을 못 받아 직업을 못 구했고, 그래서 Samsui 여성으로 일하게 되었다.',
            ],
            tip: '"complete the sentences" 문제는 주어진 시작 어구 뒤에 지문 표현을 자연스럽게 이어 적습니다.',
          },
        },
        {
          questionNo: '15',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word has the same meaning as "past"? Circle either (A) or (B). Sentence: "She was beyond (A) the ideal (B) age of marriage by the time she started work."',
          options: [
            { label: 'A', text: 'beyond' },
            { label: 'B', text: 'ideal' },
          ],
          answer: 'A',
          solution: {
            method: 'past(지난/넘어선)와 같은 뜻의 단어를 두 보기 중에서 고른다.',
            steps: [
              'beyond = ~을 넘어선 → "past the age"(나이를 지난)와 의미가 통한다.',
              'ideal = 이상적인 → past와 뜻이 다르다.',
              '따라서 정답은 (A) beyond.',
            ],
            tip: '"beyond/past the age"는 "past a certain age"이라는 같은 의미로 쓰입니다.',
          },
        },
        {
          questionNo: '16',
          format: 'open',
          marks: 1,
          stem:
            'From paragraph 4, pick out an 8-word phrase that tells you that Madam Ng is still active despite her old age.',
          answer: 'does not let her age slow her down',
          solution: {
            method: '4단락에서 "does not give up because of age"를 보여주는 여덟 단어 표현을 찾는다.',
            steps: [
              'Paragraph 4: \'...and does not let her age slow her down.\'',
              'Does not let her age slow her down = she is still active.',
              'Eight words: does / not / let / her / age / slow / her / down.',
            ],
            tip: 'For the \'8-word phrase\', count each word on your fingers to check there are exactly eight.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes provided to show what happened first, next and last in the story.\n' +
            '( ) Madam Ng was adopted.\n' +
            '( ) Madam Ng moved to a flat in Redhill.\n' +
            '( ) Madam Ng worked at construction sites.',
          answer:
            'Madam Ng was adopted = 1; Madam Ng moved to a flat in Redhill = 3; Madam Ng worked at construction sites = 2',
          solution: {
            method: 'Arrange life events in time order (young → adult → present).',
            steps: [
              'First: adopted when she was young (\'adopted when she was young\') → 1.',
              'As an adult: worked at construction sites (\'supported herself by working at construction sites\') → 2.',
              'Present: retired and moved to a flat in Redhill (\'retired and lives in a flat in Redhill\') → 3.',
            ],
            tip: 'For time order questions, just follow the life stages: childhood → adult → present (today).',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Madam Ng still supports herself after retirement.',
          answer: 'True',
          solution: {
            method: 'Check Paragraph 4 to see if she has a source of income after retirement.',
            steps: [
              'Paragraph 4: \'She earns money by selling used cardboard that she collects from the neighbourhood.\'',
              'Even after retirement, she earns money on her own by selling cardboard.',
              'So the statement \'still supports herself/himself\' is true → True.',
            ],
            tip: 'For statements with \'still\', check the passage for her current situation before deciding.',
          },
        },
        {
          questionNo: '19',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Madam Ng is a volunteer at the Apex Club.',
          answer: 'False',
          solution: {
            method: 'Identify Madam Ng\'s role in the Apex Club — is she someone who receives help, or someone who volunteers?',
            steps: [
              'Paragraph 5 says: "she goes to the Apex Club... where she receives a food package."',
              'She is the person who is *receiving* the food, and she is thankful to the "young volunteers".',
              'The volunteers are other people, not her — so the statement "Madam Ng is a volunteer" is False.',
            ],
            tip: 'Watch out for trick statements that swap "receiver / person who receives" with "volunteer".',
          },
        },
      ],
    },
  ],
};

export default wa2NanyangPrimaryEnglish2023;
