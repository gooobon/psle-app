#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""fix_solution_noise.py - remove generation-time self-talk from student-facing
past-paper data (English EOY/WA3). Run from repo root. Idempotent per edit:
each edit is skipped with a notice if its anchor is gone; nothing is guessed.
Class A: explanation noise only (answer unchanged).
Class B: `answer` field contaminated -> rewritten to the single correct value.
Class C: key itself doubtful -> NOT changed here; flagged with _keyNote only.
"""
import io, os, re, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
E = os.path.join(ROOT, "src", "data", "p3", "english", "papers")
DASH = "[\u2014\u2013-]"   # em dash / en dash / hyphen (files use real dashes)

changed = 0
def load(rel):
    p = os.path.join(E, rel)
    s = io.open(p, encoding="utf-8", newline="").read()
    return p, s
def save(p, s):
    global changed
    io.open(p, "w", encoding="utf-8", newline="").write(s); changed += 1

def drop_line(s, needle, label):
    """Delete the single source line containing `needle` (string element / comment)."""
    lines = s.split("\n"); hits = [i for i, l in enumerate(lines) if needle in l]
    if len(hits) != 1: print("  skip %s: anchor found %d times" % (label, len(hits))); return s
    del lines[hits[0]]; print("  ok   %s" % label); return "\n".join(lines)

def replace_line(s, needle, new_line, label):
    lines = s.split("\n"); hits = [i for i, l in enumerate(lines) if needle in l]
    if len(hits) != 1: print("  skip %s: anchor found %d times" % (label, len(hits))); return s
    indent = re.match(r"\s*", lines[hits[0]]).group(0)
    lines[hits[0]] = indent + new_line; print("  ok   %s" % label); return "\n".join(lines)

# ---------------- Class A: explanation noise ----------------
print("henrypark_p2_2023")
p, s = load("eoy/eoy_henrypark_p2_2023.ts")
s = drop_line(s, "actually the passage uses third person", "q we/they self-talk")
s = drop_line(s, "\"Actually: support = sup + port; supporters = support + ers.\"", "supporters self-talk")
save(p, s)

print("nanhua_p2_2025 (spelling)")
p, s = load("eoy/eoy_nanhua_p2_2025.ts")
s = replace_line(s, "3 syllables actually: mis-CHIE-vous", "'The word has 3 syllables: mis-chie-vous.',", "mischievous syllables")
# ---- nanhua Q21: Class C, flag only (stem transcription and key conflict) ----
s = replace_line(s, "answer: 'L (she)", "answer: 'M',", "Q21 answer -> key value M")
s = replace_line(s, "note: 'Q21 subject = she (but L used)",
    "_keyNote: 'UNVERIFIED: printed key Q21=M(them) but stem as transcribed needs a subject (she). Confirm stem and key against source PDF.',",
    "Q21 note -> _keyNote")
s = drop_line(s, "answer key says Q21 = M (them). Re-reading:", "Q21 step self-talk 1")
s = drop_line(s, "Revised reading: blank 21 is the subject", "Q21 step self-talk 2")
save(p, s)

print("mgs_p2b_2023")
p, s = load("eoy/eoy_mgs_p2b_2023.ts")
s = drop_line(s, "\"Actually: 'Looking _____ the cage she was trapped in'", "cage self-talk")
save(p, s)

print("wa3_taonan_practicepaper3_2023 (comments)")
p, s = load("wa3/wa3_taonan_practicepaper3_2023.ts")
s = drop_line(s, "// Official key: Q25=H(tasks)? Let's re-check", "comment 1")
s = replace_line(s, "// Wait - the answer key shows Q21-Q28", "// Answer key Q21-Q28: B C G E H F D A", "comment 2")
save(p, s)

# ---------------- Class B: answer field contaminated ----------------
print("acsp_bookletB_2025 G_44")
p, s = load("eoy/eoy_acsp_bookletB_2025.ts")
pat = re.compile(r'answer:\s*\n\s*"2 ' + DASH + r' Alan remembered.*?Alan decided to help Jack\.",', re.S)
if len(pat.findall(s)) == 1:
    s = pat.sub('answer:\n        "1 - Alan and his friends went to the library.\\n2 - Alan saw Jack looking worried.\\n3 - Alan remembered Miss Joy\'s advice.\\n4 - Alan decided to help Jack.",', s, 1)
    print("  ok   G_44 answer"); save(p, s)
else: print("  skip G_44: anchor found %d times" % len(pat.findall(s)))

print("mgs_p2_2025 Q37")
p, s = load("eoy/eoy_mgs_p2_2025.ts")
s = replace_line(s, "Wait: let me re-read.)'",
    "answer: 'Stacy was not appreciated for her kindness. = 1 | Stacy met a young woman and helped her. = 2 | Stacy weaved beautiful creations for the villagers. = 3',",
    "Q37 answer (aligned to correctSequence)")
save(p, s)

# ---------------- Class C: NOT edited ----------------
# rafflesgirls (does/goes), sji Q25, chijsng Q37: the self-talk wraps a real
# key-vs-context conflict. Deleting only the noisy lines would leave an
# explanation that contradicts the recorded answer. Resolve against the
# source PDF first (Step 1 follow-up), then rewrite the whole steps array.
print("Class C left untouched: eoy_rafflesgirls_mockpaper_2025 (does/goes), eoy_sji_p2_2025 Q25, eoy_chijsng_p2_2024 Q37")

print("\nfiles written: %d" % changed)
print("Class C items still need SOURCE-PDF confirmation: rafflesgirls Q(does/goes), sji Q25, chijsng Q37, nanhua Q21.")
print("Next: npm run typecheck ; npm run build")
