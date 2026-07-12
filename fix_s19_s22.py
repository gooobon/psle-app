#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S19~S22 정독(精讀) 검증에서 나온 결함 수정.

S19_A1 : 'as ___ as a mirror' 의 단서가 '반사'뿐 -> smooth/shiny 를 가리키는데 정답은 slippery.
         단서를 '차가 미끄러져 멈추지 못했다'로 교체해 slippery 만 성립하게 함.
S19_B8 : stem 이 '________ repaired by the building manager' -> 정답 'was repaired' 를 넣으면
         'was repaired repaired'. 빈칸 뒤의 repaired 삭제.
S19/C  : ★ 지문이 통째로 다른 문제 것(context_check 가 원래 지문을 그대로 보존하고 있다).
         정답 대입 시 'students crossing the road carefully'(비문), 'a young boy nearly crosses',
         'the lollipop lady crossed ... right now' 등 8개 중 7개가 비문.
         context_check/learning_tip 이 가리키는 원래 지문으로 재작성. 정답 8개 유지.
         (빈칸1은 문두 대문자 문제를 피하려고 'that ___ a busy road...' 로 문중 배치)
S19/D  : 보기 5개 = 빈칸 5개(오답 0개) -> 소거법으로 다 맞힌다. 오답 3개 추가.
S19/E  : E3 오류어 'safe' 가 'we must always be safe' -> 고치면('be safely') 오히려 비문.
         게다가 지문 앞의 'safety workshop' 때문에 indexOf('safe') 가 밑줄자리보다 먼저 걸린다.
         E5 'speakers's' 는 실재하지 않는 형태. 지문 재작성 + 오류 재설계
         (here/runned/careful/taked/pupils).

S20_B1 : 'Nobody ... ___ a real meteorite BEFORE' -> 성립하는 보기가 하나도 없다
         (touches=비문, have touched=수 불일치). stem 을 단수 현재로 성립하게 교체.
S20/C  : ★ S19/C 와 같은 병. 'Every child exploring about space travel' 등 8개 중 6개가 비문.
         context_check 가 가리키는 원래 지문으로 재작성. 정답 유지.
S20/D  : ★ 정답과 빈칸이 어긋나 있다. blank1='its own path around the Sun' 인데 정답 galaxy,
         blank2='thin layer of gases' 인데 정답 orbit ... 5개 중 4개 비문(tip 은 정답과 일치).
         지문 순서를 정답(galaxy/orbit/satellite/atmosphere/crater)에 맞춰 재작성. 오답 3개 추가.
S20/E  : E3 오류어 'was' 의 첫 등장이 밑줄자리가 아니다('the first telescope WAS pointed').
         E5 'scientists's'. 지문 재작성.

S21/D  : ★ 정답과 빈칸이 어긋나 있다. blank1='a piece of cloth stretched over a frame'(=canvas)
         인데 정답 sketch, blank2='a quick pencil drawing'(=sketch)인데 정답 canvas.
         blank3/4(texture/inspiration)도 서로 뒤바뀜. 지문을 정답 순서에 맞춰 재작성. 오답 3개 추가.
S21/E  : E2 'glueing' 은 사전에 실린 변이형이라 '틀렸다'고 단정할 수 없고, 같은 문장의
         'split the glue'(spilt 가 맞다)는 고치지도 않는다 -> 오류를 'cuting'(자음 중복 규칙)으로 교체.
         E3 의 trap/tip 이 지문에 없는 'the colours' 를 설명. E5 'students's' 는 비실전이며,
         'students' 는 지문 앞에 이미 나와 indexOf 가 먼저 걸린다 -> 'pupils' 로 교체.
S21/C  : 결함 없음(정답 8개 전부 대입 성립). 손대지 않는다.

S22_A3 : 'ready to ___ at the school concert' — show off 는 목적어를 요구하고, tip 도
         'SHOW OFF his piano skills' 로 목적어를 쓴다. stem 에 목적어를 넣어 유일해로 만듦.
