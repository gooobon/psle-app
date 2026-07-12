#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S11~S14 정독(精讀) 검증에서 나온 결함 수정.

S11/D  : ★ 지문이 통째로 다른 문제 것. box(departure/delayed/boarding/turbulence/destination)와
         learning_tip 은 '공항·비행기' 이야기인데 지문은 '통근자·터널·출입국 검사·예절'을 요구한다.
         정답 대입 시 'A DEPARTURE is someone who travels between home and work', 'pass through a
         BOARDING', 'an TURBULENCE is an official entry point' 처럼 5개 전부 비문. 지문 재작성.
         또 보기가 5개뿐(오답 0개) -> 소거법으로 다 맞힌다. 오답 3개(arrival/cancelled/landing) 추가.
S11/E3 : 'The ride was smooth' 은 애초에 틀리지 않았다(be동사 뒤 형용사). 'smoothly'로 고치면 오히려
         비문이 된다. learning_tip 도 저작 중 혼잣말("The ride was SMOOTHLY? No - actually...")이
         그대로 남아 있었다. -> 'the bus moved smooth' 로 문장을 바꿔 부사 자리를 진짜로 만든다.
S11/E4 : 'the bus spot a landslide' -> 버스가 산사태를 '발견'할 수는 없다. 주어를 driver 로.
S11/E5 : 'drivers's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(drivers)으로 교체.

S12/C8 : 우는 아이는 한 명("comforted HIM")인데 정답이 'them' -> 'distracted them with a song' 비문.
         box 에 'him' 이 없으므로 지문을 고쳐 blank8 의 목적어를 복수(=아이들 전체)로 만든다.
         blank4 'while OUR parents' 앞이 'All the children'(3인칭)이라 인칭이 엇갈리던 것도 정리.
S12/D  : 정답은 전부 옳으나 보기 5개(오답 0개) -> 오답 3개(ancestors/celebrations/grateful) 추가.
S12/E3 : 'we arived speechless at the entrance' -> 철자를 고쳐도 뜻이 성립하지 않는다. 문장 재작성.
S12/E4 : ★ 오류어 'was' 의 첫 등장이 밑줄 자리가 아니다. 지문 앞쪽 'The house WAS so beautifully
         decorated' 가 먼저 잡혀 렌더러가 엉뚱한 곳에 밑줄을 친다. blank4 앞에서 was/were 를 모두 제거.
S12/E5 : ★ 'guests's'(비실전) + 'twenty GUESTS from our block' 이 앞에 있어 첫 등장 충돌.
         앞 문장을 'twenty neighbours' 로 바꾸고 오류어를 'guests'(아포스트로피 누락형)로 교체.

S13/D  : ★ 지문이 통째로 다른 문제 것. box(volunteered/selfless/grateful/impact/appreciated)와 tip 은
         '학생들이 양로원에서 봉사했다' 이야기인데 지문은 '친절/공동체/공감'을 요구한다.
         'A VOLUNTEERED act', 'People who SELFLESS others', 'a sense of GRATEFUL', 'show IMPACT',
         'a small APPRECIATED' -> 5개 전부 비문. 지문 재작성 + 오답 3개 추가.
S13/E2 : 'organize' 는 미국식 원형 철자라 시제 오류인지 철자 오류인지 흐려진다. 또 첫 문장의
         'our school ORGANISED a charity drive' 때문에 'organise' 의 첫 등장이 밑줄 자리가 아니다.
         첫 문장을 'held' 로 바꾸고 오류어를 'organise'(원형)로 교체.
S13/E5 : 'organiser's's'(비실전) -> 아포스트로피 누락형 'organisers'.

S14/B5 : 'The library was very quiet ___ many children were reading silently' 는 BECAUSE 도 완벽히
         성립한다(정답이 둘). 문장을 'The library was still very quiet ___ we arrived at eight
         o'clock this morning' 으로 바꿔 WHEN 만 성립하게 함.
