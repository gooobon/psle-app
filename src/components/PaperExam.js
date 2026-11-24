'use client';
// Mock exam from a real past paper (issue #44, docs/design/mock-exams-v1.md phase 1). Student side.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_MOCK_EXAMS_ENABLED (default OFF). Renders nothing useful unless the server says yes.
// Exam rules: no hints, no feedback, no explanations, no word popups; free navigation; flag-for-later; server wall-clock deadline;
// auto-submit at 0:00. The paper arrives WITHOUT answers and the server grades; this file never sees a key.
// In-progress answers live ONLY in the new key genius_exam_inprogress_v1 (no genius_* progress key is read or written).
import React from 'react';
import { serverGet, serverPost } from '@/lib/serverClient';
import { remainingSeconds, isAnswered, WARN_MINUTES, scoreLine, percentOf } from '@/lib/examEngine';
import { CAUSES } from '@/lib/wrongNotebook';
import OrderTap from '@/components/OrderTap';

const KEY = 'genius_exam_inprogress_v1';
const card = { background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,.06)' };
const btn = (bg = '#7C3AED') => ({ background: bg, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 800, cursor: 'pointer', fontSize: 14 });
const ghost = { background: '#F1F5F9', color: '#334155', border: 'none', borderRadius: 10, padding: '8px 12px', fontWeight: 700, cursor: 'pointer', fontSize: 13 };
const note = { fontSize: 12, color: '#64748B', marginTop: 4 };

function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }
function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage full: the server deadline still holds */ } }
function clear() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
// Resume state: the server copy wins, unless this device holds unsynced changes for the same attempt.
function mergeDraft(attemptId, server) {
  const local = load();
  if (local && local.attemptId === attemptId && local.pending) return local;
  if (server && (Object.keys(server.answers || {}).length || Object.keys(server.flags || {}).length)) return { attemptId, answers: server.answers || {}, flags: server.flags || {} };
  return local && local.attemptId === attemptId ? local : {};
}
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
// Underline the misspelled word only when it stands alone. "in" must not light up inside "underlined".
function underlined(sentence, wrongWord) {
  const sent = String(sentence || '');
  const w = String(wrongWord || '');
  if (!w) return sent;
  const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = sent.match(new RegExp('(?<![A-Za-z])' + esc + '(?![A-Za-z])'));
  if (!m) return sent;
  const at = m.index;
  return <>{sent.slice(0, at)}<span style={{ textDecoration: 'underline', background: '#FEF08A', fontWeight: 800, padding: '0 2px' }}>{sent.slice(at, at + w.length)}</span>{sent.slice(at + w.length)}</>;
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
        <OrderTap items={items} value={items.map((_, i) => seq[i])} onChange={(next) => set({ seq: next.map((r) => (r > 0 ? String(r) : '')) })} />
      </div>
    );
  }
  // fill_blank / fill_word / tf_reason / open_sentence: typed text. Open-ended answers get an automatic mark at hand-in.
  return <div>{head}<Text value={v} onChange={(t) => set({ val: t })} placeholder={q.fmt === 'open_sentence' ? 'Write your answer in a full sentence' : undefined} /></div>;
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
          <div>{i + 1}. {underlined(q.sentence, q.wrongWord)}<Flag id={q.id} /></div>
          {q.options && q.options.length >= 2
            ? <Choice options={q.options} value={answers[q.id] ? answers[q.id].val : null} onPick={(k) => setAns(q.id, { val: k })} />
            : <Text value={answers[q.id] && answers[q.id].val} onChange={(t) => setAns(q.id, { val: t })} placeholder="Write the correct word" />}
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

  // Local copy (new key only) marks itself unsynced; the server copy is the cross-device source of truth.
  const dirty = React.useRef(false), inflight = React.useRef(null), latest = React.useRef({ answers, flags });
  latest.current = { answers, flags };
  const syncNow = React.useCallback(() => {
    if (!dirty.current) return inflight.current || Promise.resolve();
    const { answers: A, flags: F } = latest.current;
    const body = {}; for (const [id, a] of Object.entries(A)) body[id] = { ...a, flagged: !!F[id] };
    for (const id of Object.keys(F)) if (F[id] && !body[id]) body[id] = { val: null, flagged: true };
    dirty.current = false;
    const p = serverPost('/api/student/exam', { action: 'save', attemptId: attempt.id, answers: body }).then((r) => {
      if (!r.ok) dirty.current = true; // network / server error: retry on the next tick, the local copy is still there
      else save({ attemptId: attempt.id, answers: latest.current.answers, flags: latest.current.flags, pending: dirty.current });
    }).finally(() => { if (inflight.current === p) inflight.current = null; });
    inflight.current = p;
    return p;
  }, [attempt.id]);
  React.useEffect(() => { dirty.current = true; save({ attemptId: attempt.id, answers, flags, pending: true }); const t = setTimeout(syncNow, 3000); return () => clearTimeout(t); }, [attempt.id, answers, flags, syncNow]);
  React.useEffect(() => { const t = setInterval(syncNow, 30000); return () => clearInterval(t); }, [syncNow]);
  React.useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = remainingSeconds(deadline, now);

  const submit = React.useCallback(async (auto) => {
    if (sent.current) return;
    sent.current = true; setPhase('sending'); setErr('');
    if (inflight.current) await inflight.current; // never let a draft save land after the hand-in
    const body = {}; for (const [id, a] of Object.entries(answers)) body[id] = { ...a, flagged: !!flags[id] };
    const r = await serverPost('/api/student/exam', { action: 'submit', attemptId: attempt.id, answers: body, auto: !!auto });
    if (r.ok) { clear(); onSubmitted(r); }
    else if (r.status === 409) { clear(); onExit(); } // too late: the server already handed in the saved answers (auto-submitted); the list shows the result
    else { sent.current = false; setPhase('check'); setErr(r.error || 'Could not submit. Your answers are saved on this device; try again.'); }
  }, [answers, flags, attempt.id, onSubmitted, onExit]);

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

