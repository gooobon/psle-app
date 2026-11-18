-- Genius Project: server step 2/5 (daily activity log, many-to-many guardians, alert channels).
-- Apply by hand in the Supabase SQL editor AFTER 20261118000000_init.sql. Safe to re-run (idempotent).

-- 1) Many parents per child: drop the one-parent-per-child constraint.
alter table public.parent_child drop constraint if exists parent_child_child_id_key;
create index if not exists parent_child_child_idx on public.parent_child(child_id);

-- 2) Parent email on the profile (used to link a second parent by email). Lower-cased by the API.
alter table public.profiles add column if not exists email text;
create unique index if not exists profiles_parent_email_uq on public.profiles(lower(email)) where role = 'parent' and email is not null;
-- Backfill from auth.users for parents created in step 1.
update public.profiles p set email = lower(u.email)
  from auth.users u where u.id = p.id and p.role = 'parent' and p.email is null;

-- 3) Alert channels: a list, so email now and whatsapp later (or both) per parent.
--    Shape: [{"type":"email","enabled":true,"address":"a@b.c"},
--            {"type":"whatsapp","enabled":false,"address":"+6591234567","opt_in":false}]
alter table public.parent_settings add column if not exists alert_channels jsonb not null default '[]'::jsonb;
update public.parent_settings
  set alert_channels = jsonb_build_array(jsonb_build_object('type','email','enabled',true,'address',alert_email))
  where alert_channels = '[]'::jsonb and alert_email is not null;

-- 4) Daily activity (one row per user, Singapore-local date, subject).
create table if not exists public.daily_activity (
  user_id            uuid not null references public.profiles(id) on delete cascade,
  date               date not null,                -- Asia/Singapore local date
  subject            text not null,
  sets_completed     integer not null default 0,
  questions_answered integer not null default 0,
  correct            integer not null default 0,
  minutes            integer not null default 0,
  done_keys          text[] not null default '{}', -- completion ids already counted (makes retries idempotent)
  updated_at         timestamptz not null default now(),
  primary key (user_id, date, subject)
);
alter table public.daily_activity enable row level security;

-- Every linked parent can read; the student reads own rows.
drop policy if exists daily_activity_select on public.daily_activity;
create policy daily_activity_select on public.daily_activity for select
  using (user_id = auth.uid() or public.is_parent_of(user_id));
-- No direct client writes and NO delete policy: writes go through record_activity() below.

-- Idempotent upsert for the calling student. Same p_key twice for the same day/subject is a no-op.
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
  insert into public.daily_activity as a (user_id, date, subject, sets_completed, questions_answered, correct, minutes, done_keys)
    values (uid, d, p_subject, 1, p_questions, p_correct, p_minutes, array[p_key])
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
