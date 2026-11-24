'use client';
// Parent "Rewards" tab (roadmap step 9): sticker count, weekly review status, reward rules, credit ledger, mark-as-paid.
// RECORD ONLY: the app never moves real money. Renders nothing unless the flags are on (default off).
import React from 'react';
import { SERVER_AUTH, REWARDS, MOCK_EXAMS_ENABLED, serverGet, serverPost, serverPut } from '@/lib/serverClient';

const box = { background: '#fff', border: '1px solid #E2DBCF', borderRadius: 14, padding: '12px 14px', marginBottom: 12 };
const inp = { width: 90, padding: '7px 8px', borderRadius: 8, border: '1px solid #E2DBCF', fontSize: 13 };
const btn = { background: '#1F3F95', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' };
const sgd = (n) => 'S$' + (Number(n) || 0).toFixed(2);
const rowsSgd = (rows, status) => (rows || []).filter((r) => (r.status || 'confirmed') === status).reduce((a, r) => a + (Number(r.credits) || 0) * (Number(r.sgd_per_credit) || 0), 0);

export default function ParentRewards({ child }) {
  const on = SERVER_AUTH && REWARDS && !!child?.serverId;
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [key, setKey] = React.useState(0);
  const [rule, setRule] = React.useState(null);
  // The form edits the shared setting as it will apply TOMORROW (includes a co-parent's edit); the server always sets the effective date to tomorrow.
  const [msg, setMsg] = React.useState('');
  const [pay, setPay] = React.useState({ credits: '', amount: '', date: '', note: '' });
  const [pmsg, setPmsg] = React.useState('');

  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/parent/rewards?child=' + encodeURIComponent(child.serverId)).then((r) => {
      if (!alive) return;
      if (r.ok) { setD(r); setErr(''); setRule((x) => x || { ...r.formRules }); } else setErr(r.error || 'Could not load rewards.');
    });
    return () => { alive = false; };
  }, [on, child?.serverId, key]);
  React.useEffect(() => { setD(null); setRule(null); setMsg(''); setPmsg(''); }, [child?.serverId]);

  if (!on) return null;
  if (err) return <div style={{ ...box, color: '#B3261E', fontSize: 13 }}>{err}</div>;
  if (!d || !rule) return <div style={{ ...box, fontSize: 13, color: '#6B6F7B' }}>Loading…</div>;

  const set = (k, v) => setRule((r) => ({ ...r, [k]: v }));
  const setTier = (i, k, v) => setRule((r) => ({ ...r, dailyTiers: r.dailyTiers.map((t, j) => (j === i ? { ...t, [k]: v } : t)) }));
  async function saveRules() {
    setMsg('Saving…');
    const r = await serverPut('/api/parent/rewards', { child: child.serverId, ...rule });
    setMsg(r.ok ? `Saved. Applies from tomorrow (${d.tomorrow}); credits already earned are not changed. The other parent is notified.` : (r.error || 'Could not save.'));
    if (r.ok) { setRule(null); setKey((k) => k + 1); }
  }
  async function markPaid() {
    setPmsg('Saving…');
    const r = await serverPost('/api/parent/rewards/payout', {
      child: child.serverId, credits: Number(pay.credits), amountSgd: Number(pay.amount), paidOn: pay.date || undefined, note: pay.note,
    });
    setPmsg(r.ok ? 'Recorded as paid.' : (r.error || 'Could not record.'));
    if (r.ok) { setPay({ credits: '', amount: '', date: '', note: '' }); setKey((k) => k + 1); }
  }
  const bal = d.ledger.balance;
  const suggested = (n) => (rule.sgdPerCredit ? (n * rule.sgdPerCredit).toFixed(2) : '');
  const num = (k, label) => (
    <label style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>{label}{' '}
      <input type="number" min="0" step="0.01" style={inp} value={rule[k]} onChange={(e) => set(k, e.target.value)} />
    </label>
  );
  const SUBJECTS = ['English', 'Chinese', 'Math', 'Science'];
  const tiers = rule.dailyTiers || [];

  return (
    <div style={{ padding: '14px 0' }}>
      <div style={box}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#1B2340', marginBottom: 6 }}>Stickers: {d.stickers.total}</div>
        <div style={{ fontSize: 12, color: '#6B6F7B' }}>
          {d.stickers.daily} target-met days · {d.stickers.weekly} weekly reviews
        </div>
        <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700, color: d.weekly.done ? '#4F6B22' : '#1B2340' }}>
          Saturday Weekly Review (week of {d.weekStart}): {d.weekly.done ? `done (${d.weekly.subjects.join(', ')})` : 'not done yet'}
        </div>
      </div>

      <div style={box}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>Reward rules</div>
        <div style={{ fontSize: 11, color: '#6B6F7B', marginBottom: 8 }}>
          Off by default. These rules are shared with the other linked parent, and changes start tomorrow so today's rewards never change mid-day. Credits are only a record: you pay any pocket money yourself, then mark it as paid below.
        </div>
        <label style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          <input type="checkbox" checked={!!rule.enabled} onChange={(e) => set('enabled', e.target.checked)} /> Turn on credits for {child.name || 'this child'}
        </label>
        {num('sgdPerCredit', 'SGD value of 1 credit (S$)')}
        <div style={{ fontSize: 12, fontWeight: 800, margin: '6px 0 2px' }}>Daily credits per subject (first set of the day)</div>
        <div style={{ fontSize: 11, color: '#6B6F7B', marginBottom: 6 }}>
          The highest tier the first set reaches wins. Below every tier = 0. Credits start as pending and are confirmed once all of the day&apos;s homework is done (no homework assigned = confirmed at the end of the day; unfinished homework = forfeited).
        </div>
        {tiers.map((t, i) => (
          <div key={i} style={{ fontSize: 12, marginBottom: 6 }}>
            Score ≥ <input type="number" min="0" max="100" style={{ ...inp, width: 60 }} value={t.minPct} onChange={(e) => setTier(i, 'minPct', e.target.value)} />%
            {' → '}<input type="number" min="0" style={{ ...inp, width: 60 }} value={t.credits} onChange={(e) => setTier(i, 'credits', e.target.value)} /> credits{' '}
            <button type="button" onClick={() => set('dailyTiers', tiers.filter((_, j) => j !== i))} style={{ ...btn, background: '#6B6F7B', padding: '4px 8px' }}>Remove</button>
          </div>
        ))}
        {tiers.length < 10 && (
          <button type="button" onClick={() => set('dailyTiers', [...tiers, { minPct: 80, credits: 1 }])} style={{ ...btn, background: '#6B6F7B', padding: '5px 10px', marginBottom: 10 }}>+ Add tier</button>
        )}
        <div style={{ fontSize: 12, fontWeight: 800, margin: '6px 0 2px' }}>Saturday Weekly Review bonus (per subject finished)</div>
        <label style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>Amount is in{' '}
          <select value={rule.weeklyUnit} onChange={(e) => set('weeklyUnit', e.target.value)} style={{ ...inp, width: 110 }}>
            <option value="credits">credits</option>
            <option value="sgd">SGD (converted at the credit value)</option>
          </select>
        </label>
        {SUBJECTS.map((s) => (
          <label key={s} style={{ fontSize: 12, display: 'inline-block', marginRight: 10, marginBottom: 8 }}>{s}{' '}
            <input type="number" min="0" step={rule.weeklyUnit === 'sgd' ? '0.01' : '1'} style={{ ...inp, width: 70 }}
              value={(rule.weeklyAmounts || {})[s] ?? 0} onChange={(e) => set('weeklyAmounts', { ...rule.weeklyAmounts, [s]: e.target.value })} />
          </label>
        ))}
        <div />
        {MOCK_EXAMS_ENABLED && (
          <div style={{ marginTop: 6, paddingTop: 8, borderTop: '1px solid #E2DBCF' }}>
            <div style={{ fontSize: 12, fontWeight: 800, margin: '0 0 2px' }}>Saturday past paper reward (separate from the daily rules)</div>
            <div style={{ fontSize: 11, color: '#6B6F7B', marginBottom: 6 }}>
              Paid for handing in a real past paper on a Saturday, once per subject per Saturday. 0 = no reward. Like other credits it starts pending and is confirmed by that day&apos;s homework. The app only records credits; it never moves money.
            </div>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>Amount is in{' '}
              <select value={rule.paperUnit || 'credits'} onChange={(e) => set('paperUnit', e.target.value)} style={{ ...inp, width: 110 }}>
                <option value="credits">credits</option>
                <option value="sgd">SGD (converted at the credit value)</option>
              </select>
            </label>
            <label style={{ fontSize: 12, display: 'inline-block', marginRight: 10, marginBottom: 8 }}>English{' '}
              <input type="number" min="0" step={rule.paperUnit === 'sgd' ? '0.01' : '1'} style={{ ...inp, width: 70 }}
                value={(rule.paperAmounts || {}).English ?? 0} onChange={(e) => set('paperAmounts', { ...rule.paperAmounts, English: e.target.value })} />
            </label>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
              <input type="checkbox" checked={!rule.paperCheckOff} onChange={(e) => set('paperCheckOff', !e.target.checked)} /> Effort check: only pay if at least half the time was used or 80% of the questions were answered (stops &quot;open and hand in blank&quot;)
            </label>
          </div>
        )}
        <button onClick={saveRules} style={btn}>Save rules</button>
        {(d.upcoming || []).length > 0 && (
          <div style={{ fontSize: 11, color: '#6B6F7B', marginTop: 8 }}>Scheduled to start {d.tomorrow}: your latest saved changes</div>
        )}
        {msg && <span style={{ fontSize: 12, color: '#6B6F7B', marginLeft: 10 }}>{msg}</span>}
      </div>

      <div style={box}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
          Credits: {bal} unpaid{rule.sgdPerCredit ? ` (≈ ${sgd(bal * rule.sgdPerCredit)})` : ''}
        </div>
        <div style={{ fontSize: 11, color: '#6B6F7B', marginBottom: 4 }}>Confirmed {d.ledger.earned} · Paid {d.ledger.paid}</div>
        {d.ledger.pending > 0 && <div style={{ fontSize: 11, color: '#1B2340', fontWeight: 700, marginBottom: 4 }}>Pending: {d.ledger.pending} (≈ {sgd(rowsSgd(d.ledger.rows, 'pending'))}) ({d.ledger.pendingNote})</div>}
        {d.ledger.forfeited > 0 && <div style={{ fontSize: 11, color: '#B3261E', marginBottom: 4 }}>Forfeited (homework not finished): {d.ledger.forfeited} (≈ {sgd(rowsSgd(d.ledger.rows, 'forfeited'))})</div>}
        {d.ledger.rows.slice(0, 10).map((r) => (
          <div key={r.kind + r.period + (r.subject || '')} style={{ fontSize: 11, color: '#6B6F7B' }}>
            {r.period}: {r.status === 'pending' ? 'pending ' : r.status === 'forfeited' ? 'forfeited ' : '+'}{r.credits} ({r.kind === 'weekly' ? 'weekly review' : r.kind === 'paper' ? 'Saturday past paper' : 'daily set'}{r.subject ? ' · ' + r.subject : ''}{r.score_pct != null ? ` · ${r.score_pct}%` : ''})
          </div>
        ))}
        {bal > 0 && (
          <div style={{ marginTop: 10, borderTop: '1px solid #E2DBCF', paddingTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Mark a payout as paid</div>
            <input style={inp} type="number" min="1" max={bal} placeholder="Credits" value={pay.credits}
              onChange={(e) => setPay((p) => ({ ...p, credits: e.target.value, amount: p.amount || suggested(Number(e.target.value)) }))} />{' '}
            <input style={inp} type="number" min="0" step="0.01" placeholder="Amount S$" value={pay.amount}
              onChange={(e) => setPay((p) => ({ ...p, amount: e.target.value }))} />{' '}
            <input style={{ ...inp, width: 140 }} type="date" max={d.today} value={pay.date || d.today}
              onChange={(e) => setPay((p) => ({ ...p, date: e.target.value }))} />
            <div style={{ marginTop: 6 }}>
              <input style={{ ...inp, width: '60%' }} maxLength={200} placeholder="Note (optional)" value={pay.note}
                onChange={(e) => setPay((p) => ({ ...p, note: e.target.value }))} />{' '}
              <button onClick={markPaid} style={btn}>Mark paid</button>
            </div>
            {pmsg && <div style={{ fontSize: 12, color: '#6B6F7B', marginTop: 6 }}>{pmsg}</div>}
          </div>
        )}
        {d.payouts.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Paid</div>
            {d.payouts.map((p) => (
              <div key={p.id} style={{ fontSize: 11, color: '#6B6F7B' }}>{p.paid_on}: {p.credits} credits → {sgd(p.amount_sgd)}{p.note ? ` · ${p.note}` : ''}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