// ── result (verdict only until the student opens the review; the key is never sent in this response) ─────────
function rewardLine(w) {
  if (!w || !w.saturday) return null;
  if (w.eligible) {
    const bits = ['Saturday past paper done.'];
    if (w.sticker) bits.push('You earned a sticker.');
    if (w.credits > 0) bits.push(w.awarded ? `${w.credits} credit${w.credits === 1 ? '' : 's'} added as pending.` : `${w.credits} credit${w.credits === 1 ? '' : 's'} already recorded for this Saturday.`);
    if (w.credits > 0 && w.homework && w.homework.remaining > 0) bits.push("Finish today's homework to confirm it.");
    return bits.join(' ');
  }
  if (w.reason === 'too_little') return 'No Saturday paper reward this time: it needs at least half the time used or 80% of the questions answered.';
  return null; // rewards off / not configured: say nothing
}
function Result({ r, onDone, onReview }) {
  const a = r.attempt;
  const bad = (r.verdicts || []).filter((v) => v.correct === false);
  const rw = rewardLine(r.reward);
  const short = (r.verdicts || []).filter((v) => v.tooShort);
  return (
    <div style={{ padding: 16 }}>
      <div style={card}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>{a.label}</div>
        <div style={{ fontSize: 15, marginTop: 6 }}>Score: <b>{scoreLine({ score: a.score, total: a.total, pending: a.parentPending })}</b>{a.parentPending ? '' : ` (${percentOf(a.score, a.total) == null ? 0 : percentOf(a.score, a.total)}%)`} · Answered {a.answered}/{a.questionCount} · Time used {fmt(a.elapsedSeconds || 0)}</div>
        {short.length ? <div style={note}>Write a full answer to earn this mark. Too short or blank: {short.map((v) => 'Question ' + (v.no || v.id)).join(', ')}.</div> : null}
        {a.parentPending ? <div style={note}>{a.parentPending} open-ended question{a.parentPending === 1 ? ' has' : 's have'} no model answer to check against and {a.parentPending === 1 ? 'is' : 'are'} not in your score.</div> : null}
        {a.status === 'auto_submitted' ? <div style={note}>Time ran out, so your paper was handed in automatically.</div> : null}
        <div style={{ ...note, marginTop: 8 }}>{a.counts ? 'This paper counts as today\'s set.' : 'This paper did not count as a set: it needs at least half the time used or 80% of the questions answered.'}</div>
        {rw ? <div style={{ ...note, marginTop: 8, color: '#065F46', fontWeight: 700 }}>{rw}</div> : null}
      </div>
      <div style={card}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>By section</div>
        {(a.sections || []).map((s) => <div key={s.section} style={{ fontSize: 14 }}>{s.section}: {s.score}/{s.total}</div>)}
      </div>
      {bad.length ? <div style={card}><div style={{ fontWeight: 800 }}>{bad.length} to review</div><div style={note}>Open the review to see each answer and the explanation. Missed questions are also added to your notebook.</div></div> : null}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={btn('#059669')} onClick={() => onReview(a.id)}>Review answers</button>
        <button style={btn()} onClick={onDone}>Done</button>
      </div>
    </div>
  );
}

