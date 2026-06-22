// Remove ParentApp + sub-tabs block from ClaudeApp.js
// These have been moved to src/components/ParentDashboard.js

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/app/ClaudeApp.js';
const content  = readFileSync(filePath, 'utf8');
const lines    = content.split('\n');

// Find ParentApp start and buildVocabEntries start
const parentStart = lines.findIndex(l => l.startsWith('function ParentApp('));
const vocabStart  = lines.findIndex(l => l.startsWith('// ── Vocab Quiz'));

if (parentStart < 0) { console.log('ParentApp not found — already removed?'); process.exit(0); }
if (vocabStart  < 0) { console.log('buildVocabEntries marker not found'); process.exit(1); }

console.log(`Removing lines ${parentStart+1}–${vocabStart} (ParentApp block)`);

const kept = [...lines.slice(0, parentStart), ...lines.slice(vocabStart)];
writeFileSync(filePath, kept.join('\n'), 'utf8');
console.log(`Done. ClaudeApp.js now has ${kept.length} lines.`);
