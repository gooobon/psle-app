'use client';
// Parent "Papers" tab (issue #44): a child's mock past-paper results and marking of the open-ended items.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_MOCK_EXAMS_ENABLED (default OFF). Read: linked parents only. The model answer is shown here
// so the parent can mark; it is never sent to a student.
import React from 'react';
import { SERVER_AUTH, MOCK_EXAMS_ENABLED, serverGet, serverPost } from '@/lib/serverClient';
import { FLAG_NOTES, scoreLine } from '@/lib/examEngine';

const box = { background: '#fff', border: '1px solid #E2DBCF', borderRadius: 14, padding: '12px 14px', marginBottom: 12 };
const fmt = (s) => `${Math.floor((s || 0) / 60)} min ${(s || 0) % 60}s`;

export default function ParentExams({ child }) {
  const on = SERVER_AUTH && MOCK_EXAMS_ENABLED && !!child?.serverId;
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [note, setNote] = React.useState('');
  const [key, setKey] = React.useState(0);
  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/parent/exam?child=' + encodeURIComponent(child.serverId)).then((r) => { if (alive) { if (r.ok) { setD(r); setErr(''); } else setErr(r.error || 'Could not load papers.'); } });
    return () => { alive = false; };
  }, [on, child?.serverId, key]);
  if (!on) return null;
  if (err) return <div style={{ ...box, color: '#B3261E', fontSize: 13 }}>{err}</div>;
  if (!d) return <div style={{ ...box, fontSize: 13, color: '#6B6F7B' }}>Loading…</div>;
  async function mark(attemptId, questionId, correct) {
    const r = await serverPost('/api/parent/exam', { attemptId, questionId, correct });
    if (r.ok) { setKey((k) => k + 1); setNote(r.pending ? '' : 'Mark changed. The score is updated.'); } else setErr(r.error || 'Could not save the mark.');
  }
  if (!d.attempts.length) return <div style={{ ...box, fontSize: 13 }}>No mock papers yet.</div>;
  return (
    <div>
      {note ? <div style={{ ...box, fontSize: 13, color: '#4F6B22' }}>{note}</div> : null}
      {d.attempts.map((a) => (
        <div key={a.id} style={box}>
          <div style={{ fontWeight: 800 }}>{a.label}</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Score {scoreLine({ score: a.score, total: a.total, pending: a.pending })}{a.pending ? '' : a.percent == null ? '' : ` (${a.percent}%)`} · answered {a.answered}/{a.questionCount} · time {fmt(a.elapsedSeconds)} of {a.minutes} min
            {a.status === 'auto_submitted' ? ' · handed in automatically' : ''}
          </div>
          <div style={{ fontSize: 12, color: '#6B6F7B', marginTop: 2 }}>{a.counts ? 'Counted as the daily set.' : 'Did not count (under half the time used and under 80% answered).'}</div>
          {(a.flags || []).filter((f) => f === 'key_estimated').map((f) => <div key={f} style={{ fontSize: 12, color: '#6B6F7B', fontStyle: 'italic' }}>{FLAG_NOTES[f]}</div>)}
          {(a.sections || []).length ? <div style={{ fontSize: 12, marginTop: 6 }}>{a.sections.map((s) => `${s.section} ${s.score}/${s.total}`).join(' · ')}</div> : null}
          {a.open.length ? (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>Open-ended answers: marked automatically, you can change a mark ({a.open.filter((o) => o.mark == null).length} with no mark)</div>
              {a.open.map((o) => (
                <div key={o.questionId} style={{ borderTop: '1px solid #FBF6EA', paddingTop: 6, marginTop: 6, fontSize: 13 }}>
                  <div>{o.question}</div>
                  <div><b>Child:</b> {o.studentAnswer || <i>(blank)</i>}</div>
                  <div><b>Model answer:</b> {o.modelAnswer}</div>
                  {o.automatic ? <div style={{ fontSize: 12, color: '#6B6F7B' }}>Automatic mark: {o.mark ? 'correct' : 'not correct'}</div> : null}
                  <div style={{ marginTop: 4 }}>
                    {[[true, 'Correct'], [false, 'Not correct']].map(([v, t]) => (
                      <button key={t} onClick={() => mark(a.id, o.questionId, v)} style={{ marginRight: 8, padding: '4px 10px', borderRadius: 8, border: '2px solid ' + (o.mark === v ? '#1F3F95' : '#E2DBCF'), background: o.mark === v ? '#FBF6EA' : '#fff', cursor: 'pointer' }}>{t}</button>
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
