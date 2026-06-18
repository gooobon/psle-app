// src/data/p3/english/papers/eoy_scgs_p2_2022.ts
// Singapore Chinese Girls' School (SCGS) — P3 English SA2 2022
// Paper 2 (Language Use and Comprehension)
// Booklet A (Q1–14, 14 marks) + Booklet B (Q15–48, 36 marks) = 50 marks
// Sections: A Vocab MCQ, B Grammar MCQ,
//           C Grammar Cloze (underline), D Grammar Cloze (pronouns word bank),
//           D Vocab Cloze (word bank), E Editing (spelling + grammar),
//           F Sentence Combining, G Comprehension OE (Ama & car accident),
//           H Comprehension OE (Cobbler & Banker)

import { PaperSet } from "../../types";

const eoy_scgs_p2_2022: PaperSet = {
  id: "eoy_scgs_p2_2022",
  school: "Singapore Chinese Girls' School (Primary)",
  schoolCode: "scgs",
  level: "P3",
  subject: "English",
  paperType: "EOY",
  year: 2022,
  paper: 2,
  totalMarks: 50,
  sections: [
    // ─────────────────────────────────────────────
    // BOOKLET A — Section A: Vocabulary MCQ (Q1–Q6, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secA",
      sectionLabel: "Booklet A — Section A: Vocabulary",
      topic: "VocabMCQ",
      instructions:
        "For each question from 1 to 6, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4). Shade the correct oval on the Optical Answer Sheet.",
      marks: 6,
      questions: [
        {
          id: "scgs22_A1",
          type: "A",
          qNumber: 1,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "My mother looked at my clothes with __________ and told me to change into a new outfit.",
          options: ["misery", "delight", "disapproval", "satisfaction"],
          answer: 3,
          answerText: "disapproval",
          solution: {
            method: "Context — Emotional Response",
            steps: [
              "Mother looked at the clothes and then told the child to CHANGE — this means she did not like what she saw.",
              "'Disapproval' = the feeling that something is wrong or unacceptable.",
              "(1) 'misery' = extreme sadness; (2) 'delight' = great pleasure (opposite — she'd approve); (4) 'satisfaction' = contentment (also positive).",
              "Telling someone to change = disapproving of their appearance. ✓",
            ],
            tip: "'Disapproval' = not liking something / thinking it is wrong. If she told the child to change, she disapproved of the outfit.",
          },
        },
        {
          id: "scgs22_A2",
          type: "A",
          qNumber: 2,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "When Mother heard the __________ news that the typhoon had destroyed Grandmother's entire village, she broke into tears.",
          options: ["exciting", "alarming", "amusing", "embarrassing"],
          answer: 2,
          answerText: "alarming",
          solution: {
            method: "Context — Adjective for News",
            steps: [
              "A typhoon destroying a village = very bad, frightening news.",
              "'Alarming' = very worrying and frightening.",
              "(1) 'exciting' = thrilling (positive — inappropriate for disaster news); (3) 'amusing' = funny; (4) 'embarrassing' = causing shame.",
              "Only 'alarming' fits the context of devastating disaster news causing tears.",
            ],
            tip: "'Alarming news' = very worrying/frightening news. A typhoon destroying a village is alarming.",
          },
        },
        {
          id: "scgs22_A3",
          type: "A",
          qNumber: 3,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Although Kim had never taken any dance lessons, she danced very __________ onstage. Everyone was so impressed by how elegant she was.",
          options: ["gently", "sloppily", "clumsily", "gracefully"],
          answer: 4,
          answerText: "gracefully",
          solution: {
            method: "Adverb — Context + Contrast",
            steps: [
              "Contrast: 'never taken dance lessons' BUT 'everyone was impressed by how elegant she was'.",
              "Elegant = graceful, beautifully performed.",
              "'Gracefully' = in a smooth, elegant way. ✓",
              "(1) 'gently' = softly (not about elegance); (2) 'sloppily' and (3) 'clumsily' = messily/awkwardly (opposite of elegant).",
            ],
            tip: "Elegant dancing = graceful dancing. 'Gracefully' is the adverb for elegant movement.",
          },
        },
        {
          id: "scgs22_A4",
          type: "A",
          qNumber: 4,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Having a balanced diet can make a/an __________ to the state of our health.",
          options: ["effort", "promise", "mistake", "difference"],
          answer: 4,
          answerText: "difference",
          solution: {
            method: "Collocation — Fixed Expression",
            steps: [
              "'Make a difference to' = have a positive impact on / change the outcome of.",
              "'Make a difference to the state of our health' = positively affect our health. ✓",
              "(1) 'make an effort' = try hard (doesn't fit 'to the state of'); (2) 'make a promise' = commit to doing something; (3) 'make a mistake' = do something wrong.",
              "Only 'difference' fits the fixed phrase 'make a difference to'.",
            ],
            tip: "'Make a difference' = have a positive impact. 'A balanced diet makes a DIFFERENCE to your health.'",
          },
        },
        {
          id: "scgs22_A5",
          type: "A",
          qNumber: 5,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "To __________ himself, Father wore a wig, a hat and a beard before leaving the house. He hoped that no one would recognise him.",
          options: ["show", "display", "distract", "disguise"],
          answer: 4,
          answerText: "disguise",
          solution: {
            method: "Precise Verb — Changing Appearance",
            steps: [
              "Father wore a wig, hat and beard so no one would recognise him.",
              "'Disguise himself' = change his appearance to avoid recognition.",
              "(1) 'show himself' = reveal himself (opposite); (2) 'display' = show publicly; (3) 'distract' = divert attention.",
              "Wig + hat + beard to avoid recognition = disguise. ✓",
            ],
            tip: "'Disguise' = change appearance to prevent recognition. Father disguised himself by wearing a wig, hat, and beard.",
          },
        },
        {
          id: "scgs22_A6",
          type: "A",
          qNumber: 6,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Our teacher told us to __________ with new ideas for our project.",
          options: ["come in", "come up", "come by", "come across"],
          answer: 2,
          answerText: "come up",
          solution: {
            method: "Phrasal Verbs",
            steps: [
              "'Come up with' = think of / produce (ideas, solutions).",
              "'Come up with new ideas' = generate/think of new ideas. ✓",
              "(1) 'come in' = enter; (3) 'come by' = obtain/visit; (4) 'come across' = encounter/find unexpectedly.",
              "Only 'come up with' means to generate ideas.",
            ],
            tip: "'Come up with' = think of / generate. 'Come up with an idea/solution/plan.'",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET A — Section B: Grammar MCQ (Q7–Q14, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secB",
      sectionLabel: "Booklet A — Section B: Grammar",
      topic: "GrammarMCQ",
      instructions:
        "For each question from 7 to 14, four options are given. One of them is the correct answer. Make your choice (1, 2, 3 or 4). Shade the correct oval on the Optical Answer Sheet.",
      marks: 8,
      questions: [
        {
          id: "scgs22_B7",
          type: "A",
          qNumber: 7,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mary and her younger sisters decided to buy the ingredients and bake a cake __________.",
          options: ["herself", "myself", "ourselves", "themselves"],
          answer: 4,
          answerText: "themselves",
          solution: {
            method: "Reflexive Pronouns",
            steps: [
              "Subject: 'Mary and her younger sisters' = they (plural, female).",
              "They decided to do it alone (by themselves) without help.",
              "Reflexive pronoun for 'they' = 'themselves'.",
              "(1) 'herself' = she; (2) 'myself' = I; (3) 'ourselves' = we.",
            ],
            tip: "Mary + sisters = they → 'themselves'. They baked the cake BY THEMSELVES = alone, without help.",
          },
        },
        {
          id: "scgs22_B8",
          type: "A",
          qNumber: 8,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The rescuers searched __________ the wreckage for more survivors after the earthquake.",
          options: ["about", "along", "among", "against"],
          answer: 3,
          answerText: "among",
          solution: {
            method: "Prepositions of Location / Distribution",
            steps: [
              "'Search among' = look through/within a group or collection of things.",
              "'Searched among the wreckage' = looked through the ruins. ✓",
              "(1) 'about' = approximately or around; (2) 'along' = beside/following a path; (4) 'against' = in opposition to / in contact with.",
              "'Among' = within a group of things (the wreckage pieces).",
            ],
            tip: "'Search among' = look within/through a group. 'Among the wreckage' = within the pile of ruins.",
          },
        },
        {
          id: "scgs22_B9",
          type: "A",
          qNumber: 9,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Wenling isn't a fussy eater, __________ she? She eats everything that her mother cooks.",
          options: ["is", "are", "was", "were"],
          answer: 1,
          answerText: "is",
          solution: {
            method: "Question Tags",
            steps: [
              "Main clause: 'Wenling ISN'T a fussy eater' — auxiliary is 'is' (negative form 'isn't').",
              "Tag question: negate 'is' → positive form = 'is'.",
              "Subject: 'Wenling' = she (singular female).",
              "Tag: 'is she?' ✓ (When main clause is negative, tag is positive.)",
            ],
            tip: "Negative main clause → positive tag. 'Isn't' (negative) → 'IS she?' (positive tag).",
          },
        },
        {
          id: "scgs22_B10",
          type: "A",
          qNumber: 10,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "My grandfather's birthday is next week __________ my family and relatives are planning a surprise party for him.",
          options: ["so", "or", "while", "although"],
          answer: 1,
          answerText: "so",
          solution: {
            method: "Conjunctions of Result",
            steps: [
              "Two clauses: birthday is next week (cause) → family is planning a party (result/consequence).",
              "'So' = therefore / as a result.",
              "'Grandfather's birthday is next week SO they are planning a party.' ✓",
              "(2) 'or' = alternative; (3) 'while' = at the same time/contrast; (4) 'although' = concession/contrast.",
            ],
            tip: "'So' = result/consequence. Birthday next week (cause) → party planning (result).",
          },
        },
        {
          id: "scgs22_B11",
          type: "A",
          qNumber: 11,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mother lifted up the shopping bags and said, \"__________ are the goodie bags for the party.\"",
          options: ["This", "That", "These", "Those"],
          answer: 3,
          answerText: "These",
          solution: {
            method: "Demonstrative Pronouns — Distance",
            steps: [
              "Mother LIFTED UP the shopping bags and is speaking about them — the bags are near her.",
              "Near + plural (bags) → 'These'.",
              "(1) 'This' = near + singular; (2) 'That' = far + singular; (4) 'Those' = far + plural.",
              "She is holding the bags = near her → 'These are the goodie bags.' ✓",
            ],
            tip: "Mother is holding the bags (near) and they are plural (bags) → 'These'. This/These = near.",
          },
        },
        {
          id: "scgs22_B12",
          type: "A",
          qNumber: 12,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mrs Menon had __________ time to prepare for the surprise dinner party but the food was delicious!",
          options: ["little", "some", "many", "much"],
          answer: 1,
          answerText: "little",
          solution: {
            method: "Quantifiers — Uncountable Noun",
            steps: [
              "'Time' is an uncountable noun.",
              "Context: 'had ___ time' BUT 'food was delicious' → she managed despite having very little time.",
              "'Little time' = a very small amount of time, barely enough. ✓",
              "(2) 'some' = a bit (neutral, doesn't suggest the challenge); (3) 'many' = countable plural; (4) 'much' = large amount (contradicts the challenge).",
              "'Had little time' = barely had enough time → despite this, the food was delicious (contrast with 'but').",
            ],
            tip: "'Little time' = hardly any time. The 'but' signals contrast: she had little time BUT still made delicious food.",
          },
        },
        {
          id: "scgs22_B13",
          type: "A",
          qNumber: 13,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Last week, my father __________ a long-lost relative. Today, our whole family will be having lunch with her.",
          options: ["visits", "visited", "was visiting", "will be visiting"],
          answer: 2,
          answerText: "visited",
          solution: {
            method: "Simple Past Tense",
            steps: [
              "Time marker: 'Last week' = a specific past time.",
              "Simple past = completed action at a specific past point.",
              "'Visited' = past tense of 'visit'. ✓",
              "(1) 'visits' = present habitual; (3) 'was visiting' = past continuous; (4) 'will be visiting' = future.",
            ],
            tip: "'Last week' always signals simple past. 'My father VISITED a relative last week.'",
          },
        },
        {
          id: "scgs22_B14",
          type: "A",
          qNumber: 14,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "My mother and I __________ watching the puppy when it climbed out of the play pen.",
          options: ["is", "are", "was", "were"],
          answer: 4,
          answerText: "were",
          solution: {
            method: "Past Continuous — Subject-Verb Agreement",
            steps: [
              "Sentence structure: '___ watching' = past continuous (was/were + verb-ing).",
              "Context: 'when it climbed out' = past event interrupting an ongoing action → past continuous.",
              "Subject: 'My mother and I' = plural (two people) → 'were'.",
              "'My mother and I WERE watching' ✓",
            ],
            tip: "'My mother and I' = two people = plural → 'were watching'. Past continuous for an ongoing past action.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section C: Grammar Cloze — Underline (Q15–Q18, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secC",
      sectionLabel: "Booklet B — Section C: Grammar Cloze (Underline)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Underline the correct word from the words given in the brackets.",
      marks: 4,
      passage: {
        title: "Nancy and Snoopy",
        text: "It was Monday. Nancy was walking home from school when she (15) [see / saw] a puppy lying on its side. She walked quickly towards the puppy. When it (16) [hears / heard] Nancy's footsteps, it started to whimper. The puppy looked at her hopefully. Nancy (17) [notices / noticed] that it had a name tag around its neck. Suddenly, Nancy recognised the puppy. It was Snoopy! It was the newly adopted puppy of Nancy's neighbour. \"I (18) [am / was] so glad that I recognise you! Now, let's go home. I am sure Mr Yan must be desperately looking for you!\" Snoopy gave a happy yelp!",
      },
      questions: [
        {
          id: "scgs22_C15",
          type: "A",
          qNumber: 15,
          topic: "GrammarCloze",
          marks: 1,
          question: "she (15) [see / saw] a puppy lying on its side.",
          options: ["see", "saw"],
          answer: 2,
          answerText: "saw",
          solution: {
            method: "Past Tense — Narrative Context",
            steps: [
              "The passage is narrated in past tense ('It was Monday', 'she walked').",
              "'When she ___ a puppy' = past tense action.",
              "Past tense of 'see' = 'saw'. ✓",
            ],
            tip: "Past tense of see = saw. All verbs in this narrative passage are past tense.",
          },
        },
        {
          id: "scgs22_C16",
          type: "A",
          qNumber: 16,
          topic: "GrammarCloze",
          marks: 1,
          question: "When it (16) [hears / heard] Nancy's footsteps.",
          options: ["hears", "heard"],
          answer: 2,
          answerText: "heard",
          solution: {
            method: "Past Tense Consistency",
            steps: [
              "Past tense narrative — all actions in this passage are past.",
              "'When it ___ Nancy's footsteps' = when it perceived the sound (past).",
              "Past tense of 'hear' = 'heard'. ✓",
            ],
            tip: "Past tense of hear = heard. The puppy HEARD the footsteps (past event).",
          },
        },
        {
          id: "scgs22_C17",
          type: "A",
          qNumber: 17,
          topic: "GrammarCloze",
          marks: 1,
          question: "Nancy (17) [notices / noticed] that it had a name tag.",
          options: ["notices", "noticed"],
          answer: 2,
          answerText: "noticed",
          solution: {
            method: "Past Tense Consistency",
            steps: [
              "Past tense narrative — 'Nancy was walking', 'walked', 'started' are all past.",
              "'Nancy ___ that it had a name tag' = past action.",
              "Past tense of 'notice' = 'noticed'. ✓",
            ],
            tip: "Past tense of notice = noticed. Keep consistent with the narrative past tense.",
          },
        },
        {
          id: "scgs22_C18",
          type: "A",
          qNumber: 18,
          topic: "GrammarCloze",
          marks: 1,
          question: "\"I (18) [am / was] so glad that I recognise you!\"",
          options: ["am", "was"],
          answer: 1,
          answerText: "am",
          solution: {
            method: "Present Tense in Direct Speech",
            steps: [
              "Nancy is SPEAKING directly to the puppy at this moment.",
              "Direct speech reflects the speaker's present moment → 'I AM glad (right now)'.",
              "Even though the narrative is past tense, the direct speech reflects Nancy's feelings NOW.",
              "'I AM so glad' = present tense inside direct speech. ✓",
            ],
            tip: "In direct speech, the speaker's words reflect their current moment. Nancy says 'I AM glad' because she IS glad right now as she speaks.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section C (cont): Grammar Cloze — Pronouns Word Bank (Q19–Q22, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secC2",
      sectionLabel: "Booklet B — Section C: Grammar Cloze (Pronouns)",
      topic: "GrammarCloze",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given and fill in the blanks. Use each word ONCE only.",
      marks: 4,
      passage: {
        title: "Shanti's Class Project",
        wordBank: [
          { word: "he" },
          { word: "her" },
          { word: "his" },
          { word: "it" },
          { word: "she" },
          { word: "their" },
          { word: "they" },
        ],
        text: "Shanti loves helping others. She wants to help people in any way she can. Last year, (19) ______ and her friends decided to volunteer at a home for the elderly. Together, (20) ______ did some research online and found a few activities to engage the residents at the home. Shanti and her friends also wanted to raise some funds for the elderly home. They approached their form teacher, Mr Seet, for help. (21) ______ suggested that it could be their class project. They thanked him for his suggestion. Everyone in class was very excited to be part of the project. Shanti thought that (22) ______ was a great idea. They started work at once!",
      },
      questions: [
        {
          id: "scgs22_C19",
          type: "A",
          qNumber: 19,
          topic: "GrammarCloze",
          marks: 1,
          question: "Last year, (19) ______ and her friends decided to volunteer.",
          answer: "she",
          solution: {
            method: "Subject Pronoun — Female Singular",
            steps: [
              "Subject of the clause: Shanti (female, singular).",
              "Subject position → subject pronoun: 'she'.",
              "'She and her friends decided' = Shanti and her friends. ✓",
            ],
            tip: "Shanti = she. Subject pronoun (before the verb) = she. 'She and her friends' = Shanti and her friends.",
          },
        },
        {
          id: "scgs22_C20",
          type: "A",
          qNumber: 20,
          topic: "GrammarCloze",
          marks: 1,
          question: "Together, (20) ______ did some research online.",
          answer: "they",
          solution: {
            method: "Subject Pronoun — Plural",
            steps: [
              "'Shanti and her friends' = multiple people = they.",
              "Subject position → 'they'. ✓",
              "'They did some research together.'",
            ],
            tip: "Shanti + friends = multiple people = they. Subject pronoun = they.",
          },
        },
        {
          id: "scgs22_C21",
          type: "A",
          qNumber: 21,
          topic: "GrammarCloze",
          marks: 1,
          question: "(21) ______ suggested that it could be their class project.",
          answer: "He",
          solution: {
            method: "Subject Pronoun — Male Singular",
            steps: [
              "Who suggested the class project? → Mr Seet (their form teacher, male).",
              "Subject pronoun for male singular = 'he'.",
              "'He suggested that it could be their class project.' ✓",
            ],
            tip: "Mr Seet = male = he. Subject pronoun before the verb = He.",
          },
        },
        {
          id: "scgs22_C22",
          type: "A",
          qNumber: 22,
          topic: "GrammarCloze",
          marks: 1,
          question: "Shanti thought that (22) ______ was a great idea.",
          answer: "it",
          solution: {
            method: "Pronoun Reference — Singular Inanimate",
            steps: [
              "What was a great idea? → the class project suggestion.",
              "A plan/suggestion = inanimate, singular → 'it'.",
              "'Shanti thought that IT was a great idea' = she thought the idea/project was great. ✓",
            ],
            tip: "Ideas, plans, suggestions = 'it'. 'Shanti thought IT was a great idea' — IT refers to the class project suggestion.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section D: Vocabulary Cloze (Q23–Q26, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secD",
      sectionLabel: "Booklet B — Section D: Vocabulary Cloze",
      topic: "VocabCloze",
      instructions:
        "Read the passage carefully. Choose the correct word from the words given and fill in the blanks. Use each word ONCE only.",
      marks: 4,
      passage: {
        title: "A Love of Books",
        wordBank: [
          { word: "carelessly" },
          { word: "contented" },
          { word: "cleverly" },
          { word: "inspiration" },
          { word: "pull" },
          { word: "throw" },
        ],
        text: "It does not take much to make me happy. All I need as my companions are books. I am perfectly happy and (23) ______ with sitting the whole day with a storybook in my hands. When I am reading an entertaining book, not even cartoons on television can (24) ______ me away from it. I admire the authors. I always wonder how they are able to write so well and where they get the (25) ______ for their stories. I enjoy the words that they so (26) ______ use. One day, I hope to be an author. I would love to hold in my hands a book that I have written.",
      },
      questions: [
        {
          id: "scgs22_D23",
          type: "A",
          qNumber: 23,
          topic: "VocabCloze",
          marks: 1,
          question: "I am perfectly happy and (23) ______ with sitting the whole day with a storybook.",
          answer: "contented",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "The narrator is 'perfectly happy' sitting all day with books.",
              "'Contented' = satisfied and at peace, feeling no desire for more.",
              "Perfectly happy AND contented = fully satisfied with one's situation. ✓",
            ],
            tip: "'Contented' = satisfied with what you have. 'Happy and contented' = completely satisfied.",
          },
        },
        {
          id: "scgs22_D24",
          type: "A",
          qNumber: 24,
          topic: "VocabCloze",
          marks: 1,
          question: "not even cartoons on television can (24) ______ me away from it.",
          answer: "pull",
          solution: {
            method: "Phrasal Verb / Collocation",
            steps: [
              "'Pull me away from it' = draw/drag me away from the book.",
              "'Pull away from' = make someone leave something they are absorbed in.",
              "Even cartoons cannot PULL her away from reading. ✓",
            ],
            tip: "'Pull away from' = draw away from something. 'Nothing can pull me away from this book' = I'm too absorbed to stop.",
          },
        },
        {
          id: "scgs22_D25",
          type: "A",
          qNumber: 25,
          topic: "VocabCloze",
          marks: 1,
          question: "where they get the (25) ______ for their stories.",
          answer: "inspiration",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "The narrator wonders what gives authors their ideas for stories.",
              "'Inspiration' = what motivates or gives someone ideas for creative work. ✓",
              "Authors get inspiration for their stories from various sources.",
            ],
            tip: "'Inspiration' = the source of creative ideas. Writers get INSPIRATION for their stories.",
          },
        },
        {
          id: "scgs22_D26",
          type: "A",
          qNumber: 26,
          topic: "VocabCloze",
          marks: 1,
          question: "I enjoy the words that they so (26) ______ use.",
          answer: "cleverly",
          solution: {
            method: "Adverb of Manner",
            steps: [
              "The narrator admires how authors write so well.",
              "'Cleverly' = in a skilful and intelligent manner. ✓",
              "Authors use words CLEVERLY = with skill and intelligence.",
            ],
            tip: "'Cleverly' = in a skilled/intelligent way. Authors use words cleverly = with great skill.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section E: Editing (Q27–Q30, 4 marks)
    // Part 1: Spelling errors (Q27–Q28)
    // Part 2: Grammar errors (Q29–Q30)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secE",
      sectionLabel: "Booklet B — Section E: Editing",
      topic: "Editing",
      instructions:
        "Each of the underlined words contains a spelling error (Q27–28) or a grammar error (Q29–30). Write the correct word in each of the boxes.",
      marks: 4,
      questions: [
        {
          id: "scgs22_E27",
          type: "A",
          qNumber: 27,
          topic: "Editing",
          marks: 1,
          question:
            "so it was a suprise that they had been planning for months. (spelling error)",
          errorWord: "suprise",
          answer: "surprise",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Suprise' is missing a letter.",
              "Correct spelling: s-u-r-p-r-i-s-e.",
              "The tricky part: sur-PRISE (not su-prise). The 'p' comes before the 'r' in the second syllable.",
            ],
            tip: "Surprise: s-u-r-p-r-i-s-e. Remember: sur + PRISE. Like 'prize' = sur-prize → surprise.",
          },
        },
        {
          id: "scgs22_E28",
          type: "A",
          qNumber: 28,
          topic: "Editing",
          marks: 1,
          question:
            "The plan was to greet her imedeately when she opened the door. (spelling error)",
          errorWord: "imedeately",
          answer: "immediately",
          solution: {
            method: "Spelling Correction",
            steps: [
              "'Imedeately' is a misspelling.",
              "Correct: i-m-m-e-d-i-a-t-e-l-y.",
              "Key: double 'm' at the start (im-me-di-ate-ly). Break it down: im + mediate + ly.",
            ],
            tip: "Immediately: im-MEDI-ately. Double 'm'. Think: 'im' + 'mediate' + 'ly'. Common misspelling: one 'm' or wrong vowels.",
          },
        },
        {
          id: "scgs22_E29",
          type: "A",
          qNumber: 29,
          topic: "Editing",
          marks: 1,
          question:
            "Every day, she sits on her piano for two hours. (grammar error — preposition)",
          errorWord: "on",
          answer: "at",
          solution: {
            method: "Preposition Correction",
            steps: [
              "'Sits ON her piano' is grammatically incorrect — you don't sit on top of a piano to play it.",
              "The correct preposition: 'sits AT her piano' = sits in front of/at the keyboard to play. ✓",
              "'Sit at' a musical instrument = the correct preposition for playing keyboard instruments.",
            ],
            tip: "You sit AT a piano (in front of it to play), not ON it (on top of it). 'She sits AT her piano.'",
          },
        },
        {
          id: "scgs22_E30",
          type: "A",
          qNumber: 30,
          topic: "Editing",
          marks: 1,
          question:
            "We have decided to put up a musical together at the end of the year. (grammar error — pronoun)",
          errorWord: "We",
          answer: "They",
          solution: {
            method: "Pronoun Agreement",
            steps: [
              "Context: passage is about Elly and her family — third person ('she', 'her family enjoys').",
              "'We' = first person — the narrator/writer is not Elly.",
              "Elly and her family = 'they' (third person plural). ✓",
              "The error: 'We' should be 'They' to match the third-person narrative.",
            ],
            tip: "The passage describes Elly and her family in third person (they/she). 'We' (first person) is wrong here — it should be 'They'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section F: Sentence Combining (Q31–Q34, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secF",
      sectionLabel: "Booklet B — Section F: Sentence Combining",
      topic: "SentenceCombining",
      instructions:
        "Combine each pair of sentences using the word(s) given. The meaning of your sentence must be the same as the sentences given.",
      marks: 4,
      questions: [
        {
          id: "scgs22_F31",
          type: "A",
          qNumber: 31,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Mr Tan managed to run ten rounds. It was not easy.\n\nRewrite using: Although",
          answer: "Although it was not easy, Mr Tan managed to run ten rounds.",
          alternativeAnswers: [
            "Mr Tan managed to run ten rounds although it was not easy.",
          ],
          solution: {
            method: "Sentence Combining — Concession",
            steps: [
              "'Although' = despite the fact that = concession.",
              "Two contrasting ideas: not easy (challenge) VS. managed to run (achievement).",
              "Structure: Although [challenge], [achievement].",
              "'Although it was not easy, Mr Tan managed to run ten rounds.' ✓",
              "Note: When 'Although' starts the sentence, add a comma before the main clause.",
            ],
            tip: "Although [difficult situation], [achievement]. 'Although it was not easy, he managed' — shows determination.",
          },
        },
        {
          id: "scgs22_F32",
          type: "A",
          qNumber: 32,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Molly cheated during the examination. She did not study for the examination.\n\nRewrite using: because",
          answer: "Molly cheated during the examination because she did not study for it.",
          solution: {
            method: "Sentence Combining — Reason",
            steps: [
              "Cause: she did not study.",
              "Effect/action: she cheated.",
              "Structure: [Effect] because [Cause].",
              "'Molly cheated during the examination because she did not study for it.' ✓",
              "Note: Use 'it' to avoid repeating 'the examination'.",
            ],
            tip: "'Because' introduces the reason. Molly cheated BECAUSE she didn't study. Effect first, then 'because', then cause.",
          },
        },
        {
          id: "scgs22_F33",
          type: "A",
          qNumber: 33,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Tom was tired. He went to bed early.\n\nRewrite using: and",
          answer: "Tom was tired and went to bed early.",
          solution: {
            method: "Sentence Combining — Addition",
            steps: [
              "Both sentences have the same subject (Tom).",
              "Join the predicates with 'and': 'was tired AND went to bed early'.",
              "'Tom was tired and went to bed early.' ✓",
              "No need to repeat 'he' — shared subject makes the sentence flow.",
            ],
            tip: "Same subject (Tom) — combine the two predicates with 'and'. 'Tom was tired AND went to bed early.'",
          },
        },
        {
          id: "scgs22_F34",
          type: "A",
          qNumber: 34,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "The pie is ready. Take the pie out of the oven.\n\nRewrite using: when",
          answer: "Take the pie out of the oven when it is ready.",
          solution: {
            method: "Sentence Combining — Time Clause",
            steps: [
              "'When' introduces a time condition.",
              "Condition: the pie is ready.",
              "Action to take: take the pie out of the oven.",
              "Structure: [Action] when [condition].",
              "'Take the pie out of the oven when it is ready.' ✓",
              "Note: Use 'it' to avoid repeating 'the pie'.",
            ],
            tip: "'When [condition], [action]' OR '[Action] when [condition]'. 'Take the pie out when IT is ready.'",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section G: Comprehension OE (Q35–Q41, 8 marks)
    // Ama and the Car Accident
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secG",
      sectionLabel: "Booklet B — Section G: Comprehension",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer questions 35 to 41.",
      marks: 8,
      passage: {
        title: "Ama's Family Road Trip",
        source: "teacher-created",
        text: `It was a warm morning. Ama and her family were driving across the Howard Bridge over the Tampa River. They were ecstatic to travel as a family. The family had moved from Russia to Germany and finally to Florida five years ago. That day, they were on their way to have lunch with their relatives. Ama's two brothers, Rama and Emra, were in the backseat of the car with her.

The siblings were playing games and singing songs. As they approached the end of the bridge, there was a deafening sound. The back left tyre had blown out. The car started to spin across the road. Ama's father tried his best to control the car. Ama and her brothers were petrified. They held on tightly to one another. Ama's mother tried to calm the children. Fortunately, the road was quiet, with only a few cars around.

After a few minutes, the car finally came to a halt. Ama's mother quickly used her mobile phone to call for help. She checked on Ama and her brothers, making sure that the children were not hurt. She was relieved that her family had only suffered some bruises and cuts.

Soon, the police and the ambulance arrived with a tow truck. The police told Ama's family that they were very fortunate that traffic was light that day and that they had only suffered some bruises and cuts. The police gave the family a ride to their relatives' home.`,
      },
      questions: [
        {
          id: "scgs22_G35",
          type: "A",
          qNumber: 35,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write one sentence from paragraph 1 which has a similar meaning to 'being very happy'. [1m]",
          answer: "They were ecstatic to travel as a family.",
          solution: {
            method: "Vocabulary — Find Synonym Sentence",
            steps: [
              "'Being very happy' = ecstatic / overjoyed.",
              "Look in paragraph 1 for a sentence expressing great happiness.",
              "Found: 'They were ecstatic to travel as a family.'",
              "'Ecstatic' = extremely happy. ✓",
            ],
            tip: "'Ecstatic' = extremely happy/overjoyed. The sentence 'They were ecstatic to travel as a family' means they were very happy.",
          },
        },
        {
          id: "scgs22_G36",
          type: "A",
          qNumber: 36,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 in the blanks below to show the order of the places that Ama and her family had lived in. [1m]\n\n___ Germany\n___ Russia\n___ Florida",
          answer: "2 / 1 / 3",
          answerDetail: {
            "Germany": "2",
            "Russia": "1",
            "Florida": "3",
          },
          solution: {
            method: "Sequencing",
            steps: [
              "Passage: 'The family had moved from Russia to Germany and finally to Florida.'",
              "Order of places: Russia (first) → Germany (second) → Florida (final).",
              "Russia = 1, Germany = 2, Florida = 3.",
            ],
            tip: "Follow the passage: 'from Russia (1) to Germany (2) and finally to Florida (3).'",
          },
        },
        {
          id: "scgs22_G37",
          type: "A",
          qNumber: 37,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "Ama was __________ when the accident happened. Tick (√) your chosen answer.",
          options: ["calm", "elated", "frightened"],
          answer: 3,
          answerText: "frightened",
          solution: {
            method: "Inferential Comprehension",
            steps: [
              "Passage: 'Ama and her brothers were petrified. They held on tightly to one another.'",
              "'Petrified' = extremely frightened.",
              "She was NOT calm (she was petrified) and NOT elated (happy — she was scared).",
              "Frightened ✓",
            ],
            tip: "'Petrified' = extremely frightened. Ama was FRIGHTENED during the accident.",
          },
        },
        {
          id: "scgs22_G38",
          type: "A",
          qNumber: 38,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: The car drove over a blown-out tyre.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'The back left tyre had blown out.' — the tyre OF the car blew out.",
              "The statement says 'the car drove over a blown-out tyre' — as if it hit another tyre.",
              "The tyre blew out (burst), the car did NOT drive over a tyre.",
              "Statement is FALSE. ✓",
            ],
            tip: "The car's OWN tyre blew out. The car did not drive over someone else's blown-out tyre. FALSE.",
          },
        },
        {
          id: "scgs22_G39",
          type: "A",
          qNumber: 39,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: Ama's mother was driving the car.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'Ama's father tried his best to control the car.'",
              "Ama's FATHER was driving, not her mother.",
              "Statement says 'Ama's mother was driving' → FALSE. ✓",
            ],
            tip: "'Ama's FATHER tried his best to control the car' → Father was driving, not mother. FALSE.",
          },
        },
        {
          id: "scgs22_G40",
          type: "A",
          qNumber: 40,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: There were five people in the car.",
          options: ["True", "False"],
          answer: 1,
          answerText: "True",
          solution: {
            method: "Literal — True/False, Counting",
            steps: [
              "People in the car: Ama + her two brothers (Rama and Emra) + Father + Mother = 5.",
              "The passage mentions: 'Ama and her family' + 'Ama's two brothers, Rama and Emra, were in the backseat with her' + father driving + mother.",
              "Count: Ama + Rama + Emra + Father + Mother = 5 people. TRUE. ✓",
            ],
            tip: "Count carefully: Ama (1) + Rama (2) + Emra (3) + Father (4) + Mother (5) = 5 people. TRUE.",
          },
        },
        {
          id: "scgs22_G41",
          type: "A",
          qNumber: 41,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "Based on paragraph 4, why did the police say that Ama's family was fortunate? [2m]",
          answer:
            "The police said Ama's family was fortunate because traffic was light that day and they had only suffered some bruises and cuts.",
          solution: {
            method: "Open-Ended — Two Reasons",
            steps: [
              "Passage: 'The police told Ama's family that they were very fortunate that traffic was light that day and that they had only suffered some bruises and cuts.'",
              "Two reasons: (1) traffic was light (few cars on the road — fewer accidents could happen); (2) they only had minor injuries (bruises and cuts, nothing serious).",
              "2-mark question = two reasons expected.",
            ],
            tip: "Two reasons directly from the passage: (1) traffic was light; (2) only bruises and cuts (minor injuries). Both must be included for 2 marks.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B — Section H: Comprehension OE (Q42–Q48, 8 marks)
    // The Cobbler and the Banker
    // ─────────────────────────────────────────────
    {
      id: "scgs22_secH",
      sectionLabel: "Booklet B — Section H: Comprehension",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer questions 42 to 48.",
      marks: 8,
      passage: {
        title: "The Cobbler and the Banker",
        source: "Adapted from Selected Fables from Europe",
        text: `A cobbler and a banker were neighbours. The cobbler was always singing as he worked. Whatever he earned from making and repairing shoes was just enough for food and simple clothing for his family, yet he was always cheerful.

Unlike the cobbler, the banker was almost always frowning. He hardly laughed and seemed to be unhappy all the time. The banker never sang.

One day, while the banker was taking an afternoon nap, he was rudely awakened by the cobbler's ear-piercing singing. Irritated by the singing, he decided to put a stop to it. He thought hard and devised a plan.

The banker went over to the cobbler's house where he was greeted cheerfully by the cobbler. He offered to pay the cobbler well if he looked after a bag of gold coins for him. The cobbler agreed to his offer as he wanted to be able to give his family a better life.

The cobbler thought that it was an easy job. He dug a hole and buried the bag of gold. However, now he had something to worry about. He was worried that robbers might take it away. He was so worried that he stopped singing. He was unable to sleep well. Seeing him worry made his family unhappy.

Suddenly, the cobbler realised that the bag of gold coins had destroyed his happiness. He quickly returned the bag of gold coins to the banker. Soon after, he was singing happily again.`,
      },
      questions: [
        {
          id: "scgs22_H42",
          type: "A",
          qNumber: 42,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in paragraph 2 has the same meaning as 'almost not'? [1m]",
          answer: "hardly",
          solution: {
            method: "Vocabulary — Find Synonym",
            steps: [
              "'Almost not' = barely / hardly.",
              "Paragraph 2: 'He HARDLY laughed and seemed to be unhappy all the time.'",
              "'Hardly' = almost never / barely at all. ✓",
            ],
            tip: "'Hardly' = almost not / barely. 'He hardly laughed' = he almost never laughed.",
          },
        },
        {
          id: "scgs22_H43",
          type: "A",
          qNumber: 43,
          topic: "ComprehensionMCQ",
          marks: 1,
          question:
            "The cobbler had a/an __________ personality. Tick (√) your chosen answer.",
          options: ["jovial", "bossy", "grumpy"],
          answer: 1,
          answerText: "jovial",
          solution: {
            method: "Character Analysis",
            steps: [
              "Passage describes the cobbler: 'always singing', 'always cheerful', 'greeted cheerfully'.",
              "'Jovial' = cheerful and friendly. ✓",
              "(2) 'bossy' = likes to give orders; (3) 'grumpy' = bad-tempered (that describes the banker).",
            ],
            tip: "'Jovial' = cheerful and friendly. Always singing + cheerful + greets people warmly = jovial personality.",
          },
        },
        {
          id: "scgs22_H44",
          type: "A",
          qNumber: 44,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: The banker enjoyed the cobbler's singing.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'he was rudely awakened by the cobbler's ear-piercing singing. Irritated by the singing, he decided to put a stop to it.'",
              "The banker was IRRITATED by the singing — he did NOT enjoy it.",
              "Statement is FALSE. ✓",
            ],
            tip: "Irritated + decided to put a stop to it = he did NOT enjoy the singing. FALSE.",
          },
        },
        {
          id: "scgs22_H45",
          type: "A",
          qNumber: 45,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: The cobbler was not willing to take on his new job at first.",
          options: ["True", "False"],
          answer: 2,
          answerText: "False",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'The cobbler agreed to his offer as he wanted to be able to give his family a better life.'",
              "The cobbler AGREED immediately — he was willing.",
              "Statement says 'not willing at first' → FALSE. ✓",
            ],
            tip: "'The cobbler agreed to his offer' = he was willing to take the job. He didn't hesitate. FALSE.",
          },
        },
        {
          id: "scgs22_H46",
          type: "A",
          qNumber: 46,
          topic: "ComprehensionMCQ",
          marks: 1,
          question: "True or False: The cobbler was happy again after returning the bag of coins.",
          options: ["True", "False"],
          answer: 1,
          answerText: "True",
          solution: {
            method: "Literal — True/False",
            steps: [
              "Passage: 'He quickly returned the bag of gold coins to the banker. Soon after, he was singing happily again.'",
              "After returning the coins = singing happily = happy again.",
              "Statement is TRUE. ✓",
            ],
            tip: "After returning the gold, 'he was singing happily again' = he was happy again. TRUE.",
          },
        },
        {
          id: "scgs22_H47",
          type: "A",
          qNumber: 47,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "List two actions of the cobbler which show how worried he was. [2m]\n(i) ___\n(ii) ___",
          answer: [
            "(i) He stopped singing.",
            "(ii) He was unable to sleep well.",
          ],
          solution: {
            method: "Open-Ended — Find Two Pieces of Evidence",
            steps: [
              "Look in paragraph 5 for actions showing worry.",
              "Passage: 'He was so worried that he stopped singing. He was unable to sleep well.'",
              "Two evidence-based actions: (1) stopped singing; (2) unable to sleep well.",
              "Each is a direct action caused by his worry.",
            ],
            tip: "Two actions from the passage: (1) stopped singing; (2) unable to sleep well. Both show he was very worried.",
          },
        },
        {
          id: "scgs22_H48",
          type: "A",
          qNumber: 48,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Why did the cobbler return the gold coins to the banker? [1m]",
          answer:
            "The cobbler returned the gold coins to the banker because he realised that the bag of gold coins had destroyed his happiness.",
          solution: {
            method: "Literal — Reason",
            steps: [
              "Passage: 'the cobbler realised that the bag of gold coins had destroyed his happiness. He quickly returned the bag of gold coins to the banker.'",
              "Reason: the gold had taken away his happiness (he was worried, couldn't sleep, stopped singing).",
            ],
            tip: "The cobbler returned the gold BECAUSE it had destroyed his happiness. The gold brought worry, not joy.",
          },
        },
      ],
    },
  ],
};

export default eoy_scgs_p2_2022;
