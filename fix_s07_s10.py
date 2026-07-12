#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S07~S10 정독(精讀) 검증에서 나온 결함 수정.

S07_A1 : 지문(stem)에 정답 'red' 가 그대로 박혀 있다("flushed RED from the effort") -> 정답 노출.
S07_A3 : 'put off her celebrations'(=미루다) 도 완벽히 성립 -> 정답이 둘. 지문을 'hold back her tears'
         (고정 연어)로 바꿔 HOLD BACK 만 성립하게 함.
S07_B8 : 'There WAS not enough players' = 비문. players 는 복수 -> WERE. 정답 3(was) -> 4(were).
S07/D  : 전반전에 'was DEFEATED by eight points' 인데 결국 경기를 이겼다(모순). 게다가 마지막 문장은
         'for the third year running'(3연패 우승) -> 작년에 졌다는 사실과 또 충돌. 지문 재작성.
         보기가 5개뿐(오답 0개) -> 학생이 소거법으로 다 맞힌다. 오답 3개 추가.
S07/E5 : 'coordinators's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(coordinators)으로 교체.

S08/C  : blank7('take good care of ___')은 목적격, blank8('___ will last')은 주격인데 정답이 서로
         뒤바뀌어 있다(7=they, 8=them). trap/tip 은 오히려 올바른 설명이 반대 문항에 붙어 있었다. -> 교환.
S08/D  : 보기 5개(오답 0개) -> 오답 3개 추가.
S08/E5 : 'shoppers's' -> 'shoppers'.

S09_A1 : stem 이 'as ___ as a FRESHLY washed carpet' -> 정답 fresh 를 사실상 노출.
S09_A2 : 'The forest fire ___ thousands of trees and DESTROYED the homes...' -> 같은 문장 안에 정답이 있다.
S09_B8 : 'stop cutting THESE trees' 도 문법상 완전히 옳다 -> 정답이 둘. 'cutting ___ so many trees' 로
         바꿔 phrasal verb(cut down)만 성립하게 함.
S09/C3 : 'while half the class ___' 는 was/were 둘 다 가능(집합명사) -> 주어를 명백한 복수로 교체.
         또 지문 본문에 'plants'(=blank1 정답)가 그대로 노출 -> 'saplings' 로 교체.
S09/D  : ★ 지문이 통째로 다른 문제 것. box(littering/overfishing/compost/natural/protect)와 tip 은
         '쓰레기 투기·남획·퇴비' 이야기인데 지문은 산소/물/서식지/오염을 요구한다.
         정답 대입 시 'Trees produce the LITTERING we breathe' 같은 비문이 5개 전부. 지문 재작성.
S09/E5 : 'participants's' -> 'participants'.

S10_B8 : 'touch THAT hot pan on the stove' 도 옳다 -> 정답이 둘. 냄비를 어머니가 들고 있는 상황으로
         바꿔 근칭 단수(this)만 성립하게 함.
S10/D  : ★ 지문이 다른 문제 것. 'a chef must RECIPE all the ingredients', 'the right INGREDIENT of heat',
         'requires fresh APPETISING', 'always BLAND better' — 5개 중 4개가 비문. 지문 재작성.
S10/E3 : 'accidentally cleaned the knife with the wrong cloth' — 고쳐도 뜻이 성립하지 않는다(실수로 닦다?).
S10/E4 : 'the soup ... it ATE away some of the flavour' — 고쳐도 무의미. 두 문장 모두 재작성.
S10/E5 : 'cooks's' -> 'cooks'.

