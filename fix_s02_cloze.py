#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S02/C, S02/D 결함 수정 (HANDOFF 7-B).

C: word_box는 catch/swim 동사변화형 8개인데 지문 빈칸 절반이 대명사 자리였다.
   -> 지문을 동사변화형 8빈칸으로 재작성하고 정답을 뜻에 맞게 재배정.
D: word_box에 명사가 없는데 지문이 명사(상자)와 'wet'을 요구했다.
   -> 지문을 box의 형용사/동사만으로 풀리도록 재작성.
A4: 'she was over the moon - she was so worried' 시제 모순 -> 'she had been so worried'.
"""
import json, os, sys

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
S = next(x for x in data["sets"] if x["set_id"] == "S02")

# ---------------- Section C ----------------
C = S["sections"]["C"]
C["passage"] = (
    "Our school visited the aquarium last week. We watched a sea otter (1)___ in a big tank. "
    "It kept (2)___ in circles because it was so playful. The sign on the glass says that this "
    "otter (3)___ for more than five hours every day. Last winter, it even (4)___ in the chilly "
    "outdoor pool. While we were standing there, a fish darted past and the otter quickly (5)___ "
    "it. An otter always (6)___ its food with its front paws, never with its mouth. The hungry "
    "otter kept (7)___ more fish until the keeper's bucket was empty. We waited to see it (8)___ "
    "one last fish, but it had already curled up for a nap."
)
C["answers"] = {
    "1": "E (swim - watched + object + base verb)",
    "2": "G (swimming - kept + -ing)",
    "3": "H (swims - 'the sign says' = present; this otter = singular)",
    "4": "F (swam - 'Last winter' = past)",
    "5": "B (caught - past narrative, 'darted past')",
    "6": "C (catches - general truth, 'an otter' = singular present)",
    "7": "D (catching - kept + -ing)",
    "8": "A (catch - see + object + base verb)",
}
c_fix = {
    1: ("E",
        "Students pick 'swims' because one otter feels singular. But after WATCHED + object the verb has no -s.",
        "WATCH / SEE / HEAR + object + BASE VERB. 'We watched a sea otter SWIM' - never 'swims'. = E."),
    2: ("G",
        "Students pick the past 'swam' because the visit was last week. KEEP is what decides the form, not the story's tense.",
        "KEEP + -ING. 'It kept SWIMMING'. Same pattern: kept running, kept talking. = G."),
    3: ("H",
        "Students pick 'swim' (no -s). The subject 'this otter' is singular, and 'the sign says' is present tense.",
        "Singular subject + present tense -> add -s. 'This otter SWIMS every day.' = H."),
    4: ("F",
        "Students pick 'swims'. 'Last winter' is a finished time, so the verb must be past.",
        "Past time marker ('last winter', 'yesterday') -> past tense. swim -> SWAM (irregular). = F."),
    5: ("B",
        "Students pick 'catches'. The sentence is a finished past action ('a fish darted past').",
        "Past narrative -> past verb. catch -> CAUGHT (irregular, not 'catched'). = B."),
    6: ("C",
        "Students pick 'catch'. 'An otter' is ONE otter, and this is a general truth in the present.",
        "General truth + singular subject -> verb + -s. 'An otter CATCHES its food.' = C."),
    7: ("D",
        "Students pick 'caught' because the story is past. But KEPT is already the past verb; the next verb must be -ing.",
        "KEEP + -ING (again). 'kept CATCHING more fish'. Only ONE verb carries the tense. = D."),
    8: ("A",
        "Students pick 'caught'. After SEE + object the verb is the base form with no ending.",
        "SEE / WATCH / HEAR + object + BASE VERB. 'to see it CATCH one last fish'. = A."),
}
for q in C["questions"]:
    b = q["blank_number"]
    ans, trap, tip = c_fix[b]
    q["answer"] = ans
    q["trap_type"] = trap
    q["learning_tip"] = tip

# ---------------- Section D ----------------
D = S["sections"]["D"]
D["passage"] = (
    "Last weekend, Mia found an injured bird in the garden. It was so (1)___ that it could fit "
    "inside her palm. A stray cat had (2)___ the little sparrow across the grass, and one of its "
    "wings was hurt. At first the bird was (3)___ of Mia and tried to flap away, so she moved "
    "slowly and spoke in a soft voice. Her mother called a wildlife officer, who came at once to "
    "(4)___ the trembling creature. He carried it to a shelter where it would be (5)___ from cats "
    "and cars until its wing healed."
)
d_fix = {
    1: ("H",
        "Students pick 'gentle' (C), which describes character, not size. The clue is 'fit inside her palm'.",
        "TINY = very, very small. If it fits in a palm, it is TINY. = H."),
    2: ("B",
        "Students pick 'rescue' (E). But the cat is the one doing this, and it is why the bird is hurt - it ran after it.",
        "CHASED = ran after something to catch it. The blank needs a PAST verb after 'had'. = B."),
    3: ("A",
        "Students pick 'surprised' (G). The bird 'tried to flap away' - that is fear, not surprise.",
        "AFRAID = frightened. 'Afraid OF something' is the fixed pairing. = A."),
    4: ("E",
        "Students pick 'chased' (B). After 'came at once TO ___' a base verb is needed, and an officer helps, not hunts.",
        "RESCUE = save someone from danger. After 'to' use the base verb. = E."),
    5: ("F",
        "Students pick 'noisy' (D) or 'gentle' (C). The blank is about being out of danger 'from cats and cars'.",
        "SAFE = protected from danger. 'Safe FROM something' is the fixed pairing. = F."),
}
for q in D["questions"]:
    b = q["blank_number"]
    ans, trap, tip = d_fix[b]
    q["answer"] = ans
    q["trap_type"] = trap
    q["learning_tip"] = tip

# ---------------- A4 stem tense ----------------
for q in S["sections"]["A"]["questions"]:
    if q["question_id"] == "S02_A4":
        q["stem"] = ("When Nina found her lost cat Biscuit alive and well after two days, she was "
                     "________ - she had been so worried.")

# ---------------- self-check ----------------
errs = []
for key in ("C", "D"):
    sec = S["sections"][key]
    n = sec["passage"].count("___")
    if n != len(sec["questions"]):
        errs.append(f"{key}: blanks {n} != questions {len(sec['questions'])}")
    used = [q["answer"] for q in sec["questions"]]
    if len(set(used)) != len(used):
        errs.append(f"{key}: duplicate answer letters {used}")
    for a in used:
        if a not in sec["word_box"]:
            errs.append(f"{key}: answer {a} not in word_box")
if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  "); sys.exit(1)

if "--dry" in sys.argv:
    print("DRY OK - S02 C/D/A4 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S02 C/D/A4 fixes")
