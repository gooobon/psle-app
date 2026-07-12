#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S01/S03/S06 결함 수정 + S02_E5 오류 유형 현실화.

S01/D : blank5 'Amy's mum came to school and RETURNED the bottle to Amy' — 병은 사무실에 있었으므로
        엄마가 돌려줄 수 없다. 사건 순서가 성립하지 않음 -> 마지막 문장 재작성.
S01/E : 오류어 "students's" 는 실재하지 않는 형태 -> 아포스트로피 누락("students")으로 교체.
S02/E5: 같은 이유로 "rangers's" -> "rangers".
S03/C : blank8 'What a IS CLEANING and tidy home' = 비문. box의 'is cleaning' 이 갈 자리가 없었다.
        -> blank7을 현재진행 자리로, blank8을 형용사(clean) 자리로 재배치. blank5도 'mop'이 자연스럽게.
S03/D : 미사용 보기 3개(helpful/proud/surprised)가 지문 본문에 그대로 노출 -> 지문 재작성.
S03/E : (a) 'was'가 지문에 2회 등장해 밑줄이 엉뚱한 곳에 걸린다 (b) "cleaners's" 비현실 -> 재작성.
S03/F1: 'Did you remember...?' 의 간접화법은 'had remembered' (시제 일치) -> model 교정.
S06/C : blank6 'wear jackets BEFORE the visit' 어색 -> 'put on our jackets before the visit'로 자연화.
S06/D : **완전 파손.** box(breeze/drenched/forecast/shelter/soaked)와 지문(tropical/umbrella/
        sheltering/weather vane/overflow 를 요구)이 완전히 다른 문제에서 왔다. 보기도 5개뿐(오답 0개).
        -> 지문·box 전면 재작성(보기 8개, 정답 5개).
