'use client';
// Reusable tap-to-order input for sequencing questions ("Write 1, 2 and 3 to show the order of events").
// The student taps the cards in the order they happened: first tap = 1, second = 2 ... Tap a numbered card to take it back,
// "Undo" removes the last number, "Reset" clears all. Cards are real buttons: Tab to move, Enter / Space to tap.
// Controlled: value = [rank per card] (0 = not yet ordered); onChange(nextValue). Used by practice (ExamSession) and the mock paper (PaperExam).
import React from 'react';
import { normOrderValue, tapOrder, undoOrder, resetOrder } from '@/lib/orderQuestions';

export default function OrderTap({ items, value, onChange, disabled = false, correct = null, accent = '#7C3AED' }) {
  const n = items.length;
  const v = normOrderValue(value, n);
  const done = v.filter(Boolean).length;
  const marked = Array.isArray(correct);
  return (
    <div role="group" aria-label="Put the events in order. Tap them first to last." style={{ marginTop: 8 }}>
      <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>Tap the cards in order: first event, then the next, and so on.</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {items.map((it, i) => {
          const rank = v[i];
          const right = marked && rank === correct[i];
          const border = marked ? (right ? '#16A34A' : '#DC2626') : rank ? accent : '#E2E8F0';
          return (
            <button key={i} type="button" disabled={disabled} onClick={() => onChange(tapOrder(v, i))}
              aria-label={`${it}. ${rank ? 'Position ' + rank + '. Press to take it back.' : 'Not ordered yet. Press to give it the next number.'}`}
              style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '8px 10px', borderRadius: 10, border: '2px solid ' + border, background: rank ? '#F5F3FF' : '#fff', cursor: disabled ? 'default' : 'pointer', fontSize: 14 }}>
              <span aria-hidden="true" style={{ minWidth: 26, height: 26, borderRadius: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, background: rank ? accent : '#F1F5F9', color: rank ? '#fff' : '#94A3B8' }}>{rank || '?'}</span>
              <span style={{ flex: 1 }}>{it}</span>
              {marked && !right ? <span style={{ fontSize: 12, color: '#B91C1C' }}>(should be {correct[i]})</span> : null}
            </button>
          );
        })}
      </div>
      {!disabled ? (
        <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
          <button type="button" onClick={() => onChange(undoOrder(v))} disabled={!done} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#F1F5F9', cursor: done ? 'pointer' : 'default', fontWeight: 700, fontSize: 13 }}>Undo</button>
          <button type="button" onClick={() => onChange(resetOrder(n))} disabled={!done} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#F1F5F9', cursor: done ? 'pointer' : 'default', fontWeight: 700, fontSize: 13 }}>Reset</button>
          <span role="status" aria-live="polite" style={{ fontSize: 12, color: '#64748B' }}>{done} of {n} ordered</span>
        </div>
      ) : null}
    </div>
  );
}
