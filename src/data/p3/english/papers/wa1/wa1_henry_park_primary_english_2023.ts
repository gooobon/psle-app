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
          stem: '"These pencils do not belong to me. Are they (1) ________?" (Sam이 Ken에게 묻는 말)',
          answer: 'yours',
          solution: {
            method: 'Sam이 상대(Ken)에게 직접 묻는 말의 소유대명사를 고른다.',
            steps: [
              'Sam이 Ken에게 "이거 네 거니?"라고 묻고 있다.',
              '"네 것"을 뜻하는 소유대명사는 "yours" (Are they yours? = Are they your pencils?).',
              '따라서 정답은 yours.',
            ],
            tip: '상대방에게 "이거 네 것이니?"라고 물을 때는 yours를 씁니다.',
          },
        },
        {
          questionNo: '2',
          format: 'fib',
          marks: 1,
          stem: '"No, they are not (2) ________. Meiling was doing her work here earlier."',
          answer: 'mine',
          solution: {
            method: 'Ken이 자기 자신("내 것")을 가리키는 소유대명사를 고른다.',
            steps: [
              'Sam이 "Are they yours?"라고 물었고, Ken은 "아니, 내 것 아니야"라고 답한다.',
              '"내 것"을 뜻하는 소유대명사는 "mine".',
              '따라서 "they are not mine" → 정답 mine.',
            ],
            tip: '"내 것이 아니다"라고 답할 때는 "not mine"을 씁니다.',
          },
        },
        {
          questionNo: '3',
          format: 'fib',
          marks: 1,
          stem: '"...Meiling was doing her work here earlier. They could be (3) ________."',
          answer: 'hers',
          solution: {
            method: '바로 앞에서 언급된 여자아이(Meiling)의 소유격을 고른다.',
            steps: [
              '바로 앞 문장에서 "Meiling"(여자아이, 단수)이 언급됨.',
              '여자 한 명의 것을 가리키는 소유대명사는 "hers".',
              '따라서 "They could be hers."(Meiling의 것일 수도 있다) → 정답 hers.',
            ],
            tip: '여자 한 명의 소유를 나타낼 때는 hers, 남자는 his를 씁니다.',
          },
        },
        {
          questionNo: '4',
          format: 'fib',
          marks: 1,
          stem:
            '"Besides Meiling, the Science Club members were here too. These pencils might be one of (4) ________."',
          answer: 'theirs',
          solution: {
            method: '"Science Club members"(여러 사람, 복수)의 소유대명사를 고른다.',
            steps: [
              '"the Science Club members"는 여러 명(복수)을 가리킨다.',
              '여러 사람의 것을 가리키는 소유대명사는 "theirs".',
              '"one of theirs"(그들 중 한 명의 것) → 정답 theirs. (남은 단어 ours로도 검증 가능: ours는 화자 포함이라 이 상황에 안 맞음)',
            ],
            tip: '여러 사람(그들)의 소유를 나타낼 때는 theirs를 씁니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section A: Grammar Cloze — Passage B (4 x 1 mark)
    // 동사 형태(verb forms: borrow 관련) 채우기
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2023-secA-passageB',
      topic: 'GrammarCloze',
      title: 'Section A: Grammar Cloze — Passage B',
      instructions:
        'Read the passage below. Choose the most suitable word from the box and fill in each blank. Use each word ONCE only. Word box: borrow | borrows | borrowed | borrowing | was borrowing | were borrowing',
      passage:
        'John enjoys visiting the library. He (5) ________ several books each time he goes there.\n\n' +
        'Two weeks ago, John (6) ________ and read a few books about predators. Then, after he returned those books yesterday, John found some books on sea stars. As he (7) ________ the books at the counter, the librarian commented, "Many children (8) ________ these books as they are interesting." John thanked the librarian before leaving.',
      marks: 4,
      questions: [
        {
          questionNo: '5',
          format: 'fib',
          marks: 1,
          stem: 'He (5) ________ several books each time he goes there.',
          answer: 'borrows',
          solution: {
            method: '"each time he goes"(반복되는 습관)와 주어(He, 단수)에 맞는 동사를 고른다.',
            steps: [
              '"each time he goes there"는 매번 반복되는 습관 → 단순현재.',
              '주어 "He"는 3인칭 단수 → 동사에 -s.',
              '따라서 "He borrows several books" → 정답 borrows.',
            ],
            tip: '"each time/every time"은 반복 습관을 나타내는 단순현재의 신호입니다.',
          },
        },
        {
          questionNo: '6',
          format: 'fib',
          marks: 1,
          stem: 'Two weeks ago, John (6) ________ and read a few books about predators.',
          answer: 'borrowed',
          solution: {
            method: '"Two weeks ago"(과거 시점)와 "read"(과거형)에 맞춰 동사 시제를 정한다.',
            steps: [
              '"Two weeks ago"는 명확한 과거 시점.',
              '뒤에 이어진 동사 "read"도 과거형(원형과 같은 형태이나 문맥상 과거).',
              '같은 시점의 동작이므로 "borrowed"(과거형) → 정답 borrowed.',
            ],
            tip: '"~ ago"는 과거시제를 나타내는 확실한 신호입니다.',
          },
        },
        {
          questionNo: '7',
          format: 'fib',
          marks: 1,
          stem:
            'As he (7) ________ the books at the counter, the librarian commented, "Many children (8) ________ these books..."',
          answer: 'was borrowing',
          solution: {
            method: '"As(~하는 동안)"와 함께, 다른 동작(librarian commented)이 일어난 순간 진행 중이던 동작을 나타낸다.',
            steps: [
              '"As he ___ the books..., the librarian commented" — 사서가 말을 건 "순간" 존이 책을 빌리는 "중"이었다.',
              '특정 과거 시점에 진행 중인 동작 → 과거진행형.',
              '주어 "he"는 단수 → "was borrowing" → 정답 was borrowing.',
            ],
            tip: '"As + 주어 + was/were -ing, ~"는 한 동작이 진행되는 동안 다른 일이 일어났음을 나타냅니다.',
          },
        },
        {
          questionNo: '8',
          format: 'fib',
          marks: 1,
          stem: 'The librarian commented, "Many children (8) ________ these books as they are interesting."',
          answer: 'borrow',
          solution: {
            method: '"as they are interesting"(현재시제, 일반적 사실)와 주어 "Many children"(복수)에 맞춘다.',
            steps: [
              '"as they are interesting"은 현재시제 → 일반적인 사실/습관을 말하는 문장.',
              '주어 "Many children"은 복수 → 동사 원형.',
              '따라서 "Many children borrow these books" → 정답 borrow. (남은 단어 "were borrowing"으로도 확인 가능: 과거진행은 이 문맥에 안 맞음)',
            ],
            tip: '일반적 사실/습관을 말할 때는 단순현재를 쓰고, 복수 주어의 동사에는 -s를 붙이지 않습니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Sentence Combining (2 x 1 mark) — Q9, Q10
    // =========================================================================
    {
      kind: 'single',
      id: 'hp2023-q9',
      topic: 'SentenceCombining',
      format: 'open',
      questionNo: 9,
      marks: 1,
      stem:
        'Rewrite the two sentences as one, using the given word "but" in the middle, without changing the meaning.\n' +
        'Andy sprained his ankle during tennis practice. Andy did not cry.\n' +
        '________________________________________ but ________________________________________.',
      answer: 'Andy sprained his ankle during tennis practice, but he did not cry.',
      solution: {
        method: '두 사건을 대조 접속사 "but"으로 연결한다.',
        steps: [
          '앞 문장(다친 사실)과 뒤 문장(울지 않은 사실)은 의외의 대조 관계.',
          '"but"(그러나)으로 두 문장을 연결: "Andy sprained his ankle during tennis practice, but..."',
          '반복되는 Andy는 대명사 "he"로 바꾼다: "...but he did not cry."',
          '완성: "Andy sprained his ankle during tennis practice, but he did not cry."',
        ],
        tip: '예상과 다른(놀라운) 결과가 이어질 때 "but"으로 연결합니다. 반복되는 주어는 대명사로 바꾸세요.',
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
        method: '"Both A and B" 구문으로 두 주어를 묶는다.',
        steps: [
          '두 사람 모두 같은 특징(책임감 있는 반장)을 가지므로 "Both A and B" 형태로 합친다.',
          '주어가 "Both Ben and Dave"(복수)가 되면 동사는 is → are로 바꾼다.',
          '명사 "class monitor"도 복수형 "class monitors"로 바꾼다.',
          '완성: "Both Ben and Dave are responsible class monitors."',
        ],
        tip: '"Both A and B"는 복수 취급이므로 be동사는 are, 뒤따르는 명사도 복수형으로 씁니다.',
      },
    },

    // =========================================================================
    // Section C: Comprehension (10 marks) — Q11–19
    // 지문: Caili가 할머니 생일선물로 해바라기 그림을 그리는 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'hp2023-secC-comprehension',
      topic: 'ComprehensionOE',
      title: 'Section C: Comprehension — A Birthday Painting for Grandma',
      instructions: 'Read the passage below and answer questions 11 to 19.',
      passage:
        '"I will paint a vase of sunflowers for Grandma!" Caili said to herself. It was Grandma\'s birthday next Sunday. Caili wanted to paint a picture as a birthday gift for her. After Caili placed her paint set, several paintbrushes and a jar of water on her desk, she began painting.\n\n' +
        'Soon, a vase of gorgeous sunflowers appeared on the paper. Suddenly, Caili\'s sister, Amy, skipped into the room. She exclaimed, "What a beautiful painting! Let me help!" Caili shook her head and told Amy to leave but she did not listen.\n\n' +
        'Amy leaned over to pick up a paintbrush from the desk. Unfortunately, her elbow accidentally knocked against the jar of water and it toppled over. Splash! Water spilt across the painting. The vibrant colours of the painting had become a huge watery mess!\n\n' +
        '"The painting is ruined!" Caili gasped. Horrified by what she had done, Amy stood rooted to the spot with her mouth agape. Softly, she whispered an apology.\n\n' +
        'Caili sighed heavily. Then, she reassured Amy that another painting could be done. With Amy\'s assistance, Caili cleaned up the mess. After that, Caili laid out another sheet of paper for a second painting. Amy asked timidly, "May I help you paint? I will be careful."\n\n' +
        'Caili nodded. Immediately, the sisters began painting another vase of sunflowers. They worked well together. The second painting of a bigger and brighter vase of sunflowers soon appeared on the paper. The sisters beamed with pride. It had turned out to be much better than the first!\n\n' +
        'Caili exclaimed, "Grandma would love this painting!" Amy smiled.',
      marks: 10,
      questions: [
        {
          questionNo: '11',
          format: 'mcq',
          marks: 1,
          stem:
            'Caili wanted to paint a vase of sunflowers for ________. Choose the correct answer and write its number (1, 2 or 3) in the bracket.',
          options: [
            { label: '1', text: 'Amy' },
            { label: '2', text: 'herself' },
            { label: '3', text: 'Grandma' },
          ],
          answer: '3',
          solution: {
            method: '1단락에서 누구를 위한 그림인지 직접 언급된 문장을 찾는다.',
            steps: [
              '1단락: "Caili wanted to paint a picture as a birthday gift for her." (her = Grandma, 앞 문장에서 "Grandma\'s birthday next Sunday"라고 언급됨)',
              '그림은 할머니의 생일 선물용.',
              '따라서 정답은 (3) Grandma.',
            ],
            tip: '대명사(her)가 누구를 가리키는지 바로 앞 문장에서 확인하세요.',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem:
            'Amy accidentally knocked over the jar of water because she was trying to ________. Write its number (1, 2 or 3) in the bracket.',
          options: [
            { label: '1', text: 'get a paintbrush' },
            { label: '2', text: 'reach the paint set' },
            { label: '3', text: 'look closely at the painting' },
          ],
          answer: '1',
          solution: {
            method: '3단락에서 Amy가 무엇을 하려다 물병을 쳤는지 확인한다.',
            steps: [
              '3단락: "Amy leaned over to pick up a paintbrush from the desk. ... her elbow accidentally knocked against the jar of water."',
              'Amy는 페인트브러시를 집으려다(pick up a paintbrush) 팔꿈치로 물병을 쳤다.',
              '따라서 정답은 (1) get a paintbrush.',
            ],
            tip: '"because she was trying to ~"는 행동의 직접적 원인(목적)을 묻는 질문입니다.',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes to show the sequence of events that happened in the story.\n' +
            '( ) Amy skipped into the room.\n' +
            '( ) Caili was painting by herself.\n' +
            '( ) The jar of water was knocked over.',
          answer:
            'Caili was painting by herself = 1; Amy skipped into the room = 2; The jar of water was knocked over = 3',
          solution: {
            method: '사건이 지문에 등장한 순서대로 번호를 매긴다.',
            steps: [
              '1단락: Caili가 혼자 그림을 그리기 시작했다("she began painting") → 1.',
              '2단락: "Suddenly, Caili\'s sister, Amy, skipped into the room." → 2.',
              '3단락: "her elbow accidentally knocked against the jar of water and it toppled over." → 3.',
            ],
            tip: '순서 문제는 지문을 단락 순서대로 따라가며 각 사건이 처음 나오는 위치를 확인합니다.',
          },
        },
        {
          questionNo: '14',
          format: 'open',
          marks: 1,
          stem: 'Read the statement and tick "True" or "False": Amy left the room after Caili told her to.',
          answer: 'False',
          solution: {
            method: 'Amy가 Caili의 말을 따랐는지 2단락에서 확인한다.',
            steps: [
              '2단락: "Caili shook her head and told Amy to leave but she did not listen."',
              'Caili가 나가라고 했지만 Amy는 그 말을 듣지 않았다(did not listen).',
              '따라서 "Caili가 말한 대로 나갔다"는 거짓 → False.',
            ],
            tip: '"told her to ~ but she did not listen"은 지시를 따르지 않았음을 보여주는 핵심 단서입니다.',
          },
        },
        {
          questionNo: '15',
          format: 'open',
          marks: 1,
          stem:
            'Read the statement and tick "True" or "False": Amy wanted to help Caili paint a second painting.',
          answer: 'True',
          solution: {
            method: 'Amy의 요청을 4~5단락에서 확인한다.',
            steps: [
              '5단락: "Amy asked timidly, \'May I help you paint? I will be careful.\'"',
              'Amy는 두 번째 그림을 그릴 때 도와도 되는지 조심스럽게 물었다.',
              '진술과 일치 → True.',
            ],
            tip: '인물의 직접 대화(따옴표 속 말)는 그 인물의 바람/의도를 보여주는 강력한 단서입니다.',
          },
        },
        {
          questionNo: '16',
          format: 'mcq',
          marks: 1,
          stem:
            'Which word, (A) or (B), in the sentence below from paragraph 3 tells you that the jar lost its balance and fell? Circle either (A) or (B). Sentence: "Unfortunately, her elbow accidentally knocked (A) against the jar of water and it toppled (B) over."',
          options: [
            { label: 'A', text: 'knocked' },
            { label: 'B', text: 'toppled' },
          ],
          answer: 'B',
          solution: {
            method: '"균형을 잃고 넘어졌다"는 의미에 맞는 단어를 고른다.',
            steps: [
              'knocked = (무언가에) 부딫혔다 → 충격을 준 동작.',
              'toppled = 균형을 잃고 쓰러지다/넘어지다 → "균형을 잃고 떨어짐"과 정확히 일치.',
              '따라서 정답은 (B) toppled.',
            ],
            tip: '"toppled over"는 물체가 기울어 쓰러지는 모습을 나타내는 전형적인 표현입니다.',
          },
        },
        {
          questionNo: '17',
          format: 'open',
          marks: 1,
          stem: 'What does "It" in line 22 refer to?',
          answer: 'the second painting (of a bigger and brighter vase of sunflowers)',
          solution: {
            method: '대명사 "It" 바로 앞 문장의 핵심 명사를 찾는다.',
            steps: [
              '해당 문장: "The second painting of a bigger and brighter vase of sunflowers soon appeared on the paper. ... It had turned out to be much better than the first!"',
              '"It"이 가리키는 것은 바로 앞에서 언급된 "the second painting"(두 번째 그림).',
              '따라서 "It" = the second painting.',
            ],
            tip: '지시 대명사(It)는 바로 앞 문장에서 가장 가까운 핵심 명사를 가리킵니다.',
          },
        },
        {
          questionNo: '18',
          format: 'open',
          marks: 2,
          stem:
            'According to the passage, list the two ways Amy helped Caili after the jar of water spilt over the painting.\n(a) ________\n(b) ________',
          answer:
            '(a) Amy helped Caili clean up the mess (with her assistance).  (b) Amy helped Caili paint the second painting (of sunflowers).',
          solution: {
            method: '5단락에서 Amy가 도운 두 가지 행동을 찾는다.',
            steps: [
              '5단락: "With Amy\'s assistance, Caili cleaned up the mess." → (a) 어질러진 것을 치우는 것을 도왔다.',
              '같은 단락 뒷부분: Amy가 "May I help you paint?"라고 물었고, 6단락에서 "the sisters began painting another vase of sunflowers... They worked well together." → (b) 두 번째 그림을 함께 그리는 것을 도왔다.',
              '두 가지를 각각 적는다.',
            ],
            tip: '"two ways"는 보통 서로 다른 단락/문장에 나오는 두 개의 도움 행동을 찾으면 됩니다.',
          },
        },
        {
          questionNo: '19',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 6, why did the Caili and Amy beam with pride?',
          answer:
            'They beamed with pride because the second painting of a bigger and brighter vase of sunflowers turned out much better than the first one.',
          solution: {
            method: '6단락에서 "beamed with pride" 앞뒤 문장에서 이유를 찾는다.',
            steps: [
              '6단락: "The second painting of a bigger and brighter vase of sunflowers soon appeared on the paper. The sisters beamed with pride. It had turned out to be much better than the first!"',
              '둘이 함께 그린 두 번째 그림이 첫 번째보다 훨씬 더 멋지게 완성되었기 때문에 자랑스러워했다.',
              '완전한 문장으로 이유를 서술한다.',
            ],
            tip: '"beamed with pride"(자랑스러워하며 활짝 웃었다) 앞뒤의 성취/결과 문장이 이유의 핵심입니다.',
          },
        },
      ],
    },
  ],
};

export default wa1HenryParkPrimaryEnglish2023;
