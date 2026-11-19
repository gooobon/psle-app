// Tag index over all practice sets + paper sidecar, built once on first use (client-side).
// Practice questions are the similar-question candidates (they can be run again).
// Past-paper rows are added to byId only, so a paper mistake can be the seed.
// They are not offered as the "3 similar" practice items.
import { WA1_PRACTICE_SETS } from '@/data/p3/english/wa1_practice';
import { WA1_ZH_PRACTICE } from '@/data/p3/chinese/wa1_practice';
import WA1_ZH_DRILL from '@/data/p3/chinese/wa1_drill';
import paperTags from '@/data/taxonomy/paperTags.json';
import { collectQuestions, buildTagIndex, similarQuestions } from '@/lib/similarItems';
import { confidentTaxonomyIds } from '@/lib/wrongNotebook';

let _idx = null;
export function getTagIndex() {
  if (!_idx) {
    _idx = buildTagIndex(collectQuestions([WA1_PRACTICE_SETS, WA1_ZH_PRACTICE, WA1_ZH_DRILL || []]));
    const items = (paperTags && paperTags.items) || {};
    for (const id of Object.keys(items)) {
      if (_idx.byId[id]) continue;
      const row = items[id] || {};
      _idx.byId[id] = {
        id,
        item: { id },
        conceptIds: Array.isArray(row.conceptIds) ? row.conceptIds : [],
        trapIds: Array.isArray(row.trapIds) ? row.trapIds : [],
        taxonomyStatus: row.taxonomyStatus,
        fromPaper: true,
      };
    }
  }
  return _idx;
}
export const taxonomyIdsFor = (id) => confidentTaxonomyIds(getTagIndex(), id);
export { similarQuestions };
