// ============================================================
// RAFFLES GIRLS' PRIMARY SCHOOL
// WEIGHTED ASSESSMENT 1 (2024)
// ENGLISH LANGUAGE – PRIMARY 3
// Total: 15 marks | Duration: 50 minutes
// Sections: A (Comprehension 1 – 7 marks), B (Comprehension 2 – 8 marks)
// ============================================================

export type TopicType =
  | "GrammarMCQ" | "VocabMCQ" | "GrammarCloze" | "VocabCloze"
  | "Editing" | "SentenceCombining" | "VisualText"
  | "ComprehensionMCQ" | "ComprehensionOE" | "ComprehensionFIB";

export interface Solution {
  method: string;
  steps: string[];
  tip: string;
}

export interface TypeAQuestion {
  kind: "A";
  id: string;
  topic: TopicType;
  marks: number;
  question: string;
  answer: string;
  solution: Solution;
}

export interface TypeBPassage {
  kind: "B";
  id: string;
  topic: TopicType;
  title: string;
  instructions: string;
  wordBox?: string[];
  passage: string;
  questions: TypeBQuestion[];
}

export interface TypeBQuestion {
  id: string;
  questionNumber: number;
  marks: number;
  question: string;
  options?: string[];
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
  school: "Raffles Girls' Primary School",
  level: "Primary 3",
  subject: "English Language",
  term: "2024 Weighted Assessment 1",
  year: 2024,
  totalMarks: 15,
  duration: "50 minutes",
  questions: [

    // ══════════════════════════════════════════════════
    // SECTION A: COMPREHENSION 1 (7 marks)
    // Passage: The Nightingale (adapted from Asian Folktales)
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "RGPS-WA1-2024-SEC-A",
      topic: "ComprehensionOE",
      title: "Section A: Comprehension 1 (7 marks)",
      instructions: "Read the passage carefully and answer the questions that follow.",
      passage:
        "Long ago, a beautiful nightingale flew into Mr Wu's garden. It sang so sweetly that anyone who heard it would be attracted to its singing.\n\nMr Wu's daughter, Ling, listened to the nightingale's songs and she fell in love instantly with it. When the evening was over, Ling told her father all about the nightingale's melodious singing. He then captured the nightingale and placed it in a cage in the balcony.\n\nLing wanted to have the nightingale all to herself so she sent her father a toy bird which could sing and dance. He was so fascinated by the toy bird that he forgot all about the nightingale. Ling was glad that her plan worked and hid the nightingale in her room instead.\n\nAfter some time, the toy bird stopped singing and dancing. Mr Wu longed for music so he searched high and low for the nightingale and finally found it in Ling's room. He reprimanded Ling for being selfish. Then he suggested placing the cage in the living room for everyone to enjoy the nightingale's singing.\n\nMr Wu was happy to hear the beautiful singing of the nightingale. He promised to get rid of the toy bird and to take good care of the nightingale forever.\n\nAdapted from Treasury of Asian Folktales retold by Linda Gan",
      questions: [
        {
          id: "RGPS-WA1-2024-A-Q1",
          questionNumber: 1,
          marks: 1,
          question:
            "In paragraph 1, why did everyone fall in love with the nightingale's singing? The nightingale ________.\n\nTick your chosen answer:\n(A) sang very sweetly\n(B) was beautiful\n(C) could dance very well",
          options: ["sang very sweetly", "was beautiful", "could dance very well"],
          answer: "sang very sweetly",
          solution: {
            method: "Literal comprehension — tick correct option",
            steps: [
              "Locate the relevant sentence in paragraph 1: 'It sang so sweetly that anyone who heard it would be attracted to its singing.'",
              "The reason everyone was attracted is because the bird 'sang so sweetly'.",
              "Option A — 'sang very sweetly' — matches the text.",
              "Option B (beautiful) refers to the bird's appearance, not why people fell in love with its singing.",
              "Option C (could dance) is incorrect — only the toy bird could dance.",
            ],
            tip: "The question asks WHY people were attracted — focus on 'attracted to its singing', not its appearance.",
          },
        },
        {
          id: "RGPS-WA1-2024-A-Q2",
          questionNumber: 2,
          marks: 1,
          question:
            "In paragraph 2, which word has the same meaning as 'immediately'?",
          answer: "instantly",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "Locate paragraph 2: 'she fell in love instantly with it.'",
              "'Instantly' means at once / immediately — without any delay.",
              "This is the word in the passage that means the same as 'immediately'.",
            ],
            tip: "Synonyms must be found within the paragraph stated in the question. Scan paragraph 2 for a word meaning 'without delay'.",
          },
        },
        {
          id: "RGPS-WA1-2024-A-Q3",
          questionNumber: 3,
          marks: 1,
          question:
            "Based on paragraphs 2 and 3: True or False?\nMr Wu kept the nightingale in his room.",
          answer: "False",
          solution: {
            method: "True/False — evidence check",
            steps: [
              "Paragraph 2: Mr Wu 'placed it in a cage in the balcony' — not his room.",
              "Paragraph 3: Ling 'hid the nightingale in her room instead' — it went to Ling's room.",
              "The statement says 'his room' (Mr Wu's room) → this is FALSE.",
            ],
            tip: "Mr Wu put it in the balcony; Ling moved it to her room. Neither is 'his room'.",
          },
        },
        {
          id: "RGPS-WA1-2024-A-Q4",
          questionNumber: 4,
          marks: 1,
          question:
            "Based on paragraphs 2 and 3: True or False?\nLing did not enjoy listening to the nightingale's singing.",
          answer: "False",
          solution: {
            method: "True/False — inference",
            steps: [
              "Paragraph 2: 'Ling listened to the nightingale's songs and she fell in love instantly with it.'",
              "Falling in love with the singing shows she ENJOYED it very much.",
              "Statement says she did NOT enjoy — this is FALSE.",
            ],
            tip: "'Fell in love instantly' strongly indicates enjoyment. The statement is the opposite.",
          },
        },
        {
          id: "RGPS-WA1-2024-A-Q5",
          questionNumber: 5,
          marks: 1,
          question:
            "Based on paragraphs 2 and 3: True or False?\nAt first, the nightingale was put in a cage and placed in the balcony.",
          answer: "True",
          solution: {
            method: "True/False — literal check",
            steps: [
              "Paragraph 2: 'He then captured the nightingale and placed it in a cage in the balcony.'",
              "The statement matches exactly — TRUE.",
            ],
            tip: "Read the statement word by word and match each detail to the text.",
          },
        },
        {
          id: "RGPS-WA1-2024-A-Q6",
          questionNumber: 6,
          marks: 2,
          question:
            "From the last paragraph, list 2 things that Mr Wu promised to do to keep the nightingale forever.\n(i) ___________________________\n(ii) ___________________________",
          answer:
            "(i) Get rid of the toy bird.\n(ii) Take good care of the nightingale forever.",
          solution: {
            method: "Literal comprehension — list extraction",
            steps: [
              "Locate the last paragraph: 'He promised to get rid of the toy bird and to take good care of the nightingale forever.'",
              "Two promises are separated by 'and': (i) get rid of the toy bird, (ii) take good care of the nightingale.",
              "Write each promise clearly in a full phrase.",
            ],
            tip: "The word 'and' in a sentence often joins two separate points — look for it when listing 2 things.",
          },
        },
      ],
    },

    // ══════════════════════════════════════════════════
    // SECTION B: COMPREHENSION 2 (8 marks)
    // Passage: Collecting Saga Seeds (adapted)
    // ══════════════════════════════════════════════════

    {
      kind: "B",
      id: "RGPS-WA1-2024-SEC-B",
      topic: "ComprehensionOE",
      title: "Section B: Comprehension 2 (8 marks)",
      instructions: "Read the passage carefully and answer the questions that follow.",
      passage:
        "Back when we did not have any toys, the seeds, flowers and leaves of local plants were our playthings. One of my favourite pastimes was collecting saga seeds. While waiting for our grandmother to pick us up after school, my brother and I would challenge each other to look for the bright red seeds. We did not mind getting our hands dirty for these little treasures. We dug around the ground around the saga trees as if they were excavation sites. It became a competition between us to be the first to find a red seed — and my brother usually won. I have kept some of the seeds even till today.\n\n\"Never put the saga seeds in your mouth. They are harmful,\" our grandmother warned us after our toddler sister almost swallowed one of them. Since then, we began to keep the saga seeds in jars. The deep red seeds of the saga trees gave us hours of enjoyment. Sometimes we would put the seeds in empty Yakult bottles and seal the top of the bottles with masking tape to make musical shakers. We would also use the seeds for our Art and Craft projects.\n\nCollecting saga seeds was almost as cool as collecting marbles, stamps and postcards. Some people would place them in special glass jars to be used as beautiful ornaments at home while others gave them to their loved ones to express their love for them.\n\nAdapted from https://www.memoriesoftrees.com/?p=99",
      questions: [
        {
          id: "RGPS-WA1-2024-B-Q7",
          questionNumber: 7,
          marks: 1,
          question:
            "In paragraph 1, what was the writer's favourite activity in his/her childhood?",
          answer: "Collecting saga seeds.",
          solution: {
            method: "Literal comprehension — locate key sentence",
            steps: [
              "Find the relevant sentence in paragraph 1: 'One of my favourite pastimes was collecting saga seeds.'",
              "The answer is collecting saga seeds.",
              "Write in a full sentence or phrase for completeness.",
            ],
            tip: "The word 'favourite' in the question matches 'favourite' in the passage — go directly to that sentence.",
          },
        },
        {
          id: "RGPS-WA1-2024-B-Q8",
          questionNumber: 8,
          marks: 1,
          question:
            "In paragraph 1, the word 'little treasures' refers to ________.\nTick your chosen answer (Tick one only):\n[ ] flowers\n[ ] leaves\n[ ] saga seeds",
          options: ["flowers", "leaves", "saga seeds"],
          answer: "saga seeds",
          solution: {
            method: "Vocabulary — figurative language / reference",
            steps: [
              "Find 'little treasures' in paragraph 1: 'We did not mind getting our hands dirty for these little treasures.'",
              "The paragraph is about collecting bright red saga seeds which they dug up from the ground.",
              "The phrase 'little treasures' refers to the saga seeds — they are small, valuable to the children, and found by digging.",
              "Tick: saga seeds.",
            ],
            tip: "'These little treasures' = the things they were looking for = the saga seeds they were digging for.",
          },
        },
        {
          id: "RGPS-WA1-2024-B-Q9",
          questionNumber: 9,
          marks: 1,
          question:
            "Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in paragraph 2.\n\n[ ] The writer's grandmother warned them not to put the saga seeds in their mouths.\n[ ] The writer's toddler sister almost accidentally swallowed a saga seed.\n[ ] The writer and her brother put the saga seeds in jars.",
          answer: "2, 1, 3",
          solution: {
            method: "Sequencing — paragraph 2 order",
            steps: [
              "Event A — grandmother warned them: 'our grandmother warned us AFTER our toddler sister almost swallowed one' → this comes AFTER the swallowing incident.",
              "Event B — toddler sister almost swallowed: 'after our toddler sister almost swallowed one of them' → this happens FIRST.",
              "Event C — put seeds in jars: 'Since then, we began to keep the saga seeds in jars.' → this happens LAST, after the warning.",
              "Order: Sister swallowed (1st=1) → Grandmother warned (2nd=2) → Put in jars (3rd=3).",
              "Box answers: Grandmother warned=2, Sister swallowed=1, Put in jars=3.",
            ],
            tip: "The words 'after' and 'since then' are sequencing clues — use them to order events.",
          },
        },
        {
          id: "RGPS-WA1-2024-B-Q10",
          questionNumber: 10,
          marks: 1,
          question:
            "Which word in paragraph 2 has the same meaning as 'deadly'?",
          answer: "harmful",
          solution: {
            method: "Vocabulary in context — synonym",
            steps: [
              "Locate paragraph 2: 'Never put the saga seeds in your mouth. They are harmful.'",
              "'Harmful' means able to cause damage or danger — similar in meaning to 'deadly' (something that can hurt you).",
              "Note: 'harmful' is not an exact synonym of 'deadly' (deadly = causes death), but in this P3 context it is the closest and intended answer from the passage.",
            ],
            tip: "Scan paragraph 2 for a word describing danger or damage to the body.",
          },
        },
        {
          id: "RGPS-WA1-2024-B-Q11",
          questionNumber: 11,
          marks: 1,
          question:
            "Which three-word phrase in paragraph 2 tells you that the writer and her brother spent a lot of fun time playing with the seeds?",
          answer: "hours of enjoyment",
          solution: {
            method: "Vocabulary / phrase extraction",
            steps: [
              "The question asks for a THREE-word phrase showing they had a lot of fun with the seeds.",
              "Locate in paragraph 2: 'The deep red seeds of the saga trees gave us hours of enjoyment.'",
              "'Hours of enjoyment' = 3 words = they spent a long time having fun.",
              "This phrase directly tells us they had 'a lot of fun time'.",
            ],
            tip: "Count the words carefully — the answer must be exactly three words from the passage.",
          },
        },
        {
          id: "RGPS-WA1-2024-B-Q12",
          questionNumber: 12,
          marks: 1,
          question:
            "In paragraph 2, why were the writer and her brother careful not to leave the saga seeds lying around in the house? Tick your chosen answer (Tick one only).\n\n[ ] They wanted to make musical shakers using Yakult bottles.\n[ ] They did not want their toddler sister to swallow the seeds accidentally.\n[ ] They wanted to use the seeds for their Art and Craft projects.",
          options: [
            "They wanted to make musical shakers using Yakult bottles.",
            "They did not want their toddler sister to swallow the seeds accidentally.",
            "They wanted to use the seeds for their Art and Craft projects.",
          ],
          answer: "They did not want their toddler sister to swallow the seeds accidentally.",
          solution: {
            method: "Inference — cause and effect",
            steps: [
              "The reason they started keeping seeds in jars: 'our grandmother warned us after our toddler sister almost swallowed one of them. Since then, we began to keep the saga seeds in jars.'",
              "The key reason: to prevent the toddler sister from accidentally swallowing them.",
              "Options A and C are things they DID with the seeds — not why they kept seeds safely stored.",
            ],
            tip: "'Since then' shows a consequence — what happened BECAUSE OF the sister almost swallowing a seed.",
          },
        },
        {
          id: "RGPS-WA1-2024-B-Q13",
          questionNumber: 13,
          marks: 2,
          question:
            "Answer question 13 in a complete sentence.\nBased on paragraph 3, list two ways people could use the jars of saga seeds they had collected.",
          answer:
            "Two ways people could use the jars of saga seeds were to place them in special glass jars as beautiful ornaments at home, and to give them to their loved ones to express their love.",
          solution: {
            method: "Literal comprehension — list + complete sentence",
            steps: [
              "Locate paragraph 3: 'Some people would place them in special glass jars to be used as beautiful ornaments at home while others gave them to their loved ones to express their love for them.'",
              "Way 1: Place them in special glass jars as beautiful ornaments at home.",
              "Way 2: Give them to loved ones to express love.",
              "The question requires a COMPLETE SENTENCE — begin with 'Two ways…' or 'People could use…'",
            ],
            tip: "The word 'while' separates the two uses in the passage. Write both uses in your answer.",
          },
        },
      ],
    },
  ],
};

export default paper;
