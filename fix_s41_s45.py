#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S41~S45 정독(精讀) 검증에서 나온 결함 수정.

S41_A5 : 'determined to SETTLE IN the new flat' = 비문(settle in 은 자동사구).
         stem 에서 목적어를 없애 'settle in' 이 유일하게 성립하도록 교체.
S41/C  : before/after (b1,b2), until/before (b5), by/before (b6) 가 서로 맞바꿔도 성립 → 정답이 둘.
         각 빈칸에 결정적 단서를 심어 유일해로 만듦(지문 재작성, 정답 8개는 유지).
S41/D  : word_box 5개 = 빈칸 5개, 오답 0개 → 어느 빈칸에도 들어갈 수 없는 3개 추가(총 8).
S42/C  : box 가 if / as long as / provided that 와 although / even though 를 함께 담고 있어
         b1·b5·b6, b3·b4 가 서로 교환 가능 → 정답이 여럿. provided that·even though 를
         because·so that 으로 교체하고 8빈칸을 기능이 서로 다른 접속사(조건·부정조건·양보·이유·
         기간비교·목적·대비(precaution)·양자택일)로 재설계. 섹션 라벨도 교체.
S42/D  : 오답 0개 → 3개 추가.
S42/E4 : 'students's' 는 실재하지 않는 형태 → 아포스트로피 누락형으로 교체. 다만 'students' 는
         지문 첫 문장에 이미 등장하므로 indexOf 밑줄이 어긋난다 → 'pupils' 로 교체.
S43/C  : b6 'not as … as' 와 b4 'less … than' 은 뜻이 같아 서로 성립(원본 trap 자신이
         "'less … than' (also correct)" 이라고 자백) → less … than 을 fewer … than(가산)으로 교체.
         b5 'far longer than the Nile in terms of the total area it drains' = 사실·논리 오류
         (길이 vs 유역면적) → '물의 양이 far larger' 로 교체.
         b7 'The deeper you go …, (7)___ darker' 는 앞의 the 가 이미 지문에 박혀 있어
         'the … the' 를 넣으면 'the the darker' → 두 슬롯을 모두 빈칸으로.
S43/D  : 오답 0개 → 3개 추가.
S43/E3 : ★ 오류어 'to' 의 첫 등장이 앞 문장의 'so as not TO startle' → indexOf 밑줄이 엉뚱한 곳에
         걸린다. 그 문장을 'so that the animals would not be startled' 로 교체.
S43_B6 : 정답 'as' 가 stem 의 'as saltwater' 와 겹친다. 이는 not as … as 상관구조상 의도된
         설계이므로 self-check 에서 예외 처리(ALLOW_STEM_ECHO).
S44_A3 : 'needs to REST in the fridge overnight' 인데 'harden'(냉장고에서 굳는다)도 성립 → 정답이 둘.
         'undisturbed' 를 넣어 rest 만 성립하게 함.
S44_B7 : 'a fourteen-year-old who baked for only two years' = 시제 비문 → 'who had been baking'.
S44/D  : 오답 0개 → 3개 추가.
S44/E  : ★ 지문이 깨져 있다. E2 문장 'She folded IT gentle three times' 의 She/it 에 선행사가 없다
         (앞 문장은 오븐 속 크루아상). 제빵사와 반죽을 도입하도록 문장 교체.
         E4 'bakers's' 는 실재하지 않는 형태 → 아포스트로피 누락형 'bakers' → "baker's".
         E1 learning_tip 이 지문에 없는 'golden brown' 을 말한다 → 교체.
S45/C  : b1(many/several/a lot of), b4(any/many), b5(a few/several), b6(a little/some),
         b7(several/a few) 가 모두 복수해 → 각 빈칸에 수량 단서를 심어 유일해로 만듦
         (how many / at all / just three / no more than a teaspoon / five in a single afternoon).
         b8 의 'so … that' 구조는 b2 의 'so much' 와 충돌 → 관계절로 교체.
