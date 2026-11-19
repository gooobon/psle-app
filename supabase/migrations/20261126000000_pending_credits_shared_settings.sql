-- Genius Project: owner decisions on issue #32. Extends 20261124/20261125; those files are NOT edited.
-- Apply by hand in the Supabase SQL editor AFTER 20261125000000_reward_tiers_and_homework_count.sql. Safe to re-run.
-- Additive only: no rows are deleted. Existing credits become/stay 'confirmed' (nothing already earned is lost or delayed).
-- The ledger is RECORD ONLY. The app never moves real money.
-- ORDER OF DEPLOY: apply this migration BEFORE merging/deploying the code in the same PR (the new code calls award_credit with a new
-- signature, finalize_credits(), and reads child_setting_versions / reward_credits.status; the OLD code keeps working against the new
-- schema except that its 9-argument award_credit() is dropped here, so an old deploy could not award credits until the new code is live).

-- 1) Credit status. Existing rows keep 'confirmed' (the column is added with that default); NEW rows default to 'pending'.
--    pending   = waiting for the day's homework condition
--    confirmed = counts toward balance / payouts
--    forfeited = homework assigned that day was not finished; kept as a record, never deleted, never counted
alter table public.reward_credits add column if not exists status text not null default 'confirmed';
alter table public.reward_credits drop constraint if exists reward_credits_status_chk;
alter table public.reward_credits add constraint reward_credits_status_chk check (status in ('pending', 'confirmed', 'forfeited'));
alter table public.reward_credits add column if not exists gate_day date;          -- SGT day whose homework gates this credit (weekly: the Saturday claimed)
alter table public.reward_credits add column if not exists resolved_at timestamptz; -- when it left 'pending'
alter table public.reward_credits alter column status set default 'pending';
create index if not exists reward_credits_pending_idx on public.reward_credits(child_id, gate_day) where status = 'pending';

-- Credits are now per CHILD (one shared setting, any linked parent may read and pay out). Reads for the student and any linked guardian.
drop policy if exists reward_credits_select on public.reward_credits;
create policy reward_credits_select on public.reward_credits for select
  using (child_id = auth.uid() or public.is_parent_of(child_id));
drop policy if exists reward_payouts_select on public.reward_payouts;
create policy reward_payouts_select on public.reward_payouts for select
  using (child_id = auth.uid() or public.is_parent_of(child_id));

-- 2) Award a PENDING credit. Server only, after it checked score tier / review and computed the credits. Idempotent per
--    (child, kind, period, subject) regardless of which parent row owns it. The old 9-argument version is dropped so no caller can
--    bypass the pending step. p_parent is the ledger owner (the earliest-linked parent), kept for the existing unique key.
drop function if exists public.award_credit(uuid, uuid, text, date, text, int, numeric, int, date);
create or replace function public.award_credit(
  p_parent uuid, p_child uuid, p_kind text, p_period date, p_subject text,
  p_credits int, p_rate numeric, p_score_pct int, p_effective date, p_gate_day date
) returns json language plpgsql security definer set search_path = public as $$
declare v_n int;
begin
  if p_kind not in ('daily', 'weekly') then raise exception 'bad kind'; end if;
  if p_credits is null or p_credits <= 0 then return json_build_object('awarded', false); end if;
  if not exists (select 1 from public.parent_child pc where pc.parent_id = p_parent and pc.child_id = p_child) then
    return json_build_object('awarded', false, 'error', 'not_linked');
  end if;
  perform pg_advisory_xact_lock(hashtext('reward_credit:' || p_child::text));
  if exists (select 1 from public.reward_credits c
              where c.child_id = p_child and c.kind = p_kind and c.period = p_period and c.subject = coalesce(p_subject, '')) then
    return json_build_object('awarded', false);
  end if;
  insert into public.reward_credits(child_id, parent_id, kind, period, subject, credits, sgd_per_credit, score_pct, rule_effective_from, status, gate_day)
    values (p_child, p_parent, p_kind, p_period, coalesce(p_subject, ''), p_credits, coalesce(p_rate, 0), p_score_pct, p_effective, 'pending', coalesce(p_gate_day, p_period))
    on conflict (parent_id, child_id, kind, period, subject) do nothing;
  get diagnostics v_n = row_count;
  return json_build_object('awarded', v_n > 0);
end $$;
revoke all on function public.award_credit(uuid, uuid, text, date, text, int, numeric, int, date, date) from public, anon, authenticated;
grant execute on function public.award_credit(uuid, uuid, text, date, text, int, numeric, int, date, date) to service_role;

