// ============================================================
// CHIJ St Nicholas Girls' School (Primary) — WA2 2025 Term 2
// English Language, Primary 3
// Booklet A: 18 marks | Booklet B: 10 marks | Total: 28 marks
// Duration: 50 minutes
// Booklet A: Sec A Grammar MCQ (10) | Sec B Vocabulary MCQ (4) | Sec C Visual Text (4)
// Booklet B: Sec D Comprehension OE (10)
// ============================================================

import type {
  TypeAQuestion,
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "CHIJ St Nicholas Girls' School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2 Term 2",
  year: 2025,
  totalMarks: 28,
  timeMinutes: 50,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  BOOKLET A — SECTION A: Grammar MCQ  (Q1–Q10, 10 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "chij2025-q1",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "While Hasan __________ up the mountain, his stomach growled.",
    options: [
      "(1) is climbing",
      "(2) are climbing",
      "(3) was climbing",
      "(4) were climbing",
    ],
    answer: "3",
    solution: {
      method: "Past continuous: Hasan was in the middle of climbing when his stomach growled.",
      steps: [
        "'his stomach GROWLED' → past simple.",
        "Hasan's climbing was ONGOING at the time → past continuous.",
        "Subject: 'Hasan' → singular → WAS climbing.",
        "(3) was climbing → CORRECT.",
        "Answer: (3) was climbing.",
      ],
      tip: "Past continuous (was/were + -ing) = action in progress at a past moment. 'While Hasan WAS CLIMBING' = he was in the middle of climbing.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q2",
    topic: "GrammarMCQ",
    marks: 1,
    question: "Dan and his cousin sat __________ the river to fish.",
    options: ["(1) in", "(2) by", "(3) under", "(4) behind"],
    answer: "2",
    solution: {
      method: "Preposition of place: sitting near/beside the river to fish.",
      steps: [
        "To fish, they sat BESIDE/NEAR the river.",
        "'by' = beside, near → 'sat by the river'. CORRECT.",
        "'in' → would be in the water → WRONG for fishing from a bank.",
        "'under' → beneath the river → WRONG.",
        "'behind' → at the back of → WRONG.",
        "Answer: (2) by.",
      ],
      tip: "'Sit by the river' = sit beside/near the river. 'By' = next to. 'She sat by the window' = next to the window.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q3",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"We were looking forward to the party. __________ did you cancel it?" Pam asked.',
    options: ["(1) Why", "(2) Who", "(3) How", "(4) What"],
    answer: "1",
    solution: {
      method: "Question word: asking for the REASON why the party was cancelled.",
      steps: [
        "They were looking forward to the party → it was cancelled → Pam wants to know the REASON.",
        "'Why' = for what reason → CORRECT.",
        "'Who' → asks about a person → WRONG.",
        "'How' → asks about method → WRONG.",
        "'What' → asks about a thing → WRONG.",
        "Answer: (1) Why.",
      ],
      tip: "'Why' asks for reasons. 'Why did you cancel it?' = What is the reason you cancelled? When you want to know the reason → 'why'.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q4",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Mrs Yaz told her pupils to distribute the gifts among __________.",
    options: [
      "(1) herself",
      "(2) himself",
      "(3) ourselves",
      "(4) themselves",
    ],
    answer: "4",
    solution: {
      method: "Reflexive pronoun: 'the pupils' distributed among themselves.",
      steps: [
        "'distribute the gifts among ______' → the pupils share among the pupils themselves.",
        "Subject of distribution: 'her pupils' → third person plural → THEMSELVES.",
        "(4) themselves → CORRECT.",
        "(3) ourselves → first person plural → WRONG (not the teacher distributing).",
        "Answer: (4) themselves.",
      ],
      tip: "'Distribute among themselves' = share among the group. The pupils distribute to each other → themselves.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q5",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "She did not __________ the meeting yesterday because she was feeling unwell.",
    options: ["(1) attend", "(2) attends", "(3) attended", "(4) attending"],
    answer: "1",
    solution: {
      method: "Base form after auxiliary 'did not': did not + BASE FORM.",
      steps: [
        "'She DID NOT ______ the meeting' → after 'did not' auxiliary, use BASE FORM.",
        "(1) attend → base form → CORRECT.",
        "(3) attended → past tense → WRONG (can't use past after 'did not').",
        "Answer: (1) attend.",
      ],
      tip: "Rule: did/didn't + BASE FORM (infinitive without 'to'). 'She did not ATTEND' NOT 'she did not attended'.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q6",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My neighbour Karen lives only __________ doors away from me.",
    options: ["(1) little", "(2) much", "(3) a few", "(4) a lot of"],
    answer: "3",
    solution: {
      method: "Quantifier: 'doors' is countable plural; small number → 'a few'.",
      steps: [
        "'doors' = countable plural noun.",
        "'Only ______ doors away' → a small number of doors.",
        "'a few' = small number, countable. CORRECT.",
        "'little' → uncountable → WRONG.",
        "'much' → uncountable → WRONG.",
        "'a lot of' → large quantity → contradicts 'only'.",
        "Answer: (3) a few.",
      ],
      tip: "'A few' = a small number (countable). 'Only a few doors away' = very close (just a small number of doors). 'Only' emphasises the small number.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q7",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Peter had a cold __________ he stayed at home to rest.",
    options: ["(1) or", "(2) so", "(3) but", "(4) because"],
    answer: "2",
    solution: {
      method: "Conjunction of result: cold → stayed home. First → so → result.",
      steps: [
        "Cold → stayed home. The cold CAUSED him to stay home.",
        "'so' = as a result/therefore → 'He had a cold SO he stayed home'. CORRECT.",
        "'because' → would work but requires 'because' before the CAUSE. Here the result comes second.",
        "Structure: [cause] so [result] = correct order.",
        "Answer: (2) so.",
      ],
      tip: "[Cause] SO [result]. 'He had a cold SO he stayed home.' 'So' introduces the consequence/result.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q8",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "The boys __________ dinner by themselves every day as their parents come home late from work.",
    options: [
      "(1) prepare",
      "(2) prepares",
      "(3) prepared",
      "(4) are preparing",
    ],
    answer: "1",
    solution: {
      method: "Simple present, plural subject: 'every day' = habit; 'the boys' = plural.",
      steps: [
        "'every day' → habitual present → SIMPLE PRESENT.",
        "Subject: 'The boys' → plural → BASE FORM.",
        "(1) prepare → base form (plural present). CORRECT.",
        "(2) prepares → singular -s → WRONG.",
        "Answer: (1) prepare.",
      ],
      tip: "The boys (plural) + every day (habit) → prepare (base form, no -s). 'The boys PREPARE dinner every day.'",
    },
  },

  {
    kind: "A",
    id: "chij2025-q9",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"The old family recipe is __________. It has been passed down by your grandmother to us," Mother explained.',
    options: ["(1) his", "(2) hers", "(3) ours", "(4) theirs"],
    answer: "3",
    solution: {
      method: "Possessive pronoun: 'passed down to US' — the recipe now belongs to the family (us/we → ours).",
      steps: [
        "'passed down by your grandmother to US' → belongs to the family (the speaker + child = we/us).",
        "'ours' = belonging to us → CORRECT.",
        "'theirs' → others → WRONG (it belongs to this family).",
        "Answer: (3) ours.",
      ],
      tip: "'Ours' = belonging to us. Mother says 'passed down to US' = the family → it's OURS now.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q10",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Leah is a responsible and kind monitor. __________ traits make her a good leader.",
    options: ["(1) This", "(2) That", "(3) These", "(4) Those"],
    answer: "3",
    solution: {
      method: "Demonstrative: 'traits' = plural; traits just mentioned (near in context) → These.",
      steps: [
        "Subject: 'traits' → PLURAL.",
        "The traits just described in the previous sentence → near/recent reference.",
        "Plural + near/recent reference = THESE.",
        "(3) These → CORRECT.",
        "(4) Those → plural + far/distant → WRONG.",
        "Answer: (3) These.",
      ],
      tip: "'These traits' refers back to the traits just mentioned (responsible and kind). Referring to something just said → THESE (near).",
    },
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET A — SECTION B: Vocabulary MCQ  (Q11–Q14, 4 marks)
  // ══════════════════════════════════════════════════════

  {
    kind: "A",
    id: "chij2025-q11",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The old man in the crowd looks __________, but I am unable to remember who he is.",
    options: [
      "(1) similar",
      "(2) familiar",
      "(3) peculiar",
      "(4) particular",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: you recognise the face but can't place it.",
      steps: [
        "'unable to remember who he is' → the face looks known but can't place it.",
        "'familiar' = known/recognisable, like you've seen before → CORRECT.",
        "'similar' = alike → needs 'similar to someone', not just 'looks similar'.",
        "'peculiar' = strange/odd → WRONG (he looks recognisable, not strange).",
        "Answer: (2) familiar.",
      ],
      tip: "'Looks familiar' = looks like someone you know but can't quite remember who. Very common expression.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q12",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The bully gave the timid boy a __________ look and snatched all his pocket money.",
    options: [
      "(1) puzzled",
      "(2) menacing",
      "(3) suspicious",
      "(4) sympathetic",
    ],
    answer: "2",
    solution: {
      method: "Vocabulary: the look a bully gives before snatching money.",
      steps: [
        "A BULLY + SNATCHED money → threatening/scary look.",
        "'menacing' = suggesting harm or evil; threatening → CORRECT.",
        "'puzzled' = confused → WRONG.",
        "'sympathetic' = feeling sorry for → OPPOSITE of a bully's look.",
        "'suspicious' = doubtful → possible but 'menacing' is more fitting for a bully.",
        "Answer: (2) menacing.",
      ],
      tip: "'Menacing look' = threatening look, suggesting danger. A bully gives a menacing look before doing something harmful.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q13",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "His __________ remarks about his success made him seem arrogant.",
    options: [
      "(1) humble",
      "(2) modest",
      "(3) boastful",
      "(4) confident",
    ],
    answer: "3",
    solution: {
      method: "Vocabulary: remarks that make someone seem arrogant = boastful.",
      steps: [
        "'made him seem ARROGANT' → the remarks show off/brag.",
        "'boastful' = excessively proud and talking too much about achievements → CORRECT.",
        "'humble/modest' → OPPOSITE of arrogant.",
        "'confident' → self-assured but not necessarily arrogant.",
        "Answer: (3) boastful.",
      ],
      tip: "Boastful = bragging/showing off. Arrogant = overly proud. Boastful remarks = remarks that brag about success.",
    },
  },

  {
    kind: "A",
    id: "chij2025-q14",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Larry __________ on a solo trip around the world to explore new cultures.",
    options: ["(1) set in", "(2) set out", "(3) set down", "(4) set aside"],
    answer: "2",
    solution: {
      method: "Phrasal verb: beginning a journey = 'set out'.",
      steps: [
        "'______ on a solo trip' → started/began a journey.",
        "'set out' = start a journey → CORRECT.",
        "'set in' = (of weather/season) begin → WRONG for a trip.",
        "'set down' = put something down/write → WRONG.",
        "'set aside' = save for later → WRONG.",
        "Answer: (2) set out.",
      ],
      tip: "'Set out (on a trip)' = begin a journey. 'Set out' is the standard phrase for starting/embarking on a journey or trip.",
    },
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET A — SECTION C: Visual Text MCQ  (Q15–Q18, 4 marks)
  //  Advertisement: Young Adventurers Day Camp
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "chij2025-secC",
    topic: "VisualText",
    marks: 4,
    passageTitle: "Young Adventurers Day Camp — Advertisement",
    passageText: `
ADVERTISEMENT:
Title: YOUNG ADVENTURERS DAY CAMP
Tagline: Discover the excitement of the great outdoors at Pulau Ubin! A perfect day for boys and girls to explore, learn and have fun!

Age Group: 9 to 14 years
Organiser: Aspen Youth Outdoor Club
Facilitator: Paul Johans
Date: 6 September 2025 (Saturday)
Time: 9 a.m. to 4 p.m.
Reporting Venue: Aspen Community Club

Member: $200
Non-member: $280

Early Bird Discount: Register by 31 May to enjoy $20 off! (includes snacks and lunch)

Activities: kayaking, fishing, wilderness skills

Register Now! Scan the QR code below to register!

For more enquiries:
• Contact 9012 3567 (Mr Adi)
• Visit www.adventureoutdoorforyouth.com
    `.trim(),
    questions: [
      {
        qid: "chij2025-q15",
        question:
          "The camp is organised by __________.\n(1) Mr Adi\n(2) Paul Johans\n(3) Aspen Community Club\n(4) Aspen Youth Outdoor Club",
        options: [
          "(1) Mr Adi",
          "(2) Paul Johans",
          "(3) Aspen Community Club",
          "(4) Aspen Youth Outdoor Club",
        ],
        answer: "4",
        solution: {
          method: "Literal reading: 'Organiser: Aspen Youth Outdoor Club'.",
          steps: [
            "Ad states: 'Organiser: ASPEN YOUTH OUTDOOR CLUB'.",
            "(4) Aspen Youth Outdoor Club → CORRECT.",
            "Mr Adi = contact for enquiries. Paul Johans = facilitator. Aspen Community Club = reporting venue.",
            "Answer: (4) Aspen Youth Outdoor Club.",
          ],
          tip: "Organiser ≠ facilitator ≠ venue. 'Organiser: Aspen Youth Outdoor Club' is clearly stated.",
        },
      },
      {
        qid: "chij2025-q16",
        question:
          "The main purpose of this advertisement is to get youths to __________.\n(1) sign up for the camp\n(2) buy camping equipment\n(3) visit Aspen Community Club\n(4) become a member of Aspen Youth Outdoor Club",
        options: [
          "(1) sign up for the camp",
          "(2) buy camping equipment",
          "(3) visit Aspen Community Club",
          "(4) become a member of Aspen Youth Outdoor Club",
        ],
        answer: "1",
        solution: {
          method: "Main purpose of advertisement: the call to action.",
          steps: [
            "The ad says 'REGISTER NOW!' → the main purpose is to get people to register/sign up.",
            "(1) sign up for the camp → CORRECT.",
            "(3) visit club → that's the reporting venue, not the purpose.",
            "(4) become a member → mentioned for pricing but not the main purpose.",
            "Answer: (1) sign up for the camp.",
          ],
          tip: "'Register Now!' = the main call to action. The ad's purpose is to get youths to sign up/register for the camp.",
        },
      },
      {
        qid: "chij2025-q17",
        question:
          "If Mr Lum wants to sign up his two children for the camp, he needs to __________.\n(1) call Mr Adi\n(2) visit the website\n(3) visit the youth club\n(4) scan the given QR code",
        options: [
          "(1) call Mr Adi",
          "(2) visit the website",
          "(3) visit the youth club",
          "(4) scan the given QR code",
        ],
        answer: "4",
        solution: {
          method: "Literal reading: how to register.",
          steps: [
            "Ad: 'SCAN THE QR CODE below to register!'",
            "(4) scan the given QR code → registration method. CORRECT.",
            "(1) call Mr Adi → for ENQUIRIES only, not registration.",
            "(2) visit website → for enquiries, not explicitly for registration.",
            "Answer: (4) scan the given QR code.",
          ],
          tip: "Registration = scan QR code. Contact (call/website) = enquiries only. Distinguish registration from enquiries.",
        },
      },
      {
        qid: "chij2025-q18",
        question:
          "Which of the following statements is true?\n(1) The camp is held at Pulau Ubin.\n(2) The camp is held on a weekday.\n(3) All participants will get a discount upon registration.\n(4) Nine-year-old Peter and his younger sister can join the camp.",
        options: [
          "(1) The camp is held at Pulau Ubin.",
          "(2) The camp is held on a weekday.",
          "(3) All participants will get a discount upon registration.",
          "(4) Nine-year-old Peter and his younger sister can join the camp.",
        ],
        answer: "1",
        solution: {
          method: "Evaluate each statement against the advertisement.",
          steps: [
            "(1) Held at Pulau Ubin: Ad says 'Discover…at PULAU UBIN!' The camp ACTIVITIES are at Pulau Ubin. Reporting venue = Aspen Community Club. The camp is held at/involves Pulau Ubin. TRUE.",
            "(2) Held on a weekday: '6 September 2025 (SATURDAY)' → Saturday is a WEEKEND. FALSE.",
            "(3) All participants get a discount: Only those who register by 31 May get $20 off. Not everyone gets a discount. FALSE.",
            "(4) Peter (9) and younger sister: Age group = 9 to 14. Peter (9) qualifies but his YOUNGER SISTER (under 9) does NOT. FALSE.",
            "Answer: (1).",
          ],
          tip: "(1) The activities are at Pulau Ubin (as stated in the tagline). (2) Saturday = weekend. (3) Only early birds get discount. (4) 'Younger' = under 9 = outside age group.",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════
  //  BOOKLET B — SECTION D: Comprehension  (Q19–Q27, 10 marks)
  //  Passage: Florence Nightingale
  //  Adapted from 'Florence Nightingale' by Maria Isabel Sanchez Vegara
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "chij2025-secD",
    topic: "ComprehensionOE",
    marks: 10,
    passageTitle: "Florence Nightingale (adapted from 'Florence Nightingale' by Maria Isabel Sanchez Vegara)",
    passageText:
      "Florence Nightingale walked quietly through the dimly lit corridor. Injured soldiers were treated at the hospital. She could hear the faint sounds of coughing. Pausing by a bed, she looked at a young soldier whose face was pale with fever.\n\n'Are you in pain?' she asked gently, her voice soft yet firm.\n\nThe soldier nodded weakly. 'Yes, ma'am. I don't feel well.'\n\nFlorence smiled reassuringly and said, 'Don't worry. You'll recover soon.'\n\nShe reached for a clean cloth to wipe his forehead, noticing the grimy state of the room. 'This place is filthy,' she muttered to herself.\n\nLater that evening, Florence met with her hardworking fellow nurses. 'Cleanliness is key to saving lives,' she said passionately.\n\n'But Florence, we need more cleaning supplies,' one of the nurses replied, concerned.\n\n'We'll make do,' Florence said with determination. 'We will use what we have to help these soldiers.'\n\nUpon hearing that, the nurses mumbled amongst themselves. Some raised their eyebrows while others shook their heads.\n\n'We don't have enough supplies to help the soldiers,' Nurse Lily said, unconvinced.\n\nHowever, Nurse Lucy said, 'Florence is changing everything, one patient at a time.' She trusted Florence. Indeed, Florence Nightingale changed the future of nursing forever.",
    questions: [
      {
        qid: "chij2025-q19",
        question:
          "When Florence Nightingale saw the young soldier, she first __________. Tick one statement. [1m]\n☐ comforted him\n☐ checked on him\n☐ wiped his forehead",
        options: ["comforted him", "checked on him", "wiped his forehead"],
        answer: "checked on him",
        solution: {
          method: "Sequence comprehension: what was the FIRST thing Florence did?",
          steps: [
            "Paragraph 1: She paused by a bed and 'looked at a young soldier' → CHECKED ON him.",
            "She then asked 'Are you in pain?' → confirmed checking on him.",
            "She wiped his forehead LATER (paragraph 5).",
            "Answer: checked on him.",
          ],
          tip: "Sequence: first she CHECKED on him (looked at him, asked about pain) → THEN she wiped his forehead. 'Checked on him' = the first action.",
        },
      },
      {
        qid: "chij2025-q20",
        question:
          "During the meeting, Florence's main message for her nurses was that __________. Tick your chosen answer. [1m]\n☐ the hospital was dirty\n☐ cleanliness was key to saving lives\n☐ more cleaning supplies were needed for the hospital",
        options: [
          "the hospital was dirty",
          "cleanliness was key to saving lives",
          "more cleaning supplies were needed for the hospital",
        ],
        answer: "cleanliness was key to saving lives",
        solution: {
          method: "Literal comprehension: Florence's direct quote at the meeting.",
          steps: [
            "Paragraph 6: '\"CLEANLINESS IS KEY TO SAVING LIVES,\" she said passionately.'",
            "This was her MAIN message — stated directly.",
            "The hospital being dirty = observation. More supplies = nurses' concern, not Florence's message.",
            "Answer: cleanliness was key to saving lives.",
          ],
          tip: "Florence's main message = direct quote: 'Cleanliness is key to saving lives.' That's exactly what she said at the meeting.",
        },
      },
      {
        qid: "chij2025-q21",
        question: "TRUE or FALSE: Florence was coughing badly. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: who was coughing?",
          steps: [
            "Paragraph 1: 'She could hear the FAINT SOUNDS OF COUGHING' → soldiers/patients in the hospital were coughing.",
            "Florence heard the coughing — she was not the one coughing.",
            "Statement: 'Florence was coughing' → FALSE.",
            "Answer: False.",
          ],
          tip: "Florence HEARD coughing — she didn't cough. The coughing came from the injured soldiers in the corridor.",
        },
      },
      {
        qid: "chij2025-q22",
        question: "TRUE or FALSE: The soldiers at the hospital were injured. [1m]",
        answer: "True",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'INJURED SOLDIERS were treated at the hospital.'",
            "Statement: 'soldiers were injured' → TRUE.",
            "Answer: True.",
          ],
          tip: "Directly stated in paragraph 1: 'Injured soldiers were treated at the hospital.'",
        },
      },
      {
        qid: "chij2025-q23",
        question: "TRUE or FALSE: Florence told her nurses to buy more supplies. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: what Florence told the nurses.",
          steps: [
            "Paragraph 8: '\"We'll make do,\" Florence said. \"We will use WHAT WE HAVE to help these soldiers.\"'",
            "Florence said to use what they ALREADY HAVE — she did NOT tell them to buy more supplies.",
            "The nurses said they needed more supplies, but Florence didn't ask them to buy.",
            "Answer: False.",
          ],
          tip: "Florence said 'We'll make do with what we have' = use existing supplies. She did NOT say 'buy more supplies'.",
        },
      },
      {
        qid: "chij2025-q24",
        question: "TRUE or FALSE: Florence worked alone to save the soldiers. [1m]",
        answer: "False",
        solution: {
          method: "Literal comprehension: did Florence work alone?",
          steps: [
            "Paragraph 6: 'Florence met with her HARDWORKING FELLOW NURSES.' → she worked with nurses.",
            "She worked WITH fellow nurses, NOT alone.",
            "Statement: 'worked alone' → FALSE.",
            "Answer: False.",
          ],
          tip: "Florence worked with fellow nurses. 'Fellow nurses' = her colleagues. She was the leader but not alone.",
        },
      },
      {
        qid: "chij2025-q25",
        question: "TRUE or FALSE: The nurses did not want to help the soldiers. [1m]",
        answer: "False",
        solution: {
          method: "Inferential comprehension: did the nurses want to help soldiers?",
          steps: [
            "The nurses' concern was LACK OF SUPPLIES, not unwillingness.",
            "Paragraph 10: 'We don't have ENOUGH SUPPLIES to help the soldiers' → they WANTED to help but felt limited.",
            "They mumbled/shook heads because they doubted it was POSSIBLE, not because they didn't want to help.",
            "Statement: 'did not want to help' → FALSE.",
            "Answer: False.",
          ],
          tip: "The nurses wanted to help but were concerned about INSUFFICIENT SUPPLIES. Doubt ≠ unwillingness. They still went along with Florence.",
        },
      },
      {
        qid: "chij2025-q26",
        question:
          "Which word has the same meaning as 'believed in'? Circle either (A) or (B). [1m]\n\n'She trusted Florence. Indeed, Florence Nightingale changed the future of nursing forever.'\n        (A)                                            (B)",
        options: ["(A) trusted", "(B) changed"],
        answer: "A",
        solution: {
          method: "Vocabulary synonym: 'believed in' = had faith/trust in.",
          steps: [
            "'believed in' = had faith in someone, trusted them.",
            "(A) 'trusted' = had faith/confidence in → SYNONYM. CORRECT.",
            "(B) 'changed' = made different → NOT a synonym of 'believed in'.",
            "Answer: (A) trusted.",
          ],
          tip: "Trust = believe in someone. 'She trusted Florence' = 'She believed in Florence' = she had faith in Florence.",
        },
      },
      {
        qid: "chij2025-q27",
        question:
          "Based on lines 1 to 8, tick two words that can be used to describe Florence Nightingale. [2m]\n☐ quiet  ☐ brave  ☐ caring  ☐ determined",
        options: ["quiet", "brave", "caring", "determined"],
        answer: "quiet and caring",
        solution: {
          method: "Character description from lines 1-8.",
          steps: [
            "Line 1: 'Florence Nightingale WALKED QUIETLY' → quiet. CORRECT.",
            "Lines 4-5: She smiled reassuringly, comforted the soldier → CARING. CORRECT.",
            "Line 8: 'We'll make do' → shows determination but this is lines 8+.",
            "Answer key: quiet and caring.",
            "Answer: quiet and caring.",
          ],
          tip: "From lines 1-8 only: (1) 'walked quietly' → quiet. (2) She comforted the soldier and smiled reassuringly → caring. Both supported by the text.",
        },
      },
    ],
  },
];

export const chij2025Paper = { meta, questions };
export default chij2025Paper;
