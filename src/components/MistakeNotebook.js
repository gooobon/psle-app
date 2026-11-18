'use client';
// Per-mistake cards for the Mistakes Log: pick a cause, "Try 3 similar", resolved badge.
// Local-only UI; works with old records that have no cause / resolved_at.
import React from 'react';
import { CAUSES, SIMILAR_COUNT } from '@/lib/wrongNotebook';

const REASON_TEXT = {
  no_tags: 'No similar questions yet: this question has no concept tags.',
  uncertain: 'No similar questions yet: this question’s tags are not confirmed.',
  none: 'No confident similar questions found.',
};

// items: enriched mistakes, each with _k (stable key, see mistakeKeys)
// similarFor(m) -> { ids, reason }
export default function MistakeNotebook({ items, onCause, onTrySimilar, similarFor }) {
  const [open, setOpen] = React.useState(null);
  if (!items || !items.length) return null;
  const shown = items.slice().reverse().slice(0, 50);
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 'calc(var(--fs) * 0.786)', fontWeight: 800, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
        Notebook
      </div>
      {shown.map((m) => {
        const isOpen = open === m._k;
        const sim = isOpen ? similarFor(m) : null;
        const cause = CAUSES.find((c) => c.value === m.cause);
        return (
          <div key={m._k} style={{ background: '#fff', borderRadius: 14, padding: 12, marginBottom: 8, boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
            <button onClick={() => setOpen(isOpen ? null : m._k)}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ fontSize: 'calc(var(--fs) * 0.929)', fontWeight: 700, color: '#0F172A' }}>
                {String(m.q || m.id).slice(0, 140)}
              </div>
              <div style={{ fontSize: 'calc(var(--fs) * 0.786)', color: '#64748B', marginTop: 4 }}>
                {m.date || ''}{m.topic || m.sectionType ? ' · ' + (m.topic || m.sectionType) : ''}
                {cause ? ' · ' + cause.en : ' · cause not picked'}
                {m.resolved_at ? ' · ✅ resolved' : ''}
              </div>
            </button>
            {isOpen && (
              <div style={{ marginTop: 10 }}>
                {(m.yourAnswer != null || m.correctAnswer != null) && (
                  <div style={{ fontSize: 'calc(var(--fs) * 0.857)', marginBottom: 8 }}>
                    {m.yourAnswer != null && <div>Your answer: <b>{String(m.yourAnswer)}</b></div>}
                    {m.correctAnswer != null && <div>Correct answer: <b>{String(m.correctAnswer)}</b></div>}
                  </div>
                )}
                <div style={{ fontSize: 'calc(var(--fs) * 0.786)', fontWeight: 800, color: '#64748B', marginBottom: 6 }}>Why did you get it wrong?</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {CAUSES.map((c) => (
                    <button key={c.value} onClick={() => onCause(m._k, c.value)}
                      style={{ border: m.cause === c.value ? '2px solid #DC2626' : '1px solid #CBD5E1', background: m.cause === c.value ? '#FEE2E2' : '#fff',
                        borderRadius: 16, padding: '5px 10px', cursor: 'pointer', fontSize: 'calc(var(--fs) * 0.786)', fontWeight: 700, color: '#0F172A' }}>
                      {c.en} <span style={{ fontWeight: 500, color: '#64748B' }}>({c.ko})</span>
                    </button>
                  ))}
                </div>
                {sim && sim.ids.length > 0 && (
                  <>
                    {sim.ids.length < SIMILAR_COUNT && (
                      <div style={{ fontSize: 'calc(var(--fs) * 0.786)', color: '#92400E', marginBottom: 6 }}>
                        Only {sim.ids.length} confident similar question{sim.ids.length > 1 ? 's' : ''} available (not {SIMILAR_COUNT}). This one can be practised but won&apos;t mark the mistake resolved.
                      </div>
                    )}
                    <button onClick={() => onTrySimilar(m._k, sim.ids)}
                      style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' }}>
                      Try {sim.ids.length === SIMILAR_COUNT ? SIMILAR_COUNT : sim.ids.length} similar
                    </button>
                  </>
                )}
                {sim && sim.ids.length === 0 && (
                  <div style={{ fontSize: 'calc(var(--fs) * 0.786)', color: '#64748B' }}>{REASON_TEXT[sim.reason] || REASON_TEXT.none}</div>
                )}
                {Array.isArray(m.retries) && m.retries.length > 0 && (
                  <div style={{ fontSize: 'calc(var(--fs) * 0.75)', color: '#64748B', marginTop: 6 }}>
                    Last try: {m.retries[m.retries.length - 1].correct}/{m.retries[m.retries.length - 1].total} correct
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