S06/E5: "neighbours's" -> "neighbours".
S06/F : sentence1/sentence2 가 아예 없다(undefined) -> 학생이 볼 원문이 화면에 뜨지 않는다. model에서 복원.
"""
import json, os, re, sys
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
G = {s["set_id"]: s for s in data["sets"]}

# ---------- S01/D ----------
S = G["S01"]
S["sections"]["D"]["passage"] = (
    "One afternoon, Mei found a pink water bottle near the school gate. She looked at it (1)___ and "
    "saw the name 'Amy' written on the side. Mei was worried that Amy had (2)___ her bottle. She "
    "picked it up and walked (3)___ to the school office to hand it in. The teacher smiled and said, "
    "'Well done for being honest!' The next morning, Amy ran up to Mei and said, 'Thank you! I was "
    "looking everywhere for it!' Mei felt (4)___ that she had helped a classmate. That same "
    "afternoon, the office teacher (5)___ the bottle to Amy."
)
for q in S["sections"]["D"]["questions"]:
    if q["blank_number"] == 5:
        q["trap_type"] = "Students pick 'dropped' (C). The teacher is giving the bottle BACK to its owner."
        q["learning_tip"] = "RETURNED = gave something back to the person it belongs to. = G."

# ---------- S01/E ----------
S["sections"]["E"]["passage"] = (
    "Yesterday, my class had a surprise English test that Mrs Lee did not tell us about in advance. "
    "Before we started, she asked us to sit quiet (33) and not make any noise. My friend Sam writed "
    "(34) the wrong word on the first question by mistake. He looked very worry (35) but kept going. "
    "At the end, I heard some students (36) voices outside the window. Luckily, the test ended soon "
    "and Mrs Lee asked everyone to hand in there (37) papers at the front."
)
for it in S["sections"]["E"]["errors"]:
    if it["blank_number"] == 36:
        it["wrong_word"] = "students"
        it["correction"] = "students'"
        it["error_type"] = "Possessive apostrophe - plural possessive"
        it["trap_type"] = "Students write a plain plural and leave out the apostrophe that shows ownership."
        it["learning_tip"] = "The voices BELONG TO the students -> STUDENTS' voices (apostrophe after the -s for a plural). Singular: student's."

# ---------- S02/E5 ----------
for it in G["S02"]["sections"]["E"]["errors"]:
    if it["blank_number"] == 37:
        it["wrong_word"] = "rangers"
        it["correction"] = "rangers'"
        it["error_type"] = "Possessive apostrophe - plural possessive"
        it["trap_type"] = "Students write a plain plural and leave out the apostrophe."
        it["learning_tip"] = "The report BELONGS TO the rangers -> RANGERS' report (apostrophe after the -s for a plural). Singular: ranger's."
G["S02"]["sections"]["E"]["passage"] = (G["S02"]["sections"]["E"]["passage"]
    .replace("the park rangers's (37) report", "the park rangers (37) report")
    # 'goed (33) there by bus' 의 there 안에 34번 오류어 'here' 가 들어 있어
    # 렌더러(indexOf)가 'there' 의 here 에 먼저 밑줄을 친다 -> 문구 교체.
    .replace("We goed (33) there by bus", "We goed (33) to the park by bus"))

# ---------- S03/C ----------
S = G["S03"]
S["sections"]["C"]["passage"] = (
    "Every Saturday, our family does chores together. My father (1)___ the floors with a big mop "
    "while my mother wipes the windows. Last Saturday was special because Grandma came to visit. "
    "Dad (2)___ the kitchen tiles twice to make sure they were spotless. My sister was in charge of "
    "(3)___ the bathrooms. She spent nearly an hour (4)___ every corner carefully. Meanwhile, I had "
    "to (5)___ the floor of my room with a small mop. I (6)___ the shelves and put all my books back "
    "in order. Even now, my little brother (7)___ the last window in the living room. Grandma walked "
    "in and said, 'What a (8)___ and tidy home you have!'"
)
c3 = {5: ("E", "Students pick 'mopped' (F). The blank follows 'had to', so a base verb is needed.",
          "After HAD TO, use the BASE verb: had to MOP. = E."),
      7: ("D", "Students pick 'cleaned' (B). 'Even now' means the action is happening at this moment.",
          "EVEN NOW = right now -> present continuous: IS CLEANING. One brother = singular = is. = D."),
      8: ("A", "Students pick 'cleaning' (C). After 'What a ___ and tidy home', an ADJECTIVE is needed.",
          "CLEAN is the adjective (clean and tidy). 'Cleaning' is a verb form, not a describing word. = A.")}
for q in S["sections"]["C"]["questions"]:
    b = q["blank_number"]
    if b in c3:
        q["answer"], q["trap_type"], q["learning_tip"] = c3[b]

# ---------- S03/D ----------
S["sections"]["D"]["passage"] = (
    "Last Friday, eight-year-old Kai decided to help his mother cook dinner as a surprise. He "
    "carried the pot of water very (1)___ so that he would not drop it. Unfortunately, he was a "
    "little (2)___ and (3)___ some water on the floor. He wiped it up (4)___ before his mother came "
    "back into the kitchen. When Mother walked in and saw the (5)___ kitchen and smelled the "
    "cooking, she could hardly believe her eyes. She hugged Kai and thanked him for doing so much on "
    "his own."
)

# ---------- S03/E ----------
S["sections"]["E"]["passage"] = (
    "Last Saturday, our whole family spent the morning doing housework together. Everyone taked (33) "
    "a different chore - Father mopped the floors and Mother wiped the windows. My sister organize "
    "(34) all the books on the shelf while I swept the corridor. The curtains was (35) taken down and "
    "washed in the machine. When Grandma arrived, the house looked beautiful and she said it looked "
    "like the cleaners (36) best work ever. We all heard Grandma whisper to Mother that there (37) "
    "home had never looked so clean."
)
for it in S["sections"]["E"]["errors"]:
    if it["blank_number"] == 36:
        it["wrong_word"] = "cleaners"
        it["correction"] = "cleaners'"
        it["error_type"] = "Possessive apostrophe - plural possessive"
        it["trap_type"] = "Students write a plain plural and leave out the apostrophe."
        it["learning_tip"] = "The work BELONGS TO the cleaners -> CLEANERS' best work (apostrophe after the -s for a plural)."

# ---------- S03/F1 ----------
for q in S["sections"]["F"]["questions"]:
    if q["question_id"] == "S03_F1":
        q["model_answer"] = "Mother asked Nora if she had remembered to take out the rubbish before school."

# ---------- S06/C ----------
S = G["S06"]
S["sections"]["C"]["passage"] = S["sections"]["C"]["passage"].replace(
    "We had to wear jackets (6)________ the visit", "We had to put on our jackets (6)________ the visit")

# ---------- S06/D ----------
S["sections"]["D"]["word_box"] = ["breeze", "forecast", "lightning", "puddles", "raincoat",
                                  "shelter", "soaked", "thunder"]
S["sections"]["D"]["passage"] = (
    "Last Sunday, the weather (1)________ on television warned of heavy rain in the afternoon. My "
    "brother and I ignored it and cycled to the park anyway. When the first drops fell, we ran to "
    "take (2)________ under the roof of the bus stop. Our shirts were already (3)________ and water "
    "dripped from our hair. Ten minutes later the rain stopped, a cool (4)________ blew across the "
    "field, and the sun came out again. On the way home, we cycled around the (5)________ that had "
    "formed along the path."
)
d6 = {1: ("forecast", "Students pick 'thunder'. The blank is the report that WARNED of rain before it fell.",
          "FORECAST = what the weather is expected to do. 'The weather FORECAST warned of rain.'"),
      2: ("shelter", "Students pick 'raincoat'. You do not 'take a raincoat under a roof' - you TAKE something else there.",
          "TAKE SHELTER = go somewhere to be protected from the rain. A fixed phrase."),
      3: ("soaked", "Students pick 'raincoat'. The blank describes the shirts after the rain.",
          "SOAKED = completely wet through. 'Our shirts were SOAKED.'"),
      4: ("breeze", "Students pick 'thunder' or 'lightning'. The blank BLEW across the field, so it is moving air.",
          "BREEZE = a light, gentle wind."),
      5: ("puddles", "Students pick 'shelter'. The blank names the small pools of water left on the path.",
          "PUDDLES = small pools of rainwater on the ground. Plural, because there are many.")}
for q in S["sections"]["D"]["questions"]:
    b = q["blank_number"]
    q["answer"], q["trap_type"], q["learning_tip"] = d6[b]

# ---------- S06/E5 ----------
S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the neighbours's (5) group chat", "the neighbours (5) group chat")
def e_items(sec):
    return sec.get("errors") or sec.get("questions") or []
for it in e_items(S["sections"]["E"]):
    if it["blank_number"] == 5:
        # S06은 오류어 키가 'error_word' 다 (세트마다 스키마가 갈린다)
        it["error_word" if "error_word" in it else "wrong_word"] = "neighbours"
        it["correction"] = "neighbours'"
        it["error_type"] = "Possessive apostrophe - plural possessive"
        it["trap_type"] = "Students write a plain plural and leave out the apostrophe."
        it["learning_tip"] = "The group chat BELONGS TO the neighbours -> NEIGHBOURS' group chat (apostrophe after the -s)."

# ---------- S06/F ----------
f6 = {"S06_F1": ("The weather officer asked the reporter a question.",
                 "Will the storm reach the city by midnight?"),
      "S06_F2": ("Father was driving home.", "Then it started to hail.")}
for q in S["sections"]["F"]["questions"]:
    s1, s2 = f6[q["question_id"]]
    q["sentence1"], q["sentence2"] = s1, s2

# ---------- self-check ----------
errs = []
for sid in ("S01", "S02", "S03", "S06"):
    s = G[sid]
    for k in ("C", "D"):
        sec = s["sections"][k]
        n = len(re.findall(r"\(\d+\)_+", sec["passage"]))
        qs = sec["questions"]
        if n != len(qs):
            errs.append(f"{sid}/{k}: blanks {n} != questions {len(qs)}")
        used = [q["answer"] for q in qs]
        if len(set(used)) != len(used):
            errs.append(f"{sid}/{k}: duplicate answers {used}")
        wb = sec["word_box"]
        pool = list(wb.values()) if isinstance(wb, dict) else list(wb)
        keys = list(wb.keys()) if isinstance(wb, dict) else list(wb)
        for a in used:
            if a not in keys:
                errs.append(f"{sid}/{k}: answer '{a}' not in word_box")
        # 미사용 보기가 지문에 노출되면 오답 보기가 무력화된다
        used_words = [wb[a] for a in used] if isinstance(wb, dict) else used
        for w in pool:
            if w not in used_words and (" " + w) in sec["passage"].lower():
                errs.append(f"{sid}/{k}: unused distractor '{w}' appears in passage")
    ep = s["sections"]["E"]["passage"]
    for it in (s["sections"]["E"].get("errors") or s["sections"]["E"].get("questions") or []):
        w = it.get("wrong_word") or it.get("error_word")
        # 렌더러는 sentence.indexOf(wrongWord) 로 밑줄을 친다. 따라서 지문에서 그 단어의
        # '첫 등장'이 실제 밑줄 자리가 아니면 엉뚱한 글자에 밑줄이 그어진다. (예: here <- there)
        marked = f"{w} ({it['blank_number']})"
        if marked not in ep:
            errs.append(f"{sid}/E{it['blank_number']}: '{marked}' 표시가 지문에 없음")
        elif ep.index(w) != ep.index(marked):
            errs.append(f"{sid}/E{it['blank_number']}: '{w}' 가 지문 앞쪽 '{ep[max(0,ep.index(w)-12):ep.index(w)+len(w)+3]}' 안에 먼저 걸린다")
        if w == it["correction"]:
            errs.append(f"{sid}/E{it['blank_number']}: wrong == correction")
    for q in s["sections"]["F"]["questions"]:
        if not q.get("sentence1"):
            errs.append(f"{q['question_id']}: sentence1 missing")
if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  "); sys.exit(1)
if "--dry" in sys.argv:
    print("DRY OK - S01/S02/S03/S06 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S01/S02/S03/S06 fixes")
