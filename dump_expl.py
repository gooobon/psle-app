#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dump only what is needed to rewrite Chinese explanations:
MCQ (id, skill, sentence, options, answer), PassageCloze (wordBank, passage,
blanks), SentenceCraft (connector, A, B, answer). Skips VocabMatch / Reading,
which are already individualised.

Usage: python3 dump_expl.py ZS02 [ZS03 ...]
"""
import json, sys, os

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
MCQ = ("HanziMcq", "PinyinMcq", "VocabMcq")

data = json.load(open(BASE, encoding="utf-8"))
for sid in sys.argv[1:]:
    z = next((x for x in data if x.get("setId") == sid), None)
    if not z:
        print("!! not found:", sid); continue
    print(f"### {sid}  theme={z.get('theme')}  band={z.get('band')}")
    for s in z["plan"]:
        t = s["type"]
        if t in MCQ:
            for it in s["items"]:
                opts = it.get("options") or []
                a = it.get("answer")
                wrong = [o for i, o in enumerate(opts) if i != a]
                print(f"[{t}] {it['id']} skill={it.get('skill')}")
                print(f"   sent: {it.get('sentence')}")
                print(f"   ANS : {opts[a] if a is not None and a < len(opts) else '?'}")
                print(f"   WRONG(must all be named): {' / '.join(map(str, wrong))}")
        elif t == "PassageCloze":
            b = s["items"][0]
            print(f"[PassageCloze] wordBank={b.get('wordBank')}")
            print(f"   passage: {b.get('passage')}")
            for x in b["blanks"]:
                others = [w for w in (b.get("wordBank") or []) if w != x.get("answer")]
                print(f"   num{x['num']} ANS={x.get('answer')} | must name >=1 of: {'/'.join(map(str, others))}")
        elif t == "SentenceCraft":
            for it in s["items"]:
                print(f"[SentenceCraft] {it['id']} connector={it.get('connector')}")
                print(f"   A={it.get('sentenceA')}  B={it.get('sentenceB')}")
                print(f"   answer={it.get('answer')}")
    print()
