-- Issue #148: parents can award a partial score (for example 1 of 2) on open-ended mock items. Additive only.
-- parent_marks = marks awarded by the parent. NULL = use parent_correct (true = full marks, false = 0), so existing rows are unchanged.
alter table public.exam_answers add column if not exists parent_marks smallint;
alter table public.exam_answers drop constraint if exists exam_answers_parent_marks_nonneg;
alter table public.exam_answers add constraint exam_answers_parent_marks_nonneg check (parent_marks is null or parent_marks >= 0);
