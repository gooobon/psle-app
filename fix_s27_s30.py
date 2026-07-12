#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S27~S30 정독(精讀) 검증에서 나온 결함 수정.

S27/C : 정답 8개가 빈칸과 어긋나 있다("(2)Much of the galleries", "(7)Both visitors",
        "(8)either time left"). trap/tip 도 다른 지문(minutes / French / map and compass /
        north or south entrance)의 것이 붙어 있다. -> 8개 보기가 각 1회씩 유일하게 성립하도록
        지문 일부 재작성 + 정답 재배정 + trap/tip 교체.
S27/D : 정답이 어긋남(1=century -> 'Every object is an century'). 올바른 순서로 재배정.
        'Others are DONATED by families' 가 정답 donation 을 사실상 노출 -> 문장 교체.
        보기 5개(오답 0개) -> 오답 3개 추가(총 8).
S27/E2: 'The guide led us to there(their) first gallery' — 고쳐도 소유주가 불분명. 소유주가 분명한
        문장으로 교체.
S27/E3: 'criterias -> criteria' 는 P3 수준을 크게 벗어남 -> knifes -> knives (f->ves) 로 교체.

S28_B1: 'Nobody ... a clue this difficult BEFORE' 는 현재완료를 요구한다. 정답 'solves'(단순현재)는
        비문이고 보기 3(has solved)이 유일하게 옳다 -> 정답 2 -> 3. (nobody=단수 학습효과는 has 로 유지)
S28_B5: 'searched IN the attic' 도 완벽히 옳다 -> 정답이 둘. 보기 'in' -> 'into' 로 교체.
S28/C6: 'Every explorer DREAMS to discover' = 비문(dream OF -ing). learning_tip 이 아예 틀린 문법을
        가르치고 있었다 -> 동사를 HOPES 로 교체(hope + to부정사).
S28/D : 정답 5개가 전부 어긋남(1=investigation -> 'the investigation house'). 재배정.
        보기 5개(오답 0개) -> 오답 3개 추가.
S28/E5: 'detectives's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(detectives)으로 교체.
S28/E4: tip 이 지문에 없는 'footprints ... facing the same direction' 을 말한다 -> 교체.

S29_A2: stem 안에 정답 'bright' 가 그대로 박혀 있다("tiny, BRIGHT and perfect") -> 정답 노출.
S29_B4: 'There ___ several caterpillars ... THIS MORNING' 은 was/were(과거)도 성립 -> 정답이 둘.
        'right now' 로 바꿔 현재만 성립하게 함.
S29/C : 정답은 전부 옳으나 지문 본문에 'from'(=blank5 정답)이 두 번 그대로 노출
        ('cuttings FROM healthy stems', '— FROM Japan, India...') -> 두 곳 제거.
S29/D : 정답이 한 칸씩 밀려 있다(1=germinate -> 'The best soil is germinate'). 재배정.
        blank1 문장이 box 의 compost 와 맞지 않아 문장 교체. 보기 5개 -> 오답 3개 추가.
S29/E3: ★ 'Another volunteer WAS sprinckling' 의 was 가 지문에서 먼저 등장 -> Editing 렌더러가
        indexOf('was') 로 밑줄을 치므로 E4(was->were)의 밑줄이 엉뚱한 자리에 걸린다. 'began' 으로 교체.
S29/E5: 'gardeners's' -> 'gardeners'.

S30_A1: 'The princess SLUMBERED a deep sleep' = 비문(slumber 는 자동사). 보기 중 문법상 성립하는 것은
        'entered' 뿐이라 정답이 뒤집힌다 -> stem 을 'slumbered peacefully' 가 유일하게 맞도록 교체.
S30_B7: stem 에 이미 'discovered' 가 있는데 정답이 'was discovered' -> 'was discovered discovered'.
        stem 에서 중복어 제거.
S30/C : ★ 오래 전 제기된 의심 확인. (1) 'the hero told ___ that HE was brave' 인데 정답이 herself,
        (2) 'The princess locked ___' 인데 himself, (5) 기사들에게 'Prepare ___ for battle' 인데 myself,
        (6) 'thought (6)___ "I can do this"' 는 to 가 빠져 비문 — 8개 중 5개가 어긋났고, 남은 문장들로는
        8개 재귀대명사를 1회씩 배정하는 것 자체가 불가능(itself/themselves 가 두 번 필요).
        -> 지문 재작성: 8개 재귀대명사가 각각 정확히 한 번씩, 주어 단서와 함께 성립하게 함.
        참고: 'told' 는 여기서 목적격이 아니라 재귀대명사 자리(tell oneself)가 맞다.
