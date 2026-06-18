// src/data/p3/english/papers/eoy_mahabodhi_p2_2025.ts
// Maha Bodhi School — P3 English EOY 2024 (SA2)
// Paper 2: Booklet A (20m) + Booklet B (30m) = 50 marks
// Excludes: Paper 1 (Composition) and Paper 3 (Listening Comprehension)

import { ExamPaper } from "@/types/exam";

const paper: ExamPaper = {
  id: "eoy_mahabodhi_p2_2024",
  school: "Maha Bodhi School",
  level: "P3",
  subject: "English",
  year: 2024,
  term: "EOY",
  paper: "Paper 2",
  totalMarks: 50,
  duration: 80,
  sections: [

    // ─────────────────────────────────────────
    // BOOKLET A — SECTION A: GRAMMAR MCQ (8 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secA",
      name: "Booklet A – Section A: Grammar MCQ",
      topic: "GrammarMCQ",
      instructions:
        "For each of the following, choose the correct answer and shade the correct oval (1, 2, 3 or 4) on the OAS.",
      marks: 8,
      questionType: "A",
      questions: [
        {
          id: "mb_2024_eoy_q1",
          qNumber: 1,
          topic: "GrammarMCQ",
          subtopic: "Simple Past Tense",
          questionText:
            "She __________ to the party and met her friend there.",
          options: [
            { label: "1", text: "go" },
            { label: "2", text: "went" },
            { label: "3", text: "goes" },
            { label: "4", text: "gone" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Simple past tense",
            steps: [
              "The sentence describes a completed past action — she attended the party and met her friend.",
              "Simple past of 'go' = 'went'.",
              "'Gone' requires an auxiliary (has/have/had gone). 'Goes' = present tense. 'Go' = base form.",
              "Answer: (2) went",
            ],
            tip: "Simple past verbs describe completed actions. 'Go' → went (irregular past).",
          },
        },
        {
          id: "mb_2024_eoy_q2",
          qNumber: 2,
          topic: "GrammarMCQ",
          subtopic: "Quantifier with Countable Noun in Question",
          questionText:
            '"How __________ times did you practise playing this piano piece?" the music teacher asked Anthony.',
          options: [
            { label: "1", text: "more" },
            { label: "2", text: "much" },
            { label: "3", text: "many" },
            { label: "4", text: "some" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Quantifier with countable noun",
            steps: [
              "'Times' = countable noun.",
              "'How many' is used with countable nouns to ask about quantity.",
              "'How much' = uncountable nouns. 'How more' is not a standard phrase. 'Some' is not used in 'How' questions.",
              "Answer: (3) many",
            ],
            tip: "'How many + countable noun' asks about number. 'How much + uncountable noun' asks about amount.",
          },
        },
        {
          id: "mb_2024_eoy_q3",
          qNumber: 3,
          topic: "GrammarMCQ",
          subtopic: "Subject-Verb Agreement (Simple Past, Plural)",
          questionText:
            "Buckets of water __________ emptied into the pond yesterday.",
          options: [
            { label: "1", text: "is" },
            { label: "2", text: "are" },
            { label: "3", text: "was" },
            { label: "4", text: "were" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Subject-verb agreement — plural subject, past tense",
            steps: [
              "Subject: 'Buckets' = plural.",
              "Time clue: 'yesterday' → past tense.",
              "Plural past tense of 'to be' = 'were'.",
              "Answer: (4) were",
            ],
            tip: "Buckets (plural) + past tense = 'were'. 'Was' is for singular subjects.",
          },
        },
        {
          id: "mb_2024_eoy_q4",
          qNumber: 4,
          topic: "GrammarMCQ",
          subtopic: "Indefinite Pronoun (Negative Context)",
          questionText:
            "The thieves took __________ in the safe. All of Tim's precious belongings were still there.",
          options: [
            { label: "1", text: "nothing" },
            { label: "2", text: "anything" },
            { label: "3", text: "everything" },
            { label: "4", text: "something" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Indefinite pronoun — zero/negative result",
            steps: [
              "The context: all belongings were STILL THERE → the thieves took ZERO items.",
              "'Nothing' = not any amount/thing — used in affirmative sentences to express zero.",
              "'Anything' is used after negative verbs (didn't take anything). 'Everything' = all items. 'Something' = an unspecified item.",
              "Answer: (1) nothing",
            ],
            tip:
              "'Nothing' in a positive sentence = zero things. 'Anything' after a negative verb = also zero things. Both work, but 'nothing' avoids double negative.",
          },
        },
        {
          id: "mb_2024_eoy_q5",
          qNumber: 5,
          topic: "GrammarMCQ",
          subtopic: "Question Tag (Past — Look + Be)",
          questionText:
            '"She looked scared, __________?" her mother asked me.',
          options: [
            { label: "1", text: "did she" },
            { label: "2", text: "was she" },
            { label: "3", text: "didn't she" },
            { label: "4", text: "wasn't she" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Question tag for past tense with 'looked'",
            steps: [
              "Main clause: 'She looked scared' — positive statement.",
              "'Looked' is a linking verb here (= appeared to be). The auxiliary for 'look' in simple past = 'did'.",
              "However, 'look + adjective' (looked scared = was scared-looking) → some interpret this as an opinion/state question where 'didn't she' is the natural tag.",
              "Official answer: (4) wasn't she — treating 'looked scared' as equivalent to 'was scared'.",
              "Answer: (4) wasn't she",
            ],
            tip: "For 'looked + adjective' (describing a state), the tag question often uses 'wasn't/didn't'. Check official answer key: (4) wasn't she.",
          },
        },
        {
          id: "mb_2024_eoy_q6",
          qNumber: 6,
          topic: "GrammarMCQ",
          subtopic: "Future Tense (Will)",
          questionText:
            "Shannon's parents __________ her a car when she turns eighteen in a few months' time.",
          options: [
            { label: "1", text: "buy" },
            { label: "2", text: "bought" },
            { label: "3", text: "will buy" },
            { label: "4", text: "were buying" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Future tense",
            steps: [
              "Time clue: 'in a few months' time' = future event.",
              "'Will buy' = future tense, showing an intention or plan.",
              "'Bought' = past (wrong). 'Were buying' = past continuous. 'Buy' = base form (needs auxiliary).",
              "Answer: (3) will buy",
            ],
            tip: "'In a few months' time / next year / tomorrow' → future tense: will + base verb.",
          },
        },
        {
          id: "mb_2024_eoy_q7",
          qNumber: 7,
          topic: "GrammarMCQ",
          subtopic: "Present Continuous in Exclamation",
          questionText:
            '"The kite __________ away. Quickly, pull on its string!" Sanjay shouted.',
          options: [
            { label: "1", text: "fly" },
            { label: "2", text: "flew" },
            { label: "3", text: "is flying" },
            { label: "4", text: "was flying" },
          ],
          answer: "3",
          marks: 1,
          solution: {
            method: "Present continuous — action happening right now",
            steps: [
              "The exclamation 'Quickly, pull on its string!' shows it's happening at THIS MOMENT.",
              "Action happening right now = present continuous: is/am/are + Ving.",
              "Subject 'The kite' = singular → 'is flying'.",
              "Answer: (3) is flying",
            ],
            tip: "Urgent commands responding to an ongoing action → present continuous.",
          },
        },
        {
          id: "mb_2024_eoy_q8",
          qNumber: 8,
          topic: "GrammarMCQ",
          subtopic: "Conjunction of Result",
          questionText:
            "Nobody in class likes Hady __________ he has no friends.",
          options: [
            { label: "1", text: "if" },
            { label: "2", text: "so" },
            { label: "3", text: "but" },
            { label: "4", text: "unless" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Conjunction of result/consequence",
            steps: [
              "The second clause ('he has no friends') is the RESULT of the first ('nobody in class likes Hady').",
              "'So' = therefore/as a result — connects cause to its consequence.",
              "'If' = conditional. 'But' = contrast. 'Unless' = except if.",
              "Answer: (2) so",
            ],
            tip: "'So' introduces a result/consequence. Cause + so + Result.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET A — SECTION B: VOCABULARY MCQ (7 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secB",
      name: "Booklet A – Section B: Vocabulary MCQ",
      topic: "VocabMCQ",
      instructions:
        "For each of the following, choose the best answer and shade the correct oval (1, 2, 3 or 4) on the OAS.",
      marks: 7,
      questionType: "A",
      questions: [
        {
          id: "mb_2024_eoy_q9",
          qNumber: 9,
          topic: "VocabMCQ",
          subtopic: "Verb — Animal/Physical Movement",
          questionText:
            "The little puppy __________ in her arms, trying to escape.",
          options: [
            { label: "1", text: "wriggled" },
            { label: "2", text: "quivered" },
            { label: "3", text: "stumbled" },
            { label: "4", text: "grumbled" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Verb connotation in context",
            steps: [
              "The puppy is trying to ESCAPE from being held — it's moving its body to get free.",
              "'Wriggled' = twisted and squirmed the body to try to get free.",
              "'Quivered' = trembled/shook (from fear). 'Stumbled' = tripped (walking). 'Grumbled' = complained.",
              "Answer: (1) wriggled",
            ],
            tip: "'Wriggle' = to twist and turn the body to escape a grip. Used for animals and small creatures.",
          },
        },
        {
          id: "mb_2024_eoy_q10",
          qNumber: 10,
          topic: "VocabMCQ",
          subtopic: "Adjective — Toxicity",
          questionText:
            "Some mushrooms are __________. You might be seriously ill if you eat them.",
          options: [
            { label: "1", text: "poisonous" },
            { label: "2", text: "venomous" },
            { label: "3", text: "murderous" },
            { label: "4", text: "carnivorous" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Precise vocabulary — poisonous vs. venomous",
            steps: [
              "'Poisonous' = toxic when eaten or touched.",
              "'Venomous' = delivers venom by biting/stinging (e.g., snakes, bees). Mushrooms are not venomous.",
              "'Murderous' = intent to kill (person). 'Carnivorous' = meat-eating.",
              "Mushrooms are POISONOUS when eaten → (1).",
              "Answer: (1) poisonous",
            ],
            tip:
              "Poisonous = toxic when consumed. Venomous = injects toxin through a bite/sting. Mushrooms = poisonous.",
          },
        },
        {
          id: "mb_2024_eoy_q11",
          qNumber: 11,
          topic: "VocabMCQ",
          subtopic: "Phrasal Verb",
          questionText:
            "If you want to improve in something, you really need to __________ it.",
          options: [
            { label: "1", text: "put on" },
            { label: "2", text: "work at" },
            { label: "3", text: "keep on" },
            { label: "4", text: "get over" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Phrasal verb meaning",
            steps: [
              "'Work at' = to practise and make effort to improve at something.",
              "'Put on' = to wear/add. 'Keep on' = to continue doing (not specifically about improvement). 'Get over' = to recover from.",
              "Answer: (2) work at",
            ],
            tip: "'Work at' = to put in sustained effort to improve. 'Work at your handwriting' = practise to improve.",
          },
        },
        {
          id: "mb_2024_eoy_q12",
          qNumber: 12,
          topic: "VocabMCQ",
          subtopic: "Idiom — Reconciliation",
          questionText:
            "The two brothers had a huge quarrel and did not speak to each other for years. However, they finally __________ and forgave each other.",
          options: [
            { label: "1", text: "buried the hatchet" },
            { label: "2", text: "cried over spilt milk" },
            { label: "3", text: "shed crocodile tears" },
            { label: "4", text: "beat around the bush" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Idiom interpretation",
            steps: [
              "'Buried the hatchet' = made peace / ended a quarrel.",
              "'Cried over spilt milk' = regretted something that cannot be undone.",
              "'Shed crocodile tears' = pretended to be sad/sorrowful.",
              "'Beat around the bush' = avoided saying something directly.",
              "Context: they forgave each other → reconciled = buried the hatchet.",
              "Answer: (1) buried the hatchet",
            ],
            tip: "'Bury the hatchet' = to make peace and end a conflict. A hatchet is a weapon — burying it means stopping the fight.",
          },
        },
        {
          id: "mb_2024_eoy_q13",
          qNumber: 13,
          topic: "VocabMCQ",
          subtopic: "Adverb — Manner of Movement",
          questionText:
            "The cat moved __________ towards the strange noise, checking for any possible danger.",
          options: [
            { label: "1", text: "shyly" },
            { label: "2", text: "warily" },
            { label: "3", text: "keenly" },
            { label: "4", text: "suspiciously" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Adverb connotation",
            steps: [
              "The cat moves towards DANGER, checking cautiously — alert to possible threat.",
              "'Warily' = with great caution and alertness to danger.",
              "'Shyly' = timidly / in an embarrassed way. 'Keenly' = with enthusiasm/interest. 'Suspiciously' = as if doubting or believing something is wrong.",
              "Answer: (2) warily",
            ],
            tip: "'Warily' = cautiously alert to danger. Often used for animals approaching a threat.",
          },
        },
        {
          id: "mb_2024_eoy_q14",
          qNumber: 14,
          topic: "VocabMCQ",
          subtopic: "Collective Noun",
          questionText:
            "The teacher tried to get her __________ of noisy students to keep quiet in the library.",
          options: [
            { label: "1", text: "team" },
            { label: "2", text: "class" },
            { label: "3", text: "bunch" },
            { label: "4", text: "school" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Collective noun for students",
            steps: [
              "A teacher groups students into a CLASS — the group she teaches.",
              "'Class' = a group of students taught by the same teacher.",
              "'Team' = a group working together toward a goal (sport/project). 'Bunch' = informal group. 'School' = the institution.",
              "Answer: (2) class",
            ],
            tip: "A teacher's 'class' is the group of students she is responsible for.",
          },
        },
        {
          id: "mb_2024_eoy_q15",
          qNumber: 15,
          topic: "VocabMCQ",
          subtopic: "Adverb — Manner/Effort",
          questionText:
            "Sarah was determined to win the upcoming mathematics competition. She practised __________ every day.",
          options: [
            { label: "1", text: "lazily" },
            { label: "2", text: "diligently" },
            { label: "3", text: "carelessly" },
            { label: "4", text: "effortlessly" },
          ],
          answer: "2",
          marks: 1,
          solution: {
            method: "Adverb matching character trait",
            steps: [
              "Sarah is DETERMINED → she would practise hard and with great effort.",
              "'Diligently' = with careful and persistent hard work.",
              "'Lazily' = without effort. 'Carelessly' = without care. 'Effortlessly' = without any effort needed (contradicts 'determined').",
              "Answer: (2) diligently",
            ],
            tip: "'Diligently' = working hard and carefully over time. Matches 'determined' in meaning.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET A — SECTION C: VISUAL TEXT (5 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secC",
      name: "Booklet A – Section C: Visual Text Comprehension",
      topic: "VisualText",
      instructions:
        "Read the poster carefully then answer questions 16–20. Choose the correct answer and shade the correct oval (1, 2, 3 or 4) on the OAS.",
      marks: 5,
      questionType: "B",
      passage: {
        title: "Cycle Maniacs — Poster",
        type: "poster",
        content: `CYCLE MANIACS
Proudly sponsored by 2Wheels
Calling all cycling lovers! Due to fantastic response last year, Cycle Maniacs is back again!

Date: 20 October 2024, Sunday
Time: 8AM to 6PM
Venue: East Spring Park

Programme Line-up:
8–10AM: Get free repair services for your bicycles at The Bike Doctor
10–11AM: Learn new bicycle skills and tricks with the famous CoolBikers Team
1–2PM: Catch a unicycle performance by OnlyOneWheel
Explore new trails and catch a glimpse of the Wonder Waterfall at any time!

SPECIAL DEALS!!!
- 50% off sportswear at GetFit Activewear
- 25% off bicycles and accessories such as helmets at BikePro
- Get 1-for-1 deals at LemonPlus Energy Drink

FREE SPORTS TOWEL FOR THE FIRST 100 PARTICIPANTS!

For more information, kindly contact Sports Events Department at 90908800
To register, email us at sports-events@bicycle.org.sg or visit our website at: cyclemaniacs2024.org.sg`,
      },
      questions: [
        {
          id: "mb_2024_eoy_q16",
          qNumber: 16,
          topic: "VisualText",
          subtopic: "Sponsor Identification",
          questionText: "This event is sponsored by __________.",
          options: [
            { label: "1", text: "2Wheels" },
            { label: "2", text: "Cycle Maniacs" },
            { label: "3", text: "CoolBikers Team" },
            { label: "4", text: "Sports Events Department" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Scanning for specific detail",
            steps: [
              "Text: 'Proudly sponsored by 2Wheels'.",
              "The sponsor is 2Wheels — the company that funds the event.",
              "Answer: (1) 2Wheels",
            ],
            tip: "Scan for the word 'sponsored by' to find the sponsor's name.",
          },
        },
        {
          id: "mb_2024_eoy_q17",
          qNumber: 17,
          topic: "VisualText",
          subtopic: "Time-Based Activity Matching",
          questionText:
            "Sam arrives at the event at 2.30 pm. Which of the following activities can he enjoy?",
          options: [
            { label: "1", text: "Free bicycle repair service" },
            { label: "2", text: "Watch a unicycle performance" },
            { label: "3", text: "Learn new bicycle tricks and skills" },
            { label: "4", text: "Go on a cycling trail and see the Wonder Waterfall" },
          ],
          answer: "4",
          marks: 1,
          solution: {
            method: "Time-matching activity",
            steps: [
              "Sam arrives at 2:30 pm. Check the timetable:",
              "8–10am: Free repair (ended). 10–11am: CoolBikers (ended). 1–2pm: Unicycle (just ended).",
              "'Explore new trails and catch a glimpse of the Wonder Waterfall at any time!' — 'AT ANY TIME' means this is available at 2:30 pm.",
              "Answer: (4) Go on a cycling trail and see the Wonder Waterfall",
            ],
            tip: "Check which activities are available at the specific time. 'At any time' = always available.",
          },
        },
        {
          id: "mb_2024_eoy_q18",
          qNumber: 18,
          topic: "VisualText",
          subtopic: "Deal/Discount Identification",
          questionText:
            "Trina wants to buy a bicycle helmet. She will __________.",
          options: [
            { label: "1", text: "get 25% off her purchase" },
            { label: "2", text: "receive another helmet for free" },
            { label: "3", text: "get a 50% discount on her purchase" },
            { label: "4", text: "receive a sports towel with her purchase" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Locating relevant deal",
            steps: [
              "Helmets are at BikePro: '25% off bicycles and accessories such as helmets at BikePro'.",
              "Trina gets 25% off her helmet purchase.",
              "50% off is at GetFit Activewear (sportswear). 1-for-1 is at LemonPlus. Sports towel = for first 100 participants.",
              "Answer: (1) get 25% off her purchase",
            ],
            tip: "Find the relevant item (helmet → accessories) and match it to the correct deal.",
          },
        },
        {
          id: "mb_2024_eoy_q19",
          qNumber: 19,
          topic: "VisualText",
          subtopic: "Contact Information",
          questionText:
            "People who would like to get more information about the event could __________.",
          options: [
            { label: "1", text: "call the organisers" },
            { label: "2", text: "email the organisers" },
            { label: "3", text: "visit the organiser's website" },
            { label: "4", text: "head down to East Spring Park" },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Information retrieval — contact method",
            steps: [
              "Text: 'For more information, kindly contact Sports Events Department at 90908800'.",
              "Calling 90908800 is the way to get MORE INFORMATION.",
              "The email and website are for REGISTRATION, not for more information.",
              "Answer: (1) call the organisers",
            ],
            tip:
              "Read carefully — registration vs. information use different contact methods.",
          },
        },
        {
          id: "mb_2024_eoy_q20",
          qNumber: 20,
          topic: "VisualText",
          subtopic: "True/False Statement — Identifying the False One",
          questionText:
            "Which of the following statements is FALSE?",
          options: [
            { label: "1", text: "The event is being held for the first time." },
            { label: "2", text: "The free bicycle repair service lasts from 8 am to 10 am." },
            { label: "3", text: "The 200th person to attend this event will not get a sports towel." },
            { label: "4", text: "We can get twice the amount of LemonPlus Energy drinks with every purchase." },
          ],
          answer: "1",
          marks: 1,
          solution: {
            method: "Identify the false statement",
            steps: [
              "Option 1: 'Due to fantastic response last year, Cycle Maniacs is back again!' → It is NOT the first time. This is FALSE ✓",
              "Option 2: '8–10AM: Get free repair services' → True (2 hours from 8–10am).",
              "Option 3: 'FREE SPORTS TOWEL FOR THE FIRST 100 PARTICIPANTS' → The 200th person would NOT get one. True.",
              "Option 4: '1-for-1 deals' = buy 1 get 1 = twice the amount. True.",
              "Answer: (1) The event is being held for the first time.",
            ],
            tip:
              "For 'find the FALSE statement' — check each option against the exact text. Option 1 contradicts 'back again'.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET B — SECTION D: GRAMMAR CLOZE (7 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secD",
      name: "Booklet B – Section D: Grammar Cloze",
      topic: "GrammarCloze",
      instructions:
        "Read the passages carefully. Choose the correct form of the verb/pronoun from the box and write the answer in the blanks provided. USE EACH WORD OR PHRASE ONLY ONCE.",
      marks: 7,
      questionType: "B",
      subsections: [
        {
          id: "mb2024_secD_pass1",
          name: "Passage 1 – Forms of the Verbs (3 × 1m)",
          passage: {
            title: "The Woman in the Vinegar Bottle",
            type: "narrative",
            content: `There was an unhappy old woman. She (21)__________ in a vinegar bottle for a long time.

"I am tired of (22)__________ here! I would be happy if I have a little cottage," she cried.

Just then, a fairy appeared.

"I will make your wish come true," she waved her wand. At once, the old woman found herself in a little cottage.

"Thank you, Fairy," said the old woman. "I'm happy now as I can (23)__________ in such a beautiful place." However, the old woman started grumbling again.

Adapted from The Vinegar Bottle by Moira Wood`,
            wordBank: [
              { label: "1", word: "live" },
              { label: "2", word: "lives" },
              { label: "3", word: "is living" },
              { label: "4", word: "had lived" },
              { label: "5", word: "living" },
              { label: "6", word: "were living" },
            ],
          },
          questions: [
            {
              id: "mb_2024_eoy_q21",
              qNumber: 21,
              topic: "GrammarCloze",
              subtopic: "Past Perfect — Duration",
              questionText:
                "She (21)__________ in a vinegar bottle for a long time.",
              blankPosition: 1,
              answer: "had lived",
              marks: 1,
              solution: {
                method: "Past perfect for completed past duration",
                steps: [
                  "She was unhappy because she had been living there for a long time (before the story).",
                  "Past perfect 'had lived' = lived from before and continuing into the past narrative point.",
                  "Answer: had lived",
                ],
                tip: "'Had lived' = past perfect, describing something that happened over a period before a past moment.",
              },
            },
            {
              id: "mb_2024_eoy_q22",
              qNumber: 22,
              topic: "GrammarCloze",
              subtopic: "Gerund after Preposition",
              questionText:
                '"I am tired of (22)__________ here!"',
              blankPosition: 2,
              answer: "living",
              marks: 1,
              solution: {
                method: "Gerund after preposition 'of'",
                steps: [
                  "'Tired of + Ving' is a fixed pattern — after a preposition, use the gerund (-ing form).",
                  "'Living' = gerund of 'live'.",
                  "Answer: living",
                ],
                tip: "After prepositions (of, in, for, about, at), use the gerund (-ing form).",
              },
            },
            {
              id: "mb_2024_eoy_q23",
              qNumber: 23,
              topic: "GrammarCloze",
              subtopic: "Infinitive after Modal 'can'",
              questionText:
                '"I\'m happy now as I can (23)__________ in such a beautiful place."',
              blankPosition: 3,
              answer: "live",
              marks: 1,
              solution: {
                method: "Base verb after modal 'can'",
                steps: [
                  "Modal verbs (can, will, should, must) are followed by the BASE FORM of the verb.",
                  "'Can live' = base form 'live'.",
                  "Answer: live",
                ],
                tip: "Modal verbs (can, will, must, should) + base form of verb (no -ing, no -ed).",
              },
            },
          ],
        },
        {
          id: "mb2024_secD_pass2",
          name: "Passage 2 – Pronouns (4 × 1m)",
          passage: {
            title: "Sea Stars",
            type: "informational",
            content: `Sea stars are amazing sea creatures. (24)__________ can be found in tide pools and on the beach. If you touch one gently, (25)__________ will not harm you. However, (26)__________ should not touch the sea stars or turn them over. This may harm (27)__________. We should respect and care for nature so that sea stars will continue to live and enrich our planet.`,
            wordBank: [
              { label: "A", word: "they" },
              { label: "B", word: "she" },
              { label: "C", word: "them" },
              { label: "D", word: "it" },
              { label: "E", word: "you" },
              { label: "F", word: "me" },
            ],
          },
          questions: [
            {
              id: "mb_2024_eoy_q24",
              qNumber: 24,
              topic: "GrammarCloze",
              subtopic: "Subject Pronoun (They)",
              questionText:
                "Sea stars are amazing sea creatures. (24)__________ can be found in tide pools and on the beach.",
              blankPosition: 1,
              answer: "They",
              marks: 1,
              solution: {
                method: "Subject pronoun — third person plural",
                steps: [
                  "'Sea stars' = plural third person → subject pronoun 'they'.",
                  "Answer: They",
                ],
                tip: "Sea stars (plural, non-human) → they (subject).",
              },
            },
            {
              id: "mb_2024_eoy_q25",
              qNumber: 25,
              topic: "GrammarCloze",
              subtopic: "Subject Pronoun (It)",
              questionText:
                "If you touch one gently, (25)__________ will not harm you.",
              blankPosition: 2,
              answer: "it",
              marks: 1,
              solution: {
                method: "Subject pronoun — singular non-human",
                steps: [
                  "'One' = one sea star = singular, non-human → 'it'.",
                  "Answer: it",
                ],
                tip: "'One' sea star = singular → use 'it' (not 'they').",
              },
            },
            {
              id: "mb_2024_eoy_q26",
              qNumber: 26,
              topic: "GrammarCloze",
              subtopic: "Subject Pronoun (You)",
              questionText:
                "However, (26)__________ should not touch the sea stars or turn them over.",
              blankPosition: 3,
              answer: "you",
              marks: 1,
              solution: {
                method: "Subject pronoun — second person (advice to reader)",
                steps: [
                  "The text is giving advice to the reader — addressing the reader directly.",
                  "Second person = 'you'.",
                  "Answer: you",
                ],
                tip: "When a text addresses readers with advice or instructions, use 'you'.",
              },
            },
            {
              id: "mb_2024_eoy_q27",
              qNumber: 27,
              topic: "GrammarCloze",
              subtopic: "Object Pronoun (Them)",
              questionText:
                "This may harm (27)__________.",
              blankPosition: 4,
              answer: "them",
              marks: 1,
              solution: {
                method: "Object pronoun — third person plural",
                steps: [
                  "'Harm' = verb; the sea stars receive the action of harming.",
                  "Sea stars = plural third person → object pronoun 'them'.",
                  "Answer: them",
                ],
                tip: "Object pronouns (receive the action): me, you, him, her, it, us, them.",
              },
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET B — SECTION E: VOCABULARY CLOZE (5 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secE",
      name: "Booklet B – Section E: Vocabulary Cloze",
      topic: "VocabCloze",
      instructions:
        "Read the passage carefully. Choose the best word from the box and write the answer in the blanks provided. USE EACH WORD ONLY ONCE.",
      marks: 5,
      questionType: "B",
      passage: {
        title: "Leila Falls Asleep in Class",
        type: "narrative",
        content: `Mdm Rena stopped writing on the whiteboard and turned around. "Leila!" she called. There was no (28)__________. Heads began to turn to the back of the classroom where Leila was slumped over her desk. "Leila Ong!" Mdm Rena called again, (29)__________ this time. Leila (30)__________ something in her sleep as her head jerked awake, causing some of the children to giggle.

I wondered if I should have reached over and woken Leila before Mdm Rena (31)__________ she was asleep. However, I was worried that if I did, I might draw attention to her. When Mdm Rena asked if she was okay, Leila quickly (32)__________, "Yes, Mdm Rena, I'm fine." However, Mdm Rena did not believe her as she still looked a bit drowsy. Everyone watched them silently.

Adapted from Thinking Stories 3: The Sleepover by Philip Cam`,
        wordBank: [
          { label: "1", word: "observed" },
          { label: "2", word: "mumbled" },
          { label: "3", word: "louder" },
          { label: "4", word: "answered" },
          { label: "5", word: "gently" },
          { label: "6", word: "response" },
          { label: "7", word: "noticed" },
          { label: "8", word: "rumbled" },
        ],
      },
      questions: [
        {
          id: "mb_2024_eoy_q28",
          qNumber: 28,
          topic: "VocabCloze",
          subtopic: "Noun — Reaction to Call",
          questionText:
            "There was no (28)__________ .",
          blankPosition: 1,
          answer: "response",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Mdm Rena called Leila's name but got nothing back.",
              "'Response' = a reply or reaction to a call/question.",
              "Answer: response",
            ],
            tip: "'No response' = no reply. The teacher called but Leila did not answer.",
          },
        },
        {
          id: "mb_2024_eoy_q29",
          qNumber: 29,
          topic: "VocabCloze",
          subtopic: "Comparative Adverb",
          questionText:
            'Mdm Rena called again, (29)__________ this time.',
          blankPosition: 2,
          answer: "louder",
          marks: 1,
          solution: {
            method: "Comparative adverb",
            steps: [
              "Mdm Rena called a second time — presumably with MORE volume since Leila didn't respond.",
              "'Louder' = comparative form of 'loud'; more loudly.",
              "Answer: louder",
            ],
            tip: "When repeating a call that wasn't heard, you call LOUDER (more loudly).",
          },
        },
        {
          id: "mb_2024_eoy_q30",
          qNumber: 30,
          topic: "VocabCloze",
          subtopic: "Verb — Sleeping Sound",
          questionText:
            "Leila (30)__________ something in her sleep as her head jerked awake.",
          blankPosition: 3,
          answer: "mumbled",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Leila was asleep and made sounds — when asleep, people mumble.",
              "'Mumbled' = spoke unclearly and quietly.",
              "'Rumbled' = made a deep rolling sound (like thunder or a stomach). Context: she said 'something' → sounds like speech → mumbled.",
              "Answer: mumbled",
            ],
            tip: "'Mumble' = to speak unclearly, often quietly. Common when half-asleep.",
          },
        },
        {
          id: "mb_2024_eoy_q31",
          qNumber: 31,
          topic: "VocabCloze",
          subtopic: "Verb — Observation",
          questionText:
            "I wondered if I should have reached over and woken Leila before Mdm Rena (31)__________ she was asleep.",
          blankPosition: 4,
          answer: "noticed",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Mdm Rena saw / became aware that Leila was asleep.",
              "'Noticed' = became aware of / observed something.",
              "Answer: noticed",
            ],
            tip: "'Notice' = to see or become aware of something. 'Before Mdm Rena noticed' = before the teacher saw it.",
          },
        },
        {
          id: "mb_2024_eoy_q32",
          qNumber: 32,
          topic: "VocabCloze",
          subtopic: "Verb — Reply",
          questionText:
            'Leila quickly (32)__________, "Yes, Mdm Rena, I\'m fine."',
          blankPosition: 5,
          answer: "answered",
          marks: 1,
          solution: {
            method: "Context vocabulary",
            steps: [
              "Mdm Rena asked a question; Leila replied.",
              "'Answered' = gave a reply to a question.",
              "Answer: answered",
            ],
            tip: "'Answer' = to reply to a question or call. Leila answered (replied to) Mdm Rena's question.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET B — SECTION F: COMPREHENSION CLOZE (5 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secF",
      name: "Booklet B – Section F: Comprehension Cloze",
      topic: "VocabCloze",
      instructions: "Fill in each blank with a suitable word.",
      marks: 5,
      questionType: "B",
      passage: {
        title: "David's Confused Messages",
        type: "humorous narrative",
        content: `David was playing in the garden while his father tried to cut the grass. "David, will you call Mr Small and ask if I can borrow his garden shears?" said his father. David (33)__________ his head in agreement and went into the house.

"Now, who did Dad want me to call?" David wondered. "Oh yes, it should be Mr Tall." He called Mr Tall and asked him if he could (34)__________ them his garden chairs. "Why do you need my garden chairs?" asked Mr Tall.

"I don't know," replied David. "(35)__________ we're going to have a party." Mr Tall then asked David to call Mrs Green to borrow her table. Instead, David called Mrs Brown to ask for her stable and she asked him why he needed it.

"I don't know," David shrugged his shoulders. "We're having a party and I (36)__________ our garden is too small. We need a (37)__________ space." Mrs Brown agreed immediately.

Adapted from Bonnie and the Beast by Elaine McKay`,
      },
      questions: [
        {
          id: "mb_2024_eoy_q33",
          qNumber: 33,
          topic: "VocabCloze",
          subtopic: "Body Language Verb",
          questionText:
            "David (33)__________ his head in agreement.",
          blankPosition: 1,
          answer: "nodded",
          marks: 1,
          solution: {
            method: "Fixed expression — body language",
            steps: [
              "'Nod your head in agreement' = to move the head up and down to show yes/agreement.",
              "'Nodded his head in agreement' is the natural expression.",
              "Answer: nodded",
            ],
            tip: "'Nod' = move head up and down = yes/agreement. 'Shake' = move head side to side = no.",
          },
        },
        {
          id: "mb_2024_eoy_q34",
          qNumber: 34,
          topic: "VocabCloze",
          subtopic: "Verb — Borrowing",
          questionText:
            "He called Mr Tall and asked him if he could (34)__________ them his garden chairs.",
          blankPosition: 2,
          answer: "lend",
          marks: 1,
          solution: {
            method: "Vocabulary — lend vs. borrow",
            steps: [
              "David's father wanted to BORROW shears. David confused it and asked Mr Tall to LEND (give to use) the chairs.",
              "'Lend' = to give something to someone for temporary use.",
              "'Borrow' = to receive something from someone temporarily.",
              "Answer: lend",
            ],
            tip: "'Lend' = give for temporary use (I lend you my pen). 'Borrow' = take for temporary use (I borrow your pen).",
          },
        },
        {
          id: "mb_2024_eoy_q35",
          qNumber: 35,
          topic: "VocabCloze",
          subtopic: "Adverb/Conjunct of Speculation",
          questionText:
            '"(35)__________ we\'re going to have a party."',
          blankPosition: 3,
          answer: "Maybe",
          marks: 1,
          solution: {
            method: "Adverb of uncertainty",
            steps: [
              "David doesn't know why his father wants the chairs — he guesses it might be for a party.",
              "'Maybe' = perhaps / possibly — expresses uncertainty.",
              "Answer: Maybe",
            ],
            tip: "'Maybe' and 'perhaps' express uncertainty or guessing. David is speculating.",
          },
        },
        {
          id: "mb_2024_eoy_q36",
          qNumber: 36,
          topic: "VocabCloze",
          subtopic: "Verb of Opinion",
          questionText:
            '"We\'re having a party and I (36)__________ our garden is too small."',
          blankPosition: 4,
          answer: "think",
          marks: 1,
          solution: {
            method: "Verb of thinking/opinion",
            steps: [
              "David is expressing his personal belief or estimation.",
              "'Think' = to believe or have an opinion.",
              "Answer: think",
            ],
            tip: "'I think' = I believe/I am of the opinion. Used for personal views or estimates.",
          },
        },
        {
          id: "mb_2024_eoy_q37",
          qNumber: 37,
          topic: "VocabCloze",
          subtopic: "Adjective — Size/Space",
          questionText:
            '"We need a (37)__________ space."',
          blankPosition: 5,
          answer: "big",
          marks: 1,
          solution: {
            method: "Adjective — antonym of 'small'",
            steps: [
              "David says 'our garden is too small' → they need a BIGGER / LARGER space.",
              "'Big' is the simplest antonym of 'small'.",
              "Also acceptable: larger, bigger.",
              "Answer: big",
            ],
            tip: "If the current space is too small, they need a BIG (larger) space. Antonym of small = big.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET B — SECTION G: SENTENCE COMBINING (3 × 1m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secG",
      name: "Booklet B – Section G: Sentence Manipulation – Combining",
      topic: "SentenceCombining",
      instructions:
        "Combine the sentences to make one sentence using the word given. The meaning of the sentence must be the same as the sentences given.",
      marks: 3,
      questionType: "A",
      questions: [
        {
          id: "mb_2024_eoy_q38",
          qNumber: 38,
          topic: "SentenceCombining",
          subtopic: "Before (Sequence)",
          questionText:
            "My brother went to the library to borrow some books. Then he went home.\n\nBefore __________",
          answer:
            "Before my brother went home, he went to the library to borrow some books.",
          marks: 1,
          solution: {
            method: "Combining sequence with 'before'",
            steps: [
              "'Before' introduces the action that happens AFTER in sequence but is stated first.",
              "Sequence: library → home. 'Before going home, he went to library.'",
              "Answer: Before my brother went home, he went to the library to borrow some books.",
            ],
            tip: "'Before A, B' means B happened first, then A. 'Before he went home, he visited the library.'",
          },
        },
        {
          id: "mb_2024_eoy_q39",
          qNumber: 39,
          topic: "SentenceCombining",
          subtopic: "When (Simultaneous/Resulting Action)",
          questionText:
            "The children saw the colourful balloons. They laughed joyfully.\n\n__________ when __________",
          answer:
            "The children laughed joyfully when they saw the colourful balloons.",
          marks: 1,
          solution: {
            method: "Combining with 'when' — cause and immediate response",
            steps: [
              "'When' connects two actions where one triggers the other.",
              "Seeing the balloons caused/coincided with joyful laughter.",
              "Answer: The children laughed joyfully when they saw the colourful balloons.",
            ],
            tip: "'When A happened, B happened' or 'B happened when A happened.'",
          },
        },
        {
          id: "mb_2024_eoy_q40",
          qNumber: 40,
          topic: "SentenceCombining",
          subtopic: "So (Cause and Result)",
          questionText:
            "Stella was going to be late for school. Stella decided to take a taxi.\n\n__________ so __________",
          answer:
            "Stella was going to be late for school so she decided to take a taxi.",
          marks: 1,
          solution: {
            method: "Combining cause and result with 'so'",
            steps: [
              "'So' = therefore/as a result.",
              "Being late → resulted in → taking a taxi.",
              "Answer: Stella was going to be late for school so she decided to take a taxi.",
            ],
            tip: "Cause + so + Result. 'She was going to be late' caused her to take a taxi.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────
    // BOOKLET B — SECTION H: COMPREHENSION OE (10m)
    // ─────────────────────────────────────────

    {
      id: "mb2024_secH",
      name: "Booklet B – Section H: Comprehension Open-Ended",
      topic: "ComprehensionOE",
      instructions:
        "Read and annotate the passage. Answer the questions that follow. Your answers must be based on the passage read.",
      marks: 10,
      questionType: "B",
      passage: {
        title: "UGB — Unidentified Green Baby",
        type: "narrative",
        lineNumbers: true,
        content: `It was Friday afternoon and I was getting ready to go home. However, as a class monitor, I had to check if the classroom was clean before I left. I walked into the classroom and my eyes widened. Chairs and tables were out of place, and pieces of paper were everywhere. Nur and Xiao Ming were supposed to be on duty, but they were nowhere to be found. My hands balled into fists. "I hope they haven't run off home," I muttered to myself.

Just then, Nur and Xiao Ming came into the classroom, giggling.

"John, we went to empty the wastepaper basket and found this box. Guess what's inside it?" Nur held up the box.

Out popped a tiny green head. It was a green baby with a star-shaped antenna on its round head and sparkly silver eyes.

"Isn't it cute?" Nur exclaimed. I gasped and took over the box.

Regaining my composure, I told them to start cleaning the classroom. I played with the baby while Xiao Ming and Nur swept the floor. We did not know what to call it. I decided to name the baby UGB – Unidentified Green Baby. Soon, I heard a growl from its tummy.

"I think UGB is hungry. Let's find something for it to eat," I said.

We all thought hard. Nur suggested to find some milk. Luckily, the lady at the canteen drink stall gave us a bottle of milk when she heard what happened. The UGB finished it within two minutes.

I decided that it was time to find the UGB's parents.

"No!" protested Nur. "The parents dumped the UGB, so it must be that they don't love it. I'm taking it home to stay with me."

"Are you sure about that?" I said. "The UGB's family must be worried. You wouldn't like to be away from your family, would you?"

Adapted from U.G.B by Ho Lee-Ling`,
      },
      questions: [
        {
          id: "mb_2024_eoy_q41",
          qNumber: 41,
          topic: "ComprehensionOE",
          subtopic: "Literal — Reason for Character's Action",
          questionText: "Why was John in the classroom? [1m]",
          answer:
            "John was in the classroom to check if it was clean before he left, as he was the class monitor.",
          marks: 1,
          solution: {
            method: "Locate and retrieve reason",
            steps: [
              "Text: 'as a class monitor, I had to check if the classroom was clean before I left.'",
              "Answer: John was there to check the classroom cleanliness.",
            ],
            tip: "Find the sentence that explains John's duty or reason for being in the classroom.",
          },
        },
        {
          id: "mb_2024_eoy_q42",
          qNumber: 42,
          topic: "ComprehensionOE",
          subtopic: "Emotion — Selected Response",
          questionText:
            "Refer to Paragraph 1 (lines 2–6). How did John feel when he saw the messy classroom? [1m]\n\nTick (✓) your answer.\n□ disappointed\n□ shocked\n□ furious",
          answer: "shocked",
          marks: 1,
          solution: {
            method: "Inference from text evidence",
            steps: [
              "Text: 'I walked into the classroom and my eyes widened.' — widened eyes = shock/surprise.",
              "'My hands balled into fists' = anger, but the first reaction was shock.",
              "The primary emotion shown by 'eyes widened' = shocked.",
              "Answer: shocked",
            ],
            tip: "'Eyes widened' = physical sign of shock or surprise. Choose the emotion that matches this action.",
          },
        },
        {
          id: "mb_2024_eoy_q43",
          qNumber: 43,
          topic: "ComprehensionOE",
          subtopic: "True / False",
          questionText:
            "Read the following sentences. Based on the passage, tick (✓) 'True' or 'False' beside each sentence. [2m]\n\na) John was in the classroom just before the school ended.\nb) John named the baby UGB because he found it ugly.",
          answer: "a) False   b) False",
          marks: 2,
          solution: {
            method: "Verification against text",
            steps: [
              "a) Text: 'It was Friday afternoon and I was getting ready to go home.' → school had ALREADY ended (getting ready to go home). He was not there just before school ended — school was over. → False",
              "b) Text: 'I decided to name the baby UGB – Unidentified Green Baby.' → UGB stands for Unidentified Green Baby, not because it was ugly. → False",
              "Answers: a) False  b) False",
            ],
            tip: "Read carefully — 'just before school ended' is different from 'after school'.",
          },
        },
        {
          id: "mb_2024_eoy_q44",
          qNumber: 44,
          topic: "ComprehensionOE",
          subtopic: "Sequence of Events",
          questionText:
            "Write 1, 2 and 3 in the blanks below to indicate the order in which the events occurred in the story. [1m]\n\n___ John went to the classroom.\n___ The three children went to the canteen.\n___ Xiao Ming and Nur went to empty the wastepaper basket.",
          answer:
            "John went to classroom: 1 | Three children went to canteen: 3 | Xiao Ming and Nur went to empty basket: 2",
          marks: 1,
          solution: {
            method: "Chronological sequence",
            steps: [
              "1 — John went to the classroom (para 1: 'I walked into the classroom…').",
              "2 — Nur and Xiao Ming went to empty wastepaper basket (para 3: 'we went to empty the wastepaper basket').",
              "3 — Three children went to canteen (para 7: '…the lady at the canteen drink stall gave us a bottle of milk').",
              "Answer: Classroom=1, Empty basket=2, Canteen=3",
            ],
            tip: "Follow the story's timeline paragraph by paragraph.",
          },
        },
        {
          id: "mb_2024_eoy_q45",
          qNumber: 45,
          topic: "ComprehensionOE",
          subtopic: "Pronoun Reference",
          questionText:
            "What does the word 'it' in line 20 refer to? [1m]\n\nIt refers to the __________.",
          answer: "bottle of milk (that the lady at the canteen drink stall gave them)",
          marks: 1,
          solution: {
            method: "Pronoun reference",
            steps: [
              "Line 20: 'The UGB finished it within two minutes.'",
              "What did UGB finish? The bottle of milk they got from the canteen lady.",
              "Answer: bottle of milk",
            ],
            tip: "Look at what was most recently mentioned before 'it' — the bottle of milk.",
          },
        },
        {
          id: "mb_2024_eoy_q46",
          qNumber: 46,
          topic: "ComprehensionOE",
          subtopic: "True / False with Reason",
          questionText:
            "State whether each sentence below is True or False. Give a reason. [2m]\n\na. John was angry with Nur and Xiao Ming when he thought that they had gone home without cleaning the classroom.\nb. The children bought a bottle of milk for the UGB.",
          answer:
            "a) True — John's hands balled into fists and he muttered 'I hope they haven't run off home', showing his anger.\nb) False — The lady at the canteen drink stall GAVE (donated) them a bottle of milk; they did not buy it.",
          marks: 2,
          solution: {
            method: "True/False with textual justification",
            steps: [
              "a) Text: 'My hands balled into fists. \"I hope they haven't run off home,\" I muttered.' → Balling fists = anger. → True. Reason: his hands balled into fists / he muttered angrily.",
              "b) Text: 'the lady at the canteen drink stall gave us a bottle of milk' → she GAVE it (free), not sold it. → False. Reason: the canteen lady gave them the milk for free.",
            ],
            tip: "Give a reason directly from the text. For False answers, explain what actually happened.",
          },
        },
        {
          id: "mb_2024_eoy_q47",
          qNumber: 47,
          topic: "ComprehensionOE",
          subtopic: "Character Trait with Evidence",
          questionText:
            "a. Based on the passage, which adjective would you choose to describe John? Put a tick next to the adjective. [1m]\n\nJohn was a __________ boy.\n□ clever\n□ friendly\n□ responsible\n\nb. Why do you say so? Give a reason to support your answer. [1m]",
          answer:
            "a) responsible\nb) John was responsible because he did his duty as class monitor to check if the classroom was clean even on a Friday afternoon when he just wanted to go home.",
          marks: 2,
          solution: {
            method: "Character trait with text evidence",
            steps: [
              "a) John checks the classroom despite wanting to go home, takes charge of UGB, decides to find its parents → responsible.",
              "b) Text: 'as a class monitor, I had to check if the classroom was clean before I left.' He fulfils his duty.",
              "Answer: a) responsible  b) He did his duty as class monitor / decided to return UGB to its parents.",
            ],
            tip:
              "Choose the trait that best matches the character's ACTIONS throughout the story. Support with a direct text example.",
          },
        },
      ],
    },
  ],
};

export default paper;
