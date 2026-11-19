'use client';
// Mock exam from a real past paper (issue #44, docs/design/mock-exams-v1.md phase 1). Student side.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_MOCK_EXAMS_ENABLED (default OFF). Renders nothing useful unless the server says yes.
// Exam rules: no hints, no feedback, no explanations, no word popups; free navigation; flag-for-later; server wall-clock deadline;
// auto-submit at 0:00. The paper arrives WITHOUT answers and the server grades; this file never sees a key.
// In-progress answers live ONLY in the new key genius_exam_inprogress_v1 (no genius_* progress key is read or written).
import React from 'react';
import { serverGet, serverPost } from '@/lib/serverClient';
import { remainingSeconds, isAnswered, WARN_MINUTES } from '@/lib/examEngine';

const KEY = 'genius_exam_inprogress_v1';
const card = { background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,.06)' };
const btn = (bg = '#7C3AED') => ({ background: bg, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 800, cursor: 'pointer', fontSize: 14 });
const ghost = { background: '#F1F5F9', color: '#334155', border: 'none', borderRadius: 10, padding: '8px 12px', fontWeight: 700, cursor: 'pointer', fontSize: 13 };
const note = { fontSize: 12, color: '#64748B', marginTop: 4 };

function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }
function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage full: the server deadline still holds */ } }
function clear() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// ── one question input ───────────────────────────────────────────────────────
function Choice({ options, value, onPick }) {
  return (
    <div style={{ display: 'grid', gap: 6, marginTop: 6 }}>
      {options.map((o, i) => (
        <button key={i} onClick={() => onPick(i)} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: 10, border: '2px solid ' + (value === i ? '#7C3AED' : '#E2E8F0'), background: value === i ? '#F5F3FF' : '#fff', cursor: 'pointer', fontSize: 14 }}>
          <b>{String.fromCharCode(65 + i)}.</b> {o}
        </button>
      ))}
    </div>
  );
}
function Text({ value, onChange, placeholder }) {
  return <input value={value == null ? '' : String(value)} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || 'Type your answer'} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, marginTop: 6, boxSizing: 'border-box' }} />;
}

