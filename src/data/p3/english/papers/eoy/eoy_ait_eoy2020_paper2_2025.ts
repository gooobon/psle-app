// ============================================================
// Ai Tong School — P3 English EOY 2020
// Paper 2: Language Use and Comprehension  (50 marks)
// Section A : Grammar MCQ          (Q1–8,   8 marks)
// Section B : Vocabulary MCQ       (Q9–14,  6 marks)
// Section C : Visual Text MCQ      (Q15–19, 5 marks)  — Kids' Quiz flyer
// Section D : Grammar Cloze        (Q20–27, 8 marks)  — 2 passages
//             Passage 1: Ethan's race (prepositions)
//             Passage 2: Birthday diary (indefinite pronouns)
// Section E : Editing for Spelling (Q28–30, 3 marks)  — Tom helps Mrs Chua
// Section F : Word Order           (Q31–32, 4 marks)
// Section G : Comprehension 1      (Q33–40, 8 marks)  — The Star Thrower
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  SECTION A — Grammar MCQ (Q1–8, 8 marks)
// ============================================================

const sectionA: QuestionTypeA[] = [
  {
    kind: "single",
    id: "ait_eoy2020_A_01",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Ben ___ at the park every Saturday morning.",
    options: ["jog", "jogs", "jogged", "is jogging"],
    answer: 1,
    solution: {
      method: "Subject-verb agreement + Simple Present for habit",
      steps: [
        "Time clue: 'every Saturday morning' = regular habit → Simple Present.",
        "Subject: 'Ben' = singular third-person (he).",
        "Singular third-person Simple Present → add -s to verb: jogs ✓.",
        "'jog' = base form — for I/you/we/they.",
        "'jogged' = Simple Past — not for a current habit.",
        "'is jogging' = Present Continuous — for actions happening right now, not weekly habits.",
        "Answer: (2) jogs.",
      ],
      tip: "'Every Saturday morning' = habit → Simple Present. Ben = he → add -s: jogs. Pattern: he/she/it + verb-s.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_02",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Please help ___ to the food," Mother said to our guests.',
    options: ["herself", "ourselves", "yourselves", "themselves"],
    answer: 2,
    solution: {
      method: "Reflexive pronouns — 'help yourself/yourselves to food'",
      steps: [
        "Mother is speaking to the GUESTS (you, plural = the guests).",
        "'Please help ___ to the food' = please serve yourselves.",
        "Reflexive for plural 'you' = 'yourselves' ✓.",
        "'Help yourself/yourselves to the food' is a fixed polite expression meaning 'serve yourself'.",
        "'herself' = for she; 'ourselves' = for we (the family, not the guests); 'themselves' = for they (third person, not being addressed).",
        "Answer: (3) yourselves.",
      ],
      tip: "'Help yourself to the food' (one guest) or 'Help yourselves to the food' (multiple guests) = please serve/take the food for yourself. It's a polite invitation. Mother addresses MULTIPLE guests → yourselves.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_03",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"That was a good movie, ___ it?" I asked Mary.',
    options: ["is", "was", "isn't", "wasn't"],
    answer: 3,
    solution: {
      method: "Question tags — past positive statement",
      steps: [
        "Main clause: 'That WAS a good movie' = POSITIVE statement, PAST tense (was).",
        "Rule: Positive statement → negative question tag.",
        "Auxiliary is 'was' → negative = 'wasn't'.",
        "Subject: 'That' → pronoun = 'it'.",
        "Correct tag: 'wasn't it?' ✓.",
        "'is it?' / 'isn't it?' = present tense — wrong for past 'was'.",
        "'was it?' = positive past tag — wrong for a positive statement.",
        "Answer: (4) wasn't.",
      ],
      tip: "Match the TENSE of the auxiliary: 'was' (past) → 'wasn't it?' (past negative tag). Positive + past → negative + past: 'was' → 'wasn't it?'",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_04",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "I am very full as I had too ___ rice for dinner.",
    options: ["few", "little", "much", "many"],
    answer: 2,
    solution: {
      method: "Quantifiers — uncountable noun + 'too'",
      steps: [
        "'rice' is UNCOUNTABLE (cannot be counted individually).",
        "For uncountable nouns: use 'much' (in negatives/questions) and 'too much' (for excess).",
        "'too much rice' = ate more rice than needed ✓.",
        "'many' = for countable plurals (too many plates, too many bowls).",
        "'few' = for countable nouns (too few chairs).",
        "'little' = 'not much' — opposite meaning (too little = not enough, not excess).",
        "Answer: (3) much.",
      ],
      tip: "Rice is uncountable → much/little (NOT many/few). 'Too much rice' = ate too much rice (excess). Compare: 'too many plates' (countable).",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_05",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Betty boasted that she ___ complete the huge jigsaw puzzle on her own.",
    options: ["may", "must", "could", "should"],
    answer: 2,
    solution: {
      method: "Modal verbs — past ability (reported speech)",
      steps: [
        "Betty BOASTED (past tense) that she ___ complete the puzzle.",
        "This is reported speech in the past — the original boast was 'I can complete it.'",
        "In reported speech, 'can' shifts to 'could' in past context.",
        "'could' = past ability / reported speech version of 'can' ✓.",
        "'may' = permission or possibility — not ability.",
        "'must' = obligation — not relevant to boasting about ability.",
        "'should' = advice — doesn't fit boasting.",
        "Answer: (3) could.",
      ],
      tip: "Reported speech tense shift: 'I can do it' → She said she COULD do it. 'Can' becomes 'could' in past reported speech. Betty boasted (past) → she could (past ability).",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_06",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My baby brother snatched my crayons from me while I ___ a picture.",
    options: ["drew", "draws", "is drawing", "was drawing"],
    answer: 3,
    solution: {
      method: "Past Continuous Tense — interrupted action",
      steps: [
        "'while I ___ a picture' = ongoing background action.",
        "The baby snatched (Simple Past interruption) while the narrator was drawing.",
        "Pattern: Simple Past (interruption) + while + Past Continuous (ongoing action).",
        "'was drawing' = Past Continuous, singular subject 'I' ✓.",
        "'drew' = Simple Past — would mean the drawing was already completed.",
        "'draws/is drawing' = present tense — wrong for past story.",
        "Answer: (4) was drawing.",
      ],
      tip: "'While' signals two simultaneous past actions — the ongoing one uses Past Continuous (was/were + -ing). 'While I WAS DRAWING, he SNATCHED my crayons.'",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_07",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "John will only go to the party ___ his best friend goes as well.",
    options: ["if", "so", "until", "since"],
    answer: 0,
    solution: {
      method: "Conjunctions — conditional",
      steps: [
        "The sentence expresses a CONDITION: John will go, on condition that his friend goes.",
        "'if' introduces a conditional clause: 'if his best friend goes' = on the condition that his friend goes ✓.",
        "'so' = result — 'John will go so his friend goes' makes no logical sense.",
        "'until' = up to a time — 'John will go until his friend goes' changes the meaning entirely.",
        "'since' = reason or time — not a condition.",
        "Answer: (1) if.",
      ],
      tip: "'If' introduces conditions: 'I will go IF you go.' 'I will buy it IF it's on sale.' The condition must be met for the result to happen.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_A_08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Not wanting to get wet, Gopal jumped ___ the puddle of water.",
    options: ["into", "over", "above", "through"],
    answer: 1,
    solution: {
      method: "Prepositions of movement — avoiding water",
      steps: [
        "Context: Gopal did NOT want to get wet → he jumped to AVOID the puddle.",
        "'over' = across and past, clearing the obstacle ✓. Jumping over a puddle = landing on the other side without stepping in it.",
        "'into' = entering the puddle — that would make him wet (opposite of his intention).",
        "'above' = above something but not moving past it — not used with jump in this context.",
        "'through' = passing through the middle of something — would make him wet.",
        "Answer: (2) over.",
      ],
      tip: "JUMP OVER = clear an obstacle and land on the other side without touching it. 'Jump over the puddle' = avoid getting wet. Compare: 'jump into the pool' = enter the water.",
    },
  },
];

// ============================================================
//  SECTION B — Vocabulary MCQ (Q9–14, 6 marks)
// ============================================================

const sectionB: QuestionTypeA[] = [
  {
    kind: "single",
    id: "ait_eoy2020_B_09",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Father is taking me to the ___ for a football game.",
    options: ["theatre", "cinema", "stadium", "museum"],
    answer: 2,
    solution: {
      method: "Vocabulary — place where football games are held",
      steps: [
        "Context: going to watch a football game.",
        "A large venue where football and other sports are played = a 'stadium' ✓.",
        "'theatre' = for plays, musicals, performances.",
        "'cinema' = for watching movies/films.",
        "'museum' = for viewing exhibits, art, history.",
        "Answer: (3) stadium.",
      ],
      tip: "Venues: STADIUM (football, athletics, rugby), THEATRE (plays, shows), CINEMA (movies), MUSEUM (exhibits), AQUARIUM (sea creatures), ZOO (animals). Football → stadium.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_B_10",
    topic: "VocabMCQ",
    marks: 1,
    question: "The ___ of wolves is chasing the deer.",
    options: ["crew", "pack", "band", "army"],
    answer: 1,
    solution: {
      method: "Collective nouns — animals",
      steps: [
        "'___ of wolves' = collective noun for wolves.",
        "'pack' = the correct collective noun for wolves: a pack of wolves ✓.",
        "'crew' = for workers on a ship/aircraft, or a team.",
        "'band' = for musicians or a group of people.",
        "'army' = for soldiers — not used for animals.",
        "Answer: (2) pack.",
      ],
      tip: "A PACK of wolves (also used for dogs). Remember: pack of wolves/dogs, pride of lions, herd of cattle/elephants, flock of birds, school of fish, swarm of bees.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_B_11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "I jumped in my seat as I was ___ by the sudden loud knocking on the door.",
    options: ["irritated", "confused", "surprised", "fascinated"],
    answer: 2,
    solution: {
      method: "Context clues — reaction to unexpected sound",
      steps: [
        "Context: 'I jumped in my seat' = a sudden physical reaction to unexpected noise.",
        "Jumping in your seat from a sudden noise = being SURPRISED (startled).",
        "'surprised' = feeling unexpected shock due to something unexpected ✓.",
        "'irritated' = annoyed — you might clench your fists, not jump in your seat.",
        "'confused' = puzzled — confusion doesn't cause jumping.",
        "'fascinated' = extremely interested — not a reaction to a loud knock.",
        "Answer: (3) surprised.",
      ],
      tip: "Jumping in your seat = startled = surprised by something sudden and unexpected. 'I was surprised/startled by the loud bang.' The sudden loud knock caused an involuntary physical reaction.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_B_12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Anne tripped over the carpet, ___ her cup of tea all over it.",
    options: ["spilling", "turning", "crashing", "dropping"],
    answer: 0,
    solution: {
      method: "Vocabulary — liquid accident",
      steps: [
        "Context: Anne tripped → her cup of tea ended up 'all over' the carpet.",
        "'spilling' = causing liquid to flow out accidentally over a surface ✓.",
        "'Tea all over the carpet' = the tea was spilled.",
        "'turning' — 'turning tea over it' doesn't make sense in this context.",
        "'crashing' = colliding noisily — 'crashing tea' is not natural.",
        "'dropping' = letting something fall — you drop the cup, not the tea; and dropping doesn't describe the spreading.",
        "Answer: (1) spilling.",
      ],
      tip: "'Spill' = liquid accidentally flows out of a container: 'He spilled milk on his shirt', 'She spilled tea on the carpet.' 'Spilling her cup of tea all over it' = the tea went everywhere when she fell.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_B_13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "I helped my sister to ___ the decorations for her birthday party.",
    options: ["put on", "put up", "put out", "put across"],
    answer: 1,
    solution: {
      method: "Phrasal verbs — decorations",
      steps: [
        "Context: helping set up/hang decorations for a birthday party.",
        "'put up' = to hang or display decorations, posters, notices ✓.",
        "'put up decorations' = hang/display them (balloons, banners, streamers).",
        "'put on' = to wear clothing, or to start cooking/an event — 'put on decorations' is non-standard.",
        "'put out' = to place something outside, or to extinguish — wrong for decorations.",
        "'put across' = to communicate an idea — not for physical decorations.",
        "Answer: (2) put up.",
      ],
      tip: "PUT UP decorations/posters/signs = hang or display them. 'They put up Christmas lights.' 'I put up a poster on the wall.' Always use 'put up' for hanging/displaying.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_B_14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The ___ boy jumped into the pool to save the drowning cat.",
    options: ["brave", "clever", "honest", "resilient"],
    answer: 0,
    solution: {
      method: "Character trait — action evidence",
      steps: [
        "The boy jumped into a pool to save a drowning cat — a dangerous, selfless act.",
        "Someone who faces danger to help others = BRAVE ✓.",
        "'brave' = willing to do dangerous or difficult things to help ✓.",
        "'clever' = intelligent — jumping in requires courage, not cleverness.",
        "'honest' = truthful — not relevant to jumping in water.",
        "'resilient' = able to recover from difficulties — not the right trait for this action.",
        "Answer: (1) brave.",
      ],
      tip: "Match the character trait to the ACTION. Jumping into water to save someone = a BRAVE act (facing danger for others). Brave = courageous, not afraid of danger.",
    },
  },
];

// ============================================================
//  SECTION C — Visual Text MCQ (Q15–19, 5 marks)
//  Flyer: Kids' Quiz Singapore 2020
// ============================================================

const kidsQuizFlyer = `KIDS' QUIZ — Singapore 2020

Kids' Quiz is a yearly story competition for children aged 9 to 12. Children compete against one another to answer questions about children's books. The winner will represent Singapore at the World Finals in New Zealand! The champion will receive a cash prize of $5000!

"BOOK OUT!" CHALLENGE
Date: 14 November 2020, Saturday
Place: All participating libraries
Borrow four library books and take a quiz to find out if you qualify for the Kids' Quiz. All participants will receive a bookmark. The first 100 participants will also receive a magazine!

KIDS' QUIZ
Date: 22 November 2020, Sunday
Place: Bishan Library Hub
Catch the Kids' Quiz where the top scorers from each participating library of the "Book Out!" Challenge compete to become the champion! Contestants stand a chance to win book vouchers worth $500! Watch it online on kidsquiz.com.sg.

Please call 65432198 for more information about the Kids' Quiz.
*All libraries in Singapore will be participating except for Bright Hill Public Library and Sentosa Regional Library.

Organised by: Singapore Library Board    Read! Magazine
Sponsored by: Mousetrap Bookshop, My Child Magazine, BookCafe`;

export const sectionC_visual: QuestionTypeB = {
  kind: "set",
  id: "ait_eoy2020_C_visual",
  topic: "VisualText",
  passage: kidsQuizFlyer,
  questions: [
    {
      id: "ait_eoy2020_C_15",
      marks: 1,
      question: "The organiser of Kids' Quiz is ___.",
      options: ["Book Cafe", "My Child Magazine", "Mousetrap Bookshop", "Singapore Library Board"],
      answer: "Singapore Library Board",
      solution: {
        method: "Locate 'Organised by' in visual text",
        steps: [
          "The flyer states: 'Organised by: Singapore Library Board'.",
          "Answer: (4) Singapore Library Board ✓.",
          "'Book Cafe', 'My Child Magazine', 'Mousetrap Bookshop' are SPONSORS, not organisers.",
        ],
        tip: "Look for the word 'Organised by' — it directly states who organises the event. 'Organised by' ≠ 'Sponsored by'. Organiser = Singapore Library Board.",
      },
    },
    {
      id: "ait_eoy2020_C_16",
      marks: 1,
      question: "All participants of the 'Book Out!' Challenge will receive ___.",
      options: [
        "a bookmark",
        "a cash prize of $5000",
        "book vouchers worth $500",
        "a bookmark and a magazine",
      ],
      answer: "a bookmark",
      solution: {
        method: "Locate participant reward in 'Book Out!' Challenge section",
        steps: [
          "The flyer: 'All participants will receive a bookmark. The first 100 participants will also receive a magazine!'",
          "'ALL participants' → a bookmark ✓.",
          "A magazine is only for the FIRST 100 participants, not all.",
          "Cash prize of $5000 = champion of Kids' Quiz.",
          "Book vouchers worth $500 = chance to win at Kids' Quiz.",
          "Answer: (1) a bookmark.",
        ],
        tip: "Key word: 'ALL participants'. ALL get a bookmark. Only the FIRST 100 also get a magazine. Be careful not to combine both — the question asks what ALL participants receive.",
      },
    },
    {
      id: "ait_eoy2020_C_17",
      marks: 1,
      question: "Sean is taking part in the Kids' Quiz and has a question to ask. He can ___.",
      options: [
        "call 65432198",
        "visit Bishan Library Hub",
        "go to www.kidsquiz.com.sg",
        "visit Sentosa Regional Library",
      ],
      answer: "call 65432198",
      solution: {
        method: "Locate contact information for questions",
        steps: [
          "The flyer: 'Please call 65432198 for more information about the Kids' Quiz.'",
          "If Sean has a question, he should call 65432198 ✓.",
          "Bishan Library Hub = venue of Kids' Quiz, not for questions.",
          "www.kidsquiz.com.sg = for watching online, not for questions.",
          "Sentosa Regional Library = NOT participating (specifically excluded).",
          "Answer: (1) call 65432198.",
        ],
        tip: "For questions/more information: the contact number is specifically mentioned for this purpose. 'Please call [number] for more information' = that's how you ask questions.",
      },
    },
    {
      id: "ait_eoy2020_C_18",
      marks: 1,
      question: "Which of the following statements is TRUE about the Kids' Quiz?",
      options: [
        "Kids' Quiz can be watched online.",
        "It takes place once every two years.",
        "It is organised for children aged 6 to 12.",
        "The World Finals will be held in Hong Kong.",
      ],
      answer: "Kids' Quiz can be watched online.",
      solution: {
        method: "Fact-checking all options against flyer",
        steps: [
          "Option (1): 'Watch it online on kidsquiz.com.sg' ✓ — confirmed in flyer.",
          "Option (2): 'Kids' Quiz is a yearly story competition' — happens every year, NOT every two years.",
          "Option (3): 'for children aged 9 to 12' — NOT aged 6 to 12.",
          "Option (4): 'World Finals in New Zealand' — NOT Hong Kong.",
          "Answer: (1) Kids' Quiz can be watched online.",
        ],
        tip: "For 'which is TRUE' questions, verify each option against the text. One detail wrong = the whole option is wrong. 'Every two years' vs 'yearly', 'aged 6' vs 'aged 9', 'Hong Kong' vs 'New Zealand' — all wrong details.",
      },
    },
    {
      id: "ait_eoy2020_C_19",
      marks: 1,
      question: "The main aim of the flyer is to ___.",
      options: [
        "encourage reading",
        "promote the event sponsors",
        "publicise Singapore libraries",
        "inform people about Kids' Quiz",
      ],
      answer: "inform people about Kids' Quiz",
      solution: {
        method: "Identify main purpose of the flyer",
        steps: [
          "The flyer is titled 'Kids' Quiz' and provides information about the competition (dates, venues, prizes, how to join).",
          "The MAIN aim = to inform people about Kids' Quiz ✓.",
          "'Encourage reading' is a secondary purpose, but the flyer is primarily about the Kids' Quiz event.",
          "'Promote sponsors' — sponsors are listed at the bottom, not the main focus.",
          "'Publicise Singapore libraries' — libraries are venues, not the main topic.",
          "Answer: (4) inform people about Kids' Quiz.",
        ],
        tip: "For 'main aim/purpose' questions, look at the TITLE and main content. The flyer's title is 'Kids' Quiz' and all content describes the event → main aim is to inform people about the Kids' Quiz.",
      },
    },
  ],
};

// ============================================================
//  SECTION D — Grammar Cloze (Q20–27, 8 marks)
//  Passage 1: Ethan at the race (prepositions)
//  Passage 2: Birthday diary (indefinite pronouns)
// ============================================================

export const sectionD_gc1: QuestionTypeB = {
  kind: "set",
  id: "ait_eoy2020_D_gc1",
  topic: "GrammarCloze",
  passage:
    "Ethan was warming up for his race and was feeling nervous. Beads of perspiration rolled (20) ___ his forehead. Suddenly, he heard someone cheering for him (21) ___ afar. Looking over to the spectators' stand, he saw his best friend waving wildly (22) ___ him. He felt better instantly.\n\n'All competitors for the 1 hundred-metre race, please report to your lanes now,' said the announcer. Ethan walked over to his lane and got (23) ___ position. He was determined to win the race.\n\nWritten by: Nurul Murny\n\n[Word bank: A=at, B=down, C=from, D=into, E=on, F=with]",
  questions: [
    {
      id: "ait_eoy2020_D_20",
      marks: 1,
      question: "Beads of perspiration rolled (20) ___ his forehead.\n[Word bank: A=at, B=down, C=from, D=into, E=on, F=with]",
      answer: "B (down)",
      solution: {
        method: "Preposition of direction — rolling downward",
        steps: [
          "'Beads of perspiration rolled ___ his forehead' — sweat moving downward on his face.",
          "'down' = moving from top to bottom ✓. Sweat rolls DOWN the face.",
          "'on his forehead' would describe position, not movement.",
          "'from' = starting point — 'rolled from his forehead' would be incomplete.",
          "Answer: B (down).",
        ],
        tip: "'Roll down' = move from top to bottom. Tears roll DOWN cheeks. Sweat rolls DOWN foreheads. Always 'down' for downward movement along a surface.",
      },
    },
    {
      id: "ait_eoy2020_D_21",
      marks: 1,
      question: "...he heard someone cheering for him (21) ___ afar.\n[Word bank: A=at, B=down, C=from, D=into, E=on, F=with]",
      answer: "C (from)",
      solution: {
        method: "Preposition — fixed phrase 'from afar'",
        steps: [
          "'From afar' = from a distance — this is a fixed expression ✓.",
          "'Heard someone cheering FROM afar' = heard it from far away.",
          "'from afar' is an idiomatic phrase meaning 'from a great distance'.",
          "Answer: C (from).",
        ],
        tip: "'From afar' is a fixed phrase meaning 'from a long distance away'. 'I could see him from afar', 'She waved to me from afar'. Always 'from' with 'afar'.",
      },
    },
    {
      id: "ait_eoy2020_D_22",
      marks: 1,
      question: "...he saw his best friend waving wildly (22) ___ him.\n[Word bank: A=at, B=down, C=from, D=into, E=on, F=with]",
      answer: "A (at)",
      solution: {
        method: "Preposition — 'wave at someone'",
        steps: [
          "'waving wildly ___ him' — who is the wave directed at?",
          "Fixed collocation: 'wave AT someone' = to wave in someone's direction ✓.",
          "'wave at him' = wave to/toward him.",
          "'with' would need another person waving together.",
          "Answer: A (at).",
        ],
        tip: "WAVE AT someone = wave in their direction to greet or signal them. 'She waved at me from across the street.' Fixed phrase: wave AT.",
      },
    },
    {
      id: "ait_eoy2020_D_23",
      marks: 1,
      question: "Ethan walked over to his lane and got (23) ___ position.\n[Word bank: A=at, B=down, C=from, D=into, E=on, F=with]",
      answer: "D (into)",
      solution: {
        method: "Preposition — 'get into position'",
        steps: [
          "'got ___ position' = took up his starting position.",
          "Fixed phrase: 'get INTO position' = assume/adopt a stance or position ✓.",
          "'Got into position' = prepared himself by taking the correct stance.",
          "'on position' is non-standard English.",
          "Answer: D (into).",
        ],
        tip: "'Get into position' is a fixed phrase meaning to prepare by taking up the correct stance. Athletes 'get into position' at the starting line. Also: 'get into shape', 'get into trouble'.",
      },
    },
  ],
};

export const sectionD_gc2: QuestionTypeB = {
  kind: "set",
  id: "ait_eoy2020_D_gc2",
  topic: "GrammarCloze",
  passage:
    "Dear Diary,\nI just had the best birthday celebration! At first, I was upset because (24) ___ had remembered my birthday. I wanted to spend time with my friends, but (25) ___ told me that they were busy. I did not want to mention (26) ___ to them as I wanted them to remember my birthday on their own. Sadly, I headed home. Little did I expect that (27) ___ I had wished for would come true.\n\nThe moment I reached home and opened the door, my family and friends surprised me with a birthday celebration. My friends had remembered my birthday after all!\n\nWritten by: Nurul Murny\n\n[Word bank: A=anyone, B=anything, C=everyone, D=everything, E=nobody, F=someone]",
  questions: [
    {
      id: "ait_eoy2020_D_24",
      marks: 1,
      question: "At first, I was upset because (24) ___ had remembered my birthday.\n[Word bank: A=anyone, B=anything, C=everyone, D=everything, E=nobody, F=someone]",
      answer: "E (nobody)",
      solution: {
        method: "Indefinite pronouns — negative context (no person)",
        steps: [
          "The narrator was upset — this implies NO ONE remembered her birthday.",
          "'nobody' = no person → 'nobody had remembered my birthday' = no one remembered ✓.",
          "'anyone' = used in negatives with 'not': 'not anyone' — but here there's no 'not'.",
          "'everyone' = all people — if everyone remembered, she would be happy, not upset.",
          "'someone' = a person — would be positive.",
          "Answer: E (nobody).",
        ],
        tip: "NOBODY = no person (used in positive sentence structure with negative meaning). 'Nobody came' = 'No one came'. Different from 'Not anyone came' (where 'not' is separate). If she's upset, nobody remembered.",
      },
    },
    {
      id: "ait_eoy2020_D_25",
      marks: 1,
      question: "I wanted to spend time with my friends, but (25) ___ told me that they were busy.\n[Word bank: A=anyone, B=anything, C=everyone, D=everything, E=nobody, F=someone]",
      answer: "C (everyone)",
      solution: {
        method: "Indefinite pronouns — all people",
        steps: [
          "'but ___ told me that they were busy' — why couldn't she meet her friends?",
          "ALL her friends said they were busy.",
          "'everyone' = all people ✓. 'Everyone told me they were busy' = all her friends said busy.",
          "'someone' = one person — 'someone told me' implies only one person.",
          "'nobody' = no one told her — but she was told people were busy, so someone did tell her.",
          "Answer: C (everyone).",
        ],
        tip: "EVERYONE = all people. 'Everyone told me' = all of them said so. This explains why she couldn't spend time with any of them — they ALL said busy.",
      },
    },
    {
      id: "ait_eoy2020_D_26",
      marks: 1,
      question: "I did not want to mention (26) ___ to them...\n[Word bank: A=anyone, B=anything, C=everyone, D=everything, E=nobody, F=someone]",
      answer: "B (anything)",
      solution: {
        method: "Indefinite pronouns — 'not anything' in negative",
        steps: [
          "'I did NOT want to mention ___ to them' — NEGATIVE sentence.",
          "In negative sentences, use 'anything' (not 'something'): 'not mention ANYTHING' ✓.",
          "'not mention anything' = not say anything, stay silent about her feelings.",
          "'something' is for positive sentences: 'I wanted to mention something'.",
          "Answer: B (anything).",
        ],
        tip: "In NEGATIVE sentences: use ANY-words (anything, anyone, anywhere). 'I didn't say ANYTHING.' 'She didn't go ANYWHERE.' In POSITIVE sentences: use SOME-words (something, someone). 'I said SOMETHING.' 'She went SOMEWHERE.'",
      },
    },
    {
      id: "ait_eoy2020_D_27",
      marks: 1,
      question: "Little did I expect that (27) ___ I had wished for would come true.\n[Word bank: A=anyone, B=anything, C=everyone, D=everything, E=nobody, F=someone]",
      answer: "D (everything)",
      solution: {
        method: "Indefinite pronouns — all things she wished for",
        steps: [
          "'___ I had wished for would come true' — all her wishes/hopes came true.",
          "'everything' = all things ✓. 'Everything I had wished for' = all the things she hoped for.",
          "The surprise party fulfilled all her wishes (friends, celebration, togetherness).",
          "'anything' = any unspecified thing — less emphatic than 'everything'.",
          "'something' = one specific thing — too limited for this joyful context.",
          "Answer: D (everything).",
        ],
        tip: "EVERYTHING = all things (positive, emphatic). Used when all possible things are included. 'Everything I wished for came true' = all my wishes were granted. Contrast: SOMETHING (one thing), ANYTHING (any unspecified thing).",
      },
    },
  ],
};

// ============================================================
//  SECTION E — Editing for Spelling (Q28–30, 3 marks)
//  Passage: Tom helps Mrs Chua
// ============================================================

export const sectionE_editing: QuestionTypeB = {
  kind: "set",
  id: "ait_eoy2020_E_editing",
  topic: "Editing",
  passage:
    "Tom was on his way home after school. He was about to take the lift when (28)[repare] he saw that it was under repare. Letting out a loud sigh, he headed towards the (29)[neybour] staircase. That was when he spotted his neybour, Mrs Chua, struggling to carry her heavy bags of groceries up the stairs. Being kind, he offered to assist Mrs Chua. (30)[greatfull] Mrs Chua was greatfull for his help. She thanked him profusely.",
  questions: [
    {
      id: "ait_eoy2020_E_28",
      marks: 1,
      question: "He saw that it was under (28) repare.\n(Spelling error in bold — correct it.)",
      answer: "repair",
      solution: {
        method: "Spelling correction — 'under repair'",
        steps: [
          "Error: 'repare' — wrong vowel.",
          "Correct: 'repair'.",
          "The word is 're-pair' (with 'ai' vowel combination): re-pair.",
          "Fixed phrase: 'under repair' = being fixed/maintained ✓.",
          "Think: prepare → repair (both end in -pair, not -pare).",
        ],
        tip: "REPAIR = re-PAIR (like pair of shoes). The vowel combination is 'ai': repair, pair, fair, chair. 'Under repair' = being fixed. 'Repare' is wrong — it's 'repair'.",
      },
    },
    {
      id: "ait_eoy2020_E_29",
      marks: 1,
      question: "...his (29) neybour, Mrs Chua...\n(Spelling error in bold — correct it.)",
      answer: "neighbour",
      solution: {
        method: "Spelling correction — 'neighbour'",
        steps: [
          "Error: 'neybour' — wrong vowel and missing letter.",
          "Correct: 'neighbour' (British spelling) or 'neighbor' (American).",
          "In Singapore English, 'neighbour' (British) is used.",
          "Breakdown: neigh-bour. 'neigh' (like the sound a horse makes) + 'bour'.",
          "The 'ei' vowel group: neigh-bour.",
        ],
        tip: "NEIGHBOUR = neigh-bour. Remember: 'neigh' (the sound a horse makes) + 'bour'. Or think of the rule: 'i before e except after c' — but 'neigh' has 'ei' after 'n' (an exception). British spelling: neighbour.",
      },
    },
    {
      id: "ait_eoy2020_E_30",
      marks: 1,
      question: "Mrs Chua was (30) greatfull for his help.\n(Spelling error in bold — correct it.)",
      answer: "grateful",
      solution: {
        method: "Spelling correction — 'grateful'",
        steps: [
          "Error: 'greatfull' — two mistakes: 'great' instead of 'grate', and double 'l'.",
          "Correct: 'grateful' (one 'l' at the end, and 'grate-', not 'great-').",
          "Root: 'grate' (as in gratitude) + '-ful' (suffix, single 'l').",
          "Breakdown: grate-ful.",
          "Common trap: 'great' (wonderful) ≠ 'grate' (in grateful). Also: '-ful' suffix = ONE 'l'.",
        ],
        tip: "GRATEFUL = grate-FUL. The '-ful' suffix ALWAYS has ONE 'l' in English: grateful, hopeful, careful, useful, helpful. NOT 'greatfull' or 'gratefull'. Root is 'grate' (gratitude), not 'great' (wonderful).",
      },
    },
  ],
};

// ============================================================
//  SECTION F — Word Order (Q31–32, 4 marks)
// ============================================================

const sectionF_wordOrder: QuestionTypeA[] = [
  {
    kind: "single",
    id: "ait_eoy2020_F_31",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Arrange the words in the correct order and write the sentence:\nI / the Science Museum / and / to / during the holidays / went / my family",
    options: [],
    answer: 0,
    solution: {
      method: "Word order — Subject + Verb + Object + Time",
      steps: [
        "Words given: I / the Science Museum / and / to / during the holidays / went / my family",
        "Identify: Subject (I and my family), Verb (went), Destination (to the Science Museum), Time (during the holidays).",
        "Standard order: Subject + Verb + to + Place + Time.",
        "Answer: 'My family and I went to the Science Museum during the holidays.'",
        "Note: 'My family and I' is more natural than 'I and my family' — putting 'I' last is polite.",
        "Alternative accepted: 'During the holidays, my family and I went to the Science Museum.'",
      ],
      tip: "When 'I' and another person are both subjects, put the other person first: 'My family and I' (not 'I and my family'). Word order: Who + did what + where + when.",
    },
  },
  {
    kind: "single",
    id: "ait_eoy2020_F_32",
    topic: "SentenceCombining",
    marks: 2,
    question:
      "Arrange the words in the correct order and write the sentence:\nthe car park / which / in / cared for / the injured bird / Mrs Lee / she found",
    options: [],
    answer: 0,
    solution: {
      method: "Word order — relative clause sentence",
      steps: [
        "Words given: the car park / which / in / cared for / the injured bird / Mrs Lee / she found",
        "Key: 'which' is a relative pronoun — it introduces a relative clause describing 'the injured bird'.",
        "Main clause: Mrs Lee cared for the injured bird.",
        "Relative clause: which she found in the car park.",
        "Answer: 'Mrs Lee cared for the injured bird which she found in the car park.'",
        "Structure: Subject (Mrs Lee) + Verb (cared for) + Object (the injured bird) + Relative clause (which she found in the car park).",
      ],
      tip: "Relative clauses with 'which/that/who' come immediately AFTER the noun they describe. 'The injured bird WHICH she found in the car park' — 'which she found in the car park' describes 'the injured bird'.",
    },
  },
];

// ============================================================
//  SECTION G — Comprehension 1 (Q33–40, 8 marks)
//  Passage: The Star Thrower (adapted from Loren Eiseley)
// ============================================================

export const sectionG_comp: QuestionTypeB = {
  kind: "set",
  id: "ait_eoy2020_G_comp",
  topic: "ComprehensionOE",
  passage: `Mr Tan was an elderly man who would take a stroll at the beach every morning. One particular morning, a storm had just passed. When Mr Tan arrived at the beach, he found it littered with starfishes.

Mr Tan walked along the beach and watched how people were treating the starfishes. Many people were observing and poking them. Just then, a young girl caught his eye. She would occasionally bend down to pick up a starfish and throw it into the sea as she walked along the beach. Curious, Mr Tan approached the girl and greeted her, "Good morning! May I ask why you are throwing the starfishes into the sea?"

"I'm saving the starfishes that have been washed up onto the beach during the storm. They can't return to the sea by themselves," the girl answered politely.

Mr Tan replied, "Isn't that a waste of time? There are too many starfishes for you to save. I'm afraid you won't be able to make much of a difference."

Hearing that, the girl picked up another starfish and threw it as far as she could into the sea. Then, she smiled and said to Mr Tan, "Well, it made a difference to that one!"

Mr Tan thought long and hard about what the girl had said. Inspired, he joined the girl in saving the starfishes one at a time.

Adapted from The Star Thrower by Loren Eiseley`,
  questions: [
    {
      id: "ait_eoy2020_G_33",
      marks: 1,
      question:
        "Mr Tan went to the beach because he wanted to ___. [1m]\n(1) take a morning stroll\n(2) watch how people behave\n(3) chat with people at the beach\n(4) save the starfishes on the beach",
      options: [
        "take a morning stroll",
        "watch how people behave",
        "chat with people at the beach",
        "save the starfishes on the beach",
      ],
      answer: "take a morning stroll",
      solution: {
        method: "Locate reason from paragraph 1 — MCQ",
        steps: [
          "Paragraph 1: 'Mr Tan was an elderly man who would take a stroll at the beach every morning.'",
          "He went because it was his daily habit — to take a morning stroll ✓.",
          "Option (2): He watched people, but that was AFTER he arrived, not the reason he went.",
          "Option (3): He chatted with the girl, but that happened during his stroll.",
          "Option (4): He joined saving starfishes LATER — not his original reason.",
          "Answer: (1) take a morning stroll.",
        ],
        tip: "The question asks WHY he went to the beach — his original purpose. He went because he does so 'every morning' = his habit/routine = a morning stroll. What he saw/did after arriving is different from why he went.",
      },
    },
    {
      id: "ait_eoy2020_G_34",
      marks: 1,
      question:
        "Why did Mr Tan approach the girl? [1m]\n(1) He wanted to know who she was.\n(2) He wanted to join her in saving the starfishes.\n(3) He wanted to know the reason behind her actions.\n(4) He wanted to discourage her from saving the starfishes.",
      options: [
        "He wanted to know who she was.",
        "He wanted to join her in saving the starfishes.",
        "He wanted to know the reason behind her actions.",
        "He wanted to discourage her from saving the starfishes.",
      ],
      answer: "He wanted to know the reason behind her actions.",
      solution: {
        method: "Locate reason from passage",
        steps: [
          "Paragraph 2: 'Curious, Mr Tan approached the girl and greeted her, \"Good morning! May I ask why you are throwing the starfishes into the sea?\"'",
          "He was CURIOUS — he wanted to know WHY she was throwing starfishes.",
          "Option (3): 'wanted to know the reason behind her actions' ✓.",
          "Option (2): He joined LATER, after being inspired — not his initial reason for approaching.",
          "Answer: (3) He wanted to know the reason behind her actions.",
        ],
        tip: "The word 'Curious' tells us his motivation. He approached because he was curious about her actions → he wanted to know the reason. His initial reaction to saving starfishes was actually skeptical (not supportive).",
      },
    },
    {
      id: "ait_eoy2020_G_35",
      marks: 1,
      question:
        "Write 1, 2 and 3 in the blanks below to indicate the order of events that occurred in the passage. [1m]\n___ Mr Tan threw a starfish into the sea.\n___ Mr Tan reflected on what the girl had said.\n___ Mr Tan walked along the beach after a storm.",
      answer:
        "3 — Mr Tan threw a starfish into the sea.\n2 — Mr Tan reflected on what the girl had said.\n1 — Mr Tan walked along the beach after a storm.",
      solution: {
        method: "Sequencing events from passage",
        steps: [
          "Step 1: 'When Mr Tan arrived at the beach, he found it littered with starfishes.' → walked along beach after storm.",
          "Step 2: 'Mr Tan thought long and hard about what the girl had said.' → reflected on what the girl said.",
          "Step 3: 'Inspired, he joined the girl in saving the starfishes one at a time.' → implied throwing starfish.",
          "Sequence: Walk after storm (1) → Reflect on girl's words (2) → Throw/save starfish (3).",
        ],
        tip: "Follow the story chronologically: First he arrived and walked → then he thought about what the girl said → then he joined her and saved starfishes. Walking came first, reflecting second, throwing third.",
      },
    },
    {
      id: "ait_eoy2020_G_36",
      marks: 1,
      question:
        "Which word has the same meaning as 'examining'? Circle either (A) or (B). [1m]\n'Many people were observing (A) and poking (B) them.'",
      answer: "(A) observing",
      solution: {
        method: "Vocabulary — synonym for 'examining'",
        steps: [
          "'examining' = looking at carefully and closely.",
          "'observing' = watching carefully, looking at in detail ✓.",
          "'poking' = prodding with a finger/stick — physical touching, not looking.",
          "Answer: (A) observing.",
        ],
        tip: "'Observe' and 'examine' both mean to look at carefully. 'Observing the starfishes' = looking at them carefully. 'Poking' is a physical action (touching), not looking.",
      },
    },
    {
      id: "ait_eoy2020_G_37",
      marks: 1,
      question:
        "Which word in the last paragraph tells us that Mr Tan was encouraged to save the starfishes? [1m]",
      answer: "Inspired",
      solution: {
        method: "Vocabulary — identify word showing encouragement",
        steps: [
          "Last paragraph: 'Mr Tan thought long and hard about what the girl had said. Inspired, he joined the girl in saving the starfishes one at a time.'",
          "'Inspired' = motivated/encouraged to do something ✓.",
          "The girl's words inspired Mr Tan — he was moved to join her.",
          "Answer: Inspired.",
        ],
        tip: "'Inspired' = filled with motivation or encouragement to do something. 'Hearing the speech, she was inspired to study harder.' Here, the girl's action and words inspired Mr Tan to help.",
      },
    },
    {
      id: "ait_eoy2020_G_38",
      marks: 1,
      question:
        "True or False: The starfishes got stranded on the beach because of the storm.",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 3 (girl's words): 'I'm saving the starfishes that have been washed up onto the beach during the storm.'",
          "The starfishes were washed up (stranded) during/because of the storm ✓.",
          "Statement: 'got stranded on the beach because of the storm' = True ✓.",
        ],
        tip: "'Washed up onto the beach during the storm' = stranded because of the storm. True.",
      },
    },
    {
      id: "ait_eoy2020_G_39",
      marks: 1,
      question:
        "True or False: The girl was rude to Mr Tan when he asked why she was throwing starfishes into the sea.",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 3: '\"I'm saving the starfishes that have been washed up onto the beach during the storm. They can't return to the sea by themselves,\" the girl answered politely.'",
          "Key word: 'politely' — the girl was POLITE, NOT rude.",
          "Statement: 'The girl was rude' = FALSE ✓.",
        ],
        tip: "The passage explicitly says the girl 'answered POLITELY'. Politely is the opposite of rude. False.",
      },
    },
    {
      id: "ait_eoy2020_G_40",
      marks: 1,
      question:
        "True or False: Mr Tan thought that the girl was wasting her time saving the starfishes at first.",
      options: ["True", "False"],
      answer: "True",
      solution: {
        method: "True/False — verify against passage",
        steps: [
          "Paragraph 4 (Mr Tan's reply): '\"Isn't that a waste of time? There are too many starfishes for you to save. I'm afraid you won't be able to make much of a difference.\"'",
          "Mr Tan called it 'a waste of time' — he DID think she was wasting time, at first.",
          "Statement: 'Mr Tan thought she was wasting her time at first' = TRUE ✓.",
          "'At first' is important — he later changed his mind and joined her.",
        ],
        tip: "Mr Tan's exact words: 'Isn't that a waste of time?' = he thought it WAS a waste of time. 'At first' is key — he later changed his mind. True.",
      },
    },
  ],
};

// ============================================================
//  SECTION H — Comprehension 2 (Q41–45, 8 marks)
//  Passage: Ben and the stray dog
// ============================================================

export const sectionH_comp2: QuestionTypeB = {
  kind: "set",
  id: "ait_eoy2020_H_comp2",
  topic: "ComprehensionOE",
  passage: `Ben was walking through the park on his way home from school when he heard a strange sound coming from the bushes near him. Thinking that someone was playing a prank on him, he decided to investigate the source of the sound.

To his horror, he found a stray dog! He had a fear of dogs. Without hesitation, he threw a stone at the dog to get it away from him. That was a horrible mistake. The dog's eyes widened and it growled fiercely at him.

Panicking, Ben quickly took a step back to get away from the angry dog. Unfortunately, he did not notice a rock on the ground and tripped. Even though he had fallen down and was in pain, he knew he had to escape fast. However, he did not dare to move. "What should I do? The dog would only get angrier and chase me if I run," Ben thought. Desperate, he shouted for help.

Luckily, two passers-by in the park rushed to his rescue after hearing his cries. They quickly pulled the dog away from him, tied it to a tree and reported it to the Animal Rescue Centre. One of the passers-by also checked on him to make sure that he was not injured.

Ben thanked his rescuers profusely as he could have been seriously injured if not for them. He vowed not to anger any stray dogs in future. It was an important lesson learnt.

Written by: Nurul Murny`,
  questions: [
    {
      id: "ait_eoy2020_H_41",
      marks: 1,
      question: "Why did Ben want to investigate the strange sound? [1m]",
      answer:
        "Ben wanted to investigate the strange sound because he thought someone was playing a prank on him.",
      solution: {
        method: "Locate reason from paragraph 1",
        steps: [
          "Paragraph 1: 'Thinking that someone was playing a prank on him, he decided to investigate the source of the sound.'",
          "Reason: He thought someone was playing a prank on him ✓.",
          "Write in a complete sentence with 'because'.",
        ],
        tip: "The reason is stated clearly before the action: 'Thinking that someone was playing a prank' = he believed it was a prank → so he went to investigate. Use 'because' to connect the reason to the action.",
      },
    },
    {
      id: "ait_eoy2020_H_42",
      marks: 2,
      question:
        "How did Ben feel when he 'found a stray dog' in line 4? How did he react to it? [2m]",
      answer:
        "Ben felt horrified/scared/frightened when he found the stray dog because he had a fear of dogs. He reacted by throwing a stone at the dog to get it away from him.",
      solution: {
        method: "Locate emotion + reaction from paragraph 2",
        steps: [
          "Emotion: 'To his horror, he found a stray dog! He had a fear of dogs.' → Ben felt horrified / terrified / scared.",
          "Reaction: 'Without hesitation, he threw a stone at the dog to get it away from him.'",
          "1 mark for emotion, 1 mark for reaction.",
          "Emotion = horrified/terrified (had a fear of dogs).",
          "Reaction = threw a stone at the dog.",
        ],
        tip: "Two-part question: (1) feeling + (2) reaction. Clue for feeling: 'To his HORROR' and 'He had a FEAR of dogs'. Clue for reaction: 'he THREW A STONE at the dog'. Answer both parts for full marks.",
      },
    },
    {
      id: "ait_eoy2020_H_43",
      marks: 2,
      question:
        "Explain fully why Ben 'did not dare to move' in lines 9-10. [2m]",
      answer:
        "Ben did not dare to move because he was afraid that if he ran, the dog would only get angrier and chase him. He also knew he had to escape fast but did not know how to do so safely.",
      solution: {
        method: "Locate and explain reasoning from paragraph 3",
        steps: [
          "Lines 9-10: 'he did not dare to move. \"What should I do? The dog would only get angrier and chase me if I run,\" Ben thought.'",
          "Reason 1: He feared that running would make the dog angrier and cause it to chase him.",
          "Reason 2 (implied): He was also in pain from falling and could not move well.",
          "Full explanation: Moving/running would provoke the dog to get angrier and chase him.",
          "For 2 marks: state the reason AND give evidence from the passage.",
        ],
        tip: "Ben's own words tell us why: 'The dog would only get angrier and chase me if I run.' This is his direct reasoning. He was afraid that any movement would escalate the dog's aggression and trigger a chase.",
      },
    },
    {
      id: "ait_eoy2020_H_44",
      marks: 1,
      question: "Who does 'They' in line 13 refer to? [1m]",
      answer: "The two passers-by (in the park who rushed to his rescue).",
      solution: {
        method: "Pronoun reference — find antecedent",
        steps: [
          "Line 13: 'They quickly pulled the dog away from him, tied it to a tree and reported it to the Animal Rescue Centre.'",
          "Look at the sentence just before: 'two passers-by in the park rushed to his rescue after hearing his cries.'",
          "'They' = the two passers-by ✓.",
          "Answer: The two passers-by.",
        ],
        tip: "To find what 'They' refers to, look at the noun phrase JUST BEFORE it: 'two passers-by... rushed to his rescue. THEY quickly pulled...' → They = the two passers-by.",
      },
    },
    {
      id: "ait_eoy2020_H_45",
      marks: 2,
      question:
        "What was the 'important lesson learnt' for Ben in lines 17-18? Why was it important? [2m]",
      answer:
        "The important lesson Ben learnt was not to anger stray dogs / not to throw stones at stray dogs. It was important because angering a dog could put him in great danger — he could have been seriously injured if the two passers-by had not helped him.",
      solution: {
        method: "Infer the lesson + explain its importance",
        steps: [
          "Final paragraph: 'He vowed not to anger any stray dogs in future. It was an important lesson learnt.'",
          "Lesson: Not to anger stray dogs (by throwing stones or being aggressive).",
          "Why important: 'he could have been seriously injured if not for them' — he nearly got seriously hurt.",
          "1 mark for stating the lesson, 1 mark for explaining why it was important.",
        ],
        tip: "Two parts: (1) What is the lesson? → 'not to anger stray dogs' (stated directly). (2) Why important? → Because angering a dog can lead to serious injury — Ben nearly got seriously hurt before the passers-by rescued him.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT — Ai Tong EOY 2020 Paper 2
// ============================================================

export const ait_eoy2020_paper2: Question[] = [
  ...sectionA,
  ...sectionB,
  sectionC_visual,
  sectionD_gc1,
  sectionD_gc2,
  sectionE_editing,
  ...sectionF_wordOrder,
  sectionG_comp,
  sectionH_comp2,
];

export const paperMetaAIT = {
  school: "Ai Tong School",
  code: "AIT",
  year: 2020,
  exam: "End-of-Year Examination (EOY) — Paper 2",
  level: "Primary 3",
  totalMarks: 50,
  sections: [
    { name: "Section A: Grammar MCQ", questions: 8, marks: 8, topic: "GrammarMCQ" as Topic },
    { name: "Section B: Vocabulary MCQ", questions: 6, marks: 6, topic: "VocabMCQ" as Topic },
    { name: "Section C: Visual Text — Kids' Quiz", questions: 5, marks: 5, topic: "VisualText" as Topic },
    { name: "Section D: Grammar Cloze — Ethan's Race", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section D: Grammar Cloze — Birthday Diary", questions: 4, marks: 4, topic: "GrammarCloze" as Topic },
    { name: "Section E: Editing for Spelling — Tom Helps Mrs Chua", questions: 3, marks: 3, topic: "Editing" as Topic },
    { name: "Section F: Word Order", questions: 2, marks: 4, topic: "SentenceCombining" as Topic },
    { name: "Section G: Comprehension 1 — The Star Thrower", questions: 8, marks: 8, topic: "ComprehensionOE" as Topic },
    { name: "Section H: Comprehension 2 — Ben and the Stray Dog", questions: 5, marks: 8, topic: "ComprehensionOE" as Topic },
  ],
};
