// tools/gen/validate_sets.js - validate a JSON file of practice sets with the
// project validator. Usage: node tools/gen/validate_sets.js <file.json> [--seed]
// Prints JSON { fails:[...], counts:{...} } and exits 1 when fails > 0.
const fs = require('fs'); const path = require('path');
const v = require(path.join(process.cwd(), 'zh_wa1_validate.js'));
const file = process.argv[2]; const seed = process.argv.includes('--seed');
const sets = JSON.parse(fs.readFileSync(file, 'utf8'));
const r = v.validatePracticeSets(sets, { seedMode: seed, requireExplain: true });
console.log(JSON.stringify({ fails: r.fails, counts: r.counts }));
process.exit(r.fails.length ? 1 : 0);
