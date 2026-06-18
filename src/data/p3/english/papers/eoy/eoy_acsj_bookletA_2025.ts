// ============================================================
// Anglo-Chinese School (Junior) — P3 English SA2 2022
// BOOKLET A  (16 MCQ questions, 16 marks)
// Part 1 : Vocabulary MCQ  (Q1–Q6)
// Part 2 : Grammar MCQ     (Q7–Q16)
// ============================================================

export type Topic =
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

// ── Type A : single standalone question ──────────────────────
export interface QuestionTypeA {
  kind: "single";
  id: string;
  topic: Topic;
  marks: number;
  question: string;          // sentence with ___ for blank
  options: string[];         // 4 options, index 0-3
  answer: number;            // 0-based index of correct option
  solution: Solution;
}

// ── Type B : passage-based question set ──────────────────────
export interface QuestionTypeB {
  kind: "set";
  id: string;
  topic: Topic;
  passage: string;
  questions: PassageQuestion[];
}

export interface PassageQuestion {
  id: string;
  marks: number;
  question: string;
  options?: string[];        // present for MCQ sub-questions
  answer: string | number;   // string for OE, number (0-based) for MCQ
  solution: Solution;
}

export type Question = QuestionTypeA | QuestionTypeB;

// ============================================================
//  BOOKLET A — Part 1: Vocabulary MCQ  (Q1–Q6)
// ============================================================

