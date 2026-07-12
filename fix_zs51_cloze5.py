#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ZS51 cloze (5): the keyed answer does not work in the sentence.

Passage: 真正的朋友会 (5) ___ 地原谅你的错误。
Keyed answer: 勇敢 -> "勇敢地原谅" (bravely forgive) is not idiomatic Chinese;
forgiveness is described with 宽容 (tolerant / forgiving), not with courage. The
old explanation openly rationalised the mismatch ("原谅别人需要勇气…最合适"),
which is exactly the circular pattern the quality gate bans.

No wordBank entry fitted, so the wordBank itself has to change: 勇敢 -> 宽容.
轻松 was never an answer for any blank and stays as a distractor. The learning
layer for the blank is rebuilt to match. Idempotent.

Usage: python3 fix_zs51_cloze5.py [--dry]
"""
import json, sys, os

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
dry = "--dry" in sys.argv
data = json.load(open(BASE, encoding="utf-8"))

z = next(x for x in data if x["setId"] == "ZS51")
blk = next(s for s in z["plan"] if s["type"] == "PassageCloze")["items"][0]
bank = blk["wordBank"]
b5 = next(b for b in blk["blanks"] if b["num"] == 5)

if "宽容" in bank and b5["answer"] == "宽容":
    print("nothing to do - already applied"); sys.exit(0)

used_elsewhere = [b["answer"] for b in blk["blanks"] if b["num"] != 5]
if "勇敢" in used_elsewhere:
    print("FAIL: 勇敢 is the answer of another blank - do not remove"); sys.exit(1)

blk["wordBank"] = ["宽容" if w == "勇敢" else w for w in bank]
b5["answer"] = "宽容"
b5["explain"]["why"] = "真正的朋友心胸宽大，肯原谅别人的过失，这叫“宽容”。"
b5["explain"]["distractors"] = [
    "✓ 正确答案：宽容＝心胸宽大，肯原谅别人。",
    "轻松：说的是没有负担，不能形容“原谅”这个动作。",
    "勇敢：是面对危险时的胆量，原谅朋友不需要胆量。",
    "温暖：形容感受，第三个空已经用过。",
    "深厚：形容友情，第四个空已经用过。",
]
b5["explain"]["memoryTip"] = "肯原谅别人的过失＝宽容；面对危险不退缩＝勇敢。两者不能混用。"
b5["explanation"] = (
    "真正的朋友心胸宽大，不揪着别人的过失不放，这叫“宽容”，"
    "上文阿文笑着说“没关系”，正是宽容的表现。词库里的“轻松”说的是心里没有负担，"
    "是被原谅的人才有的感觉，不能用来形容“原谅”这个动作；“温暖”“深厚”都在前面的空里用过了。"
    "【填空的方法】看清空格后面的动作（原谅你的错误），要填的是能形容“肯不肯原谅”的词。"
)
b5["sentence_en"] = ("I understood that true friends will ___ (tolerantly) forgive "
                     "your mistakes.")
b5["hint"] = ("Clue: Ah Wen smiled and said it did not matter. Which box word means "
              "'big-hearted, willing to forgive'?")
b5["keywords"] = [
    {"w": "宽容", "py": "kuānróng", "en": "tolerant; forgiving"},
    {"w": "原谅", "py": "yuánliàng", "en": "to forgive"},
]
b5["explanation_en"] = ("A true friend is big-hearted and lets a mistake go - that is "
                        "宽容 ('tolerant'). 轻松 means 'free of worry', which is how the "
                        "forgiven person feels, not how the forgiving is done.")

print(" - ZS51 wordBank: 勇敢 -> 宽容")
print(" - ZS51 blank5: answer 勇敢 -> 宽容; learning layer rebuilt")
if dry:
    print("DRY: no write")
else:
    with open(BASE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print("WROTE", os.path.basename(BASE))
