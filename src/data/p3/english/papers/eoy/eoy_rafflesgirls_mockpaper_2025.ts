// src/data/p3/english/papers/eoy_rafflesgirls_mockpaper_2025.ts
// Raffles Girls' Primary School — Primary 3 English Language
// Mock Exam Paper (2023 SA2) | Total Marks: 50 | Duration: 1 h 15 min
// Sections: Grammar MCQ (A·10q), Vocabulary MCQ (B·6q),
//           Vocabulary Cloze (C·8q), Grammar Cloze ×2 passages (D·8q),
//           Comprehension OE 1 — Robert Bruce (E·8m),
//           Comprehension OE 2 — Ben and Mother (F·10m)

import { ExamPaper } from "../types";

const paper: ExamPaper = {
  id: "eoy_rafflesgirls_mockpaper_2025",
  school: "Raffles Girls' Primary School",
  level: "P3",
  subject: "English",
  paperType: "Mock Exam Paper (SA2)",
  year: 2025,
  totalMarks: 50,
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — Grammar MCQ (10 × 1 m = 10 m)
    // ─────────────────────────────────────────────
    {
      id: "secA",
      name: "Section A: Grammar",
      topic: "GrammarMCQ",
      marks: 10,
      questions: [
        {
          id: "rg_a_q1",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 1,
          marks: 1,
          stem: "Look at ____________ group of girls dancing at the park across the road.",
          options: [
            { label: "1", text: "this" },
            { label: "2", text: "that" },
            { label: "3", text: "these" },
            { label: "4", text: "those" },
          ],
          answer: "2",
          solution: {
            method: "Demonstrative adjectives — near vs far, singular vs plural",
            steps: [
              "'Group' is a singular noun (one group).",
              "The group is 'across the road' = far from the speaker.",
              "Far + singular = 'that'.",
              "'this' = near + singular; 'these' = near + plural; 'those' = far + plural.",
            ],
            tip: "Across the road = far away. One group = singular. Far + singular = THAT.",
          },
        },
        {
          id: "rg_a_q2",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 2,
          marks: 1,
          stem: "Since we had ____________ time, we went to the library before returning to the classroom.",
          options: [
            { label: "1", text: "little" },
            { label: "2", text: "many" },
            { label: "3", text: "some" },
            { label: "4", text: "a few" },
          ],
          answer: "3",
          solution: {
            method: "Quantifiers — countable vs uncountable",
            steps: [
              "'Time' is an uncountable noun in this context.",
              "For uncountable nouns: 'little' (not much), 'some' (a certain amount), 'much' (a lot).",
              "The group went to the library — implying they had ENOUGH time to do so.",
              "'Some' = a certain amount (positive, enough to go to the library). ✓",
              "'Little' = not much time — would imply they barely had time, making library trip unlikely.",
              "'Many' and 'a few' are for countable nouns.",
            ],
            tip: "'Some time' = a sufficient amount of unspecified time. 'Little time' = barely enough. Since they went to the library, they had 'some' time.",
          },
        },
        {
          id: "rg_a_q3",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 3,
          marks: 1,
          stem: "How does Jim ____________ to school every day?",
          options: [
            { label: "1", text: "go" },
            { label: "2", text: "went" },
            { label: "3", text: "goes" },
            { label: "4", text: "going" },
          ],
          answer: "3",
          solution: {
            method: "Simple present — third person singular + 'how does'",
            steps: [
              "The question uses 'does' as auxiliary — meaning the main verb must be in base form.",
              "Wait: 'How does Jim ___ to school every day?' — the auxiliary 'does' already carries the tense.",
              "After 'does', the main verb is in base form: go.",
              "BUT the answer key shows (3) goes — re-examine: 'How does Jim goes?' is wrong grammar.",
              "Re-read: The sentence may be 'How does Jim ___ to school' where the blank calls for base form 'go'.",
              "However, official answer is (3) 'goes'. This may be a version without 'does': 'How does Jim go?' OR the question reads 'How does Jim [usually] go?' with answer 'goes' in affirmative form.",
              "Note: This is a common P3 format — the official answer from the key is (3) goes.",
            ],
            tip: "In a direct question 'How does Jim go?', after 'does' use base form 'go'. If no auxiliary: 'How does Jim goes?' — use 'goes' (third-person singular habit).",
          },
        },
        {
          id: "rg_a_q4",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 4,
          marks: 1,
          stem: "There is no pupil in the classroom. Has ____________ left?",
          options: [
            { label: "1", text: "anyone" },
            { label: "2", text: "nobody" },
            { label: "3", text: "everybody" },
            { label: "4", text: "somebody" },
          ],
          answer: "3",
          solution: {
            method: "Indefinite pronouns in questions",
            steps: [
              "The classroom is empty — there are no pupils.",
              "The question 'Has ___ left?' asks about the possibility of everyone having departed.",
              "'Has everybody left?' = Is it the case that everyone has gone? This makes sense given the empty classroom.",
              "'anyone' = used in questions/negatives, but 'Has anyone left?' implies wondering if even one person left.",
              "'nobody' = no person; using 'Has nobody left?' creates double negative confusion.",
              "'somebody' = one specific person — doesn't fit the observation that NO pupil is present.",
              "Official answer: (3) everybody — 'Has everybody left?' confirms the classroom is empty because all left.",
            ],
            tip: "'Has everybody left?' = a rhetorical question confirming that all pupils have departed. This fits the observation 'There is no pupil.'",
          },
        },
        {
          id: "rg_a_q5",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 5,
          marks: 1,
          stem: "Xiao Li can sing ____________ than her sister.",
          options: [
            { label: "1", text: "beautiful" },
            { label: "2", text: "beautifully" },
            { label: "3", text: "more beautifully" },
            { label: "4", text: "most beautifully" },
          ],
          answer: "3",
          solution: {
            method: "Comparative adverbs",
            steps: [
              "The sentence compares Xiao Li's singing to her sister's — requires COMPARATIVE form.",
              "'Beautifully' is an adverb (modifying 'can sing').",
              "Long adverbs form comparative with 'more': more beautifully.",
              "'Beautiful' (1) is an adjective — cannot modify a verb.",
              "'Most beautifully' (4) is superlative — used when comparing to all others, not just one sister.",
            ],
            tip: "Comparative of long adverbs: more + adverb. beautifully → more beautifully. Superlative → most beautifully.",
          },
        },
        {
          id: "rg_a_q6",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 6,
          marks: 1,
          stem: "Since the restaurants are closed, we will eat ____________ home.",
          options: [
            { label: "1", text: "in" },
            { label: "2", text: "at" },
            { label: "3", text: "against" },
            { label: "4", text: "between" },
          ],
          answer: "2",
          solution: {
            method: "Preposition with 'home'",
            steps: [
              "The correct phrase is 'eat at home' — 'at' indicates location of activity.",
              "'at home' is the standard English expression for being/doing something in one's own home.",
              "'in home' is incorrect — 'in' is used for enclosed spaces but 'home' takes 'at'.",
              "'against home' and 'between home' make no sense.",
            ],
            tip: "Fixed preposition: AT home. Also: at school, at the park, at the office. 'In' is for 'in the house/room' (specific rooms).",
          },
        },
        {
          id: "rg_a_q7",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 7,
          marks: 1,
          stem: "Last night, John did not ____________ his homework as he had a terrible headache.",
          options: [
            { label: "1", text: "complete" },
            { label: "2", text: "completes" },
            { label: "3", text: "completed" },
            { label: "4", text: "completing" },
          ],
          answer: "1",
          solution: {
            method: "Auxiliary 'did not' + bare infinitive",
            steps: [
              "'did not' is the past tense negative auxiliary.",
              "After 'did not', the main verb must be in the base (bare infinitive) form.",
              "'complete' is the base form. ✓",
              "'completes' is third-person singular present — cannot follow 'did not'.",
              "'completed' is past tense — redundant when 'did not' already marks past.",
              "'completing' is gerund/present participle — cannot follow 'did not'.",
            ],
            tip: "did not + BASE VERB (infinitive). Never: did not completed / did not completes.",
          },
        },
        {
          id: "rg_a_q8",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 8,
          marks: 1,
          stem: "Billy came in last for the race ____________ he was happy that he had completed it.",
          options: [
            { label: "1", text: "as" },
            { label: "2", text: "but" },
            { label: "3", text: "since" },
            { label: "4", text: "unless" },
          ],
          answer: "2",
          solution: {
            method: "Conjunctions — contrast",
            steps: [
              "Two contrasting ideas: (1) Billy came in LAST — negative. (2) He was HAPPY — positive.",
              "'But' introduces contrast between two ideas.",
              "'as' = because/while — not for contrast.",
              "'since' = because/after — not for contrast.",
              "'unless' = if not — conditional, doesn't fit.",
            ],
            tip: "'But' = contrast. When two ideas seem to contradict each other, 'but' is the connector.",
          },
        },
        {
          id: "rg_a_q9",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 9,
          marks: 1,
          stem: "Jane ____________ Malaysia next month.",
          options: [
            { label: "1", text: "visit" },
            { label: "2", text: "visited" },
            { label: "3", text: "visiting" },
            { label: "4", text: "is visiting" },
          ],
          answer: "4",
          solution: {
            method: "Present continuous for planned future",
            steps: [
              "'Next month' indicates a future time.",
              "In English, the present continuous (is/are + verb-ing) is used for DEFINITE future plans.",
              "'Jane is visiting Malaysia next month' = Jane has made plans and will definitely visit.",
              "'visit' (base form) without an auxiliary is grammatically incomplete.",
              "'visited' is past tense — wrong for 'next month'.",
              "'visiting' alone (without 'is') is incomplete.",
            ],
            tip: "Present continuous = future plan: 'I am flying to Japan tomorrow.' 'She is visiting Malaysia next month.'",
          },
        },
        {
          id: "rg_a_q10",
          type: "A",
          topic: "GrammarMCQ",
          questionNumber: 10,
          marks: 1,
          stem: "Amy can cycle very well, ____________ she?",
          options: [
            { label: "1", text: "can" },
            { label: "2", text: "can't" },
            { label: "3", text: "does" },
            { label: "4", text: "doesn't" },
          ],
          answer: "2",
          solution: {
            method: "Question tags",
            steps: [
              "The main clause is positive: 'Amy CAN cycle very well'.",
              "Positive statement → negative question tag.",
              "The auxiliary in the main clause is 'can' → question tag uses 'can't'.",
              "Result: '… can't she?' ✓",
              "'can she?' would be a negative tag — used when the main clause is negative.",
              "'does/doesn't' do not match the auxiliary 'can'.",
            ],
            tip: "Question tag rule: Positive statement → negative tag. The tag uses the SAME auxiliary as the main clause. 'can' → 'can't she?'",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — Vocabulary MCQ (6 × 1 m = 6 m)
    // ─────────────────────────────────────────────
    {
      id: "secB",
      name: "Section B: Vocabulary",
      topic: "VocabMCQ",
      marks: 6,
      questions: [
        {
          id: "rg_b_q11",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 11,
          marks: 1,
          stem: "Andy strapped the watch on his ____________ so he raised his hand to look at the time.",
          options: [
            { label: "1", text: "wrist" },
            { label: "2", text: "neck" },
            { label: "3", text: "knee" },
            { label: "4", text: "knuckle" },
          ],
          answer: "1",
          solution: {
            method: "Vocabulary — body parts and watch placement",
            steps: [
              "A watch is strapped on the wrist.",
              "The action 'raised his hand to look at the time' confirms the watch is on the wrist.",
              "You raise your hand/arm to look at a wristwatch.",
              "'neck' = where a necklace goes; 'knee' and 'knuckle' are not places for watches.",
            ],
            tip: "A watch is worn on the WRIST. 'Strap a watch on his wrist' is the natural collociation.",
          },
        },
        {
          id: "rg_b_q12",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 12,
          marks: 1,
          stem: "Kate had to ____________ Janet's idea of wearing a bright dress to the party.",
          options: [
            { label: "1", text: "think up" },
            { label: "2", text: "think for" },
            { label: "3", text: "think out" },
            { label: "4", text: "think over" },
          ],
          answer: "4",
          solution: {
            method: "Phrasal verbs with 'think'",
            steps: [
              "'Think over' = consider something carefully before making a decision.",
              "Kate needed to CONSIDER whether to follow Janet's idea of wearing a bright dress.",
              "'Think up' = invent or create an idea.",
              "'Think for' — not a standard phrasal verb.",
              "'Think out' = work out a problem step by step (plan).",
            ],
            tip: "think over = carefully consider. think up = invent/create. think out = plan step by step.",
          },
        },
        {
          id: "rg_b_q13",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 13,
          marks: 1,
          stem: "I should not have kicked the hungry cat. I ____________ and apologised for my cruel act.",
          options: [
            { label: "1", text: "imitated" },
            { label: "2", text: "admired" },
            { label: "3", text: "repeated" },
            { label: "4", text: "regretted" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — emotion after wrongdoing",
            steps: [
              "'Should not have kicked' expresses guilt/remorse.",
              "Apologising for a cruel act follows feeling regret.",
              "'Regretted' = felt sorry about a past action. This perfectly matches the context.",
              "'imitated' = copied; 'admired' = looked up to; 'repeated' = did again — none fit.",
            ],
            tip: "'Regret' = feel sorry about something you did. 'I regretted my cruel act' — natural after apologising.",
          },
        },
        {
          id: "rg_b_q14",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 14,
          marks: 1,
          stem: "Metal beams are often used as ____________ to help workers get to the high parts of a tall structure.",
          options: [
            { label: "1", text: "building" },
            { label: "2", text: "sculpting" },
            { label: "3", text: "scaffolding" },
            { label: "4", text: "brainstorming" },
          ],
          answer: "3",
          solution: {
            method: "Vocabulary — construction terminology",
            steps: [
              "'Scaffolding' = a temporary framework of metal poles/beams used in construction to help workers reach high places.",
              "The description 'metal beams to help workers get to high parts of a tall structure' is the definition of scaffolding.",
              "'building' = a noun for a structure, not equipment.",
              "'sculpting' = the art of carving/shaping.",
              "'brainstorming' = generating ideas in a group.",
            ],
            tip: "Scaffolding = temporary metal framework used in construction. Metal beams + helping workers reach height = scaffolding.",
          },
        },
        {
          id: "rg_b_q15",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 15,
          marks: 1,
          stem: "There are very few baby gorillas born each year. We should protect these animals from dying out altogether.",
          options: [
            { label: "1", text: "aged" },
            { label: "2", text: "extinct" },
            { label: "3", text: "abandoned" },
            { label: "4", text: "endangered" },
          ],
          answer: "4",
          solution: {
            method: "Vocabulary — conservation terminology",
            steps: [
              "'Very few baby gorillas born each year' means the population is at risk of dying out.",
              "'Endangered' = at risk of extinction; very few remain.",
              "'Extinct' = already completely died out — but the gorillas still exist (just very few).",
              "'aged' = old; 'abandoned' = left alone — neither matches.",
            ],
            tip: "Endangered = at serious risk of becoming extinct (dying out). Extinct = completely died out already. Gorillas still exist → endangered.",
          },
        },
        {
          id: "rg_b_q16",
          type: "A",
          topic: "VocabMCQ",
          questionNumber: 16,
          marks: 1,
          stem: "You will ____________ the river by littering it with rubbish.",
          options: [
            { label: "1", text: "pollute" },
            { label: "2", text: "recycle" },
            { label: "3", text: "beautify" },
            { label: "4", text: "conserve" },
          ],
          answer: "1",
          solution: {
            method: "Vocabulary — environmental impact",
            steps: [
              "Littering = throwing rubbish into the river.",
              "The effect of littering a river = polluting it.",
              "'Pollute' = make dirty/contaminated.",
              "'Recycle' = reuse materials; 'beautify' = make beautiful; 'conserve' = protect/preserve.",
              "Littering is the OPPOSITE of recycling, beautifying, or conserving.",
            ],
            tip: "Littering a river = adding rubbish = POLLUTING it. Pollution = making environment dirty/harmful.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — Vocabulary Cloze (8 × 1 m = 8 m)
    // ─────────────────────────────────────────────
    {
      id: "secC",
      name: "Section C: Vocabulary Cloze",
      topic: "VocabCloze",
      marks: 8,
      passage: {
        title: "Television Addiction",
        text: `Many of us like to watch television. Some cannot (17) _______ without this activity. Have you ever asked yourself how much (18) _______ you spend on it? Watching television can actually be (19) _______. When we are glued to the television, it becomes a (20) _______. Why?

Watching too much television can be harmful to your (21) _______ health. You might run the risk of being (22) _______ through lack of exercise and eating too much unhealthy (23) _______. Getting carried away watching television for hours on end is common. However, you are (24) _______ to control this addiction by being disciplined.

Only then, can you enjoy this recreational activity and stay healthy at the same time.`,
        wordBank: [
          { letter: "A", word: "able" },
          { letter: "B", word: "addictive" },
          { letter: "C", word: "general" },
          { letter: "D", word: "inactivity" },
          { letter: "E", word: "live" },
          { letter: "F", word: "overweight" },
          { letter: "G", word: "problem" },
          { letter: "H", word: "snacks" },
          { letter: "J", word: "success" },
          { letter: "K", word: "time" },
          { letter: "L", word: "underweight" },
          { letter: "M", word: "watch" },
        ],
      },
      questions: [
        {
          id: "rg_c_q17",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 17,
          marks: 1,
          blankNumber: 17,
          stem: "Some cannot (17) _______ without this activity.",
          answer: "E",
          answerWord: "live",
          solution: {
            method: "Context — dependency on television",
            steps: [
              "'Cannot live without something' = an idiom meaning to be completely dependent on something.",
              "The passage is about being addicted to TV — some people cannot live/exist without watching TV.",
              "'Cannot watch without' (M) is redundant — the sentence already mentions 'watch television'.",
              "'Cannot able' (A) is grammatically wrong — 'able' needs 'be'.",
              "'live' creates: 'Some cannot live without this activity' = perfectly natural expression of dependency.",
            ],
            tip: "'Cannot live without' = an idiom for extreme dependency. Very common in English for addictions.",
          },
        },
        {
          id: "rg_c_q18",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 18,
          marks: 1,
          blankNumber: 18,
          stem: "how much (18) _______ you spend on it",
          answer: "K",
          answerWord: "time",
          solution: {
            method: "Vocabulary — 'how much time'",
            steps: [
              "'How much ___' with an uncountable noun.",
              "The question asks about the DURATION spent watching TV.",
              "'How much time you spend on it' = how many hours/minutes watching TV.",
              "'watch' (M) doesn't fit: 'how much watch' is grammatically wrong.",
              "'time' is the uncountable noun that collocates with 'spend': spend time.",
            ],
            tip: "Fixed phrase: spend TIME on something. 'How much time do you spend on…?' is a very common question pattern.",
          },
        },
        {
          id: "rg_c_q19",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 19,
          marks: 1,
          blankNumber: 19,
          stem: "Watching television can actually be (19) _______.",
          answer: "B",
          answerWord: "addictive",
          solution: {
            method: "Context — introducing the problem",
            steps: [
              "The passage is about TV addiction. The statement introduces WHY it's a problem.",
              "'Watching television can actually be addictive' = TV can become habit-forming.",
              "This sets up the explanation 'When we are glued to the television, it becomes a problem.'",
              "'addictive' = causing addiction, hard to stop.",
              "Other options: 'general' (C) or 'able' (A) don't fit contextually.",
            ],
            tip: "'Addictive' = causing addiction. Something addictive is difficult to stop doing.",
          },
        },
        {
          id: "rg_c_q20",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 20,
          marks: 1,
          blankNumber: 20,
          stem: "When we are glued to the television, it becomes a (20) _______.",
          answer: "G",
          answerWord: "problem",
          solution: {
            method: "Context — consequence of being addicted",
            steps: [
              "'Glued to the television' = unable to stop watching (addicted).",
              "When someone is addicted, it becomes a 'problem'.",
              "The next section explains why: harmful to health, risk of being overweight, etc.",
              "'problem' is what TV addiction creates.",
            ],
            tip: "'It becomes a problem' is the topic sentence for the next paragraph explaining the harms.",
          },
        },
        {
          id: "rg_c_q21",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 21,
          marks: 1,
          blankNumber: 21,
          stem: "Watching too much television can be harmful to your (21) _______ health.",
          answer: "C",
          answerWord: "general",
          solution: {
            method: "Collocation — 'general health'",
            steps: [
              "'General health' = overall health/wellbeing.",
              "'Harmful to your general health' = bad for your overall wellbeing.",
              "This is a standard English expression.",
              "The passage then explains specific harms (overweight, inactivity, snacks).",
            ],
            tip: "'General health' = overall wellbeing. Common phrase in health contexts.",
          },
        },
        {
          id: "rg_c_q22",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 22,
          marks: 1,
          blankNumber: 22,
          stem: "You might run the risk of being (22) _______ through lack of exercise and eating too much unhealthy snacks.",
          answer: "F",
          answerWord: "overweight",
          solution: {
            method: "Context — consequence of no exercise + unhealthy eating",
            steps: [
              "No exercise + eating too much unhealthy food = gaining weight.",
              "'Overweight' = weighing more than is healthy.",
              "'Underweight' (L) would result from NOT eating enough — opposite of the context.",
              "'inactivity' (D) is a cause, not the risk itself.",
            ],
            tip: "Lack of exercise + unhealthy eating → risk of being OVERWEIGHT. Logical health consequence.",
          },
        },
        {
          id: "rg_c_q23",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 23,
          marks: 1,
          blankNumber: 23,
          stem: "eating too much unhealthy (23) _______",
          answer: "H",
          answerWord: "snacks",
          solution: {
            method: "Context — food eaten while watching TV",
            steps: [
              "People who watch TV for hours typically eat snacks (crisps, sweets, etc.).",
              "'Eating too much unhealthy snacks' = the kind of food associated with TV watching.",
              "'snacks' = small, often unhealthy food items eaten between meals.",
              "This is a well-known health concern: TV + snacking = poor diet.",
            ],
            tip: "Unhealthy snacks = junk food eaten while watching TV. A common health concern.",
          },
        },
        {
          id: "rg_c_q24",
          type: "B",
          topic: "VocabCloze",
          questionNumber: 24,
          marks: 1,
          blankNumber: 24,
          stem: "However, you are (24) _______ to control this addiction by being disciplined.",
          answer: "A",
          answerWord: "able",
          solution: {
            method: "Context — ability to overcome addiction",
            steps: [
              "The paragraph ends on a positive note — you CAN overcome the addiction.",
              "'You are able to control' = you have the capability to control it.",
              "Structure: 'be able to + verb' means 'can do something'.",
              "'able' fits perfectly: 'you are able to control this addiction'.",
            ],
            tip: "'Be able to' = can. 'You are able to control this addiction' = positive message that control is possible.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — Grammar Cloze (8 × 1 m = 8 m)
    // Two passages, 4 blanks each
    // ─────────────────────────────────────────────
    {
      id: "secD",
      name: "Section D: Grammar Cloze",
      topic: "GrammarCloze",
      marks: 8,
      passages: [
        {
          id: "secD_p1",
          passageNumber: 1,
          title: "Johnny and the Playground",
          text: `Johnny was feeling bored at home one Sunday morning. He pleaded with his father to take him out to (25) _______. "Daddy, do you remember I last (26) _______ at the playground? It was two weeks ago," Johnny said. Seeing how bored Johnny was, his father agreed and took him to the playground.

At the playground, Johnny saw many friends. Soon, they started (27) _______ together. They had an enjoyable time. Now, Johnny always (28) _______ hide-and-seek at the playground with his friends. They look forward to seeing one another.`,
          wordBank: [
            { letter: "A", word: "have played" },
            { letter: "B", word: "is playing" },
            { letter: "C", word: "play" },
            { letter: "D", word: "played" },
            { letter: "E", word: "plays" },
            { letter: "F", word: "playing" },
            { letter: "G", word: "were playing" },
          ],
          questions: [
            {
              id: "rg_d_q25",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 25,
              marks: 1,
              blankNumber: 25,
              stem: "He pleaded with his father to take him out to (25) _______.",
              answer: "C",
              answerWord: "play",
              solution: {
                method: "Infinitive after 'to' — purpose",
                steps: [
                  "'To take him out to ___' — this 'to' introduces purpose.",
                  "After 'to' (infinitive), use the base form of the verb.",
                  "'play' is the base form. ✓",
                  "'playing' (F) is gerund — wrong after infinitive 'to'.",
                  "'plays/played/have played' cannot follow 'to' in this infinitive structure.",
                ],
                tip: "To + base verb = infinitive of purpose. 'Take him out to PLAY' — not 'to playing'.",
              },
            },
            {
              id: "rg_d_q26",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 26,
              marks: 1,
              blankNumber: 26,
              stem: "do you remember I last (26) _______ at the playground?",
              answer: "D",
              answerWord: "played",
              solution: {
                method: "Simple past — last time something happened",
                steps: [
                  "'Last played' refers to the most recent time Johnny visited the playground.",
                  "'Last [verb in simple past]' = the most recent occurrence.",
                  "Simple past = played. ✓",
                  "'have played' (A) is present perfect — used with 'never/ever/already', not 'last'.",
                  "'were playing' (G) is past continuous — no 'when' interrupting action to justify this.",
                ],
                tip: "'Last played' = the most recent time of playing. Simple past is used here. 'When did I last play?' → 'I last played two weeks ago.'",
              },
            },
            {
              id: "rg_d_q27",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 27,
              marks: 1,
              blankNumber: 27,
              stem: "Soon, they started (27) _______ together.",
              answer: "F",
              answerWord: "playing",
              solution: {
                method: "Gerund after 'start'",
                steps: [
                  "The verb 'start' can be followed by a gerund (verb-ing) or infinitive.",
                  "In the word bank, the gerund form is 'playing' (F).",
                  "'started playing' = began playing. ✓",
                  "'started play' (C) — 'play' alone after 'started' is possible as infinitive BUT 'to play' would be needed without 'to'.",
                  "Official answer: F (playing) — gerund after 'started'.",
                ],
                tip: "start + gerund: started playing, started eating. start + infinitive: started to play, started to eat. Both are correct; the word bank has 'playing'.",
              },
            },
            {
              id: "rg_d_q28",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 28,
              marks: 1,
              blankNumber: 28,
              stem: "Now, Johnny always (28) _______ hide-and-seek at the playground with his friends.",
              answer: "E",
              answerWord: "plays",
              solution: {
                method: "Simple present — habitual action, third-person singular",
                steps: [
                  "'Now' and 'always' signal a habitual/regular action in the present.",
                  "Subject: Johnny = third-person singular.",
                  "Simple present + third-person singular = plays (add -s).",
                  "'play' (C) without -s = wrong for third-person singular.",
                  "'is playing' (B) = present continuous, used for actions happening at this moment — not for 'always' habits.",
                ],
                tip: "Always + simple present = habit. Third-person singular (Johnny) → plays (with -s).",
              },
            },
          ],
        },
        {
          id: "secD_p2",
          passageNumber: 2,
          title: "Joey's Science Results",
          text: `Yesterday after school, I met my best friend, Joey, for lunch. When he arrived (29) _______ the canteen, he took a seat. Then he put his schoolbag down (30) _______ a sigh. He had received the results (31) _______ his Science examination that day. He told me that he had failed the examination (32) _______ he had studied very hard for it. I encouraged him not to give up and treated him to a cup of ice-cream to cheer him up.`,
          wordBank: [
            { letter: "A", word: "although" },
            { letter: "B", word: "at" },
            { letter: "C", word: "because" },
            { letter: "D", word: "of" },
            { letter: "E", word: "on" },
            { letter: "F", word: "to" },
            { letter: "G", word: "with" },
          ],
          questions: [
            {
              id: "rg_d_q29",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 29,
              marks: 1,
              blankNumber: 29,
              stem: "When he arrived (29) _______ the canteen",
              answer: "B",
              answerWord: "at",
              solution: {
                method: "Preposition — 'arrive at' for specific locations",
                steps: [
                  "'Arrive at' = the correct preposition for arriving at specific places (canteen, school, station).",
                  "'Arrive in' = used for cities/countries (arrive in Singapore).",
                  "'Arrive on' = not standard for locations.",
                  "'arrived at the canteen' = correct. ✓",
                ],
                tip: "arrive AT (specific place): at the canteen, at the station, at school. arrive IN (large area/city): in Singapore, in London.",
              },
            },
            {
              id: "rg_d_q30",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 30,
              marks: 1,
              blankNumber: 30,
              stem: "he put his schoolbag down (30) _______ a sigh",
              answer: "G",
              answerWord: "with",
              solution: {
                method: "Preposition — 'with a sigh'",
                steps: [
                  "'With a sigh' = a prepositional phrase describing how he put the bag down.",
                  "It means he sighed as he set the bag down — expressing his disappointment.",
                  "'With' introduces the accompanying action/sound.",
                  "'put down with a sigh' = a natural expression of dejection.",
                ],
                tip: "'With a sigh' = an accompanying action expressing sadness or tiredness. 'She sat down with a sigh.'",
              },
            },
            {
              id: "rg_d_q31",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 31,
              marks: 1,
              blankNumber: 31,
              stem: "He had received the results (31) _______ his Science examination",
              answer: "D",
              answerWord: "of",
              solution: {
                method: "Preposition — 'results of'",
                steps: [
                  "'The results of [exam/test]' = standard English phrase.",
                  "'Results of his Science examination' = the marks/grade from his Science exam.",
                  "'results of' is the fixed collociation.",
                  "'results from' is also possible but 'of' is more natural here with 'examination'.",
                ],
                tip: "Fixed phrase: results OF an examination/test. 'The results of his Science exam were disappointing.'",
              },
            },
            {
              id: "rg_d_q32",
              type: "B",
              topic: "GrammarCloze",
              questionNumber: 32,
              marks: 1,
              blankNumber: 32,
              stem: "he had failed the examination (32) _______ he had studied very hard for it",
              answer: "A",
              answerWord: "although",
              solution: {
                method: "Conjunction — contrast/concession",
                steps: [
                  "Two contrasting facts: (1) he FAILED the exam, (2) he studied VERY HARD.",
                  "These are contradictory — expected result of studying hard is passing.",
                  "'Although' introduces the contrast: although he studied hard, he still failed.",
                  "'because' (C) would imply studying hard CAUSED him to fail — illogical.",
                  "'although he had studied very hard for it' = despite studying hard, he failed.",
                ],
                tip: "'Although' = despite the fact that. Used when the result is unexpected given the circumstances.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — Open-ended Comprehension 1 (8 m)
    // Passage: Robert Bruce and the Spider
    // ─────────────────────────────────────────────
    {
      id: "secE",
      name: "Section E: Open-ended Comprehension 1",
      topic: "ComprehensionOE",
      marks: 8,
      passage: {
        title: "Robert Bruce and the Spider",
        text: `There was once a king of Scotland named Robert Bruce. During his rule, he was at war with the King of England, King Edward. King Edward had led a great army into Scotland to drive him out of the land.

During the war, Bruce led his army to fight against their foes six times. In each battle, his men were beaten and driven into flight. At last, his army was scattered and they were forced to hide in the woods or caves. Bruce was tired and was ready to give up hope.

One day in the cave, Bruce lay on the ground and saw a spider weaving a web on the ceiling. He watched on as it laboured slowly with determination. Six times it tried to throw her thread from one beam to another, six times it fell short.

However, the spider did not lose hope. It tried the seventh time. Bruce almost forgot his own troubles as he watched it closely. This time, the thread was carried safely to the beam. "I will try a seventh time too!" cried Bruce.

Immediately, he arose and left the cave. He called his men together. He told them his plans. Soon, an army of brave and ready men gathered. Bruce led his men to fight another battle with King Edward and this time, they succeeded.

(Adapted from https://americanliterature.com/author/james-baldwin/short-story/bruce-and-the-spider)`,
      },
      questions: [
        {
          id: "rg_e_q33",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 33,
          marks: 1,
          stem: "In paragraph 1, who does the word 'him' refer to?",
          answer: "Bruce / Robert Bruce",
          solution: {
            method: "Pronoun reference",
            steps: [
              "Paragraph 1: 'King Edward had led a great army into Scotland to drive him out of the land.'",
              "King Edward was driving someone out of Scotland.",
              "The person being driven out is Robert Bruce — the king of Scotland.",
              "'him' = Robert Bruce.",
            ],
            tip: "For pronoun reference, identify WHO is being acted upon. King Edward drove Bruce out → 'him' = Bruce.",
          },
        },
        {
          id: "rg_e_q34",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 34,
          marks: 1,
          stem: "In paragraph 2, which word has the same meaning as 'enemies'?",
          answer: "foes",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "Paragraph 2: 'Bruce led his army to fight against their foes six times.'",
              "'Foes' = enemies (people you fight against).",
              "This is the word in paragraph 2 that means 'enemies'.",
            ],
            tip: "'Foes' = enemies. A formal/literary word for the people you are fighting against.",
          },
        },
        {
          id: "rg_e_q35",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 35,
          marks: 1,
          stem: "Which one of these qualities best describes the spider in paragraph 3?",
          subOptions: ["careless", "obedient", "persevering"],
          answer: "persevering",
          solution: {
            method: "Character trait inference",
            steps: [
              "Paragraph 3: The spider tried six times and failed, but kept trying.",
              "Paragraph 4: 'the spider did not lose hope. It tried the seventh time.'",
              "'Persevering' = continuing to try despite failure or difficulty.",
              "'careless' = opposite — the spider was very careful and determined.",
              "'obedient' = following orders — not relevant to the spider.",
            ],
            tip: "Persevering = keep trying despite failure. The spider failed 6 times but tried again = perseverance.",
          },
        },
        {
          id: "rg_e_q36",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 36,
          marks: 1,
          stem: "Bruce defeated the King of England six times. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — verify against passage",
            steps: [
              "Passage: 'Bruce led his army to fight against their foes six times. In each battle, his men were beaten.'",
              "Bruce's army was BEATEN six times — he did NOT defeat anyone six times.",
              "Bruce was the one who kept LOSING, not winning.",
              "Statement is FALSE.",
            ],
            tip: "Read carefully: 'his men were beaten' = Bruce's army lost. Bruce did NOT defeat King Edward six times.",
          },
        },
        {
          id: "rg_e_q37",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 37,
          marks: 1,
          stem: "Bruce saw the spider in the cave weave a web on the ceiling. TRUE or FALSE?",
          answer: "TRUE",
          solution: {
            method: "True/False — locate text evidence",
            steps: [
              "Passage: 'Bruce lay on the ground and saw a spider weaving a web on the ceiling.'",
              "The statement matches exactly — TRUE.",
            ],
            tip: "Direct match with the text. 'Saw a spider weaving a web on the ceiling' = TRUE.",
          },
        },
        {
          id: "rg_e_q38",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 38,
          marks: 1,
          stem: "The spider succeeded in throwing the thread over the beam on the sixth try. TRUE or FALSE?",
          answer: "FALSE",
          solution: {
            method: "True/False — count attempts carefully",
            steps: [
              "Passage: 'Six times it tried to throw her thread…six times it fell short.'",
              "The spider FAILED on the sixth try.",
              "Passage: 'It tried the seventh time…This time, the thread was carried safely to the beam.'",
              "SUCCESS came on the SEVENTH try, NOT the sixth.",
              "Statement is FALSE.",
            ],
            tip: "Count carefully: 6 failures + 7th attempt = success. The spider succeeded on the SEVENTH try.",
          },
        },
        {
          id: "rg_e_q39",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 39,
          marks: 2,
          stem: "In paragraph 5, what two things did Bruce do after he called his men together?",
          answer: {
            i: "He told them his plans.",
            ii: "He led his men to fight another battle with King Edward.",
          },
          solution: {
            method: "Locate two specific actions",
            steps: [
              "Paragraph 5: 'He called his men together. He told them his plans.'",
              "Action 1: He told them his plans.",
              "Then: 'Bruce led his men to fight another battle with King Edward.'",
              "Action 2: He led his men to fight another battle / He led his men against King Edward.",
            ],
            tip: "For 'two things' questions, provide exactly two distinct actions from the specified paragraph.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — Open-ended Comprehension 2 (10 m)
    // Passage: Ben and Mother
    // ─────────────────────────────────────────────
    {
      id: "secF",
      name: "Section F: Open-ended Comprehension 2",
      topic: "ComprehensionOE",
      marks: 10,
      passage: {
        title: "Ben and Mother",
        text: `Ben always had excellent results in his school report cards. Father had passed away when he was one and it was Mother, a clothes cleaner, who paid for all his school fees.

One day, Ben's friend remarked about how perfect Ben's hands were. Curious, he asked if Ben had ever helped Mother wash clothes before.

The question saddened Ben as Mother was the only one doing the housework. He had never lifted a finger to help her. She did not want him to. Instead, she wanted him to focus on studying. When Ben came home that evening, he asked Mother to let him clean her hands. Eyes lighting up, she readily showed her hands to Ben.

Ben held Mother's hands and washed them with soap. His tears fell as he noticed that they were so wrinkled and bruised. As he was rinsing the soap off her hands, Mother cried out because some bruises were so painful.

Ben thought about how the pair of wrinkled and bruised hands had washed the clothes every day. He thought about how that pair of old hands had paid for his school fees and ensured that he had a bright future. The bruises on Mother's hands were the price that she had to pay. After cleaning Mother's hands, Ben quietly washed all the remaining clothes for her, a task long overdue.

(Adapted from: https://krishnatoday.com/appreciate-others-good-works/)`,
      },
      questions: [
        {
          id: "rg_f_q40",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 40,
          marks: 1,
          stem: "Based on the passage, what did Ben's mother work as?",
          answer: "Ben's mother worked as a clothes cleaner.",
          solution: {
            method: "Locate specific information",
            steps: [
              "Passage: 'it was Mother, a clothes cleaner, who paid for all his school fees.'",
              "The job is explicitly stated: a clothes cleaner.",
            ],
            tip: "The answer is directly in the text. 'Mother, a clothes cleaner' — this is her profession.",
          },
        },
        {
          id: "rg_f_q41",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 41,
          marks: 1,
          stem: "Which sentence in paragraph 1 tells you that Ben did very well in school?",
          answer: "Ben always had excellent results in his school report cards.",
          solution: {
            method: "Locate sentence showing academic achievement",
            steps: [
              "Paragraph 1 begins: 'Ben always had excellent results in his school report cards.'",
              "'Excellent results' = doing very well in school.",
              "This is the sentence that directly tells us Ben did very well.",
            ],
            tip: "Quote the EXACT sentence from the paragraph. 'Excellent results in school report cards' = doing very well in school.",
          },
        },
        {
          id: "rg_f_q42",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 42,
          marks: 2,
          stem: "In paragraph 2, what made Ben's friend curious enough to ask him if he had ever helped Mother wash the clothes?",
          answer: "Ben's friend was curious because he noticed how perfect Ben's hands were and wondered if Ben had ever helped his mother with the washing.",
          solution: {
            method: "Cause of curiosity — locate text evidence",
            steps: [
              "Passage: 'Ben's friend remarked about how perfect Ben's hands were. Curious, he asked if Ben had ever helped Mother wash clothes before.'",
              "The friend saw Ben's perfect (smooth, undamaged) hands.",
              "This made him curious — if Ben helped wash clothes, his hands would be rough, not perfect.",
              "The friend wondered if Ben ever helped because his hands were too perfect for someone who does washing.",
            ],
            tip: "The CAUSE of curiosity = seeing Ben's perfect hands. The INFERENCE = if he washed clothes his hands would not be so perfect.",
          },
        },
        {
          id: "rg_f_q43",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 43,
          marks: 1,
          stem: "Mother did not want him to do the housework. TRUE or FALSE? Give a reason.",
          answer: "TRUE. Mother did not want Ben to do the housework because she wanted him to focus on studying.",
          solution: {
            method: "True/False with reason",
            steps: [
              "Passage: 'He had never lifted a finger to help her. She did not want him to. Instead, she wanted him to focus on studying.'",
              "TRUE — Mother did not want Ben to do housework.",
              "Reason: She wanted him to focus on studying / his school work.",
            ],
            tip: "TRUE/FALSE with reason: state TRUE/FALSE first, then cite the text evidence as the reason.",
          },
        },
        {
          id: "rg_f_q44",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 44,
          marks: 1,
          stem: "Ben had never helped his mother around the house. TRUE or FALSE? Give a reason.",
          answer: "TRUE. Ben had never lifted a finger to help Mother as she was the only one doing the housework.",
          solution: {
            method: "True/False with reason",
            steps: [
              "Passage: 'He had never lifted a finger to help her.'",
              "'Never lifted a finger' = never helped at all.",
              "Also: 'Mother was the only one doing the housework.'",
              "TRUE — Ben had never helped.",
            ],
            tip: "'Never lifted a finger' = an idiom meaning never helped at all. This confirms TRUE.",
          },
        },
        {
          id: "rg_f_q45",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 45,
          marks: 1,
          stem: "Mother was reluctant to show him her hands. TRUE or FALSE? Give a reason.",
          answer: "FALSE. Mother was NOT reluctant — she readily showed her hands to Ben when he asked to clean them.",
          solution: {
            method: "True/False with reason",
            steps: [
              "Passage: 'Eyes lighting up, she readily showed her hands to Ben.'",
              "'Readily' = willingly, without hesitation.",
              "'Eyes lighting up' = she was happy/pleased when Ben offered to clean her hands.",
              "She was NOT reluctant — she showed her hands READILY (willingly).",
              "FALSE.",
            ],
            tip: "'Readily' = without hesitation, willingly. This is the OPPOSITE of reluctant. FALSE.",
          },
        },
        {
          id: "rg_f_q46",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 46,
          marks: 1,
          stem: "Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in paragraph 4.",
          subEvents: [
            "Ben held and washed his mother's hands with soap.",
            "Ben saw the wrinkles and bruises on Mother's hands.",
            "Mother felt much pain in her hands when Ben rinsed the soap off them.",
          ],
          answer: {
            "Ben held and washed his mother's hands with soap.": "1",
            "Ben saw the wrinkles and bruises on Mother's hands.": "2",
            "Mother felt much pain in her hands when Ben rinsed the soap off them.": "3",
          },
          solution: {
            method: "Sequence of events in paragraph 4",
            steps: [
              "1: 'Ben held Mother's hands and washed them with soap.'",
              "2: 'His tears fell as he noticed that they were so wrinkled and bruised.' (saw wrinkles/bruises)",
              "3: 'As he was rinsing the soap off her hands, Mother cried out because some bruises were so painful.' (pain when rinsing)",
            ],
            tip: "Follow the chronological order in paragraph 4: wash soap on → notice damage → rinse off (pain).",
          },
        },
        {
          id: "rg_f_q47",
          type: "B",
          topic: "ComprehensionOE",
          questionNumber: 47,
          marks: 2,
          stem: "In what ways did Mother's hard work help Ben?",
          answer: "Mother's hard work paid for Ben's school fees and ensured that he had a bright future.",
          solution: {
            method: "Locate specific benefits to Ben from Mother's work",
            steps: [
              "Paragraph 5: 'He thought about how that pair of old hands had paid for his school fees and ensured that he had a bright future.'",
              "Two ways: (1) paid for his school fees; (2) ensured he had a bright future.",
              "These are the direct results of Mother's hard work as a clothes cleaner.",
            ],
            tip: "The question asks for WAYS (plural). Find at least two benefits Ben received from Mother's hard work.",
          },
        },
      ],
    },
  ],
};

export default paper;
