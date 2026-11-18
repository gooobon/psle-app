// App-facing helper. Paper and generated-comprehension tags live in the sidecar
// because those files are hand-authored or have no generator in the repo.
// Practice-set tags are fields on the items. Either source is enough.

import paperTags from '@/data/taxonomy/paperTags.json';
import {
  readItemTags as readItemTagsWithOverlay,
  buildTagIndex as buildTagIndexWithOverlay,
  collectQuestions,
  questionsWithConcept,
  questionsWithTrap,
  similarQuestions,
} from './similarItemsCore.js';

const overlay = (paperTags && paperTags.items) || {};

export function readItemTags(item) {
  return readItemTagsWithOverlay(item, overlay);
}

export function buildTagIndex(items) {
  return buildTagIndexWithOverlay(items, overlay);
}

export { collectQuestions, questionsWithConcept, questionsWithTrap, similarQuestions };
