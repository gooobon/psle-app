#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge Chinese-explanation quality patches into wa1_zh_complete.json.

Scope: rewrites ONLY the base `explanation` (Chinese) of MCQ / PassageCloze /
SentenceCraft. Never touches sentence_en / hints / keywords / evidence / stem_en
(the learning layer produced by merge_patch.py), and never touches VocabMatch or
Reading (already individualised).

Machine-enforced quality rules (a patch that fails ANY of these is REJECTED):
  1. DISTRACTOR   MCQ explanation must name EVERY wrong option (at least one
                  distinctive character of each wrong option must appear).
  2. ALTERNATIVE  Cloze explanation must name at least one OTHER wordBank
                  candidate (the one the student would confuse it with).
  3. NO-CLICHE    Bans 搭配自然 / 意思通顺 and circular endings
                  (…最合适。 / …最自然。 / …是正确的搭配。).
  4. LAYERED      Must be >= 2 sentences (the ①judge ②eliminate ③method structure).
  5. MIN-LENGTH   Must be >= 40 Chinese characters (blocks one-liners).
  6. NO-DUP       No duplicate explanation text within the set.

Usage: python3 merge_expl.py <expl_patch.json> [--dry]
Patch shape (sections optional; partial patches allowed):
{
  "setId": "ZS01",
  "mcq":   { "<itemId>": { "explanation": "..." } },
  "cloze": { "<num>":    { "explanation": "..." } },
  "craft": { "<itemId>": { "explanation": "..." } }
}
"""
import json, sys, re, os

BASE = os.path.join(os.path.dirname(__file__), "wa1_zh_complete.json")
MCQ_TYPES = {"HanziMcq", "PinyinMcq", "VocabMcq"}

CLICHE = ["搭配自然", "意思通顺"]
CIRCULAR = re.compile(r"(最合适|最自然|最准确|是正确的搭配|是正确的说法)[。！]?\s*$")
SENT_END = re.compile(r"[。！？；]")
MIN_LEN = 40


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def zh_len(s):
    return len([c for c in s if "一" <= c <= "鿿"])


def check_common(expl, ctx, errs, seen):
    """Rules 3, 4, 5, 6 - apply to every rewritten explanation."""
    if not expl or not expl.strip():
        errs.append(f"{ctx}: empty explanation")
        return False
    for c in CLICHE:
        if c in expl:
            errs.append(f"{ctx}: [NO-CLICHE] banned phrase '{c}'")
    if CIRCULAR.search(expl.strip()):
        errs.append(f"{ctx}: [NO-CLICHE] circular ending (…{expl.strip()[-12:]})")
    if len(SENT_END.findall(expl)) < 2:
        errs.append(f"{ctx}: [LAYERED] need >=2 sentences (judge / eliminate / method)")
    if zh_len(expl) < MIN_LEN:
        errs.append(f"{ctx}: [MIN-LENGTH] {zh_len(expl)} zh-chars < {MIN_LEN}")
    if expl in seen:
        errs.append(f"{ctx}: [NO-DUP] duplicate of {seen[expl]}")
    else:
        seen[expl] = ctx
    return True


def check_distractors(expl, item, ctx, errs):
    """Rule 1 - every wrong option must be named."""
    opts = item.get("options") or []
    ans_i = item.get("answer")
    if not opts or ans_i is None or not (0 <= ans_i < len(opts)):
        return
    correct = str(opts[ans_i])
    missing = []
    for i, o in enumerate(opts):
        if i == ans_i:
            continue
        o = str(o)
        # characters that make this wrong option distinct from the correct one
        distinctive = [ch for ch in o if ch not in correct]
        if not distinctive:
            continue  # nothing to distinguish; skip
        if o in expl:
            continue
        if not any(ch in expl for ch in distinctive):
            missing.append(o)
    if missing:
        errs.append(f"{ctx}: [DISTRACTOR] wrong options never mentioned: {'、'.join(missing)}")


def check_alternative(expl, blank, bank, ctx, errs):
    """Rule 2 - cloze must name at least one other wordBank candidate."""
    ans = str(blank.get("answer", ""))
    others = [w for w in (bank or []) if str(w) != ans]
    if not others:
        return
    if not any(str(w) in expl for w in others):
        errs.append(f"{ctx}: [ALTERNATIVE] no other wordBank candidate named "
                    f"(candidates: {'、'.join(map(str, others))})")


def main():
    if len(sys.argv) < 2:
        print("usage: merge_expl.py <expl_patch.json> [--dry]"); sys.exit(2)
    patch_path = sys.argv[1]
    dry = "--dry" in sys.argv
    data = load(BASE)
    patch = load(patch_path)
    sid = patch["setId"]
    z = next((x for x in data if x.get("setId") == sid), None)
    if z is None:
        print("FAIL: set not found:", sid); sys.exit(1)

    errs, seen = [], {}
    secs = {s["type"]: s for s in z["plan"]}
    n_mcq = n_cloze = n_craft = 0

    # ---- MCQ ----
    for t in MCQ_TYPES:
        if t not in secs:
            continue
        for it in secs[t]["items"]:
            pd = (patch.get("mcq") or {}).get(it["id"])
            if not pd or "explanation" not in pd:
                continue
            expl = pd["explanation"]
            ctx = f"MCQ {it['id']}"
            if check_common(expl, ctx, errs, seen):
                check_distractors(expl, it, ctx, errs)
            n_mcq += 1
            if not dry:
                it["explanation"] = expl

    # ---- PassageCloze ----
    if "PassageCloze" in secs:
        blk = secs["PassageCloze"]["items"][0]
        bank = blk.get("wordBank") or []
        for b in blk["blanks"]:
            pd = (patch.get("cloze") or {}).get(str(b["num"]))
            if not pd or "explanation" not in pd:
                continue
            expl = pd["explanation"]
            ctx = f"CLOZE num{b['num']}"
            if check_common(expl, ctx, errs, seen):
                check_alternative(expl, b, bank, ctx, errs)
            n_cloze += 1
            if not dry:
                b["explanation"] = expl

    # ---- SentenceCraft ----
    if "SentenceCraft" in secs:
        for it in secs["SentenceCraft"]["items"]:
            pd = (patch.get("craft") or {}).get(it["id"])
            if not pd or "explanation" not in pd:
                continue
            expl = pd["explanation"]
            ctx = f"CRAFT {it['id']}"
            check_common(expl, ctx, errs, seen)
            n_craft += 1
            if not dry:
                it["explanation"] = expl

    if errs:
        print(f"VALIDATION FAILED for {sid} ( {len(errs)} errors ):")
        for e in errs:
            print("  -", e)
        sys.exit(1)

    tally = f"mcq={n_mcq} cloze={n_cloze} craft={n_craft}"
    if dry:
        print(f"DRY OK: {sid} - all quality rules pass ({tally}), no write")
    else:
        with open(BASE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        print(f"MERGED + QUALITY OK: {sid} ({tally})")


if __name__ == "__main__":
    main()