// ── review of one handed-in paper: your answer, the correct answer, the explanation, and why you missed it ──────
// The server only returns this for the student's OWN finished attempt. Cause picking is optional; skipped = no cause saved.
function Review({ attemptId, onBack, onNotebook, onCause }) {
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [all, setAll] = React.useState(false);
  const [saving, setSaving] = React.useState('');
  React.useEffect(() => {
    let alive = true;
    serverGet('/api/student/exam?review=' + encodeURIComponent(attemptId)).then((r) => {
      if (!alive) return;
      if (r.ok) { setD(r); setErr(''); if (onNotebook) onNotebook(r.attempt, r.items); } else setErr(r.error || 'Could not load the review.');
    });
    return () => { alive = false; };
  }, [attemptId, onNotebook]);
  async function pick(it, cause) {
    setSaving(it.id);
    const r = await serverPost('/api/student/exam', { action: 'cause', attemptId, questionId: it.id, cause });
    setSaving('');
    if (r.ok) { setD((x) => ({ ...x, items: x.items.map((y) => (y.id === it.id ? { ...y, cause } : y)) })); if (onCause) onCause(attemptId, it.id, cause); }
    else setErr(r.error || 'Could not save.');
  }
  const head = <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}><div style={{ fontSize: 18, fontWeight: 900 }}>Review</div><button style={ghost} onClick={onBack}>← Back</button></div>;
  if (err && !d) return <div style={{ padding: 16 }}>{head}<div style={{ ...card, color: '#B91C1C', fontSize: 13 }}>{err}</div></div>;
  if (!d) return <div style={{ padding: 16 }}>{head}<div style={{ ...card, fontSize: 13, color: '#64748B' }}>Loading…</div></div>;
  const todo = d.items.filter((it) => it.correct === false || it.openEnded);
  const shown = all ? d.items : todo;
  const skipped = Math.max(0, d.notebookCap || 0);
  return (
    <div style={{ padding: 16 }}>
      {head}
      <div style={card}>
        <div style={{ fontWeight: 800 }}>{d.attempt.label}</div>
        <div style={note}>Score {scoreLine({ score: d.attempt.score, total: d.attempt.total, pending: d.attempt.parentPending })} · {todo.length} to review</div>
        {skipped > 0 ? <div style={note}>To keep your notebook manageable, {skipped} missed question{skipped === 1 ? ' is' : 's are'} listed here but not added to it.</div> : null}
        <div style={{ marginTop: 8 }}>
          <button style={{ ...ghost, background: all ? '#F1F5F9' : '#EDE9FE' }} onClick={() => setAll(false)}>To review</button>{' '}
          <button style={{ ...ghost, background: all ? '#EDE9FE' : '#F1F5F9' }} onClick={() => setAll(true)}>All questions</button>
        </div>
      </div>
      {err ? <div style={{ ...card, color: '#B91C1C', fontSize: 13 }}>{err}</div> : null}
      {shown.length === 0 ? <div style={{ ...card, fontSize: 13 }}>Nothing to review. Well done!</div> : null}
      {shown.map((it) => (
        <div key={it.id} style={{ ...card, borderLeft: '4px solid ' + (it.correct === true ? '#10B981' : it.correct === false ? '#EF4444' : '#F59E0B') }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED' }}>{it.section}{it.no ? ' · Q' + it.no : ''}</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{it.prompt || it.id}</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Your answer: <b>{it.answered ? it.yourAnswer : '(no answer)'}</b></div>
          {it.ambiguous || it.keyMissing
            ? <div style={note}>{it.keyMissing ? 'This question is not available in our copy of the paper, so it is not counted in your score.' : 'This question could not be auto-marked, so no answer is shown.'}</div>
            : <div style={{ fontSize: 13 }}>{it.openEnded ? 'Model answer' : 'Correct answer'}: <b>{it.correctAnswer || '—'}</b></div>}
          {it.openEnded ? <div style={note}>{it.parentMark === true ? 'Marked correct. This mark is automatic and your parent can still change it.' : it.parentMark === false ? 'Marked not correct. This mark is automatic and your parent can still change it.' : 'This one has no automatic mark.'}</div> : null}
          {it.explanation ? <div style={{ fontSize: 13, marginTop: 6, background: '#F8FAFC', borderRadius: 8, padding: 8 }}>{it.explanation}</div> : null}
          {it.correct === false && it.inNotebook ? (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#64748B', marginBottom: 4 }}>Why did you get it wrong?{it.suggestedCause && !it.cause ? ' (suggestion: Ran out of time)' : ''}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {CAUSES.map((c) => {
                  const on = it.cause === c.value, hint = !it.cause && it.suggestedCause === c.value;
                  return <button key={c.value} disabled={saving === it.id} onClick={() => pick(it, c.value)} style={{ padding: '5px 10px', borderRadius: 999, border: '2px solid ' + (on ? '#7C3AED' : hint ? '#C4B5FD' : '#E2E8F0'), background: on ? '#F5F3FF' : '#fff', fontSize: 12, cursor: 'pointer' }}>{c.label}</button>;
                })}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// ── picker + controller ──────────────────────────────────────────────────────
export default function PaperExam({ onBack, onNotebook, onCause }) {
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [sitting, setSitting] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [busy, setBusy] = React.useState('');
  const [reviewId, setReviewId] = React.useState(null);

  const refresh = React.useCallback(() => serverGet('/api/student/exam').then((r) => { if (r.ok) { setD(r); setErr(''); } else setErr(r.error || 'Mock papers are not available.'); }), []);
  React.useEffect(() => { refresh(); }, [refresh]);

  async function start(paperId) {
    setBusy(paperId); setErr('');
    const r = await serverPost('/api/student/exam', { action: 'start', paperId });
    setBusy('');
    if (!r.ok) { setErr(r.error || 'Could not start.'); return; }
    setSitting({ attempt: r.attempt, paper: r.paper, initial: mergeDraft(r.attempt.id, r) });
    if (r.autoSubmitted) refresh(); // a previous expired sitting was handed in from its saved answers
  }
  // An unfinished attempt (page closed / refreshed): the server deadline keeps running. Resume, or auto-submit saved answers if time is up.
  async function resume() {
    if (!d || !d.open) return;
    if (d.open.expired) { // the server auto-submits an expired sitting from its saved answers; reload to show it
      setBusy('resume'); await refresh(); setBusy('');
      return;
    }
    await start(d.open.paperId);
  }

  // Missed items of a handed-in paper join the notebook even if the student never opens the review (the review fetch does it).
  React.useEffect(() => {
    const id = result && result.attempt && result.attempt.id;
    if (!id || !onNotebook) return;
    serverGet('/api/student/exam?review=' + encodeURIComponent(id)).then((r) => { if (r.ok) onNotebook(r.attempt, r.items); });
  }, [result, onNotebook]);
  // The newest finished paper is also synced when the list loads: covers a paper that was auto-submitted while the page was closed.
  const latestId = d && d.attempts && d.attempts[0] && d.attempts[0].id;
  React.useEffect(() => {
    if (!latestId || !onNotebook) return;
    serverGet('/api/student/exam?review=' + encodeURIComponent(latestId)).then((r) => { if (r.ok) onNotebook(r.attempt, r.items); });
  }, [latestId, onNotebook]);

  if (reviewId) return <Review attemptId={reviewId} onBack={() => setReviewId(null)} onNotebook={onNotebook} onCause={onCause} />;
  if (result) return <Result r={result} onDone={() => { setResult(null); refresh(); }} onReview={(id) => setReviewId(id)} />;
  if (sitting) return <Sitting attempt={sitting.attempt} paper={sitting.paper} initial={sitting.initial} onSubmitted={(r) => { setSitting(null); setResult(r); }} onExit={() => setSitting(null)} />;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>Mock papers</div>
        <button style={ghost} onClick={onBack}>← Back</button>
      </div>
      <div style={{ ...card, fontSize: 13 }}>
        Real past papers, timed like the real exam. No hints and no answers until you hand in; then you can review every answer. Only the written, auto-marked parts of each paper are included (no listening, oral or composition).
      </div>
      {err ? <div style={{ ...card, color: '#B91C1C', fontSize: 13 }}>{err}</div> : null}
      {!d && !err ? <div style={{ ...card, color: '#64748B', fontSize: 13 }}>Loading…</div> : null}
      {d && d.autoSubmitted ? (
        <div style={{ ...card, background: '#ECFDF5', fontSize: 13 }}>
          <b>{d.autoSubmitted.label}</b>: time ran out, so your saved answers were handed in automatically. Score {scoreLine({ score: d.autoSubmitted.score, total: d.autoSubmitted.total, pending: d.autoSubmitted.parentPending })}.
        </div>
      ) : null}
      {d && d.open ? (
        <div style={{ ...card, background: '#FFFBEB' }}>
          <b>You have a paper in progress: {d.open.label}</b>
          <div style={note}>{d.open.expired ? 'Time is up. Your saved answers are being handed in.' : 'The clock kept running while you were away.'}</div>
          <button style={{ ...btn(), marginTop: 8 }} disabled={!!busy} onClick={resume}>{d.open.expired ? 'Refresh' : 'Continue'}</button>
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
          {d.attempts.slice(0, 10).map((a) => <div key={a.id} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span>{a.label}: {scoreLine({ score: a.score, total: a.total, pending: a.parentPending })}{a.counts ? '' : ' (did not count)'}</span><button style={{ ...ghost, padding: '2px 8px', fontSize: 11 }} onClick={() => setReviewId(a.id)}>Review</button></div>)}
        </div>
      ) : null}
    </div>
  );
}