S22/C  : blank3 의 정답 'him' 이 가리킬 사람(Raju)이 그 다음 문장에서야 등장 -> 선행사 없는 대명사.
         Raju 를 blank3 앞에서 소개하도록 지문 재배열. 정답 8개 유지.
S22/D  : blank2 정답이 rehearsal 인데 지문에 '(2)___ after rehearsal' 로 정답이 그대로 인쇄돼 있다.
         'one long (2)___ after another' 로 교체(정답 rehearsal 유지 = 이전 세션 수정 보존).
         blank3 의 trap/tip 이 아직 옛 상태('blank 2 와 3 이 같은 단어')를 설명 -> trembled 설명으로 교체.
         보기 5개(오답 0개) -> 오답 3개 추가.
S22/E  : E5 'musicians's' -> 아포스트로피 누락형.

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
            return
    raise SystemExit("no editing item with blank %s" % blank)

def set_cloze(sec, blank, ans=None, trap=None, tip=None, ctx=None):
    for it in sec["questions"]:
        if it.get("blank_number") == blank:
            if ans is not None: it["answer"] = ans
            if trap is not None: it["trap_type"] = trap
            if tip is not None: it["learning_tip"] = tip
            if ctx is not None: it["context_check"] = ctx
            return
    raise SystemExit("no cloze item with blank %s" % blank)

# ============================== S19 ==============================
S = G["S19"]
A = qmap(S["sections"]["A"])
A["S19_A1"]["stem"] = ("On a dark rainy evening, the wet road was as ________ as a mirror - two cars slid "
                       "right across the junction and could not stop in time.")
A["S19_A1"]["trap_type"] = ("'Rough' is the opposite of a mirror-smooth surface; 'dull' and 'dark' say nothing "
                            "about grip. Only SLIPPERY explains why the cars slid.")
A["S19_A1"]["learning_tip"] = ("AS + adjective + AS = simile. A wet road is AS SLIPPERY AS a mirror = so smooth "
                               "that tyres cannot grip it. Read the clue AFTER the dash - it tells you which "
                               "quality is being compared.")

B = qmap(S["sections"]["B"])
B["S19_B8"]["stem"] = "The broken step on the staircase ________ by the building manager last Monday."

C = S["sections"]["C"]
C["passage"] = ("Road safety begins with good habits. Every child must learn that (1)________ a busy road safely "
                "is a skill worth practising. Every day, our school warden (2)________ the road with a long line "
                "of pupils behind her. Last Tuesday, a girl (3)________ at the traffic lights near the market "
                "without looking up from her phone. While she (4)________, a motorcycle ran the red light and "
                "swerved past her. At that very moment, two elderly neighbours (5)________ the same road further "
                "down the street and stopped in shock. The principal later reminded everyone (6)________ only when "
                "the green man appears. He warned that no pupil should (7)________ between parked cars. Right now, "
                "the warden (8)________ the road with a group of Primary One children.")
set_cloze(C, 1, trap="Students write 'to cross'. The blank is the SUBJECT of 'is a skill', so it needs a gerund.",
          tip="A gerund (verb + -ing) can act as the SUBJECT of a clause: '... that CROSSING a busy road safely is a skill'.",
          ctx="Passage: 'Every child must learn that (1)________ a busy road safely is a skill worth practising.' Signal: subject of the clause = gerund as noun.")
set_cloze(C, 2, ctx="Passage: 'Every day, our school warden (2)________ the road with a long line of pupils behind her.' Signal: 'Every day' = habit = simple present; 'our school warden' = singular -> crosses.")
set_cloze(C, 3, ctx="Passage: 'Last Tuesday, a girl (3)________ at the traffic lights near the market.' Signal: 'Last Tuesday' = past. cross -> crossed.")
set_cloze(C, 4, ctx="Passage: 'While she (4)________, a motorcycle ran the red light.' Signal: 'While' + ongoing past action, interrupted -> past continuous, singular subject.")
set_cloze(C, 5, trap="Students write 'crossed' (simple past) instead of the past continuous needed for a parallel ongoing action.",
          tip="'Two elderly neighbours' = plural. They were in the middle of it at that same past moment -> WERE CROSSING (past continuous).",
          ctx="Passage: 'At that very moment, two elderly neighbours (5)________ the same road further down the street.' Signal: plural subject + ongoing past action.")