S30/D : 정답은 옳으나 trap_type 4개가 서로 다른 문항의 것(1번에 granted 설명, 2번에 vanished 설명 ...).
        교체. 보기 5개 -> 오답 3개 추가. blank5 'have become legend' -> 'has become a legend'.
S30/E5: 'hero's's' 는 실재하지 않는 형태 -> 아포스트로피 누락형(neighbours)으로 교체.
        (heroes/villagers/blacksmith 는 모두 지문 앞부분에 먼저 등장하므로 indexOf 밑줄이 어긋난다.)

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

def set_cloze(sec, table):
    """table: {blank: (answer, trap, tip)}"""
    for it in sec["questions"]:
        b = it["blank_number"]
        if b in table:
            it["answer"], it["trap_type"], it["learning_tip"] = table[b]

# ============================== S27 ==============================
S = G["S27"]

S["sections"]["C"]["passage"] = (
    "The museum has so (1)________ fascinating objects that one visit is never enough. "
    "(2)________ of the galleries are open every day, and visitors can choose to explore them all "
    "or just (3)________. There is (4)________ space in the main hall for large school groups to "
    "gather before their tours. The conservation team does not have (5)________ time to repair "
    "every damaged item, so the most fragile pieces are treated first. (6)________ the Roman "
    "gallery and the Egyptian gallery contain objects over two thousand years old. When you leave, "
    "you may go out through (7)________ the north exit or the south exit. If you have (8)________ "
    "time left before closing, do not miss the shadow puppet display."
)
set_cloze(S["sections"]["C"], {
    1: ("many",
        "Students write 'much'. OBJECTS can be counted one by one, so an uncountable word cannot go here.",
        "MANY + countable plural noun: so MANY objects. Use MANY when you can count the things separately."),
    2: ("several",
        "Students write 'both' (only two) or 'a few' (two or three). More than two galleries are open, but not all of them.",
        "SEVERAL = more than two, but not a large number. SEVERAL of the galleries = perhaps four or five."),
    3: ("a few",
        "Students write 'a little', which belongs to uncountable nouns. The galleries are countable.",
        "A FEW + countable plural: explore them all or just A FEW. A LITTLE is only for uncountable nouns."),
    4: ("a lot of",
        "Students write 'much'. In a positive statement 'much space' sounds unnatural in everyday English.",
        "A LOT OF = a large amount. Natural in positive statements with both countable and uncountable nouns: A LOT OF space."),
    5: ("much",
        "Students write 'many'. TIME is uncountable, and the sentence is negative - the natural partner of a negative is 'much'.",
        "MUCH + uncountable noun, especially in negatives: does not have MUCH time. 'Many time' is always wrong."),
    6: ("both",
        "Students write 'either' (one of the two) or 'several'. Exactly two galleries are named and joined by 'and'.",
        "BOTH = the two things together. BOTH the Roman gallery AND the Egyptian gallery = the two of them."),
    7: ("either",
        "Students write 'both'. You cannot walk out through two exits at the same time, and the word 'or' demands a choice.",
        "EITHER ... OR = one out of exactly two choices. EITHER the north exit OR the south exit."),
    8: ("a little",
        "Students write 'a few'. TIME cannot be counted, so a countable word cannot go here.",
        "A LITTLE + uncountable noun: A LITTLE time left. A FEW is for countable plurals such as minutes."),
})

S["sections"]["D"]["word_box"] = ["artefact", "century", "curator", "donation", "fragile",
                                  "preserved", "replica", "ticket"]
