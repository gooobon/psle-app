// =============================================================================
// src/data/p3/english/comprehension_generated.ts
// AUTO-GENERATED 8-type comprehension questions (Stage 3).
// Maps a passage-key (first 80 chars, lowercased, whitespace-collapsed)
// to a standardised 8-type question set. Consumed by p3PaperBridge.
// Do not edit by hand -- regenerate via build_comp_ts.js.
// =============================================================================

export const comprehensionGenerated: Record<string, {
  id: string;
  title: string;
  instructions: string;
  marks: number;
  questions: any[];
}> = {
  "a merchant wanted to sell a few sacks of salt to a village nearby. he tied up th": {
    "id": "nh2023-comprehension2",
    "title": "Comprehension 2 - The Merchant and the Donkey",
    "instructions": "Read the following passage carefully and answer questions 41 to 46. All answers must be based on the given text. Answer in complete sentences.",
    "marks": 10,
    "questions": [
      {
        "id": "q1_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The donkey felt very tired because the sacks of salt were very ______.",
        "answer": "heavy",
        "acceptableAnswers": [
          "heavy",
          "very heavy"
        ],
        "solution": {
          "evidence": "sacks that were filled with salt were very heavy",
          "evidenceParagraph": 2,
          "trap": "big",
          "trapExplanation": "The passage says the sacks were heavy, not big, which caused the donkey's tiredness.",
          "keywords": [
            "heavy",
            "tired"
          ],
          "answerFormat": "one adjective",
          "tip": "Look for the word that describes the weight of the sacks in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence describing how the donkey felt.",
            "Identify the adjective describing the sacks."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the size of the sacks shrink when the donkey fell into the river the first time?",
        "options": [
          "The sacks had a hole in them.",
          "Most of the salt had dissolved in the water.",
          "The merchant removed some salt from the sacks.",
          "The donkey shook the salt out of the sacks."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Most of it had dissolved in the water",
          "evidenceParagraph": 2,
          "trap": "The sacks had a hole in them.",
          "trapExplanation": "The passage states the salt dissolved in the water, not that the sacks had holes.",
          "keywords": [
            "dissolved",
            "water"
          ],
          "answerFormat": "one option A-D",
          "tip": "Look for the reason the sacks became lighter in paragraph 2.",
          "steps": [
            "Re-read paragraph 2.",
            "Find the sentence explaining why the sacks shrunk.",
            "Match the reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Did the donkey fall into the river on the second day by accident or on purpose?",
        "abSentence": "The donkey remembered what had happened earlier and fell into the water (A) accidentally ... (B) on purpose.",
        "abChoices": {
          "A": "accidentally",
          "B": "on purpose"
        },
        "answer": "B",
        "solution": {
          "evidence": "fell into the water on purpose",
          "evidenceParagraph": 3,
          "trap": "A",
          "trapExplanation": "The passage clearly states the donkey fell on purpose, not by accident, on the second day.",
          "keywords": [
            "on purpose",
            "trick"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look at paragraph 3 for the word that tells you whether the donkey's fall was intentional.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find the phrase describing how the donkey fell.",
            "Decide if the fall was accidental or deliberate."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means soaked up or took in liquid?",
        "answer": "absorbed",
        "acceptableAnswers": [
          "absorbed"
        ],
        "solution": {
          "evidence": "the cotton absorbed water",
          "evidenceParagraph": 5,
          "trap": "dissolved",
          "trapExplanation": "'Dissolved' means to melt into a liquid, whereas 'absorbed' means to soak up liquid, which is what cotton does.",
          "keywords": [
            "absorbed",
            "cotton"
          ],
          "answerFormat": "one word from paragraph 5",
          "tip": "Think about what cotton does when it gets wet - find the word in paragraph 5 that means this.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Look for a word related to liquid being soaked up.",
            "Check that the word is found in paragraph 5."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The merchant placed sacks of cotton on the donkey.",
          "The donkey tripped and fell into the river by accident.",
          "The donkey jumped into the river on purpose but could not stand up."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "sacks that were filled with salt were very heavy and the donkey felt very tired",
          "evidenceParagraph": 2,
          "trap": "Placing the cotton sacks as the first event",
          "trapExplanation": "The accidental fall happened on the first day, before the merchant used cotton on the third day.",
          "keywords": [
            "first",
            "second",
            "third"
          ],
          "answerFormat": "write 1, 2 or 3 beside each event",
          "tip": "Look for clue words like 'the next day' and 'on the third day' to order the events correctly.",
          "steps": [
            "Identify time-order clue words in the passage.",
            "Match each event to the correct day.",
            "Number the events 1, 2 and 3 accordingly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "The merchant borrowed sacks of cotton from another trader.",
          "The donkey boasted to the merchant about his trick."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "the sacks were filled with cotton which the merchant had borrowed from another trader",
          "evidenceParagraph": 4,
          "trap": "Saying the second statement is True",
          "trapExplanation": "The donkey boasted to his friends, not to the merchant, according to paragraph 3.",
          "keywords": [
            "borrowed",
            "boasted"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Read each statement carefully and find the matching sentence in the passage to check if it is correct.",
          "steps": [
            "Find the sentence about borrowing cotton in paragraph 4.",
            "Find the sentence about boasting in paragraph 3.",
            "Compare each statement to the passage carefully."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "The merchant was not aware that the donkey fell into the river on purpose on the second day. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The merchant watched the donkey fall but said nothing, which shows he noticed but chose to stay quiet.",
          "The passage says the merchant watched the donkey fall, so he knew it was on purpose."
        ],
        "solution": {
          "evidence": "The merchant watched the donkey fall but said nothing",
          "evidenceParagraph": 3,
          "trap": "True",
          "trapExplanation": "The passage says the merchant watched the donkey fall, meaning he was aware; he simply chose not to say anything.",
          "keywords": [
            "watched",
            "said nothing"
          ],
          "answerFormat": "write True or False and give one reason",
          "tip": "Look for what the merchant did when the donkey fell on the second day - did he notice or not?",
          "steps": [
            "Find the sentence describing the merchant's reaction in paragraph 3.",
            "Check whether the merchant saw the donkey fall.",
            "Use this evidence to decide if the statement is True or False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q1_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why was the donkey embarrassed at the end of the story?",
        "answer": "The donkey was embarrassed because he realised that the merchant had been teaching him a lesson for being lazy.",
        "solution": {
          "evidence": "the donkey realised that the merchant was teaching him a lesson",
          "evidenceParagraph": 7,
          "trap": "The donkey was embarrassed because he fell into the water.",
          "trapExplanation": "The donkey's embarrassment was caused by realising the merchant had taught him a lesson, not simply by falling into the water.",
          "keywords": [
            "embarrassed",
            "lesson"
          ],
          "answerFormat": "answer in a complete sentence starting with 'The donkey was embarrassed because...'",
          "tip": "Look at the last two paragraphs to find the reason for the donkey's embarrassment.",
          "steps": [
            "Read the final paragraphs carefully.",
            "Find the sentence explaining why the donkey was embarrassed.",
            "Write your answer as a complete sentence with a reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "taki and haru lived in a small village near the jungle. they made a living by hu": {
    "id": "chs-pp1-secH-comprehension",
    "title": "Section H - Comprehension: Taki, Haru and Koko",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q2_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Taki and Haru made a living by hunting animals and selling their meat in the ______.",
        "answer": "village market",
        "acceptableAnswers": [
          "village market"
        ],
        "solution": {
          "evidence": "selling their meat in the village market",
          "evidenceParagraph": 1,
          "trap": "jungle market",
          "trapExplanation": "The market was in the village, not in the jungle.",
          "keywords": [
            "selling",
            "market"
          ],
          "answerFormat": "2 words",
          "tip": "Look for where Taki and Haru sold the meat.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence about selling meat.",
            "Identify the location where the meat was sold."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Taki and Haru decide to go home even though they were empty-handed?",
        "options": [
          "They were tired and hungry.",
          "It was getting late.",
          "They heard a strange sound.",
          "They found a baby monkey."
        ],
        "answer": 1,
        "solution": {
          "evidence": "As it was getting late, they decided to go home",
          "evidenceParagraph": 2,
          "trap": "They were tired and hungry.",
          "trapExplanation": "The passage says it was getting late, not that they were tired or hungry.",
          "keywords": [
            "getting late",
            "decided"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the reason stated directly in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence explaining why they went home.",
            "Select the option that matches the reason given."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how the monkey tapped on the ground?",
        "abSentence": "The monkey tapped (A) miserably on the ground and stared (B) weakly at the boys.",
        "abChoices": {
          "A": "miserably",
          "B": "weakly"
        },
        "answer": "A",
        "solution": {
          "evidence": "The monkey tapped miserably on the ground",
          "evidenceParagraph": 2,
          "trap": "weakly",
          "trapExplanation": "'Weakly' describes how the monkey stared, not how it tapped on the ground.",
          "keywords": [
            "tapped",
            "miserably"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Match the describing word to the correct action - tapped, not stared.",
          "steps": [
            "Read the sentence carefully.",
            "Identify which action is 'tapping'.",
            "Choose the word that describes the tapping action."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means liking to play tricks or causing small troubles?",
        "answer": "mischievous",
        "acceptableAnswers": [
          "mischievous"
        ],
        "solution": {
          "evidence": "Koko was a friendly but mischievous monkey",
          "evidenceParagraph": 3,
          "trap": "friendly",
          "trapExplanation": "'Friendly' means easy to get along with, not liking to cause small troubles.",
          "keywords": [
            "mischievous",
            "tricks"
          ],
          "answerFormat": "Single word from paragraph 3",
          "tip": "Think about which word describes someone who likes to cause small troubles or play pranks.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Look for a word that means liking to play tricks.",
            "Check that the word fits the meaning given in the question."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened.",
        "sequenceItems": [
          "Haru found a baby monkey with a cut on its paw.",
          "Taki and Haru named the monkey Koko.",
          "Koko performed tricks at village festivals."
        ],
        "answer": [
          1,
          2,
          3
        ],
        "solution": {
          "evidence": "he realised that the sound was coming from a baby monkey which had a cut on one of its paws",
          "evidenceParagraph": 2,
          "trap": "Naming Koko before finding it",
          "trapExplanation": "The boys could only name the monkey after finding and bringing it home.",
          "keywords": [
            "found",
            "named",
            "performed"
          ],
          "answerFormat": "Write 1, 2 or 3 beside each event",
          "tip": "Follow the events paragraph by paragraph to find the correct order.",
          "steps": [
            "Find where each event is mentioned in the passage.",
            "Check which paragraph each event appears in.",
            "Arrange the events from earliest to latest."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Koko helped to guard the house when Taki and Haru were away.",
          "The villagers were angry when Koko performed tricks for them."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "it helped to guard the house when the boys were not around",
          "evidenceParagraph": 3,
          "trap": "False for the first statement",
          "trapExplanation": "The passage clearly states Koko guarded the house when the boys were not around.",
          "keywords": [
            "guard",
            "amused"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check each statement against the passage carefully before deciding.",
          "steps": [
            "Read the first statement and find the matching sentence in the passage.",
            "Read the second statement and find the matching sentence in the passage.",
            "Write True if it matches and False if it does not."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Taki and Haru were able to earn extra money because of Koko. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The two boys trained Koko to pluck coconuts and taught it tricks so they could earn some extra money. Villagers even paid Taki and Haru to get Koko to perform at village festivals.",
          "Koko performed tricks for the villagers and some even paid Taki and Haru to get Koko to perform at village festivals."
        ],
        "solution": {
          "evidence": "Some even paid Taki and Haru to get Koko to perform at village festivals",
          "evidenceParagraph": 4,
          "trap": "False, because Koko also caused trouble by throwing banana peels.",
          "trapExplanation": "Causing mischief is separate from earning money; the passage clearly states villagers paid the boys for Koko's performances.",
          "keywords": [
            "paid",
            "extra money",
            "perform"
          ],
          "answerFormat": "Write True or False and give one reason using evidence from the passage",
          "tip": "Support your answer with evidence from the passage about how Koko helped earn money.",
          "steps": [
            "Decide if the statement is true or false.",
            "Find the sentence in the passage that supports your answer.",
            "Write a complete reason using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q2_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Haru suggest bringing the baby monkey back home?",
        "answer": "Haru suggested bringing the baby monkey back home because it had a cut on one of its paws and was tapping miserably on the ground and staring weakly at the boys.",
        "solution": {
          "evidence": "a baby monkey which had a cut on one of its paws",
          "evidenceParagraph": 2,
          "trap": "Because Haru wanted a pet monkey.",
          "trapExplanation": "The passage does not say Haru wanted a pet; he brought it back because it was injured and in distress.",
          "keywords": [
            "cut",
            "paws",
            "miserably"
          ],
          "answerFormat": "Write a complete sentence starting with 'Haru suggested...' or 'Because...'",
          "tip": "Include details about the monkey's injury and condition to give a complete answer.",
          "steps": [
            "Find the part of the passage describing the monkey's condition.",
            "Identify why Haru felt the monkey needed help.",
            "Write a complete sentence explaining the reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "a stunning peacock was dancing happily on a cool windy day. the weather was so p": {
    "id": "chs-pp1-secI-comprehension",
    "title": "Section I - Comprehension: The Sad Peacock",
    "instructions": "Read the passage carefully. Write your answers in complete sentences.",
    "marks": 10,
    "questions": [
      {
        "id": "q3_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The peacock was dancing happily on a cool windy day because the weather was so ______.",
        "answer": "pleasant",
        "acceptableAnswers": [
          "pleasant",
          "nice and pleasant"
        ],
        "solution": {
          "evidence": "The weather was so pleasant that he started singing too",
          "evidenceParagraph": 1,
          "trap": "windy",
          "trapExplanation": "Windy describes the day, not the reason he was happy dancing. The passage says the weather was 'pleasant'.",
          "keywords": [
            "weather",
            "pleasant"
          ],
          "answerFormat": "one adjective",
          "tip": "Look for the word that describes how the weather made the peacock feel like dancing and singing.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence about the weather.",
            "Pick the adjective that describes the weather."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the peacock stop dancing?",
        "options": [
          "He was tired from dancing too long.",
          "Sadness filled him when he heard the nightingale sing.",
          "The fairy told him to stop dancing.",
          "The weather became cold and unpleasant."
        ],
        "answer": 1,
        "solution": {
          "evidence": "The peacock even stopped dancing as sadness filled him",
          "evidenceParagraph": 2,
          "trap": "He was tired from dancing too long.",
          "trapExplanation": "The passage does not say he was tired. He stopped because sadness filled him after hearing the nightingale's beautiful voice.",
          "keywords": [
            "stopped dancing",
            "sadness"
          ],
          "answerFormat": "choose one option",
          "tip": "Find the sentence in paragraph 2 that explains why the peacock stopped dancing.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the line about the peacock stopping dancing.",
            "Match that reason to one of the four options."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes the peacock's voice?",
        "abSentence": "The peacock's voice was (A) melodious but (B) horrible when he sang.",
        "abChoices": {
          "A": "melodious",
          "B": "horrible"
        },
        "answer": "B",
        "solution": {
          "evidence": "his rough voice sounded so horrible",
          "evidenceParagraph": 1,
          "trap": "A",
          "trapExplanation": "Melodious describes the nightingale's voice, not the peacock's. The passage says the peacock's voice was horrible.",
          "keywords": [
            "rough",
            "horrible"
          ],
          "answerFormat": "circle A or B",
          "tip": "Check paragraph 1 for the word used to describe the peacock's own voice.",
          "steps": [
            "Read paragraph 1.",
            "Find the sentence about the peacock's voice.",
            "Choose the word that matches."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'weakened or lessened his happiness'?",
        "answer": "dampened",
        "acceptableAnswers": [
          "dampened"
        ],
        "solution": {
          "evidence": "The melodious voice of the nightingale further dampened his spirit",
          "evidenceParagraph": 2,
          "trap": "saddened",
          "trapExplanation": "'Saddened' is not a word used in the passage. The exact word from paragraph 2 is 'dampened'.",
          "keywords": [
            "dampened",
            "spirit"
          ],
          "answerFormat": "one word from paragraph 2",
          "tip": "Look for a word in paragraph 2 that shows the nightingale's voice made the peacock feel even worse.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence about the nightingale's voice affecting the peacock.",
            "Identify the verb that means to weaken someone's mood."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The fairy appeared and spoke to the sad peacock.",
          "The peacock was dancing happily on a cool windy day.",
          "The peacock learnt to treasure his own unique talent."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "A stunning peacock was dancing happily on a cool windy day",
          "evidenceParagraph": 1,
          "trap": "Placing the fairy's appearance first.",
          "trapExplanation": "The peacock dancing comes first in paragraph 1. The fairy appears later in paragraph 3, and the lesson is learnt at the end.",
          "keywords": [
            "dancing",
            "fairy",
            "treasure"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Go through the passage paragraph by paragraph to find the correct order of events.",
          "steps": [
            "Find where each event appears in the passage.",
            "Assign number 1 to the earliest event.",
            "Assign 2 and 3 to the events that follow."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "The nightingale had a melodious and beautiful singing voice.",
          "The peacock was happy comparing himself to the nightingale."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "the nightingale had such a beautiful one",
          "evidenceParagraph": 2,
          "trap": "Marking the second statement as True.",
          "trapExplanation": "The passage says comparing himself to the nightingale made the peacock sad and upset, not happy.",
          "keywords": [
            "melodious",
            "comparing"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check both paragraph 2 and the peacock's own words to verify each statement.",
          "steps": [
            "Find evidence for the first statement in paragraph 2.",
            "Find evidence for the second statement in paragraphs 2 and 7.",
            "Decide if each statement matches what the passage says."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The fairy believed that every person has something special about them. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The fairy said 'Everyone is special in his own way' and that everyone has unique traits and talents that help them shine.",
          "The fairy told the peacock that everyone has unique traits and talents, showing she believed everyone is special."
        ],
        "solution": {
          "evidence": "Everyone is special in his own way. We all have unique traits and talents that help us shine",
          "evidenceParagraph": 5,
          "trap": "False",
          "trapExplanation": "The fairy clearly states that everyone is special in his own way and has unique talents, so the statement is True.",
          "keywords": [
            "special",
            "unique",
            "talents"
          ],
          "answerFormat": "write True or False and give a reason",
          "tip": "Find the fairy's exact words in paragraph 5 to support your reason.",
          "steps": [
            "Read the fairy's speech in paragraph 5.",
            "Identify the sentence that shows her belief about everyone being special.",
            "Use that sentence as your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q3_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the peacock think he had been silly at the end of the story?",
        "answer": "The peacock thought he had been silly because he had been so busy comparing himself to others that he forgot he had his own unique talent.",
        "solution": {
          "evidence": "I had been so busy comparing myself to others that I forgot I had my own unique talent",
          "evidenceParagraph": 7,
          "trap": "He was silly because he could not sing well.",
          "trapExplanation": "The passage does not say he was silly for having a bad voice. He was silly for comparing himself to others and forgetting his own talent.",
          "keywords": [
            "comparing",
            "unique talent"
          ],
          "answerFormat": "write a complete sentence starting with 'The peacock thought he had been silly because...'",
          "tip": "Use the peacock's own words in the last paragraph to form your answer.",
          "steps": [
            "Read the last paragraph carefully.",
            "Find the reason the peacock gives for feeling silly.",
            "Write your answer in a complete sentence using 'because'."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "\"grandma, grandpa, this is going to be awesome!\" josh exclaimed, his eyes twinkl": {
    "id": "tn2025-secH-comprehension",
    "title": "Section H: Comprehension Open-Ended - An Adventure at Pulau Ubin",
    "instructions": "Read the passage below and answer questions 39 to 43. Your answers must be based on the passage.",
    "marks": 10,
    "questions": [
      {
        "id": "q4_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Josh felt ______ when he first stepped foot on Pulau Ubin.",
        "answer": "splendid",
        "acceptableAnswers": [
          "excited",
          "full of excitement"
        ],
        "solution": {
          "evidence": "Josh felt splendid",
          "evidenceParagraph": 1,
          "trap": "happy",
          "trapExplanation": "The passage uses the specific word 'splendid', not 'happy'.",
          "keywords": [
            "felt",
            "splendid"
          ],
          "answerFormat": "one word describing Josh's feeling",
          "tip": "Look for the exact word the passage uses to describe how Josh felt.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence that describes how Josh felt.",
            "Pick out the exact describing word used."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "What did the cheeky monkey do when it swung down from the branches?",
        "options": [
          "It bit Josh on the hand.",
          "It grabbed Josh's food.",
          "It stole Josh's backpack.",
          "It frightened Grandma and Grandpa."
        ],
        "answer": 1,
        "solution": {
          "evidence": "a cheeky monkey swung down from the branches and grabbed Josh's food",
          "evidenceParagraph": 3,
          "trap": "It stole Josh's backpack.",
          "trapExplanation": "The monkey grabbed Josh's food (snacks), not his backpack. The missing backpack is a separate event.",
          "keywords": [
            "monkey",
            "grabbed",
            "food"
          ],
          "answerFormat": "choose one option",
          "tip": "Do not confuse the monkey incident with the missing backpack incident. They are two different events.",
          "steps": [
            "Find the paragraph about the monkey.",
            "Read what the monkey did exactly.",
            "Match it to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word best describes how Josh felt when the monkey took his snacks?",
        "abSentence": "Josh cried out in (A) trepidation ... watching (B) helplessly as the animal darted away with his treats.",
        "abChoices": {
          "A": "trepidation (fear)",
          "B": "helplessly (unable to do anything)"
        },
        "answer": "A",
        "solution": {
          "evidence": "Josh cried out in trepidation",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "'Helplessly' describes how he watched, not how he felt emotionally. 'Trepidation' directly describes his feeling of fear.",
          "keywords": [
            "trepidation",
            "feeling"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for the word that describes Josh's emotion, not his action.",
          "steps": [
            "Read the sentence about the monkey in paragraph 3.",
            "Identify which word describes Josh's feeling.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means 'walked with quick short steps'?",
        "answer": "pacing",
        "acceptableAnswers": [
          "pacing"
        ],
        "solution": {
          "evidence": "pacing up and down",
          "evidenceParagraph": 5,
          "trap": "raced",
          "trapExplanation": "'Raced' refers to Josh's heart beating fast, not to walking. 'Pacing' means walking back and forth quickly.",
          "keywords": [
            "pacing",
            "up and down"
          ],
          "answerFormat": "one word from paragraph 5",
          "tip": "Re-read paragraph 5 and look for a word that describes a type of movement showing worry.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Think about what word could mean walking back and forth.",
            "Check that it matches the meaning given."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "A monkey grabbed Josh's snacks.",
          "The trio found the backpack on a bench.",
          "A wild boar blocked their path."
        ],
        "answer": [
          1,
          3,
          2
        ],
        "solution": {
          "evidence": "a cheeky monkey swung down from the branches and grabbed Josh's food",
          "evidenceParagraph": 3,
          "trap": "Placing the wild boar before the monkey.",
          "trapExplanation": "The monkey incident happened in paragraph 3, and the wild boar appeared in paragraph 5, so the monkey came first.",
          "keywords": [
            "monkey",
            "boar",
            "backpack"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Use the paragraph numbers to help you figure out the correct order of events.",
          "steps": [
            "Find the paragraph where each event happens.",
            "Note the paragraph numbers.",
            "Arrange the events from earliest to latest paragraph."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Grandma and Grandpa were frightened when the monkey took Josh's snacks.",
          "Josh had left his backpack on a bench when they rested earlier."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "Grandma and Grandpa just chuckled",
          "evidenceParagraph": 4,
          "trap": "Marking the first statement as True because Josh was frightened.",
          "trapExplanation": "Josh was frightened, but Grandma and Grandpa chuckled (laughed), meaning they were not frightened.",
          "keywords": [
            "chuckled",
            "bench"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Read each statement carefully and find the matching part in the passage before deciding.",
          "steps": [
            "Find the part of the passage about Grandma and Grandpa's reaction to the monkey.",
            "Check whether they were frightened or calm.",
            "Find the part about the backpack and confirm where it was found."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Grandpa told everyone to back away slowly because the wild boar was dangerous. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Grandpa said 'It means no harm', so he did not think the wild boar was dangerous.",
          "Grandpa said the boar meant no harm, so they backed away to avoid disturbing it, not because it was dangerous."
        ],
        "solution": {
          "evidence": "It means no harm",
          "evidenceParagraph": 5,
          "trap": "True, because they backed away from the boar.",
          "trapExplanation": "Backing away was a precaution, but Grandpa specifically said the boar meant no harm, so he did not consider it dangerous.",
          "keywords": [
            "no harm",
            "slowly back away"
          ],
          "answerFormat": "write True or False and give a reason",
          "tip": "Check what Grandpa actually said about the wild boar before deciding if it was considered dangerous.",
          "steps": [
            "Find paragraph 5 about the wild boar.",
            "Read Grandpa's exact words carefully.",
            "Decide if Grandpa thought the boar was dangerous and give that as your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q4_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How did Josh feel at the end of the passage? Why did he feel that way?",
        "answer": "At the end of the passage, Josh felt relieved and grateful because he and his grandparents found the missing backpack and had worked together to solve their problems throughout the adventure.",
        "solution": {
          "evidence": "Relieved, he hugged his grandparents appreciatively",
          "evidenceParagraph": 8,
          "trap": "Josh felt happy because he enjoyed the trip.",
          "trapExplanation": "The passage specifically says Josh felt 'relieved' after finding his backpack, and hugged his grandparents 'appreciatively', showing gratitude, not just general happiness.",
          "keywords": [
            "relieved",
            "appreciatively",
            "backpack"
          ],
          "answerFormat": "write a complete sentence with feeling and reason",
          "tip": "Use the exact words from the passage to name Josh's feeling, then explain what caused that feeling.",
          "steps": [
            "Find the last paragraph and identify the word that describes Josh's feeling.",
            "Think about what happened just before that made him feel that way.",
            "Write a complete sentence that includes both his feeling and the reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "once upon a time, there lived a fierce lion. all the jungle animals were scared ": {
    "id": "chs-pp2-secI-comprehension",
    "title": "Section I - Comprehension: The Foolish Lion and the Clever Rabbit",
    "instructions": "Read the passage carefully. Write your answers in complete sentences.",
    "marks": 10,
    "questions": [
      {
        "id": "q6_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The lion was the king of the jungle and was known to be very ______.",
        "answer": "greedy and fierce",
        "acceptableAnswers": [
          "greedy",
          "fierce and greedy",
          "greedy and cruel"
        ],
        "solution": {
          "evidence": "Being greedy, he hunted and killed many animals even when he was not hungry",
          "evidenceParagraph": 1,
          "trap": "brave",
          "trapExplanation": "The passage describes the lion as greedy and fierce, not brave.",
          "keywords": [
            "greedy",
            "hunted"
          ],
          "answerFormat": "one or two adjectives",
          "tip": "Look for describing words used about the lion in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the word that describes the lion's character.",
            "Write the adjective that fits the blank."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the rabbit come up with a plan?",
        "options": [
          "She wanted to become the new queen of the jungle.",
          "She did not want to be eaten by the lion.",
          "She wanted to help the other animals find food.",
          "She wanted to wake the sleeping lion."
        ],
        "answer": 1,
        "solution": {
          "evidence": "a rabbit came up with a plan as she did not want to be eaten by the lion",
          "evidenceParagraph": 2,
          "trap": "She wanted to wake the sleeping lion.",
          "trapExplanation": "Waking the lion was part of her plan, not the reason she made the plan.",
          "keywords": [
            "plan",
            "eaten"
          ],
          "answerFormat": "choose one option",
          "tip": "Look for the word 'because' or 'as' in paragraph 2 to find the reason.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence that explains why the rabbit made a plan.",
            "Choose the option that matches the reason given."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how the rabbit behaved when the lion threatened to kill her?",
        "abSentence": "The rabbit (A) panicked and ran away ... (B) remained calm and spoke to the lion.",
        "abChoices": {
          "A": "panicked and ran away",
          "B": "remained calm and spoke to the lion"
        },
        "answer": "B",
        "solution": {
          "evidence": "The rabbit remained calm and said",
          "evidenceParagraph": 3,
          "trap": "A",
          "trapExplanation": "The rabbit did not panic or run away. She stayed calm and told the lion a story.",
          "keywords": [
            "remained calm",
            "said"
          ],
          "answerFormat": "circle A or B",
          "tip": "Find what the rabbit did when the lion threatened her in paragraph 3.",
          "steps": [
            "Read paragraph 3.",
            "Find the words that describe the rabbit's reaction.",
            "Circle the option that matches."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means 'clever and quick-witted'?",
        "answer": "witty",
        "acceptableAnswers": [
          "witty"
        ],
        "solution": {
          "evidence": "the witty little rabbit had tricked the lion",
          "evidenceParagraph": 5,
          "trap": "clever",
          "trapExplanation": "The word 'clever' does not appear in paragraph 5. The correct word used is 'witty'.",
          "keywords": [
            "witty",
            "paragraph 5"
          ],
          "answerFormat": "one word from paragraph 5",
          "tip": "Read paragraph 5 and look for an adjective that describes the rabbit's intelligence.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Look for a word that describes the rabbit as smart.",
            "Write that single word as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The lion jumped into the well and drowned.",
          "The rabbit pretended to rush into the lion's den.",
          "The rabbit told the lion about another lion who claimed to be king."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "The rabbit pretended to rush into the lion's den, waking up the sleeping lion",
          "evidenceParagraph": 2,
          "trap": "Putting the lion drowning as the first event.",
          "trapExplanation": "The lion drowning was the last event. The rabbit first woke the lion, then told her story, and only then led the lion to the well.",
          "keywords": [
            "pretended",
            "drowned",
            "claimed"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Follow the story from paragraph 2 to paragraph 4 to find the correct order.",
          "steps": [
            "Read paragraphs 2, 3, and 4.",
            "Identify which event happened first, second, and third.",
            "Write the correct number beside each event."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "The lion drowned because he jumped into a deep well after seeing his own reflection.",
          "The animals were sad when they heard that the lion had been killed."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "The lion looked into the well and roared when he saw his reflection. He jumped into the well and drowned",
          "evidenceParagraph": 4,
          "trap": "Marking the first statement as False.",
          "trapExplanation": "The passage clearly states the lion saw his reflection and jumped into the well, causing him to drown.",
          "keywords": [
            "reflection",
            "drowned",
            "happy"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check paragraph 4 for the first statement and paragraph 5 for the second statement.",
          "steps": [
            "Read paragraph 4 to check the first statement.",
            "Read paragraph 5 to check the second statement.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "The lion was easy to trick because he was too proud and believed everything the rabbit said. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The lion was furious and could not believe that another animal could be far superior to him, so he trusted the rabbit and followed her to the well.",
          "The lion immediately demanded the rabbit take him to his enemy's den, which shows he believed her story without questioning it."
        ],
        "solution": {
          "evidence": "He could not believe that another animal could be far superior to him",
          "evidenceParagraph": 4,
          "trap": "False",
          "trapExplanation": "The passage shows the lion acted on the rabbit's story immediately without doubting her, proving his pride made him easy to trick.",
          "keywords": [
            "furious",
            "superior",
            "demanded"
          ],
          "answerFormat": "write True or False and give one reason",
          "tip": "Look at paragraph 4 to see how the lion reacted to the rabbit's story and whether he questioned her.",
          "steps": [
            "Read paragraph 4.",
            "Check if the lion questioned the rabbit's story or acted immediately.",
            "Use evidence from the passage to support your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q6_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why were all the jungle animals happy at the end of the story?",
        "answer": "All the jungle animals were happy at the end of the story because the witty rabbit had tricked the lion into jumping into a well, and they were finally free from living in fear of being hunted and killed.",
        "solution": {
          "evidence": "They were glad that the lion had been killed and celebrated all day long",
          "evidenceParagraph": 5,
          "trap": "The animals were happy because the rabbit won a prize.",
          "trapExplanation": "There is no mention of a prize. The animals were happy because the lion who had terrorised them was finally gone.",
          "keywords": [
            "glad",
            "celebrated",
            "fear"
          ],
          "answerFormat": "write a complete sentence beginning with 'All the jungle animals were happy because...'",
          "tip": "Link the animals' happiness in paragraph 5 back to the fear described in paragraph 1 for a complete answer.",
          "steps": [
            "Read paragraph 1 to understand why the animals feared the lion.",
            "Read paragraph 5 to find how the animals felt after the lion died.",
            "Write a complete sentence explaining the reason for their happiness using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "in the forest, lion was the king and all the animals were afraid of him. one day": {
    "id": "mb2024-secE-comprehension",
    "title": "Section E: Comprehension Open-Ended - The King of the Forest",
    "instructions": "Read the passage carefully and annotate. Answer the following questions in complete sentences (unless otherwise stated). Your answers must be based on the passage read.",
    "marks": 10,
    "questions": [
      {
        "id": "q7_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Lion heard the cries of an animal when he was near a ______.",
        "answer": "cave in the forest",
        "acceptableAnswers": [
          "a cave",
          "cave"
        ],
        "solution": {
          "evidence": "Lion heard the cries of an animal in a cave",
          "evidenceParagraph": 1,
          "trap": "forest",
          "trapExplanation": "The cries came from a cave, not just anywhere in the forest.",
          "keywords": [
            "cries",
            "cave"
          ],
          "answerFormat": "a place (noun)",
          "tip": "Look for where Lion heard the cries, not where he was walking.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find where the cries came from.",
            "Write the location as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Fox appear nervous when Lion walked in?",
        "options": [
          "Fox was afraid of the huge net",
          "Fox was afraid of the hunters",
          "Fox was afraid of Lion",
          "Fox felt sorry for Mouse"
        ],
        "answer": 2,
        "solution": {
          "evidence": "immediately, Fox snapped its jaws shut and appeared nervous",
          "evidenceParagraph": 2,
          "trap": "Fox felt sorry for Mouse",
          "trapExplanation": "Fox showed no sign of feeling sorry; he only became nervous because Lion, the king, had arrived.",
          "keywords": [
            "nervous",
            "Lion"
          ],
          "answerFormat": "reason (because...)",
          "tip": "Think about who Lion is and why animals in the forest fear him.",
          "steps": [
            "Read the paragraph where Lion walks in.",
            "Notice what Fox does when he sees Lion.",
            "Recall that all animals were afraid of Lion."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how Lion told Fox to let the mouse go?",
        "abSentence": "Lion (A) snarled ... (B) whispered at Fox to let the mouse go.",
        "abChoices": {
          "A": "snarled",
          "B": "whispered"
        },
        "answer": "A",
        "solution": {
          "evidence": "\"Let the mouse go!\" snarled Lion",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "Lion whispered to Mouse later in the story, not to Fox. He snarled at Fox angrily.",
          "keywords": [
            "snarled",
            "Fox"
          ],
          "answerFormat": "circle A or B",
          "tip": "Find the exact word used when Lion spoke to Fox, not when he spoke to Mouse.",
          "steps": [
            "Locate the line where Lion speaks to Fox.",
            "Identify the verb that describes how Lion spoke.",
            "Choose the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 7 means 'without any fear'?",
        "answer": "fearlessly",
        "acceptableAnswers": [
          "fearlessly"
        ],
        "solution": {
          "evidence": "Mouse said fearlessly",
          "evidenceParagraph": 7,
          "trap": "quietly",
          "trapExplanation": "'Quietly' describes how Mouse ran, not how he spoke or felt about danger.",
          "keywords": [
            "fearlessly",
            "Mouse"
          ],
          "answerFormat": "single word (adverb)",
          "tip": "Look for a word that means brave or not scared when Mouse speaks.",
          "steps": [
            "Go to paragraph 7.",
            "Look for a word that describes how Mouse spoke.",
            "Choose the word that means without fear."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Mouse chewed on the net and freed Lion.",
          "Fox held a tiny mouse in his paws.",
          "The hunters set a trap and caught Lion in a huge net."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "a huge fox holding a tiny mouse in his paws",
          "evidenceParagraph": 1,
          "trap": "Placing Lion being caught before Fox holding Mouse",
          "trapExplanation": "The Fox and Mouse scene happened first, before the hunters arrived the next day.",
          "keywords": [
            "first",
            "next day"
          ],
          "answerFormat": "numbers 1, 2, 3",
          "tip": "Look for time words like 'one day', 'the next day' to order events.",
          "steps": [
            "Find time clues in the passage.",
            "Identify which event comes first, second, and third.",
            "Write the correct number beside each event."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "All the animals were brave enough to help Lion when he was caught in the net.",
          "Mouse believed he had talents that could help Lion."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "they were scared that they would be caught by the hunters, except for Mouse",
          "evidenceParagraph": 5,
          "trap": "Saying both are True",
          "trapExplanation": "The passage clearly states the animals were scared, except for Mouse, so not all were brave.",
          "keywords": [
            "scared",
            "except",
            "talents"
          ],
          "answerFormat": "True or False",
          "tip": "Read both statements carefully and check each one against the passage.",
          "steps": [
            "Find the part of the passage about the animals gathering.",
            "Check whether all animals helped Lion.",
            "Find Mouse's words about his own talents."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Lion did not think Mouse could help him. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "Lion laughed at Mouse and said that Mouse was too small to help someone like him.",
          "Lion told Mouse to go back because he was too small and cannot do much."
        ],
        "solution": {
          "evidence": "Mouse was too small to help someone like him",
          "evidenceParagraph": 4,
          "trap": "False",
          "trapExplanation": "Lion clearly laughed and said Mouse was too small to help, both when they first met and when Mouse came to save him.",
          "keywords": [
            "too small",
            "laughed"
          ],
          "answerFormat": "True or False + reason sentence",
          "tip": "Find two places in the passage where Lion doubts Mouse. Use one as your reason.",
          "steps": [
            "Read Lion's reaction after Mouse offered help the first time.",
            "Read what Lion said when Mouse came to the net.",
            "Use evidence from either moment to support 'True'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q7_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why is Mouse a good friend to Lion? Use details from the passage to support your answer.",
        "answer": "Mouse is a good friend to Lion because even though Lion had laughed at him and said he was too small to help, Mouse still ran to Lion fearlessly and chewed on the net to free him.",
        "solution": {
          "evidence": "he chewed on the net and freed Lion",
          "evidenceParagraph": 7,
          "trap": "Mouse helped Lion because he was not scared of the hunters.",
          "trapExplanation": "While Mouse was fearless, the key point is his loyalty and use of his talents despite being looked down on by Lion.",
          "keywords": [
            "fearlessly",
            "talents",
            "freed"
          ],
          "answerFormat": "complete sentence starting with 'Mouse is a good friend because...'",
          "tip": "A good answer includes what Mouse did AND shows why it makes him a good friend despite how Lion treated him.",
          "steps": [
            "Think about how Lion treated Mouse at the start.",
            "Think about what Mouse did when Lion was in danger.",
            "Write a sentence that connects both ideas to show Mouse's loyalty."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "ivan the gorilla had always been alone. he could not believe his eyes when he en": {
    "id": "mb2025-secF-comprehension",
    "title": "Section F: Comprehension Open-Ended - Ivan the Gorilla",
    "instructions": "Read the passage carefully and annotate it. Answer the following questions in complete sentences. Your answers must be based on the passage read.",
    "marks": 10,
    "questions": [
      {
        "id": "q8_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Kinyani threw a stick at Ivan to test his ______.",
        "answer": "reaction",
        "acceptableAnswers": [
          "reaction"
        ],
        "solution": {
          "evidence": "She threw a stick at him to test his reaction",
          "evidenceParagraph": 2,
          "trap": "strength",
          "trapExplanation": "Ivan gathered his strength later; Kinyani threw the stick to test his reaction, not his strength.",
          "keywords": [
            "threw",
            "test"
          ],
          "answerFormat": "one noun from the passage",
          "tip": "Look for what Kinyani wanted to find out by throwing the stick.",
          "steps": [
            "Find the sentence about Kinyani throwing a stick.",
            "Look at what the purpose of the action was.",
            "Copy the exact word that tells us what she was testing."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Ivan let out a loud grumble and beat his chest?",
        "options": [
          "He wanted to play with the young male.",
          "He was refusing to give up his food.",
          "He was trying to frighten Kinyani.",
          "He wanted to show he was in pain."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Refusing to give in, Ivan gathered his strength and let out a loud grumble",
          "evidenceParagraph": 3,
          "trap": "He was trying to frighten Kinyani.",
          "trapExplanation": "Ivan's actions were directed at the young male who was eyeing his food, not at Kinyani.",
          "keywords": [
            "refusing",
            "give in"
          ],
          "answerFormat": "choose one option",
          "tip": "Read what the young male was doing just before Ivan reacted.",
          "steps": [
            "Find the paragraph about the young male.",
            "Check what the young male was doing to Ivan.",
            "Link Ivan's loud grumble to the reason stated in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how Kinyani walked towards Ivan after watching him?",
        "abSentence": "Kinyani (A) ambled towards Ivan. She (B) strolled back and gave him a slight push.",
        "abChoices": {
          "A": "ambled",
          "B": "strolled"
        },
        "answer": "A",
        "solution": {
          "evidence": "Kinyani ambled towards Ivan",
          "evidenceParagraph": 4,
          "trap": "strolled",
          "trapExplanation": "Strolled describes Kinyani walking back after tapping Ivan, not her initial walk towards him.",
          "keywords": [
            "ambled",
            "towards"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for the word that describes Kinyani's first movement towards Ivan in paragraph 4.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the two describing words for how Kinyani moved.",
            "Choose the word that matches her first walk towards Ivan."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 1 means to shake because of fear or cold?",
        "answer": "shiver",
        "acceptableAnswers": [
          "shiver"
        ],
        "solution": {
          "evidence": "Her piercing hoots made him shiver with fear",
          "evidenceParagraph": 1,
          "trap": "terrified",
          "trapExplanation": "Terrified means to feel extreme fear, not to shake physically.",
          "keywords": [
            "shiver",
            "fear"
          ],
          "answerFormat": "one word from paragraph 1",
          "tip": "Look for the word that describes a physical response to fear.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Look for a word that describes a body movement caused by fear.",
            "Choose the word that means to tremble or shake."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "Ivan and the other gorillas rested together on the grass.",
          "Kinyani threw a stick at Ivan.",
          "The young male tried to take Ivan's food."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "She threw a stick at him to test his reaction",
          "evidenceParagraph": 2,
          "trap": "Putting the young male scene first",
          "trapExplanation": "Kinyani's stick-throwing happened in paragraph 2 before the young male scene in paragraph 3.",
          "keywords": [
            "threw",
            "young male",
            "rested"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Follow the paragraphs in order to find the sequence of events.",
          "steps": [
            "Find where each event is mentioned in the passage.",
            "Note which paragraph each event comes from.",
            "Order the events from first to last."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False.",
        "statements": [
          "Ivan was smaller in size than Kinyani.",
          "Kinyani tapped Ivan on the shoulder to invite him to play."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "he was twice her size",
          "evidenceParagraph": 1,
          "trap": "Marking the first statement as True",
          "trapExplanation": "The passage clearly states Ivan was twice Kinyani's size, meaning Ivan was bigger, not smaller.",
          "keywords": [
            "twice",
            "size",
            "tapped"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check the passage carefully for exact details about size and actions.",
          "steps": [
            "Find the sentence about Ivan and Kinyani's sizes.",
            "Check whether Ivan was bigger or smaller.",
            "Find what Kinyani did to invite Ivan to play."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Ivan understood right away that Kinyani was inviting him to play. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "He was not sure what she was doing when she first tapped him on the shoulder and ran away.",
          "Ivan only realised she was inviting him to play after she came back and gave him a slight push."
        ],
        "solution": {
          "evidence": "He was not sure what she was doing",
          "evidenceParagraph": 4,
          "trap": "True",
          "trapExplanation": "The passage states Ivan was not sure what Kinyani was doing at first; he only understood after she pushed him gently.",
          "keywords": [
            "not sure",
            "realised"
          ],
          "answerFormat": "write True or False and give a reason",
          "tip": "Look for the words that show Ivan's confusion before he understood Kinyani's invitation.",
          "steps": [
            "Find the part of paragraph 4 about Ivan's understanding.",
            "Look for words that show he was uncertain at first.",
            "Use this evidence to support the answer False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q8_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why do you think the other gorillas came to lie next to Ivan at the end of the passage?",
        "answer": "The other gorillas came to lie next to Ivan because they had accepted him as part of their group after playing together.",
        "solution": {
          "evidence": "The other gorillas came and lay next to him",
          "evidenceParagraph": 5,
          "trap": "They came because Ivan had food.",
          "trapExplanation": "There is no mention of food at the end; the gorillas lay next to Ivan after playing together, showing they accepted him.",
          "keywords": [
            "accepted",
            "playing",
            "together"
          ],
          "answerFormat": "write a complete sentence beginning with 'The other gorillas came to lie next to Ivan because...'",
          "tip": "Think about what happened just before the gorillas lay next to Ivan and what this shows about their feelings towards him.",
          "steps": [
            "Read the last two paragraphs carefully.",
            "Think about how the gorillas' attitude towards Ivan changed throughout the passage.",
            "Write a complete sentence explaining why they lay next to Ivan."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "tan tock seng was born in a humble family. he was quite poor. however, he was ve": {
    "id": "chij-secD-comprehension",
    "title": "Section D: Comprehension - Tan Tock Seng",
    "instructions": "Read the passage carefully and answer questions 19 to 27.",
    "marks": 10,
    "questions": [
      {
        "id": "q9_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Tan Tock Seng was born in ______ in 1798 before coming to Singapore to find work.",
        "answer": "Malaysia",
        "acceptableAnswers": [
          "Malaysia"
        ],
        "solution": {
          "evidence": "Born in Malaysia in 1798, he came to Singapore to find work",
          "evidenceParagraph": 1,
          "trap": "Singapore",
          "trapExplanation": "He came to Singapore to find work but was born in Malaysia, not Singapore.",
          "keywords": [
            "born",
            "Malaysia"
          ],
          "answerFormat": "One word, a country name",
          "tip": "Read carefully to distinguish where he was born from where he went to work.",
          "steps": [
            "Find the sentence about where Tan Tock Seng was born.",
            "Look for the country name mentioned before '1798'.",
            "Write the country name as the answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Tan Tock Seng cycle long distances to sell his goods instead of taking a rickshaw?",
        "options": [
          "He enjoyed cycling for exercise.",
          "He could not afford to take a rickshaw ride.",
          "The rickshaw was too slow for him.",
          "There were no rickshaws available."
        ],
        "answer": 1,
        "solution": {
          "evidence": "He could not afford to take a ride on the rickshaw",
          "evidenceParagraph": 2,
          "trap": "The rickshaw was too slow for him.",
          "trapExplanation": "The passage says walking or running would take too long, not the rickshaw. He could not afford the rickshaw.",
          "keywords": [
            "afford",
            "rickshaw"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the exact reason stated in the passage rather than guessing.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence explaining why he did not take a rickshaw.",
            "Match the reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how Tan Tock Seng saved his money and spent it carefully?",
        "abSentence": "The hardworking and (A) thrifty ... (B) generous man did well enough to buy a shophouse.",
        "abChoices": {
          "A": "thrifty",
          "B": "generous"
        },
        "answer": "A",
        "solution": {
          "evidence": "the hardworking and thrifty man did well enough to buy a shophouse",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "'Generous' means giving freely to others, but the question asks about saving and spending carefully, which means 'thrifty'.",
          "keywords": [
            "thrifty",
            "careful"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Thrifty means being careful with money and not wasting it.",
          "steps": [
            "Read the question to find out what kind of word you need.",
            "Look at both choices and think about their meanings.",
            "Choose the word that means spending money carefully."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means 'giving a lot willingly to help others'?",
        "answer": "generously",
        "acceptableAnswers": [
          "generously"
        ],
        "solution": {
          "evidence": "He gave generously to the needy and donated money to build a hospital",
          "evidenceParagraph": 4,
          "trap": "donated",
          "trapExplanation": "'Donated' means gave something, but 'generously' specifically describes giving a lot and willingly, which matches the meaning better.",
          "keywords": [
            "generously",
            "giving"
          ],
          "answerFormat": "One word from paragraph 4",
          "tip": "Look for an adverb in paragraph 4 that describes how he gave to others.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Look for a word that means giving a lot willingly.",
            "Check that the word comes from paragraph 4 only."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events below in the order they happened in Tan Tock Seng's life.",
        "sequenceItems": [
          "Tan Tock Seng bought a shophouse.",
          "Tan Tock Seng came to Singapore to find work.",
          "Tan Tock Seng donated money to build a hospital."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Born in Malaysia in 1798, he came to Singapore to find work",
          "evidenceParagraph": 1,
          "trap": "Putting buying the shophouse before coming to Singapore",
          "trapExplanation": "He first came to Singapore, then worked hard to buy a shophouse, and later donated money for a hospital.",
          "keywords": [
            "first",
            "then",
            "later"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event",
          "tip": "Follow the story from the beginning to the end to find the correct order.",
          "steps": [
            "Read the passage from paragraph 1 to paragraph 4.",
            "Identify when each event happened.",
            "Number the events 1, 2, 3 in the correct order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "Tan Tock Seng's hospital only helped rich people who could pay for treatment.",
          "Workers from China were not fairly treated by the rich people who employed them."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "The poor and needy were appreciative of his help as they did not have to worry about their hospital bills",
          "evidenceParagraph": 5,
          "trap": "Marking the first statement as True",
          "trapExplanation": "The passage clearly states the hospital provided affordable treatment for all, not just the rich.",
          "keywords": [
            "all walks of life",
            "fairly treated"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check both statements against the passage before answering.",
          "steps": [
            "Read statement 1 and find the matching information in the passage.",
            "Read statement 2 and find the matching information in the passage.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "'Tan Tock Seng Hospital today still follows the wishes of Tan Tock Seng.' Is this statement True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The passage states that the hospital remains true to the goals and aspirations of its founder, which means it still follows what Tan Tock Seng wanted.",
          "Till today, the hospital remains true to the goals and aspirations of its founder, showing it still follows his wishes."
        ],
        "solution": {
          "evidence": "the hospital remains true to the goals and aspirations of its founder",
          "evidenceParagraph": 5,
          "trap": "False",
          "trapExplanation": "The passage clearly says the hospital remains true to its founder's goals till today, so the statement is True.",
          "keywords": [
            "remains true",
            "goals",
            "founder"
          ],
          "answerFormat": "Write True or False and give a reason using evidence from the passage",
          "tip": "Find the sentence in the last paragraph that talks about the hospital today.",
          "steps": [
            "Read the last paragraph carefully.",
            "Find the sentence about the hospital and its founder's goals.",
            "State whether it is True or False and explain using that sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q9_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the poor and needy appreciate Tan Tock Seng's help?",
        "answer": "The poor and needy appreciated Tan Tock Seng's help because the hospital provided affordable and basic medical treatment for all, so they did not have to worry about their hospital bills.",
        "solution": {
          "evidence": "they did not have to worry about their hospital bills",
          "evidenceParagraph": 5,
          "trap": "Because he was rich and gave them money.",
          "trapExplanation": "The passage does not say he gave them money directly; the appreciation was specifically because the hospital gave affordable treatment so they need not worry about hospital bills.",
          "keywords": [
            "worry",
            "hospital bills",
            "affordable"
          ],
          "answerFormat": "Write a complete sentence starting with 'The poor and needy appreciated...'",
          "tip": "Use evidence from paragraph 5 to explain the reason clearly in a full sentence.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Find the reason why the poor and needy were appreciative.",
            "Write a complete sentence that includes the reason from the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "one morning, during recess, john was at the library. he looked rather worried. d": {
    "id": "acs2023-comprehension",
    "title": "Comprehension - John and David",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q10_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "John was at the library during recess because he had ______.",
        "answer": "a lot of homework to do",
        "acceptableAnswers": [
          "homework to complete",
          "his homework to do",
          "a lot of things to do"
        ],
        "solution": {
          "evidence": "he had to take care of his younger brother",
          "evidenceParagraph": 3,
          "trap": "watching television",
          "trapExplanation": "John specifically said he was NOT watching television at home.",
          "keywords": [
            "homework",
            "recess"
          ],
          "answerFormat": "short phrase 3-5 words",
          "tip": "Look for what John was doing at the library during recess.",
          "steps": [
            "Read paragraph 1 to find why John was at the library.",
            "Look for clues about John's unsubmitted homework.",
            "Write a short phrase describing what he needed to do."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did David approach John during recess?",
        "options": [
          "He wanted to borrow a book from John.",
          "He was concerned that John had not submitted his homework.",
          "He wanted to invite John to play video games.",
          "He needed help with his Mathematics homework."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Out of concern, David approached John",
          "evidenceParagraph": 1,
          "trap": "He needed help with his Mathematics homework.",
          "trapExplanation": "It was David who was good at Mathematics and helped John, not the other way around.",
          "keywords": [
            "concern",
            "approached"
          ],
          "answerFormat": "Choose the best option (A-D).",
          "tip": "Find the sentence that explains why David walked up to John.",
          "steps": [
            "Re-read paragraph 1 carefully.",
            "Identify the word that describes David's feeling before he approached John.",
            "Match that feeling to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how John felt about David's help?",
        "abSentence": "John was (A) grateful ... (B) sorry that David had helped him.",
        "abChoices": {
          "A": "grateful",
          "B": "sorry"
        },
        "answer": "A",
        "solution": {
          "evidence": "John was grateful that David had helped him",
          "evidenceParagraph": 4,
          "trap": "sorry",
          "trapExplanation": "It was David who felt sorry for John, not John feeling sorry about the help.",
          "keywords": [
            "grateful",
            "helped"
          ],
          "answerFormat": "Circle A or B.",
          "tip": "Look at paragraph 4 for the word describing John's feelings towards David.",
          "steps": [
            "Read paragraph 4 to find how John felt.",
            "Check which word - grateful or sorry - describes John's reaction.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means 'on time'?",
        "answer": "punctually",
        "acceptableAnswers": [
          "punctually"
        ],
        "solution": {
          "evidence": "able to submit his homework punctually",
          "evidenceParagraph": 4,
          "trap": "grateful",
          "trapExplanation": "Grateful means thankful, not on time.",
          "keywords": [
            "punctually",
            "submit"
          ],
          "answerFormat": "One word only.",
          "tip": "Look for a word in paragraph 4 that describes submitting homework on time.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the word that relates to doing something at the correct time.",
            "Write that single word as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened.",
        "sequenceItems": [
          "David helped John with his Mathematics homework.",
          "David saw John looking worried at the library.",
          "John and David became good friends."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "David, who happened to be nearby, saw John",
          "evidenceParagraph": 1,
          "trap": "Putting 'became good friends' before 'helped with homework'.",
          "trapExplanation": "They became good friends only after David helped John, as stated in paragraph 4.",
          "keywords": [
            "saw",
            "helped",
            "friends"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event.",
          "tip": "Follow the story from beginning to end to place events in the correct order.",
          "steps": [
            "Read the passage from paragraph 1 onwards.",
            "Identify when each event first appears in the story.",
            "Number the events 1, 2, 3 according to that order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "John's parents came home late because they had to work.",
          "David visited John's house every day after school."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "his parents had to work till late at night",
          "evidenceParagraph": 3,
          "trap": "Saying the second statement is True.",
          "trapExplanation": "David only went to John's house on Tuesdays and Thursdays, not every day.",
          "keywords": [
            "work",
            "late",
            "Tuesdays",
            "Thursdays"
          ],
          "answerFormat": "Write True or False for each statement.",
          "tip": "Check the exact days David visited and why John's parents came home late.",
          "steps": [
            "Find the sentence about John's parents in paragraph 3.",
            "Find the sentence about when David visited John's house.",
            "Compare each statement with the passage carefully."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "John spent every recess alone in the library because he enjoyed being by himself. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "John spent recess doing his homework because he had many responsibilities at home such as caring for his brother and doing household chores, leaving him no time to complete it at home.",
          "John did not choose to be alone - he had too many chores and had to look after his brother, so he used recess to finish his homework."
        ],
        "solution": {
          "evidence": "He knew John often spent recess all by himself doing his homework",
          "evidenceParagraph": 1,
          "trap": "True, because he was always alone at the library.",
          "trapExplanation": "Being alone at the library was the result of his heavy responsibilities at home, not because he enjoyed being alone.",
          "keywords": [
            "recess",
            "homework",
            "responsibilities"
          ],
          "answerFormat": "Write True or False, then give a reason using information from the passage.",
          "tip": "Distinguish between what a character does and why they do it - look for the real reason in the passage.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find evidence in the passage for the real reason John was at the library.",
            "Write a complete reason using details from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q10_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How did David show that he was a good friend to John?",
        "answer": "David showed that he was a good friend by helping John with his Mathematics homework and looking after Samuel so that John could complete his work and submit it on time.",
        "solution": {
          "evidence": "David went to John's house after school on Tuesdays and Thursdays",
          "evidenceParagraph": 3,
          "trap": "David became John's friend.",
          "trapExplanation": "Becoming friends is the result, not the action that shows David was a good friend - focus on what David actually did to help.",
          "keywords": [
            "helped",
            "looked after",
            "homework"
          ],
          "answerFormat": "Write a complete sentence starting with 'David showed...' or 'David was a good friend because...'",
          "tip": "Identify the specific actions David took to support John, not just the outcome of their friendship.",
          "steps": [
            "Find the paragraph that describes what David did to help John.",
            "List the specific actions David took.",
            "Write a complete sentence using those actions as evidence."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "it was a cool breezy day. the family was at the nature park. as soon as they ent": {
    "id": "hp2024-secC-comprehension",
    "title": "Section C: Comprehension - The Nature Park",
    "instructions": "Read the passage below and answer questions 11 to 19.",
    "marks": 10,
    "questions": [
      {
        "id": "q11_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "When the family entered the park, they could hear birds chirping and ______.",
        "answer": "leaves rustling",
        "acceptableAnswers": [
          "leaves rustling"
        ],
        "solution": {
          "evidence": "birds chirping and leaves rustling",
          "evidenceParagraph": 1,
          "trap": "birds singing",
          "trapExplanation": "The passage says 'birds chirping', not singing, and the second sound is leaves rustling, not birds.",
          "keywords": [
            "chirping",
            "rustling"
          ],
          "answerFormat": "two words describing a sound",
          "tip": "Read the sentence carefully for both sounds mentioned together.",
          "steps": [
            "Find where the family enters the park.",
            "Look for the two sounds described.",
            "Copy the second sound exactly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Ben cover his ears and frown at Amelia?",
        "options": [
          "He was angry that she wanted to see a crocodile.",
          "She was screaming and making too much noise.",
          "He wanted to listen to the birds more carefully.",
          "He was frightened by the monitor lizard."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Don't scream, Amelia",
          "evidenceParagraph": 2,
          "trap": "He was angry that she wanted to see a crocodile.",
          "trapExplanation": "Ben was not angry about the crocodile; he covered his ears because Amelia squealed loudly.",
          "keywords": [
            "scream",
            "covered"
          ],
          "answerFormat": "one correct reason",
          "tip": "Look at what Ben said right after covering his ears to find the real reason.",
          "steps": [
            "Find the paragraph where Ben covers his ears.",
            "Read what Ben says to Amelia.",
            "Match the action to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that Amelia held Ben's arm tightly because she was eager to see the kingfisher?",
        "abSentence": "Amelia (A) gripped his arm and (B) squinted.",
        "abChoices": {
          "A": "gripped",
          "B": "squinted"
        },
        "answer": "A",
        "solution": {
          "evidence": "Amelia gripped his arm",
          "evidenceParagraph": 4,
          "trap": "B",
          "trapExplanation": "'Squinted' means to look with eyes half closed, not holding tightly. 'Gripped' shows she held on firmly.",
          "keywords": [
            "gripped",
            "tightly"
          ],
          "answerFormat": "circle A or B",
          "tip": "Think about which word describes how she held his arm, not how she looked.",
          "steps": [
            "Read the sentence carefully.",
            "Decide which action means holding tightly.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 6 means very pleased or excited about something good?",
        "answer": "thrilled",
        "acceptableAnswers": [
          "thrilled"
        ],
        "solution": {
          "evidence": "Ben was thrilled",
          "evidenceParagraph": 6,
          "trap": "proudly",
          "trapExplanation": "'Proudly' describes Amelia's feeling, not Ben's. 'Thrilled' is the word that means very excited and pleased.",
          "keywords": [
            "thrilled",
            "excited"
          ],
          "answerFormat": "one word from paragraph 6",
          "tip": "Look for the word that describes Ben's feeling after watching the kingfisher catch a fish.",
          "steps": [
            "Read paragraph 6 carefully.",
            "Look for a word describing a strong happy feeling.",
            "Check that it fits the meaning of very excited."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "A kingfisher dived into the water and caught a fish.",
          "Ben spotted a kingfisher on a branch of a tree.",
          "Amelia said sorry to Ben for frightening the bird away."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "He had spotted a bird on the branch of a tree",
          "evidenceParagraph": 3,
          "trap": "Placing the kingfisher catching a fish before Ben spots it on the branch.",
          "trapExplanation": "Ben first spots the kingfisher on a branch, then Amelia scares it off and apologises, and finally the kingfisher is seen catching a fish.",
          "keywords": [
            "spotted",
            "sorry",
            "dived"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Follow the story from the beginning to the end to find the correct order.",
          "steps": [
            "Find where Ben first sees the kingfisher.",
            "Find where Amelia apologises.",
            "Find where the kingfisher catches a fish."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Ben wanted to see a kingfisher at the nature park.",
          "Amelia remembered her father's reminder and kept quiet when she saw the kingfisher on the branch."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "He hoped to see a kingfisher",
          "evidenceParagraph": 2,
          "trap": "Marking the second statement as True.",
          "trapExplanation": "The passage says Amelia yelled 'Where?' and had forgotten what their father had told them, so she did NOT keep quiet.",
          "keywords": [
            "hoped",
            "forgotten"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check the passage for what Amelia actually did when she saw the kingfisher on the branch.",
          "steps": [
            "Find evidence that Ben wanted to see a kingfisher.",
            "Find what Amelia did when Ben whispered about the kingfisher.",
            "Decide if each statement matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Ben was unkind to Amelia after she frightened the kingfisher away. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Ben gave his sister a hug to comfort her and said 'It's all right, Amelia', which shows he was kind and understanding.",
          "Ben hugged Amelia and told her it was all right, so he was kind, not unkind."
        ],
        "solution": {
          "evidence": "he gave his sister a hug to comfort her",
          "evidenceParagraph": 5,
          "trap": "True, because Ben felt disappointed.",
          "trapExplanation": "Although Ben was disappointed, he still hugged Amelia and comforted her, which shows kindness, not unkindness.",
          "keywords": [
            "hug",
            "comfort"
          ],
          "answerFormat": "write True or False and give a reason using evidence from the passage",
          "tip": "Do not confuse Ben's feeling of disappointment with how he treated his sister.",
          "steps": [
            "Find how Ben reacted after the bird flew away.",
            "Look for actions or words that show kindness.",
            "Use this evidence to explain your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q11_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Amelia tap her brother on the shoulder quietly the second time she spotted the kingfisher?",
        "answer": "Amelia tapped her brother on the shoulder quietly because she did not want to frighten the kingfisher away again, having learnt from her earlier mistake of yelling and scaring the bird off.",
        "solution": {
          "evidence": "She kept very quiet and did not make a sound",
          "evidenceParagraph": 6,
          "trap": "She was shy and did not want to speak.",
          "trapExplanation": "Amelia kept quiet on purpose because she had learnt from her mistake of scaring the kingfisher earlier, not because she was shy.",
          "keywords": [
            "quiet",
            "frighten"
          ],
          "answerFormat": "write a complete sentence explaining the reason",
          "tip": "Think about what happened earlier in the story and how Amelia changed her behaviour.",
          "steps": [
            "Recall what happened when Amelia yelled the first time.",
            "Find how Amelia behaved differently the second time.",
            "Write a sentence linking her past mistake to her careful behaviour."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "on a hot summer day, a thirsty crow flew over a garden. the crow had been search": {
    "id": "hp2025-secC-comprehension",
    "title": "Section C: Comprehension - The Thirsty Crow",
    "instructions": "Read the passage below and answer questions 11 to 18.",
    "marks": 10,
    "questions": [
      {
        "id": "q12_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The crow had been searching for water for hours and was getting tired and ______.",
        "answer": "impatient",
        "acceptableAnswers": [
          "impatient"
        ],
        "solution": {
          "evidence": "was getting tired and impatient",
          "evidenceParagraph": 1,
          "trap": "exhausted",
          "trapExplanation": "The passage uses the word 'impatient', not 'exhausted'.",
          "keywords": [
            "tired",
            "impatient"
          ],
          "answerFormat": "one word describing how the crow felt",
          "tip": "Look for the exact words used in the passage to describe the crow's feelings.",
          "steps": [
            "Read the sentence in paragraph 1 carefully.",
            "Find the two feelings mentioned after 'getting'.",
            "Copy the second feeling word as the answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why could the crow not drink the water when it first found the jug?",
        "options": [
          "The jug was empty.",
          "The water level was too low and the jug was too deep.",
          "The crow's beak was too short.",
          "Another bird was drinking from the jug."
        ],
        "answer": 1,
        "solution": {
          "evidence": "the water level was very low. The crow tried to reach the water with its beak, but it could not. The jug was too deep",
          "evidenceParagraph": 2,
          "trap": "The crow's beak was too short.",
          "trapExplanation": "The passage does not say the beak was too short; it says the jug was too deep and the water level was too low.",
          "keywords": [
            "water level",
            "deep"
          ],
          "answerFormat": "choose the option that matches both reasons given in the passage",
          "tip": "Look for two reasons in paragraph 2 that explain why the crow could not drink.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Identify why the crow failed to drink the water.",
            "Match both reasons to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how the crow worked to fill the jug with pebbles?",
        "abSentence": "The crow worked (A) tirelessly, flying back and forth between the ground and the jug, until the water (B) rose high enough for it to drink.",
        "abChoices": {
          "A": "tirelessly",
          "B": "rose"
        },
        "answer": "A",
        "solution": {
          "evidence": "The crow worked tirelessly, flying back and forth between the ground and the jug",
          "evidenceParagraph": 5,
          "trap": "B",
          "trapExplanation": "'Rose' describes what the water did, not how the crow worked.",
          "keywords": [
            "worked",
            "tirelessly"
          ],
          "answerFormat": "circle A or B",
          "tip": "The question asks how the crow worked, so look for a word that describes the crow's action.",
          "steps": [
            "Read the sentence carefully.",
            "Decide which word describes the crow's way of working.",
            "Circle A for 'tirelessly' as it describes the crow's effort."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 6 means feeling very pleased and satisfied with oneself?",
        "answer": "pride",
        "acceptableAnswers": [
          "pride",
          "satisfaction"
        ],
        "solution": {
          "evidence": "swelled with pride and satisfaction",
          "evidenceParagraph": 7,
          "trap": "happy",
          "trapExplanation": "'Happy' is used in paragraph 6, not paragraph 7. 'Pride' specifically means being pleased with oneself.",
          "keywords": [
            "pride",
            "satisfaction"
          ],
          "answerFormat": "one word from the paragraph",
          "tip": "Look for a word that means more than just happiness - it means being proud of what you achieved.",
          "steps": [
            "Read paragraph 7 carefully.",
            "Find the phrase that describes how the crow felt about itself.",
            "Choose the word that best means 'pleased with oneself'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events below in the order they happened in the story.",
        "sequenceItems": [
          "The crow dropped pebbles one by one into the jug.",
          "The crow spotted a jug on a table in the garden.",
          "The water rose high enough for the crow to drink."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Suddenly, it spotted a jug on a table in the garden",
          "evidenceParagraph": 1,
          "trap": "Putting the crow drinking first",
          "trapExplanation": "The crow only drank after the water rose, which happened after the pebbles were dropped in.",
          "keywords": [
            "spotted",
            "pebbles",
            "rose"
          ],
          "answerFormat": "write 1, 2 or 3 next to each event",
          "tip": "Follow the story from beginning to end to find the correct order of events.",
          "steps": [
            "Find when the crow spotted the jug - this is the first event.",
            "Find when the crow dropped pebbles - this happens next.",
            "Find when the water rose high enough - this is the last event."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False for each.",
        "statements": [
          "The crow found pebbles inside the jug to drop into the water.",
          "The crow solved the problem on its own without any help."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "It looked around the garden and saw some small pebbles on the ground",
          "evidenceParagraph": 3,
          "trap": "Saying the first statement is True",
          "trapExplanation": "The pebbles were found on the ground in the garden, not inside the jug.",
          "keywords": [
            "ground",
            "pebbles",
            "by itself"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check the exact location of the pebbles in the passage before answering.",
          "steps": [
            "Read statement 1 and find where the pebbles were in the passage.",
            "Read statement 2 and find the sentence that says the crow solved the problem alone.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The crow gave up when it could not reach the water in the jug. Is this True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The crow thought hard and used pebbles to raise the water level instead of giving up.",
          "The crow looked around the garden, found pebbles, and dropped them into the jug to solve the problem."
        ],
        "solution": {
          "evidence": "The crow thought hard about what to do",
          "evidenceParagraph": 3,
          "trap": "True",
          "trapExplanation": "The crow did not give up; it thought of a clever solution using pebbles.",
          "keywords": [
            "thought hard",
            "pebbles",
            "solved"
          ],
          "answerFormat": "write False and give a reason using evidence from the passage",
          "tip": "When giving a reason, use details from the passage to support your answer.",
          "steps": [
            "Decide if the statement is true or false based on the passage.",
            "Find evidence showing the crow did not give up.",
            "Write a complete reason using that evidence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q12_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why was the crow feeling proud and satisfied as it flew away at the end of the story?",
        "answer": "The crow was feeling proud and satisfied because it had solved a difficult problem all by itself using patience and smart thinking.",
        "solution": {
          "evidence": "It had learned that with patience and smart thinking, even difficult problems could be solved",
          "evidenceParagraph": 7,
          "trap": "Because it drank the water.",
          "trapExplanation": "Drinking the water is only part of the reason; the deeper reason is that the crow solved the problem on its own using clever thinking.",
          "keywords": [
            "patience",
            "smart thinking",
            "solved"
          ],
          "answerFormat": "write a complete sentence starting with 'The crow was feeling proud and satisfied because...'",
          "tip": "Look at the last paragraph for the lesson the crow learned - this explains why it felt proud.",
          "steps": [
            "Read the last two paragraphs carefully.",
            "Find the reason the crow felt proud beyond just drinking the water.",
            "Write a complete sentence using that reason as your answer."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "percy penguin was not scared of anything. percy loved jumping into the water. ho": {
    "id": "mb2023-comprehension",
    "title": "Comprehension (Open-Ended) - The Not-So-Brave Penguin",
    "instructions": "Read the passage carefully and annotate. Answer the following questions in complete sentences. Your answers must be based on the passage read. (10 marks)",
    "marks": 10,
    "questions": [
      {
        "id": "q13_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Rosy Penguin preferred staying on ______ instead of jumping into the water.",
        "answer": "land",
        "acceptableAnswers": [
          "land"
        ],
        "solution": {
          "evidence": "Rosy preferred staying on land",
          "evidenceParagraph": 1,
          "trap": "ice",
          "trapExplanation": "The passage says Rosy preferred staying on land, not ice.",
          "keywords": [
            "preferred",
            "land"
          ],
          "answerFormat": "one word",
          "tip": "Look for what Rosy liked to do instead of jumping into the water.",
          "steps": [
            "Find the sentence about what Rosy preferred.",
            "Identify the place she liked to stay.",
            "Write the word that fills the blank."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Percy stop having a fantastic time on the iceberg?",
        "options": [
          "He was afraid of the dark cave.",
          "He slid down an ice slide too fast and crashed into a dark cave.",
          "He could not find his way back to the other penguins.",
          "He bumped into Rosy at the bottom of the slide."
        ],
        "answer": 1,
        "solution": {
          "evidence": "he slid down an ice slide too fast. He crashed into a dark cave and bumped his head",
          "evidenceParagraph": 4,
          "trap": "He was afraid of the dark cave.",
          "trapExplanation": "It was Percy who was not scared of anything; it was Rosy who was scared of the dark.",
          "keywords": [
            "slid",
            "crashed",
            "cave"
          ],
          "answerFormat": "choose one option",
          "tip": "Look for what happened to Percy on the ice slide.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the event that ended Percy's fun.",
            "Choose the option that matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how Rosy felt every night when she imagined scary things?",
        "abSentence": "Every night, she would imagine all the (A) fantastic ... (B) scary things that might be out there.",
        "abChoices": {
          "A": "fantastic",
          "B": "scary"
        },
        "answer": "B",
        "solution": {
          "evidence": "she would imagine all the scary things that might be out there",
          "evidenceParagraph": 2,
          "trap": "A",
          "trapExplanation": "'Fantastic' describes Percy's time on the iceberg, not Rosy's nightly fears.",
          "keywords": [
            "imagine",
            "scary"
          ],
          "answerFormat": "circle A or B",
          "tip": "Reread paragraph 2 to find the word that describes what Rosy imagined at night.",
          "steps": [
            "Read the question carefully.",
            "Find the sentence in paragraph 2 about Rosy's nights.",
            "Circle the word that fits the context."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 6 means 'well-known or easily recognised'?",
        "answer": "familiar",
        "acceptableAnswers": [
          "familiar"
        ],
        "solution": {
          "evidence": "Rosy saw familiar footprints at the top of a big slippery slide",
          "evidenceParagraph": 6,
          "trap": "immediately",
          "trapExplanation": "'Immediately' means at once, not easily recognised.",
          "keywords": [
            "familiar",
            "footprints"
          ],
          "answerFormat": "single word from paragraph 6",
          "tip": "Think about what it means to recognise something you have seen before.",
          "steps": [
            "Read paragraph 6 carefully.",
            "Look for a word meaning 'recognised or well-known'.",
            "Check that the word fits the definition given."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Arrange the events in the order they happened in the passage.",
        "sequenceItems": [
          "Rosy slid down and found Percy in the dark cave.",
          "Percy crashed into a dark cave and bumped his head.",
          "The penguins discovered an iceberg floating in the sea."
        ],
        "answer": [
          3,
          2,
          1
        ],
        "solution": {
          "evidence": "the penguins found an iceberg floating in the sea nearby",
          "evidenceParagraph": 3,
          "trap": "Putting Rosy finding Percy before Percy's accident.",
          "trapExplanation": "Percy's accident happened before Rosy went to rescue him.",
          "keywords": [
            "iceberg",
            "crashed",
            "found"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Follow the story in order: discovery of iceberg, Percy's accident, then Rosy's rescue.",
          "steps": [
            "Read all three events.",
            "Find each event in the passage.",
            "Number them in the order they occurred."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Rosy was scared of the dark and also hated to be alone.",
          "Percy was the bravest penguin of all according to Percy himself."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "Rosy was very scared of the dark. Every night, she would imagine all the scary things",
          "evidenceParagraph": 2,
          "trap": "Marking the second statement as True because Percy is usually brave.",
          "trapExplanation": "It was Percy who called Rosy the bravest penguin of all, not himself.",
          "keywords": [
            "scared",
            "bravest"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check each statement against the passage carefully, especially who said what.",
          "steps": [
            "Find evidence for the first statement in paragraph 2.",
            "Find who called whom the bravest in the last paragraph.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Rosy was sure something was wrong when Percy did not return, even though the other penguins told her not to worry.",
        "answer": "True",
        "acceptableAnswers": [
          "Rosy was sure that something was wrong even when the other penguins said she worried too much, so she swam over to the iceberg to rescue Percy.",
          "The passage says Rosy was sure that something was wrong and she did a very brave thing by swimming to the iceberg."
        ],
        "solution": {
          "evidence": "Rosy was sure that something was wrong. Then, she did a very brave thing. She swam over to the iceberg",
          "evidenceParagraph": 5,
          "trap": "False, because the other penguins said she worried too much.",
          "trapExplanation": "What the other penguins said does not change the fact that Rosy herself was sure something was wrong.",
          "keywords": [
            "sure",
            "wrong",
            "brave"
          ],
          "answerFormat": "write True or False and give a reason",
          "tip": "Focus on what Rosy believed and did, not what the other penguins said.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Check whether Rosy believed something was wrong.",
            "State your answer and support it with evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q13_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Percy say that Rosy was the bravest penguin of all?",
        "answer": "Percy said that Rosy was the bravest penguin of all because she helped him even though she was scared of the dark, showing great courage to save him.",
        "solution": {
          "evidence": "You helped me even though you were scared, which makes you the bravest penguin of all",
          "evidenceParagraph": 9,
          "trap": "Because Rosy was not scared of the dark.",
          "trapExplanation": "Rosy was actually scared of the dark, but she overcame her fear to save Percy, which is why Percy called her the bravest.",
          "keywords": [
            "bravest",
            "scared",
            "helped"
          ],
          "answerFormat": "complete sentence starting with 'Percy said that Rosy...'",
          "tip": "The key idea is that true bravery means acting despite being scared.",
          "steps": [
            "Find Percy's exact words at the end of the passage.",
            "Identify why he called Rosy the bravest.",
            "Write a complete sentence explaining the reason in your own words."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "\"mother,\" said a little mouse, \"the people in our house are so kind! they leave ": {
    "id": "ny2023-secE-comprehension",
    "title": "(E) Comprehension - The Little Thief in the Pantry",
    "instructions": "Read this passage and answer questions 13 to 19.",
    "marks": 10,
    "questions": [
      {
        "id": "q14_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Greywhiskers snuck out of the mouse-hole as soon as his mother had ______.",
        "answer": "curled up for her daily nap",
        "acceptableAnswers": [
          "fallen asleep for her nap",
          "gone for her nap",
          "curled up for her nap"
        ],
        "solution": {
          "evidence": "curled up for her daily nap",
          "evidenceParagraph": 3,
          "trap": "gone to sleep",
          "trapExplanation": "The passage specifically says she curled up for her daily nap, not just gone to sleep.",
          "keywords": [
            "curled up",
            "nap"
          ],
          "answerFormat": "short phrase describing what Mother Mouse did",
          "tip": "Look for what Mother Mouse was doing when Greywhiskers sneaked out.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find what Mother Mouse did before Greywhiskers left.",
            "Copy the exact phrase describing her action."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Greywhiskers get trapped in the mouse trap?",
        "options": [
          "He was trying to eat the cake on the table.",
          "He ran forward to get his favourite cheese.",
          "He was looking for his mother in the kitchen.",
          "He wanted to explore the kitchen by himself."
        ],
        "answer": 1,
        "solution": {
          "evidence": "He saw his favourite cheese and ran forward to get it, but something snapped shut",
          "evidenceParagraph": 5,
          "trap": "He was trying to eat the cake on the table.",
          "trapExplanation": "The cake was eaten on the first trip. On the second trip, Greywhiskers was after the cheese when he was trapped.",
          "keywords": [
            "favourite cheese",
            "ran forward"
          ],
          "answerFormat": "one correct reason",
          "tip": "Check which visit to the kitchen led to the mouse trap, and what Greywhiskers was after at that time.",
          "steps": [
            "Find the paragraph about the mouse trap.",
            "Identify what Greywhiskers was trying to get.",
            "Choose the option that matches."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how Greywhiskers ate the cake?",
        "abSentence": "Greywhiskers sniffed the cake, then nibbled on it (A) greedily ... and the cake was (B) scrumptious!",
        "abChoices": {
          "A": "greedily",
          "B": "scrumptious"
        },
        "answer": "A",
        "solution": {
          "evidence": "nibbled on it greedily",
          "evidenceParagraph": 4,
          "trap": "scrumptious",
          "trapExplanation": "Scrumptious describes how the cake tasted, not how Greywhiskers ate it.",
          "keywords": [
            "nibbled",
            "greedily"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for a word that describes the way Greywhiskers was eating, not what the cake tasted like.",
          "steps": [
            "Read the sentence about Greywhiskers eating the cake.",
            "Decide which word describes his manner of eating.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means having a pleasant and sweet smell?",
        "answer": "fragrant",
        "acceptableAnswers": [
          "fragrant"
        ],
        "solution": {
          "evidence": "The cake was not only fragrant, but also scrumptious",
          "evidenceParagraph": 4,
          "trap": "scrumptious",
          "trapExplanation": "Scrumptious means delicious, not having a pleasant smell.",
          "keywords": [
            "fragrant",
            "smell"
          ],
          "answerFormat": "single word from paragraph 4",
          "tip": "Think of a word related to smell, not taste.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Look for a word connected to a pleasant smell.",
            "Write that single word as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Ethel lifted the lid of the trap and freed Greywhiskers.",
          "Greywhiskers nibbled on the cake greedily.",
          "Greywhiskers was caught in a mouse trap."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "nibbled on it greedily",
          "evidenceParagraph": 4,
          "trap": "Greywhiskers was caught before he ate the cake.",
          "trapExplanation": "Greywhiskers ate the cake on his first visit and was only caught on his second visit to the kitchen.",
          "keywords": [
            "nibbled",
            "trapped",
            "lifted the lid"
          ],
          "answerFormat": "numbers 1, 2, 3 showing the correct order",
          "tip": "Follow the story in order: first visit to kitchen, second visit, then the rescue.",
          "steps": [
            "Identify when each event happened in the story.",
            "Match each event to its paragraph.",
            "Number them 1, 2, 3 from earliest to latest."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements and write True or False.",
        "statements": [
          "Greywhiskers was allowed to leave the mouse-hole alone.",
          "Greywhiskers felt sorry for not listening to his mother after he was trapped."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "you are not allowed to leave our mouse-hole by yourself as it is dangerous",
          "evidenceParagraph": 2,
          "trap": "True for the first statement because Greywhiskers did leave alone.",
          "trapExplanation": "Just because Greywhiskers left alone does not mean he was allowed to. His mother had warned him not to.",
          "keywords": [
            "not allowed",
            "wishing he had listened"
          ],
          "answerFormat": "True or False for each statement",
          "tip": "Check what Mother Mouse said about leaving the mouse-hole, and how Greywhiskers felt in the trap.",
          "steps": [
            "Read statement 1 and find what Mother Mouse said in paragraph 2.",
            "Read statement 2 and find how Greywhiskers felt in paragraph 5.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The man wanted to keep the little mouse as a pet. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The man said he was going to get rid of the mouse, so he did not want to keep it as a pet.",
          "The passage says the man wanted to get rid of the mouse, not keep it."
        ],
        "solution": {
          "evidence": "I'm going to get rid of it",
          "evidenceParagraph": 6,
          "trap": "True, because the man picked up the trap and looked at the mouse.",
          "trapExplanation": "Looking at the mouse does not mean he wanted it as a pet. He clearly said he would get rid of it.",
          "keywords": [
            "get rid of",
            "pet"
          ],
          "answerFormat": "True or False plus one sentence reason",
          "tip": "Find the exact words the man said to know his intention.",
          "steps": [
            "Read what the man said in paragraph 6.",
            "Decide if his words show he wanted a pet.",
            "Write False and explain using his words."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q14_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Ethel let the little mouse go free?",
        "answer": "Ethel let the little mouse go free because she felt sorry for it.",
        "solution": {
          "evidence": "Ethel felt sorry for the mouse",
          "evidenceParagraph": 7,
          "trap": "Ethel let the mouse go because she liked mice.",
          "trapExplanation": "The passage says she felt sorry for the mouse, not that she liked mice.",
          "keywords": [
            "felt sorry",
            "lifted the lid"
          ],
          "answerFormat": "complete sentence starting with Ethel",
          "tip": "Use the word because in your answer and support it with what the passage says about Ethel's feelings.",
          "steps": [
            "Find the sentence in paragraph 7 that tells us how Ethel felt.",
            "Use that feeling as your reason.",
            "Write a complete sentence with because."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "tim pushed back his sailor's cap and gazed at the sea. the mermaid was rocking g": {
    "id": "pc2023-comprehension",
    "title": "Comprehension - Fishing on the Mermaid",
    "instructions": "Read the passage carefully and answer the questions that follow. (10 marks)",
    "marks": 10,
    "questions": [
      {
        "id": "q15_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Tim and his father went out to sea on a boat called ______.",
        "answer": "the Mermaid",
        "acceptableAnswers": [
          "The Mermaid",
          "Mermaid"
        ],
        "solution": {
          "evidence": "The Mermaid was rocking gently on the water",
          "evidenceParagraph": 1,
          "trap": "a fishing boat",
          "trapExplanation": "The passage gives the specific name of the boat as 'The Mermaid', not just 'a fishing boat'.",
          "keywords": [
            "Mermaid",
            "boat"
          ],
          "answerFormat": "proper noun, name of the boat",
          "tip": "Look for the name of the boat mentioned in the first paragraph.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the name of the boat.",
            "Write the name exactly as it appears in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Tim swallow his saliva when he thought about last week's meal?",
        "options": [
          "He was very thirsty from fishing all day.",
          "He was thinking about the delicious grilled mackerel he had eaten.",
          "He was nervous about catching fish that day.",
          "He was hungry because he had skipped breakfast."
        ],
        "answer": 1,
        "solution": {
          "evidence": "He swallowed his saliva as he recalled the scrumptious meal he had last week",
          "evidenceParagraph": 3,
          "trap": "He was very thirsty from fishing all day.",
          "trapExplanation": "The passage states he swallowed his saliva because he was recalling the scrumptious meal, not because he was thirsty.",
          "keywords": [
            "swallowed",
            "scrumptious",
            "recalled"
          ],
          "answerFormat": "one option chosen from four",
          "tip": "Find the sentence where Tim swallows his saliva and look for the reason given right after.",
          "steps": [
            "Read paragraph 3.",
            "Find the sentence about Tim swallowing his saliva.",
            "Identify the reason given in the same sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how Tim spoke when he said it was getting late?",
        "abSentence": "Tim (A) mumbled ... (B) shouted to himself as he let out a long sigh.",
        "abChoices": {
          "A": "mumbled",
          "B": "shouted"
        },
        "answer": "A",
        "solution": {
          "evidence": "Tim mumbled to himself as he let out a long sigh",
          "evidenceParagraph": 5,
          "trap": "B",
          "trapExplanation": "Tim did not shout; he mumbled quietly to himself because he was tired, as shown by the long sigh.",
          "keywords": [
            "mumbled",
            "sigh"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for the exact word the passage uses to describe how Tim spoke to himself.",
          "steps": [
            "Read paragraph 5.",
            "Find the sentence about Tim speaking to himself.",
            "Identify the word that describes how he spoke."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means a colour that is a deep reddish shade seen in the sky?",
        "answer": "crimson",
        "acceptableAnswers": [
          "crimson"
        ],
        "solution": {
          "evidence": "the sky had faded into a shade of crimson red",
          "evidenceParagraph": 4,
          "trap": "red",
          "trapExplanation": "'Red' alone is too general. The passage uses 'crimson' to describe the specific deep reddish shade, which is the word being tested.",
          "keywords": [
            "crimson",
            "shade"
          ],
          "answerFormat": "single word from paragraph 4",
          "tip": "Look for a describing word in paragraph 4 that tells us about the colour of the sky at dusk.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Look for a word that describes the colour of the sky.",
            "Choose the more specific colour word, not the common one."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events below in the order they happened in the passage.",
        "sequenceItems": [
          "Tim felt a hard tug on his fishing line.",
          "Tim let the fishing line out until the hook touched the bottom.",
          "Tim's father helped him get the fish off the hook."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Tim let the line out carefully until he felt the hook touch the bottom",
          "evidenceParagraph": 4,
          "trap": "Putting 'Tim felt a tug' as the first event",
          "trapExplanation": "Tim first let the line out to the bottom, then felt a tug later, and finally his father helped with the fish.",
          "keywords": [
            "let the line out",
            "tug",
            "hook"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Reread the passage in order and match each event to when it happened in the story.",
          "steps": [
            "Read the passage from paragraph 4 onwards.",
            "Find when each event is mentioned.",
            "Number them 1, 2, 3 in the order they appear."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "Tim and his father caught a lot of seaweed and mackerel after one hour of fishing.",
          "The Mermaid gave a violent lurch after Tim caught the mackerel."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "all that they had to show for their efforts was seaweed",
          "evidenceParagraph": 4,
          "trap": "True for the first statement",
          "trapExplanation": "After one hour, they had only caught seaweed, not mackerel. Tim caught the mackerel only later, so the first statement is false.",
          "keywords": [
            "seaweed",
            "violent lurch"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check each statement carefully against what the passage says - watch out for words like 'and' that join two ideas.",
          "steps": [
            "Find the part of the passage about what they caught after one hour.",
            "Check if they caught mackerel at that point.",
            "Find the sentence about the Mermaid lurching and check when it happened."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Tim was wide awake and full of energy when he felt the tug on his fishing line. Is this True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "He was struggling to keep his eyes open, which means he was very tired and sleepy, not wide awake and full of energy.",
          "The passage says Tim was struggling to keep his eyes open just before he felt the tug, so he was tired, not energetic."
        ],
        "solution": {
          "evidence": "He was struggling to keep his eyes open",
          "evidenceParagraph": 5,
          "trap": "True",
          "trapExplanation": "The passage clearly states Tim was struggling to keep his eyes open, meaning he was sleepy and tired, not wide awake.",
          "keywords": [
            "struggling",
            "eyes open",
            "tired"
          ],
          "answerFormat": "write True or False and give a reason using evidence from the passage",
          "tip": "Find the sentence that describes Tim's condition just before he felt the tug and use it as your reason.",
          "steps": [
            "Read paragraph 5.",
            "Find the sentence that describes how Tim was feeling.",
            "Use that sentence as evidence to support your answer of False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q15_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why do you think Tim reeled in the fishing line quickly when he saw it dip deeper into the water?",
        "answer": "Tim reeled in the fishing line quickly because he realised that a fish had been caught on his hook and he did not want to lose it.",
        "solution": {
          "evidence": "Instinctively, he reeled it in quickly. He had caught a mackerel",
          "evidenceParagraph": 6,
          "trap": "Because he was in a hurry to go home.",
          "trapExplanation": "The passage shows Tim acted instinctively to secure the fish on his hook, not because he wanted to go home.",
          "keywords": [
            "instinctively",
            "mackerel",
            "reeled"
          ],
          "answerFormat": "write a complete sentence beginning with 'Tim reeled in the fishing line quickly because...'",
          "tip": "Use the word 'because' to link Tim's action to the reason shown in the passage.",
          "steps": [
            "Read paragraph 6 to find what happened when the line dipped.",
            "Think about why a fisherman would reel in quickly when the line dips.",
            "Write a complete sentence with a clear reason supported by the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "on the last day of school, jenny and dolly were walking home from school with gr": {
    "id": "rgps2023-secA-comprehension1",
    "title": "Section A: Comprehension 1 - The Misdelivered Parcel",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q16_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Jenny and Dolly found a parcel at ______ when they arrived at Dolly's house.",
        "answer": "the doorstep",
        "acceptableAnswers": [
          "Dolly's doorstep",
          "the door step"
        ],
        "solution": {
          "evidence": "a parcel at the doorstep",
          "evidenceParagraph": 1,
          "trap": "the front gate",
          "trapExplanation": "The passage says the parcel was at the doorstep, not the front gate.",
          "keywords": [
            "parcel",
            "doorstep"
          ],
          "answerFormat": "short phrase, 2-3 words",
          "tip": "Look for where exactly the parcel was found in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence about where the parcel was.",
            "Copy the location from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "What was inside the parcel that Jenny and Dolly opened?",
        "options": [
          "A patchwork blanket",
          "A birthday gift",
          "A box of cloth",
          "A box of sewing tools"
        ],
        "answer": 2,
        "solution": {
          "evidence": "it was a box of cloth",
          "evidenceParagraph": 2,
          "trap": "A patchwork blanket",
          "trapExplanation": "The blanket was what Aunt Joyce was supposed to sew using the cloth, not what was inside the parcel.",
          "keywords": [
            "box",
            "cloth"
          ],
          "answerFormat": "one option",
          "tip": "Read paragraph 2 to find out what was in the parcel, not what the cloth was meant to become.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence describing the contents of the parcel.",
            "Choose the option that matches exactly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did the girls feel when they saw what was inside the parcel?",
        "abSentence": "To their (A) excitement ... (B) disappointment, it was a box of cloth.",
        "abChoices": {
          "A": "excitement",
          "B": "disappointment"
        },
        "answer": "B",
        "solution": {
          "evidence": "To their disappointment, it was a box of cloth",
          "evidenceParagraph": 2,
          "trap": "A",
          "trapExplanation": "The girls were excited before opening the parcel, but they felt disappointed when they saw what was inside.",
          "keywords": [
            "disappointment",
            "cloth"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look at what the girls felt after they opened the parcel, not before.",
          "steps": [
            "Read paragraph 2.",
            "Find the word that describes the girls' feelings after opening the parcel.",
            "Choose the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means to say something in a loud voice for others to hear?",
        "answer": "aloud",
        "acceptableAnswers": [
          "aloud"
        ],
        "solution": {
          "evidence": "Jenny picked it up and read it aloud",
          "evidenceParagraph": 3,
          "trap": "curiously",
          "trapExplanation": "Curiously means with curiosity or interest, not reading in a loud voice.",
          "keywords": [
            "aloud",
            "read"
          ],
          "answerFormat": "one single word from paragraph 3",
          "tip": "Look for a word that describes how Jenny read the note - in a way that others could hear.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find a word that means speaking loudly so others can hear.",
            "Write that one word as the answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "Jenny and Dolly brought the parcel to Aunt Joyce.",
          "The two girls tore open the parcel eagerly.",
          "Jenny read the note from the sender aloud."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "The two girls eagerly tore open the parcel",
          "evidenceParagraph": 2,
          "trap": "Reading the note before opening the parcel",
          "trapExplanation": "The girls first opened the parcel, then found the note, and then read it aloud.",
          "keywords": [
            "tore open",
            "note",
            "Aunt Joyce"
          ],
          "answerFormat": "numbers 1, 2, 3 showing order",
          "tip": "Follow the story from paragraph 2 onwards to find the correct order of events.",
          "steps": [
            "Read paragraphs 2 to 4 in order.",
            "Identify when each event happened.",
            "Number them 1, 2, 3 accordingly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "The cloth pieces in the parcel were all cut into different sizes.",
          "Aunt Joyce was Dolly's neighbour."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "The cloth had been cut into square pieces, all of the same size",
          "evidenceParagraph": 2,
          "trap": "True for the first statement",
          "trapExplanation": "The passage clearly states the pieces were all of the same size, not different sizes.",
          "keywords": [
            "same size",
            "neighbour"
          ],
          "answerFormat": "True or False for each statement",
          "tip": "Check paragraph 2 for the first statement and paragraph 4 for the second statement.",
          "steps": [
            "Read paragraph 2 to check the size of the cloth pieces.",
            "Read paragraph 4 to find out who Aunt Joyce is.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The parcel was meant for Dolly. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The note in the parcel was addressed to Aunt Joyce, not Dolly.",
          "The parcel was meant for Aunt Joyce, who was Dolly's neighbour, not Dolly herself.",
          "The name and address on the parcel belonged to Dolly's neighbour, Aunt Joyce."
        ],
        "solution": {
          "evidence": "it was none other than Dolly's neighbour",
          "evidenceParagraph": 4,
          "trap": "True, because it was found at Dolly's doorstep",
          "trapExplanation": "The parcel was at Dolly's doorstep by mistake. The rightful owner was Aunt Joyce, Dolly's neighbour.",
          "keywords": [
            "rightful owner",
            "neighbour"
          ],
          "answerFormat": "False, with one reason sentence",
          "tip": "Check paragraph 4 to find out who the parcel really belonged to.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find evidence in the passage to support your answer.",
            "Write a clear reason using information from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q16_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Jenny and Dolly decide to return the parcel to Aunt Joyce?",
        "answer": "Jenny and Dolly decided to return the parcel to Aunt Joyce because they felt bad about opening it and wanted to give it to the rightful owner.",
        "solution": {
          "evidence": "Jenny and Dolly felt bad about opening the parcel so they decided to return it to the rightful owner",
          "evidenceParagraph": 4,
          "trap": "Because Aunt Joyce asked for it back",
          "trapExplanation": "Aunt Joyce did not ask for it back. The girls took the initiative themselves because they felt bad.",
          "keywords": [
            "felt bad",
            "rightful owner"
          ],
          "answerFormat": "complete sentence starting with 'Jenny and Dolly...'",
          "tip": "Look for the reason given in paragraph 4 for why the girls returned the parcel.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the reason why the girls returned the parcel.",
            "Write a complete sentence using that reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "a poor old woman was trotting home one evening when she came across a big pot. t": {
    "id": "rgps2023-secB-comprehension2",
    "title": "Section B: Comprehension 2 - The Bogey-Beast",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q17_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The old woman decided to take the big pot home because she wanted to put a ______ in it at her window.",
        "answer": "flower in it",
        "acceptableAnswers": [
          "a flower in it",
          "flower"
        ],
        "solution": {
          "evidence": "she could put a flower in it at her window",
          "evidenceParagraph": 1,
          "trap": "gold coins",
          "trapExplanation": "She did not know about the gold at first; she wanted to use the pot for a flower.",
          "keywords": [
            "flower",
            "window"
          ],
          "answerFormat": "1-3 words",
          "tip": "Read the first paragraph carefully to find out why she wanted the pot before she saw the gold.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the reason the woman wanted the pot.",
            "Copy the key word - flower."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "How did the old woman carry the pot after she found the gold inside?",
        "options": [
          "She lifted it onto her back.",
          "She tied her shawl to the pot and dragged it.",
          "She asked someone to help her carry it.",
          "She rolled it along the road."
        ],
        "answer": 1,
        "solution": {
          "evidence": "she tied the end of her shawl to the pot and dragged it behind her",
          "evidenceParagraph": 2,
          "trap": "She lifted it onto her back.",
          "trapExplanation": "The text says carrying it would break her back, so she dragged it instead of lifting it.",
          "keywords": [
            "tied",
            "shawl",
            "dragged"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the exact method described in paragraph 2.",
          "steps": [
            "Read paragraph 2.",
            "Find the sentence about how she moved the pot.",
            "Match it to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that the old woman was happy and surprised when she saw the gold?",
        "abSentence": "She was (A) pleasantly ... (B) shocked to see the pot full of gold.",
        "abChoices": {
          "A": "pleasantly surprised",
          "B": "shocked"
        },
        "answer": "A",
        "solution": {
          "evidence": "she was pleasantly surprised to see the pot full of gold",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "She was shocked later when the gold changed to silver, not when she first saw the gold.",
          "keywords": [
            "pleasantly",
            "surprised"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Check whether the feeling was positive or negative at that moment.",
          "steps": [
            "Read paragraph 2.",
            "Identify the old woman's feeling when she saw the gold.",
            "Choose the option that matches a happy surprise."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 7 means that the old woman's body was hurting from tiredness?",
        "answer": "ached",
        "acceptableAnswers": [
          "ached"
        ],
        "solution": {
          "evidence": "When her bones ached, she stopped",
          "evidenceParagraph": 7,
          "trap": "skipped",
          "trapExplanation": "'Skipped' describes her heart reaction from shock, not body pain from tiredness.",
          "keywords": [
            "bones",
            "ached"
          ],
          "answerFormat": "One word from paragraph 7",
          "tip": "Look for a word that describes physical pain in the body.",
          "steps": [
            "Read paragraph 7 carefully.",
            "Look for a word related to pain or hurting.",
            "Write that single word as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The treasure changed into a lump of iron.",
          "The old woman found a big pot on the road.",
          "The treasure changed into a lump of silver."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "A poor old woman was trotting home one evening when she came across a big pot",
          "evidenceParagraph": 1,
          "trap": "Putting iron before silver",
          "trapExplanation": "The treasure changed from gold to silver first, then from silver to iron later.",
          "keywords": [
            "pot",
            "silver",
            "iron"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event",
          "tip": "Follow the order of events paragraph by paragraph.",
          "steps": [
            "Read the passage from the beginning.",
            "Track each change in the treasure.",
            "Number the events in the correct order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False.",
        "statements": [
          "The old woman was upset when the gold changed to silver because silver is easily stolen.",
          "The old woman planned how to spend her money while she was walking after finding the iron."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "Silver is not easily stolen. The gold pieces could attract robbers",
          "evidenceParagraph": 4,
          "trap": "Saying both are True",
          "trapExplanation": "The old woman was not upset about the silver; she said it was great because silver is not easily stolen.",
          "keywords": [
            "silver",
            "stolen",
            "iron",
            "spend"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check both the old woman's reaction to silver and the detail about her planning.",
          "steps": [
            "Read paragraph 4 for the first statement.",
            "Read paragraph 7 for the second statement.",
            "Decide if each statement matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The old woman remained calm when she saw the creature at the end of the story. Is this True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "It is False because her heart skipped a beat when she saw the creature, which shows she was frightened and not calm.",
          "It is False because the text says her heart skipped a beat and she tried hard to calm herself down, meaning she was not calm."
        ],
        "solution": {
          "evidence": "her heart skipped a beat",
          "evidenceParagraph": 7,
          "trap": "True",
          "trapExplanation": "Students may think she stayed calm because she had stayed positive before, but her heart skipping a beat and trying hard to calm herself shows she was frightened.",
          "keywords": [
            "heart skipped",
            "calm herself"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Look for clues about her feelings when she saw the creature - her heart and actions tell you the truth.",
          "steps": [
            "Read the last two paragraphs.",
            "Find evidence of the old woman's reaction.",
            "Use the evidence to explain why the statement is false."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q17_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why do you think the old woman kept finding something good to say each time her treasure changed?",
        "answer": "The old woman kept finding something good to say each time her treasure changed because she was a positive and cheerful person who did not want to feel sad about her bad luck.",
        "solution": {
          "evidence": "But this is great!",
          "evidenceParagraph": 4,
          "trap": "Because she was greedy",
          "trapExplanation": "The old woman was not greedy; she accepted each change and found a reason to be happy, showing a positive attitude.",
          "keywords": [
            "great",
            "luck",
            "positive"
          ],
          "answerFormat": "Write a complete sentence starting with 'The old woman...'",
          "tip": "Think about the old woman's character - how does she react every time something goes wrong?",
          "steps": [
            "Look at each time the treasure changed.",
            "Notice how the old woman reacted each time.",
            "Write a complete sentence explaining her character and attitude."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "back when we did not have any toys, the seeds, flowers and leaves of local plant": {
    "id": "rgps2024-secB-comprehension2",
    "title": "Section B: Comprehension 2 - Collecting Saga Seeds",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q19_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "While waiting for their grandmother after school, the writer and his brother would challenge each other to look for ______.",
        "answer": "bright red seeds",
        "acceptableAnswers": [
          "the bright red seeds",
          "bright red saga seeds"
        ],
        "solution": {
          "evidence": "challenge each other to look for the bright red seeds",
          "evidenceParagraph": 1,
          "trap": "saga trees",
          "trapExplanation": "The boys were looking for seeds, not trees.",
          "keywords": [
            "challenge",
            "bright red seeds"
          ],
          "answerFormat": "2-4 words describing what they looked for",
          "tip": "Look for what the brothers were trying to find after school.",
          "steps": [
            "Find the sentence about challenging each other.",
            "Identify what they were looking for.",
            "Write the exact description of the seeds."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the grandmother warn the children about the saga seeds?",
        "options": [
          "Because the seeds were too small to play with.",
          "Because the toddler sister almost swallowed one.",
          "Because the seeds would stain their hands.",
          "Because the seeds were difficult to find."
        ],
        "answer": 1,
        "solution": {
          "evidence": "our toddler sister almost swallowed one of them",
          "evidenceParagraph": 2,
          "trap": "Because the seeds were too small to play with.",
          "trapExplanation": "The passage does not say the seeds were too small; the warning came after the toddler nearly swallowed one.",
          "keywords": [
            "warned",
            "toddler sister",
            "swallowed"
          ],
          "answerFormat": "Choose the option that matches the reason given in the passage.",
          "tip": "Read the sentence just before the grandmother's warning to find the reason.",
          "steps": [
            "Locate the grandmother's warning in paragraph 2.",
            "Read what happened just before the warning.",
            "Match the event to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that the brothers treated the ground around the saga trees like a place where objects are dug up carefully?",
        "abSentence": "We dug around the ground around the saga trees as if they were (A) excavation ... (B) competition sites.",
        "abChoices": {
          "A": "excavation",
          "B": "competition"
        },
        "answer": "A",
        "solution": {
          "evidence": "as if they were excavation sites",
          "evidenceParagraph": 1,
          "trap": "competition",
          "trapExplanation": "Competition refers to the contest between the brothers, not the act of digging carefully.",
          "keywords": [
            "excavation",
            "dug"
          ],
          "answerFormat": "Circle A or B.",
          "tip": "Think about which word is connected to digging and uncovering things from the ground.",
          "steps": [
            "Read both word choices carefully.",
            "Think about the meaning of each word.",
            "Choose the word that matches the idea of digging up objects."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means decorative objects used to make a place look attractive?",
        "answer": "ornaments",
        "acceptableAnswers": [
          "ornaments"
        ],
        "solution": {
          "evidence": "special glass jars to be used as beautiful ornaments at home",
          "evidenceParagraph": 3,
          "trap": "marbles",
          "trapExplanation": "Marbles are collectibles mentioned for comparison, not objects used to decorate a home.",
          "keywords": [
            "ornaments",
            "beautiful",
            "home"
          ],
          "answerFormat": "One word from paragraph 3.",
          "tip": "Look for a word that describes something displayed at home for beauty.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find the word related to decoration.",
            "Check that the word means 'decorative objects'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "The children began to keep the saga seeds in jars.",
          "The writer and his brother competed to find red seeds after school.",
          "The children used saga seeds to make musical shakers."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "challenge each other to look for the bright red seeds",
          "evidenceParagraph": 1,
          "trap": "Putting the shakers before the jars",
          "trapExplanation": "The grandmother warned them first, they kept seeds in jars, and only after that did they make shakers.",
          "keywords": [
            "competition",
            "jars",
            "shakers"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event.",
          "tip": "Follow the order of events across all three paragraphs.",
          "steps": [
            "Find where each event is mentioned in the passage.",
            "Note which paragraph each event appears in.",
            "Arrange the events from first to last."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "The writer has thrown away all of his saga seeds.",
          "Saga seeds were used for Art and Craft projects."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "I have kept some of the seeds even till today",
          "evidenceParagraph": 1,
          "trap": "Marking the first statement as True",
          "trapExplanation": "The passage clearly states the writer kept some seeds till today, so he did not throw them away.",
          "keywords": [
            "kept",
            "Art and Craft"
          ],
          "answerFormat": "Write True or False for each statement.",
          "tip": "Check each statement against what the passage says directly.",
          "steps": [
            "Find information about the writer keeping seeds in paragraph 1.",
            "Find information about Art and Craft in paragraph 2.",
            "Decide if each statement matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Collecting saga seeds was the most popular pastime among children. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "It was almost as cool as collecting marbles, stamps and postcards, which means other pastimes were just as popular.",
          "The passage says collecting saga seeds was almost as cool as collecting marbles, stamps and postcards, so it was not the most popular."
        ],
        "solution": {
          "evidence": "almost as cool as collecting marbles, stamps and postcards",
          "evidenceParagraph": 3,
          "trap": "True",
          "trapExplanation": "The word 'almost' shows that collecting saga seeds was not quite as popular as other pastimes like collecting marbles, stamps and postcards.",
          "keywords": [
            "almost",
            "marbles",
            "stamps",
            "postcards"
          ],
          "answerFormat": "Write True or False and give a reason using evidence from the passage.",
          "tip": "Pay attention to the word 'almost' - it means not fully equal.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Identify the word that shows saga seed collecting was not the most popular.",
            "Use this as your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q19_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the children put saga seeds into Yakult bottles sealed with masking tape?",
        "answer": "The children put saga seeds into Yakult bottles sealed with masking tape to make musical shakers.",
        "solution": {
          "evidence": "make musical shakers",
          "evidenceParagraph": 2,
          "trap": "To store the seeds safely",
          "trapExplanation": "The passage says they kept seeds in jars for safety, but the Yakult bottles were specifically used to make musical shakers.",
          "keywords": [
            "Yakult bottles",
            "masking tape",
            "musical shakers"
          ],
          "answerFormat": "Write a complete sentence starting with 'The children...'",
          "tip": "Look for the purpose of using Yakult bottles in paragraph 2.",
          "steps": [
            "Find the sentence about Yakult bottles in paragraph 2.",
            "Identify the reason for sealing them with masking tape.",
            "Write a complete sentence answering 'why'."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "one sunny afternoon, lily was walking home from school when she found a glittery": {
    "id": "rgps2025-secA",
    "title": "Section A: Comprehension 1 - The Found Marble",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q20_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Lily found a glittery, red marble lying on the ______.",
        "answer": "sidewalk",
        "acceptableAnswers": [
          "sidewalk"
        ],
        "solution": {
          "evidence": "a glittery, red marble lying on the sidewalk",
          "evidenceParagraph": 1,
          "trap": "playground",
          "trapExplanation": "The passage says she was walking home from school and found it on the sidewalk, not on a playground.",
          "keywords": [
            "found",
            "sidewalk"
          ],
          "answerFormat": "one word for a place",
          "tip": "Scan paragraph 1 for where the marble was found.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence describing where the marble was lying.",
            "Copy the exact location word."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Lily decide to take the marble to the lost-and-found corner?",
        "options": [
          "She wanted to keep it for her toy collection.",
          "She thought the person who lost it must be very sad.",
          "Mrs Lim told her to hand it in.",
          "She did not like the colour of the marble."
        ],
        "answer": 1,
        "solution": {
          "evidence": "The person who has lost it must be very sad",
          "evidenceParagraph": 1,
          "trap": "She wanted to keep it for her toy collection.",
          "trapExplanation": "Although the marble looked like something from her favourite collection, she chose not to keep it because she felt sorry for the owner.",
          "keywords": [
            "thought",
            "sad"
          ],
          "answerFormat": "choose one option A-D",
          "tip": "Look for the reason Lily gave in her thoughts in paragraph 1.",
          "steps": [
            "Read paragraph 1 again.",
            "Find the thought that crossed Lily's mind.",
            "Match it to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes what Mrs Lim thought of Lily's action?",
        "abSentence": "She was proud of Lily's (A) remarkable ... (B) usual deed.",
        "abChoices": {
          "A": "remarkable",
          "B": "usual"
        },
        "answer": "A",
        "solution": {
          "evidence": "proud of Lily's remarkable deed",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "The passage uses 'remarkable', meaning special and worthy of praise, not 'usual' which means ordinary.",
          "keywords": [
            "proud",
            "remarkable"
          ],
          "answerFormat": "circle A or B",
          "tip": "Find the exact adjective used to describe Lily's deed in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Locate the sentence about Mrs Lim being proud.",
            "Identify the word that describes Lily's deed."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means a feeling of comfort or contentment inside?",
        "answer": "warm",
        "acceptableAnswers": [
          "warm"
        ],
        "solution": {
          "evidence": "Lily felt a warm feeling in her heart",
          "evidenceParagraph": 4,
          "trap": "happy",
          "trapExplanation": "Although 'happy' appears in paragraph 4, the specific word describing the physical feeling inside her heart is 'warm'.",
          "keywords": [
            "warm",
            "feeling"
          ],
          "answerFormat": "one word from paragraph 4",
          "tip": "Look for a describing word linked to how Lily felt in her heart.",
          "steps": [
            "Read paragraph 4 closely.",
            "Find the phrase that describes Lily's inner feeling.",
            "Pick out the single adjective that means comfort or contentment."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Max came to collect his marble from the lost-and-found corner.",
          "Lily found a red marble on the sidewalk.",
          "Lily handed the marble to the lost-and-found corner at school."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "a glittery, red marble lying on the sidewalk",
          "evidenceParagraph": 1,
          "trap": "Putting Max's visit before Lily hands in the marble.",
          "trapExplanation": "Lily first found the marble, then handed it in, and only on the next day did Max come to collect it.",
          "keywords": [
            "found",
            "next day",
            "lost-and-found"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Use time words like 'one sunny afternoon', 'she decided', and 'the next day' to order events.",
          "steps": [
            "Identify time clues in the passage.",
            "Match each event to its paragraph.",
            "Number them from first to last."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "Max had been searching for his marble before he came to school.",
          "Lily felt sad after she returned the marble to Max."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "He had been looking for it and was so happy to get it back",
          "evidenceParagraph": 3,
          "trap": "False for the first statement",
          "trapExplanation": "The passage clearly states Max had been looking for the marble, confirming the first statement is True.",
          "keywords": [
            "looking",
            "happy"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check paragraph 3 for Max's actions and paragraph 4 for Lily's feelings.",
          "steps": [
            "Read paragraph 3 to check if Max had been searching.",
            "Read paragraph 4 to check how Lily felt after returning the marble.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Lily learned that being kind to others can make her happy too. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "She realised that doing something kind for someone made her very happy and that sharing joy with others can bring happiness as well.",
          "The passage says she realised that doing something kind for someone made her very happy."
        ],
        "solution": {
          "evidence": "doing something kind for someone made her very happy",
          "evidenceParagraph": 4,
          "trap": "False",
          "trapExplanation": "The passage explicitly states that Lily realised kindness brought her happiness, so the statement is True.",
          "keywords": [
            "kind",
            "happy"
          ],
          "answerFormat": "write True or False and give one reason from the passage",
          "tip": "Support your answer with evidence from paragraph 4.",
          "steps": [
            "Decide if the statement matches the passage.",
            "Find the sentence in paragraph 4 that supports your answer.",
            "Write your reason clearly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q20_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Max feel happy when he went to the lost-and-found corner?",
        "answer": "Max felt happy because he found his red marble that he had been searching for, and he got it back thanks to Lily's kindness.",
        "solution": {
          "evidence": "He had been looking for it and was so happy to get it back",
          "evidenceParagraph": 3,
          "trap": "Max felt happy because he met Lily.",
          "trapExplanation": "The passage states Max was happy specifically because he got his marble back, not simply because he met Lily.",
          "keywords": [
            "happy",
            "get it back"
          ],
          "answerFormat": "write a complete sentence starting with 'Max felt happy because...'",
          "tip": "Include both what Max found and the reason he was searching for it.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Identify why Max went to the lost-and-found corner.",
            "Write a full sentence explaining his happiness using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "madam ng moey chye's job was to carry bricks at a construction site. she would w": {
    "id": "ny-wa2-2023-secE-comprehension",
    "title": "(E) Comprehension - Madam Ng, a Samsui Woman",
    "instructions": "Read this passage and answer questions 13 to 19.",
    "marks": 10,
    "questions": [
      {
        "id": "q24_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Madam Ng walked from her home at Chinatown to ______ where she worked.",
        "answer": "Collyer Quay",
        "acceptableAnswers": [
          "Collyer Quay"
        ],
        "solution": {
          "evidence": "walk from her home at Chinatown to Collyer Quay where she worked",
          "evidenceParagraph": 1,
          "trap": "construction site",
          "trapExplanation": "The passage names the specific place as Collyer Quay, not just a construction site.",
          "keywords": [
            "Chinatown",
            "Collyer Quay"
          ],
          "answerFormat": "a proper place name",
          "tip": "Look for the destination stated after 'to' in the sentence.",
          "steps": [
            "Find the sentence about Madam Ng walking to work.",
            "Identify the place name after 'to'.",
            "Write the exact place name as the answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why was Madam Ng unable to find a regular job when she became an adult?",
        "options": [
          "She was too young to work.",
          "Her adoptive parents never sent her to school.",
          "She chose to work at construction sites.",
          "She moved to Singapore from China."
        ],
        "answer": 1,
        "solution": {
          "evidence": "her adoptive parents never sent her to school",
          "evidenceParagraph": 2,
          "trap": "She moved to Singapore from China.",
          "trapExplanation": "The passage states Madam Ng was born in Singapore; it was her lack of schooling that made it hard to find work.",
          "keywords": [
            "adoptive parents",
            "school"
          ],
          "answerFormat": "one of the four options",
          "tip": "Read paragraph 2 carefully to find the reason she could not get a job.",
          "steps": [
            "Read paragraph 2 for information about Madam Ng's childhood.",
            "Find the reason she could not find a job.",
            "Choose the option that matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "What did Madam Ng wear on her head as a Samsui woman?",
        "abSentence": "She also wore a (A) bright red headscarf ... or (B) hong toujin that was typical of Samsui women.",
        "abChoices": {
          "A": "bright red headscarf",
          "B": "hong toujin"
        },
        "answer": "A",
        "solution": {
          "evidence": "She also wore a bright red headscarf or 'hong toujin'",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "'Hong toujin' is the Chinese term for the same item; the English description is 'bright red headscarf'.",
          "keywords": [
            "bright red headscarf",
            "hong toujin"
          ],
          "answerFormat": "circle A or B",
          "tip": "The passage gives the English name first, then the Chinese term after 'or'.",
          "steps": [
            "Find the sentence about what Madam Ng wore.",
            "Note that the English description comes first.",
            "Circle A for the English answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means 'thankful'?",
        "answer": "grateful",
        "acceptableAnswers": [
          "grateful"
        ],
        "solution": {
          "evidence": "She is grateful to the young volunteers there",
          "evidenceParagraph": 5,
          "trap": "fortunate",
          "trapExplanation": "'Fortunate' means lucky, not thankful. 'Grateful' specifically means feeling thankful.",
          "keywords": [
            "grateful",
            "thankful"
          ],
          "answerFormat": "a single word from paragraph 5",
          "tip": "Think of a word that means the same as 'thankful' and look for it in paragraph 5.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Look for a word that means 'thankful'.",
            "Write that single word as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in Madam Ng's life.",
        "sequenceItems": [
          "Madam Ng started working as a Samsui woman.",
          "Madam Ng was born in Singapore.",
          "Madam Ng retired and moved to a flat in Redhill."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Madam Ng was born in Singapore in 1932",
          "evidenceParagraph": 2,
          "trap": "Putting retirement before becoming a Samsui woman",
          "trapExplanation": "The passage clearly shows she was born first, then became a Samsui woman as an adult, and is now retired.",
          "keywords": [
            "born",
            "Samsui woman",
            "retired"
          ],
          "answerFormat": "numbers 1, 2, 3 showing order",
          "tip": "Use the clues about her age and life stages to arrange events in order.",
          "steps": [
            "Identify when each event happened using the passage.",
            "Decide which event came first, second, and third.",
            "Write the correct order numbers."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Madam Ng is 85 years old and still earns money by selling used cardboard.",
          "Madam Ng receives a food package from the Apex Club every day."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "She earns money by selling used cardboard that she collects from the neighbourhood",
          "evidenceParagraph": 4,
          "trap": "Saying the second statement is True",
          "trapExplanation": "The passage says she goes to the Apex Club once a week, not every day.",
          "keywords": [
            "cardboard",
            "once a week"
          ],
          "answerFormat": "True or False for each statement",
          "tip": "Check the exact frequency mentioned in the passage for the second statement.",
          "steps": [
            "Find information about Madam Ng's age and income in paragraph 4.",
            "Find how often she visits the Apex Club in paragraph 5.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Madam Ng is unhappy with her life now. Is this True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "She chooses to see the brighter side of her situation and feels fortunate that she is still in good health.",
          "She is still healthy and cheerful, and does not let her age slow her down."
        ],
        "solution": {
          "evidence": "she chooses to see the brighter side of her situation",
          "evidenceParagraph": 5,
          "trap": "True, because she lives a simple life",
          "trapExplanation": "Living a simple life does not mean she is unhappy. The passage says she chooses to see the brighter side and feels fortunate.",
          "keywords": [
            "cheerful",
            "brighter side",
            "fortunate"
          ],
          "answerFormat": "False, with a reason from the passage",
          "tip": "Look for words that describe Madam Ng's attitude and feelings in paragraphs 4 and 5.",
          "steps": [
            "Decide if the statement matches what the passage says about Madam Ng's feelings.",
            "Find evidence that shows how she really feels.",
            "Write False and support it with a reason from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q24_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why do you think Madam Ng is described as a pioneering tradeswoman?",
        "answer": "Madam Ng is described as a pioneering tradeswoman because she worked hard as a Samsui woman carrying bricks at construction sites at a time when such work was difficult and uncommon for women.",
        "solution": {
          "evidence": "She supported herself by working at construction sites",
          "evidenceParagraph": 3,
          "trap": "Because she sells cardboard now",
          "trapExplanation": "Selling cardboard is her current activity; her pioneering role was her work as a Samsui woman at construction sites in the past.",
          "keywords": [
            "pioneering",
            "Samsui woman",
            "construction sites"
          ],
          "answerFormat": "a complete sentence starting with 'Madam Ng is described as a pioneering tradeswoman because...'",
          "tip": "Think about what made her work special or unusual, and write a full sentence explaining your answer.",
          "steps": [
            "Understand what 'pioneering' means - being one of the first or doing something brave and new.",
            "Find details in the passage about her work as a Samsui woman.",
            "Write a complete sentence explaining why she is called a pioneering tradeswoman."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "an ant was searching for some water on a hot and humid day. after crawling aroun": {
    "id": "SHP-T2WA-2024-C-COMPREHENSION",
    "title": "Section C: Comprehension (10 marks, Q17-24)",
    "instructions": "Read this passage carefully and answer questions 17 to 24.",
    "marks": 10,
    "questions": [
      {
        "id": "q25_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The ant fell into the lake because a strong wind caused it to ______.",
        "answer": "lose its balance",
        "acceptableAnswers": [
          "lose its balance",
          "lost its balance"
        ],
        "solution": {
          "evidence": "a strong wind suddenly blew, causing the ant to lose its balance",
          "evidenceParagraph": 1,
          "trap": "drown in the lake",
          "trapExplanation": "The ant did not drown; it fell in because it lost its balance.",
          "keywords": [
            "strong wind",
            "balance"
          ],
          "answerFormat": "3-4 words",
          "tip": "Look for the cause-and-effect signal word 'causing' in the passage.",
          "steps": [
            "Find the sentence about the wind.",
            "Look for what happened to the ant as a result.",
            "Copy the words that describe what the ant lost."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the ant go to the lake?",
        "options": [
          "To swim in the cool water",
          "To search for food",
          "To get a drink of water",
          "To meet the bird"
        ],
        "answer": 2,
        "solution": {
          "evidence": "trying to get a sip of water",
          "evidenceParagraph": 1,
          "trap": "To swim in the cool water",
          "trapExplanation": "The ant wanted a sip of water, not to swim.",
          "keywords": [
            "sip",
            "water"
          ],
          "answerFormat": "Choose one option",
          "tip": "Re-read the first paragraph carefully to find the ant's purpose at the lake.",
          "steps": [
            "Go back to paragraph 1.",
            "Find the sentence that explains what the ant was trying to do at the lake's edge.",
            "Match the meaning to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that the bird helped the ant right away, without any delay?",
        "abSentence": "The bird helped the ant (A) hesitantly ... (B) without hesitation.",
        "abChoices": {
          "A": "hesitantly",
          "B": "without hesitation"
        },
        "answer": "B",
        "solution": {
          "evidence": "Without hesitation, the bird plucked a leaf with its beak",
          "evidenceParagraph": 2,
          "trap": "A",
          "trapExplanation": "'Hesitantly' means with doubt or delay, which is the opposite of what the bird did.",
          "keywords": [
            "hesitation",
            "immediately"
          ],
          "answerFormat": "Circle A or B",
          "tip": "'Without hesitation' means doing something immediately, with no delay.",
          "steps": [
            "Find the sentence describing what the bird did when it heard the ant.",
            "Look for the phrase that tells how quickly the bird acted.",
            "Choose the option that means 'right away'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'moved slowly on water towards the shore'?",
        "answer": "drifted",
        "acceptableAnswers": [
          "drifted"
        ],
        "solution": {
          "evidence": "the leaf drifted to the shore",
          "evidenceParagraph": 2,
          "trap": "struggled",
          "trapExplanation": "'Struggled' describes the ant's effort to reach the leaf, not the movement of the leaf on water.",
          "keywords": [
            "drifted",
            "shore"
          ],
          "answerFormat": "One word only",
          "tip": "Look for a word that describes how the leaf moved on the water's surface.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence about the leaf moving on the water.",
            "Identify the verb that describes this gentle movement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The ant bit the man on the ankle.",
          "The ant fell into the lake.",
          "The bird dropped a leaf into the water."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "a strong wind suddenly blew, causing the ant to lose its balance and it fell into the lake",
          "evidenceParagraph": 1,
          "trap": "Putting the bird dropping the leaf before the ant falling in",
          "trapExplanation": "The ant fell into the lake first, then the bird rescued it by dropping a leaf, and finally the ant bit the man.",
          "keywords": [
            "fell",
            "leaf",
            "bit"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event",
          "tip": "Use paragraph order to help you arrange the events correctly.",
          "steps": [
            "Re-read the passage from the beginning.",
            "Find each event and note which paragraph it appears in.",
            "Number the events from first to last."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "The man came to the lake to save the bird.",
          "The ant and the bird became best friends at the end of the story."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "He was about to cast his net to trap the bird",
          "evidenceParagraph": 3,
          "trap": "True for the first statement",
          "trapExplanation": "The man wanted to trap the bird with his net, not save it.",
          "keywords": [
            "trap",
            "best friends"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Read each statement carefully and check it against the passage before answering.",
          "steps": [
            "Find the part of the passage about the man's intention.",
            "Check whether the man wanted to save or trap the bird.",
            "Find the sentence about the ant and the bird's friendship."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The ant was brave when it helped the bird. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The ant bit the man on the ankle even though the man was much bigger than it, to save the bird.",
          "The ant risked its own safety by biting the man to stop him from trapping the bird."
        ],
        "solution": {
          "evidence": "the ant quickly bit him on the ankle",
          "evidenceParagraph": 3,
          "trap": "False, because the ant was very small",
          "trapExplanation": "Being small does not mean the ant was not brave; it still acted quickly to save the bird despite the danger.",
          "keywords": [
            "bit",
            "ankle",
            "brave"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Think about what the ant did and whether it took a risk to help the bird.",
          "steps": [
            "Decide if the statement is true or false.",
            "Find the sentence showing what the ant did to help the bird.",
            "Explain why this action shows bravery."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q25_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the bird help the ant when it fell into the lake?",
        "answer": "The bird helped the ant because it heard the drowning ant's cries and, without hesitation, wanted to save it from the water.",
        "solution": {
          "evidence": "A bird perched on a nearby tree heard the drowning ant's cries",
          "evidenceParagraph": 2,
          "trap": "Because the bird and the ant were already friends",
          "trapExplanation": "The bird and ant only became friends after helping each other; they were not friends before.",
          "keywords": [
            "heard",
            "cries",
            "drowning"
          ],
          "answerFormat": "Write a complete sentence starting with 'The bird...'",
          "tip": "Use 'because' to link the reason to the answer and include details from the passage.",
          "steps": [
            "Find the part of the passage where the bird notices the ant.",
            "Identify what made the bird act.",
            "Write a complete sentence explaining the bird's reason for helping."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "have you ever heard about the man in the moon? for thousands of years, people ha": {
    "id": "acsj_eoy2022_B_comp2",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q27_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The light parts of the Moon are called ______.",
        "answer": "highlands",
        "acceptableAnswers": [
          "highlands",
          "mountain ranges"
        ],
        "solution": {
          "evidence": "Scientists call them highlands",
          "evidenceParagraph": 2,
          "trap": "seas",
          "trapExplanation": "Seas refer to the dark areas, not the light areas of the Moon.",
          "keywords": [
            "light",
            "highlands"
          ],
          "answerFormat": "one word",
          "tip": "Look for the sentence that names what scientists call the light parts.",
          "steps": [
            "Find the paragraph about light parts of the Moon.",
            "Locate the sentence where scientists give a name to those areas.",
            "Write the name used by scientists."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why do we see different things on the Moon's surface?",
        "options": [
          "The Moon is always moving around the Earth.",
          "The Moon has both light and dark areas.",
          "The Moon is covered in water and lava.",
          "The Moon is too far away to see clearly."
        ],
        "answer": 1,
        "solution": {
          "evidence": "there are light areas and dark areas",
          "evidenceParagraph": 1,
          "trap": "The Moon is always moving around the Earth.",
          "trapExplanation": "The passage says we see different things because of light and dark areas, not because the Moon moves.",
          "keywords": [
            "light areas",
            "dark areas"
          ],
          "answerFormat": "one option",
          "tip": "Re-read the first paragraph carefully for the reason given.",
          "steps": [
            "Read the question and all four options.",
            "Find the sentence in paragraph 1 that explains why we see different things.",
            "Match that reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how the rocks from space hit the Moon?",
        "abSentence": "Those formed when rocks from space, called meteors, (A) slammed ... (B) flowed into the lava.",
        "abChoices": {
          "A": "slammed",
          "B": "flowed"
        },
        "answer": "A",
        "solution": {
          "evidence": "rocks from space, called meteors, slammed into the lava",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "Flowed describes how lava moved, not how the rocks hit the Moon.",
          "keywords": [
            "rocks",
            "slammed"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for the action word that describes meteors hitting the Moon's surface.",
          "steps": [
            "Read the question to understand what is being asked.",
            "Find the sentence about meteors in paragraph 3.",
            "Identify which word describes how the rocks hit the Moon."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means 'wrongly' or 'incorrectly'?",
        "answer": "mistakenly",
        "acceptableAnswers": [
          "mistakenly"
        ],
        "solution": {
          "evidence": "people mistakenly believed that those dark areas contained water",
          "evidenceParagraph": 3,
          "trap": "believed",
          "trapExplanation": "Believed means to think something is true, not that the thinking was wrong.",
          "keywords": [
            "mistakenly",
            "wrongly"
          ],
          "answerFormat": "one word from paragraph 3",
          "tip": "Look for an adverb in paragraph 3 that means doing something in a wrong way.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Look for a word that means the same as 'wrongly' or 'incorrectly'.",
            "Check that the word is an adverb describing how people believed something."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened on the Moon.",
        "sequenceItems": [
          "Bright craters formed inside the seas.",
          "Dark lava flowed over parts of the Moon.",
          "Meteors slammed into the lava."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "The Moon's seas formed when dark lava flowed over those parts of the Moon",
          "evidenceParagraph": 3,
          "trap": "Putting craters before lava flow",
          "trapExplanation": "Craters could only form after the lava had already flowed and settled, so lava flow must come first.",
          "keywords": [
            "lava",
            "craters",
            "meteors"
          ],
          "answerFormat": "write 1, 2 or 3 next to each event",
          "tip": "Use the order of sentences in paragraph 3 to figure out the sequence of events.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Identify which event happened first, second and third.",
            "Number the events accordingly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False.",
        "statements": [
          "Astronauts have visited the Moon before.",
          "The Moon's seas contain a lot of water."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "Astronauts have also visited it",
          "evidenceParagraph": 2,
          "trap": "Saying both statements are True",
          "trapExplanation": "The passage says people mistakenly believed the dark areas contained water, meaning the Moon's seas do not actually have water.",
          "keywords": [
            "astronauts",
            "seas",
            "water"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check paragraph 2 for the first statement and paragraph 3 for the second statement.",
          "steps": [
            "Find evidence in the passage for statement 1.",
            "Find evidence in the passage for statement 2.",
            "Decide if each statement matches what the passage says."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "You need a telescope to see anything on the Moon. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The passage says some things on the Moon's face can be seen with just your eyes, so you do not always need a telescope.",
          "Some things on the Moon can be seen without any tools, which means a telescope is not always needed."
        ],
        "solution": {
          "evidence": "Some things on the Moon's face can be seen with just your eyes",
          "evidenceParagraph": 4,
          "trap": "True",
          "trapExplanation": "Students may think a telescope is always needed because it is mentioned, but the passage clearly states that some things can be seen with just your eyes.",
          "keywords": [
            "eyes",
            "telescope",
            "seen"
          ],
          "answerFormat": "write True or False and give a reason using evidence from the passage",
          "tip": "Read paragraph 4 carefully. Look for what can be seen without any tools.",
          "steps": [
            "Read the statement in the question.",
            "Find the sentence in paragraph 4 about what you can see without a telescope.",
            "Use that sentence as evidence to explain why the statement is False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q27_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did people long ago think that the dark areas of the Moon contained water?",
        "answer": "People long ago thought the dark areas of the Moon contained water because those areas looked like seas, and they mistakenly believed that seas must have water in them.",
        "solution": {
          "evidence": "Long ago, people mistakenly believed that those dark areas contained water",
          "evidenceParagraph": 3,
          "trap": "Because the Moon is close to Earth",
          "trapExplanation": "The passage does not say the Moon's closeness to Earth caused this belief. The dark areas were called seas, leading people to think they held water.",
          "keywords": [
            "mistakenly",
            "dark areas",
            "water"
          ],
          "answerFormat": "write a complete sentence beginning with 'People long ago thought...'",
          "tip": "Use the word 'because' to connect what people saw with what they wrongly believed.",
          "steps": [
            "Read the question carefully.",
            "Find the relevant sentence in paragraph 3 about what people believed.",
            "Write a complete sentence explaining the reason using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "once upon a time, there was a clever monkey who lived on a beautiful island, in ": {
    "id": "acsj_bsa2_2022_comp",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q28_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The monkey lived on a beautiful island in ______.",
        "answer": "an apple tree",
        "acceptableAnswers": [
          "an apple tree"
        ],
        "solution": {
          "evidence": "lived on a beautiful island, in an apple tree",
          "evidenceParagraph": 1,
          "trap": "a coconut tree",
          "trapExplanation": "The passage clearly states it was an apple tree, not a coconut tree.",
          "keywords": [
            "lived",
            "apple tree"
          ],
          "answerFormat": "2-3 words",
          "tip": "Look for where the monkey lived in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the phrase describing where the monkey lived.",
            "Copy the exact words from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the crocodile's wife want the monkey's heart?",
        "options": [
          "She wanted to make a meal for the crocodile.",
          "She wanted to be as clever as the monkey.",
          "She was hungry and needed food.",
          "She was envious of the monkey's apples."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Why don't you eat his heart? Then you'll be just like him!",
          "evidenceParagraph": 3,
          "trap": "She was hungry and needed food.",
          "trapExplanation": "The wife's idea was about gaining the monkey's intelligence, not about being hungry.",
          "keywords": [
            "heart",
            "clever"
          ],
          "answerFormat": "Choose one option",
          "tip": "Read paragraph 3 to find the wife's reason.",
          "steps": [
            "Locate where the crocodile's wife speaks.",
            "Read what she says carefully.",
            "Match her reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how the crocodile felt about the monkey's cleverness?",
        "abSentence": "He was (A) envious ... (B) grateful of the monkey's intelligence.",
        "abChoices": {
          "A": "envious",
          "B": "grateful"
        },
        "answer": "A",
        "solution": {
          "evidence": "He was envious of the monkey's intelligence",
          "evidenceParagraph": 3,
          "trap": "grateful",
          "trapExplanation": "The crocodile was jealous of the monkey's cleverness, not thankful for it.",
          "keywords": [
            "envious",
            "intelligence"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Look for the word that means jealous in paragraph 3.",
          "steps": [
            "Read paragraph 3.",
            "Find the word that describes how the crocodile felt.",
            "Choose the word that means jealous or wanting what someone else has."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means to bite suddenly and sharply?",
        "answer": "snapped",
        "acceptableAnswers": [
          "snapped"
        ],
        "solution": {
          "evidence": "the crocodile snapped and said",
          "evidenceParagraph": 5,
          "trap": "munched",
          "trapExplanation": "Munched means to chew steadily and appears in paragraph 1, not paragraph 5.",
          "keywords": [
            "snapped",
            "bite"
          ],
          "answerFormat": "One word",
          "tip": "Look for a word in paragraph 5 that describes a sudden biting action.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Look for a word describing a sudden sharp movement.",
            "Check that it fits the meaning of biting suddenly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The monkey climbed the tree and sat at the top.",
          "The crocodile gave one apple to his wife.",
          "The crocodile told the monkey he wanted to eat his heart."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "the crocodile came back once again",
          "evidenceParagraph": 2,
          "trap": "Putting the monkey climbing the tree first",
          "trapExplanation": "The crocodile giving an apple to his wife happened before the crocodile revealed his plan and before the monkey climbed the tree.",
          "keywords": [
            "order",
            "events"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Re-read the story in order and find when each event happened.",
          "steps": [
            "Read the whole passage from the beginning.",
            "Find where each event is mentioned.",
            "Number them in the order they appear in the story."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "The monkey tricked the crocodile by saying his heart was in the apple tree.",
          "The crocodile was happy at the end of the story."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "I haven't got my heart here. It's on the island, in the apple tree",
          "evidenceParagraph": 6,
          "trap": "Saying both statements are True",
          "trapExplanation": "The crocodile regretted listening to his wife at the end, so he was not happy.",
          "keywords": [
            "tricked",
            "regretted"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check the last paragraph to find out how the crocodile felt at the end.",
          "steps": [
            "Read statement 1 and find the matching part in the passage.",
            "Read statement 2 and check the last paragraph.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The crocodile was a good friend to the monkey. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The crocodile tried to eat the monkey's heart, which shows he was not a good friend.",
          "A good friend would not try to harm the monkey, but the crocodile wanted to eat his heart."
        ],
        "solution": {
          "evidence": "I want to eat your heart, so that I can be as clever as you",
          "evidenceParagraph": 5,
          "trap": "True, because the crocodile visited the monkey every day.",
          "trapExplanation": "Visiting every day was selfish as the crocodile only wanted apples and later tried to harm the monkey.",
          "keywords": [
            "heart",
            "friend"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Think about what a good friend would do and compare it to what the crocodile did.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find evidence in the passage to support your answer.",
            "Write a clear reason using words from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q28_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the monkey say his heart was in the apple tree?",
        "answer": "The monkey said his heart was in the apple tree because he wanted to trick the crocodile and escape safely.",
        "solution": {
          "evidence": "The clever monkey thought quickly and said",
          "evidenceParagraph": 6,
          "trap": "Because the monkey forgot his heart at home.",
          "trapExplanation": "The monkey was being clever and tricking the crocodile on purpose, not because he genuinely forgot.",
          "keywords": [
            "trick",
            "escape",
            "clever"
          ],
          "answerFormat": "Write a complete sentence starting with 'The monkey said...'",
          "tip": "Think about why the monkey needed to say something quickly and what he wanted to do.",
          "steps": [
            "Read paragraphs 5 and 6 carefully.",
            "Think about what the monkey was trying to do.",
            "Write a full sentence explaining his reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "last month, samy was in the park with his friend, peter. they were taking a walk": {
    "id": "eoy_acsprimary_p2b_2023_q35",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q29_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Samy and Peter were ______ in the park when they spotted a puppy.",
        "answer": "taking a walk",
        "acceptableAnswers": [
          "taking a walk",
          "on a walk"
        ],
        "solution": {
          "evidence": "They were taking a walk",
          "evidenceParagraph": 1,
          "trap": "playing in the park",
          "trapExplanation": "The passage says they were taking a walk, not playing.",
          "keywords": [
            "walk",
            "park"
          ],
          "answerFormat": "2-3 words describing what they were doing",
          "tip": "Look for the verb phrase that describes their activity in the park.",
          "steps": [
            "Find the paragraph that mentions Samy and Peter in the park.",
            "Look for what they were doing at that time.",
            "Copy the exact activity phrase."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Samy and Peter decide to take the puppy home?",
        "options": [
          "They wanted a new pet.",
          "There was no one in sight to claim it.",
          "The puppy was hurt and needed help.",
          "Peter's mother told them to."
        ],
        "answer": 1,
        "solution": {
          "evidence": "there was no one in sight",
          "evidenceParagraph": 1,
          "trap": "They wanted a new pet.",
          "trapExplanation": "The passage says they took it home because no owner could be found, not because they wanted a pet.",
          "keywords": [
            "owner",
            "sight"
          ],
          "answerFormat": "Choose the option that matches the reason given in the passage.",
          "tip": "Find the sentence explaining why they took the puppy home.",
          "steps": [
            "Re-read paragraph 1 carefully.",
            "Find the reason given for taking the puppy home.",
            "Match the reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did the little boy speak after he felt better?",
        "abSentence": "The little boy spoke in a (A) loud ... (B) soft voice when he talked to the boys.",
        "abChoices": {
          "A": "loud",
          "B": "soft"
        },
        "answer": "B",
        "solution": {
          "evidence": "the little boy spoke in a soft voice",
          "evidenceParagraph": 4,
          "trap": "A",
          "trapExplanation": "The passage clearly states the boy spoke in a soft voice, not a loud voice.",
          "keywords": [
            "soft",
            "voice"
          ],
          "answerFormat": "Circle A or B based on the passage.",
          "tip": "Look in paragraph 4 for how Meng Wee spoke.",
          "steps": [
            "Find paragraph 4 where Meng Wee speaks.",
            "Look for the word describing his voice.",
            "Circle the matching choice."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means felt very happy?",
        "answer": "rejoiced",
        "acceptableAnswers": [
          "rejoiced"
        ],
        "solution": {
          "evidence": "they rejoiced",
          "evidenceParagraph": 4,
          "trap": "relieved",
          "trapExplanation": "The passage uses 'rejoiced' to mean felt very happy, while 'heaved a sigh of relief' means they felt relieved, which is a different feeling.",
          "keywords": [
            "rejoiced",
            "happy"
          ],
          "answerFormat": "Single word from paragraph 4",
          "tip": "Look for a word that describes a strong feeling of happiness when they found Sparkle.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Look for a word that means felt very happy.",
            "Identify the single word that matches the meaning."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The boys searched for Sparkle around the neighbourhood.",
          "Samy and Peter found a puppy in the park.",
          "Peter and Samy helped Meng Wee with his wound."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Samy spotted a puppy",
          "evidenceParagraph": 1,
          "trap": "Putting the wound-cleaning before the neighbourhood search.",
          "trapExplanation": "The boys first searched the neighbourhood, then met Meng Wee and helped him, so the search comes before the helping.",
          "keywords": [
            "spotted",
            "searched",
            "cleaned"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event.",
          "tip": "Use the paragraph order to help you sequence the events correctly.",
          "steps": [
            "Read through the passage from beginning to end.",
            "Match each event to the paragraph it appears in.",
            "Number the events according to their paragraph order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements and write True or False.",
        "statements": [
          "Peter was the one who noticed that Sparkle was missing.",
          "Sparkle was found hiding under a bench nearby."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "Peter noticed that Sparkle was missing",
          "evidenceParagraph": 2,
          "trap": "Saying the second statement is True because a bench is mentioned in the passage.",
          "trapExplanation": "The bench was used to help Meng Wee, not where Sparkle was found. Sparkle was found in an empty house.",
          "keywords": [
            "Peter",
            "noticed",
            "empty house"
          ],
          "answerFormat": "Write True or False for each statement.",
          "tip": "Check each statement carefully against the passage - a bench is mentioned but for a different reason.",
          "steps": [
            "Find paragraph 2 to check who noticed Sparkle was missing.",
            "Find paragraph 4 to check where Sparkle was found.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "The boys stopped searching for Sparkle to help Meng Wee. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "Peter and Samy immediately helped the boy up to a bench nearby. They cleaned his wound and put a plaster on it.",
          "The boys stopped to help Meng Wee because he was crying in pain, cleaning his wound before continuing to look for Sparkle."
        ],
        "solution": {
          "evidence": "Peter and Samy immediately helped the boy up to a bench nearby",
          "evidenceParagraph": 3,
          "trap": "False, because they only cared about finding Sparkle.",
          "trapExplanation": "The passage clearly shows the boys paused their search to help Meng Wee, showing their kindness.",
          "keywords": [
            "immediately",
            "helped",
            "wound"
          ],
          "answerFormat": "Write True or False and a reason using evidence from the passage.",
          "tip": "Look at paragraph 3 for what the boys did when they saw Meng Wee.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Check if the boys stopped to help Meng Wee.",
            "Write True and quote or paraphrase the supporting evidence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q29_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the boys heave a sigh of relief when they spoke to Meng Wee?",
        "answer": "The boys heaved a sigh of relief because Meng Wee told them that he had seen their puppy running into an empty house, so they knew where to find Sparkle.",
        "solution": {
          "evidence": "I saw a puppy running into that empty house",
          "evidenceParagraph": 4,
          "trap": "They were relieved because Meng Wee was feeling better.",
          "trapExplanation": "The sigh of relief was because they finally had news of where Sparkle was, not because Meng Wee recovered.",
          "keywords": [
            "relief",
            "puppy",
            "empty house"
          ],
          "answerFormat": "Write a complete sentence beginning with 'The boys heaved a sigh of relief because...'",
          "tip": "Look at what Meng Wee told the boys that made them feel relieved.",
          "steps": [
            "Find paragraph 4 where the boys heave a sigh of relief.",
            "Identify what Meng Wee said just before that reaction.",
            "Write a complete sentence explaining the cause of their relief."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "elise and mei lin were neighbours and attended the same school. they were good f": {
    "id": "eoy_acsprimary_p2b_2023_q40",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q30_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Elise and Mei Lin took part in a treasure hunt for the ______ at the school camp.",
        "answer": "first time",
        "acceptableAnswers": [
          "first time ever",
          "very first time"
        ],
        "solution": {
          "evidence": "took part in a treasure hunt for the first time",
          "evidenceParagraph": 1,
          "trap": "second time",
          "trapExplanation": "The passage clearly states it was their first time, not second.",
          "keywords": [
            "treasure hunt",
            "first time"
          ],
          "answerFormat": "2-word phrase",
          "tip": "Look for the exact phrase describing when they joined the treasure hunt.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the phrase describing their experience with the treasure hunt.",
            "Copy the answer directly from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why could Elise and Mei Lin not find any treasure?",
        "options": [
          "They lost their map along the way.",
          "They went looking for treasure without having a plan.",
          "They did not know where the camp was held.",
          "They arrived late for the treasure hunt."
        ],
        "answer": 1,
        "solution": {
          "evidence": "went to look for the treasure without having a plan",
          "evidenceParagraph": 2,
          "trap": "They lost their map along the way.",
          "trapExplanation": "Mei Lin complained they did not collect the map, but the main reason they failed was having no plan.",
          "keywords": [
            "plan",
            "treasure"
          ],
          "answerFormat": "Choose one option (A-D)",
          "tip": "Find the sentence in paragraph 2 that explains why they failed.",
          "steps": [
            "Re-read paragraph 2.",
            "Identify the cause-and-effect relationship.",
            "Match it to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "What were Elise and Mei Lin doing instead of listening during the briefing?",
        "abSentence": "They were (A) paying attention ... (B) talking about how to win the hunt.",
        "abChoices": {
          "A": "paying attention to Mrs Tan",
          "B": "talking about how to win the hunt"
        },
        "answer": "B",
        "solution": {
          "evidence": "They were busy talking about how to win the hunt",
          "evidenceParagraph": 2,
          "trap": "A",
          "trapExplanation": "The passage says they did NOT pay attention; they were busy talking instead.",
          "keywords": [
            "busy",
            "talking"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Look for what the girls were doing while Mrs Tan was speaking.",
          "steps": [
            "Find the briefing section in paragraph 2.",
            "Identify what Elise and Mei Lin were doing.",
            "Select the option that matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means 'saw something happen'?",
        "answer": "witnessed",
        "acceptableAnswers": [
          "witnessed"
        ],
        "solution": {
          "evidence": "Mrs Tan witnessed them arguing",
          "evidenceParagraph": 3,
          "trap": "advised",
          "trapExplanation": "'Advised' means to give suggestions, not to see something happen.",
          "keywords": [
            "witnessed",
            "saw"
          ],
          "answerFormat": "Single word from paragraph 3",
          "tip": "Think about a word that means 'saw' or 'observed' something happening.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Look for a word that means 'saw something happen'.",
            "Check that it fits the meaning in context."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "Elise and Mei Lin blamed each other for losing.",
          "Mrs Tan conducted a briefing for all the teams.",
          "The girls worked well together for the rest of the camp."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Mrs Tan, their teacher, conducted a briefing for all the participating teams",
          "evidenceParagraph": 2,
          "trap": "Placing the briefing last",
          "trapExplanation": "The briefing happened first, before the hunt and before the argument.",
          "keywords": [
            "briefing",
            "blaming",
            "worked well"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event",
          "tip": "Follow the order of events across all four paragraphs.",
          "steps": [
            "Identify where each event appears in the passage.",
            "Assign numbers based on the order they occur.",
            "Double-check against the passage sequence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "Elise and Mei Lin were neighbours who attended different schools.",
          "Mrs Tan was pleased that the girls had learnt a valuable lesson."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "Elise and Mei Lin were neighbours and attended the same school",
          "evidenceParagraph": 1,
          "trap": "Marking the first statement as True",
          "trapExplanation": "The passage says they attended the SAME school, not different schools.",
          "keywords": [
            "neighbours",
            "same school",
            "valuable lesson"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check each statement against the passage carefully, especially small details.",
          "steps": [
            "Read statement 1 and find the matching sentence in paragraph 1.",
            "Read statement 2 and find the matching sentence in paragraph 4.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Elise and Mei Lin won the treasure hunt. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "They did not win the treasure hunt because they went without a plan and did not work together as a team.",
          "The passage says even though they did not win the treasure hunt, they learnt that working together was more important than winning."
        ],
        "solution": {
          "evidence": "Even though they did not win the treasure hunt",
          "evidenceParagraph": 4,
          "trap": "True",
          "trapExplanation": "The passage clearly states they did NOT win the treasure hunt.",
          "keywords": [
            "did not win",
            "treasure hunt"
          ],
          "answerFormat": "Write True or False and give a reason using the passage",
          "tip": "Look for the outcome of the treasure hunt in paragraph 4.",
          "steps": [
            "Find the sentence in paragraph 4 about the result of the hunt.",
            "Determine if they won or lost.",
            "Write a reason using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q30_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "What important lesson did Elise and Mei Lin learn from the treasure hunt?",
        "answer": "Elise and Mei Lin learnt that working together as a team was more important than winning.",
        "solution": {
          "evidence": "working together as a team was more important than winning",
          "evidenceParagraph": 4,
          "trap": "They learnt that they should always listen to their teacher.",
          "trapExplanation": "While listening to Mrs Tan is implied, the lesson stated in the passage is about teamwork being more important than winning.",
          "keywords": [
            "working together",
            "team",
            "winning"
          ],
          "answerFormat": "Write a complete sentence starting with 'Elise and Mei Lin learnt that...'",
          "tip": "Find the sentence in paragraph 4 that directly states the lesson they learnt.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Identify the sentence that explains the lesson.",
            "Write your answer as a complete sentence in your own words or close to the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "ring! the alarm clock went off, waking julia up. she got out of bed to brush her": {
    "id": "acsp_sa2_2022_F_comp1",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q31_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Julia's mother was not at home because she was at the supermarket ______.",
        "answer": "shopping for groceries",
        "acceptableAnswers": [
          "buying groceries",
          "shopping for food"
        ],
        "solution": {
          "evidence": "her mother would be at the supermarket shopping for groceries",
          "evidenceParagraph": 1,
          "trap": "cooking food",
          "trapExplanation": "The passage says she was shopping for groceries, not cooking.",
          "keywords": [
            "supermarket",
            "groceries"
          ],
          "answerFormat": "verb phrase",
          "tip": "Look for what the mother was doing at the supermarket.",
          "steps": [
            "Find where the mother was mentioned.",
            "Read what she was doing there.",
            "Write the action in your own words or copy from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Julia leave the kitchen while cooking?",
        "options": [
          "She wanted to watch television.",
          "She went to answer the telephone.",
          "She heard her mother come home.",
          "She needed to get more water."
        ],
        "answer": 1,
        "solution": {
          "evidence": "the telephone rang. She raced out of the kitchen to answer it",
          "evidenceParagraph": 2,
          "trap": "She heard her mother come home.",
          "trapExplanation": "Her mother only came home in paragraph 4, after the noodles had already burnt.",
          "keywords": [
            "telephone",
            "kitchen"
          ],
          "answerFormat": "one option A-D",
          "tip": "Find the reason Julia left the kitchen in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Look for why Julia left the kitchen.",
            "Match your answer to one of the options."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how Julia moved when she rushed to the telephone?",
        "abSentence": "She (A) walked ... (B) raced out of the kitchen to answer it.",
        "abChoices": {
          "A": "walked",
          "B": "raced"
        },
        "answer": "B",
        "solution": {
          "evidence": "She raced out of the kitchen to answer it",
          "evidenceParagraph": 2,
          "trap": "walked",
          "trapExplanation": "'Walked' describes how Julia moved into the kitchen in paragraph 1, not how she rushed to the phone.",
          "keywords": [
            "raced",
            "quickly"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for the word that shows Julia moved very fast.",
          "steps": [
            "Reread paragraph 2.",
            "Find the word that shows fast movement.",
            "Choose the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means said sorry?",
        "answer": "apologised",
        "acceptableAnswers": [
          "apologised"
        ],
        "solution": {
          "evidence": "Julia apologised profusely to her mother",
          "evidenceParagraph": 4,
          "trap": "promised",
          "trapExplanation": "'Promised' means to make a pledge, not to say sorry.",
          "keywords": [
            "apologised",
            "sorry"
          ],
          "answerFormat": "one word from paragraph 4",
          "tip": "Look for a word in paragraph 4 that means saying sorry.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the word related to saying sorry.",
            "Write only that one word."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Arrange these events in the correct order as they happened in the story.",
        "sequenceItems": [
          "Julia smelled something burning.",
          "Julia put noodles into a pot of boiling water.",
          "Julia's mother came home and smelled burnt food."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "As she put the noodles into a pot of boiling water",
          "evidenceParagraph": 2,
          "trap": "Putting the noodles last",
          "trapExplanation": "Julia put the noodles in the pot before the phone call and before the burning smell.",
          "keywords": [
            "noodles",
            "burning",
            "mother"
          ],
          "answerFormat": "numbers 1, 2, 3",
          "tip": "Read each paragraph in order to find when each event happened.",
          "steps": [
            "Find when the noodles were put in the pot.",
            "Find when Julia smelled burning.",
            "Find when the mother came home."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Julia and Jane were classmates.",
          "Julia turned off the stove before her mother came home."
        ],
        "answer": [
          "True",
          "True"
        ],
        "solution": {
          "evidence": "It was her classmate, Jane",
          "evidenceParagraph": 2,
          "trap": "False for statement 2",
          "trapExplanation": "The passage clearly states Julia immediately turned off the stove before her mother came home in paragraph 3.",
          "keywords": [
            "classmate",
            "stove"
          ],
          "answerFormat": "True or False for each statement",
          "tip": "Check each statement against the passage carefully.",
          "steps": [
            "Find where Jane is mentioned in the passage.",
            "Find when Julia turned off the stove.",
            "Decide if each statement matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Julia's mother was angry because Julia had left her pot unattended. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "It is true because the passage says she was very angry with Julia for leaving her pot unattended.",
          "It is true because Julia left the kitchen to talk on the phone and forgot about her cooking, causing the noodles to burn."
        ],
        "solution": {
          "evidence": "she was very angry with Julia for leaving her pot unattended",
          "evidenceParagraph": 4,
          "trap": "False, because the noodles burnt",
          "trapExplanation": "The mother was angry specifically because Julia left the pot unattended, not just because the noodles burnt.",
          "keywords": [
            "angry",
            "unattended"
          ],
          "answerFormat": "True or False and one reason",
          "tip": "Find the exact reason the mother was angry in paragraph 4.",
          "steps": [
            "Read paragraph 4.",
            "Find what made the mother angry.",
            "Write your reason using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q31_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why do you think Julia promised to be careful next time?",
        "answer": "Julia promised to be careful next time because she had been careless and left her pot unattended while cooking, which caused the noodles to burn and made her mother very angry.",
        "solution": {
          "evidence": "promised to be careful next time",
          "evidenceParagraph": 4,
          "trap": "Julia promised because she was hungry.",
          "trapExplanation": "Being hungry was why she started cooking, not why she promised to be careful.",
          "keywords": [
            "careful",
            "careless"
          ],
          "answerFormat": "complete sentence starting with 'Julia promised...'",
          "tip": "Think about what Julia did wrong and how it affected others before writing your answer.",
          "steps": [
            "Think about what mistake Julia made.",
            "Think about the consequence of her mistake.",
            "Write a complete sentence explaining why she made the promise."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "alan wore very thick glasses. jack, his classmate, liked to tease him about his ": {
    "id": "acsp_sa2_2022_G_comp2",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q32_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Alan would ______ Jack every time he saw him.",
        "answer": "avoid",
        "acceptableAnswers": [
          "avoid Jack",
          "try to avoid Jack"
        ],
        "solution": {
          "evidence": "Alan would avoid Jack every time he saw him",
          "evidenceParagraph": 1,
          "trap": "ignore",
          "trapExplanation": "The passage uses the word 'avoid', not 'ignore'.",
          "keywords": [
            "avoid",
            "every time"
          ],
          "answerFormat": "One word from the passage",
          "tip": "Look for the exact verb used in the first paragraph to describe what Alan did when he saw Jack.",
          "steps": [
            "Read the first paragraph carefully.",
            "Find the sentence about what Alan did when he saw Jack.",
            "Copy the correct verb from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Mr Tan's class go to the library after school?",
        "options": [
          "To borrow books for their project",
          "To revise for an upcoming Science quiz",
          "To meet their teacher Miss Joy",
          "To work on their Science experiment"
        ],
        "answer": 1,
        "solution": {
          "evidence": "many of them gathered in groups to revise for the quiz at the library",
          "evidenceParagraph": 2,
          "trap": "To borrow books for their project",
          "trapExplanation": "The passage states they went to revise for the quiz, not to borrow books.",
          "keywords": [
            "revise",
            "quiz",
            "library"
          ],
          "answerFormat": "Choose one option A-D",
          "tip": "Look for the reason they gathered at the library in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence explaining why they went to the library.",
            "Match the reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how Jack looked at his notes?",
        "abSentence": "Jack was (A) staring ... (B) reading at his notes, looking very worried.",
        "abChoices": {
          "A": "staring",
          "B": "reading"
        },
        "answer": "A",
        "solution": {
          "evidence": "Jack was staring at his notes, looking very worried",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "The passage says Jack was 'staring', not 'reading', which shows he was worried and struggling.",
          "keywords": [
            "staring",
            "worried"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Find the exact word in paragraph 2 that describes how Jack looked at his notes.",
          "steps": [
            "Read paragraph 2.",
            "Find the sentence about Jack and his notes.",
            "Choose the word that appears in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means to have found the bravery to do something difficult?",
        "answer": "plucked",
        "acceptableAnswers": [
          "plucked"
        ],
        "solution": {
          "evidence": "He plucked up his courage and walked to Jack",
          "evidenceParagraph": 3,
          "trap": "courage",
          "trapExplanation": "'Courage' means bravery itself, but 'plucked' is the verb that means to have gathered or found that bravery.",
          "keywords": [
            "plucked",
            "courage"
          ],
          "answerFormat": "One word from paragraph 3",
          "tip": "The phrase 'plucked up his courage' is an idiom meaning to gather bravery. The key verb is 'plucked'.",
          "steps": [
            "Read paragraph 3.",
            "Look for the idiom about courage.",
            "Identify the verb that means to gather bravery."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "Jack apologised to Alan for his bad behaviour.",
          "Mr Tan announced there would be a Science quiz.",
          "Alan noticed Jack sitting alone at the library."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "Mr Tan, walked into the classroom and announced that there would be a quiz",
          "evidenceParagraph": 2,
          "trap": "Placing Jack's apology before Alan helped him",
          "trapExplanation": "Jack only apologised after Alan helped him do well in the quiz, so the apology comes last.",
          "keywords": [
            "announced",
            "quiz",
            "apologised"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Trace the story in order: the quiz announcement happened first, then Alan saw Jack alone, then Jack apologised at the end.",
          "steps": [
            "Read the passage from start to finish.",
            "Identify when each event took place.",
            "Number them 1, 2, 3 in order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Jack's classmates helped him revise for the Science quiz.",
          "Alan and Jack became good friends at the end of the story."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "No one wanted to help him",
          "evidenceParagraph": 2,
          "trap": "Marking the first statement as True because they were in a group study session",
          "trapExplanation": "Although others gathered in groups, no one wanted to help Jack specifically.",
          "keywords": [
            "no one",
            "good friends"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check each statement carefully against the passage. 'No one wanted to help him' proves the first statement is False.",
          "steps": [
            "Read each statement one at a time.",
            "Find the matching evidence in the passage.",
            "Write True or False based on what the passage says."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Alan decided to help Jack because he wanted to be Jack's friend. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Alan helped Jack because his teacher Miss Joy had told the class to help those in need even if they were unkind to them.",
          "Alan remembered Miss Joy's advice to help those in need even if they were unkind, so he chose to help Jack."
        ],
        "solution": {
          "evidence": "Alan remembered his teacher, Miss Joy, telling the class to help those in need even if they were unkind to them",
          "evidenceParagraph": 3,
          "trap": "True, because they became friends later",
          "trapExplanation": "Alan did not help Jack in order to make a friend. His reason was Miss Joy's advice about helping those in need.",
          "keywords": [
            "Miss Joy",
            "help those in need",
            "unkind"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Do not confuse the outcome (they became friends) with Alan's reason for helping Jack.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find Alan's actual reason for helping Jack in paragraph 3.",
            "Write a full reason using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q32_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How did Jack feel when Alan offered to study with him? Use evidence from the passage to support your answer.",
        "answer": "Jack felt surprised and grateful when Alan offered to study with him, as shown by how he nodded gratefully after being surprised by Alan's offer.",
        "solution": {
          "evidence": "Surprised by Alan's offer, Jack nodded gratefully",
          "evidenceParagraph": 4,
          "trap": "Jack felt happy because he passed the quiz.",
          "trapExplanation": "The question asks how Jack felt when Alan made the offer, not after he passed the quiz.",
          "keywords": [
            "surprised",
            "gratefully",
            "offer"
          ],
          "answerFormat": "Write a complete sentence with a reason",
          "tip": "Use the words 'surprised' and 'grateful' from paragraph 4 to describe Jack's feelings at that moment.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the words that describe how Jack felt when Alan made the offer.",
            "Write a complete sentence that includes both feelings and evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "mr tan was an elderly man who would take a stroll at the beach every morning. on": {
    "id": "ait_eoy2020_G_comp",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q33_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Mr Tan went to the beach every morning to ______.",
        "answer": "take a stroll",
        "acceptableAnswers": [
          "go for a stroll",
          "have a stroll",
          "walk along the beach"
        ],
        "solution": {
          "evidence": "take a stroll at the beach every morning",
          "evidenceParagraph": 1,
          "trap": "watch the starfishes",
          "trapExplanation": "Mr Tan's habit of going to the beach began before he saw the starfishes; he went there to take a stroll.",
          "keywords": [
            "stroll",
            "every morning"
          ],
          "answerFormat": "verb phrase, 3-5 words",
          "tip": "Look for what Mr Tan's regular habit was before the storm happened.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the verb phrase that describes what Mr Tan did each morning.",
            "Write the action in a short phrase."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why were there starfishes on the beach when Mr Tan arrived?",
        "options": [
          "People had thrown them onto the beach.",
          "A storm had washed them up onto the beach.",
          "The starfishes had crawled out of the sea themselves.",
          "Mr Tan had placed them there the day before."
        ],
        "answer": 1,
        "solution": {
          "evidence": "a storm had just passed",
          "evidenceParagraph": 1,
          "trap": "People had thrown them onto the beach.",
          "trapExplanation": "The passage says a storm had just passed and the beach was littered with starfishes, not that people placed them there.",
          "keywords": [
            "storm",
            "washed up"
          ],
          "answerFormat": "one option selected",
          "tip": "Look at paragraph 1 and paragraph 3 together for the full reason.",
          "steps": [
            "Read paragraph 1 to find out what happened before Mr Tan arrived.",
            "Read paragraph 3 to confirm why the starfishes were on the beach.",
            "Select the option that matches both clues."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did the young girl respond when Mr Tan spoke to her?",
        "abSentence": "The girl answered (A) rudely ... (B) politely when Mr Tan asked her a question.",
        "abChoices": {
          "A": "rudely",
          "B": "politely"
        },
        "answer": "B",
        "solution": {
          "evidence": "the girl answered politely",
          "evidenceParagraph": 3,
          "trap": "A",
          "trapExplanation": "The passage clearly states the girl answered politely, not rudely.",
          "keywords": [
            "answered",
            "politely"
          ],
          "answerFormat": "circle A or B",
          "tip": "Find the adverb that describes how the girl replied to Mr Tan's question.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find the word that describes how the girl answered.",
            "Circle the matching option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'from time to time'?",
        "answer": "occasionally",
        "acceptableAnswers": [
          "occasionally"
        ],
        "solution": {
          "evidence": "She would occasionally bend down to pick up a starfish",
          "evidenceParagraph": 2,
          "trap": "curious",
          "trapExplanation": "'Curious' means eager to know something, not 'from time to time'.",
          "keywords": [
            "occasionally",
            "from time to time"
          ],
          "answerFormat": "single word from paragraph 2",
          "tip": "Think of a word that means something does not happen all the time but happens now and then.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Look for a word that means 'from time to time' or 'sometimes'.",
            "Check that the word fits the meaning in the sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened.",
        "sequenceItems": [
          "Mr Tan joined the girl in saving the starfishes.",
          "A storm passed and starfishes were left on the beach.",
          "The girl threw a starfish into the sea and said it made a difference to that one."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "a storm had just passed",
          "evidenceParagraph": 1,
          "trap": "Putting Mr Tan joining the girl as the first event.",
          "trapExplanation": "Mr Tan only joined the girl after he was inspired by what she said, which happened after the storm and the girl's actions.",
          "keywords": [
            "storm",
            "difference",
            "joined"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Follow the story from the beginning to the end to find the correct order.",
          "steps": [
            "Read the passage from paragraph 1 to paragraph 6.",
            "Identify when each event happened in the story.",
            "Number the events 1, 2, 3 in the correct order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Many people at the beach were helping to throw the starfishes back into the sea.",
          "The girl explained that the starfishes could not return to the sea by themselves."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "Many people were observing and poking them",
          "evidenceParagraph": 2,
          "trap": "Marking the first statement as True because many people were at the beach.",
          "trapExplanation": "Many people were observing and poking the starfishes, not helping to throw them back into the sea.",
          "keywords": [
            "observing",
            "poking",
            "by themselves"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Read paragraph 2 and paragraph 3 carefully to check what the people and the girl were doing.",
          "steps": [
            "Read statement 1 and find evidence in paragraph 2.",
            "Read statement 2 and find evidence in paragraph 3.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Mr Tan did not think the girl's actions were useful at first. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "Mr Tan told the girl that there were too many starfishes for her to save and that she would not be able to make much of a difference.",
          "Mr Tan said it was a waste of time because there were too many starfishes for her to save."
        ],
        "solution": {
          "evidence": "Isn't that a waste of time? There are too many starfishes for you to save",
          "evidenceParagraph": 4,
          "trap": "False, because Mr Tan joined the girl in the end.",
          "trapExplanation": "Although Mr Tan joined the girl later, at first he thought the girl's actions were useless as shown by his words in paragraph 4.",
          "keywords": [
            "waste of time",
            "make much of a difference"
          ],
          "answerFormat": "write True or False and give one reason",
          "tip": "Look at what Mr Tan said in paragraph 4 before he changed his mind.",
          "steps": [
            "Read paragraph 4 to find Mr Tan's first reaction.",
            "Identify his words that show he doubted the girl.",
            "Use those words as your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q33_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Mr Tan decide to help the girl save the starfishes?",
        "answer": "Mr Tan decided to help the girl save the starfishes because he was inspired by her words that even saving one starfish made a difference.",
        "solution": {
          "evidence": "Inspired, he joined the girl in saving the starfishes one at a time",
          "evidenceParagraph": 6,
          "trap": "Mr Tan helped because he felt sorry for the starfishes.",
          "trapExplanation": "The passage says Mr Tan was inspired by what the girl said, not that he felt sorry for the starfishes.",
          "keywords": [
            "inspired",
            "difference"
          ],
          "answerFormat": "write a complete sentence starting with 'Mr Tan decided...'",
          "tip": "Look at the last paragraph and think about what changed Mr Tan's mind.",
          "steps": [
            "Read the last paragraph carefully.",
            "Find the word that tells you how Mr Tan felt after hearing the girl.",
            "Write a complete sentence explaining his reason using that word."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "ben was walking through the park on his way home from school when he heard a str": {
    "id": "ait_eoy2020_H_comp2",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q34_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Ben heard a strange sound coming from the bushes when he was walking through the park on his way home from ______.",
        "answer": "school",
        "acceptableAnswers": [
          "school"
        ],
        "solution": {
          "evidence": "on his way home from school",
          "evidenceParagraph": 1,
          "trap": "the park",
          "trapExplanation": "The park is where Ben was walking, not where he was coming from.",
          "keywords": [
            "home",
            "school"
          ],
          "answerFormat": "one word",
          "tip": "Read carefully to find where Ben was coming from, not where he was.",
          "steps": [
            "Read paragraph 1.",
            "Find where Ben was walking from.",
            "Write the place he had come from."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Ben throw a stone at the dog?",
        "options": [
          "He wanted to play with the dog.",
          "He wanted to drive the dog away from him.",
          "He was trying to rescue the dog.",
          "He wanted to tie the dog to a tree."
        ],
        "answer": 1,
        "solution": {
          "evidence": "he threw a stone at the dog to get it away from him",
          "evidenceParagraph": 2,
          "trap": "He wanted to play with the dog.",
          "trapExplanation": "Ben was afraid of dogs and did not want to play with it; he wanted it to leave him alone.",
          "keywords": [
            "threw",
            "stone",
            "away"
          ],
          "answerFormat": "choose one option",
          "tip": "Look for the reason stated in paragraph 2 for why Ben threw the stone.",
          "steps": [
            "Read paragraph 2.",
            "Find the sentence about Ben throwing a stone.",
            "Identify the reason given in that sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that Ben was very worried and did not know what to do?",
        "abSentence": "Ben was (A) Desperate ... (B) Panicking when he shouted for help.",
        "abChoices": {
          "A": "Desperate",
          "B": "Panicking"
        },
        "answer": "A",
        "solution": {
          "evidence": "Desperate, he shouted for help",
          "evidenceParagraph": 3,
          "trap": "Panicking",
          "trapExplanation": "Panicking means being suddenly frightened and rushing, while desperate means having no other options and being in great need - which fits Ben's situation of not knowing what to do.",
          "keywords": [
            "Desperate",
            "shouted",
            "help"
          ],
          "answerFormat": "circle A or B",
          "tip": "Think about which word means having no hope and not knowing what else to do.",
          "steps": [
            "Read paragraph 3.",
            "Find how Ben felt before shouting for help.",
            "Choose the word that means he had no other options."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means to say or announce something officially?",
        "answer": "reported",
        "acceptableAnswers": [
          "reported"
        ],
        "solution": {
          "evidence": "reported it to the Animal Rescue Centre",
          "evidenceParagraph": 4,
          "trap": "rushed",
          "trapExplanation": "'Rushed' means moved quickly, not announcing something officially.",
          "keywords": [
            "reported",
            "Animal Rescue Centre"
          ],
          "answerFormat": "one word from paragraph 4",
          "tip": "Think about a word that means to inform an authority about something.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Look for a word meaning to officially inform someone.",
            "Check that the word is in paragraph 4."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Ben tripped over a rock on the ground.",
          "Ben heard a strange sound from the bushes.",
          "Two passers-by pulled the dog away from Ben."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "he heard a strange sound coming from the bushes",
          "evidenceParagraph": 1,
          "trap": "Placing 'Two passers-by pulled the dog' before Ben tripped.",
          "trapExplanation": "Ben tripped and called for help before the passers-by came to rescue him.",
          "keywords": [
            "heard",
            "tripped",
            "passers-by"
          ],
          "answerFormat": "write 1, 2 or 3 next to each event",
          "tip": "Follow the story from the beginning to find the correct order of events.",
          "steps": [
            "Read through the passage in order.",
            "Find where each event is mentioned.",
            "Number them 1, 2, 3 based on what happened first, second, and third."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Ben was not hurt when he fell over the rock.",
          "The passers-by tied the dog to a tree before reporting it to the Animal Rescue Centre."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "he had fallen down and was in pain",
          "evidenceParagraph": 3,
          "trap": "Marking the first statement as True because Ben managed to escape.",
          "trapExplanation": "The passage clearly states Ben was in pain after falling, so he was hurt.",
          "keywords": [
            "pain",
            "tied",
            "Animal Rescue Centre"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Find evidence in the passage for each statement before deciding.",
          "steps": [
            "Read paragraph 3 for the first statement.",
            "Read paragraph 4 for the second statement.",
            "Check each statement against the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Ben thought that running away from the dog was a good idea. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Ben thought the dog would only get angrier and chase him if he ran.",
          "Ben did not think running was a good idea because he felt the dog would get angrier and chase him."
        ],
        "solution": {
          "evidence": "The dog would only get angrier and chase me if I run",
          "evidenceParagraph": 3,
          "trap": "True, because Ben was panicking and wanted to escape fast.",
          "trapExplanation": "Although Ben wanted to escape, he specifically decided NOT to run because he thought it would make things worse.",
          "keywords": [
            "angrier",
            "chase",
            "run"
          ],
          "answerFormat": "write True or False and give a reason",
          "tip": "Read Ben's thoughts in paragraph 3 carefully to find out what he really believed about running.",
          "steps": [
            "Read paragraph 3 to find Ben's thoughts.",
            "Look for what Ben said about running.",
            "Use his exact reasoning as your explanation."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q34_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Ben throw a stone at the dog? Was it the right thing to do? Explain your answer.",
        "answer": "Ben threw a stone at the dog because he was afraid of it and wanted to chase it away, but it was not the right thing to do as it made the dog angrier and more dangerous.",
        "solution": {
          "evidence": "He had a fear of dogs",
          "evidenceParagraph": 2,
          "trap": "Simply saying 'No, it was not right' without explaining what happened as a result.",
          "trapExplanation": "A complete answer must explain Ben's reason for throwing the stone AND what happened because of it.",
          "keywords": [
            "fear",
            "stone",
            "growled"
          ],
          "answerFormat": "write a complete sentence with a reason",
          "tip": "Use 'because' to link Ben's action to his reason, and explain the consequence of his action.",
          "steps": [
            "Find why Ben threw the stone in paragraph 2.",
            "Find what happened after he threw the stone.",
            "Write a full sentence that includes both the reason and the result."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "felix and his brother damian were walking home on a rainy afternoon. \"meow,\" the": {
    "id": "chs_eoy2022_H_comp1",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q37_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Felix and Damian found the cat hiding behind a ______.",
        "answer": "rubbish bin",
        "acceptableAnswers": [
          "rubbish bin"
        ],
        "solution": {
          "evidence": "from behind a rubbish bin",
          "evidenceParagraph": 1,
          "trap": "basket",
          "trapExplanation": "The basket was found later by Felix for the cat to sleep in, not where the cat was discovered.",
          "keywords": [
            "found",
            "behind"
          ],
          "answerFormat": "2 words",
          "tip": "Look for where the meowing sound came from in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find where the boys heard the sound coming from.",
            "Copy the exact location mentioned."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Felix and Damian decide to take the cat home?",
        "options": [
          "The cat was hungry and crying loudly.",
          "The cat was wet and dirty.",
          "The cat followed them home on its own.",
          "The cat was injured and bleeding."
        ],
        "answer": 1,
        "solution": {
          "evidence": "The cat was drenched and looked filthy so they decided to take it home",
          "evidenceParagraph": 1,
          "trap": "The cat was hungry and crying loudly.",
          "trapExplanation": "The passage does not say the cat was hungry; it says the cat was drenched and filthy.",
          "keywords": [
            "drenched",
            "filthy"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the reason stated directly in paragraph 1.",
          "steps": [
            "Re-read paragraph 1.",
            "Find the sentence that explains why they took the cat home.",
            "Match the meaning of 'drenched' and 'filthy' to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how Damian felt sorry for the cat?",
        "abSentence": "Damian took (A) pity ... on it and (B) suggested keeping it.",
        "abChoices": {
          "A": "pity",
          "B": "suggested"
        },
        "answer": "A",
        "solution": {
          "evidence": "Damian took pity on it",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "'Suggested' means he made a proposal, not that he felt sorry for the cat.",
          "keywords": [
            "pity",
            "felt sorry"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Look for the word that shows an emotion of feeling sorry for someone.",
          "steps": [
            "Read the sentence carefully.",
            "Identify which word relates to feeling sorry.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'to drink eagerly in a lapping way'?",
        "answer": "slurp",
        "acceptableAnswers": [
          "slurp"
        ],
        "solution": {
          "evidence": "Watching the cat slurp up the milk greedily",
          "evidenceParagraph": 2,
          "trap": "greedily",
          "trapExplanation": "'Greedily' describes how much the cat wanted the milk, but 'slurp' specifically describes the action of drinking in a lapping, eager way.",
          "keywords": [
            "drink",
            "lapping"
          ],
          "answerFormat": "One word",
          "tip": "Look for the action word that describes how the cat drank the milk in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the verb that describes how the cat was drinking.",
            "Check that it means drinking eagerly in a lapping way."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Arrange the events in the order they happened in the story.",
        "sequenceItems": [
          "The cat woke up and meowed loudly.",
          "Felix gave the cat a warm bath.",
          "The boys took the cat back to where they had found it."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "Felix was giving the cat a warm bath",
          "evidenceParagraph": 2,
          "trap": "Placing the cat meowing before the bath",
          "trapExplanation": "The bath happened before dinner time, while the cat meowing happened in the evening when Mother returned.",
          "keywords": [
            "order",
            "events"
          ],
          "answerFormat": "Write 1, 2, 3",
          "tip": "Follow the timeline of events from beginning to end of the story.",
          "steps": [
            "Read the whole passage in order.",
            "Find where each event is mentioned.",
            "Number them 1, 2, 3 according to which happened first, second, and third."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Felix placed the cat gently into a basket.",
          "The boys' mother was happy to see the cat."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "he placed the cat gently into it",
          "evidenceParagraph": 2,
          "trap": "Marking both as True",
          "trapExplanation": "Mother frowned and shouted 'No way are you keeping a cat in the house!' showing she was not happy at all.",
          "keywords": [
            "basket",
            "mother",
            "happy"
          ],
          "answerFormat": "Write True or False for each",
          "tip": "Check each statement against the passage carefully before answering.",
          "steps": [
            "Find evidence for the first statement in paragraph 2.",
            "Find evidence for the second statement in paragraphs 4 and 6.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The boys were surprised that their mother did not want them to keep the cat. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The boys did not know that their mother disliked cats.",
          "They had no idea their mother disliked cats, so her reaction surprised them."
        ],
        "solution": {
          "evidence": "The boys did not know that their mother disliked cats",
          "evidenceParagraph": 7,
          "trap": "False",
          "trapExplanation": "The passage clearly states the boys did not know their mother disliked cats, meaning her reaction came as a surprise to them.",
          "keywords": [
            "did not know",
            "disliked"
          ],
          "answerFormat": "Write True or False and give a reason",
          "tip": "Look at the last paragraph for the key reason explaining the boys' reaction.",
          "steps": [
            "Read the last paragraph carefully.",
            "Find the sentence that explains why the boys were caught off guard.",
            "Use this as your reason to support your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q37_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Felix and Damian have to return the cat to where they had found it?",
        "answer": "Felix and Damian had to return the cat because their mother disliked cats and would not allow them to keep it in the house.",
        "solution": {
          "evidence": "No way are you keeping a cat in the house",
          "evidenceParagraph": 6,
          "trap": "Because the cat was noisy and kept meowing.",
          "trapExplanation": "The cat meowing only revealed its presence; the real reason the boys had to return it was that their mother disliked cats and refused to let them keep it.",
          "keywords": [
            "mother",
            "disliked",
            "keep"
          ],
          "answerFormat": "Write a complete sentence starting with 'Felix and Damian...'",
          "tip": "Give the main reason from the passage, not just what triggered Mother's discovery.",
          "steps": [
            "Read paragraphs 6 and 7 carefully.",
            "Identify why Mother refused to let them keep the cat.",
            "Write your answer as a complete sentence with a clear reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "one morning, tom and his older brother jack, were having breakfast. \"we will ret": {
    "id": "eoy_henrypark_p2_2023_q43",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q40_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Tom and Jack's parents said they would return home at ______.",
        "answer": "seven o'clock",
        "acceptableAnswers": [
          "7 o'clock",
          "seven o'clock"
        ],
        "solution": {
          "evidence": "We will return home at seven o'clock",
          "evidenceParagraph": 1,
          "trap": "in the evening",
          "trapExplanation": "The passage gives a specific time, not just a general time of day.",
          "keywords": [
            "return",
            "seven o'clock"
          ],
          "answerFormat": "time of day",
          "tip": "Look for the exact words the parents said about their return time.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence where the parents speak.",
            "Copy the time they mentioned."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Tom and Jack decide to plan a surprise for their parents?",
        "options": [
          "Their parents asked them to prepare a party.",
          "It was their parents' wedding anniversary.",
          "Their parents were tired and needed help.",
          "It was their parents' birthdays."
        ],
        "answer": 1,
        "solution": {
          "evidence": "it is their wedding anniversary today",
          "evidenceParagraph": 2,
          "trap": "Their parents were tired and needed help.",
          "trapExplanation": "The boys planned the surprise because of the anniversary, not because their parents were tired.",
          "keywords": [
            "wedding anniversary",
            "surprise"
          ],
          "answerFormat": "one correct option",
          "tip": "Re-read what Tom said when he pointed to the calendar.",
          "steps": [
            "Find the reason Tom gave for the surprise.",
            "Check the calendar detail in the passage.",
            "Match it to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "What did Jack use to bake the cake?",
        "abSentence": "Jack had baked a fragrant butter cake by referring to (A) a recipe book he bought ... (B) their mother's cookbook",
        "abChoices": {
          "A": "a recipe book he bought",
          "B": "their mother's cookbook"
        },
        "answer": "B",
        "solution": {
          "evidence": "referring to their mother's cookbook",
          "evidenceParagraph": 6,
          "trap": "A",
          "trapExplanation": "Jack used their mother's existing cookbook, not a book he bought himself.",
          "keywords": [
            "referring",
            "cookbook"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for what Jack referred to when baking the cake.",
          "steps": [
            "Find the sentence about Jack baking the cake.",
            "Identify what he referred to.",
            "Choose the matching option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means a pleasant or sweet smell?",
        "answer": "fragrant",
        "acceptableAnswers": [
          "fragrant"
        ],
        "solution": {
          "evidence": "a fragrant butter cake",
          "evidenceParagraph": 5,
          "trap": "butter",
          "trapExplanation": "Butter describes the type of cake, not its smell. Fragrant means having a pleasant smell.",
          "keywords": [
            "fragrant",
            "smell"
          ],
          "answerFormat": "single word from paragraph 5",
          "tip": "Think of a word that describes a nice smell coming from food.",
          "steps": [
            "Read paragraph 5 carefully.",
            "Look for a describing word related to smell.",
            "Check if it matches the meaning of pleasant smell."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened.",
        "sequenceItems": [
          "Tom filled a box with paper cranes.",
          "The boys hid behind the sofa and waited.",
          "Jack and Tom decided to surprise their parents."
        ],
        "answer": [
          2,
          3,
          1
        ],
        "solution": {
          "evidence": "Let's surprise them with a celebration later",
          "evidenceParagraph": 3,
          "trap": "Putting hiding behind the sofa as the first event.",
          "trapExplanation": "The boys first decided to plan the surprise, then completed their tasks, and finally hid behind the sofa.",
          "keywords": [
            "surprise",
            "paper cranes",
            "crouched"
          ],
          "answerFormat": "numbers 1, 2, 3 showing order",
          "tip": "Follow the story from beginning to end to find the correct order.",
          "steps": [
            "Identify when each event happened in the story.",
            "Look for time clues like 'immediately' and 'two hours later'.",
            "Arrange the events from first to last."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements and write True or False.",
        "statements": [
          "Tom learned to fold paper cranes by watching a video on the internet.",
          "Jack baked a chocolate cake for his parents."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "he watched a video on the internet to learn how to fold paper cranes",
          "evidenceParagraph": 5,
          "trap": "Saying both statements are True.",
          "trapExplanation": "Jack baked a butter cake, not a chocolate cake. Only the first statement is true.",
          "keywords": [
            "video",
            "internet",
            "butter cake"
          ],
          "answerFormat": "True or False for each statement",
          "tip": "Check specific details like the type of cake and how Tom learned origami.",
          "steps": [
            "Find the sentence about Tom learning origami.",
            "Find the sentence about the cake Jack baked.",
            "Compare each statement to the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Tom and Jack's parents were pleased with the surprise. Is this statement True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "Their parents' eyes brightened with joy when they saw the cake and the box of paper cranes.",
          "Their parents chuckled and called the boys caring children, then gave them a bear hug."
        ],
        "solution": {
          "evidence": "Their parents' eyes brightened with joy",
          "evidenceParagraph": 8,
          "trap": "False",
          "trapExplanation": "The passage clearly shows the parents were joyful and grateful, hugging the boys and calling them caring children.",
          "keywords": [
            "brightened",
            "joy",
            "bear hug"
          ],
          "answerFormat": "True or False plus one reason sentence",
          "tip": "Look for words that describe how the parents felt and reacted after the surprise.",
          "steps": [
            "Decide if the statement matches the passage.",
            "Find evidence showing the parents' reaction.",
            "Write the reason using a full sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q40_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Tom and Jack want to surprise their parents with a celebration?",
        "answer": "Tom and Jack wanted to surprise their parents because it was their parents' wedding anniversary and they wanted to show that they cared for them.",
        "solution": {
          "evidence": "it is their wedding anniversary today",
          "evidenceParagraph": 2,
          "trap": "Because their parents were tired and stressed.",
          "trapExplanation": "The boys were motivated by the wedding anniversary, not just their parents' tiredness, even though they noticed it.",
          "keywords": [
            "wedding anniversary",
            "surprise",
            "caring"
          ],
          "answerFormat": "complete sentence starting with 'Tom and Jack'",
          "tip": "Use the clue Tom pointed out on the wall calendar to explain the reason fully.",
          "steps": [
            "Find the reason Tom gave for the surprise.",
            "Think about why the boys wanted to celebrate.",
            "Write a complete sentence with a because-clause."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "the log walls of their neighbours' house were burned down to the ground. everyth": {
    "id": "eoy_mahabodhi_p2b_2023_q41",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q41_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The neighbours' house was burned down, leaving only a few ______ sticking out of the ashes.",
        "answer": "metal pots",
        "acceptableAnswers": [
          "few metal pots",
          "metal pots sticking out"
        ],
        "solution": {
          "evidence": "a few metal pots sticking out of the ashes",
          "evidenceParagraph": 1,
          "trap": "wooden furniture",
          "trapExplanation": "The passage states everything inside was gone except for metal pots; no wooden furniture is mentioned as surviving.",
          "keywords": [
            "metal pots",
            "ashes"
          ],
          "answerFormat": "2-word noun phrase",
          "tip": "Look for what was left behind after the fire by finding the word 'except'.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the word 'except' to locate what survived.",
            "Copy the words that describe what remained."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why had the mother been persuading the Jennings to leave?",
        "options": [
          "Their house was too old and falling apart.",
          "There had been too many forest fires.",
          "The Jennings wanted to move to a new town.",
          "Their neighbour's well had dried up."
        ],
        "answer": 1,
        "solution": {
          "evidence": "There have been too many forest fires",
          "evidenceParagraph": 1,
          "trap": "Their house was too old and falling apart.",
          "trapExplanation": "The passage does not mention the house being old; the reason given is too many forest fires.",
          "keywords": [
            "persuading",
            "forest fires"
          ],
          "answerFormat": "one option",
          "tip": "Find the mother's exact words explaining why she wanted the Jennings to leave.",
          "steps": [
            "Find where the mother speaks in paragraph 1.",
            "Read her reason carefully.",
            "Match her words to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word shows that Hunter was worried and upset when he asked his question?",
        "abSentence": "Hunter asked, his lip (A) quivering ... She dropped to her knees and pressed her ears on the (B) ground.",
        "abChoices": {
          "A": "quivering",
          "B": "ground"
        },
        "answer": "A",
        "solution": {
          "evidence": "his lip quivering",
          "evidenceParagraph": 2,
          "trap": "ground",
          "trapExplanation": "'Ground' describes where Jasmine placed her ear to listen; it does not show Hunter's emotional state.",
          "keywords": [
            "quivering",
            "worried"
          ],
          "answerFormat": "circle A or B",
          "tip": "Look for a word that describes a physical sign of fear or worry, not a location.",
          "steps": [
            "Read the question to understand it asks about Hunter's feelings.",
            "Find the word that describes Hunter's body language.",
            "Choose the option that shows he was upset."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means 'cried out suddenly in surprise'?",
        "answer": "exclaimed",
        "acceptableAnswers": [
          "exclaimed"
        ],
        "solution": {
          "evidence": "she exclaimed",
          "evidenceParagraph": 4,
          "trap": "interrupted",
          "trapExplanation": "'Interrupted' appears in paragraph 2 and means to stop something, not to cry out in surprise.",
          "keywords": [
            "exclaimed",
            "surprise"
          ],
          "answerFormat": "one word",
          "tip": "Look for a word that describes how Jasmine spoke after Brody ran away from her.",
          "steps": [
            "Go to paragraph 4.",
            "Look for a word describing how Jasmine spoke.",
            "Check if it matches 'cried out suddenly in surprise'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "Jasmine pressed her ears to the ground to listen.",
          "Brody broke free from Jasmine's grip.",
          "The siblings wondered if the Jennings' cat was in the hole."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "He fought and broke free",
          "evidenceParagraph": 2,
          "trap": "Placing Jasmine pressing her ears first",
          "trapExplanation": "Brody breaking free happened before Jasmine heard the sound and pressed her ear to the ground.",
          "keywords": [
            "sequence",
            "order",
            "events"
          ],
          "answerFormat": "numbers 1, 2, 3",
          "tip": "Read the passage from the beginning and track what happens step by step.",
          "steps": [
            "Read paragraphs 2 to 6 in order.",
            "Find where each event is mentioned.",
            "Number them 1, 2, 3 according to when they happen."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements. Write 'True' or 'False' for each.",
        "statements": [
          "Jasmine was able to feel something when she reached into the hole.",
          "The hole that Brody dug was near the well."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "it was too narrow and deep for her to feel anything",
          "evidenceParagraph": 5,
          "trap": "Marking the first statement as True",
          "trapExplanation": "The passage clearly states the hole was too narrow and deep for Jasmine to feel anything, so she felt nothing.",
          "keywords": [
            "narrow",
            "deep",
            "well"
          ],
          "answerFormat": "True or False",
          "tip": "Find the exact sentences about what Jasmine did and where Brody dug before deciding.",
          "steps": [
            "Find where the hole is described in the passage.",
            "Check paragraph 5 for what Jasmine felt.",
            "Check paragraph 2 for where Brody was digging."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Jasmine's heart sank when she pictured the Jennings' cat in the hole. Is this statement True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "It is true because the passage states 'Her heart sank at the thought' of the Jennings' orange cat being down in the hole.",
          "It is true because Jasmine felt sad and worried when she imagined Kitty trapped in the hole."
        ],
        "solution": {
          "evidence": "Her heart sank at the thought",
          "evidenceParagraph": 6,
          "trap": "Marking it False because Jasmine did not cry",
          "trapExplanation": "'Her heart sank' is a phrase meaning she felt sad and worried; she does not need to cry for this to be true.",
          "keywords": [
            "heart sank",
            "thought",
            "cat"
          ],
          "answerFormat": "True or False with reason",
          "tip": "The phrase 'her heart sank' is an expression meaning she felt very sad or worried.",
          "steps": [
            "Find what happened when Jasmine pictured the cat.",
            "Look for the phrase 'her heart sank'.",
            "Use this as evidence to support your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q41_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How do you know that something was alive in the hole? Use evidence from the passage in your answer.",
        "answer": "We know something was alive in the hole because there was a soft crying sound coming from it, which sounded like a cry for help.",
        "solution": {
          "evidence": "It sounded like a cry for help",
          "evidenceParagraph": 6,
          "trap": "Saying the hole was alive because Brody was digging",
          "trapExplanation": "Brody digging only shows he found the hole; the crying sound from inside the hole is the evidence that something alive was in it.",
          "keywords": [
            "cry for help",
            "sound",
            "alive"
          ],
          "answerFormat": "complete sentence with evidence",
          "tip": "Use the sounds heard from the hole as your evidence and write a full sentence starting with 'We know...' or 'Something was alive because...'",
          "steps": [
            "Find what sounds came from the hole in the passage.",
            "Identify the phrase that suggests something living was inside.",
            "Write a complete sentence using this evidence."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "jack and sam were classmates who enjoyed playing pranks on everyone. one day, du": {
    "id": "eoy_mgs_p2c_2023_q43",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q43_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "During recess, Sam suggested that Jack help him put a ______ on Miss Doover's chair.",
        "answer": "water balloon cushion",
        "acceptableAnswers": [
          "water balloon cushion"
        ],
        "solution": {
          "evidence": "put this water balloon cushion on Miss Doover's chair",
          "evidenceParagraph": 1,
          "trap": "cushion",
          "trapExplanation": "The cushion alone is not specific enough; the key detail is that it was a water balloon cushion.",
          "keywords": [
            "water balloon",
            "cushion"
          ],
          "answerFormat": "3-word noun phrase",
          "tip": "Look for the exact object Sam asked Jack to place on the chair.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find what Sam asked Jack to place on the chair.",
            "Copy the exact noun phrase from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why were Jack and Sam laughing and whispering during Miss Doover's read-aloud?",
        "options": [
          "They found the story 'My Teacher Is An Alien' very funny.",
          "They were talking about the cancelled field trip.",
          "They were whispering about their mischievous plan.",
          "They were laughing at Mr Ho's announcement."
        ],
        "answer": 2,
        "solution": {
          "evidence": "the boys were whispering and laughing about their devious plan",
          "evidenceParagraph": 2,
          "trap": "They found the story 'My Teacher Is An Alien' very funny.",
          "trapExplanation": "Miss Doover assumed they were laughing at the story, but the passage states they were actually laughing about their devious plan.",
          "keywords": [
            "whispering",
            "devious plan"
          ],
          "answerFormat": "one correct option",
          "tip": "Look for what the boys were actually doing, not what Miss Doover assumed.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Notice the phrase 'In fact' which signals the true reason.",
            "Choose the option that matches the passage's explanation."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that Jack was surprised when Mr Ho demanded to know what they found funny?",
        "abSentence": "a (A) startled Jack had to hand over his (B) unflattering drawing of the principal",
        "abChoices": {
          "A": "startled",
          "B": "unflattering"
        },
        "answer": "A",
        "solution": {
          "evidence": "a startled Jack had to hand over his unflattering drawing",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "'Unflattering' describes the drawing, not Jack's reaction to being caught.",
          "keywords": [
            "startled",
            "surprised"
          ],
          "answerFormat": "circle A or B",
          "tip": "Identify which word describes how Jack felt, not how the drawing looked.",
          "steps": [
            "Read the sentence in paragraph 3 with both highlighted words.",
            "Decide which word describes a person's emotion or reaction.",
            "Circle A for 'startled' as it means surprised."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means 'unknown or unexpected reasons'?",
        "answer": "unforeseen",
        "acceptableAnswers": [
          "unforeseen"
        ],
        "solution": {
          "evidence": "cancelled due to unforeseen circumstances",
          "evidenceParagraph": 3,
          "trap": "circumstances",
          "trapExplanation": "'Circumstances' means situations or conditions, not unknown or unexpected reasons.",
          "keywords": [
            "unforeseen",
            "unexpected"
          ],
          "answerFormat": "single word from paragraph 3",
          "tip": "Look for a word near 'circumstances' that describes reasons that were not known beforehand.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find the sentence about the cancelled field trip.",
            "Identify the adjective that means unexpected or not known in advance."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Miss Doover sat down and the water balloon cushion burst.",
          "Mr Ho confiscated Jack's drawing of him.",
          "Sam suggested placing a water balloon cushion on Miss Doover's chair."
        ],
        "answer": [
          3,
          2,
          1
        ],
        "solution": {
          "evidence": "Sam suggested with a glint in his eye, \"Jack, help me put this water balloon cushion on Miss Doover's chair!\"",
          "evidenceParagraph": 1,
          "trap": "Placing Mr Ho's visit before the water balloon bursting",
          "trapExplanation": "Mr Ho's visit and the confiscation of the drawing happened before Miss Doover sat on the cushion in paragraph 4.",
          "keywords": [
            "sequence",
            "order"
          ],
          "answerFormat": "numbers 1, 2, 3 showing order",
          "tip": "Follow the paragraphs in order to track what happened first, second, and third.",
          "steps": [
            "Read through all five paragraphs in order.",
            "Identify where each event is mentioned.",
            "Assign 1 to the earliest event and 3 to the latest."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Miss Doover was reading aloud a book called 'My Teacher Is An Alien' when she scolded Jack and Sam.",
          "When the water balloon burst, the whole class laughed loudly."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "started her lesson with a read-aloud of 'My Teacher Is An Alien'",
          "evidenceParagraph": 2,
          "trap": "True for both statements",
          "trapExplanation": "The passage states 'nobody said a word' after the balloon burst, meaning the class did not laugh loudly.",
          "keywords": [
            "read-aloud",
            "gasped",
            "nobody said a word"
          ],
          "answerFormat": "True or False for each statement",
          "tip": "For the second statement, look at what the class did after the balloon burst in paragraph 4.",
          "steps": [
            "Check statement 1 against paragraph 2.",
            "Check statement 2 against paragraph 4.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Jack used the word 'teamwork' correctly when he told Miss Doover that Sam persuaded him and it was teamwork. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Teamwork means working together towards a common goal, but Jack used it as an excuse to blame Sam, which is not the correct meaning.",
          "Miss Doover told Jack off for misusing the word 'teamwork', which shows Jack did not use it correctly."
        ],
        "solution": {
          "evidence": "Miss Doover told Jack off for misusing the word",
          "evidenceParagraph": 5,
          "trap": "True",
          "trapExplanation": "Jack and Sam did act together, so students may think it counts as teamwork, but Miss Doover corrected Jack for misusing the word.",
          "keywords": [
            "misusing",
            "teamwork"
          ],
          "answerFormat": "True or False with one reason sentence",
          "tip": "Look at what Miss Doover said to Jack at the end of the passage to understand whether Jack used the word correctly.",
          "steps": [
            "Read the last paragraph carefully.",
            "Find Miss Doover's reaction to Jack's use of the word 'teamwork'.",
            "Use that as your reason to support False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q43_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Jack and Sam get into trouble with both Miss Doover and Mr Ho on that day?",
        "answer": "Jack and Sam got into trouble with Miss Doover because they placed a water balloon cushion on her chair and disrupted her lesson, and they got into trouble with Mr Ho because he caught Jack with an unflattering drawing of him.",
        "solution": {
          "evidence": "This behaviour is unacceptable. I'm confiscating the drawing!",
          "evidenceParagraph": 3,
          "trap": "They only got into trouble because of the water balloon.",
          "trapExplanation": "The boys actually got into trouble twice - once with Mr Ho over the drawing and once with Miss Doover over the water balloon cushion.",
          "keywords": [
            "trouble",
            "drawing",
            "water balloon"
          ],
          "answerFormat": "complete sentence explaining both incidents",
          "tip": "Make sure your answer mentions both the incident with Mr Ho and the incident with Miss Doover.",
          "steps": [
            "Identify the two separate incidents involving Jack and Sam.",
            "Link the first incident to Mr Ho and the second to Miss Doover.",
            "Write a complete sentence covering both reasons."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "the venus flytrap is a plant that traps and eats insects. it belongs to a group ": {
    "id": "eoy_nanhua_p2_2023_q35",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q44_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The Venus Flytrap grows best in soil that is ______.",
        "answer": "moist",
        "acceptableAnswers": [
          "wet",
          "moist soil"
        ],
        "solution": {
          "evidence": "It grows best in soil that is moist",
          "evidenceParagraph": 1,
          "trap": "soft",
          "trapExplanation": "The passage says 'moist', not 'soft'. Moist means slightly wet.",
          "keywords": [
            "grows",
            "moist"
          ],
          "answerFormat": "one word describing the soil",
          "tip": "Look for the sentence that describes what kind of soil the Venus Flytrap prefers.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence about what the plant grows best in.",
            "Copy the describing word for the soil."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "What is the scientific name of the Venus Flytrap?",
        "options": [
          "Sundewa muscipula",
          "Dionaea muscipula",
          "Dionaea carolina",
          "Venus muscipula"
        ],
        "answer": 1,
        "solution": {
          "evidence": "The scientific name of the Venus Flytrap is Dionaea muscipula",
          "evidenceParagraph": 1,
          "trap": "Venus muscipula",
          "trapExplanation": "Students may think the scientific name includes 'Venus' from the common name, but the passage clearly states it is 'Dionaea muscipula'.",
          "keywords": [
            "scientific name",
            "Dionaea muscipula"
          ],
          "answerFormat": "two-word Latin name",
          "tip": "Scientific names are usually in italics or stated directly. Find the exact words in paragraph 1.",
          "steps": [
            "Locate the sentence about the scientific name in paragraph 1.",
            "Read all four options carefully.",
            "Match the name exactly as written in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how the two halves of the leaf are joined together?",
        "abSentence": "The halves are (A) hinged together on one side like jaws, and each half has long (B) spikes along its edge.",
        "abChoices": {
          "A": "hinged",
          "B": "spikes"
        },
        "answer": "A",
        "solution": {
          "evidence": "The halves are hinged together on one side like jaws",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "Spikes are found along the edge of each half, but 'hinged' describes how the two halves are joined together.",
          "keywords": [
            "halves",
            "hinged"
          ],
          "answerFormat": "circle A or B",
          "tip": "Read the question again - it asks how the halves are joined, not what is along the edge.",
          "steps": [
            "Read the question to understand what is being asked.",
            "Identify what 'hinged' and 'spikes' refer to in the passage.",
            "Choose the word that describes how the halves are joined."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'flows out slowly'?",
        "answer": "oozes",
        "acceptableAnswers": [
          "oozes"
        ],
        "solution": {
          "evidence": "The leaf oozes out a sticky substance",
          "evidenceParagraph": 2,
          "trap": "attracts",
          "trapExplanation": "'Attracts' means to draw something closer, not to flow out slowly. 'Oozes' means to flow out slowly.",
          "keywords": [
            "oozes",
            "sticky substance"
          ],
          "answerFormat": "one verb from paragraph 2",
          "tip": "Think about what word describes liquid coming out slowly and look for it in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Look for a verb that describes liquid coming out.",
            "Choose the word that means 'flows out slowly'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happen when the Venus Flytrap catches an insect.",
        "sequenceItems": [
          "The leaf releases enzymes to break down the insect.",
          "An insect crawls between the two halves of a leaf.",
          "The leaf snaps shut and the spikes lock the insect in."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "When an insect crawls between the two halves of a leaf, the hairs detect its presence",
          "evidenceParagraph": 3,
          "trap": "Putting the leaf snapping shut before the insect crawls in",
          "trapExplanation": "The insect must crawl in first before the hairs detect it and the leaf snaps shut.",
          "keywords": [
            "crawls",
            "snaps shut",
            "enzymes"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Read paragraph 3 step by step to find the correct order of events.",
          "steps": [
            "Read paragraph 3 carefully from beginning to end.",
            "Identify the first, second, and third things that happen.",
            "Number the events in the correct order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below and write True or False.",
        "statements": [
          "The Venus Flytrap produces small, white flowers.",
          "The process of digesting an insect takes about five days."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "produces small, white flowers",
          "evidenceParagraph": 2,
          "trap": "Marking the second statement as True",
          "trapExplanation": "The passage says the process takes about ten days, not five days.",
          "keywords": [
            "white flowers",
            "ten days"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check both facts carefully against the passage. Numbers are easy to mix up.",
          "steps": [
            "Find the sentence about the flowers in paragraph 2.",
            "Find the sentence about how long the process takes in paragraph 3.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The Venus Flytrap can be found growing wild in many countries around the world. Is this True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The Venus Flytrap grows only in some parts of North and South Carolina, United States, not in many countries.",
          "In the wild, the Venus Flytrap grows only in some parts of North and South Carolina, United States."
        ],
        "solution": {
          "evidence": "the Venus Flytrap grows only in some parts of North and South Carolina, United States",
          "evidenceParagraph": 1,
          "trap": "True",
          "trapExplanation": "Students may assume a well-known plant grows worldwide, but the passage states it grows only in parts of North and South Carolina in the United States.",
          "keywords": [
            "only",
            "North and South Carolina"
          ],
          "answerFormat": "write True or False and give a reason using evidence from the passage",
          "tip": "The word 'only' in the passage is a key clue that limits where the plant grows.",
          "steps": [
            "Read the statement carefully.",
            "Find the sentence in paragraph 1 about where the Venus Flytrap grows.",
            "Use the word 'only' as evidence to explain your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q44_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why does the Venus Flytrap need to trap and digest insects?",
        "answer": "The Venus Flytrap traps and digests insects to obtain nutrients, which it then transports to all parts of the plant.",
        "solution": {
          "evidence": "The leaf absorbs the nutrients for the plants",
          "evidenceParagraph": 3,
          "trap": "To feed itself because it has no roots",
          "trapExplanation": "The plant does have roots, but it gets nutrients by digesting insects, not from the soil alone. The answer should focus on obtaining nutrients.",
          "keywords": [
            "nutrients",
            "absorbs"
          ],
          "answerFormat": "write a complete sentence starting with 'The Venus Flytrap...'",
          "tip": "Look for the reason why the plant absorbs the insect. What does it get from it?",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find what the plant gets from digesting the insect.",
            "Write a complete sentence explaining the purpose of trapping insects."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "there lived a crocodile who always dreamt of having a monkey for dinner. he enjo": {
    "id": "eoy_nanhua_p2_2023_q42",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q45_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The crocodile enjoyed lying on the sun-warmed rocks and imagining how ______ a monkey would taste.",
        "answer": "delicious a monkey would",
        "acceptableAnswers": [
          "delicious",
          "delicious a monkey would taste"
        ],
        "solution": {
          "evidence": "imagining how delicious a monkey would taste",
          "evidenceParagraph": 1,
          "trap": "yummy",
          "trapExplanation": "The word 'yummy' is used to describe the fruits on the island, not the monkey.",
          "keywords": [
            "delicious",
            "imagining"
          ],
          "answerFormat": "One adjective or short phrase",
          "tip": "Look for the exact word used to describe the taste of the monkey in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence about what the crocodile was imagining.",
            "Identify the word that describes how the monkey would taste."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Cody offer to carry the monkey on his back?",
        "options": [
          "He wanted to help the monkey cross the river safely.",
          "He wanted to get the monkey into the water so he could eat it.",
          "He wanted to show the monkey the magical island.",
          "He wanted to be friends with the monkey forever."
        ],
        "answer": 1,
        "solution": {
          "evidence": "He decided to befriend him as he knew this was his chance",
          "evidenceParagraph": 2,
          "trap": "He wanted to show the monkey the magical island.",
          "trapExplanation": "The magical island was just a trick to lure the monkey. Cody's real plan was to eat the monkey, not to take him to any island.",
          "keywords": [
            "chance",
            "eat"
          ],
          "answerFormat": "Choose one option (A-D)",
          "tip": "Think about what Cody's real intention was from the very beginning of the story.",
          "steps": [
            "Re-read paragraph 2 and paragraph 4.",
            "Look for clues about Cody's true plan.",
            "Eliminate options that describe Cody's pretend reason, not his real reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how the monkey thought of a clever plan very quickly?",
        "abSentence": "The (A) quick-thinking monkey said, 'If only I knew, I would have brought my tasty heart along!' showing he was (B) curious about everything.",
        "abChoices": {
          "A": "quick-thinking",
          "B": "curious"
        },
        "answer": "A",
        "solution": {
          "evidence": "The quick-thinking monkey said",
          "evidenceParagraph": 5,
          "trap": "curious",
          "trapExplanation": "'Curious' describes the monkey's feeling at the start when he heard about the island. 'Quick-thinking' describes how the monkey came up with a fast and clever plan to escape.",
          "keywords": [
            "quick-thinking",
            "clever"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Look for the word that means able to think of ideas very fast under pressure.",
          "steps": [
            "Read the question and understand what word is needed.",
            "Find the sentence in the passage where the monkey reacts to the danger.",
            "Identify which word matches the meaning of thinking quickly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 7 means to defeat someone by being more clever?",
        "answer": "outsmarted",
        "acceptableAnswers": [
          "outsmarted"
        ],
        "solution": {
          "evidence": "He knew he had outsmarted the crocodile",
          "evidenceParagraph": 7,
          "trap": "fooled",
          "trapExplanation": "'Fooled' means to trick someone, but 'outsmarted' specifically means to be more clever and beat someone using your wits.",
          "keywords": [
            "outsmarted",
            "clever"
          ],
          "answerFormat": "One word from paragraph 7",
          "tip": "Look for a word that combines the idea of being smarter than someone else.",
          "steps": [
            "Read paragraph 7 carefully.",
            "Look for a word that means to be more clever than another person.",
            "Check that the word is used in the context of the monkey beating the crocodile."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Arrange the events in the order they happened in the story.",
        "sequenceItems": [
          "The monkey tricked Cody by saying his heart was on a tree.",
          "Cody told the monkey about a magical island with yummy fruits.",
          "The monkey climbed back safely onto the tree."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "I know of a magical island with super yummy fruits",
          "evidenceParagraph": 2,
          "trap": "Putting the monkey's trick before Cody's invitation",
          "trapExplanation": "Cody's invitation to the island happened first, before Cody revealed his plan to eat the monkey, and before the monkey came up with his trick.",
          "keywords": [
            "first",
            "then",
            "finally"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event",
          "tip": "Use signal words and re-read the story from the beginning to track the order of events.",
          "steps": [
            "Read all three events carefully.",
            "Go back to the passage and find where each event happens.",
            "Number them in the order they appear in the story."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False.",
        "statements": [
          "The monkey knew how to swim across the river.",
          "Cody learned not to trick others after the story ended."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "I can't swim",
          "evidenceParagraph": 3,
          "trap": "Saying the first statement is True because the monkey jumped onto Cody's back",
          "trapExplanation": "The monkey jumped onto Cody's back because it could NOT swim, not because it could. The passage clearly states the monkey said 'I can't swim'.",
          "keywords": [
            "swim",
            "learned"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Find evidence in the passage for each statement before deciding if it is true or false.",
          "steps": [
            "Read statement 1 and find the part of the passage where the monkey talks about swimming.",
            "Read statement 2 and find the last paragraph.",
            "Write True or False based on what the passage says."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The monkey was able to escape from Cody because he was clever. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The monkey tricked Cody by saying his heart was hanging on a tree in the forest, which made Cody swim back to shore.",
          "The monkey quickly thought of a lie about his heart being on a tree so that Cody would bring him back to land safely."
        ],
        "solution": {
          "evidence": "If only I knew, I would have brought my tasty heart along! It is still hanging on a tree back in the forest",
          "evidenceParagraph": 5,
          "trap": "The monkey escaped because Cody was not strong enough to hold him.",
          "trapExplanation": "There is no mention of Cody being weak. The monkey escaped by using a clever trick, not because of Cody's physical weakness.",
          "keywords": [
            "tricked",
            "clever",
            "heart",
            "forest"
          ],
          "answerFormat": "Write True or False and give one reason using evidence from the passage",
          "tip": "Always support your answer with a reason that comes from the passage.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find the part of the passage that shows the monkey being clever.",
            "Write a complete reason using what happened in the story."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q45_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Cody swim back to the riverbank after the monkey spoke to him?",
        "answer": "Cody swam back to the riverbank because the monkey tricked him by saying his heart was still hanging on a tree in the forest, and Cody wanted to get the tastier heart to eat.",
        "solution": {
          "evidence": "Cody wanted the tastier meal, so he swam back and followed the monkey into the forest",
          "evidenceParagraph": 6,
          "trap": "Cody swam back because he felt sorry for the monkey.",
          "trapExplanation": "Cody did not feel sorry for the monkey. He swam back only because he was greedy and wanted to eat the monkey's heart, which he believed was tastier.",
          "keywords": [
            "tastier",
            "heart",
            "forest",
            "tricked"
          ],
          "answerFormat": "Write a complete sentence starting with 'Cody swam back because...'",
          "tip": "Use 'because' to connect the action to the reason. Make sure your answer includes Cody's greedy motive.",
          "steps": [
            "Read the question and identify what needs to be explained.",
            "Find the sentence in paragraph 6 that explains why Cody swam back.",
            "Write a complete sentence that includes both the trick and Cody's greedy reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "sue lin was alone in her bedroom. she muttered to herself, \"where are you, snowy": {
    "id": "chs-pp2-secH-comprehension",
    "title": "Section H - Comprehension: Sue Lin and Snowy",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q5_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Sue Lin's mother stroked her head and ______ her.",
        "answer": "consoled her",
        "acceptableAnswers": [
          "consoled Sue Lin",
          "comforted her"
        ],
        "solution": {
          "evidence": "stroked her head and consoled her",
          "evidenceParagraph": 1,
          "trap": "hugged her",
          "trapExplanation": "The passage says 'consoled', not 'hugged'. Students may guess a comforting action not stated.",
          "keywords": [
            "consoled",
            "stroked"
          ],
          "answerFormat": "One word from the passage",
          "tip": "Look for the exact verb used after 'stroked her head and'.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find what Sue Lin's mother did after stroking her head.",
            "Copy the exact word used in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "How did Snowy greet Sue Lin when she came home from school every day?",
        "options": [
          "It barked loudly at the door.",
          "It wagged its tail at the door.",
          "It jumped onto Sue Lin's lap.",
          "It ran around the house excitedly."
        ],
        "answer": 1,
        "solution": {
          "evidence": "greet her by wagging its tail",
          "evidenceParagraph": 2,
          "trap": "It barked loudly at the door.",
          "trapExplanation": "The passage does not mention barking. Students may assume dogs bark to greet their owners.",
          "keywords": [
            "greet",
            "wagging its tail"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the exact action Snowy did to greet Sue Lin in paragraph 2.",
          "steps": [
            "Read paragraph 2.",
            "Find the sentence about how Snowy greeted Sue Lin.",
            "Match the action to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Was Sue Lin an only child or did she have siblings?",
        "abSentence": "Being the only child, Sue Lin had (A) no sibling to keep her company, so Snowy was (B) everything to her.",
        "abChoices": {
          "A": "She had no sibling.",
          "B": "Snowy was everything to her."
        },
        "answer": "A",
        "solution": {
          "evidence": "Being the only child, Sue Lin had no sibling to keep her company",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "Option B tells us how important Snowy was, but the question asks about whether Sue Lin had siblings.",
          "keywords": [
            "only child",
            "no sibling"
          ],
          "answerFormat": "Circle A or B",
          "tip": "The question asks about Sue Lin's family situation, so look for the phrase about siblings.",
          "steps": [
            "Read the question carefully.",
            "Find the part of the sentence that tells us about Sue Lin's siblings.",
            "Choose the option that answers the question directly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means that something did not feel right to Sue Lin?",
        "answer": "amiss",
        "acceptableAnswers": [
          "amiss"
        ],
        "solution": {
          "evidence": "She felt that something was amiss",
          "evidenceParagraph": 3,
          "trap": "realised",
          "trapExplanation": "'Realised' means to become aware of something, not that something felt wrong or out of place.",
          "keywords": [
            "amiss",
            "felt"
          ],
          "answerFormat": "One word from paragraph 3",
          "tip": "Look for a word that describes a feeling that something is wrong or out of place.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Look for a word that means something felt wrong.",
            "Check that the word is in paragraph 3."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened.",
        "sequenceItems": [
          "Sue Lin's grandmother left the door open while watering the plants.",
          "The family put up notices about the missing dog.",
          "Snowy would wait at the door for Sue Lin every day after school."
        ],
        "answer": [
          2,
          3,
          1
        ],
        "solution": {
          "evidence": "Every day, Snowy would be waiting at the door for Sue Lin to come home from school",
          "evidenceParagraph": 2,
          "trap": "Putting the notice as the first event",
          "trapExplanation": "The notices were put up after Snowy went missing, so this is the last event in order.",
          "keywords": [
            "every day",
            "missing",
            "grandmother"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Think about what happened before Snowy went missing, then what caused it, then what the family did after.",
          "steps": [
            "Identify which event happened regularly before Snowy went missing.",
            "Find which event caused Snowy to escape.",
            "Find which event happened after Snowy was already missing."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below and write True or False.",
        "statements": [
          "Snowy would sit quietly on Sue Lin's lap when she felt upset.",
          "Sue Lin found out that Snowy had run away by herself without telling anyone."
        ],
        "answer": [
          "True",
          "True"
        ],
        "solution": {
          "evidence": "It would simply sit quietly on her lap",
          "evidenceParagraph": 2,
          "trap": "False for the first statement",
          "trapExplanation": "The passage clearly states Snowy would sit quietly on Sue Lin's lap when she was upset, so the first statement is True.",
          "keywords": [
            "sit quietly",
            "lap",
            "run out"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Read each statement carefully and find the matching sentence in the passage before deciding.",
          "steps": [
            "Find the sentence in paragraph 2 about what Snowy did when Sue Lin was upset.",
            "Find the sentence in paragraph 3 about how Snowy left the house.",
            "Decide if each statement matches the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Snowy was very important to Sue Lin. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "Snowy was everything to Sue Lin because she was an only child and had no sibling to keep her company.",
          "Sue Lin loved her pet dog with all her heart and Snowy was everything to her."
        ],
        "solution": {
          "evidence": "Snowy was everything to her. Sue Lin loved her pet dog with all her heart",
          "evidenceParagraph": 2,
          "trap": "False, because Sue Lin had her mother and grandmother.",
          "trapExplanation": "Although Sue Lin had family members, the passage says Snowy was 'everything' to her as she had no sibling, showing Snowy was extremely important.",
          "keywords": [
            "everything",
            "loved",
            "all her heart"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Look for strong phrases in the passage that show how much Sue Lin valued Snowy.",
          "steps": [
            "Decide if the statement is True or False based on the passage.",
            "Find evidence in paragraph 2 that supports your answer.",
            "Write a complete reason using details from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q5_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Snowy manage to run out of the house?",
        "answer": "Snowy managed to run out of the house because Sue Lin's grandmother had left the door open when she went out to water the plants along the corridor.",
        "solution": {
          "evidence": "her grandmother had left the door open when she went out to water the plants along the corridor",
          "evidenceParagraph": 3,
          "trap": "Snowy ran out because no one was at home.",
          "trapExplanation": "Someone was at home - the grandmother was there, but she accidentally left the door open while watering plants outside.",
          "keywords": [
            "door open",
            "grandmother",
            "water the plants"
          ],
          "answerFormat": "Write a complete sentence beginning with 'Snowy managed to run out of the house because...'",
          "tip": "Use 'because' to connect the cause found in paragraph 3 to your answer.",
          "steps": [
            "Read paragraph 3 to find why Snowy could escape.",
            "Identify who left the door open and what they were doing.",
            "Write a complete sentence with 'because' to explain the reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "long ago, a beautiful nightingale flew into mr wu's garden. it sang so sweetly t": {
    "id": "rgps2024-secA-comprehension1",
    "title": "Section A: Comprehension 1 - The Nightingale",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q18_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The nightingale flew into Mr Wu's garden and sang so sweetly that anyone who heard it would be ______.",
        "answer": "attracted to its singing",
        "acceptableAnswers": [
          "attracted to its singing",
          "drawn to its singing"
        ],
        "solution": {
          "evidence": "attracted to its singing",
          "evidenceParagraph": 1,
          "trap": "happy to hear it",
          "trapExplanation": "The passage uses the specific word 'attracted', not 'happy'.",
          "keywords": [
            "attracted",
            "sweetly"
          ],
          "answerFormat": "3-4 words from the passage",
          "tip": "Look for the exact phrase after 'would be' in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the phrase that tells what happened to anyone who heard the nightingale.",
            "Copy the words after 'would be' as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Ling send her father a toy bird?",
        "options": [
          "She wanted to make her father happy.",
          "She wanted to keep the nightingale for herself.",
          "She wanted to teach her father a lesson.",
          "She wanted to see if he liked toys."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Ling wanted to have the nightingale all to herself",
          "evidenceParagraph": 3,
          "trap": "She wanted to make her father happy.",
          "trapExplanation": "Ling's true reason was selfish - she wanted the nightingale for herself, not simply to please her father.",
          "keywords": [
            "nightingale",
            "herself"
          ],
          "answerFormat": "Choose one option",
          "tip": "Read paragraph 3 to find Ling's real reason for sending the toy bird.",
          "steps": [
            "Read paragraph 3.",
            "Find the sentence that explains why Ling sent the toy bird.",
            "Match the reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how Mr Wu felt about the toy bird?",
        "abSentence": "He was so (A) fascinated ... (B) glad by the toy bird that he forgot all about the nightingale.",
        "abChoices": {
          "A": "fascinated",
          "B": "glad"
        },
        "answer": "A",
        "solution": {
          "evidence": "He was so fascinated by the toy bird",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "'Glad' describes how Ling felt when her plan worked, not how Mr Wu felt about the toy bird.",
          "keywords": [
            "fascinated",
            "toy bird"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Look for the word that describes Mr Wu's feeling towards the toy bird specifically in paragraph 3.",
          "steps": [
            "Read paragraph 3.",
            "Find the sentence about Mr Wu's reaction to the toy bird.",
            "Identify the correct describing word for Mr Wu."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'having a pleasant and tuneful sound'?",
        "answer": "melodious",
        "acceptableAnswers": [
          "melodious"
        ],
        "solution": {
          "evidence": "the nightingale's melodious singing",
          "evidenceParagraph": 2,
          "trap": "sweetly",
          "trapExplanation": "'Sweetly' appears in paragraph 1, not paragraph 2. The question asks specifically about paragraph 2.",
          "keywords": [
            "melodious",
            "paragraph 2"
          ],
          "answerFormat": "One word from paragraph 2",
          "tip": "Look for a describing word in paragraph 2 that tells us about the quality of the nightingale's singing.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Look for an adjective that describes the nightingale's singing.",
            "Check that it means 'pleasant and tuneful'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Mr Wu reprimanded Ling for being selfish.",
          "The nightingale flew into Mr Wu's garden.",
          "Ling hid the nightingale in her room."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "a beautiful nightingale flew into Mr Wu's garden",
          "evidenceParagraph": 1,
          "trap": "Placing 'Ling hid the nightingale' as the first event",
          "trapExplanation": "The nightingale first flew into the garden before any other event took place.",
          "keywords": [
            "sequence",
            "order"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event",
          "tip": "Trace the events paragraph by paragraph to find the correct order.",
          "steps": [
            "Identify where each event appears in the passage.",
            "Assign order 1 to the earliest event.",
            "Check the remaining events for order 2 and 3."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Mr Wu placed the nightingale's cage in the living room so everyone could enjoy its singing.",
          "Mr Wu decided to keep the toy bird and the nightingale."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "placing the cage in the living room for everyone to enjoy the nightingale's singing",
          "evidenceParagraph": 4,
          "trap": "Marking the second statement as True",
          "trapExplanation": "The passage states Mr Wu promised to get rid of the toy bird, so he did not keep both.",
          "keywords": [
            "living room",
            "toy bird"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check paragraph 4 for the first statement and paragraph 5 for the second statement.",
          "steps": [
            "Read statement 1 and find the matching sentence in paragraph 4.",
            "Read statement 2 and check paragraph 5 for what Mr Wu promised.",
            "Write True or False for each."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "'Ling was a selfish person.' Is this statement True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "Ling hid the nightingale in her room so that she could have it all to herself instead of sharing it with everyone.",
          "Ling wanted to have the nightingale all to herself and she hid it in her room, which shows she was selfish."
        ],
        "solution": {
          "evidence": "Ling wanted to have the nightingale all to herself",
          "evidenceParagraph": 3,
          "trap": "False, because she sent her father a toy bird as a gift",
          "trapExplanation": "Sending the toy bird was a trick so she could keep the nightingale for herself, which is a selfish act, not a kind one.",
          "keywords": [
            "selfish",
            "herself"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Use evidence from paragraph 3 to support your reason about Ling's selfish behaviour.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find evidence in paragraph 3 that shows Ling's behaviour.",
            "Write a complete reason using the evidence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q18_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Mr Wu search high and low for the nightingale after some time?",
        "answer": "Mr Wu searched high and low for the nightingale because the toy bird had stopped singing and dancing, and he longed for music.",
        "solution": {
          "evidence": "the toy bird stopped singing and dancing. Mr Wu longed for music",
          "evidenceParagraph": 4,
          "trap": "Because he missed Ling's company",
          "trapExplanation": "The passage says Mr Wu longed for music after the toy bird stopped working, not because he missed Ling.",
          "keywords": [
            "longed",
            "music",
            "stopped"
          ],
          "answerFormat": "Write a complete sentence starting with 'Mr Wu searched...'",
          "tip": "Look at the beginning of paragraph 4 to find the two reasons that explain why Mr Wu went looking for the nightingale.",
          "steps": [
            "Read the first two sentences of paragraph 4.",
            "Identify what happened to the toy bird.",
            "Explain how this led Mr Wu to search for the nightingale."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "long ago, there lived a cunning fox and his good-natured friend, alligator. food": {
    "id": "rgps2025-secB",
    "title": "Section B: Comprehension 2 - Fox and Alligator",
    "instructions": "Read the passage carefully and answer the questions that follow.",
    "marks": 10,
    "questions": [
      {
        "id": "q21_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Fox and Alligator decided to grow their own food because food was often ______.",
        "answer": "scarce",
        "acceptableAnswers": [
          "scarce",
          "not enough",
          "hard to find"
        ],
        "solution": {
          "evidence": "Food was often scarce and they never had enough to eat",
          "evidenceParagraph": 1,
          "trap": "difficult",
          "trapExplanation": "The passage uses the word 'scarce', not 'difficult'. Students must use the exact word from the passage.",
          "keywords": [
            "scarce",
            "enough"
          ],
          "answerFormat": "one word or short phrase",
          "tip": "Look for the sentence that explains why they had a problem with food.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the sentence that describes the problem with food.",
            "Pick the exact word that describes how food was."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "When they first planted corn, what did Alligator receive?",
        "options": [
          "The corn that grew above the ground",
          "The roots that grew under the ground",
          "Both the roots and the corn",
          "The leaves and the sugarcane"
        ],
        "answer": 1,
        "solution": {
          "evidence": "only roots grew under the ground",
          "evidenceParagraph": 2,
          "trap": "The corn that grew above the ground",
          "trapExplanation": "Fox took the parts above the ground, which was the corn. Alligator only got the roots under the ground.",
          "keywords": [
            "roots",
            "under the ground"
          ],
          "answerFormat": "choose one option A-D",
          "tip": "Re-read what Alligator's share was and what actually grew under the ground.",
          "steps": [
            "Find the agreement Fox and Alligator made about sharing the corn.",
            "Check what grew under the ground.",
            "Match Alligator's share to what grew under the ground."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that Alligator agreed to Fox's plan about the corn without hesitation?",
        "abSentence": "Fox agreed (A) readily ... but Alligator was (B) upset when he saw the potatoes under the ground.",
        "abChoices": {
          "A": "readily",
          "B": "upset"
        },
        "answer": "A",
        "solution": {
          "evidence": "Fox agreed readily",
          "evidenceParagraph": 3,
          "trap": "upset",
          "trapExplanation": "'Upset' describes Alligator's feeling, not how quickly or willingly he agreed. 'Readily' means without hesitation.",
          "keywords": [
            "agreed",
            "readily"
          ],
          "answerFormat": "circle A or B",
          "tip": "Think about which word describes agreeing without delay or complaint.",
          "steps": [
            "Read the sentence about Fox agreeing with Alligator's potato plan.",
            "Identify the word that means 'without hesitation'.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means 'to divide into equal parts'?",
        "answer": "split",
        "acceptableAnswers": [
          "split"
        ],
        "solution": {
          "evidence": "Alligator suggested they split it equally",
          "evidenceParagraph": 4,
          "trap": "share",
          "trapExplanation": "'Share' appears in earlier paragraphs but not paragraph 4. The word in paragraph 4 that means to divide equally is 'split'.",
          "keywords": [
            "split",
            "equally"
          ],
          "answerFormat": "one word from paragraph 4",
          "tip": "Look for a word in paragraph 4 that is close in meaning to 'divide into equal parts'.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Look for a word meaning 'to divide into equal parts'.",
            "Check that the word is in paragraph 4."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Alligator suggested splitting the sugarcane harvest equally.",
          "Fox and Alligator planted corn and Fox tricked Alligator.",
          "Alligator was upset to find the potatoes growing beneath the ground."
        ],
        "answer": [
          3,
          1,
          2
        ],
        "solution": {
          "evidence": "First, they planted some corn",
          "evidenceParagraph": 1,
          "trap": "Putting the sugarcane event first",
          "trapExplanation": "The corn planting happened first, followed by the potato harvest, and finally the sugarcane sharing. The story uses 'First', 'Next', and 'Then' as clues.",
          "keywords": [
            "First",
            "Next",
            "Then"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Look for sequence words like 'First', 'Next', and 'Then' in the passage to order the events.",
          "steps": [
            "Identify the sequence words in the passage.",
            "Match each event to its sequence word.",
            "Number the events in the correct order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "Alligator was good-natured and easy to trick.",
          "Fox felt no remorse when he agreed to split the sugarcane equally."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "there lived a cunning fox and his good-natured friend, Alligator",
          "evidenceParagraph": 1,
          "trap": "Saying both statements are True",
          "trapExplanation": "The second statement is False because the passage says 'Feeling sorry, Fox agreed', showing that Fox did feel remorse.",
          "keywords": [
            "good-natured",
            "feeling sorry"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check each statement against the passage carefully, especially the second one about Fox's feelings.",
          "steps": [
            "Re-read the description of Alligator in paragraph 1.",
            "Find the sentence about Fox agreeing to split the sugarcane.",
            "Check whether Fox felt sorry or not before deciding True or False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Fox was a dishonest friend to Alligator. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "It is True because Fox tricked Alligator twice, first by taking the corn above the ground and then by taking the potatoes beneath the ground.",
          "It is True because Fox tricked Alligator when they grew corn and again when they grew potatoes, taking all the food for himself."
        ],
        "solution": {
          "evidence": "the cunning fox laughed and happily ate the corn",
          "evidenceParagraph": 2,
          "trap": "Saying False because Fox eventually agreed to split the sugarcane",
          "trapExplanation": "Although Fox agreed to share the sugarcane at the end, he had already tricked Alligator twice before that, making him dishonest overall.",
          "keywords": [
            "cunning",
            "tricked",
            "laughed"
          ],
          "answerFormat": "write True or False and give one reason",
          "tip": "Look at Fox's actions throughout most of the story, not just the ending.",
          "steps": [
            "Read about how Fox behaved when sharing the corn.",
            "Read about how Fox behaved when sharing the potatoes.",
            "Decide if Fox was dishonest and explain using evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q21_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why were Fox and Alligator able to live happily ever after at the end of the story?",
        "answer": "Fox and Alligator were able to live happily ever after because they shared the sugarcane harvest equally, which meant they always had plenty of food to eat.",
        "solution": {
          "evidence": "Fox and Alligator always had plenty of food to eat and they lived happily ever after",
          "evidenceParagraph": 5,
          "trap": "Because Fox stopped being cunning",
          "trapExplanation": "The passage focuses on the result of fair sharing leading to plenty of food, not on a change in Fox's character.",
          "keywords": [
            "plenty of food",
            "happily ever after",
            "split equally"
          ],
          "answerFormat": "write a complete sentence starting with 'Fox and Alligator...'",
          "tip": "Link the idea of sharing fairly to having enough food to explain the happy ending.",
          "steps": [
            "Read the last two paragraphs.",
            "Find out what changed when they grew sugarcane.",
            "Explain how this change led to them living happily ever after."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "on the island of crete, earth mother had a child called zan. the bees of the for": {
    "id": "ny22wa2-secE",
    "title": "(E) Comprehension - The Story of Zan",
    "instructions": "Read this passage and answer questions 13 to 19.",
    "marks": 10,
    "questions": [
      {
        "id": "q23_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The bees of the forest brought ______ for little Zan.",
        "answer": "honey for little Zan",
        "acceptableAnswers": [
          "honey",
          "brought honey for little Zan"
        ],
        "solution": {
          "evidence": "bees of the forest brought honey for little Zan",
          "evidenceParagraph": 1,
          "trap": "milk",
          "trapExplanation": "Milk was given by the wild goats, not the bees.",
          "keywords": [
            "bees",
            "honey"
          ],
          "answerFormat": "A short noun or noun phrase",
          "tip": "Read carefully to match which animal gave which gift.",
          "steps": [
            "Find the sentence about what the bees brought.",
            "Identify the gift given by the bees.",
            "Write only that gift in the blank."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Zan hide his toys in a secret cave?",
        "options": [
          "He did not want to play with them anymore.",
          "He wanted them to be safe.",
          "He wanted to give them to the bees.",
          "He wanted to share them with the men."
        ],
        "answer": 1,
        "solution": {
          "evidence": "hid them carefully in a secret cave where they would be safe",
          "evidenceParagraph": 2,
          "trap": "He did not want to play with them anymore.",
          "trapExplanation": "The passage says he hid them so they would be safe, not because he stopped liking them.",
          "keywords": [
            "hid",
            "safe"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the reason given in the passage for hiding the toys.",
          "steps": [
            "Find the sentence about Zan hiding his toys.",
            "Look for the word that explains why he hid them.",
            "Choose the option that matches that reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "What did the men put on before entering the cave?",
        "abSentence": "They put on (A) armour ... that protected them from (B) the bees and stormed into the cave.",
        "abChoices": {
          "A": "armour",
          "B": "the bees"
        },
        "answer": "A",
        "solution": {
          "evidence": "They put on armour that protected them from the bees",
          "evidenceParagraph": 3,
          "trap": "B",
          "trapExplanation": "The bees were what the armour protected them from, not what the men put on.",
          "keywords": [
            "armour",
            "protected"
          ],
          "answerFormat": "Circle A or B",
          "tip": "The question asks what the men wore, not what they were protected from.",
          "steps": [
            "Read the sentence carefully.",
            "Find what the men put ON their bodies.",
            "Circle the word that names that item."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means 'to walk or move about freely over a wide area'?",
        "answer": "roam",
        "acceptableAnswers": [
          "roam"
        ],
        "solution": {
          "evidence": "goats could roam freely",
          "evidenceParagraph": 2,
          "trap": "freely",
          "trapExplanation": "'Freely' is an adverb describing how the goats move, not the verb meaning to move about.",
          "keywords": [
            "roam",
            "freely"
          ],
          "answerFormat": "One word only",
          "tip": "Look for a verb in paragraph 2 that describes how the goats were allowed to move.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence about the goats.",
            "Identify the verb that means to walk about freely."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Zan turned the three men into birds.",
          "The three men climbed up the mountains to find treasure.",
          "Zan rewarded his animal friends by making laws to protect them."
        ],
        "answer": [
          3,
          2,
          1
        ],
        "solution": {
          "evidence": "Grateful to his animal friends which cared for him, Zan rewarded them",
          "evidenceParagraph": 2,
          "trap": "Putting the men's arrival before Zan rewarding the animals.",
          "trapExplanation": "Zan grew up and rewarded the animals before the three men arrived at the cave.",
          "keywords": [
            "rewarded",
            "climbed",
            "turned"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Use paragraph order to work out which event happened first, second and third.",
          "steps": [
            "Read the passage from the beginning.",
            "Find where each event is mentioned.",
            "Number them according to which paragraph they appear in."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements. Write True or False.",
        "statements": [
          "Zan was born on the island of Crete.",
          "The three men were turned into eagles, parrots and mynahs."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "On the island of Crete, Earth Mother had a child called Zan",
          "evidenceParagraph": 1,
          "trap": "Marking the second statement as True.",
          "trapExplanation": "The three men were turned into an owl, a parrot and a mynah - not eagles.",
          "keywords": [
            "Crete",
            "owl",
            "parrot",
            "mynah"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check every detail carefully. One wrong word makes a statement false.",
          "steps": [
            "Check statement 1 against paragraph 1.",
            "Check statement 2 against paragraph 5.",
            "Write True or False for each one."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The three men entered the cave because they wanted to steal Zan's toys. Is this True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The passage says Zan told the men 'You have come here to rob and kill', which means they entered to steal.",
          "Zan said the men came to rob, showing they wanted to take the treasure from the cave."
        ],
        "solution": {
          "evidence": "You have come here to rob and kill",
          "evidenceParagraph": 4,
          "trap": "False, because the men said there must be treasure inside.",
          "trapExplanation": "Zan's words confirm the men's intention was to rob, so the statement is True.",
          "keywords": [
            "rob",
            "steal"
          ],
          "answerFormat": "Write True or False and give one reason using evidence from the passage",
          "tip": "Use Zan's exact words to explain the men's true intention.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find the sentence in the passage that proves your answer.",
            "Write a complete reason using words from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q23_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Zan make a law for the goats and build beehives for the bees?",
        "answer": "Zan made a law for the goats and built beehives for the bees because he was grateful to his animal friends for caring for him when he was young.",
        "solution": {
          "evidence": "Grateful to his animal friends which cared for him, Zan rewarded them",
          "evidenceParagraph": 2,
          "trap": "Because he liked animals.",
          "trapExplanation": "The passage gives a specific reason - gratitude for being cared for - not just a general love of animals.",
          "keywords": [
            "grateful",
            "rewarded",
            "cared"
          ],
          "answerFormat": "Write a complete sentence starting with 'Zan made a law...' or 'Because...'",
          "tip": "Use the word 'because' and include the reason from the passage in your answer.",
          "steps": [
            "Find the sentence in paragraph 2 that explains why Zan helped the animals.",
            "Identify the key reason word - 'grateful'.",
            "Write a full sentence that includes both what Zan did and why he did it."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "when wilbur the pig was five weeks old, fern's father said it was time to sell i": {
    "id": "acsj_eoy2022_B_comp1",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q26_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "When Wilbur was five weeks old, Fern's father said it was time to ______.",
        "answer": "sell it",
        "acceptableAnswers": [
          "sell the pig",
          "sell Wilbur"
        ],
        "solution": {
          "evidence": "it was time to sell it",
          "evidenceParagraph": 1,
          "trap": "give it away",
          "trapExplanation": "The passage says 'sell it', not give it away for free.",
          "keywords": [
            "sell",
            "time"
          ],
          "answerFormat": "2 words",
          "tip": "Look for what Fern's father decided to do with Wilbur.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find what Fern's father said it was time to do.",
            "Copy the key action from the sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did Fern's father want to sell Wilbur?",
        "options": [
          "Wilbur was sick and needed a new home.",
          "Wilbur's appetite had increased and he was not willing to provide for it any longer.",
          "Wilbur had grown too large for the apple tree.",
          "Fern had asked her father to sell Wilbur."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Wilbur's appetite had increased. It was beginning to eat scraps of food in addition to milk. Fern's father was not willing to provide for it any longer.",
          "evidenceParagraph": 1,
          "trap": "Wilbur was sick",
          "trapExplanation": "The passage does not mention Wilbur being sick. The reason is the increased appetite and cost of feeding.",
          "keywords": [
            "appetite",
            "willing"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for the reasons given in paragraph 1 for selling Wilbur.",
          "steps": [
            "Re-read paragraph 1.",
            "Find the two reasons Fern's father wanted to sell Wilbur.",
            "Match them to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word describes how Uncle Homer felt when he heard how cheap Wilbur cost?",
        "abSentence": "Uncle Homer was (A) concerned ... (B) delighted when he heard how cheap Wilbur cost.",
        "abChoices": {
          "A": "concerned",
          "B": "delighted"
        },
        "answer": "B",
        "solution": {
          "evidence": "he was delighted",
          "evidenceParagraph": 6,
          "trap": "A",
          "trapExplanation": "Uncle Homer was concerned about Wilbur being the smallest, not about the price. He was delighted about the cheap price.",
          "keywords": [
            "delighted",
            "cheap"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Read carefully - Uncle Homer had two reactions. Match each reaction to the correct cause.",
          "steps": [
            "Find the sentence about Uncle Homer's reaction to the price.",
            "Identify the word that describes his feeling about the cheap cost.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means to calm someone down or make them less upset?",
        "answer": "pacify",
        "acceptableAnswers": [
          "pacify"
        ],
        "solution": {
          "evidence": "tried to pacify her",
          "evidenceParagraph": 2,
          "trap": "patted",
          "trapExplanation": "'Patted' describes the action of touching her head gently, not the meaning of calming someone down.",
          "keywords": [
            "pacify",
            "calm"
          ],
          "answerFormat": "One word from paragraph 2",
          "tip": "Look for a word that means to comfort or soothe someone who is upset.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Think about which word means to calm someone down.",
            "Find that word in the paragraph."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Wilbur was taken to live in Uncle Homer's barn.",
          "Fern's father said it was time to sell Wilbur.",
          "Fern's mother suggested calling Uncle Homer."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "it was time to sell it",
          "evidenceParagraph": 1,
          "trap": "Putting the call to Uncle Homer before Fern's father's decision",
          "trapExplanation": "Fern's father first decided to sell Wilbur, then Fern's mother suggested calling Uncle Homer, and finally Wilbur moved to the barn.",
          "keywords": [
            "sell",
            "Uncle Homer",
            "barn"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Follow the order of events paragraph by paragraph to sequence them correctly.",
          "steps": [
            "Read through the passage from the beginning.",
            "Find where each event is mentioned.",
            "Number them in the order they appear."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements and write True or False.",
        "statements": [
          "Fern could visit Wilbur at Uncle Homer's place as often as she liked.",
          "Uncle Homer paid twelve dollars for Wilbur."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "you can walk down the road and visit it as often as you like",
          "evidenceParagraph": 3,
          "trap": "False for the first statement",
          "trapExplanation": "Fern's mother clearly said she could visit as often as she liked. The price was six dollars, not twelve.",
          "keywords": [
            "visit",
            "six dollars"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check each statement against the exact details in the passage before answering.",
          "steps": [
            "Find the part about visiting Wilbur in paragraph 3.",
            "Find the price of Wilbur in paragraph 5.",
            "Compare each statement with the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Uncle Homer agreed to buy Wilbur without any worries. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Uncle Homer was concerned about the fact that Wilbur was the smallest of all its siblings before he agreed to buy the pig.",
          "He was worried that Wilbur was the smallest of its siblings, but eventually agreed to buy it."
        ],
        "solution": {
          "evidence": "he was concerned about the fact that Wilbur was the smallest of all its siblings",
          "evidenceParagraph": 6,
          "trap": "True",
          "trapExplanation": "Although Uncle Homer was delighted by the price, he had a concern about Wilbur being the smallest sibling before agreeing.",
          "keywords": [
            "concerned",
            "smallest"
          ],
          "answerFormat": "Write True or False and give one reason",
          "tip": "Look for both of Uncle Homer's reactions - being delighted and being concerned - before deciding.",
          "steps": [
            "Re-read paragraph 6 carefully.",
            "Notice that Uncle Homer had a worry about Wilbur.",
            "Use that worry as your reason for answering False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q26_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How did Fern feel when Wilbur was taken away to Uncle Homer's barn? Use details from the passage to support your answer.",
        "answer": "Fern felt very sad when Wilbur was taken away to Uncle Homer's barn because her eyes brimmed with tears as she waved goodbye.",
        "solution": {
          "evidence": "Fern's eyes brimmed with tears as she waved goodbye",
          "evidenceParagraph": 7,
          "trap": "Fern felt happy because Wilbur had a new home",
          "trapExplanation": "The passage describes Fern's eyes brimming with tears, which shows sadness, not happiness.",
          "keywords": [
            "tears",
            "waved goodbye"
          ],
          "answerFormat": "Write a complete sentence with a reason",
          "tip": "Use the describing words in the last paragraph to explain Fern's feelings.",
          "steps": [
            "Read the last paragraph carefully.",
            "Find the words that show how Fern felt.",
            "Write a complete sentence explaining her feelings with evidence."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "mr ho lived in a room in chinatown. recently, he had fallen ill and lost his job": {
    "id": "chij_sa2_2022_H_compB",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q36_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Mr Ho owed the landlady two months' rent because he had fallen ill and ______.",
        "answer": "lost his job",
        "acceptableAnswers": [
          "lost his job",
          "had lost his job"
        ],
        "solution": {
          "evidence": "he had fallen ill and lost his job",
          "evidenceParagraph": 1,
          "trap": "could not find money",
          "trapExplanation": "The passage says he lost his job, not that he simply could not find money.",
          "keywords": [
            "fallen ill",
            "lost"
          ],
          "answerFormat": "2-3 words",
          "tip": "Look for the reason stated directly in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find what happened to Mr Ho recently.",
            "Copy the exact cause stated in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the landlady come to Mr Ho's room one day?",
        "options": [
          "To bring him food and medicine",
          "To ask him to repair the flat",
          "To demand that he pay his rent or move out",
          "To listen to him play his recorder"
        ],
        "answer": 2,
        "solution": {
          "evidence": "She demanded that Mr Ho pay what he owed her immediately or he would have to move out",
          "evidenceParagraph": 1,
          "trap": "To listen to him play his recorder",
          "trapExplanation": "The landlady came before she knew about the recorder; her purpose was to collect rent.",
          "keywords": [
            "demanded",
            "pay",
            "move out"
          ],
          "answerFormat": "Choose one option",
          "tip": "Re-read the landlady's purpose in paragraph 1 before selecting your answer.",
          "steps": [
            "Read paragraph 1 again.",
            "Identify why the landlady went to Mr Ho's room.",
            "Match her purpose to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us how the landlady walked towards Mr Ho's room?",
        "abSentence": "The landlady (A) swaggered ... towards Mr Ho's room and (B) screamed at the top of her voice.",
        "abChoices": {
          "A": "swaggered",
          "B": "screamed"
        },
        "answer": "A",
        "solution": {
          "evidence": "the landlady swaggered towards Mr Ho's room",
          "evidenceParagraph": 1,
          "trap": "B",
          "trapExplanation": "'Screamed' describes how she spoke, not how she walked.",
          "keywords": [
            "swaggered",
            "walked"
          ],
          "answerFormat": "Circle A or B",
          "tip": "The question asks about movement, not sound.",
          "steps": [
            "Read the question carefully - it asks how she walked.",
            "Look at both choices in the sentence.",
            "Choose the word that describes her manner of walking."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means easily fooled or too ready to believe something?",
        "answer": "gullible",
        "acceptableAnswers": [
          "gullible"
        ],
        "solution": {
          "evidence": "The gullible landlady believed Mr Ho",
          "evidenceParagraph": 3,
          "trap": "curious",
          "trapExplanation": "'Curious' means wanting to know something; it does not mean easily fooled.",
          "keywords": [
            "gullible",
            "believed"
          ],
          "answerFormat": "One word from paragraph 3",
          "tip": "Think about what word describes someone who believes things too easily.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Look for a word that describes the landlady's character.",
            "Check that the word matches the meaning 'easily fooled'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The landlady played her recorder the whole day and found no money.",
          "Mr Ho explained that the recorder was magic and could grow money.",
          "The landlady came to Mr Ho's room and demanded her rent."
        ],
        "answer": [
          3,
          2,
          1
        ],
        "solution": {
          "evidence": "the landlady swaggered towards Mr Ho's room and screamed at the top of her voice",
          "evidenceParagraph": 1,
          "trap": "Putting the magic recorder explanation first",
          "trapExplanation": "The landlady's demand happened before Mr Ho told her about the recorder.",
          "keywords": [
            "demanded",
            "explained",
            "played"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Follow the story paragraph by paragraph to find the correct order.",
          "steps": [
            "Read the whole passage in order.",
            "Match each event to its paragraph.",
            "Number them 1, 2, 3 according to when they happened."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below and write True or False.",
        "statements": [
          "The landlady waited one full week before playing the recorder.",
          "Mr Ho was secretly happy that he had tricked the landlady."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "she went to Mr Ho's place",
          "evidenceParagraph": 4,
          "trap": "Marking the first statement True",
          "trapExplanation": "The passage says the landlady could not wait and played the recorder the same day, not after a week.",
          "keywords": [
            "impatient",
            "laughing",
            "tricking"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check paragraph 4 carefully for what the landlady actually did.",
          "steps": [
            "Read both statements carefully.",
            "Find the matching evidence in the passage for each.",
            "Decide if each statement matches the passage exactly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Mr Ho warned the landlady to keep the recorder for a week before playing it because he wanted her to get the money quickly. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "Mr Ho tricked the landlady so he could keep the money he owed her. He did not want her to get any money at all.",
          "Mr Ho was tricking the landlady; the recorder was not really magic and could not produce money."
        ],
        "solution": {
          "evidence": "was laughing to himself for tricking the greedy landlady",
          "evidenceParagraph": 4,
          "trap": "True",
          "trapExplanation": "Mr Ho never intended the landlady to get money; the whole story about the magic recorder was a trick so he would not have to pay his debt.",
          "keywords": [
            "tricking",
            "magic",
            "debt"
          ],
          "answerFormat": "Write True or False and one reason",
          "tip": "Think about Mr Ho's real intention - was he being honest or playing a trick?",
          "steps": [
            "Read the statement carefully.",
            "Find evidence in the passage about Mr Ho's true intention.",
            "Use that evidence to write your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q36_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the landlady turn red with embarrassment when she went back to Mr Ho?",
        "answer": "The landlady turned red with embarrassment because she had not obeyed Mr Ho's instructions and had played the recorder straightaway instead of waiting a week, showing that she was impatient and greedy.",
        "solution": {
          "evidence": "admitted she was impatient",
          "evidenceParagraph": 4,
          "trap": "She was embarrassed because she did not get any money.",
          "trapExplanation": "The embarrassment came from admitting she had disobeyed the instructions, not simply from getting no money.",
          "keywords": [
            "embarrassment",
            "impatient",
            "instructions"
          ],
          "answerFormat": "Write a complete sentence beginning with 'The landlady turned red with embarrassment because...'",
          "tip": "Look for two things: what she did wrong and what she had to admit.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find out what the landlady admitted to Mr Ho.",
            "Write a complete sentence explaining the cause of her embarrassment."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "one hot day, gloomy, the big black cloud, was sitting high up in the sky of the ": {
    "id": "rosyth-secH-comprehension",
    "title": "Section H: Comprehension - Gloomy the Big Black Cloud",
    "instructions": "Read the following passage carefully. Then write the answers for questions 26 to 32.",
    "marks": 10,
    "questions": [
      {
        "id": "q22_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Gloomy had grown bigger and fatter because of the ______.",
        "answer": "hot weather",
        "acceptableAnswers": [
          "hot weather"
        ],
        "solution": {
          "evidence": "grown bigger and fatter due to the hot weather",
          "evidenceParagraph": 1,
          "trap": "the dark clouds",
          "trapExplanation": "The dark clouds helped Gloomy rain, but hot weather caused him to grow bigger and fatter.",
          "keywords": [
            "bigger",
            "fatter"
          ],
          "answerFormat": "2 words",
          "tip": "Look for the reason Gloomy grew in size in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the cause of Gloomy growing bigger.",
            "Write the exact reason stated in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why was Gloomy ashamed?",
        "options": [
          "He was too big and filled the whole sky.",
          "He could not rain even though he tried.",
          "He did not want to help the villagers.",
          "He was afraid of Lightning."
        ],
        "answer": 1,
        "solution": {
          "evidence": "he could not rain. He was ashamed and did not want anyone to know",
          "evidenceParagraph": 2,
          "trap": "He was too big and filled the whole sky.",
          "trapExplanation": "His large size was not the reason for his shame. He was ashamed because he could not rain.",
          "keywords": [
            "ashamed",
            "could not rain"
          ],
          "answerFormat": "Choose one option",
          "tip": "Look for what made Gloomy feel ashamed in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the sentence that mentions Gloomy being ashamed.",
            "Match the reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that Wind did not pay attention to Gloomy's request?",
        "abSentence": "Wind did not like to be told what to do so he (A) ignored ... (B) helped Gloomy.",
        "abChoices": {
          "A": "ignored",
          "B": "helped"
        },
        "answer": "A",
        "solution": {
          "evidence": "Wind did not like to be told what to do so he ignored Gloomy",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "Wind did not help Gloomy. He ignored Gloomy because he did not like being told what to do.",
          "keywords": [
            "ignored",
            "Wind"
          ],
          "answerFormat": "Circle A or B",
          "tip": "Look for the word that means Wind paid no attention to Gloomy.",
          "steps": [
            "Read the sentence about Wind in paragraph 2.",
            "Think about what 'ignored' means.",
            "Circle the word that means Wind did not pay attention."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 3 means feeling angry or irritated?",
        "answer": "annoyed",
        "acceptableAnswers": [
          "annoyed"
        ],
        "solution": {
          "evidence": "Feeling annoyed because Wind ignored him",
          "evidenceParagraph": 3,
          "trap": "afraid",
          "trapExplanation": "'Afraid' means scared, not angry or irritated. 'Annoyed' is the correct word meaning irritated.",
          "keywords": [
            "annoyed",
            "feeling"
          ],
          "answerFormat": "One word",
          "tip": "Look for a word in paragraph 3 that describes a feeling similar to being angry or upset.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Look for a word related to feeling angry or irritated.",
            "Check that the word is in paragraph 3."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order that they happened in the story.",
        "sequenceItems": [
          "Lightning flashed his light at Wind.",
          "Gloomy called Wind to blow the dark clouds.",
          "The rain fell after the dark clouds joined Gloomy."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "He called Wind and said, \"Please blow those dark clouds towards me.\"",
          "evidenceParagraph": 2,
          "trap": "Putting Lightning before Gloomy calling Wind",
          "trapExplanation": "Gloomy first called Wind, then asked Lightning to flash at Wind, and finally the rain fell.",
          "keywords": [
            "called Wind",
            "Lightning",
            "rain fell"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Trace the order of events in paragraphs 2 and 3 carefully.",
          "steps": [
            "Read paragraphs 2 and 3 carefully.",
            "Identify what happened first, second and third.",
            "Number the events in the correct order."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the statements below. Write True or False.",
        "statements": [
          "The villagers were waiting for Gloomy to provide water for their farms.",
          "Gloomy disappeared forever at the end of the story."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "The villagers below were waiting patiently for him to provide enough water for their farms",
          "evidenceParagraph": 2,
          "trap": "Marking the second statement as True",
          "trapExplanation": "Gloomy did not disappear forever. He knew he would appear again when the summer sun heats up the sky.",
          "keywords": [
            "waiting",
            "disappeared"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Read paragraph 4 carefully to check whether Gloomy disappeared forever or would return.",
          "steps": [
            "Check the first statement against paragraph 2.",
            "Check the second statement against paragraph 4.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 1,
        "stem": "Wind was afraid of Lightning. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "As Wind was afraid of Lightning, he quickly blew the dark clouds towards Gloomy.",
          "The passage states that Wind was afraid of Lightning, which is why he obeyed and blew the dark clouds towards Gloomy."
        ],
        "solution": {
          "evidence": "As Wind was afraid of Lightning, he quickly blew the dark clouds towards Gloomy",
          "evidenceParagraph": 3,
          "trap": "False",
          "trapExplanation": "The passage clearly states that Wind was afraid of Lightning, which caused him to blow the dark clouds towards Gloomy.",
          "keywords": [
            "afraid",
            "Lightning"
          ],
          "answerFormat": "Write True or False and give a reason",
          "tip": "Find the sentence in paragraph 3 that explains why Wind obeyed after Lightning flashed.",
          "steps": [
            "Read paragraph 3 carefully.",
            "Find the sentence about Wind and Lightning.",
            "Use that sentence as your reason."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q22_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How did Gloomy feel after the rain fell? Why did he feel that way?",
        "answer": "Gloomy felt very happy and satisfied because he had done a good job by providing enough water for the villagers' farms with the help of the dark clouds.",
        "solution": {
          "evidence": "Gloomy felt very happy and satisfied. With the help of the few dark clouds, he knew he had done a good job",
          "evidenceParagraph": 4,
          "trap": "Gloomy felt happy just because it rained.",
          "trapExplanation": "Gloomy felt happy and satisfied specifically because he had done a good job helping the villagers get enough water for farming, not simply because it rained.",
          "keywords": [
            "happy",
            "satisfied",
            "good job"
          ],
          "answerFormat": "Write a complete sentence with how and why",
          "tip": "Look for both Gloomy's feelings and the reason for those feelings in paragraph 4.",
          "steps": [
            "Find how Gloomy felt in paragraph 4.",
            "Find the reason he felt that way.",
            "Write a complete sentence combining both pieces of information."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "ben was perspiring profusely when he walked home from school on a hot day. he ha": {
    "id": "chij_sa2_2022_G_compA",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q35_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Ben was feeling thirsty after he had just finished playing ______.",
        "answer": "basketball",
        "acceptableAnswers": [
          "basketball"
        ],
        "solution": {
          "evidence": "He had just finished playing basketball and was feeling thirsty",
          "evidenceParagraph": 1,
          "trap": "football",
          "trapExplanation": "The passage clearly states basketball, not football.",
          "keywords": [
            "finished",
            "basketball"
          ],
          "answerFormat": "one word sport",
          "tip": "Look for what activity Ben did before coming home.",
          "steps": [
            "Find the sentence about what Ben had just finished doing.",
            "Identify the sport mentioned.",
            "Write the sport as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "What did Ben drink to quench his thirst?",
        "options": [
          "Orange juice",
          "Apple juice",
          "Cold water",
          "Grape juice"
        ],
        "answer": 1,
        "solution": {
          "evidence": "He poured the apple juice into a glass and drank it in big gulps",
          "evidenceParagraph": 1,
          "trap": "Orange juice",
          "trapExplanation": "The passage says apple juice, not orange juice.",
          "keywords": [
            "apple juice",
            "glass"
          ],
          "answerFormat": "choose one option",
          "tip": "Look for the exact type of juice mentioned in the first paragraph.",
          "steps": [
            "Find the part of the passage about Ben's drink.",
            "Read the exact words describing the juice.",
            "Match it to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did Ben move quietly towards Mario so as not to wake him?",
        "abSentence": "He (A) tiptoed towards Mario, turned on the shower and the cold water fell on Mario like (B) rainfall.",
        "abChoices": {
          "A": "tiptoed",
          "B": "rainfall"
        },
        "answer": "A",
        "solution": {
          "evidence": "He tiptoed towards Mario, turned on the shower",
          "evidenceParagraph": 2,
          "trap": "B",
          "trapExplanation": "Rainfall describes how the water fell, not how Ben moved quietly.",
          "keywords": [
            "tiptoed",
            "quietly"
          ],
          "answerFormat": "circle A or B",
          "tip": "The question asks about how Ben moved, not how the water fell.",
          "steps": [
            "Read the question carefully to find what is being asked.",
            "Look at both choices in the sentence.",
            "Choose the word that describes how Ben walked quietly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 1 means to search through something in a hurried and untidy way?",
        "answer": "ransacked",
        "acceptableAnswers": [
          "ransacked"
        ],
        "solution": {
          "evidence": "He ransacked the refrigerator and spotted his favourite fruit juice",
          "evidenceParagraph": 1,
          "trap": "spotted",
          "trapExplanation": "Spotted means to see or notice something, not to search in an untidy way.",
          "keywords": [
            "search",
            "hurried"
          ],
          "answerFormat": "single word from paragraph 1",
          "tip": "Think about the action Ben did to the refrigerator when looking for a drink.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Look for a word that means searching in a messy or hurried way.",
            "Check that the word matches the meaning given."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the passage.",
        "sequenceItems": [
          "Mario woke up and ran out of the bathroom.",
          "Ben poured apple juice into a glass and drank it.",
          "Ben's baby brother woke up and started crying."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "He poured the apple juice into a glass and drank it in big gulps",
          "evidenceParagraph": 1,
          "trap": "Placing Mario waking up as the first event",
          "trapExplanation": "Ben drinking the juice happened in paragraph 1, before the trick on Mario.",
          "keywords": [
            "first",
            "then",
            "after"
          ],
          "answerFormat": "write 1, 2 or 3 next to each event",
          "tip": "Use the order of paragraphs to help you sequence the events correctly.",
          "steps": [
            "Read through the passage from the beginning.",
            "Find where each event is mentioned.",
            "Number them in the order they appear in the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements and write True or False.",
        "statements": [
          "Mario was a person sleeping in the bathtub.",
          "Ben's mother punished him by taking away his electronic game and forbidding him from watching television for a week."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "Mario woke up from his sleep and started barking and howling loudly",
          "evidenceParagraph": 2,
          "trap": "True for the first statement",
          "trapExplanation": "Mario barked and howled, showing Mario is a dog, not a person.",
          "keywords": [
            "barking",
            "howling",
            "electronic game"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Look for clues in the passage that tell you what Mario is.",
          "steps": [
            "Read the first statement and find evidence in the passage about Mario.",
            "Check if Mario barked and howled - these are actions of a dog, not a person.",
            "Read the second statement and check what punishments Ben received."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Ben's trick on Mario caused trouble for the whole family. Is this statement True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The noise woke Ben's baby brother up and he wailed continuously, and Ben's mother was angry and punished Ben.",
          "Mario's loud barking woke up the baby, causing the mother to become angry and punish Ben."
        ],
        "solution": {
          "evidence": "The noise woke Ben's baby brother up and he wailed continuously",
          "evidenceParagraph": 3,
          "trap": "False",
          "trapExplanation": "The trick caused Mario to bark, which woke the baby, which upset the mother - the whole family was affected.",
          "keywords": [
            "noise",
            "wailed",
            "angry",
            "punished"
          ],
          "answerFormat": "write True or False and give one reason",
          "tip": "Think about all the people affected by Ben's prank, not just Mario.",
          "steps": [
            "Decide if the statement is true or false.",
            "Find evidence showing how the trick affected others in the family.",
            "Write a clear reason using details from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q35_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Ben regret his foolish act at the end of the story?",
        "answer": "Ben regretted his foolish act because his trick on Mario caused his baby brother to cry and his mother punished him by taking away his electronic game and forbidding him from watching television for a week.",
        "solution": {
          "evidence": "His mother was so angry that she took away Ben's electronic game",
          "evidenceParagraph": 3,
          "trap": "Because he woke Mario up",
          "trapExplanation": "The regret was caused by the consequences he suffered, not just waking Mario.",
          "keywords": [
            "regretted",
            "punished",
            "electronic game",
            "television"
          ],
          "answerFormat": "write a complete sentence starting with 'Ben regretted...'",
          "tip": "Think about the consequences Ben faced because of his prank.",
          "steps": [
            "Find what happened to Ben as a result of his trick.",
            "Include the punishments his mother gave him in your answer.",
            "Write a complete sentence explaining why he felt regret."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "it was a bright and sunny day. keegan and i arranged to spend the afternoon at h": {
    "id": "chs_eoy2022_I_comp2",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q38_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Keegan's most treasured toy was a model aeroplane that was a gift from his ______.",
        "answer": "uncle who worked as a pilot",
        "acceptableAnswers": [
          "uncle",
          "uncle who was a pilot",
          "his uncle who worked as a pilot"
        ],
        "solution": {
          "evidence": "a gift from his uncle who worked as a pilot",
          "evidenceParagraph": 1,
          "trap": "father",
          "trapExplanation": "The passage says it was from his uncle, not his father.",
          "keywords": [
            "gift",
            "uncle"
          ],
          "answerFormat": "Short phrase describing who gave the aeroplane",
          "tip": "Look for the sentence that says where the aeroplane came from.",
          "steps": [
            "Find the sentence about the model aeroplane.",
            "Look for who gave it to Keegan.",
            "Write the answer in your own words or copy from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the wing of the model aeroplane break?",
        "options": [
          "The narrator dropped the aeroplane on the floor.",
          "The narrator sneezed while holding the aeroplane.",
          "Keegan accidentally knocked the aeroplane over.",
          "The aeroplane fell off the display cabinet."
        ],
        "answer": 1,
        "solution": {
          "evidence": "I sneezed. \"Snap!\" one of the wings of the model aeroplane broke in my hands",
          "evidenceParagraph": 2,
          "trap": "The narrator dropped the aeroplane on the floor.",
          "trapExplanation": "The narrator did not drop it - the wing broke because of a sneeze while still holding it.",
          "keywords": [
            "sneezed",
            "broke"
          ],
          "answerFormat": "Choose the option that matches the cause of the accident.",
          "tip": "Look for the exact moment the wing broke in paragraph 2.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the word that describes what happened just before the snap.",
            "Match that event to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did the narrator feel after the aeroplane broke?",
        "abSentence": "The narrator felt (A) proud ... (B) ashamed as he left Keegan's house with his head hung low.",
        "abChoices": {
          "A": "proud",
          "B": "ashamed"
        },
        "answer": "B",
        "solution": {
          "evidence": "With my head hung low, I rushed out of his house",
          "evidenceParagraph": 3,
          "trap": "A",
          "trapExplanation": "Hanging one's head low shows shame or guilt, not pride.",
          "keywords": [
            "head hung low",
            "rushed"
          ],
          "answerFormat": "Circle A or B",
          "tip": "The phrase 'head hung low' is a clue about how the narrator was feeling.",
          "steps": [
            "Find what the narrator did after the aeroplane broke.",
            "Look at the phrase 'head hung low' - what emotion does it show?",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means 'gathered enough bravery to do something difficult'?",
        "answer": "mustered",
        "acceptableAnswers": [
          "mustered"
        ],
        "solution": {
          "evidence": "I mustered up the courage to approach Keegan",
          "evidenceParagraph": 4,
          "trap": "miserable",
          "trapExplanation": "Miserable means very unhappy, not gathering bravery.",
          "keywords": [
            "mustered",
            "courage"
          ],
          "answerFormat": "One word from paragraph 4",
          "tip": "Look for a word connected to the word 'courage' in paragraph 4.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the sentence that talks about being brave.",
            "Identify the single word that means gathering bravery."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Arrange the events in the order they happened in the passage.",
        "sequenceItems": [
          "The narrator sneezed and broke the wing of the model aeroplane.",
          "The narrator and Keegan fixed the aeroplane together.",
          "The narrator avoided Keegan at school for a few days."
        ],
        "answer": [
          1,
          3,
          2
        ],
        "solution": {
          "evidence": "Just as I was putting it back, I sneezed",
          "evidenceParagraph": 2,
          "trap": "Putting the apology before the avoidance",
          "trapExplanation": "The narrator first avoided Keegan for a few days before approaching him to apologise.",
          "keywords": [
            "sneezed",
            "stayed out",
            "fixed"
          ],
          "answerFormat": "Write 1, 2 or 3 next to each event",
          "tip": "Follow the story from paragraph 2 to the end to find the correct order.",
          "steps": [
            "Find where each event happens in the passage.",
            "Number the paragraphs to track the order.",
            "Write the correct order next to each event."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below and write True or False.",
        "statements": [
          "Keegan cried when he saw that his model aeroplane was broken.",
          "The narrator immediately apologised to Keegan right after the accident."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "tears welled up in his eyes. Soon, tears started to roll down his cheeks",
          "evidenceParagraph": 3,
          "trap": "Saying the second statement is True",
          "trapExplanation": "The narrator ran out of Keegan's house without apologising and only said sorry a few days later.",
          "keywords": [
            "tears",
            "rushed out"
          ],
          "answerFormat": "Write True or False for each statement",
          "tip": "Check both statements carefully against the passage before answering.",
          "steps": [
            "Find the part where Keegan reacts to the broken aeroplane.",
            "Check whether the narrator apologised straight away or later.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The narrator was a good friend to Keegan. True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "The narrator felt sorry and apologised to Keegan for breaking his aeroplane, and even offered to fix it.",
          "The narrator mustered up the courage to say sorry and helped Keegan repair the broken wing."
        ],
        "solution": {
          "evidence": "I offered to fix the broken wing of the damaged aeroplane",
          "evidenceParagraph": 7,
          "trap": "False, because the narrator ran away without saying sorry.",
          "trapExplanation": "Although the narrator ran away at first, he later apologised sincerely and helped fix the aeroplane, showing he was a good friend.",
          "keywords": [
            "offered",
            "fix",
            "apologised"
          ],
          "answerFormat": "Write True or False and give one reason using evidence from the passage.",
          "tip": "Think about the narrator's actions at the end of the story, not just at the start.",
          "steps": [
            "Decide if the narrator showed qualities of a good friend.",
            "Find evidence in the passage to support your answer.",
            "Write your reason in a complete sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q38_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did the narrator stay out of Keegan's way in school for a few days?",
        "answer": "The narrator stayed out of Keegan's way in school because he was worried that Keegan would still be angry with him for breaking the model aeroplane.",
        "solution": {
          "evidence": "I was worried that he would still be angry with me",
          "evidenceParagraph": 4,
          "trap": "The narrator was too busy to see Keegan.",
          "trapExplanation": "The passage clearly states the narrator was worried about Keegan's anger, not that he was busy.",
          "keywords": [
            "worried",
            "angry"
          ],
          "answerFormat": "Write a complete sentence beginning with 'The narrator stayed out of Keegan's way because...'",
          "tip": "Use the word 'because' to connect the action to the reason given in paragraph 4.",
          "steps": [
            "Find paragraph 4 and look for the reason the narrator avoided Keegan.",
            "Identify the key feeling - worried about Keegan's anger.",
            "Write a complete sentence using 'because' to explain the reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "\"leo! where are you?\" jane called in a trembling voice as she scanned her surrou": {
    "id": "eoy_henrypark_p2_2023_q35",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q39_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "Jane left the gate unlocked because she was ______ for school.",
        "answer": "late for school",
        "acceptableAnswers": [
          "rushing out of the house",
          "in a hurry",
          "late"
        ],
        "solution": {
          "evidence": "she was late for school",
          "evidenceParagraph": 1,
          "trap": "tired",
          "trapExplanation": "The passage says she was late for school, not tired.",
          "keywords": [
            "late",
            "rushing"
          ],
          "answerFormat": "short phrase",
          "tip": "Look for the reason Jane was rushing in paragraph 1.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find why Jane was rushing.",
            "Copy the key reason into the blank."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "What did Jane put on her 'Lost Cat' posters?",
        "options": [
          "Her school address and a drawing of Leo",
          "A photograph of Leo and her home telephone number",
          "A photograph of Leo and her email address",
          "Her home address and a drawing of Leo"
        ],
        "answer": 1,
        "solution": {
          "evidence": "a photograph of Leo and her home telephone number on them",
          "evidenceParagraph": 2,
          "trap": "Her home address and a drawing of Leo",
          "trapExplanation": "The passage says photograph, not drawing, and telephone number, not home address.",
          "keywords": [
            "photograph",
            "telephone number"
          ],
          "answerFormat": "choose one option",
          "tip": "Re-read paragraph 2 to find exactly what was printed on the posters.",
          "steps": [
            "Go to paragraph 2.",
            "Find the sentence about what was on the posters.",
            "Match the details to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did Jane feel when she went home after searching for Leo without success?",
        "abSentence": "As Jane dragged herself home (A) wearily ... (B) happily, she wondered where Leo could be.",
        "abChoices": {
          "A": "wearily",
          "B": "happily"
        },
        "answer": "A",
        "solution": {
          "evidence": "Jane dragged herself home wearily",
          "evidenceParagraph": 1,
          "trap": "B",
          "trapExplanation": "Jane did not find Leo, so she was not happy. 'Wearily' shows she was tired and sad.",
          "keywords": [
            "dragged",
            "wearily"
          ],
          "answerFormat": "circle A or B",
          "tip": "Think about how Jane would feel after a failed search.",
          "steps": [
            "Read the last sentence of paragraph 1.",
            "Look at the word that describes how Jane went home.",
            "Choose the word that matches her feeling."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 2 means feeling hopeful and positive about the outcome?",
        "answer": "optimistic",
        "acceptableAnswers": [
          "optimistic"
        ],
        "solution": {
          "evidence": "Feeling optimistic, she returned home",
          "evidenceParagraph": 2,
          "trap": "delighted",
          "trapExplanation": "'Delighted' means very happy and appears in paragraph 4, not paragraph 2.",
          "keywords": [
            "optimistic",
            "hopeful"
          ],
          "answerFormat": "single word from paragraph 2",
          "tip": "Look for a word in paragraph 2 that describes Jane's hopeful feeling after putting up the posters.",
          "steps": [
            "Read paragraph 2 carefully.",
            "Find the word that means hopeful or positive.",
            "Write that single word as your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "Jane pasted posters on lamp posts around her house.",
          "Jane found Leo hiding under some thick bushes.",
          "Jane left the gate unlocked when she rushed to school."
        ],
        "answer": [
          2,
          3,
          1
        ],
        "solution": {
          "evidence": "In her hurry, she had left the gate unlocked",
          "evidenceParagraph": 1,
          "trap": "Putting the poster event first",
          "trapExplanation": "The gate was left unlocked first, then the posters were made, then Leo was found.",
          "keywords": [
            "gate",
            "posters",
            "found"
          ],
          "answerFormat": "write 1, 2, or 3 for each event",
          "tip": "Follow the story from beginning to end to find the correct order.",
          "steps": [
            "Read the whole passage in order.",
            "Identify when each event happened.",
            "Number them 1, 2, 3 accordingly."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False.",
        "statements": [
          "Mr Lim found Leo hiding under some thick bushes in the park.",
          "Jane thanked Mr Lim by visiting him at his home."
        ],
        "answer": [
          "False",
          "True"
        ],
        "solution": {
          "evidence": "Jane sped to the park. Indeed, Leo was hiding under some thick bushes",
          "evidenceParagraph": 3,
          "trap": "True for the first statement",
          "trapExplanation": "It was Jane who found Leo in the park, not Mr Lim. Mr Lim only spotted a cat that looked like Leo and called Jane.",
          "keywords": [
            "spotted",
            "thanked",
            "visit"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "Check carefully who found Leo and what Jane did to thank Mr Lim.",
          "steps": [
            "Re-read paragraphs 3 and 4.",
            "Check who actually found Leo.",
            "Check how Jane thanked Mr Lim."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "Jane was responsible for Leo going missing. Is this statement True or False? Give a reason for your answer.",
        "answer": "True",
        "acceptableAnswers": [
          "It is True because Jane had left the gate unlocked when she was rushing to school, which allowed Leo to escape.",
          "It is True because Jane forgot to lock the gate when she hurried out, so Leo was able to get out."
        ],
        "solution": {
          "evidence": "In her hurry, she had left the gate unlocked",
          "evidenceParagraph": 1,
          "trap": "False, because she did not mean to let Leo out",
          "trapExplanation": "Even though it was unintentional, Jane's action of leaving the gate unlocked directly caused Leo to go missing.",
          "keywords": [
            "gate",
            "unlocked",
            "hurry"
          ],
          "answerFormat": "write True or False and give a reason",
          "tip": "Think about what action of Jane's led to Leo going missing.",
          "steps": [
            "Decide if the statement is True or False.",
            "Find evidence in the passage to support your decision.",
            "Write your reason in a complete sentence."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q39_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Jane tell herself to never forget to close the gates again?",
        "answer": "Jane told herself to never forget to close the gates again because her carelessness in leaving the gate unlocked had caused Leo to go missing, and she did not want the same thing to happen again.",
        "solution": {
          "evidence": "She told herself to never forget to close the gates again",
          "evidenceParagraph": 4,
          "trap": "Because Mr Lim told her to close the gate",
          "trapExplanation": "Mr Lim never told Jane to close the gate. Jane made this reminder to herself after learning from her mistake.",
          "keywords": [
            "never",
            "forget",
            "gates",
            "carelessness"
          ],
          "answerFormat": "write a complete sentence starting with 'Jane told herself...'",
          "tip": "Think about what Jane learnt from losing Leo and why she made that promise to herself.",
          "steps": [
            "Re-read paragraph 4 and think about what happened earlier in the story.",
            "Connect Jane's mistake at the start to her reminder at the end.",
            "Write a complete sentence explaining her reason."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "while scrolling through online articles on my mobile phone, i occasionally glanc": {
    "id": "eoy_mgs_p2c_2023_q35",
    "title": "",
    "instructions": "Read the passage and answer the questions.",
    "marks": 10,
    "questions": [
      {
        "id": "q42_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The narrator was at the hospital ______ while waiting for her turn.",
        "answer": "scrolling through online articles",
        "acceptableAnswers": [
          "reading articles on her phone",
          "scrolling through articles on her phone",
          "browsing the internet on her phone"
        ],
        "solution": {
          "evidence": "scrolling through online articles on my mobile phone",
          "evidenceParagraph": 1,
          "trap": "watching television",
          "trapExplanation": "She only glanced at the television to check her queue number; her main activity was scrolling through articles on her phone.",
          "keywords": [
            "scrolling",
            "online articles"
          ],
          "answerFormat": "Short phrase describing what she was doing",
          "tip": "Look for the action word at the very start of the passage to find what the narrator was doing.",
          "steps": [
            "Read paragraph 1 carefully.",
            "Find the activity the narrator was doing on her mobile phone.",
            "Use the key words 'scrolling' and 'online articles' in your answer."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the narrator groan inwardly each time she looked at the television screen?",
        "options": [
          "She could not find anything to read on her phone.",
          "Her queue number had not appeared on the screen yet.",
          "The television screen was showing the wrong programme.",
          "She was feeling very sick and wanted to go home."
        ],
        "answer": 1,
        "solution": {
          "evidence": "Each time the screen showed other queue numbers instead of mine, I groaned inwardly",
          "evidenceParagraph": 1,
          "trap": "She was feeling very sick and wanted to go home.",
          "trapExplanation": "While she did feel unwell, she groaned because her queue number had not appeared, not simply because she wanted to go home.",
          "keywords": [
            "queue numbers",
            "groaned inwardly"
          ],
          "answerFormat": "Choose the option that matches the reason given in paragraph 1.",
          "tip": "Link the cause (seeing other numbers) to the effect (groaning) stated in the passage.",
          "steps": [
            "Read the sentence with 'groaned inwardly'.",
            "Identify what made her groan.",
            "Match that reason to the correct option."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "How did the narrator feel when she turned around and saw her old teacher?",
        "abSentence": "She felt (A) confused ... (B) eager to see him when she turned around.",
        "abChoices": {
          "A": "confused",
          "B": "eager"
        },
        "answer": "B",
        "solution": {
          "evidence": "I eagerly whipped around to see if it was him",
          "evidenceParagraph": 3,
          "trap": "A",
          "trapExplanation": "It was Mr James who was confused because he could not recognise the narrator, not the narrator herself.",
          "keywords": [
            "eagerly",
            "whipped around"
          ],
          "answerFormat": "Circle A or B based on the narrator's feeling.",
          "tip": "Be careful about who felt confused - check whether it was the narrator or Mr James.",
          "steps": [
            "Read paragraph 3 for the narrator's reaction.",
            "Notice the word 'eagerly' describes the narrator.",
            "Confusion is felt by Mr James, not the narrator."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 4 means 'remembered'?",
        "answer": "recollected",
        "acceptableAnswers": [
          "recollected"
        ],
        "solution": {
          "evidence": "his eyes sparkled as he recollected the fond memories",
          "evidenceParagraph": 4,
          "trap": "recognised",
          "trapExplanation": "'Recognised' means to identify someone, not to remember past events or memories.",
          "keywords": [
            "recollected",
            "fond memories"
          ],
          "answerFormat": "A single word from paragraph 4",
          "tip": "Look for a word near 'memories' that means to bring back or recall past experiences.",
          "steps": [
            "Read paragraph 4 carefully.",
            "Find the word connected to 'memories'.",
            "Check that it means 'remembered'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Arrange the events in the order they happened in the passage.",
        "sequenceItems": [
          "The narrator introduced herself and told Mr James which class she was from.",
          "The narrator heard a familiar phrase spoken by a voice behind her.",
          "The narrator saw her queue number appear on the television screen."
        ],
        "answer": [
          2,
          1,
          3
        ],
        "solution": {
          "evidence": "a voice chided someone behind me",
          "evidenceParagraph": 2,
          "trap": "Placing the queue number appearance before the conversation",
          "trapExplanation": "The narrator only saw her queue number on the screen after she had already spoken with Mr James for a while.",
          "keywords": [
            "familiar phrase",
            "introduced",
            "queue number"
          ],
          "answerFormat": "Write 1, 2, or 3 next to each event to show the order.",
          "tip": "Use the paragraph order to help you sequence the events correctly.",
          "steps": [
            "Read through the passage from start to finish.",
            "Match each event to the paragraph it appears in.",
            "Number the events 1, 2, 3 according to which came first, second, and third."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write True or False.",
        "statements": [
          "The narrator recognised Mr James immediately when she turned around.",
          "Mr James knew who the narrator was as soon as she greeted him."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "I could recognise him almost immediately",
          "evidenceParagraph": 3,
          "trap": "Marking both statements as True",
          "trapExplanation": "While the narrator recognised Mr James almost immediately, Mr James could not recognise the narrator because fifteen years had passed and she was no longer a child.",
          "keywords": [
            "recognise",
            "immediately",
            "confusion"
          ],
          "answerFormat": "Write True or False for each statement.",
          "tip": "Read both statements carefully and check each one against the passage separately.",
          "steps": [
            "Find the part of the passage about recognition.",
            "Check statement 1 against 'I could recognise him almost immediately'.",
            "Check statement 2 against 'Confusion clouded his face as he could not recognise me'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The hospital waiting area was a pleasant place to spend time in. True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "The hospital waiting area reeked of sickness, so it was not a pleasant place to be in.",
          "The narrator said the waiting area reeked of sickness and that she would be sicker the longer she stayed there.",
          "It was not pleasant because the hospital waiting area reeked of sickness."
        ],
        "solution": {
          "evidence": "The hospital waiting area reeked of sickness",
          "evidenceParagraph": 1,
          "trap": "True",
          "trapExplanation": "The word 'reeked' means had a very unpleasant smell, showing it was not a pleasant place at all.",
          "keywords": [
            "reeked",
            "sickness"
          ],
          "answerFormat": "Write False and give a reason using evidence from the passage.",
          "tip": "The word 'reeked' is a strong clue - it means a very bad smell, which makes a place unpleasant.",
          "steps": [
            "Read paragraph 1 for details about the waiting area.",
            "Identify the word 'reeked' and understand it means a bad smell.",
            "Use this as your reason to explain why the statement is False."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q42_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "Why did Mr James not recognise the narrator when she greeted him?",
        "answer": "Mr James did not recognise the narrator because it had been fifteen years since he taught her and she was no longer a child.",
        "solution": {
          "evidence": "It had been fifteen years and I was no longer a child",
          "evidenceParagraph": 4,
          "trap": "Because the narrator had changed her appearance on purpose.",
          "trapExplanation": "The passage does not say she changed her appearance on purpose; the reason given is simply that fifteen years had passed and she had grown up.",
          "keywords": [
            "fifteen years",
            "no longer a child"
          ],
          "answerFormat": "Write a complete sentence beginning with 'Mr James did not recognise the narrator because...'",
          "tip": "Always include both reasons from the passage - the time that had passed and the fact that she had grown up - for full marks.",
          "steps": [
            "Find the sentence in paragraph 4 that explains why Mr James was confused.",
            "Identify the two reasons: fifteen years had passed and she was no longer a child.",
            "Write a complete sentence that includes both reasons clearly."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  },
  "a herd of goats was lost in the forest for two days. they were confused and exha": {
    "id": "nh2023-secG-comprehension1",
    "title": "Section G: Comprehension 1 - The Lost Goats and the Buffalo",
    "instructions": "Read the passage below and answer questions 35 to 40.",
    "marks": 10,
    "questions": [
      {
        "id": "q0_41",
        "questionNo": "41",
        "format": "fill_blank",
        "marks": 1,
        "stem": "The goats had been lost in the forest for ______.",
        "answer": "two days",
        "acceptableAnswers": [
          "two days",
          "2 days"
        ],
        "solution": {
          "evidence": "A herd of goats was lost in the forest for two days",
          "evidenceParagraph": 1,
          "trap": "four days",
          "trapExplanation": "Four days was how long the buffalo had been lost, not the goats.",
          "keywords": [
            "lost",
            "two days"
          ],
          "answerFormat": "number + noun",
          "tip": "Read carefully to distinguish how long the goats were lost from how long the buffalo was lost.",
          "steps": [
            "Find the sentence about the goats being lost.",
            "Look for a number that tells how many days.",
            "Write the number and the word 'days'."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_42",
        "questionNo": "42",
        "format": "mcq",
        "marks": 1,
        "stem": "Why did the goats follow the oldest goat?",
        "options": [
          "He was the biggest goat in the herd.",
          "He was the most experienced amongst them.",
          "He knew a shortcut out of the forest.",
          "He had been lost the longest."
        ],
        "answer": 1,
        "solution": {
          "evidence": "the oldest goat who was the most experienced amongst them",
          "evidenceParagraph": 1,
          "trap": "He was the biggest goat in the herd.",
          "trapExplanation": "The passage does not mention the oldest goat's size, only his experience.",
          "keywords": [
            "oldest goat",
            "experienced"
          ],
          "answerFormat": "one option letter/number",
          "tip": "Look for the reason given in the passage, not a reason that sounds logical but is not stated.",
          "steps": [
            "Find the sentence about following the oldest goat.",
            "Identify the reason given.",
            "Match it to one of the four options."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_43",
        "questionNo": "43",
        "format": "ab_circle",
        "marks": 1,
        "stem": "Which word tells us that the young goat did not want to include the buffalo?",
        "abSentence": "The young goat said they should (A) ignore ... (B) thank the buffalo.",
        "abChoices": {
          "A": "ignore",
          "B": "thank"
        },
        "answer": "A",
        "solution": {
          "evidence": "Let's ignore him",
          "evidenceParagraph": 5,
          "trap": "thank",
          "trapExplanation": "The goats only thanked the buffalo at the end of the story, after he helped them. The young goat wanted to ignore him.",
          "keywords": [
            "ignore",
            "young goat"
          ],
          "answerFormat": "circle A or B",
          "tip": "Focus on what the young goat said, not what happened at the end of the story.",
          "steps": [
            "Find what the young goat said about the buffalo.",
            "Look for the word that means to pay no attention to someone.",
            "Circle the correct letter."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_44",
        "questionNo": "44",
        "format": "fill_word",
        "marks": 1,
        "stem": "Which word in paragraph 5 means unfriendly or aggressive towards someone?",
        "answer": "hostile",
        "acceptableAnswers": [
          "hostile"
        ],
        "solution": {
          "evidence": "they were hostile to him",
          "evidenceParagraph": 5,
          "trap": "rude",
          "trapExplanation": "'Rude' appears in paragraph 7, not paragraph 5. The question asks specifically about paragraph 5.",
          "keywords": [
            "hostile",
            "unfriendly"
          ],
          "answerFormat": "single word",
          "tip": "Read paragraph 5 carefully and look for a word that describes an unfriendly attitude.",
          "steps": [
            "Go to paragraph 5.",
            "Look for a word that describes the goats' behaviour towards the buffalo.",
            "Check that it means unfriendly or aggressive."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_45",
        "questionNo": "45",
        "format": "sequence",
        "marks": 1,
        "stem": "Number the events in the order they happened in the story.",
        "sequenceItems": [
          "The buffalo asked to join the goats.",
          "The goats thanked the buffalo for his help.",
          "The oldest goat scolded the other goats."
        ],
        "answer": [
          1,
          3,
          2
        ],
        "solution": {
          "evidence": "I've been lost in the forest for four days. Can I join in",
          "evidenceParagraph": 4,
          "trap": "Placing the oldest goat's scolding before the buffalo's arrival.",
          "trapExplanation": "The buffalo arrived and asked to join first, then the young goat was rude, and then the oldest goat scolded the others.",
          "keywords": [
            "buffalo joined",
            "scolded",
            "thanked"
          ],
          "answerFormat": "write 1, 2, or 3 next to each event",
          "tip": "Reread the passage from beginning to end and track the order of events carefully.",
          "steps": [
            "Find when the buffalo first appeared and asked to join.",
            "Find when the oldest goat scolded the others.",
            "Find when the goats thanked the buffalo."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_46",
        "questionNo": "46",
        "format": "true_false",
        "marks": 1,
        "stem": "Read the two statements below. Write 'True' or 'False' for each statement.",
        "statements": [
          "The brown goat complained that the animals had not eaten for days.",
          "The buffalo knew the correct routes to take out of the forest."
        ],
        "answer": [
          "True",
          "False"
        ],
        "solution": {
          "evidence": "We have not eaten for days. I'm so thirsty and hungry",
          "evidenceParagraph": 2,
          "trap": "Marking the second statement as True because the buffalo helped them escape.",
          "trapExplanation": "The buffalo helped by pointing out the wrong routes to avoid, not by knowing the correct routes.",
          "keywords": [
            "not eaten",
            "wrong routes"
          ],
          "answerFormat": "write True or False for each statement",
          "tip": "For the second statement, check whether the buffalo knew the right routes or the wrong routes.",
          "steps": [
            "Find the brown goat's complaint in the passage.",
            "Check if the buffalo knew correct routes or routes to avoid.",
            "Write True or False for each statement."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_47",
        "questionNo": "47",
        "format": "tf_reason",
        "marks": 2,
        "stem": "The young goat thought the buffalo could help the herd find their way out of the forest. Is this statement True or False? Give a reason for your answer.",
        "answer": "False",
        "acceptableAnswers": [
          "False. The young goat said the buffalo would not be able to provide any help and told the others to ignore him.",
          "False. The young goat sighed that he did not think the buffalo would be able to provide any help."
        ],
        "solution": {
          "evidence": "I don't think he will be able to provide any help",
          "evidenceParagraph": 5,
          "trap": "True",
          "trapExplanation": "It was the oldest goat, not the young goat, who believed the buffalo could help by pointing out routes to avoid.",
          "keywords": [
            "young goat",
            "no help",
            "ignore"
          ],
          "answerFormat": "write True or False, then give a reason using evidence from the passage",
          "tip": "Do not confuse what the young goat said with what the oldest goat said about the buffalo.",
          "steps": [
            "Find what the young goat said about the buffalo.",
            "Decide if the young goat thought the buffalo was helpful.",
            "Write False and support it with evidence from the passage."
          ]
        },
        "topic": "Comprehension"
      },
      {
        "id": "q0_48",
        "questionNo": "48",
        "format": "open_sentence",
        "marks": 2,
        "stem": "How did the buffalo help the goats find their way out of the forest?",
        "answer": "The buffalo helped the goats by pointing out the wrong routes to avoid, which allowed the animals to find their way out of the forest.",
        "solution": {
          "evidence": "they avoided the wrong routes pointed out by the buffalo",
          "evidenceParagraph": 7,
          "trap": "The buffalo led the goats directly to the exit.",
          "trapExplanation": "The passage does not say the buffalo knew the correct way out. He only knew which routes were wrong from his own wandering experience.",
          "keywords": [
            "wrong routes",
            "avoided",
            "pointed out"
          ],
          "answerFormat": "complete sentence beginning with 'The buffalo...'",
          "tip": "Use the key phrase about avoiding wrong routes in your answer and write a complete sentence.",
          "steps": [
            "Find the sentence in paragraph 7 that explains how the buffalo helped.",
            "Identify the key action - pointing out wrong routes.",
            "Write a complete sentence that answers the How question."
          ]
        },
        "topic": "Comprehension"
      }
    ]
  }
};

export default comprehensionGenerated;