set_cloze(C, 6, ctx="Passage: 'The principal later reminded everyone (6)________ only when the green man appears.' Signal: reminded + object + TO + base verb.")
set_cloze(C, 7, trap="Students add -es or -ing after the modal verb 'should'.",
          tip="After modal verbs (should, must, can, will) always use the BASE form: should CROSS. Never 'should crosses'.",
          ctx="Passage: 'He warned that no pupil should (7)________ between parked cars.' Signal: modal 'should' + base form.")
set_cloze(C, 8, ctx="Passage: 'Right now, the warden (8)________ the road with a group of Primary One children.' Signal: 'Right now' = present continuous, singular subject.")

D = S["sections"]["D"]
D["word_box"] = ["caution", "emergency", "flammable", "hazard", "precaution", "alarm", "rescue", "shelter"]

E = S["sections"]["E"]
E["passage"] = ("Last Wednesday, a traffic police officer came to our school to give a talk on road awareness. "
                "She asked us to stay quiet - we could here (1) cars passing outside and needed to concentrate. "
                "She told us that a child once runned (2) into the road after a ball and was nearly hit by a lorry. "
                "She reminded the class that we must cross the road careful (3) and never rush, even when we are "
                "late for school. A boy then taked (4) a wrong turn during the practice drill and had to be guided "
                "back by a teacher. At the end, the pupils (5) drawings of road signs were displayed outside the "
                "school hall.")
set_err(E, 3, "careful", "carefully", "Adverb required after the action verb 'cross'",
        "'careful' (adjective) is placed after the action verb 'cross'. A verb is described by an adverb.",
        "How do we cross? CAREFULLY. After an ACTION verb use an ADVERB (-ly). Adjectives describe nouns; adverbs describe how the action is done.")
set_err(E, 5, "pupils", "pupils'", "Possessive apostrophe missing - plural possessive (pupils')",
        "Students leave out the apostrophe, so 'pupils' reads as a plain plural instead of showing ownership.",
        "The drawings belong to the pupils. Plural noun already ending in -s -> add the apostrophe AFTER the -s: PUPILS' drawings. Singular would be pupil's.")

# ============================== S20 ==============================
S = G["S20"]
B = qmap(S["sections"]["B"])
B["S20_B1"]["stem"] = ("Nobody in our science class ________ the meteorite in the display cabinet - it is far too "
                       "precious to be handled.")
B["S20_B1"]["trap_type"] = "Students match the verb to 'class' or write the plural 'touch'. NOBODY = singular -> verb + S."
B["S20_B1"]["learning_tip"] = ("NOBODY / EVERYONE / SOMEONE = singular. Nobody TOUCHES = add -S. 'Nobody touch' is WRONG, "
                               "and 'have touched' would need a plural subject.")

C = S["sections"]["C"]
C["passage"] = ("Space has always fascinated our class. Priya has loved (1)________ the night sky ever since she was "
                "given a small telescope. Every week, her team (2)________ the new data that the space station sends "
                "back to Earth. Last year, our class (3)________ the science of stars in an exciting project with a "
                "real astronomer. While the rover (4)________ a rocky ridge on Mars, it detected a strange purple "
                "stone. At the same moment, two separate probes (5)________ the far side of the Moon. Priya and her "
                "friends hope (6)________ the moons of Jupiter one day. Our teacher says that scientists should "
                "(7)________ every clue carefully before they announce a discovery. Right now, the newest rover "
                "(8)________ a region near the Martian south pole.")
