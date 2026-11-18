-- Genius Project: server step 1/5 (accounts, parent-child links, localStorage import).
-- Apply by hand in the Supabase SQL editor. Safe to re-run (idempotent).

create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         text not null check (role in ('parent','student')),
  username     text unique,                -- students only (login name); never shown with the synthetic email
  display_name text not null,
  grade        text,
  school       text,
  created_at   timestamptz not null default now()
);

create table if not exists public.parent_child (
  parent_id uuid not null references public.profiles(id) on delete cascade,
  child_id  uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (parent_id, child_id),
  unique (child_id)                        -- TODO(owner): one parent per child for now; drop to allow two guardians
);

create table if not exists public.parent_settings (
  parent_id     uuid primary key references public.profiles(id) on delete cascade,
  daily_target  jsonb not null default '{"English":1,"Chinese":1,"Math":1,"Science":1}'::jsonb, -- sets per subject per day
  alert_email   text,
  alert_time    time not null default '20:00',
  alert_tz      text not null default 'Asia/Singapore',
  updated_at    timestamptz not null default now()
);

create table if not exists public.progress_snapshots (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  key        text not null,                -- e.g. genius_progress_v2 (imported as-is from localStorage)
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- Helper (security definer avoids RLS recursion): is the caller the parent of this child?
create or replace function public.is_parent_of(child uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.parent_child pc where pc.parent_id = auth.uid() and pc.child_id = child);
$$;

alter table public.profiles           enable row level security;
alter table public.parent_child       enable row level security;
alter table public.parent_settings    enable row level security;
alter table public.progress_snapshots enable row level security;

-- profiles: own row, plus linked children for a parent. Writes go through the service role only.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.is_parent_of(id));

-- parent_child: parent sees own links; child sees own link. Writes: service role only.
drop policy if exists parent_child_select on public.parent_child;
create policy parent_child_select on public.parent_child for select
  using (parent_id = auth.uid() or child_id = auth.uid());

-- parent_settings: only the owning parent.
drop policy if exists parent_settings_select on public.parent_settings;
create policy parent_settings_select on public.parent_settings for select using (parent_id = auth.uid());
drop policy if exists parent_settings_update on public.parent_settings;
create policy parent_settings_update on public.parent_settings for update
  using (parent_id = auth.uid()) with check (parent_id = auth.uid());

-- progress_snapshots: own rows (read/write) + linked children's rows (read only).
drop policy if exists snapshots_select on public.progress_snapshots;
create policy snapshots_select on public.progress_snapshots for select
  using (user_id = auth.uid() or public.is_parent_of(user_id));
drop policy if exists snapshots_insert on public.progress_snapshots;
create policy snapshots_insert on public.progress_snapshots for insert with check (user_id = auth.uid());
drop policy if exists snapshots_update on public.progress_snapshots;
create policy snapshots_update on public.progress_snapshots for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());
-- No delete policies anywhere: student data is never deleted by clients.
