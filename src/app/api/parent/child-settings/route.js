// ONE shared setting per child (issue #32): daily targets, homework count, reward tiers, exchange rate, Saturday reward.
// Any linked parent may read and edit it. An edit is written as a new version effective TOMORROW (SGT), merged on top of whatever is
// already scheduled for tomorrow, so the child's targets never change mid-day. Every save appends an audit entry visible to all linked
// parents and notifies the other parent(s) by email (behind EMAIL_ALERTS_ENABLED). Needs NEXT_PUBLIC_SERVER_AUTH.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { sgtDate } from "@/lib/activity";
import { settingForDate, tomorrowSgt } from "@/lib/childSettings";
import { saveChildSetting } from "@/lib/childSettingsServer";
import { loadSettingVersions } from "@/lib/rewardsServer";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

async function guard(childId) {
  if (!serverAuthEnabled()) return { err: jerr("server auth disabled", 404) };
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return { err: jerr("parent login required", 401) };
  if (!UUID.test(childId || "")) return { err: jerr("bad child", 400) };
  const admin = adminClient();
  const { data } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", childId).maybeSingle();
  if (!data) return { err: jerr("not your child", 403) };
  return { me, admin };
}

export async function GET(request) {
  const child = new URL(request.url).searchParams.get("child") || "";
  const g = await guard(child); if (g.err) return g.err;
  const today = sgtDate();
  const v = await loadSettingVersions(g.admin, child);
  const au = await g.admin.from("child_setting_audit").select("id,changed_by_name,changed_at,effective_from,changes").eq("child_id", child).order("changed_at", { ascending: false }).limit(50);
  if (!v.ok || au.error) return jerr("could not load", 500);
  return jok({
    today, tomorrow: tomorrowSgt(today),
    current: settingForDate(v.versions, today),
    upcoming: settingForDate(v.versions, tomorrowSgt(today)).effectiveFrom > today ? settingForDate(v.versions, tomorrowSgt(today)) : null,
    audit: au.data || [],
  });
}

// Body: { child, dailyTarget?, homeworkPerMistake?, enabled?, sgdPerCredit?, dailyTiers?, weeklyUnit?, weeklyAmounts? }. Any effectiveFrom is ignored.
export async function PUT(request) {
  const b = await readJson(request);
  const child = String(b.child || "");
  const g = await guard(child); if (g.err) return g.err;
  const { me, admin } = g;
  if (!rateLimit(`cs:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const r = await saveChildSetting(admin, me.profile, child, b);
  return r.ok ? jok(r) : jerr(r.error, r.status || 500);
}
