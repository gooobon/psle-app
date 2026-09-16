#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""drop_drill_items.py - remove reviewed-out generated items from wa1_zh_drill.json.
Usage: python drop_drill_items.py ZD02_C13 ZD02_C9   (then: python emit_ts.py)"""
import io, json, sys
P = "wa1_zh_drill.json"
ids = set(sys.argv[1:]); data = json.load(io.open(P, encoding="utf-8")); n = 0
for s in data:
    for sec in s["plan"]:
        before = len(sec["items"]); sec["items"] = [it for it in sec["items"] if it.get("id") not in ids]; n += before - len(sec["items"]); sec["marks"] = len(sec["items"])
    s["plan"] = [sec for sec in s["plan"] if sec["items"]]
data = [s for s in data if s["plan"]]
io.open(P, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent=1))
print("removed %d item(s); sets=%d. NEXT: python emit_ts.py" % (n, len(data)))
