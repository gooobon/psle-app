#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Repair SentenceCraft combine answers that lost the subject of sentence B.

ZS33_E2  A: 我们诚实地对待别人。  B: 别人才会信任我们。
  keyed answer: 只有我们诚实地对待别人，才会信任我们。
  With the subject of B dropped, the second clause inherits the subject of the
  first, so the sentence says "we will trust us" - the meaning is broken. The
  subject must stay because it CHANGES between the two clauses (we -> others).

ZS44_E2  keyed answer: 只有每天按时睡觉，才能身体健康。
  Not wrong in meaning, but "才能身体健康" is awkward; the natural form puts the
  subject before 才: 身体才会健康。

Both answer and tiles are updated together (tiles.join must equal answer, which
the self-test enforces). Idempotent.

Usage: python3 fix_craft_subject.py [--dry]
"""
import json, sys, os

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
dry = "--dry" in sys.argv
data = json.load(open(BASE, encoding="utf-8"))

FIXES = {
    "ZS33_E2": {
        "old": "只有我们诚实地对待别人，才会信任我们。",
        "answer": "只有我们诚实地对待别人，别人才会信任我们。",
        "tiles": ["只有", "我们诚实地对待别人，", "别人", "才会信任我们。"],
        "answer_en": "Only if we treat others honestly will others trust us.",
    },
    "ZS44_E2": {
        "old": "只有每天按时睡觉，才能身体健康。",
        "answer": "只有每天按时睡觉，身体才会健康。",
        "tiles": ["只有", "每天按时睡觉，", "身体", "才会健康。"],
        "answer_en": "Only if you sleep on time every day will your body be healthy.",
    },
}

done, already = [], []
for z in data:
    for s in z["plan"]:
        if s["type"] != "SentenceCraft":
            continue
        for it in s["items"]:
            f = FIXES.get(it.get("id"))
            if not f:
                continue
            if it["answer"] == f["old"]:
                it["answer"] = f["answer"]
                it["tiles"] = f["tiles"]
                it["answer_en"] = f["answer_en"]
                done.append(it["id"])
            elif it["answer"] == f["answer"]:
                already.append(it["id"])
            else:
                print("FAIL " + it["id"] + ": answer matches neither form"); sys.exit(1)
            if "".join(it["tiles"]) != it["answer"]:
                print("FAIL " + it["id"] + ": tiles do not join to the answer"); sys.exit(1)

missing = set(FIXES) - set(done) - set(already)
if missing:
    print("FAIL: not found:", ", ".join(sorted(missing))); sys.exit(1)

print("fixed:", ", ".join(done) if done else "(none)")
if already:
    print("already applied:", ", ".join(already))
print("verify: tiles.join == answer for every repaired item")

if dry:
    print("DRY: no write")
else:
    with open(BASE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print("WROTE", os.path.basename(BASE))
