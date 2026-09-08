#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""fix_pp_manual_items.py - the two GrammarMCQ items where an OPTION is Past Perfect.
S40_B4: the answer itself was 'had completed' -> item redesigned to a simple-past target.
S22_B8: distractor 'had put away' -> 'puts away'; hint wording updated.
Edits 20260622_WA1_complete.json by locating the question dict via its exact
sentence string (field-name independent). Then: node build_wa1_practice.js
Idempotent: aborts per item if the old sentence/option is no longer present.
"""
import io, json, os, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "20260622_WA1_complete.json")

FIXES = [
  {
    "id": "S40_B4",
    "old_sentence": "The PE teacher saw that the students ________ their stretches by the time the first event started.",
    "new_sentence": "The PE teacher watched as the students ________ their stretches before the first event.",
    "old_options": ["complete", "completed", "had completed", "are completing"],
    "new_options": ["complete", "completed", "completes", "are completing"],
    "new_answer": 1,
    "new_explanation": "WATCHED = past. The stretching happened at that same past moment, so use the simple past: COMPLETED. 'Complete' and 'completes' are present; 'are completing' is present continuous.",
    "new_hints": ["The teacher WATCHED - that is already in the past. Ask: which form of the verb matches a past moment?"],
    "new_trap": "'Watched as' places the action in the past. Students pick the present form 'complete' or 'completes' because the sentence starts with 'The PE teacher'.",
  },
  {
    "id": "S22_B8",
    "old_sentence": "The music teacher told the students ________ their instruments before leaving the music room.",
    "new_sentence": None,
    "old_options": ["put away", "to put away", "putting away", "had put away"],
    "new_options": ["put away", "to put away", "putting away", "puts away"],
    "new_answer": None,
    "new_explanation": None,
    "new_hints": ["The teacher TOLD the students what they had to do before leaving. Ask: after 'told + someone', which form follows - the plain verb, the -ing form, the -s form, or the infinitive with its little partner word in front?"],
  },
]

def find_dict_with_value(o, value, path=()):
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str) and v == value: return o, path
            r = find_dict_with_value(v, value, path + (k,))
            if r: return r
    elif isinstance(o, list):
        for i, v in enumerate(o):
            r = find_dict_with_value(v, value, path + (i,))
            if r: return r
    return None

def key_of(d, pred):
    for k, v in d.items():
        if pred(v): return k
    return None

data = json.load(io.open(SRC, encoding="utf-8"))
bak = SRC.replace(".json", ".pp_backup.json")
if not os.path.exists(bak): io.open(bak, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent=2))
changed = 0
for f in FIXES:
    hit = find_dict_with_value(data, f["old_sentence"])
    if not hit: print("skip %s: old sentence not found (already fixed?)" % f["id"]); continue
    q, path = hit
    k_sent = key_of(q, lambda v: v == f["old_sentence"])
    def as_list(v):
        if isinstance(v, list): return v
        if isinstance(v, dict): return [v[k] for k in sorted(v, key=lambda x: int(x))]
        return None
    k_opts = key_of(q, lambda v: as_list(v) == f["old_options"])
    if not k_opts and key_of(q, lambda v: as_list(v) == f["new_options"]):
        print("skip %s: options already fixed" % f["id"]); continue
    if not k_opts: print("ABORT %s: options %r not found (keys=%s)" % (f["id"], f["old_options"], list(q.keys()))); sys.exit(1)
    opts_is_dict = isinstance(q[k_opts], dict)
    if f["new_sentence"]: q[k_sent] = f["new_sentence"]
    q[k_opts] = {str(i + 1): o for i, o in enumerate(f["new_options"])} if opts_is_dict else f["new_options"]
    if f["new_answer"] is not None:
        # source JSON uses 1-based answer (string or int); TS answer0 is derived at build time
        cur = q.get("answer")
        one_based = f["new_answer"] + 1
        q["answer"] = str(one_based) if isinstance(cur, str) else one_based
    if f["new_explanation"]:
        for k in ("learning_tip", "explanation"):
            if k in q: q[k] = f["new_explanation"]; break
        else: print("WARN %s: explanation field not found" % f["id"])
    if f.get("new_trap"):
        if "trap_type" in q: q["trap_type"] = f["new_trap"]
    if f["new_hints"]:
        if "retry_hint" in q: q["retry_hint"] = f["new_hints"][0]
        elif "hints" in q: q["hints"] = f["new_hints"]
        else: print("WARN %s: hint field not found" % f["id"])
    print("fixed %s at %s (keys: sentence=%s options=%s answer=%s)" % (f["id"], "/".join(map(str, path[:4])), k_sent, k_opts, q.get("answer")))
    changed += 1
io.open(SRC, "w", encoding="utf-8").write(json.dumps(data, ensure_ascii=False, indent=2))
print("changed %d items. NEXT: node build_wa1_practice.js" % changed)
