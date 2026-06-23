// =============================================================================
// src/data/p3/english/papers/wa2_nanyang_primary_english_2022.ts
// Nanyang Primary School — 2022 Term 2 Weighted Assessment (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 281–287 (시험지 표지 p.1–7)
// Duration: 40 minutes / Total: 20 marks
// ★ 공식 정답표(p289-290) 기준 19문항 전부 100% 일치 확인됨.
// 구성: A문법(3) B어휘(3) C인칭대명사클로즈(3) D교정(3) E독해(8) = 20점
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa2NanyangPrimaryEnglish2022: EnglishPaper = {
  meta: {
    school: 'Nanyang Primary School',
    year: 2022,
    assessment: 'Term 2 Weighted Assessment',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 40,
    totalMarks: 20,
    sourcePages: 'pp.281–287 (paper pp.1–7)',
  },

  items: [
    // (A) Grammar Q1-3
    {
      kind: 'single', id: 'ny22wa2-q1', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 1, marks: 1,
      stem: 'When Tom ________ home, he decided to take a nap.',
      options: [{ label: '1', text: 'reach' }, { label: '2', text: 'reaches' }, { label: '3', text: 'reached' }, { label: '4', text: 'is reaching' }],
      answer: '3',
      solution: { method: 'Choose the correct tense to match the past context with \'When\'.', steps: ['\'decided to take a nap\' (Simple Past) → arriving home also happened at the same past moment.', '\'reached\' → correct answer (3).'], tip: '\'When Tom reached home\' is a Simple Past expression meaning \'at the time he arrived home\'.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q2', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 2, marks: 1,
      stem: 'Mother bought ________ flour to bake a cake.',
      options: [{ label: '1', text: 'little' }, { label: '2', text: 'some' }, { label: '3', text: 'much' }, { label: '4', text: 'many' }],
      answer: '2',
      solution: { method: 'Look for the correct quantifier to use with \'flour\' (uncountable noun).', steps: ['flour is uncountable → \'many\' cannot be used.', '\'some\' means a certain amount → it is natural to use \'some\' with uncountable nouns in positive sentences → correct answer (2).'], tip: 'In positive sentences, use \'some\' with uncountable nouns, like \'some flour\'.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q3', topic: 'GrammarMCQ', format: 'mcq',
      questionNo: 3, marks: 1,
      stem: '"________ book here belongs to my brother," said Ahmad.',
      options: [{ label: '1', text: 'This' }, { label: '2', text: 'That' }, { label: '3', text: 'These' }, { label: '4', text: 'Those' }],
      answer: '1',
      solution: { method: 'Look at \'book\' (singular) and \'here\' (nearby location).', steps: ['\'book\' is singular → choose between \'This\' or \'That\'.', '\'here\' (over here) = nearby → use \'This\' → correct answer (1).'], tip: '\'here\' (located here) means close distance → use \'this\' or \'these\'.' },
    },
    // (B) Vocabulary Q4-6
    {
      kind: 'single', id: 'ny22wa2-q4', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 4, marks: 1,
      stem: 'The bald eagle ________ down from the sky to catch its prey.',
      options: [{ label: '1', text: 'soared' }, { label: '2', text: 'stepped' }, { label: '3', text: 'dropped' }, { label: '4', text: 'swooped' }],
      answer: '4',
      solution: { method: 'Choose the verb that describes the eagle\'s action of \'plunging down steeply\' to catch its prey.', steps: ['\'down from the sky to catch its prey\' (diving downward from the sky) → a steep dive.', '\'swooped\' means to dive down steeply → matches exactly → correct answer (4).'], tip: '"swoop down" describes the action of a bird or airplane diving quickly downward.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q5', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 5, marks: 1,
      stem: 'Vincent van Gogh was a ________ painter whose works are exhibited around the world.',
      options: [{ label: '1', text: 'smart' }, { label: '2', text: 'famous' }, { label: '3', text: 'resourceful' }, { label: '4', text: 'quick-witted' }],
      answer: '2',
      solution: { method: '"displayed all around the world" — choose the adjective that best matches this fact.', steps: ['"works are exhibited around the world" (artworks are shown all over the world) → known worldwide.', '"famous" = well-known worldwide → exact match → correct answer (2).'], tip: 'Exhibited all over the world = worldwide fame = famous.' },
    },
    {
      kind: 'single', id: 'ny22wa2-q6', topic: 'VocabMCQ', format: 'mcq',
      questionNo: 6, marks: 1,
      stem: 'The goat is running away as fast as it can from its ________.',
      options: [{ label: '1', text: 'prey' }, { label: '2', text: 'victim' }, { label: '3', text: 'target' }, { label: '4', text: 'predator' }],
      answer: '4',
      solution: { method: 'Choose the word that describes the one chasing "a goat that is running away".', steps: ['"running away from its ___" → the one trying to catch the goat.', '"predator" = an animal that hunts other animals → exact match → correct answer (4).'], tip: 'The animal that prey (such as a goat) runs away from is a predator.' },
    },
    // (C) Grammar Cloze – Pronouns Q7-9
    {
      kind: 'set',
      id: 'ny22wa2-secC',
      topic: 'GrammarCloze',
      title: '(C) Grammar Cloze — Personal Pronouns',
      instructions: 'Box: (A) her  (B) I  (C) me  (D) my  (E) we  (F) you',
      passage: 'I arrived home one day to find my sister sitting at the kitchen table, crying.\n\n"Sally, what\'s wrong?" (7) ________ asked.\n\n"Nothing!" she snarled.\n\n"Then why are (8) ________ crying?" I said. She lifted up her fist and banged it on the table.\n\n"Go away and leave (9) ________ alone!" she yelled. It was at this moment that I decided to give her some time to cool down.',
      marks: 3,
      questions: [
        { questionNo: '7', format: 'fib', marks: 1, stem: '"Sally, what\'s wrong?" (7) ________ asked.', answer: 'B',
          solution: { method: 'The speaker himself ("I") asked the question.', steps: ['The narrator (speaker) asked Sally → I.', 'Among the options, I is (B) → correct answer (B).'], tip: 'When the speaker talks about themselves, the subject is I.' } },
        { questionNo: '8', format: 'fib', marks: 1, stem: '"Then why are (8) ________ crying?" I said.', answer: 'F',
          solution: { method: 'Choose the subject of "the speaker asking Sally directly".', steps: ['Asking Sally (the other person) "Why are you crying?" → you.', 'In the options, \'you\' is (F) → the answer is (F).'], tip: 'When asking someone a question directly, the subject used is \'you\'.' } },
        { questionNo: '9', format: 'fib', marks: 1, stem: '"Go away and leave (9) ________ alone!" she yelled.', answer: 'C',
          solution: { method: '\'leave me alone\' — we need to find the object of the sentence.', steps: ['Sally is telling the speaker (me) to \'leave me (myself) alone\'.', 'Since Sally is speaking to \'I (the speaker)\', the object form used is \'me (the object form of I)\'.', 'In the options, \'me\' is (C) → the answer is (C).'], tip: '\'leave me alone\' is an expression that means to leave someone by themselves and not bother them.' } },
      ],
    },
    // (D) Editing Q10-12
    {
      kind: 'set',
      id: 'ny22wa2-secD',
      topic: 'Editing',
      title: '(D) Editing for Spelling',
      instructions: 'Each of the underlined words contains a spelling error. Write the correct word in each of the boxes.',
      passage: 'The Venus Flytrap is a carnivorous plant that eats small insects. It (10) [leetle] grows in soil that has nitrogen. It gets its nitrogen from the insects it traps.\n\nThe Venus Flytrap can snap shut very (11) [quikly]. When an insect crawls (12) [leefs] along the and touches any hair on them, the trap will snap close within twenty seconds.\n\nThe Venus Flytrap is a fascinating plant indeed.',
      marks: 3,
      questions: [
        { questionNo: '10', format: 'editing', marks: 1, stem: 'grows in soil that has [leetle] nitrogen.', answer: 'little',
          solution: { method: 'Check the spelling of the word that means \'very few / hardly any\'.', steps: ['The incorrect spelling is: leetle.', 'The correct word is: little — l-i-t-t-l-e.'], tip: '\'little\' is spelled \'lit-tle\' — it contains double t (tt).' } },
        { questionNo: '11', format: 'editing', marks: 1, stem: 'The Venus Flytrap can snap shut very [quikly].', answer: 'quickly',
          solution: { method: 'Check the spelling of the adverb that means \'quickly / fast\'.', steps: ['The incorrect spelling is: quikly (the \'ck\' is missing).', 'The correct word is: quickly — q-u-i-c-k-l-y.'], tip: '\'quickly\' is made up of \'quick\' + \'ly\' — it contains \'ck\'.' } },
        { questionNo: '12', format: 'editing', marks: 1, stem: 'When an insect crawls [leefs] along the and touches any hair on them...', answer: 'leaves',
          solution: { method: 'Check the plural spelling of the word \'leaves\'.', steps: ['Incorrect spelling: leefs.', 'Correct word: leaves — l-e-a-v-e-s (irregular plural of \'leaf\').'], tip: 'The plural of \'leaf\' is \'leaves\' (leaf → leaves, irregular change).' } },
      ],
    },
    // (E) Comprehension Q13-19
    {
      kind: 'set',
      id: 'ny22wa2-secE',
      topic: 'ComprehensionOE',
      title: '(E) Comprehension — The Story of Zan',
      instructions: 'Read this passage and answer questions 13 to 19.',
      passage: 'On the island of Crete, Earth Mother had a child called Zan. The bees of the forest brought honey for little Zan and the wild goats gave him milk. They also made some toys for him. Each toy was made of precious metals, and Zan played happily with his toys.\n\nTime passed and Zan grew up. Grateful to his animal friends which cared for him, Zan rewarded them. He made a law that the goats could roam freely. He made beehives to protect the bees. Then, Zan took his toys and hid them carefully in a secret cave where they would be safe.\n\nOne day, three men climbed up the mountains to find treasure. They discovered the cave. "There must be a treasure in there," one man said. They put on armour that protected them from the bees and stormed into the cave.\n\nSuddenly, Zan appeared. "Stop!" he shouted. "You have come here to rob and kill. I will let you live, but from now on, you must not tell other people where my cave is." The men shivered when they saw Zan.\n\nHe then cast a spell on the men, turning them into birds. One turned into an owl, one turned into a parrot and the last one became a mynah. The birds flew away and were never seen again.\n\n(Source: Adapted from the Story of Zan)',
      marks: 8,
      questions: [
        { questionNo: '13', format: 'open', marks: 1,
          stem: 'Fill in the blank with suitable words. Zan\'s toys were special as they were made of ________.',
          answer: 'precious metals',
          solution: { method: 'Look in paragraph 1 for the material the toys are made of.', steps: ['\'Each toy was made of precious metals\' (made of precious metals).', 'Therefore, \'precious metals\' is the answer.'], tip: '\'made of\' is used to describe what something is made from.' } },
        { questionNo: '14', format: 'open', marks: 2,
          stem: 'Explain why Zan rewarded his animal friends.',
          answer: 'Zan rewarded his animal friends because he was grateful to them as they had cared for him when he was young.',
          solution: { method: 'Look in paragraph 2 for the reason why Zan gave a reward.', steps: ['"Grateful to his animal friends which cared for him, Zan rewarded them."', 'Reason: He was thankful because his animal friends had taken care of him.'], tip: '\'Grateful to ~\' = being thankful to someone, and this is the reason given.' } },
        { questionNo: '15', format: 'mcq', marks: 1,
          stem: 'Which word has the same meaning as "charged"? Circle either (A) or (B). "They put on armour that (A) protected them from the bees and (B) stormed into the cave."',
          options: [{ label: 'A', text: 'protected' }, { label: 'B', text: 'stormed' }],
          answer: 'B',
          solution: { method: 'Choose the word that has the same meaning as \'charged\' (to rush forward).', steps: ['\'charged\' = rushed forward / charged ahead.', '\'stormed\' = burst in forcefully → means to charge forward → correct answer (B).'], tip: '\'stormed into\' describes the action of rushing or charging into a place with great force.' } },
        { questionNo: '16', format: 'open', marks: 1,
          stem: 'Read the statement and tick "True" or "False": Zan treasured his toys.',
          answer: 'True',
          solution: { method: 'Check paragraph 2 to see how Zan treated his toys.', steps: ['"Zan took his toys and hid them carefully in a secret cave where they would be safe."', 'He hid and kept them carefully → treasured (valued them dearly) → True.'], tip: '"hid them carefully where they would be safe" shows that he treasured them.' } },
        { questionNo: '17', format: 'open', marks: 1,
          stem: 'Read the statement and tick "True" or "False": The three men turned themselves into birds.',
          answer: 'False',
          solution: { method: 'Check the last paragraph to find out who changed into birds.', steps: ['"He then cast a spell on the men, turning them into birds."', 'Zan cast a spell to turn the men into birds → the men did not change by themselves → False.'], tip: '"He cast a spell" shows Zan is the one who acted (the men did not change on their own).' } },
        { questionNo: '18', format: 'mcq', marks: 1,
          stem: 'Tick the word that best describes how the three men felt in paragraph 4.',
          options: [{ label: '1', text: 'angry' }, { label: '2', text: 'cold' }, { label: '3', text: 'frightened' }],
          answer: '3',
          solution: { method: 'Look at paragraph 4 to find how the men felt.', steps: ['"The men shivered when they saw Zan."', '"shivered" (trembled) = fear → frightened → Answer (3).'], tip: '"shivered" means to shake from cold or fear. Here, it shows the men were frightened.' } },
        { questionNo: '19', format: 'open', marks: 1,
          stem: 'Write 1, 2 and 3 in the blanks to show what happened first, next, and last in the story.\n( ) Zan warned the men.\n( ) Zan had a happy childhood.\n( ) The men wanted to look for treasure.',
          answer: 'Zan warned the men = 3; Zan had a happy childhood = 1; The men wanted to look for treasure = 2',
          solution: { method: 'Arrange the events in the order they happen in the story.', steps: ['Paragraph 1: Zan had a happy childhood → 1.', 'Paragraph 3: Three men came looking for treasure → 2.', 'Paragraph 4: Zan warned the men → 3.'], tip: 'Story order: childhood (1) → men arrive (2) → Zan warns them (3).' } },
      ],
    },
  ],
};

export default wa2NanyangPrimaryEnglish2022;
