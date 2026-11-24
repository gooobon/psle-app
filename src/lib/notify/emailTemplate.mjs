// All parent-email wording lives here so it can be translated later: edit COPY (or add another locale object).
// TODO(owner): final wording / translations (e.g. Chinese). English is the default.
export const COPY = {
  en: {
    subject: (p) => (p.anyMissing ? `Not done yet today: ${p.names}` : `All done today: ${p.names}`),
    greeting: (p) => `Hi ${p.parentName},`,
    notDone: (names) => `NOT DONE YET today: ${names}`,
    allDone: "All subjects are done for today.",
    childHeading: (c) => `${c.name}${c.grade ? ` (${c.grade})` : ""}`,
    subjectLine: (s) => `${s.done ? "✓ Done" : "✗ Not done"} – ${s.name}: ${s.sets}/${s.target} set${s.target === 1 ? "" : "s"}`,
    noSubjects: "No subjects with a daily target.",
    stats: (c) => `Questions answered: ${c.questions} · Accuracy: ${c.accuracy == null ? "–" : c.accuracy + "%"} · Minutes: ${c.minutes}`,
    streak: (c) => `Streak: ${c.streak} day${c.streak === 1 ? "" : "s"} · Active ${c.activeDays} of the last 7 days`,
    paperHeading: "Mock papers",
    paperDone: (x) => `${x.label}: ${scoreText(x)} · ${x.minutesUsed} of ${x.minutesAllowed} min used${x.counted ? "" : " · did not count as a set"} · ${x.toReview} question${x.toReview === 1 ? "" : "s"} to review`,
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

// Parent-marked items join the score once marked: "2/36 + 4 awaiting parent marking" until then, "6/40 (15%)" after.
const scoreText = (x) => (x.openToMark ? `${x.score}/${x.total} + ${x.openToMark} awaiting parent marking` : `${x.score}/${x.total}${x.pct == null ? "" : ` (${x.pct}%)`}`);
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

// ---- Weekly parent report (replaces the daily 20:00 summary; issue #55). All wording in COPY_WEEKLY so it can be translated later. ----
export const CAUSE_LABELS = { concept_unknown: "Did not know the concept", misread: "Misread the question", calculation: "Careless / calculation slip", trap: "Fell for a trap", time: "Ran out of time", guessed: "Guessed" };
export const COPY_WEEKLY = {
  en: {
    subject: (p) => `Weekly report (${p.range}): ${p.names}`,
    greeting: (p) => `Hi ${p.parentName},`,
    intro: (p) => `Here is the week of ${p.range} (Singapore time).`,
    childHeading: (c) => `${c.name}${c.grade ? ` (${c.grade})` : ""}`,
    subjectLine: (s) => `${s.name}: ${s.sets} set${s.sets === 1 ? "" : "s"} vs target ${s.target} · daily target met on ${s.daysMet} of ${s.daysTracked} day${s.daysTracked === 1 ? "" : "s"} · first attempt of the day: ${s.firstAttempt ? `${s.firstAttempt.avgPct}% average over ${s.firstAttempt.days} day${s.firstAttempt.days === 1 ? "" : "s"}` : "no scored first attempt"}`,
    noSubjects: "No subjects with a daily target this week.",
    stats: (c) => `Questions answered: ${c.questions} · Accuracy: ${c.accuracy == null ? "–" : c.accuracy + "%"} · Minutes: ${c.minutes} · Active ${c.activeDays} of ${c.daysTracked} days`,
    causesHeading: "Why answers were wrong",
    causesNone: "No wrong answers were recorded on the server this week, so no pattern can be shown.",
    causesUntagged: (n) => `${n} wrong answer${n === 1 ? "" : "s"} recorded, but no reason has been tagged yet, so we are not guessing a pattern. Tag them in the wrong-answer notebook.`,
    causeLine: (label, n) => `${label}: ${n}`,
    causesPartial: (n) => `${n} more not tagged yet.`,
    homework: (h) => (h.assigned ? `Homework: ${h.solved} of ${h.assigned} solved${h.notDone ? ` · ${h.notDone} not done` : ""}` : "Homework: none assigned this week."),
    credits: (r) => `Credits: ${r.confirmed} confirmed${r.sgd ? ` (S$${r.sgd})` : ""} · ${r.pending} pending · ${r.forfeited} forfeited (homework not finished)`,
    paperHeading: "Mock exam / past paper this week",
    paperLine: (x) => `${x.label}: ${scoreText(x)}${x.counted ? "" : " · did not count as a set"}`,
    paperNone: "No mock exam or past paper handed in this week.",
    dashboard: "Open the parent dashboard",
    footer: "You get this weekly report because email alerts are on for your parent account.",
  },
};

export function weekRangeLabel(startYmd, endYmd) {
  const f = (y) => new Date(y + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  return `${f(startYmd)} – ${f(endYmd)}`;
}

// payload: { parentName, weekStart, weekEnd, dashboardUrl, children:[{ name, grade, subjects:[{name,sets,target,daysMet,daysTracked}], questions, accuracy|null,
//   minutes, activeDays, daysTracked, wrong:{total,untagged,byCause:{cause:n}}, homework:{assigned,solved,notDone}, credits:{confirmed,pending,forfeited,sgd},
//   papers:[{label,score,total,pct,counted,openToMark}] }] }
export function weeklyChildLines(c, t) {
  const w = c.wrong || { total: 0, untagged: 0, byCause: {} };
  const tagged = Object.entries(w.byCause || {}).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  const cause = !w.total ? [t.causesNone] : !tagged.length ? [t.causesUntagged(w.untagged)]
    : [...tagged.map(([k, n]) => t.causeLine(CAUSE_LABELS[k] || k, n)), ...(w.untagged ? [t.causesPartial(w.untagged)] : [])];
  const papers = (c.papers || []).length ? c.papers.map(t.paperLine) : [t.paperNone];
  return {
    subjects: c.subjects.length ? c.subjects.map(t.subjectLine) : [t.noSubjects],
    stats: t.stats(c),
    cause: [t.causesHeading, ...cause],
    homework: t.homework(c.homework || { assigned: 0, solved: 0, notDone: 0 }),
    credits: t.credits(c.credits || { confirmed: 0, pending: 0, forfeited: 0, sgd: 0 }),
    papers: [t.paperHeading, ...papers],
  };
}

export function renderWeeklyEmail(payload, locale = "en") {
  const t = COPY_WEEKLY[locale] || COPY_WEEKLY.en;
  const kids = payload.children || [];
  const range = weekRangeLabel(payload.weekStart, payload.weekEnd);
  const ctx = { ...payload, range, names: kids.map((c) => c.name).join(", ") };
  const blocks = kids.map((c) => ({ c, l: weeklyChildLines(c, t) }));
  const text = [t.greeting(ctx), t.intro(ctx), "",
    blocks.map(({ c, l }) => [t.childHeading(c), ...l.subjects, l.stats, "", ...l.cause, "", l.homework, l.credits, "", ...l.papers].join("\n")).join("\n\n"),
    "", `${t.dashboard}: ${payload.dashboardUrl}`, "", t.footer].join("\n");
  const ul = (a) => `<ul style="padding-left:18px;margin:4px 0">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0F172A">
<p>${esc(t.greeting(ctx))}<br>${esc(t.intro(ctx))}</p>
${blocks.map(({ c, l }) => `<h3 style="margin:16px 0 6px">${esc(t.childHeading(c))}</h3>${ul(l.subjects)}<p style="margin:6px 0">${esc(l.stats)}</p>
<p style="margin:6px 0"><b>${esc(l.cause[0])}</b></p>${ul(l.cause.slice(1))}<p style="margin:6px 0">${esc(l.homework)}<br>${esc(l.credits)}</p>
<p style="margin:6px 0"><b>${esc(l.papers[0])}</b></p>${ul(l.papers.slice(1))}`).join("")}
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
