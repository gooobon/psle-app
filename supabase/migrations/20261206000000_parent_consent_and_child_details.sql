-- Additive only. Apply by hand in the Supabase SQL editor. The app keeps working if this is not applied yet.
alter table public.parent_settings add column if not exists relationship text;           -- 'parent' | 'guardian'
alter table public.parent_settings add column if not exists consent_at timestamptz;
alter table public.parent_settings add column if not exists weekly_email_optin boolean;
alter table public.profiles add column if not exists subjects text[];                    -- e.g. {English,Math}
alter table public.profiles add column if not exists mother_tongue text;                 -- 'Chinese' | 'Higher Chinese' | 'Other / none'
