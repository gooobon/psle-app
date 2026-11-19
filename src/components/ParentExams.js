'use client';
// Parent "Papers" tab (issue #44): a child's mock past-paper results and marking of the open-ended items.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_MOCK_EXAMS_ENABLED (default OFF). Read: linked parents only. The model answer is shown here
// so the parent can mark; it is never sent to a student.
import React from 'react';
import { SERVER_AUTH, MOCK_EXAMS_ENABLED, serverGet, serverPost } from '@/lib/serverClient';
import { FLAG_NOTES } from '@/lib/examEngine';

const box = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '12px 14px', marginBottom: 12 };
const fmt = (s) => `${Math.floor((s || 0) / 60)} min ${(s || 0) % 60}s`;

export default function ParentExams({ child }) {
  const on = SERVER_AUTH && MOCK_EXAMS_ENABLED && !!child?.serverId;
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [key, setKey] = React.useState(0);
  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/parent/exam?child=' + encodeURIComponent(child.serverId)).then((r) => { if (alive) { if (r.ok) { setD(r); setErr(''); } else setErr(r.error || 'Could not load papers.'); } });
    return () => { alive = false; };
  }, [on, child?.serverId, key]);
  if (!on) return null;
  if (err) return <div style={{ ...box, color: '#B91C1C', fontSize: 13 }}>{err}</div>;
  if (!d) return <div style={{ ...box, fontSize: 13, color: '#64748B' }}>Loading…</div>;
  async function mark(attemptId, questionId, correct) {
    const r = await serverPost('/api/parent/exam', { attemptId, questionId, correct });
    if (r.ok) setKey((k) => k + 1); else setErr(r.error || 'Could not save the mark.');
  }
  if (!d.attempts.length) return <div style={{ ...box, fontSize: 13 }}>No mock papers yet.</div>;
  return (
    <div>
      {d.attempts.map((a) => (
        <div key={a.id} style={box}>
          <div style={{ fontWeight: 800 }}>{a.label}</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Score {a.score}/{a.total} (auto-marked) · answered {a.answered}/{a.questionCount} · time {fmt(a.elapsedSeconds)} of {a.minutes} min
            {a.status === 'auto_submitted' ? ' · handed in automatically' : ''}
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{a.counts ? 'Counted as the daily set.' : 'Did not count (under half the time used and under 80% answered).'}</div>
          {(a.flags || []).filter((f) => f === 'key_estimated').map((f) => <div key={f} style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>{FLAG_NOTES[f]}</div>)}
          {(a.sections || []).length ? <div style={{ fontSize: 12, marginTop: 6 }}>{a.sections.map((s) => `${s.section} ${s.score}/${s.total}`).join(' · ')}</div> : null}
          {a.open.length ? (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>Open-ended answers to mark ({a.open.filter((o) => o.mark == null).length} left)</div>
              {a.open.map((o) => (
                <div key={o.questionId} style={{ borderTop: '1px solid #F1F5F9', paddingTop: 6, marginTop: 6, fontSize: 13 }}>
                  <div>{o.question}</div>
                  <div><b>Child:</b> {o.studentAnswer || <i>(blank)</i>}</div>
                  <div><b>Model answer:</b> {o.modelAnswer}</div>
                  <div style={{ marginTop: 4 }}>
                    {[[true, 'Correct'], [false, 'Not correct']].map(([v, t]) => (
                      <button key={t} onClick={() => mark(a.id, o.questionId, v)} style={{ marginRight: 8, padding: '4px 10px', borderRadius: 8, border: '2px solid ' + (o.mark === v ? '#7C3AED' : '#E2E8F0'), background: o.mark === v ? '#F5F3FF' : '#fff', cursor: 'pointer' }}>{t}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