set_cloze(C, 1, ctx="Passage: 'Priya has loved (1)________ the night sky ever since she was given a small telescope.' Signal: LOVE + verb-ing (gerund).")
set_cloze(C, 2, ctx="Passage: 'Every week, her team (2)________ the new data that the space station sends back.' Signal: 'Every week' = habit; 'her team' = singular collective -> explores.")
set_cloze(C, 3, ctx="Passage: 'Last year, our class (3)________ the science of stars in an exciting project.' Signal: 'Last year' = past. explore -> explored.")
set_cloze(C, 4, ctx="Passage: 'While the rover (4)________ a rocky ridge on Mars, it detected a strange purple stone.' Signal: 'While' + ongoing past action, singular subject.")
set_cloze(C, 5, ctx="Passage: 'At the same moment, two separate probes (5)________ the far side of the Moon.' Signal: plural subject + ongoing past action.")
set_cloze(C, 6, ctx="Passage: 'Priya and her friends hope (6)________ the moons of Jupiter one day.' Signal: HOPE + TO + base verb.")
set_cloze(C, 7, trap="Students add -s or -ing after the modal verb 'should'.",
          tip="After modal verbs (should, must, can, will) always use the BASE form: should EXPLORE. Never 'should explores'.",
          ctx="Passage: 'Our teacher says that scientists should (7)________ every clue carefully.' Signal: modal 'should' + base form.")
set_cloze(C, 8, ctx="Passage: 'Right now, the newest rover (8)________ a region near the Martian south pole.' Signal: 'Right now' = present continuous, singular subject.")

D = S["sections"]["D"]
D["word_box"] = ["atmosphere", "crater", "galaxy", "orbit", "satellite", "asteroid", "comet", "eclipse"]
D["passage"] = ("Space is vast and full of wonders. Beyond our solar system lie billions of stars grouped into a "
                "(1)________ - a huge spinning system held together by gravity. Each planet travels in its own "
                "(2)________, a fixed path around the Sun that it follows year after year. The Moon is Earth's only "
                "natural (3)________, circling our planet every twenty-eight days. Closer to home, Earth's "
                "(4)________ is a thin layer of gases that traps heat and makes life possible. When a space rock "
                "crashes into the Moon, it leaves behind a circular hollow called a (5)________.")

E = S["sections"]["E"]
E["passage"] = ("Last Saturday, my family went to a star-gazing event at the science park. We could here (1) the "
                "excitement in the crowd as the first telescope turned towards the moon. High above us, the stars "
                "were shinning (2) brightly in every direction. The stars was (3) so numerous that nobody could "
                "count them all. A scientist told us about the recent discoverys (4) made by the Mars rovers. At the "
                "end, the scientists (5) report on the night sky was read aloud before we drove home.")
set_err(E, 3, "was", "were", "Subject-verb agreement - plural subject (the stars)",
        "'The stars' is plural, but students match the verb to the nearest idea and write the singular 'was'.",
        "'The stars' = more than one -> WERE. WAS belongs only to a singular subject. Find the real subject before you choose the verb.")
set_err(E, 5, "scientists", "scientists'", "Possessive apostrophe missing - plural possessive (scientists')",
        "Students leave out the apostrophe, so 'scientists' reads as a plain plural instead of showing ownership.",
        "The report belongs to the scientists. Plural noun already ending in -s -> apostrophe AFTER the -s: SCIENTISTS' report. Singular would be scientist's.")

# ============================== S21 ==============================
S = G["S21"]
D = S["sections"]["D"]
D["word_box"] = ["canvas", "exhibition", "inspiration", "sketch", "texture", "easel", "palette", "portrait"]
D["passage"] = ("Art can take many forms. Before painting, an artist usually makes a (1)________ - a quick pencil "
                "drawing that plans out the picture. The paint is then brushed onto a (2)________, a piece of cloth "
                "stretched tightly over a wooden frame. The (3)________ of a surface describes how rough, smooth, "
                "bumpy or soft it feels to the touch. Finding (4)________ - the spark of creativity that makes an "
                "artist want to begin - can be the hardest part of all, and it may come from nature, from music or "
                "from a stranger's face. When enough pieces are finished, the artist may organise an (5)________ so "
                "that the public can come and view the work.")

