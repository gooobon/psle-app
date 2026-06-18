// src/data/p3/english/papers/eoy_redswastika_p2_2022.ts
// Red Swastika School — P3 English Language EOY 2022 (Paper 2)
// Language Use and Comprehension — 42 Questions, 50 Marks
// Sections: A Vocab MCQ, B Grammar MCQ, C Visual Text MCQ,
//           D Grammar Cloze (prepositions), E Grammar Cloze (verb tenses),
//           F Editing, G Synthesis, H Comprehension Cloze, I Comprehension OE

import { PaperSet } from "../../types";

const eoy_redswastika_p2_2022: PaperSet = {
  id: "eoy_redswastika_p2_2022",
  school: "Red Swastika School",
  schoolCode: "redswastika",
  level: "P3",
  subject: "English",
  paperType: "EOY",
  year: 2022,
  paper: 2,
  totalMarks: 50,
  sections: [
    // ─────────────────────────────────────────────
    // Section A: Vocabulary MCQ (Q1–Q6, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secA",
      sectionLabel: "Section A: Vocabulary",
      topic: "VocabMCQ",
      instructions:
        "Choose the correct answer and shade its number on the OAS provided.",
      marks: 6,
      questions: [
        {
          id: "rsw22_A1",
          type: "A",
          qNumber: 1,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The children squealed in delight as they were __________ to go on a trip.",
          options: ["sad", "bored", "animated", "excited"],
          answer: 4,
          answerText: "excited",
          solution: {
            method: "Context — Emotional State",
            steps: [
              "'Squealed in delight' = made happy, high-pitched sounds of joy.",
              "Squealing with delight = being very excited/happy.",
              "(1) sad and (2) bored are negative emotions, opposite of delight.",
              "(3) 'animated' = lively/energetic — possible but 'excited' more precisely captures the emotion of going on a trip.",
              "'Excited' = feeling eager anticipation. ✓",
            ],
            tip: "'Squeal in delight' + going on a trip = excited. Excited is the most precise word for anticipatory joy.",
          },
        },
        {
          id: "rsw22_A2",
          type: "A",
          qNumber: 2,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Peering through the __________, I could identify the bird on that tree from a distance.",
          options: ["periscope", "goggles", "binoculars", "microscope"],
          answer: 3,
          answerText: "binoculars",
          solution: {
            method: "Instrument — Purpose",
            steps: [
              "Key: 'identify the bird FROM A DISTANCE' = seeing something far away.",
              "'Binoculars' = optical instrument for seeing things far away, using both eyes.",
              "(1) periscope = used in submarines to see above water surface; (2) goggles = protective eyewear for swimming/skiing; (4) microscope = for seeing very tiny things up close.",
              "Only binoculars are used for viewing distant objects (like birds on trees).",
            ],
            tip: "Binoculars = see far. Microscope = see tiny. Periscope = see around corners/above water. Remember: 'bi' = two (two eyes).",
          },
        },
        {
          id: "rsw22_A3",
          type: "A",
          qNumber: 3,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Jason __________ his head in agreement to the suggestion given.",
          options: ["shook", "turned", "nodded", "scratched"],
          answer: 3,
          answerText: "nodded",
          solution: {
            method: "Verb of Body Movement",
            steps: [
              "Key: 'in agreement' = saying yes.",
              "'Nodded' = moved the head up and down to show agreement.",
              "(1) 'shook his head' = moved side to side = disagreement (opposite!).",
              "(2) 'turned his head' = looked in a direction, no agreement implied.",
              "(4) 'scratched his head' = confusion/puzzlement.",
            ],
            tip: "Nod = agree (head up and down). Shake head = disagree (head side to side). Scratch head = confused.",
          },
        },
        {
          id: "rsw22_A4",
          type: "A",
          qNumber: 4,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Ruth was scared and ran around the dimly lit room, __________ searching for a way out.",
          options: ["calmly", "generously", "desperately", "accidentally"],
          answer: 3,
          answerText: "desperately",
          solution: {
            method: "Adverb of Manner — Context",
            steps: [
              "Ruth was SCARED in a dark room and searching for a way out.",
              "Someone scared and trapped would search frantically and urgently.",
              "'Desperately' = with great urgency/anxiety, as a last resort.",
              "(1) 'calmly' = opposite of scared; (2) 'generously' = unrelated; (4) 'accidentally' = not on purpose, but she IS trying to find a way out.",
            ],
            tip: "Scared + trapped + searching = desperately. 'Desperately' implies urgency and fear.",
          },
        },
        {
          id: "rsw22_A5",
          type: "A",
          qNumber: 5,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The __________ arrived at the scene of the crime and began investigating the robbery.",
          options: ["culprit", "witness", "suspect", "detective"],
          answer: 4,
          answerText: "detective",
          solution: {
            method: "Precise Noun — Role",
            steps: [
              "Who arrives at a crime scene and INVESTIGATES? → a detective.",
              "'Detective' = a police officer whose job is to investigate crimes.",
              "(1) 'culprit' = the person who committed the crime; (2) 'witness' = someone who saw the crime; (3) 'suspect' = someone thought to have committed the crime.",
              "Only a detective investigates crimes at the scene.",
            ],
            tip: "Detective = investigates crime. Culprit = did it. Suspect = might have done it. Witness = saw it.",
          },
        },
        {
          id: "rsw22_A6",
          type: "A",
          qNumber: 6,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Timmy is a __________ boy. You can trust him to complete his work.",
          options: ["helpful", "polite", "reliable", "respectful"],
          answer: 3,
          answerText: "reliable",
          solution: {
            method: "Precise Adjective — Context Fit",
            steps: [
              "Key clue: 'You can TRUST him to complete his work.'",
              "'Reliable' = trustworthy, dependable — someone you can count on to do what they say.",
              "(1) 'helpful' = willing to assist; (2) 'polite' = well-mannered; (4) 'respectful' = showing respect.",
              "Only 'reliable' directly means someone who can be trusted/depended upon.",
            ],
            tip: "'You can trust him' = he is reliable/dependable. 'Reliable' = can be counted on.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section B: Grammar MCQ (Q7–Q14, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secB",
      sectionLabel: "Section B: Grammar",
      topic: "GrammarMCQ",
      instructions:
        "Choose the correct answer and shade its number on the OAS provided.",
      marks: 8,
      questions: [
        {
          id: "rsw22_B7",
          type: "A",
          qNumber: 7,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Sally was waiting __________ the car as it was raining outside.",
          options: ["in", "on", "by", "with"],
          answer: 1,
          answerText: "in",
          solution: {
            method: "Prepositions — Inside a Vehicle",
            steps: [
              "Sally was sheltering from rain by being inside a car.",
              "For enclosed vehicles (cars, buses, trains) = 'in': 'in the car', 'in the bus'.",
              "Exception: open vehicles or large vessels = 'on': 'on the bus/train' is also common in British English, but 'in the car' is standard for cars.",
              "(3) 'by' = beside; (4) 'with' = accompanied by.",
              "'Waiting IN the car' = inside the car. ✓",
            ],
            tip: "'In the car' = inside the car. We sit IN a car (not on it, which implies on top of it).",
          },
        },
        {
          id: "rsw22_B8",
          type: "A",
          qNumber: 8,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The competitors __________ to the referee's instructions right now.",
          options: ["listen", "listened", "are listening", "is listening"],
          answer: 3,
          answerText: "are listening",
          solution: {
            method: "Present Continuous — Action Happening Now",
            steps: [
              "Key phrase: 'right now' = action happening at this very moment.",
              "Present continuous = is/am/are + verb-ing.",
              "Subject: 'The competitors' = plural → 'are listening'.",
              "(1) 'listen' = habitual present; (2) 'listened' = past; (4) 'is listening' = singular subject.",
            ],
            tip: "'Right now' = present continuous. Plural subject 'competitors' → 'ARE listening'.",
          },
        },
        {
          id: "rsw22_B9",
          type: "A",
          qNumber: 9,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Despite her young age, Kelly is patient __________ wise.",
          options: ["or", "but", "and", "because"],
          answer: 3,
          answerText: "and",
          solution: {
            method: "Conjunctions — Additive",
            steps: [
              "The sentence lists two positive qualities: patient AND wise.",
              "'And' = additive conjunction joining two similar/parallel items.",
              "(1) 'or' = alternative/choice; (2) 'but' = contrast; (4) 'because' = reason.",
              "Both qualities are positive and go together → 'and'.",
            ],
            tip: "'Patient AND wise' = two qualities listed together. 'And' joins positive, parallel items.",
          },
        },
        {
          id: "rsw22_B10",
          type: "A",
          qNumber: 10,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Ben only ate __________ bread for dinner as he had a late lunch.",
          options: ["any", "none", "much", "some"],
          answer: 4,
          answerText: "some",
          solution: {
            method: "Quantifiers — Affirmative Context",
            steps: [
              "'Bread' = uncountable noun.",
              "In affirmative sentences with uncountable nouns: 'some' (positive, limited amount).",
              "'Some bread' = a small/limited amount of bread. ✓",
              "(1) 'any' = used in questions/negatives ('Did he eat any bread?'); (2) 'none' = zero quantity, but 'ate none' would mean he ate nothing; (3) 'much' = large quantity, contradicts 'only ate' (small amount).",
              "'Only ate SOME bread' = just a little bit. ✓",
            ],
            tip: "In positive sentences, use 'some' for limited amounts: 'I ate some bread.' 'Any' is for questions/negatives.",
          },
        },
        {
          id: "rsw22_B11",
          type: "A",
          qNumber: 11,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Isn\'t __________ ball across the street yours?" Father asked me.',
          options: ["this", "that", "these", "those"],
          answer: 2,
          answerText: "that",
          solution: {
            method: "Demonstrative Adjectives — Distance",
            steps: [
              "'Across the street' = far from the speaker.",
              "Far + singular noun ('ball') → 'that'.",
              "(1) 'this' = near + singular; (3) 'these' = near + plural; (4) 'those' = far + plural.",
              "One ball, across the street (far) → 'that ball'.",
            ],
            tip: "This/these = near. That/those = far. 'Across the street' = far → 'that'. One ball = singular → 'that'.",
          },
        },
        {
          id: "rsw22_B12",
          type: "A",
          qNumber: 12,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Henry's parents gave his sister and __________ a pen each.",
          options: ["he", "him", "his", "they"],
          answer: 2,
          answerText: "him",
          solution: {
            method: "Object Pronouns",
            steps: [
              "'Gave his sister and ___' — the pronoun is the OBJECT of 'gave'.",
              "Object position after a verb → use object pronoun.",
              "Henry (male, singular) → object pronoun = 'him'.",
              "(1) 'he' = subject pronoun; (3) 'his' = possessive; (4) 'they' = subject plural.",
            ],
            tip: "After 'give/told/showed + someone AND ___', use object pronoun: him/her/them/me. 'Gave him' not 'gave he'.",
          },
        },
        {
          id: "rsw22_B13",
          type: "A",
          qNumber: 13,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The birds were quiet, __________?",
          options: ["are they", "aren't they", "were they", "weren't they"],
          answer: 4,
          answerText: "weren't they",
          solution: {
            method: "Question Tags — Past Tense",
            steps: [
              "Main clause: 'The birds WERE quiet' — auxiliary verb is 'were' (past tense).",
              "Question tag = negate the same auxiliary: WERE → WEREN'T.",
              "Subject: 'the birds' (plural) → 'they'.",
              "Tag: 'weren't they?' ✓",
              "(1) 'are they' and (2) 'aren't they' = present tense, wrong.",
            ],
            tip: "Question tag uses the SAME tense as the main verb. 'WERE quiet' → 'WEREN'T they?'",
          },
        },
        {
          id: "rsw22_B14",
          type: "A",
          qNumber: 14,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "I __________ the dentist annually as I want healthy teeth and gums.",
          options: ["visit", "visits", "visited", "was visiting"],
          answer: 1,
          answerText: "visit",
          solution: {
            method: "Simple Present — Habitual Action",
            steps: [
              "'Annually' = every year = a habitual/regular action.",
              "Habitual present = simple present tense.",
              "Subject: 'I' → base verb: 'visit' (no -s).",
              "(2) 'visits' = 3rd person singular; (3) 'visited' = past; (4) 'was visiting' = past continuous.",
            ],
            tip: "'Annually/every year' = habit → simple present. 'I' + present = base verb 'visit' (not 'visits').",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section C: Visual Text Comprehension (Q15–Q18, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secC",
      sectionLabel: "Section C: Visual Text Comprehension",
      topic: "VisualText",
      instructions:
        "Read the poster carefully and answer the questions that follow. Choose the correct answer and shade its number on the OAS provided.",
      marks: 8,
      visualText: {
        title: "Learning to Make Beautiful Gifts",
        type: "Poster/Flyer",
        content: {
          presenter: "Gem Art School presents",
          mainTitle: "Learning to Make Beautiful Gifts",
          tagline: "A 2-day art course for children ages 6 to 12! Back by popular demand!",
          courseFee: "$40",
          sessions: [
            { session: "A", dates: "3 and 4 Dec", days: "Sat and Sun", time: "9 a.m. to 12 p.m." },
            { session: "B", dates: "10 and 11 Dec", days: "Sat and Sun", time: "1 p.m. to 4 p.m." },
            { session: "C", dates: "12 and 13 Dec", days: "Mon and Tue", time: "9 a.m. to 12 p.m." },
            { session: "D", dates: "19 and 20 Dec", days: "Mon and Tue", time: "1 p.m. to 4 p.m." },
          ],
          contact: "Visit our website at www.gem.sg for more information. Call 63216321 if you have further questions.",
          registration: "To register, pop by our school to complete an application form and make payment.",
          artContest: {
            title: "Art Contest 2022",
            details: "In addition, students who have completed any of Gem Art School's courses may enter the annual art contest. Details coming soon!",
            prizeSponsors: ["Value Art Supplies", "Local Art Society", "Sparkle Art Shop"],
          },
        },
      },
      questions: [
        {
          id: "rsw22_C15",
          type: "A",
          qNumber: 15,
          topic: "VisualText",
          marks: 2,
          question:
            "To attend the art course, Raju must register __________.",
          options: [
            "on a website.",
            "at the art school.",
            "through the phone.",
            "at Local Art Society.",
          ],
          answer: 2,
          answerText: "at the art school.",
          solution: {
            method: "Literal — Registration Method",
            steps: [
              "Poster states: 'To register, pop by our school to complete an application form and make payment.'",
              "'Pop by our school' = visit the school in person.",
              "(1) website = for information only ('Visit our website for more information'); (3) phone = for questions ('Call 63216321 if you have further questions'); (4) Local Art Society = a prize sponsor, not the registration venue.",
            ],
            tip: "Read the registration instruction carefully: 'pop by our school' = go to the school in person.",
          },
        },
        {
          id: "rsw22_C16",
          type: "A",
          qNumber: 16,
          topic: "VisualText",
          marks: 2,
          question:
            "Ariel wants to attend the art course over a weekend. If she prefers to have lunch first, she should sign up for __________.",
          options: ["Session A", "Session B", "Session C", "Session D"],
          answer: 2,
          answerText: "Session B",
          solution: {
            method: "Inference from Table",
            steps: [
              "Condition 1: over a weekend = Saturday and Sunday.",
              "Weekend sessions: Session A (Sat & Sun, 9am–12pm) and Session B (Sat & Sun, 1pm–4pm).",
              "Condition 2: have lunch first → she eats lunch before attending = afternoon session.",
              "Session B starts at 1 p.m. — after lunch. ✓",
              "Session A starts at 9 a.m. — before lunch.",
            ],
            tip: "Two conditions: (1) weekend = Sat/Sun → A or B; (2) after lunch = afternoon → 1pm start = Session B.",
          },
        },
        {
          id: "rsw22_C17",
          type: "A",
          qNumber: 17,
          topic: "VisualText",
          marks: 2,
          question:
            "__________ is NOT a sponsor of the prizes for the contest.",
          options: [
            "Gem Art School",
            "Local Art Society",
            "Sparkle Art Shop",
            "Value Art Supplies",
          ],
          answer: 1,
          answerText: "Gem Art School",
          solution: {
            method: "Literal — Prize Sponsors",
            steps: [
              "Prize sponsors listed: Value Art Supplies, Local Art Society, Sparkle Art Shop.",
              "Gem Art School = the ORGANISER of the course and contest, not a sponsor.",
              "The contest is run BY Gem Art School; the prizes are sponsored by the other three companies.",
            ],
            tip: "Gem Art School organises the contest — it doesn't sponsor the prizes. The 3 sponsors are Value Art Supplies, Local Art Society, Sparkle Art Shop.",
          },
        },
        {
          id: "rsw22_C18",
          type: "A",
          qNumber: 18,
          topic: "VisualText",
          marks: 2,
          question:
            "What is the main purpose of the poster?",
          options: [
            "to attract participants for a contest.",
            "to encourage children to make gifts.",
            "to promote an art course for children.",
            "to present information on an art school.",
          ],
          answer: 3,
          answerText: "to promote an art course for children.",
          solution: {
            method: "Main Purpose of Visual Text",
            steps: [
              "The poster's MAIN content: 'Learning to Make Beautiful Gifts — A 2-day art course for children ages 6 to 12!'",
              "Most of the poster details the sessions, fees, and registration for the art course.",
              "(1) the art contest is secondary/additional; (2) encouraging gift-making is what the COURSE does, not the poster's main purpose; (4) Gem Art School is the organiser but presenting the school is not the main aim.",
              "Primary purpose = promote/advertise the art course. ✓",
            ],
            tip: "Main purpose = what takes up MOST of the poster. The course details dominate → promoting the art course.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section D: Grammar Cloze — Prepositions (Q19–Q22, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secD",
      sectionLabel: "Section D: Grammar Cloze (Prepositions)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box below and write its letter (A to F) in each blank. Use each word ONLY ONCE.",
      marks: 4,
      passage: {
        title: "Jane's Badminton Passion",
        wordBank: [
          { letter: "A", word: "at" },
          { letter: "B", word: "for" },
          { letter: "C", word: "in" },
          { letter: "D", word: "with" },
          { letter: "E", word: "under" },
          { letter: "F", word: "through" },
        ],
        text: "Jane loves to play badminton. She has been interested (19) ______ the sport for a long time. Having won many competitions, she has a huge collection of trophies, proudly displayed (20) ______ home. Every weekend, she would train (21) ______ her sister and then they would visit the bookstore to buy badminton magazines. Jane keeps her large collection of magazines (22) ______ her bed. She hopes to be featured on the cover of the same magazine one day.",
      },
      questions: [
        {
          id: "rsw22_D19",
          type: "A",
          qNumber: 19,
          topic: "GrammarCloze",
          marks: 1,
          question: "She has been interested (19) ______ the sport for a long time.",
          answer: "C",
          answerText: "in",
          solution: {
            method: "Fixed Collocation — Adjective + Preposition",
            steps: [
              "'Interested IN' is a fixed collocation.",
              "'Interested in something' = having interest in something.",
              "You are always 'interested IN' a subject/topic/sport.",
            ],
            tip: "'Interested in' is a fixed phrase. Always 'interested IN badminton/science/music'.",
          },
        },
        {
          id: "rsw22_D20",
          type: "A",
          qNumber: 20,
          topic: "GrammarCloze",
          marks: 1,
          question: "she has a huge collection of trophies, proudly displayed (20) ______ home.",
          answer: "A",
          answerText: "at",
          solution: {
            method: "Preposition of Location",
            steps: [
              "'Displayed AT home' = shown/exhibited at her home.",
              "'At home' is the standard expression for being/doing something at one's residence.",
              "Compare: 'at school', 'at work', 'at home'.",
            ],
            tip: "'At home' is a fixed phrase. You display trophies AT home. 'In home' is incorrect.",
          },
        },
        {
          id: "rsw22_D21",
          type: "A",
          qNumber: 21,
          topic: "GrammarCloze",
          marks: 1,
          question: "she would train (21) ______ her sister.",
          answer: "D",
          answerText: "with",
          solution: {
            method: "Preposition of Accompaniment",
            steps: [
              "Jane and her sister trained together.",
              "'Train WITH someone' = train together, accompanied by that person.",
              "'With' shows accompaniment/togetherness.",
            ],
            tip: "'Train with' = train together. 'With' indicates doing something together with another person.",
          },
        },
        {
          id: "rsw22_D22",
          type: "A",
          qNumber: 22,
          topic: "GrammarCloze",
          marks: 1,
          question: "Jane keeps her large collection of magazines (22) ______ her bed.",
          answer: "E",
          answerText: "under",
          solution: {
            method: "Preposition of Location",
            steps: [
              "Common storage place for magazines/books = under the bed.",
              "'Under her bed' = in the space beneath the bed.",
              "Context: a large collection stored at home → 'under the bed' is a natural storage location.",
            ],
            tip: "'Under the bed' is a common storage place. 'Under' = directly below something.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section E: Grammar Cloze — Verb Tenses (Q23–Q26, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secE",
      sectionLabel: "Section E: Grammar Cloze (Verb Tenses)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box below and write its letter (A to F) in each blank. Use each word ONLY ONCE.",
      marks: 4,
      passage: {
        title: "A Trip to the Theatre",
        wordBank: [
          { letter: "A", word: "watch" },
          { letter: "B", word: "watches" },
          { letter: "C", word: "watched" },
          { letter: "D", word: "will watch" },
          { letter: "E", word: "were watching" },
          { letter: "F", word: "watching" },
        ],
        text: "Last weekend, my parents brought me to the theatre. The last time I (23) ______ a play was five years ago. After (24) ______ the performance, I begged my parents to bring me for more plays in the future. \"Sure, we'll keep a lookout for performances that we can (25) ______ together. We were observing you and were surprised by how keenly you (26) ______ the show!\" exclaimed my parents. I was over the moon when I heard that.",
      },
      questions: [
        {
          id: "rsw22_E23",
          type: "A",
          qNumber: 23,
          topic: "GrammarCloze",
          marks: 1,
          question: "The last time I (23) ______ a play was five years ago.",
          answer: "C",
          answerText: "watched",
          solution: {
            method: "Simple Past — Specific Past Time",
            steps: [
              "Time marker: 'five years ago' = a specific past point in time.",
              "Simple past = action completed at a specific point in the past.",
              "'I watched a play' five years ago. ✓",
              "The structure 'the last time I ___ was' + time marker → simple past.",
            ],
            tip: "'Five years ago' = simple past. 'The last time I WATCHED' = simple past for a completed past action.",
          },
        },
        {
          id: "rsw22_E24",
          type: "A",
          qNumber: 24,
          topic: "GrammarCloze",
          marks: 1,
          question: "After (24) ______ the performance, I begged my parents.",
          answer: "F",
          answerText: "watching",
          solution: {
            method: "Gerund after Preposition",
            steps: [
              "'After' is a preposition here, followed by a gerund (verb + -ing).",
              "Rule: after/before/by/without + verb-ing (gerund).",
              "'After watching the performance' = after the performance was over.",
            ],
            tip: "After + gerund (-ing). 'After watching', 'after eating', 'after finishing'. Preposition + verb-ing.",
          },
        },
        {
          id: "rsw22_E25",
          type: "A",
          qNumber: 25,
          topic: "GrammarCloze",
          marks: 1,
          question: "\"we'll keep a lookout for performances that we can (25) ______ together.\"",
          answer: "A",
          answerText: "watch",
          solution: {
            method: "Modal Verb + Base Form",
            steps: [
              "'can ___' = modal verb 'can' + BASE form of the main verb.",
              "Base form of 'watch' = 'watch' (no -s, no -ing, no -ed).",
              "'We can watch together' = we are able to watch together. ✓",
            ],
            tip: "Modal verbs (can/will/must/should) are always followed by the BASE form: 'can watch', not 'can watches' or 'can watched'.",
          },
        },
        {
          id: "rsw22_E26",
          type: "A",
          qNumber: 26,
          topic: "GrammarCloze",
          marks: 1,
          question: "\"We were observing you and were surprised by how keenly you (26) ______ the show!\"",
          answer: "E",
          answerText: "were watching",
          solution: {
            method: "Past Continuous — Parallel Action",
            steps: [
              "'We WERE observing you' — past continuous.",
              "'How keenly you ___ the show' — another ongoing past action happening at the same time.",
              "Parallel past continuous actions: 'were observing' (parents) while 'were watching' (child).",
              "Past continuous for two simultaneous ongoing actions in the past.",
            ],
            tip: "When two actions happened simultaneously in the past, both use past continuous: 'were observing' + 'were watching'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section F: Editing (Q27–Q30, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secF",
      sectionLabel: "Section F: Editing",
      topic: "Editing",
      instructions:
        "Read the passage carefully. Correct each word in bold for spelling. Correct each word in italics and underlined for punctuation.",
      marks: 4,
      passage: {
        title: "The Legend of Pulau Ubin",
        source: "Adapted from: Pulau Ubin by http://www.consumer.sg/",
        text: "There is a famous fable explaining how the island, Pulau Ubin, was formed. A pig, a frog and an elephant took part in a spactacular (27) race from Singapore to malaysia (28). They were told that they would turn into rocks if they could not complete the race. All three animals strugeled (29) during the race and could not complete it. the (30) elephant and the pig turned into giant rocks which joined together to become the island of Pulau Ubin. The frog turned into a rock that formed Pulau Sekudu, a small island beside Pulau Ubin.",
      },
      questions: [
        {
          id: "rsw22_F27",
          type: "A",
          qNumber: 27,
          topic: "Editing",
          marks: 1,
          question: "spactacular (spelling error)",
          errorWord: "spactacular",
          answer: "spectacular",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Spactacular' is a misspelling.",
              "Correct spelling: s-p-e-c-t-a-c-u-l-a-r.",
              "Root: 'spectacle' + -ar → spectacular. The vowel in the second syllable is 'e' not 'a'.",
            ],
            tip: "Spectacular = spec-TAC-u-lar. Think of 'spectacle' → spectacular. 'spec' not 'spac'.",
          },
        },
        {
          id: "rsw22_F28",
          type: "A",
          qNumber: 28,
          topic: "Editing",
          marks: 1,
          question: "malaysia (punctuation — capitalisation error)",
          errorWord: "malaysia",
          answer: "Malaysia",
          solution: {
            method: "Punctuation — Capitalisation of Proper Nouns",
            steps: [
              "'malaysia' is a proper noun (name of a country).",
              "All proper nouns (names of countries, cities, people) must be capitalised.",
              "Correct: 'Malaysia' (capital M).",
            ],
            tip: "Countries, cities, and names of people are ALWAYS capitalised in English. Malaysia, Singapore, John, etc.",
          },
        },
        {
          id: "rsw22_F29",
          type: "A",
          qNumber: 29,
          topic: "Editing",
          marks: 1,
          question: "strugeled (spelling error)",
          errorWord: "strugeled",
          answer: "struggled",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Strugeled' is a misspelling — missing a 'g' and wrong suffix.",
              "Correct spelling: s-t-r-u-g-g-l-e-d.",
              "Root verb: 'struggle' → past tense: 'struggled'. Note double 'g' in 'struggle'.",
            ],
            tip: "Struggle → struggled. Double 'g' in the middle: strug-gle-d. Common error: 'strugeled' (one g, wrong ending).",
          },
        },
        {
          id: "rsw22_F30",
          type: "A",
          qNumber: 30,
          topic: "Editing",
          marks: 1,
          question: "the (punctuation — capitalisation error at start of sentence)",
          errorWord: "the",
          answer: "The",
          solution: {
            method: "Punctuation — Capitalisation at Start of Sentence",
            steps: [
              "After a full stop (end of the previous sentence), the next word must start with a capital letter.",
              "'the elephant' starts a new sentence → 'The' must be capitalised.",
              "Every sentence begins with a capital letter.",
            ],
            tip: "Every new sentence must begin with a capital letter. After a full stop: The/A/It (capital). 'the' (lowercase) at the start of a sentence is always wrong.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section G: Synthesis (Q31–Q32, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secG",
      sectionLabel: "Section G: Synthesis",
      topic: "SentenceCombining",
      instructions:
        "For each question from 31 and 32, combine the sentences to make one sentence using the word(s) given. The meaning of the sentence must be the same as the sentences given.",
      marks: 4,
      questions: [
        {
          id: "rsw22_G31",
          type: "A",
          qNumber: 31,
          topic: "SentenceCombining",
          marks: 2,
          question:
            "Zhi Hao wants to pass the test. He studies every day.\n\nRewrite using: so as to",
          answer: "Zhi Hao studies every day so as to pass the test.",
          solution: {
            method: "Sentence Combining with 'so as to' (Purpose)",
            steps: [
              "'So as to' = in order to = expressing purpose.",
              "Purpose: pass the test.",
              "Action (means to achieve purpose): studies every day.",
              "Structure: [Action] so as to [purpose].",
              "'Zhi Hao studies every day so as to pass the test.' ✓",
              "Note: 'so as to' is always followed by a BASE VERB (infinitive without 'to').",
            ],
            tip: "'So as to' = in order to. Always followed by base verb: 'so as to pass', 'so as to win'. Action first, then 'so as to' + purpose.",
          },
        },
        {
          id: "rsw22_G32",
          type: "A",
          qNumber: 32,
          topic: "SentenceCombining",
          marks: 2,
          question:
            "The children do not like listening to music. They prefer watching a movie.\n\nRewrite using: would rather … than",
          answer: "The children would rather watch a movie than listen to music.",
          solution: {
            method: "Sentence Combining with 'would rather … than'",
            steps: [
              "'Would rather X than Y' = prefer X over Y.",
              "They prefer watching a movie → X = watch a movie.",
              "They don't like listening to music → Y = listen to music.",
              "Structure: [Subject] would rather [base verb X] than [base verb Y].",
              "'The children would rather watch a movie than listen to music.'",
              "Note: Both verbs after 'rather' and 'than' must be in BASE form.",
            ],
            tip: "'Would rather A than B' = prefer A over B. Both A and B use BASE form: 'watch' and 'listen' (not 'watching'/'listening').",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section H: Comprehension Cloze (Q33–Q36, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secH",
      sectionLabel: "Section H: Comprehension Cloze",
      topic: "VocabCloze",
      instructions:
        "Read the passage and fill in each blank with a suitable word.",
      marks: 4,
      passage: {
        title: "Jacob and the Cat",
        source: "Adapted from: The Man and the Cat by Aesop at www.momjunction.com/",
        text: "Jacob was trying to help a cat that was stuck in the tree. Whenever he (33) ______ his hands out, the cat got scared (34) ______ scratched him. After a while, his hands were (35) ______ scratched. A passerby said, \"You (36) ______ leave it alone. The cat will find a way later.\" Jacob told the passerby, \"The cat is an animal and its instinct makes it scratch others. I am human and my instinct makes me compassionate.\"",
      },
      questions: [
        {
          id: "rsw22_H33",
          type: "A",
          qNumber: 33,
          topic: "VocabCloze",
          marks: 1,
          question: "Whenever he (33) ______ his hands out, the cat got scared.",
          answer: "reached",
          solution: {
            method: "Context Verb",
            steps: [
              "Jacob was trying to help a cat stuck in a tree.",
              "He extended/stretched his hands toward the cat to reach it.",
              "'Reached his hands out' = extended/stretched out his hands toward something.",
              "Past tense context → 'reached'.",
            ],
            tip: "'Reach out' = extend/stretch toward something. 'He reached his hands out' = he stretched his arms toward the cat.",
          },
        },
        {
          id: "rsw22_H34",
          type: "A",
          qNumber: 34,
          topic: "VocabCloze",
          marks: 1,
          question: "the cat got scared (34) ______ scratched him.",
          answer: "and",
          solution: {
            method: "Conjunction — Sequential Actions",
            steps: [
              "Two actions: (1) the cat got scared, (2) the cat scratched him.",
              "Both actions happened — they are additive/sequential.",
              "'And' joins two actions that both occurred.",
              "The cat got scared AND (then) scratched him.",
            ],
            tip: "'Got scared AND scratched him' = two things that both happened. 'And' joins sequential/additive actions.",
          },
        },
        {
          id: "rsw22_H35",
          type: "A",
          qNumber: 35,
          topic: "VocabCloze",
          marks: 1,
          question: "After a while, his hands were (35) ______ scratched.",
          answer: "painfully",
          solution: {
            method: "Context Adverb",
            steps: [
              "The cat scratched Jacob's hands repeatedly (every time he reached out).",
              "After many scratches, his hands were badly/painfully scratched.",
              "'Painfully scratched' = scratched in a way that caused pain.",
              "Context confirms: the scratching was ongoing and causing injury.",
            ],
            tip: "Being scratched repeatedly by a cat causes pain → 'painfully scratched'. The adverb describes how badly his hands were scratched.",
          },
        },
        {
          id: "rsw22_H36",
          type: "A",
          qNumber: 36,
          topic: "VocabCloze",
          marks: 1,
          question: "A passerby said, \"You (36) ______ leave it alone. The cat will find a way later.\"",
          answer: "must",
          solution: {
            method: "Modal Verb — Advice/Obligation",
            steps: [
              "The passerby is giving advice/instruction to Jacob.",
              "'You ___ leave it alone' = strong advice/suggestion.",
              "'Must' = strong recommendation/obligation: 'You must do this.'",
              "The passerby believes Jacob should stop → 'you must leave it alone'.",
              "Note: 'should' would also be acceptable here.",
            ],
            tip: "'You must leave it alone' = strong advice. 'Must' expresses that something is necessary or very strongly recommended.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section I: Comprehension Open-Ended (Q37–Q42, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "rsw22_secI",
      sectionLabel: "Section I: Comprehension",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer the questions that follow.",
      marks: 8,
      passage: {
        title: "The Miser Man and His Gold",
        source: "Adapted from: The Miser Man and his Gold by Aesop at www.momjunction.com/",
        text: `An old man lived in a house with a garden. He hid his gold coins in a pit under some stones in the garden. Every day, before going to bed, the old man went to the stones and took out the gold. He would count and shine the coins. He would then pile the coins up and admire them. He did this every day, but not once did he spend the gold he saved.

One day, a thief waited for the old man to go back into his house. He had been observing him for some time. After it was dark, the thief went to the hiding place and took the gold. The next day, the old man discovered that his treasure was missing and screamed loudly.

His neighbour heard the cries and rushed over. Feeling concerned, he asked what happened. On learning what had happened, the neighbour asked, "Why didn't you save the money inside the house? It would've been easier to access the money when you had to buy something!"

"Buy?" said the old man. "I never used the gold to buy anything. I was never going to spend it."

On hearing this, the neighbour threw a stone into the pit and said, "If that is the case, save the stone. It is as worthless as the gold you have lost."`,
      },
      questions: [
        {
          id: "rsw22_I37",
          type: "A",
          qNumber: 37,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Where in the garden did the old man hide his gold coins? [1m]",
          answer:
            "He hid his gold coins in a pit under some stones in the garden.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Passage: 'He hid his gold coins in a pit under some stones in the garden.'",
              "Full sentence answer: state WHERE exactly — 'in a pit under some stones'.",
            ],
            tip: "Copy directly from the passage: 'in a pit under some stones in the garden'. Give the full location.",
          },
        },
        {
          id: "rsw22_I38",
          type: "A",
          qNumber: 38,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word has the same meaning as 'stack'? Circle either (A) or (B).\n\nHe would then pile (A) the coins up and admire (B) them.",
          options: ["pile (A)", "admire (B)"],
          answer: 1,
          answerText: "pile (A)",
          solution: {
            method: "Vocabulary — Synonym",
            steps: [
              "'Stack' = arrange items on top of each other in a neat pile.",
              "'Pile' = put things in a heap, one on top of another. = stack. ✓",
              "'Admire' = look at with pleasure/appreciation — not related to 'stack'.",
            ],
            tip: "'Pile' and 'stack' are synonyms — both mean to heap things on top of each other. 'Admire' means to appreciate/look at with wonder.",
          },
        },
        {
          id: "rsw22_I39",
          type: "A",
          qNumber: 39,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Name 2 things the old man would do to the coins after digging them up in his garden. [2m]\ni. _______\nii. _______",
          answer: [
            "i. He would count and shine the coins.",
            "ii. He would pile the coins up and admire them.",
          ],
          solution: {
            method: "Literal — Two Actions",
            steps: [
              "Passage: 'He would count and shine the coins. He would then pile the coins up and admire them.'",
              "Two distinct things: (1) count and shine; (2) pile up and admire.",
              "Each answer = one sentence.",
            ],
            tip: "Two actions explicitly mentioned in the passage: (1) count and shine the coins; (2) pile them up and admire them.",
          },
        },
        {
          id: "rsw22_I40",
          type: "A",
          qNumber: 40,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write down 1, 2 or 3 in the blanks below to show what the thief did first, next and last in paragraph 2. [1m]\n\n___ The thief took the gold in the night.\n___ The thief watched the daily routine of the old man.\n___ The thief waited for the old man to go back to his house.",
          answer: "3 / 1 / 2",
          answerDetail: {
            "The thief took the gold in the night": "3",
            "The thief watched the daily routine of the old man": "1",
            "The thief waited for the old man to go back to his house": "2",
          },
          solution: {
            method: "Sequencing",
            steps: [
              "Paragraph 2: 'One day, a thief waited for the old man to go back into his house. He had been observing him for some time. After it was dark, the thief went to the hiding place and took the gold.'",
              "FIRST: 'He had been observing him for some time' = the thief watched the old man's daily routine.",
              "SECOND: 'a thief waited for the old man to go back into his house' = waited for him to leave.",
              "THIRD: 'After it was dark... took the gold' = stole the gold at night.",
              "Order: Observed (1) → Waited (2) → Took gold (3).",
            ],
            tip: "Note: 'He had been observing' uses past perfect — this means it happened BEFORE the main events. So observation is first.",
          },
        },
        {
          id: "rsw22_I41",
          type: "A",
          qNumber: 41,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "By rushing over to the old man's house, it suggests that the neighbour was __________. Tick the chosen answer. [1m]\nworried / nervous / uninterested",
          options: ["worried", "nervous", "uninterested"],
          answer: 1,
          answerText: "worried",
          solution: {
            method: "Inference — Character Emotion",
            steps: [
              "'His neighbour heard the cries and RUSHED OVER. Feeling CONCERNED, he asked what happened.'",
              "Rushing over + feeling concerned = being worried about the old man.",
              "'Worried' = anxious about someone's wellbeing — matches rushing + concerned.",
              "'Nervous' = anxious about one's own situation; 'uninterested' = opposite of concerned.",
            ],
            tip: "Rushing + feeling concerned = worried about someone. 'Concerned' in the passage is a synonym for 'worried'.",
          },
        },
        {
          id: "rsw22_I42",
          type: "A",
          qNumber: 42,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "What did the neighbour mean when he said that the gold was as worthless as the stone? [2m]",
          answer:
            "The neighbour meant that since the old man never used or spent the gold, it had no practical value to him — just like a stone. Money is only valuable when it is used; if the old man treated the gold the same way he would treat a stone (never spending it), then it was as worthless as a stone.",
          solution: {
            method: "Inferential — Figurative Meaning",
            steps: [
              "The neighbour's argument: 'I never used the gold to buy anything. I was never going to spend it.'",
              "The neighbour's response: threw a stone into the pit = if the gold was never going to be spent, a stone serves the same purpose (nothing).",
              "Meaning: Gold only has VALUE when it is USED/SPENT. If you never spend it, it is no different from a worthless stone.",
              "Full answer must explain: (1) the old man never spent his gold; (2) therefore it had no practical value; (3) like a stone, which also has no monetary value.",
            ],
            tip: "The moral of this Aesop fable: money that is hoarded and never used is as worthless as a stone. Wealth has value only when put to use.",
          },
        },
      ],
    },
  ],
};

export default eoy_redswastika_p2_2022;
