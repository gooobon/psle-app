-- Genius Project: parent report "level of questions solved" (issue #127). ADDITIVE ONLY: two new functions, no table changes.
-- Apply by hand in the Supabase SQL editor. Safe to re-run. The app works without it (only tagged items are rated until applied).
-- Returns aggregate counts only (no student ids), so one child's report can use the global first-try rate of an item or skill.
create or replace function public.item_first_try_stats(p_subject text, p_item_ids text[])
returns table(item_id text, attempts bigint, first_try bigint)
language sql security definer set search_path = public stable as $$
  select t.item_id, count(*)::bigint, count(*) filter (where t.first_try)::bigint
  from public.learning_trials t
  where t.subject = p_subject and t.server_graded = true and t.item_id = any(p_item_ids)
  group by t.item_id
$$;
create or replace function public.skill_first_try_stats(p_subject text, p_skills text[])
returns table(skill text, attempts bigint, first_try bigint)
language sql security definer set search_path = public stable as $$
  select t.skill, count(*)::bigint, count(*) filter (where t.first_try)::bigint
  from public.learning_trials t
  where t.subject = p_subject and t.server_graded = true and t.skill = any(p_skills)
  group by t.skill
$$;
revoke all on function public.item_first_try_stats(text, text[]) from public, anon;
revoke all on function public.skill_first_try_stats(text, text[]) from public, anon;
grant execute on function public.item_first_try_stats(text, text[]) to authenticated;
grant execute on function public.skill_first_try_stats(text, text[]) to authenticated;
