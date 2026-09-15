#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tools/bank/build_zh_bank.py - item bank index for the Chinese 60-set track.
Reads wa1_zh_complete.json (source of truth) and writes
  src/data/p3/chinese/wa1_bank.json  = { bank, dupOf, meta, stats }
    bank[skill]  : [itemId, ...]   every auto-graded leaf carrying that skill
    dupOf[itemId]: [itemId, ...]   other leaves with an IDENTICAL sentence/stem
                                   (never serve these as "a different item")
    meta[itemId] : { skill, setId, sectionType, containerId? , band }
Result ids mirror ExamSession.js: MCQ q.id | cloze set.id_num | match set.id_num
| reading q.id. Craft items (not auto-graded) are indexed with graded=false.
Run from repo root (emit_ts.py calls this after re-emitting wa1_practice.ts).
"""
import io, json, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "wa1_zh_complete.json")
OUT = os.path.join(ROOT, "src", "data", "p3", "chinese", "wa1_bank.json")
MCQ = ("HanziMcq", "PinyinMcq", "VocabMcq")
AUTO_COMP = ("mcq", "sequence", "fill_word")

def norm_text(s):
    return re.sub(r"\s+", "", str(s or "")).replace("\uFF08", "(").replace("\uFF09", ")").replace("_", "")

def main():
    data = json.load(io.open(SRC, encoding="utf-8"))
    bank, meta, groups = {}, {}, {}
    def add(iid, skill, set_id, st, band, graded=True, cid=None, text=None):
        if not iid: return
        meta[iid] = {"skill": skill, "setId": set_id, "sectionType": st, "graded": graded, "band": band}
        if cid: meta[iid]["containerId"] = cid
        if skill and graded: bank.setdefault(skill, []).append(iid)
        if text:
            key = st + "|" + norm_text(text)
            groups.setdefault(key, []).append(iid)
    for s in data:
        sid, band = s["setId"], s.get("band")
        for sec in s.get("plan", []):
            st = sec["type"]
            for it in sec.get("items", []) or []:
                if st in MCQ:
                    add(it.get("id"), it.get("skill"), sid, st, band, True, None, it.get("sentence"))
                elif st == "VocabMatch":
                    for sub in it.get("items", []) or []:
                        add(str(it.get("id")) + "_" + str(sub.get("num")), sub.get("skill"), sid, st, band, True, it.get("id"), sub.get("stem"))
                elif st == "PassageCloze":
                    for b in it.get("blanks", []) or []:
                        add(str(it.get("id")) + "_" + str(b.get("num")), b.get("skill"), sid, st, band, True, it.get("id"), None)
                elif st in ("ReadingMcq", "ReadingOpen"):
                    for q in it.get("questions", []) or []:
                        add(q.get("id"), q.get("skill"), sid, st, band, str(q.get("format")) in AUTO_COMP, it.get("id"), q.get("stem"))
                elif st == "SentenceCraft":
                    add(it.get("id"), it.get("skill"), sid, st, band, False, None, None)
    dup = {}
    for ids in groups.values():
        if len(ids) < 2: continue
        for i in ids: dup[i] = [j for j in ids if j != i]
    stats = {"skills": {k: len(v) for k, v in sorted(bank.items())}, "items": len(meta),
             "graded": sum(1 for m in meta.values() if m["graded"]), "dupItems": len(dup),
             "dupGroups": sum(1 for ids in groups.values() if len(ids) > 1),
             "missingSkill": [i for i, m in meta.items() if m["graded"] and not m["skill"]]}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump({"bank": bank, "dupOf": dup, "meta": meta, "stats": stats}, io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("wa1_bank.json: items=%d graded=%d skills=%d dupGroups=%d missingSkill=%d" % (
        stats["items"], stats["graded"], len(bank), stats["dupGroups"], len(stats["missingSkill"])))
    if stats["missingSkill"]: print("  missing skill:", stats["missingSkill"][:20])
    low = [k for k, v in bank.items() if len(v) < 10]
    if low: print("  skills with <10 items (drill pool thin):", low)

if __name__ == "__main__":
    main()
