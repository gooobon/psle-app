#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Insert layer breaks into the rewritten Chinese explanations.

Every rewritten explanation follows a fixed 3-layer shape:
  (1) verdict   - why the keyed answer is right
  (2) elimination - why each wrong option is wrong  (the layer that used to be missing)
  (3) method    - the transferable rule, always introduced by a marker like 【...的方法】

They currently render as one dense block, so the structure is invisible to the
student. This inserts a newline between the layers so the renderer can show them
as separate paragraphs.

SAFETY INVARIANT: only newlines are inserted. Stripping the newlines back out must
reproduce the original string character for character. The script refuses to write
if that fails for any item.

Layer 3 boundary: the first bracket marker - exact, no guessing.
Layer 2 boundary: the first sentence that names a wrong option (MCQ) or another
wordBank candidate (cloze). Those are the same tokens merge_expl.py already checks
for, so the split is derived from the data, not from a guess about wording.
SentenceCraft has no options - it gets a 2-paragraph split (body / method) only.

Idempotent. Usage: python3 split_expl_layers.py [--dry]
"""
import json, sys, os, re

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
dry = "--dry" in sys.argv
MCQ = ("HanziMcq", "PinyinMcq", "VocabMcq")
SENT_END = "。！？"


def sentences(text):
    """Split into sentences, keeping the terminator attached."""
    out, cur = [], ""
    for ch in text:
        cur += ch
        if ch in SENT_END:
            out.append(cur); cur = ""
    if cur.strip():
        out.append(cur)
    return out


def split3(expl, tokens):
    """Return the explanation with newlines inserted between the layers."""
    if "\n" in expl:
        return expl  # already split
    m = re.search(r"【", expl)
    if not m:
        return None  # no method marker -> not a rewritten explanation, skip
    body, method = expl[:m.start()], expl[m.start():]

    if not tokens:                       # craft: body / method only
        return body.rstrip() + "\n" + method

    sents = sentences(body)
    cut = None
    for i, s in enumerate(sents):
        if any(t in s for t in tokens):
            cut = i; break
    if cut is None or cut == 0:
        # every sentence names a distractor, or none does -> keep body whole
        return body.rstrip() + "\n" + method
    verdict = "".join(sents[:cut]).rstrip()
    elim = "".join(sents[cut:]).rstrip()
    return verdict + "\n" + elim + "\n" + method


data = json.load(open(BASE, encoding="utf-8"))
n_mcq = n_cloze = n_craft = 0
skipped = 0
failures = []

for z in data:
    secs = {s["type"]: s for s in z["plan"]}
    for t in MCQ:
        if t not in secs:
            continue
        for it in secs[t]["items"]:
            e = it.get("explanation") or ""
            opts, a = it.get("options") or [], it.get("answer")
            if not opts or a is None:
                continue
            correct = str(opts[a])
            toks = []
            for i, o in enumerate(opts):
                if i == a:
                    continue
                o = str(o)
                toks.append(o)
                toks += [c for c in o if c not in correct]
            new = split3(e, toks)
            if new is None:
                skipped += 1; continue
            if new.replace("\n", "") != e.replace("\n", ""):
                failures.append(it["id"])
            it["explanation"] = new; n_mcq += 1
    if "PassageCloze" in secs:
        blk = secs["PassageCloze"]["items"][0]
        bank = [str(w) for w in blk.get("wordBank") or []]
        for b in blk["blanks"]:
            e = b.get("explanation") or ""
            toks = [w for w in bank if w != str(b.get("answer"))]
            new = split3(e, toks)
            if new is None:
                skipped += 1; continue
            if new.replace("\n", "") != e.replace("\n", ""):
                failures.append(z["setId"] + " cloze" + str(b["num"]))
            b["explanation"] = new; n_cloze += 1
    if "SentenceCraft" in secs:
        for it in secs["SentenceCraft"]["items"]:
            e = it.get("explanation") or ""
            new = split3(e, [])
            if new is None:
                skipped += 1; continue
            if new.replace("\n", "") != e.replace("\n", ""):
                failures.append(it["id"])
            it["explanation"] = new; n_craft += 1

if failures:
    print("FAIL - text changed, not just newlines:", ", ".join(failures[:10]))
    sys.exit(1)

print("split: mcq=%d cloze=%d craft=%d" % (n_mcq, n_cloze, n_craft))
print("skipped (no method marker - VocabMatch/Reading, untouched):", skipped)
print("verified: only newlines inserted, no character changed")

if dry:
    print("DRY: no write")
else:
    with open(BASE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print("WROTE", os.path.basename(BASE))
