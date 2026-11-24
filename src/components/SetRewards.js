'use client';
// "Thread +N" / "Credits +N" for the set just finished, shown on the student result screens. Plain text, no emoji, English only.
// Shows nothing when both are 0 or when the matching feature flag is off. Reads sessionStorage through src/lib/setRewards.js.
import React from 'react';
import { REWARDS, SERVER_AUTH } from '@/lib/serverClient';
import { clewquestEnabled } from '@/lib/clewquest/config';
import { SET_REWARDS_EVENT, readSetRewards, setRewardLines } from '@/lib/setRewards';

export default function SetRewards() {
  const [rec, setRec] = React.useState({ thread: 0, credits: 0 });
  React.useEffect(() => {
    const h = () => setRec(readSetRewards());
    h();
    window.addEventListener(SET_REWARDS_EVENT, h);
    return () => window.removeEventListener(SET_REWARDS_EVENT, h);
  }, []);
  const lines = setRewardLines(rec, { thread: clewquestEnabled(), credits: SERVER_AUTH && REWARDS });
  if (!lines.length) return null;
  return (
    <div data-testid="set-rewards" style={{ display: 'flex', gap: 10, justifyContent: 'center', margin: '0 16px 12px', padding: '10px 12px', background: '#FBF6EA', border: '1px solid #E2DBCF', borderRadius: 12 }}>
      {lines.map((l) => <span key={l.key} style={{ fontSize: 'calc(var(--fs) * 0.929)', fontWeight: 800, color: '#1B2340' }}>{l.text}</span>)}
    </div>
  );
}
