/* Tag a question with concept ids and, where the item itself shows it, trap ids.
   Rules read the section, the author's topic label, and the learning tip.
   They never change stems or answers.
   Unknown ids throw: the catalogue in src/data/taxonomy/taxonomy.json is the allow-list.
*/
const tax = require('../../src/data/taxonomy/taxonomy.json');

const CONCEPT_IDS = new Set(tax.concepts.map((c) => c.id));
const TRAP_IDS = new Set(tax.traps.map((t) => t.id));

const SECTION_TOPICS = new Set([
  'GrammarMCQ', 'VocabMCQ', 'GrammarCloze', 'VocabCloze', 'Editing', 'Spelling',
  'Synthesis', 'SentenceCombining', 'Comprehension', 'ComprehensionOE',
  'ComprehensionMCQ', 'ComprehensionFIB', 'VisualText',
]);

const CERTAIN_PREP = new Set([
  'THROUGH', 'ON', 'IN', 'AT', 'BY', 'BEHIND', 'UNDER', 'OVER', 'NEAR', 'INTO',
  'DURING', 'FROM', 'WITH', 'BETWEEN', 'AMONG', 'BESIDE', 'ACROSS', 'ALONG',
  'AROUND', 'ABOVE', 'BELOW', 'AGAINST', 'TOWARDS', 'OFF', 'INSIDE', 'OUTSIDE',
  'WITHOUT', 'WITHIN', 'ONTO', 'ABOUT', 'OF',
]);
const CERTAIN_CONN = new Set([
  'ALTHOUGH', 'BECAUSE', 'UNLESS', 'IF', 'WHEN', 'BUT', 'HOWEVER', 'THEREFORE',
  'UNTIL', 'THOUGH', 'SO', 'WHILE',
]);
const CERTAIN_PRON = new Set([
  'THEY', 'SHE', 'HE', 'WE', 'US', 'THEM', 'HIM', 'HER', 'IT', 'ME', 'THEIR',
  'HIS', 'OUR', 'YOUR', 'ITS', 'THEMSELVES', 'HIMSELF', 'HERSELF', 'MYSELF',
  'OURSELVES',
]);
const AMBIGUOUS_LEAD = new Set(['BEFORE', 'AFTER', 'SINCE', 'AS', 'TO', 'FOR']);

