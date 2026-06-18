// src/data/p3/english/papers/eoy_aitong_paper2_2025.ts
// Ai Tong School — Primary 3 English Language
// 2025 End-of-Year Examination — Paper 2 (Language Use and Comprehension)
// Date: 28 October 2025 | Total Marks: 50
// Sections: Grammar MCQ (A), Vocabulary MCQ (B), Visual Text MCQ (C),
//           Grammar Cloze x2 passages (D), Editing for Spelling (E),
//           Word Order (F), Comprehension 1 (G), Comprehension 2 (H)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_aitong_paper2_2025",
  school: "Ai Tong School",
  level: "P3",
  subject: "English",
  paperType: "EOY Paper 2 (Language Use and Comprehension)",
  year: 2025,
  totalMarks: 50,
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — Grammar MCQ (8 × 1 m = 8 m)
    // ─────────────────────────────────────────────
    {
      id: "secA",
      name: "Section A: Grammar MCQ",
      topic: "GrammarMCQ",
      marks: 8,
      questions: [
        {
          id: "at_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: '"Keep your voices down. The baby ____________," Mother said sternly to the children.',
          options: [
            { label: "1", text: "slept" },
            { label: "2", text: "sleeps" },
            { label: "3", text: "is sleeping" },
            { label: "4", text: "was sleeping" },
          ],
          answer: "3",
          solution: {
            method: "Present continuous — action happening right now",
            steps: [
              "Mother tells the children to keep their voices down — the baby is sleeping AT THIS MOMENT.",
              "An action happening right now → present continuous: is sleeping.",
              "'slept' is past tense — the baby is currently asleep, not in the past.",
              "'sleeps' is simple present (habit) — not for what is happening at this exact moment.",
              "'was sleeping' is past continuous — wrong tense since the baby is sleeping now.",
            ],
            tip: "Present continuous (is/are + verb-ing) describes actions happening RIGHT NOW. Use it for current, ongoing actions.",
          },
        },
        {
          id: "at_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: '"Please remove ____________ bags over there that are blocking the way," said the teacher.',
          options: [
            { label: "1", text: "this" },
            { label: "2", text: "that" },
            { label: "3", text: "those" },
            { label: "4", text: "these" },
          ],
          answer: "3",
          solution: {
            method: "Demonstrative adjectives — near/far, singular/plural",
            steps: [
              "'Bags' is plural.",
              "'Over there' indicates the bags are FAR from the speaker.",
              "Far + plural = 'those'.",
              "'these' = near + plural (wrong — bags are over there).",
              "'that' = far + singular (wrong — bags is plural).",
              "'this' = near + singular (doubly wrong).",
            ],
            tip: "Over there = far. Plural noun = those (far) or these (near). Singular noun = that (far) or this (near).",
          },
        },
        {
          id: "at_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: "My family and I ____________ at the mall when we spotted a crying child.",
          options: [
            { label: "1", text: "shop" },
            { label: "2", text: "shopped" },
            { label: "3", text: "are shopping" },
            { label: "4", text: "were shopping" },
          ],
          answer: "4",
          solution: {
            method: "Past continuous — ongoing past action interrupted",
            steps: [
              "The sentence describes what the family was doing WHEN they spotted a child.",
              "'when we spotted' is simple past — this interrupts the ongoing action.",
              "Ongoing past action interrupted by simple past → past continuous: were shopping.",
              "'shopped' (simple past) would suggest the shopping was completed, not ongoing when they spotted the child.",
              "'shop'/'are shopping' are present tense — wrong for a past event.",
            ],
            tip: "Pattern: were [verb]-ing WHEN [simple past]. The 'when' clause interrupts the continuous action.",
          },
        },
        {
          id: "at_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "Many pails of sand ____________ used to build the magnificent sandcastle last year.",
          options: [
            { label: "1", text: "were" },
            { label: "2", text: "was" },
            { label: "3", text: "are" },
            { label: "4", text: "is" },
          ],
          answer: "1",
          solution: {
            method: "Subject-verb agreement — passive past tense",
            steps: [
              "The subject is 'many pails of sand' — plural (many pails).",
              "Time marker: 'last year' → past tense.",
              "Plural subject + past tense + passive = 'were used'.",
              "'was' is singular past — wrong for plural 'many pails'.",
              "'are/is' are present tense — wrong for 'last year'.",
            ],
            tip: "Subject-verb agreement in passive: Many pails WERE used. A pail WAS used.",
          },
        },
        {
          id: "at_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: "The man was in a hurry and walked right ____________ a glass door, resulting in a loud thud.",
          options: [
            { label: "1", text: "into" },
            { label: "2", text: "behind" },
            { label: "3", text: "around" },
            { label: "4", text: "through" },
          ],
          answer: "1",
          solution: {
            method: "Preposition of movement — collision",
            steps: [
              "The man was not supposed to enter the door — he COLLIDED with it.",
              "'Walk into something' = accidentally collide with it.",
              "'Walk through' = pass through successfully (implies the door was open).",
              "'Walk behind' = walk at the back of.",
              "'Walk around' = go around the door to avoid it.",
              "Since there was a 'thud', he hit the door — 'into' is correct.",
            ],
            tip: "'Walk into' = accidentally collide with. 'Walk through' = pass through an opening. The thud confirms a collision.",
          },
        },
        {
          id: "at_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: '"You have spent ____________ hours working on the difficult project and deserve a treat," Mother told me.',
          options: [
            { label: "1", text: "much" },
            { label: "2", text: "many" },
            { label: "3", text: "a few" },
            { label: "4", text: "a little" },
          ],
          answer: "2",
          solution: {
            method: "Quantifiers — countable vs uncountable",
            steps: [
              "'Hours' is a countable noun (one hour, two hours, many hours).",
              "For countable nouns, use 'many' (a large number) or 'a few' (a small number).",
              "'Much' and 'a little' are for uncountable nouns.",
              "Mother says the child worked hard and deserves a treat → the child spent MANY hours.",
              "'A few' would minimise the effort — doesn't fit 'deserves a treat' for hard work.",
            ],
            tip: "Hours = countable → many hours / a few hours. Time in general = uncountable → much time / a little time.",
          },
        },
        {
          id: "at_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: "Father reminded us to clean up the area ____________ after the painting activity.",
          options: [
            { label: "1", text: "yourself" },
            { label: "2", text: "ourselves" },
            { label: "3", text: "yourselves" },
            { label: "4", text: "themselves" },
          ],
          answer: "2",
          solution: {
            method: "Reflexive pronouns — speaker included",
            steps: [
              "Father reminded 'us' — the narrator and others.",
              "'Us' = first person plural (we, including the speaker).",
              "Reflexive for 'us/we' = 'ourselves'.",
              "'yourselves' = for 'you all' (second person plural — Father addressing the group).",
              "Wait — Father is telling 'us', so from Father's perspective it would be 'yourselves'.",
              "But the sentence is narrated by the child: 'Father reminded US' — so the reflexive refers back to 'us' = ourselves.",
            ],
            tip: "Reflexive matches the subject: he→himself, she→herself, we→ourselves, you (pl)→yourselves, they→themselves.",
          },
        },
        {
          id: "at_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: '"May I borrow your ruler? I did not bring ____________ today," said Jenny to her classmate.',
          options: [
            { label: "1", text: "his" },
            { label: "2", text: "hers" },
            { label: "3", text: "mine" },
            { label: "4", text: "yours" },
          ],
          answer: "3",
          solution: {
            method: "Possessive pronouns — referring back to subject",
            steps: [
              "Jenny says she did not bring her ruler ('mine' = my ruler).",
              "'Mine' is the possessive pronoun for 'I/me' — Jenny did not bring HER OWN ruler.",
              "'yours' = belonging to you (the classmate).",
              "'hers' = belonging to a third-person female.",
              "'his' = belonging to a third-person male.",
            ],
            tip: "Possessive pronouns stand alone (no noun after): mine, yours, his, hers, ours, theirs.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — Vocabulary MCQ (6 × 1 m = 6 m)
    // ─────────────────────────────────────────────
    {
      id: "secB",
      name: "Section B: Vocabulary MCQ",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "at_b_q9",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "Alex followed the ____________ step by step so that he could assemble the new bookshelf with ease.",
          options: [
            { label: "1", text: "instructions" },
            { label: "2", text: "scripts" },
            { label: "3", text: "notes" },
            { label: "4", text: "rules" },
          ],
          answer: "1",
          solution: {
            method: "Vocabulary — precise word for assembly guide",
            steps: [
              "'Instructions' = detailed directions for how to do something step by step.",
              "Assembling a bookshelf requires following instructions that come with the product.",
              "'Follow the instructions step by step' is a natural phrase.",
              "'Scripts' = written text for a speech/play.",
              "'Notes' = brief written information.",
              "'Rules' = regulations for behaviour — not for assembling furniture.",
            ],
            tip: "Instructions = step-by-step directions for completing a task. Very commonly used for manuals and assembly guides.",
          },
        },
        {
          id: "at_b_q10",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 10,
          marks: 1,
          stem: '"What shall I do with the money? Shall I keep or return it?" Tom ____________.',
          options: [
            { label: "1", text: "decided" },
            { label: "2", text: "realised" },
            { label: "3", text: "imagined" },
            { label: "4", text: "wondered" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — speech/thought verbs",
            steps: [
              "Tom is asking himself what to do — he is thinking about it but has not decided yet.",
              "'Wondered' = thought about something with uncertainty or curiosity.",
              "The quoted speech shows two options being considered — this is wondering.",
              "'Decided' = reached a conclusion — but Tom has not decided yet.",
              "'Realised' = understood something suddenly.",
              "'Imagined' = pictured something in the mind.",
            ],
            tip: "'Wonder' = think about something uncertain. 'Decide' = reach a final choice. The question marks in the quote show uncertainty = wondered.",
          },
        },
        {
          id: "at_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "The old car suddenly ____________, leaving us stranded along the road.",
          options: [
            { label: "1", text: "broke up" },
            { label: "2", text: "broke off" },
            { label: "3", text: "broke down" },
            { label: "4", text: "broke through" },
          ],
          answer: "3",
          solution: {
            method: "Phrasal verbs — 'break down'",
            steps: [
              "'Break down' (for machines/vehicles) = stop working suddenly.",
              "The car stopped working, leaving people stranded — this is a breakdown.",
              "'Break up' = end a relationship / disintegrate.",
              "'Break off' = detach or stop suddenly (a piece breaking off).",
              "'Break through' = force a way through / achieve success.",
            ],
            tip: "For machines/vehicles: break down = stop working. 'The car broke down and we were stranded.'",
          },
        },
        {
          id: "at_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "As the traffic light was turning red, Kim had to cross the road ____________.",
          options: [
            { label: "1", text: "rashly" },
            { label: "2", text: "briskly" },
            { label: "3", text: "directly" },
            { label: "4", text: "urgently" },
          ],
          answer: "2",
          solution: {
            method: "Adverbs of manner — appropriate speed and safety",
            steps: [
              "The traffic light was turning red — Kim needed to cross quickly before the light changed.",
              "'Briskly' = quickly and energetically — implies walking fast in a purposeful way.",
              "'Rashly' = without thinking/carelessly — implies dangerous recklessness. Not appropriate here.",
              "'Directly' = in a straight line without stopping — but the emphasis is on speed, not direction.",
              "'Urgently' = with urgency but more emotional — 'briskly' better describes the physical action of walking fast.",
            ],
            tip: "'Briskly' = quickly and purposefully. Used for walking/moving with energy. Correct for crossing a road quickly but safely.",
          },
        },
        {
          id: "at_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "Albert felt ____________ as he had come in first in the race again with no one able to match his speed.",
          options: [
            { label: "1", text: "bold" },
            { label: "2", text: "strong" },
            { label: "3", text: "powerful" },
            { label: "4", text: "invincible" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — feeling unbeatable",
            steps: [
              "'Invincible' = unable to be defeated or overcome.",
              "Albert came in first AND no one could match his speed — he was unbeatable.",
              "'Invincible' perfectly describes the feeling of being undefeated.",
              "'Bold' = brave/daring — not about being unbeatable.",
              "'Strong' = physical strength — doesn't capture the feeling of being undefeatable.",
              "'Powerful' = having great power — less specific than 'invincible' in a competition context.",
            ],
            tip: "'Invincible' = impossible to defeat. Used when someone feels unbeatable in a competition or challenge.",
          },
        },
        {
          id: "at_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: "After spinning in circles, Max ____________ across the grass, trying not to fall over.",
          options: [
            { label: "1", text: "limped" },
            { label: "2", text: "trudged" },
            { label: "3", text: "hobbled" },
            { label: "4", text: "staggered" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — types of walking after dizziness",
            steps: [
              "After spinning in circles, a person would be dizzy and unsteady.",
              "'Staggered' = walked unsteadily, swaying from side to side. Perfect for dizziness.",
              "'Limped' = walked with difficulty due to a leg injury (injury context).",
              "'Trudged' = walked slowly and with heavy steps due to tiredness or difficulty.",
              "'Hobbled' = walked with difficulty due to injury, similar to limp.",
            ],
            tip: "Types of walking: stagger (unsteady/dizzy), limp (injured leg), trudge (heavy/tired), hobble (difficulty/injured).",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — Visual Text Comprehension (5 × 1 m = 5 m)
    // ─────────────────────────────────────────────
    {
      id: "secC",
      name: "Section C: Visual Text Comprehension",
      topic: "VisualText",
      marks: 5,
      passage: {
        title: "Calm Park Poster",
        text: `CALM PARK
A green space in the city is opening on 7 December 2025!

To bring more greenery and calm to the city, a plan to make our city more beautiful was announced. The project began on 1 December 2022 and is finally complete, with trees, plants and open spaces! Come take a walk, relax and enjoy the beauty of nature!

FACILITIES:

PICNIC AREA
Open 7 a.m. to 7 p.m.
Enjoy outdoor meals and quiet moments.

ORCHID GARDEN
Open 12 p.m. to 6 p.m.
Pay just $2 to see over 100 unique species!

FITNESS ZONE
Open 5 a.m. to 11 p.m.
Choose from six different types of fitness equipment that suit your exercise routine.

INDOOR HERB GARDEN
Open 8 a.m. to 12 p.m.
Add flavour to your cooking with the wide variety of herbs that you can purchase here.

Park opening hours: 5 a.m. to 11 p.m. daily
Visit www.calmpark.sg to purchase tickets for Orchid Garden.
For enquiries, contact Robert Tan at 8539 6210 or email roberttan@calmpark.sg.`,
      },
      questions: [
        {
          id: "at_c_q15",
          type: "B",
          topic: "VisualText",
          questionNumber: 15,
          marks: 1,
          stem: "The main reason Calm Park was built is to ____________.",
          options: [
            { label: "1", text: "encourage more people to take walks in nature" },
            { label: "2", text: "make the city more beautiful" },
            { label: "3", text: "grow more trees and plants" },
            { label: "4", text: "help more people relax" },
          ],
          answer: "2",
          solution: {
            method: "Locate purpose/main reason from poster text",
            steps: [
              "Passage: 'a plan to make our city more beautiful was announced'.",
              "This directly states the main reason for building the park.",
              "Option 1 and 4 are benefits/secondary purposes mentioned, not the main reason.",
              "Option 3 is a feature of the park, not its primary purpose.",
            ],
            tip: "The main reason is explicitly stated in the text. Look for words like 'a plan to…', 'to bring…', 'in order to…'.",
          },
        },
        {
          id: "at_c_q16",
          type: "B",
          topic: "VisualText",
          questionNumber: 16,
          marks: 1,
          stem: "The facilities in Calm Park ____________.",
          options: [
            { label: "1", text: "are all indoors" },
            { label: "2", text: "do not require entrance fees" },
            { label: "3", text: "are open to the public every day" },
            { label: "4", text: "share the same opening hours as the park" },
          ],
          answer: "3",
          solution: {
            method: "Evaluate each option against visual text",
            steps: [
              "Option 1: 'Indoor Herb Garden' is one indoor facility; Picnic Area and Fitness Zone are outdoor — NOT all indoors. FALSE.",
              "Option 2: Orchid Garden costs $2 entrance fee. FALSE.",
              "Option 3: The park is open 'daily' and all facilities list their hours — they are available every day. TRUE. ✓",
              "Option 4: Facilities have different hours (Picnic 7am–7pm, Fitness 5am–11pm, etc.) — not all the same as the park hours. FALSE.",
            ],
            tip: "Evaluate ALL options. 'Do not require entrance fees' is false because Orchid Garden costs $2.",
          },
        },
        {
          id: "at_c_q17",
          type: "B",
          topic: "VisualText",
          questionNumber: 17,
          marks: 1,
          stem: "Mrs Tan would like to visit Orchid Garden. She needs to ____________ to buy the tickets.",
          options: [
            { label: "1", text: "visit www.calmpark.sg" },
            { label: "2", text: "make a trip to Calm Park" },
            { label: "3", text: "call Robert Tan at 8539 6210" },
            { label: "4", text: "send an email to roberttan@calmpark.sg" },
          ],
          answer: "1",
          solution: {
            method: "Locate specific information — ticket purchase method",
            steps: [
              "Passage: 'Visit www.calmpark.sg to purchase tickets for Orchid Garden.'",
              "The website is specifically for purchasing tickets.",
              "Option 3 and 4 are contact methods for enquiries, NOT for ticket purchase.",
              "Option 2 is going to the park — not specifically for buying tickets online.",
            ],
            tip: "Distinguish between ticket purchase and enquiry channels. The website is for purchase; phone/email are for enquiries.",
          },
        },
        {
          id: "at_c_q18",
          type: "B",
          topic: "VisualText",
          questionNumber: 18,
          marks: 1,
          stem: "Which statement about Calm Park is NOT true?",
          options: [
            { label: "1", text: "Fitness equipment can be used for different exercise routines." },
            { label: "2", text: "Park visitors can enter the Fitness Zone at any time." },
            { label: "3", text: "Over 100 types of orchids are grown." },
            { label: "4", text: "Food and drinks are allowed." },
          ],
          answer: "2",
          solution: {
            method: "Identify the FALSE statement",
            steps: [
              "Option 1: Fitness Zone — 'Choose from six different types of fitness equipment that suit your exercise routine.' TRUE.",
              "Option 2: Fitness Zone opens at 5 a.m. — visitors CANNOT enter at any time (e.g., before 5 a.m.). NOT TRUE. ✓",
              "Option 3: Orchid Garden — 'over 100 unique species'. TRUE.",
              "Option 4: Picnic Area says 'Enjoy outdoor meals' — food and drinks ARE allowed. TRUE.",
            ],
            tip: "For NOT true questions, the false option usually has a detail that contradicts the poster. Check opening times carefully.",
          },
        },
        {
          id: "at_c_q19",
          type: "B",
          topic: "VisualText",
          questionNumber: 19,
          marks: 1,
          stem: "The main purpose of the poster is to ____________.",
          options: [
            { label: "1", text: "promote the opening of Calm Park" },
            { label: "2", text: "persuade more families to enjoy the outdoors" },
            { label: "3", text: "encourage people to exercise in the Fitness Zone" },
            { label: "4", text: "inform people of the opening hours of the various facilities" },
          ],
          answer: "1",
          solution: {
            method: "Identify the main purpose of the promotional poster",
            steps: [
              "The poster announces: 'A green space in the city is opening on 7 December 2025!'",
              "The primary purpose is to promote the opening of a new park.",
              "Option 4 (inform of opening hours) is a secondary purpose — it provides information within the promotion.",
              "Options 2 and 3 are too narrow — they focus on specific aspects, not the overall purpose.",
            ],
            tip: "The headline/title of a poster reveals its main purpose. 'Opening on 7 December' = promotional poster for a grand opening.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — Grammar Cloze (8 × 1 m = 8 m)
    // Two passages, 4 blanks each
    // ─────────────────────────────────────────────
    {
      id: "secD",
      name: "Section D: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 8,
      passages: [
        {
          id: "secD_passage1",
          passageNumber: 1,
          title: "Anna's Nature Walk",
          text: `Anna loved spending time outdoors with her father. Last Saturday, while she (20) _______ a walk with her father, she noticed that he had chosen a different trail. They strolled through forests and fields of flowers. At the end of the trail, Anna realised it (21) _______ them an hour to complete it. Her father explained that he wanted them to (22) _______ their time to enjoy the beautiful scenery. He added, "Next time, we (23) _______ the trail by the river. There might be more to see." Anna nodded happily.

(Written by: Sharon Biswas)`,
          wordBank: [
            { letter: "A", word: "is taking" },
            { letter: "B", word: "take" },
            { letter: "C", word: "takes" },
            { letter: "D", word: "took" },
            { letter: "E", word: "was taking" },
            { letter: "F", word: "will take" },
          ],
          questions: [
            {
              id: "at_d_q20",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 20,
              marks: 1,
              blankNumber: 20,
              stem: "while she (20) _______ a walk with her father",
              answer: "E",
              answerWord: "was taking",
              solution: {
                method: "Past continuous — ongoing past action",
                steps: [
                  "'While' signals an ongoing background action.",
                  "The main events (Anna noticed, they strolled) are in past simple.",
                  "'While she was taking a walk' = she was in the middle of taking a walk when she noticed.",
                  "'took' (D) is simple past — would suggest the walk was completed, not ongoing.",
                  "'is taking' / 'takes' are present tense — wrong for a past narrative.",
                ],
                tip: "WHILE + past continuous describes an action in progress when something else happened.",
              },
            },
            {
              id: "at_d_q21",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 21,
              marks: 1,
              blankNumber: 21,
              stem: "Anna realised it (21) _______ them an hour to complete it.",
              answer: "D",
              answerWord: "took",
              solution: {
                method: "Simple past — completed action",
                steps: [
                  "The walk has now ended — Anna is realising how long it took.",
                  "The duration 'an hour' is the result of a completed action → simple past: took.",
                  "'It took them an hour' = the walk was completed, and it lasted an hour.",
                  "'will take' (F) is future — wrong for a completed walk.",
                  "'is taking' (A) is present continuous — wrong.",
                ],
                tip: "For measuring completed durations: It TOOK + time. Pattern: It took us three hours to finish.",
              },
            },
            {
              id: "at_d_q22",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 22,
              marks: 1,
              blankNumber: 22,
              stem: "he wanted them to (22) _______ their time to enjoy",
              answer: "B",
              answerWord: "take",
              solution: {
                method: "Infinitive after 'want someone to'",
                steps: [
                  "Structure: want [someone] to [base verb].",
                  "After 'to', always use the bare infinitive.",
                  "'take' is the base form of 'take'. ✓",
                  "'takes' is present tense — cannot follow 'to'.",
                  "'took' is past — cannot follow 'to'.",
                  "Expression: 'take their time' = do something slowly and without rushing.",
                ],
                tip: "want someone TO + base verb. Also: 'take your time' = do it slowly, don't rush.",
              },
            },
            {
              id: "at_d_q23",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 23,
              marks: 1,
              blankNumber: 23,
              stem: '"Next time, we (23) _______ the trail by the river."',
              answer: "F",
              answerWord: "will take",
              solution: {
                method: "Future tense — plan/intention for next time",
                steps: [
                  "'Next time' signals a future plan.",
                  "Future simple = will + base verb: 'will take'.",
                  "The father is suggesting a future walk ('Next time').",
                  "'took' is past — wrong for a future plan.",
                  "'takes' is present — wrong for 'next time' (future).",
                ],
                tip: "'Next time' = future context → use 'will + base verb'. We WILL take the trail next time.",
              },
            },
          ],
        },
        {
          id: "secD_passage2",
          passageNumber: 2,
          title: "Changi Beach Starfish",
          text: `Mary and Danny were exploring Changi Beach with their classmates during low tide. As (24) _______ were walking, Mary spotted a starfish on a rock. At once, (25) _______ called Danny over excitedly. Feeling curious, (26) _______ went over to Mary and knelt down to observe the starfish moving on its tiny tube feet.

"I've never seen a starfish this close before. Its colour is so bright!" Danny exclaimed. "Shall (27) _______ take a picture of it?" Mary asked. Danny smiled and nodded in agreement.

(Written by: Sharon Biswas)`,
          wordBank: [
            { letter: "A", word: "he" },
            { letter: "B", word: "she" },
            { letter: "C", word: "they" },
            { letter: "D", word: "us" },
            { letter: "E", word: "we" },
            { letter: "F", word: "you" },
          ],
          questions: [
            {
              id: "at_d_q24",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 24,
              marks: 1,
              blankNumber: 24,
              stem: "As (24) _______ were walking, Mary spotted a starfish",
              answer: "C",
              answerWord: "they",
              solution: {
                method: "Subject pronoun — third person plural in context",
                steps: [
                  "The sentence refers to Mary and Danny walking together.",
                  "Mary + Danny = two people = third person plural.",
                  "Subject pronoun for third person plural = 'they'.",
                  "'we' (E) would include the narrator — but this is third person narration.",
                  "'you' (F) is second person — not appropriate in a story.",
                ],
                tip: "In third-person narration, when two people are doing something together, use 'they'.",
              },
            },
            {
              id: "at_d_q25",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 25,
              marks: 1,
              blankNumber: 25,
              stem: "At once, (25) _______ called Danny over excitedly.",
              answer: "B",
              answerWord: "she",
              solution: {
                method: "Subject pronoun — Mary (female singular)",
                steps: [
                  "Mary spotted the starfish first.",
                  "Mary called Danny over to show him — so the subject of 'called' is Mary.",
                  "Mary is female and singular → 'she'.",
                  "'he' (A) = Danny — but Danny was called, not calling.",
                  "'they' (C) would mean both called Danny, but Danny is one of them.",
                ],
                tip: "Track WHO is doing the action. Mary spotted it → Mary called Danny → 'she' called him.",
              },
            },
            {
              id: "at_d_q26",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 26,
              marks: 1,
              blankNumber: 26,
              stem: "Feeling curious, (26) _______ went over to Mary and knelt down",
              answer: "A",
              answerWord: "he",
              solution: {
                method: "Subject pronoun — Danny (male singular)",
                steps: [
                  "Mary called Danny over → Danny went over to Mary.",
                  "Danny is male and singular → 'he'.",
                  "'she' would refer to Mary — but Mary is where Danny went TO.",
                  "The dangling modifier 'Feeling curious' refers to Danny (the one being called and feeling curious).",
                ],
                tip: "Identify who 'went over' based on the story: Mary called Danny → Danny (he) went over.",
              },
            },
            {
              id: "at_d_q27",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 27,
              marks: 1,
              blankNumber: 27,
              stem: '"Shall (27) _______ take a picture of it?" Mary asked.',
              answer: "E",
              answerWord: "we",
              solution: {
                method: "Subject pronoun — first person plural for suggestion",
                steps: [
                  "Mary is asking Danny if they should BOTH take a picture.",
                  "'Shall we…?' = a suggestion/invitation to do something together.",
                  "'we' (E) is correct — Mary is proposing they take a picture together.",
                  "'they' (C) would mean she is suggesting two OTHER people take a picture — not herself.",
                  "'I' is not in the word bank; 'we' correctly includes both Mary and Danny.",
                ],
                tip: "'Shall we…?' = suggestion for both speaker and listener to do something together. 'We' includes both people.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — Editing for Spelling (3 × 1 m = 3 m)
    // ─────────────────────────────────────────────
    {
      id: "secE",
      name: "Section E: Editing for Spelling",
      topic: "Editing",
      marks: 3,
      passage: {
        title: "The Butterfly",
        text: `One Sunday morning, Emma was in her garden. She discovered a beautiful (28)[colourful] butterfly fluttering among the flowers. Fasinated (29)[Fascinated] by its colourful wings, Emma tried to catch it. Her little brother wanted to catch it too and this led to an agurement (30)[argument] between them. Their mother repremended (also in text) them for wanting to catch the graceful insect. In the meantime, the butterfly flew away. Both Emma and her brother hoped to see it again someday.

(Written by: Sharon Biswas)`,
      },
      questions: [
        {
          id: "at_e_q28",
          type: "A",
          topic: "Editing",
          questionNumber: 28,
          marks: 1,
          stem: "She discovered a beautiful (28)[bolded word in exam — appears to have a spelling error]",
          errorType: "spelling",
          errorWord: "Fasinated",
          answer: "Fascinated",
          solution: {
            method: "Spelling — 'fascinated'",
            steps: [
              "Common misspelling: 'Fasinated' is missing the 'c' after 'fas'.",
              "Correct spelling: f-a-s-c-i-n-a-t-e-d.",
              "The root word is 'fascinate' — the 'sc' combination is a common spelling challenge.",
            ],
            tip: "fascinate → fascinated. Remember: fas-C-inate. The 'sc' sounds like 's' but is spelled 'sc'.",
          },
        },
        {
          id: "at_e_q29",
          type: "A",
          topic: "Editing",
          questionNumber: 29,
          marks: 1,
          stem: "this led to an (29)[agurement] between them",
          errorType: "spelling",
          errorWord: "agurement",
          answer: "argument",
          solution: {
            method: "Spelling — 'argument'",
            steps: [
              "'agurement' is a misspelling.",
              "Correct: a-r-g-u-m-e-n-t.",
              "Common error: inserting extra letters or mixing up the vowels.",
              "The base word is 'argue' → argument (the 'e' is dropped when adding '-ment').",
            ],
            tip: "argue → argument (drop the 'e'): argue + ment = argument. Not 'arguement' or 'agurement'.",
          },
        },
        {
          id: "at_e_q30",
          type: "A",
          topic: "Editing",
          questionNumber: 30,
          marks: 1,
          stem: "Their mother (30)[repremended] them for wanting to catch the graceful insect.",
          errorType: "spelling",
          errorWord: "repremended",
          answer: "reprimanded",
          solution: {
            method: "Spelling — 'reprimanded'",
            steps: [
              "'reprimanded' = scolded or rebuked formally.",
              "Correct spelling: r-e-p-r-i-m-a-n-d-e-d.",
              "'repremended' confuses the vowels in the middle ('i' not 'e') and the ending.",
              "Breaking it down: re-pri-mand-ed.",
            ],
            tip: "reprimand → reprimanded. Remember: re-PRI-mand (not 're-PRE-mend'). The 'i' comes before 'mand'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — Word Order (2 × 2 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secF",
      name: "Section F: Word Order",
      topic: "SentenceCombining",
      marks: 4,
      questions: [
        {
          id: "at_f_q31",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 31,
          marks: 2,
          stem: "Arrange these words in the correct order to form a sentence:\nwas growling angrily | stood frozen | the big dog | Molly | as",
          answer: "Molly stood frozen as the big dog was growling angrily.",
          solution: {
            method: "Word order — main clause + adverbial clause with 'as'",
            steps: [
              "Identify the main clause subject: 'Molly' (person doing the main action).",
              "Main clause: Molly stood frozen (Molly = subject, stood frozen = verb phrase).",
              "'as' = conjunction introducing the simultaneous background action.",
              "Subordinate clause: the big dog was growling angrily.",
              "Full sentence: Molly stood frozen as the big dog was growling angrily.",
            ],
            tip: "'As' can mean 'while' or 'because'. Here: Molly stood frozen (main) as the dog was growling (what was happening at the same time).",
          },
        },
        {
          id: "at_f_q32",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 32,
          marks: 2,
          stem: "Arrange these words in the correct order to form a sentence:\nwere difficult | Jim | although | the questions | them | could solve",
          answer: "Although the questions were difficult, Jim could solve them.",
          solution: {
            method: "Word order — concession clause with 'although'",
            steps: [
              "'Although' is a conjunction that begins a subordinate clause of contrast.",
              "Subordinate (concession) clause: Although the questions were difficult.",
              "Main clause: Jim could solve them.",
              "Full sentence: Although the questions were difficult, Jim could solve them.",
              "Note: comma after the subordinate clause when it comes first.",
            ],
            tip: "Although [contrast clause], [main clause]. Always use a comma between the two clauses when 'although' is at the start.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — Comprehension 1 (8 m)
    // Passage: Sarah and the Tomatoes
    // ─────────────────────────────────────────────
    {
      id: "secG",
      name: "Section G: Comprehension 1",
      topic: "ComprehensionMCQ",
      marks: 8,
      passage: {
        title: "Sarah and the Tomatoes",
        text: `Sarah loved spending time in her grandmother's garden. One morning, Sarah noticed something strange. The garden's prized tomatoes were not growing well. They had to be ready for the annual neighbourhood food festival in a month's time. The once-thriving plants looked dull and droopy. Her grandmother was anxious. "Our family has been growing these tomatoes for many years. We always share them at the festival. Everyone looks forward to tasting them," Sarah's grandmother explained.

Not wanting her grandmother to be disappointed, Sarah decided to investigate what was wrong with the plants. Armed with her grandfather's magnifying glass, Sarah bent over and inspected the tomato plants carefully. She checked each leaf for insects or signs of disease but found nothing.

Feeling discouraged, Sarah wanted to give up. That was when she realised that the afternoon sun was not reaching the plants anymore. A newly-built fence next door was casting a long shadow over the tomato plants. "That's it!" Sarah exclaimed.

After thinking for a few minutes, Sarah gathered some lamps from around the house. With her grandmother's help, she positioned them around the tomato plants. Every day, the lights shone on the tomato plants. Within days, the plants began to perk up.

By the time the food festival arrived, the tomatoes were perfectly ripe and more delicious than ever. The tomatoes were so popular that a reporter interviewed Sarah's grandmother about her tomatoes. That day, Sarah's grandmother could not stop beaming with pride.

(Written by: Sharon Biswas)`,
      },
      questions: [
        {
          id: "at_g_q33",
          type: "B",
          topic: "ComprehensionMCQ",
          questionNumber: 33,
          marks: 1,
          stem: "Which word has the same meaning as 'wilted'? Circle either (A) or (B).",
          subtext: "The once-thriving plants looked (A) dull and (B) droopy.",
          options: [
            { label: "A", text: "dull" },
            { label: "B", text: "droopy" },
          ],
          answer: "B",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "'Wilted' = drooped and lost vitality (said of plants when they need water or lack light).",
              "'Droopy' = hanging down limply. This closely matches 'wilted'.",
              "'Dull' = lacking brightness or colour — related but refers to appearance, not physical drooping.",
              "A wilted plant is specifically one that has drooped/wilted — 'droopy' is the better synonym.",
            ],
            tip: "'Wilted' and 'droopy' both describe plants that hang down limply. 'Dull' refers to colour/shine, not posture.",
          },
        },
        {
          id: "at_g_q34",
          type: "B",
          topic: "ComprehensionMCQ",
          questionNumber: 34,
          marks: 1,
          stem: "Sarah examined the plants closely because she wanted to ____________.",
          options: [
            { label: "1", text: "collect tiny insects" },
            { label: "2", text: "check for ripe tomatoes" },
            { label: "3", text: "see how sunlight helps plants grow" },
            { label: "4", text: "find out why the plants were not growing well" },
          ],
          answer: "4",
          solution: {
            method: "Locate purpose from passage",
            steps: [
              "Passage: 'Sarah decided to investigate what was wrong with the plants.'",
              "She used a magnifying glass and checked each leaf for insects or signs of disease.",
              "Purpose: to find out why the plants were not growing well.",
              "Option 1: She checked FOR insects, not TO collect them.",
              "Option 3: She discovered the sunlight issue, but this was the FINDING, not the original purpose.",
            ],
            tip: "The purpose of an action is usually stated BEFORE the action is described: 'decided to investigate what was wrong'.",
          },
        },
        {
          id: "at_g_q35",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 35,
          marks: 1,
          stem: "What does 'them' in line 15 refer to?",
          answer: "'Them' refers to the lamps/lights that Sarah gathered from around the house.",
          solution: {
            method: "Pronoun reference",
            steps: [
              "Line 15 context: 'With her grandmother's help, she positioned them around the tomato plants.'",
              "What did Sarah position around the plants? → the lamps she gathered.",
              "'Them' = the lamps/lights.",
            ],
            tip: "For pronoun reference, look at the sentence BEFORE for the noun the pronoun replaces.",
          },
        },
        {
          id: "at_g_q36",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 36,
          marks: 1,
          stem: "Which two-word phrase from lines 14–17 shows that the tomato plants looked healthier?",
          answer: "perk up",
          solution: {
            method: "Vocabulary in context — two-word phrase",
            steps: [
              "Lines 14–17: 'Within days, the plants began to perk up.'",
              "'Perk up' = to become more lively, healthy, and cheerful.",
              "This two-word phrase (phrasal verb) shows the plants improved and looked healthier.",
            ],
            tip: "'Perk up' = become livelier/healthier. It is a phrasal verb. 'Plants beginning to perk up' = plants becoming healthier.",
          },
        },
        {
          id: "at_g_q37",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 37,
          marks: 1,
          stem: "Write 1, 2 and 3 in the blanks below to indicate the order of events that occurred in the passage.",
          subEvents: [
            "Sarah borrowed her grandfather's magnifying glass.",
            "Sarah's grandmother was interviewed by a reporter.",
            "Sarah and her grandmother worked on the solution together.",
          ],
          answer: {
            "Sarah borrowed her grandfather's magnifying glass.": "1",
            "Sarah's grandmother was interviewed by a reporter.": "3",
            "Sarah and her grandmother worked on the solution together.": "2",
          },
          solution: {
            method: "Sequence of events",
            steps: [
              "1: Sarah inspected the plants with the magnifying glass (paragraph 2).",
              "2: Sarah and grandmother positioned lamps around the plants (paragraph 4).",
              "3: The reporter interviewed the grandmother at the food festival (paragraph 5).",
            ],
            tip: "For sequence questions, locate each event in the passage and note which paragraph it appears in.",
          },
        },
        {
          id: "at_g_q38",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 38,
          marks: 1,
          stem: "The food festival took place every year. TRUE or FALSE?",
          answer: "TRUE",
          solution: {
            method: "True/False — locate text evidence",
            steps: [
              "Passage: 'They had to be ready for the annual neighbourhood food festival.'",
              "'Annual' = happening every year.",
              "Therefore the statement is TRUE.",
            ],
            tip: "'Annual' = once a year / every year. The key word 'annual' confirms this is true.",
          },
        },
        {
          id: "at_g_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 1,
          stem: "Sarah's grandmother asked Sarah for help. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — identify who initiated help",
            steps: [
              "It was SARAH who decided to investigate and find a solution.",
              "Passage: 'Not wanting her grandmother to be disappointed, Sarah decided to investigate…'",
              "The grandmother did not ask for help — Sarah offered it on her own initiative.",
              "In fact, it was Sarah who asked the grandmother to help position the lamps.",
            ],
            tip: "Read carefully for WHO initiated the action. Sarah volunteered to help — grandmother did NOT ask.",
          },
        },
        {
          id: "at_g_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 1,
          stem: "The neighbour's new fence blocked the sunlight from reaching the plants. TRUE or FALSE?",
          answer: "TRUE",
          solution: {
            method: "True/False — locate text evidence",
            steps: [
              "Passage: 'A newly-built fence next door was casting a long shadow over the tomato plants.'",
              "A fence casting a shadow blocks sunlight from reaching the plants.",
              "The statement is TRUE. ✓",
            ],
            tip: "'Casting a shadow' = blocking sunlight. The fence from 'next door' = neighbour's fence. TRUE.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — Comprehension 2 (8 m)
    // Passage: The Blackout
    // ─────────────────────────────────────────────
    {
      id: "secH",
      name: "Section H: Comprehension 2",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "The Blackout",
        text: `One evening at Grandpa's house, Ryan sat in front of the television, waiting for his favourite cartoon to start. Jenny lay on the sofa, watching videos on her phone. As usual, Grandpa was dozing in his rocking chair. Suddenly, there was a loud click. All at once, the television went dark and the lights blinked out. It took a while before Ryan realised that it was a blackout.

Ryan stared at the lifeless television. "My show!" he wailed in frustration. Jenny sat up, the light from her phone dimly brightening the living room. Feeling uncomfortable, she hoped that the blackout would end soon.

Awakened by Ryan's wails, Grandpa sat up to a room enveloped in darkness. He recalled that his parents would play shadow puppets with him long ago and they would have such fun. Grandpa's eyes lit up at the idea that would cheer everybody up.

With the light from Jenny's handphone, Grandpa formed a rabbit shadow on the wall. That caught Jenny's attention. Her frown turned into a smile and she added a fluttering butterfly beside it. Not wanting to miss out on the fun, Ryan created a snake that slithered towards the rabbit and butterfly. Giggles filled the room as the three shadows met and played together.

When the lights finally flickered back on, Ryan hesitated before switching on the television. After having so much fun with the shadow puppets, he almost wished the blackout had been longer. "I'll remember to stay positive the next time I face another unexpected situation!" he thought to himself.

(Written by: Sharon Biswas)`,
      },
      questions: [
        {
          id: "at_h_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 1,
          stem: "What caused the loud 'click' (line 3) that evening at Grandpa's house?",
          answer: "The loud 'click' was caused by a blackout / a sudden loss of electricity.",
          solution: {
            method: "Cause-effect — locate information",
            steps: [
              "Passage: 'Suddenly, there was a loud click. All at once, the television went dark and the lights blinked out.'",
              "The click happened just before everything went dark.",
              "This was the sound of the electricity cutting out — a blackout.",
              "The click was caused by the power going out / the electricity tripping.",
            ],
            tip: "The sequence 'click → everything went dark' shows the click was the sound of the power cutting out.",
          },
        },
        {
          id: "at_h_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 2,
          stem: "How did Ryan feel when the television went dark? Why did he feel this way?",
          answer: "Ryan felt frustrated/upset because his favourite cartoon had not started yet and the blackout prevented him from watching it.",
          solution: {
            method: "Character emotion + reason",
            steps: [
              "How: Passage: '\"My show!\" he wailed in frustration.'",
              "'Wailed in frustration' = Ryan was frustrated/upset.",
              "Why: He was waiting for his favourite cartoon to start when the blackout occurred.",
              "He could not watch his show because of the power outage.",
            ],
            tip: "Emotion questions require TWO parts: the emotion + the reason. Always explain WHY using evidence from the text.",
          },
        },
        {
          id: "at_h_q43",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 43,
          marks: 1,
          stem: "What does 'they' in line 10 refer to?",
          answer: "'They' refers to Grandpa and his parents (his parents who played shadow puppets with him long ago).",
          solution: {
            method: "Pronoun reference",
            steps: [
              "Line 10: 'He recalled that his parents would play shadow puppets with him long ago and they would have such fun.'",
              "Who had fun? = Grandpa AND his parents (the people playing shadow puppets).",
              "'they' = Grandpa and his parents.",
            ],
            tip: "Identify ALL people mentioned before the pronoun and determine which group 'they' refers to. Here = Grandpa + his parents.",
          },
        },
        {
          id: "at_h_q44a",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: "44a",
          marks: 1,
          stem: "(a) What did Grandpa do to help Ryan and Jenny feel better during the blackout?",
          answer: "Grandpa formed a rabbit shadow on the wall using the light from Jenny's handphone to cheer them up.",
          solution: {
            method: "Locate specific action",
            steps: [
              "Passage: 'With the light from Jenny's handphone, Grandpa formed a rabbit shadow on the wall.'",
              "This was Grandpa's action to cheer everyone up.",
              "The idea came from his memory of playing shadow puppets as a child.",
            ],
            tip: "Answer with the SPECIFIC action: formed a rabbit shadow on the wall (not just 'played shadow puppets').",
          },
        },
        {
          id: "at_h_q44b",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: "44b",
          marks: 1,
          stem: "(b) Pick out a four-word phrase from lines 13–17 that shows that everyone enjoyed themselves in the dark.",
          answer: "Giggles filled the room",
          solution: {
            method: "Locate phrase showing enjoyment",
            steps: [
              "Lines 13–17 include: 'Giggles filled the room as the three shadows met and played together.'",
              "'Giggles filled the room' = a four-word phrase showing laughter and enjoyment.",
              "Giggles = the sound of laughing happily = everyone enjoying themselves.",
            ],
            tip: "Count the words: Giggles(1) filled(2) the(3) room(4) — exactly four words. This shows enjoyment through laughter.",
          },
        },
        {
          id: "at_h_q45a",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: "45a",
          marks: 1,
          stem: "(a) Why did Ryan wish 'the blackout had been longer'? (line 20)",
          answer: "Ryan wished the blackout had been longer because he had so much fun playing shadow puppets with Jenny and Grandpa and did not want the fun to end.",
          solution: {
            method: "Inference — reason for changed attitude",
            steps: [
              "At first Ryan was frustrated about missing his cartoon.",
              "During the blackout, they played shadow puppets and had great fun.",
              "Passage: 'After having so much fun with the shadow puppets, he almost wished the blackout had been longer.'",
              "He now enjoyed the blackout because of the fun — he wanted more time with the shadow puppets.",
            ],
            tip: "This is an inference about a change of attitude. Ryan's feeling CHANGED from frustration to enjoyment during the blackout.",
          },
        },
        {
          id: "at_h_q45b",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: "45b",
          marks: 1,
          stem: "(b) What lesson did Ryan learn from this situation?",
          answer: "Ryan learnt that he should stay positive when facing unexpected situations.",
          solution: {
            method: "Locate lesson/moral from passage",
            steps: [
              "Passage: '\"I'll remember to stay positive the next time I face another unexpected situation!\" he thought to himself.'",
              "The lesson: stay positive in unexpected/difficult situations.",
              "This is directly stated in the passage — quote or paraphrase it.",
            ],
            tip: "Lessons/morals are usually stated at the END of a passage. Copy or closely paraphrase what the character learns.",
          },
        },
      ],
    },
  ],
};

export default paper;