S["sections"]["D"]["passage"] = (
    "Museums keep history alive. Every object on display is an (1)________ - something made or used "
    "by people in the past. Many items have been carefully (2)________ so that they do not decay: "
    "experts control the temperature and the light in every room. Some objects are only copies - a "
    "(3)________ made to look exactly like the original. Others are given by families who no longer "
    "wish to keep them, and each (4)________ is a generous gift to the public. Some exhibits date "
    "back to the fifth (5)________, over fifteen hundred years ago."
)
set_cloze(S["sections"]["D"], {
    1: ("artefact",
        "Students pick 'replica'. The clue is 'something MADE OR USED BY PEOPLE IN THE PAST' - every museum object, not only the copies.",
        "An ARTEFACT = an object made or used by people in the past, kept for its historical value."),
    2: ("preserved",
        "Students pick 'fragile'. The blank follows 'have been carefully', so it must be a past participle, not a describing word.",
        "PRESERVED = kept in its original condition so that it does not decay. Museums PRESERVE objects with careful light and temperature control."),
    3: ("replica",
        "Students pick 'artefact'. The clue is 'only COPIES ... made to look exactly like the ORIGINAL'.",
        "A REPLICA = an exact copy of something. Museums display a REPLICA when the original is too precious to show."),
    4: ("donation",
        "Students pick 'artefact'. The clue is that families GIVE the object away and it becomes a GENEROUS GIFT to the public.",
        "A DONATION = something given freely to help others. Each DONATION is a gift the museum did not have to buy."),
    5: ("century",
        "Students pick 'artefact'. The clue is the number FIFTH and the phrase 'over fifteen hundred years ago' - a length of time.",
        "A CENTURY = one hundred years. The fifth CENTURY = the years 400-499, about fifteen hundred years ago."),
})

S["sections"]["E"]["passage"] = (
    "Our class visited the National Museum last Thursday. Our teacher reminded us to be carful (1) "
    "not to touch any exhibits without permission. Inside the first gallery, some pupils from "
    "another school had left there (2) bags on the floor. The curator showed us two ancient knifes "
    "(3) that had been found in a riverbed. Many of the exhibits was (4) labelled in English and "
    "Mandarin so that all visitors could read them. At the end, we spent time writting (5) our "
    "reflections in our museum journals before boarding the bus back to school."
)
set_err(S["sections"]["E"], 2, "there", "their",
        "Homophone confusion - there (place) vs their (belonging to them)",
        "Students write 'there' (place) when the bags belong to the pupils.",
        "THEIR = belonging to them. THERE = at that place. Test: the bags belong to the pupils -> THEIR bags.")
set_err(S["sections"]["E"], 3, "knifes", "knives",
        "Irregular plural - knife -> knives (f -> ves)",
        "Students simply add -s to 'knife'. Nouns ending in -f or -fe usually change to -ves.",
        "KNIFE -> KNIVES. Same rule: leaf -> leaves, half -> halves, loaf -> loaves, wolf -> wolves.")

# ============================== S28 ==============================
S = G["S28"]
q = qmap(S["sections"]["B"])["S28_B1"]
q["answer"] = "3"
q["trap_type"] = ("BEFORE + 'it has everyone baffled' = up to now, so a simple present verb cannot "
                  "be used. Students also write 'have solved', forgetting that NOBODY is singular.")
q["learning_tip"] = ("NOBODY = singular -> HAS, never 'have'. BEFORE (= at any time up to now) needs "
                     "the present perfect: Nobody HAS SOLVED a clue this difficult before.")

q = qmap(S["sections"]["B"])["S28_B5"]
q["options"]["3"] = "into"
q["trap_type"] = ("'At' marks a point; 'on' marks a surface; 'into' shows entering, not examining. "
                  "SEARCH THROUGH = look in every part of a place.")

S["sections"]["C"]["passage"] = S["sections"]["C"]["passage"].replace(
    "While the lead diver (4)________ the lower deck",
    "While the lead diver (4)________ the treasure in the lower deck").replace(
    "Every explorer dreams (6)________", "Every explorer hopes (6)________")
for it in S["sections"]["C"]["questions"]:
    if it["blank_number"] == 6:
        it["trap_type"] = "Students write 'discovering'. HOPE takes the infinitive, never the -ing form."
        it["learning_tip"] = ("HOPE + TO + base verb: hopes TO DISCOVER something remarkable. "
                              "'Hopes discovering' is never correct.")

S["sections"]["D"]["word_box"] = ["abandoned", "concealed", "footprints", "investigation", "midnight",
                                  "perilous", "unravelled", "witness"]
