-- ClewQuest: one-time parent link codes for picture-code children, plus a read-only fail counter for the lock message.
-- NEW, additive, re-runnable. Does not touch 20261203000000_clewquest_phase1.sql.
-- A picture-code child (signed in) asks the server for a 6-digit code (valid 10 minutes, single use). Only an HMAC of the code
-- is stored (never the digits). A logged-in parent redeems it with the child's username; the redeem is an atomic delete, so a
-- code works once. Guess attempts are limited per child by public.clewquest_login_try (scope 'user', key 'link:<username>').
-- Service role only: RLS on, no policies, execute revoked from anon/authenticated.
create table if not exists public.clewquest_link_codes (
  child_id uuid primary key references public.profiles(id) on delete cascade,
  code_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
alter table public.clewquest_link_codes enable row level security;
revoke all on public.clewquest_link_codes from anon, authenticated;

-- Atomic single-use redeem: true only if an unexpired code with this hash existed for the child (and is now consumed).
create or replace function public.clewquest_link_redeem(p_child uuid, p_hash text) returns boolean
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  delete from public.clewquest_link_codes where expires_at <= now();
  delete from public.clewquest_link_codes where child_id = p_child and code_hash = p_hash and expires_at > now();
  get diagnostics n = row_count;
  return n > 0;
end $$;

-- Current failed-attempt count for a login key inside its window (0 when none / expired). Read-only.
create or replace function public.clewquest_login_fails(p_scope text, p_key text, p_window_secs integer) returns integer
language sql stable security definer set search_path = public as $$
  select coalesce((select fails from public.clewquest_login_attempts
    where scope = p_scope and key = p_key and window_start >= now() - make_interval(secs => p_window_secs)), 0);
$$;

revoke all on function public.clewquest_link_redeem(uuid, text) from public, anon, authenticated;
revoke all on function public.clewquest_login_fails(text, text, integer) from public, anon, authenticated;
grant execute on function public.clewquest_link_redeem(uuid, text) to service_role;
grant execute on function public.clewquest_login_fails(text, text, integer) to service_role;
