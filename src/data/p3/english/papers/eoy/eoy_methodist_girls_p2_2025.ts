// ============================================================
// METHODIST GIRLS' SCHOOL (PRIMARY) — Founded 1887
// 2025 END-OF-YEAR EXAMINATION — PRIMARY 3
// ENGLISH LANGUAGE PAPER 2
// Booklet A (MCQ, 14 marks) + Booklet B (Written, 20 marks) + Booklet C (Comprehension, 16 marks)
// Total Time: 1 h 15 min  |  Total: 50 marks
// ============================================================

import { QuestionSet } from '../../types';

const eoyMethodistGirlsP2_2025: QuestionSet = {
  id: 'eoy_methodist_girls_p2_2025',
  school: "Methodist Girls' School (Primary)",
  level: 'P3',
  year: 2025,
  exam: 'EOY',
  paper: 'Paper 2',
  subject: 'English',
  totalMarks: 50,
  duration: 75,

  questions: [

    // =========================================================
    // BOOKLET A — SECTION A: GRAMMAR MCQ (Q1–8) — 8 x 1 mark
    // =========================================================

    {
      id: 'mgs_p2_2025_q01',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 1,
      marks: 1,
      question: 'The bags of rice ________ heavy. I need help carrying them to the car now.',
      options: ['is', 'are', 'was', 'were'],
      answer: 2,
      solution: {
        method: 'Subject-verb agreement — plural noun, present tense',
        steps: [
          '"The bags of rice" → "bags" is plural.',
          '"Now" signals present tense.',
          'Plural + present = "are".',
          '"Is/was" are singular; "were" is past plural.',
        ],
        tip: 'The subject is "bags" (plural) not "rice" (uncountable). Plural subject → "are".',
      },
    },

    {
      id: 'mgs_p2_2025_q02',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 2,
      marks: 1,
      question: 'It was raining heavily when the accident ________.',
      options: ['happen', 'happens', 'happened', 'was happening'],
      answer: 3,
      solution: {
        method: 'Simple past — sudden event interrupting ongoing action',
        steps: [
          '"It was raining heavily" = past continuous (ongoing background).',
          'The accident is a sudden, completed event that occurred during the rain.',
          'Sudden event = simple past → "happened".',
          '"Happen/happens" are present; "was happening" implies the accident was ongoing (incorrect — accidents are sudden).',
        ],
        tip: 'When a sudden event occurs DURING an ongoing action: ongoing = past continuous; sudden event = simple past (happened).',
      },
    },

    {
      id: 'mgs_p2_2025_q03',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 3,
      marks: 1,
      question: '________ Siti was hungry, she did not eat during recess.',
      options: ['If', 'As', 'Since', 'Although'],
      answer: 4,
      solution: {
        method: 'Conjunction — concession (despite the fact)',
        steps: [
          'The sentence shows a contrast: Siti WAS hungry (expected to eat) BUT she did not eat.',
          '"Although" = despite the fact that → introduces a contrasting/concessive clause.',
          '"If" = condition; "As" = because/while; "Since" = because/from the time that.',
          'None of the other options show the contrast between being hungry and NOT eating.',
        ],
        tip: '"Although [obstacle], [action]" shows doing the opposite of what is expected. "Although hungry, she didn\'t eat."',
      },
    },

    {
      id: 'mgs_p2_2025_q04',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 4,
      marks: 1,
      question: 'My sister and I could not fall asleep last night as we had watched a horror movie. ________ kept us up the whole night!',
      options: ['It', 'We', 'She', 'They'],
      answer: 1,
      solution: {
        method: 'Personal pronoun — referring back to the movie',
        steps: [
          '"________ kept us up" → refers back to "a horror movie".',
          '"A horror movie" = a singular thing → use "it".',
          '"It" = pronoun for singular things.',
          '"We/she/they" all refer to people, not to the movie.',
        ],
        tip: 'When replacing a noun with a pronoun, match the number and person. A single object (movie) = "it".',
      },
    },

    {
      id: 'mgs_p2_2025_q05',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 5,
      marks: 1,
      question: 'Mrs Lim instructed the children to ________ their temperature when they walked into the classroom.',
      options: ['take', 'took', 'takes', 'taking'],
      answer: 3,
      solution: {
        method: 'Infinitive after "instructed to"',
        steps: [
          '"Instructed the children to ___" → requires a base-form infinitive.',
          '"instructed to take" → base form "take".',
          '"Took" is simple past; "takes" is third-person present; "taking" needs an auxiliary.',
        ],
        tip: 'After "instructed to", "asked to", "told to" → always use the BASE form: take, go, sit.',
      },
    },

    {
      id: 'mgs_p2_2025_q06',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 6,
      marks: 1,
      question: 'There was only ________ sugar left so Mariam could not bake the cake. She likes her cake to be sweet.',
      options: ['many', 'much', 'a few', 'a little'],
      answer: 4,
      solution: {
        method: 'Quantifier — small amount of uncountable noun',
        steps: [
          '"Sugar" is an uncountable noun.',
          '"A little" = a small amount of (uncountable) → "only a little sugar".',
          '"Many" and "a few" are for countable nouns; "much" = a large amount (doesn\'t fit "only" — insufficient quantity).',
          '"A little" = a small insufficient quantity of an uncountable noun.',
        ],
        tip: '"A little" = small amount of uncountable noun. "A few" = small number of countable noun.',
      },
    },

    {
      id: 'mgs_p2_2025_q07',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 7,
      marks: 1,
      question: 'Karthik will not be late for school if he ________ home on time.',
      options: ['left', 'leave', 'leaves', 'is leaving'],
      answer: 3,
      solution: {
        method: 'First conditional — "if" clause uses present simple',
        steps: [
          'Structure: "will not be + if + present simple".',
          '"If he leaves home on time" → present simple in the "if" clause.',
          '"Leaves" = third-person singular present simple.',
          '"Left" is past tense; "leave" is base form (missing -s); "is leaving" is present continuous.',
        ],
        tip: 'First conditional "if" clause: always use PRESENT SIMPLE. "If he leaves" (not "will leave").',
      },
    },

    {
      id: 'mgs_p2_2025_q08',
      type: 'A',
      topic: 'GrammarMCQ',
      questionNumber: 8,
      marks: 1,
      question: '"Meimei, you are supposed to do your homework now, ________ you?" Xueping questioned her sister.',
      options: ["isn't", "don't", "aren't", "doesn't"],
      answer: 3,
      solution: {
        method: 'Question tag — negative tag for positive statement',
        steps: [
          '"You are supposed to" is positive → question tag must be negative.',
          'Auxiliary verb in main clause: "are" → negative tag = "aren\'t you?"',
          '"Isn\'t" goes with "she/he/it is"; "don\'t/doesn\'t" go with main verb "do/does".',
          '"You are" → "aren\'t you?"',
        ],
        tip: 'Match the auxiliary: "You ARE supposed to" → "AREN\'T you?" (negate the same auxiliary).',
      },
    },

    // =========================================================
    // BOOKLET A — SECTION B: VOCABULARY MCQ (Q9–14) — 6 x 1 mark
    // =========================================================

    {
      id: 'mgs_p2_2025_q09',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 9,
      marks: 1,
      question: 'Jeralyn was ________ when her teacher praised her for showing improvement in her spelling.',
      options: [
        'as busy as a bee',
        'as wise as an owl',
        'as proud as a peacock',
        'as hardworking as an ant',
      ],
      answer: 3,
      solution: {
        method: 'Simile meaning and context — positive praise reaction',
        steps: [
          'Jeralyn was praised by her teacher → she feels pleased and proud of herself.',
          '"As proud as a peacock" = very proud/pleased with oneself (a peacock shows off its feathers).',
          '"As busy as a bee" = very busy (activity, not emotion); "as wise as an owl" = very wise; "as hardworking as an ant" = very diligent.',
          'Being praised → feeling proud → "as proud as a peacock".',
        ],
        tip: '"As proud as a peacock" = very proud, especially after being praised/achieving something.',
      },
    },

    {
      id: 'mgs_p2_2025_q10',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 10,
      marks: 1,
      question: 'Mrs Raja had to ________ the party to a later date as only five people could gather at her house due to the pandemic.',
      options: ['put up', 'put off', 'put out', 'put down'],
      answer: 2,
      solution: {
        method: 'Phrasal verb meaning — postpone',
        steps: [
          '"To a later date" = to reschedule to a future time = to postpone.',
          '"Put off" = to postpone/delay → "put off the party to a later date".',
          '"Put up" = to erect or accommodate; "put out" = to extinguish or inconvenience; "put down" = to place down or suppress.',
        ],
        tip: '"Put off" = postpone/delay. "The meeting was put off until next week."',
      },
    },

    {
      id: 'mgs_p2_2025_q11',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 11,
      marks: 1,
      question: 'The ________ at the football match cheered loudly when Bryan scored a goal for Singapore.',
      options: ['patrons', 'witnesses', 'spectators', 'customers'],
      answer: 3,
      solution: {
        method: 'Vocabulary — people watching a sporting event',
        steps: [
          '"At the football match" → people watching a sport.',
          '"Spectators" = people who watch an event, especially a sports event.',
          '"Patrons" = regular customers of a business; "witnesses" = people who see an incident; "customers" = people buying goods/services.',
        ],
        tip: '"Spectators" watch sporting events. "Audience" watches performances. "Patrons" support a business/arts organisation.',
      },
    },

    {
      id: 'mgs_p2_2025_q12',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 12,
      marks: 1,
      question: '"That man has been loitering outside our school for a long time. He looks ________. Let\'s report him to the police!" Giselle exclaimed.',
      options: ['innocent', 'exhausted', 'suspicious', 'approachable'],
      answer: 3,
      solution: {
        method: 'Vocabulary — adjective suggesting criminal intent',
        steps: [
          'The man is loitering (hanging around without purpose) → this raises concern.',
          '"Suspicious" = making you feel that something is wrong; seeming potentially dangerous or dishonest.',
          'Reporting to police confirms the concern → he looks suspicious.',
          '"Innocent" = not guilty (opposite); "exhausted" = very tired; "approachable" = easy to talk to (would not prompt a police call).',
        ],
        tip: '"Suspicious" = looks/acts as if doing something wrong. A person who makes you uneasy and want to call police looks "suspicious".',
      },
    },

    {
      id: 'mgs_p2_2025_q13',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 13,
      marks: 1,
      question: 'My friends and I clapped joyously when the principal ________ during assembly that our class was one of the cleanest in school.',
      options: ['informed', 'introduced', 'advertised', 'announced'],
      answer: 4,
      solution: {
        method: 'Vocabulary — public declaration at assembly',
        steps: [
          'The principal spoke at assembly to share news with the whole school.',
          '"Announced" = made a public declaration, especially to a large group.',
          '"Informed" = told (usually one-on-one or privately); "introduced" = presented a person/topic for the first time; "advertised" = promoted commercially.',
          'A principal making a public statement at assembly = "announced".',
        ],
        tip: '"Announce" = make a formal public statement. Announcements are made to groups (assembly, class, public).',
      },
    },

    {
      id: 'mgs_p2_2025_q14',
      type: 'A',
      topic: 'VocabMCQ',
      questionNumber: 14,
      marks: 1,
      question: 'Ramu was careless. He ________ threw the ball too high and it hit the beehive!',
      options: ['purposely', 'cautiously', 'deliberately', 'accidentally'],
      answer: 4,
      solution: {
        method: 'Adverb — manner consistent with being careless',
        steps: [
          '"Ramu was careless" = he did not intend to cause harm, he made a mistake.',
          '"Accidentally" = by mistake, unintentionally → matches carelessness.',
          '"Purposely" and "deliberately" both mean intentionally (opposite of careless).',
          '"Cautiously" = with great care (opposite of careless).',
        ],
        tip: '"Accidentally" = without intending to; by mistake. "Careless" + unexpected bad outcome → accidentally.',
      },
    },

    // =========================================================
    // BOOKLET B — SECTION C: GRAMMAR CLOZE (Q15–18) — 4 x 1 mark
    // Passage: Polar Bears and Climate Change
    // Choices in brackets, underline correct word
    // =========================================================

    {
      id: 'mgs_p2_2025_q15',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_c',
      setTitle: 'Grammar Cloze C — Polar Bears and Climate Change',
      passageContext: `Polar bears are soon becoming extinct. As one of the species most affected by the climate change, there (15) [ is / are ] much concern over their fate. Climate change (16) [ reduce / reduces ] the amount of sea ice in their homes. This means that the polar bears (17) [ need / needs ] to travel longer distances to hunt and mate. To help save the polar bears, everyone (18) [ has / have ] a part to play. Let us save them by taking public transport so that less energy is used.\n\nAdapted from "15 Animals That Will Be Extinct by 2050 If We Don't Help by Ian Carey"`,
      questionNumber: 15,
      marks: 1,
      question: 'there (15) [ is / are ] much concern over their fate.',
      answer: 'is',
      solution: {
        method: 'Subject-verb agreement — uncountable noun "concern"',
        steps: [
          '"Much concern" → "concern" is uncountable, treated as singular.',
          'Uncountable noun → singular verb = "is".',
          '"Are" is used with plural countable nouns.',
          'Also note: "there is much concern" is a fixed idiomatic expression.',
        ],
        tip: '"Concern" (worry/anxiety) is uncountable → "There IS much concern". Compare: "There ARE many concerns."',
      },
    },

    {
      id: 'mgs_p2_2025_q16',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_c',
      questionNumber: 16,
      marks: 1,
      question: 'Climate change (16) [ reduce / reduces ] the amount of sea ice in their homes.',
      answer: 'reduces',
      solution: {
        method: 'Subject-verb agreement — singular subject, present simple',
        steps: [
          '"Climate change" = singular subject.',
          'Present simple fact/general truth → third person singular = add -s.',
          '"Reduces" = singular third person present simple.',
          '"Reduce" is base form (used with plural subjects or I/you/we/they).',
        ],
        tip: '"Climate change" is singular → "reduces" (with -s). Compare: "Changes in climate REDUCE..." (plural subject).',
      },
    },

    {
      id: 'mgs_p2_2025_q17',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_c',
      questionNumber: 17,
      marks: 1,
      question: 'This means that the polar bears (17) [ need / needs ] to travel longer distances.',
      answer: 'need',
      solution: {
        method: 'Subject-verb agreement — plural subject',
        steps: [
          '"The polar bears" = plural subject.',
          'Plural → base form: "need" (no -s).',
          '"Needs" is for singular third-person subjects.',
        ],
        tip: '"Polar bears" (plural) → base form "need". "The bear needs" (singular) vs "The bears need" (plural).',
      },
    },

    {
      id: 'mgs_p2_2025_q18',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_c',
      questionNumber: 18,
      marks: 1,
      question: 'To help save the polar bears, everyone (18) [ has / have ] a part to play.',
      answer: 'has',
      solution: {
        method: 'Subject-verb agreement — "everyone" is singular',
        steps: [
          '"Everyone" = a singular indefinite pronoun (like everyone, someone, nobody).',
          'Singular → "has" (third person singular present).',
          '"Have" is used with I/you/we/they or plural nouns.',
          '"Everyone HAS a part" → always singular.',
        ],
        tip: '"Everyone", "everyone", "no one", "someone" are ALWAYS singular → use "has", "is", "was", "does".',
      },
    },

    // =========================================================
    // BOOKLET B — SECTION D: GRAMMAR CLOZE (Q19–22) — 4 x 1 mark
    // Passage: Andrew and Bobby's Fishing Trip (prepositions)
    // Word bank: around(A) away(B) down(C) into(D) off(E) with(F)
    // =========================================================

    {
      id: 'mgs_p2_2025_q19',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_d',
      setTitle: "Grammar Cloze D — Andrew and Bobby's Fishing Trip (Prepositions/Particles)",
      passageContext: `It was a beautiful day. Andrew and Bobby had been fishing the whole morning. "The water looks inviting. I'm going for a swim," Andrew remarked and immediately jumped (19)________ the cool water. "Watch out for jellyfish. There are some lurking (20)________. They might sting you," warned Bobby. However, Andrew paid no attention.\n\nMoments later, there was a loud scream. "Help! Jellyfish!" Instantly, Bobby started the motorboat and sped towards Andrew. The waves created as the motorboat sped past Andrew pushed the floating jellyfish (21)________ from him. Andrew scrambled onto the boat (22)________ visible red spots all over his body as a result of the stings. It was indeed a painful encounter for Andrew.`,
      questionNumber: 19,
      marks: 1,
      question: 'immediately jumped (19)________ the cool water.',
      wordBank: { A: 'around', B: 'away', C: 'down', D: 'into', E: 'off', F: 'with' },
      answer: 'D',
      answerWord: 'into',
      solution: {
        method: 'Preposition of movement — entering water',
        steps: [
          '"Jumped ___ the cool water" → Andrew entered the water by jumping.',
          '"Into" = movement from outside to inside (entering).',
          '"Into the water" = the direction of entering the water.',
          '"Down" would need "into": "jumped down into"; "around" = surrounding area; "off" = away from a surface.',
        ],
        tip: '"Jump INTO water" = the water is entered. "Into" shows movement from outside to inside.',
      },
    },

    {
      id: 'mgs_p2_2025_q20',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_d',
      questionNumber: 20,
      marks: 1,
      question: 'There are some lurking (20)________.',
      answer: 'A',
      answerWord: 'around',
      solution: {
        method: 'Adverb/particle — in the nearby area',
        steps: [
          '"Lurking around" = hiding/moving in the surrounding area, watching/waiting.',
          '"Lurking around" is a common expression for something dangerous nearby.',
          '"Away" = in a different direction (moving away); "down" = lower; "with" = accompanied by.',
        ],
        tip: '"Lurking around" = present in the nearby area in a hidden or threatening way. Used for predators/dangers.',
      },
    },

    {
      id: 'mgs_p2_2025_q21',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_d',
      questionNumber: 21,
      marks: 1,
      question: 'The waves ... pushed the floating jellyfish (21)________ from him.',
      answer: 'B',
      answerWord: 'away',
      solution: {
        method: 'Particle — direction of movement away from a person',
        steps: [
          '"Pushed the jellyfish ___ from him" → the jellyfish moved to a distance from Andrew.',
          '"Away from him" = increasing the distance between the jellyfish and Andrew.',
          '"Away" + "from" together form a phrase meaning increasing distance.',
          '"Around from him" or "off from him" are not standard expressions.',
        ],
        tip: '"Away from" = moving to a greater distance. The waves pushed the jellyfish AWAY FROM Andrew.',
      },
    },

    {
      id: 'mgs_p2_2025_q22',
      type: 'B',
      topic: 'GrammarCloze',
      setId: 'mgs_p2_2025_gramcloze_d',
      questionNumber: 22,
      marks: 1,
      question: 'Andrew scrambled onto the boat (22)________ visible red spots all over his body.',
      answer: 'F',
      answerWord: 'with',
      solution: {
        method: 'Preposition — accompanying condition/state',
        steps: [
          '"Scrambled onto the boat ___ visible red spots" → the red spots were on his body when he got on.',
          '"With" = having / accompanied by / characterised by.',
          '"With visible red spots all over his body" = his body had visible red spots.',
          '"Off", "away", "around" don\'t collocate to describe a condition.',
        ],
        tip: '"With" shows accompaniment or a physical characteristic/condition: "He arrived with a smile." "She returned with bruises."',
      },
    },

    // =========================================================
    // BOOKLET B — SECTION E: EDITING (Q23–26) — 4 x 1 mark
    // Passage: The Science of Sleep (Sleeping for Good Health)
    // =========================================================

    {
      id: 'mgs_p2_2025_q23',
      type: 'B',
      topic: 'Editing',
      setId: 'mgs_p2_2025_editing',
      setTitle: 'Editing — The Science of Sleep',
      passageContext: `Scientists think that sleep is the time when the body repairs itself. The human brain is the control centre for sleep. It sends messages to the body as it goes throo several stages of sleep each night.\n\nDuring the first stage, the eyes close and the muscles begin to relaxing. You may have seen a classmate fall into this stage of sleep at school. As your classmate's muscles relax, her head may drop or her pencil may fall from her hand. If you gently touch your friend, she should wake up easily before the teacher notices!\n\nOnce the muscles relax, the body moves quickly into the second stage. This is light sleep and most people still hears sounds or feel touch at this point. Next comes a period of deeper sleep. During the third stage, the body does not respond easily anymore. It is also not aware if the seroundings are hot or cold. It is harder to wake someone from this stage than from one of the earlier stages.\n\nAdapted from "Sleeping for Good Health"`,
      questionNumber: 23,
      marks: 1,
      question: 'It sends messages to the body as it goes throo several stages of sleep each night. (Underlined word: throo)',
      answer: 'through',
      errorType: 'spelling',
      solution: {
        method: 'Spelling correction',
        steps: [
          '"Throo" is a spelling error.',
          'The correct spelling is "through" = from one end/side to the other.',
          '"Goes through several stages" = passes through/experiences each stage.',
        ],
        tip: '"Through" is commonly misspelled. Remember: th-r-o-u-g-h. It means "from one end to the other".',
      },
    },

    {
      id: 'mgs_p2_2025_q24',
      type: 'B',
      topic: 'Editing',
      setId: 'mgs_p2_2025_editing',
      questionNumber: 24,
      marks: 1,
      question: 'During the first stage, the eyes close and the muscles begin to relaxing. (Underlined word: relaxing)',
      answer: 'relax',
      errorType: 'grammar',
      solution: {
        method: 'Grammar correction — infinitive after "begin to"',
        steps: [
          '"Begin to ___" requires a base-form infinitive.',
          '"Begin to relax" (not "relaxing").',
          '"Relaxing" is a gerund/present participle — "begin to relaxing" is grammatically incorrect.',
          'Correct: "the muscles begin to relax".',
        ],
        tip: '"Begin to + BASE FORM": begin to relax, begin to understand, begin to move. (Also acceptable: "begin relaxing" with gerund, but "begin to relaxing" is wrong.)',
      },
    },

    {
      id: 'mgs_p2_2025_q25',
      type: 'B',
      topic: 'Editing',
      setId: 'mgs_p2_2025_editing',
      questionNumber: 25,
      marks: 1,
      question: 'This is light sleep and most people still hears sounds or feel touch at this point. (Underlined word: hears)',
      answer: 'hear',
      errorType: 'grammar',
      solution: {
        method: 'Grammar correction — subject-verb agreement with "most people"',
        steps: [
          '"Most people" = plural subject.',
          'Plural → base form: "hear" (no -s).',
          '"Hears" is third-person singular (for he/she/it) → incorrect with "most people".',
        ],
        tip: '"Most people", "many people", "some people" are plural → use base form: hear, think, feel.',
      },
    },

    {
      id: 'mgs_p2_2025_q26',
      type: 'B',
      topic: 'Editing',
      setId: 'mgs_p2_2025_editing',
      questionNumber: 26,
      marks: 1,
      question: 'It is also not aware if the seroundings are hot or cold. (Underlined word: seroundings)',
      answer: 'surroundings',
      errorType: 'spelling',
      solution: {
        method: 'Spelling correction',
        steps: [
          '"Seroundings" is misspelled.',
          'Correct spelling: "surroundings" = the area, environment, or conditions around a person.',
          's-u-r-r-o-u-n-d-i-n-g-s.',
        ],
        tip: '"Surroundings" = everything around you. Remember: sur-ROUND-ings (the root word is "round").',
      },
    },

    // =========================================================
    // BOOKLET B — SECTION F: SENTENCE SYNTHESIS (Q27–28) — 2 marks
    // =========================================================

    {
      id: 'mgs_p2_2025_q27',
      type: 'A',
      topic: 'SentenceCombining',
      questionNumber: 27,
      marks: 1,
      question: 'I am going to borrow books. My siblings are also going to borrow books.\nRewrite as one sentence using "and".',
      answer: 'My siblings and I are going to borrow books.',
      solution: {
        method: 'Sentence synthesis — combining subjects with "and"',
        steps: [
          'Both sentences share the same predicate: "are going to borrow books".',
          'Combine the subjects: "I" and "My siblings" → "My siblings and I" (convention: put others before yourself).',
          '"My siblings and I are going to borrow books."',
          'Note: When "I" is combined with others, always put "I" last: "My siblings and I" (not "I and my siblings").',
        ],
        tip: 'Convention: "My siblings and I" NOT "I and my siblings". Always place "I" last when combining with others.',
      },
    },

    {
      id: 'mgs_p2_2025_q28',
      type: 'A',
      topic: 'SentenceCombining',
      questionNumber: 28,
      marks: 1,
      question: 'The mutton curry was spicy. Stella could not finish it.\nRewrite as one sentence using "because".',
      answer: 'Stella could not finish the mutton curry because it was spicy.',
      solution: {
        method: 'Sentence synthesis — combining with "because" (cause-effect)',
        steps: [
          'The spiciness (cause) led to Stella not finishing (effect).',
          '"Because" introduces the cause: "could not finish ... because it was spicy."',
          'Main clause: "Stella could not finish the mutton curry".',
          'Because clause: "because it was spicy".',
        ],
        tip: '"Because" joins cause and effect: [result] because [cause]. Replace the repeated noun "mutton curry" with "it".',
      },
    },

    // =========================================================
    // BOOKLET B — SECTION G: COMPREHENSION CLOZE (Q29–34) — 6 marks
    // Passage: Kevin the Class Clown (fill in most suitable words)
    // =========================================================

    {
      id: 'mgs_p2_2025_q29',
      type: 'B',
      topic: 'ComprehensionFIB',
      setId: 'mgs_p2_2025_compcloze',
      setTitle: 'Comprehension Cloze — Kevin the Class Clown',
      passageContext: `Kevin was our class clown who liked to do silly things to make everyone (29)________. Whenever our teacher, Mrs Ang was not looking, he would either make funny faces behind her back, or even create his own dance steps. Sometimes, we could not control (30)________ and would burst out laughing, much to Mrs Ang's annoyance.\n\nOne day, Kevin was up to his usual antics. He (31)________ up to Mrs Ang's desk and placed a life-like rubber cockroach on it. Unfortunately for Mrs Ang, she did not notice the cockroach and placed her hands on it while talking to us. When she (32)________ it, she gave a loud and piercing (33)________. Her face was as white as a sheet, and we all thought that Kevin would be in serious trouble.\n\nTo our surprise, Mrs Ang did not (34)________ Kevin for his prank. She just told him not to do it again next time.`,
      questionNumber: 29,
      marks: 1,
      question: 'Kevin was our class clown who liked to do silly things to make everyone (29)________.',
      answer: 'laugh',
      solution: {
        method: 'Context — purpose of a class clown\'s antics',
        steps: [
          'A clown\'s job is to make people laugh.',
          '"Make everyone laugh" = cause everyone to laugh → the goal of Kevin\'s silly acts.',
          '"Laugh" is the most natural and logical completion.',
        ],
        tip: '"Make someone laugh" = cause them to laugh. A clown does silly things to "make everyone laugh".',
      },
    },

    {
      id: 'mgs_p2_2025_q30',
      type: 'B',
      topic: 'ComprehensionFIB',
      setId: 'mgs_p2_2025_compcloze',
      questionNumber: 30,
      marks: 1,
      question: 'Sometimes, we could not control (30)________ and would burst out laughing.',
      answer: 'ourselves',
      solution: {
        method: 'Reflexive pronoun — "control ourselves"',
        steps: [
          '"Could not control ___" → the students cannot stop themselves from laughing.',
          '"Control ourselves" = a reflexive pronoun (the subject and object are the same: we/ourselves).',
          '"Ourselves" = first person plural reflexive pronoun.',
          '"Could not control ourselves" = could not stop themselves from reacting.',
        ],
        tip: '"Control ourselves" = stop ourselves from doing something. Reflexive pronouns: myself, yourself, ourselves, themselves.',
      },
    },

    {
      id: 'mgs_p2_2025_q31',
      type: 'B',
      topic: 'ComprehensionFIB',
      setId: 'mgs_p2_2025_compcloze',
      questionNumber: 31,
      marks: 1,
      question: 'He (31)________ up to Mrs Ang\'s desk and placed a life-like rubber cockroach on it.',
      answer: 'sneaked',
      solution: {
        method: 'Context — how a mischievous student approaches a teacher\'s desk',
        steps: [
          'Kevin is placing a prank item secretly without Mrs Ang noticing.',
          '"Sneaked up" = moved quietly and secretly toward someone.',
          '"Sneaked up to Mrs Ang\'s desk" = crept up quietly to avoid being noticed.',
          'Past tense because the whole passage is in past tense.',
        ],
        tip: '"Sneak up" = move quietly and secretly toward someone without being noticed. Past tense = "sneaked".',
      },
    },

    {
      id: 'mgs_p2_2025_q32',
      type: 'B',
      topic: 'ComprehensionFIB',
      setId: 'mgs_p2_2025_compcloze',
      questionNumber: 32,
      marks: 1,
      question: 'When she (32)________ it, she gave a loud and piercing (33)________.',
      answer: 'felt',
      solution: {
        method: 'Context — Mrs Ang\'s sense used to discover the cockroach',
        steps: [
          '"Placed her hands on it" → she touched the cockroach with her hands.',
          '"When she felt it" = when she became aware of it through touch/feeling.',
          '"Felt" = past tense of "feel" (physical sensation).',
          '"Saw" would work too but she placed her hands on it first → touch is more accurate.',
        ],
        tip: '"Feel" = to perceive through touch. "When she felt it" = when she touched it and noticed it.',
      },
    },

    {
      id: 'mgs_p2_2025_q33',
      type: 'B',
      topic: 'ComprehensionFIB',
      setId: 'mgs_p2_2025_compcloze',
      questionNumber: 33,
      marks: 1,
      question: '...she gave a loud and piercing (33)________.',
      answer: 'scream',
      solution: {
        method: 'Context — reaction to a frightening discovery',
        steps: [
          'Mrs Ang was startled by the rubber cockroach → she screamed.',
          '"A loud and piercing ___" → a scream is loud and piercing (high-pitched).',
          '"Scream" = a high-pitched cry of shock/fear.',
          '"Her face was as white as a sheet" = she was very frightened, consistent with screaming.',
        ],
        tip: 'A "loud and piercing scream" = a very frightened reaction. "Piercing" means very sharp/high-pitched — describes a scream.',
      },
    },

    {
      id: 'mgs_p2_2025_q34',
      type: 'B',
      topic: 'ComprehensionFIB',
      setId: 'mgs_p2_2025_compcloze',
      questionNumber: 34,
      marks: 1,
      question: 'To our surprise, Mrs Ang did not (34)________ Kevin for his prank.',
      answer: 'scold',
      solution: {
        method: 'Context — teacher\'s unexpectedly mild reaction',
        steps: [
          '"To our surprise" = the class expected severe punishment.',
          '"Did not ___ Kevin for his prank" = did not punish/tell off Kevin.',
          '"Scold" = to speak angrily to someone for doing wrong.',
          '"Mrs Ang did not scold Kevin" = she was not angry/did not tell him off harshly.',
        ],
        tip: '"Scold" = speak angrily to someone as a punishment. The answer sheet confirms Q34 = "scold".',
      },
    },

    // =========================================================
    // BOOKLET C — SECTION H: COMPREHENSION 1 (Q35–38) — 4 marks
    // Passage: Jabari Jumps (adapted from "Jabari Jumps" by Gaia Cornwall, 2017)
    // =========================================================

    {
      id: 'mgs_p2_2025_q35',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_h',
      setTitle: "Comprehension 1 — Jabari Jumps",
      passageContext: `"I'm jumping off the diving board today," Jacob told his dad. "Really?" responded his dad. The diving board was high. Nonetheless, Jacob had just passed his swim test and wanted to mark the occasion by jumping off the board. He watched the other kids climb the long ladder. They walked all the way out to the end of the board, spread their arms, bent their knees and sprang up. And then they dove down. Splash! "Looks easy," Jacob said.\n\nJacob stood at the bottom of the ladder and looked up. "You can go before me if you want," he told the kids behind him. "I need to think about what kind of special jump I'm going to do." After a minute, Jacob started to climb up the ladder. The ladder was very tall, he thought. Sensing that Jacob was slowing down, his father called out, "Are you okay?"\n\n"I'm just a little tired," Jacob retorted. "Maybe you should climb down and take a tiny rest," suggested his dad. A tiny rest sounded like a good idea and Jacob climbed back down. "It's okay to feel a little scared," comforted his dad. "Sometimes, if I feel scared, I take a deep breath and tell myself I am ready."\n\nJacob took a deep breath and felt the air fill his body. He looked up and began to climb up again, until he got to the top. Jacob stood up straight. He walked all the way to the end of the board cautiously. At the end of the board, he looked out as far as he could see. He felt he was ready. He took a deep breath, spread his arms and bent his knees. Then, he sprang up and off the board, flying! Jacob hit the water with a splash. He went down deep into the water and then came back up. When he floated back up, he exclaimed, "Double backflip is next!"\n\nAdapted from "Jabari Jumps" by Gaia Cornwall, 2017`,
      questionNumber: 35,
      marks: 1,
      question: 'Jacob wanted to jump off the diving board because ______. [1m]',
      options: [
        'the diving board was high.',
        'he had just passed his swim test.',
        'he was keen to try out some kind of special jump.',
        'the other kids made it look easy.',
      ],
      answer: 2,
      solution: {
        method: 'Literal comprehension — reason for wanting to jump',
        steps: [
          '"Jacob had just passed his swim test and wanted to mark the occasion by jumping off the board."',
          'He wanted to CELEBRATE passing his swim test by jumping.',
          'Option 2: "he had just passed his swim test" = the direct reason stated.',
          'Option 1: the board being high is a fact, not his reason; Option 3: the "special jump" was an excuse to delay, not the real reason; Option 4: the other kids made it look easy was an observation, not his motivation.',
        ],
        tip: 'The word "wanted to mark the occasion" = celebrate. The occasion = passing the swim test. This is his reason.',
      },
    },

    {
      id: 'mgs_p2_2025_q36',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_h',
      questionNumber: 36,
      marks: 1,
      question: 'Which word has the same meaning as "realising"? Circle either (A) or (B). [1m]',
      questionType: 'circleAB',
      passageExcerpt: 'Sensing (A) that Jacob was slowing down, his dad called out, "Are you okay?" "I\'m just a little tired," Jacob retorted. (B)',
      options: ['Sensing (A)', 'retorted (B)'],
      answer: 'A',
      answerWord: 'Sensing',
      solution: {
        method: 'Vocabulary — synonym for "realising"',
        steps: [
          '"Realising" = becoming aware of something.',
          '"Sensing" (A) = perceiving or becoming aware of something through your senses or intuition.',
          '"Retorted" (B) = replied sharply → unrelated to "realising".',
        ],
        tip: '"Sense" = become aware of, perceive. "Realise" = become aware of. Both involve becoming conscious of something.',
      },
    },

    {
      id: 'mgs_p2_2025_q37',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_h',
      questionNumber: 37,
      marks: 1,
      question: 'Jacob climbed down from the board because he felt tired. True or False? [1m]',
      questionType: 'truefalse',
      answer: 'False',
      solution: {
        method: 'True/False — reason for climbing down',
        steps: [
          '"I\'m just a little tired," Jacob retorted → this was Jacob\'s EXCUSE to cover his fear.',
          'His dad then said: "It\'s okay to feel a little scared" → showing the REAL reason was fear.',
          'The story implies Jacob was scared, not genuinely tired.',
          'Climbing down was due to fear, not genuine tiredness → False.',
        ],
        tip: 'Jacob said "tired" but he was actually scared (dad acknowledged: "it\'s okay to feel scared"). The real reason = fear, not tiredness. False.',
      },
    },

    {
      id: 'mgs_p2_2025_q38',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_h',
      questionNumber: 38,
      marks: 1,
      question: 'Eventually, Jacob enjoyed jumping off the diving board. True or False? [1m]',
      questionType: 'truefalse',
      answer: 'True',
      solution: {
        method: 'True/False — Jacob\'s final reaction',
        steps: [
          'After jumping, Jacob exclaimed: "Double backflip is next!"',
          'Wanting to do more = he enjoyed the experience.',
          'The exclamation mark shows his excitement and enthusiasm.',
          'True.',
        ],
        tip: '"Double backflip is next!" = excited and wanting more. Jacob enjoyed it → True.',
      },
    },

    // =========================================================
    // BOOKLET C — SECTION I: COMPREHENSION 2 (Q39–43) — 8 marks
    // Passage: Billie at the Concert (adapted from "Alfie at Nursery School" by Shirley Hughes)
    // =========================================================

    {
      id: 'mgs_p2_2025_q39',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_i',
      setTitle: "Comprehension 2 — Billie at the Concert",
      passageContext: `Adam's little sister, Billie, yearned to go to Merlion Primary School with Adam, but she was too young. Every morning, when she and Mother said goodbye to Adam at the school gate, she tried to get out of the stroller to go with him. "You'll be able to come to school with me one day," Adam told her kindly. "But you are not old enough yet." This did not appease Billie. She kicked her feet about grumpily when she saw him enter the school.\n\nIn a month's time, there was going to be a special day at the school when all the families would be invited to attend a mid-year concert. The children rehearsed very hard for it. Some were going to play drums and triangles while others were going to sing. Adam was going to be the lead singer in his class performance. The children also designed and painted the lovely programme sheets.\n\nWhen the day of the concert came, everyone was ushered into the auditorium. When everyone was seated, Miss Rina, one of the music teachers, struck up a tune on the piano and all the children began to sing and play their very best. Then, a very embarrassing thing happened...\n\nBillie wriggled off Mother's lap and ran up the stage to stand next to Adam. She was determined to join in with the singing though she did not know the words. Adam went pink in the face. He looked across at Mother, and Mother looked at him. They both knew very well that if either of them tried to make Billie go back to her seat, she would make a terrible fuss.\n\nAdam held her hand tightly and went on singing. Luckily, Billie behaved very well. She just stood there, proudly beaming at everyone. After the performance, Adam and his classmates bowed to the audience and the audience gave a resounding roar of applause. Billie ran back to sit on Mother's lap again, good as gold.\n\n"Having a little sister is a lot of responsibility sometimes," Adam said to Mother when they were getting ready to go home. "You're quite right. Nonetheless, you have saved the concert for everyone, Adam, and I'm so proud of you!" Mother grinned.\n\nAdapted from "Alfie at Nursery School" by Shirley Hughes`,
      questionNumber: 39,
      marks: 1,
      question: 'Which word from Paragraph 1 has the same meaning as "irritably"? [1m]',
      answer: 'grumpily',
      solution: {
        method: 'Vocabulary — synonym from paragraph 1',
        steps: [
          '"Irritably" = in a bad-tempered, annoyed manner.',
          'Paragraph 1: "She kicked her feet about grumpily..."',
          '"Grumpily" = in a grumpy, bad-tempered manner → synonym for irritably.',
        ],
        tip: '"Grumpily" = irritably/bad-temperedly. Both describe doing something in an annoyed, ill-tempered way.',
      },
    },

    {
      id: 'mgs_p2_2025_q40',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_i',
      questionNumber: 40,
      marks: 1,
      question: 'Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the passage. [1m]',
      questionType: 'sequencing',
      items: [
        'The children began singing.',
        'Miss Rina struck up a tune on the piano.',
        'Billie ran up onto the stage.',
      ],
      answer: {
        'The children began singing.': 2,
        'Miss Rina struck up a tune on the piano.': 1,
        'Billie ran up onto the stage.': 3,
      },
      solution: {
        method: 'Sequencing — reading narrative order',
        steps: [
          'Event 1: "Miss Rina ... struck up a tune on the piano" → she played first.',
          'Event 2: "all the children began to sing and play their very best" → after Miss Rina played.',
          'Event 3: "Billie wriggled off Mother\'s lap and ran up the stage" → this happened after the singing started ("a very embarrassing thing happened").',
        ],
        tip: 'Follow the sequence: Miss Rina plays piano (1) → children sing (2) → Billie runs up stage (3).',
      },
    },

    {
      id: 'mgs_p2_2025_q41',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_i',
      questionNumber: 41,
      marks: 2,
      question: 'From the passage, Adam and his schoolmates put in a lot of effort to prepare for the concert. What did they do? [2m]',
      answer: [
        '(i) They rehearsed very hard for it. / Some were going to play drums and triangles while others were going to sing.',
        '(ii) The children also designed and painted the lovely programme sheets.',
      ],
      solution: {
        method: 'Literal comprehension — identifying preparation actions',
        steps: [
          'Paragraph 2 lists the preparations:',
          '(i) "The children rehearsed very hard for it" / playing instruments and singing.',
          '(ii) "The children also designed and painted the lovely programme sheets."',
          'Give one mark for each correct preparation activity (2 marks total).',
        ],
        tip: 'Paragraph 2 lists TWO types of effort: (1) rehearsing/performing, (2) designing programme sheets.',
      },
    },

    {
      id: 'mgs_p2_2025_q42',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_i',
      questionNumber: 42,
      marks: 2,
      question: 'State whether each statement is True or False. Give a reason for your answer. [2m]\n(i) Adam was embarrassed that Billie ran up the stage and stood next to him.\n(ii) Billie was happy that she joined her brother on stage in the performance.',
      answer: {
        i: {
          verdict: 'True',
          reason: 'Adam went pink in the face (when Billie ran up to stand next to him).',
        },
        ii: {
          verdict: 'True',
          reason: 'She just stood there, proudly beaming at everyone.',
        },
      },
      solution: {
        method: 'True/False with evidence',
        steps: [
          '(i) "Adam went pink in the face" = he blushed = was embarrassed → True. Quote this as evidence.',
          '(ii) "She just stood there, proudly beaming at everyone" = proudly happy → True. Quote this as evidence.',
        ],
        tip: '(i) "Went pink in the face" = blushed = embarrassed. (ii) "Proudly beaming" = happy and proud.',
      },
    },

    {
      id: 'mgs_p2_2025_q43',
      type: 'B',
      topic: 'ComprehensionOE',
      setId: 'mgs_p2_2025_comp_i',
      questionNumber: 43,
      marks: 2,
      question: "Explain clearly why Adam's mother was proud of him. [2m]",
      answer: "Adam's mother was proud of him because he held Billie's hand tightly and continued singing, which saved the concert for everyone.",
      solution: {
        method: 'Inferential comprehension — reason for pride',
        steps: [
          'Mother says: "you have saved the concert for everyone, Adam, and I\'m so proud of you!"',
          'Why did he save the concert? Because he held Billie\'s hand and continued singing instead of making a fuss.',
          'If he had tried to remove Billie, "she would make a terrible fuss" → which would have ruined the concert.',
          'By calmly holding her hand and singing on, Adam prevented the concert from being disrupted.',
          'Answer should mention: (1) what Adam did (held hand/continued singing) and (2) effect (saved the concert).',
        ],
        tip: 'Mother\'s exact words give the reason: "saved the concert for everyone". Link what Adam DID to this outcome. He held Billie\'s hand and sang on despite the distraction.',
      },
    },

  ], // end questions
};

export default eoyMethodistGirlsP2_2025;
