#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tools/vocab/check_zh_vocab.py (v3) - student-facing gloss hygiene for zh_vocab.json.
  python tools/vocab/check_zh_vocab.py          # report only
  python tools/vocab/check_zh_vocab.py --fix    # strip editorial notes; DELETE entries left without a meaning
Rules:
  - "(distractor char ...)", "(check ...)", "(verify ...)", "(todo ...)", "(unclear ...)" are editorial notes -> stripped
  - "(as in 朋友)" is learner context -> kept
  - an entry whose gloss is empty after stripping is a pure distractor character with no
    meaning to teach -> removed from the dictionary (item data keeps it as an option)
A backup zh_vocab.pre_fix.json is written once."""
import io, json, os, re, sys
P = "src/data/p3/chinese/zh_vocab.json"
NOTE_RE = re.compile(r"\s*\((?:distractor[^)]*|check[^)]*|verify[^)]*|todo[^)]*|tbd|unclear[^)]*|\?+)\)", re.I)
d = json.load(io.open(P, encoding="utf-8")); fix = "--fix" in sys.argv
flag_note, flag_other, would_delete = [], [], []
for w, e in list(d.items()):
    if not isinstance(e, dict): continue
    en = str(e.get("en", ""))
    stripped = NOTE_RE.sub("", en).strip(" ;,")
    if NOTE_RE.search(en):
        flag_note.append((w, en, stripped))
        if not stripped: would_delete.append(w)
    elif len(en.strip()) < 2:
        flag_note.append((w, en, "")); would_delete.append(w)      # empty gloss -> delete
    elif re.search(r"\b(TODO|TBD|FIXME)\b", en, re.I) or "?" in en:
        flag_other.append((w, en))
print("entries:", len(d), "| editorial notes:", len(flag_note), "| of which meaningless after strip (delete):", len(would_delete), "| other suspects:", len(flag_other))
for w, en, st in flag_note[:15]: print("  note   %s | %s  ->  %s" % (w, en[:50], st[:40] or "<DELETE>"))
for w, en in flag_other[:15]: print("  other  %s | %s" % (w, en[:60]))
if fix:
    bak = P.replace(".json", ".pre_fix.json")
    if not os.path.exists(bak): io.open(bak, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=1))
    n_fix = n_del = 0
    for w, en, st in flag_note:
        if st: d[w]["en"] = st; n_fix += 1
        else: del d[w]; n_del += 1
    io.open(P, "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=1))
    print("fixed %d glosses, deleted %d meaningless entries -> %s (backup: %s)" % (n_fix, n_del, P, os.path.basename(bak)))
