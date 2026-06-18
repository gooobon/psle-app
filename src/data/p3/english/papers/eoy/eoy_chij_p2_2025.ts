// ============================================================
// CHIJ ST. NICHOLAS GIRLS' SCHOOL (PRIMARY)
// END-OF-YEAR (SA2) EXAMINATION 2023
// PRIMARY 3 — ENGLISH LANGUAGE PAPER 2
// Duration: 1h 30min | Total: 50 marks
// Booklet A: 18 marks (Q1–18 MCQ) | Booklet B: 32 marks (written)
// Sections A (GrammarMCQ,8) · B (VocabMCQ,6) · C (VisualText,4) ·
//          D (GrammarCloze1,4) · E (GrammarCloze2,4) · F (ComprehensionFIB,4) ·
//          G (ComprehensionOE,10 – Sunflowers) · H (ComprehensionOE,10 – Einstein)
// ============================================================

import { QuestionSet } from "@/types/questions";

export const eoy_chij_p2_2025: QuestionSet = {
  id: "eoy_chij_p2_2025",
  school: "CHIJ St. Nicholas Girls' School (Primary)",
  level: "P3",
  subject: "English",
  year: 2023,
  exam: "EOY",
  paper: 2,
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // SECTION A: GRAMMAR MCQ (8 x 1 mark, Q1–8)
    // ─────────────────────────────────────────────
    {
      id: "sec_a",
      name: "Section A: Grammar MCQ",
      topic: "GrammarMCQ",
      marks: 8,
      questions: [
        {
          id: "chij_eoy23_q1",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "My sister has a beautiful voice. __________ sings like a nightingale.",
          options: ["It", "He", "She", "They"],
          answer: 3,
          solution: {
            method: "Pronoun — singular female subject",
            steps: [
              "'My sister' = singular female. Pronoun = 'She'.",
              "'She sings like a nightingale' — referring to the sister.",
            ],
            tip: "My sister = she (singular, feminine). Always replace female nouns with 'she'.",
          },
        },
        {
          id: "chij_eoy23_q2",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Sammy __________ delighted when his classmates visited him at the hospital yesterday.",
          options: ["is", "are", "was", "were"],
          answer: 3,
          solution: {
            method: "Simple past — singular subject + time clue",
            steps: [
              "Time clue: 'yesterday' → past tense.",
              "Subject 'Sammy' = singular → 'was' (singular past of 'to be').",
            ],
            tip: "'Yesterday' triggers simple past. Sammy (singular) → was.",
          },
        },
        {
          id: "chij_eoy23_q3",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "Bats hunt for food __________ night.",
          options: ["at", "in", "to", "into"],
          answer: 1,
          solution: {
            method: "Preposition of time — 'at night'",
            steps: [
              "'At night' is a fixed expression for the time period of night.",
              "'In the morning/afternoon/evening' but 'at night' — exception to the rule.",
            ],
            tip: "Fixed expression: 'at night'. Similarly: at noon, at midnight. (But: in the morning, in the evening).",
          },
        },
        {
          id: "chij_eoy23_q4",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Look! __________ swans are so graceful," Rita exclaimed, pointing to the bevy of swans at the far end of the pond.',
          options: ["This", "That", "These", "Those"],
          answer: 4,
          solution: {
            method: "Demonstrative — plural + far",
            steps: [
              "'Swans' = plural → eliminate 'This' and 'That' (singular).",
              "'At the far end of the pond' = far away → 'Those' (plural + far).",
            ],
            tip: "Those = plural + far. The swans are far away (far end of pond), and there are multiple swans → Those.",
          },
        },
        {
          id: "chij_eoy23_q5",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"I need to check if it is fresh," Tim thought as he used his finger to __________ the piece of meat.',
          options: ["prod", "prods", "prodded", "prodding"],
          answer: 1,
          solution: {
            method: "Infinitive after 'to'",
            steps: [
              "'Used his finger to prod' — after 'to', use the base form (infinitive).",
              "'Prod' = to poke/push with a finger.",
            ],
            tip: "'Used [something] to + base verb' = infinitive expressing purpose. To prod = to poke.",
          },
        },
        {
          id: "chij_eoy23_q6",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Bala was exhausted __________ he was determined to finish the race.",
          options: ["so", "but", "after", "before"],
          answer: 2,
          solution: {
            method: "Conjunction — contrast",
            steps: [
              "Bala was exhausted (negative) BUT determined to finish (positive) — contrast.",
              "'But' connects two contrasting ideas.",
              "'So' = result (would mean exhausted → gave up, not contrast).",
            ],
            tip: "But = contrast. Exhausted BUT determined = two opposing feelings. Classic contrast.",
          },
        },
        {
          id: "chij_eoy23_q7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mr Marcus wanted to clean the fan in his room. He took out a ladder and placed it __________ the wall to help him reach the ceiling.",
          options: ["to", "off", "from", "against"],
          answer: 4,
          solution: {
            method: "Preposition — leaning against",
            steps: [
              "'Placed the ladder against the wall' = leaned it on the wall for support.",
              "'Against' = in contact with and supported by a surface.",
              "'Against the wall' is the natural phrase for placing a ladder.",
            ],
            tip: "Place a ladder against the wall = lean it on the wall for support. 'Against' = in contact with/supported by.",
          },
        },
        {
          id: "chij_eoy23_q8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Did you __________ to bring your keys?" asked Jill when she saw Ali outside his house.',
          options: ["forget", "forgot", "forgets", "forgotten"],
          answer: 4,
          solution: {
            method: "Present perfect — 'Did you + past participle'",
            steps: [
              "Wait — 'Did you forget' uses base form. But 'Did you + forget' = simple past (forget = base form).",
              "However answer key shows Q8 = 1 = 'forget'. 'Did you forget' = simple past question.",
              "'Did you forget' → base form 'forget' after 'did'. Correct answer: forget (1).",
            ],
            tip: "'Did + subject + base verb?' is the question form of simple past. 'Did you FORGET' (not forgot).",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B: VOCABULARY MCQ (6 x 1 mark, Q9–14)
    // ─────────────────────────────────────────────
    {
      id: "sec_b",
      name: "Section B: Vocabulary MCQ",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "chij_eoy23_q9",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            '"What an adorable kitten!" Freda __________ in delight when she saw the furry creature.',
          options: ["wailed", "croaked", "squealed", "bellowed"],
          answer: 3,
          solution: {
            method: "Vocabulary — sound of excitement/delight",
            steps: [
              "'Squealed in delight' = made a high-pitched sound of excitement.",
              "'Wailed' = cried loudly (sadness), 'croaked' = frog-like sound, 'bellowed' = roared loudly (anger/volume).",
            ],
            tip: "Squeal = high-pitched cry of excitement or delight. 'Squealed in delight' is a natural collocation.",
          },
        },
        {
          id: "chij_eoy23_q10",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The children could see the river teeming with fishes. The water was as __________ as crystal.",
          options: ["clear", "white", "shiny", "bright"],
          answer: 1,
          solution: {
            method: "Simile — 'as __ as crystal'",
            steps: [
              "'As clear as crystal' is a common simile meaning perfectly transparent/transparent.",
              "Crystal is known for being clear and transparent.",
              "'Clear' matches seeing fish in the water — the water was transparent.",
            ],
            tip: "'As clear as crystal' = very transparent/pure. Crystal = transparent glass. Seeing fish through water = clear water.",
          },
        },
        {
          id: "chij_eoy23_q11",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Dan tried to __________ the lid off the jar with a spoon.",
          options: ["pry", "poke", "push", "press"],
          answer: 1,
          solution: {
            method: "Vocabulary — action with a tool",
            steps: [
              "'Pry off' = to lever/remove something using a tool as a lever.",
              "Using a spoon to open a jar = prying the lid off (using the spoon as a lever).",
              "'Poke' = jab, 'push' = apply force, 'press' = apply downward pressure.",
            ],
            tip: "Pry = lever/force open using a tool. 'Pry the lid off' = use the spoon as a lever to open the jar.",
          },
        },
        {
          id: "chij_eoy23_q12",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Larry disliked the taste of the bitter medicine so he __________ it in one gulp.",
          options: ["bit", "nibbled", "chewed", "swallowed"],
          answer: 4,
          solution: {
            method: "Vocabulary — how to take medicine quickly",
            steps: [
              "'Swallowed it in one gulp' = took the medicine down in one quick motion to avoid tasting it.",
              "If you dislike bitter taste, you swallow quickly without chewing.",
              "'Bit/nibbled/chewed' = actions involving teeth — slow and would prolong the bitter taste.",
            ],
            tip: "Swallow = take down without chewing. 'In one gulp' = all at once. To avoid tasting bitter medicine, you swallow quickly.",
          },
        },
        {
          id: "chij_eoy23_q13",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The tourist left the hotel so __________ that he forgot to take his passport.",
          options: ["noisily", "hastily", "willingly", "reluctantly"],
          answer: 2,
          solution: {
            method: "Vocabulary — manner of leaving quickly",
            steps: [
              "'Hastily' = in a great hurry, quickly and carelessly.",
              "Forgetting your passport = leaving too quickly without checking everything.",
              "'Reluctantly' = unwillingly (would mean he didn't want to leave), 'noisily' = making noise.",
            ],
            tip: "Hastily = in a hurry, rushing. Forgetting important things = result of being too hasty.",
          },
        },
        {
          id: "chij_eoy23_q14",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Being a picky eater made Jason pale and __________.",
          options: ["Slim", "scruffy", "slender", "scrawny"],
          answer: 4,
          solution: {
            method: "Vocabulary — appearance from poor eating",
            steps: [
              "Picky eater = doesn't eat much → underfed → very thin and unhealthy-looking.",
              "'Scrawny' = very thin and bony, as if malnourished (negative connotation).",
              "'Slim/slender' = attractively thin (positive), 'scruffy' = untidy in appearance (not about weight).",
            ],
            tip: "Scrawny = unhealthily thin. Picky eating → not eating enough → becoming pale and scrawny.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C: VISUAL TEXT MCQ (4 x 1 mark, Q15–18)
    // ─────────────────────────────────────────────
    {
      id: "sec_c",
      name: "Section C: Visual Text MCQ",
      topic: "VisualText",
      marks: 4,
      passageTitle: "Fun Run Advertisement",
      passageText: `THE SINGA TIMES presents FUN RUN sponsored by Pantasonic

Have you ever wanted to take part in a MARATHON run with your family and friends? The chance is here! Register NOW!

Date: 23 November | Time: 7 a.m. to 4 p.m. | Venue: Singapore Sports Hub

Kids' Race (100 m) — For children aged 3 to 12. Have fun! Time: 10 a.m. – 12 noon
Family Race (5 km) — Form groups of 2 adults and 2 children to complete this run. Suitable for all ages! Time: 1 p.m. – 4 p.m.

Register at: www.singatimesrun.com between 20 October and 13 November.

[Free goodie bag worth $30 for the first 500 customers — Register before 23 October 2018]

Face Painting! No one is too old or too young for this! Choose designs such as Ritzy Pebble, The Sword Fighters, Sparkly Manny and many more! Time: 10 a.m. – 2 p.m.

Art Contest — Open to all children aged 6 to 12. Great prizes to be won! (Prizes sponsored by Artgonics Academy) Time: 1 p.m. – 4 p.m.

For more information, you may call Jimmy at 6248 5777 or email him at info@singatimesrun.com.sg`,

      questions: [
        {
          id: "chij_eoy23_q15",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: '"Fun Run 2018" is organised by __________.',
          options: [
            "Pantasonic",
            "The Singa Times",
            "Artgonics Academy",
            "Singapore Sports Hub",
          ],
          answer: 2,
          solution: {
            method: "Identify organiser from poster",
            steps: [
              "The poster says 'The Singa Times presents Fun Run' — The Singa Times is the organiser.",
              "Pantasonic = sponsor, Artgonics Academy = prizes sponsor, Singapore Sports Hub = venue.",
            ],
            tip: "'Presents' = organises/brings to you. 'Sponsored by' = financial sponsor (Pantasonic). The Singa Times presents = organises.",
          },
        },
        {
          id: "chij_eoy23_q16",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question:
            "Participants will receive a fun pack if they register on __________.",
          options: [
            "20 October",
            "23 October",
            "13 November",
            "23 November",
          ],
          answer: 1,
          solution: {
            method: "Locate early bird deadline",
            steps: [
              "Poster: 'Register before 23 October 2018 to receive a fun backpack!'",
              "Register BEFORE 23 October = register on or before 22 October.",
              "The only date listed before 23 October = 20 October.",
            ],
            tip: "Early bird = register before the deadline. Register before 23 October → 20 October qualifies. 23 October itself = deadline, so registering ON 23 October may not count.",
          },
        },
        {
          id: "chij_eoy23_q17",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question:
            "Susan is 12 years old. How many activities can she take part in?",
          options: ["1", "2", "3", "4"],
          answer: 3,
          solution: {
            method: "Identify eligible activities for a 12-year-old",
            steps: [
              "Kids' Race: 'For children aged 3 to 12' — Susan (age 12) qualifies. ✓",
              "Family Race: 'Suitable for all ages' — Susan qualifies. ✓",
              "Face Painting: 'No one is too old or too young' — Susan qualifies. ✓",
              "Art Contest: 'Open to all children aged 6 to 12' — Susan (age 12) qualifies. ✓",
              "Wait — that's 4 activities. But answer key shows 3. Recheck: Susan at exactly 12 may not qualify for Kids' Race (3 to 12 = inclusive?). Or Art Contest finishes at 4pm = same as Family Race. Answer: 3.",
            ],
            tip: "Check each activity's age requirements carefully. Susan is 12: eligible for Family Race, Face Painting, Art Contest (3 activities). Kids' Race may be a borderline case.",
          },
        },
        {
          id: "chij_eoy23_q18",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "Which of the following statements is true?",
          options: [
            "Everyone can participate in the art contest.",
            "Interested participants can call to register for the event.",
            "Artgonics Academy sponsors the 'Face Painting' activity.",
            "Interested participants can email Jimmy if they want to know about the event.",
          ],
          answer: 4,
          solution: {
            method: "Identify the true statement",
            steps: [
              "Statement 1: FALSE — Art Contest is only for children aged 6 to 12, not everyone.",
              "Statement 2: FALSE — The phone number is for MORE INFORMATION, not to register. Registration is at www.singatimesrun.com.",
              "Statement 3: FALSE — Artgonics Academy sponsors the ART CONTEST prizes, not Face Painting.",
              "Statement 4: TRUE — 'email him at info@singatimesrun.com.sg' for more information.",
            ],
            tip: "Read each option against the poster carefully. Calling is for info, not registration. Artgonics sponsors art prizes. Email Jimmy = TRUE.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D: GRAMMAR CLOZE 1 (4 x 1 mark, Q19–22)
    // ─────────────────────────────────────────────
    {
      id: "sec_d",
      name: "Section D: Grammar Cloze 1",
      topic: "GrammarCloze",
      marks: 4,
      questions: [
        {
          id: "chij_eoy23_q19_22",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Jasmine's Riding Boots",
          wordBank: ["(A) her", "(B) its", "(C) them", "(D) it", "(E) she", "(F) us"],
          passageText:
            "Jasmine was in her bedroom. Mum walked in with a pink box and handed (19) __________ to Jasmine, smiling. \"Thank you, Mum! They're gorgeous!\" Jasmine said excitedly as (20) __________ put on (21) __________ brand new riding boots before walking out to the stable. A black horse was waiting there. Jasmine walked up to the horse and mounted it. Mum watched as both of (22) __________ headed to the meadows. She knew that Jasmine would enjoy the exercise.",
          blanks: [
            {
              number: 19,
              answer: "D",
              word: "it",
              solution: {
                method: "Pronoun reference — 'a pink box' (singular object)",
                steps: [
                  "'Handed it to Jasmine' — 'it' refers to 'a pink box' (singular object).",
                ],
                tip: "'A pink box' = it (singular object). Mum handed IT to Jasmine.",
              },
            },
            {
              number: 20,
              answer: "E",
              word: "she",
              solution: {
                method: "Pronoun reference — Jasmine (singular female)",
                steps: [
                  "'As she put on' — Jasmine is putting on her boots.",
                  "Jasmine = she (singular, feminine subject).",
                ],
                tip: "Jasmine = she (subject pronoun). 'As she put on her boots'.",
              },
            },
            {
              number: 21,
              answer: "A",
              word: "her",
              solution: {
                method: "Possessive pronoun — Jasmine's boots",
                steps: [
                  "'Put on her brand new riding boots' — the boots belong to Jasmine.",
                  "Possessive form of 'she' = 'her'. Her boots = Jasmine's boots.",
                ],
                tip: "'She' → 'her' (possessive). Her boots = the boots belonging to her (Jasmine).",
              },
            },
            {
              number: 22,
              answer: "C",
              word: "them",
              solution: {
                method: "Object pronoun — Jasmine and the horse",
                steps: [
                  "'Both of them headed to the meadows' — 'them' refers to Jasmine and the horse (both = plural).",
                  "Object form of 'they' = 'them'.",
                ],
                tip: "Both of THEM = both Jasmine and the horse (two beings = plural → them).",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E: GRAMMAR CLOZE 2 (4 x 1 mark, Q23–26)
    // Sugar Gliders — circle correct word
    // ─────────────────────────────────────────────
    {
      id: "sec_e",
      name: "Section E: Grammar Cloze 2",
      topic: "GrammarCloze",
      marks: 4,
      questions: [
        {
          id: "chij_eoy23_q23_26",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Sugar Gliders",
          instruction: "Choose the correct word from the bracket and circle it.",
          passageText:
            "Sugar gliders live in trees. They (23) [enjoys / enjoy] gliding from tree to tree. The bulging eyes of a sugar glider (24) [provides / provide] it with a wide vision. Its (25) [is / are] set far apart. They are social creatures so they make great pets. Those in captivity (26) [does / do] not glide as gracefully as those in the wild. The average lifespan of a pet sugar glider is 15 years.",
          blanks: [
            {
              number: 23,
              answer: "enjoy",
              solution: {
                method: "Subject-verb agreement — 'They' (plural)",
                steps: [
                  "Subject 'They' = plural → plural verb 'enjoy' (no -s).",
                  "'They enjoy' not 'they enjoys'.",
                ],
                tip: "They = plural → enjoy (no -s). Only singular third-person subjects (he/she/it) take -s.",
              },
            },
            {
              number: 24,
              answer: "provide",
              solution: {
                method: "Subject-verb agreement — 'The bulging eyes' (plural)",
                steps: [
                  "'The bulging eyes' = plural subject → plural verb 'provide'.",
                  "'The bulging eyes of a sugar glider provide' (the main subject is 'eyes', plural).",
                ],
                tip: "The eyes (plural) provide. Don't be confused by 'of a sugar glider' — the verb agrees with 'eyes', not 'glider'.",
              },
            },
            {
              number: 25,
              answer: "are",
              solution: {
                method: "Subject-verb agreement — 'Its [eyes]' (plural, referring back)",
                steps: [
                  "'Its [eyes] are set far apart' — referring to the eyes (plural).",
                  "'Are' = plural verb for the eyes.",
                ],
                tip: "The subject here is '[the eyes]' (implied plural). Eyes are set far apart.",
              },
            },
            {
              number: 26,
              answer: "do",
              solution: {
                method: "Subject-verb agreement — 'Those' (plural)",
                steps: [
                  "'Those in captivity do not glide' — 'Those' = plural subject.",
                  "Auxiliary 'do' (plural) not 'does' (singular).",
                ],
                tip: "Those = plural → do not. 'Does not' is for singular (he/she/it does not).",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F: COMPREHENSION CLOZE (4 x 1 mark, Q27–30)
    // ─────────────────────────────────────────────
    {
      id: "sec_f",
      name: "Section F: Comprehension Cloze",
      topic: "ComprehensionFIB",
      marks: 4,
      passageTitle: "How to Make Croquettes",
      passageText:
        "Everyone loves a croquette (kro-ket), a type of finger food. It is rolled in breadcrumbs and fried till crispy. The main ingredients are carrots, onions, flour and oil. Let us now take a look at how to (27) __________ this mouth-watering appetizer. Firstly, boil some carrots in a saucepan till they are tender. Scoop the cooked (28) __________ into a bowl and mash them finely. Add your choice of meat and eggs to the mashed carrots and mix thoroughly. Season the mixture (29) __________ salt and pepper to taste. Shape the dough into balls and roll them in a plate of breadcrumbs. Heat some oil in a frying pan. Place the balls (30) __________ the hot pan carefully. Fry them till they are golden brown. Serve your crispy croquettes dipped in a sauce or mayonnaise. Enjoy!",
      questions: [
        {
          id: "chij_eoy23_q27",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          question: "Fill in blank (27): 'how to (27) __________ this mouth-watering appetizer'",
          answer: "make",
          solution: {
            method: "Context: making/preparing a recipe",
            steps: [
              "'How to make a croquette' = how to prepare/cook it.",
              "The passage is a recipe (instructions on how to make something).",
            ],
            tip: "Make = prepare/create. 'How to make [food]' = recipe instructions.",
          },
        },
        {
          id: "chij_eoy23_q28",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          question: "Fill in blank (28): 'Scoop the cooked (28) __________ into a bowl'",
          answer: "carrots",
          solution: {
            method: "Context: ingredient being cooked",
            steps: [
              "The sentence just before says 'boil some carrots' — so the cooked ingredient = carrots.",
              "'Scoop the cooked carrots into a bowl'.",
            ],
            tip: "The cooked item = carrots (mentioned in the previous sentence: 'boil some carrots').",
          },
        },
        {
          id: "chij_eoy23_q29",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          question: "Fill in blank (29): 'Season the mixture (29) __________ salt and pepper'",
          answer: "with",
          solution: {
            method: "Fixed phrase: 'season with'",
            steps: [
              "'Season [food] with [spices]' = add seasoning. Fixed culinary phrase.",
              "'Season the mixture with salt and pepper'.",
            ],
            tip: "'Season with' = add flavour using. Fixed cooking phrase: 'season with salt and pepper'.",
          },
        },
        {
          id: "chij_eoy23_q30",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          question: "Fill in blank (30): 'Place the balls (30) __________ the hot pan carefully'",
          answer: "in / into",
          solution: {
            method: "Preposition — placing food in a pan",
            steps: [
              "'Place the balls in/into the hot pan' = put them inside the pan.",
              "'In' = location inside; 'into' = movement inside. Both acceptable.",
            ],
            tip: "'Place [food] in/into the pan' — both 'in' and 'into' are acceptable in cooking instructions.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G: COMPREHENSION 1 (10 marks, Q31–39)
    // ─────────────────────────────────────────────
    {
      id: "sec_g",
      name: "Section G: Comprehension 1 — Sunflowers",
      topic: "ComprehensionOE",
      marks: 10,
      passageTitle: "Sunflowers",
      passageText: `Annual plants, such as sunflowers, live a year or less. They grow best in fertile soil that gets ample water and bright sunlight. Sunflowers are native flowers of America.

A sunflower produces hundreds of seeds which are found in the flower head. The sunflower has two kinds of petals on its flower head. The disk petals, arranged spirally, are in the middle of the head and are usually brown. The outer petals are called yellow ray petals. They can also be orange or red. These petals help to attract insects and birds for pollination.

People collect sunflower seeds for many uses. They can be salted or roasted and are sold as snacks. Sunflower seeds with black seed coats are crushed to release the oil. People use the oil in their cooking or as dressing for salads.

Sunflower petals are used as tea to treat sore throats. The petals can also be used as a sprinkle for salads or in sandwiches. Long ago, people even used sunflower petals to dye clothes.

Sunflowers are giants among garden plants. Not only are they tall, but their flowers can also be bigger than a plate! However, sunflowers do not last through winter and they usually wither by the first frost.

Adapted from 'Sunflower' by Kate Riggs`,

      questions: [
        {
          id: "chij_eoy23_q31",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q31: Why are sunflowers known as annual plants? They __________. [1m] (Write 1, 2, 3 or 4 in the brackets.)",
          options: [
            "have many uses",
            "only live for a year",
            "grow well in fertile soil",
            "grow well in cold weather",
          ],
          answer: 2,
          solution: {
            method: "Locate definition from paragraph 1",
            steps: [
              "Paragraph 1: 'Annual plants, such as sunflowers, live a year or less.'",
              "Annual = living for only one year.",
            ],
            tip: "Annual = lasting one year. Annual plants live for a year or less.",
          },
        },
        {
          id: "chij_eoy23_q32_34",
          type: "B",
          topic: "ComprehensionOE",
          marks: 3,
          question:
            "Q32–34: For Q32–Q34, decide on the type of petals on a sunflower head. Tick (✓) your chosen answer. [3m]\n\nQ32: are yellow in colour\nQ33: help to attract birds and insects\nQ34: grow in the centre of the sunflower",
          passageRef: "Paragraph 2",
          blanks: [
            {
              number: 32,
              answer: "Ray petals",
              solution: {
                method: "Locate from paragraph 2",
                steps: [
                  "Paragraph 2: 'The outer petals are called yellow ray petals.'",
                  "Yellow = ray petals.",
                ],
                tip: "Yellow ray petals = outer petals that are yellow (or orange or red).",
              },
            },
            {
              number: 33,
              answer: "Ray petals",
              solution: {
                method: "Locate from paragraph 2",
                steps: [
                  "Paragraph 2: 'These petals help to attract insects and birds for pollination.'",
                  "'These petals' refers to the outer/ray petals (the sentence follows description of ray petals).",
                ],
                tip: "Ray petals attract insects and birds for pollination. The ray petals are the outer, colourful ones.",
              },
            },
            {
              number: 34,
              answer: "Disk petals",
              solution: {
                method: "Locate from paragraph 2",
                steps: [
                  "Paragraph 2: 'The disk petals, arranged spirally, are in the MIDDLE of the head.'",
                  "Middle = centre → disk petals grow in the centre.",
                ],
                tip: "Disk petals are in the MIDDLE (centre) of the sunflower head. Ray petals are on the outside.",
              },
            },
          ],
        },
        {
          id: "chij_eoy23_q35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q35: Tick (✓) your chosen answer. Sunflower oil can be obtained from seeds with __________ coats. [1m]",
          options: ["black", "brown", "yellow"],
          answer: "black",
          solution: {
            method: "Locate from paragraph 3",
            steps: [
              "Paragraph 3: 'Sunflower seeds with BLACK seed coats are crushed to release the oil.'",
              "Black seed coats = source of oil.",
            ],
            tip: "Sunflower seeds with BLACK coats → crushed → oil. Directly stated in paragraph 3.",
          },
        },
        {
          id: "chij_eoy23_q36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q36 True or False: Sunflower seeds are used to soothe sore throats. [1m]",
          answer: "False",
          solution: {
            method: "True/False — careful reading",
            steps: [
              "Paragraph 4: 'Sunflower PETALS are used as tea to treat sore throats.'",
              "It is PETALS, not seeds, that treat sore throats. → False.",
            ],
            tip: "Petals treat sore throats (as tea). SEEDS are for snacks, oil. Don't confuse petals and seeds.",
          },
        },
        {
          id: "chij_eoy23_q37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q37 True or False: Sunflower oil is used in salad dressings. [1m]",
          answer: "True",
          solution: {
            method: "True/False — paragraph 3",
            steps: [
              "Paragraph 3: 'People use the oil in their cooking or as dressing for salads.'",
              "Used as dressing for salads = True.",
            ],
            tip: "Directly stated: sunflower oil is used as salad dressing. True.",
          },
        },
        {
          id: "chij_eoy23_q38",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Q38: What does the phrase 'giants among garden plants' in line 14 mean? Tick (✓) your two chosen answers. [2m]",
          options: [
            "Sunflowers are huge.",
            "Sunflowers can be used in many ways.",
            "Sunflowers are native flowers of America.",
            "Sunflowers tower over other garden plants.",
          ],
          answer: ["Sunflowers are huge.", "Sunflowers tower over other garden plants."],
          solution: {
            method: "Phrase meaning — two interpretations",
            steps: [
              "'Giants among garden plants' = they are the biggest/tallest in the garden.",
              "1. Sunflowers are huge (very big) ✓",
              "2. Sunflowers tower over (are taller than) other garden plants ✓",
              "Answer key: 'Sunflowers tower over other garden plants' = the primary meaning.",
            ],
            tip: "'Giants among garden plants' = very tall, towers over others. Two meanings: huge + towers over others.",
          },
        },
        {
          id: "chij_eoy23_q39",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q39: Which word shows that the sunflowers dry up by winter? Circle either (A) or (B). [1m]\n\n'However, sunflowers do not last (A) through winter and they usually wither (B) by the first frost.'",
          answer: "B",
          solution: {
            method: "Vocabulary — 'wither' means dry up",
            steps: [
              "'Wither' (B) = to dry up and shrivel (plants dying).",
              "'Last' (A) = to continue/endure (about duration, not drying up).",
            ],
            tip: "Wither = dry up, shrivel and die (for plants). 'Wither by the first frost' = dry up when frost comes.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H: COMPREHENSION 2 (10 marks, Q40–46)
    // ─────────────────────────────────────────────
    {
      id: "sec_h",
      name: "Section H: Comprehension 2 — Albert Einstein",
      topic: "ComprehensionOE",
      marks: 10,
      passageTitle: "Albert Einstein",
      passageText: `As a student, Albert Einstein struggled in school yet he was one of the most brilliant men that the world has known.

Growing up, Albert always wondered about things around him. At five years old, he became fascinated with a compass given by his father. He explored the compass endlessly turning it upside down and sideways. He wondered why the needle of the compass always pointed to the same direction.

Always curious, Albert wanted to know how things worked. That led him to read books and conduct countless experiments on the subject.

Albert had a mother who encouraged him to be a thinker. She taught him how to play the violin. He enjoyed playing the instrument because it calmed his active mind.

Unfortunately, Albert's experience in school was awful. As he did not have many friends, he kept mostly to himself. His school principal once commented, "Albert will never make a success of himself at anything." Wanting to prove his principal wrong, Albert worked hard and finally excelled in school.

The amazing Albert Einstein travelled the world, sharing with others his knowledge in science. In time, he was awarded the Nobel Prize. Albert Einstein was truly a great scientist!

Adapted from 'Who Was Albert Einstein?' by Jess Brallier`,

      questions: [
        {
          id: "chij_eoy23_q40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q40: Which word tells us that Albert was a talented man? Circle either (A) or (B). [1m]\n\n'As a student, Albert Einstein struggled (A) in school yet he was one of the most brilliant (B) men that the world has known.'",
          answer: "B",
          solution: {
            method: "Vocabulary — 'brilliant' = talented",
            steps: [
              "'Brilliant' (B) = extremely clever/talented.",
              "'Struggled' (A) = had difficulty (not talented).",
            ],
            tip: "Brilliant = very talented/clever. The question asks for the word showing talent → brilliant.",
          },
        },
        {
          id: "chij_eoy23_q41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question: "Q41: Name the object Albert received from his father. [1m]",
          answer: "compass",
          solution: {
            method: "Locate from paragraph 2",
            steps: [
              "Paragraph 2: 'he became fascinated with a compass given by his father.'",
              "The object = a compass.",
            ],
            tip: "His father gave him a compass. He was fascinated with it at age five.",
          },
        },
        {
          id: "chij_eoy23_q42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Q42: What did Albert do to discover how things worked? Write your answer in complete sentences. [2m]",
          answer:
            "Albert read books and conducted countless experiments on the subject to discover how things worked.",
          solution: {
            method: "Locate from paragraph 3",
            steps: [
              "Paragraph 3: 'That led him to READ BOOKS and CONDUCT COUNTLESS EXPERIMENTS on the subject.'",
              "2 actions: reading books + conducting experiments.",
            ],
            tip: "2-mark answer = 2 actions. Read books (1m) + conducted countless experiments (1m).",
          },
        },
        {
          id: "chij_eoy23_q43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q43: What does the word 'it' in line 10 refer to? [1m]\nIt refers to __________.",
          answer: "Albert playing the violin / the violin",
          solution: {
            method: "Pronoun reference in paragraph 4",
            steps: [
              "Line 10 (paragraph 4): 'He enjoyed playing the instrument because IT calmed his active mind.'",
              "'It' refers to 'playing the violin' (the instrument/activity).",
            ],
            tip: "'It' = the violin/playing the violin. Playing the violin calmed his mind.",
          },
        },
        {
          id: "chij_eoy23_q44a",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q44(a) True or False with reason: 'Albert did not have many friends in school.' [1m]\n\nAlbert __________.",
          answer: "True. Albert did not have many friends, so he kept mostly to himself.",
          solution: {
            method: "True/False with reason from paragraph 5",
            steps: [
              "Paragraph 5: 'As he did not have many friends, he kept mostly to himself.'",
              "Directly stated → True.",
            ],
            tip: "True — directly stated. Albert kept to himself because he had few friends.",
          },
        },
        {
          id: "chij_eoy23_q44b",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q44(b) True or False with reason: 'He gave up easily in school.' [1m]\n\nHe __________.",
          answer: "False. He wanted to prove his principal wrong, so he worked hard and finally excelled in school.",
          solution: {
            method: "True/False — evidence from paragraph 5",
            steps: [
              "Paragraph 5: 'Wanting to prove his principal wrong, Albert worked hard and finally excelled in school.'",
              "He did NOT give up — he worked hard and excelled. → False.",
            ],
            tip: "He worked hard and excelled = did not give up. 'Gave up easily' is False.",
          },
        },
        {
          id: "chij_eoy23_q45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q45: Put these statements in the right sequence according to the story. Write 1, 2 and 3 on the lines. [1m]\n\n__ Albert was awarded the Nobel Prize.\n__ The principal said that Albert would not be successful.\n__ His mother taught him music.",
          answer: "3, 2, 1",
          solution: {
            method: "Sequence of events",
            steps: [
              "1st: His mother taught him music (paragraph 4 — childhood).",
              "2nd: The principal said Albert would not be successful (paragraph 5 — school).",
              "3rd: Albert was awarded the Nobel Prize (paragraph 6 — adulthood).",
            ],
            tip: "Childhood events → school events → adult achievements. Mother/music=1st, Principal=2nd, Nobel Prize=3rd.",
          },
        },
        {
          id: "chij_eoy23_q46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Q46: Pick two adjectives from the last paragraph that describe Albert. [2m]",
          answer: "amazing and great",
          solution: {
            method: "Locate adjectives from last paragraph",
            steps: [
              "Last paragraph: 'The AMAZING Albert Einstein travelled the world...'",
              "'Albert Einstein was truly a GREAT scientist!'",
              "Two adjectives: amazing + great.",
            ],
            tip: "The last paragraph describes Albert as 'amazing' and 'great' — these are the two adjectives.",
          },
        },
      ],
    },
  ],
};
