// Shared loose types for P3 English past papers. Restored in Step 1 so
// typecheck can run. Permissive on purpose - see chinese/types.ts.
export interface PaperQuestion { id?: string; [key: string]: unknown; }
export interface PaperMeta { [key: string]: unknown; }
export interface QuestionSet {
  id?: string;
  passage?: string;
  questions?: PaperQuestion[];
  [key: string]: unknown;
}
export interface ExamPaper {
  meta?: PaperMeta;
  questions?: PaperQuestion[];
  sets?: QuestionSet[];
  [key: string]: unknown;
}
export type PaperSet = QuestionSet;
export type EnglishPaper = ExamPaper;
