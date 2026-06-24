#!/usr/bin/env python3
"""
patch_comprehension.py
Patches EnglishSession.js and p3PaperBridge.js for the 8-type Comprehension
schema (fill_blank, fill_word, mcq, ab_circle, true_false, sequence,
tf_reason, open_sentence).

Run from any directory:
  python patch_comprehension.py

Paths are relative to this script's location OR the hardcoded project root.
"""

import os
import re
import sys

# -- Locate files --------------------------------------------------------------

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = r"C:\Users\gooob\psle-app"

def find_file(*candidates):
    for p in candidates:
        if os.path.isfile(p):
            return p
    return None

ENGLISH_SESSION = find_file(
    os.path.join(PROJECT_ROOT, "src", "components", "EnglishSession.js"),
    os.path.join(PROJECT_ROOT, "components", "EnglishSession.js"),
    os.path.join(SCRIPT_DIR,   "EnglishSession.js"),
)
BRIDGE = find_file(
    os.path.join(PROJECT_ROOT, "src", "lib", "p3PaperBridge.js"),
    os.path.join(PROJECT_ROOT, "lib", "p3PaperBridge.js"),
    os.path.join(SCRIPT_DIR,   "p3PaperBridge.js"),
)
NEW_COMP = find_file(
    os.path.join(SCRIPT_DIR, "CompPageInner_NEW.js"),
)

def abort(msg):
    print("ERROR:", msg)
    sys.exit(1)

if not ENGLISH_SESSION:
    abort("Cannot find EnglishSession.js -- check path or place script next to the file.")
if not BRIDGE:
    abort("Cannot find p3PaperBridge.js -- check path or place script next to the file.")
if not NEW_COMP:
    abort("Cannot find CompPageInner_NEW.js -- must be in the same folder as this script.")

print(f"EnglishSession.js : {ENGLISH_SESSION}")
print(f"p3PaperBridge.js  : {BRIDGE}")
print(f"CompPageInner_NEW : {NEW_COMP}")
print()

# -- Read files ----------------------------------------------------------------

with open(ENGLISH_SESSION, "r", encoding="utf-8-sig") as f:
    eng_content = f.read()

with open(BRIDGE, "r", encoding="utf-8-sig") as f:
    bridge_content = f.read()

with open(NEW_COMP, "r", encoding="utf-8") as f:
    new_comp_inner = f.read()

# -- Patch 1: Replace CompPageInner in EnglishSession.js ----------------------

START_MARKER = "\nfunction CompPageInner("
END_MARKER   = "\nfunction SummaryScreen("

start_idx = eng_content.find(START_MARKER)
end_idx   = eng_content.find(END_MARKER)

if start_idx == -1:
    abort("Could not find 'function CompPageInner(' in EnglishSession.js")
if end_idx == -1:
    abort("Could not find 'function SummaryScreen(' in EnglishSession.js")
if end_idx <= start_idx:
    abort("SummaryScreen appears before CompPageInner -- unexpected file layout")

before   = eng_content[:start_idx + 1]   # keep the \n before CompPageInner
after    = eng_content[end_idx:]          # keep from SummaryScreen onwards

new_eng = before + new_comp_inner.strip() + "\n\n" + after.lstrip("\n")

with open(ENGLISH_SESSION, "w", encoding="utf-8", newline="\n") as f:
    f.write(new_eng)

comp_lines = new_comp_inner.count("\n")
print(f"[1/3] CompPageInner replaced  ({comp_lines} lines) in EnglishSession.js")

# -- Patch 2: detectCompFormat -- add early exit for new schema formats ---------

OLD_DETECT_ANCHOR = "  const declared = q.format || q.questionType || null;"
NEW_DETECT_INSERT = (
    "  const declared = q.format || q.questionType || null;\n"
    "\n"
    "  // New 8-type schema formats -- bypass inference and return directly\n"
    "  const NEW_SCHEMA_FORMATS = [\n"
    "    'fill_blank','fill_word','ab_circle','true_false','tf_reason','open_sentence'\n"
    "  ];\n"
    "  if (declared && NEW_SCHEMA_FORMATS.includes(declared)) return declared;\n"
)