S14/D  : ★ 지문이 통째로 다른 문제 것. box(exhibited/creative/masterpiece/sketched/inspired)와 tip 은
         '지역 화가의 그림 전시' 이야기인데 지문은 '취미의 장점'(창의적/신체적/재능/스트레스/열정)을
         요구한다. 'enjoy EXHIBITED activities', 'prefer CREATIVE ones like cycling', 'become a
         MASTERPIECE', 'reduce SKETCHED' -> 5개 전부 비문. 지문 재작성 + 오답 3개 추가.
S14/E1 : ★ 오류어 'here' 의 첫 등장이 밑줄 자리가 아니다. 첫 문장 'a hobby fair WHERE students...'
         의 'where' 안에 here 가 먼저 잡힌다. 'so that' 으로 교체.
S14/E5 : ★ 'students's'(비실전) + 첫 문장의 'STUDENTS could share' 때문에 첫 등장 충돌.
         첫 문장을 'everyone' 으로 바꾸고 오류어를 'students'(아포스트로피 누락형)로 교체.
S14/E2 : learning_tip 이 저작 중 혼잣말("...but IN has two letters - actually, N is already there")
         로 망가져 있었다. 교체.

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

# ============================== S11 ==============================
S = G["S11"]

# --- D : 지문 복원(공항 이야기) + 오답 3개 ---
S["sections"]["D"]["word_box"] = ["arrival", "boarding", "cancelled", "delayed", "departure",
                                  "destination", "landing", "turbulence"]
S["sections"]["D"]["passage"] = (
    "Our family flight to Tokyo did not begin smoothly. We reached the airport a full two hours "
    "before (1)________, only to find that our plane had been (2)________ by another three hours "
    "because of a thunderstorm. We waited near the gate until the (3)________ announcement finally "
    "called us to walk onto the plane. Once we were in the air, sudden (4)________ made the plane "
    "shake so badly that the crew asked everyone to fasten their seatbelts. Even so, we reached our "
    "(5)________ safely and stepped out into the busy streets of Tokyo."
)
set_cloze(S["sections"]["D"], {
    1: ("departure",
        "Students pick 'arrival'. The clue is TWO HOURS BEFORE - the family is still waiting to leave.",
        "DEPARTURE = the act of leaving / the scheduled time a flight leaves. We arrived two hours "
        "before DEPARTURE = before the flight was due to leave."),
    2: ("delayed",
        "Students pick 'cancelled'. The plane still flies - it simply leaves three hours LATER than "
        "planned.",
        "DELAYED = made to happen later than planned. A delayed flight = one that leaves later than "
        "its scheduled time."),
    3: ("boarding",
        "Students pick 'departure' (already used). The announcement is the call to walk ONTO the plane.",
        "BOARDING = getting onto a plane or ship. A BOARDING announcement tells you it is time to go "
        "to the gate and get on."),
    4: ("turbulence",
        "Students pick 'landing'. The clue 'made the plane SHAKE' while it was still IN THE AIR "
        "defines the word directly.",
        "TURBULENCE = rough air movements that cause a plane to shake and bump. Pilots ask passengers "
        "to fasten seatbelts during TURBULENCE."),
    5: ("destination",
        "Students pick 'arrival'. The blank names the PLACE reached, not the act of reaching it.",
        "A DESTINATION = the place you are travelling to. When we finally arrived at our DESTINATION "
        "= we reached Tokyo."),
})

# --- E : 지문 재작성 ---
S["sections"]["E"]["passage"] = (
    "Last month, our family took a long-distance bus trip to visit our relatives in the north. We "
    "could here (1) the sound of rain pattering against the windows as we left the city. The driver "
    "taked (2) a short rest at a service station halfway through the journey. After that, the bus "
    "moved smooth (3) along the empty highway and most passengers fell asleep. Suddenly, our driver "
    "spot (4) a landslide on the road ahead and had to take a detour. When we finally arrived, the "
    "drivers (5) report was checked by the transport supervisor before we disembarked."
)
set_err(S["sections"]["E"], 3, "smooth", "smoothly",
        "Adverb required after an action verb (moved)",
        "Students leave the adjective 'smooth' after the action verb 'moved'. An action needs an adverb.",
        "After an ACTION verb, describe the action with an ADVERB: the bus moved SMOOTHLY. "
        "'Smooth' describes a noun (a smooth road); 'smoothly' describes how something moves.")
