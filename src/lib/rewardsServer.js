// Server-only helpers shared by the student claim/weekly/homework routes, the parent routes and the cron (never import from client code).
// The client is never trusted: the homework gate and the rule in force are read from the DB here.
import { homeworkGate, isSaturday, paperRewardEligibility, paperSubjectCredits } from "@/lib/rewards";
import { settingForDate } from "@/lib/childSettings";
import { MOCK_EXAMS_ENABLED, REWARDS } from "@/lib/supabase/config";

// Homework state for one SGT day: every parent_homework row assigned for that day (any parent, any subject).
// Returns { ok, eligible, assigned, remaining } ; ok:false on a DB error (fail closed). Used for DISPLAY; the decision is finalize_credits().
export async function loadHomeworkGate(admin, childId, ymd) {
  const { data, error } = await admin.from("parent_homework").select("solved_at").eq("child_id", childId).eq("assigned_for", ymd);
  if (error) return { ok: false, eligible: false, assigned: 0, remaining: 0 };
  return { ok: true, ...homeworkGate(data) };
}

// Decide pending credits (idempotent SQL finalize_credits). childId null = every child (cron). Never throws: a failure just
// leaves credits pending, which is the safe state (they are not counted until confirmed). Returns the number decided.
export async function finalizeCredits(admin, childId, todayYmd) {
  try {
    const { data, error } = await admin.rpc("finalize_credits", { p_child: childId, p_today: todayYmd });
    return error ? 0 : Number(data) || 0;
  } catch { return 0; }
}

// All shared-setting versions for a child, oldest first. { ok, versions }.
// The paper_* columns are only selected while mock exams are on, so with the flag off the query is exactly what it was before.
export const SETTING_COLUMNS = "effective_from,daily_target,homework_per_mistake,enabled,sgd_per_credit,daily_tiers,weekly_unit,weekly_amounts"
  + (MOCK_EXAMS_ENABLED ? ",paper_unit,paper_amounts,paper_check_off" : "");
// Cash-out columns (migration 20261209000000_rewards_cashout_settings.sql). Selected first; if the migration is not applied yet the query
// errors and we retry without them, so everything keeps working (no minimum, no limit, rate from the legacy column). `cashout` says which.
export const CASHOUT_COLUMNS = ",credits_per_sgd,cashout_min_sgd,cashout_limit_sgd,cashout_limit_period";
export async function loadSettingVersions(admin, childId) {
  const q = (cols) => admin.from("child_setting_versions").select(cols).eq("child_id", childId).order("effective_from", { ascending: true });
  const full = await q(SETTING_COLUMNS + CASHOUT_COLUMNS);
  if (!full.error) return { ok: true, versions: full.data || [], cashout: true };
  const base = await q(SETTING_COLUMNS);
  return base.error ? { ok: false, versions: [] } : { ok: true, versions: base.data || [], cashout: false };
}

// The child's ONE shared setting in force on `ymd` ({dailyTarget, homeworkPerMistake, rule}); defaults when none saved. { ok, setting }.
export async function loadChildSetting(admin, childId, ymd) {
  const r = await loadSettingVersions(admin, childId);
  return r.ok ? { ok: true, setting: settingForDate(r.versions, ymd), versions: r.versions } : { ok: false };
}

// Rule in force on `ymd` for credits, plus the parent that OWNS the ledger rows (earliest-linked parent; stable).
// Returns { ok, parentId, rule } (rule null = rewards off / nothing configured).
export async function loadRewardRule(admin, childId, ymd) {
  const { data: links, error: le } = await admin.from("parent_child").select("parent_id, created_at").eq("child_id", childId);
  if (le) return { ok: false };
  const s = await loadChildSetting(admin, childId, ymd);
  if (!s.ok) return { ok: false };
  const owner = [...(links || [])].sort((a, b) => String(a.created_at || "").localeCompare(String(b.created_at || "")) || String(a.parent_id).localeCompare(String(b.parent_id)))[0];
  const rule = s.setting.rule;
  return { ok: true, parentId: owner ? owner.parent_id : null, rule: owner && rule && rule.enabled ? rule : null };
}

// Saturday past-paper reward for ONE just-submitted paper (mock exams phase 2, design decisions 8 and 9). The server decides everything:
// attempt status, the SGT Saturday it was handed in, the anti-gaming verdict (or the parent's choice to switch it off) and the amounts
// from the rule in force that day. The credit is created PENDING with gate_day = that Saturday, so the existing homework gate confirms or
// forfeits it. One credit per child per subject per Saturday (the ledger's unique key), one 'paper' sticker per Saturday.
// The app never moves real money. Never throws: a failure only means no reward now (nothing is lost; the attempt is already saved).
// Returns { saturday, eligible, reason, credits, awarded, sticker, homework? } for the result screen.
export async function awardPaperReward(admin, { childId, subject, day, status, counts }) {
  const out = { saturday: !!day && isSaturday(day), eligible: false, reason: "not_saturday", credits: 0, awarded: false, sticker: false };
  try {
    if (!out.saturday) return out;
    if (!REWARDS) return { ...out, reason: "rewards_off" };
    const rr = await loadRewardRule(admin, childId, day);
    if (!rr.ok) return { ...out, reason: "error" };
    const el = paperRewardEligibility({ attempt: { status, sgtDay: day, counts }, rule: rr.rule });
    out.eligible = el.eligible; out.reason = el.reason;
    if (!el.eligible) return out;
    const st = await admin.rpc("award_sticker", { p_child: childId, p_kind: "paper", p_period: day });
    out.sticker = !st.error && !!(st.data && st.data.awarded);
    const credits = paperSubjectCredits(rr.rule, subject);
    out.credits = credits;
    if (credits > 0) {
      const r = await admin.rpc("award_credit", {
        p_parent: rr.parentId, p_child: childId, p_kind: "paper", p_period: day, p_subject: subject,
        p_credits: credits, p_rate: rr.rule.sgdPerCredit, p_score_pct: null, p_effective: rr.rule.effectiveFrom, p_gate_day: day,
      });
      out.awarded = !r.error && !!(r.data && r.data.awarded);
    }
    const gate = await loadHomeworkGate(admin, childId, day);
    if (gate.ok) out.homework = { eligible: gate.eligible, assigned: gate.assigned, remaining: gate.remaining };
    await finalizeCredits(admin, childId, day);
    return out;
  } catch { return { ...out, reason: "error" }; }
}
