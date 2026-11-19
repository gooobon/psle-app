'use client';
// Per-mistake cards for the Mistakes Log: pick a cause, "Try 3 similar", resolved badge.
// Local-only UI; works with old records that have no cause / resolved_at.
// Cause labels are English (cause.*). The same labels are used on the student notebook.
import React from 'react';
import taxonomy from '@/data/taxonomy/taxonomy.json';
import { CAUSES, SIMILAR_COUNT, causeLabel } from '@/lib/wrongNotebook';

const TRAP_LABEL = {};
for (const trap of taxonomy.traps || []) TRAP_LABEL[trap.id] = trap.label;

const REASON_TEXT = {
  no_tags: 'No similar questions yet: this question has no concept tags.',
  no_skill: 'No similar questions yet: this question has no specific skill or trap.',
  uncertain: 'No similar questions yet: this question’s tags are not confirmed.',
  none: 'No similar questions found for this skill.',
};

export function MistakePatterns({ summary }) {
  const causes = (summary && summary.causes) || [];
  const traps = (summary && summary.traps) || [];
  if (!causes.length && !traps.length) {
    return (
      <div style={{ background: '#fff', borderRadius: 16, padding: '14px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
        <div style={{ fontSize: 'calc(var(--fs) * 0.786)', fontWeight: 800, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>
          Your patterns
        </div>
        <div style={{ fontSize: 'calc(var(--fs) * 0.857)', color: '#64748B', lineHeight: 1.5 }}>
          Pick a cause on a mistake to see which reasons come up most. Traps appear when the question is tagged.
        </div>
      </div>
    );
  }
  const row = (name, n) => (
    <div key={name} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
      <span style={{ fontSize: 'calc(var(--fs) * 0.857)', fontWeight: 700, color: '#0F172A' }}>{name}</span>
      <span style={{ fontSize: 'calc(var(--fs) * 0.786)', color: '#64748B' }}>{n}</span>
    </div>
  );
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '14px', marginBottom: 14, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
      <div style={{ fontSize: 'calc(var(--fs) * 0.786)', fontWeight: 800, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
        Your patterns
      </div>
      {causes.length > 0 && (
        <div style={{ marginBottom: traps.length ? 10 : 0 }}>
          <div style={{ fontSize: 'calc(var(--fs) * 0.75)', fontWeight: 800, color: '#991B1B', marginBottom: 4 }}>Causes</div>
          {causes.slice(0, 6).map(([value, n]) => row(causeLabel(value) || value, n))}
        </div>
      )}
      {traps.length > 0 && (
        <div>
          <div style={{ fontSize: 'calc(var(--fs) * 0.75)', fontWeight: 800, color: '#1D4ED8', marginBottom: 4 }}>Traps</div>
          {traps.slice(0, 6).map(([id, n]) => row(TRAP_LABEL[id] || id, n))}
        </div>
      )}
    </div>
  );
}

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
                {cause ? ' · ' + cause.label : ' · cause not picked'}
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
                      {c.label}
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
