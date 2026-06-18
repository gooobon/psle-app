// src/data/p3/english/papers/eoy_nanyang_p2_2022.ts
// Nanyang Primary School — P3 English EOY 2022
// Paper 2: Language Use and Comprehension (Q1–Q44, 50 marks)
// Section A Grammar MCQ, B Vocab MCQ, C Grammar Cloze (word bank + underline),
// D Editing for Spelling, E Sentence Synthesis, F Comprehension 1, G Comprehension 2
// Paper 1 (Picture Composition) excluded per instructions.

import { PaperSet } from "../../types";

const eoy_nanyang_p2_2022: PaperSet = {
  id: "eoy_nanyang_p2_2022",
  school: "Nanyang Primary School",
  schoolCode: "nanyang",
  level: "P3",
  subject: "English",
  paperType: "EOY",
  year: 2022,
  paper: 2,
  totalMarks: 50,
  sections: [
    // ─────────────────────────────────────────────
    // Section A: Grammar MCQ (Q1–Q10, 10 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secA",
      sectionLabel: "Section A: Grammar",
      topic: "GrammarMCQ",
      instructions:
        "For each question from 1 to 10, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade your answer on the Optical Answer Sheet (OAS).",
      marks: 10,
      questions: [
        {
          id: "ny22_A1",
          type: "A",
          qNumber: 1,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "I was late for class __________ there was a bad traffic jam.",
          options: ["so", "yet", "although", "because"],
          answer: 4,
          answerText: "because",
          solution: {
            method: "Conjunctions of Reason",
            steps: [
              "Identify the relationship: being late FOR class and there being a traffic jam.",
              "Traffic jam = the REASON/CAUSE for being late.",
              "'Because' introduces a reason/cause clause.",
              "(1) 'so' shows result: 'There was a traffic jam, so I was late' — order reversed; (2) 'yet' = contrast/but; (3) 'although' = concession/contrast.",
              "With the given sentence order, 'because' is correct.",
            ],
            tip: "'Because' = reason clause follows. 'I was late because there was a jam.' (Cause comes after 'because'.)",
          },
        },
        {
          id: "ny22_A2",
          type: "A",
          qNumber: 2,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Everyone __________ excited when Mrs Lee announced that we were going for a Learning Journey at Little India.",
          options: ["is", "are", "was", "were"],
          answer: 3,
          answerText: "was",
          solution: {
            method: "Subject-Verb Agreement + Tense",
            steps: [
              "Subject: 'Everyone' — an indefinite pronoun that is always SINGULAR.",
              "Time clue: 'Mrs Lee announced' — past tense context.",
              "Singular subject + past tense → 'was'.",
              "(2) 'are' is plural present; (4) 'were' is plural past.",
            ],
            tip: "Everyone/someone/nobody/anybody = always singular. Past context → 'was', not 'were'.",
          },
        },
        {
          id: "ny22_A3",
          type: "A",
          qNumber: 3,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "While Chloe __________ her house, she found her long-lost teddy bear under her bed.",
          options: ["cleans", "cleaned", "is cleaning", "was cleaning"],
          answer: 4,
          answerText: "was cleaning",
          solution: {
            method: "Past Continuous for Background Action",
            steps: [
              "Sentence pattern: 'While [action A], [action B] happened.'",
              "Action B 'she found' is simple past — a completed event.",
              "Action A was an ongoing background activity interrupted by action B.",
              "Ongoing past action = past continuous: 'was cleaning'.",
              "(2) 'cleaned' is simple past — would suggest the two completed actions are sequential, not simultaneous.",
            ],
            tip: "'While + past continuous' describes an ongoing background action. 'While she WAS cleaning (ongoing), she found (sudden event).'",
          },
        },
        {
          id: "ny22_A4",
          type: "A",
          qNumber: 4,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mrs Lim asked Tony, \"Can you pass me __________ pair of scissors on the table over there?\"",
          options: ["this", "that", "these", "those"],
          answer: 2,
          answerText: "that",
          solution: {
            method: "Demonstrative Adjectives (Distance)",
            steps: [
              "'The table OVER THERE' signals that the scissors are far away from the speaker.",
              "Far away + singular noun ('pair of scissors' is singular): use 'that'.",
              "(1) 'this' = near + singular; (3) 'these' = near + plural; (4) 'those' = far + plural.",
              "'Pair' is singular → 'that' (not 'those').",
            ],
            tip: "This/these = near; that/those = far. Pair is singular → 'that pair', not 'those pair'.",
          },
        },
        {
          id: "ny22_A5",
          type: "A",
          qNumber: 5,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "I like going to the zoo as I can learn __________ facts about the animals there.",
          options: ["few", "little", "many", "much"],
          answer: 3,
          answerText: "many",
          solution: {
            method: "Countable vs Uncountable Quantifiers",
            steps: [
              "'Facts' is a COUNTABLE plural noun.",
              "For countable plural nouns: use 'many' (large quantity) or 'few' (small quantity).",
              "Context: I LIKE going to the zoo to learn facts → positive, implying a large number.",
              "'Many facts' = a large number of facts. ✓",
              "(2) 'little' and (4) 'much' are for uncountable nouns; (1) 'few' = only a small number (negative connotation).",
            ],
            tip: "Countable noun + many/few. Uncountable noun + much/little. Facts = countable → 'many facts'.",
          },
        },
        {
          id: "ny22_A6",
          type: "A",
          qNumber: 6,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "A group of fish __________ also known as a school of fish.",
          options: ["is", "are", "was", "were"],
          answer: 1,
          answerText: "is",
          solution: {
            method: "Collective Nouns / General Facts",
            steps: [
              "Subject: 'A group of fish' — the head noun is 'group', which is singular.",
              "General factual statement → present simple.",
              "Singular subject + present simple → 'is'.",
              "Note: Even though 'fish' is plural, 'a group' is the head noun determining verb agreement.",
            ],
            tip: "Head noun of the subject phrase determines agreement. 'A GROUP of fish' → singular → 'is'.",
          },
        },
        {
          id: "ny22_A7",
          type: "A",
          qNumber: 7,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Jane decided to decorate the chocolate cake after she __________ it.",
          options: ["bake", "baked", "bakes", "baking"],
          answer: 2,
          answerText: "baked",
          solution: {
            method: "Past Tense Sequence",
            steps: [
              "Main verb: 'decided' — past tense.",
              "The baking happened BEFORE the decorating.",
              "Both actions are in the past, baking completed first → simple past 'baked'.",
              "'After she baked it, she decorated it.' (Both past; baking completed before decorating.)",
            ],
            tip: "When both actions are in the past and one precedes the other, use simple past for both. 'After she baked...'",
          },
        },
        {
          id: "ny22_A8",
          type: "A",
          qNumber: 8,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Dylan exclaimed, \"Stop talking and listen! The fire alarm __________ right now.\"",
          options: ["rang", "rings", "has rung", "is ringing"],
          answer: 4,
          answerText: "is ringing",
          solution: {
            method: "Present Continuous for Action Happening Now",
            steps: [
              "Key phrase: 'right now' — signals an action happening at this very moment.",
              "Present continuous (is/am/are + verb-ing) = action happening at the moment of speaking.",
              "'The fire alarm IS RINGING right now.' ✓",
              "(1) 'rang' = past; (2) 'rings' = habitual present; (3) 'has rung' = past with present relevance, not ongoing.",
            ],
            tip: "'Right now' always signals present continuous: is/am/are + verb-ing.",
          },
        },
        {
          id: "ny22_A9",
          type: "A",
          qNumber: 9,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Jeremy hit the tennis ball too hard and it flew __________ the fence.",
          options: ["on", "off", "over", "away"],
          answer: 3,
          answerText: "over",
          solution: {
            method: "Prepositions of Movement / Direction",
            steps: [
              "The ball went over = it went across the top of and to the other side.",
              "'Over' = movement across/above something from one side to the other.",
              "(1) 'on' = resting on top; (2) 'off' = away from a surface; (4) 'away' = in a different direction (no specific reference to fence).",
              "'Flew over the fence' = the ball passed above the fence to land on the other side.",
            ],
            tip: "'Over' = movement across the top of something. 'The ball flew over the fence' (and landed on the other side).",
          },
        },
        {
          id: "ny22_A10",
          type: "A",
          qNumber: 10,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "\"Can I use as __________ paint as I need to paint the dog's kennel?\" my brother asked.",
          options: ["few", "some", "many", "much"],
          answer: 4,
          answerText: "much",
          solution: {
            method: "Countable vs Uncountable Quantifiers",
            steps: [
              "'Paint' is an UNCOUNTABLE noun (liquid material).",
              "For uncountable nouns: 'much' (large/sufficient amount) or 'little' (small amount).",
              "Structure: 'as much [uncountable] as I need' — standard expression for sufficient quantity.",
              "(1) 'few' and (3) 'many' are for countable nouns; (2) 'some' works but doesn't fit 'as ___ as I need' idiom as naturally as 'much'.",
            ],
            tip: "Paint = uncountable → use 'much'. 'As much paint as I need' is a fixed expression meaning the required quantity.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section B: Vocabulary MCQ (Q11–Q16, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secB",
      sectionLabel: "Section B: Vocabulary",
      topic: "VocabMCQ",
      instructions:
        "For each question from 11 to 16, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade your answer on the Optical Answer Sheet (OAS).",
      marks: 6,
      questions: [
        {
          id: "ny22_B11",
          type: "A",
          qNumber: 11,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The artist's large __________ of paintings is displayed at the gallery.",
          options: ["pile", "stack", "library", "collection"],
          answer: 4,
          answerText: "collection",
          solution: {
            method: "Precise Vocabulary — Collective Noun",
            steps: [
              "Context: an artist with a large number of paintings displayed in a gallery.",
              "'Collection' = a group of objects gathered together, especially by an artist/hobbyist. It implies curation.",
              "(1) 'pile' = disorganised heap; (2) 'stack' = neat pile but informal, not used for art; (3) 'library' = collection of books/media, not paintings.",
              "'Collection of paintings' is the standard, prestigious term for an artist's body of work.",
            ],
            tip: "'Collection' is used for curated, purposeful groups (art collection, stamp collection). Pile/stack suggest disorder.",
          },
        },
        {
          id: "ny22_B12",
          type: "A",
          qNumber: 12,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Mother often reminds us to chew properly as it helps in the __________ of the food.",
          options: ["function", "reaction", "digestion", "completion"],
          answer: 3,
          answerText: "digestion",
          solution: {
            method: "Domain Vocabulary — Health/Science",
            steps: [
              "Context: chewing food properly → it helps with ___.",
              "Chewing breaks down food in the mouth — this is part of the digestive process.",
              "'Digestion' = the process by which food is broken down in the body to absorb nutrients.",
              "(1) 'function' = purpose/role; (2) 'reaction' = a chemical response; (4) 'completion' = finishing something.",
            ],
            tip: "Chewing is the first step of digestion. 'Chewing helps with the digestion of food.'",
          },
        },
        {
          id: "ny22_B13",
          type: "A",
          qNumber: 13,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Even though Mandy was full, she could not stop trying all the delicious dishes as they were too __________.",
          options: ["inspiring", "tempting", "captivating", "fascinating"],
          answer: 2,
          answerText: "tempting",
          solution: {
            method: "Precise Adjective — Context Fit",
            steps: [
              "Context: the dishes are delicious and Mandy cannot resist eating even though she is full.",
              "'Tempting' = making you want to do something even though you shouldn't / hard to resist.",
              "Food that is hard to resist eating is specifically described as 'tempting'.",
              "(1) 'inspiring' = stimulating creativity/motivation; (3) 'captivating' = holding attention (more for performances/stories); (4) 'fascinating' = very interesting/intriguing.",
            ],
            tip: "'Tempting' specifically collocates with food/desires: 'the cake was too tempting to resist'. It implies wanting something even when you shouldn't.",
          },
        },
        {
          id: "ny22_B14",
          type: "A",
          qNumber: 14,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "To avoid being seen, the timid boy opened the door slightly and __________ at the robber to see what he was doing.",
          options: ["glared", "jeered", "peeked", "scowled"],
          answer: 3,
          answerText: "peeked",
          solution: {
            method: "Precise Verb — Looking",
            steps: [
              "Context: boy opened door only slightly and looked through to see what the robber was doing — secretly, cautiously.",
              "'Peeked' = looked quickly or secretly, especially through a small opening.",
              "(1) 'glared' = stared angrily; (2) 'jeered' = mocked/taunted (not looking); (4) 'scowled' = frowned angrily.",
              "Only 'peeked' matches the idea of a hidden, cautious look through a gap.",
            ],
            tip: "'Peek' = a secret or quick look, often through a small opening. 'He peeked through the keyhole.'",
          },
        },
        {
          id: "ny22_B15",
          type: "A",
          qNumber: 15,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The abandoned dog is __________ because it has not eaten for a week and was too weak to stand on its own legs.",
          options: ["bulky", "petite", "plump", "scrawny"],
          answer: 4,
          answerText: "scrawny",
          solution: {
            method: "Precise Adjective — Physical Description",
            steps: [
              "Context: dog hasn't eaten for a week and is too weak to stand → extremely thin and underweight.",
              "'Scrawny' = very thin and bony in an unhealthy way.",
              "(1) 'bulky' = large and heavy; (2) 'petite' = small but proportionate (usually positive, often for people); (3) 'plump' = slightly overweight/rounded.",
              "A starved dog would be 'scrawny', not bulky or plump.",
            ],
            tip: "'Scrawny' describes someone/something that is unhealthily thin and bony. Perfect for a starved, weak dog.",
          },
        },
        {
          id: "ny22_B16",
          type: "A",
          qNumber: 16,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Sara __________ the thick and heavy iron door with all her might but was unable to move it.",
          options: ["tapped", "pushed", "nudged", "touched"],
          answer: 2,
          answerText: "pushed",
          solution: {
            method: "Precise Verb — Physical Force",
            steps: [
              "Context: Sara used 'all her might' (maximum strength) but couldn't move it → strong forceful action.",
              "'Pushed' = applied force to move something away.",
              "(1) 'tapped' = light gentle touch; (3) 'nudged' = gentle push with elbow/side; (4) 'touched' = made light contact.",
              "Only 'pushed' involves sufficient force, matching 'all her might'.",
            ],
            tip: "'With all her might' = using maximum strength. Strong force + door = 'pushed'. Tapped/nudged/touched are too gentle.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section C: Grammar Cloze (Q17–Q24, 8 marks)
    // Part 1: Word bank (Q17–Q20, 4 marks)
    // Part 2: Underline (Q21–Q24, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secC_wordbank",
      sectionLabel: "Section C: Grammar Cloze — Part 1 (Word Bank)",
      topic: "GrammarCloze",
      instructions:
        "There are 4 blanks, numbered 17 to 20 in the passage below. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. Use each word once only.",
      marks: 4,
      passage: {
        title: "Jacob's First Day",
        wordBank: [
          { letter: "A", word: "him" },
          { letter: "B", word: "his" },
          { letter: "C", word: "I" },
          { letter: "D", word: "she" },
          { letter: "E", word: "they" },
          { letter: "F", word: "you" },
        ],
        text: "It was Jacob's first day of school. After morning assembly, Mrs Tan introduced Jacob to (17) ______ new classmates. Everyone was happy to meet Jacob, especially his buddy, Caitlyn. She could not wait to bring (18) ______ on a tour around the school. The first place (19) ______ brought him to was the canteen. Jacob exclaimed, \"(20) ______ forgot to bring my wallet!\" Caitlyn told him not to worry as he could borrow some money from the teacher to buy food.",
      },
      questions: [
        {
          id: "ny22_C17",
          type: "A",
          qNumber: 17,
          topic: "GrammarCloze",
          marks: 1,
          question: "Mrs Tan introduced Jacob to (17) ______ new classmates.",
          answer: "B",
          answerText: "his",
          solution: {
            method: "Possessive Pronouns",
            steps: [
              "Who do the classmates belong to? Jacob — the new student.",
              "'his new classmates' = the classmates of Jacob (his = possessive for he/him).",
              "Mrs Tan introduced Jacob to Jacob's classmates → 'his new classmates'.",
              "Eliminate: (A) 'him' is object pronoun; (C) 'I' is subject; (D) 'she' is wrong gender reference; (E) 'they' is subject; (F) 'you' is wrong person.",
            ],
            tip: "Possessive pronouns: his (he), her (she), their (they), my (I), your (you). Jacob = he → 'his'.",
          },
        },
        {
          id: "ny22_C18",
          type: "A",
          qNumber: 18,
          topic: "GrammarCloze",
          marks: 1,
          question: "She could not wait to bring (18) ______ on a tour around the school.",
          answer: "A",
          answerText: "him",
          solution: {
            method: "Object Pronouns",
            steps: [
              "Subject: 'She' (Caitlyn). Action: bring [someone] on a tour.",
              "Who did she bring? → Jacob (male, singular).",
              "Object position → 'him' (object form of he).",
              "Eliminate: (B) 'his' is possessive; (C) 'I' is subject; (E) 'they' is plural; (F) 'you' is wrong person.",
            ],
            tip: "Subject pronouns: he/she/they/I. Object pronouns: him/her/them/me. After a verb → use object pronoun.",
          },
        },
        {
          id: "ny22_C19",
          type: "A",
          qNumber: 19,
          topic: "GrammarCloze",
          marks: 1,
          question: "The first place (19) ______ brought him to was the canteen.",
          answer: "D",
          answerText: "she",
          solution: {
            method: "Subject Pronouns — Gender Reference",
            steps: [
              "Who brought Jacob to the canteen? → Caitlyn (female).",
              "Subject of this clause → 'she' (subject pronoun, female).",
              "'The first place SHE brought him to was the canteen.'",
              "Eliminate: (A) 'him' is object; (B) 'his' is possessive; (C) 'I' is first person; (E) 'they' is plural.",
            ],
            tip: "Caitlyn = female = she. Subject position → 'she', not 'her'.",
          },
        },
        {
          id: "ny22_C20",
          type: "A",
          qNumber: 20,
          topic: "GrammarCloze",
          marks: 1,
          question: "Jacob exclaimed, \"(20) ______ forgot to bring my wallet!\"",
          answer: "C",
          answerText: "I",
          solution: {
            method: "First Person Subject Pronoun",
            steps: [
              "Jacob is speaking about himself → first person.",
              "Subject of the sentence (forgot) → subject pronoun.",
              "'I forgot to bring my wallet!' — I = first person subject pronoun.",
              "The possessive 'my wallet' confirms the speaker refers to himself.",
            ],
            tip: "When the speaker talks about their own action, use 'I' (subject) not 'me' (object).",
          },
        },
      ],
    },
    {
      id: "nanyang22_secC_underline",
      sectionLabel: "Section C: Grammar Cloze — Part 2 (Underline)",
      topic: "GrammarCloze",
      instructions:
        "For each question from 21 to 24, two options are given. Underline the correct word from the words given in the brackets.",
      marks: 4,
      passage: {
        title: "Moles",
        text: "Moles are interesting mammals with the ability to dig underground. Though small-sized, they (21) [has / have] cylindrical bodies made for burrowing. A mole's curved front paws and sharp claws (22) [help / helps] it tunnel through soil easily. Moles (23) [is / are] able to dig very quickly. With its poor eyesight, the mole (24) [rely / relies] on its sharp sense of smell and touch to navigate through the ground. Their senses also play an important role in helping them detect danger.",
      },
      questions: [
        {
          id: "ny22_C21",
          type: "A",
          qNumber: 21,
          topic: "GrammarCloze",
          marks: 1,
          question: "they (21) [has / have] cylindrical bodies made for burrowing.",
          options: ["has", "have"],
          answer: 2,
          answerText: "have",
          solution: {
            method: "Subject-Verb Agreement (Plural)",
            steps: [
              "Subject: 'they' — plural pronoun referring to moles.",
              "Plural subject in present simple → base form 'have' (no -s).",
              "'Has' is for singular (he/she/it). 'They have' is correct.",
            ],
            tip: "They/we/you + present simple → base verb (no -s). He/she/it → verb + -s.",
          },
        },
        {
          id: "ny22_C22",
          type: "A",
          qNumber: 22,
          topic: "GrammarCloze",
          marks: 1,
          question: "A mole's curved front paws and sharp claws (22) [help / helps] it tunnel through soil easily.",
          options: ["help", "helps"],
          answer: 1,
          answerText: "help",
          solution: {
            method: "Subject-Verb Agreement (Compound Subject)",
            steps: [
              "Subject: 'A mole's curved front paws AND sharp claws' — two items joined by 'and' = compound subject.",
              "Compound subjects joined by 'and' are plural → plural verb.",
              "Plural verb in present simple → 'help' (no -s).",
            ],
            tip: "When two subjects are joined by 'and', the verb is plural: 'Paws and claws HELP.'",
          },
        },
        {
          id: "ny22_C23",
          type: "A",
          qNumber: 23,
          topic: "GrammarCloze",
          marks: 1,
          question: "Moles (23) [is / are] able to dig very quickly.",
          options: ["is", "are"],
          answer: 2,
          answerText: "are",
          solution: {
            method: "Subject-Verb Agreement (Plural Noun)",
            steps: [
              "Subject: 'Moles' — plural noun.",
              "Plural subject in present simple → 'are'.",
              "'Is' is for singular subjects.",
            ],
            tip: "Plural nouns use 'are' in present tense. 'Moles ARE fast diggers.'",
          },
        },
        {
          id: "ny22_C24",
          type: "A",
          qNumber: 24,
          topic: "GrammarCloze",
          marks: 1,
          question: "the mole (24) [rely / relies] on its sharp sense of smell.",
          options: ["rely", "relies"],
          answer: 2,
          answerText: "relies",
          solution: {
            method: "Subject-Verb Agreement (3rd Person Singular)",
            steps: [
              "Subject: 'the mole' — singular noun (note: 'the' + singular).",
              "3rd person singular + present simple → verb + -s.",
              "'relies' (rely + -ies for verbs ending in consonant + y).",
            ],
            tip: "For verbs ending in consonant + y, 3rd person singular: drop y, add -ies. rely → relies.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section D: Editing for Spelling (Q25–Q28, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secD",
      sectionLabel: "Section D: Editing for Spelling",
      topic: "Editing",
      instructions:
        "Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.",
      marks: 4,
      passage: {
        title: "Mei Ling's Fast Food Craving",
        text: "Mei Ling was looking forward to lunch. She longed to eat fast food after attending her badminton lesson. She (25) pleederd with her mother to take her to her favourite fast food (26) restraunt. She was thinking of buying a (27) juisie hamburger, chicken nuggets and french fries. By the time Mei Ling finished her badminton lesson, she was so hungry that her (28) stamack rumbled loudly. She muttered, \"I hope no one heard it.\" When her mother's car finally arrived, she quickly hopped in.",
      },
      questions: [
        {
          id: "ny22_D25",
          type: "A",
          qNumber: 25,
          topic: "Editing",
          marks: 1,
          question: "She (25) pleederd with her mother to take her to her favourite fast food restaurant.",
          errorWord: "pleederd",
          answer: "pleaded",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Pleederd' is not a word.",
              "The correct word is 'pleaded' — past tense of 'plead' (to beg earnestly).",
              "Spelling: p-l-e-a-d-e-d. The vowel pattern is 'ea' (like 'lead', 'bead').",
            ],
            tip: "'Pleaded' = begged. She PLEADED with her mother = she begged. Spelling: p-l-e-a-d-e-d.",
          },
        },
        {
          id: "ny22_D26",
          type: "A",
          qNumber: 26,
          topic: "Editing",
          marks: 1,
          question: "her favourite fast food (26) restraunt.",
          errorWord: "restraunt",
          answer: "restaurant",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Restraunt' is a common misspelling.",
              "Correct spelling: r-e-s-t-a-u-r-a-n-t.",
              "Memory trick: REST + AURANT → think 'rest' at a restaurant. Or: rest-au-rant.",
            ],
            tip: "Restaurant: r-e-s-t-a-u-r-a-n-t. The tricky parts are 'au' in the middle and the silent letters.",
          },
        },
        {
          id: "ny22_D27",
          type: "A",
          qNumber: 27,
          topic: "Editing",
          marks: 1,
          question: "a (27) juisie hamburger.",
          errorWord: "juisie",
          answer: "juicy",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Juisie' is incorrect.",
              "Correct spelling: j-u-i-c-y.",
              "Root word: juice + y. Drop the 'e' before adding 'y' → juicy.",
            ],
            tip: "Juicy = juice + y (drop the e). A common word for food: 'a juicy burger'.",
          },
        },
        {
          id: "ny22_D28",
          type: "A",
          qNumber: 28,
          topic: "Editing",
          marks: 1,
          question: "her (28) stamack rumbled loudly.",
          errorWord: "stamack",
          answer: "stomach",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Stamack' is a phonetic misspelling.",
              "Correct spelling: s-t-o-m-a-c-h.",
              "The tricky part: 'ach' at the end (sounds like 'uck'). Memory: STOMACH has a silent 'h' after 'c'.",
            ],
            tip: "Stomach: s-t-o-m-a-c-h. The 'ch' at the end sounds like 'k'. Common body part word to memorise.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section E: Sentence Synthesis (Q29–Q30, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secE",
      sectionLabel: "Section E: Sentence Synthesis",
      topic: "SentenceCombining",
      instructions:
        "For each of the questions 29 and 30, rewrite the given sentence(s) using the word(s) provided. Your answer must be in one sentence. The meaning of your sentence must be the same as the meaning of the given sentence(s).",
      marks: 4,
      questions: [
        {
          id: "ny22_E29",
          type: "A",
          qNumber: 29,
          topic: "SentenceCombining",
          marks: 2,
          question:
            "It was raining heavily. The soldier continued marching.\n\nRewrite using: although",
          answer:
            "The soldier continued marching although it was raining heavily.",
          alternativeAnswers: [
            "Although it was raining heavily, the soldier continued marching.",
          ],
          solution: {
            method: "Sentence Combining with 'although' (Concession)",
            steps: [
              "'Although' introduces a concessive clause — showing contrast between two ideas.",
              "Contrast: heavy rain (expected to stop marching) VS. soldier continues (surprising/defiant).",
              "Structure option 1: [Main clause] although [concessive clause].",
              "→ 'The soldier continued marching although it was raining heavily.'",
              "Structure option 2: Although [concessive clause], [main clause].",
              "→ 'Although it was raining heavily, the soldier continued marching.' (Note: comma needed when 'although' clause comes first.)",
            ],
            tip: "Although = even though = despite the fact that. When 'although' starts the sentence, add a comma before the main clause.",
          },
        },
        {
          id: "ny22_E30",
          type: "A",
          qNumber: 30,
          topic: "SentenceCombining",
          marks: 2,
          question:
            "The twin brothers were tired. They went to bed early.\n\nRewrite using: because",
          answer:
            "The twin brothers went to bed early because they were tired.",
          alternativeAnswers: [
            "Because the twin brothers were tired, they went to bed early.",
          ],
          solution: {
            method: "Sentence Combining with 'because' (Cause-Effect)",
            steps: [
              "Identify cause and effect: tired (cause) → went to bed early (effect).",
              "'Because' introduces the cause/reason.",
              "Structure: [Effect] because [Cause].",
              "→ 'The twin brothers went to bed early because they were tired.'",
              "Or: 'Because the twin brothers were tired, they went to bed early.' (comma when 'because' clause starts first).",
              "Note: 'they' refers to 'the twin brothers' (avoid repeating 'the twin brothers' twice).",
            ],
            tip: "Because + reason. Main action first, then because + reason. OR Because + reason (comma) main action.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section F: Comprehension 1 — The Farmer's Dilemma (Q31–Q37, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secF",
      sectionLabel: "Section F: Comprehension 1",
      topic: "ComprehensionMCQ",
      instructions:
        "Read this passage and answer questions 31 to 37.",
      marks: 8,
      passage: {
        title: "The Farmer's Dilemma",
        text: `The farmer stared at his dying wheat and sighed. It was going to be another challenging year ahead. The droughts came more often and he was sure his wheat would not be able to survive another long period without rain. It did not help that a huge swarm of locusts had eaten up almost all his wheat.

"Daddy, why do you look so miserable?" asked the farmer's daughter, Mary. "I was thinking about how our harvest will be like this year," said the farmer. With little or no wheat to sell, he knew he would not earn enough money to feed his family.

"If we have nothing to sell, we will have to sell Suzy," said Mary.

The farmer's mouth fell open when he heard Mary's words. He was very certain that Mary loved Suzy, their pig. He had bought Suzy from the market when Mary was six years old. They were very attached to each other and had grown up together.

Knowing it must be hard for his daughter, the farmer said, "We will not sell Suzy no matter what happens. Suzy is our family member." Just as the farmer said that, the sound of thunder could be heard. The farmer smiled. Could that mean that things were going to get better?`,
      },
      questions: [
        {
          id: "ny22_F31",
          type: "A",
          qNumber: 31,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Based on the first paragraph, tick (√) one word that best describes how the farmer felt about his dying wheat.",
          options: ["relieved", "hopeful", "worried"],
          answer: 3,
          answerText: "worried",
          solution: {
            method: "Inferential Comprehension — Emotions",
            steps: [
              "Clues from Paragraph 1: 'stared at his dying wheat and sighed', 'challenging year ahead', 'wheat would not survive', 'locusts had eaten up almost all his wheat'.",
              "Sighing, expecting challenges, and losing crops all suggest anxiety/worry.",
              "(1) 'relieved' = feeling better after something bad — no evidence of relief here.",
              "(2) 'hopeful' = expecting things to get better — no positive signs in this paragraph.",
              "'Worried' = anxious about what might happen — matches the evidence.",
            ],
            tip: "Sighing + challenging year + dying wheat = worried. Look for emotional clue words (sighed = sad/worried).",
          },
        },
        {
          id: "ny22_F32",
          type: "A",
          qNumber: 32,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "True or False: The farmer earned money by selling locusts.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal Comprehension — True/False",
            steps: [
              "The passage says: 'a huge swarm of locusts had eaten up almost all his wheat.'",
              "Locusts destroyed his wheat — they were a problem, not a source of income.",
              "The farmer earns money by selling WHEAT, not locusts.",
              "Statement is FALSE.",
            ],
            tip: "Locusts are pests that ate his wheat. He sells wheat, not locusts. Always check the passage carefully.",
          },
        },
        {
          id: "ny22_F33",
          type: "A",
          qNumber: 33,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "True or False: Mary wanted to help her father by selling Suzy.",
          options: ["True", "False"],
          answer: 1,
          answerText: "True",
          solution: {
            method: "Inferential Comprehension — True/False",
            steps: [
              "Mary said: 'If we have nothing to sell, we will have to sell Suzy.'",
              "Mary suggested selling Suzy as a solution to their financial problem.",
              "The farmer was surprised because he expected Mary to be unwilling — yet Mary herself suggested it to help.",
              "Mary's suggestion was a way to help the family → TRUE.",
            ],
            tip: "Mary proposed selling Suzy to help solve the family's money problem. This was her way of helping her father.",
          },
        },
        {
          id: "ny22_F34",
          type: "A",
          qNumber: 34,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Pick out a three-word phrase from paragraph 4 which shows the farmer was shocked when Mary suggested that they sell Suzy.",
          answer: "mouth fell open",
          solution: {
            method: "Literal — Find Phrase",
            steps: [
              "Look in paragraph 4 for a phrase showing the farmer was shocked.",
              "Found: 'The farmer's mouth fell open when he heard Mary's words.'",
              "The three-word phrase: 'mouth fell open' (his jaw dropped = shocked expression).",
            ],
            tip: "'Mouth fell open' = jaw dropped = shocked/surprised. This is a common expression for surprise.",
          },
        },
        {
          id: "ny22_F35",
          type: "A",
          qNumber: 35,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Based on paragraph 4, why would it be hard on Mary if Suzy was sold?\n\nMary and Suzy __________ and __________.",
          answer:
            "Mary and Suzy were very attached to each other and had grown up together.",
          solution: {
            method: "Open-Ended — Fill in Blank with Evidence",
            steps: [
              "Question asks WHY it would be hard on Mary — find from paragraph 4.",
              "Key sentences: 'He was very certain that Mary loved Suzy' and 'They were very attached to each other and had grown up together.'",
              "The sentence starter is 'Mary and Suzy ______ and ______.'",
              "Answer: 'were very attached to each other' (blank 1) + 'had grown up together' (blank 2).",
            ],
            tip: "Both blanks can be filled directly from the passage. The answer is almost word-for-word from paragraph 4.",
          },
        },
        {
          id: "ny22_F36",
          type: "A",
          qNumber: 36,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "The farmer smiled in the last paragraph because __________.",
          options: [
            "(A) he was certain that they would become rich.",
            "(B) he knew that Suzy would sell for a high price at the market.",
            "(C) he thought they would enjoy a better harvest as it was going to rain.",
          ],
          answer: 3,
          answerText:
            "(C) he thought they would enjoy a better harvest as it was going to rain.",
          solution: {
            method: "Inferential Comprehension",
            steps: [
              "The farmer smiled when he 'heard the sound of thunder'.",
              "Thunder precedes rain. Farmers need rain for crops to grow.",
              "He was worried about drought (no rain) → thunder suggests rain is coming → better harvest possible.",
              "The passage ends: 'Could that mean that things were going to get better?' — farmer is hopeful.",
              "(A) No mention of becoming rich; (B) He said 'We will NOT sell Suzy.'",
            ],
            tip: "Thunder = upcoming rain = hope for his dying wheat. Farmer smiled because rain might save his harvest.",
          },
        },
        {
          id: "ny22_F37",
          type: "A",
          qNumber: 37,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to show the events that happened first, next and last in the story.\n\n___ Mary asked her father what was bothering him.\n___ The farmer lost most of his wheat to locusts.\n___ Mary's father assured her that Suzy would not be sold.",
          answer: "2 / 1 / 3",
          answerDetail: {
            "Mary asked her father what was bothering him": "2",
            "The farmer lost most of his wheat to locusts": "1",
            "Mary's father assured her that Suzy would not be sold": "3",
          },
          solution: {
            method: "Sequencing",
            steps: [
              "FIRST: 'a huge swarm of locusts had eaten up almost all his wheat' — this happened before the story begins (past perfect).",
              "SECOND: 'Daddy, why do you look so miserable?' — Mary asked what was wrong.",
              "THIRD: 'We will not sell Suzy no matter what happens' — father's assurance to Mary.",
              "Order: Locusts (1) → Mary asks (2) → Father assures (3).",
            ],
            tip: "Use the narrative flow: loss of wheat (background) → Mary questions him → father reassures. Chronological order.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section G: Comprehension 2 — Shane and the Late Watch (Q38–Q44, 10 marks)
    // ─────────────────────────────────────────────
    {
      id: "nanyang22_secG",
      sectionLabel: "Section G: Comprehension 2",
      topic: "ComprehensionOE",
      instructions:
        "Read this passage and answer questions 38 to 44.",
      marks: 10,
      passage: {
        title: "Shane and the Fast Watch",
        text: `The school was silent and nobody was in sight. Shane stood at the front gate. He was certain that he was late for school. Shane walked back and forth several times before he went to the back of the school. After checking to ensure no one was around, he carefully climbed over the fence and sneaked into the school compound.

Other than the cleaner who was mopping the floor, the canteen was empty. Shane ran and hid inside the toilet. He peered out from a window and scanned his surroundings. Quietly, he climbed up three flights of stairs to go to his classroom. Shane looked around and frowned. 'Why is there no one around? Shouldn't we be having English lesson now?' he wondered, catching his breath at the stairs landing.

As he walked back towards the stairs, the school bell rang. Shane heard footsteps from below him. When he looked down, his classmates were walking up the stairs with their school bags. Shane scratched his head. 'Could there be a change in the timetable?' he reasoned with himself.

To avoid being seen, Shane crouched behind the wall next to his classroom. He heard footsteps and looked out. Tim, his classmate, saw him and waved at him to join the line. They entered the classroom and sat down.

Feeling curious, Tim asked Shane about his strange behavior, "Why are you hiding behind the wall? You are always at the assembly area. What happened?" Shane looked at his watch and asked, "It's past 8 a.m. Did assembly take that long today?" Tim looked at Shane's watch and burst into laughter. He pointed out to Shane that the time shown on his watch was thirty minutes too fast.

All at once, the pieces of the puzzle came together in Shane's mind. Shane joined in the laughter. The mystery was finally solved. He had not been late after all!`,
      },
      questions: [
        {
          id: "ny22_G38",
          type: "A",
          qNumber: 38,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Why did Shane climb over the fence at the back of his school when he thought he was late? [2m]",
          answer:
            "Shane climbed over the fence because he wanted to enter the school without being caught / seen. He did not want anyone to know that he was late.",
          solution: {
            method: "Open-Ended — Reason/Cause",
            steps: [
              "Find why Shane went to the BACK and climbed the fence.",
              "Passage: 'After checking to ensure no one was around, he carefully climbed over the fence and sneaked into the school compound.'",
              "He checked no one was around → he wanted to avoid being seen.",
              "Reason: He wanted to sneak in without anyone knowing he was late.",
              "Full sentence answer: 'Shane climbed over the fence because he wanted to enter the school without being seen/caught.'",
            ],
            tip: "The word 'sneaked' and 'checking no one was around' are key clues. He wanted to avoid being caught for being late.",
          },
        },
        {
          id: "ny22_G39",
          type: "A",
          qNumber: 39,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "True or False: No one was at the canteen when Shane was there.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal Comprehension — True/False",
            steps: [
              "Check what the passage says about the canteen.",
              "Passage: 'Other than the cleaner who was mopping the floor, the canteen was empty.'",
              "'Other than the cleaner' means there was ONE person — the cleaner.",
              "So the canteen was NOT completely empty → statement is FALSE.",
            ],
            tip: "'Other than' = except for. There was still a cleaner at the canteen. The canteen was not completely empty.",
          },
        },
        {
          id: "ny22_G40",
          type: "A",
          qNumber: 40,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "True or False: The school dismissal bell rang.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal Comprehension — True/False",
            steps: [
              "What bell rang in the story?",
              "Passage: 'the school bell rang' and students were ARRIVING with their school bags.",
              "Students arriving with bags = start of school, not dismissal.",
              "The bell that rang was the ASSEMBLY/START bell, not the dismissal bell.",
              "Statement is FALSE.",
            ],
            tip: "Students walking UP to classrooms WITH school bags = start of school. The bell was a start-of-school bell, not dismissal.",
          },
        },
        {
          id: "ny22_G41",
          type: "A",
          qNumber: 41,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "What did Shane expect to see after climbing up the stairs to his classroom? [2m]",
          answer:
            "Shane expected to see his classmates having English lesson in the classroom.",
          solution: {
            method: "Open-Ended — Inference/Literal",
            steps: [
              "Find what Shane expected when he reached his classroom.",
              "Passage: 'Shouldn't we be having English lesson now?' he wondered.",
              "He expected to see his class having English lesson.",
              "But instead, the classroom was empty — which confused him.",
            ],
            tip: "Shane thought it was after assembly and English lesson should be going on. He expected students in class having English lesson.",
          },
        },
        {
          id: "ny22_G42",
          type: "A",
          qNumber: 42,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Pick out a three-word phrase from paragraph 3 which shows that Shane was confused when he saw his classmates climbing up the stairs.",
          answer: "scratched his head",
          solution: {
            method: "Literal — Find Phrase",
            steps: [
              "Find paragraph 3 — 'When he looked down, his classmates were walking up the stairs with their school bags. Shane scratched his head.'",
              "Three-word phrase: 'scratched his head' = body language showing confusion/puzzlement.",
            ],
            tip: "'Scratching one's head' is a common idiom/body language for being confused or puzzled.",
          },
        },
        {
          id: "ny22_G43",
          type: "A",
          qNumber: 43,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Based on paragraph 5, explain fully why Tim thought that Shane's behaviour was strange. [2m]",
          answer:
            "Tim thought Shane's behaviour was strange because Shane was hiding behind the wall next to the classroom. Shane was always at the assembly area at that time, so hiding behind the wall was unusual behaviour.",
          solution: {
            method: "Open-Ended — Explanation with Evidence",
            steps: [
              "Find paragraph 5 — Tim's question to Shane.",
              "Tim said: 'Why are you hiding behind the wall? You are always at the assembly area.'",
              "Two points: (1) Shane was hiding behind the wall (unusual); (2) Shane is normally at the assembly area.",
              "The contrast between Shane's normal behaviour (assembly area) and his current behaviour (hiding) made Tim think it was strange.",
              "Full answer must explain BOTH: what Shane was doing AND why it was unusual.",
            ],
            tip: "Give TWO points: (1) what Shane was doing = hiding behind the wall; (2) why this was strange = he is normally at the assembly area. Always explain fully for 2-mark questions.",
          },
        },
        {
          id: "ny22_G44",
          type: "A",
          qNumber: 44,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Based on the last paragraph, tick (√) one word that best describes how Shane felt after he learnt that he was not late for school.",
          options: ["nervous", "proud", "amused"],
          answer: 3,
          answerText: "amused",
          solution: {
            method: "Inferential Comprehension — Emotions",
            steps: [
              "Last paragraph: 'Shane joined in the laughter. The mystery was finally solved. He had not been late after all!'",
              "Shane laughed along with Tim → laughter = amusement.",
              "(1) 'nervous' = anxious — no longer nervous since he knows he's not late.",
              "(2) 'proud' = pleased with an achievement — no achievement described.",
              "'Amused' = finding something funny → he laughed about the mix-up.",
            ],
            tip: "'Joined in the laughter' = found it funny = amused. When someone laughs, they are amused.",
          },
        },
      ],
    },
  ],
};

export default eoy_nanyang_p2_2022;
