// src/data/p3/english/papers/eoy_scgs_p2_2024.ts
// Singapore Chinese Girls' School (SCGS) — Second Semestral Assessment 2024
// English Language Paper 2 (Language Use and Comprehension) — Primary 3
// Booklet A: 14 marks (Sections A Grammar MCQ + B Grammar MCQ)
// Booklet B: 36 marks (Sections C–H)
// Total: 50 marks

import { QuestionSet } from "@/types/questions";

export const eoy_scgs_p2_2024: QuestionSet = {
  id: "eoy_scgs_p2_2024",
  school: "Singapore Chinese Girls' School",
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

    // ── Section A: Vocabulary MCQ (6 marks, Q1–6) ──────────────────────────
    {
      id: "bookletA_sectionA",
      title: "Section A: Vocabulary",
      type: "VocabMCQ",
      marks: 6,
      instructions:
        "For each question from 1 to 6, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4). Shade the correct oval (1, 2, 3 or 4) on the Optical Answer Sheet.",
      questions: [
        {
          id: "scgs_eoy24_A1",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "My mother looked at my clothes with ____________ and told me to change into a new outfit.",
          options: [
            { id: 1, text: "misery" },
            { id: 2, text: "delight" },
            { id: 3, text: "disapproval" },
            { id: 4, text: "satisfaction" },
          ],
          answer: 3,
          solution: {
            method: "Context Clues — Cause and Effect",
            steps: [
              "The mother told the child to CHANGE clothes — this is a negative reaction.",
              "'Disapproval' = a feeling that something is wrong or not good enough.",
              "'Delight' and 'satisfaction' are positive feelings — she wouldn't tell the child to change if she liked the outfit.",
              "'Misery' means great suffering — too extreme for this situation.",
            ],
            tip: "Telling someone to change clothes = DISAPPROVAL (negative emotion). Eliminate positive words (delight, satisfaction).",
          },
        },
        {
          id: "scgs_eoy24_A2",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "When Mother heard the ____________ news that the typhoon had destroyed Grandmother's entire village, she broke into tears.",
          options: [
            { id: 1, text: "exciting" },
            { id: 2, text: "alarming" },
            { id: 3, text: "amusing" },
            { id: 4, text: "embarrassing" },
          ],
          answer: 2,
          solution: {
            method: "Context Clues — Emotional Tone",
            steps: [
              "The news caused Mother to 'break into tears' — the news must be very distressing.",
              "'Alarming' = causing great worry or fear — fits the impact of typhoon destruction.",
              "'Exciting' and 'amusing' are positive — breaking into tears means the news is BAD.",
              "'Embarrassing' doesn't fit catastrophic news about a typhoon.",
            ],
            tip: "Breaking into tears = very sad/frightened. The news is ALARMING (frightening/distressing).",
          },
        },
        {
          id: "scgs_eoy24_A3",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Although Kim had never taken any dance lessons, she danced very ____________ onstage. Everyone was so impressed by how elegant she was.",
          options: [
            { id: 1, text: "gently" },
            { id: 2, text: "sloppily" },
            { id: 3, text: "clumsily" },
            { id: 4, text: "gracefully" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Adjective Alignment",
            steps: [
              "The audience was 'impressed' and found her 'elegant' — these are positive reactions.",
              "'Gracefully' means in a smooth, beautiful manner — consistent with 'elegant' and being impressive.",
              "'Sloppily' and 'clumsily' are negatives — no one is impressed by clumsiness.",
              "'Gently' doesn't collocate well with dancing onstage to impress.",
            ],
            tip: "'Elegant' and being impressive → she danced GRACEFULLY. Elegant = graceful = beautiful movement.",
          },
        },
        {
          id: "scgs_eoy24_A4",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Having a balanced diet can make a/an ____________ to the state of our health.",
          options: [
            { id: 1, text: "effort" },
            { id: 2, text: "promise" },
            { id: 3, text: "mistake" },
            { id: 4, text: "difference" },
          ],
          answer: 4,
          solution: {
            method: "Fixed Phrase / Collocation",
            steps: [
              "'Make a difference to' is a fixed English expression meaning to have a positive impact on.",
              "'Make an effort' = try hard; 'make a promise' = give your word; 'make a mistake' = do something wrong.",
              "Only 'difference' fits the structure 'make a difference TO'.",
            ],
            tip: "'Make a DIFFERENCE to' = have an impact on. This is a fixed collocation in English.",
          },
        },
        {
          id: "scgs_eoy24_A5",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "To ____________ himself, Father wore a wig, a hat and a beard before leaving the house. He hoped that no one would recognise him.",
          options: [
            { id: 1, text: "show" },
            { id: 2, text: "display" },
            { id: 3, text: "distract" },
            { id: 4, text: "disguise" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Intention",
            steps: [
              "Father wore a wig, hat and beard so 'no one would recognise him'.",
              "'Disguise himself' = to change appearance to avoid being recognised — exactly what Father did.",
              "'Show/display' imply revealing, not hiding; 'distract' means to draw attention away from something else.",
            ],
            tip: "Wig + hat + beard + 'no one would recognise him' = he's in DISGUISE. 'Disguise himself' = hide his identity.",
          },
        },
        {
          id: "scgs_eoy24_A6",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Our teacher told us to ____________ with new ideas for our project.",
          options: [
            { id: 1, text: "come in" },
            { id: 2, text: "come up" },
            { id: 3, text: "come by" },
            { id: 4, text: "come across" },
          ],
          answer: 2,
          solution: {
            method: "Phrasal Verb",
            steps: [
              "'Come up with' is a fixed phrasal verb meaning to think of / produce (ideas, solutions).",
              "'Come in' = enter; 'come by' = obtain/acquire; 'come across' = encounter/discover.",
              "Only 'come up (with new ideas)' means to think of / generate ideas.",
            ],
            tip: "'Come UP with' = think of / generate. 'Come up with ideas' is a very common phrase.",
          },
        },
      ],
    },

    // ── Section B: Grammar MCQ (8 marks, Q7–14) ────────────────────────────
    {
      id: "bookletA_sectionB",
      title: "Section B: Grammar",
      type: "GrammarMCQ",
      marks: 8,
      instructions:
        "For each question from 7 to 14, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4). Shade the correct oval (1, 2, 3 or 4) on the Optical Answer Sheet.",
      questions: [
        {
          id: "scgs_eoy24_B7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Mary and her younger sisters decided to buy the ingredients and bake a cake ____________.",
          options: [
            { id: 1, text: "herself" },
            { id: 2, text: "myself" },
            { id: 3, text: "ourselves" },
            { id: 4, text: "themselves" },
          ],
          answer: 4,
          solution: {
            method: "Reflexive Pronouns",
            steps: [
              "The subject is 'Mary and her younger sisters' = plural, third person (they).",
              "Reflexive pronoun for 'they' = 'themselves'.",
              "'Herself' = she (singular); 'myself' = I; 'ourselves' = we.",
            ],
            tip: "They → THEMSELVES. She → herself. He → himself. We → ourselves. I → myself.",
          },
        },
        {
          id: "scgs_eoy24_B8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "The rescuers searched ____________ the wreckage for more survivors after the earthquake.",
          options: [
            { id: 1, text: "about" },
            { id: 2, text: "along" },
            { id: 3, text: "among" },
            { id: 4, text: "against" },
          ],
          answer: 3,
          solution: {
            method: "Prepositions",
            steps: [
              "'Searched among the wreckage' = looked through/within a mass of debris.",
              "'Among' = in the middle of / within a group or mass.",
              "'About' = concerning/around; 'along' = beside/following; 'against' = in opposition to.",
            ],
            tip: "AMONG = within a group/mass. Rescuers searched AMONG the wreckage (going through the debris).",
          },
        },
        {
          id: "scgs_eoy24_B9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Wenling isn't a fussy eater, ____________ she? She eats everything that her mother cooks.",
          options: [
            { id: 1, text: "is" },
            { id: 2, text: "are" },
            { id: 3, text: "was" },
            { id: 4, text: "were" },
          ],
          answer: 1,
          solution: {
            method: "Question Tags",
            steps: [
              "The main clause is 'Wenling isn't a fussy eater' — negative statement, present tense, singular subject.",
              "Question tag for negative present statement = positive auxiliary + pronoun.",
              "Subject 'Wenling' = she (singular, third person). Present tense → 'is'.",
              "Correct tag: 'isn't she?' Wait — statement is already negative ('isn't') → tag is POSITIVE 'is she?' → answer is 'is'.",
            ],
            tip: "Negative statement → POSITIVE tag. 'Isn't she?' → tag word = 'is'. Match: isn't (negative) + is (positive tag).",
          },
        },
        {
          id: "scgs_eoy24_B10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "My grandfather's birthday is next week ____________ my family and relatives are planning a surprise party for him.",
          options: [
            { id: 1, text: "so" },
            { id: 2, text: "or" },
            { id: 3, text: "while" },
            { id: 4, text: "although" },
          ],
          answer: 1,
          solution: {
            method: "Conjunctions — Cause and Result",
            steps: [
              "The birthday next week is the REASON they are planning a party → result/consequence.",
              "'So' shows result: birthday is coming + so [therefore] they're planning a party.",
              "'Although' shows contrast; 'while' shows simultaneous events; 'or' shows alternatives.",
            ],
            tip: "If the second clause is a RESULT of the first, use SO. Birthday next week → SO planning a party.",
          },
        },
        {
          id: "scgs_eoy24_B11",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            'Mother lifted up the shopping bags and said, "____________ are the goodie bags for the party."',
          options: [
            { id: 1, text: "This" },
            { id: 2, text: "That" },
            { id: 3, text: "These" },
            { id: 4, text: "Those" },
          ],
          answer: 3,
          solution: {
            method: "Demonstrative Pronouns — Number and Proximity",
            steps: [
              "Mother is holding/lifting the bags (they are near her) = near distance.",
              "'Bags' is plural → use 'these' (near + plural) not 'this' (near + singular).",
              "'Those' = far + plural; 'that' = far + singular.",
            ],
            tip: "Near + plural = THESE. Near + singular = this. Far + plural = those. Far + singular = that.",
          },
        },
        {
          id: "scgs_eoy24_B12",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Mrs Menon had ____________ time to prepare for the surprise dinner party but the food was delicious!",
          options: [
            { id: 1, text: "little" },
            { id: 2, text: "some" },
            { id: 3, text: "many" },
            { id: 4, text: "much" },
          ],
          answer: 1,
          solution: {
            method: "Quantifiers — Uncountable Nouns with Contrast",
            steps: [
              "'Time' is uncountable → use 'little' or 'much' (not 'many' which is for countable).",
              "The conjunction 'but' signals contrast: despite limited time, the food was delicious.",
              "'Little time' = not much time — the constraint that makes her achievement impressive.",
              "'Some' is neutral; 'much' would be used with a negative ('not much time').",
            ],
            tip: "LITTLE time = not much time. Used with uncountable nouns. 'But the food was delicious' implies she had very LIMITED time.",
          },
        },
        {
          id: "scgs_eoy24_B13",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Last week, my father ____________ a long-lost relative. Today, our whole family will be having lunch with her.",
          options: [
            { id: 1, text: "visits" },
            { id: 2, text: "visited" },
            { id: 3, text: "was visiting" },
            { id: 4, text: "will be visiting" },
          ],
          answer: 2,
          solution: {
            method: "Tense — Past Simple",
            steps: [
              "'Last week' is a past time marker → simple past tense required.",
              "'Visited' = simple past of 'visit'.",
              "'Visits' = present; 'was visiting' = past continuous (used for interrupted actions, not a complete past event); 'will be visiting' = future.",
            ],
            tip: "'Last week' always signals SIMPLE PAST. → visited.",
          },
        },
        {
          id: "scgs_eoy24_B14",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "My mother and I ____________ watching the puppy when it climbed out of the play pen.",
          options: [
            { id: 1, text: "is" },
            { id: 2, text: "are" },
            { id: 3, text: "was" },
            { id: 4, text: "were" },
          ],
          answer: 4,
          solution: {
            method: "Subject-Verb Agreement — Past Continuous",
            steps: [
              "The action was ongoing in the past ('when it climbed out') = past continuous tense.",
              "Subject: 'My mother and I' = plural (two people) = they/we.",
              "Past continuous plural = 'were': 'My mother and I were watching'.",
              "'Was' is for singular; 'were' for plural. 'Are/is' = present tense.",
            ],
            tip: "My mother AND I = two people = plural → WERE (past) or ARE (present). 'When it climbed' = past → WERE.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B
    // ─────────────────────────────────────────────

    // ── Section C: Grammar Cloze (4 marks, Q15–18) ─────────────────────────
    {
      id: "bookletB_sectionC",
      title: "Section C: Grammar Cloze",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the passage carefully. Underline the correct word from the words given in the brackets.",
      passageText: `It was Monday. Nancy was walking home from school when she (15) [see / saw] a puppy lying on its side. She walked quickly towards the puppy. When it (16) [hears / heard] Nancy's footsteps, it started to whimper. The puppy looked at her hopefully. Nancy (17) [notices / noticed] that it had a name tag around its neck.

Suddenly, Nancy recognised the puppy. It was Snoopy! It was the newly adopted puppy of Nancy's neighbour. "I (18) [am / was] so glad that I recognise you! Now, let's go home. I am sure Mr Yan must be desperately looking for you!"

Snoopy gave a happy yelp!`,
      answers: {
        15: "saw",
        16: "heard",
        17: "noticed",
        18: "am",
      },
      questionsSolutions: [
        {
          id: "scgs_eoy24_C15",
          blank: 15,
          answer: "saw",
          solution: {
            method: "Grammar Cloze — Past Simple (Narrative)",
            steps: [
              "The story is set in the past: 'It was Monday', 'was walking home'.",
              "'Saw' is the simple past of 'see' — fitting the past narrative.",
              "'See' is present tense; in a past narrative, use 'saw'.",
            ],
            tip: "In past-tense narratives, use PAST TENSE verbs. See → SAW (past simple).",
          },
        },
        {
          id: "scgs_eoy24_C16",
          blank: 16,
          answer: "heard",
          solution: {
            method: "Grammar Cloze — Past Simple",
            steps: [
              "Continuing the past narrative: 'When it ___ Nancy's footsteps'.",
              "'Heard' is the simple past of 'hear'.",
              "'Hears' is present tense — wrong in this past-tense story.",
            ],
            tip: "Past narrative → HEARD (past of hear). 'When it heard' = at that moment in the past.",
          },
        },
        {
          id: "scgs_eoy24_C17",
          blank: 17,
          answer: "noticed",
          solution: {
            method: "Grammar Cloze — Past Simple",
            steps: [
              "Still in past narrative. 'Nancy ___ that it had a name tag.'",
              "'Noticed' = past simple of 'notice'.",
              "'Notices' is present tense — wrong.",
            ],
            tip: "All verbs in this narrative paragraph should be PAST SIMPLE: saw, heard, noticed.",
          },
        },
        {
          id: "scgs_eoy24_C18",
          blank: 18,
          answer: "am",
          solution: {
            method: "Grammar Cloze — Present Tense in Direct Speech",
            steps: [
              "This is direct speech — Nancy's actual words right now: 'I ___ so glad that I recognise you!'",
              "Nancy is speaking in the present moment → present tense 'am' is correct.",
              "'Was' would mean she was glad in the past, but she is speaking currently.",
            ],
            tip: "DIRECT SPEECH uses the tense of the moment of speaking. Nancy is speaking NOW → 'I AM so glad'.",
          },
        },
      ],
    },

    // ── Pronoun Cloze (4 marks, Q19–22) ────────────────────────────────────
    {
      id: "bookletB_pronounCloze",
      title: "Pronoun Cloze",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the passage carefully. Choose the correct word from the words given and fill in the blanks. USE EACH WORD ONCE ONLY.",
      wordBox: ["he", "her", "his", "it", "she", "their", "they"],
      passageText: `Shanti loves helping others. She wants to help people in any way she can. Last year, (19)_____ and her friends decided to volunteer at a home for the elderly. Together, (20)_____ did some research online and found a few activities to engage the residents at the home.

Shanti and her friends also wanted to raise some funds for the elderly home. They approached their form teacher, Mr Seet, for help. (21)_____ suggested that it could be their class project. They thanked him for his suggestion. Everyone in class was very excited to be part of the project. Shanti thought that (22)_____ was a great idea. They started work at once!`,
      answers: {
        19: "she",
        20: "they",
        21: "He",
        22: "it",
      },
      questionsSolutions: [
        {
          id: "scgs_eoy24_PC19",
          blank: 19,
          answer: "she",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "'___ and her friends decided to volunteer' — the subject is Shanti.",
              "Shanti is female singular → 'she'.",
              "Note: '___ and her friends' = Shanti herself + her friends.",
            ],
            tip: "Shanti = she (female, singular). 'She and her friends' = Shanti + friends.",
          },
        },
        {
          id: "scgs_eoy24_PC20",
          blank: 20,
          answer: "they",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "'Together, ___ did some research' refers to Shanti AND her friends (plural group).",
              "Group of people = they (plural third person).",
            ],
            tip: "Shanti + her friends = group = THEY.",
          },
        },
        {
          id: "scgs_eoy24_PC21",
          blank: 21,
          answer: "He",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "'___ suggested that it could be their class project.' — refers to Mr Seet.",
              "Mr Seet is male singular → 'He'.",
              "The pronoun is at the start of the sentence → capitalised: 'He'.",
            ],
            tip: "Mr Seet = male = HE. At start of sentence = capital H → He.",
          },
        },
        {
          id: "scgs_eoy24_PC22",
          blank: 22,
          answer: "it",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "'Shanti thought that ___ was a great idea.' → refers to the class project idea.",
              "An idea/concept/plan = 'it' (singular, non-person).",
            ],
            tip: "Ideas, plans, things = IT. 'The suggestion was a great idea' → IT was a great idea.",
          },
        },
      ],
    },

    // ── Section D: Vocabulary Cloze (4 marks, Q23–26) ──────────────────────
    {
      id: "bookletB_sectionD",
      title: "Section D: Vocabulary Cloze",
      type: "VocabCloze",
      marks: 4,
      instructions:
        "Read the passage carefully. Choose the correct word from the words given and fill in the blanks. USE EACH WORD ONCE ONLY.",
      wordBox: ["carelessly", "contented", "cleverly", "inspiration", "pull", "throw"],
      passageText: `It does not take much to make me happy. All I need as my companions are books. I am perfectly happy and (23)_____ with sitting the whole day with a storybook in my hands. When I am reading an entertaining book, not even cartoons on television can (24)_____ me away from it.

I admire the authors. I always wonder how they are able to write so well and where they get the (25)_____ for their stories. I enjoy the words that they so (26)_____ use. One day, I hope to be an author. I would love to hold in my hands a book that I have written.`,
      answers: {
        23: "contented",
        24: "pull",
        25: "inspiration",
        26: "cleverly",
      },
      questionsSolutions: [
        {
          id: "scgs_eoy24_D23",
          blank: 23,
          answer: "contented",
          solution: {
            method: "Vocabulary Cloze — Adjective",
            steps: [
              "'I am perfectly happy and ___ with sitting the whole day with a storybook.'",
              "'Contented' = satisfied and happy — synonymous with 'happy' in this context.",
              "'Carelessly' is an adverb, not adjective; 'cleverly' is an adverb too.",
            ],
            tip: "'Happy AND ___ ' — needs a similar positive adjective. CONTENTED = satisfied/happy.",
          },
        },
        {
          id: "scgs_eoy24_D24",
          blank: 24,
          answer: "pull",
          solution: {
            method: "Vocabulary Cloze — Phrasal Verb",
            steps: [
              "'Not even cartoons can ___ me away from it' = cannot drag/take the narrator away from reading.",
              "'Pull me away' = drag away (as if physically pulling).",
              "'Throw me away' doesn't make sense; 'pull away from' is a standard expression.",
            ],
            tip: "'Pull away from' = lure/draw away from. Cartoons cannot PULL the narrator away from reading.",
          },
        },
        {
          id: "scgs_eoy24_D25",
          blank: 25,
          answer: "inspiration",
          solution: {
            method: "Vocabulary Cloze — Noun",
            steps: [
              "'Where they get the ___ for their stories' = the source of their creative ideas.",
              "'Inspiration' = what sparks creative ideas; the 'muse' for writing.",
              "'Inspiration for stories' is a natural collocation.",
            ],
            tip: "Authors get INSPIRATION for their stories = creative ideas/motivation to write.",
          },
        },
        {
          id: "scgs_eoy24_D26",
          blank: 26,
          answer: "cleverly",
          solution: {
            method: "Vocabulary Cloze — Adverb",
            steps: [
              "'I enjoy the words that they so ___ use.' = they use words in a skilled, smart way.",
              "'Cleverly' = in a clever/smart manner — appropriate for skilled word choice.",
              "'Carelessly' is negative — the narrator admires the authors, so it must be positive.",
            ],
            tip: "The narrator ADMIRES the authors → the adverb must be POSITIVE. CLEVERLY = in a smart way.",
          },
        },
      ],
    },

    // ── Section E: Editing (4 marks, Q27–30) ───────────────────────────────
    {
      id: "bookletB_sectionE",
      title: "Section E: Editing",
      type: "Editing",
      marks: 4,
      instructions:
        "Each of the underlined words contains a spelling error. Write the correct word in each of the boxes. (2 marks) / Each of the underlined words contains a grammar error. Write the correct word in each of the boxes. (2 marks)",
      questions: [
        {
          id: "scgs_eoy24_E27",
          blank: 27,
          type: "spelling",
          errorWord: "suprise",
          correctWord: "surprise",
          context:
            "Everyone was very excited as they waited quietly. It was Mother's birthday (27) so it was a suprise that they had been planning for months.",
          answer: "surprise",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Suprise' is missing the 'r' after 'su'.",
              "Correct spelling: s-u-r-p-r-i-s-e.",
              "Break it into syllables: sur-prise.",
            ],
            tip: "SURPRISE has TWO r's: sur-pRise. A common misspelling is 'suprise' (missing the first r).",
          },
        },
        {
          id: "scgs_eoy24_E28",
          blank: 28,
          type: "spelling",
          errorWord: "imedeately",
          correctWord: "immediately",
          context:
            "The plan was to greet (28) her imedeately when she opened the door.",
          answer: "immediately",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Imedeately' has multiple errors: missing 'm', wrong vowel pattern.",
              "Correct spelling: i-m-m-e-d-i-a-t-e-l-y.",
              "Break it down: im-me-di-ate-ly.",
            ],
            tip: "IMMEDIATELY: double 'm', then 'ediately'. Remember: im + mediate + ly.",
          },
        },
        {
          id: "scgs_eoy24_E29",
          blank: 29,
          type: "grammar",
          errorWord: "on",
          correctWord: "at",
          context:
            "(29) Elly loves music. Every day, she sits on her piano for two hours.",
          answer: "at",
          solution: {
            method: "Editing — Grammar (Preposition)",
            steps: [
              "'Sits on her piano' is incorrect — you don't sit ON a piano (that's the top of it).",
              "You 'sit AT the piano' = you sit at your place at the piano to play it.",
              "'At' is used for activities at a place/instrument: sit at the desk, sit at the piano.",
            ],
            tip: "Sit AT the piano (to play it). Sit ON the piano (on top of it — wrong!). Always: sit AT an instrument.",
          },
        },
        {
          id: "scgs_eoy24_E30",
          blank: 30,
          type: "grammar",
          errorWord: "We",
          correctWord: "They",
          context:
            "Like Elly, her family enjoys singing. We have decided to put up a musical together at the end of the year.",
          answer: "They",
          solution: {
            method: "Editing — Grammar (Pronoun Agreement)",
            steps: [
              "'Like Elly, her family enjoys singing. We have decided...'",
              "The narrator is not part of 'Elly's family' — the passage is about Elly's family, not the narrator.",
              "The correct pronoun referring to 'her family' is 'They' (third person plural).",
              "'We' incorrectly includes the narrator/reader in Elly's family.",
            ],
            tip: "The family = THEY (third person). 'We' would include the speaker. Since we're describing Elly's family, use THEY.",
          },
        },
      ],
    },

    // ── Section F: Sentence Combining (4 marks, Q31–34) ────────────────────
    {
      id: "bookletB_sectionF",
      title: "Section F: Sentence Combining",
      type: "SentenceCombining",
      marks: 4,
      instructions:
        "Combine each pair of sentences using the word(s) given. The meaning of your sentence must be the same as the sentences given.",
      questions: [
        {
          id: "scgs_eoy24_F31",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "Mr Tan managed to run ten rounds. It was not easy.\n\nAlthough ___________________________________",
          startingWord: "Although",
          answer: "Although it was not easy, Mr Tan managed to run ten rounds.",
          solution: {
            method: "Sentence Combining — Contrast (Although)",
            steps: [
              "'Although' introduces the contrasting/unexpected part.",
              "It was not easy = the obstacle; Mr Tan still managed = the achievement.",
              "Structure: Although [obstacle/difficulty], [achievement].",
              "Correct: 'Although it was not easy, Mr Tan managed to run ten rounds.'",
            ],
            tip: "ALTHOUGH = even though [difficult thing happened], [surprising result]. Put the hardship after 'although'.",
          },
        },
        {
          id: "scgs_eoy24_F32",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "Molly cheated during the examination. She did not study for the examination.\n\n____________ because ___________________________________",
          startingWord: "because",
          answer: "Molly cheated during the examination because she did not study for it.",
          solution: {
            method: "Sentence Combining — Reason (because)",
            steps: [
              "'Because' introduces the reason/cause.",
              "She cheated = result; she didn't study = reason/cause.",
              "Structure: [Result] because [Reason].",
              "Correct: 'Molly cheated during the examination because she did not study for it.'",
              "Replace 'the examination' with 'it' to avoid repetition.",
            ],
            tip: "BECAUSE = gives the reason. Cheated (result) BECAUSE didn't study (reason).",
          },
        },
        {
          id: "scgs_eoy24_F33",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "Tom was tired. He went to bed early.\n\n____________ and ___________________________________",
          startingWord: "and",
          answer: "Tom was tired and went to bed early.",
          solution: {
            method: "Sentence Combining — Addition (and)",
            steps: [
              "'And' joins two related actions/states with the same subject.",
              "Tom = subject for both; 'was tired' and 'went to bed early' are two related facts.",
              "Correct: 'Tom was tired and went to bed early.' (subject not repeated after 'and')",
            ],
            tip: "AND joins two actions by the same person. Don't repeat the subject after 'and': 'Tom was tired AND went to bed early'.",
          },
        },
        {
          id: "scgs_eoy24_F34",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "The pie is ready. Take the pie out of the oven.\n\n____________ when ___________________________________",
          startingWord: "when",
          answer: "Take the pie out of the oven when it is ready.",
          solution: {
            method: "Sentence Combining — Temporal (when)",
            steps: [
              "'When' shows the time/condition for an action.",
              "Take the pie out = action; when it is ready = the time to do it.",
              "Structure: [Action] when [condition/time].",
              "Correct: 'Take the pie out of the oven when it is ready.'",
              "Replace 'the pie' with 'it' to avoid repetition.",
            ],
            tip: "WHEN = at the time that. 'Take it out WHEN it is ready.' Replace repeated noun with pronoun 'it'.",
          },
        },
      ],
    },

    // ── Section G: Comprehension Short Response (8 marks, Q35–41) ──────────
    {
      id: "bookletB_sectionG",
      title: "Section G: Comprehension (Short Response)",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read the passage carefully and answer questions 35 to 41.",
      passageTitle: "The Tyre Blowout",
      passageText: `It was a warm morning. Ama and her family were driving across the Howard Bridge over the Tampa River. They were ecstatic to travel as a family. The family had moved from Russia to Germany and finally to Florida five years ago. That day, they were on their way to have lunch with their relatives. Ama's two brothers, Rama and Emra, were in the backseat of the car with her.

The siblings were playing games and singing songs. As they approached the end of the bridge, there was a deafening sound. The back left tyre had blown out. The car started to spin across the road. Ama's father tried his best to control the car. Ama and her brothers were petrified. They held on tightly to one another. Ama's mother tried to calm the children. Fortunately, the road was quiet, with only a few cars around.

After a few minutes, the car finally came to a halt. Ama's mother quickly used her mobile phone to call for help. She checked on Ama and her brothers, making sure that the children were not hurt. She was relieved that her family had only suffered some bruises and cuts.

Soon, the police and the ambulance arrived with a tow truck. The police told Ama's family that they were very fortunate that traffic was light that day and that they had only suffered some bruises and cuts. The police gave the family a ride to their relatives' home.

teacher-created`,
      questions: [
        {
          id: "scgs_eoy24_G35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Write one sentence from paragraph 1 which has a similar meaning to 'being very happy'.",
          answer: '"They were ecstatic to travel as a family."',
          solution: {
            method: "Word/Sentence Retrieval",
            steps: [
              "'Very happy' → look for a synonym of 'very happy' in paragraph 1.",
              "'Ecstatic' = extremely happy/overjoyed.",
              "'They were ecstatic to travel as a family.' — this sentence means they were very happy.",
            ],
            tip: "ECSTATIC = extremely happy. Find the sentence with 'ecstatic' in paragraph 1.",
          },
        },
        {
          id: "scgs_eoy24_G36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Write 1, 2 and 3 in the blanks below to show the order of the places that Ama and her family had lived in.\n___ Germany / ___ Russia / ___ Florida",
          answer: "2 Germany / 1 Russia / 3 Florida",
          solution: {
            method: "Sequencing — Information Retrieval",
            steps: [
              "The passage states: 'The family had moved from Russia to Germany and finally to Florida five years ago.'",
              "Order: Russia (1st) → Germany (2nd) → Florida (3rd).",
              "Russia = 1, Germany = 2, Florida = 3.",
            ],
            tip: "Key words: 'from Russia TO Germany AND FINALLY to Florida'. Find FROM → TO → FINALLY TO = the order.",
          },
        },
        {
          id: "scgs_eoy24_G37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Tick (✓) your chosen answer. Ama was ___ when the accident happened.\n☐ calm / ☐ elated / ☐ frightened",
          answer: "frightened",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 2: 'Ama and her brothers were petrified.'",
              "'Petrified' = extremely frightened/terrified.",
              "Frightened is the correct answer.",
            ],
            tip: "PETRIFIED = very frightened. Find this word in paragraph 2 to confirm the answer.",
          },
        },
        {
          id: "scgs_eoy24_G38",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "The car drove over a blown-out tyre."',
          answer: "False",
          solution: {
            method: "True/False — Careful Reading",
            steps: [
              "The passage says 'The back left tyre had blown out' — the tyre on the car blew out.",
              "The car did NOT drive OVER a blown-out tyre — the tyre blew out while they were driving.",
              "This is False.",
            ],
            tip: "The tyre BLEW OUT (on the car). The car did NOT drive OVER a tyre. Different events.",
          },
        },
        {
          id: "scgs_eoy24_G39",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "Ama\'s mother was driving the car."',
          answer: "False",
          solution: {
            method: "True/False — Information Retrieval",
            steps: [
              "Paragraph 2: 'Ama's father tried his best to control the car.'",
              "The FATHER was driving, not the mother.",
              "False.",
            ],
            tip: "The FATHER was driving (he tried to control the car). The mother's role was to calm the children and call for help.",
          },
        },
        {
          id: "scgs_eoy24_G40",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "There were five people in the car."',
          answer: "True",
          solution: {
            method: "True/False — Counting",
            steps: [
              "Ama, Ama's father, Ama's mother, Rama (brother), Emra (brother) = 5 people.",
              "The passage confirms: 'Ama's two brothers, Rama and Emra, were in the backseat of the car with her.'",
              "Total: parents (2) + Ama + Rama + Emra = 5. True.",
            ],
            tip: "Count the family members: Father + Mother + Ama + Rama + Emra = 5 people. TRUE.",
          },
        },
        {
          id: "scgs_eoy24_G41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Based on paragraph 4, why did the police say that Ama's family was fortunate?",
          answer:
            "The police said Ama's family was fortunate because traffic was light that day and they had only suffered some bruises and cuts.",
          solution: {
            method: "Literal Comprehension — Explanation",
            steps: [
              "Paragraph 4: 'they were very fortunate that traffic was light that day and that they had only suffered some bruises and cuts.'",
              "Two reasons: (1) traffic was light, (2) only minor injuries (bruises and cuts).",
              "Include BOTH reasons in the answer.",
            ],
            tip: "There are TWO reasons the family was fortunate. Include BOTH: light traffic AND only minor injuries.",
          },
        },
      ],
    },

    // ── Section H: Comprehension Short Response (8 marks, Q42–48) ──────────
    {
      id: "bookletB_sectionH",
      title: "Section H: Comprehension (Short Response)",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read the passage carefully and answer questions 42 to 48.",
      passageTitle: "The Cobbler and the Banker",
      passageText: `A cobbler and a banker were neighbours. The cobbler was always singing as he worked. Whatever he earned from making and repairing shoes was just enough for food and simple clothing for his family, yet he was always cheerful.

Unlike the cobbler, the banker was almost always frowning. He hardly laughed and seemed to be unhappy all the time. The banker never sang.

One day, while the banker was taking an afternoon nap, he was rudely awakened by the cobbler's ear-piercing singing. Irritated by the singing, he decided to put a stop to it. He thought hard and devised a plan.

The banker went over to the cobbler's house where he was greeted cheerfully by the cobbler. He offered to pay the cobbler well if he looked after a bag of gold coins for him. The cobbler agreed to his offer as he wanted to be able to give his family a better life.

The cobbler thought that it was an easy job. He dug a hole and buried the bag of gold. However, now he had something to worry about. He was worried that robbers might take it away. He was so worried that he stopped singing. He was unable to sleep well. Seeing him worry made his family unhappy.

Suddenly, the cobbler realised that the bag of gold coins had destroyed his happiness. He quickly returned the bag of gold coins to the banker. Soon after, he was singing happily again.

Adapted from Selected Fables from Europe`,
      questions: [
        {
          id: "scgs_eoy24_H42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word in paragraph 2 has the same meaning as 'almost not'?",
          answer: "Hardly",
          solution: {
            method: "Synonym Retrieval",
            steps: [
              "'Almost not' = barely, seldom, rarely — meaning very little.",
              "Paragraph 2: 'He hardly laughed' — 'hardly' means almost not/barely.",
              "'Hardly' = barely = almost not.",
            ],
            tip: "HARDLY = almost not. 'He hardly laughed' = he almost never laughed.",
          },
        },
        {
          id: "scgs_eoy24_H43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Tick (✓) your chosen answer. The cobbler had a/an ___ personality.\n☐ jovial / ☐ bossy / ☐ grumpy",
          answer: "jovial",
          solution: {
            method: "Character Analysis",
            steps: [
              "The cobbler was 'always singing', 'always cheerful', 'greeted cheerfully'.",
              "'Jovial' = cheerful and friendly — matches the cobbler's character.",
              "'Grumpy' and 'bossy' describe the banker or negative personality traits.",
            ],
            tip: "Always singing + always cheerful = JOVIAL (happy and friendly personality).",
          },
        },
        {
          id: "scgs_eoy24_H44",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "The banker enjoyed the cobbler\'s singing."',
          answer: "False",
          solution: {
            method: "True/False",
            steps: [
              "The banker was 'rudely awakened' by the 'ear-piercing singing' and was 'irritated by the singing'.",
              "He decided to 'put a stop to it' — clearly he did NOT enjoy it.",
              "False.",
            ],
            tip: "'Ear-piercing' + 'irritated' + 'put a stop to it' = did NOT enjoy. FALSE.",
          },
        },
        {
          id: "scgs_eoy24_H45",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "The cobbler was not willing to take on his new job at first."',
          answer: "False",
          solution: {
            method: "True/False",
            steps: [
              "The passage says: 'The cobbler agreed to his offer as he wanted to be able to give his family a better life.'",
              "He agreed immediately — he was willing. False.",
            ],
            tip: "'Agreed to his offer' = was WILLING. The statement says 'not willing at first' → FALSE.",
          },
        },
        {
          id: "scgs_eoy24_H46",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "The cobbler was happy again after returning the bag of coins."',
          answer: "True",
          solution: {
            method: "True/False",
            steps: [
              "Last paragraph: 'He quickly returned the bag of gold coins to the banker. Soon after, he was singing happily again.'",
              "Singing happily = happy. True.",
            ],
            tip: "'Singing happily again' = happy again after returning the coins. TRUE.",
          },
        },
        {
          id: "scgs_eoy24_H47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "List two actions of the cobbler which show how worried he was.",
          answer:
            "(i) He stopped singing. (ii) He was unable to sleep well.",
          solution: {
            method: "Evidence Retrieval — Multiple Actions",
            steps: [
              "Paragraph 5: 'He was so worried that he stopped singing. He was unable to sleep well.'",
              "Two actions showing worry: (1) stopped singing, (2) unable to sleep well.",
              "Both must be listed.",
            ],
            tip: "Find the two ACTIONS (things he DID) that show worry. Don't list feelings ('was worried') — list actions ('stopped singing', 'unable to sleep well').",
          },
        },
        {
          id: "scgs_eoy24_H48",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: "Why did the cobbler return the gold coins to the banker?",
          answer:
            "The cobbler returned the gold coins to the banker because he realised that the bag of gold coins had destroyed his happiness.",
          solution: {
            method: "Literal Comprehension — Reason",
            steps: [
              "Last paragraph: 'the cobbler realised that the bag of gold coins had destroyed his happiness.'",
              "He returned the gold because he understood it was making him unhappy.",
              "Write a complete sentence using 'because'.",
            ],
            tip: "The reason is in the LAST paragraph: gold coins DESTROYED his happiness. He returned them to get his happiness back.",
          },
        },
      ],
    },
  ],
};
