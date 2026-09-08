#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""fix_p16_editing_sentence.py - P16: Editing items were attached to the WRONG
sentence when the target word also appears earlier in the passage (the Past
Perfect rewrite introduced 'was' into an earlier sentence, so item (4) 'was'
showed sentence (3)). Root cause: build_wa1_practice.js sentenceContaining()
returns the FIRST sentence containing the word.
Fix: prefer the sentence where the word is followed by its "(n)" marker.
Also writes check_editing_sentences.py (run after node build_wa1_practice.js).
Idempotent."""
import io, os, sys, re
ROOT = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(ROOT, "build_wa1_practice.js")
s = io.open(B, encoding="utf-8", newline="").read()
old = """function sentenceContaining(passage, word) {
  if (!word) return '';
  const parts = String(passage).split(/(?<=[.!?])\\s+/);
  return parts.find(p => p.includes(word)) || '';
}"""
new = """function sentenceContaining(passage, word) {
  if (!word) return '';
  const parts = String(passage).split(/(?<=[.!?])\\s+/);
  // P16: prefer the sentence where the target word carries its "(n)" marker;
  // the same word may occur earlier in the passage without being the target.
  const esc = String(word).replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
  const marked = parts.find(p => new RegExp('(^|[^A-Za-z])' + esc + '\\\\s*\\\\(\\\\d+\\\\)').test(p));
  return marked || parts.find(p => p.includes(word)) || '';
}"""
if "P16: prefer the sentence" in s: print("build_wa1_practice.js already patched")
elif old.replace("\n", "") in s.replace("\r\n", "\n").replace("\n", ""):
    crlf = "\r\n" in s; t = s.replace("\r\n", "\n").replace(old, new, 1)
    io.open(B, "w", encoding="utf-8", newline="").write(t.replace("\n", "\r\n") if crlf else t); print("patched build_wa1_practice.js")
else:
    print("ABORT: sentenceContaining() anchor not found - paste the function from build_wa1_practice.js"); sys.exit(1)

chk = r'''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""check_editing_sentences.py - every Editing item's sentence must contain its
own target marker "wrongWord (n)". Run after node build_wa1_practice.js."""
import io, json, re
t = io.open("src/data/p3/english/wa1_practice.ts", encoding="utf-8").read()
i = t.index("=", t.index("WA1_PRACTICE_SETS: PracticeSet[]")); i = t.index("[", i); j = t.rindex("];") + 1
sets = json.loads(t[i:j]); bad = []; n = 0
for s in sets:
    for sec in s["plan"]:
        if sec["type"] != "Editing": continue
        for cont in sec["items"]:
            for it in cont.get("items", []):
                n += 1
                w = str(it.get("wrongWord", "")); num = it.get("questionNumber"); sent = str(it.get("sentence", ""))
                ok = re.search(r"(^|[^A-Za-z])" + re.escape(w) + r"\s*\(" + str(num) + r"\)", sent) is not None
                if not ok: bad.append("%s/%s wrongWord=%r num=%s :: %s" % (s["setId"], it.get("id"), w, num, sent[:90]))
print("editing items:", n, "| mismatched:", len(bad))
for b in bad: print("  ", b)
'''
io.open(os.path.join(ROOT, "check_editing_sentences.py"), "w", encoding="utf-8").write(chk)
print("wrote check_editing_sentences.py. NEXT: node build_wa1_practice.js ; python check_editing_sentences.py")
