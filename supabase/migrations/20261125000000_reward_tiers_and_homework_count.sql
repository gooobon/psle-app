-- Genius Project: owner decisions on rewards + homework (issue #29). Extends 20261123/20261124; those files are NOT edited.
-- Apply by hand in the Supabase SQL editor AFTER 20261124000000_rewards.sql. Safe to re-run. Additive only: no rows are deleted or rewritten.
-- The ledger is RECORD ONLY. The app never moves real money.

-- 1) First-set score per subject per day. Written once, on the INSERT of the day's first set; later sets only change the
--    aggregates, never these two columns. Existing rows keep NULL (the server falls back to the totals when sets_completed = 1).
alter table public.daily_activity add column if not exists first_set_questions integer;
alter table public.daily_activity add column if not exists first_set_correct   integer;

create or replace function public.record_activity(
  p_subject text, p_key text, p_questions int, p_correct int, p_minutes int
) returns void language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Asia/Singapore')::date;
  uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not authenticated'; end if;
  if not exists (select 1 from public.profiles where id = uid and role = 'student') then
    raise exception 'students only';
  end if;
  p_questions := greatest(0, least(coalesce(p_questions,0), 500));
  p_correct   := greatest(0, least(coalesce(p_correct,0), p_questions));
  p_minutes   := greatest(0, least(coalesce(p_minutes,0), 240));
  insert into public.daily_activity as a (user_id, date, subject, sets_completed, questions_answered, correct, minutes, done_keys,
                                          first_set_questions, first_set_correct)
    values (uid, d, p_subject, 1, p_questions, p_correct, p_minutes, array[p_key], p_questions, p_correct)
  on conflict (user_id, date, subject) do update set
    sets_completed     = a.sets_completed + 1,
    questions_answered = a.questions_answered + excluded.questions_answered,
    correct            = a.correct + excluded.correct,
    minutes            = a.minutes + excluded.minutes,
    done_keys          = a.done_keys || excluded.done_keys,
    updated_at         = now()
  where not (p_key = any (a.done_keys));
end $$;
revoke all on function public.record_activity(text,text,int,int,int) from public;
grant execute on function public.record_activity(text,text,int,int,int) to authenticated;

-- 2) Versioned per-child reward rules. One row per (parent, child, effective_from SGT date). The rule in force on day D is the
--    row with the greatest effective_from <= D. The API only lets a parent write today or later, so history is never rewritten.
--    daily_tiers : [{"minPct":70,"credits":1},{"minPct":80,"credits":2},{"minPct":90,"credits":3}]  (highest matching tier wins)
--    weekly_unit : 'credits' | 'sgd'; weekly_amounts : {"English":2,"Chinese":2,...} in that unit, PER SUBJECT.
--    SGD amounts are converted to credits with sgd_per_credit of the rule in force on the award day: round(sgd / rate).
create table if not exists public.reward_rule_versions (
  parent_id       uuid not null references public.profiles(id) on delete cascade,
  child_id        uuid not null references public.profiles(id) on delete cascade,
  effective_from  date not null,
  enabled         boolean not null default false,
  sgd_per_credit  numeric(8,2) not null default 0 check (sgd_per_credit between 0 and 1000),
  daily_tiers     jsonb not null default '[]'::jsonb,
  weekly_unit     text not null default 'credits' check (weekly_unit in ('credits', 'sgd')),
  weekly_amounts  jsonb not null default '{}'::jsonb,
  updated_at      timestamptz not null default now(),
  primary key (parent_id, child_id, effective_from)
);
alter table public.reward_rule_versions enable row level security;
drop policy if exists reward_rule_versions_select on public.reward_rule_versions;
create policy reward_rule_versions_select on public.reward_rule_versions for select
  using (parent_id = auth.uid() and public.is_parent_of(child_id));
-- Deliberately no insert / update / delete policy: writes go through the API (service role).