set_cloze(S["sections"]["D"], {
    1: ("abandoned",
        "Students pick 'concealed'. The clue is 'EMPTY AND FORGOTTEN' - nobody lives there any more.",
        "ABANDONED = left empty and no longer used or cared for. An ABANDONED house has been deserted by its owners."),
    2: ("concealed",
        "Students pick 'abandoned'. The clue is 'HIDDEN FROM VIEW by clever tricks or physical barriers'.",
        "CONCEALED = deliberately hidden so that it cannot be seen. A clue may be CONCEALED behind a panel."),
    3: ("investigation",
        "Students pick 'perilous'. The blank follows 'an', so it must be a noun beginning with a vowel sound, and the clue is 'A CAREFUL SEARCH FOR THE TRUTH'.",
        "An INVESTIGATION = a careful, organised search for the facts. Detectives open an INVESTIGATION to solve a mystery."),
    4: ("unravelled",
        "Students pick 'concealed'. The clue is the THREAD image - a tangle being pulled straight until everything makes sense.",
        "UNRAVELLED = came apart thread by thread, so the whole truth became clear. A mystery UNRAVELS clue by clue."),
    5: ("perilous",
        "Students pick 'abandoned'. The blank sits between 'the most' and 'journey', so it must be a describing word, and the clue is 'BRAVE ENOUGH TO BEGIN'.",
        "PERILOUS = full of danger. A PERILOUS journey is one that could easily end badly."),
})

S["sections"]["E"]["passage"] = S["sections"]["E"]["passage"].replace(
    "the detectives's (5) notebook", "the detectives (5) notebook")
set_err(S["sections"]["E"], 4, "was", "were",
        "Subject-verb agreement - plural subject (the muddy paw prints)",
        "'The muddy paw prints' is plural. Students match the verb to the nearest word instead.",
        "'The muddy paw prints' = plural -> WERE all over the dusty floor. WAS is only for singular subjects.")
set_err(S["sections"]["E"], 5, "detectives", "detectives'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The notebook BELONGS TO the detectives -> DETECTIVES' notebook (apostrophe after the -s for "
        "a plural). Singular: detective's.")

# ============================== S29 ==============================
S = G["S29"]
q = qmap(S["sections"]["A"])["S29_A2"]
q["stem"] = ("The tomato seedlings were as ________ as little green jewels - tiny, glossy and "
             "catching the morning light.")

q = qmap(S["sections"]["B"])["S29_B4"]
q["stem"] = ("There ________ several caterpillars eating the lettuce leaves in the garden right now.")
q["trap_type"] = ("'Several caterpillars' = plural, and RIGHT NOW = present. Students write 'is' "
                  "(singular) or a past form.")
q["learning_tip"] = ("THERE + plural noun + present -> ARE. 'There ARE several caterpillars ... right "
                     "now.' One caterpillar IS, several caterpillars ARE.")

S["sections"]["C"]["passage"] = (
    "My uncle taught me everything I know (1)________ gardening. He digs the soil (2)________ a "
    "long-handled spade each morning before the sun gets too strong. He propagates new plants "
    "(3)________ taking cuttings and placing them in water until roots appear. He told me that a "
    "cactus can survive (4)________ water for weeks because it stores moisture in its thick stems. "
    "The seeds he plants come (5)________ all over the world; Japan, India and South America are "
    "just three examples. The smell (6)________ jasmine fills the garden every evening at dusk and "
    "makes the whole compound feel peaceful. My uncle has been gardening (7)________ over thirty "
    "years. Every week, he donates fresh vegetables (8)________ the elderly residents in our "
    "neighbourhood."
)

S["sections"]["D"]["word_box"] = ["compost", "fertile", "germinate", "harvest", "pollinate",
                                  "prune", "seedling", "wilted"]