set_err(S["sections"]["E"], 4, "spot", "spotted",
        "Simple past - regular verb (spot -> spotted)",
        "'spot' is the base form. The whole story is in the past, so the -ed ending is needed.",
        "SPOT -> SPOTTED (double the final -t before -ed: short vowel + single consonant). "
        "'Our driver spot a landslide' = WRONG. Use SPOTTED.")
set_err(S["sections"]["E"], 5, "drivers", "drivers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The report BELONGS TO the drivers -> DRIVERS' report (apostrophe after the -s for a plural). "
        "Singular: driver's.")

# ============================== S12 ==============================
S = G["S12"]

# --- C : blank8 목적어를 복수로, blank4 인칭 정리 ---
S["sections"]["C"]["passage"] = (
    "Last Deepavali, (1)________ celebrated with both sides of my family. My uncle's wife came early "
    "to help decorate. (2)________ brought a huge tray of murukku for everyone. (3)________ husband "
    "spent the morning drawing kolam at the front door. My cousins and I gathered in the living room "
    "while (4)________ parents prepared the feast in the kitchen. Uncle carried out the final dish and "
    "(5)________ placed it at the centre of the table. All the children were delighted - (6)________ "
    "clapped and cheered loudly. My little cousin started crying when the drums grew too loud, but "
    "(7)________ mother quickly comforted him with a sweet. Later, Grandmother entertained "
    "(8)________ with a song."
)
set_cloze(S["sections"]["C"], {
    6: ("they",
        "Students write 'them' (object form) instead of 'they' (subject form).",
        "The children = plural = THEY clapped and cheered. THEY is the subject pronoun for a group. "
        "'Them clapped' is wrong."),
    8: ("them",
        "Students write 'they' (subject form) instead of 'them' (object form after a verb).",
        "After the verb 'entertained', use the OBJECT pronoun: entertained THEM (all the children). "
        "'Entertained they' is wrong."),
})

# --- D : 오답 3개 추가 (정답·지문은 옳다) ---
S["sections"]["D"]["word_box"] = ["ancestors", "celebrations", "customs", "generous", "generously",
                                  "lively", "reunited", "traditions"]
for it in S["sections"]["D"]["questions"]:
    if it["blank_number"] == 4:
        it["trap_type"] = ("Students pick 'generously' (an adverb). After 'are', the blank needs an "
                           "ADJECTIVE. The clue 'they BRING food, gifts and red packets' = giving freely.")

# --- E : 지문 재작성 (was 의 첫 등장 충돌 / guests 첫 등장 충돌 / arived 문장 무의미) ---
S["sections"]["E"]["passage"] = (
    "Last year, our family celebrated Deepavali with our neighbours for the first time. We could here "
    "(1) the sound of music and laughter coming from Mrs Kumar's flat before we even reached her door. "
    "When we stepped inside, we found that she had inivted (2) twenty neighbours from our block. Every "
    "corner of the living room had been decorated with tiny oil lamps, and we all arived (3) in our "
    "brightest clothes. The children was (4) given sweets and sparklers before the fireworks began on "
    "the rooftop. At the end of the evening, all of the guests (5) shoes were neatly lined up outside "
    "the front door."
)
set_err(S["sections"]["E"], 3, "arived", "arrived",
        "Spelling - arrived (double r)",
        "Students write 'arived' with one -r. The double -r belongs to the base word ARRIVE.",
        "ARRIVE -> ARRIVED. Keep the DOUBLE R of the base word: a-r-r-i-v-e-d. 'Arived' is never correct.")
set_err(S["sections"]["E"], 5, "guests", "guests'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The shoes BELONG TO the guests -> GUESTS' shoes (apostrophe after the -s for a plural). "
        "Singular: guest's.")

