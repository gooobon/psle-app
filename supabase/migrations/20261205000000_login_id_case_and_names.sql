-- Login IDs may now contain upper-case letters (e.g. Aquacat01); first/last name columns.
-- Apply by hand in the Supabase SQL editor. Additive and idempotent: nothing is dropped, updated or deleted.
-- profiles.username keeps the original casing; uniqueness is now also enforced case-insensitively.
-- (If this index fails, two accounts differ only by case: resolve by hand. Existing IDs were all lower-case, so it should not.)

create unique index if not exists profiles_username_lower_key on public.profiles (lower(username)) where username is not null;

alter table public.profiles add column if not exists first_name text;
alter table public.profiles add column if not exists last_name text;
