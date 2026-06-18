// src/data/p3/english/papers/eoy_sthildas_p2_2024.ts
// St. Hilda's Primary School — End-of-Year Examination 2024
// English Language Paper 2 (Booklets A & B) — Primary 3
// Date: 23 October 2024  |  Total: 50 marks (Booklet A: 14, Booklet B: 36)

import { QuestionSet } from "@/types/questions";

export const eoy_sthildas_p2_2024: QuestionSet = {
  id: "eoy_sthildas_p2_2024",
  school: "St. Hilda's Primary School",
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

    // ── Section A: Grammar MCQ (8 marks, Q1–8) ─────────────────────────────
    {
      id: "bookletA_sectionA",
      title: "Section A: Grammar",
      type: "GrammarMCQ",
      marks: 8,
      instructions:
        "Choose the correct answer and shade the correct oval (1, 2, 3 or 4) on the Optical Answer Sheet provided.",
      questions: [
        {
          id: "sthildas_eoy24_A1",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "The basketball team members ____________ proud of themselves because they had won the competition.",
          options: [
            { id: 1, text: "is" },
            { id: 2, text: "are" },
            { id: 3, text: "was" },
            { id: 4, text: "were" },
          ],
          answer: 4,
          solution: {
            method: "Subject-Verb Agreement — Past Tense",
            steps: [
              "'The basketball team members' = plural subject (many members).",
              "'Had won' tells us this is in the past context.",
              "Plural past tense = 'were'. 'Are' = plural present; 'was' = singular past.",
            ],
            tip: "Team MEMBERS (plural) → WERE (plural past). 'Had won' = past → use WAS/WERE not IS/ARE.",
          },
        },
        {
          id: "sthildas_eoy24_A2",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Mrs Lim leaned ____________ and tapped me on my shoulder to get my attention.",
          options: [
            { id: 1, text: "on" },
            { id: 2, text: "over" },
            { id: 3, text: "below" },
            { id: 4, text: "above" },
          ],
          answer: 2,
          solution: {
            method: "Prepositions of Movement/Direction",
            steps: [
              "Mrs Lim 'leaned over' to reach someone shorter or nearby — the action of bending forward/across.",
              "'Leaned over' = bent forward across a distance to reach someone.",
              "'Leaned on' = rested against something; 'below/above' don't follow 'leaned'.",
            ],
            tip: "'Leaned OVER' = bent forward to reach. Think of leaning over a desk to tap someone.",
          },
        },
        {
          id: "sthildas_eoy24_A3",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Jack is angry now. Let us speak to him ____________ he has cooled down.",
          options: [
            { id: 1, text: "but" },
            { id: 2, text: "and" },
            { id: 3, text: "after" },
            { id: 4, text: "before" },
          ],
          answer: 3,
          solution: {
            method: "Conjunctions — Temporal",
            steps: [
              "The sentence means: we should wait until he calms down, then speak to him.",
              "'After he has cooled down' = once the cooling-down has happened.",
              "'Before' would mean speak to him BEFORE he calms down — wrong meaning.",
              "'After' correctly places the speaking chronologically AFTER the cooling down.",
            ],
            tip: "AFTER = once X happens, then Y. 'Speak to him AFTER he cools down' = wait until calm, then speak.",
          },
        },
        {
          id: "sthildas_eoy24_A4",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            '"____________ old magazines in the far corner of the room are a fire hazard," said the librarian.',
          options: [
            { id: 1, text: "Those" },
            { id: 2, text: "These" },
            { id: 3, text: "That" },
            { id: 4, text: "This" },
          ],
          answer: 1,
          solution: {
            method: "Demonstrative Adjectives — Distance + Number",
            steps: [
              "'Magazines' is plural → need plural form (Those/These), not singular (That/This).",
              "The magazines are in 'the far corner' — they are far from the speaker.",
              "Far + plural = 'Those'. Near + plural = 'These'.",
            ],
            tip: "Far away + plural = THOSE. Near + plural = these. Far + singular = that. Near + singular = this.",
          },
        },
        {
          id: "sthildas_eoy24_A5",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            'Rita said, "Happy Birthday, Jane! Wow, these presents must be ____________."',
          options: [
            { id: 1, text: "hers" },
            { id: 2, text: "mine" },
            { id: 3, text: "yours" },
            { id: 4, text: "theirs" },
          ],
          answer: 3,
          solution: {
            method: "Possessive Pronouns",
            steps: [
              "Rita is talking to Jane ('Happy Birthday, Jane!') — so the presents belong to Jane.",
              "Rita is addressing Jane directly → 'yours' (second person possessive pronoun).",
              "'Mine' = Rita's; 'hers' = a third person female's; 'theirs' = a group's.",
            ],
            tip: "Rita is talking TO Jane → the presents are Jane's → YOURS (you = Jane). Mine = speaker's; yours = listener's.",
          },
        },
        {
          id: "sthildas_eoy24_A6",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Mrs Wong needs to buy more sugar as there is very ____________ left in the jar.",
          options: [
            { id: 1, text: "few" },
            { id: 2, text: "little" },
            { id: 3, text: "much" },
            { id: 4, text: "some" },
          ],
          answer: 2,
          solution: {
            method: "Quantifiers — Uncountable Nouns",
            steps: [
              "'Sugar' is uncountable → use 'little' or 'much' (not 'few' which is for countable).",
              "'Very little left' = there is hardly any remaining — fits the reason to buy more.",
              "'Some' is positive; 'much' is used in negatives/questions; 'little' fits here.",
            ],
            tip: "SUGAR = uncountable → use LITTLE (not few). 'Very little left' = almost none remaining → need to buy more.",
          },
        },
        {
          id: "sthildas_eoy24_A7",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "We were told to meet in the library, ____________ we?",
          options: [
            { id: 1, text: "weren't" },
            { id: 2, text: "wasn't" },
            { id: 3, text: "didn't" },
            { id: 4, text: "don't" },
          ],
          answer: 1,
          solution: {
            method: "Question Tags",
            steps: [
              "Main clause: 'We were told...' — positive statement, past tense, 'we' subject.",
              "Positive statement → negative tag. Past 'were' → tag uses 'were'.",
              "We + were → tag = 'weren't we?' (negative form of were with subject 'we').",
              "'Wasn't' is for singular (I/he/she/it); 'weren't' is for plural/we/they.",
            ],
            tip: "We WERE (positive past) → tag = WEREN'T we? (negative). Match tense and subject.",
          },
        },
        {
          id: "sthildas_eoy24_A8",
          type: "A",
          topic: "GrammarMCQ",
          marks: 1,
          questionText:
            "Mike was sure that his pet dog ____________ under the sofa.",
          options: [
            { id: 1, text: "hid" },
            { id: 2, text: "hides" },
            { id: 3, text: "is hiding" },
            { id: 4, text: "was hiding" },
          ],
          answer: 4,
          solution: {
            method: "Tense — Reported Thought (Past Continuous)",
            steps: [
              "'Mike was sure' = past tense main verb. The dependent clause must also be past.",
              "The dog was in the process of hiding at that moment = past continuous.",
              "'Was hiding' = past continuous — the action was ongoing at the time Mike was sure.",
              "'Hides' = present; 'hid' = simple past (completed action, less natural here).",
            ],
            tip: "REPORTED THOUGHT: 'Mike was sure [that]...' → the dependent clause uses past tense. The hiding was ONGOING at that time → WAS HIDING (past continuous).",
          },
        },
      ],
    },

    // ── Section B: Vocabulary MCQ (6 marks, Q9–14) ─────────────────────────
    {
      id: "bookletA_sectionB",
      title: "Section B: Vocabulary",
      type: "VocabMCQ",
      marks: 6,
      instructions:
        "Choose the correct answer and shade the correct oval (1, 2, 3 or 4) on the Optical Answer Sheet provided.",
      questions: [
        {
          id: "sthildas_eoy24_B9",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The horses were led into the ____________ to rest in the evening.",
          options: [
            { id: 1, text: "den" },
            { id: 2, text: "cave" },
            { id: 3, text: "stable" },
            { id: 4, text: "kennel" },
          ],
          answer: 3,
          solution: {
            method: "Animal Homes — Vocabulary",
            steps: [
              "A 'stable' is the specific shelter/home for horses.",
              "'Den' = fox/wolf/lion; 'cave' = bats/bears; 'kennel' = dogs.",
              "Only 'stable' is the correct home for horses.",
            ],
            tip: "Horse → STABLE. Dog → kennel. Fox → den. Remember: specific animals have specific homes.",
          },
        },
        {
          id: "sthildas_eoy24_B10",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Although it was my first time at the dentist, I sat down calmly and waited ____________ for my turn.",
          options: [
            { id: 1, text: "frightfully" },
            { id: 2, text: "curiously" },
            { id: 3, text: "excitedly" },
            { id: 4, text: "patiently" },
          ],
          answer: 4,
          solution: {
            method: "Context Clues — Adverb + Tone Match",
            steps: [
              "The person 'sat down calmly' — the overall tone is calm and composed.",
              "'Waited patiently' = waited calmly without complaining — matches 'calmly'.",
              "'Frightfully' contradicts 'calmly'; 'curiously' and 'excitedly' are less related to waiting.",
            ],
            tip: "Sitting CALMLY → waited PATIENTLY. Both describe a composed, undisturbed manner. They match in tone.",
          },
        },
        {
          id: "sthildas_eoy24_B11",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "When Tom heard the dog growling, he was so ____________ that he ran as fast as he could.",
          options: [
            { id: 1, text: "terrified" },
            { id: 2, text: "confused" },
            { id: 3, text: "frustrated" },
            { id: 4, text: "disappointed" },
          ],
          answer: 1,
          solution: {
            method: "Context Clues — Cause and Effect",
            steps: [
              "A growling dog causes fear → Tom ran as fast as he could = extreme fear response.",
              "'Terrified' = extremely frightened — fits running away from a dangerous animal.",
              "'Confused/frustrated/disappointed' do not cause someone to run away in fear.",
            ],
            tip: "Dog growling → running away as fast as possible = TERRIFIED (extreme fear). Other options don't cause running.",
          },
        },
        {
          id: "sthildas_eoy24_B12",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Without his spectacles, Alex is as blind as a ____________.",
          options: [
            { id: 1, text: "bat" },
            { id: 2, text: "bee" },
            { id: 3, text: "bird" },
            { id: 4, text: "bear" },
          ],
          answer: 1,
          solution: {
            method: "Idiomatic Expression / Simile",
            steps: [
              "'As blind as a bat' is a fixed English simile/idiom meaning unable to see well.",
              "Bats have very poor eyesight and navigate using echolocation instead.",
              "The other animals (bee, bird, bear) do not have associated 'blind' idioms.",
            ],
            tip: "'As blind as a BAT' is a fixed idiom. Memorise it — bats are famous for poor eyesight.",
          },
        },
        {
          id: "sthildas_eoy24_B13",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "Devi was full of ____________ when she received the Hildan Award.",
          options: [
            { id: 1, text: "hope" },
            { id: 2, text: "pride" },
            { id: 3, text: "comfort" },
            { id: 4, text: "honesty" },
          ],
          answer: 2,
          solution: {
            method: "Context Clues — Emotion After Achievement",
            steps: [
              "Receiving an award is an achievement → the emotion should be a positive feeling of accomplishment.",
              "'Full of pride' = feeling very proud — the natural emotion after winning an award.",
              "'Hope' is for the future; 'comfort' = ease; 'honesty' = truthfulness — none match winning an award.",
            ],
            tip: "Winning an award → 'full of PRIDE' = very proud. Achievement → pride is the natural emotion.",
          },
        },
        {
          id: "sthildas_eoy24_B14",
          type: "A",
          topic: "VocabMCQ",
          marks: 1,
          questionText:
            "The latecomer was ____________ as she had a valid reason for being late.",
          options: [
            { id: 1, text: "excused" },
            { id: 2, text: "punished" },
            { id: 3, text: "commended" },
            { id: 4, text: "reprimanded" },
          ],
          answer: 1,
          solution: {
            method: "Context Clues — Logical Consequence",
            steps: [
              "She had a 'valid reason' (a good excuse) for being late → she should be let off.",
              "'Excused' = forgiven/let off because of a good reason — correct.",
              "'Punished' and 'reprimanded' = negative consequences, contradicting 'valid reason'.",
              "'Commended' = praised, which is too positive for just being late.",
            ],
            tip: "Valid reason for being late → EXCUSED (forgiven). You are excused = you are not in trouble because your reason is accepted.",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // BOOKLET B
    // ─────────────────────────────────────────────

    // ── Section C: Grammar Cloze (8 marks, Q15–22) ─────────────────────────
    {
      id: "bookletB_sectionC",
      title: "Section C: Grammar Cloze",
      type: "GrammarCloze",
      marks: 8,
      instructions:
        "Read the following two passages carefully. Choose the correct words from the box below. Each word(s) is/are given a letter (A to M). Letter 'I' has been omitted. Write the letter in the blanks provided. EACH WORD CAN BE USED ONLY ONCE.",

      // Passage 1 word box
      passage1WordBox: {
        A: "has tried",
        B: "is trying",
        C: "tries",
        D: "try",
        E: "trying",
        F: "will try",
      },
      passage1Text: `Cass has just bought a plate of chicken rice from the canteen. She (15)_____ many types of chicken rice before but this is the first time she (16)_____ roasted chicken rice. This plate of chicken rice is more delicious than the others she has eaten before.

Cass likes to (17)_____ a variety of food. She always enjoys (18)_____ new dishes. This always makes her happy.`,

      // Passage 2 word box
      passage2WordBox: {
        G: "against",
        H: "inside",
        J: "on",
        K: "under",
        L: "up",
        M: "above",
      },
      passage2Text: `Sea otters are the only mammals that eat sea urchins. To find a sea urchin, a sea otter dives to the seabed. Next, it swims (19)_____ to the water surface. Then, it lies on its back and put a flat stone (20)_____ its stomach.

With its paws, it smashes the sea urchin (21)_____ the flat stone repeatedly. Finally, the otter can enjoy the juicy meat (22)_____ the sea urchin.

A sea otter also snacks on crabs and clams.
Adapted from kids.nationalgeographic.com`,

      answers: {
        15: { letter: "A", word: "has tried" },
        16: { letter: "B", word: "is trying" },
        17: { letter: "D", word: "try" },
        18: { letter: "E", word: "trying" },
        19: { letter: "L", word: "up" },
        20: { letter: "J", word: "on" },
        21: { letter: "G", word: "against" },
        22: { letter: "H", word: "inside" },
      },
      questionsSolutions: [
        {
          id: "sthildas_eoy24_C15",
          blank: 15,
          answer: "A — has tried",
          solution: {
            method: "Grammar Cloze — Present Perfect",
            steps: [
              "'She ___ many types of chicken rice before' = experience up to now.",
              "Present perfect 'has tried' = she has had the experience before now.",
              "'Before' is a keyword for present perfect (past experience up to present).",
            ],
            tip: "Experience up to now + 'before' → PRESENT PERFECT: has tried.",
          },
        },
        {
          id: "sthildas_eoy24_C16",
          blank: 16,
          answer: "B — is trying",
          solution: {
            method: "Grammar Cloze — Present Continuous",
            steps: [
              "'This is the first time she ___ roasted chicken rice.' = she is doing it right now, for the first time.",
              "Present continuous 'is trying' = she is currently trying it.",
              "'Has just bought' and 'this is' confirm it's happening now.",
            ],
            tip: "Happening RIGHT NOW, for the first time → PRESENT CONTINUOUS: is trying.",
          },
        },
        {
          id: "sthildas_eoy24_C17",
          blank: 17,
          answer: "D — try",
          solution: {
            method: "Grammar Cloze — Infinitive After 'likes to'",
            steps: [
              "'Cass likes to ___ a variety of food.' = structure: likes to + base verb.",
              "'Likes to try' = she enjoys trying. The base verb (infinitive) form follows 'to'.",
              "'Tries' is third person present; 'trying' is gerund. Only 'try' (base form) follows 'to'.",
            ],
            tip: "'Likes TO' + BASE VERB. 'She likes to TRY' — not 'tries' or 'trying' after 'to'.",
          },
        },
        {
          id: "sthildas_eoy24_C18",
          blank: 18,
          answer: "E — trying",
          solution: {
            method: "Grammar Cloze — Gerund After 'enjoys'",
            steps: [
              "'She always enjoys ___ new dishes.' = structure: enjoys + gerund (-ing form).",
              "'Enjoys trying' = the gerund follows 'enjoys'.",
              "Verbs like enjoy, love, hate, mind, avoid are always followed by -ing (gerund).",
            ],
            tip: "ENJOYS + GERUND (-ing). 'Enjoys TRYING' — never 'enjoys try' or 'enjoys to try'.",
          },
        },
        {
          id: "sthildas_eoy24_C19",
          blank: 19,
          answer: "L — up",
          solution: {
            method: "Grammar Cloze — Preposition of Direction",
            steps: [
              "'It swims ___ to the water surface' = the otter moves from deep water toward the surface.",
              "'Swims up' = moves upward toward the surface.",
              "'Up' indicates upward direction toward the surface.",
            ],
            tip: "Moving from seabed toward surface = moving UPWARD = swims UP.",
          },
        },
        {
          id: "sthildas_eoy24_C20",
          blank: 20,
          answer: "J — on",
          solution: {
            method: "Grammar Cloze — Preposition of Place",
            steps: [
              "'Put a flat stone ___ its stomach' = the stone is placed on top of the stomach.",
              "'On its stomach' = resting on the surface of the stomach.",
              "'On' indicates position on a surface.",
            ],
            tip: "Stone placed on TOP of stomach = stone is ON its stomach.",
          },
        },
        {
          id: "sthildas_eoy24_C21",
          blank: 21,
          answer: "G — against",
          solution: {
            method: "Grammar Cloze — Preposition of Force",
            steps: [
              "'Smashes the sea urchin ___ the flat stone' = hits the urchin onto/into the stone.",
              "'Against' = in contact with, used when hitting something onto a surface with force.",
              "'Smash against' is a standard collocation meaning to hit forcefully onto.",
            ],
            tip: "'Smash AGAINST' = hit with force onto a surface. The urchin is bashed against the stone to break it.",
          },
        },
        {
          id: "sthildas_eoy24_C22",
          blank: 22,
          answer: "H — inside",
          solution: {
            method: "Grammar Cloze — Preposition of Location",
            steps: [
              "'Enjoy the juicy meat ___ the sea urchin' = the meat is within the urchin's shell.",
              "'Inside the sea urchin' = within the urchin — the meat is interior.",
              "'Inside' = within the interior of something.",
            ],
            tip: "The meat is INSIDE the sea urchin's shell — the otter eats the meat that is on the INSIDE.",
          },
        },
      ],
    },

    // ── Section D: Vocabulary Cloze (6 marks, Q23–28) ──────────────────────
    {
      id: "bookletB_sectionD",
      title: "Section D: Vocabulary Cloze",
      type: "VocabCloze",
      marks: 6,
      instructions:
        "Read the following passage carefully. Choose the correct words from the box below. Each word is given a letter (A to H). Write the letter in the blanks provided. EACH WORD CAN BE USED ONLY ONCE.",
      wordBox: {
        A: "delight",
        B: "exclaimed",
        C: "gratitude",
        D: "muttered",
        E: "promise",
        F: "request",
        G: "sparkled",
        H: "winked",
      },
      passageText: `Emily met her friend, Ali, at the park. When Ali gave her a new kite, Emily's eyes (23)_____ with joy. She looked at Ali and (24)_____, "Thank you so much!" Emily knew that saying "Thank you" was a way to show her (25)_____ to Ali.

Pointing to the kite, Emily made a (26)_____ to share the kite with him whenever they played. Ali smiled in (27)_____ when he heard that. "You're a great friend," he (28)_____ softly. After that, they set off to play with the new kite together.`,
      answers: {
        23: { letter: "G", word: "sparkled" },
        24: { letter: "B", word: "exclaimed" },
        25: { letter: "C", word: "gratitude" },
        26: { letter: "E", word: "promise" },
        27: { letter: "A", word: "delight" },
        28: { letter: "D", word: "muttered" },
      },
      questionsSolutions: [
        {
          id: "sthildas_eoy24_D23",
          blank: 23,
          answer: "G — sparkled",
          solution: {
            method: "Vocabulary Cloze — Verb (Eyes with Joy)",
            steps: [
              "'Emily's eyes ___ with joy' = her eyes showed her happiness through their appearance.",
              "'Sparkled' = lit up or shone brightly, often used to describe eyes showing delight.",
              "'Eyes sparkled with joy' is a natural colocation meaning eyes brightened with happiness.",
            ],
            tip: "Eyes SPARKLED = lit up/shone brightly from happiness. A common literary expression.",
          },
        },
        {
          id: "sthildas_eoy24_D24",
          blank: 24,
          answer: "B — exclaimed",
          solution: {
            method: "Vocabulary Cloze — Verb of Speech (Excited)",
            steps: [
              "'She ___, Thank you so much!' = she said something with excitement/emotion.",
              "'Exclaimed' = said with strong emotion (excitement, surprise, joy).",
              "'Muttered' = said quietly under breath (negative tone); 'winked' is not speech.",
            ],
            tip: "'Thank you SO MUCH!' with an exclamation mark = excited, emotional speech = EXCLAIMED.",
          },
        },
        {
          id: "sthildas_eoy24_D25",
          blank: 25,
          answer: "C — gratitude",
          solution: {
            method: "Vocabulary Cloze — Abstract Noun",
            steps: [
              "'Saying Thank you was a way to show her ___ to Ali.' = the feeling expressed by saying thank you.",
              "'Gratitude' = thankfulness — the emotion behind saying thank you.",
              "'Promise' and 'request' are actions not emotions; 'delight' = happiness, not thankfulness.",
            ],
            tip: "'Thank you' = showing GRATITUDE (thankfulness). Gratitude is what you feel when someone does something nice for you.",
          },
        },
        {
          id: "sthildas_eoy24_D26",
          blank: 26,
          answer: "E — promise",
          solution: {
            method: "Vocabulary Cloze — Noun",
            steps: [
              "'Emily made a ___ to share the kite' = she committed to sharing in the future.",
              "'Promise' = a commitment to do something — she pledged to share.",
              "'Request' = asking for something (she isn't asking, she's committing).",
            ],
            tip: "Made a PROMISE = committed to doing something. 'Made a promise to share' = pledged to share.",
          },
        },
        {
          id: "sthildas_eoy24_D27",
          blank: 27,
          answer: "A — delight",
          solution: {
            method: "Vocabulary Cloze — Noun (Emotion)",
            steps: [
              "'Ali smiled in ___' = he smiled because of a positive emotion.",
              "'Delight' = great pleasure/joy — Ali is happy about Emily's promise.",
              "'Gratitude' already used; 'delight' fits the sense of being very pleased.",
            ],
            tip: "'Smiled in DELIGHT' = smiled with great joy/pleasure. Ali is delighted by Emily's kind promise.",
          },
        },
        {
          id: "sthildas_eoy24_D28",
          blank: 28,
          answer: "D — muttered",
          solution: {
            method: "Vocabulary Cloze — Verb of Speech (Quiet)",
            steps: [
              "'You're a great friend,' he ___ softly.' = he said this quietly, gently.",
              "'Muttered' = said in a low, quiet voice — fits 'softly'.",
              "'Exclaimed' already used and means loudly, not softly. 'Winked' is not speech.",
            ],
            tip: "Said SOFTLY = spoke quietly = MUTTERED. Muttered is usually quiet/under breath speech.",
          },
        },
      ],
    },

    // ── Section E: Editing for SPG (6 marks, Q29–34) ───────────────────────
    {
      id: "bookletB_sectionE",
      title: "Section E: Editing for SPG",
      type: "Editing",
      marks: 6,
      instructions:
        "Each of the underlined words contains either a spelling or grammatical error. Wrong or missing punctuation is shown by a circle at the place where it should be. Put the correct punctuation mark, spelling or form of the underlined word in each of the boxes provided.",
      passageText: `Ann spends her weekends at the animal shelter. She likes play (29)_____ with puppies and kittens. Her room is filled with pictures off (30)_____ her favourite animals: fluffy rabbits (31)_____ or colourful birds. (32)_____

Ann hoped (32) to become a doctor for animals one day so that she could help injured and sick animals get well. She belives (33)_____ every animal deserves (34)_____ attention, love and care. She is ready to lend a helping hand to animals.`,
      questions: [
        {
          id: "sthildas_eoy24_E29",
          blank: 29,
          type: "grammar",
          errorWord: "play",
          correctWord: "playing",
          context: "She likes play with puppies and kittens.",
          answer: "playing",
          solution: {
            method: "Editing — Grammar (Gerund after 'likes')",
            steps: [
              "'She likes play' is incorrect. 'Likes' must be followed by 'playing' (gerund) or 'to play'.",
              "Standard form: 'likes playing' or 'likes to play'.",
              "The answer key shows Q29 = 'playing'.",
            ],
            tip: "LIKES + GERUND: 'She likes PLAYING' (not 'likes play'). Same rule as enjoys/loves.",
          },
        },
        {
          id: "sthildas_eoy24_E30",
          blank: 30,
          type: "grammar",
          errorWord: "off",
          correctWord: "of",
          context: "filled with pictures off her favourite animals",
          answer: "of",
          solution: {
            method: "Editing — Grammar (Preposition)",
            steps: [
              "'Pictures off her favourite animals' → 'off' means away from (a direction), not possession.",
              "The correct word is 'of' = pictures belonging to / showing her animals.",
              "'Pictures OF' = pictures showing/depicting.",
            ],
            tip: "PICTURES OF animals = pictures showing them. 'Off' = away from (direction), not used here.",
          },
        },
        {
          id: "sthildas_eoy24_E31",
          blank: 31,
          type: "punctuation",
          errorType: "missing comma",
          correctAnswer: ",",
          context: "fluffy rabbits (circle) or colourful birds",
          answer: ",",
          solution: {
            method: "Editing — Punctuation (Serial Comma)",
            steps: [
              "In a list, items are separated by commas: 'fluffy rabbits, or colourful birds'.",
              "A comma is needed after 'rabbits' before 'or' in this list of animal types.",
              "The circle in the original shows where the missing punctuation should be placed.",
            ],
            tip: "In lists, use a comma before 'or': 'rabbits, or birds'. Missing comma after 'rabbits'.",
          },
        },
        {
          id: "sthildas_eoy24_E32",
          blank: 32,
          type: "grammar",
          errorWord: "hoped",
          correctWord: "hopes",
          context: "Ann hoped to become a doctor for animals one day",
          answer: "hopes",
          solution: {
            method: "Editing — Grammar (Tense — Present)",
            steps: [
              "The passage is written in present tense throughout ('spends', 'likes', 'is filled').",
              "'Ann hoped' is past tense — inconsistent with the rest of the passage.",
              "Correct: 'Ann hopes' (present simple, consistent with the passage tense).",
            ],
            tip: "Check the tense of the whole passage. If everything is present → use PRESENT tense: 'hopes' not 'hoped'.",
          },
        },
        {
          id: "sthildas_eoy24_E33",
          blank: 33,
          type: "spelling",
          errorWord: "belives",
          correctWord: "believes",
          answer: "believes",
          solution: {
            method: "Editing — Spelling",
            steps: [
              "'Belives' is a misspelling of 'believes'.",
              "Correct spelling: b-e-l-i-e-v-e-s.",
              "Remember: 'believe' contains 'lie' in the middle: be-LIE-ve.",
            ],
            tip: "BELIEVES: be + LIE + ves. There's a 'lie' hidden in 'believe'. Not 'belive' or 'belives'.",
          },
        },
        {
          id: "sthildas_eoy24_E34",
          blank: 34,
          type: "punctuation",
          errorType: "missing comma",
          correctAnswer: ",",
          context: "every animal deserves (circle) attention, love and care",
          answer: ",",
          solution: {
            method: "Editing — Punctuation (Comma in List)",
            steps: [
              "The list is 'attention, love and care' — a comma should follow 'deserves' before 'attention'.",
              "Actually, reviewing context: the missing punctuation is after 'deserves' introducing the list.",
              "The answer key confirms: Q34 = comma (,).",
            ],
            tip: "When introducing a list, a comma may be needed. Check the answer key: Q34 = comma.",
          },
        },
      ],
    },

    // ── Section F: Comprehension 1 (8 marks, Q35–41) ───────────────────────
    {
      id: "bookletB_sectionF",
      title: "Section F: Comprehension 1",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read this passage and answer questions 35 to 41.",
      passageTitle: "Lost at Gardens by the Bay",
      passageText: `Ben visited Singapore with his family. They were excited to explore Singapore. They had gone to the Bedok neighbourhood and Our Tampines Hub. On Saturday, they decided to visit Gardens by the Bay.

As they strolled through the lush gardens filled with colourful plants, Ben wandered off to take a closer look at some gardeners watering the plants. Suddenly, he realised he had wandered too far from his parents and could not see them. Fear set in as he looked anxiously for them.

Just then, one of the security guards on duty noticed Ben looking lost. "Are you alright?" he asked kindly. "I can't find my parents," Ben replied, trembling slightly. The security guard comforted him, "Let's go to the information desk to ask for help." Ben nodded, thankful for the help.

Ben followed him to the information desk where an announcement was made for Ben's parents. Soon, Ben's parents rushed over, relieved to find him safe.

"We were worried, Ben!" his mother exclaimed, hugging him tightly. "Sorry," Ben replied sheepishly. His father smiled and ruffled his hair. "Just remember to stay close to us next time," Ben's father added.

Ben learnt his lesson and vowed to be more careful. As they continued with their visit, Ben held on tightly to his parents' hands.`,
      questions: [
        {
          id: "sthildas_eoy24_F35",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "In paragraph 1, Ben and his parents decided to visit ____________ on the weekend. (Tick your chosen answer.)\n☐ Our Tampines Hub\n☐ Gardens by the Bay\n☐ Bedok neighbourhood",
          answer: "Gardens by the Bay",
          solution: {
            method: "Literal Comprehension — Information Retrieval",
            steps: [
              "Paragraph 1: 'On Saturday, they decided to visit Gardens by the Bay.'",
              "Saturday is the weekend. The answer is Gardens by the Bay.",
              "Our Tampines Hub and Bedok are where they went previously, not on Saturday.",
            ],
            tip: "Find what they decided to visit ON SATURDAY (weekend). 'Gardens by the Bay' is the Saturday destination.",
          },
        },
        {
          id: "sthildas_eoy24_F36",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: 'The word "them" in line 7 refers to ____________.',
          options: [
            { id: 1, text: "Ben's parents" },
            { id: 2, text: "security guards on duty" },
            { id: 3, text: "gardeners at the garden" },
          ],
          answer: 1,
          solution: {
            method: "Pronoun Reference",
            steps: [
              "Line 7: 'he looked anxiously for them.' — who was Ben looking for?",
              "He had separated from his PARENTS and couldn't see them.",
              "'Them' refers back to Ben's parents who he had lost sight of.",
            ],
            tip: "Always find what the pronoun refers back to. Ben lost sight of his PARENTS → 'them' = his parents.",
          },
        },
        {
          id: "sthildas_eoy24_F37",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Based on paragraph 3, tick (✓) the feeling to show how Ben felt when the security guard first spoke to him.\n☐ grateful / ☐ eager / ☐ fearful / ☐ disappointed",
          answer: "fearful",
          solution: {
            method: "Inference from Character's Actions",
            steps: [
              "When the guard spoke to Ben, he replied while 'trembling slightly' = shaking from fear.",
              "'Fearful' = frightened — trembling is a physical sign of fear.",
              "'Grateful' came later after the help; 'eager' and 'disappointed' don't match trembling.",
            ],
            tip: "TREMBLING = shaking from fear → Ben was FEARFUL when the guard first spoke to him.",
          },
        },
        {
          id: "sthildas_eoy24_F38",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Write 1, 2 and 3 in the blanks below to show what Ben did in the correct sequence.\n___ Ben held on to his parents' hands tightly.\n___ Ben wandered off on his own.\n___ Ben followed the security guard.",
          answer: "3 — Ben held on to his parents' hands tightly. / 1 — Ben wandered off on his own. / 2 — Ben followed the security guard.",
          solution: {
            method: "Sequencing — Text Evidence",
            steps: [
              "First (1): Ben wandered off on his own (paragraph 2) — this started the problem.",
              "Second (2): Ben followed the security guard to the information desk (paragraph 3-4).",
              "Third (3): Ben held on tightly to his parents' hands (last paragraph) — after reunion.",
            ],
            tip: "Follow the story chronologically: wandered off → followed guard → held parents' hands = 1, 2, 3.",
          },
        },
        {
          id: "sthildas_eoy24_F39",
          type: "A",
          topic: "ComprehensionFIB",
          marks: 2,
          questionText:
            "Based on the story, tick whether each statement in the table below is true or false:\n(a) Colourful plants filled the lush gardens.\n(b) A gardener on duty spotted Ben looking lost.",
          answer: "(a) True / (b) False",
          solution: {
            method: "True/False — Text Evidence",
            steps: [
              "(a) Paragraph 2: 'lush gardens filled with colourful plants' → TRUE.",
              "(b) Paragraph 3: A SECURITY GUARD (not a gardener) noticed Ben looking lost → FALSE.",
              "Ben wandered off looking at GARDENERS watering plants, but it was the SECURITY GUARD who helped.",
            ],
            tip: "(a) Find 'colourful plants' in the passage → TRUE. (b) It was the SECURITY GUARD not a gardener → FALSE.",
          },
        },
        {
          id: "sthildas_eoy24_F40",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Pick out a word from lines 12–14 which shows that the parents were no longer worried.",
          answer: "relieved",
          solution: {
            method: "Vocabulary Retrieval",
            steps: [
              "Lines 12-14 (paragraph 4): 'Ben's parents rushed over, relieved to find him safe.'",
              "'Relieved' = no longer worried/anxious — the worry is gone now that Ben is found.",
              "It directly states parents were 'relieved' — no longer worried.",
            ],
            tip: "RELIEVED = no longer worried. Parents were relieved when they found Ben safe.",
          },
        },
        {
          id: "sthildas_eoy24_F41",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Based on paragraph 5, who 'smiled and ruffled his hair' (line 16)?",
          answer: "Ben's father",
          solution: {
            method: "Literal Comprehension — Pronoun Resolution",
            steps: [
              "Paragraph 5, line 16: 'His father smiled and ruffled his hair.'",
              "The subject of 'smiled and ruffled his hair' = 'His father' = Ben's father.",
            ],
            tip: "Re-read the sentence: 'His FATHER smiled and ruffled his hair.' The father did both actions.",
          },
        },
      ],
    },

    // ── Section G: Comprehension 2 (8 marks, Q42–47) ───────────────────────
    {
      id: "bookletB_sectionG",
      title: "Section G: Comprehension 2",
      type: "ComprehensionOE",
      marks: 8,
      instructions: "Read this passage and answer questions 42 to 47.",
      passageTitle: "John and the Toothpaste",
      passageText: `"Get ready for bed quickly!" Mother called out to John. She was still washing the dishes after their dinner. John looked at himself in the wall mirror and repeated his mother's words while shaking a finger at his reflection. It made him laugh.

Ignoring his mother's instruction, he picked up a tube of toothpaste. He only meant to squeeze a tiny amount onto his toothbrush but cheekiness gave him courage. Instead, he squeezed hard and a minty snake appeared on his toothbrush. "Eew!" John cried out in disgust.

He had squeezed the tube really hard and the toothpaste looked like a white snake slithering up the toothbrush handle. He shook his toothbrush and the toothpaste flew off the toothbrush and into the sink. John squeezed the tube again to spell his name out across the sink.

"John!" Mother yelled. "Are you in bed yet?" John came to his senses and looked at the empty tube of toothpaste. The sink was covered with toothpaste. Hurriedly, John began scooping up the toothpaste and wanted to push it back into the tube but to no avail.

He could hear Mother's footsteps coming up the stairs, closer and closer. John knew what was going to happen next and his face turned as white as a sheet.

Adapted from https://home.oxfordowl.co.uk`,
      questions: [
        {
          id: "sthildas_eoy24_G42",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: "Where was Mother when she first called out to John?",
          answer: "Mother was in the kitchen (washing the dishes after their dinner).",
          solution: {
            method: "Literal Comprehension",
            steps: [
              "Paragraph 1: 'She was still washing the dishes after their dinner.'",
              "Washing dishes = she was in the kitchen.",
              "Write a complete sentence: 'Mother was in the kitchen, washing the dishes.'",
            ],
            tip: "Washing dishes = in the KITCHEN. The answer key confirms: 'She was in the kitchen.'",
          },
        },
        {
          id: "sthildas_eoy24_G43",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Tick (✓) your chosen answer. The phrase 'cheekiness gave him courage' (lines 6 and 7) suggests that John was ___.\n☐ playful / ☐ sensible / ☐ humorous",
          answer: "playful",
          solution: {
            method: "Inference from Phrase",
            steps: [
              "'Cheekiness' = mischievous boldness; 'gave him courage' = made him daring to do something naughty.",
              "'Playful' = fond of playing/mischief — fits cheekiness and playing with toothpaste.",
              "'Sensible' is the opposite — a sensible child wouldn't do this; 'humorous' is less precise.",
            ],
            tip: "CHEEKINESS = playful boldness. A cheeky, daring attitude = PLAYFUL (not sensible or humorous).",
          },
        },
        {
          id: "sthildas_eoy24_G44",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Based on the story, state whether the statement in the table below is true or false, then give one reason in your own words to support your answer:\n(a) A white snake appeared in the toilet while John was about to brush his teeth.\n(b) John used up all the toothpaste.",
          answer:
            "(a) False — The toothpaste squeezed onto the toothbrush looked like a white snake, but it was not a real snake.\n(b) True — He squeezed the tube again to spell his name and later saw an empty tube of toothpaste.",
          solution: {
            method: "True/False with Reasoning",
            steps: [
              "(a) The passage says 'the toothpaste LOOKED LIKE a white snake slithering up the toothbrush handle' — it was not a real snake. FALSE.",
              "(b) Paragraph 4: 'John came to his senses and looked at the empty tube of toothpaste.' = all used up. TRUE.",
              "Give a reason for each answer in your own words.",
            ],
            tip: "(a) It only LOOKED LIKE a snake — the toothpaste resembled a snake. FALSE + explain it was toothpaste.\n(b) The tube was EMPTY afterwards. TRUE + state the tube was empty as evidence.",
          },
        },
        {
          id: "sthildas_eoy24_G45",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText: 'What does the word "it" in line 15 refer to?',
          answer: "The toothpaste (that was covering the sink).",
          solution: {
            method: "Pronoun Reference",
            steps: [
              "Line 15: 'John began scooping up the toothpaste and wanted to push it back into the tube.'",
              "'It' refers to 'the toothpaste' that he was scooping up.",
            ],
            tip: "Find the noun just before 'it'. 'Scooping up the toothpaste and push IT back' → IT = the toothpaste.",
          },
        },
        {
          id: "sthildas_eoy24_G46",
          type: "A",
          topic: "ComprehensionOE",
          marks: 1,
          questionText:
            "Which four-word phrase from lines 13–16 shows that John realised that he needed to stop messing up the toilet?",
          answer: "came to his senses",
          solution: {
            method: "Phrase Retrieval",
            steps: [
              "Lines 13-16 (paragraph 4): 'John came to his senses and looked at the empty tube.'",
              "'Came to his senses' = suddenly realised the situation and what he had done wrong.",
              "This 4-word phrase shows John realised he needed to stop.",
            ],
            tip: "'CAME TO HIS SENSES' = realised/woke up to what was happening. Count: came (1) to (2) his (3) senses (4) = exactly 4 words.",
          },
        },
        {
          id: "sthildas_eoy24_G47",
          type: "A",
          topic: "ComprehensionOE",
          marks: 2,
          questionText:
            "Complete the table with evidence from the story.\n(i) John was amused. [reason]\n(ii) John was ___. [reason: His mother was coming to check on him.]",
          answer:
            "(i) John repeated his mother's words while shaking a finger at his reflection / it made him laugh.\n(ii) John was anxious / frightened / afraid.",
          solution: {
            method: "Evidence Retrieval + Inference",
            steps: [
              "(i) John was amused = he laughed. Evidence: 'John looked at himself in the wall mirror and repeated his mother's words while shaking a finger at his reflection. It made him laugh.'",
              "(ii) Mother was coming up the stairs and 'John knew what was going to happen next' → he was scared/anxious of getting in trouble. 'His face turned as white as a sheet' = very frightened.",
            ],
            tip: "(i) Find where John laughed or found something funny — paragraph 1.\n(ii) 'Face turned white as a sheet' + mother coming = ANXIOUS/frightened about consequences.",
          },
        },
      ],
    },
  ],
};