-- 3) Decide pending credits. p_child null = every child (daily cron). Idempotent: only 'pending' rows are touched, and only a
--    final decision is written. Mirrors creditStatusFor() in src/lib/rewards.js:
--      homework assigned for the gate day and all solved           -> confirmed (even before the day ends)
--      homework assigned, some unsolved, gate day already over      -> forfeited
--      nothing assigned, gate day already over                      -> confirmed
--      otherwise (day still open; a parent may still assign today)  -> stays pending
--    Returns the number of rows decided.
create or replace function public.finalize_credits(p_child uuid, p_today date)
returns int language plpgsql security definer set search_path = public as $$
declare v_n int := 0;
begin
  with d as (
    select c.id, coalesce(c.gate_day, c.period) as gd,
           (select count(*) from public.parent_homework h where h.child_id = c.child_id and h.assigned_for = coalesce(c.gate_day, c.period)) as assigned,
           (select count(*) from public.parent_homework h where h.child_id = c.child_id and h.assigned_for = coalesce(c.gate_day, c.period) and h.solved_at is null) as remaining
      from public.reward_credits c
     where c.status = 'pending' and (p_child is null or c.child_id = p_child)
  ), dec as (
    select id, case when assigned > 0 and remaining = 0 then 'confirmed'
                    when gd >= p_today then 'pending'
                    when assigned > 0 then 'forfeited'
                    else 'confirmed' end as st
      from d
  )
  update public.reward_credits c set status = dec.st, resolved_at = now()
    from dec where c.id = dec.id and c.status = 'pending' and dec.st <> 'pending';
  get diagnostics v_n = row_count;
  return v_n;
end $$;
revoke all on function public.finalize_credits(uuid, date) from public, anon, authenticated;
grant execute on function public.finalize_credits(uuid, date) to service_role;

-- 4) Payouts: only CONFIRMED credits count; the balance is per child (any linked parent may record a payout).
create or replace function public.record_payout(
  p_parent uuid, p_child uuid, p_credits int, p_amount numeric, p_paid_on date, p_note text
) returns json language plpgsql security definer set search_path = public as $$
declare v_earned int; v_paid int;
begin
  if not exists (select 1 from public.parent_child pc where pc.parent_id = p_parent and pc.child_id = p_child) then
    return json_build_object('ok', false, 'error', 'not_linked');
  end if;
  perform pg_advisory_xact_lock(hashtext('reward_payout:' || p_child::text));
  select coalesce(sum(credits), 0) into v_earned from public.reward_credits where child_id = p_child and status = 'confirmed';
  select coalesce(sum(credits), 0) into v_paid from public.reward_payouts where child_id = p_child;
  if p_credits <= 0 or p_credits > v_earned - v_paid then
    return json_build_object('ok', false, 'error', 'balance', 'balance', v_earned - v_paid);
  end if;
  insert into public.reward_payouts(child_id, parent_id, credits, amount_sgd, paid_on, note)
    values (p_child, p_parent, p_credits, p_amount, p_paid_on, nullif(left(coalesce(p_note, ''), 200), ''));
  return json_build_object('ok', true, 'balance', v_earned - v_paid - p_credits);
end $$;
revoke all on function public.record_payout(uuid, uuid, int, numeric, date, text) from public, anon, authenticated;
grant execute on function public.record_payout(uuid, uuid, int, numeric, date, text) to service_role;

-- 5) ONE shared setting per child. Versioned like reward_rule_versions: the version in force on SGT day D is the row with the greatest
--    effective_from <= D. The API only ever writes effective_from = tomorrow (SGT), so a child's targets never change mid-day.
--    Each row is a COMPLETE snapshot (daily targets, homework count, reward rule), so two parents' edits merge.
create table if not exists public.child_setting_versions (
  child_id             uuid not null references public.profiles(id) on delete cascade,
  effective_from       date not null,
  daily_target         jsonb not null default '{"English":1,"Chinese":1,"Math":1,"Science":1}'::jsonb,
  homework_per_mistake integer not null default 3 check (homework_per_mistake between 1 and 100),
  enabled              boolean not null default false,
  sgd_per_credit       numeric(8,2) not null default 0 check (sgd_per_credit between 0 and 1000),
  daily_tiers          jsonb not null default '[]'::jsonb,
  weekly_unit          text not null default 'credits' check (weekly_unit in ('credits', 'sgd')),
  weekly_amounts       jsonb not null default '{}'::jsonb,
  updated_by           uuid references public.profiles(id) on delete set null,
  updated_at           timestamptz not null default now(),
  primary key (child_id, effective_from)
);
alter table public.child_setting_versions enable row level security;
drop policy if exists child_setting_versions_select on public.child_setting_versions;
create policy child_setting_versions_select on public.child_setting_versions for select using (public.is_parent_of(child_id));
-- Deliberately no insert / update / delete policy: writes go through the API (service role).

