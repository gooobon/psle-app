// fix_build_errors.js
// Run from project root: node fix_build_errors.js
// Fixes apostrophe/quote errors introduced by translation in .ts data files

const fs = require('fs');
const path = require('path');

const TARGET_FILES = [
  'src/data/p3/english/papers/wa1/practicepaper1_catholic_high_primary_english_2023.ts',
  'src/data/p3/english/papers/wa1/practicepaper1_tao_nan_english_2025.ts',
  'src/data/p3/english/papers/wa1/review1_maha_bodhi_english_2024.ts',
  'src/data/p3/english/papers/wa1/wa1_catholic_high_primary_english_2022.ts',
  'src/data/p3/english/papers/wa1/wa1_henry_park_primary_english_2023.ts',
  'src/data/p3/english/papers/wa1/wa1_nanyang_primary_english_2023.ts',
  'src/data/p3/english/papers/wa1/wa1_nanyang_primary_english_2025.ts',
  'src/data/p3/english/papers/wa1/wa1_raffles_girls_primary_english_2023.ts',
  'src/data/p3/english/papers/wa1/practicepaper2_catholic_high_primary_english_2023.ts',
  'src/data/p3/chinese/papers/eoy/eoy_nanhua_higher_paper2_2025.ts',
];

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP (not found): ${filePath}`);
    return 0;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  
  // Convert ALL single-quoted JS string values to template literals or double-quoted
  // Strategy: for method/steps/tip fields that use single quotes,
  // escape any apostrophes that appear mid-word (contractions like it's, haven't, one's)
  
  let fixed = original;
  
  // Fix 1: Escape apostrophes in single-quoted strings
  // Pattern: find 'string content' where content has word apostrophes
  // Replace word-apostrophe (letter'letter) with escaped version
  fixed = fixed.replace(/'((?:[^'\\]|\\.)*)'/g, (match, inner, offset) => {
    // Only process if inner contains potential problem apostrophes
    if (!inner.includes("'") && !/\w'\w/.test(inner)) return match;
    
    // Escape word-internal apostrophes
    const escapedInner = inner.replace(/(\w)'(\w)/g, "$1\\'$2");
    if (escapedInner !== inner) {
      return `'${escapedInner}'`;
    }
    return match;
  });

  // Fix 2: Fix unterminated strings - multiline strings not properly closed
  // Specific fix for the Chinese file with unterminated string at line 510
  // Replace backtick-less multiline that should be template literal
  
  // Fix 3: Replace remaining broken patterns
  // '"verb 'is'"' pattern -> '"verb \'is\'"'
  fixed = fixed.replace(/"([^"]*)'([^"]*)"([^,\n]*)',/g, (match) => {
    return match; // leave double-quoted strings alone
  });

  if (fixed !== original) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return 1;
  }
  return 0;
}

// Also scan ALL ts files in data folder for apostrophe issues
function findAllTsFiles(dir) {
  const files = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, {withFileTypes: true})) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.ts')) files.push(full);
    }
  }
  walk(dir);
  return files;
}

console.log('Scanning all .ts files for apostrophe issues...\n');

const allFiles = findAllTsFiles('src/data');
let totalFixed = 0;
let totalErrors = 0;

allFiles.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  
  // Quick check: does this file have potential apostrophe issues?
  // Look for single-quoted strings with word-apostrophes
  if (!/'[^']*\w'\w[^']*'/.test(text) && 
      !/"[^"]*'[^"]*"/.test(text)) return;
  
  const original = text;
  // Fix word apostrophes inside single-quoted strings
  let fixed = text.replace(/'((?:[^'\\]|\\.)*)'/g, (match, inner) => {
    if (!/\w'\w/.test(inner)) return match;
    const escapedInner = inner.replace(/(\w)'(\w)/g, "$1\\'$2");
    return escapedInner !== inner ? `'${escapedInner}'` : match;
  });
  
  if (fixed !== original) {
    fs.writeFileSync(f, fixed, 'utf8');
    console.log(`Fixed: ${path.relative('', f)}`);
    totalFixed++;
  }
});

// Special fix for Chinese file - unterminated string
const chineseFile = 'src/data/p3/chinese/papers/eoy/eoy_nanhua_higher_paper2_2025.ts';
if (fs.existsSync(chineseFile)) {
  let text = fs.readFileSync(chineseFile, 'utf8');
  const lines = text.split('\n');
  
  // Find line 510 area and fix unterminated string
  let changed = false;
  for (let i = 505; i < Math.min(515, lines.length); i++) {
    const line = lines[i];
    // Count unescaped quotes
    const singleQuotes = (line.match(/(?<!\\)'/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      // Odd number of quotes - likely unterminated
      // Escape any apostrophes that are inside contractions
      lines[i] = line.replace(/(\w)'(\w)/g, "$1\\'$2");
      if (lines[i] !== line) changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(chineseFile, lines.join('\n'), 'utf8');
    console.log(`Fixed Chinese file`);
    totalFixed++;
  }
}

console.log(`\nDone! Fixed ${totalFixed} files`);
