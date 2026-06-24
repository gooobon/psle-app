#!/usr/bin/env python3
"""
patch_examsession_comp.py

Replaces the CompPage function in ExamSession.js (the REAL render path for
English practice sessions) with the 8-type exam-style renderer.

CompPage spans from 'function CompPage(' up to the next top-level function
'function ExamSummary('. We replace exactly that block.

Place this script and CompPage_EXAM_NEW.js in the same folder, then run:
  python patch_examsession_comp.py
"""

import os
import sys

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = r"C:\Users\gooob\psle-app"


def find_file(*candidates):
    for p in candidates:
        if os.path.isfile(p):
            return p
    return None


EXAM_SESSION = find_file(
    os.path.join(PROJECT_ROOT, "src", "components", "ExamSession.js"),
    os.path.join(PROJECT_ROOT, "components", "ExamSession.js"),
    os.path.join(SCRIPT_DIR,   "ExamSession.js"),
)
NEW_COMP = find_file(
    os.path.join(SCRIPT_DIR, "CompPage_EXAM_NEW.js"),
)


def abort(msg):
    print("ERROR:", msg)
    sys.exit(1)


if not EXAM_SESSION:
    abort("Cannot find ExamSession.js -- check path or place script next to the file.")
if not NEW_COMP:
    abort("Cannot find CompPage_EXAM_NEW.js -- must be in the same folder as this script.")

print(f"ExamSession.js   : {EXAM_SESSION}")
print(f"CompPage_EXAM_NEW: {NEW_COMP}")
print()

with open(EXAM_SESSION, "r", encoding="utf-8-sig") as f:
    content = f.read()

with open(NEW_COMP, "r", encoding="utf-8") as f:
    new_comp = f.read()

# -- Locate CompPage boundaries ------------------------------------------------

START_MARKER = "\nfunction CompPage("
END_MARKER   = "\nfunction ExamSummary("

start_idx = content.find(START_MARKER)
end_idx   = content.find(END_MARKER)

if start_idx == -1:
    abort("Could not find 'function CompPage(' in ExamSession.js")
if end_idx == -1:
    abort("Could not find 'function ExamSummary(' in ExamSession.js -- end boundary missing")
if end_idx <= start_idx:
    abort("ExamSummary appears before CompPage -- unexpected file layout")

# Guard: make sure we are not about to delete an enormous or tiny region
region_len = end_idx - start_idx
if region_len < 500 or region_len > 60000:
    abort(f"CompPage region size looks wrong ({region_len} chars). Aborting to be safe.")

before = content[:start_idx + 1]   # keep the leading \n
after  = content[end_idx:]         # keep from ExamSummary onwards

new_content = before + new_comp.strip() + "\n\n" + after.lstrip("\n")

# -- Sanity checks before writing ----------------------------------------------

checks = {
    "new CompPage present":        "function CompPage({ set, sectionLabel, marks, onPageDone }) {" in new_content,
    "ExamSummary still present":   "function ExamSummary(" in new_content,
    "ExamSessionScreen present":   "export function ExamSessionScreen(" in new_content,
    "8 formats present":           all(("'" + fmt + "'") in new_content for fmt in
                                       ["fill_blank", "fill_word", "mcq", "ab_circle",
                                        "true_false", "sequence", "tf_reason"]),
    "no self-check buttons left":  "I got it right" not in new_comp,  # new renderer has none
}
for label, ok in checks.items():
    print(f"  [{'OK' if ok else 'FAIL'}] {label}")
if not all(checks.values()):
    abort("Sanity check failed -- not writing file.")

# Non-ASCII guard (Korean/emoji must never enter the codebase)
bad = [c for c in new_comp if ord(c) > 127]
if bad:
    abort(f"New CompPage contains non-ASCII chars: {bad[:10]}")

with open(EXAM_SESSION, "w", encoding="utf-8", newline="\n") as f:
    f.write(new_content)

old_lines = content[start_idx:end_idx].count("\n")
new_lines = new_comp.count("\n")
print()
print(f"CompPage replaced: {old_lines} old lines -> {new_lines} new lines")
print("Done. Now run:  npm run build")
