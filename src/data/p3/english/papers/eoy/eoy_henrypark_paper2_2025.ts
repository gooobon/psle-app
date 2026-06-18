// src/data/p3/english/papers/eoy_henrypark_paper2_2025.ts
// Henry Park Primary School — Primary 3 English Language
// 2023 Timed Practice Paper 2 | Total: 50 marks | Duration: 50 min
// PART I: Vocabulary MCQ (A·6q), Grammar MCQ (B·8q)
// PART II: Grammar Cloze (C·4q×2passages), Vocabulary Cloze (D·5q),
//          Editing Spelling (E·5q), Synthesis (F·2q),
//          Comprehension 1 — Ted & the Seal (G·8m),
//          Comprehension 2 — Fiona's Friends (H·8m)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_henrypark_paper2_2025",
  school: "Henry Park Primary School",
  level: "P3",
  subject: "English",
  paperType: "2023 Timed Practice Paper 2",
  year: 2025,
  totalMarks: 50,
  sections: [

    // ─────────────────────────────────────────────
    // PART I SECTION A — Vocabulary MCQ (6 × 1 m = 6 m)
    // ─────────────────────────────────────────────
    {
      id: "secA",
      name: "Part I Section A: Vocabulary",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "hp_a_q1",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 1,
          marks: 1,
          stem: "The ____________ who snatched Mrs Lee's handbag disappeared before the policemen arrived at the scene.",
          options: [
            { label: "1", text: "victim" },
            { label: "2", text: "culprit" },
            { label: "3", text: "witness" },
            { label: "4", text: "detective" },
          ],
          answer: "2",
          solution: {
            method: "Vocabulary — crime roles",
            steps: [
              "'Culprit' = the person who committed a crime.",
              "The person who snatched the handbag = the one who committed the crime = the culprit.",
              "'Victim' = the person harmed (Mrs Lee is the victim).",
              "'Witness' = someone who saw the crime.",
              "'Detective' = a police officer who investigates crimes.",
            ],
            tip: "Culprit = the guilty person who did it. Victim = person harmed. Witness = person who saw it.",
          },
        },
        {
          id: "hp_a_q2",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "The thrifty man could not bear to spend so much money on that pair of leather shoes. He decided to buy a ____________ pair of shoes.",
          options: [
            { label: "1", text: "lower" },
            { label: "2", text: "better" },
            { label: "3", text: "cheaper" },
            { label: "4", text: "expensive" },
          ],
          answer: "3",
          solution: {
            method: "Vocabulary — thrifty spending",
            steps: [
              "'Thrifty' = careful with money, not wanting to spend much.",
              "He couldn't bear to spend so much → he wanted a less expensive alternative.",
              "'Cheaper' = costing less money. Perfectly fits the context.",
              "'Lower' is an adjective not naturally paired with 'pair of shoes' in this way.",
              "'Better' = higher quality (likely MORE expensive — opposite intent).",
              "'Expensive' = costs a lot (the opposite of what he wants).",
            ],
            tip: "Thrifty = money-conscious. He wants to pay LESS → a CHEAPER pair of shoes.",
          },
        },
        {
          id: "hp_a_q3",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 3,
          marks: 1,
          stem: '"I\'m sorry, I didn\'t mean to push you, Mr Tan. I\'ll help you pick up the books," Roy ____________.',
          options: [
            { label: "1", text: "hinted" },
            { label: "2", text: "reminded" },
            { label: "3", text: "apologised" },
            { label: "4", text: "questioned" },
          ],
          answer: "3",
          solution: {
            method: "Vocabulary — speech verb for apology",
            steps: [
              "Roy says 'I'm sorry, I didn't mean to push you' — this is clearly an apology.",
              "'Apologised' = said sorry for doing something wrong. Perfect match.",
              "'Hinted' = suggested indirectly.",
              "'Reminded' = helped someone remember something.",
              "'Questioned' = asked questions.",
            ],
            tip: "'I'm sorry' = an apology → Roy apologised. Match the speech verb to the type of speech.",
          },
        },
        {
          id: "hp_a_q4",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "The children followed their parents' ____________ to use the pedestrian crossing when they cross the road.",
          options: [
            { label: "1", text: "report" },
            { label: "2", text: "advice" },
            { label: "3", text: "speech" },
            { label: "4", text: "answer" },
          ],
          answer: "2",
          solution: {
            method: "Vocabulary — following guidance",
            steps: [
              "'Advice' = guidance or recommendations on what to do.",
              "Parents telling children to use pedestrian crossings = advice/guidance.",
              "'Follow someone's advice' = act on their recommendations.",
              "'Report' = a formal document/account.",
              "'Speech' = a formal address/talk.",
              "'Answer' = a response to a question.",
            ],
            tip: "Follow one's ADVICE = act on their recommendations/guidance. 'Follow advice' is a fixed collocation.",
          },
        },
        {
          id: "hp_a_q5",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 5,
          marks: 1,
          stem: "Sally showed off her ____________ driving skills during the race and emerged as the champion.",
          options: [
            { label: "1", text: "dull" },
            { label: "2", text: "messy" },
            { label: "3", text: "ordinary" },
            { label: "4", text: "impressive" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — quality of skills leading to championship",
            steps: [
              "Sally 'showed off' her skills and 'emerged as the champion' — results show she was excellent.",
              "'Impressive' = very good, causing admiration.",
              "'Dull' = boring/not interesting — champions don't have dull skills.",
              "'Messy' = untidy/disorganised — contradicts championship.",
              "'Ordinary' = nothing special — champions have extraordinary skills.",
            ],
            tip: "'Showed off' + 'emerged as champion' → the skills were IMPRESSIVE (excellent, worthy of showing off).",
          },
        },
        {
          id: "hp_a_q6",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 6,
          marks: 1,
          stem: "My desk still feels sticky even after I have ____________ off the sweetened drink that I had spilt this morning.",
          options: [
            { label: "1", text: "wiped" },
            { label: "2", text: "dusted" },
            { label: "3", text: "rubbed" },
            { label: "4", text: "scratched" },
          ],
          answer: "1",
          solution: {
            method: "Verb collocation — cleaning a spill",
            steps: [
              "A liquid drink was spilt on the desk.",
              "'Wiped off' = cleaned a surface by moving a cloth across it.",
              "'Wipe off a spill' is the natural English collocation for cleaning liquid from a surface.",
              "'Dusted off' = removed dust (not liquid).",
              "'Rubbed off' = removed by friction (less natural for a spill).",
              "'Scratched off' = removed by scratching (for hard substances, not liquid).",
            ],
            tip: "'Wipe off a spill' = clean liquid by wiping. 'Dust off' = remove dust. Match the verb to the substance being cleaned.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART I SECTION B — Grammar MCQ (8 × 1 m = 8 m)
    // Questions 7–14
    // ─────────────────────────────────────────────
    {
      id: "secB",
      name: "Part I Section B: Grammar",
      topic: "GrammarMCQ",
      marks: 8,
      questions: [
        {
          id: "hp_b_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: "Nurul ____________ to the swimming complex for swimming lessons every Sunday.",
          options: [
            { label: "1", text: "go" },
            { label: "2", text: "goes" },
            { label: "3", text: "is going" },
            { label: "4", text: "was going" },
          ],
          answer: "2",
          solution: {
            method: "Simple present — third person singular habitual action",
            steps: [
              "'Every Sunday' = regular habitual action → simple present tense.",
              "Subject 'Nurul' = third person singular → add '-s' to the verb.",
              "'goes' = correct. ✓",
              "'go' = base form (wrong for third-person singular in present).",
              "'is going' = present continuous — used for actions happening RIGHT NOW, not every Sunday.",
            ],
            tip: "Every [day/week] + third person singular = simple present with -s: goes, runs, eats.",
          },
        },
        {
          id: "hp_b_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "The postman had to deliver the mail the next day as nobody ____________ at home that afternoon.",
          options: [
            { label: "1", text: "is" },
            { label: "2", text: "are" },
            { label: "3", text: "was" },
            { label: "4", text: "were" },
          ],
          answer: "3",
          solution: {
            method: "Past tense — 'nobody' + singular verb",
            steps: [
              "The sentence refers to a past situation ('had to deliver', 'that afternoon').",
              "'Nobody' = not a person = third person singular.",
              "Past tense + singular = 'was'.",
              "'Nobody was' = correct. ✓",
              "'were' is plural past — 'nobody' is singular.",
            ],
            tip: "'Nobody/no one/everyone/somebody' are always SINGULAR → was (not were).",
          },
        },
        {
          id: "hp_b_q9",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "Mrs Tan reminded her children to warm up the lunch by ____________ before she left for work.",
          options: [
            { label: "1", text: "himself" },
            { label: "2", text: "herself" },
            { label: "3", text: "yourselves" },
            { label: "4", text: "themselves" },
          ],
          answer: "4",
          solution: {
            method: "Reflexive pronoun — 'children' as subject",
            steps: [
              "Mrs Tan reminded her CHILDREN to warm up lunch BY THEMSELVES.",
              "'By themselves' = on their own, without help.",
              "The children (plural, third person) → reflexive = 'themselves'.",
              "'herself' = singular female (Mrs Tan) — but it's the children doing the warming.",
              "'yourselves' = for 'you all' — from mother's perspective it would be 'yourselves', but sentence is in third person.",
              "Official answer: (4) themselves — the children warm up lunch themselves.",
            ],
            tip: "'By themselves' = on their own (plural, third person). Children = they → themselves.",
          },
        },
        {
          id: "hp_b_q10",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 10,
          marks: 1,
          stem: "There were ____________ guests at Grandmother's 80th birthday party as she was well-loved by her friends and relatives.",
          options: [
            { label: "1", text: "many" },
            { label: "2", text: "much" },
            { label: "3", text: "a few" },
            { label: "4", text: "a little" },
          ],
          answer: "1",
          solution: {
            method: "Quantifiers — countable nouns",
            steps: [
              "'Guests' = countable noun (one guest, two guests).",
              "For countable nouns: 'many' (large number) or 'a few' (small number).",
              "Context: she was 'well-loved by friends and relatives' → MANY people came.",
              "'Many guests' = a large number of guests. ✓",
              "'Much' and 'a little' are for uncountable nouns.",
            ],
            tip: "Guests = countable → many guests (not 'much guests'). Well-loved → many people came → 'many'.",
          },
        },
        {
          id: "hp_b_q11",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 11,
          marks: 1,
          stem: '"Look at ____________ bears in the enclosure. Shall we go nearer to take some pictures of them?" Mother asked the children.',
          options: [
            { label: "1", text: "this" },
            { label: "2", text: "that" },
            { label: "3", text: "these" },
            { label: "4", text: "those" },
          ],
          answer: "4",
          solution: {
            method: "Demonstrative adjectives — plural + far",
            steps: [
              "'Bears' is plural (more than one bear).",
              "The bears are 'in the enclosure' — at a distance from the speaker.",
              "The suggestion 'Shall we go NEARER' confirms the bears are FAR.",
              "Far + plural = 'those'.",
            ],
            tip: "Shall we go NEARER = bears are far away. Far + plural bears = THOSE bears.",
          },
        },
        {
          id: "hp_b_q12",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 12,
          marks: 1,
          stem: '"Please speak softly. The children ____________ at the moment," said Mrs Lim.',
          options: [
            { label: "1", text: "slept" },
            { label: "2", text: "sleep" },
            { label: "3", text: "have slept" },
            { label: "4", text: "are sleeping" },
          ],
          answer: "4",
          solution: {
            method: "Present continuous — action happening right now",
            steps: [
              "'At the moment' = right now, currently.",
              "Action happening at this exact time = present continuous.",
              "'The children are sleeping at the moment' = currently sleeping. ✓",
              "'slept' is past tense — wrong for 'at the moment'.",
              "'sleep' is simple present — used for habits, not current actions.",
              "'have slept' = present perfect — action completed, not currently ongoing.",
            ],
            tip: "'At the moment' = right now → present continuous (is/are + verb-ing): are sleeping.",
          },
        },
        {
          id: "hp_b_q13",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 13,
          marks: 1,
          stem: '"Could you add ____________ salt to this pot of soup?" asked Rachel, after taking a sip of the tasteless soup.',
          options: [
            { label: "1", text: "a few" },
            { label: "2", text: "many" },
            { label: "3", text: "much" },
            { label: "4", text: "some" },
          ],
          answer: "4",
          solution: {
            method: "Quantifiers — uncountable noun in polite request",
            steps: [
              "'Salt' is an uncountable noun.",
              "For uncountable nouns in positive requests/offers, 'some' is used.",
              "'Could you add some salt?' = polite request for an unspecified amount.",
              "'Much' is used in negatives/questions with uncountable: 'too much', 'how much'.",
              "'A few/many' are for countable nouns.",
            ],
            tip: "'Some' = used in positive statements and polite requests. 'Could you add some salt?' is perfectly natural.",
          },
        },
        {
          id: "hp_b_q14",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 14,
          marks: 1,
          stem: "Sandy has been learning to play the piano ____________ she was five years old.",
          options: [
            { label: "1", text: "if" },
            { label: "2", text: "so" },
            { label: "3", text: "when" },
            { label: "4", text: "since" },
          ],
          answer: "4",
          solution: {
            method: "Conjunction — 'since' with present perfect",
            steps: [
              "'Has been learning' = present perfect continuous — action started in the past and continues now.",
              "'Since' is used with present perfect to indicate the START POINT of an ongoing action.",
              "'Sandy has been learning piano SINCE she was five' = started at age five and still learning.",
              "'When' = at the time that (does not pair with present perfect for duration).",
              "'If' = conditional; 'so' = result — neither fits here.",
            ],
            tip: "Present perfect + SINCE = ongoing action from a specific point in the past: 'has been learning since age 5'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II SECTION C — Grammar Cloze (4+4 × 1 m = 8 m)
    // Two passages
    // ─────────────────────────────────────────────
    {
      id: "secC",
      name: "Part II Section C: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 8,
      passages: [
        {
          id: "secC_p1",
          passageNumber: 1,
          title: "East Coast Park Trip",
          text: `During the holidays, Jane and her family went to East Coast Park. At the park, they cycled (15) _______ and swam in the sea. (16) _______ it was time to go home, her father realised that the car key was missing while they were packing up. The family searched everywhere (17) _______ the key could not be found. They had to take a taxi home (18) _______ it was getting dark. The next day, her father found the key in one of the pockets of his pants.`,
          wordBank: ["and", "but", "if", "while", "although", "because", "when", "with"],
          questions: [
            {
              id: "hp_c_q15",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 15,
              marks: 1,
              blankNumber: 15,
              stem: "they cycled (15) _______ and swam in the sea",
              answer: "and",
              answerWord: "and",
              solution: {
                method: "Conjunction joining two parallel activities",
                steps: [
                  "Two activities: cycled ___ and swam in the sea.",
                  "'And' joins two parallel activities.",
                  "But wait — this blank is WITHIN 'cycled ___' not between two clauses.",
                  "Reading more carefully: 'they cycled (15) and swam in the sea' — the blank could be nothing, OR it joins 'cycled' to something.",
                  "Official answer: 'And' — the full phrase is 'they cycled and swam in the sea'.",
                  "The blank at (15) is 'and' connecting the two activities.",
                ],
                tip: "'And' connects two parallel actions: cycled AND swam.",
              },
            },
            {
              id: "hp_c_q16",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 16,
              marks: 1,
              blankNumber: 16,
              stem: "(16) _______ it was time to go home, her father realised that the car key was missing",
              answer: "when",
              answerWord: "when",
              solution: {
                method: "Time conjunction — 'when' for simultaneous events",
                steps: [
                  "'When it was time to go home' = at that moment in time.",
                  "'When' introduces a time clause for something that happened at a specific moment.",
                  "'While' = during an ongoing action — 'while it was time' is unnatural.",
                  "'Although' = concession — doesn't fit here.",
                ],
                tip: "'When it was time to go' = at the moment of departure. WHEN introduces time clauses.",
              },
            },
            {
              id: "hp_c_q17",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 17,
              marks: 1,
              blankNumber: 17,
              stem: "The family searched everywhere (17) _______ the key could not be found.",
              answer: "but",
              answerWord: "but",
              solution: {
                method: "Conjunction — contrast between effort and result",
                steps: [
                  "They searched everywhere (effort) BUT the key was not found (disappointing result).",
                  "'But' introduces a contrasting or unexpected result.",
                  "'Because' = reason — wrong (the search didn't CAUSE the key not to be found).",
                  "'Although' could work but official answer is 'but'.",
                ],
                tip: "'Searched everywhere BUT couldn't find' = contrast between effort and result. 'But' = however.",
              },
            },
            {
              id: "hp_c_q18",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 18,
              marks: 1,
              blankNumber: 18,
              stem: "They had to take a taxi home (18) _______ it was getting dark.",
              answer: "because",
              answerWord: "because",
              solution: {
                method: "Conjunction — reason for taking a taxi",
                steps: [
                  "Why did they take a taxi? Because it was getting dark.",
                  "'Because' introduces the reason/cause.",
                  "'It was getting dark' = the reason they needed to hurry home by taxi.",
                ],
                tip: "'Because' = introduces the reason. They took a taxi BECAUSE it was getting dark.",
              },
            },
          ],
        },
        {
          id: "secC_p2",
          passageNumber: 2,
          title: "Kite Flying",
          text: `It was a windy afternoon. Tom and his neighbour, Ali, decided that it was the perfect day to (19) _______ kites. They headed for the big field at the park. There were already people (20) _______ a few kites in the sky. Tom (21) _______ his kite so high that it almost reached the clouds! They were having so much fun. They did not realise three hours had gone by. "Time (22) _______ when we are having fun!" exclaimed Tom. They made a promise that they would fly kites again the next weekend.`,
          wordBank: ["fly", "flies", "flew", "is flying", "flying", "have flown"],
          questions: [
            {
              id: "hp_c_q19",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 19,
              marks: 1,
              blankNumber: 19,
              stem: "it was the perfect day to (19) _______ kites",
              answer: "fly",
              answerWord: "fly",
              solution: {
                method: "Infinitive after 'to' — base form",
                steps: [
                  "'The perfect day to ___ kites' — 'to' here is an infinitive marker.",
                  "After infinitive 'to', use the base form of the verb.",
                  "'fly' = base form. ✓",
                  "'flies' is third-person singular present — cannot follow 'to'.",
                  "'flying' is gerund — needs different structure ('for flying').",
                ],
                tip: "To + BASE VERB: 'the perfect day to FLY kites'.",
              },
            },
            {
              id: "hp_c_q20",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 20,
              marks: 1,
              blankNumber: 20,
              stem: "There were already people (20) _______ a few kites in the sky.",
              answer: "flying",
              answerWord: "flying",
              solution: {
                method: "Present participle — 'people doing something'",
                steps: [
                  "'There were people [doing something]' — the structure requires a present participle.",
                  "'People flying kites' = people who were flying kites (present participle as adjective).",
                  "Structure: [people] + [verb-ing]: 'people flying kites in the sky'.",
                  "'flew' is simple past — cannot follow 'people' directly in this structure.",
                ],
                tip: "'People + verb-ing' = people doing something. 'People flying kites' = people who were flying kites.",
              },
            },
            {
              id: "hp_c_q21",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 21,
              marks: 1,
              blankNumber: 21,
              stem: "Tom (21) _______ his kite so high that it almost reached the clouds!",
              answer: "flew",
              answerWord: "flew",
              solution: {
                method: "Simple past — narrative event",
                steps: [
                  "The story is narrated in the past tense throughout.",
                  "'Flew' = simple past of 'fly'. Irregular verb: fly → flew → flown.",
                  "'Tom flew his kite' = past tense narrative. ✓",
                  "'flies' = present tense — inconsistent with past narrative.",
                  "'have flown' = present perfect — wrong for simple narrative past.",
                ],
                tip: "Fly → flew (irregular simple past). The story is in past tense throughout.",
              },
            },
            {
              id: "hp_c_q22",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 22,
              marks: 1,
              blankNumber: 22,
              stem: '"Time (22) _______ when we are having fun!" exclaimed Tom.',
              answer: "flies",
              answerWord: "flies",
              solution: {
                method: "Idiom — 'Time flies'",
                steps: [
                  "'Time flies when you're having fun' is a well-known English idiom.",
                  "It means time passes quickly when you enjoy yourself.",
                  "'Flies' = third-person singular present (Time = singular).",
                  "Idiom: 'Time flies!' = time passes quickly.",
                ],
                tip: "Fixed idiom: 'Time FLIES when we are having fun!' = time passes quickly during enjoyment.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II SECTION D — Vocabulary Cloze (5 × 1 m = 5 m)
    // Questions 23–27 (Open fill-in, no word bank)
    // ─────────────────────────────────────────────
    {
      id: "secD",
      name: "Part II Section D: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 5,
      passage: {
        title: "Farewell for Mrs Tan",
        text: `Our form teacher, Mrs Tan, is retiring next year. Mrs Tan is a wonderful teacher and we will (23) _______ her when she retires. We are very (24) _______ for everything that she has done for us. We want to (25) _______ our appreciation to Mrs Tan by planning a farewell party for her at the canteen during our recess. We are planning to invite some of her (26) _______ whom she has taught before. We are sure that they would like to thank her too. We hope that she will enjoy the (27) _______ that we are going to plan for her. We hope everyone will enjoy themselves too.`,
      },
      questions: [
        {
          id: "hp_d_q23",
          type: "A",
          topic: "VocabCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "we will (23) _______ her when she retires",
          answer: "miss",
          solution: {
            method: "Context — feeling after teacher leaves",
            steps: [
              "When a beloved teacher retires, students feel sad and 'miss' them.",
              "'Miss someone' = feel their absence, wish they were still there.",
              "The official answer is 'miss'.",
            ],
            tip: "'Miss' = feel the absence of someone you care about. 'We will miss her when she retires.'",
          },
        },
        {
          id: "hp_d_q24",
          type: "A",
          topic: "VocabCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "We are very (24) _______ for everything that she has done for us.",
          answer: "grateful",
          solution: {
            method: "Vocabulary — expressing thanks",
            steps: [
              "'Grateful' = feeling or showing thanks for something done.",
              "'We are grateful for everything she has done' = we appreciate all her efforts.",
              "Context: planning a farewell party to show appreciation → they are grateful.",
            ],
            tip: "'Grateful FOR something' = thankful for what someone has done. Very common expression.",
          },
        },
        {
          id: "hp_d_q25",
          type: "A",
          topic: "VocabCloze",
          questionNumber: 25,
          marks: 1,
          blankNumber: 25,
          stem: "We want to (25) _______ our appreciation to Mrs Tan",
          answer: "show",
          solution: {
            method: "Collocation — 'show appreciation'",
            steps: [
              "'Show appreciation' = demonstrate/express thankfulness.",
              "'Show our appreciation' is the standard English phrase.",
              "Other collocations: express appreciation, demonstrate appreciation.",
            ],
            tip: "'Show appreciation' = demonstrate how thankful you are. 'Show' is the natural verb here.",
          },
        },
        {
          id: "hp_d_q26",
          type: "A",
          topic: "VocabCloze",
          questionNumber: 26,
          marks: 1,
          blankNumber: 26,
          stem: "invite some of her (26) _______ whom she has taught before",
          answer: "students",
          solution: {
            method: "Context — who a teacher has taught",
            steps: [
              "Mrs Tan is a teacher. The people she has 'taught before' are her STUDENTS.",
              "'Former students' or 'students she has taught before'.",
              "'Students' is the logical answer.",
            ],
            tip: "A teacher teaches STUDENTS. 'Students whom she has taught before' = former students/pupils.",
          },
        },
        {
          id: "hp_d_q27",
          type: "A",
          topic: "VocabCloze",
          questionNumber: 27,
          marks: 1,
          blankNumber: 27,
          stem: "she will enjoy the (27) _______ that we are going to plan for her",
          answer: "party",
          solution: {
            method: "Context — what they are planning",
            steps: [
              "The passage states: 'planning a farewell party for her at the canteen'.",
              "The (27) refers back to this farewell party.",
              "'Party' = the event being planned for Mrs Tan.",
            ],
            tip: "The passage already mentioned 'a farewell party' — (27) refers back to this party.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II SECTION E — Editing for Spelling (5 × 1 m = 5 m)
    // Questions 28–32
    // ─────────────────────────────────────────────
    {
      id: "secE",
      name: "Part II Section E: Editing for Spelling",
      topic: "Editing",
      marks: 5,
      passage: {
        title: "Vincent van Gogh",
        text: `Vincent van Gogh was not always considered as one of the greatest painters of all time. People used to laugh at his paintings as they were (28)[diferent] from the other paintings they had seen. He only sold one of his (29)[beutiful] paintings during his lifetime. But now, many people around the world (30)[celeberate] the life and work of Vincent van Gogh. People visit (31)[musuems] and galleries just to see his art. They love to admire his paintings, (32)[espacially] a painting which he named "The Starry Night". It is one of the most famous paintings in the world and is printed on many items such as mugs, magnets and postcards.`,
      },
      questions: [
        {
          id: "hp_e_q28",
          type: "A",
          topic: "Editing",
          questionNumber: 28,
          marks: 1,
          stem: "they were (28)[diferent] from the other paintings",
          errorType: "spelling",
          errorWord: "diferent",
          answer: "different",
          solution: {
            method: "Spelling — 'different' (double f)",
            steps: [
              "Correct: d-i-f-f-e-r-e-n-t.",
              "'diferent' is missing one 'f'.",
              "Remember: dif-fer-ent (double 'f').",
            ],
            tip: "DIFFERENT = double 'f'. Common spelling mistake: 'diferent' (single f is wrong).",
          },
        },
        {
          id: "hp_e_q29",
          type: "A",
          topic: "Editing",
          questionNumber: 29,
          marks: 1,
          stem: "one of his (29)[beutiful] paintings",
          errorType: "spelling",
          errorWord: "beutiful",
          answer: "beautiful",
          solution: {
            method: "Spelling — 'beautiful'",
            steps: [
              "Correct: b-e-a-u-t-i-f-u-l.",
              "'beutiful' misses the 'a' after 'be': beau- not beu-.",
              "Remember: beau-ti-ful.",
            ],
            tip: "BEAUTIFUL = beau-ti-ful. Remember 'beau' (French for handsome) is at the start.",
          },
        },
        {
          id: "hp_e_q30",
          type: "A",
          topic: "Editing",
          questionNumber: 30,
          marks: 1,
          stem: "people around the world (30)[celeberate] the life and work",
          errorType: "spelling",
          errorWord: "celeberate",
          answer: "celebrate",
          solution: {
            method: "Spelling — 'celebrate'",
            steps: [
              "Correct: c-e-l-e-b-r-a-t-e.",
              "'celeberate' has an extra 'e': cele-ber-ate vs cele-brate.",
              "There is no 'e' between 'b' and 'r': cel-e-brate not cel-e-ber-ate.",
            ],
            tip: "CELEBRATE = cel-e-brate. No 'e' between 'b' and 'r'. Not 'celeberate'.",
          },
        },
        {
          id: "hp_e_q31",
          type: "A",
          topic: "Editing",
          questionNumber: 31,
          marks: 1,
          stem: "People visit (31)[musuems] and galleries",
          errorType: "spelling",
          errorWord: "musuems",
          answer: "museums",
          solution: {
            method: "Spelling — 'museums'",
            steps: [
              "Correct: m-u-s-e-u-m-s.",
              "'musuems' has the vowels in wrong order: muse-um not musu-em.",
              "Remember: mu-SE-um (the 'e' comes before 'u' in the second syllable).",
            ],
            tip: "MUSEUM = mu-se-um. The order is s-e-u, not s-u-e. 'musuems' is wrong.",
          },
        },
        {
          id: "hp_e_q32",
          type: "A",
          topic: "Editing",
          questionNumber: 32,
          marks: 1,
          stem: "his paintings, (32)[espacially] a painting which he named",
          errorType: "spelling",
          errorWord: "espacially",
          answer: "especially",
          solution: {
            method: "Spelling — 'especially'",
            steps: [
              "Correct: e-s-p-e-c-i-a-l-l-y.",
              "'espacially' starts with 'es-pa-' but correct is 'es-pe-': es-PEC-ially.",
              "Remember: e-SPEC-ially — the root is 'special': special → especially.",
            ],
            tip: "ESPECIALLY = e-spec-ially. From 'special'. Not 'espacially' (wrong vowel after 'es').",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II SECTION F — Synthesis (2 × 1 m = 2 m)
    // Questions 33–34
    // ─────────────────────────────────────────────
    {
      id: "secF",
      name: "Part II Section F: Synthesis",
      topic: "SentenceCombining",
      marks: 2,
      questions: [
        {
          id: "hp_f_q33",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 33,
          marks: 1,
          stem: "The show was entertaining. Everyone enjoyed the show.\n\nRewrite using: _____________________ because _____________________",
          answer: "Everyone enjoyed the show because it was entertaining.",
          solution: {
            method: "Combining with 'because' — cause and effect",
            steps: [
              "'Because' introduces the reason.",
              "Effect: everyone enjoyed the show. Cause: it was entertaining.",
              "Everyone enjoyed the show because it was entertaining.",
              "Note: 'the show' → 'it' to avoid repetition.",
            ],
            tip: "[Effect] because [Cause]. Enjoyed the show BECAUSE it was entertaining.",
          },
        },
        {
          id: "hp_f_q34",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 34,
          marks: 1,
          stem: "David wanted the toy robot badly. David did not have enough money to buy it.\n\nRewrite using: _____________________ but _____________________",
          answer: "David wanted the toy robot badly but he did not have enough money to buy it.",
          solution: {
            method: "Contrast using 'but'",
            steps: [
              "'But' connects two contrasting ideas.",
              "He wanted it badly (positive desire) BUT couldn't buy it (negative obstacle).",
              "David wanted the toy robot badly but he did not have enough money to buy it.",
            ],
            tip: "'But' = contrast. He WANTED it BUT couldn't afford it.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II SECTION G — Comprehension 1 (8 m)
    // Questions 35–42: Ted, Dave and the Seal
    // ─────────────────────────────────────────────
    {
      id: "secG",
      name: "Part II Section G (C): Comprehension 1",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "Ted, Dave and the Seal",
        text: `Ted loved walking along the beach. After he had finished his dinner, he put on a jacket. Together with his dog, Dave, they went out for a walk. The strong wind blew against his face and the weather was cold.

The beach was only two kilometres from Ted's house, but the wind was blowing so strongly that it took him almost thirty minutes to reach there. When Ted finally arrived at the beach, he heard the sound of the waves breaking on the shore. The stormy weather made the waves huge that night. Dave barked in excitement as the seawater rushed towards the shore.

As they walked along the beach, Ted suddenly heard something in the water 'barking' back. At first, Ted thought there was another dog in the water. He spotted a tiny head with two big eyes, popping out in between the waves and took a closer look. Then, he saw two tiny ears and realised that it was a seal.

The seal had entangled itself in the large leaves of a brown sea plant. As the waves were too strong, it was unable to free itself. Ted did not know how to help the seal as he was not a good swimmer.

Suddenly, Dave jumped into the water and swam towards the new-found "friend". After Dave pulled at the plant vigorously, the seal managed to break free and swim away. Dave swam back to shore. Ted hugged Dave and praised his clever dog.

(Adapted from 'The Seal and the Storm')`,
      },
      questions: [
        {
          id: "hp_g_q35",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 35,
          marks: 1,
          stem: "Ted wore a jacket as ____________.",
          options: [
            { label: "1", text: "the weather was cold" },
            { label: "2", text: "the beach was far away" },
            { label: "3", text: "he loved walking along the beach" },
          ],
          answer: "1",
          solution: {
            method: "Locate reason from text",
            steps: [
              "Passage: 'The strong wind blew against his face and the weather was cold.'",
              "He wore a jacket because the weather was cold.",
              "Option 2: The beach was 2km away — not a reason for wearing a jacket.",
              "Option 3: Loving walks doesn't require a jacket.",
            ],
            tip: "The jacket = protection from cold weather. The text states 'the weather was cold'.",
          },
        },
        {
          id: "hp_g_q36",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 36,
          marks: 1,
          stem: "____________ made Dave bark in excitement at the beach.",
          options: [
            { label: "1", text: "Large leaves of a brown sea plant" },
            { label: "2", text: "Seawater rushing towards the shore" },
            { label: "3", text: "The 'dog' with two big eyes swimming in the sea" },
          ],
          answer: "2",
          solution: {
            method: "Locate specific cause",
            steps: [
              "Passage: 'Dave barked in excitement as the seawater rushed towards the shore.'",
              "The seawater rushing toward the shore caused Dave's excitement and barking.",
              "Option 1: Sea plant — for entangling the seal, not causing Dave to bark.",
              "Option 3: The seal was discovered later.",
            ],
            tip: "The 'as' clause tells you the cause: Dave barked AS (when) the seawater rushed towards shore.",
          },
        },
        {
          id: "hp_g_q37",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 37,
          marks: 1,
          stem: "Why was the seal unable to swim freely?",
          options: [
            { label: "1", text: "The seal was not a good swimmer." },
            { label: "2", text: "The wind was blowing too strongly." },
            { label: "3", text: "The seal was entangled in the sea plant." },
          ],
          answer: "3",
          solution: {
            method: "Locate specific reason",
            steps: [
              "Passage: 'The seal had entangled itself in the large leaves of a brown sea plant. As the waves were too strong, it was unable to free itself.'",
              "The seal was trapped/entangled in the sea plant.",
              "Option 1: Ted was not a good swimmer — not the seal.",
              "Option 2: The strong waves are mentioned but the direct cause is the entanglement.",
            ],
            tip: "The seal was ENTANGLED in sea plant leaves — this prevented it from swimming freely.",
          },
        },
        {
          id: "hp_g_q38",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 38,
          marks: 1,
          stem: "Ted and Dave went for a walk in the morning. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — time of walk",
            steps: [
              "Passage: 'After he had finished his dinner, he put on a jacket…they went out for a walk.'",
              "After dinner = evening/night, not morning.",
              "Also: 'The stormy weather made the waves huge THAT NIGHT.' → confirms it was at night.",
              "FALSE.",
            ],
            tip: "'After dinner' + 'that night' = evening walk, NOT morning. FALSE.",
          },
        },
        {
          id: "hp_g_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 1,
          stem: "Ted saw the seal's ears first. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — sequence of what Ted noticed",
            steps: [
              "Passage: 'He spotted a tiny head with two big eyes, popping out in between the waves and took a closer look. Then, he saw two tiny ears…'",
              "Ted saw the HEAD and BIG EYES first, THEN the tiny ears.",
              "He did NOT see the ears first. FALSE.",
            ],
            tip: "Sequence: head + big eyes FIRST, THEN tiny ears. Ted saw ears SECOND, not first. FALSE.",
          },
        },
        {
          id: "hp_g_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 1,
          stem: "What does the word 'there' in the second paragraph refer to?",
          answer: "The beach",
          solution: {
            method: "Pronoun reference — 'there'",
            steps: [
              "Paragraph 2: 'it took him almost thirty minutes to reach there'.",
              "Where was Ted going? To the beach (mentioned in paragraph 1).",
              "'There' = the beach.",
            ],
            tip: "'There' refers back to the destination mentioned earlier — the beach.",
          },
        },
        {
          id: "hp_g_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 1,
          stem: "Which sentence in the last paragraph tells you that Ted was happy with Dave?",
          answer: "Ted hugged Dave and praised his clever dog.",
          solution: {
            method: "Locate sentence showing happiness",
            steps: [
              "Last paragraph: 'Ted hugged Dave and praised his clever dog.'",
              "Hugging and praising = signs of happiness and affection.",
              "This sentence shows Ted was happy with Dave's brave action.",
            ],
            tip: "Hugging + praising = Ted was happy with Dave. Quote the exact sentence from the passage.",
          },
        },
        {
          id: "hp_g_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 1,
          stem: "Put a tick (✓) next to the word that best describes Dave. Dave is ____________.",
          options: ["timid", "brave", "disobedient"],
          answer: "brave",
          solution: {
            method: "Character trait inference",
            steps: [
              "Dave 'jumped into the water' despite the stormy waves to help the seal.",
              "This is a daring/courageous act = BRAVE.",
              "'Timid' = shy/easily frightened — opposite of jumping into stormy water.",
              "'Disobedient' = not following orders — Dave was helping, not misbehaving.",
            ],
            tip: "Jumping into stormy water to rescue a seal = BRAVE. Dave showed courage.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II SECTION H — Comprehension 2 (8 m)
    // Questions 43–49: Fiona's Friends
    // ─────────────────────────────────────────────
    {
      id: "secH",
      name: "Part II Section H: Comprehension 2",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "Fiona's Friends",
        text: `Fiona was the most popular girl in her class. She was kind and friendly to her classmates. She invited the whole class to her birthday party and gave everyone presents. She had so many friends but she did not have a true friend.

One day, everything changed. Mrs Lim, their teacher told the class to make three presents to give to three true friends. The students were having a great time making gifts.

When the students had shared out all their presents, Fiona was the only one who had not received one! She felt terrible and cried bitterly. How could it be possible? She had so many friends. One by one, her classmates consoled her, each spending a short time with her and then they left her alone.

When she got home, she cried and asked her mother where she could find true friends.

"If you really want true friends, you will have to spend more time with your friends. You must show care for them and always be available, during good times and bad times," advised her mother.

"But I want to be everybody's friend!" Fiona protested.

"There just isn't enough time to be available for everyone, so it's only possible to have a few true friends. The others will be playmates but they won't be your true friends," said her mother, wisely.

Fiona realised that she had been a good companion to everyone but not a true friend to anyone. That night, she decided to change her ways so that she could finally have some true friends.

(Adapted from Fiona Famous written by Pedro Pablo Sacristán)`,
      },
      questions: [
        {
          id: "hp_h_q43",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 43,
          marks: 1,
          stem: "Fiona had many friends because she ____________.",
          options: [
            { label: "1", text: "was kind and friendly" },
            { label: "2", text: "enjoyed giving presents" },
            { label: "3", text: "spent time with each of them" },
          ],
          answer: "1",
          solution: {
            method: "Locate reason for popularity",
            steps: [
              "Passage: 'She was kind and friendly to her classmates.'",
              "Being kind and friendly = reason she had many friends.",
              "Option 2: She did give presents, but this is not stated as the reason for having many friends.",
              "Option 3: She did NOT spend time with each friend — this is what she lacked (true friendship).",
            ],
            tip: "The passage states WHY she was popular: 'kind and friendly to her classmates'. This = Option 1.",
          },
        },
        {
          id: "hp_h_q44",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 44,
          marks: 1,
          stem: "The word 'it' in paragraph 3 refers to Fiona not ____________.",
          options: [
            { label: "1", text: "feeling good" },
            { label: "2", text: "receiving a present" },
            { label: "3", text: "having three true friends" },
          ],
          answer: "2",
          solution: {
            method: "Pronoun reference — 'it'",
            steps: [
              "Paragraph 3: 'How could it be possible? She had so many friends.'",
              "What seemed impossible? That she received NO present despite having so many friends.",
              "'It' refers to the fact that she did not receive a present (when everyone else did).",
              "Option 2: 'receiving a present' = Fiona was the ONLY one who did NOT receive one. ✓",
            ],
            tip: "'It' refers to not receiving a present being possible despite having so many friends.",
          },
        },
        {
          id: "hp_h_q45",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 45,
          marks: 1,
          stem: "Fiona's classmates spent a long time to console her. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — duration of consolation",
            steps: [
              "Passage: 'One by one, her classmates consoled her, each spending a SHORT TIME with her and then they left her alone.'",
              "Her classmates spent a SHORT time — not a long time.",
              "FALSE.",
            ],
            tip: "Key word: 'a SHORT time with her'. The statement says 'long time' = FALSE.",
          },
        },
        {
          id: "hp_h_q46",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 46,
          marks: 1,
          stem: "Fiona's classmates did not like her. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — classmates' feelings",
            steps: [
              "Fiona was 'the most popular girl in her class' and was 'kind and friendly'.",
              "Her classmates DID like her — she had many friends.",
              "The issue was that she didn't have TRUE friends (deep friendships), not that they disliked her.",
              "FALSE.",
            ],
            tip: "Most popular girl = classmates liked her. She lacked TRUE friends, not friends in general. FALSE.",
          },
        },
        {
          id: "hp_h_q47",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 47,
          marks: 1,
          stem: "Fiona was not a true friend to any of her classmates. TRUE or FALSE?",
          answer: "TRUE",
          solution: {
            method: "True/False — nature of Fiona's relationships",
            steps: [
              "Passage: 'Fiona realised that she had been a good companion to everyone but NOT A TRUE FRIEND to anyone.'",
              "This directly states she was not a true friend to any of her classmates.",
              "TRUE.",
            ],
            tip: "Directly stated: 'not a true friend to anyone'. TRUE.",
          },
        },
        {
          id: "hp_h_q48",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 48,
          marks: 1,
          stem: "Write 1, 2 and 3 in the boxes to arrange these events in the order they occurred.",
          subEvents: [
            "Fiona's classmates did not give her any presents.",
            "Fiona gave all her classmates presents on her birthday.",
            "Fiona decided to change her ways so she could have true friends.",
          ],
          answer: {
            "Fiona's classmates did not give her any presents.": "2",
            "Fiona gave all her classmates presents on her birthday.": "1",
            "Fiona decided to change her ways so she could have true friends.": "3",
          },
          solution: {
            method: "Sequence of events",
            steps: [
              "1: Fiona gave classmates presents at her birthday party (paragraph 1).",
              "2: Classmates made gifts and Fiona received none (paragraph 3).",
              "3: Fiona decided to change her ways (final paragraph).",
            ],
            tip: "Follow story chronology: birthday party → gift-making day → Fiona's resolution.",
          },
        },
        {
          id: "hp_h_q49a",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: "49a",
          marks: 1,
          stem: "List two things Fiona's mother advised her to do to find true friends. (a)",
          answer: "She should spend more time with her friends.",
          solution: {
            method: "Locate specific advice from passage",
            steps: [
              "Mother's advice: 'you will have to SPEND MORE TIME with your friends.'",
              "This is the first piece of advice.",
            ],
            tip: "First advice: spend more time with friends. Quote/paraphrase from the mother's speech.",
          },
        },
        {
          id: "hp_h_q49b",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: "49b",
          marks: 1,
          stem: "List two things Fiona's mother advised her to do to find true friends. (b)",
          answer: "She must show care for them and always be available during good times and bad times.",
          solution: {
            method: "Locate second piece of advice",
            steps: [
              "Mother's advice: 'You must SHOW CARE for them and always BE AVAILABLE, during good times and bad times.'",
              "This is the second piece of advice — showing care and being available.",
            ],
            tip: "Second advice: show care AND be available in good and bad times. Both parts count.",
          },
        },
      ],
    },
  ],
};

export default paper;