E = S["sections"]["E"]
E["passage"] = ("Last Thursday, our class worked on a collaborative mural in the school hall. It is always difficult "
                "to no (1) where to begin when you face a blank wall. One student accidentally spilt the glue while "
                "cuting (2) the tissue paper into tiny pieces. The art supplies was (3) arranged neatly on the "
                "tables before the lesson began. Some students stuck real leafs (4) onto their work to add a natural "
                "texture. At the end, the pupils (5) paintings were displayed along the corridor for the whole "
                "school to enjoy.")
set_err(E, 2, "cuting", "cutting", "Spelling - short vowel + single consonant: double the consonant before -ing",
        "Students forget to double the final consonant of 'cut', producing 'cuting'.",
        "CUT has a short vowel and one final consonant, so the consonant DOUBLES before -ing: cut -> CUTTING. Same rule: run -> running, sit -> sitting.")
set_err(E, 3, "was", "were", "Subject-verb agreement - plural subject (the art supplies)",
        "'The art supplies' is plural, but students hear the singular-sounding phrase and write 'was'.",
        "'The art supplies' = more than one thing -> WERE arranged. WAS belongs only to a singular subject.")
set_err(E, 5, "pupils", "pupils'", "Possessive apostrophe missing - plural possessive (pupils')",
        "Students leave out the apostrophe, so 'pupils' reads as a plain plural instead of showing ownership.",
        "The paintings belong to the pupils. Plural noun already ending in -s -> apostrophe AFTER the -s: PUPILS' paintings. Singular would be pupil's.")

# ============================== S22 ==============================
S = G["S22"]
A = qmap(S["sections"]["A"])
A["S22_A3"]["stem"] = ("After months of practice, Jamal finally felt ready to ________ his piano skills at the school "
                       "concert in front of the whole hall.")

C = S["sections"]["C"]
C["passage"] = ("Maya has played the piano since (1)________ was five years old. Last year, (2)________ teacher "
                "entered her in the school talent show. Her partner in the show was Raju, the guitarist from her "
                "class. The audience watched (3)________ perform an original piece alongside Maya without a single "
                "mistake. (4)________ tuned his guitar again between the two songs. (5)________ steady guitar "
                "playing added warmth and depth to Maya's piano melodies. When the two performers took their final "
                "bow, (6)________ received a standing ovation from the whole school. The principal congratulated "
                "(7)________ on stage in front of everyone. Maya and Raju said (8)________ performance was the "
                "proudest moment of their lives so far.")
set_cloze(C, 3, ctx="Passage: 'The audience watched (3)________ perform an original piece alongside Maya.' Signal: object pronoun after the verb 'watched'; Raju = male.")
set_cloze(C, 4, ctx="Passage: '(4)________ tuned his guitar again between the two songs.' Signal: subject of 'tuned'; Raju = male.")

D = S["sections"]["D"]
D["word_box"] = ["chorus", "harmony", "performed", "rehearsal", "trembled", "applauded", "auditorium", "conductor"]
D["passage"] = ("Our school held its annual concert last Friday evening. Every class had (1)________ at least one "
                "song or dance piece on the stage in front of parents and guests. The weeks before the concert were "
                "full of hard work - the choir sat through one long (2)________ after another in the school hall, "
                "making sure that every note and every movement was in place. On the night itself, a few singers "
                "(3)________ with nerves as they waited backstage. When the choir finally sang together, their "
                "voices blended in perfect (4)________ that filled the hall with a warm and rich sound. During the "
                "final (5)________, all sixty singers joined their voices as one, and many parents felt deeply "
                "moved.")
set_cloze(D, 2, trap="Students may write 'practice', which is not in the box. A REHEARSAL is the practice session held before a public performance.",
          tip="A REHEARSAL = a practice session before a performance. 'One long rehearsal after another' = they practised again and again.")
