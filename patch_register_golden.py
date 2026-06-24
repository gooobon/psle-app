#!/usr/bin/env python3
"""
patch_register_golden.py

Registers the 8-type golden Comprehension test paper into the P3 English
papers barrel (index.ts), inserted at the FRONT of the WA1 pool so it is
easy to reach in a session for renderer verification.

Place this script + test_comprehension_8types_golden.ts in the project root,
then run:
  python patch_register_golden.py

It performs two edits on index.ts and copies the .ts into the wa1 folder.
"""

import os
import shutil
import sys

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = r"C:\Users\gooob\psle-app"


def find_file(*candidates):
    for p in candidates:
        if os.path.isfile(p):
            return p
    return None


def find_dir(*candidates):
    for p in candidates:
        if os.path.isdir(p):
            return p
    return None


INDEX_TS = find_file(
    os.path.join(PROJECT_ROOT, "src", "data", "p3", "english", "papers", "index.ts"),
    os.path.join(SCRIPT_DIR,   "index.ts"),
)
WA1_DIR = find_dir(
    os.path.join(PROJECT_ROOT, "src", "data", "p3", "english", "papers", "wa1"),
)
GOLDEN_TS = find_file(
    os.path.join(SCRIPT_DIR, "test_comprehension_8types_golden.ts"),
)


def abort(msg):
    print("ERROR:", msg)
    sys.exit(1)


if not INDEX_TS:
    abort("Cannot find index.ts -- check path.")
if not WA1_DIR:
    abort("Cannot find wa1 directory -- check path.")
if not GOLDEN_TS:
    abort("Cannot find test_comprehension_8types_golden.ts next to this script.")

print(f"index.ts  : {INDEX_TS}")
print(f"wa1 dir   : {WA1_DIR}")
print(f"golden ts : {GOLDEN_TS}")
print()

# -- Step 1: copy the golden .ts into wa1/ -------------------------------------

dest_ts = os.path.join(WA1_DIR, "test_comprehension_8types_golden.ts")
shutil.copyfile(GOLDEN_TS, dest_ts)
print(f"[1/3] Copied golden paper -> {dest_ts}")

# -- Step 2: add import line ---------------------------------------------------

with open(INDEX_TS, "r", encoding="utf-8-sig") as f:
    content = f.read()

IMPORT_ANCHOR = "import rawMinitest1RulangPrimaryEnglish2024 from './wa1/minitest1_rulang_primary_english_2024';"
IMPORT_LINE   = "import rawTestComprehension8TypesGolden from './wa1/test_comprehension_8types_golden';"

if IMPORT_LINE in content:
    print("[2/3] Import already present -- skipping")
elif IMPORT_ANCHOR in content:
    content = content.replace(IMPORT_ANCHOR, IMPORT_LINE + "\n" + IMPORT_ANCHOR, 1)
    print("[2/3] Import line added")
else:
    abort("Cannot find WA1 import anchor in index.ts")

# -- Step 3: add to front of WA1 array -----------------------------------------

ARRAY_ANCHOR = (
    "export const p3EnglishWA1Papers: NormalizedEnglishPaper[] = [\n"
    "  normalizePaper(rawMinitest1RulangPrimaryEnglish2024),"
)
ARRAY_REPLACEMENT = (
    "export const p3EnglishWA1Papers: NormalizedEnglishPaper[] = [\n"
    "  normalizePaper(rawTestComprehension8TypesGolden),\n"
    "  normalizePaper(rawMinitest1RulangPrimaryEnglish2024),"
)

if "normalizePaper(rawTestComprehension8TypesGolden)" in content:
    print("[3/3] Array entry already present -- skipping")
elif ARRAY_ANCHOR in content:
    content = content.replace(ARRAY_ANCHOR, ARRAY_REPLACEMENT, 1)
    print("[3/3] Array entry added at front of WA1")
else:
    abort("Cannot find WA1 array anchor in index.ts")

# ASCII guard on the lines we added (the rest of file may have pre-existing mojibake)
for added in [IMPORT_LINE, "normalizePaper(rawTestComprehension8TypesGolden)"]:
    if any(ord(c) > 127 for c in added):
        abort("Added line contains non-ASCII -- aborting.")

with open(INDEX_TS, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)

print()
print("Done. Golden test paper registered at front of WA1 pool.")
print("Next: npm run build")
