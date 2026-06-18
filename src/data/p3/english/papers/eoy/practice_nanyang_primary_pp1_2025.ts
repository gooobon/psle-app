// ============================================================
// NANYANG PRIMARY SCHOOL
// PRACTICE PAPER 1 — ENGLISH LANGUAGE
// PRIMARY THREE — LANGUAGE USE & COMPREHENSION
// Duration: 1 hour 15 minutes  |  Total: 50 marks
// ============================================================
// Sections:
//   (A) Grammar MCQ         Q1–8    (8 marks)
//   (B) Vocabulary MCQ      Q9–14   (6 marks)
//   (C) Grammar Cloze       Q15–22  (8 marks)  — 4 letter + 4 bracket
//   (D) Editing for Spelling Q23–26 (4 marks)
//   (E) Sentence Synthesis  Q27–30  (8 marks)
//   (F) Comprehension 1     Q31–37  (8 marks)  — Mae & Rugby
//   (G) Comprehension 2     Q38–43  (8 marks)  — Princess Sophia
// ============================================================

import { QuestionSet } from '../../types';

const practiceNanyangPrimaryPP1_2025: QuestionSet = {
  id: 'practice_nanyang_primary_pp1_2025',
  school: 'Nanyang Primary School',
  level: 'P3',
  year: 2025,
  exam: 'Practice Paper 1',
  paper: 'Paper 2 (Language Use & Comprehension)',
  subject: 'English',
  totalMarks: 50,
  duration: 75,

  questions: [

    // =========================================================
    // SECTION A: GRAMMAR MCQ (Q1–8) — 8 x 1 mark
    // =========================================================

    {
      id: 'nypp1_q01',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 1,
      marks: 1,
      question: '"Don\'t play with the sharp knife. You might hurt ________ with it," Mother warned her two boys.',
      options: ['itself', 'himself', 'yourselves', 'themselves'],
      answer: 3,
      solution: {
        method: 'Reflexive pronoun — second person plural command',
        steps: [
          'Mother is speaking TO her two boys (second person, plural).',
          '"You might hurt ___ with it" → the subject "you" (plural) is also the object.',
          'Second person plural reflexive = "yourselves".',
          '"Itself" = for things; "himself" = for a single male; "themselves" = for third person plural.',
        ],
        tip: 'In commands/warnings addressed to multiple people, "you" (plural) → "yourselves". "Behave yourselves!", "Take care of yourselves."',
      },
    },

    {
      id: 'nypp1_q02',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 2,
      marks: 1,
      question: 'Jenny ________ late for school yesterday.',
      options: ['is', 'are', 'was', 'were'],
      answer: 3,
      solution: {
        method: 'Past tense — singular subject',
        steps: [
          '"Yesterday" → past tense.',
          '"Jenny" is a singular subject (third person, singular, female).',
          'Singular past tense = "was".',
          '"Is/are" are present; "were" is past plural.',
        ],
        tip: '"Jenny was late" = singular past. "The children were late" = plural past.',
      },
    },

    {
      id: 'nypp1_q03',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 3,
      marks: 1,
      question: 'The children ________ six years old and they enjoy playing with toys.',
      options: ['is', 'are', 'was', 'were'],
      answer: 2,
      solution: {
        method: 'Subject-verb agreement — plural subject, present tense',
        steps: [
          '"The children" = plural subject.',
          '"Enjoy playing" (present) and the sentence reads as a present fact.',
          'Plural + present = "are".',
          '"Is/was" are singular; "were" is past plural.',
        ],
        tip: '"The children are six years old" — plural subject + present tense = "are".',
      },
    },

    {
      id: 'nypp1_q04',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 4,
      marks: 1,
      question: '"David ________ on stage now," Mrs Lee said.',
      options: ['performs', 'performed', 'is performing', 'has performed'],
      answer: 3,
      solution: {
        method: 'Present continuous — action happening right now',
        steps: [
          '"Now" = the action is happening at this very moment.',
          'Present continuous = is/am/are + verb-ing → "is performing".',
          '"Performs" = habitual present (does it regularly); "performed" = past; "has performed" = present perfect (recently completed).',
          '"Now" is the key word for present continuous.',
        ],
        tip: '"Now" signals present continuous: is/am/are + -ing. "David is performing on stage now."',
      },
    },

    {
      id: 'nypp1_q05',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 5,
      marks: 1,
      question: 'Last Sunday, Ming Hui ________ up early for a jog at the park.',
      options: ['wake', 'woke', 'wakes', 'waking'],
      answer: 2,
      solution: {
        method: 'Simple past — specific completed past action',
        steps: [
          '"Last Sunday" = a completed past event → simple past.',
          'Simple past of "wake" = "woke" (irregular verb).',
          '"Wake/wakes" are present; "waking" needs an auxiliary.',
        ],
        tip: 'Irregular verb: wake → woke (past). "Last Sunday" always → simple past.',
      },
    },

    {
      id: 'nypp1_q06',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 6,
      marks: 1,
      question: 'When the boys ________ dinner, the door bell rang.',
      options: ['have', 'will have', 'have had', 'were having'],
      answer: 4,
      solution: {
        method: 'Past continuous — ongoing action interrupted by sudden event',
        steps: [
          '"The door bell rang" = a sudden, completed past event.',
          '"When" introduces the background ongoing action.',
          'Ongoing background action in the past = past continuous: "were having".',
          '"Have/will have" are present/future; "have had" is present perfect.',
        ],
        tip: 'Background ongoing past action = past continuous (were having). Sudden interruption = simple past (rang).',
      },
    },

    {
      id: 'nypp1_q07',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 7,
      marks: 1,
      question: '________ is my best friend waving at us over there.',
      options: ['This', 'That', 'These', 'Those'],
      answer: 2,
      solution: {
        method: 'Demonstrative pronoun — singular, far distance',
        steps: [
          '"Over there" = far away from the speaker.',
          '"My best friend" = singular person.',
          'Singular + far = "That".',
          '"This" = singular near; "These/Those" = plural.',
        ],
        tip: 'Near singular = this; Far singular = that; Near plural = these; Far plural = those. "Over there" → far → "That".',
      },
    },

    {
      id: 'nypp1_q08',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 8,
      marks: 1,
      question: 'She has not eaten ________ food since this morning.',
      options: ['any', 'a few', 'many', 'a little'],
      answer: 1,
      solution: {
        method: 'Quantifier — negative statement with uncountable noun',
        steps: [
          '"Has not eaten" = negative context.',
          '"Food" = uncountable noun.',
          '"Any" is used in negative statements and questions with both countable and uncountable nouns.',
          '"A few/many" are for countable nouns; "a little" is for positive statements (a small amount).',
          '"Has not eaten any food" = eaten nothing.',
        ],
        tip: '"Any" is used in negative sentences: "She has not eaten any food." "There isn\'t any water."',
      },
    },

    // =========================================================
    // SECTION B: VOCABULARY MCQ (Q9–14) — 6 x 1 mark
    // =========================================================

    {
      id: 'nypp1_q09',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 9,
      marks: 1,
      question: 'Ahmad is a ________ boy who never fails to look left and right before he crosses the road.',
      options: ['fearless', 'cautious', 'righteous', 'menacing'],
      answer: 2,
      solution: {
        method: 'Vocabulary — character trait shown by safe behaviour',
        steps: [
          '"Never fails to look left and right before crossing" = takes care to be safe.',
          '"Cautious" = careful to avoid danger or problems.',
          '"Fearless" = not afraid (looking before crossing is not about being brave); "righteous" = morally right; "menacing" = threatening/dangerous (opposite of the described behaviour).',
        ],
        tip: '"Cautious" = taking care to be safe by thinking before acting. Looking before crossing = a cautious action.',
      },
    },

    {
      id: 'nypp1_q10',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 10,
      marks: 1,
      question: 'My mother ________ her ankle and immediately felt a sharp pain.',
      options: ['bent', 'turned', 'tripped', 'sprained'],
      answer: 4,
      solution: {
        method: 'Vocabulary — specific ankle injury',
        steps: [
          'Feeling a "sharp pain" in the ankle after an incident = a specific type of injury.',
          '"Sprained" = twisted a joint (ankle, wrist) causing stretched or torn ligaments → causes sharp pain.',
          '"Bent" = just flexed (not necessarily painful); "turned" = rotated (not injury-specific); "tripped" = stumbled (is about falling, not ankle injury).',
        ],
        tip: '"Sprain" an ankle = twist it causing ligament damage and sharp pain. The most specific and accurate medical term here.',
      },
    },

    {
      id: 'nypp1_q11',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 11,
      marks: 1,
      question: '"Oh no, I think I\'m having a stomachache after eating so much chilli," Tom ________ weakly in pain.',
      options: ['grinned', 'chuckled', 'screamed', 'whimpered'],
      answer: 4,
      solution: {
        method: 'Vocabulary — manner of speaking when in pain',
        steps: [
          '"Weakly in pain" = Tom is suffering and speaks without strength.',
          '"Whimpered" = made a low, feeble sound of pain or distress → matches "weakly in pain".',
          '"Grinned" = smiled broadly (not in pain); "chuckled" = laughed quietly (not in pain); "screamed" = very loud cry (not weak).',
          '"Weakly" is the key adverb — whimpering is weak, not loud.',
        ],
        tip: '"Whimper" = a soft, weak cry of pain. "Scream" is too loud. "Weakly in pain" → whimpered.',
      },
    },

    {
      id: 'nypp1_q12',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 12,
      marks: 1,
      question: 'The ________ publishes his comic strips in the newspaper weekly.',
      options: ['poet', 'chief', 'editor', 'cartoonist'],
      answer: 4,
      solution: {
        method: 'Vocabulary — person who creates comic strips',
        steps: [
          '"Comic strips" = sequential illustrated story panels.',
          '"Cartoonist" = an artist who draws comic strips/cartoons.',
          '"Poet" = writes poems; "chief" = a leader; "editor" = manages/reviews content (doesn\'t create comic strips).',
        ],
        tip: 'A "cartoonist" draws comic strips. A "poet" writes poetry. A "cartoonist publishes comic strips" is the natural collocation.',
      },
    },

    {
      id: 'nypp1_q13',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 13,
      marks: 1,
      question: 'The ________ snake tried to trick the mouse into its home to eat it.',
      options: ['sly', 'timid', 'attentive', 'hospitable'],
      answer: 1,
      solution: {
        method: 'Vocabulary — character trait of a deceiving animal',
        steps: [
          '"Tried to trick the mouse" = used cunning/deception.',
          '"Sly" = cunning, clever in a deceitful way → perfectly describes a snake that tricks.',
          '"Timid" = fearful and shy (opposite of what is described); "attentive" = paying close attention; "hospitable" = welcoming (ironic misdirection here).',
        ],
        tip: '"Sly" = crafty and deceitful. A trickster who lures others into danger is "sly".',
      },
    },

    {
      id: 'nypp1_q14',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 14,
      marks: 1,
      question: 'May I have the ________ of inviting you to my birthday party?',
      options: ['pleasure', 'enjoyment', 'compliment', 'appreciation'],
      answer: 1,
      solution: {
        method: 'Fixed expression — formal invitation phrase',
        steps: [
          '"May I have the ________ of ..." is a polite, formal fixed expression.',
          '"The pleasure of inviting you" = a standard polite phrase meaning "I would be honoured to invite you".',
          '"The pleasure is mine" / "May I have the pleasure of your company" = classic formal expressions.',
          '"Enjoyment/compliment/appreciation" do not form this fixed expression.',
        ],
        tip: '"May I have the pleasure of..." = a formal, polite way to invite or request. "Pleasure" is the correct word in this fixed phrase.',
      },
    },

    // =========================================================
    // SECTION C: GRAMMAR CLOZE (Q15–22) — 8 marks
    // Part 1: Q15–18 — letter-choice (4 marks)
    // Part 2: Q19–22 — bracket-choice (4 marks)
    // =========================================================

    // --- Q15–18: John and the Badminton Team (pronouns/agreement) ---
    // Word bank: he(A) I(B) it(C) they(D) we(E) you(F)

    {
      id: 'nypp1_q15',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze1',
      setTitle: 'Grammar Cloze 1 — Badminton Team (Pronouns)',
      passageContext: `My brother, John, and I enjoy playing badminton. (15)________ belong to the school team and play in school together twice weekly. As John is the stronger player, (16)________ uses a better racket. The racket was a prize that he had won last year. (17)________ do not mind using an older racket as (18)________ is still working very well. I hope I can excel in this sport like John.`,
      questionNumber: 15,
      marks: 1,
      question: '(15)________ belong to the school team and play in school together twice weekly.',
      wordBank: { A: 'he', B: 'I', C: 'it', D: 'they', E: 'we', F: 'you' },
      answer: 'E',
      answerWord: 'We',
      solution: {
        method: 'Personal pronoun — two people together',
        steps: [
          'The narrator "My brother, John, and I" = two people.',
          '"We belong to the school team" → the narrator and John together.',
          '"We" = first person plural pronoun = John and I.',
          '"They" (D) would exclude the narrator; "he" (A) = only John.',
        ],
        tip: '"My brother and I" = "we" (first person plural). "We belong to the team" = both of them.',
      },
    },

    {
      id: 'nypp1_q16',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze1',
      questionNumber: 16,
      marks: 1,
      question: 'As John is the stronger player, (16)________ uses a better racket.',
      answer: 'A',
      answerWord: 'he',
      solution: {
        method: 'Personal pronoun — referring to John',
        steps: [
          '"As John is the stronger player" → the subject of the next clause refers back to John.',
          '"He uses a better racket" — "he" = John (third person, singular, male).',
          '"I" (B) is the narrator; "we" (E) would mean both.',
        ],
        tip: 'Identify who is described (John) and use the matching pronoun: he (singular male).',
      },
    },

    {
      id: 'nypp1_q17',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze1',
      questionNumber: 17,
      marks: 1,
      question: '(17)________ do not mind using an older racket...',
      answer: 'B',
      answerWord: 'I',
      solution: {
        method: 'Personal pronoun — the narrator speaking about themselves',
        steps: [
          'The narrator (first person, singular) is speaking about their own attitude.',
          '"I do not mind using an older racket" = the narrator does not mind.',
          '"We" (E) would include John, but John has the BETTER racket, so the narrator alone uses the older one.',
        ],
        tip: '"I do not mind" = the narrator alone. The narrator uses the older racket, not both of them.',
      },
    },

    {
      id: 'nypp1_q18',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze1',
      questionNumber: 18,
      marks: 1,
      question: '...as (18)________ is still working very well.',
      answer: 'C',
      answerWord: 'it',
      solution: {
        method: 'Personal pronoun — referring to the older racket',
        steps: [
          '"It is still working very well" — refers back to "an older racket".',
          '"It" = third person singular pronoun for things/objects.',
          '"The racket" = a thing, not a person → use "it".',
        ],
        tip: '"It" replaces singular objects/things. The racket = "it". "It is still working very well."',
      },
    },

    // --- Q19–22: Pablo Picasso biography (bracket choices) ---

    {
      id: 'nypp1_q19',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze2',
      setTitle: 'Grammar Cloze 2 — Pablo Picasso (S-V Agreement)',
      passageContext: `Pablo Picasso was born in Spain. As a child, Picasso had little interest in school, but he (19) [ was / were ] a very talented artist. He lost a close friend when he was twenty years old and became very sad. His paintings then (20) [ was / were ] mainly painted in blue to show his sadness. Some of his paintings from that period (21) [ include / Includes ] Poor People on the Seashore and The Old Guitarist. His most expensive art piece (22) [ has / have ] been sold for millions of dollars. He remains a well-known artist till this day.`,
      questionNumber: 19,
      marks: 1,
      question: 'he (19) [ was / were ] a very talented artist.',
      answer: 'Was',
      solution: {
        method: 'Past tense — singular subject',
        steps: [
          '"He" = singular subject (third person singular).',
          'Past tense context → "was" (singular past).',
          '"Were" is used with plural subjects or "you" (second person).',
        ],
        tip: '"He/she/it WAS". "They/we WERE". Singular past → was.',
      },
    },

    {
      id: 'nypp1_q20',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze2',
      questionNumber: 20,
      marks: 1,
      question: 'His paintings then (20) [ was / were ] mainly painted in blue.',
      answer: 'Were',
      solution: {
        method: 'Past tense — plural subject',
        steps: [
          '"His paintings" = plural subject.',
          'Past tense → "were" (plural past).',
          '"Was" is for singular subjects.',
        ],
        tip: '"Paintings" (plural) → "were". "The painting WAS blue." vs "The paintings WERE blue."',
      },
    },

    {
      id: 'nypp1_q21',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze2',
      questionNumber: 21,
      marks: 1,
      question: 'Some of his paintings from that period (21) [ include / Includes ]...',
      answer: 'Include',
      solution: {
        method: 'Subject-verb agreement — "some of" with plural noun',
        steps: [
          '"Some of his paintings" → the subject is "some paintings" = plural.',
          'Plural + present = base form: "include".',
          '"Includes" is for singular subjects (he/she/it).',
          'The head noun is "paintings" (plural) → "include".',
        ],
        tip: 'With "some of + plural noun", the verb agrees with the plural noun: "Some paintings include..."',
      },
    },

    {
      id: 'nypp1_q22',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'nypp1_gramcloze2',
      questionNumber: 22,
      marks: 1,
      question: 'His most expensive art piece (22) [ has / have ] been sold for millions of dollars.',
      answer: 'Has',
      solution: {
        method: 'Present perfect — singular subject',
        steps: [
          '"His most expensive art piece" = singular subject.',
          'Present perfect passive: "has been sold".',
          'Singular subject → "has" (not "have").',
          '"Have" is used with plural subjects, or I/you/we/they.',
        ],
        tip: 'Present perfect: singular → HAS been; plural → HAVE been. "The piece HAS been sold."',
      },
    },

    // =========================================================
    // SECTION D: EDITING FOR SPELLING (Q23–26) — 4 x 1 mark
    // Passage: Ramli and the Captain's Ball (Mini-Olympic Games)
    // =========================================================

    {
      id: 'nypp1_q23',
      type: 'B',
      topic: 'Editing',
      setId: 'nypp1_editing',
      setTitle: "Editing for Spelling — Ramli's Captain's Ball",
      passageContext: `Ramli signed up for the Captain's Ball match in the annual Mini-Olympic Games. He was woreed that he could not throw the ball far enough, so he sought help from Bala. Bala demostreted the right way to throw a ball. He ran a few steps, gripped the ball thightly and threw the ball. The ball soared upward in a huge arc. Ramli watched in excitmen. "Wow, that's amazing! Please teach me how to do that!" he exclaimed.`,
      questionNumber: 23,
      marks: 1,
      question: 'He was woreed that he could not throw the ball far enough. (Underlined: woreed)',
      answer: 'worried',
      errorType: 'spelling',
      solution: {
        method: 'Spelling correction',
        steps: [
          '"Woreed" is a spelling error.',
          'Correct: "worried" = feeling anxious or concerned.',
          'Spelling: w-o-r-r-i-e-d. Note the double "r" and "-ied" ending.',
        ],
        tip: '"Worried" = feeling anxiety/concern. Spelling trap: double "r" — wor-r-ied.',
      },
    },

    {
      id: 'nypp1_q24',
      type: 'B',
      topic: 'Editing',
      setId: 'nypp1_editing',
      questionNumber: 24,
      marks: 1,
      question: 'Bala demostreted the right way to throw a ball. (Underlined: demostreted)',
      answer: 'demonstrated',
      errorType: 'spelling',
      solution: {
        method: 'Spelling correction',
        steps: [
          '"Demostreted" is misspelled.',
          'Correct: "demonstrated" = showed how to do something by example.',
          'Spelling: d-e-m-o-n-s-t-r-a-t-e-d. Note the "n" after "demo" and "-ated" ending.',
        ],
        tip: '"Demonstrate" → past tense "demonstrated". Remember: demo-N-strate (the "n" is silent in speech but present in writing).',
      },
    },

    {
      id: 'nypp1_q25',
      type: 'B',
      topic: 'Editing',
      setId: 'nypp1_editing',
      questionNumber: 25,
      marks: 1,
      question: 'He ran a few steps, gripped the ball thightly and threw the ball. (Underlined: thightly)',
      answer: 'tightly',
      errorType: 'spelling',
      solution: {
        method: 'Spelling correction',
        steps: [
          '"Thightly" is a spelling error.',
          'Correct: "tightly" = in a firm, secure manner.',
          'Spelling: t-i-g-h-t-l-y. The root word is "tight" + "-ly". No "h" at the beginning.',
        ],
        tip: '"Tightly" comes from "tight" + -ly. Common error: adding an extra "h" at the start. t-i-g-h-t-l-y.',
      },
    },

    {
      id: 'nypp1_q26',
      type: 'B',
      topic: 'Editing',
      setId: 'nypp1_editing',
      questionNumber: 26,
      marks: 1,
      question: 'Ramli watched in excitmen. (Underlined: excitmen)',
      answer: 'excitement',
      errorType: 'spelling',
      solution: {
        method: 'Spelling correction',
        steps: [
          '"Excitmen" is missing letters.',
          'Correct: "excitement" = a feeling of great enthusiasm and eagerness.',
          'Spelling: e-x-c-i-t-e-m-e-n-t. The full word is "excite" + "-ment".',
        ],
        tip: '"Excitement" = "excite" + "-ment". Always include the silent "e": excite-ment, not excitment.',
      },
    },

    // =========================================================
    // SECTION E: SENTENCE SYNTHESIS (Q27–30) — 4 x 2 marks
    // =========================================================

    {
      id: 'nypp1_q27',
      type: 'A',
      topic: 'SentenceCombining',
      questionNumber: 27,
      marks: 2,
      question: 'It was getting dark. The people at the beach started going home.\nRewrite as one sentence using "because".',
      answer: 'The people at the beach started going home because it was getting dark.',
      solution: {
        method: 'Sentence synthesis — cause and effect with "because"',
        steps: [
          'Cause: it was getting dark.',
          'Effect: people started going home.',
          '"Because" introduces the cause: "[effect] because [cause]".',
          'Answer: "The people at the beach started going home because it was getting dark."',
        ],
        tip: '"Because" joins cause and effect. The effect comes first, then "because" + the cause.',
      },
    },

    {
      id: 'nypp1_q28',
      type: 'A',
      topic: 'SentenceCombining',
      questionNumber: 28,
      marks: 2,
      question: 'Lee Ting was in pain. Lee Ting held back her tears.\nRewrite as one sentence using "but".',
      answer: 'Lee Ting was in pain, but she held back her tears.',
      solution: {
        method: 'Sentence synthesis — contrast with "but"',
        steps: [
          'The two sentences show a contrast: she was in pain (expected to cry) but she held back tears.',
          '"But" introduces the contrasting clause.',
          'Replace repeated "Lee Ting" with "she" in the second clause.',
          'Answer: "Lee Ting was in pain, but she held back her tears."',
        ],
        tip: '"But" shows contrast. Use a pronoun to replace the repeated subject in the second clause.',
      },
    },

    {
      id: 'nypp1_q29',
      type: 'A',
      topic: 'SentenceCombining',
      questionNumber: 29,
      marks: 2,
      question: 'Roy measured the present. Then he cut the ribbon.\nRewrite as one sentence using "before".',
      answer: 'Before Roy cut the ribbon, he measured the present.',
      solution: {
        method: 'Sentence synthesis — sequence with "before"',
        steps: [
          'Sequence: (1) Roy measured → (2) Roy cut the ribbon.',
          '"Before" = indicating the first action happened prior to the second.',
          '"Before Roy cut the ribbon, he measured the present."',
          'Note: "Before" introduces the LATER action first: "Before [later], [earlier]."',
        ],
        tip: '"Before [B], [A]" = A happened first, then B. "Before he cut the ribbon, he measured the present."',
      },
    },

    {
      id: 'nypp1_q30',
      type: 'A',
      topic: 'SentenceCombining',
      questionNumber: 30,
      marks: 2,
      question: 'Linda squeaked in fright. Linda saw a lizard in her bag.\nRewrite as one sentence using "when".',
      answer: 'Linda squeaked in fright when she saw a lizard in her bag.',
      solution: {
        method: 'Sentence synthesis — time/cause with "when"',
        steps: [
          'The fright happened AT THE MOMENT she saw the lizard.',
          '"When" connects two simultaneous/causal events.',
          'Replace repeated "Linda" with "she" in the second clause.',
          'Answer: "Linda squeaked in fright when she saw a lizard in her bag."',
        ],
        tip: '"When" connects two events at the same time. Replace the repeated name with a pronoun in the second clause.',
      },
    },

    // =========================================================
    // SECTION F: COMPREHENSION 1 (Q31–37) — 8 marks
    // Passage: Mae and Rugby (adapted from NY Times, 20 Jan 2020)
    // =========================================================

    {
      id: 'nypp1_q31',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      setTitle: 'Comprehension 1 — Mae and Rugby',
      passageContext: `Mae sprinted out of the left field and slammed into Jon before he could run away. Jon fell and Mae piled on top of him. It was a spectacular tackle for a rugby game. I cheered.\n\nIn the midst of the struggle for the rugby ball, another player attacked Mae and she fell. The cheer was stuck in my throat. After a few moments, Mae got up and continued the game. I heaved a sigh of relief.\n\nWhen Mae, my 13-year-old daughter, first asked if she could play rugby, I was terrified. Personally, I did not like the sport because the game was violent and it had the highest injury rate of all school sports. That was why I told her she could not do it.\n\nHowever, Mae wanted to play rugby so much that she kept asking for my permission whenever I said no. That needed a huge amount of courage. Mae was not fragile. She was athletic and tall for her age at 170 centimetres. She told me that her height was an advantage in the sport. If she were to wait till she turned fifteen, the boys would tower over her and be stronger than her. She argued that it might be the only chance for her to do well in this sport.\n\nTouched by her determination to do something that was difficult, I gave in eventually. After watching all the matches she had played in, I had to admit that it was a good experience for her. I just hoped that my presence at her games would encourage her and let her feel supported. I was proud of her for not giving up the sport that she loved despite all the challenges.\n\nSource: The New York Times 20 January 2020`,
      questionNumber: 31,
      marks: 1,
      question: 'Which sentence in paragraph 2 tells us that the writer was happy at first but became worried?',
      answer: 'The cheer was stuck in my throat.',
      solution: {
        method: 'Literal comprehension — identify specific sentence showing shift in emotion',
        steps: [
          'Paragraph 2: "The cheer was stuck in my throat."',
          '"The cheer was stuck in my throat" = the writer started to cheer (was happy) but stopped mid-cheer when Mae fell (became worried).',
          'This single sentence captures both emotions: starting to cheer (happy) → stopping the cheer (worried).',
        ],
        tip: '"The cheer was stuck in my throat" = happiness turned to worry. Quote this exact sentence.',
      },
    },

    {
      id: 'nypp1_q32',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      questionNumber: 32,
      marks: 1,
      question: 'The writer was excited when her daughter wanted to play rugby. True or False?',
      answer: 'False',
      solution: {
        method: 'True/False — writer\'s initial reaction',
        steps: [
          'Paragraph 3: "I was terrified." and "I did not like the sport because the game was violent."',
          'The writer was TERRIFIED (frightened), NOT excited.',
          'False.',
        ],
        tip: '"Terrified" = very frightened. The writer was terrified, NOT excited. False.',
      },
    },

    {
      id: 'nypp1_q33',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      questionNumber: 33,
      marks: 1,
      question: 'Mae believed that she would be taller than many boys at fifteen years old. True or False?',
      answer: 'False',
      solution: {
        method: 'True/False — Mae\'s argument about age and height',
        steps: [
          'Mae\'s argument: "If she were to wait till she turned fifteen, the boys would tower over her and be stronger than her."',
          'Mae believed that by fifteen, the BOYS would be taller than HER — not the other way round.',
          '"Boys would tower over her" = boys would be taller → False.',
        ],
        tip: 'Mae feared that boys would tower over HER at 15, not that she would be taller than boys. False.',
      },
    },

    {
      id: 'nypp1_q34',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      questionNumber: 34,
      marks: 1,
      question: 'Which word has the same meaning as "weak"? Circle either (A) or (B).',
      questionType: 'circleAB',
      passageExcerpt: 'Mae was not fragile (A). She was athletic (B) and tall for her age at 170 centimetres.',
      options: ['fragile (A)', 'athletic (B)'],
      answer: 'A',
      answerWord: 'fragile',
      solution: {
        method: 'Vocabulary — synonym for "weak"',
        steps: [
          '"Fragile" = easily broken or damaged; delicate and weak.',
          '"Fragile" is a synonym for "weak" in this context.',
          '"Athletic" = physically fit and strong → antonym of weak.',
          '"Mae was not fragile" = Mae was not weak.',
        ],
        tip: '"Fragile" = easily broken/weak. "Athletic" = strong and fit. Fragile = weak.',
      },
    },

    {
      id: 'nypp1_q35',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      questionNumber: 35,
      marks: 1,
      question: 'Write 1, 2 and 3 in the blanks to show what happened first, next and last.',
      questionType: 'sequencing',
      items: [
        'Mae played in the rugby game.',
        'Mae persuaded the writer to let her play rugby.',
        'The writer realised that playing rugby was a good experience for Mae.',
      ],
      answer: {
        'Mae played in the rugby game.': 2,
        'Mae persuaded the writer to let her play rugby.': 1,
        'The writer realised that playing rugby was a good experience for Mae.': 3,
      },
      solution: {
        method: 'Sequencing — narrative order',
        steps: [
          'Event 1 (first): Mae persuaded the writer (paragraphs 3-4: she kept asking permission).',
          'Event 2 (next): Mae played in the rugby game (paragraph 5: "After watching all the matches she had played in").',
          'Event 3 (last): The writer realised it was good (paragraph 5: "I had to admit that it was a good experience").',
        ],
        tip: 'Follow the story: persuade (1) → play (2) → writer realises (3). The realisation comes last.',
      },
    },

    {
      id: 'nypp1_q36',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      questionNumber: 36,
      marks: 1,
      question: 'Tick one word that best describes Mae in the last paragraph.',
      questionType: 'tick',
      options: ['resilient', 'stubborn', 'unreasonable'],
      answer: 'resilient',
      solution: {
        method: 'Character inference — last paragraph',
        steps: [
          'Last paragraph: Mae did not give up the sport she loved despite all the challenges.',
          '"Resilient" = able to recover quickly from difficulties; not giving up despite challenges.',
          '"Stubborn" = refusing to change/move (negative connotation — implies irrationality); "unreasonable" = not making sense.',
          'Mae\'s persistence through challenges = resilience (positive).',
        ],
        tip: '"Resilient" = bouncing back from difficulties, not giving up. Mae faced challenges but persisted → resilient.',
      },
    },

    {
      id: 'nypp1_q37',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp1',
      questionNumber: 37,
      marks: 2,
      question: 'State two reasons to explain why the writer attended her daughter\'s rugby games.',
      answer: [
        '(i) To encourage her.',
        '(ii) To let her feel supported.',
      ],
      solution: {
        method: 'Literal comprehension — two specific reasons',
        steps: [
          'Last paragraph: "I just hoped that my presence at her games would encourage her and let her feel supported."',
          'Reason 1: to encourage her.',
          'Reason 2: to let her feel supported.',
          'Quote or closely paraphrase each reason for full marks.',
        ],
        tip: 'Both reasons are in the same sentence. Quote them directly: "encourage her" and "let her feel supported".',
      },
    },

    // =========================================================
    // SECTION G: COMPREHENSION 2 (Q38–43) — 8 marks
    // Passage: Princess Sophia (adapted from True Heroes by Sharlee Glenn)
    // =========================================================

    {
      id: 'nypp1_q38',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp2',
      setTitle: 'Comprehension 2 — Princess Sophia',
      passageContext: `There was once a kingdom inhabited only by birds. It was a peaceful kingdom ruled by a king and a queen, both nightingales, who were much loved for their kindness and compassion. They were happy but not perfectly so. Something was missing in their lives.\n\nOne spring morning, the queen laid a smooth and glossy egg. The couple were overjoyed and felt their lives were finally complete. The king hovered around as the queen tenderly cared for the egg and kept it warm. The egg hatched and a beautiful baby was born. She was named Sophia.\n\nTo the adoring parents, Sophia was perfect in every way. However, a wise old bird pulled them aside and told them, "Something is not right. Her left wing is withered. She could never fly. We must bind her withered left wing tightly to her body to protect it!"\n\nThe king and the queen were alarmed by the old bird's observation and decided to bind Sophia's wing. However, the binding pained the little bird. The queen witnessed it and could not bear to hear her cries, so she eventually unwrapped the wing.\n\nAs Princess Sophia grew, she became kind and loving, just like her parents. Sad and broken birds of all kinds came to her to be comforted by her sweet embrace. Although she had only one good wing, she never failed to wrap both — one frail, one strong — around her visiting friends to make them feel better.\n\nDay by day, Princess Sophia noticed her left wing getting stronger. One day, she fluttered with all her might. She felt herself lift a few centimetres off the ground. Suddenly, she felt a surge of warmth flow through her left wing. She slowly opened both wings to their full expanse and soared away into the blue sky.\n\nSource: True Heroes by Sharlee Glenn`,
      questionNumber: 38,
      marks: 1,
      question: 'What was the "something" that was missing in the king\'s and queen\'s lives in paragraph 1?',
      answer: 'It was a baby bird. / A child. / They had no child.',
      solution: {
        method: 'Inference — what the "something" refers to',
        steps: [
          'Paragraph 1: "Something was missing in their lives."',
          'Paragraph 2: "The queen laid an egg... they felt their lives were finally complete."',
          'The egg/baby completing their lives → the missing thing was a child (baby bird).',
          'Answer: "It was a baby bird" or "They had no child."',
        ],
        tip: 'The "something missing" is revealed in paragraph 2: a baby. When Sophia hatched, they felt "complete".',
      },
    },

    {
      id: 'nypp1_q39',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp2',
      questionNumber: 39,
      marks: 1,
      question: 'Which two-word phrase in paragraph 2 shows that the king waited nearby when the queen was hatching the egg?',
      answer: 'hovered around',
      solution: {
        method: 'Vocabulary — identifying a two-word phrase',
        steps: [
          'Paragraph 2: "The king hovered around as the queen tenderly cared for the egg and kept it warm."',
          '"Hovered around" = stayed close and waited nearby.',
          'Hovering = staying in one place in the air / staying close by.',
        ],
        tip: '"Hovered around" = stayed close nearby. Birds hover in the air; figuratively, hovering around = staying close and watching.',
      },
    },

    {
      id: 'nypp1_q40',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp2',
      questionNumber: 40,
      marks: 2,
      question: 'According to the wise old bird, what was wrong with Sophia?',
      answer: 'Her left wing was withered and she could never fly.',
      solution: {
        method: 'Literal comprehension — wise bird\'s observation',
        steps: [
          'Paragraph 3: "Her left wing is withered. She could never fly."',
          'Two problems stated: (1) left wing is withered, (2) she could never fly.',
          'A full answer includes both pieces of information for 2 marks.',
        ],
        tip: 'Quote both pieces from paragraph 3: withered left wing + could never fly. Both needed for full marks.',
      },
    },

    {
      id: 'nypp1_q41',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp2',
      questionNumber: 41,
      marks: 1,
      question: 'Tick the adjective that best describes how the king and the queen felt after they heard what the wise old bird said.',
      questionType: 'tick',
      options: ['sad', 'nervous', 'shocked'],
      answer: 'shocked',
      solution: {
        method: 'Vocabulary inference — emotional reaction to unexpected news',
        steps: [
          'Paragraph 4: "The king and the queen were alarmed by the old bird\'s observation."',
          '"Alarmed" = suddenly worried and frightened by unexpected news = shocked.',
          '"Shocked" = stunned by an unexpected and disturbing piece of news.',
          '"Sad" = general sadness (not specifically from sudden news); "nervous" = anxious in anticipation.',
        ],
        tip: '"Alarmed" = shocked by sudden unexpected news. The answer key confirms: Shocked.',
      },
    },

    {
      id: 'nypp1_q42',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp2',
      questionNumber: 42,
      marks: 2,
      question: 'Why did the queen decide not to bind Sophia\'s wing in the end?',
      answer: 'The binding pained Sophia and the queen could not bear to hear her cries.',
      solution: {
        method: 'Literal comprehension — reason for the queen\'s decision',
        steps: [
          'Paragraph 4: "the binding pained the little bird. The queen witnessed it and could not bear to hear her cries, so she eventually unwrapped the wing."',
          'Two connected reasons: (1) the binding caused Sophia pain, (2) the queen could not bear to hear her crying.',
          'Quote or paraphrase both elements for full marks.',
        ],
        tip: 'The queen unwrapped the wing because: (1) binding hurt Sophia, (2) queen could not stand Sophia\'s cries.',
      },
    },

    {
      id: 'nypp1_q43',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'nypp1_comp2',
      questionNumber: 43,
      marks: 1,
      question: 'Sophia embraced her visiting friends because they ________.',
      questionType: 'circleABC',
      options: ['(a) were nightingales', '(b) were hurt', '(c) sang well'],
      answer: 'b',
      answerText: 'were hurt',
      solution: {
        method: 'Literal comprehension — reason for Sophia\'s embrace',
        steps: [
          'Paragraph 5: "Sad and broken birds of all kinds came to her to be comforted by her sweet embrace."',
          '"Sad and broken birds" = birds that were hurt/distressed.',
          'Option (b) "were hurt" = matches "sad and broken" in the passage.',
          '(a) "were nightingales" — the passage says "birds of all kinds", not specifically nightingales.',
          '(c) "sang well" — not mentioned.',
        ],
        tip: '"Sad and broken birds" = birds that were hurt. Sophia embraced them because they were hurt/sad. Answer: (b).',
      },
    },

  ], // end questions
};

export default practiceNanyangPrimaryPP1_2025;
