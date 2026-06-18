// ============================================================
// TAO NAN PRIMARY SCHOOL
// 2023 PRIMARY 3 END-OF-YEAR EXAMINATION
// ENGLISH LANGUAGE PAPER 2
// Date: 23 October 2023 | Total: 50 marks | 1h 10min
// Booklet A: 20 marks (Q1–20 MCQ on OAS)
// Booklet B: 30 marks (Q21–43 written)
// Sections A (GrammarMCQ,9) · B (VocabMCQ,6) · C (VisualText,5) ·
//          D (GrammarCloze,4) · E (VocabCloze,4) ·
//          F (SentenceCombining,8) · G (Editing,6) · H (ComprehensionOE,8)
// ============================================================

import { QuestionSet } from "@/types/questions";

export const eoy_taonan_p2_2025: QuestionSet = {
  id: "eoy_taonan_p2_2025",
  school: "Tao Nan Primary School",
  level: "P3",
  subject: "English",
  year: 2023,
  exam: "EOY",
  paper: 2,
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // SECTION A: GRAMMAR MCQ (9 x 1m, Q1–9)
    // ─────────────────────────────────────────────
    {
      id: "sec_a",
      name: "Section A: Grammar",
      topic: "GrammarMCQ",
      marks: 9,
      questions: [
        {
          id: "taonan_eoy23_q1",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "Sally opened her bag to __________ her lunchbox.",
          options: ["find", "finds", "found", "finding"],
          answer: 1,
          solution: {
            method: "Infinitive after 'to' — purpose",
            steps: [
              "'To find' — infinitive expressing purpose ('in order to find').",
              "After 'to' expressing purpose, use the base form of the verb.",
            ],
            tip: "'To + base verb' expresses purpose. Sally opened her bag TO FIND her lunchbox.",
          },
        },
        {
          id: "taonan_eoy23_q2",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "You must walk __________ the stream to reach the train station.",
          options: ["by", "on", "over", "around"],
          answer: 4,
          solution: {
            method: "Preposition of movement",
            steps: [
              "'Walk around the stream' = go the long way around, avoiding crossing it.",
              "'Over' = cross above it; 'by' = near it; 'on' = on top of it.",
              "To 'reach the station', walking around the stream makes sense as an alternative path.",
            ],
            tip: "'Walk around' = go around the obstacle rather than through/over it.",
          },
        },
        {
          id: "taonan_eoy23_q3",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "The basket of apples that Mrs Raju has just bought __________ very sweet.",
          options: ["is", "are", "was", "were"],
          answer: 1,
          solution: {
            method: "Subject-verb agreement — singular head noun",
            steps: [
              "The subject is 'The basket' (singular). 'Of apples' is a prepositional phrase.",
              "'Has just bought' = present perfect, describing a current state → present tense verb.",
              "Singular present: 'is'.",
            ],
            tip: "In 'the basket of apples', the main noun is 'basket' (singular) → is. Don't be fooled by 'apples'.",
          },
        },
        {
          id: "taonan_eoy23_q4",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "I saw the twins leaving their stationery on their desks. The pencil cases could be __________.",
          options: ["ours", "mine", "theirs", "yours"],
          answer: 3,
          solution: {
            method: "Possessive pronoun — matching 'the twins'",
            steps: [
              "'The twins' = third person plural (they). Possessive pronoun = 'theirs'.",
              "The pencil cases belong to them (the twins) = theirs.",
            ],
            tip: "Theirs = belonging to them. The twins' pencil cases = theirs.",
          },
        },
        {
          id: "taonan_eoy23_q5",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "There is __________ wrong with Aminah today. She is not smiling like she always does.",
          options: ["nothing", "anything", "something", "everything"],
          answer: 3,
          solution: {
            method: "Indefinite pronoun — positive context with unknown issue",
            steps: [
              "Aminah is behaving differently (not smiling) → something is wrong (an unspecified problem exists).",
              "'Something' = an unspecified thing that exists.",
              "'Nothing' = no issue (contradicts 'not smiling'), 'anything' = used in negatives/questions.",
            ],
            tip: "Something = an unspecified thing (positive sentence). Anything = used in negatives/questions. Something is wrong = a problem exists.",
          },
        },
        {
          id: "taonan_eoy23_q6",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: '"__________ a sea star regrow its arms once they are broken off?" asked Sam curiously.',
          options: ["Can", "May", "Shall", "Should"],
          answer: 1,
          solution: {
            method: "Modal verb — ability/possibility question",
            steps: [
              "The question asks about the biological capability/ability of a sea star.",
              "'Can' = ability (is it able to?). Sam is asking whether it is biologically possible.",
              "'May' = permission; 'Shall/Should' = obligation/suggestion.",
            ],
            tip: "Can = ability (is capable of). 'Can a sea star regrow its arms?' = Is it able to?",
          },
        },
        {
          id: "taonan_eoy23_q7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "__________ it was raining heavily, I did not feel cold.",
          options: ["If", "As", "Then", "Although"],
          answer: 4,
          solution: {
            method: "Conjunction — contrast",
            steps: [
              "Raining heavily (expected to feel cold) BUT did not feel cold → contrast.",
              "'Although' introduces a contrast clause.",
              "'If' = condition; 'As' = reason/time; 'Then' = sequence.",
            ],
            tip: "Although = despite the fact that. Heavy rain but not cold = contrast → although.",
          },
        },
        {
          id: "taonan_eoy23_q8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "Wei Xiong went home after school, __________ he?",
          options: ["didn't", "hasn't", "hadn't", "doesn't"],
          answer: 1,
          solution: {
            method: "Question tags — simple past",
            steps: [
              "Main clause: 'Wei Xiong went home after school' (positive, simple past 'went').",
              "Question tag = negative + same tense auxiliary: 'didn't he?'",
              "Subject 'Wei Xiong' → pronoun 'he'. Past auxiliary: did → didn't.",
            ],
            tip: "Positive simple past → negative tag 'didn't [pronoun]?'. Went → did → didn't he?",
          },
        },
        {
          id: "taonan_eoy23_q9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "My dad bought __________ furniture when we moved into the new house because we had thrown away all the old ones.",
          options: ["many", "a few", "a little", "a lot of"],
          answer: 4,
          solution: {
            method: "Quantifier — uncountable noun + large amount",
            steps: [
              "'Furniture' is an uncountable noun. Eliminate 'many' and 'a few' (countable).",
              "They threw away ALL old furniture → needed to buy a LARGE amount of new furniture.",
              "'A lot of' = large amount, works with uncountable nouns. 'A little' = small amount.",
            ],
            tip: "Furniture is uncountable → use 'a lot of' (large amount) or 'a little' (small). Since they replaced ALL old furniture, they needed a lot.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B: VOCABULARY MCQ (6 x 1m, Q10–15)
    // ─────────────────────────────────────────────
    {
      id: "sec_b",
      name: "Section B: Vocabulary",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "taonan_eoy23_q10",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question: "Camille's portrait appeared like magic on the __________ that Vincent was painting on.",
          options: ["cloth", "fabric", "textile", "canvas"],
          answer: 4,
          solution: {
            method: "Vocabulary — painting surface",
            steps: [
              "'Canvas' is the specific surface/material that artists paint on.",
              "'Cloth/fabric/textile' = general fabric terms, not specific to painting.",
            ],
            tip: "Canvas = the stretched fabric surface used for painting. 'Canvas' is the artist's painting surface.",
          },
        },
        {
          id: "taonan_eoy23_q11",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question: 'You should refer to the __________ if you want to know the meaning of the word "dormant".',
          options: ["caption", "glossary", "sub-heading", "contents page"],
          answer: 2,
          solution: {
            method: "Vocabulary — reference section of a book",
            steps: [
              "'Glossary' = a list of terms and their definitions, usually at the back of a book.",
              "'Caption' = text below a picture; 'sub-heading' = smaller heading; 'contents page' = list of chapters.",
            ],
            tip: "Glossary = list of vocabulary words with their meanings. Used to look up word definitions.",
          },
        },
        {
          id: "taonan_eoy23_q12",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question: "My classmate __________ up the stairs leading to his classroom as he was late for school.",
          options: ["ambled", "marched", "sauntered", "scrambled"],
          answer: 4,
          solution: {
            method: "Vocabulary — hurried movement up stairs",
            steps: [
              "'Scrambled up' = climbed/moved quickly and urgently, often on hands and feet.",
              "'Ambled/sauntered' = walked leisurely/slowly (opposite of being late), 'marched' = walked in a military manner.",
            ],
            tip: "Scramble = move quickly in a disorganised/urgent way. 'Scrambled up the stairs' = rushed up hurriedly.",
          },
        },
        {
          id: "taonan_eoy23_q13",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question: "Shanti was told to __________ the responsibility of being the class monitor for this term.",
          options: ["take in", "take up", "take off", "take away"],
          answer: 2,
          solution: {
            method: "Phrasal verb — 'take up'",
            steps: [
              "'Take up' = to accept/assume a responsibility or role.",
              "'Take in' = deceive/absorb; 'take off' = remove/fly; 'take away' = remove/carry away.",
            ],
            tip: "'Take up a responsibility/role' = accept and begin doing it. 'Shanti took up the role of class monitor.'",
          },
        },
        {
          id: "taonan_eoy23_q14",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question: "Staring at her poor results, my sister regretted revising only __________.",
          options: [
            "in the long run",
            "at the eleventh hour",
            "in the twinkling of an eye",
            "on the spur of the moment",
          ],
          answer: 2,
          solution: {
            method: "Idiom — last-minute revision",
            steps: [
              "'At the eleventh hour' = at the last possible moment, just before a deadline.",
              "She regretted revising only at the last minute (before the exam) → 'at the eleventh hour'.",
              "'In the long run' = eventually; 'in the twinkling of an eye' = very quickly; 'on the spur of the moment' = without planning.",
            ],
            tip: "'At the eleventh hour' = at the very last minute. Regretting last-minute revision = revising at the eleventh hour.",
          },
        },
        {
          id: "taonan_eoy23_q15",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question: "I am grateful to my teacher's __________ explanation. The solution is now crystal clear to me.",
          options: ["brief", "thorough", "immediate", "spontaneous"],
          answer: 2,
          solution: {
            method: "Vocabulary — type of explanation that makes things clear",
            steps: [
              "'Thorough' = complete, detailed, covering all aspects.",
              "If the solution is now 'crystal clear', the explanation must have been complete and detailed = thorough.",
              "'Brief' = short (opposite of detailed); 'immediate' = right away; 'spontaneous' = unplanned.",
            ],
            tip: "Thorough = complete and detailed. A thorough explanation → solution becomes crystal clear.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C: VISUAL TEXT (5 x 1m, Q16–20)
    // ─────────────────────────────────────────────
    {
      id: "sec_c",
      name: "Section C: Visual Text",
      topic: "VisualText",
      marks: 5,
      passageTitle: "Mandai Safari Park School Holiday Special",
      passageText: `MANDAI SAFARI PARK SCHOOL HOLIDAY SPECIAL!

Mandai Safari Park is home to more than 500 exotic animals. Visit with your family for an escape from the city this year-end school holidays!

[Meerkat info box]
Meerkats are omnivores – they eat fruits and vegetables as well as animals. Unlike humans, they have no excess body fat and therefore, searching for food is a constant activity. Their diet mostly consists of insects, which they sniff out using their acute sense of smell. They also eat small rodents, fruit, birds, eggs, lizards, scorpions as well as snakes.

Despite living in the desert, meerkats do not need extra water in their diet. They get all the moisture they need from the insects and grubs they eat.

[Meet our Meerkats]
Get up close and personal with our mischievous meerkats: They will run over to you for mealworms which will be provided.
Date: 9 – 16 December | Time: 1 – 2 pm | Cost: $10 per person

[Did you know?]
• Meerkats can spot birds miles away! The dark patches around their eyes help to cut down glare from the sun and see far into the distance.
• Meerkats can live up to eight years in the wild but life can be harsh and they have many predators. In captivity, they live between 12 and 14 years and have been known to live up to 20 years!`,

      questions: [
        {
          id: "taonan_eoy23_q16",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "The main aim of the poster is to __________.",
          options: [
            "introduce Mandai Safari Park to everyone",
            "explain how the park is home to many exotic animals",
            "encourage people to visit the park during the school holidays",
            "inform readers that the year-end school holidays are approaching",
          ],
          answer: 3,
          solution: {
            method: "Identify main purpose of visual text",
            steps: [
              "The poster title says 'School Holiday Special!' and encourages families to 'Visit with your family for an escape from the city this year-end school holidays!'",
              "The primary call-to-action is to encourage visits during the school holidays.",
            ],
            tip: "The main aim = what the poster is trying to get people to do. 'School Holiday Special!' + 'Visit with your family' = encourage visits during school holidays.",
          },
        },
        {
          id: "taonan_eoy23_q17",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "According to the poster, what is the main food source for meerkats?",
          options: ["rats", "insects", "mealworms", "fruits and vegetables"],
          answer: 2,
          solution: {
            method: "Locate from poster",
            steps: [
              "Poster: 'Their diet mostly consists of insects, which they sniff out using their acute sense of smell.'",
              "'Mostly consists of insects' = main food source is insects.",
              "Mealworms are provided BY the safari park for the Meet our Meerkats experience, not their main wild food source.",
            ],
            tip: "'Mostly consists of insects' = insects are the MAIN food. 'Mostly' = primarily.",
          },
        },
        {
          id: "taonan_eoy23_q18",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "What is the purpose of the dark patches around the meerkats' eyes?",
          options: [
            "To protect them from predators.",
            "To reduce the glare from the sun.",
            "To protect their eyes from the sun.",
            "To help them spot birds that are miles away.",
          ],
          answer: 2,
          solution: {
            method: "Locate specific information",
            steps: [
              "Poster: 'The dark patches around their eyes help to cut down glare from the sun and see far into the distance.'",
              "Purpose = to reduce/cut down glare from the sun.",
              "Option 4 (spot birds) is the result of seeing far, not the function of the dark patches directly.",
            ],
            tip: "The dark patches CUT DOWN GLARE from sun → this allows them to see far. The PRIMARY purpose = reduce glare.",
          },
        },
        {
          id: "taonan_eoy23_q19",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "How long do meerkats live typically in captivity?",
          options: [
            "Up to eight years",
            "Up to twelve years",
            "Up to fourteen years",
            "Up to twenty years",
          ],
          answer: 3,
          solution: {
            method: "Locate specific information — typical captivity lifespan",
            steps: [
              "Poster: 'In captivity, they live between 12 and 14 years.'",
              "'Between 12 and 14 years' — the typical range. 'Up to fourteen years' is the upper end of the typical range.",
              "'Up to 20 years' is the maximum known, not typical.",
            ],
            tip: "Typical = the usual range (12–14 years). Up to 20 years = exceptional/maximum, not typical.",
          },
        },
        {
          id: "taonan_eoy23_q20",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "Which one of the following statements about the poster is true?",
          options: [
            "Meerkats are shy animals.",
            "Meet our Meerkats takes place during lunchtime.",
            "Meerkats are always searching for food to store fats in their bodies.",
            "You can meet the meerkats during the first two weeks of December.",
          ],
          answer: 4,
          solution: {
            method: "Identify the true statement",
            steps: [
              "Statement 1: FALSE — poster says they are 'mischievous' (naughty/playful), not shy.",
              "Statement 2: FALSE — Meet our Meerkats: Time: 1–2 pm. Lunchtime is usually 12–1pm. The event is 1–2pm (afternoon).",
              "Statement 3: FALSE — Meerkats have NO EXCESS BODY FAT (unlike humans). They search for food because they have no fat reserves, not to store fat.",
              "Statement 4: TRUE — Date: 9–16 December = the first two weeks of December. ✓",
            ],
            tip: "9–16 December = first two weeks of December. TRUE. Check each statement carefully against the poster.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D: GRAMMAR CLOZE (4 x 1m, Q21–24)
    // ─────────────────────────────────────────────
    {
      id: "sec_d",
      name: "Section D: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 4,
      questions: [
        {
          id: "taonan_eoy23_q21_24",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "School Uniform Rules in Singapore",
          wordBank: [
            "(A) after",
            "(B) instead",
            "(C) moreover",
            "(D) our",
            "(E) rather",
            "(F) since",
            "(G) their",
            "(H) therefore",
          ],
          passageText:
            "The temperature in Singapore has been rising. To combat the heat, schools across the island have been relaxing (21) __________ uniform rules. Many schools have allowed the students to wear the Physical Education attire (22) __________ of the full uniform. This is clearly a step welcomed by parents (23) __________ their children spend long hours in school. (24) __________, the scorching weather will be here to stay. With this hot spell, students may not be wearing their uniforms all year round.",
          blanks: [
            {
              number: 21,
              answer: "G",
              word: "their",
              solution: {
                method: "Possessive pronoun — 'schools' (plural third person)",
                steps: [
                  "'Schools' = they. Their uniform rules = the schools' uniform rules.",
                  "Possessive form of 'they' = 'their'.",
                ],
                tip: "Schools = they → their. 'Their uniform rules' = the schools' rules.",
              },
            },
            {
              number: 22,
              answer: "B",
              word: "instead",
              solution: {
                method: "Conjunction: 'instead of' — replacement",
                steps: [
                  "'Wear PE attire instead of the full uniform' = substitute one for the other.",
                  "'Instead of' = in place of, as a substitute for.",
                ],
                tip: "'Instead of' = as a replacement for. PE attire instead of full uniform = replacing one with the other.",
              },
            },
            {
              number: 23,
              answer: "F",
              word: "since",
              solution: {
                method: "Conjunction: 'since' — reason",
                steps: [
                  "'A step welcomed by parents SINCE their children spend long hours in school' = because/given that.",
                  "'Since' (as a conjunction) = because/given the fact that.",
                ],
                tip: "'Since' can mean 'because' when introducing a reason. Parents welcome it since (= because) children spend long hours in school.",
              },
            },
            {
              number: 24,
              answer: "C",
              word: "moreover",
              solution: {
                method: "Discourse connector: adding information",
                steps: [
                  "'Moreover' = furthermore/in addition. Adds a further point.",
                  "The passage is adding that the hot weather will continue → moreover is appropriate.",
                ],
                tip: "'Moreover' = furthermore, in addition (adds another supporting point). 'Moreover, the scorching weather will be here to stay' = additionally, this is a lasting trend.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E: VOCABULARY CLOZE (4 x 1m, Q25–28)
    // ─────────────────────────────────────────────
    {
      id: "sec_e",
      name: "Section E: Comprehension Cloze",
      topic: "VocabCloze",
      marks: 4,
      questions: [
        {
          id: "taonan_eoy23_q25_28",
          type: "B",
          topic: "VocabCloze",
          marks: 4,
          passageTitle: "Nura's NDP Diary Entry",
          wordBank: [
            "(A) audience",
            "(B) free",
            "(C) once",
            "(D) purchase",
            "(E) receive",
            "(F) spectators",
            "(G) theme",
            "(H) topic",
          ],
          passageText:
            "Dear Diary, This year's National Day Parade will be held at the Padang – a place of great importance and history to Singaporeans. My parents are over the moon when they (25) __________ three complimentary tickets for the event. We can watch the show for (26) __________ ! Hooray! According to my Social Studies teacher, the (27) __________ this year is 'Onward as One'. At any of the five stadiums in the heartlands, (28) __________ will be entertained by a Total Defence parade and numerous phenomenal performances. Thus, I'm looking forward to the NDP this year. Goodnight! Love, Nura",
          blanks: [
            {
              number: 25,
              answer: "E",
              word: "receive",
              solution: {
                method: "Context: getting complimentary tickets",
                steps: [
                  "'They received three complimentary tickets' = they got/obtained the tickets.",
                  "'Receive' = to get/obtain something given to you.",
                ],
                tip: "Receive = get/obtain (something given). Complimentary = free. They received free tickets.",
              },
            },
            {
              number: 26,
              answer: "B",
              word: "free",
              solution: {
                method: "Context: complimentary = free",
                steps: [
                  "'Complimentary tickets' = free tickets. 'We can watch for free!'",
                  "'For free' = without paying.",
                ],
                tip: "Complimentary = free. 'Watch for free' = no payment needed.",
              },
            },
            {
              number: 27,
              answer: "G",
              word: "theme",
              solution: {
                method: "Context: theme of NDP",
                steps: [
                  "'The theme this year is Onward as One' — NDP has an annual theme/slogan.",
                  "'Theme' = the central idea or topic of an event.",
                ],
                tip: "NDP theme = the overarching concept/slogan. 'Theme' not 'topic' — events have themes.",
              },
            },
            {
              number: 28,
              answer: "F",
              word: "spectators",
              solution: {
                method: "Context: people watching at stadiums",
                steps: [
                  "'At the stadiums, spectators will be entertained' — people watching an event at a stadium.",
                  "'Spectators' = people who watch a public event/performance.",
                ],
                tip: "Spectators = people who watch an event (sports, performances). Audience = people watching a show (theatre/TV). Stadiums → spectators.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F: SYNTHESIS & TRANSFORMATION (4 x 2m, Q29–32)
    // ─────────────────────────────────────────────
    {
      id: "sec_f",
      name: "Section F: Synthesis and Transformation",
      topic: "SentenceCombining",
      marks: 8,
      questions: [
        {
          id: "taonan_eoy23_q29",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          question:
            "Rewrite: 'Mr Mouse met Gruffalo in the deep dark wood. Mr Mouse was walking in the deep dark wood.' Using: While",
          answer: "While Mr Mouse was walking in the deep dark wood, he met Gruffalo.",
          solution: {
            method: "'While' + past continuous — background action",
            steps: [
              "'While' + past continuous = ongoing action at the time of another event.",
              "Walking = past continuous (ongoing background); met = past simple (event).",
              "Result: 'While Mr Mouse was walking in the deep dark wood, he met Gruffalo.'",
            ],
            tip: "'While + [past continuous], [simple past].' Note: replace repeated 'Mr Mouse' with 'he' in second clause.",
          },
        },
        {
          id: "taonan_eoy23_q30",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          question:
            "Rewrite: 'Gary enjoys playing badminton. Gary's brother enjoys playing badminton, too.' Using: Both",
          answer: "Both Gary and his brother enjoy playing badminton.",
          solution: {
            method: "'Both ... and ...' — correlative conjunction",
            steps: [
              "'Both A and B' combines two subjects doing the same action.",
              "Both Gary and his brother → plural verb 'enjoy'.",
              "Result: 'Both Gary and his brother enjoy playing badminton.'",
            ],
            tip: "'Both A and B' = plural subject → plural verb. Both Gary AND his brother ENJOY (not enjoys).",
          },
        },
        {
          id: "taonan_eoy23_q31",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          question:
            "Rewrite: 'The construction workers continued to work until the sky turned dark.' Using: only",
          answer: "The construction workers only stopped working when the sky turned dark.",
          solution: {
            method: "'Only stopped when' — transformation",
            steps: [
              "'Worked until the sky turned dark' = only stopped when the sky turned dark.",
              "Transform: 'worked until X' → 'only stopped when X'.",
              "Result: 'The construction workers only stopped working when the sky turned dark.'",
            ],
            tip: "'Worked until X' = 'only stopped when X'. Transform the sentence while keeping the same meaning.",
          },
        },
        {
          id: "taonan_eoy23_q32",
          type: "A",
          topic: "SentenceCombining",
          marks: 2,
          question:
            "Rewrite: 'Li Ming was very excited. Li Ming unwrapped his birthday presents.' Using: With much",
          answer: "With much excitement, Li Ming unwrapped his birthday presents.",
          solution: {
            method: "'With much [noun]' — adverbial phrase of manner",
            steps: [
              "Transform the adjective 'excited' into the noun 'excitement'.",
              "'With much excitement' = in a very excited manner.",
              "Result: 'With much excitement, Li Ming unwrapped his birthday presents.'",
            ],
            tip: "'With much [noun]' transforms an adjective to a prepositional phrase. Excited → excitement. 'With much excitement' = very excitedly.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G: SPELLING, PUNCTUATION & GRAMMAR (6 x 1m, Q33–38)
    // ─────────────────────────────────────────────
    {
      id: "sec_g",
      name: "Section G: Spelling, Punctuation and Grammar",
      topic: "Editing",
      marks: 6,
      passageText:
        "Muthu loved collecting model airplanes. Every day after completing his (33)[,] homework(circle: )) Muthu would assemble the parts of the airplanes together. Muthu (34)[makes] sure that he saved some of his pocket money so that he could buy more model airplanes. (35)[Among] all his airplanes cost him an arm and a leg. His favourite between One day, as Muthu was dusting his airplanes in the cupboard, he (36)[accidentally] acidantelly (37)[!] dropped one of them onto the floor. It broke into smithereens. 'Mum(circle !)' he wailed. His mother ran out of the kitchen immediately. (38)[Fortunately,] Fourtunetely, she managed to glue the broken parts together and it looked as good as new. 'You're the best, Mum!' said Muthu, a big grin spreading across his face.",
      questions: [
        {
          id: "taonan_eoy23_q33",
          type: "A",
          topic: "Editing",
          marks: 1,
          question: "Q33: Missing/wrong punctuation mark after 'homework'. Correct it.",
          answer: ",",
          solution: {
            method: "Punctuation: comma after introductory time phrase",
            steps: [
              "'Every day after completing his homework, Muthu would...' — needs a comma after the introductory adverbial phrase.",
            ],
            tip: "A comma is needed after a long introductory adverbial phrase. 'After completing his homework, [main clause]'.",
          },
        },
        {
          id: "taonan_eoy23_q34",
          type: "A",
          topic: "Editing",
          marks: 1,
          question: "Q34: Grammar error in 'Muthu makes sure that he saved some of his pocket money'. Correct the underlined word 'makes'.",
          answer: "made",
          solution: {
            method: "Tense consistency — past tense context",
            steps: [
              "The passage is in past tense ('loved collecting', 'would assemble').",
              "'Makes' should be 'made' (simple past) to match the tense.",
            ],
            tip: "Tense consistency: whole passage is past tense. 'Muthu MADE sure' (past), not 'makes' (present).",
          },
        },
        {
          id: "taonan_eoy23_q35",
          type: "A",
          topic: "Editing",
          marks: 1,
          question: "Q35: Grammar error — 'His favourite between all his airplanes cost him an arm and a leg.' Correct 'between'.",
          answer: "among",
          solution: {
            method: "Between vs Among",
            steps: [
              "'Among' is used when comparing/selecting from more than two items.",
              "'Between' is used for two items only. Airplanes = more than two → 'among'.",
              "'His favourite among all his airplanes' = chosen from many.",
            ],
            tip: "Between = two things. Among = more than two things. 'His favourite AMONG all his airplanes' (many).",
          },
        },
        {
          id: "taonan_eoy23_q36",
          type: "A",
          topic: "Editing",
          marks: 1,
          question: "Q36: Spelling error — 'acidantelly'. Correct it.",
          answer: "accidentally",
          solution: {
            method: "Spelling correction",
            steps: [
              "'Acidantelly' is a misspelling of 'accidentally'.",
              "Correct: a-c-c-i-d-e-n-t-a-l-l-y. Double 'c', double 'l'.",
            ],
            tip: "Accidentally = by accident, without meaning to. Correct spelling: accident + -ally = accidentally. Double 'c', double 'l'.",
          },
        },
        {
          id: "taonan_eoy23_q37",
          type: "A",
          topic: "Editing",
          marks: 1,
          question: "Q37: Wrong punctuation in 'Mum(circle mark)he wailed.' What is the correct punctuation mark?",
          answer: "!",
          solution: {
            method: "Punctuation: exclamation mark in dialogue",
            steps: [
              "'Mum!' he wailed — calling out urgently/emotionally requires an exclamation mark.",
              "The passage shows a missing or wrong punctuation inside the dialogue.",
            ],
            tip: "Exclamation mark (!) shows strong emotion, urgency, or a cry. 'Mum!' = calling out in distress.",
          },
        },
        {
          id: "taonan_eoy23_q38",
          type: "A",
          topic: "Editing",
          marks: 1,
          question: "Q38: Spelling error — 'Fourtunetely'. Correct it.",
          answer: "Fortunately",
          solution: {
            method: "Spelling correction",
            steps: [
              "'Fourtunetely' is a misspelling of 'Fortunately'.",
              "Correct: F-o-r-t-u-n-a-t-e-l-y. From 'fortune' + -ately.",
            ],
            tip: "Fortunately = luckily, by good fortune. Fortune → fortunate → fortunately. No 'u' after 'o'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H: COMPREHENSION OPEN-ENDED (8 marks, Q39–43)
    // ─────────────────────────────────────────────
    {
      id: "sec_h",
      name: "Section H: Comprehension",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "Grumpy Goblin Learns the Value of Friendship",
      passageText: `Every day, Grumpy Goblin dug for precious stones at a mine in the forest to add to his huge collection. However, the more he collected, the grumpier he became. Nothing was ever right for him. Worried that someone might steal his treasure, he never invited anyone to his house.

In a nearby forest lived a fairy who was always happy. She was never bored as the animals and trees all around were her friends.

One day, the goblin had a misfortune. He was pushing his cart full of precious stones out of the mine when all of a sudden, a crow swooped down, grabbed a brilliant ruby and flew off. The goblin was furious. He ran after the thief, yelling, "Come back, you fool!" Grumpy Goblin ran for such a long time that he ended up in the forest where he nearly collided with the fairy.

"Hello!" greeted the fairy. "Where are you from?"

"None of your business!" said the goblin in his grumpiest voice.

"You look upset. Would you like some fruits and a drink?"

"I don't want anything but my ruby back!"

Fairy handed the goblin a cup of dew and some berries anyway. As he was thirsty, he drank the cool dew and ate a few berries. Fairy began to sing. "Would you like to dance with me?" she asked. Without waiting for an answer, she held Grumpy Goblin's hand and together, they flew up into the sky, twirling high above the trees. The more fun the goblin had, the less grumpy he felt.

Then, out of nowhere, the crow appeared. It hopped over to the fairy and presented her the red stone. "Oh! That's so sweet of you!" said the fairy. "You remembered my birthday!"

"But...that's MY ruby!" shouted the goblin.

The fairy looked at the goblin in astonishment and despair. "You shouldn't get so angry about a little stone," she said and held out the stone to the goblin who snatched it angrily from her.

Fairy then turned her back on him and walked away sadly. "That stone belongs to me," he muttered. He wanted to believe that but deep down inside him, he was cross with himself. He had ruined everything. All the precious stones in the world were not as valuable as friendship. So, he went back to find the fairy to salvage the situation.

Ever since, the animals could hear the goblin singing merrily in the mountains.`,

      questions: [
        {
          id: "taonan_eoy23_q39",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question: "Which word has the same meaning as 'sadness'? Circle (A) or (B). [1m]\n\n'The fairy looked at the goblin in astonishment (A) and despair (B).'",
          answer: "B",
          solution: {
            method: "Synonym — 'despair' = sadness",
            steps: [
              "'Despair' (B) = a feeling of hopelessness or deep sadness.",
              "'Astonishment' (A) = great surprise/shock — not sadness.",
            ],
            tip: "Despair = deep sadness/hopelessness. Astonishment = great surprise. Sadness → despair (B).",
          },
        },
        {
          id: "taonan_eoy23_q40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question: "Read each statement and write 'True' or 'False'. [2m]\n\na) The fairy and the goblin lived in the forest.\nb) The fairy forgave the goblin in the end.",
          answer: "a) False\nb) True",
          solution: {
            method: "True/False — locate in passage",
            steps: [
              "a) Paragraph 1: Grumpy Goblin dug at 'a mine in the forest'. Paragraph 2: fairy lived 'in a nearby forest'. The goblin lived near a mine, not necessarily in the forest. The fairy lived in a nearby forest. They did NOT live in the SAME forest. → False.",
              "b) Last paragraph: 'he went back to find the fairy to salvage the situation. Ever since, the animals could hear the goblin singing merrily.' The fairy eventually forgave him (implied by the happy ending). → True.",
            ],
            tip: "a) False — they lived in different places. b) True — the goblin went back, things were resolved (singing merrily).",
          },
        },
        {
          id: "taonan_eoy23_q41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question: "State two things that the fairy did to make the goblin feel better after losing his ruby. [2m]",
          answer: "a) The fairy danced with the goblin in the air / flew up into the sky twirling.\nb) The fairy handed the goblin a cup of dew and some berries.",
          solution: {
            method: "List two actions from passage",
            steps: [
              "Action 1 (paragraph with fairy): 'Fairy handed the goblin a cup of dew and some berries anyway.'",
              "Action 2: 'she held Grumpy Goblin's hand and together, they flew up into the sky, twirling high above the trees.' / danced with him.",
            ],
            tip: "Answer key: a) Dancing with the goblin in the air. b) The fairy handed a cup of dew and some berries. Two distinct kind acts.",
          },
        },
        {
          id: "taonan_eoy23_q42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question: "Tick (✓) the title that best describes the story. [1m]",
          options: [
            "How to Become a Happy Fairy",
            "Grumpy Goblin Learns the Value of Friendship",
            "The Importance of Collecting Precious Stones for Happiness",
          ],
          answer: "Grumpy Goblin Learns the Value of Friendship",
          solution: {
            method: "Best title selection",
            steps: [
              "The story is about Grumpy Goblin realising that 'All the precious stones in the world were not as valuable as friendship.'",
              "He learns to value friendship over material possessions → 'Grumpy Goblin Learns the Value of Friendship'.",
            ],
            tip: "The central lesson: friendship > precious stones. The story is about the goblin's transformation through learning about friendship.",
          },
        },
        {
          id: "taonan_eoy23_q43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question: "Would you like to have a friend like Grumpy Goblin? Give one reason to support your answer. Your answer must be based on the text. [2m]",
          answer: "No. I would not like to have a friend like Grumpy Goblin because he was very selfish and ungenerous — he would not share or lend anything. / He only thought about himself and his precious stones, so I don't want to be his friend.",
          solution: {
            method: "Personal opinion with textual evidence",
            steps: [
              "The question accepts Yes or No — but evidence must come from the text.",
              "Answer key: 'No. It was because whatever he had, he would not share or lend, so I don't want to be his friends.'",
              "Evidence: 'Worried that someone might steal his treasure, he never invited anyone to his house.' / He snatched the stone angrily.",
              "Accept 'Yes' with valid reasons (e.g., at the end he changed and became a better friend).",
            ],
            tip: "Support your opinion with a specific reason from the text. Mention his behavior (greedy, selfish) or his change (learned to value friendship).",
          },
        },
      ],
    },
  ],
};
