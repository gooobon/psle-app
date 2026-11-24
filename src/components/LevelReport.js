'use client';
// Parent report card: level of questions solved, last 14 days (issue #127). Read-only. Server children only (rendered by LearningDashboard).
import React from 'react';

const card = { background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,.06)' };
const h = { fontSize: 11, fontWeight: 800, color: '#6B6F7B', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 };
const LV = [['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']];
const cell = (x) => (x.n ? `${x.n} (${x.firstTry}%)` : '-');

export default function LevelReport({ data, subject, skillName }) {
  const total = data.overall.easy.n + data.overall.medium.n + data.overall.hard.n;
  return (
    <div data-testid="level-report" style={card}>
      <div style={h}>{subject} · Level of questions solved (last {data.days || 14} days)</div>
      {total === 0 && <div style={{ fontSize: 13, color: '#6B6F7B' }}>No rated questions in the last {data.days || 14} days yet.</div>}
      {total > 0 && (
        <>
          {data.warning && (
            <div data-testid="level-easy-warning" role="alert" style={{ background: '#FBF6EA', color: '#B3261E', fontWeight: 700, fontSize: 13, borderRadius: 10, padding: '8px 10px', marginBottom: 10 }}>
              Most questions were easy. Assign harder practice to check the real level.
              <span style={{ fontWeight: 500, color: '#6B6F7B' }}> Use Assign practice in the Mistakes tab.</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {LV.map(([k, label]) => (
              <div key={k} data-testid={`level-${k}`} style={{ flex: 1, background: '#FBF6EA', borderRadius: 10, padding: '8px 10px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#6B6F7B' }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{data.overall[k].n}</div>
                <div style={{ fontSize: 11, color: '#6B6F7B' }}>{data.overall[k].n ? `${data.overall[k].firstTry}% first try` : 'no attempts'}</div>
              </div>
            ))}
          </div>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#6B6F7B' }}>
                <th style={{ padding: '4px 0' }}>Skill</th>{LV.map(([k, label]) => <th key={k} style={{ padding: '4px 0' }}>{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.skills.map((s) => (
                <tr key={s.skill} data-testid="level-skill" style={{ borderTop: '1px solid #E2DBCF' }}>
                  <td style={{ padding: '4px 6px 4px 0', fontWeight: 700 }}>{skillName(s.skill)}{s.estimated ? <span style={{ color: '#6B6F7B', fontWeight: 500 }}> (estimated)</span> : null}</td>
                  {LV.map(([k]) => <td key={k} style={{ padding: '4px 0' }}>{cell(s.levels[k])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 10, color: '#6B6F7B', marginTop: 6 }}>
            Each cell shows attempts and first-try %.{data.estimated ? ' Levels marked estimated come from how often all students get the question right first time: 80% or more is Easy, 50 to 79% Medium, under 50% Hard.' : ''}
            {data.unrated > 0 ? ` ${data.unrated} attempts could not be rated yet.` : ''}
          </div>
        </>
      )}
    </div>
  );
}
