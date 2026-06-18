// ============================================================
// SINGAPORE CHINESE GIRLS' SCHOOL (SCGS)
// END-OF-YEAR EXAMINATION (SA2) 2023
// PRIMARY 3 — ENGLISH LANGUAGE PAPER 2
// LANGUAGE USE AND COMPREHENSION
// Date: 26 October 2023 | Total: 50 marks | Time: 1h 15min
// Booklet A: 14 marks (MCQ, OAS) | Booklet B: 36 marks (Written)
// Sections A (VocabMCQ) · B (GrammarMCQ) · C (GrammarCloze) ·
//          D (VocabCloze) · E (Editing) · F (SentenceCombining) ·
//          G (ComprehensionOE – Tails) · H (ComprehensionOE – Train)
// ============================================================

import { QuestionSet } from "@/types/questions";

export const eoy_scgs_p2_2025: QuestionSet = {
  id: "eoy_scgs_p2_2025",
  school: "Singapore Chinese Girls' School",
  level: "P3",
  subject: "English",
  year: 2023,
  exam: "EOY",
  paper: 2,
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // SECTION A: VOCABULARY MCQ (6 marks, Q1–6)
    // ─────────────────────────────────────────────
    {
      id: "sec_a",
      name: "Section A: Vocabulary",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "scgs_eoy23_q1",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Having injured his leg badly, he __________ with pain when he tried to stand up.",
          options: ["froze", "grinned", "beamed", "grimaced"],
          answer: 4,
          solution: {
            method: "Vocabulary — facial expression of pain",
            steps: [
              "'Grimaced' = twisted the face in an expression of pain or disgust — perfectly matches standing up with a badly injured leg.",
              "'Froze' = stopped moving (not a facial expression), 'grinned' = smiled broadly (positive), 'beamed' = smiled radiantly (positive).",
            ],
            tip: "Grimace = involuntary facial expression showing pain or disgust. Grin and beam are happy expressions — eliminate when context is painful.",
          },
        },
        {
          id: "scgs_eoy23_q2",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "No one has __________ to claim the briefcase containing some gold bars.",
          options: ["turned up", "turned on", "turned off", "turned down"],
          answer: 1,
          solution: {
            method: "Phrasal verb meaning",
            steps: [
              "'Turned up' = appeared/arrived/came forward. 'No one has turned up to claim' = no one has appeared to claim.",
              "'Turned on' = activated/attacked, 'turned off' = deactivated, 'turned down' = rejected/reduced.",
            ],
            tip: "'Turn up' = to arrive/appear (especially unexpectedly). 'No one turned up' = no one came.",
          },
        },
        {
          id: "scgs_eoy23_q3",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "That photograph brought back __________ of my childhood. I really enjoyed the games I used to play with my friends.",
          options: ["times", "dreams", "pictures", "memories"],
          answer: 4,
          solution: {
            method: "Collocation: 'bring back ___'",
            steps: [
              "'Brought back memories' is a fixed collocation meaning to remind someone of past experiences.",
              "A photograph triggering recollections of the past = memories.",
              "'Brought back times/dreams/pictures' are not natural collocations.",
            ],
            tip: "Collocation: 'bring back memories' = to make someone remember the past. This is a very common fixed phrase.",
          },
        },
        {
          id: "scgs_eoy23_q4",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            '"Please make an effort to write clearly. Your handwriting is __________.," Mrs Tan said to Sue.',
          options: ["illegal", "inedible", "illegible", "incredible"],
          answer: 3,
          solution: {
            method: "Vocabulary — prefix meaning",
            steps: [
              "'Illegible' = impossible to read (from legible = readable). Matches 'write clearly / handwriting'.",
              "'Illegal' = against the law, 'inedible' = cannot be eaten, 'incredible' = amazing.",
              "Context: Mrs Tan is telling Sue to write more clearly — the handwriting cannot be read = illegible.",
            ],
            tip: "Illegible = cannot be read (il- = not, legible = readable). Edible = can be eaten, incredible = cannot be believed.",
          },
        },
        {
          id: "scgs_eoy23_q5",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "After dropping her favourite toy in the mud, Sarah realised that not being careful can be __________.",
          options: ["costly", "prized", "worthy", "priceless"],
          answer: 1,
          solution: {
            method: "Vocabulary in context",
            steps: [
              "'Costly' = expensive, or resulting in a great loss — 'not being careful can be costly' means carelessness can result in loss.",
              "'Prized' = treasured/valued (adjective for the toy, not for carelessness), 'priceless' = extremely valuable (positive), 'worthy' = deserving.",
            ],
            tip: "Costly = expensive or resulting in loss. 'Carelessness can be costly' = carelessness leads to losing something valuable.",
          },
        },
        {
          id: "scgs_eoy23_q6",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Mr Tan is late with his payment again. He never pays his rent __________.",
          options: ["urgently", "promptly", "irregularly", "frequently"],
          answer: 2,
          solution: {
            method: "Vocabulary — manner of paying",
            steps: [
              "'He never pays promptly' = he never pays on time/without delay.",
              "Context: he is 'late with his payment again' → he doesn't pay on time = not promptly.",
              "'Urgently' = in an urgent manner, 'irregularly' = not at regular intervals, 'frequently' = often.",
            ],
            tip: "Promptly = on time, immediately, without delay. He never pays promptly = he always pays late.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B: GRAMMAR MCQ (8 marks, Q7–14)
    // ─────────────────────────────────────────────
    {
      id: "sec_b",
      name: "Section B: Grammar",
      topic: "GrammarMCQ",
      marks: 8,
      questions: [
        {
          id: "scgs_eoy23_q7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "This hawker stall is famous __________ its chicken rice. There is always a long queue.",
          options: ["at", "in", "for", "with"],
          answer: 3,
          solution: {
            method: "Preposition — 'famous for'",
            steps: [
              "'Famous for' is the fixed collocation — something is famous FOR a quality or product.",
              "'This stall is famous for its chicken rice' = the chicken rice is what makes it famous.",
            ],
            tip: "'Famous for + noun/gerund' is a fixed phrase. 'Singapore is famous for its food.'",
          },
        },
        {
          id: "scgs_eoy23_q8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "She missed her flight __________ she left her house early.",
          options: ["for", "or", "because", "although"],
          answer: 4,
          solution: {
            method: "Conjunction — contrast",
            steps: [
              "She missed the flight (expected: she should have caught it) despite leaving early — contrast.",
              "'Although' introduces a contrasting/unexpected result: she left early but still missed the flight.",
              "'Because' would mean leaving early caused her to miss the flight (illogical).",
            ],
            tip: "Although = despite the fact that. Use when two clauses contrast. Leaving early → expected to catch flight, but missed it = contrast → although.",
          },
        },
        {
          id: "scgs_eoy23_q9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "If your television breaks down, call in a technician. Do not try to repair it __________.",
          options: ["itself", "herself", "himself", "yourself"],
          answer: 4,
          solution: {
            method: "Reflexive pronoun — matching implied subject 'you'",
            steps: [
              "The implied subject of the imperative 'Do not try' is 'you' (second person).",
              "Reflexive pronoun for 'you' (singular) = 'yourself'.",
              "'Itself' = it (the TV), 'herself/himself' = she/he — do not match 'you'.",
            ],
            tip: "Imperative sentences have implied subject 'you'. Reflexive: you → yourself, you (pl.) → yourselves.",
          },
        },
        {
          id: "scgs_eoy23_q10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Listen! Someone __________ to break into the neighbour\'s flat now," whispered Beth.',
          options: ["try", "tries", "is trying", "was trying"],
          answer: 3,
          solution: {
            method: "Present continuous — action happening right now",
            steps: [
              "'Listen!' and 'now' signal that the action is happening at this very moment.",
              "Present continuous = is/am/are + verb-ing. 'Someone is trying to break in now.'",
              "'Was trying' = past continuous (wrong time frame).",
            ],
            tip: "Time clues 'now', 'listen!' = action happening at this moment → present continuous. Someone IS TRYING (right now).",
          },
        },
        {
          id: "scgs_eoy23_q11",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The girls __________ with fright when they saw the poisonous snake.",
          options: ["shake", "shook", "shakes", "are shaking"],
          answer: 2,
          solution: {
            method: "Simple past — completed action",
            steps: [
              "'When they SAW the snake' — 'saw' is simple past, indicating a past event.",
              "The girls' reaction (shaking) also occurred in the past → simple past 'shook'.",
              "Irregular past: shake → shook.",
            ],
            tip: "Irregular past tense: shake → shook. When [simple past], [simple past] — parallel past tense structure.",
          },
        },
        {
          id: "scgs_eoy23_q12",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Look at __________ big, juicy mangoes on the tree across the street.",
          options: ["this", "that", "these", "those"],
          answer: 4,
          solution: {
            method: "Demonstrative adjective — plural + far",
            steps: [
              "'Mangoes' = plural. Eliminate 'this' (singular) and 'that' (singular).",
              "'Across the street' = far away. Use 'those' (plural + far).",
              "'These' = plural + near. 'Those' = plural + far. Correct: 'those'.",
            ],
            tip: "Those = plural + far. These = plural + near. 'Across the street' = far → those.",
          },
        },
        {
          id: "scgs_eoy23_q13",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "This dress suits her style. She __________ definitely like it!",
          options: ["will", "can", "may", "could"],
          answer: 1,
          solution: {
            method: "Modal verb — certainty",
            steps: [
              "'She will definitely like it' — 'will' with 'definitely' expresses strong certainty about a future outcome.",
              "'Can' = ability, 'may/could' = possibility (less certain). 'Definitely' requires 'will' for certainty.",
            ],
            tip: "'Will + definitely' = strong certainty about what will happen. May/might = possibility (uncertain). Can = ability.",
          },
        },
        {
          id: "scgs_eoy23_q14",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Shanti Pereira put in __________ effort to get to where she is today. She would not have won the gold medal at the Asian Athletics Championships without hard work.",
          options: ["many", "a few", "a little", "a lot of"],
          answer: 4,
          solution: {
            method: "Quantifier — uncountable noun 'effort'",
            steps: [
              "'Effort' is an uncountable noun. Eliminate 'many' and 'a few' (used with countable nouns).",
              "'A lot of effort' = large amount of effort — matches 'winning gold medal through hard work'.",
              "'A little' = small amount (insufficient for winning a gold medal).",
            ],
            tip: "'A lot of' works with both countable and uncountable nouns. 'A lot of effort' = great effort. 'A little effort' would suggest not much effort, contradicting the gold medal achievement.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C: GRAMMAR CLOZE (8 marks, Q15–22)
    // ─────────────────────────────────────────────
    {
      id: "sec_c",
      name: "Section C: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 8,
      questions: [
        // Passage 1 (Q15–18): Museum trip — pronouns
        {
          id: "scgs_eoy23_q15_18",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Museum Trip (Passage 1)",
          wordBank: ["her", "I", "she", "them", "us", "we", "you"],
          passageText:
            "Our class boarded the bus excitedly. (15) __________ were thrilled as it was our first learning journey to the Singapore Museum! Before arriving at the destination, our teacher, Madam Tan, addressed (16) __________. \"Girls, remember that (17) __________ are wearing the school uniform. Please make sure to be on your best behaviour,\" (18) __________ said. Our class nodded our heads in agreement and flashed Madam Tan a thumbs-up sign.",
          blanks: [
            {
              number: 15,
              answer: "We",
              solution: {
                method: "Pronoun reference — 'Our class' (plural, first person)",
                steps: [
                  "'Our class boarded the bus excitedly. (15) were thrilled' — the same group (our class = we).",
                  "'We were thrilled' — first person plural subject pronoun.",
                ],
                tip: "Our class = we (first person plural). We boarded, we were thrilled.",
              },
            },
            {
              number: 16,
              answer: "Us",
              solution: {
                method: "Object pronoun — 'addressed us'",
                steps: [
                  "'Madam Tan addressed (16)' — the class is the object being addressed.",
                  "Object form of 'we' = 'us'. 'Addressed us' = spoke to us.",
                ],
                tip: "'We' = subject pronoun (we did it). 'Us' = object pronoun (someone did it to us). 'Addressed us' = us is the object.",
              },
            },
            {
              number: 17,
              answer: "You",
              solution: {
                method: "Pronoun — Madam Tan speaking to the girls",
                steps: [
                  "Madam Tan is speaking directly to the girls. In dialogue, when addressing them, she uses 'you'.",
                  "'Remember that you are wearing the school uniform' — 'you' = the girls being spoken to.",
                ],
                tip: "In direct speech, the teacher addresses the students as 'you'. You are wearing = the students are wearing.",
              },
            },
            {
              number: 18,
              answer: "She",
              solution: {
                method: "Pronoun reference — Madam Tan (singular female)",
                steps: [
                  "'(18) said' — who said it? Madam Tan (singular female teacher).",
                  "Pronoun for Madam Tan = 'she'.",
                ],
                tip: "Madam Tan = she. 'She said' after a direct quote = reporting that Madam Tan spoke.",
              },
            },
          ],
        },

        // Passage 2 (Q19–22): South Korea — auxiliary/linking verbs
        {
          id: "scgs_eoy23_q19_22",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "South Korea (Passage 2)",
          wordBank: ["are", "had", "has", "have", "is", "was", "were"],
          passageText:
            "South Korea is located in Asia. There (19) __________ three seas surrounding South Korea - the Yellow Sea, South Sea and East Sea. It is a mountainous country and (20) __________ more than 7,000 mountains! The highest mountain, named Hallasan, is also a volcano. The last time Hallasan erupted (21) __________ more than 5000 years ago. People who had climbed the mountain before said the view from the top was beautiful. Some even said that at the very top, it felt like they (22) __________ floating on clouds. Everyone should visit the Hallasan mountain if they have the chance.",
          blanks: [
            {
              number: 19,
              answer: "Are",
              solution: {
                method: "Subject-verb agreement — 'three seas' (plural)",
                steps: [
                  "'There are three seas' — 'three seas' is plural, so use 'are'.",
                  "Subject 'three seas' is plural → plural verb 'are'.",
                ],
                tip: "'There is' = singular; 'There are' = plural. Three seas = plural → There are three seas.",
              },
            },
            {
              number: 20,
              answer: "Has",
              solution: {
                method: "Subject-verb agreement — 'It' (singular) + present tense",
                steps: [
                  "'It is a mountainous country and (20) more than 7,000 mountains' — subject is 'It' (South Korea).",
                  "Singular subject 'It' + present tense = 'has'. South Korea has 7,000 mountains.",
                ],
                tip: "'It has' (singular present). 'They have' (plural). South Korea (it) has mountains.",
              },
            },
            {
              number: 21,
              answer: "Was",
              solution: {
                method: "Past tense linking verb — specific past time 'more than 5000 years ago'",
                steps: [
                  "'The last time Hallasan erupted (21) more than 5000 years ago' — 'the last time' + 'ago' = past.",
                  "'It was more than 5000 years ago' — singular past linking verb.",
                ],
                tip: "'Ago' signals past tense. 'The last time was [time] ago' — was (singular past).",
              },
            },
            {
              number: 22,
              answer: "Were",
              solution: {
                method: "Past tense — 'they' (plural) in reported feelings",
                steps: [
                  "'It felt like they (22) floating on clouds' — past tense feeling (the mountain climb happened in the past).",
                  "Subject 'they' = plural, past tense of 'to be' = 'were'. 'They were floating on clouds.'",
                ],
                tip: "They were (plural past). 'It felt like they WERE floating' = they felt as if they were floating.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D: VOCABULARY CLOZE (4 marks, Q23–26)
    // ─────────────────────────────────────────────
    {
      id: "sec_d",
      name: "Section D: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 4,
      questions: [
        {
          id: "scgs_eoy23_q23_26",
          type: "B",
          topic: "VocabCloze",
          marks: 4,
          passageTitle: "The Leopard Cat",
          wordBank: ["commonly", "habitats", "home", "hunts", "preys", "tactic"],
          passageText:
            "The leopard cat is a small mammal that looks like a house cat with a leopard-like coat. It is (23) __________ found in Asia but is considered a rare animal in Singapore. The leopard cat lives mostly in tropical forests, but it can also be found in other (24) __________ such as grassland and plantations. It is nocturnal and (25) __________ at night. Being a carnivorous animal, it (26) __________ on small frogs, lizards, birds, rats and rodents.",
          blanks: [
            {
              number: 23,
              answer: "commonly",
              solution: {
                method: "Adverb modifying 'found'",
                steps: [
                  "'Commonly found in Asia' = often/typically found in Asia.",
                  "'Commonly' = frequently/in most cases. Fits 'found in Asia but rare in Singapore'.",
                ],
                tip: "Commonly = frequently/usually. 'Commonly found' = often found (in general), but rare specifically in Singapore.",
              },
            },
            {
              number: 24,
              answer: "habitats",
              solution: {
                method: "Context: types of environments/homes",
                steps: [
                  "'Found in other (24) such as grassland and plantations' — these are types of environments where animals live.",
                  "'Habitats' = the natural environments/homes of animals.",
                ],
                tip: "Habitat = the natural environment where a plant or animal lives. Grassland and plantations are habitats.",
              },
            },
            {
              number: 25,
              answer: "hunts",
              solution: {
                method: "Context: nocturnal + carnivorous behaviour",
                steps: [
                  "'It is nocturnal and (25) at night' — a nocturnal animal goes out at night to find food.",
                  "'Hunts at night' = goes hunting at night. Present tense, singular subject 'it' = 'hunts'.",
                ],
                tip: "Nocturnal animals sleep during the day and HUNT at night. Carnivores hunt prey.",
              },
            },
            {
              number: 26,
              answer: "preys",
              solution: {
                method: "Fixed phrase: 'preys on'",
                steps: [
                  "'Preys on small frogs, lizards, birds...' — 'prey on' is the fixed verb phrase meaning to hunt and eat.",
                  "Subject 'it' (singular, present tense) = 'preys'.",
                ],
                tip: "'Prey on [animals]' = to hunt and eat (as food). The leopard cat preys on small animals. (Verb: prey on; Noun: prey = the animal being hunted)",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E: EDITING (4 marks, Q27–30)
    // ─────────────────────────────────────────────
    {
      id: "sec_e",
      name: "Section E: Editing",
      topic: "Editing",
      marks: 4,
      questions: [
        // Spelling errors (Q27–28)
        {
          id: "scgs_eoy23_q27",
          type: "A",
          topic: "Editing",
          marks: 1,
          question:
            "Spelling correction: 'I was so ekshilirated to be invited to my best friend's birthday party.' Correct the underlined/misspelled word 'ekshilirated'.",
          answer: "exhilarated",
          solution: {
            method: "Spelling correction",
            steps: [
              "'Ekshilirated' is a misspelling of 'exhilarated' (= feeling extremely happy/thrilled).",
              "Correct spelling: e-x-h-i-l-a-r-a-t-e-d.",
            ],
            tip: "Exhilarated = feeling extremely happy and excited. Note the 'xh' at the start, not 'ksh'. Exhilarating/exhilarated share this tricky spelling.",
          },
        },
        {
          id: "scgs_eoy23_q28",
          type: "A",
          topic: "Editing",
          marks: 1,
          question:
            "Spelling correction: 'I had already promeesed to watch him swim and support him in the competition.' Correct the underlined/misspelled word 'promeesed'.",
          answer: "promised",
          solution: {
            method: "Spelling correction",
            steps: [
              "'Promeesed' is a misspelling of 'promised'.",
              "Correct: p-r-o-m-i-s-e-d (not 'promeesed' — no double 'ee').",
            ],
            tip: "Promised = past tense of 'promise'. Promise → promised. One 'i', not two 'e's.",
          },
        },
        // Grammar errors (Q29–30)
        {
          id: "scgs_eoy23_q29",
          type: "A",
          topic: "Editing",
          marks: 1,
          question:
            "Grammar correction (Kit Kat passage): 'Every year, around 17.6 billion Kit Kat bars were eaten across the world.' The underlined word 'were' contains a grammar error. Correct it.",
          answer: "are",
          solution: {
            method: "Subject-verb agreement + tense",
            steps: [
              "The sentence is describing a current/ongoing fact (every year = habitual present).",
              "'17.6 billion Kit Kat bars ARE eaten' — passive voice, present tense for ongoing fact.",
              "'Were eaten' is past tense, but 'every year' indicates a present/habitual fact.",
            ],
            tip: "Habitual facts (every year, always, usually) use present tense. 17.6 billion bars ARE eaten every year (not were).",
          },
        },
        {
          id: "scgs_eoy23_q30",
          type: "A",
          topic: "Editing",
          marks: 1,
          question:
            "Grammar correction (Kit Kat passage): 'There are more than 300 different flavours in Kit Kat.' The underlined word 'in' contains a grammar error. Correct it.",
          answer: "of",
          solution: {
            method: "Preposition correction",
            steps: [
              "'300 different flavours of Kit Kat' — we use 'of' to indicate the flavours belonging to/part of Kit Kat.",
              "'Flavours in' = flavours located inside something (incorrect here). 'Flavours of Kit Kat' = types of Kit Kat.",
            ],
            tip: "'Flavours of [product]' = the varieties/types of that product. 'Flavours IN' is not the standard usage here.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F: SENTENCE COMBINING (4 marks, Q31–34)
    // ─────────────────────────────────────────────
    {
      id: "sec_f",
      name: "Section F: Sentence Combining",
      topic: "SentenceCombining",
      marks: 4,
      questions: [
        {
          id: "scgs_eoy23_q31",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Diana loves drawing. Diana loves cooking too.' Using: and",
          answer: "Diana loves drawing and cooking.",
          solution: {
            method: "Combine with 'and' — shared subject and verb",
            steps: [
              "Both sentences share the same subject (Diana) and verb (loves).",
              "Join the two objects with 'and': drawing AND cooking.",
              "Result: 'Diana loves drawing and cooking.'",
            ],
            tip: "When subject + verb are shared, list the objects/activities with 'and'. Diana loves [drawing] and [cooking].",
          },
        },
        {
          id: "scgs_eoy23_q32",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'It was raining heavily. The children went out to play.' Using: it ... the",
          answer:
            "Although it was raining heavily, the children went out to play.",
          solution: {
            method: "Contrast — Although (implied from context)",
            steps: [
              "The sentences contrast: heavy rain (expected to stop play) vs children went out to play.",
              "Answer key: 'Although it was raining heavily, the children went out to play.'",
              "Alternatively: 'It was raining heavily but the children went out to play.'",
            ],
            tip: "Heavy rain + still going out to play = contrast. Use 'although' or 'even though' + comma before main clause.",
          },
        },
        {
          id: "scgs_eoy23_q33",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'I threw the pot away. The pot was broken.' Using: it ... as",
          answer: "I threw the pot away as it was broken.",
          solution: {
            method: "'As' — reason/cause connector",
            steps: [
              "'As' = because (reason). I threw the pot away BECAUSE/AS it was broken.",
              "'It' replaces 'the pot' in the second clause.",
              "Result: 'I threw the pot away as it was broken.'",
            ],
            tip: "'As' = because (introducing a reason clause). 'I did X as [reason]' = I did X because [reason].",
          },
        },
        {
          id: "scgs_eoy23_q34",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'The principal walked into the classroom. The class fell silent.' Using: When",
          answer:
            "When the principal walked into the classroom, the class fell silent.",
          solution: {
            method: "'When' — time relationship",
            steps: [
              "'When' introduces the time clause (the principal walking in), followed by the main clause (class fell silent).",
              "Result: 'When the principal walked into the classroom, the class fell silent.'",
              "Comma after the 'when' clause.",
            ],
            tip: "'When + [time clause], [main clause]' = one event triggers/follows another. Add comma after 'when' clause.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G: COMPREHENSION 1 — SHORT RESPONSE (8 marks, Q35–40)
    // ─────────────────────────────────────────────
    {
      id: "sec_g",
      name: "Section G: Comprehension — Animal Tails",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "The Many Uses of Animal Tails",
      passageText: `In the animal kingdom, tails serve many different functions and purposes. For many animals, tails are used for balance. Dinosaurs, like the Tyrannosaurus-rex, used their tails to balance their heavy heads and bodies while walking on two legs. Kangaroos use their tails for balance while leaping, and their tails also function as a third leg that helps them to lift off into the air. Climbers like monkeys use their tails for balance and to grip vines and branches.

Some animals have evolved tails into weapons for defence. Stingrays have a spiked tail that they can use to defend against predators. When attacked, they whip around their spiked tails and release venom from them. Rattlesnakes have dried skin on their tail that make a rattling sound to scare off potential predators.

Lastly, animals that live in groups, like dogs and wolves, use the positions of their tails to indicate their rank and communicate with one another. Dogs wag their tails when excited, which is a form of communication with humans too.

Tails serve different functions for animals across different species. Tails have become an essential part of animals' survival as they have various uses, such as balance, defence and communication.

Adapted from: https://www.abc.net.au/education/curious-kids-why-animals-have-tails/14059610`,

      questions: [
        {
          id: "scgs_eoy23_q35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which sentence from paragraph 1 tells us what many animals use their tails for? [1m]",
          answer:
            "For many animals, tails are used for balance.",
          solution: {
            method: "Locate specific sentence from paragraph",
            steps: [
              "Paragraph 1, sentence 2: 'For many animals, tails are used for balance.'",
              "This sentence directly states what MANY animals use their tails for.",
            ],
            tip: "Quote the sentence directly. 'For many animals, tails are used for balance.' — this is the general statement about many animals.",
          },
        },
        {
          id: "scgs_eoy23_q36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "How does a rattlesnake use its tail to defend against potential predators? [2m]",
          answer:
            "Rattlesnakes have dried skin on their tail that makes a rattling sound to scare off potential predators.",
          solution: {
            method: "Locate and rephrase from paragraph 2",
            steps: [
              "Paragraph 2: 'Rattlesnakes have dried skin on their tail that make a rattling sound to scare off potential predators.'",
              "2 marks: 1m for 'dried skin makes a rattling sound' + 1m for 'to scare off predators'.",
            ],
            tip: "Answer includes both the mechanism (dried skin → rattling sound) and the purpose (scare off predators). Both parts needed for 2 marks.",
          },
        },
        {
          id: "scgs_eoy23_q37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q37 True or False: Monkeys and kangaroos use their tails to help them lift off into the air. [1m]",
          answer: "False",
          solution: {
            method: "True/False — careful reading of paragraph 1",
            steps: [
              "Paragraph 1: 'Kangaroos use their tails for balance while leaping, and their tails also function as a third leg that helps them to lift off into the air.'",
              "Monkeys use their tails for balance and to GRIP vines and branches — NOT to lift off into the air.",
              "Only KANGAROOS use their tails to lift off. MONKEYS do not. → False.",
            ],
            tip: "Read carefully. The statement says 'Monkeys AND kangaroos' use tails to lift off — but only kangaroos do this. Monkeys grip with their tails.",
          },
        },
        {
          id: "scgs_eoy23_q38",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q38 True or False: Wolves use their tails to communicate with their prey. [1m]",
          answer: "False",
          solution: {
            method: "True/False — careful reading of paragraph 3",
            steps: [
              "Paragraph 3: 'animals that live in groups, like dogs and wolves, use the positions of their tails to indicate their rank and communicate with one another.'",
              "'One another' = other members of the group (other wolves/dogs), not their prey.",
              "They communicate with each other/indicate rank — NOT with prey. → False.",
            ],
            tip: "Wolves communicate with each other using tails (rank), not with prey. 'Communicate with one another' ≠ communicate with prey.",
          },
        },
        {
          id: "scgs_eoy23_q39",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q39 True or False: Stingrays have spiked tails. [1m]",
          answer: "True",
          solution: {
            method: "True/False — locate in paragraph 2",
            steps: [
              "Paragraph 2: 'Stingrays have a spiked tail that they can use to defend against predators.'",
              "Directly stated → True.",
            ],
            tip: "Directly stated in paragraph 2. Stingrays have spiked tails. True.",
          },
        },
        {
          id: "scgs_eoy23_q40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Based on paragraph 4, how do animals' tails help them to survive? [2m]",
          answer:
            "Animals' tails help them survive because they have various uses, such as balance, defence and communication.",
          solution: {
            method: "Locate and explain from paragraph 4",
            steps: [
              "Paragraph 4: 'Tails have become an essential part of animals' survival as they have various uses, such as balance, defence and communication.'",
              "Award 1m for identifying it is 'essential for survival' + 1m for listing the uses (balance, defence, communication).",
            ],
            tip: "2-mark answer: state that tails are essential for survival AND explain the three functions: balance, defence, communication.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H: COMPREHENSION 2 — SHORT RESPONSE (8 marks, Q41–45)
    // ─────────────────────────────────────────────
    {
      id: "sec_h",
      name: "Section H: Comprehension — The Train",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "Chaos on the Train",
      passageText: `It was a quiet Sunday morning on the train. The few passengers aboard were either reading the newspaper or dozing in their chairs. The train stopped as it reached the station, and a father with several young children came on board.

Within seconds, chaos broke out. The father settled into a seat, while his children ran up and down the carriage, screaming and wrestling each other on the floor. The silence in the train disappeared, and it was replaced by the children's loud and messy screams.

The father did nothing.

Time ticked by. Those who were originally dozing were now awake because of the children's screams. Many turned their eyes towards the direction of the noise and gazed angrily at the father, their minds filled with anger and frustration. Some even began grumbling about how annoying the noisy children were.

Finally, unable to bear the disturbance any longer, a well-dressed businessman walked up to the father. Grabbing his shirt collar, the businessman shouted angrily, "Put your children in order immediately!"

The father looked up, tears welling in his eyes. In broken words, he said, "We just left the hospital... Their mother is very sick and I am not sure how to tell it to them. I don't know what to do."

Silence fell upon the carriage. The businessman, stunned by the father's response, released his grip.

"I... I'm so sorry. Can I help with anything?" the businessman apologised. Without waiting for a reply, the nearby passengers who overheard the commotion sprang into action. Some held the young, crying children in their arms to calm them down, while others read books to the older ones to quieten them. From being angry and frustrated with the father, the passengers felt sorry for him.

Adapted from: https://www.linkedin.com/pulse/story-father-subway-empathy-benjamin-gin`,

      questions: [
        {
          id: "scgs_eoy23_q41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in paragraph 2 has the same meaning as 'complete disorder'? [1m]",
          answer: "chaos",
          solution: {
            method: "Synonym hunt in paragraph 2",
            steps: [
              "Paragraph 2 starts with 'Within seconds, chaos broke out.'",
              "'Chaos' = complete disorder and confusion.",
            ],
            tip: "Chaos = complete disorder. The paragraph begins: 'Within seconds, chaos broke out.'",
          },
        },
        {
          id: "scgs_eoy23_q42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "List two things the passengers on board the train did to show their annoyance at the father. [2m]",
          answer:
            "(i) They gazed angrily at the father.\n(ii) They grumbled about how annoying the children were.",
          solution: {
            method: "List two actions from paragraph 4",
            steps: [
              "Paragraph 4: 'Many turned their eyes towards the direction of the noise and GAZED ANGRILY at the father'.",
              "Paragraph 4: 'Some even began GRUMBLING about how annoying the noisy children were'.",
            ],
            tip: "2-mark question = 2 pieces of evidence. Gazed angrily (1m) + grumbled about annoyance (1m).",
          },
        },
        {
          id: "scgs_eoy23_q43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Why did the father do nothing about his noisy children on the train? [2m]",
          answer:
            "The father did nothing because they had just left the hospital and his children's mother was very sick. He was so overwhelmed by worry and grief that he was not sure how to tell the children about their mother's illness.",
          solution: {
            method: "Locate reason from paragraph 6",
            steps: [
              "Paragraph 6: 'We just left the hospital... Their mother is very sick and I am not sure how to tell it to them. I don't know what to do.'",
              "He was preoccupied with his wife's illness and didn't know how to break the news to his children.",
            ],
            tip: "2 marks: 1m for 'wife/mother is very sick' (just left hospital), 1m for 'didn't know how to tell the children / overwhelmed with worry'.",
          },
        },
        {
          id: "scgs_eoy23_q44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to show the order of events in the story. [1m]\n\n__ The children made a lot of noise on the train.\n__ The people on the train felt annoyed by the noisy children.\n__ Some people on the train were dozing.",
          answer: "2, 3, 1",
          solution: {
            method: "Sequence of events",
            steps: [
              "1st: Some people on the train were dozing (paragraph 1 — before the father boarded).",
              "2nd: The children made a lot of noise on the train (paragraph 2 — after boarding).",
              "3rd: The people on the train felt annoyed (paragraph 4 — after the noise continued).",
              "Sequence: dozing (1) → noise (2) → annoyed (3). Boxes: noise=2, annoyed=3, dozing=1.",
            ],
            tip: "Track the story timeline: passengers dozing → father boards, children make noise → passengers get annoyed.",
          },
        },
        {
          id: "scgs_eoy23_q45a",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q45(a): Based on the last paragraph, how did the passengers in the train feel towards the father? [1m]",
          answer:
            "The passengers felt sorry towards the father.",
          solution: {
            method: "Locate emotion from last paragraph",
            steps: [
              "Last paragraph: 'From being angry and frustrated with the father, the passengers felt sorry for him.'",
              "They felt sorry for the father (their feelings changed from anger to sympathy).",
            ],
            tip: "The passengers' feelings changed: angry → sorry/sympathetic. 'Felt sorry for him' = the answer.",
          },
        },
        {
          id: "scgs_eoy23_q45b",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Q45(b): How did the passengers show how they felt towards the father? [1m]",
          answer:
            "Some of the nearby passengers held the young, crying children in their arms to calm them down, while others read books to the older ones to quieten them.",
          solution: {
            method: "Locate specific actions from last paragraph",
            steps: [
              "Last paragraph: 'Some held the young, crying children in their arms to calm them down, while others read books to the older ones to quieten them.'",
              "They helped by calming the children — this showed their sympathy for the father.",
            ],
            tip: "How they showed feelings = their actions. They helped calm the children (held them, read to them).",
          },
        },
      ],
    },
  ],
};