-- Carry over enabled legacy rules once (flat per-day credits = a single 0% tier; weekly credits for every subject).
insert into public.reward_rule_versions(parent_id, child_id, effective_from, enabled, sgd_per_credit, daily_tiers, weekly_unit, weekly_amounts)
  select r.parent_id, r.child_id, (now() at time zone 'Asia/Singapore')::date, true, r.sgd_per_credit,
         case when r.credits_per_day > 0 then jsonb_build_array(jsonb_build_object('minPct', 0, 'credits', r.credits_per_day)) else '[]'::jsonb end,
         'credits',
         jsonb_build_object('English', r.credits_per_weekly, 'Chinese', r.credits_per_weekly, 'Math', r.credits_per_weekly, 'Science', r.credits_per_weekly)
    from public.reward_rules r where r.enabled
  on conflict do nothing;

-- 3) Credits are now per subject and keep a snapshot of how they were earned (later rule changes never touch them).
alter table public.reward_credits add column if not exists subject text not null default '';
alter table public.reward_credits add column if not exists score_pct integer;
alter table public.reward_credits add column if not exists rule_effective_from date;
alter table public.reward_credits drop constraint if exists reward_credits_uq;
alter table public.reward_credits drop constraint if exists reward_credits_subject_uq;
alter table public.reward_credits add constraint reward_credits_subject_uq unique (parent_id, child_id, kind, period, subject);

-- 4) Stickers only. Credits no longer come from the legacy flat reward_rules; award_credit() below does that.
create or replace function public.award_sticker(p_child uuid, p_kind text, p_period date)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if p_kind not in ('daily', 'weekly') then raise exception 'bad kind'; end if;
  insert into public.stickers(child_id, kind, period) values (p_child, p_kind, p_period)
    on conflict (child_id, kind, period) do nothing returning id into v_id;
  return json_build_object('awarded', v_id is not null, 'credited', 0);
end $$;
revoke all on function public.award_sticker(uuid, text, date) from public, anon, authenticated;
grant execute on function public.award_sticker(uuid, text, date) to service_role;

-- Idempotent credit award, called only by the server after it checked score tier / review / homework gate and computed the credits.
-- A repeat call for the same (parent, child, kind, period, subject) is a no-op. Returns { awarded: bool }.
create or replace function public.award_credit(
  p_parent uuid, p_child uuid, p_kind text, p_period date, p_subject text,
  p_credits int, p_rate numeric, p_score_pct int, p_effective date
) returns json language plpgsql security definer set search_path = public as $$
declare v_n int;
begin
  if p_kind not in ('daily', 'weekly') then raise exception 'bad kind'; end if;
  if p_credits is null or p_credits <= 0 then return json_build_object('awarded', false); end if;
  if not exists (select 1 from public.parent_child pc where pc.parent_id = p_parent and pc.child_id = p_child) then
    return json_build_object('awarded', false, 'error', 'not_linked');
  end if;
  insert into public.reward_credits(child_id, parent_id, kind, period, subject, credits, sgd_per_credit, score_pct, rule_effective_from)
    values (p_child, p_parent, p_kind, p_period, coalesce(p_subject, ''), p_credits, coalesce(p_rate, 0), p_score_pct, p_effective)
    on conflict (parent_id, child_id, kind, period, subject) do nothing;
  get diagnostics v_n = row_count;
  return json_build_object('awarded', v_n > 0);
end $$;
revoke all on function public.award_credit(uuid, uuid, text, date, text, int, numeric, int, date) from public, anon, authenticated;
grant execute on function public.award_credit(uuid, uuid, text, date, text, int, numeric, int, date) to service_role;

-- 5) Homework count is parent-set. The product cap of 10 is gone; only an abuse bound (100 per child per day) remains.
--    Signature unchanged, default raised, so existing callers keep working. Unsolved homework still does not carry over.
create or replace function public.assign_homework(
  p_parent uuid, p_child uuid, p_subject text, p_grade text, p_source text, p_questions text[], p_day date, p_cap int default 100
) returns json
language plpgsql security definer set search_path = public as $$
declare
  v_used int; v_new text[]; v_added int;
begin
  p_cap := least(coalesce(p_cap, 100), 100);
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

-- 6) Default similar questions per mistake (parent-editable; the app default is 3). Per parent, like the other parent_settings.
alter table public.parent_settings add column if not exists homework_per_mistake integer not null default 3
  check (homework_per_mistake between 1 and 100);
