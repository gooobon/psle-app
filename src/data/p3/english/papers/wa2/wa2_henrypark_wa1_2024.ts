// ============================================================
// HENRY PARK PRIMARY SCHOOL
// 2024 WEIGHTED ASSESSMENT 1 (Term 1)
// ENGLISH LANGUAGE – PRIMARY 3
// Total: 20 marks | Duration: 40 minutes
// Sections: A (Grammar Cloze ×8), B (Sentence Combining ×2), C (Comprehension ×10)
// ============================================================

export type TopicType =
  | "GrammarMCQ"
  | "VocabMCQ"
  | "GrammarCloze"
  | "VocabCloze"
  | "Editing"
  | "SentenceCombining"
  | "VisualText"
  | "ComprehensionMCQ"
  | "ComprehensionOE"
  | "ComprehensionFIB";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

// ─── Type A: Single standalone question ───────────────────
export interface TypeAQuestion {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  question: string;
  answer: string;
  solution: Solution;
}

// ─── Type B: Passage / Set question ───────────────────────
export interface TypeBPassage {
  kind: "B";
  id: string;
  topic: TopicType;
  title: string;
  instructions: string;
  wordBox?: string[];           // for cloze passages
  passage: string;              // passage text; blanks marked as (N)
  questions: TypeBQuestion[];
}

export interface TypeBQuestion {
  id: string;
  questionNumber: number;
  marks: number;
  question: string;
  options?: string[];           // for MCQ
  answer: string;
  solution: Solution;
}

export type Question = TypeAQuestion | TypeBPassage;

// ============================================================
// PAPER DATA
// ============================================================

