-- Genius Project: roadmap step 9 (Saturday weekly review, stickers, parent credit ledger).
-- Apply by hand in the Supabase SQL editor AFTER 20261123000000_parent_homework.sql. Safe to re-run.
-- Reads: the student (own rows) and linked guardians (public.is_parent_of).
-- NO client insert/update/delete policies on any table: every write goes through an API route
-- (service role) after checks. Awards are idempotent: unique (child, kind, period).
-- The ledger is RECORD ONLY. The app never moves real money (SGD amounts are what the parent says they paid).

-- 1) Stickers: one per target-met day ('daily', period = SGT date) and one per Saturday weekly review
--    ('weekly', period = Monday of that week, SGT).
create table if not exists public.stickers (
  id         uuid primary key default gen_random_uuid(),
  child_id   uuid not null references public.profiles(id) on delete cascade,
  kind       text not null check (kind in ('daily', 'weekly')),
  period     date not null,
  created_at timestamptz not null default now(),
  constraint stickers_uq unique (child_id, kind, period)
);
create index if not exists stickers_child_idx on public.stickers(child_id, period);

-- 2) Weekly review completions (per subject; the bonus sticker is once per week).
create table if not exists public.weekly_reviews (
  child_id     uuid not null references public.profiles(id) on delete cascade,
  week_start   date not null,                  -- Monday (SGT) of the week reviewed
  subject      text not null,
  items        integer not null default 0,     -- number of mistakes in the review
  completed_at timestamptz not null default now(),
  primary key (child_id, week_start, subject)
);

-- 3) Parent reward rules, one row per (parent, child). Absent row = disabled, all zero.
-- TODO(owner): default reward numbers. Until decided, no row exists and nothing accrues.
create table if not exists public.reward_rules (
  parent_id         uuid not null references public.profiles(id) on delete cascade,
  child_id          uuid not null references public.profiles(id) on delete cascade,
  enabled           boolean not null default false,
  credits_per_day   integer not null default 0 check (credits_per_day between 0 and 1000),
  credits_per_weekly integer not null default 0 check (credits_per_weekly between 0 and 1000),
  sgd_per_credit    numeric(8,2) not null default 0 check (sgd_per_credit between 0 and 1000),
  updated_at        timestamptz not null default now(),
  primary key (parent_id, child_id)
);

-- 4) Credit ledger: one row per (parent, child, kind, period) = no double credit.
create table if not exists public.reward_credits (
  id             uuid primary key default gen_random_uuid(),
  child_id       uuid not null references public.profiles(id) on delete cascade,
  parent_id      uuid not null references public.profiles(id) on delete cascade,
  sticker_id     uuid references public.stickers(id) on delete set null,
  kind           text not null check (kind in ('daily', 'weekly')),
  period         date not null,
  credits        integer not null check (credits > 0),
  sgd_per_credit numeric(8,2) not null default 0,   -- rate when earned (display only)
  created_at     timestamptz not null default now(),
  constraint reward_credits_uq unique (parent_id, child_id, kind, period)
);
create index if not exists reward_credits_idx on public.reward_credits(parent_id, child_id, created_at);

-- 5) Payouts the parent marks as paid (credits settled + SGD amount + date). Record only.
create table if not exists public.reward_payouts (
  id         uuid primary key default gen_random_uuid(),
  child_id   uuid not null references public.profiles(id) on delete cascade,
  parent_id  uuid not null references public.profiles(id) on delete cascade,
  credits    integer not null check (credits > 0),
  amount_sgd numeric(10,2) not null check (amount_sgd >= 0 and amount_sgd <= 100000),
  paid_on    date not null,
  note       text,
  created_at timestamptz not null default now()
);
create index if not exists reward_payouts_idx on public.reward_payouts(parent_id, child_id, paid_on);

alter table public.stickers        enable row level security;
alter table public.weekly_reviews  enable row level security;
alter table public.reward_rules    enable row level security;
alter table public.reward_credits  enable row level security;
alter table public.reward_payouts  enable row level security;

drop policy if exists stickers_select on public.stickers;
create policy stickers_select on public.stickers for select
  using (child_id = auth.uid() or public.is_parent_of(child_id));
