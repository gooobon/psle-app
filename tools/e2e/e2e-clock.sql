-- Local e2e only. The runner applies this after db reset. It is not a product migration.
-- Dates the activity row with Asia/Singapore today PLUS e2e_clock.shift_days, so it matches
-- the Next.js day-shift.cjs clock. shift_days 0 is the real day. Negative values are allowed
-- (the role-play anchors day 0 to a Thursday).
-- The function bodies match supabase/migrations/20261129000000_exam_attempts.sql. The only
-- difference is the date line. Do not drop the paper-placeholder first-set rule.
create table if not exists public.e2e_clock (
  id int primary key,
  shift_days int not null
);
insert into public.e2e_clock(id, shift_days) values (1, 0) on conflict (id) do update set shift_days = 0;
alter table public.e2e_clock enable row level security;

create or replace function public.record_paper_activity(
  p_user uuid, p_subject text, p_key text, p_questions int, p_correct int, p_minutes int
) returns void language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Asia/Singapore')::date
            + coalesce((select shift_days from public.e2e_clock where id = 1), 0);
begin
  if p_user is null or not exists (select 1 from public.profiles where id = p_user and role = 'student') then
    raise exception 'students only';
  end if;
  p_questions := greatest(0, least(coalesce(p_questions,0), 500));
  p_correct   := greatest(0, least(coalesce(p_correct,0), p_questions));
  p_minutes   := greatest(0, least(coalesce(p_minutes,0), 240));
  insert into public.daily_activity as a (user_id, date, subject, sets_completed, questions_answered, correct, minutes, done_keys,
                                          first_set_questions, first_set_correct)
    values (p_user, d, p_subject, 1, p_questions, p_correct, p_minutes, array[p_key], 0, 0)
  on conflict (user_id, date, subject) do update set
    sets_completed     = a.sets_completed + 1,
    questions_answered = a.questions_answered + excluded.questions_answered,
    correct            = a.correct + excluded.correct,
    minutes            = a.minutes + excluded.minutes,
    done_keys          = a.done_keys || excluded.done_keys,
    updated_at         = now()
  where not (p_key = any (a.done_keys));
end $$;
revoke all on function public.record_paper_activity(uuid,text,text,int,int,int) from public, anon, authenticated;
grant execute on function public.record_paper_activity(uuid,text,text,int,int,int) to service_role;

create or replace function public.record_activity(
  p_subject text, p_key text, p_questions int, p_correct int, p_minutes int
) returns void language plpgsql security definer set search_path = public as $$
declare
  d date := (now() at time zone 'Asia/Singapore')::date
            + coalesce((select shift_days from public.e2e_clock where id = 1), 0);
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
    first_set_questions = case when a.first_set_questions = 0 and excluded.first_set_questions > 0 then excluded.first_set_questions else a.first_set_questions end,
    first_set_correct   = case when a.first_set_questions = 0 and excluded.first_set_questions > 0 then excluded.first_set_correct   else a.first_set_correct   end,
    updated_at         = now()
  where not (p_key = any (a.done_keys));
end $$;
revoke all on function public.record_activity(text,text,int,int,int) from public;
grant execute on function public.record_activity(text,text,int,int,int) to authenticated;
