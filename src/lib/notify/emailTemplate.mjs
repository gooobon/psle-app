// All parent-email wording lives here so it can be translated later: edit COPY (or add another locale object).
// TODO(owner): final wording / translations (e.g. Chinese). English is the default.
export const COPY = {
  en: {
    subject: (p) => (p.anyMissing ? `Not done yet today: ${p.names}` : `All done today: ${p.names}`),
    greeting: (p) => `Hi ${p.parentName},`,
    notDone: (names) => `NOT DONE YET today: ${names}`,
    allDone: "All subjects are done for today. 🎉",
    childHeading: (c) => `${c.name}${c.grade ? ` (${c.grade})` : ""}`,
    subjectLine: (s) => `${s.done ? "✅ Done" : "❌ Not done"} – ${s.name}: ${s.sets}/${s.target} set${s.target === 1 ? "" : "s"}`,
    noSubjects: "No subjects with a daily target.",
    stats: (c) => `Questions answered: ${c.questions} · Accuracy: ${c.accuracy == null ? "–" : c.accuracy + "%"} · Minutes: ${c.minutes}`,
    streak: (c) => `Streak: ${c.streak} day${c.streak === 1 ? "" : "s"} · Active ${c.activeDays} of the last 7 days`,
    paperHeading: "Mock papers",
    paperDone: (x) => `${x.label}: ${x.score}/${x.total}${x.pct == null ? "" : ` (${x.pct}%)`} · ${x.minutesUsed} of ${x.minutesAllowed} min used${x.counted ? "" : " · did not count as a set"} · ${x.toReview} question${x.toReview === 1 ? "" : "s"} to review${x.openToMark ? ` · ${x.openToMark} open-ended to mark` : ""}`,
    paperUnfinished: (x) => `${x.label}: started, not handed in${x.expired ? " (time is up)" : ""}`,
    dashboard: "Open the parent dashboard",
    footer: "You get this because daily email alerts are on for your parent account.",
  },
};

// Additive: a child's optional `papers` block ({ done:[...], unfinished:[...] }). Absent or empty = no lines at all.
export function paperLines(c, t) {
  const p = c && c.papers;
  if (!p || (!(p.done || []).length && !(p.unfinished || []).length)) return [];
  return [t.paperHeading, ...(p.done || []).map(t.paperDone), ...(p.unfinished || []).map(t.paperUnfinished)];
}

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// payload: { parentName, date, dashboardUrl, children: [{ name, grade, subjects:[{name,sets,target,done}],
//            questions, accuracy|null, minutes, streak, activeDays, missing:[subject names] }] }
export function renderDailyEmail(payload, locale = "en") {
  const t = COPY[locale] || COPY.en;
  const kids = payload.children || [];
  const missingKids = kids.filter((c) => c.missing.length);
  const ctx = { ...payload, anyMissing: missingKids.length > 0, names: kids.map((c) => c.name).join(", ") };
  const banner = missingKids.map((c) => t.notDone(`${c.name} – ${c.missing.join(", ")}`));

  const textBlocks = kids.map((c) => [
    t.childHeading(c),
    ...(c.subjects.length ? c.subjects.map(t.subjectLine) : [t.noSubjects]),
    t.stats(c),
    t.streak(c),
    ...paperLines(c, t),
  ].join("\n"));
  const text = [t.greeting(ctx), "", ...(banner.length ? [...banner, ""] : [t.allDone, ""]), textBlocks.join("\n\n"), "", `${t.dashboard}: ${payload.dashboardUrl}`, "", t.footer].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0F172A">
<p>${esc(t.greeting(ctx))}</p>
${banner.length ? banner.map((b) => `<p style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;padding:10px;font-weight:bold">${esc(b)}</p>`).join("") : `<p style="background:#D1FAE5;border-radius:8px;padding:10px;font-weight:bold">${esc(t.allDone)}</p>`}
${kids.map((c) => `<h3 style="margin:16px 0 6px">${esc(t.childHeading(c))}</h3>
<ul style="padding-left:18px;margin:0">${(c.subjects.length ? c.subjects.map((s) => `<li>${esc(t.subjectLine(s))}</li>`) : [`<li>${esc(t.noSubjects)}</li>`]).join("")}</ul>
<p style="margin:6px 0">${esc(t.stats(c))}<br>${esc(t.streak(c))}</p>${paperLines(c, t).length ? `<p style="margin:6px 0"><b>${esc(paperLines(c, t)[0])}</b><br>${paperLines(c, t).slice(1).map(esc).join("<br>")}</p>` : ""}`).join("")}
<p><a href="${esc(payload.dashboardUrl)}" style="background:#7C3AED;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">${esc(t.dashboard)}</a></p>
<p style="font-size:12px;color:#64748B">${esc(t.footer)}</p></div>`;
  return { subject: t.subject(ctx), text, html };
}

// Notice to the OTHER linked parent when a shared child setting changes. payload: { parentName, childName, changerName, lines:[sentence], dashboardUrl }
export function renderSettingChangeEmail(p) {
  const lines = (p.lines || []).slice(0, 20);
  const subject = `${p.changerName || "Your co-parent"} changed ${p.childName || "your child"}'s settings`;
  const text = [`Hi ${p.parentName || "there"},`, "", ...lines, "", "These apply from the next Singapore day, so today's targets are not affected.", `Open the parent dashboard: ${p.dashboardUrl}`].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0F172A"><p>${esc(`Hi ${p.parentName || "there"},`)}</p>
<ul style="padding-left:18px">${lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
<p style="color:#64748B;font-size:12px">These apply from the next Singapore day, so today's targets are not affected.</p>
<p><a href="${esc(p.dashboardUrl)}" style="background:#7C3AED;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">Open the parent dashboard</a></p></div>`;
  return { subject, text, html };
}

// Real-time event email (issue #56), used as the fallback when WhatsApp is not usable.
// payload: { kind:"started"|"milestone", parentName, childName, subject, label, score, total, time, dashboardUrl }
export function renderEventEmail(p) {
  const result = p.total ? `${p.score} of ${p.total} correct (${Math.round((p.score / p.total) * 100)}%)` : "completed";
  const line = p.kind === "started"
    ? `${p.childName} has started ${p.subject} practice${p.time ? ` at ${p.time} (Singapore time)` : ""}.`
    : `${p.childName} finished ${p.subject}: ${p.label || "practice set"}. Result: ${result}.`;
  const subject = p.kind === "started" ? `${p.childName} started ${p.subject} practice` : `${p.childName} finished ${p.subject}: ${result}`;
  const text = [`Hi ${p.parentName || "there"},`, "", line, "", `Open the parent dashboard: ${p.dashboardUrl}`].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0F172A"><p>${esc(`Hi ${p.parentName || "there"},`)}</p><p>${esc(line)}</p>
<p><a href="${esc(p.dashboardUrl)}" style="background:#7C3AED;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">Open the parent dashboard</a></p></div>`;
  return { subject, text, html };
}
