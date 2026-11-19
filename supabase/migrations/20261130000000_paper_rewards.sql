-- Genius Project: mock exams phase 2 (issue #48), Saturday past-paper reward. Extends 20261124 / 20261125 / 20261126 / 20261129;
-- those files are NOT edited. ADDITIVE ONLY: no row is deleted or rewritten.
-- Apply by hand in the Supabase SQL editor AFTER 20261129000000_exam_attempts.sql. Safe to re-run.
-- ORDER OF DEPLOY: apply this BEFORE merging/deploying the code in the same PR if you plan to turn NEXT_PUBLIC_MOCK_EXAMS_ENABLED on.
-- With the flag off the code never touches the new columns or the 'paper' kind, so the migration can also wait.
-- The ledger is RECORD ONLY. The app never moves real money.

-- 1) Parent-configured Saturday paper reward, part of the ONE shared (versioned) child setting. Defaults = NO paper reward for every
--    existing setting, and the anti-gaming check (>= 50% of the time used OR >= 80% answered) stays ON.
alter table public.child_setting_versions add column if not exists paper_unit      text    not null default 'credits';
alter table public.child_setting_versions add column if not exists paper_amounts   jsonb   not null default '{}'::jsonb;
alter table public.child_setting_versions add column if not exists paper_check_off boolean not null default false;
alter table public.child_setting_versions drop constraint if exists child_setting_versions_paper_unit_chk;
alter table public.child_setting_versions add constraint child_setting_versions_paper_unit_chk check (paper_unit in ('credits', 'sgd'));

-- 2) Widen the 'kind' CHECK on stickers and reward_credits to include 'paper'. The existing check is an unnamed inline constraint,
--    so find it by its definition (any check on the table that mentions "kind") and replace it with a named one. No row changes.
do $$
declare c record;
begin
  for c in select conrelid::regclass as tbl, conname from pg_constraint
            where contype = 'c' and conrelid in ('public.stickers'::regclass, 'public.reward_credits'::regclass)
              and pg_get_constraintdef(oid) ilike '%kind%' loop
    execute format('alter table %s drop constraint %I', c.tbl, c.conname);
  end loop;
end $$;
alter table public.stickers        add constraint stickers_kind_chk        check (kind in ('daily', 'weekly', 'paper'));
alter table public.reward_credits  add constraint reward_credits_kind_chk  check (kind in ('daily', 'weekly', 'paper'));

-- 3) award_sticker / award_credit accept kind 'paper'. Signatures and bodies are unchanged apart from the kind guard, so deployed code
--    keeps working. A paper sticker's period is the Saturday (SGT) the paper was handed in; a paper credit's period is the same Saturday,
--    its subject is the paper's subject, and it is created 'pending' with gate_day = that Saturday (the existing homework gate decides).
create or replace function public.award_sticker(p_child uuid, p_kind text, p_period date)
returns json language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if p_kind not in ('daily', 'weekly', 'paper') then raise exception 'bad kind'; end if;
  insert into public.stickers(child_id, kind, period) values (p_child, p_kind, p_period)
    on conflict (child_id, kind, period) do nothing returning id into v_id;
  return json_build_object('awarded', v_id is not null, 'credited', 0);
end $$;
revoke all on function public.award_sticker(uuid, text, date) from public, anon, authenticated;
grant execute on function public.award_sticker(uuid, text, date) to service_role;

create or replace function public.award_credit(
  p_parent uuid, p_child uuid, p_kind text, p_period date, p_subject text,
  p_credits int, p_rate numeric, p_score_pct int, p_effective date, p_gate_day date
) returns json language plpgsql security definer set search_path = public as $$
declare v_n int;
begin
  if p_kind not in ('daily', 'weekly', 'paper') then raise exception 'bad kind'; end if;
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

-- finalize_credits() already decides every 'pending' row by gate_day regardless of kind: no change.
-- Cause picking, review and the notebook use existing tables (wrong_answers, exam_answers): no change.
