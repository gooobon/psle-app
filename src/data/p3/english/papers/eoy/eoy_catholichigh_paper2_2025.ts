// src/data/p3/english/papers/eoy_catholichigh_paper2_2025.ts
// Catholic High School (Primary) — Primary 3 English Language Practice Paper 2
// Sections: Grammar MCQ (A·8q), Vocabulary MCQ (B·6q),
//           Grammar Cloze prepositions (C·4q), Grammar Cloze bracket (D·4q),
//           Vocabulary Cloze (E·3q), Editing Spelling (F·5q),
//           Comprehension Cloze open (G·4q),
//           Comprehension Selected Response + OE (H·8m),
//           Comprehension Open-Ended (I·4×2m)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_catholichigh_paper2_2025",
  school: "Catholic High School (Primary)",
  level: "P3",
  subject: "English",
  paperType: "Practice Paper 2",
  year: 2025,
  totalMarks: 50,
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — Grammar MCQ (8 × 1 m = 8 m)
    // ─────────────────────────────────────────────
    {
      id: "secA",
      name: "Section A: Grammar MCQ",
      topic: "GrammarMCQ",
      marks: 8,
      questions: [
        {
          id: "ch2_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: "Ali and his sister ____________ to school every day.",
          options: [
            { label: "1", text: "cycle" },
            { label: "2", text: "cycles" },
            { label: "3", text: "cycled" },
            { label: "4", text: "cycling" },
          ],
          answer: "1",
          solution: {
            method: "Simple present — plural subject + habitual action",
            steps: [
              "'Every day' = regular habit → simple present tense.",
              "Subject: 'Ali and his sister' = TWO people = plural subject.",
              "Plural subject + simple present = base form: 'cycle'.",
              "'cycles' = singular third person (she cycles).",
              "'cycled' = past tense.",
            ],
            tip: "Ali AND his sister = plural → CYCLE (base form). Singular (she) → cycles.",
          },
        },
        {
          id: "ch2_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "Jun Xian ____________ a song during the school's upcoming concert this November.",
          options: [
            { label: "1", text: "sing" },
            { label: "2", text: "sings" },
            { label: "3", text: "was singing" },
            { label: "4", text: "will be singing" },
          ],
          answer: "4",
          solution: {
            method: "Future continuous — planned future event",
            steps: [
              "'This November' + 'upcoming concert' = future event.",
              "Singing in a concert is a PLANNED, scheduled activity in the future.",
              "'Will be singing' = future continuous for a planned future action. ✓",
              "'sings' = present simple (habit) — wrong for a future event.",
              "'was singing' = past continuous — wrong.",
            ],
            tip: "Upcoming concert + this November = future. WILL BE SINGING = planned future action.",
          },
        },
        {
          id: "ch2_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: "Helen and Hannah share a room. The room is ____________.",
          options: [
            { label: "1", text: "its" },
            { label: "2", text: "hers" },
            { label: "3", text: "ours" },
            { label: "4", text: "theirs" },
          ],
          answer: "4",
          solution: {
            method: "Possessive pronouns — two people sharing",
            steps: [
              "The room belongs to BOTH Helen and Hannah = two people = 'their' room.",
              "Possessive pronoun for 'their' (used alone, no noun) = 'theirs'.",
              "'hers' = singular female — only one person's.",
              "'ours' = includes the speaker (we).",
              "'its' = for things/animals.",
            ],
            tip: "Two people sharing → THEIRS. The room is theirs (belonging to Helen AND Hannah).",
          },
        },
        {
          id: "ch2_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "After taking so much time to complete her art project, Alisha had ____________ time left to do other work as it was time for bed.",
          options: [
            { label: "1", text: "little" },
            { label: "2", text: "many" },
            { label: "3", text: "some" },
            { label: "4", text: "several" },
          ],
          answer: "1",
          solution: {
            method: "Quantifiers — uncountable 'time' + insufficient amount",
            steps: [
              "'Time' = uncountable noun.",
              "She spent so much time on art that there was NOT MUCH time left.",
              "'Little' = a small amount (uncountable) — correct for 'not much time left'.",
              "'Many' and 'several' are for countable nouns.",
              "'Some' = a certain amount — doesn't convey insufficient time.",
            ],
            tip: "'Little time' = not much time left. For uncountable nouns: little (not much) / some (a certain amount) / much (a lot).",
          },
        },
        {
          id: "ch2_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: "All the children ____________ present for Uncle Lim's 80th birthday celebration last night.",
          options: [
            { label: "1", text: "is" },
            { label: "2", text: "are" },
            { label: "3", text: "was" },
            { label: "4", text: "were" },
          ],
          answer: "4",
          solution: {
            method: "Past tense + plural subject",
            steps: [
              "'Last night' = past tense context.",
              "'All the children' = plural subject.",
              "Past tense + plural = 'were'.",
              "'was' = past tense singular.",
              "'is/are' = present tense.",
            ],
            tip: "Last night + all the children (plural) → WERE present.",
          },
        },
        {
          id: "ch2_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: "Ken has been learning to play the piano ____________ he was four years old. He will be taking his Grade 8 examination soon.",
          options: [
            { label: "1", text: "if" },
            { label: "2", text: "so" },
            { label: "3", text: "from" },
            { label: "4", text: "since" },
          ],
          answer: "4",
          solution: {
            method: "Present perfect continuous + 'since' for start point",
            steps: [
              "'Has been learning' = present perfect continuous — started in the past, continuing now.",
              "'Since' marks the starting point of an ongoing action.",
              "'Since he was four years old' = he started at age 4 and is still learning now.",
              "'From' can mark a starting point but is less natural with present perfect: 'since' is preferred.",
            ],
            tip: "Has been + SINCE [starting point]. 'Has been learning SINCE he was four' = started at 4, still continues.",
          },
        },
        {
          id: "ch2_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: '"Look up there! ____________ is Sheena\'s father performing a parachute jump for the National Day Parade," exclaimed Nasrin.',
          options: [
            { label: "1", text: "This" },
            { label: "2", text: "That" },
            { label: "3", text: "These" },
            { label: "4", text: "Those" },
          ],
          answer: "2",
          solution: {
            method: "Demonstrative pronoun — singular + far (up in the sky)",
            steps: [
              "Sheena's father = one person = singular.",
              "'Look up there!' = the father is UP IN THE SKY = far from the speaker.",
              "Far + singular = 'That'.",
              "'This' = near + singular.",
              "'Those/These' = plural.",
            ],
            tip: "'Look up there!' = the father is far away (in the sky). Singular + far = THAT.",
          },
        },
        {
          id: "ch2_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "The car ____________ off immediately when the traffic lights turned green.",
          options: [
            { label: "1", text: "sped" },
            { label: "2", text: "speed" },
            { label: "3", text: "speeds" },
            { label: "4", text: "speeding" },
          ],
          answer: "1",
          solution: {
            method: "Past tense — 'when the lights turned green'",
            steps: [
              "'When the traffic lights turned green' = past tense context.",
              "'Sped off' = past tense of 'speed off' (phrasal verb: speed → sped).",
              "Irregular past: speed → sped.",
              "'speed/speeds' = present tense.",
              "'speeding' = present participle — needs auxiliary.",
            ],
            tip: "Speed → SPED (irregular past). 'The car SPED off' = drove away very quickly in the past.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — Vocabulary MCQ (6 × 1 m = 6 m)
    // ─────────────────────────────────────────────
    {
      id: "secB",
      name: "Section B: Vocabulary MCQ",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "ch2_b_q9",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 9,
          marks: 1,
          stem: '"Please ____________ your shoes and keep them in the shoe cabinet," Mrs Lim told her guests politely.',
          options: [
            { label: "1", text: "take on" },
            { label: "2", text: "take up" },
            { label: "3", text: "take off" },
            { label: "4", text: "take down" },
          ],
          answer: "3",
          solution: {
            method: "Phrasal verbs with 'take'",
            steps: [
              "'Take off shoes' = remove shoes from feet.",
              "Guests are asked to remove shoes and put them in the cabinet.",
              "'Take off' = remove (clothing, shoes, etc.).",
              "'Take on' = accept a task or employ someone.",
              "'Take up' = start a hobby / use space.",
              "'Take down' = write down / lower something.",
            ],
            tip: "TAKE OFF shoes = remove shoes. Very common: 'Please take off your shoes at the door.'",
          },
        },
        {
          id: "ch2_b_q10",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 10,
          marks: 1,
          stem: '"You should ____________ your right fist and place it on the left side of your chest while saying the pledge," the teacher reminded the pupils.',
          options: [
            { label: "1", text: "grab" },
            { label: "2", text: "slam" },
            { label: "3", text: "clench" },
            { label: "4", text: "squeeze" },
          ],
          answer: "3",
          solution: {
            method: "Vocabulary — hand/fist gesture",
            steps: [
              "The pledge position requires curling fingers tightly into a fist.",
              "'Clench' = close tightly (especially a fist or teeth).",
              "'Clench your fist' = make a tight fist — the correct gesture for reciting the pledge.",
              "'Grab' = take hold of something quickly.",
              "'Slam' = hit forcefully against something.",
              "'Squeeze' = press together — not specific enough for a fist.",
            ],
            tip: "'Clench your fist' = close your hand tightly into a fist. Used for pledges and showing determination.",
          },
        },
        {
          id: "ch2_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "My father bought a ____________ of drawers to organise his study area.",
          options: [
            { label: "1", text: "pack" },
            { label: "2", text: "flight" },
            { label: "3", text: "batch" },
            { label: "4", text: "chest" },
          ],
          answer: "4",
          solution: {
            method: "Collective noun — furniture item",
            steps: [
              "'A chest of drawers' = a piece of furniture with multiple drawers for storage.",
              "This is a fixed English noun phrase for this type of furniture.",
              "'Pack' = a group/bundle.",
              "'Flight' = a set of stairs / birds flying / airplane journey.",
              "'Batch' = a group produced at one time.",
            ],
            tip: "'Chest of drawers' is the fixed English term for a piece of furniture with multiple drawers.",
          },
        },
        {
          id: "ch2_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "The ____________ will be coming tomorrow to repair the burst water pipes.",
          options: [
            { label: "1", text: "cobbler" },
            { label: "2", text: "plumber" },
            { label: "3", text: "electrician" },
            { label: "4", text: "technician" },
          ],
          answer: "2",
          solution: {
            method: "Vocabulary — professions and their work",
            steps: [
              "Repairing water pipes is the job of a PLUMBER.",
              "'Plumber' = a person who installs and repairs water pipes and plumbing systems.",
              "'Cobbler' = repairs shoes.",
              "'Electrician' = repairs electrical systems/wiring.",
              "'Technician' = a general technical worker — not specific to pipes.",
            ],
            tip: "Plumber = fixes water pipes and plumbing. Cobbler = fixes shoes. Electrician = fixes electrical wires.",
          },
        },
        {
          id: "ch2_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "It was ____________ of Mandy to give up her seat to the lady with an injured leg.",
          options: [
            { label: "1", text: "diligent" },
            { label: "2", text: "grateful" },
            { label: "3", text: "responsible" },
            { label: "4", text: "considerate" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — describing thoughtful behaviour",
            steps: [
              "Giving up one's seat for an injured person = thinking about others' needs.",
              "'Considerate' = thinking about others' feelings and needs; thoughtful.",
              "'Diligent' = hardworking.",
              "'Grateful' = thankful.",
              "'Responsible' = reliable, doing one's duties.",
            ],
            tip: "'Considerate' = thinking about others. Giving up a seat for an injured person is a considerate act.",
          },
        },
        {
          id: "ch2_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: "All children are reminded to ____________ their seat belts when they travel in school buses.",
          options: [
            { label: "1", text: "bind" },
            { label: "2", text: "click" },
            { label: "3", text: "fasten" },
            { label: "4", text: "connect" },
          ],
          answer: "3",
          solution: {
            method: "Vocabulary collocation — seat belts",
            steps: [
              "'Fasten seat belts' = the standard English expression for securing seat belts.",
              "Also: 'buckle up' is another common expression.",
              "'Fasten your seat belt' is heard in all transportation (planes, buses, cars).",
              "'Bind' = tie together.",
              "'Click' = make a clicking sound (informal) — 'click' your seat belt is possible but 'fasten' is more standard.",
              "'Connect' = join two things — not standard for seat belts.",
            ],
            tip: "'Fasten your seat belt' is the standard safety instruction. Also acceptable: buckle up.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — Grammar Cloze: Prepositions (4 × 1 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secC",
      name: "Section C: Grammar Cloze (Prepositions)",
      topic: "GrammarCloze",
      marks: 4,
      passage: {
        title: "Mae Carol Jemison — Astronaut",
        text: `Mae Carol Jemison was born in 1956. When she was a child, she dreamt of travelling into space. She grew (15) _______ and became famous (16) _______ making that dream come true.

In school, Mae studied hard and did very well in all her subjects. She loved reading, especially (17) _______ the stars and studied how living things move about in space. In 1992, Mae was the first African American female to fly (18) _______ space. Today, she is a successful astronaut.

(Adapted from https://www.education.com/workbooks/independent/)`,
        wordBank: [
          { letter: "A", word: "about" },
          { letter: "B", word: "among" },
          { letter: "C", word: "for" },
          { letter: "D", word: "into" },
          { letter: "E", word: "of" },
          { letter: "F", word: "up" },
        ],
      },
      questions: [
        {
          id: "ch2_c_q15",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 15,
          marks: 1,
          blankNumber: 15,
          stem: "She grew (15) _______ and became famous",
          answer: "F",
          answerWord: "up",
          solution: {
            method: "Phrasal verb — 'grow up'",
            steps: [
              "'Grow up' = become an adult.",
              "'She grew up and became famous' = she matured and then became famous.",
              "Fixed phrasal verb: grow UP (not grow about/into/of).",
            ],
            tip: "'Grow up' = to become an adult. 'She grew up and achieved her dream.'",
          },
        },
        {
          id: "ch2_c_q16",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 16,
          marks: 1,
          blankNumber: 16,
          stem: "became famous (16) _______ making that dream come true",
          answer: "C",
          answerWord: "for",
          solution: {
            method: "Preposition collocation — 'famous for'",
            steps: [
              "'Be famous for' = well-known because of something.",
              "'Famous for making that dream come true' = known for achieving it.",
              "Fixed collocation: famous FOR (not famous about/of).",
            ],
            tip: "'Famous FOR something' is the fixed phrase. She is famous FOR making her dream come true.",
          },
        },
        {
          id: "ch2_c_q17",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 17,
          marks: 1,
          blankNumber: 17,
          stem: "She loved reading, especially (17) _______ the stars",
          answer: "A",
          answerWord: "about",
          solution: {
            method: "Preposition — 'reading about'",
            steps: [
              "'Reading about something' = reading material related to that topic.",
              "'Reading about the stars' = reading books/articles about stars/astronomy.",
              "'Read about' is a fixed collocation.",
            ],
            tip: "'Read ABOUT something' = read on a topic. She read about the stars = she read astronomy books.",
          },
        },
        {
          id: "ch2_c_q18",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 18,
          marks: 1,
          blankNumber: 18,
          stem: "Mae was the first African American female to fly (18) _______ space.",
          answer: "D",
          answerWord: "into",
          solution: {
            method: "Preposition of movement — entering space",
            steps: [
              "'Fly into space' = travel upward and enter outer space.",
              "'Into' indicates movement from one place to another (Earth → space).",
              "'In space' = already there (location). 'Into space' = movement toward/entering space.",
            ],
            tip: "'Fly INTO space' = travel and enter outer space. 'Into' = movement toward/entering a new place.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — Grammar Cloze: Choose from brackets (4 × 1 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secD",
      name: "Section D: Grammar Cloze (Bracket choices)",
      topic: "GrammarCloze",
      marks: 4,
      passage: {
        title: "Wombats",
        text: `Wombats look like bears but are related to koalas and kangaroos. Like kangaroos, wombats (19) [spend / spends] most of their time grazing. They (20) [use / uses] their rodent-like teeth and strong jaws to grip and tear food such as roots, shoots and even tree bark. The young of a wombat (21) [is / are] called a joey. After birth, it (22) [stay / stays] in the mother's pouch for about ten months. The pouch faces backwards to protect the joey from dirt.

(Adapted from https://animals.sandiegozoo.org/animals/wombat)`,
      },
      questions: [
        {
          id: "ch2_d_q19",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 19,
          marks: 1,
          blankNumber: 19,
          stem: "wombats (19) [spend / spends] most of their time grazing",
          answer: "spend",
          solution: {
            method: "Subject-verb agreement — plural 'wombats'",
            steps: [
              "'Wombats' = plural noun.",
              "Plural subject → base form: 'spend'.",
              "'spends' = singular third person only.",
            ],
            tip: "Wombats (plural) → SPEND. Singular (the wombat) → spends.",
          },
        },
        {
          id: "ch2_d_q20",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 20,
          marks: 1,
          blankNumber: 20,
          stem: "They (20) [use / uses] their rodent-like teeth",
          answer: "use",
          solution: {
            method: "Subject-verb agreement — 'They'",
            steps: [
              "Subject: 'They' (referring to wombats) = plural.",
              "Plural → base form: 'use'.",
              "'uses' = for He/She/It (singular).",
            ],
            tip: "They (plural) → USE (base form). Never 'They uses'.",
          },
        },
        {
          id: "ch2_d_q21",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 21,
          marks: 1,
          blankNumber: 21,
          stem: "The young of a wombat (21) [is / are] called a joey.",
          answer: "is",
          solution: {
            method: "Subject-verb agreement — 'the young'",
            steps: [
              "'The young of a wombat' = one baby (referring to a single animal's offspring).",
              "Context: 'called A joey' (singular indefinite article 'a') confirms singular.",
              "Singular → 'is'.",
            ],
            tip: "'The young of a wombat IS called a joey' — singular baby animal = IS (not are).",
          },
        },
        {
          id: "ch2_d_q22",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 22,
          marks: 1,
          blankNumber: 22,
          stem: "it (22) [stay / stays] in the mother's pouch for about ten months",
          answer: "stays",
          solution: {
            method: "Subject-verb agreement — singular 'it'",
            steps: [
              "Subject: 'it' (the joey) = singular.",
              "Singular third person → 'stays' (add -s).",
              "'stay' = base form (for plural or after auxiliaries).",
            ],
            tip: "It (singular) → STAYS. The joey stays in the pouch.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — Vocabulary Cloze (3 × 1 m = 3 m)
    // ─────────────────────────────────────────────
    {
      id: "secE",
      name: "Section E: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 3,
      passage: {
        title: "The Bundle of Sticks",
        text: `There were four brothers who could not get along with one another. One day, after seeing them quarrel violently, Father tied a bundle of sticks and told them to take (23) _______ to break the sticks. One by one, each brother tried very hard, but no one was able to break a single stick.

Father then (24) _______ the bundle and gave each son one stick. They broke the sticks easily.

"See how (25) _______ the sticks were when they were put together. In the same way, as brothers, all of you should stay united," said Father. The brothers then understood and nodded.

"United we stand, divided we fall," said the eldest son.

(Adapted from https://www.shortkidstories.com/story/aesops-fables/#the_bundle_of_sticks)`,
        wordBank: ["powerful", "strong", "tied", "time", "turns", "untied"],
      },
      questions: [
        {
          id: "ch2_e_q23",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "told them to take (23) _______ to break the sticks",
          answer: "turns",
          solution: {
            method: "Fixed expression — 'take turns'",
            steps: [
              "'Take turns' = each person does something in sequence, one after another.",
              "'One by one, each brother tried' confirms they took turns.",
              "'Take turns to break the sticks' = each brother tried one after another.",
            ],
            tip: "'Take turns' = do something one after another. 'One by one, each brother tried' = they took turns.",
          },
        },
        {
          id: "ch2_e_q24",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "Father then (24) _______ the bundle and gave each son one stick.",
          answer: "untied",
          solution: {
            method: "Context — opposite of tied",
            steps: [
              "Father had TIED the bundle earlier.",
              "Now he undoes the bundle → 'untied' (opposite of tied).",
              "'untied' = removed the binding, separated the sticks.",
              "After untying, he gave each son ONE stick (separate from the bundle).",
            ],
            tip: "'Untied' = removed the binding. Father tied the bundle → then UNTIED it to give separate sticks.",
          },
        },
        {
          id: "ch2_e_q25",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 25,
          marks: 1,
          blankNumber: 25,
          stem: '"See how (25) _______ the sticks were when they were put together."',
          answer: "strong",
          solution: {
            method: "Context — the lesson of strength in unity",
            steps: [
              "The sticks could not be broken when bundled together.",
              "'Strong' = having great strength — the bundle was too strong to break.",
              "The moral: united = strong, divided = weak.",
              "'Powerful' is close but 'strong' is more natural for describing the sticks.",
            ],
            tip: "'How strong the sticks were when together' = they were unbreakable as a bundle. Strong = cannot be broken.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — Editing for Spelling (5 × 1 m = 5 m)
    // ─────────────────────────────────────────────
    {
      id: "secF",
      name: "Section F: Editing for Spelling",
      topic: "Editing",
      marks: 5,
      passage: {
        title: "De Ming's Report Card",
        text: `De Ming was returning home in the bus. He held his report card and stared at his grades. Even though he knew his parents would be (26)[desappointed], he had to show it to them. (27)[When] he (27)[arived] home, he realised that the report card was not in his (28)[bag]! He must have left it on the bus! When he was (28)[paniking], his mother came (29)[home] and saw the (29)[worryed] look on his face. After finding out what had (30)[happened], De Ming's mother scolded him for being (30)[cairless]. She told him to apologise and explain to his teacher the next day in school.`,
      },
      questions: [
        {
          id: "ch2_f_q26",
          type: "A",
          topic: "Editing",
          questionNumber: 26,
          marks: 1,
          stem: "his parents would be (26)[desappointed]",
          errorType: "spelling",
          errorWord: "desappointed",
          answer: "disappointed",
          solution: {
            method: "Spelling — 'disappointed'",
            steps: [
              "Correct: d-i-s-a-p-p-o-i-n-t-e-d.",
              "'desappointed' starts with 'des-' but should be 'dis-'.",
              "Also: double 'p' in dis-AP-POINTED.",
              "Break it down: dis-ap-point-ed.",
            ],
            tip: "DISAPPOINTED = dis-ap-point-ed. Starts with DIS- (not des-). Double P: dis-APP-ointed.",
          },
        },
        {
          id: "ch2_f_q27",
          type: "A",
          topic: "Editing",
          questionNumber: 27,
          marks: 1,
          stem: "When he (27)[arived] home",
          errorType: "spelling",
          errorWord: "arived",
          answer: "arrived",
          solution: {
            method: "Spelling — 'arrived' (double r)",
            steps: [
              "Correct: a-r-r-i-v-e-d.",
              "'arived' has only one 'r' but correct spelling has double 'r'.",
              "Base word: arrive → arrived.",
              "ar-RIVE → arrived (double 'r').",
            ],
            tip: "ARRIVED = ar-RIVED. Double 'r'. arrive → arrived.",
          },
        },
        {
          id: "ch2_f_q28",
          type: "A",
          topic: "Editing",
          questionNumber: 28,
          marks: 1,
          stem: "When he was (28)[paniking]",
          errorType: "spelling",
          errorWord: "paniking",
          answer: "panicking",
          solution: {
            method: "Spelling — adding '-ing' to words ending in '-ic'",
            steps: [
              "Base word: panic.",
              "When adding '-ing' or '-ed' to words ending in '-ic', add 'k' before the suffix.",
              "panic + ing = panicking (add 'k': panic + k + ing).",
              "'paniking' is missing the 'k' and the double 'c': panic-k-ing = panicking.",
            ],
            tip: "Words ending in -ic + -ing/-ed: add 'k' first. panic → panicking, picnic → picnicking.",
          },
        },
        {
          id: "ch2_f_q29",
          type: "A",
          topic: "Editing",
          questionNumber: 29,
          marks: 1,
          stem: "saw the (29)[worryed] look on his face",
          errorType: "spelling",
          errorWord: "worryed",
          answer: "worried",
          solution: {
            method: "Spelling — 'y' → 'i' before '-ed'",
            steps: [
              "Base word: worry.",
              "When adding '-ed' to words ending in consonant + y, change 'y' to 'i': worry → worried.",
              "'worryed' keeps the 'y' — wrong.",
              "Correct: worri-ed = worried.",
            ],
            tip: "Consonant + y + -ed: change y to i. worry → worr-I-ed. NOT 'worryed'.",
          },
        },
        {
          id: "ch2_f_q30",
          type: "A",
          topic: "Editing",
          questionNumber: 30,
          marks: 1,
          stem: "scolded him for being (30)[cairless]",
          errorType: "spelling",
          errorWord: "cairless",
          answer: "careless",
          solution: {
            method: "Spelling — 'careless'",
            steps: [
              "Correct: c-a-r-e-l-e-s-s.",
              "'cairless' has 'air' in the middle but correct is 'are': care-less.",
              "Base word: care + less = careless.",
              "Double 's' at the end: care-les-s = careless.",
            ],
            tip: "CARELESS = care + less. 'care' not 'cair'. Double 's': care-LESS.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — Comprehension Cloze (4 × 1 m = 4 m)
    // Fill in most suitable word of your own
    // ─────────────────────────────────────────────
    {
      id: "secG",
      name: "Section G: Comprehension Cloze",
      topic: "VocabCloze",
      marks: 4,
      passage: {
        title: "Soccer at the Void Deck",
        text: `Peter and Ahmad wanted to play soccer in the field but it was raining heavily. They decided to play at the void deck. Although they saw the "No Ball Games" sign, they ignored it.

(31) _______ playing for about twenty minutes, they saw a policeman approaching. He immediately (32) _______ them from playing. The policeman pointed to the (33) _______ and told them sternly that they were not (34) _______ to play ball games there.

Peter and Ahmad felt extremely embarrassed. They apologised profusely to the policeman and promised to follow rules in future.`,
      },
      questions: [
        {
          id: "ch2_g_q31",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 31,
          marks: 1,
          blankNumber: 31,
          stem: "(31) _______ playing for about twenty minutes",
          answer: "After",
          solution: {
            method: "Time conjunction — sequence of events",
            steps: [
              "They played for about twenty minutes, THEN saw a policeman.",
              "'After' introduces a completed duration: 'After playing for twenty minutes…'",
              "This means when the twenty minutes were up, something happened.",
            ],
            tip: "'After playing for [time]' = once that duration had passed. 'After playing for 20 minutes, they saw…'",
          },
        },
        {
          id: "ch2_g_q32",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 32,
          marks: 1,
          blankNumber: 32,
          stem: "He immediately (32) _______ them from playing.",
          answer: "stopped",
          solution: {
            method: "Context — policeman's action",
            steps: [
              "A policeman who sees people breaking rules would tell them to STOP.",
              "'Stopped them from playing' = prevented them from continuing.",
              "Fixed phrase: stop someone FROM doing something.",
            ],
            tip: "'Stop someone FROM doing something' = prevent them from continuing. The policeman STOPPED them from playing.",
          },
        },
        {
          id: "ch2_g_q33",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 33,
          marks: 1,
          blankNumber: 33,
          stem: "The policeman pointed to the (33) _______ and told them sternly",
          answer: "sign",
          solution: {
            method: "Context — the 'No Ball Games' sign",
            steps: [
              "The passage mentioned 'the \"No Ball Games\" sign' earlier.",
              "The policeman pointed to this sign to show them why they were wrong.",
              "'Pointed to the sign' = directed attention to the notice they had ignored.",
            ],
            tip: "The 'No Ball Games' SIGN was mentioned earlier. The policeman pointed to that sign.",
          },
        },
        {
          id: "ch2_g_q34",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 34,
          marks: 1,
          blankNumber: 34,
          stem: "they were not (34) _______ to play ball games there.",
          answer: "allowed",
          solution: {
            method: "Context — permission denied",
            steps: [
              "The 'No Ball Games' sign = playing is not permitted.",
              "'Not allowed to play' = not permitted.",
              "The policeman told them they were not ALLOWED (had no permission) to play there.",
            ],
            tip: "'Not allowed to do something' = prohibited / not permitted. They were NOT ALLOWED to play ball games there.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — Comprehension Selected Response + OE (8 m)
    // Passage: Sue Lin and Snowy
    // ─────────────────────────────────────────────
    {
      id: "secH",
      name: "Section H: Comprehension (Selected Response and Open-ended)",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "Sue Lin and Snowy",
        text: `Sue Lin was alone in her bedroom. She muttered to herself, "Where are you, Snowy?" Her mother came in and sat beside her. She stroked her head and consoled her. "Don't worry, sweetheart. We will find it," Sue Lin's mother said.

Every day, Snowy would be waiting at the door for Sue Lin to come home from school. It would greet her by wagging its tail. After Sue Lin finished her homework, Snowy would be all ready to play with her. Snowy seemed to know when Sue Lin felt upset. It would simply sit quietly on her lap. Being the only child, Sue Lin had no sibling to keep her company. Snowy was everything to her. Sue Lin loved her pet dog with all her heart.

One day, Sue Lin came home and realised Snowy was not there at the door. She felt that something was amiss. She found out from her mother that her grandmother had left the door open when she went out to water the plants along the corridor. Snowy had run out of the house on its own and her grandmother had not noticed that.

The family put up notices about the missing dog around the neighbourhood. Sue Lin prayed that Snowy was fine and would return home soon.`,
      },
      questions: [
        {
          id: "ch2_h_q35",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 35,
          marks: 1,
          stem: "Where was Sue Lin when her mother approached her?",
          answer: "Sue Lin was in her bedroom.",
          solution: {
            method: "Locate specific location",
            steps: [
              "Passage: 'Sue Lin was alone in her bedroom.'",
              "Her mother came in and sat beside her — so both were in the bedroom.",
            ],
            tip: "First sentence of the passage: 'Sue Lin was alone in HER BEDROOM.'",
          },
        },
        {
          id: "ch2_h_q36",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 36,
          marks: 1,
          stem: "Which word in the sentence below has the same meaning as 'comforted'? Circle (A) or (B).",
          subText: "She (A) stroked her head and (B) consoled her.",
          answer: "B",
          answerWord: "consoled",
          solution: {
            method: "Vocabulary — synonym of 'comforted'",
            steps: [
              "'Comforted' = made someone feel better when they are sad or upset.",
              "'Consoled' = comforted someone in distress. Direct synonym.",
              "'Stroked' = gently moved hand over (physical action, not the same as comforted).",
            ],
            tip: "'Consoled' = comforted. 'Stroked' = physical touch. 'Consoled' is the closer synonym to 'comforted'.",
          },
        },
        {
          id: "ch2_h_q37",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 37,
          marks: 1,
          stem: "The word 'her' in line 7 refers to ____________. Tick (✓) your answer.",
          options: ["Snowy", "Sue Lin", "Sue Lin's mother"],
          answer: "Sue Lin",
          solution: {
            method: "Pronoun reference — 'her'",
            steps: [
              "Line 7: 'It would simply sit quietly on her lap.'",
              "'Snowy would sit on HER lap' — whose lap? Sue Lin's lap.",
              "Snowy sits on SUE LIN's lap to comfort her when she is upset.",
            ],
            tip: "Line 7: Snowy sat on HER lap to comfort her when she felt upset. 'Her' = Sue Lin.",
          },
        },
        {
          id: "ch2_h_q38",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 38,
          marks: 1,
          stem: "Sue Lin had a sister. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — family situation",
            steps: [
              "Passage: 'Being the only child, Sue Lin had no sibling to keep her company.'",
              "'Only child' = no brothers or sisters.",
              "She had NO sibling. FALSE.",
            ],
            tip: "'Only child' = no siblings. She had NO sister or brother. FALSE.",
          },
        },
        {
          id: "ch2_h_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 1,
          stem: "Sue Lin would play with Snowy after finishing her homework. TRUE or FALSE?",
          answer: "TRUE",
          solution: {
            method: "True/False — daily routine",
            steps: [
              "Passage: 'After Sue Lin finished her homework, Snowy would be all ready to play with her.'",
              "She played with Snowy AFTER finishing homework. TRUE.",
            ],
            tip: "Directly stated: after homework → play with Snowy. TRUE.",
          },
        },
        {
          id: "ch2_h_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 1,
          stem: "When Sue Lin felt upset, Snowy would cheer her up by wagging its tail. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — Snowy's behaviour when Sue Lin is upset",
            steps: [
              "Passage: 'Snowy seemed to know when Sue Lin felt upset. It would simply sit quietly on her lap.'",
              "When upset → Snowy sat quietly on her lap (NOT wag its tail).",
              "Wagging its tail = when greeting Sue Lin at the door when she comes home.",
              "FALSE (sat quietly, not wagged tail).",
            ],
            tip: "When upset: Snowy sat QUIETLY on her lap. Tail-wagging = greeting at the door. FALSE.",
          },
        },
        {
          id: "ch2_h_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 1,
          stem: "Write 1, 2 and 3 in the blanks to indicate the order of events.",
          subEvents: [
            "Sue Lin came home.",
            "Sue Lin's mother told her that Snowy was missing.",
            "Sue Lin's grandmother went out to water the plants.",
          ],
          answer: {
            "Sue Lin came home.": "2",
            "Sue Lin's mother told her that Snowy was missing.": "3",
            "Sue Lin's grandmother went out to water the plants.": "1",
          },
          solution: {
            method: "Sequence of events",
            steps: [
              "1: Grandmother went out to water plants (left door open) → Snowy escaped.",
              "2: Sue Lin came home and found Snowy missing.",
              "3: Sue Lin's mother told her what happened (grandmother left door open).",
            ],
            tip: "Grandmother watered plants → left door open → Snowy escaped (1). Sue Lin came home (2). Mother explained (3).",
          },
        },
        {
          id: "ch2_h_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 1,
          stem: "What did Sue Lin's family do to find Snowy?",
          answer: "They put up notices about the missing dog around the neighbourhood.",
          solution: {
            method: "Locate specific action",
            steps: [
              "Passage: 'The family put up notices about the missing dog around the neighbourhood.'",
              "They put up notices/posters to find Snowy.",
            ],
            tip: "Directly stated: put up NOTICES about the missing dog. Quote the passage closely.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION I — Comprehension Open-Ended (4 × 2 m = 8 m)
    // Passage: The Foolish Lion and the Clever Rabbit
    // ─────────────────────────────────────────────
    {
      id: "secI",
      name: "Section I: Comprehension Open-Ended",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "The Foolish Lion and the Clever Rabbit",
        text: `Once upon a time, there lived a fierce lion. All the jungle animals were scared of him. He was the king of the jungle. Being greedy, he hunted and killed many animals even when he was not hungry. Therefore, the animals constantly lived in fear as they knew that all of them would eventually be killed.

One day, a rabbit came up with a plan as she did not want to be eaten by the lion. She wanted to get rid of him. The rabbit pretended to rush into the lion's den, waking up the sleeping lion. The lion hollered and threatened to kill her.

The rabbit remained calm and said, "Your Majesty, hear me out before you kill me. Six of us were coming to pay our respects to you today. On our way, another lion stopped us and claimed to be the new king of the jungle. He ate up my brothers. I escaped to tell you this."

The lion was furious. He could not believe that another animal could be far superior to him. Immediately, he demanded that the rabbit take him to his enemy's den so that he could kill him. The rabbit led the lion to a deep well filled with water. The lion looked into the well and roared when he saw his reflection. He jumped into the well and drowned.

All the animals were very happy to learn that the witty little rabbit had tricked the lion. They were glad that the lion had been killed and celebrated all day long.

(Adapted from http://www.tell-a-tale.com/panchatantra-foolish-lion-clever-rabbit/)`,
      },
      questions: [
        {
          id: "ch2_i_q43",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 43,
          marks: 2,
          stem: "Why were the jungle animals scared of the lion?",
          answer: "The jungle animals were scared of the lion because he hunted and killed many animals even when he was not hungry, so they knew they would all eventually be killed.",
          solution: {
            method: "Locate reason for fear",
            steps: [
              "Passage: 'Being greedy, he hunted and killed many animals even when he was not hungry. Therefore, the animals constantly lived in fear as they knew that all of them would eventually be killed.'",
              "Reason 1: He killed animals even when not hungry (greedy).",
              "Reason 2: Animals feared they would all eventually be killed.",
            ],
            tip: "Answer = greedy lion killed animals unnecessarily + animals feared being killed eventually.",
          },
        },
        {
          id: "ch2_i_q44",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 44,
          marks: 2,
          stem: "Which word in paragraph two has the same meaning as 'shouted'?",
          answer: "hollered",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "Paragraph 2: 'The lion hollered and threatened to kill her.'",
              "'Hollered' = shouted loudly.",
              "This is the word in paragraph 2 meaning 'shouted'.",
            ],
            tip: "'Hollered' = shouted loudly. Common in informal/story contexts.",
          },
        },
        {
          id: "ch2_i_q45",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 45,
          marks: 2,
          stem: "What does 'I' (line 10) refer to?",
          answer: "'I' refers to the rabbit.",
          solution: {
            method: "Pronoun reference — first person in dialogue",
            steps: [
              "Line 10 is part of the rabbit's speech: 'I escaped to tell you this.'",
              "The rabbit is speaking — 'I' = the rabbit herself.",
              "She is telling the lion the false story she invented.",
            ],
            tip: "In dialogue, 'I' refers to the speaker. The rabbit is speaking — 'I' = the rabbit.",
          },
        },
        {
          id: "ch2_i_q46",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 46,
          marks: 2,
          stem: "Why did the lion jump into the well?",
          answer: "The lion jumped into the well because he saw his own reflection in the water and thought it was another lion — his enemy. He wanted to kill it.",
          solution: {
            method: "Locate reason for lion's action",
            steps: [
              "Passage: 'The lion looked into the well and roared when he saw his reflection. He jumped into the well and drowned.'",
              "The rabbit had told the lion about a rival lion.",
              "The lion saw his own reflection and BELIEVED it was the rival lion.",
              "He jumped in to attack what he thought was his enemy.",
            ],
            tip: "The lion saw his OWN reflection and mistook it for the rival lion the rabbit told him about. He jumped in to attack it.",
          },
        },
      ],
    },
  ],
};

export default paper;