S["sections"]["D"]["passage"] = (
    "A garden needs careful attention all year round. Many gardeners make their own (1)________ from "
    "vegetable peels and fallen leaves, and mix it into the earth to feed the plant roots. Warmth "
    "and moisture help the seeds (2)________ and push their first shoots through the soil. Once a "
    "young (3)________ appears above the ground, it needs regular water and light to grow. Many "
    "plants depend on insects like bees to (4)________ them, carrying pollen between flowers. After "
    "months of care, gardeners enjoy the (5)________, picking ripe fruit and vegetables to eat or "
    "share."
)
set_cloze(S["sections"]["D"], {
    1: ("compost",
        "Students pick 'fertile'. The blank follows 'make their own', so it must be a noun, and the clue is VEGETABLE PEELS and FALLEN LEAVES rotting down.",
        "COMPOST = decayed food scraps and plant material mixed into soil to feed it. Gardeners make COMPOST from kitchen and garden waste."),
    2: ("germinate",
        "Students pick 'seedling' (a noun). The blank follows 'help the seeds', so it must be a base verb, and the clue is the FIRST SHOOTS pushing through.",
        "GERMINATE = begin to grow from a seed. Warmth and moisture make a seed GERMINATE."),
    3: ("seedling",
        "Students pick 'germinate' (a verb). The blank follows 'a young', so it must be a noun - the little plant itself, not the process.",
        "A SEEDLING = a very young plant that has just come up from a seed."),
    4: ("pollinate",
        "Students pick 'germinate'. The clue is BEES CARRYING POLLEN BETWEEN FLOWERS.",
        "POLLINATE = carry pollen from one flower to another so that fruit and seeds can form. Bees POLLINATE as they feed."),
    5: ("harvest",
        "Students pick 'compost'. The blank follows 'enjoy the', so it must be a noun, and the clue is PICKING RIPE FRUIT AND VEGETABLES after months of care.",
        "The HARVEST = the gathering in of ripe crops, and the crops themselves. Farmers wait all season for the HARVEST."),
})

S["sections"]["E"]["passage"] = (
    "Last Saturday, we visited a community garden near the market. A volunteer pruned the rose "
    "bushes careful (1), removing all the dead branches near the base. We also noticed that some of "
    "the leafs (2) were eaten by insects. Another volunteer began sprinckling (3) water gently over "
    "the young seedlings in the shade house. By midday, the sunflowers was (4) all facing east, "
    "tracking the movement of the sun. We were shown the gardeners (5) toolshed, which was filled "
    "with rakes, hoses and bags of fertiliser."
)
set_err(S["sections"]["E"], 5, "gardeners", "gardeners'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The toolshed BELONGS TO the gardeners -> GARDENERS' toolshed (apostrophe after the -s for a "
        "plural). Singular: gardener's.")

# ============================== S30 ==============================
S = G["S30"]
q = qmap(S["sections"]["A"])["S30_A1"]
q["stem"] = ("The princess ________ peacefully for one hundred years until the prince arrived at the "
             "castle.")
q["trap_type"] = ("'Entered', 'avoided' and 'refused' all need an object after them, but the blank is "
                  "followed by PEACEFULLY. Only 'slumbered' can stand alone with an adverb.")

q = qmap(S["sections"]["B"])["S30_B7"]
q["stem"] = ("The enchanted castle ________ deep in the forest by the wandering prince.")

S["sections"]["C"]["passage"] = (
    "In the fairy tale, the hero told (1)________ that he was brave enough to face the dragon alone. "
    "The princess locked (2)________ in the tower and refused to cry. The dragon stretched "
    "(3)________ out on the pile of treasure and fell asleep. The frightened villagers hid "
    "(4)________ in the forest until the beast had flown away. The king said to his knights, "
    "'Prepare (5)________ for battle!' Then he turned to the youngest knight and added, 'Do not "
    "blame (6)________ if you feel afraid.' 'I will ride out with you (7)________,' the king "
    "promised, 'for a king must share the danger.' At last the beast was gone, and we villagers "
    "promised (8)________ that we would never forget that day."
)
set_cloze(S["sections"]["C"], {
    1: ("himself",
        "Students write 'herself'. The hero is male, and 'he was brave' confirms it. TELL ONESELF = say something in your own head.",
        "HIMSELF = the reflexive pronoun for he. The hero told HIMSELF = the speaker and the listener are the same man."),
    2: ("herself",
        "Students write 'himself'. THE PRINCESS is one female, and she locked her own person in.",
        "HERSELF = the reflexive pronoun for she. She locked HERSELF in = she did it to her own person."),
    3: ("itself",
        "Students write 'himself'. The dragon is an animal, not a man or a woman.",
        "ITSELF = the reflexive pronoun for it (a thing or an animal). The dragon stretched ITSELF out."),
    4: ("themselves",
        "Students write 'ourselves'. THE VILLAGERS are several people, and the storyteller is not talking about his own group here.",
        "THEMSELVES = the reflexive pronoun for they. The villagers hid THEMSELVES = they hid their own bodies."),
    5: ("yourselves",
        "Students write 'yourself'. The king is speaking to HIS KNIGHTS - more than one listener.",
        "YOURSELVES = the reflexive pronoun for 'you' when 'you' means two or more people. 'Prepare YOURSELVES!' is said to a group."),
    6: ("yourself",
        "Students write 'yourselves'. Here the king turns to THE YOUNGEST KNIGHT alone - only one listener.",
        "YOURSELF = the reflexive pronoun for 'you' when 'you' is one person. Count the listeners before you choose."),
    7: ("myself",
        "Students write 'himself', matching the king from outside the speech marks. But the king says 'I', so the pronoun must match 'I'.",
        "MYSELF = the reflexive pronoun for I. 'I will ride out with you MYSELF' = the speaker in person, nobody else."),
    8: ("ourselves",
        "Students write 'themselves'. The narrator says WE VILLAGERS, so the speaker belongs to the group.",
        "OURSELVES = the reflexive pronoun for we. We promised OURSELVES = the promise is made by us, to us."),
})

