// Small constants split out of dataEngine.js so login / signup do not pull the paper banks. dataEngine re-exports them.

export const DEFAULT_SETTINGS = {
  GrammarMCQ:    { count:16, difficulty:"standard" },
  VocabMCQ:      { count:16, difficulty:"standard" },
  GrammarCloze:  { sets:1 },
  VocabCloze:    { sets:1 },
  Editing:       { sets:1 },
  Comprehension: { sets:1 },
};

export const SCHOOL_PAPER_MAP = {
  "Nanyang Primary":    { style:"challenging", focusTopics:["Past Perfect","Subject-Verb Agreement","Synonyms"],      compStyle:"long_inference", mockRef:"nanyang_wa1_2025" },
  "Nan Hua Primary":    { style:"standard",    focusTopics:["Past Continuous","Conjunctions","Context Vocabulary"],   compStyle:"factual_plus",   mockRef:"nanhua_wa1_2025" },
  "Henry Park Primary": { style:"challenging", focusTopics:["Reflexive Pronouns","Present Perfect","Antonyms"],       compStyle:"long_inference", mockRef:"henry_park_wa2" },
  "Raffles Girls Prim": { style:"advanced",    focusTopics:["Past Perfect","Conjunctions","Synonyms"],                compStyle:"inference_heavy",mockRef:"nanyang_wa1_2025" },
  "CHIJ St Nicholas":   { style:"advanced",    focusTopics:["Subject-Verb Agreement","Prepositions","Antonyms"],      compStyle:"inference_heavy",mockRef:"nanyang_wa1_2025" },
  "Methodist Girls":    { style:"standard",    focusTopics:["Past Continuous","Question Words","Context Vocabulary"], compStyle:"factual_plus",   mockRef:"nanhua_wa1_2025" },
  "Tao Nan":            { style:"standard",    focusTopics:["Simple Past","Pronouns","Synonyms"],                     compStyle:"factual",        mockRef:"nanhua_wa1_2025" },
  "Maha Bodhi":         { style:"standard",    focusTopics:["Simple Past","Conjunctions","Context Vocabulary"],       compStyle:"factual",        mockRef:"nanhua_wa1_2025" },
};

export function getSchoolProfile(schoolName){
  if(!schoolName) return null;
  for(const [key,val] of Object.entries(SCHOOL_PAPER_MAP)){
    if(schoolName.toLowerCase().includes(key.toLowerCase())) return {...val, schoolKey:key};
  }
  return null;
}

