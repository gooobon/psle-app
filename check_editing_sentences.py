#!/usr/bin/env python3
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
