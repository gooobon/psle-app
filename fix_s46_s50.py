#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S46~S50 정독(精讀) 검증에서 나온 결함 수정.

렌더러 사실 확인(ExamSession.js):
  - Cloze word bank 은 `Object.values(answers).includes(w)` 로 '값' 비교하여 사용된 낱말을
    줄긋기/비활성화하고, 재시도 칩도 `wordBank.filter(w => w !== chosen)` 로 '값' 비교한다.
    => 배열 word_box 에 같은 낱말이 두 번 들어 있어도 하나를 쓰면 둘 다 죽는다.
       즉 '같은 낱말을 두 번 쓰는 설계'는 앱에서 풀 수 없다. (핸드오프 7-A 의 S47/C '오탐' 판정은
       렌더러 기준으로 보면 오판이다 — 실제 결함이 맞다.)
  - Editing 렌더러는 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 밑줄 자리여야 한다.

S46/C : box 가 who×2, which×2 (중복) → 앱에서 풀 수 없음. 관계사 8개(who/whom/whose/which/that/
        where/when/why)가 각 1회씩 쓰이도록 지문 재작성 + 정답/trap/tip 재배정 + label 수정.
S46/D : (a) blank3 'gleaming green carpet' / blank5 'sprawling white sand' 이 서로 뒤바뀜.
        (섬을 위에서 본 '초록 카펫'=넓게 펼쳐진, 흰 모래사장=빛나는) → 3↔5 교환하고 각 문장에
        결정적 단서 삽입. (b) word_box 5개=빈칸 5개, 오답 0개 → 어느 빈칸에도 못 들어가는 오답 3개 추가.
S46/E5: 'childrens'' 는 실재하지 않는 형태 → 아포스트로피 누락형(children → children's)으로 교체.
S46/F1: sentence_a(과거) + sentence_b(would have been) 와 model_answer(현재/미래)가 서로 다른 문제.
        UNLESS 합성이 성립하는 두 문장으로 교체.

S47/B3: 'Riya is a ___ more generous friend' 에서 far 도 much 도 성립 → 정답이 둘. stem 을 정리하고
        much 를 제거해 far 만 성립하게 함.
S47/B7: 'The friendship award was given BY a student who had helped a classmate' → 상을 준 사람이
        학생이 되어 뜻이 뒤집힘. by → to.
S47/C : box 배열에 'her' 가 두 번 → 위 렌더러 사실에 따라 풀 수 없음. 8개 대명사(I/my/myself/she/
        her/me/they/themselves)가 각 1회씩 쓰이도록 지문 재작성.
S47/D : 오답 0개 → 오답 3개 추가.
S47/E1: ★ 오류어 'to' 의 첫 등장이 같은 문장 앞쪽('wanted TO join')이라 밑줄이 엉뚱한 자리에 걸린다.
        불규칙 과거(teached → taught)로 교체.
S47/E5: 'friends's' 는 비실재형이고, 아포스트로피 누락형 'friends' 로 바꾸면 앞 문장의 'friends' 가
        먼저 걸린다 → 'students → students'' 로 교체. 지문 재작성.

S48/B3: 'severest' 도 성립 → 정답이 둘. 보기를 'very severe' 로 교체.
S48/C4/C7: blank4(because) 자리에 since 도 성립 → 모호. blank7 을 명사구('the first rumble at noon')
        앞으로 바꿔 since 만 성립하게 함(because/although 는 명사구를 이끌 수 없다).
S48/D : 오답 0개 → 오답 3개 추가.
S48/E5: 'teachers's' 비실재형 → 아포스트로피 누락형(teachers → teachers')으로 교체.