drop policy if exists weekly_reviews_select on public.weekly_reviews;
create policy weekly_reviews_select on public.weekly_reviews for select
  using (child_id = auth.uid() or public.is_parent_of(child_id));
-- Money-ish tables: a parent sees only their own rules/ledger/payouts; the student sees own credits and payouts.
drop policy if exists reward_rules_select on public.reward_rules;
create policy reward_rules_select on public.reward_rules for select
  using (parent_id = auth.uid() and public.is_parent_of(child_id));
drop policy if exists reward_credits_select on public.reward_credits;
create policy reward_credits_select on public.reward_credits for select
  using (child_id = auth.uid() or (parent_id = auth.uid() and public.is_parent_of(child_id)));
drop policy if exists reward_payouts_select on public.reward_payouts;
create policy reward_payouts_select on public.reward_payouts for select
  using (child_id = auth.uid() or (parent_id = auth.uid() and public.is_parent_of(child_id)));
-- Deliberately no insert / update / delete policies.

-- Idempotent award. Called only by the server (service role) after it verified the target / review.
-- Returns { awarded: bool, credited: n } . A repeat call for the same (child, kind, period) is a no-op.
-- Credits accrue only for parents (linked to the child) whose rule is enabled at the moment of the award.
create or replace function public.award_sticker(p_child uuid, p_kind text, p_period date)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_n int := 0;
begin
  if p_kind not in ('daily', 'weekly') then raise exception 'bad kind'; end if;
  insert into public.stickers(child_id, kind, period) values (p_child, p_kind, p_period)
    on conflict (child_id, kind, period) do nothing returning id into v_id;
  if v_id is null then return json_build_object('awarded', false, 'credited', 0); end if;
  insert into public.reward_credits(child_id, parent_id, sticker_id, kind, period, credits, sgd_per_credit)
    select p_child, r.parent_id, v_id, p_kind, p_period,
           case when p_kind = 'daily' then r.credits_per_day else r.credits_per_weekly end, r.sgd_per_credit
      from public.reward_rules r
      join public.parent_child pc on pc.parent_id = r.parent_id and pc.child_id = r.child_id
     where r.child_id = p_child and r.enabled
       and (case when p_kind = 'daily' then r.credits_per_day else r.credits_per_weekly end) > 0
    on conflict do nothing;
  get diagnostics v_n = row_count;
  return json_build_object('awarded', true, 'credited', v_n);
end $$;
revoke all on function public.award_sticker(uuid, text, date) from public, anon, authenticated;
grant execute on function public.award_sticker(uuid, text, date) to service_role;

-- Atomic payout record. Blocks when credits exceed this parent's unpaid balance for the child.
-- Returns { ok, balance } or { ok:false, error:'not_linked' | 'balance', balance }.
create or replace function public.record_payout(
  p_parent uuid, p_child uuid, p_credits int, p_amount numeric, p_paid_on date, p_note text
) returns json language plpgsql security definer set search_path = public as $$
declare v_earned int; v_paid int;
begin
  if not exists (select 1 from public.parent_child pc where pc.parent_id = p_parent and pc.child_id = p_child) then
    return json_build_object('ok', false, 'error', 'not_linked');
  end if;
  perform pg_advisory_xact_lock(hashtext('reward_payout:' || p_parent::text || ':' || p_child::text));
  select coalesce(sum(credits), 0) into v_earned from public.reward_credits where parent_id = p_parent and child_id = p_child;
  select coalesce(sum(credits), 0) into v_paid from public.reward_payouts where parent_id = p_parent and child_id = p_child;
  if p_credits <= 0 or p_credits > v_earned - v_paid then
    return json_build_object('ok', false, 'error', 'balance', 'balance', v_earned - v_paid);
  end if;
  insert into public.reward_payouts(child_id, parent_id, credits, amount_sgd, paid_on, note)
    values (p_child, p_parent, p_credits, p_amount, p_paid_on, nullif(left(coalesce(p_note, ''), 200), ''));
  return json_build_object('ok', true, 'balance', v_earned - v_paid - p_credits);
end $$;
revoke all on function public.record_payout(uuid, uuid, int, numeric, date, text) from public, anon, authenticated;
grant execute on function public.record_payout(uuid, uuid, int, numeric, date, text) to service_role;
