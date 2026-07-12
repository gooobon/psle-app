#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S56~S60 정독(精讀) 검증에서 나온 결함 수정. (마지막 배치)

S56/C : each/every, enough/plenty of, all/most 가 서로 바꿔 넣어도 성립 -> 답이 유일하지 않다.
        (trap_type 이 스스로 "Students write 'each' (also correct in some contexts)" 라고 자백)
        -> 지문 재작성: every=single+without exception, each=of the two pilots('every of' 불가),
        most='but a few still rush in', enough=서술 자리('is barely ___'), plenty of='far more than needed'.
        지문 본문에 노출돼 있던 'all snacks' 의 all 도 제거.
S56/D : word_box 5개 = 빈칸 5개 (오답 0개) -> 어느 칸이든 남은 단어를 넣으면 되는 구조.
        오답 3개(passport/seatbelt/trolley) 추가해 총 8개.
S56/E5: 'pilots's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(pilots -> pilots')으로 교체.
        (앞부분 'the pilot announced' 는 'pilots' 를 부분일치로 잡지 않으므로 밑줄 위치 안전)

S57_A5: 'a significant ___ in the colour of the liquid' 에 보기 'change' 가 정답 'reaction' 보다
        오히려 자연스럽다 -> 정답이 둘. stem 을 화학반응만 성립하도록 교체하고 'change'->'silence'.
S57/C : need to / have to / must / ought to 가 서로 대체 가능(진짜 동의어) -> 답 유일성 붕괴.
        -> box 의 'need to' 를 'may'(허가)로 교체하고 지문을 문법적으로 유일하게 결정되도록 재작성:
        have to 는 'students will ___ get permission'(will 뒤 = 다른 조동사 불가),
        ought to 는 'Nobody will punish you ... simply good practice',
        may 는 'only if the teacher gives you a pass', must 는 'without exception; no excuses'.
S57/D : 오답 0개 -> 오답 3개(evaporate/goggles/thermometer) 추가.
S57/E5: 'groups's' -> 'groups' (아포스트로피 누락형).

S58_A4: 'The ___ at the wet market' 인데 정답이 bazaar(=시장) -> "시장에 있는 시장" 이 되어 어색.
        stem 에서 'at the wet market' 제거.
S58/C4: 'This family bought vegetables ... (4) thirty years' 는 단순과거+for 로 어색 ->
        'has bought' 로 교정. C8 'by' 가 'at' 과 겹칠 수 있어 'never later than that' 단서 추가.
        본문에 그대로 노출돼 있던 'for'(come for weekly shopping) 제거.
S58/D : 오답 0개 -> 오답 3개(aquarium/receipt/sunburnt) 추가.
S58/E2: 지문이 'sold hear, (2)' 로 오류어와 번호 사이에 쉼표가 끼어 있다 -> 'hear (2),' 로 정리.
S58/E4: 'called out loud' 는 사실 틀린 표현이 아니다(=aloud) -> 'called loud' 로 바꿔 오류를 명확히 함.
S58/E5: 'vendors's' -> 'vendors'.
S58/E3: 'the stall near the old peir painting on the wall' 이 뜻이 통하지 않음 -> 문장 교체.

S59/C2·C6: quickly / fast 가 서로 대체 가능 -> box 의 'quickly' 를 'immediately' 로 교체하고
        C2 에 'do not wait even a second', C6 에 'race around the world within hours' 단서 부여.
        C4(well)/C7(happily) 도 서로 바꿔도 말이 되어 'scoring high marks' / 'enjoying it without
        fear or worry' 단서를 각각 심었다.
S59/D : 오답 0개 -> 오답 3개(keyboard/printer/trustworthy) 추가.
S59/E5: ★ 'students's' 를 아포스트로피 누락형으로 고치면 'students' 가 지문 앞부분('for all primary
        students', 'The students was')에서 먼저 등장 -> Editing 렌더러의 indexOf 밑줄이 엉뚱한 자리에
        걸린다. 소유주 명사를 'organisers' 로 교체(앞에 등장하지 않는 명사).

S60/C7: 'Her parents always told her (7)___ big' 인데 정답이 'dream'(원형) -> 'told her dream big' 비문.
        learning_tip 은 "After TOLD HER TO..." 라며 지문에 없는 to 를 설명하고 있었다 -> 지문에 to 삽입.
S60/D3: 지문 본문에 'A good role model can ___ you' 라고 정답(role model)이 그대로 노출 ->
        'Such a person can ___ you' 로 교체. 오답 0개 -> 오답 3개(abandon/obstacle/reluctant) 추가.
S60/E2: ★ 'she could barely bare (2)' — 'barely' 안에 'bare' 가 먼저 들어 있어 indexOf 가 'barely' 의
        일부에 밑줄을 친다 -> 'hardly' 로 교체.
S60/E5: 'childrens' -> children's' 는 유지(불규칙 복수 소유격 = P3 범위, 학생이 실제로 저지르는 오류).

공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 반드시
밑줄 자리여야 한다. 아래 self-check 가 이를 강제하고, Cloze 정답이 두 번 쓰이는지도 검사한다.
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
    """table: {blank: (answer, trap, tip)}"""
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S56 ==============================
S = G["S56"]

S["sections"]["C"]["passage"] = (
    "(1)________ single passenger must show a boarding pass at the gate, without exception. "
    "(2)________ of the two pilots carries a separate checklist into the cockpit. "
    "(3)________ passengers must fasten their seatbelts during turbulence, from the youngest child "
    "to the oldest adult. (4)________ travellers arrive at the airport two hours before their "
    "flight, but a few still rush in at the last minute. Thirty minutes is barely (5)________ to "
    "clear security, so do not leave it too late. The lounge has (6)________ seating - far more "
    "chairs than it ever needs. There is (7)________ food allowed past the security checkpoint; "
    "snacks must be thrown away. The crew checked the overhead lockers, and (8)________ of the bags "
    "were oversized, so boarding went smoothly."
)
set_cloze(S["sections"]["C"], {
    1: ("every",
        "Students write 'each'. 'Single' and 'without exception' point to the rule covering the whole group; 'each of' would also be impossible here without 'of'.",
        "EVERY + singular noun = all of them, nobody left out. EVERY single passenger = the rule has no exceptions. EVERY can never be followed by 'of'."),
    2: ("each",
        "Students write 'every'. But the blank is followed by 'OF the two pilots', and 'every' can never come before 'of'.",
        "EACH + OF + a group = pick them out one by one. EACH of the two pilots = first one pilot, then the other. Only EACH can take 'of'."),
    3: ("all",
        "Students write 'every' (which needs a singular noun) or 'most' (which would leave some passengers unbuckled).",
        "ALL + plural noun = the whole group together. ALL passengers = from the youngest child to the oldest adult, without a single exception."),
    4: ("most",
        "Students write 'all'. The second half says 'but a few still rush in at the last minute', so it cannot be every single traveller.",
        "MOST = more than half, but not everybody. MOST travellers arrive early, but a few do not. MOST is not the same as ALL."),
    5: ("enough",
        "Students write 'plenty of'. The blank stands alone after 'is', with no noun behind it, so a phrase ending in 'of' cannot fit.",
        "ENOUGH = as much as is needed, no more. 'Thirty minutes is barely ENOUGH' - ENOUGH can stand on its own after the verb 'is'."),
    6: ("plenty of",
        "Students write 'enough' (just sufficient). The dash says 'far more chairs than it ever needs' - this is a surplus, not the minimum.",
        "PLENTY OF = a large amount, more than is needed. PLENTY OF seating = far more chairs than anyone will use."),
    7: ("no",
        "Students write 'none'. The blank sits directly in front of the noun 'food', and 'none' is a pronoun that cannot touch a noun.",
        "NO + noun = zero of that thing. NO food is allowed = not any food at all. NO is an adjective; it must be followed by a noun."),
    8: ("none",
        "Students write 'no'. The blank is followed by 'of the bags', and 'no of the bags' is not English.",
        "NONE OF + a group = not a single one of them. NONE of the bags were oversized. NONE stands alone; NO must lean on a noun."),
})

S["sections"]["D"]["word_box"] = ["altitude", "cockpit", "departure", "passport", "runway",
                                  "seatbelt", "trolley", "turbulence"]

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the pilots's (5) voices", "the pilots (5) voices")
set_err(S["sections"]["E"], 5, "pilots", "pilots'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The voices BELONG TO the pilots -> PILOTS' voices (apostrophe after the -s for a plural "
        "owner). Singular: pilot's voice.")

# ============================== S57 ==============================
S = G["S57"]
q = qmap(S["sections"]["A"])["S57_A5"]
q["stem"] = ("When the acid touched the metal, a fierce ________ took place - the mixture bubbled, "
             "hissed and gave off heat.")
q["options"]["4"] = "silence"
q["trap_type"] = ("'Smell', 'weight' and 'silence' cannot 'take place'. Only a chemical process can. "
                  "(The old option 'change' was removed: 'a change took place' was equally correct.)")

S["sections"]["C"]["word_box"] = ["must", "may", "ought to", "have to", "is able to", "used to",
                                  "had better", "would rather"]
S["sections"]["C"]["passage"] = (
    "The science laboratory has safety rules that every student (1)________ follow without "
    "exception; there are no excuses. You (2)________ leave the laboratory early only if the "
    "teacher gives you a pass. Nobody will punish you for forgetting, but a careful scientist "
    "(3)________ label every sample clearly, because it is simply good practice. If an experiment "
    "takes more than one hour, students will (4)________ get permission from the teacher before "
    "they carry on. With enough practice, a Primary Three pupil (5)________ set up a simple circuit "
    "without any help at all. Our laboratory (6)________ have only one microscope, but now there "
    "are eight of them for the whole class. You (7)________ write down your prediction before you "
    "begin, or the teacher will not accept your report. When they are given a choice, most pupils "
    "(8)________ do a hands-on activity than copy notes."
)
set_cloze(S["sections"]["C"], {
    1: ("must",
        "Students write 'ought to' (mere advice). 'Rules ... without exception' and 'no excuses' demand the strongest obligation.",
        "MUST = the strongest obligation: a rule you have no choice about. Note that 'have to' cannot fit here - a singular subject would need 'has to'."),
    2: ("may",
        "Students write 'must' or 'had better'. Leaving early is not a duty; it is something you are ALLOWED to do, and only on one condition.",
        "MAY = permission. You MAY leave early only if the teacher gives you a pass = you are allowed to, not forced to."),
    3: ("ought to",
        "Students write 'must'. But the sentence says nobody will punish you - this is advice about good practice, not a rule with a penalty.",
        "OUGHT TO = it is the right thing to do (advice). Nobody punishes you for ignoring it, but you should still do it."),
    4: ("have to",
        "Students write 'must'. The word WILL is already printed before the blank, and 'will must' is impossible - two modal words cannot stand together.",
        "HAVE TO = an obligation imposed from outside, and it is the only obligation word that can follow another modal: will HAVE TO, might HAVE TO."),
    5: ("is able to",
        "Students write 'can' (not in the box) or 'must'. The sentence is about skill gained with practice, not about duty.",
        "IS ABLE TO = has the skill to do it. The subject is one pupil, so the verb is IS, not ARE."),
    6: ("used to",
        "Students write 'must'. 'Only one microscope ... but now there are eight' contrasts the past with the present.",
        "USED TO = something that was true in the past but is not true now. The lab USED TO have one microscope; today it has eight."),
    7: ("had better",
        "Students write 'ought to'. The clause after the comma - 'or the teacher will not accept your report' - is a warning of consequences.",
        "HAD BETTER = strong advice with a warning attached: do it, OR something bad follows."),
    8: ("would rather",
        "Students write 'ought to'. The word THAN at the end shows two options being weighed against each other.",
        "WOULD RATHER ... THAN ... = prefer one thing to another. WOULD RATHER do an activity THAN copy notes."),
})

S["sections"]["D"]["word_box"] = ["conclusion", "evaporate", "experiment", "goggles", "hypothesis",
                                  "observe", "thermometer", "variable"]

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the groups's (5) observations", "the groups (5) observations")
set_err(S["sections"]["E"], 5, "groups", "groups'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The observations BELONG TO the groups -> GROUPS' observations (apostrophe after the -s for a "
        "plural owner). Singular: group's observations.")

# ============================== S58 ==============================
S = G["S58"]
q = qmap(S["sections"]["A"])["S58_A4"]
q["stem"] = ("The ________ was lively and colourful - stalls stretched from one end of the hall to "
             "the other, selling spices, fruit and cloth.")

S["sections"]["C"]["passage"] = (
    "The wet market opens (1)________ five o'clock each morning, when the delivery trucks arrive. "
    "The busiest day is (2)________ Sunday, when whole families come to do their weekly shopping. "
    "Durian season arrives (3)________ June, bringing large crowds to every stall. My neighbour has "
    "bought vegetables from the same stall (4)________ thirty years. The original market building "
    "was put up over fifty years (5)________, when this area was still a fishing village. Most "
    "produce is delivered (6)________ twelve hours of harvesting so that it stays fresh. The smell "
    "of spices fills every corner (7)________ the whole day, from dawn until closing. The vendor "
    "promises that morning orders will be ready (8)________ noon - never later than that."
)
set_cloze(S["sections"]["C"], {
    4: ("for",
        "Students write 'since' (not in the box) or 'within'. 'Thirty years' is a length of time, not a starting point.",
        "FOR + a length of time = how long something has lasted. Has bought FOR thirty years. SINCE would need a starting date."),
    8: ("by",
        "Students write 'at' (an exact point). The words 'never later than that' show a deadline: at that time or sooner.",
        "BY + a time = at that time or before it (a deadline). Ready BY noon = ready at noon or earlier. AT noon = at that exact minute."),
})

S["sections"]["D"]["word_box"] = ["aquarium", "bargain", "display", "receipt", "seasonal", "stall",
                                  "sunburnt", "vendor"]

S["sections"]["E"]["passage"] = (
    "Last Saturday morning, my grandmother took me to the wet market near our flat for the first "
    "time. The vegetables was (1) laid out neatly on wide bamboo trays, and the fish glittered "
    "under the bright lights. 'The freshest prawns are sold hear (2), not at the supermarket!' "
    "Grandma said, pointing at a crate of prawns that had been landed at the old peir (3) that very "
    "morning. One uncle called loud (4) to passing customers, waving a bunch of fresh spinach and "
    "offering it at a special price. By the time we left, the vendors (5) trays were nearly empty "
    "and the morning crowd was beginning to thin out."
)
set_err(S["sections"]["E"], 4, "loud", "loudly",
        "Adverb required after an action verb (called)",
        "Students write 'loud' (adjective) after the action verb 'called'. An action needs an adverb.",
        "After an action verb, use an ADVERB: called LOUDLY. 'Loud' describes a noun (a loud voice); "
        "LOUDLY describes HOW he called.")
set_err(S["sections"]["E"], 5, "vendors", "vendors'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The trays BELONG TO the vendors -> VENDORS' trays (apostrophe after the -s for a plural "
        "owner). Singular: vendor's tray.")

# ============================== S59 ==============================
S = G["S59"]
S["sections"]["C"]["word_box"] = ["immediately", "carefully", "silently", "well", "fast", "hard",
                                  "happily", "gently"]
S["sections"]["C"]["passage"] = (
    "Using the internet safely takes good habits. Read every message (1)________ before you click "
    "on any link, especially if the sender is a stranger. If a message looks suspicious, "
    "(2)________ close the window - do not wait even a second - and tell a trusted adult. "
    "Cyberbullying can happen (3)________: victims may suffer for months without anyone else "
    "noticing. Pupils who understand online safety usually perform (4)________ in the school's "
    "cyber quiz, scoring high marks. Software engineers work (5)________, often late into the "
    "night, to build firewalls that block harmful content. False news spreads (6)________: a "
    "made-up story can race around the world within hours. Children who learn safe habits early use "
    "the internet (7)________, enjoying it without fear or worry. When you correct a friend who has "
    "shared a false story, do it (8)________ so that nobody feels embarrassed."
)
set_cloze(S["sections"]["C"], {
    1: ("carefully",
        "Students write 'slowly' (not in the box) or 'fast'. The point is attention, not speed: an unknown sender is a risk.",
        "CAREFULLY = with full attention, taking no risks. Read CAREFULLY before you click on anything."),
    2: ("immediately",
        "Students write 'fast'. The dash spells out the meaning: DO NOT WAIT EVEN A SECOND - this is about how SOON you act, not how fast you move.",
        "IMMEDIATELY = right now, with no delay. Compare FAST, which is about the speed of a movement, not the moment it starts."),
    3: ("silently",
        "Students write 'quietly' (not in the box). Victims suffer for months without anyone else noticing - no sound, no sign.",
        "SILENTLY = making no sound and leaving no sign. Cyberbullying can go on SILENTLY for months."),
    4: ("well",
        "Students write 'good' (an adjective, not in the box). The blank follows the verb 'perform', and the clue is 'scoring high marks'.",
        "WELL = the adverb partner of 'good'. They perform WELL. Never 'perform good' - a verb needs an adverb."),
    5: ("hard",
        "Students write 'hardly', which means almost not at all - the exact opposite. The engineers stay late into the night.",
        "HARD (adverb) = with great effort. Work HARD. HARDLY = almost not at all. One letter changes everything."),
    6: ("fast",
        "Students write 'immediately'. The clue is speed of travel: a made-up story can race around the world within hours.",
        "FAST (adverb) = at great speed, and it never takes -ly. News spreads FAST. IMMEDIATELY answers 'how soon', FAST answers 'how quickly'."),
    7: ("happily",
        "Students write 'well'. The clue is 'enjoying it without fear or worry' - a feeling, not a skill level.",
        "HAPPILY = in a cheerful, contented way. Children who feel safe use the internet HAPPILY."),
    8: ("gently",
        "Students write 'carefully'. The aim is that nobody feels embarrassed - the correction must be soft and kind.",
        "GENTLY = in a soft, kind way that does not hurt anyone's feelings. Correct a friend GENTLY."),
})

S["sections"]["D"]["word_box"] = ["anonymous", "cyberbully", "digital", "keyboard", "password",
                                  "printer", "screen time", "trustworthy"]

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the students's (5) feedback forms were collected, and many said they felt more confident about staying safe online.",
    "the organisers (5) laptops were packed away, and many students said they felt more confident about staying safe online.")