if OLD_DETECT_ANCHOR not in bridge_content:
    abort("Cannot find detectCompFormat anchor in p3PaperBridge.js -- already patched or file changed?")

if "NEW_SCHEMA_FORMATS" in bridge_content:
    print("[2/3] detectCompFormat already patched -- skipping")
else:
    bridge_content = bridge_content.replace(OLD_DETECT_ANCHOR, NEW_DETECT_INSERT, 1)
    print("[2/3] detectCompFormat patched in p3PaperBridge.js")

# -- Patch 3: toEnglishCompSet -- preserve array answers + pass new fields ------

OLD_ANSWER_LINE = (
    "    const answer = isMcq\n"
    "      ? parseAnswerIndex(q.answer, options)\n"
    "      : String(q.answer ?? q.correctAnswer ?? \"\");"
)
NEW_ANSWER_LINE = (
    "    const answer = isMcq\n"
    "      ? parseAnswerIndex(q.answer, options)\n"
    "      : Array.isArray(q.answer)\n"
    "        ? q.answer\n"
    "        : String(q.answer ?? q.correctAnswer ?? \"\");"
)

OLD_RETURN_FIELDS = (
    "      id:            q.id || `comp_${i}`,\n"
    "      questionNo:    q.questionNo || String(i + 1),\n"
    "      format:        fmt,\n"
    "      marks:         q.marks || 1,\n"
    "      question:      q.question || q.stem || q.q || \"\",\n"
    "      stem:          q.question || q.stem || q.q || \"\",\n"
    "      options:       tickOptions || options,\n"
    "      answer,\n"
    "      sequenceItems,\n"
    "      hints:         q.hints || (q.solution?.tip ? [q.solution.tip] : []),\n"
    "      solution:      q.solution || null,"
)
NEW_RETURN_FIELDS = (
    "      id:               q.id || `comp_${i}`,\n"
    "      questionNo:       q.questionNo || String(i + 1),\n"
    "      format:           fmt,\n"
    "      marks:            q.marks || 1,\n"
    "      question:         q.question || q.stem || q.q || \"\",\n"
    "      stem:             q.question || q.stem || q.q || \"\",\n"
    "      options:          tickOptions || options,\n"
    "      answer,\n"
    "      sequenceItems,\n"
    "      statements:       q.statements       || null,\n"
    "      abSentence:       q.abSentence       || null,\n"
    "      abChoices:        q.abChoices        || null,\n"
    "      acceptableAnswers: q.acceptableAnswers || null,\n"
    "      hints:            q.hints || (q.solution?.tip ? [q.solution.tip] : []),\n"
    "      solution:         q.solution || null,"
)

patched_answer = False
patched_fields = False

if OLD_ANSWER_LINE in bridge_content:
    bridge_content = bridge_content.replace(OLD_ANSWER_LINE, NEW_ANSWER_LINE, 1)
    patched_answer = True
elif NEW_ANSWER_LINE in bridge_content:
    patched_answer = True  # already done
    print("[3/3] toEnglishCompSet answer line already patched")

if not patched_answer:
    abort("Cannot find answer-line in toEnglishCompSet -- file may have changed.")

if OLD_RETURN_FIELDS in bridge_content:
    bridge_content = bridge_content.replace(OLD_RETURN_FIELDS, NEW_RETURN_FIELDS, 1)
    patched_fields = True
elif "acceptableAnswers:" in bridge_content:
    patched_fields = True
    print("[3/3] toEnglishCompSet return fields already patched")

if not patched_fields:
    abort("Cannot find return-fields block in toEnglishCompSet -- file may have changed.")

with open(BRIDGE, "w", encoding="utf-8", newline="\n") as f:
    f.write(bridge_content)

print("[3/3] toEnglishCompSet patched in p3PaperBridge.js")

print()
print("All patches applied successfully.")
print("Next: git add -A && git commit -m 'comp: 8-type exam renderer + schema passthrough' && git push")