const GRAMMAR_RULES = [
  { id: 'en.grammar.reported_speech', re: /reported speech|ASKED \+ IF|ASKED \+ WH|NEVER TO |change 'you'|change 'your'|told the class NEVER/i },
  { id: 'en.grammar.relative_clause', re: /relative pronoun|Use 'which'|Use 'that' to add|WHICH =|place 'which'|which' immediately/i },
  { id: 'en.grammar.conditional', re: /\bconditional\b|IF \+ simple present|UNLESS \+|AS LONG AS \+|AS SOON AS \+|UNLESS =/i },
  { id: 'en.grammar.passive', re: /\bpassive\b|WAS\/WERE \+ past participle|subject \+ WAS\/WERE \+ past participle/i },
  { id: 'en.grammar.past_continuous', re: /past continuous|ongoing background|was -ing|WHILE \+ ongoing|interrupted action|sudden past event|was already|were already/i },
  { id: 'en.grammar.present_continuous', re: /present continuous|'Right now'/i },
  { id: 'en.grammar.past_perfect', re: /past perfect|HAD \+ past participle/i },
  { id: 'en.grammar.present_perfect', re: /present perfect|HAS \+ past participle|HAVE \+ past participle/i },
  { id: 'en.grammar.question_tag', re: /question tag|negative tag|positive tag/i },
  { id: 'en.grammar.subject_verb_agreement', re: /NOBODY|EVERYONE|SOMEONE|EVERYBODY|SOMEBODY|Plural subject|singular indefinite|subject-verb agreement|subject verb agreement|THERE (IS|ARE|WAS|WERE)\b|ONE family = singular|head noun/i },
  { id: 'en.grammar.comparative', re: /comparative|Short adjective \+ -ER|MORE \+ adjective|more bigger|superlative|THE MOST \+/i },
  { id: 'en.grammar.quantifier', re: /LITTLE \+ uncountable|quantifier|\bFEW \+|MANY \+|MUCH \+|A LITTLE|A FEW|A LOT OF|A GREAT DEAL OF/i },
  { id: 'en.grammar.gerund_infinitive', re: /verb-ing \(same subject\)|AFTER \+ verb-ing|AS WELL AS \+ verb-ing|would rather \+ base|gerund|infinitive/i },
  { id: 'en.grammar.modals', re: /modal verb|After modal|DID NOT \+ BASE|after auxiliaries|BASE FORM/i },
  { id: 'en.grammar.possessive', re: /YOUR = belonging|possessive determiner|possessive pronoun|\bpossessive\b|belonging to/i },
  { id: 'en.grammar.pronoun', re: /subject pronoun|object pronoun|reflexive pronoun|OBJECT pronoun|THEMSELVES =/i },
  { id: 'en.grammar.adverb', re: /use an ADVERB|\badverb\b/i },
  { id: 'en.grammar.adjective', re: /linking verb|ADJECTIVE form|use an ADJECTIVE|use ADJECTIVE/i },
  { id: 'en.grammar.connector', re: /\bALTHOUGH\b|\bBECAUSE\b|SO THAT|Cause \+ SO \+|connector|conjunction/i },
  { id: 'en.grammar.preposition', re: /\bpreposition\b/i },
  { id: 'en.grammar.simple_past', re: /irregular past|simple past|→ TOOK|→ WENT|→ RAN|→ TOLD|NEVER 'taked'|NEVER 'goed'|last year|last tuesday|told in the past|is regular:/i },
  { id: 'en.grammar.simple_present', re: /simple present|regular habit|every year/i },
  { id: 'en.grammar.simple_future', re: /simple future|will \+ base/i },
  { id: 'en.grammar.word_form', re: /word form|noun form|adjective form|adverb form/i },
  { id: 'en.grammar.article_determiner', re: /\barticles?\b|a\/an\/the|use 'a'|use 'an'|use 'the'/i },
];

const SPELLING_RE = /I before E|spelling|-f → -ves|silent -e|HEAR =|HERE =|THEIR =|THERE =|IT'S =|ITS =|THEY'RE/i;
const LOOKALIKE_RE = /HEAR =|HERE =|THEIR =|THERE =|IT'S =|ITS =|THEY'RE/i;
const OVERGENERALISE_RE = /more bigger|never add BOTH|ALWAYS WRONG/i;
const NEGATION_RE = /\bwhich\b[^?\n]{0,80}\bnot\b|\bexcept\b|哪[一个项][^。\n]{0,16}不|不正确的是|哪一项不是|哪一个不是/i;
const IDIOM_RE = /^IDIOM\b|\bidiom\b/i;
const PHRASAL_RE = /PHRASAL VERB/i;
const FIGURATIVE_RE = /AS \+ adj \+ AS|\bsimile\b/i;

function assertKnown(ids, set, kind) {
  for (const id of ids) {
    if (!set.has(id)) throw new Error('unknown ' + kind + ' id: ' + id);
  }
}

function uniq(list) {
  const out = [];
  for (const id of list || []) if (id && !out.includes(id)) out.push(id);
  return out;
}

function finish(conceptIds, taxonomyStatus, traps) {
  const concepts = uniq(conceptIds);
  const trapIds = uniq(traps);
  assertKnown(concepts, CONCEPT_IDS, 'concept');
  assertKnown(trapIds, TRAP_IDS, 'trap');
  if (!concepts.length) return null;
  const tag = { conceptIds: concepts, taxonomyStatus: taxonomyStatus || 'uncertain' };
  if (trapIds.length) tag.trapIds = trapIds;
  return tag;
}

function leadWord(tip) {
  const m = String(tip || '').trim().match(/^['"]?([A-Za-z]+)/);
  return m ? m[1].toUpperCase() : '';
}

function matchGrammar(text) {
  for (const rule of GRAMMAR_RULES) {
    if (rule.re.test(text)) return rule.id;
  }
  return null;
}

function leadGrammar(tip) {
  const word = leadWord(tip);
  if (!word) return null;
  if (AMBIGUOUS_LEAD.has(word)) return { id: 'en.grammar', status: 'uncertain' };
  if (CERTAIN_PREP.has(word)) return { id: 'en.grammar.preposition', status: 'certain' };
  if (CERTAIN_CONN.has(word)) return { id: 'en.grammar.connector', status: 'certain' };
  if (CERTAIN_PRON.has(word)) return { id: 'en.grammar.pronoun', status: 'certain' };
  return null;
}

function extraTraps(text, stem, conceptId) {
  const traps = [];
  const blob = (stem || '') + '\n' + (text || '');
  if (NEGATION_RE.test(blob)) traps.push('trap.negation');
  if (OVERGENERALISE_RE.test(text || '')) traps.push('trap.rule_overgeneralise');
  if (conceptId === 'en.vocab.idiom' || IDIOM_RE.test(text || '')) traps.push('trap.literal_idiom');
  if (LOOKALIKE_RE.test(text || '')) traps.push('trap.lookalike');
  return traps;
}

function keywordTrap(solution) {
  if (!solution || typeof solution !== 'object') return [];
  const trap = solution.trap;
  if (typeof trap !== 'string') return [];
  const trimmed = trap.trim();
  if (!trimmed || /^[A-D]$/i.test(trimmed)) return [];
  if (trimmed.length > 140) return [];
  return ['trap.keyword_lift'];
}

/* Open-ended comprehension is two skills: fact-finding (the answer is written in the
   passage) and inference (the student has to work out a feeling, lesson, or motive).
   A bare "why" is not enough. The author's tip decides when it is clear, and a mixed
   or thin cue is uncertain. */
function tagOpenEnded(stem, solution, traps, extra) {
  const fromSolutionTip = solution && typeof solution.tip === 'string' ? solution.tip : '';
  const fromSolutionMethod = solution && typeof solution.method === 'string' ? solution.method : '';
  const tip = fromSolutionTip || (extra && extra.tip) || '';
  const method = fromSolutionMethod || (extra && extra.method) || '';
  const head = String(stem || '');
  const guide = [tip, method].filter(Boolean).join('\n');
  const blob = head + '\n' + guide;
  if (/\binfer|\binference|\binferring|character trait with evidence/i.test(method) && !/\bliteral\b/i.test(method)) {
    return finish(['en.reading.inference'], 'certain', traps);
  }
  if (/\b(literal|fact-finding|retrieval|stated detail)\b/i.test(method)) {
    return finish(['en.reading.fact_finding'], 'certain', traps);
  }
  const factCue = /\b(look for|look at\b|read the last paragraph|read paragraph|use .{0,50}own words|use (the|his|her|their|two) .{0,40}(words|note|explanation|details)|use (information|evidence|details) from|list all|given in paragraph|key phrase|the reason the \w+ gave|specific details|use the conversation|include both|find the reason|find evidence)\b/i.test(guide);
  const inferCue = /\b(do you think|think about|unusual|unexpected|moral|valued most|meant to|lesson|not just|in your own|add your own|connect|how .{0,40}feel)\b/i.test(blob);
  if (factCue && !inferCue) return finish(['en.reading.fact_finding'], 'certain', traps);
  if (inferCue && !factCue) return finish(['en.reading.inference'], 'certain', traps);
  if (factCue && inferCue) {
    const factWins = /\b(look for|look at\b|list all|given in paragraph|own words|key phrase|use (information|evidence|details) from|specific details)\b/i.test(guide);
    return finish([factWins ? 'en.reading.fact_finding' : 'en.reading.inference'], 'uncertain', traps);
  }
  const why = /^(why|how come)\b/i.test(head) || /\bdo you think\b/i.test(head);
  const howKnow = /^how (do|did|does) we know\b/i.test(head);
  if (howKnow || why) return finish(['en.reading.inference'], 'uncertain', traps);
  if (/^(who|when|where|which|how many|how much|what|how)\b/i.test(head)) {
    return finish(['en.reading.fact_finding'], 'uncertain', traps);
  }
  return finish(['en.reading.fact_finding'], 'uncertain', traps);
}

function tagComp(format, stem, solution, traps, section, extra) {
  const local = traps.slice();
  if (format === 'sequence') {
    local.push('trap.sequence_order');
    return finish(['en.reading.sequence'], 'certain', local);
  }
  if (format === 'fill_word') {
    local.push(...keywordTrap(solution));
    return finish(['en.reading.vocab_in_context'], 'certain', local);
  }
  if (format === 'fill_blank' || format === 'ab_circle') {
    local.push(...keywordTrap(solution));
    return finish(['en.reading.detail'], 'certain', local);
  }
  if (format === 'true_false' || format === 'tf_reason') {
    local.push(...keywordTrap(solution));
    return finish(['en.reading.true_false'], 'certain', local);
  }
  if (format === 'open_sentence') {
    return tagOpenEnded(stem, solution, local, extra);
  }
  if (format === 'mcq') {
    local.push(...keywordTrap(solution));
    if (/^(why|how come)\b|what lesson|what can (we|you) learn|what does this (tell|show|suggest)|main idea|best title|best lesson/i.test(stem || '')) {
      return finish(['en.reading.inference'], 'certain', local);
    }
    return finish(['en.reading.detail'], 'uncertain', local);
  }
  return finish(['en.reading'], 'uncertain', local);
}

/* Author-written topic labels on past papers (not the section codes).
   First match wins. Keep specific patterns above broad ones. */
const TOPIC_LABEL_RULES = [
  { re: /subject-verb|indefinite pronoun \(negative/i, id: 'en.grammar.subject_verb_agreement' },
  { re: /past perfect/i, id: 'en.grammar.past_perfect' },
  { re: /past continuous|verb tense \(past continuous\)|simultaneous\/resulting/i, id: 'en.grammar.past_continuous' },
  { re: /present continuous/i, id: 'en.grammar.present_continuous' },
  { re: /simple past|verb tense \(simple past\)/i, id: 'en.grammar.simple_past' },
  { re: /simple present|habitual/i, id: 'en.grammar.simple_present' },
  { re: /future tense/i, id: 'en.grammar.simple_future' },
  { re: /question tag/i, id: 'en.grammar.question_tag' },
  { re: /comparative/i, id: 'en.grammar.comparative' },
  { re: /quantifier/i, id: 'en.grammar.quantifier' },
  { re: /gerund|infinitive/i, id: 'en.grammar.gerund_infinitive' },
  { re: /modal/i, id: 'en.grammar.modals' },
  { re: /collective noun|abstract noun/i, id: 'en.grammar.noun' },
  { re: /reflexive|object pronoun|subject pronoun|possessive pronoun|demonstrative pronoun/i, id: 'en.grammar.pronoun' },
  { re: /preposition \/ adverb|adverb\/conjunct/i, ids: ['en.grammar.preposition', 'en.grammar.adverb'], status: 'uncertain' },
  { re: /preposition/i, id: 'en.grammar.preposition' },
  { re: /^adverb\b/i, id: 'en.grammar.adverb' },
  { re: /^adjective\b/i, id: 'en.grammar.adjective' },
  { re: /conjunction|synthesis using|so \(cause|^before \(sequence\)/i, id: 'en.grammar.connector' },
  { re: /conditional/i, id: 'en.grammar.conditional' },
  { re: /phrasal verb/i, id: 'en.vocab.phrasal_verb' },
  { re: /simile \/ idiom|idiom —|idiom\b/i, id: 'en.vocab.idiom' },
  { re: /simile/i, id: 'en.vocab.figurative' },
  { re: /spelling/i, id: 'en.language.editing_spelling' },
  { re: /pronoun reference/i, id: 'en.reading.reference' },
  { re: /sequence/i, id: 'en.reading.sequence' },
  { re: /true\s*\/\s*false|true\/false/i, id: 'en.reading.true_false' },
  { re: /inference|character trait with evidence/i, id: 'en.reading.inference' },
  { re: /^literal\b/i, id: 'en.reading.detail' },
  { re: /synonym from text|word meaning/i, id: 'en.reading.vocab_in_context' },
  { re: /vocabulary|contextual vocabulary|^verb\b|^noun —|^emotion vocabulary/i, id: 'en.vocab.in_context' },
  { re: /^emotion\b/i, id: 'en.reading.inference' },
  { re: /visual|contact information|sponsor identification|discount identification|activity matching/i, id: 'en.reading.visual_text' },
];

function tagTopicLabel(topic) {
  if (!topic || SECTION_TOPICS.has(topic)) return null;
  for (const rule of TOPIC_LABEL_RULES) {
    if (!rule.re.test(topic)) continue;
    if (rule.ids) return finish(rule.ids, rule.status || 'uncertain', []);
    const traps = [];
    if (rule.id === 'en.vocab.idiom') traps.push('trap.literal_idiom');
    if (rule.id === 'en.reading.sequence') traps.push('trap.sequence_order');
    return finish([rule.id], 'certain', traps);
  }
  return null;
}

function refineWithMethod(tag, method) {
  if (!method) return tag;
  const labeled = tagTopicLabel(method);
  if (!labeled || labeled.taxonomyStatus !== 'certain') return tag;
  if (tag && !labeled.conceptIds.every((id) => tag.conceptIds.some((parent) => id === parent || id.startsWith(parent + '.')))) {
    return tag;
  }
  const traps = [...(labeled.trapIds || []), ...((tag && tag.trapIds) || [])];
  return finish(labeled.conceptIds, 'certain', traps);
}

function tagEnglish(input) {
  return refineWithMethod(classifyEnglish(input), input && input.method);
}

function classifyEnglish(input) {
  const section = input.section || input.topic || '';
  const tip = input.tip || '';
  const instruction = input.instruction || '';
  const stem = input.stem || input.question || input.q || '';
  const text = [tip, instruction].filter(Boolean).join('\n');
  const format = input.format || '';
  const solution = input.solution || null;

  if (section === 'Comprehension' || section === 'ComprehensionOE' || section === 'ComprehensionMCQ' || section === 'ComprehensionFIB') {
    return tagComp(format, stem || text, solution, extraTraps(text, stem, null), section, { tip, method: input.method || '' });
  }
  if (section === 'VisualText') {
    return finish(['en.reading.visual_text'], 'certain', extraTraps(text, stem, null));
  }
  if (section === 'VocabMCQ' || section === 'VocabCloze') {
    let concept = 'en.vocab.in_context';
    if (IDIOM_RE.test(text)) concept = 'en.vocab.idiom';
    else if (PHRASAL_RE.test(text)) concept = 'en.vocab.phrasal_verb';
    else if (FIGURATIVE_RE.test(text)) concept = 'en.vocab.figurative';
    return finish([concept], 'certain', extraTraps(text, stem, concept));
  }
  if (section === 'GrammarMCQ' || section === 'GrammarCloze') {
    const matched = matchGrammar(text);
    const lead = leadGrammar(tip);
    if (matched) return finish([matched], 'certain', extraTraps(text, stem, matched));
    if (lead) return finish([lead.id], lead.status, extraTraps(text, stem, lead.id));
    return finish(['en.grammar'], 'uncertain', extraTraps(text, stem, null));
  }
  if (section === 'Editing' || section === 'Spelling') {
    const traps = extraTraps(text, stem, null);
    if (section === 'Spelling' || SPELLING_RE.test(text)) {
      if (LOOKALIKE_RE.test(text)) traps.push('trap.lookalike');
      return finish(['en.language.editing_spelling'], 'certain', traps);
    }
    const matched = matchGrammar(text);
    if (matched) return finish([matched], 'certain', traps);
    return finish(['en.language.editing'], 'uncertain', traps);
  }
  if (section === 'Synthesis' || section === 'SentenceCombining') {
    const matched = matchGrammar(text);
    if (matched) return finish([matched], 'certain', extraTraps(text, stem, matched));
    return finish(['en.language.synthesis'], 'uncertain', extraTraps(text, stem, null));
  }

  const labeled = tagTopicLabel(section);
  if (labeled) {
    const traps = extraTraps(text, stem, labeled.conceptIds[0]);
    if (labeled.trapIds) traps.push(...labeled.trapIds);
    return finish(labeled.conceptIds, labeled.taxonomyStatus, traps);
  }
  return null;
}

function tagChineseBySkill(skill) {
  const concept = tax.zhSkillToConcept[skill];
  if (!concept) return null;
  const traps = tax.zhLookalikeSkills.includes(skill) ? ['trap.lookalike'] : [];
  return finish([concept], 'certain', traps);
}

function tagChineseByTopic(topic, stem) {
  const row = tax.zhTopicDefaults[topic];
  if (!row) return null;
  const traps = (row.trapIds || []).slice();
  if (stem && NEGATION_RE.test(stem)) traps.push('trap.negation');
  return finish(row.conceptIds, row.taxonomyStatus, traps);
}

/* The author's method line is the item's own skill note. A clear leaf replaces a
   coarser section tag. A section that is already a certain leaf is left alone
   unless the method names that same leaf or one of its children. */
const ZH_METHOD_RULES = [
  { re: /同音字|tongyinzi/i, id: 'zh.hanzi.tongyinzi', traps: ['trap.lookalike'] },
  { re: /形近|同形旁|similar-looking character|xingjinzi/i, id: 'zh.hanzi.xingjinzi', traps: ['trap.lookalike'] },
  { re: /多音|duoyinzi/i, id: 'zh.hanzi.duoyinzi', traps: [] },
  { re: /声母|韵母|initial \(.*\) and final/i, id: 'zh.pinyin.shengmu_yunmu', traps: [] },
  { re: /声调|identifying the tones/i, id: 'zh.pinyin.shengdiao', traps: [] },
  { re: /近义|synonym/i, id: 'zh.ciyu.jinyici', traps: [] },
  { re: /反义|antonym/i, id: 'zh.ciyu.fanyici', traps: [] },
  { re: /量词|measure word/i, id: 'zh.ciyu.liangci', traps: [] },
  { re: /搭配|collocation/i, id: 'zh.ciyu.dapei', traps: [] },
  { re: /成语|idiom/i, id: 'zh.ciyu.chengyu', traps: ['trap.literal_idiom'] },
  { re: /关联词|连词/i, id: 'zh.yufa.lianci', traps: [] },
  { re: /语序|把字|word order/i, id: 'zh.yufa.word_order', traps: [] },
  { re: /主旨|道理|main idea|the lesson/i, id: 'zh.reading.main_idea', traps: [] },
  { re: /推断|推测|\binferr|\binference/i, id: 'zh.reading.inference', traps: [] },
  { re: /细节|直接信息|direct information|clearly stated|stated in the passage/i, id: 'zh.reading.detail', traps: [] },
  { re: /顺序|sequence of|in the order/i, id: 'zh.reading.sequence', traps: ['trap.sequence_order'] },
];

function tagChineseItem(input) {
  const src = input || {};
  const topic = src.topic || '';
  const stem = src.stem || '';
  const skill = src.skill;
  if (skill && tax.zhSkillToConcept[skill]) return tagChineseBySkill(skill);
  const sectionTag = tagChineseByTopic(topic, stem);
  const text = String(src.method || '');
  let cue = null;
  for (const rule of ZH_METHOD_RULES) {
    if (rule.re.test(text)) { cue = rule; break; }
  }
  if (!cue) return sectionTag;
  const sectionIds = (sectionTag && sectionTag.conceptIds) || [];
  const underSection = sectionIds.some((id) => cue.id === id || cue.id.startsWith(id + '.'));
  // Only a skill under this section counts as the item's own skill. A method that
  // names some other subject area is not used, so an uncertain section stays on
  // its section tag and similar-question lookup can fall back to the trap.
  if (!sectionTag || underSection) {
    const traps = [...(cue.traps || []), ...((sectionTag && sectionTag.trapIds) || [])];
    if (stem && NEGATION_RE.test(stem)) traps.push('trap.negation');
    return finish([cue.id], 'certain', traps);
  }
  return sectionTag;
}

function applyTag(target, tag) {
  if (!tag) return target;
  target.conceptIds = tag.conceptIds;
  target.taxonomyStatus = tag.taxonomyStatus;
  if (tag.trapIds && tag.trapIds.length) target.trapIds = tag.trapIds;
  return target;
}

module.exports = {
  CONCEPT_IDS,
  TRAP_IDS,
  SECTION_TOPICS,
  tagEnglish,
  tagChineseBySkill,
  tagChineseByTopic,
  tagChineseItem,
  tagOpenEnded,
  tagTopicLabel,
  applyTag,
  finish,
};
