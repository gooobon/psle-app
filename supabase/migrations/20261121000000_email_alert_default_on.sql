-- Email alerts default ON for parents whose Supabase Auth email is confirmed.
-- Idempotent. Never overwrites an existing email channel entry (so a parent who turned email off stays off).
-- Run after 20261120000000_alert_log_and_guardian_invites.sql.

-- 1) Parents with a confirmed email but no parent_settings row yet: create one with email on.
insert into public.parent_settings (parent_id, alert_email, alert_channels)
select p.id, u.email,
       jsonb_build_array(jsonb_build_object('type','email','enabled',true,'address',u.email))
from public.profiles p
join auth.users u on u.id = p.id
where p.role = 'parent' and u.email_confirmed_at is not null and u.email is not null
on conflict (parent_id) do nothing;

-- 2) Existing settings rows with NO email entry in alert_channels: append email enabled (keeps any whatsapp entry).
--    Rows that already contain an email entry (enabled true OR false) are left untouched.
update public.parent_settings s
set alert_channels = coalesce(s.alert_channels, '[]'::jsonb)
      || jsonb_build_array(jsonb_build_object('type','email','enabled',true,'address',u.email)),
    updated_at = now()
from public.profiles p
join auth.users u on u.id = p.id
where s.parent_id = p.id
  and p.role = 'parent'
  and u.email_confirmed_at is not null and u.email is not null
  and not exists (
    select 1 from jsonb_array_elements(coalesce(s.alert_channels, '[]'::jsonb)) c where c->>'type' = 'email'
  );
