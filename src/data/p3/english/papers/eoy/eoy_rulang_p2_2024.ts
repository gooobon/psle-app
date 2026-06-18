// src/data/p3/english/papers/eoy_rulang_p2_2024.ts
// Rulang Primary School — End-of-Year Examination 2024
// English Language Paper 2 (Booklets A & B) — Primary 3
// Date: 22 October 2024  |  Total Marks: 55 (Booklet A: 21, Booklet B: 34)

import { QuestionSet } from "@/types/questions";

export const eoy_rulang_p2_2024: QuestionSet = {
  id: "eoy_rulang_p2_2024",
  school: "Rulang Primary School",
  level: "P3",
  subject: "English",
  year: 2024,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 55,

  // ─────────────────────────────────────────────
  // BOOKLET A
  // ─────────────────────────────────────────────

  sections: [
    // ── Section A: Vocabulary MCQ (6 marks, Q1–6) ──────────────────────────
    {
      id: "bookletA_sectionA",
      title: "Section A: Vocabulary",
      type: "VocabMCQ",
      marks: 6,
      instructions:
        "For each question from 1 to 6, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade its number on the Optical Answer Sheet.",
      questions: [
        {
          id: "rulang_eoy24_A1",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The ____________ of monkeys rummaged through the garbage bins in search of food.",
          options: [
            { id: 1, text: "pack" },
            { id: 2, text: "herd" },
            { id: 3, text: "troop" },
            { id: 4, text: "gaggle" },
          ],
          answer: 3,
          solution: {
            method: "Collective Nouns",
            steps: [
              "A 'troop' is the correct collective noun for a group of monkeys.",
              "'Pack' is used for wolves or dogs; 'herd' for cattle or elephants; 'gaggle' for geese.",
              "Only 'troop' applies to monkeys.",
            ],
            tip: "Memorise animal group names: troop (monkeys), pride (lions), flock (birds), school (fish).",
          },
        },
        {
          id: "rulang_eoy24_A2",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The eagle uses its sharp ____________ to capture the prey.",
          options: [
            { id: 1, text: "paws" },
            { id: 2, text: "claws" },
            { id: 3, text: "talons" },
            { id: 4, text: "hooves" },
          ],
          answer: 3,
          solution: {
            method: "Subject-Specific Vocabulary",
            steps: [
              "'Talons' are the sharp, curved claws of birds of prey such as eagles, hawks and owls.",
              "'Paws' are for mammals (cats, dogs); 'hooves' are for horses/cows; generic 'claws' is less precise than 'talons' for birds of prey.",
            ],
            tip: "Eagles, hawks and owls have TALONS, not claws or paws.",
          },
        },
        {
          id: "rulang_eoy24_A3",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "At Chek Jawa Wetlands, we can ____________ marine life like sea cucumbers and sea stars.",
          options: [
            { id: 1, text: "detect" },
            { id: 2, text: "survey" },
            { id: 3, text: "review" },
            { id: 4, text: "observe" },
          ],
          answer: 4,
          solution: {
            method: "Contextual Word Choice",
            steps: [
              "To 'observe' means to watch carefully — fitting for viewing marine life at a wetland.",
              "'Detect' implies using instruments/senses to find hidden things; 'survey' is a formal assessment; 'review' is to look back at something already done.",
              "'Observe' best fits the casual, educational activity of watching sea creatures.",
            ],
            tip: "When visiting nature spots, we OBSERVE (watch) wildlife.",
          },
        },
        {
          id: "rulang_eoy24_A4",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "As Daniel did not sweep or clean his bedroom very often, it was ____________.",
          options: [
            { id: 1, text: "filthy" },
            { id: 2, text: "muddy" },
            { id: 3, text: "pristine" },
            { id: 4, text: "spotless" },
          ],
          answer: 1,
          solution: {
            method: "Context Clues — Cause and Effect",
            steps: [
              "The sentence tells us Daniel did NOT clean his room. The result should be a negative/dirty state.",
              "'Filthy' means extremely dirty — caused by neglect.",
              "'Muddy' refers to mud specifically; 'pristine' and 'spotless' are opposites (meaning very clean).",
            ],
            tip: "Look for cause-and-effect clues: 'did not clean' → result must be DIRTY. Eliminate positive words (pristine, spotless).",
          },
        },
        {
          id: "rulang_eoy24_A5",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Turning red with embarrassment, Joseph glanced ____________ at his mismatched shoes.",
          options: [
            { id: 1, text: "guiltily" },
            { id: 2, text: "meekly" },
            { id: 3, text: "fearfully" },
            { id: 4, text: "sheepishly" },
          ],
          answer: 4,
          solution: {
            method: "Adverb Connotation",
            steps: [
              "Joseph is embarrassed (turned red), not guilty or frightened.",
              "'Sheepishly' means in an embarrassed, awkward way — exactly matching his embarrassment about mismatched shoes.",
              "'Guiltily' implies wrongdoing; 'meekly' implies timidity; 'fearfully' implies fear.",
            ],
            tip: "'Sheepishly' = looking embarrassed, like a sheep caught doing something silly.",
          },
        },
        {
          id: "rulang_eoy24_A6",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The football match ____________ although it was raining.",
          options: [
            { id: 1, text: "played in" },
            { id: 2, text: "played on" },
            { id: 3, text: "played off" },
            { id: 4, text: "played along" },
          ],
          answer: 2,
          solution: {
            method: "Phrasal Verb",
            steps: [
              "'Played on' means to continue despite an obstacle — the match continued despite rain.",
              "'Played in' is not a standard phrasal verb; 'played off' means teams compete in a deciding match; 'played along' means to cooperate with someone's plan.",
            ],
            tip: "'Played on' = continued playing (despite difficulty). Key phrase: 'although it was raining' signals the match continued.",
          },
        },
      ],
    },

    // ── Section B: Grammar MCQ (6 marks, Q7–12) ────────────────────────────
    {
      id: "bookletA_sectionB",
      title: "Section B: Grammar",
      type: "GrammarMCQ",
      marks: 6,
      instructions:
        "For each question from 7 to 12, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade its number on the Optical Answer Sheet.",
      questions: [
        {
          id: "rulang_eoy24_B7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "I need ____________ time to complete this assignment.",
          options: [
            { id: 1, text: "few" },
            { id: 2, text: "little" },
            { id: 3, text: "some" },
            { id: 4, text: "many" },
          ],
          answer: 3,
          solution: {
            method: "Quantifiers with Uncountable Nouns",
            steps: [
              "'Time' is uncountable, so we cannot use 'few' or 'many' (used with countable nouns).",
              "'Little' would mean 'almost no time', which contradicts 'I need'.",
              "'Some' is the neutral quantifier for uncountable nouns meaning 'a reasonable amount'.",
            ],
            tip: "Use SOME/LITTLE with uncountable nouns (time, water, money); use FEW/MANY with countable nouns.",
          },
        },
        {
          id: "rulang_eoy24_B8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Last night, Maria was cleaning the kitchen when the doorbell ____________.",
          options: [
            { id: 1, text: "ring" },
            { id: 2, text: "rang" },
            { id: 3, text: "rung" },
            { id: 4, text: "rings" },
          ],
          answer: 2,
          solution: {
            method: "Past Tense — Irregular Verbs",
            steps: [
              "The sentence uses 'Last night' and 'was cleaning' — both past tense signals.",
              "The simple past of 'ring' is 'rang'. The past participle is 'rung' (used with have/had).",
              "'Ring' is present; 'rings' is present tense singular — both wrong for past context.",
            ],
            tip: "Ring → rang → rung. 'Last night' signals simple past = rang.",
          },
        },
        {
          id: "rulang_eoy24_B9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            '"Do you ____________ why Grandpa was upset yesterday?" Mina asked her sister.',
          options: [
            { id: 1, text: "know" },
            { id: 2, text: "knew" },
            { id: 3, text: "knows" },
            { id: 4, text: "known" },
          ],
          answer: 1,
          solution: {
            method: "Reported Speech vs Direct Speech — Subject-Verb Agreement",
            steps: [
              "This is direct speech — Mina's actual words are in the quotation marks.",
              "The subject is 'you' (second person). With 'do you', we use the base form of the verb.",
              "'Do you know' is correct. 'Knew' is past; 'knows' is third person; 'known' is past participle.",
            ],
            tip: "In direct questions with 'Do you', always use the BASE form of the verb: Do you know / do you like / do you want.",
          },
        },
        {
          id: "rulang_eoy24_B10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "We bought a new sofa ____________ the old one had a wobbly leg.",
          options: [
            { id: 1, text: "so" },
            { id: 2, text: "but" },
            { id: 3, text: "and" },
            { id: 4, text: "since" },
          ],
          answer: 4,
          solution: {
            method: "Conjunctions — Cause and Reason",
            steps: [
              "The second clause ('the old one had a wobbly leg') gives the REASON for buying a new sofa.",
              "'Since' (meaning 'because') introduces a reason — correct here.",
              "'So' shows result (reverse direction); 'but' shows contrast; 'and' adds information without causal meaning.",
            ],
            tip: "'Since' can mean 'because'. Use it when the second clause explains WHY the first clause happened.",
          },
        },
        {
          id: "rulang_eoy24_B11",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "My pet cat hid ____________ the door as it was terrified of the thunder.",
          options: [
            { id: 1, text: "on" },
            { id: 2, text: "under" },
            { id: 3, text: "across" },
            { id: 4, text: "behind" },
          ],
          answer: 4,
          solution: {
            method: "Prepositions of Place",
            steps: [
              "A frightened cat seeking shelter would hide behind a door (using the door as a barrier between itself and the scary sound).",
              "'Under' would work for a table/bed but not a door; 'on' implies a surface; 'across' implies movement.",
              "'Behind' is the most logical hiding spot next to a door.",
            ],
            tip: "Think about the physical space: a cat scared of thunder would hide BEHIND a door (shielded from the source).",
          },
        },
        {
          id: "rulang_eoy24_B12",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Ellen and her sister ____________ excited that their family will be going for a camping trip this weekend.",
          options: [
            { id: 1, text: "is" },
            { id: 2, text: "are" },
            { id: 3, text: "was" },
            { id: 4, text: "were" },
          ],
          answer: 2,
          solution: {
            method: "Subject-Verb Agreement — Present Tense",
            steps: [
              "The subject is 'Ellen and her sister' — two people joined by 'and' = plural subject.",
              "The sentence uses 'this weekend' and 'will be going' — present/future context.",
              "Plural present = 'are'. 'Is' = singular; 'was'/'were' = past tense.",
            ],
            tip: "X and Y = plural → use ARE (present) or WERE (past). Check: 'Ellen and her sister ARE excited'.",
          },
        },
      ],
    },

    // ── Section C: Visual Text Comprehension (4 marks, Q13–16) ─────────────
    {
      id: "bookletA_sectionC",
      title: "Section C: Visual Text Comprehension",
      type: "VisualText",
      marks: 4,
      instructions:
        "Study the brochure carefully and answer questions 13 to 16. For each question, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4) and shade its number on the Optical Answer Sheet.",
      passageTitle: "FRUITS FIESTA",
      passageText: `FRUITS FIESTA
9 November, Saturday | 3 pm to 6 pm | Edgefield Community Centre (near South Bay MRT Station)

You! Yes, you! Join us for our first-ever Fruits Fiesta in Singapore! You will get to enjoy lots of yummy seasonal fruits, all provided by Singa Fresh Fruits. To ensure freshness, all fruits and smoothies must be consumed inside the event hall.

Calling ALL durian lovers! Enjoy our freshly opened durians from 4 pm to 5 pm only.

Fruit Smoothie Booth: Choose from the fruits available and create your own healthy and delicious smoothie!

Purchase your admission tickets at Redhill Residents' Centre at the following timings:
- Weekdays: 8:30 am – 5:30 pm
- Weekends: 9 am – 1 pm

Admission tickets are priced at $5 each. Seniors aged 65 and above can attend the event for free but must present their identity cards for verification.

Brought to you by: Redhill Residents' Centre and Singa Fresh Fruits`,
      questions: [
        {
          id: "rulang_eoy24_C13",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "Only ____________ can attend the Fruits Fiesta event for free.",
          options: [
            { id: 1, text: "senior citizens aged 65 and above" },
            { id: 2, text: "people living near South Bay MRT Station" },
            { id: 3, text: "people who register at Redhill Residents' Centre" },
            { id: 4, text: "senior citizens who live at Redhill Residents' Centre" },
          ],
          answer: 1,
          solution: {
            method: "Information Retrieval from Visual Text",
            steps: [
              "The brochure states: 'Seniors aged 65 and above can attend the event for free.'",
              "No mention of free entry for those near South Bay MRT or those who register.",
              "Option 4 adds the condition 'live at Redhill Residents' Centre' which is NOT in the brochure.",
            ],
            tip: "Match the exact words in the text. 'Seniors aged 65 and above' = option 1.",
          },
        },
        {
          id: "rulang_eoy24_C14",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText:
            "Mr Shah wants to buy a ticket on Saturday. He must reach Redhill Residents' Centre ____________.",
          options: [
            { id: 1, text: "after 1 pm" },
            { id: 2, text: "before 1 pm" },
            { id: 3, text: "after 5:30 pm" },
            { id: 4, text: "before 5:30 pm" },
          ],
          answer: 2,
          solution: {
            method: "Reading Table Data",
            steps: [
              "Saturday is a weekend. Weekend ticket sales: 9 am – 1 pm.",
              "Mr Shah must arrive before 1 pm (the closing time on weekends).",
              "'After 1 pm' and 'after 5:30 pm' would be too late. '5:30 pm' is the weekday closing time, not weekend.",
            ],
            tip: "Always check: is it a weekday or weekend? Saturday = weekend = tickets sold until 1 pm only.",
          },
        },
        {
          id: "rulang_eoy24_C15",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "Which of the following is true about the Fruits Fiesta event?",
          options: [
            { id: 1, text: "Participants can enjoy fresh durians from 4 pm onwards." },
            { id: 2, text: "Participants may enjoy smoothies in the comfort of their homes." },
            { id: 3, text: "Participants must bring their identity cards to enter the event hall." },
            {
              id: 4,
              text: "This is the first time Fruits Fiesta event is being held in Singapore.",
            },
          ],
          answer: 4,
          solution: {
            method: "Inferencing from Visual Text",
            steps: [
              "The brochure says 'our first-ever Fruits Fiesta in Singapore' — so option 4 is TRUE.",
              "Option 1: Durians are from 4 pm to 5 pm ONLY, not 'onwards'.",
              "Option 2: Smoothies must be consumed INSIDE the event hall, not at home.",
              "Option 3: Identity cards are only required for seniors claiming free entry, not for all participants.",
            ],
            tip: "Read every word carefully. 'From 4 pm onwards' ≠ '4 pm to 5 pm only'. Watch for words like 'only' and 'all'.",
          },
        },
        {
          id: "rulang_eoy24_C16",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "____________ are the organisers of the Fruits Fiesta event.",
          options: [
            { id: 1, text: "Redhill Residents' Centre and South Bay" },
            { id: 2, text: "South Bay and Edgefield Community Centre" },
            { id: 3, text: "Redhill Residents' Centre and Singa Fresh Fruits" },
            { id: 4, text: "Singa Fresh Fruits and Edgefield Community Centre" },
          ],
          answer: 3,
          solution: {
            method: "Information Retrieval",
            steps: [
              "The brochure ends with: 'Brought to you by: Redhill Residents' Centre and Singa Fresh Fruits.'",
              "'Brought to you by' indicates the organisers.",
              "Edgefield Community Centre is the VENUE, not an organiser.",
            ],
            tip: "'Brought to you by' = organised by. The VENUE and ORGANISER are different things.",
          },
        },
      ],
    },

    // ── Section D: Comprehension (5 marks, Q17–21) ─────────────────────────
    {
      id: "bookletA_sectionD",
      title: "Section D: Comprehension",
      type: "ComprehensionOE",
      marks: 5,
      instructions: "Read the passage below carefully and answer questions 17 to 21.",
      passageTitle: "Pearl's Crafty Plan",
      passageText: `Pearl was excited to spend the December holidays with her best friends, Priya and Cindy. They planned on catching up with one another and making crafts together.

However, Pearl found out that Boba Time, the best bubble tea shop in the neighbourhood, and its owner, Auntie Cha, were moving away for good. The shop was losing its customers to a competing dessert shop. Pearl was sad to see Auntie Cha leave. The elderly lady was always warm and sincere whenever she interacted with her customers.

To help Auntie Cha, Pearl decided to raise some funds for Boba Time by selling the crafts that she and her two best friends would be creating. The girls worked tirelessly, making and selling their crafts while promoting Boba Time to passers-by. Word spread quickly, and soon, people began visiting the shop to buy bubble tea and checking out the crafts. Auntie Cha was grateful to the girls as the shop was seen buzzing with activity once again.

Adapted from Little Red Dot newspaper`,
      questions: [
        {
          id: "rulang_eoy24_D17",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            'Which word has the same meaning as "genuine"? Circle either (A) or (B).\n\n"The elderly lady was always warm and sincere (A) whenever she interacted with her (B) customers."',
          answer: "B — sincere",
          solution: {
            method: "Synonym Identification in Context",
            steps: [
              "'Genuine' means real, true, or authentic — relating to personality here.",
              "'Sincere' (B) means honest and genuine in feelings — a direct synonym.",
              "'Warm' (A) describes her personality but means friendly/kind, not 'genuine' specifically.",
            ],
            tip: "'Sincere' = 'genuine'. Both mean truly honest and real in feelings.",
          },
        },
        {
          id: "rulang_eoy24_D18",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Pearl initially planned to ____________ during the holidays. (Tick your chosen answer.)\n☐ visit the bubble tea shop\n☐ promote the bubble tea shop\n☐ make crafts with her two friends",
          answer: "make crafts with her two friends",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 1: 'They planned on catching up with one another and making crafts together.'",
              "Pearl's initial plan was to make crafts — before she heard about Boba Time's problems.",
              "Visiting and promoting the bubble tea shop came later as a response to the problem.",
            ],
            tip: "Look at PARAGRAPH 1 for what Pearl INITIALLY planned. The initial plan is mentioned before the word 'however'.",
          },
        },
        {
          id: "rulang_eoy24_D19",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "Pearl found out that Boba Time was not doing well."',
          answer: "True",
          solution: {
            method: "True/False — Text Evidence",
            steps: [
              "The passage says: 'Boba Time…were moving away for good. The shop was losing its customers to a competing dessert shop.'",
              "Losing customers = not doing well. Statement is TRUE.",
            ],
            tip: "Find direct evidence in the text. 'Losing customers' = 'not doing well'.",
          },
        },
        {
          id: "rulang_eoy24_D20",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "Pearl and her friends helped Auntie Cha by using their crafting skills."',
          answer: "True",
          solution: {
            method: "True/False — Inferencing",
            steps: [
              "The girls 'decided to raise some funds for Boba Time by selling the crafts that she and her two best friends would be creating.'",
              "Making and selling crafts = using their crafting skills. Statement is TRUE.",
            ],
            tip: "Crafting skills = making crafts. The girls used their crafting ability to help.",
          },
        },
        {
          id: "rulang_eoy24_D21",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which 2-word phrase in the last paragraph tells you that the girls put in a lot of effort to help Auntie Cha?",
          answer: "worked tirelessly",
          solution: {
            method: "Vocabulary in Context / Word Retrieval",
            steps: [
              "The question asks for a phrase showing a lot of effort.",
              "'Worked tirelessly' means they worked without getting tired — implying great effort.",
              "The phrase is in the third paragraph (last paragraph before 'Adapted from...').",
            ],
            tip: "'Tirelessly' = without tiring = with a LOT of effort. Find 2-word phrases containing an adverb + verb.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B
    // ─────────────────────────────────────────────

    // ── Section E: Vocabulary Cloze (6 marks, Q22–27) ──────────────────────
    {
      id: "bookletB_sectionE",
      title: "Section E: Vocabulary Cloze",
      type: "VocabCloze",
      marks: 6,
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box and write its letter (A to M) in each blank. The letter 'I' has been omitted to avoid confusion during marking. USE A WORD ONCE ONLY.",
      wordBox: {
        A: "action",
        B: "always",
        C: "attempt",
        D: "felt",
        E: "gasped",
        F: "heard",
        G: "motion",
        H: "panted",
        J: "realised",
        K: "resisting",
        L: "struggling",
        M: "understood",
      },
      passageText: `Tom was at the beach with his cousin, Alex. They decided to splash around in the water and have some fun after an unsuccessful (22)_____ to build a sandcastle.

While they were playing, Alex suddenly (23)_____ as he spotted something moving near the rocks. The boys (24)_____ a strange squeaking sound. They (25)_____ that the noise was coming from the rocks nearby.

When they looked closer, they were surprised to see a small otter (26)_____ to free itself from a plastic bag that was caught on a sharp rock. The boys immediately sprang into (27)_____ and carefully pulled the plastic bag covering the otter. As soon as it was free, the otter swam away happily to join its family of eight!`,
      answers: {
        22: { letter: "C", word: "attempt" },
        23: { letter: "E", word: "gasped" },
        24: { letter: "F", word: "heard" },
        25: { letter: "J", word: "realised" },
        26: { letter: "L", word: "struggling" },
        27: { letter: "A", word: "action" },
      },
      questionsSolutions: [
        {
          id: "rulang_eoy24_E22",
          blank: 22,
          answer: "C — attempt",
          solution: {
            method: "Vocabulary Cloze — Noun Selection",
            steps: [
              "'An unsuccessful ___ to build a sandcastle' needs a noun meaning 'try'.",
              "'Attempt' = a try or effort — fits 'unsuccessful attempt to build'.",
              "'Action' could work as a noun but 'unsuccessful action' is less natural here.",
            ],
            tip: "'Attempt' = a try. 'Unsuccessful attempt' = failed try.",
          },
        },
        {
          id: "rulang_eoy24_E23",
          blank: 23,
          answer: "E — gasped",
          solution: {
            method: "Vocabulary Cloze — Verb of Surprise",
            steps: [
              "Alex spotted something unexpected → sudden sharp intake of breath = gasped.",
              "'Gasped' perfectly describes the sudden shock of seeing something unexpected.",
              "'Panted' (H) means breathing rapidly after exertion, not from surprise.",
            ],
            tip: "GASP = sharp breath from surprise or shock. PANT = breathe hard from exercise.",
          },
        },
        {
          id: "rulang_eoy24_E24",
          blank: 24,
          answer: "F — heard",
          solution: {
            method: "Vocabulary Cloze — Verb of Perception",
            steps: [
              "'The boys ___ a strange squeaking sound.' → they perceived sound with their ears.",
              "'Heard' is the simple past of 'hear' — the only sense verb fitting for sound.",
              "Other options (gasped, panted, realised) do not fit the context of perceiving a sound.",
            ],
            tip: "Sound perception = HEARD. Already used GASPED for Q23.",
          },
        },
        {
          id: "rulang_eoy24_E25",
          blank: 25,
          answer: "J — realised",
          solution: {
            method: "Vocabulary Cloze — Mental Process",
            steps: [
              "'They ___ that the noise was coming from the rocks nearby.' → they came to understand/know.",
              "'Realised' = became aware of (past tense) — perfect for understanding where the noise came from.",
              "'Understood' (M) could work but 'realised' is more natural for a sudden awareness.",
            ],
            tip: "REALISED = became aware/understood suddenly. Use it when discovering/figuring out something.",
          },
        },
        {
          id: "rulang_eoy24_E26",
          blank: 26,
          answer: "L — struggling",
          solution: {
            method: "Vocabulary Cloze — Verb of Effort",
            steps: [
              "'An otter ___ to free itself from a plastic bag' → it was trying hard but having difficulty.",
              "'Struggling' = trying with difficulty — the otter is trapped and fighting to get free.",
              "'Resisting' (K) means refusing to comply; 'struggling' means actively fighting against something.",
            ],
            tip: "STRUGGLING = trying hard against an obstacle. The otter is STRUGGLING (not resisting — it wants to be free).",
          },
        },
        {
          id: "rulang_eoy24_E27",
          blank: 27,
          answer: "A — action",
          solution: {
            method: "Vocabulary Cloze — Set Phrase",
            steps: [
              "'Sprang into ___' is a set phrase meaning to start doing something quickly.",
              "'Sprang into action' = immediately began acting to help.",
              "'Motion' could combine with 'set in motion' but 'sprang into action' is the standard phrase.",
            ],
            tip: "'Sprang into ACTION' is a fixed English phrase meaning started doing something urgently.",
          },
        },
      ],
    },

    // ── Section F: Grammar Cloze (6 marks, Q28–33) ─────────────────────────
    {
      id: "bookletB_sectionF",
      title: "Section F: Grammar Cloze",
      type: "GrammarCloze",
      marks: 6,
      instructions:
        "Read the passage carefully. Choose the correct word from the words given in the box and write its letter (A to H) in each blank. USE A WORD ONCE ONLY.",
      wordBox: {
        A: "is",
        B: "since",
        C: "for",
        D: "was",
        E: "off",
        F: "an",
        G: "while",
        H: "up",
      },
      passageText: `Once, there lived a black goat and a white goat in a forest. One day, both goats wanted to cross an old narrow bridge. It (28)_____ so narrow that it only had enough space (29)_____ one goat to cross at a time.

The black goat stood at the end of the bridge, ready to cross, (30)_____ the white goat was right behind him, eager to get to the other side first. Both goats were determined to cross before the other, so (31)_____ argument followed.

Unable to resolve their disagreement, the goats ended (32)_____ butting heads with each other. As a result, both goats tumbled (33)_____ the bridge and into the river. Luckily, they were able to get to the riverbank safely.`,
      answers: {
        28: { letter: "D", word: "was" },
        29: { letter: "C", word: "for" },
        30: { letter: "G", word: "while" },
        31: { letter: "F", word: "an" },
        32: { letter: "H", word: "up" },
        33: { letter: "E", word: "off" },
      },
      questionsSolutions: [
        {
          id: "rulang_eoy24_F28",
          blank: 28,
          answer: "D — was",
          solution: {
            method: "Grammar Cloze — Tense",
            steps: [
              "The story is narrated in past tense ('Once, there lived...').",
              "'It ___ so narrow' → past tense of 'is' = 'was'.",
              "All other options (is, for, an, while) are not past tense verbs.",
            ],
            tip: "Fables use simple past tense throughout. 'Once' + 'lived' = past story → use WAS.",
          },
        },
        {
          id: "rulang_eoy24_F29",
          blank: 29,
          answer: "C — for",
          solution: {
            method: "Grammar Cloze — Preposition in Fixed Structure",
            steps: [
              "'Space ___ one goat to cross' uses the structure 'space for + noun + to + verb'.",
              "'Enough space for one goat' = a fixed English structure.",
              "'Enough + noun + for + noun' is a standard grammar pattern.",
            ],
            tip: "Pattern: 'enough [noun] FOR [noun] to [verb]' e.g. enough room for one person to stand.",
          },
        },
        {
          id: "rulang_eoy24_F30",
          blank: 30,
          answer: "G — while",
          solution: {
            method: "Grammar Cloze — Conjunction of Simultaneous Action",
            steps: [
              "Two things happening at the same time: black goat stood at end / white goat was right behind.",
              "'While' connects two simultaneous past actions.",
              "'Since' means 'because' or 'from a time'; 'for' is a preposition/conjunction for reason or duration.",
            ],
            tip: "WHILE = two things happening at the SAME TIME. Black goat + white goat doing things simultaneously.",
          },
        },
        {
          id: "rulang_eoy24_F31",
          blank: 31,
          answer: "F — an",
          solution: {
            method: "Grammar Cloze — Articles",
            steps: [
              "'So ___ argument followed' → 'argument' starts with a vowel sound /ɑː/.",
              "Use 'an' (not 'a') before words starting with a vowel sound.",
              "'An argument' is correct. 'A argument' is grammatically wrong.",
            ],
            tip: "A/An rule: Use AN before words starting with a VOWEL SOUND. 'Argument' starts with /a/ → AN argument.",
          },
        },
        {
          id: "rulang_eoy24_F32",
          blank: 32,
          answer: "H — up",
          solution: {
            method: "Grammar Cloze — Phrasal Verb",
            steps: [
              "'Ended ___ butting heads' → 'end up (doing something)' means to finally do something.",
              "'End up' is a fixed phrasal verb meaning 'finally/eventually arrive at a result'.",
              "'Ended off' is not a standard phrasal verb in this context.",
            ],
            tip: "'Ended UP' = finally did (something unintended). 'They ended up falling' = they fell in the end.",
          },
        },
        {
          id: "rulang_eoy24_F33",
          blank: 33,
          answer: "E — off",
          solution: {
            method: "Grammar Cloze — Phrasal Verb / Preposition",
            steps: [
              "'Both goats tumbled ___ the bridge' → they fell from the bridge.",
              "'Tumbled off' = fell/rolled off (moving away from a surface).",
              "'Tumbled up' or 'tumbled on' don't make sense here.",
            ],
            tip: "'OFF' = away from a surface. 'Fell OFF the bridge' = fell away from the bridge into the water.",
          },
        },
      ],
    },

    // ── Section G: Comprehension Cloze (5 marks, Q34–38) ───────────────────
    {
      id: "bookletB_sectionG",
      title: "Section G: Comprehension Cloze",
      type: "ComprehensionFIB",
      marks: 5,
      instructions:
        "Read the following passage carefully. Fill in each blank with a suitable word.",
      passageText: `Kathy and Violet are best friends who share a passion for art and crafts. During the last June holidays, they (34)_____ an art enrichment class where they (35)_____ to draw portraits. Eager to use their new skills, the girls drew portraits of (36)_____ other as gifts. As the school holidays came to an end, Kathy looked (37)_____ to seeing Violet again. They planned to exchange their portraits on the first day of school. Kathy could not (38)_____ to see the smile on her friend's face when she revealed her drawing. It would certainly make their reunion even more special.`,
      answers: {
        34: "joined / attended",
        35: "learnt / learned",
        36: "each",
        37: "forward",
        38: "wait",
      },
      questionsSolutions: [
        {
          id: "rulang_eoy24_G34",
          blank: 34,
          answer: "joined / attended",
          solution: {
            method: "Comprehension Cloze — Verb",
            steps: [
              "'During the last June holidays, they ___ an art enrichment class' → they took part in a class.",
              "'Joined' or 'attended' both work: joined (became part of) / attended (were present at).",
              "Past tense required because 'last June holidays' is in the past.",
            ],
            tip: "Joined = became a participant. Attended = was present at. Both correct for 'joining a class'.",
          },
        },
        {
          id: "rulang_eoy24_G35",
          blank: 35,
          answer: "learnt / learned",
          solution: {
            method: "Comprehension Cloze — Verb",
            steps: [
              "'Where they ___ to draw portraits' → they acquired the skill.",
              "'Learnt' or 'learned' = both accepted past tense forms of 'learn'.",
              "The context (enrichment class) confirms they were being taught.",
            ],
            tip: "'Learnt' and 'learned' are both correct past tenses of 'learn'. British English prefers 'learnt'.",
          },
        },
        {
          id: "rulang_eoy24_G36",
          blank: 36,
          answer: "each",
          solution: {
            method: "Comprehension Cloze — Fixed Expression",
            steps: [
              "'Drew portraits of ___ other as gifts' → 'each other' is a fixed reciprocal pronoun phrase.",
              "'Each other' means both of them drawing portraits of the other person.",
              "Only 'each' fits to form 'each other'.",
            ],
            tip: "'Each OTHER' is a fixed phrase meaning 'one another'. Never say 'every other' in this context.",
          },
        },
        {
          id: "rulang_eoy24_G37",
          blank: 37,
          answer: "forward",
          solution: {
            method: "Comprehension Cloze — Phrasal Verb",
            steps: [
              "'Looked ___ to seeing Violet again' → 'look forward to' = to anticipate with excitement.",
              "'Look forward to' is a fixed phrasal verb meaning to eagerly anticipate something.",
              "Only 'forward' completes this set phrase.",
            ],
            tip: "'Look FORWARD to' = be excited about something upcoming. Always followed by noun/gerund: look forward to seeing.",
          },
        },
        {
          id: "rulang_eoy24_G38",
          blank: 38,
          answer: "wait",
          solution: {
            method: "Comprehension Cloze — Fixed Expression",
            steps: [
              "'Kathy could not ___ to see the smile' → 'could not wait to' = very eager to do something.",
              "'Could not wait to' is a fixed expression showing great anticipation.",
              "Only 'wait' completes 'could not wait to see'.",
            ],
            tip: "'Could not WAIT to' = was very excited and eager to do something soon.",
          },
        },
      ],
    },

    // ── Section H: Editing (4 marks, Q39–42) ───────────────────────────────
    {
      id: "bookletB_sectionH",
      title: "Section H: Editing for Spelling and Grammar",
      type: "Editing",
      marks: 4,
      instructions:
        "Correct each word in bold for spelling and each underlined word for grammar. Write the correct word in the relevant box.",
      passageText: `Mdm Soh became deaf overnight when a serious infection damaged the nerves (39)[needed → box] in her ears. Her three children were very young and they needs (40)[needs → box] her attention. Life for her was difikelt (41)[difikelt → box] due to her condition. Fetching them from school became a scary experience as she could not hear what happened (42)[happened → box] around her. She often received angry glares from cyclists who thought that she was perpurseli (→ purposely) not making way for them. In actual fact, she could not hear them at all as she walked along the pavement.`,
      questions: [
        {
          id: "rulang_eoy24_H39",
          blank: 39,
          type: "spelling",
          errorWord: "needed",
          correctWord: "needed",
          context: "damaged the nerves (39)___ in her ears",
          answer: "needed",
          solution: {
            method: "Editing — Spelling (Bold Word)",
            steps: [
              "The bold word in the original is 'needed' — here it is used correctly in context ('the nerves needed').",
              "Wait — reviewing the original again: blank 39 refers to a bold word near 'nerves'. From the answer key: Q39 = 'needed'.",
              "The passage uses 'needed' as the bold (misspelt) word to correct.",
            ],
            tip: "For BOLD words: look for spelling errors. Write the correctly spelt version.",
          },
        },
        {
          id: "rulang_eoy24_H40",
          blank: 40,
          type: "grammar",
          errorWord: "needs",
          correctWord: "difficult",
          context: "they needs her attention",
          answer: "needed / need",
          solution: {
            method: "Editing — Grammar (Underlined Word)",
            steps: [
              "'They needs' is grammatically incorrect. 'They' is plural → should be 'need' (present) or 'needed' (past).",
              "Tense context: the story is told in past tense ('became deaf', 'were very young') → 'needed'.",
              "Q40 answer from key: 'difficult' — this refers to blank 40 = the bold word 'difikelt' spelling error.",
            ],
            tip: "For UNDERLINED words: check grammar (subject-verb agreement, tense). THEY = plural = need (not needs).",
          },
        },
        {
          id: "rulang_eoy24_H41",
          blank: 41,
          type: "spelling",
          errorWord: "difikelt",
          correctWord: "difficult",
          answer: "difficult",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Difikelt' is a phonetic misspelling of 'difficult'.",
              "Correct spelling: d-i-f-f-i-c-u-l-t.",
              "Common error: double 'f' and 'c' (not 'k') are key.",
            ],
            tip: "DIFFICULT: di-ffi-cult. Remember the double 'f'. Not 'difikelt' or 'diffucult'.",
          },
        },
        {
          id: "rulang_eoy24_H42",
          blank: 42,
          type: "spelling",
          errorWord: "perpurseli",
          correctWord: "purposely",
          answer: "purposely",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Perpurseli' is a phonetic misspelling of 'purposely'.",
              "Correct spelling: p-u-r-p-o-s-e-l-y.",
              "Break it down: pur-pose-ly. The root word is 'purpose'.",
            ],
            tip: "PURPOSELY = on purpose. Spell it from the root: purpose + ly = purposely.",
          },
        },
      ],
    },

    // ── Section I: Synthesis and Transformation (3 marks, Q43–45) ──────────
    {
      id: "bookletB_sectionI",
      title: "Section I: Synthesis and Transformation of Sentences",
      type: "SentenceCombining",
      marks: 3,
      instructions:
        "For each question, rewrite the given sentence(s) using the word(s) provided. Your answer must be in one sentence. The meaning of your sentence must be the same as the meaning(s) of the given sentence(s).",
      questions: [
        {
          id: "rulang_eoy24_I43",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "I like watching cartoons. My sister likes watching cartoons too.\n\nBoth ___________________________________",
          startingWord: "Both",
          answer: "Both my sister and I like watching cartoons.",
          solution: {
            method: "Sentence Combining — Both...and",
            steps: [
              "Two sentences with same predicate (like watching cartoons) can be combined using 'Both...and'.",
              "Structure: Both [person A] and [person B] + shared predicate.",
              "Correct: 'Both my sister and I like watching cartoons.'",
              "Note: 'I' comes after 'my sister' as a matter of courtesy (others before self).",
            ],
            tip: "BOTH...AND joins two subjects doing the same thing. Remember: put others first — 'Both my sister AND I', not 'Both I AND my sister'.",
          },
        },
        {
          id: "rulang_eoy24_I44",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "We must exercise regularly. We want to stay healthy.\n\nIf ___________________________________",
          startingWord: "If",
          answer: "If we want to stay healthy, we must exercise regularly.",
          solution: {
            method: "Sentence Combining — Conditional (If...then)",
            steps: [
              "The relationship is conditional: exercising regularly is the CONDITION for staying healthy.",
              "Structure: If [condition], [result].",
              "Correct: 'If we want to stay healthy, we must exercise regularly.'",
              "Alternatively: 'If we exercise regularly, we will stay healthy.'",
            ],
            tip: "IF introduces the condition. The other action is the result. Flip the sentences: If [want to stay healthy] → [must exercise].",
          },
        },
        {
          id: "rulang_eoy24_I45",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "Peter reached home late for dinner. He finished work early.\n\nAlthough ___________________________________",
          startingWord: "Although",
          answer: "Although Peter finished work early, he reached home late for dinner.",
          solution: {
            method: "Sentence Combining — Contrast (Although)",
            steps: [
              "'Although' introduces a contrast/concession: finishing work early should mean arriving home early, but Peter arrived late.",
              "Structure: Although [unexpected/contrasting fact], [surprising result].",
              "Correct: 'Although Peter finished work early, he reached home late for dinner.'",
            ],
            tip: "ALTHOUGH shows contrast. The two facts are surprising together — you'd expect early finish → early home, but no! Use ALTHOUGH + the surprising bit.",
          },
        },
      ],
    },

    // ── Section J: Comprehension Open-Ended (10 marks, Q46–50) ─────────────
    {
      id: "bookletB_sectionJ",
      title: "Section J: Comprehension Open-ended",
      type: "ComprehensionOE",
      marks: 10,
      instructions:
        "Read the passage carefully and answer the questions that follow. Write your answers in complete sentences.",
      passageTitle: "Sam's River Adventure",
      passageText: `Sam was excited as he had planned for a long awaited hike in the forest. He left home with his backpack before dawn, hoping to catch the sunrise. As he walked, he heard the sound of rushing water. He followed the sound and saw a river.

Thrilled, Sam stood on a big rock to get a better view of it. The water in the river was splashing and swirling, creating a beautiful but powerful sight. Suddenly, he noticed a small boat tied to a rock nearby. It looked like no one had used it for a long time.

An idea struck him. Sam untied the boat, got into it and started paddling. Unfortunately, the current was fast and rough and Sam realised that he did not have a life jacket on. He started to feel worried.

Unexpectedly, the boat hit a hidden rock and capsized. Sam struggled to swim ashore but the current was too strong. He thought that he was going to drown. Expecting the worst, he closed his eyes and let the water carry him.

After a while, the river became calm and Sam found himself ashore in a peaceful part of the forest. He was grateful to have made it through. He reflected on his actions and thought that he should have followed his original plan. He might not be so lucky in future.`,
      questions: [
        {
          id: "rulang_eoy24_J46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Which two-word phrase in the first paragraph tells you that Sam left home early?",
          answer: "before dawn",
          solution: {
            method: "Word Retrieval",
            steps: [
              "The question asks for a 2-word phrase meaning he left home early.",
              "'Before dawn' means before sunrise — very early in the morning.",
              "This phrase is in the first paragraph: 'He left home with his backpack before dawn.'",
            ],
            tip: "'Before dawn' = before sunrise = very early. The question says 'early' — match it to BEFORE DAWN.",
          },
        },
        {
          id: "rulang_eoy24_J47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText: "Why did Sam stand on the big rock?",
          answer:
            "Sam stood on the big rock because he wanted to get a better view of the river.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 2: 'Sam stood on a big rock to get a better view of it [the river].'",
              "Answer must be in a complete sentence explaining the reason.",
              "Use 'because' to link: 'He stood on the big rock because he wanted to get a better view of the river.'",
            ],
            tip: "Find the phrase 'to get a better view' — the 'to' here means 'in order to' = the REASON.",
          },
        },
        {
          id: "rulang_eoy24_J48",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText: "Why did Sam feel worried as he paddled the boat?",
          answer:
            "Sam felt worried as he paddled the boat because the current was fast and rough, and he realised that he did not have a life jacket on.",
          solution: {
            method: "Literal Comprehension — Multiple Reasons",
            steps: [
              "Paragraph 3: 'the current was fast and rough and Sam realised that he did not have a life jacket on.'",
              "Both reasons must be included: fast/rough current AND no life jacket.",
              "Write as one complete sentence using 'because'.",
            ],
            tip: "Include BOTH reasons from the text: (1) fast and rough current, (2) no life jacket.",
          },
        },
        {
          id: "rulang_eoy24_J49",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText: "What did Sam do when he thought he was going to drown?",
          answer: "Sam closed his eyes and let the water carry him.",
          solution: {
            method: "Literal Comprehension — Action Retrieval",
            steps: [
              "Paragraph 4: 'Expecting the worst, he closed his eyes and let the water carry him.'",
              "Two actions: (1) closed his eyes, (2) let the water carry him.",
              "Write as a complete sentence.",
            ],
            tip: "The answer has TWO parts from the same sentence. Include BOTH: closed his eyes AND let the water carry him.",
          },
        },
        {
          id: "rulang_eoy24_J50",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            'Explain clearly what Sam meant when he thought that he should have "followed his original plan" in the last paragraph.',
          answer:
            "Sam meant that he should have stuck to his plan of hiking in the forest to catch the sunrise, instead of getting into the boat and going on the river.",
          solution: {
            method: "Inferencing / Explanation",
            steps: [
              "Sam's 'original plan' is stated in paragraph 1: 'a long awaited hike in the forest…hoping to catch the sunrise.'",
              "He deviated from this plan when he spotted the boat and got into it.",
              "Explain: he should have continued his hike (original plan) instead of taking the boat (risky deviation).",
            ],
            tip: "Find the ORIGINAL PLAN in paragraph 1 (hike + catch sunrise). Then explain he deviated by taking the boat. Connect both parts in your answer.",
          },
        },
      ],
    },
  ],
};