# ============================== S13 ==============================
S = G["S13"]

# --- D : 지문 복원(양로원 봉사) + 오답 3개 ---
S["sections"]["D"]["word_box"] = ["appreciated", "donated", "grateful", "impact", "kindness",
                                  "selfless", "sympathy", "volunteered"]
S["sections"]["D"]["passage"] = (
    "Last term, a group of students from our school (1)________ to spend every Saturday at the old "
    "folks' home. Giving up their weekend to feed the residents and chat with them was a truly "
    "(2)________ act, for they were paid nothing at all. The nurses were extremely (3)________ and "
    "told us that they could never have coped on their own. Our teacher explained that even a few "
    "hours of company can have a huge (4)________ on someone who lives alone. On the last day, the "
    "residents made cards to show that every single visit had been deeply (5)________."
)
set_cloze(S["sections"]["D"], {
    1: ("volunteered",
        "Students pick 'donated', which is about giving money or goods. The students gave their TIME, "
        "freely and unpaid.",
        "VOLUNTEERED = freely offered to do something to help, without being paid or asked. "
        "Students VOLUNTEERED their time."),
    2: ("selfless",
        "Students pick the noun 'kindness'. The blank sits before 'act', so it must be an ADJECTIVE. "
        "The clue: they were PAID NOTHING and gave up their own weekend.",
        "SELFLESS = thinking about others before yourself. Giving up your Saturday to help others for "
        "free = a SELFLESS act."),
    3: ("grateful",
        "Students pick 'appreciated'. The NURSES are the ones doing the feeling here, so the blank "
        "describes them, not the work.",
        "GRATEFUL = feeling thankful for something. The nurses are GRATEFUL = they feel thankful for "
        "the students' help."),
    4: ("impact",
        "Students pick 'sympathy'. The blank follows 'a huge', so it must be a noun naming the EFFECT "
        "the visits have.",
        "IMPACT = a strong effect on something or someone. Making a big IMPACT = having a significant "
        "positive effect on people's lives."),
    5: ("appreciated",
        "Students pick 'grateful' (already used). The blank describes how the VISITS were received, "
        "not how a person feels.",
        "APPRECIATED = recognised as valuable and good. Every visit was APPRECIATED = the residents "
        "saw it as important and were thankful for it."),
})

# --- E : 지문 재작성 (organise 첫 등장 충돌 / organiser's's 비실전) ---
S["sections"]["E"]["passage"] = (
    "Last Saturday, our school held a charity drive to help the elderly residents in our neighbourhood. "
    "We could here (1) the excitement in the school hall as students registered for their volunteer "
    "roles. One student organise (2) all the collection boxes and labels before the event began. Some "
    "volunteers brings (3) homemade cookies and snacks to share during the lunch break. The tables was "
    "(4) arranged in a circle so everyone could see and speak to each other easily. At the end, the "
    "organisers (5) sign-off sheet was checked before the items were sent to the charity home."
)
set_err(S["sections"]["E"], 2, "organise", "organised",
        "Simple past - regular verb (organise -> organised)",
        "'organise' is the base form. Everything around it (began, brought) is past.",
        "In a past-tense story, the verb must be past too: ORGANISE -> ORGANISED (add -d after the "
        "silent -e). 'One student organise all the boxes' = WRONG.")
set_err(S["sections"]["E"], 5, "organisers", "organisers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The sheet BELONGS TO the organisers -> ORGANISERS' sign-off sheet (apostrophe after the -s "
        "for a plural). Singular: organiser's.")

# ============================== S14 ==============================
S = G["S14"]

# --- B5 : because 도 성립 -> when 만 성립하도록 문장 교체 ---
q = qmap(S["sections"]["B"])["S14_B5"]
q["stem"] = ("The library was still very quiet ________ we arrived at eight o'clock this morning, "
             "long before the first reader appeared.")
q["trap_type"] = ("'Because' would make our arrival the REASON for the silence, which makes no sense. "
                  "'So' and 'but' do not link two things happening at the same moment.")