S49/D : 오답 0개 → 오답 3개 추가.
S49/E5: "firefighters' → firefighter's" 는 '틀리지 않은 것을 틀렸다'고 하는 문항(둘 다 문법적으로
        옳고, 한 명인지 여러 명인지 알려주는 단서가 지문에 없다) → 아포스트로피 누락형
        (rescuers → rescuers')으로 교체.

S50/B3: 'much longer' 도 성립 → 정답이 둘. 보기 much → too.
S50/C1: 'in/at the void deck' 이 둘 다 자연스럽고 blank3 'at/in the corner' 와 맞바꿔도 말이 되어
        모호 → blank1 을 'in the shade of the void deck'(in 만 성립)로 교체.
S50/D : 오답 0개 → 오답 3개 추가.
S50/E5: 'players's' 비실재형. 아포스트로피 누락형 'players' 로 바꾸면 지문 앞의 'The players was'
        가 먼저 걸린다 → 'winners → winners'' 로 교체.
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

def set_cloze(sec, table):
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S46 ==============================
S = G["S46"]
S["sections"]["C"]["label"] = "Section C – Grammar Cloze (Relative pronouns and relative adverbs)"
S["sections"]["C"]["word_box"] = ["who", "whom", "whose", "which", "that", "where", "when", "why"]
S["sections"]["C"]["passage"] = (
    "The lifeguard (1)________ rescued the drowning boy was praised by everyone on the beach "
    "afterwards. The cable car, (2)________ runs between Mount Faber and Sentosa, offers a stunning "
    "view of the sea below. The sandcastle (3)________ we built together took us over an hour to "
    "finish. Palawan Beach is the place (4)________ my family always sets up our picnic mat. I "
    "still remember the afternoon (5)________ we first saw the fireworks burst above the water. The "
    "family (6)________ children built the biggest sandcastle won a small prize from the beach "
    "attendant. The kind attendant from (7)________ we borrowed the paddles reminded us to wear our "
    "life jackets. That is the reason (8)________ nobody in our group swam beyond the yellow buoys."
)
set_cloze(S["sections"]["C"], {
    1: ("who",
        "Students write 'which' (for things). A lifeguard is a person, and the blank is the subject of 'rescued'.",
        "WHO = the relative pronoun for PEOPLE doing the action. The lifeguard WHO rescued the boy = 'who' stands for the lifeguard."),
    2: ("which",
        "Students write 'who' (for people) or 'that'. A cable car is a thing, and the commas make this extra information.",
        "WHICH = the relative pronoun for THINGS, and the only one allowed after a comma. The cable car, WHICH runs..., offers..."),
    3: ("that",
        "Students write 'who'. A sandcastle is a thing, and this clause tells us WHICH sandcastle - it defines, so no comma is used.",
        "THAT = used in a defining clause with no comma: the sandcastle THAT we built = that one, not any other."),
    4: ("where",
        "Students write 'which' or 'that'. A place needs its own relative adverb, not a pronoun.",
        "WHERE = the relative adverb for PLACES. The place WHERE we picnic = 'where' replaces 'at that place'."),
    5: ("when",
        "Students write 'that'. An afternoon is a point in time, and time needs its own relative adverb.",
        "WHEN = the relative adverb for TIME. The afternoon WHEN we first saw the fireworks = 'when' replaces 'on that afternoon'."),
    6: ("whose",
        "Students write 'who'. The blank is followed by a noun (children) that BELONGS to the family, so a possessive is needed.",
        "WHOSE = the possessive relative pronoun. The family WHOSE children built it = the family's children."),
    7: ("whom",
        "Students write 'who'. After a preposition ('from'), English requires the object form.",
        "Preposition + WHOM: the attendant from WHOM we borrowed the paddles. WHO does the action; WHOM receives it."),
    8: ("why",
        "Students write 'that' or 'because'. The word REASON in front of the blank calls for its own relative adverb.",
        "WHY = the relative adverb that follows 'the reason'. That is the reason WHY nobody swam out."),
})

S["sections"]["D"]["word_box"] = ["resort", "cable", "gleaming", "attraction", "sprawling",
                                  "souvenir", "queue", "sunburnt"]
S["sections"]["D"]["passage"] = (
    "Sentosa is a popular island (1)________ off Singapore's southern coast. Visitors can travel by "
    "road, by monorail, or by (2)________ car - a gondola suspended on wires high above the sea. "
    "From above, the island looks like a (3)________ green carpet that reaches from one shore to "
    "the other, with white beaches on every side. Its theme parks, hotels and beaches make it the "
    "most popular (4)________ for families. Its (5)________ white sand throws the sunlight back so "
    "brightly that visitors reach for their sunglasses."
)
set_cloze(S["sections"]["D"], {
    1: ("resort",
        "Students pick 'attraction'. The clue is that the whole ISLAND is the holiday destination, not one single place inside it.",
        "A RESORT = a place people travel to for holidays and leisure. Sentosa is an island RESORT."),
    2: ("cable",
        "Students pick 'sprawling'. The dash explains it: a GONDOLA SUSPENDED ON WIRES. The blank names the thick wire it hangs from.",
        "A CABLE car = a cabin that hangs from a thick steel wire (a cable) and travels high above the ground."),
    3: ("sprawling",
        "Students pick 'gleaming'. A green carpet does not shine; the clue is that it REACHES FROM ONE SHORE TO THE OTHER - it covers a huge area.",
        "SPRAWLING = spreading out over a large area. A SPRAWLING island stretches far in every direction."),
    4: ("attraction",
        "Students pick 'resort'. The clue is 'THE MOST POPULAR ___ FOR FAMILIES' - the theme parks and beaches are the things that pull visitors in.",
        "An ATTRACTION = a place or feature that draws visitors to it."),
    5: ("gleaming",
        "Students pick 'sprawling'. The clue is that the sand THROWS THE SUNLIGHT BACK SO BRIGHTLY that visitors need sunglasses - it shines.",
        "GLEAMING = shining brightly with reflected light. GLEAMING white sand dazzles the eyes."),
})

S["sections"]["E"]["passage"] = (
    "Last Saturday, our family spent the day at Sentosa. The beaches was (1) clean and the water was "
    "warm and clear. My sister said its (2) the best place for a family day out in Singapore. At the "
    "activity booth, we signed up to recieve (3) free kayaking lessons at three o'clock. The "
    "instructor moved quick (4) through the water to demonstrate the correct paddling technique. At "
    "the end of the day, the children (5) sand sculptures were photographed by other visitors who "
    "walked past."
)
set_err(S["sections"]["E"], 5, "children", "children's",
        "Possessive apostrophe - irregular plural possessive (children's)",
        "Students leave out the apostrophe altogether, or write 'childrens'', treating 'children' as a regular plural.",
        "The sculptures BELONG TO the children -> CHILDREN'S sculptures. 'Children' is already plural, so add "
        "apostrophe + s, exactly like men's and women's.")

qF = qmap(S["sections"]["F"])["S46_F1"]
qF["sentence_a"] = "You must hold on to the safety bar."
qF["sentence_b"] = "You will not feel secure in the cable car."
qF["model_answer"] = "Unless you hold on to the safety bar, you will not feel secure in the cable car."
qF["trap_type"] = ("Students add 'will' inside the UNLESS clause, or write 'Unless you do not hold on', "
                   "which doubles the negative.")
qF["learning_tip"] = ("UNLESS = IF NOT. UNLESS + simple present, then the main clause takes will/may. "
                      "The unless clause is already negative, so never add another 'not' to it.")

# ============================== S47 ==============================
S = G["S47"]
q = qmap(S["sections"]["B"])["S47_B3"]
q["stem"] = "Riya is ________ more generous than anyone else I know."
q["options"] = {"1": "very", "2": "too", "3": "far", "4": "more"}
q["trap_type"] = ("'Very more', 'too more' and 'more more' are all impossible. Only one word can be "
                  "placed in front of a comparative to strengthen it.")
q["learning_tip"] = ("FAR + comparative = much stronger comparison: FAR MORE generous. 'Very' and 'too' "
                     "go in front of a plain adjective (very generous), never in front of a comparative.")

q = qmap(S["sections"]["B"])["S47_B7"]
q["stem"] = ("The friendship award at the school assembly ________ to a student who had helped a "
             "classmate every day for a term.")

S["sections"]["C"]["word_box"] = ["I", "my", "myself", "she", "her", "me", "they", "themselves"]
S["sections"]["C"]["passage"] = (
    "(1)________ have been best friends with Siti since we were in kindergarten. Siti always "
    "remembers (2)________ birthday without being reminded. I made her birthday card (3)________ "
    "instead of buying one from the shop, because I wanted it to feel more personal. Siti smiled "
    "when (4)________ saw the card - her eyes lit up with joy. When Siti twisted her ankle on the "
    "way home, I helped (5)________ carry her bags. Siti never laughs at (6)________ when I make a "
    "mistake in class, and I never laugh at her either. Good friends like Siti - (7)________ are the "
    "ones you can call at any hour of the night. Real friends never need to pretend; they can simply "
    "be (8)________ around each other."
)
set_cloze(S["sections"]["C"], {
    1: ("I",
        "Students write 'me'. The blank is the SUBJECT of 'have been', and 'Me have been' is never English.",
        "The subject pronoun does the action: I HAVE BEEN best friends with Siti. Use 'me' only after a verb or a preposition."),
    2: ("my",
        "Students write 'me'. The blank sits in front of the noun BIRTHDAY, so a possessive adjective is needed.",
        "Possessive adjective + noun: MY birthday. 'Me birthday' is wrong - put the possessive form in front of a noun."),
    3: ("myself",
        "Students write 'me'. The person who made the card and the person being talked about are the same, so the reflexive form is needed.",
        "MYSELF = the reflexive pronoun for I. I made the card MYSELF = with nobody's help."),
    4: ("she",
        "Students write 'her'. The blank is the SUBJECT of 'saw', not the receiver of it.",
        "SHE = the subject pronoun for a female. SHE saw the card. 'Her saw the card' is never English."),
    5: ("her",
        "Students write 'she'. The blank comes straight after the verb HELPED, so it is the object.",
        "After a verb, use the object pronoun: I helped HER. Subject = she; object = her."),
    6: ("me",
        "Students write 'I' or 'myself'. The blank follows the preposition AT, and the person laughing (Siti) is not the person laughed at.",
        "Preposition + object pronoun: laughs at ME, with ME, for ME. 'Laughs at I' is never English."),
    7: ("they",
        "Students write 'them'. The blank is the SUBJECT of 'are the ones', not the receiver of an action.",
        "THEY = the subject pronoun for a group. THEY are the ones you can call. 'Them are' is never English."),
    8: ("themselves",
        "Students write 'them'. The friends and the people they are being are the same people, so the reflexive form is needed.",
        "THEMSELVES = the reflexive pronoun for they. They can just be THEMSELVES = they can be their true selves."),
})

S["sections"]["D"]["word_box"] = ["compassion", "loyal", "sincere", "forgive", "bond",
                                  "betray", "jealousy", "selfish"]

S["sections"]["E"]["passage"] = (
    "Last Thursday, our class celebrated Friendship Day. Our teacher teached (1) us a song about "
    "standing by one another. The pupils was (2) nervous at first about sharing their drawings with "
    "the whole class. One boy gave his freind (3) the last piece of cake without hesitation. "
    "Afterwards, everyone shared their snacks happy (4) and the whole room felt warmer. Before the "
    "bell rang, our teacher pinned all the students (5) drawings on the noticeboard beside the door."
)
set_err(S["sections"]["E"], 1, "teached", "taught",
        "Irregular past tense - teach -> taught",
        "Students add -ed to an irregular verb. TEACH does not take -ed; it changes its whole shape.",
        "TEACH -> TAUGHT. Same family: catch -> caught, buy -> bought, bring -> brought. Irregular verbs "
        "change their form instead of adding -ed.")
set_err(S["sections"]["E"], 2, "was", "were",
        "Subject-verb agreement - plural subject (the pupils)",
        "'The pupils' is plural. Students match the verb to the nearest idea instead of to the subject.",
        "Plural subject -> plural verb: the pupils WERE nervous. WAS belongs to one person or thing only.")
set_err(S["sections"]["E"], 3, "freind", "friend",
        "Spelling - ie/ei confusion",
        "Students swap the vowels. There is no C in front, so the ordinary I-before-E order applies.",
        "I before E, except after C: fr-I-E-nd. Same pattern: field, piece, believe, chief.")
set_err(S["sections"]["E"], 5, "students", "students'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The drawings BELONG TO the students -> STUDENTS' drawings (apostrophe after the -s for a plural "
        "already ending in -s). Singular: student's.")

# ============================== S48 ==============================
S = G["S48"]
q = qmap(S["sections"]["B"])["S48_B3"]
q["options"] = {"1": "more severe", "2": "most severe", "3": "severe", "4": "very severe"}
q["trap_type"] = ("The storm is being measured against EVERY storm this year, not against one other "
                  "storm, so a comparative or a plain adjective cannot fill the blank after 'the'.")

S["sections"]["C"]["passage"] = (
    "Thunder rumbled (1)________ lightning lit up the whole sky in a single bright flash. We brought "
    "umbrellas (2)________ the strong wind turned them inside out immediately. The drain overflowed, "
    "(3)________ the road became flooded within just a few minutes. The children rushed inside "
    "(4)________ they were afraid of the lightning flashing across the dark sky. (5)________ the "
    "rain was heavy, Father still insisted on going out to buy dinner for the whole family. You can "
    "wait for the rain to stop (6)________ take a taxi home instead - the choice is yours. "
    "(7)________ the first rumble at noon, the sky has not brightened at all. The match will be "
    "cancelled (8)________ the rain stops within the next thirty minutes."
)
set_cloze(S["sections"]["C"], {
    4: ("because",
        "Students write 'so'. SO would give the result of being afraid; the blank must give the REASON why they ran in.",
        "BECAUSE answers the question WHY. The children rushed inside BECAUSE they were afraid."),
    7: ("since",
        "Students write 'because' or 'although', but neither of those can be followed by a naked noun phrase like 'the first rumble at noon'.",
        "SINCE + a point in time = from that moment until now, and it partners a present perfect: SINCE noon, the sky HAS NOT brightened."),
})

S["sections"]["D"]["word_box"] = ["forecast", "gust", "drench", "shelter", "visibility",
                                  "drought", "rainbow", "evaporate"]

S["sections"]["E"]["passage"] = (
    "Yesterday afternoon, a thunderstorm hit our estate without warning. The puddles was (1) "
    "everywhere and the drains overflowed into the corridor. The children quickly grabbed they're (2) "
    "raincoats and boots before rushing outside to splash in the puddles. The sky had turned a wierd "
    "(3) yellow-green colour before the rain began. By four o'clock, it rained so heavy (4) that the "
    "bus was delayed by forty minutes. The teachers (5) umbrellas turned inside out as soon as they "
    "stepped out of the school building."
)
set_err(S["sections"]["E"], 5, "teachers", "teachers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The umbrellas BELONG TO the teachers -> TEACHERS' umbrellas (apostrophe after the -s for a "
        "plural). One teacher: teacher's.")

# ============================== S49 ==============================
S = G["S49"]
S["sections"]["D"]["word_box"] = ["personnel", "simulate", "hazard", "evacuate", "apparatus",
                                  "extinguish", "casualty", "flammable"]

S["sections"]["E"]["passage"] = (
    "Last Friday, our class visited Bukit Timah Fire Station for a learning journey. The firefighters "
    "was (1) already dressed in their full gear when we arrived, ready to demonstrate a mock rescue. "
    "The officer in charge said its (2) essential to check your smoke alarm every month. He showed us "
    "a peice (3) of melted plastic - the result of leaving a phone charger plugged in overnight. A "
    "small electrical fire can spread rapid (4) throughout a room in just two minutes if nothing is "
    "done. Before we left, we lifted one of the rescuers (5) heavy breathing masks, which weighed "
    "almost five kilograms."
)
set_err(S["sections"]["E"], 5, "rescuers", "rescuers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The masks BELONG TO the rescuers -> RESCUERS' masks (apostrophe after the -s for a plural). "
        "One rescuer: rescuer's.")

# ============================== S50 ==============================
S = G["S50"]
q = qmap(S["sections"]["B"])["S50_B3"]
q["options"] = {"1": "too", "2": "far", "3": "most", "4": "very"}
q["trap_type"] = ("'Too longer', 'most longer' and 'very longer' are all impossible. Only one of these "
                  "words can strengthen a comparative that already ends in -er.")

S["sections"]["C"]["passage"] = (
    "We played five stones (1)________ the shade of the void deck every day after school. Kai placed "
    "the gasing top (2)________ the smooth concrete surface and gave it a strong spin. The children "
    "met (3)________ the corner of the field every Saturday morning to play chapteh. The kite flew "
    "(4)________ the tallest tree in the park before the wind changed direction. Priya hid the five "
    "stones bag (5)________ the bench so nobody would take it during the break. The rubber band rope "
    "stretched (6)________ the narrow gap between the two pillars perfectly. He ran (7)________ the "
    "courtyard and grabbed the chapteh before it landed. The slowest player had to stand (8)________ "
    "the line and wait for the next round."
)
set_cloze(S["sections"]["C"], {
    1: ("in",
        "Students write 'at' or 'under'. THE SHADE is a space you stand inside, and 'at the shade' is never English.",
        "IN + an enclosed space or an area you are surrounded by: IN the shade, IN the hall, IN the classroom."),
})

S["sections"]["D"]["word_box"] = ["agility", "heritage", "opponent", "retrieve", "traditional",
                                  "medal", "forfeit", "clumsy"]

S["sections"]["E"]["passage"] = (
    "Last Saturday, our class took part in the Traditional Games Carnival. The players was (1) lined "
    "up at the starting zone, each holding a top or a shuttlecock. They gripped there (2) tops "
    "tightly, waiting for the signal to begin. Every child wanted to acheive (3) the highest score "
    "and win the golden trophy. The teacher wrapped the gasing rope careful (4) around each top "
    "before handing it to the class. At the end of the day, the judges announced the winners (5) "
    "final scores and everyone cheered."
)
set_err(S["sections"]["E"], 5, "winners", "winners'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The scores BELONG TO the winners -> WINNERS' scores (apostrophe after the -s for a plural). "
        "One winner: winner's.")

# ============================== self-check ==============================
errs = []
for sid in ("S46", "S47", "S48", "S49", "S50"):
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
            errs.append(f"{sid}/{k}: an answer is used TWICE {used} - unsolvable in the renderer")
        wb = sec["word_box"]
        keys = list(wb.keys()) if isinstance(wb, dict) else list(wb)
        pool = list(wb.values()) if isinstance(wb, dict) else list(wb)
        if len(set(x.lower() for x in pool)) != len(pool):
            errs.append(f"{sid}/{k}: word_box contains the same word twice {pool} - the renderer disables both")
        if k == "D" and len(pool) < len(qs) + 3:
            errs.append(f"{sid}/D: word_box has {len(pool)} words for {len(qs)} blanks (need 3 distractors)")
        if k == "C" and len(pool) != len(qs):
            errs.append(f"{sid}/C: word_box has {len(pool)} words for {len(qs)} blanks (C is 8-for-8)")
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
    print("DRY OK - S46/S47/S48/S49/S50 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S46/S47/S48/S49/S50 fixes ->", SRC)
