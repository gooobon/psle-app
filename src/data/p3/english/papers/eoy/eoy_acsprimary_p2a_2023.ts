// =============================================================================
// Anglo-Chinese School (Primary) – 2023 End-of-Year Examination
// English Language  |  Paper 2 Booklet A  |  Primary 3
// Date: 23 October 2023   Duration: 1h 15 min   Marks: 20
// Sections: A Grammar MCQ (Q1–8, 8m) | B Vocabulary MCQ (Q9–14, 6m)
//           C Visual Text Comprehension (Q15–20, 6m)
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_acsprimary_p2a_2023: QuestionSet = {
  id: "eoy_acsprimary_p2a_2023",
  school: "Anglo-Chinese School (Primary)",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2 Booklet A",
  totalMarks: 20,
  duration: 75,
  questions: [

    // =========================================================================
    // SECTION A: GRAMMAR MCQ  (Q1–8)  8 × 1 mark = 8 marks
    // =========================================================================
    {
      id: "eoy_acsprimary_p2a_2023_q1",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 1,
      marks: 1,
      question:
        '"__________ ripe mangoes in the tree over there look delicious!" Andy said.',
      options: [
        { label: "1", text: "This" },
        { label: "2", text: "That" },
        { label: "3", text: "These" },
        { label: "4", text: "Those" },
      ],
      answer: "4",
      solution: {
        method: "Demonstrative Pronouns – singular vs plural, near vs far",
        steps: [
          'The blank refers to "ripe mangoes" (plural noun).',
          '"Mangoes" is plural, so we need a plural demonstrative.',
          '"This" and "That" are singular → ruled out.',
          '"These" = plural, near; "Those" = plural, far.',
          'The phrase "over there" signals distance → "Those" is correct.',
        ],
        tip: 'Remember: This/These = near; That/Those = far. Add –se to make it plural (Those, These).',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q2",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 2,
      marks: 1,
      question: "Devi took __________ medicine as she was not feeling well.",
      options: [
        { label: "1", text: "any" },
        { label: "2", text: "less" },
        { label: "3", text: "many" },
        { label: "4", text: "some" },
      ],
      answer: "4",
      solution: {
        method: "Quantifiers with uncountable nouns in positive statements",
        steps: [
          '"Medicine" is an uncountable noun.',
          '"Any" is used in negatives/questions (e.g., "She did not take any medicine").',
          '"Less" is a comparative quantifier; it needs a context of comparison.',
          '"Many" is used for countable nouns only.',
          '"Some" is used in positive statements with uncountable nouns → correct.',
        ],
        tip: 'Use "some" in positive sentences; "any" in negatives and questions.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q3",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 3,
      marks: 1,
      question:
        "Madam Lim wanted to bake a cake __________ she did not have enough flour.",
      options: [
        { label: "1", text: "as" },
        { label: "2", text: "so" },
        { label: "3", text: "but" },
        { label: "4", text: "then" },
      ],
      answer: "3",
      solution: {
        method: "Conjunctions – contrast/adversative",
        steps: [
          "The two clauses are contrasting ideas: wanting to bake vs. not having flour.",
          '"As" introduces a reason clause, not a contrast.',
          '"So" shows a result; the sentence would need to be restructured.',
          '"Then" is a time adverb, not a conjunction of contrast.',
          '"But" shows contrast between two ideas → correct.',
        ],
        tip: 'Use "but" to join two opposing or contrasting ideas.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q4",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 4,
      marks: 1,
      question:
        '"__________ I go to the playground, please?" Ahmad asked his mother.',
      options: [
        { label: "1", text: "Will" },
        { label: "2", text: "May" },
        { label: "3", text: "Must" },
        { label: "4", text: "Shall" },
      ],
      answer: "2",
      solution: {
        method: "Modal Verbs – asking for permission",
        steps: [
          'Ahmad is asking his mother for permission to go to the playground.',
          '"Will" expresses future action or willingness, not permission.',
          '"Must" expresses obligation or necessity, not permission.',
          '"Shall" is used for offers or suggestions (e.g., "Shall we go?").',
          '"May" is the polite modal for requesting permission → correct.',
        ],
        tip: '"May I…?" is the standard polite form for asking permission.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q5",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 5,
      marks: 1,
      question:
        "While the teacher was telling a story, the girl __________ attentively.",
      options: [
        { label: "1", text: "listen" },
        { label: "2", text: "listens" },
        { label: "3", text: "listened" },
        { label: "4", text: "is listening" },
      ],
      answer: "3",
      solution: {
        method: "Tense consistency – past progressive with simple past",
        steps: [
          'The subordinate clause uses "was telling" (past progressive).',
          "Both actions happened at the same time in the past.",
          '\"Listen\" (base form) and \"listens\" (present) are ruled out: wrong tense.',
          '"Is listening" (present progressive) is wrong tense.',
          '"Listened" (simple past) correctly pairs with the past progressive → correct.',
        ],
        tip: 'When "while + past progressive" sets the background, the main action uses simple past.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q6",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 6,
      marks: 1,
      question:
        "Jack screamed when he saw a stray dog running __________ him.",
      options: [
        { label: "1", text: "on" },
        { label: "2", text: "above" },
        { label: "3", text: "through" },
        { label: "4", text: "towards" },
      ],
      answer: "4",
      solution: {
        method: "Prepositions of direction/movement",
        steps: [
          "The dog was running in the direction of Jack (that is why Jack screamed).",
          '"On" = position on a surface, not direction.',
          '"Above" = higher position, not movement towards.',
          '"Through" = movement from one side to another of something.',
          '"Towards" = moving in the direction of someone/something → correct.',
        ],
        tip: 'Use "towards" to show movement in the direction of a person or place.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q7",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 7,
      marks: 1,
      question:
        '"Did you do the homework by __________?" asked my father.',
      options: [
        { label: "1", text: "myself" },
        { label: "2", text: "herself" },
        { label: "3", text: "himself" },
        { label: "4", text: "yourself" },
      ],
      answer: "4",
      solution: {
        method: "Reflexive Pronouns – matching the subject",
        steps: [
          "The father is asking the child ('you') whether the homework was done alone.",
          '"Myself" refers to the speaker (I), not the person being addressed.',
          '"Herself" refers to a female third person.',
          '"Himself" refers to a male third person.',
          '"Yourself" is the reflexive pronoun for \'you\' → correct.',
        ],
        tip: "Reflexive pronouns must match the subject: I→myself, you→yourself, he→himself, she→herself, they→themselves.",
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q8",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 8,
      marks: 1,
      question: "The broken toy can't be fixed, __________ it?",
      options: [
        { label: "1", text: "is" },
        { label: "2", text: "can" },
        { label: "3", text: "isn't" },
        { label: "4", text: "can't" },
      ],
      answer: "2",
      solution: {
        method: "Question Tags – auxiliary verb agreement",
        steps: [
          "The main clause is negative: 'can't be fixed'.",
          "A negative main clause takes a positive question tag.",
          "The auxiliary verb in the main clause is 'can' (from 'can't').",
          "The positive tag for 'can' is simply 'can'.",
          "Therefore the tag is 'can it?' → answer is 'can'.",
        ],
        tip: "Rule: negative statement → positive tag; use the same auxiliary verb as in the main clause.",
      },
    },

    // =========================================================================
    // SECTION B: VOCABULARY MCQ  (Q9–14)  6 × 1 mark = 6 marks
    // =========================================================================
    {
      id: "eoy_acsprimary_p2a_2023_q9",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 9,
      marks: 1,
      question:
        "Siti became hungry when she smelled the delicious __________ of her mother's cooking.",
      options: [
        { label: "1", text: "scent" },
        { label: "2", text: "aroma" },
        { label: "3", text: "perfume" },
        { label: "4", text: "fragrance" },
      ],
      answer: "2",
      solution: {
        method: "Connotation and collocations – smell words",
        steps: [
          "All four words relate to pleasant smells, so context is key.",
          '"Scent" is neutral; used for people, animals, or light smell of flowers.',
          '"Perfume" and "fragrance" refer primarily to pleasant smells of flowers or cosmetics.',
          '"Aroma" specifically collocates with food and cooking smells.',
          'The context is "mother\'s cooking" → "aroma" is the best fit.',
        ],
        tip: '"Aroma" is the word most strongly associated with food and cooking.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q10",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 10,
      marks: 1,
      question:
        "George draws well. He wants to be an __________ when he grows up.",
      options: [
        { label: "1", text: "artist" },
        { label: "2", text: "actor" },
        { label: "3", text: "author" },
        { label: "4", text: "astronaut" },
      ],
      answer: "1",
      solution: {
        method: "Context clues and vocabulary – occupations",
        steps: [
          "The sentence says George draws well, indicating a talent for art.",
          '"Actor" is related to performing in plays or films, not drawing.',
          '"Author" is someone who writes books.',
          '"Astronaut" travels in space.',
          '"Artist" is the correct career for someone skilled in drawing.',
        ],
        tip: 'Always look for the subject\'s skill/talent to identify the matching occupation: "draws well" → artist.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q11",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 11,
      marks: 1,
      question:
        "Ranjeet was __________ when he won the race. He could not stop smiling.",
      options: [
        { label: "1", text: "upset" },
        { label: "2", text: "eager" },
        { label: "3", text: "delighted" },
        { label: "4", text: "disappointed" },
      ],
      answer: "3",
      solution: {
        method: "Emotion vocabulary – positive vs negative feelings",
        steps: [
          'Clue: "he won the race" and "could not stop smiling".',
          'Winning and smiling = very happy feeling.',
          '"Upset" and "disappointed" are negative emotions → ruled out.',
          '"Eager" means keen/excited about doing something (before an event), not after winning.',
          '"Delighted" means extremely pleased/happy → matches perfectly.',
        ],
        tip: '"Delighted" = very happy, often used after a positive outcome.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q12",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 12,
      marks: 1,
      question:
        "Mrs Chan was as angry as a __________ when her son broke her expensive vase.",
      options: [
        { label: "1", text: "bull" },
        { label: "2", text: "lamb" },
        { label: "3", text: "snake" },
        { label: "4", text: "peacock" },
      ],
      answer: "1",
      solution: {
        method: "Idioms – animal comparisons (similes)",
        steps: [
          'This is a simile: "as _____ as a ______".',
          "The emotion described is anger.",
          '"Lamb" represents gentleness, not anger.',
          '"Snake" represents being sneaky or dangerous, not extreme anger.',
          '"Peacock" represents pride.',
          '"As angry as a bull" is a common English simile for extreme anger.',
        ],
        tip: 'Common animal similes: as angry as a bull, as gentle as a lamb, as proud as a peacock.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q13",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 13,
      marks: 1,
      question:
        "My sister walked __________ to the bus stop. She did not want to miss the bus.",
      options: [
        { label: "1", text: "gently" },
        { label: "2", text: "carefully" },
        { label: "3", text: "hurriedly" },
        { label: "4", text: "gracefully" },
      ],
      answer: "3",
      solution: {
        method: "Adverbs of manner – context clues",
        steps: [
          'Context clue: "She did not want to miss the bus" → she is in a hurry.',
          '"Gently" = in a mild, soft manner; does not fit hurrying.',
          '"Carefully" = with care and attention; does not imply speed.',
          '"Gracefully" = in a smooth, elegant manner; no urgency.',
          '"Hurriedly" = very quickly, in a rush → matches the context perfectly.',
        ],
        tip: 'Read the second sentence for a clue: "did not want to miss the bus" = hurrying.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q14",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 14,
      marks: 1,
      question:
        "The children enjoyed watching the __________ of dancers perform during the concert.",
      options: [
        { label: "1", text: "gang" },
        { label: "2", text: "troop" },
        { label: "3", text: "galaxy" },
        { label: "4", text: "school" },
      ],
      answer: "2",
      solution: {
        method: "Collective nouns – for groups of performers",
        steps: [
          'The blank needs a collective noun for a group of "dancers".',
          '"Gang" is used for groups of criminals or friends informally.',
          '"Galaxy" is used for stars in astronomy.',
          '"School" is used for a group of fish.',
          '"Troop" is the standard collective noun for a group of dancers or performers.',
        ],
        tip: 'Collective noun: a troop of dancers / performers. Also: a school of fish, a flock of birds, a pride of lions.',
      },
    },

    // =========================================================================
    // SECTION C: VISUAL TEXT COMPREHENSION  (Q15–20)  6 × 1 mark = 6 marks
    // Poster: 2023 Sunland Library Festival, 5–9 November
    // =========================================================================
    {
      id: "eoy_acsprimary_p2a_2023_q15",
      type: "A",
      topic: "VisualText",
      qNumber: 15,
      marks: 1,
      question: "The organiser of the library festival is __________.",
      options: [
        { label: "1", text: "Sunland Book Club" },
        { label: "2", text: "Sunland Primary School" },
        { label: "3", text: "Angsana Community Library" },
        { label: "4", text: "Hillside Neighbourhood Library" },
      ],
      answer: "2",
      solution: {
        method: "Reading a visual text – identifying key information",
        steps: [
          'Scan the poster for who is "organising" the festival.',
          'The poster states: "Sunland Primary School is organising a library festival once again!"',
          "Sunland Book Club is listed as a supporter, not organiser.",
          "The libraries are sponsors, not organisers.",
          "→ Sunland Primary School is the organiser.",
        ],
        tip: 'Look for action verbs like "organising" in the poster to identify who is responsible.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q16",
      type: "A",
      topic: "VisualText",
      qNumber: 16,
      marks: 1,
      question: "The main aim of the library festival is to __________.",
      options: [
        { label: "1", text: "encourage students to read" },
        { label: "2", text: "exchange books with other students" },
        { label: "3", text: "give students a chance to win prizes" },
        { label: "4", text: "attend a storytelling session by an author" },
      ],
      answer: "1",
      solution: {
        method: "Reading for main purpose/aim in a visual text",
        steps: [
          'Find the purpose stated in the poster: "the festival aims to promote the love of reading in all students".',
          "Promoting the love of reading = encouraging students to read.",
          "Book exchange, prizes, and storytelling are activities, not the main aim.",
          "→ The main aim is to encourage students to read.",
        ],
        tip: 'Look for "aims to" or "purpose" language in the poster for the main objective.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q17",
      type: "A",
      topic: "VisualText",
      qNumber: 17,
      marks: 1,
      question:
        "During the storytelling session, students will have a chance to __________.",
      options: [
        { label: "1", text: "take part in a quiz" },
        { label: "2", text: "meet a local author" },
        { label: "3", text: "receive a bookmark" },
        { label: "4", text: "read aloud a picture book" },
      ],
      answer: "2",
      solution: {
        method: "Reading specific details from a visual text",
        steps: [
          "Locate the Storytelling Session section on the poster.",
          'It says: "Don\'t miss the chance to see local author, Lin You Jia, in person."',
          "Meeting Lin You Jia means meeting a local author.",
          "Quizzes are for Book Quizzes activity; bookmarks are prizes for Book Quizzes.",
          "The author reads aloud his book, students do not read aloud.",
          "→ Students get to meet a local author.",
        ],
        tip: "Always read each activity box carefully; details can be confused across different activities.",
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q18",
      type: "A",
      topic: "VisualText",
      qNumber: 18,
      marks: 1,
      question:
        "Which one of the following is FALSE of the Characters Alive! Competition?",
      options: [
        { label: "1", text: "Only one winner will receive a book voucher." },
        { label: "2", text: "The competition is for selected students only." },
        { label: "3", text: "The competition is held on the second day of the festival." },
        { label: "4", text: "Participants must dress up in their favourite book character." },
      ],
      answer: "1",
      solution: {
        method: "Finding FALSE information in a visual text",
        steps: [
          "Read each option against the poster's Characters Alive! section.",
          'Poster: "Top 10 winners will win a book voucher each!" → TEN winners, not one.',
          'Option 1 says "only one winner" → this is FALSE.',
          'Option 2: "Calling all Primary 1 to 3 students" = open to many, not selected → also false, but let\'s check carefully.',
          '"Calling all Primary 1 to 3 students" means it is open to these levels, not exclusive → Option 2 is also potentially false.',
          "However, Option 1 directly contradicts a stated fact (10 winners) making it clearly false.",
          "→ The FALSE statement is Option 1.",
        ],
        tip: 'For "FALSE" questions, check numbers and specific facts carefully against the poster.',
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q19",
      type: "A",
      topic: "VisualText",
      qNumber: 19,
      marks: 1,
      question:
        "Samy wishes to take part in the activities during the library festival. He should register at __________.",
      options: [
        { label: "1", text: "Sunland Library" },
        { label: "2", text: "Sunland Concert Hall" },
        { label: "3", text: "Sunland General Office" },
        { label: "4", text: "Sunland Reading Corner" },
      ],
      answer: "3",
      solution: {
        method: "Locating specific information in a visual text",
        steps: [
          'Scan the poster for registration details.',
          'Bottom of poster: "Sign up for the activities at Sunland General Office by 20 October 2023!"',
          "Sunland Library is the venue for Book Quizzes, not registration.",
          "Sunland Concert Hall is for Characters Alive! Competition.",
          "→ Register at Sunland General Office.",
        ],
        tip: "Always check the bottom or footer of a poster for registration/sign-up information.",
      },
    },

    {
      id: "eoy_acsprimary_p2a_2023_q20",
      type: "A",
      topic: "VisualText",
      qNumber: 20,
      marks: 1,
      question:
        "Which one of the following is TRUE of the library festival?",
      options: [
        { label: "1", text: "Book quizzes will be held during recess." },
        { label: "2", text: "This is the first time the festival is being held." },
        { label: "3", text: "The festival is sponsored by Sunland Book Club." },
        { label: "4", text: "Students can exchange books at Sunland Library." },
      ],
      answer: "1",
      solution: {
        method: "Identifying TRUE statements in a visual text",
        steps: [
          "Verify each option against the poster.",
          'Book Quizzes section: "Take part in book quizzes during your recess" → Option 1 is TRUE.',
          'Poster says "once again!" → not first time, so Option 2 is FALSE.',
          "Sunland Book Club is listed as Supported by, not sponsored by → Option 3 is FALSE.",
          "Book Exchange is at Sunland Reading Corner, not Sunland Library → Option 4 is FALSE.",
          "→ The TRUE statement is Option 1.",
        ],
        tip: 'The word "once again!" is a key clue that the festival has happened before.',
      },
    },
  ],
};

export default eoy_acsprimary_p2a_2023;
