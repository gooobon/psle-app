#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Repair MCQ stems where the blank sits NEXT TO the answer instead of replacing it.

Filling the keyed answer in produced a doubled character, e.g.
  "每天坚______早睡早起"  + 坚  ->  "每天坚坚早睡早起"   (wanted 坚持)
  "互相______励"          + 励  ->  "互相励励"           (wanted 鼓励)
  "喝______杯牛奶"        + 一杯 ->  "喝一杯杯牛奶"

Fix = move / shrink the blank in the STEM only. Options and the keyed answer are
never touched, so every distractor stays exactly as authored.

Not a defect: ZS53_A5 "同学们______纷走出教室" + 纷 -> 纷纷 (a real reduplication).

Idempotent. Usage: python3 fix_mcq_blanks.py [--dry]
"""
import json, sys, os, re

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
dry = "--dry" in sys.argv
data = json.load(open(BASE, encoding="utf-8"))

# item id -> (old stem, new stem)
FIXES = {
    "ZS04_C3": ("经过大家的努力，这片荒地______成了美丽的花园。",
                "经过大家的努力，这片荒地______了美丽的花园。"),
    "ZS15_A3": ("我和小华互相______励，一起努力学习。",
                "我和小华互相鼓______，一起努力学习。"),
    "ZS16_C2": ("弟弟学会了骑自行车，高兴地在院子里骑了______圈。",
                "弟弟学会了骑自行车，高兴地在院子里骑了______。"),
    "ZS20_A3": ("妈妈叮______我，每天要按时吃饭，不能挑食。",
                "妈妈______嘱我，每天要按时吃饭，不能挑食。"),
    "ZS20_A4": ("小华每天坚______早睡早起，精神非常好。",
                "小华每天______持早睡早起，精神非常好。"),
    "ZS43_C5": ("我们在公园里玩了一个下午，______地回家了。",
                "我们在公园里玩了一个下午，______回家了。"),
    "ZS53_A3": ("林老师______励我们要每天坚持写日记。",
                "林老师鼓______我们要每天坚持写日记。"),
    "ZS56_C2": ("爸爸每天早上喝______杯牛奶，补充营养。",
                "爸爸每天早上喝______牛奶，补充营养。"),
}

done, already = [], []
for z in data:
    for s in z["plan"]:
        for it in s.get("items", []):
            f = FIXES.get(it.get("id"))
            if not f:
                continue
            old, new = f
            if it.get("sentence") == old:
                it["sentence"] = new
                done.append(it["id"])
            elif it.get("sentence") == new:
                already.append(it["id"])
            else:
                print("FAIL " + it["id"] + ": stem does not match either form"); sys.exit(1)

missing = set(FIXES) - set(done) - set(already)
if missing:
    print("FAIL: items not found:", ", ".join(sorted(missing))); sys.exit(1)

# verify: filling the answer in must not double a character
bad = 0
for z in data:
    for s in z["plan"]:
        if s["type"] not in ("HanziMcq", "VocabMcq"):
            continue
        for it in s["items"]:
            sent = it.get("sentence", "") or ""
            opts = it.get("options") or []
            a = it.get("answer")
            if a is None or not opts:
                continue
            ans = str(opts[a])
            m = re.search(r"(.?)_{2,}(.?)", sent)
            if not m:
                continue
            before, after = m.group(1), m.group(2)
            if ans and (before == ans[0] or after == ans[-1]):
                if it["id"] == "ZS53_A5":
                    continue  # real reduplication
                print("STILL BAD:", it["id"], sent, ans); bad += 1
if bad:
    sys.exit(1)

print("fixed:", ", ".join(done) if done else "(none)")
if already:
    print("already applied:", ", ".join(already))
print("verify: no doubled character remains in any MCQ stem")

if dry:
    print("DRY: no write")
else:
    with open(BASE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print("WROTE", os.path.basename(BASE))
