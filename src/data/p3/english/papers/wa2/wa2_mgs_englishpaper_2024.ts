// ============================================================
// Methodist Girls' School (Primary) — WA2 2024 Primary 3
// English Language Paper  (12 marks, 45 min)
// Section: Comprehension (Selected Response + Open-ended)
// Passage: "Heather and the Stormy Birthday" (adapted)
// ============================================================

import type {
  TypeBPassage,
  PaperQuestion,
  PaperMeta,
} from "./wa2_mgs_englishpaper_2022";

export const meta: PaperMeta = {
  school: "Methodist Girls' School (Primary)",
  level: "Primary 3",
  subject: "English Language",
  term: "WA2",
  year: 2024,
  totalMarks: 12,
  timeMinutes: 45,
};

export const questions: PaperQuestion[] = [

  // ══════════════════════════════════════════════════════
  //  COMPREHENSION (Q1–Q10, 12 marks)
  //  Passage: Heather and the Stormy Birthday (adapted)
  // ══════════════════════════════════════════════════════

  {
    kind: "B",
    id: "mgs2024-comp",
    topic: "ComprehensionOE",
    marks: 12,
    passageTitle: "Heather and the Stormy Birthday (adapted)",
    passageText:
      "Dark clouds started to gather in the sky. The siblings, Heather and Edward, were on their way home after school. As raindrops fell, Heather and Edward dashed towards the shelter under their block of flats. Suddenly, they heard a strange noise from a nearby flat and hurried to investigate. Edward knocked on the door and asked, 'Anyone there?'\n\n'Help!' a voice called out. Heather peered through the window. She saw an old lady lying helplessly on the floor. Edward realised that the door was unlocked. He immediately opened the door and the siblings hurriedly went towards her.\n\nThe old lady explained tearfully, 'I tripped while trying to close the windows. Now, I cannot get up. I have to wait for my son to get home.'\n\n'We know what to do. Don't worry,' Heather said. Heather knelt beside the old lady and reassured the old lady that their parents had taught them how to help older people get back up safely when they fell.\n\nEdward took two chairs from the kitchen and placed one on each side of the old lady. The old lady held onto the chairs and pushed herself up with all her strength. Then, Edward helped her to the sofa.\n\n'Thank you for your help,' the old lady said gratefully. 'My son would be home soon.' Heather and Edward decided to keep the old lady company until her son got home.\n\nHeather and Edward went home smiling that day, knowing they had made someone's day better!",
    questions: [
      {
        qid: "mgs2024-q1",
        question:
          "When it started to rain, the siblings decided to seek shelter at __________. [1m]\n(1) their school\n(2) a nearby flat\n(3) their block of flats",
        options: [
          "(1) their school",
          "(2) a nearby flat",
          "(3) their block of flats",
        ],
        answer: "3",
        solution: {
          method: "Literal comprehension: paragraph 1.",
          steps: [
            "Paragraph 1: 'Heather and Edward dashed towards the shelter under their BLOCK OF FLATS.'",
            "(3) their block of flats → CORRECT.",
            "(2) a nearby flat → that is where the old lady lived, not where they sheltered from rain.",
            "Answer: (3) their block of flats.",
          ],
          tip: "They sheltered under their OWN block of flats (from the rain). Separately, they then investigated a nearby flat where they heard the noise.",
        },
      },
      {
        qid: "mgs2024-q2",
        question:
          "Which word has the same meaning as 'with no hesitation'? Circle (A) or (B). [1m]\n\n'He immediately opened the door and the siblings hurriedly went towards her.'\n         (A)                                              (B)",
        options: ["(A) immediately", "(B) hurriedly"],
        answer: "A",
        solution: {
          method: "Vocabulary synonym: 'with no hesitation' = without delay.",
          steps: [
            "'with no hesitation' = without pausing or waiting = right away.",
            "(A) 'immediately' = at once, without delay → SYNONYM. CORRECT.",
            "(B) 'hurriedly' = in a hurry, quickly → means rushing, not 'without hesitation'.",
            "Answer: (A) immediately.",
          ],
          tip: "Immediately = without hesitation/delay. Hurriedly = quickly (but can still involve hesitation first). 'He IMMEDIATELY opened' = he did it right away, without stopping to think.",
        },
      },
      {
        qid: "mgs2024-q3",
        question: "How did the old lady fall? [1m]",
        answer:
          "She tripped while trying to close the windows.",
        solution: {
          method: "Literal comprehension: paragraph 3.",
          steps: [
            "Paragraph 3: 'I TRIPPED while trying to CLOSE THE WINDOWS.'",
            "Answer: She tripped while trying to close the windows.",
          ],
          tip: "The old lady explains exactly how she fell. Quote or paraphrase: 'she tripped while trying to close the windows'.",
        },
      },
      {
        qid: "mgs2024-q4i",
        question:
          "TRUE or FALSE with reason: The door to the old lady's flat was locked. [1m]",
        answer:
          "False. Edward found out / noticed that the door was unlocked.",
        solution: {
          method: "Literal comprehension: paragraph 2.",
          steps: [
            "Paragraph 2: 'Edward realised that the door was UNLOCKED.'",
            "Statement: 'the door was LOCKED' → OPPOSITE of what the text says → FALSE.",
            "Reason: Edward found out the door was unlocked.",
            "Answer: False. The door was unlocked.",
          ],
          tip: "Locked vs unlocked — opposite terms. The door was UNLOCKED (that's why Edward could open it).",
        },
      },
      {
        qid: "mgs2024-q4ii",
        question:
          "TRUE or FALSE with reason: Heather and Edward rushed home immediately after helping the old lady. [1m]",
        answer:
          "False. Heather and Edward / They / The siblings stayed with the old lady until her son got home.",
        solution: {
          method: "Literal comprehension: paragraph 6.",
          steps: [
            "Paragraph 6: 'Heather and Edward decided to KEEP THE OLD LADY COMPANY UNTIL HER SON GOT HOME.'",
            "Statement: 'rushed home immediately' → WRONG. They stayed with the old lady first.",
            "Answer: False. They stayed with the old lady until her son got home.",
          ],
          tip: "They kept the old lady company — they did NOT rush home immediately. They left only after the son arrived (implied).",
        },
      },
      {
        qid: "mgs2024-q5",
        question:
          "Which word from lines 10–14 has the same meaning as 'comforted'? [1m]",
        answer: "reassured",
        solution: {
          method: "Vocabulary synonym in lines 10–14.",
          steps: [
            "Lines 10–14 (paragraph 4): 'Heather knelt beside the old lady and REASSURED the old lady…'",
            "'reassured' = said or did things to make someone less worried/frightened → synonym of 'comforted'. CORRECT.",
            "Answer: reassured.",
          ],
          tip: "Reassured = comforted, put someone at ease. 'Heather reassured the old lady' = Heather comforted her so she wouldn't worry.",
        },
      },
      {
        qid: "mgs2024-q6",
        question:
          "Tick whether the actions described were done by Heather or Edward. [1m]\nAction: Knelt beside the old lady",
        options: ["Heather", "Edward"],
        answer: "Heather",
        solution: {
          method: "Literal comprehension: paragraph 4.",
          steps: [
            "Paragraph 4: 'HEATHER knelt beside the old lady and reassured the old lady…'",
            "Answer: Heather.",
          ],
          tip: "Heather knelt and reassured. Edward took the chairs. The roles are clearly assigned in paragraphs 4 and 5.",
        },
      },
      {
        qid: "mgs2024-q7",
        question:
          "Tick whether the actions described were done by Heather or Edward. [1m]\nAction: Helped the old lady onto the sofa",
        options: ["Heather", "Edward"],
        answer: "Edward",
        solution: {
          method: "Literal comprehension: paragraph 5.",
          steps: [
            "Paragraph 5: 'Then, EDWARD helped her to the sofa.'",
            "Answer: Edward.",
          ],
          tip: "Edward: brought chairs AND helped her to the sofa. Heather: knelt and reassured.",
        },
      },
      {
        qid: "mgs2024-q8",
        question:
          "Write 1, 2 and 3 in the blanks to indicate the order of events. [1m]\n___ Edward took chairs from the kitchen.\n___ Heather peered through the window.\n___ The old lady cried for help.",
        answer:
          "Edward took chairs from the kitchen: 3\nHeather peered through the window: 2\nThe old lady cried for help: 1",
        solution: {
          method: "Sequence comprehension: map events to passage order.",
          steps: [
            "Event 1: Paragraph 2: 'Help!' → old lady cried for help. ORDER: 1",
            "Event 2: Paragraph 2: 'Heather PEERED through the window.' ORDER: 2",
            "Event 3: Paragraph 5: 'Edward TOOK TWO CHAIRS from the kitchen.' ORDER: 3",
            "Answer: Cried for help (1) → Heather peered (2) → Edward took chairs (3).",
          ],
          tip: "Follow the paragraph order: old lady calls for help (para 2) → Heather peered (para 2) → Edward got chairs (para 5).",
        },
      },
      {
        qid: "mgs2024-q9",
        question:
          "What did the old lady do so that she could stand again? [2m]",
        answer:
          "She held onto the chairs and pushed herself up with all her strength.",
        solution: {
          method: "Literal comprehension: paragraph 5.",
          steps: [
            "Paragraph 5: 'The old lady HELD ONTO THE CHAIRS and PUSHED HERSELF UP with all her strength.'",
            "Two actions: held the chairs + pushed herself up.",
            "Answer: She held onto the chairs and pushed herself up with all her strength.",
          ],
          tip: "2-mark question: two actions needed. (1) Held onto chairs. (2) Pushed herself up. Both actions described in paragraph 5.",
        },
      },
      {
        qid: "mgs2024-q10",
        question:
          "From the story, we know that the siblings were __________ because of their actions towards the old lady. Tick the most suitable answer. [1m]\n☐ kind  ☐ honest  ☐ grateful",
        options: ["kind", "honest", "grateful"],
        answer: "kind",
        solution: {
          method: "Character inference: what quality do the siblings' actions demonstrate?",
          steps: [
            "The siblings helped a stranger (old lady) in need — they didn't have to, but they did.",
            "'kind' = caring and helpful towards others → MATCHES their behaviour. CORRECT.",
            "'honest' = truthful → not demonstrated by this story.",
            "'grateful' = thankful → the OLD LADY was grateful, not the siblings.",
            "Answer: kind.",
          ],
          tip: "Helping a stranger without being asked = kindness. The siblings showed kindness by going out of their way to help the old lady.",
        },
      },
    ],
  },
];

export const mgs2024Paper = { meta, questions };
export default mgs2024Paper;