function CompQuestion({ q, a, set }) {
  const v = (a && a.val) ?? null;
  const head = <div style={{ fontSize: 14, fontWeight: 700 }}>{q.no ? q.no + '. ' : ''}{q.stem} <span style={{ color: '#94A3B8', fontWeight: 600 }}>[{q.marks}]</span></div>;
  if (q.fmt === 'mcq') return <div>{head}<Choice options={q.options} value={v} onPick={(i) => set({ val: i })} /></div>;
  const ab = Array.isArray(q.abChoices) && q.abChoices.length ? q.abChoices : ['A', 'B'];
  if (q.fmt === 'ab_circle') return <div>{head}<Choice options={ab} value={ab.indexOf(v)} onPick={(i) => set({ val: ab[i] })} /></div>;
  if (q.fmt === 'true_false') {
    const sts = Array.isArray(q.statements) && q.statements.length ? q.statements : [q.stem];
    const arr = Array.isArray(v) ? v : [];
    return (
      <div>{head}
        {sts.map((s, i) => (
          <div key={i} style={{ marginTop: 6, fontSize: 13 }}>{s !== q.stem ? s : null}
            {['True', 'False'].map((t) => (
              <button key={t} onClick={() => { const n = sts.map((_, j) => arr[j] ?? null); n[i] = t; set({ val: n }); }} style={{ marginRight: 8, padding: '5px 12px', borderRadius: 8, border: '2px solid ' + (arr[i] === t ? '#7C3AED' : '#E2E8F0'), background: arr[i] === t ? '#F5F3FF' : '#fff', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (q.fmt === 'sequence') {
    const items = Array.isArray(q.sequenceItems) ? q.sequenceItems : [];
    const seq = Array.isArray(a && a.seq) ? a.seq : [];
    return (
      <div>{head}
        {items.map((it, i) => (
          <div key={i} style={{ marginTop: 6, fontSize: 13 }}>
            <input value={seq[i] ?? ''} onChange={(e) => { const n = items.map((_, j) => seq[j] ?? ''); n[i] = e.target.value.replace(/[^0-9]/g, '').slice(0, 2); set({ seq: n }); }} style={{ width: 40, textAlign: 'center', padding: 4, marginRight: 8 }} inputMode="numeric" />{it}
          </div>
        ))}
      </div>
    );
  }
  // fill_blank / fill_word / tf_reason / open_sentence: typed text. Open-ended answers are marked by the parent after the paper.
  return <div>{head}<Text value={v} onChange={(t) => set({ val: t })} placeholder={q.fmt === 'open_sentence' ? 'Write your answer (your parent will mark this one)' : undefined} /></div>;
}

function Section({ sec, answers, setAns, flags, toggleFlag }) {
  const Flag = ({ id }) => <button onClick={() => toggleFlag(id)} style={{ ...ghost, padding: '2px 8px', fontSize: 11, marginLeft: 8, background: flags[id] ? '#FEF3C7' : '#F1F5F9' }}>{flags[id] ? '★ flagged' : '☆ flag'}</button>;
  if (sec.items) {
    return sec.items.map((q, i) => (
      <div key={q.id} style={card}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{i + 1}. {q.sentence}<Flag id={q.id} /></div>
        {q.options && q.options.length
          ? <Choice options={q.options} value={answers[q.id] ? answers[q.id].val : null} onPick={(k) => setAns(q.id, { val: k })} />
          : <Text value={answers[q.id] && answers[q.id].val} onChange={(t) => setAns(q.id, { val: t })} />}
      </div>
    ));
  }
  return sec.sets.map((s) => (
    <div key={s.id} style={card}>
      {s.label ? <div style={{ fontSize: 12, fontWeight: 800, color: '#7C3AED', marginBottom: 6 }}>{s.label}</div> : null}
      {s.instructions ? <div style={note}>{s.instructions}</div> : null}
      {s.passage ? <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.5, background: '#F8FAFC', borderRadius: 10, padding: 10, margin: '6px 0' }}>{s.passage}</div> : null}
      {s.wordBank && s.wordBank.length ? <div style={note}>Word bank: {s.wordBank.join(' · ')}</div> : null}
      {(s.blanks || []).map((b) => (
        <div key={b.id} style={{ marginTop: 8, fontSize: 14 }}>
          <b>({b.num})</b><Flag id={b.id} />
          {b.choices && b.choices.length
            ? <Choice options={b.choices} value={b.choices.indexOf(answers[b.id] && answers[b.id].val)} onPick={(k) => setAns(b.id, { val: b.choices[k] })} />
            : s.wordBank && s.wordBank.length
              ? <Choice options={s.wordBank} value={s.wordBank.indexOf(answers[b.id] && answers[b.id].val)} onPick={(k) => setAns(b.id, { val: s.wordBank[k] })} />
              : <Text value={answers[b.id] && answers[b.id].val} onChange={(t) => setAns(b.id, { val: t })} />}
        </div>
      ))}
      {(s.items || []).map((q, i) => (
        <div key={q.id} style={{ marginTop: 10, fontSize: 14 }}>
          <div>{i + 1}. {q.sentence}<Flag id={q.id} /></div>
          <Choice options={q.options} value={answers[q.id] ? answers[q.id].val : null} onPick={(k) => setAns(q.id, { val: k })} />
        </div>
      ))}
      {(s.questions || []).map((q) => (
        <div key={q.id} style={{ marginTop: 12 }}>
          <CompQuestion q={q} a={answers[q.id]} set={(p) => setAns(q.id, p)} /><Flag id={q.id} />
        </div>
      ))}
    </div>
  ));
}

// ── the exam screen ──────────────────────────────────────────────────────────
function Sitting({ attempt, paper, initial, onSubmitted, onExit }) {
  const [answers, setAnswers] = React.useState(initial.answers || {});
  const [flags, setFlags] = React.useState(initial.flags || {});
  const [secIdx, setSecIdx] = React.useState(0);
  const [now, setNow] = React.useState(Date.now());
  const [phase, setPhase] = React.useState('sit'); // sit | check | sending
  const [err, setErr] = React.useState('');
  const sent = React.useRef(false);
  const deadline = Date.parse(attempt.deadlineAt);

  React.useEffect(() => { save({ attemptId: attempt.id, answers, flags }); }, [attempt.id, answers, flags]);
  React.useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = remainingSeconds(deadline, now);

  const submit = React.useCallback(async (auto) => {
    if (sent.current) return;
    sent.current = true; setPhase('sending'); setErr('');
    const body = {}; for (const [id, a] of Object.entries(answers)) body[id] = { ...a, flagged: !!flags[id] };
    const r = await serverPost('/api/student/exam', { action: 'submit', attemptId: attempt.id, answers: body, auto: !!auto });
    if (r.ok) { clear(); onSubmitted(r); } else { sent.current = false; setPhase('check'); setErr(r.error || 'Could not submit. Your answers are saved on this device; try again.'); }
  }, [answers, flags, attempt.id, onSubmitted]);

  React.useEffect(() => { if (left <= 0 && phase === 'sit') submit(true); }, [left, phase, submit]);
  React.useEffect(() => { if (left <= 0 && phase === 'check') submit(true); }, [left, phase, submit]);

  const setAns = (id, patch) => setAnswers((a) => ({ ...a, [id]: { ...(a[id] || {}), ...patch } }));
  const toggleFlag = (id) => setFlags((f) => ({ ...f, [id]: !f[id] }));
  const ids = paper.questionIds;
  const unanswered = ids.filter((id) => !isAnswered(answers[id]));
  const flagged = ids.filter((id) => flags[id]);
  const warn = WARN_MINUTES.find((m) => left > 0 && left <= m * 60);
  const sec = paper.sections[secIdx];

  const timer = <div style={{ position: 'sticky', top: 0, zIndex: 5, background: warn ? '#FEF3C7' : '#0F172A', color: warn ? '#92400E' : '#fff', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginBottom: 10 }}>
    <b>{attempt.label}</b><b style={{ fontSize: 18 }}>{fmt(left)}</b>
  </div>;

  if (phase === 'check' || phase === 'sending') {
    return (
      <div style={{ padding: 16 }}>{timer}
        <div style={card}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>Check before you hand in</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Unanswered: <b>{unanswered.length}</b> of {ids.length} · Flagged for later: <b>{flagged.length}</b></div>
          <div style={note}>You cannot change your answers after you hand in.</div>
          {err ? <div style={{ color: '#B91C1C', fontSize: 13, marginTop: 6 }}>{err}</div> : null}
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button style={ghost} disabled={phase === 'sending'} onClick={() => setPhase('sit')}>Back to the paper</button>
            <button style={btn('#059669')} disabled={phase === 'sending'} onClick={() => submit(false)}>{phase === 'sending' ? 'Handing in…' : 'Hand in'}</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: 16 }}>
      {timer}
      {warn ? <div style={{ ...card, background: '#FEF3C7', fontSize: 13 }}>{warn === 1 ? 'Less than 1 minute left.' : `${warn} minutes left.`}</div> : null}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 10 }}>
        {paper.sections.map((s, i) => (
          <button key={s.type} onClick={() => setSecIdx(i)} style={{ ...ghost, background: i === secIdx ? '#7C3AED' : '#F1F5F9', color: i === secIdx ? '#fff' : '#334155', whiteSpace: 'nowrap' }}>{s.label}</button>
        ))}
      </div>
      <Section sec={sec} answers={answers} setAns={setAns} flags={flags} toggleFlag={toggleFlag} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <button style={ghost} disabled={secIdx === 0} onClick={() => setSecIdx(secIdx - 1)}>← Previous section</button>
        {secIdx + 1 < paper.sections.length
          ? <button style={btn()} onClick={() => setSecIdx(secIdx + 1)}>Next section →</button>
          : <button style={btn('#059669')} onClick={() => setPhase('check')}>Finish and check</button>}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10 }}><button style={ghost} onClick={() => setPhase('check')}>Stop early and hand in</button></div>
    </div>
  );
}

// ── result (verdict only; no answer key is ever sent to the student) ─────────
function Result({ r, onDone }) {
  const a = r.attempt;
  const bad = (r.verdicts || []).filter((v) => v.correct === false);
  return (
    <div style={{ padding: 16 }}>
      <div style={card}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>{a.label}</div>
        <div style={{ fontSize: 15, marginTop: 6 }}>Score: <b>{a.score}/{a.total}</b> (auto-marked) · Answered {a.answered}/{a.questionCount} · Time used {fmt(a.elapsedSeconds || 0)}</div>
        {a.openTotal ? <div style={note}>{a.openTotal} open-ended question{a.openTotal === 1 ? '' : 's'} will be marked by your parent.</div> : null}
        {a.status === 'auto_submitted' ? <div style={note}>Time ran out, so your paper was handed in automatically.</div> : null}
        <div style={{ ...note, marginTop: 8 }}>{a.counts ? 'This paper counts as today\'s set.' : 'This paper did not count as a set: it needs at least half the time used or 80% of the questions answered.'}</div>
      </div>
      <div style={card}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>By section</div>
        {(a.sections || []).map((s) => <div key={s.section} style={{ fontSize: 14 }}>{s.section}: {s.score}/{s.total}</div>)}
      </div>
      {bad.length ? <div style={card}><div style={{ fontWeight: 800 }}>{bad.length} to review</div><div style={note}>Ask your parent to go over these with you. Questions you missed are not shown with answers here.</div></div> : null}
      <button style={btn()} onClick={onDone}>Done</button>
    </div>
  );
}

// ── picker + controller ──────────────────────────────────────────────────────
export default function PaperExam({ onBack }) {
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [sitting, setSitting] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [busy, setBusy] = React.useState('');

  const refresh = React.useCallback(() => serverGet('/api/student/exam').then((r) => { if (r.ok) { setD(r); setErr(''); } else setErr(r.error || 'Mock papers are not available.'); }), []);
  React.useEffect(() => { refresh(); }, [refresh]);

  async function start(paperId) {
    setBusy(paperId); setErr('');
    const r = await serverPost('/api/student/exam', { action: 'start', paperId });
    setBusy('');
    if (!r.ok) { setErr(r.error || 'Could not start.'); return; }
    const local = load();
    setSitting({ attempt: r.attempt, paper: r.paper, initial: local && local.attemptId === r.attempt.id ? local : {} });
  }
  // An unfinished attempt (page closed / refreshed): the server deadline keeps running. Resume, or auto-submit saved answers if time is up.
  async function resume() {
    if (!d || !d.open) return;
    const local = load();
    if (d.open.expired) {
      setBusy('resume');
      const body = {}; const ans = local && local.attemptId === d.open.id ? local.answers || {} : {};
      for (const [id, a] of Object.entries(ans)) body[id] = { ...a, flagged: !!(local.flags || {})[id] };
      const r = await serverPost('/api/student/exam', { action: 'submit', attemptId: d.open.id, answers: body, auto: true });
      setBusy('');
      if (r.ok) { clear(); setResult(r); refresh(); } else setErr(r.error || 'Could not hand in.');
      return;
    }
    await start(d.open.paperId);
  }

  if (result) return <Result r={result} onDone={() => { setResult(null); refresh(); }} />;
  if (sitting) return <Sitting attempt={sitting.attempt} paper={sitting.paper} initial={sitting.initial} onSubmitted={(r) => { setSitting(null); setResult(r); }} onExit={() => setSitting(null)} />;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>Mock papers</div>
        <button style={ghost} onClick={onBack}>← Back</button>
      </div>
      <div style={{ ...card, fontSize: 13 }}>
        Real past papers, timed like the real exam. No hints and no answers until you hand in. Only the written, auto-marked parts of each paper are included (no listening, oral or composition).
      </div>
      {err ? <div style={{ ...card, color: '#B91C1C', fontSize: 13 }}>{err}</div> : null}
      {!d && !err ? <div style={{ ...card, color: '#64748B', fontSize: 13 }}>Loading…</div> : null}
      {d && d.open ? (
        <div style={{ ...card, background: '#FFFBEB' }}>
          <b>You have a paper in progress: {d.open.label}</b>
          <div style={note}>{d.open.expired ? 'Time is up. Hand it in to see your score.' : 'The clock kept running while you were away.'}</div>
          <button style={{ ...btn(), marginTop: 8 }} disabled={!!busy} onClick={resume}>{d.open.expired ? 'Hand in' : 'Continue'}</button>
        </div>
      ) : null}
      {d && d.papers.map((p) => {
        const tries = d.attempts.filter((a) => a.paperId === p.id).length;
        return (
          <div key={p.id} style={{ ...card, border: p.id === d.recommendedId ? '2px solid #7C3AED' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{p.label}{p.id === d.recommendedId ? <span style={{ color: '#7C3AED', fontSize: 11, marginLeft: 6 }}>next up</span> : null}</div>
                <div style={note}>{p.marks} marks · {p.minutes} min ({p.minutesRule}){tries ? ` · done ${tries}x` : ''}</div>
                {(p.notes || []).map((n, i) => <div key={i} style={{ ...note, fontStyle: 'italic' }}>{n}</div>)}
              </div>
              <button style={btn()} disabled={!!busy || (d.open && !d.open.expired)} onClick={() => start(p.id)}>{busy === p.id ? '…' : 'Start'}</button>
            </div>
          </div>
        );
      })}
      {d && d.attempts.length ? (
        <div style={card}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Your papers</div>
          {d.attempts.slice(0, 10).map((a) => <div key={a.id} style={{ fontSize: 13 }}>{a.label}: {a.score}/{a.total}{a.counts ? '' : ' (did not count)'}</div>)}
        </div>
      ) : null}
    </div>
  );
}