S["sections"]["D"]["passage"] = (
    "Fairy tales often begin with a world that is (1)________ - filled with magic, talking creatures "
    "and impossible things. Many feature a humble hero who is (2)________, meaning ordinary and not "
    "gifted with special powers. When the hero makes a brave choice, a wish may be (3)________ by a "
    "fairy or a spirit. Evil characters who have (4)________ into thin air are often defeated by love "
    "or honesty. Each of these old stories has become a (5)________ - a tale so widely known and retold "
    "that everyone recognises it by name."
)
S["sections"]["D"]["word_box"] = ["curse", "disguised", "enchanted", "granted", "legend", "mortal",
                                  "vanished", "wicked"]
set_cloze(S["sections"]["D"], {
    1: ("enchanted",
        "Students pick 'wicked'. The clue is 'FILLED WITH MAGIC, talking creatures and impossible things'.",
        "ENCHANTED = under a magic spell, full of magic. An ENCHANTED forest is a place where ordinary rules do not apply."),
    2: ("mortal",
        "Students pick 'disguised'. The clue is 'ORDINARY and NOT GIFTED WITH SPECIAL POWERS' - an everyday human being.",
        "MORTAL = an ordinary human, one who can be hurt and who will one day die, unlike gods and magical beings."),
    3: ("granted",
        "Students pick 'enchanted'. The blank follows 'a wish may be', so it must be a past participle, and a wish is something you GIVE.",
        "GRANTED = given or allowed. A fairy GRANTS a wish = she makes it come true."),
    4: ("vanished",
        "Students pick 'disguised'. The clue is INTO THIN AIR - the characters are gone completely, not merely hidden behind a mask.",
        "VANISHED = disappeared suddenly and completely, leaving no trace at all."),
    5: ("legend",
        "Students pick 'curse'. The blank follows 'has become a', and the clue is 'a TALE so widely KNOWN AND RETOLD'.",
        "A LEGEND = an old story told again and again for generations until everybody knows it."),
})

S["sections"]["E"]["passage"] = (
    "Once upon a time, a dragon lived on a hill above a small village. Every night, it roared fierce "
    "(1) and blew flames into the sky. The farmer who lived nearest to the hill used his two oxes "
    "(2) to plough the fields far away from the dragon. A travelling blacksmith began makeing (3) a "
    "special suit of armour to protect the village hero. The villagers was (4) so frightened that "
    "nobody dared leave their homes after dark. At last, the neighbours (5) prayers were answered "
    "when the hero returned from the lair in triumph, and peace returned to the valley."
)
set_err(S["sections"]["E"], 5, "neighbours", "neighbours'",
        "Possessive apostrophe - plural possessive",
        "Students write a plain plural and leave out the apostrophe that shows ownership.",
        "The prayers BELONG TO the neighbours -> NEIGHBOURS' prayers (apostrophe after the -s for a "
        "plural). Singular: neighbour's.")

# ============================== self-check ==============================
errs = []
for sid in ("S27", "S28", "S29", "S30"):
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
            # 부가의문문(question tag)은 설계상 본문의 조동사를 그대로 되풀이하므로 제외한다.
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
    print("DRY OK - S27/S28/S29/S30 fixes validate")
else:
    json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("WROTE S27/S28/S29/S30 fixes ->", SRC)
