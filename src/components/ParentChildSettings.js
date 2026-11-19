'use client';
// Parent: the child's ONE shared setting (daily sets per subject + homework questions per mistake) and the change log.
// Both linked parents see and edit the same record. Edits apply from the NEXT Singapore day; reward tiers live in the Rewards tab
// (same record, same log). English-only UI (CLAUDE.md §5).
import React from 'react';
import { SERVER_AUTH, serverGet, serverPut } from '@/lib/serverClient';

const SUBJECTS = ['English', 'Chinese', 'Math', 'Science'];
const inp = { width: 72, padding: '6px 8px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 };

export default function ParentChildSettings({ child }) {
  const on = SERVER_AUTH && !!child?.serverId;
  const [d, setD] = React.useState(null);
  const [target, setTarget] = React.useState(null);
  const [hw, setHw] = React.useState(3);
  const [msg, setMsg] = React.useState('');
  const [key, setKey] = React.useState(0);
  React.useEffect(() => { setD(null); setTarget(null); setMsg(''); }, [child?.serverId]);
  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/parent/child-settings?child=' + encodeURIComponent(child.serverId)).then((r) => {
      if (!alive || !r.ok) return;
      setD(r);
      // Edit from what applies tomorrow, so a co-parent's change made earlier today is not overwritten by a stale form.
      const base = r.upcoming || r.current;
      setTarget(base.dailyTarget); setHw(base.homeworkPerMistake);
    });
    return () => { alive = false; };
  }, [on, child?.serverId, key]);
  if (!on || !d || !target) return null;
  async function save() {
    setMsg('Saving…');
    const r = await serverPut('/api/parent/child-settings', { child: child.serverId, dailyTarget: target, homeworkPerMistake: Number(hw) });
    setMsg(r.ok ? (r.changes && r.changes.length ? 'Saved. Applies from tomorrow.' : 'No changes.') : (r.error || 'Could not save.'));
    if (r.ok) { try { window.dispatchEvent(new Event('genius-parent-settings')); } catch {} setKey((k) => k + 1); }
  }
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12, marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#4C1D95', marginBottom: 4 }}>{child.name || 'Child'}&apos;s targets (shared with the other parent)</div>
      <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, lineHeight: 1.5 }}>
        Any linked parent can change these. Changes start tomorrow ({d.tomorrow}) so today&apos;s targets stay the same. 0 means that subject is not required.
      </div>
      {SUBJECTS.map((s) => (
        <label key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, marginBottom: 6 }}>
          <span>{s} sets per day</span>
          <input type="number" min={0} max={10} style={inp} value={target[s] ?? 1}
            onChange={(e) => setTarget((t) => ({ ...t, [s]: Math.max(0, Math.min(10, Math.round(Number(e.target.value) || 0))) }))} />
        </label>
      ))}
      <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, margin: '8px 0' }}>
        <span>Homework questions per mistake</span>
        <input type="number" min={1} max={100} style={inp} value={hw} onChange={(e) => setHw(e.target.value)} />
      </label>
      <button onClick={save} style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' }}>Save</button>
      {msg && <span style={{ fontSize: 12, color: '#64748B', marginLeft: 10 }}>{msg}</span>}
      {d.audit.length > 0 && (
        <div style={{ marginTop: 10, borderTop: '1px solid #E2E8F0', paddingTop: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>Change log</div>
          {d.audit.slice(0, 15).map((a) => (a.changes || []).map((line, i) => (
            <div key={a.id + ':' + i} style={{ fontSize: 11, color: '#475569' }}>{String(a.changed_at).slice(0, 10)}: {line}</div>
          )))}
        </div>
      )}
    </div>
  );
}
