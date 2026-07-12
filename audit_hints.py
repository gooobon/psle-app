#!/usr/bin/env python3
"""소스에 이미 들어있는 retry_hint 전부를 현행 규칙으로 재검사한다."""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from en_hints_merge import answer_text, leaks, clue_grounded, MAXLEN, SRC

data = json.load(open(SRC, encoding="utf-8"))
seen, bad, n = {}, [], 0
for s in data["sets"]:
    for key, sec in (s.get("sections") or {}).items():
        if not isinstance(sec, dict):
            continue
        for q in (sec.get("questions") or []) + (sec.get("errors") or []):
            h = q.get("retry_hint")
            if not h:
                continue
            n += 1
            qid = q.get("question_id")
            ans = answer_text(q, sec)
            if leaks(h, ans):      bad.append(f"{qid}: LEAK '{ans}'")
            if len(h) > MAXLEN:    bad.append(f"{qid}: LEN {len(h)}")
            if not clue_grounded(h, q, sec): bad.append(f"{qid}: NO CLUE")
            if h in seen:          bad.append(f"{qid}: DUP of {seen[h]}")
            seen[h] = qid
print(f"검사 {n}개 / 위반 {len(bad)}개")
for b in bad: print("  -", b)
