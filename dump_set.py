#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dump all base content of one set needed to author an enrichment patch.
Usage: python3 dump_set.py ZS03"""
import json, sys, os
BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
d = json.load(open(BASE, encoding="utf-8"))
sid = sys.argv[1]
z = next(x for x in d if x.get("setId") == sid)
print(f"### {sid}  theme={z.get('theme')}  band={z.get('band')}")
secs = {s["type"]: s for s in z["plan"]}
for t in ("HanziMcq", "PinyinMcq", "VocabMcq"):
    if t in secs:
        for it in secs[t]["items"]:
            ans = it["options"][it["answer"]]
            print(f"[{t}] {it['id']} skill={it.get('skill')}")
            print(f"   sent: {it['sentence']}")
            print(f"   opts: {it['options']}  ans={it['answer']} ({ans})")
            print(f"   expl: {it.get('explanation','')}")
if "VocabMatch" in secs:
    m = secs["VocabMatch"]["items"][0]
    print(f"[VocabMatch] {m['id']}  pool={m['pool']}")
    for r in m["items"]:
        answ = m["pool"][r["answer"]]
        print(f"   num{r['num']}: stem={r['stem']}  ans={r['answer']} ({answ})")
if "SentenceCraft" in secs:
    for it in secs["SentenceCraft"]["items"]:
        print(f"[SentenceCraft] {it['id']} connector={it.get('connector')}")
        print(f"   A={it.get('sentenceA')}  B={it.get('sentenceB')}")
        print(f"   answer={it.get('answer')}")
        print(f"   expl={it.get('explanation','')}")
if "PassageCloze" in secs:
    c = secs["PassageCloze"]["items"][0]
    print(f"[PassageCloze] {c['id']}  wordBank={c['wordBank']}")
    print(f"   passage: {c['passage']}")
    for b in c["blanks"]:
        print(f"   num{b['num']} ans={b['answer']}: {b.get('explanation','')}")
for t in ("ReadingMcq", "ReadingOpen"):
    if t in secs:
        sec = secs[t]["items"][0]
        print(f"[{t}] {sec['id']}")
        print(f"   passage: {sec['passage']}")
        for q in sec["questions"]:
            print(f"   {q['id']} fmt={q.get('format')} skill={q.get('skill')}")
            print(f"      stem: {q['stem']}")
            if "options" in q:
                print(f"      opts: {q['options']} ans={q['answer']} ({q['options'][q['answer']]})")
            if "answer" in q and "options" not in q:
                print(f"      answer: {q['answer']}")