S45/D  : 오답 0개 → 3개 추가. D3 trap 이 지문에 없는 'flowers' 를 말한다 → 교체.

공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 반드시
밑줄 자리여야 한다. 아래 self-check 가 이를 강제한다.
"""
import json, os, re, sys

SRC = os.environ.get("EN_SRC") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "20260622_WA1_complete.json")
data = json.load(open(SRC, encoding="utf-8"))
G = {s["set_id"]: s for s in data["sets"]}

ALLOW_STEM_ECHO = {"S43_B6"}  # 'not as ___ plentiful as' : 상관구조라 두 번째 as 가 stem 에 남아야 한다

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

def set_cloze(sec, table):
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S41 ==============================
S = G["S41"]
q = qmap(S["sections"]["A"])["S41_A5"]
q["stem"] = ("Despite the chaos of moving, Mother was determined to ________ before evening so that "
             "the family could sleep comfortably that night.")
q["trap_type"] = ("'Abandon' and 'demolish' need an object and mean giving up or destroying. "
                  "'Renovate' is weeks of building work, not something done before evening.")
q["learning_tip"] = ("SETTLE IN = make a new place feel like home. Mother wanted to SETTLE IN before "
                     "night = unpack and organise so the home felt comfortable.")

S["sections"]["C"]["passage"] = (
    "Moving day was full of surprises. We said goodbye to our neighbours (1)________ the removal "
    "lorry arrived; when it finally pulled up at eight, the farewells were over. (2)________ the "
    "last box had been loaded, we took a final photograph of the empty flat. (3)________ the long "
    "journey to the new estate, I stared out of the window and counted the lorries we passed. We "
    "had lived in the same block (4)________ I was five years old, so leaving it felt strange. The "
    "workers carried boxes from early evening (5)________ midnight, without stopping once for a "
    "meal. Mother wanted every box unpacked (6)________ nine o'clock the next morning, and not a "
    "minute later. When I came downstairs at seven, she had (7)________ arranged all the kitchen "
    "cupboards. Father, however, had not found his reading glasses (8)________ - they were in the "
    "very last box."
)
set_cloze(S["sections"]["C"], {
    1: ("before",
        "Students write 'after'. The lorry pulled up at eight and the farewells were over by then, so the goodbyes came first.",
        "BEFORE = earlier in time than something else. They said goodbye BEFORE the lorry arrived = the goodbye happened first."),
    2: ("after",
        "Students write 'before'. The flat is EMPTY in the photograph, so the loading must already be finished.",
        "AFTER = later in time. AFTER the last box had been loaded, the flat was empty and the photograph could be taken."),
    3: ("during",
        "Students write 'after'. The lorries are being counted while the vehicle is still moving, so the whole stretch of travelling time is meant.",
        "DURING = all through a period or event. DURING the journey = at every moment of the journey, not once it has ended."),
    4: ("since",
        "Students write 'until'. The blank names the starting point of a stretch of time that ran right up to moving day.",
        "SINCE = from a past starting point onwards. We had lived there SINCE I was five = from that age up to now."),
    5: ("until",
        "Students write 'before'. FROM early evening names the start, so the blank must name the end of an unbroken stretch of work.",
        "FROM ... UNTIL = the start and the end of a continuous period. They worked FROM evening UNTIL midnight without a break."),
    6: ("by",
        "Students write 'until'. Mother is naming a deadline, not a stretch of work: not a minute later than nine o'clock.",
        "BY = not later than a given time (a deadline). Unpacked BY nine o'clock = finished at nine o'clock at the latest."),
    7: ("already",
        "Students write 'yet'. The cupboards were done sooner than anyone expected, and the sentence is positive.",
        "ALREADY = sooner than expected, in positive sentences. She had ALREADY arranged the cupboards by seven."),
    8: ("yet",
        "Students write 'already'. The sentence is NEGATIVE - the glasses are still missing at the moment of speaking.",
        "YET = up to now, in negatives and questions. He had NOT found them YET = he expected to, but so far had not."),
})
S["sections"]["D"]["word_box"] = ["cluttered", "corridor", "daunting", "familiar", "landlord",
                                  "relocate", "renovated", "suitcase"]

# ============================== S42 ==============================
S = G["S42"]
S["sections"]["C"]["label"] = "Section C - Grammar Cloze (Conjunctions: condition, contrast, reason, purpose)"
S["sections"]["C"]["word_box"] = ["although", "as long as", "because", "if", "in case", "so that",
                                  "unless", "whether"]
S["sections"]["C"]["passage"] = (
    "(1)________ you make a mistake, do not give up - simply try again the next day. You cannot "
    "improve (2)________ you are willing to make mistakes. (3)________ learning something new can "
    "be frustrating, the feeling of success makes every hour of practice worthwhile. Rina kept "
    "practising the violin (4)________ she wanted to join the school orchestra. Ben practised for "
    "twice (5)________ Rina did, and everyone noticed the difference at the concert. A good teacher "
    "explains each step slowly (6)________ nobody is left behind. Always bring a notebook "
    "(7)________ the instructor demonstrates something new - you will want to write it down at "
    "once. What matters is not (8)________ you succeed on the first try, but how many times you are "
    "willing to begin again."
)
set_cloze(S["sections"]["C"], {
    1: ("if",
        "Students write 'unless' or 'in case'. The mistake may or may not happen, and the advice follows from it - a plain open condition.",
        "IF = a plain condition: this may happen, and if it does, do that. IF you make a mistake, try again."),
    2: ("unless",
        "Students write 'if', forgetting that the sentence is already negative ('cannot improve').",
        "UNLESS = if not. You cannot improve UNLESS you are willing = you cannot improve IF you are NOT willing."),
    3: ("although",
        "Students write 'because'. The two halves clash: the learning is unpleasant, yet the result is worthwhile - that is a contrast, not a reason.",
        "ALTHOUGH = despite the fact that. It introduces a fact that works AGAINST what follows."),
    4: ("because",
        "Students write 'although'. There is no clash here: wanting to join the orchestra is exactly WHY she kept practising.",
        "BECAUSE = for this reason. It answers the question 'why?'. She practised BECAUSE she wanted a place in the orchestra."),
    5: ("as long as",
        "Students write 'more ... than'. The word TWICE measures the length of practice time, so the blank must be a phrase that compares durations.",
        "TWICE AS LONG AS = double the time. Use AS LONG AS to compare how long two people spent on something."),
    6: ("so that",
        "Students write 'because'. Slow explaining does not happen because nobody is left behind - it happens in order to reach that result.",
        "SO THAT = in order that. It gives the PURPOSE of an action: he explains slowly SO THAT everyone can follow."),
    7: ("in case",
        "Students write 'if'. You cannot fetch the notebook after the demonstration starts - you bring it beforehand, as a precaution.",
        "IN CASE = as a precaution, because something might happen. Bring it IN CASE it is needed; IF means only when it does happen."),
    8: ("whether",
        "Students write 'if'. The structure 'not ___ ... but ...' sets two possibilities side by side.",
        "WHETHER = which of two possibilities. Use WHETHER (not 'if') after 'not ... but' and before 'or not'."),
})
S["sections"]["D"]["word_box"] = ["absorb", "applause", "beginner", "discipline", "equipment",
                                  "instructor", "mastery", "technique"]
S["sections"]["E"]["passage"] = (
    "Last term, all students in our class started learning calligraphy as part of our art module. At "
    "the start, they're (1) skills were very basic - they could barely control the thick ink brush. "
    "The students was (2) given time to practise independently while the teacher walked around and "
    "gave feedback. Their handwriting improved slow (3) but noticeably over the weeks. The teacher "
    "displayed the pupils (4) best pieces on the corridor wall for everyone to admire. By the end of "
    "term, most of us agreed that our calligraphy was gooder (5) than our regular handwriting had "
    "ever looked."
)
set_err(S["sections"]["E"], 4, "pupils", "pupils'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The best pieces BELONG TO the pupils -> PUPILS' best pieces (apostrophe after the -s for a "
        "plural). Singular: pupil's.")

# ============================== S43 ==============================
S = G["S43"]
S["sections"]["C"]["word_box"] = ["as … as", "more … than", "the most", "fewer … than",
                                  "far … than", "not as … as", "the … the", "rather than"]
S["sections"]["C"]["passage"] = (
    "The manatee is (1)________ gentle ________ any animal found in the river. River otters are "
    "(2)________ energetic ________ manatees, spending most of the day hunting and playing. Of all "
    "freshwater animals, the piranha is perhaps (3)________ feared. Despite its fearsome reputation, "
    "the piranha attacks (4)________ swimmers ________ most people imagine. The Amazon River is "
    "(5)________ larger ________ the Nile in the amount of water it carries to the sea each year. "
    "Freshwater crocodiles are (6)________ dangerous ________ saltwater crocodiles, but they are "
    "still to be respected in the wild. (7)________ deeper you go into a large river, ________ "
    "darker and colder the water becomes. Scientists prefer to study freshwater animals in their "
    "natural habitat (8)________ in the artificial conditions of a laboratory tank."
)
set_cloze(S["sections"]["C"], {
    1: ("as … as",
        "Students write 'more ... than'. Nothing in the river is gentler - the manatee's gentleness is being matched, not raised above.",
        "AS + adjective + AS = an equal comparison. The manatee is AS gentle AS any other river animal."),
    2: ("more … than",
        "Students write 'as ... as'. Otters hunt and play all day, so their level of energy is HIGHER, not equal.",
        "MORE + long adjective + THAN = a higher level. Otters are MORE ENERGETIC THAN manatees."),
    3: ("the most",
        "Students write 'more'. 'Of all freshwater animals' compares one against every other, not against a single rival.",
        "THE MOST + adjective = the top of the whole group. Of all the animals, the piranha is THE MOST feared."),
    4: ("fewer … than",
        "Students write 'more ... than'. DESPITE its fearsome reputation means the real number of attacks is LOWER than people expect, and swimmers can be counted.",
        "FEWER + countable plural + THAN = a smaller number. FEWER swimmers THAN people imagine. (Use LESS only for uncountable nouns.)"),
    5: ("far … than",
        "Students write 'more ... than'. 'Larger' is already a comparative, so it needs an intensifier, not another comparing word.",
        "FAR + comparative + THAN = much bigger by a wide margin. The Amazon is FAR LARGER THAN the Nile in the water it carries."),
    6: ("not as … as",
        "Students write 'more ... than'. The freshwater crocodile is the LESS dangerous of the two, and the sentence has no negative word yet.",
        "NOT AS + adjective + AS = a lower level than the other thing. They are NOT AS dangerous AS saltwater crocodiles."),
    7: ("the … the",
        "Students write 'as ... as'. Two changes move together here: greater depth brings greater darkness and cold.",
        "THE + comparative, THE + comparative = two things changing together. THE deeper you go, THE colder it gets."),
    8: ("rather than",
        "Students write 'more ... than'. Nothing is being measured - one option is being CHOSEN over another.",
        "RATHER THAN = instead of, in preference to. They study animals in the wild RATHER THAN in a tank."),
})
S["sections"]["D"]["word_box"] = ["aquatic", "current", "drought", "ecosystem", "erosion",
                                  "filter", "habitat", "waterfall"]
S["sections"]["E"]["passage"] = (
    "Last weekend, our class visited River Safari for a field study. The otters was (1) swimming in "
    "tight circles when we arrived, chasing each other playfully. Our guide moved quiet (2) near the "
    "river otter enclosure so that the animals would not be startled. The weather was to (3) humid "
    "for comfort, but we pushed on and enjoyed every exhibit. One otter kept using its webbed feet "
    "to splash water - the otters' (4) long, flat tail helped it steer and turn with remarkable "
    "speed. Later, near the wetlands area, we spotted a small group of deers (5) grazing at the edge "
    "of the muddy riverbank."
)

# ============================== S44 ==============================
S = G["S44"]
q = qmap(S["sections"]["A"])["S44_A3"]
q["stem"] = ("The croissant dough needs to ________ undisturbed in the fridge overnight so the "
             "layers become flaky when baked.")
q["trap_type"] = ("'Melt' and 'dissolve' destroy the dough. 'Harden' describes what the butter does, "
                  "but nothing is left UNDISTURBED in order to harden - dough is left alone to develop.")

q = qmap(S["sections"]["B"])["S44_B7"]
q["stem"] = ("The winning cake at the bakery competition ________ by a fourteen-year-old who had "
             "been baking for only two years.")

S["sections"]["D"]["word_box"] = ["apron", "aroma", "batch", "crust", "ingredient", "knead",
                                  "leavening", "spatula"]

S["sections"]["E"]["passage"] = (
    "Last Saturday, our class visited a local artisan bakery for a baking workshop. The croissants "
    "was (1) already in the oven when we arrived, filling the air with a warm buttery smell. At the "
    "long wooden table, the baker showed us a fresh lump of dough and folded it gentle (2) three "
    "times before placing it back into the bowl to rest. We stood their (3) near the large mixing "
    "counter and watched her shape a baguette. The bakers (4) clean white apron had a small "
    "embroidered logo on the pocket - the bakery's symbol. After the croissants cooled, we placed "
    "them carefully on the wooden shelfs (5) by the window for the customers to see."
)
set_err(S["sections"]["E"], 1, "was", "were",
        "Subject-verb agreement - plural subject (the croissants)",
        "'The croissants' is plural. Students match the verb to the nearest idea instead of the subject.",
        "'The croissants' = plural -> WERE already in the oven. WAS is only for singular subjects.")
set_err(S["sections"]["E"], 4, "bakers", "baker's",
        "Possessive apostrophe - singular possessive",
        "Students leave out the apostrophe, turning the owner into a plain plural. One baker owns the apron.",
        "The apron BELONGS TO one baker -> BAKER'S apron (apostrophe + s). Plural owners: bakers'.")

# ============================== S45 ==============================
S = G["S45"]
S["sections"]["C"]["passage"] = (
    "Do you know how (1)________ different festivals are celebrated in Singapore each year? During "
    "Chinese New Year, there is so (2)________ excitement in the air that even the streets seem to "
    "sparkle. My mother prepared (3)________ kueh for the neighbours, and she offered a plate to "
    "everyone who walked past our gate. I did not eat (4)________ pineapple tarts at all, because I "
    "was already full from dinner. We lit (5)________ candles - just three - and placed them on the "
    "doorstep to welcome our guests. Grandpa poured (6)________ rosewater, no more than a teaspoon, "
    "into the lamp to make the entrance smell pleasant. Our family visited (7)________ open houses "
    "on the first day of Hari Raya - five in a single afternoon - and each one offered a warm "
    "welcome. There was (8)________ laughter and singing at the Christmas party, which went on until "
    "very late."
)
set_cloze(S["sections"]["C"], {
    1: ("many",
        "Students write 'much'. FESTIVALS can be counted one by one, and 'how ___' is a fixed question form.",
        "HOW MANY + countable plural noun. Ask HOW MANY festivals, but HOW MUCH excitement."),
    2: ("much",
        "Students write 'many'. EXCITEMENT cannot be counted, and the fixed pattern 'so ___ ... that' needs a single quantity word.",
        "SO MUCH + uncountable noun: so MUCH excitement THAT the streets seem to sparkle. 'So a lot of' is never English."),
    3: ("some",
        "Students write 'any'. The sentence is POSITIVE - she really did prepare an unstated amount and handed it out.",
        "SOME = an unstated amount, used in positive statements. ANY belongs to negatives and questions."),
    4: ("any",
        "Students write 'some' or 'many'. The sentence is NEGATIVE and ends with AT ALL - not even one tart was eaten.",
        "NOT ... ANY = none at all. Use ANY in negative sentences and questions; SOME in positive ones."),
    5: ("a few",
        "Students write 'several' (four or five) or 'a little' (uncountable). The dash tells you the exact number: JUST THREE.",
        "A FEW = two or three countable things. A LITTLE is for uncountable nouns such as wax or oil."),
    6: ("a little",
        "Students write 'a few'. ROSEWATER is a liquid - you cannot count it - and the amount is NO MORE THAN A TEASPOON.",
        "A LITTLE = a small amount of an uncountable thing. A FEW is only for countable plurals."),
    7: ("several",
        "Students write 'a few', which means only two or three. The dash gives the number: FIVE in a single afternoon.",
        "SEVERAL = more than two or three, but not a huge number. SEVERAL open houses = about four or five."),
    8: ("a lot of",
        "Students write 'much'. In a positive statement 'much laughter' sounds unnatural, and LAUGHTER AND SINGING is a large amount, not a small one.",
        "A LOT OF = a large amount, natural in positive statements with countable and uncountable nouns alike."),
})
S["sections"]["D"]["word_box"] = ["customs", "decorate", "fireworks", "gratitude", "procession",
                                  "rehearsal", "souvenir", "unity"]
for it in S["sections"]["D"]["questions"]:
    if it["blank_number"] == 3:
        it["trap_type"] = ("The clue is WORSHIPPERS CARRYING OFFERINGS MOVING THROUGH THE STREETS = an "
                           "organised march, not a custom or a decoration.")

# ============================== self-check ==============================
errs = []
for sid in ("S41", "S42", "S43", "S44", "S45"):
    s = G[sid]
    for k, sec in s["sections"].items():
        if not isinstance(sec, dict):
            errs.append(f"{sid}: stray junk key in sections: {k} = {sec!r}")
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            if str(it["answer"]) not in it["options"]:
                errs.append(f"{it['question_id']}: answer {it['answer']} not in options")
                continue
            a = it["options"][str(it["answer"])].lower()
            is_tag = re.search(r",\s*_{4,}\s+\w+\?\s*$", it["stem"]) is not None
            if (not is_tag and it["question_id"] not in ALLOW_STEM_ECHO
                    and re.search(r"\b" + re.escape(a) + r"\b", it["stem"].lower())):
                errs.append(f"{it['question_id']}: the answer '{a}' is printed in its own stem")
            if len(set(v.lower() for v in it["options"].values())) != len(it["options"]):
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
        if k == "D" and len(pool) < len(qs) + 3:
            errs.append(f"{sid}/D: word_box has {len(pool)} words for {len(qs)} blanks (need 3 distractors)")
        for a in used:
            if a not in keys:
                errs.append(f"{sid}/{k}: answer '{a}' not in word_box")
        used_words = [wb[a] for a in used] if isinstance(wb, dict) else used
        for w in pool:
            if w not in used_words and (" " + w.lower()) in p.lower():
                errs.append(f"{sid}/{k}: unused distractor '{w}' appears in the passage")
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
        if re.fullmatch(r".*'s's|.*s's", str(w) or ""):
            errs.append(f"{sid}/E{it['blank_number']}: non-word form '{w}'")
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
    print("DRY OK - S41/S42/S43/S44/S45 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S41/S42/S43/S44/S45 fixes ->", SRC)
