#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge a per-set enrichment patch into wa1_zh_complete.json, preserving base fields,
then run machine validation (tiles join, evidence substring, pinyin tone marks,
keywords shape, cliche/duplicate detection, required-field coverage).

Usage: python3 merge_patch.py <patch.json> [--dry]
Patch shape (all sections optional; keys map to base item ids or nums):
{
  "setId": "ZS02",
  "mcq":    { "<itemId>": {sentence_en, hints:[..], keywords:[{w,py,en}..], explanation_en, explanation?} },
  "match":  { "<num>":    {explanation, explanation_en, stem_en, keywords:[{w,py,en}..]} },
  "craft":  { "<itemId>": {question_en, answer_en, tiles:[..], explanation_en, explanation?} },
  "cloze":  { "<num>":    {sentence_en, hint, keywords:[..], explanation_en, explanation?} },
  "reading":{ "<qId>":    {stem_en, answer_en, keywords:[..], explanation, explanation_en, solution:{evidence}} }
}
"""
import json, sys, re, os

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
CLICHE = ["搭配自然", "意思通顺"]  # 搭配自然 / 意思通顺
TONE_CHARS = "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńň"  # tone-marked vowels + ü/ń/ň
MCQ_TYPES = {"HanziMcq", "PinyinMcq", "VocabMcq"}

def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)

def has_tone(py):
    # every pinyin syllable group should carry a tone mark (allow neutral-tone light syllables,
    # but require at least one tone mark somewhere in the string)
    return any(ch in TONE_CHARS for ch in py) and not re.search(r"[a-z][1-5]", py)

def check_keywords(kws, ctx, errs):
    if not isinstance(kws, list) or not (1 <= len(kws) <= 3):
        errs.append(f"{ctx}: keywords must be list of 1-3, got {kws}")
        return
    for k in kws:
        if not all(x in k for x in ("w", "py", "en")):
            errs.append(f"{ctx}: keyword missing w/py/en: {k}")
        elif not has_tone(k["py"]):
            errs.append(f"{ctx}: pinyin lacks tone mark or uses number: '{k['py']}'")

def check_expl(expl, ctx, errs, seen):
    if not expl or not expl.strip():
        errs.append(f"{ctx}: empty explanation")
        return
    for c in CLICHE:
        if c in expl:
            errs.append(f"{ctx}: cliche phrase present: {expl[:40]}")
    if expl in seen:
        errs.append(f"{ctx}: duplicate explanation text (matches {seen[expl]})")
    else:
        seen[expl] = ctx

def main():
    patch_path = sys.argv[1]
    dry = "--dry" in sys.argv
    data = load(BASE)
    patch = load(patch_path)
    sid = patch["setId"]
    z = next((x for x in data if x.get("setId") == sid), None)
    if z is None:
        print("FAIL: set not found:", sid); sys.exit(1)
    errs, seen = [], {}

    # index sections
    secs = {s["type"]: s for s in z["plan"]}

    # ---- MCQ ----
    for t in MCQ_TYPES:
        if t in secs:
            for it in secs[t]["items"]:
                pd = patch.get("mcq", {}).get(it["id"])
                if not pd:
                    errs.append(f"MCQ {it['id']}: no patch"); continue
                for fld in ("sentence_en", "explanation_en"):
                    if fld not in pd: errs.append(f"MCQ {it['id']}: missing {fld}")
                base_has_blank = "___" in it.get("sentence", "")
                if base_has_blank and "___" not in pd.get("sentence_en", "___"):
                    errs.append(f"MCQ {it['id']}: sentence_en must keep blank ___")
                if not isinstance(pd.get("hints"), list) or not pd["hints"]:
                    errs.append(f"MCQ {it['id']}: hints must be non-empty list")
                check_keywords(pd.get("keywords"), f"MCQ {it['id']}", errs)
                check_expl(pd.get("explanation_en", ""), f"MCQ {it['id']}/en", errs, seen)
                if not dry:
                    it["sentence_en"] = pd["sentence_en"]
                    it["hints"] = pd["hints"]
                    it["keywords"] = pd["keywords"]
                    it["explanation_en"] = pd["explanation_en"]
                    if "explanation" in pd: it["explanation"] = pd["explanation"]

    # ---- VocabMatch ----
    if "VocabMatch" in secs:
        rows = secs["VocabMatch"]["items"][0]["items"]
        for r in rows:
            pd = patch.get("match", {}).get(str(r["num"]))
            if not pd:
                errs.append(f"MATCH num{r['num']}: no patch"); continue
            for fld in ("explanation", "explanation_en", "stem_en"):
                if fld not in pd: errs.append(f"MATCH num{r['num']}: missing {fld}")
            check_keywords(pd.get("keywords"), f"MATCH num{r['num']}", errs)
            check_expl(pd.get("explanation", ""), f"MATCH num{r['num']}/zh", errs, seen)
            check_expl(pd.get("explanation_en", ""), f"MATCH num{r['num']}/en", errs, seen)
            if not dry:
                r["explanation"] = pd["explanation"]
                r["explanation_en"] = pd["explanation_en"]
                r["stem_en"] = pd["stem_en"]
                r["keywords"] = pd["keywords"]

    # ---- SentenceCraft ----
    if "SentenceCraft" in secs:
        for it in secs["SentenceCraft"]["items"]:
            pd = patch.get("craft", {}).get(it["id"])
            if not pd:
                errs.append(f"CRAFT {it['id']}: no patch"); continue
            for fld in ("question_en", "answer_en", "tiles", "explanation_en"):
                if fld not in pd: errs.append(f"CRAFT {it['id']}: missing {fld}")
            tiles = pd.get("tiles", [])
            ans = it.get("answer", "")
            if "".join(tiles) != ans:
                errs.append(f"CRAFT {it['id']}: tiles.join != answer\n  join={''.join(tiles)}\n  ans ={ans}")
            check_expl(pd.get("explanation_en", ""), f"CRAFT {it['id']}/en", errs, seen)
            if not dry:
                it["question_en"] = pd["question_en"]
                it["answer_en"] = pd["answer_en"]
                it["tiles"] = pd["tiles"]
                it["explanation_en"] = pd["explanation_en"]
                if "explanation" in pd: it["explanation"] = pd["explanation"]

    # ---- PassageCloze ----
    if "PassageCloze" in secs:
        blanks = secs["PassageCloze"]["items"][0]["blanks"]
        for b in blanks:
            pd = patch.get("cloze", {}).get(str(b["num"]))
            if not pd:
                errs.append(f"CLOZE num{b['num']}: no patch"); continue
            for fld in ("sentence_en", "hint", "explanation_en"):
                if fld not in pd: errs.append(f"CLOZE num{b['num']}: missing {fld}")
            if "___" not in pd.get("sentence_en", "___"):
                errs.append(f"CLOZE num{b['num']}: sentence_en must keep blank ___")
            check_keywords(pd.get("keywords"), f"CLOZE num{b['num']}", errs)
            check_expl(pd.get("explanation_en", ""), f"CLOZE num{b['num']}/en", errs, seen)
            if not dry:
                b["sentence_en"] = pd["sentence_en"]
                b["hint"] = pd["hint"]
                b["keywords"] = pd["keywords"]
                b["explanation_en"] = pd["explanation_en"]
                if "explanation" in pd: b["explanation"] = pd["explanation"]

    # ---- Reading (Mcq + Open) ----
    for t in ("ReadingMcq", "ReadingOpen"):
        if t in secs:
            sec = secs[t]["items"][0]
            passage = sec["passage"]
            for q in sec["questions"]:
                pd = patch.get("reading", {}).get(q["id"])
                if not pd:
                    errs.append(f"READ {q['id']}: no patch"); continue
                for fld in ("stem_en", "answer_en", "explanation", "explanation_en", "solution"):
                    if fld not in pd: errs.append(f"READ {q['id']}: missing {fld}")
                check_keywords(pd.get("keywords"), f"READ {q['id']}", errs)
                check_expl(pd.get("explanation", ""), f"READ {q['id']}/zh", errs, seen)
                check_expl(pd.get("explanation_en", ""), f"READ {q['id']}/en", errs, seen)
                ev = pd.get("solution", {}).get("evidence", "")
                if ev not in passage:
                    errs.append(f"READ {q['id']}: evidence NOT substring of passage: {ev[:30]}")
                if not dry:
                    q["stem_en"] = pd["stem_en"]
                    q["answer_en"] = pd["answer_en"]
                    q["keywords"] = pd["keywords"]
                    q["explanation"] = pd["explanation"]
                    q["explanation_en"] = pd["explanation_en"]
                    q["solution"] = pd["solution"]

    if errs:
        print("VALIDATION FAILED for", sid, "(", len(errs), "errors ):")
        for e in errs: print("  -", e)
        sys.exit(1)
    if dry:
        print("DRY OK:", sid, "- all checks pass, no write")
    else:
        with open(BASE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        print("MERGED + VALIDATED OK:", sid)

if __name__ == "__main__":
    main()
       