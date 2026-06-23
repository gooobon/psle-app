// =============================================================================
// src/data/p3/english/papers/wa1_henry_park_primary_english_2023.ts
// Henry Park Primary School — 2023 Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 140–145 (시험지 표지 p.1–6)
// Duration: 35 minutes / Total: 20 marks
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1HenryParkPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: 'Henry Park Primary School',
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 35,
    totalMarks: 20,
    sourcePages: 'pp.140–145 (paper pp.1–6)',
  },

  items: [
    // =========================================================================
    // Section A: Grammar Cloze — Passage A (4 x 1 mark)
    // 소유대명사(possessive pronouns) 채우기. 보기: hers, his, mine, ours, theirs, yours
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2023-secA-passageA',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage A',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: hers | his | mine | ours | theirs | yours',
      passage:
        'Sam and Ken were in class.\n\n' +
        '"Sam found several pencils on the floor and asked, "These pencils do not belong to me. Are they (1) ________?"\n\n' +
        'Ken replied, "No, they are not (2) ________. Meiling was doing her work here earlier. They could be (3) ________."\n\n' +
        'Sam said, "Besides Meiling, the Science Club members were here too. These pencils might be one of (4) ________." Ken nodded in agreement.',
      marks: 4,
      questions: [
        {
          questionNo: '1',
          format: 'fib',
          marks: 1,
          stem: '"These pencils do not belong to me. Are they (1) ________?"(Sam is asking Ken a question)"이거 네 거니?"is asking Ken"네 것"Belonging to you"yours"yours (Are they yours? = Are they your pencils?)"이거 네 것이니?"Are these yours?"No, they are not (2) ________. Meiling was doing her work here earlier."Ken is answering Sam's question"내 것"himself (I / me)"Are they yours?"Are they yours?"아니, 내 것 아니야"They are mine"내 것"Belonging to me"mine"mine"they are not mine"They are my pencils → answer is mine"내 것이 아니다"They are mine"not mine"mine"...Meiling was doing her work here earlier. They could be (3) ________."Sam is asking about Meiling's belongings"Meiling"In the sentence just before"hers"A girl (singular) is mentioned. The possessive pronoun for one girl is"They could be hers."Therefore,"Besides Meiling, the Science Club members were here too. These pencils might be one of (4) ________."',
          answer: 'theirs',
          solution: {
            method: '"Science Club members"(could belong to Meiling) → Answer: hers."the Science Club members"Choose the possessive pronoun for several people (plural)."theirs".',
              '"one of theirs"refers to several people (plural)."Many children (8) ________ these books as they are interesting." John thanked the librarian before leaving.',
      marks: 4,
      questions: [
        {
          questionNo: '5',
          format: 'fib',
          marks: 1,
          stem: 'He (5) ________ several books each time he goes there.',
          answer: 'borrows',
          solution: {
            method: '"each time he goes"(belonging to one of them) → Answer: theirs. (You can also check with 'ours': 'ours' includes the speaker, so it does not fit here.)"each time he goes there"Choose the correct verb form for a repeated habit and match it with the subject (He, singular)."He"shows a repeated habit each time → Simple Present."He borrows several books"The subject"each time/every time"is third person singular → add -s to the verb."Two weeks ago"Therefore, → Answer: borrows."read"signals the Simple Present tense for repeated habits."Two weeks ago"Match the verb tense to the past time signal and the past tense verb"read"is a clear past time signal."borrowed"The verb that follows is also in the past tense."~ ago"Since both actions happen at the same time in the past,"Many children (8) ________ these books..."',
          answer: 'was borrowing',
          solution: {
            method: '"As(~하는 동안)"(Simple Past) → The answer is borrowed."As he ___ the books..., the librarian commented"is a clear signal that the sentence is in the past tense."순간"Together with 'when', this describes an action that was already happening at the moment another action (the librarian commented) occurred."중"The librarian spoke to John —"he"John was in the middle of borrowing books"was borrowing"at that moment."As + 주어 + was/were -ing, ~"He (subject) is singular →"Many children (8) ________ these books as they are interesting."',
          answer: 'borrow',
          solution: {
            method: '"as they are interesting"was borrowing → The answer is was borrowing."Many children"'When' shows that one action was happening while another action took place."as they are interesting"(Present tense, general fact) and match the verb to the subject"Many children"(plural)."Many children borrow these books"This is a Present tense sentence → it states a general fact or habit."were borrowing"The subject is plural → use the base form of the verb."but"Therefore,"but"→ The answer is borrow. (You can also check with the remaining word: Past Progressive does not fit this context.)"but"in the middle, without changing the meaning.
' +
        'Andy sprained his ankle during tennis practice. Andy did not cry.
' +
        '________________________________________ but ________________________________________.',
      answer: 'Andy sprained his ankle during tennis practice, but he did not cry.',
      solution: {
        method: 'Join the two events using the contrasting conjunction"Andy sprained his ankle during tennis practice, but..."to connect them."he"Use (however/but) to join the two sentences:"...but he did not cry."',
          '완성: "Andy sprained his ankle during tennis practice, but he did not cry."Replace the repeated name Andy with the pronoun"but"으로 연결합니다. 반복되는 주어는 대명사로 바꾸세요.',
      },
    },
    {
      kind: 'single',
      id: 'hp2023-q10',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 10,
      marks: 1,
      stem:
        'Rewrite the two sentences as one, beginning with the given word, without changing the meaning.\n' +
        'Ben is a responsible class monitor. Dave is a responsible class monitor too.\n' +
        'Both ________________________________________.',
      answer: 'Both Ben and Dave are responsible class monitors.',
      solution: {
        method: '"Both A and B"Completed sentence:"Both A and B" 형태로 합친다.',
          '주어가 "Both Ben and Dave"Use"class monitor"Use the Both...and... structure to group two subjects."class monitors"Since both people share the same quality (responsible class monitor), combine them using the Both...and... form."Both Ben and Dave are responsible class monitors."',
        ],
        tip: '"Both A and B"When the subject is Both...and... (plural), change the verb from is to are."I will paint a vase of sunflowers for Grandma!" Caili said to herself. It was Grandma\'s birthday next Sunday. Caili wanted to paint a picture as a birthday gift for her. After Caili placed her paint set, several paintbrushes and a jar of water on her desk, she began painting.\n\n' +
        'Soon, a vase of gorgeous sunflowers appeared on the paper. Suddenly, Caili\'s sister, Amy, skipped into the room. She exclaimed, "What a beautiful painting! Let me help!" Caili shook her head and told Amy to leave but she did not listen.\n\n' +
        'Amy leaned over to pick up a paintbrush from the desk. Unfortunately, her elbow accidentally knocked against the jar of water and it toppled over. Splash! Water spilt across the painting. The vibrant colours of the painting had become a huge watery mess!\n\n' +
        '"The painting is ruined!" Caili gasped. Horrified by what she had done, Amy stood rooted to the spot with her mouth agape. Softly, she whispered an apology.\n\n' +
        'Caili sighed heavily. Then, she reassured Amy that another painting could be done. With Amy\'s assistance, Caili cleaned up the mess. After that, Caili laid out another sheet of paper for a second painting. Amy asked timidly, "May I help you paint? I will be careful."\n\n' +
        'Caili nodded. Immediately, the sisters began painting another vase of sunflowers. They worked well together. The second painting of a bigger and brighter vase of sunflowers soon appeared on the paper. The sisters beamed with pride. It had turned out to be much better than the first!\n\n' +
        'Caili exclaimed, "Grandma would love this painting!"Also change the noun"Caili wanted to paint a picture as a birthday gift for her."to its plural form"Grandma\'s birthday next Sunday"Completed sentence: Both...and... is treated as plural, so use are as the verb and write the noun in plural form."Amy leaned over to pick up a paintbrush from the desk. ... her elbow accidentally knocked against the jar of water."Amy smiled."because she was trying to ~"(her = Grandma, mentioned in the previous sentence)"she began painting"The picture is a birthday present for Grandma. Therefore, the answer is (3) Grandma."Suddenly, Caili\'s sister, Amy, skipped into the room."Tip: Check the sentence just before to find out who the pronoun (her) is referring to."her elbow accidentally knocked against the jar of water and it toppled over."Check paragraph 3 to find out what Amy was trying to do when she knocked over the jar of water."True" or "False"Amy knocked over the jar of water with her elbow while trying to pick up a paintbrush. Therefore, the answer is (1) get a paintbrush."Caili shook her head and told Amy to leave but she did not listen."Tip: This question asks about the direct cause (purpose) of the action."Caili가 말한 대로 나갔다"Number the events in the order they appear in the passage."told her to ~ but she did not listen"Paragraph 1: Caili started painting by herself → 1."True" or "False"Paragraph 2: Amy skipped into the room → 2."Amy asked timidly, \'May I help you paint? I will be careful.\'"Paragraph 3: The jar of water was knocked over → 3."Unfortunately, her elbow accidentally knocked (A) against the jar of water and it toppled (B) over."',
          options: [
            { label: 'A', text: 'knocked' },
            { label: 'B', text: 'toppled' },
          ],
          answer: 'B',
          solution: {
            method: '"균형을 잃고 넘어졌다"Tip: For sequence questions, follow the paragraphs in order and find where each event first appears."균형을 잃고 떨어짐"Check paragraph 2 to see whether Amy followed what Caili told her to do."toppled over"Caili told Amy to leave, but Amy did not listen."It"Therefore, the statement is false → False."It"Tip: 'Did not listen' is the key clue showing that Amy did not follow the instruction."The second painting of a bigger and brighter vase of sunflowers soon appeared on the paper. ... It had turned out to be much better than the first!"',
              '"It"Check paragraphs 4–5 to find out what Amy asked for."the second painting"Paragraph 5: Amy carefully asked if she could help with the second painting."It"The statement matches → True."With Amy\'s assistance, Caili cleaned up the mess."Tip: A character's direct speech (words inside quotation marks) is a strong clue showing what that character wants or intends to do."May I help you paint?"Choose the word that matches the meaning of losing balance and falling."the sisters began painting another vase of sunflowers... They worked well together."knocked = hit something → describes the action of giving an impact."two ways"toppled = to lose balance and fall over → matches exactly."beamed with pride"Therefore, the answer is (B) toppled."The second painting of a bigger and brighter vase of sunflowers soon appeared on the paper. The sisters beamed with pride. It had turned out to be much better than the first!"Tip: Look at what each word describes — one shows the hitting action, and the other shows the result of losing balance and falling."beamed with pride"(자랑스러워하며 활짝 웃었다) 앞뒤의 성취/결과 문장이 이유의 핵심입니다.',
          },
        },
      ],
    },
  ],
};

export default wa1HenryParkPrimaryEnglish2023;
