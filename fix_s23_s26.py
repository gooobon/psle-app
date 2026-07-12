#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S23~S26 정독(精讀) 검증에서 나온 결함 수정.

S23_A2 : 'drop their rubbish in the bins provided' 도 완벽히 성립 -> 정답이 둘.
         오답 'drop' 을 'litter'(쓰레기를 버리다 = 목적어로 쓰레기를 못 받음)로 교체.
S23/C  : ★ 지문이 정답·tip 과 완전히 어긋난다. tip 은 'ON Sunday mornings / AT the gate /
         NEAR the koi pond / UNDER the tree / BETWEEN the fitness corner and the garden /
         IN the pond / BEFORE his jog / AFTER our walk' 를 설명하는데, 실제 지문은
         'meets (1)___ the park gate'(=at), 'sit (2)___ the big tree'(=under) ... 로
         자리가 전부 밀려 있고 'on' 이 두 번 필요하며 'in' 은 쓸 자리가 없다.
         -> tip 이 가리키는 원래 지문으로 복원. 정답 8개는 그대로 유지.
S23/D  : word_box 5개 = 빈칸 5개(오답 0개) -> 소거법으로 풀린다. 오답 3개 추가.
         지문 시제도 현재/과거가 뒤섞여 있어 과거 서술로 통일.
S23/E4 : 'stuck on the sliding section' -> 'sliding pole'(실재하는 놀이터 기구)로 자연스럽게.
S23/E5 : 'teachers's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(teachers)으로 교체.

S24_B1 : 'Nobody ... a creature as rare as ... this close to shore BEFORE' -> BEFORE 때문에
         현재완료(has seen)만 성립. 정답 'sees' 가 비문이 된다. 지문에서 시간부사를 제거하고
         보기 'has seen' -> 'seeing' 으로 교체해 단수주어 일치(sees)만 성립하게 함.
S24_B5 : 'There is so much we still do not know about the deep ocean' 도 완전히 자연스럽다
         -> 정답이 둘(little/much). stem 을 'we still know very ___' 로 바꿔 LITTLE 만 성립.
S24/C7 : 'The reef DOES not only shelter ... but also protect ...' 는 'does not'(부정)으로
         읽혀 혼란. 'The reef ___ not grow back quickly' 로 교체(정답 does 유지).
S24/D  : word_box 5개(오답 0개) -> 오답 3개 추가.
S24/E4 : 오류·수정(was->were)은 옳으나 error_type/tip 이 '돌고래(dolphins)' 를 말한다. 지문에
         돌고래는 없다(주어는 the deep-sea creatures). tip 교체.
S24/E5 : 'octopuses's' 비실전 -> 아포스트로피 누락형(octopuses / octopuses').

S25_B5 : 'Scientists store very much data' 는 비문(긍정문에서 very much + 명사 불가).
         'can store so ___ data ... that a whole library fits in your pocket' 으로 교체.
S25/C  : ★ 지문과 정답이 완전히 어긋남. 정답/ tip 은 '전구 발명 WHEN / 촛불 BECAUSE /
         homes, schools AND offices / 초기 컴퓨터는 컸지만 BUT / 자주 고장나서 SO /
         음악 들으며 WHILE / ALTHOUGH 기술이 편해졌지만 / 자율주행차 OR 플라잉택시' 인데
         지문은 완전히 다른 문장 8개다. 대입하면 'the light bulb, WHEN he actually made
         thousands of other inventions' 처럼 거의 전부 비문. 게다가 6번 문장
         'Inventions fail ___ they solve a problem nobody has yet' 는 그 자체로 뜻이 성립하지
         않는다. -> tip 이 가리키는 원래 지문으로 복원. 정답 8개 유지.
S25/D  : ★ 정답이 빈칸에 대해 한 칸씩 밀려 있다(shuffled). 지문은 1=efficient, 2=gadget,
         3=innovative, 4=patent, 5=wireless 를 요구하는데 정답은 gadget/patent/innovative/
         wireless/efficient -> 'designed to be more GADGET', 'register a WIRELESS' 등 비문.
         정답을 지문 순서대로 재배정하고 trap/tip 을 그 자리 단서에 맞춰 다시 씀.
         word_box 5개(오답 0개) -> 오답 3개 추가.
