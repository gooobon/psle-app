'use client';
// Parent "Rewards" tab (roadmap step 9): sticker count, weekly review status, reward rules, credit ledger, mark-as-paid.
// RECORD ONLY: the app never moves real money. Renders nothing unless the flags are on (default off).
import React from 'react';
import { SERVER_AUTH, REWARDS, serverGet, serverPost, serverPut } from '@/lib/serverClient';

const box = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '12px 14px', marginBottom: 12 };
const inp = { width: 90, padding: '7px 8px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 };
const btn = { background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' };
const sgd = (n) => 'S$' + (Number(n) || 0).toFixed(2);

export default function ParentRewards({ child }) {
  const on = SERVER_AUTH && REWARDS && !!child?.serverId;
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [key, setKey] = React.useState(0);
  const [rule, setRule] = React.useState(null);
  const [msg, setMsg] = React.useState('');
  const [pay, setPay] = React.useState({ credits: '', amount: '', date: '', note: '' });
  const [pmsg, setPmsg] = React.useState('');

  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/parent/rewards?child=' + encodeURIComponent(child.serverId)).then((r) => {
      if (!alive) return;
      if (r.ok) { setD(r); setErr(''); setRule((x) => x || r.rules); } else setErr(r.error || 'Could not load rewards.');
    });
    return () => { alive = false; };
  }, [on, child?.serverId, key]);
  React.useEffect(() => { setD(null); setRule(null); setMsg(''); setPmsg(''); }, [child?.serverId]);

  if (!on) return null;
  if (err) return <div style={{ ...box, color: '#B91C1C', fontSize: 13 }}>{err}</div>;
  if (!d || !rule) return <div style={{ ...box, fontSize: 13, color: '#64748B' }}>Loading…</div>;

  const set = (k, v) => setRule((r) => ({ ...r, [k]: v }));
  async function saveRules() {
    setMsg('Saving…');
    const r = await serverPut('/api/parent/rewards', { child: child.serverId, ...rule });
    setMsg(r.ok ? 'Saved. Applies to stickers earned from now on.' : (r.error || 'Could not save.'));
    if (r.ok) setKey((k) => k + 1);
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
      <input type="number" min="0" step={k === 'sgdPerCredit' ? '0.01' : '1'} style={inp} value={rule[k]}
        onChange={(e) => set(k, e.target.value)} />
    </label>
  );

  return (
    <div style={{ padding: '14px 0' }}>
      <div style={box}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#5B21B6', marginBottom: 6 }}>⭐ Stickers: {d.stickers.total}</div>
        <div style={{ fontSize: 12, color: '#475569' }}>
          {d.stickers.daily} target-met days · {d.stickers.weekly} weekly reviews
        </div>
        <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700, color: d.weekly.done ? '#059669' : '#92400E' }}>
          Saturday Weekly Review (week of {d.weekStart}): {d.weekly.done ? `done (${d.weekly.subjects.join(', ')})` : 'not done yet'}
        </div>
      </div>

      <div style={box}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>Reward rules</div>
        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>
          Off by default. Credits are only a record: you pay any pocket money yourself, then mark it as paid below.
        </div>
        <label style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          <input type="checkbox" checked={!!rule.enabled} onChange={(e) => set('enabled', e.target.checked)} /> Turn on credits for {child.name || 'this child'}
        </label>
        {num('creditsPerDay', 'Credits per target-met day')}
        {num('creditsPerWeekly', 'Credits per Saturday Weekly Review')}
        {num('sgdPerCredit', 'SGD value of 1 credit (S$)')}
        <button onClick={saveRules} style={btn}>Save rules</button>
        {msg && <span style={{ fontSize: 12, color: '#64748B', marginLeft: 10 }}>{msg}</span>}
      </div>

      <div style={box}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
          Credits: {bal} unpaid{rule.sgdPerCredit ? ` (≈ ${sgd(bal * rule.sgdPerCredit)})` : ''}
        </div>
        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>Earned {d.ledger.earned} · Paid {d.ledger.paid}</div>
        {d.ledger.rows.slice(0, 10).map((r) => (
          <div key={r.kind + r.period} style={{ fontSize: 11, color: '#475569' }}>
            {r.period}: +{r.credits} ({r.kind === 'weekly' ? 'weekly review' : 'target met'})
          </div>
        ))}
        {bal > 0 && (
          <div style={{ marginTop: 10, borderTop: '1px solid #E2E8F0', paddingTop: 10 }}>
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
            {pmsg && <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>{pmsg}</div>}
          </div>
        )}
        {d.payouts.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Paid</div>
            {d.payouts.map((p) => (
              <div key={p.id} style={{ fontSize: 11, color: '#475569' }}>{p.paid_on}: {p.credits} credits → {sgd(p.amount_sgd)}{p.note ? ` · ${p.note}` : ''}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
