// =============================================================================
// src/data/p3/english/papers/wa1_catholic_high_primary_english_2023.ts
// Catholic High School (Primary) — Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 160–164 (시험지 표지 p.1–5)
// Total: 30 marks (Section A 10 + Section B 10 + Section C 5 + Section D 5)
// 주의: 표지에 연도 없음. 모음집 배열상 2023으로 처리(검증 권장).
//       다른 Catholic High 자료(Practice Paper 1·2)와 구분하기 위해 'Weighted Assessment 1'로 분류.
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1CatholicHighPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Catholic High School (Primary)',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    totalMarks: 30,
    sourcePages: 'pp.160–164 (paper pp.1–5)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar MCQ (10 x 1m) — Q1–10
    // =========================================================================
    {
      kind: 'single',
      id: 'chswa1-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'Max and his friend ________ to East Coast Park every Saturday morning.',
      options: [
        { label: '1', text: 'cycle' },
        { label: '2', text: 'cycles' },
        { label: '3', text: 'cycled' },
        { label: '4', text: 'are cycling' },
      ],
      answer: '1',
      solution: {
        method: 'Look at the number of the subject and \'every Saturday morning\' (repeated habit).',
        steps: [
          'The subject \'Max and his friend\' is plural.',
          '\'Every Saturday morning\' shows a habit that repeats every week → Simple Present.',
          'The Simple Present form for a plural subject uses the base form \'cycle\' → Answer is (1).',
        ],
        tip: '\'Every + time expression\' is a signal for Simple Present to show a repeated habit.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Every pupil in the school ________ to take his temperature daily.',
      options: [
        { label: '1', text: 'has' },
        { label: '2', text: 'had' },
        { label: '3', text: 'have' },
        { label: '4', text: 'are having' },
      ],
      answer: '1',
      solution: {
        method: 'Look at the rule that \'Every + noun\' is treated as singular, and look at \'daily\' (repeated habit).',
        steps: [
          '\'Every pupil\' is treated as a singular subject in grammar.',
          '\'Daily\' means something that happens every day → Simple Present.',
          'The Simple Present form of \'have\' for a singular subject is \'has\' → Answer is (1).',
        ],
        tip: '\'Every + noun (singular form)\' is always used with a singular verb.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '________ group of boys on the field over there is playing soccer.',
      options: [
        { label: '1', text: 'This' },
        { label: '2', text: 'That' },
        { label: '3', text: 'These' },
        { label: '4', text: 'Those' },
      ],
      answer: '2',
      solution: {
        method: 'Look at the number of the noun (singular/plural) and the distance (near/far).',
        steps: [
          '\'Group\' is a singular noun (matches with the verb \'is\') → \'these\' and \'those\' (plural) are ruled out.',
          '\'On the field over there\' means the group is far away → use \'that\', not \'this\'.',
          'Therefore, the answer is (2) That.',
        ],
        tip: 'Nouns that refer to a collection of people, such as \'group\', \'team\', and \'class\', are usually treated as singular.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem:
        "I have taken my friend's worksheets by mistake. I will return ________ to him when I see him.",
      options: [
        { label: '1', text: 'it' },
        { label: '2', text: 'us' },
        { label: '3', text: 'his' },
        { label: '4', text: 'them' },
      ],
      answer: '4',
      solution: {
        method: '앞 문장의 명사("worksheets")의 수를 확인해 대명사를 고른다.',
        steps: [
          '앞 문장: "I have taken my friend\'The word \'worksheets\' is plural.',
          'The object pronoun that replaces a plural noun is \'them\'.',
          'Therefore, \'I will return them to him\' → the correct answer is (4) them.',
        ],
        tip: 'When using a pronoun, first check whether the noun it refers to is singular or plural (worksheets = plural → them).',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Mother ________ in the kitchen when her mobile phone rang.',
      options: [
        { label: '1', text: 'cooks' },
        { label: '2', text: 'cooked' },
        { label: '3', text: 'is cooking' },
        { label: '4', text: 'was cooking' },
      ],
      answer: '4',
      solution: {
        method: 'The action was happening at the same time as \'when ~ rang\' (a single moment in the past).',
        steps: [
          '\'When her mobile phone rang\' — \'rang\' is in the Simple Past tense and refers to a specific moment.',
          'At that moment, Mother was in the middle of doing something → we use the Past Continuous tense.',
          'The subject \'Mother\' is singular → \'was cooking\' → the correct answer is (4).',
        ],
        tip: 'When you see \'when + Simple Past (a sudden moment in time)\', the action that was in progress at that moment is written as \'was/were + -ing\'.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: 'Chitra misses her best friend, Nisha. It has been five years ________ she left Singapore.',
      options: [
        { label: '1', text: 'but' },
        { label: '2', text: 'after' },
        { label: '3', text: 'since' },
        { label: '4', text: 'although' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the conjunction that fits the structure: \'It has been + period of time + ___ + past event\'.',
        steps: [
          '\'It has been five years ___ she left\' means \'It has been 5 years since someone left\'.',
          '\'It has been + period of time + since + past event\' is a fixed structure (since = from the time that).',
          'Therefore, the correct answer is (3) since.',
        ],
        tip: '\'It has been [period of time] since [past event]\' is a fixed expression meaning \'It has been [period of time] since [something happened]\'.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q7',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: "Wee Boon's father ________ for a meeting earlier in the day.",
      options: [
        { label: '1', text: 'left' },
        { label: '2', text: 'leave' },
        { label: '3', text: 'leaves' },
        { label: '4', text: 'is leaving' },
      ],
      answer: '1',
      solution: {
        method: '"earlier in the day"(이미 지난 그날의 시간)로 과거시제를 파악한다.',
        steps: [
          '"earlier in the day"는 "a point in time that has already passed during that day"을 가리키며 과거시제를 요구한다.',
          'leave의 과거형은 left.',
          '따라서 "Wee Boon\'\'His father left for a meeting earlier in the day.\' → the correct answer is (1) left.',
        ],
        tip: 'Expressions like "earlier in the day/week" are usually used with the Simple Past tense.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q8',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem:
        '"There is still ________ shampoo left in the bottle. Use it first," my mother told my sister.',
      options: [
        { label: '1', text: 'any' },
        { label: '2', text: 'few' },
        { label: '3', text: 'some' },
        { label: '4', text: 'many' },
      ],
      answer: '3',
      solution: {
        method: 'Look at whether "shampoo" is countable or uncountable, and whether the sentence is positive or negative.',
        steps: [
          '"Shampoo" is an uncountable noun → few/many (used for countable nouns) are not correct.',
          '"There is still ___ shampoo left" is a positive sentence (it tells us that some shampoo remains).',
          'In a positive sentence meaning "a little is still left / there is a small amount remaining", "some" is the most natural choice → Answer: (3) some.',
        ],
        tip: '"Any" is mainly used in negative sentences and questions, while "some" is used in positive sentences (both can be used with uncountable nouns).',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q9',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'During the December holidays, Sally went ________ a vacation to New York with her family.',
      options: [
        { label: '1', text: 'in' },
        { label: '2', text: 'at' },
        { label: '3', text: 'by' },
        { label: '4', text: 'on' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the correct preposition that goes with the expression "to go on holiday / to take a vacation".',
        steps: [
          '"Go on a vacation/holiday/trip" means to go for a holiday or trip → this is a fixed preposition phrase.',
          'in / at / by are not used in this expression.',
          'Therefore, the answer is (4) on.',
        ],
        tip: '"Go on a vacation/trip/holiday" is a fixed preposition phrase that you should memorise as a whole.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q10',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem:
        '"Children, you must do the homework by ________ and not discuss the answers," Mrs Loh said.',
      options: [
        { label: '1', text: 'itself' },
        { label: '2', text: 'yourself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'yourselves' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the correct reflexive pronoun to match "Children" (more than one person, second person "you").',
        steps: [
          'Mrs Loh is speaking directly to several children ("Children") → second person plural "you".',
          'The reflexive pronoun for second person plural is "yourselves".',
          '"By yourselves" (on your own, all of you) → Answer: (4) yourselves.',
        ],
        tip: '"by oneself" means "by yourself / on your own". If you are talking to more than one person, use "yourselves" instead.',
      },
    },

    // =========================================================================
    // Section B: Vocabulary MCQ (10 x 1m) — Q11–20
    // =========================================================================
    {
      kind: 'single',
      id: 'chswa1-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'The thief ________ towards the back door when he heard the police siren.',
      options: [
        { label: '1', text: 'bolted' },
        { label: '2', text: 'strolled' },
        { label: '3', text: 'trudged' },
        { label: '4', text: 'stomped' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the verb that best describes what the thief does when he hears the police siren.',
        steps: [
          'The thief heard the police siren and ran away quickly → he moved away very fast.',
          '"bolt" = to suddenly run away very quickly → this matches exactly what the thief did.',
          'strolled (walked leisurely) / trudged (walked heavily and slowly) / stomped (walked by stamping feet) do not match a quick escape → the answer is (1) bolted.',
        ],
        tip: '"bolted" describes the action of suddenly running away very fast, usually out of fear or surprise.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q12',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 12,
      marks: 1,
      stem:
        'Some of the customers were unhappy with the service in the restaurant. They ________ about the poor service to the owner.',
      options: [
        { label: '1', text: 'fussed' },
        { label: '2', text: 'sobbed' },
        { label: '3', text: 'nagged' },
        { label: '4', text: 'grumbled' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the verb that best fits the meaning of "was unhappy and complained".',
        steps: [
          'The customers were unhappy with the service and told the owner about it.',
          '"grumble about something to someone" = to complain to someone about something, usually in a low, unhappy voice.',
          'sobbed (cried) shows sadness; fussed / nagged suggests louder or repeated scolding → "grumbled" is the most natural fit → the answer is (4).',
        ],
        tip: '"grumble about X to Y" is a common word pairing used to express dissatisfaction.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q13',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 13,
      marks: 1,
      stem: 'My brother gobbled the chocolate cake ________ as he was very hungry after lessons.',
      options: [
        { label: '1', text: 'slowly' },
        { label: '2', text: 'untidily' },
        { label: '3', text: 'greedily' },
        { label: '4', text: 'carelessly' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the adverb that best fits the reason "was very hungry" and the verb "gobbled" (ate very quickly).',
        steps: [
          '"gobbled" already shows the idea of eating very quickly and eagerly.',
          '"as he was very hungry" (because he was very hungry) → the idea of eating eagerly suggests that "greedily" is the most natural choice.',
          'slowly contradicts gobbled; untidily / carelessly are not directly related to being hungry → the answer is (3) greedily.',
        ],
        tip: 'The reason (very hungry) is a clue that tells us the emotion behind the action (greedily).',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q14',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 14,
      marks: 1,
      stem: '"Please ________ the volume of the television. I\'m trying to do my homework," I told my sister.',
      options: [
        { label: '1', text: 'turn up' },
        { label: '2', text: 'turn over' },
        { label: '3', text: 'turn away' },
        { label: '4', text: 'turn down' },
      ],
      answer: '4',
      solution: {
        method: 'Think about what \'gets in the way of doing homework\' tells us about the request regarding volume in this situation.',
        steps: [
          '\'I\'m trying to do my homework\' (currently doing homework) → A quiet environment is needed.',
          '\'turn down the volume\' = to lower the volume.',
          '\'turn up\' means to increase, while \'turn over\' (to flip) and \'turn away\' (to look away) are not related to volume → The correct answer is (4) turn down.',
        ],
        tip: '\'turn up/down the volume\' is the expression used when increasing or decreasing sound.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q15',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 15,
      marks: 1,
      stem: 'Gopal is unable to read without his glasses. He is blind like a ________.',
      options: [
        { label: '1', text: 'bat' },
        { label: '2', text: 'fox' },
        { label: '3', text: 'pig' },
        { label: '4', text: 'owl' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the simile idiom that describes someone who \'has very poor eyesight\'.',
        steps: [
          '\'blind as a bat\' = having very poor eyesight (bats are known for poor vision) → This is a very common English idiom.',
          'fox (cunning) / pig (greedy) / owl (wise) do not have idioms related to eyesight.',
          'Therefore, the correct answer is (1) bat.',
        ],
        tip: '\'as blind as a bat\' is a fixed simile expression that means having very poor eyesight.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q16',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 16,
      marks: 1,
      stem:
        'I felt a ________ of water fall on my hand. I think we need to hurry as it might rain soon.',
      options: [
        { label: '1', text: 'pool' },
        { label: '2', text: 'drop' },
        { label: '3', text: 'splash' },
        { label: '4', text: 'puddle' },
      ],
      answer: '2',
      solution: {
        method: 'Choose the noun that describes a small unit of water that falls onto your hand.',
        steps: [
          'A small amount of water that falls onto your hand just before it rains → \'a drop of water\' (one water droplet).',
          '\'pool\' (a body of water) and \'puddle\' (collected water on the ground) refer to water that has already gathered, while \'splash\' emphasises sound or movement.',
          'The word that best matches the meaning of \'a single small amount that fell into the hand\' is (2) drop.',
        ],
        tip: '"a drop of water" refers to a single small droplet of water.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q17',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 17,
      marks: 1,
      stem: 'Betty towers over her older brother. She is ________.',
      options: [
        { label: '1', text: 'as tall as a giraffe' },
        { label: '2', text: 'as wise as an owl' },
        { label: '3', text: 'as big as an elephant' },
        { label: '4', text: 'as proud as a peacock' },
      ],
      answer: '1',
      solution: {
        method: 'Choose a simile that matches the meaning of "tower over" (to be much bigger/taller).',
        steps: [
          '"towers over her older brother" means she is much taller than her older brother.',
          '"as tall as a giraffe" directly expresses great height by comparing to a giraffe.',
          'wise (having good judgment) / big (large in size, not specifically about height) / proud (arrogant) do not match "is tall" → Answer: (1).',
        ],
        tip: '"tower over" means to be overwhelmingly taller or higher, so choose a simile related to height.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q18',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 18,
      marks: 1,
      stem: 'Aaron spilled some hot coffee on himself and as a result has ________ his leg.',
      options: [
        { label: '1', text: 'blazed' },
        { label: '2', text: 'twisted' },
        { label: '3', text: 'scalded' },
        { label: '4', text: 'sprained' },
      ],
      answer: '3',
      solution: {
        method: 'Choose a verb that describes skin injury caused by a hot liquid.',
        steps: [
          'He spilled hot coffee on himself → a burn caused by a hot liquid.',
          '"scald" means to be burned by a hot liquid → this matches exactly.',
          'twisted / sprained refer to joint injuries, and blazed means to burn with flames, which does not specifically describe a hot liquid burn → Answer: (3) scalded.',
        ],
        tip: '"scald" refers specifically to a burn caused by hot water, hot drinks, or other hot liquids.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q19',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 19,
      marks: 1,
      stem:
        'John is a ________ class monitor. You can trust him to take care of the class when the teacher is not around.',
      options: [
        { label: '1', text: 'polite' },
        { label: '2', text: 'strong' },
        { label: '3', text: 'pleasant' },
        { label: '4', text: 'responsible' },
      ],
      answer: '4',
      solution: {
        method: 'Choose a personality adjective that matches the meaning of "can be trusted and relied on".',
        steps: [
          '"You can trust him to take care of the class" (he can be counted on) → shows a sense of responsibility.',
          '"responsible" means having a sense of responsibility → this directly connects to being trustworthy.',
          'polite (well-mannered) / strong (powerful) / pleasant (friendly and agreeable) are not directly related to "a sense of trust that one can be relied on" → Answer: (4) responsible.',
        ],
        tip: '"trust someone to do something" is often paired with the word \'responsible\'.',
      },
    },
    {
      kind: 'single',
      id: 'chswa1-q20',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 20,
      marks: 1,
      stem:
        '"Smoking is ________ to your health. You should slowly quit smoking," the doctor advised my father.',
      options: [
        { label: '1', text: 'fearful' },
        { label: '2', text: 'hurtful' },
        { label: '3', text: 'painful' },
        { label: '4', text: 'harmful' },
      ],
      answer: '4',
      solution: {
        method: '"is ~ for health" — choose the adjective that fits the standard warning phrase.',
        steps: [
          '"harmful to your health" is the most commonly used expression in health warnings, such as on cigarette labels.',
          'fearful (feeling afraid) / hurtful (causing emotional pain) / painful (causing physical pain) — note that "is bad for health" is not a standard expression.',
          'Therefore, the correct answer is (4) harmful.',
        ],
        tip: '"harmful to your health" is a fixed expression commonly used in health warnings about smoking, pollution, and similar topics.',
      },
    },

    // =========================================================================
    // Section C: Grammar Cloze (5 x 1m) — Q21–25
    // 보기: (A) I (B) it (C) my (D) us (E) we
    // 지문: Clean Plate 캠페인
    // =========================================================================
    {
      kind: 'set',
      id: 'chswa1-secC-cloze',
      topic: 'GrammarCloze',
      title: 'Section C: Grammar Cloze',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write its letter (A to E) in each blank. USE EACH WORD ONCE ONLY. Box: (A) I  (B) it  (C) my  (D) us  (E) we',
      passage:
        '"Preventing food wastage is important," Miss Yeo told our class. She told (21) ________ that we would be participating in the \'Clean Plate\' campaign.\n\n' +
        'Miss Yeo instructed all of us to order only what (22) ________ could finish to avoid wastage. When I got home, I told (23) ________ mother about the campaign. She was happy as (24) ________ will teach me good eating habits. The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign. I was proud to be part of this campaign.\n\n' +
        '(Adapted from: http://surl.li/bdxaw)',
      marks: 5,
      questions: [
        {
          questionNo: '21',
          format: 'fib',
          marks: 1,
          stem: 'She told (21) ________ that we would be participating in the \'Clean Plate\' campaign.',
          answer: 'D',
          solution: {
            method: 'Choose the object that refers to who Miss Yeo spoke to — "our class".',
            steps: [
              'The sentence starts with: "Miss Yeo told our class." — the teacher spoke to the whole class.',
              'The object pronoun that refers to "we (the whole class)" is "us".',
              'From the options, us is (D) → The correct answer is (D).',
            ],
            tip: 'In "told + object", the object is the object pronoun that refers to the person or people who received the message.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'Miss Yeo instructed all of us to order only what (22) ________ could finish to avoid wastage.',
          answer: 'E',
          solution: {
            method: 'Choose the subject pronoun that refers to "all of us".',
            steps: [
              '"All of us" were told to order only as much food as everyone could eat.',
              'The subject pronoun that refers to "we" is "we".',
              'From the options, we is (E) → The correct answer is (E).',
            ],
            tip: 'If the object pronoun (us) has already been mentioned, use the subject pronoun (we) when referring to the same people as the subject.',
          },
        },
        {
          questionNo: '23',
          format: 'fib',
          marks: 1,
          stem: 'When I got home, I told (23) ________ mother about the campaign.',
          answer: 'C',
          solution: {
            method: 'Choose the possessive pronoun that refers to the speaker\'s (I) own mum.',
            steps: [
              'The subject is \'I\', and \'Mum\' is my mum.',
              'The first-person possessive pronoun is \'my\'.',
              'In the options, \'my\' is (C) → Answer is (C).',
            ],
            tip: 'The possessive pronoun for \'I\' is \'my\' (my mother = my mum).',
          },
        },
        {
          questionNo: '24',
          format: 'fib',
          marks: 1,
          stem: 'She was happy as (24) ________ will teach me good eating habits.',
          answer: 'B',
          solution: {
            method: 'Choose the pronoun that replaces the thing (the campaign) mentioned earlier.',
            steps: [
              'From the context, the one doing \'To teach good eating habits\' is \'the campaign\' mentioned earlier — a thing.',
              'The subject pronoun used to replace a thing is \'it\'.',
              'In the options, \'it\' is (B) → Answer is (B).',
            ],
            tip: 'When referring to a thing or concept such as a campaign or programme, use \'it\'.',
          },
        },
        {
          questionNo: '25',
          format: 'fib',
          marks: 1,
          stem: 'The next day, (25) ________ waited for Miss Yeo to give me more details about the campaign.',
          answer: 'A',
          solution: {
            method: 'Choose the subject pronoun that refers to the same person as \'me\' in \'give me\' later in the sentence — the speaker themselves.',
            steps: [
              '\'...give me more details\' — \'me\' refers to the speaker themselves.',
              'The first-person singular subject pronoun referring to the speaker themselves is \'I\'.',
              'In the options, \'I\' is (A) → Answer is (A). (All 5 words have been used with none left over.)',
            ],
            tip: 'When \'me\' appears in a sentence, the subject of the same sentence is usually \'I\' (same speaker).',
          },
        },
      ],
    },

    // =========================================================================
    // Section D: Vocabulary Cloze (5 x 1m) — Q26–30
    // 보기: (A) carried (B) medicine (C) pet (D) scratches (E) whining
    // 지문: Hazel과 길 잃은 강아지
    // =========================================================================
    {
      kind: 'set',
      id: 'chswa1-secD-vcloze',
      topic: 'VocabCloze',
      title: 'Section D: Vocabulary Cloze',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write its letter (A to E) in each blank. USE EACH WORD ONCE ONLY. Box: (A) carried  (B) medicine  (C) pet  (D) scratches  (E) whining',
      passage:
        'Hazel adored animals. She wanted to own a (26) ________, but her parents could not afford to buy one. One day, Hazel was at the park when she heard an animal (27) ________ in pain. It was a stray puppy with many (28) ________ on its body. She gently (29) ________ the puppy to a veterinary clinic nearby. The vet applied some (30) ________ on the scratches. After the visit, Hazel decided to keep the puppy.',
      marks: 5,
      questions: [
        {
          questionNo: '26',
          format: 'fib',
          marks: 1,
          stem: 'She wanted to own a (26) ________, but her parents could not afford to buy one.',
          answer: 'C',
          solution: {
            method: 'Think about what \'Wanting to have one because of loving animals\' means.',
            steps: [
              '\'Hazel adored animals. She wanted to own a ___\' → The animal she wants to keep = a pet.',
              '\'pet\' is the most natural word to use here.',
              'In the options, pet is (C) → Answer is (C).',
            ],
            tip: '\'own a pet\' is a common expression meaning to keep a pet.',
          },
        },
        {
          questionNo: '27',
          format: 'fib',
          marks: 1,
          stem: 'Hazel was at the park when she heard an animal (27) ________ in pain.',
          answer: 'E',
          solution: {
            method: 'Choose the word that describes the sound a hurt animal makes.',
            steps: [
              '\'heard an animal ___ in pain\' — a sound made because of pain.',
              '\'whining\' = a whimpering sound → the sound a hurt animal (especially a dog) makes.',
              'In the options, whining is (E) → Answer is (E).',
            ],
            tip: '\'whining\' describes the whimpering sound a puppy makes when it is hurt or sad.',
          },
        },
        {
          questionNo: '28',
          format: 'fib',
          marks: 1,
          stem: 'It was a stray puppy with many (28) ________ on its body.',
          answer: 'D',
          solution: {
            method: 'Choose the word that describes the type of wounds found on the puppy\'s body.',
            steps: [
              '\'a stray puppy with many ___ on its body\' — wounds on its body.',
              '\'scratches\' = scratch marks on the body → matches the condition of a puppy that is whining in pain.',
              'In the options, scratches is (D) → Answer is (D).',
            ],
            tip: 'You can confirm this by connecting it to the phrase that comes after: \'the vet applied some medicine on the scratches\'.',
          },
        },
        {
          questionNo: '29',
          format: 'fib',
          marks: 1,
          stem: 'She gently (29) ________ the puppy to a veterinary clinic nearby.',
          answer: 'A',
          solution: {
            method: 'Choose the verb that describes the action of bringing the puppy to the animal clinic.',
            steps: [
              '\'gently ___ the puppy to a veterinary clinic\' — someone carefully brought the puppy there.',
              '\'carried\' means to hold and bring someone or something — this fits naturally as an action of moving an injured puppy.',
              'In the options, \'carried\' is (A) → The answer is (A).',
            ],
            tip: '\'gently carried\' is an expression used when carefully holding and moving an injured animal.',
          },
        },
        {
          questionNo: '30',
          format: 'fib',
          marks: 1,
          stem: 'The vet applied some (30) ________ on the scratches.',
          answer: 'B',
          solution: {
            method: 'Choose the word that describes something being put onto the scratches.',
            steps: [
              '\'The vet applied some ___ on the scratches\' — the vet put something on the scratches.',
              '\'medicine\' means medication → something that is applied onto a wound.',
              'In the options, \'medicine\' is (B) → The answer is (B). (All 5 options have now been used.)',
            ],
            tip: '\'apply medicine on a wound\' is an expression that means to put medicine onto a wound.',
          },
        },
      ],
    },
  ],
};

export default wa1CatholicHighPrimaryEnglish2023;
