#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge retry-hints into the English WA1 source and machine-validate them.

A retry hint is shown AFTER the student's first wrong attempt, BEFORE they try
again. It must therefore teach the decision, not hand over the answer. The
existing learning_tip cannot be reused: it names the answer in 99.5% of MCQ
items (measured), so wiring it into the hint slot would make the retry
pointless. trap_type leaks it in 74.7%.

Usage:  python3 en_hints_merge.py patch_S01.json [--dry]
Patch shape:  { "setId": "S01", "hints": { "<question_id>": "<hint text>" } }
"""
import json, sys, os, re

# EN_SRC 로 소스 경로를 갈아끼울 수 있다 (병렬 작업 시 각자 사본에서 검증하기 위함).
SRC = os.environ.get("EN_SRC") or os.path.join(os.path.dirname(__file__), "20260622_WA1_complete.json")
MAXLEN = 260

def answer_text(q, sec):
    """The literal string the student must produce, for leak checking."""
    a = q.get("answer")
    if q.get("options") and a is not None:
        return str(q["options"].get(str(a), ""))
    wb = sec.get("word_box")
    if wb and isinstance(wb, dict) and a is not None:
        return str(wb.get(str(a), ""))
    if q.get("correction"):
        return str(q["correction"])
    return ""

def leaks(hint, word):
    """Whole-word, case-insensitive containment ('us' must not match 'because')."""
    if not word:
        return False
    return re.search(r"\b" + re.escape(word.lower()) + r"\b", hint.lower()) is not None

def clue_grounded(hint, q, sec):
    """The hint must quote something that actually appears in the question, so it
    points the student at the sentence instead of floating free."""
    hay = " ".join([str(q.get("stem", "")), str(sec.get("passage", "")),
                    str(q.get("instruction", "")), str(q.get("sentence_a", "")),
                    str(q.get("sentence1", "")), str(q.get("sentence2", "")),
                    str(q.get("error_word", "")), str(q.get("wrong_word", ""))]).lower()
    # any capitalised or quoted token in the hint that also appears in the question
    toks = re.findall(r"[A-Z]{2,}", hint) + re.findall(r"'([^']+)'", hint)
    for tok in toks:
        t = tok.strip().lower()
        if len(t) >= 2 and t in hay:
            return True
    return False

def main():
    patch_path = sys.argv[1]
    dry = "--dry" in sys.argv
    data = json.load(open(SRC, encoding="utf-8"))
    patch = json.load(open(patch_path, encoding="utf-8"))
    sid = patch["setId"]
    s = next((x for x in data["sets"] if x["set_id"] == sid), None)
    if s is None:
        print("FAIL: set not found", sid); sys.exit(1)

    errs, seen, applied, matched = [], {}, 0, set()
    for key, sec in (s.get("sections") or {}).items():
        # Editing sections carry their items under "errors", not "questions".
        # Missing this meant Editing hints were silently dropped for 5 of the 60 sets.
        for q in (sec.get("questions") or []) + (sec.get("errors") or []):
            qid = q.get("question_id")
            hint = patch.get("hints", {}).get(qid)
            if hint is None:
                continue
            matched.add(qid)
            ans = answer_text(q, sec)
            if leaks(hint, ans):
                errs.append(f"{qid}: hint LEAKS the answer '{ans}'")
            if len(hint) > MAXLEN:
                errs.append(f"{qid}: hint too long ({len(hint)} > {MAXLEN})")
            if not clue_grounded(hint, q, sec):
                errs.append(f"{qid}: hint quotes no clue that appears in the question")
            if hint in seen:
                errs.append(f"{qid}: duplicate hint (same as {seen[hint]})")
            else:
                seen[hint] = qid
            if not dry:
                q["retry_hint"] = hint
                applied += 1

    # A hint whose question_id does not exist would otherwise vanish without a word.
    for qid in patch.get("hints", {}):
        if qid not in matched:
            errs.append(f"{qid}: no such question in {sid} - hint would be silently dropped")

    if errs:
        print(f"VALIDATION FAILED for {sid} ({len(errs)}):")
        for e in errs:
            print("  -", e)
        sys.exit(1)
    if dry:
        print(f"DRY OK: {sid} - {len(patch.get('hints', {}))} hints pass all checks")
    else:
        json.dump(data, open(SRC, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"MERGED + VALIDATED OK: {sid} ({applied} hints)")

if __name__ == "__main__":
    main()
