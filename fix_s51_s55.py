#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S51~S55 정독(精讀) 검증에서 나온 결함 수정.

S51_B6: 부가의문문의 주절 동사는 WAS ('The firefly display WAS the most beautiful thing...').
        꼬리표에 'it'이 붙어 있는데 정답이 'haven't' -> "haven't it?" = 비문. 정답 4 -> 2 (wasn't).
S51/D : 보기 5개 = 빈칸 5개, 오답 0개 -> 어느 빈칸에도 못 들어가는 오답 3개 추가(총 8).
S51/E2: 'its (2) hard to believe' 가 문장 첫머리라 대소문자 교정으로 오해된다 -> 문장 중간으로 이동.
S51/E5: 지문에 과학자가 한 명도 등장하지 않아 'scientist's'는 애초에 틀린 곳이 아니다
        -> 소유주가 분명한 아포스트로피 누락형(students -> students')으로 교체.

S52/C : when/as 가 1번·8번에서 상호 교환 가능(둘 다 성립) + as soon as/when 도 서로 바꿔 넣을 수 있어
        정답 배정이 유일하지 않다 = 사실상 풀 수 없다. box 의 'as'를 'unless'(조건 접속사)로 교체하고
        각 빈칸에 결정적 단서를 넣어 8개가 각각 유일하게 성립하도록 지문 재작성.
S52/D : 오답 0개 -> 3개 추가.
S52/E5: 'farmers's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(farmers -> farmers'). 소유주가
        복수임을 'all three farmers'로 명시하고, 앞 문장의 단수 'the farmer'를 'everyone'으로 바꿔
        단수/복수 충돌을 없앤다.

S53/A3: '완전히 silent 인데 속삭이는 사람은 있다'는 자기모순 -> 'not even in a whisper'로 교정.
S53/B1: 'Somebody forgets their mobile phone on silent' = 비문(뜻이 통하지 않음)
        -> 'forgets TO SWITCH OFF their mobile phone'로 stem 교정.
S53/C : ★ box 에 'read'가 두 번 들어 있고 3번(과거)·7번(to 뒤 원형)에서 두 번 필요하다.
        Cloze 렌더러는 Object.values(answers).includes(w) 로 '사용됨'을 판정하므로 같은 단어를 두 번
        쓰는 것은 앱에서 불가능하다 = 풀 수 없는 문제. box 를 서로 다른 8개 형태
        (read/reads/reading/to read/is reading/was reading/were reading/has read)로 바꾸고
        지문을 재작성해 각 형태가 정확히 한 번씩만 필요하게 만든다. label 의 '두 번 나온다' 주석도 삭제.
S53/D : 오답 0개 -> 3개 추가.

S54/C : finally / eventually 가 7·8번에서 서로 바꿔 넣어도 성립 = 정답이 유일하지 않다.
        'eventually'를 'never'로 교체(명확히 구분되는 부정 부사)하고 1·4·6·8번에 결정적 단서 삽입.
        6번 tip 이 지문에 없는 'within the next two days'를 근거로 삼고 있었으므로 지문에 명시.
S54/D : 지문 첫 문장 'many DEDICATED community helpers' 가 정답 dedicate 를 사실상 노출 ->
        'hard-working'으로 교체. 오답 0개 -> 3개 추가.
S54/E5: 'nurses's' 는 실재하지 않는 형태. 게다가 'nurses'는 1번 문장에 먼저 등장하므로
        indexOf 밑줄이 어긋난다 -> 앞에 등장하지 않는 복수 소유주(visitors -> visitors')로 교체.

S55/C5: 'The male sea turtle is (5)________, weighing almost twice as much.' 인데 정답이
        'far heavier than' -> than 뒤의 비교 대상이 없어 비문. 비교 대상('the female')을 넣는다.
S55/D : 오답 0개 -> 3개 추가.
S55/E : (a) 'A young theif (3) bird swooped past' -> 'thief bird'는 말이 되지 않는다.
        (b) 'rescuers's' 는 비실재 형태이고 'rescuers'가 1번 문장에 먼저 나와 indexOf 밑줄이 어긋난다.
        (c) 'Your (2)' 가 인용문 첫머리라 대문자 교정으로 오해된다.
        -> 지문 재작성: 1번 주어를 volunteers 로, 2번을 문장 중간으로, 3번을 '먹이를 훔치는 mynah'로,
           5번을 rescuers -> rescuers' 로.
S55_A5: stem 안에 정답 'shelter'가 그대로 박혀 있다('providing food and shelter') -> 정답 노출.
        stem 교체.
S55/F1: 'Since you spot an injured animal...' = 어색(단순현재 습관). sentence_a 를 현재완료로 바꾸고
        모범답안도 그에 맞춘다.

공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 반드시
밑줄 자리여야 한다. 아래 self-check 가 이를 강제하고, Cloze 정답이 두 번 쓰이는지도 검사한다.
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
    """table: {blank: (answer, trap, tip)}"""
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S51 ==============================
S = G["S51"]

q = qmap(S["sections"]["B"])["S51_B6"]
q["answer"] = "2"
q["trap_type"] = ("The tag copies the verb of the MAIN clause ('the display WAS the most beautiful "
                  "thing'), not the verb inside 'you have ever seen'. 'Haven't it?' is not English.")
q["learning_tip"] = ("A question tag mirrors the main clause. Main verb WAS + positive statement -> "
                     "negative tag WASN'T IT? Ignore the verbs inside the relative clause.")

S["sections"]["D"]["word_box"] = ["antennae", "camouflage", "habitat", "larvae", "nocturnal",
                                  "predator", "swarm", "venomous"]

S["sections"]["E"]["passage"] = (
    "Our class went on a nature walk to study insects in the school garden. The butterflies was (1) "
    "resting on the flowers when we arrived, their wings open in the warm sunlight. Our teacher said "
    "that its (2) hard to believe that such delicate creatures can migrate across entire continents. "
    "The teacher pointed to a trail of ants and told us that the cheif (3) worker always leads the "
    "group back to the nest. The green caterpillar moved slow (4) along the branch, searching for "
    "fresh leaves to eat. At the end of the walk, the students (5) notes and photographs were "
    "collected and used to create a class insect guide."
)
set_err(S["sections"]["E"], 5, "students", "students'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The notes BELONG TO the students -> STUDENTS' notes (apostrophe after the -s for a plural "
        "that already ends in -s). Singular: student's.")

# ============================== S52 ==============================
S = G["S52"]

S["sections"]["C"]["word_box"] = ["when", "while", "if", "as soon as", "until", "before", "after",
                                  "unless"]
S["sections"]["C"]["passage"] = (
    "Life on a farm follows the rhythm of the sun. Grandpa still remembers milking the cows by hand "
    "(1)________ he was seven years old. Father mends the broken fence (2)________ Mother tends the "
    "vegetable patch nearby, each of them busy with their own task. (3)________ the weather stays "
    "dry this week, we will harvest the sweet potatoes on Friday afternoon. (4)________ the milk is "
    "ready, Grandma pours it into glass bottles without wasting a single minute. The tomato "
    "seedlings stay under the shade net (5)________ they are strong enough to face the afternoon "
    "sun. The children feed the chickens (6)________ they leave for school, so the hens are already "
    "pecking happily by the time the school bus arrives. (7)________ the harvest is complete, the "
    "whole family gathers to share a big meal together. (8)________ a sudden storm frightens them, "
    "the animals find their own way back to the shelter each evening without any help."
)
set_cloze(S["sections"]["C"], {
    1: ("when",
        "Students write 'while'. 'While he was seven years old' is not English: a stated age is a point in the past, not a stretch of activity.",
        "WHEN + a past age or a past occasion: WHEN he was seven years old. Use WHEN to say at what time in the past something happened."),
    2: ("while",
        "Students write 'when'. Two people are busy with two different tasks over the same stretch of time, not at one single moment.",
        "WHILE = during the same period as another ongoing action. Father mends the fence WHILE Mother tends the patch = both jobs run side by side."),
    3: ("if",
        "Students write 'when'. WHEN treats dry weather as certain, but nobody can be sure of the weather - and the main clause uses 'will'.",
        "IF = an uncertain condition. IF + simple present, then simple future: IF the weather stays dry, we WILL harvest."),
    4: ("as soon as",
        "Students write 'when'. The clue 'without wasting a single minute' shows there is no gap at all between the milk being ready and the pouring.",
        "AS SOON AS = the very moment something happens, with no delay. Use it when one action follows another instantly."),
    5: ("until",
        "Students write 'before'. 'Stay under the net before they are strong enough' does not work: the seedlings STAY there right up to the moment they are ready.",
        "UNTIL = continuing all the way up to a point in time. STAY / WAIT / KEEP + UNTIL = go on doing it, then stop at that point."),
    6: ("before",
        "Students write 'after'. The hens are already pecking by the time the bus arrives, so the feeding must come first.",
        "BEFORE = earlier than the other event. Put BEFORE in front of the action that happens LATER, and the earlier action stands in the main clause."),
    7: ("after",
        "Students write 'before'. The family can only celebrate once the crops are in, so the meal comes second.",
        "AFTER = later than the other event. AFTER the harvest is complete, the meal follows. AFTER marks the earlier event in its own clause."),
    8: ("unless",
        "Students write 'if'. IF reverses the meaning: it is the absence of a storm that lets the animals come home by themselves.",
        "UNLESS = if not / except when. UNLESS a storm frightens them = they come back on their own every evening as long as no storm comes."),
})

S["sections"]["D"]["word_box"] = ["barren", "drought", "fertile", "harvest", "livestock", "nurture",
                                  "scarecrow", "season"]

S["sections"]["E"]["passage"] = (
    "Last weekend, our class visited a working farm in Lim Chu Kang. The goats was (1) grazing "
    "peacefully in the meadow when we arrived, barely looking up from the grass. Our guide told us "
    "that one student forgot too (2) water the seedlings the previous week and several of them dried "
    "out. We walked across the large feild (3) behind the main barn, passing rows of cabbages and "
    "sweet potatoes stretching all the way to the trees. At five o'clock in the morning, the old "
    "rooster crowed so loud (4) that everyone on the farm woke up without needing an alarm clock. At "
    "the end of our visit, all three farmers (5) freshly harvested vegetables were packed neatly "
    "into crates for delivery."
)
set_err(S["sections"]["E"], 5, "farmers", "farmers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The vegetables BELONG TO all three farmers -> FARMERS' vegetables (apostrophe after the -s "
        "for a plural). One farmer: farmer's.")

# ============================== S53 ==============================
S = G["S53"]

q = qmap(S["sections"]["A"])["S53_A3"]
q["stem"] = ("The library's reading room was completely ________ - not one person was speaking, not "
             "even in a whisper.")

q = qmap(S["sections"]["B"])["S53_B1"]
q["stem"] = ("Somebody in the reading room ________ to switch off their mobile phone, and it keeps "
             "vibrating loudly on the table.")

C = S["sections"]["C"]
C["label"] = "Section C - Grammar Cloze (Verb 'read' - eight different forms)"
C["word_box"] = ["read", "reads", "reading", "to read", "is reading", "was reading", "were reading",
                 "has read"]
C["passage"] = (
    "Aisha (1)________ at least two books every week without fail. She enjoys (2)________ adventure "
    "stories more than any other genre in the library. Last Saturday, she (3)________ a whole novel "
    "in a single afternoon without stopping for lunch. While she (4)________ the final chapter, the "
    "library lights flickered twice and then came back on. Her two younger brothers (5)________ "
    "picture books nearby at that very same moment, keeping themselves quietly entertained. Her "
    "library target for this year is (6)________ fifty books before the end of Primary Three. So "
    "far, she (7)________ thirty-eight of them and she is well ahead of her plan. Right now, Aisha "
    "(8)________ a book about ancient Egyptian civilisations that she found on the top shelf."
)
set_cloze(C, {
    1: ("reads",
        "Students write the bare form. 'Every week without fail' = a present habit, and Aisha is one person.",
        "Simple present for a habit + a singular subject -> add -S: Aisha READS two books every week."),
    2: ("reading",
        "Students write 'to read'. ENJOY never takes the infinitive.",
        "ENJOY + verb-ing: she enjoys READING. Same pattern: finish, avoid, keep and practise all take the -ing form."),
    3: ("read",
        "Students write 'readed'. This verb is irregular: its past form is spelt exactly like its base form but said differently.",
        "Past simple with a finished time marker (LAST SATURDAY). The past of this verb keeps the same four letters - only the sound changes."),
    4: ("was reading",
        "Students write the simple past. WHILE + the lights suddenly flickering = a long action already in progress, cut across by a short one.",
        "Past continuous = was/were + verb-ing. Use it for the longer action that was already going on when something else happened."),
    5: ("were reading",
        "Students write 'was reading'. TWO younger brothers = a plural subject.",
        "Past continuous with a plural subject -> WERE + verb-ing. One brother WAS reading; two brothers WERE reading."),
    6: ("to read",
        "Students write 'reading'. After 'her target IS', the noun-like slot is filled by an infinitive: her target is TO DO something.",
        "TO + base verb = the infinitive, used after 'my aim / my target / my plan is ...'. Never add -s or -ing after 'to'."),
    7: ("has read",
        "Students write the simple past. SO FAR means 'up to now', which links the past to the present.",
        "Present perfect = has/have + past participle. Use it with SO FAR, ALREADY, YET and EVER, when the time period is still open."),
    8: ("is reading",
        "Students write the simple present. RIGHT NOW means at this very moment, not as a habit.",
        "Present continuous = is/are + verb-ing, for what is happening at this moment. RIGHT NOW / AT THE MOMENT are its signal words."),
})

S["sections"]["D"]["word_box"] = ["bookmark", "browse", "catalogue", "fiction", "overdue",
                                  "reference", "renew", "whisper"]

# ============================== S54 ==============================
S = G["S54"]

C = S["sections"]["C"]
C["word_box"] = ["yet", "still", "already", "soon", "recently", "finally", "never", "immediately"]
C["passage"] = (
    "When the emergency call came in, the paramedic team responded (1)________, leaving the station "
    "within seconds. By the time the doctor arrived, the nurses had (2)________ prepared the "
    "patient. The rubbish truck has not collected the bins on our street (3)________. The postman is "
    "(4)________ making his rounds in our estate, even though it is almost six in the evening. A new "
    "community centre was (5)________ opened, just two weeks ago. The repair team said the broken "
    "streetlight would be fixed (6)________ - within the next two days at the latest. After three "
    "weeks of digging and testing, the team (7)________ found the source of the water leak. The new "
    "recycling bins were resisted at first, but the residents have (8)________ complained about them "
    "since."
)
set_cloze(C, {
    1: ("immediately",
        "Students write 'soon'. SOON allows a short wait, but the team left the station within seconds - there was no wait at all.",
        "IMMEDIATELY = at once, with no delay whatever. SOON = in a little while. Match the adverb to how much time actually passed."),
    2: ("already",
        "Students write 'yet'. YET belongs to negatives and questions; here the work was done sooner than expected, before the doctor even arrived.",
        "ALREADY = done sooner than expected, and it sits between the helping verb and the main verb: had ALREADY prepared."),
    3: ("yet",
        "Students write 'still'. The sentence is negative and the blank sits at the very end - that is the home of one adverb only.",
        "YET = up to now, in negatives and questions, at the END of the sentence: has not collected the bins YET."),
    4: ("still",
        "Students write 'already'. Nothing has finished here: he began his rounds long ago and is going on with them at six in the evening.",
        "STILL = the action started earlier and has not stopped. It sits before the main verb: he is STILL working."),
    5: ("recently",
        "Students write 'soon'. TWO WEEKS AGO is in the past, and SOON always points to the future.",
        "RECENTLY = a short time ago (past). SOON = in a short while (future). Check the tense of the verb before you choose."),
    6: ("soon",
        "Students write 'recently'. The streetlight has NOT been fixed yet - the repair is promised within the next two days.",
        "SOON = in the near future, and it pairs with WOULD / WILL. RECENTLY pairs with past verbs."),
    7: ("finally",
        "Students write 'immediately'. Three whole weeks of digging and testing came first, so this is the end of a long process.",
        "FINALLY = at last, after a long wait or a long series of steps. It is the opposite of IMMEDIATELY."),
    8: ("never",
        "Students write 'yet'. The verb has no negative word ('have complained'), so the adverb itself must supply the negative meaning.",
        "NEVER = not at any time, and it makes the sentence negative on its own: they have NEVER complained since."),
})

D = S["sections"]["D"]
D["passage"] = D["passage"].replace("many dedicated community helpers", "many hard-working community helpers")
D["word_box"] = ["dedicate", "essential", "generous", "hospital", "paramedic", "patrol", "uniform",
                 "volunteer"]

S["sections"]["E"]["passage"] = (
    "Last month, our class visited a community polyclinic for a learning journey. The nurses was (1) "
    "busy attending to patients when we arrived, moving quickly and quietly between the rooms. The "
    "doctor stood their (2) at the entrance and welcomed us warmly. She told us that her own neice "
    "(3) had inspired her to become a doctor after recovering from a serious illness as a child. "
    "Throughout the visit, the medical staff worked brave (4) and calmly, even when several patients "
    "arrived at the same time. At the end of the visit, we signed our names in the visitors (5) book "
    "and thanked the whole team for their time."
)
set_err(S["sections"]["E"], 5, "visitors", "visitors'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The book belongs to the visitors who sign it -> VISITORS' book (apostrophe after the -s for "
        "a plural). One visitor: visitor's.")

# ============================== S55 ==============================
S = G["S55"]

q = qmap(S["sections"]["A"])["S55_A5"]
q["stem"] = ("The community centre set up a temporary ________ for animals affected by the flash "
             "flood, giving them food, water and a dry place to sleep.")
q["trap_type"] = ("'Market', 'school' and 'clinic' are real places, but none of them is set up to "
                  "house animals driven out by a flood. The answer is printed nowhere in the stem.")

C = S["sections"]["C"]
C["passage"] = C["passage"].replace(
    "The male sea turtle we found is (5)________, weighing almost twice as much.",
    "The male sea turtle we found is (5)________ the female, weighing almost twice as much.")
for it in C["questions"]:
    if it["blank_number"] == 5:
        it["trap_type"] = ("Students write 'bigger than'. The clue is WEIGHT ('almost twice as much'), "
                           "and 'almost twice' calls for an intensifier in front of the comparative.")
        it["learning_tip"] = ("FAR / MUCH + comparative + THAN = a big gap between the two things. "
                              "Never say 'very' in front of a comparative.")

S["sections"]["D"]["word_box"] = ["abandoned", "capture", "ferocious", "fragile", "poacher",
                                  "release", "sanctuary", "veterinary"]

S["sections"]["E"]["passage"] = (
    "Last Tuesday, a group of students helped to rescue a family of otters near the canal. The "
    "volunteers was (1) trained to approach wild animals slowly and without making any noise. One "
    "student called out to her friend, 'If your (2) going to help, you must stay very still or the "
    "mother otter will panic!' A cheeky mynah, a well-known theif (3), swooped down and snatched a "
    "biscuit from an open bag while the team waited. The mother otter appeared sudden (4) from "
    "behind the reeds, dragging one of her pups by the scruff of the neck. After the rescue was "
    "complete, the rescuers (5) report was sent to ACRES for the centre's records."
)
set_err(S["sections"]["E"], 1, "was", "were",
        "Subject-verb agreement - plural subject (the volunteers)",
        "'The volunteers' is plural. Students match the verb to the nearest idea instead of the subject.",
        "Plural subject -> plural verb: the volunteers WERE trained. WAS belongs to one person or one thing.")
set_err(S["sections"]["E"], 2, "your", "you're",
        "Homophone confusion - your (belonging to you) vs you're (you are)",
        "Students write 'your' when the meaning is 'you are'.",
        "YOU'RE = you are (contraction). YOUR = belonging to you. Test: 'If you are going to help' "
        "makes sense -> use the contraction.")
set_err(S["sections"]["E"], 3, "theif", "thief",
        "Spelling - I before E (thief)",
        "Students swap the vowels and write 'theif'.",
        "I before E, except after C: thIEf, chIEf, brIEf, belIEve. The mynah steals food, so it is a "
        "thIEf.")
set_err(S["sections"]["E"], 5, "rescuers", "rescuers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The report BELONGS TO the rescuers -> RESCUERS' report (apostrophe after the -s for a "
        "plural). One rescuer: rescuer's.")

q = qmap(S["sections"]["F"])["S55_F1"]
q["sentence_a"] = "You have spotted an injured animal near your home."
q["model_answer"] = ("Since you have spotted an injured animal near your home, you should call the "
                     "wildlife rescue hotline right away.")
q["trap_type"] = ("Students write 'Since you will spot' or drop the perfect form. SINCE gives a "
                  "reason that is already true.")
q["learning_tip"] = ("SINCE = because of a fact that is already true. SINCE + subject + verb, then a "
                     "comma, then the advice clause with SHOULD. Never put 'will' in the SINCE clause.")

# ============================== self-check ==============================
errs = []
for sid in ("S51", "S52", "S53", "S54", "S55"):
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
            if not is_tag and re.search(r"\b" + re.escape(a) + r"\b", it["stem"].lower()):
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
        # ★ 같은 단어를 두 번 쓰는 Cloze 는 렌더러(Object.values(answers).includes) 상 풀 수 없다.
        if len(set(used)) != len(used):
            errs.append(f"{sid}/{k}: an answer is used TWICE -> unsolvable in the app: {used}")
        wb = sec["word_box"]
        keys = list(wb.keys()) if isinstance(wb, dict) else list(wb)
        pool = list(wb.values()) if isinstance(wb, dict) else list(wb)
        if len(set(pool)) != len(pool):
            errs.append(f"{sid}/{k}: word_box contains a duplicate word: {pool}")
        if k == "D" and len(pool) < len(qs) + 3:
            errs.append(f"{sid}/D: word_box has {len(pool)} words for {len(qs)} blanks (need 3 distractors)")
        if k == "C" and len(pool) != len(qs):
            errs.append(f"{sid}/C: word_box has {len(pool)} words for {len(qs)} blanks")
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
    print("DRY OK - S51/S52/S53/S54/S55 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S51/S52/S53/S54/S55 fixes ->", SRC)
