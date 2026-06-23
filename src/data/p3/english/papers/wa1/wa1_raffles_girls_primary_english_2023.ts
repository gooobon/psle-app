// =============================================================================
// src/data/p3/english/papers/wa1_raffles_girls_primary_english_2023.ts
// Raffles Girls' Primary School — 2023 Weighted Assessment 1 (English) — Primary 3
// 원본 PDF: P3_English_WA1.pdf, 물리적 페이지 148–156 (시험지 표지 p.1–8)
// Total Time: 50 minutes / Total: 15 marks (Section A 7 + Section B 8)
// 듣기·작문 제외. 모든 문제 100% 전사 + 상세 solution 포함.
// =============================================================================

import type { EnglishPaper } from '../types';

export const wa1RafflesGirlsPrimaryEnglish2023: EnglishPaper = {
  meta: {
    school: "Raffles Girls' Primary School",
    year: 2023,
    assessment: 'Weighted Assessment 1',
    level: 'Primary 3',
    subject: 'English',
    durationMins: 50,
    totalMarks: 15,
    sourcePages: 'pp.148–156 (paper pp.1–8)',
  },

  items: [
    // =========================================================================
    // Section A: Comprehension 1 (7 marks) — Q1–6
    // 지문: Jenny와 Dolly, 잘못 배달된 patchwork 천 꾸러미 이야기
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2023-secA-comprehension1',
      topic: 'ComprehensionOE',
      title: 'Section A: Comprehension 1 — The Misdelivered Parcel',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'On the last day of school, Jenny and Dolly were walking home from school with great excitement. Jenny was going to Dolly\'s house to play for the day. When they reached Dolly\'s house, Jenny did not expect to find a parcel at the doorstep.\n\n' +
        'The two girls eagerly tore open the parcel. To their disappointment, it was a box of cloth. The cloth had been cut into square pieces, all of the same size.\n\n' +
        '"Who could have sent this to you?" asked Jenny curiously. Then she noticed a piece of paper by the side of the box. It was a note from the sender. Jenny picked it up and read it aloud, "Hi! Aunt Joyce. Please find the pieces of cloth which I promised to send. They are cut according to the size that you want. Hope you will be able to sew them into a patchwork blanket for Grandmother. It will be such a wonderful gift for her birthday. Thank you!"\n\n' +
        'Jenny and Dolly felt bad about opening the parcel so they decided to return it to the rightful owner. When they checked the name and address, it was none other than Dolly\'s neighbour. They quickly brought the parcel to Aunt Joyce and apologised for opening the parcel.',
      marks: 7,
      questions: [
        {
          questionNo: '1',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 1, why were Jenny and Dolly walking home with excitement? Tick your chosen answer. "They were excited to ________."',
          options: [
            { label: '1', text: 'go to school' },
            { label: '2', text: 'receive the parcel' },
            { label: '3', text: 'play together for the day' },
          ],
          answer: '3',
          solution: {
            method: '1단락에서 신난 이유를 직접 언급한 문장을 찾는다.',
            steps: [
              '1단락: "Jenny was going to Dolly\'s house to play for the day."',
              '학교가 끝난 날, 함께 놀러 가는 길이라 신났다.',
              '꾸러미는 도착 후에 발견한 것이므로 (2)는 원인이 아님 → 정답 (3) play together for the day.',
            ],
            tip: '"why excited"는 신난 행동의 목적/계기를 1단락 첫 부분에서 찾습니다.',
          },
        },
        {
          questionNo: '2',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 1, which word has the same meaning as eagerness?',
          answer: 'excitement',
          solution: {
            method: 'eagerness(열의, 간절함)와 같은 뜻의 단어를 1단락에서 찾는다.',
            steps: [
              '1단락: "Jenny and Dolly were walking home from school with great excitement."',
              'excitement = 신남, 흥분 → eagerness(간절히 하고 싶은 마음)와 의미가 통한다.',
              '따라서 답은 excitement.',
            ],
            tip: '동의어 찾기는 감정을 나타내는 명사 형태(-ment, -ness)를 비교해 봅니다.',
          },
        },
        {
          questionNo: '3',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 to 3, tick "True" or "False": Jenny and Dolly were excited by what they saw in the box.',
          answer: 'False',
          solution: {
            method: '상자를 열었을 때의 감정을 2단락에서 확인한다.',
            steps: [
              '2단락: "The two girls eagerly tore open the parcel. To their disappointment, it was a box of cloth."',
              '열어보고 느낀 감정은 "disappointment"(실망), excitement(신남)가 아니다.',
              '따라서 거짓 → False.',
            ],
            tip: '"To their disappointment"처럼 결과를 나타내는 표현이 인물의 감정을 직접 알려줍니다.',
          },
        },
        {
          questionNo: '4',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 to 3, tick "True" or "False": The cloth had been cut into different sizes.',
          answer: 'False',
          solution: {
            method: '천 조각의 크기에 관한 묘사를 2단락에서 확인한다.',
            steps: [
              '2단락: "The cloth had been cut into square pieces, all of the same size."',
              '천 조각들은 "All the same size"(all of the same size)였다.',
              '따라서 "Were cut into different sizes"는 거짓 → False.',
            ],
            tip: '"all of the same size"(모두 같은 크기)는 "different sizes"(서로 다른 크기)와 정반대입니다.',
          },
        },
        {
          questionNo: '5',
          format: 'open',
          marks: 1,
          stem:
            'Based on paragraphs 2 to 3, tick "True" or "False": The patchwork blanket was to be sewn as a present for Grandmother.',
          answer: 'True',
          solution: {
            method: '편지(note)의 내용에서 패치워크 담요의 용도를 확인한다.',
            steps: [
              '3단락의 편지: "Hope you will be able to sew them into a patchwork blanket for Grandmother. It will be such a wonderful gift for her birthday."',
              '패치워크 담요는 할머니의 생일 선물로 만들어질 예정이었다.',
              '진술과 일치 → True.',
            ],
            tip: '인용된 편지/대화 속에 답이 직접 들어있는 경우가 많습니다.',
          },
        },
        {
          questionNo: '6',
          format: 'open',
          marks: 2,
          stem:
            'From the last paragraph, list 2 things that Jenny and Dolly did after feeling bad about opening the parcel.\n(i) ________\n(ii) ________',
          answer:
            '(i) They brought the parcel to Aunt Joyce (the rightful owner).  (ii) They apologised for opening the parcel.',
          solution: {
            method: '마지막 단락에서 "An action done after feeling something" 두 가지를 찾는다.',
            steps: [
              '마지막 단락: "They quickly brought the parcel to Aunt Joyce and apologised for opening the parcel."',
              '"and"로 두 가지 행동이 연결되어 있다.',
              '(i) 꾸러미를 Aunt Joyce(주인)에게 가져다줌 / (ii) 꾸러미를 연 것에 대해 사과함.',
            ],
            tip: '"list 2 things ~ did"는 지문 속 and로 연결된 두 동사(행동)를 각각 적습니다.',
          },
        },
      ],
    },

    // =========================================================================
    // Section B: Comprehension 2 (8 marks) — Q7–13
    // 지문: The Bogey-Beast (가난한 노파와 변하는 보물 이야기)
    // =========================================================================
    {
      kind: 'set',
      id: 'rgps2023-secB-comprehension2',
      topic: 'ComprehensionOE',
      title: 'Section B: Comprehension 2 — The Bogey-Beast',
      instructions: 'Read the passage carefully and answer the questions that follow.',
      passage:
        'A poor old woman was trotting home one evening when she came across a big pot. Thinking that she could put a flower in it at her window, then she decided to take it home. She bent down and tried to pick it up.\n\n' +
        'When she looked inside, she was pleasantly surprised to see the pot full of gold. It was her first treasure! Carrying it would break her back, so she tied the end of her shawl to the pot and dragged it behind her.\n\n' +
        'Soon, she stopped to rest her feet. However, she was shocked when she looked at her treasure. It was not a pot of gold! It was nothing but a lump of silver.\n\n' +
        '"But this is great!" she said finally. "Silver is not easily stolen. The gold pieces could attract robbers."\n\n' +
        'She started walking again until she had no choice but to take a much-needed little nap. When she woke up, the treasure was nothing but a lump of iron!\n\n' +
        '"This is luck! I shall sell this iron and be rich."\n\n' +
        'She started off again, planning on how she would spend her money. When her bones ached, she stopped and looked behind to check her treasure. At once, her heart skipped a beat.\n\n' +
        '"Oh my!"\n\n' +
        'The stone had turned into a creature and it looked like it was going to pounce on her. She tried hard to calm herself down.\n\n' +
        '(Adapted from https://americanliterature.com/childrens-stories/the-bogey-beast)',
      marks: 8,
      questions: [
        {
          questionNo: '7',
          format: 'open',
          marks: 1,
          stem: 'In paragraph 1, what did the old woman find on her way home?',
          answer: 'She found a big pot.',
          solution: {
            method: '1단락에서 노파가 발견한 물건을 찾는다.',
            steps: [
              '1단락: "A poor old woman was trotting home one evening when she came across a big pot."',
              '집에 가는 길에 발견한 것은 "a big pot"(큰 항아리/솥).',
              '완전한 문장으로: "She found a big pot."',
            ],
            tip: '"what did ~ find"는 지문의 "came across"(우연히 발견하다) 뒤의 명사를 찾으면 됩니다.',
          },
        },
        {
          questionNo: '8',
          format: 'open',
          marks: 1,
          stem:
            'Write 1, 2 and 3 in the boxes below to indicate the order in which the events occurred in paragraph 1.\n' +
            '( ) The old woman picked up the pot.\n' +
            '( ) The old woman decided to take the pot home.\n' +
            '( ) The old woman imagined a flower in the pot by her window.',
          answer:
            'The old woman imagined a flower in the pot by her window = 1; The old woman decided to take the pot home = 2; The old woman picked up the pot = 3',
          solution: {
            method: '1단락의 문장 순서를 그대로 따라간다.',
            steps: [
              '1단락: "Thinking that she could put a flower in it at her window, then she decided to take it home. She bent down and tried to pick it up."',
              '먼저: 창가에 꽃을 꽂은 모습을 상상함("Thinking that she could put a flower in it") → 1.',
              '다음: 집으로 가져가기로 결심함("decided to take it home") → 2.',
              '마지막: 항아리를 집어 들려고 함("tried to pick it up") → 3.',
            ],
            tip: '"Thinking that ~, then she decided ~. She bent down and..."처럼 한 문장 안의 순서를 그대로 따라가면 됩니다.',
          },
        },
        {
          questionNo: '9',
          format: 'open',
          marks: 1,
          stem: 'Which sentence in paragraph 3 tells you that the old woman was tired?',
          answer: 'Soon, she stopped to rest her feet.',
          solution: {
            method: '"Tiredness / Feeling tired"을 드러내는 문장을 3단락에서 찾는다.',
            steps: [
              '3단락 첫 문장: "Soon, she stopped to rest her feet."',
              '발을 쉬려고 멈췄다는 것은 그녀가 지쳤음을 보여준다.',
              '따라서 답은 "Soon, she stopped to rest her feet."',
            ],
            tip: '"stopped to rest"(쉬려고 멈췄다)는 피로를 나타내는 직접적인 표현입니다.',
          },
        },
        {
          questionNo: '10',
          format: 'open',
          marks: 1,
          stem:
            'Answer in a complete sentence. In paragraph 2, what does the phrase "carrying it would break her back" tell you about the pot?',
          answer: 'It tells us that the pot was very heavy.',
          solution: {
            method: '"To the point of breaking one's back"라는 표현이 의미하는 항아리의 특징을 생각한다.',
            steps: [
              '"carrying it would break her back"는 "If you carry it, your back will break"라는 과장된 표현.',
              '이는 항아리가 매우 무거웠음을 나타낸다.',
              '완전한 문장으로: "It tells us that the pot was very heavy."',
            ],
            tip: '과장된 신체 표현(break her back)은 보통 무게나 고통의 정도를 강조합니다.',
          },
        },
        {
          questionNo: '11',
          format: 'open',
          marks: 1,
          stem:
            "Answer in a complete sentence. In paragraph 6, why was the old woman not disappointed when she found that the silver had turned into iron?",
          answer:
            'She was not disappointed because she thought it was lucky and believed she could sell the iron and become rich.',
          solution: {
            method: '6단락(쇠로 변한 후의 반응)에서 노파의 생각을 찾는다.',
            steps: [
              '6단락: "\'This is luck! I shall sell this iron and be rich.\'"',
              '그녀는 쇠로 변한 것을 "Luck"이라 여기고, 팔아서 부자가 될 수 있다고 생각했다.',
              '실망하지 않은 이유는 매번 새로운 가치를 발견했기 때문 → 완전한 문장으로 서술.',
            ],
            tip: '인물이 실망하지 않은 이유는 보통 그 인물의 직접적인 말(따옴표) 속에서 찾을 수 있습니다.',
          },
        },
        {
          questionNo: '12',
          format: 'mcq',
          marks: 1,
          stem:
            'In paragraph 7, when the old woman\'s heart skipped a beat, it meant that she felt ________. Tick your chosen answer (Tick only).',
          options: [
            { label: '1', text: 'sad' },
            { label: '2', text: 'horrified' },
            { label: '3', text: 'unconcerned' },
          ],
          answer: '2',
          solution: {
            method: '"Was so surprised that the heart nearly jumped out" 이후의 상황(8~9단락)을 통해 감정을 추론한다.',
            steps: [
              '7단락 직후: "Oh my!"라고 외치고, 9단락에서 "The stone had turned into a creature and it looked like it was going to pounce on her."',
              '돌이 생물로 변해 자신에게 달려들 듯한 모습을 보고 놀랐다 → 매우 두려운 감정.',
              '"heart skipped a beat"(심장이 멎는 듯함)는 충격/공포를 나타냄 → 정답 (2) horrified.',
            ],
            tip: '"heart skipped a beat"는 보통 충격이나 두려움을 표현하는 신체 반응입니다.',
          },
        },
        {
          questionNo: '13',
          format: 'open',
          marks: 2,
          stem:
            'Answer in a complete sentence. Based on paragraph 9, give two reasons why the old woman had to calm herself.',
          answer:
            'The old woman had to calm herself because the stone had turned into a creature, and because the creature looked like it was going to pounce on her.',
          solution: {
            method: '9단락의 두 가지 사건(변신 + 공격 위협)을 모두 찾는다.',
            steps: [
              '9단락: "The stone had turned into a creature and it looked like it was going to pounce on her."',
              '이유 1: 돌이 갑자기 생물로 변했다(놀라운 변화).',
              '이유 2: 그 생물이 자신을 공격할 것처럼 보였다(위협).',
              '두 이유를 모두 포함한 완전한 문장으로 답한다.',
            ],
            tip: '"two reasons"는 한 문장 안의 두 사건(and로 연결됨)을 각각 풀어 적습니다.',
          },
        },
      ],
    },
  ],
};

export default wa1RafflesGirlsPrimaryEnglish2023;