S25/E1 : 'computeres' 는 유지(-es 과잉적용은 실제 학생 오류). 다만 tip 이 "Not all words ending
         in -e take -es"(computer 는 -e 로 끝나지도 않는다) 로 앞뒤가 안 맞아 교체.
S25/E5 : 'inventors's' 비실전 -> 아포스트로피 누락형(inventors / inventors').

S26_A1 : 'as ROUND as tiny pearls' 도 완벽히 성립(비눗방울도 진주도 둥글다) -> 정답이 둘.
         오답 'round' 를 'rough' 로 교체.
S26_A2 : 'to DRY their hands thoroughly before every meal' 도 성립 -> 'with soap and water' 를
         넣어 WASH 만 성립하게 함.
S26/C  : ★ 지문과 정답이 어긋남. '(1)___ morning'(=Every/Each, box 에 없음), 'Is there (4)___
         better than a glass of water'(=anything), 'If (7)NONE of your friends offers you junk
         food, it is fine to say no', '(8)THAT of the healthy choices ... adds up' 등 대입하면
         비문·무의미. tip 이 가리키는 원래 지문으로 복원. 정답 8개 유지.
S26/D  : ★ 정답이 빈칸과 어긋남(shuffled). 지문은 1=balanced, 2=cavity, 3=hydrated, 4=posture,
         5=vigorous 인데 정답은 posture/balanced/cavity/hydrated/vigorous -> 'a POSTURE diet',
         'sugar causes BALANCED', 'Staying CAVITY' 등 4개가 비문. 재배정 + 오답 3개 추가.
         'sugar causes (2)___ - holes in teeth' 는 복수형을 요구하므로 단수 단서로 문장 수정.
S26/E4 : 'the class WERE given' -> 영국식으로 허용되는 형태라 오류로 단정할 수 없다(애매).
         주어를 명백한 복수(the pupils in our class)로 바꿔 was->were 를 확정적 오류로 만든다.
         ★ 이때 첫 문장의 'was'(a great success) 가 지문에서 먼저 등장해 밑줄이 엉뚱한 곳에
         찍히므로(indexOf) 첫 문장을 'turned out to be' 로 고쳐 'was' 의 첫 등장을 밑줄 자리로 만든다.
S26/E5 : 'nurses's' 비실전 -> 'the two school nurses (5) report' + 정답 nurses'.
S26_F2 : sentence_b 가 빈 문자열 -> 화면에 두 번째 문장이 비어 나온다. 두 문장 결합형으로 재구성
         (model_answer 는 그대로).

모든 세트 공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이
반드시 밑줄 자리여야 한다. 아래 self-check 가 이를 강제한다.
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
    hit = False
    for it in e_items(sec):
        if it.get("blank_number") == blank:
            it["error_word" if "error_word" in it else "wrong_word"] = wrong
            it["correction"] = corr
            it["error_type"] = etype
            it["trap_type"] = trap
            it["learning_tip"] = tip
            hit = True
    if not hit:
        raise SystemExit("set_err: blank %s not found" % blank)

def set_cloze(sec, m):
    """m = {blank: (answer, trap, tip)}"""
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in m:
            it["answer"], it["trap_type"], it["learning_tip"] = m[b]

# ============================== S23 ==============================
S = G["S23"]
qa = qmap(S["sections"]["A"])
q = qa["S23_A2"]
q["options"]["3"] = "litter"
q["trap_type"] = ("'Scatter' = spread things carelessly; 'display' = show publicly; 'litter' cannot "
                  "take rubbish as its object (you litter a PLACE, not your rubbish). Only 'dispose "
                  "of' = throw away properly.")

