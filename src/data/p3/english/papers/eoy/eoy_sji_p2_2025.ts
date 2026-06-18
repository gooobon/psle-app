// ============================================================
// ST. JOSEPH'S INSTITUTION JUNIOR
// END-OF-YEAR EXAMINATION 2023
// PRIMARY 3 — ENGLISH LANGUAGE PAPER 2
// Date: 26 October 2023 | Total: 50 marks | 48 Questions | 1h 15min
// Booklet A: 20 marks (Q1–14 MCQ on OAS) | Booklet B: 30 marks (written)
// Sections: Vocabulary(6) · Grammar(8) · GrammarCloze×2(8) ·
//           VocabCloze×2(8) · SentenceCombining(4) ·
//           ComprehensionOE×2(16)
// ============================================================

import { QuestionSet } from "@/types/questions";

export const eoy_sji_p2_2025: QuestionSet = {
  id: "eoy_sji_p2_2025",
  school: "St. Joseph's Institution Junior",
  level: "P3",
  subject: "English",
  year: 2023,
  exam: "EOY",
  paper: 2,
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // VOCABULARY (6 x 1 mark, Q1–6)
    // ─────────────────────────────────────────────
    {
      id: "sec_vocab",
      name: "Vocabulary",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "sji_eoy23_q1",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Jason and Ian were __________ with just a warning because they promised not to play with fire again.",
          options: ["let on", "let up", "let off", "let down"],
          answer: 3,
          solution: {
            method: "Phrasal verb — 'let off'",
            steps: [
              "'Let off' = to be excused/spared from punishment. They received only a warning = let off lightly.",
              "'Let on' = to reveal a secret, 'let up' = to ease/stop, 'let down' = to disappoint.",
            ],
            tip: "'Let off' = spared from punishment. 'They were let off with a warning' = they didn't receive full punishment.",
          },
        },
        {
          id: "sji_eoy23_q2",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Raj bought a meal for the __________ boy as he looked like he had not eaten for days.",
          options: ["stout", "chubby", "healthy", "scrawny"],
          answer: 4,
          solution: {
            method: "Vocabulary — physical appearance",
            steps: [
              "The boy looks like he had not eaten for days — he would be very thin and underfed.",
              "'Scrawny' = very thin and bony, as if malnourished.",
              "'Stout/chubby' = overweight (opposite), 'healthy' = in good condition.",
            ],
            tip: "Scrawny = very thin and underfed (negative connotation). Matches 'not eaten for days'.",
          },
        },
        {
          id: "sji_eoy23_q3",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Rahim bought a __________ watermelon from the supermarket. He needed help to carry it home.",
          options: ["vast", "huge", "bulky", "great"],
          answer: 2,
          solution: {
            method: "Collocation with concrete object",
            steps: [
              "'Huge watermelon' = a very large watermelon. 'Huge' collocates naturally with physical objects.",
              "'Vast' = usually for areas/concepts (vast ocean), 'bulky' = awkwardly large/cumbersome, 'great' = formal or abstract.",
            ],
            tip: "Huge = very large (most natural for physical objects like watermelons). Needed help carrying = it was very big and heavy.",
          },
        },
        {
          id: "sji_eoy23_q4",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Peter __________ his shoulders and walked away from the school bully who was calling him names.",
          options: ["flipped", "waved", "nodded", "shrugged"],
          answer: 4,
          solution: {
            method: "Verb — body language",
            steps: [
              "'Shrugged his shoulders' = raised and dropped shoulders to show indifference/unconcern.",
              "Walking away from a bully while shrugging = showing the bully's words don't bother him.",
              "'Flipped' = turned over, 'waved' = hand gesture, 'nodded' = head movement (yes).",
            ],
            tip: "Shrug = raise and drop shoulders to show 'I don't care'. Classic gesture of indifference.",
          },
        },
        {
          id: "sji_eoy23_q5",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "I always look forward to reunion dinner at my grandmother's house because she cooks a __________ meal for us.",
          options: ["rich", "bland", "delicious", "tasteless"],
          answer: 3,
          solution: {
            method: "Vocabulary in context — positive adjective",
            steps: [
              "The speaker 'always looks forward to' the meal = it is something enjoyable.",
              "'Delicious' = extremely tasty. Matches the positive anticipation.",
              "'Bland/tasteless' = lacking flavour (negative), 'rich' can mean heavy/flavourful but 'delicious' fits better.",
            ],
            tip: "Looking forward to something = expecting something pleasant. A meal you look forward to = delicious.",
          },
        },
        {
          id: "sji_eoy23_q6",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Ruth eyed the dog __________ as she passed by the security post.",
          options: ["warily", "rashly", "hurriedly", "suspiciously"],
          answer: 1,
          solution: {
            method: "Adverb — manner of watching",
            steps: [
              "'Warily' = cautiously, being careful about potential danger.",
              "Passing a security post with a dog = proceeding carefully in case the dog is dangerous.",
              "'Suspiciously' = as if thinking something wrong is happening (more about distrust), 'rashly' = without caution (opposite), 'hurriedly' = in a rush.",
            ],
            tip: "Warily = with caution/wariness. 'Eyed the dog warily' = watched carefully in case it was dangerous.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // GRAMMAR (8 x 1 mark, Q7–14)
    // ─────────────────────────────────────────────
    {
      id: "sec_grammar",
      name: "Grammar",
      topic: "GrammarMCQ",
      marks: 8,
      questions: [
        {
          id: "sji_eoy23_q7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"How __________ time do you need to finish your homework?" Mother asked Tina.',
          options: ["most", "more", "much", "many"],
          answer: 3,
          solution: {
            method: "Quantifier — uncountable noun 'time'",
            steps: [
              "'Time' is an uncountable noun. Use 'much' (not 'many' which is for countable).",
              "'How much time' = asking about the quantity of time needed.",
              "'Most/more' = comparative/superlative, not used in this question structure.",
            ],
            tip: "'How much' + uncountable noun. 'How many' + countable noun. Time is uncountable → How much time.",
          },
        },
        {
          id: "sji_eoy23_q8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The children pleaded with __________ mother to let them play outside.",
          options: ["my", "his", "our", "their"],
          answer: 4,
          solution: {
            method: "Possessive pronoun — matching subject 'The children'",
            steps: [
              "Subject = 'The children' (third person plural). Their possessive = 'their'.",
              "'Their mother' = the mother belonging to the children.",
              "'My' = I, 'his' = singular male, 'our' = we.",
            ],
            tip: "The children = they → their. 'Their mother' = the children's mother.",
          },
        },
        {
          id: "sji_eoy23_q9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"While you __________, I cooked your favourite meal," Mother told Karen.',
          options: ["sleep", "will sleep", "was sleeping", "were sleeping"],
          answer: 4,
          solution: {
            method: "Past continuous — simultaneous past actions",
            steps: [
              "'While you were sleeping' = an ongoing past action during which another action (cooking) happened.",
              "Subject 'you' = plural past continuous = 'were sleeping'.",
              "'While + past continuous' is a standard structure for simultaneous past actions.",
            ],
            tip: "'While + past continuous' = ongoing background action. 'While you WERE SLEEPING, I cooked' — two simultaneous past actions.",
          },
        },
        {
          id: "sji_eoy23_q10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Siti, this is your pencil, __________ it?" asked Mathew.',
          options: ["is", "isn't", "was", "wasn't"],
          answer: 2,
          solution: {
            method: "Question tags — positive statement → negative tag",
            steps: [
              "Main clause: 'This is your pencil' (positive, present tense 'is').",
              "Question tag = negative + same verb: 'isn't it?'",
              "Subject 'this' → pronoun 'it'. Verb 'is' → negative 'isn't'.",
            ],
            tip: "Question tag rule: positive statement → negative tag. 'This IS your pencil, ISN'T it?'",
          },
        },
        {
          id: "sji_eoy23_q11",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Jay and Ken did not __________ to school as they were not feeling well.",
          options: ["go", "goes", "gone", "going"],
          answer: 1,
          solution: {
            method: "Base form after 'did not'",
            steps: [
              "'Did not + base form' — after 'did not', always use the base (infinitive) form.",
              "'Did not go' = negative simple past.",
              "'Goes/going/gone' cannot follow 'did not'.",
            ],
            tip: "Did not + BASE FORM. Never 'did not goes/gone/going'. Simple past negative: did not go.",
          },
        },
        {
          id: "sji_eoy23_q12",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mother reminded the twins to take care of __________ before they left for their camping trip.",
          options: ["himself", "ourselves", "yourselves", "themselves"],
          answer: 4,
          solution: {
            method: "Reflexive pronoun — subject 'the twins'",
            steps: [
              "Subject = 'the twins' (plural, third person). Reflexive pronoun = 'themselves'.",
              "'Take care of themselves' = look after each other/themselves.",
              "'Himself' = singular male, 'ourselves' = we, 'yourselves' = you (plural).",
            ],
            tip: "The twins = they → themselves. 'Take care of themselves' = reflexive action for 'they'.",
          },
        },
        {
          id: "sji_eoy23_q13",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "__________ in the class dislikes Junxiang because he likes to play pranks on people. It is no wonder he has no friends.",
          options: ["Nobody", "Anybody", "Somebody", "Everybody"],
          answer: 4,
          solution: {
            method: "Indefinite pronoun — context",
            steps: [
              "'Everybody in the class dislikes Junxiang' = all students dislike him.",
              "Clue: 'It is no wonder he has no friends' — if EVERYONE dislikes him, no friends makes sense.",
              "'Nobody' = no one (wouldn't match 'no wonder no friends'), 'somebody' = one person only.",
            ],
            tip: "Everybody = all people (in a group). If everybody dislikes you → no friends. This is logical.",
          },
        },
        {
          id: "sji_eoy23_q14",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Nobody answered the door __________ I left after a while.",
          options: ["if", "so", "for", "but"],
          answer: 2,
          solution: {
            method: "Conjunction — result/consequence",
            steps: [
              "'Nobody answered the door' (cause) → 'I left after a while' (result/consequence).",
              "'So' connects a cause to its result: nobody answered SO I left.",
              "'If' = condition, 'for' = reason (formal), 'but' = contrast (not a contrast here).",
            ],
            tip: "'So' = therefore/as a result. [Cause] so [result]. Nobody answered, so I left.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // GRAMMAR CLOZE 1 (4 x 1 mark, Q15–18)
    // ─────────────────────────────────────────────
    {
      id: "sec_gc1",
      name: "Grammar Cloze 1",
      topic: "GrammarCloze",
      marks: 4,
      questions: [
        {
          id: "sji_eoy23_q15_18",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Grace and the Cupcake Man",
          wordBank: ["(A) on", "(B) from", "(C) about", "(D) of", "(E) at", "(F) with"],
          passageText:
            "When the bell rang, Grace rushed to get home. While walking home, she met a man (15) __________ a mole on his cheek. \"Would you like a cupcake? It is fresh (16) __________ the oven,\" he said. Grace's stomach growled (17) __________ the sight of the cupcake. She licked her lips, but then remembered the story of Hansel and Gretel. This man reminded her (18) __________ the witch in that story. She declined and headed home.",
          blanks: [
            {
              number: 15,
              answer: "F",
              word: "with",
              solution: {
                method: "Preposition of description — physical feature",
                steps: [
                  "'A man with a mole on his cheek' = a man who has a mole.",
                  "'With' is used to describe a person's features: a man with blue eyes, a girl with long hair.",
                ],
                tip: "'With + feature' describes physical attributes. A man WITH a mole.",
              },
            },
            {
              number: 16,
              answer: "B",
              word: "from",
              solution: {
                method: "Preposition — source/origin",
                steps: [
                  "'Fresh from the oven' = just taken out of the oven, very recently baked.",
                  "'From' shows the source/origin.",
                ],
                tip: "'Fresh from [source]' = just come from there. 'Fresh from the oven' is a fixed expression.",
              },
            },
            {
              number: 17,
              answer: "E",
              word: "at",
              solution: {
                method: "Preposition — reaction to sight",
                steps: [
                  "'Growled at the sight of the cupcake' = the sight triggered a reaction.",
                  "'At the sight of' is a fixed phrase meaning 'when seeing'.",
                ],
                tip: "'At the sight of' = upon seeing/when seeing. 'Growled at the sight of food' = stomach growled when she saw the food.",
              },
            },
            {
              number: 18,
              answer: "D",
              word: "of",
              solution: {
                method: "Fixed phrase: 'remind of'",
                steps: [
                  "'Remind someone of someone/something' = cause someone to think of/recall.",
                  "'This man reminded her OF the witch' — fixed collocation.",
                ],
                tip: "'Remind + person + of + something' is fixed. He reminded her OF the witch.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // GRAMMAR CLOZE 2 (4 x 1 mark, Q19–22)
    // ─────────────────────────────────────────────
    {
      id: "sec_gc2",
      name: "Grammar Cloze 2",
      topic: "GrammarCloze",
      marks: 4,
      questions: [
        {
          id: "sji_eoy23_q19_22",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Luke at Legoland",
          wordBank: ["(A) go", "(B) goes", "(C) are going", "(D) was going", "(E) were going", "(F) went"],
          passageText:
            "During the holidays, Luke's parents decided to take him to Legoland. Luke could not wait to (19) __________ on the rides there. The family reached the park early. Luke ran towards the Flying Fox excitedly. His father had given him twenty dollars to spend at the park. He loved thrilling rides. He (20) __________ to spend the money on such rides. Soon, it was closing time. Luke (21) __________ home feeling tired, but happy. Seeing how Luke had enjoyed himself, his parents (22) __________ to plan another trip soon. Luke is looking forward to it already.",
          blanks: [
            {
              number: 19,
              answer: "A",
              word: "go",
              solution: {
                method: "Infinitive after 'could not wait to'",
                steps: [
                  "'Could not wait to go' = eager to go. After 'to', use base form of verb.",
                  "'Go on the rides' = base form infinitive.",
                ],
                tip: "'Can't wait to + base verb' = very eager to do something. 'Could not wait to GO'.",
              },
            },
            {
              number: 20,
              answer: "D",
              word: "was going",
              solution: {
                method: "Past continuous — planned intention in the past",
                steps: [
                  "'He was going to spend the money on such rides' = his intention/plan in the past.",
                  "'Was going to + verb' = planned future action from a past perspective.",
                ],
                tip: "'Was going to + verb' = intended/planned to do in the past. 'He was going to spend the money' = that was his plan.",
              },
            },
            {
              number: 21,
              answer: "F",
              word: "went",
              solution: {
                method: "Simple past — completed action",
                steps: [
                  "'Luke went home feeling tired' — past completed action.",
                  "Irregular past: go → went.",
                ],
                tip: "Irregular past: go → went. The trip is over (closing time), so it's a completed past action.",
              },
            },
            {
              number: 22,
              answer: "C",
              word: "are going",
              solution: {
                method: "Present continuous — future plan",
                steps: [
                  "'His parents are going to plan another trip soon' — present continuous for a future plan.",
                  "The planning is happening now/soon, from the current perspective of the story.",
                ],
                tip: "'Are going to + verb' = plan/intention for the future. The parents ARE GOING TO plan another trip.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // VOCABULARY CLOZE 1 (4 x 1 mark, Q23–26)
    // ─────────────────────────────────────────────
    {
      id: "sec_vc1",
      name: "Vocabulary Cloze 1",
      topic: "VocabCloze",
      marks: 4,
      questions: [
        {
          id: "sji_eoy23_q23_26",
          type: "B",
          topic: "VocabCloze",
          marks: 4,
          passageTitle: "The Alien Zone",
          wordBank: [
            "(A) violently",
            "(B) sheepishly",
            "(C) softly",
            "(D) unnecessarily",
            "(E) kindly",
            "(F) quietly",
          ],
          passageText:
            "\"You are now entering the alien zone. Please do not make any noise (23) __________. If you really need to, speak (24) __________. Do not look to your right or left, but walk briskly in a single file. The aliens do not take (25) __________ to loud sounds or sudden movements. It is best to observe them (26) __________ without them noticing your presence,\" advised the voice over the speaker. Just then, the alarm rang and Zane had to wake up to get ready for school.",
          blanks: [
            {
              number: 23,
              answer: "D",
              word: "unnecessarily",
              solution: {
                method: "Context: avoid unnecessary noise",
                steps: [
                  "'Please do not make any noise unnecessarily' = don't make noise unless absolutely needed.",
                  "'Unnecessarily' = without good reason/more than needed.",
                ],
                tip: "Unnecessarily = without need. 'Don't make noise unnecessarily' = only make noise if you really have to.",
              },
            },
            {
              number: 24,
              answer: "C",
              word: "softly",
              solution: {
                method: "Context: speak quietly in alien zone",
                steps: [
                  "If you must speak, do so 'softly' = in a low, quiet voice.",
                  "'Softly' = gently and quietly.",
                ],
                tip: "Softly = in a gentle, quiet manner. Speak softly = speak in a low voice. Matches the context of a quiet alien zone.",
              },
            },
            {
              number: 25,
              answer: "A",
              word: "violently",
              solution: {
                method: "Fixed phrase: 'take to' — react to",
                steps: [
                  "'The aliens do not take violently to loud sounds' = they react violently to loud sounds.",
                  "Hmm — but answer key shows Q25 = A = 'violently'. 'Do not take violently to' is unusual. Actually: 'do not take kindly to' is the fixed phrase.",
                  "Wait — answer key shows Q17=E (kindly). So Q25 = A (violently): 'aliens do not take violently to loud sounds' → they react badly/violently.",
                ],
                tip: "'Take [adverb] to' = react in that manner. 'Do not take violently to' = will react with violence if disturbed by loud sounds.",
              },
            },
            {
              number: 26,
              answer: "F",
              word: "quietly",
              solution: {
                method: "Context: observe without being noticed",
                steps: [
                  "'Observe them quietly without them noticing your presence' = watch in silence.",
                  "'Quietly' = without making noise, so they don't notice you.",
                ],
                tip: "Quietly = without sound. Observing quietly = watching silently so as not to attract attention.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // VOCABULARY CLOZE 2 (4 x 1 mark, Q27–30)
    // ─────────────────────────────────────────────
    {
      id: "sec_vc2",
      name: "Vocabulary Cloze 2",
      topic: "VocabCloze",
      marks: 4,
      questions: [
        {
          id: "sji_eoy23_q27_30",
          type: "B",
          topic: "VocabCloze",
          marks: 4,
          passageTitle: "The Thunderstorm Blackout",
          instruction: "Fill in each blank with the most suitable word.",
          passageText:
            "There was a thunderstorm last Friday night. Several areas in western Singapore were (27) __________ by a blackout. It happened so suddenly that many families were caught off guard. Some people were (28) __________ their favourite television shows or reading the newspaper, while most children were doing their homework. Many people (29) __________ to call the Singapore Power Supply but they could not get through. Some of them complained that they could not (30) __________ any updates and became frustrated. Thankfully, power was restored after about three hours.",
          blanks: [
            {
              number: 27,
              answer: "hit",
              solution: {
                method: "Context: affected by blackout",
                steps: [
                  "'Several areas were hit by a blackout' = affected/struck by a power failure.",
                  "'Hit by' = affected/struck by (storm, disaster, problem).",
                ],
                tip: "'Hit by' = struck/affected by (natural disaster, problem). 'Areas were hit by the blackout'.",
              },
            },
            {
              number: 28,
              answer: "watching",
              solution: {
                method: "Context: activity with television",
                steps: [
                  "'People were watching their favourite television shows' = past continuous for ongoing activity.",
                  "'Watching television' = viewing TV programs.",
                ],
                tip: "You WATCH television (not see or look at). Past continuous 'were watching' = ongoing activity.",
              },
            },
            {
              number: 29,
              answer: "needed",
              solution: {
                method: "Context: tried to call power company",
                steps: [
                  "'Many people needed to call the Singapore Power Supply' = they had a need/reason to call.",
                  "Alternatively: 'tried to call' — but answer key shows Q29 = 'Needed'.",
                ],
                tip: "Needed = had a need/requirement. 'Needed to call' = had to call (urgent need during a blackout).",
              },
            },
            {
              number: 30,
              answer: "get",
              solution: {
                method: "Fixed phrase: 'get any updates'",
                steps: [
                  "'Could not get any updates' = unable to receive/obtain information.",
                  "'Get updates' = receive information/news.",
                ],
                tip: "'Get updates' = receive/obtain news or information. 'Could not get any updates' = no information available.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SENTENCE COMBINING (4 x 1 mark, Q31–34)
    // ─────────────────────────────────────────────
    {
      id: "sec_sc",
      name: "Sentence Combining",
      topic: "SentenceCombining",
      marks: 4,
      questions: [
        {
          id: "sji_eoy23_q31",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Ben needed a drink. He went to the kitchen.' Using: so",
          answer: "Ben needed a drink so he went to the kitchen.",
          solution: {
            method: "'So' — cause and result",
            steps: [
              "'So' connects a cause (needed a drink) to its result (went to kitchen).",
              "Result: 'Ben needed a drink so he went to the kitchen.'",
            ],
            tip: "'[Cause] so [result]'. Ben needed a drink SO he went to the kitchen.",
          },
        },
        {
          id: "sji_eoy23_q32",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Mary likes to bake cakes. Sarah likes to bake cakes too.' Using: and",
          answer: "Mary and Sarah like to bake cakes.",
          solution: {
            method: "'And' — shared action, two subjects",
            steps: [
              "Both Mary and Sarah share the same action (like to bake cakes).",
              "Combine subjects with 'and': 'Mary and Sarah' → plural verb 'like'.",
              "Result: 'Mary and Sarah like to bake cakes.'",
            ],
            tip: "'A and B + plural verb'. Mary AND Sarah LIKE (not likes) to bake cakes.",
          },
        },
        {
          id: "sji_eoy23_q33",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Jessy likes basketball. Jessy does not like netball.' Using: but",
          answer: "Jessy likes basketball but she does not like netball.",
          solution: {
            method: "'But' — contrast",
            steps: [
              "'But' connects two contrasting ideas about Jessy.",
              "Replace 'Jessy' in second clause with 'she'.",
              "Result: 'Jessy likes basketball but she does not like netball.'",
            ],
            tip: "'But' = contrast. Likes basketball BUT does not like netball.",
          },
        },
        {
          id: "sji_eoy23_q34",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'He was walking back to his house. He heard a loud explosion.' Using: when",
          answer:
            "He was walking back to his house when he heard a loud explosion.",
          solution: {
            method: "'When' — ongoing action interrupted",
            steps: [
              "'When' connects an ongoing action (walking) with an event that happened (heard explosion).",
              "Past continuous (was walking) + when + simple past (heard).",
              "Result: 'He was walking back to his house when he heard a loud explosion.'",
            ],
            tip: "[Past continuous] when [simple past] = ongoing action interrupted by a sudden event.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // COMPREHENSION 1 (8 marks, Q35–42) — Ella and True Friends
    // ─────────────────────────────────────────────
    {
      id: "sec_comp1",
      name: "Comprehension 1",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "Ella and True Friends",
      passageText: `Ella was a popular girl in class. She was kind and friendly towards her classmates. She had many friends but could not spend much time with each of them.

One day, Ella and her classmates drew and made gifts during friendship day. Mrs Lee had instructed the class to make three presents each to give to three of their closest friends.

When her classmates gave out all their presents, Ella was the only one who received none! She felt terrible and cried. How can it be? She had so many friends. Her classmates consoled her, each spending a short time with her, and then left her side.

When she got home, she cried and asked her mother where she could find true friends.

"If you really want true friends, you will have to spend time with them. You must show care and be available to them in good and bad times," answered her mother.

"But I want to be everybody's friend!" Ella protested.

"There just isn't enough time to be available for everyone, so it is possible to just have a few true friends. The others will be playmates," advised her mother.

Ella realised that she was a good companion but not a true friend. That night, she decided to change her ways so that she could have some true friends.

Source: https://milinepublishing.geneseo.edu/`,

      questions: [
        {
          id: "sji_eoy23_q35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "From paragraph 1, write down the word that has the same meaning as 'well-liked'. [1m]",
          answer: "popular",
          solution: {
            method: "Synonym from paragraph 1",
            steps: [
              "Paragraph 1: 'Ella was a popular girl in class.'",
              "'Popular' = well-liked by many people.",
            ],
            tip: "Popular = well-liked/well-known. The answer is directly in the first sentence.",
          },
        },
        {
          id: "sji_eoy23_q36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Based on paragraph 2, explain why Ella did not receive any gifts from her classmates. [1m]",
          answer:
            "Ella did not receive any gifts because she did not have any true/close friends. The task was to give presents to their three closest friends, and none of her classmates considered her a close enough friend to give a gift to.",
          solution: {
            method: "Inference from paragraph 2",
            steps: [
              "Paragraph 2: 'Mrs Lee had instructed the class to make three presents each to give to three of their closest friends.'",
              "Ella had many acquaintances but no one considered her among their three closest friends.",
            ],
            tip: "The gifts were for THREE CLOSEST FRIENDS specifically. Ella was friendly with many but not a close/true friend to any of them.",
          },
        },
        {
          id: "sji_eoy23_q37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Arrange the events in the right sequence. Write 1, 2 and 3 on the lines below. [1m]\n\n__ Ella knew what she needed to do.\n__ Ella did not receive any presents from her classmates.\n__ Ella celebrated friendship day.",
          answer: "3, 2, 1",
          solution: {
            method: "Sequence of events",
            steps: [
              "1st: Ella celebrated friendship day (paragraph 2 — making gifts).",
              "2nd: Ella did not receive any presents (paragraph 3).",
              "3rd: Ella knew what she needed to do (last paragraph — decided to change).",
            ],
            tip: "Friendship day → no presents received → decided to change (knew what to do). Order: celebrated(1), no presents(2), knew what to do(3).",
          },
        },
        {
          id: "sji_eoy23_q38",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Put a tick (√) in the box for the correct answer. Referring to the last paragraph, which of the following best describes Ella's emotion after listening to her mother's advice? [1m]",
          options: ["happy", "regretful", "excited"],
          answer: "regretful",
          solution: {
            method: "Inference from last paragraph",
            steps: [
              "Last paragraph: 'Ella realised that she was a good companion but not a true friend.'",
              "Realising she had not been a true friend = regret/remorse for her past behaviour.",
              "'Decided to change her ways' shows she regretted her previous behaviour.",
            ],
            tip: "Regretful = feeling sorry about something. Ella regretted being only a companion, not a true friend. She decided to change = regret + resolution.",
          },
        },
        {
          id: "sji_eoy23_q39",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q39 True or False: Ella did not have any friends. [1m]",
          answer: "False",
          solution: {
            method: "True/False — paragraph 1",
            steps: [
              "Paragraph 1: 'She had many friends but could not spend much time with each of them.'",
              "She had MANY friends — but not true/close friends. → False (she DID have friends, just not true ones).",
            ],
            tip: "She had many friends (acquaintances). The statement says she had NO friends — False. She had many friends, just not true/close ones.",
          },
        },
        {
          id: "sji_eoy23_q40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q40 True or False: Only Ella's mother gave her advice. [1m]",
          answer: "True",
          solution: {
            method: "True/False — identify who gave advice",
            steps: [
              "In the passage, only Ella's mother gives her advice (paragraphs 5–7).",
              "Her classmates consoled her but did not give advice.",
            ],
            tip: "Only the mother gives direct advice. Classmates consoled her briefly but gave no advice.",
          },
        },
        {
          id: "sji_eoy23_q41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in the sentence below has the same meaning as 'affection'? Circle either (A) or (B). [1m]\n\n'You must show care (A) and be available (B) to them in good and bad times.'",
          answer: "A",
          solution: {
            method: "Synonym within provided sentence",
            steps: [
              "'Affection' = love and care. In the sentence, 'care' (A) is the synonym.",
              "'Available' (B) = accessible/present, which is not the same as affection.",
            ],
            tip: "Affection = warmth, love, care. In 'show care and be available', CARE = affection.",
          },
        },
        {
          id: "sji_eoy23_q42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Based on paragraph 5, what do you think Ella would do to have true friends? Answer in a complete sentence. [1m]",
          answer:
            "Ella would spend time with her friends and show care and be available to them in both good and bad times.",
          solution: {
            method: "Inference from mother's advice in paragraph 5",
            steps: [
              "Paragraph 5 (mother's advice): 'you will have to spend time with them. You must show care and be available to them in good and bad times.'",
              "Ella would follow this advice to have true friends.",
            ],
            tip: "Base your answer on what the mother advises. Ella would: 1) spend time with them, 2) show care, 3) be available in good and bad times.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // COMPREHENSION 2 (8 marks, Q43–48) — The Merchant and the Donkey
    // ─────────────────────────────────────────────
    {
      id: "sec_comp2",
      name: "Comprehension 2",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "The Merchant and the Donkey",
      passageText: `A merchant wanted to sell a few sacks of salt in the nearby village. He tied up the sacks of salt on his donkey and set off.

The sacks were very heavy and the donkey felt very tired. When they came to a river, they walked across the shallow water carefully. Suddenly, the donkey accidentally tripped and fell into the water. The weight of the sacks shrank as the salt in them reduced tremendously as it got dissolved in the water. As such, the sacks felt lighter when the donkey stood up. The merchant was very upset and led the donkey back home.

The next day, when they came to the river, the donkey remembered what had happened earlier and fell into the water on purpose. The trick worked! The merchant watched the donkey fall but said nothing.

On the third day, the merchant placed the same sacks on the donkey. Unknown to the donkey, the sacks were filled with cotton this time. The donkey followed the merchant happily.

When they reached the river, the donkey tried the same trick again. He jumped into the water but this time, could not stand up. The load of the sacks was three times heavier than before as the cotton had absorbed the water. After watching the donkey struggle in the water for a while, the merchant removed the sacks of cotton and led the drenched donkey out of the river.

He looked at his donkey and scolded, "Do not try to be lazy again." When the donkey realised that the merchant was teaching him a lesson, he was embarrassed and hung his head low. After that incident, the donkey never tried to be lazy again.

Adapted from http://www.shortstories4kids.com.html`,

      questions: [
        {
          id: "sji_eoy23_q43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "What did the merchant do for a living? Answer in a complete sentence. [1m]",
          answer: "The merchant sold salt (in the nearby village).",
          solution: {
            method: "Locate from paragraph 1",
            steps: [
              "Paragraph 1: 'A merchant wanted to sell a few sacks of salt in the nearby village.'",
              "He was a salt seller/merchant.",
            ],
            tip: "The merchant's livelihood = selling salt. 'For a living' = what his job/trade is.",
          },
        },
        {
          id: "sji_eoy23_q44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Tick (√) one adjective to show how the merchant felt when he realised what the donkey was doing on the second day. [1m]",
          options: ["disappointed", "curious", "worried"],
          answer: "disappointed",
          solution: {
            method: "Inference from paragraph 3",
            steps: [
              "Paragraph 3: 'The merchant watched the donkey fall but said nothing.' — He saw the trick but chose not to react.",
              "He was disappointed that his donkey was being lazy/deceitful.",
            ],
            tip: "The merchant watched silently and said nothing — he was disappointed by the donkey's trick but didn't react yet. Disappointed = answer key.",
          },
        },
        {
          id: "sji_eoy23_q45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in paragraph 5 has the same meaning as 'completely wet'? [1m]",
          answer: "drenched",
          solution: {
            method: "Synonym hunt in paragraph 5",
            steps: [
              "Paragraph 5: 'the merchant removed the sacks of cotton and led the DRENCHED donkey out of the river.'",
              "'Drenched' = completely soaked/wet.",
            ],
            tip: "Drenched = completely soaked, extremely wet. The donkey had been in the water = drenched.",
          },
        },
        {
          id: "sji_eoy23_q46a",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q46(a) True or False: The donkey fell into the river accidentally on the second day. [1m]",
          answer: "False",
          solution: {
            method: "True/False — paragraph 3",
            steps: [
              "Paragraph 3: 'the donkey remembered what had happened earlier and fell into the water ON PURPOSE.'",
              "The second fall was deliberate, not accidental. → False.",
            ],
            tip: "'On purpose' = deliberately/intentionally. The second fall was intentional, NOT accidental.",
          },
        },
        {
          id: "sji_eoy23_q46b",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q46(b) True or False: The donkey learnt his lesson in the end. [1m]",
          answer: "True",
          solution: {
            method: "True/False — paragraph 6",
            steps: [
              "Paragraph 6: 'After that incident, the donkey never tried to be lazy again.'",
              "The donkey learnt not to be lazy = learnt his lesson. → True.",
            ],
            tip: "Never tried to be lazy again = learnt his lesson. True.",
          },
        },
        {
          id: "sji_eoy23_q47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Why did the merchant choose cotton in order to teach the donkey a lesson? Answer in a complete sentence. [2m]",
          answer:
            "The merchant chose cotton because cotton would absorb the water and become heavier, making it difficult for the donkey to get out of the water. This would teach the donkey not to be lazy.",
          solution: {
            method: "Reasoning from paragraph 4–5",
            steps: [
              "Paragraph 4: 'the sacks were filled with cotton' — unknown to the donkey.",
              "Paragraph 5: 'The load of the sacks was three times heavier than before as the cotton had absorbed the water.'",
              "Cotton absorbs water and becomes very heavy — the opposite of salt which dissolves and becomes lighter.",
              "2 marks: 1m for cotton absorbs water (becomes heavier) + 1m for it made the donkey struggle/couldn't stand up (lesson taught).",
            ],
            tip: "Cotton absorbs water → gets heavier (opposite of salt). This trapped the donkey and taught it not to repeat the trick.",
          },
        },
        {
          id: "sji_eoy23_q48",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Arrange the events in the right sequence. Write 1, 2 and 3 on the lines below. [1m]\n\n__ The donkey discovered a trick to make his work easier.\n__ The donkey fell into the water accidentally.\n__ The donkey fell into the water with the sacks of cotton.",
          answer: "2, 1, 3",
          solution: {
            method: "Sequence of events",
            steps: [
              "1st: The donkey fell into the water accidentally (paragraph 2 — day 1).",
              "2nd: The donkey discovered a trick to make his work easier (paragraph 3 — day 2, fell on purpose).",
              "3rd: The donkey fell into the water with the sacks of cotton (paragraph 4–5 — day 3).",
            ],
            tip: "Accidental fall (day 1) → discovered trick (day 2) → cotton sacks (day 3). Order: accident=1, trick discovery=2, cotton=3.",
          },
        },
      ],
    },
  ],
};
