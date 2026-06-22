// Remove duplicate/dead block from QuizEngine.js (SEED_MISTAKES → pickQuestionsForSchool)
import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/components/QuizEngine.js';
const content  = readFileSync(filePath, 'utf8');
const lines    = content.split('\n');

const deadStart = lines.findIndex(l => l.startsWith('const SEED_MISTAKES = ['));
const keepFrom  = lines.findIndex(l => l.startsWith('function getMistakeIds('));

if (deadStart < 0) { console.log('SEED_MISTAKES not found — already removed.'); process.exit(0); }
if (keepFrom  < 0) { console.log('ERROR: getMistakeIds not found'); process.exit(1); }

console.log(`Removing dead block: lines ${deadStart+1}–${keepFrom} (${keepFrom-deadStart} lines)`);
const kept = [...lines.slice(0, deadStart), ...lines.slice(keepFrom)];
writeFileSync(filePath, kept.join('\n'), 'utf8');
console.log(`Done. QuizEngine.js now has ${kept.length} lines.`);