# --- C : 지문을 tip 이 가리키는 원래 지문으로 복원 (정답 on/at/near/under/between/in/before/after 유지)
S["sections"]["C"]["passage"] = (
    "Our family visits the community park (1)________ Sunday mornings. We always meet Grandpa "
    "(2)________ the main gate, because it is the easiest place to find. His favourite bench "
    "stands (3)________ the koi pond, just a few steps away from the water. When the sun becomes "
    "too hot, we rest (4)________ the big rain tree and share our sandwiches. The new playground "
    "stands (5)________ the fitness corner and the community garden, so we can see both from the "
    "swings. My little sister loves watching the ducks paddle (6)________ the pond, dipping their "
    "heads below the surface. Father always stretches (7)________ his morning jog to warm up his "
    "legs. We buy a cold barley drink from the stall (8)________ our long walk home."
)

# --- D : 오답 3개 추가 + 시제 통일 (정답 5개 유지)
S["sections"]["D"]["word_box"] = ["climbed", "crowded", "lush", "meandered", "muddy",
                                  "obstacle", "refreshing", "strolled"]
S["sections"]["D"]["passage"] = (
    "Bishan-Ang Mo Kio Park is one of the most beautiful parks in Singapore. When my family "
    "visited it last weekend, a winding river (1)________ through the park, creating a natural "
    "path for us to follow. The park was filled with (2)________ green grass and tall trees that "
    "gave us shade on that hot afternoon. Families (3)________ along the riverbank, stopping every "
    "now and then to watch dragonflies and ducks. The cool breeze from the river felt "
    "(4)________ after a long week of school and work. For younger children, there was also an "
    "(5)________ course with climbing nets, balance beams and stepping stones that challenged them "
    "to move in different ways."
)

# --- E
S["sections"]["E"]["passage"] = (
    "Last Sunday, our class visited the community park for a nature observation project. Hana ran "
    "quick (1) ahead to claim a spot near the pond. At the pond, she noticed the ducks splashing in "
    "there (2) favourite corner near the reeds. A pair of gooses (3) waddled along the bank, drawing "
    "everyone's attention. As the group moved towards the climbing frame, my friend Amir got stuck "
    "halfway up the slideing (4) pole. The teachers (5) feedback forms were collected and shared "
    "with the class the next morning."
)
set_err(S["sections"]["E"], 5, "teachers", "teachers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The feedback forms BELONG TO the teachers -> TEACHERS' feedback forms (apostrophe after "
        "the -s for a plural owner). Singular: teacher's.")

# ============================== S24 ==============================
S = G["S24"]
q = qmap(S["sections"]["B"])["S24_B1"]
q["stem"] = ("Nobody in the diving team ________ the blue-ringed octopus without feeling a shiver - "
             "its venom is deadly enough to kill a person.")
q["options"]["3"] = "seeing"
q["trap_type"] = ("Students write 'see'. NOBODY = singular -> verb + S. 'Seeing' and 'are seeing' "
                  "have no place after a singular subject in a simple present statement.")
q["learning_tip"] = ("NOBODY / EVERYONE / SOMEONE = Singular! Nobody SEES = add -S. 'Nobody see' is "
                     "WRONG. Singular indefinite pronouns always take singular present-tense verbs.")

q = qmap(S["sections"]["B"])["S24_B5"]
q["stem"] = ("Scientists have explored less than twenty percent of the deep ocean, so we still know "
             "very ________ about the creatures that live down there.")
q["trap_type"] = ("'Many' and 'few' are for countable nouns. 'Very much' cannot be used like this in "
                  "a positive statement. LITTLE = not much (uncountable).")
q["learning_tip"] = ("Know very LITTLE = know almost nothing. LITTLE / MUCH go with uncountable "
                     "ideas; FEW / MANY go with countable things you can number.")

# --- C7 : 'DOES not only shelter ... but also protect' 는 'does not' 로 읽혀 혼란 -> 명료한 DOES 문장
S["sections"]["C"]["passage"] = S["sections"]["C"]["passage"].replace(
    "The reef (7)________ not only shelter sea creatures but also protect coastlines from strong waves.",
    "The reef (7)________ not grow back quickly after bleaching, so every visitor must treat it with care.")
set_cloze(S["sections"]["C"], {7: ("does",
    "Students write 'do' (plural) or reach for a be verb. 'The reef' is singular, and a negative in "
    "the simple present needs the DO-family auxiliary.",
    "Simple present negative: singular subject -> DOES not + base verb. 'The reef DOES not grow "
    "back quickly.' Plural subject -> DO not.")})

