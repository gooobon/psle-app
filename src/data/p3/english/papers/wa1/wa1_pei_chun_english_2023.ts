// =============================================================================
// wa1_pei_chun_english_2023.ts
// Pei Chun Public School — Weighted Assessment 1, 2023 — English Language — P3
// Sections: Grammar MCQ (Q1-5, 5), Vocabulary MCQ (Q6-10, 5),
//           Comprehension (Q11-19, 10) = 20 marks
// Source PDF: P3_English_WA1.pdf, pp. 37–42  (Date on paper: 1 March 2023)
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1_pei_chun_english_2023: EnglishPaper = {
  meta: {
    school: 'Pei Chun Public School',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 45,
    totalMarks: 20,
    sourcePages: '37-42',
  },
  items: [
    // ---------------------------------------------------------------------
    // GRAMMAR MCQ (Q1–5, 5 x 1 mark)
    // For Q1-5, four options are given. Choose the correct answer and write
    // its number (1, 2, 3 or 4) in the brackets provided.
    // ---------------------------------------------------------------------
    {
      kind: 'single',
      id: 'pc2023-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'John and his friends ____________ walking home when they saw an accident.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '4',
      solution: {
        method: 'Match the verb to a plural subject in the past tense.',
        steps: [
          'The subject "John and his friends" is plural (more than one).',
          'The other verb "saw" is past tense, so this action is also in the past.',
          'Plural + past + ongoing action (walking) = "were walking", so the answer is "were".',
        ],
        tip: 'Plural subjects take "are/were". With an -ing word, this forms the continuous tense (were walking).',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'A greedy fox passed ____________ a big garden so that it could eat some juicy apples growing on a tree.',
      options: [
        { label: '1', text: 'across' },
        { label: '2', text: 'over' },
        { label: '3', text: 'out' },
        { label: '4', text: 'by' },
      ],
      answer: '4',
      solution: {
        method: 'Choose the preposition that fits "passed ____ a garden".',
        steps: [
          '"passed by" means went past something — the fox walked past the garden.',
          '"passed out" means fainted, and "passed over" means skipped or flew over — neither fits a fox on the ground.',
          'So the correct phrase is "passed by a big garden".',
        ],
        tip: 'Learn phrasal verbs as fixed units: pass by (go past), pass out (faint), pass away (die).',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: 'Can you please move ____________ flower pots here to the next room?',
      options: [
        { label: '1', text: 'this' },
        { label: '2', text: 'that' },
        { label: '3', text: 'these' },
        { label: '4', text: 'those' },
      ],
      answer: '3',
      solution: {
        method: 'Match the demonstrative to a plural noun that is near.',
        steps: [
          '"flower pots" is plural, so we need "these" or "those" (this/that are singular).',
          'The word "here" shows the pots are near the speaker.',
          'Near + plural = "these"; far + plural = "those". So the answer is "these".',
        ],
        tip: 'this/these = near; that/those = far. this/that = one; these/those = many.',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'My father loves to drink bitter coffee with ____________ sugar in it.',
      options: [
        { label: '1', text: 'much' },
        { label: '2', text: 'many' },
        { label: '3', text: 'some' },
        { label: '4', text: 'few' },
      ],
      answer: '3',
      solution: {
        method: 'Choose the right quantifier for an uncountable noun.',
        steps: [
          '"sugar" is uncountable, so "many" and "few" (for countable things) are wrong.',
          'The sentence is positive and means a small amount, so "some" fits best.',
          '"much" is usually used in questions or negatives, not in this plain positive sentence.',
        ],
        tip: 'many/few → countable (many cups). some/much → uncountable (some sugar).',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'After we finished painting our artwork, we cleaned up the desk ____________.',
      options: [
        { label: '1', text: 'itself' },
        { label: '2', text: 'herself' },
        { label: '3', text: 'ourselves' },
        { label: '4', text: 'themselves' },
      ],
      answer: '3',
      solution: {
        method: 'Match the reflexive pronoun to the subject "we".',
        steps: [
          'The subject doing the action is "we".',
          'The reflexive pronoun for "we" is "ourselves".',
          'Here it means we did the cleaning by ourselves, with no one else helping.',
        ],
        tip: 'Reflexive pronouns must agree with the subject: I → myself, we → ourselves, they → themselves.',
      },
    },

    // ---------------------------------------------------------------------
    // VOCABULARY MCQ (Q6–10, 5 x 1 mark)
    // For Q6-10, four options are given. Choose the correct answer.
    // ---------------------------------------------------------------------
    {
      kind: 'single',
      id: 'pc2023-q6',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: 'Susan heard a loud rumbling in her ____________ as she had skipped lunch.',
      options: [
        { label: '1', text: 'throat' },
        { label: '2', text: 'mouth' },
        { label: '3', text: 'muscles' },
        { label: '4', text: 'stomach' },
      ],
      answer: '4',
      solution: {
        method: 'Use the clue "skipped lunch" to find the body part that rumbles when hungry.',
        steps: [
          '"skipped lunch" means Susan did not eat, so she is hungry.',
          'A hungry person\'s stomach makes a rumbling sound.',
          'So the rumbling was in her "stomach".',
        ],
        tip: 'Use cause and effect: skipped lunch → hungry → stomach rumbles.',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'Shocked by the sudden ring of the alarm, the burglar ____________ out of the house.',
      options: [
        { label: '1', text: 'bolted' },
        { label: '2', text: 'walked' },
        { label: '3', text: 'strolled' },
        { label: '4', text: 'checked' },
      ],
      answer: '1',
      solution: {
        method: 'Pick the verb that shows running away quickly in fright.',
        steps: [
          'The burglar was "shocked" by an alarm, so he would run away fast to escape.',
          '"bolted" means ran away suddenly and very fast.',
          'walked and strolled are slow and calm; "checked" does not mean to move away.',
        ],
        tip: '"bolt" can mean to run off suddenly. Strong feelings (shock, fear) usually call for strong action verbs.',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'Mrs Brown was disappointed with Gina as she is ____________ of stealing an eraser from the school bookshop.',
      options: [
        { label: '1', text: 'guilty' },
        { label: '2', text: 'innocent' },
        { label: '3', text: 'shameful' },
        { label: '4', text: 'delighted' },
      ],
      answer: '1',
      solution: {
        method: 'Match the word to "disappointed" + "stealing", and to the phrase "____ of".',
        steps: [
          'Mrs Brown was disappointed, so Gina did something wrong (stealing).',
          'The set phrase "guilty of (doing something wrong)" fits "guilty of stealing".',
          '"innocent" means did NOT do it; "delighted" is a happy feeling; "shameful" describes the act, not "____ of".',
        ],
        tip: 'Notice the word after the blank: "of stealing". "guilty of" is a fixed phrase that points to the answer.',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: 'Damien has not eaten the whole day. He must be ____________.',
      options: [
        { label: '1', text: 'as fierce as a lion' },
        { label: '2', text: 'as gentle as a lamb' },
        { label: '3', text: 'as hungry as a bear' },
        { label: '4', text: 'as round as marbles' },
      ],
      answer: '3',
      solution: {
        method: 'Use the clue "has not eaten the whole day" to choose the simile.',
        steps: [
          'Not eating all day means Damien is very hungry.',
          'The simile "as hungry as a bear" describes great hunger.',
          'fierce, gentle and round do not match being hungry.',
        ],
        tip: 'Find the simile that matches the situation: not eating → hungry → "as hungry as a bear".',
      },
    },
    {
      kind: 'single',
      id: 'pc2023-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: 'He crept ____________ across the room in order not to disturb his brother who was sleeping.',
      options: [
        { label: '1', text: 'noisily' },
        { label: '2', text: 'quietly' },
        { label: '3', text: 'politely' },
        { label: '4', text: 'patiently' },
      ],
      answer: '2',
      solution: {
        method: 'Use the clue "not to disturb his sleeping brother".',
        steps: [
          'To avoid waking his brother, he had to make no sound.',
          '"quietly" means making little or no noise — it fits "crept... not to disturb".',
          '"noisily" is the opposite; politely and patiently do not match keeping silent.',
        ],
        tip: 'The word "crept" already hints at moving softly; the adverb should agree (quietly).',
      },
    },

    // ---------------------------------------------------------------------
    // COMPREHENSION (Q11–19, 10 marks)
    // Read the passage carefully and answer the questions that follow.
    // ---------------------------------------------------------------------
    {
      kind: 'set',
      id: 'pc2023-comprehension',
      topic: 'ComprehensionMCQ',
      title: 'Comprehension — Fishing on the Mermaid',
      instructions: 'Read the passage carefully and answer the questions that follow. (10 marks)',
      passage:
        'Tim pushed back his sailor\'s cap and gazed at the sea. The Mermaid was rocking gently on the water.\n\n' +
        '"Let\'s hope we get some mackerel today," his father said. "Your mum can cook them for dinner tonight."\n\n' +
        'Tim loved grilled mackerel. They had a great catch the last time they were out in the sea. He swallowed his saliva as he recalled the scrumptious meal he had last week.\n\n' +
        'Tim let the line out carefully until he felt the hook touch the bottom. Then, after a while, he reeled it in slowly. His father fished silently beside him. An hour later, all that they had to show for their efforts was seaweed. By then, the sky had faded into a shade of crimson red. The water gleamed in the last rays of the dying sun.\n\n' +
        '"It is getting late," Tim mumbled to himself as he let out a long sigh. He was struggling to keep his eyes open. Just as Tim was about to take a break, he felt a hard tug on his line. He thought he was imagining things when suddenly, he saw the line dip deeper into the water.\n\n' +
        'Instinctively, he reeled it in quickly. He had caught a mackerel! Tim\'s father reached over to help him get the wriggling fish off the hook. The Mermaid then gave a violent lurch and they fell hard onto the deck.\n\n' +
        '(Adapted from https://www.timeforkids.com)',
      paragraphs: [
        'Tim pushed back his sailor\'s cap and gazed at the sea. The Mermaid was rocking gently on the water.',
        '"Let\'s hope we get some mackerel today," his father said. "Your mum can cook them for dinner tonight."',
        'Tim loved grilled mackerel. They had a great catch the last time they were out in the sea. He swallowed his saliva as he recalled the scrumptious meal he had last week.',
        'Tim let the line out carefully until he felt the hook touch the bottom. Then, after a while, he reeled it in slowly. His father fished silently beside him. An hour later, all that they had to show for their efforts was seaweed. By then, the sky had faded into a shade of crimson red. The water gleamed in the last rays of the dying sun.',
        '"It is getting late," Tim mumbled to himself as he let out a long sigh. He was struggling to keep his eyes open. Just as Tim was about to take a break, he felt a hard tug on his line. He thought he was imagining things when suddenly, he saw the line dip deeper into the water.',
        'Instinctively, he reeled it in quickly. He had caught a mackerel! Tim\'s father reached over to help him get the wriggling fish off the hook. The Mermaid then gave a violent lurch and they fell hard onto the deck.',
      ],
      marks: 10,
      questions: [
        {
          questionNo: '11',
          format: 'mcq',
          marks: 1,
          stem: 'Tick your chosen answer. According to paragraph 1, what do you think Mermaid was? The Mermaid was a ____.',
          options: [
            { label: '1', text: 'fish' },
            { label: '2', text: 'boat' },
            { label: '3', text: 'hook' },
          ],
          answer: '2',
          solution: {
            method: 'Use the clues in paragraph 1 to work out what the Mermaid is.',
            steps: [
              'Tim wears a "sailor\'s cap" and the Mermaid is "rocking gently on the water".',
              'Something that floats and rocks on the water, with a sailor on it, is a boat.',
              'It is written in italics like a name, which is how boats are named. So the Mermaid was a boat.',
            ],
            tip: 'Italic names that float on water are usually ships or boats (e.g. the Titanic).',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem: 'Which word has the same meaning as "delicious"? Circle either (A) or (B): "He (A) swallowed his saliva as he recalled the (B) scrumptious meal he had last week."',
          options: [
            { label: 'A', text: 'swallowed' },
            { label: 'B', text: 'scrumptious' },
          ],
          answer: 'B',
          solution: {
            method: 'Find which underlined word describes food that tastes very good.',
            steps: [
              '"delicious" describes food that tastes very good.',
              '"scrumptious" also means very tasty/delicious, and it describes the "meal".',
              '"swallowed" is an action (gulping down), not a taste word, so (B) is correct.',
            ],
            tip: 'Synonym questions: match the part of speech too. "delicious" describes food, so look for the word that describes the meal.',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick if True or False (refer to paragraphs 3 and 4): It was Tim\'s first fishing trip.',
          answer: 'False',
          solution: {
            method: 'Check paragraph 3 for whether Tim had fished before.',
            steps: [
              'Paragraph 3: "They had a great catch the last time they were out in the sea."',
              '"the last time" shows they had been fishing before, so this is not his first trip.',
              'Therefore the statement is False.',
            ],
            tip: 'Words like "last time", "again" or "as usual" tell you something has happened before.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick if True or False (refer to paragraphs 3 and 4): Tim has to reel in the line quickly once the hook hits the bottom of the sea.',
          answer: 'False',
          solution: {
            method: 'Compare the statement with how Tim actually reeled in the line.',
            steps: [
              'Paragraph 4: after the hook touched the bottom, "after a while, he reeled it in slowly".',
              'He reeled it in SLOWLY and after a while, not quickly and not at once.',
              'So the statement is False.',
            ],
            tip: 'Watch the speed/time words (slowly vs quickly, after a while vs once). A wrong one makes the statement False.',
          },
        },
        {
          questionNo: '15',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick if True or False (refer to paragraphs 3 and 4): Tim and his father were fishing in the evening.',
          answer: 'True',
          solution: {
            method: 'Look for time-of-day clues in paragraph 4.',
            steps: [
              'Paragraph 4: "the sky had faded into a shade of crimson red" and "the last rays of the dying sun".',
              'A red sky and the setting sun describe the evening (sunset).',
              'So it is True that they were fishing in the evening.',
            ],
            tip: 'Describe-the-scene clues (setting sun, red sky, getting late) point to the evening.',
          },
        },
        {
          questionNo: '16',
          format: 'open',
          marks: 2,
          stem: 'List any two items Tim used for fishing.',
          answer: '(i) the (fishing) line  (ii) the hook',
          solution: {
            method: 'Scan the passage for the tools Tim used to fish.',
            steps: [
              'Paragraph 4: "Tim let the line out... until he felt the hook touch the bottom."',
              'Two items used for fishing are the line and the hook.',
              'Note: the "sailor\'s cap" is clothing he wears, not a tool for catching fish.',
            ],
            tip: 'For "list two items", pick clear, separate objects named in the passage (line, hook).',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'Which word in paragraph 4 has the same meaning as "quietly"?',
          answer: 'silently',
          solution: {
            method: 'Find the synonym of "quietly" in paragraph 4.',
            steps: [
              'Paragraph 4: "His father fished silently beside him."',
              '"silently" means without making a sound, which is the same as "quietly".',
              'So the answer is "silently".',
            ],
            tip: 'Copy the exact word from the stated paragraph; do not change its spelling or ending.',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 1,
          stem: 'Write 1, 2 or 3 in the blanks to show the order of Tim\'s actions on the fishing trip: ( ) Tim felt a hard tug on his line. ( ) Tim pushed back his sailor\'s cap and gazed at the sea. ( ) Tim let the line out carefully until he felt the hook touch the bottom.',
          answer:
            'Tim pushed back his sailor\'s cap and gazed at the sea = 1; Tim let the line out carefully until he felt the hook touch the bottom = 2; Tim felt a hard tug on his line = 3.',
          solution: {
            method: 'Place the events in the order they appear in the passage.',
            steps: [
              'First (paragraph 1): "Tim pushed back his sailor\'s cap and gazed at the sea." → 1',
              'Next (paragraph 4): "Tim let the line out... until he felt the hook touch the bottom." → 2',
              'Then (paragraph 5): "he felt a hard tug on his line." → 3',
            ],
            tip: 'Sequence questions follow the order of the story — find each event and number them in reading order.',
          },
        },
        {
          questionNo: '19',
          format: 'open',
          marks: 1,
          stem: 'Which sentence in paragraph 4 tells you that Tim and his father did not manage to catch any fish in the first hour?',
          answer:
            '"An hour later, all that they had to show for their efforts was seaweed."',
          solution: {
            method: 'Find the sentence in paragraph 4 that shows they caught no fish.',
            steps: [
              'Paragraph 4 says: "An hour later, all that they had to show for their efforts was seaweed."',
              'Getting only seaweed (and no fish) after an hour means they caught nothing in the first hour.',
              'So that is the sentence to copy as the answer.',
            ],
            tip: 'When a question asks "which sentence", copy the WHOLE sentence exactly from the passage.',
          },
        },
      ],
    },
  ],
};

export default wa1_pei_chun_english_2023;
