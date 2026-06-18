// src/data/p3/english/papers/eoy_taonan_paper1_2025.ts
// Tao Nan School — Primary 3 English Language Practice Paper 1
// Sections: Grammar MCQ (A), Vocabulary MCQ (B), Visual Text (C),
//           Grammar Cloze (D), Comprehension Cloze (E),
//           Synthesis & Transformation (F), Editing (G),
//           Comprehension Open-Ended (H)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_taonan_paper1_2025",
  school: "Tao Nan School",
  level: "P3",
  subject: "English",
  paperType: "Practice Paper 1",
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
          // Type A — single question
          id: "p1_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: '"____________ vegetables do not look fresh!" Mother commented as she held them in her hands.',
          options: [
            { label: "1", text: "This" },
            { label: "2", text: "That" },
            { label: "3", text: "These" },
            { label: "4", text: "Those" },
          ],
          answer: "3",
          solution: {
            method: "Demonstrative pronouns",
            steps: [
              "The noun 'vegetables' is plural.",
              "'This' and 'that' are used with singular nouns only.",
              "'These' refers to plural nouns that are near the speaker.",
              "'Those' refers to plural nouns that are far from the speaker.",
              "Mother is holding the vegetables — they are near her — so 'These' is correct.",
            ],
            tip: "Near + plural → These; Far + plural → Those. Near + singular → This; Far + singular → That.",
          },
        },
        {
          id: "p1_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "The coffee is too sweet. You've added too ____________ sugar.",
          options: [
            { label: "1", text: "few" },
            { label: "2", text: "little" },
            { label: "3", text: "many" },
            { label: "4", text: "much" },
          ],
          answer: "4",
          solution: {
            method: "Quantifiers: countable vs uncountable",
            steps: [
              "'Sugar' is an uncountable noun (you cannot say 'one sugar, two sugars' in normal usage).",
              "For uncountable nouns, use 'much' (too much) or 'little' (too little).",
              "'Too little sugar' would mean not enough — but the sentence says the coffee IS too sweet, meaning there is EXCESS sugar.",
              "Therefore 'too much' is correct.",
            ],
            tip: "'Too much' = excess of an uncountable noun. 'Too many' = excess of a countable noun.",
          },
        },
        {
          id: "p1_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: "He did not ____________ the soup quickly because it was too hot.",
          options: [
            { label: "1", text: "drink" },
            { label: "2", text: "drinks" },
            { label: "3", text: "drank" },
            { label: "4", text: "drunk" },
          ],
          answer: "1",
          solution: {
            method: "Auxiliary verb 'did not' + bare infinitive",
            steps: [
              "When using 'did not' (negative past tense auxiliary), the main verb must be in the bare infinitive form.",
              "Bare infinitive of 'drink' = 'drink' (option 1).",
              "'drinks' is present tense third-person singular — wrong.",
              "'drank' is simple past — cannot follow 'did not'.",
              "'drunk' is the past participle — cannot follow 'did not'.",
            ],
            tip: "After 'did not / didn't', always use the base form of the verb: did not eat, did not go, did not drink.",
          },
        },
        {
          id: "p1_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "Minah can play now since she has already ____________ her homework.",
          options: [
            { label: "1", text: "do" },
            { label: "2", text: "did" },
            { label: "3", text: "does" },
            { label: "4", text: "done" },
          ],
          answer: "4",
          solution: {
            method: "Present perfect tense",
            steps: [
              "The auxiliary 'has' signals the present perfect tense.",
              "Present perfect = has/have + past participle.",
              "Past participle of 'do' = 'done'.",
              "'did' is the simple past tense form, which cannot follow 'has'.",
            ],
            tip: "has/have + past participle. Irregular: do → did → done.",
          },
        },
        {
          id: "p1_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: '"____________ we go to the funfair together?" Ravi invited his friends.',
          options: [
            { label: "1", text: "May" },
            { label: "2", text: "Shall" },
            { label: "3", text: "Might" },
            { label: "4", text: "Would" },
          ],
          answer: "2",
          solution: {
            method: "Modal verbs for suggestions/invitations",
            steps: [
              "'Shall we…?' is the standard structure in English for making an invitation or suggestion to a group.",
              "'May we…?' is a request for permission — not used for invitations.",
              "'Might we…?' is extremely formal and archaic.",
              "'Would we…?' is not a standard invitation structure.",
            ],
            tip: "Use 'Shall we…?' to suggest or invite others to do something together.",
          },
        },
        {
          id: "p1_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: '"Make the beds ____________," the camp master instructed the campers.',
          options: [
            { label: "1", text: "himself" },
            { label: "2", text: "yourself" },
            { label: "3", text: "yourselves" },
            { label: "4", text: "themselves" },
          ],
          answer: "3",
          solution: {
            method: "Reflexive pronouns",
            steps: [
              "The subject being addressed is 'the campers' — a plural group (you all).",
              "The reflexive pronoun for plural 'you' is 'yourselves'.",
              "'yourself' is singular (for one person addressed as 'you').",
              "'himself' refers back to a single male subject (not 'you').",
              "'themselves' refers back to a third-person plural subject (they).",
            ],
            tip: "yourself (one person), yourselves (more than one person addressed as 'you').",
          },
        },
        {
          id: "p1_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: "James ____________ to go to school early as his soccer practice was being held before the morning assembly.",
          options: [
            { label: "1", text: "has" },
            { label: "2", text: "had" },
            { label: "3", text: "have" },
            { label: "4", text: "having" },
          ],
          answer: "2",
          solution: {
            method: "Past tense context",
            steps: [
              "The rest of the sentence uses past tense: 'was being held' (past continuous passive).",
              "So the main verb must also be in past tense.",
              "'had to' = was obliged to (past tense of 'have to').",
              "'has to' is present tense — inconsistent with 'was being held'.",
            ],
            tip: "Match the verb tense with the context clues in the rest of the sentence.",
          },
        },
        {
          id: "p1_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "Please don't lean the ladder ____________ the wall. The paint is still wet.",
          options: [
            { label: "1", text: "by" },
            { label: "2", text: "on" },
            { label: "3", text: "with" },
            { label: "4", text: "against" },
          ],
          answer: "4",
          solution: {
            method: "Preposition collocation",
            steps: [
              "The phrase 'lean something against something' is the standard English collocation.",
              "It means to place an object so that it rests at an angle on a surface or wall.",
              "'lean on' means to rely on, or to press weight on — but 'lean a ladder on' is unnatural.",
              "'lean by' and 'lean with' are not standard collocations with 'lean'.",
            ],
            tip: "Fixed phrase: lean (something) against (a surface). Learn common preposition collocations.",
          },
        },
        {
          id: "p1_a_q9",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "____________ you apologise to him, he will not forgive you.",
          options: [
            { label: "1", text: "So" },
            { label: "2", text: "As" },
            { label: "3", text: "Since" },
            { label: "4", text: "Unless" },
          ],
          answer: "4",
          solution: {
            method: "Conditional conjunctions",
            steps: [
              "The sentence expresses a negative condition: 'If you do NOT apologise, he will not forgive you.'",
              "'Unless' = 'if not'. So 'Unless you apologise' = 'If you do not apologise'.",
              "'So' introduces result, not condition.",
              "'As' and 'Since' introduce reason, not condition.",
            ],
            tip: "'Unless' introduces a negative condition: Unless X happens, Y will not happen.",
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
          id: "p1_b_q10",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 10,
          marks: 1,
          stem: '"Justina is as ____________ as a dove. She will never shout at anyone," said her mother.',
          options: [
            { label: "1", text: "mean" },
            { label: "2", text: "gentle" },
            { label: "3", text: "playful" },
            { label: "4", text: "adorable" },
          ],
          answer: "2",
          solution: {
            method: "Simile and context",
            steps: [
              "A dove is a bird universally associated with peace and gentleness.",
              "The simile 'as ___ as a dove' should use an adjective that matches a dove's peaceful nature.",
              "The context also states 'She will never shout at anyone' — confirming she is calm and gentle.",
              "'Gentle' = calm, mild, not rough. This fits perfectly.",
              "'Playful', 'adorable' do not match the idea of never shouting. 'Mean' is the opposite.",
            ],
            tip: "For simile questions, think about the quality the comparison animal/object is traditionally known for.",
          },
        },
        {
          id: "p1_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "The boy ____________ at his sister because she had purposely torn his book.",
          options: [
            { label: "1", text: "glared" },
            { label: "2", text: "peered" },
            { label: "3", text: "peeped" },
            { label: "4", text: "glanced" },
          ],
          answer: "1",
          solution: {
            method: "Precise vocabulary — types of looking",
            steps: [
              "'Glared' = stared in an angry or fierce way. Fits perfectly — the boy is angry because his book was torn.",
              "'Peered' = looked carefully and with difficulty, often to see something small/far.",
              "'Peeped' = looked secretly through a small gap.",
              "'Glanced' = looked briefly and quickly — no strong emotion implied.",
            ],
            tip: "Types of looking: glare (angry), peer (hard to see), peep (secretly), glance (briefly), gaze (long and steady), stare (fixed and intense).",
          },
        },
        {
          id: "p1_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "The pain in his chest was so ____________ that he fainted.",
          options: [
            { label: "1", text: "hard" },
            { label: "2", text: "tough" },
            { label: "3", text: "strong" },
            { label: "4", text: "severe" },
          ],
          answer: "4",
          solution: {
            method: "Adjective collocation with 'pain'",
            steps: [
              "When describing the intensity of pain, the correct adjective is 'severe'.",
              "'Severe pain' is a fixed medical and everyday collocation.",
              "'Hard' and 'tough' describe physical texture or difficulty, not pain.",
              "'Strong' can describe smell, flavour, or emotion but NOT pain in standard English.",
            ],
            tip: "Pain collocations: severe pain, sharp pain, dull pain, throbbing pain, excruciating pain.",
          },
        },
        {
          id: "p1_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "Mei Mei ____________ shopped at that supermarket. That was why all the cashiers there recognised her easily.",
          options: [
            { label: "1", text: "often" },
            { label: "2", text: "rarely" },
            { label: "3", text: "seldom" },
            { label: "4", text: "occasionally" },
          ],
          answer: "1",
          solution: {
            method: "Adverb of frequency — context inference",
            steps: [
              "The result clue is 'all the cashiers recognised her easily' — this implies she visited very frequently.",
              "'Often' = frequently. Supports the cashiers knowing her well.",
              "'Rarely', 'seldom', and 'occasionally' all mean infrequently — if she rarely visited, cashiers would not recognise her.",
            ],
            tip: "Look for the cause-effect clue in the sentence to infer the correct frequency adverb.",
          },
        },
        {
          id: "p1_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: 'The king ____________ joyously, "The kingdom of Dan will celebrate its victory in the Olympics Games tomorrow!"',
          options: [
            { label: "1", text: "declared" },
            { label: "2", text: "explained" },
            { label: "3", text: "demanded" },
            { label: "4", text: "commanded" },
          ],
          answer: "1",
          solution: {
            method: "Precise vocabulary — speech verbs",
            steps: [
              "The content of what the king says is a joyful announcement of a victory celebration.",
              "'Declared' = announced formally and publicly. Perfectly matches a king proclaiming a national celebration.",
              "'Explained' = made something clear or gave reasons — no explanation is needed here.",
              "'Demanded' = insisted forcefully — the tone here is joyous, not forceful.",
              "'Commanded' = gave an order — an announcement of celebration is not a command.",
            ],
            tip: "Choose speech verbs that match BOTH the emotion (joyously) AND the nature of what is being said.",
          },
        },
        {
          id: "p1_b_q15",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 15,
          marks: 1,
          stem: "That student ____________ some very useful information for his project when he was doing his research in the library.",
          options: [
            { label: "1", text: "came to" },
            { label: "2", text: "came for" },
            { label: "3", text: "came about" },
            { label: "4", text: "came across" },
          ],
          answer: "4",
          solution: {
            method: "Phrasal verb — meaning",
            steps: [
              "'Came across' = found or encountered by chance. The student found useful information unexpectedly while researching.",
              "'Came to' = regained consciousness, or arrived at (a place/conclusion).",
              "'Came for' = came in order to get — needs an object like 'came for a book' — but 'information' is not a prearranged target here.",
              "'Came about' = happened or occurred (intransitive) — cannot take an object like 'information'.",
            ],
            tip: "Phrasal verbs: come across (find unexpectedly), come about (happen), come to (arrive at / wake up), come for (come to get something specific).",
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
        title: "Science Week Advertisement",
        text: `SCIENCE WEEK — 2 to 8 June 2018
Join us for some exciting activities during the holidays and learn some Science facts!
Proudly brought to you by the Science Club.

GALLERY HUNT
Who: For ages 7–10 years
When: Daily
Where: Singapore Galleries
What: Discover lots of Science facts and answer all the questions correctly to get an attractive souvenir.
► Limited to 90 souvenirs per day.

FUN SPOT
Who: For ages 6 years and above
When: Wednesday to Friday
Where: Singapore Galleries
What: Our interesting Science activity booths are back! Join us for a FUN-tastic time with our Science educators!

FOOD SCIENCE WORKSHOP
Who: For ages 9–12 years
When: 2 and 3 June
What: 1. Bring out the scientist in you as you experiment with different kinds of food.
      2. Cook your own food and be awarded with the Young Food Scientist badge.
*Where to register: At the Information Counter
*Note: You must be accompanied by an adult.

For enquiries, please call Mr Murthi at 6987 1238.`,
      },
      questions: [
        {
          id: "p1_c_q16",
          type: "B",
          topic: "VisualText",
          questionNumber: 16,
          marks: 1,
          stem: "The event in the advertisement is organised by ____________.",
          options: [
            { label: "1", text: "Science Club" },
            { label: "2", text: "Science Week" },
            { label: "3", text: "Science Galleries" },
            { label: "4", text: "Science educators" },
          ],
          answer: "1",
          solution: {
            method: "Locate information directly from visual text",
            steps: [
              "The advertisement states: 'Proudly brought to you by the Science Club.'",
              "'Science Club' is the organiser.",
              "'Science Week' is the name of the event, not the organiser.",
            ],
            tip: "For Visual Text questions, find the exact phrase in the text that answers the question.",
          },
        },
        {
          id: "p1_c_q17",
          type: "B",
          topic: "VisualText",
          questionNumber: 17,
          marks: 1,
          stem: "The main objective of the advertisement is to ____________.",
          options: [
            { label: "1", text: "teach children to cook their own meals" },
            { label: "2", text: "encourage children to attend the Science Week" },
            { label: "3", text: "ensure that children have fun with the Science educators" },
            { label: "4", text: "design interesting activities for children at the Science Week" },
          ],
          answer: "2",
          solution: {
            method: "Infer purpose of visual text",
            steps: [
              "An advertisement is a promotional text — its main purpose is to persuade readers to attend or buy something.",
              "This advertisement promotes the Science Week event and invites children to join activities.",
              "Option 1 is too narrow (only about cooking in the workshop).",
              "Options 3 and 4 describe activities within the event, not the overall purpose of the poster.",
            ],
            tip: "The MAIN objective of any advertisement is to promote and persuade readers to attend/buy/participate.",
          },
        },
        {
          id: "p1_c_q18",
          type: "B",
          topic: "VisualText",
          questionNumber: 18,
          marks: 1,
          stem: "Jane, who is eleven years old, can take part in ____________.",
          options: [
            { label: "1", text: "Fun Spot only" },
            { label: "2", text: "Gallery Hunt and Fun Spot" },
            { label: "3", text: "Food Science Workshop only" },
            { label: "4", text: "Fun Spot and Food Science Workshop" },
          ],
          answer: "4",
          solution: {
            method: "Cross-reference age eligibility",
            steps: [
              "Jane is 11 years old.",
              "Gallery Hunt: ages 7–10 → Jane is 11, she CANNOT join.",
              "Fun Spot: ages 6 and above → Jane at 11 qualifies. ✓",
              "Food Science Workshop: ages 9–12 → Jane at 11 qualifies. ✓",
              "So Jane can join Fun Spot AND Food Science Workshop.",
            ],
            tip: "Always check each activity's age range against the person's age. Be careful with boundary ages.",
          },
        },
        {
          id: "p1_c_q19",
          type: "B",
          topic: "VisualText",
          questionNumber: 19,
          marks: 1,
          stem: "James wants to participate in the Food Science Workshop, he must ____________.",
          options: [
            { label: "1", text: "call Mr Murthi" },
            { label: "2", text: "do so by 8 June 2018" },
            { label: "3", text: "be at least seven years old" },
            { label: "4", text: "be accompanied by an adult" },
          ],
          answer: "4",
          solution: {
            method: "Locate specific requirement in visual text",
            steps: [
              "The Food Science Workshop states: '*Note: You must be accompanied by an adult.'",
              "This is a condition for participation.",
              "Option 1: Mr Murthi's number is for enquiries, not registration.",
              "Option 2: 8 June is the last day of Science Week, not a registration deadline.",
              "Option 3: The workshop is for ages 9–12, not 7 and above.",
            ],
            tip: "Read all notes and asterisked (*) conditions carefully in visual texts — they often contain the answer.",
          },
        },
        {
          id: "p1_c_q20",
          type: "B",
          topic: "VisualText",
          questionNumber: 20,
          marks: 1,
          stem: "Which statement about the Science Week is true? All participants ____________.",
          options: [
            { label: "1", text: "can visit FUN SPOT on weekends" },
            { label: "2", text: "will receive a badge after conducting an experiment" },
            { label: "3", text: "will get a souvenir each upon answering all the questions correctly" },
            { label: "4", text: "can take part in the Gallery Hunt on any day of the Science Week" },
          ],
          answer: "4",
          solution: {
            method: "Evaluate true/false statements against visual text",
            steps: [
              "Option 1: Fun Spot is open Wed–Fri only, NOT weekends. FALSE.",
              "Option 2: Only Food Science Workshop participants who cook get the Young Food Scientist badge — not all participants. FALSE.",
              "Option 3: The souvenir is limited to 90 per day — not all who answer correctly will get one. FALSE.",
              "Option 4: Gallery Hunt is open 'Daily' during Science Week (2–8 June), so participants can go on any day. TRUE. ✓",
            ],
            tip: "For true/false questions, check every word carefully. 'Limited to 90 per day' means not everyone who answers correctly gets one.",
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
        title: "The Magic Tree",
        text: `Jason saw a sign on a tree trunk. It (21) _______, 'Say the magic words and you will see something special.' Jason guessed many words but (22) _______ not see anything special. Exhausted, he cried, "Please, dear tree!" Suddenly, a big door in (23) _______ trunk opened. Then, Jason exclaimed, "Thank you, dear tree!" (24) _______ that, the tree lit up and revealed a pathway leading to many toys.

This is why 'please' and 'thank you' are magic words.
(Adapted from https://treestoriesforkids.com)`,
        wordBank: [
          { letter: "A", word: "by" },
          { letter: "B", word: "did" },
          { letter: "C", word: "had" },
          { letter: "D", word: "his" },
          { letter: "E", word: "read" },
          { letter: "F", word: "reads" },
          { letter: "G", word: "the" },
          { letter: "H", word: "with" },
        ],
      },
      questions: [
        {
          id: "p1_d_q21",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 21,
          marks: 1,
          blankNumber: 21,
          stem: "It (21) _______, 'Say the magic words…'",
          answer: "E",
          answerWord: "read",
          solution: {
            method: "Past tense of 'read' — the sign had writing",
            steps: [
              "The subject is 'It' (the sign on the tree trunk).",
              "The story is in the past tense throughout.",
              "'read' (past tense of read, pronounced 'red') means the sign said/displayed the words.",
              "'reads' (F) is present tense — wrong tense.",
              "The sign is an object, so we need a past tense verb describing what was written on it.",
            ],
            tip: "The past tense of 'read' is also spelled 'read' but pronounced 'red'. Context clues like 'Jason saw' confirm past tense.",
          },
        },
        {
          id: "p1_d_q22",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 22,
          marks: 1,
          blankNumber: 22,
          stem: "Jason guessed many words but (22) _______ not see anything special.",
          answer: "B",
          answerWord: "did",
          solution: {
            method: "Auxiliary verb for past negative",
            steps: [
              "The structure '___ not see' requires an auxiliary verb.",
              "Since the story is in past tense and the subject is 'Jason' (singular), the correct auxiliary is 'did'.",
              "'did not see' = past tense negative.",
              "'had not see' is wrong — past perfect negative would be 'had not seen'.",
            ],
            tip: "Past tense negative: did not + base verb. Never: had not + base verb.",
          },
        },
        {
          id: "p1_d_q23",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "a big door in (23) _______ trunk opened.",
          answer: "G",
          answerWord: "the",
          solution: {
            method: "Definite article usage",
            steps: [
              "The tree has already been introduced — 'a tree trunk' was mentioned earlier.",
              "When a noun is introduced again or both speaker/reader know which specific one it is, we use 'the'.",
              "'the trunk' refers to the specific tree trunk Jason was at.",
              "'his' (D) would imply the trunk belongs to Jason — incorrect.",
            ],
            tip: "Use 'the' for second mention of a noun, or when both parties know exactly which specific thing is meant.",
          },
        },
        {
          id: "p1_d_q24",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "(24) _______ that, the tree lit up and revealed a pathway leading to many toys.",
          answer: "H",
          answerWord: "with",
          solution: {
            method: "Prepositional phrase — 'with that'",
            steps: [
              "'With that' is a fixed phrase meaning 'immediately after that happened'.",
              "It is used to show that an action happened right after something else.",
              "Here: right after Jason said 'Thank you', the tree lit up.",
              "'By that' — not a standard transition phrase in this context.",
              "'Had that' — grammatically incorrect here.",
            ],
            tip: "'With that' = immediately following that action. Common in storytelling to show quick sequence of events.",
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
        title: "Jie Ren's Hungry Sunday",
        text: `Jie Ren woke up late one Sunday. It was almost noon. He was feeling really (25) _______. The night before, he had stayed (26) _______ all night to play his computer games and had skipped his dinner. Soon, Jie Ren's stomach started to (27) _______. He went to the kitchen to look for some food. There was (28) _______! At that moment, he remembered that his family had all gone out for lunch as his mother never cooked on Sundays!`,
        wordBank: [
          { letter: "A", word: "crumble" },
          { letter: "B", word: "hungry" },
          { letter: "C", word: "none" },
          { letter: "D", word: "rumble" },
          { letter: "E", word: "some" },
          { letter: "F", word: "thirsty" },
          { letter: "G", word: "through" },
          { letter: "H", word: "up" },
        ],
      },
      questions: [
        {
          id: "p1_e_q25",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 25,
          marks: 1,
          blankNumber: 25,
          stem: "He was feeling really (25) _______.",
          answer: "B",
          answerWord: "hungry",
          solution: {
            method: "Context inference — cause and effect",
            steps: [
              "He skipped dinner the night before AND it was almost noon.",
              "Having missed dinner and waking up late would naturally make him hungry.",
              "'Thirsty' (F) is possible but the story focuses on food, not drink.",
              "The story then describes his stomach rumbling and him looking for food, confirming 'hungry'.",
            ],
            tip: "Use the entire passage context — what happened before AND what happens next — to confirm your word choice.",
          },
        },
        {
          id: "p1_e_q26",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 26,
          marks: 1,
          blankNumber: 26,
          stem: "he had stayed (26) _______ all night to play his computer games",
          answer: "H",
          answerWord: "up",
          solution: {
            method: "Phrasal verb — 'stay up'",
            steps: [
              "'Stay up' = remain awake instead of sleeping.",
              "'Stay up all night' is a very common English phrase.",
              "'Stay through all night' and 'stay up through all night' are redundant.",
              "None of the other options form a natural phrase with 'stayed ___ all night'.",
            ],
            tip: "Phrasal verb: stay up = not go to sleep. 'Stay up all night' = be awake the entire night.",
          },
        },
        {
          id: "p1_e_q27",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 27,
          marks: 1,
          blankNumber: 27,
          stem: "Jie Ren's stomach started to (27) _______.",
          answer: "D",
          answerWord: "rumble",
          solution: {
            method: "Vocabulary — onomatopoeia / body actions",
            steps: [
              "'Rumble' = make a low, rolling sound. Stomachs rumble when a person is hungry.",
              "'Stomach started to rumble' is a standard English expression for stomach growling.",
              "'Crumble' (A) = break into small pieces — not used for stomachs.",
              "None of the other options are used with 'stomach'.",
            ],
            tip: "Your stomach 'rumbles' (growls) when you are hungry. This is an important vocabulary item.",
          },
        },
        {
          id: "p1_e_q28",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 28,
          marks: 1,
          blankNumber: 28,
          stem: "There was (28) _______! [He could find no food]",
          answer: "C",
          answerWord: "none",
          solution: {
            method: "Context — finding no food",
            steps: [
              "Jie Ren went to the kitchen to look for food, but the family had gone out.",
              "The exclamation mark shows surprise — he found nothing.",
              "'There was none!' = there was no food at all.",
              "'There was some' (E) would mean he found food — contradicts the context.",
              "He then realises his family had gone out for lunch, confirming there was nothing at home.",
            ],
            tip: "'None' = not any / zero amount. 'There was none!' expresses surprise at finding nothing.",
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
          id: "p1_f_q29",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 29,
          marks: 2,
          stem: "Tim loves to eat apples. Tim loves to eat oranges too.\n\nRewrite as ONE sentence using: _____________________ and _____________________",
          answer: "Tim loves to eat apples and oranges.",
          solution: {
            method: "Combining with 'and' to list two objects",
            steps: [
              "Both sentences share the same subject (Tim) and verb (loves to eat).",
              "Combine the two objects with 'and': apples and oranges.",
              "Result: Tim loves to eat apples and oranges.",
            ],
            tip: "When two sentences share the same subject and verb, combine the objects using 'and'.",
          },
        },
        {
          id: "p1_f_q30",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 30,
          marks: 2,
          stem: "My father came for my dance performance. My father was extremely busy.\n\nRewrite as ONE sentence using: Although _____________________",
          answer: "Although my father was extremely busy, he came for my dance performance.",
          solution: {
            method: "Concession using 'Although'",
            steps: [
              "'Although' introduces a contrasting or surprising fact.",
              "The surprising fact: father was extremely busy BUT still came.",
              "Structure: Although [surprising/contrasting clause], [main result clause].",
              "Although my father was extremely busy, he came for my dance performance.",
              "Note: 'he' replaces 'my father' in the main clause to avoid repetition.",
            ],
            tip: "Although [contrast], [main idea]. The 'although' clause states what makes the main clause surprising.",
          },
        },
        {
          id: "p1_f_q31",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 31,
          marks: 2,
          stem: 'Hui Qi said, "Today is a sweltering hot day."\n\nRewrite as: Hui Qi said that _____________________',
          answer: "Hui Qi said that that day was a sweltering hot day.",
          solution: {
            method: "Direct speech to reported speech",
            steps: [
              "Remove the quotation marks.",
              "Change 'Today' → 'that day' (time adverb shift in reported speech).",
              "Change present tense 'is' → past tense 'was' (tense backshift).",
              "Result: Hui Qi said that that day was a sweltering hot day.",
            ],
            tip: "Reported speech changes: Today → that day; is/are → was/were; I → he/she. The reporting verb 'said' triggers backshift.",
          },
        },
        {
          id: "p1_f_q32",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 32,
          marks: 2,
          stem: "Miss Siti watched this movie. Miss Siti's siblings did not watch this movie.\n\nRewrite as ONE sentence using: _____________________ but _____________________",
          answer: "Miss Siti watched this movie but her siblings did not.",
          solution: {
            method: "Contrast using 'but'",
            steps: [
              "'But' joins two contrasting ideas.",
              "Miss Siti: watched the movie.",
              "Miss Siti's siblings: did not watch.",
              "Result: Miss Siti watched this movie but her siblings did not.",
              "Note: 'Miss Siti's siblings' can be replaced with 'her siblings' to avoid repetition.",
            ],
            tip: "'But' connects contrasting ideas. Avoid repeating the full noun — use a pronoun instead.",
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
        title: "Mohid's First Day",
        text: `It was the start of a new year. Mohid was (33)[begginning] to feel nervous. He did not know anyone in his new class. He remembered how his former classmates (34)[impresses] had loved how he imitated the sounds of animals and he decided to impress his new classmates the same way. He started to growl. "What was that(35)[?]" Mrs Chen, his form teacher, asked. She was surprised (36)[heard] when she (37)[equaly] heard the growling of a dog. His classmates were equally amazed. "That is really fantastic, Mohid(38)[,]" they commented. Mohid smiled. He knew that he was going to have a good year ahead.`,
      },
      questions: [
        {
          id: "p1_g_q33",
          type: "A",
          topic: "Editing",
          questionNumber: 33,
          marks: 1,
          stem: "Mohid was (33)[begginning] to feel nervous.",
          errorType: "spelling",
          errorWord: "begginning",
          answer: "beginning",
          solution: {
            method: "Spelling — doubling rule for '-ing'",
            steps: [
              "Base word: begin.",
              "The word ends in consonant-vowel-consonant (n-i-n).",
              "When adding '-ing' to a word ending in a single consonant preceded by a single vowel AND the final syllable is stressed, double the final consonant.",
              "'Begin' → double the 'n' → 'beginning'.",
              "Only ONE 'n' is doubled, making 'beginning' (not 'begginning' which has a doubled 'g' too).",
            ],
            tip: "begin → beginning (double the final 'n'). The 'g' is NOT doubled. Common mistake: over-doubling.",
          },
        },
        {
          id: "p1_g_q34",
          type: "A",
          topic: "Editing",
          questionNumber: 34,
          marks: 1,
          stem: "he decided to (34)[impresses] his new classmates",
          errorType: "grammar",
          errorWord: "impresses",
          answer: "impress",
          solution: {
            method: "Verb form after 'to' (infinitive)",
            steps: [
              "The structure is 'decided to ___'.",
              "After 'to', the verb must be in the base (bare infinitive) form.",
              "'impress' is the correct base form.",
              "'impresses' is present tense, third-person singular — cannot follow 'to'.",
            ],
            tip: "After 'to', always use the base form of the verb: to run, to impress, to see.",
          },
        },
        {
          id: "p1_g_q35",
          type: "A",
          topic: "Editing",
          questionNumber: 35,
          marks: 1,
          stem: '"What was that(35)[circle around punctuation]" Mrs Chen, his form teacher, asked.',
          errorType: "punctuation",
          errorWord: "missing ?",
          answer: "?",
          solution: {
            method: "Punctuation — question mark for direct questions",
            steps: [
              "The sentence 'What was that' is a direct question inside quotation marks.",
              "A direct question must end with a question mark '?' before the closing quotation mark.",
              "Correct: \"What was that?\" Mrs Chen asked.",
            ],
            tip: "Direct questions inside speech marks end with '?' inside the closing quotation mark.",
          },
        },
        {
          id: "p1_g_q36",
          type: "A",
          topic: "Editing",
          questionNumber: 36,
          marks: 1,
          stem: "She was surprised (36)[heard] when she heard the growling of a dog.",
          errorType: "grammar",
          errorWord: "heard",
          answer: "about",
          solution: {
            method: "Adjective collocation — 'surprised about/by/when'",
            steps: [
              "The structure should be: She was surprised WHEN she heard…",
              "The word in the blank before 'when' is incorrect — 'heard' appears twice and is grammatically wrong in the first position.",
              "The blank should be removed or filled with nothing — or the passage intended: 'She was surprised' (full stop, then new clause).",
              "Based on the exam editing format, the underlined error 'heard' before 'when she heard' is an extra/wrong word — the correction is to delete it or note it as an extraneous word.",
            ],
            tip: "In editing, sometimes a word is simply wrong because it does not belong. Check if removing it makes the sentence correct.",
          },
        },
        {
          id: "p1_g_q37",
          type: "A",
          topic: "Editing",
          questionNumber: 37,
          marks: 1,
          stem: "His classmates were (37)[equaly] amazed.",
          errorType: "spelling",
          errorWord: "equaly",
          answer: "equally",
          solution: {
            method: "Spelling — adverb formation from adjective ending in '-l'",
            steps: [
              "Adjective: equal.",
              "To form the adverb, add '-ly': equal + ly = equally.",
              "Words ending in 'l' keep the 'l' and add 'ly', resulting in double 'l': equal → equally.",
              "'equaly' is missing the second 'l'.",
            ],
            tip: "equal → equally (double 'l'). Similar:eful → fully, full → fully. Words ending in 'l' + 'ly' = double 'l'.",
          },
        },
        {
          id: "p1_g_q38",
          type: "A",
          topic: "Editing",
          questionNumber: 38,
          marks: 1,
          stem: '"That is really fantastic, Mohid(38)[circle]" they commented.',
          errorType: "punctuation",
          errorWord: "missing ,",
          answer: ',"',
          solution: {
            method: "Punctuation — comma before closing quote when followed by attribution",
            steps: [
              "When a speech tag follows a statement (not a question or exclamation), a comma is placed BEFORE the closing quotation mark.",
              "Correct: 'That is really fantastic, Mohid,' they commented.",
              "The comma replaces what would be a full stop at the end of the speech.",
            ],
            tip: "Speech punctuation rule: statement + attribution → end with comma inside quotes: 'Hello,' she said. NOT: 'Hello.' she said.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — Comprehension Open-Ended (4 × 2 m = 8 m)
    // ─────────────────────────────────────────────
    {
      id: "secH",
      name: "Section H: Comprehension Open-Ended",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "Oddball",
        text: `I had seen a lot of dogs in my job as a vet. Oddball was the funniest-looking dog I had ever seen. His bulging eyes always made me laugh. Oddball had been abandoned by his owner. I found him at my animal clinic's doorstep one evening. Beside him was a note which read: 'Please take care of my dog.' How I wished I could adopt him but I already had three dogs to take care of at home. Finally, I decided to put up an advertisement — "Funny-looking dog, well-behaved, needs a loving family".

A week later, a boy called to ask about the adoption. I cautioned him about Oddball's unusual appearance. I did not want the dog to be rejected because of how he looked. After all, he had the sweetest personality. "That will not bother my grandmother," the boy replied. He went on to explain that his grandmother's dog had just died and she needed a companion badly. I told him that he could drop by my clinic whenever he was ready. He told me that he would come with his grandmother.

The next day, a boy and an old woman arrived just before noon. "Hello, I called yesterday," said the boy. "This is my granny." As I passed Oddball to the woman, she cradled him in her arms and stroked his fur. Oddball licked her face. It was love at first lick. "He's perfect!" she exclaimed. I smiled. That was when I saw that she was blind. It did not matter to her how Oddball looked.

(Adapted from: Chicken Soup for the Kid's Soul)`,
      },
      questions: [
        {
          id: "p1_h_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 2,
          stem: "What made the writer describe Oddball as 'the funniest-looking dog' (line 2)?",
          answer: "Oddball had bulging eyes.",
          solution: {
            method: "Locate and paraphrase text evidence",
            steps: [
              "The passage states: 'His bulging eyes always made me laugh.'",
              "Bulging eyes are unusual/funny-looking, which is why the writer found him the funniest-looking dog.",
              "Write the answer as a complete sentence.",
            ],
            tip: "For 'what made' questions, find the physical feature described right after the claim in the text.",
          },
        },
        {
          id: "p1_h_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 2,
          stem: "Why did the writer put up the advertisement?",
          answer: "The writer put up the advertisement because he/she already had three dogs to take care of at home and could not adopt Oddball.",
          solution: {
            method: "Infer reason from text",
            steps: [
              "Text: 'How I wished I could adopt him but I already had three dogs to take care of at home.'",
              "Reason: The writer could not keep Oddball personally.",
              "Action taken: Put up an advertisement to find a loving family for Oddball.",
              "Write the reason as a complete sentence.",
            ],
            tip: "Answer 'why' questions with the cause/reason found in the passage, written as a full sentence.",
          },
        },
        {
          id: "p1_h_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 2,
          stem: "Which word from paragraph 2 has the same meaning as 'warned'?",
          answer: "cautioned",
          solution: {
            method: "Vocabulary in context — synonym search",
            steps: [
              "Paragraph 2 states: 'I cautioned him about Oddball's unusual appearance.'",
              "'Cautioned' = warned someone about a potential problem or danger.",
              "This is a direct synonym of 'warned'.",
            ],
            tip: "For synonym questions, find the word in the specified paragraph and check if it matches the given word's meaning.",
          },
        },
        {
          id: "p1_h_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 2,
          stem: 'Why did the boy say "That will not bother my grandmother"? (Line 11)',
          answer: "The boy said this because his grandmother was blind and would not be able to see how funny-looking Oddball was, so Oddball's appearance would not matter to her.",
          solution: {
            method: "Inference — connecting information across paragraphs",
            steps: [
              "In paragraph 3: 'That was when I saw that she was blind.'",
              "The grandmother is blind, so she cannot see Oddball's funny/unusual looks.",
              "Therefore, Oddball's appearance would not 'bother' (disturb/upset) her.",
              "The boy knew this, which is why he made that statement.",
            ],
            tip: "Inference questions require connecting information from different parts of the text. Look for the reason revealed later in the passage.",
          },
        },
      ],
    },
  ],
};

export default paper;