-- 6) Audit log: who changed what and when. Visible to every linked parent. Never updated or deleted by the app.
create table if not exists public.child_setting_audit (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references public.profiles(id) on delete cascade,
  changed_by      uuid references public.profiles(id) on delete set null,
  changed_by_name text,
  changed_at      timestamptz not null default now(),
  effective_from  date not null,
  changes         jsonb not null default '[]'::jsonb    -- array of sentences, e.g. "Dad changed 90%+ tier to 15 credits, effective tomorrow"
);
create index if not exists child_setting_audit_idx on public.child_setting_audit(child_id, changed_at desc);
alter table public.child_setting_audit enable row level security;
drop policy if exists child_setting_audit_select on public.child_setting_audit;
create policy child_setting_audit_select on public.child_setting_audit for select using (public.is_parent_of(child_id));

-- 7) Initial shared setting per child = what the app already used: daily target + homework count from the earliest-linked parent
--    that has a parent_settings row; reward rule from the earliest-linked parent that has a rule version (the version in force today,
--    plus that parent's already-scheduled future versions). Old tables (parent_settings, reward_rule_versions) are left untouched.
--    Children that already have a shared setting are skipped (re-run safe). Effective from 2000-01-01 so every past day resolves.
do $$
declare
  k record; v_sp uuid; v_rp uuid; ps record; rv record; fut record;
  v_today date := (now() at time zone 'Asia/Singapore')::date;
  v_def jsonb := '{"English":1,"Chinese":1,"Math":1,"Science":1}'::jsonb;
  v_target jsonb; v_hw int;
begin
  for k in select distinct child_id from public.parent_child loop
    if exists (select 1 from public.child_setting_versions v where v.child_id = k.child_id) then continue; end if;
    select pc.parent_id into v_sp from public.parent_child pc
      where pc.child_id = k.child_id and exists (select 1 from public.parent_settings s where s.parent_id = pc.parent_id)
      order by pc.created_at, pc.parent_id limit 1;
    select pc.parent_id into v_rp from public.parent_child pc
      where pc.child_id = k.child_id and exists (select 1 from public.reward_rule_versions r where r.parent_id = pc.parent_id and r.child_id = pc.child_id)
      order by pc.created_at, pc.parent_id limit 1;
    if v_sp is null and v_rp is null then continue; end if;
    v_target := v_def; v_hw := 3;
    if v_sp is not null then
      select s.daily_target, s.homework_per_mistake into ps from public.parent_settings s where s.parent_id = v_sp;
      v_target := v_def || coalesce(ps.daily_target, '{}'::jsonb);
      v_hw := coalesce(ps.homework_per_mistake, 3);
    end if;
    rv := null;
    if v_rp is not null then
      select * into rv from public.reward_rule_versions r
        where r.parent_id = v_rp and r.child_id = k.child_id and r.effective_from <= v_today
        order by r.effective_from desc limit 1;
    end if;
    insert into public.child_setting_versions(child_id, effective_from, daily_target, homework_per_mistake, enabled, sgd_per_credit, daily_tiers, weekly_unit, weekly_amounts, updated_by)
      values (k.child_id, date '2000-01-01', v_target, v_hw, coalesce(rv.enabled, false), coalesce(rv.sgd_per_credit, 0),
              coalesce(rv.daily_tiers, '[]'::jsonb), coalesce(rv.weekly_unit, 'credits'), coalesce(rv.weekly_amounts, '{}'::jsonb), coalesce(v_rp, v_sp))
      on conflict do nothing;
    if v_rp is not null then
      for fut in select * from public.reward_rule_versions r where r.parent_id = v_rp and r.child_id = k.child_id and r.effective_from > v_today loop
        insert into public.child_setting_versions(child_id, effective_from, daily_target, homework_per_mistake, enabled, sgd_per_credit, daily_tiers, weekly_unit, weekly_amounts, updated_by)
          values (k.child_id, fut.effective_from, v_target, v_hw, fut.enabled, fut.sgd_per_credit, fut.daily_tiers, fut.weekly_unit, fut.weekly_amounts, v_rp)
          on conflict do nothing;
      end loop;
    end if;
  end loop;
end $$;
