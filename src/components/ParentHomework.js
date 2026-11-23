'use client';
// Student "Homework from Parent": today's assigned questions for this subject. English-only UI (CLAUDE.md §5).
// Renders nothing unless both flags are on and the server has homework for today. Starting uses the caller's runnable index.
import React from 'react';
import { SERVER_AUTH, PARENT_HOMEWORK, serverGet } from '@/lib/serverClient';

export default function ParentHomework({ subject, refreshKey, onStart }) {
  const on = SERVER_AUTH && PARENT_HOMEWORK;
  const [items, setItems] = React.useState(null);
  React.useEffect(() => {
    if (!on) return undefined;
    let alive = true;
    serverGet('/api/student/homework?subject=' + encodeURIComponent(subject)).then((r) => {
      if (alive) setItems(r && r.ok && Array.isArray(r.items) ? r.items : null);
    });
    return () => { alive = false; };
  }, [on, subject, refreshKey]);
  if (!on || !items || !items.length) return null;
  const todo = items.filter((x) => !x.solved);
  const correct = items.filter((x) => x.solved && x.correct).length;
  return (
    <div style={{ padding: '14px 16px 0' }}>
      <div style={{ background: '#FBF6EA', border: '1px solid #E2DBCF', borderRadius: 14, padding: 12 }}>
        <div style={{ fontSize: 'calc(var(--fs) * 1.0)', fontWeight: 900, color: '#1B2340' }}>Homework from Parent</div>
        <div style={{ fontSize: 'calc(var(--fs) * 0.857)', color: '#78350F', margin: '4px 0 8px' }}>
          Today: {items.length - todo.length} of {items.length} done{items.length - todo.length ? ` · ${correct} correct` : ''}
        </div>
        {todo.length > 0 ? (
          <button onClick={() => onStart(todo.map((x) => x.id), Object.fromEntries(todo.map((x) => [x.id, x.source])))}
            style={{ background: '#D9A52E', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', fontWeight: 800, cursor: 'pointer' }}>
            Start homework ({todo.length} left)
          </button>
        ) : (
          <div style={{ fontSize: 'calc(var(--fs) * 0.857)', fontWeight: 800, color: '#4F6B22' }}>All done for today!</div>
        )}
      </div>
    </div>
  );
}
