// src/data/p3/english/papers/eoy_taonan_paper2_2025.ts
// Tao Nan School — Primary 3 English Language Practice Paper 2
// Sections: Grammar MCQ (A), Vocabulary MCQ (B), Visual Text (C),
//           Grammar Cloze (D), Comprehension Cloze (E),
//           Synthesis & Transformation (F), Editing (G),
//           Comprehension Open-Ended (H)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_taonan_paper2_2025",
  school: "Tao Nan School",
  level: "P3",
  subject: "English",
  paperType: "Practice Paper 2",
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
          id: "p2_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: "Susan loves soccer. She ____________ it five times a week.",
          options: [
            { label: "1", text: "play" },
            { label: "2", text: "plays" },
            { label: "3", text: "played" },
            { label: "4", text: "was playing" },
          ],
          answer: "2",
          solution: {
            method: "Simple present tense — subject-verb agreement",
            steps: [
              "The sentence describes a regular habit (five times a week) → simple present tense.",
              "The subject is 'She' — third person singular.",
              "Third person singular present tense requires '-s' ending: plays.",
              "'played' is past tense — wrong for a regular habit.",
              "'was playing' is past continuous — wrong.",
            ],
            tip: "For habits/routines with 'She/He/It', add '-s' to the verb: She plays, He runs, It works.",
          },
        },
        {
          id: "p2_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "Yesterday, Father reminded my sister to ____________ the door.",
          options: [
            { label: "1", text: "lock" },
            { label: "2", text: "locks" },
            { label: "3", text: "locked" },
            { label: "4", text: "locking" },
          ],
          answer: "1",
          solution: {
            method: "Infinitive after 'remind … to'",
            steps: [
              "Structure: remind [someone] to [base verb].",
              "After 'to', the verb must be in the bare infinitive form.",
              "'lock' is the base infinitive → correct.",
              "'locks' is present tense, 'locked' is past, 'locking' is gerund — none can follow 'to' in this structure.",
            ],
            tip: "remind someone TO do something → always use base form after 'to'.",
          },
        },
        {
          id: "p2_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: '"There\'s too ____________ sugar in my tea. It\'s very sweet," Ahmad complained.',
          options: [
            { label: "1", text: "little" },
            { label: "2", text: "some" },
            { label: "3", text: "many" },
            { label: "4", text: "much" },
          ],
          answer: "4",
          solution: {
            method: "Quantifiers — countable/uncountable",
            steps: [
              "'Sugar' is an uncountable noun.",
              "The tea is very sweet = there is EXCESS sugar → 'too much'.",
              "'Too little' = not enough — opposite of what is described.",
              "'Many' is for countable nouns only.",
              "'Some' does not express excess.",
            ],
            tip: "'Too much' + uncountable noun; 'Too many' + countable noun (plural).",
          },
        },
        {
          id: "p2_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "I have two friends. ____________ names are Emma and Helen.",
          options: [
            { label: "1", text: "My" },
            { label: "2", text: "Her" },
            { label: "3", text: "Our" },
            { label: "4", text: "Their" },
          ],
          answer: "4",
          solution: {
            method: "Possessive pronouns — referring back to subject",
            steps: [
              "The 'names' belong to the two friends (third person plural).",
              "Possessive pronoun for third person plural = 'Their'.",
              "'My' would mean the names belong to the speaker.",
              "'Her' is third person singular — but there are two friends.",
              "'Our' means belonging to us (speaker + others).",
            ],
            tip: "Third person plural possessive = Their. Always check WHO the possessive refers back to.",
          },
        },
        {
          id: "p2_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: "Mrs Lee was sleeping in the room when the doorbell ____________.",
          options: [
            { label: "1", text: "rings" },
            { label: "2", text: "rang" },
            { label: "3", text: "rung" },
            { label: "4", text: "had rung" },
          ],
          answer: "2",
          solution: {
            method: "Past continuous interrupted by simple past",
            steps: [
              "Structure: was doing [continuous action] WHEN [interrupting action in simple past].",
              "Mrs Lee was sleeping (past continuous) WHEN the doorbell rang (simple past).",
              "'rang' is the simple past of 'ring'. ✓",
              "'rings' is present tense — wrong.",
              "'rung' is past participle — needs auxiliary (has/had).",
              "'had rung' is past perfect — suggests it rang before the sleeping started, which is unlikely here.",
            ],
            tip: "Pattern: was/were [verb]-ing WHEN [simple past verb]. The 'when' action interrupts the ongoing one.",
          },
        },
        {
          id: "p2_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: "____________ Siti had completed her homework, she read a storybook.",
          options: [
            { label: "1", text: "If" },
            { label: "2", text: "Until" },
            { label: "3", text: "Since" },
            { label: "4", text: "Unless" },
          ],
          answer: "3",
          solution: {
            method: "Conjunctions expressing sequence/reason",
            steps: [
              "The sentence implies a sequence: she finished homework FIRST, then she read.",
              "'Since' here expresses that one thing happened and then another followed as a result or logical next step.",
              "It can also mean 'after': Since she had completed her homework, she read.",
              "'If' expresses condition — but completing homework is stated as a fact, not a condition.",
              "'Until' means up to the point in time — doesn't fit the meaning here.",
              "'Unless' = if not — doesn't fit.",
            ],
            tip: "'Since' can mean 'because' (reason) or 'after' (time sequence). Here it shows the sequence/reason she was able to read.",
          },
        },
        {
          id: "p2_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: "The boys pitched the tent by ____________.",
          options: [
            { label: "1", text: "itself" },
            { label: "2", text: "himself" },
            { label: "3", text: "ourselves" },
            { label: "4", text: "themselves" },
          ],
          answer: "4",
          solution: {
            method: "Reflexive pronouns — 'by oneself' = alone/without help",
            steps: [
              "The phrase 'by [reflexive pronoun]' means 'alone' or 'without help'.",
              "The subject is 'the boys' = third person plural.",
              "Reflexive for third person plural = 'themselves'.",
              "'itself' = for things/animals (singular).",
              "'himself' = for a single male person.",
              "'ourselves' = for 'we' (speaker included).",
            ],
            tip: "Reflexive pronouns: himself, herself, itself, myself, yourself, ourselves, yourselves, themselves.",
          },
        },
        {
          id: "p2_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "Can you pass ____________ bunch of keys over there to this man?",
          options: [
            { label: "1", text: "this" },
            { label: "2", text: "that" },
            { label: "3", text: "these" },
            { label: "4", text: "those" },
          ],
          answer: "2",
          solution: {
            method: "Demonstrative determiners — near vs far, singular vs plural",
            steps: [
              "'Bunch' is a singular noun (one bunch of keys).",
              "The keys are 'over there' = far from the speaker.",
              "Far + singular = 'that'.",
              "'this' = near + singular.",
              "'these' = near + plural.",
              "'those' = far + plural.",
            ],
            tip: "Remember: This/These (near), That/Those (far). This/That (singular), These/Those (plural).",
          },
        },
        {
          id: "p2_a_q9",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "Please come in ____________ the side gate.",
          options: [
            { label: "1", text: "at" },
            { label: "2", text: "over" },
            { label: "3", text: "along" },
            { label: "4", text: "through" },
          ],
          answer: "4",
          solution: {
            method: "Preposition of movement — entering via a gate",
            steps: [
              "'Come in through the gate' means to enter by passing through the gate opening.",
              "'Through' indicates movement from one side to the other of an opening or passage.",
              "'At the gate' would mean the location of the gate, not entering.",
              "'Over the gate' would mean climbing over it — unnatural for 'come in'.",
              "'Along the gate' = movement parallel to the gate — doesn't mean entering.",
            ],
            tip: "Use 'through' for entering via openings (gates, doors, tunnels): come in through the gate/door.",
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
          id: "p2_b_q10",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 10,
          marks: 1,
          stem: "Please ____________ the word in the dictionary if you do not know its meaning.",
          options: [
            { label: "1", text: "look up" },
            { label: "2", text: "look for" },
            { label: "3", text: "look into" },
            { label: "4", text: "look after" },
          ],
          answer: "1",
          solution: {
            method: "Phrasal verbs with 'look'",
            steps: [
              "'Look up' = search for information in a reference source (dictionary, database).",
              "This matches the context of using a dictionary to find a word's meaning.",
              "'Look for' = search for a missing item — not used for dictionaries.",
              "'Look into' = investigate a matter.",
              "'Look after' = take care of someone/something.",
            ],
            tip: "look up (find in reference) / look for (search for something lost) / look after (care for) / look into (investigate).",
          },
        },
        {
          id: "p2_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "Mary always ____________ to herself and it is difficult for anyone to hear her.",
          options: [
            { label: "1", text: "utters" },
            { label: "2", text: "mutters" },
            { label: "3", text: "sputters" },
            { label: "4", text: "chatters" },
          ],
          answer: "2",
          solution: {
            method: "Precise vocabulary — types of speaking",
            steps: [
              "'Mutters' = speaks quietly and unclearly, often to oneself. Matches 'difficult to hear'.",
              "'Utters' = makes a sound or says something (neutral — does not imply low volume).",
              "'Sputters' = speaks with difficulty, spitting slightly (often due to choking or anger).",
              "'Chatters' = talks rapidly about unimportant things — NOT quietly to oneself.",
            ],
            tip: "mutter = talk quietly and unclearly (like complaining under your breath). Very common vocabulary item.",
          },
        },
        {
          id: "p2_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "Mr Singh is the ____________ who performed the operation on the injured soldiers.",
          options: [
            { label: "1", text: "vet" },
            { label: "2", text: "dentist" },
            { label: "3", text: "surgeon" },
            { label: "4", text: "pharmacist" },
          ],
          answer: "3",
          solution: {
            method: "Vocabulary — professions in medicine",
            steps: [
              "An 'operation' refers to surgery.",
              "A 'surgeon' is a doctor who performs operations/surgery.",
              "'Vet' = animal doctor — operates on animals, not soldiers.",
              "'Dentist' = tooth doctor — does not perform operations on soldiers.",
              "'Pharmacist' = prepares and dispenses medication — does not perform operations.",
            ],
            tip: "Surgeon = performs surgery/operations. Physician = general doctor. Dentist = teeth. Pharmacist = medicine dispensing.",
          },
        },
        {
          id: "p2_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "Mary sobbed ____________ because she had lost her favourite doll.",
          options: [
            { label: "1", text: "mildly" },
            { label: "2", text: "tirelessly" },
            { label: "3", text: "recklessly" },
            { label: "4", text: "uncontrollably" },
          ],
          answer: "4",
          solution: {
            method: "Adverb intensity — context of crying",
            steps: [
              "'Sobbed' already implies strong, loud crying.",
              "Losing a favourite doll is very upsetting for a child — the crying would be intense.",
              "'Uncontrollably' = unable to stop or control — fits sobbing intensely.",
              "'Mildly' = slightly — contradicts 'sobbed' which is already intense crying.",
              "'Tirelessly' = without getting tired — not used to describe crying.",
              "'Recklessly' = without care for consequences — does not collocate with 'sobbed'.",
            ],
            tip: "Match adverb intensity to the context. 'Sobbed uncontrollably' is a natural collocation in English.",
          },
        },
        {
          id: "p2_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: "If Mrs Lee had been more ____________, her purse would not have been pickpocketed.",
          options: [
            { label: "1", text: "alert" },
            { label: "2", text: "diligent" },
            { label: "3", text: "concerned" },
            { label: "4", text: "conscientious" },
          ],
          answer: "1",
          solution: {
            method: "Vocabulary — situational fit",
            steps: [
              "Having a purse stolen (pickpocketed) is related to not being aware of one's surroundings.",
              "'Alert' = watchful, aware of dangers around you. This is what would prevent pickpocketing.",
              "'Diligent' = hardworking and careful (usually about tasks/work).",
              "'Concerned' = worried — not a preventive quality.",
              "'Conscientious' = careful and thorough in duties — usually about work quality.",
            ],
            tip: "'Alert' = watchful and aware of your surroundings. Critical for preventing theft or accidents.",
          },
        },
        {
          id: "p2_b_q15",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 15,
          marks: 1,
          stem: "The old woman cannot see anything. She is as blind as a ____________.",
          options: [
            { label: "1", text: "bat" },
            { label: "2", text: "snail" },
            { label: "3", text: "mouse" },
            { label: "4", text: "puppy" },
          ],
          answer: "1",
          solution: {
            method: "Fixed simile — 'as blind as a bat'",
            steps: [
              "'As blind as a bat' is a fixed English simile meaning unable to see.",
              "Bats are associated with darkness and navigating by sonar rather than sight.",
              "This is a set phrase — only 'bat' is correct.",
              "Snails, mice, and puppies are not associated with blindness in English idioms.",
            ],
            tip: "Fixed similes must be memorised: as blind as a bat, as brave as a lion, as quiet as a mouse, as busy as a bee.",
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
        title: "My Family Day Advertisement",
        text: `MY FAMILY DAY
on 24 May 2020, 9.00am – 5.00pm
@ Villa Community Club
18 Villa Road, Singapore 666 777
Free Activities All Day!
[Free Admission!]

Activity 1: Cycling
Bicycles and helmets are available for use!

Activity 2: Sing-Along
Sing your favourite songs to your heart's content!

Activity 3: Fun Shots
Capture your special moments at the photo booth!

Many more exciting activities to explore at the event!

FAMILY BUILDING CONTEST — Get Creative!
Put your building skills to the test and amaze us with your creations!
(Bricks will be provided for all participants.)

Prizes to be won!
Stand a chance to win attractive prizes from Bricks N Kids that are worth up to $300!
All participants will receive a FREE goodie bag worth $20!

Category | Timing of Contest
A (5 to 8 years) | 10.00 a.m. – 11.00 a.m.
B (9 to 12 years) | 11 a.m. – 12 noon
Participants must be accompanied by an adult.

Limited slots! To register, log on to www.bricksnkids.com.sg
Registration closes on 17 May 2020
For enquiries, call Mr Yap at 6955 3344.

Sponsors: Bricks N Kids | Cycle Mania Pte Ltd | Photo Moments`,
      },
      questions: [
        {
          id: "p2_c_q16",
          type: "B",
          topic: "VisualText",
          questionNumber: 16,
          marks: 1,
          stem: "This event is held at ____________.",
          options: [
            { label: "1", text: "Bricks N Kids" },
            { label: "2", text: "Photo Moments" },
            { label: "3", text: "Cycle Mania Pte Ltd" },
            { label: "4", text: "Villa Community Club" },
          ],
          answer: "4",
          solution: {
            method: "Locate venue information in visual text",
            steps: [
              "The advertisement states: '@ Villa Community Club, 18 Villa Road, Singapore 666 777'.",
              "The '@' symbol indicates location.",
              "Bricks N Kids, Photo Moments, and Cycle Mania Pte Ltd are sponsors, not the venue.",
            ],
            tip: "Sponsors ≠ venue. Look for location words like '@', 'at', 'held at', or an address.",
          },
        },
        {
          id: "p2_c_q17",
          type: "B",
          topic: "VisualText",
          questionNumber: 17,
          marks: 1,
          stem: "The main aim of the event is to ____________.",
          options: [
            { label: "1", text: "encourage families to spend time together" },
            { label: "2", text: "allow families to build a brick model creatively" },
            { label: "3", text: "make sure that everyone enjoys the free activities" },
            { label: "4", text: "impress the judges with the participants' building skills" },
          ],
          answer: "1",
          solution: {
            method: "Infer main purpose of event from title and content",
            steps: [
              "The event is called 'MY FAMILY DAY' — the very name signals it is about family bonding.",
              "The activities (cycling, singing, photos, building) are all designed for families to enjoy together.",
              "Option 2 is too specific (just one activity).",
              "Option 3 is about ensuring fun, but the primary aim is family togetherness.",
              "Option 4 is about the Building Contest only.",
            ],
            tip: "The EVENT NAME is the biggest clue for its main purpose. 'Family Day' = encouraging families together.",
          },
        },
        {
          id: "p2_c_q18",
          type: "B",
          topic: "VisualText",
          questionNumber: 18,
          marks: 1,
          stem: "The Sing-Along activity encourages participants to ____________.",
          options: [
            { label: "1", text: "showcase their singing skills" },
            { label: "2", text: "listen to their favourite songs" },
            { label: "3", text: "enjoy singing for as long as they want" },
            { label: "4", text: "sing in order to keep their hearts healthy" },
          ],
          answer: "3",
          solution: {
            method: "Extract precise meaning from advertisement text",
            steps: [
              "The Sing-Along section says: 'Sing your favourite songs to your heart's content!'",
              "'To your heart's content' = as much as you want / for as long as you like.",
              "Option 3 (enjoy singing for as long as they want) captures this meaning.",
              "Option 1: No competition/skill showcase mentioned.",
              "Option 2: 'listen' — the activity is about singing, not listening.",
              "Option 4: 'hearts healthy' — this misreads 'heart's content' (idiomatic expression).",
            ],
            tip: "'To your heart's content' = an idiom meaning as much as you desire. Do not read 'heart' literally.",
          },
        },
        {
          id: "p2_c_q19",
          type: "B",
          topic: "VisualText",
          questionNumber: 19,
          marks: 1,
          stem: "Tony, who is nine years old, wants to participate in the Family Building Contest. He must ____________.",
          options: [
            { label: "1", text: "do so with an adult" },
            { label: "2", text: "bring his own bricks" },
            { label: "3", text: "register by 24 May 2020" },
            { label: "4", text: "call Mr Yap for enquiries" },
          ],
          answer: "1",
          solution: {
            method: "Cross-reference age category and conditions",
            steps: [
              "Tony is 9 years old → Category B (9 to 12 years).",
              "The contest states: 'Participants must be accompanied by an adult.'",
              "Option 1 (do so with an adult) = correct. ✓",
              "Option 2: 'Bricks will be provided for all participants' — he does NOT need to bring his own.",
              "Option 3: Registration closes on 17 May 2020, NOT 24 May (which is event day).",
              "Option 4: Mr Yap is for enquiries only, not a requirement for Tony.",
            ],
            tip: "Check ALL conditions listed for the activity. 'Bricks will be provided' eliminates option 2.",
          },
        },
        {
          id: "p2_c_q20",
          type: "B",
          topic: "VisualText",
          questionNumber: 20,
          marks: 1,
          stem: "Which one of the following statements is true? All participants ____________.",
          options: [
            { label: "1", text: "have to pay $20 for a goodie bag" },
            { label: "2", text: "can receive free bicycles and helmets" },
            { label: "3", text: "can enjoy more than three activities at the event" },
            { label: "4", text: "have to display their fun shots at the photo booth" },
          ],
          answer: "3",
          solution: {
            method: "Evaluate true/false statements",
            steps: [
              "Option 1: The goodie bag is FREE (worth $20) — participants do NOT pay. FALSE.",
              "Option 2: Bicycles and helmets are 'available for use' (borrowed during event) — not given for free to take home. FALSE.",
              "Option 3: The ad lists Cycling, Sing-Along, Fun Shots, Family Building Contest, and 'many more exciting activities' — more than three. TRUE. ✓",
              "Option 4: Fun Shots are taken at the photo booth — there is no mention of displaying them. FALSE.",
            ],
            tip: "Read carefully: 'Free goodie bag worth $20' ≠ pay $20. And 'available for use' ≠ receive to keep.",
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
        title: "Jim the Doctor",
        text: `Jim had not eaten for two days. Just when he felt faint (21) _______ hunger, a kind lady gave him a glass of milk. Years later, Jim became a doctor. He (22) _______ not forget the lady's act of kindness. One day, (23) _______ the lady was admitted to the hospital (24) _______ he worked, Jim paid for her large sum of medical bill. The saying, "What goes round, comes round" is so true.

(Adapted from https://parenting.firstcry.com)`,
        wordBank: [
          { letter: "A", word: "did" },
          { letter: "B", word: "does" },
          { letter: "C", word: "of" },
          { letter: "D", word: "until" },
          { letter: "E", word: "when" },
          { letter: "F", word: "where" },
          { letter: "G", word: "which" },
          { letter: "H", word: "with" },
        ],
      },
      questions: [
        {
          id: "p2_d_q21",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 21,
          marks: 1,
          blankNumber: 21,
          stem: "Just when he felt faint (21) _______ hunger",
          answer: "H",
          answerWord: "with",
          solution: {
            method: "Preposition collocation — 'faint with'",
            steps: [
              "'Faint with [emotion/sensation]' is a fixed English expression.",
              "'Faint with hunger' = feeling faint because of extreme hunger.",
              "Other examples: faint with fear, faint with exhaustion.",
              "'of' would make 'faint of hunger' — this is not a standard phrase.",
            ],
            tip: "Fixed expressions: faint with hunger/fear/exhaustion. Always 'with', not 'of' or 'from'.",
          },
        },
        {
          id: "p2_d_q22",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 22,
          marks: 1,
          blankNumber: 22,
          stem: "He (22) _______ not forget the lady's act of kindness.",
          answer: "A",
          answerWord: "did",
          solution: {
            method: "Past tense auxiliary — 'did not forget'",
            steps: [
              "The story is set in the past (Jim 'became' a doctor — past tense).",
              "'did not forget' = past tense negative of 'forget'.",
              "'does not forget' (B) is present tense — inconsistent with the past narrative.",
              "'He did not forget' correctly states that in the past, he never forgot the kindness.",
            ],
            tip: "Maintain tense consistency throughout a passage. Past narrative → past tense throughout.",
          },
        },
        {
          id: "p2_d_q23",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "One day, (23) _______ the lady was admitted to the hospital",
          answer: "E",
          answerWord: "when",
          solution: {
            method: "Time conjunction — introducing a subordinate clause",
            steps: [
              "'When' introduces a time clause: when [something happened], [result/action].",
              "One day, WHEN the lady was admitted → then Jim paid her bill.",
              "'until' means 'up to a point in time' — would change the meaning significantly.",
              "'where' and 'which' introduce relative clauses about place/things — not time events.",
            ],
            tip: "'When' introduces a time clause showing two things happening at the same time or one after another.",
          },
        },
        {
          id: "p2_d_q24",
          type: "B",
          topic: "GrammarCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "the hospital (24) _______ he worked",
          answer: "F",
          answerWord: "where",
          solution: {
            method: "Relative pronoun for place",
            steps: [
              "The blank refers back to 'the hospital' — a place.",
              "To introduce a relative clause about a place, use 'where'.",
              "'the hospital where he worked' = the hospital at which he worked.",
              "'which' can replace a place noun but would need 'at/in' before it: 'the hospital in which he worked'.",
              "'where' is simpler and more natural here.",
            ],
            tip: "Use 'where' for relative clauses about places: the school where she studied, the hospital where he worked.",
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
        title: "Kelly's Mess",
        text: `Mother entered the kitchen. There was peanut butter all over the floor and she arched her (25) _______ in dismay. How could Kelly leave such a (26) _______? Mother sighed and picked up a (27) _______ of tissue paper. As she cleaned the floor, she saw Kelly running into the kitchen. Kelly noticed how (28) _______ Mother was. That was when she realised she was in hot soup.`,
        wordBank: [
          { letter: "A", word: "back" },
          { letter: "B", word: "box" },
          { letter: "C", word: "clutter" },
          { letter: "D", word: "eyebrows" },
          { letter: "E", word: "furious" },
          { letter: "F", word: "mess" },
          { letter: "G", word: "pile" },
          { letter: "H", word: "strict" },
        ],
      },
      questions: [
        {
          id: "p2_e_q25",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 25,
          marks: 1,
          blankNumber: 25,
          stem: "she arched her (25) _______ in dismay",
          answer: "D",
          answerWord: "eyebrows",
          solution: {
            method: "Phrasal expression — body language",
            steps: [
              "'Arch one's eyebrows' = raise one's eyebrows in surprise, concern, or dismay.",
              "This is a fixed expression for showing facial surprise.",
              "She saw peanut butter all over the floor → dismay (shock/disapproval) → arched eyebrows.",
              "You cannot 'arch your back in dismay' — arching the back is not an expression of dismay.",
            ],
            tip: "Fixed expression: arch/raise eyebrows = show surprise or concern. Body language vocabulary is tested often.",
          },
        },
        {
          id: "p2_e_q26",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 26,
          marks: 1,
          blankNumber: 26,
          stem: "How could Kelly leave such a (26) _______?",
          answer: "F",
          answerWord: "mess",
          solution: {
            method: "Vocabulary — describing disorganised/dirty state",
            steps: [
              "There was peanut butter all over the floor — this describes a dirty, untidy state.",
              "'Mess' = an untidy or dirty state of things.",
              "'Clutter' (C) = too many objects in a disorganised way — more about objects, not usually food on the floor.",
              "'Leave such a mess' is a natural, common English expression.",
            ],
            tip: "'Make/leave a mess' = create a dirty or untidy situation. Very common collocation.",
          },
        },
        {
          id: "p2_e_q27",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 27,
          marks: 1,
          blankNumber: 27,
          stem: "Mother sighed and picked up a (27) _______ of tissue paper.",
          answer: "B",
          answerWord: "box",
          solution: {
            method: "Collective noun — 'a box of tissue paper'",
            steps: [
              "Tissue paper typically comes in a box.",
              "'A box of tissue paper' is the standard collective noun phrase.",
              "'A pile of tissue paper' (G) is possible but unusual — tissue is kept in boxes, not piles.",
              "You would 'pick up a box' — picking up 'a pile' is less natural when cleaning.",
            ],
            tip: "Collective nouns: a box of tissues, a pile of books, a bunch of keys, a pack of cards.",
          },
        },
        {
          id: "p2_e_q28",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 28,
          marks: 1,
          blankNumber: 28,
          stem: "Kelly noticed how (28) _______ Mother was. That was when she realised she was in hot soup.",
          answer: "E",
          answerWord: "furious",
          solution: {
            method: "Context — emotion after finding mess",
            steps: [
              "Mother found peanut butter all over the floor and arched her eyebrows 'in dismay'.",
              "Kelly is 'in hot soup' = in serious trouble — implies Mother is very angry.",
              "'Furious' = extremely angry. Fits perfectly.",
              "'Strict' (H) is a general character trait, not an emotion one notices in a moment.",
            ],
            tip: "'In hot soup' = in deep trouble. This idiom implies the adult is ANGRY. 'Furious' = very angry.",
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
          id: "p2_f_q29",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 29,
          marks: 2,
          stem: "The children were very tired. The children went to bed early.\n\nRewrite as ONE sentence using: _____________________ because _____________________",
          answer: "The children went to bed early because they were very tired.",
          solution: {
            method: "Combining with 'because' — cause and effect",
            steps: [
              "'Because' introduces the reason/cause.",
              "Effect: went to bed early. Cause: were very tired.",
              "Structure: [Effect clause] because [Cause clause].",
              "The children went to bed early because they were very tired.",
              "Note: Replace 'The children' with 'they' in the second clause.",
            ],
            tip: "'Because' introduces the reason. Put the result first, then 'because', then the reason.",
          },
        },
        {
          id: "p2_f_q30",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 30,
          marks: 2,
          stem: "Jane likes to play chess. Her brother likes to play chess too.\n\nRewrite as ONE sentence using: Both _____________________",
          answer: "Both Jane and her brother like to play chess.",
          solution: {
            method: "Combining with 'Both … and …'",
            steps: [
              "'Both … and …' combines two subjects doing the same thing.",
              "Both Jane AND her brother → plural subject.",
              "Plural subject → verb without 's': like (not likes).",
              "Both Jane and her brother like to play chess.",
            ],
            tip: "'Both A and B' takes a PLURAL verb. Both Jane and her brother LIKE (not likes) to play chess.",
          },
        },
        {
          id: "p2_f_q31",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 31,
          marks: 2,
          stem: "The hamster ran out of the house. The hamster had brown fur.\n\nRewrite as ONE sentence using: _____________________ that _____________________",
          answer: "The hamster that had brown fur ran out of the house.",
          solution: {
            method: "Relative clause with 'that'",
            steps: [
              "'That' introduces a relative clause describing a noun.",
              "Main clause: The hamster ran out of the house.",
              "Relative clause (describing which hamster): that had brown fur.",
              "Result: The hamster that had brown fur ran out of the house.",
            ],
            tip: "Use 'that' or 'which' for things/animals; 'who' for people, when adding a describing clause.",
          },
        },
        {
          id: "p2_f_q32",
          type: "A",
          topic: "SentenceCombining",
          questionNumber: 32,
          marks: 2,
          stem: '"I am meeting Ali here today," said Mr Bala.\n\nRewrite as: Mr Bala said that _____________________',
          answer: "Mr Bala said that he was meeting Ali there that day.",
          solution: {
            method: "Direct speech to reported speech",
            steps: [
              "Remove quotation marks.",
              "Change 'I' → 'he' (Mr Bala).",
              "Change 'am meeting' → 'was meeting' (tense backshift: present continuous → past continuous).",
              "Change 'here' → 'there' (place adverb shift).",
              "Change 'today' → 'that day' (time adverb shift).",
              "Result: Mr Bala said that he was meeting Ali there that day.",
            ],
            tip: "Reported speech changes: I→he/she; am/is→was; are→were; here→there; today→that day; now→then.",
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
        title: "Energy Drinks for Children",
        text: `In England, the government wants to put a stop to selling Fruity Berry (33)[?] energy-giving drinks to children. This is because these drinks contain an (33)[extremlly] extremely large amount of sugar and caffeine. Caffeine is a substance that can be very (34)[harmfull] to health. When over-consumed, caffeine may cause a fast heartbeat, (35)[an] nervousness and even the upset stomach. Eating too much sugar can also lead to (36)[about] weight gain. This makes many parents worry for (36)[for] the bad effects sugar and caffeine (37)[.] have on their children. "For the sake of the children's health, school canteens (38)[,] must not sell such drinks," complained a parent. Other parents feel that schools should encourage students to drink plain water instead.

(Source: https://newsforkids.net)`,
      },
      questions: [
        {
          id: "p2_g_q33",
          type: "A",
          topic: "Editing",
          questionNumber: 33,
          marks: 1,
          stem: "these drinks contain an (33)[extremlly] large amount of sugar",
          errorType: "spelling",
          errorWord: "extremlly",
          answer: "extremely",
          solution: {
            method: "Spelling — adverb from 'extreme'",
            steps: [
              "Adjective: extreme.",
              "Add '-ly' to form the adverb: extreme + ly = extremely.",
              "'extremlly' has a misplaced 'l' — the 'l' comes from 'extreme' itself, then 'ly' is added.",
              "Correct: e-x-t-r-e-m-e-l-y.",
            ],
            tip: "extreme → extremely (add -ly). Watch spelling: there is only one 'l' from 'extreme', then add 'ly' = two l's total: extreme-ly.",
          },
        },
        {
          id: "p2_g_q34",
          type: "A",
          topic: "Editing",
          questionNumber: 34,
          marks: 1,
          stem: "caffeine can be very (34)[harmfull] to health",
          errorType: "spelling",
          errorWord: "harmfull",
          answer: "harmful",
          solution: {
            method: "Spelling — suffix '-ful' (one l)",
            steps: [
              "Adjectives formed with '-ful' always have ONE 'l': harmful, beautiful, thankful, careful.",
              "Common mistake: writing '-full' (two l's) — this is ALWAYS wrong when used as a suffix.",
              "Correct: harm + ful = harmful.",
            ],
            tip: "Suffix '-ful' = ONE 'l' only: harmful, careful, hopeful, wonderful. Never '-full'.",
          },
        },
        {
          id: "p2_g_q35",
          type: "A",
          topic: "Editing",
          questionNumber: 35,
          marks: 1,
          stem: "nervousness and even (35)[the] upset stomach",
          errorType: "grammar",
          errorWord: "the",
          answer: "an",
          solution: {
            method: "Article usage — 'an' before vowel sound",
            steps: [
              "'Upset' begins with a vowel sound (short 'u').",
              "Before a vowel sound, the indefinite article 'a' becomes 'an'.",
              "Correct: an upset stomach.",
              "'the' is a definite article — used for specific nouns already known to the reader. Not appropriate here.",
            ],
            tip: "Use 'an' before vowel sounds: an upset, an apple, an hour (silent h). 'The' is for specific known nouns.",
          },
        },
        {
          id: "p2_g_q36",
          type: "A",
          topic: "Editing",
          questionNumber: 36,
          marks: 1,
          stem: "many parents worry (36)[for] the bad effects",
          errorType: "grammar",
          errorWord: "for",
          answer: "about",
          solution: {
            method: "Verb-preposition collocation — 'worry about'",
            steps: [
              "The correct collocation is 'worry about something'.",
              "'Worry about' = feel anxious or concerned regarding something.",
              "'Worry for' is non-standard in this context.",
              "Correct: parents worry about the bad effects.",
            ],
            tip: "Fixed collocation: worry ABOUT something (not worry for). I'm worried about you. They worry about the future.",
          },
        },
        {
          id: "p2_g_q37",
          type: "A",
          topic: "Editing",
          questionNumber: 37,
          marks: 1,
          stem: "sugar and caffeine (37)[.] have on their children",
          errorType: "punctuation",
          errorWord: "wrong punctuation mark",
          answer: "correct punctuation: no period mid-sentence",
          solution: {
            method: "Sentence flow — no full stop in the middle of a sentence",
            steps: [
              "The passage reads: 'the bad effects sugar and caffeine have on their children.'",
              "This is one continuous relative clause: 'the bad effects [that] sugar and caffeine have on their children'.",
              "A full stop here would incorrectly break the sentence.",
              "In the editing exercise, the error shown is an extra full stop (period) that should not be there.",
            ],
            tip: "Never place a full stop in the middle of a sentence. Relative clauses ('that sugar and caffeine have') should not be separated from their antecedent.",
          },
        },
        {
          id: "p2_g_q38",
          type: "A",
          topic: "Editing",
          questionNumber: 38,
          marks: 1,
          stem: '"For the sake of the children\'s health, school canteens (38)[,] must not sell such drinks," complained a parent.',
          errorType: "punctuation",
          errorWord: "missing comma after closing quote for mid-sentence attribution",
          answer: ',"',
          solution: {
            method: "Punctuation — comma inside closing speech mark before attribution",
            steps: [
              "The speech 'For the sake… such drinks' is a statement, followed by the attribution 'complained a parent'.",
              "When a statement is followed by an attribution tag, put a comma inside the closing quotation mark.",
              "Correct: '…must not sell such drinks,' complained a parent.",
              "The blank shows the missing comma before the closing quotation mark.",
            ],
            tip: "Speech punctuation: 'Statement,' attribution verb. Comma goes INSIDE the closing quote mark.",
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
        title: "The Two Cats and the Monkey",
        text: `Two cats were rummaging through the dustbins in a park. It had been days since they had last eaten. Suddenly, they spotted a loaf of bread lying beneath a tree. With a last ounce of energy, they pounced on it and grabbed the bread at the same time.

"It's mine as I stepped on it first," claimed one cat.

"I saw it first and so it belongs to me!" said the other cat.

A monkey sitting on the branch of the tree heard their quarrel. He scurried down and offered to help the cats solve their problem. Gladly, they accepted it.

The monkey smiled and broke the loaf of bread into two pieces. However, one piece was bigger than the other. So, he took a bite from the bigger piece in an attempt to make both pieces equal. Unfortunately, the bite he had taken was too big and the bigger piece now became smaller than the other. The two cats sat in front of the monkey. They watched in horror as the bread continued to shrink in size with each of the monkey's bite. When the monkey had finished the entire loaf, it jumped onto the tree and disappeared.

(Adapted from: http://www.english-for-students.com)`,
      },
      questions: [
        {
          id: "p2_h_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 2,
          stem: "Where did the cats find the loaf of bread?",
          answer: "The cats found the loaf of bread beneath a tree in the park.",
          solution: {
            method: "Locate specific information",
            steps: [
              "Passage: 'they spotted a loaf of bread lying beneath a tree'.",
              "Setting established: 'a park'.",
              "Full answer: They found it beneath/under a tree in the park.",
            ],
            tip: "Include ALL location details: beneath a tree AND in a park. One detail alone may not receive full marks.",
          },
        },
        {
          id: "p2_h_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 2,
          stem: "What does 'it' in line 9 refer to?",
          answer: "'It' refers to the monkey's offer to help the cats solve their problem.",
          solution: {
            method: "Pronoun reference — what does the pronoun refer back to?",
            steps: [
              "Line 9: 'Gladly, they accepted it.'",
              "What did they accept? Look at the preceding sentence.",
              "Previous sentence: 'he… offered to help the cats solve their problem.'",
              "'it' = the monkey's offer to help / the offer to solve their problem.",
            ],
            tip: "For pronoun reference questions, always look at the sentence BEFORE the pronoun to find what it refers to.",
          },
        },
        {
          id: "p2_h_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 2,
          stem: "Which sentence in the passage tells you that the cats were shocked at their misfortune?",
          answer: "They watched in horror as the bread continued to shrink in size with each of the monkey's bite.",
          solution: {
            method: "Locate sentence showing emotion",
            steps: [
              "Look for words/phrases showing shock: 'horror', 'in dismay', 'in disbelief'.",
              "Passage: 'They watched in horror as the bread continued to shrink in size with each of the monkey's bite.'",
              "'Watched in horror' = were horrified/shocked.",
              "This is a direct quote from the passage — copy it accurately.",
            ],
            tip: "For 'which sentence shows…' questions, find the sentence with the emotion word that matches. Quote it accurately.",
          },
        },
        {
          id: "p2_h_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 2,
          stem: "Did the cats regret what they had done? Give a reason to support your answer.",
          answer: "Yes, the cats regretted what they had done. They accepted the monkey's help to share the bread, but the monkey ate the entire loaf, leaving them with no food at all. If they had shared the bread themselves, they would have had food to eat.",
          solution: {
            method: "Inference with evidence",
            steps: [
              "The cats' quarrel over the bread led them to accept the monkey's 'help'.",
              "As a result, the monkey ate all the bread and they got nothing.",
              "They ended up worse off than if they had simply shared — so yes, they would regret it.",
              "Reason: their argument caused the monkey to eat all their food.",
            ],
            tip: "For opinion + reason questions, clearly state YES/NO, then give a specific reason from the passage to support it.",
          },
        },
      ],
    },
  ],
};

export default paper;
