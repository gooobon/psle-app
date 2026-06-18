// Nanyang Primary School — End-of-Year Examination 2024
// Primary 3 English Language Paper 2
// Source PDF pages 722–735

import { ExamPaper } from '../../types';

const paper: ExamPaper = {
  id: 'eoy_nanyang_p2_2025',
  school: 'Nanyang Primary School',
  schoolCode: 'nanyang',
  level: 'P3',
  subject: 'English',
  paperType: 'Paper2',
  examType: 'EOY',
  year: 2024,
  totalMarks: 50,
  duration: '1h 15min',
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — GRAMMAR MCQ  (10 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-a',
      name: 'Section A: Grammar',
      topic: 'GrammarMCQ',
      marks: 10,
      instructions:
        'For each question from 1 to 10, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade your answer on the Optical Answer Sheet (OAS).',
      questions: [
        {
          id: 'ny-eoy-p2-a-q1',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 1,
          stem: 'Nellie will meet her friend __________ Saturday.',
          options: [
            { label: '1', text: 'in' },
            { label: '2', text: 'at' },
            { label: '3', text: 'on' },
            { label: '4', text: 'into' },
          ],
          answer: '3',
          solution: {
            method: 'Preposition for days of the week',
            steps: [
              '"On" is always used before days of the week: on Monday, on Saturday.',
              '"In" is used for months/years/seasons; "at" for specific times.',
              '"On Saturday" is correct.',
            ],
            tip: 'Days of the week always take "on": on Monday, on Friday, on Saturday.',
          },
        },
        {
          id: 'ny-eoy-p2-a-q2',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 2,
          stem: 'The students __________ late for football practice yesterday.',
          options: [
            { label: '1', text: 'is' },
            { label: '2', text: 'are' },
            { label: '3', text: 'was' },
            { label: '4', text: 'were' },
          ],
          answer: '4',
          solution: {
            method: 'Subject-verb agreement + past tense',
            steps: [
              '"The students" is plural.',
              'Time clue: "yesterday" → past tense.',
              'Plural past tense of "to be" = "were".',
            ],
            tip: 'Past tense: I/He/She/It → was; We/You/They → were.',
          },
        },
        {
          id: 'ny-eoy-p2-a-q3',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 3,
          stem: 'As I __________ the school, it started raining.',
          options: [
            { label: '1', text: 'leave' },
            { label: '2', text: 'have left' },
            { label: '3', text: 'will leave' },
            { label: '4', text: 'was leaving' },
          ],
          answer: '4',
          solution: {
            method: 'Past continuous for interrupted action',
            steps: [
              'Two events: (1) leaving school — ongoing action; (2) it started raining — interrupting event.',
              '"As" = while/at the same time → past continuous for the ongoing action.',
              '"Was leaving" correctly captures the action in progress when rain started.',
            ],
            tip: '"As/When + past continuous, simple past" = an ongoing action interrupted by another event.',
          },
        },
        {
          id: 'ny-eoy-p2-a-q4',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 4,
          stem: 'Jim and Dave __________ very excited when they found the treasure.',
          options: [
            { label: '1', text: 'is' },
            { label: '2', text: 'are' },
            { label: '3', text: 'was' },
            { label: '4', text: 'were' },
          ],
          answer: '4',
          solution: {
            method: 'Subject-verb agreement + past tense',
            steps: [
              '"Jim and Dave" = compound subject → plural.',
              '"When they found" → past tense context.',
              'Plural past "to be" → "were".',
            ],
            tip: '"A and B were ___" — compound subjects are plural, use "were" in past tense.',
          },
        },
        {
          id: 'ny-eoy-p2-a-q5',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 5,
          stem: 'James __________ a book on unusual plants at the school book fair yesterday.',
          options: [
            { label: '1', text: 'buys' },
            { label: '2', text: 'bought' },
            { label: '3', text: 'has bought' },
            { label: '4', text: 'was buying' },
          ],
          answer: '2',
          solution: {
            method: 'Simple past for completed action with time marker',
            steps: [
              '"Yesterday" is a definite past time marker → simple past tense.',
              '"Bought" = past tense of "buy" → correct.',
              '"Has bought" (present perfect) cannot be used with "yesterday".',
            ],
            tip: '"Yesterday" always signals simple past tense. Never use present perfect with "yesterday".',
          },
        },
        {
          id: 'ny-eoy-p2-a-q6',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 6,
          stem: '"Liam __________ a picture in Art class now," Mrs Chan informed the principal.',
          options: [
            { label: '1', text: 'paints' },
            { label: '2', text: 'painted' },
            { label: '3', text: 'is painting' },
            { label: '4', text: 'has painted' },
          ],
          answer: '3',
          solution: {
            method: 'Present continuous for action happening right now',
            steps: [
              '"Now" = at this moment → present continuous tense.',
              '"Is painting" = present continuous (is + verb-ing) → correct.',
              '"Paints" = simple present (habitual); "painted" = past; "has painted" = present perfect.',
            ],
            tip: '"Now" triggers present continuous. Subject is "Liam" (singular) → "is painting".',
          },
        },
        {
          id: 'ny-eoy-p2-a-q7',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 7,
          stem: '"Give me __________ pen over there," demanded Ken.',
          options: [
            { label: '1', text: 'this' },
            { label: '2', text: 'that' },
            { label: '3', text: 'these' },
            { label: '4', text: 'those' },
          ],
          answer: '2',
          solution: {
            method: 'Demonstrative — singular + distance',
            steps: [
              '"Pen" is singular → use singular demonstrative (this or that).',
              '"Over there" = far away → "that" (for distant objects).',
              '"That pen over there" = correct.',
            ],
            tip: '"Over there" signals distance → "that" (singular) or "those" (plural).',
          },
        },
        {
          id: 'ny-eoy-p2-a-q8',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 8,
          stem: 'I wanted to go to the park, __________ Mother did not allow me to.',
          options: [
            { label: '1', text: 'or' },
            { label: '2', text: 'but' },
            { label: '3', text: 'since' },
            { label: '4', text: 'because' },
          ],
          answer: '2',
          solution: {
            method: 'Conjunction showing contrast/opposition',
            steps: [
              'Two contrasting ideas: (1) I wanted to go; (2) Mother did not allow.',
              '"But" is the conjunction of contrast — correctly links these opposing ideas.',
              '"Or" = alternative; "since/because" = reason — none of these fit.',
            ],
            tip: '"But" links two contrasting or opposing ideas in one sentence.',
          },
        },
        {
          id: 'ny-eoy-p2-a-q9',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 9,
          stem: 'Let us make a trip to the supermarket as we do not have __________ milk left.',
          options: [
            { label: '1', text: 'few' },
            { label: '2', text: 'little' },
            { label: '3', text: 'many' },
            { label: '4', text: 'much' },
          ],
          answer: '4',
          solution: {
            method: 'Quantifiers for uncountable nouns in negative context',
            steps: [
              '"Milk" is uncountable → use "much" or "little" (not "few"/"many").',
              '"Do not have much milk left" = very little milk remains — a reason to go to the supermarket.',
              '"Much" is used in negative sentences with uncountable nouns: "not much milk".',
            ],
            tip: '"Much" = large quantity of uncountable noun (used in negatives/questions). "Many" = large number of countable nouns.',
          },
        },
        {
          id: 'ny-eoy-p2-a-q10',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 10,
          stem: 'There were only __________ people at the party even though it started hours ago.',
          options: [
            { label: '1', text: 'many' },
            { label: '2', text: 'a few' },
            { label: '3', text: 'a little' },
            { label: '4', text: 'a lot of' },
          ],
          answer: '2',
          solution: {
            method: 'Quantifier for small number of countable noun',
            steps: [
              '"People" is a countable noun.',
              'Context: party started hours ago but only a small number of people came → small quantity.',
              '"A few" = a small number of countable noun → correct.',
              '"A little" = small amount of uncountable noun (wrong for people).',
            ],
            tip: '"A few" = small number + countable noun. "A little" = small amount + uncountable noun.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — VOCABULARY MCQ  (6 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-b',
      name: 'Section B: Vocabulary',
      topic: 'VocabMCQ',
      marks: 6,
      instructions:
        'For each question from 11 to 16, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade your answer on the OAS.',
      questions: [
        {
          id: 'ny-eoy-p2-b-q11',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 11,
          stem: 'The wider entrance made it __________ for people in wheelchairs to enter the store.',
          options: [
            { label: '1', text: 'easier' },
            { label: '2', text: 'harder' },
            { label: '3', text: 'difficult' },
            { label: '4', text: 'comfortable' },
          ],
          answer: '1',
          solution: {
            method: 'Vocabulary in context — cause and effect',
            steps: [
              'A wider entrance → more space → easier movement for wheelchairs.',
              '"Easier" = less difficult → a wider entrance logically makes things easier.',
              '"Harder/difficult" contradict the logic (wider = more space = easier).',
            ],
            tip: 'Logic: wider entrance = more room = easier access. Context confirms "easier".',
          },
        },
        {
          id: 'ny-eoy-p2-b-q12',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 12,
          stem: "Amy's dog is so protective of her puppies that she would __________ at anyone who goes near them.",
          options: [
            { label: '1', text: 'hiss' },
            { label: '2', text: 'hoot' },
            { label: '3', text: 'snort' },
            { label: '4', text: 'growl' },
          ],
          answer: '4',
          solution: {
            method: 'Animal sound vocabulary — protective dog',
            steps: [
              'A dog warning off strangers from its puppies would "growl" — a low, threatening sound.',
              '"Hiss" = sound made by cats/snakes; "hoot" = owls/car horns; "snort" = horses/pigs.',
              '"Growl" is the characteristic warning sound of a protective dog.',
            ],
            tip: '"Growl" = low, threatening sound made by dogs when warning or angry.',
          },
        },
        {
          id: 'ny-eoy-p2-b-q13',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 13,
          stem: 'The discipline master caught the __________ who stole the wallet.',
          options: [
            { label: '1', text: 'victim' },
            { label: '2', text: 'target' },
            { label: '3', text: 'culprit' },
            { label: '4', text: 'witness' },
          ],
          answer: '3',
          solution: {
            method: 'Vocabulary — person responsible for a wrongdoing',
            steps: [
              '"Culprit" = the person who committed a crime or offence.',
              '"Victim" = the person harmed; "witness" = someone who saw it; "target" = the person aimed at.',
              'The discipline master caught the person who stole the wallet → the culprit.',
            ],
            tip: '"Culprit" = the guilty person/wrongdoer. "Victim" = person harmed.',
          },
        },
        {
          id: 'ny-eoy-p2-b-q14',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 14,
          stem: 'Mei Ling is a __________ girl. She always hides in her room whenever there are visitors around.',
          options: [
            { label: '1', text: 'bold' },
            { label: '2', text: 'bashful' },
            { label: '3', text: 'curious' },
            { label: '4', text: 'confident' },
          ],
          answer: '2',
          solution: {
            method: 'Vocabulary — character trait from behaviour',
            steps: [
              'Behaviour: hides in her room when visitors come → avoids social situations.',
              '"Bashful" = shy and embarrassed around people — perfectly matches the hiding behaviour.',
              '"Bold/confident" = the opposite (not shy); "curious" = interested in exploring.',
            ],
            tip: '"Bashful" = shy, easily embarrassed. Hiding from visitors is a classic sign of bashfulness.',
          },
        },
        {
          id: 'ny-eoy-p2-b-q15',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 15,
          stem: 'Shanti has trained hard the whole morning and does not look tired at all. She makes running look __________.',
          options: [
            { label: '1', text: 'smooth' },
            { label: '2', text: 'effortless' },
            { label: '3', text: 'exhausting' },
            { label: '4', text: 'challenging' },
          ],
          answer: '2',
          solution: {
            method: 'Vocabulary — how skilled athletes appear to perform',
            steps: [
              'Shanti trained hard but "does not look tired" → she looks like she is not working hard at all.',
              '"Effortless" = done without apparent effort, seeming very easy for the performer.',
              '"Exhausting/challenging" would be the opposite (she would look tired).',
              '"Smooth" can describe technique but "effortless" better captures the idea of not appearing tired.',
            ],
            tip: 'When someone trains hard but looks fresh and unhurried, their performance appears "effortless".',
          },
        },
        {
          id: 'ny-eoy-p2-b-q16',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 16,
          stem: 'Held once every four years, the Olympic Games __________ the world\'s best athletes against each other.',
          options: [
            { label: '1', text: 'pit' },
            { label: '2', text: 'play' },
            { label: '3', text: 'push' },
            { label: '4', text: 'present' },
          ],
          answer: '1',
          solution: {
            method: 'Vocabulary — phrasal verb "pit against"',
            steps: [
              '"Pit A against B" = to put in competition against each other.',
              '"The Olympic Games pit the world\'s best athletes against each other" = the Games make them compete.',
              '"Play/push/present against" are not standard collocations in this context.',
            ],
            tip: '"Pit A against B" = set A in competition against B. A fixed phrase for competitions.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — GRAMMAR CLOZE  (8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-c',
      name: 'Section C: Grammar Cloze',
      topic: 'GrammarCloze',
      marks: 8,
      instructions:
        'There are 4 blanks numbered 17 to 20. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. Use each word once only. (4 marks)\n\nFor questions 21 to 24, underline the correct word from the words given in the brackets. (4 marks)',
      subSections: [
        {
          id: 'sec-c-p1',
          name: "Passage 1 — Lily's Cycling Lesson",
          wordBox: [
            { label: 'A', word: 'he' },
            { label: 'B', word: 'her' },
            { label: 'C', word: 'him' },
            { label: 'D', word: 'she' },
            { label: 'E', word: 'they' },
            { label: 'F', word: 'you' },
          ],
          passage: {
            text: "Last week, Lily's father taught her to ride a bicycle. At first, (17) ___ held onto the back of the bicycle as Lily had difficulty balancing on the bicycle. With each pedal, Lily was riding more steadily. Her father said encouragingly, \"Lily, (18) ___ can do this!\"\n\nAfter a few tries, Lily's father released his grip on the back of the bicycle. Lily pedalled confidently with a big smile on (19) ___ face. Then, (20) ___ celebrated by having ice cream together. What a great day!",
          },
          questions: [
            {
              id: 'ny-eoy-p2-c-q17',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 17,
              stem: 'At first, (17) ___ held onto the back of the bicycle.',
              answer: 'A (he)',
              solution: {
                method: 'Pronoun — subject referring to Lily\'s father',
                steps: [
                  'Subject of "held onto" = Lily\'s father.',
                  'Lily\'s father = 3rd-person singular male → "he".',
                ],
                tip: 'Identify the subject: who held the bicycle? Father → "he".',
              },
            },
            {
              id: 'ny-eoy-p2-c-q18',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 18,
              stem: 'Her father said encouragingly, "Lily, (18) ___ can do this!"',
              answer: 'F (you)',
              solution: {
                method: 'Pronoun — subject in direct speech, referring to Lily',
                steps: [
                  'Father is speaking directly to Lily → "you" (2nd person).',
                  '"You can do this!" = encouragement addressed to Lily.',
                ],
                tip: 'In direct speech, when someone speaks to another person, use "you".',
              },
            },
            {
              id: 'ny-eoy-p2-c-q19',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 19,
              stem: 'Lily pedalled confidently with a big smile on (19) ___ face.',
              answer: 'B (her)',
              solution: {
                method: 'Possessive pronoun referring to Lily (female)',
                steps: [
                  'The face belongs to Lily — female → possessive "her".',
                  '"Her face" = Lily\'s face.',
                ],
                tip: 'Possessive pronouns: he → his, she → her. The face belongs to Lily (she) → her.',
              },
            },
            {
              id: 'ny-eoy-p2-c-q20',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 20,
              stem: 'Then, (20) ___ celebrated by having ice cream together.',
              answer: 'E (they)',
              solution: {
                method: 'Pronoun — subject referring to Lily and her father together',
                steps: [
                  '"Together" signals that both Lily and her father celebrated.',
                  'Lily + father = 3rd-person plural → "they".',
                ],
                tip: '"Together" implies both people → use "they" (plural, 3rd person).',
              },
            },
          ],
        },
        {
          id: 'sec-c-p2',
          name: 'Passage 2 — Dolphins',
          passage: {
            text: 'Dolphins are intelligent animals that live in oceans around the world. They (21) [has / have] a sleek body and a fin on their back, which help them move quickly through the water. The largest dolphin (22) [is / are] called the Orca, or Killer Whale, and it can grow up to 10 metres long. Dolphins have smooth, rubbery skin. It (23) [protect / protects] them from getting hurt while swimming. They communicate using clicks and whistles. This (24) [allow / allows] them to talk to each other even in deep waters. However, the pollution in the oceans could harm many dolphins and their environment.',
          },
          questions: [
            {
              id: 'ny-eoy-p2-c-q21',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 21,
              stem: 'They (21) [has / have] a sleek body and a fin on their back.',
              answer: 'have',
              solution: {
                method: 'Subject-verb agreement — plural subject',
                steps: [
                  'Subject: "They" (referring to dolphins) → plural.',
                  'Plural subject → "have" (not "has").',
                ],
                tip: 'He/She/It → has; I/We/You/They → have.',
              },
            },
            {
              id: 'ny-eoy-p2-c-q22',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 22,
              stem: 'The largest dolphin (22) [is / are] called the Orca.',
              answer: 'is',
              solution: {
                method: 'Subject-verb agreement — singular subject',
                steps: [
                  'Subject: "The largest dolphin" → singular.',
                  'Singular → "is".',
                ],
                tip: '"The largest dolphin" = one specific dolphin → singular → "is".',
              },
            },
            {
              id: 'ny-eoy-p2-c-q23',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 23,
              stem: 'It (23) [protect / protects] them from getting hurt while swimming.',
              answer: 'protects',
              solution: {
                method: 'Subject-verb agreement — singular subject "It"',
                steps: [
                  'Subject: "It" (referring to their skin) → 3rd-person singular.',
                  'Simple present, singular → "protects" (verb + s).',
                ],
                tip: 'He/She/It → always add -s to the verb in simple present.',
              },
            },
            {
              id: 'ny-eoy-p2-c-q24',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 24,
              stem: 'This (24) [allow / allows] them to talk to each other even in deep waters.',
              answer: 'allows',
              solution: {
                method: 'Subject-verb agreement — singular "This"',
                steps: [
                  'Subject: "This" (referring to the communication method) → 3rd-person singular.',
                  'Singular → "allows".',
                ],
                tip: '"This/That" are singular demonstratives → use singular verb (+s).',
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — EDITING FOR SPELLING  (4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-d',
      name: 'Section D: Editing for Spelling',
      topic: 'Editing',
      marks: 4,
      instructions:
        'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage: {
        title: "Sue Lynn's School Assembly Speech",
        text: 'During a school assembly, Sue Lynn had to give a speech in front of the whole school. She (25) [delligently] prepared for it, but her mind went blank when she got up on stage. Everyone stared at her and some children (26) [geegled]. In a comforting tone, her teacher smiled and said, "Take a deep (27) [brefth], Sue Lynn."\n\nGradually, Sue Lynn remembered her speech. Although she felt extremely (28) [embaressed], she persevered and finished her speech. This experience taught her that making mistakes is how one learns and improves.',
      },
      questions: [
        {
          id: 'ny-eoy-p2-d-q25',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 25,
          stem: 'She (25) [delligently] prepared for it.',
          underlinedWord: 'delligently',
          answer: 'diligently',
          solution: {
            method: 'Spelling correction',
            steps: [
              'Correct spelling: d-i-l-i-g-e-n-t-l-y.',
              'Error: double "l" — "delligently". Correct: single "l".',
              '"Diligently" means carefully and with great effort.',
            ],
            tip: '"Diligently" — one "l": dil-i-gent-ly. Think: "diligent" → diligently.',
          },
        },
        {
          id: 'ny-eoy-p2-d-q26',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 26,
          stem: 'Some children (26) [geegled].',
          underlinedWord: 'geegled',
          answer: 'giggled',
          solution: {
            method: 'Spelling correction',
            steps: [
              'Correct spelling: g-i-g-g-l-e-d.',
              '"Geegled" has the wrong vowel — should be "giggled" (double g, short "i").',
              '"Giggled" = laughed in a silly, quiet way.',
            ],
            tip: '"Giggled" = gig-gled. The vowel is "i", not "ee". Double "g" in the middle.',
          },
        },
        {
          id: 'ny-eoy-p2-d-q27',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 27,
          stem: '"Take a deep (27) [brefth], Sue Lynn."',
          underlinedWord: 'brefth',
          answer: 'breath',
          solution: {
            method: 'Spelling correction',
            steps: [
              'Correct spelling: b-r-e-a-t-h.',
              '"Brefth" is a misspelling — missing the "a": breath.',
              'The noun is "breath"; the verb is "breathe".',
            ],
            tip: '"Breath" (noun) = b-r-e-a-t-h. "Breathe" (verb) has a silent "e" at the end.',
          },
        },
        {
          id: 'ny-eoy-p2-d-q28',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 28,
          stem: 'Although she felt extremely (28) [embaressed].',
          underlinedWord: 'embaressed',
          answer: 'embarrassed',
          solution: {
            method: 'Spelling correction',
            steps: [
              'Correct spelling: e-m-b-a-r-r-a-s-s-e-d.',
              '"Embaressed" has two errors: missing an "r" and wrong "ss" → should be "embarrassed".',
              'Remember: double "r" AND double "s": em-BAR-RASS-ed.',
            ],
            tip: '"Embarrassed" has two "r"s AND two "s"s: emBAR-RASSed.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — SENTENCE SYNTHESIS  (4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-e',
      name: 'Section E: Sentence Synthesis',
      topic: 'SentenceCombining',
      marks: 4,
      instructions:
        'For each of the questions 29 and 30, rewrite the given sentence(s) using the word(s) provided. Your answer must be in one sentence. The meaning of your sentence must be the same as the meaning of the given sentence(s).',
      questions: [
        {
          id: 'ny-eoy-p2-e-q29',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 2,
          questionNumber: 29,
          stem: 'I can go for the dance lesson on Monday. I can go for the dance lesson on Tuesday.\n\n___________________________________________ or ___________________________________________',
          givenSentences: [
            'I can go for the dance lesson on Monday.',
            'I can go for the dance lesson on Tuesday.',
          ],
          connectorProvided: 'or',
          answer: 'I can go for the dance lesson on Monday or Tuesday.',
          solution: {
            method: 'Sentence combining with "or" — giving alternatives',
            steps: [
              '"Or" joins two alternatives.',
              'Both sentences share "I can go for the dance lesson on ___".',
              'Combine by keeping the common part once and joining the alternatives: "on Monday or Tuesday".',
              'Answer: "I can go for the dance lesson on Monday or Tuesday."',
            ],
            tip: '"Or" joins two alternative options. Keep the common elements once and list the alternatives.',
          },
        },
        {
          id: 'ny-eoy-p2-e-q30',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 2,
          questionNumber: 30,
          stem: 'My grandmother likes cooking. She does not like washing the dishes.\n\n___________________________________________ but ___________________________________________',
          givenSentences: [
            'My grandmother likes cooking.',
            'She does not like washing the dishes.',
          ],
          connectorProvided: 'but',
          answer: 'My grandmother likes cooking but she does not like washing the dishes.',
          alternativeAnswers: [
            'My grandmother likes cooking but does not like washing the dishes.',
            'My grandmother likes cooking but not washing the dishes.',
          ],
          solution: {
            method: 'Sentence combining with "but" — showing contrast',
            steps: [
              '"But" joins two contrasting ideas.',
              'Idea 1: grandmother likes cooking.',
              'Idea 2: she does not like washing the dishes.',
              'Combine: "My grandmother likes cooking but she does not like washing the dishes."',
            ],
            tip: '"But" shows contrast between two ideas. Keep both clauses clear.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — COMPREHENSION 1  (8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-f',
      name: "Section F: Comprehension 1 — Sam's Garden Adventure",
      topic: 'ComprehensionOE',
      marks: 8,
      instructions: 'Read this passage and answer questions 31 to 37.',
      passage: {
        title: "Sam's Garden Adventure",
        lines: [
          'Sam wandered aimlessly around the garden of his new house. He spotted a',
          'ball and gave it a mighty kick. He watched the ball soar over the garden wall into a',
          'neighbouring garden that looked like a thick jungle.',
          '',
          'Sam began imagining himself in the garden with wild animals lurking around', // line 5
          'and grew worried. "Oh no, how will I get my ball back?" he thought anxiously.',
          '',
          '"Hello, anyone there?" he called, hoping for a response. There was silence.',
          'Suddenly, a voice cried out.',
          '',
          '"Up here!" Glancing up, Sam saw a girl perched in a tree. "Hi, I am Ava," she greeted.',
          '',
          'Sam introduced himself and explained about his ball. Ava agreed to help.', // line 10
          '',
          '"I can see your ball, but I have some bad news for you," said Ava. "There\'s a',
          'wolf and three tigers guarding the ball! Stay there, I will get the ball back for you."',
          '',
          'Sam started imagining wild beasts climbing over the wall. He crouched down', // line 13
          'with his eyes closed tightly. Just as he was expecting a wild beast to pounce on him,',
          'a hand touched him on the shoulder. He nearly jumped out of his skin. Thankfully, it', // line 15
          'was just Ava!',
          '',
          'Ava led Sam through a hidden door in the wall. Inside the garden, Sam\'s fears',
          'disappeared. The "wolf" was actually Ava\'s playful dog, and the "tigers" were her three',
          'curious cats. Sam smiled. In this unexpected adventure, he found not only the ball but',
          'also a friend in Ava. With Ava\'s imaginative tales, even the most ordinary garden', // line 20
          'turned into a thrilling jungle filled with "wolves" and "tigers".',
        ],
      },
      questions: [
        {
          id: 'ny-eoy-p2-f-q31',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 31,
          stem: 'Based on the first paragraph, tick √ one word that best describes how Sam was feeling. [1m]\n\nangry □  excited □  bored □',
          answer: 'bored',
          solution: {
            method: 'Inference from text — character\'s feeling',
            steps: [
              '"Sam wandered aimlessly around the garden" — aimlessly = without purpose/direction.',
              '"Wandered aimlessly" is a key clue for boredom — he had nothing to do.',
              '"Bored" best describes someone wandering without purpose.',
              '"Angry" and "excited" would be shown by different actions.',
            ],
            tip: '"Wandered aimlessly" = moved without purpose = a sign of boredom.',
          },
        },
        {
          id: 'ny-eoy-p2-f-q32',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 32,
          stem: 'True or False: Sam was planning to get the ball back on his own. [1m]',
          answer: 'False',
          solution: {
            method: 'Direct recall',
            steps: [
              'Sam called out for help: "Hello, anyone there?" — he was hoping someone else would help.',
              'Ava agreed to help him: "I will get the ball back for you."',
              'Sam did not plan to retrieve it himself → False.',
            ],
            tip: 'Sam asked for help and waited for Ava — he did not plan to get it himself.',
          },
        },
        {
          id: 'ny-eoy-p2-f-q33',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 33,
          stem: "True or False: Sam kicked the ball into his neighbour's garden. [1m]",
          answer: 'True',
          solution: {
            method: 'Direct recall',
            steps: [
              '"He watched the ball soar over the garden wall into a neighbouring garden."',
              'The neighbouring garden = his neighbour\'s garden → True.',
            ],
            tip: '"Neighbouring garden" = the garden next door = neighbour\'s garden.',
          },
        },
        {
          id: 'ny-eoy-p2-f-q34',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 34,
          stem: 'Based on paragraph 6, what was the bad news that Ava was referring to? [2m]\n\nShe saw _________________ and _________________ guarding Sam\'s ball.',
          answer: 'She saw a wolf and three tigers guarding Sam\'s ball.',
          solution: {
            method: 'Direct retrieval',
            steps: [
              'Ava said: "There\'s a wolf and three tigers guarding the ball!"',
              'The "bad news" = a wolf AND three tigers were guarding the ball.',
              'Fill in blanks: "a wolf" and "three tigers".',
            ],
            tip: 'Look for Ava\'s exact words — she mentions two things guarding the ball.',
          },
        },
        {
          id: 'ny-eoy-p2-f-q35',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 35,
          stem: "Which five-word phrase from paragraph 7 has the same meaning as 'startled'? [1m]",
          answer: 'jumped out of his skin',
          solution: {
            method: 'Vocabulary — idiomatic phrase for startled',
            steps: [
              '"He nearly jumped out of his skin" = was extremely startled/shocked.',
              '"Jumped out of his skin" is an idiom meaning to be suddenly startled or frightened.',
              'The phrase has 5 words: jumped / out / of / his / skin.',
            ],
            tip: '"Jump out of one\'s skin" is an idiom for being suddenly and severely startled.',
          },
        },
        {
          id: 'ny-eoy-p2-f-q36',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 36,
          stem: 'In the last paragraph, Sam smiled because __________. [1m]\n\n(A) there were no wild beasts\n(B) he was invited to Ava\'s house\n(C) he found his ball and made a new friend',
          answer: 'C',
          solution: {
            method: 'Inference — reason for Sam\'s smile',
            steps: [
              '"He found not only the ball but also a friend in Ava."',
              'Sam smiled because of both outcomes — recovering the ball AND making a new friend.',
              'Option C captures both reasons.',
            ],
            tip: '"Not only … but also" = two things. Sam found the ball AND a new friend.',
          },
        },
        {
          id: 'ny-eoy-p2-f-q37',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 37,
          stem: 'Write 1, 2 and 3 in the blanks below to show the events that happened first, next and last in the story. [1m]\n\n___ Ava promised Sam that she would get his ball back.\n___ Sam kicked the ball over the garden wall.\n___ Ava led Sam to her garden.',
          correctSequence: {
            'Ava promised Sam that she would get his ball back.': 2,
            'Sam kicked the ball over the garden wall.': 1,
            'Ava led Sam to her garden.': 3,
          },
          answer: 'Sam kicked ball = 1; Ava promised = 2; Ava led Sam = 3',
          solution: {
            method: 'Sequencing events',
            steps: [
              '1st: Sam kicked the ball into the neighbouring garden (para 1).',
              '2nd: Ava promised to get the ball back (para 5–6).',
              '3rd: Ava led Sam through the hidden door into her garden (para 8).',
            ],
            tip: 'Follow the story paragraph by paragraph: kick → promise → lead through door.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — COMPREHENSION 2  (10 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-g',
      name: "Section G: Comprehension 2 — Theo and the Bullies",
      topic: 'ComprehensionOE',
      marks: 10,
      instructions: 'Read this passage and answer questions 38 to 45.',
      passage: {
        title: "Theo's Bug Hunt",
        lines: [
          'Theo, buzzing with excitement, clutched his new bug kit as he walked out of',
          'his room. His mind briefly wandered to bullies at the park. They would make threats',
          'and push younger children around. However, Theo pushed his fear aside, eager to',
          'explore with his kit at the park.',
          '',
          'At the park, Theo\'s eyes sparkled as he searched the bushes for bugs.', // line 5
          'Magnifying glass in hand, he marvelled as he examined a beetle. "Wow! Look at this',
          'enormous beetle!"',
          '',
          'Venturing further, engrossed in his bug hunt, Theo was unaware of the older',
          'boys walking towards him. "Hey! What are you doing?" one sneered, blocking Theo\'s', // line 10
          'path. Theo froze and his heart was pounding. Then, Theo remembered his father\'s',
          'advice: "When you meet a bully, stay calm. Fighting back can make things worse."',
          '',
          '"Want to see the bugs I found?" Theo asked, trying to stand tall and sound',
          'confident. "They have pinchers!" The bullies scoffed and laughed at him. Calmly, Theo',
          'continued to respond with kindness. The boys were not interested.',
          '',
          '"I am tired of this. Let\'s go," said one of them. The boy grabbed Theo\'s bug kit', // line 15
          'and threw it on the ground as they walked away. Theo hurried to check on his bugs.',
          'Despite the bullies\' actions, he remained strong inside. "I\'m glad I followed Father\'s',
          'advice," he thought. Just then, a clicking sound from a nearby bush caught his',
          'attention.',
        ],
      },
      questions: [
        {
          id: 'ny-eoy-p2-g-q38',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 38,
          stem: 'Why was Theo "buzzing with excitement" (line 1)? [2m]',
          answer: 'He was looking forward to going to the park to use his new bug kit.',
          solution: {
            method: 'Inference — reason for excitement',
            steps: [
              '"Buzzing with excitement" = very excited.',
              'He "clutched his new bug kit" and was "eager to explore with his kit at the park".',
              'He was excited about going to the park to use his new bug kit and search for bugs.',
            ],
            tip: 'Look for what Theo was holding and what he was eager to do — these point to the reason.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q39',
          type: 'A',
          topic: 'ComprehensionMCQ',
          marks: 1,
          questionNumber: 39,
          stem: "In paragraph 2, Theo's eyes sparkled because __________. [1m]\n\n(A) he reached the park\n(B) there were bushes at the park\n(C) he was searching the bushes for bugs",
          answer: 'C',
          solution: {
            method: 'Direct retrieval — reason for sparkling eyes',
            steps: [
              '"Theo\'s eyes sparkled as he searched the bushes for bugs."',
              'The sparkling happened while he was searching — the activity itself excited him.',
              'Option C: "he was searching the bushes for bugs" is correct.',
            ],
            tip: '"As he searched" = while doing the action. The searching caused the sparkling.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q40',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 40,
          stem: 'In paragraph 3, how can you tell that Theo was afraid of the bullies at first? [2m]',
          answer: 'He froze and his heart was pounding.',
          solution: {
            method: 'Direct retrieval — physical signs of fear',
            steps: [
              '"Theo froze and his heart was pounding."',
              '"Froze" = stopped moving (a physical response to fear).',
              '"Heart was pounding" = rapid heartbeat from fear/anxiety.',
            ],
            tip: 'Physical responses to fear: freezing, pounding heart. Both are mentioned in the text.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q41',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 41,
          stem: 'Which of these words has the same meaning as "giving full attention"? Circle either (A) or (B). [1m]\n\nVenturing further, engrossed (A) in his bug hunt, Theo was unaware (B) of the older boys walking towards him.',
          answer: 'A (engrossed)',
          solution: {
            method: 'Vocabulary — synonym for "giving full attention"',
            steps: [
              '"Giving full attention" = completely absorbed, focused on something.',
              '"Engrossed" = completely occupied/absorbed by something — matches exactly.',
              '"Unaware" = not knowing about something — different meaning.',
            ],
            tip: '"Engrossed in" = totally absorbed, giving full attention to. "Engrossed in his bug hunt" = he was fully focused on it.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q42',
          type: 'A',
          topic: 'ComprehensionMCQ',
          marks: 1,
          questionNumber: 42,
          stem: "In paragraph 3, Theo felt __________ after remembering his father's advice. [1m]\n\n(A) nervous\n(B) amused\n(C) calm",
          answer: 'C',
          solution: {
            method: 'Inference — effect of remembering advice',
            steps: [
              'Father\'s advice: "stay calm." After remembering this, Theo tried "to stand tall and sound confident".',
              'He responded to the bullies calmly — he had calmed himself down.',
              '"Calm" (option C) best describes his state after applying his father\'s advice.',
            ],
            tip: 'The advice was to "stay calm" — recalling it made Theo feel calm and act accordingly.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q43',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 43,
          stem: 'True or False: Theo caught only one insect. [1m]',
          answer: 'False',
          solution: {
            method: 'Inference from text',
            steps: [
              'Theo said "Want to see the bugs I found?" — "bugs" (plural) suggests more than one.',
              'He also described "they have pinchers" — "they" = multiple bugs.',
              'Statement is False — he found more than one bug.',
            ],
            tip: '"Bugs I found" (plural) and "they have pinchers" (plural) show he caught multiple insects.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q44',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 44,
          stem: 'True or False: The bullies were fascinated by Theo\'s bug kit. [1m]',
          answer: 'False',
          solution: {
            method: 'Direct recall',
            steps: [
              '"The bullies scoffed and laughed at him." / "The boys were not interested."',
              '"Scoffed" = mocked/derided; "not interested" = no fascination.',
              'Statement is False.',
            ],
            tip: '"Not interested" directly contradicts "fascinated". Answer = False.',
          },
        },
        {
          id: 'ny-eoy-p2-g-q45',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 45,
          stem: 'Pick a three-word phrase from the last paragraph which shows that Theo was not disturbed or upset by what had happened. [1m]',
          answer: 'remained strong inside',
          solution: {
            method: 'Retrieval — three-word phrase',
            steps: [
              'Last paragraph: "Despite the bullies\' actions, he remained strong inside."',
              '"Remained strong inside" = was not emotionally disturbed/upset inside.',
              'Three words: remained / strong / inside.',
            ],
            tip: '"Remained strong inside" = inner strength, not disturbed. This is the three-word phrase.',
          },
        },
      ],
    },
  ],
};

export default paper;
