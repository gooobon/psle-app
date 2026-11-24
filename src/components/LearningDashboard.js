'use client';
// Learning dashboard (issue #42). Parent: Learning tab for one child + subject (same data for every linked parent).
// Student: own skills and error patterns. Flag NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED (default off). Read-only.
import React from 'react';
import taxonomy from '@/data/taxonomy/taxonomy.json';
import { serverGet } from '@/lib/serverClient';
import { causeLabel } from '@/lib/wrongNotebook';

const SKILL_LABEL = {};
for (const c of taxonomy.concepts || []) SKILL_LABEL[c.id] = c.label;
export const skillName = (k) => SKILL_LABEL[k] || (String(k).startsWith('sec:') ? String(k).slice(4) : k);

const WORD = {
  improving: { t: 'Improving', c: '#4F6B22', bg: '#FBF6EA' },
  flat: { t: 'Flat', c: '#D9A52E', bg: '#FBF6EA' },
  slipping: { t: 'Slipping', c: '#B3261E', bg: '#FBF6EA' },
  not_enough: { t: 'Not enough practice yet', c: '#6B6F7B', bg: '#FBF6EA' },
};
const card = { background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,.06)' };
const h = { fontSize: 11, fontWeight: 800, color: '#6B6F7B', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 };

function Bar({ pct, color }) {
  return (<div style={{ background: '#E2DBCF', borderRadius: 6, height: 8, flex: 1 }}><div style={{ width: `${Math.max(0, Math.min(100, pct || 0))}%`, background: color, height: 8, borderRadius: 6 }} /></div>);
}

export default function LearningDashboard({ childId, subject, self }) {
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  React.useEffect(() => {
    let alive = true; setD(null); setErr('');
    const url = self ? `/api/student/learning?subject=${encodeURIComponent(subject)}` : `/api/parent/learning?child=${encodeURIComponent(childId)}&subject=${encodeURIComponent(subject)}`;
    serverGet(url).then((r) => { if (!alive) return; if (r.ok) setD(r); else setErr('Could not load the learning dashboard.'); });
    return () => { alive = false; };
  }, [childId, subject, self]);
  if (err) return <div data-testid="learning-error" style={{ ...card, color: '#B3261E', fontSize: 13 }}>{err}</div>;
  if (!d) return <div style={{ ...card, color: '#6B6F7B', fontSize: 13 }}>Loading…</div>;
  const w = WORD[d.trend.word] || WORD.not_enough;
  const maxCause = Math.max(1, ...d.causes.map((c) => c.total));
  return (
    <div data-testid="learning-dashboard">
      {!self && (
        <div style={{ ...card, background: w.bg }}>
          <div style={h}>{subject} · is the child improving?</div>
          <div data-testid="learning-trend" style={{ fontSize: 22, fontWeight: 900, color: w.c }}>{w.t}</div>
          {d.trend.recent != null && d.trend.before != null && (
            <div style={{ fontSize: 12, color: '#6B6F7B', marginTop: 4 }}>First-try score: {d.trend.recent}% in the latest sessions vs {d.trend.before}% before.</div>
          )}
        </div>
      )}
      {!self && d.weekly.length > 0 && (
        <div style={card}>
          <div style={h}>Weekly first-attempt score</div>
          {d.weekly.slice(-8).map((x) => (
            <div key={x.week} data-testid="learning-week" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, fontSize: 12 }}>
              <span style={{ width: 84, color: '#6B6F7B' }}>Week of {x.week.slice(5)}</span><Bar pct={x.rate} color="#1F3F95" /><b style={{ width: 36, textAlign: 'right' }}>{x.rate}%</b>
            </div>
          ))}
        </div>
      )}
      <div style={card}>
        <div style={h}>Mastery by skill</div>
        {d.skills.length === 0 && <div style={{ fontSize: 13, color: '#6B6F7B' }}>No skill practice recorded yet. It appears after the child finishes a set with the app signed in.</div>}
        {d.skills.map((s) => (
          <div key={s.skill} data-testid="learning-skill" style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700 }}>
              <span>{skillName(s.skill)}</span>
              <span>{s.now}%{s.delta != null ? <span style={{ color: s.delta > 0 ? '#4F6B22' : s.delta < 0 ? '#B3261E' : '#6B6F7B' }}> {s.delta > 0 ? '▲' : s.delta < 0 ? '▼' : '='} {Math.abs(s.delta)} vs 7 days ago</span> : <span style={{ color: '#6B6F7B' }}> new this week</span>}</span>
            </div>
            <Bar pct={s.now} color={s.now >= 80 ? '#4F6B22' : s.now >= 50 ? '#D9A52E' : '#B3261E'} />
          </div>
        ))}
        <div style={{ fontSize: 10, color: '#6B6F7B', marginTop: 4 }}>First-try rate. Similar-question homework counts at half weight.</div>
      </div>
      <div style={card}>
        <div style={h}>{self ? 'Your error patterns' : 'Why answers were wrong'} · last 14 days</div>
        {d.causes.length === 0 && <div style={{ fontSize: 13, color: '#6B6F7B' }}>No wrong answers recorded in the last 14 days.</div>}
        {d.causes.map((c) => (
          <div key={c.cause} data-testid="learning-cause" style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700 }}>
              <span>{c.cause === 'untagged' ? 'No cause picked yet' : causeLabel(c.cause) || c.cause}</span>
              <span>{c.total} <span style={{ color: '#6B6F7B', fontWeight: 500 }}>({c.thisWeek} this week, {c.lastWeek} week before)</span></span>
            </div>
            <Bar pct={(c.total / maxCause) * 100} color="#1F3F95" />
          </div>
        ))}
      </div>
    </div>
  );
}
