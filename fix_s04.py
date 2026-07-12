#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S04 결함 수정.

C: 정답(near/at/between/on/in/behind/from/into)은 옳으나
   - blank1 'a small market ___ the end of our street' 는 at 이 더 자연스러워 near 와 충돌 (at 은 blank2 전용)
   - blank6 'a food fair ___ the community centre' 는 behind 를 고를 단서가 지문에 없음
   -> 두 문장에 단서를 넣어 정답이 유일하게 결정되도록 수정. 정답 letter 는 그대로.
   - C1/C2/C6 의 trap_type 에 저작 중 메모가 남아 있어 교체.

D: word_box(busy/waiting/dropped/quickly/helped...)와 learning_tip 은 '버스정류장에서 노인이 가방을
   떨어뜨리고 소녀가 도왔다' 지문을 가리키는데, 실제 지문은 '동네 가게 소개'(명사 자리)로 바뀌어 있어
   정답이 전부 비문이 된다. -> 원래 의도대로 지문을 복원. 정답 letter 는 그대로.

E: 5문항 중 4문항 결함.
   - E1 near->nearby : 'living nearby the MRT station' 는 오히려 비문. 오류어 자체가 오류가 아님.
   - E2 there->their : 'The organisers their favourite activity' 로 고쳐도 비문 (organisers' 가 맞음).
   - E4 were->was : 'The committee were happy' 는 영국식으로 허용 가능 -> 애매한 문항.
   - E5 neighbourhood's's : 존재하지 않는 형태라 실전성이 없음.
   -> 지문을 다시 쓰고 오류/수정 쌍을 명확한 4유형(besides/beside, there/their, order/ordered,
      receive/receives, neighbourhoods/neighbourhood's)으로 교체.
   -> 각 오류어가 지문에 '한 번만' 나오도록 함 (렌더러가 indexOf 로 밑줄을 치므로 중복 시 오작동).
"""
import json, os, sys

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
S = next(x for x in data["sets"] if x["set_id"] == "S04")

# ---------------- Section C ----------------
C = S["sections"]["C"]
C["passage"] = (
    "My neighbourhood has many useful places. There is a small market (1)___ our block, just two "
    "minutes away on foot. It opens every morning (2)___ six o'clock. (3)___ the market and the "
    "post office, there is a small park where children play after school. My grandmother likes to "
    "sit (4)___ a bench (5)___ the park and watch the children. On Sundays, there is a food fair "
    "(6)___ the community centre, in the car park at the back. People come (7)___ all over the "
    "neighbourhood to buy food and crafts. My father once walked right (8)___ a lamp post because "
    "he was looking at his phone!"
)
c_tip = {
    1: ("Students reach for 'at' (A), but AT is needed for the exact clock time in blank 2 and each word is used only once.",
        "NEAR = a short distance away. 'Just two minutes away on foot' = NEAR our block. = G."),
    2: ("Students write 'on six o'clock' or 'in six o'clock'.",
        "AT + an exact time: AT six o'clock, AT noon, AT midnight. = A."),
    6: ("Students pick 'near' (G, already used) or 'at'. The clue is the car park AT THE BACK of the building.",
        "BEHIND = at the back of something. The fair is in the back car park = BEHIND the centre. = B."),
}
for q in C["questions"]:
    b = q["blank_number"]
    if b in c_tip:
        q["trap_type"], q["learning_tip"] = c_tip[b]

# ---------------- Section D ----------------
D = S["sections"]["D"]
D["passage"] = (
    "The bus stop near our block is always (1)___ in the morning, with people going to work and "
    "school. Last Tuesday, a long queue of neighbours stood there, (2)___ for the bus. An old man "
    "reached for his wallet and accidentally (3)___ his bag, and oranges rolled all over the "
    "pavement. A girl on a bicycle (4)___ got off to help before anyone else moved. She picked up "
    "every orange and (5)___ him put the fruit back into his bag."
)
d_tip = {
    2: ("Students pick 'busy' (A). The blank follows a comma after 'stood there' and needs an -ing verb.",
        "WAITING = the -ing form after 'stood there, ___ for the bus'. People WAIT for a bus. = H."),
    5: ("Students pick 'smiled' (G). Smiling is an expression, not the action of putting fruit back.",
        "HELPED = did something to make another person's task easier. She HELPED him put the fruit back. = C."),
}
for q in D["questions"]:
    b = q["blank_number"]
    if b in d_tip:
        q["trap_type"], q["learning_tip"] = d_tip[b]

# ---------------- Section E ----------------
E = S["sections"]["E"]
E["passage"] = (
    "Last Sunday, our family spent the morning at the neighbourhood community day. Many residents "
    "came out to clean the park and plant flowers. We saw Ali, who lives close to the MRT station, "
    "picking up litter besides (33) the drain. The organisers said there (34) favourite activity "
    "was the colouring contest for children. Some stalls order (35) extra food because the crowd "
    "turned out to be much bigger than expected. Every helper receive (36) a free drink and a "
    "packet of biscuits. One helper said the event shows that our neighbourhoods (37) spirit is "
    "stronger than ever."
)
e_fix = {
    33: ("besides", "beside",
         "Confused words - besides (= in addition) vs beside (= next to)",
         "Students use 'besides' when they mean 'next to'.",
         "BESIDE = next to / at the side of. BESIDES = in addition, as well. Litter BESIDE the drain = next to it."),
    34: ("there", "their",
         "Homophone confusion - there (place) vs their (belonging to them)",
         "'there' (place) written where 'their' (ownership) is needed.",
         "THEIR = belonging to them. THERE = at that place. THEY'RE = they are. 'THEIR favourite activity' = the activity that belongs to them."),
    35: ("order", "ordered",
         "Tense - past narrative needs the past form",
         "Students leave the verb in the present because the sentence looks like a fact.",
         "The whole passage is about LAST SUNDAY = past. order -> ORDERED (add -ed). Keep every verb in the same tense as the story."),
    36: ("receive", "receives",
         "Subject-verb agreement - 'Every helper' is singular",
         "'Every' feels like many people, so students drop the -s.",
         "EVERY + noun = SINGULAR. Every helper RECEIVES, every child GOES. Singular subject in the present -> verb + -s."),
    37: ("neighbourhoods", "neighbourhood's",
         "Possessive apostrophe missing - singular possessive",
         "Students add a plain -s instead of an apostrophe + s.",
         "The spirit BELONGS TO the neighbourhood -> NEIGHBOURHOOD'S spirit. A plain -s only makes a plural (two neighbourhoods)."),
}
for it in E["errors"]:
    b = it["blank_number"]
    wrong, corr, etype, trap, tip = e_fix[b]
    it["wrong_word"] = wrong
    it["correction"] = corr
    it["error_type"] = etype
    it["trap_type"] = trap
    it["learning_tip"] = tip

# ---------------- self-check ----------------
errs = []
for key in ("C", "D"):
    sec = S["sections"][key]
    n = sec["passage"].count("___")
    if n != len(sec["questions"]):
        errs.append(f"{key}: blanks {n} != questions {len(sec['questions'])}")
    used = [q["answer"] for q in sec["questions"]]
    if len(set(used)) != len(used):
        errs.append(f"{key}: duplicate answers {used}")
    for a in used:
        if a not in sec["word_box"]:
            errs.append(f"{key}: answer {a} not in word_box")
ep = E["passage"]
for it in E["errors"]:
    w = it["wrong_word"]
    if ep.count(w) != 1:
        errs.append(f"E{it['blank_number']}: wrong_word '{w}' appears {ep.count(w)}x in passage (must be exactly 1)")
    if w == it["correction"]:
        errs.append(f"E{it['blank_number']}: wrong == correction")
if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  "); sys.exit(1)

if "--dry" in sys.argv:
    print("DRY OK - S04 C/D/E fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S04 C/D/E fixes")
