// Tag index over all practice sets + paper sidecar, built once on first use (client-side).
import { WA1_PRACTICE_SETS } from '@/data/p3/english/wa1_practice';
import { WA1_ZH_PRACTICE } from '@/data/p3/chinese/wa1_practice';
import WA1_ZH_DRILL from '@/data/p3/chinese/wa1_drill';
import { collectQuestions, buildTagIndex, similarQuestions } from '@/lib/similarItems';
import { confidentTaxonomyIds } from '@/lib/wrongNotebook';

let _idx = null;
export function getTagIndex() {
  if (!_idx) _idx = buildTagIndex(collectQuestions([WA1_PRACTICE_SETS, WA1_ZH_PRACTICE, WA1_ZH_DRILL || []]));
  return _idx;
}
export const taxonomyIdsFor = (id) => confidentTaxonomyIds(getTagIndex(), id);
export { similarQuestions };