set_cloze(D, 3, trap="Students may write 'shook' or 'shivered', which are not in the box. The clue is 'with nerves ... backstage' - they were shaking from fear, not from cold.",
          tip="TREMBLED = shook slightly, usually from fear or excitement. Singers TREMBLED with nerves before walking on stage. The blank sits between the subject and 'with nerves', so it must be a past-tense verb.")

E = S["sections"]["E"]
E["passage"] = ("Last Friday, our school held its annual music concert in the main hall. We waited nervously near the "
                "stage - you could here (1) the audience chatting loudly through the curtain. One of the pianoes (2) "
                "was slightly out of tune, but the students performed magnificently. The performance was so "
                "beautifuly (3) done that many parents wiped tears from their eyes. At one point, a family of mouses "
                "(4) were spotted under the front row of seats. At the end, the musicians (5) bows were met with "
                "thunderous applause from the audience.")
set_err(E, 5, "musicians", "musicians'", "Possessive apostrophe missing - plural possessive (musicians')",
        "Students leave out the apostrophe, so 'musicians' reads as a plain plural instead of showing ownership.",
        "The bows belong to the musicians. Plural noun already ending in -s -> apostrophe AFTER the -s: MUSICIANS' bows. Singular would be musician's.")

# sections.D_note 는 섹션이 아니라 문자열이다(이전 세션이 남긴 메모). en_hints_merge.py 가
# sections 를 순회하며 sec.get() 을 부르므로 S22 에서만 AttributeError 로 죽는다. 게다가 내용도
# 이제 거짓이다("rehearsal 이 blank 2 와 3 에 두 번 쓰인다" -> blank3 는 trembled). 키를 제거한다.
S["sections"].pop("D_note", None)

# ============================== SELF-CHECK ==============================
errs = []
for sid in ("S19", "S20", "S21", "S22"):
    s = G[sid]
    # A/B : answer key must exist in options, and must not be printed in its own stem
    for k in ("A", "B"):
        for it in s["sections"][k]["questions"]:
            if str(it["answer"]) not in it["options"]:
                errs.append(f"{it['question_id']}: answer {it['answer']} not in options")
                continue
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
        # Section C (verb-form / pronoun tables) is by design 8 words for 8 blanks, each used
        # exactly once - that is the house style of every set. Section D must carry distractors.
        if k == "D" and len(pool) < len(qs) + 3:
            errs.append(f"{sid}/{k}: word_box has only {len(pool) - len(qs)} distractors (need 3+)")
        for w in pool:
            if w not in used_words and re.search(r"\b" + re.escape(w.lower()) + r"\b", p.lower()):
                errs.append(f"{sid}/{k}: unused distractor '{w}' appears in the passage")
    # E editing : the FIRST occurrence of the wrong word must BE the marked slot
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
    # F synthesis : sentence_b may be absent only for single-sentence rewrites
    for it in s["sections"]["F"]["questions"]:
        if not (it.get("sentence1") or it.get("sentence_a")):
            errs.append(f"{it['question_id']}: sentence1/sentence_a missing")
        if not (it.get("sentence2") or it.get("sentence_b")) and not str(it.get("instruction", "")).lower().startswith("rewrite"):
            errs.append(f"{it['question_id']}: sentence2/sentence_b missing on a COMBINE item")
        if not it.get("model_answer"):
            errs.append(f"{it['question_id']}: model_answer missing")

for sid in ("S19", "S20", "S21", "S22"):
    for k, sec in G[sid]["sections"].items():
        if not isinstance(sec, dict):
            errs.append(f"{sid}/{k}: section is a {type(sec).__name__}, not an object - en_hints_merge.py will crash on it")

if errs:
    print("SELF-CHECK FAILED:", *errs, sep="\n  ")
    sys.exit(1)
if "--dry" in sys.argv:
    print("DRY OK - S19/S20/S21/S22 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S19/S20/S21/S22 fixes ->", SRC)
