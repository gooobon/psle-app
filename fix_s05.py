#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S05 결함 수정.

D: 정답(smell/queue/waited/chose/fresh)은 옳으나, 미사용 보기 3개(paid/favourite/delighted)가
   지문 본문에 그대로 쓰여 있어 오답 보기가 무력화된다. 또 blank1 'The smell of the market was
   full of life' 는 비문에 가깝다. -> 지문 재작성, 정답 letter 유지.
E: 3문항 결함.
   - E1 there->their : 'we could get their favourite breakfast stall' 로 고쳐도 비문.
   - E2 visited->visit : '삼촌이 매주 우리를 방문했다'는 뜻 자체가 어긋나고, 고친 'The uncle ... visit us'
     는 수일치까지 틀린다.
   - E5 owners's : 존재하지 않는 형태. 실제 시험 오류는 아포스트로피 누락이다.
   -> 지문을 다시 쓰고 오류 5개를 서로 다른 유형(동음이의/수일치/불규칙과거/시제/복수소유격)으로 재구성.
   -> 각 오류어가 지문에 정확히 1회만 나오도록 강제 (렌더러가 indexOf 로 밑줄).
"""
import json, os, sys
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
S = next(x for x in data["sets"] if x["set_id"] == "S05")

D = S["sections"]["D"]
D["passage"] = (
    "Last Saturday, my mother took me to the market to choose some fish for dinner. The (1)___ of "
    "fried garlic and grilled fish floated through the whole market. There were many people "
    "standing in a long (2)___ at the popular fish stall. We (3)___ patiently for our turn. When "
    "it was our time, Mother (4)___ two big sea bass because they looked very (5)___. The "
    "fishmonger weighed them, wrapped them neatly and handed them to us. On the way home, Mother "
    "told me that sea bass is the fish Father likes best, and that he would be very happy when he "
    "saw what we were having for dinner."
)
d_tip = {
    1: ("Students pick 'fresh' (D). The blank is a noun after 'The', and it is what your nose notices.",
        "SMELL = what you take in through your nose. The blank needs a NOUN, not an adjective. = G."),
    5: ("Students pick 'favourite' (C). The fish is not chosen because it is anyone's favourite, but because of how it LOOKED.",
        "FRESH = newly caught, not old. 'They looked very FRESH' explains why Mother chose them. = D."),
}
for q in D["questions"]:
    if q["blank_number"] in d_tip:
        q["trap_type"], q["learning_tip"] = d_tip[q["blank_number"]]

E = S["sections"]["E"]
E["passage"] = (
    "Last weekend, my family visited the famous Maxwell Food Centre in Chinatown. We arrived early "
    "so that we could eat before the crowd came. Many families were already waiting outside there "
    "(33) favourite breakfast stall. The uncle and his wife works (34) at their stall seven days a "
    "week, and they recognised us at once. He knowed (35) our order by heart and started preparing "
    "the food before we even spoke. He show (36) us how he makes the stock by simmering bones for "
    "over six hours. At the end, we read the stall owners (37) story on the sign and felt even "
    "prouder to be regular customers."
)
e_fix = {
    33: ("there", "their", "Homophone - there (place) vs their (belonging to them)",
         "'there' sounds the same as 'their', so students write the place word.",
         "THEIR = belonging to them. THERE = at that place. The stall belongs to those families = THEIR stall."),
    34: ("works", "work", "Subject-verb agreement - compound subject is plural",
         "Students match the verb to 'his wife' (the nearest noun) instead of the whole subject.",
         "'The uncle AND his wife' = two people = PLURAL -> WORK (no -s). Find the FULL subject before choosing the verb."),
    35: ("knowed", "knew", "Irregular past - know becomes knew",
         "Students add -ed to an irregular verb.",
         "KNOW -> KNEW. Irregular verbs change their whole form; they never take -ed. 'Knowed' does not exist."),
    36: ("show", "showed", "Tense - past narrative needs the past form",
         "The verb is left in the present although the whole passage is about last weekend.",
         "The story happened LAST WEEKEND = past. show -> SHOWED. Keep every verb in the story's tense."),
    37: ("owners", "owners'", "Possessive apostrophe - plural possessive",
         "Students write a plain plural and forget the apostrophe that shows ownership.",
         "The story BELONGS TO the owners -> OWNERS' story (apostrophe AFTER the -s for a plural). Singular: owner's. Plural: owners'."),
}
for it in E["errors"]:
    b = it["blank_number"]
    w, c, et, tr, tp = e_fix[b]
    it["wrong_word"], it["correction"], it["error_type"], it["trap_type"], it["learning_tip"] = w, c, et, tr, tp

errs = []
sec = D
n = sec["passage"].count("___")
if n != len(sec["questions"]):
    errs.append(f"D: blanks {n} != questions {len(sec['questions'])}")
box_used = [sec["word_box"][q["answer"]] for q in sec["questions"]]
for w in ("paid", "favourite", "delighted"):
    if w in sec["passage"].lower():
        errs.append(f"D: distractor '{w}' still appears in passage")
ep = E["passage"]
for it in E["errors"]:
    if ep.count(it["wrong_word"]) != 1:
        errs.append(f"E{it['blank_number']}: '{it['wrong_word']}' appears {ep.count(it['wrong_word'])}x (must be 1)")
if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  "); sys.exit(1)

if "--dry" in sys.argv:
    print("DRY OK - S05 D/E fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S05 D/E fixes")
