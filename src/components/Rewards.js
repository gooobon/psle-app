'use client';
// Student rewards UI (roadmap step 9). English-only text (CLAUDE.md §5). Everything renders nothing unless
// NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_REWARDS_ENABLED are on (default off).
import React from 'react';
import { SERVER_AUTH, REWARDS, serverGet, serverPost } from '@/lib/serverClient';
import { weeklyReviewIds } from '@/lib/rewards';

const useRewards = (refreshKey) => {
  const on = SERVER_AUTH && REWARDS;
  const [st, setSt] = React.useState(null);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!on) return undefined;
    const h = () => setTick((k) => k + 1);
    window.addEventListener('genius-rewards-changed', h);
    return () => window.removeEventListener('genius-rewards-changed', h);
  }, [on]);
  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/student/rewards').then((r) => { if (alive) setSt(r && r.ok ? r : null); });
    return () => { alive = false; };
  }, [on, tick, refreshKey]);
  return { on, st };
};

// Sticker collection. On mount it also asks the server to check today's target (idempotent), so a target met earlier is never missed.
export function StickerShelf() {
  const { on, st } = useRewards();
  React.useEffect(() => {
    if (!on) return;
    serverPost('/api/student/rewards/claim', {}).then((r) => {
      if (r && r.ok && r.awarded) window.dispatchEvent(new Event('genius-rewards-changed'));
    });
  }, [on]);
  if (!on || !st) return null;
  const total = st.counts.daily + st.counts.weekly;
  const cr = st.credits || { confirmed: 0, pending: 0, forfeited: 0, balance: 0 };
  const showWallet = cr.pending > 0 || cr.forfeited > 0 || cr.confirmed > 0;
  return (
    <div style={{ padding: '14px 16px 0' }}>
      {showWallet && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 14, padding: 12, marginBottom: 10 }}>
          {cr.confirmed > 0 && (
            <div style={{ fontSize: 'calc(var(--fs) * 0.929)', fontWeight: 800, color: '#92400E' }}>
              Wallet: {cr.balance} confirmed credit{cr.balance === 1 ? '' : 's'}
            </div>
          )}
          {cr.pending > 0 && (
            <div style={{ fontSize: 'calc(var(--fs) * 0.929)', fontWeight: 800, color: '#92400E', marginTop: cr.confirmed > 0 ? 4 : 0 }}>
              Pending: {cr.pending} credit{cr.pending > 1 ? 's' : ''}. {cr.pendingNote}.
            </div>
          )}
          {cr.forfeited > 0 && (
            <div style={{ fontSize: 'calc(var(--fs) * 0.786)', color: '#78350F', marginTop: 4 }}>
              {cr.forfeited} credit{cr.forfeited > 1 ? 's' : ''} lost because homework was not finished that day.
            </div>
          )}
        </div>
      )}
      <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 14, padding: 12 }}>
        <div style={{ fontSize: 'calc(var(--fs) * 1.0)', fontWeight: 900, color: '#5B21B6' }}>My Stickers: {total}</div>
        <div style={{ fontSize: 'calc(var(--fs) * 0.786)', color: '#6D28D9', margin: '2px 0 8px' }}>
          A star for every day you meet your daily target. A trophy for each Saturday Weekly Review.
        </div>
        {total === 0 ? (
          <div style={{ fontSize: 'calc(var(--fs) * 0.857)', color: '#64748B' }}>Meet today&apos;s target to earn your first sticker!</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, fontSize: 22 }}>
            {st.stickers.map((s) => (
              <span key={s.kind + s.period} title={(s.kind === 'weekly' ? 'Weekly Review, week of ' : s.kind === 'paper' ? 'Saturday past paper on ' : 'Target met on ') + s.period}>{s.kind === 'weekly' ? '🏆' : s.kind === 'paper' ? '📝' : '⭐'}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Saturday (SGT) "Weekly Review" card for one subject: this week's (Mon-Sat) mistakes that are not yet mastered.
export function WeeklyReviewCard({ subject, prog, roundIndex, onStart, refreshKey }) {
  const { on, st } = useRewards(refreshKey);
  if (!on || !st || !st.saturday) return null;
  const done = (st.weeklyDone || []).includes(subject);
  const ids = weeklyReviewIds(prog, st.today).filter((id) => roundIndex && roundIndex.byId && roundIndex.byId[id]);
  if (!done && !ids.length) return null;
  return (
    <div style={{ padding: '14px 16px 0' }}>
      <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 14, padding: 12 }}>
        <div style={{ fontSize: 'calc(var(--fs) * 1.0)', fontWeight: 900, color: '#065F46' }}>Weekly Review</div>
        {done ? (
          <div style={{ fontSize: 'calc(var(--fs) * 0.857)', fontWeight: 800, color: '#059669', marginTop: 4 }}>Done for this week! 🏆</div>
        ) : (
          <>
            <div style={{ fontSize: 'calc(var(--fs) * 0.857)', color: '#047857', margin: '4px 0 8px' }}>
              {ids.length} mistake{ids.length > 1 ? 's' : ''} from this week to fix. Finish it for a bonus sticker.
            </div>
            <button onClick={() => onStart(ids)}
              style={{ background: '#059669', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' }}>
              Start Weekly Review
            </button>
          </>
        )}
      </div>
    </div>
  );
}
