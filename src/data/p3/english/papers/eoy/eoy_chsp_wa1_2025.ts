// ============================================================
// Catholic High School (Primary) — P3 English Weighted Assessment 1 (2022)
// Total: 30 marks
// Section A : Grammar MCQ    (Q1–10,  10 marks)
// Section B : Vocabulary MCQ (Q11–20, 10 marks)
// Section C : Grammar Cloze  (Q21–25,  5 marks)  — 'Clean Plate' campaign
// Section D : Vocabulary Cloze (Q26–30, 5 marks) — Hazel and the puppy
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  SECTION A — Grammar MCQ (Q1–10, 10 marks)
// ============================================================

const sectionA: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chs_wa1_2022_A_01",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Max and his friend ___ to East Coast Park every Saturday morning.",
    options: ["cycle", "cycles", "cycled", "are cycling"],
    answer: 0,
    solution: {
      method: "Subject-verb agreement + frequency adverb = Simple Present",
      steps: [
        "Time clue: 'every Saturday morning' = regular/habitual action → Simple Present.",
        "Subject: 'Max and his friend' = compound subject = PLURAL (they).",
        "For plural subjects in Simple Present, use the BASE form: cycle ✓.",
        "'cycles' has -s → only for singular subjects (he/she/it).",
        "'cycled' = Simple Past — not a regular habit expressed in past.",
        "'are cycling' = Present Continuous — used for actions happening NOW, not weekly habits.",
        "Answer: (1) cycle.",
      ],
      tip: "'Every Saturday morning' is a frequency expression → Simple Present. 'Max and his friend' = they = plural → base verb (no -s). Cycle, not cycles.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_02",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Every pupil in the school ___ to take his temperature daily.",
    options: ["has", "had", "have", "are having"],
    answer: 0,
    solution: {
      method: "Subject-verb agreement — 'every' makes subject singular",
      steps: [
        "'Every pupil' — despite referring to many pupils, 'every + noun' is grammatically SINGULAR.",
        "Rule: 'every/each + noun' → singular verb (he/she/it form).",
        "'has' = singular third-person ✓ (every pupil = he/she).",
        "'have' = base form, used for plural subjects — wrong for 'every pupil'.",
        "'had' = Simple Past — no past time indicator here.",
        "'are having' = Present Continuous plural — wrong for 'every pupil'.",
        "Answer: (1) has.",
      ],
      tip: "Key rule: 'Every [noun]' and 'Each [noun]' are ALWAYS singular and take -s/-es verbs: every pupil HAS, each student TAKES, every child IS.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_03",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "___ group of boys on the field over there is playing soccer.",
    options: ["This", "That", "These", "Those"],
    answer: 1,
    solution: {
      method: "Demonstrative adjectives — distance + number",
      steps: [
        "'Group' is a singular noun (even though it contains many boys).",
        "For singular nouns: use 'this' (near) or 'that' (far).",
        "The clue 'over there' indicates the group is FAR from the speaker.",
        "'that' = singular + far ✓.",
        "'this' = singular + near — 'over there' means far, not near.",
        "'these' and 'those' = plural — 'group' is singular.",
        "Answer: (2) That.",
      ],
      tip: "'Over there' signals distance → use 'that' (singular far) or 'those' (plural far). Since 'group' is singular → 'That group'. Remember: This/These (near), That/Those (far), This/That (singular), These/Those (plural).",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "I have taken my friend's worksheets by mistake. I will return ___ to him when I see him.",
    options: ["it", "us", "his", "them"],
    answer: 3,
    solution: {
      method: "Object pronoun — replacing plural noun",
      steps: [
        "What is being returned? → 'my friend's worksheets' (plural).",
        "We need an object pronoun to replace the plural 'worksheets'.",
        "Object pronoun for plural things = 'them' ✓.",
        "'it' = singular object pronoun — 'worksheets' is plural.",
        "'us' = first-person plural object — refers to people, not worksheets.",
        "'his' = possessive pronoun — cannot be the object of 'return'.",
        "Answer: (4) them.",
      ],
      tip: "To replace a plural noun as the object of a verb, use 'them'. 'I will return THEM' = I will return the worksheets. Singular → it; Plural → them.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Mother ___ in the kitchen when her mobile phone rang.",
    options: ["cooks", "cooked", "is cooking", "was cooking"],
    answer: 3,
    solution: {
      method: "Past Continuous Tense — interrupted action",
      steps: [
        "'When her mobile phone rang' = interrupting action in Simple Past.",
        "Pattern: Past Continuous (was/were + -ing) + 'when' + Simple Past.",
        "Mother was in the middle of cooking when the phone interrupted.",
        "'was cooking' = Past Continuous for singular subject 'Mother' (she → was) ✓.",
        "'cooked' = Simple Past — would describe a completed action, not an ongoing one.",
        "'is cooking' = Present Continuous — wrong tense (story is in the past).",
        "'cooks' = Simple Present — wrong tense.",
        "Answer: (4) was cooking.",
      ],
      tip: "'When + Simple Past' triggers Past Continuous for the background action. Mother WAS COOKING (ongoing) WHEN the phone RANG (interrupted). Think of the cooking as the 'background movie'.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Chitra misses her best friend, Nisha. It has been five years ___ she left Singapore.",
    options: ["but", "after", "since", "although"],
    answer: 2,
    solution: {
      method: "Conjunctions — time expression with 'since'",
      steps: [
        "The sentence: 'It has been five years ___ she left Singapore.'",
        "The blank connects a time duration ('five years') with a past event ('she left').",
        "'since' is used with Present Perfect to mark the starting point of a period: 'It has been five years since she left.' ✓",
        "Structure: [duration] + since + [past event] — standard English pattern.",
        "'but' = contrast — no contrast here.",
        "'after' = following in time — 'It has been five years after she left' is awkward and non-standard.",
        "'although' = concession/contrast — doesn't fit.",
        "Answer: (3) since.",
      ],
      tip: "'Since' connects a past point in time to the present: 'I have been here since 2020', 'It has been two years since he moved away.' Used with Present Perfect (has/have + past participle).",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_07",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Wee Boon's father ___ for a meeting earlier in the day.",
    options: ["left", "leave", "leaves", "is leaving"],
    answer: 0,
    solution: {
      method: "Simple Past Tense — 'earlier in the day'",
      steps: [
        "Time clue: 'earlier in the day' = a past time reference.",
        "Past time = Simple Past tense.",
        "'left' = Simple Past of 'leave' ✓ (irregular verb).",
        "'leave' = base form — cannot stand alone as a past tense verb.",
        "'leaves' = Simple Present, singular — wrong for past context.",
        "'is leaving' = Present Continuous — ongoing action now, not 'earlier'.",
        "Answer: (1) left.",
      ],
      tip: "Time expressions like 'earlier in the day', 'yesterday', 'last week', 'an hour ago' signal Simple Past tense. 'Left' is the irregular past tense of 'leave'.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"There is still ___ shampoo left in the bottle. Use it first," my mother told my sister.',
    options: ["any", "few", "some", "many"],
    answer: 2,
    solution: {
      method: "Quantifiers — positive statement + uncountable noun",
      steps: [
        "The sentence is AFFIRMATIVE (positive): 'There is still ___ shampoo left.'",
        "'shampoo' is an uncountable noun.",
        "For positive statements with uncountable nouns, use 'some' ✓.",
        "'any' is used in negatives and questions: 'Is there any shampoo?', 'There isn't any shampoo.'",
        "'few' is for countable nouns (a few bottles) — not uncountable 'shampoo'.",
        "'many' is for countable plural nouns — not uncountable 'shampoo'.",
        "Answer: (3) some.",
      ],
      tip: "SOME = positive statements (There is some milk). ANY = negatives and questions (There isn't any milk / Is there any milk?). Shampoo is uncountable → some (positive) / any (negative/question).",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_09",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "During the December holidays, Sally went ___ a vacation to New York with her family.",
    options: ["in", "at", "by", "on"],
    answer: 3,
    solution: {
      method: "Preposition — fixed phrase 'go on a vacation'",
      steps: [
        "The blank comes after 'went' and before 'a vacation'.",
        "The correct fixed phrase/collocation is 'go ON a vacation' / 'go ON a trip'. ✓",
        "'went on a vacation' is the standard English expression.",
        "'in' — 'went in a vacation' is not standard English.",
        "'at' — 'went at a vacation' is not standard English.",
        "'by' — 'went by a vacation' makes no sense.",
        "Answer: (4) on.",
      ],
      tip: "Fixed expressions with 'on': go ON a vacation/holiday/trip, go ON a picnic, be ON leave. These are set phrases you should memorise.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_A_10",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Children, you must do the homework by ___ and not discuss the answers," Mrs Loh said.',
    options: ["itself", "yourself", "ourselves", "yourselves"],
    answer: 3,
    solution: {
      method: "Reflexive pronouns — plural 'you' (addressing a class)",
      steps: [
        "Mrs Loh is addressing the entire class of children — 'you' here is PLURAL (multiple children).",
        "Reflexive pronoun for plural 'you' = 'yourselves'.",
        "'yourself' = reflexive for singular 'you' — one person only.",
        "'itself' = reflexive for 'it' (singular non-human).",
        "'ourselves' = reflexive for 'we' — the speaker and others, not the children.",
        "'Yourselves' in 'by yourselves' = each of you independently / on your own (plural). ✓",
        "Answer: (4) yourselves.",
      ],
      tip: "Reflexive pronoun matching: I→myself, you (singular)→yourself, he→himself, she→herself, it→itself, we→ourselves, you (plural)→yourselves, they→themselves. Mrs Loh speaks to the whole class = plural 'you' → yourselves.",
    },
  },
];

// ============================================================
//  SECTION B — Vocabulary MCQ (Q11–20, 10 marks)
// ============================================================

const sectionB: QuestionTypeA[] = [
  {
    kind: "single",
    id: "chs_wa1_2022_B_11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The thief ___ towards the back door when he heard the police siren.",
    options: ["bolted", "strolled", "trudged", "stomped"],
    answer: 0,
    solution: {
      method: "Context clues — manner of movement in urgent situation",
      steps: [
        "Context: The thief heard a police siren — an alarming situation requiring escape.",
        "The thief would move very QUICKLY (to escape).",
        "'bolted' = to run away very suddenly and quickly ✓ — perfect for a thief fleeing.",
        "'strolled' = walked slowly and leisurely — opposite of what a fleeing thief would do.",
        "'trudged' = walked slowly and heavily with difficulty — too slow for escape.",
        "'stomped' = walked heavily and noisily — not fast enough for escape, also noisy.",
        "Answer: (1) bolted.",
      ],
      tip: "'Bolt' means to suddenly run away fast — like a startled horse or a criminal hearing sirens. 'The horse bolted', 'the thief bolted'. It conveys both speed and sudden movement.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Some of the customers were unhappy with the service in the restaurant. They ___ about the poor service to the owner.",
    options: ["fussed", "sobbed", "nagged", "grumbled"],
    answer: 3,
    solution: {
      method: "Context clues — expressing dissatisfaction",
      steps: [
        "Context: Customers were UNHAPPY with service and complained TO the owner.",
        "'grumbled' = to complain in a low, dissatisfied voice about something ✓.",
        "'fussed' = to be nervously active or to make a fuss — not specifically about complaining to someone.",
        "'sobbed' = to cry with heaving breaths — about sadness, not service complaints.",
        "'nagged' = to repeatedly complain to someone to do something — implies repeated pestering, often from a position of authority (parent nagging a child).",
        "'grumbled about the poor service' is the most natural and accurate expression. ✓",
        "Answer: (4) grumbled.",
      ],
      tip: "'Grumble' means to complain in a low, unhappy voice. 'The customers grumbled about the food.' Related: mumble, mutter, groan. It's a perfect word for quiet, persistent dissatisfaction.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "My brother gobbled the chocolate cake ___ as he was very hungry after lessons.",
    options: ["slowly", "untidily", "greedily", "carelessly"],
    answer: 2,
    solution: {
      method: "Collocation — 'gobbled' meaning + manner adverb",
      steps: [
        "'Gobbled' = to eat very quickly and noisily in large mouthfuls.",
        "This already implies greediness and speed.",
        "'greedily' reinforces and matches the meaning of 'gobbled' — eating with greediness ✓.",
        "'slowly' = contradicts 'gobbled' — gobbling is fast eating.",
        "'untidily' = messy — while gobbling can be messy, this is not the most natural adverb.",
        "'carelessly' = without care — doesn't specifically describe the way of eating here.",
        "Answer: (3) greedily.",
      ],
      tip: "'Gobble' and 'greedily' are natural collocations: 'gobbled up greedily'. 'Gobble' means to eat fast and greedily — so 'greedily' is the perfect match.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"Please ___ the volume of the television. I\'m trying to do my homework," I told my sister.',
    options: ["turn up", "turn over", "turn away", "turn down"],
    answer: 3,
    solution: {
      method: "Phrasal verbs — 'turn' + direction/action",
      steps: [
        "Context: Asking sister to reduce the TV volume so the speaker can study.",
        "'turn down' = to reduce the volume/level of something ✓.",
        "'turn up' = to INCREASE the volume — the opposite of what is needed.",
        "'turn over' = to flip/roll over, or to change channel (in British English).",
        "'turn away' = to face away from something, or to refuse entry.",
        "Answer: (4) turn down.",
      ],
      tip: "Volume control phrasal verbs: TURN UP = increase volume/heat. TURN DOWN = decrease/reduce volume/heat. 'Please turn down the TV' = make it quieter.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_15",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Gopal is unable to read without his glasses. He is blind like a ___.",
    options: ["bat", "fox", "pig", "owl"],
    answer: 0,
    solution: {
      method: "Simile — animal comparison for blindness",
      steps: [
        "The simile is 'blind like a ___'.",
        "The well-known English idiom/simile is 'blind as/like a bat'.",
        "Bats are associated with poor vision (though in reality they use echolocation).",
        "The fixed expression 'blind as a bat' means unable to see well. ✓",
        "'owl' is associated with wisdom ('wise as an owl'), not blindness.",
        "'fox' is associated with cleverness ('sly as a fox').",
        "'pig' is associated with greediness ('eat like a pig').",
        "Answer: (1) bat.",
      ],
      tip: "Common animal similes: blind as a BAT, wise as an OWL, sly as a FOX, brave as a LION, stubborn as a MULE, gentle as a LAMB. 'Blind as a bat' is the standard expression for poor eyesight.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_16",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "I felt a ___ of water fall on my hand. I think we need to hurry as it might rain soon.",
    options: ["pool", "drop", "splash", "puddle"],
    answer: 1,
    solution: {
      method: "Context clues — size and amount of water",
      steps: [
        "Context: A small amount of water fell on the hand — possibly the beginning of rain.",
        "'drop' = a tiny, single amount of liquid — 'a drop of water/rain' ✓.",
        "'pool' = a large, still body of water — too much for what falls on a hand.",
        "'splash' = water hitting a surface and scattering — not just 'felt on the hand'.",
        "'puddle' = a small patch of standing water on the ground — cannot 'fall on the hand'.",
        "Answer: (2) drop.",
      ],
      tip: "A single small amount of falling water = a DROP. 'A drop of rain fell on my hand' is the natural expression for the first signs of rain. Size reference: drop < splash < puddle < pool.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_17",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Betty towers over her older brother. She is ___.",
    options: [
      "as tall as a giraffe",
      "as wise as an owl",
      "as big as an elephant",
      "as proud as a peacock",
    ],
    answer: 0,
    solution: {
      method: "Simile — context of height",
      steps: [
        "'Betty towers over her older brother' = Betty is very TALL (taller than her older brother).",
        "We need a simile that means 'very tall'.",
        "'as tall as a giraffe' = giraffes are the tallest animals — perfect for 'towers over others' ✓.",
        "'as wise as an owl' = refers to intelligence/wisdom, not height.",
        "'as big as an elephant' = refers to SIZE/WEIGHT, not specifically height.",
        "'as proud as a peacock' = refers to pride/showing off, not height.",
        "Answer: (1) as tall as a giraffe.",
      ],
      tip: "'Towers over' = stands much taller than. The simile must relate to HEIGHT. Giraffes are famous for their extreme height → 'as tall as a giraffe' = extremely tall.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_18",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Aaron spilled some hot coffee on himself and as a result has ___ his leg.",
    options: ["blazed", "twisted", "scalded", "sprained"],
    answer: 2,
    solution: {
      method: "Vocabulary — injury caused by hot liquid",
      steps: [
        "Context: Aaron spilled HOT COFFEE on himself → injury to his leg.",
        "'scalded' = to burn/injure with hot liquid or steam ✓.",
        "Hot coffee causing injury = scald. 'He scalded his leg with hot coffee.'",
        "'blazed' = burned with a flame/fire — coffee doesn't produce flames.",
        "'twisted' = injury from rotating a joint — caused by physical movement, not liquid.",
        "'sprained' = injury to a ligament from twisting — also from physical movement.",
        "Answer: (3) scalded.",
      ],
      tip: "SCALD = injury from hot liquid (water, coffee, soup, steam). BURN = injury from fire, heat source, or chemicals. 'Sprain' and 'twist' are joint injuries from physical movement, NOT from liquids.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_19",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "John is a ___ class monitor. You can trust him to take care of the class when the teacher is not around.",
    options: ["polite", "strong", "pleasant", "responsible"],
    answer: 3,
    solution: {
      method: "Context clues — character trait for responsibility",
      steps: [
        "Context: You can TRUST him to take care of the class when the teacher is not around.",
        "'Trustworthy' and 'taking care of things' in the teacher's absence = being RESPONSIBLE.",
        "'responsible' = able to be trusted to do what is expected; reliable ✓.",
        "'polite' = well-mannered — being polite does not specifically mean you can be trusted to lead.",
        "'strong' = physically powerful — not relevant to monitoring a class.",
        "'pleasant' = nice/agreeable — pleasant does not mean reliable or trustworthy.",
        "Answer: (4) responsible.",
      ],
      tip: "'Responsible' describes someone who can be trusted and depended on. Being a reliable class monitor who manages the class = responsible. Look for words that match 'trust' and 'take care of'.",
    },
  },
  {
    kind: "single",
    id: "chs_wa1_2022_B_20",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"Smoking is ___ to your health. You should slowly quit smoking," the doctor advised my father.',
    options: ["fearful", "hurtful", "painful", "harmful"],
    answer: 3,
    solution: {
      method: "Collocation — fixed phrase 'harmful to health'",
      steps: [
        "The blank: 'Smoking is ___ to your health.'",
        "The standard expression is 'harmful to your health' / 'harmful to one's health' ✓.",
        "'harmful' = causing harm/damage ✓.",
        "'fearful' = causing fear — smoking is not 'fearful to health'.",
        "'hurtful' = causing emotional hurt — 'hurtful to health' is non-standard.",
        "'painful' = causing physical pain — while smoking can cause pain, 'harmful' is the standard health warning word.",
        "Answer: (4) harmful.",
      ],
      tip: "'Harmful to health' is a fixed expression you should memorise: 'Smoking is harmful to your health', 'Junk food is harmful to your health.' Harmful = causing damage, especially long-term.",
    },
  },
];

// ============================================================
//  SECTION C — Grammar Cloze (Q21–25, 5 marks)
//  Passage: 'Clean Plate' campaign
//  Word bank: A=I, B=it, C=my, D=us, E=we
// ============================================================

export const grammarCloze: QuestionTypeB = {
  kind: "set",
  id: "chs_wa1_2022_C_gc",
  topic: "GrammarCloze",
  passage:
    '"Preventing food wastage is important," Miss Yeo told our class. She told (21) ___ that we would be participating in the \'Clean Plate\' campaign.\n\nMiss Yeo instructed all of us to order only what (22) ___ could finish to avoid wastage. When I got home, I told (23) ___ mother about the campaign. She was happy as (24) ___ will teach me good eating habits. The next day, (25) ___ waited for Miss Yeo to give me more details about the campaign. I was proud to be part of this campaign.\n\nAdapted from http://surl.li/bdxaw\n\n[Word bank: A=I, B=it, C=my, D=us, E=we]',
  questions: [
    {
      id: "chs_wa1_2022_C_gc_21",
      marks: 1,
      question:
        "She told (21) ___ that we would be participating in the 'Clean Plate' campaign.\n[Word bank: A=I, B=it, C=my, D=us, E=we]",
      answer: "D (us)",
      solution: {
        method: "Object pronoun — Miss Yeo told the class",
        steps: [
          "'She told ___ that...' — 'told' needs an OBJECT PRONOUN.",
          "Who did Miss Yeo tell? → the class = 'our class' = us (first-person plural object).",
          "'us' = object pronoun for 'we' ✓.",
          "'we' (E) = subject pronoun — 'She told we' is grammatically wrong.",
          "'I' (A) = first-person singular subject — wrong as object of 'told'.",
          "Answer: D (us).",
        ],
        tip: "'Tell' takes an object pronoun: 'She told us/him/them'. Never 'She told we/I/they'. Object pronouns receive the action: me, him, her, us, them.",
      },
    },
    {
      id: "chs_wa1_2022_C_gc_22",
      marks: 1,
      question:
        "Miss Yeo instructed all of us to order only what (22) ___ could finish to avoid wastage.\n[Word bank: A=I, B=it, C=my, D=us, E=we]",
      answer: "E (we)",
      solution: {
        method: "Subject pronoun — 'all of us' = we",
        steps: [
          "'order only what ___ could finish' — the subject of 'could finish' is needed.",
          "The instruction is for 'all of us' — referring to the class as a group.",
          "Subject pronoun for 'all of us' = 'we' ✓.",
          "'we could finish' = the class members can finish ✓.",
          "'us' (D) = object pronoun — 'what us could finish' is grammatically wrong.",
          "Answer: E (we).",
        ],
        tip: "Subject pronouns perform the action: we, I, he, she, they. 'What WE could finish' = what we (the class) are able to finish. 'We' does the finishing.",
      },
    },
    {
      id: "chs_wa1_2022_C_gc_23",
      marks: 1,
      question:
        "When I got home, I told (23) ___ mother about the campaign.\n[Word bank: A=I, B=it, C=my, D=us, E=we]",
      answer: "C (my)",
      solution: {
        method: "Possessive pronoun — belonging to 'I'",
        steps: [
          "'I told ___ mother' — we need a possessive adjective before 'mother'.",
          "The speaker is 'I' — so 'my mother' = belonging to the speaker. ✓",
          "'my' = possessive adjective for 'I' ✓.",
          "'I' (A) = subject pronoun — 'I told I mother' is grammatically wrong.",
          "'us' (D) = object pronoun — cannot modify a noun.",
          "Answer: C (my).",
        ],
        tip: "Possessive adjectives precede nouns to show ownership: my mother, your friend, his teacher, her bag. 'I' → 'my'. 'I told MY mother' = I told the mother belonging to me.",
      },
    },
    {
      id: "chs_wa1_2022_C_gc_24",
      marks: 1,
      question:
        "She was happy as (24) ___ will teach me good eating habits.\n[Word bank: A=I, B=it, C=my, D=us, E=we]",
      answer: "B (it)",
      solution: {
        method: "Pronoun reference — 'it' replacing the campaign",
        steps: [
          "What 'will teach me good eating habits'? → the 'Clean Plate' campaign.",
          "Replacing a singular thing/concept (the campaign) as the subject = 'it'.",
          "'it' = third-person singular pronoun for a thing/concept ✓.",
          "'it will teach me good eating habits' — the campaign is the teacher ✓.",
          "'we' (E) = first-person plural — does not refer to 'the campaign'.",
          "Answer: B (it).",
        ],
        tip: "When replacing an abstract concept, event, or thing as a subject, use 'it': 'The campaign will help us' → 'It will help us'. 'The plan was good' → 'It was good'.",
      },
    },
    {
      id: "chs_wa1_2022_C_gc_25",
      marks: 1,
      question:
        "The next day, (25) ___ waited for Miss Yeo to give me more details about the campaign.\n[Word bank: A=I, B=it, C=my, D=us, E=we]",
      answer: "A (I)",
      solution: {
        method: "Subject pronoun — first-person singular narrative",
        steps: [
          "'___ waited for Miss Yeo' — who waited? The narrator (speaker) waited.",
          "The passage is written in first person ('I got home', 'I told my mother').",
          "The subject who waited = the narrator = 'I' ✓.",
          "Clue: 'give ME more details' — 'me' is first-person singular, consistent with 'I'.",
          "'we' (E) = plural — but only the speaker (I) is waiting, not the whole class.",
          "Answer: A (I).",
        ],
        tip: "Look at the rest of the sentence for clues: 'give ME more details' uses 'me' (first-person singular object). This tells us the subject must be 'I' (first-person singular subject).",
      },
    },
  ],
};

// ============================================================
//  SECTION D — Vocabulary Cloze (Q26–30, 5 marks)
//  Passage: Hazel and the stray puppy
//  Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining
// ============================================================

export const vocabCloze: QuestionTypeB = {
  kind: "set",
  id: "chs_wa1_2022_D_vc",
  topic: "VocabCloze",
  passage:
    "Hazel adored animals. She wanted to own a (26) ___, but her parents could not afford to buy one. One day, Hazel was at the park when she heard an animal (27) ___ in pain. It was a stray puppy with many (28) ___ on its body. She gently (29) ___ the puppy to a veterinary clinic nearby. The vet applied some (30) ___ on the scratches. After the visit, Hazel decided to keep the puppy.\n\n[Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining]",
  questions: [
    {
      id: "chs_wa1_2022_D_vc_26",
      marks: 1,
      question:
        "She wanted to own a (26) ___, but her parents could not afford to buy one.\n[Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining]",
      answer: "C (pet)",
      solution: {
        method: "Context — vocabulary cloze",
        steps: [
          "Hazel 'adored animals' and 'wanted to own a ___'.",
          "An animal you own/keep at home = a 'pet' ✓.",
          "'pet' = a domestic animal kept for companionship ✓.",
          "Her parents 'could not afford to buy one' — confirms it's an animal you purchase.",
          "The rest of the passage (stray puppy) also confirms the animal context.",
          "Answer: C (pet).",
        ],
        tip: "The clue is 'adored animals' + 'wanted to own a ___'. The word that fits animals you own = PET. 'Could not afford to buy one' — pets are things you buy.",
      },
    },
    {
      id: "chs_wa1_2022_D_vc_27",
      marks: 1,
      question:
        "...she heard an animal (27) ___ in pain.\n[Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining]",
      answer: "E (whining)",
      solution: {
        method: "Context — sound made by an animal in pain",
        steps: [
          "Hazel heard an animal making a sound 'in pain'.",
          "'whining' = making a soft, high-pitched sound of distress/pain (especially dogs/animals) ✓.",
          "A stray puppy in pain would be whining — this is the natural sound.",
          "'carried' (A) = past tense verb for transporting — doesn't describe a sound.",
          "'medicine' (B) = substance for healing — not a sound.",
          "'scratches' (D) = injuries/marks on skin — not a sound.",
          "Answer: E (whining).",
        ],
        tip: "'Whine' = a high-pitched, complaining sound made by dogs or animals when unhappy, in pain, or wanting attention. 'The puppy whined because it was hurt.' Related: yelp, whimper.",
      },
    },
    {
      id: "chs_wa1_2022_D_vc_28",
      marks: 1,
      question:
        "It was a stray puppy with many (28) ___ on its body.\n[Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining]",
      answer: "D (scratches)",
      solution: {
        method: "Context — marks/injuries on body",
        steps: [
          "The puppy had 'many ___ on its body'.",
          "'scratches' = marks/wounds on the skin from sharp objects or claws ✓.",
          "A stray puppy could have many scratches from living rough outdoors.",
          "The passage later says 'The vet applied medicine ON THE SCRATCHES' — confirming this word.",
          "Answer: D (scratches).",
        ],
        tip: "The passage confirms 'scratches' later: 'The vet applied some medicine on the scratches.' This is a useful strategy — look ahead in the passage for clues that confirm your answer.",
      },
    },
    {
      id: "chs_wa1_2022_D_vc_29",
      marks: 1,
      question:
        "She gently (29) ___ the puppy to a veterinary clinic nearby.\n[Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining]",
      answer: "A (carried)",
      solution: {
        method: "Context — transporting an injured animal",
        steps: [
          "Hazel 'gently ___ the puppy to a veterinary clinic'.",
          "The puppy is injured — Hazel would need to CARRY it to the vet.",
          "'carried' = past tense of carry = to hold and transport something ✓.",
          "'gently carried the puppy' = held the puppy carefully and brought it to the vet ✓.",
          "The adverb 'gently' supports this — she handled the puppy with care.",
          "Answer: A (carried).",
        ],
        tip: "'Carry' describes how you move an animal or person who cannot move themselves — especially an injured puppy. 'She gently carried the puppy' = she held it carefully and brought it somewhere.",
      },
    },
    {
      id: "chs_wa1_2022_D_vc_30",
      marks: 1,
      question:
        "The vet applied some (30) ___ on the scratches.\n[Word bank: A=carried, B=medicine, C=pet, D=scratches, E=whining]",
      answer: "B (medicine)",
      solution: {
        method: "Context — what a vet applies on injuries",
        steps: [
          "'The vet applied some ___ on the scratches.'",
          "A vet treats injuries by applying medicine/ointment/cream.",
          "'medicine' = substance used to treat illness or injury ✓.",
          "'Applied medicine on the scratches' = put treatment on the wounds ✓.",
          "All other words (carried, pet, scratches, whining) are already used.",
          "Answer: B (medicine).",
        ],
        tip: "Vets (and doctors/nurses) 'apply medicine' to wounds. The scratches needed treatment → medicine is applied. The word 'applied' is a strong clue: you 'apply' medicine, cream, or ointment to skin.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — CHS WA1 2022
// ============================================================

export const chs_wa1_2022: Question[] = [
  ...sectionA,
  ...sectionB,
  grammarCloze,
  vocabCloze,
];

export const paperMetaCHS_WA1 = {
  school: "Catholic High School (Primary)",
  code: "CHS(P)",
  year: 2022,
  exam: "Weighted Assessment 1 (WA1)",
  level: "Primary 3",
  totalMarks: 30,
  sections: [
    { name: "Section A: Grammar MCQ", questions: 10, marks: 10, topic: "GrammarMCQ" as Topic },
    { name: "Section B: Vocabulary MCQ", questions: 10, marks: 10, topic: "VocabMCQ" as Topic },
    { name: "Section C: Grammar Cloze — Clean Plate Campaign", questions: 5, marks: 5, topic: "GrammarCloze" as Topic },
    { name: "Section D: Vocabulary Cloze — Hazel and the Puppy", questions: 5, marks: 5, topic: "VocabCloze" as Topic },
  ],
};