모든 세트 공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이
반드시 밑줄 자리여야 한다. 아래 self-check 가 이를 강제한다.
"""
import json, os, re, sys

SRC = os.environ.get("EN_SRC") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
G = {s["set_id"]: s for s in data["sets"]}

def qmap(sec):
    return {q["question_id"]: q for q in (sec.get("questions") or [])}

def e_items(sec):
    return (sec.get("errors") or []) + (sec.get("questions") or [])

def set_err(sec, blank, wrong, corr, etype, trap, tip):
    for it in e_items(sec):
        if it.get("blank_number") == blank:
            it["error_word" if "error_word" in it else "wrong_word"] = wrong
            it["correction"] = corr
            it["error_type"] = etype
            it["trap_type"] = trap
            it["learning_tip"] = tip

# ============================== S07 ==============================
S = G["S07"]
q = qmap(S["sections"]["A"])["S07_A1"]
q["stem"] = ("At the finish line, the runner's face was as ________ as a tomato - flushed with "
             "colour from the effort and the heat.")

q = qmap(S["sections"]["A"])["S07_A3"]
q["stem"] = ("After winning the gold medal, Priya had to ________ her tears of joy as she stood "
             "on the podium in front of the whole school.")
q["trap_type"] = ("'Put off' = delay; 'run away' = flee; 'break down' = stop working. "
                  "HOLD BACK = stop a strong feeling from bursting out.")
q["learning_tip"] = ("PHRASAL VERB: HOLD BACK = keep a strong feeling from showing. You HOLD BACK "
                     "tears, anger or laughter. HOLD + BACK work together as one meaning.")

q = qmap(S["sections"]["B"])["S07_B8"]
q["answer"] = "4"
q["trap_type"] = ("PLAYERS is plural, so 'was' can never agree with it. Students match the verb to "
                  "'enough' instead of to the noun that follows.")
q["learning_tip"] = ("THERE + plural noun -> WERE. 'There WERE not enough players available.' "
                     "The verb agrees with the noun after it: one player WAS, many players WERE.")

S["sections"]["D"]["word_box"] = ["champion", "cheered", "coach", "defeated", "determined",
                                  "injured", "referee", "spectators"]
S["sections"]["D"]["passage"] = (
    "The school basketball final was the most exciting game of the year. Thousands of (1)________ "
    "filled the stands, cheering loudly for their favourite teams. In the same final last year, our "
    "team had been (2)________ by eight points, so few people expected us to win. At half-time, our "
    "captain Reza looked calm but (3)________. He told everyone to believe in themselves and keep "
    "fighting. In the second half, one of our players got (4)________ when he twisted his ankle. "
    "Even so, the remaining players pushed on and won the match. Reza held up the trophy as our "
    "school's (5)________ for the very first time."
)
d7 = {2: ("defeated",
          "Students think our team lost this match. Read again: the eight-point loss happened in "
          "LAST YEAR's final, not in this one.",
          "DEFEATED = beaten by an opponent. 'Our team had been DEFEATED by eight points' = the "
          "other team beat them."),
      5: ("champion",
          "Students pick 'coach'. Reza is the captain who lifts the trophy, so the blank names the "
          "WINNER of the competition.",
          "A CHAMPION is the player or team that wins a competition. Holding up the trophy = being "
          "the CHAMPION.")}
for it in S["sections"]["D"]["questions"]:
    b = it["blank_number"]
    if b in d7:
        it["answer"], it["trap_type"], it["learning_tip"] = d7[b]

# 'Wei Ming LOVES (1)___' : 'loves to run' 도 완벽히 옳다 -> 정답이 둘(running / to run).
# ENJOY 는 gerund 만 취하므로 blank1 이 유일해진다.
S["sections"]["C"]["passage"] = S["sections"]["C"]["passage"].replace(
    "Wei Ming loves (1)________", "Wei Ming enjoys (1)________")
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 1:
        it["trap_type"] = "After 'enjoys', only the gerund (-ing form) is possible. Students write 'to run'."
        it["learning_tip"] = "ENJOY + verb-ing: enjoys RUNNING every morning. 'Enjoys to run' is never correct."

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the sports coordinators's (5) results sheet", "the sports coordinators (5) results sheet")
set_err(S["sections"]["E"], 5, "coordinators", "coordinators'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The results sheet BELONGS TO the coordinators -> COORDINATORS' results sheet "
        "(apostrophe after the -s for a plural). Singular: coordinator's.")

# ============================== S08 ==============================
S = G["S08"]
qm = qmap(S["sections"]["C"])
qm["S08_C7"]["answer"] = "them"
qm["S08_C7"]["trap_type"] = ("After 'take good care of', use the object pronoun. Students write "
                             "'they' (subject form).")
qm["S08_C7"]["learning_tip"] = ("After a verb + preposition like 'take care OF', use the OBJECT "
                                "pronoun: take good care of THEM.")
qm["S08_C8"]["answer"] = "they"
qm["S08_C8"]["trap_type"] = ("The blank is the subject of 'will last'. Students write 'them' "
                             "(object form).")
qm["S08_C8"]["learning_tip"] = ("THEY = subject pronoun for things. 'THEY will last a long time' = "
                                "the belongings last. THEY is the subject of 'will last'.")

S["sections"]["D"]["word_box"] = ["bargain", "budget", "cashier", "exchange", "queue",
                                  "receipt", "refund", "trolley"]

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the shoppers's (5) purchases", "the shoppers (5) purchases")
set_err(S["sections"]["E"], 5, "shoppers", "shoppers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The purchases BELONG TO the shoppers -> SHOPPERS' purchases (apostrophe after the -s for "
        "a plural). Singular: shopper's.")

# ============================== S09 ==============================
S = G["S09"]
qa = qmap(S["sections"]["A"])
qa["S09_A1"]["stem"] = ("After the rain, the forest floor was as ________ as a newly washed carpet - "
                        "green, clean and sparkling with droplets.")
qa["S09_A2"]["stem"] = ("The forest fire ________ thousands of trees and left many wild animals "
                        "without a home.")

q = qmap(S["sections"]["B"])["S09_B8"]
q["stem"] = ('"We must stop cutting ________ so many trees in the forest," the environmentalist '
             'said firmly.')
q["trap_type"] = ("'This', 'that' and 'these' are demonstratives and cannot stand between 'cutting' "
                  "and 'so many'. CUT DOWN is a fixed phrasal verb.")
q["learning_tip"] = ("'Cut DOWN trees' = chop trees so that they fall. STOP CUTTING DOWN = stop "
                     "chopping them. The two words work as one verb.")

S["sections"]["C"]["passage"] = (
    "Every year, our school (1)________ trees along the roadside as part of its green programme. "
    "Last Earth Day, students from all classes (2)________ over two hundred seedlings in the school "
    "compound. Class 3A was especially enthusiastic - while the older boys (3)________ trees near "
    "the science block, the girls watered the young saplings. Our teacher reminded us (4)________ "
    "each seedling carefully so the roots would take hold. My friend Lin (5)________ a small mango "
    "tree when she accidentally dropped her water bottle. Right now, my brother's class (6)________ "
    "trees behind the canteen. Our principal enjoys (7)________ trees and has said we should "
    "(8)________ at least one new tree every month."
)
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 7:
        it["trap_type"] = "After 'enjoys', only the gerund is possible. Students write 'to plant'."
        it["learning_tip"] = "ENJOY + verb-ing: enjoys PLANTING trees. 'Enjoys to plant' is never correct."
    if it["blank_number"] == 3:
        it["trap_type"] = ("Students write 'planted' (simple past) and miss the ongoing background "
                           "signal 'while'.")
        it["learning_tip"] = ("'While the older BOYS ___' = an action in progress in the past = past "
                              "continuous. Plural subject -> WERE PLANTING.")

S["sections"]["D"]["word_box"] = ["compost", "extinct", "habitat", "littering", "natural",
                                  "overfishing", "protect", "recycle"]
S["sections"]["D"]["passage"] = (
    "Our neighbourhood park used to be a beautiful place. Sadly, (1)________ has become a serious "
    "problem there - drink cans and food wrappers are dropped on the grass every day. Along our "
    "coast, (2)________ has left the sea with far fewer fish than before, because too many are "
    "caught at one time. Last month, our class started a green project. We collected leftover food "
    "and vegetable peels and turned them into (3)________ for the school garden. Our teacher "
    "explained that this is a (4)________ way to enrich the soil, as no chemicals are used at all. "
    "If every one of us does a little, we can (5)________ our environment for the animals and for "
    "ourselves."
)
d9 = {1: ("littering",
          "Students pick 'recycle'. The clue is the drink CANS and food WRAPPERS left on the grass.",
          "LITTERING = dropping or throwing rubbish in public places. It spoils the surroundings and "
          "harms animals."),
      2: ("overfishing",
          "Students pick 'extinct'. The blank must be a THING that has left the sea with fewer fish, "
          "not a describing word.",
          "OVERFISHING = catching too many fish from the sea, leaving too few to breed. 'Over-' = "
          "too much."),
      3: ("compost",
          "Students pick 'habitat'. Leftover food and vegetable peels are turned into food for the "
          "SOIL.",
          "COMPOST = decayed food and plant material mixed into soil to make it richer."),
      4: ("natural",
          "The blank sits before 'way', so it must be a describing word. The clue is that NO "
          "CHEMICALS are used.",
          "NATURAL = happening in nature, without man-made chemicals."),
      5: ("protect",
          "The blank follows 'we can', so it must be a base verb. Students pick a noun.",
          "PROTECT = keep something safe from harm. We must PROTECT the environment for every "
          "living thing.")}
for it in S["sections"]["D"]["questions"]:
    b = it["blank_number"]
    it["answer"], it["trap_type"], it["learning_tip"] = d9[b]

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the participants's (5) observation sheets", "the participants (5) observation sheets")
set_err(S["sections"]["E"], 5, "participants", "participants'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The observation sheets BELONG TO the participants -> PARTICIPANTS' sheets (apostrophe "
        "after the -s for a plural). Singular: participant's.")

# ============================== S10 ==============================
S = G["S10"]
q = qmap(S["sections"]["B"])["S10_B8"]
q["stem"] = ('Mother held up the frying pan and warned, "You must not touch ________ hot pan in my '
             'hands - it has just come off the fire."')
q["trap_type"] = ("'These' and 'those' are plural, but there is only ONE pan. 'That' points at "
                  "something far away, yet the pan is in the speaker's own hands.")
q["learning_tip"] = ("Singular + near the speaker -> THIS. Singular + far -> that. Plural + near -> "
                     "these. Plural + far -> those. Count the object, then measure the distance.")

S["sections"]["D"]["word_box"] = ["appetising", "bland", "boiling", "hungry", "ingredient",
                                  "leftovers", "portion", "recipe"]
S["sections"]["D"]["passage"] = (
    "Last Saturday, Grandma taught me how to cook her famous curry. She took out an old (1)________ "
    "card that she had written by hand many years ago. The first (2)________ we needed was fresh "
    "turmeric, which gives the dish its golden colour. Grandma said that each of us should take only "
    "a small (3)________ at first, so that there would be enough for everyone. When the curry was "
    "finally served, it looked so (4)________ that my cousins wanted to start eating straight away. "
    "Only my little brother complained that his rice tasted (5)________, but that was because he had "
    "forgotten to spoon any curry over it."
)
d10 = {1: ("recipe",
           "Students pick 'ingredient'. The blank names the CARD Grandma wrote - the instructions "
           "for the whole dish.",
           "A RECIPE = the set of instructions telling you what to use and how to cook a dish."),
       2: ("ingredient",
           "Students pick 'recipe'. The blank names ONE item that goes into the dish - the fresh "
           "TURMERIC.",
           "An INGREDIENT = one of the foods used to make a dish. Turmeric is one INGREDIENT of the "
           "curry."),
       3: ("portion",
           "Students pick 'leftovers'. The blank is how much food ONE person takes, so that there "
           "is enough for everyone.",
           "A PORTION = the amount of food served to one person. A small PORTION = a small serving."),
       4: ("appetising",
           "Students pick 'hungry'. It is the CURRY that is described, not the people - and the clue "
           "is how it LOOKED.",
           "APPETISING = looking or smelling so good that it makes you want to eat."),
       5: ("bland",
           "Students pick 'boiling', which is about heat. The clue is that no curry was spooned over "
           "the rice, so it had almost no taste.",
           "BLAND = having very little flavour. Food with no sauce or seasoning tastes BLAND.")}
for it in S["sections"]["D"]["questions"]:
    b = it["blank_number"]
    it["answer"], it["trap_type"], it["learning_tip"] = d10[b]

S["sections"]["E"]["passage"] = (
    "Last Sunday, our family cooked a big meal together to celebrate Grandma's birthday. We could "
    "here (1) the sizzling sounds of food being fried from the other room. First, we decied (2) to "
    "make her favourite dish - prawn noodle soup. Father cleanned (3) the vegetables carefully "
    "before he began cutting them. While the soup was simmering, my little brother eated (4) two "
    "prawn crackers from the plate. After the meal, we signed the cooks (5) notebook with a message "
    "of thanks for Grandma."
)
set_err(S["sections"]["E"], 5, "cooks", "cooks'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The notebook BELONGS TO the cooks -> COOKS' notebook (apostrophe after the -s for a "
        "plural). Singular: cook's.")

# ============================== self-check ==============================
errs = []
for sid in ("S07", "S08", "S09", "S10"):
    s = G[sid]
    # A/B : answer key must exist in options, and be unique
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            if str(it["answer"]) not in it["options"]:
                errs.append(f"{it['question_id']}: answer {it['answer']} not in options")
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            a = it["options"][str(it["answer"])].lower()
            if re.search(r"\b" + re.escape(a) + r"\b", it["stem"].lower()):
                errs.append(f"{it['question_id']}: the answer '{a}' is printed in its own stem")
    # C/D cloze
    for k in ("C", "D"):
        sec = s["sections"][k]
        p = sec["passage"]
        n = len(re.findall(r"\(\d+\)_+", p))
        qs = sec["questions"]
        if n != len(qs):
            errs.append(f"{sid}/{k}: blanks {n} != questions {len(qs)}")
        used = [it["answer"] for it in qs]
        if len(set(used)) != len(used):
            errs.append(f"{sid}/{k}: duplicate answers {used}")
        wb = sec["word_box"]
        keys = list(wb.keys()) if isinstance(wb, dict) else list(wb)
        pool = list(wb.values()) if isinstance(wb, dict) else list(wb)
        for a in used:
            if a not in keys:
                errs.append(f"{sid}/{k}: answer '{a}' not in word_box")
        used_words = [wb[a] for a in used] if isinstance(wb, dict) else used
        for w in pool:
            if w not in used_words and (" " + w.lower()) in p.lower():
                errs.append(f"{sid}/{k}: unused distractor '{w}' appears in the passage")
    # E editing : first occurrence of the wrong word must BE the marked slot
    ep = s["sections"]["E"]["passage"]
    for it in e_items(s["sections"]["E"]):
        w = it.get("wrong_word") or it.get("error_word")
        marked = f"{w} ({it['blank_number']})"
        if marked not in ep:
            errs.append(f"{sid}/E{it['blank_number']}: '{marked}' not found in passage")
        elif ep.index(w) != ep.index(marked):
            bad = ep[max(0, ep.index(w) - 14): ep.index(w) + len(w) + 4]
            errs.append(f"{sid}/E{it['blank_number']}: '{w}' is caught earlier inside '{bad}'")
        if w == it["correction"]:
            errs.append(f"{sid}/E{it['blank_number']}: wrong == correction")
    # F synthesis
    for it in s["sections"]["F"]["questions"]:
        if not (it.get("sentence1") or it.get("sentence_a")):
            errs.append(f"{it['question_id']}: sentence1/sentence_a missing")
        if not (it.get("sentence2") or it.get("sentence_b")):
            errs.append(f"{it['question_id']}: sentence2/sentence_b missing")
        if not it.get("model_answer"):
            errs.append(f"{it['question_id']}: model_answer missing")

if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  ")
    sys.exit(1)
if "--dry" in sys.argv:
    print("DRY OK - S07/S08/S09/S10 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S07/S08/S09/S10 fixes ->", SRC)