const paper: {
  school: string;
  level: string;
  subject: string;
  term: string;
  year: number;
  totalMarks: number;
  duration: string;
  questions: Question[];
} = {
  school: "Henry Park Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "2024 Weighted Assessment 1",
  year: 2024,
  totalMarks: 20,
  duration: "40 minutes",
  questions: [

    // ══════════════════════════════════════════════════
    // SECTION A: GRAMMAR CLOZE (8 marks — 4 + 4)
    // ══════════════════════════════════════════════════

    // ── Passage A (Blanks 1–4): Pronouns – Cinema story ──
    {
      kind: "B",
      id: "HPWA1-2024-SEC-A-PASS-A",
      topic: "GrammarCloze",
      title: "Section A – Grammar Cloze: Passage A (4 × 1 mark)",
      instructions:
        "Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only.",
      wordBox: ["he", "I", "she", "they", "we", "you"],
      passage:
        'It was the first day of the school holidays. Max and his sister, Sarah, were at the cinema. They wanted to watch a movie together.\n\n"Which movie shall (1) ________ watch?" asked Max eagerly.\n\n"Do (2) ________ want to watch the latest movie, \'Wonka\'?" suggested Sarah. "My friends watched it yesterday and (3) ________ liked it."\n\nMax agreed and (4) ________ nodded. They joined the queue at the counter to buy the tickets.',
      questions: [
        {
          id: "HPWA1-2024-A-Q1",
          questionNumber: 1,
          marks: 1,
          question: "Which movie shall (1) ________ watch?",
          answer: "we",
          solution: {
            method: "Pronoun reference",
            steps: [
              "The speaker (Max) is asking his sister Sarah — that is two people speaking together.",
              "'We' is the first-person plural pronoun used when the speaker includes themselves and at least one other person.",
              "Both Max and Sarah will watch the movie together, so 'we' is correct.",
            ],
            tip: "Use 'we' when the speaker includes themselves and others in the group.",
          },
        },
        {
          id: "HPWA1-2024-A-Q2",
          questionNumber: 2,
          marks: 1,
          question: "Do (2) ________ want to watch the latest movie, 'Wonka'?",
          answer: "you",
          solution: {
            method: "Pronoun reference",
            steps: [
              "Sarah is asking Max a question — she is speaking directly to him.",
              "When addressing one person directly, use the second-person pronoun 'you'.",
              "The sentence 'Do you want to…' is the correct question form.",
            ],
            tip: "Use 'you' when speaking directly to another person.",
          },
        },
        {
          id: "HPWA1-2024-A-Q3",
          questionNumber: 3,
          marks: 1,
          question: "My friends watched it yesterday and (3) ________ liked it.",
          answer: "they",
          solution: {
            method: "Pronoun reference",
            steps: [
              "The antecedent is 'my friends' — a group of people not including the speaker.",
              "Third-person plural pronoun 'they' replaces a plural noun referring to other people.",
              "'They liked it' correctly continues the sentence.",
            ],
            tip: "Replace plural nouns referring to others (not speaker/listener) with 'they'.",
          },
        },
        {
          id: "HPWA1-2024-A-Q4",
          questionNumber: 4,
          marks: 1,
          question: "Max agreed and (4) ________ nodded.",
          answer: "he",
          solution: {
            method: "Pronoun reference",
            steps: [
              "The subject of the clause is Max — a single male.",
              "Third-person singular masculine pronoun is 'he'.",
              "'He nodded' correctly replaces 'Max nodded' in the same sentence.",
            ],
            tip: "Replace a single male name with 'he'.",
          },
        },
      ],
    },

    // ── Passage B (Blanks 5–8): Verb forms – Sunflower story ──
    {
      kind: "B",
      id: "HPWA1-2024-SEC-A-PASS-B",
      topic: "GrammarCloze",
      title: "Section A – Grammar Cloze: Passage B (4 × 1 mark)",
      instructions:
        "Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only.",
      wordBox: ["grow", "grows", "grew", "growing", "grown", "was growing"],
      passage:
        'Tim is a good gardener. He enjoys (5) ________ sunflowers in his garden.\n\nOne morning, he planted some sunflower seeds given by a kind old lady. The next day, he exclaimed, "Alicia! The sunflowers have (6) ________ so tall!"\n\n"How did they (7) ________ so quickly?" Alicia asked.\n\nTim wondered how the sunflowers (8) ________ overnight. He was amazed. Then he remembered the old woman telling him that they were magic seeds.',
      questions: [
        {
          id: "HPWA1-2024-A-Q5",
          questionNumber: 5,
          marks: 1,
          question: "He enjoys (5) ________ sunflowers in his garden.",
          answer: "growing",
          solution: {
            method: "Gerund after 'enjoys'",
            steps: [
              "The verb 'enjoy' is always followed by a gerund (verb + -ing), not an infinitive.",
              "Pattern: enjoy + verb-ing → 'enjoys growing'.",
              "Other examples: 'enjoys playing', 'enjoys reading'.",
            ],
            tip: "After verbs like enjoy, like, love, hate → use verb + -ing (gerund).",
          },
        },
        {
          id: "HPWA1-2024-A-Q6",
          questionNumber: 6,
          marks: 1,
          question: "The sunflowers have (6) ________ so tall!",
          answer: "grown",
          solution: {
            method: "Present perfect tense (have + past participle)",
            steps: [
              "The auxiliary verb 'have' signals the present perfect tense.",
              "Present perfect = have/has + past participle.",
              "Past participle of 'grow' is 'grown' (irregular verb: grow → grew → grown).",
            ],
            tip: "With 'have/has', always use the past participle form. Grow → grown.",
          },
        },
        {
          id: "HPWA1-2024-A-Q7",
          questionNumber: 7,
          marks: 1,
          question: "How did they (7) ________ so quickly?",
          answer: "grow",
          solution: {
            method: "Base form after auxiliary 'did'",
            steps: [
              "The auxiliary verb 'did' is used to form past tense questions.",
              "After 'did', the main verb must return to its base (infinitive) form — not past tense.",
              "Correct: 'How did they grow?' NOT 'How did they grew?'",
            ],
            tip: "After 'did / didn't / do / does', always use the base form of the verb.",
          },
        },
        {
          id: "HPWA1-2024-A-Q8",
          questionNumber: 8,
          marks: 1,
          question: "Tim wondered how the sunflowers (8) ________ overnight.",
          answer: "grew",
          solution: {
            method: "Simple past tense",
            steps: [
              "The main verb 'wondered' is in the simple past tense, setting a past time frame.",
              "The subordinate clause reports a past action that happened at the same time.",
              "Simple past of 'grow' is 'grew' (irregular).",
              "There is no auxiliary in this clause, so the full past form 'grew' is needed.",
            ],
            tip: "In a past-tense narrative without an auxiliary, use the simple past form. Grow → grew.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION B: SENTENCE COMBINING (2 marks)
    // ══════════════════════════════════════════════════

    {
      kind: "A",
      id: "HPWA1-2024-B-Q9",
      topic: "SentenceCombining",
      marks: 1,
      question:
        "Rewrite the following pair of sentences as ONE sentence without changing the original meaning.\n\nJason was cycling at the park. Jason saw his teacher.\n\nWhen ___________________________________________",
      answer: "When Jason was cycling at the park, he saw his teacher.",
      solution: {
        method: "Subordinating conjunction 'When' + pronoun replacement",
        steps: [
          "The starter word 'When' tells us to use a time clause: 'When + [first action], [second action]'.",
          "First action (ongoing): Jason was cycling at the park → becomes the 'When' clause.",
          "Second action (event): Jason saw his teacher → main clause, replace 'Jason' with 'he' to avoid repetition.",
          "Full sentence: 'When Jason was cycling at the park, he saw his teacher.'",
          "A comma separates the subordinate clause from the main clause.",
        ],
        tip: "When + [background action], [main event]. Replace the repeated name with a pronoun.",
      },
    },

    {
      kind: "A",
      id: "HPWA1-2024-B-Q10",
      topic: "SentenceCombining",
      marks: 1,
      question:
        "Rewrite the following pair of sentences as ONE sentence without changing the original meaning.\n\nAli likes chocolate milk. Juliet also likes chocolate milk.\n\nBoth ___________________________________________",
      answer: "Both Ali and Juliet like chocolate milk.",
      solution: {
        method: "Correlative conjunction 'Both … and …'",
        steps: [
          "The starter word 'Both' signals the correlative conjunction structure: Both [A] and [B] + [shared predicate].",
          "The two subjects (Ali, Juliet) are joined: 'Both Ali and Juliet'.",
          "The shared predicate is 'like chocolate milk'. Note: 'Both … and …' takes a plural verb — 'like' (not 'likes').",
          "Full sentence: 'Both Ali and Juliet like chocolate milk.'",
        ],
        tip: "'Both A and B' is always plural → use plural verb form (like, play, eat).",
      },
    },

    // ══════════════════════════════════════════════════
    // SECTION C: COMPREHENSION (10 marks)
    // Passage: The Kingfisher at the Nature Park
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "HPWA1-2024-SEC-C-PASSAGE",
      topic: "ComprehensionOE",
      title: "Section C – Comprehension (10 marks)",
      instructions:
        "Read the passage below and answer questions 11 to 19.",
      passage:
        "It was a cool breezy day. The family was at the nature park. As soon as they entered the park, they could hear birds chirping and leaves rustling. The children saw a monitor lizard swimming lazily in the water.\n\n\"I can't wait to see a crocodile,\" Amelia squealed, jumping up and down.\n\nHer brother, Ben, covered his ears and frowned. \"Don't scream, Amelia. Dad told us not to frighten the birds or destroy their nests,\" he reminded her. He hoped to see a kingfisher.\n\nSuddenly, Ben stopped walking. He had spotted a bird on the branch of a tree. He looked through his binoculars. Then he whispered, \"It's a kingfisher.\"\n\nAmelia gripped his arm and squinted. \"Where?\" she yelled. She had forgotten what their father had told them. Startled, the bird flapped its wings and flew off. When Amelia realised what she had done, tears welled up in her eyes. She wiped them away and said softly, \"I'm sorry, Ben.\" She knew that she had frightened it away.\n\nBen felt disappointed, but he gave his sister a hug to comfort her. Kindly, he said, \"It's all right, Amelia.\"\n\nSuddenly, Amelia tapped her brother on his shoulder. She kept very quiet and did not make a sound. She pointed to something shiny in the water. Ben and Amelia stared at the water. As fast as lightning, a kingfisher dived into the water and caught a fish. Ben was thrilled!\n\n\"Well done, little sister,\" Ben said. Amelia smiled proudly at her big brother.",
      questions: [
        {
          id: "HPWA1-2024-C-Q11",
          questionNumber: 11,
          marks: 1,
          question:
            "The family heard sounds of ________ and leaves rustling when they entered the park.\n(1) wind howling\n(2) birds chirping\n(3) water splashing",
          options: ["wind howling", "birds chirping", "water splashing"],
          answer: "(2) birds chirping",
          solution: {
            method: "Literal comprehension — locate evidence in text",
            steps: [
              "Find the relevant sentence in paragraph 1: 'they could hear birds chirping and leaves rustling'.",
              "The question asks what they heard alongside 'leaves rustling'.",
              "The text clearly states 'birds chirping' — option (2) is correct.",
            ],
            tip: "For fill-in-the-blank MCQ, find the exact words in the passage that match.",
          },
        },
        {
          id: "HPWA1-2024-C-Q12",
          questionNumber: 12,
          marks: 1,
          question:
            "Ben wanted to see a ________ that day.\n(1) crocodile\n(2) kingfisher\n(3) monitor lizard",
          options: ["crocodile", "kingfisher", "monitor lizard"],
          answer: "(2) kingfisher",
          solution: {
            method: "Literal comprehension",
            steps: [
              "Find what Ben hoped to see: 'He hoped to see a kingfisher.' (paragraph 3).",
              "Note: Amelia wanted to see a crocodile — do not confuse the two characters.",
              "Answer is (2) kingfisher.",
            ],
            tip: "Pay attention to which character the question is asking about — Ben, not Amelia.",
          },
        },
        {
          id: "HPWA1-2024-C-Q13",
          questionNumber: 13,
          marks: 1,
          question:
            "Write 1, 2 and 3 in the boxes to show the sequence of events that happened in the passage.\n\n[ ] Ben forgave Amelia for frightening the bird away.\n[ ] Ben reminded Amelia about their Dad's instructions.\n[ ] Ben praised Amelia for being quiet and not frightening the bird.",
          answer: "2, 1, 3",
          solution: {
            method: "Sequencing / narrative order",
            steps: [
              "Event A – 'Ben reminded Amelia': paragraph 3 — Ben says 'Don't scream, Amelia. Dad told us not to frighten the birds.' → this happens FIRST (2).",
              "Event B – 'Ben forgave Amelia': paragraph 6 — after Amelia scared away the kingfisher, Ben hugged her and said 'It's all right.' → this happens SECOND (1).",
              "Event C – 'Ben praised Amelia': paragraph 8 — after Amelia quietly pointed out the kingfisher, Ben said 'Well done, little sister.' → this happens LAST (3).",
              "Sequence: Reminded (2) → Forgave (1) → Praised (3).",
            ],
            tip: "Read each event carefully and locate them in order across the paragraphs.",
          },
        },
        {
          id: "HPWA1-2024-C-Q14",
          questionNumber: 14,
          marks: 1,
          question:
            "True or False: Amelia spotted the kingfisher first.",
          answer: "False",
          solution: {
            method: "True/False — evidence from passage",
            steps: [
              "Find who spotted the kingfisher first: 'Ben stopped walking. He had spotted a bird… Then he whispered, \"It's a kingfisher.\"'",
              "Ben spotted it first, not Amelia.",
              "Statement is FALSE.",
            ],
            tip: "Check the text carefully before marking True/False — never guess.",
          },
        },
        {
          id: "HPWA1-2024-C-Q15",
          questionNumber: 15,
          marks: 1,
          question:
            "True or False: Amelia yelled loudly and frightened the kingfisher away.",
          answer: "True",
          solution: {
            method: "True/False — evidence from passage",
            steps: [
              "'Where?' she yelled. … Startled, the bird flapped its wings and flew off.",
              "'When Amelia realised what she had done… She knew that she had frightened it away.'",
              "Statement is TRUE.",
            ],
            tip: "Both conditions must match — she yelled (loud) AND the bird flew off (frightened away).",
          },
        },
        {
          id: "HPWA1-2024-C-Q16",
          questionNumber: 16,
          marks: 1,
          question:
            "Which word, (A) or (B), in the sentence below from paragraph 5 tells you that Amelia tried to strain her eyes to see clearly? Circle either (A) or (B).\n\nAmelia (A) gripped his arm and (B) squinted.",
          answer: "(B) squinted",
          solution: {
            method: "Vocabulary in context — word meaning",
            steps: [
              "'Squinted' means to look with eyes partly closed, straining to see something.",
              "'Gripped' means to hold tightly — this is about physical holding, not vision.",
              "The question asks about straining her eyes to see clearly → (B) squinted.",
            ],
            tip: "Squint = narrow your eyes to try to see something more clearly.",
          },
        },
        {
          id: "HPWA1-2024-C-Q17",
          questionNumber: 17,
          marks: 1,
          question:
            "What does the word 'them' in line 13 refer to?\n\n(Line 13: She wiped them away and said softly, \"I'm sorry, Ben.\")",
          answer: "Amelia's tears",
          solution: {
            method: "Pronoun reference",
            steps: [
              "Find the word 'them' in line 13: 'She wiped them away.'",
              "Look at the sentence just before: 'tears welled up in her eyes.'",
              "'Them' refers to the tears that welled up in Amelia's eyes.",
              "Answer: Amelia's tears.",
            ],
            tip: "For pronoun reference questions, look at the sentence immediately before to find what the pronoun replaces.",
          },
        },
        {
          id: "HPWA1-2024-C-Q18",
          questionNumber: 18,
          marks: 2,
          question:
            "Name two things that their father advised them not to do when observing birds.\n(a) _______________________________\n(b) _______________________________",
          answer:
            "(a) Do not scream / frighten the birds.\n(b) Do not destroy the birds' nests.",
          solution: {
            method: "Literal comprehension — list/extract",
            steps: [
              "Locate Ben's reminder in paragraph 3: 'Dad told us not to frighten the birds or destroy their nests.'",
              "(a) Do not frighten/scream at the birds.",
              "(b) Do not destroy their nests.",
              "Both answers must come from the passage text.",
            ],
            tip: "The word 'or' in the passage separates the two things — pick one on each side of 'or'.",
          },
        },
        {
          id: "HPWA1-2024-C-Q19",
          questionNumber: 19,
          marks: 1,
          question:
            "Write the words that best describe Amelia's behaviour at different parts of the story. Use the words given in the box below.\n\n[ calm ]  [ excited ]\n\nWhen                    | Amelia's behaviour\nAt the start of story  | _______________\nAt the end of story    | _______________",
          answer:
            "At the start of the story: excited\nAt the end of the story: calm",
          solution: {
            method: "Inference — character behaviour",
            steps: [
              "At the start: 'I can't wait to see a crocodile,' Amelia squealed, jumping up and down — she is loud and energetic → EXCITED.",
              "At the end: Amelia tapped her brother on his shoulder. She kept very quiet and did not make a sound → she is quiet and controlled → CALM.",
              "The two given words map directly: excited (start) and calm (end).",
            ],
            tip: "Use evidence from the passage to support your word choice — don't guess.",
          },
        },
      ],
    },
  ],
};

export default paper;
