-- Local e2e only. The runner applies this after db reset. It is not a product migration.
-- record_activity dates the row with Asia/Singapore today PLUS e2e_clock.shift_days,
-- so it matches the Next.js day-shift.cjs clock. shift_days 0 is the real day.
create table if not exists public.e2e_clock (
  id int primary key,
  shift_days int not null
);
insert into public.e2e_clock(id, shift_days) values (1, 0) on conflict (id) do update set shift_days = 0;
alter table public.e2e_clock enable row level security;

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
    updated_at         = now()
  where not (p_key = any (a.done_keys));
end $$;
revoke all on function public.record_activity(text,text,int,int,int) from public;
grant execute on function public.record_activity(text,text,int,int,int) to authenticated;
