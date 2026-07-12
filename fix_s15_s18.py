#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S15~S18 정독(精讀) 검증에서 나온 결함 수정.

S15/D  : word_box 가 5개(빈칸 5개) = 오답 0개 -> 소거법으로 다 맞힌다. 오답 3개 추가(8개).
         또 blank2 정답 'draft' 가 지문 본문("on each draft")에 그대로 노출 -> 문장 교체.
S15/E4 : "The supplies was (4) and everyone needed more scissors" -> 보어가 없는 비문.
         'were' 로 고쳐도 여전히 비문. 문장 재작성("The supplies was limited, so ...").
S15/E5 : 'teachers's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(teachers)으로 교체.

S16_A2 : stem 에 'after the operation' 이 있어 정답 operate 를 사실상 노출 -> 'afterwards' 로 교체.
S16/D  : 오답 0개 -> 오답 3개 추가.
S16/E  : ★ E2 문장에 'while he was still studying' 이 있어, E4 오류어 'was' 의 '첫 등장'이 E2 문장 안이다.
         렌더러는 sentence.indexOf(wrongWord) 로 밑줄을 치므로 엉뚱한 곳에 밑줄이 간다 -> E2 문장에서 was 제거.
S16/E5 : 'speakers's' -> 'speakers'.

S17_B1 : "Nobody in our group ___ a polar bear at a zoo before - this was our very first time."
         'before / very first time' 는 현재완료를 요구하는데 보기의 have seen 은 Nobody(단수)와 불일치,
         정답 sees 는 시제가 비문 -> 정답이 하나도 없다. stem 을 단수 현재(습관)로 재작성.
S17/C  : ★ 지문이 통째로 다른 문제 것. box 는 전치사 8개(at/in/on/into/through/past/beside/along)인데
         지문 빈칸은 전부 동사 자리("a zookeeper (1)___ the animals at six o'clock").
         정답 대입 시 "a zookeeper at the animals" 처럼 8개 전부 비문.
         trap/tip 은 원래 의도된 지문(동물원 견학 - 입구, 얕은 물, 오솔길, 터널, 파충류관, 벤치, 바닥, 입)을
         정확히 설명하고 있으므로 그 지문을 복원. 정답 8개는 그대로 유지.
S17/D  : 오답 0개 -> 오답 3개 추가.
S17/E5 : 'zookeepers's' -> 'zookeepers'.

S18/D  : ★ 지문이 통째로 다른 문제 것. box(vaccinated/microchipped/groom/obedient/affectionate)와 tip 은
         '수의사에게 데려간 강아지 Max' 이야기인데 지문은 "balanced (1)___ / regular (2)___ /
         warm, safe (4)___ / a (5)___ owner" 처럼 diet·walks·shelter·responsible 을 요구한다.
         정답 대입 시 "a balanced vaccinated", "regular microchipped", "gets their pet groom by a vet" 등
         5개 전부 비문. tip 이 가리키는 원래 지문으로 복원. 오답 3개도 추가.
S18/E  : ★ 첫 문장 "we were allowed to visit them" 때문에 E3 오류어 'were' 의 첫 등장이 그곳이다
         -> 밑줄이 엉뚱한 곳에. 첫 문장 재작성.
S18/E5 : 'pets's' -> 'pets'.