set_err(S["sections"]["E"], 5, "organisers", "organisers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The laptops BELONG TO the organisers -> ORGANISERS' laptops (apostrophe after the -s for a "
        "plural owner). Singular: organiser's laptop.")

# ============================== S60 ==============================
S = G["S60"]
S["sections"]["C"]["passage"] = S["sections"]["C"]["passage"].replace(
    "Her parents always told her (7)________ big",
    "Her parents always told her to (7)________ big")
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 7:
        it["trap_type"] = ("Students write 'dreams' or 'dreaming'. The word TO is printed in front of "
                           "the blank, and only a plain verb can follow it.")
        it["learning_tip"] = ("TO + base verb = the infinitive. Told her TO DREAM big. After 'to', a "
                              "verb never carries -s or -ing.")

S["sections"]["D"]["passage"] = S["sections"]["D"]["passage"].replace(
    "A good role model can (3)________ you", "Such a person can (3)________ you")
S["sections"]["D"]["word_box"] = ["abandon", "ambition", "inspire", "obstacle", "passion",
                                  "reluctant", "role model", "strive"]

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "she could barely bare (2)", "she could hardly bare (2)")

# ============================== self-check ==============================
errs = []
for sid in ("S56", "S57", "S58", "S59", "S60"):
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
            errs.append(f"{sid}/{k}: a cloze answer is used TWICE {used}")
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
    print("DRY OK - S56/S57/S58/S59/S60 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S56/S57/S58/S59/S60 fixes ->", SRC)
