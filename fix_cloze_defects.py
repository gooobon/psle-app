#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""One-off repair of the cloze authoring defects found while rewriting explanations.

Idempotent: safe to re-run. Each fix checks whether it has already been applied.

DEFECT A - doubled character (ZS04 num1, ZS11 num2, ZS38 num3)
  The passage already carried the character the answer word ends with, so filling
  in the answer produced a doubled character. Fix = drop the stray character from
  the PASSAGE; leave the answer and the wordBank alone. Never shorten the answer
  instead: for ZS38 that would turn the answer into a bare adjective interchangeable
  with the answer of blank (4), giving that blank two valid answers.

DEFECT B - answer does not follow from the passage (ZS07 num4)
  The sentence says everyone sat down to REST, which implies tired, but the keyed
  answer was "glad" - and the wordBank held no word for "tired" while one entry was
  never used by any blank. Fix = swap that unused entry for the right word, re-key
  the answer, and rebuild the whole learning layer for that blank.

Also clears generator self-talk left behind in explain.why.

Usage: python3 fix_cloze_defects.py [--dry]
"""
import json, sys, os

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
dry = "--dry" in sys.argv
data = json.load(open(BASE, encoding="utf-8"))
log = []


def cloze(sid):
    z = next(x for x in data if x["setId"] == sid)
    return next(s for s in z["plan"] if s["type"] == "PassageCloze")["items"][0]


def blank(sid, num):
    return next(b for b in cloze(sid)["blanks"] if b["num"] == num)


def fix_passage(sid, bad, good):
    c = cloze(sid)
    p = c["passage"]
    if bad in p:
        c["passage"] = p.replace(bad, good)
        log.append(sid + " passage: removed the stray character after the blank")
    elif good not in p:
        print("FAIL " + sid + ": expected passage fragment not found"); sys.exit(1)


# ---------------- DEFECT A ----------------
fix_passage("ZS04", "小树开始 (1) ___ 出嫩绿的叶子", "小树开始 (1) ___ 嫩绿的叶子")
fix_passage("ZS11", "雨慢慢 (2) ___ 了。", "雨慢慢 (2) ___。")
fix_passage("ZS38", "(3) ___地说这里真漂亮", "(3) ___说这里真漂亮")

b41 = blank("ZS04", 1)
b41["explain"]["why"] = "叶子是从树上生长出来的，“长出”正是植物生长的说法。"
b41["explain"]["distractors"] = [
    "✓ 正确答案：长出＝生长出来，主语是树。",
    "认真：形容做事的态度，树不会“认真”地冒叶子。",
    "浇：是人给树做的事，不是树自己发生的变化。",
    "漂亮：形容样子好看，不能带出“叶子”这个宾语。",
    "开心：形容人的心情，树没有心情。",
    "跑步：是人的动作，树不会跑步。",
]
log.append("ZS04 blank1: explain.why / distractors rewritten (were circular)")

# ---------------- DEFECT B ----------------
c7 = cloze("ZS07")
bank = c7["wordBank"]
used = set(b["answer"] for b in c7["blanks"] if b["num"] != 4)
if "整齐" in bank:
    if "整齐" in used:
        print("FAIL ZS07: 整齐 is an answer elsewhere - do not remove"); sys.exit(1)
    c7["wordBank"] = ["累" if w == "整齐" else w for w in bank]
    log.append("ZS07 wordBank: 整齐 (never an answer) -> 累")
elif "累" not in bank:
    print("FAIL ZS07: neither 整齐 nor 累 in wordBank"); sys.exit(1)

b74 = blank("ZS07", 4)
if b74["answer"] != "累":
    log.append("ZS07 blank4: answer 高兴 -> 累; learning layer rebuilt")
b74["answer"] = "累"
b74["explain"]["why"] = "空格后面是“便坐在大树下休息”，坐下休息是因为身体乏了，所以填“累”。"
b74["explain"]["distractors"] = [
    "✓ 正确答案：累＝走久了身体乏。后面“便坐下休息”正是它带来的结果。",
    "高兴、快乐：都是心情好，可心情好不会让人非坐下休息不可。",
    "新鲜：形容空气，第一个空已经用过。",
    "散步：是动作，接不上“大家都有点＋？”。",
    "仔细：是做事的态度，第三个空已经用过。",
]
b74["explain"]["memoryTip"] = "看到“便／所以＋坐下休息”，倒着问一句“为什么”，空格里填的就是原因。"
b74["explanation"] = (
    "空格后面是“便坐在大树下休息”，一个“便”字告诉我们：正因为空格里的状态，大家才坐了下来。"
    "走了这么久，身体自然乏了，所以填“累”。词库里的“高兴”“快乐”都是心情好，"
    "可心情好并不会让人非坐下休息不可；“仔细”是做事的态度，更接不上“大家都有点＋？”这个结构。"
    "【填空的方法】看空格后面的结果句（便坐下休息），倒着问一句“为什么会这样”，答案就藏在结果里。"
)
b74["sentence_en"] = ("After walking for a while, everyone felt a bit ___ (tired), "
                      "so they sat down to rest under the big tree.")
b74["hint"] = ("Clue: they sat down to rest. Which box word says how the body feels "
               "after a long walk?")
b74["keywords"] = [
    {"w": "累", "py": "lèi", "en": "tired"},
    {"w": "休息", "py": "xiūxi", "en": "to rest"},
]
b74["explanation_en"] = ("They sit down to rest, which tells you they are 累 ('tired'). "
                         "高兴 / 快乐 both mean 'happy' - a good mood is no reason to "
                         "have to sit down.")

if not log:
    print("nothing to do - all fixes already applied")
for line in log:
    print(" -", line)

if dry:
    print("DRY: no write")
else:
    with open(BASE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print("WROTE", os.path.basename(BASE))
