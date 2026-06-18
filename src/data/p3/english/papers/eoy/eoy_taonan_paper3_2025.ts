// src/data/p3/english/papers/eoy_taonan_paper3_2025.ts
// Tao Nan School — Primary 3 English Language Practice Paper 3 (2023)
// Sections: Grammar MCQ (A·9q), Vocabulary MCQ (B·6q), Visual Text (C·5q),
//           Grammar Cloze (D·4q), Comprehension Cloze (E·4q),
//           Synthesis & Transformation (F·4q), Editing (G·6q),
//           Comprehension Open-Ended (H·8m)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_taonan_paper3_2025",
  school: "Tao Nan School",
  level: "P3",
  subject: "English",
  paperType: "Practice Paper 3",
  year: 2025,
  totalMarks: 50,
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — Grammar MCQ (9 × 1 m = 9 m)
    // ─────────────────────────────────────────────
    {
      id: "secA",
      name: "Section A: Grammar MCQ",
      topic: "GrammarMCQ",
      marks: 9,
      questions: [
        {
          id: "tn3_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: "Mrs Chan ____________ me English last year.",
          options: [
            { label: "1", text: "teach" },
            { label: "2", text: "taught" },
            { label: "3", text: "teaches" },
            { label: "4", text: "teaching" },
          ],
          answer: "2",
          solution: {
            method: "Past tense — time marker 'last year'",
            steps: [
              "'Last year' signals the past tense.",
              "Simple past of 'teach' = 'taught' (irregular verb).",
              "'teaches' is present tense — wrong for 'last year'.",
              "'teach' (base form) needs an auxiliary in past questions but not in statements — but here it's the main verb.",
              "'teaching' is present participle — needs auxiliary 'is/was'.",
            ],
            tip: "Irregular: teach → taught. 'Last year' always triggers simple past tense.",
          },
        },
        {
          id: "tn3_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "Sumei stood nervously on stage. She tried to speak but ____________ words came out of her mouth.",
          options: [
            { label: "1", text: "no" },
            { label: "2", text: "all" },
            { label: "3", text: "any" },
            { label: "4", text: "some" },
          ],
          answer: "1",
          solution: {
            method: "Negative quantifier with affirmative verb",
            steps: [
              "Sumei was nervous and tried to speak but failed — no words came out.",
              "'no words came out' = not a single word was spoken.",
              "'No' + affirmative verb = zero amount (more emphatic than 'not any').",
              "'any' requires a negative auxiliary: 'no any words' is wrong; 'any words did not come out' is awkward.",
              "'some/all' imply words DID come out — contradicts the context.",
            ],
            tip: "'No words came out' = zero words spoken. 'No' + positive verb = 'not any' in meaning.",
          },
        },
        {
          id: "tn3_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: "Your sister is going to the library later, ____________?",
          options: [
            { label: "1", text: "is she" },
            { label: "2", text: "isn't she" },
            { label: "3", text: "does she" },
            { label: "4", text: "doesn't she" },
          ],
          answer: "2",
          solution: {
            method: "Question tags — positive statement → negative tag",
            steps: [
              "Main clause: 'Your sister IS going' — positive, uses auxiliary 'is'.",
              "Positive statement → negative question tag.",
              "Use same auxiliary as main clause: 'is' → 'isn't'.",
              "Subject: 'your sister' → 'she'.",
              "Tag: 'isn't she?' ✓",
              "'is she?' would be a negative tag — used for negative statements.",
              "'does/doesn't she?' — wrong auxiliary; main verb uses 'is going', not 'does'.",
            ],
            tip: "Question tag: Positive statement → negative tag using the SAME auxiliary. 'is going' → 'isn't she?'",
          },
        },
        {
          id: "tn3_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: '"The mail in the drawers ____________ mine but Dad\'s," I told my mother.',
          options: [
            { label: "1", text: "isn't" },
            { label: "2", text: "aren't" },
            { label: "3", text: "wasn't" },
            { label: "4", text: "weren't" },
          ],
          answer: "1",
          solution: {
            method: "Subject-verb agreement — present tense negative",
            steps: [
              "Subject: 'The mail' — singular (mail is uncountable/singular).",
              "The sentence is speech reported in present context ('I told' = past, but the speech itself describes current state).",
              "Present tense + singular = 'isn't' (is not).",
              "'aren't' is plural present — wrong for singular 'mail'.",
              "'wasn't/weren't' are past tense — the speech describes something that appears to be currently true.",
            ],
            tip: "Mail = singular uncountable noun → isn't (not aren't). Match the auxiliary to the subject number.",
          },
        },
        {
          id: "tn3_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: "My uncle met the President ____________ at the Istana and even shook her hand.",
          options: [
            { label: "1", text: "herself" },
            { label: "2", text: "himself" },
            { label: "3", text: "myself" },
            { label: "4", text: "ourselves" },
          ],
          answer: "1",
          solution: {
            method: "Reflexive/emphatic pronoun — referring back to the President",
            steps: [
              "The emphasis is on 'the President herself' — meaning in person, no intermediary.",
              "The President is referred to as 'her' (feminine), so the emphatic pronoun is 'herself'.",
              "'himself' = for a male — but 'her hand' indicates the President is female.",
              "'myself' = for the speaker (I).",
              "'ourselves' = for the speaker + others (we).",
            ],
            tip: "Emphatic pronouns intensify the noun: 'the President herself' = the President in person. Match gender: 'her hand' → 'herself'.",
          },
        },
        {
          id: "tn3_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: "Camouflage helps some prey blend into their habitats. ____________ makes them difficult for predators to find.",
          options: [
            { label: "1", text: "This" },
            { label: "2", text: "That" },
            { label: "3", text: "These" },
            { label: "4", text: "Those" },
          ],
          answer: "1",
          solution: {
            method: "Demonstrative pronoun — referring to the previous statement",
            steps: [
              "The second sentence refers back to the idea in the first sentence (camouflage helping prey blend in).",
              "When referring back to an idea/statement just mentioned, 'This' is used.",
              "'This makes them difficult' = this ability/this fact makes them difficult to find.",
              "'That' refers to something far or a previously mentioned thing — less natural for immediate back-reference in text.",
              "'These/Those' are plural — 'the idea' of camouflage is singular.",
            ],
            tip: "'This' refers back to the idea just stated in the previous sentence. Use 'This' for immediate back-reference.",
          },
        },
        {
          id: "tn3_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: "Ramu ____________ in the basketball tournament next week.",
          options: [
            { label: "1", text: "play" },
            { label: "2", text: "plays" },
            { label: "3", text: "has played" },
            { label: "4", text: "will be playing" },
          ],
          answer: "4",
          solution: {
            method: "Future continuous — planned action in the future",
            steps: [
              "'Next week' signals a future event.",
              "'Will be playing' = future continuous, for a planned/scheduled activity in the future.",
              "Playing in a tournament is a specific scheduled event — future continuous is natural.",
              "'play/plays' are present tense — wrong for 'next week'.",
              "'has played' = present perfect — describes past experience, not a future event.",
            ],
            tip: "'Next week' + sports tournament = future continuous: will be playing. Also accept 'will play'.",
          },
        },
        {
          id: "tn3_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "Chek Jawa has a rich collection of plants, birds and animals. There, we can learn about and ____________ nature.",
          options: [
            { label: "1", text: "enjoy" },
            { label: "2", text: "enjoys" },
            { label: "3", text: "enjoyed" },
            { label: "4", text: "can enjoy" },
          ],
          answer: "1",
          solution: {
            method: "Parallel structure — 'learn about and ___'",
            steps: [
              "The structure is: 'we can learn about AND ___ nature'.",
              "The verb must be parallel to 'learn' — both joined by 'and' under the same auxiliary 'can'.",
              "'can learn about AND enjoy' — 'enjoy' is the base form parallel to 'learn'.",
              "'can enjoy' (4) would duplicate the auxiliary 'can' — grammatically wrong in this parallel structure.",
              "'enjoys' (present 3rd person singular) and 'enjoyed' (past) don't fit after 'and' in this structure.",
            ],
            tip: "Parallel structure: 'can [verb1] and [verb2]'. Both verbs must be in the same base form under one auxiliary.",
          },
        },
        {
          id: "tn3_a_q9",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "Father cannot go to work today as he is down ____________ a bad cold.",
          options: [
            { label: "1", text: "on" },
            { label: "2", text: "by" },
            { label: "3", text: "from" },
            { label: "4", text: "with" },
          ],
          answer: "4",
          solution: {
            method: "Fixed expression — 'down with'",
            steps: [
              "'Be down with something' = be suffering from an illness.",
              "'Down with a bad cold' = suffering from a cold.",
              "This is a fixed idiomatic expression in English.",
              "'down on' = critical of someone.",
              "'down by/from' — not used with illness in this context.",
            ],
            tip: "Fixed phrase: 'be down WITH an illness'. He is down with the flu/a cold/a fever.",
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
          id: "tn3_b_q10",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 10,
          marks: 1,
          stem: "To find her missing cat, Lucy put up several ____________ of her pet all around her neighbourhood.",
          options: [
            { label: "1", text: "posters" },
            { label: "2", text: "banners" },
            { label: "3", text: "brochures" },
            { label: "4", text: "advertisements" },
          ],
          answer: "1",
          solution: {
            method: "Vocabulary — missing pet notices",
            steps: [
              "When a pet goes missing, people typically put up 'posters' with the pet's photo and contact information.",
              "'Posters' = notices displayed in public places.",
              "'Banners' = large fabric/plastic signs, usually for events — too large for a missing pet notice.",
              "'Brochures' = folded paper booklets for products/services.",
              "'Advertisements' = commercial promotions, usually paid-for — not what individuals put up for missing pets.",
            ],
            tip: "'Put up posters' is the standard phrase for displaying notices about missing pets. 'Lost cat poster' is a common expression.",
          },
        },
        {
          id: "tn3_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "My father bought the ____________ computer model as his current one does not have the newest features.",
          options: [
            { label: "1", text: "latest" },
            { label: "2", text: "purest" },
            { label: "3", text: "largest" },
            { label: "4", text: "strongest" },
          ],
          answer: "1",
          solution: {
            method: "Vocabulary — buying the most up-to-date version",
            steps: [
              "The reason for buying = current one lacks 'newest features'.",
              "'Latest' = most recent/newest version.",
              "'Latest computer model' = the newest version of the computer.",
              "'Purest' = cleanest/most refined (not used for computer models).",
              "'Largest/strongest' = size/power — not related to 'newest features'.",
            ],
            tip: "'Latest model' = the newest, most recent version. Used for technology: latest iPhone, latest laptop model.",
          },
        },
        {
          id: "tn3_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "The icy mountain was so slippery that we ____________ down the track instead of walking on it.",
          options: [
            { label: "1", text: "strode" },
            { label: "2", text: "strolled" },
            { label: "3", text: "scuttled" },
            { label: "4", text: "slithered" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — movement on ice/slippery surface",
            steps: [
              "The track is ICY and SLIPPERY — movement would be uncontrolled and sliding.",
              "'Slithered' = moved smoothly and sliding, like a snake on ice.",
              "'Strode' = walked with long, confident steps — inappropriate for icy/slippery surface.",
              "'Strolled' = walked leisurely — inappropriate for dangerous icy conditions.",
              "'Scuttled' = moved quickly with short steps (like a crab/insect).",
            ],
            tip: "'Slithered' = slid in a smooth, snake-like way. Perfect for icy/slippery surfaces.",
          },
        },
        {
          id: "tn3_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "Aminah's house was burgled last week. The police are ____________ the case.",
          options: [
            { label: "1", text: "looking up" },
            { label: "2", text: "looking by" },
            { label: "3", text: "looking for" },
            { label: "4", text: "looking into" },
          ],
          answer: "4",
          solution: {
            method: "Phrasal verbs with 'look'",
            steps: [
              "'Looking into something' = investigating a matter.",
              "Police investigating a burglary case = 'looking into the case'.",
              "'Looking up' = searching in a reference / improving.",
              "'Looking for' = searching for a missing person/thing.",
              "'Looking by' — not a standard phrasal verb.",
            ],
            tip: "look into = investigate. 'The police are looking into the matter' = the police are investigating it.",
          },
        },
        {
          id: "tn3_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: "Melody waited ____________ for her father to return home with her favourite fruit — durians.",
          options: [
            { label: "1", text: "keenly" },
            { label: "2", text: "eagerly" },
            { label: "3", text: "determinedly" },
            { label: "4", text: "wholeheartedly" },
          ],
          answer: "2",
          solution: {
            method: "Adverbs of manner — waiting with excitement",
            steps: [
              "Melody is waiting for her FAVOURITE fruit — this implies excitement and anticipation.",
              "'Eagerly' = with keen interest and enthusiasm; excited while waiting.",
              "'Keenly' = with interest/enthusiasm but slightly more formal — less natural for a child waiting for fruit.",
              "'Determinedly' = with strong determination (more for overcoming obstacles).",
              "'Wholeheartedly' = with complete commitment — usually for supporting/believing in something.",
            ],
            tip: "'Waited eagerly' = waited with excitement and anticipation. Very natural for someone awaiting something they love.",
          },
        },
        {
          id: "tn3_b_q15",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 15,
          marks: 1,
          stem: "Weiming's face turned red with ____________ when he realised that he had worn his pyjama bottoms to school.",
          options: [
            { label: "1", text: "fear" },
            { label: "2", text: "disbelief" },
            { label: "3", text: "hesitation" },
            { label: "4", text: "embarrassment" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — emotional reaction to embarrassing situation",
            steps: [
              "Wearing pyjama bottoms to school accidentally = a very embarrassing situation.",
              "'Turned red with embarrassment' = the classic physical reaction to embarrassment (blushing).",
              "'Face turned red' is specifically associated with embarrassment/shame.",
              "'fear' = being afraid; 'disbelief' = cannot believe something; 'hesitation' = uncertainty — none cause blushing.",
            ],
            tip: "'Face turned red with embarrassment' is a fixed phrase for blushing due to shame/embarrassment.",
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
        title: "2 Days 1 Night Stargazing Camp Advertisement",
        text: `2 DAYS 1 NIGHT STARGAZING CAMP
Organised by Channing Space Club

Venue: Seablue Campsite
This campsite is an hour's drive away from Channing Space Club. The dark skies of this campsite make it an ideal and popular spot for stargazers. Telescopes will not be provided.

Participants: Children of ages 9 and 10

Cost of Camp: $100 per participant
Includes:
• 3 meals for 2 days
• transport to the campsite
• Singapore Space Observatory entry tickets
[Free T-shirt!]

ACTIVITIES:

Day 1 – Seablue Campsite
• Learn how to identify the stars and planets without using a telescope
• Make your own telescope and learn how to use it (no experience needed)
  - Use recyclable materials to make your very own telescope
  - Materials will be provided
• Camping under the stars
  - Bring your own sleeping bags
  - Tents will be provided

Day 2 – Visit to the Singapore Space Observatory
• 45-minute drive from the campsite
• Learn more about the skies from our experienced trainers

Registration closes on 11 November 2022

Early bird offer: $20 off if you register before 31 October 2022

Download the application form at www.channingspaceclub.com and email it to channingspaceclub@gmail.com

For enquiries, call Mr Joseph Lim at 6443 2154`,
      },
      questions: [
        {
          id: "tn3_c_q16",
          type: "B",
          topic: "VisualText",
          questionNumber: 16,
          marks: 1,
          stem: "The main aim of the camp is to ____________.",
          options: [
            { label: "1", text: "introduce children to stargazing" },
            { label: "2", text: "visit the Singapore Space Observatory" },
            { label: "3", text: "teach children how to make a telescope" },
            { label: "4", text: "recruit new members to join Channing Space Club" },
          ],
          answer: "1",
          solution: {
            method: "Infer main purpose from title and activities",
            steps: [
              "The camp is called a 'Stargazing Camp' — the main aim is stargazing.",
              "All activities relate to stars: identifying stars, making telescopes for stargazing, visiting the Space Observatory.",
              "Option 2: visiting the Observatory is one DAY's activity — not the main aim.",
              "Option 3: making telescopes is one activity within the camp — not the main aim.",
              "Option 4: no mention of recruiting members.",
            ],
            tip: "The title 'Stargazing Camp' reveals the main aim. All activities support stargazing as the overall purpose.",
          },
        },
        {
          id: "tn3_c_q17",
          type: "B",
          topic: "VisualText",
          questionNumber: 17,
          marks: 1,
          stem: "The camp is organised by ____________.",
          options: [
            { label: "1", text: "Mr Joseph Lim" },
            { label: "2", text: "Seablue Campsite" },
            { label: "3", text: "Channing Space Club" },
            { label: "4", text: "Singapore Space Observatory" },
          ],
          answer: "3",
          solution: {
            method: "Locate organiser from visual text",
            steps: [
              "Advertisement states: 'Organised by Channing Space Club'.",
              "Directly stated at the top of the poster.",
              "Mr Joseph Lim = for enquiries only.",
              "Seablue Campsite = venue.",
              "Singapore Space Observatory = Day 2 destination.",
            ],
            tip: "Look for 'Organised by' in the advertisement — directly states Channing Space Club.",
          },
        },
        {
          id: "tn3_c_q18",
          type: "B",
          topic: "VisualText",
          questionNumber: 18,
          marks: 1,
          stem: "Seablue Campsite is a suitable location for stargazing because it is ____________.",
          options: [
            { label: "1", text: "dimly lit" },
            { label: "2", text: "a popular spot" },
            { label: "3", text: "equipped with telescopes" },
            { label: "4", text: "located very near Channing Space Club" },
          ],
          answer: "1",
          solution: {
            method: "Locate reason for suitability",
            steps: [
              "Advertisement: 'The dark skies of this campsite make it an ideal and popular spot for stargazers.'",
              "'Dark skies' = dimly lit / low light pollution.",
              "Darkness is essential for stargazing — this is why it's suitable.",
              "Option 3: 'Telescopes will NOT be provided' — opposite of equipped with telescopes.",
              "Option 4: 'an hour's drive AWAY' — it is far from Channing Space Club, not near.",
            ],
            tip: "'Dark skies' = dimly lit (low light pollution). Essential for seeing stars clearly.",
          },
        },
        {
          id: "tn3_c_q19",
          type: "B",
          topic: "VisualText",
          questionNumber: 19,
          marks: 1,
          stem: "The participants of the camp must ____________.",
          options: [
            { label: "1", text: "pay an additional $100 for meals" },
            { label: "2", text: "come prepared with sleeping bags" },
            { label: "3", text: "go to Seablue Campsite on their own" },
            { label: "4", text: "buy the T-shirt from Channing Space Club" },
          ],
          answer: "2",
          solution: {
            method: "Cross-reference what participants must bring/do",
            steps: [
              "Option 2: 'Bring your own sleeping bags' — participants MUST bring sleeping bags. ✓",
              "Option 1: Meals are included in the $100 fee — no additional cost for meals.",
              "Option 3: Transport to campsite is INCLUDED in the fee — they don't go on their own.",
              "Option 4: A FREE T-shirt is provided — they don't buy it.",
            ],
            tip: "Participants must BRING sleeping bags (tents provided). Check what is included vs what participants must provide.",
          },
        },
        {
          id: "tn3_c_q20",
          type: "B",
          topic: "VisualText",
          questionNumber: 20,
          marks: 1,
          stem: "Which one of the following statements is true?",
          options: [
            { label: "1", text: "Participants have to bring their own tents." },
            { label: "2", text: "Participants must email their interest to Mr Joseph Lim." },
            { label: "3", text: "Participants will need to know how to use a telescope." },
            { label: "4", text: "Participants pay less if they register before 31 October 2022." },
          ],
          answer: "4",
          solution: {
            method: "Evaluate each statement against the visual text",
            steps: [
              "Option 1: 'Tents will be provided' — participants do NOT need to bring tents. FALSE.",
              "Option 2: Email the APPLICATION FORM to channingspaceclub@gmail.com, not to Mr Joseph Lim. Mr Lim is for enquiries only. FALSE.",
              "Option 3: 'Learn how to make and USE a telescope' — no prior knowledge needed ('no experience needed'). FALSE.",
              "Option 4: 'Early bird offer: $20 off if you register before 31 October 2022' — they pay less = $80. TRUE. ✓",
            ],
            tip: "Early bird = register by deadline → pay less. $100 - $20 early bird = $80. Option 4 is TRUE.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — Grammar Cloze (4 × 1 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secD",
      name: "Section D: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 4,
      passage: {
        title: "The Snake in the River",
        text: `I was fishing at a river one afternoon. All of a sudden, I felt something tickling my foot. I looked (21) _______ and realised that it was a long, black snake! It appeared to be asleep (22) _______ the ankle-deep water. I stood frozen (23) _______ the ground as the water shifted a part of (24) _______ body onto my leg. Within a split second, I leapt out of the water. Filled with fear, I reminded myself never to fish in that area again.

(Adapted from http://readworks.org)`,
        wordBank: [
          { letter: "A", word: "at" },
          { letter: "B", word: "down" },
          { letter: "C", word: "in" },
          { letter: "D", word: "into" },
          { letter: "E", word: "its" },
          { letter: "F", word: "it's" },
          { letter: "G", word: "to" },
          { letter: "H", word: "up" },
        ],
      },
      questions: [
        {
          id: "tn3_d_q21",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 21,
          marks: 1,
          blankNumber: 21,
          stem: "I looked (21) _______ and realised that it was a long, black snake!",
          answer: "B",
          answerWord: "down",
          solution: {
            method: "Phrasal verb — 'look down'",
            steps: [
              "The narrator felt something tickling his FOOT — he would naturally look DOWN to see what it was.",
              "'Looked down' = directed gaze downward (toward feet).",
              "'Looked up' = looked upward — wrong direction.",
              "'Looked at' needs a specific object after it: 'looked at the snake' — but before realising what it was.",
            ],
            tip: "Look down = look toward the floor/feet. He felt something at his foot → looked DOWN to see it.",
          },
        },
        {
          id: "tn3_d_q22",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 22,
          marks: 1,
          blankNumber: 22,
          stem: "It appeared to be asleep (22) _______ the ankle-deep water.",
          answer: "C",
          answerWord: "in",
          solution: {
            method: "Preposition of location — inside water",
            steps: [
              "The snake is within the water — submerged in it.",
              "'In the water' = inside/within the water.",
              "'At the water' = near the water's edge — not submerged.",
              "'Into the water' = movement direction (not static location).",
              "'Down the water' — not standard English.",
            ],
            tip: "Location INSIDE water = 'in the water'. 'Into' = movement toward. 'In' = static location inside.",
          },
        },
        {
          id: "tn3_d_q23",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "I stood frozen (23) _______ the ground",
          answer: "A",
          answerWord: "at",
          solution: {
            method: "Preposition — 'at a spot/location'",
            steps: [
              "'Stood frozen at the ground' — wait: this seems odd. Let me re-examine.",
              "Actually: 'stood frozen' in a position — 'at' indicating a specific spot.",
              "However, the official answer from the key is G (to): 'stood frozen to the ground'.",
              "'Frozen to the ground' = fixed/unable to move as if stuck to the ground.",
              "This is an idiomatic expression: 'rooted/frozen to the spot/ground'.",
            ],
            tip: "'Frozen to the ground/spot' = unable to move, like being glued there with fear. Idiomatic expression.",
          },
          answer: "G",
          answerWord: "to",
        },
        {
          id: "tn3_d_q24",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "the water shifted a part of (24) _______ body onto my leg.",
          answer: "E",
          answerWord: "its",
          solution: {
            method: "Possessive pronoun — referring to the snake",
            steps: [
              "The snake's body moved onto the narrator's leg.",
              "'its' = possessive pronoun for things/animals (third person singular, neuter).",
              "'it's' (F) = 'it is' — a contraction, NOT a possessive. Wrong.",
              "The body belongs to the snake (it) → 'its body'.",
            ],
            tip: "'Its' (no apostrophe) = possessive of it. 'It's' (with apostrophe) = it is. Never confuse these!",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — Comprehension Cloze (4 × 1 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secE",
      name: "Section E: Comprehension Cloze",
      topic: "VocabCloze",
      marks: 4,
      passage: {
        title: "Dogs — Man's Best Friend",
        text: `Dogs are Man's best friends. They are not only loyal, but also make great pets. Dogs can also be trained for specific (25) _______ such as retrieving shoes and opening doors. For at least 2000 years, these creatures have been (26) _______ the blind. Today, we also have 'hearing ear' dogs for the (27) _______. These canines are trained to (28) _______ their owners to warning sounds, such as a fire alarm. Thus, saving their owners from any mishaps.

(Adapted from https://www.ideapod.com)`,
        wordBank: [
          { letter: "A", word: "alert" },
          { letter: "B", word: "blind" },
          { letter: "C", word: "chores" },
          { letter: "D", word: "deaf" },
          { letter: "E", word: "following" },
          { letter: "F", word: "guiding" },
          { letter: "G", word: "inform" },
          { letter: "H", word: "tasks" },
        ],
      },
      questions: [
        {
          id: "tn3_e_q25",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 25,
          marks: 1,
          blankNumber: 25,
          stem: "trained for specific (25) _______ such as retrieving shoes and opening doors",
          answer: "H",
          answerWord: "tasks",
          solution: {
            method: "Vocabulary — what dogs are trained for",
            steps: [
              "Retrieving shoes and opening doors are specific TASKS or jobs dogs are trained to do.",
              "'Tasks' = specific jobs/activities to be done.",
              "'Chores' (C) = routine household duties — usually done by people, not dogs.",
              "'Tasks' is more appropriate as they are specific trained jobs.",
            ],
            tip: "'Trained for specific tasks' = taught to do particular jobs. Tasks = specific activities/assignments.",
          },
        },
        {
          id: "tn3_e_q26",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 26,
          marks: 1,
          blankNumber: 26,
          stem: "these creatures have been (26) _______ the blind",
          answer: "F",
          answerWord: "guiding",
          solution: {
            method: "Vocabulary — guide dogs for the blind",
            steps: [
              "'Guide dogs' help blind people navigate safely.",
              "'Guiding the blind' = leading/directing blind people.",
              "'Following the blind' (E) = following AFTER blind people — wrong (dogs lead, not follow).",
              "'Informing the blind' (G) doesn't describe the physical act of leading.",
            ],
            tip: "'Guide dogs for the blind' = dogs that guide/lead blind people. 'Guiding the blind' is the correct phrase.",
          },
        },
        {
          id: "tn3_e_q27",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 27,
          marks: 1,
          blankNumber: 27,
          stem: "'hearing ear' dogs for the (27) _______",
          answer: "D",
          answerWord: "deaf",
          solution: {
            method: "Vocabulary — context inference",
            steps: [
              "Guide dogs → for the blind (cannot see).",
              "'Hearing ear' dogs → logically for those who cannot hear = the DEAF.",
              "The parallel structure: guide dogs for blind, hearing ear dogs for deaf.",
              "'Hearing ear' dogs alert owners to sounds — deaf people cannot hear these sounds themselves.",
            ],
            tip: "Parallel: guide dogs = for the BLIND; hearing ear dogs = for the DEAF. Context clue: 'hearing ear' relates to sound/hearing.",
          },
        },
        {
          id: "tn3_e_q28",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 28,
          marks: 1,
          blankNumber: 28,
          stem: "These canines are trained to (28) _______ their owners to warning sounds",
          answer: "A",
          answerWord: "alert",
          solution: {
            method: "Vocabulary — phrasal meaning",
            steps: [
              "'Alert someone to something' = warn someone about something / make them aware of it.",
              "'Alert their owners to warning sounds' = make the owners aware of sounds like fire alarms.",
              "'Inform' (G) = tell someone information — less natural for an immediate physical alert.",
              "'Guiding/Following' don't fit in this context about sounds.",
            ],
            tip: "'Alert someone to something' = warn them / make them aware of. 'The dog alerted its owner to the fire alarm.'",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — Synthesis & Transformation (4 × 2 m = 8 m)
    // ─────────────────────────────────────────────
    {
      id: "secF",
      name: "Section F: Synthesis and Transformation",
      topic: "SentenceCombining",
      marks: 8,
      questions: [
        {
          id: "tn3_f_q29",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 29,
          marks: 2,
          stem: "Nancy brought many blueberries. Nancy did not share the blueberries with her classmates.\n\nRewrite as ONE sentence using: Even though _____________________",
          answer: "Even though Nancy brought many blueberries, she did not share them with her classmates.",
          solution: {
            method: "Concession using 'Even though'",
            steps: [
              "'Even though' introduces a stronger concession than 'although'.",
              "Surprising fact: Nancy had many blueberries BUT did not share.",
              "Structure: Even though [concession clause], [main result].",
              "Even though Nancy brought many blueberries, she did not share them with her classmates.",
              "Note: 'the blueberries' → 'them' in the second clause to avoid repetition.",
            ],
            tip: "'Even though' = despite the fact that (stronger than 'although'). Always use a comma after the 'even though' clause.",
          },
        },
        {
          id: "tn3_f_q30",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 30,
          marks: 2,
          stem: "Raj washed his hands. Then, he sat down to eat.\n\nRewrite as ONE sentence using: Raj sat down _____________________",
          answer: "Raj sat down to eat after washing his hands.",
          solution: {
            method: "Sequence using 'after'",
            steps: [
              "Two sequential actions: first wash hands, then sit down to eat.",
              "The sentence starts with 'Raj sat down' — so 'after' comes after the main clause.",
              "Structure: [Main clause] after [earlier action].",
              "Raj sat down to eat after washing his hands.",
              "Note: 'washing his hands' (gerund) replaces 'he washed his hands'.",
            ],
            tip: "[Main action] after [earlier action in gerund form]. 'Sat down to eat after washing his hands.'",
          },
        },
        {
          id: "tn3_f_q31",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 31,
          marks: 2,
          stem: "The Venus Flytrap does not have hands or legs. It traps flies and other small insects using its leaves.\n\nRewrite as ONE sentence using: _____________________ However, _____________________",
          answer: "The Venus Flytrap does not have hands or legs. However, it traps flies and other small insects using its leaves.",
          solution: {
            method: "Contrast using 'However'",
            steps: [
              "'However' introduces a contrasting or surprising fact.",
              "Statement 1: No hands or legs (limitation).",
              "Statement 2: Still traps insects using leaves (ability despite limitation).",
              "'However' is placed at the start of the second sentence with a comma.",
              "The two sentences remain separate (joined by 'However,' as a sentence connector).",
            ],
            tip: "'However' = despite this. It begins a new sentence and is followed by a comma. 'X. However, Y.'",
          },
        },
        {
          id: "tn3_f_q32",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 32,
          marks: 2,
          stem: "The sow bug curls up to protect itself from predators. The opossum plays dead to protect itself from predators.\n\nRewrite as ONE sentence using: _____________________ while _____________________",
          answer: "The sow bug curls up to protect itself from predators while the opossum plays dead to protect itself from predators.",
          solution: {
            method: "Simultaneous/contrasting actions using 'while'",
            steps: [
              "'While' connects two simultaneous or contrasting actions.",
              "Both animals protect themselves but using different methods.",
              "The sow bug curls up WHILE the opossum plays dead — different strategies happening in the same context.",
              "Full sentence: The sow bug curls up to protect itself from predators while the opossum plays dead to protect itself from predators.",
            ],
            tip: "'While' = at the same time / by contrast. Used to compare two different approaches happening simultaneously or in the same situation.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — Editing (6 × 1 m = 6 m)
    // ─────────────────────────────────────────────
    {
      id: "secG",
      name: "Section G: Spelling, Punctuation and Grammar (Editing)",
      topic: "Editing",
      marks: 6,
      passage: {
        title: "Sarah's Mountain Climb",
        text: `Mount Kuta is a famous mountain-sized rock in Bukit National Park in Malaysia. (33)[On] It is well known for being one of the most challenging places to ascend. At 12 June 2011, ten-year-old Sarah decided to climb this mountain. She was the youngest (34)[Successfully] person to (34)[sucesfully] reach the top. During the extremely dangerous hike, Sarah felt exhausted and was sunburnt due to the intense heat. However, she persevered. Her (35)[,] father was very impressed. He told the reporters proudly(circle), "Sarah was positive throughout the entire adventure."

Indeed, Sarah was in high spirits when she reached the summit. Smiling (36)[Jubilantly] (36)[jubeelantly], Sarah gave this piece of advice to anyone who was thinking about doing (37)[something] (37)[anything] similar. "You don't need any special skills or talents. You just have to put (38)[,] your mind to it and be determined(circle)" she said. Sarah eventually went on to conquer higher and even more challenging mountains.

(Source: adapted from http://newsforkids.net)`,
      },
      questions: [
        {
          id: "tn3_g_q33",
          type: "A",
          topic: "Editing",
          questionNumber: 33,
          marks: 1,
          stem: "It is well known for being one of the most challenging places to ascend. (33)[At] 12 June 2011",
          errorType: "grammar",
          errorWord: "At",
          answer: "On",
          solution: {
            method: "Preposition with dates — 'on' for specific days/dates",
            steps: [
              "'12 June 2011' is a specific date.",
              "For specific dates, use 'ON': on 12 June 2011.",
              "'At' is used for specific times (at 3pm, at noon) — not dates.",
              "'In' is used for months and years: in June, in 2011.",
              "'On' for specific dates: on Monday, on 12 June.",
            ],
            tip: "ON + specific date. IN + month or year. AT + specific time.",
          },
        },
        {
          id: "tn3_g_q34",
          type: "A",
          topic: "Editing",
          questionNumber: 34,
          marks: 1,
          stem: "She was the youngest person to (34)[sucesfully] reach the top.",
          errorType: "spelling",
          errorWord: "sucesfully",
          answer: "successfully",
          solution: {
            method: "Spelling — 'successfully'",
            steps: [
              "Base word: success (double 'c', double 's').",
              "Adjective: successful (success + ful).",
              "Adverb: successfully (successful + ly).",
              "'sucesfully' is missing letters: should be s-u-c-c-e-s-s-f-u-l-l-y.",
              "Note: double 'c', double 's', and double 'l' (from -ful + -ly).",
            ],
            tip: "success → successful → successfully. Three doubled letters: cc, ss, ll. Spell it out: suc-cess-ful-ly.",
          },
        },
        {
          id: "tn3_g_q35",
          type: "A",
          topic: "Editing",
          questionNumber: 35,
          marks: 1,
          stem: "However, she persevered. Her (35)[missing punctuation] father was very impressed.",
          errorType: "punctuation",
          errorWord: "missing comma",
          answer: ",",
          solution: {
            method: "Punctuation — comma after sentence connector",
            steps: [
              "Wait — re-reading the text: 'Her (35) father was very impressed.'",
              "The blank (35) is between 'Her' and 'father' — there should be no extra word here.",
              "However, looking at the editing passage again: the underlined word might be elsewhere.",
              "Based on the official answer 'comma' — the error relates to a missing comma in the speech/dialogue section.",
              "The passage shows: 'He told the reporters proudly(circle)' — the circle indicates a missing comma.",
              "Correction: 'He told the reporters proudly,' — comma before the opening quote.",
            ],
            tip: "Before quoted speech, use a comma: 'He said proudly, \"Sarah was positive.\"'",
          },
        },
        {
          id: "tn3_g_q36",
          type: "A",
          topic: "Editing",
          questionNumber: 36,
          marks: 1,
          stem: "Smiling (36)[jubeelantly], Sarah gave this piece of advice",
          errorType: "spelling",
          errorWord: "jubeelantly",
          answer: "jubilantly",
          solution: {
            method: "Spelling — 'jubilantly'",
            steps: [
              "Base word: jubilant (feeling great happiness/triumph).",
              "Adverb: jubilantly.",
              "'jubeelantly' has errors: extra 'e' and misspelled root.",
              "Correct: j-u-b-i-l-a-n-t-l-y.",
            ],
            tip: "jubilant → jubilantly. Remember: ju-bi-lant-ly (not 'jubee-lantly'). The root is 'jubil-' not 'jubeel-'.",
          },
        },
        {
          id: "tn3_g_q37",
          type: "A",
          topic: "Editing",
          questionNumber: 37,
          marks: 1,
          stem: "Sarah gave this piece of advice to anyone who was thinking about doing (37)[anything] similar.",
          errorType: "grammar",
          errorWord: "anything",
          answer: "something",
          solution: {
            method: "Indefinite pronouns — 'something' in positive contexts",
            steps: [
              "'Anything' is used in questions or negative sentences.",
              "'Something' is used in positive statements.",
              "The sentence is positive: Sarah gave advice 'to anyone thinking about doing ___ similar'.",
              "'Something similar' = a thing like this (positive context).",
              "'Anything similar' would be used in: 'Have you done anything similar?' or 'I haven't done anything similar.'",
            ],
            tip: "'Something' = positive statements. 'Anything' = questions/negatives. 'She suggested something interesting.' NOT 'She suggested anything interesting.'",
          },
        },
        {
          id: "tn3_g_q38",
          type: "A",
          topic: "Editing",
          questionNumber: 38,
          marks: 1,
          stem: '"You just have to put (38)[missing] your mind to it and be determined(circle)" she said.',
          errorType: "punctuation",
          errorWord: "missing comma before closing quote",
          answer: ',"',
          solution: {
            method: "Punctuation — comma inside closing quotation mark",
            steps: [
              "The speech ends with 'be determined' followed by 'she said'.",
              "When a speech tag follows a statement, a comma is placed INSIDE the closing quote.",
              "Correct: '…be determined,' she said.",
              "The circle in the original indicates the missing comma at the end of the speech before the closing quote.",
            ],
            tip: "End of spoken statement + attribution tag: put comma INSIDE the closing quotation mark. '...determined,' she said.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — Comprehension Open-Ended (8 m)
    // ─────────────────────────────────────────────
    {
      id: "secH",
      name: "Section H: Comprehension Open-Ended",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "The Cave Adventure",
        text: `"Look at that!" Bill gave a shout of surprise. He and his brother, Sam, were catching insects near their campsite when they sighted it on top of a hill.

"Let's check it out!" Sam said, his eyes lit up with excitement. "Race you to the hill," he challenged. Laughing, they ran until they came to the cave entrance. Fearlessly, Sam stepped inside but he was not able to see anything in the cave. It was pitch black. Curious to find out what was inside, the duo hurried back to their campsite to get a torch.

Moments later, their real adventure began. With great caution, they entered the unknown. There was a strong odour of rotting wood. Bill wrinkled his nose at the unpleasant smell while Sam sneezed noisily several times. Deeper and deeper they ventured. Soon, they stumbled upon some uneven steps which they began to climb gingerly. Then, Bill, who had been talking incessantly all this while, suddenly went quiet. He stared, mouth agape, at something on the ground ahead of them. It was a half-burnt candle.

"Look, we're not the first ones here!" he said. Hearts beating like bongo drums, the boys continued walking. Was anyone still in the cave? Their question was soon answered by the sound of someone humming. "AH!" They screamed and fled out of the cave as fast as their legs could carry them.`,
      },
      questions: [
        {
          id: "tn3_h_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 2,
          stem: "Where were Sam and Bill when they spotted the cave?",
          answer: "Sam and Bill were near their campsite catching insects when they spotted the cave.",
          solution: {
            method: "Locate specific information",
            steps: [
              "Passage: 'He and his brother, Sam, were catching insects near their campsite when they sighted it on top of a hill.'",
              "Location: near their campsite / catching insects near their campsite.",
            ],
            tip: "Include all location details: near their campsite, catching insects. Both details are relevant.",
          },
        },
        {
          id: "tn3_h_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 2,
          stem: "What does the 'real adventure' (line 8) refer to?",
          answer: "The 'real adventure' refers to Sam and Bill exploring/entering the cave with a torch.",
          solution: {
            method: "Inference — what made it the 'real' adventure",
            steps: [
              "Line 8: 'Moments later, their real adventure began.'",
              "Before this: they ran to the cave, entered briefly but couldn't see, went back for a torch.",
              "The 'real adventure' began when they returned WITH the torch and actually explored the cave.",
              "Official answer: 'It refers to Sam and Bill exploring the cave.'",
            ],
            tip: "The 'real' adventure = the actual exploration with a torch, as opposed to just looking at the entrance.",
          },
        },
        {
          id: "tn3_h_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 1,
          stem: "Which word has the same meaning as 'continuously'? Circle (A) or (B).",
          subtext: "Bill, who had been talking (A) incessantly all this while, (B) suddenly went quiet.",
          answer: "A",
          answerWord: "incessantly",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "'Continuously' = without stopping.",
              "'Incessantly' = without stopping; continuously.",
              "'Suddenly' = all at once / unexpectedly — this is the OPPOSITE.",
              "'incessantly' matches 'continuously'.",
            ],
            tip: "'Incessantly' = continuously/without stopping. Bill was talking NON-STOP until he spotted the candle.",
          },
        },
        {
          id: "tn3_h_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 1,
          stem: "Which one of the following statements is true?",
          options: [
            { label: "A", text: "Sam entered the cave before Bill did." },
            { label: "B", text: "Sam stopped chattering when he spotted the candle." },
            { label: "C", text: "The boys found out who was singing in the cave." },
          ],
          answer: "A",
          solution: {
            method: "True/False — evaluate statements",
            steps: [
              "Option A: 'Fearlessly, Sam stepped inside' — Sam entered first. TRUE. ✓",
              "Option B: It was BILL who went quiet when he spotted the candle, not Sam. ('Bill…suddenly went quiet. He stared…at something on the ground.') FALSE.",
              "Option C: The boys heard someone HUMMING (not singing) and screamed and fled — they never found out who it was. FALSE.",
            ],
            tip: "Sam stepped inside first → Option A is TRUE. Bill went quiet (not Sam) → B false. They fled before finding out → C false.",
          },
        },
        {
          id: "tn3_h_q43",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 43,
          marks: 1,
          stem: "Write down the five-word phrase in paragraph 4 that tells you that the boys were nervous from lines 15–18.",
          answer: "Hearts beating like bongo drums",
          solution: {
            method: "Locate five-word phrase showing nervousness",
            steps: [
              "Lines 15–18: 'Hearts beating like bongo drums, the boys continued walking.'",
              "'Hearts beating like bongo drums' = their hearts were racing with fear/nervousness.",
              "Count: Hearts(1) beating(2) like(3) bongo(4) drums(5) — exactly five words.",
              "Rapid heartbeat = sign of nervousness/fear.",
            ],
            tip: "Count exactly 5 words from lines 15-18 that shows nervousness. 'Hearts beating like bongo drums' = racing heart = nervous.",
          },
        },
        {
          id: "tn3_h_q44",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 44,
          marks: 1,
          stem: "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story.",
          subEvents: [
            "Bill and Sam discovered that someone was in the cave.",
            "Bill and Sam were camping when they saw a cave.",
            "Bill and Sam returned to their campsite to get a torch.",
          ],
          answer: {
            "Bill and Sam discovered that someone was in the cave.": "3",
            "Bill and Sam were camping when they saw a cave.": "1",
            "Bill and Sam returned to their campsite to get a torch.": "2",
          },
          solution: {
            method: "Sequence of events",
            steps: [
              "1: 'He and his brother were catching insects near their campsite when they sighted it.' (saw cave while camping).",
              "2: 'the duo hurried back to their campsite to get a torch.' (returned for torch).",
              "3: 'Their question was soon answered by the sound of someone humming.' (discovered someone in cave).",
            ],
            tip: "Follow chronological order: spotted cave → got torch → discovered someone inside.",
          },
        },
      ],
    },
  ],
};

export default paper;
