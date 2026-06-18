// src/data/p3/english/papers/eoy_catholichigh_paper1_2025.ts
// Catholic High School (Primary) — Primary 3 English Language Practice Paper 1
// Sections: Grammar MCQ (A·8q), Vocabulary MCQ (B·6q),
//           Grammar Cloze pronoun (C·4q), Grammar Cloze bracket (D·4q),
//           Vocabulary Cloze (E·3q), Editing Spelling (F·5q),
//           Comprehension Cloze open (G·4q),
//           Comprehension Selected Response + OE (H·8m),
//           Comprehension Open-Ended (I·4×2m)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_catholichigh_paper1_2025",
  school: "Catholic High School (Primary)",
  level: "P3",
  subject: "English",
  paperType: "Practice Paper 1",
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
          id: "ch1_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: "My sister was hiding ____________ the door. No one noticed her.",
          options: [
            { label: "1", text: "with" },
            { label: "2", text: "under" },
            { label: "3", text: "behind" },
            { label: "4", text: "between" },
          ],
          answer: "3",
          solution: {
            method: "Preposition of place — concealment",
            steps: [
              "'Hiding behind the door' = concealing oneself on the other side of the door.",
              "'Behind' = at the back of / on the other side of.",
              "'No one noticed her' confirms she was hidden from view.",
              "'Under the door' is physically impossible for a person.",
              "'With the door' makes no sense in this context.",
            ],
            tip: "Hide BEHIND something = be on the other side, out of sight. Common hiding places: behind a tree, behind a door.",
          },
        },
        {
          id: "ch1_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "All the pupils and teachers ____________ to sing the national anthem every morning.",
          options: [
            { label: "1", text: "stand" },
            { label: "2", text: "stands" },
            { label: "3", text: "is standing" },
            { label: "4", text: "are standing" },
          ],
          answer: "1",
          solution: {
            method: "Simple present — plural subject + habitual action",
            steps: [
              "'Every morning' = habitual, routine action → simple present tense.",
              "Subject: 'All the pupils and teachers' = plural.",
              "Plural subject + simple present = base form (no -s): stand.",
              "'stands' is for singular third person (He/She/It).",
              "'is/are standing' = present continuous — for ongoing current actions, not habits.",
            ],
            tip: "Every morning = habit → simple present. Plural subject → base form: stand (not stands).",
          },
        },
        {
          id: "ch1_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: "Everyone ____________ quietly when the fire alarm went off.",
          options: [
            { label: "1", text: "read" },
            { label: "2", text: "reads" },
            { label: "3", text: "is reading" },
            { label: "4", text: "was reading" },
          ],
          answer: "4",
          solution: {
            method: "Past continuous — ongoing action interrupted",
            steps: [
              "'When the fire alarm went off' is in simple past — this interrupted another action.",
              "The interrupted ongoing action = 'was reading'.",
              "Pattern: [past continuous] when [simple past interrupted it].",
              "'read' (simple past) would suggest reading was completed before the alarm — not the right nuance.",
              "'Everyone' = singular → was (not were).",
            ],
            tip: "Everyone WAS reading (past continuous) WHEN the fire alarm went off (simple past interruption).",
          },
        },
        {
          id: "ch1_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "Meera does not like to swim ____________ she enjoys cycling.",
          options: [
            { label: "1", text: "or" },
            { label: "2", text: "so" },
            { label: "3", text: "but" },
            { label: "4", text: "and" },
          ],
          answer: "3",
          solution: {
            method: "Conjunctions — contrast",
            steps: [
              "Two contrasting ideas: doesn't like swimming / enjoys cycling.",
              "'But' introduces contrast between two opposing ideas.",
              "'And' would add a similar idea — not contrast.",
              "'So' = result — doesn't fit.",
              "'Or' = alternative — wrong in this context.",
            ],
            tip: "Doesn't like X BUT enjoys Y = contrast. 'But' is the correct conjunction for contrast.",
          },
        },
        {
          id: "ch1_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: '"Do not go there! ____________ wild animals are very dangerous," warned the tour guide.',
          options: [
            { label: "1", text: "This" },
            { label: "2", text: "That" },
            { label: "3", text: "These" },
            { label: "4", text: "Those" },
          ],
          answer: "4",
          solution: {
            method: "Demonstrative adjectives — plural + far",
            steps: [
              "'Wild animals' = plural.",
              "The animals are 'there' = far from the speaker.",
              "Far + plural = 'Those'.",
              "'These' = near + plural — but the animals are far away ('there').",
            ],
            tip: "'Do not go there' — the animals are far (there) and plural → THOSE wild animals.",
          },
        },
        {
          id: "ch1_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: "____________ children like the 'Super Mario' movie. It is very popular among the kids.",
          options: [
            { label: "1", text: "Few" },
            { label: "2", text: "Little" },
            { label: "3", text: "Many" },
            { label: "4", text: "Much" },
          ],
          answer: "3",
          solution: {
            method: "Quantifiers — 'children' is countable plural",
            steps: [
              "'Children' = countable plural noun.",
              "The movie is 'very popular' → MANY children like it.",
              "'Many' = large number of countable nouns. ✓",
              "'Much' and 'Little' are for uncountable nouns.",
              "'Few' = not many — contradicts 'very popular'.",
            ],
            tip: "Very popular = many people like it. 'Many children' (countable plural). NOT 'much children'.",
          },
        },
        {
          id: "ch1_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: '"Please ensure you have taken ____________ with you before leaving the hall. Do not leave your belongings behind," reminded the Discipline Master.',
          options: [
            { label: "1", text: "nothing" },
            { label: "2", text: "anything" },
            { label: "3", text: "everything" },
            { label: "4", text: "something" },
          ],
          answer: "3",
          solution: {
            method: "Indefinite pronouns — 'everything' for completeness",
            steps: [
              "The Discipline Master wants students to take ALL their belongings.",
              "'Everything' = all things / every item.",
              "'Please ensure you have taken everything with you' = don't leave anything behind.",
              "Confirmed by 'Do not leave your belongings behind'.",
              "'Something' = a specific item — too vague.",
              "'Nothing' = zero things — opposite meaning.",
              "'Anything' needs negative context.",
            ],
            tip: "'Take everything with you' = take all your belongings, leave nothing behind. 'Everything' = all items.",
          },
        },
        {
          id: "ch1_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "The trains are always on time, ____________?",
          options: [
            { label: "1", text: "do they?" },
            { label: "2", text: "are they?" },
            { label: "3", text: "don't they?" },
            { label: "4", text: "aren't they?" },
          ],
          answer: "4",
          solution: {
            method: "Question tags — positive statement → negative tag",
            steps: [
              "Main clause: 'The trains ARE always on time' — positive, uses 'are'.",
              "Positive statement → negative question tag.",
              "Use same auxiliary: 'are' → 'aren't'.",
              "Subject: 'the trains' → 'they'.",
              "Tag: 'aren't they?' ✓",
            ],
            tip: "Question tag rule: Positive + 'are' → 'aren't they?'. Always use the same auxiliary in negative form.",
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
          id: "ch1_b_q9",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "My best friend, Thomas, broke ____________ tears when his favourite toy was damaged.",
          options: [
            { label: "1", text: "up" },
            { label: "2", text: "into" },
            { label: "3", text: "down" },
            { label: "4", text: "through" },
          ],
          answer: "2",
          solution: {
            method: "Phrasal verb — 'break into tears'",
            steps: [
              "'Break into tears' = suddenly start crying.",
              "This is a fixed phrasal expression for bursting into tears.",
              "'Break down' = stop functioning / lose emotional control (can mean cry, but 'break down' alone).",
              "'Break up' = end a relationship / break apart.",
              "'Break through' = force a way through / achieve despite obstacles.",
            ],
            tip: "'Break into tears' = suddenly start crying. Fixed expression. 'He broke into tears' = he started crying suddenly.",
          },
        },
        {
          id: "ch1_b_q10",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 10,
          marks: 1,
          stem: "Last night, my sister ____________ down the stairs to the kitchen quietly as she did not want to wake anyone up.",
          options: [
            { label: "1", text: "bolted" },
            { label: "2", text: "darted" },
            { label: "3", text: "scurried" },
            { label: "4", text: "sneaked" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — movement types: stealth vs speed",
            steps: [
              "Key context: 'did not want to wake anyone up' = she moved QUIETLY and SECRETLY.",
              "'Sneaked' = moved stealthily, trying not to be noticed or make noise.",
              "'Bolted' = ran away suddenly and fast (not quietly).",
              "'Darted' = moved very quickly like an arrow (implies speed, not stealth).",
              "'Scurried' = moved quickly with short steps (like a mouse/insect).",
            ],
            tip: "'Sneak' = move quietly and secretly to avoid detection. Perfect for not wanting to wake anyone.",
          },
        },
        {
          id: "ch1_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "____________ with anger, the restaurant manager scolded his staff who had broken the plates.",
          options: [
            { label: "1", text: "Wailing" },
            { label: "2", text: "Bellowing" },
            { label: "3", text: "Mumbling" },
            { label: "4", text: "Grumbling" },
          ],
          answer: "2",
          solution: {
            method: "Vocabulary — loud angry vocalisation",
            steps: [
              "The manager is angry and scolding — requires a loud, forceful vocal expression.",
              "'Bellowing' = shouting loudly with great force (like a bull).",
              "'Wailing' = crying out in grief/pain — not anger.",
              "'Mumbling' = speaking unclearly and quietly — wrong for scolding.",
              "'Grumbling' = complaining quietly — too mild for the described anger.",
            ],
            tip: "'Bellow' = shout loudly and forcefully (usually in anger). A bellowing manager is screaming with fury.",
          },
        },
        {
          id: "ch1_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "Naina saw a ____________ of birds when she went to the zoo with her family.",
          options: [
            { label: "1", text: "flock" },
            { label: "2", text: "pride" },
            { label: "3", text: "colony" },
            { label: "4", text: "school" },
          ],
          answer: "1",
          solution: {
            method: "Collective nouns for animals",
            steps: [
              "'Flock' = a group of birds (or sheep).",
              "'Pride' = a group of lions.",
              "'Colony' = a group of ants/bats/penguins.",
              "'School' = a group of fish.",
            ],
            tip: "Collective nouns: flock (birds/sheep), pride (lions), pack (wolves/dogs), school (fish), herd (cattle/elephants).",
          },
        },
        {
          id: "ch1_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "While waiting for the results, Yuze was ____________. He was confident he would do very well.",
          options: [
            { label: "1", text: "as cold as ice" },
            { label: "2", text: "as cunning as a fox" },
            { label: "3", text: "as stubborn as a mule" },
            { label: "4", text: "as cool as a cucumber" },
          ],
          answer: "4",
          solution: {
            method: "Simile — matching emotion to expression",
            steps: [
              "Yuze was CONFIDENT while waiting — he was calm and relaxed.",
              "'As cool as a cucumber' = very calm and relaxed despite pressure.",
              "'As cold as ice' = emotionally unfeeling/unfriendly.",
              "'As cunning as a fox' = very clever and crafty.",
              "'As stubborn as a mule' = very stubborn/determined.",
            ],
            tip: "'Cool as a cucumber' = calm, composed, unruffled under pressure. Perfect for someone confidently waiting for results.",
          },
        },
        {
          id: "ch1_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: '"I\'m afraid I have bad news for you," the doctor told my uncle ____________.',
          options: [
            { label: "1", text: "boldly" },
            { label: "2", text: "bravely" },
            { label: "3", text: "eagerly" },
            { label: "4", text: "solemnly" },
          ],
          answer: "4",
          solution: {
            method: "Adverb of manner — tone of delivering bad news",
            steps: [
              "The doctor is delivering BAD news — this requires a serious, grave manner.",
              "'Solemnly' = in a serious, formal, grave manner.",
              "'Boldly' = in a confident, daring way — not appropriate for bad news.",
              "'Bravely' = with courage — not typical for a doctor's manner.",
              "'Eagerly' = with enthusiasm — completely wrong for bad news.",
            ],
            tip: "'Solemnly' = very seriously and formally. Used for delivering important, grave news or during serious ceremonies.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — Grammar Cloze: Pronouns (4 × 1 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secC",
      name: "Section C: Grammar Cloze (Pronouns)",
      topic: "GrammarCloze",
      marks: 4,
      passage: {
        title: "Mabel's Missing Pencil",
        text: `Mabel was feeling upset as she had lost her precious pencil. (15) _______ was from her best friend. She and (16) _______ father searched high and low for it but could not find it. She was almost in tears. Just then, Larry, her brother, came to her room with her pencil. He had taken it to do (17) _______ homework. "Why did (18) _______ take my pencil without my permission?" cried Mabel. Larry apologised to her immediately.`,
        wordBank: [
          { letter: "A", word: "he" },
          { letter: "B", word: "her" },
          { letter: "C", word: "his" },
          { letter: "D", word: "it" },
          { letter: "E", word: "she" },
          { letter: "F", word: "you" },
        ],
      },
      questions: [
        {
          id: "ch1_c_q15",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 15,
          marks: 1,
          blankNumber: 15,
          stem: "(15) _______ was from her best friend. [referring to the pencil]",
          answer: "D",
          answerWord: "it",
          solution: {
            method: "Pronoun reference — third person singular neuter for pencil",
            steps: [
              "The previous sentence introduced 'her precious pencil'.",
              "A pencil is a thing (not a person) → third person singular neuter: 'it'.",
              "'It was from her best friend' = the pencil was a gift from her best friend.",
            ],
            tip: "'It' replaces a thing (pencil). 'It was from her best friend' = the pencil was her best friend's gift.",
          },
        },
        {
          id: "ch1_c_q16",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 16,
          marks: 1,
          blankNumber: 16,
          stem: "She and (16) _______ father searched high and low",
          answer: "B",
          answerWord: "her",
          solution: {
            method: "Possessive pronoun — 'her father'",
            steps: [
              "The father belongs to Mabel (she/her).",
              "Possessive: 'her father' = Mabel's father.",
              "'She and her father' = Mabel and Mabel's father.",
              "'his father' would mean someone else's father.",
            ],
            tip: "Possessive: 'her father' = Mabel's father. 'She and her father' is the natural phrase.",
          },
        },
        {
          id: "ch1_c_q17",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 17,
          marks: 1,
          blankNumber: 17,
          stem: "He had taken it to do (17) _______ homework.",
          answer: "C",
          answerWord: "his",
          solution: {
            method: "Possessive pronoun — Larry's homework",
            steps: [
              "Larry (he) took the pencil to do his OWN homework.",
              "'His homework' = Larry's homework.",
              "The subject is 'He' (Larry) → possessive = 'his'.",
              "'her homework' would be Mabel's homework — Larry was doing his own.",
            ],
            tip: "He → his (possessive). Larry took the pencil to do HIS homework.",
          },
        },
        {
          id: "ch1_c_q18",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 18,
          marks: 1,
          blankNumber: 18,
          stem: '"Why did (18) _______ take my pencil without my permission?" cried Mabel.',
          answer: "F",
          answerWord: "you",
          solution: {
            method: "Subject pronoun — Mabel addressing Larry",
            steps: [
              "Mabel is speaking DIRECTLY to Larry.",
              "When addressing someone directly = 'you'.",
              "'Why did you take my pencil?' = Mabel asking Larry directly.",
              "'he' = third person — used when talking about someone, not to them.",
            ],
            tip: "When speaking directly to a person, use 'you'. 'Why did YOU take my pencil?' (talking to Larry).",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — Grammar Cloze: Choose from brackets (4 × 1 m = 4 m)
    // ─────────────────────────────────────────────
    {
      id: "secD",
      name: "Section D: Grammar Cloze (Bracket choices)",
      topic: "GrammarCloze",
      marks: 4,
      passage: {
        title: "Cookies",
        text: `Who doesn't love cookies? The sweet snack (19) [is / are] a favourite among children and adults. It can be either chewy or crunchy. Usually, cookies (20) [contain / contains] a lot of fat and sugar. Bakers (21) [like / likes] to add chocolate chips or nuts to give more flavour to the cookies. This (22) [make / makes] the cookies even more delicious. Are you a cookie-lover? You can try making your very own cookies today.`,
      },
      questions: [
        {
          id: "ch1_d_q19",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 19,
          marks: 1,
          blankNumber: 19,
          stem: "The sweet snack (19) [is / are] a favourite",
          answer: "is",
          solution: {
            method: "Subject-verb agreement — singular 'snack'",
            steps: [
              "Subject: 'The sweet snack' = singular noun.",
              "Singular subject → 'is'.",
              "'are' is plural — wrong for singular 'snack'.",
            ],
            tip: "The sweet snack IS (singular). Snack = one item → 'is'.",
          },
        },
        {
          id: "ch1_d_q20",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 20,
          marks: 1,
          blankNumber: 20,
          stem: "cookies (20) [contain / contains] a lot of fat and sugar",
          answer: "contain",
          solution: {
            method: "Subject-verb agreement — plural 'cookies'",
            steps: [
              "Subject: 'cookies' = plural.",
              "Plural subject → base form (no -s): 'contain'.",
              "'contains' is for singular third person.",
            ],
            tip: "Cookies (plural) → CONTAIN (no -s). Plural nouns take the base verb form.",
          },
        },
        {
          id: "ch1_d_q21",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 21,
          marks: 1,
          blankNumber: 21,
          stem: "Bakers (21) [like / likes] to add chocolate chips",
          answer: "like",
          solution: {
            method: "Subject-verb agreement — plural 'bakers'",
            steps: [
              "Subject: 'Bakers' = plural.",
              "Plural subject → base form: 'like'.",
              "'likes' is for singular (The baker likes).",
            ],
            tip: "Bakers (plural) → LIKE (base form). Only singular third person gets the -s ending.",
          },
        },
        {
          id: "ch1_d_q22",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 22,
          marks: 1,
          blankNumber: 22,
          stem: "This (22) [make / makes] the cookies even more delicious.",
          answer: "makes",
          solution: {
            method: "Subject-verb agreement — singular 'this'",
            steps: [
              "Subject: 'This' = singular demonstrative pronoun.",
              "Singular → 'makes' (third person singular -s).",
              "'make' is for plural subjects or base form after auxiliaries.",
            ],
            tip: "This/That (singular) → MAKES. These/Those (plural) → MAKE.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — Vocabulary Cloze (3 × 1 m = 3 m)
    // ─────────────────────────────────────────────
    {
      id: "secE",
      name: "Section E: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 3,
      passage: {
        title: "Abu's Pancakes",
        text: `Abu only ate pancakes. He simply (23) _______ to eat anything else. Abu's mother thought, "He should eat (24) _______ food like fruits and vegetables too!" She had an idea. She added blended carrots into the pancake batter. Abu gobbled up everything. She added different (25) _______ to the pancakes daily. One day, Abu caught his mother adding blended spinach into his pancakes. "You added vegetables?" he gasped. Abu realised that vegetables were not as bad as he had thought.

(Adapted from https://www.storyberries.com)`,
        wordBank: ["avoided", "healthy", "ingredients", "mixtures", "refused", "special"],
      },
      questions: [
        {
          id: "ch1_e_q23",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "He simply (23) _______ to eat anything else.",
          answer: "refused",
          solution: {
            method: "Context — refusing to eat other food",
            steps: [
              "Abu ONLY ate pancakes — he would not eat anything else.",
              "'Refused' = declined to do something / would not do it.",
              "'He simply refused to eat anything else' = he would not eat anything other than pancakes.",
              "'avoided' = stayed away from — less direct than 'refused'.",
            ],
            tip: "'Refuse to do something' = completely decline/will not do it. Abu refused to eat anything else.",
          },
        },
        {
          id: "ch1_e_q24",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "He should eat (24) _______ food like fruits and vegetables too!",
          answer: "healthy",
          solution: {
            method: "Context — nutritious food",
            steps: [
              "Fruits and vegetables = healthy food.",
              "'Healthy food' = nutritious food good for the body.",
              "The mother wants Abu to eat fruits and vegetables — these are healthy foods.",
              "'Special food' doesn't describe fruits and vegetables specifically.",
            ],
            tip: "Fruits and vegetables = HEALTHY food. This is a common collocation.",
          },
        },
        {
          id: "ch1_e_q25",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 25,
          marks: 1,
          blankNumber: 25,
          stem: "She added different (25) _______ to the pancakes daily.",
          answer: "ingredients",
          solution: {
            method: "Vocabulary — things added to food",
            steps: [
              "'Ingredients' = items used in cooking/baking.",
              "She added carrots, spinach, etc. = different ingredients to the pancakes.",
              "'Mixtures' = a combination of things (but you add ingredients TO a mixture, not mixtures to pancakes).",
              "'Different ingredients' = varied items added to the recipe.",
            ],
            tip: "Cooking vocabulary: INGREDIENTS = items used in a recipe. She added different ingredients to the pancakes daily.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — Editing for Spelling (5 × 1 m = 5 m)
    // ─────────────────────────────────────────────
    {
      id: "secF",
      name: "Section F: Editing for Spelling",
      topic: "Editing",
      marks: 5,
      passage: {
        title: "Bukit Timah Nature Reserve",
        text: `Have you ever visited Bukit Timah Nature Reserve? I usually go there (26)[with] with my parents to hike and take long (26)[strols]. It is full of (27)[beautyful] flora and (28)[fauna]. The nature reserve (28)[suppots] a variety of flowering plants and wildlife. Some of these flowering plants and wildlife are slowly decreasing in numbers. (29)[This] reminds us of how (29)[importent] conservation is. Without any conservation (30)[afforts], we would be at risk of losing our flora and fauna. Let's do our part to protect our ecosystem.

(Adapted from: "Sustain local biodiversity" What's Up, October 2021, page 5)`,
      },
      questions: [
        {
          id: "ch1_f_q26",
          type: "A",
          topic: "Editing",
          questionNumber: 26,
          marks: 1,
          stem: "take long (26)[strols]",
          errorType: "spelling",
          errorWord: "strols",
          answer: "strolls",
          solution: {
            method: "Spelling — 'strolls' (double l)",
            steps: [
              "Base word: stroll = a leisurely walk.",
              "Plural of stroll = strolls (add -s, keep double 'l').",
              "'strols' is missing one 'l': stroll → strolls (NOT strols).",
              "Correct: s-t-r-o-l-l-s.",
            ],
            tip: "STROLL has double 'l'. Plural = stROLLS. 'Take long strolls' = go on leisurely walks.",
          },
        },
        {
          id: "ch1_f_q27",
          type: "A",
          topic: "Editing",
          questionNumber: 27,
          marks: 1,
          stem: "It is full of (27)[beautyful] flora",
          errorType: "spelling",
          errorWord: "beautyful",
          answer: "beautiful",
          solution: {
            method: "Spelling — 'beautiful'",
            steps: [
              "Correct: b-e-a-u-t-i-f-u-l.",
              "'beautyful' misspells the root: beauty → beautiful (the 'y' changes to 'i' before '-ful').",
              "Rule: when adding '-ful' to words ending in consonant + y, change 'y' to 'i': beauty → beauti + ful = beautiful.",
            ],
            tip: "beauty → beaut-I-ful (y → i before suffix). NOT 'beautyful'.",
          },
        },
        {
          id: "ch1_f_q28",
          type: "A",
          topic: "Editing",
          questionNumber: 28,
          marks: 1,
          stem: "The nature reserve (28)[suppots] a variety of flowering plants",
          errorType: "spelling",
          errorWord: "suppots",
          answer: "supports",
          solution: {
            method: "Spelling — 'supports'",
            steps: [
              "Correct: s-u-p-p-o-r-t-s.",
              "'suppots' is missing the 'r': sup-POR-ts not sup-POT-s.",
              "Base word: support (double 'p', then -ort).",
            ],
            tip: "SUPPORT = sup-PORT (not sup-POT). Double 'p': sup-port-s.",
          },
        },
        {
          id: "ch1_f_q29",
          type: "A",
          topic: "Editing",
          questionNumber: 29,
          marks: 1,
          stem: "This reminds us of how (29)[importent] conservation is.",
          errorType: "spelling",
          errorWord: "importent",
          answer: "important",
          solution: {
            method: "Spelling — 'important'",
            steps: [
              "Correct: i-m-p-o-r-t-a-n-t.",
              "'importent' has wrong vowel: -ant not -ent.",
              "Remember: im-PORT-ant (ends in -ant, not -ent).",
            ],
            tip: "IMPORTANT ends in -ANT (not -ent). 'ImportANT conservation' — think of the word 'ant' at the end.",
          },
        },
        {
          id: "ch1_f_q30",
          type: "A",
          topic: "Editing",
          questionNumber: 30,
          marks: 1,
          stem: "Without any conservation (30)[afforts]",
          errorType: "spelling",
          errorWord: "afforts",
          answer: "efforts",
          solution: {
            method: "Spelling — 'efforts'",
            steps: [
              "Correct: e-f-f-o-r-t-s.",
              "'afforts' starts with 'aff-' but correct word starts with 'eff-'.",
              "Singular: effort (double 'f'). Plural: efforts.",
              "Remember: EFForts (like EFFective — both start with 'eff').",
            ],
            tip: "EFFORTS = ef-forts (not 'afforts'). Double 'f'. Effort → efforts.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — Comprehension Cloze (4 × 1 m = 4 m)
    // Fill in most suitable word of your own
    // ─────────────────────────────────────────────
    {
      id: "secG",
      name: "Section G: Comprehension Cloze",
      topic: "VocabCloze",
      marks: 4,
      passage: {
        title: "How to Make Slime",
        text: `Slime is fun to play with. It has a great texture and can be colourful too. Would you (31) _______ to make your own slime at home?

You just need to get some simple materials such (32) _______ glue, salt water and baking soda. In a bowl, pour in the glue and the baking soda and mix well. Finally, put in the salt water and watch the slime form. Once the (33) _______ has formed, you can stretch and mould it. You can also (34) _______ some food colouring into the slime. This addition gives your slime a vibrant colour. Start your slime experiment at home today!

(Adapted from: https://www.homesciencetools.com/article/how-to-make-slime/)`,
      },
      questions: [
        {
          id: "ch1_g_q31",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 31,
          marks: 1,
          blankNumber: 31,
          stem: "Would you (31) _______ to make your own slime at home?",
          answer: "like",
          solution: {
            method: "Fixed expression — 'Would you like to'",
            steps: [
              "'Would you like to…?' is a fixed expression for polite invitations/suggestions.",
              "'Would you like to make your own slime?' = a polite invitation to try.",
            ],
            tip: "'Would you like to + base verb?' = polite invitation. 'Would you like to join us?'",
          },
        },
        {
          id: "ch1_g_q32",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 32,
          marks: 1,
          blankNumber: 32,
          stem: "some simple materials such (32) _______ glue, salt water and baking soda",
          answer: "as",
          solution: {
            method: "Fixed expression — 'such as' for examples",
            steps: [
              "'Such as' is used to introduce examples.",
              "'materials such as glue, salt water and baking soda' = examples of the materials.",
              "Fixed phrase: such AS (always 'as' not 'like' in formal contexts).",
            ],
            tip: "'Such as' = for example. 'Materials SUCH AS glue and baking soda' lists examples.",
          },
        },
        {
          id: "ch1_g_q33",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 33,
          marks: 1,
          blankNumber: 33,
          stem: "Once the (33) _______ has formed, you can stretch and mould it.",
          answer: "slime",
          solution: {
            method: "Context — what is being made",
            steps: [
              "The passage is about making SLIME.",
              "'Once the slime has formed' = once the slime mixture is ready.",
              "You then stretch and mould IT (the slime).",
            ],
            tip: "The whole passage is about making SLIME. 'Once the slime has formed' = when the slime is ready.",
          },
        },
        {
          id: "ch1_g_q34",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 34,
          marks: 1,
          blankNumber: 34,
          stem: "You can also (34) _______ some food colouring into the slime.",
          answer: "add",
          solution: {
            method: "Vocabulary — adding ingredients to a mixture",
            steps: [
              "'Add food colouring into the slime' = put/mix colour into it.",
              "'Add' = put something into a mixture to include it.",
              "Standard cooking/mixing vocabulary: add ingredients.",
            ],
            tip: "'Add' food colouring into the slime = mix colour into the slime. 'Add' is the standard verb for including something in a mixture.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — Comprehension: Selected Response + OE (8 m)
    // Passage: Taki, Haru and Koko
    // ─────────────────────────────────────────────
    {
      id: "secH",
      name: "Section H: Comprehension (Selected Response and Open-ended)",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "Taki, Haru and Koko",
        text: `Taki and Haru lived in a small village near the jungle. They made a living by hunting animals and selling their meat in the village market. They were carefree and happy.

One day, Taki and Haru were hunting for wild boars in the jungle. As it was getting late, they decided to go home even though they were empty-handed. Suddenly, they heard a sound. Thinking it could be a wild animal, they decided to investigate. As Haru went near a tree, he realised that the sound was coming from a baby monkey which had a cut on one of its paws. The monkey tapped miserably on the ground and stared weakly at the boys. Haru suggested they bring the monkey back.

The two boys took the poor monkey home. They gave it bananas to eat before treating its wound. They named the monkey Koko. Koko was a friendly but mischievous monkey. Sometimes, it would throw banana peels at passers-by. Koko was also a helpful monkey as it helped to guard the house when the boys were not around.

The two boys trained it to pluck coconuts and taught it some tricks so that they could earn some extra money. Koko performed these tricks for the villagers and they were amused. Some even paid Taki and Haru to get Koko to perform at village festivals.`,
      },
      questions: [
        {
          id: "ch1_h_q35",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 35,
          marks: 1,
          stem: "Where was Taki and Haru's village located?",
          answer: "Their village was located near the jungle.",
          solution: {
            method: "Locate specific information",
            steps: [
              "Passage: 'Taki and Haru lived in a small village near the jungle.'",
              "Answer: near the jungle.",
            ],
            tip: "Direct quote from the passage. 'Near the jungle' is the location.",
          },
        },
        {
          id: "ch1_h_q36",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 36,
          marks: 1,
          stem: "The word 'he' in line 7 refers to ____________. Tick (✓) your answer.",
          options: ["Taki", "Haru", "the wild animal"],
          answer: "Haru",
          solution: {
            method: "Pronoun reference — locate 'he' in context",
            steps: [
              "Line 7: 'As Haru went near a tree, he realised that the sound was coming from a baby monkey…'",
              "'He' refers back to Haru — he went near the tree AND he realised about the sound.",
            ],
            tip: "'As Haru went near a tree, HE realised...' — 'he' = Haru (the subject of the sentence).",
          },
        },
        {
          id: "ch1_h_q37",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 37,
          marks: 1,
          stem: "Which word in the sentence below has the same meaning as 'sadly'? Circle (A) or (B).",
          subText: "The monkey tapped (A) miserably on the ground and stared (B) weakly at the boys.",
          answer: "A",
          answerWord: "miserably",
          solution: {
            method: "Vocabulary — synonym of 'sadly'",
            steps: [
              "'Sadly' = in an unhappy or sorrowful way.",
              "'Miserably' = in a very unhappy, wretched way — closest to 'sadly'.",
              "'Weakly' = with little strength — relates to physical weakness, not emotional sadness.",
            ],
            tip: "'Miserably' = unhappily/sadly. 'Weakly' = with little strength. 'Miserably' is the closer synonym to 'sadly'.",
          },
        },
        {
          id: "ch1_h_q38",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 38,
          marks: 1,
          stem: "Taki and Haru caught a wild boar before they found a monkey. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — verify against passage",
            steps: [
              "Passage: 'they decided to go home even though they were empty-handed.'",
              "'Empty-handed' = they caught nothing — no wild boar.",
              "They were going home WITHOUT catching any animal when they found the monkey.",
              "FALSE.",
            ],
            tip: "'Empty-handed' = caught nothing. They did NOT catch a wild boar. FALSE.",
          },
        },
        {
          id: "ch1_h_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 1,
          stem: "Koko was a well-behaved monkey. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — character description",
            steps: [
              "Passage: 'Koko was a friendly but mischievous monkey. Sometimes, it would throw banana peels at passers-by.'",
              "'Mischievous' = naughty/playful. Throwing banana peels = misbehaviour.",
              "Koko was NOT well-behaved — it was mischievous.",
              "FALSE.",
            ],
            tip: "'Mischievous' = naughty. Throwing banana peels = bad behaviour. NOT well-behaved. FALSE.",
          },
        },
        {
          id: "ch1_h_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 1,
          stem: "Write 1, 2 and 3 in the blanks to indicate the order of events.",
          subEvents: [
            "The boys fed Koko.",
            "The boys taught Koko tricks.",
            "The boys treated Koko's injured paw.",
          ],
          answer: {
            "The boys fed Koko.": "1",
            "The boys taught Koko tricks.": "3",
            "The boys treated Koko's injured paw.": "2",
          },
          solution: {
            method: "Sequence of events",
            steps: [
              "1: 'They gave it bananas to eat BEFORE treating its wound.' → Fed Koko first.",
              "2: 'treating its wound' → Treated the paw second.",
              "3: 'The two boys trained it to pluck coconuts and taught it some tricks' → Taught tricks last.",
            ],
            tip: "'Gave bananas BEFORE treating wound' gives the order: feed (1) → treat wound (2) → teach tricks (3).",
          },
        },
        {
          id: "ch1_h_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 2,
          stem: "Name two things that Koko did to earn money for the boys.",
          answer: {
            i: "Koko plucked coconuts for the boys.",
            ii: "Koko performed tricks for the villagers.",
          },
          solution: {
            method: "Locate two specific activities",
            steps: [
              "Passage: 'The two boys trained it to pluck coconuts and taught it some tricks so that they could earn some extra money.'",
              "Activity 1: pluck/plucked coconuts.",
              "Activity 2: performed tricks for the villagers.",
            ],
            tip: "Two money-earning activities: (1) pluck coconuts, (2) perform tricks. Both from the same sentence.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION I — Comprehension Open-Ended (4 × 2 m = 8 m)
    // Passage: The Sad Peacock
    // ─────────────────────────────────────────────
    {
      id: "secI",
      name: "Section I: Comprehension Open-Ended",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "The Sad Peacock",
        text: `A stunning peacock was dancing happily on a cool windy day. The weather was so pleasant that he started singing too. However, his rough voice sounded so horrible that he became very upset about not being able to sing well.

At that moment, a nightingale started singing near him. The melodious voice of the nightingale further dampened his spirit. He wondered why he had such a horrible voice while the nightingale had such a beautiful one. The peacock even stopped dancing as sadness filled him.

A fairy appeared and noticed that the peacock who loved dancing was looking gloomy.

"Why do you look so sad?" the fairy asked the peacock. "Why don't I have a melodious voice just like the nightingale? It is unfair that I cannot sing as beautifully as the nightingale," complained the peacock.

The fairy calmly replied, "Everyone is special in his own way. We all have unique traits and talents that help us shine. The nightingale is blessed with a pleasant voice, but you are also blessed with your unique dancing talent." The fairy reminded the peacock not to compare himself with others.

"I understand now. I'll never be happy with myself if I keep comparing myself to others. Thank you for your advice," said the peacock.

The peacock thought how silly he had been. "I had been so busy comparing myself to others that I forgot I had my own unique talent." He learnt that he should treasure what he has and shine in his own way.

(Adapted from https://alltimeshortstories.com/the-sad-peacock-moral-stories/)`,
      },
      questions: [
        {
          id: "ch1_i_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 2,
          stem: "What was the peacock doing at the start of the story?",
          answer: "The peacock was dancing happily and singing on a cool windy day.",
          solution: {
            method: "Locate opening activities",
            steps: [
              "Paragraph 1: 'A stunning peacock was dancing happily on a cool windy day.'",
              "Then: 'he started singing too.'",
              "Both activities: dancing and singing.",
            ],
            tip: "The opening paragraph states both activities: DANCING and SINGING.",
          },
        },
        {
          id: "ch1_i_q43",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 43,
          marks: 2,
          stem: "Which 3-word phrase in paragraph 2 shows that the peacock felt discouraged?",
          answer: "dampened his spirit",
          solution: {
            method: "Locate phrase showing discouragement",
            steps: [
              "Paragraph 2: 'The melodious voice of the nightingale further dampened his spirit.'",
              "'Dampened his spirit' = made him feel less enthusiastic/discouraged.",
              "This is the 3-word phrase: dampened (1) his (2) spirit (3).",
            ],
            tip: "'Dampened his spirit' = discouraged him, reduced his enthusiasm. Exactly 3 words.",
          },
        },
        {
          id: "ch1_i_q44",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 44,
          marks: 2,
          stem: "Who does the word 'you' in line 15 refer to?",
          answer: "'You' refers to the peacock.",
          solution: {
            method: "Pronoun reference — direct speech",
            steps: [
              "Line 15: 'but YOU are also blessed with your unique dancing talent.'",
              "The fairy is speaking TO the peacock.",
              "'You' = the peacock (the person being addressed).",
            ],
            tip: "In direct speech, 'you' refers to the person being spoken to. The fairy is speaking to THE PEACOCK.",
          },
        },
        {
          id: "ch1_i_q45",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 45,
          marks: 2,
          stem: "Why did the peacock feel that he was silly at the end?",
          answer: "The peacock felt silly because he had been comparing himself to others and had forgotten that he had his own unique talent — his dancing ability.",
          solution: {
            method: "Locate reason for feeling silly",
            steps: [
              "Final paragraph: 'The peacock thought how silly he had been. \"I had been so busy comparing myself to others that I forgot I had my own unique talent.\"'",
              "Reason: he was too busy comparing himself to others (the nightingale's singing) and forgot his own talent (dancing).",
            ],
            tip: "The peacock felt silly because he wasted time comparing himself to others instead of appreciating his own unique dancing talent.",
          },
        },
      ],
    },
  ],
};

export default paper;
