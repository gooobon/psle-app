-- Issue #133: rewards cash-out settings. ADDITIVE ONLY: new nullable / defaulted columns, nothing dropped, renamed or rewritten.
-- The app works before this is applied: it falls back to the legacy sgd_per_credit and treats min / limit as "not set".
alter table public.child_setting_versions add column if not exists credits_per_sgd integer
  check (credits_per_sgd is null or credits_per_sgd between 1 and 1000);          -- credits that equal SGD 1; null = use sgd_per_credit
alter table public.child_setting_versions add column if not exists cashout_min_sgd numeric(8,2) not null default 0
  check (cashout_min_sgd between 0 and 500);                                       -- 0 = no minimum
alter table public.child_setting_versions add column if not exists cashout_limit_sgd numeric(8,2) not null default 0
  check (cashout_limit_sgd between 0 and 1000);                                    -- 0 = no limit
alter table public.child_setting_versions add column if not exists cashout_limit_period text not null default 'month'
  check (cashout_limit_period in ('week', 'month'));
