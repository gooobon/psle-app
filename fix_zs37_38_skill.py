#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""fix_zs37_38_skill.py - the 4 ReadingOpen open_sentence questions without a
skill tag (ZS37_H2, ZS37_H3, ZS38_H2, ZS38_H3). Assigns by stem wording:
  why/how (为什么/怎么/为何/原因) -> inference
  lesson/main point (主要/告诉/道理/明白/学到) -> main_idea
  otherwise -> detail
Edits wa1_zh_complete.json; then re-run: python emit_ts.py. Idempotent."""
import io, json, os, re
ROOT = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(ROOT, "wa1_zh_complete.json")
data = json.load(io.open(P, encoding="utf-8"))
n = 0
for s in data:
    for sec in s.get("plan", []):
        if sec["type"] not in ("ReadingMcq", "ReadingOpen"): continue
        for it in sec.get("items", []):
            for q in it.get("questions", []) or []:
                if q.get("skill"): continue
                stem = str(q.get("stem", ""))
                if re.search(r"\u4e3a\u4ec0\u4e48|\u600e\u4e48|\u4e3a\u4f55|\u539f\u56e0", stem): sk = "inference"
                elif re.search(r"\u4e3b\u8981|\u544a\u8bc9|\u9053\u7406|\u660e\u767d|\u5b66\u5230", stem): sk = "main_idea"
                else: sk = "detail"
                q["skill"] = sk; n += 1
                print("set", s["setId"], q.get("id"), "->", sk, "|", stem[:40])
io.open(P, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent=1))
print("filled %d skills. NEXT: python emit_ts.py" % n)
