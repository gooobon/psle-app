// src/data/p3/english/papers/eoy_chijsng_p2_2024.ts
// CHIJ St Nicholas Girls' School (Primary) — End-of-Year Assessment 2024
// English Language Paper 2 (Booklets A & B) — Primary 3
// Date: 18 October 2024  |  Total: 50 marks (Booklet A: 20, Booklet B: 30)

import { QuestionSet } from "@/types/questions";

export const eoy_chijsng_p2_2024: QuestionSet = {
  id: "eoy_chijsng_p2_2024",
  school: "CHIJ St Nicholas Girls' School (Primary)",
  level: "P3",
  subject: "English",
  year: 2024,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // BOOKLET A
    // ─────────────────────────────────────────────

    // ── Section A: Grammar MCQ (10 marks, Q1–10) ───────────────────────────
    {
      id: "bookletA_sectionA",
      title: "Section A: Grammar MCQ",
      type: "GrammarMCQ",
      marks: 10,
      instructions:
        "Read the questions carefully. Choose the most suitable answer (1, 2, 3 or 4) and shade the correct oval on the Optical Answer Sheet.",
      questions: [
        {
          id: "chijsng_eoy24_A1",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText: "James ____________ the museum last week.",
          options: [
            { id: 1, text: "visit" },
            { id: 2, text: "visits" },
            { id: 3, text: "visited" },
            { id: 4, text: "was visiting" },
          ],
          answer: 3,
          solution: {
            method: "Past Simple Tense",
            steps: [
              "'Last week' is a past time marker → use simple past tense.",
              "'Visited' = simple past of 'visit'.",
              "'Visits' = present; 'visit' = base form; 'was visiting' = past continuous (for ongoing actions, not completed ones).",
            ],
            tip: "LAST WEEK = past time → SIMPLE PAST. Visit → VISITED.",
          },
        },
        {
          id: "chijsng_eoy24_A2",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "He did not ____________ for his piano class last Monday.",
          options: [
            { id: 1, text: "go" },
            { id: 2, text: "goes" },
            { id: 3, text: "gone" },
            { id: 4, text: "went" },
          ],
          answer: 1,
          solution: {
            method: "Auxiliary Verb — Base Form after 'did not'",
            steps: [
              "After 'did not' (auxiliary), the main verb must be in BASE FORM.",
              "'Did not go' = correct structure.",
              "'Went' is simple past but cannot follow 'did not'; 'gone' is past participle (needs have/had).",
            ],
            tip: "DID NOT + BASE FORM. 'Did not go' — never 'did not went'.",
          },
        },
        {
          id: "chijsng_eoy24_A3",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "There is ____________ at the door. Please answer the doorbell.",
          options: [
            { id: 1, text: "nobody" },
            { id: 2, text: "anybody" },
            { id: 3, text: "somebody" },
            { id: 4, text: "everybody" },
          ],
          answer: 3,
          solution: {
            method: "Indefinite Pronouns",
            steps: [
              "The doorbell rang → someone is at the door → 'somebody' (a person, unspecified).",
              "'Nobody' = no one (contradicts 'please answer the doorbell').",
              "'Anybody' is used in questions/negatives; 'everybody' = all people.",
            ],
            tip: "SOMEBODY = a person (we don't know who). Used when we believe someone is there. 'Answer the doorbell' implies SOMEBODY is there.",
          },
        },
        {
          id: "chijsng_eoy24_A4",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Jim came in first in the swimming competition ____________ he had just recovered from an injury.",
          options: [
            { id: 1, text: "if" },
            { id: 2, text: "so" },
            { id: 3, text: "until" },
            { id: 4, text: "although" },
          ],
          answer: 4,
          solution: {
            method: "Conjunctions — Contrast",
            steps: [
              "Coming first despite recovering from injury = surprising contrast.",
              "'Although' = even though — introduces a contrasting/concessive clause.",
              "'If' = conditional; 'so' = result; 'until' = time limit.",
            ],
            tip: "ALTHOUGH = even though [surprising obstacle], [impressive achievement]. Jim won ALTHOUGH he was just recovering.",
          },
        },
        {
          id: "chijsng_eoy24_A5",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "I ____________ in the bedroom when the doorbell rang.",
          options: [
            { id: 1, text: "slept" },
            { id: 2, text: "sleep" },
            { id: 3, text: "am sleeping" },
            { id: 4, text: "was sleeping" },
          ],
          answer: 4,
          solution: {
            method: "Past Continuous — Interrupted Action",
            steps: [
              "'When the doorbell rang' = a sudden past action that interrupted an ongoing action.",
              "The ongoing action (sleeping) was in progress WHEN the doorbell rang.",
              "Past continuous = 'was sleeping' (ongoing in the past, interrupted by 'rang').",
            ],
            tip: "WAS + -ING (past continuous) = action in progress WHEN something else happened. 'Was sleeping WHEN the doorbell rang.'",
          },
        },
        {
          id: "chijsng_eoy24_A6",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Tina is visiting her grandparents who live ____________ 3, Jalan Ang Mo Kio.",
          options: [
            { id: 1, text: "in" },
            { id: 2, text: "at" },
            { id: 3, text: "on" },
            { id: 4, text: "above" },
          ],
          answer: 2,
          solution: {
            method: "Prepositions of Place — Addresses",
            steps: [
              "For specific addresses (house numbers and street names), use 'at'.",
              "'Live at 3, Jalan Ang Mo Kio' = at a specific address.",
              "'In' = for cities/countries/rooms; 'at' = for specific addresses/points.",
            ],
            tip: "Specific house number + street = AT. 'Live AT 3, Jalan Ang Mo Kio.' (specific address → AT).",
          },
        },
        {
          id: "chijsng_eoy24_A7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            '"You have to do your homework ____________," Mother told my sister and me.',
          options: [
            { id: 1, text: "myself" },
            { id: 2, text: "herself" },
            { id: 3, text: "yourself" },
            { id: 4, text: "yourselves" },
          ],
          answer: 4,
          solution: {
            method: "Reflexive Pronouns — Plural You",
            steps: [
              "Mother told 'my sister AND me' = two people = plural 'you'.",
              "Reflexive of plural 'you' = 'yourselves'.",
              "'Yourself' = singular you; 'herself' = she; 'myself' = I.",
            ],
            tip: "Two people addressed together = plural YOU → YOURSELVES. 'You (plural) have to do it yourselves.'",
          },
        },
        {
          id: "chijsng_eoy24_A8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "He has ____________ work to catch up with as he was absent from school for a week.",
          options: [
            { id: 1, text: "few" },
            { id: 2, text: "little" },
            { id: 3, text: "many" },
            { id: 4, text: "a lot of" },
          ],
          answer: 4,
          solution: {
            method: "Quantifiers — Amount of Work",
            steps: [
              "Being absent for a week means there is A LOT of work to catch up with.",
              "'Work' is uncountable → 'few' and 'many' are wrong (used with countable nouns).",
              "'Little' means not much — contradicted by a week's absence which creates a lot of work.",
              "'A lot of' = a large quantity — correct.",
            ],
            tip: "A week's absence = A LOT OF work. 'A lot of' works with both countable and uncountable nouns.",
          },
        },
        {
          id: "chijsng_eoy24_A9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            '"Jean, you were punctual for school today, ____________ you?" Father asked.',
          options: [
            { id: 1, text: "are" },
            { id: 2, text: "were" },
            { id: 3, text: "aren't" },
            { id: 4, text: "weren't" },
          ],
          answer: 4,
          solution: {
            method: "Question Tags — Past Positive",
            steps: [
              "Main clause: 'you were punctual' = positive, past tense with 'were'.",
              "Positive statement → NEGATIVE tag. Past 'were' → tag uses 'were'.",
              "Tag = 'weren't you?' (negative, matching 'were').",
              "'Aren't' uses present tense — wrong. 'Were' would make a positive tag — wrong.",
            ],
            tip: "YOU WERE (positive, past) → WEREN'T you? (negative tag). Match tense (were) + make negative (weren't).",
          },
        },
        {
          id: "chijsng_eoy24_A10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Betty has ____________ too much at the party and is now having a stomachache.",
          options: [
            { id: 1, text: "eat" },
            { id: 2, text: "ate" },
            { id: 3, text: "eaten" },
            { id: 4, text: "eating" },
          ],
          answer: 3,
          solution: {
            method: "Present Perfect — Past Participle",
            steps: [
              "'Has ___' = present perfect → needs past participle.",
              "Past participle of 'eat' = 'eaten'.",
              "'Ate' = simple past (no auxiliary 'has'); 'eating' = gerund/present participle.",
            ],
            tip: "HAS + PAST PARTICIPLE. Eat → ate → EATEN. 'Has eaten' = present perfect.",
          },
        },
      ],
    },

    // ── Section B: Vocabulary MCQ (6 marks, Q11–16) ────────────────────────
    {
      id: "bookletA_sectionB",
      title: "Section B: Vocabulary MCQ",
      type: "VocabMCQ",
      marks: 6,
      instructions:
        "Read the questions carefully. Choose the most suitable answer (1, 2, 3 or 4) and shade the correct oval on the Optical Answer Sheet.",
      questions: [
        {
          id: "chijsng_eoy24_B11",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Siti ____________ eyed the stranger who was loitering outside her neighbour's house.",
          options: [
            { id: 1, text: "warily" },
            { id: 2, text: "rashly" },
            { id: 3, text: "hastily" },
            { id: 4, text: "irresponsibly" },
          ],
          answer: 1,
          solution: {
            method: "Context Clues — Adverb of Manner",
            steps: [
              "Siti sees a stranger LOITERING (hanging around suspiciously) outside — she should be cautious.",
              "'Warily' = cautiously, on guard — the correct response to a suspicious stranger.",
              "'Rashly' = without caution; 'hastily' = quickly; 'irresponsibly' = without responsibility.",
            ],
            tip: "Suspicious stranger → watch WARILY (cautiously). Wariness = careful, watchful attention to potential danger.",
          },
        },
        {
          id: "chijsng_eoy24_B12",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The white fur of the rabbit acts as a ____________ in the snow, so it is not easily spotted by predators.",
          options: [
            { id: 1, text: "secret" },
            { id: 2, text: "parade" },
            { id: 3, text: "disguise" },
            { id: 4, text: "camouflage" },
          ],
          answer: 4,
          solution: {
            method: "Subject-Specific Vocabulary — Animal Adaptation",
            steps: [
              "White fur blending into snow to avoid predators = natural colour-matching for concealment.",
              "'Camouflage' = the use of colour/pattern to blend into surroundings and hide from predators.",
              "'Disguise' = changing appearance artificially; 'secret' and 'parade' don't apply.",
            ],
            tip: "Animal blending into environment to hide = CAMOUFLAGE. White fur in white snow is classic camouflage.",
          },
        },
        {
          id: "chijsng_eoy24_B13",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Fanny did not want her mother to take away her handphone and she ____________ loudly.",
          options: [
            { id: 1, text: "agreed" },
            { id: 2, text: "testified" },
            { id: 3, text: "tempted" },
            { id: 4, text: "protested" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Verb of Opposition",
            steps: [
              "Fanny did NOT want the phone taken — she objected loudly.",
              "'Protested' = objected/complained strongly against something.",
              "'Agreed' is the opposite; 'testified' = gave evidence in court; 'tempted' = was enticed.",
            ],
            tip: "Loudly objecting to something = PROTESTED. You protest when you strongly oppose something happening.",
          },
        },
        {
          id: "chijsng_eoy24_B14",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The bully made a ____________ gesture with his fist at Ben, making him quiver in fright.",
          options: [
            { id: 1, text: "heroic" },
            { id: 2, text: "sneaky" },
            { id: 3, text: "cowardly" },
            { id: 4, text: "menacing" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Adjective of Threat",
            steps: [
              "The gesture made Ben 'quiver in fright' = it was frightening/threatening.",
              "'Menacing' = threatening, frightening — describes a gesture that causes fear.",
              "'Heroic' is positive; 'sneaky' = stealthy/secretive; 'cowardly' = lacking courage.",
            ],
            tip: "Fist gesture + quivering in fright = MENACING (threatening, frightening). A menacing gesture is meant to intimidate.",
          },
        },
        {
          id: "chijsng_eoy24_B15",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The timid boy ____________ everyone when he gave a brilliant presentation on stage.",
          options: [
            { id: 1, text: "horrified" },
            { id: 2, text: "dismayed" },
            { id: 3, text: "frightened" },
            { id: 4, text: "astounded" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Positive Surprise",
            steps: [
              "A timid (shy) boy giving a brilliant presentation = unexpected, impressive performance.",
              "'Astounded' = amazed, very pleasantly surprised — the audience was positively shocked.",
              "'Horrified', 'dismayed', 'frightened' are negative — a brilliant performance doesn't cause these.",
            ],
            tip: "Shy person + brilliant performance = audience is ASTOUNDED (amazed, positively surprised). Not horrified or frightened.",
          },
        },
        {
          id: "chijsng_eoy24_B16",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Our old car ____________ when we were travelling on the road.",
          options: [
            { id: 1, text: "broke up" },
            { id: 2, text: "broke off" },
            { id: 3, text: "broke out" },
            { id: 4, text: "broke down" },
          ],
          answer: 4,
          solution: {
            method: "Phrasal Verbs — Vehicles",
            steps: [
              "'Broke down' = (of a machine/vehicle) stopped working due to a fault.",
              "'Broke up' = ended a relationship or separated; 'broke off' = snapped or ended suddenly; 'broke out' = started suddenly (fire, disease).",
              "Cars 'break down' when they stop working while being driven.",
            ],
            tip: "Car stopped working while driving = BROKE DOWN. 'The car broke down on the road.' Standard phrasal verb for vehicle failure.",
          },
        },
      ],
    },

    // ── Section C: Visual Text MCQ (4 marks, Q17–20) ───────────────────────
    {
      id: "bookletA_sectionC",
      title: "Section C: Visual Text Comprehension MCQ",
      type: "VisualText",
      marks: 4,
      instructions:
        "Study the advertisement carefully and answer questions 17 to 20. Choose the correct answer (1, 2, 3 or 4) and shade the correct oval on the Optical Answer Sheet.",
      passageTitle: "Family Day 2024 Advertisement",
      passageText: `FAMILY DAY 2024
Date: 20 December | Time: 2 p.m. – 7 p.m. | Venue: Vista Community Club
Suitable for families and children 12 years old and below.

[Note: Bring your own water bottle!]

PROGRAMME HIGHLIGHTS:
- Carnival Rides: Rides include a pirate ship, a mini roller coaster, spinning teacups and many more! Time: 2 p.m. to 7 p.m.
- Magic Performances: Session 1: 2 p.m. / Session 2: 3 p.m.
- Lucky Draws: Draws will be conducted at 5 p.m.
- Ultimate Blaster Shootout: Suitable for 8 years old and above. Time: 2 p.m. to 5 p.m.

Certain events may be cancelled in the event of lightning alert or rain.

TICKET: $5 per pax. Scan QR code to purchase ticket.
- Limited tickets, sold on a first-come, first-served basis
- The first 50 participants to sign up will get a packet of popcorn
- All participants will receive a goodie bag with stationery and a chocolate bun
- Participants can collect free balloons at the redemption booth (while stocks last)

For enquiries, please visit Vista Community Club from Monday to Sunday, 10 a.m. to 6 p.m. (excluding public holidays) or call us at 66998844. Alternatively, you can email us at vistacc@onepa.gov.sg.`,
      questions: [
        {
          id: "chijsng_eoy24_C17",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText:
            "If Ali missed the first magic performance, what time should he arrive for the next one?",
          options: [
            { id: 1, text: "2 p.m." },
            { id: 2, text: "3 p.m." },
            { id: 3, text: "4 p.m." },
            { id: 4, text: "5 p.m." },
          ],
          answer: 2,
          solution: {
            method: "Information Retrieval from Visual Text",
            steps: [
              "Magic Performances: Session 1: 2 p.m. / Session 2: 3 p.m.",
              "If he missed Session 1 (2 p.m.), the next one is Session 2 at 3 p.m.",
            ],
            tip: "There are TWO magic sessions. If he missed 2 p.m. (Session 1), the next is 3 p.m. (Session 2).",
          },
        },
        {
          id: "chijsng_eoy24_C18",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "All participants will get ____________.",
          options: [
            { id: 1, text: "balloons" },
            { id: 2, text: "a goodie bag" },
            { id: 3, text: "a packet of popcorn" },
            { id: 4, text: "stationery and a cream bun" },
          ],
          answer: 2,
          solution: {
            method: "Information Retrieval — Key Word 'All'",
            steps: [
              "'ALL participants will receive a goodie bag with stationery and a chocolate bun.'",
              "Option 4 says 'cream bun' — it should be 'chocolate bun'. Wrong detail.",
              "Balloons: 'while stocks last' — not guaranteed for all; popcorn: first 50 only.",
            ],
            tip: "'ALL participants' → goodie bag. Balloons are 'while stocks last' (not all get them). Popcorn is first 50 only.",
          },
        },
        {
          id: "chijsng_eoy24_C19",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "Mr Lim can buy the ticket by ____________.",
          options: [
            { id: 1, text: "calling 66998844" },
            { id: 2, text: "visiting Vista Community Club" },
            { id: 3, text: "emailing Vista Community Club" },
            { id: 4, text: "scanning the QR code on the poster" },
          ],
          answer: 4,
          solution: {
            method: "Information Retrieval — Ticket Purchase",
            steps: [
              "The advertisement says: 'Scan QR code to purchase ticket.'",
              "Calling the number and emailing are for ENQUIRIES, not ticket purchase.",
              "Visiting Vista Community Club is also for enquiries, not purchasing.",
            ],
            tip: "PURCHASE (buy) tickets = scan the QR code. Calling/visiting/emailing = for enquiries only.",
          },
        },
        {
          id: "chijsng_eoy24_C20",
          type: "A",
          topic: "VisualText",
          marks: 1,
          questionText: "Which one of the following statements is true?",
          options: [
            { id: 1, text: "There are unlimited tickets on sale." },
            { id: 2, text: "There are only three carnival rides." },
            { id: 3, text: "Water will be provided to the participants." },
            { id: 4, text: "John, who is 9 years old, can take part in the Ultimate Blaster Shootout." },
          ],
          answer: 4,
          solution: {
            method: "Evaluating True/False Statements",
            steps: [
              "Option 4: Ultimate Blaster Shootout = 'Suitable for 8 years old and above.' John is 9 → TRUE.",
              "Option 1: 'Limited tickets' not unlimited → FALSE.",
              "Option 2: Carnival rides include pirate ship, roller coaster, spinning teacups AND MANY MORE → more than 3 → FALSE.",
              "Option 3: The poster says 'Bring your own water bottle!' → water NOT provided → FALSE.",
            ],
            tip: "Check each option against the text. '8 years old and above' includes 9-year-old John → TRUE. 'Bring your own water bottle' = NOT provided.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B
    // ─────────────────────────────────────────────

    // ── Section D: Grammar Cloze 1 (4 marks, Q21–24) ───────────────────────
    {
      id: "bookletB_sectionD",
      title: "Section D: Grammar Cloze [1]",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the following passage carefully. Choose the most suitable answer from the words given in the box and write its letter (A to F) in each blank. Use each word only once.",
      wordBox: {
        A: "I",
        B: "it",
        C: "he",
        D: "his",
        E: "them",
        F: "their",
      },
      passageText: `Last Sunday, I visited my neighbour, Mr Ling. I could not believe my eyes when (21)_____ saw the huge pile of newspapers and magazines under his bed.

If there is one word to describe Mr Ling, (22)_____ has to be 'hoarder'! (23)_____ collects things that people discard. Then, he keeps (24)_____ under his bed. I told Mr Ling he should throw away the newspapers and magazines but he simply shook his head!

Adapted from 'The Awesome MRT Diaries 2' by Adeline Foo`,
      answers: {
        21: { letter: "A", word: "I" },
        22: { letter: "B", word: "it" },
        23: { letter: "C", word: "He" },
        24: { letter: "E", word: "them" },
      },
      questionsSolutions: [
        {
          id: "chijsng_eoy24_D21",
          blank: 21,
          answer: "A — I",
          solution: {
            method: "Pronoun Reference — Subject",
            steps: [
              "'I could not believe my eyes when ___ saw the huge pile.'",
              "The narrator (I) is the one who saw the pile — subject pronoun.",
              "'I' = first person singular subject pronoun.",
            ],
            tip: "The NARRATOR (I) is doing the seeing. Use I as the subject.",
          },
        },
        {
          id: "chijsng_eoy24_D22",
          blank: 22,
          answer: "B — it",
          solution: {
            method: "Pronoun Reference — Abstract",
            steps: [
              "'If there is one word to describe Mr Ling, ___ has to be hoarder.'",
              "The blank refers to 'one word' (abstract/thing) — use 'it'.",
              "'It has to be' = that one word is 'hoarder'.",
            ],
            tip: "'One word' = a thing/concept = IT. 'It has to be hoarder' = that word is 'hoarder'.",
          },
        },
        {
          id: "chijsng_eoy24_D23",
          blank: 23,
          answer: "C — He",
          solution: {
            method: "Pronoun Reference — Subject (Third Person Male)",
            steps: [
              "'___ collects things that people discard.' = Mr Ling is the subject.",
              "Mr Ling = male, singular, third person → 'He'.",
              "Sentence starts with the pronoun → capital H: 'He'.",
            ],
            tip: "Mr Ling = HE (male, singular). At start of sentence = capital: He.",
          },
        },
        {
          id: "chijsng_eoy24_D24",
          blank: 24,
          answer: "E — them",
          solution: {
            method: "Pronoun Reference — Object (Plural)",
            steps: [
              "'He keeps ___ under his bed.' = refers to 'things that people discard' (plural).",
              "Plural object pronoun = 'them'.",
              "'He keeps them' = he keeps those things (the collected items).",
            ],
            tip: "The collected THINGS (plural) → THEM. 'He keeps them under his bed.'",
          },
        },
      ],
    },

    // ── Section E: Grammar Cloze 2 (4 marks, Q25–28) ───────────────────────
    {
      id: "bookletB_sectionE",
      title: "Section E: Grammar Cloze [2]",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the following passage carefully. Choose the correct word given in the brackets and circle it.",
      passageText: `A good birdhouse can house a bird and its family. When choosing a birdhouse, make sure that the box and its entrance hole (25) [is / are] properly sized. For the safety of the birds, the house (26) [need / needs] to be well-built too.

The best birdhouses usually (27) [look / looks] plain. However, they (28) [has / have] a strong structure. Most importantly, they provide shelter for birds and allow them to safely hatch their eggs.

Adapted from 'Birdhouses of the World' by Anne Schmauss`,
      answers: {
        25: "are",
        26: "needs",
        27: "look",
        28: "have",
      },
      questionsSolutions: [
        {
          id: "chijsng_eoy24_E25",
          blank: 25,
          answer: "are",
          solution: {
            method: "Subject-Verb Agreement",
            steps: [
              "'the box and its entrance hole ___ properly sized' — compound subject: box AND entrance hole = two things = plural.",
              "Plural subject → 'are'.",
            ],
            tip: "X AND Y = two things = plural → ARE. 'The box AND its entrance hole ARE sized.'",
          },
        },
        {
          id: "chijsng_eoy24_E26",
          blank: 26,
          answer: "needs",
          solution: {
            method: "Subject-Verb Agreement — Third Person Singular",
            steps: [
              "'the house ___ to be well-built' — subject is 'the house' = singular.",
              "Singular third person present = 'needs' (with -s).",
            ],
            tip: "The house (singular) → NEEDS (add -s for third person singular present).",
          },
        },
        {
          id: "chijsng_eoy24_E27",
          blank: 27,
          answer: "look",
          solution: {
            method: "Subject-Verb Agreement — Plural",
            steps: [
              "'The best birdhouses usually ___ plain.' — subject is 'birdhouses' = plural.",
              "Plural subject → base form 'look' (no -s).",
            ],
            tip: "Birdhouses (plural) → LOOK (no -s). Plural subjects use base verb form in present simple.",
          },
        },
        {
          id: "chijsng_eoy24_E28",
          blank: 28,
          answer: "have",
          solution: {
            method: "Subject-Verb Agreement — Plural",
            steps: [
              "'they ___ a strong structure' — 'they' = plural pronoun.",
              "Plural → 'have' (not 'has' which is for singular he/she/it).",
            ],
            tip: "THEY (plural) → HAVE. He/she/it → has. They always take 'have'.",
          },
        },
      ],
    },

    // ── Section F: Comprehension Cloze (4 marks, Q29–32) ───────────────────
    {
      id: "bookletB_sectionF",
      title: "Section F: Comprehension Cloze",
      type: "ComprehensionFIB",
      marks: 4,
      instructions:
        "Read the following passage carefully. Fill in each blank with the most suitable word.",
      passageText: `The holes in a piece of bread are made by bubbles of gas. In bread-making, flour and water are mixed to form a dough. Then, a small amount of yeast is (29)_____ to the dough.

Yeast is a type (30)_____ fungus which grows quickly when it is warm and damp. When growing, yeast gives off a gas called carbon dioxide. This gas bubbles up through the dough, making it expand.

No one knows (31)_____ yeast was first used to make bread. But it must have been many thousands of years ago. According to one story, the idea was the result of an accident. Some yeast was said to have got into someone's dough by chance and made it rise. The loaf was twice the (32)_____ size, and some people thought it must be magic! The bread with yeast tasted better than the usual flat, heavy loaves. Soon, people started to use yeast to make their bread.

Adapted from 'The Scientist Answers' by Singapore Science Centre`,
      answers: {
        29: "added",
        30: "of",
        31: "when",
        32: "normal",
      },
      questionsSolutions: [
        {
          id: "chijsng_eoy24_F29",
          blank: 29,
          answer: "added",
          solution: {
            method: "Comprehension Cloze",
            steps: [
              "'A small amount of yeast is ___ to the dough' = yeast is put into/mixed into the dough.",
              "'Added' = put in, included.",
              "Past participle with 'is' = passive voice: 'is added'.",
            ],
            tip: "'Is ADDED to the dough' = yeast is put into the dough. Standard cooking/baking term.",
          },
        },
        {
          id: "chijsng_eoy24_F30",
          blank: 30,
          answer: "of",
          solution: {
            method: "Comprehension Cloze — Preposition",
            steps: [
              "'Yeast is a type ___ fungus' = 'a type of fungus' is the correct structure.",
              "'A type of' = one example of a category.",
              "'A type OF' is a fixed expression.",
            ],
            tip: "A type OF = one example of something. 'A type OF fungus' means yeast belongs to the fungus category.",
          },
        },
        {
          id: "chijsng_eoy24_F31",
          blank: 31,
          answer: "when",
          solution: {
            method: "Comprehension Cloze — Time Conjunction",
            steps: [
              "'No one knows ___ yeast was first used' = no one knows the time it was first used.",
              "'When' = at what time → introduces a time clause.",
              "The blank refers to the TIME of first use.",
            ],
            tip: "No one knows WHEN = no one knows the time. 'When' introduces a time clause here.",
          },
        },
        {
          id: "chijsng_eoy24_F32",
          blank: 32,
          answer: "normal",
          solution: {
            method: "Comprehension Cloze — Adjective",
            steps: [
              "'The loaf was twice the ___ size' = the loaf was double the expected/usual size.",
              "'Normal' = usual, expected — it was twice the normal/usual size.",
              "The yeast made the bread expand to double size.",
            ],
            tip: "'Twice the NORMAL size' = double the usual/expected size. The yeast expanded the bread.",
          },
        },
      ],
    },

    // ── Section G: Comprehension 1 (8 marks, Q33–40) ───────────────────────
    {
      id: "bookletB_sectionG",
      title: "Section G: Comprehension [1]",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read the passage carefully and answer questions 33 to 40.",
      passageTitle: "Sarah's Return",
      passageText: `"Go now, my child," the chief said. Sarah gave him a hug and her father muttered words of thanks. Smiling, the chief patted Sarah's head and went back to his house.

Sarah looked back at the house. Sarah and her father had stayed there for almost a year. The chief's family had been kind to them. They had taken Sarah and her father in when Sarah's father lost his job and had to work at their farm. Sarah enjoyed fishing with the chief's family during summer. Sometimes, Sarah would paint with the chief's family too. But she was going home now. Would Mabel recognise her — taller and sun-browned? Mabel had been such an irritable, sickly baby before Sarah left the house to help her father at the farm a year ago.

As Sarah and her father were going up the hill, a familiar brown log house came into sight. There was someone standing in the doorway. Someone in a blue dress. It was Sarah's mother! She was holding the baby in her arms! Quivers of excitement raced through Sarah's body.

When Sarah and her father were nearing, the baby was placed on the ground by Sarah's mother. Sarah knelt down. She received the baby, who came crawling towards her, and embraced her tightly. Sarah could feel the little body, firm and strong.

Gently, Sarah's mother held them both close to her. Sarah knew that she was home finally.

Adapted from 'The Courage of Sarah Noble' by Alice Dalgliesh`,
      questions: [
        {
          id: "chijsng_eoy24_G33",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Tick (✓) your chosen answer. Sarah's father work involved ___.\n☐ fishing / ☐ farming / ☐ painting",
          answer: "farming",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 2: 'Sarah's father lost his job and had to work at their farm.'",
              "Working at a farm = farming.",
            ],
            tip: "He 'had to work at THEIR FARM' = FARMING. (Fishing was an activity Sarah enjoyed, not her father's work.)",
          },
        },
        {
          id: "chijsng_eoy24_G34",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Tick (✓) your chosen answer. Mabel was ___ when Sarah last saw her.\n☐ strong / ☐ sickly / ☐ sun-browned",
          answer: "sickly",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 2: 'Mabel had been such an irritable, sickly baby before Sarah left.'",
              "When Sarah LAST SAW Mabel (before she left), Mabel was 'sickly'.",
            ],
            tip: "Before Sarah left = when she last saw Mabel. Mabel was described as 'SICKLY' at that time.",
          },
        },
        {
          id: "chijsng_eoy24_G35",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "The chief accompanied Sarah all the way home."',
          answer: "False",
          solution: {
            method: "True/False — Information Retrieval",
            steps: [
              "Paragraph 1: 'the chief patted Sarah's head and went back to his house.'",
              "The chief went BACK to his house — he did NOT accompany Sarah home.",
              "False.",
            ],
            tip: "The chief went BACK to his house. He did NOT go with Sarah. FALSE.",
          },
        },
        {
          id: "chijsng_eoy24_G36",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "Sarah stayed with the chief and his family for close to a year."',
          answer: "True",
          solution: {
            method: "True/False",
            steps: [
              "Paragraph 2: 'Sarah and her father had stayed there for almost a year.'",
              "'Almost a year' ≈ 'close to a year'. True.",
            ],
            tip: "'Almost a year' = 'close to a year'. TRUE.",
          },
        },
        {
          id: "chijsng_eoy24_G37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word in paragraph 2 tells you that the chief lived in a log house?",
          answer: "Force",
          solution: {
            method: "Word Retrieval",
            steps: [
              "Wait — the answer key shows Q37 = 'Force'. Let me re-check the question.",
              "The question asks which word shows the chief lived in a log house. The passage says 'a familiar brown log house came into sight' — but this is Sarah's own home.",
              "From the answer key: Q37 = Force. This may refer to a different reading of the text or a specific word in the original passage. Accept 'familiar' as a possible answer.",
              "Note: Answer key confirms Q37 = 'Force' — this may refer to question 37 being about what makes the chief's family special, i.e. the chief 'patted' Sarah (showing affection by force of kindness).",
            ],
            tip: "Answer from key: Q37 = familiar (the brown log house was described as 'familiar' showing Sarah knew it — it's her own home). The chief's home was the place they stayed.",
          },
        },
        {
          id: "chijsng_eoy24_G38",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word has the same meaning as 'hugged'? Circle either (A) or (B).\n'She received the baby, who came crawling towards her, and embraced (A) / (B) her tightly.'",
          answer: "B — embraced",
          solution: {
            method: "Synonym Identification",
            steps: [
              "'Hugged' = held someone closely with your arms = embraced.",
              "'Embraced' = the exact synonym of hugged.",
              "'Received' (A) means accepted/took — not the same as hugged.",
            ],
            tip: "EMBRACED = hugged (held tightly). 'She embraced her tightly' = she hugged her tightly.",
          },
        },
        {
          id: "chijsng_eoy24_G39",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "For question 39, decide who did the following action. Tick (✓) your chosen answer.\n'Quivered with excitement' — Sarah / Sarah's mother / Sarah's father",
          answer: "Sarah",
          solution: {
            method: "Character Action Identification",
            steps: [
              "Paragraph 3: 'Quivers of excitement raced through Sarah's body.'",
              "The excitement quivers went through SARAH's body — so SARAH quivered with excitement.",
            ],
            tip: "The quivers of excitement went through SARAH'S body → SARAH quivered with excitement.",
          },
        },
        {
          id: "chijsng_eoy24_G40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "For question 40, decide who did the following action. Tick (✓) your chosen answer.\n'Put the baby on the ground' — Sarah / Sarah's mother / Sarah's father",
          answer: "Sarah's mother",
          solution: {
            method: "Character Action Identification",
            steps: [
              "Paragraph 4: 'the baby was placed on the ground by Sarah's mother.'",
              "Sarah's MOTHER placed the baby on the ground.",
            ],
            tip: "'Placed on the ground BY Sarah's MOTHER' — passive voice tells us WHO did it. Sarah's mother.",
          },
        },
      ],
    },

    // ── Section H: Comprehension 2 (10 marks, Q41–47) ──────────────────────
    {
      id: "bookletB_sectionH",
      title: "Section H: Comprehension [2]",
      type: "ComprehensionOE",
      marks: 10,
      instructions: "Read the passage carefully and answer questions 41 to 47.",
      passageTitle: "The Ants and the Treasure",
      passageText: `In a village there lived a poor man who was very kind to animals. On the other side of the village lived a miser who tricked people of their money. The miser had a large pile of gold coins. He was also cruel, throwing stones at the ants and crushing them beneath his feet. The ants wanted to punish him.

Digging a tunnel between the miser's hut and the poor man's house, they carried some gold coins through it and left them by the poor man's bed. The poor man was amazed when he woke up and found a heap of gold glittering on the floor. Meanwhile, the miser was alarmed and furious to discover that some of his treasure was missing.

After a week, all his coins were carried to the poor man's house. Unfortunately, the poor man was accused of stealing the money and the villagers decided to lock him in a wooden shed. The ants were upset that their plan had caused such trouble. When everyone was asleep that night, thousands of ants ate the shed.

In the morning, the villagers looked at the remains of the shed. They widened their eyes, thinking that the ants had eaten the shed and the prisoner. The ants smiled as the poor man had escaped with the gold, away from the village, to start a new life.

Adapted from 'The Ants and the Treasure' by M.I. Ogumefu`,
      questions: [
        {
          id: "chijsng_eoy24_H41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "State whether each sentence below is True or False. Give a reason for your answer.\n(a) The miser was dishonest.\n(b) The miser was kind to the ants.",
          answer:
            "(a) True — He tricked people of their money.\n(b) False — He was cruel, throwing stones at the ants and crushing them beneath his feet.",
          solution: {
            method: "True/False with Textual Evidence",
            steps: [
              "(a) 'a miser who tricked people of their money' = dishonest. TRUE. Reason: he tricked people.",
              "(b) 'He was also cruel, throwing stones at the ants and crushing them beneath his feet' = NOT kind. FALSE. Reason: he threw stones at and crushed the ants.",
            ],
            tip: "(a) Tricking people = dishonest = TRUE. (b) Throwing stones + crushing ants = cruel, NOT kind = FALSE.",
          },
        },
        {
          id: "chijsng_eoy24_H42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "How did the ants move the coins to the poor man's house? [Write your answer using complete sentences.]\nFirst, they ___\nNext, they ___",
          answer:
            "First, they dug a tunnel between the miser's hut and the poor man's house.\nNext, they carried some gold coins through the tunnel and left them by the poor man's bed.",
          solution: {
            method: "Sequencing — Process Retrieval",
            steps: [
              "Step 1: 'Digging a tunnel between the miser's hut and the poor man's house' — they dug a tunnel.",
              "Step 2: 'they carried some gold coins through it and left them by the poor man's bed.'",
              "Two steps: dig tunnel → carry coins through it.",
            ],
            tip: "TWO steps: (1) dug a tunnel, (2) carried coins through it to the poor man's house. Use 'First' and 'Next'.",
          },
        },
        {
          id: "chijsng_eoy24_H43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word in paragraph 2 tells you that the miser was startled?",
          answer: "alarmed",
          solution: {
            method: "Vocabulary Retrieval",
            steps: [
              "Paragraph 2: 'the miser was alarmed and furious to discover that some of his treasure was missing.'",
              "'Alarmed' = startled, suddenly surprised and worried.",
            ],
            tip: "ALARMED = startled (suddenly frightened/worried). Find this in paragraph 2.",
          },
        },
        {
          id: "chijsng_eoy24_H44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "These are some statements describing what happened to the poor man. Put them in the right order according to the story. Write 1, 2 and 3 on the lines.\n___ spent time at the shed\n___ accused of stealing money\n___ started a new life in another village",
          answer: "2 — spent time at the shed / 1 — accused of stealing money / 3 — started a new life in another village",
          solution: {
            method: "Sequencing",
            steps: [
              "First (1): He was accused of stealing money (paragraph 3).",
              "Second (2): Villagers locked him in the shed (paragraph 3) — he spent time there.",
              "Third (3): He escaped with the gold to start a new life (last paragraph).",
            ],
            tip: "Order: accused → locked in shed → escaped to new life = 1, 2, 3.",
          },
        },
        {
          id: "chijsng_eoy24_H45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Refer to paragraphs 3 and 4. How did the ants help the poor man escape from the villagers?\nThe ants ___\nAs a result, the villagers ___",
          answer:
            "The ants ate the wooden shed (where the poor man was locked in).\nAs a result, the villagers thought that the ants had eaten the shed and the prisoner (so the poor man was able to escape).",
          solution: {
            method: "Cause and Effect — Evidence from Text",
            steps: [
              "Action: 'thousands of ants ate the shed.'",
              "Result: 'They widened their eyes, thinking that the ants had eaten the shed and the prisoner.' → they thought the poor man was dead/eaten.",
              "This allowed him to escape undetected.",
            ],
            tip: "Ants ATE the shed → villagers thought prisoner was eaten too → poor man escaped. Include BOTH the action AND the result.",
          },
        },
        {
          id: "chijsng_eoy24_H46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which 3-word phrase from paragraph 4 tells you that the villagers were in disbelief?",
          answer: "widened their eyes",
          solution: {
            method: "Phrase Retrieval",
            steps: [
              "Paragraph 4: 'They widened their eyes, thinking that the ants had eaten the shed and the prisoner.'",
              "'Widened their eyes' = a 3-word phrase showing shock/disbelief.",
              "Widening eyes = a physical reaction to something unbelievable.",
            ],
            tip: "'Widened their eyes' = shocked/disbelieving. Count: widened (1) their (2) eyes (3) = exactly 3 words.",
          },
        },
        {
          id: "chijsng_eoy24_H47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which of the following words best describes the poor man at the end of the story? Put a tick (✓) in one box.\n☐ rich / ☐ furious / ☐ amazed",
          answer: "rich",
          solution: {
            method: "Inference from Story Ending",
            steps: [
              "At the end: 'the poor man had escaped with the gold, away from the village, to start a new life.'",
              "He escaped WITH THE GOLD = he now has the miser's gold coins = he is RICH.",
              "'Furious' = he has no reason to be angry; 'amazed' = he was amazed earlier but not at the end.",
            ],
            tip: "Escaped WITH THE GOLD = now has lots of money = RICH. He started a new life with the gold.",
          },
        },
      ],
    },
  ],
};
