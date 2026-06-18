// =============================================================================
// Nan Hua Primary School – 2023 End-of-Year Examination
// English Language  |  Paper 2 – Language Use & Comprehension  |  Primary 3
// Date: 23 October 2023   Total Time: 1h 15 min   Total Marks: 50
// Section A: Vocabulary MCQ       Q1–6   (6 × 1m = 6m)
// Section B: Grammar MCQ          Q7–14  (8 × 1m = 8m)
// Section C: Grammar Cloze        Q15–22 (8 × 1m = 8m)  2 passages
// Section D: Vocabulary Cloze     Q23–27 (5 × 1m = 5m)
// Section E: Editing (Spelling/Grammar)  Q28–32 (5 × 1m = 5m)
// Section F: Synthesis            Q33–34 (2 × 1m = 2m)
// Section G: Comprehension 1      Q35–41 (8m)  Venus Flytrap
// Section H: Comprehension 2      Q42–47 (8m)  Crocodile and Monkey
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_nanhua_p2_2023: QuestionSet = {
  id: "eoy_nanhua_p2_2023",
  school: "Nan Hua Primary School",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,
  duration: 75,
  questions: [

    // =========================================================================
    // SECTION A: VOCABULARY MCQ  Q1–6  (6 × 1m = 6m)
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q1",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 1,
      marks: 1,
      question:
        "At first, I thought the new boy was shy but I came to the __________ that he was simply unfriendly.",
      options: [
        { label: "1", text: "comment" },
        { label: "2", text: "conclusion" },
        { label: "3", text: "commotion" },
        { label: "4", text: "conversation" },
      ],
      answer: "2",
      solution: {
        method: "Vocabulary in context – mental reasoning / deciding",
        steps: [
          "'I came to the ______' → a fixed phrase meaning arriving at a judgement.",
          "'Come to a conclusion' = to reach a decision or final judgement after thinking.",
          "'Comment' = a remark; 'commotion' = a loud noisy disturbance; 'conversation' = talk.",
          "→ Answer: (2) conclusion",
        ],
        tip: "'Come to a conclusion' = to decide/realise after thinking. Common fixed phrase.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q2",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 2,
      marks: 1,
      question:
        "Jonathan was so upset with his friend that he stormed out of the room __________.",
      options: [
        { label: "1", text: "lazily" },
        { label: "2", text: "angrily" },
        { label: "3", text: "happily" },
        { label: "4", text: "sympathetically" },
      ],
      answer: "2",
      solution: {
        method: "Adverbs of manner – context clue from emotion",
        steps: [
          "'Stormed out' = left suddenly and forcefully, typically in anger.",
          "'So upset' = very angry/frustrated.",
          "'Lazily/happily/sympathetically' don't match anger.",
          "'Angrily' = in an angry manner → matches 'upset' and 'stormed out'.",
          "→ Answer: (2) angrily",
        ],
        tip: "'Stormed out' already implies anger; 'angrily' reinforces the emotion.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q3",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 3,
      marks: 1,
      question:
        "The little boy always hides behind his father whenever he sees strangers. He is as __________ as a mouse.",
      options: [
        { label: "1", text: "timid" },
        { label: "2", text: "angry" },
        { label: "3", text: "gentle" },
        { label: "4", text: "fearless" },
      ],
      answer: "1",
      solution: {
        method: "Similes – animal comparisons + context clue",
        steps: [
          "'As _____ as a mouse' = a simile about mice being scared/shy.",
          "The boy hides from strangers → he is shy/scared.",
          "'As timid as a mouse' = very shy and fearful → common English simile.",
          "'Fearless' is the opposite; 'angry' and 'gentle' don't fit.",
          "→ Answer: (1) timid",
        ],
        tip: "'As timid as a mouse' = very shy and easily frightened. Timid = shy/fearful.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q4",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 4,
      marks: 1,
      question:
        "She __________ her toys under the bed to hide them from her little sister.",
      options: [
        { label: "1", text: "shook" },
        { label: "2", text: "shoved" },
        { label: "3", text: "shaved" },
        { label: "4", text: "shrugged" },
      ],
      answer: "2",
      solution: {
        method: "Verbs of movement – pushing/hiding objects",
        steps: [
          "She is hiding toys UNDER the bed → she pushed them under.",
          "'Shook' = moved back and forth rapidly; not for hiding under bed.",
          "'Shaved' = cut hair/beard; unrelated.",
          "'Shrugged' = raised and lowered shoulders; unrelated.",
          "'Shoved' = pushed forcefully → 'shoved toys under the bed' = pushed them under.",
          "→ Answer: (2) shoved",
        ],
        tip: "'Shoved' = pushed forcefully into a space. 'Shoved under the bed' = pushed them there to hide.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q5",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 5,
      marks: 1,
      question:
        "Joshua __________ to help his mother by washing the dishes and cleaning the kitchen as she had been unwell lately.",
      options: [
        { label: "1", text: "took a break" },
        { label: "2", text: "broke the rule" },
        { label: "3", text: "made an effort" },
        { label: "4", text: "took a deep breath" },
      ],
      answer: "3",
      solution: {
        method: "Phrasal verbs / idioms – making effort to help",
        steps: [
          "Joshua washed dishes and cleaned kitchen → he tried hard to help his mother.",
          "'Took a break' = rested; opposite of effort.",
          "'Broke the rule' = disobeyed; doesn't fit helping context.",
          "'Took a deep breath' = breathed deeply, usually before something stressful.",
          "'Made an effort' = tried hard to do something → correct.",
          "→ Answer: (3) made an effort",
        ],
        tip: "'Make an effort' = to try hard to do something. Joshua made an effort to help.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q6",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 6,
      marks: 1,
      question:
        "My father thanked our __________ neighbours for looking after our house when we went on holiday last week.",
      options: [
        { label: "1", text: "selfish" },
        { label: "2", text: "hostile" },
        { label: "3", text: "helpful" },
        { label: "4", text: "cunning" },
      ],
      answer: "3",
      solution: {
        method: "Character adjectives – context clue from action",
        steps: [
          "The neighbours 'looked after our house' while they were away → they helped.",
          "Father 'thanked' them → they did something positive.",
          "'Selfish' = caring only for oneself; wouldn't help.",
          "'Hostile' = unfriendly/aggressive; wouldn't look after house.",
          "'Cunning' = deceptive; doesn't fit.",
          "'Helpful' = willing to give help → correct.",
          "→ Answer: (3) helpful",
        ],
        tip: "Looking after someone's house = being helpful. Father thanked them = positive action.",
      },
    },

    // =========================================================================
    // SECTION B: GRAMMAR MCQ  Q7–14  (8 × 1m = 8m)
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q7",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 7,
      marks: 1,
      question: "Suzanna __________ off the lights and went to bed.",
      options: [
        { label: "1", text: "switch" },
        { label: "2", text: "switches" },
        { label: "3", text: "switched" },
        { label: "4", text: "was switching" },
      ],
      answer: "3",
      solution: {
        method: "Simple past tense – completed sequential actions",
        steps: [
          "'Went to bed' = simple past → both actions in the past.",
          "Both actions are completed: she switched off lights AND went to bed.",
          "'Switched off' = simple past of 'switch off'.",
          "→ Answer: (3) switched",
        ],
        tip: "When two past actions happen one after the other, use simple past for both: switched...went.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q8",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 8,
      marks: 1,
      question:
        "Ravi was delighted when he won the fishing contest as he caught __________ fish than Simon.",
      options: [
        { label: "1", text: "fewer" },
        { label: "2", text: "much" },
        { label: "3", text: "some" },
        { label: "4", text: "more" },
      ],
      answer: "4",
      solution: {
        method: "Comparatives – more vs fewer + context (winning)",
        steps: [
          "Ravi WON the contest → he caught MORE fish than Simon.",
          "'Fewer' = less (countable) → would mean he caught less, so he'd lose.",
          "'Much/some' are not comparative forms for this context.",
          "'More' = greater quantity → Ravi caught more fish → correct for winning.",
          "→ Answer: (4) more",
        ],
        tip: "He won = he caught MORE fish. 'More than' = greater quantity than another person.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q9",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 9,
      marks: 1,
      question:
        "I am going to __________ you instructions to help you get to the library.",
      options: [
        { label: "1", text: "give" },
        { label: "2", text: "gave" },
        { label: "3", text: "gives" },
        { label: "4", text: "giving" },
      ],
      answer: "1",
      solution: {
        method: "'Going to' + base form of verb",
        steps: [
          "Structure: 'I am going to ______'.",
          "'Going to' expresses future intention → followed by base form of verb.",
          "'Gave' = past tense; 'gives' = present third person; 'giving' = gerund.",
          "'Give' = base form → correct after 'going to'.",
          "→ Answer: (1) give",
        ],
        tip: "'Going to' + BASE FORM: I am going to give, go, run, help.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q10",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 10,
      marks: 1,
      question: "The wizard lived in a castle __________ the top of the hill.",
      options: [
        { label: "1", text: "in" },
        { label: "2", text: "at" },
        { label: "3", text: "below" },
        { label: "4", text: "between" },
      ],
      answer: "2",
      solution: {
        method: "Prepositions of place – at the top",
        steps: [
          "The castle is located at the top of the hill.",
          "'In the top' is not natural English.",
          "'Below the top' = lower than the top; contradicts 'top'.",
          "'Between the top' needs two objects.",
          "'At the top of the hill' = located there → correct.",
          "→ Answer: (2) at",
        ],
        tip: "'At the top of' = located at the highest point of something.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q11",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 11,
      marks: 1,
      question:
        '"I did the painting all by __________," Ben told his classmates proudly.',
      options: [
        { label: "1", text: "itself" },
        { label: "2", text: "myself" },
        { label: "3", text: "himself" },
        { label: "4", text: "themselves" },
      ],
      answer: "2",
      solution: {
        method: "Reflexive pronouns – first person singular",
        steps: [
          "Ben is the speaker (I) telling his classmates he did it alone.",
          "'All by ______' = without any help, alone.",
          "Reflexive pronoun for 'I' = 'myself'.",
          "'Itself' = for things/animals; 'himself' = for he; 'themselves' = for they.",
          "→ Answer: (2) myself",
        ],
        tip: "'By myself' = alone, without help. Reflexive for 'I' is always 'myself'.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q12",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 12,
      marks: 1,
      question:
        "While Mrs Tan __________ a cake in the kitchen, she heard a loud knock at the front door.",
      options: [
        { label: "1", text: "is baking" },
        { label: "2", text: "are baking" },
        { label: "3", text: "was baking" },
        { label: "4", text: "were baking" },
      ],
      answer: "3",
      solution: {
        method: "Past progressive – ongoing background action when interrupted",
        steps: [
          "'She heard a loud knock' = simple past interrupting event.",
          "Mrs Tan's baking was ongoing (background) when interrupted.",
          "Subject: 'Mrs Tan' = singular third person → 'was'.",
          "'Was baking' = past progressive, singular → correct.",
          "→ Answer: (3) was baking",
        ],
        tip: "While + past progressive → interrupted by simple past: was baking when she heard.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q13",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 13,
      marks: 1,
      question: "A __________ of birds is flying above the buildings.",
      options: [
        { label: "1", text: "flock" },
        { label: "2", text: "band" },
        { label: "3", text: "swarm" },
        { label: "4", text: "school" },
      ],
      answer: "1",
      solution: {
        method: "Collective nouns – for birds",
        steps: [
          "We need the correct collective noun for birds flying together.",
          "'Band' = musicians; 'swarm' = insects (bees/wasps); 'school' = fish.",
          "'Flock' = the standard collective noun for birds (and sheep).",
          "→ Answer: (1) flock",
        ],
        tip: "A FLOCK of birds (or sheep). A SWARM of bees. A SCHOOL of fish.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q14",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 14,
      marks: 1,
      question: '"You can cook, __________ you?" Aunt Matilda asked me.',
      options: [
        { label: "1", text: "did" },
        { label: "2", text: "can" },
        { label: "3", text: "can't" },
        { label: "4", text: "didn't" },
      ],
      answer: "3",
      solution: {
        method: "Question tags – positive statement, negative tag",
        steps: [
          "Main clause: 'You CAN cook' = positive present.",
          "Positive statement → negative question tag.",
          "Auxiliary in main clause: 'can' → negative = 'can't'.",
          "Subject: 'you' → 'can't you?'",
          "→ Answer: (3) can't",
        ],
        tip: "Positive + CAN → negative tag = CAN'T. 'You can cook, CAN'T you?'",
      },
    },

    // =========================================================================
    // SECTION C: GRAMMAR CLOZE  Q15–22  (8 × 1m = 8m)
    // Passage 1: Learning journey to Science Centre (Q15–18)
    //   Word bank: (A) she (B) we (C) they (D) I (E) it (F) his
    //   Answers: Q15=A, Q16=D, Q17=B, Q18=F
    // Passage 2: Peacock and Crane (Q19–22)
    //   Word bank: (G) beside (H) at (J) under (K) in (L) to (M) on
    //   Answers: Q19=L, Q20=H, Q21=K, Q22=G
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q15",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 15,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Science Centre Learning Journey",
      passage:
        "Before we set off for our learning journey to the Science Centre, Madam Siti gave us a briefing. During the briefing, (15) ______ explained that we would be doing a variety of activities during the learning journey. She added that we would be conducting some fun experiments. Suddenly, Jayden shouted, \"I know how to do the experiments! (16) ______ have been there before!\"\n\nMadam Siti calmly told him to be quiet before continuing. She told us that (17) ______ would know more when we listen more attentively. Jayden was embarrassed by (18) ______ rude behaviour. He apologised to Madam Siti and listened attentively.",
      wordBank: ["(A) she", "(B) we", "(C) they", "(D) I", "(E) it", "(F) his"],
      question: "During the briefing, (15) ______ explained that we would be doing a variety of activities.",
      answer: "A",
      answerWord: "she",
      solution: {
        method: "Pronoun reference – subject pronoun for Madam Siti",
        steps: [
          "Who did the briefing and explained? = Madam Siti.",
          "Madam Siti = female, singular → subject pronoun = 'she'.",
          "→ Answer: (A) she",
        ],
        tip: "Madam Siti = female teacher = 'she'. She explained the activities.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q16",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 16,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Science Centre Learning Journey",
      passage:
        "Before we set off for our learning journey to the Science Centre, Madam Siti gave us a briefing. During the briefing, (15) ______ explained that we would be doing a variety of activities during the learning journey. She added that we would be conducting some fun experiments. Suddenly, Jayden shouted, \"I know how to do the experiments! (16) ______ have been there before!\"\n\nMadam Siti calmly told him to be quiet before continuing. She told us that (17) ______ would know more when we listen more attentively. Jayden was embarrassed by (18) ______ rude behaviour. He apologised to Madam Siti and listened attentively.",
      wordBank: ["(A) she", "(B) we", "(C) they", "(D) I", "(E) it", "(F) his"],
      question: "Jayden shouted, \"I know how to do the experiments! (16) ______ have been there before!\"",
      answer: "D",
      answerWord: "I",
      solution: {
        method: "Pronoun reference – first person singular in direct speech",
        steps: [
          "This is Jayden speaking in the first person.",
          "Jayden says 'I know...' and then '______ have been there before.'",
          "He is talking about himself = 'I have been there before.'",
          "→ Answer: (D) I",
        ],
        tip: "Jayden is boasting about himself → first person = 'I'. 'I have been there before!'",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q17",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 17,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Science Centre Learning Journey",
      passage:
        "Before we set off for our learning journey to the Science Centre, Madam Siti gave us a briefing. During the briefing, (15) ______ explained that we would be doing a variety of activities during the learning journey. She added that we would be conducting some fun experiments. Suddenly, Jayden shouted, \"I know how to do the experiments! (16) ______ have been there before!\"\n\nMadam Siti calmly told him to be quiet before continuing. She told us that (17) ______ would know more when we listen more attentively. Jayden was embarrassed by (18) ______ rude behaviour. He apologised to Madam Siti and listened attentively.",
      wordBank: ["(A) she", "(B) we", "(C) they", "(D) I", "(E) it", "(F) his"],
      question: "She told us that (17) ______ would know more when we listen more attentively.",
      answer: "B",
      answerWord: "we",
      solution: {
        method: "Pronoun reference – first person plural (the class)",
        steps: [
          "Madam Siti is telling 'us' (the whole class) that _____ would know more.",
          "The students (we) would know more by listening.",
          "'We' = the students including the narrator.",
          "→ Answer: (B) we",
        ],
        tip: "Madam Siti told the class (us = we) that 'we' would learn more by listening.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q18",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 18,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 1 – Science Centre Learning Journey",
      passage:
        "Before we set off for our learning journey to the Science Centre, Madam Siti gave us a briefing. During the briefing, (15) ______ explained that we would be doing a variety of activities during the learning journey. She added that we would be conducting some fun experiments. Suddenly, Jayden shouted, \"I know how to do the experiments! (16) ______ have been there before!\"\n\nMadam Siti calmly told him to be quiet before continuing. She told us that (17) ______ would know more when we listen more attentively. Jayden was embarrassed by (18) ______ rude behaviour. He apologised to Madam Siti and listened attentively.",
      wordBank: ["(A) she", "(B) we", "(C) they", "(D) I", "(E) it", "(F) his"],
      question: "Jayden was embarrassed by (18) ______ rude behaviour.",
      answer: "F",
      answerWord: "his",
      solution: {
        method: "Possessive pronoun – third person male singular",
        steps: [
          "Jayden (male, singular) was embarrassed by the behaviour = his own behaviour.",
          "'His' = possessive pronoun for 'he' (Jayden).",
          "'His rude behaviour' = Jayden's own rude behaviour.",
          "→ Answer: (F) his",
        ],
        tip: "Jayden (he) → his (possessive). 'Embarrassed by his own rude behaviour.'",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q19",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 19,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Peacock and Crane",
      passage:
        "Once, there was a peacock who was very proud and vain. She often boasted (19) ______ everyone about her beautiful feathers. One day, after the rain, she stared (20) ______ her reflection in a puddle of water. \"See my tail?\" she said. \"I am the most beautiful bird (21) ______ the world!\" she added.\n\nNearby, a crane heard the peacock's boastful remarks. He walked towards the peacock and stood (22) ______ her. \"Your feathers may be more beautiful than mine but I notice that you cannot fly as well as me,\" commented the crane. With that, he flew away, leaving the peacock feeling ashamed of her boastfulness.\n\n(Adapted from 'Peacock and the Crane')",
      wordBank: ["(G) beside", "(H) at", "(J) under", "(K) in", "(L) to", "(M) on"],
      question: "She often boasted (19) ______ everyone about her beautiful feathers.",
      answer: "L",
      answerWord: "to",
      solution: {
        method: "Prepositions – collocations with 'boast'",
        steps: [
          "'Boast to someone' = to tell/show off to a person.",
          "Fixed collocation: 'boast TO someone about something'.",
          "'Boasted to everyone about her feathers' = showed off to everyone.",
          "→ Answer: (L) to",
        ],
        tip: "'Boast TO someone' is the correct collocation. 'She boasted TO everyone.'",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q20",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 20,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Peacock and Crane",
      passage:
        "Once, there was a peacock who was very proud and vain. She often boasted (19) ______ everyone about her beautiful feathers. One day, after the rain, she stared (20) ______ her reflection in a puddle of water. \"See my tail?\" she said. \"I am the most beautiful bird (21) ______ the world!\" she added.\n\nNearby, a crane heard the peacock's boastful remarks. He walked towards the peacock and stood (22) ______ her. \"Your feathers may be more beautiful than mine but I notice that you cannot fly as well as me,\" commented the crane. With that, he flew away, leaving the peacock feeling ashamed of her boastfulness.\n\n(Adapted from 'Peacock and the Crane')",
      wordBank: ["(G) beside", "(H) at", "(J) under", "(K) in", "(L) to", "(M) on"],
      question: "She stared (20) ______ her reflection in a puddle of water.",
      answer: "H",
      answerWord: "at",
      solution: {
        method: "Prepositions – collocations with 'stare'",
        steps: [
          "'Stare AT something' = to look directly at something for a long time.",
          "Fixed collocation: 'stared at her reflection'.",
          "→ Answer: (H) at",
        ],
        tip: "'Stare AT' someone/something. Look AT, stare AT, glare AT.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q21",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 21,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Peacock and Crane",
      passage:
        "Once, there was a peacock who was very proud and vain. She often boasted (19) ______ everyone about her beautiful feathers. One day, after the rain, she stared (20) ______ her reflection in a puddle of water. \"See my tail?\" she said. \"I am the most beautiful bird (21) ______ the world!\" she added.\n\nNearby, a crane heard the peacock's boastful remarks. He walked towards the peacock and stood (22) ______ her. \"Your feathers may be more beautiful than mine but I notice that you cannot fly as well as me,\" commented the crane. With that, he flew away, leaving the peacock feeling ashamed of her boastfulness.\n\n(Adapted from 'Peacock and the Crane')",
      wordBank: ["(G) beside", "(H) at", "(J) under", "(K) in", "(L) to", "(M) on"],
      question: "\"I am the most beautiful bird (21) ______ the world!\"",
      answer: "K",
      answerWord: "in",
      solution: {
        method: "Prepositions – fixed phrase 'in the world'",
        steps: [
          "'The most beautiful bird ______ the world' = fixed superlative phrase.",
          "Standard phrase: 'in the world' = among all things in existence globally.",
          "→ Answer: (K) in",
        ],
        tip: "Fixed phrase: 'the best/most beautiful IN the world.' Always use 'in'.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q22",
      type: "B",
      topic: "GrammarCloze",
      qNumber: 22,
      marks: 1,
      passageTitle: "Grammar Cloze Passage 2 – Peacock and Crane",
      passage:
        "Once, there was a peacock who was very proud and vain. She often boasted (19) ______ everyone about her beautiful feathers. One day, after the rain, she stared (20) ______ her reflection in a puddle of water. \"See my tail?\" she said. \"I am the most beautiful bird (21) ______ the world!\" she added.\n\nNearby, a crane heard the peacock's boastful remarks. He walked towards the peacock and stood (22) ______ her. \"Your feathers may be more beautiful than mine but I notice that you cannot fly as well as me,\" commented the crane. With that, he flew away, leaving the peacock feeling ashamed of her boastfulness.\n\n(Adapted from 'Peacock and the Crane')",
      wordBank: ["(G) beside", "(H) at", "(J) under", "(K) in", "(L) to", "(M) on"],
      question: "He walked towards the peacock and stood (22) ______ her.",
      answer: "G",
      answerWord: "beside",
      solution: {
        method: "Prepositions of position – next to",
        steps: [
          "The crane walked towards the peacock and stood next to her.",
          "'Beside' = next to; at the side of.",
          "'Stood beside her' = stood next to her to speak to her.",
          "→ Answer: (G) beside",
        ],
        tip: "'Beside' = next to/at the side of. He stood beside her to speak to her.",
      },
    },

    // =========================================================================
    // SECTION D: VOCABULARY CLOZE  Q23–27  (5 × 1m = 5m)
    // Word bank: (A) emerged (B) exchange (C) fond (D) throw
    //            (E) keep    (F) murky   (G) break (H) desperately
    // Passage: Birthday bracelet dropped in river; magic fish retrieves it
    // Answers: Q23=F (murky), Q24=B (exchange), Q25=H (desperately),
    //          Q26=A (emerged), Q27=E (keep)
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q23",
      type: "B",
      topic: "VocabCloze",
      qNumber: 23,
      marks: 1,
      passageTitle: "Vocabulary Cloze – The Magic Fish",
      passage:
        "On my ninth birthday, I received a gold bracelet from my parents.\n\nOne day, while having a picnic by the river, my bracelet dropped into it. As the water was (23) ______, I could not see where it went. To my surprise, a shimmery fish surfaced from the water and claimed that it could help me retrieve it in (24) ______ for a kiss. I wanted my bracelet back (25) ______, so I agreed. I did not believe that the fish was smart enough to get the bracelet back for me.\n\nAfter a minute, the fish (26) ______ from the water with my bracelet in its mouth. I had to (27) ______ my promise. So, I kissed the fish. Instantly, the fish turned into a boy. What a surprise again!",
      wordBank: ["(A) emerged", "(B) exchange", "(C) fond", "(D) throw", "(E) keep", "(F) murky", "(G) break", "(H) desperately"],
      question: "As the water was (23) ______, I could not see where it went.",
      answer: "F",
      answerWord: "murky",
      solution: {
        method: "Vocabulary in context – describing unclear water",
        steps: [
          "She couldn't see her bracelet in the water → the water was not clear.",
          "'Murky' = dark and dirty, not transparent; unable to see through.",
          "'Fond' = liking something; 'emerged' = came out; 'throw' = to toss.",
          "→ Answer: (F) murky",
        ],
        tip: "'Murky' water = dark/cloudy water you can't see through. Could not see = murky.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q24",
      type: "B",
      topic: "VocabCloze",
      qNumber: 24,
      marks: 1,
      passageTitle: "Vocabulary Cloze – The Magic Fish",
      passage:
        "On my ninth birthday, I received a gold bracelet from my parents.\n\nOne day, while having a picnic by the river, my bracelet dropped into it. As the water was (23) ______, I could not see where it went. To my surprise, a shimmery fish surfaced from the water and claimed that it could help me retrieve it in (24) ______ for a kiss. I wanted my bracelet back (25) ______, so I agreed. I did not believe that the fish was smart enough to get the bracelet back for me.\n\nAfter a minute, the fish (26) ______ from the water with my bracelet in its mouth. I had to (27) ______ my promise. So, I kissed the fish. Instantly, the fish turned into a boy. What a surprise again!",
      wordBank: ["(A) emerged", "(B) exchange", "(C) fond", "(D) throw", "(E) keep", "(F) murky", "(G) break", "(H) desperately"],
      question: "…it could help me retrieve it in (24) ______ for a kiss.",
      answer: "B",
      answerWord: "exchange",
      solution: {
        method: "Fixed phrase – 'in exchange for'",
        steps: [
          "'In ______ for a kiss' = the fish would retrieve the bracelet if she gave something in return.",
          "Fixed phrase: 'in exchange for' = in return for; trading one thing for another.",
          "'In exchange for a kiss' = the bracelet for a kiss.",
          "→ Answer: (B) exchange",
        ],
        tip: "'In exchange for' = give one thing to get another. Common trade/barter phrase.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q25",
      type: "B",
      topic: "VocabCloze",
      qNumber: 25,
      marks: 1,
      passageTitle: "Vocabulary Cloze – The Magic Fish",
      passage:
        "On my ninth birthday, I received a gold bracelet from my parents.\n\nOne day, while having a picnic by the river, my bracelet dropped into it. As the water was (23) ______, I could not see where it went. To my surprise, a shimmery fish surfaced from the water and claimed that it could help me retrieve it in (24) ______ for a kiss. I wanted my bracelet back (25) ______, so I agreed. I did not believe that the fish was smart enough to get the bracelet back for me.\n\nAfter a minute, the fish (26) ______ from the water with my bracelet in its mouth. I had to (27) ______ my promise. So, I kissed the fish. Instantly, the fish turned into a boy. What a surprise again!",
      wordBank: ["(A) emerged", "(B) exchange", "(C) fond", "(D) throw", "(E) keep", "(F) murky", "(G) break", "(H) desperately"],
      question: "I wanted my bracelet back (25) ______, so I agreed.",
      answer: "H",
      answerWord: "desperately",
      solution: {
        method: "Adverbs of manner – urgency/strong desire",
        steps: [
          "'I wanted my bracelet back ______' = how badly she wanted it.",
          "She agreed to kiss the fish (unusual thing) → she wanted it very urgently/badly.",
          "'Desperately' = with great urgency, as if in despair; very badly.",
          "→ Answer: (H) desperately",
        ],
        tip: "'Desperately' = wanting something very strongly, almost urgently. She agreed because she desperately wanted it.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q26",
      type: "B",
      topic: "VocabCloze",
      qNumber: 26,
      marks: 1,
      passageTitle: "Vocabulary Cloze – The Magic Fish",
      passage:
        "On my ninth birthday, I received a gold bracelet from my parents.\n\nOne day, while having a picnic by the river, my bracelet dropped into it. As the water was (23) ______, I could not see where it went. To my surprise, a shimmery fish surfaced from the water and claimed that it could help me retrieve it in (24) ______ for a kiss. I wanted my bracelet back (25) ______, so I agreed. I did not believe that the fish was smart enough to get the bracelet back for me.\n\nAfter a minute, the fish (26) ______ from the water with my bracelet in its mouth. I had to (27) ______ my promise. So, I kissed the fish. Instantly, the fish turned into a boy. What a surprise again!",
      wordBank: ["(A) emerged", "(B) exchange", "(C) fond", "(D) throw", "(E) keep", "(F) murky", "(G) break", "(H) desperately"],
      question: "After a minute, the fish (26) ______ from the water with my bracelet in its mouth.",
      answer: "A",
      answerWord: "emerged",
      solution: {
        method: "Verbs of movement – coming out of water",
        steps: [
          "The fish came out of the water with the bracelet.",
          "'Emerged' = came out of, appeared from (especially from water or a hidden place).",
          "The fish 'emerged from the water' = appeared from the water.",
          "→ Answer: (A) emerged",
        ],
        tip: "'Emerge' = to come out from somewhere. 'Emerged from the water' = came up out of the water.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q27",
      type: "B",
      topic: "VocabCloze",
      qNumber: 27,
      marks: 1,
      passageTitle: "Vocabulary Cloze – The Magic Fish",
      passage:
        "On my ninth birthday, I received a gold bracelet from my parents.\n\nOne day, while having a picnic by the river, my bracelet dropped into it. As the water was (23) ______, I could not see where it went. To my surprise, a shimmery fish surfaced from the water and claimed that it could help me retrieve it in (24) ______ for a kiss. I wanted my bracelet back (25) ______, so I agreed. I did not believe that the fish was smart enough to get the bracelet back for me.\n\nAfter a minute, the fish (26) ______ from the water with my bracelet in its mouth. I had to (27) ______ my promise. So, I kissed the fish. Instantly, the fish turned into a boy. What a surprise again!",
      wordBank: ["(A) emerged", "(B) exchange", "(C) fond", "(D) throw", "(E) keep", "(F) murky", "(G) break", "(H) desperately"],
      question: "I had to (27) ______ my promise.",
      answer: "E",
      answerWord: "keep",
      solution: {
        method: "Fixed phrase – 'keep a promise'",
        steps: [
          "'Keep a promise' = to do what you promised to do; honour your commitment.",
          "'Break a promise' = the opposite (to not fulfil a promise).",
          "She agreed to a deal → she had to 'keep' (honour) her promise.",
          "→ Answer: (E) keep",
        ],
        tip: "'Keep a promise' = do what you said you would do. Opposite: break a promise.",
      },
    },

    // =========================================================================
    // SECTION E: EDITING  Q28–32  (5 × 1m = 5m)
    // Circle correct word from brackets
    // Answers: Q28=does, Q29=whose, Q30=predator, Q31=menacing, Q32=disappointed
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q28",
      type: "B",
      topic: "Editing",
      qNumber: 28,
      marks: 1,
      question: "Joanna ( do / does ) her homework after dinner.",
      answer: "does",
      solution: {
        method: "Subject-verb agreement – singular third person",
        steps: [
          "Subject: 'Joanna' = singular, third person (she).",
          "Present simple: third person singular → verb + -s.",
          "'Do' = for I/you/we/they; 'does' = for he/she/it.",
          "→ Answer: does",
        ],
        tip: "Joanna = she → DOES. Third person singular present simple adds -s/-es.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q29",
      type: "B",
      topic: "Editing",
      qNumber: 29,
      marks: 1,
      question: '"( Who\'s / Whose ) textbook is this?" Mr Chen asked his students.',
      answer: "Whose",
      solution: {
        method: "Homophones – who's vs whose",
        steps: [
          "'Who's' = who is (contraction).",
          "'Whose' = belonging to whom (possessive relative pronoun).",
          "'______ textbook is this?' = asking who it belongs to → possessive.",
          "'Whose textbook' = the textbook belonging to whom?",
          "→ Answer: Whose",
        ],
        tip: "WHOSE = possessive (whose book?). WHO'S = who is. Before a noun → 'whose'.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q30",
      type: "B",
      topic: "Editing",
      qNumber: 30,
      marks: 1,
      question: "The snake glided away quickly to escape from its ( predater / predator ).",
      answer: "predator",
      solution: {
        method: "Spelling correction",
        steps: [
          "'Predater' is a misspelling.",
          "Correct spelling: p-r-e-d-a-t-o-r.",
          "A 'predator' = an animal that hunts and eats other animals.",
          "The ending is '-or', not '-er'.",
          "→ Answer: predator",
        ],
        tip: "PREDATOR ends in -OR (not -er): pred-A-TOR. An animal that preys on others.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q31",
      type: "B",
      topic: "Editing",
      qNumber: 31,
      marks: 1,
      question: "The tiger let out a ( menacing / menasing ) growl when provoked.",
      answer: "menacing",
      solution: {
        method: "Spelling correction",
        steps: [
          "'Menasing' is a misspelling.",
          "Correct spelling: m-e-n-a-c-i-n-g.",
          "'Menacing' = threatening or frightening.",
          "The root is 'menace' → menacing (with 'c', not 's').",
          "→ Answer: menacing",
        ],
        tip: "MENACING = menace + -ing. Keep the 'c': men-A-C-ing.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q32",
      type: "B",
      topic: "Editing",
      qNumber: 32,
      marks: 1,
      question: "Benedict was ( disappointed / dissappointed ) when he was told that football practice was cancelled due to heavy rain.",
      answer: "disappointed",
      solution: {
        method: "Spelling correction",
        steps: [
          "'Dissappointed' has wrong double-s AND double-p.",
          "Correct spelling: dis-ap-point-ed.",
          "Prefix: 'dis-' (one 's') + 'appoint' (one 'p' before 'oint') + '-ed'.",
          "→ Answer: disappointed",
        ],
        tip: "DISAPPOINTED = dis- + appoint + -ed. ONE 's' in 'dis', ONE 'p' before 'oint'.",
      },
    },

    // =========================================================================
    // SECTION F: SYNTHESIS  Q33–34  (2 × 1m = 2m)
    // Answers:
    // Q33: Daniel did not complete his homework so he was not allowed to play badminton.
    // Q34: Natasha was surprised when she saw a birthday present on her table.
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q33",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 33,
      marks: 1,
      question:
        "Combine using 'so':\nDaniel did not complete his homework. Daniel was not allowed to play badminton.",
      answer: "Daniel did not complete his homework so he was not allowed to play badminton.",
      solution: {
        method: "Sentence combining – cause and result with 'so'",
        steps: [
          "Cause: Daniel did not complete his homework.",
          "Result: He was not allowed to play badminton.",
          "'So' introduces the result.",
          "Replace 'Daniel' in the second clause with 'he'.",
          "Combined: 'Daniel did not complete his homework so he was not allowed to play badminton.'",
        ],
        tip: "'So' = therefore/as a result. X happened, so Y happened as a result.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q34",
      type: "A",
      topic: "SentenceCombining",
      qNumber: 34,
      marks: 1,
      question:
        "Combine using 'when':\nNatasha saw a birthday present on her table. Natasha was surprised.",
      answer: "Natasha was surprised when she saw a birthday present on her table.",
      solution: {
        method: "Sentence combining – time with 'when'",
        steps: [
          "'When' = at the time that something happened.",
          "Surprise happened AT THE SAME TIME as seeing the present.",
          "Structure: [result] when [cause/event].",
          "Replace second 'Natasha' with 'she'.",
          "Combined: 'Natasha was surprised when she saw a birthday present on her table.'",
        ],
        tip: "'When' connects a time and event. 'Natasha was surprised WHEN she saw the present.'",
      },
    },

    // =========================================================================
    // SECTION G: COMPREHENSION 1  Q35–41  (8m)
    // Passage: The Venus Flytrap (adapted from Britannica Kids)
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q35",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 35,
      marks: 1,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question: "Based on the first paragraph, the Venus Flytrap __________.",
      options: [
        { label: "1", text: "is the only carnivorous plant" },
        { label: "2", text: "can be found in all parts of United States" },
        { label: "3", text: "is grouped as a meat-eating plant like sundews and pitcher plants" },
      ],
      answer: "3",
      solution: {
        method: "Reading comprehension – facts from paragraph 1",
        steps: [
          "Option 1: 'It belongs to a GROUP of carnivorous plants' → not the only one. FALSE.",
          "Option 2: 'grows only in SOME parts of North and South Carolina' → not all US. FALSE.",
          "Option 3: 'This group also includes sundews and pitcher plants' → correct.",
          "→ Answer: (3)",
        ],
        tip: "Check each option against paragraph 1. 'This group also includes' = Venus Flytrap is grouped with sundews and pitcher plants.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q36",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 36,
      marks: 1,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question: "True or False? Venus Flytraps grow best in dry soil.",
      answer: "False",
      solution: {
        method: "True/False – checking against passage",
        steps: [
          "Paragraph 1: 'It grows best in soil that is MOIST.'",
          "Moist = slightly wet, not dry.",
          "The statement says 'dry soil' which contradicts 'moist'.",
          "→ False",
        ],
        tip: "'Moist' = slightly wet/damp. Opposite of dry. Venus Flytraps prefer moist soil.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q37",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 37,
      marks: 1,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question: "True or False? Venus Flytraps produce small and white flowers.",
      answer: "True",
      solution: {
        method: "True/False – checking against passage",
        steps: [
          "Paragraph 2: 'It reaches a height of between 20 and 30 centimetres and produces small, white flowers.'",
          "The statement 'produces small and white flowers' is directly stated.",
          "→ True",
        ],
        tip: "Directly stated in paragraph 2: 'produces small, white flowers.'",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q38",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 38,
      marks: 1,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question: "True or False? Each leaf of the Venus Flytrap has three hairs on top.",
      answer: "False",
      solution: {
        method: "True/False – careful reading for detail",
        steps: [
          "Paragraph 2: 'Each HALF has long spikes along its edge and THREE HAIRS ON TOP.'",
          "The passage says each HALF (not each LEAF) has three hairs.",
          "Each leaf has two halves → each leaf has SIX hairs total (3 per half).",
          "Statement says 'each leaf has three hairs' → False (each HALF has three).",
          "→ False",
        ],
        tip: "Pay attention to details: each HALF has 3 hairs, not each leaf. A leaf = 2 halves.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q39",
      type: "B",
      topic: "ComprehensionMCQ",
      qNumber: 39,
      marks: 1,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question:
        "Once the Venus Flytrap traps the insect, the leaf will release digestive juices to break down the insect into __________ (tick your chosen answer).\n\n[ ] spikes\n[ ] enzymes\n[ ] nutrients",
      options: [
        { label: "spikes", text: "spikes" },
        { label: "enzymes", text: "enzymes" },
        { label: "nutrients", text: "nutrients" },
      ],
      answer: "nutrients",
      solution: {
        method: "Reading comprehension – process of digestion",
        steps: [
          "Paragraph 3: 'These juices break down the insect into NUTRIENTS.'",
          "The digestive juices break the insect down → the end product is nutrients.",
          "Enzymes = the digestive juices themselves (not what it's broken into).",
          "Spikes = physical parts of the leaf.",
          "→ Answer: nutrients",
        ],
        tip: "The juices BREAK DOWN the insect INTO nutrients. End product = nutrients.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q40",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 40,
      marks: 1,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question:
        "Which word has the same meaning as 'feeds on'? Circle either (A) or (B).\n\nThe Venus Flytrap is a plant that (A) traps and (B) eats insects.",
      answer: "B (eats)",
      solution: {
        method: "Vocabulary – synonym for 'feeds on'",
        steps: [
          "'Feeds on' = consumes as food, eats.",
          "'Traps' = catches; doesn't mean eats.",
          "'Eats' = consumes as food → same as 'feeds on'.",
          "→ Answer: B (eats)",
        ],
        tip: "'Feeds on insects' = eats insects. 'Eats' is the synonym for 'feeds on'.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q41",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 41,
      marks: 2,
      passageTitle: "Comprehension 1 – The Venus Flytrap",
      passage:
        "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of carnivorous or meat-eating plants. This group also includes sundews and pitcher plants. The scientific name of the Venus Flytrap is Dionaea muscipula. In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States. It grows best in soil that is moist.\n\nThe Venus Flytrap is a small plant that grows from a bulblike root. It reaches a height of between 20 and 30 centimetres and produces small, white flowers. The leaves of the plant grow in rounded halves. The halves are hinged together on one side like jaws. Each half has long spikes along its edge and three hairs on top that are sensitive to touch. The leaf oozes out a sticky substance that attracts flies and other insects.\n\nWhen an insect crawls between the two halves of a leaf, the hairs detect its presence. Within seconds, the leaf snaps shut and the long spikes lock the insect together. Once the insect is trapped, the leaf releases enzymes, or digestive juices. These juices break down the insect into nutrients. The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant. This process takes about ten days. The leaf then reopens and is ready for the next meal.\n\n(Adapted from 'The Venus Flytrap, Britannica Kids')",
      question:
        "Based on the last paragraph, how does the nutrients from the insects reach all parts of the plant? [2m]",
      answer: "The leaf absorbs the nutrients from the plant. The leaf then transports these nutrients to all parts of the plant.",
      solution: {
        method: "Reading comprehension – process explanation",
        steps: [
          "Paragraph 3: 'The leaf absorbs the nutrients for the plants. The leaf then transports these nutrients to all parts of the plant.'",
          "Step 1: The leaf absorbs the nutrients.",
          "Step 2: The leaf transports the nutrients to all parts of the plant.",
          "Award 1 mark for each step (absorb + transport).",
        ],
        tip: "Two-step process: absorb → transport. Find both steps in the last paragraph.",
      },
    },

    // =========================================================================
    // SECTION H: COMPREHENSION 2  Q42–47  (8m)
    // Passage: The Crocodile and the Monkey (adapted)
    // =========================================================================
    {
      id: "eoy_nanhua_p2_2023_q42",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 42,
      marks: 1,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question: "Based on paragraph 1, what did the crocodile enjoy lying on? [1m]",
      answer: "The crocodile enjoyed lying on the sun-warmed rocks (by the river).",
      solution: {
        method: "Reading comprehension – locating specific facts",
        steps: [
          "Paragraph 1: 'He enjoyed lying on the sun-warmed rocks by the river.'",
          "→ Answer: the sun-warmed rocks",
        ],
        tip: "Scan paragraph 1 for 'enjoyed lying on' → sun-warmed rocks.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q43",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 43,
      marks: 1,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question:
        "What does the phrase 'heart skipped a beat' in lines 4&5 tell you about the crocodile's feeling at that moment? [1m]\n\nIt was feeling __________.",
      answer: "excited",
      solution: {
        method: "Idiom/body language interpretation",
        steps: [
          "'Heart skipped a beat' = a sudden feeling of excitement, surprise or shock.",
          "Context: the crocodile saw the monkey → his chance to catch one!",
          "He was excited to see the monkey = opportunity to fulfil his dream.",
          "→ Answer: excited",
        ],
        tip: "'Heart skipped a beat' = sudden excitement or shock. Here it's excitement at seeing the monkey.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q44",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 44,
      marks: 1,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question: "What does 'his chance' in line 5 refer to? [1m]",
      answer: "His chance to catch/eat a monkey (for dinner).",
      solution: {
        method: "Pronoun/demonstrative reference",
        steps: [
          "Line 5: 'He decided to befriend him as he knew this was his chance.'",
          "What chance? The crocodile dreamed of eating a monkey.",
          "Seeing the monkey = his opportunity to finally catch and eat one.",
          "→ 'His chance' refers to his chance/opportunity to catch a monkey for dinner.",
        ],
        tip: "Connect 'his chance' to what the crocodile wanted from paragraph 1: to have a monkey for dinner.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q45",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 45,
      marks: 1,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question:
        "Write 1, 2 or 3 to indicate the order in which the events occurred. [1m]\n\n___ Cody and the monkey went into the forest.\n___ Cody and the monkey crossed the river.\n___ Cody and the monkey chatted at the rocks.",
      answer: "Cody and the monkey chatted at the rocks → 1\nCody and the monkey crossed the river → 2\nCody and the monkey went into the forest → 3",
      solution: {
        method: "Sequencing events from passage",
        steps: [
          "1 (first): They chatted at the rocks (paragraphs 2–3).",
          "2 (second): They crossed the river – Cody carried the monkey (paragraph 4).",
          "3 (last): Cody followed the monkey into the forest (paragraph 5).",
          "Answer key: 3, 2, 1",
        ],
        tip: "Follow the story order: rocks → river → forest.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q46a",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 46,
      marks: 1,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question:
        "True/False with reason: (a) The monkey knew about the magical island before meeting Cody.",
      answer: "False. The monkey was curious (about the island) but did not know about it before meeting Cody. / The crocodile told the monkey about the island.",
      solution: {
        method: "True/False with evidence",
        steps: [
          "Paragraph 3: 'The monkey was CURIOUS but it said, \"I can't swim.\"'",
          "Curious = interested in something new → he didn't already know about the island.",
          "Cody told the monkey about the island; the monkey hadn't known before.",
          "→ FALSE. The monkey was curious (new information for him), not already knowing.",
        ],
        tip: "'Curious' = interested in something new/unknown. If he already knew, he wouldn't be curious.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q46b",
      type: "B",
      topic: "ComprehensionFIB",
      qNumber: 46,
      marks: 1,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question:
        "True/False with reason: (b) Cody believed that the monkey's heart was on a tree.",
      answer: "True. Cody swam back and followed the monkey into the forest to get the heart.",
      solution: {
        method: "True/False with evidence – inference from action",
        steps: [
          "The monkey said his heart was on a tree in the forest.",
          "Paragraph 5: 'Cody wanted the tastier meal, so he swam BACK and FOLLOWED the monkey into the forest.'",
          "If Cody followed the monkey to get the heart, he must have believed the heart was there.",
          "→ TRUE. Reason: Cody swam back and followed the monkey into the forest to get the heart.",
        ],
        tip: "Cody's ACTIONS prove he believed it: he went into the forest to find the heart.",
      },
    },

    {
      id: "eoy_nanhua_p2_2023_q47",
      type: "B",
      topic: "ComprehensionOE",
      qNumber: 47,
      marks: 2,
      passageTitle: "Comprehension 2 – The Crocodile and the Monkey",
      passage:
        "There lived a crocodile who always dreamt of having a monkey for dinner. He enjoyed lying on the sun-warmed rocks by the river, imagining how delicious a monkey would taste.\n\nOne day, the crocodile saw a monkey near the rocks. His heart skipped a beat. He decided to befriend him as he knew this was his chance. The crocodile said, \"Hello there, Mr Monkey! I'm Cody. I know of a magical island with super yummy fruits. Want to go there?\"\n\nThe monkey was curious but it said, \"I can't swim.\"\n\nCody had a tricky idea. \"No worries! I can swim. I'll carry you on my back,\" he offered. Hearing this, the monkey jumped onto Cody's back. As Cody swam across the river, he began to go deeper into the water.\n\n'Oh no, I can't swim. I'll drown!' yelled the monkey.\n\n\"You won't drown,\" snapped Cody, \"because I will eat you up first!\"\n\nThe quick-thinking monkey said, \"If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest.\" Cody wanted the tastier meal, so he swam back and followed the monkey into the forest.\n\nOnce safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile. With a sly grin, the monkey said, \"Haha, I have fooled you!\"\n\nFrom that day on, Cody learned not to trick others and the clever monkey continued swinging in the trees, happy and safe.\n\n(Adapted from 'The Crocodile and The Monkey')",
      question: "Why did the monkey heave a sigh of relief (line 17)? [2m]",
      answer: "The monkey heaved a sigh of relief because he was safely back on the tree and was able to outsmart Cody / avoid being eaten.",
      solution: {
        method: "Reading comprehension – reason for emotion",
        steps: [
          "Line 17: 'Once safely back on the tree, the monkey heaved a sigh of relief. He knew he had outsmarted the crocodile.'",
          "Two reasons: (1) he was SAFELY BACK on the tree (no longer in danger), (2) he had OUTSMARTED the crocodile (tricked the predator).",
          "Award 1 mark for each reason.",
        ],
        tip: "A 'sigh of relief' comes after escaping danger. He was safe AND had tricked Cody successfully.",
      },
    },
  ],
};

export default eoy_nanhua_p2_2023;
