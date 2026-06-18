// Paya Lebar Methodist Girls' School (Primary) — End-of-Year Examination 2024
// Primary 3 English Language Paper 2
// Source PDF pages 744–759

import { ExamPaper } from '../../types';

const paper: ExamPaper = {
  id: 'eoy_plmgs_p2_2025',
  school: "Paya Lebar Methodist Girls' School (Primary)",
  schoolCode: 'plmgs',
  level: 'P3',
  subject: 'English',
  paperType: 'Paper2',
  examType: 'EOY',
  year: 2024,
  totalMarks: 50,
  duration: '1h 15min',
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — GRAMMAR MCQ  (8 marks, OAS)
    // ─────────────────────────────────────────────
    {
      id: 'sec-a',
      name: 'Section A: Grammar',
      topic: 'GrammarMCQ',
      marks: 8,
      instructions:
        'Choose the correct answer and write its number 1, 2, 3 or 4 in the brackets provided. Shade your answers in the optical answer sheet (OAS).',
      questions: [
        {
          id: 'pl-eoy-p2-a-q1',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 1,
          stem: 'We __________ for Hana after her performance.',
          options: [
            { label: '1', text: 'clap' },
            { label: '2', text: 'claps' },
            { label: '3', text: 'clapped' },
            { label: '4', text: 'are clapping' },
          ],
          answer: '3',
          solution: {
            method: 'Past tense for a completed action',
            steps: [
              'Context: a performance that is over → past action.',
              '"We clapped" = simple past, plural subject, completed action → correct.',
              '"Clap/claps" = present; "are clapping" = present continuous.',
            ],
            tip: 'The performance is finished → use simple past. "We clapped" for a past completed action.',
          },
        },
        {
          id: 'pl-eoy-p2-a-q2',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 2,
          stem: 'Too __________ salt is not good for health.',
          options: [
            { label: '1', text: 'few' },
            { label: '2', text: 'much' },
            { label: '3', text: 'many' },
            { label: '4', text: 'some' },
          ],
          answer: '2',
          solution: {
            method: 'Quantifier with uncountable noun',
            steps: [
              '"Salt" is uncountable → use "much" or "little" (not "few"/"many").',
              '"Too much salt" = an excessive amount of salt.',
              '"Too few/many" are for countable nouns; "some" is neutral (not "too ___").',
            ],
            tip: '"Too much" = excessive amount + uncountable noun. "Too many" = excessive number + countable noun.',
          },
        },
        {
          id: 'pl-eoy-p2-a-q3',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 3,
          stem: 'Lisa loves to eat rice __________ not noodles.',
          options: [
            { label: '1', text: 'or' },
            { label: '2', text: 'but' },
            { label: '3', text: 'than' },
            { label: '4', text: 'because' },
          ],
          answer: '2',
          solution: {
            method: 'Conjunction showing contrast',
            steps: [
              'Two contrasting preferences: loves rice / does not like noodles.',
              '"But" connects two contrasting clauses or ideas.',
              '"Or" suggests alternatives; "than" is for comparison; "because" is for reason.',
            ],
            tip: '"But" = contrast. "She likes X but not Y" is the standard pattern.',
          },
        },
        {
          id: 'pl-eoy-p2-a-q4',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 4,
          stem: 'Melody dances well, __________ she?',
          options: [
            { label: '1', text: 'is' },
            { label: '2', text: 'does' },
            { label: '3', text: "don't" },
            { label: '4', text: "doesn't" },
          ],
          answer: '4',
          solution: {
            method: 'Question tag — simple present, 3rd-person singular',
            steps: [
              'Main clause: "Melody dances well" — affirmative, simple present, 3rd-person singular.',
              'Affirmative → negative question tag.',
              'Verb "dances" → auxiliary "does" → tag: "doesn\'t she?"',
            ],
            tip: 'Simple present (she/he/it + verb-s) → question tag is "doesn\'t + pronoun?"',
          },
        },
        {
          id: 'pl-eoy-p2-a-q5',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 5,
          stem: 'The bear was waiting __________ the river to catch its prey.',
          options: [
            { label: '1', text: 'by' },
            { label: '2', text: 'on' },
            { label: '3', text: 'over' },
            { label: '4', text: 'under' },
          ],
          answer: '2',
          solution: {
            method: 'Preposition of location near water',
            steps: [
              '"Waiting by the river" = waiting next to/beside the river → "by" is the most natural preposition.',
              'A bear waits at the edge of the river to catch fish.',
              '"On the river" would mean on top of (e.g. a boat); "over/under" don\'t fit.',
            ],
            tip: '"By the river" = next to/beside the river. Common idiom for being near a body of water.',
          },
        },
        {
          id: 'pl-eoy-p2-a-q6',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 6,
          stem: 'My brother wakes up early daily to __________ for a jog.',
          options: [
            { label: '1', text: 'go' },
            { label: '2', text: 'goes' },
            { label: '3', text: 'went' },
            { label: '4', text: 'going' },
          ],
          answer: '1',
          solution: {
            method: 'Infinitive after "to"',
            steps: [
              '"To ___" requires the base infinitive of the verb.',
              '"To go" = base form → correct.',
              '"To goes/went/going" are all grammatically incorrect after "to".',
            ],
            tip: '"To + base verb" (infinitive): to go, to run, to eat. Never "to goes" or "to going".',
          },
        },
        {
          id: 'pl-eoy-p2-a-q7',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 7,
          stem: 'My sister prefers my doll because __________ was broken.',
          options: [
            { label: '1', text: 'its' },
            { label: '2', text: 'his' },
            { label: '3', text: 'hers' },
            { label: '4', text: 'theirs' },
          ],
          answer: '3',
          solution: {
            method: 'Possessive pronoun — referring to the sister\'s doll',
            steps: [
              'The doll that was broken belongs to the sister → "hers" (her doll = hers).',
              '"Hers" is an independent possessive pronoun (no noun follows it).',
              '"Its" = belonging to it; "his" = belonging to him; "theirs" = belonging to them.',
            ],
            tip: '"Hers" = the possessive pronoun for "she" (no noun after it). "Her doll" → "hers".',
          },
        },
        {
          id: 'pl-eoy-p2-a-q8',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 8,
          stem: '"__________ shoes over there are suitable for hiking," John said.',
          options: [
            { label: '1', text: 'This' },
            { label: '2', text: 'That' },
            { label: '3', text: 'These' },
            { label: '4', text: 'Those' },
          ],
          answer: '4',
          solution: {
            method: 'Demonstrative — plural + distance',
            steps: [
              '"Shoes" = plural → use "these" or "those".',
              '"Over there" = far away → "those" (for plural, distant objects).',
              '"Those shoes over there" = correct.',
            ],
            tip: '"Over there" = distant. Plural + distant → "those".',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — VOCABULARY MCQ  (6 marks, OAS)
    // ─────────────────────────────────────────────
    {
      id: 'sec-b',
      name: 'Section B: Vocabulary',
      topic: 'VocabMCQ',
      marks: 6,
      instructions:
        'Choose the correct answer and write its number 1, 2, 3 or 4 in the brackets provided. Shade your answers in the OAS.',
      questions: [
        {
          id: 'pl-eoy-p2-b-q9',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 9,
          stem: 'I could not see the chameleon as its colours __________ so well into the tree.',
          options: [
            { label: '1', text: 'fitted' },
            { label: '2', text: 'joined' },
            { label: '3', text: 'mixed' },
            { label: '4', text: 'blended' },
          ],
          answer: '4',
          solution: {
            method: 'Vocabulary — camouflage context',
            steps: [
              'A chameleon changes colour to match its surroundings — this is called blending in.',
              '"Blended" = merged smoothly with → the chameleon\'s colours blended into the tree.',
              '"Fitted" is used for size/shape; "joined" = became part of (used for groups); "mixed" doesn\'t collocate with "into the tree".',
            ],
            tip: '"Blend into" = merge with, become invisible against the background. Perfect for camouflage.',
          },
        },
        {
          id: 'pl-eoy-p2-b-q10',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 10,
          stem: 'I was delighted when all my friends __________ for my birthday party.',
          options: [
            { label: '1', text: 'turned in' },
            { label: '2', text: 'turned on' },
            { label: '3', text: 'turned up' },
            { label: '4', text: 'turned down' },
          ],
          answer: '3',
          solution: {
            method: 'Phrasal verb — arriving at an event',
            steps: [
              '"Turned up" = arrived/appeared at a place or event.',
              '"Turned in" = submitted something / went to bed; "turned on" = switched on; "turned down" = rejected/reduced volume.',
              '"All my friends turned up" = all my friends arrived → the reason for delight.',
            ],
            tip: '"Turn up" = arrive (often unexpectedly or in the context of attendance at an event).',
          },
        },
        {
          id: 'pl-eoy-p2-b-q11',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 11,
          stem: 'The expensive glass bowl __________ when it fell to the floor.',
          options: [
            { label: '1', text: 'tore' },
            { label: '2', text: 'faded' },
            { label: '3', text: 'cracked' },
            { label: '4', text: 'crumpled' },
          ],
          answer: '3',
          solution: {
            method: 'Vocabulary — what happens to glass when dropped',
            steps: [
              'Glass breaks into pieces or cracks when it falls.',
              '"Cracked" = developed cracks/broke → correct for a glass bowl falling.',
              '"Tore" = ripped (for fabric/paper); "faded" = lost colour; "crumpled" = crushed into a ball (for paper/soft material).',
            ],
            tip: '"Crack" = what glass/ceramics do when they break. "Tear" is for fabric.',
          },
        },
        {
          id: 'pl-eoy-p2-b-q12',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 12,
          stem: 'A hummingbird can beat its wings so __________ that the human eye cannot even see the wings move.',
          options: [
            { label: '1', text: 'slowly' },
            { label: '2', text: 'quickly' },
            { label: '3', text: 'exactly' },
            { label: '4', text: 'carefully' },
          ],
          answer: '2',
          solution: {
            method: 'Adverb matching the context of invisible wing movement',
            steps: [
              'Wings moving too fast to see → they move extremely quickly.',
              '"So quickly that the eye cannot see" = speed beyond visual perception.',
              '"Slowly" is the opposite; "exactly/carefully" don\'t explain invisibility.',
            ],
            tip: 'If something moves too fast to see, it moves "so quickly". Speed causes invisibility.',
          },
        },
        {
          id: 'pl-eoy-p2-b-q13',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 13,
          stem: "Mother's voice was so __________ that the baby fell asleep in no time.",
          options: [
            { label: '1', text: 'slow' },
            { label: '2', text: 'silent' },
            { label: '3', text: 'gentle' },
            { label: '4', text: 'grateful' },
          ],
          answer: '3',
          solution: {
            method: 'Adjective describing a soothing voice',
            steps: [
              'The baby fell asleep → mother\'s voice was soothing and calming.',
              '"Gentle" = soft and kind → a gentle voice soothes a baby to sleep.',
              '"Silent" = making no sound (no voice at all); "slow" describes pace not quality; "grateful" = thankful (unrelated to voice).',
            ],
            tip: 'A "gentle voice" = soft, soft and kind, which is soothing enough to put a baby to sleep.',
          },
        },
        {
          id: 'pl-eoy-p2-b-q14',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 14,
          stem: 'A __________ studies plants to learn how they grow and help the environment.',
          options: [
            { label: '1', text: 'florist' },
            { label: '2', text: 'farmer' },
            { label: '3', text: 'botanist' },
            { label: '4', text: 'gardener' },
          ],
          answer: '3',
          solution: {
            method: 'Vocabulary — occupation that studies plants scientifically',
            steps: [
              '"Studies plants to learn how they grow" = scientific study of plants.',
              '"Botanist" = a scientist who studies plants.',
              '"Florist" = arranges/sells flowers; "farmer" = grows crops for food; "gardener" = tends gardens (not scientific study).',
            ],
            tip: '"Botanist" = plant scientist. The key word is "studies" (scientific) not "grows" or "sells".',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — COMPREHENSION 1  (8 marks, OAS)
    // ─────────────────────────────────────────────
    {
      id: 'sec-c',
      name: 'Section C: Comprehension 1 — Leo and Lucky',
      topic: 'ComprehensionOE',
      marks: 8,
      instructions: 'Read the passage below and answer questions 15 to 19.',
      passage: {
        title: 'Leo and Lucky',
        lines: [
          'Leo loved animals. He found a thin and scrawny dog abandoned at a bus',
          'stop one day and brought it home. He begged his parents to let him keep the dog',
          'and promised to be responsible and take good care of it. He was thrilled when his',
          'parents finally agreed. Leo named the dog \'Lucky\'.',
          '',
          'A few days passed. Leo became busy with school and his own activities.', // line 5
          'He left his parents to care for Lucky. One day, Leo\'s parents had to leave for a',
          'work trip, and Leo was given the task of taking care of Lucky. His parents',
          'reminded him to feed Lucky, walk him, and play with him. As the day went on,',
          'Leo became distracted by his video games. He had forgotten all about Lucky.',
          '',
          'When his parents returned, they noticed that Lucky was restless and', // line 10
          'hungry. They reminded Leo of his responsibilities. Leo felt ashamed and realised',
          'that he had not kept to his promise. The next morning, Leo created a timetable to',
          'ensure that he fed Lucky and took him for walks. He also included gaming in it',
          'although he had cut down his playing time.',
          '',
          'Over time, Lucky grew healthier and happier. Leo\'s parents praised him for', // line 15
          'his dedication. Leo felt proud and learned that being responsible meant keeping',
          'his promises and taking care of those who depend on him.',
        ],
      },
      questions: [
        {
          id: 'pl-eoy-p2-c-q15',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 15,
          stem: 'Which word in paragraph 1 has the same meaning as very happy? [1m]',
          answer: 'thrilled',
          solution: {
            method: 'Vocabulary — synonym for "very happy"',
            steps: [
              '"Very happy" = extremely pleased/excited.',
              'Paragraph 1: "He was thrilled when his parents finally agreed."',
              '"Thrilled" = very excited and pleased → synonym for "very happy".',
            ],
            tip: '"Thrilled" = extremely happy and excited.',
          },
        },
        {
          id: 'pl-eoy-p2-c-q16',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 3,
          questionNumber: 16,
          stem: 'Read each statement and put a tick ✓ in the correct box. [3m]\n\nLeo named the dog.\nLeo\'s parents brought Leo and Lucky for their work trip.\nLeo\'s parents agreed to keep the dog because they took pity on the dog.',
          answer: 'Leo named the dog → True\nLeo\'s parents brought Leo and Lucky for the work trip → False\nLeo\'s parents agreed to keep the dog because they took pity on it → False',
          solution: {
            method: 'True/False — direct recall',
            steps: [
              '(1) True: "Leo named the dog \'Lucky\'".',
              '(2) False: "Leo\'s parents had to leave for a work trip" — Leo stayed home to care for Lucky.',
              '(3) False: Parents agreed because Leo "promised to be responsible" — not pity for the dog.',
            ],
            tip: 'Read carefully for exact reasons and details. Check who did what.',
          },
        },
        {
          id: 'pl-eoy-p2-c-q17',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 17,
          stem: 'What does the word "it" in line 13 refer to? [1m]',
          answer: 'The timetable.',
          solution: {
            method: 'Pronoun referencing',
            steps: [
              'Line 12–13: "Leo created a timetable to ensure that he fed Lucky and took him for walks. He also included gaming in it."',
              '"It" = the timetable (Leo included gaming in the timetable).',
            ],
            tip: 'Pronoun reference: find the nearest preceding noun that "it" can logically replace.',
          },
        },
        {
          id: 'pl-eoy-p2-c-q18',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 18,
          stem: 'Write the numbers 1, 2 and 3 in the boxes below to show the order of events. [1m]\n\n□ Leo cut down on playing his video games.\n□ Leo was ashamed of his actions.\n□ Leo did not feed Lucky.',
          correctSequence: {
            'Leo cut down on playing his video games.': 3,
            'Leo was ashamed of his actions.': 2,
            'Leo did not feed Lucky.': 1,
          },
          answer: 'Leo did not feed Lucky = 1; Leo was ashamed = 2; Leo cut down gaming = 3',
          solution: {
            method: 'Sequencing events from passage',
            steps: [
              '1st: Leo forgot about Lucky and did not feed him (paragraph 2).',
              '2nd: Leo was ashamed when parents returned and reminded him (paragraph 3).',
              '3rd: Leo cut down gaming time when he made the timetable (paragraph 3, end).',
            ],
            tip: 'Follow paragraph by paragraph: forgot→ ashamed → cut gaming.',
          },
        },
        {
          id: 'pl-eoy-p2-c-q19',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 19,
          stem: 'Which two of the following best describe the main character? Put a tick ✓ in the boxes provided. [2m]\n\n□ willing to improve\n□ is not easily distracted\n□ learns from his mistakes',
          answer: 'willing to improve ✓ and learns from his mistakes ✓',
          solution: {
            method: 'Character trait inference',
            steps: [
              '"Willing to improve": Leo created a timetable and changed his habits → actively improving.',
              '"Learns from his mistakes": He realised his error (forgetting Lucky) and changed → learning from mistakes.',
              '"Not easily distracted" is WRONG — he was easily distracted by video games.',
            ],
            tip: 'Leo was distracted (so NOT "not easily distracted"). He did improve and learn from mistakes.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — GRAMMAR CLOZE  (8 marks, Written Booklet)
    // ─────────────────────────────────────────────
    {
      id: 'sec-d',
      name: 'Section D: Grammar Cloze',
      topic: 'GrammarCloze',
      marks: 8,
      instructions:
        'Read the passages carefully. Choose the correct word from the words given in the box and write the letters (A to F) in each blank. Use each word once only. (4 marks)\n\nFor Passage 2: Underline the answer from the words given in the brackets. (4 marks)',
      subSections: [
        {
          id: 'sec-d-p1',
          name: "Passage 1 — Siti's Family Picnic",
          wordBox: [
            { label: 'A', word: 'he' },
            { label: 'B', word: 'her' },
            { label: 'C', word: 'himself' },
            { label: 'D', word: 'they' },
            { label: 'E', word: 'their' },
            { label: 'F', word: 'themselves' },
          ],
          passage: {
            text: "Last Sunday, Siti, Faizal, and their parents went to East Coast Park for a picnic. (1) ___ spread out a big mat and sat on it. Father had prepared delicious chicken sandwiches for lunch. Mother had baked a chocolate cake for (2) ___ dessert. After eating, Siti and Faizal built sandcastles on the beach by (3) ___ while their parents relaxed under a big tree. As it was hot, Mother asked Siti to apply some sunblock on (4) ___ face while Faizal refused to do so. The children ended the day with a fun swim in the sea.",
          },
          questions: [
            {
              id: 'pl-eoy-p2-d-q1',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 1,
              stem: '(1) ___ spread out a big mat and sat on it.',
              answer: 'D (they)',
              solution: {
                method: 'Pronoun — plural subject referring to the family',
                steps: [
                  'Subject = Siti, Faizal, and their parents (the whole family) → plural.',
                  '"They spread out" = the whole family did this together.',
                ],
                tip: '"Siti, Faizal, and their parents" = multiple people → "they".',
              },
            },
            {
              id: 'pl-eoy-p2-d-q2',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 2,
              stem: 'Mother had baked a chocolate cake for (2) ___ dessert.',
              answer: 'E (their)',
              solution: {
                method: 'Possessive pronoun — belonging to the family',
                steps: [
                  'The dessert belongs to the whole family → "their dessert".',
                  '"Their" = possessive form of "they" (the family).',
                ],
                tip: '"Their dessert" = the family\'s dessert. "Their" is the possessive of "they".',
              },
            },
            {
              id: 'pl-eoy-p2-d-q3',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 3,
              stem: 'Siti and Faizal built sandcastles on the beach by (3) ___.',
              answer: 'F (themselves)',
              solution: {
                method: 'Reflexive pronoun — by oneself (without help)',
                steps: [
                  '"By themselves" = on their own, without help.',
                  'Subject: Siti and Faizal (plural) → reflexive pronoun "themselves".',
                  '"By themselves" shows they did it independently while parents relaxed.',
                ],
                tip: '"By themselves" = on their own. Subject plural (they) → "themselves".',
              },
            },
            {
              id: 'pl-eoy-p2-d-q4',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 4,
              stem: 'Mother asked Siti to apply some sunblock on (4) ___ face.',
              answer: 'B (her)',
              solution: {
                method: 'Possessive pronoun — Siti\'s face',
                steps: [
                  'The face belongs to Siti (female) → "her face".',
                  '"Her" is the possessive pronoun for "she".',
                ],
                tip: '"Her face" = Siti\'s face. Female → her.',
              },
            },
          ],
        },
        {
          id: 'sec-d-p2',
          name: 'Passage 2 — Hermit Crabs',
          passage: {
            text: 'Hermit crabs are sea creatures that use empty shells for protection. Since their bodies (5) [is / are] soft, they need to find a shell to keep themselves safe. As each hermit crab (6) [grow / grows], they search for larger shells to move into.\n\nHermit crabs often (7) [line / lines] up to switch shells. Although they are not true crabs, they are still related and (8) [make / makes] interesting pets. Many people find them fascinating.',
          },
          questions: [
            {
              id: 'pl-eoy-p2-d-q5',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 5,
              stem: 'Since their bodies (5) [is / are] soft.',
              answer: 'are',
              solution: {
                method: 'Subject-verb agreement — plural "bodies"',
                steps: [
                  '"Their bodies" = plural noun.',
                  'Plural → "are".',
                ],
                tip: '"Bodies" (plural) → "are". Never "is" for a plural noun.',
              },
            },
            {
              id: 'pl-eoy-p2-d-q6',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 6,
              stem: 'As each hermit crab (6) [grow / grows].',
              answer: 'grows',
              solution: {
                method: 'Subject-verb agreement — "each" = singular',
                steps: [
                  '"Each hermit crab" = singular (each = one at a time).',
                  'Singular subject → verb + s: "grows".',
                ],
                tip: '"Each" is always singular → use singular verb (+s): each crab grows.',
              },
            },
            {
              id: 'pl-eoy-p2-d-q7',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 7,
              stem: 'Hermit crabs often (7) [line / lines] up to switch shells.',
              answer: 'line',
              solution: {
                method: 'Subject-verb agreement — plural "Hermit crabs"',
                steps: [
                  '"Hermit crabs" = plural.',
                  'Plural → base verb: "line" (no -s).',
                ],
                tip: 'Plural subjects take the base form of the verb (no -s).',
              },
            },
            {
              id: 'pl-eoy-p2-d-q8',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 8,
              stem: 'They are still related and (8) [make / makes] interesting pets.',
              answer: 'make',
              solution: {
                method: 'Subject-verb agreement — plural "they"',
                steps: [
                  'Subject: "they" (hermit crabs) → plural.',
                  'Plural → base verb: "make".',
                ],
                tip: '"They make" — "they" is always plural → base form of verb.',
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — EDITING FOR SPELLING/PUNCTUATION  (3 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-e',
      name: 'Section E: Editing for Spelling and Punctuation',
      topic: 'Editing',
      marks: 3,
      instructions:
        'Each of the underlined words contains either a spelling or punctuation error. Write the correct word or punctuation in each of the boxes.',
      passage: {
        title: 'The Ant and the Grasshopper',
        text: 'The ant worked hard all summer collecting food, while the grasshopper played. (9) "Why aren\'t you working __(?)__" asked the ant. The grasshopper (10) [grined] and said that he would do it later. When winter came, the grasshopper (11) [starfd] but the ant stayed warm and well-fed. The grasshopper regretted being lazy.',
      },
      questions: [
        {
          id: 'pl-eoy-p2-e-q9',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 9,
          stem: '"Why aren\'t you working __(?)__" asked the ant.',
          underlinedWord: '(circle — missing punctuation mark)',
          answer: '?',
          solution: {
            method: 'Punctuation — question mark inside direct speech',
            steps: [
              '"Why aren\'t you working" is a question.',
              'Direct questions end with a question mark "?" inside the quotation marks.',
              'Correct: "Why aren\'t you working?" asked the ant.',
            ],
            tip: 'Questions in direct speech need a "?" before the closing quotation mark.',
          },
        },
        {
          id: 'pl-eoy-p2-e-q10',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 10,
          stem: 'The grasshopper (10) [grined] and said that he would do it later.',
          underlinedWord: 'grined',
          answer: 'grinned',
          solution: {
            method: 'Spelling rule — doubling the consonant before -ed',
            steps: [
              'Base verb: "grin" (CVC pattern — consonant-vowel-consonant).',
              'When adding -ed to a CVC word: double the final consonant.',
              '"Grin" → "grinned" (double the n).',
              '"Grined" = wrong (single n).',
            ],
            tip: 'CVC rule: grin → grinned (double the n). Like: run → running, sit → sitting.',
          },
        },
        {
          id: 'pl-eoy-p2-e-q11',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 11,
          stem: 'When winter came, the grasshopper (11) [starfd] but the ant stayed warm and well-fed.',
          underlinedWord: 'starfd',
          answer: 'starved',
          solution: {
            method: 'Spelling correction',
            steps: [
              '"Starfd" is a misspelling of "starved" (s-t-a-r-v-e-d).',
              '"Starved" = suffered from lack of food.',
              'Context: grasshopper had no food stored for winter → starved.',
            ],
            tip: '"Starved" = past tense of "starve" (to suffer from hunger). s-t-a-r-v-e-d.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — COMPREHENSION CLOZE  (4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-f',
      name: "Section F: Comprehension Cloze — Jimmy's Dinosaur Dream",
      topic: 'ComprehensionFIB',
      marks: 4,
      instructions: 'Read the passage carefully. Fill in each blank with the most suitable word.',
      passage: {
        title: "Jimmy's Dinosaur Dream",
        text: "Jimmy loved dinosaurs more than anything in this world. One night, he dreamed about (12) ___ a real dinosaur. In his dream, he was walking through a jungle and he spotted a Tyrannosaurus Rex which was the king of dinosaurs. Slowly, he approached it. It was so friendly that it lowered its huge (13) ___ to invite Jimmy to stroke it.\n\nHow Jimmy (14) ___ that he could travel back in time to see the dinosaurs up close. It would be wonderful to live among them (15) ___ a day. His mother encouraged him to invent a time machine in the future.",
      },
      questions: [
        {
          id: 'pl-eoy-p2-f-q12',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 12,
          stem: 'He dreamed about (12) ___ a real dinosaur.',
          answer: 'meeting / seeing / encountering',
          solution: {
            method: 'Vocabulary — verb after "dreamed about"',
            steps: [
              '"Dreamed about + gerund (verb + ing)" = a dream involving the action.',
              'Jimmy dreamed about meeting/seeing/encountering a real dinosaur.',
              '"About meeting" = the content of the dream.',
            ],
            tip: '"Dream about + gerund": "dreamed about meeting", "dreamed about seeing".',
          },
        },
        {
          id: 'pl-eoy-p2-f-q13',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 13,
          stem: 'It lowered its huge (13) ___ to invite Jimmy to stroke it.',
          answer: 'head',
          solution: {
            method: 'Inference — body part a dinosaur lowers',
            steps: [
              'A dinosaur lowers its head to allow someone to stroke it.',
              '"Lowered its huge head" = bent down its large head.',
              'Jimmy could then reach up and stroke the dinosaur\'s head.',
            ],
            tip: 'Animals lower their "head" to allow patting/stroking. The head is the logical answer.',
          },
        },
        {
          id: 'pl-eoy-p2-f-q14',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 14,
          stem: 'How Jimmy (14) ___ that he could travel back in time.',
          answer: 'wished / hoped / dreamed',
          solution: {
            method: 'Vocabulary — verb expressing desire/longing',
            steps: [
              '"How Jimmy ___ that he could travel back in time" = expressing a longing or wish.',
              '"Wished" = wanted/hoped for something not possible (time travel).',
              '"How he wished" = an expression of strong desire.',
            ],
            tip: '"How I wished that ___" = I really wanted this (but it may not be possible).',
          },
        },
        {
          id: 'pl-eoy-p2-f-q15',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 15,
          stem: 'It would be wonderful to live among them (15) ___ a day.',
          answer: 'for',
          solution: {
            method: 'Preposition for duration',
            steps: [
              '"For a day" = for the duration of one day.',
              '"For" is the preposition of duration: "for a day", "for a week", "for an hour".',
            ],
            tip: '"For + time period" = duration: for a day, for two hours, for a year.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — SENTENCE COMBINING  (3 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-g',
      name: 'Section G: Sentence Combining',
      topic: 'SentenceCombining',
      marks: 3,
      instructions:
        'For each of the questions 16 to 18, rewrite the given sentence(s) using the word(s) provided. Your answer must be in one sentence. Your answer should best combine the two given sentences by making the meaning clearer and the flow more smoothly.',
      questions: [
        {
          id: 'pl-eoy-p2-g-q16',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 16,
          stem: 'Mother said we must wash the dishes. Mother said we must clean our rooms. (and)',
          givenSentences: [
            'Mother said we must wash the dishes.',
            'Mother said we must clean our rooms.',
          ],
          connectorProvided: 'and',
          answer: 'Mother said we must wash the dishes and clean our rooms.',
          solution: {
            method: 'Sentence combining with "and" — joining two requirements',
            steps: [
              'Both sentences share "Mother said we must ___".',
              '"And" joins two actions from the same instruction.',
              'Combine by keeping the shared part once: "Mother said we must wash the dishes and clean our rooms."',
            ],
            tip: '"And" joins two actions in a list. Keep shared context ("Mother said we must") once.',
          },
        },
        {
          id: 'pl-eoy-p2-g-q17',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 17,
          stem: 'We could go to the cinema. We could go to the shopping centre. (or)',
          givenSentences: [
            'We could go to the cinema.',
            'We could go to the shopping centre.',
          ],
          connectorProvided: 'or',
          answer: 'We could go to the cinema or the shopping centre.',
          solution: {
            method: 'Sentence combining with "or" — presenting alternatives',
            steps: [
              '"Or" joins two alternatives.',
              'Both sentences share "We could go to ___".',
              'Combine: "We could go to the cinema or the shopping centre."',
            ],
            tip: '"Or" = either one or the other. Join the alternatives after the shared part.',
          },
        },
        {
          id: 'pl-eoy-p2-g-q18',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 18,
          stem: 'Mrs Goh is strict. Mrs Goh is kind. (but)',
          givenSentences: [
            'Mrs Goh is strict.',
            'Mrs Goh is kind.',
          ],
          connectorProvided: 'but',
          answer: 'Mrs Goh is strict but kind.',
          solution: {
            method: 'Sentence combining with "but" — showing contrast',
            steps: [
              '"But" shows contrast between "strict" and "kind".',
              'Both sentences have the same subject "Mrs Goh".',
              'Combine: "Mrs Goh is strict but kind." (or "Mrs Goh is strict but she is kind.")',
            ],
            tip: '"But" contrasts two qualities. Combine concisely: "strict but kind".',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — COMPREHENSION 2  (10 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-h',
      name: "Section H: Comprehension 2 — Nadia the Footballer",
      topic: 'ComprehensionOE',
      marks: 10,
      instructions: 'Read the passage below and answer the questions that follow. Write your answers in complete sentences.',
      passage: {
        title: "Nadia's Football Dream",
        lines: [
          'Nadia was five when she first kicked a football. It was just a worn-out ball she',
          'had found at her void deck. However, it was a treasure to her. While most girls her',
          'age played with dolls or practised ballet, she would spend hours kicking a ball. She',
          'disliked playing with tea sets or playing dress up like her friends. Every day, she',
          'practised on the small patch of grass behind her house. Her dream was to become a', // line 5
          'football player.',
          '',
          'In Singapore then, people believed football was for boys. Nadia did not care.',
          'She joined a boys\' team. At first, the boys laughed at her, and the coaches doubted',
          'her abilities. "Girls don\'t play football," the boys used to tease her. "She\'ll never make', // line 10
          'it," some of the parents said.',
          '',
          'Even her own grandmother told her, "Football isn\'t for girls, Nadia. You should',
          'find something more suitable, like learning how to cook."',
          '',
          'Her grandmother\'s words fell on deaf ears. Nadia refused to give up. She', // line 14 (approx)
          'worked on her speed and dribbling technique after the boys in her team had gone',
          'home. She would also practise shooting until the sun set. Her parents supported her', // line 15
          'dream, cheering her on at every match. The road was tough but her passion kept her',
          'going.',
          '',
          'By the time Nadia turned eighteen, she was selected to play for the Singapore',
          'National Team. As she stood on the field in her national jersey, Nadia thought of her', // line 20
          'grandmother\'s words and smiled. Football was for anyone who dared to dream. Nadia',
          'had followed hers and worked hard to achieve it. Now she is a star, inspiring girls',
          'across Singapore to play a game that has mostly been played by boys.',
        ],
      },
      questions: [
        {
          id: 'pl-eoy-p2-h-q19',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 19,
          stem: 'Where did Nadia find her first football? (1m)',
          answer: 'She found her first football at her void deck.',
          solution: {
            method: 'Direct retrieval',
            steps: [
              'Paragraph 1: "It was just a worn-out ball she had found at her void deck."',
              'Answer: at her void deck.',
            ],
            tip: 'Locate "found" in the text → "at her void deck".',
          },
        },
        {
          id: 'pl-eoy-p2-h-q20',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 20,
          stem: 'List two things that most of the other girls Nadia\'s age liked to do in the boxes below. (2m)\n\na) ___  b) ___',
          answer: 'a) playing with dolls (or practised ballet)  b) playing with tea sets (or playing dress up)',
          solution: {
            method: 'Direct retrieval — listing activities',
            steps: [
              'Paragraph 1: "While most girls her age played with dolls or practised ballet, she would spend hours kicking a ball. She disliked playing with tea sets or playing dress up like her friends."',
              'Four activities listed: dolls, ballet, tea sets, dress up.',
              'Any two of these count.',
            ],
            tip: 'Look for what other girls did — listed in contrast to what Nadia liked.',
          },
        },
        {
          id: 'pl-eoy-p2-h-q21',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 21,
          stem: 'From paragraph 2, what did Nadia do to show that football was not just for boys? [1m]',
          answer: 'She joined a boys\' team.',
          solution: {
            method: 'Direct retrieval',
            steps: [
              'Paragraph 2: "She joined a boys\' team."',
              'By joining a team meant for boys, she challenged the belief that football was only for boys.',
            ],
            tip: 'Action that challenged the belief: "She joined a boys\' team."',
          },
        },
        {
          id: 'pl-eoy-p2-h-q22',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 22,
          stem: 'Put a tick (✓) in the box beside the correct answer. (1m)\n\nWhen Nadia first started playing football, her coaches said that she ___.\n\n□ should learn to cook.\n□ could not play football.\n□ did not have the ability to play well.',
          answer: 'did not have the ability to play well',
          solution: {
            method: 'Direct recall — what coaches said',
            steps: [
              'Paragraph 2: "the coaches doubted her abilities."',
              '"Doubted her abilities" = did not believe she had the ability to play well.',
              'Option: "did not have the ability to play well" matches.',
            ],
            tip: '"Doubted her abilities" = they thought she did not have the ability to play well.',
          },
        },
        {
          id: 'pl-eoy-p2-h-q23',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 23,
          stem: 'Which sentence from lines 11–13 tells us that Nadia persevered. Write the sentence in the box below. (1m)',
          answer: 'Nadia refused to give up.',
          solution: {
            method: 'Direct retrieval — sentence showing perseverance',
            steps: [
              'Lines 14 (approx 11–13 in the booklet): "Nadia refused to give up."',
              '"Refused to give up" = persevered, kept going despite difficulties.',
            ],
            tip: '"Refused to give up" = continued despite opposition = perseverance.',
          },
        },
        {
          id: 'pl-eoy-p2-h-q24',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 24,
          stem: 'What did Nadia do to improve her football skills? (2m)',
          answer: 'She worked on her speed and dribbling technique after the boys in her team had gone home. She would also practise shooting until the sun set.',
          solution: {
            method: 'Direct retrieval — two specific actions',
            steps: [
              'Lines 15–16: "She worked on her speed and dribbling technique after the boys in her team had gone home."',
              '"She would also practise shooting until the sun set."',
              'Two specific things: (1) speed + dribbling after others left, (2) shooting practice until sunset.',
            ],
            tip: 'Two marks = two pieces of evidence. Find two distinct things she did to improve.',
          },
        },
        {
          id: 'pl-eoy-p2-h-q25a',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: '25a',
          stem: 'What did Nadia make the girls across Singapore feel about her? Put a tick (✓) in the box beside your answer. (1m)\n\n□ jealous  □ inspired  □ relieved',
          answer: 'inspired',
          solution: {
            method: 'Inference from last paragraph',
            steps: [
              'Last paragraph: "Now she is a star, inspiring girls across Singapore to play a game that has mostly been played by boys."',
              '"Inspiring" = making others feel inspired → girls felt "inspired".',
            ],
            tip: '"Inspiring girls" → girls felt "inspired". The word is directly in the text.',
          },
        },
        {
          id: 'pl-eoy-p2-h-q25b',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: '25b',
          stem: 'Why do you think she made the girls feel this way? (1m)',
          answer: 'She made the girls feel inspired because she showed them that they could do anything as long as they persevered / she proved that girls could play football too.',
          solution: {
            method: 'Inference — reason for inspiration',
            steps: [
              'Nadia overcame all obstacles and achieved her dream despite everyone doubting her.',
              'She showed girls that football (and any traditionally male sport/activity) could be for them too.',
              'Her story proved that perseverance and passion can make dreams come true.',
            ],
            tip: 'Nadia\'s story of overcoming doubt and achieving her dream is what inspires others.',
          },
        },
      ],
    },
  ],
};

export default paper;
