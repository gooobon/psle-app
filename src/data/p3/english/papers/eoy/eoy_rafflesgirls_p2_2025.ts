// ============================================================
// RAFFLES GIRLS' PRIMARY SCHOOL
// END-OF-YEAR EXAMINATION (EOY) 2023
// PRIMARY 3 — ENGLISH LANGUAGE PAPER 2
// Date: 23 October 2023 | Total: 50 marks | Time: 1h 15min
// Sections A (Grammar MCQ) · B (Vocab MCQ) · C (Vocab Cloze) ·
//          D (Grammar Cloze) · E (Comprehension 1 OE) · F (Comprehension 2 OE)
// ============================================================

import { QuestionSet } from "@/types/questions";

export const eoy_rafflesgirls_p2_2025: QuestionSet = {
  id: "eoy_rafflesgirls_p2_2025",
  school: "Raffles Girls' Primary School",
  level: "P3",
  subject: "English",
  year: 2023,
  exam: "EOY",
  paper: 2,
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // SECTION A: GRAMMAR MCQ (10 marks, Q1–10)
    // ─────────────────────────────────────────────
    {
      id: "sec_a",
      name: "Section A: Grammar",
      topic: "GrammarMCQ",
      marks: 10,
      questions: [
        {
          id: "rafflesgirls_eoy23_q1",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "__________ magazines over there can be sent to the recycling centre to be recycled.",
          options: ["This", "That", "These", "Those"],
          answer: 4,
          solution: {
            method: "Demonstrative adjectives – near vs far, count",
            steps: [
              "'Magazines' is plural. Eliminate 'This' (singular-near) and 'That' (singular-far).",
              "'Over there' indicates something far away — use 'Those' (plural + far).",
              "'These' = plural but near; 'Those' = plural and far. Answer: Those.",
            ],
            tip: "This/These = near | That/Those = far | This/That = singular | These/Those = plural.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q2",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"The bouquet of flowers __________ to be presented to the guest-of-honour. Can you please have it ready?" asked the emcee.',
          options: ["is", "are", "was", "were"],
          answer: 1,
          solution: {
            method: "Subject-verb agreement – collective noun phrase",
            steps: [
              "The subject is 'The bouquet of flowers'. 'Bouquet' is singular (the flowers is just a prepositional phrase).",
              "Use 'is' for singular subject. The event is happening now/soon, so present tense is appropriate.",
              "'is' — singular present. Correct.",
            ],
            tip: "In 'The [noun] of [noun]' phrases, the verb agrees with the FIRST noun. 'A bouquet of flowers IS' (bouquet is singular).",
          },
        },
        {
          id: "rafflesgirls_eoy23_q3",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "The students completed the art project by __________.",
          options: ["itself", "himself", "ourselves", "themselves"],
          answer: 4,
          solution: {
            method: "Reflexive pronoun – subject agreement",
            steps: [
              "Subject = 'The students' (plural, third person). Reflexive = 'themselves'.",
              "'Itself' = it (singular non-person), 'himself' = singular male, 'ourselves' = we.",
            ],
            tip: "They/students → themselves. Match reflexive pronoun to the subject's person and number.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q4",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Michael was punctual for the meeting, __________ he?",
          options: ["is", "was", "isn't", "wasn't"],
          answer: 4,
          solution: {
            method: "Question tags",
            steps: [
              "The main clause is 'Michael was punctual for the meeting' (positive statement, past tense 'was').",
              "Question tag = opposite auxiliary (negative) + same tense + pronoun for subject.",
              "Subject 'Michael' → pronoun 'he'. Verb 'was' → negative tag 'wasn't'.",
              "Answer: 'wasn't he?' ",
            ],
            tip: "Positive statement → negative tag. Negative statement → positive tag. Match the tense: was → wasn't he?",
          },
        },
        {
          id: "rafflesgirls_eoy23_q5",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "The hungry boy ate his food __________.",
          options: ["greedy", "greedily", "greedier", "greediest"],
          answer: 2,
          solution: {
            method: "Adjective vs Adverb",
            steps: [
              "'Ate' is a verb — it must be modified by an adverb, not an adjective.",
              "The adverb form of 'greedy' is 'greedily' (replace -y with -ily).",
              "'Greedy' = adjective (modifies noun), 'greedier/greediest' = comparative/superlative adjectives.",
            ],
            tip: "Adverbs modify verbs. To form adverbs ending in -y: drop -y and add -ily. Greedy → greedily.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q6",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Helen did not miss the school bus __________ she overslept.",
          options: ["if", "so", "while", "although"],
          answer: 4,
          solution: {
            method: "Conjunction – contrast/concession",
            steps: [
              "Two contrasting ideas: she overslept (expected to miss bus) BUT she did not miss the bus.",
              "'Although' introduces a contrast/concession clause.",
              "'If' = condition; 'so' = result/consequence; 'while' = simultaneous time.",
            ],
            tip: "Although/even though = despite the fact that. Use when two clauses contrast each other.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "As the children __________ ready for bed, they heard a loud clap of thunder.",
          options: ["get", "getting", "are getting", "were getting"],
          answer: 4,
          solution: {
            method: "Past continuous – background action",
            steps: [
              "The main event (heard thunder) is in the simple past.",
              "The background ongoing action ('as they were getting ready') uses past continuous.",
              "'As' + past continuous describes an ongoing action interrupted by another event.",
            ],
            tip: "'As + past continuous' describes an activity in progress when another thing happened. 'As they WERE GETTING ready, they HEARD thunder.'",
          },
        },
        {
          id: "rafflesgirls_eoy23_q8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Father is going to be home later than usual as he still has __________ work to complete.",
          options: ["few", "little", "many", "a lot of"],
          answer: 4,
          solution: {
            method: "Quantifiers – countable vs uncountable",
            steps: [
              "'Work' is an uncountable noun. Eliminate 'few' and 'many' (used with countable nouns).",
              "'Little' = small amount (uncountable) — possible but has a negative/limiting connotation.",
              "'A lot of' = large amount — matches 'coming home late' because there is a large amount of work.",
            ],
            tip: "'A lot of' works with both countable and uncountable nouns. 'Little' = small amount (often implies not enough); 'a lot of' = large amount.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            'Aini said, "Mother, __________ called you on the phone just now but I cannot remember her name now."',
          options: ["nobody", "anybody", "somebody", "everybody"],
          answer: 3,
          solution: {
            method: "Indefinite pronouns",
            steps: [
              "Aini knows someone called but cannot remember the name — so the caller exists (not nobody).",
              "'Somebody' = an unidentified person (exists but unknown identity).",
              "'Nobody' = no one; 'anybody' = used in questions/negatives; 'everybody' = all people.",
            ],
            tip: "Somebody/someone = a person (exists but unknown). Nobody = no one. Anybody = in questions/negatives. Everybody = all.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The Presidential Election was scheduled __________ 1 September 2023 so it was declared a public holiday.",
          options: ["in", "at", "of", "on"],
          answer: 4,
          solution: {
            method: "Preposition of time – specific date",
            steps: [
              "We use 'on' with specific dates: on 1 September 2023.",
              "'In' = months/years/seasons; 'at' = times of day/specific points; 'of' = possession.",
            ],
            tip: "ON + specific date (on 1 September, on Monday). IN + month/year/season. AT + time of day.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B: VOCABULARY MCQ (6 marks, Q11–16)
    // ─────────────────────────────────────────────
    {
      id: "sec_b",
      name: "Section B: Vocabulary",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "rafflesgirls_eoy23_q11",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The dirty table must be cleaned or it will __________ ants.",
          options: ["repel", "resist", "attract", "accept"],
          answer: 3,
          solution: {
            method: "Vocabulary in context",
            steps: [
              "A dirty table draws ants towards it — 'attract' means to draw something closer.",
              "'Repel' = drive away (opposite), 'resist' = withstand/refuse, 'accept' = take/receive.",
            ],
            tip: "Attract = draw towards. Repel = push away. These are opposites. Dirty things attract pests.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q12",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The two sisters are always seen doing things together. They are __________.",
          options: ["inactive", "inefficient", "inseparable", "inappropriate"],
          answer: 3,
          solution: {
            method: "Vocabulary – word meaning",
            steps: [
              "'Inseparable' means always together, impossible to separate — matches 'always seen doing things together'.",
              "'Inactive' = not active, 'inefficient' = not productive, 'inappropriate' = unsuitable.",
            ],
            tip: "Inseparable = always together (literally 'cannot be separated'). Common collocations: inseparable friends, inseparable pair.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q13",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "John accidentally dropped his toy in the deep, dirty pond and it sank. He could not see where it was as the water was __________.",
          options: ["clear", "clean", "murky", "uncovered"],
          answer: 3,
          solution: {
            method: "Vocabulary in context",
            steps: [
              "The pond is 'deep and dirty' — dirty water is dark and opaque, making it hard to see through.",
              "'Murky' = dark, dirty, and hard to see through. Perfectly describes dirty pond water.",
              "'Clear/clean' = opposite of dirty; 'uncovered' = without a cover (unrelated).",
            ],
            tip: "Murky = dark, dirty, difficult to see through. Used for water, weather, or situations that are unclear.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q14",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Jill raced to school as she was late and perspired __________ along the way, soaking her entire blouse in no time.",
          options: ["hardly", "slightly", "leisurely", "profusely"],
          answer: 4,
          solution: {
            method: "Adverb intensity matching context",
            steps: [
              "'Soaking her entire blouse' suggests extreme sweating — a large amount.",
              "'Profusely' = in large amounts/excessively. 'Perspired profusely' = sweated a lot.",
              "'Hardly' = barely; 'slightly' = a little; 'leisurely' = slowly and relaxed (opposite of racing).",
            ],
            tip: "Profusely = excessively/in large quantities. Used with sweat, bleed, apologise. Match the intensity to context.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q15",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Eating well gives our bodies the nutrients that we need to keep us __________.",
          options: ["unfit", "healthy", "famished", "absorbed"],
          answer: 2,
          solution: {
            method: "Vocabulary in context",
            steps: [
              "Eating well and getting nutrients is associated with being 'healthy'.",
              "'Unfit' = not in good health (opposite), 'famished' = extremely hungry, 'absorbed' = soaked up or deeply interested.",
            ],
            tip: "Nutrition → health. Eating the right food → staying healthy. A straightforward vocabulary-in-context question.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q16",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "He was __________ to tell his mother that he had broken her favourite vase for fear of getting scolded.",
          options: ["thrilled", "furious", "hopeful", "reluctant"],
          answer: 4,
          solution: {
            method: "Emotion vocabulary in context",
            steps: [
              "'For fear of getting scolded' means he was afraid and did not want to confess.",
              "'Reluctant' = unwilling to do something. He was reluctant to tell because he feared being scolded.",
              "'Thrilled' = excited (positive), 'furious' = very angry, 'hopeful' = optimistic.",
            ],
            tip: "Reluctant = unwilling, hesitant. Often followed by 'to + verb'. 'Reluctant to tell' = did not want to tell.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C: VOCABULARY CLOZE (8 marks, Q17–24)
    // ─────────────────────────────────────────────
    {
      id: "sec_c",
      name: "Section C: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 8,
      questions: [
        {
          id: "rafflesgirls_eoy23_q17_24",
          type: "B",
          topic: "VocabCloze",
          marks: 8,
          passageTitle: "The African Starfish Flower",
          wordBank: [
            "(A) animal",
            "(B) distance",
            "(C) drop",
            "(D) fall",
            "(E) fresh",
            "(F) look",
            "(G) plant",
            "(H) rotting",
            "(J) smell",
            "(K) survival",
            "(L) touch",
            "(M) wonders",
          ],
          instruction:
            "Read the story carefully. Choose the correct word from the words given in the box and write its letter (A to M) in each blank. The letter 'I' has been omitted in order to avoid confusion during marking.",
          passageText:
            "The African Starfish Flower has beautiful flowers. However, do not (17) __________ in love with these beautiful flowers. The African Starfish Flower is an interesting (18) __________ that is also known for its unpleasant (19) __________ . Among the country people, it is known locally as decaying flower. It smells like (20) __________ meat. It also has a colour that could (21) __________ very much like a decaying animal! This works (22) __________ for attracting pollinators to its flowers, even from a great (23) __________ . Unfortunately, this unusual plant is a threatened species. Its damaged habitat is a threat to its (24) __________. This has been an issue for the local people who use the plant as a treatment for some illnesses.",
          blanks: [
            {
              number: 17,
              answer: "D",
              word: "fall",
              solution: {
                method: "Fixed phrase: fall in love",
                steps: [
                  "'Fall in love' is a fixed English idiom meaning to begin to love something/someone.",
                  "The sentence warns not to 'fall in love' with the flowers (they have an unpleasant smell).",
                ],
                tip: "Fall in love = begin to love. This is a fixed phrase — do not replace 'fall' with any other word.",
              },
            },
            {
              number: 18,
              answer: "G",
              word: "plant",
              solution: {
                method: "Context: African Starfish Flower is a plant",
                steps: [
                  "The African Starfish Flower is described as a flower — it is a plant.",
                  "The blank follows 'an interesting' and describes what the Starfish Flower is.",
                ],
                tip: "Context: The whole passage is about the African Starfish Flower. It is a plant.",
              },
            },
            {
              number: 19,
              answer: "J",
              word: "smell",
              solution: {
                method: "Context: known for unpleasant odour",
                steps: [
                  "The next sentence says 'It smells like rotting meat' — so its unpleasant characteristic is its smell.",
                  "'Smell' = the scent/odour of something.",
                ],
                tip: "Look ahead: 'It smells like rotting meat' directly tells us the unpleasant characteristic is its smell.",
              },
            },
            {
              number: 20,
              answer: "H",
              word: "rotting",
              solution: {
                method: "Context: smells like ___ meat",
                steps: [
                  "The passage says it smells like 'decaying flower' and a 'decaying animal'.",
                  "'Rotting meat' = meat that is decomposing. 'Rotting' = decaying.",
                ],
                tip: "Rotting = decaying = decomposing. Rotting/decaying meat has a terrible smell.",
              },
            },
            {
              number: 21,
              answer: "F",
              word: "look",
              solution: {
                method: "Verb of appearance",
                steps: [
                  "'Has a colour that could look very much like a decaying animal' — using the verb of appearance.",
                  "'Look like' = resemble in appearance.",
                ],
                tip: "'Look like' = resemble. The flower's colour makes it look like a rotting animal.",
              },
            },
            {
              number: 22,
              answer: "M",
              word: "wonders",
              solution: {
                method: "Phrase: works wonders",
                steps: [
                  "'Works wonders for attracting pollinators' = is very effective at attracting pollinators.",
                  "'Work wonders' is a fixed phrase meaning 'to be very effective'.",
                ],
                tip: "'Work wonders' = to be extremely effective/successful at something. Fixed phrase.",
              },
            },
            {
              number: 23,
              answer: "B",
              word: "distance",
              solution: {
                method: "Context: attracts from far away",
                steps: [
                  "'Attracting pollinators from a great distance' — the strong smell draws insects from far away.",
                  "'Distance' = how far away something is.",
                ],
                tip: "From a great distance = from far away. The powerful smell attracts insects even from far.",
              },
            },
            {
              number: 24,
              answer: "K",
              word: "survival",
              solution: {
                method: "Context: habitat destruction threatens the plant",
                steps: [
                  "'Damaged habitat is a threat to its survival' — habitat loss endangers the plant's ability to survive.",
                  "'Survival' = the ability to continue to live/exist.",
                ],
                tip: "Threatened species face danger to their survival. Habitat loss → reduced chance of survival.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D: GRAMMAR CLOZE (8 marks, Q25–32)
    // ─────────────────────────────────────────────
    {
      id: "sec_d",
      name: "Section D: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 8,
      questions: [
        // Cloze Passage 1 (Q25–28): Tammy the Reader
        {
          id: "rafflesgirls_eoy23_q25_28",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Tammy the Reader (Passage 1)",
          wordBank: [
            "(A) has written",
            "(B) have written",
            "(C) is writing",
            "(D) write",
            "(E) writes",
            "(F) writing",
            "(G) written",
            "(H) wrote",
          ],
          passageText:
            "Tammy loves to read during her leisure time. Reading improves her language skills and helps her to (25) __________ good poems and short stories. Two years ago, she (26) __________ her first story. She was so delighted when it was chosen to be published in her school magazine. Since then, she has not stopped (27) __________ . Her stories are always very interesting and informative. She (28) __________ more than ten short stories. Many people enjoy reading Tammy's stories.",
          blanks: [
            {
              number: 25,
              answer: "D",
              word: "write",
              solution: {
                method: "Infinitive after 'helps her to'",
                steps: [
                  "'Helps her to write' — after 'to', use the base form (infinitive) of the verb.",
                ],
                tip: "'Help [someone] to + base verb' or 'help [someone] + base verb'. Both are correct. 'To write' = infinitive.",
              },
            },
            {
              number: 26,
              answer: "H",
              word: "wrote",
              solution: {
                method: "Simple past — specific past time",
                steps: [
                  "Time clue: 'Two years ago' — specific past time → simple past tense.",
                  "Past tense of 'write' = 'wrote' (irregular).",
                ],
                tip: "Irregular past tense: write → wrote. Time clue 'ago' always signals simple past.",
              },
            },
            {
              number: 27,
              answer: "F",
              word: "writing",
              solution: {
                method: "Gerund after 'stopped'",
                steps: [
                  "'Has not stopped writing' — after 'stop', use the gerund (-ing form) when describing the action that ceased.",
                  "Stop + gerund = ceased doing that action.",
                ],
                tip: "'Stop + -ing' = ceased doing it. 'Stop to do' = pause in order to do something else. 'Has not stopped writing' = still writing.",
              },
            },
            {
              number: 28,
              answer: "A",
              word: "has written",
              solution: {
                method: "Present perfect — achievement with present relevance",
                steps: [
                  "'Has written more than ten short stories' — an achievement accumulated up to now (no specific time given).",
                  "Present perfect = past action with present relevance.",
                ],
                tip: "Present perfect = has/have + past participle. Used for achievements, experiences, or actions with present relevance. Written = past participle of write.",
              },
            },
          ],
        },

        // Cloze Passage 2 (Q29–32): Waiting for the bus
        {
          id: "rafflesgirls_eoy23_q29_32",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Waiting for the Bus (Passage 2)",
          wordBank: [
            "(A) because",
            "(B) but",
            "(C) or",
            "(D) so",
            "(E) unless",
            "(F) until",
            "(G) whether",
          ],
          passageText:
            "Two days ago, I was waiting to take a bus to school at the bus stop. While waiting, I wondered if I should read the book I was holding in my hand (29) __________ listen to music. I finally decided to read (30) __________ the book was more exciting than the music. Thus, I opened the book and started reading. I continued reading (31) __________ the arrival of the bus. The bus was rather crowded (32) __________ I still managed to get a seat. I took out the book and started reading it again.",
          blanks: [
            {
              number: 29,
              answer: "C",
              word: "or",
              solution: {
                method: "Conjunction – presenting alternatives",
                steps: [
                  "'Whether to read the book OR listen to music' — 'or' presents two alternatives/choices.",
                  "The structure is '[option 1] or [option 2]'.",
                ],
                tip: "'Or' connects alternatives/choices. 'Should I do X or Y?' — deciding between two options.",
              },
            },
            {
              number: 30,
              answer: "A",
              word: "because",
              solution: {
                method: "Conjunction – reason/cause",
                steps: [
                  "'Decided to read BECAUSE the book was more exciting' — reason for the decision.",
                  "'Because' introduces the cause/reason clause.",
                ],
                tip: "'Because' = reason/cause. Always answers 'Why?' questions. 'I did X because [reason]'.",
              },
            },
            {
              number: 31,
              answer: "F",
              word: "until",
              solution: {
                method: "Conjunction – up to a point in time",
                steps: [
                  "'Continued reading until the arrival of the bus' — reading kept going up to the moment the bus arrived.",
                  "'Until' = up to a specific time or event.",
                ],
                tip: "'Until' = up to a certain time/event. 'I read until the bus came' = I stopped when the bus came.",
              },
            },
            {
              number: 32,
              answer: "B",
              word: "but",
              solution: {
                method: "Conjunction – contrast",
                steps: [
                  "'The bus was crowded BUT I still managed to get a seat' — contrast between expected result (no seat) and actual result (got a seat).",
                  "'But' introduces a contrast/unexpected result.",
                ],
                tip: "'But' = contrast. Expected: crowded bus = no seat. Actual: managed to get a seat. These contrast → use 'but'.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E: OPEN-ENDED COMPREHENSION 1 (8 marks, Q33–39)
    // ─────────────────────────────────────────────
    {
      id: "sec_e",
      name: "Section E: Open-ended Comprehension 1",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "The Farmer and the Donkey",
      passageText: `There was a poor farmer who was unhappy about his hard life. One day, his donkey fell down into a well. The animal cried miserably for hours as the farmer thought of a solution.

Finally, the donkey stopped crying. The farmer tried calling it repeatedly but there was no response. He concluded that the donkey was no longer alive due to its injuries. He decided to just bury the donkey in the well.

The farmer invited his neighbours to help him, and they began to shovel, scooping and throwing soil into the well. Many shovel loads later, the farmer looked down the well. He was astonished at what he saw. He could now see the donkey standing higher in the well. With each shovel of soil that hit its back, the donkey would shake it off and step on it.

As the men continued to shovel soil on top of the animal, the donkey would shake it off and climb higher. Finally, the donkey brayed upon seeing that the soil had piled on high enough for it to walk over the edge of the well and trot off!

The donkey made the farmer realise that he could get out of the deepest wells by never giving up.`,

      questions: [
        {
          id: "rafflesgirls_eoy23_q33",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Based on paragraph 1, tick the best answer that describes the reason the farmer was unhappy. (1m)",
          options: [
            "His life was hard.",
            "His donkey fell into the well.",
            "He heard his donkey cry for hours.",
          ],
          answer: 1,
          solution: {
            method: "Locate specific information in paragraph",
            steps: [
              "Paragraph 1: 'a poor farmer who was unhappy about his hard life' — the reason is his hard life.",
              "The donkey falling is a separate event that happened later.",
            ],
            tip: "Re-read carefully. The question says 'reason the farmer was unhappy' — this refers to his life being hard, not the donkey incident.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q34",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            'In paragraph 1, which word has the same meaning as "sadly"? (1m)',
          answer: "miserably",
          solution: {
            method: "Synonym hunt in specific paragraph",
            steps: [
              "Paragraph 1: 'The animal cried miserably for hours'.",
              "'Miserably' = sadly, in a miserable/unhappy manner.",
            ],
            tip: "'Miserably' and 'sadly' both describe crying with great unhappiness.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "In paragraph 2, what made the farmer think that the donkey was not alive? (2m)",
          answer:
            "i) The donkey stopped crying / there was no sound from the donkey.\nii) The donkey did not respond when the farmer called it repeatedly.",
          solution: {
            method: "List two reasons from paragraph 2",
            steps: [
              "Reason 1: 'the donkey stopped crying' — no more sound.",
              "Reason 2: 'The farmer tried calling it repeatedly but there was no response' — no response to calling.",
              "Both reasons led the farmer to conclude the donkey was dead.",
            ],
            tip: "2-mark questions usually require TWO pieces of evidence. List them clearly as i) and ii).",
          },
        },
        {
          id: "rafflesgirls_eoy23_q36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "For questions 36 to 38, read each statement and tick (✓) 'True' or 'False'. Refer to paragraph 3 to help you. (3m)\n\nQ36: The farmer was surprised to see the donkey still alive. True or False?",
          answer: "True",
          solution: {
            method: "True/False with text evidence",
            steps: [
              "Paragraph 3: 'He was astonished at what he saw' — astonished = very surprised.",
              "He expected the donkey to be dead, so seeing it alive was surprising.",
            ],
            tip: "'Astonished' = very surprised/shocked. The farmer did not expect the donkey to be alive.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q37: After the donkey shook off the soil, it would step on the shovel. True or False?",
          answer: "False",
          solution: {
            method: "True/False — careful reading",
            steps: [
              "Paragraph 3: 'the donkey would shake it off and step on it' — 'it' refers to the SOIL, not the shovel.",
              "The donkey stepped on the soil, not the shovel.",
            ],
            tip: "Referencing pronouns carefully is key. 'Step on it' — 'it' = the soil that was shaken off.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q38",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q38: The farmer's neighbours helped the farmer shovel soil into the well. True or False?",
          answer: "True",
          solution: {
            method: "True/False — locate information",
            steps: [
              "Paragraph 3: 'The farmer invited his neighbours to help him, and they began to shovel, scooping and throwing soil into the well.'",
              "This directly confirms that neighbours helped shovel soil.",
            ],
            tip: "Directly stated in paragraph 3. The neighbours helped shovel soil into the well.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q39",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "For question 39, tick (✓) your chosen answer. (1m)\nFrom the passage, we can conclude that the donkey was a __________ animal.",
          options: ["fierce", "friendly", "determined"],
          answer: "determined",
          solution: {
            method: "Character inference",
            steps: [
              "The donkey kept shaking off soil and stepping higher despite being trapped in a well.",
              "It never gave up — this shows determination.",
              "Paragraph 5: 'he could get out of the deepest wells by never giving up' — this is the lesson from the donkey's behaviour.",
            ],
            tip: "Determined = not giving up despite difficulties. The donkey's behaviour (shake off, step up, climb higher) shows determination.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F: OPEN-ENDED COMPREHENSION 2 (10 marks, Q40–48)
    // ─────────────────────────────────────────────
    {
      id: "sec_f",
      name: "Section F: Open-ended Comprehension 2",
      topic: "ComprehensionOE",
      marks: 10,
      passageTitle: "The Hero of the Esplanade",
      passageText: `A little drama in the sea off the Esplanade on Sunday had made a hero out of a tourist from Malaysia.

When the Malaysian, Mr Lou, saw a woman fall into the water near the Merlion statue that evening, he removed his shoes and jumped in after her.

By the time the police, the ambulance and the Singapore Civil Defence Force arrived at the scene, he had already made it to safety with the woman and was climbing out of the water with her.

Mr Lou told the reporters that he was taking a leisure walk with his friends after dinner when he spotted the woman perching on the railing and taking a selfie. He yelled out to her that it was dangerous to do that, but it was too late.

"When I looked into the water, I saw her struggling to keep afloat. I realised immediately that she could not swim," Mr Lou said. He was not aware that his feet were bleeding from the cuts he had picked up from stepping on the rough stones on the water edge while getting out of the water.

The woman was very fortunate to escape unharmed. However, she was embarrassed by her careless action.

Mr Lou was taken to the hospital where the nurses dressed his wounds. He was also given an injection to make sure that there would be no infection. The woman paid for his medical expenses and said that it was the least she could do for saving her life.

Adapted from The Straits Times 16 February 2009`,

      questions: [
        {
          id: "rafflesgirls_eoy23_q40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "In paragraph 1, when did the little drama in the sea off the Esplanade happen? (1m)",
          answer: "The little drama happened on Sunday (evening).",
          solution: {
            method: "Locate specific time information",
            steps: [
              "Paragraph 1: 'A little drama in the sea off the Esplanade on Sunday'.",
              "The time was Sunday. Paragraph 4 adds 'that evening'.",
            ],
            tip: "Time clues are found directly in the text. 'On Sunday' = day of the event.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q41: Mr Lou was not injured after saving the woman. True or False? Give a reason for your answer. (1m)",
          answer:
            "False. Mr Lou's feet were bleeding from cuts he picked up from stepping on the rough stones on the water edge while getting out of the water.",
          solution: {
            method: "True/False with reason — evidence from paragraph 5",
            steps: [
              "Paragraph 5: 'his feet were bleeding from the cuts he had picked up from stepping on the rough stones on the water edge'.",
              "He WAS injured — his feet were cut and bleeding.",
            ],
            tip: "Always give a reason for True/False answers when asked. Quote or paraphrase from the text.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q42: Mr Lou tried to warn the woman of the danger of falling into the water. True or False? Give a reason for your answer. (1m)",
          answer:
            "True. Mr Lou yelled out to the woman that it was dangerous to do that (perch on the railing) when he saw her, but it was too late.",
          solution: {
            method: "True/False with reason — evidence from paragraph 4",
            steps: [
              "Paragraph 4: 'He yelled out to her that it was dangerous to do that, but it was too late.'",
              "He did try to warn her — the statement is TRUE.",
            ],
            tip: "True — directly stated in paragraph 4. He yelled a warning but she fell before she could act on it.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q43: The police arrived at the scene just in time to help Mr Lou and the woman out of the water. True or False? Give a reason for your answer. (1m)",
          answer:
            "False. By the time the police, the ambulance and the Singapore Civil Defence Force arrived at the scene, Mr Lou had already made it to safety with the woman and was climbing out of the water with her.",
          solution: {
            method: "True/False — timing comparison",
            steps: [
              "Paragraph 3: 'By the time the police, the ambulance and the Singapore Civil Defence Force arrived… he had already made it to safety with the woman'.",
              "The police arrived AFTER Mr Lou had already saved the woman. So they did NOT help in time.",
            ],
            tip: "'By the time X arrived, Y had already...' = X was too late. The police arrived after the rescue.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "For question 44, tick (✓) your chosen answer. (1m)\nWhat does the little drama that took place in the sea of the Esplanade refer to? It refers to a woman __________.",
          options: [
            "taking a selfie",
            "falling into the water",
            "getting treatment at the hospital",
          ],
          answer: "falling into the water",
          solution: {
            method: "Identify what the 'drama' refers to",
            steps: [
              "The 'little drama' is the incident where a woman fell into the sea.",
              "Paragraph 2 describes the event: 'Mr Lou saw a woman fall into the water near the Merlion statue'.",
            ],
            tip: "Drama/incident = the main exciting event. The woman falling into water is the central drama.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in the passage. (1m)\n\n__ Mr Lou was taken to the hospital.\n__ Mr Lou had dinner and went for a stroll with his friends.\n__ Mr Lou took off his shoes before jumping into the water.",
          answer: "3, 1, 2",
          solution: {
            method: "Sequence of events",
            steps: [
              "1st: Mr Lou had dinner and went for a stroll with his friends (paragraph 4).",
              "2nd: Mr Lou took off his shoes before jumping into the water (paragraph 2).",
              "3rd: Mr Lou was taken to the hospital (paragraph 7).",
              "Order: stroll → shoes off/jump → hospital. Boxes: Mr Lou at hospital = 3, Dinner/stroll = 1, Took off shoes = 2.",
            ],
            tip: "Track the story chronologically. Dinner → walked → spotted woman → jumped in → rescued → hospital.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "For question 46, tick (✓) your chosen answer. (1m)\nWhich adjective best describes Mr Lou?",
          options: ["brave", "selfish", "unfriendly"],
          answer: "brave",
          solution: {
            method: "Character description — inference",
            steps: [
              "Mr Lou jumped into the sea to save a stranger, even injuring himself in the process.",
              "This shows bravery — courage despite danger.",
              "'Selfish' = caring only about oneself (opposite), 'unfriendly' = not kind (opposite).",
            ],
            tip: "Brave = shows courage in the face of danger. Jumping in to save a drowning stranger is brave.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question: "Who paid for Mr Lou's medical expenses? (1m)",
          answer:
            "The woman (who had fallen into the water) paid for Mr Lou's medical expenses.",
          solution: {
            method: "Locate specific information",
            steps: [
              "Paragraph 7: 'The woman paid for his medical expenses and said that it was the least she could do for saving her life.'",
            ],
            tip: "Directly stated in paragraph 7. The woman paid because Mr Lou saved her life.",
          },
        },
        {
          id: "rafflesgirls_eoy23_q48",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Answer question 48 in a complete sentence. (2m)\nWhat two types of medical treatment did Mr Lou receive at the hospital?",
          answer:
            "At the hospital, the nurses dressed Mr Lou's wounds and he was also given an injection to make sure there would be no infection.",
          solution: {
            method: "List two treatments from paragraph 7",
            steps: [
              "Paragraph 7: 'the nurses dressed his wounds' — Treatment 1: wound dressing.",
              "Paragraph 7: 'He was also given an injection to make sure that there would be no infection' — Treatment 2: injection.",
            ],
            tip: "2-mark question = 2 pieces of information. Treatment 1: wound dressing. Treatment 2: injection against infection.",
          },
        },
      ],
    },
  ],
};
