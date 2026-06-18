// Rosyth School — End-of-Year Examination 2024
// Primary 3 English Language Paper 2 (Booklets A & B)
// Source PDF pages 778–794

import { ExamPaper } from '../../types';

const paper: ExamPaper = {
  id: 'eoy_rosyth_p2_2025',
  school: 'Rosyth School',
  schoolCode: 'rosyth',
  level: 'P3',
  subject: 'English',
  paperType: 'Paper2',
  examType: 'EOY',
  year: 2024,
  totalMarks: 50,
  duration: '1h 15min',
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — GRAMMAR MCQ  (Booklet A, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-a',
      name: 'Section A: Grammar',
      topic: 'GrammarMCQ',
      marks: 8,
      instructions:
        'For questions 1 to 8, choose the most suitable answer and shade the correct number (1, 2, 3 or 4) on the OAS given.',
      questions: [
        {
          id: 'ro-eoy-p2-a-q1',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 1,
          stem: 'Kai found a pencil on the floor and picked it up. "Hey Ben, is this __________ ?" he asked.',
          options: [
            { label: '1', text: 'his' },
            { label: '2', text: 'hers' },
            { label: '3', text: 'mine' },
            { label: '4', text: 'yours' },
          ],
          answer: '4',
          solution: {
            method: 'Possessive pronoun — asking if it belongs to Ben',
            steps: [
              'Kai is asking Ben: "Does this pencil belong to you?"',
              '"Is this yours?" = does it belong to you? (2nd-person possessive pronoun).',
              '"Mine" = belonging to me (Kai); "his/hers" = 3rd person.',
            ],
            tip: '"Yours" = belonging to you. When asking someone about their possession: "Is this yours?"',
          },
        },
        {
          id: 'ro-eoy-p2-a-q2',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 2,
          stem: 'Mr Raj is at the bus stop. He has been waiting for the bus __________ 2 o\'clock.',
          options: [
            { label: '1', text: 'for' },
            { label: '2', text: 'since' },
            { label: '3', text: 'after' },
            { label: '4', text: 'while' },
          ],
          answer: '2',
          solution: {
            method: 'Preposition with present perfect continuous — point in time',
            steps: [
              '"Has been waiting for the bus ___ 2 o\'clock" — 2 o\'clock is a specific point in time.',
              '"Since" is used with a specific starting point in time (since 2 o\'clock, since Monday).',
              '"For" is used with a duration (for two hours, for an hour).',
            ],
            tip: '"Since" + specific time point (2 o\'clock, Monday, last year). "For" + duration (two hours, a week).',
          },
        },
        {
          id: 'ro-eoy-p2-a-q3',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 3,
          stem: '"Let\'s go to the canteen later to look for Aria who __________ doing her recess duty," suggested Sarah to her friends.',
          options: [
            { label: '1', text: 'is' },
            { label: '2', text: 'are' },
            { label: '3', text: 'was' },
            { label: '4', text: 'were' },
          ],
          answer: '1',
          solution: {
            method: 'Present continuous — singular subject, present context',
            steps: [
              'The plan is to go look for Aria who is currently doing duty → present tense.',
              'Subject "Aria who" = singular (3rd person singular).',
              'Present continuous: "is doing" → auxiliary "is".',
            ],
            tip: '"Aria who IS doing" = present ongoing action, singular → is.',
          },
        },
        {
          id: 'ro-eoy-p2-a-q4',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 4,
          stem: '"Zack is a new student in our school, so he needs __________ to show him around," said the teacher.',
          options: [
            { label: '1', text: 'nobody' },
            { label: '2', text: 'somebody' },
            { label: '3', text: 'anybody' },
            { label: '4', text: 'everybody' },
          ],
          answer: '2',
          solution: {
            method: 'Indefinite pronoun — positive sentence, unspecified person needed',
            steps: [
              'The teacher wants a specific but unnamed person to show Zack around.',
              '"Somebody" = an unspecified person (used in affirmative sentences).',
              '"Nobody" = no one (negative); "anybody" = anyone (used in questions/negatives); "everybody" = all people.',
            ],
            tip: '"Somebody" = an unnamed specific person in affirmative sentences.',
          },
        },
        {
          id: 'ro-eoy-p2-a-q5',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 5,
          stem: 'Mdm Waty wants us to place our books on __________ shelf over there.',
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
              '"Shelf" = singular → use singular demonstrative.',
              '"Over there" = far away → "that" (singular, distant).',
              '"That shelf over there" = correct.',
            ],
            tip: '"That" = singular + far. "Over there" signals distance.',
          },
        },
        {
          id: 'ro-eoy-p2-a-q6',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 6,
          stem: 'She usually buys her food from that last food stall, __________ ?',
          options: [
            { label: '1', text: 'does she' },
            { label: '2', text: 'has she' },
            { label: '3', text: "doesn't she" },
            { label: '4', text: "hasn't she" },
          ],
          answer: '3',
          solution: {
            method: 'Question tag — simple present, affirmative, 3rd-person singular',
            steps: [
              'Main clause: "She usually buys" — affirmative, simple present, 3rd-person singular.',
              'Affirmative → negative question tag.',
              'Auxiliary for "buys" (simple present, she) = "does" → tag: "doesn\'t she?"',
            ],
            tip: 'Simple present (she buys) → question tag: "doesn\'t she?" Positive → negative tag.',
          },
        },
        {
          id: 'ro-eoy-p2-a-q7',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 7,
          stem: 'My brother and I __________ a movie at the nearby cinema tomorrow.',
          options: [
            { label: '1', text: 'watch' },
            { label: '2', text: 'watched' },
            { label: '3', text: 'have watched' },
            { label: '4', text: 'are watching' },
          ],
          answer: '4',
          solution: {
            method: 'Present continuous for planned future event',
            steps: [
              '"Tomorrow" = future, and the plan has already been made.',
              'Present continuous can express a planned/arranged future action.',
              '"Are watching" (present continuous) = a confirmed plan for tomorrow.',
              '"Watch" = simple present (habitual); "watched" = past; "have watched" = present perfect.',
            ],
            tip: 'Present continuous + future time word = a fixed plan: "We are watching a movie tomorrow."',
          },
        },
        {
          id: 'ro-eoy-p2-a-q8',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 8,
          stem: 'This drink tastes quite bitter. I should add __________ sugar to make it sweet.',
          options: [
            { label: '1', text: 'a few' },
            { label: '2', text: 'little' },
            { label: '3', text: 'some' },
            { label: '4', text: 'many' },
          ],
          answer: '3',
          solution: {
            method: 'Quantifier — uncountable noun in affirmative',
            steps: [
              '"Sugar" is uncountable → "a few/many" (countable) are wrong.',
              '"Some" = an unspecified amount, used in affirmative sentences.',
              '"Some sugar" = an unspecified amount of sugar → correct.',
              '"Little" = a very small amount (implies barely enough — not the intent here).',
            ],
            tip: '"Some" is the neutral quantifier for affirmative sentences with uncountable nouns.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — VOCABULARY MCQ  (Booklet A, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-b',
      name: 'Section B: Vocabulary',
      topic: 'VocabMCQ',
      marks: 6,
      instructions:
        'For questions 9 to 14, choose the most suitable answer and shade the correct number (1, 2, 3 or 4) on the OAS given.',
      questions: [
        {
          id: 'ro-eoy-p2-b-q9',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 9,
          stem: 'Mr Kwan __________ his uniform neatly in the cupboard after he had ironed it.',
          options: [
            { label: '1', text: 'put on' },
            { label: '2', text: 'put up' },
            { label: '3', text: 'put off' },
            { label: '4', text: 'put away' },
          ],
          answer: '4',
          solution: {
            method: 'Phrasal verb — storing something neatly',
            steps: [
              '"Put away" = to store something in its proper place.',
              'After ironing, you store clothes neatly in a cupboard = put away.',
              '"Put on" = wear; "put up" = erect/host; "put off" = postpone.',
            ],
            tip: '"Put away" = return to its proper storage place. "He put his uniform away in the cupboard."',
          },
        },
        {
          id: 'ro-eoy-p2-b-q10',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 10,
          stem: 'Maya __________ something into my ears and left the room in a hurry. I could not catch what she was saying.',
          options: [
            { label: '1', text: 'yelled' },
            { label: '2', text: 'shouted' },
            { label: '3', text: 'croaked' },
            { label: '4', text: 'mumbled' },
          ],
          answer: '4',
          solution: {
            method: 'Dialogue verb — unclear speech close to someone\'s ear',
            steps: [
              'Maya spoke into someone\'s ears AND the person "could not catch what she was saying."',
              '"Mumbled" = spoke quietly or unclearly → explains why the words were not understood.',
              '"Yelled/shouted" = loud, clear; "croaked" = rough, frog-like voice.',
            ],
            tip: '"Mumbled" = spoke unclearly in a low voice. The inability to understand links to mumbling.',
          },
        },
        {
          id: 'ro-eoy-p2-b-q11',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 11,
          stem: 'Being a small and thin boy, Andy was able to __________ through the tunnel easily.',
          options: [
            { label: '1', text: 'crawl' },
            { label: '2', text: 'shake' },
            { label: '3', text: 'jiggle' },
            { label: '4', text: 'slither' },
          ],
          answer: '1',
          solution: {
            method: 'Verb of movement — moving through a small space',
            steps: [
              'Andy is small and thin → can fit through a tunnel.',
              '"Crawl" = move on hands and knees through a narrow space.',
              '"Slither" = snake-like movement (on the belly); "shake" = vibrate; "jiggle" = move with quick small movements.',
              '"Crawl through a tunnel" is the most natural phrase.',
            ],
            tip: '"Crawl" = move on hands/knees, often through a narrow space. Natural for tunnels.',
          },
        },
        {
          id: 'ro-eoy-p2-b-q12',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 12,
          stem: 'The tourists took many beautiful photographs of the __________ view from the top of the mountain.',
          options: [
            { label: '1', text: 'plain' },
            { label: '2', text: 'splendid' },
            { label: '3', text: 'boring' },
            { label: '4', text: 'extravagant' },
          ],
          answer: '2',
          solution: {
            method: 'Adjective describing a beautiful view',
            steps: [
              'Tourists took "beautiful photographs" → the view must be beautiful/impressive.',
              '"Splendid" = magnificent, impressively beautiful → matches "many beautiful photographs".',
              '"Plain" = simple, ordinary; "boring" = uninteresting; "extravagant" = excessive/showy.',
            ],
            tip: '"Splendid" = impressively beautiful. A mountain view is splendid, not plain or boring.',
          },
        },
        {
          id: 'ro-eoy-p2-b-q13',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 13,
          stem: 'I would be frightened if I saw a __________ of sheep charging towards me.',
          options: [
            { label: '1', text: 'herd' },
            { label: '2', text: 'litter' },
            { label: '3', text: 'flock' },
            { label: '4', text: 'troop' },
          ],
          answer: '3',
          solution: {
            method: 'Collective noun for sheep',
            steps: [
              'Collective nouns for animals: a flock of sheep/birds; a herd of cattle/elephants; a litter of kittens/puppies; a troop of monkeys.',
              '"A flock of sheep" = the correct collective noun for sheep.',
            ],
            tip: 'A FLOCK of sheep (and birds). A HERD of cattle. A LITTER of kittens. A TROOP of monkeys.',
          },
        },
        {
          id: 'ro-eoy-p2-b-q14',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 14,
          stem: 'Zoey and Leia are so similar that they are __________.',
          options: [
            { label: '1', text: 'as tall as trees' },
            { label: '2', text: 'as busy as bees' },
            { label: '3', text: 'like two peas in a pod' },
            { label: '4', text: 'like cats and dogs' },
          ],
          answer: '3',
          solution: {
            method: 'Idiom — two people who look/behave alike',
            steps: [
              '"So similar" → an idiom for two people who are very alike.',
              '"Like two peas in a pod" = very similar to each other (like identical twins).',
              '"Like cats and dogs" = fighting/disagreeing; "as tall as trees" = very tall; "as busy as bees" = very hardworking.',
            ],
            tip: '"Two peas in a pod" = two people who are very similar. Perfect match for "so similar".',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — GRAMMAR CLOZE  (Booklet B, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-c',
      name: 'Section C: Grammar Cloze',
      topic: 'GrammarCloze',
      marks: 8,
      instructions:
        'Read the passage carefully. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. USE EACH WORD ONCE ONLY. (4 marks)\n\nFor the second passage, fill in each blank with the correct word from the box. USE EACH WORD ONCE ONLY. (4 marks)',
      subSections: [
        {
          id: 'sec-c-p1',
          name: 'Cloze Passage 1 — My Brother\'s Sunflower',
          wordBox: [
            { label: 'A', word: 'his' },
            { label: 'B', word: 'I' },
            { label: 'C', word: 'it' },
            { label: 'D', word: 'him' },
            { label: 'E', word: 'you' },
            { label: 'F', word: 'them' },
          ],
          passage: {
            text: "My brother loved his sunflower. He watered (15) ___ faithfully, every morning and night. One day, while he was in school, (16) ___ sunflower withered. When he got home and saw the sunflower, he started crying.\n\n(17) ___ asked my brother why he was crying. Sobbing his heart out, he said, \"I had wanted to give it to (18) ___ for your birthday next week!\" Hearing that, I comforted him by thanking him for his thoughtful act and he smiled.",
          },
          questions: [
            {
              id: 'ro-eoy-p2-c-q15',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 15,
              stem: 'He watered (15) ___ faithfully.',
              answer: 'C (it)',
              solution: {
                method: 'Pronoun — object referring to the sunflower',
                steps: [
                  '"Watered" is a transitive verb; the object = the sunflower.',
                  'The sunflower is a thing (not a person) → "it".',
                ],
                tip: '"It" replaces a singular thing (the sunflower). "He watered it."',
              },
            },
            {
              id: 'ro-eoy-p2-c-q16',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 16,
              stem: '(16) ___ sunflower withered.',
              answer: 'A (his)',
              solution: {
                method: 'Possessive pronoun — the sunflower belongs to the brother',
                steps: [
                  'The sunflower belongs to the brother (he/him) → possessive = "his".',
                  '"His sunflower" = the sunflower belonging to him.',
                ],
                tip: '"His" = belonging to him (male). "His sunflower withered."',
              },
            },
            {
              id: 'ro-eoy-p2-c-q17',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 17,
              stem: '(17) ___ asked my brother why he was crying.',
              answer: 'B (I)',
              solution: {
                method: 'Subject pronoun — the narrator (first person)',
                steps: [
                  'The narrator is telling the story in first person.',
                  '"I asked my brother" = the narrator/speaker asked.',
                  '"I" = 1st-person singular subject pronoun.',
                ],
                tip: 'The narrator of the story uses "I" as the subject of their own actions.',
              },
            },
            {
              id: 'ro-eoy-p2-c-q18',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 18,
              stem: '"I had wanted to give it to (18) ___ for your birthday next week!"',
              answer: 'E (you)',
              solution: {
                method: 'Object pronoun — in direct speech, referring to the narrator',
                steps: [
                  'The brother is speaking to the narrator: "give it to you."',
                  '"You" = 2nd-person object pronoun (the person being spoken to).',
                ],
                tip: 'In direct speech, the speaker says "give it to you" (addressing the listener).',
              },
            },
          ],
        },
        {
          id: 'sec-c-p2',
          name: 'Cloze Passage 2 — Cotton Candy Grapes',
          wordBox: [
            { label: '—', word: 'grow' },
            { label: '—', word: 'grows' },
            { label: '—', word: 'grew' },
            { label: '—', word: 'growing' },
          ],
          passage: {
            text: 'Have you ever eaten a grape that tasted like cotton candy? A scientist, David Cain, has managed to (19) ___ such grapes. He is now busy working on (20) ___ grapes that taste like honey. He was inspired by the different types of apples that (21) ___ in his grandfather\'s garden when he was young. As David (22) ___ more grapes, he hopes to encourage children to eat more fruits.',
          },
          questions: [
            {
              id: 'ro-eoy-p2-c-q19',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 19,
              stem: 'Has managed to (19) ___ such grapes.',
              answer: 'grow',
              solution: {
                method: 'Infinitive after "managed to"',
                steps: [
                  '"Managed to ___" requires the base infinitive.',
                  '"Grow" = base form → correct.',
                ],
                tip: '"Manage to + base verb": managed to grow, managed to win.',
              },
            },
            {
              id: 'ro-eoy-p2-c-q20',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 20,
              stem: 'He is now busy working on (20) ___ grapes that taste like honey.',
              answer: 'growing',
              solution: {
                method: 'Gerund after "working on"',
                steps: [
                  '"Working on + gerund (verb-ing)" = the activity he is focused on.',
                  '"Working on growing grapes" = the ongoing project.',
                ],
                tip: '"Working on + gerund": working on growing, working on improving.',
              },
            },
            {
              id: 'ro-eoy-p2-c-q21',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 21,
              stem: 'The different types of apples that (21) ___ in his grandfather\'s garden when he was young.',
              answer: 'grew',
              solution: {
                method: 'Simple past — action in the past',
                steps: [
                  '"When he was young" = past time → simple past tense.',
                  '"Grew" = simple past of "grow".',
                ],
                tip: '"When he was young" → past tense → grew.',
              },
            },
            {
              id: 'ro-eoy-p2-c-q22',
              type: 'A',
              topic: 'GrammarCloze',
              marks: 1,
              questionNumber: 22,
              stem: 'As David (22) ___ more grapes, he hopes to encourage children.',
              answer: 'grows',
              solution: {
                method: 'Subject-verb agreement — singular "David" + present tense',
                steps: [
                  '"As David ___" = present tense, 3rd-person singular.',
                  '"Grows" = simple present + s for singular subject.',
                ],
                tip: '"As David grows more grapes" = present tense habit/ongoing. 3rd person singular → grows.',
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — EDITING  (Booklet B, 3 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-d',
      name: 'Section D: Editing',
      topic: 'Editing',
      marks: 3,
      instructions:
        'Each of the underlined words contains either a spelling or grammatical error. Write the correct word in each of the boxes.',
      passage: {
        title: 'A Walk in the Rain',
        text: 'Thunder rumbled in the distance and it started raining heavily. "Shall we take the bus home today?" Lily\'s mother asked. Lily [peers] (23) from under her umbrella. "Let\'s walk home, Mum. I like the rain." She took her mother\'s hand as they crossed [My] (24) street. Mother stepped over the puddles, carefully avoiding them. Lily stamped her feet happily, splashing the water. Her mother smiled while [shayking] (25) her head. Down the street they went, walking past many shops.',
        source: 'Adapted from Lily and the Paper Man by Rebecca Upjohn',
      },
      questions: [
        {
          id: 'ro-eoy-p2-d-q23',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 23,
          stem: 'Lily [peers] from under her umbrella.',
          underlinedWord: 'peers',
          answer: 'peered',
          solution: {
            method: 'Tense — past tense for a narrative past event',
            steps: [
              'The passage is a narrative in the past tense ("mother asked", "she took").',
              '"Peers" = simple present → wrong tense.',
              '"Peered" = simple past → correct for past narrative.',
            ],
            tip: 'In a past narrative, all verbs should be in past tense. "Peers" → "peered".',
          },
        },
        {
          id: 'ro-eoy-p2-d-q24',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 24,
          stem: 'She took her mother\'s hand as they crossed [My] street.',
          underlinedWord: 'My',
          answer: 'Her',
          solution: {
            method: 'Pronoun — possessive referring to Lily\'s mother\'s street',
            steps: [
              '"Lily and her mother" are crossing a street — it\'s the street near them.',
              'Context: "She took her mother\'s hand…they crossed ___ street." = the street they were on.',
              '"Her" (referring to mother\'s neighbourhood/their street) is more appropriate than "My" (narrator\'s own).',
              'The error: "My" belongs to the first person (Lily speaking), but the narrative uses 3rd person → "Her" is the correct replacement.',
            ],
            tip: 'Switch from inappropriate 1st-person "My" to 3rd-person "Her" to match narrative POV.',
          },
        },
        {
          id: 'ro-eoy-p2-d-q25',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 25,
          stem: 'Her mother smiled while [shayking] her head.',
          underlinedWord: 'shayking',
          answer: 'shaking',
          solution: {
            method: 'Spelling correction',
            steps: [
              '"Shayking" is a misspelling of "shaking" (s-h-a-k-i-n-g).',
              'Correct spelling: shake → shaking.',
            ],
            tip: '"Shaking" = the -ing form of "shake". No "y" in the word.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — VOCABULARY CLOZE  (Booklet B, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-e',
      name: 'Section E: Vocabulary Cloze — Pablo Picasso',
      topic: 'VocabCloze',
      marks: 4,
      instructions:
        'For questions 26 to 29, read the passage carefully, choose the correct word from the words given in the box and write its letter (A to H) in each blank. USE A WORD ONCE ONLY.',
      wordBox: [
        { label: 'A', word: 'time' },
        { label: 'B', word: 'found' },
        { label: 'C', word: 'sadness' },
        { label: 'D', word: 'lost' },
        { label: 'E', word: 'interest' },
        { label: 'F', word: 'happiness' },
        { label: 'G', word: 'talented' },
        { label: 'H', word: 'clever' },
      ],
      passage: {
        title: 'Pablo Picasso',
        text: 'Pablo Picasso was born in Spain. When he was in school, Picasso had little (26) ___ in studying. However, he enjoyed painting and was very good at it. He was a (27) ___ artist and his paintings made him popular. When Picasso was twenty years old, he (28) ___ a close friend and became very sad. As a painter, he expressed his emotions through his artwork, and they were mainly painted in blue to show his (29) ___. People loved his paintings so much that his most expensive art piece was sold for millions of dollars. Picasso remains a well-known artist till this day.',
      },
      questions: [
        {
          id: 'ro-eoy-p2-e-q26',
          type: 'A',
          topic: 'VocabCloze',
          marks: 1,
          questionNumber: 26,
          stem: 'Picasso had little (26) ___ in studying.',
          answer: 'E (interest)',
          solution: {
            method: 'Vocabulary — "little interest in" = not interested',
            steps: [
              '"Had little ___ in studying" = was not very ___.',
              '"Little interest in" = not interested in → he didn\'t enjoy studying.',
              'Confirms: "he enjoyed painting" but NOT studying.',
            ],
            tip: '"Have little interest in" = not be interested in. Opposite = "have a lot of interest in".',
          },
        },
        {
          id: 'ro-eoy-p2-e-q27',
          type: 'A',
          topic: 'VocabCloze',
          marks: 1,
          questionNumber: 27,
          stem: 'He was a (27) ___ artist and his paintings made him popular.',
          answer: 'G (talented)',
          solution: {
            method: 'Vocabulary — adjective describing a skilled artist',
            steps: [
              '"Very good at painting" → he was skilled/gifted.',
              '"Talented" = naturally gifted/skilled in a field.',
              '"Clever" = intelligent (more about thinking than art skill).',
            ],
            tip: '"Talented artist" = an artist with natural skill and gift. "Talented" is the standard collocation.',
          },
        },
        {
          id: 'ro-eoy-p2-e-q28',
          type: 'A',
          topic: 'VocabCloze',
          marks: 1,
          questionNumber: 28,
          stem: 'When Picasso was twenty years old, he (28) ___ a close friend and became very sad.',
          answer: 'D (lost)',
          solution: {
            method: 'Vocabulary — losing someone (bereavement)',
            steps: [
              '"He ___ a close friend and became very sad" → the friend died/was lost.',
              '"Lost a friend" = the friend died or left permanently.',
              'Context: he "became very sad" → something bad happened to the friend.',
            ],
            tip: '"Lost a friend" = the friend died or permanently departed. Led to sadness.',
          },
        },
        {
          id: 'ro-eoy-p2-e-q29',
          type: 'A',
          topic: 'VocabCloze',
          marks: 1,
          questionNumber: 29,
          stem: 'They were mainly painted in blue to show his (29) ___.',
          answer: 'C (sadness)',
          solution: {
            method: 'Vocabulary — emotion expressed through blue paintings',
            steps: [
              'Blue = associated with sadness/melancholy.',
              'Picasso "became very sad" after losing his friend → expressed "sadness" in blue paintings.',
              '"Sadness" matches both the emotion and the colour association.',
            ],
            tip: 'Blue in art = sadness/melancholy. Picasso\'s "Blue Period" expressed his sadness.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — SENTENCE MANIPULATION  (Booklet B, 2 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-f',
      name: 'Section F: Sentence Manipulation',
      topic: 'SentenceCombining',
      marks: 2,
      instructions:
        'For questions 30 and 31, rewrite the given sentences using the words provided. Your answer must be in ONE sentence. The meaning of your sentence must be the same as the meaning of the given sentence(s).',
      questions: [
        {
          id: 'ro-eoy-p2-f-q30',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 30,
          stem: 'Tom added cheese to his sandwich. Tom added lettuce to his sandwich, too.\n\n___________________________________________ and ___________________________________________',
          givenSentences: [
            'Tom added cheese to his sandwich.',
            'Tom added lettuce to his sandwich, too.',
          ],
          connectorProvided: 'and',
          answer: 'Tom added cheese and lettuce to his sandwich.',
          solution: {
            method: 'Sentence combining with "and" — same subject, same action, different objects',
            steps: [
              'Both sentences share "Tom added ___ to his sandwich".',
              '"And" joins the two objects: cheese and lettuce.',
              'Combine: "Tom added cheese and lettuce to his sandwich."',
            ],
            tip: '"And" joins two items in a list. Keep the common structure once.',
          },
        },
        {
          id: 'ro-eoy-p2-f-q31',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 31,
          stem: 'The sky was getting dark. The children left the playground.\n\n___________________________________________ because ___________________________________________',
          givenSentences: [
            'The sky was getting dark.',
            'The children left the playground.',
          ],
          connectorProvided: 'because',
          answer: 'The children left the playground because the sky was getting dark.',
          solution: {
            method: 'Sentence combining with "because" — cause and effect',
            steps: [
              '"Because" introduces the reason/cause.',
              'Cause: the sky was getting dark. Effect: children left the playground.',
              'Structure: "[Effect] because [Cause]."',
              'Answer: "The children left the playground because the sky was getting dark."',
            ],
            tip: '"Because" introduces the reason. The effect comes before "because", the cause after.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — COMPREHENSION CLOZE  (Booklet B, 3 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-g',
      name: 'Section G: Comprehension Cloze — Lizards',
      topic: 'ComprehensionFIB',
      marks: 3,
      instructions:
        'Read the passage carefully. For questions 32 to 34, fill in each of the blanks with the most suitable word. YOU ARE ONLY ALLOWED TO USE ONE WORD FOR EACH BLANK.',
      passage: {
        title: 'Lizards',
        text: "Lizards are four-legged reptiles that live on land. Most of them are predators that feed on insects such as mosquitoes. Only a few large lizards such as iguanas feed on plants. Lizards have good colour vision. Their keen sense of sight also allows them to spot their (32) ___ easily and catch them. Most lizards can match the colours and patterns of their background. This camouflage helps them to (33) ___ from their predators.\n\nLizards like geckos have a surprise for their attackers — they can shed their tail simply by moving certain muscles. The tail twitches and wriggles, distracting the predators so that the lizard has the chance to escape and get away (34) ___. This is a small price to pay for their survival.",
        source: 'Adapted from https://kids.britannica.com/kids/lizards',
      },
      questions: [
        {
          id: 'ro-eoy-p2-g-q32',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 32,
          stem: 'Their keen sense of sight also allows them to spot their (32) ___ easily and catch them.',
          answer: 'prey / preys',
          solution: {
            method: 'Vocabulary — what a predator hunts and catches',
            steps: [
              'Lizards are predators → they hunt animals for food.',
              '"Spot their ___ and catch them" = find and catch the animals they eat.',
              '"Prey" = the animal hunted by a predator.',
            ],
            tip: '"Prey" = the hunted animal. Predator → hunts → prey.',
          },
        },
        {
          id: 'ro-eoy-p2-g-q33',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 33,
          stem: 'This camouflage helps them to (33) ___ from their predators.',
          answer: 'hide / escape / hide away',
          solution: {
            method: 'Vocabulary — what camouflage allows you to do from predators',
            steps: [
              'Camouflage = blending into the background → makes you invisible.',
              '"Helps them to ___ from predators" = stay out of sight of predators.',
              '"Hide" = remain concealed from view → most direct answer.',
              '"Escape" is also acceptable (camouflage helps them escape detection).',
            ],
            tip: 'Camouflage helps animals "hide" from predators by blending into surroundings.',
          },
        },
        {
          id: 'ro-eoy-p2-g-q34',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 34,
          stem: 'The lizard has the chance to escape and get away (34) ___ . This is a small price to pay for their survival.',
          answer: 'quickly / safely / fast',
          solution: {
            method: 'Adverb — how the lizard gets away',
            steps: [
              '"Get away ___" = escape in some manner.',
              'The tail distraction gives the lizard a chance — it needs to escape quickly.',
              '"Quickly" = in a fast manner → the lizard flees fast while predator is distracted.',
            ],
            tip: '"Get away quickly" = escape fast. The distraction buys the lizard time to flee.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — COMPREHENSION 1  (Booklet B, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-h',
      name: "Section H: Comprehension 1 — Mr Tan's Garden",
      topic: 'ComprehensionOE',
      marks: 8,
      instructions: 'Read the following passage carefully. Then write the answers for questions 35 to 41.',
      passage: {
        title: "Mr Tan's Garden",
        lines: [
          'Mr Tan had a garden with many fruit trees which attracted the children in the',
          'neighbourhood. However, because of Mr Tan\'s grumpy face, children were afraid',
          'of him. They would run away quickly whenever he was spotted. A few lucky ones',
          'did manage to get away with some fruits from his garden.',
          '',
          'One evening, my sister and I decided to take a short cut through Mr Tan\'s', // line 5
          'garden as we had to be on time for Grandmother\'s birthday celebration at home.',
          'We were walking halfway through the garden when we heard, "Hey, you two!" in a',
          'gruff, low voice. We froze in our tracks. We were face-to-face, for the first time, with',
          'the elderly man. Our knees were shaking.',
          '',
          '"Come here," said Mr Tan as he reached up to one of his apple trees. To', // line 10
          'our surprise, he held out several ripe, juicy apples. We stared at them in delight.',
          '"Take these home," he said. My sister and I hesitantly took them, thanked him and',
          'hurriedly made our way home.',
          '',
          'Since then, each time we walked through his garden, we would receive',      // line 14
          'plenty of fruits from Mr Tan. We realised that we had found a hidden treasure in', // line 15
          'him. Mr Tan might look stern but hidden behind that face was a kind and generous',
          'soul. My sister and I learned never to judge a person by his looks.',
        ],
        source: 'Adapted from The Hidden Treasure by Debbie King',
      },
      questions: [
        {
          id: 'ro-eoy-p2-h-q35',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 35,
          stem: 'Tick (✓) your chosen answer. The children would run away whenever they saw Mr Tan because they __________. (1m)\n\n□ did not like him\n□ were afraid of him\n□ were playing in his garden',
          answer: 'were afraid of him',
          solution: {
            method: 'Direct retrieval',
            steps: [
              'Para 1: "because of Mr Tan\'s grumpy face, children were afraid of him. They would run away quickly."',
              'The children ran away because they were afraid.',
            ],
            tip: 'Direct quote: "children were AFRAID of him" → they ran away.',
          },
        },
        {
          id: 'ro-eoy-p2-h-q36',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 36,
          stem: 'True or False: The children in the neighbourhood did not dare to take the fruits from Mr Tan\'s garden. (1m)',
          answer: 'False',
          solution: {
            method: 'Direct recall — contrasting detail',
            steps: [
              'Para 1: "A few lucky ones did manage to get away with some fruits from his garden."',
              'Some children DID take fruits (sneaked away with them) → the statement is False.',
            ],
            tip: '"A few lucky ones did manage" = some children successfully took fruits. Answer = False.',
          },
        },
        {
          id: 'ro-eoy-p2-h-q37',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 37,
          stem: 'True or False: The writer and her sister met Mr Tan for the first time in his garden. (1m)',
          answer: 'True',
          solution: {
            method: 'Direct recall',
            steps: [
              'Para 2: "We were face-to-face, for the first time, with the elderly man."',
              '"For the first time" = first meeting → True.',
            ],
            tip: '"For the first time" explicitly states this was their first meeting. Answer = True.',
          },
        },
        {
          id: 'ro-eoy-p2-h-q38',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 38,
          stem: 'Based on paragraph 2, how did the two siblings react when they were stopped by Mr Tan? (2m)\n\n(i) ___  (ii) ___',
          answer: '(i) They froze in their tracks.\n(ii) Their knees were shaking.',
          solution: {
            method: 'Direct retrieval — two physical reactions',
            steps: [
              'Para 2: "We froze in our tracks." = reaction 1.',
              '"Our knees were shaking." = reaction 2.',
            ],
            tip: 'Two marks = two reactions. Find two distinct physical responses in paragraph 2.',
          },
        },
        {
          id: 'ro-eoy-p2-h-q39',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 39,
          stem: 'Which word tells you that the children could not wait to get away from Mr Tan? Circle either (A) or (B). (1m)\n\nMy sister and I hesitantly (A) took them, thanked him and hurriedly (B) made our way home.',
          answer: 'B (hurriedly)',
          solution: {
            method: 'Vocabulary — word showing eagerness to leave',
            steps: [
              '"Could not wait to get away" = were in a hurry to leave.',
              '"Hurriedly" = in a great rush → shows they were eager to leave quickly.',
              '"Hesitantly" = reluctantly, with uncertainty (refers to taking the apples, not leaving).',
            ],
            tip: '"Hurriedly made our way home" = rushed home. "Hurriedly" = in a hurry to leave.',
          },
        },
        {
          id: 'ro-eoy-p2-h-q40',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 40,
          stem: 'Write 1, 2 and 3 in the blanks below to indicate the order in which the events happened. (1m)\n\n___ Mr Tan called out to the writer and her sister.\n___ Mr Tan offered the writer and her sister some apples.\n___ The writer and her sister walked through Mr Tan\'s garden.',
          correctSequence: {
            'Mr Tan called out to the writer and her sister.': 2,
            'Mr Tan offered the writer and her sister some apples.': 3,
            "The writer and her sister walked through Mr Tan's garden.": 1,
          },
          answer: 'Walked through garden = 1; Mr Tan called out = 2; Mr Tan offered apples = 3',
          solution: {
            method: 'Sequencing events from passage',
            steps: [
              '1st: They walked through the garden.',
              '2nd: Mr Tan called out "Hey, you two!".',
              '3rd: Mr Tan offered them ripe apples.',
            ],
            tip: 'Follow the narrative: enter garden → Mr Tan called → Mr Tan gave apples.',
          },
        },
        {
          id: 'ro-eoy-p2-h-q41',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 41,
          stem: 'What lesson did the writer and her sister learn? (1m)',
          answer: 'They learned never to judge a person by his/her looks.',
          solution: {
            method: 'Direct retrieval — lesson stated at end of passage',
            steps: [
              'Last line: "My sister and I learned never to judge a person by his looks."',
              'Lesson = do not judge someone by their appearance.',
            ],
            tip: 'The lesson is explicitly stated in the last sentence of the passage.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION I — COMPREHENSION 2  (Booklet B, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-i',
      name: "Section I: Comprehension 2 — Callum and Rugby",
      topic: 'ComprehensionOE',
      marks: 8,
      instructions: 'Read the following passage carefully. Then write the answers for questions 42 to 48.',
      passage: {
        title: "Callum's Rugby Dream",
        lines: [
          'Callum sprinted out from the left and slammed into another player. With',
          'one quick move, he landed on top of the fallen player. "What an exciting rugby',
          'game!" I cheered. The game continued and the players struggled for the rugby ball.',
          '',
          'This time, Callum fell hard on the ground. Upon seeing this, I gasped in', // line 5
          'shock. After a few moments, Callum got up. I heaved a sigh of relief.',
          '',
          'I recalled the day when Callum, my son, first asked if he could play rugby.',
          'It caught me by surprise. I was terrified and felt worried for his safety. He was',
          'only ten years old. Personally, I did not like the sport. It had the highest number',
          'of injuries among all the sports activities. I told Callum to choose another sport', // line 10
          'like basketball or badminton.',
          '',
          'Callum wanted to play rugby so much that he kept asking for my',
          'permission but I was reluctant to agree. Callum was tall for his age. He told me',
          'that his height was an advantage in the sport. On the field, he would tower over',
          'the other players. They were also not as fast as he was. Callum knew that he', // line 15
          'would do well in this sport.',
          '',
          'Touched by his determination to do something that was difficult, I gave in',
          'eventually. After watching all the matches he had played in, I had to admit that I',
          'had made the right choice to allow him to play rugby. I was proud of Callum for',
          'being fearless and not giving up the sport that he loved.', // line 20
        ],
        source: 'Original',
      },
      questions: [
        {
          id: 'ro-eoy-p2-i-q42',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 42,
          stem: 'Tick (✓) your chosen answer. In the first paragraph, the writer cheered when __________. (1m)\n\n□ the game continued.\n□ Callum landed on another player.\n□ the players struggled for the rugby ball.',
          answer: 'Callum landed on another player',
          solution: {
            method: 'Direct retrieval — sequence of events in paragraph 1',
            steps: [
              'Para 1: "Callum sprinted out…slammed into another player…landed on top of the fallen player. \'What an exciting rugby game!\' I cheered."',
              'The cheering immediately followed Callum landing on another player.',
            ],
            tip: 'The cheer came right after "he landed on top of the fallen player."',
          },
        },
        {
          id: 'ro-eoy-p2-i-q43',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 43,
          stem: 'What does the word "It" (line 9) refer to? (1m)',
          answer: 'Rugby (the sport)',
          solution: {
            method: 'Pronoun reference — "It" at line 9',
            steps: [
              'Line 9: "It had the highest number of injuries among all the sports activities."',
              '"It" refers to the sport being discussed — rugby.',
              'The writer said "I did not like the sport" (rugby) → "It" = rugby.',
            ],
            tip: '"It" refers to the last mentioned noun. The sport = rugby. "It had the highest injuries."',
          },
        },
        {
          id: 'ro-eoy-p2-i-q44',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 44,
          stem: 'What does the word "They" (line 15) refer to? (1m)',
          answer: 'The other players',
          solution: {
            method: 'Pronoun reference — "They" at line 15',
            steps: [
              'Line 14–15: "He would tower over the other players. They were also not as fast as he was."',
              '"They" = the other players on the field.',
            ],
            tip: '"They" refers to the nearest plural noun — the other players.',
          },
        },
        {
          id: 'ro-eoy-p2-i-q45',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 45,
          stem: 'True or False: The writer allowed Callum to play rugby at first. (1m)',
          answer: 'False',
          solution: {
            method: 'Direct recall',
            steps: [
              'Para 3: "I told Callum to choose another sport like basketball or badminton."',
              'Para 4: "I was reluctant to agree."',
              'The writer did NOT allow Callum at first → False.',
            ],
            tip: '"Reluctant to agree" and "choose another sport" show the writer initially refused.',
          },
        },
        {
          id: 'ro-eoy-p2-i-q46',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 46,
          stem: 'True or False: Callum was taller than the other boys. (1m)',
          answer: 'True',
          solution: {
            method: 'Direct recall',
            steps: [
              'Para 4: "On the field, he would tower over the other players."',
              '"Tower over" = be significantly taller than → True.',
            ],
            tip: '"Tower over the other players" = much taller than them. Answer = True.',
          },
        },
        {
          id: 'ro-eoy-p2-i-q47',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 47,
          stem: 'Find a word in the last paragraph which has the same meaning as:\n\ni) challenging ___  (1m)\nii) brave ___  (1m)',
          answer: 'i) difficult\nii) fearless',
          solution: {
            method: 'Vocabulary — synonyms in last paragraph',
            steps: [
              'Last paragraph: "determination to do something that was difficult" → "difficult" = challenging.',
              '"Fearless" = without fear = brave.',
            ],
            tip: '"Difficult" = challenging. "Fearless" = brave. Both appear in the last paragraph.',
          },
        },
        {
          id: 'ro-eoy-p2-i-q48',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 48,
          stem: 'Why did the writer give in and allow Callum to play rugby eventually? (1m)',
          answer: 'The writer gave in because Callum was determined to do something that was difficult / Callum\'s determination touched the writer.',
          solution: {
            method: 'Inference — reason for change of mind',
            steps: [
              'Last paragraph: "Touched by his determination to do something that was difficult, I gave in eventually."',
              'Reason: Callum\'s determination and perseverance moved the writer.',
            ],
            tip: '"Touched by his determination" = the writer was moved by how determined Callum was.',
          },
        },
      ],
    },
  ],
};

export default paper;