# --- D : 오답 3개 추가 (정답 5개 유지)
S["sections"]["D"]["word_box"] = ["camouflage", "current", "fins", "gills", "predator",
                                  "scales", "surface", "venom"]

# --- E4 tip 이 존재하지 않는 '돌고래' 를 말한다 / E5 비실전 형태
set_err(S["sections"]["E"], 4, "was", "were",
        "Subject-verb agreement - plural subject (the deep-sea creatures)",
        "Students match the verb to 'gallery', the noun nearest to the blank, instead of to the "
        "real subject 'the deep-sea creatures'.",
        "The subject is THE DEEP-SEA CREATURES = plural -> WERE the strangest of all. WAS is only "
        "for a singular subject. Find the head noun, not the nearest noun.")
S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the octopuses's (5) enclosure", "the octopuses (5) enclosure")
set_err(S["sections"]["E"], 5, "octopuses", "octopuses'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The enclosure BELONGS TO the octopuses -> OCTOPUSES' enclosure (apostrophe after the -s "
        "for a plural owner). Singular: octopus's.")

# ============================== S25 ==============================
S = G["S25"]
q = qmap(S["sections"]["B"])["S25_B5"]
q["stem"] = ("Scientists can store so ________ data on a single microchip today that a whole library "
             "of books fits inside your pocket.")
q["trap_type"] = ("'Data' is uncountable, so 'many', 'few' and 'a few' are impossible. Students "
                  "count the books instead of measuring the data.")
q["learning_tip"] = ("MUCH = a large amount, for uncountable nouns (data, water, information). "
                     "MANY / A FEW / FEW = for things you can count one by one.")

# --- C : 지문을 tip 이 가리키는 원래 지문으로 복원 (정답 when/because/and/but/so/while/although/or 유지)
S["sections"]["C"]["passage"] = (
    "Thomas Edison was already a famous inventor (1)________ he switched on his first electric "
    "light bulb in 1879. Before that evening, most families lit their homes with candles "
    "(2)________ they had no other way of seeing after dark. Today, electric lamps brighten our "
    "homes, our schools (3)________ our offices. Machines have changed just as much: the earliest "
    "computers were as big as a whole room, (4)________ the one in my father's pocket is far more "
    "powerful. Those early machines broke down almost every week, (5)________ engineers worked long "
    "hours to make them more reliable. Nowadays, we can listen to music (6)________ we jog around "
    "the park, thanks to tiny earphones. (7)________ technology has made our lives much easier, it "
    "has also created new problems, such as too much screen time. Perhaps the next great invention "
    "will be either a self-driving car (8)________ a flying taxi."
)
set_cloze(S["sections"]["C"], {1: ("when",
    "Students write 'because'. Edison being famous was not caused by the light bulb - the blank "
    "marks the POINT IN TIME at which he switched it on.",
    "WHEN = at the time that something happened. He was already famous WHEN he switched on the "
    "bulb = the two facts share the same moment.")})

# --- D : ★ 정답이 빈칸과 어긋나 있다 -> 지문 순서대로 재배정 + 오답 3개 추가
S["sections"]["D"]["word_box"] = ["circuit", "efficient", "gadget", "innovative", "manual",
                                  "obsolete", "patent", "wireless"]
set_cloze(S["sections"]["D"], {
    1: ("efficient",
        "The blank follows 'more' and comes before a dash, so it must be a describing word. "
        "Students pick a noun such as 'gadget'.",
        "EFFICIENT = doing a job well without wasting time or energy. A device that does more work "
        "in less time is more EFFICIENT."),
    2: ("gadget",
        "The clue is 'any small electronic device ... from a smartwatch to a pocket calculator'. "
        "The blank follows 'A', so it names a thing.",
        "A GADGET = a small, clever electronic device or tool that does one particular job. A "
        "smartwatch is a GADGET."),
    3: ("innovative",
        "The clue is 'solve problems in completely new ways'. The blank follows 'The most', so it "
        "must be an adjective.",
        "INNOVATIVE = new, original and creative. An INNOVATIVE invention solves a problem in a way "
        "nobody has tried before."),
    4: ("patent",
        "The clue is 'to protect their idea by law' before selling an invention. The blank follows "
        "'register a', so it names a document.",
        "A PATENT = an official document giving an inventor the legal right to an invention. Others "
        "may not copy it without permission."),
    5: ("wireless",
        "The clue is 'sending data through the air without any cables or wires'. The blank "
        "describes 'technology'.",
        "WIRELESS = sending or receiving information without cables. Wi-Fi and Bluetooth are "
        "WIRELESS technologies.")})

