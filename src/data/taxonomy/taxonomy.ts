// Concept and trap catalogue, v1 DRAFT.
// Source of truth for ids: ./taxonomy.json. Review copy: docs/taxonomy.md.
// Ids are stable. Add new ids; do not rename one that has been tagged onto items.
// TODO(owner): approve or split leaves before the wrong-answer notebook ships.

import taxonomy from './taxonomy.json';

export const TAXONOMY_VERSION = taxonomy.version;
export const TAXONOMY_STATUS = taxonomy.status;

export type SubjectId = 'english' | 'chinese' | 'math' | 'science';
export type TaxonomyTagStatus = 'certain' | 'uncertain';

export interface Concept {
  id: string;
  subject: SubjectId;
  parent: string | null;
  topic: string;
  skill: string;
  label: string;
  level: string;
}

export interface Trap {
  id: string;
  label: string;
  description: string;
  notebookCause: string;
  autoTagged: boolean;
}

export interface NotebookCause {
  id: string;
  label: string;
  studentPrompt: string;
}

export const CONCEPTS: Concept[] = taxonomy.concepts as Concept[];
export const TRAPS: Trap[] = taxonomy.traps as Trap[];
export const NOTEBOOK_CAUSES: NotebookCause[] = taxonomy.notebookCauses as NotebookCause[];

const conceptByIdMap = new Map(CONCEPTS.map((c) => [c.id, c]));
const trapByIdMap = new Map(TRAPS.map((t) => [t.id, t]));
const childrenByParent = new Map<string, string[]>();
for (const concept of CONCEPTS) {
  if (!concept.parent) continue;
  const list = childrenByParent.get(concept.parent) || [];
  list.push(concept.id);
  childrenByParent.set(concept.parent, list);
}

export function isConceptId(id: string): boolean {
  return conceptByIdMap.has(id);
}

export function isTrapId(id: string): boolean {
  return trapByIdMap.has(id);
}

export function conceptById(id: string): Concept | undefined {
  return conceptByIdMap.get(id);
}

export function trapById(id: string): Trap | undefined {
  return trapByIdMap.get(id);
}

/** The id itself plus every descendant. Unknown ids return [id] so callers can still query. */
export function conceptIdsUnder(id: string): string[] {
  const out: string[] = [];
  const stack = [id];
  const seen = new Set<string>();
  while (stack.length) {
    const current = stack.pop() as string;
    if (seen.has(current)) continue;
    seen.add(current);
    out.push(current);
    for (const child of childrenByParent.get(current) || []) stack.push(child);
  }
  return out;
}

export function conceptsBySubject(subject: SubjectId): Concept[] {
  return CONCEPTS.filter((c) => c.subject === subject);
}
