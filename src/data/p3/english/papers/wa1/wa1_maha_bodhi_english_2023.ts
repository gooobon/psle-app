// =============================================================================
// wa1_maha_bodhi_english_2023.ts
// Maha Bodhi School — 2023 Weighted Assessment 1 — English Language Review (1) — P3
// Sections: A Grammar MCQ (6), B Vocabulary MCQ (5), C Grammar Cloze (4),
//           D Vocabulary Cloze (5), E Comprehension Open-Ended (10) = 30 marks
// Source PDF: P3_English_WA1.pdf, pp. 15–25  (Date on paper: 28 April 2023)
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1_maha_bodhi_english_2023: EnglishPaper = {
  meta: {
    school: 'Maha Bodhi School',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 30,
    sourcePages: '15-25',
  },
  items: [
    // ---------------------------------------------------------------------
    // SECTION A — Grammar (6 x 1 mark)
    // Choose the correct answer and write the number (1, 2, 3 or 4).
    // ---------------------------------------------------------------------
    {
      kind: 'single',
      id: 'mb2023-q1',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 1,
      marks: 1,
      stem: 'My aunt ____________ me a teddy bear yesterday.',
      options: [
        { label: '1', text: 'buy' },
        { label: '2', text: 'buys' },
        { label: '3', text: 'bought' },
        { label: '4', text: 'will buy' },
      ],
      answer: '3',
      solution: {
        method: 'Use the time word "yesterday" to choose the tense.',
        steps: [
          '"yesterday" tells us the action already happened in the past.',
          'The past tense of "buy" is "bought" (irregular verb).',
          'buy/buys are present; "will buy" is future, so they do not fit "yesterday".',
        ],
        tip: 'Learn irregular past tenses by heart: buy → bought, bring → brought, think → thought.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q2',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 2,
      marks: 1,
      stem: 'Sally ____________ a computer game in her bedroom when the phone rang.',
      options: [
        { label: '1', text: 'play' },
        { label: '2', text: 'played' },
        { label: '3', text: 'is playing' },
        { label: '4', text: 'was playing' },
      ],
      answer: '4',
      solution: {
        method: 'A longer past action interrupted by a sudden one uses the past continuous.',
        steps: [
          'Two past actions: a long one (playing a game) and a short one that breaks in (the phone rang).',
          'The long, ongoing action takes the past continuous: "was playing".',
          '"is playing" is present, so it does not match "when the phone rang" (past).',
        ],
        tip: 'Pattern: "was/were + verb-ing ... when + past simple". The -ing action was already happening.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q3',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 3,
      marks: 1,
      stem: '"I forgot ____________ my shoes for soccer training!" Jason exclaimed.',
      options: [
        { label: '1', text: 'bring' },
        { label: '2', text: 'to bring' },
        { label: '3', text: 'bringing' },
        { label: '4', text: 'to bringing' },
      ],
      answer: '2',
      solution: {
        method: 'Use the correct verb pattern after "forgot".',
        steps: [
          '"forget to do something" means you did NOT do it (you forgot, so it was not done).',
          'Jason did not bring his shoes, so we use "forgot to bring".',
          '"forgot bringing" would mean he brought them but cannot remember doing so — wrong meaning here.',
        ],
        tip: '"forget to + verb" = it did not happen. "forget + verb-ing" = it happened but you do not remember.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q4',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 4,
      marks: 1,
      stem: 'The two boys decided to sit ____________ the river to fish.',
      options: [
        { label: '1', text: 'by' },
        { label: '2', text: 'on' },
        { label: '3', text: 'under' },
        { label: '4', text: 'above' },
      ],
      answer: '1',
      solution: {
        method: 'Choose the preposition that shows sitting next to the river.',
        steps: [
          'To fish, the boys would sit at the edge of (next to) the river.',
          '"by the river" means beside it — the natural place to fish from land.',
          'on / under / above the river do not make sense for boys sitting to fish.',
        ],
        tip: '"by" often means "next to / beside" (sit by the window, stand by the door).',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q5',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 5,
      marks: 1,
      stem: 'Mother added ____________ salt into the pot of soup to make it tasty.',
      options: [
        { label: '1', text: 'much' },
        { label: '2', text: 'many' },
        { label: '3', text: 'some' },
        { label: '4', text: 'little' },
      ],
      answer: '3',
      solution: {
        method: 'Pick the right quantifier for an uncountable noun in a positive sentence.',
        steps: [
          '"salt" is uncountable, so "many" (used for countable things) is wrong.',
          'The sentence is positive and means a reasonable amount, so "some" fits best.',
          '"much" is usually used in questions/negatives; "little" means almost none, which would not make soup tasty.',
        ],
        tip: 'Use "many" with countable nouns (many apples) and "some/much" with uncountable nouns (some salt).',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q6',
      topic: 'GrammarMCQ',
      format: 'mcq',
      questionNo: 6,
      marks: 1,
      stem: '"The basket of apples ____________ not for sale," the cashier said, pointing to the display.',
      options: [
        { label: '1', text: 'is' },
        { label: '2', text: 'are' },
        { label: '3', text: 'was' },
        { label: '4', text: 'were' },
      ],
      answer: '1',
      solution: {
        method: 'Find the real subject and match the verb (subject–verb agreement).',
        steps: [
          'The subject is "The basket" (singular), not "apples". "of apples" only describes the basket.',
          'A singular subject takes "is/was". The cashier is pointing now, so it is present tense: "is".',
          '"are/were" are plural and would wrongly agree with "apples".',
        ],
        tip: 'Ignore the words between the subject and the verb. "The basket (of apples) IS..." — match the verb to "basket".',
      },
    },

    // ---------------------------------------------------------------------
    // SECTION B — Vocabulary (5 x 1 mark)
    // Choose the best answer and write the number (1, 2, 3 or 4).
    // ---------------------------------------------------------------------
    {
      kind: 'single',
      id: 'mb2023-q7',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 7,
      marks: 1,
      stem: 'I will look for my grandfather for advice whenever I have a problem because he is ____________.',
      options: [
        { label: '1', text: 'as wise as an owl' },
        { label: '2', text: 'as strong as an ox' },
        { label: '3', text: 'as hungry as a bear' },
        { label: '4', text: 'as proud as a peacock' },
      ],
      answer: '1',
      solution: {
        method: 'Match the simile to the clue "for advice".',
        steps: [
          'Going to someone "for advice" means that person is clever/knows a lot.',
          'The owl is the symbol of wisdom, so "as wise as an owl" fits.',
          'strong (ox), hungry (bear) and proud (peacock) do not match giving good advice.',
        ],
        tip: 'Animal similes describe a quality: wise = owl, strong = ox, proud = peacock, busy = bee.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q8',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 8,
      marks: 1,
      stem: 'The timid mouse ____________, "Can I have a piece of cheese, please?"',
      options: [
        { label: '1', text: 'yelled' },
        { label: '2', text: 'hissed' },
        { label: '3', text: 'shrieked' },
        { label: '4', text: 'squeaked' },
      ],
      answer: '4',
      solution: {
        method: 'Match the "saying" verb to a timid (shy/quiet) mouse.',
        steps: [
          '"timid" means shy and quiet, so the sound is soft, not loud.',
          'Mice make a soft "squeak", so "squeaked" fits both the animal and the quiet manner.',
          'yelled and shrieked are loud; hissed is the sound of a snake or angry cat — none match a timid, polite mouse.',
        ],
        tip: 'Choose the "said" word that matches the mood: shouted/yelled for anger, whispered/squeaked for shy or quiet.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q9',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 9,
      marks: 1,
      stem: "It was Mother's Day. Mother was thankful when she received a ____________ of sunflowers from Sally.",
      options: [
        { label: '1', text: 'field' },
        { label: '2', text: 'stalk' },
        { label: '3', text: 'bunch' },
        { label: '4', text: 'branch' },
      ],
      answer: '3',
      solution: {
        method: 'Use the correct collective noun for flowers given as a gift.',
        steps: [
          'Flowers given as a present are tied together in a "bunch" (or bouquet).',
          '"a bunch of flowers" is the set phrase for a gift of flowers.',
          'A field is where flowers grow; a stalk/branch is just one part, not a gift bundle.',
        ],
        tip: 'Collective nouns: a bunch of flowers, a bunch of grapes, a flock of birds, a herd of cows.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q10',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 10,
      marks: 1,
      stem: 'The ____________ thief quickly escaped the house by climbing out of the window, without the police noticing him.',
      options: [
        { label: '1', text: 'tricky' },
        { label: '2', text: 'foolish' },
        { label: '3', text: 'clumsy' },
        { label: '4', text: 'cunning' },
      ],
      answer: '4',
      solution: {
        method: 'Match the adjective to a thief who escapes cleverly and unnoticed.',
        steps: [
          'The thief got away "without the police noticing him" — that takes cleverness and slyness.',
          '"cunning" means clever in a sneaky way, which fits a thief who escapes unseen.',
          'foolish and clumsy describe someone who would get caught; "tricky" is usually used for things/situations, not people.',
        ],
        tip: '"cunning" = clever + sneaky. It is often used for foxes, thieves and sly characters.',
      },
    },
    {
      kind: 'single',
      id: 'mb2023-q11',
      topic: 'VocabMCQ',
      format: 'mcq',
      questionNo: 11,
      marks: 1,
      stem: 'The courageous mother cat protected her kitten ____________ when they were faced with a fierce dog.',
      options: [
        { label: '1', text: 'forcefully' },
        { label: '2', text: 'frightfully' },
        { label: '3', text: 'fearlessly' },
        { label: '4', text: 'frighteningly' },
      ],
      answer: '3',
      solution: {
        method: 'Match the adverb to the clue word "courageous" (brave).',
        steps: [
          '"courageous" means brave, so the cat acted without fear.',
          '"fearlessly" means without fear — it matches a brave mother protecting her kitten.',
          'frightfully/frighteningly are about causing or feeling fear; "forcefully" is about strength, not bravery.',
        ],
        tip: 'Find the clue word in the sentence ("courageous") and choose the adverb that means the same (fearlessly).',
      },
    },

    // ---------------------------------------------------------------------
    // SECTION C — Grammar Cloze (4 x 1 mark) — Possessive pronouns
    // (Word box: his, hers, ours, mine, theirs, yours)
    // ---------------------------------------------------------------------
    {
      kind: 'set',
      id: 'mb2023-grammar-cloze',
      topic: 'GrammarCloze',
      title: 'Grammar Cloze — A Surprise in the Oven',
      instructions:
        'Read the passage carefully. Choose the correct word from the box and write the answer in the blanks provided. Word box: his, hers, ours, mine, theirs, yours. (The blanks test possessive pronouns.)',
      passage:
        'An old lady named Tante lived with her cat. One morning, she was getting ready to bake. She looked into her oven. There was a cat in the oven and it was not (12)____ ! Shocked, she ran to Felix, the old man who lived next door.\n\n' +
        '"Felix! There\'s a cat in my oven!" Tante called.\n\n' +
        '"Are you sure the cat isn\'t (13)____ ?" Felix responded.\n\n' +
        '"I\'m very sure that it\'s not (14)____ !" Tante replied.\n\n' +
        '"I need to take a look," Felix said as (15)____ face turned pale. Together, they rushed to Tante\'s house.\n\n' +
        '(Adapted from storiestogrowby.org/story/a-surprise-in-the-oven-story)',
      marks: 4,
      questions: [
        {
          questionNo: '12',
          format: 'fib',
          marks: 1,
          stem: 'There was a cat in the oven and it was not (12)____ !',
          answer: 'hers',
          solution: {
            method: 'Replace "Tante\'s cat" with the matching possessive pronoun.',
            steps: [
              'The cat in the oven was not the cat belonging to Tante (a "she").',
              'The possessive pronoun for a female owner is "hers".',
              'So: "it was not hers" — meaning it was not her cat.',
            ],
            tip: 'Possessive pronouns replace "owner + noun": her cat → hers, his cat → his, my cat → mine.',
          },
        },
        {
          questionNo: '13',
          format: 'fib',
          marks: 1,
          stem: '"Are you sure the cat isn\'t (13)____ ?" Felix responded.',
          answer: 'yours',
          solution: {
            method: 'Felix is speaking TO Tante, so use the "you" possessive pronoun.',
            steps: [
              'Felix asks Tante if the cat belongs to her ("you").',
              'The possessive pronoun for "you" is "yours".',
              'So: "isn\'t yours?" means "doesn\'t it belong to you?"',
            ],
            tip: 'When someone speaks directly to another person about ownership, "your cat" becomes "yours".',
          },
        },
        {
          questionNo: '14',
          format: 'fib',
          marks: 1,
          stem: '"I\'m very sure that it\'s not (14)____ !" Tante replied.',
          answer: 'mine',
          solution: {
            method: 'Tante is talking about her own cat, so use the "I" possessive pronoun.',
            steps: [
              'Tante answers about a cat belonging to herself ("I").',
              'The possessive pronoun for "I" is "mine".',
              'So: "it\'s not mine" means "it does not belong to me".',
            ],
            tip: 'my cat → mine. The speaker referring to himself/herself uses "mine".',
          },
        },
        {
          questionNo: '15',
          format: 'fib',
          marks: 1,
          stem: '"I need to take a look," Felix said as (15)____ face turned pale.',
          answer: 'his',
          solution: {
            method: 'The face belongs to Felix (a "he"), so use the matching possessive.',
            steps: [
              'The face that turned pale belongs to Felix.',
              'Felix is male, so the possessive word before "face" is "his".',
              'So: "his face turned pale".',
            ],
            tip: 'Be careful: "his" works as both "his cat" (before a noun) and "it is his" (alone). Here it comes before "face".',
          },
          parentVerify: true,
        },
      ],
    },

    // ---------------------------------------------------------------------
    // SECTION D — Vocabulary Cloze (5 x 1 mark)
    // (Word box: bought, better, disappointed, disapproving, good,
    //  materials, tools, wonderfully)
    // ---------------------------------------------------------------------
    {
      kind: 'set',
      id: 'mb2023-vocab-cloze',
      topic: 'VocabCloze',
      title: "Vocabulary Cloze — Henri's Scissors",
      instructions:
        'Read the passage carefully. Choose the best word from the box and write the answer in the blanks provided. Word box: bought, better, disappointed, disapproving, good, materials, tools, wonderfully.',
      passage:
        'In a small town in France lived a boy named Henri. Henri loved to watch his mother paint. He wanted to paint too. He began drawing pictures in his sketchbook. He used art (16)____ like crayons and colour pencils. One day, his mother (17)____ him an expensive box of paint. Henri worked very hard and he painted every single day. Soon, he became (18)____ at painting than before. All his new paintings were (19)____ painted.\n\n' +
        'Henri had a dream. He wished that people would love his paintings. However, when no one did so, he was (20)____. He thought of a new idea. From then on, Henri started to cut out shapes from painted paper using a pair of scissors.\n\n' +
        "(Adapted from Henri's Scissors by Jeanette Winter)",
      marks: 5,
      questions: [
        {
          questionNo: '16',
          format: 'fib',
          marks: 1,
          stem: 'He used art (16)____ like crayons and colour pencils.',
          answer: 'materials',
          solution: {
            method: 'Choose the word that names things like crayons and colour pencils.',
            steps: [
              'Crayons and colour pencils are things an artist uses to create art.',
              '"art materials" is the common phrase for such supplies.',
              '"tools" is possible for equipment, but "materials" is the set phrase that pairs with crayons/colour pencils.',
            ],
            tip: 'Watch for the phrase "like ..." which gives examples; the blank is the general word for those examples (art materials).',
          },
        },
        {
          questionNo: '17',
          format: 'fib',
          marks: 1,
          stem: 'One day, his mother (17)____ him an expensive box of paint.',
          answer: 'bought',
          solution: {
            method: 'Pick the past-tense verb that fits giving someone a gift.',
            steps: [
              'The story is in the past tense ("loved", "wanted", "began").',
              'A mother who gives a box of paint "bought" it for him.',
              '"bought" is the past tense of "buy".',
            ],
            tip: 'For a cloze, first decide the part of speech (here a verb), then match the tense to the rest of the story.',
          },
        },
        {
          questionNo: '18',
          format: 'fib',
          marks: 1,
          stem: 'Soon, he became (18)____ at painting than before.',
          answer: 'better',
          solution: {
            method: 'The word "than" signals a comparative adjective.',
            steps: [
              'The word "than" is used when comparing two things.',
              'The comparative of "good" is "better" (not "gooder").',
              'So: "better at painting than before".',
            ],
            tip: 'When you see "than" in a sentence, the blank usually needs a comparative form (better, taller, faster).',
          },
        },
        {
          questionNo: '19',
          format: 'fib',
          marks: 1,
          stem: 'All his new paintings were (19)____ painted.',
          answer: 'wonderfully',
          solution: {
            method: 'An adverb is needed to describe how the paintings were painted.',
            steps: [
              'The blank describes the verb "painted" (it tells HOW he painted).',
              'A word that describes a verb is an adverb, usually ending in -ly.',
              '"wonderfully" is the adverb that fits: the paintings were wonderfully painted.',
            ],
            tip: 'A word describing an action verb is an adverb. Adjective "wonderful" → adverb "wonderfully".',
          },
        },
        {
          questionNo: '20',
          format: 'fib',
          marks: 1,
          stem: 'However, when no one did so, he was (20)____.',
          answer: 'disappointed',
          solution: {
            method: 'Choose the feeling word that fits Henri\'s reaction.',
            steps: [
              'Henri wished people would love his paintings, but no one did.',
              'When a hope does not come true, a person feels "disappointed".',
              '"disapproving" describes showing you do not approve of others — it does not describe Henri\'s own sad feeling.',
            ],
            tip: 'Be careful with look-alike words: "disappointed" (a feeling) vs "disapproving" (showing dislike of something).',
          },
        },
      ],
    },

    // ---------------------------------------------------------------------
    // SECTION E — Comprehension Open-Ended (10 marks)
    // ---------------------------------------------------------------------
    {
      kind: 'set',
      id: 'mb2023-comprehension',
      topic: 'ComprehensionOE',
      title: 'Comprehension (Open-Ended) — The Not-So-Brave Penguin',
      instructions:
        'Read the passage carefully and annotate. Answer the following questions in complete sentences. Your answers must be based on the passage read. (10 marks)',
      passage:
        'Percy Penguin was not scared of anything. Percy loved jumping into the water. However, Rosy Penguin was not so brave. Rosy preferred staying on land.\n\n' +
        'Rosy was very scared of the dark. Every night, she would imagine all the scary things that might be out there. She also hated to be alone.\n\n' +
        'One morning, the penguins found an iceberg floating in the sea nearby. Rosy did not like how it looked.\n\n' +
        'Percy jumped into the sea and swam over to the iceberg to explore. The iceberg was like a playground! Percy was having a fantastic time until he slid down an ice slide too fast. He crashed into a dark cave and bumped his head.\n\n' +
        '"Percy hasn\'t come back! I don\'t want to be alone!" cried Rosy that evening. "You worry too much," replied the other penguins. Rosy was sure that something was wrong. Then, she did a very brave thing. She swam over to the iceberg.\n\n' +
        'Rosy saw familiar footprints at the top of a big slippery slide. Immediately, she slid down. Her feet hit something soft. It was Percy!\n\n' +
        '"Rosy?" Percy asked with his eyes widened. "Aren\'t you scared of the dark?"\n\n' +
        '"I was but I knew I had to save you!" Rosy answered.\n\n' +
        '"Thank you for rescuing me," Percy said. "You helped me even though you were scared, which makes you the bravest penguin of all!"\n\n' +
        '(Adapted from The Not-So-Brave Penguin by Steve Smallman)',
      marks: 10,
      questions: [
        {
          questionNo: '21',
          format: 'open',
          marks: 2,
          stem: 'What two things were Rosy very scared of?',
          answer: 'Rosy was very scared of (i) the dark and (ii) being alone.',
          solution: {
            method: 'Scan paragraph 2 for the two fears.',
            steps: [
              'Paragraph 2: "Rosy was very scared of the dark." → first fear: the dark.',
              'The same paragraph: "She also hated to be alone." → second fear: being alone.',
              'Write both clearly to earn the 2 marks (1 mark each).',
            ],
            tip: 'When the question says "two things" and gives 2 marks, give exactly two answers, not one combined idea.',
          },
        },
        {
          questionNo: '22',
          format: 'fib',
          marks: 1,
          stem: 'What does "it" in line 8 refer to? The word "it" refers to the ____.',
          answer: 'iceberg',
          solution: {
            method: 'Read the sentence before "it" to find the noun it replaces.',
            steps: [
              'Around line 8: "the penguins found an iceberg... Rosy did not like how it looked."',
              '"it" stands in for the most recent noun that makes sense — the iceberg.',
              'So "it" refers to the iceberg.',
            ],
            tip: 'For "what does it/they refer to" questions, look just BEFORE the pronoun for the noun it replaces.',
          },
        },
        {
          questionNo: '23',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Why did Rosy swim over to the iceberg?',
          options: [
            { label: '1', text: 'She wanted to look for Percy.' },
            { label: '2', text: 'She wanted to explore the iceberg.' },
            { label: '3', text: 'She wanted to show that she was brave.' },
          ],
          answer: '1',
          solution: {
            method: 'Find Rosy\'s reason in paragraph 5.',
            steps: [
              'Percy had not come back and "Rosy was sure that something was wrong".',
              'She then "did a very brave thing. She swam over to the iceberg" — to find Percy.',
              'So she swam over because she wanted to look for Percy (option 1).',
            ],
            tip: 'Read the sentences just before the action; they usually explain WHY the character acted.',
          },
        },
        {
          questionNo: '24',
          format: 'mcq',
          marks: 1,
          stem: "Tick the correct answer. Why did Percy's eyes widen when he saw Rosy?",
          options: [
            { label: '1', text: 'He was angry.' },
            { label: '2', text: 'He was surprised.' },
            { label: '3', text: 'He was frightened.' },
          ],
          answer: '2',
          solution: {
            method: 'Understand the body-language clue "eyes widened".',
            steps: [
              'Widening your eyes is a sign of surprise or shock.',
              'Percy did not expect Rosy — who is scared of the dark — to come and find him.',
              'His question "Aren\'t you scared of the dark?" shows surprise, so the answer is option 2.',
            ],
            tip: 'Learn what body language shows: wide eyes = surprise; frown = anger; trembling = fear.',
          },
        },
        {
          questionNo: '25a',
          format: 'open',
          marks: 1,
          stem: 'State if the sentence is True or False and give a reason: (a) Percy was not a curious penguin.',
          answer:
            'False. Percy swam over to the iceberg to explore it, which shows he was curious.',
          solution: {
            method: 'Compare the statement with what Percy actually did.',
            steps: [
              'Paragraph 4: "Percy... swam over to the iceberg to explore."',
              'Wanting to explore something new shows curiosity, so Percy WAS curious.',
              'Therefore the statement "not a curious penguin" is False; the reason is that he explored the iceberg.',
            ],
            tip: 'For True/False with a reason, the reason must be evidence copied or paraphrased from the passage.',
          },
        },
        {
          questionNo: '25b',
          format: 'open',
          marks: 1,
          stem: 'State if the sentence is True or False and give a reason: (b) Percy injured his feet after he slid down the slide.',
          answer:
            'False. After sliding down too fast, Percy crashed into a dark cave and bumped his head (not his feet).',
          solution: {
            method: 'Check exactly which body part was hurt.',
            steps: [
              'Paragraph 4: "he slid down an ice slide too fast. He crashed into a dark cave and bumped his head."',
              'It was his HEAD that was hurt, not his feet.',
              'So the statement is False; the reason is that he bumped his head.',
            ],
            tip: 'Watch for small wrong details (feet vs head). Re-read the exact line before deciding True or False.',
          },
        },
        {
          questionNo: '25c',
          format: 'open',
          marks: 1,
          stem: 'State if the sentence is True or False and give a reason: (c) Rosy was sure that Percy was at the bottom of the slide.',
          answer:
            'False. The passage says Rosy was sure that something was wrong; she only found Percy at the bottom after seeing his familiar footprints at the top of the slide and sliding down.',
          solution: {
            method: 'Separate what Rosy was sure of from what she discovered.',
            steps: [
              'Paragraph 5: "Rosy was sure that something was wrong" — she was sure something was wrong, not that Percy was at the bottom of the slide.',
              'Paragraph 6: she saw "familiar footprints at the top" and slid down, then "It was Percy!" — she discovered him there afterwards.',
              'So she was not sure beforehand that Percy was at the bottom of the slide; the statement is False.',
            ],
            tip: 'Be precise about what a character KNOWS versus what they later FIND OUT.',
          },
          parentVerify: true,
        },
        {
          questionNo: '26',
          format: 'open',
          marks: 1,
          stem: 'Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story: ( ) Percy found himself in a dark cave. ( ) Percy played on an ice slide. ( ) Percy swam in the sea to explore.',
          answer:
            'Percy swam in the sea to explore = 1; Percy played on an ice slide = 2; Percy found himself in a dark cave = 3.',
          solution: {
            method: 'Follow the order of events in paragraph 4.',
            steps: [
              'First: "Percy jumped into the sea and swam over to the iceberg to explore." → 1',
              'Next: he played on the iceberg and "slid down an ice slide". → 2',
              'Last: he "crashed into a dark cave". → 3',
            ],
            tip: 'For sequencing, find the events in the passage and number them in the order they appear.',
          },
        },
        {
          questionNo: '27',
          format: 'mcq',
          marks: 1,
          stem: 'Tick the correct answer. Rosy was ____ because she went to look for Percy.',
          options: [
            { label: '1', text: 'smart' },
            { label: '2', text: 'caring' },
            { label: '3', text: 'generous' },
          ],
          answer: '2',
          solution: {
            method: 'Choose the character trait shown by going to save a friend.',
            steps: [
              'Rosy went to look for Percy because she worried about him and wanted to help.',
              'Caring about a friend enough to rescue him shows she was "caring".',
              '"smart" is about cleverness and "generous" is about sharing/giving — neither matches saving a friend.',
            ],
            tip: 'Match the action to the trait: helping a friend = caring/kind; sharing things = generous; solving problems = smart.',
          },
        },
      ],
    },
  ],
};

export default wa1_maha_bodhi_english_2023;
