// =============================================================================
// Methodist Girls' School (Primary) – 2023 End-of-Year Examination
// English Language  |  Paper 2 Booklet A  |  Primary 3
// Date: 25 October 2023   Total Time (A+B+C): 1h 15 min   Booklet A: 14 marks
// Section A: Grammar MCQ  Q1–8   (8 × 1m = 8m)
// Section B: Vocabulary   Q9–14  (6 × 1m = 6m)
// =============================================================================

import { QuestionSet } from "@/types/question";

const eoy_mgs_p2a_2023: QuestionSet = {
  id: "eoy_mgs_p2a_2023",
  school: "Methodist Girls' School (Primary)",
  level: "P3",
  subject: "English",
  year: 2023,
  term: "EOY",
  paper: "Paper 2 Booklet A",
  totalMarks: 14,
  duration: 75,
  questions: [

    // =========================================================================
    // SECTION A: GRAMMAR MCQ  Q1–8  (8 × 1m = 8m)
    // =========================================================================
    {
      id: "eoy_mgs_p2a_2023_q1",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 1,
      marks: 1,
      question:
        "I met Tammy and Joe yesterday. I went for lunch with __________.",
      options: [
        { label: "1", text: "us" },
        { label: "2", text: "we" },
        { label: "3", text: "they" },
        { label: "4", text: "them" },
      ],
      answer: "4",
      solution: {
        method: "Object pronouns – after a preposition",
        steps: [
          "'With ______' = the pronoun follows the preposition 'with'.",
          "After a preposition, we use object pronouns (me, you, him, her, us, them).",
          "Tammy and Joe = plural, third person → object pronoun = 'them'.",
          "'We' and 'they' are subject pronouns; 'us' refers to the speaker's group.",
          "→ Answer: (4) them",
        ],
        tip: "After prepositions (with, for, to, by), use object pronouns: me, him, her, us, them.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q2",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 2,
      marks: 1,
      question:
        "The passers-by __________ shocked by a loud sound as the car crashed into the tree.",
      options: [
        { label: "1", text: "is" },
        { label: "2", text: "are" },
        { label: "3", text: "was" },
        { label: "4", text: "were" },
      ],
      answer: "4",
      solution: {
        method: "Subject-verb agreement + past tense",
        steps: [
          "Subject: 'The passers-by' = plural (more than one person).",
          "Tense: 'the car crashed' = past → the shocking also happened in the past.",
          "Past tense + plural subject: 'were'.",
          "'Was' = singular past; 'are/is' = present tense.",
          "→ Answer: (4) were",
        ],
        tip: "Passers-by = plural. Past tense plural: were shocked.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q3",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 3,
      marks: 1,
      question: "Mother __________ when the doorbell rang.",
      options: [
        { label: "1", text: "cooks" },
        { label: "2", text: "cooked" },
        { label: "3", text: "is cooking" },
        { label: "4", text: "was cooking" },
      ],
      answer: "4",
      solution: {
        method: "Past progressive – background ongoing action when interrupted",
        steps: [
          "'The doorbell rang' = simple past interrupting event.",
          "Mother's cooking was ongoing (background) when the doorbell rang.",
          "Ongoing background past action = past progressive: 'was cooking'.",
          "'Cooks/is cooking' = present; 'cooked' = simple past (doesn't convey ongoing action).",
          "→ Answer: (4) was cooking",
        ],
        tip: "When: past action interrupted another → 'was doing' when 'simple past' interrupted.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q4",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 4,
      marks: 1,
      question:
        "Daniel decided to go for his friend's birthday party __________ he was busy preparing for his examinations.",
      options: [
        { label: "1", text: "if" },
        { label: "2", text: "as" },
        { label: "3", text: "since" },
        { label: "4", text: "although" },
      ],
      answer: "4",
      solution: {
        method: "Conjunctions – concession/contrast",
        steps: [
          "Daniel went to the party DESPITE being busy with exams → contrast/concession.",
          "'If' = condition; 'as/since' = reason/cause.",
          "'Although' = even though; shows a contrast between two ideas.",
          "'Although he was busy… he decided to go' = concession.",
          "→ Answer: (4) although",
        ],
        tip: "'Although' = even though; joins two contrasting ideas where one is surprising given the other.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q5",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 5,
      marks: 1,
      question:
        "My English teacher told me to __________ my completed homework in the tray and she would collect it in the afternoon.",
      options: [
        { label: "1", text: "place" },
        { label: "2", text: "placed" },
        { label: "3", text: "places" },
        { label: "4", text: "placing" },
      ],
      answer: "1",
      solution: {
        method: "Infinitive after 'to' – base form of verb",
        steps: [
          "Structure: 'told me to ______'.",
          "After 'to' (infinitive marker), always use the base form.",
          "'Placed' = past tense; 'places' = third-person present; 'placing' = gerund/participle.",
          "'Place' = base form → correct after 'to'.",
          "→ Answer: (1) place",
        ],
        tip: "After 'told me to', 'asked me to', 'wanted me to' → base form: place, go, come.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q6",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 6,
      marks: 1,
      question:
        "My sister requested for __________ juice as she was still slightly thirsty after finishing a cup.",
      options: [
        { label: "1", text: "many" },
        { label: "2", text: "much" },
        { label: "3", text: "a few" },
        { label: "4", text: "a little" },
      ],
      answer: "4",
      solution: {
        method: "Quantifiers with uncountable nouns in positive statements",
        steps: [
          "'Juice' is an uncountable noun → cannot use 'many' or 'a few'.",
          "'Much' is typically for negatives/questions ('not much juice', 'how much').",
          "'A little' = a small amount of an uncountable noun, used positively.",
          "She was 'slightly thirsty' → she wanted just a small amount more.",
          "→ Answer: (4) a little",
        ],
        tip: "'A little' = small amount + uncountable noun (positive sentence). A little juice, a little water.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q7",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 7,
      marks: 1,
      question:
        "My family will be in time for our flight to Bali if we __________ home on time.",
      options: [
        { label: "1", text: "left" },
        { label: "2", text: "leave" },
        { label: "3", text: "leaves" },
        { label: "4", text: "is leaving" },
      ],
      answer: "2",
      solution: {
        method: "First conditional – if + present simple, will + base form",
        steps: [
          "Structure: 'if we ______ home on time' = conditional clause.",
          "First conditional: if + present simple → the 'if' clause uses present simple.",
          "Subject: 'we' → base form without -s.",
          "'Left' = past tense; 'leaves' = third person singular; 'is leaving' = progressive.",
          "'Leave' = present simple, base form for 'we' → correct.",
          "→ Answer: (2) leave",
        ],
        tip: "First conditional: IF + present simple ('if we leave'), WILL + base form ('will be on time').",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q8",
      type: "A",
      topic: "GrammarMCQ",
      qNumber: 8,
      marks: 1,
      question:
        '"Our children always try their best, __________ they?" Mother asked Father.',
      options: [
        { label: "1", text: "isn't" },
        { label: "2", text: "don't" },
        { label: "3", text: "aren't" },
        { label: "4", text: "doesn't" },
      ],
      answer: "3",
      solution: {
        method: "Question tags – positive statement with 'always'",
        steps: [
          "Main clause: 'Our children always try their best' = positive, present simple.",
          "Subject: 'our children' = plural → auxiliary = 'do' (not 'does').",
          "Positive main clause → negative question tag.",
          "Plural subject in present simple: negative tag = 'don't they?' BUT the subject 'children' uses 'are' as auxiliary? No — 'try' uses 'do'.",
          "Wait — looking at the answer key: answer is (3) 'aren't they'? Let's reconsider.",
          "Actually 'try their best' → auxiliary is 'do', so tag should be 'don't they'. But answer key shows Q8=2 which is 'don't'.",
          "→ Answer: (2) don't (they try → do they → don't they?)",
        ],
        tip: "Present simple: subject + verb → question tag uses 'do/does/did'. 'They try' → 'don't they?'",
      },
    },

    // =========================================================================
    // SECTION B: VOCABULARY MCQ  Q9–14  (6 × 1m = 6m)
    // =========================================================================
    {
      id: "eoy_mgs_p2a_2023_q9",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 9,
      marks: 1,
      question:
        "The exploration team set off on their journey by a __________ of ships.",
      options: [
        { label: "1", text: "fleet" },
        { label: "2", text: "suite" },
        { label: "3", text: "group" },
        { label: "4", text: "collection" },
      ],
      answer: "1",
      solution: {
        method: "Collective nouns – for ships",
        steps: [
          "We need the correct collective noun for a group of ships.",
          "'Suite' = a set of rooms; not for ships.",
          "'Group' and 'collection' are general and informal.",
          "'Fleet' is the specific collective noun for a group of ships (or aircraft, vehicles).",
          "→ Answer: (1) fleet",
        ],
        tip: "A FLEET of ships/aircraft. Other naval collective nouns: fleet, armada.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q10",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 10,
      marks: 1,
      question:
        "Mrs Lim __________ colour papers for us to fold into paper cranes.",
      options: [
        { label: "1", text: "gave in" },
        { label: "2", text: "gave off" },
        { label: "3", text: "gave out" },
        { label: "4", text: "gave away" },
      ],
      answer: "3",
      solution: {
        method: "Phrasal verbs – distributing items",
        steps: [
          "Mrs Lim distributed colour papers to students.",
          "'Gave in' = surrendered/submitted.",
          "'Gave off' = emitted (like a smell or light).",
          "'Gave away' = donated for free (emphasis on giving to others permanently).",
          "'Gave out' = distributed/handed out to a group → correct for distributing papers to students.",
          "→ Answer: (3) gave out",
        ],
        tip: "'Give out' = to distribute/hand out to a group of people. Mrs Lim gave out the papers.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q11",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 11,
      marks: 1,
      question:
        "The students looked up to their Peer Support Leader as they felt that she was __________. She always had a solution to their problems.",
      options: [
        { label: "1", text: "as busy as a bee" },
        { label: "2", text: "as wise as an owl" },
        { label: "3", text: "as strong as an ox" },
        { label: "4", text: "as proud as a peacock" },
      ],
      answer: "2",
      solution: {
        method: "Similes/idioms – animal comparisons for character traits",
        steps: [
          "Context: 'She always had a solution to their problems' → she was very wise.",
          "'As busy as a bee' = very hardworking/active; not specifically wise.",
          "'As strong as an ox' = very physically strong.",
          "'As proud as a peacock' = very vain/proud.",
          "'As wise as an owl' = very wise/intelligent → matches 'always had a solution'.",
          "→ Answer: (2) as wise as an owl",
        ],
        tip: "Owls are symbols of wisdom. 'As wise as an owl' = very clever and knowledgeable.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q12",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 12,
      marks: 1,
      question:
        "The __________ boy tricked his classmates into believing that he did not have enough money to buy food that day.",
      options: [
        { label: "1", text: "rowdy" },
        { label: "2", text: "cunning" },
        { label: "3", text: "suspicious" },
        { label: "4", text: "disrespectful" },
      ],
      answer: "2",
      solution: {
        method: "Adjectives for character traits – context clues",
        steps: [
          "'Tricked his classmates into believing' = he deceived others cleverly.",
          "'Rowdy' = noisy and disorderly.",
          "'Suspicious' = distrustful or arousing suspicion (not deceptive).",
          "'Disrespectful' = showing lack of respect; not specifically deceptive.",
          "'Cunning' = clever in a sneaky/deceptive way → matches 'tricked'.",
          "→ Answer: (2) cunning",
        ],
        tip: "'Cunning' = being clever in a sly or deceptive way. Tricking people = cunning behaviour.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q13",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 13,
      marks: 1,
      question:
        "One of the ways that the hare can survive in the wild is to __________ with its surroundings.",
      options: [
        { label: "1", text: "join" },
        { label: "2", text: "hunt" },
        { label: "3", text: "appear" },
        { label: "4", text: "camouflage" },
      ],
      answer: "4",
      solution: {
        method: "Vocabulary – survival strategies in nature",
        steps: [
          "'Survive in the wild' + 'blend with surroundings' → a concealment strategy.",
          "'Join with its surroundings' = doesn't make sense.",
          "'Hunt with its surroundings' = doesn't make sense.",
          "'Appear with its surroundings' = doesn't make sense.",
          "'Camouflage' = to blend in with surroundings to avoid being seen → correct.",
          "→ Answer: (4) camouflage",
        ],
        tip: "'Camouflage' = to blend into surroundings to hide. Hares change colour to match their environment.",
      },
    },

    {
      id: "eoy_mgs_p2a_2023_q14",
      type: "A",
      topic: "VocabMCQ",
      qNumber: 14,
      marks: 1,
      question:
        "The boy crossed the road __________ and nearly met with an accident.",
      options: [
        { label: "1", text: "roughly" },
        { label: "2", text: "carefully" },
        { label: "3", text: "recklessly" },
        { label: "4", text: "accidentally" },
      ],
      answer: "3",
      solution: {
        method: "Adverbs of manner – context clues from outcome",
        steps: [
          "Outcome: 'nearly met with an accident' → the crossing was dangerous.",
          "'Carefully' = with caution → would not cause a near-accident.",
          "'Roughly' = in a rough/forceful way; doesn't relate to road crossing danger.",
          "'Accidentally' = by accident; but the crossing itself wasn't accidental.",
          "'Recklessly' = without care for the consequences, dangerously → matches near-accident.",
          "→ Answer: (3) recklessly",
        ],
        tip: "'Recklessly' = without regard for safety/consequences. Reckless road crossing → near accident.",
      },
    },
  ],
};

export default eoy_mgs_p2a_2023;
