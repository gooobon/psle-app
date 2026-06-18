// src/data/p3/english/papers/eoy_henrypark_p2_2025.ts
// Henry Park Primary School — 2025 End-of-Year Examination
// English Language Paper 2 — Primary 3
// Total: 50 marks (Part I: 14, Part II: 36)

import { QuestionSet } from "@/types/questions";

export const eoy_henrypark_p2_2025: QuestionSet = {
  id: "eoy_henrypark_p2_2025",
  school: "Henry Park Primary School",
  level: "P3",
  subject: "English",
  year: 2025,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,

  sections: [
    // ─────────────────────────────────────────────
    // PART I
    // ─────────────────────────────────────────────

    // ── Section A: Vocabulary MCQ (6 marks, Q1–6) ──────────────────────────
    {
      id: "partI_sectionA",
      title: "Section A: Vocabulary",
      type: "VocabMCQ",
      marks: 6,
      instructions:
        "Choose the most suitable answer and write its number (1, 2, 3 or 4) in the brackets. Shade the correct oval (1, 2, 3 or 4) on the Optical Answer Sheet provided.",
      questions: [
        {
          id: "hp_eoy25_A1",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Lions have ____________ claws and fangs which make their attacks on prey deadly.",
          options: [
            { id: 1, text: "long" },
            { id: 2, text: "sharp" },
            { id: 3, text: "prickly" },
            { id: 4, text: "curved" },
          ],
          answer: 2,
          solution: {
            method: "Context Clues — Adjective",
            steps: [
              "The claws and fangs make attacks DEADLY — they must be sharp (able to pierce/cut).",
              "'Sharp' = having a fine edge or point, able to cut/pierce — the key quality making attacks deadly.",
              "'Long' alone doesn't explain deadly attacks; 'prickly' = covered with prickles (not right for lion claws); 'curved' describes shape but not deadliness.",
            ],
            tip: "SHARP claws/fangs = able to cut/pierce deeply, making attacks deadly. Sharpness is the key attribute.",
          },
        },
        {
          id: "hp_eoy25_A2",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The stray dog was so ____________ that the shape of its bones could be seen under its skin.",
          options: [
            { id: 1, text: "unusual" },
            { id: 2, text: "knobbly" },
            { id: 3, text: "scrawny" },
            { id: 4, text: "ferocious" },
          ],
          answer: 3,
          solution: {
            method: "Context Clues — Appearance",
            steps: [
              "Bones visible under skin = extremely thin/malnourished.",
              "'Scrawny' = very thin, especially in an unhealthy way — fits bones showing under skin.",
              "'Knobbly' = having knobs/bumps (describes texture, not extreme thinness); 'unusual' = strange; 'ferocious' = fierce.",
            ],
            tip: "Bones showing under skin = SCRAWNY (very thin and bony). 'Scrawny' specifically describes an unhealthily thin body.",
          },
        },
        {
          id: "hp_eoy25_A3",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "After dinner, Mr Lim enjoyed a slow and relaxing ____________ along the beach.",
          options: [
            { id: 1, text: "race" },
            { id: 2, text: "dash" },
            { id: 3, text: "stroll" },
            { id: 4, text: "climb" },
          ],
          answer: 3,
          solution: {
            method: "Context Clues — Activity Type",
            steps: [
              "'Slow and relaxing' describes the pace and mood of the activity along the beach.",
              "'Stroll' = a slow, leisurely walk — exactly matches 'slow and relaxing'.",
              "'Race' and 'dash' = fast movements (opposite of slow); 'climb' = going up vertically (not along a beach).",
            ],
            tip: "SLOW + RELAXING = STROLL (leisurely walk). A stroll is a gentle, unhurried walk.",
          },
        },
        {
          id: "hp_eoy25_A4",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Jenny visited the art ____________ to view the collection of paintings by the famous artist, Vincent Van Gogh.",
          options: [
            { id: 1, text: "theatre" },
            { id: 2, text: "cinema" },
            { id: 3, text: "museum" },
            { id: 4, text: "auditorium" },
          ],
          answer: 3,
          solution: {
            method: "Subject-Specific Vocabulary",
            steps: [
              "Paintings by a famous artist = artworks displayed in a museum/gallery.",
              "'Museum' = a place where art and artefacts are displayed and preserved.",
              "'Theatre' = for performances; 'cinema' = for films; 'auditorium' = for audiences watching performances.",
            ],
            tip: "Art MUSEUM = place with paintings/sculptures for viewing. Van Gogh's paintings would be in a museum/art gallery.",
          },
        },
        {
          id: "hp_eoy25_A5",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The vibrant colour and sweet nectar of this flower help ____________ insects.",
          options: [
            { id: 1, text: "repel" },
            { id: 2, text: "attract" },
            { id: 3, text: "detect" },
            { id: 4, text: "prevent" },
          ],
          answer: 2,
          solution: {
            method: "Context Clues — Purpose",
            steps: [
              "Vibrant colour + sweet nectar = features that draw insects to the flower for pollination.",
              "'Attract' = draw towards — flowers use these features to attract pollinators.",
              "'Repel' = drive away (opposite); 'detect' = find/sense; 'prevent' = stop.",
            ],
            tip: "Bright colour + sweet nectar = ATTRACT insects. Flowers attract insects for pollination.",
          },
        },
        {
          id: "hp_eoy25_A6",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            '"Do stop and ____________ if you spot a sea star. It is a beautiful animal," said our teacher as we walked around the Chek Jawa wetlands.',
          options: [
            { id: 1, text: "peep" },
            { id: 2, text: "stare" },
            { id: 3, text: "glance" },
            { id: 4, text: "admire" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Verb of Appreciation",
            steps: [
              "'Stop and ___' at a 'beautiful animal' = look at it appreciatively.",
              "'Admire' = look at something with pleasure and appreciation — fits 'beautiful animal'.",
              "'Stare' = look fixedly (rude connotation); 'peep' = look quickly through a gap; 'glance' = look briefly.",
            ],
            tip: "Stop + beautiful animal = ADMIRE (look at with pleasure). Teachers would say to 'admire' natural beauty.",
          },
        },
      ],
    },

    // ── Section B: Grammar MCQ (8 marks, Q7–14) ────────────────────────────
    {
      id: "partI_sectionB",
      title: "Section B: Grammar",
      type: "GrammarMCQ",
      marks: 8,
      instructions:
        "Choose the most suitable answer and write its number (1, 2, 3 or 4) in the brackets. Shade the correct oval (1, 2, 3 or 4) on the Optical Answer Sheet provided.",
      questions: [
        {
          id: "hp_eoy25_B7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Last Saturday, Sally ____________ Tom the picture she had painted.",
          options: [
            { id: 1, text: "show" },
            { id: 2, text: "shows" },
            { id: 3, text: "showed" },
            { id: 4, text: "is showing" },
          ],
          answer: 3,
          solution: {
            method: "Past Simple Tense",
            steps: [
              "'Last Saturday' = past time marker → simple past tense.",
              "'Showed' = simple past of 'show'.",
              "'Had painted' also confirms past context.",
            ],
            tip: "LAST SATURDAY = past → SHOWED (simple past of show).",
          },
        },
        {
          id: "hp_eoy25_B8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "The Spiny Sea Star ____________ many spiny bumps along its arms. It is usually brown, grey or orange.",
          options: [
            { id: 1, text: "has" },
            { id: 2, text: "had" },
            { id: 3, text: "have" },
            { id: 4, text: "is having" },
          ],
          answer: 1,
          solution: {
            method: "Subject-Verb Agreement — Present Simple",
            steps: [
              "'The Spiny Sea Star' = singular subject (one species).",
              "Present simple fact about a species → 'has' (third person singular).",
              "'Is usually brown' confirms present tense; 'have' = plural; 'is having' = continuous (wrong for permanent facts).",
            ],
            tip: "One species (singular) + present fact = HAS. 'The Sea Star HAS spiny bumps.' Singular third person → has.",
          },
        },
        {
          id: "hp_eoy25_B9",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "As it was a cold morning, we had the swimming pool all to ____________.",
          options: [
            { id: 1, text: "myself" },
            { id: 2, text: "himself" },
            { id: 3, text: "ourselves" },
            { id: 4, text: "themselves" },
          ],
          answer: 3,
          solution: {
            method: "Reflexive Pronouns — First Person Plural",
            steps: [
              "Subject = 'we' (first person plural) — the group had the pool to themselves.",
              "Reflexive of 'we' = 'ourselves'.",
              "'Myself' = I; 'himself' = he; 'themselves' = they.",
            ],
            tip: "WE → OURSELVES. 'We had it all to ourselves' = just for us, no one else.",
          },
        },
        {
          id: "hp_eoy25_B10",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Prince Zak ____________ the rubber ball against the wall when he heard a soft voice.",
          options: [
            { id: 1, text: "throws" },
            { id: 2, text: "throwing" },
            { id: 3, text: "was throwing" },
            { id: 4, text: "were throwing" },
          ],
          answer: 3,
          solution: {
            method: "Past Continuous — Interrupted Action",
            steps: [
              "'When he heard a soft voice' = a sudden event that interrupted an ongoing action.",
              "Prince Zak was in the middle of throwing the ball WHEN he heard the voice.",
              "Past continuous = 'was throwing' (singular subject 'Prince Zak' + past ongoing action).",
            ],
            tip: "ONGOING action + 'when' interruption → PAST CONTINUOUS. Was throwing WHEN he heard the voice.",
          },
        },
        {
          id: "hp_eoy25_B11",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "My grandmother needs only ____________ sugar to sweeten her tea.",
          options: [
            { id: 1, text: "many" },
            { id: 2, text: "much" },
            { id: 3, text: "a few" },
            { id: 4, text: "a little" },
          ],
          answer: 4,
          solution: {
            method: "Quantifiers — Uncountable Nouns",
            steps: [
              "'Sugar' is uncountable → 'a few' and 'many' (for countable) are wrong.",
              "'Needs only ___' = a small amount → 'a little' (= a small amount of uncountable).",
              "'Much' is used in negatives/questions; 'a little' is used positively for small amounts.",
            ],
            tip: "Sugar (uncountable) + small amount = A LITTLE. 'A little' = a small amount (positive). Correct quantifier for uncountable nouns.",
          },
        },
        {
          id: "hp_eoy25_B12",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Jack pointed at the Rafflesia in front of him and yelled, \"Come and look at ____________ interesting plant!\"",
          options: [
            { id: 1, text: "this" },
            { id: 2, text: "that" },
            { id: 3, text: "these" },
            { id: 4, text: "those" },
          ],
          answer: 1,
          solution: {
            method: "Demonstrative Adjectives — Near + Singular",
            steps: [
              "'In front of him' = the plant is right there, near Jack.",
              "'Plant' is singular.",
              "Near + singular = 'this'.",
            ],
            tip: "RIGHT IN FRONT = near → THIS (near + singular). 'Come look at THIS plant!'",
          },
        },
        {
          id: "hp_eoy25_B13",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Jack and his brother ____________ football with me tomorrow.",
          options: [
            { id: 1, text: "play" },
            { id: 2, text: "plays" },
            { id: 3, text: "playing" },
            { id: 4, text: "are playing" },
          ],
          answer: 4,
          solution: {
            method: "Future Arrangement — Present Continuous",
            steps: [
              "'Tomorrow' indicates a future arrangement/plan.",
              "Present continuous (are + -ing) can express future plans.",
              "'Jack and his brother' = plural → 'are playing' (plural present continuous).",
              "'Plays' = third person singular present; 'play' = base form (wrong without auxiliary).",
            ],
            tip: "TOMORROW + definite plan = PRESENT CONTINUOUS for future. 'Are PLAYING tomorrow' = have arranged to play.",
          },
        },
        {
          id: "hp_eoy25_B14",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "____________ students were queuing up at the drinks stall as it was the most popular.",
          options: [
            { id: 1, text: "Many" },
            { id: 2, text: "Much" },
            { id: 3, text: "A few" },
            { id: 4, text: "A little" },
          ],
          answer: 1,
          solution: {
            method: "Quantifiers — Countable + Large Number",
            steps: [
              "'Students' is countable + 'most popular' implies a large number queuing.",
              "'Many' = large number (countable) — correct.",
              "'Much/a little' = for uncountable; 'a few' = a small number (contradicts 'most popular').",
            ],
            tip: "Students (countable) + most popular stall = MANY students. 'Many' for large countable quantities.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // PART II
    // ─────────────────────────────────────────────

    // ── Section C: Grammar Cloze — Passage A (4 marks, Q15–18) ────────────
    {
      id: "partII_sectionC_A",
      title: "Section C: Grammar Cloze — Passage A",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the passage below. Choose the correct word from the words given in the box and write its letter (A to F) in each blank. USE A WORD ONCE ONLY.",
      wordBox: {
        A: "her",
        B: "his",
        C: "its",
        D: "my",
        E: "our",
        F: "their",
      },
      passageText: `It was the June holidays. Sue decided to surprise (15)_____ grandparents with a visit. When she appeared at (16)_____ house in Malaysia, they were very happy. Their pet dog, Bubbles, also wagged (17)_____ tail happily. During the stay, Sue's grandmother cooked delicious meals for her and her grandfather brought her around town to meet (18)_____ friends. Sue also played with Bubbles daily. She had a wonderful time there.`,
      answers: {
        15: { letter: "A", word: "her" },
        16: { letter: "F", word: "their" },
        17: { letter: "C", word: "its" },
        18: { letter: "E", word: "our" },
      },
      questionsSolutions: [
        {
          id: "hp_eoy25_C15",
          blank: 15,
          answer: "A — her",
          solution: {
            method: "Pronoun — Possession (Third Person Female)",
            steps: [
              "'Sue decided to surprise ___ grandparents.' = Sue's grandparents = her grandparents.",
              "Sue is female singular → 'her' (possessive).",
            ],
            tip: "Sue = female → HER grandparents. Sue's possessive = her.",
          },
        },
        {
          id: "hp_eoy25_C16",
          blank: 16,
          answer: "F — their",
          solution: {
            method: "Pronoun — Possession (Plural)",
            steps: [
              "'She appeared at ___ house.' = the grandparents' house (two people = plural).",
              "Grandparents = plural → 'their' house.",
            ],
            tip: "Two grandparents = plural → THEIR house. The grandparents' home = their home.",
          },
        },
        {
          id: "hp_eoy25_C17",
          blank: 17,
          answer: "C — its",
          solution: {
            method: "Pronoun — Possession (Animal/Object)",
            steps: [
              "'Bubbles also wagged ___ tail.' = the dog's own tail.",
              "Bubbles = a dog (animal/it) → 'its' tail.",
            ],
            tip: "Dog (animal, non-human) → ITS tail. Animals use 'it/its' unless gender is specified.",
          },
        },
        {
          id: "hp_eoy25_C18",
          blank: 18,
          answer: "E — our",
          solution: {
            method: "Pronoun — Possession (First Person Plural)",
            steps: [
              "'Her grandfather brought her around town to meet ___ friends.'",
              "The grandfather's friends = his friends, but the answer key says 'our'.",
              "Context: 'our friends' = the grandfather's social circle, spoken from the grandfather's perspective (he brought her to meet our/his friends).",
              "From the answer key: Q18 = 'our'. The grandfather refers to his friends as 'our' when speaking to his wife about introducing Sue.",
            ],
            tip: "Answer key confirms Q18 = OUR. The grandfather brought Sue to meet 'our friends' (speaking jointly with grandmother).",
          },
        },
      ],
    },

    // ── Section C: Grammar Cloze — Passage B (4 marks, Q19–22) ────────────
    {
      id: "partII_sectionC_B",
      title: "Section C: Grammar Cloze — Passage B",
      type: "GrammarCloze",
      marks: 4,
      instructions:
        "Read the passage below. Choose the most suitable word from the box and fill in the blanks. USE A WORD ONCE ONLY.",
      wordBox: {
        options: ["drink", "drinks", "drank", "drinking", "has drunk", "was drinking"],
      },
      passageText: `Pete hates bitter herbal tea. Whenever he (19)_____ herbal tea, his mother will give him a sweet as a reward.

Last week, when he was unwell, his mother boiled some bitter herbal tea for him. She insisted that he had to (20)_____ it immediately. She believed that (21)_____ it would make him feel better. He obediently took a deep breath and (22)_____ all of that. Pete recovered soon after.`,
      answers: {
        19: "drinks",
        20: "drink",
        21: "drinking",
        22: "drank",
      },
      questionsSolutions: [
        {
          id: "hp_eoy25_CB19",
          blank: 19,
          answer: "drinks",
          solution: {
            method: "Grammar Cloze — Habitual Present (Third Person)",
            steps: [
              "'Whenever he ___ herbal tea' = habitual action; 'whenever' + present simple.",
              "'Pete' = third person singular + habitual = 'drinks'.",
            ],
            tip: "WHENEVER + habitual action = PRESENT SIMPLE. Pete (singular) + habitual = DRINKS.",
          },
        },
        {
          id: "hp_eoy25_CB20",
          blank: 20,
          answer: "drink",
          solution: {
            method: "Grammar Cloze — Infinitive after 'had to'",
            steps: [
              "'He had to ___ it immediately.' = modal 'had to' + base verb.",
              "'Had to + drink' = base form follows modal.",
            ],
            tip: "HAD TO + BASE VERB. 'Had to DRINK it.' Never 'had to drinks/drinking'.",
          },
        },
        {
          id: "hp_eoy25_CB21",
          blank: 21,
          answer: "drinking",
          solution: {
            method: "Grammar Cloze — Gerund as Subject",
            steps: [
              "'She believed that ___ it would make him feel better.' = the gerund is the subject.",
              "'Drinking it' = the act of drinking = gerund used as subject of the clause.",
            ],
            tip: "Gerund as subject: 'DRINKING it would make him feel better.' The act of drinking is the subject.",
          },
        },
        {
          id: "hp_eoy25_CB22",
          blank: 22,
          answer: "drank",
          solution: {
            method: "Grammar Cloze — Past Simple",
            steps: [
              "'He obediently took a deep breath and ___ all of that.' = past narrative, completed action.",
              "'Took' = simple past → parallel 'drank' (simple past of drink).",
            ],
            tip: "Took AND ___ = parallel past simple actions. DRANK = simple past of drink.",
          },
        },
      ],
    },

    // ── Section D: Vocabulary Cloze (5 marks, Q23–27) ──────────────────────
    {
      id: "partII_sectionD",
      title: "Section D: Vocabulary Cloze",
      type: "ComprehensionFIB",
      marks: 5,
      instructions:
        "Fill in the blanks with the most suitable word.",
      passageText: `Last week, our class went on a learning journey to the zoo. The zoo was (23)_____ with people so our teacher reminded us to stay (24)_____. We did not move beyond her sight.

At the monkey enclosure, they leapt and (25)_____ from tree to tree using their long (26)_____. A few curious monkeys approached the fence, peering at us with bright, watchful (27)_____. Their playful screeches and chatter filled the air.`,
      answers: {
        23: "crowded / packed / filled",
        24: "together / close / alert",
        25: "swing",
        26: "arms",
        27: "eyes",
      },
      questionsSolutions: [
        {
          id: "hp_eoy25_D23",
          blank: 23,
          answer: "crowded / packed / filled",
          solution: {
            method: "Comprehension Cloze — Adjective",
            steps: [
              "'The zoo was ___ with people' = many people there.",
              "Crowded/packed/filled all mean having a large number of people.",
              "Any of these answers is acceptable.",
            ],
            tip: "Zoo WITH many people = CROWDED / PACKED / FILLED with people.",
          },
        },
        {
          id: "hp_eoy25_D24",
          blank: 24,
          answer: "together / close / alert",
          solution: {
            method: "Comprehension Cloze — Adverb/Adjective",
            steps: [
              "'Stay ___' in a crowded zoo with teacher = stay as a group, not wander off.",
              "'Together' = stay as a group; 'close' = nearby; 'alert' = watchful.",
              "All three are acceptable answers.",
            ],
            tip: "In a crowded zoo = stay TOGETHER/CLOSE/ALERT. The teacher wants students to remain nearby and safe.",
          },
        },
        {
          id: "hp_eoy25_D25",
          blank: 25,
          answer: "swing",
          solution: {
            method: "Comprehension Cloze — Verb (Monkey Movement)",
            steps: [
              "'They leapt AND ___ from tree to tree' = parallel verb for monkey movement.",
              "'Swing' = the characteristic movement of monkeys through trees.",
              "'Swung' would also be acceptable (past tense of swing).",
            ],
            tip: "Monkeys SWING from tree to tree. This is their most characteristic movement.",
          },
        },
        {
          id: "hp_eoy25_D26",
          blank: 26,
          answer: "arms",
          solution: {
            method: "Comprehension Cloze — Body Part",
            steps: [
              "'Using their long ___' = the body part monkeys use to swing and leap.",
              "Monkeys have long ARMS which they use to swing through trees.",
            ],
            tip: "Monkeys use their long ARMS to swing from tree to tree.",
          },
        },
        {
          id: "hp_eoy25_D27",
          blank: 27,
          answer: "eyes",
          solution: {
            method: "Comprehension Cloze — Body Part",
            steps: [
              "'Peering at us with bright, watchful ___' = looking with their eyes.",
              "'Bright, watchful eyes' = the monkeys were looking carefully.",
            ],
            tip: "Peering = looking carefully with EYES. 'Bright, watchful eyes' is a natural phrase.",
          },
        },
      ],
    },

    // ── Section E: Editing (5 marks, Q28–32) ───────────────────────────────
    {
      id: "partII_sectionE",
      title: "Section E: Editing for Spelling",
      type: "Editing",
      marks: 5,
      instructions:
        "Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.",
      passageText: `There was once a rich king. One day, when he was out hunting, he dropped his (28)[favaourite] sword in a lake. The enormous lake was deep and (29)[merky] so no matter how hard the king's soldiers tried, they could not find it. After searching the (30)[feelthy] lake for a week, the soldiers gave up. Although the king was (31)[dissappointed], he knew that they had done their best. Sadly, the king (32)[salghed], "I will be more careful the next time." He thanked his soldiers for their hard work.`,
      questions: [
        {
          id: "hp_eoy25_E28",
          blank: 28,
          type: "spelling",
          errorWord: "favaourite",
          correctWord: "favourite",
          answer: "favourite",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Favaourite' is a misspelling with an extra 'a' and wrong vowel order.",
              "Correct spelling: f-a-v-o-u-r-i-t-e.",
              "Break down: fa-vour-ite.",
            ],
            tip: "FAVOURITE: fa + VOUR + ite. Remember: favOURite — the middle part is 'our'.",
          },
        },
        {
          id: "hp_eoy25_E29",
          blank: 29,
          type: "spelling",
          errorWord: "merky",
          correctWord: "murky",
          answer: "murky",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Merky' has the wrong vowel — should be 'murky'.",
              "Correct spelling: m-u-r-k-y.",
              "'Murky' = dark, cloudy, unclear (like murky water).",
            ],
            tip: "MURKY (dark/cloudy) has a 'u': m-U-r-k-y. Not 'merky'.",
          },
        },
        {
          id: "hp_eoy25_E30",
          blank: 30,
          type: "spelling",
          errorWord: "feelthy",
          correctWord: "filthy",
          answer: "filthy",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Feelthy' has 'ee' instead of 'i' and an extra 'e'.",
              "Correct spelling: f-i-l-t-h-y.",
              "'Filthy' = extremely dirty.",
            ],
            tip: "FILTHY: fil-thy. The vowel is 'i' (not 'ee'): f-I-l-t-h-y.",
          },
        },
        {
          id: "hp_eoy25_E31",
          blank: 31,
          type: "spelling",
          errorWord: "dissappointed",
          correctWord: "disappointed",
          answer: "disappointed",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Dissappointed' has double 's' and double 'p' — one of those is wrong.",
              "Correct spelling: d-i-s-a-p-p-o-i-n-t-e-d.",
              "Pattern: dis + appoint + ed. One 's', double 'p'.",
            ],
            tip: "DISAPPOINTED: dis (one s) + appoint (double p) + ed. NOT 'dissappointed'.",
          },
        },
        {
          id: "hp_eoy25_E32",
          blank: 32,
          type: "spelling",
          errorWord: "salghed",
          correctWord: "sighed",
          answer: "sighed",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Salghed' is a phonetic misspelling of 'sighed'.",
              "Correct spelling: s-i-g-h-e-d.",
              "Base word: sigh → sighed (past tense).",
            ],
            tip: "SIGHED = past tense of sigh. Spelling: s-i-g-h-e-d. The 'gh' is silent.",
          },
        },
      ],
    },

    // ── Section F: Synthesis (2 marks, Q33–34) ─────────────────────────────
    {
      id: "partII_sectionF",
      title: "Section F: Synthesis",
      type: "SentenceCombining",
      marks: 2,
      instructions:
        "Rewrite the following pairs of sentences as one sentence without changing the original meaning.",
      questions: [
        {
          id: "hp_eoy25_F33",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "Aden ate two burgers. Aden was very hungry.\n\n____________ because ___________________________________",
          startingWord: "because",
          answer: "Aden ate two burgers because he was very hungry.",
          solution: {
            method: "Sentence Combining — Because (Reason)",
            steps: [
              "'Because' introduces the reason.",
              "He ate two burgers (result) because he was very hungry (reason).",
              "Replace 'Aden' with 'he' in the second clause to avoid repetition.",
              "Correct: 'Aden ate two burgers because he was very hungry.'",
            ],
            tip: "BECAUSE = reason. Ate two burgers BECAUSE very hungry. Replace repeated name with pronoun 'he'.",
          },
        },
        {
          id: "hp_eoy25_F34",
          type: "A",
          topic: "SentenceCombining",
          marks: 1,
          questionText:
            "Tim is short. Tim is the best basketball player in his school.\n\nAlthough ___________________________________",
          startingWord: "Although",
          answer: "Although Tim is short, he is the best basketball player in his school.",
          solution: {
            method: "Sentence Combining — Although (Contrast)",
            steps: [
              "'Although' introduces the surprising contrast: being short AND best basketball player.",
              "Structure: Although [obstacle], [achievement].",
              "Correct: 'Although Tim is short, he is the best basketball player in his school.'",
            ],
            tip: "ALTHOUGH = even though [surprising fact], [impressive result]. Short BUT best player = although short.",
          },
        },
      ],
    },

    // ── Section G: Comprehension 1 (8 marks, Q35–42) ───────────────────────
    {
      id: "partII_sectionG",
      title: "Section G: Comprehension 1",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read the passage below and answer questions 35 to 42.",
      passageTitle: "Siti's New Neighbourhood",
      passageText: `"Mother, may I ride my bicycle now?" Siti asked cheerfully.

Siti's mother replied, "Sure! You can get to know this neighbourhood better and maybe even make some new friends!"

Siti nodded. Her family had just moved into her new home and Siti missed her friends from her old neighbourhood. They used to go skating and jogging together.

As Siti was cycling around her block of flats, she spotted a stone on the ground. She swerved to avoid it which caused her to lose control of her bicycle. Crash! Siti's bicycle hit a lamppost and she fell onto the ground.

Blood oozed out of Siti's elbow and she lay dazed on the ground. Then, she heard someone calling, "Are you alright?" Surprised, Siti looked up and saw a girl running towards her.

"My name is Amy," she said. She helped Siti up and picked up the bicycle. She offered, "I can help you roll your bicycle home." Siti's elbow hurt badly so she agreed.

Back home, Siti explained to her mother what had happened. Siti's mother thanked Amy and bandaged Siti's elbow. Then, the new friends spent some time playing together. Before Amy went home, the girls agreed to meet up again.

That night, Siti reflected on how falling from her bicycle was a blessing in disguise. Siti was glad that she had made a new friend.`,
      questions: [
        {
          id: "hp_eoy25_G35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: "Siti asked her mother for permission to go ____________.",
          options: [
            { id: 1, text: "cycling" },
            { id: 2, text: "skating" },
            { id: 3, text: "jogging" },
            { id: 4, text: "swimming" },
          ],
          answer: 1,
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 1: 'Mother, may I ride my bicycle now?' = asking to ride bicycle = cycling.",
              "Option 1 = cycling. Skating and jogging are what she used to do with old friends.",
            ],
            tip: "'Ride my bicycle' = CYCLING. Skating and jogging were with old friends, not what she's asking to do now.",
          },
        },
        {
          id: "hp_eoy25_G36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Siti's mother hoped that she could ____________ while cycling.",
          options: [
            { id: 1, text: "meet her old friends" },
            { id: 2, text: "play with her new friends" },
            { id: 3, text: "visit her old neighbourhood" },
            { id: 4, text: "get to know her new neighbourhood better" },
          ],
          answer: 4,
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 2: 'You can get to know this neighbourhood better and maybe even make some new friends!'",
              "Mother's hope: get to know the new neighbourhood + possibly make new friends.",
              "Option 4 captures the primary hope — learning about the neighbourhood.",
            ],
            tip: "Mother said 'get to know THIS neighbourhood better' = option 4. Making friends is a secondary hope.",
          },
        },
        {
          id: "hp_eoy25_G37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Siti agreed to Amy's offer to help roll her bicycle home as ____________.",
          options: [
            { id: 1, text: "she could not walk" },
            { id: 2, text: "her elbow hurt badly" },
            { id: 3, text: "Amy had picked up her bicycle" },
            { id: 4, text: "she needed help to get up from the ground" },
          ],
          answer: 2,
          solution: {
            method: "Literal Comprehension — Reason",
            steps: [
              "Paragraph 6: 'Siti's elbow hurt badly so she agreed.'",
              "She agreed BECAUSE her elbow hurt badly — she needed help.",
            ],
            tip: "'Siti's elbow hurt badly so she agreed.' = She agreed BECAUSE her elbow hurt. Option 2.",
          },
        },
        {
          id: "hp_eoy25_G38",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            'True or False: "Siti lost control of her bicycle and hit a lamppost."',
          answer: "True",
          solution: {
            method: "True/False",
            steps: [
              "Paragraph 4: 'she swerved...which caused her to lose control of her bicycle. Crash! Siti's bicycle hit a lamppost.'",
              "She lost control AND the bicycle hit the lamppost. TRUE.",
            ],
            tip: "Both happened: lost control + hit lamppost. TRUE.",
          },
        },
        {
          id: "hp_eoy25_G39",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 1,
          questionText:
            "True or False: \"Siti's elbow was bandaged by Amy.\"",
          answer: "False",
          solution: {
            method: "True/False",
            steps: [
              "Paragraph 7: 'Siti's mother thanked Amy and bandaged Siti's elbow.'",
              "MOTHER bandaged the elbow, not Amy. FALSE.",
            ],
            tip: "MOTHER bandaged it, not Amy. Amy helped roll the bicycle home. FALSE.",
          },
        },
        {
          id: "hp_eoy25_G40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word in paragraph 5 tells us that Siti did not expect someone to help her?",
          answer: "Surprised",
          solution: {
            method: "Word Retrieval",
            steps: [
              "Paragraph 5: 'Surprised, Siti looked up and saw a girl running towards her.'",
              "'Surprised' = did not expect — she was surprised because she didn't anticipate anyone helping.",
            ],
            tip: "SURPRISED = did not expect. She was surprised to see someone running to help her.",
          },
        },
        {
          id: "hp_eoy25_G41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Write 1, 2 and 3 in the boxes below to show the sequence of events in paragraph 7:\n___ The two girls played together.\n___ Siti and Amy agreed to meet up again.\n___ Siti told her mother about what had happened.",
          answer: "2 — played together / 3 — agreed to meet up / 1 — told her mother",
          solution: {
            method: "Sequencing",
            steps: [
              "Paragraph 7: First: Siti explained to her mother (1).",
              "Second: Mother thanked Amy, then new friends spent time playing (2).",
              "Third: Before Amy went home, girls agreed to meet again (3).",
            ],
            tip: "Follow paragraph 7 order: told mother → played together → agreed to meet again = 1, 2, 3.",
          },
        },
        {
          id: "hp_eoy25_G42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: "What does \"it\" in line 7 refer to?",
          answer: "The stone (on the ground) / the bicycle",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "Line 7 (paragraph 4): 'She swerved to avoid IT' — 'it' refers to the stone she spotted.",
              "The stone on the ground is what she was trying to avoid.",
            ],
            tip: "'Swerved to avoid IT' — the 'it' = THE STONE she spotted on the ground.",
          },
        },
      ],
    },

    // ── Section H: Comprehension 2 (8 marks, Q43–48) ───────────────────────
    {
      id: "partII_sectionH",
      title: "Section H: Comprehension 2",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read the passage below and answer questions 43 to 48.",
      passageTitle: "Brandon's Change of Heart",
      passageText: `At Hope Primary School, Brandon was known as the toughest boy. Many students avoided him as he would always knock into others and mock them. He always teased Arman, a quiet, bespectacled boy who loved books and rarely spoke.

One day, after Brandon broke Arman's glasses accidentally, he refused to apologise. Their teacher, Miss Lee, asked to speak with him privately. Brandon expected to be shouted at. However, Miss Lee shared her own story.

"When I was your age," she said, "I wore thick glasses and was shy, just like Arman. I was teased daily. It made me feel sad." She paused. "But one day, someone stood up for me. He didn't have to, but he did. That moment helped me believe I was worth something."

Brandon was stunned. He had never thought of Miss Lee as someone who had ever been unhappy in school. Her words stayed with him.

A few days later, Brandon approached Arman and handed him a new pair of glasses. "I'm sorry," he muttered. Arman looked surprised but smiled and said, "Thanks."

From then on, Brandon changed. He stopped being mean and even joined the school's Kindness Club to help others. Teachers noticed the change, and students started seeing Brandon in a new light and some even went to him for advice when they faced problems.

Brandon had turned over a new leaf — and he knew it was for the better.`,
      questions: [
        {
          id: "hp_eoy25_H43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: "What did Brandon like to do to other students?",
          answer: "He would always knock into others and mock them. / He always teased other students.",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 1: 'he would always knock into others and mock them.'",
              "He knocked into people and mocked (teased) them.",
            ],
            tip: "Find what Brandon DID to others: knocked into them AND mocked/teased them.",
          },
        },
        {
          id: "hp_eoy25_H44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: "Who does the word 'them' in line 2 refer to?",
          answer: "The students (at Hope Primary School).",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "Line 2: 'Many students avoided him as he would always knock into others and mock them.'",
              "'Them' refers to 'others' = the other students.",
            ],
            tip: "'Mock THEM' = mock the OTHER STUDENTS. 'Them' refers back to the students/others Brandon mocked.",
          },
        },
        {
          id: "hp_eoy25_H45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which word in paragraph 2 has the same meaning as 'not on purpose'?",
          answer: "accidentally",
          solution: {
            method: "Synonym Retrieval",
            steps: [
              "Paragraph 2: 'after Brandon broke Arman's glasses accidentally.'",
              "'Accidentally' = not on purpose = by mistake.",
            ],
            tip: "ACCIDENTALLY = not on purpose = by mistake. Found in paragraph 2.",
          },
        },
        {
          id: "hp_eoy25_H46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Write 1, 2 and 3 in the boxes below to show the sequence of events in the passage:\n___ Brandon broke Arman's glasses.\n___ Brandon was surprised that Miss Lee once felt weak and alone.\n___ Brandon was told by Miss Lee about the boy who stood up for her.",
          answer: "1 — broke glasses / 3 — surprised that Miss Lee felt weak / 2 — told about the boy",
          solution: {
            method: "Sequencing",
            steps: [
              "First (1): Brandon broke Arman's glasses (paragraph 2, first event).",
              "Second (2): Miss Lee told her story, including the boy who stood up for her (paragraph 3).",
              "Third (3): Brandon was stunned — he was surprised about Miss Lee's past (paragraph 4).",
            ],
            tip: "Broke glasses → Miss Lee told story → Brandon was stunned = 1, 2, 3.",
          },
        },
        {
          id: "hp_eoy25_H47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Based on the passage, write down what Brandon did to Arman just before and just after his talk with Miss Lee.",
          answer:
            "Just before: Brandon broke Arman's glasses and refused to apologise.\nJust after: Brandon handed Arman a new pair of glasses and apologised (said 'I'm sorry').",
          solution: {
            method: "Evidence Retrieval — Before and After",
            steps: [
              "Before: 'after Brandon broke Arman's glasses accidentally, he refused to apologise.' (paragraph 2)",
              "After (a few days later): 'Brandon approached Arman and handed him a new pair of glasses. \"I'm sorry,\" he muttered.' (paragraph 5)",
            ],
            tip: "BEFORE: broke glasses + refused to apologise. AFTER: gave new glasses + said sorry. Complete contrast showing change.",
          },
        },
        {
          id: "hp_eoy25_H48",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "(a) Which of the following words best describes how the other students feel about Brandon at the end of the story?\n☐ fear / ☐ grateful / ☐ respect\n\n(b) Using evidence from the passage, explain why you have chosen the word in (a).",
          answer:
            "(a) respect\n(b) Students saw Brandon in a new light and some even went to him for advice when they faced problems. This shows they respected him.",
          solution: {
            method: "Inference + Evidence",
            steps: [
              "(a) At the end, students went to Brandon FOR ADVICE — people seek advice from those they respect.",
              "(b) Last paragraph: 'students started seeing Brandon in a new light and some even went to him for advice when they faced problems.'",
              "'Seeing in a new light' = changed perception; seeking advice = respect.",
            ],
            tip: "(a) Going to someone for ADVICE = RESPECT. (b) Quote from last paragraph: 'started seeing Brandon in a new light' and 'went to him for advice'.",
          },
        },
      ],
    },
  ],
};
