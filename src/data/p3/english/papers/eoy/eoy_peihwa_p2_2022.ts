// src/data/p3/english/papers/eoy_peihwa_p2_2022.ts
// Pei Hwa Presbyterian Primary School — P3 English Semestral Assessment 2 (EOY) 2022
// Paper 2: Q1–Q49, 50 marks
// Sections: A Vocab MCQ, B Grammar MCQ, C Visual Text MCQ,
//           D Vocab Cloze (×2), E Grammar Cloze (×2), F Connectors/Synthesis, G Comprehension OE

import { PaperSet } from "../../types";

const eoy_peihwa_p2_2022: PaperSet = {
  id: "eoy_peihwa_p2_2022",
  school: "Pei Hwa Presbyterian Primary School",
  schoolCode: "peihwa",
  level: "P3",
  subject: "English",
  paperType: "EOY",
  year: 2022,
  paper: 2,
  totalMarks: 50,
  sections: [
    // ─────────────────────────────────────────────
    // Section A: Vocabulary MCQ (Q1–Q7, 7 marks)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secA",
      sectionLabel: "Section A: Vocabulary MCQ",
      topic: "VocabMCQ",
      instructions:
        "For Questions 1 to 17, choose the correct answer and shade your answer in the Optical Answer Sheet (OAS) provided.",
      marks: 7,
      questions: [
        {
          id: "ph22_A1",
          type: "A",
          qNumber: 1,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "The hungry __________ of wolves worked together to catch their prey.",
          options: ["pod", "flock", "pack", "swarm"],
          answer: 3,
          answerText: "pack",
          solution: {
            method: "Collective Nouns for Animals",
            steps: [
              "Identify the animal: wolves.",
              "A collective noun for wolves = a PACK of wolves.",
              "(1) pod = dolphins/whales; (2) flock = birds/sheep; (4) swarm = bees/insects.",
              "'A pack of wolves' is the correct collective noun.",
            ],
            tip: "Collective nouns to memorise: pack (wolves/dogs), flock (birds/sheep), pod (dolphins), swarm (bees), pride (lions), herd (elephants/cattle).",
          },
        },
        {
          id: "ph22_A2",
          type: "A",
          qNumber: 2,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "My mother has been cleaning up the house for Chinese New Year, she is __________.",
          options: [
            "as busy as a bee",
            "as dry as a bone",
            "as blind as a bat",
            "as big as rocks",
          ],
          answer: 1,
          answerText: "as busy as a bee",
          solution: {
            method: "Similes in Context",
            steps: [
              "Context: mother has been cleaning the house — she is doing a lot of work.",
              "'As busy as a bee' = extremely busy (bees are always working hard).",
              "(2) 'as dry as a bone' = completely dry; (3) 'as blind as a bat' = unable to see well; (4) 'as big as rocks' — not a standard simile.",
              "Cleaning non-stop for CNY = very busy → 'as busy as a bee'.",
            ],
            tip: "'As busy as a bee' is used for someone working very hard without stopping. Perfect for CNY cleaning!",
          },
        },
        {
          id: "ph22_A3",
          type: "A",
          qNumber: 3,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Lizards have the ability to __________ their tails from their bodies when they are in danger.",
          options: ["free", "detach", "remove", "loosen"],
          answer: 2,
          answerText: "detach",
          solution: {
            method: "Precise Verb — Biology Context",
            steps: [
              "Context: lizards separate their tails from their bodies as a defence mechanism (autotomy).",
              "'Detach' = separate/disconnect one thing from another (technical/precise word).",
              "(1) 'free' = release; (3) 'remove' = take away (usually by an external agent); (4) 'loosen' = make less tight, not separate completely.",
              "'Detach' specifically means to separate a part from a whole, which is what lizards do with their tails.",
            ],
            tip: "'Detach' = disconnect/separate. Lizards DETACH their tails — this is called autotomy in science.",
          },
        },
        {
          id: "ph22_A4",
          type: "A",
          qNumber: 4,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "I used to be a __________ boy whose rib cage was showing. But, after months of training, I am very fit now.",
          options: ["plump", "brawny", "scrawny", "muscular"],
          answer: 3,
          answerText: "scrawny",
          solution: {
            method: "Adjectives Describing Body Type",
            steps: [
              "Clue: 'rib cage was showing' = extremely thin, bones visible.",
              "'Scrawny' = unhealthily thin and bony.",
              "(1) 'plump' = slightly fat/rounded; (2) 'brawny' = muscular and strong; (4) 'muscular' = having well-developed muscles.",
              "Visible rib cage = too thin → 'scrawny'.",
            ],
            tip: "Scrawny = unhealthily thin (bones visible). Contrast: after training he became fit — so he used to be scrawny (too thin).",
          },
        },
        {
          id: "ph22_A5",
          type: "A",
          qNumber: 5,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Jane refused to talk to Tom as he had broken his __________ of not telling anyone her secret.",
          options: ["rule", "fever", "silence", "promise"],
          answer: 4,
          answerText: "promise",
          solution: {
            method: "Collocations / Precise Noun",
            steps: [
              "Context: Tom had agreed not to tell Jane's secret but broke that agreement.",
              "When you make an agreement to do (or not do) something = a PROMISE.",
              "'Broken his promise' = failed to keep his word.",
              "(1) 'rule' = a regulation; (2) 'fever' = illness; (3) 'silence' = quietness (you 'break silence' but not 'break a silence of not telling').",
              "'Promise' collocates perfectly: 'he broke his promise not to tell'.",
            ],
            tip: "'Break a promise' = fail to keep a commitment you made. Standard collocation: break/keep a promise.",
          },
        },
        {
          id: "ph22_A6",
          type: "A",
          qNumber: 6,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Jake was severely __________ by his father for attempting a dangerous stunt.",
          options: ["interrupted", "complimented", "commended", "reprimanded"],
          answer: 4,
          answerText: "reprimanded",
          solution: {
            method: "Precise Verb — Discipline",
            steps: [
              "Context: Jake attempted a dangerous stunt; his father scolded him severely.",
              "'Reprimanded' = formally told off / scolded severely (especially by an authority figure).",
              "(1) 'interrupted' = stopped someone mid-action; (2) 'complimented' = praised; (3) 'commended' = praised formally.",
              "Both (2) and (3) are positive — but doing a dangerous stunt should lead to scolding.",
              "'Reprimanded' = severely scolded. ✓",
            ],
            tip: "'Reprimand' = strongly rebuke/scold. Used when authority figures tell someone off for bad behaviour. Opposite of 'commend/compliment'.",
          },
        },
        {
          id: "ph22_A7",
          type: "A",
          qNumber: 7,
          topic: "VocabMCQ",
          marks: 1,
          question:
            "Mary immediately __________ her toys into the cupboard when she heard footsteps.",
          options: ["shoved", "scooped", "drove", "retreated"],
          answer: 1,
          answerText: "shoved",
          solution: {
            method: "Precise Verb — Action",
            steps: [
              "Context: Mary heard footsteps and quickly pushed toys into cupboard — hurried, forceful action.",
              "'Shoved' = pushed roughly and quickly.",
              "(2) 'scooped' = picked up in a scooping motion (appropriate for loose items like coins, not usually toys into a cupboard); (3) 'drove' = operated a vehicle, or forced in a direction; (4) 'retreated' = moved back/away.",
              "'Shoved' best fits the quick, forceful pushing of toys into a cupboard.",
            ],
            tip: "'Shove' = push forcefully and quickly. 'She shoved her toys in the cupboard' conveys panic and speed.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section B: Grammar MCQ (Q8–Q17, 10 marks)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secB",
      sectionLabel: "Section B: Grammar MCQ",
      topic: "GrammarMCQ",
      instructions:
        "Choose the correct answer and shade your answer in the Optical Answer Sheet (OAS) provided.",
      marks: 10,
      questions: [
        {
          id: "ph22_B8",
          type: "A",
          qNumber: 8,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Tim __________ seen running along the corridor yesterday.",
          options: ["is", "are", "was", "were"],
          answer: 3,
          answerText: "was",
          solution: {
            method: "Passive Voice — Past Tense",
            steps: [
              "Sentence: 'Tim ___ seen running' — passive voice (Tim is the one being seen).",
              "Time clue: 'yesterday' → past tense.",
              "Passive voice formula: was/were + past participle.",
              "Subject 'Tim' = singular → 'was seen'.",
              "(1) 'is' = present singular; (2) 'are' = present plural; (4) 'were' = past plural.",
            ],
            tip: "Passive past: was/were + past participle. Singular subject → 'was'. 'Tim WAS seen running.'",
          },
        },
        {
          id: "ph22_B9",
          type: "A",
          qNumber: 9,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Peter __________ to London next month.",
          options: ["travels", "travelled", "will travel", "have travelled"],
          answer: 3,
          answerText: "will travel",
          solution: {
            method: "Future Tense",
            steps: [
              "Time clue: 'next month' — a future time reference.",
              "For definite future plans: 'will + base verb' or present continuous.",
              "'Will travel' = simple future. ✓",
              "(1) 'travels' = habitual present; (2) 'travelled' = past; (4) 'have travelled' = present perfect (completed action with past-to-present relevance).",
            ],
            tip: "'Next month/week/year' → future tense. Use 'will + base verb' for future facts/plans.",
          },
        },
        {
          id: "ph22_B10",
          type: "A",
          qNumber: 10,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "As her parents were not at home, Sally must prepare lunch by __________.",
          options: ["myself", "yourself", "herself", "themselves"],
          answer: 3,
          answerText: "herself",
          solution: {
            method: "Reflexive Pronouns",
            steps: [
              "Subject: 'Sally' — 3rd person singular female.",
              "'Prepare lunch by ___' = do it alone without help → reflexive pronoun.",
              "Sally (she) → 'herself'.",
              "(1) 'myself' = I/me; (2) 'yourself' = you; (4) 'themselves' = they.",
            ],
            tip: "Reflexive pronouns: I→myself, you→yourself, he→himself, she→herself, we→ourselves, they→themselves.",
          },
        },
        {
          id: "ph22_B11",
          type: "A",
          qNumber: 11,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"__________ bag is yours?" Jimmy asked Ali.',
          options: ["Who", "What", "Which", "Whose"],
          answer: 3,
          answerText: "Whose",
          solution: {
            method: "Interrogative Pronouns / Adjectives",
            steps: [
              "The question asks about POSSESSION/OWNERSHIP of the bag.",
              "'Whose' = interrogative for possession (belonging to whom).",
              "(1) 'Who' = asks about a person (subject); (2) 'What' = asks about a thing; (3) 'Which' = asks about a choice among options.",
              "'Whose bag is yours?' asks who owns the bag → 'Whose'.",
            ],
            tip: "'Whose' = belonging to whom. 'Whose book is this?' 'Whose turn is it?' Always for possession.",
          },
        },
        {
          id: "ph22_B12",
          type: "A",
          qNumber: 12,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Jordan wanted to watch the musical __________ he could not afford the tickets.",
          options: ["as", "but", "since", "when"],
          answer: 2,
          answerText: "but",
          solution: {
            method: "Conjunctions — Contrast",
            steps: [
              "Two contrasting ideas: wanted to watch (positive desire) VS. could not afford (negative obstacle).",
              "'But' = contrast/contradiction between two clauses.",
              "(1) 'as' = because/time; (3) 'since' = because/from the time; (4) 'when' = at the time.",
              "Only 'but' creates the contrast between wanting and not being able to.",
            ],
            tip: "'But' joins two contrasting ideas: 'He wanted to go BUT he couldn't afford it.'",
          },
        },
        {
          id: "ph22_B13",
          type: "A",
          qNumber: 13,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "There is __________ water in the canal due to the heavy rain last night.",
          options: ["few", "many", "plenty", "a lot of"],
          answer: 4,
          answerText: "a lot of",
          solution: {
            method: "Quantifiers — Uncountable Nouns with 'There is'",
            steps: [
              "'Water' = uncountable noun; 'There IS' = singular verb form.",
              "For uncountable nouns: 'much', 'a lot of', 'plenty of' (but 'plenty' needs 'of').",
              "(1) 'few' and (2) 'many' = for countable plural nouns.",
              "(3) 'plenty' alone cannot precede a noun — needs 'of': 'plenty OF water'.",
              "'A lot of' works with both countable and uncountable → correct here.",
            ],
            tip: "'A lot of' is versatile — use with both countable ('a lot of books') and uncountable ('a lot of water'). 'Plenty of water' also correct but 'plenty water' is wrong.",
          },
        },
        {
          id: "ph22_B14",
          type: "A",
          qNumber: 14,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "The mouse did not __________ when the Gruffalo wanted to eat it up.",
          options: ["shiver", "shivers", "shivered", "shivering"],
          answer: 1,
          answerText: "shiver",
          solution: {
            method: "Negative Auxiliary + Base Verb",
            steps: [
              "Sentence: 'did not ___' — auxiliary 'did' + 'not' is used for past negative.",
              "After 'did not', always use the BASE form of the verb.",
              "'did not shiver' = correct. ✓",
              "(2) 'shivers' = 3rd person present; (3) 'shivered' = past — but 'did shivered' is wrong; (4) 'shivering' = present participle.",
            ],
            tip: "Did not + BASE VERB. 'Did not go' ✓, 'did not went' ✗. After auxiliary 'did', the main verb is always base form.",
          },
        },
        {
          id: "ph22_B15",
          type: "A",
          qNumber: 15,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            '"Mum, look at __________ adorable dog across the road!" Lily said excitedly.',
          options: ["this", "that", "these", "those"],
          answer: 2,
          answerText: "that",
          solution: {
            method: "Demonstrative Adjectives — Distance",
            steps: [
              "The dog is 'across the road' = far away from the speaker (Lily).",
              "Far away + singular noun (dog) → 'that'.",
              "(1) 'this' = near + singular; (3) 'these' = near + plural; (4) 'those' = far + plural.",
              "One dog, far away → 'that adorable dog'.",
            ],
            tip: "This/these = near. That/those = far. One dog = singular → 'that'.",
          },
        },
        {
          id: "ph22_B16",
          type: "A",
          qNumber: 16,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Mr Teo is going to Australia for work, __________?",
          options: ["isn't he", "didn't he", "wasn't he", "doesn't he"],
          answer: 1,
          answerText: "isn't he",
          solution: {
            method: "Question Tags",
            steps: [
              "Main clause: 'Mr Teo IS going to Australia' — auxiliary verb is 'is' (present continuous).",
              "Question tag = negate the auxiliary: IS → ISN'T.",
              "Subject is 'Mr Teo' (singular male) → 'he'.",
              "Tag: 'isn't he?' ✓",
              "(2) 'didn't he' = for past simple; (3) 'wasn't he' = for past continuous; (4) 'doesn't he' = for present simple.",
            ],
            tip: "Question tag = negative of the SAME auxiliary in the main clause + pronoun. 'IS going' → 'isn't he?'",
          },
        },
        {
          id: "ph22_B17",
          type: "A",
          qNumber: 17,
          topic: "GrammarMCQ",
          marks: 1,
          question:
            "Jenny took a rest __________ the lake.",
          options: ["by", "under", "against", "between"],
          answer: 1,
          answerText: "by",
          solution: {
            method: "Prepositions of Location",
            steps: [
              "Context: Jenny took a rest near/beside the lake.",
              "'By' = beside/next to.",
              "(2) 'under' = below; (3) 'against' = touching the side of; (4) 'between' = in the middle of two things.",
              "'Rested by the lake' = rested beside/at the side of the lake. ✓",
            ],
            tip: "'By' can mean 'beside/next to': 'sitting by the window', 'resting by the lake'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section C: Visual Text Comprehension (Q18–Q22, 5 marks)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secC",
      sectionLabel: "Section C: Visual Text Comprehension",
      topic: "VisualText",
      instructions:
        "For Questions 18–22, choose the correct answer and shade your answer in the Optical Answer Sheet (OAS) provided.",
      marks: 5,
      visualText: {
        title: "Young Scientists Science Week",
        type: "Poster/Flyer",
        content: {
          mainTitle: "YOUNG SCIENTISTS SCIENCE WEEK — 12 TO 18 DECEMBER 2022",
          tagline: "Join us for some exciting activities during the holidays and learn some Science facts! Proudly brought to you by the Science Museum.",
          events: [
            {
              name: "Scientific Hunt",
              who: "For 7 to 10 years old",
              when: "Daily",
              where: "Halls A, B, C",
              what: "Answer all questions correctly to get an attractive badge! Limited to 100 badges per day.",
            },
            {
              name: "Arouse your Curiosity Time",
              who: "For 6 to 12 years old",
              when: "Thursday to Saturday",
              where: "Halls D, E, F",
              what: "Science booths with interesting activities for you to participate in. Join us for a FUN-tastic time with our Science Enthusiasts!",
              note: "Admission fee to the Science Museum applies.",
            },
            {
              name: "Food Science Workshop",
              who: "For 9 to 12 years old",
              when: "17 and 18 December 2022",
              where: "Science Labs 1 and 2",
              what: "Learn to make cool Science experiments with food items provided by us. Register at the information counter. Limited spaces! Note: You must be accompanied by an adult.",
            },
          ],
          sponsors: ["CT Supermarket", "BluzPrint Singapore", "GBookpular"],
          collaboration: "In collaboration with A* Pte Ltd",
          enquiries: "For enquiries, please call Ms Lily Ng at 6787 8234.",
        },
      },
      questions: [
        {
          id: "ph22_C18",
          type: "A",
          qNumber: 18,
          topic: "VisualText",
          marks: 1,
          question:
            "The main aim of this poster is to encourage pupils to __________.",
          options: [
            "get the attractive badge.",
            "be friends with the Science Enthusiasts.",
            "participate in activities during the Science Week.",
            "learn to make cool experiments using food items.",
          ],
          answer: 3,
          answerText: "participate in activities during the Science Week.",
          solution: {
            method: "Main Purpose of a Visual Text",
            steps: [
              "The poster is about 'YOUNG SCIENTISTS SCIENCE WEEK' with multiple activities.",
              "The overall aim is to encourage pupils to participate in activities during the event.",
              "(1) Getting a badge is a reward for ONE specific activity (Scientific Hunt); (2) Being friends with Science Enthusiasts is mentioned in one sub-event; (4) Making experiments is ONE workshop.",
              "The MAIN/overall aim covers ALL activities → participating in Science Week events.",
            ],
            tip: "For 'main aim' questions, look at the overall purpose, not a detail of one sub-event.",
          },
        },
        {
          id: "ph22_C19",
          type: "A",
          qNumber: 19,
          topic: "VisualText",
          marks: 1,
          question:
            "The event is organized by __________.",
          options: [
            "Lily Ng",
            "Science Week",
            "Science Museum",
            "Science Enthusiasts",
          ],
          answer: 3,
          answerText: "Science Museum",
          solution: {
            method: "Literal — Organiser",
            steps: [
              "The poster states: 'Proudly brought to you by the Science Museum.'",
              "The Science Museum is the organiser.",
              "(1) Lily Ng = contact person for enquiries; (4) Science Enthusiasts = volunteers/participants mentioned in one event.",
            ],
            tip: "'Brought to you by' = organised by. The Science Museum is the organiser.",
          },
        },
        {
          id: "ph22_C20",
          type: "A",
          qNumber: 20,
          topic: "VisualText",
          marks: 1,
          question:
            "Which of the following is NOT a sponsor for the Young Scientists Science Week?",
          options: [
            "A* Pte Ltd",
            "GBookpular",
            "CT Supermarket",
            "BluzPrint Singapore",
          ],
          answer: 1,
          answerText: "A* Pte Ltd",
          solution: {
            method: "Literal — Sponsors vs Collaborator",
            steps: [
              "Sponsors listed: CT Supermarket, BluzPrint Singapore, GBookpular.",
              "A* Pte Ltd is listed under 'In collaboration with' — this makes it a COLLABORATOR, not a SPONSOR.",
              "The distinction: sponsors (CT Supermarket, BluzPrint, GBookpular) vs collaborator (A* Pte Ltd).",
            ],
            tip: "Read carefully: 'Sponsors' and 'In collaboration with' are different categories. A* Pte Ltd is a collaborator, not a sponsor.",
          },
        },
        {
          id: "ph22_C21",
          type: "A",
          qNumber: 21,
          topic: "VisualText",
          marks: 1,
          question:
            "Nikki wants to participate in the Food Science Workshop, she must __________.",
          options: [
            "call Lily Ng.",
            "be at least 6 years old.",
            "bring food items from home.",
            "be accompanied by an adult.",
          ],
          answer: 4,
          answerText: "be accompanied by an adult.",
          solution: {
            method: "Literal — Conditions for Participation",
            steps: [
              "Food Science Workshop requirements from the poster:",
              "- For 9 to 12 years old (so age requirement is 9, not 6).",
              "- Register at the information counter (not call Lily Ng who handles general enquiries).",
              "- 'food items provided by us' — she does NOT bring food.",
              "- 'You must be accompanied by an adult.' ✓ This is a definite requirement.",
            ],
            tip: "Read the Food Science Workshop section carefully. The clear rule stated is: must be accompanied by an adult.",
          },
        },
        {
          id: "ph22_C22",
          type: "A",
          qNumber: 22,
          topic: "VisualText",
          marks: 1,
          question:
            "Which of the following is TRUE?",
          options: [
            "Admission to the Science Museum is free.",
            "You may call Ms Lily Ng for any enquiries.",
            "The Food Science Workshop is available every day.",
            "You will be assured of a badge when you take part in the Scientific Hunt.",
          ],
          answer: 2,
          answerText: "You may call Ms Lily Ng for any enquiries.",
          solution: {
            method: "True/False from Visual Text",
            steps: [
              "(1) FALSE — 'Admission fee to the Science Museum applies' for Arouse your Curiosity Time.",
              "(2) TRUE — 'For enquiries, please call Ms Lily Ng at 6787 8234.' ✓",
              "(3) FALSE — Food Science Workshop is only on 17 and 18 December (not every day).",
              "(4) FALSE — 'Limited to 100 badges per day' means NOT everyone is assured of a badge.",
            ],
            tip: "Always verify each option against the text. 'Limited to 100 badges' means you are NOT assured. Admission fee DOES apply for Curiosity Time.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section D: Vocabulary Cloze (Q23–Q30, 8 marks)
    // Passage 1: Venus Flytrap (Q23–Q26, word bank)
    // Passage 2: Ken's Score (Q27–Q30, open cloze)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secD_p1",
      sectionLabel: "Section D: Vocabulary Cloze — Passage 1 (Word Bank)",
      topic: "VocabCloze",
      instructions:
        "Choose from the words given in the boxes and fill in each blank with the correct LETTER. Use each word ONCE only.",
      marks: 4,
      passage: {
        title: "The Venus Flytrap",
        wordBank: [
          { letter: "A", word: "nutrients" },
          { letter: "B", word: "spikes" },
          { letter: "C", word: "responsibility" },
          { letter: "D", word: "attracts" },
          { letter: "E", word: "trapped" },
          { letter: "F", word: "carnivorous" },
        ],
        text: "The Venus Flytrap is a plant that traps and eats insects. It belongs to a group of (23) ______ plants. This group also includes sundews and pitcher plants. The Venus Flytrap is a small plant with leaves that have toothed edges and hairs on top which are sensitive to touch. The leaf releases sweet nectar that (24) ______ flies and other insects. When an insect crawls between the two halves of a leaf, the hairs detect its presence. In less than a second, the leaf snaps shut and the toothed edges lock together. Once the insect is (25) ______, the leaf releases digestive juices. This is the start of the digestive process. The leaf absorbs the (26) ______ from the insect and transports them to all parts of the plant. This ensures that the plant grows well.",
      },
      questions: [
        {
          id: "ph22_D23",
          type: "A",
          qNumber: 23,
          topic: "VocabCloze",
          marks: 1,
          question: "It belongs to a group of (23) ______ plants.",
          answer: "F",
          answerText: "carnivorous",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "The passage describes Venus Flytraps as plants that 'trap and eat insects'.",
              "'Carnivorous' = meat-eating. Plants that eat animals/insects = carnivorous plants.",
              "The group includes sundews and pitcher plants — all insect-eating plants.",
            ],
            tip: "Carnivorous = meat-eating. Carnivorous plants eat insects. The clue is 'traps and eats insects'.",
          },
        },
        {
          id: "ph22_D24",
          type: "A",
          qNumber: 24,
          topic: "VocabCloze",
          marks: 1,
          question: "The leaf releases sweet nectar that (24) ______ flies and other insects.",
          answer: "D",
          answerText: "attracts",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "Sweet nectar is a lure — it draws insects in.",
              "'Attracts' = draws something/someone towards it.",
              "Sweet nectar ATTRACTS flies (they come to it). This is how the trap works.",
            ],
            tip: "Nectar attracts insects just like flowers attract bees. The nectar is the lure that ATTRACTS flies.",
          },
        },
        {
          id: "ph22_D25",
          type: "A",
          qNumber: 25,
          topic: "VocabCloze",
          marks: 1,
          question: "Once the insect is (25) ______, the leaf releases digestive juices.",
          answer: "E",
          answerText: "trapped",
          solution: {
            method: "Context Vocabulary",
            steps: [
              "The leaf snaps shut and locks the insect inside — the insect cannot escape.",
              "'Trapped' = caught/enclosed and unable to escape.",
              "Only after the insect is trapped does the digestive process begin.",
            ],
            tip: "The leaf snaps shut → insect cannot escape = the insect is TRAPPED. Then digestion begins.",
          },
        },
        {
          id: "ph22_D26",
          type: "A",
          qNumber: 26,
          topic: "VocabCloze",
          marks: 1,
          question: "The leaf absorbs the (26) ______ from the insect and transports them to all parts of the plant.",
          answer: "A",
          answerText: "nutrients",
          solution: {
            method: "Context Vocabulary — Science",
            steps: [
              "The plant digests the insect to absorb what it needs to grow.",
              "'Nutrients' = substances that plants/animals need for energy and growth.",
              "The purpose of eating insects: to get nutrients (since the plant's soil may lack them).",
            ],
            tip: "Plants absorb nutrients to grow. Carnivorous plants get nutrients from insects when soil nutrients are insufficient.",
          },
        },
      ],
    },
    {
      id: "peihwa22_secD_p2",
      sectionLabel: "Section D: Vocabulary Cloze — Passage 2 (Open Cloze)",
      topic: "VocabCloze",
      instructions:
        "Fill in each blank with a suitable word.",
      marks: 4,
      passage: {
        title: "Ken's Exam Score",
        text: "Mrs Ng stepped into class with a stack of papers in her arms. Ken recognised the stack. It was the recent Science exam papers. After Mrs Ng had greeted the class, she started (27) ______ out the papers to the pupils. \"Ken,\" Mrs Ng called. Ken took a deep (28) ______ before walking over to collect the papers. He returned to his seat after receiving his papers. He slowly unfolded his papers to look at the score. Sadness overcame him when he saw the low (29) ______. Mrs Ng walked over to Ken, patted him on his shoulder and told him not to despair. Ken nodded in response and vowed to himself that he would put in more (30) ______ for the next paper. He did not want to disappoint his parents and teachers.",
      },
      questions: [
        {
          id: "ph22_D27",
          type: "A",
          qNumber: 27,
          topic: "VocabCloze",
          marks: 1,
          question: "she started (27) ______ out the papers to the pupils.",
          answer: "handing",
          solution: {
            method: "Context Verb",
            steps: [
              "Mrs Ng 'started ___ out the papers' = distributed/gave the papers one by one.",
              "'Hand out' = distribute/pass out. Verb form needed after 'started': -ing form.",
              "'Handing out' = the act of distributing papers.",
            ],
            tip: "After 'started', use verb + -ing. 'She started handing out' = she began distributing. 'Hand out papers' is a common expression.",
          },
        },
        {
          id: "ph22_D28",
          type: "A",
          qNumber: 28,
          topic: "VocabCloze",
          marks: 1,
          question: "Ken took a deep (28) ______ before walking over to collect the papers.",
          answer: "breath",
          solution: {
            method: "Idiom / Fixed Expression",
            steps: [
              "'Take a deep ___' — fixed expression used when nervous/anxious.",
              "'Take a deep breath' = breathe in deeply to calm yourself.",
              "Ken was nervous about his score → he took a deep breath before collecting.",
            ],
            tip: "'Take a deep breath' = calm yourself before something nerve-wracking. It's a fixed phrase.",
          },
        },
        {
          id: "ph22_D29",
          type: "A",
          qNumber: 29,
          topic: "VocabCloze",
          marks: 1,
          question: "Sadness overcame him when he saw the low (29) ______.",
          answer: "score",
          solution: {
            method: "Context Noun",
            steps: [
              "Ken was collecting Science exam papers to see his result.",
              "He was sad because of something 'low' — the score/mark he received.",
              "'A low score' = a bad result on a test.",
            ],
            tip: "The context is about exam papers. A 'low score' = a bad result on a test. Sadness follows seeing a low score.",
          },
        },
        {
          id: "ph22_D30",
          type: "A",
          qNumber: 30,
          topic: "VocabCloze",
          marks: 1,
          question: "he would put in more (30) ______ for the next paper.",
          answer: "effort",
          solution: {
            method: "Collocation",
            steps: [
              "'Put in more ___' = work harder/try harder.",
              "Standard collocation: 'put in effort' or 'put in more effort'.",
              "Ken vowed to try harder for the next paper → 'put in more effort'.",
            ],
            tip: "'Put in effort' = try hard. 'I will put in more effort' = I will work harder. Standard collocation for studying.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section E: Grammar Cloze (Q31–Q38, 8 marks)
    // Passage 1: Sam's Lego Gift (Q31–Q34, preposition word bank)
    // Passage 2: Esther's Tennis Father (Q35–Q38, verb tense word bank)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secE_p1",
      sectionLabel: "Section E: Grammar Cloze — Passage 1 (Prepositions)",
      topic: "GrammarCloze",
      instructions:
        "Read the two passages carefully. Choose from the words given in the boxes and fill in each blank with the correct LETTER. Use each word ONCE only.",
      marks: 4,
      passage: {
        title: "Sam's Lego Gift",
        wordBank: [
          { letter: "A", word: "on" },
          { letter: "B", word: "between" },
          { letter: "C", word: "up" },
          { letter: "D", word: "of" },
          { letter: "E", word: "from" },
          { letter: "F", word: "for" },
        ],
        text: "Ding dong! The doorbell rang. Sam ran to open the door. He saw Uncle Matthew standing at the door with a present in his hand. Sam smiled widely and opened (31) ______ the present given by Uncle Matthew. It was a limited edition Lego set. Uncle Matthew had bought it (32) ______ America. He placed it (33) ______ the table and started assembling it. Sam was extremely delighted that Uncle Matthew had bought the present (34) ______ him. \"Thank you very much for the present! I love it very much!\" exclaimed Sam.",
      },
      questions: [
        {
          id: "ph22_E31",
          type: "A",
          qNumber: 31,
          topic: "GrammarCloze",
          marks: 1,
          question: "Sam smiled widely and opened (31) ______ the present.",
          answer: "C",
          answerText: "up",
          solution: {
            method: "Phrasal Verb",
            steps: [
              "'Open up' or 'opened up the present' = unwrapped/started opening it.",
              "Phrasal verb: open up = fully open/unwrap something.",
              "Sam 'opened UP the present' = he unwrapped it.",
            ],
            tip: "'Open up' = unwrap or open completely. 'She opened up the gift excitedly.'",
          },
        },
        {
          id: "ph22_E32",
          type: "A",
          qNumber: 32,
          topic: "GrammarCloze",
          marks: 1,
          question: "Uncle Matthew had bought it (32) ______ America.",
          answer: "E",
          answerText: "from",
          solution: {
            method: "Preposition of Origin",
            steps: [
              "Uncle Matthew bought the Lego set in/from America — it came from America.",
              "'From' indicates origin/source.",
              "'Bought it FROM America' = the item originated from America.",
            ],
            tip: "'From' indicates origin/source: 'bought from America', 'imported from China', 'a gift from Japan'.",
          },
        },
        {
          id: "ph22_E33",
          type: "A",
          qNumber: 33,
          topic: "GrammarCloze",
          marks: 1,
          question: "He placed it (33) ______ the table and started assembling it.",
          answer: "A",
          answerText: "on",
          solution: {
            method: "Preposition of Location",
            steps: [
              "Placing something on a flat surface → 'on'.",
              "'On the table' = resting on the surface of the table.",
              "(B) 'between the table' doesn't make sense here.",
            ],
            tip: "'On' = resting on a surface. 'Put it ON the table' is the standard expression.",
          },
        },
        {
          id: "ph22_E34",
          type: "A",
          qNumber: 34,
          topic: "GrammarCloze",
          marks: 1,
          question: "Sam was extremely delighted that Uncle Matthew had bought the present (34) ______ him.",
          answer: "F",
          answerText: "for",
          solution: {
            method: "Preposition of Benefit/Recipient",
            steps: [
              "Uncle Matthew bought the present FOR Sam — Sam is the intended recipient.",
              "'For' indicates the intended recipient/beneficiary.",
              "'Bought FOR him' = the purchase was for Sam's benefit.",
            ],
            tip: "'For' shows who benefits: 'bought FOR him', 'made FOR you', 'a gift FOR me'.",
          },
        },
      ],
    },
    {
      id: "peihwa22_secE_p2",
      sectionLabel: "Section E: Grammar Cloze — Passage 2 (Verb Tenses)",
      topic: "GrammarCloze",
      instructions:
        "Choose from the words given in the box and fill in each blank with the correct LETTER. Use each word ONCE only.",
      marks: 4,
      passage: {
        title: "Esther's Tennis Father",
        wordBank: [
          { letter: "A", word: "play" },
          { letter: "B", word: "plays" },
          { letter: "C", word: "played" },
          { letter: "D", word: "was playing" },
          { letter: "E", word: "will play" },
          { letter: "F", word: "is playing" },
        ],
        text: "Esther's father is a professional tennis player. He has (35) ______ against many other professional players and won many medals in competitions. Esther (36) ______ tennis with her father every Sunday evening. One evening, when Esther (37) ______ with her father, he tripped over a stone on the ground and sprained his ankle. The doctor said that he should not (38) ______ tennis again until his ankle had fully recovered. Esther's father was sad as that meant he will miss his weekly tennis sessions with Esther.",
      },
      questions: [
        {
          id: "ph22_E35",
          type: "A",
          qNumber: 35,
          topic: "GrammarCloze",
          marks: 1,
          question: "He has (35) ______ against many other professional players.",
          answer: "C",
          answerText: "played",
          solution: {
            method: "Present Perfect Tense",
            steps: [
              "'He has ___' = present perfect tense structure: has + past participle.",
              "Past participle of 'play' = 'played'.",
              "'He has played' = he has experience of playing (at some point in his life up to now).",
              "'Has' + played (past participle) → present perfect. ✓",
            ],
            tip: "Present perfect: has/have + past participle. 'He has played' = past experience continuing to present.",
          },
        },
        {
          id: "ph22_E36",
          type: "A",
          qNumber: 36,
          topic: "GrammarCloze",
          marks: 1,
          question: "Esther (36) ______ tennis with her father every Sunday evening.",
          answer: "B",
          answerText: "plays",
          solution: {
            method: "Simple Present — Habitual Action",
            steps: [
              "Key phrase: 'every Sunday evening' = habitual/regular action.",
              "Habitual present = simple present tense.",
              "Subject: 'Esther' = 3rd person singular → verb + -s: 'plays'.",
            ],
            tip: "'Every Sunday' signals habitual present tense. 3rd person singular = plays (not play).",
          },
        },
        {
          id: "ph22_E37",
          type: "A",
          qNumber: 37,
          topic: "GrammarCloze",
          marks: 1,
          question: "One evening, when Esther (37) ______ with her father, he tripped over a stone.",
          answer: "D",
          answerText: "was playing",
          solution: {
            method: "Past Continuous — Background Action",
            steps: [
              "Pattern: 'when Esther ___ with her father, he TRIPPED' — tripped is simple past (sudden event).",
              "Esther's action (playing) was ongoing WHEN the sudden event (tripped) occurred.",
              "Ongoing past background action = past continuous: 'was playing'.",
            ],
            tip: "'When [past continuous], [simple past]' = background ongoing action interrupted by a sudden event.",
          },
        },
        {
          id: "ph22_E38",
          type: "A",
          qNumber: 38,
          topic: "GrammarCloze",
          marks: 1,
          question: "The doctor said that he should not (38) ______ tennis again until his ankle had fully recovered.",
          answer: "A",
          answerText: "play",
          solution: {
            method: "Modal Verb + Base Form",
            steps: [
              "'should not ___' = modal verb 'should' + 'not' → requires BASE form.",
              "Base form of 'play' = 'play'.",
              "'Should not play' = it is advised not to play. ✓",
            ],
            tip: "Modal verbs (should, can, must, will) are always followed by the BASE form of the main verb: 'should not play'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section F: Connectors / Sentence Synthesis (Q39–Q42, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secF",
      sectionLabel: "Section F: Connectors",
      topic: "SentenceCombining",
      instructions:
        "Combine the sentences to make one sentence using the word or words given. The meaning of your sentence must be the same as the meaning of the given sentences.",
      marks: 4,
      questions: [
        {
          id: "ph22_F39",
          type: "A",
          qNumber: 39,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "This is the staircase. It leads to the carpark.\n\nRewrite using: which",
          answer: "This is the staircase which leads to the carpark.",
          solution: {
            method: "Relative Clauses with 'which'",
            steps: [
              "'Which' introduces a relative clause describing a thing (the staircase).",
              "Combine: 'This is the staircase' + 'which [it] leads to the carpark.'",
              "Remove the pronoun 'it' — 'which' replaces it: 'This is the staircase which leads to the carpark.'",
            ],
            tip: "'Which' = relative pronoun for things. 'This is the staircase WHICH leads to the carpark.'",
          },
        },
        {
          id: "ph22_F40",
          type: "A",
          qNumber: 40,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "Peter loves to play basketball. Darren loves to play basketball too.\n\nRewrite using: as well as",
          answer: "Peter as well as Darren loves to play basketball.",
          alternativeAnswers: [
            "Darren as well as Peter loves to play basketball.",
          ],
          solution: {
            method: "Sentence Combining with 'as well as'",
            steps: [
              "'As well as' = in addition to / and also.",
              "Structure: [Subject 1] as well as [Subject 2] + verb.",
              "Note: When using 'as well as', the verb agrees with the FIRST subject.",
              "'Peter as well as Darren LOVES to play basketball.' (verb agrees with 'Peter', singular).",
            ],
            tip: "'As well as' is not like 'and'. The verb agrees with the FIRST subject: 'Peter as well as Darren LOVES' (not 'love').",
          },
        },
        {
          id: "ph22_F41",
          type: "A",
          qNumber: 41,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "My mother made me another sandwich. I was still hungry after lunch.\n\nRewrite using: so",
          answer:
            "I was still hungry after lunch so my mother made me another sandwich.",
          solution: {
            method: "Sentence Combining with 'so' (Result)",
            steps: [
              "'So' introduces a result clause.",
              "Cause: I was still hungry after lunch.",
              "Result: My mother made me another sandwich.",
              "Structure: [Cause], so [Result].",
              "'I was still hungry after lunch so my mother made me another sandwich.'",
            ],
            tip: "'So' = therefore/as a result. [Cause] so [Result]. The answer reverses the order from the original — cause comes first.",
          },
        },
        {
          id: "ph22_F42",
          type: "A",
          qNumber: 42,
          topic: "SentenceCombining",
          marks: 1,
          question:
            "The floor was dirty. Sharon cleaned it.\n\nRewrite using: since",
          answer: "Sharon cleaned the floor since it was dirty.",
          alternativeAnswers: [
            "Since the floor was dirty, Sharon cleaned it.",
          ],
          solution: {
            method: "Sentence Combining with 'since' (Reason)",
            steps: [
              "'Since' = because / given that (introduces a reason).",
              "Reason: the floor was dirty.",
              "Result/action: Sharon cleaned it.",
              "Structure: [Action] since [Reason] OR Since [Reason], [Action].",
              "'Sharon cleaned the floor since it was dirty.'",
            ],
            tip: "'Since' can mean 'because' (reason). 'Sharon cleaned the floor SINCE it was dirty' = because it was dirty.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // Section G: Comprehension (Q43–Q49, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: "peihwa22_secG",
      sectionLabel: "Section G: Comprehension",
      topic: "ComprehensionOE",
      instructions:
        "Read the passage carefully and answer Questions 43 to 49. Your answers must be based on the passage. You must write in complete sentences.",
      marks: 8,
      passage: {
        title: "Ben's Good Reading Habit",
        source: "Adapted from k5learning.com",
        text: `Ben loves to read during his free time. His friends tease him because he would rather read than play video games. His parents and his teachers say that reading is important and it will help him learn about the world around him. They also tell him it is a good habit to read on a regular basis.

One day, Ben was reading an article about volcanoes. He told his friends all about volcanoes and what causes them to erupt. The very next week, his class was told to do a project on volcanoes. Everyone wanted Ben to be in their group. Ben's friends did not tease him anymore.

Ben ended up being in a group with Liz, Anna and Josh. They had to create a poster about volcanoes and build a volcano model. Ben made copies of the article about volcanoes so his group members could read about them too. They also went to the library to look for more information about volcanoes.

The group met at Ben's house the following night to create the poster and build their volcano. They used cardboard and modeling clay. Firstly, they made a volcano shape with the cardboard. Next, they covered the shape in brown modeling clay. Then, they used red modeling clay as the lava flowing down the volcano. The volcano looked great. Ben, Liz, Anna and Josh were very proud of their hard work. When they handed in their project, their teacher was proud too. Thanks to Ben's good habit, they scored a Grade A for the project.`,
      },
      questions: [
        {
          id: "ph22_G43",
          type: "A",
          qNumber: 43,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Why did Ben's friends tease him? [1m]",
          answer:
            "Ben's friends teased him because he would rather read than play video games.",
          solution: {
            method: "Literal Comprehension — Reason",
            steps: [
              "Passage: 'His friends tease him because he would rather read than play video games.'",
              "The reason is clearly stated: he preferred reading over video games.",
              "Full sentence answer needed.",
            ],
            tip: "The answer is directly in the first paragraph. 'Because he would rather read than play video games.'",
          },
        },
        {
          id: "ph22_G44",
          type: "A",
          qNumber: 44,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "According to Ben's parents and teachers, how is reading helpful? [1m]",
          answer:
            "Reading is helpful because it will help him learn about the world around him.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Passage: 'it will help him learn about the world around him'.",
              "This is what his parents and teachers said about reading.",
            ],
            tip: "Direct quote from the passage: reading 'will help him learn about the world around him'.",
          },
        },
        {
          id: "ph22_G45",
          type: "A",
          qNumber: 45,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Which word in paragraph two has the same meaning as 'to burst forth'? [1m]",
          answer: "erupt",
          solution: {
            method: "Vocabulary — Synonym in Passage",
            steps: [
              "Look in paragraph 2 for a word meaning 'to burst forth'.",
              "Paragraph 2: 'He told his friends all about volcanoes and what causes them to erupt.'",
              "'Erupt' = to burst forth suddenly and violently (e.g., a volcano erupting).",
            ],
            tip: "'Erupt' = burst forth. Volcanoes erupt = they burst open. This is the word in paragraph 2.",
          },
        },
        {
          id: "ph22_G46",
          type: "A",
          qNumber: 46,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "What does the word 'them' in paragraph three refer to? [1m]",
          answer: "Volcanoes",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "Paragraph 3: 'Ben made copies of the article about volcanoes so his group members could read about them too.'",
              "'Them' refers back to the most recently mentioned noun: 'volcanoes'.",
              "The group members could read about VOLCANOES too.",
            ],
            tip: "Pronoun reference: look for the noun that comes just before the pronoun. 'About volcanoes... about THEM' → them = volcanoes.",
          },
        },
        {
          id: "ph22_G47",
          type: "A",
          qNumber: 47,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "What did Ben and his group members use to create the model of a volcano? [1m]",
          answer:
            "They used cardboard and modelling clay to create the model of a volcano.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 4: 'They used cardboard and modeling clay.'",
              "Full sentence answer: 'They used cardboard and modelling clay.'",
            ],
            tip: "The materials are directly stated in paragraph 4: cardboard and modelling clay.",
          },
        },
        {
          id: "ph22_G48",
          type: "A",
          qNumber: 48,
          topic: "ComprehensionOE",
          marks: 1,
          question:
            "Write 1, 2 and 3 below to show the order in which the events took place in the passage.\n\n___ Ben, Liz, Anna and Josh formed a group.\n___ Red modelling clay was used as the lava in their model.\n___ Everyone wanted Ben to be in their group.",
          answer: "2 / 3 / 1",
          answerDetail: {
            "Ben, Liz, Anna and Josh formed a group": "2",
            "Red modelling clay was used as the lava in their model": "3",
            "Everyone wanted Ben to be in their group": "1",
          },
          solution: {
            method: "Sequencing",
            steps: [
              "FIRST: 'Everyone wanted Ben to be in their group.' (Paragraph 2 — after Ben told friends about volcanoes and the project was assigned).",
              "SECOND: 'Ben ended up being in a group with Liz, Anna and Josh.' (Paragraph 3 — they formed a group).",
              "THIRD: 'They used red modeling clay as the lava flowing down the volcano.' (Paragraph 4 — during construction).",
              "Order: Everyone wanted Ben (1) → Group formed (2) → Red clay used (3).",
            ],
            tip: "Follow the story: project announced → group formation → building the model. The red clay step is in the building phase.",
          },
        },
        {
          id: "ph22_G49",
          type: "A",
          qNumber: 49,
          topic: "ComprehensionOE",
          marks: 2,
          question:
            "What is Ben's good habit? How did his good habit help him and his group members score a Grade A for the project? [2m]",
          answer:
            "Ben's good habit is reading. His good habit helped him because he had read an article about volcanoes, which gave him knowledge to share with his group members. This helped them complete their project well and score a Grade A.",
          solution: {
            method: "Open-Ended — Two-Part Question",
            steps: [
              "Part 1: What is the good habit? → Reading (stated in the title and throughout the passage).",
              "Part 2: How did it help? → He read an article about volcanoes; this knowledge was useful when the class was assigned a volcano project.",
              "He shared the article with groupmates, they went to the library for more info, and together they built an excellent project.",
              "Final line: 'Thanks to Ben's good habit, they scored a Grade A for the project.'",
              "Full 2-mark answer: name the habit (reading) + explain the connection to the Grade A.",
            ],
            tip: "Two-part question = two things to answer: (1) name the habit = reading; (2) explain how it helped = his reading gave him volcano knowledge that was directly useful for the project.",
          },
        },
      ],
    },
  ],
};

export default eoy_peihwa_p2_2022;
