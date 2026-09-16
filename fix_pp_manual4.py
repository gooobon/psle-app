#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""fix_pp_manual4.py - the last 4 Past Perfect strings (comprehension helper fields)."""
import io
P = "comp60_FINAL_8type_backup.json"
s = io.open(P, encoding="utf-8").read(); n = 0
for old, new in [
    ("The fisherman's daughter had been unwell for three years.", "The fisherman's daughter was unwell for three years."),
    ("Find how long the daughter had been unwell.", "Find how long the daughter was unwell."),
    ("nobody had spoken", "nobody spoke"),
    ("Some members of the crowd stood up when the top had been spinning for seventy seconds.", "Some members of the crowd stood up after the top spun for seventy seconds."),
]:
    c = s.count(old); s = s.replace(old, new); n += c; print(("ok  " if c else "MISS") + " x%d | %s" % (c, old[:60]))
io.open(P, "w", encoding="utf-8").write(s); print("replaced %d. NEXT: node build_wa1_practice.js ; python tools/vocab/extract_vocab.py en_p3_wa1" % n)
