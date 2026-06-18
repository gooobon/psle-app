// src/data/p3/english/papers/eoy_rosyth_p2_2022.ts
// Rosyth School — P3 English Language EOY 2022 (Paper 2)
// Booklet A (Q1–14, 14 marks) + Booklet B (Q15–49, 36 marks) = 50 marks total
// Sections: A Grammar MCQ, B Vocab MCQ, C Grammar Cloze (×2),
//           D Editing, E Vocab Cloze, F Sentence Manipulation,
//           G Comprehension Cloze, H Comprehension OE (Sarah & boar),
//           I Comprehension OE (Ben & starfish)

import { PaperSet } from "../../types";

const eoy_rosyth_p2_2022: PaperSet = {
  id: "eoy_rosyth_p2_2022",
  school: "Rosyth School",
  schoolCode: "rosyth",
  level: "P3",
  subject: "English",
  paperType: "EOY",
  year: 2022,
  paper: 2,
  totalMarks: 50,
  sections: [
    // ─────────────────────────────────────────────
    // BOOKLET A — Section A: Grammar MCQ (Q1–Q8, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secA",
      sectionLabel: "Booklet A — Section A: Grammar",
      topic: "GrammarMCQ",
      instructions:
        "For questions 1 to 8, choose the most suitable answer and shade the correct number (1, 2, 3 or 4) on the OAS given.",
      marks: 8,
      questions: [
        {
          id: "ros22_A1",
          type: "A",
          qNumber: 1,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The girls __________ surprised when they won the singing competition.",
          options: ["is", "are", "was", "were"],
          answer: 4,
          answerText: "were",
          solution: {
            method: "Subject-Verb Agreement + Past Tense",
            steps: [
              "Subject: 'The girls' — plural noun.",
              "Context: 'when they WON' — past tense event.",
              "Plural subject + past tense → 'were'.",
              "(3) 'was' = singular past; (1)(2) present tense.",
            ],
            tip: "Girls = plural → 'were'. Past event (won) → past tense. 'The girls WERE surprised.'",
          },
        },
        {
          id: "ros22_A2",
          type: "A",
          qNumber: 2,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Lisa stared __________ the cockroach for a few seconds before running out of the room.",
          options: ["at", "on", "in", "by"],
          answer: 1,
          answerText: "at",
          solution: {
            method: "Collocations — Stare at",
            steps: [
              "'Stare at' is a fixed collocation — when you direct your gaze intensely at something.",
              "'Stared at the cockroach' = looked at it fixedly.",
              "(2) 'on' and (3) 'in' are wrong prepositions for this verb; (4) 'by' means beside.",
            ],
            tip: "'Stare AT', 'look AT', 'glare AT' — these verbs all use 'at' when directing gaze toward something.",
          },
        },
        {
          id: "ros22_A3",
          type: "A",
          qNumber: 3,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"__________ paintings here are nicer than the ones in the next shop. Let\'s buy them!" suggested Siti to her mother.',
          options: ["This", "These", "That", "Those"],
          answer: 2,
          answerText: "These",
          solution: {
            method: "Demonstrative Adjectives",
            steps: [
              "'Paintings here' = near the speaker (Siti is in the shop looking at the paintings).",
              "Near + plural noun ('paintings') → 'These'.",
              "(1) 'This' = near + singular; (3) 'That' = far + singular; (4) 'Those' = far + plural.",
              "'These paintings here' — near and plural. ✓",
            ],
            tip: "Here = near → This (singular) or These (plural). 'These paintings here' = near + plural.",
          },
        },
        {
          id: "ros22_A4",
          type: "A",
          qNumber: 4,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The printer is very old __________ it can still be used.",
          options: ["but", "so", "because", "or"],
          answer: 1,
          answerText: "but",
          solution: {
            method: "Conjunctions — Contrast",
            steps: [
              "Two contrasting ideas: very old (negative trait) VS. can still be used (positive fact).",
              "'But' = contrast/concession.",
              "(2) 'so' = result; (3) 'because' = reason; (4) 'or' = alternative.",
              "'Very old BUT can still be used' — despite being old, it still works. ✓",
            ],
            tip: "'But' links two contrasting ideas: 'old BUT still useful'. It shows a surprising or unexpected contrast.",
          },
        },
        {
          id: "ros22_A5",
          type: "A",
          qNumber: 5,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Fred is new to the school, so he needs __________ to show him around. Could one of you please volunteer?" asked the teacher.',
          options: ["nobody", "somebody", "anybody", "everybody"],
          answer: 2,
          answerText: "somebody",
          solution: {
            method: "Indefinite Pronouns",
            steps: [
              "The teacher wants ONE person to volunteer — a specific (but unknown) person.",
              "'Somebody' = a specific but unnamed person.",
              "(1) 'nobody' = no one — opposite of what's needed; (3) 'anybody' = used in questions/negatives ('Does anybody want to help?'); (4) 'everybody' = all people.",
              "Affirmative sentence needing a volunteer → 'somebody'. ✓",
            ],
            tip: "'Somebody/someone' = used in affirmative sentences for an unknown but specific person. 'Anybody' is for questions.",
          },
        },
        {
          id: "ros22_A6",
          type: "A",
          qNumber: 6,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Last week, the students __________ their art pieces to school for the art exhibition.",
          options: ["bring", "have brought", "brought", "were bringing"],
          answer: 3,
          answerText: "brought",
          solution: {
            method: "Simple Past Tense",
            steps: [
              "Time marker: 'Last week' = a specific past time.",
              "Simple past = completed action at a specific past time.",
              "'Brought' = past tense of 'bring'. ✓",
              "(1) 'bring' = present base; (2) 'have brought' = present perfect; (4) 'were bringing' = past continuous.",
            ],
            tip: "'Last week' = simple past. 'Brought' is the irregular past tense of 'bring'.",
          },
        },
        {
          id: "ros22_A7",
          type: "A",
          qNumber: 7,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Listen carefully, Mrs Lee __________ important information on the Children\'s Day celebrations right now," said Ms Tan.',
          options: ["gives", "is giving", "gave", "has given"],
          answer: 2,
          answerText: "is giving",
          solution: {
            method: "Present Continuous — Action Happening Now",
            steps: [
              "Key phrase: 'right now' = action happening at this very moment.",
              "Present continuous = is/am/are + verb-ing.",
              "'Mrs Lee IS GIVING important information right now.' ✓",
              "(1) 'gives' = habitual; (3) 'gave' = past; (4) 'has given' = present perfect.",
            ],
            tip: "'Right now' = present continuous. 'Mrs Lee IS GIVING' = she is doing it at this moment.",
          },
        },
        {
          id: "ros22_A8",
          type: "A",
          qNumber: 8,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "My mother asked me, \"Why don't you save __________ of your pocket money in your piggy bank?\"",
          options: ["some", "little", "much", "many"],
          answer: 1,
          answerText: "some",
          solution: {
            method: "Quantifiers — Uncountable Nouns in Suggestions",
            steps: [
              "'Pocket money' = uncountable noun (money is uncountable).",
              "In affirmative sentences and suggestions: 'some' is used for a portion/amount.",
              "'Save SOME of your pocket money' = save a portion of it. ✓",
              "(2) 'little' = small amount (negative connotation — not quite right for this encouraging suggestion); (3) 'much' = large amount (doesn't fit a gentle suggestion); (4) 'many' = countable nouns only.",
            ],
            tip: "'Some' is used in suggestions and affirmative sentences for an unspecified amount: 'save some money'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET A — Section B: Vocabulary MCQ (Q9–Q14, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secB",
      sectionLabel: "Booklet A — Section B: Vocabulary",
      topic: "VocabMCQ",
      instructions:
        "For questions 9 to 14, choose the most suitable answer and shade the correct number (1, 2, 3 or 4) on the OAS given.",
      marks: 6,
      questions: [
        {
          id: "ros22_B9",
          type: "A",
          qNumber: 9,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Rina tried to __________ herself by wearing a pair of sunglasses and a wig but we could still recognise her.",
          options: ["hide", "conceal", "disguise", "camouflage"],
          answer: 3,
          answerText: "disguise",
          solution: {
            method: "Precise Verb — Changing Appearance",
            steps: [
              "Rina wore sunglasses and a wig to change how she looks so people wouldn't recognise her.",
              "'Disguise' = change one's appearance to prevent recognition.",
              "(1) 'hide' = conceal oneself (she's not hiding her body, she's changing her looks); (2) 'conceal' = hide an object; (4) 'camouflage' = blend into the surroundings (like soldiers).",
              "'Disguise herself' = alter her appearance. ✓",
            ],
            tip: "'Disguise' = dress up to look like someone/something else. 'Disguise yourself' is the right phrase for using costume items.",
          },
        },
        {
          id: "ros22_B10",
          type: "A",
          qNumber: 10,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Mary jumped up and down __________ when she heard that she had won a prize.",
          options: ["carefully", "excitedly", "patiently", "anxiously"],
          answer: 2,
          answerText: "excitedly",
          solution: {
            method: "Adverb of Manner — Context",
            steps: [
              "Mary jumped up and down = an action showing strong positive emotion.",
              "Winning a prize → happiness and excitement.",
              "'Excitedly' = in an excited/enthusiastic manner. ✓",
              "(1) 'carefully' = with caution; (3) 'patiently' = with patience; (4) 'anxiously' = with worry/nervousness.",
            ],
            tip: "Jumping up and down = excitement. 'Excitedly' is the natural adverb for a joyful physical response to winning.",
          },
        },
        {
          id: "ros22_B11",
          type: "A",
          qNumber: 11,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Lions stalk their __________ at the grasslands before attacking them.",
          options: ["hunters", "preys", "keepers", "predators"],
          answer: 2,
          answerText: "preys",
          solution: {
            method: "Domain Vocabulary — Wildlife",
            steps: [
              "Lions are predators that hunt other animals.",
              "'Prey' = an animal that is hunted by another animal for food.",
              "(1) 'hunters' = those who hunt — lions are the hunters here; (3) 'keepers' = people who look after animals; (4) 'predators' = animals that hunt — lions ARE the predators.",
              "'Stalk their prey' = follow animals they intend to eat. ✓",
            ],
            tip: "Predator vs prey: predator = the hunter; prey = the hunted. Lions stalk their PREY (the animals they will eat).",
          },
        },
        {
          id: "ros22_B12",
          type: "A",
          qNumber: 12,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "When John noticed a stranger following him, he was __________ and his face was as white as a sheet of paper.",
          options: ["frightened", "angry", "disappointed", "upset"],
          answer: 1,
          answerText: "frightened",
          solution: {
            method: "Context — Emotional State",
            steps: [
              "Clue: 'his face was as white as a sheet of paper' = idiom for extreme fear/fright.",
              "'Frightened' = very scared.",
              "(2) anger doesn't cause face to turn white; (3) disappointment doesn't either; (4) upset is mild.",
              "White face = fright/fear → 'frightened'. ✓",
            ],
            tip: "'Face as white as a sheet' = idiom for extreme fear. This directly points to 'frightened'.",
          },
        },
        {
          id: "ros22_B13",
          type: "A",
          qNumber: 13,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Bob __________ in pain when he hit his leg against the table.",
          options: ["growled", "snarled", "quivered", "screamed"],
          answer: 4,
          answerText: "screamed",
          solution: {
            method: "Precise Verb — Vocal Response to Pain",
            steps: [
              "Bob hit his leg hard and was in pain — a natural reaction is to cry out.",
              "'Screamed' = gave a loud cry of pain. ✓",
              "(1) 'growled' = low threatening sound (like a dog); (2) 'snarled' = spoke angrily with bared teeth; (3) 'quivered' = shook/trembled.",
              "Hitting a leg = sudden sharp pain → scream is the natural response.",
            ],
            tip: "Sudden pain → scream. 'Growled' and 'snarled' are more for animals or anger. 'Screamed in pain' is the natural collocation.",
          },
        },
        {
          id: "ros22_B14",
          type: "A",
          qNumber: 14,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The two good friends are so close that they are __________.",
          options: [
            "as busy as bees",
            "as tall as trees",
            "as sweet as sugar",
            "like peas in a pod",
          ],
          answer: 4,
          answerText: "like peas in a pod",
          solution: {
            method: "Idioms — Closeness/Similarity",
            steps: [
              "Key: 'so close' = very similar, always together, inseparable.",
              "'Like peas in a pod' = very similar, inseparable (peas in the same pod are identical and together).",
              "(1) 'as busy as bees' = very busy; (2) 'as tall as trees' = very tall; (3) 'as sweet as sugar' = very sweet/kind.",
              "Only 'like peas in a pod' expresses closeness/inseparability. ✓",
            ],
            tip: "'Like peas in a pod' = two people who are very close and similar, always together. Perfect for best friends.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section C: Grammar Cloze (Q15–Q22, 8 marks)
    // Part 1: Pronouns word bank (Q15–Q18)
    // Part 2: Cycle verb forms (Q19–Q22)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secC_p1",
      sectionLabel: "Booklet B — Section C: Grammar Cloze — Part 1 (Pronouns)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. Use a word ONCE only.",
      marks: 4,
      passage: {
        title: "Kite Flying Day",
        wordBank: [
          { letter: "A", word: "us" },
          { letter: "B", word: "it" },
          { letter: "C", word: "we" },
          { letter: "D", word: "our" },
          { letter: "E", word: "their" },
          { letter: "F", word: "them" },
        ],
        text: "It was a windy day. My brother and I decided that it was the perfect day to fly kites. (15) ______ headed for the big field at the park near (16) ______ house. There were already a few kites flying in the air. Both of (17) ______ wanted to have a competition. I knew I would win! My kite flew so high that (18) ______ almost reached the sky! Mother gave me an ice cream for winning the competition.",
      },
      questions: [
        {
          id: "ros22_C15",
          type: "A",
          qNumber: 15,
          topic: "GrammarCloze",
          marks: 1,
          question: "(15) ______ headed for the big field at the park near our house.",
          answer: "C",
          answerText: "we",
          solution: {
            method: "Subject Pronoun — First Person Plural",
            steps: [
              "Subject of the sentence: 'My brother and I' = we.",
              "Subject position (before the verb 'headed') → subject pronoun.",
              "'We headed for the big field.' ✓",
            ],
            tip: "'My brother and I' = 'we'. Subject pronoun at the start of a sentence = we/I/they/she/he.",
          },
        },
        {
          id: "ros22_C16",
          type: "A",
          qNumber: 16,
          topic: "GrammarCloze",
          marks: 1,
          question: "near (16) ______ house.",
          answer: "D",
          answerText: "our",
          solution: {
            method: "Possessive Pronoun",
            steps: [
              "The house belongs to 'my brother and I' = us = we.",
              "Possessive form of 'we' = 'our'.",
              "'Our house' = the house belonging to us. ✓",
            ],
            tip: "Possessive pronouns: my (I), your (you), his/her (he/she), our (we), their (they). 'We' → 'our house'.",
          },
        },
        {
          id: "ros22_C17",
          type: "A",
          qNumber: 17,
          topic: "GrammarCloze",
          marks: 1,
          question: "Both of (17) ______ wanted to have a competition.",
          answer: "A",
          answerText: "us",
          solution: {
            method: "Object Pronoun after Preposition",
            steps: [
              "'Both of ___' — preposition 'of' is followed by an object pronoun.",
              "Referring to 'my brother and I' = us.",
              "After preposition → object pronoun: 'of us'. ✓",
              "Compare: 'Both of us', 'all of them', 'one of her friends'.",
            ],
            tip: "After prepositions (of, with, for, by), use object pronouns: me/him/her/us/them. 'Both of US'.",
          },
        },
        {
          id: "ros22_C18",
          type: "A",
          qNumber: 18,
          topic: "GrammarCloze",
          marks: 1,
          question: "My kite flew so high that (18) ______ almost reached the sky!",
          answer: "B",
          answerText: "it",
          solution: {
            method: "Pronoun Reference — Singular Object",
            steps: [
              "What almost reached the sky? → 'my kite' — singular, inanimate.",
              "Pronoun for a singular inanimate object → 'it'.",
              "'My kite flew so high that IT almost reached the sky.' ✓",
            ],
            tip: "Kite = singular, inanimate → 'it'. Always use 'it' for objects (not 'he' or 'she').",
          },
        },
      ],
    },
    {
      id: "rosyth22_secC_p2",
      sectionLabel: "Booklet B — Section C: Grammar Cloze — Part 2 (Verb Forms)",
      topic: "GrammarCloze",
      instructions:
        "Fill in each blank with the correct word from the box below. Use each word once only.",
      marks: 4,
      passage: {
        title: "Cycling",
        wordBank: [
          { word: "cycles" },
          { word: "cycling" },
          { word: "cycled" },
          { word: "cycle" },
        ],
        text: "There are many types of exercise. One of them is (19) ______. I learnt to (20) ______ at the age of five and I am very good at it now. Last month, I taught my sister how to cycle. Now, she (21) ______ with me every weekend. Once, we took part in a competition and (22) ______ all day. After all the exercise, we reached home tired but exhilarated.",
      },
      questions: [
        {
          id: "ros22_C19",
          type: "A",
          qNumber: 19,
          topic: "GrammarCloze",
          marks: 1,
          question: "One of them is (19) ______.",
          answer: "cycling",
          solution: {
            method: "Gerund as Subject/Complement",
            steps: [
              "'One of them is ___' — after 'is', a gerund (verb-ing) acts as a noun.",
              "'Cycling' = the activity of riding a bicycle (used as a noun/gerund).",
              "Compare: 'One type of exercise is running/swimming/cycling.'",
            ],
            tip: "After 'is/are', a gerund (-ing form) names an activity as a noun. 'One of them is CYCLING.'",
          },
        },
        {
          id: "ros22_C20",
          type: "A",
          qNumber: 20,
          topic: "GrammarCloze",
          marks: 1,
          question: "I learnt to (20) ______ at the age of five.",
          answer: "cycle",
          solution: {
            method: "Infinitive after 'learnt to'",
            steps: [
              "'Learnt to ___' = infinitive structure: learnt + to + base verb.",
              "Base form of cycle = 'cycle'.",
              "'I learnt to cycle' = I learned how to do this activity. ✓",
            ],
            tip: "Learnt/learned + to + BASE VERB. 'I learned to cycle/swim/drive.' Always base form after 'to'.",
          },
        },
        {
          id: "ros22_C21",
          type: "A",
          qNumber: 21,
          topic: "GrammarCloze",
          marks: 1,
          question: "she (21) ______ with me every weekend.",
          answer: "cycles",
          solution: {
            method: "Simple Present — Habitual Action, 3rd Person Singular",
            steps: [
              "'Every weekend' = habitual action → simple present.",
              "Subject: 'she' = 3rd person singular → verb + -s.",
              "'She cycles with me every weekend.' ✓",
            ],
            tip: "'Every weekend' = habitual present. 'She' (3rd person singular) → cycles (with -s).",
          },
        },
        {
          id: "ros22_C22",
          type: "A",
          qNumber: 22,
          topic: "GrammarCloze",
          marks: 1,
          question: "we took part in a competition and (22) ______ all day.",
          answer: "cycled",
          solution: {
            method: "Simple Past — Completed Action",
            steps: [
              "'Once, we took part' — past tense ('took' = past of take).",
              "Parallel action also in past: 'and (22) ___ all day'.",
              "Past tense of 'cycle' = 'cycled'. ✓",
            ],
            tip: "'Took part' (past) and 'cycled' (past) are parallel. Both actions happened in the past competition.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section D: Editing (Q23–Q25, 3 marks)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secD",
      sectionLabel: "Booklet B — Section D: Editing",
      topic: "Editing",
      instructions:
        "Each of the underlined words contains either a spelling or grammatical error. Write the correct word in each of the boxes.",
      marks: 3,
      passage: {
        title: "Recycling with John",
        text: "John looked at the rubbish placed in the recycling bin and was horrified that there were many cockroaches crawling out of it. His mother suggested that they clean the bin. Together, they throw (23) away the rubbish. They also washed a varaiety (24) of recyclables such as glass bottles and plastic containers. John found recycling intresting (25) and meaningful, so he asked a few of his friends to help. John's mother praised John and his friends for helping to keep the environment clean.",
      },
      questions: [
        {
          id: "ros22_D23",
          type: "A",
          qNumber: 23,
          topic: "Editing",
          marks: 1,
          question: "they throw away the rubbish (grammatical error)",
          errorWord: "throw",
          answer: "threw",
          solution: {
            method: "Verb Tense Correction",
            steps: [
              "Context is past tense: 'mother suggested', 'they clean the bin' (reported speech, past context).",
              "The action of throwing the rubbish happened in the past.",
              "Past tense of 'throw' = 'threw'. ✓",
            ],
            tip: "Past tense of 'throw' = 'threw' (irregular verb). Throw → threw → thrown.",
          },
        },
        {
          id: "ros22_D24",
          type: "A",
          qNumber: 24,
          topic: "Editing",
          marks: 1,
          question: "a varaiety of recyclables (spelling error)",
          errorWord: "varaiety",
          answer: "variety",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Varaiety' is a misspelling.",
              "Correct: v-a-r-i-e-t-y.",
              "Memory trick: vari-ETY. The middle is 'i-e' not 'a-i'.",
            ],
            tip: "Variety: v-a-r-i-e-t-y. A common misspelling. Remember: vari + ety.",
          },
        },
        {
          id: "ros22_D25",
          type: "A",
          qNumber: 25,
          topic: "Editing",
          marks: 1,
          question: "recycling intresting (spelling error)",
          errorWord: "intresting",
          answer: "interesting",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Intresting' is missing the second 'e'.",
              "Correct: i-n-t-e-r-e-s-t-i-n-g.",
              "Root: 'interest' + -ing → interesting. Never drop the 'e' in 'interest'.",
            ],
            tip: "Interesting = interest + -ing. Keep the 'e' in 'interest': int-e-r-e-st-ing.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section E: Vocabulary Cloze (Q26–Q29, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secE",
      sectionLabel: "Booklet B — Section E: Vocabulary Cloze",
      topic: "VocabCloze",
      instructions:
        "For questions 26 to 29, read the passage carefully, choose the correct word from the words given in the box and write its letter (A to H) in each blank. Use each option ONCE only.",
      marks: 4,
      passage: {
        title: "The Venus Flytrap",
        wordBank: [
          { letter: "A", word: "prey" },
          { letter: "B", word: "traps" },
          { letter: "C", word: "observes" },
          { letter: "D", word: "carnivorous" },
          { letter: "E", word: "unusual" },
          { letter: "F", word: "poisonous" },
          { letter: "G", word: "nutrients" },
          { letter: "H", word: "harmless" },
        ],
        text: "The Venus flytrap makes food using sunlight. However, the plant is not like other plants and is very (26) ______. The Venus flytrap is (27) ______ as it captures insects and eats them. When an insect crawls in between a leaf, the hairs detect its presence. At once, the leaf snaps shut and (28) ______ the insect, making it hard for it to escape. Then, it lets out a liquid that helps to digest the insect and in turn provides the plant with extra (29) ______. This process takes about 10 days.",
      },
      questions: [
        {
          id: "ros22_E26",
          type: "A",
          qNumber: 26,
          topic: "VocabCloze",
          marks: 1,
          question: "the plant is not like other plants and is very (26) ______.",
          answer: "E",
          answerText: "unusual",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "The Venus flytrap is 'not like other plants' = different from normal plants.",
              "'Unusual' = not normal, different from what is expected.",
              "A plant that eats insects is definitely unusual. ✓",
            ],
            tip: "'Not like other plants' = unusual. The Venus flytrap is unusual because most plants don't eat insects.",
          },
        },
        {
          id: "ros22_E27",
          type: "A",
          qNumber: 27,
          topic: "VocabCloze",
          marks: 1,
          question: "The Venus flytrap is (27) ______ as it captures insects and eats them.",
          answer: "D",
          answerText: "carnivorous",
          solution: {
            method: "Context Vocabulary — Science",
            steps: [
              "'Captures insects and EATS them' = the plant eats animals/insects.",
              "'Carnivorous' = meat/animal-eating.",
              "A plant that eats insects = carnivorous plant. ✓",
            ],
            tip: "Carnivorous = eats meat/animals. Venus flytraps are famous carnivorous plants.",
          },
        },
        {
          id: "ros22_E28",
          type: "A",
          qNumber: 28,
          topic: "VocabCloze",
          marks: 1,
          question: "the leaf snaps shut and (28) ______ the insect, making it hard for it to escape.",
          answer: "B",
          answerText: "traps",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "The leaf snaps shut → the insect is enclosed and cannot escape.",
              "'Traps' = catches/encloses so escape is impossible. ✓",
              "(A) 'prey' = noun (the thing hunted); the blank needs a verb.",
            ],
            tip: "The leaf snaps shut → it TRAPS the insect (makes it unable to escape). 'Traps' is a verb here.",
          },
        },
        {
          id: "ros22_E29",
          type: "A",
          qNumber: 29,
          topic: "VocabCloze",
          marks: 1,
          question: "it lets out a liquid that helps to digest the insect and provides the plant with extra (29) ______.",
          answer: "G",
          answerText: "nutrients",
          solution: {
            method: "Context Vocabulary — Science",
            steps: [
              "The plant digests the insect to absorb what it needs to grow.",
              "'Nutrients' = substances that help living things grow and stay healthy.",
              "The digested insect provides the plant with extra nutrients. ✓",
            ],
            tip: "Digesting food → absorbing nutrients. 'Nutrients' = vitamins, minerals, proteins needed for growth.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section F: Sentence Manipulation (Q30–Q31, 2 marks)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secF",
      sectionLabel: "Booklet B — Section F: Sentence Manipulation",
      topic: "SentenceCombining",
      instructions:
        "For questions 30 and 31, rewrite the given sentences using the words provided. Your answer must be in ONE sentence. The meaning of your sentence must be the same as the meaning of the given sentence(s).",
      marks: 2,
      questions: [
        {
          id: "ros22_F30",
          type: "A",
          qNumber: 30,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Joe washed the plates. Joe washed the bowls.\n\nRewrite using: and",
          answer: "Joe washed the plates and bowls.",
          alternativeAnswers: ["Joe washed the plates and the bowls."],
          solution: {
            method: "Combining Shared Subject and Verb",
            steps: [
              "Both sentences share the same subject (Joe) and verb (washed).",
              "Only the objects differ: plates / bowls.",
              "Combine the objects with 'and': 'the plates AND bowls'.",
              "'Joe washed the plates and bowls.' ✓",
            ],
            tip: "When two sentences share the same subject and verb, combine just the objects: 'Joe washed the plates AND bowls.'",
          },
        },
        {
          id: "ros22_F31",
          type: "A",
          qNumber: 31,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Susan was doing her homework. The telephone rang.\n\nRewrite using: when",
          answer: "Susan was doing her homework when the telephone rang.",
          solution: {
            method: "Sentence Combining — When (Interruption)",
            steps: [
              "'When' introduces an event that happened during or interrupted another.",
              "Background action: Susan was doing her homework (ongoing = past continuous).",
              "Interrupting event: the telephone rang (sudden = simple past).",
              "'Susan WAS DOING her homework WHEN the telephone RANG.' ✓",
            ],
            tip: "'Was doing [ongoing] when [sudden event] rang' = classic past continuous + simple past pattern.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section G: Comprehension Cloze (Q32–Q34, 3 marks)
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secG",
      sectionLabel: "Booklet B — Section G: Comprehension Cloze",
      topic: "VocabCloze",
      instructions:
        "Read the passage carefully. For questions 32 to 34, fill in each of the blanks with the most suitable word. You are only allowed to use one word for each blank.",
      marks: 3,
      passage: {
        title: "Koalas",
        source: "Adapted from www.natgeokids.com",
        text: "Koalas are found in the forests of eastern Australia. They have grey fur with a cream-coloured chest. They also have strong, clawed feet, perfect for living in the branches of trees. It is believed that koalas get almost all their moisture (32) ______ the leaves they eat as they rarely drink water. Although you may have heard people call (33) ______ koala bears, these amazing animals are not bears at all — they are in fact marsupials. Most marsupials have pouches where their newborns develop. When an infant koala, called a joey, is born, it immediately climbs up to its mother's pouch. Blind and earless, a joey uses its strong sense of touch (34) ______ smell, as well as natural instinct, to find its way. A joey grows and develops in the pouch for about six months.",
      },
      questions: [
        {
          id: "ros22_G32",
          type: "A",
          qNumber: 32,
          topic: "VocabCloze",
          marks: 1,
          question: "koalas get almost all their moisture (32) ______ the leaves they eat.",
          answer: "from",
          solution: {
            method: "Preposition — Source",
            steps: [
              "The koalas get moisture FROM a source — the leaves.",
              "'From' indicates origin/source: 'moisture FROM the leaves'.",
              "They get moisture BY EATING the leaves → 'from' shows the source.",
            ],
            tip: "'Get [something] FROM [source]': koalas get moisture FROM the leaves. 'From' = source/origin.",
          },
        },
        {
          id: "ros22_G33",
          type: "A",
          qNumber: 33,
          topic: "VocabCloze",
          marks: 1,
          question: "you may have heard people call (33) ______ koala bears.",
          answer: "them",
          solution: {
            method: "Object Pronoun — Reference",
            steps: [
              "'People call (33) koala bears' — who do people call koala bears? Koalas.",
              "Koalas (plural) → object pronoun 'them'.",
              "'People call THEM koala bears.' = people refer to koalas as koala bears. ✓",
            ],
            tip: "Koalas (plural) = them. 'Call them koala bears' = refer to them by that name.",
          },
        },
        {
          id: "ros22_G34",
          type: "A",
          qNumber: 34,
          topic: "VocabCloze",
          marks: 1,
          question: "a joey uses its strong sense of touch (34) ______ smell, as well as natural instinct.",
          answer: "and",
          solution: {
            method: "Conjunction — Listing",
            steps: [
              "The joey uses two senses: touch AND smell.",
              "'And' joins the two senses listed together.",
              "Structure: 'sense of touch AND smell' = both senses used together.",
            ],
            tip: "'Touch AND smell' = two senses listed. 'And' joins two things that both apply.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section H: Comprehension OE (Q35–Q42, 8 marks)
    // Sarah and the Wild Boar
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secH",
      sectionLabel: "Booklet B — Section H: Comprehension",
      topic: "ComprehensionOE",
      instructions:
        "Read the following passage carefully. Then write the answers for questions 35 to 42.",
      marks: 8,
      passage: {
        title: "Sarah and the Wild Boar",
        text: `I was on my way to school when I saw a boy sitting on the ground near a bench. Curious, I walked to him.

"What happened, Andy? Are you all right?" I asked. He frowned and wondered why I knew his name. I pointed to his nametag and he smiled. Andy told me he had a fall on the way to school as he was chased by a wild boar. I thought he was joking and stifled a laugh.

"You are joking, aren't you?" I winked at Andy. Just then, he had a look of horror on his face.

"Look out! The wild boar is here again!" Andy shrieked. Fortunately, the wild boar ran across the road and disappeared into Yishun Park. I heaved a loud sigh of relief and decided to call my mother for help. Within minutes, Mother rushed to the scene.

"Thank goodness, Sarah! I'm so glad that both of you are fine," Mother muttered under her breath. Without hesitation, she helped Andy up and together, we walked to school.

As Andy limped, he thanked my mother and me for helping him. Although I was late for school that day, I was not scolded by my teacher, Mr Tan. In fact, after he knew what had happened, Mr Tan praised me for the good deed I had done.`,
      },
      questions: [
        {
          id: "ros22_H35",
          type: "A",
          qNumber: 35,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Why did Sarah walk to Andy? [1m]",
          options: [
            "Andy was Sarah's friend.",
            "Andy asked Sarah for help.",
            "Sarah wished to know Andy's name.",
            "Sarah wanted to know if Andy needed help.",
          ],
          answer: 4,
          answerText: "Sarah wanted to know if Andy needed help.",
          solution: {
            method: "Inferential Comprehension",
            steps: [
              "Passage: 'Curious, I walked to him.' Then she asked 'What happened, Andy? Are you all right?'",
              "She was curious about why he was sitting on the ground and approached to check on him.",
              "(1) No evidence they were friends — she didn't even know his name; (2) Andy didn't ask; (3) She asked what happened, not his name.",
              "She walked to him out of curiosity/concern → to find out if he needed help. ✓",
            ],
            tip: "Sarah asked 'Are you all right?' = she was checking if he needed help. She walked over because she was curious and concerned.",
          },
        },
        {
          id: "ros22_H36",
          type: "A",
          qNumber: 36,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "In lines 7 and 8, why did Andy have 'a look of horror' on his face? [1m]",
          answer:
            "Andy had a look of horror because he saw the wild boar again.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Just after Andy had the 'look of horror', he shouted: 'Look out! The wild boar is here again!'",
              "He saw the wild boar return → caused his horrified expression.",
            ],
            tip: "Immediately after the look of horror, Andy screams 'The wild boar is here again!' = he saw the boar return.",
          },
        },
        {
          id: "ros22_H37",
          type: "A",
          qNumber: 37,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: Andy was chased by a wild boar.",
          options: ["True", "False"],
          answer: 1,
          answerText: "True",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'Andy told me he had a fall on the way to school as he was chased by a wild boar.'",
              "This directly states Andy was chased by a wild boar. TRUE. ✓",
            ],
            tip: "Directly stated in the passage. Andy said he was chased by a wild boar and had a fall.",
          },
        },
        {
          id: "ros22_H38",
          type: "A",
          qNumber: 38,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: Sarah waited for her mother for more than an hour.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'Within minutes, Mother rushed to the scene.'",
              "'Within minutes' = less than an hour, not more.",
              "Statement says MORE THAN an hour → FALSE. ✓",
            ],
            tip: "'Within minutes' = very quickly. The statement says 'more than an hour' which contradicts this. FALSE.",
          },
        },
        {
          id: "ros22_H39",
          type: "A",
          qNumber: 39,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: Sarah reached school punctually.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'Although I was late for school that day...'",
              "Sarah was LATE for school → she did NOT reach punctually.",
              "Statement says 'punctually' (on time) → FALSE. ✓",
            ],
            tip: "The passage explicitly says 'I was late for school that day.' Being late = NOT punctual. FALSE.",
          },
        },
        {
          id: "ros22_H40",
          type: "A",
          qNumber: 40,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to indicate the order in which the events happened in the story. [1m]\n\n___ Sarah called her mother for help.\n___ Andy saw a wild boar.\n___ Sarah's teacher praised her.",
          answer: "2 / 1 / 3",
          answerDetail: {
            "Sarah called her mother for help": "2",
            "Andy saw a wild boar": "1",
            "Sarah's teacher praised her": "3",
          },
          solution: {
            method: "Sequencing",
            steps: [
              "FIRST: Andy was chased by the wild boar (before he even met Sarah). He also sees it again → 'Andy saw a wild boar' = first event.",
              "SECOND: Sarah called her mother for help (after the boar disappeared).",
              "THIRD: Mr Tan praised Sarah (at school, after everything).",
              "Order: Wild boar (1) → Call mother (2) → Praised (3).",
            ],
            tip: "The boar encounter is first (it's why Andy fell), then Sarah calls mum, then the teacher praises her at school.",
          },
        },
        {
          id: "ros22_H41",
          type: "A",
          qNumber: 41,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "In the last paragraph, which word has the same meaning as 'reprimanded'? [1m]",
          answer: "scolded",
          solution: {
            method: "Vocabulary — Synonym in Passage",
            steps: [
              "'Reprimanded' = formally told off / scolded.",
              "Last paragraph: 'I was not scolded by my teacher, Mr Tan.'",
              "'Scolded' = told off/reprimanded. ✓",
            ],
            tip: "'Reprimanded' and 'scolded' are synonyms — both mean to tell someone off for doing wrong.",
          },
        },
        {
          id: "ros22_H42",
          type: "A",
          qNumber: 42,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Why did Mr Tan praise Sarah? [1m]",
          answer:
            "Mr Tan praised Sarah because she had done a good deed by helping Andy.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Passage: 'Mr Tan praised me for the good deed I had done.'",
              "The good deed = helping Andy (a stranger who was hurt and in need).",
              "Full answer: Mr Tan praised Sarah for helping Andy / for the good deed she did.",
            ],
            tip: "The passage says 'praised me for the good deed I had done.' The good deed = helping Andy who was hurt.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section I: Comprehension OE (Q43–Q49, 8 marks)
    // Ben and the Starfish Girl
    // ─────────────────────────────────────────────
    {
      id: "rosyth22_secI",
      sectionLabel: "Booklet B — Section I: Comprehension",
      topic: "ComprehensionOE",
      instructions:
        "Read the following passage carefully. Then write the answers for questions 43 to 49.",
      marks: 8,
      passage: {
        title: "The Starfish Story",
        source: "Adapted from the Starfish Story by Loren Eiseley",
        text: `Ben liked to go to the beach for a walk whenever he was bored. One day, as he was strolling along the beach, he saw a human figure moving like a dancer. Ben was puzzled why someone would dance on the beach under the hot afternoon sun.

As Ben got closer, he noticed that it was a little girl and she was not dancing at all. The little girl was picking up a starfish and throwing it into the sea.

"Hello! What are you doing?" Ben asked. The girl looked up, and replied politely, "I'm throwing these animals into the sea."

"Why are you throwing the starfish into the sea?" said Ben, looking startled. To this, the young girl replied, "The sun is up and if I don't throw them back to the sea, they'll dry up and die." Upon hearing this, Ben asked, "Do you realise that there are thousands of starfish along the beach?"

The girl did not reply but smiled. She bent down, picked up another starfish and threw it into the sea. She said, "I am saving one starfish at a time. Each time I do this, I am making a difference to each starfish stranded on the beach." When Ben heard that, he was embarrassed. He said, "I just learnt that I can make a difference to the starfish stranded on the beach, one at a time." That day, he joined the young girl to throw the starfish back into the sea.`,
      },
      questions: [
        {
          id: "ros22_I43",
          type: "A",
          qNumber: 43,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Ben would go to the beach whenever __________. [1m] Tick your chosen answer.",
          options: ["he was bored", "he wanted to dance", "it was a hot day"],
          answer: 1,
          answerText: "he was bored",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Passage: 'Ben liked to go to the beach for a walk whenever he was bored.'",
              "The reason Ben went to the beach = when he was bored. ✓",
            ],
            tip: "Directly stated: 'whenever he was bored'. Read the first sentence carefully.",
          },
        },
        {
          id: "ros22_I44",
          type: "A",
          qNumber: 44,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word has the same meaning as 'clueless'? Circle (A) or (B). [1m]\n\nBen was puzzled (A) why someone would dance on the beach under the hot (B) afternoon sun.",
          options: ["puzzled (A)", "hot (B)"],
          answer: 1,
          answerText: "puzzled (A)",
          solution: {
            method: "Vocabulary — Synonym",
            steps: [
              "'Clueless' = not understanding, not knowing what is happening.",
              "'Puzzled' = confused/not understanding why something is happening. ✓",
              "'Hot' = high temperature — unrelated to clueless.",
            ],
            tip: "'Puzzled' and 'clueless' are synonyms — both mean not understanding or being confused by something.",
          },
        },
        {
          id: "ros22_I45",
          type: "A",
          qNumber: 45,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "What do the words 'these animals' in line 8 refer to? [1m]",
          answer: "The starfishes / The starfish",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "Line 8: 'I'm throwing these animals into the sea.'",
              "What animals was the girl throwing? → the starfish she was picking up.",
              "'These animals' = the starfishes on the beach. ✓",
            ],
            tip: "Look at what the girl is doing just before she says 'these animals' — she is throwing starfish. 'These animals' = the starfish.",
          },
        },
        {
          id: "ros22_I46",
          type: "A",
          qNumber: 46,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in paragraph 4 tells us that Ben was shocked? [1m]",
          answer: "startled",
          solution: {
            method: "Vocabulary — Find Word in Paragraph",
            steps: [
              "Look in paragraph 4 for a word meaning shocked.",
              "'Why are you throwing the starfish into the sea?' said Ben, looking startled.",
              "'Startled' = suddenly shocked/surprised. ✓",
            ],
            tip: "'Startled' = suddenly surprised or shocked. 'Looking startled' = Ben looked shocked/surprised.",
          },
        },
        {
          id: "ros22_I47",
          type: "A",
          qNumber: 47,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "The girl threw the starfish into the sea one after another because __________. [1m]",
          options: [
            "it was part of a dance.",
            "she wanted to count the starfish.",
            "she hoped the starfish would live.",
            "she wanted the beach to be clean.",
          ],
          answer: 3,
          answerText: "she hoped the starfish would live.",
          solution: {
            method: "Inferential Comprehension",
            steps: [
              "The girl said: 'if I don't throw them back to the sea, they'll dry up and die.'",
              "Her reason: to prevent the starfish from dying = so they would LIVE.",
              "(1) she was not dancing — paragraph 2 says 'she was NOT dancing at all'; (2) no mention of counting; (4) cleanliness not mentioned.",
              "She threw them back so they wouldn't die = so they would live. ✓",
            ],
            tip: "'They'll dry up and die' if not thrown back → she throws them so they'll LIVE. Option (3).",
          },
        },
        {
          id: "ros22_I48",
          type: "A",
          qNumber: 48,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to indicate the order in which the events happened in the story. [1m]\n\n___ Ben saw a human figure moving like a dancer.\n___ Ben was embarrassed when he heard the girl's reply.\n___ Ben was startled at why the girl was throwing starfish into the sea.",
          answer: "1 / 3 / 2",
          answerDetail: {
            "Ben saw a human figure moving like a dancer": "1",
            "Ben was embarrassed when he heard the girl's reply": "3",
            "Ben was startled at why the girl was throwing starfish into the sea": "2",
          },
          solution: {
            method: "Sequencing",
            steps: [
              "FIRST: Ben saw the figure moving like a dancer (paragraph 1).",
              "SECOND: Ben was startled when he asked why she was throwing starfish (paragraph 4).",
              "THIRD: Ben was embarrassed when he heard the girl's full reply about making a difference (paragraph 5).",
              "Order: Saw dancer (1) → Startled (2) → Embarrassed (3).",
            ],
            tip: "Follow the story order: (1) sees figure → (2) asks and is startled → (3) hears full answer and is embarrassed.",
          },
        },
        {
          id: "ros22_I49",
          type: "A",
          qNumber: 49,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "What was the lesson Ben had learnt? [2m]",
          answer:
            "Ben learnt that he could make a difference to the starfish stranded on the beach, one at a time. Even though there were thousands of starfish, every small action of saving one at a time still made a difference.",
          solution: {
            method: "Open-Ended — Theme/Lesson",
            steps: [
              "Passage: 'I just learnt that I can make a difference to the starfish stranded on the beach, one at a time.'",
              "The lesson: small actions matter, even when the problem seems huge.",
              "He realised that saving ONE starfish at a time still counts and makes a difference.",
              "Full 2-mark answer: state (1) what the lesson is + (2) how it applies (even small individual actions matter).",
            ],
            tip: "Ben's lesson = you can make a difference one step/action at a time. Don't be overwhelmed by the big picture — every individual effort counts.",
          },
        },
      ],
    },
  ],
};

export default eoy_rosyth_p2_2022;