const vocabMCQ: QuestionTypeA[] = [
  {
    kind: "single",
    id: "acsj_eoy2022_A_01",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Sammy was upset that his friends did not ___ him to the party.",
    options: ["invite", "attract", "request", "demand"],
    answer: 0,
    solution: {
      method: "Context clues + word meaning",
      steps: [
        "The sentence says Sammy was upset his friends did not ___ him to the party.",
        "'invite' means to ask someone to come to an event — this fits perfectly.",
        "'attract' means to draw interest, not suitable for a party context.",
        "'request' means to ask for something formally; you request a thing, not invite a person to a party.",
        "'demand' implies force or authority, which is the opposite of the friendly party context.",
        "Therefore the answer is (1) invite.",
      ],
      tip: "When someone goes to a party, they are usually 'invited'. Look for the word that describes the social action of asking someone to join an event.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_02",
    topic: "VocabMCQ",
    marks: 1,
    question:
      '"If you would like to purchase the famous painter\'s artwork, you should visit the ___ tomorrow," the art dealer told me.',
    options: ["library", "gallery", "station", "auditorium"],
    answer: 1,
    solution: {
      method: "Context clues + vocabulary knowledge",
      steps: [
        "The sentence is about purchasing a famous painter's artwork.",
        "An art 'gallery' is a place where artworks are displayed and sold — this matches perfectly.",
        "A 'library' is for books, not art sales.",
        "A 'station' is for transport (train/bus), unrelated to art.",
        "An 'auditorium' is for performances/lectures, not artwork purchases.",
        "Therefore the answer is (2) gallery.",
      ],
      tip: "The key phrase is 'famous painter's artwork'. The place where paintings are displayed and sold is an 'art gallery'.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_03",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "The glass ___ into pieces when it dropped onto the floor.",
    options: ["fell", "cracked", "shattered", "crumbled"],
    answer: 2,
    solution: {
      method: "Precise vocabulary — degree of breaking",
      steps: [
        "The key phrase is 'into pieces' — this describes something breaking into many fragments violently.",
        "'fell' simply describes downward movement; it does not describe breaking.",
        "'cracked' means a partial break — a crack appears but the object stays in one piece. This does not match 'into pieces'.",
        "'shattered' means to break suddenly into many small pieces — this matches 'into pieces' exactly.",
        "'crumbled' usually applies to soft materials (bread, soil) that break into powder/small bits; glass does not crumble.",
        "Therefore the answer is (3) shattered.",
      ],
      tip: "Glass 'shatters' — it breaks violently into many sharp pieces. 'Cracked' would be used if only a line appeared on the glass without it breaking apart.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_04",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Ah Hao is as stubborn as a ___ so do not waste your breath trying to persuade him to change his mind.",
    options: ["dog", "lamb", "mule", "sheep"],
    answer: 2,
    solution: {
      method: "Idiomatic expression / simile recognition",
      steps: [
        "This is a fixed English simile (idiomatic comparison).",
        "The phrase 'as stubborn as a ___' is a well-known English idiom.",
        "The complete idiom is 'as stubborn as a mule'.",
        "Mules are famous for being very stubborn and refusing to move when they do not want to.",
        "'dog', 'lamb', and 'sheep' are not used in this idiom about stubbornness.",
        "Therefore the answer is (3) mule.",
      ],
      tip: "Memorise common animal similes: 'as stubborn as a mule', 'as brave as a lion', 'as quiet as a mouse', 'as gentle as a lamb'.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_05",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "Raju fell into a deep sleep after taking the medicine ___ by the doctor.",
    options: ["set", "fixed", "advised", "prescribed"],
    answer: 3,
    solution: {
      method: "Colocation — doctor and medicine vocabulary",
      steps: [
        "The sentence is about a doctor giving medicine.",
        "When a doctor officially writes/orders medicine for a patient, the verb used is 'prescribe'.",
        "'prescribed' is the past participle form used here to modify 'medicine'.",
        "'set' and 'fixed' do not collocate with medicine in this professional medical context.",
        "'advised' means to give advice — doctors can advise, but the specific word for ordering medicine is 'prescribed'.",
        "Therefore the answer is (4) prescribed.",
      ],
      tip: "Doctors 'prescribe' medicine. This is an important word in medical contexts. The medicine you get from a pharmacy based on a doctor's note is called a 'prescription'.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_06",
    topic: "VocabMCQ",
    marks: 1,
    question:
      "To Mr Tan's horror, a dog suddenly ran across the road. He was unable to stop his car in time and ___ it.",
    options: ["ran off", "ran over", "ran with", "ran after"],
    answer: 1,
    solution: {
      method: "Phrasal verb meaning",
      steps: [
        "The context: Mr Tan could not stop his car in time when a dog was on the road.",
        "The implied meaning is that the car hit the dog.",
        "'ran over' means to drive over something/someone with a vehicle — this fits perfectly.",
        "'ran off' means to run away — the car drove away, which doesn't make sense here.",
        "'ran with' means to accompany someone running — a car cannot run with a dog.",
        "'ran after' means to chase — the car chasing the dog is not the intended meaning.",
        "Therefore the answer is (2) ran over.",
      ],
      tip: "'Run over' is a common phrasal verb meaning to accidentally hit and drive over with a vehicle. E.g. 'The truck ran over a pothole.'",
    },
  },
];

// ============================================================
//  BOOKLET A — Part 2: Grammar MCQ  (Q7–Q16)
// ============================================================

const grammarMCQ: QuestionTypeA[] = [
  {
    kind: "single",
    id: "acsj_eoy2022_A_07",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Once a week, Alex ___ his grandmother who is living in Australia.",
    options: ["call", "calls", "called", "is calling"],
    answer: 1,
    solution: {
      method: "Subject-verb agreement + Simple Present Tense",
      steps: [
        "The time expression 'once a week' tells us this is a regular habit/routine → Simple Present Tense.",
        "The subject is 'Alex' — a singular third-person subject (he/she/it).",
        "For singular third-person subjects in Simple Present, we add '-s' or '-es' to the verb.",
        "call → calls (correct form for Alex).",
        "'called' is past tense — not suitable for a regular weekly activity.",
        "'is calling' is Present Continuous — used for actions happening right now, not weekly habits.",
        "Therefore the answer is (2) calls.",
      ],
      tip: "When you see time words like 'once a week', 'every day', 'always', 'usually' — use Simple Present tense. For he/she/it, remember to add -s/-es to the verb.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_08",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "Samuel should ___ swimming from Coach Tan if he wants to fulfil his dreams of taking part in the Olympics.",
    options: ["learn", "learns", "learnt", "learning"],
    answer: 0,
    solution: {
      method: "Modal verb rule — base form after modal",
      steps: [
        "The sentence contains the modal verb 'should'.",
        "After a modal verb (should, must, can, will, may, might, would, could), we always use the BASE FORM of the verb.",
        "Base form of 'learn' = 'learn' (no -s, no -ed, no -ing).",
        "'learns' has -s added — incorrect after a modal.",
        "'learnt' is past tense — incorrect after a modal.",
        "'learning' has -ing — incorrect after a modal (unless it's 'be learning').",
        "Therefore the answer is (1) learn.",
      ],
      tip: "The rule is: Modal + base verb. Should learn ✓, Should learns ✗, Should learnt ✗, Should learning ✗.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_09",
    topic: "GrammarMCQ",
    marks: 1,
    question: "I was sick ___ I did not go to school.",
    options: ["so", "but", "since", "because"],
    answer: 0,
    solution: {
      method: "Conjunctions — cause and effect",
      steps: [
        "Analyse the two clauses: 'I was sick' (cause) and 'I did not go to school' (effect/result).",
        "The blank joins these two clauses showing that being sick resulted in not going to school.",
        "'so' shows result/consequence: 'I was sick, SO I did not go to school.' ✓",
        "'but' shows contrast — not suitable here since both events align (sick → absent).",
        "'since' and 'because' show reason — they would need the clause order reversed: 'I did not go to school since/because I was sick.' In the given order, 'so' is needed.",
        "Therefore the answer is (1) so.",
      ],
      tip: "Remember: 'because' introduces the reason clause, 'so' introduces the result clause. 'I was sick [cause] SO I stayed home [result].' vs 'I stayed home BECAUSE I was sick [reason].'",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_10",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "You ___ carry an umbrella to school today as there is a possibility that it would rain.",
    options: ["must", "could", "would", "should"],
    answer: 3,
    solution: {
      method: "Modal verbs — degrees of obligation/advice",
      steps: [
        "The sentence gives a reason: 'there is a possibility that it would rain.'",
        "The blank requires a modal showing advice or recommendation.",
        "'should' expresses advice — 'You should carry an umbrella' = it is advisable to do so. ✓",
        "'must' expresses strong obligation/necessity — too strong for 'a possibility' of rain.",
        "'could' expresses possibility — 'You could carry an umbrella' means it is possible but doesn't give strong advice.",
        "'would' expresses willingness or conditional — not used for giving advice.",
        "Therefore the answer is (4) should.",
      ],
      tip: "Use 'should' for advice. Use 'must' for strong rules/necessity. Use 'could' for possibility. When someone gives advice based on a situation, 'should' is the best choice.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_11",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"___ are the books you are looking for. I have kept them over there by the window," Tom informed Susan.',
    options: ["This", "That", "These", "Those"],
    answer: 2,
    solution: {
      method: "Demonstrative pronouns — proximity and number",
      steps: [
        "We need a demonstrative pronoun/adjective for 'books' — a PLURAL noun.",
        "For plural nouns: use 'these' (near the speaker) or 'those' (far from the speaker).",
        "Tom says he 'kept them over there by the window' — this suggests Tom is pointing to the books.",
        "However, at the moment of speaking, the books are being presented/handed over — they are NEAR.",
        "'These' = plural, near ✓",
        "'Those' = plural, far — but Tom is presenting them now, so near is more appropriate.",
        "'This' and 'That' are singular — 'books' is plural, so they are wrong.",
        "Therefore the answer is (3) These.",
      ],
      tip: "Singular near = This, Singular far = That, Plural near = These, Plural far = Those. 'Books' is plural, so only 'these' or 'those' can work.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_12",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      "My mother starts preparing dinner ___ 5 o'clock as it usually takes her an hour to finish cooking.",
    options: ["in", "at", "on", "for"],
    answer: 1,
    solution: {
      method: "Prepositions of time",
      steps: [
        "We need a preposition before '5 o'clock'.",
        "The correct preposition for specific clock times is 'at'.",
        "'At' is used with specific times: at 5 o'clock, at noon, at midnight, at 3:30 pm. ✓",
        "'In' is used for months, years, seasons, and periods of time: in the morning, in January, in 2022.",
        "'On' is used for days and dates: on Monday, on 27 October.",
        "'For' is used for duration: for an hour, for two weeks.",
        "Therefore the answer is (2) at.",
      ],
      tip: "Remember the TIME preposition rule: AT (specific time), ON (day/date), IN (month/year/period). 'At 5 o'clock' ✓",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_13",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"I do not need ___ money as I will not be buying anything," Sam told his mother.',
    options: ["any", "few", "little", "some"],
    answer: 0,
    solution: {
      method: "Quantifiers — negative sentences",
      steps: [
        "The sentence is NEGATIVE: 'I do not need ___ money'.",
        "In negative sentences, we use 'any' (not 'some').",
        "'any' is used in negative statements and questions with uncountable nouns (money) and countable plurals.",
        "'some' is used in POSITIVE statements and offers: 'I need some money.'",
        "'few' is used with countable plural nouns in positive sentences: 'I have few friends.'",
        "'little' is used with uncountable nouns in positive sentences: 'I have little time.' — but in a negative, 'any' is correct.",
        "Therefore the answer is (1) any.",
      ],
      tip: "Key rule: SOME in positive sentences → ANY in negative sentences and questions. 'I have some money' (positive) → 'I don't have any money' (negative).",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_14",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"My brother ___ for the marathon now. It will take place next month," Sam told Lisa proudly.',
    options: ["train", "trains", "trained", "is training"],
    answer: 3,
    solution: {
      method: "Present Continuous Tense — action happening now/around now",
      steps: [
        "The clue 'now' indicates the action is happening at or around this current period.",
        "Present Continuous (is/am/are + verb-ing) is used for actions happening now or around the current time.",
        "'is training' = Present Continuous ✓ — the brother is in the process of training currently.",
        "'train' = base form — cannot stand alone without an auxiliary verb.",
        "'trains' = Simple Present — used for habits/routines, not what is happening 'now'.",
        "'trained' = Simple Past — the training has already finished, but 'now' shows it is ongoing.",
        "Therefore the answer is (4) is training.",
      ],
      tip: "When you see 'now' or 'at the moment', think Present Continuous: am/is/are + verb-ing. 'My brother is training now.'",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_15",
    topic: "GrammarMCQ",
    marks: 1,
    question:
      '"Sally is not coming for your birthday party, ___ she?" Mrs Lim asked Jane.',
    options: ["is", "isn't", "was", "wasn't"],
    answer: 0,
    solution: {
      method: "Question tags — negative statement needs positive tag",
      steps: [
        "This is a question tag (a short question added to the end of a statement).",
        "The main clause is: 'Sally is not coming' — this is a NEGATIVE statement.",
        "Rule: NEGATIVE statement → POSITIVE question tag.",
        "The main verb/auxiliary is 'is' (from 'is not coming').",
        "So the question tag must be: 'is she?' (positive form of 'is').",
        "'isn't she?' would make it a negative tag — wrong for a negative statement.",
        "'was' and 'wasn't' are past tense — the main clause uses present tense 'is', so past tense tags are wrong.",
        "Therefore the answer is (1) is.",
      ],
      tip: "Question tag rule: Positive statement → negative tag (isn't it?). Negative statement → positive tag (is it?). Match the tense of the main auxiliary verb.",
    },
  },
  {
    kind: "single",
    id: "acsj_eoy2022_A_16",
    topic: "GrammarMCQ",
    marks: 1,
    question: "June ___ when the doorbell rang.",
    options: ["eat", "eats", "is eating", "was eating"],
    answer: 3,
    solution: {
      method: "Past Continuous Tense — interrupted action",
      steps: [
        "The sentence describes two past events: June was doing something when the doorbell rang (interrupted her).",
        "Pattern: Past Continuous (was/were + verb-ing) + 'when' + Simple Past.",
        "The doorbell rang (Simple Past — the interrupting action) while June was eating (Past Continuous — the ongoing background action).",
        "'was eating' = Past Continuous ✓ — the action in progress when interrupted.",
        "'eat' and 'eats' are present tense — wrong for a past context.",
        "'is eating' = Present Continuous — wrong tense, the story is in the past ('rang' is past).",
        "Therefore the answer is (4) was eating.",
      ],
      tip: "The 'when + Simple Past' pattern signals Past Continuous for the other action. 'June WAS EATING when the doorbell RANG.' Think of Past Continuous as the 'background movie' that was playing when something else happened.",
    },
  },
];

// ============================================================
//  COMBINED EXPORT
// ============================================================

export const acsj_eoy2022_bookletA: Question[] = [
  ...vocabMCQ,
  ...grammarMCQ,
];

export const paperMeta = {
  school: "Anglo-Chinese School (Junior)",
  code: "ACS(J)",
  year: 2022,
  exam: "Semestral Assessment 2 (SA2 / EOY)",
  level: "Primary 3",
  booklet: "A",
  totalMarks: 16,
  sections: [
    { name: "Part 1: Vocabulary MCQ", questions: 6, marks: 6, topic: "VocabMCQ" as Topic },
    { name: "Part 2: Grammar MCQ", questions: 10, marks: 10, topic: "GrammarMCQ" as Topic },
  ],
};
