// ============================================================
// PEI HWA PRESBYTERIAN PRIMARY SCHOOL
// SEMESTRAL ASSESSMENT (SA2 / EOY) 2023
// PRIMARY 3 — ENGLISH LANGUAGE PAPER 2
// Date: 23 October 2023 | Total: 50 marks | Time: 1h 15min
// Sections A–C (Q1–22, MCQ on OAS) + Sections D–G (Q23–48, written)
// ============================================================

import { QuestionSet } from "@/types/questions";

export const eoy_peihwa_p2_2025: QuestionSet = {
  id: "eoy_peihwa_p2_2025",
  school: "Pei Hwa Presbyterian Primary School",
  level: "P3",
  subject: "English",
  year: 2023,
  exam: "EOY",
  paper: 2,
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // SECTION A: VOCABULARY MCQ (7 marks, Q1–7)
    // ─────────────────────────────────────────────
    {
      id: "sec_a",
      name: "Section A: Vocabulary MCQ",
      topic: "VocabMCQ",
      marks: 7,
      questions: [
        {
          id: "peihwa_eoy23_q1",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Peter found a __________ of keys in his drawer.",
          options: ["bunch", "block", "batch", "bouquet"],
          answer: 1,
          solution: {
            method: "Collective noun",
            steps: [
              "A 'bunch' is the correct collective noun used for a group of keys.",
              "'Bouquet' is for flowers, 'batch' refers to items produced together, 'block' does not collocate with keys.",
            ],
            tip: "Learn common collective nouns: a bunch of keys/grapes, a bouquet of flowers, a batch of cookies.",
          },
        },
        {
          id: "peihwa_eoy23_q2",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The nurse who is as __________ as a lamb takes good care of my sick grandfather.",
          options: ["warm", "timid", "gentle", "quiet"],
          answer: 3,
          solution: {
            method: "Simile / Idiom",
            steps: [
              "'As gentle as a lamb' is a common English simile describing someone who is mild-mannered and soft.",
              "'Gentle' matches the character of a lamb. The nurse takes 'good care' — reinforcing gentleness.",
            ],
            tip: "Memorise animal similes: as gentle as a lamb, as brave as a lion, as busy as a bee.",
          },
        },
        {
          id: "peihwa_eoy23_q3",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The students waited __________ for the results of the Talent Show to be announced.",
          options: ["warily", "eagerly", "recklessly", "hurriedly"],
          answer: 2,
          solution: {
            method: "Context / Adverb meaning",
            steps: [
              "'Eagerly' means with great enthusiasm and impatience — fitting for students waiting excitedly for results.",
              "'Warily' = cautiously, 'recklessly' = carelessly, 'hurriedly' = in a rush — none suit the context of waiting.",
            ],
            tip: "If someone is waiting for good news, they wait 'eagerly' (excited) or 'anxiously' (worried), not 'hurriedly'.",
          },
        },
        {
          id: "peihwa_eoy23_q4",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Venus Fly Trap is a/an __________ plant as it feeds on the insects that are trapped in it.",
          options: ["endangered", "extinct", "carnivorous", "developed"],
          answer: 3,
          solution: {
            method: "Word meaning in context",
            steps: [
              "'Carnivorous' means meat-eating. Since the Venus Fly Trap feeds on insects (animals), it is a carnivorous plant.",
              "'Endangered' = at risk of dying out, 'extinct' = no longer exists, 'developed' = fully grown — none describe diet.",
            ],
            tip: "Carnivore = meat-eater, herbivore = plant-eater, omnivore = both. Venus Fly Trap is the most famous carnivorous plant.",
          },
        },
        {
          id: "peihwa_eoy23_q5",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Tim could not sleep well as the __________ of the frogs from a pond nearby kept him up all night.",
          options: ["crowing", "cooing", "crooning", "croaking"],
          answer: 4,
          solution: {
            method: "Animal sounds vocabulary",
            steps: [
              "'Croaking' is the sound frogs make.",
              "'Crowing' = rooster, 'cooing' = dove/pigeon, 'crooning' = soft humming/singing by humans.",
            ],
            tip: "Animal sound vocabulary: frogs croak, roosters crow, doves coo, lions roar, dogs bark, cats meow.",
          },
        },
        {
          id: "peihwa_eoy23_q6",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Mary __________ in delight when she won the first prize in the Spelling Contest.",
          options: ["shivered", "stomped", "squealed", "squawked"],
          answer: 3,
          solution: {
            method: "Verb meaning in context",
            steps: [
              "'Squealed in delight' means to make a high-pitched cry of joy — perfectly matching winning a prize.",
              "'Shivered' = trembled from cold/fear, 'stomped' = heavy footsteps (anger), 'squawked' = harsh bird-like cry.",
            ],
            tip: "Squealing in delight is a natural emotional response to exciting news. Pair emotions with actions: squeal (joy), stomp (anger), shiver (cold/fear).",
          },
        },
        {
          id: "peihwa_eoy23_q7",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The burglars __________ the house while the family was away on holiday.",
          options: ["broke up", "broke in", "broke out", "broke into"],
          answer: 4,
          solution: {
            method: "Phrasal verb",
            steps: [
              "'Broke into' means to enter a building by force — the standard phrasal verb for burglary.",
              "'Break in' can work but needs 'to' when followed by a place noun: broke into [the house].",
              "'Broke up' = ended a relationship/broke apart, 'broke out' = escaped or started suddenly.",
            ],
            tip: "'Break into' + place = enter by force. 'Break in' (no object) also means to enter illegally but cannot be directly followed by a noun.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B: GRAMMAR MCQ (10 marks, Q8–17)
    // ─────────────────────────────────────────────
    {
      id: "sec_b",
      name: "Section B: Grammar MCQ",
      topic: "GrammarMCQ",
      marks: 10,
      questions: [
        {
          id: "peihwa_eoy23_q8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"__________ do I get to the museum?" asked the tourist.',
          options: ["What", "Who", "Where", "How"],
          answer: 3,
          solution: {
            method: "WH-question words",
            steps: [
              "The tourist is asking about directions — the location/path to the museum.",
              "'Where' asks about place/direction. 'How' asks about method. 'What' and 'Who' do not fit.",
              "Since the question is about getting TO a place, 'Where' (direction) is correct.",
            ],
            tip: "Where = place/direction; How = method/manner; What = thing; Who = person.",
          },
        },
        {
          id: "peihwa_eoy23_q9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "My mother __________ me a birthday cake last night.",
          options: ["bake", "is baking", "baked", "are baking"],
          answer: 3,
          solution: {
            method: "Simple past tense",
            steps: [
              "The time clue is 'last night' — a completed action in the past.",
              "Simple past tense of 'bake' is 'baked'.",
              "'Is baking' / 'are baking' = present continuous; 'bake' = base form (wrong tense).",
            ],
            tip: "Time clues for past tense: yesterday, last night/week/year, ago, in [past year].",
          },
        },
        {
          id: "peihwa_eoy23_q10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Please pass __________ sandwiches in this box to the workers seated over there," Mother told Kim.',
          options: ["this", "that", "these", "those"],
          answer: 4,
          solution: {
            method: "Demonstrative pronouns – near vs far, singular vs plural",
            steps: [
              "'Sandwiches' is plural. Eliminate 'this' (singular-near) and 'that' (singular-far).",
              "The workers are 'over there' — far away. The sandwiches are presumably near the speaker, passed to those far workers.",
              "'Those' = plural + far. 'These' = plural + near. Since we're pointing to workers 'over there', 'those' refers correctly.",
            ],
            tip: "This/These = near; That/Those = far. This/That = singular; These/Those = plural.",
          },
        },
        {
          id: "peihwa_eoy23_q11",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question: "Singapore __________ once a fishing village.",
          options: ["is", "was", "are", "were"],
          answer: 2,
          solution: {
            method: "Past tense – singular subject",
            steps: [
              "'Once' signals a past state that is no longer true.",
              "Singapore is a singular proper noun → 'was' (singular past form of 'to be').",
              "'Were' is plural past; 'is/are' are present tense.",
            ],
            tip: "Historical facts about how things used to be → simple past tense. Singapore was once a fishing village (but is no longer one).",
          },
        },
        {
          id: "peihwa_eoy23_q12",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "A monkey climbed __________ the window and stole some food from Mr Lim's house.",
          options: ["at", "in", "along", "through"],
          answer: 4,
          solution: {
            method: "Preposition of movement",
            steps: [
              "'Through' describes movement from one side to the other of an opening — a monkey passing through a window fits perfectly.",
              "'At' = location/direction towards, 'in' = inside, 'along' = beside/parallel to.",
            ],
            tip: "Through = entering from one side and exiting the other (window, door, tunnel). Into = entering but not necessarily exiting.",
          },
        },
        {
          id: "peihwa_eoy23_q13",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "We need to eat a balanced diet to keep __________ healthy.",
          options: ["myself", "themselves", "ourselves", "yourselves"],
          answer: 3,
          solution: {
            method: "Reflexive pronouns",
            steps: [
              "The subject is 'We' (first person plural). The reflexive pronoun must match → 'ourselves'.",
              "'Myself' = I, 'themselves' = they, 'yourselves' = you (plural).",
            ],
            tip: "Reflexive pronouns must agree with the subject: I→myself, we→ourselves, they→themselves, you (pl.)→yourselves.",
          },
        },
        {
          id: "peihwa_eoy23_q14",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "__________ Mark has eaten some snacks earlier, he still feels hungry.",
          options: ["If", "Since", "As", "Although"],
          answer: 4,
          solution: {
            method: "Conjunctions – contrast",
            steps: [
              "The sentence expresses a contrast: eating snacks (expected to reduce hunger) vs still being hungry.",
              "'Although' introduces a contrast/concession — fitting perfectly.",
              "'If' = condition, 'Since/As' = reason/cause — these don't convey contrast.",
            ],
            tip: "Contrast conjunctions: although, even though, despite, however. Use 'although' at the start of a clause with a verb.",
          },
        },
        {
          id: "peihwa_eoy23_q15",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "There are __________ children in this group than the other group.",
          options: ["many", "much", "fewer", "lesser"],
          answer: 3,
          solution: {
            method: "Comparative quantifiers – count vs non-count",
            steps: [
              "'Children' is a countable noun. For comparatives with countable nouns, use 'fewer'.",
              "'Less/lesser' is for uncountable nouns (less water, less time).",
              "'Many' and 'much' are not comparative forms in this context.",
            ],
            tip: "Fewer = less of something countable (fewer students, fewer books). Less = less of something uncountable (less water, less noise).",
          },
        },
        {
          id: "peihwa_eoy23_q16",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "I __________ be at the train station by 8 a.m. if I do not want to miss the train.",
          options: ["will", "may", "must", "might"],
          answer: 3,
          solution: {
            method: "Modal verbs – obligation/necessity",
            steps: [
              "The sentence expresses a necessity/obligation — something that has to be done to avoid missing the train.",
              "'Must' expresses strong obligation or necessity.",
              "'Will' = future certainty, 'may/might' = possibility — these don't convey the necessity required here.",
            ],
            tip: "Must = strong necessity/obligation. Have to = external obligation. May/might = possibility. Will = future intention/certainty.",
          },
        },
        {
          id: "peihwa_eoy23_q17",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Muthu, as well as his cousins, __________ to New Zealand next month.",
          options: ["travel", "is travelling", "travels", "are travelling"],
          answer: 2,
          solution: {
            method: "Subject-verb agreement + tense",
            steps: [
              "The subject is 'Muthu' — 'as well as his cousins' is a parenthetical phrase, so the verb agrees with 'Muthu' (singular).",
              "The time clue 'next month' indicates a planned future action → present continuous for future plans.",
              "'Is travelling' = singular subject + present continuous for future plan. Correct.",
              "'Are travelling' is plural — incorrect since the main subject is singular 'Muthu'.",
            ],
            tip: "'X, as well as Y' takes singular verb agreeing with X. Compare: 'X and Y are' (plural subject).",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C: VISUAL TEXT COMPREHENSION (5 marks, Q18–22)
    // ─────────────────────────────────────────────
    {
      id: "sec_c",
      name: "Section C: Visual Text Comprehension",
      topic: "VisualText",
      marks: 5,
      passageTitle: "Save the Sea Campaign",
      passageText: `SAVE THE SEA CAMPAIGN organised by the Marine Champions

Marine Champions: Our mission is to save the sea and create awareness on marine pollution. We recycle rubbish collected from the ocean into useful products. 20% of our profits are donated to organisations that support our mission.

Volunteer with Marine Champions!
Beach clean-up on every first Sunday of each month at the following venues:
- North Coast Beach
- South Coast Beach
- Waterfront Beach
Cleaning tools and trash bags will be provided. Do your part to protect and preserve marine life!

Did you know?
• About 5 trillion tons of rubbish are dumped into the sea every year.
• Overfishing also directly contributes to plastic pollution in our seas.
• Plastic is a major contributor to marine pollution.

Items for sale from our website:
- Frisbee (Made from recycled plastic bags)
- Yoga Mat (Made from recycled materials)
- T-shirt (Made from recycled plastic bottles)
- Toothbrush (Made from recycled yogurt cups)

Register to be a volunteer today! Looking for volunteers from ages 10 to 50 years old. Team participation is encouraged!
Sign up to be a Marine Champions volunteer at www.savetheseacampaign.com and get a Marine Champions Volunteer t-shirt for free!`,

      questions: [
        {
          id: "peihwa_eoy23_q18",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "The main aim of this poster is to __________.",
          options: [
            "promote recycled products",
            "ask people to work in teams",
            "share the causes of marine pollution",
            "encourage people to sign up as Marine Champions volunteers",
          ],
          answer: 4,
          solution: {
            method: "Identify main purpose of a visual text",
            steps: [
              "The poster repeatedly calls people to volunteer and sign up. The sign-up link, free t-shirt, and age eligibility all point to recruiting volunteers.",
              "While recycled products are mentioned, that is secondary. The primary call-to-action is volunteering.",
            ],
            tip: "Main aim = the primary purpose / call-to-action. Look at the most prominent and repeated message in the poster.",
          },
        },
        {
          id: "peihwa_eoy23_q19",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "The organiser for the Save the Sea Campaign is __________.",
          options: [
            "Waterfront Beach",
            "Marine Champions",
            "North Coast Beach",
            "South Coast Beach",
          ],
          answer: 2,
          solution: {
            method: "Locate specific information",
            steps: [
              "The poster clearly states 'organised by the Marine Champions' in the header.",
              "The beaches are venues for clean-up activities, not organisers.",
            ],
            tip: "For fact-finding questions, scan the passage for keywords. 'Organised by' = organiser.",
          },
        },
        {
          id: "peihwa_eoy23_q20",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question:
            "Sarah can participate and be a volunteer for the beach clean-up __________.",
          options: ["daily", "weekly", "monthly", "fortnightly"],
          answer: 3,
          solution: {
            method: "Locate frequency information",
            steps: [
              "The poster states: 'Beach clean-up on every first Sunday of each month' — that is once a month = monthly.",
            ],
            tip: "Daily = every day, weekly = once a week, monthly = once a month, fortnightly = once every two weeks.",
          },
        },
        {
          id: "peihwa_eoy23_q21",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question:
            "Which of the following products cannot be purchased from the website?",
          options: [
            "frisbee",
            "yoga mat",
            "toothbrush",
            "Marine Champions volunteer t-shirt",
          ],
          answer: 4,
          solution: {
            method: "Distinguish between what can be bought vs what is free",
            steps: [
              "The Marine Champions volunteer t-shirt is given FREE when you sign up to volunteer — it is not for sale on the website.",
              "Frisbee, yoga mat, and toothbrush are listed under 'Items for sale from our website'.",
            ],
            tip: "Read carefully: 'free gift' ≠ 'for sale'. The volunteer t-shirt is a registration gift, not a product for purchase.",
          },
        },
        {
          id: "peihwa_eoy23_q22",
          type: "A",
          topic: "VisualText",
          marks: 1,
          question: "Which of the following statements is false?",
          options: [
            "Volunteers must sign up as a team.",
            "Marine Champions sell products from recycled materials.",
            "Marine Champions donate 20% of their profits to some organisations.",
            "Cleaning tools and trash bags will be provided for the beach clean-up.",
          ],
          answer: 1,
          solution: {
            method: "True/False – identify the false statement",
            steps: [
              "Statement 1: 'Volunteers must sign up as a team.' — FALSE. The poster says 'Team participation is encouraged' but does not say volunteers MUST sign up as a team. Individuals can sign up too.",
              "Statement 2: TRUE — items are made from recycled materials and sold.",
              "Statement 3: TRUE — '20% of our profits are donated to organisations'.",
              "Statement 4: TRUE — 'Cleaning tools and trash bags will be provided'.",
            ],
            tip: "Watch for words like 'must', 'always', 'never' — these create absolute statements that are often false. 'Encouraged' ≠ 'must'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D: VOCABULARY CLOZE (8 marks, Q23–30)
    // ─────────────────────────────────────────────
    {
      id: "sec_d",
      name: "Section D: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 8,
      questions: [
        // Passage 1 (Q23–26): Chameleons — word bank: live, prey, unique, camouflage, ability, predators
        {
          id: "peihwa_eoy23_q23_26",
          type: "B",
          topic: "VocabCloze",
          marks: 4,
          passageTitle: "Chameleons (Passage 1)",
          wordBank: [
            "(A) live",
            "(B) prey",
            "(C) unique",
            "(D) camouflage",
            "(E) ability",
            "(F) predators",
          ],
          passageText:
            "Do you know what a chameleon is? It is a (23) __________ type of lizard that is different from other lizards. It has the (24) __________ to change its colour similar to its surroundings. For example, when a chameleon is on a tree's branch, it could turn brown. It can blend in with the surroundings to (25) __________ itself so that it can hide from danger, especially from its (26) __________ that will eat them. Chameleons use their tongues to capture insects for them to feed on.",
          blanks: [
            {
              number: 23,
              answer: "C",
              word: "unique",
              solution: {
                method: "Context: the sentence says chameleons are 'different from other lizards'",
                steps: [
                  "'Unique' means one-of-a-kind or unlike others — matches 'different from other lizards'.",
                ],
                tip: "Unique = unlike anything else. If something stands apart, it is unique.",
              },
            },
            {
              number: 24,
              answer: "E",
              word: "ability",
              solution: {
                method: "Grammatical structure: 'has the __ to change'",
                steps: [
                  "'Has the ability to' is a fixed phrase meaning 'can do something'.",
                  "'Ability' = skill/capacity. Fits 'has the ability to change colour'.",
                ],
                tip: "'Has the ability to [verb]' = can [verb]. Learn this fixed phrase.",
              },
            },
            {
              number: 25,
              answer: "D",
              word: "camouflage",
              solution: {
                method: "Context: blend in with surroundings",
                steps: [
                  "To 'camouflage' oneself means to disguise using colours/patterns matching the environment.",
                  "Clue: 'blend in with the surroundings' directly describes camouflage.",
                ],
                tip: "Camouflage = blend in / disguise by matching surroundings.",
              },
            },
            {
              number: 26,
              answer: "F",
              word: "predators",
              solution: {
                method: "Context: animals that 'will eat them'",
                steps: [
                  "'Predators' are animals that hunt and eat other animals (prey).",
                  "Clue: 'that will eat them' — these are predators.",
                  "'Prey' (option B) is what is hunted, not the hunter.",
                ],
                tip: "Predator = the hunter; Prey = the hunted. Remember: lions are predators, deer are their prey.",
              },
            },
          ],
        },

        // Passage 2 (Q27–30): Jim and Joe at bus stop — fill in blank with suitable word
        {
          id: "peihwa_eoy23_q27_30",
          type: "B",
          topic: "VocabCloze",
          marks: 4,
          passageTitle: "Jim and Joe (Passage 2)",
          instruction: "Fill in each blank with a suitable word.",
          passageText:
            "After school, Jim and Joe were waiting for the bus at the bus stop. When the bus arrived, they (27) __________ it quickly. The bus was (28) __________ and there were no available seats. Both Jim and Joe had to stand throughout their journey. They grabbed onto the bus grab pole and tried to balance (29) __________ while carrying their heavy bags. After some time, they finally reached their (30) __________, the library. They needed to borrow a few books for their Science project. They looked forward to working together on this project.",
          blanks: [
            {
              number: 27,
              answer: "boarded",
              solution: {
                method: "Vocabulary: action of getting on a bus",
                steps: [
                  "'Boarded' means to get onto a vehicle (bus, train, plane).",
                  "Clue: 'the bus arrived' then they got on it quickly.",
                ],
                tip: "'Board' a bus/train/plane = get on. 'Alight' = get off.",
              },
            },
            {
              number: 28,
              answer: "crowded",
              solution: {
                method: "Context: no available seats",
                steps: [
                  "If there were no available seats, the bus was very full = 'crowded'.",
                ],
                tip: "Crowded = filled with many people. Packed is also acceptable.",
              },
            },
            {
              number: 29,
              answer: "themselves",
              solution: {
                method: "Reflexive pronoun matching 'they'",
                steps: [
                  "'They tried to balance themselves' — reflexive pronoun for 'they' is 'themselves'.",
                ],
                tip: "Subject 'they' → reflexive 'themselves'. They balanced themselves (not someone else).",
              },
            },
            {
              number: 30,
              answer: "destination",
              solution: {
                method: "Context: place they were travelling to",
                steps: [
                  "'Destination' = the place you are travelling/going to.",
                  "Clue: they 'finally reached' the place — it is confirmed to be 'the library'.",
                ],
                tip: "Destination = the place you are going to / the end point of a journey.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E: GRAMMAR CLOZE (8 marks, Q31–38)
    // ─────────────────────────────────────────────
    {
      id: "sec_e",
      name: "Section E: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 8,
      questions: [
        // Passage 1 (Q31–34): Mdm Siti's plants — word bank: by, on, into, with, beside, along
        {
          id: "peihwa_eoy23_q31_34",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Mdm Siti's Plants (Passage 1)",
          wordBank: [
            "(A) by",
            "(B) on",
            "(C) into",
            "(D) with",
            "(E) beside",
            "(F) along",
          ],
          passageText:
            "Mdm Siti loves plants. She has rows of potted plants (31) __________ the corridor outside her house. She takes good care of her plants and waters them daily. When the plants grow bigger, she puts them (32) __________ larger pots. Her daughter, Lina, visits her (33) __________ Sundays and they would spend time taking care of the plants together. Mdm Siti would also share her knowledge on plants (34) __________ her neighbours when they walk past and admire them. She is proud of her beautiful plants.",
          blanks: [
            {
              number: 31,
              answer: "F",
              word: "along",
              solution: {
                method: "Preposition: rows extending through a space",
                steps: [
                  "'Along the corridor' means extending from one end to the other of the corridor.",
                  "'Along' = in a line beside something extended.",
                ],
                tip: "'Along' is used for things positioned in a line alongside something long (corridor, road, river).",
              },
            },
            {
              number: 32,
              answer: "C",
              word: "into",
              solution: {
                method: "Preposition: movement/placement inside",
                steps: [
                  "'Puts them into larger pots' = transfers them inside bigger pots.",
                  "'Into' shows movement from outside to inside.",
                ],
                tip: "'Into' = movement inside. 'In' = location inside (already there).",
              },
            },
            {
              number: 33,
              answer: "B",
              word: "on",
              solution: {
                method: "Preposition of time: days of the week",
                steps: [
                  "'On Sundays' — we use 'on' with specific days of the week.",
                ],
                tip: "Prepositions of time: ON (days: on Monday, on Sundays), AT (times: at 3pm, at noon), IN (months/years/seasons: in July, in 2023).",
              },
            },
            {
              number: 34,
              answer: "D",
              word: "with",
              solution: {
                method: "Preposition: sharing with someone",
                steps: [
                  "'Share knowledge with her neighbours' — 'with' indicates the recipient of sharing.",
                ],
                tip: "Share [something] with [someone] = give/distribute to. 'With' is the standard preposition after 'share'.",
              },
            },
          ],
        },

        // Passage 2 (Q35–38): Aisha's Art — word bank: drew, draw, is drawing, has drawn, drawn, was drawing
        {
          id: "peihwa_eoy23_q35_38",
          type: "B",
          topic: "GrammarCloze",
          marks: 4,
          passageTitle: "Aisha's Art (Passage 2)",
          wordBank: [
            "(A) drew",
            "(B) draw",
            "(C) is drawing",
            "(D) has drawn",
            "(E) drawn",
            "(F) was drawing",
          ],
          passageText:
            "Aisha looks forward to her Art lessons every week. She likes to (35) __________ in her sketchbook. Last week, her Art teacher, Mrs Tan, took her class to the nearby park and they (36) __________ the scenery of the park. While she (37) __________, Aisha spotted a cute squirrel on a tree. Aisha plans to be an artist when she grows up. She can spend hours with her pencil and sketchbook and she (38) __________ many beautiful pieces of artwork. She hopes to achieve her dream and inspire others with her drawings.",
          blanks: [
            {
              number: 35,
              answer: "B",
              word: "draw",
              solution: {
                method: "Infinitive after 'likes to'",
                steps: [
                  "'Likes to draw' — after 'to', we use the base form (infinitive) of the verb.",
                ],
                tip: "'Like to + verb (base form)' e.g. likes to draw, likes to sing, likes to play.",
              },
            },
            {
              number: 36,
              answer: "A",
              word: "drew",
              solution: {
                method: "Simple past tense — completed action",
                steps: [
                  "Time clue: 'Last week' — past tense. The class drew the scenery (completed action).",
                  "Simple past of 'draw' = 'drew'.",
                ],
                tip: "Irregular past tenses: draw → drew. Other irregular verbs: write→wrote, sing→sang, run→ran.",
              },
            },
            {
              number: 37,
              answer: "F",
              word: "was drawing",
              solution: {
                method: "Past continuous — ongoing background action",
                steps: [
                  "'While she was drawing' — past continuous describes an action in progress in the past when another event happened (spotting the squirrel).",
                  "'While' + past continuous is a classic pairing.",
                ],
                tip: "While + past continuous = ongoing action interrupted by a simple past event. While she WAS DRAWING, she spotted a squirrel.",
              },
            },
            {
              number: 38,
              answer: "D",
              word: "has drawn",
              solution: {
                method: "Present perfect — achievement up to now",
                steps: [
                  "'Has drawn many beautiful pieces' — present perfect describes an achievement/result from the past with relevance to now.",
                  "No specific past time is given, so present perfect is used.",
                ],
                tip: "Present perfect = past action with present relevance. 'She has drawn many pieces' = the collection exists now.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F: SENTENCE COMBINING (4 marks, Q39–42)
    // ─────────────────────────────────────────────
    {
      id: "sec_f",
      name: "Section F: Connectors (Sentence Combining)",
      topic: "SentenceCombining",
      marks: 4,
      questions: [
        {
          id: "peihwa_eoy23_q39",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Raju likes to play football. Raju likes to play basketball too.' Using: and",
          answer: "Raju likes to play football and basketball.",
          solution: {
            method: "Combine with 'and' — shared subject and verb",
            steps: [
              "Both sentences share the same subject (Raju) and verb (likes to play).",
              "Remove the repeated subject and verb, join the two objects with 'and'.",
              "Result: 'Raju likes to play football and basketball.'",
            ],
            tip: "When two sentences share the same subject + verb, combine by listing the objects with 'and'.",
          },
        },
        {
          id: "peihwa_eoy23_q40",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Paul is going to watch the concert tonight. His sister is also going to watch the concert tonight.' Using: Both",
          answer:
            "Both Paul and his sister are going to watch the concert tonight.",
          solution: {
            method: "Both ... and ... (correlative conjunction)",
            steps: [
              "'Both X and Y' combines two subjects doing the same action.",
              "Start with 'Both Paul and his sister', then use plural verb 'are'.",
              "Result: 'Both Paul and his sister are going to watch the concert tonight.'",
            ],
            tip: "'Both A and B' always takes a plural verb. Both Paul and his sister ARE (not is) going.",
          },
        },
        {
          id: "peihwa_eoy23_q41",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Mother was cooking dinner. I was watching television.' Using: While",
          answer:
            "While Mother was cooking dinner, I was watching television.",
          solution: {
            method: "'While' — two simultaneous past continuous actions",
            steps: [
              "'While' shows two actions happening at the same time in the past.",
              "Start with 'While' + first action (past continuous), then add comma + second action.",
              "Result: 'While Mother was cooking dinner, I was watching television.'",
            ],
            tip: "While + past continuous, past continuous = two ongoing actions at the same time. Add a comma after the 'while' clause.",
          },
        },
        {
          id: "peihwa_eoy23_q42",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Combine: 'Lily was upset. She was scolded by her mother.' Using: for",
          answer: "Lily was upset for she was scolded by her mother.",
          solution: {
            method: "'For' — reason/cause (formal)",
            steps: [
              "'For' (as a conjunction) introduces a reason/cause — similar to 'because' but more formal.",
              "Result: 'Lily was upset for she was scolded by her mother.'",
            ],
            tip: "'For' as a conjunction = 'because' in formal English. It introduces a reason clause.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G: COMPREHENSION (8 marks, Q43–48)
    // ─────────────────────────────────────────────
    {
      id: "sec_g",
      name: "Section G: Comprehension",
      topic: "ComprehensionOE",
      marks: 8,
      passageTitle: "Sammy the Squirrel",
      passageText: `Once upon a time, in a small village nestled by a sparkling river, there lived a squirrel named Sammy. Sammy was not only shy and timid, but also had a troubled past. He had lost his family to a tragic accident and was now all alone in the world. Despite his hardships, Sammy always tried to stay positive and make the best of his situation.

One day, while Sammy was exploring the woods, he stumbled upon a hidden treasure map. The map showed a path leading to a giant acorn, said to be the most scrumptious acorn in the entire world. Sammy's eyes sparkled with excitement, but deep down, he knew that his journey would not be easy.

With the map in his tiny paws, Sammy embarked on an adventure. He hopped from branch to branch, through dense bushes, his heart pounding with fear and always looking out for predators. He faced challenges along the way, like crossing a wobbly log bridge, navigating treacherous waters and enduring a severe thunderstorm. However, his determination and resilience kept him going.

Finally, after much struggle and countless close calls, Sammy reached the spot marked with an 'X'. He dug frantically until he uncovered the gigantic acorn, bigger than his head! His tired body ached, but with a sense of relief, a glimmer of hope and triumph flickered in his eyes.

However, as Sammy held the giant acorn, he had a thought. He realised that he had been lonely since the loss of his family and this acorn could be more than just a delicious treat for himself. Maybe he could share this acorn with the other animals and bring joy and unity to the entire village. So, he carefully rolled it back home, all the while imagining the smiles on the other animals' faces.

Back in the village, Sammy invited all the animals for a grand feast. The animals gathered around as Sammy cracked the giant acorn into smaller pieces and shared it among the other animals. While enjoying the acorn, Sammy shared his challenging journey with them. The animals thanked him for his kindness and bravery. Through Sammy's adventure, the animals learnt the importance of sharing and resilience and they became his new-found family.`,

      questions: [
        {
          id: "peihwa_eoy23_q43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question: "Where did Sammy find the treasure map? (1m)",
          answer: "Sammy found the treasure map in the woods / while exploring the woods.",
          solution: {
            method: "Locate and rephrase from text",
            steps: [
              "Paragraph 2: 'while Sammy was exploring the woods, he stumbled upon a hidden treasure map'.",
              "Answer: He found it in the woods (while exploring).",
            ],
            tip: "For 'where' questions, identify the location word/phrase in the passage. Write in a complete sentence.",
          },
        },
        {
          id: "peihwa_eoy23_q44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in paragraph 3 has the same meaning as 'started'? (1m)",
          answer: "embarked",
          solution: {
            method: "Synonym hunt in specific paragraph",
            steps: [
              "Paragraph 3: 'Sammy embarked on an adventure'.",
              "'Embarked' = started/began (especially a journey or adventure).",
            ],
            tip: "'Embark on' = to begin a journey or undertaking. A classic synonym for 'start' in travel/adventure contexts.",
          },
        },
        {
          id: "peihwa_eoy23_q45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "How did Sammy feel when he found the giant acorn? Tick (✓) your responses. (You can choose more than one correct response) (1m)",
          options: ["relieved", "disappointed", "satisfied", "embarrassed"],
          answer: ["relieved", "satisfied"],
          solution: {
            method: "Infer emotions from passage evidence",
            steps: [
              "Paragraph 4: 'with a sense of relief' → relieved ✓",
              "Paragraph 4: 'a glimmer of hope and triumph flickered in his eyes' → satisfied/triumphant ✓",
              "'Disappointed' and 'embarrassed' are not supported by the text.",
            ],
            tip: "For emotion questions, find direct emotional words or actions in the passage. 'Sense of relief' = relieved; 'triumph' = satisfied.",
          },
        },
        {
          id: "peihwa_eoy23_q46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Why do you think Sammy decided to share the giant acorn with the other animals in the village? (2m)",
          answer:
            "Sammy decided to share the giant acorn because he had been lonely since the loss of his family and he realised that the acorn could bring joy and unity to the entire village. He wanted to use it to connect with others and find a new family.",
          solution: {
            method: "Inference + Text Evidence",
            steps: [
              "Paragraph 5: 'He realised that he had been lonely since the loss of his family'.",
              "He thought the acorn 'could bring joy and unity to the entire village'.",
              "Combine both: loneliness + desire for connection = reason for sharing.",
            ],
            tip: "For 'why do you think' questions, support your answer with evidence from the passage. Award 1m for each valid reason.",
          },
        },
        {
          id: "peihwa_eoy23_q47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 below to show what happened first, next and last. (1m)\n\n__ Sammy rolled back the giant acorn to share with the other animals.\n__ Sammy found a treasure map.\n__ Sammy invited all the other animals for a feast.",
          answer: "2, 1, 3",
          solution: {
            method: "Sequence of events",
            steps: [
              "1st: Sammy found a treasure map (paragraph 2).",
              "2nd: Sammy rolled back the giant acorn to share (paragraph 5).",
              "3rd: Sammy invited all the other animals for a feast (paragraph 6).",
            ],
            tip: "Track the story chronologically. Finding the map → finding the acorn → rolling it home → sharing at the feast.",
          },
        },
        {
          id: "peihwa_eoy23_q48",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "How would you describe Sammy at the end of his adventure? Why do you say so? (2m)",
          answer:
            "At the end of his adventure, Sammy was resilient and generous/kind. He was resilient because he did not give up despite the many challenges he faced on his journey. He was kind and generous because he chose to share the giant acorn with all the other animals in the village instead of keeping it for himself.",
          solution: {
            method: "Character description with textual evidence",
            steps: [
              "1m for character trait: resilient, determined, generous, kind, brave — any supported by evidence.",
              "1m for reason/evidence from text: endured challenges (paragraph 3), shared acorn (paragraph 6).",
            ],
            tip: "Always give TWO parts: (1) the character trait word, and (2) evidence/reason from the passage. This is worth 2 marks.",
          },
        },
      ],
    },
  ],
};
