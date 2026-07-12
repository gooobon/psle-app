#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S36~S40 정독(精讀) 검증에서 나온 결함 수정.

S36/C : blank4 'drove ___ the bridge' 는 across/over 가 둘 다 성립(정답이 둘). blank7(over)와 충돌.
        -> blank4 문장을 'hurried ___ the wide station concourse ... on the far side' 로 교체해
           across 만 성립하게 함. blank5(past) 문장에 'without stopping' 단서 추가.
S36/D : word_box 5개 = 빈칸 5개 -> 오답 0개. 빈칸에 절대 들어갈 수 없는 3개 추가(총 8).
S36/E1: learning_tip 이 지문에 없는 'twenty minutes' 를 말한다(지문은 five minutes) -> 교체.
S36/E4: 오류어가 'more crowder'(두 단어) -> 단어 하나('crowder')로 통일.
S36/E5: 'passengers's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(passengers -> passengers').

S37_A2: 'not to eat anything ___ for an hour' 는 chewy/solid 가 둘 다 성립 -> stem 에
        'such as toffee or gum' 예시를 넣어 chewy 만 성립하게 함.
S37_A3: 'spread a small amount of gel on her gum' 도 완전히 옳다 -> 정답이 둘.
        보기 'spread' -> 'polished' 로 교체.
S37_B1: 'Our family ___' 은 집합명사라 goes(단수)도 성립 -> 정답이 둘.
        주어를 'my parents and I' 로 바꿔 go 만 성립하게 함.
S37/C : ★ when/while/as 세 개가 서로의 자리에 다 들어간다(정답이 여럿). because/since 도 마찬가지.
        -> as 는 점진적 변화('___ the minutes passed'), since 는 현재완료+기점('has treated him ___
           he was six'), while 은 진행형('___ the dentist was working')으로 각각 유일 성립하게 지문 재작성.
S37/D : word_box 5개 = 빈칸 5개 -> 오답 3개 추가.
S37/E4: learning_tip 이 지문에 없는 'given stickers' 를 말한다 -> 교체.

S38/C : ★ blank3 'Mother sometimes calls ___ to help' 의 정답이 him 인데, 지문에서 Grandfather 가
        아직 등장하지 않아 지시대상이 없다(her 로도 읽힌다). -> Grandfather 를 먼저 소개하도록 지문
        재구성, 정답을 she/her/he/him/his/they/their/them 순으로 재배정.
S38/D : word_box 5개 = 빈칸 5개 -> 오답 3개 추가.

S39/C : blank1 'Leo loves ___ magic shows' 는 watching/to watch 가 둘 다 옳다 -> 동사를 ENJOYS 로
        교체(enjoy + -ing 만 성립). blank5 에 'At that very moment' 단서 추가.
S39/D : word_box 5개 = 빈칸 5개 -> 오답 3개 추가.
S39/E : ★ E4 의 오류어 'was' 가 첫 문장 'was brilliant' 에서 먼저 등장 -> Editing 렌더러의
        indexOf('was') 가 엉뚱한 자리에 밑줄을 친다. 첫 문장 재작성으로 선행 'was' 제거.
S39/E5: 오류어가 'more amazinger'(두 단어) -> 'amazinger' 한 단어로 통일.

S40_B4: 'saw that the students ___ their stretches before any of the events started' 는
        completed/had completed 가 둘 다 성립 -> 'by the time' 으로 바꿔 과거완료만 성립하게 하고
        정답 2 -> 3.
S40/C : blank1 'Kai loves ___' 는 running/to run 이 둘 다 옳다 -> ENJOYS 로 교체.
S40/D : word_box 5개 = 빈칸 5개 -> 오답 3개 추가.
S40/E2: ★ 오류어 'their' 가 첫 문장 'their hearts pounding' 에서 먼저 등장 -> indexOf 밑줄이 어긋난다.
        첫 문장에서 제거.
S40/E4: 'teams's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(winners -> winners').
S40/E5: 'they had runned' 의 correction 이 'ran' -> 고쳐도 'had ran' 이라 여전히 비문.
        지문을 'they runned their best race'(단순과거)로 바꿔 ran 이 정답이 되게 함.

공통: Editing 렌더러가 sentence.indexOf(wrongWord) 로 밑줄을 치므로 오류어의 '첫 등장'이 반드시
밑줄 자리여야 한다. 아래 self-check 가 이를 강제한다.
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

def set_tip(sec, blank, trap, tip):
    for it in e_items(sec):
        if it.get("blank_number") == blank:
            it["trap_type"] = trap
            it["learning_tip"] = tip

def set_cloze(sec, table):
    """table: {blank: (answer, trap, tip)}"""
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S36 ==============================
S = G["S36"]

S["sections"]["C"]["passage"] = (
    "Last Saturday, our family took the MRT for the first time in months. We stepped (1)________ the "
    "train carriage just before the doors closed with a soft chime. Father walked (2)________ the "
    "ticket machine at the platform to top up his EZ-Link card. The train passed (3)________ a long "
    "underground tunnel before emerging at the next brightly lit station. At Bishan, we hurried "
    "(4)________ the wide station concourse to reach the escalator on the far side. Later, the bus we "
    "boarded drove (5)________ the old market where my grandfather used to sell vegetables, without "
    "stopping. The bus travelled (6)________ Orchard Road, stopping at each bay to pick up passengers. "
    "At one stretch, the MRT track is built (7)________ the expressway, so you can look down at the "
    "cars below. Finally, the feeder bus loops (8)________ the entire estate before returning us to "
    "the interchange near our block."
)
set_cloze(S["sections"]["C"], {
    4: ("across",
        "Students write 'over' or 'through'. The concourse is a flat, open space with a far side - nothing encloses it, and nothing is being crossed above.",
        "ACROSS = from one side of an open surface to the other. We hurried ACROSS the concourse = from this side to the far side."),
    5: ("past",
        "Students write 'around' or 'along'. The bus neither circles the market nor follows it - it goes by and leaves it behind.",
        "PAST = alongside and beyond something, without stopping. We drove PAST the old market = we went by it and carried on."),
})

S["sections"]["D"]["word_box"] = ["commute", "congestion", "detour", "fare", "interchange",
                                  "punctual", "reckless", "shortcut"]

set_tip(S["sections"]["E"], 1,
        "Students write 'their' (belonging to them) when the sentence needs 'there' (at that place).",
        "THEIR = belonging to them (possessive). THERE = at that place. 'We waited THERE for five minutes' "
        "= at that place, on the platform. Not 'their'.")
S["sections"]["E"]["passage"] = (
    "Last Monday, our class went on a learning journey by MRT. We met at the platform and waited their "
    "(1) for five minutes until the train arrived. Our teacher walked quick (2) to the front of the "
    "queue and reminded us to tap our cards. When we boarded, we realised that the seats was (3) all "
    "taken, so we held the handrails instead. The afternoon train was more crowder (4) than the morning "
    "train because many students were heading home at the same time. At the end of the trip, the "
    "teacher collected all the passengers (5) MRT cards and kept them safely in her bag."
)
set_err(S["sections"]["E"], 4, "crowder", "crowded",
        "Comparative form - long adjectives take 'more', never an -er ending",
        "Students add -er to the adjective even though MORE is already in front of it, doubling the comparison.",
        "CROWDED is a long adjective: MORE CROWDED. Never add -er as well - 'more crowder' compares twice.")
set_err(S["sections"]["E"], 5, "passengers", "passengers'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The cards BELONG TO the passengers -> PASSENGERS' cards (apostrophe after the -s for a plural). "
        "Singular: passenger's.")

# ============================== S37 ==============================
S = G["S37"]
q = qmap(S["sections"]["A"])["S37_A2"]
q["stem"] = ("After the filling, the dentist told Maya not to eat anything ________, such as toffee or "
             "gum, for at least an hour.")
q["trap_type"] = ("'Sweet' is about flavour, and 'soft' food is exactly what she may eat. TOFFEE and GUM "
                  "are sticky and need long chewing - they pull at a new filling.")

q = qmap(S["sections"]["A"])["S37_A3"]
q["options"]["2"] = "polished"
q["trap_type"] = ("'Poured' suits liquid from a container; 'polished' suits shoes and floors; 'swallowed' "
                  "sends it down the throat. APPLIED = put a substance carefully onto a surface.")

q = qmap(S["sections"]["B"])["S37_B1"]
q["stem"] = ("Every six months, my parents and I ________ to the dental clinic for a routine check-up.")
q["trap_type"] = ("'Every six months' = regular habit = simple present. 'My parents and I' = plural, so "
                  "the -s form is wrong. Students also match the verb to 'I' alone.")
q["learning_tip"] = ("'Every six months' = habit = simple present. 'My parents and I' is plural -> GO. The "
                     "-s form belongs only to a singular subject (he, she, it).")

S["sections"]["C"]["passage"] = (
    "(1)________ Liam was nervous about his dentist appointment, he walked in calmly and sat down in "
    "the waiting room. His heart beat faster (2)________ the dentist switched on the drill. Liam "
    "counted the ceiling tiles (3)________ the dentist was working carefully on his tooth. He could "
    "not feel any pain (4)________ the anaesthetic had numbed the area around his gum. The dentist "
    "has treated Liam (5)________ he was six years old, so she knows exactly how nervous he gets and "
    "always speaks to him in a calm, steady voice. She told him to raise his hand (6)________ he felt "
    "any discomfort during the procedure. She warned him that the decay would spread further "
    "(7)________ the filling was done that day. (8)________ the minutes passed, the tightness in his "
    "shoulders slowly eased, and by the time he left the clinic he felt a wave of relief."
)
set_cloze(S["sections"]["C"], {
    2: ("when",
        "Students write 'while'. Switching on a drill is one sudden point in time, not a stretch of time, so a word for two ongoing actions cannot fit.",
        "WHEN = at the moment that something happened. His heart beat faster WHEN the drill was switched on = at that exact instant."),
    3: ("while",
        "Students write 'when'. 'Was working' is an ongoing action, and the counting ran alongside it, so a point-in-time word is wrong.",
        "WHILE = two actions running at the same time. He counted tiles WHILE the dentist was working = both were going on together."),
    5: ("since",
        "Students write 'because'. 'Has treated' reaches from the past up to today, and 'he was six' is the starting point - a reason word cannot mark a starting point.",
        "SINCE = from that time until now, especially after a present perfect: she HAS TREATED him SINCE he was six years old."),
    8: ("as",
        "Students write 'when' or 'while'. The easing of his shoulders and the passing of the minutes happen gradually, side by side.",
        "AS = at the same time as, used for gradual, side-by-side change: AS the minutes passed, the tightness slowly eased."),
})

S["sections"]["D"]["word_box"] = ["braces", "cavity", "crooked", "enamel", "floss", "molar",
                                  "numb", "plaque"]

set_tip(S["sections"]["E"], 4,
        "'The children' is plural. Students write 'was' (singular) by matching the verb to the nearest word.",
        "'The children' = plural -> WERE very cooperative during their check-up. WAS is only for singular subjects.")

# ============================== S38 ==============================
S = G["S38"]
S["sections"]["C"]["passage"] = (
    "My grandmother is eighty years old, but (1)________ still wakes up at five every morning to "
    "prepare breakfast. I visit (2)________ every Saturday morning without fail. Grandfather is "
    "eighty-four, and (3)________ still tends the small garden behind the flat every day. When the "
    "bags of soil are heavy, Mother calls (4)________ to help carry them from the lift. (5)________ "
    "hands are rough from years of work, but they are always warm when he holds mine. Together, "
    "(6)________ have taught me more about life than any book could ever do. (7)________ stories "
    "about growing up in a harder Singapore always leave me thinking for days. I hope to spend as "
    "many afternoons with (8)________ as I can before those stories are forgotten."
)
set_cloze(S["sections"]["C"], {
    3: ("he",
        "Students write 'his' (possessive) instead of 'he' (subject). HE is the subject of 'tends'.",
        "HE = subject pronoun for a male. Grandfather STILL TENDS the garden - the subject is HE. 'His tends the garden' is wrong."),
    4: ("him",
        "Students write 'he' (subject form) instead of 'him' (object form after the verb 'calls').",
        "After the verb 'calls', use the OBJECT pronoun: calls HIM to help. 'Calls he' is wrong. HIM is the object pronoun for a male."),
})

S["sections"]["D"]["word_box"] = ["ancestor", "cherish", "frail", "generation", "heritage",
                                  "reminisce", "stubborn", "wisdom"]

# ============================== S39 ==============================
S = G["S39"]
S["sections"]["C"]["passage"] = (
    "Leo enjoys (1)________ magic shows on video every evening before bed. He (2)________ every "
    "magician's hand carefully to try to spot the moment the trick happens. Last Friday, Leo "
    "(3)________ a live magic show at the community centre for the very first time. While he "
    "(4)________ the magician closely, a dove appeared from nowhere and landed on the man's hat. At "
    "that very moment, his friends (5)________ the same trick from different angles, hoping to catch "
    "any movement that would give away the secret. Leo wants (6)________ as many different magicians "
    "as possible before he turns twelve. His teacher says everyone should (7)________ a live magic "
    "show at least once in their life because no video can capture the feeling of being right there "
    "in the room. Right now, Leo (8)________ a slow-motion recording of the coin trick to see if he "
    "can finally figure out the secret."
)
set_cloze(S["sections"]["C"], {
    1: ("watching",
        "Students write 'to watch'. ENJOY is one of the verbs that must be followed by the -ing form - 'enjoys to watch' is never correct.",
        "ENJOY + verb-ing: enjoys WATCHING magic shows. Same pattern: enjoy reading, enjoy swimming. The infinitive belongs after 'want', not after 'enjoy'."),
    5: ("were watching",
        "Students write 'watched' (simple past). 'At that very moment' marks an action already in progress, and 'his friends' is plural.",
        "Plural subject + action in progress in the past = WERE + verb-ing. His friends WERE WATCHING at that very moment."),
})

S["sections"]["D"]["word_box"] = ["applaud", "costume", "illusion", "misdirection", "rehearsal",
                                  "reveal", "sleight", "spectator"]

S["sections"]["E"]["passage"] = (
    "Last Saturday, our school hall hosted a wonderful magic show. The final trick moved to (1) fast "
    "for anyone to follow with their eyes. We watched careful (2) as the magician cut the rope into "
    "halfs (3) and then magically rejoined it. The audience members was (4) absolutely stunned when "
    "the rabbit appeared from the empty hat. Everyone agreed that the second half of the show was "
    "more amazinger (5) than the first, and we hoped the school would invite the same magician again "
    "next year."
)
set_err(S["sections"]["E"], 5, "amazinger", "amazing",
        "Comparative form - long adjectives take 'more', never an -er ending as well",
        "Students add -er to the adjective even though MORE is already in front of it, comparing twice over.",
        "AMAZING is a multi-syllable adjective: MORE AMAZING. You may use 'more' OR an -er ending, never both.")

# ============================== S40 ==============================
S = G["S40"]
q = qmap(S["sections"]["B"])["S40_B4"]
q["stem"] = ("The PE teacher saw that the students ________ their stretches by the time the first event "
             "started.")
q["answer"] = "3"
q["trap_type"] = ("'By the time' forces the earlier of two past actions into the past perfect. Students "
                  "write the simple past 'completed', which cannot show which action came first.")
q["learning_tip"] = ("BY THE TIME + past = the other action must be PAST PERFECT (had + past participle). "
                     "The stretches were finished BEFORE the first event started.")

S["sections"]["C"]["passage"] = (
    "Kai enjoys (1)________ more than any other sport on the school calendar. He (2)________ fifty "
    "laps every morning before school as part of his dedicated training routine. Last Sports Day, Kai "
    "(3)________ the anchor leg and helped his team win the relay by a single second. While Kai "
    "(4)________ the final stretch, the crowd began to cheer loudly from the sidelines. His teammates "
    "(5)________ alongside him on the track, shouting encouragement at every step. Kai already plans "
    "(6)________ in the national school athletics championship next year if he qualifies. His coach "
    "says every athlete should (7)________ at least three competitive races before a major "
    "championship. Right now, Kai (8)________ his final practice lap before the event next week."
)
set_cloze(S["sections"]["C"], {
    1: ("running",
        "Students write 'to run'. ENJOY must be followed by the -ing form - 'enjoys to run' is never correct.",
        "ENJOY + verb-ing: enjoys RUNNING. Same pattern: enjoy cycling, enjoy swimming. The infinitive belongs after 'plans', not after 'enjoys'."),
})

S["sections"]["D"]["word_box"] = ["agile", "baton", "compete", "endurance", "exhausted", "hurdle",
                                  "spectators", "trophy"]

S["sections"]["E"]["passage"] = (
    "On Sports Day, the runners was (1) all lined up at the starting blocks, with hearts pounding in "
    "excitement. The judges stood their (2) near the finish line, holding clipboards and stopwatches. "
    "During the relay, each runner passed the baton quick (3) to the next teammate without slowing "
    "down. After the race, the coach read out the winners (4) names over the loudspeaker. Together, "
    "the team runned (5) their best race of the year and broke the school record."
)
set_err(S["sections"]["E"], 4, "winners", "winners'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The names BELONG TO the winners -> WINNERS' names (apostrophe after the -s for a plural). "
        "Singular: winner's.")
set_err(S["sections"]["E"], 5, "runned", "ran",
        "Irregular past tense - run -> ran (not runned)",
        "Students add -ed to 'run', producing 'runned'. 'Run' is irregular: run -> ran.",
        "'Run' is irregular: run -> RAN. Never write 'runned'. Other irregular verbs: swim -> swam, "
        "sing -> sang, throw -> threw.")

# ============================== self-check ==============================
errs = []
for sid in ("S36", "S37", "S38", "S39", "S40"):
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
    print("DRY OK - S36/S37/S38/S39/S40 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S36/S37/S38/S39/S40 fixes ->", SRC)