q["learning_tip"] = ("WHEN links two things that happen at the SAME MOMENT: it was still quiet WHEN we "
                     "arrived. 'Because' gives a reason, 'so' gives a result, 'but' gives a contrast.")

# --- D : 지문 복원(지역 화가 전시) + 오답 3개 ---
S["sections"]["D"]["word_box"] = ["creative", "exhibited", "gallery", "imagination", "inspired",
                                  "masterpiece", "portrait", "sketched"]
S["sections"]["D"]["passage"] = (
    "Last month, our art teacher (1)________ the paintings of a local artist in the school hall for "
    "everyone to see. His work was so (2)________ that no two paintings looked the same. Visitors "
    "stood longest in front of his (3)________ - a huge canvas of the river at sunrise that had taken "
    "him two whole years to finish. He told us that he had first (4)________ that scene in pencil in a "
    "small notebook while he sat on the riverbank. The river reminded him of his happiest childhood "
    "memories, and that was what had (5)________ him to paint it."
)
set_cloze(S["sections"]["D"], {
    1: ("exhibited",
        "Students pick the noun 'gallery', which is a PLACE, not an action. The blank needs a past "
        "VERB meaning to show artworks publicly.",
        "EXHIBITED = displayed artworks publicly for others to view. Artists EXHIBIT their work in "
        "galleries or halls."),
    2: ("creative",
        "Students pick the noun 'imagination'. After 'so' the blank needs an ADJECTIVE. The clue is "
        "that NO TWO PAINTINGS looked the same - fresh, original ideas every time.",
        "CREATIVE = able to come up with original, imaginative ideas. Making paintings that are all "
        "different = being CREATIVE."),
    3: ("masterpiece",
        "Students pick 'portrait', but the canvas shows a RIVER, not a person. The blank names his "
        "greatest work.",
        "A MASTERPIECE = the greatest, most impressive work someone has ever created."),
    4: ("sketched",
        "Students pick 'painted'. The clue is IN PENCIL, IN A SMALL NOTEBOOK - a quick rough drawing "
        "made before the real painting.",
        "SKETCHED = made a quick, rough drawing. Artists SKETCH an idea in a notebook before starting "
        "a full painting."),
    5: ("inspired",
        "The clue 'reminded him of his HAPPIEST CHILDHOOD MEMORIES' = the river gave him the urge to "
        "paint.",
        "INSPIRED = gave someone the desire, enthusiasm or ideas to create something. The river "
        "INSPIRED him to paint."),
})

# --- E : 'where' 안의 here / 'students' 첫 등장 충돌 / E2 tip 파손 ---
S["sections"]["E"]["passage"] = (
    "Last term, our school started a hobby fair so that everyone could share their interests with each "
    "other. We could here (1) the buzz of excitement long before we entered the main hall. Mei joinded "
    "(2) the photography corner and showed her classmates how to frame a good shot. The children ran "
    "quick (3) from one booth to the next, eager to try every activity on offer. One display of "
    "handmade items were (4) knocked over during the afternoon session and had to be set up again. At "
    "the end of the day, the students (5) feedback forms were collected and put into a box at the exit."
)
set_err(S["sections"]["E"], 2, "joinded", "joined",
        "Spelling - joined (join + ed, no extra -d)",
        "Students hear the -d of JOIN and write it twice.",
        "JOIN + ED = JOINED. The base word already ends in -N, so nothing is doubled. "
        "'Joinded' is never correct.")
set_err(S["sections"]["E"], 5, "students", "students'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The feedback forms BELONG TO the students -> STUDENTS' feedback forms (apostrophe after the "
        "-s for a plural). Singular: student's.")

# ============================== self-check ==============================
errs = []
for sid in ("S11", "S12", "S13", "S14"):
    s = G[sid]
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            if str(it["answer"]) not in it["options"]:
                errs.append(f"{it['question_id']}: answer {it['answer']} not in options")
                continue
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
    print("DRY OK - S11/S12/S13/S14 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S11/S12/S13/S14 fixes ->", SRC)
