#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S31~S35 정독(精讀) 검증에서 나온 결함 수정.

S31_B7: 'There ___ no trace of the backpack anywhere near the playground' 에는 과거 표지가 없어
        'is' 도 완벽히 옳다 -> 정답이 둘. 'when the search party arrived last night' 를 붙여
        과거만 성립하게 함.
S31/C : ★ 지문이 보기/tip 과 다른 문제의 것. 정답을 대입하면 'students ... finding their lost
        items'(비문), 'a girl finds a blue pencil case'(어제인데 현재형), 'to (6)to find'(중복) 등
        8개 중 6개가 비문. tip 은 아예 다른 지문(enjoys/last Monday/right now)을 설명한다.
        -> 8개 동사변화형이 각각 정확히 1회씩 성립하도록 지문 재작성 + 정답·trap·tip 재배정.
S31/D : ★ 정답이 빈칸과 어긋남('Items that are distinguish in value', 'People who valuable their
        belongings'). tip 도 다른 지문(엄마를 잃은 아이)의 것. -> 지문 재작성 + 재배정.
        보기 5개(오답 0개) -> 오답 3개 추가(총 8).
S31/E5: 'students's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(students)으로 교체.

S32/C3: 'may' 와 'might' 가 같은 종류의 '가능성' 문장에 배치되어 3번·4번이 서로 뒤바뀌어도 모두
        성립 -> 정답이 둘. 3번을 허가(permission)의 may 문장으로 교체.
S32/D : 보기 5개(오답 0개) -> 오답 3개 추가.
S32/E4: ★ 'our digital literacy lesson WAS very useful' 의 was 가 지문에서 먼저 등장 ->
        렌더러의 indexOf('was') 가 1번 문장에 밑줄을 친다. 첫 문장에서 was 제거.
S32/E2: 'medias -> media'(단수 medium)는 P3 수준을 벗어남(S27 의 criterias 와 같은 병) ->
        womans -> women 으로 교체.
S32/E5: 'childrens's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(childrens)으로 교체.

S33/D : 보기 5개(오답 0개) -> 오답 3개 추가.
S33/E2: 'criterias -> criteria' 는 P3 수준을 벗어남(S27 에서 이미 같은 판정) -> childs -> children.
S33/E5: 'coaches's' -> 아포스트로피 누락형(coaches).
S33_F2: model_answer 의 시제 역행(backshift) 누락. 'told ... that he performed' -> 'had performed'.
        (learning_tip 은 이미 'had performed' 라고 가르치고 있어 모범답안과 모순이었다.)

S34/D : ★ 정답 dialect 가 빈칸에 안 맞고('you will hear dialect languages'), 게다가 미사용
        상태의 정답 단어 'dialect' 가 지문 마지막 문장에 그대로 노출되어 있었다. -> 지문 재작성
        (2번을 'a Chinese ___ such as Hokkien or Teochew' 로) + 오답 3개 추가.
S34/C6: 정답 behind 는 옳으나 tip 이 지문과 반대로 설명('courtyards are behind the shophouses').
        지문은 '큰길 뒤편의 숍하우스'다 -> trap/tip 교체.
S34/E2: 'bacterias -> bacteria' 는 P3 수준을 벗어남 -> shelfs -> shelves (f -> ves).
S34/E4: tip 이 지문에 없는 'performance' 를 말한다 -> batik 전시로 교체.

S35/C3,C6: usually 와 normally 가 사실상 동의어라 3번·6번이 서로 뒤바뀌어도 성립 -> 3번에
        '예외가 있다'(usually), 6번에 '표준 관행이다'(normally) 단서를 넣어 구별 가능하게 함.
S35/D : 보기 5개(오답 0개) -> 오답 3개 추가.
S35/E4: ★ 'The audience WAS moved by their talent show' 의 was 가 먼저 등장 -> indexOf 밑줄이
        엉뚱한 자리에 걸린다. 해당 문장에서 was 제거.
S35/E5: 'performers's' -> 아포스트로피 누락형(performers).

공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 반드시
밑줄 자리여야 한다. 아래 self-check 가 이를 강제한다.
Section F 의 단일문장 변형(보고화법·능동태 전환)은 sentence_b 가 비어 있는 것이 정상 설계이므로
(S18/S19/S20 도 동일, build_wa1_practice.js 가 `|| undefined` 로 처리) self-check 는 지시문에
'one sentence' 가 있을 때만 두 번째 문장을 요구한다.
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

# ============================== S31 ==============================
S = G["S31"]

qmap(S["sections"]["B"])["S31_B7"]["stem"] = (
    "There ________ no trace of the missing child's backpack anywhere near the playground when the "
    "search party arrived last night.")
qmap(S["sections"]["B"])["S31_B7"]["trap_type"] = (
    "'No trace' = a singular uncountable idea, and 'when the search party arrived last night' fixes "
    "the time in the past. Students write 'were' (plural) or 'is' (present).")

S["sections"]["C"]["passage"] = (
    "Every week, students at our school (1)________ their lost items at the general office. Our "
    "school secretary always (2)________ a way to return almost every one of them. Yesterday, a "
    "girl (3)________ a blue pencil case near the library door. She spent the whole of Tuesday "
    "(4)________ its owner, class by class. While the secretary (5)________ it hard to fit all the "
    "umbrellas onto one shelf, a boy walked in with a lost violin. At the same moment, two Primary "
    "3 boys (6)________ it hard to describe the glasses they had lost. The most common item "
    "(7)________ at school is an umbrella - dozens are left behind on rainy days. Right now, Siti "
    "(8)________ out who owns a football that appeared last Friday."
)
set_cloze(S["sections"]["C"], {
    1: ("find",
        "Students write 'finds'. STUDENTS is plural, so the -s form cannot be used.",
        "Simple present for a weekly habit. Plural subject (students) -> plain verb: students FIND their items every week."),
    2: ("finds",
        "Students write 'find'. THE SECRETARY is one person, and 'always' signals a habit.",
        "Simple present, singular subject -> verb + S: the secretary always FINDS a way."),
    3: ("found",
        "Students write 'finded' or 'finds'. YESTERDAY = finished past, and 'find' is irregular.",
        "'Find' is irregular: find -> FOUND. Never 'finded'. Yesterday = simple past."),
    4: ("finding",
        "Students write 'to find'. After SPEND + a period of time, English uses the -ing form.",
        "SPEND time + verb-ing: she spent the whole of Tuesday FINDING its owner. Never 'spent Tuesday to find'."),
    5: ("was finding",
        "Students write 'found'. WHILE signals an action already in progress when the boy walked in, and 'the secretary' is singular.",
        "WHILE + past continuous: WAS FINDING (singular subject) = the action was still going on when something else happened."),
    6: ("were finding",
        "Students write 'was finding'. TWO PRIMARY 3 BOYS is plural, so the plural past continuous is needed.",
        "Past continuous with a plural subject -> WERE + verb-ing. Two boys WERE FINDING it hard at that same moment."),
    7: ("to find",
        "Students write 'finding'. 'The most common item ___ at school' needs an infinitive of purpose.",
        "Infinitive after a noun: the most common item TO FIND = the item that people find most often."),
    8: ("is finding",
        "Students write 'finds'. RIGHT NOW = happening at this moment, so the present continuous is needed.",
        "RIGHT NOW = present continuous: Siti IS FINDING out who owns the football at this very moment."),
})

S["sections"]["D"]["word_box"] = ["celebrate", "cheerful", "description", "distinguish", "frantic",
                                  "invitation", "reunited", "valuable"]
S["sections"]["D"]["passage"] = (
    "Losing something precious can be an upsetting experience. When something goes missing, the "
    "first reaction is often (1)________ - a mix of panic and helplessness as you search the same "
    "drawer again and again. A clear (2)________ of the lost item - its colour, its size and any "
    "special marks - helps other people to identify it. In a busy lost-property room it is hard to "
    "(3)________ one black school bag from another, so those details matter. Items that are "
    "(4)________, such as jewellery or important documents, must be reported at once. When the "
    "owner and the item are finally (5)________, relief and gratitude follow."
)
set_cloze(S["sections"]["D"], {
    1: ("frantic",
        "Students pick 'cheerful'. The dash explains the blank: A MIX OF PANIC AND HELPLESSNESS, searching the same drawer again and again.",
        "FRANTIC = wildly anxious or desperate. A FRANTIC search is one made in a panic."),
    2: ("description",
        "Students pick 'invitation'. The blank follows 'a clear', so it must be a noun, and the dashes list COLOUR, SIZE and SPECIAL MARKS.",
        "A DESCRIPTION = an account of what someone or something looks like. Give a clear DESCRIPTION so others can identify the item."),
    3: ("distinguish",
        "Students pick 'description' (a noun). The blank follows 'hard to', so it must be a base verb, and the clue is ONE BLACK SCHOOL BAG FROM ANOTHER.",
        "DISTINGUISH X FROM Y = tell two similar things apart. Small details help you DISTINGUISH one bag from another."),
    4: ("valuable",
        "Students pick 'frantic'. The examples give it away: JEWELLERY and IMPORTANT DOCUMENTS - things worth a great deal.",
        "VALUABLE = worth a lot of money, or very important. VALUABLE items must be reported at once."),
    5: ("reunited",
        "Students pick 'celebrate' (a base verb). The blank follows 'are finally', so it must be a past participle, and the clue is THE OWNER AND THE ITEM coming back together.",
        "REUNITED = brought back together after being separated. Owner and item are REUNITED = they are together again."),
})

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the students's (5)", "the students (5)")
set_err(S["sections"]["E"], 5, "students", "students'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The parents BELONG TO the students -> STUDENTS' parents (apostrophe after the -s for a "
        "plural). Singular: student's.")

# ============================== S32 ==============================
S = G["S32"]
S["sections"]["C"]["passage"] = (
    "With the internet, we (1)________ communicate with people on the other side of the world "
    "instantly. However, we (2)________ always check whether the information we find online is "
    "accurate before we share it with others. In our school, pupils (3)________ use the computer "
    "laboratory only when a teacher is present - that is the rule, and nobody is allowed to break "
    "it. Even a message that seems harmless (4)________ upset someone if it is misunderstood, so "
    "think before you post. In the future, technology (5)________ make communication even faster "
    "and more reliable than it is today. Many people said that without their phones, they "
    "(6)________ feel completely lost. Before smartphones existed, people (7)________ only "
    "communicate by letter or telephone - a much slower process. (8)________ we use technology to "
    "bring people together rather than drive them apart? That is the choice we make every day."
)
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 3:
        it["answer"] = "may"
        it["trap_type"] = ("Students write 'might' (possibility) or 'should' (advice). This sentence "
                           "is a school RULE about what pupils are allowed to do, not a possibility.")
        it["learning_tip"] = ("MAY = permission. Pupils MAY use the laboratory only when a teacher is "
                              "present = they are allowed to, but only under that condition.")
    if it["blank_number"] == 4:
        it["trap_type"] = ("Students write 'will' (certain) or 'would' (hypothetical). The message only "
                           "possibly causes upset - it is not certain.")

S["sections"]["D"]["word_box"] = ["accessible", "anonymous", "broadcast", "filter", "keyboard",
                                  "recharge", "transmit", "wireless"]

S["sections"]["E"]["passage"] = (
    "Last week, our digital literacy lesson taught us how to stay safe online. The teacher explained "
    "clear (1) how to spot fake news. She also reminded us that even grown men and womans (2) can be "
    "fooled by a clever headline. We spent part of the lesson connectting (3) our devices to the "
    "school network to practise checking verified sources. Unfortunately, the messages was (4) sent "
    "to the wrong email address by accident. At the end, the teacher displayed the childrens (5) "
    "digital safety posters on the classroom board for everyone to see."
)
set_err(S["sections"]["E"], 2, "womans", "women",
        "Irregular plural - woman -> women",
        "Students add -s to 'woman'. 'Woman' has an irregular plural: the vowel changes instead.",
        "WOMAN -> WOMEN (irregular). Same pattern: man -> men, child -> children, foot -> feet.")
set_err(S["sections"]["E"], 5, "childrens", "children's",
        "Possessive apostrophe - irregular plural possessive",
        "Students add a plain -s to 'children'. 'Children' is already plural, so the possessive needs 's.",
        "CHILDREN is already the plural of child, so the possessive is CHILDREN'S posters "
        "(apostrophe + s after an irregular plural). Never 'childrens'.")

# ============================== S33 ==============================
S = G["S33"]
S["sections"]["D"]["word_box"] = ["anxiety", "courageous", "hesitated", "nervously", "obstacle",
                                  "spectator", "stumbled", "triumph"]

S["sections"]["E"]["passage"] = (
    "On the day of the school's talent show, many students felt nervous but stepped brave (1) onto "
    "the stage. Many childs (2) from the lower primary classes performed as well, singing together "
    "in the opening item. Every student tryed (3) their best, even those who made small mistakes. "
    "Before the final act, the students was (4) all trembling in the wings. After the show, the "
    "coaches (5) warm feedback helped everyone feel proud of what they had achieved."
)
set_err(S["sections"]["E"], 2, "childs", "children",
        "Irregular plural - child -> children",
        "Students add -s to 'child'. 'Child' has a completely irregular plural form.",
        "CHILD -> CHILDREN (irregular). Same group: man -> men, woman -> women, tooth -> teeth.")
set_err(S["sections"]["E"], 5, "coaches", "coaches'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The feedback BELONGS TO the coaches -> COACHES' feedback (apostrophe after the -s for a "
        "plural). Singular: coach's.")

qmap(S["sections"]["F"])["S33_F2"]["model_answer"] = (
    "The coach told Marcus that he had performed better than anyone had expected that day.")

# ============================== S34 ==============================
S = G["S34"]
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 6:
        it["trap_type"] = ("Students write 'under' or 'below'. The shophouses are not beneath the "
                           "street - they stand at the BACK of it, away from the main road.")
        it["learning_tip"] = ("BEHIND = at the back of something. The shophouses BEHIND the main "
                              "street are the ones on the far side of it, hidden from the front.")

S["sections"]["D"]["word_box"] = ["ancestors", "celebrate", "dialect", "diverse", "harmony",
                                  "iconic", "multicultural", "skyline"]
S["sections"]["D"]["passage"] = (
    "Singapore is one of the most (1)________ countries in Asia. Its population includes Chinese, "
    "Malay, Indian and Eurasian communities, as well as people from many other parts of the world. "
    "Walking through the city, you will hear all four official languages, and older residents may "
    "still greet one another in a Chinese (2)________ such as Hokkien or Teochew. Temples, mosques, "
    "churches and synagogues stand side by side along the same street. This (3)________ mix of "
    "cultures, religions and traditions is a source of national pride. One of the most (4)________ "
    "images of the country is its city (5)________ at night - a glittering line of skyscrapers "
    "reflected in the waters of Marina Bay."
)
set_cloze(S["sections"]["D"], {
    1: ("diverse",
        "Students pick 'multicultural' (blank 3 needs it). The clue here is the LIST of communities: Chinese, Malay, Indian, Eurasian and many more.",
        "DIVERSE = made up of many different kinds. A DIVERSE population contains many different races and backgrounds."),
    2: ("dialect",
        "Students pick 'ancestors'. The blank follows 'a Chinese', so it must be a singular noun, and the examples are HOKKIEN and TEOCHEW - ways of speaking.",
        "A DIALECT = a regional form of a language, with its own words and pronunciation. Hokkien and Teochew are Chinese DIALECTS."),
    3: ("multicultural",
        "Students pick 'diverse' (blank 1 needs it). The clue is the noun that follows: a MIX OF CULTURES, RELIGIONS AND TRADITIONS.",
        "MULTICULTURAL = made up of many cultures living together. A MULTICULTURAL society celebrates the festivals of every community."),
    4: ("iconic",
        "Students pick 'diverse'. The clue is 'one of the most ___ IMAGES of the country' - the picture everyone recognises at once.",
        "ICONIC = famous and instantly recognised as a symbol of something. The Merlion is an ICONIC image of Singapore."),
    5: ("skyline",
        "Students pick 'harmony'. The dash explains it: A GLITTERING LINE OF SKYSCRAPERS reflected in the water.",
        "A SKYLINE = the shape that a city's tall buildings make against the sky."),
})

S["sections"]["E"]["passage"] = (
    "Our class visited the Asian Civilisations Museum last Friday. Our guide described vivid (1) the "
    "ancient trade routes that connected Singapore to other parts of Asia. The oldest pottery bowls "
    "were arranged on wooden shelfs (2) inside a tall glass case. We spent time stoping (3) at each "
    "exhibit and reading the detailed captions. The visitors was (4) all amazed by a display of "
    "beautiful batik cloth from the region. At the end, we learned that Singapore's location made it "
    "one of the greatest trading citys (5) in South-East Asia."
)
set_err(S["sections"]["E"], 2, "shelfs", "shelves",
        "Irregular plural - shelf -> shelves (f -> ves)",
        "Students simply add -s to 'shelf'. Nouns ending in -f or -fe usually change to -ves.",
        "SHELF -> SHELVES. Same rule: leaf -> leaves, knife -> knives, half -> halves, wolf -> wolves.")
set_err(S["sections"]["E"], 4, "was", "were",
        "Subject-verb agreement - plural subject (the visitors)",
        "'The visitors' is plural. Students match the verb to the nearest word instead.",
        "'The visitors' = plural -> WERE all amazed by the batik display. WAS is only for singular subjects.")

# ============================== S35 ==============================
S = G["S35"]
S["sections"]["C"]["passage"] = (
    "Great talent (1)________ requires great effort - the two go together without exception. The "
    "greatest performers (2)________ stop learning, no matter how successful they become. A young "
    "person who discovers a talent early (3)________ has an advantage over those who start later, "
    "though there are exceptions in every field. Young artists (4)________ feel nervous before "
    "performing in public, even after months of careful practice. Despite weeks of preparation, a "
    "performer (5)________ forgets a line or misses a note on stage - and that is perfectly normal. "
    "Competitions (6)________ have a panel of three or five judges; that is the standard arrangement "
    "at school level. (7)________, a truly exceptional performer emerges who changes the art form "
    "entirely and inspires a whole generation. True mastery is (8)________ achieved without years of "
    "daily practice and deep dedication."
)
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 3:
        it["trap_type"] = ("Students write 'always'. The sentence itself admits THOUGH THERE ARE "
                           "EXCEPTIONS, so a 100% word cannot be used here.")
    if it["blank_number"] == 6:
        it["trap_type"] = ("Students write 'always' or 'often'. The clue is THAT IS THE STANDARD "
                           "ARRANGEMENT - what happens in the typical case.")

S["sections"]["D"]["word_box"] = ["ambition", "applaud", "audition", "dedication", "mentor",
                                  "potential", "showcase", "talented"]

S["sections"]["E"]["passage"] = (
    "At last Friday's school concert, the young dancers performed confident (1) despite rehearsing "
    "for only two weeks. The audience enjoyed a talent show which included original storys (2) told "
    "through movement. One student spent three months writting (3) the narration that the teacher "
    "read aloud during the dance. The judges was (4) so impressed that they awarded the class a "
    "special merit prize. After the show, the performers (5) families gathered backstage to "
    "congratulate them with flowers and cheers."
)
set_err(S["sections"]["E"], 5, "performers", "performers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The families BELONG TO the performers -> PERFORMERS' families (apostrophe after the -s for "
        "a plural). Singular: performer's.")

# ============================== self-check ==============================
errs = []
for sid in ("S31", "S32", "S33", "S34", "S35"):
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
        if re.fullmatch(r".*'s's|.*s's", str(w) or ""):
            errs.append(f"{sid}/E{it['blank_number']}: non-word form '{w}'")
    for it in s["sections"]["F"]["questions"]:
        s1 = it.get("sentence1") or it.get("sentence_a")
        s2 = it.get("sentence2") or it.get("sentence_b")
        if not s1:
            errs.append(f"{it['question_id']}: sentence1/sentence_a missing")
        # 두 문장 결합형(instruction 에 'one sentence')일 때만 두 번째 문장이 필수.
        if not s2 and "one sentence" in str(it.get("instruction", "")).lower():
            errs.append(f"{it['question_id']}: combining task but sentence2/sentence_b missing")
        if not it.get("model_answer"):
            errs.append(f"{it['question_id']}: model_answer missing")

if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  ")
    sys.exit(1)
if "--dry" in sys.argv:
    print("DRY OK - S31/S32/S33/S34/S35 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S31/S32/S33/S34/S35 fixes ->", SRC)