# --- E1 tip 이 앞뒤가 안 맞는다 / E5 비실전 형태
set_err(S["sections"]["E"], 1, "computeres", "computers",
        "Spelling - plural: add -s, not -es",
        "Students over-apply the -es rule and write 'computeres'.",
        "Add -ES only after s, x, z, ch or sh (buses, boxes, watches, brushes). 'Computer' ends in "
        "-r, so it simply takes -S: COMPUTERS.")
S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the inventors's (5) names", "the inventors (5) names")
set_err(S["sections"]["E"], 5, "inventors", "inventors'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The names BELONG TO the inventors -> INVENTORS' names (apostrophe after the -s for a "
        "plural owner). Singular: inventor's.")

# ============================== S26 ==============================
S = G["S26"]
qa = qmap(S["sections"]["A"])
q = qa["S26_A1"]
q["options"]["2"] = "rough"
q["trap_type"] = ("'Heavy', 'rough' and 'sharp' are the opposite of what a pearl is like. The bubbles "
                  "and the pearls share their COLOUR - both catch the light with a milky shine.")
q = qa["S26_A2"]
q["stem"] = ("Father reminded the children to ________ their hands with soap and water before every "
             "meal.")
q["trap_type"] = ("'Dry' comes only after the soap and water; 'hide' means to conceal; 'lotion' is "
                  "not a verb. Only one word means to clean with soap and water.")

# --- C : 지문을 tip 이 가리키는 원래 지문으로 복원 (정답 these/all/some/any/this/those/none/that 유지)
S["sections"]["C"]["passage"] = (
    "The school nurse taught our class five simple health rules, and (1)________ rules are easy to "
    "follow. First, (2)________ of us should wash our hands with soap before we eat, without a "
    "single exception. Next, we should eat (3)________ fruits and vegetables at every meal. We "
    "should try not to eat (4)________ junk food after dinner. Brushing our teeth twice a day is "
    "another rule, and (5)________ habit protects us from cavities. In her experience, (6)________ "
    "who exercise regularly fall sick less often than children who never do. Among our bad habits, "
    "(7)________ is harder to break than staying up late. Before she left, the nurse said "
    "(8)________ keeping the five rules requires effort, which is well worth it."
)

# --- D : ★ 정답이 빈칸과 어긋나 있다 -> 지문 순서대로 재배정 + 오답 3개 추가
S["sections"]["D"]["word_box"] = ["balanced", "cavity", "hydrated", "immunity", "nutrients",
                                  "posture", "sluggish", "vigorous"]
S["sections"]["D"]["passage"] = (
    "Looking after our bodies requires daily care. We must maintain a (1)________ diet - eating a "
    "variety of foods from different food groups instead of only one. Dentists remind us that too "
    "much sugar causes a painful (2)________ - a hole in a tooth that forms when bacteria break "
    "down leftover food. Staying (3)________ means drinking enough water throughout the day, "
    "especially after sports. Good (4)________ - sitting and standing up straight - protects the "
    "spine and prevents back pain. At least thirty minutes of (5)________ exercise each day, such "
    "as running or skipping, keeps the heart strong and the lungs healthy."
)
set_cloze(S["sections"]["D"], {
    1: ("balanced",
        "The clue is 'a variety of foods from different food groups instead of only one'. The blank "
        "describes the diet.",
        "A BALANCED diet = one with all the different kinds of food in the right amounts: proteins, "
        "carbohydrates, fats, vitamins and minerals."),
    2: ("cavity",
        "The clue is 'a hole in a tooth ... when bacteria break down leftover food'. The blank "
        "follows 'a painful', so it names a single thing.",
        "A CAVITY = a hole in a tooth caused by decay. Sugar feeds bacteria, which produce acid that "
        "eats through the enamel."),
    3: ("hydrated",
        "The clue is 'drinking enough water throughout the day'. The blank follows 'Staying', so it "
        "must be a describing word, not a noun.",
        "HYDRATED = having enough water in your body to work well. Stay HYDRATED, especially when "
        "you sweat during sports."),
    4: ("posture",
        "The clue is 'sitting and standing up straight' and 'protects the spine'. The blank follows "
        "'Good', so it names a thing.",
        "POSTURE = the way you hold your body when you sit or stand. Good POSTURE keeps the spine "
        "straight and prevents back pain."),
    5: ("vigorous",
        "The clue is 'running or skipping' and 'keeps the heart strong'. The blank describes the "
        "exercise, so it must be an adjective.",
        "VIGOROUS = needing a lot of energy and physical effort. VIGOROUS exercise makes your heart "
        "beat faster and your lungs work harder.")})

