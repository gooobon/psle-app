-- ClewQuest follow-up (issue #76). ADDITIVE and re-runnable (create or replace only). Apply by hand AFTER 20261203000000_clewquest_phase1.sql.
-- Called after a FAILED picture-code sign-in. The attempt was already counted by clewquest_login_try, so when the counter has
-- reached p_max this wrong code was the last allowed one: lock now, so the 5th wrong code shows the locked message instead of
-- "try again". Returns true = locked. A correct 5th code is unaffected (success clears the counter via clewquest_login_ok).
create or replace function public.clewquest_login_after_fail(p_scope text, p_key text, p_max integer, p_lock_secs integer) returns boolean
language plpgsql security definer set search_path = public as $$
declare r public.clewquest_login_attempts;
begin
  update public.clewquest_login_attempts as a
  set locked_until = case when a.locked_until is null or a.locked_until <= now() then now() + make_interval(secs => p_lock_secs) else a.locked_until end,
      updated_at = now()
  where a.scope = p_scope and a.key = p_key and a.fails >= p_max
  returning * into r;
  return found and r.locked_until is not null and r.locked_until > now();
end $$;

revoke all on function public.clewquest_login_after_fail(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.clewquest_login_after_fail(text, text, integer, integer) to service_role;
