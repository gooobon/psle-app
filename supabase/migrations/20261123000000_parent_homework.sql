-- Genius Project: roadmap step 8 (parent homework from mistakes).
-- Apply by hand in the Supabase SQL editor AFTER 20261122000000_wrong_answers.sql. Safe to re-run.
-- Parents (linked via parent_child, several parents per child allowed) assign "similar question" homework
-- for a child's mistake. Reads: the student (own rows) and linked guardians (public.is_parent_of).
-- NO client insert/update/delete policies: all writes go through API routes (service role) after checks.
-- Daily cap (max 10 per child per day, all parents + subjects combined) is enforced in assign_homework().

create table if not exists public.parent_homework (
  id            uuid primary key default gen_random_uuid(),
  child_id      uuid not null references public.profiles(id) on delete cascade,
  assigned_by   uuid references public.profiles(id) on delete set null,   -- the parent
  subject       text not null,                    -- English / Chinese / Math / Science
  grade         text,
  source_question_id text not null,               -- the mistake this homework is about
  question_id   text not null,                    -- the similar question to answer
  assigned_for  date not null,                    -- Singapore-local day the homework is due
  solved_at     timestamptz,
  correct       boolean,
  created_at    timestamptz not null default now(),
  constraint parent_homework_uq unique (child_id, subject, question_id, assigned_for)
);
create index if not exists parent_homework_child_day_idx on public.parent_homework(child_id, assigned_for);

alter table public.parent_homework enable row level security;

drop policy if exists parent_homework_select on public.parent_homework;
create policy parent_homework_select on public.parent_homework for select
  using (child_id = auth.uid() or public.is_parent_of(child_id));
-- Deliberately no insert / update / delete policy.

-- Atomic, capped assignment. Called only by the server (service role). Returns json:
--   { ok, assigned, skipped, used, cap, remaining }  or  { ok:false, error:'cap', used, cap, remaining }
-- Blocks (does not roll over) when the request would exceed the cap; already-assigned questions are skipped, not double-counted.
create or replace function public.assign_homework(
  p_parent uuid, p_child uuid, p_subject text, p_grade text, p_source text, p_questions text[], p_day date, p_cap int default 10
) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_used int; v_new text[]; v_added int;
begin
  if not exists (select 1 from public.parent_child pc where pc.parent_id = p_parent and pc.child_id = p_child) then
    return json_build_object('ok', false, 'error', 'not_linked');
  end if;
  perform pg_advisory_xact_lock(hashtext('parent_homework:' || p_child::text || ':' || p_day::text));
  select count(*) into v_used from public.parent_homework where child_id = p_child and assigned_for = p_day;
  select coalesce(array_agg(q), '{}') into v_new
    from (select distinct q from unnest(p_questions) q
          where not exists (select 1 from public.parent_homework h
            where h.child_id = p_child and h.subject = p_subject and h.question_id = q and h.assigned_for = p_day)) s;
  if v_used + coalesce(array_length(v_new, 1), 0) > p_cap then
    return json_build_object('ok', false, 'error', 'cap', 'used', v_used, 'cap', p_cap, 'remaining', greatest(p_cap - v_used, 0));
  end if;
  insert into public.parent_homework(child_id, assigned_by, subject, grade, source_question_id, question_id, assigned_for)
    select p_child, p_parent, p_subject, p_grade, p_source, q, p_day from unnest(v_new) q
    on conflict do nothing;
  get diagnostics v_added = row_count;
  return json_build_object('ok', true, 'assigned', v_added, 'skipped', coalesce(array_length(p_questions, 1), 0) - v_added,
    'used', v_used + v_added, 'cap', p_cap, 'remaining', greatest(p_cap - v_used - v_added, 0));
end $$;
revoke all on function public.assign_homework(uuid, uuid, text, text, text, text[], date, int) from public, anon, authenticated;
grant execute on function public.assign_homework(uuid, uuid, text, text, text, text[], date, int) to service_role;
