// ============================================================
// Anglo-Chinese School (Junior) — P3 English Bite-Sized Assessment 2
// Date: 4 May 2022  |  Total: 10 marks
// Comprehension Passage: The Clever Monkey (adapted from
// The British Council Short Stories)
// ============================================================

import type { Topic, Solution, QuestionTypeA, QuestionTypeB, PassageQuestion, Question } from "./eoy_acsj_bookletA_2025";

// ============================================================
//  PASSAGE + COMPREHENSION QUESTIONS (Q1–Q7, 10 marks)
// ============================================================

export const acsj_bsa2_2022_comp: QuestionTypeB = {
  kind: "set",
  id: "acsj_bsa2_2022_comp",
  topic: "ComprehensionOE",
  passage: `Once upon a time, there was a clever monkey who lived on a beautiful island, in an apple tree. One day, a crocodile swam to the island. "I'm hungry," he said. The monkey threw a red apple to the crocodile. The crocodile munched on it contentedly.

The next day, the crocodile came back once again. "Please, may I have two apples?" he asked. The monkey threw two apples to the crocodile. He ate one and gave one to his wife.

The crocodile went to see the monkey every day to listen to his tales and eat his apples. He was envious of the monkey's intelligence. The crocodile's wife had an idea. "Why don't you eat his heart? Then you'll be just like him!"

The next day, he said to the monkey, "Come to my house! We'll have lunch together. I would also like to thank you for the apples."

When the monkey arrived, the crocodile snapped and said, "Monkey! I want to eat your heart, so that I can be as clever as you!"

The clever monkey thought quickly and said, "But... I haven't got my heart here. It's on the island, in the apple tree."

They went back to the island. "Wait here, and I will get my heart," said the monkey.

The monkey quickly climbed the tree and sat at the top. "Oh, Crocodile. You are greedy. Of course, you can't have my heart and now, you can't have my apples!" The clever monkey swung from tree to tree and laughed his heart away!

In the end, the crocodile regretted listening to his wife. He lost a friend and the supply of apples.

Adapted from The British Council Short Stories - The Clever Monkey`,
  questions: [
    {
      id: "acsj_bsa2_2022_q1",
      marks: 1,
      question:
        "Which word in paragraph 1 has the same meaning as 'witty'?",
      answer: "clever",
      solution: {
        method: "Vocabulary — synonym search in passage",
        steps: [
          "The question asks for a word from paragraph 1 meaning 'witty'.",
          "'Witty' means clever, intelligent, or quick with words.",
          "Paragraph 1: 'Once upon a time, there was a clever monkey...'",
          "'clever' = intelligent/witty ✓.",
          "This is the only word in paragraph 1 that matches the meaning of 'witty'.",
        ],
        tip: "'Witty' means clever and funny/quick-thinking. The word 'clever' in paragraph 1 is the synonym. Both describe someone who is smart and quick-minded.",
      },
    },
    {
      id: "acsj_bsa2_2022_q2",
      marks: 1,
      question:
        "What does the phrase 'just like him' in line 9 mean?\nIt means ___",
      answer:
        "It means to be as clever as the monkey. / It means to be just as intelligent/smart as the monkey.",
      solution: {
        method: "Phrase interpretation in context",
        steps: [
          "Line 9 (paragraph 3): 'Why don't you eat his heart? Then you'll be just like him!'",
          "The crocodile's wife is suggesting that eating the monkey's heart will make the crocodile become like the monkey.",
          "What is the monkey known for? → His intelligence/cleverness (stated from the beginning).",
          "'Just like him' = as clever/intelligent as the monkey.",
          "Full answer: It means to be as clever as the monkey.",
        ],
        tip: "To understand a phrase 'like him/her/them', ask: What is this person known for? The monkey is known for being clever → 'just like him' = as clever as the monkey.",
      },
    },
    {
      id: "acsj_bsa2_2022_q3",
      marks: 2,
      question:
        "Which TWO of the following characteristics would you describe the crocodile's wife?\nTick (✓) your responses below.\n[ ] crafty\n[ ] contented\n[ ] ungrateful\n[ ] appreciative",
      answer: "crafty, ungrateful",
      solution: {
        method: "Character inference from text",
        steps: [
          "Analyse the crocodile's wife's behaviour in the passage.",
          "She suggested: 'Why don't you eat his heart?' — This is a sneaky, devious idea → CRAFTY ✓.",
          "Despite the monkey's generosity (sharing apples freely), the wife wants to harm the monkey. Showing no gratitude for the kindness received → UNGRATEFUL ✓.",
          "'Contented' means satisfied — she is NOT contented; she wants more (the monkey's cleverness).",
          "'Appreciative' means thankful — she is NOT appreciative; she plots against the very monkey who shared his apples.",
          "Answer: crafty and ungrateful.",
        ],
        tip: "To identify character traits, look at ACTIONS and WORDS in the story. Suggesting to eat the monkey's heart = sneaky (crafty). Not being thankful for the monkey's apples = ungrateful.",
      },
    },
    {
      id: "acsj_bsa2_2022_q4",
      marks: 2,
      question:
        "What were the TWO reasons that the crocodile used to invite the monkey to his house?\n(i)\n(ii)",
      answer:
        "(i) He wanted to have lunch together with the monkey.\n(ii) He wanted to thank the monkey for the apples.",
      solution: {
        method: "Locate two specific reasons from the passage",
        steps: [
          "Find the invitation in the passage.",
          "Paragraph 4 (line 10-11): '\"Come to my house! We'll have lunch together. I would also like to thank you for the apples.\"'",
          "Reason (i): To have lunch together.",
          "Reason (ii): To thank the monkey for the apples.",
          "Note: These were the STATED reasons. The true reason (to eat his heart) was hidden.",
          "1 mark for each reason.",
        ],
        tip: "When the question asks for 'reasons the character used', it means the reasons the character STATED or GAVE — not the true hidden motive. Find the character's actual words in the invitation.",
      },
    },
    {
      id: "acsj_bsa2_2022_q5",
      marks: 1,
      question:
        "In lines 14-15, why did the monkey tell the crocodile that his heart was in the apple tree?",
      answer:
        "The monkey told the crocodile that his heart was in the apple tree to trick/deceive the crocodile and escape from him / to buy time to get away from the crocodile.",
      solution: {
        method: "Inference — character motive",
        steps: [
          "Lines 14-15: 'The clever monkey thought quickly and said, \"But... I haven't got my heart here. It's on the island, in the apple tree.\"'",
          "Why would the monkey say something obviously untrue (you can't leave your heart behind)?",
          "The crocodile revealed his plan to eat the monkey's heart.",
          "The monkey was in danger and needed to escape.",
          "By saying his heart was in the tree, the monkey tricked the crocodile into going back to the island — giving the monkey a chance to escape to safety.",
          "Answer: to trick/deceive the crocodile and escape from him.",
        ],
        tip: "Ask: Was the monkey telling the truth? No — it's impossible to leave your heart in a tree. So why say it? → It was a clever trick to fool the crocodile and get back to safety (the island with the apple tree).",
      },
    },
    {
      id: "acsj_bsa2_2022_q6a",
      marks: 1,
      question:
        "Read the statement: 'The monkey went back to the island to get his heart.' (Refer to lines 8 to 20.)\nTrue or False?",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — fact-checking against passage",
        steps: [
          "Statement: 'The monkey went back to the island to get his heart.'",
          "From the passage: The monkey said his heart was in the tree — but this was a LIE/TRICK.",
          "The monkey's real purpose in going back to the island was to ESCAPE, not to get his heart.",
          "Lines 16-19: 'They went back to the island. \"Wait here, and I will get my heart,\" said the monkey. The monkey quickly climbed the tree...' — and then escaped.",
          "So the monkey went back to ESCAPE, not to get his heart → Statement is FALSE.",
        ],
        tip: "Be careful with True/False questions about character motives. The monkey SAID he was going to get his heart, but his real reason was to escape. The statement about his motive is False.",
      },
    },
    {
      id: "acsj_bsa2_2022_q6b",
      marks: 1,
      question:
        "Read the statement: 'The crocodile was greedy as he wanted more apples to eat.' (Refer to lines 8 to 20.)\nTrue or False?",
      options: ["True", "False"],
      answer: "False",
      solution: {
        method: "True/False — careful reading of passage details",
        steps: [
          "Statement: 'The crocodile was greedy as he wanted more apples to eat.'",
          "Was the crocodile greedy? The monkey calls him greedy: 'Oh, Crocodile. You are greedy.'",
          "BUT — was his greediness about wanting MORE APPLES?",
          "From the passage: The crocodile was greedy because he wanted to eat the monkey's HEART to become clever — not because he wanted more apples.",
          "'He was envious of the monkey's intelligence' and his wife said 'Why don't you eat his heart?'",
          "The reason for greediness was CLEVERNESS/INTELLIGENCE, not more apples.",
          "Therefore the statement is FALSE.",
        ],
        tip: "Watch for statements that are PARTIALLY true. The crocodile WAS greedy (true), but the REASON given ('wanted more apples') is wrong — he wanted the monkey's heart/cleverness. If any part of the statement is wrong, it's False.",
      },
    },
    {
      id: "acsj_bsa2_2022_q7",
      marks: 1,
      question:
        "In the last paragraph, the crocodile learned to be ___.\nTick (✓) your chosen answer:\n[ ] hardworking like the monkey\n[ ] contented with who he was\n[ ] obedient and listen to his wife",
      answer: "contented with who he was",
      solution: {
        method: "Inference from final paragraph",
        steps: [
          "Last paragraph: 'In the end, the crocodile regretted listening to his wife. He lost a friend and the supply of apples.'",
          "The crocodile's downfall came from wanting to be like the monkey (envious of intelligence).",
          "The lesson: be satisfied with who you are — don't be greedy or envious.",
          "'Contented with who he was' = accepting and satisfied with himself, not wanting to be someone else ✓.",
          "'Hardworking like the monkey' — no evidence the monkey was hardworking in this story.",
          "'Obedient and listen to his wife' — the crocodile REGRETTED listening to his wife, so this is the OPPOSITE of the lesson.",
        ],
        tip: "For 'what lesson did the character learn?' questions, look at: (1) what went wrong, (2) what the character regretted. The crocodile wanted more than he had → lost everything → learned to be content with himself.",
      },
    },
  ],
};

// ============================================================
//  COMBINED EXPORT
// ============================================================

export const acsj_bsa2_2022: Question[] = [acsj_bsa2_2022_comp];

export const paperMetaBSA2 = {
  school: "Anglo-Chinese School (Junior)",
  code: "ACS(J)",
  year: 2022,
  exam: "Bite-Sized Assessment 2 (BSA2)",
  level: "Primary 3",
  totalMarks: 10,
  sections: [
    {
      name: "Comprehension: The Clever Monkey",
      questions: 7,
      marks: 10,
      topic: "ComprehensionOE" as Topic,
    },
  ],
};