공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 반드시
밑줄 자리여야 한다. 아래 self-check 가 이를 강제한다.
"""
import json, os, re, sys

SRC = os.environ.get("EN_SRC") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
G = {s["set_id"]: s for s in data["sets"]}

def qmap(sec):
    return {q["question_id"]: q for q in (sec.get("questions") or []) + (sec.get("errors") or [])}

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

def set_cloze(sec, table):
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S15 ==============================
S = G["S15"]
D = S["sections"]["D"]
D["word_box"] = ["accurate", "borrowed", "confusing", "deadline", "draft",
                 "feedback", "presented", "researched"]
D["passage"] = (
    "Last term, our class worked on a science project about the water cycle. Each group "
    "(1)________ their topic carefully by reading books and watching videos online. Before writing "
    "the final report, each group produced a (2)________ first so the teacher could check it. The "
    "teacher gave useful (3)________ on every group's work, pointing out areas that needed more "
    "detail or clearer explanations. The students then made changes to ensure their reports were "
    "more (4)________ and complete. On the last day of term, each group (5)________ their findings "
    "to the class using posters and a short talk."
)
set_cloze(D, {2: ("draft",
                  "Students pick 'deadline'. The blank names the FIRST VERSION that the teacher "
                  "checks before the final report is written.",
                  "A DRAFT = a first version of a piece of writing that can be edited and improved "
                  "before the final one is handed in.")})

E = S["sections"]["E"]
E["passage"] = (
    "Last week, our class worked on a group science project about plants. We could here (1) the "
    "excitement in the room as each team started setting up their experiments. One group beginned "
    "(2) mixing the soil and seeds too quickly and made a mess. Another team cutted (3) the "
    "cardboard pieces into the wrong shapes and had to start again. The supplies was (4) limited, "
    "so everyone had to share the scissors and the glue. At the end, the teachers (5) comments "
    "were written on a feedback sheet and given to each group."
)
set_err(E, 4, "was", "were",
        "Subject-verb agreement - plural subject (the supplies)",
        "'The supplies' is plural. Students write 'was' (singular).",
        "Plural subject -> plural verb. THE SUPPLIES WERE LIMITED. WAS is only for one thing.")
set_err(E, 5, "teachers", "teachers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The comments BELONG TO the teachers -> TEACHERS' comments (apostrophe after the -s for a "
        "plural). Singular: teacher's.")

# ============================== S16 ==============================
S = G["S16"]
qmap(S["sections"]["A"])["S16_A2"]["stem"] = (
    "The surgeon had to ________ carefully so that the patient would recover well afterwards.")

D = S["sections"]["D"]
D["word_box"] = ["appointment", "dedicated", "exhausted", "impatient", "medicine",
                 "patients", "profession", "uniform"]

E = S["sections"]["E"]
E["passage"] = (
    "Last Friday, we had a 'Careers Day' at school and many professionals came to speak to us. We "
    "could here (1) the excitement in the corridor before the first visitor arrived. A paramedic "
    "explained that he buyed (2) his first aid kit during his very first year of training. Then a "
    "lawyer entered and taked (3) her seat at the front of the hall. Some of the chairs was (4) "
    "broken and had to be replaced quickly before the session began. At the end, we signed the "
    "speakers (5) thank-you cards and placed them in individual envelopes."
)
set_err(E, 5, "speakers", "speakers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The cards BELONG TO the speakers -> SPEAKERS' cards (apostrophe after the -s for a "
        "plural). Singular: speaker's.")

# ============================== S17 ==============================
S = G["S17"]
q = qmap(S["sections"]["B"])["S17_B1"]
q["stem"] = ("Nobody in our group ________ the polar bear clearly when it hides behind the rocks at "
             "the back of its den.")
q["trap_type"] = ("NOBODY is singular, so the plain verb and 'are seeing' are both wrong, and "
                  "'have seen' cannot agree with a singular subject either.")
q["learning_tip"] = ("NOBODY / EVERYONE / SOMEONE = singular. Nobody SEES = add -s in the present "
                     "tense. 'Nobody see' and 'nobody have seen' are both wrong.")

C = S["sections"]["C"]
C["passage"] = (
    "Our class arrived (1)________ the zoo entrance at eight o'clock sharp. The first animals we "
    "saw were the flamingos, which stood (2)________ a shallow pool with their long legs hidden "
    "under the water. We then walked (3)________ a winding path that followed the edge of the lake "
    "all the way to the monkey house. To reach the butterfly garden, we had to pass (4)________ a "
    "dark tunnel and come out at the other end. On the way back, we walked (5)________ the reptile "
    "house without going in, because a few of us were afraid of snakes. At lunchtime, my brother "
    "sat (6)________ me on the same wooden bench and shared his sandwiches. Someone had left a "
    "banana (7)________ the ground, and a cheeky monkey snatched it up. It peeled the banana and "
    "popped it (8)________ its mouth in one quick movement."
)
set_cloze(C, {
    5: ("past",
        "Students write 'through' (they did not go inside) or 'along'. PAST = go by something "
        "without entering it.",
        "PAST = moved alongside and beyond a place without stopping or entering. We walked PAST "
        "the reptile house = we went by it without going in."),
    6: ("beside",
        "Students write 'on' (the bench) instead of the word that shows position next to a person.",
        "BESIDE = right next to someone or something. My brother sat BESIDE me on the same bench."),
})

D = S["sections"]["D"]
D["word_box"] = ["enclosure", "endangered", "extinction", "habitat", "harmless",
                 "hibernate", "roamed", "spotted"]

E = S["sections"]["E"]
E["passage"] = E["passage"].replace("the zookeepers's (5) guestbook", "the zookeepers (5) guestbook")
set_err(E, 5, "zookeepers", "zookeepers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The guestbook BELONGS TO the zookeepers -> ZOOKEEPERS' guestbook (apostrophe after the -s "
        "for a plural). Singular: zookeeper's.")

# ============================== S18 ==============================
S = G["S18"]
D = S["sections"]["D"]
D["word_box"] = ["abandoned", "affectionate", "greedy", "groom", "kennel",
                 "microchipped", "obedient", "vaccinated"]
D["passage"] = (
    "When my family adopted Max, a young golden retriever, the vet did several important things for "
    "him on his very first visit. First, Max was (1)________ against common dog diseases so that he "
    "would not fall ill. He was also (2)________, so that if he ever got lost, any vet could scan "
    "him and read our address. At home, we brush his thick coat every Sunday to (3)________ him, "
    "and he sits perfectly still while we work. Max is very (4)________ as well - he follows every "
    "command without any fuss. Best of all, he is the most (5)________ dog I have ever known, "
    "because he loves to cuddle up beside us and lick our hands."
)
set_cloze(D, {
    1: ("vaccinated",
        "Students pick 'microchipped'. The clue is 'against common dog diseases so that he would "
        "not fall ill'.",
        "VACCINATED = given an injection that protects against disease. A dog must be VACCINATED "
        "before it can mix with other dogs."),
    2: ("microchipped",
        "Students pick 'vaccinated'. The clue is that a vet could SCAN him and read the owner's "
        "address if he got lost.",
        "MICROCHIPPED = had a tiny electronic chip placed under the skin. A vet can SCAN it to find "
        "the owner's details."),
    3: ("groom",
        "The blank follows 'to', so it must be a base verb. The clue is BRUSHING his thick coat.",
        "GROOM = clean and tidy an animal's coat, nails and appearance. We brush Max every Sunday "
        "to GROOM him."),
    4: ("obedient",
        "Students pick 'affectionate'. The clue is that he FOLLOWS EVERY COMMAND without any fuss - "
        "that is about training, not love.",
        "OBEDIENT = does what it is told. A well-trained dog is OBEDIENT and follows its owner's "
        "commands."),
    5: ("affectionate",
        "Students pick 'obedient'. The clue is that he CUDDLES up and LICKS our hands - that is "
        "about love, not training.",
        "AFFECTIONATE = showing love and warmth through cuddling and touching."),
})

E = S["sections"]["E"]
E["passage"] = (
    "Last week, our neighbour's cat had kittens and my family went next door to visit them. We "
    "could here (1) the tiny mewing sounds before we even opened the door. Ben bringed (2) a small "
    "blanket to keep the kittens warm during the visit. The mother cat were (3) very gentle but "
    "kept a watchful eye on each kitten the whole time. Ben held the smallest kitten careful (4) in "
    "both hands so as not to disturb it. Later, he wrote down his thoughts in the pets (5) "
    "observation journal that the vet kept at the clinic."
)
set_err(E, 5, "pets", "pets'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The journal BELONGS TO the pets -> PETS' observation journal (apostrophe after the -s for "
        "a plural). Singular: pet's.")

# ============================== self-check ==============================
errs = []
for sid in ("S15", "S16", "S17", "S18"):
    s = G[sid]
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            if str(it["answer"]) not in it["options"]:
                errs.append(f"{it['question_id']}: answer {it['answer']} not in options")
                continue
            a = it["options"][str(it["answer"])].lower()
            if re.search(r"\b" + re.escape(a) + r"\b", it["stem"].lower()):
                errs.append(f"{it['question_id']}: the answer '{a}' is printed in its own stem")
            opts = [v.lower() for v in it["options"].values()]
            if len(set(opts)) != len(opts):
                errs.append(f"{it['question_id']}: duplicate options")
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
            if w not in used_words and re.search(r"\b" + re.escape(w.lower()) + r"\b", p.lower()):
                errs.append(f"{sid}/{k}: unused distractor '{w}' appears in the passage")
        if k == "D" and len(pool) < len(qs) + 3:
            errs.append(f"{sid}/D: word_box has only {len(pool)} words for {len(qs)} blanks")
    ep = s["sections"]["E"]["passage"]
    for it in e_items(s["sections"]["E"]):
        w = it.get("wrong_word") or it.get("error_word")
        marked = f"{w} ({it['blank_number']})"
        if marked not in ep:
            errs.append(f"{sid}/E{it['blank_number']}: '{marked}' not found in passage")
        elif ep.index(w) != ep.index(marked):
            bad = ep[max(0, ep.index(w) - 16): ep.index(w) + len(w) + 4]
            errs.append(f"{sid}/E{it['blank_number']}: '{w}' is caught earlier inside '...{bad}...'")
        if w == it["correction"]:
            errs.append(f"{sid}/E{it['blank_number']}: wrong == correction")
    for it in s["sections"]["F"]["questions"]:
        if not (it.get("sentence1") or it.get("sentence_a")):
            errs.append(f"{it['question_id']}: sentence1/sentence_a missing")
        if not it.get("model_answer"):
            errs.append(f"{it['question_id']}: model_answer missing")

if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  ")
    sys.exit(1)
if "--dry" in sys.argv:
    print("DRY OK - S15/S16/S17/S18 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S15/S16/S17/S18 fixes ->", SRC)
