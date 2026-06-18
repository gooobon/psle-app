// =============================================================================
// Maha Bodhi School – 2023 Semestral Assessment 2 (SA2)
// English Language  |  Paper 2 Booklet A  |  Primary 3
// Total Duration (A + B): 1h 20 min   |  Booklet A Max Marks: 20
// Section A: Grammar MCQ  Q1–8   (8 × 1m = 8m)
// Section B: Vocabulary MCQ  Q9–15  (7 × 1m = 7m)
// Section C: Visual Text Comprehension  Q16–20  (5 × 1m = 5m)
//            Poster: Wild Race at Singapore Zoo, 13 December 2022
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_mahabodhi_p2a_2023: QuestionSet = {
  id: "eoy_mahabodhi_p2a_2023",
  school: "Maha Bodhi School",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2 Booklet A",
  totalMarks: 20,
  duration: 80,
  questions: [

    // =========================================================================
    // SECTION A: GRAMMAR MCQ  Q1–8  (8 × 1m = 8m)
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2a_2023_q1",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 1,
      marks: 1,
      question: "Yesterday, Sam __________ a nightmare.",
      options: [
        { label: "1", text: "has" },
        { label: "2", text: "had" },
        { label: "3", text: "have" },
        { label: "4", text: "were having" },
      ],
      answer: "2",
      solution: {
        method: "Simple past tense with time marker",
        steps: [
          "'Yesterday' is a past time marker → simple past tense required.",
          '"Has" and "have" are present tense → wrong.',
          '"Were having" is past progressive → would need context of interruption.',
          '"Had" is simple past of "have" → correct for completed past event.',
        ],
        tip: 'Past time markers (yesterday, last night, ago) → simple past tense: had, went, saw.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q2",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 2,
      marks: 1,
      question:
        "Ali __________ to school in the morning every day as he lives nearby.",
      options: [
        { label: "1", text: "walk" },
        { label: "2", text: "walks" },
        { label: "3", text: "walked" },
        { label: "4", text: "is walking" },
      ],
      answer: "2",
      solution: {
        method: "Present simple – habitual action, singular third person",
        steps: [
          "'Every day' indicates a habitual/regular action → present simple.",
          "Subject: 'Ali' = singular, third person (he).",
          "Present simple with he/she/it: add -s → 'walks'.",
          '"Walk" is for I/you/we/they. "Walked" = past. "Is walking" = present progressive (not habitual).',
        ],
        tip: "'Every day/morning/week' = habitual = present simple. He/She/It → add -s: walks.",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q3",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 3,
      marks: 1,
      question:
        '"Look at __________ restaurant across the street. Is it open?" my mother asked me.',
      options: [
        { label: "1", text: "this" },
        { label: "2", text: "that" },
        { label: "3", text: "these" },
        { label: "4", text: "those" },
      ],
      answer: "2",
      solution: {
        method: "Demonstrative determiners – singular/far",
        steps: [
          '"Restaurant" is a singular noun → need singular demonstrative.',
          '"These" and "those" are plural → ruled out.',
          '"Across the street" indicates the restaurant is far away from the speaker.',
          '"This" = near; "that" = far → "that restaurant across the street" is correct.',
        ],
        tip: '"Across the street" signals distance → "that" (not this). This = near; that = far.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q4",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 4,
      marks: 1,
      question:
        '"That eraser is __________. You have to ask him for permission before borrowing it," Meiling reminded.',
      options: [
        { label: "1", text: "his" },
        { label: "2", text: "hers" },
        { label: "3", text: "mine" },
        { label: "4", text: "yours" },
      ],
      answer: "1",
      solution: {
        method: "Possessive pronouns – identifying ownership",
        steps: [
          "Clue: 'You have to ask HIM for permission' → the eraser belongs to a boy/male.",
          "Possessive pronoun for 'he' = 'his'.",
          '"Hers" = belonging to her (female); "mine" = belonging to me; "yours" = belonging to you.',
          "'That eraser is his' = it belongs to him.",
        ],
        tip: "Possessive pronouns stand alone: mine, yours, his, hers, ours, theirs. 'Ask HIM' → his.",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q5",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 5,
      marks: 1,
      question:
        "The bird flew out of the bedroom, __________ the open window and into the garden.",
      options: [
        { label: "1", text: "over" },
        { label: "2", text: "across" },
        { label: "3", text: "through" },
        { label: "4", text: "between" },
      ],
      answer: "3",
      solution: {
        method: "Prepositions of movement – passing through an opening",
        steps: [
          "The bird moved from inside the bedroom to outside via the open window.",
          '"Over" = above and past (not fitting for a window the bird exited through).',
          '"Across" = from one side to the other of a surface.',
          '"Between" = in the middle of two things.',
          '"Through" = from one side to the other of an enclosed space/opening → correct.',
        ],
        tip: '"Through" describes movement inside/across an opening: through the window, through the door.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q6",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 6,
      marks: 1,
      question:
        "The dog barked ferociously at the postman __________ was dropping the letters in the letterbox.",
      options: [
        { label: "1", text: "who" },
        { label: "2", text: "which" },
        { label: "3", text: "where" },
        { label: "4", text: "whom" },
      ],
      answer: "1",
      solution: {
        method: "Relative pronouns – referring to a person (subject)",
        steps: [
          "The blank introduces a relative clause describing 'the postman'.",
          "'The postman' is a person.",
          '"Which" and "where" refer to things and places respectively.',
          '"Whom" is used for people as OBJECTS of the verb (e.g., the man whom I saw).',
          '"Who" refers to people as the SUBJECT of the relative clause → the postman WHO was dropping.',
        ],
        tip: "Use WHO for people (subject); WHOM for people (object); WHICH for things; WHERE for places.",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q7",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 7,
      marks: 1,
      question:
        "While the children __________ their food in the canteen, the fire alarm went off.",
      options: [
        { label: "1", text: "eat" },
        { label: "2", text: "ate" },
        { label: "3", text: "are eating" },
        { label: "4", text: "were eating" },
      ],
      answer: "4",
      solution: {
        method: "Past progressive – interrupted ongoing action",
        steps: [
          "Structure: 'While the children _____, the fire alarm went off.'",
          "'Went off' = simple past (the interrupting event).",
          "The eating was in progress when the alarm interrupted → past progressive.",
          '"Eat" and "are eating" are present tense → wrong.',
          '"Ate" = simple past; while usually pairs with past progressive.',
          '"Were eating" = past progressive → correct.',
        ],
        tip: "'While' + past progressive (were eating) + simple past (went off) = interrupted action.",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q8",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 8,
      marks: 1,
      question:
        "My domestic helper was cleaning the house just now, __________ she?",
      options: [
        { label: "1", text: "is" },
        { label: "2", text: "isn't" },
        { label: "3", text: "was" },
        { label: "4", text: "wasn't" },
      ],
      answer: "4",
      solution: {
        method: "Question tags – past progressive, positive main clause",
        steps: [
          "Main clause: 'My domestic helper WAS cleaning the house' → positive, past progressive.",
          "Rule: positive main clause → negative question tag.",
          "The auxiliary verb is 'was' (from 'was cleaning').",
          "Negative of 'was' = 'wasn't'.",
          "→ Question tag: 'wasn't she?' (negative tag, female pronoun for helper).",
        ],
        tip: "Positive statement → negative tag. Use the same auxiliary: was → wasn't.",
      },
    },

    // =========================================================================
    // SECTION B: VOCABULARY MCQ  Q9–15  (7 × 1m = 7m)
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2a_2023_q9",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 9,
      marks: 1,
      question:
        "I could see Eric's head __________ up and down among the audience because he could not have a good view of the stage.",
      options: [
        { label: "1", text: "bob" },
        { label: "2", text: "bang" },
        { label: "3", text: "bump" },
        { label: "4", text: "bounce" },
      ],
      answer: "1",
      solution: {
        method: "Verbs of movement – head movements",
        steps: [
          "The head moves 'up and down' while the person tries to see over others.",
          '"Bang" = to hit something hard (makes a sound).',
          '"Bump" = to knock against something.',
          '"Bounce" = to spring back after hitting a surface (for balls).',
          '"Bob" = to move up and down gently → specifically used for heads bobbing.',
        ],
        tip: '"Bob" specifically describes a gentle up-and-down movement, often of the head.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q10",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 10,
      marks: 1,
      question:
        "Sharifah __________ as she did not know the answer to the question.",
      options: [
        { label: "1", text: "shook" },
        { label: "2", text: "bowed" },
        { label: "3", text: "nodded" },
        { label: "4", text: "shrugged" },
      ],
      answer: "4",
      solution: {
        method: "Verbs for body language – expressing not knowing",
        steps: [
          "Sharifah didn't know the answer → she expressed uncertainty/not knowing.",
          '"Shook" (head) = disagreement → often must say "shook her head".',
          '"Bowed" = to lower your head/body out of respect.',
          '"Nodded" = a head movement showing agreement or understanding.',
          '"Shrugged" = to raise and lower the shoulders to show you don\'t know or don\'t care → correct.',
        ],
        tip: '"Shrugged" = the body language of raising shoulders to say "I don\'t know."',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q11",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 11,
      marks: 1,
      question:
        "After an argument with my best friend, I __________ angrily.",
      options: [
        { label: "1", text: "walked in" },
        { label: "2", text: "walked off" },
        { label: "3", text: "walked over" },
        { label: "4", text: "walked through" },
      ],
      answer: "2",
      solution: {
        method: "Phrasal verbs – manner of departure",
        steps: [
          "After an argument, the speaker left angrily.",
          '"Walked in" = entered (an area).',
          '"Walked over" = moved towards someone/somewhere.',
          '"Walked through" = moved through a space.',
          '"Walked off" = left in anger or frustration → correct phrasal verb.',
        ],
        tip: '"Walk off" = to leave angrily or in a huff after a disagreement.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q12",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 12,
      marks: 1,
      question:
        "We are planning a surprise party for Miss Lim on Teachers' Day. Promise us you will not __________.",
      options: [
        { label: "1", text: "hold your horses" },
        { label: "2", text: "let the cat out of the bag" },
        { label: "3", text: "take the bull by the horns" },
        { label: "4", text: "kill two birds with one stone" },
      ],
      answer: "2",
      solution: {
        method: "Idioms – keeping a secret",
        steps: [
          "Context: We are planning a SURPRISE party. We want to keep it secret.",
          '"Hold your horses" = wait/slow down.',
          '"Take the bull by the horns" = face a problem directly.',
          '"Kill two birds with one stone" = achieve two things with one action.',
          '"Let the cat out of the bag" = accidentally reveal a secret → correct; we don\'t want the secret revealed.',
        ],
        tip: '"Let the cat out of the bag" = to reveal a secret. "Don\'t tell anyone about the surprise!"',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q13",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 13,
      marks: 1,
      question:
        '"You shouldn\'t trust strangers. They can be __________," warned Father.',
      options: [
        { label: "1", text: "as fierce as a tiger" },
        { label: "2", text: "as playful as a dog" },
        { label: "3", text: "as cunning as a fox" },
        { label: "4", text: "as stubborn as a mule" },
      ],
      answer: "3",
      solution: {
        method: "Idioms/similes – animal comparisons for character traits",
        steps: [
          "Father warns about strangers → they might be deceptive/tricky.",
          '"As fierce as a tiger" = very aggressive (not relevant to trusting strangers).',
          '"As playful as a dog" = fond of play (positive, not dangerous).',
          '"As stubborn as a mule" = refusing to change one\'s mind.',
          '"As cunning as a fox" = very clever in a deceptive way → matches "don\'t trust strangers".',
        ],
        tip: '"Cunning" = clever in a sneaky/deceptive way. Foxes are symbols of trickery.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q14",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 14,
      marks: 1,
      question:
        "I was just cracking a joke, but he took it __________ and stormed off.",
      options: [
        { label: "1", text: "lightly" },
        { label: "2", text: "seriously" },
        { label: "3", text: "positively" },
        { label: "4", text: "completely" },
      ],
      answer: "2",
      solution: {
        method: "Adverbs – interpreting something too strongly",
        steps: [
          "The speaker cracked a joke (not serious), but the other person 'stormed off' (left angrily).",
          "'Stormed off' = left in anger → he misunderstood the joke as a real insult.",
          '"Lightly" = without seriousness; opposite of the reaction described.',
          '"Positively" = in a positive manner; doesn\'t explain anger.',
          '"Completely" = fully/entirely; doesn\'t fit the context.',
          '"Seriously" = as if it were a real, serious matter → "took it seriously" = misread a joke as real.',
        ],
        tip: '"Take something seriously" = to treat something as important/real when it was meant as a joke.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q15",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 15,
      marks: 1,
      question:
        "Farhan was __________ to hear that the soccer match was cancelled due to the rain. He was really looking forward to it.",
      options: [
        { label: "1", text: "dissatisfied" },
        { label: "2", text: "discouraged" },
        { label: "3", text: "disappointed" },
        { label: "4", text: "disheartened" },
      ],
      answer: "3",
      solution: {
        method: "Vocabulary – precise emotion words with context clues",
        steps: [
          'Clue: "He was really looking forward to it" → he was excited, then the match was cancelled.',
          '"Dissatisfied" = not satisfied with quality/service → more about complaints.',
          '"Discouraged" = loss of confidence/motivation (usually about one\'s own ability).',
          '"Disheartened" = having lost hope or enthusiasm.',
          '"Disappointed" = sad because something you hoped for didn\'t happen → perfectly matches cancelled event.',
        ],
        tip: '"Disappointed" = sad because expectations were not met. Cancelled event + was looking forward = disappointed.',
      },
    },

    // =========================================================================
    // SECTION C: VISUAL TEXT COMPREHENSION  Q16–20  (5 × 1m = 5m)
    // Poster: Wild Race at Singapore Zoo & Night Safari
    // Date: 13 December 2022 (9pm–12am)
    // Categories: Parent & Child Race (1 adult + 1 child 4–8yo, 3km)
    //             Fastest Kid Race (child 9–12yo, 2km)
    //             Stroller Walk (2 adults + 1 toddler below 3yo, 5km)
    // Early Bird: 27 Sep – 30 Oct; Normal Rate: 31 Oct – 30 Nov
    // Participants receive: goody bag (T-shirt, towel, carnival coupons) + medal
    // Early birds also receive: animal plush toy
    // Free Admission* to Singapore Zoo, River Safari and Night Safari
    // *on day of competition only
    // =========================================================================
    {
      id: "eoy_mahabodhi_p2a_2023_q16",
      type: "A",
      topic: "VisualText",
      qNumber: 16,
      marks: 1,
      question:
        "The last date for the participants to enjoy the early bird discount for the registration fee is __________.",
      options: [
        { label: "1", text: "30 October" },
        { label: "2", text: "30 November" },
        { label: "3", text: "13 December" },
        { label: "4", text: "27 September" },
      ],
      answer: "1",
      solution: {
        method: "Reading a visual text – dates/deadlines",
        steps: [
          "Locate the early bird section on the poster.",
          "Early bird registration: 27 Sep to 30 Oct.",
          "'Last date' = end date of early bird period = 30 October.",
          "→ Answer: (1) 30 October",
        ],
        tip: "The early bird period is '27 Sep to 30 Oct' — the LAST date is 30 Oct.",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q17",
      type: "A",
      topic: "VisualText",
      qNumber: 17,
      marks: 1,
      question: "Why is this event called the 'wild race'?",
      options: [
        { label: "1", text: "Participants will be running wildly." },
        { label: "2", text: "Participants will be racing in the wild." },
        { label: "3", text: "Participants will be able to enjoy running with the animals." },
        { label: "4", text: "Participants will be able to observe the animals and be close to nature." },
      ],
      answer: "4",
      solution: {
        method: "Reading for main purpose in visual text",
        steps: [
          'Poster states: "Enjoy a unique experience running through the Singapore Zoo and the Night Safari, observing the animals and being close to nature."',
          "The 'wild' refers to the wildlife/natural setting, not running in a chaotic way.",
          "Option 4 matches the poster's stated description exactly.",
          "→ Answer: (4) Participants will be able to observe the animals and be close to nature.",
        ],
        tip: "Find the descriptive sentence in the poster body that explains the event's name.",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q18",
      type: "A",
      topic: "VisualText",
      qNumber: 18,
      marks: 1,
      question: "Participants will receive __________ at the end of the race.",
      options: [
        { label: "1", text: "a T-shirt" },
        { label: "2", text: "a medal" },
        { label: "3", text: "carnival coupons" },
        { label: "4", text: "an animal plush toy" },
      ],
      answer: "2",
      solution: {
        method: "Reading specific details from a visual text",
        steps: [
          "Poster: 'Each participant will receive: a goody bag (T-shirt, towel, carnival coupons) AND a medal at the end of the race.'",
          "The T-shirt and carnival coupons are inside the goody bag (received generally).",
          "The animal plush toy is only for EARLY BIRDS.",
          "The medal is specifically given 'at the end of the race'.",
          "→ Answer: (2) a medal",
        ],
        tip: '"At the end of the race" is the key phrase — only the medal is specifically given at this time.',
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q19",
      type: "A",
      topic: "VisualText",
      qNumber: 19,
      marks: 1,
      question:
        "Chloe is nine years old. She wants to sign up for the race on 1 November. She has to pay __________ for the registration fee.",
      options: [
        { label: "1", text: "$25" },
        { label: "2", text: "$40" },
        { label: "3", text: "$45" },
        { label: "4", text: "$80" },
      ],
      answer: "3",
      solution: {
        method: "Reading a table in a visual text – applying multiple conditions",
        steps: [
          "Chloe's age: 9 years old → falls under 'Fastest Kid Race' (Child, 9–12 years old).",
          "Registration date: 1 November → falls in Normal Rate period (31 Oct – 30 Nov).",
          "Fastest Kid Race, Normal Rate = $45.",
          "→ Answer: (3) $45",
        ],
        tip: "Read the table carefully: match the AGE to the category, then the DATE to the rate (early bird vs normal).",
      },
    },

    {
      id: "eoy_mahabodhi_p2a_2023_q20",
      type: "A",
      topic: "VisualText",
      qNumber: 20,
      marks: 1,
      question: "Which of the following statements is TRUE?",
      options: [
        { label: "1", text: "Admission to the Night Safari is free on any day after the race." },
        { label: "2", text: "The toddler must run with their parents in the Stroller Walk category." },
        { label: "3", text: "A father and his ten-year-old child can join the Parent and Child Race." },
        { label: "4", text: "There is free admission to the Singapore Zoo, River Safari and Night Safari on 13 December 2022." },
      ],
      answer: "4",
      solution: {
        method: "Identifying TRUE statements in a visual text",
        steps: [
          "Option 1: 'Free on any day AFTER the race' → The asterisk (*) says 'Free admission for participants ON THE DAY of competition' → FALSE.",
          "Option 2: Stroller Walk is for 2 Adults + 1 Toddler; a toddler in a stroller doesn't run → FALSE.",
          "Option 3: Parent and Child Race is for 1 Adult + 1 Child (4–8 years old). A 10-year-old does not qualify → FALSE.",
          "Option 4: The race is on 13 December 2022, and free admission is on the day of competition → TRUE.",
          "→ Answer: (4)",
        ],
        tip: "Check the asterisk (*) footnote carefully: free admission is ONLY on race day (13 December).",
      },
    },
  ],
};

export default eoy_mahabodhi_p2a_2023;
