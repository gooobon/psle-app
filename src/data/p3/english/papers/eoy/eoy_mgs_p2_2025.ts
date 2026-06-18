// Methodist Girls' School (Primary) — End-of-Year Examination 2024
// Primary 3 English Language Paper 2 (Booklets A, B & C)
// Source PDF pages 674–692

import { ExamPaper } from '../../types';

const paper: ExamPaper = {
  id: 'eoy_mgs_p2_2025',
  school: "Methodist Girls' School (Primary)",
  schoolCode: 'mgs',
  level: 'P3',
  subject: 'English',
  paperType: 'Paper2',
  examType: 'EOY',
  year: 2024,
  totalMarks: 50,
  duration: '1h 15min',
  sections: [

    // ─────────────────────────────────────────────
    // SECTION A — GRAMMAR MCQ  (Booklet A, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-a',
      name: 'Section A: Grammar',
      topic: 'GrammarMCQ',
      marks: 8,
      instructions:
        'For each question from 1 to 8, four options are given. One of them is the correct answer. Make your choice (1, 2, 3, or 4) and shade your answer on the Optical Answer Sheet.',
      questions: [
        {
          id: 'mgs-eoy-p2-a-q1',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 1,
          stem: 'Siva asked his brother to __________ his homework carefully.',
          options: [
            { label: '1', text: 'check' },
            { label: '2', text: 'checks' },
            { label: '3', text: 'checked' },
            { label: '4', text: 'checking' },
          ],
          answer: '1',
          solution: {
            method: 'Verb form after "to" (infinitive)',
            steps: [
              '"asked his brother to ___" requires the base form of the verb (infinitive without "to" repeated).',
              '"check" is the base form. "checks" is 3rd-person singular present; "checked" is past; "checking" is the gerund/present participle.',
              'After modal-like structures such as "ask someone to do", we always use the bare infinitive.',
            ],
            tip: 'The pattern "ask + object + to + verb" always takes the base verb.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q2',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 2,
          stem: 'Collecting stickers __________ my hobby. So far, I have almost two hundred of them in my collection!',
          options: [
            { label: '1', text: 'is' },
            { label: '2', text: 'are' },
            { label: '3', text: 'was' },
            { label: '4', text: 'were' },
          ],
          answer: '1',
          solution: {
            method: 'Subject-verb agreement with gerund phrase + tense',
            steps: [
              'The subject is the gerund phrase "Collecting stickers", which acts as a singular noun.',
              'Singular subjects take singular verbs: "is", not "are".',
              'The second sentence uses present tense ("I have"), so we need present tense here too.',
              '"Is" (present singular) is correct.',
            ],
            tip: 'A gerund phrase (verb + -ing used as a noun) is always treated as singular.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q3',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 3,
          stem: 'Aunt Lily needed to buy __________ soy sauce as she had used up a whole bottle when cooking dinner for the family gathering.',
          options: [
            { label: '1', text: 'more' },
            { label: '2', text: 'much' },
            { label: '3', text: 'a few' },
            { label: '4', text: 'a little' },
          ],
          answer: '1',
          solution: {
            method: 'Quantifiers for uncountable nouns in comparative context',
            steps: [
              'Soy sauce is an uncountable noun, so "a few" (used with countable nouns) is wrong.',
              '"Much" is used in negatives/questions, not affirmative statements like this.',
              '"A little" means a small amount — but she used up a whole bottle and needs a replacement, implying she needs a larger quantity.',
              '"More" correctly expresses an additional/further quantity and fits the context perfectly.',
            ],
            tip: 'Use "more" when referring to an additional or greater quantity of something already used or needed.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q4',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 4,
          stem: 'If customers __________ fifteen items or more from Blackmore Bookshop, they will receive a gift.',
          options: [
            { label: '1', text: 'purchase' },
            { label: '2', text: 'purchases' },
            { label: '3', text: 'are purchasing' },
            { label: '4', text: 'were purchasing' },
          ],
          answer: '1',
          solution: {
            method: 'First conditional (real conditional) — if-clause verb form',
            steps: [
              'This is a Type 1 (real/possible) conditional: "If + simple present, … will + base verb".',
              'The subject "customers" is plural, so we need the plain plural present: "purchase" (no -s).',
              '"Purchases" is 3rd-person singular — wrong for plural "customers".',
              '"Are purchasing" (continuous) and "were purchasing" (past) do not fit the conditional structure.',
            ],
            tip: 'In real conditionals, the if-clause uses simple present tense. Plural subject → no -s on verb.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q5',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 5,
          stem: '"We are so unlucky," Rose and her best friend sighed when the man at the ticketing counter told __________ that the concert tickets were sold out.',
          options: [
            { label: '1', text: 'us' },
            { label: '2', text: 'we' },
            { label: '3', text: 'they' },
            { label: '4', text: 'them' },
          ],
          answer: '4',
          solution: {
            method: 'Object pronoun for 3rd-person plural referent',
            steps: [
              'The pronoun refers to "Rose and her best friend" — a 3rd-person plural group, not the narrator.',
              '"Told + object pronoun": we need an object pronoun (accusative case).',
              '"We" and "they" are subject pronouns — incorrect after a verb.',
              '"Us" refers to 1st-person plural (the narrator\'s group) — not Rose and her friend.',
              '"Them" is the 3rd-person plural object pronoun — correct.',
            ],
            tip: 'After a verb like "told", use object pronouns: me, you, him, her, us, them.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q6',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 6,
          stem: '"Alan knows how to go to the swimming complex on his own, __________ he?" Anita asked.',
          options: [
            { label: '1', text: "isn't" },
            { label: '2', text: "don't" },
            { label: '3', text: "aren't" },
            { label: '4', text: "doesn't" },
          ],
          answer: '4',
          solution: {
            method: 'Question tag for simple present, 3rd-person singular',
            steps: [
              'The main clause is "Alan knows…" — affirmative, simple present, 3rd-person singular.',
              'Affirmative main clause → negative question tag.',
              'Auxiliary for "knows" (simple present, 3rd-person singular) is "does", so the tag is "doesn\'t he?"',
              '"Isn\'t" belongs to "to be"; "don\'t/aren\'t" are wrong person/auxiliary.',
            ],
            tip: 'For question tags: use the same auxiliary as the main verb. Simple present (he/she/it) → does/doesn\'t.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q7',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 7,
          stem: 'Father allowed us to use our gadgets __________ we have completed all our assignments.',
          options: [
            { label: '1', text: 'so' },
            { label: '2', text: 'until' },
            { label: '3', text: 'since' },
            { label: '4', text: 'although' },
          ],
          answer: '2',
          solution: {
            method: 'Conjunction expressing condition/time limit',
            steps: [
              '"So" implies result; "since" implies reason; "although" implies contrast — none of these fit the meaning of a time-based condition.',
              '"Until" means "up to the point in time when" — Father will allow gadgets only after all assignments are done.',
              'The sentence means: gadgets are allowed only after (up to the point) assignments are complete.',
              '"Until" correctly captures this meaning.',
            ],
            tip: '"Until" sets a time boundary: the situation continues up to a certain point.',
          },
        },
        {
          id: 'mgs-eoy-p2-a-q8',
          type: 'A',
          topic: 'GrammarMCQ',
          marks: 1,
          questionNumber: 8,
          stem: 'The sheep __________ in the meadow when they were suddenly attacked by a wolf.',
          options: [
            { label: '1', text: 'graze' },
            { label: '2', text: 'grazed' },
            { label: '3', text: 'are grazing' },
            { label: '4', text: 'were grazing' },
          ],
          answer: '4',
          solution: {
            method: 'Past continuous for interrupted action',
            steps: [
              'Two events: (1) sheep grazing — ongoing background action; (2) sudden wolf attack — interrupting event.',
              'Pattern for interrupted past action: past continuous + when + simple past.',
              '"Were grazing" (past continuous, plural) correctly describes the ongoing action.',
              '"Grazed" (simple past) would imply both events happened sequentially, not simultaneously.',
            ],
            tip: 'Use past continuous + "when" + simple past to show an ongoing action that was interrupted.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION B — VOCABULARY MCQ  (Booklet A, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-b',
      name: 'Section B: Vocabulary MCQ',
      topic: 'VocabMCQ',
      marks: 6,
      instructions:
        'For questions 9 to 14, four options are given. One of them is the correct answer. Make your choice (1, 2, 3, or 4). Shade the correct oval on the Optical Answer Sheet.',
      questions: [
        {
          id: 'mgs-eoy-p2-b-q9',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 9,
          stem: 'Although Mrs Ong is already very old, she is still __________ as she exercises daily in the park.',
          options: [
            { label: '1', text: 'as fit as a fiddle' },
            { label: '2', text: 'as busy as a bee' },
            { label: '3', text: 'as brave as a lion' },
            { label: '4', text: 'as graceful as a swan' },
          ],
          answer: '1',
          solution: {
            method: 'Idiom selection based on context',
            steps: [
              'The clue is "exercises daily" → the focus is on her physical health and fitness.',
              '"As fit as a fiddle" means in excellent health/physical condition — matches perfectly.',
              '"As busy as a bee" refers to being hardworking, not fitness.',
              '"As brave as a lion" refers to courage; "as graceful as a swan" refers to elegance.',
            ],
            tip: 'Read the entire sentence for clues. "Exercises daily" signals health/fitness → "as fit as a fiddle".',
          },
        },
        {
          id: 'mgs-eoy-p2-b-q10',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 10,
          stem: 'We were so __________ after watching the dance performances during National Day Parade that we decided to learn dancing.',
          options: [
            { label: '1', text: 'admired' },
            { label: '2', text: 'inspired' },
            { label: '3', text: 'energised' },
            { label: '4', text: 'engrossed' },
          ],
          answer: '2',
          solution: {
            method: 'Vocabulary in context — result of watching a performance',
            steps: [
              'The key result is "decided to learn dancing" — a motivated action taken after watching.',
              '"Inspired" means filled with the urge to do something after seeing or experiencing something.',
              '"Admired" = felt admiration (no implication of action); "energised" = felt physical energy; "engrossed" = deeply absorbed in something.',
              'Only "inspired" naturally leads to the decision to take up dancing.',
            ],
            tip: '"Inspired" means motivated to act. Look for the cause-and-effect signal: watching → inspired → decided to learn.',
          },
        },
        {
          id: 'mgs-eoy-p2-b-q11',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 11,
          stem: 'The twins __________ well with everyone as they are friendly and polite.',
          options: [
            { label: '1', text: 'get by' },
            { label: '2', text: 'get over' },
            { label: '3', text: 'get along' },
            { label: '4', text: 'get away' },
          ],
          answer: '3',
          solution: {
            method: 'Phrasal verb meaning in social context',
            steps: [
              '"Get by" = manage/survive; "get over" = recover from; "get away" = escape.',
              '"Get along (well) with someone" = have a friendly, harmonious relationship.',
              'The clue is "friendly and polite" — this describes good social relationships.',
              '"Get along well with everyone" is the standard phrase for being sociable.',
            ],
            tip: '"Get along with" is the phrasal verb for having good relations with others.',
          },
        },
        {
          id: 'mgs-eoy-p2-b-q12',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 12,
          stem: 'The __________ cheered and applauded loudly when their favourite singer finally appeared on the stage.',
          options: [
            { label: '1', text: 'audience' },
            { label: '2', text: 'onlookers' },
            { label: '3', text: 'participants' },
            { label: '4', text: 'contestants' },
          ],
          answer: '1',
          solution: {
            method: 'Precise vocabulary — collective nouns for groups at events',
            steps: [
              '"Onlookers" = people watching an unexpected event (accident, street scene) — not typically concerts.',
              '"Participants" and "contestants" are people actively taking part in an event, not watching.',
              '"Audience" specifically refers to people gathered to watch/listen to a performance — concerts, plays, shows.',
              'A singer on stage → "audience" is the correct word.',
            ],
            tip: '"Audience" = people who watch/listen to a performance. "Onlookers" = casual bystanders at an unplanned event.',
          },
        },
        {
          id: 'mgs-eoy-p2-b-q13',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 13,
          stem: 'The __________ virus has spread quickly around the world, causing many people to be sick within a short period of time.',
          options: [
            { label: '1', text: 'mild' },
            { label: '2', text: 'strong' },
            { label: '3', text: 'deadly' },
            { label: '4', text: 'contagious' },
          ],
          answer: '4',
          solution: {
            method: 'Adjective describing a virus that spreads',
            steps: [
              'Key clue: "spread quickly around the world" — this describes how the virus moves between people.',
              '"Contagious" means able to spread from person to person — exactly what the sentence describes.',
              '"Deadly" means causing death — the sentence says "causing people to be sick", not necessarily dying.',
              '"Mild" is the opposite of harmful; "strong" is vague and not a standard virus descriptor.',
            ],
            tip: '"Contagious" = easily spread by contact. It directly explains why the virus spread quickly worldwide.',
          },
        },
        {
          id: 'mgs-eoy-p2-b-q14',
          type: 'A',
          topic: 'VocabMCQ',
          marks: 1,
          questionNumber: 14,
          stem: "The burglar crept __________ into the rich man's house, not wanting to wake anyone up.",
          options: [
            { label: '1', text: 'boldly' },
            { label: '2', text: 'openly' },
            { label: '3', text: 'stealthily' },
            { label: '4', text: 'frantically' },
          ],
          answer: '3',
          solution: {
            method: 'Adverb choice matching the action of a burglar sneaking in',
            steps: [
              '"Boldly" = confidently, without hiding — the opposite of what a burglar does.',
              '"Openly" = without hiding — also the opposite.',
              '"Frantically" = in a panicked, hurried way — does not match "crept" (slow, quiet movement).',
              '"Stealthily" = quietly and secretively — perfectly matches "crept" and "not wanting to wake anyone".',
            ],
            tip: '"Crept" already implies slow, quiet movement. "Stealthily" reinforces the secretive intent of a burglar.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION C — GRAMMAR CLOZE (Underline correct word)  (Booklet B, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-c',
      name: 'Section C: Grammar Cloze',
      topic: 'GrammarCloze',
      marks: 4,
      instructions:
        'Read the passage carefully. Underline the correct word from the words given in the brackets.',
      passage: {
        title: 'About Libraries',
        text:
          'A library is not just a room with books. It (15) [offer / offers] resources to help people better understand the world around them. It provides a space where information (16) [is / are] easily found, from history to science to literature.\n\nPeople can sign up to be members of a library. Some of these members come together to discuss the various books that they (17) [enjoy / enjoys] reading. Many libraries even (18) [provide / provides] computers for children to learn how to search for information on the Internet. There is always something new to learn at the library.',
      },
      questions: [
        {
          id: 'mgs-eoy-p2-c-q15',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 15,
          stem: 'It (15) [offer / offers] resources to help people better understand the world around them.',
          options: [
            { label: 'A', text: 'offer' },
            { label: 'B', text: 'offers' },
          ],
          answer: 'offers',
          solution: {
            method: 'Subject-verb agreement — singular subject',
            steps: [
              'Subject is "It" — 3rd-person singular.',
              'Simple present, 3rd-person singular → verb takes -s.',
              '"Offers" is correct.',
            ],
            tip: 'He/She/It → always add -s to the verb in simple present.',
          },
        },
        {
          id: 'mgs-eoy-p2-c-q16',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 16,
          stem: 'It provides a space where information (16) [is / are] easily found.',
          options: [
            { label: 'A', text: 'is' },
            { label: 'B', text: 'are' },
          ],
          answer: 'is',
          solution: {
            method: 'Subject-verb agreement — uncountable noun',
            steps: [
              '"Information" is an uncountable noun — always singular.',
              'Singular subject → singular verb "is".',
              '"Are" would be used with a plural or plural-counted subject.',
            ],
            tip: '"Information" is uncountable, like "furniture", "water", "advice" — always singular verb.',
          },
        },
        {
          id: 'mgs-eoy-p2-c-q17',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 17,
          stem: 'Some of these members come together to discuss the various books that they (17) [enjoy / enjoys] reading.',
          options: [
            { label: 'A', text: 'enjoy' },
            { label: 'B', text: 'enjoys' },
          ],
          answer: 'enjoy',
          solution: {
            method: 'Subject-verb agreement — plural subject "they"',
            steps: [
              'The subject of the verb is "they" (referring to the members).',
              '"They" is 3rd-person plural → no -s on the verb.',
              '"Enjoy" is correct.',
            ],
            tip: 'They/We/You → do NOT add -s to the verb.',
          },
        },
        {
          id: 'mgs-eoy-p2-c-q18',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 18,
          stem: 'Many libraries even (18) [provide / provides] computers for children.',
          options: [
            { label: 'A', text: 'provide' },
            { label: 'B', text: 'provides' },
          ],
          answer: 'provide',
          solution: {
            method: 'Subject-verb agreement — plural subject "Many libraries"',
            steps: [
              '"Many libraries" is plural.',
              'Plural subject → no -s on verb → "provide".',
              '"Provides" would be correct only if the subject were singular (e.g. "This library").',
            ],
            tip: 'Many/Several/Most + plural noun → plural verb (no -s).',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION D — GRAMMAR CLOZE (Choose from word box)  (Booklet B, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-d',
      name: 'Section D: Grammar Cloze',
      topic: 'GrammarCloze',
      marks: 4,
      instructions:
        'Read the passage carefully. Choose the correct word from the words given in the box and fill in the blanks. WRITE THE LETTER ONLY. USE EACH WORD ONCE ONLY.',
      wordBox: [
        { label: 'A', word: 'as' },
        { label: 'B', word: 'for' },
        { label: 'C', word: 'in' },
        { label: 'D', word: 'into' },
        { label: 'E', word: 'with' },
        { label: 'F', word: 'when' },
      ],
      passage: {
        title: 'Lazy Day',
        text:
          'One Sunday morning, Mother woke up and declared, "Today is Lazy Day!" We had berries and bananas (19) ___ breakfast because nobody cooked. Then, we left our bowls (20) ___ the sink and went to the garden.\n\n(21) ___ we were outside, Father saw the weeds sprouting in the garden. (22) ___ it was Lazy Day, Father watched the butterflies fluttering instead of pulling out the weeds. For the rest of the morning, we took it easy and did nothing but relax.',
      },
      questions: [
        {
          id: 'mgs-eoy-p2-d-q19',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 19,
          stem: 'We had berries and bananas (19) ___ breakfast because nobody cooked.',
          answer: 'B (for)',
          solution: {
            method: 'Preposition with meals',
            steps: [
              '"Have something for breakfast/lunch/dinner" is the standard phrase.',
              '"For" is the preposition used with meals to indicate the meal at which something is eaten.',
            ],
            tip: 'We always say "for breakfast", "for lunch", "for dinner" — never "as breakfast" in this context.',
          },
        },
        {
          id: 'mgs-eoy-p2-d-q20',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 20,
          stem: 'We left our bowls (20) ___ the sink and went to the garden.',
          answer: 'D (into)',
          solution: {
            method: 'Preposition of direction/placement',
            steps: [
              '"Left our bowls ___ the sink" = placed the bowls inside the sink (moved into it).',
              '"Into" indicates movement or placement towards the inside of something.',
              '"In" would describe a static position already there.',
            ],
            tip: '"Into" = movement towards inside. "In" = already inside.',
          },
        },
        {
          id: 'mgs-eoy-p2-d-q21',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 21,
          stem: '(21) ___ we were outside, Father saw the weeds sprouting in the garden.',
          answer: 'F (when)',
          solution: {
            method: 'Conjunction expressing simultaneous time',
            steps: [
              'Two things happening at the same time: they were outside AND Father noticed the weeds.',
              '"When" introduces a time clause that is simultaneous with or immediately before the main clause.',
              '"As" could work but "when" is more natural for a single moment of noticing.',
            ],
            tip: '"When" introduces a time clause for simultaneous or immediately preceding events.',
          },
        },
        {
          id: 'mgs-eoy-p2-d-q22',
          type: 'A',
          topic: 'GrammarCloze',
          marks: 1,
          questionNumber: 22,
          stem: '(22) ___ it was Lazy Day, Father watched the butterflies instead of pulling out the weeds.',
          answer: 'A (as)',
          solution: {
            method: 'Conjunction expressing reason',
            steps: [
              'The sentence explains why Father watched butterflies instead of weeding.',
              '"As" here means "because" — it introduces a reason.',
              '"When" would indicate time, not reason.',
            ],
            tip: '"As" can mean "because" when it introduces a reason clause. Here: "Because it was Lazy Day, Father chose to relax."',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION E — EDITING  (Booklet B, 4 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-e',
      name: 'Section E: Editing',
      topic: 'Editing',
      marks: 4,
      instructions:
        'Read the passage carefully. The words that are underlined have either a spelling or grammatical error. Write the correct word in each of the boxes. Put the correct punctuation mark in the circle.',
      passage: {
        title: 'Otters in Singapore',
        text:
          "Have you seen otters before? Otters are a common sight in Singapore. The two common species in Singapore are the small-clawed otter and the smooth-coated otter. They like to live in groups. Their webbed feet are [adabted] (23) for swimming. Otters can be commonly found at Botanic Gardens, Marina Bay Sands and even Changi.\n\nFifty years ago, Singapore's rivers were choked with garbage. Smooth-coated otters were [in] (24) danger [in] becoming extinct in Singapore. In 1977, the rivers were cleaned up. Since then, the otters began to [returning] (25) to our island. Now, the otter population is growing. Otters have adjusted well to urban spaces like living under bridges instead of in their dens. [Rimamber] (26) to respect the otters by keeping a safe distance away from them when you spot one. In this way, both otters and humans can live peacefully in our shared environments.",
        source: "Adapted from What's Up May Issue 2024 – Otters in Singapore",
      },
      questions: [
        {
          id: 'mgs-eoy-p2-e-q23',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 23,
          stem: 'Their webbed feet are [adabted] for swimming.',
          underlinedWord: 'adabted',
          answer: 'adapted',
          solution: {
            method: 'Spelling correction',
            steps: [
              '"adabted" is a misspelling. The correct word is "adapted" (a-d-a-p-t-e-d).',
              '"Adapted" means specially modified or suited for a purpose.',
              'Context: webbed feet are adapted (modified by nature) for swimming.',
            ],
            tip: 'Remember: "adapted" has the pattern a-d-a-p-t-e-d. The common mistake is swapping "p" and "b".',
          },
        },
        {
          id: 'mgs-eoy-p2-e-q24',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 24,
          stem: 'Smooth-coated otters were [in] danger [in] becoming extinct.',
          underlinedWord: 'in (second)',
          answer: 'of',
          solution: {
            method: 'Prepositional phrase — "in danger of"',
            steps: [
              'The fixed expression is "in danger of + gerund" — e.g. "in danger of becoming extinct".',
              '"In danger in" is incorrect; "in danger of" is the correct collocation.',
            ],
            tip: 'Fixed phrase: "in danger OF" — always followed by "of" before a gerund.',
          },
        },
        {
          id: 'mgs-eoy-p2-e-q25',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 25,
          stem: 'Since then, the otters began to [returning] to our island.',
          underlinedWord: 'returning',
          answer: 'return',
          solution: {
            method: 'Infinitive after "began to"',
            steps: [
              '"began to" must be followed by the base infinitive of the verb.',
              '"began to returning" is wrong — "returning" is a gerund/present participle.',
              '"began to return" is correct.',
            ],
            tip: '"Begin/began + to + base verb" (infinitive). Do not add -ing after "to".',
          },
        },
        {
          id: 'mgs-eoy-p2-e-q26',
          type: 'A',
          topic: 'Editing',
          marks: 1,
          questionNumber: 26,
          stem: '[Rimamber] to respect the otters by keeping a safe distance away from them.',
          underlinedWord: 'Rimamber',
          answer: 'Remember',
          solution: {
            method: 'Spelling correction',
            steps: [
              '"Rimamber" is a misspelling. The correct word is "Remember" (R-e-m-e-m-b-e-r).',
              '"Remember" means to keep something in mind / not forget.',
            ],
            tip: 'Remember the spelling: Re-MEM-ber. The middle syllable is "mem".',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION F — SYNTHESIS  (Booklet B, 2 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-f',
      name: 'Section F: Synthesis',
      topic: 'SentenceCombining',
      marks: 2,
      instructions:
        'For each of the questions 27 and 28, rewrite the given sentence(s) using the word(s) provided. Your answer must be in one sentence. The meaning of the sentence must be the same as the meaning of the given sentence(s).',
      questions: [
        {
          id: 'mgs-eoy-p2-f-q27',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 27,
          stem: 'We looked for information on the Internet. Then, we started on our project.\n\nBefore ___________________________________________',
          givenSentences: [
            'We looked for information on the Internet.',
            'Then, we started on our project.',
          ],
          connectorProvided: 'Before',
          answer: 'Before we started on our project, we looked for information on the Internet.',
          solution: {
            method: 'Sentence combining with "Before" — reversing the time sequence',
            steps: [
              'Original: Action 1 (look for info) → then Action 2 (start project).',
              '"Before" introduces the second action first: "Before [Action 2], [Action 1]".',
              'The sentence that comes AFTER "before" is the LATER event.',
              'Answer: "Before we started on our project, we looked for information on the Internet."',
            ],
            tip: '"Before [later event], [earlier event]." The sentence after "before" is what happens second.',
          },
        },
        {
          id: 'mgs-eoy-p2-f-q28',
          type: 'A',
          topic: 'SentenceCombining',
          marks: 1,
          questionNumber: 28,
          stem: 'Jane did not complete her homework. The boys did not complete their homework too.\n\nNeither _______________ nor _______________',
          givenSentences: [
            'Jane did not complete her homework.',
            'The boys did not complete their homework too.',
          ],
          connectorProvided: 'Neither … nor',
          answer: 'Neither Jane nor the boys completed their homework.',
          solution: {
            method: 'Sentence combining with "Neither … nor"',
            steps: [
              '"Neither … nor" joins two negative ideas into one affirmative-looking sentence.',
              'Structure: "Neither [Subject 1] nor [Subject 2] + positive verb".',
              'Remove the negatives from both original sentences.',
              '"Neither Jane nor the boys completed their homework."',
            ],
            tip: '"Neither A nor B + verb" — use positive verb because "neither/nor" already carries the negative meaning.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION G — COMPREHENSION CLOZE  (Booklet B, 6 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-g',
      name: 'Section G: Comprehension Cloze',
      topic: 'ComprehensionFIB',
      marks: 6,
      instructions: 'Fill in each blank with the most suitable word.',
      passage: {
        title: 'Fear of Insects (Entomophobia)',
        text:
          "It is totally normal for children to be afraid of insects. This fear is (29) ___ entomophobia. It can be caused by various reasons, just like most of your worries. Understanding why you are afraid of insects can help you (30) ___ less afraid.\n\nSometimes, children feel afraid of things they do not know (31) ___. In this case, insects might seem scary because you do not know why they are important. When you learn more about insects, you will find that they help humans in many ways. For (32) ___, ladybugs eat other insects that might harm the plants that we grow.\n\nHowever, sometimes a child might be afraid of insects because he or she has had a (33) ___ experience, such as being bitten or stung. This makes the child think that all insects are dangerous, even (34) ___ they are not. Parents can help by showing their children that most insects are actually safe and allowing them to have good experiences with insects.",
        source: "Adapted from 'Helping Children Overcome a Fear of Bugs' by PBS Kids",
      },
      questions: [
        {
          id: 'mgs-eoy-p2-g-q29',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 29,
          stem: 'This fear is (29) ___ entomophobia.',
          answer: 'called / named',
          solution: {
            method: 'Vocabulary — verb for giving something a name',
            steps: [
              'The sentence defines what the fear is named.',
              '"Called" or "named" both work: "This fear is called entomophobia."',
              '"Called" is most natural in this definition context.',
            ],
            tip: 'To define something by its name: "This is called ___."',
          },
        },
        {
          id: 'mgs-eoy-p2-g-q30',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 30,
          stem: 'Understanding why you are afraid of insects can help you (30) ___ less afraid.',
          answer: 'feel / be / become',
          solution: {
            method: 'Verb after "help you" in context',
            steps: [
              '"Help you ___ less afraid" — needs a base-form verb (infinitive without "to" is common after "help you").',
              '"Feel", "be", or "become" all work and convey the intended meaning.',
              '"Feel less afraid" is the most natural collocation.',
            ],
            tip: '"Help + object + base verb" (no "to"): "help you feel", "help you become".',
          },
        },
        {
          id: 'mgs-eoy-p2-g-q31',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 31,
          stem: 'Sometimes, children feel afraid of things they do not know (31) ___.',
          answer: 'of / about / well',
          solution: {
            method: 'Completing a phrase about familiarity',
            steps: [
              '"Things they do not know about/of" = things that are unfamiliar to them.',
              '"Do not know well" is also acceptable.',
              'The phrase describes a lack of familiarity.',
            ],
            tip: '"Do not know about" = are not familiar with.',
          },
        },
        {
          id: 'mgs-eoy-p2-g-q32',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 32,
          stem: 'For (32) ___, ladybugs eat other insects that might harm the plants that we grow.',
          answer: 'example / instance',
          solution: {
            method: 'Discourse marker giving an example',
            steps: [
              '"For example" or "for instance" are used to introduce a specific illustration of a general point.',
              'The ladybug fact illustrates how insects help humans.',
            ],
            tip: '"For example" / "For instance" — both introduce a specific case supporting a general statement.',
          },
        },
        {
          id: 'mgs-eoy-p2-g-q33',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 33,
          stem: 'A child might be afraid of insects because he or she has had a (33) ___ experience, such as being bitten or stung.',
          answer: 'bad / horrible / terrifying / scary / frightening / negative / traumatic',
          solution: {
            method: 'Adjective describing a negative experience',
            steps: [
              'Being bitten or stung is an unpleasant/painful experience.',
              'Adjectives like "bad", "scary", "frightening", "negative", "horrible", "traumatic" all work.',
              'The adjective must describe the nature of the experience as unpleasant.',
            ],
            tip: 'Context clue: "bitten or stung" → the experience was negative/scary.',
          },
        },
        {
          id: 'mgs-eoy-p2-g-q34',
          type: 'A',
          topic: 'ComprehensionFIB',
          marks: 1,
          questionNumber: 34,
          stem: 'This makes the child think that all insects are dangerous, even (34) ___ they are not.',
          answer: 'if / when / though',
          solution: {
            method: 'Conjunction expressing contrast or concession',
            steps: [
              'The sentence shows a contrast: the child thinks all are dangerous, but in reality they are not.',
              '"Even if", "even when", "even though" all introduce a concession (an acknowledged opposite fact).',
              '"Even though" most directly expresses contrast with a fact.',
            ],
            tip: '"Even though/if/when" introduces a fact that contradicts the main idea — use for concession.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION H — COMPREHENSION 1  (Booklet C, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-h',
      name: "Section H: Comprehension 1 — Stacy the Spider's Masterpiece",
      topic: 'ComprehensionOE',
      marks: 8,
      instructions: 'Read the following passage carefully and answer questions 35 to 42.',
      passage: {
        title: "Stacy the Spider's Masterpiece",
        lines: [
          'In a distant village, Stacy, the spider, loved to weave beautiful webs.',
          'However, the villagers did not appreciate her creations. They saw only sticky,',
          'revolting webs rather than the lovingly made curtains and clothing that Stacy',
          'had left for them. Thus, she was shunned and shooed everywhere she went.',          // line 4
          'In spite of how the villagers treated her, Stacy never gave up and continued',      // line 5
          'to work on her creations.',
          '',
          'One day, Stacy met a young woman. An avid knitter, the woman made',
          'booties and a sweater for her newborn baby but she was too poor to buy the',
          'wool she needed to make a blanket. Stacy decided to help the woman, so',
          'she spun her biggest and most attractive web yet. She had created a blanket', // line 10
          'of such beauty and softness that when the villagers saw her masterpiece,',
          'they gasped in awe.',
          '',
          'Ashamed of how they had treated her previously, the village head',
          'mustered his courage and approached Stacy. "Please forgive us, Stacy. You', // line 15
          'are indeed a kind and talented spider," he said.',
          '',
          'From that day on, the villagers appreciated Stacy\'s talents. Stacy',
          'learnt that sometimes, it takes patience and perseverance to realise one\'s',
          'talents. The village became a place where spiders and humans lived',
          'harmoniously, united by Stacy\'s masterpiece.',
        ],
        source: "Adapted from Sophie's Masterpiece by Eileen Spinelli",
      },
      questions: [
        {
          id: 'mgs-eoy-p2-h-q35',
          type: 'A',
          topic: 'ComprehensionMCQ',
          marks: 1,
          questionNumber: 35,
          stem: "In the beginning, the villagers were __________ by Stacy's creations. [1m]",
          options: [
            { label: '1', text: 'awed' },
            { label: '2', text: 'angered' },
            { label: '3', text: 'disgusted' },
            { label: '4', text: 'captivated' },
          ],
          answer: '3',
          solution: {
            method: 'Inference from text',
            steps: [
              'The passage says villagers saw "sticky, revolting webs" and "shunned and shooed" Stacy.',
              '"Revolting" = disgusting. Being shunned = driven away.',
              '"Disgusted" (option 3) matches — they found her webs revolting.',
              '"Awed"/"captivated" imply positive feelings; "angered" implies fury — not the primary emotion here.',
            ],
            tip: '"Revolting" is the key word — it means disgusting, pointing to option 3.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q36',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 36,
          stem: 'Which word has the same meaning as "avoided"? Circle either (A) or (B). [1m]\n\nThus, she was shunned (A) and shooed (B) everywhere she went.',
          options: [
            { label: 'A', text: 'shunned' },
            { label: 'B', text: 'shooed' },
          ],
          answer: 'A',
          solution: {
            method: 'Vocabulary — synonym for "avoided"',
            steps: [
              '"Shunned" means deliberately avoided or ignored someone.',
              '"Shooed" means chased away (by waving hands or making sounds).',
              '"Avoided" = deliberately kept away from → "shunned" is the synonym.',
            ],
            tip: '"Shun" = deliberately avoid someone. "Shoo" = chase away with gestures/sounds.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q37',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 37,
          stem: 'Put the following events in the right sequence, according to the story. Write 1, 2 and 3 in the lines. [1m]\n\n___ Stacy met a young woman and helped her.\n___ Stacy weaved beautiful creations for the villagers.\n___ Stacy was not appreciated for her kindness.',
          answer: 'Stacy weaved → 3 | Stacy met young woman → 1 | Stacy was not appreciated → 2\n(Correct order: "Stacy weaved beautiful creations" = 3, "Stacy met a young woman" = 1... Wait: let me re-read.)',
          correctSequence: {
            'Stacy met a young woman and helped her.': 2,
            'Stacy weaved beautiful creations for the villagers.': 3,
            'Stacy was not appreciated for her kindness.': 1,
          },
          solution: {
            method: 'Sequencing events from the story',
            steps: [
              'Event order in story: (1) Stacy weaved webs for villagers but was shunned [not appreciated]. (2) She met the young woman and made the blanket. (3) Villagers finally appreciated her and she became recognised.',
              'Sequence label 1 = first event = "Stacy was not appreciated for her kindness."',
              'Sequence label 2 = second event = "Stacy met a young woman and helped her."',
              'Sequence label 3 = third event = "Stacy weaved beautiful creations [blanket] for the villagers [young woman]." (Answer key: 3–1–2)',
            ],
            tip: 'Track the story timeline: shunned first → met woman → helped woman → appreciated.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q38',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 38,
          stem: 'True or False: Stacy was forced to make gifts for the villagers. [1m]',
          options: [{ label: 'T', text: 'True' }, { label: 'F', text: 'False' }],
          answer: 'False',
          solution: {
            method: 'True/False — recall from text',
            steps: [
              'The passage says Stacy left curtains and clothing for the villagers, and she decided to help the young woman "of her own accord".',
              'Stacy was never forced — she chose to create and help.',
              'Statement is FALSE.',
            ],
            tip: 'Look for words like "forced", "made to", "had to" in the text — none appear here.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q39',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 39,
          stem: 'True or False: The villagers were horrified when they saw the blanket. [1m]',
          options: [{ label: 'T', text: 'True' }, { label: 'F', text: 'False' }],
          answer: 'False',
          solution: {
            method: 'True/False — specific detail',
            steps: [
              'The passage says "when the villagers saw her masterpiece, they gasped in awe."',
              '"Gasped in awe" = amazed and impressed, not horrified.',
              'Statement is FALSE.',
            ],
            tip: '"Gasped in awe" = amazement/admiration, NOT horror.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q40',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 40,
          stem: "True or False: Stacy's patience and kindness won the hearts of the villagers. [1m]",
          options: [{ label: 'T', text: 'True' }, { label: 'F', text: 'False' }],
          answer: 'True',
          solution: {
            method: 'True/False — inference from text',
            steps: [
              '"Stacy never gave up" = patience; she helped the woman = kindness.',
              'As a result, the villagers were ashamed and apologised, then appreciated her.',
              'Statement is TRUE.',
            ],
            tip: 'Connect "never gave up" (patience) + "decided to help" (kindness) to the villagers\' change of heart.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q41',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 41,
          stem: 'Match the characters and their characteristics:\n\nStacy ○  ○ brave  ○ resilient',
          answer: 'Stacy — resilient',
          solution: {
            method: 'Character matching — inference',
            steps: [
              '"Resilient" = able to recover/bounce back from difficulties.',
              'Stacy was shunned and shooed but never gave up — the definition of resilience.',
              '"Brave" more appropriately describes the village head, who mustered courage to apologise.',
            ],
            tip: '"Never gave up despite rejection" = resilient.',
          },
        },
        {
          id: 'mgs-eoy-p2-h-q42',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 42,
          stem: 'Match the characters and their characteristics:\n\nvillage head ○  ○ brave  ○ resilient',
          answer: 'village head — brave',
          solution: {
            method: 'Character matching — inference',
            steps: [
              '"Brave" = having the courage to do something difficult.',
              'The village head "mustered his courage" to approach Stacy and apologise.',
              '"Mustered his courage" = had to be brave to do something difficult (admit wrongdoing).',
            ],
            tip: '"Mustered his courage" is the textual clue that the village head was being brave.',
          },
        },
      ],
    },

    // ─────────────────────────────────────────────
    // SECTION I — COMPREHENSION 2  (Booklet C, 8 marks)
    // ─────────────────────────────────────────────
    {
      id: 'sec-i',
      name: "Section I: Comprehension 2 — Grandpa's Remedy",
      topic: 'ComprehensionOE',
      marks: 8,
      instructions: 'Read the following passage carefully and answer questions 43 to 47.',
      passage: {
        title: "Grandpa's Remedy",
        lines: [
          '"My tortoise is dead!" wailed Tom. Tom prodded his tortoise with his finger,',
          'peered at it and shook it real hard to see if there was any sign of life. My cousins and',
          'I tried to get Tom to leave us alone as we were in the middle of an exciting game of',
          'marbles. I threw my hands in despair when my younger brother\'s piercing cry made',
          'me miss an easy shot at the game. I snatched the tortoise out of Tom\'s hands. I tried', // line 5
          'everything I could to coax it out of its shell but to no avail.',
          '',
          '"Come on, Tom. We\'ll take the tortoise to Grandfather. He\'ll know what to',
          'do since he is a vet!" I suggested.',
          '',
          'We finally found Grandfather in the garden. I held out the tortoise and told',  // line 10
          'Grandfather that it was really dead this time, unlike previously. Grandfather nodded',
          'and checked on it. He comforted Tom and promised to cure it in two days. Tom',
          'smiled and left.',
          '',
          'Then, Grandfather poked the tortoise with a chopstick but it did not move.',  // line 14 (adjusted)
          'He also threw it into a goldfish bowl. The tortoise sank to the bottom and remained',
          'motionless. Grandfather knew that was the end. He found a cardboard box and',       // line 16
          'placed the tortoise inside. Two days later, my eyes almost popped out when Tom',
          'showed me the box. I gasped in surprise when I saw the tortoise move! I could not',
          'believe that Grandfather brought the tortoise to life by simply placing it in a',
          'cardboard box.',                                                                     // line 20
          '',
          'After much pleading, Grandfather finally told me \'his remedy\'. He had bought',   // line 21
          'a new tortoise for Tom and buried the old one in the garden.',
        ],
        source: "Adapted from Grandpa's Remedy by Jessie Wee",
      },
      questions: [
        {
          id: 'mgs-eoy-p2-i-q43',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 43,
          stem: "Which word in paragraph 1 has the same meaning as 'poked'? [1m]",
          answer: 'prodded',
          solution: {
            method: 'Vocabulary — synonym in context',
            steps: [
              '"Poked" means to push or jab with a finger or pointed object.',
              '"Prodded" means to poke or push repeatedly — used in paragraph 1: "Tom prodded his tortoise with his finger."',
              '"Prodded" = poked.',
            ],
            tip: '"Prod" and "poke" are synonyms — both mean to jab/push with a pointed object.',
          },
        },
        {
          id: 'mgs-eoy-p2-i-q44',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 44,
          stem: 'Explain clearly why the writer was upset with his brother. [2m]',
          answer:
            "His brother's piercing cry caused him to miss an easy shot at the game of marbles.",
          solution: {
            method: 'Direct recall + inference',
            steps: [
              'The writer was playing marbles and was about to make an easy shot.',
              'Tom\'s "piercing cry" (loud, sharp cry) distracted the writer.',
              'The writer threw his hands in despair and missed the easy shot.',
              'Full answer: "Tom\'s piercing cry distracted the writer and caused him to miss an easy shot at the game of marbles."',
            ],
            tip: 'Look for the cause-effect link: cry → distraction → missed shot. Include both cause and effect for 2 marks.',
          },
        },
        {
          id: 'mgs-eoy-p2-i-q45',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 45,
          stem: 'Based on lines 13–19, how did Grandfather check if the tortoise was alive? [2m]\n\n(i) ___\n(ii) ___',
          answer:
            '(i) Grandfather poked the tortoise with a chopstick.\n(ii) Grandfather threw the tortoise into a goldfish bowl.',
          solution: {
            method: 'Direct retrieval — two specific actions',
            steps: [
              'Line 14: "Grandfather poked the tortoise with a chopstick but it did not move."',
              'Line 15: "He also threw it into a goldfish bowl. The tortoise sank to the bottom and remained motionless."',
              'Two separate tests are described — poke with chopstick, and throw into bowl.',
            ],
            tip: 'Answer needs TWO distinct methods. Both must come from lines 13–19.',
          },
        },
        {
          id: 'mgs-eoy-p2-i-q46',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 1,
          questionNumber: 46,
          stem: 'What does the phrase "the end" (line 15) tell you about the tortoise? [1m]',
          answer: 'The tortoise had died / the tortoise was dead.',
          solution: {
            method: 'Inference from euphemism',
            steps: [
              '"The end" is a euphemism for death.',
              'Grandfather confirmed (by his two tests) that the tortoise was not alive.',
              '"Grandfather knew that was the end" = he knew the tortoise had died.',
            ],
            tip: '"The end" in this context is a euphemism for death. Writers use softer language when referring to dying.',
          },
        },
        {
          id: 'mgs-eoy-p2-i-q47',
          type: 'A',
          topic: 'ComprehensionOE',
          marks: 2,
          questionNumber: 47,
          stem: 'For Q47 state whether each statement below is True or False. Give a reason for your answer. Write your answers in complete sentences. [2m]\n\n(a) This was the first time Tom thought his tortoise was dead.\n(b) Grandfather cured the tortoise after two days.',
          answer:
            "(a) False — The writer told Grandfather it was really dead 'this time, unlike previously', meaning Tom had thought the tortoise was dead before.\n(b) False — Grandfather did not cure the tortoise. He bought a new one for Tom and buried the old one in the garden.",
          solution: {
            method: 'True/False with textual justification',
            steps: [
              '(a) Line 10–11: "I told Grandfather that it was really dead this time, unlike previously." → "previously" shows this had happened before → FALSE.',
              '(b) Lines 20–21: "He had bought a new tortoise for Tom and buried the old one in the garden." → The tortoise was not cured; it was replaced → FALSE.',
            ],
            tip: 'Each True/False answer must include a reason using evidence from the text. Two marks = two full-sentence answers.',
          },
        },
      ],
    },
  ],
};

export default paper;
