'use client';
// Tap-to-order: the student taps the event cards in the order they happened; the first tap becomes 1, the next 2, and so on.
// Reusable (practice ExamSession and the mock PaperExam). Keyboard: each card is a real button (Tab, then Enter or Space).
// Undo removes the last number, Reset clears all, and tapping a numbered card takes its number back (later numbers close the gap).
// value: array with one number (1..n) or empty per card, in card order. onChange(nextArray). correct: optional key shown after marking.
import { useId } from 'react';
import { nextOrderValue, undoOrderValue } from '@/lib/orderTap';

export default function OrderTap({ items, value, onChange, disabled = false, correct = null, accent = '#7C3AED' }) {
  const id = useId();
  const n = items.length;
  const v = Array.from({ length: n }, (_, j) => (Number.isInteger(value && value[j]) && value[j] >= 1 ? value[j] : 0));
  const placed = v.filter(Boolean).length;
  const marked = Array.isArray(correct);
  return (
    <div style={{ marginTop: 10 }} role="group" aria-labelledby={id + '-h'}>
      <div id={id + '-h'} style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>
        Tap the events in the order they happened. First tap = 1, next tap = 2. Tap a numbered card to take its number back.
      </div>
      {items.map((text, i) => {
        const num = v[i];
        const ok = marked && num === correct[i];
        return (
          <button key={i} type="button" disabled={disabled}
            onClick={() => onChange(nextOrderValue(v, i, n))}
            aria-label={(num ? 'Position ' + num + ': ' : 'Not placed yet: ') + text}
            aria-pressed={!!num}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', marginBottom: 6, padding: '10px 12px',
              borderRadius: 10, cursor: disabled ? 'default' : 'pointer', fontSize: 14, fontFamily: 'inherit',
              border: '2px solid ' + (marked ? (ok ? '#16A34A' : '#DC2626') : num ? accent : '#CBD5E1'),
              background: marked ? (ok ? '#F0FDF4' : '#FEF2F2') : num ? '#F5F3FF' : '#fff' }}>
            <span aria-hidden="true" style={{ flex: '0 0 30px', height: 30, borderRadius: 15, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800,
              background: num ? accent : '#E2E8F0', color: num ? '#fff' : '#64748B' }}>{num || ''}</span>
            <span style={{ flex: 1 }}>{text}</span>
            {marked && !ok ? <span style={{ fontSize: 12, color: '#B91C1C' }}>(should be {correct[i]})</span> : null}
          </button>
        );
      })}
      {!disabled && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <button type="button" onClick={() => onChange(undoOrderValue(v, n))} disabled={!placed} style={ctl}>Undo</button>
          <button type="button" onClick={() => onChange(new Array(n).fill(0))} disabled={!placed} style={ctl}>Reset</button>
          <span role="status" aria-live="polite" style={{ fontSize: 12, color: '#64748B' }}>{placed} of {n} placed</span>
        </div>
      )}
    </div>
  );
}
const ctl = { padding: '6px 14px', borderRadius: 8, border: '1px solid #CBD5E1', background: '#fff', cursor: 'pointer', fontSize: 13 };
