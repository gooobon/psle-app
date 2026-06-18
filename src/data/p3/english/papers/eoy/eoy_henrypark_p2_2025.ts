// src/data/p3/english/papers/eoy_henrypark_p2_2025.ts
// Henry Park Primary School — P3 English EOY 2024 (SA2)
// Paper 2 — Part I (Sections A–B, 14 MCQ) + Part II (Sections C–H, 34 marks)
// Total: 48 questions, 50 marks
// Excludes: Composition (Paper 1)

import { ExamPaper } from "@/types/exam";

const paper: ExamPaper = {
  id: "eoy_henrypark_p2_2024",
  school: "Henry Park Primary School",
  level: "P3",
  subject: "English",
  year: 2024,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,
  duration: 75,
  sections: [

    // ─────────────────────────────────────────
    // PART I — SECTION A: VOCABULARY MCQ (6 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secA",
      name: "Part I – Section A: Vocabulary MCQ",
      topic: "VocabMCQ",
      instructions:
        "Choose the most suitable answer and write its number (1, 2, 3 or 4) in the brackets. Shade the correct oval on the Optical Answer Sheet provided.",
      marks: 6,
      questionType: "A",
      questions: [
        {
          id: "hp_2024_eoy_q1",
          qNumber: 1,
          topic: "VocabMCQ",
          subtopic: "Adjective — Contrast",
          questionText:
            "Sam enjoys playing soccer while John prefers reading. They have __________ hobbies.",
          options: [
            { label: "1", text: "similar" },
            { label: "2", text: "different" },
            { label: "3", text: "opposite" },
            { label: "4", text: "matching" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Adjective choice based on contrast clue",
            steps: [
              "Sam likes soccer; John likes reading — these are NOT the same hobbies.",
              "'Different' = not the same; the two hobbies are unlike each other.",
              "'Similar' = almost the same (wrong — soccer ≠ reading). 'Opposite' is extreme (soccer is not the opposite of reading). 'Matching' = identical.",
              "Answer: (2) different",
            ],
            tip: "'While' in this sentence shows contrast — two unlike things being compared.",
          },
        },
        {
          id: "hp_2024_eoy_q2",
          qNumber: 2,
          topic: "VocabMCQ",
          subtopic: "Verb — Volume/Manner of Speaking",
          questionText:
            "The librarian reminded the students to __________ so as not to disturb others who were reading quietly.",
          options: [
            { label: "1", text: "yell" },
            { label: "2", text: "bellow" },
            { label: "3", text: "whisper" },
            { label: "4", text: "mumble" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Verb selection by context",
            steps: [
              "In a library, you must be quiet so as not to disturb others.",
              "'Whisper' = to speak very softly — appropriate for a library.",
              "'Yell' and 'bellow' = to speak very loudly (opposite of what's needed).",
              "'Mumble' = to speak unclearly, not necessarily quietly (also has negative connotation).",
              "Answer: (3) whisper",
            ],
            tip: "Library setting → quiet → 'whisper'. Loud verbs (yell, bellow, shout) would disturb others.",
          },
        },
        {
          id: "hp_2024_eoy_q3",
          qNumber: 3,
          topic: "VocabMCQ",
          subtopic: "Adjective — Courage",
          questionText:
            "Amin was __________ as he stood up for his friend in front of the bullies.",
          options: [
            { label: "1", text: "restless" },
            { label: "2", text: "fearless" },
            { label: "3", text: "reckless" },
            { label: "4", text: "careless" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Adjective connotation matching",
            steps: [
              "Amin stood up to bullies to protect his friend — a brave, courageous act.",
              "'Fearless' = without fear; courageous — perfectly describes facing bullies.",
              "'Restless' = unable to stay still (unrelated). 'Reckless' = acting without thinking of danger (negative connotation). 'Careless' = not paying attention (negative).",
              "Answer: (2) fearless",
            ],
            tip:
              "'Fearless' = showing no fear. 'Reckless' also implies no fear but with a negative/irresponsible connotation.",
          },
        },
        {
          id: "hp_2024_eoy_q4",
          qNumber: 4,
          topic: "VocabMCQ",
          subtopic: "Noun — Difficulty",
          questionText:
            "The Mathematics problem sum was a __________, but Siti managed to solve it after a few tries.",
          options: [
            { label: "1", text: "loss" },
            { label: "2", text: "failure" },
            { label: "3", text: "success" },
            { label: "4", text: "challenge" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Noun in context of difficulty",
            steps: [
              "Siti solved it 'after a few tries' — it was hard but she succeeded.",
              "'Challenge' = a difficult task that requires effort to overcome.",
              "'Loss' and 'failure' imply she did NOT succeed — contradicts the context.",
              "'Success' = a positive outcome, not a noun describing the problem itself.",
              "Answer: (4) challenge",
            ],
            tip:
              "'Challenge' = something difficult to do but possible to overcome. It describes the PROBLEM, not the outcome.",
          },
        },
        {
          id: "hp_2024_eoy_q5",
          qNumber: 5,
          topic: "VocabMCQ",
          subtopic: "Verb — Body Language",
          questionText:
            "Wei Ming __________ his shoulders and said he had no idea where the missing book was.",
          options: [
            { label: "1", text: "jabbed" },
            { label: "2", text: "flopped" },
            { label: "3", text: "wriggled" },
            { label: "4", text: "shrugged" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Verb — body language idiom",
            steps: [
              "When someone 'shrugs their shoulders', it means they don't know or don't care.",
              "Context: Wei Ming had no idea where the book was → shrugged (showed he didn't know).",
              "'Jabbed' = poked with a sharp movement. 'Flopped' = fell limply. 'Wriggled' = twisted/squirmed.",
              "Answer: (4) shrugged",
            ],
            tip: "'Shrug your shoulders' = a body gesture meaning 'I don't know' or 'I'm not sure'.",
          },
        },
        {
          id: "hp_2024_eoy_q6",
          qNumber: 6,
          topic: "VocabMCQ",
          subtopic: "Noun — Environment/Nature",
          questionText:
            "The zookeepers created a __________ for the pandas to live in, with bamboos to eat and trees to climb just like in the wild.",
          options: [
            { label: "1", text: "habitat" },
            { label: "2", text: "feature" },
            { label: "3", text: "position" },
            { label: "4", text: "scenery" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Science vocabulary",
            steps: [
              "The zookeepers created an environment that mimics the pandas' natural home.",
              "'Habitat' = the natural environment where an animal lives, with the conditions needed to survive.",
              "'Feature' = a characteristic or part of something. 'Position' = location/rank. 'Scenery' = landscape view.",
              "Answer: (1) habitat",
            ],
            tip:
              "'Habitat' = the natural home of an animal or plant. A zoo creates an artificial habitat.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART I — SECTION B: GRAMMAR MCQ (8 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secB",
      name: "Part I – Section B: Grammar MCQ",
      topic: "GrammarMCQ",
      instructions:
        "Choose the most suitable answer and write its number (1, 2, 3 or 4) in the brackets. Shade the correct oval on the Optical Answer Sheet provided.",
      marks: 8,
      questionType: "A",
      questions: [
        {
          id: "hp_2024_eoy_q7",
          qNumber: 7,
          topic: "GrammarMCQ",
          subtopic: "Past Continuous (Interrupted Action)",
          questionText:
            "The students __________ soccer when it started to rain.",
          options: [
            { label: "1", text: "play" },
            { label: "2", text: "will play" },
            { label: "3", text: "has played" },
            { label: "4", text: "were playing" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Past continuous for interrupted action",
            steps: [
              "The students were doing something (playing soccer) when a sudden event (rain) interrupted.",
              "Ongoing background action = past continuous: were + Ving.",
              "'The students were playing soccer' when 'it started to rain'.",
              "Answer: (4) were playing",
            ],
            tip: "When action A is interrupted by action B: A = past continuous, B = simple past.",
          },
        },
        {
          id: "hp_2024_eoy_q8",
          qNumber: 8,
          topic: "GrammarMCQ",
          subtopic: "Reflexive Pronoun (Injure oneself)",
          questionText:
            "My sister __________ herself while she was learning how to cycle last week.",
          options: [
            { label: "1", text: "injure" },
            { label: "2", text: "injured" },
            { label: "3", text: "has injured" },
            { label: "4", text: "was injuring" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Simple past tense with time adverbial",
            steps: [
              "Time clue: 'last week' → simple past tense.",
              "Simple past of 'injure' = 'injured'.",
              "'Has injured' = present perfect (recent past, no specific time). 'Was injuring' = past continuous (not needed here).",
              "Answer: (2) injured",
            ],
            tip: "'Last week/month/year' always signals simple past tense.",
          },
        },
        {
          id: "hp_2024_eoy_q9",
          qNumber: 9,
          topic: "GrammarMCQ",
          subtopic: "Present Continuous in Exclamation",
          questionText:
            '"Look over there! The monkeys __________ the food from the tourists!" shouted Tom.',
          options: [
            { label: "1", text: "snatch" },
            { label: "2", text: "snatches" },
            { label: "3", text: "snatched" },
            { label: "4", text: "are snatching" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Present continuous for action happening right now",
            steps: [
              "'Look over there!' = happening RIGHT NOW at the moment of speaking.",
              "For actions happening at this very moment, use present continuous: am/is/are + Ving.",
              "'The monkeys' = plural → 'are snatching'.",
              "Answer: (4) are snatching",
            ],
            tip: "'Look!' / 'Listen!' are signals that something is happening right now → present continuous.",
          },
        },
        {
          id: "hp_2024_eoy_q10",
          qNumber: 10,
          topic: "GrammarMCQ",
          subtopic: "Simple Present (Habitual Action)",
          questionText:
            "Christina __________ pineapple tarts every Chinese New Year.",
          options: [
            { label: "1", text: "bakes" },
            { label: "2", text: "baked" },
            { label: "3", text: "is baking" },
            { label: "4", text: "was baking" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Simple present for habitual/repeated actions",
            steps: [
              "'Every Chinese New Year' = a repeated, habitual action.",
              "Habitual actions use simple present tense.",
              "Subject 'Christina' = third person singular → verb with '-s': 'bakes'.",
              "Answer: (1) bakes",
            ],
            tip: "Words like 'every year/day/week' signal a habitual action → simple present tense.",
          },
        },
        {
          id: "hp_2024_eoy_q11",
          qNumber: 11,
          topic: "GrammarMCQ",
          subtopic: "Quantifier with Countable Noun",
          questionText:
            "Alice did not have to wait too long for her food as there were only __________ students in the queue.",
          options: [
            { label: "1", text: "a few" },
            { label: "2", text: "a little" },
            { label: "3", text: "much" },
            { label: "4", text: "many" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Quantifier with countable noun in affirmative",
            steps: [
              "'Students' is a countable noun (plural).",
              "'A few' = a small number of (countable) → correct.",
              "'A little' = a small amount of (uncountable). 'Much' = used with uncountable nouns. 'Many' = large number (but context says 'only', implying few).",
              "Answer: (1) a few",
            ],
            tip:
              "Countable: a few, many, several. Uncountable: a little, much, a great deal of.",
          },
        },
        {
          id: "hp_2024_eoy_q12",
          qNumber: 12,
          topic: "GrammarMCQ",
          subtopic: "Demonstrative Pronoun (Far Plural)",
          questionText:
            "I like these cookies but __________ over there are cheaper.",
          options: [
            { label: "1", text: "this" },
            { label: "2", text: "that" },
            { label: "3", text: "these" },
            { label: "4", text: "those" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Demonstrative pronoun — distance and number",
            steps: [
              "'Over there' = far away. 'Cookies' = plural.",
              "Far + plural → 'those'.",
              "'These' = plural but near. 'That' = far but singular. 'This' = near and singular.",
              "Answer: (4) those",
            ],
            tip: "Near: this/these. Far: that/those. Singular: this/that. Plural: these/those.",
          },
        },
        {
          id: "hp_2024_eoy_q13",
          qNumber: 13,
          topic: "GrammarMCQ",
          subtopic: "Quantifier with Uncountable Noun",
          questionText: "Sally spilled __________ water on the floor.",
          options: [
            { label: "1", text: "a few" },
            { label: "2", text: "some" },
            { label: "3", text: "much" },
            { label: "4", text: "many" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Quantifier with uncountable noun in affirmative",
            steps: [
              "'Water' is an uncountable noun.",
              "In affirmative sentences, use 'some' with uncountable nouns (not 'much' which is for questions/negatives).",
              "'A few' and 'many' are for countable nouns only.",
              "Answer: (2) some",
            ],
            tip:
              "In positive sentences with uncountable nouns: 'some' is the natural choice. 'Much' is used in questions and negatives.",
          },
        },
        {
          id: "hp_2024_eoy_q14",
          qNumber: 14,
          topic: "GrammarMCQ",
          subtopic: "Reflexive Pronoun (Plural)",
          questionText:
            "The twins were very proud of __________ for baking a cake for their mother's birthday.",
          options: [
            { label: "1", text: "himself" },
            { label: "2", text: "ourselves" },
            { label: "3", text: "yourselves" },
            { label: "4", text: "themselves" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Reflexive pronoun — third person plural",
            steps: [
              "The subject is 'the twins' = third person plural.",
              "Reflexive pronoun for third person plural = 'themselves'.",
              "'Himself' = third person singular male. 'Ourselves' = first person plural. 'Yourselves' = second person plural.",
              "Answer: (4) themselves",
            ],
            tip:
              "Reflexive pronouns: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART II — SECTION C: GRAMMAR CLOZE (8 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secC",
      name: "Part II – Section C: Grammar Cloze",
      topic: "GrammarCloze",
      instructions:
        "Read the passage below. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. USE A WORD ONCE ONLY.",
      marks: 8,
      questionType: "B",
      subsections: [
        {
          id: "hp2024_secC_passA",
          name: "Passage A – Birthday Surprise",
          passage: {
            title: "A Surprise for Dad",
            type: "prose",
            content: `Elsa and Tom planned to surprise their father on his birthday. They sneaked into the kitchen and whipped up a batch of chocolate chip cookies that they knew (15)__________ liked. With flour on their noses and giggles in the air, (16)__________ baked away. When their father walked in, the aroma of freshly baked cookies greeted (17)__________. Surprised and delighted, he gave (18)__________ a big hug. He thanked them for the wonderful surprise.`,
            wordBank: [
              { label: "A", word: "he" },
              { label: "B", word: "him" },
              { label: "C", word: "them" },
              { label: "D", word: "they" },
              { label: "E", word: "us" },
              { label: "F", word: "we" },
            ],
          },
          questions: [
            {
              id: "hp_2024_eoy_q15",
              qNumber: 15,
              topic: "GrammarCloze",
              subtopic: "Subject Pronoun (He)",
              questionText:
                "…chocolate chip cookies that they knew (15)__________ liked.",
              blankPosition: 1,
              answer: "A",
              answerWord: "he",
              marks: 1,
              solution: {
                method: "Subject pronoun reference",
                steps: [
                  "The blank refers to the father — they baked cookies that THEIR FATHER liked.",
                  "The father is third person male → subject pronoun 'he'.",
                  "Answer: (A) he",
                ],
                tip: "'He' is a subject pronoun — it does the action (liking cookies).",
              },
            },
            {
              id: "hp_2024_eoy_q16",
              qNumber: 16,
              topic: "GrammarCloze",
              subtopic: "Subject Pronoun (They)",
              questionText:
                "With flour on their noses and giggles in the air, (16)__________ baked away.",
              blankPosition: 2,
              answer: "D",
              answerWord: "they",
              marks: 1,
              solution: {
                method: "Subject pronoun — third person plural",
                steps: [
                  "Elsa and Tom = plural third person = 'they' (subject, doing the baking).",
                  "Answer: (D) they",
                ],
                tip: "Elsa and Tom → they (subject). Check: 'they baked away' ✓",
              },
            },
            {
              id: "hp_2024_eoy_q17",
              qNumber: 17,
              topic: "GrammarCloze",
              subtopic: "Object Pronoun (Him)",
              questionText:
                "…the aroma of freshly baked cookies greeted (17)__________.",
              blankPosition: 3,
              answer: "B",
              answerWord: "him",
              marks: 1,
              solution: {
                method: "Object pronoun — male third person singular",
                steps: [
                  "The aroma greeted the father. The father receives the action = object.",
                  "Object pronoun for male singular = 'him'.",
                  "Answer: (B) him",
                ],
                tip: "After a verb, use object pronouns: me, you, him, her, it, us, them.",
              },
            },
            {
              id: "hp_2024_eoy_q18",
              qNumber: 18,
              topic: "GrammarCloze",
              subtopic: "Object Pronoun (Them)",
              questionText:
                "Surprised and delighted, he gave (18)__________ a big hug.",
              blankPosition: 4,
              answer: "C",
              answerWord: "them",
              marks: 1,
              solution: {
                method: "Object pronoun — third person plural",
                steps: [
                  "The father gave a hug to Elsa and Tom (= them, receiving the action).",
                  "Object pronoun for plural third person = 'them'.",
                  "Answer: (C) them",
                ],
                tip: "'He gave them a hug' — 'them' is the indirect object (recipient of the hug).",
              },
            },
          ],
        },
        {
          id: "hp2024_secC_passB",
          name: "Passage B – Selena the Artist",
          passage: {
            title: "Selena the Artist",
            type: "prose",
            content: `Selena loves reading about Vincent van Gogh. She dreams of becoming a famous artist one day as she loves to (19)__________. In her free time, she enjoys (20)__________ flowers, animals, and even her family. Last weekend, she (21)__________ a picture of her family having a picnic in the park.

When she (22)__________, she feels happy and excited. With a paintbrush in hand, Selena creates wonderful works of art that make everyone smile.`,
            wordBank: [
              { label: "1", word: "paint" },
              { label: "2", word: "paints" },
              { label: "3", word: "painted" },
              { label: "4", word: "painting" },
              { label: "5", word: "has painted" },
              { label: "6", word: "was painting" },
            ],
          },
          questions: [
            {
              id: "hp_2024_eoy_q19",
              qNumber: 19,
              topic: "GrammarCloze",
              subtopic: "Infinitive (to + base verb)",
              questionText:
                "She dreams of becoming a famous artist one day as she loves to (19)__________.",
              blankPosition: 1,
              answer: "paint",
              marks: 1,
              solution: {
                method: "Infinitive form after 'to'",
                steps: [
                  "'Loves to + verb' requires the BASE FORM (infinitive without 'to').",
                  "Base form of 'paint' = 'paint'.",
                  "Answer: paint",
                ],
                tip: "'Love to + verb': always use the base form. 'She loves to paint.' ✓",
              },
            },
            {
              id: "hp_2024_eoy_q20",
              qNumber: 20,
              topic: "GrammarCloze",
              subtopic: "Gerund after 'enjoys'",
              questionText:
                "In her free time, she enjoys (20)__________ flowers, animals, and even her family.",
              blankPosition: 2,
              answer: "painting",
              marks: 1,
              solution: {
                method: "Gerund after 'enjoy'",
                steps: [
                  "'Enjoy + verb-ing' is a fixed pattern — the verb after 'enjoy' must be a gerund (-ing form).",
                  "painting = gerund form of 'paint'.",
                  "Answer: painting",
                ],
                tip: "Verbs followed by gerunds: enjoy, finish, avoid, suggest, consider + verb-ing.",
              },
            },
            {
              id: "hp_2024_eoy_q21",
              qNumber: 21,
              topic: "GrammarCloze",
              subtopic: "Simple Past",
              questionText:
                "Last weekend, she (21)__________ a picture of her family having a picnic.",
              blankPosition: 3,
              answer: "painted",
              marks: 1,
              solution: {
                method: "Simple past tense",
                steps: [
                  "Time clue: 'Last weekend' → simple past tense.",
                  "Simple past of 'paint' = 'painted'.",
                  "Answer: painted",
                ],
                tip: "'Last weekend/yesterday/last year' → simple past tense.",
              },
            },
            {
              id: "hp_2024_eoy_q22",
              qNumber: 22,
              topic: "GrammarCloze",
              subtopic: "Simple Present (Habitual)",
              questionText:
                "When she (22)__________, she feels happy and excited.",
              blankPosition: 4,
              answer: "paints",
              marks: 1,
              solution: {
                method: "Simple present — habitual action, third person singular",
                steps: [
                  "The sentence describes a general truth/habit ('when she paints' = whenever she paints).",
                  "Simple present + third person singular → 'paints'.",
                  "Answer: paints",
                ],
                tip:
                  "Third person singular (he/she/it) + simple present = verb + s. 'She paints' ✓",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART II — SECTION D: VOCABULARY CLOZE (5 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secD",
      name: "Part II – Section D: Vocabulary Cloze",
      topic: "VocabCloze",
      instructions:
        "Fill in the blanks with the most suitable word.",
      marks: 5,
      questionType: "B",
      passage: {
        title: "Wei Zhe and the Classroom Plant",
        type: "prose",
        content: `Mrs Ng, the Science teacher, brought a plant into the classroom. Wei Zhe was asked to (23)__________ for the plant. Each day, he watered it and (24)__________ sure it had enough sunlight.

Last week, Wei Zhe was (25)__________ revising for his English test and forgot to water the plant. Some of its (26)__________ turned yellow and dried up. Feeling (27)__________, Wei Zhe apologised to Mrs Ng and promised to be more responsible. He was happy to be given a second chance.`,
      },
      questions: [
        {
          id: "hp_2024_eoy_q23",
          qNumber: 23,
          topic: "VocabCloze",
          subtopic: "Verb — Responsibility",
          questionText:
            "Wei Zhe was asked to (23)__________ for the plant.",
          blankPosition: 1,
          answer: "care",
          marks: 1,
          solution: {
            method: "Fixed phrase 'care for'",
            steps: [
              "'Care for' = to look after / tend to something (e.g., a plant, a pet).",
              "The fixed phrase is 'care for' = to take care of.",
              "Answer: care",
            ],
            tip: "'Care for' = to look after. 'Take care of' = same meaning.",
          },
        },
        {
          id: "hp_2024_eoy_q24",
          qNumber: 24,
          topic: "VocabCloze",
          subtopic: "Verb — Fixed Expression",
          questionText:
            "Each day, he watered it and (24)__________ sure it had enough sunlight.",
          blankPosition: 2,
          answer: "made",
          marks: 1,
          solution: {
            method: "Fixed expression 'made sure'",
            steps: [
              "'Make sure' = to ensure something happens. Past tense: 'made sure'.",
              "The passage is in past tense (watered → past), so 'made' is correct.",
              "Answer: made",
            ],
            tip: "'Make sure' is a fixed expression. Past tense: 'made sure'.",
          },
        },
        {
          id: "hp_2024_eoy_q25",
          qNumber: 25,
          topic: "VocabCloze",
          subtopic: "Adjective — Activity",
          questionText:
            "Last week, Wei Zhe was (25)__________ revising for his English test and forgot to water the plant.",
          blankPosition: 3,
          answer: "busy",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Wei Zhe was occupied with English revision and forgot the plant.",
              "'Busy' = occupied with something; 'was busy revising' = was occupied with revising.",
              "Answer: busy",
            ],
            tip: "'Was busy + Ving' = was occupied doing something. Common expression.",
          },
        },
        {
          id: "hp_2024_eoy_q26",
          qNumber: 26,
          topic: "VocabCloze",
          subtopic: "Plant Vocabulary",
          questionText:
            "Some of its (26)__________ turned yellow and dried up.",
          blankPosition: 4,
          answer: "leaves",
          marks: 1,
          solution: {
            method: "Plant vocabulary",
            steps: [
              "Parts of a plant: roots, stem, leaves, flowers, fruit.",
              "When a plant is not watered, its LEAVES turn yellow and dry up.",
              "Answer: leaves",
            ],
            tip: "Plant parts: roots (underground), stem (upright), leaves (flat green parts), flowers.",
          },
        },
        {
          id: "hp_2024_eoy_q27",
          qNumber: 27,
          topic: "VocabCloze",
          subtopic: "Emotion Vocabulary",
          questionText:
            "Feeling (27)__________, Wei Zhe apologised to Mrs Ng and promised to be more responsible.",
          blankPosition: 5,
          answer: "guilty",
          marks: 1,
          solution: {
            method: "Emotion vocabulary in context",
            steps: [
              "Wei Zhe forgot to water the plant (his responsibility) → he apologised.",
              "When you did something wrong and feel bad about it = 'guilty'.",
              "Answer: guilty",
            ],
            tip: "'Guilty' = the feeling of having done something wrong. Linked to apologising.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART II — SECTION E: EDITING – Spelling (5 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secE",
      name: "Part II – Section E: Editing (Spelling)",
      topic: "Editing",
      instructions:
        "Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.",
      marks: 5,
      questionType: "B",
      passage: {
        title: "Nature Walk Adventure",
        type: "prose",
        content: `Arvin and James went on a nature walk during the school holidays. As they explored (28) the park, they disscovered a picnic area that was filled with trash. The leftover food in the (29) (30) plastic containers smelled terribel. They decided to clean up the filthy picnic area to protact (31) the environment. While cleaning up, Arvin saw some unusuel red berries on a bush nearby. He wanted to eat one. Luckily, James stopped him in time as he knew that the berries could (32) be poisonuos. Arvin thanked James for looking out for him. The picnic area became a pleasant space for everyone to enjoy.`,
      },
      questions: [
        {
          id: "hp_2024_eoy_q28",
          qNumber: 28,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…they disscovered a picnic area that was filled with trash.",
          answer: "discovered",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'disscovered' is misspelled. Correct spelling: 'discovered'.",
              "Break down: dis-cov-er-ed. Only one 's' in 'discovered'.",
              "Answer: discovered",
            ],
            tip: "discover → discovered. Only one 's': dis-cover.",
          },
        },
        {
          id: "hp_2024_eoy_q29",
          qNumber: 29,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…the plastic containers smelled terribel.",
          answer: "terrible",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'terribel' is misspelled. Correct spelling: 'terrible'.",
              "Break down: ter-ri-ble. The ending is '-ble', not '-bel'.",
              "Answer: terrible",
            ],
            tip: "Words ending in '-ble': terrible, horrible, possible, comfortable.",
          },
        },
        {
          id: "hp_2024_eoy_q30",
          qNumber: 30,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…to clean up the filthy picnic area to protact the environment.",
          answer: "protect",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'protact' is misspelled. Correct spelling: 'protect'.",
              "Break down: pro-tect. The vowel is 'e', not 'a'.",
              "Answer: protect",
            ],
            tip: "protect → protection. The stem is 'protect' (pro-tect).",
          },
        },
        {
          id: "hp_2024_eoy_q31",
          qNumber: 31,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…Arvin saw some unusuel red berries on a bush nearby.",
          answer: "unusual",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'unusuel' is misspelled. Correct spelling: 'unusual'.",
              "Break down: un-u-su-al. The ending is '-al', not '-el'.",
              "Answer: unusual",
            ],
            tip: "unusual = un + usual. The base word is 'usual' → unusual.",
          },
        },
        {
          id: "hp_2024_eoy_q32",
          qNumber: 32,
          topic: "Editing",
          subtopic: "Spelling",
          questionText:
            "…he knew that the berries could be poisonuos.",
          answer: "poisonous",
          marks: 1,
          solution: {
            method: "Spelling correction",
            steps: [
              "'poisonuos' is misspelled. Correct spelling: 'poisonous'.",
              "Break down: poi-son-ous. The ending is '-ous', not '-uos'.",
              "Answer: poisonous",
            ],
            tip: "poison → poisonous (add '-ous'). Many adjectives end in '-ous': dangerous, famous, nervous.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART II — SECTION F: SYNTHESIS (2 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secF",
      name: "Part II – Section F: Synthesis",
      topic: "SentenceCombining",
      instructions:
        "Rewrite the following pairs of sentences as one sentence without changing the original meaning.",
      marks: 2,
      questionType: "A",
      questions: [
        {
          id: "hp_2024_eoy_q33",
          qNumber: 33,
          topic: "SentenceCombining",
          subtopic: "Synthesis using 'as' (Reason)",
          questionText:
            "It was raining heavily. The race was cancelled.\n\n__________ as __________.",
          answer:
            "The race was cancelled as it was raining heavily.",
          marks: 1,
          solution: {
            method: "Combining cause and effect with 'as'",
            steps: [
              "'As' = because (giving a reason).",
              "Effect: 'The race was cancelled'. Reason: 'it was raining heavily'.",
              "Structure: [Effect] as [Reason].",
              "Answer: The race was cancelled as it was raining heavily.",
            ],
            tip: "'As' = because when it introduces a reason clause. Can also be placed at the start: 'As it was raining heavily, the race was cancelled.'",
          },
        },
        {
          id: "hp_2024_eoy_q34",
          qNumber: 34,
          topic: "SentenceCombining",
          subtopic: "Synthesis using 'if' (Conditional)",
          questionText:
            "The weather is good. Ivan wants to go swimming.\n\n__________ if __________.",
          answer:
            "Ivan wants to go swimming if the weather is good.",
          marks: 1,
          solution: {
            method: "Combining condition and result with 'if'",
            steps: [
              "'If' introduces a condition.",
              "Condition: 'the weather is good'. Result: 'Ivan wants to go swimming'.",
              "Structure: [Result] if [Condition].",
              "Answer: Ivan wants to go swimming if the weather is good.",
            ],
            tip: "'If' introduces a condition. The 'if' clause can come before or after the main clause.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART II — SECTION G: COMPREHENSION 1 (8 × 1m)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secG",
      name: "Part II – Section G: Comprehension 1",
      topic: "ComprehensionMCQ",
      instructions:
        "Read the passage below and answer questions 35 to 42.",
      marks: 8,
      questionType: "B",
      passage: {
        title: "Maya Gets Lost",
        type: "narrative",
        lineNumbers: true,
        content: `It was the June holidays. Maya and her family were on a vacation in another country. They were walking along a crowded street. There were many people buying and selling things. Suddenly, Maya stopped walking. "Where is Sara?" Maya thought as she felt scared. She looked around the shops. She could not see her parents too. She started to cry.

A food vendor noticed that Maya was lost. She waved to Maya to catch her attention. She invited Maya to her food stall. Maya and the food vendor did not speak the same language so they used hand gestures to 'talk'. The food vendor smiled and offered Maya a bowl of noodles but Maya was too worried to eat. She looked into the food vendor's kind eyes and felt comforted that she was in good hands.

The food vendor asked the other street vendors to search for Maya's family. Soon, they were found. Maya's family were so relieved to see Maya that they ran all the way to the food vendor's stall. Sara reached Maya first. The sisters hugged each other happily. Maya's mother thanked the food vendor. Maya smiled at the food vendor to thank her.`,
      },
      questions: [
        {
          id: "hp_2024_eoy_q35",
          qNumber: 35,
          topic: "ComprehensionMCQ",
          subtopic: "Literal — Character Feeling",
          questionText:
            "Maya felt frightened when she __________. [1m]",
          options: [
            { label: "1", text: "stopped walking" },
            { label: "2", text: "could not see her sister" },
            { label: "3", text: "thanked the food vendor" },
            { label: "4", text: "walked along a crowded street" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Locating cause of fear",
            steps: [
              "Text: '\"Where is Sara?\" Maya thought as she felt scared.'",
              "Maya stopped to ask 'Where is Sara?' — she could not see her sister Sara.",
              "She then also noticed she couldn't see her parents, but the initial trigger was Sara being missing.",
              "Answer: (2) could not see her sister",
            ],
            tip: "Find the exact sentence where Maya 'felt scared' and identify what caused it.",
          },
        },
        {
          id: "hp_2024_eoy_q36",
          qNumber: 36,
          topic: "ComprehensionMCQ",
          subtopic: "Literal — Action of Character",
          questionText:
            "The food vendor __________ to catch Maya's attention. [1m]",
          options: [
            { label: "1", text: "smiled" },
            { label: "2", text: "waved" },
            { label: "3", text: "whistled" },
            { label: "4", text: "shouted" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Locating specific action",
            steps: [
              "Text: 'She waved to Maya to catch her attention.'",
              "The food vendor waved (= moved her hand as a gesture).",
              "Answer: (2) waved",
            ],
            tip: "Scan for the exact verb used to describe how the food vendor got Maya's attention.",
          },
        },
        {
          id: "hp_2024_eoy_q37",
          qNumber: 37,
          topic: "ComprehensionMCQ",
          subtopic: "Inference — Communication Method",
          questionText:
            "The food vendor communicated with Maya by __________. [1m]",
          options: [
            { label: "1", text: "giving her food" },
            { label: "2", text: "looking into her eyes" },
            { label: "3", text: "using hand gestures" },
            { label: "4", text: "speaking the same language" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Locating specific detail",
            steps: [
              "Text: 'Maya and the food vendor did not speak the same language so they used hand gestures to \"talk\".'",
              "They communicated using hand gestures.",
              "Answer: (3) using hand gestures",
            ],
            tip: "The passage explicitly states they used 'hand gestures to talk' as they didn't share a language.",
          },
        },
        {
          id: "hp_2024_eoy_q38_39",
          qNumber: 38,
          topic: "ComprehensionMCQ",
          subtopic: "True / False",
          questionText:
            "For questions 38 to 39, read each question carefully and tick (✓) \"True\" or \"False\". [2m]\n\n38. Maya did not eat the bowl of noodles.\n39. Maya was not sure if the food vendor would help her.",
          answer: "38: True   39: False",
          marks: 2,
          solution: {
            method: "Verification against text",
            steps: [
              "Q38: Text — 'The food vendor…offered Maya a bowl of noodles but Maya was too worried to eat.' → She did NOT eat. → True",
              "Q39: Text — 'She looked into the food vendor's kind eyes and felt comforted that she was in good hands.' → She FELT COMFORTED (i.e., she was reassured the vendor would help). → False (she WAS sure the vendor would help)",
              "Answers: 38: True   39: False",
            ],
            tip: "Q39 is a tricky one — Maya felt 'comforted that she was in good hands' = she felt the vendor WOULD help her.",
          },
        },
        {
          id: "hp_2024_eoy_q40",
          qNumber: 40,
          topic: "ComprehensionMCQ",
          subtopic: "Vocabulary — Word Meaning",
          questionText:
            "Which word in paragraph 2 tells us that the street vendor saw what had happened to Maya? [1m]",
          answer: "noticed",
          marks: 1,
          solution: {
            method: "Vocabulary — finding the right word",
            steps: [
              "Para 2 begins: 'A food vendor noticed that Maya was lost.'",
              "'Noticed' = became aware of / saw and understood what was happening.",
              "Answer: noticed",
            ],
            tip: "Scan paragraph 2 for the word that means 'saw/became aware of'.",
          },
        },
        {
          id: "hp_2024_eoy_q41",
          qNumber: 41,
          topic: "ComprehensionMCQ",
          subtopic: "Sequence of Events",
          questionText:
            "Write 1, 2 and 3 in the boxes below to show the sequence of events that happened in paragraph 3 of the passage. [1m]\n\n___ Maya hugged her sister.\n___ The food vendor asked the other street vendors for help.\n___ Maya's family saw her and ran all the way to the food vendor's stall.",
          answer:
            "Maya hugged her sister: 3 | Food vendor asked for help: 1 | Family ran to stall: 2",
          marks: 1,
          solution: {
            method: "Sequence from paragraph 3",
            steps: [
              "Order in paragraph 3:",
              "1 — 'The food vendor asked the other street vendors to search for Maya's family.'",
              "2 — 'Maya's family were so relieved to see Maya that they ran all the way to the food vendor's stall.'",
              "3 — 'Sara reached Maya first. The sisters hugged each other happily.'",
              "Answer: Food vendor asked→1, Family ran→2, Hugged→3",
            ],
            tip: "Number events in the order they appear in the paragraph.",
          },
        },
        {
          id: "hp_2024_eoy_q42",
          qNumber: 42,
          topic: "ComprehensionMCQ",
          subtopic: "Pronoun Reference",
          questionText:
            "Who does the word \"they\" in line 12 refer to? [1m]",
          answer: "Maya's family",
          marks: 1,
          solution: {
            method: "Pronoun reference",
            steps: [
              "Line 12: 'Soon, they were found.' — context: the food vendor asked vendors to search for Maya's family.",
              "'They' refers to Maya's family (the people being searched for).",
              "Answer: Maya's family",
            ],
            tip: "Trace back to the noun 'they' replaces. The food vendor searched for Maya's FAMILY → they = Maya's family.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // PART II — SECTION H: COMPREHENSION 2 (8 marks)
    // ─────────────────────────────────────────

    {
      id: "hp2024_secH",
      name: "Part II – Section H: Comprehension 2",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage below and answer questions 43 to 48.",
      marks: 8,
      questionType: "B",
      passage: {
        title: "Lily and the Shiny Coin",
        type: "narrative",
        lineNumbers: true,
        content: `The bell rang. It was the end of the school day. Lily packed her school bag and walked down to the bus bay. Just as she reached her bus, she saw something shiny lying in the space between two pots of plants next to the guardhouse. She was curious. So, she bent down to pick it up. Her eyes widened in excitement. It was a coin with a special engraving on it.

"It would make a perfect gift for Daddy for his birthday. He will be happy to add this to his coin collection," she thought. She put the coin carefully in her wallet.

The next day, she spotted a young boy at the bus bay. He looked like he was looking for something. His eyes were brimming with tears. She asked him what he was looking for. Sobbing, he explained that he was looking for a coin.

Immediately, Lily took out the coin from her wallet and showed it to him. The young boy's face lit up with joy. He was so relieved that he gave her a big hug. Looking a little embarrassed, he explained, "It belongs to my brother. It is very precious to him and I borrowed it to show my friends yesterday."

Even though Lily had wanted to give the coin to her father, she knew that she had to return it to its rightful owner. She boarded the bus happily. She was glad as she knew she had made the right decision.`,
      },
      questions: [
        {
          id: "hp_2024_eoy_q43",
          qNumber: 43,
          topic: "ComprehensionOE",
          subtopic: "Literal — Location",
          questionText: "Where was the coin found? [1m]",
          answer:
            "The coin was found in the space between two pots of plants next to the guardhouse.",
          marks: 1,
          solution: {
            method: "Locate specific detail",
            steps: [
              "Text: '…she saw something shiny lying in the space between two pots of plants next to the guardhouse.'",
              "Answer: The coin was found between two pots of plants next to the guardhouse.",
            ],
            tip: "For 'where' questions, find the exact location described in the text.",
          },
        },
        {
          id: "hp_2024_eoy_q44",
          qNumber: 44,
          topic: "ComprehensionOE",
          subtopic: "Vocabulary — Synonym from Text",
          questionText:
            "Which word in paragraph 1 has the same meaning as 'eager to know more about something'? [1m]",
          answer: "curious",
          marks: 1,
          solution: {
            method: "Vocabulary — synonym identification",
            steps: [
              "'Eager to know more about something' = curious.",
              "Para 1 text: 'She was curious. So, she bent down to pick it up.'",
              "Answer: curious",
            ],
            tip: "'Curious' = wanting to know or learn about something. Synonym: inquisitive, eager to know.",
          },
        },
        {
          id: "hp_2024_eoy_q45",
          qNumber: 45,
          topic: "ComprehensionOE",
          subtopic: "Pronoun Reference",
          questionText:
            "What does the word 'this' in line 7 refer to? [1m]",
          answer: "The shiny coin (that Lily found).",
          marks: 1,
          solution: {
            method: "Pronoun reference",
            steps: [
              "Line 7: '\"He will be happy to add this to his coin collection,\" she thought.'",
              "'This' refers to the shiny coin with a special engraving that Lily had just found.",
              "Answer: The shiny coin (that Lily found).",
            ],
            tip: "Trace back what Lily was thinking about just before — it was the coin she picked up.",
          },
        },
        {
          id: "hp_2024_eoy_q46",
          qNumber: 46,
          topic: "ComprehensionOE",
          subtopic: "Sequence of Events",
          questionText:
            "Write 1, 2 and 3 in the boxes below to show the sequence of events that happened in the passage. [1m]\n\n___ Lily put the coin in her wallet.\n___ Lily was glad she had made the right decision.\n___ Lily saw a young boy looking for something at the bus bay.",
          answer:
            "Lily put coin in wallet: 1 | Lily was glad: 3 | Lily saw young boy: 2",
          marks: 1,
          solution: {
            method: "Sequence of events across paragraphs",
            steps: [
              "Para 2: 'She put the coin carefully in her wallet.' → 1",
              "Para 3: 'The next day, she spotted a young boy at the bus bay.' → 2",
              "Para 5 (last): 'She was glad as she knew she had made the right decision.' → 3",
              "Answer: Coin in wallet=1, Young boy=2, Glad=3",
            ],
            tip: "Follow the chronological order of the story across the paragraphs.",
          },
        },
        {
          id: "hp_2024_eoy_q47",
          qNumber: 47,
          topic: "ComprehensionOE",
          subtopic: "Emotion Before and After",
          questionText:
            "Based on the passage, write down how the young boy felt before and after he found the coin. [2m]\n\nbefore finding the coin: __________\nafter finding the coin: __________",
          answer:
            "Before: sad/distressed/upset (his eyes were brimming with tears; he was sobbing)\nAfter: relieved/joyful (his face lit up with joy; he was so relieved)",
          marks: 2,
          solution: {
            method: "Compare emotions before and after",
            steps: [
              "BEFORE: 'His eyes were brimming with tears.' / 'Sobbing, he explained…' → He felt sad / upset / distressed.",
              "AFTER: 'The young boy's face lit up with joy. He was so relieved…' → He felt joyful / relieved / happy.",
              "Award 1m for each correct feeling with text-based support.",
            ],
            tip: "Use adjectives from or implied by the text: 'brimming with tears' → sad; 'face lit up with joy' → joyful.",
          },
        },
        {
          id: "hp_2024_eoy_q48",
          qNumber: 48,
          topic: "ComprehensionOE",
          subtopic: "Character Trait with Evidence",
          questionText:
            "(a) Which one of the following words best describes Lily's character at the end of the story? Put a tick in the box beside your answer. Tick one box only. [1m]\n□ honest\n□ boastful\n□ respectful\n\n(b) Using evidence from the passage, explain why you have chosen the word in (a). [1m]",
          answer:
            "(a) honest\n(b) Lily is honest because even though she wanted to give the coin to her father, she returned it to the young boy as it was not hers to keep.",
          marks: 2,
          solution: {
            method: "Character trait with textual evidence",
            steps: [
              "Part (a): The story ends with Lily returning the coin to its rightful owner — this shows HONESTY.",
              "'Boastful' = bragging. 'Respectful' = showing respect (not the main trait shown).",
              "Part (b): Text evidence — 'she knew that she had to return it to its rightful owner' / 'she was glad as she knew she had made the right decision'.",
              "Answer: (a) honest  (b) Lily is honest because she returned the coin to its rightful owner even though she had wanted to keep it for her father.",
            ],
            tip:
              "For character trait questions: identify the trait from actions in the story and quote specific text as evidence.",
          },
        },
      ],
    },
  ],
};

export default paper;