# --- E : 'the class were' 는 영국식 허용 -> 명백한 복수 주어로 교체. 첫 문장의 'was' 도 제거해야
#         밑줄(indexOf)이 4번 자리에 찍힌다. E5 비실전 형태 교체.
S["sections"]["E"]["passage"] = (
    "Our school health week last term turned out to be a great success. The childs (1) in every "
    "class took part in activities about staying fit and healthy. The teacher told the pupils that "
    "these habits are good for there (2) wellbeing throughout life. Then we went outside and "
    "practised runing (3) and skipping for thirty minutes without stopping. After the activities, "
    "the pupils in our class was (4) given a short talk on healthy eating and good hygiene. At the "
    "end of the week, the two school nurses (5) report showed that almost everyone had improved "
    "their understanding of good health."
)
set_err(S["sections"]["E"], 4, "was", "were",
        "Subject-verb agreement - plural subject (the pupils)",
        "Students match the verb to 'class', the noun nearest to the blank, instead of to the real "
        "subject 'the pupils'.",
        "The subject is THE PUPILS = plural -> WERE given a talk. WAS is only for a singular "
        "subject. Find the head noun, not the nearest noun.")
set_err(S["sections"]["E"], 5, "nurses", "nurses'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The report BELONGS TO the two nurses -> NURSES' report (apostrophe after the -s for a "
        "plural owner). Singular: nurse's.")

# --- F2 : sentence_b 가 비어 있어 화면에 두 번째 문장이 나오지 않는다 -> 결합형으로 재구성
q = qmap(S["sections"]["F"])["S26_F2"]
q["sentence_a"] = "Lena likes fresh fruit."
q["sentence_b"] = "Lena does not like sugary snacks."
q["instruction"] = "Rewrite as one sentence using 'would rather ... than'. Begin: 'Lena would rather...'"

# ============================== self-check ==============================
errs = []
for sid in ("S23", "S24", "S25", "S26"):
    s = G[sid]
    for k, sec in s["sections"].items():
        if not isinstance(sec, dict):
            errs.append(f"{sid}: junk key '{k}' in sections = {sec!r}")
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            if str(it["answer"]) not in it["options"]:
                errs.append(f"{it['question_id']}: answer {it['answer']} not in options")
                continue
            opts = [v.lower() for v in it["options"].values()]
            if len(set(opts)) != len(opts):
                errs.append(f"{it['question_id']}: duplicate options {opts}")
            a = it["options"][str(it["answer"])].lower()
            if re.search(r"\b" + re.escape(a) + r"\b", it["stem"].lower()):
                errs.append(f"{it['question_id']}: the answer '{a}' is printed in its own stem")
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
        if len(keys) != 8:
            errs.append(f"{sid}/{k}: word_box has {len(keys)} words (8 expected)")
        for a in used:
            if a not in keys:
                errs.append(f"{sid}/{k}: answer '{a}' not in word_box")
        used_words = [wb[a] for a in used] if isinstance(wb, dict) else used
        for w in pool:
            if w not in used_words and re.search(r"\b" + re.escape(w.lower()) + r"\b", p.lower()):
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
    print("DRY OK - S23/S24/S25/S26 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S23/S24/S25/S26 fixes ->", SRC)
