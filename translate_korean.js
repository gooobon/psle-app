// translate_korean.js - Run from project root: node translate_korean.js
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY not set');
  process.exit(1);
}

function hasKorean(text) {
  return /[\uAC00-\uD7A3]/.test(text);
}

function findKoreanStrings(text) {
  const results = [];
  // Match single-quoted strings with Korean
  const regex1 = /'((?:[^'\\]|\\.)*)'/g;
  // Match double-quoted strings with Korean  
  const regex2 = /"((?:[^"\\]|\\.)*)"/g;
  // Match template literal strings with Korean
  const regex3 = /`((?:[^`\\]|\\.)*)`/g;

  for (const regex of [regex1, regex2, regex3]) {
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      if (hasKorean(match[1])) {
        results.push({
          full: match[0],
          str: match[1],
          quote: match[0][0],
          index: match.index,
          length: match[0].length
        });
      }
    }
  }
  // Sort by index, remove overlaps
  results.sort((a, b) => a.index - b.index);
  const filtered = [];
  let lastEnd = 0;
  for (const r of results) {
    if (r.index >= lastEnd) {
      filtered.push(r);
      lastEnd = r.index + r.length;
    }
  }
  return filtered;
}

async function translateBatch(items) {
  const toTranslate = items.map((k, i) => `${i+1}. ${k.str}`).join('\n');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Translate these Korean educational explanations to English for Singapore P3 primary school students.
- Keep grammar terms in English (Simple Past, Subject-Verb Agreement etc.)
- Be clear and concise
- Preserve any English words already in the text
- Reply ONLY with a JSON array of translated strings, no other text, no markdown
- Same count as input

Items:
${toTranslate}`
      }]
    })
  });

  if (!response.ok) throw new Error(`API error ${response.status}`);
  const data = await response.json();
  const content = data.content[0].text.trim();
  const clean = content.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(clean);
}

async function processFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (!hasKorean(text)) return 0;

  const koreanStrings = findKoreanStrings(text);
  if (!koreanStrings.length) return 0;

  const batchSize = 15;
  const allTranslations = [];

  for (let i = 0; i < koreanStrings.length; i += batchSize) {
    const batch = koreanStrings.slice(i, i + batchSize);
    try {
      const translations = await translateBatch(batch);
      allTranslations.push(...translations);
    } catch(e) {
      console.error(`  Batch error: ${e.message}`);
      batch.forEach(b => allTranslations.push(b.str));
    }
    if (i + batchSize < koreanStrings.length) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Replace from end to preserve indices
  let newText = text;
  for (let i = koreanStrings.length - 1; i >= 0; i--) {
    const item = koreanStrings[i];
    const translated = allTranslations[i];
    if (!translated || translated === item.str) continue;
    // Escape quotes in translation
    const safe = translated
      .replace(/\\/g, '\\\\')
      .replace(new RegExp(item.quote === '`' ? '`' : item.quote, 'g'), '\\' + item.quote);
    const newFull = item.quote + safe + item.quote;
    newText = newText.slice(0, item.index) + newFull + newText.slice(item.index + item.length);
  }

  fs.writeFileSync(filePath, newText, 'utf8');
  return koreanStrings.length;
}

async function findKoreanFiles(dir) {
  const files = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
        try {
          if (hasKorean(fs.readFileSync(full, 'utf8'))) files.push(full);
        } catch(e) {}
      }
    }
  }
  walk(dir);
  return files;
}

async function main() {
  const targetDir = path.join(process.cwd(), 'src', 'data');
  console.log(`Scanning: ${targetDir}`);
  const files = await findKoreanFiles(targetDir);
  console.log(`Found ${files.length} files with Korean text\n`);

  let totalFixed = 0;
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const name = path.relative(process.cwd(), f);
    process.stdout.write(`[${i+1}/${files.length}] ${name} ... `);
    try {
      const count = await processFile(f);
      console.log(`done ${count} strings`);
      totalFixed += count;
    } catch(e) {
      console.log(`ERROR: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`\nTotal: ${totalFixed} strings translated`);
}

main().catch(console.error);
