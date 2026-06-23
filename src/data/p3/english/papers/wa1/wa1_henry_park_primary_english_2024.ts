// =============================================================================
// src/data/p3/english/papers/wa1_henry_park_primary_english_2024.ts
// Henry Park Primary School — 2024 Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 53–59 (시험지 표지 p.1–7)
// Duration: 40 minutes / Total: 20 marks
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1HenryParkPrimaryEnglish2024: EnglishPaper = {
  meta: {
    school: 'Henry Park Primary School',
    year: 2024,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.53–59 (paper pp.1–7)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar Cloze — Passage A (4 x 1 mark)
    // 대명사(personal pronouns) 채우기. 보기: he, I, she, they, we, you
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2024-secA-passageA',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage A',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: he | I | she | they | we | you',
      passage:
        'It was the first day of the school holidays. Max and his sister, Sarah, were at the cinema. They wanted to watch a movie together.\n\n' +
        '"Which movie shall (1) ________ watch?" asked Max eagerly.\n\n' +
        '"Do (2) ________ want to watch the latest movie, \'Wonka\'?" suggested Sarah. "My friends watched it yesterday and (3) ________ liked it."\n\n' +
        'Max agreed and (4) ________ nodded. They joined the queue at the counter to buy the tickets.',
      marks: 4,
      questions: [
        {
          questionNo: '1',
          format: 'fib',
          marks: 1,
          stem: '"Which movie shall (1) ________ watch?" asked Max eagerly.',
          answer: 'we',
          solution: {
            method: 'Choose the subject pronoun that includes both the speaker and the listener.',
            steps: [
              'Max is asking which movie the two of them — Max and Sarah — will watch \'together\'.',
              'The 1st person plural subject that refers to both the speaker (Max) and the listener (Sarah) together is \'we\'.',
              '\'Shall we watch?\' is a natural expression used when suggesting something to do together.',
            ],
            tip: '\'Shall we ~?\' is a suggestion or invitation expression that often appears in exam questions.',
          },
        },
        {
          questionNo: '2',
          format: 'fib',
          marks: 1,
          stem: '"Do (2) ________ want to watch the latest movie, \'Wonka\'?" suggested Sarah.',
          answer: 'you',
          solution: {
            method: 'Find the subject that shows Sarah is asking the other person (Max) directly.',
            steps: [
              'Sarah is asking Max directly using \'Do you want to ~?\'.',
              'The 2nd person subject that refers to one person you are speaking to is \'you\'.',
              '\'Do you want ~?\' is a basic sentence pattern used to ask about someone else\'s wishes.',
            ],
            tip: 'When asking someone a direct question, the subject that goes with the verb \'do\' is usually \'you\'.',
          },
        },
        {
          questionNo: '3',
          format: 'fib',
          marks: 1,
          stem: '"My friends watched it yesterday and (3) ________ liked it."',
          answer: 'they',
          solution: {
            method: 'Choose the pronoun that replaces the plural noun (\'My friends\') mentioned earlier.',
            steps: [
              'The subject just before is \'My friends\', which is plural and refers to people.',
              'The subject pronoun that replaces plural people is \'they\'.',
              'The sentence continues naturally as \'they liked it\'.',
            ],
            tip: 'When choosing a pronoun, always check who or what the noun mentioned just before is referring to.',
          },
        },
        {
          questionNo: '4',
          format: 'fib',
          marks: 1,
          stem: 'Max agreed and (4) ________ nodded.',
          answer: 'he',
          solution: {
            method: 'Check that the subject of the sentence is one male person (Max).',
            steps: [
              '"Max agreed and ___ nodded." — The person who nodded is Max.',
              'Max is one male person, so the correct third-person singular male pronoun is "he".',
              'Among the remaining answer choices, "he" is the only word not yet used, so "he" is the answer (each word is used ONCE only).',
            ],
            tip: 'When you see the rule "Use each word ONCE only", you can check the last blank by seeing which word is left over.',
          },
        },
      ],
    },

    // =========================================================================
    // Section A: Grammar Cloze — Passage B (4 x 1 mark)
    // 동사 형태(verb forms) 채우기. 보기: grow, grows, grew, growing, grown, was growing
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2024-secA-passageB',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage B',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: grow | grows | grew | growing | grown | was growing',
      passage:
        'Tim is a good gardener. He enjoys (5) ________ sunflowers in his garden.\n\n' +
        'One morning, he planted some sunflower seeds given by a kind old lady. The next day, he exclaimed, "Alicia! The sunflowers have (6) ________ so tall!"\n\n' +
        '"How did they (7) ________ so quickly?" Alicia asked.\n\n' +
        'Tim wondered how the sunflowers (8) ________ overnight. He was amazed. Then he remembered the old woman telling him that they were magic seeds.',
      marks: 4,
      questions: [
        {
          questionNo: '5',
          format: 'fib',
          marks: 1,
          stem: 'He enjoys (5) ________ sunflowers in his garden.',
          answer: 'growing',
          solution: {
            method: 'Apply the rule that a gerund (-ing form) comes after the verb "enjoy".',
            steps: [
              'The verb "enjoy" takes a gerund (-ing form) as its object (enjoy doing).',
              'Therefore, "enjoys growing" is the correct form.',
              'The to-infinitive (to grow) is not used together with "enjoy".',
            ],
            tip: 'After enjoy, finish, keep, and avoid, always use the -ing form.',
          },
        },
        {
          questionNo: '6',
          format: 'fib',
          marks: 1,
          stem: 'The sunflowers have (6) ________ so tall!',
          answer: 'grown',
          solution: {
            method: '"have + Past Participle" makes the Present Perfect tense.',
            steps: [
              'Because the helping verb "have" comes before the blank, a Past Participle is needed after it.',
              'The Past Participle of "grow" is "grown" (grow – grew – grown).',
              '"have grown so tall" means they have already grown that much by now.',
            ],
            tip: 'After have or has, use the Past Participle of the verb (the third form in the three-form verb change).',
          },
        },
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem: '"How did they (7) ________ so quickly?" Alicia asked.',
          answer: 'grow',
          solution: {
            method: 'After the helping verb \'did\', we always use the base form of the verb.',
            steps: [
              'In the question \'How did they ___?\', the word \'did\' already shows the past tense.',
              'After \'did\', we always use the base form of the verb, which is \'grow\'.',
              '\'Grew\' (past tense form) cannot be used together with \'did\'.',
            ],
            tip: 'When a sentence has \'do\', \'does\', or \'did\', the main verb must always be in its base form.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'Tim wondered how the sunflowers (8) ________ overnight.',
          answer: 'grew',
          solution: {
            method: 'Choose the Simple Past verb that describes something that happened in the past.',
            steps: [
              'The whole passage is a past story, as shown by past tense words like \'wondered\' and \'planted\'.',
              'The subject \'the sunflowers\' is plural, so \'was growing\' (singular) is incorrect.',
              'The Simple Past form \'grew\' is the correct answer to show what happened overnight (you can also check using the remaining words).',
            ],
            tip: 'When the subject is plural, we use \'were\' instead of \'was\'. A simple past fact is expressed using the Simple Past tense.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Sentence Combining (2 x 1 mark) — Q9, Q10
    // =========================================================================
    {
      kind: 'single',
      id: 'hp2024-q9',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 9,
      marks: 1,
      stem:
        'Rewrite the two sentences as one, beginning with the given word, without changing the meaning.\n' +
        'Jason was cycling at the park. Jason saw his teacher.\n' +
        'When ________________________________________.',
      answer: 'When Jason was cycling at the park, he saw his teacher.',
      solution: {
        method: 'Use a time clause starting with \'When\' to join two sentences.',
        steps: [
          'Use \'When\' to show that two events happened at the same time.',
          'Turn the first sentence into a subordinate clause: \'When Jason was cycling at the park,\'.',
          'Join the second sentence as the main clause, and replace the repeated name \'Jason\' with the pronoun \'he\': \'he saw his teacher\'.',
          'The completed sentence is: \'When Jason was cycling at the park, he saw his teacher.\'',
        ],
        tip: 'When the same person is mentioned again, replace their name with a pronoun (he/she) to make the sentence sound more natural. Remember to put a comma (,) after a subordinate clause.',
      },
    },
    {
      kind: 'single',
      id: 'hp2024-q10',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 10,
      marks: 1,
      stem:
        'Rewrite the two sentences as one, beginning with the given word, without changing the meaning.\n' +
        'Ali likes chocolate milk. Juliet also likes chocolate milk.\n' +
        'Both ________________________________________.',
      answer: 'Both Ali and Juliet like chocolate milk.',
      solution: {
        method: 'Use the \'Both ... and ...\' structure to join two subjects together.',
        steps: [
          'Since two people like the same thing, combine them using the \'Both A and B\' structure.',
          'When the subject becomes \'Both Ali and Juliet\' (plural), change the verb from likes → like.',
          'Completed sentence: "Both Ali and Juliet like chocolate milk."',
        ],
        tip: '\'Both A and B\' is always treated as plural, so do not add -s to the verb (use like, not likes).',
      },
    },

    // =========================================================================
    // Section C: Comprehension (10 marks) — Q11–19
    // 지문: 자연공원의 Amelia와 Ben, 그리고 kingfisher 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2024-secC-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section C: Comprehension — The Nature Park',
      instructions: 'Read the passage below and answer questions 11 to 19.',
      passage:
        'It was a cool breezy day. The family was at the nature park. As soon as they entered the park, they could hear birds chirping and leaves rustling. The children saw a monitor lizard swimming lazily in the water.\n\n' +
        '"I can\'t wait to see a crocodile," Amelia squealed, jumping up and down.\n\n' +
        'Her brother, Ben, covered his ears and frowned. "Don\'t scream, Amelia. Dad told us not to frighten the birds or destroy their nests," he reminded her. He hoped to see a kingfisher.\n\n' +
        'Suddenly, Ben stopped walking. He had spotted a bird on the branch of a tree. He looked through his binoculars. Then he whispered, "It\'s a kingfisher."\n\n' +
        'Amelia gripped his arm and squinted. "Where?" she yelled. She had forgotten what their father had told them. Startled, the bird flapped its wings and flew off. When Amelia realised what she had done, tears welled up in her eyes. She wiped them away and said softly, "I\'m sorry, Ben." She knew that she had frightened it away.\n\n' +
        'Ben felt disappointed, but he gave his sister a hug to comfort her. Kindly, he said, "It\'s all right, Amelia."\n\n' +
        'Suddenly, Amelia tapped her brother on his shoulder. She kept very quiet and did not make a sound. She pointed to something shiny in the water. Ben and Amelia stared at the water. As fast as lightning, a kingfisher dived into the water and caught a fish. Ben was thrilled!\n\n' +
        '"Well done, little sister," Ben said. Amelia smiled proudly at her big brother.',
      marks: 10,
      questions: [
        {
          questionNo: '11',
          format: 'mcq',
          marks: 1,
          stem:
            'The family heard sounds of ________ and leaves rustling when they entered the park. Choose the correct answer and write its number (1, 2 or 3) in the bracket.',
          options: [
            { label: '1', text: 'wind howling' },
            { label: '2', text: 'birds chirping' },
            { label: '3', text: 'water splashing' },
          ],
          answer: '2',
          solution: {
            method: 'Find the sound mentioned together with \'leaves rustling\' in the passage.',
            steps: [
              'First paragraph: "they could hear birds chirping and leaves rustling."',
              'The sound paired with \'leaves rustling\' is \'birds chirping\'.',
              'Therefore, the answer is (2) birds chirping.',
            ],
            tip: 'For fill-in-the-blank MCQ questions, find the exact sentence in the passage and match it directly for the most accurate answer.',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem: 'Ben wanted to see a ________ that day. Write its number (1, 2 or 3) in the bracket.',
          options: [
            { label: '1', text: 'crocodile' },
            { label: '2', text: 'kingfisher' },
            { label: '3', text: 'monitor lizard' },
          ],
          answer: '2',
          solution: {
            method: 'Identify what each character wanted to see.',
            steps: [
              'From the passage: "He hoped to see a kingfisher." (He = Ben)',
              'The person who wanted to see a crocodile was Amelia.',
              'The monitor lizard was the animal they had already seen in the water.',
              'Therefore, Ben wanted to see (2) kingfisher.',
            ],
            tip: 'When different characters want different things, always check whose words or thoughts they are (he/she).',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes to show the sequence of events that happened in the passage.\n' +
            '( ) Ben forgave Amelia for frightening the bird away.\n' +
            '( ) Ben reminded Amelia about their Dad\'s instructions.\n' +
            '( ) Ben praised Amelia for being quiet and not frightening the bird.',
          answer:
            'Ben forgave Amelia for frightening the bird away = 2; Ben reminded Amelia about their Dad\'s instructions = 1; Ben praised Amelia for being quiet and not frightening the bird = 3',
          solution: {
            method: 'Number the events in the order they appear in the passage.',
            steps: [
              'First: Right after entering the park, Ben reminds everyone of Dad\'s instructions by saying \'Dad told us not to frighten the birds...\' → 1.',
              'Next: After the bird is scared away, Ben forgives Amelia by saying \'It\'s all right, Amelia.\' → 2.',
              'Last: When Amelia stays quiet and they get to see the kingfisher, Ben praises her by saying \'Well done, little sister.\' → 3.',
            ],
            tip: 'For sequence questions, follow the passage from top to bottom and mark where each event appears — this helps you avoid mixing up the order.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick ("True" or "False"): Amelia spotted the kingfisher first.',
          answer: 'False',
          solution: {
            method: 'Check the passage to find out who spotted the bird first.',
            steps: [
              'Passage: \'Suddenly, Ben stopped walking. He had spotted a bird... "It\'s a kingfisher."\'',
              'The first person to spot the kingfisher was Ben.',
              'Therefore, \'Amelia discovered it first\' is wrong → False.',
            ],
            tip: 'For True/False questions, check whether the key word in the statement (here, \'first\') matches what the passage says.',
          },
        },
        {
          questionNo: '15',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick ("True" or "False"): Amelia yelled loudly and frightened the kingfisher away.',
          answer: 'True',
          solution: {
            method: 'Check the passage for what Amelia did and what happened as a result.',
            steps: [
              'Passage: \'"Where?" she yelled.\' — Amelia made a loud noise.',
              'Next: \'Startled, the bird flapped its wings and flew off.\'',
              'Because Amelia\'s shouting startled the bird and made it fly away → True.',
            ],
            tip: 'If both the cause (shouting) and the effect (bird flying away) are stated in the passage, we decide it is True.',
          },
        },
        {
          questionNo: '16',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word, (A) gripped or (B) squinted, tells you that Amelia tried to strain her eyes to see clearly? Circle either (A) or (B). Sentence: "Amelia gripped his arm and squinted."',
          options: [
            { label: 'A', text: 'gripped' },
            { label: 'B', text: 'squinted' },
          ],
          answer: 'B',
          solution: {
            method: 'Compare the meanings of the two words and choose the one that matches \'Squinting to look carefully\'.',
            steps: [
              'gripped = to hold tightly (an action of the hands) → not related to seeing.',
              'squinted = to partly close your eyes (an action done when trying to see better).',
              'The word that means trying hard to focus with your eyes is (B) squinted.',
            ],
            tip: 'For word choice questions, think about the body action or meaning each word describes, then match it to what the question is asking.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem: 'What does the word "them" in line 13 refer to?',
          answer: 'the tears (that welled up in Amelia\'s eyes)',
          solution: {
            method: 'Find the plural noun that appears just before the pronoun \'them\'.',
            steps: [
              'The sentence is: \'tears welled up in her eyes. She wiped them away\'.',
              'In \'wiped them away\', the thing being wiped is \'tears\', which appears just before.',
              'Therefore, them = the tears (the tears that welled up in Amelia\'s eyes).',
            ],
            tip: 'For pronoun reference questions (them / it / they), always check the sentence just before for the closest noun first.',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 2,
          stem:
            'Name two things that their father advised them not to do when observing birds.\n(a) ________\n(b) ________',
          answer: '(a) frighten the birds  (b) destroy their nests',
          solution: {
            method: 'Find the sentence where Dad gives his instructions, then separate the two things he mentioned.',
            steps: [
              'Passage: \'Dad told us not to frighten the birds or destroy their nests\'.',
              'The word \'or\' connects the two things that are not allowed.',
              '(a) Do not startle the birds / (b) Do not destroy the nest.',
            ],
            tip: 'When a question asks for "two things", split the two items joined by "and/or" in one sentence from the passage into two separate answers.',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem:
            'Write the words that best describe Amelia\'s behaviour at different parts of the story. Use the words given in the box (calm | excited).\n' +
            'At the start of the story: ________\n' +
            'At the end of the story: ________',
          answer: 'At the start: excited;  At the end: calm',
          solution: {
            method: 'Find descriptions of Amelia\'s actions at the beginning and end of the story, then match them to the answer choices.',
            steps: [
              'Beginning: "Amelia squealed, jumping up and down." → This shows she was excited.',
              'End: "She kept very quiet and did not make a sound." → This shows she was calm.',
              'Therefore, beginning = excited, end = calm.',
            ],
            tip: 'For questions about a character\'s personality or feelings, choose the adjective based on what that person did (their action).',
          },
        },
      ],
    },
  ],
};

export default wa1HenryParkPrimaryEnglish2024;
